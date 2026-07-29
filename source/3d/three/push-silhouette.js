/* webCAD - Siluetas visuales para solidos Push 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { createWideLineSegments, disposeThreeObject } from './three-scene-style.js';
import { PUSH_SOLID_STYLE } from './push-geometry.js';
import { profileTangencyIndices } from './profile-tangency.js';
import { classifySolidEdgeEntries } from './solid-edge-interaction.js';
import {
  deriveSolidAnalyticTopology,
  deriveSolidAnalyticSideSurfaces,
  pointOnAnalyticCurve,
} from '../analytic-edges.js';

const SILHOUETTE_NAME = 'webcad-push-silhouette';
const GENERATRIX_SILHOUETTE_NAME = 'webcad-push-generatrix-silhouette';
const HIDDEN_EDGES_NAME = 'webcad-push-hidden-edges';
const VISIBLE_EDGES_NAME = 'webcad-push-visible-edges';
const FACE_EPSILON = 1e-9;
const DEFAULT_VISIBILITY_SAMPLES = 10;

function isProfileFeatureSolid(solid) {
  return solid?.metadata?.type === 'profileFeature' ||
    Array.isArray(solid?.metadata?.profileFeatures);
}

function vectorFromPoint(point) {
  return new THREE.Vector3(Number(point.x) || 0, Number(point.y) || 0, Number(point.z) || 0);
}

function cameraKey(camera) {
  return camera.matrixWorld.elements.map((value) => value.toFixed(4)).join(',');
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function faceInfo(face, vertices) {
  const points = face.map((index) => vectorFromPoint(vertices[index])).filter(Boolean);
  if (points.length < 3) return null;
  const center = points.reduce((total, point) => total.add(point), new THREE.Vector3())
    .multiplyScalar(1 / points.length);
  let normal = null;
  for (let index = 1; index < points.length - 1; index += 1) {
    const candidate = new THREE.Vector3()
      .subVectors(points[index], points[0])
      .cross(new THREE.Vector3().subVectors(points[index + 1], points[0]));
    if (candidate.lengthSq() > FACE_EPSILON) {
      normal = candidate.normalize();
      break;
    }
  }
  return normal ? { center, normal } : null;
}

function faceFacesCamera(info, camera) {
  const view = new THREE.Vector3().subVectors(camera.position, info.center);
  return info.normal.dot(view) >= 0;
}

function isSmoothVerticalEdge(solid, edge) {
  const smooth = new Set(
    solid?.metadata?.smoothVerticalEdgeIndices || solid?.metadata?.smoothProfileVertexIndices || [],
  );
  profileTangencyIndices(solid, solid?.metadata?.cadProfileVertexIndices)
    .forEach((index) => smooth.add(index));
  const start = solid?.vertices?.[edge[0]];
  const end = solid?.vertices?.[edge[1]];
  return smooth.has(Math.min(edge[0], edge[1])) && start && end &&
    Math.abs(start.x - end.x) <= FACE_EPSILON &&
    Math.abs(start.y - end.y) <= FACE_EPSILON &&
    Math.abs(start.z - end.z) > FACE_EPSILON;
}

function edgeFaceMap(solid) {
  const vertices = Array.isArray(solid?.vertices) ? solid.vertices : [];
  const faces = Array.isArray(solid?.faces) ? solid.faces : [];
  const faceInfos = faces.map((face) => faceInfo(face, vertices));
  const edgeFaces = new Map();
  faces.forEach((face, faceIndex) => {
    for (let index = 0; index < face.length; index += 1) {
      const first = face[index];
      const second = face[(index + 1) % face.length];
      const key = edgeKey(first, second);
      if (!edgeFaces.has(key)) {
        edgeFaces.set(key, { edge: [first, second], faces: [] });
      }
      edgeFaces.get(key).faces.push(faceIndex);
    }
  });
  return { vertices, faceInfos, edgeFaces };
}

function edgeVisibilityStates(adjacentFaces, faceInfos, camera) {
  return adjacentFaces
    .map((faceIndex) => faceInfos[faceIndex])
    .filter(Boolean)
    .map((info) => faceFacesCamera(info, camera));
}

function segmentFromEdge(vertices, edge) {
  const start = vertices[edge[0]];
  const end = vertices[edge[1]];
  if (!start || !end) return null;
  return {
    start: { x: start.x, y: start.y, z: start.z },
    end: { x: end.x, y: end.y, z: end.z },
  };
}

function silhouetteSegments(solid, camera, curveGeneratrices, excludedVerticalIndices = new Set()) {
  const { vertices, faceInfos, edgeFaces } = edgeFaceMap(solid);
  if (!vertices.length || !faceInfos.length || !camera) return [];

  const segments = [];
  edgeFaces.forEach(({ edge, faces: adjacentFaces }) => {
    const visibleStates = edgeVisibilityStates(adjacentFaces, faceInfos, camera);
    const isBoundary = visibleStates.length < 2;
    const isSilhouette = visibleStates.length >= 2 && visibleStates.some(Boolean) && !visibleStates.every(Boolean);
    if (!isBoundary && !isSilhouette) return;
    if (isSmoothVerticalEdge(solid, edge) !== curveGeneratrices) return;
    if (curveGeneratrices && excludedVerticalIndices.has(Math.min(edge[0], edge[1]))) return;
    const segment = segmentFromEdge(vertices, edge);
    if (segment) segments.push(segment);
  });
  return segments;
}

export function buildPushSilhouetteSegments(solid, camera) {
  if (isProfileFeatureSolid(solid)) return [];
  return silhouetteSegments(solid, camera, false);
}

function profileLoopLayout(solid) {
  const metadataSize = Number(solid?.metadata?.profileSize);
  const inferredSize = Number(solid?.vertices?.length) / 2;
  const profileSize = Number.isInteger(metadataSize) && metadataSize >= 3
    ? metadataSize
    : Number.isInteger(inferredSize) && inferredSize >= 3 ? inferredSize : 0;
  if (!profileSize) return null;
  const configured = Array.isArray(solid?.metadata?.profileLoopSizes)
    ? solid.metadata.profileLoopSizes.map(Number)
    : [profileSize];
  const loopSizes = configured.every((size) => Number.isInteger(size) && size >= 3) &&
    configured.reduce((sum, size) => sum + size, 0) === profileSize
    ? configured
    : [profileSize];
  return { loopSizes, profileSize };
}

function circularLoop(loop, solid, profileSize, smoothIndices) {
  if (!loop.indices.every((index) => smoothIndices.has(index))) return null;
  const points = loop.indices.map((index) => solid.vertices[index]);
  const center = points.reduce((result, point) => ({
    x: result.x + point.x / points.length,
    y: result.y + point.y / points.length,
  }), { x: 0, y: 0 });
  const radii = points.map((point) => Math.hypot(point.x - center.x, point.y - center.y));
  const radius = radii.reduce((sum, value) => sum + value, 0) / radii.length;
  const tolerance = Math.max(1e-7, radius * 1e-6);
  if (radius <= tolerance || radii.some((value) => Math.abs(value - radius) > tolerance)) return null;
  const lowerZ = points.reduce((sum, point) => sum + point.z, 0) / points.length;
  const upperPoints = loop.indices.map((index) => solid.vertices[index + profileSize]);
  if (upperPoints.some((point) => !point)) return null;
  const upperZ = upperPoints.reduce((sum, point) => sum + point.z, 0) / upperPoints.length;
  return { center, radius, lowerZ, upperZ };
}

function circularTangentPoints(circle, camera) {
  if (camera?.isOrthographicCamera) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const length = Math.hypot(direction.x, direction.y);
    if (length <= FACE_EPSILON) return [];
    const perpendicular = { x: -direction.y / length, y: direction.x / length };
    return [-1, 1].map((sign) => ({
      x: circle.center.x + perpendicular.x * circle.radius * sign,
      y: circle.center.y + perpendicular.y * circle.radius * sign,
    }));
  }
  const cameraPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  const deltaX = cameraPosition.x - circle.center.x;
  const deltaY = cameraPosition.y - circle.center.y;
  const distanceSquared = deltaX * deltaX + deltaY * deltaY;
  const radiusSquared = circle.radius * circle.radius;
  if (distanceSquared <= radiusSquared + FACE_EPSILON) return [];
  const baseScale = radiusSquared / distanceSquared;
  const perpendicularScale = circle.radius * Math.sqrt(distanceSquared - radiusSquared) / distanceSquared;
  return [-1, 1].map((sign) => ({
    x: circle.center.x + deltaX * baseScale - deltaY * perpendicularScale * sign,
    y: circle.center.y + deltaY * baseScale + deltaX * perpendicularScale * sign,
  }));
}

function exactCircularGeneratrices(solid, camera) {
  const layout = profileLoopLayout(solid);
  if (!layout) return { coveredIndices: new Set(), segments: [] };
  const smoothIndices = new Set(
    solid?.metadata?.smoothVerticalEdgeIndices || solid?.metadata?.smoothProfileVertexIndices || [],
  );
  profileTangencyIndices(solid, solid?.metadata?.cadProfileVertexIndices)
    .forEach((index) => smoothIndices.add(index));
  const coveredIndices = new Set();
  const segments = [];
  let offset = 0;
  layout.loopSizes.forEach((size) => {
    const indices = Array.from({ length: size }, (_, index) => offset + index);
    const circle = circularLoop({ indices }, solid, layout.profileSize, smoothIndices);
    if (circle) {
      indices.forEach((index) => coveredIndices.add(index));
      circularTangentPoints(circle, camera).forEach((point) => segments.push({
        start: { x: point.x, y: point.y, z: circle.lowerZ },
        end: { x: point.x, y: point.y, z: circle.upperZ },
      }));
    }
    offset += size;
  });
  return { coveredIndices, segments };
}

function analyticCurveContainsAngle(curve, angle) {
  if (curve.closed) return true;
  const normalize = (value) => {
    const result = value % (Math.PI * 2);
    return result < 0 ? result + Math.PI * 2 : result;
  };
  const sweep = curve.clockwise
    ? normalize(curve.endAngle - curve.startAngle)
    : normalize(curve.startAngle - curve.endAngle);
  const offset = curve.clockwise
    ? normalize(angle - curve.startAngle)
    : normalize(curve.startAngle - angle);
  return offset <= sweep + 1e-6;
}

function analyticSurfaceTangentAngles(surface, camera) {
  let first = 0;
  let second = 0;
  if (camera?.isOrthographicCamera) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    first = direction.dot(vectorFromPoint(surface.uAxis)) / surface.radiusX;
    second = direction.dot(vectorFromPoint(surface.vAxis)) / surface.radiusY;
    if (Math.hypot(first, second) <= FACE_EPSILON) return [];
    const base = Math.atan2(second, first);
    return [base + Math.PI / 2, base - Math.PI / 2]
      .filter((angle) => analyticCurveContainsAngle(surface, angle));
  }
  const cameraPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  const relative = cameraPosition.sub(vectorFromPoint(surface.center));
  first = relative.dot(vectorFromPoint(surface.uAxis)) / surface.radiusX;
  second = relative.dot(vectorFromPoint(surface.vAxis)) / surface.radiusY;
  const magnitude = Math.hypot(first, second);
  if (magnitude <= 1 + FACE_EPSILON) return [];
  const base = Math.atan2(second, first);
  const delta = Math.acos(1 / magnitude);
  return [base + delta, base - delta]
    .filter((angle) => analyticCurveContainsAngle(surface, angle));
}

function analyticSideLocation(point, surface) {
  const offset = vectorFromPoint(surface.offset);
  const offsetLength = offset.length();
  if (offsetLength <= FACE_EPSILON) return null;
  const axis = offset.multiplyScalar(1 / offsetLength);
  const relative = vectorFromPoint(point).sub(vectorFromPoint(surface.center));
  const along = relative.dot(axis);
  if (along < -1e-4 || along > offsetLength + 1e-4) return null;
  relative.addScaledVector(axis, -along);
  const x = relative.dot(vectorFromPoint(surface.uAxis)) / surface.radiusX;
  const y = relative.dot(vectorFromPoint(surface.vAxis)) / surface.radiusY;
  const angle = Math.atan2(y, x);
  if (Math.abs(Math.hypot(x, y) - 1) > 2e-3 ||
      !analyticCurveContainsAngle(surface, angle)) return null;
  return { angle, parameter: along / offsetLength };
}

function angleDistance(first, second) {
  return Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)));
}

function analyticSurfaceIntervals(solid, surface, targetAngle, faceSurfaceIds) {
  const curvedFaces = new Set(faceSurfaceIds.flatMap((surfaceId, faceIndex) =>
    surfaceId === surface.id ? [faceIndex] : []));
  const intervals = [...curvedFaces].flatMap((faceIndex) => {
    const locations = (solid.faces?.[faceIndex] ?? [])
      .map((vertexIndex) => analyticSideLocation(solid.vertices?.[vertexIndex], surface));
    if (!locations.length || locations.some((location) => !location)) return [];
    const mean = Math.atan2(
      locations.reduce((sum, location) => sum + Math.sin(location.angle), 0),
      locations.reduce((sum, location) => sum + Math.cos(location.angle), 0),
    );
    const angularRadius = Math.max(...locations.map((location) =>
      angleDistance(location.angle, mean)));
    if (angleDistance(targetAngle, mean) > angularRadius + 1e-3) return [];
    return [{
      start: Math.max(0, Math.min(...locations.map((location) => location.parameter))),
      end: Math.min(1, Math.max(...locations.map((location) => location.parameter))),
    }];
  }).sort((first, second) => first.start - second.start);
  const merged = [];
  intervals.forEach((interval) => {
    const previous = merged[merged.length - 1];
    if (previous && interval.start <= previous.end + 1e-4) {
      previous.end = Math.max(previous.end, interval.end);
      return;
    }
    merged.push({ ...interval });
  });
  return merged.filter((interval) => interval.end - interval.start > 1e-6);
}

function analyticGeneratrixSegments(solid, camera, surfaces, faceSurfaceIds) {
  const seen = new Set();
  return surfaces.flatMap((surface) => {
    return analyticSurfaceTangentAngles(surface, camera).flatMap((angle) => {
      const origin = pointOnAnalyticCurve(surface, angle);
      return analyticSurfaceIntervals(
        solid,
        surface,
        angle,
        faceSurfaceIds,
      ).flatMap((interval) => {
        const start = {
          x: origin.x + surface.offset.x * interval.start,
          y: origin.y + surface.offset.y * interval.start,
          z: origin.z + surface.offset.z * interval.start,
        };
        const end = {
          x: origin.x + surface.offset.x * interval.end,
          y: origin.y + surface.offset.y * interval.end,
          z: origin.z + surface.offset.z * interval.end,
        };
        const key = [start, end].map((point) =>
          `${point.x.toFixed(5)}:${point.y.toFixed(5)}:${point.z.toFixed(5)}`).join('|');
        if (seen.has(key)) return [];
        seen.add(key);
        return [{ start, end }];
      });
    });
  });
}

export function buildPushGeneratrixSilhouetteSegments(solid, camera) {
  if (isProfileFeatureSolid(solid)) {
    const analyticTopology = deriveSolidAnalyticTopology(solid);
    const analyticSurfaces = analyticTopology.sideSurfaces;
    const analytic = analyticGeneratrixSegments(
      solid,
      camera,
      analyticSurfaces,
      analyticTopology.faceSurfaceIds,
    );
    if (analyticSurfaces.length) return analytic;
    const entries = solid.metadata?.curvedFeatureGeneratrices ?? [];
    const faceInfos = solid.faces.map((face) => faceInfo(face, solid.vertices));
    if (entries.length) {
      return entries.flatMap((entry) => {
        const before = faceInfos[entry?.beforeFaceIndex];
        const after = faceInfos[entry?.afterFaceIndex];
        if (!before || !after || faceFacesCamera(before, camera) === faceFacesCamera(after, camera)) return [];
        const segment = segmentFromEdge(solid.vertices, [entry.startIndex, entry.endIndex]);
        return segment ? [segment] : [];
      });
    }
    const storedNormals = solid.metadata?.faceVertexNormals ?? [];
    const curvedFaces = new Set(storedNormals.flatMap((normals, faceIndex) => {
      if (!Array.isArray(normals) || normals.length < 2) return [];
      const first = vectorFromPoint(normals[0]);
      return normals.slice(1).some((normal) =>
        first.distanceTo(vectorFromPoint(normal)) > FACE_EPSILON) ? [faceIndex] : [];
    }));
    const { vertices, edgeFaces } = edgeFaceMap(solid);
    return [...edgeFaces.values()].flatMap(({ edge, faces }) => {
      if (faces.length !== 2 || !faces.every((faceIndex) => curvedFaces.has(faceIndex))) return [];
      const [first, second] = faces.map((faceIndex) => faceInfos[faceIndex]);
      if (!first || !second || faceFacesCamera(first, camera) === faceFacesCamera(second, camera)) return [];
      const segment = segmentFromEdge(vertices, edge);
      return segment ? [segment] : [];
    });
  }
  const exact = exactCircularGeneratrices(solid, camera);
  return [
    ...exact.segments,
    ...silhouetteSegments(solid, camera, true, exact.coveredIndices),
  ];
}

export function updatePushSilhouetteGroup(group, camera, options = {}) {
  if (!group || group.userData?.type !== 'webcad-push-solid-group') return null;
  const mesh = group.children.find((child) => child.userData?.type === 'webcad-push-solid');
  const edgeObject = group.children.find((child) => child.userData?.type === 'webcad-push-solid-edges');
  const tangentEdgeObject = group.children.find((child) =>
    child.userData?.type === 'webcad-push-solid-tangent-edges');
  const solid = mesh?.userData?.analyticSolid ?? mesh?.userData?.solid;
  if (!solid) return null;
  const key = cameraKey(camera);
  const requestedVisibilitySamples = Math.max(
    1,
    Math.round(Number(options.visibilitySamples) || DEFAULT_VISIBILITY_SAMPLES),
  );
  const currentSilhouette = group.getObjectByName(SILHOUETTE_NAME) ?? null;
  if (group.userData.silhouetteCameraKey === key &&
      Number(group.userData.silhouetteVisibilitySamples) >= requestedVisibilitySamples) {
    return currentSilhouette;
  }
  if (options.deferCameraRefresh === true &&
      group.userData.silhouetteCameraKey && currentSilhouette) {
    return currentSilhouette;
  }
  if (edgeObject) edgeObject.visible = true;
  const previousVisibleEdges = group.getObjectByName(VISIBLE_EDGES_NAME);
  if (previousVisibleEdges) {
    group.remove(previousVisibleEdges);
    disposeThreeObject(previousVisibleEdges);
  }
  const edgeVisibility = classifySolidEdgeEntries({
    camera,
    mesh,
    occluders: options.occluders,
    segments: edgeObject?.userData?.sourceSegments,
    sourceEdgeIndices: edgeObject?.userData?.sourceEdgeIndices,
    curveGroupIds: edgeObject?.userData?.curveGroupIds,
    visibilitySamples: requestedVisibilitySamples,
  });
  const visibleEntries = edgeVisibility.visible;
  const visibleEdges = createWideLineSegments(visibleEntries.map((entry) => entry.segment), {
    color: options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthTest: false,
    depthWrite: false,
    linewidth: options.linewidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder + 2,
  });
  visibleEdges.name = VISIBLE_EDGES_NAME;
  visibleEdges.userData = {
    type: 'webcad-push-visible-edge-overlay',
    measurementSegments: visibleEntries.map((entry) => entry.measurementSegment),
    segmentCount: visibleEdges.userData.segmentCount,
    sourceEdgeIndices: visibleEntries.map((entry) => entry.sourceEdgeIndices),
    curveGroupIds: visibleEntries.map((entry) => entry.curveGroupId),
    sourceSegments: visibleEntries.map((entry) => entry.segment),
  };
  group.add(visibleEdges);
  const previous = group.getObjectByName(SILHOUETTE_NAME);
  if (previous) {
    group.remove(previous);
    disposeThreeObject(previous);
  }
  const silhouette = createWideLineSegments(buildPushSilhouetteSegments(solid, camera), {
    color: options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthBias: PUSH_SOLID_STYLE.edgeDepthBias,
    depthFunc: THREE.LessEqualDepth,
    depthTest: true,
    depthWrite: false,
    linewidth: options.linewidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    polygonOffset: true,
    polygonOffsetFactor: PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
    polygonOffsetUnits: PUSH_SOLID_STYLE.edgePolygonOffsetUnits,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder + 1,
  });
  silhouette.name = SILHOUETTE_NAME;
  silhouette.userData = {
    type: 'webcad-push-silhouette',
    segmentCount: silhouette.userData.segmentCount,
  };
  group.add(silhouette);
  const previousGeneratrices = group.getObjectByName(GENERATRIX_SILHOUETTE_NAME);
  if (previousGeneratrices) {
    group.remove(previousGeneratrices);
    disposeThreeObject(previousGeneratrices);
  }
  const generatrixSegments = buildPushGeneratrixSilhouetteSegments(solid, camera);
  const generatrices = createWideLineSegments(generatrixSegments, {
    color: options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthBias: PUSH_SOLID_STYLE.edgeDepthBias,
    depthFunc: THREE.LessEqualDepth,
    depthTest: true,
    depthWrite: false,
    linewidth: options.linewidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    polygonOffset: true,
    polygonOffsetFactor: PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
    polygonOffsetUnits: PUSH_SOLID_STYLE.edgePolygonOffsetUnits,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder + 1,
  });
  generatrices.name = GENERATRIX_SILHOUETTE_NAME;
  generatrices.visible = group.userData.showCurveGeneratrices !== false;
  generatrices.userData = {
    type: 'webcad-push-generatrix-silhouette',
    segmentCount: generatrices.userData.segmentCount,
    sourceSegments: generatrixSegments,
  };
  group.add(generatrices);
  const previousHiddenEdges = group.getObjectByName(HIDDEN_EDGES_NAME);
  if (previousHiddenEdges) {
    group.remove(previousHiddenEdges);
    disposeThreeObject(previousHiddenEdges);
  }
  const additionalHiddenSegments = [
    ...(tangentEdgeObject?.userData?.sourceSegments || []),
    ...generatrixSegments,
  ];
  const additionalHidden = classifySolidEdgeEntries({
    camera,
    mesh,
    occluders: options.occluders,
    segments: additionalHiddenSegments,
    visibilitySamples: requestedVisibilitySamples,
  }).hidden;
  const hiddenSegments = [
    ...edgeVisibility.hidden.map((entry) => entry.segment),
    ...additionalHidden.map((entry) => entry.segment),
  ];
  const hiddenEdges = createWideLineSegments(hiddenSegments, {
    color: options.hiddenColor ?? PUSH_SOLID_STYLE.hiddenEdgeColor,
    dashSize: 4.8,
    dashed: true,
    depthTest: false,
    depthWrite: false,
    gapSize: 3,
    linewidth: options.hiddenLinewidth ?? PUSH_SOLID_STYLE.hiddenEdgeLineWidth,
    opacity: options.hiddenOpacity ?? PUSH_SOLID_STYLE.hiddenEdgeOpacity,
    renderOrder: (options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder) - 1,
    transparent: true,
  });
  hiddenEdges.name = HIDDEN_EDGES_NAME;
  hiddenEdges.visible = group.userData.showHiddenEdges === true;
  hiddenEdges.userData = {
    type: 'webcad-push-solid-hidden-edges',
    segmentCount: hiddenEdges.userData.segmentCount,
    sourceSegments: hiddenSegments,
  };
  group.add(hiddenEdges);
  group.userData.silhouetteCameraKey = key;
  group.userData.silhouetteVisibilitySamples = requestedVisibilitySamples;
  return silhouette;
}

export function updatePushSilhouettes(root, camera, options = {}) {
  const groups = [];
  root?.traverse?.((object) => {
    if (object.userData?.type === 'webcad-push-solid-group') {
      groups.push(object);
    }
  });
  const occluders = groups.flatMap((group) => group.children?.filter((child) =>
    child.userData?.type === 'webcad-push-solid') ?? []);
  const updated = [];
  groups.forEach((group) => {
    const silhouette = updatePushSilhouetteGroup(group, camera, { ...options, occluders });
    if (silhouette) updated.push(silhouette);
  });
  return updated;
}

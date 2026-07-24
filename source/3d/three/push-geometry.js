/* webCAD - Geometria aislada para Push 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { createExactExtrusion } from '../exact-extrusion.js';
import { exactProfileFromEntity } from '../exact-profile.js';
import { extrudeClosedProfile } from '../extrusion.js';
import {
  exactProfileOnSketchPlane,
  pointFromSketchPlane,
  sketchPlaneFromFace,
  solidOnSketchPlane,
} from '../sketch-plane.js';
import { createSolid3d, isValidSolid3d } from '../solid.js';
import { solid3dToBufferGeometry } from './solid-to-buffer-geometry.js';
import { createWideLineSegments, disposeThreeObject } from './three-scene-style.js';
import { profileTangencyIndices } from './profile-tangency.js';
import { sampleSolidAnalyticEdges } from '../analytic-edges.js';
import {
  booleanSolid3d,
  isManifoldBooleanReady,
  solidWithDerivedSurfaceTopology,
  subtractFacePushSolid3d,
  subtractionCutterDistance,
} from './manifold-boolean.js';

const SOLID_INTEGRITY_EPSILON = 1e-6;

export const PUSH_SOLID_STYLE = {
  edgeColor: 0x000000,
  edgeDepthBias: 5e-5,
  edgeLineWidth: 3.2,
  edgePolygonOffsetFactor: -2,
  edgePolygonOffsetUnits: -2,
  edgeRenderOrder: 28,
  faceColor: 0xffffff,
  previewFaceColor: 0xf6f8fb,
  hiddenEdgeColor: 0xa3adb0,
  hiddenEdgeLineWidth: 1.15,
  hiddenEdgeOpacity: 0.72,
  tangentEdgeColor: 0x4f5d61,
  tangentEdgeLineWidth: 1.25,
};

export function pushSourceKeyFromEntity(entity) {
  const sourceEntityId = entity?.id ?? entity?.handle ?? null;
  if (sourceEntityId !== null && sourceEntityId !== undefined) {
    return `${entity?.type ?? entity?.kind ?? 'ENTITY'}:${sourceEntityId}`;
  }
  return null;
}

export function pushSourceKeyFromFace(face) {
  const entity = face?.sourceEntity;
  const entityKey = pushSourceKeyFromEntity(entity);
  if (entityKey) return face?.sketchId ? `${face.sketchId}:${entityKey}` : entityKey;
  if (face?.sourceSolidFaceIndex !== undefined && face?.id) return `solid-face:${face.id}`;
  return face?.id ? `face:${face.id}` : null;
}

export function pushHeightValue(height) {
  const value = Number(height);
  if (!Number.isFinite(value) || Math.abs(value) <= 1e-9) {
    return null;
  }
  return value;
}

function normalizedNormal(normal) {
  const vector = new THREE.Vector3(
    Number(normal?.x),
    Number(normal?.y),
    Number(normal?.z),
  );
  return vector.lengthSq() > 1e-12 ? vector.normalize() : null;
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function unavailableExactGeometry(reason, details = {}) {
  return {
    status: 'unavailable',
    reason,
    ...cloneJson(details),
  };
}

function pendingExactGeometry(reason, details = {}) {
  return {
    status: 'pending',
    reason,
    ...cloneJson(details),
  };
}

function exactGeometryFromProfilePush(face, distance) {
  const sourceEntity = face?.sourceEntity;
  const faceExactProfile = face?.exactProfile ? cloneJson(face.exactProfile) : null;
  if (!sourceEntity && !faceExactProfile) {
    if (face?.sourceSolidFaceIndex !== undefined) {
      return pendingExactGeometry('face-push-exact-brep-not-implemented', {
        operation: {
          type: 'pushMoveFace',
          sourceSolidFaceIndex: face.sourceSolidFaceIndex,
          distance,
        },
      });
    }
    return unavailableExactGeometry('missing-source-entity');
  }
  const rawProfile = faceExactProfile || exactProfileFromEntity(sourceEntity);
  const profile = face?.workplane
    ? exactProfileOnSketchPlane(rawProfile, face.workplane)
    : rawProfile;
  if (!profile) {
    return unavailableExactGeometry('unsupported-source-entity', {
      source: {
        entityId: sourceEntity?.id ?? sourceEntity?.handle ?? null,
        entityType: sourceEntity?.type ?? face?.sourceEntityType ?? null,
      },
    });
  }
  const extrusion = createExactExtrusion(profile, distance, {
    direction: face?.normal ?? { x: 0, y: 0, z: 1 },
    metadata: {
      sourceKey: pushSourceKeyFromFace(face),
      sketchPlane: face?.sketchPlane ?? 'XY',
      visualPushDistance: distance,
    },
  });
  if (!extrusion) {
    return unavailableExactGeometry('exact-extrusion-failed', {
      source: profile.source,
    });
  }
  return {
    status: 'available',
    representation: 'exact-extrusion-v1',
    profile,
    extrusion,
  };
}

function vertexVector(vertex) {
  return new THREE.Vector3(
    Number(vertex?.x),
    Number(vertex?.y),
    Number(vertex?.z),
  );
}

function triangleArea3d(first, second, third) {
  return vertexVector(second).sub(vertexVector(first))
    .cross(vertexVector(third).sub(vertexVector(first)))
    .length() * 0.5;
}

function faceArea3d(face, vertices) {
  if (!Array.isArray(face) || face.length < 3) return 0;
  const origin = vertices[face[0]];
  let area = 0;
  for (let index = 1; index < face.length - 1; index += 1) {
    area += triangleArea3d(origin, vertices[face[index]], vertices[face[index + 1]]);
  }
  return area;
}

function facesHaveArea(solid) {
  return solid.faces.every((face) => faceArea3d(face, solid.vertices) > SOLID_INTEGRITY_EPSILON);
}

function movedFaceKeepsMaterial(sourceSolid, movingVertices, unitNormal, distance) {
  return sourceSolid.edges.every((edge) => {
    const firstMoves = movingVertices.has(edge[0]);
    const secondMoves = movingVertices.has(edge[1]);
    if (firstMoves === secondMoves) return true;
    const movingIndex = firstMoves ? edge[0] : edge[1];
    const fixedIndex = firstMoves ? edge[1] : edge[0];
    const originalThickness = vertexVector(sourceSolid.vertices[movingIndex])
      .sub(vertexVector(sourceSolid.vertices[fixedIndex]))
      .dot(unitNormal);
    if (Math.abs(originalThickness) <= SOLID_INTEGRITY_EPSILON) return true;
    const movedThickness = originalThickness + distance;
    return originalThickness > 0
      ? movedThickness > SOLID_INTEGRITY_EPSILON
      : movedThickness < -SOLID_INTEGRITY_EPSILON;
  });
}

function planarFaceNormal(face, vertices) {
  const points = face.map((index) => vertices[index]).filter(Boolean);
  if (points.length < 3) return null;
  const origin = vertexVector(points[0]);
  for (let index = 1; index < points.length - 1; index += 1) {
    const normal = vertexVector(points[index]).sub(origin)
      .cross(vertexVector(points[index + 1]).sub(origin));
    if (normal.lengthSq() <= 1e-12) continue;
    normal.normalize();
    if (points.every((point) => Math.abs(vertexVector(point).sub(origin).dot(normal)) <=
      SOLID_INTEGRITY_EPSILON)) return normal;
  }
  return null;
}

function projectedFaceBounds(points, normal) {
  const absolute = { x: Math.abs(normal.x), y: Math.abs(normal.y), z: Math.abs(normal.z) };
  const projected = points.map((point) => {
    if (absolute.x >= absolute.y && absolute.x >= absolute.z) return { x: point.y, y: point.z };
    if (absolute.y >= absolute.z) return { x: point.x, y: point.z };
    return { x: point.x, y: point.y };
  });
  return projected.reduce((bounds, point) => ({
    minX: Math.min(bounds.minX, point.x),
    minY: Math.min(bounds.minY, point.y),
    maxX: Math.max(bounds.maxX, point.x),
    maxY: Math.max(bounds.maxY, point.y),
  }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
}

function boundsOverlap(first, second) {
  return Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX) >
      SOLID_INTEGRITY_EPSILON &&
    Math.min(first.maxY, second.maxY) - Math.max(first.minY, second.minY) >
      SOLID_INTEGRITY_EPSILON;
}

function constrainedMovedFaceDistance(sourceSolid, movingVertices, movingFaceIndices, unitNormal, distance) {
  const movingPoints = [...movingVertices].map((index) => sourceSolid.vertices[index]).filter(Boolean);
  if (movingPoints.length < 3) return distance;
  const movingBounds = projectedFaceBounds(movingPoints, unitNormal);
  const movingPlane = movingPoints.reduce((sum, point) => sum + vertexVector(point).dot(unitNormal), 0) /
    movingPoints.length;
  let positiveLimit = Infinity;
  let negativeLimit = -Infinity;
  sourceSolid.faces.forEach((candidateFace, faceIndex) => {
    if (movingFaceIndices.has(faceIndex)) return;
    const points = candidateFace.map((index) => sourceSolid.vertices[index]).filter(Boolean);
    const candidateNormal = planarFaceNormal(candidateFace, sourceSolid.vertices);
    if (!candidateNormal || Math.abs(candidateNormal.dot(unitNormal)) < 1 - 1e-7 ||
        !boundsOverlap(movingBounds, projectedFaceBounds(points, unitNormal))) return;
    const candidateDistance = vertexVector(points[0]).dot(unitNormal) - movingPlane;
    if (candidateDistance > SOLID_INTEGRITY_EPSILON) {
      positiveLimit = Math.min(positiveLimit, candidateDistance);
    }
    else if (candidateDistance < -SOLID_INTEGRITY_EPSILON) {
      negativeLimit = Math.max(negativeLimit, candidateDistance);
    }
  });
  if (distance > positiveLimit) return positiveLimit;
  if (distance < negativeLimit) return negativeLimit;
  return distance;
}

export function isPushSolidIntegrityValid(solid) {
  return isValidSolid3d(solid) && facesHaveArea(solid);
}

function extrudePlanarFace(points, normal, distance, options = {}) {
  const unitNormal = normalizedNormal(normal);
  if (!unitNormal) {
    throw new TypeError('La cara seleccionada no tiene una normal valida');
  }
  if (points.length < 3 || points.some((point) =>
    ![point.x, point.y, point.z].every(Number.isFinite))) {
    throw new TypeError('El perfil de extrusion contiene coordenadas no validas');
  }
  const offset = unitNormal.clone().multiplyScalar(distance);
  const profileSize = points.length;
  const vertices = [
    ...points,
    ...points.map((point) => ({
      x: point.x + offset.x,
      y: point.y + offset.y,
      z: point.z + offset.z,
    })),
  ];
  const lowerFace = Array.from({ length: profileSize }, (_, index) => index);
  const upperFace = Array.from({ length: profileSize }, (_, index) => profileSize + index);
  const faces = distance > 0
    ? [lowerFace.slice().reverse(), upperFace]
    : [lowerFace, upperFace.slice().reverse()];
  const edges = [];
  for (let index = 0; index < profileSize; index += 1) {
    const next = (index + 1) % profileSize;
    const lowerIndex = index;
    const lowerNext = next;
    const upperIndex = profileSize + index;
    const upperNext = profileSize + next;
    faces.push(distance > 0
      ? [lowerIndex, lowerNext, upperNext, upperIndex]
      : [lowerIndex, upperIndex, upperNext, lowerNext]);
    edges.push(
      [lowerIndex, lowerNext],
      [upperIndex, upperNext],
      [lowerIndex, upperIndex],
    );
  }
  return createSolid3d({
    vertices,
    faces,
    edges,
    metadata: {
      type: 'extrusion',
      distance,
      normal: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
      source: options.source ?? null,
    },
  });
}

function cleanProfileLoop(points) {
  const loop = (Array.isArray(points) ? points : []).map((point) => ({
    x: Number(point?.x), y: Number(point?.y), z: Number(point?.z) || 0,
  }));
  if (loop.length < 3 || loop.some((point) => ![point.x, point.y, point.z].every(Number.isFinite))) return null;
  return loop;
}

function extrudeProfileWithHoles(points, holes, height, options = {}) {
  const loops = [cleanProfileLoop(points), ...(holes || []).map(cleanProfileLoop)];
  if (loops.some((loop) => !loop)) throw new TypeError('El perfil con huecos no es valido');
  const flatProfile = loops.flat();
  const profileSize = flatProfile.length;
  const contour = loops[0].map((point) => new THREE.Vector2(point.x, point.y));
  const holePaths = loops.slice(1).map((loop) => loop.map((point) => new THREE.Vector2(point.x, point.y)));
  const capTriangles = THREE.ShapeUtils.triangulateShape(contour, holePaths).filter(([first, second, third]) => {
    const a = flatProfile[first];
    const b = flatProfile[second];
    const c = flatProfile[third];
    return Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > SOLID_INTEGRITY_EPSILON;
  });
  if (!capTriangles.length) throw new RangeError('No se pudo triangular el perfil con huecos');
  const vertices = [...flatProfile, ...flatProfile.map((point) => ({ ...point, z: point.z + height }))];
  const faces = [];
  const lowerCapFaceIndices = [];
  const upperCapFaceIndices = [];
  capTriangles.forEach((triangle) => {
    const [first, second, third] = triangle.map((index) => flatProfile[index]);
    const positive = (second.x - first.x) * (third.y - first.y) -
      (second.y - first.y) * (third.x - first.x) > 0;
    const upward = positive ? [...triangle] : [triangle[0], triangle[2], triangle[1]];
    const downward = [...upward].reverse();
    lowerCapFaceIndices.push(faces.length);
    faces.push(height > 0 ? downward : upward);
    upperCapFaceIndices.push(faces.length);
    faces.push((height > 0 ? upward : downward).map((index) => index + profileSize));
  });
  const edges = [];
  let offset = 0;
  loops.forEach((loop, loopIndex) => {
    loop.forEach((_, index) => {
      const next = (index + 1) % loop.length;
      const start = offset + index;
      const end = offset + next;
      const upperStart = start + profileSize;
      const upperEnd = end + profileSize;
      const outer = loopIndex === 0;
      faces.push(height > 0
        ? (outer ? [start, end, upperEnd, upperStart] : [upperStart, upperEnd, end, start])
        : (outer ? [start, upperStart, upperEnd, end] : [upperStart, start, end, upperEnd]));
      edges.push([start, end], [upperStart, upperEnd], [start, upperStart]);
    });
    offset += loop.length;
  });
  return createSolid3d({
    vertices,
    faces,
    edges,
    metadata: {
      type: 'extrusion',
      height,
      source: options.source ?? null,
      profileSize,
      profileLoopSizes: loops.map((loop) => loop.length),
      capFaceGroups: {
        lower: lowerCapFaceIndices,
        upper: upperCapFaceIndices,
      },
    },
  });
}

export function solidFromFacePush(face, height, options = {}) {
  const cleanHeight = pushHeightValue(height);
  if (cleanHeight === null) {
    throw new RangeError('La altura de Push debe ser distinta de cero');
  }
  const usesSketchPlane = Boolean(face?.workplane && Array.isArray(face?.localPoints));
  const needsDerivedPlane = !usesSketchPlane && Array.isArray(face?.holes) && face.holes.length > 0 &&
    face?.normal;
  const extrusionPlane = usesSketchPlane
    ? face.workplane
    : needsDerivedPlane ? sketchPlaneFromFace(face) : null;
  const profilePoints = usesSketchPlane
    ? face.localPoints
    : extrusionPlane ? face.points.map((point) => pointFromSketchPlane(point, extrusionPlane)) : face?.points;
  const profileHoles = usesSketchPlane
    ? face.localHoles
    : extrusionPlane
      ? face.holes.map((loop) => loop.map((point) => pointFromSketchPlane(point, extrusionPlane)))
      : face?.holes;
  const points = (Array.isArray(profilePoints) ? profilePoints : []).map((point) => ({
    x: Number(point.x),
    y: Number(point.y),
    z: Number(point.z) || 0,
  }));
  const source = options.source ?? face?.id ?? null;
  const holes = Array.isArray(profileHoles) ? profileHoles : [];
  let solid = holes.length
    ? extrudeProfileWithHoles(points, holes, cleanHeight, { source })
      : usesSketchPlane
      ? extrudeClosedProfile(points, cleanHeight, { source })
      : face?.normal
      ? extrudePlanarFace(points, face.normal, cleanHeight, { source })
      : extrudeClosedProfile(points, cleanHeight, { source });
  if (extrusionPlane) {
    solid = solidOnSketchPlane(solid, extrusionPlane, face.sketchId);
  }
  const cadProfileVertexIndices = new Set(face?.cadProfileVertexIndices || []);
  const smoothVerticalEdgeIndices = new Set(face?.smoothProfileVertexIndices || []);
  let holeOffset = points.length;
  holes.forEach((hole, holeIndex) => {
    const cad = face?.holeCadProfileVertexIndices?.[holeIndex] || [];
    const smooth = face?.holeSmoothProfileVertexIndices?.[holeIndex] || [];
    cad.forEach((index) => cadProfileVertexIndices.add(holeOffset + index));
    smooth.forEach((index) => smoothVerticalEdgeIndices.add(holeOffset + index));
    holeOffset += Array.isArray(hole) ? hole.length : 0;
  });
  solid.metadata = {
    ...solid.metadata,
    type: 'push',
    faceId: face?.id ?? null,
    height: cleanHeight,
    distance: cleanHeight,
    sketchPlane: face?.sketchPlane ?? solid.metadata?.sketchPlane ?? 'XY',
    sketchId: face?.sketchId ?? solid.metadata?.sketchId ?? null,
    workplane: face?.workplane ?? solid.metadata?.workplane ?? null,
    normal: face?.normal ? { ...face.normal } : (solid.metadata?.normal ?? null),
    sourceEntity: face?.sourceEntity ?? null,
    sourceEntityId: face?.sourceEntity?.id ?? face?.sourceEntity?.handle ?? null,
    sourceFaceType: face?.sourceEntityType ?? null,
    sourceSolidFaceIndex: face?.sourceSolidFaceIndex ?? null,
    sourceKey: pushSourceKeyFromFace(face),
    exactGeometry: exactGeometryFromProfilePush(face, cleanHeight),
    cadProfileVertexIndices: [...cadProfileVertexIndices],
    smoothProfileVertexIndices: Array.isArray(face?.smoothProfileVertexIndices)
      ? [...face.smoothProfileVertexIndices]
      : [],
    smoothVerticalEdgeIndices: [...smoothVerticalEdgeIndices],
  };
  return solid;
}

export function movedSolidFacePush(face, distance) {
  const cleanDistance = pushHeightValue(distance);
  const sourceSolid = face?.sourceSolid;
  const faceIndex = face?.sourceSolidFaceIndex;
  const unitNormal = normalizedNormal(face?.normal);
  if (cleanDistance === null) {
    throw new RangeError('La distancia de Push debe ser distinta de cero');
  }
  if (!sourceSolid || !Number.isInteger(faceIndex) || !unitNormal) {
    return null;
  }
  const faceIndices = Array.isArray(face?.sourceSolidFaceIndices) && face.sourceSolidFaceIndices.length
    ? face.sourceSolidFaceIndices
    : [faceIndex];
  if (isManifoldBooleanReady()) {
    const origin = vertexVector(face?.points?.[0] ?? sourceSolid.vertices?.[sourceSolid.faces?.[faceIndex]?.[0]]);
    const operationType = cleanDistance < 0 ? 'subtract' : 'union';
    const kernelDistance = operationType === 'subtract'
      ? subtractionCutterDistance(sourceSolid, cleanDistance, origin, unitNormal)
      : cleanDistance;
    const depth = Math.min(...sourceSolid.vertices.map((vertex) =>
      vertexVector(vertex).sub(origin).dot(unitNormal)));
    const through = cleanDistance < 0 && cleanDistance <= depth + SOLID_INTEGRITY_EPSILON;
    const operation = {
      type: operationType,
      distance: cleanDistance,
      requestedDistance: cleanDistance,
      ...(kernelDistance !== cleanDistance ? { kernelDistance } : {}),
      through,
      sourceSolidFaceIndex: faceIndex,
      sourceSolidFaceIndices: faceIndices,
      normal: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
    };
    const metadata = {
      lastPushFaceIndex: faceIndex,
      lastPushFaceIndices: faceIndices,
      lastPushDistance: cleanDistance,
      lastPushRequestedDistance: cleanDistance,
      lastPushNormal: operation.normal,
    };
    if (operationType === 'subtract') {
      return subtractFacePushSolid3d(sourceSolid, face, cleanDistance, {
        kernelDistance,
        operation,
        metadata,
      });
    }
    let toolSolid = null;
    try {
      toolSolid = solidFromFacePush(face, kernelDistance);
    }
    catch {
      return null;
    }
    return booleanSolid3d(sourceSolid, toolSolid, {
      operationType: operation.type,
      operation,
      metadata,
    });
  }
  const sourceFaces = faceIndices.map((index) => sourceSolid.faces?.[index]);
  if (sourceFaces.some((sourceFace) => !Array.isArray(sourceFace) || sourceFace.length < 3)) return null;
  const movingVertices = new Set(sourceFaces.flat());
  const effectiveDistance = constrainedMovedFaceDistance(
    sourceSolid,
    movingVertices,
    new Set(faceIndices),
    unitNormal,
    cleanDistance,
  );
  const offset = unitNormal.clone().multiplyScalar(effectiveDistance);
  if (!movedFaceKeepsMaterial(sourceSolid, movingVertices, unitNormal, effectiveDistance)) {
    return null;
  }
  const vertices = sourceSolid.vertices.map((vertex, index) => movingVertices.has(index)
    ? {
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
      z: vertex.z + offset.z,
    }
    : { ...vertex });
  const sourceVertexByPoint = new Map(sourceSolid.vertices.map((vertex, index) => [
    `${Number(vertex.x).toFixed(7)}:${Number(vertex.y).toFixed(7)}:${Number(vertex.z).toFixed(7)}`,
    index,
  ]));
  const movedMetadataPoint = (point) => {
    const key = `${Number(point?.x).toFixed(7)}:${Number(point?.y).toFixed(7)}:${Number(point?.z ?? 0).toFixed(7)}`;
    const vertexIndex = sourceVertexByPoint.get(key);
    return vertexIndex !== undefined && movingVertices.has(vertexIndex)
      ? { ...vertices[vertexIndex] }
      : { x: Number(point?.x), y: Number(point?.y), z: Number(point?.z ?? 0) };
  };
  const planarFaceGroups = (sourceSolid.metadata?.planarFaceGroups ?? []).map((group) => ({
    ...group,
    outerLoop: Array.isArray(group?.outerLoop)
      ? group.outerLoop.map(movedMetadataPoint)
      : group?.outerLoop,
    innerLoops: Array.isArray(group?.innerLoops)
      ? group.innerLoops.map((loop) => loop.map(movedMetadataPoint))
      : group?.innerLoops,
  }));
  const movedSolid = createSolid3d({
    vertices,
    faces: sourceSolid.faces,
    edges: sourceSolid.edges,
    metadata: {
      ...(sourceSolid.metadata && typeof sourceSolid.metadata === 'object'
        ? sourceSolid.metadata
        : {}),
      type: sourceSolid.metadata?.type === 'profileFeature' ? 'profileFeature' : 'push',
      planarFaceGroups,
      exactGeometry: pendingExactGeometry('face-push-exact-brep-not-implemented', {
        operation: {
          type: 'pushMoveFace',
          sourceSolidFaceIndex: faceIndex,
          sourceSolidFaceIndices: faceIndices,
          distance: effectiveDistance,
          requestedDistance: cleanDistance,
          normal: face.normal,
        },
      }),
      lastPushFaceIndex: faceIndex,
      lastPushFaceIndices: faceIndices,
      lastPushDistance: effectiveDistance,
      lastPushRequestedDistance: cleanDistance,
      lastPushNormal: { x: face.normal.x, y: face.normal.y, z: face.normal.z },
    },
  });
  return isPushSolidIntegrityValid(movedSolid) ? movedSolid : null;
}

export function createPushSolidMeshFromSolid(solid, options = {}) {
  const displaySolid = solidWithDerivedSurfaceTopology(solid);
  const geometry = solid3dToBufferGeometry(displaySolid);
  const material = new THREE.MeshStandardMaterial({
    color: options.faceColor ?? options.color ?? PUSH_SOLID_STYLE.faceColor,
    depthTest: true,
    depthWrite: true,
    emissive: 0x080808,
    emissiveIntensity: 0.08,
    metalness: 0,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: 2,
    polygonOffsetUnits: 2,
    roughness: 0.82,
    side: THREE.DoubleSide,
    transparent: false,
    wireframe: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name ?? `webcad-push-solid-${solid.metadata?.faceId ?? 'solid'}`;
  mesh.renderOrder = options.renderOrder ?? 18;
  mesh.userData = {
    type: 'webcad-push-solid',
    faceId: displaySolid.metadata?.faceId ?? null,
    height: displaySolid.metadata.height,
    normal: displaySolid.metadata.normal,
    sourceEntity: displaySolid.metadata.sourceEntity,
    sourceEntityId: displaySolid.metadata.sourceEntityId,
    sourceFaceType: displaySolid.metadata.sourceFaceType,
    sourceSolidFaceIndex: displaySolid.metadata.sourceSolidFaceIndex,
    sourceKey: displaySolid.metadata.sourceKey,
    exactGeometry: displaySolid.metadata.exactGeometry,
    cadProfileVertexIndices: displaySolid.metadata.cadProfileVertexIndices,
    smoothProfileVertexIndices: displaySolid.metadata.smoothProfileVertexIndices,
    solid: displaySolid,
  };
  return mesh;
}

export function createPushSolidMesh(face, height, options = {}) {
  return createPushSolidMeshFromSolid(solidFromFacePush(face, height, options), options);
}

export function createPushEdges(mesh, options = {}) {
  const solid = mesh.userData?.solid;
  const analyticEdges = sampleSolidAnalyticEdges(solid);
  const smoothProfileVertexIndices = new Set(
    Array.isArray(solid?.metadata?.smoothProfileVertexIndices)
      ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  const smoothVerticalEdgeIndices = new Set(
    Array.isArray(solid?.metadata?.smoothVerticalEdgeIndices)
      ? solid.metadata.smoothVerticalEdgeIndices
      : smoothProfileVertexIndices,
  );
  const cadProfileVertexIndices = new Set(
    Array.isArray(solid?.metadata?.cadProfileVertexIndices)
      ? solid.metadata.cadProfileVertexIndices
      : [],
  );
  const compatibleTangencies = profileTangencyIndices(solid, [...cadProfileVertexIndices]);
  compatibleTangencies.forEach((index) => {
    cadProfileVertexIndices.delete(index);
    smoothVerticalEdgeIndices.add(index);
  });
  const isCircleProfile = mesh.userData?.sourceFaceType === 'CIRCLE';
  const isProfileFeatureSolid = solid?.metadata?.type === 'profileFeature' ||
    Array.isArray(solid?.metadata?.profileFeatures);
  const hideVerticalSurfaceEdges = !isProfileFeatureSolid &&
    (isCircleProfile || smoothVerticalEdgeIndices.size > 0) &&
    options.showVerticalSurfaceEdges !== true;
  const segments = [];
  const sourceEdgeIndices = [];
  const curveGroupIds = [];
  const extrusionNormal = normalizedNormal(solid?.metadata?.normal ?? { x: 0, y: 0, z: 1 });
  const faceEdgeUseCount = new Map();
  if (isProfileFeatureSolid) {
    solid.faces.forEach((face) => face.forEach((startIndex, index) => {
      const endIndex = face[(index + 1) % face.length];
      const key = startIndex < endIndex
        ? `${startIndex}:${endIndex}`
        : `${endIndex}:${startIndex}`;
      faceEdgeUseCount.set(key, (faceEdgeUseCount.get(key) ?? 0) + 1);
    }));
  }
  for (const entry of analyticEdges.entries) {
    const edge = Array.isArray(entry.sourceEdgeIndices?.[0])
      ? entry.sourceEdgeIndices[0]
      : entry.sourceEdgeIndices;
    const startIndex = edge?.[0];
    const endIndex = edge?.[1];
    const start = entry.segment?.start;
    const end = entry.segment?.end;
    if (!start || !end) continue;
    const topologyKey = startIndex < endIndex
      ? `${startIndex}:${endIndex}`
      : `${endIndex}:${startIndex}`;
    if ((faceEdgeUseCount.get(topologyKey) ?? 0) > 2) continue;
    if (
      hideVerticalSurfaceEdges &&
      (isCircleProfile || (
        smoothVerticalEdgeIndices.has(Math.min(startIndex, endIndex)) &&
        !cadProfileVertexIndices.has(Math.min(startIndex, endIndex))
      )) &&
      extrusionNormal &&
      vertexVector(end).sub(vertexVector(start)).normalize().cross(extrusionNormal).lengthSq() <= 1e-12
    ) {
      continue;
    }
    segments.push({
      start: {
        x: start.x,
        y: start.y,
        z: start.z,
      },
      end: {
        x: end.x,
        y: end.y,
        z: end.z,
      },
    });
    sourceEdgeIndices.push(entry.sourceEdgeIndices ?? null);
    curveGroupIds.push(entry.curveGroupId ?? null);
  }
  const edges = createWideLineSegments(segments, {
    color: options.edgeColor ?? options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthBias: PUSH_SOLID_STYLE.edgeDepthBias,
    depthFunc: THREE.LessEqualDepth,
    depthTest: true,
    depthWrite: false,
    linewidth: options.edgeLineWidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    polygonOffset: true,
    polygonOffsetFactor: PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
    polygonOffsetUnits: PUSH_SOLID_STYLE.edgePolygonOffsetUnits,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder,
  });
  edges.name = `${mesh.name}-edges`;
  edges.userData = {
    type: 'webcad-push-solid-edges',
    faceId: mesh.userData.faceId,
    hiddenVerticalSurfaceEdges: hideVerticalSurfaceEdges,
    segmentCount: segments.length,
    sourceSegments: segments,
    sourceEdgeIndices,
    curveGroupIds,
    analyticEdgeGeometry: analyticEdges.geometry,
    sourceEntityId: mesh.userData.sourceEntityId,
    sourceKey: mesh.userData.sourceKey,
    showHiddenEdges: options.showHiddenEdges === true,
  };
  return edges;
}

export function createPushTangentEdges(mesh, options = {}) {
  const solid = mesh.userData?.solid;
  const segments = (solid?.metadata?.tangentEdges ?? []).flatMap((edge) => {
    const start = solid.vertices?.[edge.startIndex];
    const end = solid.vertices?.[edge.endIndex];
    return start && end ? [{ start: { ...start }, end: { ...end } }] : [];
  });
  const tangentEdges = createWideLineSegments(segments, {
    color: options.color ?? PUSH_SOLID_STYLE.tangentEdgeColor,
    depthBias: PUSH_SOLID_STYLE.edgeDepthBias,
    depthFunc: THREE.LessEqualDepth,
    depthTest: true,
    depthWrite: false,
    linewidth: options.linewidth ?? PUSH_SOLID_STYLE.tangentEdgeLineWidth,
    polygonOffset: true,
    polygonOffsetFactor: PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
    polygonOffsetUnits: PUSH_SOLID_STYLE.edgePolygonOffsetUnits,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder - 1,
  });
  tangentEdges.name = `${mesh.name}-tangent-edges`;
  tangentEdges.userData = {
    type: 'webcad-push-solid-tangent-edges',
    segmentCount: segments.length,
    sourceSegments: segments,
  };
  return tangentEdges;
}

export function setPushSolidGroupCurveGeneratrices(group, visible) {
  if (group?.userData?.type !== 'webcad-push-solid-group') return false;
  group.userData.showCurveGeneratrices = visible === true;
  const generatrices = group.children.find((child) => child.userData?.type === 'webcad-push-generatrix-silhouette');
  if (generatrices) generatrices.visible = group.userData.showCurveGeneratrices;
  return true;
}

export function setPushSolidGroupHiddenEdges(group, visible) {
  if (group?.userData?.type !== 'webcad-push-solid-group') return false;
  group.userData.showHiddenEdges = visible === true;
  const hiddenEdges = group.children.find((child) => child.userData?.type === 'webcad-push-solid-hidden-edges');
  if (hiddenEdges) hiddenEdges.visible = group.userData.showHiddenEdges;
  return true;
}

export function createPushSolidGroup(face, height, options = {}) {
  return createPushSolidGroupFromSolid(solidFromFacePush(face, height, options), {
    ...options,
    name: options.name ?? `webcad-push-group-${face?.id ?? 'face'}`,
  });
}

export function createPushSolidGroupFromSolid(solid, options = {}) {
  const group = new THREE.Group();
  group.name = options.name ?? `webcad-push-group-${solid.metadata?.faceId ?? 'solid'}`;
  const mesh = createPushSolidMeshFromSolid(solid, options);
  const edges = createPushEdges(mesh, {
    edgeColor: options.edgeColor,
    edgeLineWidth: options.edgeLineWidth,
    renderOrder: options.edgeRenderOrder,
  });
  const tangentEdges = createPushTangentEdges(mesh, {
    renderOrder: options.edgeRenderOrder,
  });
  group.add(mesh, edges);
  if (tangentEdges.userData.segmentCount > 0) group.add(tangentEdges);
  else disposeThreeObject(tangentEdges);
  group.userData = {
    type: 'webcad-push-solid-group',
    faceId: mesh.userData.faceId,
    height: mesh.userData.height,
    normal: mesh.userData.normal,
    sourceEntity: mesh.userData.sourceEntity,
    sourceEntityId: mesh.userData.sourceEntityId,
    sourceFaceType: mesh.userData.sourceFaceType,
    sourceSolidFaceIndex: mesh.userData.sourceSolidFaceIndex,
    sourceKey: mesh.userData.sourceKey,
    exactGeometry: mesh.userData.exactGeometry,
    solid: mesh.userData.solid,
    showCurveGeneratrices: true,
    showHiddenEdges: options.showHiddenEdges === true,
  };
  return group;
}

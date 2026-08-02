/* webCAD - Geometria aislada para Push 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { createExactExtrusion } from '../exact-extrusion.js';
import {
  exactProfileFromEntity,
  sampleExactProfile,
} from '../exact-profile.js';
import { extrudeClosedProfile } from '../extrusion.js';
import {
  exactProfileOnSketchPlane,
  pointFromSketchPlane,
  pointOnExactProfilePlane,
  sketchPlaneFromFace,
  solidOnSketchPlane,
} from '../sketch-plane.js';
import { createSolid3d, isValidSolid3d } from '../solid.js';
import { solid3dToBufferGeometry } from './solid-to-buffer-geometry.js';
import { createWideLineSegments, disposeThreeObject } from './three-scene-style.js';
import { profileTangencyIndices } from './profile-tangency.js';
import {
  exactProfileWithAnalyticSources,
  sampleSolidAnalyticEdges,
} from '../analytic-edges.js';
import {
  booleanContactOverlap,
  booleanWeldTolerance,
  coplanarFaceTolerance,
  meetsMinimum3dThickness,
  MINIMUM_3D_THICKNESS,
  minimumBooleanOperationDistance,
} from '../tolerances.js';
import {
  isManifoldBooleanReady,
  splitSolidByPlane3d,
  solidWithDerivedSurfaceTopology,
  subtractSolid3dComponents,
  subtractFacePushSolid3d,
  subtractionCutterDistance,
  unionSolid3dComponents,
} from './manifold-boolean.js';
import { consolidateAdditiveSweep } from './additive-solid-consolidation.js';

const SOLID_INTEGRITY_EPSILON = 1e-6;
let analyticRegionSequence = 0;

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

export function pushSourceKeyFromAnalyticRegion(analyticRegionId) {
  return analyticRegionId
    ? `solid-region:${analyticRegionId}`
    : null;
}

export function pushSourceKeyFromFace(face) {
  const regionKey = pushSourceKeyFromAnalyticRegion(face?.analyticRegionId);
  if (regionKey) return regionKey;
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

export function snapBooleanOperationDistance(
  solid,
  origin,
  normal,
  requestedDistance,
) {
  const distance = Number(requestedDistance);
  const axis = normalizedNormal(normal);
  if (!isValidSolid3d(solid) || !axis || !Number.isFinite(distance)) return distance;
  const start = vertexVector(origin);
  if (![start.x, start.y, start.z].every(Number.isFinite)) return distance;
  const tolerance = coplanarFaceTolerance(solid);
  let nearest = distance;
  let nearestDelta = tolerance;
  solid.vertices.forEach((vertex) => {
    const level = vertexVector(vertex).sub(start).dot(axis);
    const delta = Math.abs(level - distance);
    if (delta <= nearestDelta) {
      nearest = level;
      nearestDelta = delta;
    }
  });
  return nearest;
}

export function createAnalyticRegionId() {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) return `analytic-region-${uuid}`;
  analyticRegionSequence += 1;
  return `analytic-region-runtime-${analyticRegionSequence}`;
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function translatedPoint(point, direction, distance) {
  return {
    x: Number(point?.x) + direction.x * distance,
    y: Number(point?.y) + direction.y * distance,
    z: (Number(point?.z) || 0) + direction.z * distance,
  };
}

function faceWithBooleanUnionOverlap(face, direction, overlap) {
  const shifted = {
    ...face,
    points: (face?.points ?? []).map((point) =>
      translatedPoint(point, direction, -overlap)),
    holes: (face?.holes ?? []).map((loop) => loop.map((point) =>
      translatedPoint(point, direction, -overlap))),
  };
  if (face?.workplane) {
    shifted.workplane = {
      ...cloneJson(face.workplane),
      origin: translatedPoint(face.workplane.origin, direction, -overlap),
    };
  }
  if (face?.exactProfile?.plane) {
    shifted.exactProfile = cloneJson(face.exactProfile);
    shifted.exactProfile.plane.origin = translatedPoint(
      face.exactProfile.plane.origin,
      direction,
      -overlap,
    );
  }
  return shifted;
}

export function solidFromBooleanFeatureTool(sourceSolid, face, distance) {
  const cleanDistance = pushHeightValue(distance);
  const axis = normalizedNormal(
    face?.analyticAxis ??
    face?.normal ??
    face?.exactProfile?.plane?.normal,
  );
  if (cleanDistance === null || !axis) return null;
  const direction = axis.multiplyScalar(Math.sign(cleanDistance));
  const overlap = booleanContactOverlap(sourceSolid);
  return solidFromFacePush(
    faceWithBooleanUnionOverlap(face, direction, overlap),
    cleanDistance + Math.sign(cleanDistance) * overlap,
  );
}

function consolidatedAdditiveFaceSweep(sourceSolid, face, distance, options = {}) {
  const primaryTool = solidFromBooleanFeatureTool(sourceSolid, face, distance);
  const primary = consolidateAdditiveSweep(sourceSolid, primaryTool, options);
  if (primary) return primary;

  const axis = normalizedNormal(
    face?.analyticAxis ??
    face?.normal ??
    face?.exactProfile?.plane?.normal,
  );
  if (!axis) return null;
  const overlap = booleanWeldTolerance(sourceSolid);
  const fallbackTool = solidFromFacePush(
    faceWithBooleanUnionOverlap(face, axis.multiplyScalar(Math.sign(distance)), overlap),
    Number(distance) + Math.sign(distance) * overlap,
    { allowSubMinimumThickness: true },
  );
  return consolidateAdditiveSweep(sourceSolid, fallbackTool, options);
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

function movedFaceKeepsMaterial(
  sourceSolid,
  movingVertices,
  unitNormal,
  distance,
  { allowOrientationCrossing = false } = {},
) {
  const microThicknessTolerance = Math.max(
    SOLID_INTEGRITY_EPSILON,
    booleanWeldTolerance(sourceSolid),
  );
  return sourceSolid.edges.every((edge) => {
    const firstMoves = movingVertices.has(edge[0]);
    const secondMoves = movingVertices.has(edge[1]);
    if (firstMoves === secondMoves) return true;
    const movingIndex = firstMoves ? edge[0] : edge[1];
    const fixedIndex = firstMoves ? edge[1] : edge[0];
    const originalThickness = vertexVector(sourceSolid.vertices[movingIndex])
      .sub(vertexVector(sourceSolid.vertices[fixedIndex]))
      .dot(unitNormal);
    if (Math.abs(originalThickness) <= microThicknessTolerance) return true;
    const movedThickness = originalThickness + distance;
    const keepsOrientation = originalThickness > 0
      ? movedThickness > SOLID_INTEGRITY_EPSILON
      : movedThickness < -SOLID_INTEGRITY_EPSILON;
    if (!keepsOrientation) return allowOrientationCrossing;
    if (Math.abs(originalThickness) + SOLID_INTEGRITY_EPSILON <
        MINIMUM_3D_THICKNESS) {
      return true;
    }
    return meetsMinimum3dThickness(movedThickness);
  });
}

function faceCoversMovingVertices(face, sourceSolid, movingVertices) {
  const points = Array.isArray(face?.points) ? face.points : [];
  if (!points.length || points.length !== movingVertices.size) return false;
  const tolerance = booleanWeldTolerance(sourceSolid);
  return [...movingVertices].every((vertexIndex) => {
    const vertex = sourceSolid.vertices[vertexIndex];
    return points.some((point) => Math.hypot(
      Number(point.x) - vertex.x,
      Number(point.y) - vertex.y,
      Number(point.z ?? 0) - vertex.z,
    ) <= tolerance);
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
  if (!meetsMinimum3dThickness(cleanHeight) &&
      options.allowSubMinimumThickness !== true) return null;
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

function exactProfileWorldLoops(profile) {
  const sampled = sampleExactProfile(profile, {
    segments: 64,
    structured: true,
  });
  if (!sampled?.outerLoop?.length) return null;
  const plane = profile?.plane;
  const xAxis = vertexVector(plane?.xAxis);
  const normal = vertexVector(plane?.normal);
  if (xAxis.lengthSq() <= 1e-12 || normal.lengthSq() <= 1e-12) return null;
  const worldLoop = (loop) => {
    const points = loop.map((point) => pointOnExactProfilePlane(point, plane));
    if (points.length > 3 && points[0] && points.at(-1) &&
        vertexVector(points[0]).distanceTo(vertexVector(points.at(-1))) <= 1e-9) {
      points.pop();
    }
    return points;
  };
  return {
    outer: worldLoop(sampled.outerLoop),
    holes: sampled.innerLoops.map(worldLoop),
  };
}

function faceFromExactFeature(profile) {
  const loops = exactProfileWorldLoops(profile);
  const normal = normalizedNormal(profile?.plane?.normal);
  if (!loops || !normal || loops.outer.length < 3) return null;
  const smoothOuter = profile.outerLoop?.segments?.length === 1 &&
    ['circle', 'ellipse'].includes(profile.outerLoop.segments[0]?.type);
  const smoothHoles = (profile.innerLoops ?? []).map((loop) =>
    loop?.segments?.length === 1 &&
    ['circle', 'ellipse'].includes(loop.segments[0]?.type));
  return {
    points: loops.outer,
    holes: loops.holes,
    normal: { x: normal.x, y: normal.y, z: normal.z },
    exactProfile: cloneJson(profile),
    cadProfileVertexIndices: smoothOuter
      ? []
      : loops.outer.map((_, index) => index),
    smoothProfileVertexIndices: smoothOuter
      ? loops.outer.map((_, index) => index)
      : [],
    holeCadProfileVertexIndices: loops.holes.map((loop, loopIndex) =>
      smoothHoles[loopIndex] ? [] : loop.map((_, index) => index)),
    holeSmoothProfileVertexIndices: loops.holes.map((loop, loopIndex) =>
      smoothHoles[loopIndex] ? loop.map((_, index) => index) : []),
  };
}

function stableRegionHash(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function canonicalLoopKey(loop, tolerance) {
  const points = (loop ?? []).map((point) => [
    Math.round(Number(point?.x) / tolerance),
    Math.round(Number(point?.y) / tolerance),
    Math.round((Number(point?.z) || 0) / tolerance),
  ].join(':'));
  if (!points.length) return '';
  const orientations = [points, [...points].reverse()];
  return orientations.flatMap((entries) => entries.map((_, start) => [
    ...entries.slice(start),
    ...entries.slice(0, start),
  ].join('|'))).sort()[0];
}

function pushRegionIdentity(face, solid) {
  const normal = normalizedNormal(face?.normal);
  if (!normal || !Array.isArray(face?.points) || face.points.length < 3) return null;
  const tolerance = coplanarFaceTolerance(solid);
  const outerKey = canonicalLoopKey(face.points, tolerance);
  const innerKeys = (face.holes ?? [])
    .map((loop) => canonicalLoopKey(loop, tolerance))
    .sort();
  const boundaryKey = [outerKey, ...innerKeys].join('::');
  const planeOffset = facePlaneOffset(face.points, normal);
  const planeKey = [normal.x, normal.y, normal.z]
    .map((value) => Math.round(value * 1e8))
    .concat(Math.round(planeOffset / tolerance))
    .join(':');
  return {
    type: 'push-region-v1',
    id: `push-region-${stableRegionHash(`${planeKey}:${boundaryKey}`)}`,
    boundaryKey,
    plane: {
      normal: { x: normal.x, y: normal.y, z: normal.z },
      offset: planeOffset,
    },
    outerPointCount: face.points.length,
    innerPointCounts: (face.holes ?? []).map((loop) => loop.length),
  };
}

function pushFaceProvenance(face, solid) {
  const latestFeature = solid?.metadata?.profileFeatures?.at?.(-1);
  return {
    analyticRegionId: face?.analyticRegionId ?? null,
    analyticParentRegionId: face?.analyticParentRegionId ?? null,
    sourceSolidDocumentId: face?.sourceSolidDocumentId ??
      solid?.metadata?.sourceSolidDocumentId ?? null,
    sourceFeature: latestFeature ? {
      type: latestFeature.type ?? null,
      analyticRegionId: latestFeature.analyticRegionId ?? null,
      side: latestFeature.side ?? null,
      component: latestFeature.component ?? null,
    } : null,
    planeCut: cloneJson(solid?.metadata?.planeCut ?? null),
  };
}

export function pushInputFaceSnapshot(face, solid) {
  const normal = normalizedNormal(face?.normal);
  const points = (face?.points ?? []).map((point) => ({
    x: Number(point?.x),
    y: Number(point?.y),
    z: Number(point?.z) || 0,
  }));
  const holes = (face?.holes ?? []).map((loop) => loop.map((point) => ({
    x: Number(point?.x),
    y: Number(point?.y),
    z: Number(point?.z) || 0,
  })));
  if (!normal || points.length < 3 ||
      [points, ...holes].some((loop) => loop.some((point) =>
        ![point.x, point.y, point.z].every(Number.isFinite)))) {
    return null;
  }
  return {
    type: 'push-input-face-v2',
    points,
    holes,
    normal: { x: normal.x, y: normal.y, z: normal.z },
    region: pushRegionIdentity({ ...face, points, holes }, solid),
    provenance: pushFaceProvenance(face, solid),
    cadProfileVertexIndices: [...(face?.cadProfileVertexIndices ?? [])],
    smoothProfileVertexIndices: [...(face?.smoothProfileVertexIndices ?? [])],
    holeCadProfileVertexIndices: cloneJson(
      face?.holeCadProfileVertexIndices ?? [],
    ),
    holeSmoothProfileVertexIndices: cloneJson(
      face?.holeSmoothProfileVertexIndices ?? [],
    ),
  };
}

function faceFromPushInputSnapshot(snapshot) {
  if (!['push-input-face-v1', 'push-input-face-v2'].includes(snapshot?.type)) {
    return null;
  }
  const normal = normalizedNormal(snapshot.normal);
  const points = cloneJson(snapshot.points ?? []);
  const holes = cloneJson(snapshot.holes ?? []);
  if (!normal || points.length < 3) return null;
  return {
    points,
    holes,
    normal: { x: normal.x, y: normal.y, z: normal.z },
    analyticAxis: { x: normal.x, y: normal.y, z: normal.z },
    cadProfileVertexIndices: [...(snapshot.cadProfileVertexIndices ?? [])],
    smoothProfileVertexIndices: [...(snapshot.smoothProfileVertexIndices ?? [])],
    holeCadProfileVertexIndices: cloneJson(
      snapshot.holeCadProfileVertexIndices ?? [],
    ),
    holeSmoothProfileVertexIndices: cloneJson(
      snapshot.holeSmoothProfileVertexIndices ?? [],
    ),
    region: cloneJson(snapshot.region ?? null),
    provenance: cloneJson(snapshot.provenance ?? null),
  };
}

function copyExactProfileSegmentSources(targetProfile, sourceProfile) {
  const targetLoops = [
    targetProfile?.outerLoop,
    ...(targetProfile?.innerLoops ?? []),
  ];
  const sourceLoops = [
    sourceProfile?.outerLoop,
    ...(sourceProfile?.innerLoops ?? []),
  ];
  targetLoops.forEach((targetLoop, loopIndex) => {
    const sourceSegments = sourceLoops[loopIndex]?.segments ?? [];
    (targetLoop?.segments ?? []).forEach((segment, segmentIndex) => {
      const source = sourceSegments[segmentIndex]?.source;
      if (source?.role) segment.source = cloneJson(source);
    });
  });
  if (targetProfile?.outerLoop) {
    targetProfile.segments = targetProfile.outerLoop.segments;
  }
}

function solidFromExactBase(sourceSolid) {
  const base = sourceSolid?.metadata?.exactGeometry?.base ??
    (sourceSolid?.metadata?.exactGeometry?.extrusion
      ? sourceSolid.metadata.exactGeometry
      : null);
  const extrusion = base?.extrusion;
  const profile = extrusion?.profile ?? base?.profile;
  const distance = Number(extrusion?.distance);
  const face = faceFromExactFeature(profile);
  if (!face || !Number.isFinite(distance) || Math.abs(distance) <= 1e-9) return null;
  const extrusionDirection = normalizedNormal(extrusion?.direction);
  if (!extrusionDirection) return null;
  const solid = solidFromFacePush({
    ...face,
    normal: {
      x: extrusionDirection.x,
      y: extrusionDirection.y,
      z: extrusionDirection.z,
    },
    id: profile.id ?? null,
    sketchId: extrusion.metadata?.sketchId ?? null,
    sketchPlane: extrusion.metadata?.sketchPlane ?? null,
  }, distance);
  if (!isValidSolid3d(solid)) return null;
  solid.metadata = {
    ...solid.metadata,
    exactGeometry: cloneJson(base),
    profileFeatures: [],
    sourceSolidDocumentId: sourceSolid.metadata?.sourceSolidDocumentId ?? null,
  };
  return solid;
}

function featureOperationType(feature, distance = feature?.distance) {
  const value = Number(distance);
  if (!Number.isFinite(value)) return null;
  if (value > 0) return 'union';
  if (value < 0) return 'subtract';
  return null;
}

function replayedFeatureFace(feature) {
  return feature?.exactProfile?.plane
    ? faceFromExactFeature(feature.exactProfile)
    : faceFromPushInputSnapshot(feature?.inputFace);
}

function applyStoredPushFeature(rebuilt, sourceFeature, options = {}) {
  if (sourceFeature?.type === 'subtractSolid') {
    const tool = rebuildSolidFromAuthority(sourceFeature?.tool?.authority, options);
    if (!tool) return null;
    const result = subtractSolid3dComponents(rebuilt, tool, {
      operation: cloneJson(sourceFeature),
      toolTransform: sourceFeature.tool.transform,
    });
    if (!result.ok) return null;
    return result.solids[Number(sourceFeature.component) - 1] ?? null;
  }
  if (sourceFeature?.type === 'unionSolid') {
    const tool = rebuildSolidFromAuthority(sourceFeature?.tool?.authority, options);
    if (!tool) return null;
    const components = unionSolid3dComponents(rebuilt, tool, {
      operation: cloneJson(sourceFeature),
      toolTransform: sourceFeature.tool.transform,
    });
    return components?.length === 1 ? components[0] : null;
  }
  if (sourceFeature?.type === 'cutSolidByPlane') {
    const cut = splitSolidByPlane3d(rebuilt, sourceFeature.points, {
      operation: cloneJson(sourceFeature),
    });
    if (!cut.ok) return null;
    return cut.parts.find((part) =>
      part.side === sourceFeature.side &&
      part.componentIndex + 1 === Number(sourceFeature.component))?.solid ?? null;
  }
  const distance = Number(options.distance ?? sourceFeature?.distance);
  const operationType = options.operationType ??
    featureOperationType(sourceFeature, distance);
  if (!['union', 'subtract'].includes(operationType) || !Number.isFinite(distance)) {
    return null;
  }
  const featureFace = options.face ?? replayedFeatureFace(sourceFeature);
  if (!featureFace) return null;
  const operation = {
    ...cloneJson(sourceFeature),
    type: operationType,
    distance,
    requestedDistance: distance,
  };
  delete operation.kernelDistance;
  if (Math.abs(distance) <= booleanWeldTolerance(rebuilt)) return rebuilt;
  if (operationType === 'subtract') {
    const featureNormal = normalizedNormal(featureFace.normal);
    const featureOrigin = vertexVector(featureFace.points[0]);
    operation.through = featureNormal
      ? distance <= Math.min(...rebuilt.vertices.map((vertex) =>
        vertexVector(vertex).sub(featureOrigin).dot(featureNormal))) +
        booleanWeldTolerance(rebuilt)
      : false;
    const kernelDistance = featureNormal
      ? subtractionCutterDistance(
        rebuilt,
        distance,
        featureOrigin,
        featureNormal,
      )
      : distance;
    return subtractFacePushSolid3d(rebuilt, featureFace, distance, {
      kernelDistance,
      operation,
      onDiagnostic: options.onDiagnostic,
    });
  }
  operation.through = false;
  return consolidatedAdditiveFaceSweep(rebuilt, featureFace, distance, {
    operation,
    onDiagnostic: options.onDiagnostic,
  });
}

function rebuildSolidThroughFeatures(sourceSolid, endIndex, options = {}) {
  const features = sourceSolid?.metadata?.profileFeatures;
  if (!Array.isArray(features)) return null;
  let rebuilt = solidFromExactBase(sourceSolid);
  if (!rebuilt) return null;
  for (let index = 0; index < endIndex; index += 1) {
    rebuilt = applyStoredPushFeature(rebuilt, features[index], options);
    if (!isValidSolid3d(rebuilt)) return null;
  }
  return rebuilt;
}

export function rebuildSolidFromAuthority(authority, options = {}) {
  if (authority?.type !== 'parametric-solid-v1' ||
      authority?.base?.type !== 'extrusion') return null;
  const features = Array.isArray(authority.operations)
    ? cloneJson(authority.operations)
    : [];
  const profile = cloneJson(authority.base.profile);
  const sourceSolid = {
    metadata: {
      exactGeometry: {
        status: 'available',
        representation: 'exact-extrusion-v1',
        base: {
          status: 'available',
          representation: 'exact-extrusion-v1',
          profile,
          extrusion: {
            type: 'exact-extrusion',
            version: 1,
            profile: cloneJson(profile),
            direction: cloneJson(authority.base.direction),
            distance: Number(authority.base.distance),
            metadata: cloneJson(authority.base.metadata ?? {}),
          },
        },
      },
      profileFeatures: features,
      sourceSolidDocumentId: authority.sourceSolidDocumentId ?? null,
    },
  };
  const rebuilt = rebuildSolidThroughFeatures(sourceSolid, features.length, options);
  return isValidSolid3d(rebuilt) ? rebuilt : null;
}

function facePlaneOffset(points, normal) {
  if (!Array.isArray(points) || !points.length) return null;
  return points.reduce((sum, point) => sum + vertexVector(point).dot(normal), 0) /
    points.length;
}

function inputFaceForMoveFeature(rebuilt, feature, terminalFace) {
  const featureNormal = normalizedNormal(feature?.normal ?? feature?.analyticAxis);
  const terminalNormal = normalizedNormal(terminalFace?.normal);
  const distance = Number(feature?.distance);
  if (!featureNormal || !terminalNormal || !Number.isFinite(distance) ||
      featureNormal.dot(terminalNormal) < 1 - 1e-5) {
    return null;
  }
  const terminalOffset = facePlaneOffset(terminalFace.points, featureNormal);
  if (!Number.isFinite(terminalOffset)) return null;
  const snapshotFace = faceFromPushInputSnapshot(feature.inputFace);
  const snapshotOffset = snapshotFace
    ? facePlaneOffset(snapshotFace.points, featureNormal)
    : null;
  const tolerance = Math.max(
    booleanWeldTolerance(rebuilt),
    booleanWeldTolerance(terminalFace.sourceSolid),
  );
  const persistedGroups = rebuilt.metadata?.planarFaceGroups ?? [];
  const faceGroups = persistedGroups.length
    ? persistedGroups
    : rebuilt.faces.map((indices, faceIndex) => {
      const normal = planarFaceNormal(indices, rebuilt.vertices);
      return normal ? {
        indices: [faceIndex],
        outerLoop: indices.map((vertexIndex) => rebuilt.vertices[vertexIndex]),
        innerLoops: [],
        normal: { x: normal.x, y: normal.y, z: normal.z },
      } : null;
    }).filter(Boolean);
  const candidates = faceGroups.filter((group) => {
    const groupNormal = normalizedNormal(group?.normal);
    const groupOffset = facePlaneOffset(group?.outerLoop, featureNormal);
    const candidateRegion = pushRegionIdentity({
      points: group.outerLoop,
      holes: group.innerLoops ?? [],
      normal: group.normal,
    }, rebuilt);
    return groupNormal && groupNormal.dot(featureNormal) >= 1 - 1e-5 &&
      Number.isFinite(groupOffset) &&
      Math.abs(groupOffset + distance - terminalOffset) <= tolerance &&
      (!Number.isFinite(snapshotOffset) ||
        Math.abs(groupOffset - snapshotOffset) <= tolerance) &&
      (!snapshotFace?.region?.id ||
        candidateRegion?.id === snapshotFace.region.id);
  });
  if (candidates.length !== 1) return null;
  const group = candidates[0];
  const face = snapshotFace ?? {
    points: cloneJson(group.outerLoop),
    holes: cloneJson(group.innerLoops ?? []),
    normal: { x: featureNormal.x, y: featureNormal.y, z: featureNormal.z },
    analyticAxis: { x: featureNormal.x, y: featureNormal.y, z: featureNormal.z },
  };
  return {
    ...face,
    sourceSolid: rebuilt,
    sourceSolidDocumentId: terminalFace.sourceSolidDocumentId ?? null,
    sourceSolidFaceIndex: group.indices[0],
    sourceSolidFaceIndices: [...group.indices],
  };
}

function replayMoveFaceFeature(sourceSolid, face, moveDistance, options = {}) {
  const features = sourceSolid?.metadata?.profileFeatures;
  const featureIndex = features?.length - 1;
  const creator = features?.[featureIndex];
  if (featureIndex < 0 || creator?.exactProfile ||
      !['union', 'subtract'].includes(creator?.type) ||
      !isManifoldBooleanReady()) {
    return null;
  }
  const rebuilt = rebuildSolidThroughFeatures(sourceSolid, featureIndex, options);
  if (!rebuilt) return null;
  const topologySolid = Array.isArray(rebuilt.metadata?.planarFaceGroups)
    ? rebuilt
    : solidWithDerivedSurfaceTopology(rebuilt) ?? rebuilt;
  const inputFace = inputFaceForMoveFeature(topologySolid, creator, face);
  if (!inputFace) return null;
  inputFace.sourceSolid = rebuilt;
  const selectedNormal = normalizedNormal(face.normal);
  const featureNormal = normalizedNormal(creator.normal ?? creator.analyticAxis);
  const nextDistance = Number(creator.distance) + selectedNormal
    .multiplyScalar(moveDistance)
    .dot(featureNormal);
  if (!Number.isFinite(nextDistance)) return null;
  if (Math.abs(nextDistance) <= booleanWeldTolerance(rebuilt)) {
    options.onDiagnostic?.({
      operation: {
        type: 'pushMoveFace',
        requestedDistance: moveDistance,
        previousDistance: Number(creator.distance),
        resultingDistance: 0,
      },
      target: {
        id: face?.sourceSolidDocumentId ??
          sourceSolid?.metadata?.sourceSolidDocumentId ?? null,
        vertexCount: sourceSolid.vertices.length,
        faceCount: sourceSolid.faces.length,
      },
      cutter: {
        region: cloneJson(creator.inputFace?.region ?? null),
        provenance: cloneJson(creator.inputFace?.provenance ?? null),
      },
      coordinateSystem: face?.workplane ?? 'solid-local',
      precheck: {
        materialPredicted: true,
        matchedInputRegion: true,
      },
      effectiveTolerance: booleanWeldTolerance(rebuilt),
      phase: 'parametric-replay',
      reason: 'success',
    });
    return {
      ...rebuilt,
      metadata: {
        ...rebuilt.metadata,
        lastPushDistance: moveDistance,
        lastPushFaceIndex: null,
        lastPushFaceIndices: [],
        lastPushRegion: cloneJson(creator.inputFace?.region ?? null),
        lastPushRequestedDistance: moveDistance,
        lastPushNormal: cloneJson(face.normal),
      },
    };
  }
  return movedSolidFacePush(inputFace, nextDistance, {
    ...options,
    skipFeatureReplay: true,
  });
}

function replayExactProfileFeature(sourceSolid, face, moveDistance, options = {}) {
  const features = sourceSolid?.metadata?.profileFeatures;
  const semanticFeatureIndex = Number(face?.analyticFeatureIndex);
  const featureIndex = face?.analyticRegionId
    ? features?.findIndex((feature) =>
      feature?.analyticRegionId === face.analyticRegionId)
    : semanticFeatureIndex;
  if (!Array.isArray(features) ||
      !Number.isInteger(featureIndex) ||
      featureIndex < 0 ||
      face?.analyticCapIndex !== 1 ||
      !['union', 'subtract'].includes(face?.analyticOperationType) ||
      !isManifoldBooleanReady()) {
    return null;
  }
  const creator = features?.[featureIndex];
  if (!['union', 'subtract'].includes(creator?.type) ||
      !creator?.exactProfile?.plane) {
    return null;
  }
  const selectedNormal = normalizedNormal(face?.normal);
  const featureAxis = normalizedNormal(creator.exactProfile.plane.normal);
  if (!selectedNormal || !featureAxis) return null;
  const deltaAlongFeatureAxis = selectedNormal
    .multiplyScalar(moveDistance)
    .dot(featureAxis);
  const previousDistance = Number(creator.distance);
  const nextDistance = previousDistance + deltaAlongFeatureAxis;
  if (!Number.isFinite(previousDistance) || !Number.isFinite(nextDistance)) return null;
  const tolerance = booleanWeldTolerance(sourceSolid);
  const replacementType = nextDistance > tolerance
    ? 'union'
    : nextDistance < -tolerance
      ? 'subtract'
      : null;

  let rebuilt = solidFromExactBase(sourceSolid);
  if (!rebuilt) return null;
  for (let index = 0; index < features.length; index += 1) {
    const sourceFeature = features[index];
    if (sourceFeature?.type === 'cutSolidByPlane') {
      rebuilt = applyStoredPushFeature(rebuilt, sourceFeature, options);
      if (!isValidSolid3d(rebuilt)) return null;
      continue;
    }
    if (!['union', 'subtract'].includes(sourceFeature?.type)) return null;
    const replacingCreator = index === featureIndex;
    const distance = replacingCreator ? nextDistance : Number(sourceFeature.distance);
    if (!Number.isFinite(distance)) return null;
    if (Math.abs(distance) <= tolerance) continue;
    const featureFace = replayedFeatureFace(sourceFeature);
    if (!featureFace) return null;
    const operationType = replacingCreator ? replacementType : sourceFeature.type;
    if (!operationType) continue;
    const operation = cloneJson(sourceFeature);
    if (replacingCreator && face?.exactProfile) {
      copyExactProfileSegmentSources(operation.exactProfile, face.exactProfile);
    }
    const next = applyStoredPushFeature(rebuilt, operation, {
      ...options,
      distance,
      face: featureFace,
      operationType,
    });
    if (!isValidSolid3d(next)) return null;
    rebuilt = next;
  }
  return {
    ...rebuilt,
    metadata: {
      ...rebuilt.metadata,
      lastPushDistance: moveDistance,
      lastPushFaceIndex: null,
      lastPushFaceIndices: [],
      lastPushRegion: face.analyticRegionId ? {
        type: 'analytic-region-v1',
        id: face.analyticRegionId,
      } : cloneJson(face.region ?? null),
      lastPushRequestedDistance: moveDistance,
      lastPushNormal: {
        x: face.normal.x,
        y: face.normal.y,
        z: face.normal.z,
      },
      sourceSolidDocumentId: sourceSolid.metadata?.sourceSolidDocumentId ??
        rebuilt.metadata?.sourceSolidDocumentId ??
        null,
    },
  };
}

export function movedSolidFacePush(face, distance, options = {}) {
  const requestedDistance = pushHeightValue(distance);
  const sourceSolid = face?.sourceSolid;
  const faceIndex = face?.sourceSolidFaceIndex;
  const unitNormal = normalizedNormal(
    face?.exactProfile ? face?.analyticAxis ?? face?.normal : face?.normal,
  );
  const emitDiagnostic = (diagnostic) => options.onDiagnostic?.({
    operation: {
      type: Number(distance) < 0 ? 'subtract' : 'union',
      distance,
      sourceSolidFaceIndex: faceIndex ?? null,
      sourceSolidFaceIndices: face?.sourceSolidFaceIndices ?? null,
    },
    target: {
      id: face?.sourceSolidDocumentId ?? sourceSolid?.metadata?.sourceSolidDocumentId ?? null,
      vertexCount: sourceSolid?.vertices?.length ?? 0,
      faceCount: sourceSolid?.faces?.length ?? 0,
    },
    cutter: {
      outerPointCount: face?.points?.length ?? 0,
      holeCount: face?.holes?.length ?? 0,
    },
    coordinateSystem: face?.workplane ?? 'solid-local',
    ...diagnostic,
  });
  if (requestedDistance === null) {
    if (Number(distance) < 0) {
      emitDiagnostic({
        phase: 'distance-validation',
        reason: 'below-useful-tolerance',
        requestedDistance: distance,
        effectiveTolerance: minimumBooleanOperationDistance(sourceSolid),
      });
    }
    throw new RangeError('La distancia de Push debe ser distinta de cero');
  }
  if (!sourceSolid || !Number.isInteger(faceIndex) || !unitNormal) {
    if (requestedDistance < 0) {
      emitDiagnostic({
        phase: 'input-validation',
        reason: !isValidSolid3d(sourceSolid)
          ? 'invalid-target-solid'
          : 'invalid-cutter-profile',
      });
    }
    return null;
  }
  const origin = vertexVector(
    face?.points?.[0] ??
    sourceSolid.vertices?.[sourceSolid.faces?.[faceIndex]?.[0]],
  );
  const cleanDistance = snapBooleanOperationDistance(
    sourceSolid,
    origin,
    unitNormal,
    requestedDistance,
  );
  if (Math.abs(cleanDistance) <= minimumBooleanOperationDistance(sourceSolid)) {
    if (requestedDistance < 0) {
      emitDiagnostic({
        phase: 'distance-validation',
        reason: 'below-useful-tolerance',
        requestedDistance,
        effectiveDistance: cleanDistance,
        effectiveTolerance: minimumBooleanOperationDistance(sourceSolid),
      });
    }
    return null;
  }
  const analyticFace = {
    ...face,
    normal: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
    analyticAxis: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
  };
  const replayedFeature = options.skipFeatureReplay
    ? null
    : replayExactProfileFeature(
      sourceSolid,
      analyticFace,
      cleanDistance,
      options,
    ) ?? replayMoveFaceFeature(
      sourceSolid,
      analyticFace,
      cleanDistance,
      options,
    );
  if (replayedFeature) return replayedFeature;
  const faceIndices = Array.isArray(face?.sourceSolidFaceIndices) && face.sourceSolidFaceIndices.length
    ? face.sourceSolidFaceIndices
    : [faceIndex];
  const sourceFaces = faceIndices.map((index) => sourceSolid.faces?.[index]);
  if (sourceFaces.some((sourceFace) =>
    !Array.isArray(sourceFace) || sourceFace.length < 3)) {
    if (cleanDistance < 0) {
      emitDiagnostic({
        phase: 'input-validation',
        reason: 'invalid-cutter-profile',
      });
    }
    return null;
  }
  const movingVertices = new Set(sourceFaces.flat());
  if (faceCoversMovingVertices(face, sourceSolid, movingVertices) &&
      !movedFaceKeepsMaterial(
        sourceSolid,
        movingVertices,
        unitNormal,
        cleanDistance,
        {
          // Una cara derivada puede atravesar otra región del sólido y seguir
          // produciendo una unión o una resta válida. Manifold decide ese caso
          // con el volumen barrido real; este precheck protege únicamente el
          // fallback topológico usado cuando el núcleo no está disponible.
          allowOrientationCrossing: isManifoldBooleanReady(),
        },
      )) {
    if (cleanDistance < 0) {
      emitDiagnostic({
        phase: 'precheck-material-thickness',
        reason: 'minimum-thickness',
        precheck: {
          materialPredicted: false,
          ignoredMicroThickness: booleanWeldTolerance(sourceSolid),
        },
        effectiveTolerance: MINIMUM_3D_THICKNESS,
      });
    }
    return null;
  }
  if (isManifoldBooleanReady()) {
    const operationType = cleanDistance < 0 ? 'subtract' : 'union';
    const kernelDistance = operationType === 'subtract'
      ? subtractionCutterDistance(sourceSolid, cleanDistance, origin, unitNormal)
      : cleanDistance;
    const depth = Math.min(...sourceSolid.vertices.map((vertex) =>
      vertexVector(vertex).sub(origin).dot(unitNormal)));
    const through = cleanDistance < 0 && cleanDistance <= depth + SOLID_INTEGRITY_EPSILON;
    const analyticRegionId = analyticFace.exactProfile
      ? analyticFace.analyticRegionId ?? createAnalyticRegionId()
      : null;
    const inputFace = analyticFace.exactProfile
      ? null
      : pushInputFaceSnapshot(analyticFace, sourceSolid);
    const operation = {
      type: operationType,
      distance: cleanDistance,
      requestedDistance,
      ...(kernelDistance !== cleanDistance ? { kernelDistance } : {}),
      through,
      normal: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
      analyticAxis: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
      sketchId: analyticFace.sketchId ?? null,
      exactProfile: analyticFace.exactProfile
        ? exactProfileWithAnalyticSources(
          sourceSolid,
          analyticFace.exactProfile,
          analyticRegionId,
        )
        : null,
      ...(inputFace ? {
        inputFace,
        sourceRegion: cloneJson(inputFace.region),
        sourceProvenance: cloneJson(inputFace.provenance),
      } : {}),
      ...(analyticRegionId ? {
        analyticRegionId,
      } : {}),
    };
    const metadata = {
      lastPushFaceIndex: null,
      lastPushFaceIndices: [],
      lastPushRegion: cloneJson(
        inputFace?.region ?? (analyticRegionId ? {
          type: 'analytic-region-v1',
          id: analyticRegionId,
        } : null),
      ),
      lastPushDistance: cleanDistance,
      lastPushRequestedDistance: requestedDistance,
      lastPushNormal: operation.normal,
    };
    if (operationType === 'subtract') {
      return subtractFacePushSolid3d(sourceSolid, analyticFace, cleanDistance, {
        kernelDistance,
        operation,
        onDiagnostic: options.onDiagnostic,
        metadata,
      });
    }
    try {
      return consolidatedAdditiveFaceSweep(
        sourceSolid,
        analyticFace,
        kernelDistance,
        {
          operation,
          onDiagnostic: options.onDiagnostic,
          metadata,
        },
      );
    }
    catch {
      return null;
    }
  }
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
          requestedDistance,
          normal: face.normal,
        },
      }),
      lastPushFaceIndex: faceIndex,
      lastPushFaceIndices: faceIndices,
      lastPushDistance: effectiveDistance,
      lastPushRequestedDistance: requestedDistance,
      lastPushNormal: { x: face.normal.x, y: face.normal.y, z: face.normal.z },
    },
  });
  return isPushSolidIntegrityValid(movedSolid) ? movedSolid : null;
}

export function createPushSolidMeshFromSolid(solid, options = {}) {
  const analyticSolid = solidWithDerivedSurfaceTopology(solid);
  const displaySolid = analyticSolid;
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
    analyticSolid,
    solid: displaySolid,
  };
  return mesh;
}

export function createPushSolidMesh(face, height, options = {}) {
  const solid = solidFromFacePush(face, height, options);
  return solid ? createPushSolidMeshFromSolid(solid, options) : null;
}

export function createPushEdges(mesh, options = {}) {
  const solid = mesh.userData?.analyticSolid ?? mesh.userData?.solid;
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
  const solid = mesh.userData?.analyticSolid ?? mesh.userData?.solid;
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
  const solid = solidFromFacePush(face, height, options);
  if (!solid) return null;
  return createPushSolidGroupFromSolid(solid, {
    ...options,
    name: options.name ?? `webcad-push-group-${face?.id ?? 'face'}`,
  });
}

export function createPushSolidGroupFromSolid(solid, options = {}) {
  if (!isValidSolid3d(solid)) return null;
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
    analyticSolid: mesh.userData.analyticSolid,
    solid,
    showCurveGeneratrices: true,
    showHiddenEdges: options.showHiddenEdges === true,
  };
  return group;
}

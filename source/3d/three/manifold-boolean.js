/* webCAD - Booleanas volumetricas derivadas para Solid3d | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import Module from 'manifold-3d';

import {
  analyticSideSurfaceNormalAtPoint,
  deriveSolidAnalyticSideSurfaces,
  deriveSolidAnalyticTopology,
  pointOnAnalyticSideSurface,
} from '../analytic-edges.js';
import {
  auditSolid3dTopology,
  createSolid3d,
  isValidSolid3d,
} from '../solid.js';
import {
  booleanWeldTolerance,
  CAD_3D_EPSILON,
  coplanarFaceNormalDotTolerance,
  coplanarFaceTolerance,
  manufacturingMeshTolerance,
} from '../tolerances.js';
import {
  pointFromExactProfilePlane,
  pointOnExactProfilePlane,
} from '../sketch-plane.js';
import { solid3dToBufferGeometry } from './solid-to-buffer-geometry.js';

const TWO_PI = Math.PI * 2;
const POSITION_EPSILON = CAD_3D_EPSILON;
const PLANAR_EPSILON = 1e-5;
const SHARP_EDGE_ANGLE = THREE.MathUtils.degToRad(25);

let manifoldApi = null;
let initialization = null;

function manifoldWasmUrl() {
  return new URL('../../../node_modules/manifold-3d/manifold.wasm', import.meta.url).href;
}

export function initializeManifoldBoolean() {
  if (!initialization) {
    initialization = Module({ locateFile: () => manifoldWasmUrl() }).then((api) => {
      api.setup();
      manifoldApi = api;
      return api;
    });
  }
  return initialization;
}

export function isManifoldBooleanReady() {
  return Boolean(manifoldApi);
}

export function subtractionCutterDistance(sourceSolid, requestedDistance, origin, normal) {
  const distance = Number(requestedDistance);
  if (!isValidSolid3d(sourceSolid) || !Number.isFinite(distance) || distance >= 0) return distance;
  const axis = new THREE.Vector3(Number(normal?.x), Number(normal?.y), Number(normal?.z));
  const start = new THREE.Vector3(Number(origin?.x), Number(origin?.y), Number(origin?.z));
  if (axis.lengthSq() <= 1e-12 || ![start.x, start.y, start.z].every(Number.isFinite)) return distance;
  axis.normalize();
  const xs = sourceSolid.vertices.map((point) => Number(point.x));
  const ys = sourceSolid.vertices.map((point) => Number(point.y));
  const zs = sourceSolid.vertices.map((point) => Number(point.z));
  const scale = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    Math.max(...zs) - Math.min(...zs),
    Math.abs(distance),
    1,
  );
  const matchTolerance = Math.max(POSITION_EPSILON * 32, scale * 2e-6);
  let matchedLevel = null;
  let matchedDelta = Infinity;
  sourceSolid.vertices.forEach((point) => {
    const level = new THREE.Vector3(Number(point.x), Number(point.y), Number(point.z))
      .sub(start).dot(axis);
    const delta = Math.abs(level - distance);
    if (delta < matchedDelta) {
      matchedDelta = delta;
      matchedLevel = level;
    }
  });
  if (matchedLevel === null || matchedDelta > matchTolerance) return distance;
  const overrun = Math.min(
    Math.max(POSITION_EPSILON * 32, scale * 1e-6),
    Math.abs(distance) * 1e-3,
  );
  return Math.min(distance, matchedLevel) - overrun;
}

function subtractionCutterMargin(sourceSolid, distance) {
  const xs = sourceSolid.vertices.map((point) => Number(point.x));
  const ys = sourceSolid.vertices.map((point) => Number(point.y));
  const zs = sourceSolid.vertices.map((point) => Number(point.z));
  const scale = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    Math.max(...zs) - Math.min(...zs),
    Math.abs(Number(distance)),
    1,
  );
  return Math.max(POSITION_EPSILON * 32, scale * 2e-6);
}

function hasCoincidentAnalyticBoundary(sourceSolid, face) {
  const smoothIndices = Array.isArray(face?.smoothProfileVertexIndices)
    ? face.smoothProfileVertexIndices
      .filter((index) => Number.isInteger(index) && face?.points?.[index])
    : [];
  if (smoothIndices.length < 2) return false;
  const tolerance = booleanWeldTolerance(sourceSolid);
  return deriveSolidAnalyticSideSurfaces(sourceSolid).some((surface) =>
    smoothIndices.every((index) => pointOnAnalyticSideSurface(
      sourceSolid,
      face.points[index],
      surface,
      { tolerance },
    )));
}

function cleanFaceLoop(loop) {
  const result = [];
  (Array.isArray(loop) ? loop : []).forEach((point) => {
    const clean = new THREE.Vector3(Number(point?.x), Number(point?.y), Number(point?.z) || 0);
    if (![clean.x, clean.y, clean.z].every(Number.isFinite)) return;
    if (!result.length || result[result.length - 1].distanceToSquared(clean) > 1e-18) {
      result.push(clean);
    }
  });
  if (result.length > 1 && result[0].distanceToSquared(result[result.length - 1]) <= 1e-18) {
    result.pop();
  }
  return result;
}

function normalizeAngle(angle) {
  const normalized = Number(angle) % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function angleDistance(first, second) {
  return Math.abs(Math.atan2(
    Math.sin(first - second),
    Math.cos(first - second),
  ));
}

function exactProfileEntries(metadata) {
  const entries = [];
  const exactGeometry = metadata?.exactGeometry;
  const base = exactGeometry?.base ?? (exactGeometry?.extrusion ? exactGeometry : null);
  const baseProfile = base?.extrusion?.profile ?? base?.profile;
  if (baseProfile) entries.push(baseProfile);
  (metadata?.profileFeatures ?? []).forEach((feature) => {
    if (feature?.exactProfile) entries.push(feature.exactProfile);
  });
  return entries;
}

function sourceBoundarySegment(metadata, sourceBoundaryId) {
  const matches = exactProfileEntries(metadata).flatMap((profile) => [
    profile.outerLoop,
    ...(profile.innerLoops ?? []),
  ].flatMap((loop) => (loop?.segments ?? []).flatMap((segment) =>
    segment?.source?.sourceBoundaryId === sourceBoundaryId
      ? [{ profile, segment }]
      : [])));
  return matches.length === 1 ? matches[0] : null;
}

function profileHasSourceBoundary(profile, sourceBoundaryId) {
  return [
    profile?.outerLoop,
    ...(profile?.innerLoops ?? []),
  ].some((loop) => (loop?.segments ?? []).some((segment) =>
    segment?.source?.sourceBoundaryId === sourceBoundaryId));
}

function sourceBoundaryVertexIndices(
  sourceSolid,
  profile,
  sourceBoundaryId,
  tolerance,
) {
  const topology = deriveSolidAnalyticTopology(sourceSolid);
  const groups = topology.semanticPlanarFaces.filter((group) =>
    group?.exactProfile &&
    profileHasSourceBoundary(group.exactProfile, sourceBoundaryId) &&
    (group.outerLoop ?? []).every((point) =>
      Math.abs(pointFromExactProfilePlane(point, profile.plane).z) <= tolerance));
  if (groups.length !== 1) return null;
  const edgeUses = new Map();
  groups[0].indices.forEach((faceIndex) => {
    const face = sourceSolid.faces[faceIndex] ?? [];
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = start < end ? `${start}:${end}` : `${end}:${start}`;
      if (!edgeUses.has(key)) edgeUses.set(key, []);
      edgeUses.get(key).push([start, end]);
    });
  });
  const indices = new Set();
  edgeUses.forEach((uses) => {
    if (uses.length !== 1) return;
    indices.add(uses[0][0]);
    indices.add(uses[0][1]);
  });
  return indices.size >= 2 ? indices : null;
}

function compatibleBoundaryTypes(sourceType, segmentType) {
  if (sourceType === segmentType) return true;
  if (sourceType === 'circle' && segmentType === 'arc-circle') return true;
  if (sourceType === 'ellipse' &&
      ['arc-ellipse', 'ellipse-arc'].includes(segmentType)) {
    return true;
  }
  return false;
}

function segmentLocalPoint(segment, atEnd = false) {
  if (segment.type === 'line') return atEnd ? segment.end : segment.start;
  const circular = segment.type === 'circle' || segment.type === 'arc-circle';
  const elliptic = segment.type === 'ellipse' ||
    segment.type === 'arc-ellipse' ||
    segment.type === 'ellipse-arc';
  if (!circular && !elliptic) return null;
  const angle = segment.type === 'circle' || segment.type === 'ellipse'
    ? 0
    : Number(atEnd ? segment.endAngle : segment.startAngle);
  const radiusX = Number(circular ? segment.radius : segment.radiusX);
  const radiusY = Number(circular ? segment.radius : segment.radiusY);
  const rotation = Number(segment.rotation) || 0;
  const axisX = Math.cos(angle) * radiusX;
  const axisY = Math.sin(angle) * radiusY;
  return {
    x: segment.center.x +
      axisX * Math.cos(rotation) -
      axisY * Math.sin(rotation),
    y: segment.center.y +
      axisX * Math.sin(rotation) +
      axisY * Math.cos(rotation),
    z: 0,
  };
}

function exactWorldPoint(local, plane) {
  const point = pointOnExactProfilePlane(local, plane);
  return new THREE.Vector3(point.x, point.y, point.z);
}

function segmentParameter(local, segment, tolerance) {
  if (segment.type === 'line') {
    const deltaX = segment.end.x - segment.start.x;
    const deltaY = segment.end.y - segment.start.y;
    const lengthSquared = deltaX * deltaX + deltaY * deltaY;
    if (lengthSquared <= 1e-18) return null;
    const parameter = (
      (local.x - segment.start.x) * deltaX +
      (local.y - segment.start.y) * deltaY
    ) / lengthSquared;
    const projectedX = segment.start.x + deltaX * parameter;
    const projectedY = segment.start.y + deltaY * parameter;
    if (parameter < -tolerance || parameter > 1 + tolerance ||
        Math.hypot(local.x - projectedX, local.y - projectedY) > tolerance) {
      return null;
    }
    return Math.max(0, Math.min(1, parameter));
  }
  const circular = segment.type === 'circle' || segment.type === 'arc-circle';
  const elliptic = segment.type === 'ellipse' ||
    segment.type === 'arc-ellipse' ||
    segment.type === 'ellipse-arc';
  if (!circular && !elliptic) return null;
  const rotation = Number(segment.rotation) || 0;
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);
  const relativeX = local.x - segment.center.x;
  const relativeY = local.y - segment.center.y;
  const axisX = relativeX * cosine + relativeY * sine;
  const axisY = -relativeX * sine + relativeY * cosine;
  const radiusX = Number(circular ? segment.radius : segment.radiusX);
  const radiusY = Number(circular ? segment.radius : segment.radiusY);
  if (!(radiusX > 0) || !(radiusY > 0)) return null;
  const radialError = Math.abs(
    (axisX / radiusX) ** 2 +
    (axisY / radiusY) ** 2 -
    1
  );
  if (radialError > tolerance * 4 / Math.max(radiusX, radiusY, 1)) return null;
  const angle = normalizeAngle(Math.atan2(axisY / radiusY, axisX / radiusX));
  if (segment.type === 'circle' || segment.type === 'ellipse') return angle / TWO_PI;
  const angularTolerance = tolerance / Math.max(radiusX, radiusY, 1);
  if (angleDistance(angle, segment.startAngle) <= angularTolerance) return 0;
  if (angleDistance(angle, segment.endAngle) <= angularTolerance) return 1;
  const sweep = directedSweep(
    segment.startAngle,
    segment.endAngle,
    segment.clockwise,
  );
  const progress = directedSweep(
    segment.startAngle,
    angle,
    segment.clockwise,
  );
  if (progress > sweep + angularTolerance) return null;
  return sweep > 1e-12 ? Math.max(0, Math.min(1, progress / sweep)) : null;
}

function nearestLoopPointIndex(points, target, tolerance) {
  let nearest = -1;
  let nearestDistance = Infinity;
  points.forEach((point, index) => {
    const distance = point.distanceTo(target);
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  });
  return nearestDistance <= tolerance ? nearest : -1;
}

function loopRun(points, start, end, tolerance) {
  const startIndex = nearestLoopPointIndex(points, start, tolerance);
  const endIndex = nearestLoopPointIndex(points, end, tolerance);
  if (startIndex < 0 || endIndex < 0) return null;
  const run = [];
  for (let step = 0; step <= points.length; step += 1) {
    const index = (startIndex + step) % points.length;
    run.push(points[index].clone());
    if (index === endIndex) return run;
  }
  return null;
}

function sharedBoundarySamples(sourceSolid, profile, segment, tolerance) {
  const sourceBoundaryId = segment?.source?.sourceBoundaryId;
  if (segment?.source?.role !== 'profile-boundary' || !sourceBoundaryId) return null;
  const source = sourceBoundarySegment(sourceSolid?.metadata, sourceBoundaryId);
  if (!source || !compatibleBoundaryTypes(source.segment.type, segment.type)) return null;
  const boundaryVertexIndices = sourceBoundaryVertexIndices(
    sourceSolid,
    profile,
    sourceBoundaryId,
    tolerance,
  );
  if (!boundaryVertexIndices) return null;
  const samples = [];
  boundaryVertexIndices.forEach((vertexIndex) => {
    const point = sourceSolid.vertices[vertexIndex];
    const local = pointFromExactProfilePlane(point, profile.plane);
    if (Math.abs(local.z) > tolerance) return;
    const parameter = segmentParameter(local, segment, tolerance);
    if (parameter === null) return;
    samples.push({
      parameter,
      planeDistance: Math.abs(local.z),
      point: new THREE.Vector3(point.x, point.y, point.z),
    });
  });
  samples.sort((first, second) => first.parameter - second.parameter);
  const parameterTolerance = tolerance / Math.max(
    Number(segment.radius) ||
      Number(segment.radiusX) ||
      new THREE.Vector3(
        Number(segment.end?.x) - Number(segment.start?.x),
        Number(segment.end?.y) - Number(segment.start?.y),
        0,
      ).length(),
    1,
  );
  const unique = [];
  samples.forEach((entry) => {
    const previous = unique.at(-1);
    if (!previous ||
        Math.abs(entry.parameter - previous.parameter) > parameterTolerance) {
      unique.push(entry);
      return;
    }
    if (entry.planeDistance < previous.planeDistance) {
      unique[unique.length - 1] = entry;
    }
  });
  if (unique.length < 2) return null;
  if (unique[0].parameter > parameterTolerance ||
      unique.at(-1).parameter < 1 - parameterTolerance) {
    return null;
  }
  const result = unique.map((entry) => entry.point);
  if (segment.type === 'circle' || segment.type === 'ellipse') {
    result.push(result[0].clone());
  }
  return result;
}

function runtimeLoopWithSharedBoundaries(
  sourceSolid,
  points,
  exactLoop,
  profile,
  tolerance,
) {
  if (!exactLoop?.segments?.length || points.length < 3) {
    return { points, shared: false };
  }
  const rebuilt = [];
  let shared = false;
  const append = (point) => {
    if (!rebuilt.length) {
      rebuilt.push(point.clone());
      return;
    }
    if (rebuilt.at(-1).distanceTo(point) <= tolerance) {
      rebuilt[rebuilt.length - 1] = point.clone();
      return;
    }
    rebuilt.push(point.clone());
  };
  for (const segment of exactLoop.segments) {
    const startLocal = segmentLocalPoint(segment);
    const endLocal = segmentLocalPoint(segment, true);
    if (!startLocal || !endLocal) return { points, shared: false };
    const start = exactWorldPoint(startLocal, profile.plane);
    const end = exactWorldPoint(endLocal, profile.plane);
    const sharedSamples = sharedBoundarySamples(
      sourceSolid,
      profile,
      segment,
      tolerance,
    );
    if (sharedSamples) shared = true;
    const samples = sharedSamples ?? (
      segment.type === 'circle' || segment.type === 'ellipse'
        ? points
        : loopRun(points, start, end, tolerance)
    );
    if (!samples?.length) return { points, shared: false };
    samples.forEach(append);
  }
  if (rebuilt.length > 1 && rebuilt[0].distanceTo(rebuilt.at(-1)) <= tolerance) {
    rebuilt[0] = rebuilt.at(-1).clone();
    rebuilt.pop();
  }
  return {
    points: rebuilt.length >= 3 ? rebuilt : points,
    shared: rebuilt.length >= 3 && shared,
  };
}

function faceWithSharedAnalyticBoundarySamples(sourceSolid, face, exactProfile) {
  if (!exactProfile?.plane || !exactProfile?.outerLoop) {
    return { face, shared: false };
  }
  const tolerance = Math.min(
    booleanWeldTolerance(sourceSolid),
    subtractionCutterMargin(sourceSolid, 0),
  );
  const outer = cleanFaceLoop(face?.points);
  const holes = (face?.holes ?? []).map(cleanFaceLoop);
  if (outer.length < 3 || holes.some((loop) => loop.length < 3)) {
    return { face, shared: false };
  }
  const runtimeOuter = runtimeLoopWithSharedBoundaries(
    sourceSolid,
    outer,
    exactProfile.outerLoop,
    exactProfile,
    tolerance,
  );
  const runtimeHoles = holes.map((loop, index) =>
    runtimeLoopWithSharedBoundaries(
      sourceSolid,
      loop,
      exactProfile.innerLoops?.[index],
      exactProfile,
      tolerance,
    ));
  return {
    face: {
      ...face,
      points: runtimeOuter.points,
      holes: runtimeHoles.map((loop) => loop.points),
    },
    shared: runtimeOuter.shared || runtimeHoles.some((loop) => loop.shared),
  };
}

export function booleanFeatureRuntimeFace(sourceSolid, face, exactProfile) {
  return faceWithSharedAnalyticBoundarySamples(
    sourceSolid,
    face,
    exactProfile,
  ).face;
}

function subtractionCutterFrame(face, distance) {
  const outer = cleanFaceLoop(face?.points);
  if (outer.length < 3) return null;
  const normal = new THREE.Vector3(
    Number(face?.normal?.x),
    Number(face?.normal?.y),
    Number(face?.normal?.z),
  );
  if (![normal.x, normal.y, normal.z].every(Number.isFinite) || normal.lengthSq() <= 1e-12) return null;
  normal.normalize();
  const direction = normal.multiplyScalar(Math.sign(distance) || -1);
  const origin = outer[0].clone();
  let xAxis = null;
  for (let index = 1; index < outer.length; index += 1) {
    const relative = outer[index].clone().sub(origin);
    const candidate = relative.clone().addScaledVector(direction, -relative.dot(direction));
    if (candidate.lengthSq() > 1e-12) {
      xAxis = candidate.normalize();
      break;
    }
  }
  if (!xAxis) {
    xAxis = Math.abs(direction.z) < 0.9
      ? new THREE.Vector3(0, 0, 1).cross(direction).normalize()
      : new THREE.Vector3(1, 0, 0).cross(direction).normalize();
  }
  const yAxis = direction.clone().cross(xAxis).normalize();
  const loops = [outer, ...(face?.holes ?? []).map(cleanFaceLoop)]
    .filter((loop) => loop.length >= 3);
  const contours = loops.map((loop) => loop.map((point) => {
    const relative = point.clone().sub(origin);
    return [relative.dot(xAxis), relative.dot(yAxis)];
  }));
  return { contours, direction, origin, xAxis, yAxis };
}

function kernelMeshVerticesByPlanarCoordinate(mesh) {
  const vertices = new Map();
  for (let index = 0;
    index < mesh.vertProperties.length / mesh.numProp;
    index += 1) {
    const offset = index * mesh.numProp;
    const point = [
      mesh.vertProperties[offset],
      mesh.vertProperties[offset + 1],
      mesh.vertProperties[offset + 2],
    ];
    const key = `${point[0]}:${point[1]}`;
    if (!vertices.has(key)) vertices.set(key, []);
    if (!vertices.get(key).some((entry) => entry[2] === point[2])) {
      vertices.get(key).push(point);
    }
  }
  vertices.forEach((points) =>
    points.sort((first, second) => first[2] - second[2]));
  return vertices;
}

function framePointToWorld(point, frame) {
  return frame.origin.clone()
    .addScaledVector(frame.xAxis, point.x)
    .addScaledVector(frame.yAxis, point.y)
    .addScaledVector(frame.direction, point.z);
}

function sharedFrameSamples(contours, profile, frame, tolerance) {
  const loops = [
    profile.outerLoop,
    ...(profile.innerLoops ?? []),
  ];
  const samples = new Map();
  contours.forEach((contour, contourIndex) => {
    const segments = loops[contourIndex]?.segments ?? [];
    contour.forEach(([x, y]) => {
      const world = framePointToWorld(
        new THREE.Vector3(x, y, 0),
        frame,
      );
      const local = pointFromExactProfilePlane(world, profile.plane);
      segments.forEach((segment) => {
        const sourceBoundaryId = segment?.source?.sourceBoundaryId;
        if (segment?.source?.role !== 'profile-boundary' ||
            !sourceBoundaryId) {
          return;
        }
        const parameter = segmentParameter(local, segment, tolerance);
        if (parameter === null) return;
        if (!samples.has(sourceBoundaryId)) {
          samples.set(sourceBoundaryId, { segment, entries: [] });
        }
        samples.get(sourceBoundaryId).entries.push({
          parameter,
          x: Math.fround(x),
          y: Math.fround(y),
        });
      });
    });
  });
  return samples;
}

function canonicalSharedSourceMesh(
  mesh,
  contours,
  profile,
  frame,
  tolerance,
) {
  const sharedSamples = sharedFrameSamples(
    contours,
    profile,
    frame,
    tolerance,
  );
  const closestByKey = new Map();
  const properties = new Float32Array(mesh.vertProperties);
  for (let index = 0;
    index < mesh.vertProperties.length / mesh.numProp;
    index += 1) {
    const offset = index * mesh.numProp;
    const framePoint = new THREE.Vector3(
      mesh.vertProperties[offset],
      mesh.vertProperties[offset + 1],
      mesh.vertProperties[offset + 2],
    );
    const world = framePointToWorld(framePoint, frame);
    const local = pointFromExactProfilePlane(world, profile.plane);
    let match = null;
    sharedSamples.forEach(({ segment, entries }) => {
      const parameter = segmentParameter(local, segment, tolerance);
      if (parameter === null) return;
      const scale = Math.max(
        Number(segment.radius) ||
          Number(segment.radiusX) ||
          new THREE.Vector3(
            Number(segment.end?.x) - Number(segment.start?.x),
            Number(segment.end?.y) - Number(segment.start?.y),
            0,
          ).length(),
        1,
      );
      const parameterTolerance = tolerance / scale;
      entries.forEach((entry) => {
        const difference = Math.abs(entry.parameter - parameter);
        if (difference > parameterTolerance ||
            (match && difference >= match.difference)) {
          return;
        }
        match = { ...entry, difference };
      });
    });
    if (!match) continue;
    properties[offset] = match.x;
    properties[offset + 1] = match.y;
    const key = `${match.x}:${match.y}`;
    const distance = Math.abs(properties[offset + 2]);
    const previous = closestByKey.get(key);
    if (!previous || distance < previous.distance) {
      closestByKey.set(key, { distance, index });
    }
  }
  closestByKey.forEach(({ index }) => {
    properties[index * mesh.numProp + 2] = 0;
  });
  return new manifoldApi.Mesh({
    numProp: mesh.numProp,
    vertProperties: properties,
    triVerts: new Uint32Array(mesh.triVerts),
    faceID: new Uint32Array(mesh.faceID),
    tolerance: POSITION_EPSILON,
  });
}

function sharedBoundaryCutterManifold(
  sourceMesh,
  contours,
  distance,
  margin,
) {
  const sourceVertices = kernelMeshVerticesByPlanarCoordinate(sourceMesh);
  const canonicalContours = contours.map((contour) => contour.map(([x, y]) => {
    const canonicalX = Math.fround(x);
    const canonicalY = Math.fround(y);
    const candidates = sourceVertices.get(`${canonicalX}:${canonicalY}`) ?? [];
    const shared = [...candidates].sort((first, second) =>
      Math.abs(first[2]) - Math.abs(second[2]))[0];
    return {
      point: shared ?? [canonicalX, canonicalY, 0],
      interior: candidates.filter((entry) =>
        entry !== shared && entry[2] > 0 && entry[2] < Math.abs(distance)),
    };
  }));
  const flatEntries = canonicalContours.flat();
  const flatPoints = flatEntries.map((entry) => entry.point);
  if (flatPoints.length < 3) return null;
  const contourOffsets = [];
  let pointOffset = 0;
  canonicalContours.forEach((contour) => {
    contourOffsets.push(pointOffset);
    pointOffset += contour.length;
  });
  const capTriangles = THREE.ShapeUtils.triangulateShape(
    canonicalContours[0].map(({ point: [x, y] }) => new THREE.Vector2(x, y)),
    canonicalContours.slice(1).map((contour) =>
      contour.map(({ point: [x, y] }) => new THREE.Vector2(x, y))),
  );
  if (!capTriangles.length) return null;
  const interiorRingCount = Math.min(
    ...flatEntries.map((entry) => entry.interior.length),
  );
  const rings = [
    flatPoints.map(([x, y, z]) => [x, y, z - margin]),
    flatPoints,
    ...Array.from({ length: interiorRingCount }, (_, ringIndex) =>
      flatEntries.map((entry) => entry.interior[ringIndex])),
    flatPoints.map(([x, y, z]) => [x, y, z + Math.abs(distance)]),
  ];
  const vertices = rings.flatMap((ring) => ring.flat());
  const triangles = [];
  const faceIds = [];
  capTriangles.forEach(([first, second, third]) => {
    triangles.push(first, second, third);
    faceIds.push(0);
    const endRing = flatPoints.length * (rings.length - 1);
    triangles.push(
      endRing + first,
      endRing + second,
      endRing + third,
    );
    faceIds.push(1);
  });
  let sideFaceId = 2;
  canonicalContours.forEach((contour, contourIndex) => {
    const start = contourOffsets[contourIndex];
    for (let index = 0; index < contour.length; index += 1) {
      const first = start + index;
      const second = start + (index + 1) % contour.length;
      for (let ring = 0; ring < rings.length - 1; ring += 1) {
        const current = ring * flatPoints.length;
        const next = (ring + 1) * flatPoints.length;
        triangles.push(
          current + first,
          current + second,
          next + second,
          current + first,
          next + second,
          next + first,
        );
        faceIds.push(sideFaceId, sideFaceId);
      }
      sideFaceId += 1;
    }
  });
  const oriented = orientTriangleSoup(vertices, triangles);
  return manifoldApi.Manifold.ofMesh(new manifoldApi.Mesh({
    numProp: 3,
    vertProperties: new Float32Array(vertices),
    triVerts: new Uint32Array(oriented),
    faceID: new Uint32Array(faceIds),
    tolerance: POSITION_EPSILON,
  }));
}

export function subtractFacePushSolid3d(sourceSolid, face, requestedDistance, options = {}) {
  if (!manifoldApi || !isValidSolid3d(sourceSolid)) return null;
  const distance = Number(requestedDistance);
  if (!Number.isFinite(distance) || distance >= 0) return null;
  const runtimeFace = faceWithSharedAnalyticBoundarySamples(
    sourceSolid,
    face,
    options.operation?.exactProfile ?? face?.exactProfile,
  );
  const kernelFace = runtimeFace.face;
  const frame = subtractionCutterFrame(kernelFace, distance);
  if (!frame) return null;
  const kernelDistance = Number.isFinite(Number(options.kernelDistance))
    ? Number(options.kernelDistance)
    : subtractionCutterDistance(sourceSolid, distance, frame.origin, frame.direction.clone().negate());
  const margin = subtractionCutterMargin(sourceSolid, kernelDistance);
  const planarMargin = hasCoincidentAnalyticBoundary(sourceSolid, face) ? 0 : margin;
  const usesSharedFrame = runtimeFace.shared;
  const frameToWorld = [
    frame.xAxis.x, frame.xAxis.y, frame.xAxis.z, 0,
    frame.yAxis.x, frame.yAxis.y, frame.yAxis.z, 0,
    frame.direction.x, frame.direction.y, frame.direction.z, 0,
    frame.origin.x, frame.origin.y, frame.origin.z, 1,
  ];
  const worldToFrame = [
    frame.xAxis.x, frame.yAxis.x, frame.direction.x, 0,
    frame.xAxis.y, frame.yAxis.y, frame.direction.y, 0,
    frame.xAxis.z, frame.yAxis.z, frame.direction.z, 0,
    -frame.origin.dot(frame.xAxis),
    -frame.origin.dot(frame.yAxis),
    -frame.origin.dot(frame.direction),
    1,
  ];
  let sourceWorld = null;
  let source = null;
  let section = null;
  let expandedSection = null;
  let localCutter = null;
  let cutter = null;
  let localResult = null;
  let result = null;
  let sourceKernelMesh = null;
  try {
    sourceWorld = solidToManifold(sourceSolid, 0x10000000);
    if (usesSharedFrame) {
      source = sourceWorld.transform(worldToFrame);
    }
    else {
      source = sourceWorld;
      sourceWorld = null;
    }
    if (usesSharedFrame) {
      sourceKernelMesh = source.getMesh();
      const canonicalSource = manifoldApi.Manifold.ofMesh(
        canonicalSharedSourceMesh(
          sourceKernelMesh,
          frame.contours,
          options.operation?.exactProfile ?? face?.exactProfile,
          frame,
          Math.min(
            booleanWeldTolerance(sourceSolid),
            subtractionCutterMargin(sourceSolid, 0),
          ),
        ),
      );
      source.delete();
      source = canonicalSource;
      sourceKernelMesh = source.getMesh();
      cutter = sharedBoundaryCutterManifold(
        sourceKernelMesh,
        frame.contours,
        kernelDistance,
        margin,
      );
      if (!cutter) return null;
    }
    else {
      section = new manifoldApi.CrossSection(frame.contours, 'EvenOdd');
      expandedSection = planarMargin > 0
        ? section.offset(planarMargin, 'Miter', 4)
        : null;
      localCutter = (expandedSection ?? section)
        .extrude(Math.abs(kernelDistance) + margin);
      cutter = localCutter.transform([
          frame.xAxis.x, frame.xAxis.y, frame.xAxis.z, 0,
          frame.yAxis.x, frame.yAxis.y, frame.yAxis.z, 0,
          frame.direction.x, frame.direction.y, frame.direction.z, 0,
          frame.origin.x - frame.direction.x * margin,
          frame.origin.y - frame.direction.y * margin,
          frame.origin.z - frame.direction.z * margin,
          1,
        ]);
    }
    if (typeof options.inspectKernelOperands === 'function') {
      options.inspectKernelOperands({
        source: sourceKernelMesh ?? source.getMesh(),
        cutter: cutter.getMesh(),
        contours: frame.contours.map((contour) =>
          contour.map(([x, y]) => [x, y])),
      });
    }
    localResult = source.subtract(cutter);
    if (localResult.status() !== 'NoError' || localResult.isEmpty()) return null;
    if (usesSharedFrame) {
      result = localResult.transform(frameToWorld);
    }
    else {
      result = localResult;
      localResult = null;
    }
    if (typeof options.inspectKernelMesh === 'function') {
      options.inspectKernelMesh(result.getMesh());
    }
    return manifoldToSolid(result, sourceSolid, { ...options, operationType: 'subtract' });
  }
  catch (error) {
    console.warn('No se pudo resolver la sustraccion volumetrica de Push', error);
    return null;
  }
  finally {
    result?.delete?.();
    localResult?.delete?.();
    cutter?.delete?.();
    localCutter?.delete?.();
    expandedSection?.delete?.();
    section?.delete?.();
    source?.delete?.();
    sourceWorld?.delete?.();
  }
}

function pointKey(point, tolerance = POSITION_EPSILON) {
  return `${Math.round(point.x / tolerance)}:${Math.round(point.y / tolerance)}:${Math.round(point.z / tolerance)}`;
}

function meshCell(point, tolerance) {
  return [
    Math.floor(point.x / tolerance),
    Math.floor(point.y / tolerance),
    Math.floor(point.z / tolerance),
  ];
}

function meshCellKey(cell) {
  return `${cell[0]}:${cell[1]}:${cell[2]}`;
}

function findOrAddMeshVertex(point, tolerance, vertices, vertexBuckets) {
  const cell = meshCell(point, tolerance);
  const squaredTolerance = tolerance * tolerance;
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dz = -1; dz <= 1; dz += 1) {
        const candidates = vertexBuckets.get(meshCellKey([
          cell[0] + dx,
          cell[1] + dy,
          cell[2] + dz,
        ])) ?? [];
        const match = candidates.find((index) => {
          const offset = index * 3;
          const deltaX = vertices[offset] - point.x;
          const deltaY = vertices[offset + 1] - point.y;
          const deltaZ = vertices[offset + 2] - point.z;
          return deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ <= squaredTolerance;
        });
        if (match !== undefined) return match;
      }
    }
  }
  const vertexIndex = vertices.length / 3;
  vertices.push(point.x, point.y, point.z);
  const key = meshCellKey(cell);
  if (!vertexBuckets.has(key)) vertexBuckets.set(key, []);
  vertexBuckets.get(key).push(vertexIndex);
  return vertexIndex;
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function faceNormal(face, vertices) {
  const first = vertices[face[0]];
  if (!first) return null;
  const origin = new THREE.Vector3(first.x, first.y, first.z);
  for (let index = 1; index < face.length - 1; index += 1) {
    const second = vertices[face[index]];
    const third = vertices[face[index + 1]];
    if (!second || !third) continue;
    const normal = new THREE.Vector3(second.x, second.y, second.z).sub(origin)
      .cross(new THREE.Vector3(third.x, third.y, third.z).sub(origin));
    if (normal.lengthSq() > 1e-18) return normal.normalize();
  }
  return null;
}

function orientTriangleSoup(vertices, triangles) {
  const triangleCount = triangles.length / 3;
  const edgeFaces = new Map();
  for (let faceIndex = 0; faceIndex < triangleCount; faceIndex += 1) {
    for (let corner = 0; corner < 3; corner += 1) {
      const first = triangles[faceIndex * 3 + corner];
      const second = triangles[faceIndex * 3 + (corner + 1) % 3];
      const key = edgeKey(first, second);
      if (!edgeFaces.has(key)) edgeFaces.set(key, []);
      edgeFaces.get(key).push({
        faceIndex,
        direction: first < second ? 1 : -1,
      });
    }
  }
  const neighbors = Array.from({ length: triangleCount }, () => []);
  edgeFaces.forEach((uses) => {
    if (uses.length !== 2) return;
    const [first, second] = uses;
    const sameDirection = first.direction === second.direction;
    neighbors[first.faceIndex].push({ faceIndex: second.faceIndex, sameDirection });
    neighbors[second.faceIndex].push({ faceIndex: first.faceIndex, sameDirection });
  });
  const flipped = Array(triangleCount).fill(null);
  const point = (vertexIndex) => {
    const offset = vertexIndex * 3;
    return new THREE.Vector3(vertices[offset], vertices[offset + 1], vertices[offset + 2]);
  };
  for (let root = 0; root < triangleCount; root += 1) {
    if (flipped[root] !== null) continue;
    flipped[root] = false;
    const component = [];
    const pending = [root];
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors[current].forEach((neighbor) => {
        const required = flipped[current] !== neighbor.sameDirection;
        if (flipped[neighbor.faceIndex] !== null) return;
        flipped[neighbor.faceIndex] = required;
        pending.push(neighbor.faceIndex);
      });
    }
    const signedVolume = component.reduce((volume, faceIndex) => {
      const indices = triangles.slice(faceIndex * 3, faceIndex * 3 + 3);
      if (flipped[faceIndex]) [indices[1], indices[2]] = [indices[2], indices[1]];
      return volume + point(indices[0]).dot(point(indices[1]).cross(point(indices[2]))) / 6;
    }, 0);
    if (signedVolume < 0) component.forEach((faceIndex) => {
      flipped[faceIndex] = !flipped[faceIndex];
    });
  }
  return triangles.flatMap((_, offset) => {
    if (offset % 3 !== 0) return [];
    const faceIndex = offset / 3;
    const indices = triangles.slice(offset, offset + 3);
    return flipped[faceIndex] ? [indices[0], indices[2], indices[1]] : indices;
  });
}

function geometryToManifoldMesh(
  geometry,
  surfaceFaceIds = [],
  positionTolerance = POSITION_EPSILON,
) {
  const source = geometry.index ? geometry.toNonIndexed() : geometry;
  const positions = source.getAttribute('position');
  const faceTriangleMap = geometry.userData?.webcadFaceTriangleMap ?? [];
  const vertices = [];
  const triangles = [];
  const faceIds = [];
  const vertexBuckets = new Map();
  const triangleKeys = new Set();
  for (let offset = 0; offset < positions.count; offset += 3) {
    const triangle = [];
    for (let corner = 0; corner < 3; corner += 1) {
      const index = offset + corner;
      const point = {
        x: positions.getX(index),
        y: positions.getY(index),
        z: positions.getZ(index),
      };
      triangle.push(findOrAddMeshVertex(
        point,
        positionTolerance,
        vertices,
        vertexBuckets,
      ));
    }
    if (new Set(triangle).size < 3) continue;
    const key = [...triangle].sort((first, second) => first - second).join(':');
    if (triangleKeys.has(key)) continue;
    triangleKeys.add(key);
    triangles.push(...triangle);
    const sourceFaceIndex = faceTriangleMap[offset / 3] ?? offset / 3;
    faceIds.push(surfaceFaceIds[sourceFaceIndex] ?? sourceFaceIndex);
  }
  if (source !== geometry) source.dispose();
  if (vertices.length < 12 || triangles.length < 12) {
    throw new TypeError('El Solid3d no contiene una envolvente cerrada utilizable');
  }
  return new manifoldApi.Mesh({
    numProp: 3,
    vertProperties: new Float32Array(vertices),
    triVerts: new Uint32Array(orientTriangleSoup(vertices, triangles)),
    faceID: new Uint32Array(faceIds),
    tolerance: positionTolerance,
  });
}

function solidToManifold(
  solid,
  namespaceBase = 0,
  positionTolerance = POSITION_EPSILON,
  preserveSurfaceFaceIds = true,
) {
  if (!isValidSolid3d(solid)) {
    throw new TypeError('La operacion booleana necesita un Solid3d valido');
  }
  const geometry = solid3dToBufferGeometry(solid);
  try {
    return manifoldApi.Manifold.ofMesh(geometryToManifoldMesh(
      geometry,
      preserveSurfaceFaceIds
        ? semanticSurfaceFaceIds(solid, namespaceBase)
        : Array(solid.faces.length).fill(0),
      positionTolerance,
    ));
  }
  finally {
    geometry.dispose();
  }
}

function normalizedPropertyNormal(mesh, propertyVertex, fallback) {
  const offset = propertyVertex * mesh.numProp;
  if (mesh.numProp >= 6) {
    const normal = new THREE.Vector3(
      mesh.vertProperties[offset + 3],
      mesh.vertProperties[offset + 4],
      mesh.vertProperties[offset + 5],
    );
    if (normal.lengthSq() > 1e-12) {
      normal.normalize();
      return { x: normal.x, y: normal.y, z: normal.z };
    }
  }
  return { x: fallback.x, y: fallback.y, z: fallback.z };
}

function triangleTopology(mesh) {
  const vertices = [];
  const flatVertices = [];
  const vertexBuckets = new Map();
  const faces = [];
  const faceVertexNormals = [];
  const triangleNormals = [];
  const faceIds = [];
  for (let triangleIndex = 0; triangleIndex < mesh.numTri; triangleIndex += 1) {
    const propertyIndices = [0, 1, 2].map((corner) => mesh.triVerts[triangleIndex * 3 + corner]);
    const face = propertyIndices.map((propertyIndex) => {
      const offset = propertyIndex * mesh.numProp;
      const point = {
        x: mesh.vertProperties[offset],
        y: mesh.vertProperties[offset + 1],
        z: mesh.vertProperties[offset + 2],
      };
      const vertexIndex = findOrAddMeshVertex(
        point,
        POSITION_EPSILON,
        flatVertices,
        vertexBuckets,
      );
      if (!vertices[vertexIndex]) {
        vertices.push(point);
      }
      return vertexIndex;
    });
    if (new Set(face).size < 3) continue;
    const normal = faceNormal(face, vertices);
    if (!normal) continue;
    faces.push(face);
    triangleNormals.push(normal);
    faceVertexNormals.push(propertyIndices.map((propertyIndex) =>
      normalizedPropertyNormal(mesh, propertyIndex, normal)));
    faceIds.push(mesh.faceID?.[triangleIndex] ?? triangleIndex);
  }
  const uses = edgeUses(faces);
  const neighbors = Array.from({ length: faces.length }, () => []);
  uses.forEach(({ faces: adjacentFaces }) => {
    if (adjacentFaces.length !== 2) return;
    neighbors[adjacentFaces[0]].push(adjacentFaces[1]);
    neighbors[adjacentFaces[1]].push(adjacentFaces[0]);
  });
  const keep = new Set();
  const visited = new Set();
  faces.forEach((_, start) => {
    if (visited.has(start)) return;
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors[current].forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    // Menos de cuatro triangulos no puede encerrar volumen. Los componentes
    // mayores se conservan para que la reparacion topologica posterior decida
    // por conectividad, nunca por longitud de arista o tamano de triangulo.
    if (component.length >= 4) {
      component.forEach((faceIndex) => keep.add(faceIndex));
    }
  });
  if (keep.size === faces.length) {
    return { faceIds, faces, faceVertexNormals, triangleNormals, vertices };
  }
  return {
    faceIds: faceIds.filter((_, faceIndex) => keep.has(faceIndex)),
    faces: faces.filter((_, faceIndex) => keep.has(faceIndex)),
    faceVertexNormals: faceVertexNormals.filter((_, faceIndex) =>
      keep.has(faceIndex)),
    triangleNormals: triangleNormals.filter((_, faceIndex) =>
      keep.has(faceIndex)),
    vertices,
  };
}

function edgeUses(faces) {
  const uses = new Map();
  faces.forEach((face, faceIndex) => {
    face.forEach((start, corner) => {
      const end = face[(corner + 1) % face.length];
      const key = edgeKey(start, end);
      if (!uses.has(key)) uses.set(key, { edge: [start, end], faces: [] });
      uses.get(key).faces.push(faceIndex);
    });
  });
  return uses;
}

function collapseDegenerateBoundaryEdge(topology, component, tolerance) {
  const candidates = component.flatMap((first, index) =>
    component.slice(index + 1).map((second) => {
      const start = topology.vertices[first];
      const end = topology.vertices[second];
      return {
        first,
        second,
        length: Math.hypot(
          start.x - end.x,
          start.y - end.y,
          start.z - end.z,
        ),
      };
    })).sort((first, second) => first.length - second.length);
  const candidate = candidates[0];
  if (!candidate || candidate.length > tolerance) return false;
  const keepIndex = Math.min(candidate.first, candidate.second);
  const removeIndex = Math.max(candidate.first, candidate.second);
  const repairedFaces = [];
  const repairedFaceIds = [];
  const repairedFaceVertexNormals = [];
  const repairedTriangleNormals = [];
  topology.faces.forEach((face, faceIndex) => {
    const corners = face.map((vertexIndex, cornerIndex) => ({
      vertexIndex: vertexIndex === removeIndex ? keepIndex : vertexIndex,
      normal: topology.faceVertexNormals[faceIndex]?.[cornerIndex],
    })).filter((corner, cornerIndex, entries) =>
      cornerIndex === 0 ||
      corner.vertexIndex !== entries[cornerIndex - 1].vertexIndex);
    if (corners.length > 1 &&
        corners[0].vertexIndex === corners.at(-1).vertexIndex) {
      corners.pop();
    }
    const repairedFace = corners.map((corner) => corner.vertexIndex);
    if (repairedFace.length < 3 ||
        new Set(repairedFace).size !== repairedFace.length) return;
    const repairedNormal = faceNormal(repairedFace, topology.vertices);
    if (!repairedNormal) return;
    repairedFaces.push(repairedFace);
    repairedFaceIds.push(topology.faceIds[faceIndex]);
    repairedFaceVertexNormals.push(corners.map((corner) =>
      corner.normal ?? {
        x: repairedNormal.x,
        y: repairedNormal.y,
        z: repairedNormal.z,
      }));
    repairedTriangleNormals.push(repairedNormal);
  });
  if (repairedFaces.length < 4) return false;
  topology.faces = repairedFaces;
  topology.faceIds = repairedFaceIds;
  topology.faceVertexNormals = repairedFaceVertexNormals;
  topology.triangleNormals = repairedTriangleNormals;
  return true;
}

function repairSmallTriangularHoles(topology, tolerance) {
  const uses = edgeUses(topology.faces);
  const boundary = [...uses.values()].filter(({ faces }) => faces.length === 1);
  const adjacency = new Map();
  boundary.forEach(({ edge }) => {
    edge.forEach((vertexIndex, index) => {
      if (!adjacency.has(vertexIndex)) adjacency.set(vertexIndex, []);
      adjacency.get(vertexIndex).push(edge[1 - index]);
    });
  });
  const visited = new Set();
  [...adjacency.keys()].forEach((start) => {
    if (visited.has(start)) return;
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      (adjacency.get(current) ?? []).forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    if (component.length !== 3 ||
        component.some((vertexIndex) =>
          (adjacency.get(vertexIndex) ?? []).length !== 2)) return;
    const boundaryEdgeKeys = new Set(component.flatMap((vertexIndex) =>
      (adjacency.get(vertexIndex) ?? []).map((neighbor) =>
        edgeKey(vertexIndex, neighbor))));
    const perimeter = [...boundaryEdgeKeys].reduce((total, key) => {
      const [firstIndex, secondIndex] = key.split(':').map(Number);
      const first = topology.vertices[firstIndex];
      const second = topology.vertices[secondIndex];
      return total + Math.hypot(
        first.x - second.x,
        first.y - second.y,
        first.z - second.z,
      );
    }, 0);
    const trianglePoints = component.map((vertexIndex) =>
      new THREE.Vector3(
        topology.vertices[vertexIndex].x,
        topology.vertices[vertexIndex].y,
        topology.vertices[vertexIndex].z,
      ));
    const edgeLengths = trianglePoints.map((point, index) =>
      point.distanceTo(trianglePoints[(index + 1) % trianglePoints.length]));
    const longestEdge = Math.max(...edgeLengths);
    const doubledArea = trianglePoints[1].clone().sub(trianglePoints[0])
      .cross(trianglePoints[2].clone().sub(trianglePoints[0])).length();
    const maximumAltitude = longestEdge > Number.EPSILON
      ? doubledArea / longestEdge
      : 0;
    if (perimeter > tolerance * 5 && maximumAltitude > tolerance * 2) return;
    const cycle = [
      component[0],
      adjacency.get(component[0])[0],
    ];
    cycle.push(adjacency.get(cycle[1]).find((vertexIndex) =>
      vertexIndex !== cycle[0]));
    const orientationScore = (indices) => indices.reduce((score, first, index) => {
      const second = indices[(index + 1) % indices.length];
      const use = uses.get(edgeKey(first, second));
      const adjacentFace = topology.faces[use.faces[0]];
      const corner = adjacentFace.findIndex((vertexIndex) => vertexIndex === first);
      const sameDirection = corner >= 0 &&
        adjacentFace[(corner + 1) % adjacentFace.length] === second;
      return score + (sameDirection ? -1 : 1);
    }, 0);
    if (orientationScore(cycle) < 0) cycle.reverse();
    const normal = faceNormal(cycle, topology.vertices);
    if (!normal) {
      collapseDegenerateBoundaryEdge(topology, component, tolerance);
      return;
    }
    const adjacentFaceIndices = cycle.map((first, index) =>
      uses.get(edgeKey(first, cycle[(index + 1) % cycle.length])).faces[0]);
    const adjacentIds = adjacentFaceIndices.map((faceIndex) =>
      topology.faceIds[faceIndex]);
    const faceId = adjacentIds.sort((first, second) =>
      adjacentIds.filter((value) => value === second).length -
      adjacentIds.filter((value) => value === first).length)[0];
    topology.faces.push(cycle);
    topology.triangleNormals.push(normal);
    topology.faceVertexNormals.push(cycle.map(() => ({
      x: normal.x,
      y: normal.y,
      z: normal.z,
    })));
    topology.faceIds.push(faceId);
  });
  return topology;
}

function semanticSurfaceFaceIds(solid, namespaceBase = 0) {
  const faceCount = solid.faces.length;
  const stored = solid.metadata?.surfaceFaceIds;
  const ids = Array(faceCount).fill(null);
  let nextId = namespaceBase;
  const assignGroup = (indices) => {
    const valid = [...new Set(indices)].filter((index) =>
      Number.isInteger(index) && index >= 0 && index < faceCount && ids[index] === null);
    if (!valid.length) return;
    valid.forEach((index) => { ids[index] = nextId; });
    nextId += 1;
  };
  if ((Array.isArray(stored) || ArrayBuffer.isView(stored)) && stored.length === faceCount) {
    const remapped = new Map();
    stored.forEach((value, faceIndex) => {
      const key = Number.isFinite(Number(value)) ? Number(value) : faceIndex;
      if (!remapped.has(key)) {
        remapped.set(key, nextId);
        nextId += 1;
      }
      ids[faceIndex] = remapped.get(key);
    });
    return ids;
  }
  (solid.metadata?.planarFaceGroups ?? []).forEach((group) => assignGroup(group?.indices ?? []));
  const curvedFaces = new Set((solid.metadata?.curvedSideFaceIndices ?? [])
    .filter((index) => Number.isInteger(index) && index >= 0 && index < faceCount));
  const uses = edgeUses(solid.faces);
  const neighbors = new Map([...curvedFaces].map((index) => [index, []]));
  uses.forEach(({ faces }) => {
    if (faces.length !== 2 || !faces.every((index) => curvedFaces.has(index))) return;
    const [first, second] = faces;
    const firstNormal = faceNormal(solid.faces[first], solid.vertices);
    const secondNormal = faceNormal(solid.faces[second], solid.vertices);
    if (!firstNormal || !secondNormal || firstNormal.dot(secondNormal) < Math.cos(SHARP_EDGE_ANGLE)) return;
    neighbors.get(first).push(second);
    neighbors.get(second).push(first);
  });
  const visited = new Set();
  curvedFaces.forEach((start) => {
    if (visited.has(start) || ids[start] !== null) return;
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      (neighbors.get(current) ?? []).forEach((neighbor) => {
        if (visited.has(neighbor) || ids[neighbor] !== null) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    assignGroup(component);
  });
  ids.forEach((value, faceIndex) => {
    if (value === null) assignGroup([faceIndex]);
  });
  return ids;
}

function edgeHasContinuousNormals(topology, edge, firstFace, secondFace) {
  return edge.every((vertexIndex) => {
    const first = faceCornerNormal(topology, firstFace, vertexIndex);
    const second = faceCornerNormal(topology, secondFace, vertexIndex);
    return first && second && first.dot(second) >= 1 - 1e-5;
  });
}

function exactPlanarSideSurfaces(metadata) {
  return exactExtrusionProfiles(metadata).flatMap(({ profile, offset }, profileIndex) => {
    const offsetVector = new THREE.Vector3(
      Number(offset?.x) || 0,
      Number(offset?.y) || 0,
      Number(offset?.z) || 0,
    );
    const extrusionLength = offsetVector.length();
    if (extrusionLength <= 1e-9) return [];
    const extrusionDirection = offsetVector.clone().multiplyScalar(1 / extrusionLength);
    return [profile?.outerLoop, ...(profile?.innerLoops ?? [])].flatMap((loop, loopIndex) =>
      (loop?.segments ?? []).flatMap((segment, segmentIndex) => {
        if (segment?.type !== 'line') return [];
        const start = new THREE.Vector3().copy(
          pointOnExactProfilePlane(segment.start, profile.plane),
        );
        const end = new THREE.Vector3().copy(
          pointOnExactProfilePlane(segment.end, profile.plane),
        );
        const segmentVector = end.clone().sub(start);
        const segmentLength = segmentVector.length();
        if (segmentLength <= 1e-9) return [];
        const segmentDirection = segmentVector.multiplyScalar(1 / segmentLength);
        const normal = segmentDirection.clone().cross(extrusionDirection);
        if (normal.lengthSq() <= 1e-12) return [];
        normal.normalize();
        return [{
          id: `exact-planar-side-${profileIndex}-${loopIndex}-${segmentIndex}`,
          start,
          segmentDirection,
          segmentLength,
          extrusionDirection,
          extrusionLength,
          normal,
        }];
      }));
  });
}

function connectedFaceComponents(indices, uses) {
  const selected = new Set(indices);
  const neighbors = new Map(indices.map((faceIndex) => [faceIndex, []]));
  uses.forEach(({ faces }) => {
    const selectedFaces = faces.filter((faceIndex) => selected.has(faceIndex));
    selectedFaces.forEach((faceIndex, index) => {
      selectedFaces.slice(index + 1).forEach((neighbor) => {
        neighbors.get(faceIndex).push(neighbor);
        neighbors.get(neighbor).push(faceIndex);
      });
    });
  });
  const visited = new Set();
  return indices.flatMap((start) => {
    if (visited.has(start)) return [];
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors.get(current).forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    return [component];
  });
}

function componentPlanarSupport(
  topology,
  indices,
  fid,
  componentIndex,
  explicitSupport,
  linearTolerance,
  normalDotTolerance,
) {
  const vertexIndices = [...new Set(indices.flatMap((faceIndex) =>
    topology.faces[faceIndex]))];
  if (vertexIndices.length < 3) return null;
  const centroid = vertexIndices.reduce((result, vertexIndex) => {
    const point = topology.vertices[vertexIndex];
    return result.add(new THREE.Vector3(point.x, point.y, point.z));
  }, new THREE.Vector3()).multiplyScalar(1 / vertexIndices.length);
  const areaNormal = indices.reduce((result, faceIndex) => {
    const face = topology.faces[faceIndex];
    const originPoint = topology.vertices[face[0]];
    const origin = new THREE.Vector3(originPoint.x, originPoint.y, originPoint.z);
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = topology.vertices[face[index]];
      const third = topology.vertices[face[index + 1]];
      result.add(new THREE.Vector3(second.x, second.y, second.z).sub(origin)
        .cross(new THREE.Vector3(third.x, third.y, third.z).sub(origin)));
    }
    return result;
  }, new THREE.Vector3());
  if (areaNormal.lengthSq() <= 1e-18) return null;
  areaNormal.normalize();
  const supportNormal = explicitSupport?.normal?.clone() ?? areaNormal.clone();
  if (supportNormal.dot(areaNormal) < 0) supportNormal.multiplyScalar(-1);
  if (supportNormal.lengthSq() <= 1e-18) return null;
  supportNormal.normalize();
  const supportStart = explicitSupport?.start ?? centroid;
  const normalsAgree = indices.every((faceIndex) => {
    const normal = topology.triangleNormals?.[faceIndex];
    return normal && normal.dot(supportNormal) >= normalDotTolerance;
  });
  const verticesAgree = vertexIndices.every((vertexIndex) => {
    const point = topology.vertices[vertexIndex];
    return Math.abs(new THREE.Vector3(
      point.x - supportStart.x,
      point.y - supportStart.y,
      point.z - supportStart.z,
    ).dot(supportNormal)) <= linearTolerance;
  });
  if (!normalsAgree || !verticesAgree) return null;
  return {
    id: explicitSupport?.id ??
      `canonical-surface-${fid}-${componentIndex}`,
    normal: supportNormal,
    start: supportStart.clone?.() ?? new THREE.Vector3(
      supportStart.x,
      supportStart.y,
      supportStart.z,
    ),
  };
}

function exactPlanarSideByFace(
  topology,
  sides,
  uses,
  linearTolerance,
  normalDotTolerance,
) {
  const initial = topology.faces.map((face) => {
    const matches = sides.filter((side) =>
      face.every((vertexIndex) =>
        pointOnExactPlanarSide(
          topology.vertices[vertexIndex],
          side,
          linearTolerance,
        )));
    return matches.length === 1 ? matches[0] : null;
  });
  const result = [...initial];
  const faceIds = topology.faceIds;
  if (Array.isArray(faceIds) && faceIds.length === topology.faces.length) {
    const trisByFid = new Map();
    faceIds.forEach((fid, faceIndex) => {
      if (fid === null || fid === undefined) return;
      if (!trisByFid.has(fid)) trisByFid.set(fid, []);
      trisByFid.get(fid).push(faceIndex);
    });
    trisByFid.forEach((indices, fid) => {
      connectedFaceComponents(indices, uses).forEach((component, componentIndex) => {
        if (component.some((faceIndex) =>
          isCurvedTriangle(topology.faceVertexNormals?.[faceIndex]))) return;
        const explicitSides = [...new Set(component.map((faceIndex) =>
          initial[faceIndex]).filter(Boolean))];
        const support = componentPlanarSupport(
          topology,
          component,
          fid,
          componentIndex,
          explicitSides.length === 1 ? explicitSides[0] : null,
          linearTolerance,
          normalDotTolerance,
        );
        if (!support) return;
        component.forEach((faceIndex) => { result[faceIndex] = support; });
      });
    });
  }
  return result;
}

function exactPlaneAxes(plane) {
  const component = (value, fallback = 0) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  };
  const normal = new THREE.Vector3(
    component(plane?.normal?.x),
    component(plane?.normal?.y),
    component(plane?.normal?.z),
  );
  if (normal.lengthSq() <= 1e-12) normal.set(0, 0, 1);
  normal.normalize();
  const xAxis = new THREE.Vector3(
    component(plane?.xAxis?.x),
    component(plane?.xAxis?.y),
    component(plane?.xAxis?.z),
  );
  if (xAxis.lengthSq() <= 1e-12) xAxis.set(1, 0, 0);
  xAxis.normalize();
  const storedYAxis = new THREE.Vector3(
    component(plane?.yAxis?.x),
    component(plane?.yAxis?.y),
    component(plane?.yAxis?.z),
  );
  const yAxis = storedYAxis.lengthSq() > 1e-12
    ? storedYAxis.normalize()
    : normal.clone().cross(xAxis).normalize();
  return { xAxis, yAxis };
}

function pointOnExactPlanarSide(point, side, tolerance) {
  const relative = new THREE.Vector3(point.x, point.y, point.z).sub(side.start);
  if (Math.abs(relative.dot(side.normal)) > tolerance) return false;
  const alongSegment = relative.dot(side.segmentDirection);
  const alongExtrusion = relative.dot(side.extrusionDirection);
  return alongSegment >= -tolerance &&
    alongSegment <= side.segmentLength + tolerance &&
    alongExtrusion >= -tolerance &&
    alongExtrusion <= side.extrusionLength + tolerance;
}

function visibleEdges(topology, surface, metadata) {
  const planarGroupByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  const tangentKeys = new Set(surface.tangentEdges.map((edge) =>
    edgeKey(edge.startIndex, edge.endIndex)));
  const edges = [];
  surface.uses.forEach(({ edge, faces }) => {
    if (faces.length !== 2) {
      edges.push(edge);
      return;
    }
    const [firstFace, secondFace] = faces;
    if (topology.faceIds?.[firstFace] === topology.faceIds?.[secondFace]) return;
    if (surface.analyticTopology.internalSideEdgeKeys.has(edgeKey(edge[0], edge[1]))) return;
    const firstPlanarGroup = planarGroupByFace.get(firstFace);
    const secondPlanarGroup = planarGroupByFace.get(secondFace);
    if (firstPlanarGroup !== undefined && secondPlanarGroup !== undefined) {
      if (firstPlanarGroup === secondPlanarGroup) return;
      if (edgeHasContinuousNormals(topology, edge, firstFace, secondFace)) return;
      edges.push(edge);
      return;
    }
    if (tangentKeys.has(edgeKey(edge[0], edge[1]))) return;
    if (edgeHasContinuousNormals(topology, edge, firstFace, secondFace)) return;
    edges.push(edge);
  });
  return edges;
}

function exactProfileWorldPoint(point, plane, offset = { x: 0, y: 0, z: 0 }) {
  const { xAxis, yAxis } = exactPlaneAxes(plane);
  return new THREE.Vector3(
    (Number(plane?.origin?.x) || 0) + xAxis.x * (Number(point?.x) || 0) -
      yAxis.x * (Number(point?.y) || 0) + (Number(offset.x) || 0),
    (Number(plane?.origin?.y) || 0) + xAxis.y * (Number(point?.x) || 0) -
      yAxis.y * (Number(point?.y) || 0) + (Number(offset.y) || 0),
    (Number(plane?.origin?.z) || 0) + xAxis.z * (Number(point?.x) || 0) -
      yAxis.z * (Number(point?.y) || 0) + (Number(offset.z) || 0),
  );
}

function exactExtrusionProfiles(metadata) {
  const entries = [];
  const exactGeometry = metadata?.exactGeometry;
  const base = exactGeometry?.base ?? (exactGeometry?.extrusion ? exactGeometry : null);
  const extrusion = base?.extrusion;
  const baseProfile = extrusion?.profile ?? base?.profile;
  if (baseProfile && extrusion) {
    const distance = Number(extrusion.distance) || 0;
    entries.push({
      profile: baseProfile,
      offset: extrusion.offset ?? {
        x: (Number(extrusion.direction?.x) || 0) * distance,
        y: (Number(extrusion.direction?.y) || 0) * distance,
        z: (Number(extrusion.direction?.z) || 0) * distance,
      },
    });
  }
  (metadata?.profileFeatures ?? []).forEach((feature) => {
    const profile = feature?.exactProfile;
    const distance = Number(feature?.distance);
    if (!profile || !Number.isFinite(distance)) return;
    entries.push({
      profile,
      offset: {
        x: (Number(profile.plane?.normal?.x) || 0) * distance,
        y: (Number(profile.plane?.normal?.y) || 0) * distance,
        z: (Number(profile.plane?.normal?.z) || 0) * distance,
      },
    });
  });
  return entries;
}

function segmentTangent(segment, atEnd) {
  const start = new THREE.Vector2(Number(segment?.start?.x) || 0, Number(segment?.start?.y) || 0);
  const end = new THREE.Vector2(Number(segment?.end?.x) || 0, Number(segment?.end?.y) || 0);
  const chord = end.clone().sub(start);
  if (chord.lengthSq() <= 1e-18) return null;
  if (segment?.type === 'line') return chord.normalize();
  const point = atEnd ? end : start;
  const center = new THREE.Vector2(Number(segment?.center?.x) || 0, Number(segment?.center?.y) || 0);
  let tangent = null;
  if (segment?.type === 'arc-circle') {
    const radial = point.clone().sub(center);
    tangent = new THREE.Vector2(-radial.y, radial.x);
  }
  else if (segment?.type === 'arc-ellipse') {
    const parameter = Number(atEnd ? segment.endAngle : segment.startAngle) || 0;
    const rotation = Number(segment.rotation) || 0;
    const local = new THREE.Vector2(
      -Math.sin(parameter) * Number(segment.radiusX),
      Math.cos(parameter) * Number(segment.radiusY),
    );
    tangent = new THREE.Vector2(
      local.x * Math.cos(rotation) - local.y * Math.sin(rotation),
      local.x * Math.sin(rotation) + local.y * Math.cos(rotation),
    );
  }
  if (!tangent || tangent.lengthSq() <= 1e-18) return chord.normalize();
  tangent.normalize();
  if (tangent.dot(chord) < 0) tangent.multiplyScalar(-1);
  return tangent;
}

function sameAnalyticCurve(first, second) {
  if (first?.type !== second?.type) return false;
  if (first.type === 'line') {
    const firstDirection = segmentTangent(first, true);
    const secondDirection = segmentTangent(second, false);
    return firstDirection && secondDirection && firstDirection.dot(secondDirection) >= 1 - 1e-8;
  }
  if (first.type !== 'arc-circle' && first.type !== 'arc-ellipse') return false;
  const close = (a, b) => Math.abs((Number(a) || 0) - (Number(b) || 0)) <= 1e-6;
  return close(first.center?.x, second.center?.x) && close(first.center?.y, second.center?.y) &&
    (first.type !== 'arc-circle'
      ? close(first.radiusX, second.radiusX) && close(first.radiusY, second.radiusY) &&
        close(first.rotation, second.rotation)
      : close(first.radius, second.radius));
}

function exactJunctionLines(metadata, smooth) {
  const lines = [];
  exactExtrusionProfiles(metadata).forEach(({ profile, offset }) => {
    [profile?.outerLoop, ...(profile?.innerLoops ?? [])].forEach((loop) => {
      const segments = loop?.segments ?? [];
      if (segments.length < 2) return;
      segments.forEach((segment, index) => {
        const previous = segments[(index - 1 + segments.length) % segments.length];
        const before = segmentTangent(previous, true);
        const after = segmentTangent(segment, false);
        if (!before || !after || sameAnalyticCurve(previous, segment)) return;
        const isSmooth = before.dot(after) >= Math.cos(THREE.MathUtils.degToRad(0.5));
        if (isSmooth !== smooth) return;
        const point = segment.start ?? previous.end;
        const start = exactProfileWorldPoint(point, profile.plane);
        const end = exactProfileWorldPoint(point, profile.plane, offset);
        if (start.distanceToSquared(end) > 1e-12) lines.push({ start, end });
      });
    });
  });
  return lines;
}

function exactGeneratrixLines(metadata) {
  return exactJunctionLines(metadata, false);
}

function exactTangencyLines(metadata) {
  return exactJunctionLines(metadata, true);
}

function edgeLiesOnLine(topology, edge, line) {
  const start = topology.vertices[edge[0]];
  const end = topology.vertices[edge[1]];
  if (!start || !end) return false;
  const lineVector = line.end.clone().sub(line.start);
  const length = lineVector.length();
  if (length <= 1e-9) return false;
  const direction = lineVector.multiplyScalar(1 / length);
  return [start, end].every((point) => {
    const relative = new THREE.Vector3(point.x, point.y, point.z).sub(line.start);
    const parameter = relative.dot(direction);
    return parameter >= -1e-4 && parameter <= length + 1e-4 &&
      relative.addScaledVector(direction, -parameter).length() <= 1e-4;
  });
}

function exactGeneratrixEdges(topology, surface, metadata) {
  const lines = exactGeneratrixLines(metadata);
  if (!lines.length) return [];
  const planarGroupByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  return [...surface.uses.values()].flatMap(({ edge, faces }) => {
    if (!lines.some((line) => edgeLiesOnLine(topology, edge, line))) return [];
    if (faces.length === 2) {
      const firstGroup = planarGroupByFace.get(faces[0]);
      const secondGroup = planarGroupByFace.get(faces[1]);
      if (firstGroup !== undefined && firstGroup === secondGroup) return [];
    }
    return [edge];
  });
}

function semanticSurfaceBoundaryEdges(topology, surface) {
  const planarOwnerByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) =>
      planarOwnerByFace.set(faceIndex, `planar:${groupIndex}`));
  });
  const owner = (faceIndex) => {
    const planarOwner = planarOwnerByFace.get(faceIndex);
    if (planarOwner) return { id: planarOwner, kind: 'planar' };
    const analyticSurfaceId =
      surface.analyticTopology.faceSurfaceIds[faceIndex];
    return analyticSurfaceId
      ? { id: `analytic:${analyticSurfaceId}`, kind: 'analytic' }
      : null;
  };
  return [...surface.uses.values()].flatMap(({ edge, faces }) => {
    if (faces.length !== 2) return [];
    const firstOwner = owner(faces[0]);
    const secondOwner = owner(faces[1]);
    if (firstOwner && secondOwner) {
      return firstOwner.id !== secondOwner.id ? [edge] : [];
    }
    if (firstOwner?.kind !== 'planar' && secondOwner?.kind !== 'planar') {
      return [];
    }
    const smoothlyJoined = edge.every((vertexIndex) => {
      const firstNormal = faceCornerNormal(topology, faces[0], vertexIndex);
      const secondNormal = faceCornerNormal(topology, faces[1], vertexIndex);
      return firstNormal && secondNormal &&
        firstNormal.dot(secondNormal) >= 1 - 1e-5;
    });
    return smoothlyJoined ? [] : [edge];
  });
}

function mergedVisibleEdges(topology, surface, metadata) {
  const merged = new Map();
  [
    ...visibleEdges(topology, surface, metadata),
    ...exactGeneratrixEdges(topology, surface, metadata),
    ...semanticSurfaceBoundaryEdges(topology, surface),
  ]
    .forEach((edge) => merged.set(edgeKey(edge[0], edge[1]), edge));
  const planarOwnerByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) =>
      planarOwnerByFace.set(faceIndex, `planar:${groupIndex}`));
  });
  const owner = (faceIndex) => {
    const planarOwner = planarOwnerByFace.get(faceIndex);
    if (planarOwner) return { id: planarOwner, kind: 'planar' };
    const analyticSurfaceId =
      surface.analyticTopology.faceSurfaceIds[faceIndex];
    return analyticSurfaceId
      ? { id: `analytic:${analyticSurfaceId}`, kind: 'analytic' }
      : null;
  };
  [...merged.keys()].forEach((key) => {
    const faces = surface.uses.get(key)?.faces ?? [];
    if (faces.length !== 2) return;
    const firstOwner = owner(faces[0]);
    const secondOwner = owner(faces[1]);
    if (firstOwner && secondOwner && firstOwner.id === secondOwner.id) {
      merged.delete(key);
    }
  });
  return [...merged.values()];
}

function isCurvedTriangle(normals) {
  if (!Array.isArray(normals) || normals.length < 2) return false;
  const first = new THREE.Vector3(normals[0].x, normals[0].y, normals[0].z);
  return normals.slice(1).some((normal) =>
    first.distanceTo(new THREE.Vector3(normal.x, normal.y, normal.z)) > PLANAR_EPSILON);
}

function faceHasFlatNormal(topology, faceIndex) {
  const triangleNormal = topology.triangleNormals[faceIndex];
  if (!triangleNormal) return false;
  return (topology.faceVertexNormals[faceIndex] ?? []).some((normal) =>
    triangleNormal.dot(new THREE.Vector3(normal.x, normal.y, normal.z).normalize()) >= 1 - 1e-8);
}

function coplanarFaces(firstIndex, secondIndex, topology) {
  const firstNormal = topology.triangleNormals[firstIndex];
  const secondNormal = topology.triangleNormals[secondIndex];
  if (!firstNormal || !secondNormal) return false;
  const normalDotTolerance = topology.coplanarFaceNormalDotTolerance ??
    Math.cos(THREE.MathUtils.degToRad(0.25));
  if (firstNormal.dot(secondNormal) < normalDotTolerance) return false;
  const firstSupport = topology.exactPlanarSideByFace?.[firstIndex];
  const secondSupport = topology.exactPlanarSideByFace?.[secondIndex];
  const linearTolerance = topology.coplanarFaceTolerance ?? PLANAR_EPSILON;
  if (firstSupport && secondSupport) {
    const supportAlignment = firstSupport.normal.dot(secondSupport.normal);
    if (Math.abs(supportAlignment) < normalDotTolerance) return false;
    const secondStart = secondSupport.start;
    return Math.abs(new THREE.Vector3(
      secondStart.x - firstSupport.start.x,
      secondStart.y - firstSupport.start.y,
      secondStart.z - firstSupport.start.z,
    ).dot(firstSupport.normal)) <= linearTolerance;
  }
  const firstPoint = topology.vertices[topology.faces[firstIndex][0]];
  const secondPoint = topology.vertices[topology.faces[secondIndex][0]];
  return Math.abs(new THREE.Vector3(
    secondPoint.x - firstPoint.x,
    secondPoint.y - firstPoint.y,
    secondPoint.z - firstPoint.z,
  ).dot(firstNormal)) <= linearTolerance;
}

function planarComponents(topology, uses, curvedFaces) {
  const neighbors = topology.faces.map(() => []);
  uses.forEach(({ faces }) => {
    if (faces.length !== 2) return;
    const [first, second] = faces;
    if (curvedFaces.has(first) || curvedFaces.has(second) ||
        !coplanarFaces(first, second, topology)) return;
    neighbors[first].push(second);
    neighbors[second].push(first);
  });
  const visited = new Set();
  const components = [];
  topology.faces.forEach((_, faceIndex) => {
    if (visited.has(faceIndex) || curvedFaces.has(faceIndex)) return;
    const component = [];
    const pending = [faceIndex];
    visited.add(faceIndex);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors[current].forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    components.push(component);
  });
  return components;
}

function classifiedCurvedFaces(topology, uses) {
  const curvedFaces = new Set(topology.faceVertexNormals.flatMap((normals, faceIndex) =>
    isCurvedTriangle(normals) ? [faceIndex] : []));
  planarComponents(topology, uses, new Set()).forEach((indices) => {
    if (!indices.some((faceIndex) => faceHasFlatNormal(topology, faceIndex))) return;
    indices.forEach((faceIndex) => curvedFaces.delete(faceIndex));
  });
  return curvedFaces;
}

function boundaryLoops(component, topology) {
  const boundary = new Map();
  component.forEach((faceIndex) => {
    const face = topology.faces[faceIndex];
    face.forEach((start, corner) => {
      const end = face[(corner + 1) % face.length];
      const key = edgeKey(start, end);
      if (!boundary.has(key)) boundary.set(key, []);
      boundary.get(key).push([start, end]);
    });
  });
  const outgoing = new Map();
  boundary.forEach((directed) => {
    if (directed.length !== 1) return;
    const [start, end] = directed[0];
    if (!outgoing.has(start)) outgoing.set(start, []);
    outgoing.get(start).push(end);
  });
  const unused = new Set([...outgoing.entries()].flatMap(([start, ends]) =>
    ends.map((end) => `${start}:${end}`)));
  const loops = [];
  while (unused.size) {
    const firstEdge = unused.values().next().value;
    const [start, next] = firstEdge.split(':').map(Number);
    const loop = [start];
    let current = start;
    let following = next;
    for (let guard = 0; guard <= unused.size + topology.vertices.length; guard += 1) {
      const key = `${current}:${following}`;
      if (!unused.delete(key)) break;
      current = following;
      if (current === start) break;
      loop.push(current);
      const candidates = (outgoing.get(current) ?? []).filter((candidate) =>
        unused.has(`${current}:${candidate}`));
      if (candidates.length !== 1) break;
      [following] = candidates;
    }
    if (loop.length >= 3 && current === start) loops.push(loop);
  }
  return loops;
}

function planeBasis(normal) {
  const reference = Math.abs(normal.z) < 0.9
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(0, 1, 0);
  const xAxis = reference.cross(normal).normalize();
  const yAxis = normal.clone().cross(xAxis).normalize();
  return { xAxis, yAxis };
}

function loopArea(loop, vertices, basis) {
  const points = loop.map((index) => {
    const point = vertices[index];
    const vector = new THREE.Vector3(point.x, point.y, point.z);
    return { x: vector.dot(basis.xAxis), y: vector.dot(basis.yAxis) };
  });
  return points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - next.x * point.y;
  }, 0) * 0.5;
}

function profileVertexKinds(loop, uses, curvedFaces) {
  const curvedSegments = loop.map((start, index) => {
    const end = loop[(index + 1) % loop.length];
    return (uses.get(edgeKey(start, end))?.faces ?? [])
      .some((faceIndex) => curvedFaces.has(faceIndex));
  });
  const smooth = [];
  const cad = [];
  curvedSegments.forEach((outgoingIsCurved, index) => {
    const incomingIsCurved = curvedSegments[(index + curvedSegments.length - 1) % curvedSegments.length];
    (incomingIsCurved && outgoingIsCurved ? smooth : cad).push(index);
  });
  return { cad, smooth };
}

function planarFaceGroups(topology, uses, curvedFaces) {
  return planarComponents(topology, uses, curvedFaces).flatMap((indices) => {
    const exactSupport = topology.exactPlanarSideByFace?.[indices[0]];
    const triangleNormal = topology.triangleNormals[indices[0]];
    const normal = exactSupport?.normal?.clone() ?? triangleNormal;
    if (normal && triangleNormal && normal.dot(triangleNormal) < 0) {
      normal.multiplyScalar(-1);
    }
    const loops = boundaryLoops(indices, topology);
    if (!normal || !loops.length) return [];
    const basis = planeBasis(normal);
    const ordered = loops.map((loop) => ({ loop, area: loopArea(loop, topology.vertices, basis) }))
      .sort((first, second) => Math.abs(second.area) - Math.abs(first.area));
    const outer = ordered[0];
    const outerVertexLoop = outer.area < 0 ? [...outer.loop].reverse() : outer.loop;
    const innerVertexLoops = ordered.slice(1).map(({ loop, area }) =>
      (area > 0 ? [...loop].reverse() : loop));
    const outerKinds = profileVertexKinds(outerVertexLoop, uses, curvedFaces);
    const innerKinds = innerVertexLoops.map((loop) => profileVertexKinds(loop, uses, curvedFaces));
    const outerLoop = outerVertexLoop
      .map((index) => ({ ...topology.vertices[index] }));
    const innerLoops = innerVertexLoops.map((loop) =>
      loop.map((index) => ({ ...topology.vertices[index] })));
    return [{
      indices: [...indices].sort((first, second) => first - second),
      kind: 'boolean-planar-face',
      normal: { x: normal.x, y: normal.y, z: normal.z },
      outerLoop,
      innerLoops,
      cadProfileVertexIndices: outerKinds.cad,
      smoothProfileVertexIndices: outerKinds.smooth,
      holeCadProfileVertexIndices: innerKinds.map(({ cad }) => cad),
      holeSmoothProfileVertexIndices: innerKinds.map(({ smooth }) => smooth),
    }];
  });
}

function faceCornerNormal(topology, faceIndex, vertexIndex) {
  const corner = topology.faces[faceIndex]?.indexOf(vertexIndex) ?? -1;
  const normal = topology.faceVertexNormals[faceIndex]?.[corner];
  return normal ? new THREE.Vector3(normal.x, normal.y, normal.z).normalize() : null;
}

function tangentEdges(topology, uses, curvedFaces, planarGroups) {
  const planarGroupByFace = new Map();
  planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  const result = [];
  uses.forEach(({ edge, faces }) => {
    if (faces.length !== 2) return;
    const [first, second] = faces;
    const firstPlanarGroup = planarGroupByFace.get(first);
    const secondPlanarGroup = planarGroupByFace.get(second);
    const planarFace = firstPlanarGroup !== undefined && curvedFaces.has(second)
      ? first
      : secondPlanarGroup !== undefined && curvedFaces.has(first) ? second : null;
    if (planarFace === null) return;
    const curvedFace = planarFace === first ? second : first;
    const smoothlyJoined = edge.every((vertexIndex) => {
      const planarNormal = faceCornerNormal(topology, planarFace, vertexIndex);
      const curvedNormal = faceCornerNormal(topology, curvedFace, vertexIndex);
      return planarNormal && curvedNormal && planarNormal.dot(curvedNormal) >= 1 - 1e-5;
    });
    if (!smoothlyJoined) return;
    result.push({
      startIndex: edge[0],
      endIndex: edge[1],
      planarGroupIndex: planarGroupByFace.get(planarFace),
    });
  });
  return result;
}

function exactTangentEdges(topology, edges, metadata, uses, planarGroups) {
  const exactProfiles = exactExtrusionProfiles(metadata);
  if (!exactProfiles.length) return edges;
  const lines = exactTangencyLines(metadata);
  if (!lines.length) return [];
  const planarGroupByFace = new Map();
  planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  return [...uses.values()].flatMap(({ edge, faces }) => {
    if (!lines.some((line) => edgeLiesOnLine(topology, edge, line))) return [];
    const planarGroupIndex = faces.map((faceIndex) => planarGroupByFace.get(faceIndex))
      .find((value) => value !== undefined);
    return [{
      startIndex: edge[0],
      endIndex: edge[1],
      planarGroupIndex: planarGroupIndex ?? null,
    }];
  });
}

function applyAnalyticSideNormals(topology, analyticTopology) {
  const surfaceById = new Map(
    analyticTopology.sideSurfaces.map((surface) => [surface.id, surface]),
  );
  analyticTopology.faceSurfaceIds.forEach((surfaceId, faceIndex) => {
    const surface = surfaceById.get(surfaceId);
    const triangleNormal = topology.triangleNormals[faceIndex];
    if (!surface || !triangleNormal) return;
    topology.faceVertexNormals[faceIndex] = topology.faces[faceIndex].map((vertexIndex) => {
      const analyticNormal = analyticSideSurfaceNormalAtPoint(
        topology.vertices[vertexIndex],
        surface,
      );
      if (!analyticNormal) {
        return {
          x: triangleNormal.x,
          y: triangleNormal.y,
          z: triangleNormal.z,
        };
      }
      const result = new THREE.Vector3(
        analyticNormal.x,
        analyticNormal.y,
        analyticNormal.z,
      );
      if (result.dot(triangleNormal) < 0) result.multiplyScalar(-1);
      return { x: result.x, y: result.y, z: result.z };
    });
  });
}

function derivedSurfaceTopology(topology, metadata = null) {
  const uses = edgeUses(topology.faces);
  topology.coplanarFaceTolerance = coplanarFaceTolerance(topology);
  topology.coplanarFaceNormalDotTolerance =
    coplanarFaceNormalDotTolerance(topology);
  const analyticTopology = deriveSolidAnalyticTopology({
    vertices: topology.vertices,
    faces: topology.faces,
    metadata,
  }, {
    faceNormals: topology.triangleNormals,
  });
  const analyticPlanarSides = exactPlanarSideSurfaces(metadata);
  topology.exactPlanarSideByFace = exactPlanarSideByFace(
    topology,
    analyticPlanarSides,
    uses,
    topology.coplanarFaceTolerance,
    topology.coplanarFaceNormalDotTolerance,
  );
  applyAnalyticSideNormals(topology, analyticTopology);
  const curvedFaces = classifiedCurvedFaces(topology, uses);
  topology.faces.forEach((face, faceIndex) => {
    if (topology.exactPlanarSideByFace[faceIndex]) curvedFaces.delete(faceIndex);
    if (analyticTopology.faceSurfaceIds[faceIndex]) curvedFaces.add(faceIndex);
  });
  const planarGroups = planarFaceGroups(topology, uses, curvedFaces);
  const derivedTangencies = tangentEdges(topology, uses, curvedFaces, planarGroups);
  return {
    analyticTopology,
    curvedFaces,
    planarGroups,
    tangentEdges: exactTangentEdges(topology, derivedTangencies, metadata, uses, planarGroups),
    uses,
  };
}

function flattenPlanarFaceNormals(topology, planarGroups) {
  const flattened = topology.faceVertexNormals.map((normals) =>
    normals.map((normal) => ({ ...normal })));
  planarGroups.forEach((group) => {
    group.indices.forEach((faceIndex) => {
      flattened[faceIndex] = topology.faces[faceIndex].map(() => ({ ...group.normal }));
    });
  });
  return flattened;
}

function resultMetadata(sourceSolid, topology, options) {
  const operation = options.operation ? JSON.parse(JSON.stringify(options.operation)) : null;
  const previousExactGeometry = sourceSolid.metadata?.exactGeometry ?? null;
  const previousOperations = previousExactGeometry?.operations ?? [];
  const exactBase = previousExactGeometry?.base ??
    (previousExactGeometry?.status === 'available'
      ? JSON.parse(JSON.stringify(previousExactGeometry))
      : null);
  return {
    ...(sourceSolid.metadata ?? {}),
    ...(options.metadata ?? {}),
    type: 'profileFeature',
    booleanKernel: 'manifold-3d',
    booleanOperation: options.operationType,
    capFaceGroups: null,
    profileSize: null,
    profileLoopSizes: null,
    faceVertexNormals: topology.faceVertexNormals,
    surfaceFaceIds: topology.faceIds,
    planarFaceGroups: topology.planarFaceGroups,
    curvedSideFaceIndices: topology.curvedSideFaceIndices,
    tangentEdges: topology.tangentEdges,
    curvedFeatureGeneratrices: [],
    profileFeatures: operation
      ? [...(sourceSolid.metadata?.profileFeatures ?? []), operation]
      : [...(sourceSolid.metadata?.profileFeatures ?? [])],
    exactGeometry: {
      status: 'pending',
      reason: 'boolean-result-exact-brep-not-implemented',
      base: exactBase,
      operations: operation ? [...previousOperations, operation] : [...previousOperations],
    },
  };
}

function manifoldToSolid(result, sourceSolid, options) {
  let simplified = null;
  let condensed = null;
  let smoothed = null;
  try {
    condensed = result.asOriginal();
    const requestedSimplifyTolerance = Number(options.simplifyTolerance);
    const simplifyTolerance =
      Number.isFinite(requestedSimplifyTolerance) && requestedSimplifyTolerance > 0
        ? requestedSimplifyTolerance
        : options.operationType === 'subtract' || options.operationType === 'union'
          ? coplanarFaceTolerance(sourceSolid)
          : null;
    simplified = simplifyTolerance
      ? condensed.simplify(simplifyTolerance)
      : null;
    smoothed = (simplified ?? condensed)
      .calculateNormals(0, THREE.MathUtils.radToDeg(SHARP_EDGE_ANGLE));
    const mesh = smoothed.getMesh(0);
    const rawTopology = triangleTopology(mesh);
    const topology = repairSmallTriangularHoles(
      rawTopology,
      Math.max(
        coplanarFaceTolerance(sourceSolid),
        coplanarFaceTolerance(rawTopology),
      ),
    );
    const classificationMetadata = {
      ...(sourceSolid.metadata ?? {}),
      profileFeatures: options.operation
        ? [...(sourceSolid.metadata?.profileFeatures ?? []), options.operation]
        : [...(sourceSolid.metadata?.profileFeatures ?? [])],
    };
    const surface = derivedSurfaceTopology(topology, classificationMetadata);
    topology.curvedSideFaceIndices = [...surface.curvedFaces];
    topology.planarFaceGroups = surface.planarGroups;
    topology.tangentEdges = surface.tangentEdges;
    topology.faceVertexNormals = flattenPlanarFaceNormals(topology, surface.planarGroups);
    const metadata = resultMetadata(sourceSolid, topology, options);
    const solid = createSolid3d({
      vertices: topology.vertices,
      faces: topology.faces,
      edges: mergedVisibleEdges(topology, surface, metadata),
      metadata,
    });
    const reconciled = options.operation?.tangentContact
      ? solid
      : consolidateNearCoplanarFaces(solid, {
        toleranceFactor: options.toleranceFactor,
      }) ?? solid;
    const audit = auditSolidCadTopology(reconciled);
    if (!audit.valid || !audit.closed) {
      console.warn(
        'Resultado booleano 3D descartado por topologia invalida',
        audit.errors,
        audit.stats,
      );
      return null;
    }
    return reconciled;
  }
  finally {
    smoothed?.delete?.();
    condensed?.delete?.();
    simplified?.delete?.();
  }
}

export function solidWithDerivedSurfaceTopology(solid) {
  if (!isValidSolid3d(solid)) return solid;
  const hasAnalyticExtrusion = exactExtrusionProfiles(solid.metadata).length > 0;
  if (solid.metadata?.booleanKernel !== 'manifold-3d' && !hasAnalyticExtrusion) return solid;
  const topology = {
    vertices: solid.vertices,
    faces: solid.faces,
    faceIds: semanticSurfaceFaceIds(solid),
    triangleNormals: solid.faces.map((face) => faceNormal(face, solid.vertices)),
    faceVertexNormals: solid.faces.map((face, faceIndex) => {
      const fallback = faceNormal(face, solid.vertices) ?? new THREE.Vector3(0, 0, 1);
      const stored = solid.metadata?.faceVertexNormals?.[faceIndex];
      return Array.isArray(stored) && stored.length === face.length
        ? stored
        : face.map(() => ({ x: fallback.x, y: fallback.y, z: fallback.z }));
    }),
  };
  const surface = derivedSurfaceTopology(topology, solid.metadata);
  const faceVertexNormals =
    flattenPlanarFaceNormals(topology, surface.planarGroups);
  return {
    ...solid,
    edges: mergedVisibleEdges(topology, surface, solid.metadata),
    metadata: {
      ...(solid.metadata ?? {}),
      curvedSideFaceIndices: [...surface.curvedFaces],
      planarFaceGroups: surface.planarGroups,
      tangentEdges: surface.tangentEdges,
      surfaceFaceIds: topology.faceIds,
      faceVertexNormals,
    },
  };
}

function pointSegmentDistance(point, start, end) {
  const segment = new THREE.Vector3(
    end.x - start.x,
    end.y - start.y,
    end.z - start.z,
  );
  const lengthSquared = segment.lengthSq();
  if (lengthSquared <= Number.EPSILON) {
    return new THREE.Vector3(
      point.x - start.x,
      point.y - start.y,
      point.z - start.z,
    ).length();
  }
  const relative = new THREE.Vector3(
    point.x - start.x,
    point.y - start.y,
    point.z - start.z,
  );
  const parameter = THREE.MathUtils.clamp(
    relative.dot(segment) / lengthSquared,
    0,
    1,
  );
  return relative.addScaledVector(segment, -parameter).length();
}

function loopsTouchWithinTolerance(first, second, tolerance) {
  const touches = (points, loop) => points.some((point) =>
    loop.some((start, index) =>
      pointSegmentDistance(point, start, loop[(index + 1) % loop.length]) <=
        tolerance));
  return touches(first, second) || touches(second, first);
}

function clearDerivedTopologyMetadata(metadata) {
  const result = { ...(metadata ?? {}) };
  [
    'curvedSideFaceIndices',
    'faceVertexNormals',
    'planarFaceGroups',
    'surfaceFaceIds',
    'tangentEdges',
  ].forEach((key) => delete result[key]);
  return result;
}

function withoutCollapsedInternalSheets(faces, vertices, normalDotTolerance) {
  let result = faces;
  for (let pass = 0; pass < 4; pass += 1) {
    const normals = result.map((face) => faceNormal(face, vertices));
    const remove = new Set();
    edgeUses(result).forEach(({ faces: adjacentFaces }) => {
      if (adjacentFaces.length <= 2) return;
      let oppositePair = null;
      let oppositeDot = 1;
      adjacentFaces.forEach((first, index) => {
        adjacentFaces.slice(index + 1).forEach((second) => {
          const dot = normals[first]?.dot(normals[second]);
          if (Number.isFinite(dot) && dot < oppositeDot) {
            oppositeDot = dot;
            oppositePair = [first, second];
          }
        });
      });
      if (oppositePair && oppositeDot <= -normalDotTolerance) {
        oppositePair.forEach((faceIndex) => remove.add(faceIndex));
      }
    });
    if (!remove.size) return result;
    result = result.filter((_, faceIndex) => !remove.has(faceIndex));
  }
  return result;
}

function consolidateNearCoplanarFaces(solid, {
  toleranceFactor,
} = {}) {
  if (!isValidSolid3d(solid)) return null;
  const derived = solidWithDerivedSurfaceTopology(solid);
  const groups = derived.metadata?.planarFaceGroups ?? [];
  if (groups.length < 2) return derived;
  const tolerance = coplanarFaceTolerance(derived, toleranceFactor);
  const touchTolerance = tolerance * 2;
  const normalDotTolerance =
    coplanarFaceNormalDotTolerance(derived, toleranceFactor);
  const parents = groups.map((_, index) => index);
  const root = (index) => {
    let current = index;
    while (parents[current] !== current) {
      parents[current] = parents[parents[current]];
      current = parents[current];
    }
    return current;
  };
  const join = (first, second) => {
    const firstRoot = root(first);
    const secondRoot = root(second);
    if (firstRoot !== secondRoot) parents[secondRoot] = firstRoot;
  };
  groups.forEach((first, firstIndex) => {
    const firstNormal = new THREE.Vector3(
      first.normal.x,
      first.normal.y,
      first.normal.z,
    ).normalize();
    const firstPoint = first.outerLoop?.[0];
    if (!firstPoint) return;
    groups.slice(firstIndex + 1).forEach((second, offset) => {
      const secondIndex = firstIndex + offset + 1;
      const secondNormal = new THREE.Vector3(
        second.normal.x,
        second.normal.y,
        second.normal.z,
      ).normalize();
      const secondPoint = second.outerLoop?.[0];
      if (!secondPoint ||
          firstNormal.dot(secondNormal) < normalDotTolerance ||
          Math.abs(new THREE.Vector3(
            secondPoint.x - firstPoint.x,
            secondPoint.y - firstPoint.y,
            secondPoint.z - firstPoint.z,
          ).dot(firstNormal)) > tolerance ||
          !loopsTouchWithinTolerance(
            first.outerLoop,
            second.outerLoop,
            touchTolerance,
          )) {
        return;
      }
      join(firstIndex, secondIndex);
    });
  });
  const clusters = new Map();
  groups.forEach((group, index) => {
    const owner = root(index);
    if (!clusters.has(owner)) clusters.set(owner, []);
    clusters.get(owner).push(group);
  });
  const mergedClusters = [...clusters.values()].filter((cluster) =>
    cluster.length > 1);
  const constraintsByVertex = new Map();
  mergedClusters.forEach((cluster, clusterIndex) => {
    const reference = [...cluster].sort((first, second) =>
      second.indices.length - first.indices.length)[0];
    const normal = new THREE.Vector3(
      reference.normal.x,
      reference.normal.y,
      reference.normal.z,
    ).normalize();
    const anchor = new THREE.Vector3(
      reference.outerLoop[0].x,
      reference.outerLoop[0].y,
      reference.outerLoop[0].z,
    );
    const constraint = { anchor, id: clusterIndex, normal };
    cluster.forEach((group) => group.indices.forEach((faceIndex) =>
      derived.faces[faceIndex].forEach((vertexIndex) => {
        if (!constraintsByVertex.has(vertexIndex)) {
          constraintsByVertex.set(vertexIndex, new Map());
        }
        constraintsByVertex.get(vertexIndex).set(clusterIndex, constraint);
      })));
  });
  const projectedVertices = derived.vertices.map((point, vertexIndex) => {
    const projected = new THREE.Vector3(point.x, point.y, point.z);
    const constraints = [
      ...(constraintsByVertex.get(vertexIndex)?.values() ?? []),
    ];
    for (let pass = 0; pass < 3; pass += 1) {
      constraints.forEach(({ anchor, normal }) => {
        projected.addScaledVector(
          normal,
          -projected.clone().sub(anchor).dot(normal),
        );
      });
    }
    return { x: projected.x, y: projected.y, z: projected.z };
  });
  const weldedVertices = [];
  const flatVertices = [];
  const vertexBucketsByScope = new Map();
  const closedSurfaceScopesByVertex = new Map();
  if (!mergedClusters.length) {
    const analyticTopology = deriveSolidAnalyticTopology(derived);
    const closedSurfaceIds = new Set(
      analyticTopology.sideSurfaces
        .filter((surface) => surface.closed)
        .map((surface) => surface.id),
    );
    analyticTopology.faceSurfaceIds.forEach((surfaceId, faceIndex) => {
      if (!closedSurfaceIds.has(surfaceId)) return;
      derived.faces[faceIndex].forEach((vertexIndex) => {
        if (!closedSurfaceScopesByVertex.has(vertexIndex)) {
          closedSurfaceScopesByVertex.set(vertexIndex, new Set());
        }
        closedSurfaceScopesByVertex.get(vertexIndex).add(surfaceId);
      });
    });
  }
  const remap = projectedVertices.map((point, vertexIndex) => {
    const surfaceScopes = closedSurfaceScopesByVertex.get(vertexIndex);
    const scope = mergedClusters.length
      ? 'all'
      : surfaceScopes?.size
        ? [...surfaceScopes].sort().join('|')
        : `vertex:${vertexIndex}`;
    if (!vertexBucketsByScope.has(scope)) {
      vertexBucketsByScope.set(scope, new Map());
    }
    const index = findOrAddMeshVertex(
      point,
      touchTolerance,
      flatVertices,
      vertexBucketsByScope.get(scope),
    );
    if (!weldedVertices[index]) weldedVertices[index] = point;
    return index;
  });
  const facesByVertices = new Map();
  const weldedFaces = [];
  let cancelledOppositeFaceCount = 0;
  derived.faces.forEach((face) => {
    const welded = face.map((index) => remap[index]);
    const normal = new Set(welded).size >= 3
      ? faceNormal(welded, weldedVertices)
      : null;
    if (!normal) return;
    const key = [...welded].sort((first, second) => first - second).join(':');
    const previousIndex = facesByVertices.get(key);
    if (previousIndex !== undefined) {
      const previous = weldedFaces[previousIndex];
      const previousNormal = previous
        ? faceNormal(previous, weldedVertices)
        : null;
      if (previousNormal &&
          previousNormal.dot(normal) <= -normalDotTolerance) {
        weldedFaces[previousIndex] = null;
        facesByVertices.delete(key);
        cancelledOppositeFaceCount += 2;
      }
      return;
    }
    facesByVertices.set(key, weldedFaces.length);
    weldedFaces.push(welded);
  });
  if (!mergedClusters.length && !cancelledOppositeFaceCount) return derived;
  const shellFaces = withoutCollapsedInternalSheets(
    weldedFaces.filter(Boolean),
    weldedVertices,
    normalDotTolerance,
  );
  const shellTopology = repairSmallTriangularHoles({
    vertices: weldedVertices,
    faces: shellFaces,
    faceIds: shellFaces.map((_, index) => index),
    triangleNormals: shellFaces.map((face) =>
      faceNormal(face, weldedVertices)),
    faceVertexNormals: shellFaces.map((face) => {
      const normal = faceNormal(face, weldedVertices);
      return face.map(() => ({
        x: normal.x,
        y: normal.y,
        z: normal.z,
      }));
    }),
  }, Number.POSITIVE_INFINITY);
  const closedFaces = shellTopology.faces;
  const usedVertices = [...new Set(closedFaces.flat())]
    .sort((first, second) => first - second);
  const compactIndex = new Map(usedVertices.map((index, nextIndex) =>
    [index, nextIndex]));
  const compact = createSolid3d({
    vertices: usedVertices.map((index) => weldedVertices[index]),
    faces: closedFaces.map((face) => face.map((index) =>
      compactIndex.get(index))),
    edges: [],
    metadata: clearDerivedTopologyMetadata(derived.metadata),
  });
  const reconciled = solidWithDerivedSurfaceTopology(compact);
  const audit = auditSolid3dTopology(reconciled);
  return audit.valid && audit.closed ? reconciled : null;
}

export function auditSolidCadTopology(solid) {
  if (!isValidSolid3d(solid)) {
    return {
      valid: false,
      closed: false,
      errors: ['invalid-solid-contract'],
      stats: {
        internalTriangulationEdgeCount: 0,
        missingCadBoundaryCount: 0,
        openCadLoopCount: 0,
        orphanCadEdgeCount: 0,
      },
    };
  }
  const reconciled = solidWithDerivedSurfaceTopology(solid);
  const topology = {
    vertices: reconciled.vertices,
    faces: reconciled.faces,
    faceIds: semanticSurfaceFaceIds(reconciled),
    triangleNormals: reconciled.faces.map((face) =>
      faceNormal(face, reconciled.vertices)),
    faceVertexNormals: reconciled.faces.map((face, faceIndex) => {
      const fallback = faceNormal(face, reconciled.vertices) ??
        new THREE.Vector3(0, 0, 1);
      const stored = reconciled.metadata?.faceVertexNormals?.[faceIndex];
      return Array.isArray(stored) && stored.length === face.length
        ? stored
        : face.map(() => ({ x: fallback.x, y: fallback.y, z: fallback.z }));
    }),
  };
  const surface = derivedSurfaceTopology(topology, reconciled.metadata);
  const meshUses = surface.uses;
  const planarOwnerByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) =>
      planarOwnerByFace.set(faceIndex, `planar:${groupIndex}`));
  });
  const faceOwners = topology.faces.map((_, faceIndex) => {
    const planarOwner = planarOwnerByFace.get(faceIndex);
    if (planarOwner) return { id: planarOwner, kind: 'planar' };
    const analyticSurfaceId =
      surface.analyticTopology.faceSurfaceIds[faceIndex];
    return analyticSurfaceId
      ? { id: `analytic:${analyticSurfaceId}`, kind: 'analytic' }
      : null;
  });
  const publishedEdgeKeys = new Set(reconciled.edges.map((edge) =>
    edgeKey(edge[0], edge[1])));
  const tangentEdgeKeys = new Set((surface.tangentEdges ?? []).map((edge) =>
    edgeKey(edge.startIndex, edge.endIndex)));
  const requiredBoundaryKeys = new Set();
  meshUses.forEach(({ edge, faces }) => {
    if (faces.length !== 2) {
      requiredBoundaryKeys.add(edgeKey(edge[0], edge[1]));
      return;
    }
    const firstOwner = faceOwners[faces[0]];
    const secondOwner = faceOwners[faces[1]];
    const smoothlyJoined = edge.every((vertexIndex) => {
      const firstNormal = faceCornerNormal(topology, faces[0], vertexIndex);
      const secondNormal = faceCornerNormal(topology, faces[1], vertexIndex);
      return firstNormal && secondNormal &&
        firstNormal.dot(secondNormal) >= 1 - 1e-5;
    });
    const provenBoundary = firstOwner && secondOwner
      ? firstOwner.id !== secondOwner.id
      : (firstOwner?.kind === 'planar' || secondOwner?.kind === 'planar') &&
        !smoothlyJoined;
    if (provenBoundary) {
      requiredBoundaryKeys.add(edgeKey(edge[0], edge[1]));
    }
  });
  const missingCadBoundaryKeys = [...requiredBoundaryKeys].filter((key) =>
    !publishedEdgeKeys.has(key) && !tangentEdgeKeys.has(key));
  const missingCadBoundaryCount = missingCadBoundaryKeys.length;
  const orphanCadEdgeCount = [...publishedEdgeKeys].filter((key) =>
    !meshUses.has(key)).length;
  const internalTriangulationEdgeCount = [...publishedEdgeKeys].filter((key) => {
    const faces = meshUses.get(key)?.faces ?? [];
    const firstOwner = faceOwners[faces[0]];
    const secondOwner = faceOwners[faces[1]];
    return faces.length === 2 &&
      firstOwner &&
      secondOwner &&
      firstOwner.id === secondOwner.id;
  }).length;
  const assignedPlanarFaces = new Set(surface.planarGroups.flatMap((group) =>
    group.indices));
  const unassignedPlanarFaceCount = topology.faces.filter((_, faceIndex) =>
    !surface.curvedFaces.has(faceIndex) &&
    !assignedPlanarFaces.has(faceIndex)).length;
  const openCadLoopCount = unassignedPlanarFaceCount +
    surface.planarGroups.filter((group) => {
      const loops = boundaryLoops(group.indices, topology);
      const publishedLoopCount = 1 + (group.innerLoops?.length ?? 0);
      return loops.length !== publishedLoopCount ||
        !Array.isArray(group.outerLoop) ||
        group.outerLoop.length < 3 ||
        (group.innerLoops ?? []).some((loop) =>
          !Array.isArray(loop) || loop.length < 3);
    }).length;
  const meshAudit = auditSolid3dTopology(reconciled);
  const errors = [
    ...meshAudit.errors,
    ...(openCadLoopCount
      ? [`open-cad-loop:${openCadLoopCount}`]
      : []),
    ...(missingCadBoundaryCount
      ? [`missing-cad-boundary:${missingCadBoundaryCount}`]
      : []),
    ...(orphanCadEdgeCount
      ? [`orphan-cad-edge:${orphanCadEdgeCount}`]
      : []),
    ...(internalTriangulationEdgeCount
      ? [`internal-triangulation-edge:${internalTriangulationEdgeCount}`]
      : []),
  ];
  return {
    valid: meshAudit.valid &&
      openCadLoopCount === 0 &&
      missingCadBoundaryCount === 0 &&
      orphanCadEdgeCount === 0 &&
      internalTriangulationEdgeCount === 0,
    closed: meshAudit.closed && openCadLoopCount === 0,
    errors,
    stats: {
      ...meshAudit.stats,
      internalTriangulationEdgeCount,
      missingCadBoundaryCount,
      openCadLoopCount,
      orphanCadEdgeCount,
      reconciliationTolerance: coplanarFaceTolerance(reconciled),
    },
  };
}

export function solidWithSimplifiedBooleanMesh(solid) {
  if (!manifoldApi || !isValidSolid3d(solid) ||
      solid.metadata?.booleanKernel !== 'manifold-3d' ||
      solid.metadata?.booleanOperation !== 'subtract') {
    return solid;
  }
  let source = null;
  let simplified = null;
  try {
    const tolerance = manufacturingMeshTolerance(solid);
    source = solidToManifold(
      solid,
      0,
      booleanWeldTolerance(solid),
      false,
    );
    simplified = source.simplify(tolerance);
    if (simplified.status() !== 'NoError' || simplified.isEmpty()) return solid;
    return manifoldToSolid(simplified, solid, { operationType: 'subtract' }) ?? solid;
  }
  catch (error) {
    console.warn('No se pudo simplificar la malla booleana guardada', error);
    return solid;
  }
  finally {
    simplified?.delete?.();
    source?.delete?.();
  }
}

export function rebuildSolidCadTopology(solid, {
  toleranceFactor,
} = {}) {
  const rebuilt = consolidateNearCoplanarFaces(solid, {
    toleranceFactor,
  });
  if (!rebuilt) return null;
  const audit = auditSolidCadTopology(rebuilt);
  return audit.valid && audit.closed ? rebuilt : null;
}

export function booleanSolid3d(sourceSolid, toolSolid, options = {}) {
  if (!manifoldApi || !isValidSolid3d(sourceSolid) || !isValidSolid3d(toolSolid)) return null;
  const operationType = options.operationType === 'subtract' ? 'subtract' : 'union';
  let source = null;
  let tool = null;
  let result = null;
  try {
    source = solidToManifold(sourceSolid, 0x10000000);
    tool = solidToManifold(toolSolid, 0x20000000);
    result = operationType === 'subtract' ? source.subtract(tool) : source.add(tool);
    if (result.status() !== 'NoError' || result.isEmpty()) return null;
    return manifoldToSolid(result, sourceSolid, { ...options, operationType });
  }
  catch (error) {
    console.warn('No se pudo resolver la operacion volumetrica de Push', error);
    return null;
  }
  finally {
    result?.delete?.();
    tool?.delete?.();
    source?.delete?.();
  }
}

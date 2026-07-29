/* webCAD - Sistemas locales persistentes para croquis 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { normalizePrincipalPlane, principalPlaneDefinition } from './principal-plane.js';

const EPSILON = 1e-12;
const TWO_PI = Math.PI * 2;
export const SKETCH_PLANE_COORDINATE_SYSTEM = 'sketch-plane-v1';

function point3(point = {}) {
  return {
    x: Number(point.x) || 0,
    y: Number(point.y) || 0,
    z: Number(point.z) || 0,
  };
}

function length(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalize(vector, fallback) {
  const value = point3(vector);
  const magnitude = length(value);
  if (magnitude <= EPSILON) return { ...fallback };
  return { x: value.x / magnitude, y: value.y / magnitude, z: value.z / magnitude };
}

function subtract(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function normalizeAngle(angle) {
  const normalized = Number(angle) % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

export function principalSketchPlane(value = 'XY') {
  const definition = principalPlaneDefinition(value);
  return {
    type: 'principal',
    id: definition.id,
    label: definition.label,
    origin: definition.origin,
    xAxis: definition.xAxis,
    yAxis: definition.yAxis,
    normal: definition.normal,
  };
}

export function normalizeSketchPlane(value = 'XY') {
  if (typeof value === 'string' || !value || typeof value !== 'object') {
    return principalSketchPlane(normalizePrincipalPlane(value));
  }
  if (value.type === 'principal' || value.id) {
    return principalSketchPlane(value.id);
  }
  const normal = normalize(value.normal, { x: 0, y: 0, z: 1 });
  const xAxis = normalize(value.xAxis, { x: 1, y: 0, z: 0 });
  const yAxis = normalize(value.yAxis ?? cross(normal, xAxis), cross(normal, xAxis));
  return {
    type: 'fixed',
    id: null,
    label: value.label || 'Cara plana',
    origin: point3(value.origin),
    xAxis,
    yAxis,
    normal,
    axisRotation: Number(value.axisRotation) || 0,
    source: value.source ? JSON.parse(JSON.stringify(value.source)) : null,
    ...(value.coordinateSystem === SKETCH_PLANE_COORDINATE_SYSTEM
      ? { coordinateSystem: SKETCH_PLANE_COORDINATE_SYSTEM }
      : {}),
  };
}

export function rotateSketchPlaneAxes(plane, quarterTurns = 1) {
  const frame = normalizeSketchPlane(plane);
  const turns = ((Math.trunc(quarterTurns) % 4) + 4) % 4;
  let xAxis = { ...frame.xAxis };
  let yAxis = { ...frame.yAxis };
  for (let index = 0; index < turns; index += 1) {
    [xAxis, yAxis] = [yAxis, { x: -xAxis.x, y: -xAxis.y, z: -xAxis.z }];
  }
  return normalizeSketchPlane({
    ...frame,
    type: 'fixed',
    id: null,
    xAxis,
    yAxis,
    axisRotation: ((Number(frame.axisRotation) || 0) + turns * 90) % 360,
  });
}

export function sketchPlaneFromFace(face) {
  const points = Array.isArray(face?.points) ? face.points.map(point3) : [];
  if (points.length < 3) return null;
  const normal = normalize(face.normal, { x: 0, y: 0, z: 1 });
  const components = [Math.abs(normal.x), Math.abs(normal.y), Math.abs(normal.z)];
  const dominant = components.indexOf(Math.max(...components));
  let xAxis;
  let yAxis;
  if (dominant === 2) {
    xAxis = { x: 1, y: 0, z: 0 };
    yAxis = { x: 0, y: normal.z >= 0 ? 1 : -1, z: 0 };
  }
  else if (dominant === 1) {
    xAxis = { x: normal.y <= 0 ? 1 : -1, y: 0, z: 0 };
    yAxis = { x: 0, y: 0, z: 1 };
  }
  else {
    xAxis = { x: 0, y: normal.x >= 0 ? 1 : -1, z: 0 };
    yAxis = { x: 0, y: 0, z: 1 };
  }
  const projectedXAxis = subtract(xAxis, {
    x: normal.x * dot(xAxis, normal),
    y: normal.y * dot(xAxis, normal),
    z: normal.z * dot(xAxis, normal),
  });
  xAxis = normalize(projectedXAxis, xAxis);
  yAxis = normalize(cross(normal, xAxis), yAxis);
  return normalizeSketchPlane({
    type: 'fixed',
    label: 'Cara plana',
    origin: points[0],
    xAxis,
    yAxis,
    normal,
    source: {
      type: 'solid-face-snapshot',
      solidId: face.sourceSolidDocumentId ?? null,
      faceIndices: face.sourceSolidFaceIndices ?? [face.sourceSolidFaceIndex].filter(Number.isInteger),
    },
  });
}

export function pointOnSketchPlane(point, plane = 'XY') {
  const frame = normalizeSketchPlane(plane);
  const local = point3(point);
  return {
    x: frame.origin.x + frame.xAxis.x * local.x + frame.yAxis.x * local.y + frame.normal.x * local.z,
    y: frame.origin.y + frame.xAxis.y * local.x + frame.yAxis.y * local.y + frame.normal.y * local.z,
    z: frame.origin.z + frame.xAxis.z * local.x + frame.yAxis.z * local.y + frame.normal.z * local.z,
  };
}

export function pointFromSketchPlane(point, plane = 'XY') {
  const frame = normalizeSketchPlane(plane);
  const relative = subtract(point3(point), frame.origin);
  return {
    x: dot(relative, frame.xAxis),
    y: dot(relative, frame.yAxis),
    z: dot(relative, frame.normal),
  };
}

export function pointOnExactProfilePlane(point, plane = 'XY') {
  const local = point3(point);
  return pointOnSketchPlane({
    x: local.x,
    y: plane?.coordinateSystem === SKETCH_PLANE_COORDINATE_SYSTEM
      ? local.y
      : -local.y,
    z: local.z,
  }, plane);
}

export function pointFromExactProfilePlane(point, plane = 'XY') {
  const local = pointFromSketchPlane(point, plane);
  return plane?.coordinateSystem === SKETCH_PLANE_COORDINATE_SYSTEM
    ? local
    : { x: local.x, y: -local.y, z: local.z };
}

function legacyProfilePointToV1(point) {
  return point
    ? { x: Number(point.x) || 0, y: -(Number(point.y) || 0), z: Number(point.z) || 0 }
    : point;
}

function legacyProfileBoundsToV1(bounds) {
  if (!bounds) return null;
  return {
    minX: Number(bounds.minX),
    minY: -Number(bounds.maxY),
    maxX: Number(bounds.maxX),
    maxY: -Number(bounds.minY),
  };
}

function transformedEllipseAngle(point, center, radiusX, radiusY, rotation) {
  const deltaX = point.x - center.x;
  const deltaY = point.y - center.y;
  return normalizeAngle(Math.atan2(
    (-deltaX * Math.sin(rotation) + deltaY * Math.cos(rotation)) / radiusY,
    (deltaX * Math.cos(rotation) + deltaY * Math.sin(rotation)) / radiusX,
  ));
}

export function exactProfileToSketchPlaneV1(exactProfile) {
  if (!exactProfile) return exactProfile;
  const profile = JSON.parse(JSON.stringify(exactProfile));
  if (!profile.plane ||
      profile.plane.coordinateSystem === SKETCH_PLANE_COORDINATE_SYSTEM) {
    return profile;
  }
  const transformSegment = (segment) => {
    const transformed = JSON.parse(JSON.stringify(segment));
    const center = legacyProfilePointToV1(segment.center);
    const start = legacyProfilePointToV1(segment.start);
    const end = legacyProfilePointToV1(segment.end);
    if (center) transformed.center = center;
    if (start) transformed.start = start;
    if (end) transformed.end = end;
    if (segment.type === 'arc-circle' && center && start && end) {
      transformed.startAngle = normalizeAngle(Math.atan2(
        start.y - center.y,
        start.x - center.x,
      ));
      transformed.endAngle = normalizeAngle(Math.atan2(
        end.y - center.y,
        end.x - center.x,
      ));
    }
    if (segment.type === 'ellipse' || segment.type === 'arc-ellipse') {
      transformed.rotation = -(Number(segment.rotation) || 0);
      if (segment.type === 'arc-ellipse' && center && start && end) {
        transformed.startAngle = transformedEllipseAngle(
          start,
          center,
          segment.radiusX,
          segment.radiusY,
          transformed.rotation,
        );
        transformed.endAngle = transformedEllipseAngle(
          end,
          center,
          segment.radiusX,
          segment.radiusY,
          transformed.rotation,
        );
      }
    }
    if (['circle', 'arc-circle', 'ellipse', 'arc-ellipse'].includes(segment.type)) {
      transformed.clockwise = segment.clockwise === false;
    }
    if (transformed.source?.orientation) {
      transformed.source.orientation *= -1;
    }
    return transformed;
  };
  const transformLoop = (loop) => ({
    ...loop,
    segments: (loop?.segments ?? []).map(transformSegment),
    bounds: legacyProfileBoundsToV1(loop?.bounds),
    orientation: loop?.orientation === 'cw'
      ? 'ccw'
      : loop?.orientation === 'ccw' ? 'cw' : loop?.orientation,
  });
  profile.outerLoop = transformLoop(profile.outerLoop);
  profile.innerLoops = (profile.innerLoops ?? []).map(transformLoop);
  profile.segments = profile.outerLoop.segments;
  profile.bounds = legacyProfileBoundsToV1(profile.bounds);
  profile.orientation = {
    outer: profile.outerLoop.orientation,
    inner: profile.innerLoops.map((loop) => loop.orientation),
  };
  profile.plane.coordinateSystem = SKETCH_PLANE_COORDINATE_SYSTEM;
  return profile;
}

export function exactProfileOnSketchPlane(profile, plane = 'XY') {
  if (!profile) return profile;
  const clone = JSON.parse(JSON.stringify(profile));
  if (clone.plane?.coordinateSystem === SKETCH_PLANE_COORDINATE_SYSTEM) {
    return clone;
  }
  const frame = normalizeSketchPlane(plane);
  clone.plane = {
    type: 'plane',
    origin: frame.origin,
    xAxis: frame.xAxis,
    yAxis: frame.yAxis,
    normal: frame.normal,
  };
  return exactProfileToSketchPlaneV1(clone);
}

export function faceOnSketchPlane(face, plane = 'XY', sketchId = null) {
  const frame = normalizeSketchPlane(plane);
  const localPoints = (face?.points || []).map(point3);
  const localHoles = (face?.holes || []).map((loop) => loop.map(point3));
  return {
    ...face,
    points: localPoints.map((point) => pointOnSketchPlane(point, frame)),
    holes: localHoles.map((loop) => loop.map((point) => pointOnSketchPlane(point, frame))),
    normal: frame.normal,
    sketchId,
    sketchPlane: frame.id ?? null,
    workplane: frame,
    localPoints,
    localHoles,
    exactProfile: exactProfileOnSketchPlane(face?.exactProfile, frame),
  };
}

export function solidOnSketchPlane(solid, plane = 'XY', sketchId = null) {
  const frame = normalizeSketchPlane(plane);
  return {
    ...solid,
    vertices: (solid?.vertices || []).map((point) => pointOnSketchPlane(point, frame)),
    faces: (solid?.faces || []).map((face) => [...face]),
    edges: (solid?.edges || []).map((edge) => [...edge]),
    metadata: {
      ...(solid?.metadata || {}),
      sketchId,
      sketchPlane: frame.id ?? null,
      workplane: frame,
      normal: frame.normal,
    },
  };
}

/* webCAD - Discretizacion temporal de curvas para vista 3D | SPDX-License-Identifier: GPL-3.0-or-later */

export const TWO_PI = Math.PI * 2;

const DEFAULT_MAX_ARC_SEGMENT_ANGLE = Math.PI / 18;
const DEFAULT_ARC_CHORD_TOLERANCE = 0.25;
const DEFAULT_MAX_ARC_SEGMENTS = 128;

export function normalizeAngle(angle) {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

export function angleOfPoint(center, point) {
  return normalizeAngle(Math.atan2(point.y - center.y, point.x - center.x));
}

export function directedArcSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

export function adaptiveArcSegmentCount(radius, sweep, options = {}) {
  const cleanRadius = Math.abs(Number(radius));
  const cleanSweep = Math.abs(Number(sweep));
  if (!Number.isFinite(cleanRadius) || !Number.isFinite(cleanSweep) ||
      cleanRadius <= 0 || cleanSweep <= 0) {
    return 0;
  }
  const maxAngle = Math.max(
    Math.PI / 180,
    Number(options.maxArcSegmentAngle) || DEFAULT_MAX_ARC_SEGMENT_ANGLE,
  );
  const maxSegments = Math.max(2, Number(options.maxArcSegments) || DEFAULT_MAX_ARC_SEGMENTS);
  const chordTolerance = Math.max(
    0,
    Number(options.arcChordTolerance) || DEFAULT_ARC_CHORD_TOLERANCE,
  );
  const angleDriven = Math.ceil(cleanSweep / maxAngle);
  let toleranceDriven = 1;
  if (chordTolerance > 0 && chordTolerance < cleanRadius) {
    const toleranceAngle = 2 * Math.acos(Math.max(-1, Math.min(1, 1 - chordTolerance / cleanRadius)));
    if (Number.isFinite(toleranceAngle) && toleranceAngle > 0) {
      toleranceDriven = Math.ceil(cleanSweep / toleranceAngle);
    }
  }
  return Math.min(maxSegments, Math.max(2, angleDriven, toleranceDriven));
}

export function sampleArcByCenter({ start, end, center, clockwise = true }, options = {}) {
  const radius = Math.hypot(start.x - center.x, start.y - center.y);
  const startAngle = angleOfPoint(center, start);
  const endAngle = angleOfPoint(center, end);
  const sweep = directedArcSweep(startAngle, endAngle, clockwise);
  const segmentCount = adaptiveArcSegmentCount(radius, sweep, options);
  if (!segmentCount) return [];
  const direction = clockwise ? 1 : -1;
  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    if (index === 0) return { ...start };
    if (index === segmentCount) return { ...end };
    const parameter = index / segmentCount;
    const angle = startAngle + direction * sweep * parameter;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      z: (Number(start.z) || 0) + ((Number(end.z) || 0) - (Number(start.z) || 0)) * parameter,
    };
  });
}

export function sampleEllipseEntity(entity, options = {}) {
  const centerX = Number(entity?.center?.x);
  const centerY = Number(entity?.center?.y);
  const centerZ = Number(entity?.center?.z) || 0;
  const radiusX = Math.abs(Number(entity?.radiusX));
  const radiusY = Math.abs(Number(entity?.radiusY));
  const rotation = Number(entity?.rotation) || 0;
  if (![centerX, centerY, radiusX, radiusY, rotation].every(Number.isFinite) ||
      radiusX <= 0 || radiusY <= 0) return [];
  const full = entity.type === 'ELLIPSE';
  const start = full ? 0 : Number(entity.startParameter);
  const end = full ? TWO_PI : Number(entity.endParameter);
  if (![start, end].every(Number.isFinite)) return [];
  const clockwise = full || entity.clockwise !== false;
  const sweep = full ? TWO_PI : directedArcSweep(start, end, clockwise);
  const requestedSegments = Math.max(0, Number(options.curveSegments) || 0);
  const segmentCount = requestedSegments
    ? Math.max(2, Math.ceil(requestedSegments * sweep / TWO_PI))
    : adaptiveArcSegmentCount(Math.max(radiusX, radiusY), sweep, options);
  if (!segmentCount) return [];
  const direction = clockwise ? 1 : -1;
  const rotationCosine = Math.cos(rotation);
  const rotationSine = Math.sin(rotation);
  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    const parameter = start + direction * sweep * index / segmentCount;
    const cosine = Math.cos(parameter);
    const sine = Math.sin(parameter);
    return {
      x: centerX + radiusX * cosine * rotationCosine - radiusY * sine * rotationSine,
      y: centerY + radiusX * cosine * rotationSine + radiusY * sine * rotationCosine,
      z: centerZ,
    };
  });
}

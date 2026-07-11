/* webCAD - Extrusion lineal exacta minima desde ExactProfile | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  cloneExactProfile,
  sampleExactProfile,
  validateExactProfile,
} from './exact-profile.js';

const DEFAULT_DIRECTION = { x: 0, y: 0, z: 1 };
const MIN_DISTANCE = 1e-9;

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function vector3(vector, fallback = DEFAULT_DIRECTION) {
  const x = finiteNumber(vector?.x);
  const y = finiteNumber(vector?.y);
  const z = finiteNumber(vector?.z);
  if (x === null || y === null || z === null) {
    return fallback ? { ...fallback } : null;
  }
  return { x, y, z };
}

function vectorLength(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalizeVector(vector) {
  if (!vector) return null;
  const length = vectorLength(vector);
  return length <= MIN_DISTANCE ? null : {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length,
  };
}

function scaledVector(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function offsetPoint(point, vector) {
  return {
    x: point.x + vector.x,
    y: point.y + vector.y,
    z: (point.z || 0) + vector.z,
  };
}

function segmentRepresentativePoint(segment) {
  return segment.start || segment.center || null;
}

function lateralSurfaceFromSegment(segment, loopRole, segmentIndex, direction, distance) {
  const base = {
    loopRole,
    segmentIndex,
    sourceSegment: cloneJson(segment),
    direction: cloneJson(direction),
    distance,
  };
  if (segment.type === 'line') {
    return {
      ...base,
      type: 'plane',
      kind: 'line-extrusion-side',
      start: cloneJson(segment.start),
      end: cloneJson(segment.end),
    };
  }
  if (segment.type === 'circle') {
    return {
      ...base,
      type: 'cylinder',
      kind: loopRole === 'outer' ? 'outer-side' : 'inner-side',
      center: cloneJson(segment.center),
      radius: segment.radius,
      axis: cloneJson(direction),
      trimRole: loopRole === 'outer' ? 'outer' : 'inner',
    };
  }
  if (segment.type === 'arc-circle') {
    return {
      ...base,
      type: 'linearExtrusionSurface',
      curveType: 'arc-circle',
      center: cloneJson(segment.center),
      radius: segment.radius,
      startAngle: segment.startAngle,
      endAngle: segment.endAngle,
      clockwise: segment.clockwise !== false,
      start: cloneJson(segment.start),
      end: cloneJson(segment.end),
    };
  }
  if (segment.type === 'ellipse') {
    return {
      ...base,
      type: 'ellipticCylinder',
      kind: loopRole === 'outer' ? 'outer-side' : 'inner-side',
      center: cloneJson(segment.center),
      radiusX: segment.radiusX,
      radiusY: segment.radiusY,
      rotation: segment.rotation || 0,
      axis: cloneJson(direction),
      trimRole: loopRole === 'outer' ? 'outer' : 'inner',
    };
  }
  if (segment.type === 'arc-ellipse') {
    return {
      ...base,
      type: 'linearExtrusionSurface',
      curveType: 'arc-ellipse',
      center: cloneJson(segment.center),
      radiusX: segment.radiusX,
      radiusY: segment.radiusY,
      rotation: segment.rotation || 0,
      startAngle: segment.startAngle,
      endAngle: segment.endAngle,
      clockwise: segment.clockwise !== false,
      start: cloneJson(segment.start),
      end: cloneJson(segment.end),
    };
  }
  return {
    ...base,
    type: 'linearExtrusionSurface',
    curveType: segment.type,
  };
}

function lateralSurfacesForLoop(loop, loopRole, direction, distance) {
  return loop.segments.map((segment, segmentIndex) =>
    lateralSurfaceFromSegment(segment, loopRole, segmentIndex, direction, distance));
}

function createCap(profile, role, offset) {
  return {
    type: 'plane',
    role,
    plane: cloneJson(profile.plane),
    offset: cloneJson(offset),
    outerLoop: cloneJson(profile.outerLoop),
    innerLoops: cloneJson(profile.innerLoops || []),
    trimRole: role,
  };
}

export function createExactExtrusion(profile, distance, options = {}) {
  const cleanDistance = finiteNumber(distance);
  if (!validateExactProfile(profile) || cleanDistance === null || Math.abs(cleanDistance) <= MIN_DISTANCE) {
    return null;
  }
  const direction = normalizeVector(vector3(options.direction));
  if (!direction) return null;
  const offset = scaledVector(direction, cleanDistance);
  const sourceProfile = cloneExactProfile(profile);
  const sideDirection = cleanDistance < 0 ? scaledVector(direction, -1) : direction;
  const extrusion = {
    type: 'exact-extrusion',
    version: 1,
    id: options.id ?? null,
    profile: sourceProfile,
    direction,
    distance: cleanDistance,
    offset,
    caps: {
      start: createCap(sourceProfile, 'start', { x: 0, y: 0, z: 0 }),
      end: createCap(sourceProfile, 'end', offset),
    },
    sideSurfaces: {
      outer: lateralSurfacesForLoop(sourceProfile.outerLoop, 'outer', sideDirection, cleanDistance),
      inner: sourceProfile.innerLoops.map((loop, loopIndex) => ({
        loopIndex,
        surfaces: lateralSurfacesForLoop(loop, `inner-${loopIndex}`, sideDirection, cleanDistance),
      })),
    },
    metadata: cloneJson(options.metadata ?? null),
  };
  extrusion.bounds = exactExtrusionBounds(extrusion);
  return extrusion;
}

export function validateExactExtrusion(extrusion) {
  if (extrusion?.type !== 'exact-extrusion' || extrusion.version !== 1 ||
      !validateExactProfile(extrusion.profile) ||
      !Number.isFinite(extrusion.distance) ||
      Math.abs(extrusion.distance) <= MIN_DISTANCE ||
      !normalizeVector(vector3(extrusion.direction, null))) {
    return false;
  }
  if (extrusion.caps?.start?.type !== 'plane' || extrusion.caps?.end?.type !== 'plane') return false;
  if (!Array.isArray(extrusion.sideSurfaces?.outer)) return false;
  if (!Array.isArray(extrusion.sideSurfaces?.inner)) return false;
  return extrusion.sideSurfaces.outer.length === extrusion.profile.outerLoop.segments.length &&
    extrusion.sideSurfaces.inner.length === extrusion.profile.innerLoops.length;
}

export function cloneExactExtrusion(extrusion) {
  return cloneJson(extrusion);
}

function expandBounds(bounds, point) {
  if (!point) return bounds;
  if (!bounds) {
    return {
      minX: point.x,
      minY: point.y,
      minZ: point.z || 0,
      maxX: point.x,
      maxY: point.y,
      maxZ: point.z || 0,
    };
  }
  bounds.minX = Math.min(bounds.minX, point.x);
  bounds.minY = Math.min(bounds.minY, point.y);
  bounds.minZ = Math.min(bounds.minZ, point.z || 0);
  bounds.maxX = Math.max(bounds.maxX, point.x);
  bounds.maxY = Math.max(bounds.maxY, point.y);
  bounds.maxZ = Math.max(bounds.maxZ, point.z || 0);
  return bounds;
}

function segmentBoundsPoints(segment) {
  if (segment.type === 'line' || segment.type === 'arc-circle' || segment.type === 'arc-ellipse') {
    return [segment.start, segment.end].filter(Boolean);
  }
  if (segment.type === 'circle') {
    return [
      { x: segment.center.x - segment.radius, y: segment.center.y, z: segment.center.z || 0 },
      { x: segment.center.x + segment.radius, y: segment.center.y, z: segment.center.z || 0 },
      { x: segment.center.x, y: segment.center.y - segment.radius, z: segment.center.z || 0 },
      { x: segment.center.x, y: segment.center.y + segment.radius, z: segment.center.z || 0 },
    ];
  }
  if (segment.type === 'ellipse') {
    const rx = segment.radiusX;
    const ry = segment.radiusY;
    return [
      { x: segment.center.x - rx, y: segment.center.y - ry, z: segment.center.z || 0 },
      { x: segment.center.x + rx, y: segment.center.y + ry, z: segment.center.z || 0 },
    ];
  }
  return [segmentRepresentativePoint(segment)].filter(Boolean);
}

export function exactExtrusionBounds(extrusion) {
  if (!extrusion?.profile) return null;
  const offset = extrusion.offset || scaledVector(vector3(extrusion.direction), extrusion.distance);
  let bounds = null;
  const loops = [extrusion.profile.outerLoop, ...(extrusion.profile.innerLoops || [])];
  loops.forEach((loop) => {
    loop.segments.forEach((segment) => {
      segmentBoundsPoints(segment).forEach((point) => {
        bounds = expandBounds(bounds, point);
        bounds = expandBounds(bounds, offsetPoint(point, offset));
      });
    });
  });
  return bounds;
}

function quadFromEdge(start, end, offset) {
  return [
    cloneJson(start),
    cloneJson(end),
    offsetPoint(end, offset),
    offsetPoint(start, offset),
  ];
}

function sampledLoopEdges(points) {
  if (!Array.isArray(points) || points.length < 2) return [];
  const cleanPoints = points.slice();
  if (cleanPoints.length > 2) {
    const first = cleanPoints[0];
    const last = cleanPoints[cleanPoints.length - 1];
    if (Math.hypot(first.x - last.x, first.y - last.y, (first.z || 0) - (last.z || 0)) <= 1e-9) {
      cleanPoints.pop();
    }
  }
  return cleanPoints.map((point, index) => ({
    start: point,
    end: cleanPoints[(index + 1) % cleanPoints.length],
  }));
}

export function sampleExactExtrusion(extrusion, options = {}) {
  if (!validateExactExtrusion(extrusion)) {
    return { caps: { start: null, end: null }, sideFaces: { outer: [], inner: [] } };
  }
  const sampledProfile = sampleExactProfile(extrusion.profile, {
    ...options,
    structured: true,
  });
  const offset = extrusion.offset || scaledVector(vector3(extrusion.direction), extrusion.distance);
  const offsetLoop = (points) => points.map((point) => offsetPoint(point, offset));
  return {
    caps: {
      start: {
        outerLoop: cloneJson(sampledProfile.outerLoop),
        innerLoops: cloneJson(sampledProfile.innerLoops),
      },
      end: {
        outerLoop: offsetLoop(sampledProfile.outerLoop),
        innerLoops: sampledProfile.innerLoops.map(offsetLoop),
      },
    },
    sideFaces: {
      outer: sampledLoopEdges(sampledProfile.outerLoop)
        .map((edge) => quadFromEdge(edge.start, edge.end, offset)),
      inner: sampledProfile.innerLoops.map((loop) =>
        sampledLoopEdges(loop).map((edge) => quadFromEdge(edge.end, edge.start, offset))),
    },
  };
}

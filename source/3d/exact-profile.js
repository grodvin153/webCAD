/* webCAD - Perfiles 2D exactos para futura geometria CAD | SPDX-License-Identifier: GPL-3.0-or-later */

const TWO_PI = Math.PI * 2;
const DEFAULT_SAMPLE_SEGMENTS = 32;
const DEFAULT_PLANE_XY = {
  type: 'plane',
  origin: { x: 0, y: 0, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
  xAxis: { x: 1, y: 0, z: 0 },
};

function finiteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function point3(point, fallbackZ = 0) {
  const x = finiteNumber(point?.x);
  const y = finiteNumber(point?.y);
  const z = point?.z === undefined ? fallbackZ : finiteNumber(point.z);
  return x === null || y === null || z === null ? null : { x, y, z };
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function normalizeAngle(angle) {
  const normalized = Number(angle) % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function angleOfPoint(center, point) {
  return normalizeAngle(Math.atan2(point.y - center.y, point.x - center.x));
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function signedSweep(startAngle, endAngle, clockwise = true) {
  return (clockwise ? 1 : -1) * directedSweep(startAngle, endAngle, clockwise);
}

function pointOnCircle(center, radius, angle) {
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    z: center.z || 0,
  };
}

function pointOnEllipse(center, radiusX, radiusY, rotation, angle) {
  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);
  const localX = Math.cos(angle) * radiusX;
  const localY = Math.sin(angle) * radiusY;
  return {
    x: center.x + localX * cosRotation - localY * sinRotation,
    y: center.y + localX * sinRotation + localY * cosRotation,
    z: center.z || 0,
  };
}

function samePoint(first, second, tolerance = 1e-9) {
  return Math.hypot(
    (first?.x ?? 0) - (second?.x ?? 0),
    (first?.y ?? 0) - (second?.y ?? 0),
    (first?.z ?? 0) - (second?.z ?? 0),
  ) <= tolerance;
}

function sourceReference(entity) {
  const id = entity?.id ?? entity?.handle ?? null;
  return {
    entityId: id === undefined ? null : id,
    entityType: entity?.type ?? null,
  };
}

function loopFromSegments(segments, role = 'outer') {
  const loop = {
    type: 'exact-profile-loop',
    role,
    closed: true,
    segments,
  };
  loop.bounds = loopBounds(loop);
  loop.orientation = loopOrientation(loop);
  return loop;
}

function baseProfile(entity, outerSegments, options = {}) {
  const innerLoops = (options.innerLoops || []).map((loop, index) =>
    loopFromSegments(cloneJson(loop.segments || loop), `inner-${index}`));
  const profile = {
    type: 'exact-profile',
    version: 1,
    id: options.id ?? entity?.id ?? entity?.handle ?? null,
    closed: true,
    plane: cloneJson(options.plane ?? DEFAULT_PLANE_XY),
    source: sourceReference(entity),
    outerLoop: loopFromSegments(outerSegments, 'outer'),
    innerLoops,
  };
  // Compatibility alias for the first exact-profile version.
  profile.segments = profile.outerLoop.segments;
  profile.bounds = exactProfileBounds(profile);
  profile.orientation = {
    outer: profile.outerLoop.orientation,
    inner: profile.innerLoops.map((loop) => loop.orientation),
  };
  return profile;
}

function expandBounds(bounds, point) {
  if (!point) return bounds;
  if (!bounds) {
    return {
      minX: point.x,
      minY: point.y,
      maxX: point.x,
      maxY: point.y,
    };
  }
  bounds.minX = Math.min(bounds.minX, point.x);
  bounds.minY = Math.min(bounds.minY, point.y);
  bounds.maxX = Math.max(bounds.maxX, point.x);
  bounds.maxY = Math.max(bounds.maxY, point.y);
  return bounds;
}

function angleInDirectedSweep(angle, startAngle, endAngle, clockwise = true, tolerance = 1e-12) {
  const sweep = directedSweep(startAngle, endAngle, clockwise);
  const relative = clockwise
    ? normalizeAngle(angle - startAngle)
    : normalizeAngle(startAngle - angle);
  return relative <= sweep + tolerance;
}

function circularSegmentBounds(segment) {
  let bounds = null;
  bounds = expandBounds(bounds, segment.start);
  bounds = expandBounds(bounds, segment.end);
  [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].forEach((angle) => {
    if (angleInDirectedSweep(angle, segment.startAngle, segment.endAngle, segment.clockwise)) {
      bounds = expandBounds(bounds, pointOnCircle(segment.center, segment.radius, angle));
    }
  });
  return bounds;
}

function ellipseFullBounds(segment) {
  const cosRotation = Math.cos(segment.rotation || 0);
  const sinRotation = Math.sin(segment.rotation || 0);
  const xRadius = Math.hypot(segment.radiusX * cosRotation, segment.radiusY * sinRotation);
  const yRadius = Math.hypot(segment.radiusX * sinRotation, segment.radiusY * cosRotation);
  return {
    minX: segment.center.x - xRadius,
    minY: segment.center.y - yRadius,
    maxX: segment.center.x + xRadius,
    maxY: segment.center.y + yRadius,
  };
}

function mergeBounds(first, second) {
  if (!first) return second ? { ...second } : null;
  if (!second) return { ...first };
  return {
    minX: Math.min(first.minX, second.minX),
    minY: Math.min(first.minY, second.minY),
    maxX: Math.max(first.maxX, second.maxX),
    maxY: Math.max(first.maxY, second.maxY),
  };
}

function segmentBounds(segment) {
  if (segment.type === 'line') return expandBounds(expandBounds(null, segment.start), segment.end);
  if (segment.type === 'arc-circle') return circularSegmentBounds(segment);
  if (segment.type === 'circle') {
    return {
      minX: segment.center.x - segment.radius,
      minY: segment.center.y - segment.radius,
      maxX: segment.center.x + segment.radius,
      maxY: segment.center.y + segment.radius,
    };
  }
  if (segment.type === 'ellipse') return ellipseFullBounds(segment);
  if (segment.type === 'arc-ellipse') return ellipseFullBounds(segment);
  return null;
}

function loopBounds(loop) {
  return loop.segments.reduce((bounds, segment) => mergeBounds(bounds, segmentBounds(segment)), null);
}

function exactProfileBounds(profile) {
  return [profile.outerLoop, ...(profile.innerLoops || [])]
    .reduce((bounds, loop) => mergeBounds(bounds, loop.bounds || loopBounds(loop)), null);
}

function segmentSignedArea(segment) {
  if (segment.type === 'line') {
    return 0.5 * (segment.start.x * segment.end.y - segment.end.x * segment.start.y);
  }
  if (segment.type === 'arc-circle') {
    const sweep = signedSweep(segment.startAngle, segment.endAngle, segment.clockwise);
    const chordPart = segment.center.x * (segment.end.y - segment.start.y) -
      segment.center.y * (segment.end.x - segment.start.x);
    return 0.5 * (chordPart + segment.radius * segment.radius * sweep);
  }
  if (segment.type === 'circle') {
    return (segment.clockwise === false ? -1 : 1) * Math.PI * segment.radius * segment.radius;
  }
  if (segment.type === 'ellipse') {
    return (segment.clockwise === false ? -1 : 1) * Math.PI * segment.radiusX * segment.radiusY;
  }
  if (segment.type === 'arc-ellipse') {
    const sweep = signedSweep(segment.startAngle, segment.endAngle, segment.clockwise);
    const chordPart = segment.center.x * (segment.end.y - segment.start.y) -
      segment.center.y * (segment.end.x - segment.start.x);
    return 0.5 * (chordPart + segment.radiusX * segment.radiusY * sweep);
  }
  return 0;
}

function loopSignedArea(loop) {
  return loop.segments.reduce((sum, segment) => sum + segmentSignedArea(segment), 0);
}

function loopOrientation(loop) {
  const area = loopSignedArea(loop);
  if (Math.abs(area) <= 1e-9) return null;
  return area > 0 ? 'ccw' : 'cw';
}

function lineSegment(start, end) {
  return { type: 'line', start, end };
}

function circularArcSegment(start, end, rawSegment) {
  const center = point3(rawSegment?.center);
  if (!center) return null;
  const startRadius = Math.hypot(start.x - center.x, start.y - center.y);
  const endRadius = Math.hypot(end.x - center.x, end.y - center.y);
  const radius = (startRadius + endRadius) * 0.5;
  if (!Number.isFinite(radius) || radius <= 1e-9 || Math.abs(startRadius - endRadius) > 1e-6) {
    return null;
  }
  return {
    type: 'arc-circle',
    center,
    radius,
    startAngle: angleOfPoint(center, start),
    endAngle: angleOfPoint(center, end),
    clockwise: rawSegment.clockwise !== false,
    start,
    end,
  };
}

function segmentStart(segment) {
  if (segment.type === 'circle' || segment.type === 'ellipse') return null;
  return segment.start || null;
}

function segmentEnd(segment) {
  if (segment.type === 'circle' || segment.type === 'ellipse') return null;
  return segment.end || null;
}

function segmentsClose(segments) {
  if (segments.length === 1 && ['circle', 'ellipse'].includes(segments[0].type)) return true;
  for (let index = 0; index < segments.length; index += 1) {
    const currentEnd = segmentEnd(segments[index]);
    const nextStart = segmentStart(segments[(index + 1) % segments.length]);
    if (!currentEnd || !nextStart || !samePoint(currentEnd, nextStart)) return false;
  }
  return true;
}

function closeCurvePieceSegments(segments, tolerance) {
  const maxDistance = Math.max(Number(tolerance) || 0, 0);
  if (!(maxDistance > 0)) return segments;
  for (let index = 0; index < segments.length; index += 1) {
    const current = segments[index];
    const next = segments[(index + 1) % segments.length];
    const currentEnd = segmentEnd(current);
    const nextStart = segmentStart(next);
    if (!currentEnd || !nextStart || samePoint(currentEnd, nextStart)) continue;
    if (!samePoint(currentEnd, nextStart, maxDistance)) return null;
    if (current.type === 'line') {
      current.end = cloneJson(nextStart);
      continue;
    }
    if (next.type === 'line') {
      next.start = cloneJson(currentEnd);
      continue;
    }
    return null;
  }
  return segments;
}

function segmentReversed(segment) {
  if (segment.type === 'line') return { ...segment, start: cloneJson(segment.end), end: cloneJson(segment.start) };
  if (segment.type === 'arc-circle' || segment.type === 'arc-ellipse') {
    return {
      ...segment,
      start: cloneJson(segment.end),
      end: cloneJson(segment.start),
      startAngle: segment.endAngle,
      endAngle: segment.startAngle,
      clockwise: segment.clockwise === false,
    };
  }
  if (segment.type === 'circle' || segment.type === 'ellipse') {
    return { ...segment, clockwise: segment.clockwise === false };
  }
  return cloneJson(segment);
}

function reversedLoop(loop) {
  const reversedSegments = loop.segments.slice().reverse().map(segmentReversed);
  return loopFromSegments(reversedSegments, loop.role);
}

function orientInnerLoop(loop, outerOrientation) {
  if (!outerOrientation || !loop.orientation || loop.orientation !== outerOrientation) return loop;
  return reversedLoop(loop);
}

function loopFromCircle(entity, options = {}) {
  const center = point3(entity.center);
  const radius = finiteNumber(entity.radius);
  if (!center || radius === null || radius <= 0) return null;
  return loopFromSegments([{
    type: 'circle',
    center,
    radius,
    normal: { x: 0, y: 0, z: 1 },
    clockwise: options.clockwise !== false,
  }], options.role || 'outer');
}

function loopFromPolyline(entity, options = {}) {
  if (entity?.type !== 'POLYLINE' || !Array.isArray(entity.vertices) || entity.vertices.length < 3) {
    return null;
  }
  const vertices = entity.vertices.map((vertex) => point3(vertex));
  if (vertices.some((vertex) => !vertex)) return null;
  const closesByEndpoint = samePoint(vertices[0], vertices[vertices.length - 1]);
  if (options.requireClosed !== false && !entity.closed && !closesByEndpoint) return null;
  const profileVertices = closesByEndpoint ? vertices.slice(0, -1) : vertices;
  const segmentCount = entity.closed ? profileVertices.length : Math.max(0, profileVertices.length - 1);
  if (segmentCount < 3) return null;
  const segments = [];
  for (let index = 0; index < segmentCount; index += 1) {
    const start = profileVertices[index];
    const end = profileVertices[(index + 1) % profileVertices.length];
    const rawSegment = entity.segments?.[index] ?? { type: 'LINE' };
    const segment = rawSegment.type === 'ARC'
      ? circularArcSegment(start, end, rawSegment)
      : lineSegment(start, end);
    if (!segment) return null;
    segments.push(segment);
  }
  return loopFromSegments(segments, options.role || 'outer');
}

function loopFromEllipse(entity, options = {}) {
  const center = point3(entity.center);
  const radiusX = finiteNumber(entity.radiusX ?? entity.majorRadius);
  const radiusY = finiteNumber(entity.radiusY ?? entity.minorRadius);
  const rotation = finiteNumber(entity.rotation) ?? 0;
  if (!center || radiusX === null || radiusY === null || radiusX <= 0 || radiusY <= 0) return null;
  const hasArc = entity.type === 'ELLIPSE_ARC' || entity.startAngle !== undefined ||
    entity.endAngle !== undefined || entity.startParameter !== undefined || entity.endParameter !== undefined;
  if (hasArc) {
    const startAngle = normalizeAngle(entity.startParameter ?? entity.startAngle ?? 0);
    const endAngle = normalizeAngle(entity.endParameter ?? entity.endAngle ?? TWO_PI);
    return loopFromSegments([{
      type: 'arc-ellipse',
      center,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      clockwise: entity.clockwise !== false,
      start: pointOnEllipse(center, radiusX, radiusY, rotation, startAngle),
      end: pointOnEllipse(center, radiusX, radiusY, rotation, endAngle),
    }], options.role || 'outer');
  }
  return loopFromSegments([{
    type: 'ellipse',
    center,
    radiusX,
    radiusY,
    rotation,
    normal: { x: 0, y: 0, z: 1 },
    clockwise: options.clockwise !== false,
  }], options.role || 'outer');
}

export function exactProfileFromCircle(entity, options = {}) {
  if (entity?.type !== 'CIRCLE') return null;
  const outerLoop = loopFromCircle(entity, { ...options, role: 'outer' });
  if (!outerLoop) return null;
  return baseProfile(entity, outerLoop.segments, options);
}

export function exactProfileFromPolyline(entity, options = {}) {
  const outerLoop = loopFromPolyline(entity, { ...options, role: 'outer' });
  if (!outerLoop) return null;
  return baseProfile(entity, outerLoop.segments, options);
}

export function exactProfileFromEllipse(entity, options = {}) {
  if (entity?.type !== 'ELLIPSE') return null;
  const outerLoop = loopFromEllipse(entity, { ...options, role: 'outer' });
  if (!outerLoop) return null;
  return baseProfile(entity, outerLoop.segments, options);
}

export function exactProfileFromOrderedEntities(orderedEntities, options = {}) {
  if (!Array.isArray(orderedEntities) || orderedEntities.length < 2) return null;
  const segments = [];
  for (const item of orderedEntities) {
    const entity = item?.entity || item;
    const reversed = Boolean(item?.reversed);
    if (entity?.type === 'LINE') {
      const sourceStart = point3(entity.start);
      const sourceEnd = point3(entity.end);
      if (!sourceStart || !sourceEnd) return null;
      segments.push(lineSegment(reversed ? sourceEnd : sourceStart, reversed ? sourceStart : sourceEnd));
      continue;
    }
    if (entity?.type === 'ARC') {
      const center = point3(entity.center);
      const radius = finiteNumber(entity.radius);
      if (!center || radius === null || radius <= 0) return null;
      const sourceStart = pointOnCircle(center, radius, entity.startAngle);
      const sourceEnd = pointOnCircle(center, radius, entity.endAngle);
      const start = reversed ? sourceEnd : sourceStart;
      const end = reversed ? sourceStart : sourceEnd;
      const segment = circularArcSegment(start, end, {
        center,
        clockwise: reversed ? entity.clockwise === false : entity.clockwise !== false,
      });
      if (!segment) return null;
      segments.push(segment);
      continue;
    }
    if (entity?.type === 'ELLIPSE_ARC') {
      const center = point3(entity.center);
      const radiusX = finiteNumber(entity.radiusX);
      const radiusY = finiteNumber(entity.radiusY);
      const rotation = finiteNumber(entity.rotation) ?? 0;
      const sourceStartAngle = normalizeAngle(entity.startParameter);
      const sourceEndAngle = normalizeAngle(entity.endParameter);
      if (!center || radiusX === null || radiusY === null || radiusX <= 0 || radiusY <= 0) return null;
      const startAngle = reversed ? sourceEndAngle : sourceStartAngle;
      const endAngle = reversed ? sourceStartAngle : sourceEndAngle;
      segments.push({
        type: 'arc-ellipse',
        center,
        radiusX,
        radiusY,
        rotation,
        startAngle,
        endAngle,
        clockwise: reversed ? entity.clockwise === false : entity.clockwise !== false,
        start: pointOnEllipse(center, radiusX, radiusY, rotation, startAngle),
        end: pointOnEllipse(center, radiusX, radiusY, rotation, endAngle),
      });
      continue;
    }
    return null;
  }
  if (!segmentsClose(segments)) return null;
  return baseProfile({
    id: options.id ?? null,
    type: 'COMPOSITE_PROFILE',
  }, segments, options);
}

function curvePieceSegment(piece) {
  const entity = piece?.entity || piece;
  const periodic = entity?.type === 'CIRCLE' || entity?.type === 'ELLIPSE';
  const rawStartParameter = Number(piece?.startParameter ?? 0);
  const rawEndParameter = Number(piece?.endParameter ?? 1);
  const startParameter = periodic
    ? rawStartParameter
    : Math.max(0, Math.min(1, rawStartParameter));
  const endParameter = periodic
    ? rawEndParameter
    : Math.max(0, Math.min(1, rawEndParameter));
  if (entity?.type === 'LINE') {
    const start = point3(entity.start);
    const end = point3(entity.end);
    if (!start || !end) return null;
    return lineSegment({
      x: start.x + (end.x - start.x) * startParameter,
      y: start.y + (end.y - start.y) * startParameter,
      z: start.z + (end.z - start.z) * startParameter,
    }, {
      x: start.x + (end.x - start.x) * endParameter,
      y: start.y + (end.y - start.y) * endParameter,
      z: start.z + (end.z - start.z) * endParameter,
    });
  }
  if (entity?.type === 'ARC') {
    const center = point3(entity.center);
    const radius = finiteNumber(entity.radius);
    if (!center || radius === null || radius <= 0) return null;
    const direction = entity.clockwise === false ? -1 : 1;
    const sweep = directedSweep(entity.startAngle, entity.endAngle, entity.clockwise !== false);
    const startAngle = normalizeAngle(entity.startAngle + direction * sweep * startParameter);
    const endAngle = normalizeAngle(entity.startAngle + direction * sweep * endParameter);
    return circularArcSegment(pointOnCircle(center, radius, startAngle), pointOnCircle(center, radius, endAngle), {
      center,
      clockwise: endParameter < startParameter ? entity.clockwise === false : entity.clockwise !== false,
    });
  }
  if (entity?.type === 'CIRCLE') {
    const center = point3(entity.center);
    const radius = finiteNumber(entity.radius);
    if (!center || radius === null || radius <= 0) return null;
    const startAngle = normalizeAngle(TWO_PI * startParameter);
    const endAngle = normalizeAngle(TWO_PI * endParameter);
    return circularArcSegment(pointOnCircle(center, radius, startAngle), pointOnCircle(center, radius, endAngle), {
      center,
      clockwise: endParameter >= startParameter,
    });
  }
  if (entity?.type === 'ELLIPSE_ARC') {
    const center = point3(entity.center);
    const radiusX = finiteNumber(entity.radiusX);
    const radiusY = finiteNumber(entity.radiusY);
    const rotation = finiteNumber(entity.rotation) ?? 0;
    if (!center || radiusX === null || radiusY === null || radiusX <= 0 || radiusY <= 0) return null;
    const sourceClockwise = entity.clockwise !== false;
    const clockwise = endParameter < startParameter ? !sourceClockwise : sourceClockwise;
    const direction = sourceClockwise ? 1 : -1;
    const sweep = directedSweep(entity.startParameter, entity.endParameter, sourceClockwise);
    const startAngle = normalizeAngle(entity.startParameter + direction * sweep * startParameter);
    const endAngle = normalizeAngle(entity.startParameter + direction * sweep * endParameter);
    return {
      type: 'arc-ellipse', center, radiusX, radiusY, rotation, startAngle, endAngle, clockwise,
      start: pointOnEllipse(center, radiusX, radiusY, rotation, startAngle),
      end: pointOnEllipse(center, radiusX, radiusY, rotation, endAngle),
    };
  }
  if (entity?.type === 'ELLIPSE') {
    const center = point3(entity.center);
    const radiusX = finiteNumber(entity.radiusX);
    const radiusY = finiteNumber(entity.radiusY);
    const rotation = finiteNumber(entity.rotation) ?? 0;
    if (!center || radiusX === null || radiusY === null || radiusX <= 0 || radiusY <= 0) return null;
    const startAngle = normalizeAngle(TWO_PI * startParameter);
    const endAngle = normalizeAngle(TWO_PI * endParameter);
    return {
      type: 'arc-ellipse', center, radiusX, radiusY, rotation, startAngle, endAngle,
      clockwise: endParameter >= startParameter,
      start: pointOnEllipse(center, radiusX, radiusY, rotation, startAngle),
      end: pointOnEllipse(center, radiusX, radiusY, rotation, endAngle),
    };
  }
  return null;
}

function mergedCurvePiece(first, second) {
  if (!first || !second || first.entity !== second.entity ||
      first.endHasSemanticJunction ||
      second.startHasSemanticJunction) {
    return null;
  }
  const firstDirection = Math.sign(
    first.endParameter - first.startParameter,
  );
  const secondDirection = Math.sign(
    second.endParameter - second.startParameter,
  );
  if (!firstDirection || firstDirection !== secondDirection) return null;
  const periodic = first.entity?.type === 'CIRCLE' ||
    first.entity?.type === 'ELLIPSE';
  let secondStart = second.startParameter;
  let secondEnd = second.endParameter;
  if (periodic) {
    const turn = Math.round(first.endParameter - secondStart);
    secondStart += turn;
    secondEnd += turn;
  }
  if (Math.abs(first.endParameter - secondStart) > 1e-10) return null;
  if (periodic &&
      Math.abs(secondEnd - first.startParameter) >= 1 - 1e-10) {
    return null;
  }
  return {
    ...first,
    endParameter: secondEnd,
    endHasSemanticJunction: second.endHasSemanticJunction,
  };
}

function mergeConsecutiveCurvePieces(pieces) {
  const merged = [];
  pieces.forEach((piece) => {
    const current = {
      ...piece,
      startParameter: Number(piece?.startParameter ?? 0),
      endParameter: Number(piece?.endParameter ?? 1),
    };
    const previous = merged[merged.length - 1];
    const combined = mergedCurvePiece(previous, current);
    if (combined) {
      merged[merged.length - 1] = combined;
      return;
    }
    merged.push(current);
  });
  if (merged.length > 1) {
    const cyclic = mergedCurvePiece(merged.at(-1), merged[0]);
    if (cyclic) {
      return [cyclic, ...merged.slice(1, -1)];
    }
  }
  return merged;
}

// Curve pieces are transient products of planar-face detection. Their source geometry stays exact.
export function exactProfileFromCurvePieces(pieces, options = {}) {
  if (!Array.isArray(pieces) || pieces.length < 2) return null;
  const segments = closeCurvePieceSegments(
    mergeConsecutiveCurvePieces(pieces).map(curvePieceSegment),
    options.tolerance,
  );
  if (!segments) return null;
  if (segments.some((segment) => !segment) || !segmentsClose(segments)) return null;
  return baseProfile({ id: options.id ?? null, type: 'COMPOSITE_PROFILE' }, segments, options);
}

export function exactProfileFromEntity(entity, options = {}) {
  if (entity?.type === 'CIRCLE') return exactProfileFromCircle(entity, options);
  if (entity?.type === 'POLYLINE') return exactProfileFromPolyline(entity, options);
  if (entity?.type === 'ELLIPSE') return exactProfileFromEllipse(entity, options);
  return null;
}

export function exactProfileWithHoles(outerProfile, innerProfiles = [], options = {}) {
  if (!validateExactProfile(outerProfile)) return null;
  const outerLoop = loopFromSegments(cloneJson(outerProfile.outerLoop?.segments || outerProfile.segments), 'outer');
  const innerLoops = innerProfiles.map((profile, index) => {
    if (!validateExactProfile(profile)) return null;
    return orientInnerLoop(
      loopFromSegments(cloneJson(profile.outerLoop?.segments || profile.segments), `inner-${index}`),
      outerLoop.orientation,
    );
  });
  if (innerLoops.some((loop) => !loop)) return null;
  return baseProfile({
    id: options.id ?? outerProfile.id ?? null,
    type: 'COMPOSITE_PROFILE',
  }, outerLoop.segments, {
    ...options,
    innerLoops,
    plane: options.plane ?? outerProfile.plane,
  });
}

function loopHasValidSegments(loop) {
  if (!loop?.closed || !Array.isArray(loop.segments) || !loop.segments.length) return false;
  if (!segmentsClose(loop.segments)) return false;
  return loop.segments.every((segment) => {
    if (segment.type === 'line') return Boolean(point3(segment.start) && point3(segment.end));
    if (segment.type === 'arc-circle') {
      return Boolean(point3(segment.center) && point3(segment.start) && point3(segment.end) &&
        finiteNumber(segment.radius) > 0 &&
        finiteNumber(segment.startAngle) !== null &&
        finiteNumber(segment.endAngle) !== null);
    }
    if (segment.type === 'circle') return Boolean(point3(segment.center) && finiteNumber(segment.radius) > 0);
    if (segment.type === 'ellipse' || segment.type === 'arc-ellipse') {
      return Boolean(point3(segment.center) &&
        finiteNumber(segment.radiusX) > 0 &&
        finiteNumber(segment.radiusY) > 0);
    }
    return false;
  });
}

export function validateExactProfile(profile, options = {}) {
  if (profile?.type !== 'exact-profile' || profile.version !== 1) return false;
  if (options.requireClosed !== false && profile.closed !== true) return false;
  const outerLoop = profile.outerLoop || {
    type: 'exact-profile-loop',
    role: 'outer',
    closed: profile.closed,
    segments: profile.segments,
  };
  if (!loopHasValidSegments(outerLoop)) return false;
  const innerLoops = Array.isArray(profile.innerLoops) ? profile.innerLoops : [];
  return innerLoops.every((loop) => loopHasValidSegments(loop) &&
    (!outerLoop.orientation || !loop.orientation || loop.orientation !== outerLoop.orientation));
}

export function cloneExactProfile(profile) {
  return cloneJson(profile);
}

function sampleLoop(loop, options = {}) {
  const segmentTarget = Math.max(4, Math.trunc(Number(options.segments) || DEFAULT_SAMPLE_SEGMENTS));
  const points = [];
  const appendPoint = (point) => {
    const cleanPoint = point3(point);
    if (!cleanPoint) return;
    if (!points.length || !samePoint(points[points.length - 1], cleanPoint)) points.push(cleanPoint);
  };
  loop.segments.forEach((segment) => {
    if (segment.type === 'line') {
      appendPoint(segment.start);
      appendPoint(segment.end);
      return;
    }
    if (segment.type === 'arc-circle') {
      const sweep = directedSweep(segment.startAngle, segment.endAngle, segment.clockwise);
      const count = Math.max(2, Math.ceil(segmentTarget * sweep / TWO_PI));
      const direction = segment.clockwise === false ? -1 : 1;
      for (let index = 0; index <= count; index += 1) {
        appendPoint(pointOnCircle(segment.center, segment.radius, segment.startAngle + direction * sweep * (index / count)));
      }
      return;
    }
    if (segment.type === 'circle') {
      for (let index = 0; index < segmentTarget; index += 1) {
        appendPoint(pointOnCircle(segment.center, segment.radius, TWO_PI * index / segmentTarget));
      }
      appendPoint(pointOnCircle(segment.center, segment.radius, 0));
      return;
    }
    if (segment.type === 'ellipse') {
      for (let index = 0; index < segmentTarget; index += 1) {
        appendPoint(pointOnEllipse(
          segment.center,
          segment.radiusX,
          segment.radiusY,
          segment.rotation || 0,
          TWO_PI * index / segmentTarget,
        ));
      }
      appendPoint(pointOnEllipse(segment.center, segment.radiusX, segment.radiusY, segment.rotation || 0, 0));
      return;
    }
    if (segment.type === 'arc-ellipse') {
      const sweep = directedSweep(segment.startAngle, segment.endAngle, segment.clockwise);
      const count = Math.max(2, Math.ceil(segmentTarget * sweep / TWO_PI));
      const direction = segment.clockwise === false ? -1 : 1;
      for (let index = 0; index <= count; index += 1) {
        appendPoint(pointOnEllipse(
          segment.center,
          segment.radiusX,
          segment.radiusY,
          segment.rotation || 0,
          segment.startAngle + direction * sweep * index / count,
        ));
      }
    }
  });
  return points;
}

export function sampleExactProfile(profile, options = {}) {
  if (!validateExactProfile(profile)) return options.structured ? { outerLoop: [], innerLoops: [] } : [];
  const sampled = {
    outerLoop: sampleLoop(profile.outerLoop || { segments: profile.segments }, options),
    innerLoops: (profile.innerLoops || []).map((loop) => sampleLoop(loop, options)),
  };
  return options.structured || sampled.innerLoops.length ? sampled : sampled.outerLoop;
}

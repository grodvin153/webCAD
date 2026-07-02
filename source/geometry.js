/*
 * webCAD - Utilidades geometricas puras
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from './config.js';

export const TWO_PI = Math.PI * 2;

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function offsetPoint(point, vector) {
  return {
    x: point.x + vector.x,
    y: point.y + vector.y,
  };
}

export function orthoPoint(start, point) {
  const deltaX = point.x - start.x;
  const deltaY = point.y - start.y;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return { x: point.x, y: start.y };
  }
  return { x: start.x, y: point.y };
}

export function entityMidpoint(entity) {
  return {
    x: (entity.start.x + entity.end.x) * 0.5,
    y: (entity.start.y + entity.end.y) * 0.5,
  };
}

export function normalizedVector(start, end) {
  const vector = { x: end.x - start.x, y: end.y - start.y };
  const length = Math.hypot(vector.x, vector.y);
  return length > SNAP_THRESHOLD
    ? { x: vector.x / length, y: vector.y / length }
    : null;
}

export function lineSegmentIntersection(first, second) {
  const firstDeltaX = first.end.x - first.start.x;
  const firstDeltaY = first.end.y - first.start.y;
  const secondDeltaX = second.end.x - second.start.x;
  const secondDeltaY = second.end.y - second.start.y;
  const denominator = firstDeltaX * secondDeltaY - firstDeltaY * secondDeltaX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = second.start.x - first.start.x;
  const startDeltaY = second.start.y - first.start.y;
  const firstFactor = (startDeltaX * secondDeltaY - startDeltaY * secondDeltaX) / denominator;
  const secondFactor = (startDeltaX * firstDeltaY - startDeltaY * firstDeltaX) / denominator;
  if (
    firstFactor < -SNAP_THRESHOLD ||
    firstFactor > 1 + SNAP_THRESHOLD ||
    secondFactor < -SNAP_THRESHOLD ||
    secondFactor > 1 + SNAP_THRESHOLD
  ) {
    return null;
  }

  return {
    x: first.start.x + firstFactor * firstDeltaX,
    y: first.start.y + firstFactor * firstDeltaY,
  };
}

export function lineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return clamp(
    ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared,
    0,
    1,
  );
}

export function rawLineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared;
}

export function pointAtLineParameter(entity, parameter) {
  return {
    x: entity.start.x + (entity.end.x - entity.start.x) * parameter,
    y: entity.start.y + (entity.end.y - entity.start.y) * parameter,
  };
}

export function closestPointOnLineSegment(entity, point) {
  return pointAtLineParameter(entity, lineParameter(entity, point));
}

export function uniqueSortedParameters(parameters) {
  const sorted = parameters
    .map((parameter) => clamp(parameter, 0, 1))
    .sort((first, second) => first - second);
  const unique = [];
  for (const parameter of sorted) {
    if (!unique.length || Math.abs(parameter - unique[unique.length - 1]) > SNAP_THRESHOLD) {
      unique.push(parameter);
    }
  }
  return unique;
}

export function normalizeAngle(angle) {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

export function angleParameter(angle) {
  return normalizeAngle(angle) / TWO_PI;
}

export function pointAtCircleAngle(entity, angle) {
  return {
    x: entity.center.x + Math.cos(angle) * entity.radius,
    y: entity.center.y + Math.sin(angle) * entity.radius,
  };
}

export function angleOfPoint(center, point) {
  return normalizeAngle(Math.atan2(point.y - center.y, point.x - center.x));
}

export function arcSweep(startAngle, endAngle) {
  return normalizeAngle(endAngle - startAngle);
}

export function directedArcSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? arcSweep(startAngle, endAngle)
    : normalizeAngle(startAngle - endAngle);
}

export function entityArcSweep(entity) {
  return directedArcSweep(entity.startAngle, entity.endAngle, entity.clockwise !== false);
}

export function angleInSweep(angle, startAngle, endAngle) {
  return normalizeAngle(angle - startAngle) <= arcSweep(startAngle, endAngle) + SNAP_THRESHOLD;
}

export function angleOnArc(angle, entity) {
  if (entity.type === 'CIRCLE') {
    return true;
  }
  return entity.clockwise === false
    ? normalizeAngle(entity.startAngle - angle) <= entityArcSweep(entity) + SNAP_THRESHOLD
    : angleInSweep(angle, entity.startAngle, entity.endAngle);
}

export function arcMidAngle(entity) {
  const direction = entity.clockwise === false ? -1 : 1;
  return normalizeAngle(entity.startAngle + direction * entityArcSweep(entity) * 0.5);
}

export function circularParameter(entity, point) {
  const angle = angleOfPoint(entity.center, point);
  if (entity.type === 'CIRCLE') {
    return angleParameter(angle);
  }

  const sweep = entityArcSweep(entity);
  if (sweep <= SNAP_THRESHOLD) {
    return 0;
  }
  const angleDistance = entity.clockwise === false
    ? normalizeAngle(entity.startAngle - angle)
    : normalizeAngle(angle - entity.startAngle);
  return clamp(angleDistance / sweep, 0, 1);
}

export function pointAtCircularParameter(entity, parameter) {
  const angle = entity.type === 'CIRCLE'
    ? parameter * TWO_PI
    : entity.startAngle + (entity.clockwise === false ? -1 : 1) * entityArcSweep(entity) * parameter;
  return pointAtCircleAngle(entity, angle);
}

export function perpendicularFootOnSegment(origin, entity) {
  if (!origin) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return null;
  }

  const factor = (
    (origin.x - entity.start.x) * segmentX +
    (origin.y - entity.start.y) * segmentY
  ) / lengthSquared;
  if (factor < -SNAP_THRESHOLD || factor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  const clampedFactor = clamp(factor, 0, 1);
  return {
    x: entity.start.x + clampedFactor * segmentX,
    y: entity.start.y + clampedFactor * segmentY,
  };
}

export function infiniteLineSegmentIntersection(axisPoint, axisDirection, entity) {
  if (!axisPoint || !axisDirection) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const denominator = axisDirection.x * segmentY - axisDirection.y * segmentX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = entity.start.x - axisPoint.x;
  const startDeltaY = entity.start.y - axisPoint.y;
  const segmentFactor = (startDeltaX * axisDirection.y - startDeltaY * axisDirection.x) / denominator;
  if (segmentFactor < -SNAP_THRESHOLD || segmentFactor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: entity.start.x + segmentFactor * segmentX,
    y: entity.start.y + segmentFactor * segmentY,
  };
}

export function infiniteLineLineIntersection(firstPoint, firstDirection, secondPoint, secondDirection) {
  if (!firstPoint || !firstDirection || !secondPoint || !secondDirection) {
    return null;
  }

  const denominator = firstDirection.x * secondDirection.y - firstDirection.y * secondDirection.x;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = secondPoint.x - firstPoint.x;
  const startDeltaY = secondPoint.y - firstPoint.y;
  const firstFactor = (startDeltaX * secondDirection.y - startDeltaY * secondDirection.x) / denominator;
  return {
    x: firstPoint.x + firstDirection.x * firstFactor,
    y: firstPoint.y + firstDirection.y * firstFactor,
  };
}

export function distancePointToInfiniteLine(point, linePoint, direction) {
  const length = Math.hypot(direction.x, direction.y);
  if (length <= SNAP_THRESHOLD) {
    return Infinity;
  }
  return Math.abs(
    (point.x - linePoint.x) * direction.y -
    (point.y - linePoint.y) * direction.x
  ) / length;
}

export function distancePointToSegment(point, start, end) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return distance(point, start);
  }

  const projection = clamp(
    ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) / lengthSquared,
    0,
    1,
  );
  const projectedPoint = {
    x: start.x + projection * segmentX,
    y: start.y + projection * segmentY,
  };
  return distance(point, projectedPoint);
}

export function createBounds(minX, minY, maxX, maxY) {
  return { minX, minY, maxX, maxY };
}

export function mergeBounds(current, next) {
  if (!next) {
    return current;
  }
  if (!current) {
    return { ...next };
  }
  return createBounds(
    Math.min(current.minX, next.minX),
    Math.min(current.minY, next.minY),
    Math.max(current.maxX, next.maxX),
    Math.max(current.maxY, next.maxY),
  );
}

export function normalizeBoundsFromPoints(first, second) {
  return createBounds(
    Math.min(first.x, second.x),
    Math.min(first.y, second.y),
    Math.max(first.x, second.x),
    Math.max(first.y, second.y),
  );
}

export function boundsContainsBounds(container, candidate) {
  return candidate.minX >= container.minX - SNAP_THRESHOLD &&
    candidate.maxX <= container.maxX + SNAP_THRESHOLD &&
    candidate.minY >= container.minY - SNAP_THRESHOLD &&
    candidate.maxY <= container.maxY + SNAP_THRESHOLD;
}

export function boundsIntersectsBounds(first, second) {
  return first.minX <= second.maxX + SNAP_THRESHOLD &&
    first.maxX >= second.minX - SNAP_THRESHOLD &&
    first.minY <= second.maxY + SNAP_THRESHOLD &&
    first.maxY >= second.minY - SNAP_THRESHOLD;
}

export function expandBounds(bounds, padding) {
  return createBounds(
    bounds.minX - padding,
    bounds.minY - padding,
    bounds.maxX + padding,
    bounds.maxY + padding,
  );
}

export function offsetBounds(bounds, vector) {
  return createBounds(
    bounds.minX + vector.x,
    bounds.minY + vector.y,
    bounds.maxX + vector.x,
    bounds.maxY + vector.y,
  );
}

export function boundsContainsPoint(bounds, point) {
  return point.x >= bounds.minX - SNAP_THRESHOLD &&
    point.x <= bounds.maxX + SNAP_THRESHOLD &&
    point.y >= bounds.minY - SNAP_THRESHOLD &&
    point.y <= bounds.maxY + SNAP_THRESHOLD;
}

export function polygonSignedArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area * 0.5;
}

export function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const first = polygon[index];
    const second = polygon[previous];
    const intersects = (first.y > point.y) !== (second.y > point.y) &&
      point.x < (second.x - first.x) * (point.y - first.y) /
        ((second.y - first.y) || Number.EPSILON) + first.x;
    if (intersects) {
      inside = !inside;
    }
  }
  return inside;
}

export function polygonDistanceToPoint(point, polygon) {
  if (pointInPolygon(point, polygon)) {
    return 0;
  }
  let nearest = Infinity;
  for (let index = 0; index < polygon.length; index += 1) {
    nearest = Math.min(
      nearest,
      distancePointToSegment(point, polygon[index], polygon[(index + 1) % polygon.length]),
    );
  }
  return nearest;
}

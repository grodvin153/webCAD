/*
 * webCAD - Intersecciones geometricas puras
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from './config.js';
import {
  angleOfPoint,
  angleOnArc,
  clamp,
  distance,
  pointAtLineParameter,
} from './geometry.js';

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

export function isCircularEntity(entity) {
  return entity?.type === 'CIRCLE' || entity?.type === 'ARC';
}

export function pointOnCircularEntity(point, entity) {
  return entity.type === 'CIRCLE' || angleOnArc(angleOfPoint(entity.center, point), entity);
}

export function infiniteLineCircularIntersectionPoints(axisPoint, axisDirection, entity, respectArc = true) {
  if (!axisPoint || !axisDirection || !isCircularEntity(entity)) {
    return [];
  }

  const a = axisDirection.x * axisDirection.x + axisDirection.y * axisDirection.y;
  if (a <= SNAP_THRESHOLD) {
    return [];
  }

  const fromCenterX = axisPoint.x - entity.center.x;
  const fromCenterY = axisPoint.y - entity.center.y;
  const b = 2 * (fromCenterX * axisDirection.x + fromCenterY * axisDirection.y);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - entity.radius * entity.radius;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const factor = -b / (2 * a);
    return [{
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }].filter((point) => !respectArc || pointOnCircularEntity(point, entity));
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .map((factor) => ({
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }))
    .filter((point) => !respectArc || pointOnCircularEntity(point, entity));
}

export function lineCircleIntersectionPoints(line, circle) {
  const deltaX = line.end.x - line.start.x;
  const deltaY = line.end.y - line.start.y;
  const fromCenterX = line.start.x - circle.center.x;
  const fromCenterY = line.start.y - circle.center.y;
  const a = deltaX * deltaX + deltaY * deltaY;
  const b = 2 * (fromCenterX * deltaX + fromCenterY * deltaY);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - circle.radius * circle.radius;
  const discriminant = b * b - 4 * a * c;

  if (a <= SNAP_THRESHOLD || discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const parameter = -b / (2 * a);
    if (parameter < -SNAP_THRESHOLD || parameter > 1 + SNAP_THRESHOLD) {
      return [];
    }
    return [pointAtLineParameter(line, clamp(parameter, 0, 1))];
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .filter((parameter) => parameter >= -SNAP_THRESHOLD && parameter <= 1 + SNAP_THRESHOLD)
    .map((parameter) => pointAtLineParameter(line, clamp(parameter, 0, 1)));
}

export function circleCircleIntersectionPoints(first, second) {
  const centerDistance = distance(first.center, second.center);
  if (
    centerDistance <= SNAP_THRESHOLD ||
    centerDistance > first.radius + second.radius + SNAP_THRESHOLD ||
    centerDistance < Math.abs(first.radius - second.radius) - SNAP_THRESHOLD
  ) {
    return [];
  }

  const a = (
    first.radius * first.radius -
    second.radius * second.radius +
    centerDistance * centerDistance
  ) / (2 * centerDistance);
  const heightSquared = first.radius * first.radius - a * a;
  if (heightSquared < -SNAP_THRESHOLD) {
    return [];
  }

  const baseX = first.center.x + a * (second.center.x - first.center.x) / centerDistance;
  const baseY = first.center.y + a * (second.center.y - first.center.y) / centerDistance;
  if (Math.abs(heightSquared) <= SNAP_THRESHOLD) {
    return [{ x: baseX, y: baseY }];
  }

  const height = Math.sqrt(heightSquared);
  const offsetX = -(second.center.y - first.center.y) * height / centerDistance;
  const offsetY = (second.center.x - first.center.x) * height / centerDistance;
  return [
    { x: baseX + offsetX, y: baseY + offsetY },
    { x: baseX - offsetX, y: baseY - offsetY },
  ];
}

export function lineFullCircleIntersectionPoints(line, circularEntity) {
  const direction = {
    x: line.end.x - line.start.x,
    y: line.end.y - line.start.y,
  };
  return infiniteLineCircularIntersectionPoints(line.start, direction, circularEntity, false);
}

export function fullCircleBoundaryIntersectionPoints(circularEntity, boundary, primitiveEntityParts) {
  if (!isCircularEntity(circularEntity) || !boundary || boundary === circularEntity) {
    return [];
  }

  if (boundary.type === 'POLYLINE') {
    return primitiveEntityParts(boundary)
      .flatMap((part) => fullCircleBoundaryIntersectionPoints(circularEntity, part, primitiveEntityParts));
  }

  if (boundary.type === 'LINE') {
    return lineFullCircleIntersectionPoints(boundary, circularEntity);
  }

  if (isCircularEntity(boundary)) {
    return circleCircleIntersectionPoints(circularEntity, boundary);
  }

  return [];
}

export function entityIntersectionPoints(first, second, primitiveEntityParts) {
  if (first?.type === 'POLYLINE' || second?.type === 'POLYLINE') {
    const intersections = [];
    for (const firstPart of primitiveEntityParts(first)) {
      for (const secondPart of primitiveEntityParts(second)) {
        if (firstPart === first && secondPart === second) {
          continue;
        }
        intersections.push(...entityIntersectionPoints(firstPart, secondPart, primitiveEntityParts));
      }
    }
    return intersections.filter((point, index, points) =>
      points.findIndex((candidate) => distance(candidate, point) <= SNAP_THRESHOLD) === index);
  }
  if (first.type === 'LINE' && second.type === 'LINE') {
    const intersection = lineSegmentIntersection(first, second);
    return intersection ? [intersection] : [];
  }

  if (first.type === 'XLINE' && second.type === 'XLINE') {
    const intersection = infiniteLineLineIntersection(
      first.basePoint,
      first.direction,
      second.basePoint,
      second.direction,
    );
    return intersection ? [intersection] : [];
  }

  if (first.type === 'XLINE' && second.type === 'LINE') {
    const intersection = infiniteLineSegmentIntersection(first.basePoint, first.direction, second);
    return intersection ? [intersection] : [];
  }

  if (first.type === 'LINE' && second.type === 'XLINE') {
    const intersection = infiniteLineSegmentIntersection(second.basePoint, second.direction, first);
    return intersection ? [intersection] : [];
  }

  if (first.type === 'XLINE' && isCircularEntity(second)) {
    return infiniteLineCircularIntersectionPoints(first.basePoint, first.direction, second, true);
  }

  if (isCircularEntity(first) && second.type === 'XLINE') {
    return infiniteLineCircularIntersectionPoints(second.basePoint, second.direction, first, true);
  }

  if (first.type === 'LINE' && isCircularEntity(second)) {
    return lineCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, second));
  }

  if (isCircularEntity(first) && second.type === 'LINE') {
    return lineCircleIntersectionPoints(second, first)
      .filter((point) => pointOnCircularEntity(point, first));
  }

  if (isCircularEntity(first) && isCircularEntity(second)) {
    return circleCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, first) && pointOnCircularEntity(point, second));
  }

  return [];
}

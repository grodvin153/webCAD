/*
 * webCAD - Calculos de coordenadas y construccion por puntos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';
import {
  angleInSweep,
  angleOfPoint,
  distance,
  pointAtCircleAngle,
} from '../geometry.js';
import { parsePartialRelativeCoordinateInput, parseRelativeCoordinateInput } from './entry.js';

export function snap(value, step) {
  return Math.round(value / step) * step;
}

export function snapPoint(point, step) {
  return {
    x: snap(point.x, step),
    y: snap(point.y, step),
  };
}


export function pointFromRelativeCoordinates(origin, value) {
  const relative = parseRelativeCoordinateInput(value);
  return relative && origin
    ? { x: origin.x + relative.x, y: origin.y - relative.y }
    : null;
}

export function pointFromPartialRelativeCoordinates(origin, cursor, value) {
  const relative = parsePartialRelativeCoordinateInput(value);
  if (!relative || !origin || !cursor) return null;
  return {
    x: relative.x === null ? cursor.x : origin.x + relative.x,
    y: relative.y === null ? cursor.y : origin.y - relative.y,
  };
}


export function pointFromDistance(start, directionPoint, distanceValue) {
  const deltaX = directionPoint.x - start.x;
  const deltaY = directionPoint.y - start.y;
  const directionLength = Math.hypot(deltaX, deltaY);
  if (directionLength <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: start.x + (deltaX / directionLength) * distanceValue,
    y: start.y + (deltaY / directionLength) * distanceValue,
  };
}

export function circleFromThreePoints(first, second, third) {
  const determinant = 2 * (
    first.x * (second.y - third.y) +
    second.x * (third.y - first.y) +
    third.x * (first.y - second.y)
  );

  if (Math.abs(determinant) <= SNAP_THRESHOLD) {
    return null;
  }

  const firstSquared = first.x * first.x + first.y * first.y;
  const secondSquared = second.x * second.x + second.y * second.y;
  const thirdSquared = third.x * third.x + third.y * third.y;
  const center = {
    x: (
      firstSquared * (second.y - third.y) +
      secondSquared * (third.y - first.y) +
      thirdSquared * (first.y - second.y)
    ) / determinant,
    y: (
      firstSquared * (third.x - second.x) +
      secondSquared * (first.x - third.x) +
      thirdSquared * (second.x - first.x)
    ) / determinant,
  };
  const radius = distance(center, first);

  if (!Number.isFinite(radius) || radius <= SNAP_THRESHOLD) {
    return null;
  }

  return { center, radius };
}

export function arcFromThreePoints(start, mid, end) {
  const circle = circleFromThreePoints(start, mid, end);
  if (!circle) {
    return null;
  }

  const startAngle = angleOfPoint(circle.center, start);
  const midAngle = angleOfPoint(circle.center, mid);
  const endAngle = angleOfPoint(circle.center, end);
  if (angleInSweep(midAngle, startAngle, endAngle)) {
    return { ...circle, startAngle, endAngle };
  }

  return { ...circle, startAngle: endAngle, endAngle: startAngle };
}

export function arcFromCenterStartEnd(center, startPoint, endPoint) {
  const radius = distance(center, startPoint);
  if (radius <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    center,
    radius,
    startAngle: angleOfPoint(center, startPoint),
    endAngle: angleOfPoint(center, endPoint),
  };
}

export function pointOnRadiusFromAngle(center, radius, anglePoint) {
  const angle = angleOfPoint(center, anglePoint);
  return pointAtCircleAngle({ center, radius }, angle);
}

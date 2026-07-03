/*
 * webCAD - Movimiento de pinzamientos de sombreado
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../../config.js';
import {
  angleInSweep,
  angleOfPoint,
  distance,
  normalizeAngle,
  pointAtCircleAngle,
} from '../../geometry.js';
import { circleFromThreePoints } from '../../input/coordinates.js';

function reshapeHatchArcGroup(entity, group, movedIndex, targetPoint) {
  const indices = group.indices;
  const movedPosition = indices.indexOf(movedIndex);
  if (indices.length < 3 || movedPosition < 0) return false;
  const endPosition = indices.length - 1;
  const passPosition = movedPosition > 0 && movedPosition < endPosition
    ? movedPosition
    : Math.floor(endPosition * 0.5);
  if (passPosition <= 0 || passPosition >= endPosition) return false;
  const startPoint = movedPosition === 0 ? targetPoint : entity.boundary[indices[0]];
  const passPoint = movedPosition === passPosition ? targetPoint : entity.boundary[indices[passPosition]];
  const endPoint = movedPosition === endPosition ? targetPoint : entity.boundary[indices[endPosition]];
  const circle = circleFromThreePoints(startPoint, passPoint, endPoint);
  if (!circle) return false;
  const startAngle = angleOfPoint(circle.center, startPoint);
  const passAngle = angleOfPoint(circle.center, passPoint);
  const endAngle = angleOfPoint(circle.center, endPoint);
  const positiveTraversal = angleInSweep(passAngle, startAngle, endAngle);
  const firstSweep = positiveTraversal
    ? normalizeAngle(passAngle - startAngle)
    : -normalizeAngle(startAngle - passAngle);
  const secondSweep = positiveTraversal
    ? normalizeAngle(endAngle - passAngle)
    : -normalizeAngle(passAngle - endAngle);
  indices.forEach((boundaryIndex, position) => {
    const angle = position <= passPosition
      ? startAngle + firstSweep * position / passPosition
      : passAngle + secondSweep * (position - passPosition) / (endPosition - passPosition);
    const point = pointAtCircleAngle(circle, angle);
    entity.boundary[boundaryIndex].x = point.x;
    entity.boundary[boundaryIndex].y = point.y;
  });
  return true;
}

function resizeHatchCircleGroup(entity, group, targetPoint) {
  const indices = [...new Set(group.indices)];
  if (indices.length < 3) return false;
  const center = indices.reduce((sum, index) => ({
    x: sum.x + entity.boundary[index].x / indices.length,
    y: sum.y + entity.boundary[index].y / indices.length,
  }), { x: 0, y: 0 });
  const radius = distance(center, targetPoint);
  if (radius <= SNAP_THRESHOLD) return false;
  const angles = indices.map((index) => angleOfPoint(center, entity.boundary[index]));
  indices.forEach((boundaryIndex, position) => {
    const point = {
      x: center.x + Math.cos(angles[position]) * radius,
      y: center.y + Math.sin(angles[position]) * radius,
    };
    entity.boundary[boundaryIndex].x = point.x;
    entity.boundary[boundaryIndex].y = point.y;
  });
  return true;
}

export function moveHatchGrip(entity, index, targetPoint) {
  const curveGroups = entity.curveGroups.filter((group) => group.indices.includes(index));
  let reshaped = false;
  for (const group of curveGroups) {
    if (group.type === 'ARC') {
      reshaped = reshapeHatchArcGroup(entity, group, index, targetPoint) || reshaped;
    }
    else if (group.type === 'CIRCLE') {
      reshaped = resizeHatchCircleGroup(entity, group, targetPoint) || reshaped;
    }
  }
  if (!reshaped) {
    entity.boundary[index].x = targetPoint.x;
    entity.boundary[index].y = targetPoint.y;
  }
  return true;
}

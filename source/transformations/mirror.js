/*
 * webCAD - Simetria de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';
import { coordinateZ } from '../coordinates/point3.js';
import { angleOfPoint, normalizeAngle, normalizedVector } from '../geometry.js';

export function dotProduct(first, second) {
  return first.x * second.x + first.y * second.y;
}


export function mirrorPointAcrossAxis(point, firstPoint, secondPoint) {
  const axis = normalizedVector(firstPoint, secondPoint);
  if (!axis) {
    return null;
  }
  const delta = { x: point.x - firstPoint.x, y: point.y - firstPoint.y };
  const projection = dotProduct(delta, axis);
  const foot = {
    x: firstPoint.x + axis.x * projection,
    y: firstPoint.y + axis.y * projection,
  };
  return { x: foot.x * 2 - point.x, y: foot.y * 2 - point.y, z: coordinateZ(point) };
}

export function mirrorAngleAcrossAxis(angle, firstPoint, secondPoint) {
  const origin = mirrorPointAcrossAxis({ x: 0, y: 0 }, firstPoint, secondPoint);
  const directionPoint = mirrorPointAcrossAxis(
    { x: Math.cos(angle), y: Math.sin(angle) },
    firstPoint,
    secondPoint,
  );
  return origin && directionPoint ? angleOfPoint(origin, directionPoint) : angle;
}

export function mirrorEntityAcrossAxis(entity, firstPoint, secondPoint) {
  const mirrorPoint = (point) => mirrorPointAcrossAxis(point, firstPoint, secondPoint);
  if (!mirrorPoint(firstPoint)) {
    return false;
  }
  if (entity.type === 'LINE') {
    entity.start = mirrorPoint(entity.start);
    entity.end = mirrorPoint(entity.end);
  }
  else if (entity.type === 'XLINE') {
    const directionPoint = {
      x: entity.basePoint.x + entity.direction.x,
      y: entity.basePoint.y + entity.direction.y,
      z: entity.basePoint.z + entity.direction.z,
    };
    entity.basePoint = mirrorPoint(entity.basePoint);
    const mirroredDirectionPoint = mirrorPoint(directionPoint);
    entity.direction = normalizedVector(entity.basePoint, mirroredDirectionPoint);
  }
  else if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = mirrorPoint(entity.center);
    if (entity.type === 'ARC') {
      entity.startAngle = mirrorAngleAcrossAxis(entity.startAngle, firstPoint, secondPoint);
      entity.endAngle = mirrorAngleAcrossAxis(entity.endAngle, firstPoint, secondPoint);
      entity.clockwise = entity.clockwise === false;
    }
  }
  else if (entity.type === 'ELLIPSE' || entity.type === 'ELLIPSE_ARC') {
    const directionPoint = {
      x: entity.center.x + Math.cos(entity.rotation),
      y: entity.center.y + Math.sin(entity.rotation),
      z: entity.center.z,
    };
    entity.center = mirrorPoint(entity.center);
    const mirroredDirection = mirrorPoint(directionPoint);
    entity.rotation = angleOfPoint(entity.center, mirroredDirection);
    if (entity.type === 'ELLIPSE_ARC') {
      entity.startParameter = normalizeAngle(-entity.startParameter);
      entity.endParameter = normalizeAngle(-entity.endParameter);
      entity.clockwise = entity.clockwise === false;
    }
  }
  else if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map(mirrorPoint);
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = mirrorPoint(segment.center);
        segment.clockwise = segment.clockwise === false;
      }
    });
  }
  else if (entity.type === 'TEXT') {
    const angle = -entity.angle * Math.PI / 180;
    entity.insertionPoint = mirrorPoint(entity.insertionPoint);
    const mirroredAngle = mirrorAngleAcrossAxis(angle, firstPoint, secondPoint);
    entity.angle = -mirroredAngle * 180 / Math.PI;
  }
  else if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) => loop.map(mirrorPoint));
    entity.boundary = entity.loops[0];
  }
  else if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map(mirrorPoint);
    entity.placement = mirrorPoint(entity.placement);
    if (entity.textPosition) {
      entity.textPosition = mirrorPoint(entity.textPosition);
    }
    if (entity.kind === 'horizontal' || entity.kind === 'vertical') {
      const direction = normalizedVector(entity.points[0], entity.points[1]);
      entity.kind = Math.abs(direction?.x || 0) <= SNAP_THRESHOLD
        ? 'vertical'
        : Math.abs(direction?.y || 0) <= SNAP_THRESHOLD ? 'horizontal' : 'aligned';
    }
  }
  else if (entity.type === 'INSERT') {
    const oldInsertion = { ...entity.insertionPoint };
    const angle = -entity.rotation * Math.PI / 180;
    const oldXAxis = {
      x: oldInsertion.x + Math.cos(angle),
      y: oldInsertion.y + Math.sin(angle),
      z: oldInsertion.z,
    };
    entity.insertionPoint = mirrorPoint(oldInsertion);
    const mirroredXAxis = mirrorPoint(oldXAxis);
    entity.rotation = -angleOfPoint(entity.insertionPoint, mirroredXAxis) * 180 / Math.PI;
    entity.scaleY *= -1;
  }
  else if (entity.type === 'IMAGE') {
    const oldCenter = { ...entity.center };
    const angle = entity.rotation * Math.PI / 180;
    const oldXAxis = {
      x: oldCenter.x + Math.cos(angle),
      y: oldCenter.y + Math.sin(angle),
      z: oldCenter.z,
    };
    entity.center = mirrorPoint(oldCenter);
    const mirroredXAxis = mirrorPoint(oldXAxis);
    entity.rotation = angleOfPoint(entity.center, mirroredXAxis) * 180 / Math.PI;
    entity.flipY = !entity.flipY;
  }
  else {
    return false;
  }
  return true;
}

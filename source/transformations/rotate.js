/*
 * webCAD - Giro de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';
import { distance, normalizeAngle } from '../geometry.js';

export function rotatePointAround(point, basePoint, angleDegrees) {
  const angle = -angleDegrees * Math.PI / 180;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const deltaX = point.x - basePoint.x;
  const deltaY = point.y - basePoint.y;
  return {
    x: basePoint.x + deltaX * cosine - deltaY * sine,
    y: basePoint.y + deltaX * sine + deltaY * cosine,
  };
}

export function rotateEntityByAngle(entity, basePoint, angleDegrees) {
  if (entity.type === 'LINE') {
    entity.start = rotatePointAround(entity.start, basePoint, angleDegrees);
    entity.end = rotatePointAround(entity.end, basePoint, angleDegrees);
    return true;
  }

  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = rotatePointAround(entity.center, basePoint, angleDegrees);
    if (entity.type === 'ARC') {
      const canvasAngle = -angleDegrees * Math.PI / 180;
      entity.startAngle = normalizeAngle(entity.startAngle + canvasAngle);
      entity.endAngle = normalizeAngle(entity.endAngle + canvasAngle);
    }
    return true;
  }

  if (entity.type === 'TEXT') {
    entity.insertionPoint = rotatePointAround(entity.insertionPoint, basePoint, angleDegrees);
    entity.angle += angleDegrees;
    return true;
  }
  if (entity.type === 'IMAGE') {
    entity.center = rotatePointAround(entity.center, basePoint, angleDegrees);
    entity.rotation += angleDegrees;
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) => loop.map((point) =>
      rotatePointAround(point, basePoint, angleDegrees)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => rotatePointAround(point, basePoint, angleDegrees));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = rotatePointAround(segment.center, basePoint, angleDegrees);
      }
    });
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => rotatePointAround(point, basePoint, angleDegrees));
    entity.placement = rotatePointAround(entity.placement, basePoint, angleDegrees);
    if (entity.textPosition) {
      entity.textPosition = rotatePointAround(entity.textPosition, basePoint, angleDegrees);
    }
    if (entity.kind === 'horizontal' || entity.kind === 'vertical') {
      entity.kind = 'aligned';
    }
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = rotatePointAround(entity.insertionPoint, basePoint, angleDegrees);
    entity.rotation += angleDegrees;
    return true;
  }

  return false;
}

export function rotationAngleFromPoint(basePoint, point, orthoEnabled = false) {
  if (!basePoint || !point || distance(basePoint, point) <= SNAP_THRESHOLD) {
    return 0;
  }
  const angle = -Math.atan2(point.y - basePoint.y, point.x - basePoint.x) * 180 / Math.PI;
  return orthoEnabled ? Math.round(angle / 90) * 90 : angle;
}

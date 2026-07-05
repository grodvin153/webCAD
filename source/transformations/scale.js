/*
 * webCAD - Escala de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { moveEntityByVector } from './move.js';

export function scalePointFromOrigin(point, scaleX, scaleY) {
  return { x: point.x * scaleX, y: point.y * scaleY };
}

export function scaleEntityByFactors(entity, scaleX, scaleY) {
  const uniformScale = (Math.abs(scaleX) + Math.abs(scaleY)) * 0.5;
  if (entity.type === 'LINE') {
    entity.start = scalePointFromOrigin(entity.start, scaleX, scaleY);
    entity.end = scalePointFromOrigin(entity.end, scaleX, scaleY);
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => scalePointFromOrigin(point, scaleX, scaleY));
    entity.placement = scalePointFromOrigin(entity.placement, scaleX, scaleY);
    if (entity.textPosition) {
      entity.textPosition = scalePointFromOrigin(entity.textPosition, scaleX, scaleY);
    }
    return true;
  }
  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = scalePointFromOrigin(entity.center, scaleX, scaleY);
    entity.radius *= uniformScale;
    return true;
  }
  if (entity.type === 'TEXT') {
    entity.insertionPoint = scalePointFromOrigin(entity.insertionPoint, scaleX, scaleY);
    entity.height *= uniformScale;
    return true;
  }
  if (entity.type === 'IMAGE') {
    entity.center = scalePointFromOrigin(entity.center, scaleX, scaleY);
    entity.width *= Math.abs(scaleX);
    entity.height *= Math.abs(scaleY);
    entity.flipX = Boolean(entity.flipX) !== (scaleX < 0);
    entity.flipY = Boolean(entity.flipY) !== (scaleY < 0);
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) =>
      loop.map((point) => scalePointFromOrigin(point, scaleX, scaleY)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => scalePointFromOrigin(point, scaleX, scaleY));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = scalePointFromOrigin(segment.center, scaleX, scaleY);
      }
      segment.startWidth *= uniformScale;
      segment.endWidth *= uniformScale;
    });
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = scalePointFromOrigin(entity.insertionPoint, scaleX, scaleY);
    entity.scaleX *= scaleX;
    entity.scaleY *= scaleY;
    return true;
  }
  return false;
}

export function scaleEntityAroundPoint(entity, basePoint, factor) {
  if (!entity || !basePoint || !Number.isFinite(factor) || factor <= 0) {
    return false;
  }
  const toOrigin = { x: -basePoint.x, y: -basePoint.y };
  if (!moveEntityByVector(entity, toOrigin)) {
    return false;
  }
  if (!scaleEntityByFactors(entity, factor, factor)) {
    moveEntityByVector(entity, basePoint);
    return false;
  }
  moveEntityByVector(entity, basePoint);
  return true;
}

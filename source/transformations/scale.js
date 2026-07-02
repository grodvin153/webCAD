/*
 * webCAD - Escala de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

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

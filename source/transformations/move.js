/*
 * webCAD - Desplazamiento de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { offsetPoint } from '../geometry.js';

export function moveEntityByVector(entity, vector) {
  if (entity.type === 'LINE') {
    entity.start = offsetPoint(entity.start, vector);
    entity.end = offsetPoint(entity.end, vector);
    return true;
  }
  if (entity.type === 'XLINE') {
    entity.basePoint = offsetPoint(entity.basePoint, vector);
    return true;
  }

  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = offsetPoint(entity.center, vector);
    return true;
  }

  if (entity.type === 'TEXT') {
    entity.insertionPoint = offsetPoint(entity.insertionPoint, vector);
    return true;
  }
  if (entity.type === 'IMAGE') {
    entity.center = offsetPoint(entity.center, vector);
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) =>
      loop.map((point) => offsetPoint(point, vector)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => offsetPoint(point, vector));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = offsetPoint(segment.center, vector);
      }
    });
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => offsetPoint(point, vector));
    entity.placement = offsetPoint(entity.placement, vector);
    if (entity.textPosition) {
      entity.textPosition = offsetPoint(entity.textPosition, vector);
    }
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = offsetPoint(entity.insertionPoint, vector);
    return true;
  }

  return false;
}

/*
 * webCAD - Utilidades geometricas puras
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

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

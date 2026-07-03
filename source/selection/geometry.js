/*
 * webCAD - Geometria basica de seleccion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';

export function projectPointToLine(point, linePoint, direction) {
  const lengthSquared = direction.x * direction.x + direction.y * direction.y;
  if (lengthSquared <= SNAP_THRESHOLD) return { ...point };
  const factor = (
    (point.x - linePoint.x) * direction.x +
    (point.y - linePoint.y) * direction.y
  ) / lengthSquared;
  return {
    x: linePoint.x + factor * direction.x,
    y: linePoint.y + factor * direction.y,
  };
}

export function selectionWindowMode(selectionWindow) {
  return selectionWindow.currentWorld.x >= selectionWindow.startWorld.x ? 'window' : 'capture';
}

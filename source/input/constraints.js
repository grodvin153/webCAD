/* webCAD - Restricciones de entrada y ghosts por teclado | SPDX-License-Identifier: GPL-3.0-or-later */

import { parseDistanceInput } from './entry.js';
import { coordinateZ } from '../coordinates/point3.js';
import {
  pointFromDistance,
  pointFromPartialRelativeCoordinates,
  pointFromRelativeCoordinates,
} from './coordinates.js';

export function keyboardCoordinateTarget(origin, cursor, value) {
  return pointFromRelativeCoordinates(origin, value) ||
    pointFromPartialRelativeCoordinates(origin, cursor, value);
}

export function keyboardPointTarget(origin, cursor, value) {
  const coordinateTarget = keyboardCoordinateTarget(origin, cursor, value);
  if (coordinateTarget) return coordinateTarget;
  const inputDistance = parseDistanceInput(value);
  return inputDistance !== null && origin && cursor
    ? pointFromDistance(origin, cursor, inputDistance)
    : null;
}

export function rectangleTargetPoint(draft, cursor, value = '') {
  if (!draft?.firstPoint || !cursor) return null;
  const keyboardTarget = keyboardCoordinateTarget(draft.firstPoint, cursor, value);
  if (keyboardTarget) return keyboardTarget;
  if (Number.isFinite(draft.fixedWidth)) {
    const direction = cursor.x < draft.firstPoint.x ? -1 : 1;
    return {
      x: draft.firstPoint.x + direction * draft.fixedWidth,
      y: cursor.y,
      z: coordinateZ(cursor, coordinateZ(draft.firstPoint)),
    };
  }
  const inputDistance = parseDistanceInput(value);
  return inputDistance !== null
    ? pointFromDistance(draft.firstPoint, cursor, inputDistance) || cursor
    : cursor;
}

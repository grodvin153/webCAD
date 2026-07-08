/* webCAD - Tangentes desde un punto a una curva circular | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../../config.js';
import { distance, distancePointToSegment } from '../../geometry.js';
import { isCircularEntity, pointOnCircularEntity } from '../../intersections.js';

export function pointTangentSolutions(startPoint, operand) {
  const curve = operand?.primitive;
  if (!startPoint || !isCircularEntity(curve)) return [];

  const centerDistance = distance(startPoint, curve.center);
  if (centerDistance <= curve.radius + SNAP_THRESHOLD) return [];

  const centerAngle = Math.atan2(
    startPoint.y - curve.center.y,
    startPoint.x - curve.center.x,
  );
  const tangentOffset = Math.acos(curve.radius / centerDistance);

  return [-1, 1]
    .map((side) => {
      const angle = centerAngle + tangentOffset * side;
      return {
        start: { ...startPoint },
        end: {
          x: curve.center.x + Math.cos(angle) * curve.radius,
          y: curve.center.y + Math.sin(angle) * curve.radius,
        },
      };
    })
    .filter((solution) => pointOnCircularEntity(solution.end, curve));
}

export function bestPointTangentSolution(solutions, cursorPoint) {
  if (!cursorPoint) return solutions[0] || null;
  return [...solutions].sort((first, second) => {
    const firstScore = distance(first.end, cursorPoint) +
      distancePointToSegment(cursorPoint, first.start, first.end) * 0.2;
    const secondScore = distance(second.end, cursorPoint) +
      distancePointToSegment(cursorPoint, second.start, second.end) * 0.2;
    return firstScore - secondScore;
  })[0] || null;
}

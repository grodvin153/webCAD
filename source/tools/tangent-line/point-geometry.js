/* webCAD - Tangentes desde un punto a una curva circular | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../../config.js';
import { distance, distancePointToSegment } from '../../geometry.js';
import { isCircularEntity, pointOnCircularEntity } from '../../intersections.js';
import {
  ellipseParameterOnEntity,
  ellipsePoint,
  isEllipseEntity,
} from '../../ellipse/geometry.js';

function normalizedEllipsePoint(entity, point) {
  const cosine = Math.cos(entity.rotation);
  const sine = Math.sin(entity.rotation);
  const deltaX = point.x - entity.center.x;
  const deltaY = point.y - entity.center.y;
  return {
    x: (deltaX * cosine + deltaY * sine) / entity.radiusX,
    y: (-deltaX * sine + deltaY * cosine) / entity.radiusY,
  };
}

function ellipseTangentParameters(startPoint, ellipse) {
  const local = normalizedEllipsePoint(ellipse, startPoint);
  const normalizedDistance = Math.hypot(local.x, local.y);
  if (normalizedDistance <= 1 + SNAP_THRESHOLD) return [];

  // In the ellipse local system, its tangent at t is x cos(t) + y sin(t) = 1.
  // This keeps the contact parameters exact, including rotated ellipses.
  const direction = Math.atan2(local.y, local.x);
  const offset = Math.acos(1 / normalizedDistance);
  return [direction - offset, direction + offset]
    .map((parameter) => ((parameter % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2))
    .filter((parameter) => ellipseParameterOnEntity(parameter, ellipse));
}

export function pointTangentSolutions(startPoint, operand) {
  const curve = operand?.primitive;
  if (!startPoint) return [];

  if (isEllipseEntity(curve)) {
    return ellipseTangentParameters(startPoint, curve).map((parameter) => ({
      start: { ...startPoint },
      end: ellipsePoint(curve, parameter),
    }));
  }
  if (!isCircularEntity(curve)) return [];

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

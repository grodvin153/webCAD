/*
 * webCAD - Geometria de linea tangente a dos objetos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../../config.js';
import { distance, distancePointToSegment } from '../../geometry.js';
import { isCircularEntity, pointOnCircularEntity } from '../../intersections.js';

function samePoint(first, second) {
  return distance(first, second) <= SNAP_THRESHOLD;
}

export function circularTangentOperand(entity, pickPoint, operandAt) {
  const operand = operandAt(entity, pickPoint);
  return operand && isCircularEntity(operand.primitive) ? operand : null;
}

export function commonTangentSolutions(firstOperand, secondOperand) {
  const first = firstOperand?.primitive;
  const second = secondOperand?.primitive;
  if (!isCircularEntity(first) || !isCircularEntity(second)) return [];
  if (
    firstOperand.entity === secondOperand.entity &&
    firstOperand.segmentIndex === secondOperand.segmentIndex
  ) {
    return [];
  }

  const delta = {
    x: second.center.x - first.center.x,
    y: second.center.y - first.center.y,
  };
  const centerDistanceSquared = delta.x * delta.x + delta.y * delta.y;
  if (centerDistanceSquared <= SNAP_THRESHOLD * SNAP_THRESHOLD) return [];

  const solutions = [];
  for (const orientation of [-1, 1]) {
    const radiusDelta = first.radius - second.radius * orientation;
    const heightSquared = centerDistanceSquared - radiusDelta * radiusDelta;
    if (heightSquared < -SNAP_THRESHOLD) continue;
    const height = Math.sqrt(Math.max(0, heightSquared));
    for (const side of [-1, 1]) {
      const normal = {
        x: (
          delta.x * radiusDelta - delta.y * height * side
        ) / centerDistanceSquared,
        y: (
          delta.y * radiusDelta + delta.x * height * side
        ) / centerDistanceSquared,
      };
      const firstPoint = {
        x: first.center.x + normal.x * first.radius,
        y: first.center.y + normal.y * first.radius,
      };
      const secondPoint = {
        x: second.center.x + normal.x * second.radius * orientation,
        y: second.center.y + normal.y * second.radius * orientation,
      };
      if (
        samePoint(firstPoint, secondPoint) ||
        !pointOnCircularEntity(firstPoint, first) ||
        !pointOnCircularEntity(secondPoint, second)
      ) {
        continue;
      }
      if (solutions.some((solution) =>
        samePoint(solution.start, firstPoint) && samePoint(solution.end, secondPoint))) {
        continue;
      }
      solutions.push({
        start: firstPoint,
        end: secondPoint,
        kind: orientation === 1 ? 'external' : 'internal',
      });
    }
  }
  return solutions;
}

export function bestTangentSolution(solutions, firstPickPoint, cursorPoint) {
  return [...solutions].sort((first, second) => {
    const firstScore = distance(first.start, firstPickPoint) * 0.45 +
      distance(first.end, cursorPoint) + distancePointToSegment(cursorPoint, first.start, first.end) * 0.2;
    const secondScore = distance(second.start, firstPickPoint) * 0.45 +
      distance(second.end, cursorPoint) + distancePointToSegment(cursorPoint, second.start, second.end) * 0.2;
    return firstScore - secondScore;
  })[0] || null;
}

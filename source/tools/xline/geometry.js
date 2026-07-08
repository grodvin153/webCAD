/* webCAD - Geometria de lineas infinitas | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../../config.js';

export function xlineDirection(firstPoint, secondPoint) {
  if (!firstPoint || !secondPoint) return null;
  const x = secondPoint.x - firstPoint.x;
  const y = secondPoint.y - firstPoint.y;
  const length = Math.hypot(x, y);
  return length <= SNAP_THRESHOLD ? null : { x: x / length, y: y / length };
}

export function clipXLineToBounds(basePoint, direction, bounds) {
  if (!basePoint || !direction || !bounds) return null;
  const candidates = [];
  const addAt = (factor) => {
    if (!Number.isFinite(factor)) return;
    const point = {
      x: basePoint.x + direction.x * factor,
      y: basePoint.y + direction.y * factor,
    };
    if (
      point.x >= bounds.minX - SNAP_THRESHOLD && point.x <= bounds.maxX + SNAP_THRESHOLD &&
      point.y >= bounds.minY - SNAP_THRESHOLD && point.y <= bounds.maxY + SNAP_THRESHOLD
    ) candidates.push(point);
  };
  if (Math.abs(direction.x) > SNAP_THRESHOLD) {
    addAt((bounds.minX - basePoint.x) / direction.x);
    addAt((bounds.maxX - basePoint.x) / direction.x);
  }
  if (Math.abs(direction.y) > SNAP_THRESHOLD) {
    addAt((bounds.minY - basePoint.y) / direction.y);
    addAt((bounds.maxY - basePoint.y) / direction.y);
  }
  const unique = candidates.filter((point, index, points) =>
    points.findIndex((candidate) => Math.hypot(candidate.x - point.x, candidate.y - point.y) <= SNAP_THRESHOLD) === index);
  if (unique.length < 2) return null;
  let best = [unique[0], unique[1]];
  let bestDistance = 0;
  for (let first = 0; first < unique.length - 1; first += 1) {
    for (let second = first + 1; second < unique.length; second += 1) {
      const candidateDistance = Math.hypot(
        unique[second].x - unique[first].x,
        unique[second].y - unique[first].y,
      );
      if (candidateDistance > bestDistance) {
        best = [unique[first], unique[second]];
        bestDistance = candidateDistance;
      }
    }
  }
  return { start: best[0], end: best[1] };
}

export function xlineIntersectsBounds(entity, bounds) {
  return Boolean(entity?.type === 'XLINE' && clipXLineToBounds(entity.basePoint, entity.direction, bounds));
}

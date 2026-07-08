/*
 * webCAD - Movimiento de pinzamientos de cotas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { distance, normalizedVector, offsetPoint } from '../../geometry.js';
import { coordinateZ, point3 } from '../../coordinates/point3.js';

export function createDimensionGripMovement({
  dimensionBaseGripPoints,
  dimensionPlacementGripPoint,
  dimensionStyleMetrics,
  naturalDimensionTextNormal,
}) {
  function moveDimensionGrip(entity, key, targetPoint) {
    if (key === 'text') {
      if (entity.kind === 'radius' || entity.kind === 'diameter') {
        const metrics = dimensionStyleMetrics(entity.dimensionStyle);
        const textOffset = metrics.textGap + metrics.textHeight * 0.55;
        let placement = point3(targetPoint, coordinateZ(entity.placement));
        for (let iteration = 0; iteration < 3; iteration += 1) {
          const direction = normalizedVector(entity.points[0], placement) ||
            normalizedVector(entity.points[0], entity.placement) ||
            normalizedVector(entity.points[0], entity.points[1]) ||
            { x: 1, y: 0 };
          let textAngle = Math.atan2(direction.y, direction.x);
          if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) textAngle += Math.PI;
          const normal = naturalDimensionTextNormal(textAngle);
          placement = {
            x: targetPoint.x - normal.x * textOffset,
            y: targetPoint.y - normal.y * textOffset,
            z: coordinateZ(entity.placement),
          };
        }
        entity.placement = placement;
        entity.textPosition = null;
        return true;
      }
      entity.textPosition = point3(targetPoint, coordinateZ(entity.textPosition, coordinateZ(entity.placement)));
      return true;
    }
    if (key === 'placement') {
      const currentPlacement = dimensionPlacementGripPoint(entity);
      let nextPlacement = point3(targetPoint, coordinateZ(entity.placement));
      if (entity.kind === 'horizontal') nextPlacement = { x: entity.placement.x, y: targetPoint.y, z: coordinateZ(entity.placement) };
      else if (entity.kind === 'vertical') nextPlacement = { x: targetPoint.x, y: entity.placement.y, z: coordinateZ(entity.placement) };
      else if (entity.kind === 'aligned') {
        const direction = normalizedVector(entity.points[0], entity.points[1]);
        if (direction) {
          const normal = { x: -direction.y, y: direction.x };
          const offset = (targetPoint.x - entity.points[0].x) * normal.x +
            (targetPoint.y - entity.points[0].y) * normal.y;
          nextPlacement = {
            x: entity.points[0].x + normal.x * offset,
            y: entity.points[0].y + normal.y * offset,
            z: coordinateZ(entity.placement),
          };
        }
      }
      else if (entity.kind === 'angular') {
        const vertex = entity.points[0];
        const currentDirection = normalizedVector(vertex, currentPlacement) || { x: 1, y: 0 };
        const radius = distance(vertex, targetPoint);
        nextPlacement = {
          x: vertex.x + currentDirection.x * radius,
          y: vertex.y + currentDirection.y * radius,
          z: coordinateZ(entity.placement, coordinateZ(vertex)),
        };
      }
      entity.placement = nextPlacement;
      const nextGripPoint = dimensionPlacementGripPoint(entity);
      if (entity.textPosition) {
        entity.textPosition = offsetPoint(entity.textPosition, {
          x: nextGripPoint.x - currentPlacement.x,
          y: nextGripPoint.y - currentPlacement.y,
        });
      }
      return true;
    }
    const baseMatch = key.match(/^base-(\d+)$/);
    if (baseMatch) {
      const index = Number(baseMatch[1]);
      const currentBasePoint = dimensionBaseGripPoints(entity)[index];
      if (!currentBasePoint || !entity.points[index]) return false;
      if (entity.kind === 'horizontal') entity.points[index].x = targetPoint.x;
      else if (entity.kind === 'vertical') entity.points[index].y = targetPoint.y;
      else {
        const direction = normalizedVector(entity.points[0], entity.points[1]);
        if (!direction) return false;
        const displacement = (targetPoint.x - currentBasePoint.x) * direction.x +
          (targetPoint.y - currentBasePoint.y) * direction.y;
        entity.points[index] = offsetPoint(entity.points[index], {
          x: direction.x * displacement,
          y: direction.y * displacement,
        });
      }
      return true;
    }
    const pointMatch = key.match(/^point-(\d+)$/);
    if (!pointMatch) return false;
    const index = Number(pointMatch[1]);
    if (!entity.points[index]) return false;
    entity.points[index] = point3(targetPoint, coordinateZ(entity.points[index]));
    return true;
  }

  return { moveDimensionGrip };
}

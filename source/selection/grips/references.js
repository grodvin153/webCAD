/*
 * webCAD - Referencias de pinzamientos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { entityMidpoint, normalizeAngle, normalizedVector } from '../../geometry.js';
import { isCircularEntity } from '../../intersections.js';
import { circularReferencePoints } from '../../input/snaps.js';

export function createGripReferences({ dimensionGeometry, polylineReferencePoints }) {
  function dimensionPlacementGripPoint(entity) {
    const geometry = dimensionGeometry(entity);
    if (entity.kind === 'horizontal' || entity.kind === 'vertical' || entity.kind === 'aligned') {
      const dimensionLine = geometry.lines[geometry.lines.length - 1];
      return dimensionLine ? entityMidpoint(dimensionLine) : entity.placement;
    }
    if (entity.kind === 'angular' && geometry.arcs[0]) {
      const arc = geometry.arcs[0];
      const sweep = normalizeAngle(arc.endAngle - arc.startAngle);
      const angle = arc.startAngle + sweep * 0.5;
      return {
        x: arc.center.x + Math.cos(angle) * arc.radius,
        y: arc.center.y + Math.sin(angle) * arc.radius,
      };
    }
    return entity.placement;
  }

  function dimensionBaseGripPoints(entity) {
    if (!['horizontal', 'vertical', 'aligned'].includes(entity.kind) || entity.points.length < 2) return [];
    const [first, second] = entity.points;
    if (entity.kind === 'horizontal') {
      return [{ x: first.x, y: entity.placement.y }, { x: second.x, y: entity.placement.y }];
    }
    if (entity.kind === 'vertical') {
      return [{ x: entity.placement.x, y: first.y }, { x: entity.placement.x, y: second.y }];
    }
    const direction = normalizedVector(first, second);
    if (!direction) return [{ ...entity.placement }, { ...entity.placement }];
    const normal = { x: -direction.y, y: direction.x };
    const offset = (entity.placement.x - first.x) * normal.x +
      (entity.placement.y - first.y) * normal.y;
    return [
      { x: first.x + normal.x * offset, y: first.y + normal.y * offset },
      { x: second.x + normal.x * offset, y: second.y + normal.y * offset },
    ];
  }

  function dimensionReferencePoints(entity) {
    const geometry = dimensionGeometry(entity);
    const baseGrips = dimensionBaseGripPoints(entity).map((point, index) => ({
      type: 'endpoint', key: `base-${index}`, point,
    }));
    return [
      ...baseGrips,
      ...entity.points.map((point, index) => ({ type: 'endpoint', key: `point-${index}`, point })),
      { type: 'midpoint', key: 'placement', point: dimensionPlacementGripPoint(entity) },
      { type: 'center', key: 'text', point: geometry.text.point },
    ];
  }

  function gripPoint(selectedGrip) {
    if (!selectedGrip) return null;
    if (selectedGrip.entity.type === 'HATCH') {
      return selectedGrip.entity.boundary[selectedGrip.index] || null;
    }
    if (isCircularEntity(selectedGrip.entity)) {
      return circularReferencePoints(selectedGrip.entity)
        .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
    }
    if (selectedGrip.entity.type === 'POLYLINE') {
      return polylineReferencePoints(selectedGrip.entity)
        .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
    }
    if (selectedGrip.entity.type === 'DIMENSION') {
      return dimensionReferencePoints(selectedGrip.entity)
        .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
    }
    if (selectedGrip.entity.type === 'INSERT') return selectedGrip.entity.insertionPoint;
    return selectedGrip.entity[selectedGrip.key] || null;
  }

  function gripReferencePoint(selectedGrip) {
    if (!selectedGrip) return null;
    if (isCircularEntity(selectedGrip.entity) && selectedGrip.key !== 'center') {
      return selectedGrip.entity.center;
    }
    if (selectedGrip.entity.type === 'POLYLINE') {
      const vertexMatch = selectedGrip.key.match(/^vertex-(\d+)$/);
      if (vertexMatch) {
        const index = Number(vertexMatch[1]);
        const referenceIndex = index > 0
          ? index - 1
          : selectedGrip.entity.closed
            ? selectedGrip.entity.vertices.length - 1
            : Math.min(1, selectedGrip.entity.vertices.length - 1);
        return selectedGrip.entity.vertices[referenceIndex] || gripPoint(selectedGrip);
      }
      const arcMatch = selectedGrip.key.match(/^arc-(\d+)-(?:midpoint|center)$/);
      if (arcMatch) return selectedGrip.entity.vertices[Number(arcMatch[1])] || gripPoint(selectedGrip);
      return gripPoint(selectedGrip);
    }
    if (selectedGrip.entity.type === 'DIMENSION') {
      const pointMatch = selectedGrip.key.match(/^point-(\d+)$/);
      if (pointMatch) {
        const index = Number(pointMatch[1]);
        const referenceIndex = index === 0 ? Math.min(1, selectedGrip.entity.points.length - 1) : 0;
        return selectedGrip.entity.points[referenceIndex] || gripPoint(selectedGrip);
      }
      if (selectedGrip.key === 'text') return dimensionPlacementGripPoint(selectedGrip.entity);
      const baseMatch = selectedGrip.key.match(/^base-(\d+)$/);
      if (baseMatch) {
        return selectedGrip.entity.points[Number(baseMatch[1])] || selectedGrip.entity.points[0];
      }
      return selectedGrip.entity.points[0] || gripPoint(selectedGrip);
    }
    if (selectedGrip.entity.type !== 'LINE') return gripPoint(selectedGrip);
    return selectedGrip.key === 'start' ? selectedGrip.entity.end : selectedGrip.entity.start;
  }

  return {
    dimensionBaseGripPoints,
    dimensionPlacementGripPoint,
    dimensionReferencePoints,
    gripPoint,
    gripReferencePoint,
  };
}

/*
 * webCAD - Geometria de polilineas para seleccion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';
import {
  angleOfPoint,
  arcMidAngle,
  distance,
  distancePointToSegment,
  entityMidpoint,
  pointAtCircleAngle,
} from '../geometry.js';
import { isCircularEntity } from '../intersections.js';

export function createPolylineSelectionGeometry({
  createArcEntity,
  createLineEntity,
  createPolylineEntity,
  entityDistanceToPoint,
}) {
  function polylineSegmentEntity(entity, index) {
    if (!entity || entity.type !== 'POLYLINE' || !entity.segments[index]) return null;
    const segment = entity.segments[index];
    const start = entity.vertices[index];
    const end = entity.vertices[(index + 1) % entity.vertices.length];
    if (!start || !end) return null;
    const options = {
      layer: entity.layer,
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
    };
    if (segment.type === 'ARC' && segment.center) {
      const radius = distance(segment.center, start);
      if (radius <= SNAP_THRESHOLD) return null;
      return createArcEntity(
        segment.center,
        radius,
        angleOfPoint(segment.center, start),
        angleOfPoint(segment.center, end),
        { ...options, clockwise: segment.clockwise !== false },
      );
    }
    return createLineEntity(start, end, options);
  }

  function polylineSegmentEntities(entity) {
    if (!entity || entity.type !== 'POLYLINE') return [];
    return entity.segments.map((_, index) => polylineSegmentEntity(entity, index)).filter(Boolean);
  }

  function polylineDraftEntity(draft) {
    if (!draft?.vertices?.length) return null;
    return createPolylineEntity(draft.vertices, draft.segments || [], { closed: false });
  }

  function primitiveEntityParts(entity) {
    if (entity?.type === 'INSERT') {
      return entity.expandedEntities().flatMap((part) => primitiveEntityParts(part));
    }
    return entity?.type === 'POLYLINE' ? polylineSegmentEntities(entity) : entity ? [entity] : [];
  }

  function dimensionLineFromEntity(entity, pickPoint) {
    if (entity?.type === 'LINE') return entity;
    if (entity?.type !== 'POLYLINE') return null;
    return polylineSegmentEntities(entity)
      .filter((segment) => segment.type === 'LINE')
      .sort((first, second) =>
        distancePointToSegment(pickPoint, first.start, first.end) -
        distancePointToSegment(pickPoint, second.start, second.end))[0] || null;
  }

  function dimensionKindForLine(line) {
    const deltaX = Math.abs(line.end.x - line.start.x);
    const deltaY = Math.abs(line.end.y - line.start.y);
    if (deltaX <= SNAP_THRESHOLD) return 'vertical';
    if (deltaY <= SNAP_THRESHOLD) return 'horizontal';
    return 'aligned';
  }

  function dimensionCircularFromEntity(entity, pickPoint) {
    if (isCircularEntity(entity)) return entity;
    if (entity?.type !== 'POLYLINE') return null;
    const closestSegment = polylineSegmentEntities(entity)
      .sort((first, second) =>
        entityDistanceToPoint(first, pickPoint) - entityDistanceToPoint(second, pickPoint))[0];
    return closestSegment?.type === 'ARC' ? closestSegment : null;
  }

  function polylineReferencePoints(entity) {
    const candidates = entity.vertices.map((point, index) => ({
      type: 'endpoint',
      key: `vertex-${index}`,
      point,
    }));
    entity.segments.forEach((segment, index) => {
      const geometry = polylineSegmentEntity(entity, index);
      if (!geometry) return;
      if (geometry.type === 'ARC') {
        candidates.push({
          type: 'midpoint',
          key: `arc-${index}-midpoint`,
          point: pointAtCircleAngle(geometry, arcMidAngle(geometry)),
        });
        candidates.push({ type: 'center', key: `arc-${index}-center`, point: geometry.center });
      }
      else {
        candidates.push({
          type: 'midpoint',
          key: `segment-${index}-midpoint`,
          point: entityMidpoint(geometry),
        });
      }
    });
    return candidates;
  }

  return {
    dimensionCircularFromEntity,
    dimensionKindForLine,
    dimensionLineFromEntity,
    polylineDraftEntity,
    polylineReferencePoints,
    polylineSegmentEntities,
    polylineSegmentEntity,
    primitiveEntityParts,
  };
}

/*
 * webCAD - Proximidad y deteccion de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
  angleOfPoint,
  angleOnArc,
  boundsContainsPoint,
  distance,
  distancePointToSegment,
  expandBounds,
  pointAtCircleAngle,
  pointInPolygon,
  polygonDistanceToPoint,
} from '../geometry.js';
import { rotatePointAround } from '../transformations/rotate.js';

export function createHitTesting({ dimensionGeometry, polylineSegmentEntity }) {
  function distancePointToCircle(point, entity) {
    return Math.abs(distance(point, entity.center) - entity.radius);
  }

  function distancePointToArc(point, entity) {
    const angle = angleOfPoint(entity.center, point);
    if (angleOnArc(angle, entity)) return Math.abs(distance(point, entity.center) - entity.radius);
    return Math.min(
      distance(point, pointAtCircleAngle(entity, entity.startAngle)),
      distance(point, pointAtCircleAngle(entity, entity.endAngle)),
    );
  }

  function entityDistanceToPoint(entity, point) {
    if (entity.type === 'LINE') return distancePointToSegment(point, entity.start, entity.end);
    if (entity.type === 'CIRCLE') return distancePointToCircle(point, entity);
    if (entity.type === 'ARC') return distancePointToArc(point, entity);
    if (entity.type === 'TEXT') {
      const localPoint = rotatePointAround(point, entity.insertionPoint, -entity.angle);
      const minX = entity.insertionPoint.x;
      const maxX = minX + entity.width();
      const minY = entity.insertionPoint.y - entity.height;
      const maxY = entity.insertionPoint.y + entity.height * 0.22;
      const deltaX = Math.max(minX - localPoint.x, 0, localPoint.x - maxX);
      const deltaY = Math.max(minY - localPoint.y, 0, localPoint.y - maxY);
      return Math.hypot(deltaX, deltaY);
    }
    if (entity.type === 'HATCH') {
      const loops = entity.loops || [entity.boundary];
      const insideFilledArea = loops.reduce(
        (inside, loop) => pointInPolygon(point, loop) ? !inside : inside,
        false,
      );
      return insideFilledArea
        ? 0
        : loops.reduce((nearest, loop) => Math.min(nearest, polygonDistanceToPoint(point, loop)), Infinity);
    }
    if (entity.type === 'POLYLINE') {
      return entity.segments.reduce((nearest, segment, index) => {
        const geometry = polylineSegmentEntity(entity, index);
        if (!geometry) return nearest;
        const halfWidth = Math.max(segment.startWidth, segment.endWidth) * 0.5;
        return Math.min(nearest, Math.max(0, entityDistanceToPoint(geometry, point) - halfWidth));
      }, Infinity);
    }
    if (entity.type === 'DIMENSION') {
      const geometry = dimensionGeometry(entity);
      const lineDistance = geometry.lines.reduce(
        (nearest, line) => Math.min(nearest, distancePointToSegment(point, line.start, line.end)),
        Infinity,
      );
      const arcDistance = geometry.arcs.reduce((nearest, arc) => Math.min(
        nearest,
        distancePointToArc(point, {
          type: 'ARC',
          center: arc.center,
          radius: arc.radius,
          startAngle: arc.startAngle,
          endAngle: arc.endAngle,
          clockwise: !arc.counterclockwise,
        }),
      ), Infinity);
      return Math.min(lineDistance, arcDistance, distance(point, geometry.text.point));
    }
    if (entity.type === 'INSERT') {
      return entity.expandedEntities().reduce(
        (nearest, part) => Math.min(nearest, entityDistanceToPoint(part, point)),
        distance(entity.insertionPoint, point),
      );
    }
    return Infinity;
  }

  function entityIsNearPoint(entity, point, tolerance) {
    if (!boundsContainsPoint(expandBounds(entity.bounds(), tolerance), point)) return false;
    return entityDistanceToPoint(entity, point) <= tolerance;
  }

  return { distancePointToArc, distancePointToCircle, entityDistanceToPoint, entityIsNearPoint };
}

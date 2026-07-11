/*
 * webCAD - Movimiento de pinzamientos circulares y de polilinea
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../../config.js';
import { coordinateZ, point3 } from '../../coordinates/point3.js';
import {
  angleOfPoint,
  arcMidAngle,
  distance,
  entityArcSweep,
  entityMidpoint,
  pointAtCircleAngle,
} from '../../geometry.js';
import { circleFromThreePoints } from '../../input/coordinates.js';
import { ellipseParameter, ellipseReferencePoints, isEllipseEntity } from '../../ellipse/geometry.js';

export function moveCircularGrip(entity, key, targetPoint) {
  if (key === 'center') {
    entity.center = point3(targetPoint, coordinateZ(entity.center));
    return true;
  }
  if (entity.type === 'CIRCLE' && key.startsWith('quadrant-')) {
    const radius = distance(entity.center, targetPoint);
    if (radius <= SNAP_THRESHOLD) return false;
    entity.radius = radius;
    return true;
  }
  if (entity.type !== 'ARC') return false;
  if (key === 'midpoint') {
    const radius = distance(entity.center, targetPoint);
    if (radius <= SNAP_THRESHOLD) return false;
    entity.radius = radius;
    return true;
  }
  if (key === 'start' || key === 'end') {
    const angleKey = key === 'start' ? 'startAngle' : 'endAngle';
    const previousAngle = entity[angleKey];
    entity[angleKey] = angleOfPoint(entity.center, targetPoint);
    if (entityArcSweep(entity) <= SNAP_THRESHOLD) {
      entity[angleKey] = previousAngle;
      return false;
    }
    return true;
  }
  return false;
}

export function moveEllipseGrip(entity, key, targetPoint) {
  if (!isEllipseEntity(entity)) return false;
  if (key === 'start' || key === 'end') {
    const parameterKey = key === 'start' ? 'startParameter' : 'endParameter';
    const previous = entity[parameterKey];
    entity[parameterKey] = ellipseParameter(entity, targetPoint);
    if (entity.type !== 'ELLIPSE_ARC' || Math.abs(entity.startParameter - entity.endParameter) <= SNAP_THRESHOLD) {
      entity[parameterKey] = previous;
      return false;
    }
    return true;
  }
  const reference = ellipseReferencePoints(entity).find((candidate) => candidate.key === key);
  if (!reference) return false;
  const deltaX = targetPoint.x - entity.center.x;
  const deltaY = targetPoint.y - entity.center.y;
  if (key.startsWith('major-')) {
    const radius = Math.hypot(deltaX, deltaY);
    if (radius <= Math.max(entity.radiusY, SNAP_THRESHOLD)) return false;
    entity.radiusX = radius;
    entity.rotation = Math.atan2(deltaY, deltaX) + (key === 'major-1' ? Math.PI : 0);
    return true;
  }
  if (key.startsWith('minor-')) {
    const normal = { x: -Math.sin(entity.rotation), y: Math.cos(entity.rotation) };
    const radius = Math.abs(deltaX * normal.x + deltaY * normal.y);
    if (radius <= SNAP_THRESHOLD || radius > entity.radiusX) return false;
    entity.radiusY = radius;
    return true;
  }
  if (key.startsWith('focus-')) {
    const focalRadius = Math.hypot(deltaX, deltaY);
    entity.radiusX = Math.sqrt(focalRadius ** 2 + entity.radiusY ** 2);
    entity.rotation = Math.atan2(deltaY, deltaX) + (key === 'focus-1' ? Math.PI : 0);
    return true;
  }
  return false;
}

function projectCenterToChordBisector(start, end, point) {
  const midpoint = entityMidpoint({ start, end });
  const chord = { x: end.x - start.x, y: end.y - start.y };
  const chordLength = Math.hypot(chord.x, chord.y);
  if (chordLength <= SNAP_THRESHOLD) return null;
  const normal = { x: -chord.y / chordLength, y: chord.x / chordLength };
  const offset = (point.x - midpoint.x) * normal.x + (point.y - midpoint.y) * normal.y;
  return {
    x: midpoint.x + normal.x * offset,
    y: midpoint.y + normal.y * offset,
    z: midpoint.z,
  };
}

export function createPolylineGripMovement({ polylineSegmentEntity }) {
  function movePolylineGrip(entity, key, targetPoint) {
    const vertexMatch = key.match(/^vertex-(\d+)$/);
    if (vertexMatch) {
      const vertexIndex = Number(vertexMatch[1]);
      const adjacentArcs = [];
      entity.segments.forEach((segment, segmentIndex) => {
        const endIndex = (segmentIndex + 1) % entity.vertices.length;
        if (segment.type === 'ARC' && (segmentIndex === vertexIndex || endIndex === vertexIndex)) {
          const geometry = polylineSegmentEntity(entity, segmentIndex);
          if (geometry) {
            adjacentArcs.push({
              segmentIndex,
              midpoint: pointAtCircleAngle(geometry, arcMidAngle(geometry)),
            });
          }
        }
      });
      entity.vertices[vertexIndex] = point3(
        targetPoint,
        coordinateZ(entity.vertices[vertexIndex]),
      );
      adjacentArcs.forEach(({ segmentIndex, midpoint }) => {
        const start = entity.vertices[segmentIndex];
        const end = entity.vertices[(segmentIndex + 1) % entity.vertices.length];
        const circle = circleFromThreePoints(start, midpoint, end);
        if (circle) entity.segments[segmentIndex].center = circle.center;
      });
      return true;
    }

    const arcMatch = key.match(/^arc-(\d+)-(midpoint|center)$/);
    if (arcMatch) {
      const segmentIndex = Number(arcMatch[1]);
      const start = entity.vertices[segmentIndex];
      const end = entity.vertices[(segmentIndex + 1) % entity.vertices.length];
      if (arcMatch[2] === 'center') {
        const center = projectCenterToChordBisector(start, end, targetPoint);
        if (!center) return false;
        entity.segments[segmentIndex].center = center;
        return true;
      }
      const circle = circleFromThreePoints(start, targetPoint, end);
      if (!circle) return false;
      entity.segments[segmentIndex].center = circle.center;
      return true;
    }
    return false;
  }

  return { movePolylineGrip };
}

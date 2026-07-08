/* webCAD - Geometria de la orden Estirar | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  angleOfPoint,
  arcMidAngle,
  boundsContainsBounds,
  boundsContainsPoint,
  distance,
  offsetPoint,
  pointAtCircleAngle,
} from '../../geometry.js';
import { circleFromThreePoints } from '../../input/coordinates.js';

export function stretchTargetFromEntity(entity, bounds, mode = 'capture') {
  if (!entity || !['LINE', 'POLYLINE'].includes(entity.type)) return null;
  if (mode === 'window' || boundsContainsBounds(bounds, entity.bounds())) {
    return { entity, mode: 'full', indices: [] };
  }

  if (entity.type === 'LINE') {
    const indices = [];
    if (boundsContainsPoint(bounds, entity.start)) indices.push(0);
    if (boundsContainsPoint(bounds, entity.end)) indices.push(1);
    return indices.length ? { entity, mode: 'vertices', indices } : null;
  }

  const indices = entity.vertices
    .map((point, index) => boundsContainsPoint(bounds, point) ? index : -1)
    .filter((index) => index >= 0);
  if (!indices.length) return null;
  if (indices.length === entity.vertices.length) {
    return { entity, mode: 'full', indices: [] };
  }
  return { entity, mode: 'vertices', indices };
}

export function mergeStretchTarget(previous, incoming) {
  if (!previous) return incoming;
  if (!incoming || previous.mode === 'full') return previous;
  if (incoming.mode === 'full') return incoming;
  return {
    entity: previous.entity,
    mode: 'vertices',
    indices: [...new Set([...previous.indices, ...incoming.indices])],
  };
}

function polylineArcGeometry(entity, segmentIndex) {
  const segment = entity.segments[segmentIndex];
  if (segment?.type !== 'ARC' || !segment.center) return null;
  const start = entity.vertices[segmentIndex];
  const end = entity.vertices[(segmentIndex + 1) % entity.vertices.length];
  if (!start || !end) return null;
  return {
    center: segment.center,
    radius: distance(segment.center, start),
    startAngle: angleOfPoint(segment.center, start),
    endAngle: angleOfPoint(segment.center, end),
    clockwise: segment.clockwise !== false,
  };
}

function stretchPolylineVertices(entity, indices, vector) {
  const selected = new Set(indices);
  const arcReferences = entity.segments.map((segment, segmentIndex) => {
    if (segment.type !== 'ARC') return null;
    const geometry = polylineArcGeometry(entity, segmentIndex);
    return geometry ? pointAtCircleAngle(geometry, arcMidAngle(geometry)) : null;
  });

  indices.forEach((index) => {
    if (entity.vertices[index]) entity.vertices[index] = offsetPoint(entity.vertices[index], vector);
  });

  entity.segments.forEach((segment, segmentIndex) => {
    if (segment.type !== 'ARC' || !segment.center) return;
    const endIndex = (segmentIndex + 1) % entity.vertices.length;
    const startMoved = selected.has(segmentIndex);
    const endMoved = selected.has(endIndex);
    if (startMoved && endMoved) {
      segment.center = offsetPoint(segment.center, vector);
      return;
    }
    if (!startMoved && !endMoved) return;
    const circle = circleFromThreePoints(
      entity.vertices[segmentIndex],
      arcReferences[segmentIndex],
      entity.vertices[endIndex],
    );
    if (circle) segment.center = circle.center;
  });
  return true;
}

export function applyStretchTarget(target, vector, entity = target?.entity) {
  if (!target || !entity || !vector) return false;
  if (target.mode === 'full') {
    if (entity.type === 'LINE') {
      entity.start = offsetPoint(entity.start, vector);
      entity.end = offsetPoint(entity.end, vector);
      return true;
    }
    if (entity.type === 'POLYLINE') {
      entity.vertices = entity.vertices.map((point) => offsetPoint(point, vector));
      entity.segments.forEach((segment) => {
        if (segment.center) segment.center = offsetPoint(segment.center, vector);
      });
      return true;
    }
    return false;
  }

  if (entity.type === 'LINE') {
    if (target.indices.includes(0)) entity.start = offsetPoint(entity.start, vector);
    if (target.indices.includes(1)) entity.end = offsetPoint(entity.end, vector);
    return true;
  }
  if (entity.type === 'POLYLINE') {
    return stretchPolylineVertices(entity, target.indices, vector);
  }
  return false;
}

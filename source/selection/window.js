/* webCAD - Ventanas de seleccion por arrastre o dos clics | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  angleOfPoint,
  boundsContainsBounds,
  boundsContainsPoint,
  boundsIntersectsBounds,
  distance,
  normalizeBoundsFromPoints,
  pointInPolygon,
} from '../geometry.js';
import {
  lineCircleIntersectionPoints,
  lineSegmentIntersection,
  pointOnCircularEntity,
} from '../intersections.js';
import { xlineIntersectsBounds } from '../tools/xline/geometry.js';
import { selectionWindowMode } from './geometry.js';

export function updateSelectionWindow(windowState, mouseWorld, mouseScreen) {
  if (!windowState || !mouseWorld || !mouseScreen) return null;
  const deltaX = mouseScreen.x - windowState.startScreen.x;
  const deltaY = mouseScreen.y - windowState.startScreen.y;
  windowState.currentWorld = { ...mouseWorld };
  if (!windowState.anchored) {
    windowState.dragging = Math.hypot(deltaX, deltaY) > 4;
  }
  return selectionWindowMode(windowState);
}

export function anchorSelectionWindow(windowState) {
  if (!windowState || windowState.dragging || windowState.anchored) return false;
  windowState.anchored = true;
  return true;
}

export function completeAnchoredSelectionWindow(windowState, worldPoint) {
  if (!windowState?.anchored || !worldPoint) return false;
  windowState.currentWorld = { ...worldPoint };
  windowState.dragging = true;
  windowState.anchored = false;
  return true;
}

function boundsEdges(bounds) {
  const topLeft = { x: bounds.minX, y: bounds.minY };
  const topRight = { x: bounds.maxX, y: bounds.minY };
  const bottomRight = { x: bounds.maxX, y: bounds.maxY };
  const bottomLeft = { x: bounds.minX, y: bounds.maxY };
  return [
    { start: topLeft, end: topRight },
    { start: topRight, end: bottomRight },
    { start: bottomRight, end: bottomLeft },
    { start: bottomLeft, end: topLeft },
  ];
}

function lineCrossesBounds(line, bounds, edges = boundsEdges(bounds)) {
  return boundsContainsPoint(bounds, line.start) ||
    boundsContainsPoint(bounds, line.end) ||
    edges.some((edge) => lineSegmentIntersection(line, edge));
}

function circularCrossesBounds(entity, bounds, edges = boundsEdges(bounds)) {
  if (entity.type === 'ARC') {
    const start = {
      x: entity.center.x + Math.cos(entity.startAngle) * entity.radius,
      y: entity.center.y + Math.sin(entity.startAngle) * entity.radius,
    };
    const end = {
      x: entity.center.x + Math.cos(entity.endAngle) * entity.radius,
      y: entity.center.y + Math.sin(entity.endAngle) * entity.radius,
    };
    if (boundsContainsPoint(bounds, start) || boundsContainsPoint(bounds, end)) return true;
  }
  return edges.some((edge) => lineCircleIntersectionPoints(edge, entity)
    .some((point) => pointOnCircularEntity(point, entity)));
}

function polylineSegment(entity, index) {
  const segment = entity.segments[index];
  const start = entity.vertices[index];
  const end = entity.vertices[(index + 1) % entity.vertices.length];
  if (!segment || !start || !end) return null;
  if (segment.type !== 'ARC' || !segment.center) {
    return { type: 'LINE', start, end };
  }
  return {
    type: 'ARC',
    center: segment.center,
    radius: distance(segment.center, start),
    startAngle: angleOfPoint(segment.center, start),
    endAngle: angleOfPoint(segment.center, end),
    clockwise: segment.clockwise !== false,
  };
}

function polylineCrossesBounds(entity, bounds, edges) {
  return entity.segments.some((_, index) => {
    const segment = polylineSegment(entity, index);
    if (!segment) return false;
    return segment.type === 'LINE'
      ? lineCrossesBounds(segment, bounds, edges)
      : circularCrossesBounds(segment, bounds, edges);
  });
}

function hatchCrossesBounds(entity, bounds, edges) {
  const loops = entity.loops || (entity.boundary ? [entity.boundary] : []);
  const corners = edges.map((edge) => edge.start);
  if (corners.some((corner) => loops.reduce(
    (inside, loop) => pointInPolygon(corner, loop) ? !inside : inside,
    false,
  ))) return true;
  return loops.some((loop) => loop.some((point, index) => lineCrossesBounds({
    start: point,
    end: loop[(index + 1) % loop.length],
  }, bounds, edges)));
}

export function entityCrossesSelectionBounds(entity, bounds) {
  if (!entity) return false;
  if (entity.type === 'XLINE') return xlineIntersectsBounds(entity, bounds);
  const entityBounds = entity.bounds();
  if (!boundsIntersectsBounds(bounds, entityBounds)) return false;
  if (boundsContainsBounds(bounds, entityBounds)) return true;

  const edges = boundsEdges(bounds);
  if (entity.type === 'LINE') return lineCrossesBounds(entity, bounds, edges);
  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    return circularCrossesBounds(entity, bounds, edges);
  }
  if (entity.type === 'POLYLINE') return polylineCrossesBounds(entity, bounds, edges);
  if (entity.type === 'HATCH') return hatchCrossesBounds(entity, bounds, edges);
  if (entity.type === 'INSERT' && typeof entity.expandedEntities === 'function') {
    return entity.expandedEntities().some((part) => entityCrossesSelectionBounds(part, bounds));
  }

  // Text, images and similar filled rectangular entities use their visual bounds.
  return boundsIntersectsBounds(bounds, entityBounds);
}

export function entitiesFromSelectionWindow(doc, windowState) {
  if (!windowState?.currentWorld) return [];
  const selectionBounds = normalizeBoundsFromPoints(windowState.startWorld, windowState.currentWorld);
  const mode = selectionWindowMode(windowState);
  const matchingEntities = doc.queryBounds(selectionBounds).filter((entity) => {
    if (entity.type === 'XLINE') {
      return mode === 'capture' && xlineIntersectsBounds(entity, selectionBounds);
    }
    const entityBounds = entity.bounds();
    return mode === 'window'
      ? boundsContainsBounds(selectionBounds, entityBounds)
      : entityCrossesSelectionBounds(entity, selectionBounds);
  });
  return doc.expandEntityGroups(matchingEntities);
}

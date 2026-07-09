/* webCAD - Adaptador experimental de perfiles 2D a 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { extrudeClosedProfile } from './extrusion.js';

const DEFAULT_TOLERANCE = 1e-9;
const POLYLINE_TYPES = new Set(['POLYLINE', 'LWPOLYLINE']);

function normalizedTolerance(value) {
  const tolerance = Number(value);
  return Number.isFinite(tolerance) && tolerance >= 0 ? tolerance : DEFAULT_TOLERANCE;
}

function polylineLikeType(entity) {
  const type = entity?.type ?? entity?.kind;
  return type == null || POLYLINE_TYPES.has(String(type).toUpperCase());
}

function point3FromVertex(vertex) {
  return {
    x: Number(vertex?.x),
    y: Number(vertex?.y),
    z: vertex?.z === undefined ? 0 : Number(vertex.z),
  };
}

function validPoint(point) {
  return Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.z);
}

function samePoint(first, second, tolerance) {
  return Math.abs(first.x - second.x) <= tolerance &&
    Math.abs(first.y - second.y) <= tolerance &&
    Math.abs(first.z - second.z) <= tolerance;
}

function normalizedVertices(entity, tolerance) {
  if (!polylineLikeType(entity) || !Array.isArray(entity?.vertices)) {
    return [];
  }

  const points = [];
  for (const vertex of entity.vertices) {
    const point = point3FromVertex(vertex);
    if (!validPoint(point)) {
      return [];
    }
    if (!points.length || !samePoint(points[points.length - 1], point, tolerance)) {
      points.push(point);
    }
  }
  if (points.length > 1 && samePoint(points[0], points[points.length - 1], tolerance)) {
    points.pop();
  }
  return points;
}

function hasArcSegments(entity) {
  return Array.isArray(entity?.segments) && entity.segments.some((segment) => {
    const type = segment?.type ?? segment?.kind;
    return String(type ?? '').toUpperCase() === 'ARC';
  });
}

function hasUnsupportedSegments(entity) {
  return Array.isArray(entity?.segments) && entity.segments.some((segment) => {
    const type = segment?.type ?? segment?.kind;
    return String(type ?? '').toUpperCase() !== 'LINE';
  });
}

export function isClosedPolylineLike(entity, tolerance = DEFAULT_TOLERANCE) {
  const effectiveTolerance = normalizedTolerance(tolerance);
  if (!polylineLikeType(entity) || !Array.isArray(entity?.vertices)) {
    return false;
  }
  const rawPoints = entity.vertices.map(point3FromVertex);
  if (!rawPoints.every(validPoint)) {
    return false;
  }
  const explicitlyClosed = entity.closed === true;
  const endpointsMeet = rawPoints.length > 1 &&
    samePoint(rawPoints[0], rawPoints[rawPoints.length - 1], effectiveTolerance);
  return (explicitlyClosed || endpointsMeet) &&
    normalizedVertices(entity, effectiveTolerance).length >= 3;
}

export function profilePointsFromPolylineLike(entity, options = {}) {
  if (hasArcSegments(entity)) {
    throw new Error('No se pueden extruir todavía polilíneas con arcos');
  }
  if (hasUnsupportedSegments(entity)) {
    throw new Error('Solo se pueden extruir polilíneas con segmentos rectos');
  }
  const tolerance = normalizedTolerance(options.tolerance);
  if (!isClosedPolylineLike(entity, tolerance)) {
    throw new Error('La polilínea debe estar cerrada y tener al menos tres puntos útiles');
  }
  return normalizedVertices(entity, tolerance);
}

export function canExtrudeEntityAsProfile(entity) {
  return isClosedPolylineLike(entity) && !hasUnsupportedSegments(entity);
}

export function extrudePolylineLikeEntity(entity, height, options = {}) {
  const profile = profilePointsFromPolylineLike(entity, options);
  const solid = extrudeClosedProfile(profile, height, {
    source: options.source ?? null,
  });
  solid.metadata = {
    ...solid.metadata,
    type: 'extrusion',
    sourceEntityType: entity?.type ?? entity?.kind ?? null,
    sourceId: entity?.id ?? null,
    height: Number(height),
  };
  return solid;
}

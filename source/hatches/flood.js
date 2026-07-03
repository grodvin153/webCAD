/*
 * webCAD - Seleccion de recintos por punto interior
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createHatchFlood(dependencies) {
  const {
    SNAP_THRESHOLD,
    circlePolygon,
    closedLineGroupPolygon,
    curveArrangementFaces,
    distance,
    pointInPolygon,
    polygonSignedArea,
  } = dependencies;

  function hatchBoundaryAtPoint(doc, point) {
    const candidates = [];
    const visitedGroups = new Set();
    doc.topLevelEntities().forEach((entity) => {
      if (entity.type === 'POLYLINE') {
        const polygon = closedLineGroupPolygon(doc, entity);
        if (polygon && pointInPolygon(point, polygon)) {
          candidates.push(polygon);
        }
      }
      if (entity.type === 'LINE' && entity.groupId && !visitedGroups.has(entity.groupId)) {
        visitedGroups.add(entity.groupId);
        const polygon = closedLineGroupPolygon(doc, entity);
        if (polygon && pointInPolygon(point, polygon)) {
          candidates.push(polygon);
        }
      }
      if (entity.type === 'CIRCLE' && distance(entity.center, point) < entity.radius - SNAP_THRESHOLD) {
        candidates.push(circlePolygon(entity));
      }
    });
    curveArrangementFaces(doc).forEach((polygon) => {
      if (pointInPolygon(point, polygon)) {
        candidates.push(polygon);
      }
    });
    candidates.sort((first, second) =>
      Math.abs(polygonSignedArea(first)) - Math.abs(polygonSignedArea(second)));
    return candidates[0] || null;
  }

  return {
    hatchBoundaryAtPoint,
  };
}

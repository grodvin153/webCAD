/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createLineExtendOperations(dependencies) {
  const {
    SNAP_THRESHOLD,
    distance,
    infiniteLineCircularIntersectionPoints,
    infiniteLineLineIntersection,
    isCircularEntity,
    primitiveEntityParts,
    rawLineParameter,
  } = dependencies;

  function extensionBoundaryIntersections(line, boundary) {
    if (!line || line.type !== 'LINE' || !boundary || boundary === line) {
      return [];
    }


    if (boundary.type === 'POLYLINE') {
      return primitiveEntityParts(boundary)
        .flatMap((part) => extensionBoundaryIntersections(line, part));
    }

    const direction = {
      x: line.end.x - line.start.x,
      y: line.end.y - line.start.y,
    };
    if (Math.hypot(direction.x, direction.y) <= SNAP_THRESHOLD) {
      return [];
    }

    if (boundary.type === 'LINE') {
      const boundaryDirection = {
        x: boundary.end.x - boundary.start.x,
        y: boundary.end.y - boundary.start.y,
      };
      const point = infiniteLineLineIntersection(line.start, direction, boundary.start, boundaryDirection);
      return point ? [point] : [];
    }

    if (isCircularEntity(boundary)) {
      return infiniteLineCircularIntersectionPoints(line.start, direction, boundary, false);
    }

    return [];
  }

  function lineExtensionCandidate(line, boundaryEntities, endpointKey) {
    const candidates = [];
    for (const boundary of boundaryEntities) {
      for (const point of extensionBoundaryIntersections(line, boundary)) {
        const parameter = rawLineParameter(line, point);
        if (endpointKey === 'start' && parameter < -SNAP_THRESHOLD) {
          candidates.push({ point, distance: distance(line.start, point) });
        }
        if (endpointKey === 'end' && parameter > 1 + SNAP_THRESHOLD) {
          candidates.push({ point, distance: distance(line.end, point) });
        }
      }
    }

    candidates.sort((first, second) => first.distance - second.distance);
    return candidates[0]?.point || null;
  }

  function extendLineToBoundaries(line, boundaryEntities, pickPoint = null) {
    if (!line || line.type !== 'LINE' || !boundaryEntities.length) {
      return false;
    }

    const startCandidate = lineExtensionCandidate(line, boundaryEntities, 'start');
    const endCandidate = lineExtensionCandidate(line, boundaryEntities, 'end');
    let endpointKey = null;
    if (pickPoint) {
      endpointKey = distance(pickPoint, line.start) <= distance(pickPoint, line.end) ? 'start' : 'end';
    }
    else if (startCandidate && endCandidate) {
      endpointKey = distance(line.start, startCandidate) <= distance(line.end, endCandidate) ? 'start' : 'end';
    }
    else if (startCandidate) {
      endpointKey = 'start';
    }
    else if (endCandidate) {
      endpointKey = 'end';
    }

    const target = endpointKey === 'start' ? startCandidate : endpointKey === 'end' ? endCandidate : null;
    if (!target) {
      return false;
    }

    line[endpointKey] = { ...target };
    return true;
  }

  return {
    extensionBoundaryIntersections,
    lineExtensionCandidate,
    extendLineToBoundaries,
  };
}

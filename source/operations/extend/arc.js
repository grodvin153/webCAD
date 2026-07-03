/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createArcExtendOperations(dependencies) {
  const {
    SNAP_THRESHOLD,
    TWO_PI,
    angleInSweep,
    angleOfPoint,
    angleOnArc,
    directedArcSweep,
    distance,
    entityArcSweep,
    fullCircleBoundaryIntersectionPoints,
    normalizeAngle,
    pointAtCircleAngle,
  } = dependencies;

  function arcEndpointPoint(arc, endpointKey) {
    return pointAtCircleAngle(arc, endpointKey === 'start' ? arc.startAngle : arc.endAngle);
  }

  function arcExtensionCandidate(arc, boundaryEntities, endpointKey) {
    const candidates = [];
    const clockwise = arc.clockwise !== false;
    const currentSweep = entityArcSweep(arc);
    if (currentSweep <= SNAP_THRESHOLD) {
      return null;
    }

    for (const boundary of boundaryEntities) {
      for (const point of fullCircleBoundaryIntersectionPoints(arc, boundary)) {
        const angle = angleOfPoint(arc.center, point);
        if (angleOnArc(angle, arc)) {
          continue;
        }

        if (endpointKey === 'start') {
          const extensionSweep = directedArcSweep(angle, arc.startAngle, clockwise);
          const nextSweep = directedArcSweep(angle, arc.endAngle, clockwise);
          if (
            extensionSweep > SNAP_THRESHOLD &&
            nextSweep > currentSweep + SNAP_THRESHOLD &&
            nextSweep < TWO_PI - SNAP_THRESHOLD
          ) {
            candidates.push({ angle, distance: arc.radius * extensionSweep });
          }
        }

        if (endpointKey === 'end') {
          const extensionSweep = directedArcSweep(arc.endAngle, angle, clockwise);
          const nextSweep = directedArcSweep(arc.startAngle, angle, clockwise);
          if (
            extensionSweep > SNAP_THRESHOLD &&
            nextSweep > currentSweep + SNAP_THRESHOLD &&
            nextSweep < TWO_PI - SNAP_THRESHOLD
          ) {
            candidates.push({ angle, distance: arc.radius * extensionSweep });
          }
        }
      }
    }

    candidates.sort((first, second) => first.distance - second.distance);
    return candidates[0]?.angle ?? null;
  }

  function extendArcToBoundaries(arc, boundaryEntities, pickPoint = null) {
    if (!arc || arc.type !== 'ARC' || !boundaryEntities.length) {
      return false;
    }

    const startCandidate = arcExtensionCandidate(arc, boundaryEntities, 'start');
    const endCandidate = arcExtensionCandidate(arc, boundaryEntities, 'end');
    let endpointKey = null;
    if (pickPoint) {
      endpointKey = distance(pickPoint, arcEndpointPoint(arc, 'start')) <=
        distance(pickPoint, arcEndpointPoint(arc, 'end')) ? 'start' : 'end';
    }
    else if (startCandidate !== null && endCandidate !== null) {
      const clockwise = arc.clockwise !== false;
      const startDistance = arc.radius * directedArcSweep(startCandidate, arc.startAngle, clockwise);
      const endDistance = arc.radius * directedArcSweep(arc.endAngle, endCandidate, clockwise);
      endpointKey = startDistance <= endDistance ? 'start' : 'end';
    }
    else if (startCandidate !== null) {
      endpointKey = 'start';
    }
    else if (endCandidate !== null) {
      endpointKey = 'end';
    }

    const targetAngle = endpointKey === 'start'
      ? startCandidate
      : endpointKey === 'end' ? endCandidate : null;
    if (targetAngle === null) {
      return false;
    }

    if (endpointKey === 'start') {
      arc.startAngle = normalizeAngle(targetAngle);
    }
    else {
      arc.endAngle = normalizeAngle(targetAngle);
    }
    return true;
  }

  return {
    arcEndpointPoint,
    arcExtensionCandidate,
    extendArcToBoundaries,
  };
}

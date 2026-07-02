/*
 * webCAD - Entrada, coordenadas y resolucion de snaps
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from './config.js';
import {
  angleInSweep,
  angleOfPoint,
  arcMidAngle,
  boundsContainsPoint,
  boundsIntersectsBounds,
  createBounds,
  distance,
  distancePointToInfiniteLine,
  entityMidpoint,
  expandBounds,
  orthoPoint,
  perpendicularFootOnSegment,
  pointAtCircleAngle,
} from './geometry.js';
import {
  infiniteLineSegmentIntersection,
  isCircularEntity,
  pointOnCircularEntity,
} from './intersections.js';

export function snap(value, step) {
  return Math.round(value / step) * step;
}

export function snapPoint(point, step) {
  return {
    x: snap(point.x, step),
    y: snap(point.y, step),
  };
}

export function addSnapCandidate(point, candidate, tolerance, currentBest) {
  const snapDistance = distance(point, candidate.point);
  if (snapDistance > tolerance) {
    return currentBest;
  }

  if (!currentBest || snapDistance < currentBest.distance) {
    return {
      ...candidate,
      point: { x: candidate.point.x, y: candidate.point.y },
      distance: snapDistance,
    };
  }

  return currentBest;
}

export function circularReferencePoints(entity) {
  if (!entity || !isCircularEntity(entity)) {
    return [];
  }

  if (entity.type === 'ARC') {
    return [
      { type: 'endpoint', key: 'start', point: pointAtCircleAngle(entity, entity.startAngle) },
      { type: 'endpoint', key: 'end', point: pointAtCircleAngle(entity, entity.endAngle) },
      { type: 'midpoint', key: 'midpoint', point: pointAtCircleAngle(entity, arcMidAngle(entity)) },
      { type: 'center', key: 'center', point: entity.center },
    ];
  }

  const candidates = [
    { type: 'center', key: 'center', point: entity.center },
    { type: 'quadrant', key: 'quadrant-0', point: { x: entity.center.x + entity.radius, y: entity.center.y } },
    { type: 'quadrant', key: 'quadrant-1', point: { x: entity.center.x, y: entity.center.y + entity.radius } },
    { type: 'quadrant', key: 'quadrant-2', point: { x: entity.center.x - entity.radius, y: entity.center.y } },
    { type: 'quadrant', key: 'quadrant-3', point: { x: entity.center.x, y: entity.center.y - entity.radius } },
  ];
  return candidates.filter((candidate) => pointOnCircularEntity(candidate.point, entity));
}

export function createInputResolvers({
  dimensionPlacementOrigin,
  dimensionReferencePoints,
  entityIntersectionPoints,
  entityIsNearPoint,
  getGridBase,
  polylineDraftEntity,
  polylineReferencePoints,
  polylineSegmentEntities,
  primitiveEntityParts,
}) {
  function objectSnapPoint(point, state, options = {}) {
    if (!point || !state.objectSnapEnabled || !state.doc) {
      return null;
    }

    const tolerance = (state.snapPixelTolerance || 10) / state.viewScale;
    let bestSnap = null;
    const cursorBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const sourceSnapEntities = state.doc.queryBounds(cursorBounds);
    const snapEntities = sourceSnapEntities
      .filter((entity) => entity !== options.ignoreEntity)
      .flatMap((entity) => entity.type === 'INSERT' ? primitiveEntityParts(entity) : [entity])
      .filter((entity) => entity.type === 'LINE' || entity.type === 'POLYLINE' || isCircularEntity(entity));
    const nearbySnapEntities = snapEntities.filter((entity) =>
      entity !== options.ignoreEntity && entityIsNearPoint(entity, point, tolerance),
    );
    const lineEntities = snapEntities.filter((entity) => entity.type === 'LINE');
    const nearbyLineEntities = nearbySnapEntities.filter((entity) => entity.type === 'LINE');
    const draftPolyline = state.tool === 'polyline' ? polylineDraftEntity(state.polylineDraft) : null;
    const nearbyDraftParts = draftPolyline
      ? primitiveEntityParts(draftPolyline)
        .filter((part) => boundsIntersectsBounds(part.bounds(), cursorBounds))
      : [];

    for (const reference of sourceSnapEntities.filter((entity) =>
      entity.type === 'INSERT' && entity !== options.ignoreEntity)) {
      bestSnap = addSnapCandidate(
        point,
        { type: 'endpoint', key: 'insertionPoint', point: reference.insertionPoint },
        tolerance,
        bestSnap,
      );
    }

    for (const entity of sourceSnapEntities.filter((candidate) =>
      candidate.type === 'DIMENSION' && candidate !== options.ignoreEntity)) {
      for (const candidate of dimensionReferencePoints(entity)) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }
        bestSnap = addSnapCandidate(point, { ...candidate, entity }, tolerance, bestSnap);
      }
    }

    for (const entity of lineEntities) {
      const ignoredKey = entity === options.ignoreEntity ? options.ignoreKey : null;
      const candidates = [
        { type: 'endpoint', key: 'start', point: entity.start },
        { type: 'endpoint', key: 'end', point: entity.end },
        { type: 'midpoint', point: entityMidpoint(entity) },
      ].filter((candidate) => candidate.key !== ignoredKey);

      for (const candidate of candidates) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }
        bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
      }
    }

    for (const entity of snapEntities.filter((candidate) => candidate.type === 'POLYLINE')) {
      for (const candidate of polylineReferencePoints(entity)) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }
        bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
      }
    }

    if (draftPolyline) {
      for (const candidate of polylineReferencePoints(draftPolyline)) {
        if (!boundsContainsPoint(cursorBounds, candidate.point)) {
          continue;
        }
        bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
      }
    }

    for (let firstIndex = 0; firstIndex < nearbySnapEntities.length - 1; firstIndex += 1) {
      const first = nearbySnapEntities[firstIndex];

      for (let secondIndex = firstIndex + 1; secondIndex < nearbySnapEntities.length; secondIndex += 1) {
        const second = nearbySnapEntities[secondIndex];
        for (const intersection of entityIntersectionPoints(first, second)) {
          if (
            options.axisLine &&
            distancePointToInfiniteLine(intersection, options.axisLine.point, options.axisLine.direction) > tolerance
          ) {
            continue;
          }

          bestSnap = addSnapCandidate(
            point,
            { type: 'intersection', point: intersection },
            tolerance,
            bestSnap,
          );
        }
      }
    }

    for (const draftPart of nearbyDraftParts) {
      for (const entity of nearbySnapEntities) {
        for (const intersection of entityIntersectionPoints(draftPart, entity)) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'intersection', point: intersection },
            tolerance,
            bestSnap,
          );
        }
      }
    }

    for (let firstIndex = 0; firstIndex < nearbyDraftParts.length - 1; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < nearbyDraftParts.length; secondIndex += 1) {
        for (const intersection of entityIntersectionPoints(
          nearbyDraftParts[firstIndex],
          nearbyDraftParts[secondIndex],
        )) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'intersection', point: intersection },
            tolerance,
            bestSnap,
          );
        }
      }
    }

    if (options.axisLine) {
      for (const entity of nearbyLineEntities) {
        const axisIntersection = infiniteLineSegmentIntersection(
          options.axisLine.point,
          options.axisLine.direction,
          entity,
        );
        if (!axisIntersection) {
          continue;
        }

        bestSnap = addSnapCandidate(
          point,
          { type: 'intersection', point: axisIntersection },
          tolerance,
          bestSnap,
        );
      }
    }

    if (options.origin) {
      for (const entity of nearbyLineEntities) {
        const perpendicularFoot = perpendicularFootOnSegment(options.origin, entity);
        if (!perpendicularFoot) {
          continue;
        }

        bestSnap = addSnapCandidate(
          point,
          { type: 'perpendicular', point: perpendicularFoot },
          tolerance,
          bestSnap,
        );
      }
      for (const entity of nearbySnapEntities.filter((candidate) => candidate.type === 'POLYLINE')) {
        for (const segment of polylineSegmentEntities(entity).filter((candidate) => candidate.type === 'LINE')) {
          const perpendicularFoot = perpendicularFootOnSegment(options.origin, segment);
          if (perpendicularFoot) {
            bestSnap = addSnapCandidate(
              point,
              { type: 'perpendicular', point: perpendicularFoot },
              tolerance,
              bestSnap,
            );
          }
        }
      }
      for (const segment of nearbyDraftParts.filter((candidate) => candidate.type === 'LINE')) {
        const perpendicularFoot = perpendicularFootOnSegment(options.origin, segment);
        if (perpendicularFoot) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'perpendicular', point: perpendicularFoot },
            tolerance,
            bestSnap,
          );
        }
      }
    }

    for (const entity of snapEntities) {
      if (entity === options.ignoreEntity) {
        continue;
      }
      if (!isCircularEntity(entity)) {
        continue;
      }

      for (const candidate of circularReferencePoints(entity)) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }
        bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
      }
    }

    return bestSnap;
  }

  function activeDraftOrigin(state) {
    if (state.pendingLineStart) {
      return state.pendingLineStart;
    }
    if (state.rectangleDraft?.firstPoint) {
      return state.rectangleDraft.firstPoint;
    }
    if (state.polylineDraft?.vertices.length) {
      return state.polylineDraft.vertices[state.polylineDraft.vertices.length - 1];
    }
    if (state.dimensionDraft?.phase === 'placement') {
      return dimensionPlacementOrigin(state.dimensionDraft);
    }
    if (state.circleDraft?.mode === 'center-radius' && state.circleDraft.points.length === 1) {
      return state.circleDraft.points[0];
    }
    if (
      (state.arcDraft?.mode === 'center-radius' || state.arcDraft?.mode === 'center-start-end') &&
      state.arcDraft.points.length >= 1
    ) {
      return state.arcDraft.points[0];
    }
    if (state.copyDraft?.basePoint) {
      return state.copyDraft.basePoint;
    }
    if (state.moveDraft?.basePoint) {
      return state.moveDraft.basePoint;
    }
    if (state.rotateDraft?.basePoint) {
      return state.rotateDraft.basePoint;
    }
    if (state.mirrorDraft?.firstPoint) {
      return state.mirrorDraft.firstPoint;
    }
    return null;
  }

  function resolveCursorPoint(point, state) {
    if (!point) {
      return null;
    }

    const origin = activeDraftOrigin(state);
    const objectSnap = objectSnapPoint(point, state, { origin });
    state.activeObjectSnap = objectSnap;

    let nextPoint = objectSnap
      ? { ...objectSnap.point }
      : state.snapEnabled ? snapPoint(point, getGridBase()) : { ...point };
    if (!objectSnap && state.orthoEnabled && origin) {
      nextPoint = orthoPoint(origin, nextPoint);
    }
    return nextPoint;
  }

  function resolvePointForState(point, state, origin = null, options = {}) {
    if (!point) {
      return null;
    }

    const ignoreEntity = state.selectedGrip?.entity || null;
    const ignoreKey = state.selectedGrip?.key || null;
    const objectSnap = objectSnapPoint(point, state, { ignoreEntity, ignoreKey, origin, ...options });
    state.activeObjectSnap = objectSnap;

    let nextPoint = objectSnap
      ? { ...objectSnap.point }
      : state.snapEnabled ? snapPoint(point, getGridBase()) : { ...point };
    if (!objectSnap && state.orthoEnabled && origin) {
      nextPoint = orthoPoint(origin, nextPoint);
    }
    return nextPoint;
  }

  return {
    activeDraftOrigin,
    objectSnapPoint,
    resolveCursorPoint,
    resolvePointForState,
  };
}

export function parseDistanceInput(value) {
  const normalized = value.replace(',', '.');
  const distanceValue = Number(normalized);
  return Number.isFinite(distanceValue) && distanceValue > 0 ? distanceValue : null;
}

export function parseAngleInput(value) {
  const normalized = value.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
    return null;
  }
  const angle = Number(normalized);
  return Number.isFinite(angle) ? angle : null;
}

export function parseRelativeCoordinateInput(value) {
  const match = value.trim().match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))$/);
  if (!match) {
    return null;
  }

  const x = Number(match[1]);
  const y = Number(match[2]);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

export function pointFromRelativeCoordinates(origin, value) {
  const relative = parseRelativeCoordinateInput(value);
  return relative && origin
    ? { x: origin.x + relative.x, y: origin.y + relative.y }
    : null;
}

export function parseCopyMultiplier(value) {
  const match = value.trim().match(/^x(\d+)$/i);
  if (!match) {
    return null;
  }

  const count = Number(match[1]);
  return Number.isInteger(count) && count >= 2 ? count : null;
}

export function pointFromDistance(start, directionPoint, distanceValue) {
  const deltaX = directionPoint.x - start.x;
  const deltaY = directionPoint.y - start.y;
  const directionLength = Math.hypot(deltaX, deltaY);
  if (directionLength <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: start.x + (deltaX / directionLength) * distanceValue,
    y: start.y + (deltaY / directionLength) * distanceValue,
  };
}

export function circleFromThreePoints(first, second, third) {
  const determinant = 2 * (
    first.x * (second.y - third.y) +
    second.x * (third.y - first.y) +
    third.x * (first.y - second.y)
  );

  if (Math.abs(determinant) <= SNAP_THRESHOLD) {
    return null;
  }

  const firstSquared = first.x * first.x + first.y * first.y;
  const secondSquared = second.x * second.x + second.y * second.y;
  const thirdSquared = third.x * third.x + third.y * third.y;
  const center = {
    x: (
      firstSquared * (second.y - third.y) +
      secondSquared * (third.y - first.y) +
      thirdSquared * (first.y - second.y)
    ) / determinant,
    y: (
      firstSquared * (third.x - second.x) +
      secondSquared * (first.x - third.x) +
      thirdSquared * (second.x - first.x)
    ) / determinant,
  };
  const radius = distance(center, first);

  if (!Number.isFinite(radius) || radius <= SNAP_THRESHOLD) {
    return null;
  }

  return { center, radius };
}

export function arcFromThreePoints(start, mid, end) {
  const circle = circleFromThreePoints(start, mid, end);
  if (!circle) {
    return null;
  }

  const startAngle = angleOfPoint(circle.center, start);
  const midAngle = angleOfPoint(circle.center, mid);
  const endAngle = angleOfPoint(circle.center, end);
  if (angleInSweep(midAngle, startAngle, endAngle)) {
    return { ...circle, startAngle, endAngle };
  }

  return { ...circle, startAngle: endAngle, endAngle: startAngle };
}

export function arcFromCenterStartEnd(center, startPoint, endPoint) {
  const radius = distance(center, startPoint);
  if (radius <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    center,
    radius,
    startAngle: angleOfPoint(center, startPoint),
    endAngle: angleOfPoint(center, endPoint),
  };
}

export function pointOnRadiusFromAngle(center, radius, anglePoint) {
  const angle = angleOfPoint(center, anglePoint);
  return pointAtCircleAngle({ center, radius }, angle);
}

export function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return Math.abs(value) >= 1000
    ? value.toFixed(0)
    : value.toFixed(2).replace(/\.00$/, '');
}

export function formatSnapType(type) {
  if (type === 'endpoint') {
    return 'Punto final';
  }
  if (type === 'midpoint') {
    return 'Punto medio';
  }
  if (type === 'intersection') {
    return 'Interseccion';
  }
  if (type === 'perpendicular') {
    return 'Perpendicular';
  }
  if (type === 'center') {
    return 'Centro';
  }
  if (type === 'quadrant') {
    return 'Cuadrante';
  }
  return 'Snap';
}

/*
 * webCAD - Captura y resolucion de snaps
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
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
} from '../geometry.js';
import { coordinateZ } from '../coordinates/point3.js';
import {
  isCircularEntity,
  pointOnCircularEntity,
} from '../intersections.js';
import { snapPoint } from './coordinates.js';
import { inferenceAxisLine as inferenceAxisLineFor } from './inference.js';
import { ellipseReferencePoints, isEllipseEntity } from '../ellipse/geometry.js';

export function addSnapCandidate(point, candidate, tolerance, currentBest) {
  const snapDistance = distance(point, candidate.point);
  if (snapDistance > tolerance) {
    return currentBest;
  }

  if (!currentBest || snapDistance < currentBest.distance) {
    return {
      ...candidate,
      point: { x: candidate.point.x, y: candidate.point.y, z: coordinateZ(candidate.point) },
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
    { type: 'quadrant', key: 'quadrant-0', point: { x: entity.center.x + entity.radius, y: entity.center.y, z: coordinateZ(entity.center) } },
    { type: 'quadrant', key: 'quadrant-1', point: { x: entity.center.x, y: entity.center.y + entity.radius, z: coordinateZ(entity.center) } },
    { type: 'quadrant', key: 'quadrant-2', point: { x: entity.center.x - entity.radius, y: entity.center.y, z: coordinateZ(entity.center) } },
    { type: 'quadrant', key: 'quadrant-3', point: { x: entity.center.x, y: entity.center.y - entity.radius, z: coordinateZ(entity.center) } },
  ];
  return candidates.filter((candidate) => pointOnCircularEntity(candidate.point, entity));
}

function perpendicularFootOnInfiniteEntity(origin, entity) {
  const direction = entity?.direction;
  const basePoint = entity?.basePoint;
  if (!origin || !basePoint || !direction) return null;
  const lengthSquared = direction.x * direction.x + direction.y * direction.y;
  if (lengthSquared <= 1e-12) return null;
  const factor = (
    (origin.x - basePoint.x) * direction.x +
    (origin.y - basePoint.y) * direction.y
  ) / lengthSquared;
  return {
    x: basePoint.x + direction.x * factor,
    y: basePoint.y + direction.y * factor,
    z: coordinateZ(basePoint) + coordinateZ(direction) * factor,
  };
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
  inference,
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
      .filter((entity) => entity.type === 'LINE' || entity.type === 'XLINE' || entity.type === 'POLYLINE' ||
        isCircularEntity(entity) || isEllipseEntity(entity));
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

    for (const entity of snapEntities.filter((candidate) => candidate.type === 'XLINE')) {
      bestSnap = addSnapCandidate(
        point,
        { type: 'endpoint', key: 'basePoint', point: entity.basePoint, entity },
        tolerance,
        bestSnap,
      );
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
      const inferenceAxis = {
        type: 'XLINE',
        basePoint: options.axisLine.point,
        direction: options.axisLine.direction,
      };
      for (const entity of nearbySnapEntities) {
        for (const axisIntersection of entityIntersectionPoints(inferenceAxis, entity)) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'intersection', point: axisIntersection },
            tolerance,
            bestSnap,
          );
        }
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
      for (const entity of nearbySnapEntities.filter((candidate) => candidate.type === 'XLINE')) {
        const perpendicularFoot = perpendicularFootOnInfiniteEntity(options.origin, entity);
        if (perpendicularFoot) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'perpendicular', point: perpendicularFoot, entity },
            tolerance,
            bestSnap,
          );
        }
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

    for (const entity of snapEntities.filter(isEllipseEntity)) {
      for (const candidate of ellipseReferencePoints(entity)) {
        if (options.axisLine &&
            distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance) {
          continue;
        }
        bestSnap = addSnapCandidate(point, { ...candidate, entity }, tolerance, bestSnap);
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
    if (state.regularPolygonDraft?.center) {
      return state.regularPolygonDraft.center;
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
    if (state.stretchDraft?.basePoint) {
      return state.stretchDraft.basePoint;
    }
    if (state.scaleDraft?.basePoint) {
      return state.scaleDraft.basePoint;
    }
    if (state.rotateDraft?.basePoint) {
      return state.rotateDraft.basePoint;
    }
    if (state.mirrorDraft?.firstPoint) {
      return state.mirrorDraft.firstPoint;
    }
    if (state.imageCalibrationDraft?.phase === 'source-end') {
      return state.imageCalibrationDraft.sourceStart;
    }
    if (state.xlineDraft?.firstPoint) {
      return state.xlineDraft.firstPoint;
    }
    if (state.circleDraft?.mode === '3p' && state.circleDraft.points.length) {
      return state.circleDraft.points[state.circleDraft.points.length - 1];
    }
    if (state.arcDraft?.mode === '3p' && state.arcDraft.points.length) {
      return state.arcDraft.points[state.arcDraft.points.length - 1];
    }
    if (state.ellipseDraft?.points.length) {
      if (state.ellipseDraft.points.length >= 2) {
        const [first, second] = state.ellipseDraft.points;
        return {
          x: (first.x + second.x) * 0.5,
          y: (first.y + second.y) * 0.5,
          z: (coordinateZ(first) + coordinateZ(second)) * 0.5,
        };
      }
      return state.ellipseDraft.points[0];
    }
    if (state.dimensionDraft?.points?.length && state.dimensionDraft.phase !== 'placement') {
      return state.dimensionDraft.points[state.dimensionDraft.points.length - 1];
    }
    return null;
  }

  function resolveCursorPoint(point, state) {
    if (!point) {
      return null;
    }

    const origin = activeDraftOrigin(state);
    const axis = inference?.axisFor(point, state, origin) || null;
    const axisLine = state.shiftKeyDown ? inferenceAxisLineFor(axis, origin) : null;
    const objectSnap = objectSnapPoint(point, state, { origin, ...(axisLine ? { axisLine } : {}) });
    state.activeObjectSnap = objectSnap;

    let nextPoint = objectSnap
      ? { ...objectSnap.point }
      : state.snapEnabled ? snapPoint(point, getGridBase()) : { ...point };
    if (!objectSnap && state.orthoEnabled && origin) {
      nextPoint = orthoPoint(origin, nextPoint);
    }
    return inference?.constrain(nextPoint, state, origin, axis, { objectSnap }) || nextPoint;
  }

  function resolvePointForState(point, state, origin = null, options = {}) {
    if (!point) {
      return null;
    }

    const ignoreEntity = state.selectedGrip?.entity || null;
    const ignoreKey = state.selectedGrip?.key || null;
    const inferenceDisabled = Boolean(options.axisLine || state.selectedGrip);
    const axis = inference?.axisFor(point, state, origin, { disabled: inferenceDisabled }) || null;
    const inferredAxisLine = state.shiftKeyDown ? inferenceAxisLineFor(axis, origin) : null;
    const objectSnap = objectSnapPoint(point, state, {
      ignoreEntity,
      ignoreKey,
      origin,
      ...options,
      ...(inferredAxisLine && !options.axisLine ? { axisLine: inferredAxisLine } : {}),
    });
    state.activeObjectSnap = objectSnap;

    let nextPoint = objectSnap
      ? { ...objectSnap.point }
      : state.snapEnabled ? snapPoint(point, getGridBase()) : { ...point };
    if (!objectSnap && state.orthoEnabled && origin) {
      nextPoint = orthoPoint(origin, nextPoint);
    }
    return inference?.constrain(nextPoint, state, origin, axis, { objectSnap }) || nextPoint;
  }

  return {
    activeDraftOrigin,
    objectSnapPoint,
    resolveCursorPoint,
    resolvePointForState,
  };
}

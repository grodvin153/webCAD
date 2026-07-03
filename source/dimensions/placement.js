/*
 * webCAD - Colocacion interactiva de cotas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createDimensionPlacement(dependencies) {
  const {
    DimensionEntity,
    SNAP_THRESHOLD,
    activeLayerName,
    activeLineColorId,
    distance,
    distancePointToInfiniteLine,
    getState,
    normalizedVector,
    parseDistanceInput,
    pointFromRelativeCoordinates,
  } = dependencies;

  function dimensionPlacementOrigin(draft) {
    return draft?.points?.[0] || null;
  }

  function dimensionPlacementDistance(draft, placement) {
    if (!draft?.points?.length || !placement) {
      return null;
    }
    const origin = draft.points[0];
    if (draft.kind === 'horizontal') {
      return Math.abs(placement.y - origin.y);
    }
    if (draft.kind === 'vertical') {
      return Math.abs(placement.x - origin.x);
    }
    if (draft.kind === 'aligned' && draft.points[1]) {
      return distancePointToInfiniteLine(placement, origin, {
        x: draft.points[1].x - origin.x,
        y: draft.points[1].y - origin.y,
      });
    }
    if ((draft.kind === 'radius' || draft.kind === 'diameter') && draft.points[1]) {
      return Math.max(0, distance(origin, placement) - distance(origin, draft.points[1]));
    }
    if (draft.kind === 'angular') {
      return distance(origin, placement);
    }
    return null;
  }

  function dimensionPlacementPoint(draft, cursor, currentState) {
    if (!draft || !cursor || draft.phase !== 'placement') {
      return cursor;
    }
    const origin = dimensionPlacementOrigin(draft);
    const coordinateTarget = pointFromRelativeCoordinates(origin, currentState.distanceInput);
    if (coordinateTarget) {
      draft.suggestionActive = false;
      return coordinateTarget;
    }
    let inputDistance = parseDistanceInput(currentState.distanceInput);
    draft.suggestionActive = false;
    if (
      inputDistance === null &&
      !currentState.activeObjectSnap &&
      Number.isFinite(draft.suggestedOffset) &&
      draft.suggestedOffset > SNAP_THRESHOLD
    ) {
      const cursorDistance = dimensionPlacementDistance(draft, cursor);
      const suggestionTolerance = (currentState.snapPixelTolerance || 10) / currentState.viewScale;
      if (
        Number.isFinite(cursorDistance) &&
        Math.abs(cursorDistance - draft.suggestedOffset) <= suggestionTolerance
      ) {
        inputDistance = draft.suggestedOffset;
        draft.suggestionActive = true;
      }
    }
    if (inputDistance === null || !origin) {
      return cursor;
    }
    if (draft.kind === 'horizontal') {
      const side = Math.sign(cursor.y - origin.y) || 1;
      return { x: cursor.x, y: origin.y + side * inputDistance };
    }
    if (draft.kind === 'vertical') {
      const side = Math.sign(cursor.x - origin.x) || 1;
      return { x: origin.x + side * inputDistance, y: cursor.y };
    }
    if (draft.kind === 'aligned' && draft.points[1]) {
      const direction = normalizedVector(draft.points[0], draft.points[1]);
      if (direction) {
        const normal = { x: -direction.y, y: direction.x };
        const side = Math.sign((cursor.x - origin.x) * normal.x + (cursor.y - origin.y) * normal.y) || 1;
        return { x: origin.x + normal.x * inputDistance * side, y: origin.y + normal.y * inputDistance * side };
      }
    }
    const direction = normalizedVector(origin, cursor) || { x: 1, y: 0 };
    const radialOffset = draft.kind === 'radius' || draft.kind === 'diameter'
      ? distance(draft.points[0], draft.points[1]) + inputDistance
      : inputDistance;
    return {
      x: origin.x + direction.x * radialOffset,
      y: origin.y + direction.y * radialOffset,
    };
  }

  function dimensionDraftEntity(draft, placement) {
    const state = getState();
    if (!draft || draft.phase !== 'placement' || !placement) {
      return null;
    }
    return new DimensionEntity(draft.kind, draft.points, placement, {
      layer: activeLayerName(),
      lineColor: activeLineColorId(),
      dimensionStyle: state.dimensionStyle,
    });
  }

  return {
    dimensionPlacementOrigin,
    dimensionPlacementDistance,
    dimensionPlacementPoint,
    dimensionDraftEntity,
  };
}

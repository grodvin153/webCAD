/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createLineTrimOperations(dependencies) {
  const {
    LineEntity,
    SNAP_THRESHOLD,
    closestPointOnLineSegment,
    entityIntersectionPoints,
    lineParameter,
    pointAtLineParameter,
    uniqueSortedParameters,
  } = dependencies;

  function trimLineEntityAtPoint(doc, entity, pickPoint) {
    if (!doc || !entity || entity.type !== 'LINE') {
      return { trimmed: false, keptCount: 0 };
    }

    const breakParameters = [0, 1];
    for (const otherEntity of doc.queryBounds(entity.bounds())) {
      if (otherEntity === entity) {
        continue;
      }

      for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
        const parameter = lineParameter(entity, intersection);
        if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
          breakParameters.push(parameter);
        }
      }
    }

    const sortedParameters = uniqueSortedParameters(breakParameters);
    if (sortedParameters.length < 2) {
      return { trimmed: false, keptCount: 0 };
    }

    const projectedPick = closestPointOnLineSegment(entity, pickPoint);
    const pickParameter = lineParameter(entity, projectedPick);
    let trimIndex = 0;
    for (let index = 0; index < sortedParameters.length - 1; index += 1) {
      if (pickParameter >= sortedParameters[index] - SNAP_THRESHOLD &&
          pickParameter <= sortedParameters[index + 1] + SNAP_THRESHOLD) {
        trimIndex = index;
        break;
      }
    }

    const trimStart = sortedParameters[trimIndex];
    const trimEnd = sortedParameters[trimIndex + 1];
    const replacements = [];
    const addRemainder = (startParameter, endParameter) => {
      if (endParameter - startParameter <= SNAP_THRESHOLD) return;
      replacements.push(new LineEntity(
        pointAtLineParameter(entity, startParameter),
        pointAtLineParameter(entity, endParameter),
        {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
        },
      ));
    };

    // Intersecciones intermedias no dividen un resto que sigue siendo continuo.
    addRemainder(0, trimStart);
    addRemainder(trimEnd, 1);

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length };
  }

  return {
    trimLineEntityAtPoint,
  };
}

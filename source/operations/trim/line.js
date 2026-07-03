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

    const replacements = [];
    for (let index = 0; index < sortedParameters.length - 1; index += 1) {
      if (index === trimIndex) {
        continue;
      }

      const startParameter = sortedParameters[index];
      const endParameter = sortedParameters[index + 1];
      if (endParameter - startParameter <= SNAP_THRESHOLD) {
        continue;
      }

      replacements.push(new LineEntity(
        pointAtLineParameter(entity, startParameter),
        pointAtLineParameter(entity, endParameter),
        { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor },
      ));
    }

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length };
  }

  return {
    trimLineEntityAtPoint,
  };
}

/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createCircularTrimOperations(dependencies) {
  const {
    ArcEntity,
    SNAP_THRESHOLD,
    TWO_PI,
    arcSweep,
    circularParameter,
    directedArcSweep,
    entityArcSweep,
    entityIntersectionPoints,
    isCircularEntity,
    uniqueSortedParameters,
  } = dependencies;

  function createArcFromParameters(entity, startParameter, endParameter) {
    if (entity.type === 'CIRCLE') {
      const startAngle = startParameter * TWO_PI;
      const endAngle = endParameter * TWO_PI;
      if (arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
        return null;
      }
      return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, {
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
        layer: entity.layer,
      });
    }

    const sweep = entityArcSweep(entity);
    const direction = entity.clockwise === false ? -1 : 1;
    const startAngle = entity.startAngle + direction * sweep * startParameter;
    const endAngle = entity.startAngle + direction * sweep * endParameter;
    if (directedArcSweep(startAngle, endAngle, entity.clockwise !== false) <= SNAP_THRESHOLD) {
      return null;
    }
    return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, {
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
      layer: entity.layer,
      clockwise: entity.clockwise !== false,
    });
  }

  function trimCircularEntityAtPoint(doc, entity, pickPoint) {
    if (!doc || !isCircularEntity(entity)) {
      return { trimmed: false, keptCount: 0 };
    }

    if (entity.type === 'CIRCLE') {
      const breakParameters = [];
      for (const otherEntity of doc.queryBounds(entity.bounds())) {
        if (otherEntity === entity) {
          continue;
        }

        for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
          breakParameters.push(circularParameter(entity, intersection));
        }
      }

      const sortedParameters = uniqueSortedParameters(breakParameters);
      if (sortedParameters.length < 2) {
        const removed = doc.removeEntity(entity);
        return { trimmed: removed, keptCount: 0 };
      }

      const pickParameter = circularParameter(entity, pickPoint);
      const intervals = sortedParameters.map((startParameter, index) => {
        const endParameter = sortedParameters[(index + 1) % sortedParameters.length];
        return {
          startParameter,
          endParameter,
          wraps: index === sortedParameters.length - 1,
        };
      });

      const trimIndex = intervals.findIndex((interval) => interval.wraps
        ? pickParameter >= interval.startParameter - SNAP_THRESHOLD ||
          pickParameter <= interval.endParameter + SNAP_THRESHOLD
        : pickParameter >= interval.startParameter - SNAP_THRESHOLD &&
          pickParameter <= interval.endParameter + SNAP_THRESHOLD);

      const replacements = [];
      intervals.forEach((interval, index) => {
        if (index === trimIndex) {
          return;
        }
        const arc = createArcFromParameters(entity, interval.startParameter, interval.endParameter);
        if (arc) {
          replacements.push(arc);
        }
      });

      const replaced = doc.replaceEntity(entity, replacements);
      return { trimmed: replaced, keptCount: replacements.length };
    }

    const breakParameters = [0, 1];
    for (const otherEntity of doc.queryBounds(entity.bounds())) {
      if (otherEntity === entity) {
        continue;
      }

      for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
        const parameter = circularParameter(entity, intersection);
        if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
          breakParameters.push(parameter);
        }
      }
    }

    const sortedParameters = uniqueSortedParameters(breakParameters);
    const pickParameter = circularParameter(entity, pickPoint);
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

      const arc = createArcFromParameters(entity, startParameter, endParameter);
      if (arc) {
        replacements.push(arc);
      }
    }

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length };
  }

  return {
    createArcFromParameters,
    trimCircularEntityAtPoint,
  };
}

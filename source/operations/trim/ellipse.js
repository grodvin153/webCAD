/* webCAD - Recorte exacto de elipses | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../../config.js';
import {
  ellipseNormalizedParameter,
  ellipseParameterAtNormalized,
  ellipseSweep,
  isEllipseEntity,
} from '../../ellipse/geometry.js';

function uniqueSorted(values) {
  return values
    .filter((value, index, all) => all.findIndex((candidate) => Math.abs(candidate - value) <= SNAP_THRESHOLD) === index)
    .sort((first, second) => first - second);
}

export function createEllipseTrimOperations({ EllipseEntity, entityIntersectionPoints }) {
  function createArc(entity, start, end) {
    if (end - start <= SNAP_THRESHOLD) return null;
    return new EllipseEntity(entity.center, entity.radiusX, entity.radiusY, entity.rotation, {
      layer: entity.layer,
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
      clockwise: entity.clockwise !== false,
      startParameter: ellipseParameterAtNormalized(entity, start),
      endParameter: ellipseParameterAtNormalized(entity, end),
    });
  }

  function trimEllipseEntityAtPoint(doc, entity, pickPoint) {
    if (!doc || !isEllipseEntity(entity)) return { trimmed: false, keptCount: 0 };
    const parameters = entity.type === 'ELLIPSE_ARC' ? [0, 1] : [];
    for (const other of doc.queryBounds(entity.bounds())) {
      if (other === entity) continue;
      for (const point of entityIntersectionPoints(entity, other)) {
        const parameter = ellipseNormalizedParameter(entity, point);
        if (entity.type === 'ELLIPSE' || (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD)) {
          parameters.push(parameter);
        }
      }
    }
    const breaks = uniqueSorted(parameters);
    if (entity.type === 'ELLIPSE') {
      if (breaks.length < 2) {
        const removed = doc.removeEntity(entity);
        return { trimmed: removed, keptCount: 0 };
      }
      const pick = ellipseNormalizedParameter(entity, pickPoint);
      const intervals = breaks.map((start, index) => ({ start, end: breaks[(index + 1) % breaks.length], wrap: index === breaks.length - 1 }));
      const interval = intervals.find((candidate) => candidate.wrap
        ? pick >= candidate.start - SNAP_THRESHOLD || pick <= candidate.end + SNAP_THRESHOLD
        : pick >= candidate.start - SNAP_THRESHOLD && pick <= candidate.end + SNAP_THRESHOLD);
      const replacement = interval
        ? new EllipseEntity(entity.center, entity.radiusX, entity.radiusY, entity.rotation, {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          startParameter: interval.end * Math.PI * 2,
          endParameter: interval.start * Math.PI * 2,
        })
        : null;
      const replacements = replacement ? [replacement] : [];
      return { trimmed: doc.replaceEntity(entity, replacements), keptCount: replacements.length };
    }
    if (breaks.length < 2 || ellipseSweep(entity) <= SNAP_THRESHOLD) return { trimmed: false, keptCount: 1 };
    const pick = ellipseNormalizedParameter(entity, pickPoint);
    let trimIndex = 0;
    for (let index = 0; index < breaks.length - 1; index += 1) {
      if (pick >= breaks[index] - SNAP_THRESHOLD && pick <= breaks[index + 1] + SNAP_THRESHOLD) {
        trimIndex = index;
        break;
      }
    }
    const replacements = [createArc(entity, 0, breaks[trimIndex]), createArc(entity, breaks[trimIndex + 1], 1)].filter(Boolean);
    return { trimmed: doc.replaceEntity(entity, replacements), keptCount: replacements.length };
  }

  return { trimEllipseEntityAtPoint };
}

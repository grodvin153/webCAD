/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createTrimOperations(dependencies) {
  const {
    trimCircularEntityAtPoint,
    trimHatchEntityAtPoint,
    trimLineEntityAtPoint,
    trimLineGroupAtPoint,
    trimPolylineEntityAtPoint,
  } = dependencies;

  function trimEntityAtPoint(doc, entity, pickPoint) {
    if (!doc || !entity) {
      return { trimmed: false, keptCount: 0, grouped: false };
    }

    if (entity.groupId) {
      return trimLineGroupAtPoint(doc, entity, pickPoint);
    }

    if (entity.type === 'HATCH') {
      return trimHatchEntityAtPoint(doc, entity, pickPoint);
    }

    if (entity.type === 'POLYLINE') {
      return trimPolylineEntityAtPoint(doc, entity, pickPoint);
    }

    if (entity.type === 'LINE') {
      return trimLineEntityAtPoint(doc, entity, pickPoint);
    }

    return trimCircularEntityAtPoint(doc, entity, pickPoint);
  }

  return {
    trimEntityAtPoint,
  };
}

/*
 * webCAD - Intersecciones adaptadas a entidades compuestas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createSelectionIntersections({
  intersectEntities,
  intersectFullCircleBoundary,
  primitiveEntityParts,
}) {
  return {
    entityIntersectionPoints(first, second) {
      return intersectEntities(first, second, primitiveEntityParts);
    },
    fullCircleBoundaryIntersectionPoints(circularEntity, boundary) {
      return intersectFullCircleBoundary(circularEntity, boundary, primitiveEntityParts);
    },
  };
}

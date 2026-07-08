/* webCAD - Geometria de matriz polar | SPDX-License-Identifier: GPL-3.0-or-later */

export function polarArrayAngles(count) {
  const total = Math.max(2, Math.trunc(Number(count) || 0));
  return Array.from({ length: total - 1 }, (_, index) => 360 * (index + 1) / total);
}

export function createPolarArrayCopies({ entities, center, count, cloneEntities, rotateEntity }) {
  if (!entities?.length || !center) return [];
  return polarArrayAngles(count).flatMap((angle) => {
    const copies = cloneEntities(entities);
    copies.forEach((entity) => rotateEntity(entity, center, angle));
    return copies;
  });
}

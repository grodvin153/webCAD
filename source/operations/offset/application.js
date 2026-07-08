/* webCAD - Aplicacion documental de equidistancias | SPDX-License-Identifier: GPL-3.0-or-later */

export function createOffsetApplication({ offsetEntity, factories }) {
  function preview(entity, pickPoint, sidePoint, distance) {
    return offsetEntity(entity, pickPoint, sidePoint, distance, factories);
  }

  function apply(doc, entity, pickPoint, sidePoint, distance) {
    const result = preview(entity, pickPoint, sidePoint, distance);
    if (!result) return false;
    doc.addEntity(result);
    doc.clearSelection();
    return result;
  }

  return { apply, preview };
}

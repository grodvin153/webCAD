/* webCAD - Orden Recortar | SPDX-License-Identifier: GPL-3.0-or-later */

function trimResultMessage(result) {
  if (!result?.trimmed) return 'No se pudo recortar';
  if (result.hatch) return 'Sombreado recortado';
  if (result.polylineSegment) {
    const count = result.remainingSegments;
    return `Tramo de polilinea eliminado · quedan ${count} tramo${count === 1 ? '' : 's'}`;
  }
  if (result.grouped) {
    const count = result.keptCount;
    return `Polilinea recortada en bloque - quedan ${count} componente${count === 1 ? '' : 's'}`;
  }
  const count = result.keptCount;
  return `Tramo recortado - quedan ${count} tramo${count === 1 ? '' : 's'}`;
}

export function createTrimCommand({ state, doc, setTool, findEntityAt, trimEntityAtPoint, refresh }) {
  function start() {
    setTool('trim');
    state.statusText = 'Recortar: pique el tramo a eliminar';
    refresh();
    return true;
  }

  function pick(point) {
    const entity = findEntityAt(point);
    if (!entity) {
      state.statusText = 'No hay entidad para recortar';
      refresh();
      return false;
    }
    const result = trimEntityAtPoint(doc, entity, point);
    state.selectedGrip = null;
    state.distanceInput = '';
    state.statusText = trimResultMessage(result);
    refresh();
    return Boolean(result?.trimmed);
  }

  return { pick, start };
}

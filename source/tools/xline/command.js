/* webCAD - Orden de linea infinita XLINE | SPDX-License-Identifier: GPL-3.0-or-later */

import { xlineDirection } from './geometry.js';

export function createXLineCommand({ state, doc, setTool, resolvePoint, keyboardPoint, createXLine, refresh }) {
  function start() {
    setTool('xline');
    state.xlineDraft = { firstPoint: null };
    state.statusText = 'Linea infinita: indique primer punto';
    refresh();
    return true;
  }

  function pick(rawPoint) {
    const draft = state.xlineDraft;
    if (!draft) return false;
    const cursor = resolvePoint(rawPoint, draft.firstPoint);
    const typedPoint = draft.firstPoint && state.distanceInput
      ? keyboardPoint(draft.firstPoint, cursor, state.distanceInput)
      : null;
    if (draft.firstPoint && state.distanceInput && !typedPoint) {
      state.statusText = 'Distancia o coordenadas no validas';
      refresh();
      return false;
    }
    const point = typedPoint || cursor;
    if (!point) return false;
    if (!draft.firstPoint) {
      draft.firstPoint = { ...point };
      state.statusText = 'Linea infinita: indique segundo punto para definir la direccion';
      refresh();
      return true;
    }
    const direction = xlineDirection(draft.firstPoint, point);
    if (!direction) {
      state.statusText = 'Los dos puntos deben ser distintos';
      refresh();
      return false;
    }
    doc.addEntity(createXLine(draft.firstPoint, direction));
    state.distanceInput = '';
    setTool('select');
    state.statusText = 'Linea infinita creada';
    refresh();
    return true;
  }

  function preview(rawPoint) {
    const draft = state.xlineDraft;
    if (!draft || !rawPoint) return null;
    const cursor = resolvePoint(rawPoint, draft.firstPoint);
    const point = draft.firstPoint
      ? keyboardPoint(draft.firstPoint, cursor, state.distanceInput) || cursor
      : cursor;
    if (!draft.firstPoint) return null;
    const direction = xlineDirection(draft.firstPoint, point);
    return direction ? { basePoint: draft.firstPoint, direction } : null;
  }

  return { pick, preview, start };
}

/* webCAD - Orden Equidistancia | SPDX-License-Identifier: GPL-3.0-or-later */

export function createOffsetCommand({ state, setTool, findEntityAt, distanceValue, application, refresh }) {
  function start() {
    setTool('offset');
    state.offsetDraft = { entity: null, pickPoint: null };
    state.statusText = `Equidistancia ${distanceValue()}: seleccione una entidad`;
    refresh();
  }

  function previewAt(point) {
    const draft = state.offsetDraft;
    if (!draft?.entity || !point) return null;
    return application.preview(draft.entity, draft.pickPoint, point, distanceValue());
  }

  function pick(point) {
    const draft = state.offsetDraft || { entity: null, pickPoint: null };
    if (!draft.entity) {
      const entity = findEntityAt(point);
      if (!entity || !['LINE', 'XLINE', 'CIRCLE', 'ARC', 'POLYLINE'].includes(entity.type)) {
        state.statusText = 'Seleccione una linea, XLINE, circulo, arco o polilinea';
        refresh();
        return false;
      }
      state.offsetDraft = { entity, pickPoint: { ...point } };
      state.statusText = 'Mueva el cursor al lado deseado y haga clic';
      refresh();
      return true;
    }
    const result = application.apply(state.doc, draft.entity, draft.pickPoint, point, distanceValue());
    if (!result) {
      state.statusText = 'No se puede crear la equidistancia en ese lado con esa distancia';
      refresh();
      return false;
    }
    state.offsetDraft = { entity: null, pickPoint: null };
    state.statusText = `Equidistancia creada · seleccione otra entidad (Escape para terminar)`;
    refresh();
    return true;
  }

  return { pick, previewAt, start };
}

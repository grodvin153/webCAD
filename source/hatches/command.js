/* webCAD - Orden Sombreado topologico | SPDX-License-Identifier: GPL-3.0-or-later */

export function createHatchCommand({
  state,
  doc,
  HatchEntity,
  snapThreshold,
  polygonSignedArea,
  boundaryAtPoint,
  setTool,
  openDialog,
  refresh,
}) {
  function start() {
    setTool('hatch');
    openDialog();
    return true;
  }

  function create(boundary) {
    if (!boundary || boundary.length < 3 || Math.abs(polygonSignedArea(boundary)) <= snapThreshold) {
      state.statusText = 'No se encontro un contorno cerrado valido';
      return false;
    }
    const draft = state.hatchDraft;
    const layer = state.layers.find((candidate) => candidate.name === draft?.layer) ||
      state.layers.find((candidate) => candidate.name === state.activeLayer) || state.layers[0];
    doc.addEntity(new HatchEntity(boundary, {
      layer: layer.name,
      lineStyle: layer.lineStyle,
      lineType: layer.lineType,
      lineColor: draft?.lineColor || layer.lineColor,
    }));
    setTool('select');
    doc.clearSelection();
    state.statusText = 'Sombreado solido creado';
    return true;
  }

  function pick(point) {
    if (!state.hatchDraft) {
      openDialog();
      return false;
    }
    const boundary = boundaryAtPoint(doc, point);
    if (!boundary) state.statusText = 'No se encontro un recinto cerrado en ese punto';
    else create(boundary);
    refresh();
    return Boolean(boundary);
  }

  return { create, pick, start };
}

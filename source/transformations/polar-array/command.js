/* webCAD - Orden Matriz polar | SPDX-License-Identifier: GPL-3.0-or-later */

import { createPolarArrayCopies } from './geometry.js';

export function createPolarArrayCommand({
  state,
  doc,
  cloneEntities,
  rotateEntity,
  rememberSelection,
  resolvePoint,
  setTool,
  refresh,
  countValue,
}) {
  function start() {
    const sourceEntities = [...doc.selectedEntities];
    if (sourceEntities.length) rememberSelection(sourceEntities);
    setTool('polar-array');
    state.polarArrayDraft = {
      sourceEntities,
      selecting: !sourceEntities.length,
    };
    state.statusText = sourceEntities.length
      ? `Matriz polar de ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'}: indique centro de giro · OSNAP activo`
      : 'Matriz polar: seleccione objetos y confirme';
    refresh();
    return true;
  }

  function addEntity(entity) {
    if (!state.polarArrayDraft?.selecting || !entity) return false;
    doc.addSelectedEntities([entity]);
    state.statusText = `${doc.selectedEntities.size} entidad${doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${doc.selectedEntities.size === 1 ? '' : 's'} para matriz polar`;
    return true;
  }

  function addEntities(entities) {
    if (!state.polarArrayDraft?.selecting || !entities?.length) return false;
    doc.addSelectedEntities(entities);
    state.statusText = `${doc.selectedEntities.size} entidad${doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${doc.selectedEntities.size === 1 ? '' : 's'} para matriz polar`;
    return true;
  }

  function confirmSelection() {
    const sourceEntities = [...doc.selectedEntities];
    if (!state.polarArrayDraft?.selecting || !sourceEntities.length) {
      state.statusText = 'Seleccione entidades para la matriz polar';
      refresh();
      return false;
    }
    rememberSelection(sourceEntities);
    state.polarArrayDraft = { sourceEntities, selecting: false };
    state.statusText = 'Matriz polar: indique centro de giro · OSNAP activo';
    refresh();
    return true;
  }

  function previewAt(point) {
    const draft = state.polarArrayDraft;
    if (!draft || draft.selecting || !point) return [];
    const center = resolvePoint(point, null);
    return createPolarArrayCopies({
      entities: draft.sourceEntities,
      center,
      count: countValue(),
      cloneEntities,
      rotateEntity,
    });
  }

  function apply(point) {
    const draft = state.polarArrayDraft;
    if (!draft || draft.selecting || !point) return false;
    const center = resolvePoint(point, null);
    const copies = createPolarArrayCopies({
      entities: draft.sourceEntities,
      center,
      count: countValue(),
      cloneEntities,
      rotateEntity,
    });
    if (!copies.length) {
      state.statusText = 'No se pudo crear la matriz polar';
      refresh();
      return false;
    }
    doc.addEntities(copies);
    const count = countValue();
    setTool('select');
    doc.clearSelection();
    state.statusText = `Matriz polar creada · ${count} elementos`;
    refresh();
    return true;
  }

  return { start, addEntity, addEntities, confirmSelection, previewAt, apply };
}

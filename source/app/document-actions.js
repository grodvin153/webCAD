/* webCAD - Acciones del documento y su historial | SPDX-License-Identifier: GPL-3.0-or-later */

export function createDocumentActions({
  state,
  doc,
  controller,
  renderer,
  canvas,
  localFileManager,
  importDxfInput,
  defaultLayers,
  defaultLayer,
  defaultLineStyle,
  defaultLineType,
  defaultLineColor,
  activeDrawingProfile,
  getUnitsLabel,
  orthogonalInference,
  serializeDocumentToDxf,
  syncProperties,
}) {
  function newDrawing() {
    if (state.blockEditDraft) {
      state.statusText = 'Guarde o descarte la edicion del bloque antes de crear un dibujo';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    doc.clear();
    localFileManager?.clearCurrentFile();
    state.layers = defaultLayers.map((layer) => ({ ...layer }));
    state.activeLayer = defaultLayer.name;
    state.activeLineStyle = defaultLineStyle;
    state.activeLineType = defaultLineType;
    state.activeLineColor = defaultLineColor;
    [
      'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'textDraft', 'hatchDraft',
      'circleDraft', 'arcDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft', 'stretchDraft',
      'polarArrayDraft', 'rotateDraft', 'scaleDraft', 'mirrorDraft', 'filletDraft',
      'offsetDraft', 'chamferDraft', 'selectionSetDraft', 'eraseDraft', 'explodeDraft',
      'extendDraft', 'blockCreateDraft', 'blockInsertDraft', 'dimensionDraft', 'imageDraft',
      'imageCalibrationDraft', 'lastCopy', 'selectedGrip',
    ].forEach((key) => { state[key] = null; });
    state.lastTextHeight = activeDrawingProfile().defaultTextHeight;
    state.previousSelection = [];
    state.distanceInput = '';
    orthogonalInference.clear(state);
    state.statusText = `Nuevo dibujo · ${activeDrawingProfile().label} (${getUnitsLabel()})`;
    syncProperties();
    renderer.fitToDocument();
    controller.updateUiStatus();
    renderer.draw();
    return true;
  }

  function exportDxf() {
    const dxf = serializeDocumentToDxf(doc);
    const blob = new Blob([dxf], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing.dxf';
    link.click();
    URL.revokeObjectURL(url);
    state.statusText = `Exportadas ${doc.topLevelEntities().length} entidades DXF`;
    renderer.draw();
  }

  function importDxf() {
    if (state.blockEditDraft) {
      state.statusText = 'Guarde o descarte la edicion del bloque antes de importar';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    importDxfInput.value = '';
    importDxfInput.click();
    return true;
  }

  function resetInteractionState() {
    [
      'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'textDraft', 'hatchDraft',
      'circleDraft', 'arcDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft', 'stretchDraft',
      'polarArrayDraft', 'rotateDraft', 'scaleDraft', 'mirrorDraft', 'filletDraft',
      'offsetDraft', 'chamferDraft', 'selectionSetDraft', 'eraseDraft', 'explodeDraft',
      'extendDraft', 'blockCreateDraft', 'blockInsertDraft', 'dimensionDraft', 'imageDraft',
      'imageCalibrationDraft', 'selectedGrip', 'activeObjectSnap',
    ].forEach((key) => { state[key] = null; });
    state.distanceInput = '';
    orthogonalInference.clear(state);
    controller.gripDragState = null;
    controller.panState = null;
    canvas.classList.remove('is-panning', 'is-dragging');
    controller.setTool('select');
  }

  function undoDrawing() {
    if (!doc.canUndo()) {
      state.statusText = 'No hay nada que deshacer';
      controller.updateUiStatus();
      renderer.draw();
      return;
    }
    resetInteractionState();
    doc.undo();
    state.statusText = 'Deshecho';
    controller.updateUiStatus();
    renderer.draw();
  }

  function redoDrawing() {
    if (!doc.canRedo()) {
      state.statusText = 'No hay nada que rehacer';
      controller.updateUiStatus();
      renderer.draw();
      return;
    }
    resetInteractionState();
    doc.redo();
    state.statusText = 'Rehecho';
    controller.updateUiStatus();
    renderer.draw();
  }

  return { exportDxf, importDxf, newDrawing, redoDrawing, resetInteractionState, undoDrawing };
}

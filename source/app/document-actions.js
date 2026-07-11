/* webCAD - Acciones del documento y su historial | SPDX-License-Identifier: GPL-3.0-or-later */

import { visibleDocumentSolids } from '../3d/stl-exporter.js';

export function createDocumentActions({
  state,
  doc,
  controller,
  renderer,
  canvas,
  localFileManager,
  importDxfInput,
  importWebcadInput,
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
      'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'regularPolygonDraft', 'textDraft', 'hatchDraft',
      'circleDraft', 'arcDraft', 'ellipseDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft', 'stretchDraft',
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

  function openWebcadProject() {
    if (state.blockEditDraft) {
      state.statusText = 'Guarde o descarte la edicion del bloque antes de abrir un proyecto';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    importWebcadInput.value = '';
    importWebcadInput.click();
    return true;
  }

  function saveWebcadProject() {
    void localFileManager.saveAs('webcad');
    return true;
  }

  function exportStl() {
    const visibleSolids = visibleDocumentSolids(doc.model3d);
    if (!visibleSolids.length) {
      state.statusText = 'No hay solidos 3D visibles para exportar a STL';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    void localFileManager.saveAs('stl').then((saved) => {
      if (!saved) return;
      state.statusText =
        `STL exportado · ${visibleSolids.length} solido${visibleSolids.length === 1 ? '' : 's'} · ` +
        'no conserva unidades, curvas exactas, capas ni operaciones';
      controller.updateUiStatus();
      renderer.draw();
    });
    return true;
  }

  function resetInteractionState() {
    [
      'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'regularPolygonDraft', 'textDraft', 'hatchDraft',
      'circleDraft', 'arcDraft', 'ellipseDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft', 'stretchDraft',
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

  return {
    exportDxf,
    exportStl,
    importDxf,
    newDrawing,
    openWebcadProject,
    redoDrawing,
    resetInteractionState,
    saveWebcadProject,
    undoDrawing,
  };
}

/* webCAD - Acciones del documento y su historial | SPDX-License-Identifier: GPL-3.0-or-later */

import { visibleDocumentSolids } from '../3d/stl-exporter.js';

function refreshThreeDocumentView() {
  globalThis.window?.webcadThreeMode?.refreshDocument?.();
}

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
  syncProperties,
}) {
  function newDrawing() {
    if (state.blockEditDraft || state.sketchEditDraft) {
      state.statusText = 'Finalice la edicion actual antes de crear un dibujo';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    doc.clear();
    refreshThreeDocumentView();
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
    state.sketchReferenceEntities = [];
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
    void localFileManager.saveAs('dxf');
    return true;
  }

  function importDxf() {
    if (state.blockEditDraft || state.sketchEditDraft) {
      state.statusText = 'Finalice la edicion actual antes de importar';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    importDxfInput.value = '';
    importDxfInput.click();
    return true;
  }

  function openWebcadProject() {
    if (state.blockEditDraft || state.sketchEditDraft) {
      state.statusText = 'Finalice la edicion actual antes de abrir un proyecto';
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

  async function rebuildModel3d({ toleranceFactor = 1 } = {}) {
    if (state.blockEditDraft || state.sketchEditDraft) {
      state.statusText = 'Finalice la edicion actual antes de reconstruir el modelo 3D';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    const records = [...(doc.model3d?.solids ?? [])];
    if (!records.length) {
      state.statusText = 'No hay solidos 3D que reconstruir';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    state.statusText =
      `Reconstruyendo ${records.length} solido${records.length === 1 ? '' : 's'} 3D...`;
    controller.updateUiStatus();
    renderer.draw();
    try {
      const {
        auditSolidCadTopology,
        rebuildSolidCadTopology,
      } = await import('../3d/three/manifold-boolean.js');
      const rebuilt = records.map((record) => ({
        record,
        solid: rebuildSolidCadTopology(record.solid, { toleranceFactor }),
      }));
      if (rebuilt.some(({ solid }) =>
        !solid || !auditSolidCadTopology(solid).valid)) {
        state.statusText =
          'No se pudo reconstruir el modelo con ese factor; no se hicieron cambios';
        controller.updateUiStatus();
        renderer.draw();
        return false;
      }
      const beforeGroups = records.reduce((total, record) =>
        total + (record.solid.metadata?.planarFaceGroups?.length ?? 0), 0);
      const afterGroups = rebuilt.reduce((total, { solid }) =>
        total + (solid.metadata?.planarFaceGroups?.length ?? 0), 0);
      doc.recordHistory();
      rebuilt.forEach(({ record, solid }) => {
        doc.replace3dSolid(record.id, solid, { recordHistory: false });
      });
      refreshThreeDocumentView();
      state.statusText =
        `Modelo 3D reconstruido · ${beforeGroups} → ${afterGroups} caras planas` +
        ` · factor ×${toleranceFactor}`;
      controller.updateUiStatus();
      renderer.draw();
      return true;
    }
    catch (error) {
      console.error('No se pudo reconstruir el modelo 3D', error);
      state.statusText = 'No se pudo reconstruir el modelo 3D';
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
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
    refreshThreeDocumentView();
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
    refreshThreeDocumentView();
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
    rebuildModel3d,
    saveWebcadProject,
    undoDrawing,
  };
}

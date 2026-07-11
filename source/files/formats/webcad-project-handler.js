/* webCAD - Cableado de apertura de proyectos .webcad | SPDX-License-Identifier: GPL-3.0-or-later */

async function readTextFile(file) {
  return new TextDecoder('utf-8').decode(await file.arrayBuffer());
}

function clearProjectInteractionState(state, orthogonalInference) {
  [
    'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'regularPolygonDraft', 'textDraft', 'hatchDraft',
    'circleDraft', 'arcDraft', 'ellipseDraft', 'xlineDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft',
    'stretchDraft', 'polarArrayDraft', 'rotateDraft', 'scaleDraft', 'mirrorDraft',
    'filletDraft', 'offsetDraft', 'chamferDraft', 'selectionSetDraft', 'eraseDraft',
    'explodeDraft', 'extendDraft', 'blockCreateDraft', 'blockInsertDraft', 'dimensionDraft',
    'imageDraft', 'imageCalibrationDraft', 'lastCopy', 'selectedGrip', 'activeObjectSnap',
  ].forEach((key) => { state[key] = null; });
  state.previousSelection = [];
  state.distanceInput = '';
  orthogonalInference.clear(state);
}

function applyProjectSettings(state, settings = {}, setDrawingProfileRuntime) {
  if (settings.drawingProfile) {
    setDrawingProfileRuntime(settings.drawingProfile);
  }
  if (Array.isArray(settings.layers) && settings.layers.length) {
    state.layers = settings.layers.map((layer) => ({ ...layer }));
  }
  if (settings.activeLayer && state.layers.some((layer) => layer.name === settings.activeLayer)) {
    state.activeLayer = settings.activeLayer;
  }
  [
    'activeLineStyle',
    'activeLineType',
    'activeLineColor',
    'dimensionStyle',
    'dimensionPrecision',
    'lastDimensionOffsets',
    'filletRadii',
    'offsetDistances',
    'polarArrayCount',
    'regularPolygonSides',
    'chamferDistances',
    'snapEnabled',
    'orthoEnabled',
    'lineWeightDisplayEnabled',
    'navigationDevice',
    'lastTextHeight',
  ].forEach((key) => {
    if (settings[key] !== undefined && settings[key] !== null) {
      state[key] = settings[key];
    }
  });
  if (settings.view?.scale && Number.isFinite(Number(settings.view.scale))) {
    state.viewScale = Number(settings.view.scale);
  }
  if (settings.view?.offset && Number.isFinite(Number(settings.view.offset.x)) &&
      Number.isFinite(Number(settings.view.offset.y))) {
    state.viewOffset = {
      x: Number(settings.view.offset.x),
      y: Number(settings.view.offset.y),
    };
  }
  if (typeof settings.view?.hasInitializedView === 'boolean') {
    state.hasInitializedView = settings.view.hasInitializedView;
  }
}

export function bindWebcadProjectInput({
  input,
  state,
  controller,
  renderer,
  registry,
  doc,
  localFileManager,
  orthogonalInference,
  setDrawingProfileRuntime,
  setNextEntityGroupId = null,
  syncProperties,
}) {
  input.addEventListener('change', async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    state.statusText = `Abriendo ${file.name}...`;
    controller.updateUiStatus();
    renderer.draw();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    let project = null;
    try {
      project = registry.get('webcad').parse(await readTextFile(file));
    }
    catch (error) {
      console.error('No se pudo abrir el proyecto webCAD', error);
      state.statusText = error?.message || `No se pudo abrir ${file.name}`;
      controller.updateUiStatus();
      renderer.draw();
      event.target.value = '';
      return;
    }

    const snapshot = {
      ...project.document2d.snapshot,
      model3d: project.model3d,
    };
    doc.restoreSnapshot(snapshot);
    doc.undoStack = [];
    doc.redoStack = [];
    setNextEntityGroupId?.(project.document2d.counters?.nextEntityGroupId);
    applyProjectSettings(state, project.document2d.settings, setDrawingProfileRuntime);
    clearProjectInteractionState(state, orthogonalInference);
    localFileManager.setSuggestedName(file.name, 'webcad');
    syncProperties?.();
    state.statusText =
      `Proyecto webCAD abierto · ${doc.topLevelEntities().length} entidades · ` +
      `${doc.model3d?.solids?.length || 0} solidos 3D`;
    renderer.fitToDocument();
    controller.updateUiStatus();
    renderer.draw();
    event.target.value = '';
  });
}

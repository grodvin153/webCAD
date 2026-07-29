/* webCAD - Alternancia reversible entre vistas 2D y 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { principalSketchPlane, sketchPlaneFromFace } from '../sketch-plane.js';
import { snapshotSketchSupportFace } from '../sketch-reference.js';
import { solidTransformFromAlias } from '../solid-transform-aliases.js';

const canvas2d = document.getElementById('cad-canvas');
const canvas3d = document.getElementById('three-canvas');
const canvasWrap = document.querySelector('.canvas-wrap');
const enterButton = document.getElementById('view-mode-3d');
const exitButton = document.getElementById('view-mode-2d');
const pushButton = document.getElementById('tool-push');
const line3dButton = document.getElementById('tool-line-3d');
const copySolidButton = document.getElementById('tool-copy-solid');
const moveSolidButton = document.getElementById('tool-move-solid');
const rotateSolidButton = document.getElementById('tool-rotate-solid');
const status = document.getElementById('three-mode-status');
const statusLength = document.getElementById('status-length');
const planeControl = document.getElementById('three-plane-control');
const planeSelect = document.getElementById('three-sketch-plane');
const newSketchButton = document.getElementById('three-new-sketch');
const sketchList = document.getElementById('three-sketch-list');
const editSketchButton = document.getElementById('three-edit-sketch');
const toggleSketchButton = document.getElementById('three-toggle-sketch');
const renameSketchButton = document.getElementById('three-rename-sketch');
const deleteSketchButton = document.getElementById('three-delete-sketch');
const sketchEditorBar = document.getElementById('sketch-editor-bar');
const sketchEditorName = document.getElementById('sketch-editor-name');
const rotateSketchAxesButton = document.getElementById('sketch-editor-rotate-axes');
const finishSketchButton = document.getElementById('sketch-editor-finish');
const sketchSectionButton = document.getElementById('tool-sketch-section');
const initialPlaneDialog = document.getElementById('initial-sketch-plane-dialog');
const initialPlaneCloseButton = document.getElementById('initial-sketch-plane-close');
const initialPlaneButtons = [...document.querySelectorAll('[data-sketch-plane]')];

let viewer = null;
let loading = false;
let threeModeActive = false;
let resizeObserver = null;
let sketchShortcutTimer = null;
let initialPlaneResolver = null;
let sketchReferenceMode = (() => {
  try {
    return localStorage.getItem('webcad-sketch-reference-mode') === 'section'
      ? 'section'
      : 'projection';
  }
  catch {
    return 'projection';
  }
})();

function sketchReferenceOptions(sketch = null) {
  return { mode: sketchReferenceMode, sketch };
}

function syncSketchReferenceButton() {
  if (!sketchSectionButton) return;
  const section = sketchReferenceMode === 'section';
  sketchSectionButton.classList.toggle('is-active', section);
  sketchSectionButton.setAttribute('aria-pressed', String(section));
  sketchSectionButton.title = section
    ? 'Referencias: sección del croquis'
    : 'Referencias: proyección completa';
}

function documentEntities() {
  const doc = window.webcadDebug?.doc;
  if (!doc) return [];
  return typeof doc.topLevelEntities === 'function' ? doc.topLevelEntities() : doc.entities || [];
}

function cadDocument() {
  return window.webcadDebug?.doc ?? null;
}

function documentSketchPlane() {
  const plane = cadDocument()?.model3d?.sketchPlane;
  return ['XY', 'XZ', 'YZ'].includes(plane) ? plane : 'XY';
}

function documentSketches() {
  return Array.isArray(cadDocument()?.model3d?.sketches)
    ? cadDocument().model3d.sketches
    : [];
}

function needsInitialPlaneChoice() {
  const doc = cadDocument();
  return Boolean(
    doc && !documentSketches().length && !doc.model3d?.solids?.length &&
    doc.topLevelEntities().length,
  );
}

function closeInitialPlaneChoice(value = null) {
  if (!initialPlaneResolver) return;
  const resolve = initialPlaneResolver;
  initialPlaneResolver = null;
  initialPlaneDialog.hidden = true;
  resolve(value);
}

function chooseInitialPlane() {
  if (!initialPlaneDialog || !needsInitialPlaneChoice()) return Promise.resolve(null);
  initialPlaneDialog.hidden = false;
  const preferred = initialPlaneButtons.find((button) =>
    button.dataset.sketchPlane === documentSketchPlane()) ?? initialPlaneButtons[0];
  requestAnimationFrame(() => preferred?.focus());
  return new Promise((resolve) => { initialPlaneResolver = resolve; });
}

function applyInitialGridDefault() {
  const runtime = sketchRuntime();
  let hasPreference = false;
  try {
    hasPreference = localStorage.getItem('webcad-grid-enabled') !== null;
    if (!hasPreference) localStorage.setItem('webcad-grid-enabled', 'false');
  }
  catch {
    // The session value still applies when browser storage is unavailable.
  }
  if (hasPreference || !runtime?.state) return;
  runtime.state.snapEnabled = false;
  runtime.controller?.updateUiStatus?.();
  runtime.renderer?.draw?.();
}

function promoteInitialDrawingToSketch() {
  const doc = cadDocument();
  if (!doc || documentSketches().length || !doc.topLevelEntities().length) return null;
  return doc.promoteRootEntitiesTo3dSketch({
    plane: principalSketchPlane(documentSketchPlane()),
  });
}

function selectedSketch() {
  return documentSketches().find((record) => record.id === sketchList?.value) ?? null;
}

function syncSketchControls(preferredId = null) {
  if (!sketchList) return;
  const previous = preferredId ?? sketchList.value;
  sketchList.replaceChildren(...documentSketches().map((sketch) => {
    const option = document.createElement('option');
    option.value = sketch.id;
    option.textContent = `${sketch.visible === false ? 'Oculto · ' : ''}${sketch.name}`;
    return option;
  }));
  if ([...sketchList.options].some((option) => option.value === previous)) {
    sketchList.value = previous;
  }
  const hasSketch = Boolean(selectedSketch());
  sketchList.disabled = !hasSketch;
  [editSketchButton, toggleSketchButton, renameSketchButton, deleteSketchButton]
    .forEach((button) => { if (button) button.disabled = !hasSketch; });
}

function refreshDocumentView() {
  const runtime = sketchRuntime();
  const doc = cadDocument();
  if (doc?.isEditingSketch?.()) {
    const sketch = documentSketches().find((record) => record.id === doc.editingSketchId);
    if (sketch && runtime?.renderer) {
      runtime.state.sketchReferenceEntities =
        runtime.createSketchReferenceEntities?.(sketch.plane, sketchReferenceOptions(sketch)) ?? [];
      runtime.renderer.draw();
      return true;
    }
  }
  if (!viewer || !threeModeActive) return false;
  planeSelect.value = documentSketchPlane();
  syncSketchControls();
  viewer.refreshDocument?.();
  return true;
}

function viewSettings() {
  return {
    gridVisible: window.webcadDebug?.state?.snapEnabled !== false,
    axesVisible: window.webcadDebug?.state?.axesVisible !== false,
    navigationDevice: window.webcadDebug?.state?.navigationDevice || 'trackpad',
  };
}

function syncViewSettings() {
  if (!viewer || !threeModeActive) return;
  const settings = viewSettings();
  viewer.setGridVisible(settings.gridVisible);
  viewer.setAxesVisible?.(settings.axesVisible);
  viewer.setNavigationDevice?.(settings.navigationDevice);
}

function syncSize() {
  if (!viewer || !canvasWrap || !threeModeActive) return;
  const bounds = canvasWrap.getBoundingClientRect();
  viewer.resize(bounds.width, bounds.height);
  syncViewSettings();
}

function show2dMode({ sketchEditing = false } = {}) {
  viewer?.stop();
  threeModeActive = false;
  canvas3d.hidden = true;
  canvas2d.hidden = false;
  enterButton.hidden = sketchEditing;
  exitButton.hidden = true;
  status.hidden = true;
  if (statusLength) statusLength.textContent = 'Longitud: -';
  planeControl.hidden = true;
  sketchEditorBar.hidden = !sketchEditing;
  if (sketchSectionButton) sketchSectionButton.hidden = !sketchEditing;
  canvasWrap.classList.remove('is-three-mode');
  requestAnimationFrame(() => canvas2d.focus({ preventScroll: true }));
}

async function show3dMode() {
  if (loading || threeModeActive) return;
  loading = true;
  if (needsInitialPlaneChoice()) {
    const selectedPlane = await chooseInitialPlane();
    if (!selectedPlane) {
      loading = false;
      canvas2d.focus({ preventScroll: true });
      return;
    }
    cadDocument()?.set3dSketchPlane?.(selectedPlane, { recordHistory: false });
    planeSelect.value = selectedPlane;
    applyInitialGridDefault();
  }
  threeModeActive = true;
  canvas2d.hidden = true;
  canvas3d.hidden = false;
  enterButton.hidden = true;
  exitButton.hidden = false;
  status.hidden = false;
  planeControl.hidden = false;
  sketchEditorBar.hidden = true;
  if (sketchSectionButton) sketchSectionButton.hidden = false;
  status.textContent = 'Iniciando vista 3D...';
  canvasWrap.classList.add('is-three-mode');
  await new Promise((resolve) => requestAnimationFrame(resolve));

  try {
    const promotedSketch = promoteInitialDrawingToSketch();
    const entities = documentEntities();
    const settings = viewSettings();
    const sketchPlane = documentSketchPlane();
    planeSelect.value = sketchPlane;
    syncSketchControls(promotedSketch?.id ?? null);
    if (!viewer) {
      const { createThreeDemoViewer } = await import('./three-demo-viewer.js');
      viewer = await createThreeDemoViewer(canvas3d, {
        doc: cadDocument(),
        entities,
        getNavigationDevice: () => viewSettings().navigationDevice,
        gridVisible: settings.gridVisible,
        axesVisible: settings.axesVisible,
        navigationDevice: settings.navigationDevice,
        sketchPlane,
        onEdgeInfo: (edge) => {
          if (!statusLength) return;
          const length = Number(edge?.length);
          statusLength.textContent = Number.isFinite(length)
            ? `Longitud: ${length.toLocaleString('es-ES', { maximumFractionDigits: 3 })} mm`
            : 'Longitud: -';
        },
        onStatus: (message) => { status.textContent = message; },
      });
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvasWrap);
    }
    else {
      if (!viewer.setSketchPlane?.(sketchPlane)) viewer.refreshDocument?.();
      viewer.setGridVisible(settings.gridVisible);
      viewer.setAxesVisible?.(settings.axesVisible);
      viewer.setNavigationDevice?.(settings.navigationDevice);
    }
    syncSize();
    viewer.start();
    const count = viewer.getSegmentCount();
    const entityCount = viewer.getEntityCount();
    status.textContent = settings.navigationDevice === 'mouse'
      ? `${entityCount} entidades · ${count} segmentos · izquierdo orbita · central pan · rueda zoom`
      : `${entityCount} entidades · ${count} segmentos · clic orbita · dos dedos pan · Shift zoom`;
  }
  catch (error) {
    console.error('No se pudo activar la vista 3D experimental', error);
    show2dMode();
  }
  finally {
    loading = false;
  }
}

function sketchRuntime() {
  return window.webcadDebug ?? null;
}

function beginSketchEdit(sketch) {
  const runtime = sketchRuntime();
  const doc = cadDocument();
  if (!sketch || !runtime?.controller || !runtime?.renderer || !doc?.beginSketchEdit?.(sketch.id)) {
    return false;
  }
  runtime.state.sketchEditDraft = {
    id: sketch.id,
    savedThreeView: viewer?.getViewState?.() ?? null,
    savedView: {
      scale: runtime.state.viewScale,
      offset: { ...runtime.state.viewOffset },
    },
  };
  runtime.state.sketchReferenceEntities =
    runtime.createSketchReferenceEntities?.(sketch.plane, sketchReferenceOptions(sketch)) ?? [];
  runtime.controller.setTool('select');
  sketchEditorName.textContent = sketch.name;
  show2dMode({ sketchEditing: true });
  runtime.renderer.fitToDocument();
  runtime.controller.updateUiStatus();
  runtime.renderer.draw();
  requestAnimationFrame(() => canvas2d.focus({ preventScroll: true }));
  return true;
}

async function finishSketchEdit() {
  const runtime = sketchRuntime();
  const doc = cadDocument();
  const draft = runtime?.state?.sketchEditDraft;
  if (!draft || !doc?.endSketchEdit?.()) return false;
  runtime.controller.setTool('select');
  runtime.state.sketchEditDraft = null;
  runtime.state.sketchReferenceEntities = [];
  if (draft.savedView) {
    runtime.state.viewScale = draft.savedView.scale;
    runtime.state.viewOffset = { ...draft.savedView.offset };
  }
  sketchEditorBar.hidden = true;
  await show3dMode();
  refreshDocumentView();
  if (draft.savedThreeView) viewer?.setViewState?.(draft.savedThreeView);
  return true;
}

function contextForNewSketch() {
  const face = viewer?.getSelectedPlanarFace?.();
  const plane = face ? sketchPlaneFromFace(face) : principalSketchPlane(planeSelect.value);
  return { face, plane };
}

function createNewSketch() {
  if (!threeModeActive) return false;
  const doc = cadDocument();
  const { face, plane } = contextForNewSketch();
  if (!doc || !plane) {
    status.textContent = 'Seleccione una cara plana o un plano principal';
    return false;
  }
  const usesInitialDrawing = !documentSketches().length && doc.topLevelEntities().length > 0 &&
    !viewer?.getSelectedPlanarFace?.();
  const sketch = usesInitialDrawing
    ? doc.promoteRootEntitiesTo3dSketch({ plane })
    : doc.add3dSketch({
      plane,
      metadata: face ? { supportFace: snapshotSketchSupportFace(face, plane, doc?.model3d) } : null,
    });
  if (!sketch) return false;
  syncSketchControls(sketch.id);
  return beginSketchEdit(sketch);
}

function editSelectedSketch() {
  return beginSketchEdit(selectedSketch());
}

function rotateActiveSketchAxes() {
  const runtime = sketchRuntime();
  const doc = cadDocument();
  const sketch = documentSketches().find((record) => record.id === doc?.editingSketchId);
  if (!sketch || !doc.rotate3dSketchAxes?.(sketch.id)) return false;
  runtime.state.sketchReferenceEntities =
    runtime.createSketchReferenceEntities?.(sketch.plane, sketchReferenceOptions(sketch)) ?? [];
  runtime.renderer.fitToDocument();
  runtime.controller.updateUiStatus();
  runtime.renderer.draw();
  return true;
}

function toggleSelectedSketch() {
  const sketch = selectedSketch();
  if (!sketch) return false;
  cadDocument().set3dSketchVisibility(sketch.id, sketch.visible === false);
  syncSketchControls(sketch.id);
  refreshDocumentView();
  return true;
}

function renameSelectedSketch() {
  const sketch = selectedSketch();
  if (!sketch) return false;
  const name = window.prompt('Nombre del croquis', sketch.name);
  if (!name || !cadDocument().rename3dSketch(sketch.id, name)) return false;
  syncSketchControls(sketch.id);
  return true;
}

function deleteSelectedSketch() {
  const sketch = selectedSketch();
  if (!sketch || !cadDocument().remove3dSketch(sketch.id)) return false;
  syncSketchControls();
  refreshDocumentView();
  status.textContent = `${sketch.name} eliminado`;
  return true;
}

function ensureInitialSketchForPush() {
  const doc = cadDocument();
  if (!doc || documentSketches().length || !doc.topLevelEntities().length ||
      viewer?.getSelectedPlanarFace?.()) return null;
  const sketch = promoteInitialDrawingToSketch();
  if (sketch) {
    syncSketchControls(sketch.id);
    viewer.refreshDocument?.();
  }
  return sketch;
}

function startPush() {
  ensureInitialSketchForPush();
  if (viewer?.isSolidTransformActive?.() || viewer?.isLine3dActive?.()) return false;
  return viewer?.startPush?.() || false;
}

function startMoveSolids() {
  if (viewer?.isPushActive?.() || viewer?.isLine3dActive?.()) return false;
  if (!viewer?.getSelectedSolidIds?.().length && viewer?.getSelectedLine3dGroupId?.()) {
    return viewer?.startMoveLine3d?.() || false;
  }
  return viewer?.startMoveSolids?.() || false;
}

function startCopySolids() {
  if (viewer?.isPushActive?.() || viewer?.isLine3dActive?.()) return false;
  if (!viewer?.getSelectedSolidIds?.().length && viewer?.getSelectedLine3dGroupId?.()) {
    return viewer?.startCopyLine3d?.() || false;
  }
  return viewer?.startCopySolids?.() || false;
}

function startRotateSolids() {
  if (viewer?.isPushActive?.() || viewer?.isLine3dActive?.()) return false;
  if (!viewer?.getSelectedSolidIds?.().length && viewer?.getSelectedLine3dGroupId?.()) {
    return viewer?.startRotateLine3d?.() || false;
  }
  return viewer?.startRotateSolids?.() || false;
}

function startLine3d() {
  if (viewer?.isPushActive?.() || viewer?.isSolidTransformActive?.()) return false;
  return viewer?.startLine3d?.() || false;
}

enterButton?.addEventListener('click', show3dMode);
exitButton?.addEventListener('click', show2dMode);
pushButton?.addEventListener('click', async () => {
  if (!threeModeActive) {
    await show3dMode();
  }
  startPush();
});
line3dButton?.addEventListener('click', async () => {
  if (!threeModeActive) await show3dMode();
  startLine3d();
});
copySolidButton?.addEventListener('click', async () => {
  if (!threeModeActive) await show3dMode();
  startCopySolids();
});
moveSolidButton?.addEventListener('click', async () => {
  if (!threeModeActive) await show3dMode();
  startMoveSolids();
});
rotateSolidButton?.addEventListener('click', async () => {
  if (!threeModeActive) await show3dMode();
  startRotateSolids();
});
newSketchButton?.addEventListener('click', createNewSketch);
editSketchButton?.addEventListener('click', editSelectedSketch);
toggleSketchButton?.addEventListener('click', toggleSelectedSketch);
renameSketchButton?.addEventListener('click', renameSelectedSketch);
deleteSketchButton?.addEventListener('click', deleteSelectedSketch);
finishSketchButton?.addEventListener('click', finishSketchEdit);
rotateSketchAxesButton?.addEventListener('click', rotateActiveSketchAxes);
sketchSectionButton?.addEventListener('click', () => {
  sketchReferenceMode = sketchReferenceMode === 'section' ? 'projection' : 'section';
  try {
    localStorage.setItem('webcad-sketch-reference-mode', sketchReferenceMode);
  }
  catch {
    // The selected mode remains active for the current session.
  }
  syncSketchReferenceButton();
  const runtime = sketchRuntime();
  const sketch = documentSketches().find((record) => record.id === cadDocument()?.editingSketchId);
  if (sketch && runtime?.renderer) {
    runtime.state.sketchReferenceEntities =
      runtime.createSketchReferenceEntities?.(sketch.plane, sketchReferenceOptions(sketch)) ?? [];
    runtime.renderer.draw();
  }
  else if (threeModeActive) {
    status.textContent = sketchReferenceMode === 'section'
      ? 'Referencias de croquis en sección'
      : 'Referencias de croquis en proyección completa';
  }
});
syncSketchReferenceButton();
initialPlaneButtons.forEach((button) => button.addEventListener('click', () => {
  closeInitialPlaneChoice(button.dataset.sketchPlane);
}));
initialPlaneCloseButton?.addEventListener('click', () => closeInitialPlaneChoice());
initialPlaneDialog?.addEventListener('pointerdown', (event) => {
  if (event.target === initialPlaneDialog) closeInitialPlaneChoice();
});
initialPlaneDialog?.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  event.preventDefault();
  event.stopPropagation();
  closeInitialPlaneChoice();
});

planeSelect?.addEventListener('change', () => {
  if (!threeModeActive) return;
  const doc = cadDocument();
  const nextPlane = planeSelect.value;
  doc?.set3dSketchPlane?.(nextPlane);
  viewer?.setSketchPlane?.(nextPlane);
  status.textContent = `Plano del dibujo: ${planeSelect.selectedOptions[0]?.textContent || nextPlane}`;
});

document.addEventListener('keydown', async (event) => {
  if (!threeModeActive || event.key.toLowerCase() !== 'p' ||
      event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }
  if (event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  startPush();
}, true);

document.addEventListener('keydown', async (event) => {
  if (!threeModeActive || event.key.toLowerCase() !== 'l' ||
      event.metaKey || event.ctrlKey || event.altKey ||
      viewer?.isPushActive?.() || viewer?.isSolidTransformActive?.() ||
      viewer?.isLine3dActive?.()) {
    return;
  }
  if (event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  startLine3d();
}, true);

document.addEventListener('keydown', (event) => {
  if (!threeModeActive || event.metaKey || event.ctrlKey || event.altKey ||
      viewer?.isPushActive?.() || viewer?.isSolidTransformActive?.() ||
      viewer?.isLine3dActive?.() ||
      viewer?.isDeleteSolidActive?.() ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) {
    return;
  }
  const command = solidTransformFromAlias(event.key);
  if (!command) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (command === 'copy') startCopySolids();
  else if (command === 'move') startMoveSolids();
  else startRotateSolids();
}, true);

document.addEventListener('keydown', (event) => {
  if (!threeModeActive || event.metaKey || event.ctrlKey || event.altKey ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) return;
  const key = event.key.toLowerCase();
  if (key === 's') {
    event.preventDefault();
    event.stopImmediatePropagation();
    clearTimeout(sketchShortcutTimer);
    sketchShortcutTimer = setTimeout(() => { sketchShortcutTimer = null; }, 500);
    status.textContent = 'SK: pulse K para Nuevo croquis';
    return;
  }
  if (key === 'k' && sketchShortcutTimer) {
    event.preventDefault();
    event.stopImmediatePropagation();
    clearTimeout(sketchShortcutTimer);
    sketchShortcutTimer = null;
    createNewSketch();
  }
}, true);

document.addEventListener('keydown', (event) => {
  if (!threeModeActive || event.key.toLowerCase() !== 'k' ||
      event.metaKey || event.ctrlKey || event.altKey ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  viewer?.toggleHiddenEdges?.();
}, true);

document.addEventListener('keydown', (event) => {
  const isDeleteKey = event.key === 'Delete' || event.key === 'Backspace';
  const isEraseAlias = event.key.toLowerCase() === 'b';
  const isConfirmKey = event.key === 'Enter' || event.key === ' ';
  const isCancelKey = event.key === 'Escape';
  if (!threeModeActive || (!isDeleteKey && !isEraseAlias && !isConfirmKey && !isCancelKey) ||
      event.metaKey || event.ctrlKey || event.altKey || viewer?.isPushActive?.() ||
      viewer?.isLine3dActive?.() ||
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement) {
    return;
  }
  if (isConfirmKey && !viewer?.isDeleteSolidActive?.()) return;
  if (isCancelKey && !viewer?.isDeleteSolidActive?.()) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (isConfirmKey) viewer?.confirmDeleteSolidSelection?.();
  else if (isCancelKey) viewer?.cancelDeleteSolid?.();
  else if (isEraseAlias) viewer?.startDeleteSolid?.();
  else viewer?.deleteSelected3d?.();
}, true);

document.addEventListener('click', () => {
  if (!threeModeActive) return;
  requestAnimationFrame(syncViewSettings);
});

document.addEventListener('keydown', () => {
  if (!threeModeActive) return;
  requestAnimationFrame(syncViewSettings);
});

window.addEventListener('webcad:navigation-device-change', () => {
  if (!threeModeActive) return;
  requestAnimationFrame(syncViewSettings);
});

window.addEventListener('webcad:3d-document-changed', (event) => {
  if (!threeModeActive) return;
  syncSketchControls(event.detail?.sketchId ?? null);
});

window.webcadThreeMode = {
  enter: show3dMode,
  exit: show2dMode,
  getViewer: () => viewer,
  isActive: () => threeModeActive,
  startDeleteSolid: () => viewer?.startDeleteSolid?.() || false,
  confirmDeleteSolidSelection: () => viewer?.confirmDeleteSolidSelection?.() || false,
  deleteSelectedSolid: () => viewer?.deleteSelectedSolid?.() || false,
  refreshDocument: refreshDocumentView,
  createNewSketch,
  editSelectedSketch,
  finishSketchEdit,
  startPush,
  startLine3d,
  startCopySolids,
  startMoveSolids,
  startRotateSolids,
  syncSettings: syncViewSettings,
};

/* webCAD - Alternancia reversible entre vistas 2D y 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { DRAWING_PROFILES } from '../../config.js';
import { hideCursorInput } from '../../input/cursor-input.js';
import {
  applyToolbarMode,
  TOOLBAR_MODE_2D,
  TOOLBAR_MODE_3D,
  TOOLBAR_MODE_SKETCH,
} from '../../ui/mode-toolbar.js';
import { principalSketchPlane, sketchPlaneFromFace } from '../sketch-plane.js';
import { snapshotSketchSupportFace } from '../sketch-reference.js';
import { solidTransformFromAlias } from '../solid-transform-aliases.js';

const canvas2d = document.getElementById('cad-canvas');
const canvas3d = document.getElementById('three-canvas');
const cursorInput = document.getElementById('cursor-input');
const viewCube = document.getElementById('three-view-cube');
const viewCubeCanvas = document.getElementById('three-view-cube-canvas');
const viewCubeHome = document.getElementById('three-view-cube-home');
const viewCubeLabel = document.getElementById('three-view-cube-label');
const projectionPerspectiveButtons = [
  ...document.querySelectorAll('[data-command="three-projection-perspective"]'),
];
const projectionOrthographicButtons = [
  ...document.querySelectorAll('[data-command="three-projection-orthographic"]'),
];
const canvasWrap = document.querySelector('.canvas-wrap');
const enterButton = document.getElementById('view-mode-3d');
const exitButton = document.getElementById('view-mode-2d');
const pushButton = document.getElementById('tool-push');
const line3dButton = document.getElementById('tool-line-3d');
const copySolidButton = document.getElementById('tool-copy-solid');
const moveSolidButton = document.getElementById('tool-move-solid');
const rotateSolidButton = document.getElementById('tool-rotate-solid');
const cutSolidPlaneButton = document.getElementById('tool-cut-solid-plane');
const unionSolidButton = document.getElementById('tool-union-solid');
const subtractSolidButton = document.getElementById('tool-subtract-solid');
const delete3dButton = document.getElementById('tool-delete-3d');
const select3dButton = document.getElementById('tool-select-3d');
const hiddenEdgesButton = document.getElementById('tool-hidden-edges-3d');
const status = document.getElementById('three-mode-status');
const statusLength = document.getElementById('status-length');
const planeControl = document.getElementById('three-plane-control');
const planeSelect = document.getElementById('three-sketch-plane');
const sketchList = document.getElementById('three-sketch-list');
const sketchActionButtons = (action) => [
  ...document.querySelectorAll(`[data-sketch-action="${action}"]`),
];
const newSketchButtons = sketchActionButtons('new');
const editSketchButtons = sketchActionButtons('edit');
const toggleSketchButtons = sketchActionButtons('toggle');
const renameSketchButtons = sketchActionButtons('rename');
const deleteSketchButtons = sketchActionButtons('delete');
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
let activeThreeTool = 'select';
let hiddenEdgesVisible = false;
let projectionPreference = (() => {
  try {
    return localStorage.getItem('webcad-three-projection') === 'orthographic'
      ? 'orthographic'
      : 'perspective';
  }
  catch {
    return 'perspective';
  }
})();
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

function syncProjectionMenu() {
  [
    [projectionPerspectiveButtons, 'perspective'],
    [projectionOrthographicButtons, 'orthographic'],
  ].forEach(([buttons, value]) => {
    const selected = projectionPreference === value;
    buttons.forEach((button) => {
      button.classList.toggle('is-active', selected);
      if (button.hasAttribute('aria-checked')) {
        button.setAttribute('aria-checked', String(selected));
      }
      else button.setAttribute('aria-pressed', String(selected));
    });
  });
}

function setProjectionPreference(value) {
  projectionPreference = value === 'orthographic'
    ? 'orthographic'
    : 'perspective';
  try {
    localStorage.setItem('webcad-three-projection', projectionPreference);
  }
  catch {
    // La preferencia sigue activa durante la sesion.
  }
  syncProjectionMenu();
  viewer?.setProjectionPreference?.(projectionPreference);
  return projectionPreference;
}

function closeToolGroups() {
  document.querySelectorAll('.tool-group.is-open').forEach((group) => {
    group.classList.remove('is-open');
    group.querySelector('.tool-menu-button')?.setAttribute('aria-expanded', 'false');
  });
}

function setThreeToolsDisabled(disabled) {
  document.querySelectorAll(
    '[data-tool-mode="3d"] button, #three-plane-control button',
  ).forEach((button) => {
    button.disabled = disabled;
  });
}

function syncThreeToolState(preferredTool = activeThreeTool) {
  if (!threeModeActive || !viewer) {
    activeThreeTool = 'select';
  }
  else if (viewer.isPushActive?.()) activeThreeTool = 'push';
  else if (viewer.isLine3dActive?.()) {
    activeThreeTool = ['copy', 'move', 'rotate'].includes(preferredTool)
      ? preferredTool
      : 'line';
  }
  else if (viewer.isSolidPlaneCutActive?.()) activeThreeTool = 'cut-plane';
  else if (viewer.isSolidUnionActive?.()) activeThreeTool = 'union-solid';
  else if (viewer.isSolidSubtractionActive?.()) activeThreeTool = 'subtract-solid';
  else if (viewer.isSolidTransformActive?.()) activeThreeTool = preferredTool;
  else if (viewer.isDeleteSolidActive?.()) activeThreeTool = 'delete';
  else activeThreeTool = 'select';

  const buttonTools = new Map([
    [select3dButton, 'select'],
    [line3dButton, 'line'],
    [pushButton, 'push'],
    [copySolidButton, 'copy'],
    [moveSolidButton, 'move'],
    [rotateSolidButton, 'rotate'],
    [cutSolidPlaneButton, 'cut-plane'],
    [unionSolidButton, 'union-solid'],
    [subtractSolidButton, 'subtract-solid'],
    [delete3dButton, 'delete'],
  ]);
  buttonTools.forEach((tool, button) => {
    if (!button) return;
    const selected = activeThreeTool === tool;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  hiddenEdgesButton?.classList.toggle('is-active', hiddenEdgesVisible);
  hiddenEdgesButton?.setAttribute('aria-pressed', String(hiddenEdgesVisible));
  return activeThreeTool;
}

function cancel2dInteraction() {
  const runtime = sketchRuntime();
  runtime?.controller?.cancelCurrentCommand?.();
  runtime?.controller?.updateUiStatus?.();
  runtime?.renderer?.draw?.();
  hideCursorInput(cursorInput);
  closeToolGroups();
}

function cancel3dInteraction() {
  viewer?.cancelActiveCommand?.();
  hideCursorInput(cursorInput);
  closeToolGroups();
  syncThreeToolState('select');
}

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
  [
    ...editSketchButtons,
    ...toggleSketchButtons,
    ...renameSketchButtons,
    ...deleteSketchButtons,
  ].forEach((button) => { button.disabled = !hasSketch; });
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
  cancel3dInteraction();
  viewer?.stop();
  threeModeActive = false;
  applyToolbarMode(
    document,
    sketchEditing ? TOOLBAR_MODE_SKETCH : TOOLBAR_MODE_2D,
  );
  canvas3d.hidden = true;
  canvas2d.hidden = false;
  enterButton.hidden = sketchEditing;
  enterButton.classList.remove('is-active');
  enterButton.setAttribute('aria-pressed', 'false');
  exitButton.hidden = true;
  exitButton.classList.remove('is-active');
  exitButton.setAttribute('aria-pressed', 'false');
  status.hidden = true;
  if (viewCube) viewCube.hidden = true;
  if (statusLength) statusLength.textContent = 'Longitud: -';
  planeControl.hidden = true;
  sketchEditorBar.hidden = !sketchEditing;
  if (sketchSectionButton) sketchSectionButton.hidden = !sketchEditing;
  canvasWrap.classList.remove('is-three-mode');
  syncThreeToolState('select');
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
  cancel2dInteraction();
  threeModeActive = true;
  applyToolbarMode(document, TOOLBAR_MODE_3D);
  setThreeToolsDisabled(true);
  canvas2d.hidden = true;
  canvas3d.hidden = false;
  enterButton.hidden = true;
  enterButton.classList.add('is-active');
  enterButton.setAttribute('aria-pressed', 'true');
  exitButton.hidden = false;
  exitButton.classList.add('is-active');
  exitButton.setAttribute('aria-pressed', 'true');
  status.hidden = false;
  if (viewCube) viewCube.hidden = false;
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
        cursorInput,
        doc: cadDocument(),
        entities,
        getUnitsLabel: () => DRAWING_PROFILES[
          window.webcadDebug?.state?.drawingProfile
        ]?.unitsLabel ?? 'mm',
        getNavigationDevice: () => viewSettings().navigationDevice,
        gridVisible: settings.gridVisible,
        axesVisible: settings.axesVisible,
        navigationDevice: settings.navigationDevice,
        projection: projectionPreference,
        sketchPlane,
        onEdgeInfo: (edge) => {
          if (!statusLength) return;
          const length = Number(edge?.length);
          statusLength.textContent = Number.isFinite(length)
            ? `Longitud: ${length.toLocaleString('es-ES', { maximumFractionDigits: 3 })} mm`
            : 'Longitud: -';
        },
        onStatus: (message) => {
          status.textContent = message;
          requestAnimationFrame(() => syncThreeToolState());
        },
        viewCube: {
          container: viewCube,
          canvas: viewCubeCanvas,
          homeButton: viewCubeHome,
          label: viewCubeLabel,
        },
      });
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvasWrap);
    }
    else {
      if (!viewer.setSketchPlane?.(sketchPlane)) viewer.refreshDocument?.();
      viewer.setGridVisible(settings.gridVisible);
      viewer.setAxesVisible?.(settings.axesVisible);
      viewer.setNavigationDevice?.(settings.navigationDevice);
      viewer.setProjectionPreference?.(projectionPreference);
    }
    syncSize();
    viewer.start();
    setThreeToolsDisabled(false);
    syncSketchControls();
    syncThreeToolState('select');
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
    if (!threeModeActive) setThreeToolsDisabled(false);
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
  if (!threeModeActive) return false;
  ensureInitialSketchForPush();
  if (viewer?.isSolidPlaneCutActive?.() || viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.() ||
      viewer?.isSolidTransformActive?.() || viewer?.isLine3dActive?.()) return false;
  const started = viewer?.startPush?.() || false;
  if (started) syncThreeToolState('push');
  return started;
}

function startMoveSolids() {
  if (!threeModeActive) return false;
  if (viewer?.isPushActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.() ||
      viewer?.isLine3dActive?.()) return false;
  const started = !viewer?.getSelectedSolidIds?.().length &&
    viewer?.getSelectedLine3dGroupId?.()
    ? viewer?.startMoveLine3d?.() || false
    : viewer?.startMoveSolids?.() || false;
  if (started) syncThreeToolState('move');
  return started;
}

function startCopySolids() {
  if (!threeModeActive) return false;
  if (viewer?.isPushActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.() ||
      viewer?.isLine3dActive?.()) return false;
  const started = !viewer?.getSelectedSolidIds?.().length &&
    viewer?.getSelectedLine3dGroupId?.()
    ? viewer?.startCopyLine3d?.() || false
    : viewer?.startCopySolids?.() || false;
  if (started) syncThreeToolState('copy');
  return started;
}

function startRotateSolids() {
  if (!threeModeActive) return false;
  if (viewer?.isPushActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.() ||
      viewer?.isLine3dActive?.()) return false;
  const started = !viewer?.getSelectedSolidIds?.().length &&
    viewer?.getSelectedLine3dGroupId?.()
    ? viewer?.startRotateLine3d?.() || false
    : viewer?.startRotateSolids?.() || false;
  if (started) syncThreeToolState('rotate');
  return started;
}

function startLine3d() {
  if (!threeModeActive) return false;
  if (viewer?.isPushActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.() ||
      viewer?.isSolidTransformActive?.()) return false;
  const started = viewer?.startLine3d?.() || false;
  if (started) syncThreeToolState('line');
  return started;
}

function startDelete3d() {
  if (!threeModeActive) return false;
  if (viewer?.isSolidPlaneCutActive?.() || viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.()) return false;
  const started = viewer?.startDeleteSolid?.() || false;
  if (started) syncThreeToolState('delete');
  return started;
}

function startSolidPlaneCut() {
  if (!threeModeActive || viewer?.isPushActive?.() ||
      viewer?.isSolidTransformActive?.() || viewer?.isLine3dActive?.() ||
      viewer?.isDeleteSolidActive?.() || viewer?.isSolidUnionActive?.() ||
      viewer?.isSolidSubtractionActive?.()) return false;
  const started = viewer?.startSolidPlaneCut?.() || false;
  if (started) syncThreeToolState('cut-plane');
  return started;
}

function startSolidUnion() {
  if (!threeModeActive || viewer?.isPushActive?.() ||
      viewer?.isSolidTransformActive?.() || viewer?.isLine3dActive?.() ||
      viewer?.isDeleteSolidActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidSubtractionActive?.()) return false;
  const started = viewer?.startSolidUnion?.() || false;
  if (started) syncThreeToolState('union-solid');
  return started;
}

function startSolidSubtraction() {
  if (!threeModeActive || viewer?.isPushActive?.() ||
      viewer?.isSolidTransformActive?.() || viewer?.isLine3dActive?.() ||
      viewer?.isDeleteSolidActive?.() || viewer?.isSolidPlaneCutActive?.() ||
      viewer?.isSolidUnionActive?.()) return false;
  const started = viewer?.startSolidSubtraction?.() || false;
  if (started) syncThreeToolState('subtract-solid');
  return started;
}

function activateThreeSelection() {
  if (!threeModeActive) return false;
  cancel3dInteraction();
  status.textContent = 'Selección 3D activa';
  canvas3d.focus({ preventScroll: true });
  return true;
}

function toggleHiddenEdges() {
  if (!threeModeActive) return false;
  hiddenEdgesVisible = viewer?.toggleHiddenEdges?.() === true;
  syncThreeToolState();
  return hiddenEdgesVisible;
}

enterButton?.addEventListener('click', show3dMode);
exitButton?.addEventListener('click', show2dMode);
pushButton?.addEventListener('click', startPush);
line3dButton?.addEventListener('click', startLine3d);
copySolidButton?.addEventListener('click', startCopySolids);
moveSolidButton?.addEventListener('click', startMoveSolids);
rotateSolidButton?.addEventListener('click', startRotateSolids);
cutSolidPlaneButton?.addEventListener('click', startSolidPlaneCut);
unionSolidButton?.addEventListener('click', startSolidUnion);
subtractSolidButton?.addEventListener('click', startSolidSubtraction);
delete3dButton?.addEventListener('click', startDelete3d);
select3dButton?.addEventListener('click', activateThreeSelection);
hiddenEdgesButton?.addEventListener('click', toggleHiddenEdges);
[
  [newSketchButtons, createNewSketch],
  [editSketchButtons, editSelectedSketch],
  [toggleSketchButtons, toggleSelectedSketch],
  [renameSketchButtons, renameSelectedSketch],
  [deleteSketchButtons, deleteSelectedSketch],
].forEach(([buttons, action]) => {
  buttons.forEach((button) => button.addEventListener('click', () => {
    closeToolGroups();
    action();
  }));
});
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
      viewer?.isSolidPlaneCutActive?.() ||
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
  toggleHiddenEdges();
}, true);

document.addEventListener('keydown', (event) => {
  const isDeleteKey = event.key === 'Delete' || event.key === 'Backspace';
  const isEraseAlias = event.key.toLowerCase() === 'b';
  const isConfirmKey = event.key === 'Enter' || event.key === ' ';
  const isCancelKey = event.key === 'Escape';
  if (!threeModeActive || (!isDeleteKey && !isEraseAlias && !isConfirmKey && !isCancelKey) ||
      event.metaKey || event.ctrlKey || event.altKey || viewer?.isPushActive?.() ||
      viewer?.isSolidTransformActive?.() ||
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
  else if (isEraseAlias) startDelete3d();
  else viewer?.deleteSelected3d?.();
  requestAnimationFrame(() => syncThreeToolState());
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
  startDeleteSolid: startDelete3d,
  confirmDeleteSolidSelection: () => viewer?.confirmDeleteSolidSelection?.() || false,
  deleteSelectedSolid: () => viewer?.deleteSelectedSolid?.() || false,
  fitView: () => {
    if (!threeModeActive) return false;
    return viewer?.fitView?.() || false;
  },
  refreshDocument: refreshDocumentView,
  createNewSketch,
  editSelectedSketch,
  finishSketchEdit,
  startPush,
  startLine3d,
  startCopySolids,
  startMoveSolids,
  startRotateSolids,
  setProjectionPreference,
  syncSettings: syncViewSettings,
};

applyToolbarMode(document, TOOLBAR_MODE_2D);
setThreeToolsDisabled(false);
syncThreeToolState('select');
syncProjectionMenu();

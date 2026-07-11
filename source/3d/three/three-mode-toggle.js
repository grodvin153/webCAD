/* webCAD - Alternancia reversible entre vistas 2D y 3D | SPDX-License-Identifier: GPL-3.0-or-later */

const canvas2d = document.getElementById('cad-canvas');
const canvas3d = document.getElementById('three-canvas');
const canvasWrap = document.querySelector('.canvas-wrap');
const enterButton = document.getElementById('view-mode-3d');
const exitButton = document.getElementById('view-mode-2d');
const pushButton = document.getElementById('tool-push');
const status = document.getElementById('three-mode-status');

let viewer = null;
let loading = false;
let threeModeActive = false;
let resizeObserver = null;

function documentEntities() {
  const doc = window.webcadDebug?.doc;
  if (!doc) return [];
  return typeof doc.topLevelEntities === 'function' ? doc.topLevelEntities() : doc.entities || [];
}

function cadDocument() {
  return window.webcadDebug?.doc ?? null;
}

function viewSettings() {
  return {
    gridVisible: window.webcadDebug?.state?.snapEnabled !== false,
    navigationDevice: window.webcadDebug?.state?.navigationDevice || 'trackpad',
  };
}

function syncViewSettings() {
  if (!viewer || !threeModeActive) return;
  const settings = viewSettings();
  viewer.setGridVisible(settings.gridVisible);
  viewer.setNavigationDevice?.(settings.navigationDevice);
}

function syncSize() {
  if (!viewer || !canvasWrap || !threeModeActive) return;
  const bounds = canvasWrap.getBoundingClientRect();
  viewer.resize(bounds.width, bounds.height);
  syncViewSettings();
}

function show2dMode() {
  viewer?.stop();
  threeModeActive = false;
  canvas3d.hidden = true;
  canvas2d.hidden = false;
  enterButton.hidden = false;
  exitButton.hidden = true;
  status.hidden = true;
  canvasWrap.classList.remove('is-three-mode');
  requestAnimationFrame(() => canvas2d.focus({ preventScroll: true }));
}

async function show3dMode() {
  if (loading || threeModeActive) return;
  loading = true;
  threeModeActive = true;
  canvas2d.hidden = true;
  canvas3d.hidden = false;
  enterButton.hidden = true;
  exitButton.hidden = false;
  status.hidden = false;
  status.textContent = 'Iniciando vista 3D...';
  canvasWrap.classList.add('is-three-mode');
  await new Promise((resolve) => requestAnimationFrame(resolve));

  try {
    const entities = documentEntities();
    const settings = viewSettings();
    if (!viewer) {
      const { createThreeDemoViewer } = await import('./three-demo-viewer.js');
      viewer = createThreeDemoViewer(canvas3d, {
        doc: cadDocument(),
        entities,
        getNavigationDevice: () => viewSettings().navigationDevice,
        gridVisible: settings.gridVisible,
        navigationDevice: settings.navigationDevice,
        onStatus: (message) => { status.textContent = message; },
      });
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvasWrap);
    }
    else {
      viewer.setEntities(entities);
      viewer.setGridVisible(settings.gridVisible);
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

enterButton?.addEventListener('click', show3dMode);
exitButton?.addEventListener('click', show2dMode);
pushButton?.addEventListener('click', async () => {
  if (!threeModeActive) {
    await show3dMode();
  }
  viewer?.startPush?.();
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
  viewer?.startPush?.();
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

window.webcadThreeMode = {
  enter: show3dMode,
  exit: show2dMode,
  getViewer: () => viewer,
  isActive: () => threeModeActive,
  syncSettings: syncViewSettings,
};

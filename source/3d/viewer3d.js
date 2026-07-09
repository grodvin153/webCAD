/* webCAD - Visor 3D experimental aislado | SPDX-License-Identifier: GPL-3.0-or-later */

import { createDefaultCamera3d } from './camera3d.js';
import { renderSolidWireframe } from './wireframe-renderer.js';

const DEFAULT_BACKGROUND_COLOR = '#ffffff';
const DEFAULT_STROKE_STYLE = '#1f2937';

function viewportDimension(value) {
  const dimension = Number(value);
  return Number.isFinite(dimension) && dimension >= 0 ? dimension : 0;
}

export function createViewer3d({
  canvas: initialCanvas = null,
  camera: initialCamera,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  strokeStyle = DEFAULT_STROKE_STYLE,
} = {}) {
  let canvas = initialCanvas;
  let camera = initialCamera ?? createDefaultCamera3d();
  let solids = [];
  let viewport = { width: 0, height: 0 };

  function currentContext() {
    return canvas && typeof canvas.getContext === 'function'
      ? canvas.getContext('2d')
      : null;
  }

  function setCanvas(nextCanvas) {
    canvas = nextCanvas ?? null;
    resizeFromCanvas();
    return canvas;
  }

  function setCamera(nextCamera) {
    camera = nextCamera ?? createDefaultCamera3d();
    return camera;
  }

  function getCamera() {
    return camera;
  }

  function setSolids(nextSolids) {
    if (!Array.isArray(nextSolids)) {
      throw new TypeError('Los solidos del visor deben ser un array');
    }
    solids = [...nextSolids];
    return getSolids();
  }

  function getSolids() {
    return [...solids];
  }

  function addSolid(solid) {
    solids.push(solid);
    return solids.length;
  }

  function clearSolids() {
    solids = [];
    return getSolids();
  }

  function setViewport(width, height) {
    viewport = {
      width: viewportDimension(width),
      height: viewportDimension(height),
    };
    return { ...viewport };
  }

  function resizeFromCanvas() {
    if (!canvas) {
      return { ...viewport };
    }
    return setViewport(canvas.width, canvas.height);
  }

  function renderSolid(solid) {
    const ctx = currentContext();
    if (!ctx) {
      return [];
    }
    return renderSolidWireframe(ctx, solid, camera, viewport, { strokeStyle });
  }

  function render() {
    const ctx = currentContext();
    if (!ctx) {
      return [];
    }

    ctx.save();
    try {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, viewport.width, viewport.height);
    }
    finally {
      ctx.restore();
    }

    return solids.flatMap((solid) => renderSolid(solid));
  }

  resizeFromCanvas();

  return {
    addSolid,
    clearSolids,
    getCamera,
    getSolids,
    render,
    renderSolid,
    resizeFromCanvas,
    setCamera,
    setCanvas,
    setSolids,
    setViewport,
  };
}

/* webCAD - Visor Three.js experimental para el dibujo 2D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { entitiesToThreeEntityGroup } from './entity-line-objects.js';
import {
  createSketchAxes,
  createSketchGrid,
  disposeThreeObject,
  setSketchGridVisible,
  THREE_VIEW_STYLE,
  updateWideLineResolution,
} from './three-scene-style.js';

export function createThreeDemoViewer(canvas, { entities = [], gridVisible = true } = {}) {
  if (!canvas) {
    throw new TypeError('La vista Three.js necesita un canvas propio');
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(THREE_VIEW_STYLE.background);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 1000000);
  camera.up.set(0, 0, 1);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.screenSpacePanning = true;

  let drawingLines = null;
  let grid = null;
  let axes = null;
  let running = false;
  let disposed = false;
  let currentWidth = 1;
  let currentHeight = 1;
  let currentGridVisible = gridVisible !== false;

  function replaceGuides(center, size) {
    if (grid) {
      scene.remove(grid);
      disposeThreeObject(grid);
    }
    if (axes) {
      scene.remove(axes);
      disposeThreeObject(axes);
    }
    grid = createSketchGrid(center, size, { visible: currentGridVisible });
    axes = createSketchAxes(size);
    scene.add(grid, axes);
    updateWideLineResolution(grid, currentWidth, currentHeight);
    updateWideLineResolution(axes, currentWidth, currentHeight);
  }

  function fitCameraToDrawing() {
    const bounds = drawingLines?.userData?.bounds;
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    if (!bounds || bounds.isEmpty()) {
      center.set(0, 0, 0);
      size.set(20, 20, 1);
    }
    else {
      bounds.getCenter(center);
      bounds.getSize(size);
    }
    const extent = Math.max(size.x, size.y, size.z, 1);
    const distance = extent * 1.9;
    camera.position.set(
      center.x + distance,
      center.y - distance,
      center.z + distance * 0.72,
    );
    camera.near = Math.max(extent / 10000, 0.001);
    camera.far = Math.max(extent * 100, 1000);
    camera.lookAt(center);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    controls.target.copy(center);
    controls.update();
    replaceGuides(center, extent);
  }

  function setEntities(nextEntities) {
    if (drawingLines) {
      scene.remove(drawingLines);
      disposeThreeObject(drawingLines);
    }
    drawingLines = entitiesToThreeEntityGroup(nextEntities, {
      onWarning: (message) => console.warn(message),
    });
    scene.add(drawingLines);
    updateWideLineResolution(drawingLines, currentWidth, currentHeight);
    fitCameraToDrawing();
    renderFrame();
    return drawingLines.userData.segmentCount || 0;
  }

  function setGridVisible(visible) {
    currentGridVisible = visible !== false;
    setSketchGridVisible(grid, currentGridVisible);
    renderFrame();
  }

  function renderFrame() {
    if (disposed) return;
    updateWideLineResolution(scene, currentWidth, currentHeight);
    controls.update();
    renderer.render(scene, camera);
  }

  function resize(width = canvas.clientWidth || canvas.width || 640,
    height = canvas.clientHeight || canvas.height || 420) {
    if (disposed) return;
    const safeWidth = Math.max(1, Math.round(width));
    const safeHeight = Math.max(1, Math.round(height));
    currentWidth = safeWidth;
    currentHeight = safeHeight;
    renderer.setSize(safeWidth, safeHeight, false);
    camera.aspect = safeWidth / safeHeight;
    camera.updateProjectionMatrix();
    updateWideLineResolution(scene, safeWidth, safeHeight);
    renderFrame();
  }

  function start() {
    if (disposed || running) return;
    running = true;
    renderer.setAnimationLoop(renderFrame);
  }

  function stop() {
    if (disposed || !running) return;
    running = false;
    renderer.setAnimationLoop(null);
  }

  function dispose() {
    if (disposed) return;
    stop();
    disposed = true;
    controls.dispose();
    disposeThreeObject(drawingLines);
    disposeThreeObject(grid);
    disposeThreeObject(axes);
    renderer.dispose();
  }

  resize();
  setEntities(entities);
  start();

  return {
    camera,
    controls,
    dispose,
    getSegmentCount: () => drawingLines?.userData.segmentCount || 0,
    getEntityCount: () => drawingLines?.userData.entityCount || 0,
    render: renderFrame,
    renderer,
    resize,
    scene,
    setEntities,
    setGridVisible,
    start,
    stop,
  };
}

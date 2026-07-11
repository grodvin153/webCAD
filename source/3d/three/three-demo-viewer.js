/* webCAD - Visor Three.js experimental para el dibujo 2D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { entitiesToThreeEntityGroup } from './entity-line-objects.js';
import { visibleEntitiesForThreeView } from './entity-visibility.js';
import { pushSourceKeyFromEntity, pushSourceKeyFromFace } from './push-geometry.js';
import { createPushCommand } from './push-command.js';
import { createFaceMesh, detectSimpleClosedFaces } from './simple-faces.js';
import {
  createSolidFaceSelectionMesh,
  solidFaceFromMeshHit,
} from './solid-face-selection.js';
import { configureThreeNavigationControls } from './three-navigation-controls.js';
import { updatePushSilhouettes } from './push-silhouette.js';
import {
  createSketchAxes,
  createSketchGrid,
  disposeThreeObject,
  setSketchGridVisible,
  THREE_VIEW_STYLE,
  updateWideLineResolution,
} from './three-scene-style.js';

export function createThreeDemoViewer(canvas, {
  doc = null,
  entities = [],
  getNavigationDevice = () => 'trackpad',
  gridVisible = true,
  navigationDevice = getNavigationDevice(),
  onStatus = null,
} = {}) {
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
  let faceGroup = null;
  let selectedFace = null;
  let grid = null;
  let axes = null;
  let running = false;
  let disposed = false;
  let currentWidth = 1;
  let currentHeight = 1;
  let currentGridVisible = gridVisible !== false;
  const pushSessions = new Map();
  const pushEntitySessions = new Map();
  const pushedSourceEntities = new Set();
  const pushedSourceKeys = new Set();

  const lights = new THREE.Group();
  lights.name = 'webcad-3d-sketchup-lights';
  lights.add(
    new THREE.AmbientLight(0xffffff, 0.58),
    new THREE.DirectionalLight(0xffffff, 1.35),
  );
  lights.children[1].position.set(180, -220, 360);
  scene.add(lights);

  const navigation = configureThreeNavigationControls({
    camera,
    canvas: renderer.domElement,
    controls,
    getNavigationDevice,
    render: renderFrame,
    viewport: () => ({ width: currentWidth, height: currentHeight }),
  });
  navigation.setNavigationDevice(navigationDevice);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pushCommand = createPushCommand({
    camera,
    canvas: renderer.domElement,
    controls,
    getSelectedFace: () => selectedFace,
    onConsumeFace: (faceMesh, finalSolidGroup, session) => {
      const face = faceMesh?.userData?.face;
      const key = session?.sourceKey || pushSourceKeyFromFace(faceMesh?.userData?.face);
      const solid = finalSolidGroup?.userData?.solid ?? null;
      const sourceSolidDocumentId = face?.sourceSolidDocumentId ?? null;
      let documentRecord = null;
      if (doc && solid) {
        const operation = operationFromPush(face, session);
        documentRecord = sourceSolidDocumentId
          ? doc.replace3dSolid?.(sourceSolidDocumentId, solid, { operation })
          : doc.add3dSolid?.(solid, { operation });
        if (documentRecord) {
          pushCommand.tagDocumentSolidGroup?.(finalSolidGroup, documentRecord);
        }
      }
      if (key) {
        pushSessions.set(key, {
          height: session.height,
          sourceKey: key,
        });
        pushedSourceKeys.add(key);
      }
      const sourceEntity = faceMesh?.userData?.face?.sourceEntity;
      if (sourceEntity) {
        pushEntitySessions.set(sourceEntity, {
          height: session.height,
          sourceKey: key,
        });
        pushedSourceEntities.add(sourceEntity);
      }
      applyPushedSourceVisibility();
      if (faceMesh === selectedFace) {
        if (faceMesh?.userData?.transientSelection) {
          scene.remove(faceMesh);
          disposeThreeObject(faceMesh);
        }
        selectedFace = null;
      }
    },
    onStatus,
    render: renderFrame,
    scene,
    viewport: () => ({ width: currentWidth, height: currentHeight }),
  });

  function documentSolidRecords() {
    return Array.isArray(doc?.model3d?.solids)
      ? doc.model3d.solids.filter((record) => record?.visible !== false && record?.solid)
      : [];
  }

  function sourceKeyFromDocumentSolid(record) {
    return record?.metadata?.sourceKey ??
      record?.solid?.metadata?.sourceKey ??
      record?.operation?.sourceKey ??
      null;
  }

  function operationFromPush(face, session) {
    if (face?.sourceSolid) {
      return {
        type: 'pushMoveFace',
        distance: session?.height ?? null,
        sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
        sourceSolidFaceIndex: face.sourceSolidFaceIndex ?? null,
        sourceKey: session?.sourceKey ?? pushSourceKeyFromFace(face),
      };
    }
    return {
      type: 'pushFromProfile',
      distance: session?.height ?? null,
      sourceEntityId: face?.sourceEntity?.id ?? face?.sourceEntity?.handle ?? null,
      sourceEntityType: face?.sourceEntity?.type ?? null,
      sourceKey: session?.sourceKey ?? pushSourceKeyFromFace(face),
    };
  }

  function clearSelectedFaceVisual() {
    if (!selectedFace) return;
    if (selectedFace.userData?.transientSelection) {
      scene.remove(selectedFace);
      disposeThreeObject(selectedFace);
      return;
    }
    if (selectedFace.material) {
      selectedFace.material.color.set(selectedFace.userData.defaultColor ?? 0xf5f2eb);
      selectedFace.material.opacity = 1;
      selectedFace.material.transparent = false;
    }
  }

  function setSelectedFace(mesh) {
    if (mesh !== selectedFace && pushCommand.isActive()) {
      pushCommand.cancel();
    }
    clearSelectedFaceVisual();
    selectedFace = mesh || null;
    if (selectedFace?.material) {
      selectedFace.material.color.set(selectedFace.userData.selectedColor ?? 0xffd166);
      selectedFace.material.opacity = 1;
      selectedFace.material.transparent = selectedFace.userData?.transientSelection === true;
      onStatus?.(selectedFace.userData?.type === 'webcad-push-solid-face-selection'
        ? 'Cara de solido seleccionada'
        : 'Recinto seleccionado');
    }
    renderFrame();
  }

  function rememberPushStartPointer(mesh, event) {
    if (!mesh?.userData || !event) return;
    mesh.userData.pushStartPointer = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function pickSolidFace(event) {
    const solidObjects = pushCommand.getSolidObjects?.() ?? [];
    if (!solidObjects.length) return false;
    const hit = raycaster.intersectObjects(solidObjects, true)
      .find((candidate) => candidate?.object?.userData?.type === 'webcad-push-solid');
    const face = solidFaceFromMeshHit(hit);
    if (!face) return false;
    const selectionMesh = createSolidFaceSelectionMesh(face);
    if (!selectionMesh) return false;
    rememberPushStartPointer(selectionMesh, event);
    scene.add(selectionMesh);
    setSelectedFace(selectionMesh);
    return true;
  }

  function pickFace(event) {
    if (pushCommand.isActive()) return;
    if (!faceGroup?.children.length) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
    if (pickSolidFace(event)) return;
    const hit = raycaster.intersectObjects(faceGroup.children, false)[0];
    if (hit?.object?.userData?.type === 'webcad-simple-face') {
      rememberPushStartPointer(hit.object, event);
      setSelectedFace(hit.object);
      return;
    }
    setSelectedFace(null);
    onStatus?.('');
  }

  function onKeyDown(event) {
    if (event.key !== 'Escape' || !selectedFace) return;
    setSelectedFace(null);
    onStatus?.('');
  }

  function applyPushedSourceVisibility() {
    drawingLines?.children?.forEach((object) => {
      const entity = object.userData?.entity;
      const entityKey = pushSourceKeyFromEntity(entity) || object.userData?.entityKey;
      object.visible = !(
        pushedSourceEntities.has(entity) ||
        pushedSourceKeys.has(entityKey)
      );
    });
    renderFrame();
  }

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
    if (faceGroup) {
      scene.remove(faceGroup);
      disposeThreeObject(faceGroup);
    }
    setSelectedFace(null);
    pushedSourceEntities.clear();
    pushedSourceKeys.clear();
    const visibleEntities = visibleEntitiesForThreeView(nextEntities);
    faceGroup = new THREE.Group();
    faceGroup.name = 'webcad-3d-simple-faces';
    pushCommand.clearSolids();
    const documentSolidsBySourceKey = new Map();
    documentSolidRecords().forEach((record) => {
      pushCommand.addDocumentSolid?.(record);
      const sourceKey = sourceKeyFromDocumentSolid(record);
      if (sourceKey) {
        documentSolidsBySourceKey.set(sourceKey, record);
        pushedSourceKeys.add(sourceKey);
      }
    });
    detectSimpleClosedFaces(visibleEntities).forEach((face) => {
      const faceMesh = createFaceMesh(face);
      const sourceKey = pushSourceKeyFromFace(face);
      const documentSolid = documentSolidsBySourceKey.get(sourceKey);
      const session = documentSolid
        ? null
        : pushEntitySessions.get(face.sourceEntity) || pushSessions.get(sourceKey);
      if (documentSolid) {
        faceMesh.visible = false;
        if (face.sourceEntity) pushedSourceEntities.add(face.sourceEntity);
        if (sourceKey) pushedSourceKeys.add(sourceKey);
      }
      if (session) {
        faceMesh.visible = false;
        if (face.sourceEntity) pushedSourceEntities.add(face.sourceEntity);
        if (sourceKey) pushedSourceKeys.add(sourceKey);
        if (session.sourceKey) pushedSourceKeys.add(session.sourceKey);
        pushCommand.addSessionSolid(face, session.height);
      }
      faceGroup.add(faceMesh);
    });
    scene.add(faceGroup);
    drawingLines = entitiesToThreeEntityGroup(visibleEntities, {
      onWarning: (message) => console.warn(message),
    });
    scene.add(drawingLines);
    applyPushedSourceVisibility();
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
    updatePushSilhouettes(scene, camera);
    updateWideLineResolution(scene, currentWidth, currentHeight);
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
    clearSelectedFaceVisual();
    selectedFace = null;
    disposed = true;
    renderer.domElement.removeEventListener('click', pickFace);
    renderer.domElement.removeEventListener('keydown', onKeyDown);
    controls.dispose();
    navigation.dispose();
    disposeThreeObject(drawingLines);
    disposeThreeObject(faceGroup);
    disposeThreeObject(grid);
    disposeThreeObject(axes);
    disposeThreeObject(lights);
    pushCommand.dispose();
    renderer.dispose();
  }

  renderer.domElement.addEventListener('click', pickFace);
  renderer.domElement.addEventListener('keydown', onKeyDown);
  resize();
  setEntities(entities);
  start();

  return {
    camera,
    controls,
    dispose,
    getSegmentCount: () => drawingLines?.userData.segmentCount || 0,
    getFaceCount: () => faceGroup?.children.length || 0,
    getEntityCount: () => drawingLines?.userData.entityCount || 0,
    render: renderFrame,
    renderer,
    resize,
    scene,
    setEntities,
    setGridVisible,
    setNavigationDevice: navigation.setNavigationDevice,
    startPush: pushCommand.start,
    start,
    stop,
  };
}

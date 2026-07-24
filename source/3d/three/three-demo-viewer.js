/* webCAD - Visor Three.js experimental para el dibujo 2D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {
  normalizePrincipalPlane,
  principalPlaneDefinition,
} from '../principal-plane.js';
import {
  faceOnSketchPlane,
  normalizeSketchPlane,
  pointFromSketchPlane,
  pointOnSketchPlane,
  principalSketchPlane,
} from '../sketch-plane.js';
import {
  faceOverlapsSketchSupport,
  faceTouchesSketchSupport,
  sketchSupportBoundaryEntities,
} from '../sketch-reference.js';
import { entitiesToThreeEntityGroup } from './entity-line-objects.js';
import { visibleEntitiesForThreeView } from './entity-visibility.js';
import { pushSourceKeyFromEntity, pushSourceKeyFromFace } from './push-geometry.js';
import { createPushCommand } from './push-command.js';
import { initializeManifoldBoolean } from './manifold-boolean.js';
import { nearestSolidEdgeAtPointer } from './solid-edge-interaction.js';
import { nearestSolidObjectSnap } from './solid-object-snaps.js';
import { createFaceMesh, detectSimpleClosedFaces } from './simple-faces.js';
import {
  createSolidFaceSelectionMesh,
  SOLID_FACE_HOVER_RENDER_ORDER,
  SOLID_FACE_SUPPORT_RENDER_ORDER,
  solidFaceFromMeshHit,
  solidFaceFromPlanarGroup,
} from './solid-face-selection.js';
import { configureThreeNavigationControls } from './three-navigation-controls.js';
import { updatePushSilhouettes } from './push-silhouette.js';
import { cameraClipRangeForBounds } from './camera-clipping.js';
import {
  createSketchAxes,
  createSketchGround,
  createSketchGrid,
  createWideLineSegments,
  disposeThreeObject,
  setSketchGridVisible,
  THREE_VIEW_STYLE,
  updateWideLineResolution,
} from './three-scene-style.js';

const SILHOUETTE_CAMERA_SETTLE_MS = 70;
const CAMERA_EDGE_TYPES = new Set([
  'webcad-push-solid-edges',
  'webcad-push-solid-tangent-edges',
  'webcad-push-visible-edge-overlay',
  'webcad-push-silhouette',
  'webcad-push-generatrix-silhouette',
  'webcad-push-solid-hidden-edges',
]);

function viewerClock() {
  return globalThis.performance?.now?.() ?? Date.now();
}

export async function createThreeDemoViewer(canvas, {
  doc = null,
  entities = [],
  getNavigationDevice = () => 'trackpad',
  gridVisible = true,
  axesVisible = true,
  navigationDevice = getNavigationDevice(),
  sketchPlane = doc?.model3d?.sketchPlane ?? 'XY',
  onEdgeInfo = null,
  onStatus = null,
} = {}) {
  if (!canvas) {
    throw new TypeError('La vista Three.js necesita un canvas propio');
  }
  await initializeManifoldBoolean();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(THREE_VIEW_STYLE.background);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 1000000);
  camera.up.set(0, 0, 1);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.screenSpacePanning = true;

  let drawingLines = null;
  let faceGroup = null;
  let selectedFace = null;
  let hoveredSketchFace = null;
  let hoveredSolidFace = null;
  let hoveredSolidEdge = null;
  let selectedSolidEdge = null;
  let solidEdgeHighlight = null;
  let solidEdgeHighlightKey = null;
  let solidSnapMarker = null;
  const selectedDocumentSolidIds = new Set();
  let deleteSolidMode = false;
  let grid = null;
  let ground = null;
  let axes = null;
  let running = false;
  let disposed = false;
  let currentWidth = 1;
  let currentHeight = 1;
  let currentGridVisible = gridVisible !== false;
  let currentAxesVisible = axesVisible !== false;
  let currentSketchPlane = normalizePrincipalPlane(sketchPlane);
  let hiddenEdgesVisible = false;
  let lastCameraMotionAt = -Infinity;
  let forceSilhouetteRefresh = false;
  let silhouetteSettleTimer = null;
  let cameraEdgesSuppressed = false;
  const cameraEdgeVisibility = new Map();
  const activeCameraPointers = new Set();
  const documentBounds = new THREE.Box3().makeEmpty();
  const pushSessions = new Map();
  const pushEntitySessions = new Map();
  const pushedSourceEntities = new Set();
  const pushedSourceKeys = new Set();

  function refreshSilhouettesWhenCameraSettles() {
    silhouetteSettleTimer = null;
    if (disposed) return;
    if (activeCameraPointers.size) return;
    const remaining = SILHOUETTE_CAMERA_SETTLE_MS -
      (viewerClock() - lastCameraMotionAt);
    if (remaining > 1) {
      silhouetteSettleTimer = globalThis.setTimeout(
        refreshSilhouettesWhenCameraSettles,
        remaining,
      );
      return;
    }
    suppressCameraEdges(false);
    forceSilhouetteRefresh = true;
    renderFrame();
  }

  function scheduleSettledSilhouetteRefresh() {
    if (silhouetteSettleTimer !== null) return;
    silhouetteSettleTimer = globalThis.setTimeout(
      refreshSilhouettesWhenCameraSettles,
      SILHOUETTE_CAMERA_SETTLE_MS,
    );
  }

  function rememberCameraMotion() {
    lastCameraMotionAt = viewerClock();
    suppressCameraEdges(true);
    scheduleSettledSilhouetteRefresh();
  }

  function startPointerCameraMotion(event) {
    activeCameraPointers.add(event.pointerId);
  }

  function finishPointerCameraMotion(event) {
    if (disposed) return;
    activeCameraPointers.delete(event.pointerId);
    if (activeCameraPointers.size) return;
    suppressCameraEdges(false);
    forceSilhouetteRefresh = true;
    renderFrame();
  }

  function suppressCameraEdges(suppressed) {
    cameraEdgesSuppressed = suppressed === true;
    if (cameraEdgesSuppressed) {
      scene.traverse((object) => {
        if (!CAMERA_EDGE_TYPES.has(object.userData?.type)) return;
        if (!cameraEdgeVisibility.has(object)) {
          cameraEdgeVisibility.set(object, object.visible);
        }
        object.visible = false;
      });
      return;
    }
    cameraEdgeVisibility.forEach((visible, object) => {
      object.visible = visible;
    });
    cameraEdgeVisibility.clear();
  }

  controls.addEventListener('change', rememberCameraMotion);

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

  function sketchPlaneMatrix(plane = principalSketchPlane(currentSketchPlane)) {
    const definition = normalizeSketchPlane(plane);
    return new THREE.Matrix4().makeBasis(
      new THREE.Vector3(definition.xAxis.x, definition.xAxis.y, definition.xAxis.z),
      new THREE.Vector3(definition.yAxis.x, definition.yAxis.y, definition.yAxis.z),
      new THREE.Vector3(definition.normal.x, definition.normal.y, definition.normal.z),
    ).setPosition(definition.origin.x, definition.origin.y, definition.origin.z);
  }

  function applySketchPlaneTransform(object, plane) {
    object?.applyMatrix4?.(sketchPlaneMatrix(plane));
    return object;
  }

  function isUsablePushSnap(face, snap) {
    const origin = face?.points?.[0];
    const point = snap?.point;
    const normal = face?.normal ?? { x: 0, y: 0, z: 1 };
    if (!origin || !point) return false;
    const originX = Number(origin.x);
    const originY = Number(origin.y);
    const originZ = Number(origin.z ?? 0);
    const pointX = Number(point.x);
    const pointY = Number(point.y);
    const pointZ = Number(point.z ?? 0);
    const normalX = Number(normal.x ?? 0);
    const normalY = Number(normal.y ?? 0);
    const normalZ = Number(normal.z ?? 0);
    const distance = (
      (pointX - originX) * normalX +
      (pointY - originY) * normalY +
      (pointZ - originZ) * normalZ
    );
    return Number.isFinite(distance) && Math.abs(distance) > 1e-9;
  }

  const pushCommand = createPushCommand({
    camera,
    canvas: renderer.domElement,
    controls,
    getSelectedFace: () => selectedFace,
    getObjectSnap: (event, face) => nearestSolidObjectSnap({
      camera,
      canvas: renderer.domElement,
      event,
      solidObjects: pushCommand.getSolidObjects?.() ?? [],
      maxDistancePixels: 20,
      acceptCandidate: (snap) => isUsablePushSnap(face, snap),
    }),
    onObjectSnap: setSolidSnapMarker,
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
          setSelectedDocumentSolid(documentRecord.id);
          if (face?.sketchId) {
            doc.set3dSketchVisibility?.(face.sketchId, false, { recordHistory: false });
            drawingLines?.traverse?.((object) => {
              if (object.userData?.sketchId === face.sketchId) object.visible = false;
            });
            faceGroup?.traverse?.((object) => {
              if (object.userData?.sketchId === face.sketchId) object.visible = false;
            });
          }
        }
      }
      if (key) {
        if (!documentRecord) {
          pushSessions.set(key, {
            height: session.height,
            sourceKey: key,
          });
        }
        pushedSourceKeys.add(key);
      }
      const sourceEntity = faceMesh?.userData?.face?.sourceEntity;
      if (sourceEntity) {
        if (!documentRecord) {
          pushEntitySessions.set(sourceEntity, {
            height: session.height,
            sourceKey: key,
          });
        }
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
      renderFrame();
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
    if (face?.supportSolid) {
      const distance = session?.height ?? null;
      const additive = face.supportContactOnly === true || distance >= 0;
      return {
        type: additive ? 'pushUnionProfile' : 'pushSubtractProfile',
        distance,
        tangentContact: face.supportContactOnly === true,
        sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
        sourceSolidFaceIndices: face.sourceSolidFaceIndices ?? null,
        sketchPlane: face.sketchPlane ?? currentSketchPlane,
        sketchId: face.sketchId ?? null,
        workplane: face.workplane ?? null,
        exactProfile: face.exactProfile ?? null,
        sourceKey: session?.sourceKey ?? pushSourceKeyFromFace(face),
      };
    }
    if (face?.sourceSolid) {
      return {
        type: 'pushMoveFace',
        distance: session?.height ?? null,
        sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
        sourceSolidFaceIndex: face.sourceSolidFaceIndex ?? null,
        sourceSolidFaceIndices: face.sourceSolidFaceIndices ?? null,
        sketchPlane: face.sketchPlane ?? currentSketchPlane,
        sketchId: face.sketchId ?? null,
        workplane: face.workplane ?? null,
        sourceKey: session?.sourceKey ?? pushSourceKeyFromFace(face),
      };
    }
    return {
      type: 'pushFromProfile',
      distance: session?.height ?? null,
      sourceEntityId: face?.sourceEntity?.id ?? face?.sourceEntity?.handle ?? null,
      sourceEntityType: face?.sourceEntity?.type ?? null,
      sketchPlane: face?.sketchPlane ?? currentSketchPlane,
      sketchId: face?.sketchId ?? null,
      workplane: face?.workplane ?? null,
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
      selectedFace.material.opacity = selectedFace.userData.defaultOpacity ?? 1;
      selectedFace.material.transparent = selectedFace.userData.defaultTransparent === true;
    }
  }

  function restoreSketchFaceVisual(mesh) {
    if (!mesh?.material || mesh === selectedFace) return;
    mesh.material.color.set(mesh.userData.defaultColor ?? 0xf5f2eb);
    mesh.material.opacity = mesh.userData.defaultOpacity ?? 1;
    mesh.material.transparent = mesh.userData.defaultTransparent === true;
  }

  function clearHoveredFaceVisual() {
    restoreSketchFaceVisual(hoveredSketchFace);
    hoveredSketchFace = null;
    if (hoveredSolidFace) {
      scene.remove(hoveredSolidFace);
      disposeThreeObject(hoveredSolidFace);
      hoveredSolidFace = null;
    }
  }

  function clearSolidEdgeHighlight() {
    if (!solidEdgeHighlight) return;
    scene.remove(solidEdgeHighlight);
    disposeThreeObject(solidEdgeHighlight);
    solidEdgeHighlight = null;
    solidEdgeHighlightKey = null;
  }

  function updateSolidEdgeHighlight() {
    const edge = hoveredSolidEdge ?? selectedSolidEdge;
    const selected = edge === selectedSolidEdge && !hoveredSolidEdge;
    const highlightKey = edge ? `${edge.key}:${selected ? 'selected' : 'hovered'}` : null;
    if (highlightKey === solidEdgeHighlightKey) {
      onEdgeInfo?.(edge);
      return;
    }
    clearSolidEdgeHighlight();
    onEdgeInfo?.(edge);
    if (!edge?.start || !edge?.end) return;
    const highlightSegments = Array.isArray(edge.segments) && edge.segments.length
      ? edge.segments
      : [edge];
    solidEdgeHighlight = createWideLineSegments(highlightSegments, {
      color: selected ? 0xffb02e : 0x00cbe6,
      depthTest: false,
      depthWrite: false,
      linewidth: selected ? 5 : 4,
      renderOrder: 64,
    });
    solidEdgeHighlight.name = 'webcad-selected-solid-edge';
    solidEdgeHighlight.userData = {
      ...solidEdgeHighlight.userData,
      documentSolidId: edge.documentSolidId,
      edge,
      type: selected ? 'webcad-solid-edge-selection' : 'webcad-solid-edge-hover',
    };
    solidEdgeHighlightKey = highlightKey;
    scene.add(solidEdgeHighlight);
  }

  function setHoveredSolidEdge(edge = null) {
    if (hoveredSolidEdge?.key === edge?.key) return;
    hoveredSolidEdge = edge;
    updateSolidEdgeHighlight();
  }

  function clearHoveredSolidEdge() {
    if (!hoveredSolidEdge) return;
    hoveredSolidEdge = null;
    updateSolidEdgeHighlight();
  }

  function setSelectedSolidEdge(edge = null) {
    hoveredSolidEdge = null;
    selectedSolidEdge = edge;
    updateSolidEdgeHighlight();
  }

  function setHoveredSketchFace(mesh) {
    if (mesh === hoveredSketchFace && !hoveredSolidFace) return;
    clearHoveredFaceVisual();
    if (!mesh || mesh === selectedFace || !mesh.material) return;
    hoveredSketchFace = mesh;
    mesh.material.color.set(0xffdf85);
    mesh.material.opacity = 0.72;
    mesh.material.transparent = true;
  }

  function setHoveredSolidFace(face) {
    if (!face) {
      clearHoveredFaceVisual();
      return;
    }
    if (hoveredSolidFace?.userData?.faceId === face.id) return;
    clearHoveredFaceVisual();
    if (selectedFace?.userData?.faceId === face.id) return;
    const overlay = createSolidFaceSelectionMesh(face);
    if (!overlay) return;
    overlay.name = `webcad-hovered-${face.id}`;
    overlay.renderOrder = SOLID_FACE_HOVER_RENDER_ORDER;
    overlay.material.color.set(0xffdf85);
    overlay.material.opacity = 0.38;
    overlay.userData.type = 'webcad-solid-face-hover';
    hoveredSolidFace = overlay;
    scene.add(overlay);
  }

  function setSolidSnapMarker(snap) {
    if (!snap?.point) {
      if (solidSnapMarker) solidSnapMarker.visible = false;
      return;
    }
    if (!solidSnapMarker) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      const material = new THREE.PointsMaterial({
        color: 0x00d9ff,
        depthTest: false,
        depthWrite: false,
        size: 13,
        sizeAttenuation: false,
      });
      solidSnapMarker = new THREE.Points(geometry, material);
      solidSnapMarker.name = 'webcad-3d-object-snap';
      solidSnapMarker.renderOrder = 60;
      scene.add(solidSnapMarker);
    }
    const colors = {
      endpoint: 0x00d9ff,
      midpoint: 0x48d85b,
      center: 0xff4fd8,
      faceCenter: 0xffcf4d,
    };
    solidSnapMarker.position.set(Number(snap.point.x), Number(snap.point.y), Number(snap.point.z));
    solidSnapMarker.material.color.setHex(colors[snap.type] ?? colors.endpoint);
    solidSnapMarker.visible = true;
  }

  function setSolidObjectSelected(object, selected) {
    const material = object?.material;
    if (!material?.emissive) return;
    if (object.userData.defaultEmissive === undefined) {
      object.userData.defaultColor = material.color.getHex();
      object.userData.defaultEmissive = material.emissive.getHex();
      object.userData.defaultEmissiveIntensity = material.emissiveIntensity;
    }
    material.color.setHex(selected ? 0xffa81f : object.userData.defaultColor);
    material.emissive.setHex(selected ? 0x5a2800 : object.userData.defaultEmissive);
    material.emissiveIntensity = selected ? 0.5 : object.userData.defaultEmissiveIntensity;
  }

  function setSelectedDocumentSolids(ids = []) {
    selectedDocumentSolidIds.clear();
    ids.forEach((id) => {
      if (id) selectedDocumentSolidIds.add(id);
    });
    (pushCommand.getSolidObjects?.() ?? []).forEach((group) => {
      const selected = selectedDocumentSolidIds.has(group.userData?.documentSolidId);
      group.traverse?.((object) => setSolidObjectSelected(object, selected));
    });
  }

  function setSelectedDocumentSolid(id) {
    setSelectedDocumentSolids(id ? [id] : []);
  }

  function addSelectedDocumentSolid(id) {
    if (!id) return false;
    selectedDocumentSolidIds.add(id);
    (pushCommand.getSolidObjects?.() ?? []).forEach((group) => {
      const selected = selectedDocumentSolidIds.has(group.userData?.documentSolidId);
      group.traverse?.((object) => setSolidObjectSelected(object, selected));
    });
    return true;
  }

  function setSelectedFace(mesh) {
    if (mesh !== selectedFace && pushCommand.isActive()) {
      pushCommand.cancel();
    }
    clearHoveredFaceVisual();
    setSelectedSolidEdge(null);
    clearSelectedFaceVisual();
    selectedFace = mesh || null;
    setSelectedDocumentSolids();
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

  function setPointerFromEvent(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  }

  function solidEdgeAtPointer(maxDistancePixels = 4) {
    return nearestSolidEdgeAtPointer(
      pushCommand.getSolidObjects?.() ?? [],
      camera,
      pointer,
      { width: currentWidth, height: currentHeight },
      { includeHidden: hiddenEdgesVisible, maxDistancePixels },
    );
  }

  function vectorFromPoint(point) {
    return new THREE.Vector3(
      Number(point?.x) || 0,
      Number(point?.y) || 0,
      Number(point?.z) || 0,
    );
  }

  function solidHitAtPointer() {
    const solidObjects = pushCommand.getSolidObjects?.() ?? [];
    if (!solidObjects.length) return null;
    return raycaster.intersectObjects(solidObjects, true)
      .find((candidate) => candidate?.object?.userData?.type === 'webcad-push-solid');
  }

  function isVisibleInScene(object) {
    for (let current = object; current; current = current.parent) {
      if (current.visible === false) return false;
    }
    return true;
  }

  function sketchFaceHitAtPointer() {
    if (!faceGroup?.children.length) return null;
    return raycaster.intersectObjects(faceGroup.children, true)
      .filter((candidate) => candidate?.object?.userData?.type === 'webcad-simple-face' &&
        isVisibleInScene(candidate.object))
      .sort((first, second) => {
        const areaDifference = (Number(first.object.userData?.face?.area) || Infinity) -
          (Number(second.object.userData?.face?.area) || Infinity);
        return Math.abs(areaDifference) > 1e-9 ? areaDifference : first.distance - second.distance;
      })[0] ?? null;
  }

  function pointSegmentDistance2d(point, start, end) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const lengthSquared = deltaX * deltaX + deltaY * deltaY;
    if (lengthSquared <= 1e-12) return point.distanceTo(start);
    const parameter = THREE.MathUtils.clamp(
      ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared,
      0,
      1,
    );
    return point.distanceTo(new THREE.Vector2(
      start.x + deltaX * parameter,
      start.y + deltaY * parameter,
    ));
  }

  function tangentFaceAtPointer(maxDistancePixels = 7) {
    const pointerPixels = new THREE.Vector2(
      (pointer.x + 1) * currentWidth * 0.5,
      (1 - pointer.y) * currentHeight * 0.5,
    );
    let best = null;
    (pushCommand.getSolidObjects?.() ?? []).forEach((group) => {
      const mesh = group.children?.find((child) => child.userData?.type === 'webcad-push-solid');
      const solid = mesh?.userData?.solid;
      (solid?.metadata?.tangentEdges ?? []).forEach((edge) => {
        const start = solid.vertices?.[edge.startIndex];
        const end = solid.vertices?.[edge.endIndex];
        if (!start || !end) return;
        const projectedStart = vectorFromPoint(start).project(camera);
        const projectedEnd = vectorFromPoint(end).project(camera);
        if (projectedStart.z < -1 && projectedEnd.z < -1 ||
            projectedStart.z > 1 && projectedEnd.z > 1) return;
        const startPixels = new THREE.Vector2(
          (projectedStart.x + 1) * currentWidth * 0.5,
          (1 - projectedStart.y) * currentHeight * 0.5,
        );
        const endPixels = new THREE.Vector2(
          (projectedEnd.x + 1) * currentWidth * 0.5,
          (1 - projectedEnd.y) * currentHeight * 0.5,
        );
        const screenDistance = pointSegmentDistance2d(pointerPixels, startPixels, endPixels);
        const midpoint = vectorFromPoint(start).add(vectorFromPoint(end)).multiplyScalar(0.5);
        const cameraDistance = camera.position.distanceTo(midpoint);
        if (screenDistance > maxDistancePixels ||
            best && (screenDistance > best.screenDistance + 0.25 ||
              Math.abs(screenDistance - best.screenDistance) <= 0.25 &&
              cameraDistance >= best.cameraDistance)) return;
        const face = solidFaceFromPlanarGroup(mesh, edge.planarGroupIndex);
        if (face) best = { cameraDistance, face, screenDistance };
      });
    });
    return best?.face ?? null;
  }

  function hoverFace(event) {
    if (pushCommand.isActive() || deleteSolidMode || event.buttons) {
      clearHoveredFaceVisual();
      clearHoveredSolidEdge();
      return;
    }
    setPointerFromEvent(event);
    const solidEdge = solidEdgeAtPointer();
    if (solidEdge) {
      clearHoveredFaceVisual();
      setHoveredSolidEdge(solidEdge);
      renderFrame();
      return;
    }
    clearHoveredSolidEdge();
    const sketchHit = sketchFaceHitAtPointer();
    if (sketchHit) {
      setHoveredSketchFace(sketchHit.object);
      renderFrame();
      return;
    }
    const tangentFace = tangentFaceAtPointer();
    if (tangentFace) {
      setHoveredSolidFace(tangentFace);
      renderFrame();
      return;
    }
    const solidFace = solidFaceFromMeshHit(solidHitAtPointer());
    if (solidFace) {
      setHoveredSolidFace(solidFace);
      renderFrame();
      return;
    }
    clearHoveredFaceVisual();
    renderFrame();
  }

  function leaveFaceHover() {
    clearHoveredFaceVisual();
    clearHoveredSolidEdge();
    renderFrame();
  }

  function pickSolidFace(event, hit = solidHitAtPointer()) {
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
    setPointerFromEvent(event);
    const solidHit = solidHitAtPointer();
    if (deleteSolidMode) {
      const id = solidHit?.object?.userData?.documentSolidId ?? null;
      if (id) {
        addSelectedDocumentSolid(id);
        const count = selectedDocumentSolidIds.size;
        onStatus?.(`Borrar ${count} solido${count === 1 ? '' : 's'} · confirme con Enter, Espacio o clic derecho`);
        renderFrame();
      }
      else onStatus?.('Borrar solido · seleccione una cara de un solido 3D');
      return;
    }
    const solidEdge = solidEdgeAtPointer();
    if (solidEdge) {
      clearHoveredFaceVisual();
      setSelectedFace(null);
      setSelectedSolidEdge(solidEdge);
      const length = Number(solidEdge.length);
      const label = Number.isFinite(length)
        ? length.toLocaleString('es-ES', { maximumFractionDigits: 3 })
        : '-';
      onStatus?.(`Arista seleccionada · ${label} mm`);
      renderFrame();
      return;
    }
    setSelectedSolidEdge(null);
    const sketchHit = sketchFaceHitAtPointer();
    if (sketchHit?.object?.userData?.type === 'webcad-simple-face') {
      rememberPushStartPointer(sketchHit.object, event);
      setSelectedFace(sketchHit.object);
      return;
    }
    const tangentFace = tangentFaceAtPointer();
    if (tangentFace) {
      const selectionMesh = createSolidFaceSelectionMesh(tangentFace);
      if (selectionMesh) {
        rememberPushStartPointer(selectionMesh, event);
        scene.add(selectionMesh);
        setSelectedFace(selectionMesh);
        return;
      }
    }
    if (pickSolidFace(event, solidHit)) return;
    setSelectedFace(null);
    onStatus?.('');
  }

  function pickSolid(event) {
    if (pushCommand.isActive() || deleteSolidMode) return;
    setPointerFromEvent(event);
    const id = solidHitAtPointer()?.object?.userData?.documentSolidId ?? null;
    if (!id) return;
    event.preventDefault();
    setSelectedFace(null);
    setSelectedDocumentSolid(id);
    onStatus?.('Solido 3D seleccionado');
    renderFrame();
  }

  function documentEntitiesForViewer() {
    return typeof doc?.topLevelEntities === 'function' ? doc.topLevelEntities() : [];
  }

  function deleteDocumentSolids(ids) {
    if (pushCommand.isActive()) return false;
    const existingIds = [...new Set(ids)].filter((id) =>
      doc?.model3d?.solids?.some((record) => record?.id === id));
    if (!existingIds.length) {
      onStatus?.('Seleccione solidos 3D para borrar');
      return false;
    }
    deleteSolidMode = false;
    setSelectedFace(null);
    const [firstId, ...remainingIds] = existingIds;
    doc.remove3dSolid?.(firstId);
    remainingIds.forEach((id) => doc.remove3dSolid?.(id, { recordHistory: false }));
    setEntities(documentEntitiesForViewer(), { preserveView: true });
    onStatus?.(`${existingIds.length} solido${existingIds.length === 1 ? '' : 's'} 3D eliminado${existingIds.length === 1 ? '' : 's'}`);
    return true;
  }

  function deleteSelectedSolid() {
    return deleteDocumentSolids([...selectedDocumentSolidIds]);
  }

  function startDeleteSolid() {
    deleteSolidMode = true;
    clearSelectedFaceVisual();
    selectedFace = null;
    const count = selectedDocumentSolidIds.size;
    onStatus?.(count
      ? `Borrar ${count} solido${count === 1 ? '' : 's'} · seleccione mas o confirme con Enter, Espacio o clic derecho`
      : 'Borrar: seleccione solidos y confirme con Enter, Espacio o clic derecho');
    return true;
  }

  function confirmDeleteSolidSelection() {
    if (!deleteSolidMode) return false;
    return deleteSelectedSolid();
  }

  function cancelDeleteSolid() {
    if (!deleteSolidMode) return false;
    deleteSolidMode = false;
    setSelectedDocumentSolids();
    onStatus?.('');
    return true;
  }

  function confirmDeleteSolidFromContextMenu(event) {
    if (!deleteSolidMode) return;
    event.preventDefault();
    confirmDeleteSolidSelection();
  }

  function onKeyDown(event) {
    if (event.key.toLowerCase() === 'k') {
      event.preventDefault();
      toggleHiddenEdges();
      return;
    }
    if (event.key === 'Escape') {
      if (cancelDeleteSolid()) return;
      if (selectedSolidEdge) {
        setSelectedSolidEdge(null);
        onStatus?.('');
        renderFrame();
        return;
      }
      if (selectedFace) {
        setSelectedFace(null);
        onStatus?.('');
      }
    }
  }

  function setHiddenEdges(visible) {
    hiddenEdgesVisible = visible === true;
    pushCommand.setHiddenEdges(hiddenEdgesVisible);
    onStatus?.(hiddenEdgesVisible ? 'Aristas ocultas visibles' : 'Aristas ocultas ocultas');
  }

  function toggleHiddenEdges() {
    setHiddenEdges(!hiddenEdgesVisible);
    return hiddenEdgesVisible;
  }

  function applyPushedSourceVisibility() {
    drawingLines?.traverse?.((object) => {
      const entity = object.userData?.entity;
      if (!entity) return;
      const entityKey = pushSourceKeyFromEntity(entity) || object.userData?.entityKey;
      object.visible = !(
        pushedSourceEntities.has(entity) ||
        pushedSourceKeys.has(entityKey)
      );
    });
    renderFrame();
  }

  function replaceGuides(center, size) {
    if (ground) {
      scene.remove(ground);
      disposeThreeObject(ground);
    }
    if (grid) {
      scene.remove(grid);
      disposeThreeObject(grid);
    }
    if (axes) {
      scene.remove(axes);
      disposeThreeObject(axes);
    }
    const localCenter = pointFromSketchPlane(center, principalSketchPlane(currentSketchPlane));
    ground = createSketchGround(center, size);
    grid = createSketchGrid(
      new THREE.Vector3(localCenter.x, localCenter.y, localCenter.z),
      size,
      { includeGround: false, visible: currentGridVisible },
    );
    applySketchPlaneTransform(grid);
    axes = createSketchAxes(size);
    axes.visible = currentAxesVisible;
    scene.add(ground, grid, axes);
    updateWideLineResolution(ground, currentWidth, currentHeight);
    updateWideLineResolution(grid, currentWidth, currentHeight);
    updateWideLineResolution(axes, currentWidth, currentHeight);
  }

  function updateDocumentBounds() {
    documentBounds.makeEmpty();
    const drawingBounds = drawingLines?.userData?.bounds;
    if (drawingBounds && !drawingBounds.isEmpty()) documentBounds.union(drawingBounds);
    documentSolidRecords().forEach((record) => {
      (record.solid.vertices ?? []).forEach((vertex) => documentBounds.expandByPoint(new THREE.Vector3(
        Number(vertex?.x) || 0,
        Number(vertex?.y) || 0,
        Number(vertex?.z) || 0,
      )));
    });
    if (documentBounds.isEmpty()) {
      documentBounds.set(
        new THREE.Vector3(-10, -10, -0.5),
        new THREE.Vector3(10, 10, 0.5),
      );
    }
    return documentBounds;
  }

  function updateCameraClipPlanes() {
    const { near, far } = cameraClipRangeForBounds(documentBounds, camera.position);
    if (Math.abs(camera.near - near) <= near * 1e-6 &&
        Math.abs(camera.far - far) <= far * 1e-6) return;
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
  }

  function fitCameraToDrawing() {
    const bounds = updateDocumentBounds();
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bounds.getCenter(center);
    bounds.getSize(size);
    const extent = Math.max(size.x, size.y, size.z, 1);
    const distance = extent * 1.9;
    const cameraDirection = principalPlaneDefinition(currentSketchPlane).cameraDirection;
    camera.position.set(
      center.x + cameraDirection.x * distance,
      center.y + cameraDirection.y * distance,
      center.z + cameraDirection.z * distance,
    );
    camera.lookAt(center);
    camera.updateMatrixWorld();
    controls.target.copy(center);
    controls.update();
    updateCameraClipPlanes();
    replaceGuides(center, extent);
  }

  function getViewState() {
    return {
      position: camera.position.toArray(),
      target: controls.target.toArray(),
      up: camera.up.toArray(),
      near: camera.near,
      far: camera.far,
      zoom: camera.zoom,
    };
  }

  function setViewState(state) {
    if (!Array.isArray(state?.position) || state.position.length < 3 ||
        !Array.isArray(state?.target) || state.target.length < 3) return false;
    camera.position.fromArray(state.position);
    controls.target.fromArray(state.target);
    if (Array.isArray(state.up) && state.up.length >= 3) camera.up.fromArray(state.up);
    if (Number.isFinite(Number(state.near))) camera.near = Math.max(0.0001, Number(state.near));
    if (Number.isFinite(Number(state.far))) camera.far = Math.max(camera.near + 1, Number(state.far));
    if (Number.isFinite(Number(state.zoom))) camera.zoom = Math.max(0.0001, Number(state.zoom));
    camera.lookAt(controls.target);
    camera.updateMatrixWorld();
    controls.update();
    updateCameraClipPlanes();
    renderFrame();
    return true;
  }

  function sketchRecordsForViewer(nextEntities) {
    const records = Array.isArray(doc?.model3d?.sketches)
      ? doc.model3d.sketches.filter((record) => record?.visible !== false)
      : [];
    if (records.length) return records;
    return [{
      id: null,
      name: 'Dibujo 2D pendiente',
      plane: principalSketchPlane(currentSketchPlane),
      entities: nextEntities,
      visible: true,
    }];
  }

  function setEntities(nextEntities, { preserveView = false } = {}) {
    if (drawingLines) {
      scene.remove(drawingLines);
      disposeThreeObject(drawingLines);
    }
    if (faceGroup) {
      scene.remove(faceGroup);
      disposeThreeObject(faceGroup);
    }
    setSelectedFace(null);
    setSelectedDocumentSolid(null);
    setSolidSnapMarker(null);
    deleteSolidMode = false;
    pushedSourceEntities.clear();
    pushedSourceKeys.clear();
    const sketchRecords = sketchRecordsForViewer(nextEntities);
    faceGroup = new THREE.Group();
    faceGroup.name = 'webcad-3d-simple-faces';
    pushCommand.clearSolids();
    const documentSolidsBySourceKey = new Map();
    documentSolidRecords().forEach((record) => {
      pushCommand.addDocumentSolid?.(record);
      const sourceKey = sourceKeyFromDocumentSolid(record);
      if (sourceKey && !record?.operation?.sketchId) {
        documentSolidsBySourceKey.set(sourceKey, record);
        pushedSourceKeys.add(sourceKey);
      }
    });
    drawingLines = new THREE.Group();
    drawingLines.name = 'webcad-3d-sketches';
    drawingLines.userData.bounds = new THREE.Box3().makeEmpty();
    drawingLines.userData.entityCount = 0;
    drawingLines.userData.segmentCount = 0;
    const solidGroupForDocumentId = (id) => (pushCommand.getSolidObjects?.() ?? [])
      .find((group) => group.userData?.documentSolidId === id) ?? null;
    sketchRecords.forEach((sketch) => {
      const plane = normalizeSketchPlane(sketch.plane ?? currentSketchPlane);
      const visibleEntities = visibleEntitiesForThreeView(sketch.entities || []);
      const faceDetectionEntities = [
        ...visibleEntities,
        ...(visibleEntities.length ? sketchSupportBoundaryEntities(sketch, doc?.model3d) : []),
      ];
      const sketchFaceGroup = new THREE.Group();
      sketchFaceGroup.userData.sketchId = sketch.id ?? null;
      detectSimpleClosedFaces(faceDetectionEntities).forEach((face) => {
        const worldFace = faceOnSketchPlane(face, plane, sketch.id ?? null);
        const support = sketch.metadata?.supportFace;
        const supportRecord = support?.sourceSolidId
          ? doc?.model3d?.solids?.find((record) => record.id === support.sourceSolidId)
          : null;
        const overlapsSupportMaterial = Boolean(
          supportRecord?.solid && faceOverlapsSketchSupport(face, support),
        );
        const touchesSupportMaterial = Boolean(
          supportRecord?.solid && !overlapsSupportMaterial &&
          faceTouchesSketchSupport(face, support),
        );
        const usesSupportMaterial = overlapsSupportMaterial || touchesSupportMaterial;
        if (usesSupportMaterial) {
          worldFace.supportSolid = supportRecord.solid;
          worldFace.supportContactOnly = touchesSupportMaterial;
          worldFace.supportSolidGroup = solidGroupForDocumentId(supportRecord.id);
          worldFace.sourceSolidDocumentId = supportRecord.id;
          worldFace.sourceSolidFaceIndices = support.sourceFaceIndices ?? null;
          worldFace.sourceSolidFaceIndex = support.sourceFaceIndices?.[0] ?? null;
          const supportPointToWorld = (point) => pointOnSketchPlane({
            x: Number(point?.x) || 0,
            y: -(Number(point?.y) || 0),
            z: 0,
          }, plane);
          worldFace.supportLoops = {
            outer: (support.outerLoop ?? []).map(supportPointToWorld),
            holes: (support.innerLoops ?? []).map((loop) => loop.map(supportPointToWorld)),
          };
        }
        const faceMesh = createFaceMesh(face);
        faceMesh.userData.face = worldFace;
        if (usesSupportMaterial) {
          faceMesh.renderOrder = SOLID_FACE_SUPPORT_RENDER_ORDER;
          faceMesh.material.opacity = 0.14;
          faceMesh.material.transparent = true;
          faceMesh.userData.defaultOpacity = 0.14;
          faceMesh.userData.defaultTransparent = true;
          faceMesh.userData.supportSolidDocumentId = supportRecord.id;
        }
        const sourceKey = pushSourceKeyFromFace(worldFace);
        const documentSolid = documentSolidsBySourceKey.get(sourceKey);
        const session = !doc && !documentSolid
          ? pushEntitySessions.get(face.sourceEntity) || pushSessions.get(sourceKey)
          : null;
        if (documentSolid && !sketch.id) {
          faceMesh.visible = false;
          if (face.sourceEntity) pushedSourceEntities.add(face.sourceEntity);
          if (sourceKey) pushedSourceKeys.add(sourceKey);
        }
        if (session) {
          faceMesh.visible = false;
          if (face.sourceEntity) pushedSourceEntities.add(face.sourceEntity);
          if (sourceKey) pushedSourceKeys.add(sourceKey);
          if (session.sourceKey) pushedSourceKeys.add(session.sourceKey);
          pushCommand.addSessionSolid(worldFace, session.height);
        }
        sketchFaceGroup.add(faceMesh);
      });
      applySketchPlaneTransform(sketchFaceGroup, plane);
      faceGroup.add(sketchFaceGroup);

      const sketchLines = entitiesToThreeEntityGroup(visibleEntities, {
        onWarning: (message) => console.warn(message),
      });
      sketchLines.userData.sketchId = sketch.id ?? null;
      const localBounds = sketchLines.userData.bounds;
      applySketchPlaneTransform(sketchLines, plane);
      if (localBounds && !localBounds.isEmpty()) {
        drawingLines.userData.bounds.union(localBounds.clone().applyMatrix4(sketchPlaneMatrix(plane)));
      }
      drawingLines.userData.entityCount += sketchLines.userData.entityCount || 0;
      drawingLines.userData.segmentCount += sketchLines.userData.segmentCount || 0;
      drawingLines.add(sketchLines);
    });
    pushCommand.setHiddenEdges(hiddenEdgesVisible);
    scene.add(faceGroup);
    scene.add(drawingLines);
    applyPushedSourceVisibility();
    updateWideLineResolution(drawingLines, currentWidth, currentHeight);
    if (!preserveView) fitCameraToDrawing();
    else {
      updateDocumentBounds();
      updateCameraClipPlanes();
    }
    renderFrame();
    return drawingLines.userData.segmentCount || 0;
  }

  function setGridVisible(visible) {
    currentGridVisible = visible !== false;
    setSketchGridVisible(grid, currentGridVisible);
    renderFrame();
  }

  function setAxesVisible(visible) {
    currentAxesVisible = visible !== false;
    if (axes) axes.visible = currentAxesVisible;
    renderFrame();
    return currentAxesVisible;
  }

  function setSketchPlane(plane) {
    const nextPlane = normalizePrincipalPlane(plane);
    if (nextPlane === currentSketchPlane) return false;
    currentSketchPlane = nextPlane;
    setEntities(documentEntitiesForViewer(), { preserveView: false });
    return true;
  }

  function refreshDocument() {
    const documentPlane = normalizePrincipalPlane(doc?.model3d?.sketchPlane);
    if (documentPlane !== currentSketchPlane) {
      currentSketchPlane = documentPlane;
      setEntities(documentEntitiesForViewer(), { preserveView: false });
      return;
    }
    setEntities(documentEntitiesForViewer(), { preserveView: true });
  }

  function selectedPlanarFace() {
    const face = selectedFace?.userData?.face;
    return face?.sourceSolid ? face : null;
  }

  function renderFrame(frameTime) {
    if (disposed) return;
    controls.update();
    camera.updateMatrixWorld();
    updateCameraClipPlanes();
    const now = Number.isFinite(frameTime) ? frameTime : viewerClock();
    const forceCameraRefresh = forceSilhouetteRefresh;
    forceSilhouetteRefresh = false;
    const cameraIsMoving = now - lastCameraMotionAt < SILHOUETTE_CAMERA_SETTLE_MS;
    const refreshCameraEdges = forceCameraRefresh || !cameraIsMoving;
    if (!cameraEdgesSuppressed) {
      updatePushSilhouettes(scene, camera, {
        deferCameraRefresh: !refreshCameraEdges,
      });
    }
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
    clearHoveredFaceVisual();
    hoveredSolidEdge = null;
    selectedSolidEdge = null;
    clearSolidEdgeHighlight();
    onEdgeInfo?.(null);
    clearSelectedFaceVisual();
    selectedFace = null;
    setSelectedDocumentSolids();
    deleteSolidMode = false;
    disposed = true;
    renderer.domElement.removeEventListener('click', pickFace);
    renderer.domElement.removeEventListener('dblclick', pickSolid);
    renderer.domElement.removeEventListener('pointermove', hoverFace);
    renderer.domElement.removeEventListener('pointerleave', leaveFaceHover);
    renderer.domElement.removeEventListener('pointerdown', startPointerCameraMotion);
    renderer.domElement.removeEventListener('pointerup', finishPointerCameraMotion);
    renderer.domElement.removeEventListener('pointercancel', finishPointerCameraMotion);
    renderer.domElement.removeEventListener('contextmenu', confirmDeleteSolidFromContextMenu);
    renderer.domElement.removeEventListener('keydown', onKeyDown);
    if (silhouetteSettleTimer !== null) {
      globalThis.clearTimeout(silhouetteSettleTimer);
      silhouetteSettleTimer = null;
    }
    cameraEdgeVisibility.clear();
    activeCameraPointers.clear();
    controls.removeEventListener('change', rememberCameraMotion);
    controls.dispose();
    navigation.dispose();
    disposeThreeObject(drawingLines);
    disposeThreeObject(faceGroup);
    scene.remove(solidSnapMarker);
    disposeThreeObject(solidSnapMarker);
    disposeThreeObject(ground);
    disposeThreeObject(grid);
    disposeThreeObject(axes);
    disposeThreeObject(lights);
    pushCommand.dispose();
    renderer.dispose();
  }

  renderer.domElement.addEventListener('click', pickFace);
  renderer.domElement.addEventListener('dblclick', pickSolid);
  renderer.domElement.addEventListener('pointermove', hoverFace);
  renderer.domElement.addEventListener('pointerleave', leaveFaceHover);
  renderer.domElement.addEventListener('pointerdown', startPointerCameraMotion);
  renderer.domElement.addEventListener('pointerup', finishPointerCameraMotion);
  renderer.domElement.addEventListener('pointercancel', finishPointerCameraMotion);
  renderer.domElement.addEventListener('contextmenu', confirmDeleteSolidFromContextMenu);
  renderer.domElement.addEventListener('keydown', onKeyDown);
  resize();
  setEntities(entities);
  start();

  return {
    camera,
    controls,
    dispose,
    getSegmentCount: () => drawingLines?.userData.segmentCount || 0,
    getFaceCount: () => {
      let count = 0;
      faceGroup?.traverse?.((object) => {
        if (object.userData?.type === 'webcad-simple-face') count += 1;
      });
      return count;
    },
    getEntityCount: () => drawingLines?.userData.entityCount || 0,
    getViewState,
    getSelectedSolidId: () => [...selectedDocumentSolidIds][0] ?? null,
    getSelectedSolidIds: () => [...selectedDocumentSolidIds],
    getSelectedSolidEdge: () => selectedSolidEdge,
    getSelectedPlanarFace: selectedPlanarFace,
    getSketchPlane: () => currentSketchPlane,
    isDeleteSolidActive: () => deleteSolidMode,
    startDeleteSolid,
    confirmDeleteSolidSelection,
    cancelDeleteSolid,
    deleteSelectedSolid,
    isPushActive: () => pushCommand.isActive(),
    render: renderFrame,
    refreshDocument,
    renderer,
    resize,
    scene,
    setEntities,
    setViewState,
    setGridVisible,
    setAxesVisible,
    setSketchPlane,
    setHiddenEdges,
    toggleHiddenEdges,
    setNavigationDevice: navigation.setNavigationDevice,
    startPush: pushCommand.start,
    start,
    stop,
  };
}

/* webCAD - Comando Push 3D experimental aislado | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  hideCursorInput,
  updateCursorInput,
} from '../../input/cursor-input.js';
import { formatNumber, parseScalarExpression } from '../../input/entry.js';
import {
  MINIMUM_3D_THICKNESS,
} from '../tolerances.js';
import { normalizeSolidPlacement } from '../solid-placement.js';
import { disposeThreeObject } from './three-scene-style.js';
import {
  createPushSolidGroupFromSolid,
  createPushSolidGroup,
  movedSolidFacePush,
  PUSH_SOLID_STYLE,
  pushHeightValue,
  pushSourceKeyFromFace,
  setPushSolidGroupHiddenEdges,
  solidFromFacePush,
} from './push-geometry.js';
import { profileFeaturePushSolid } from './profile-feature.js';
import {
  createPushDragPreview,
  createPushPointerProjector,
} from './push-preview.js';

const ALLOWED_INPUT = /^[0-9eE+\-*/().,\s]$/;

export function pushStrategyForFace(face) {
  if (face?.localFace) return pushStrategyForFace(face.localFace);
  if (face?.supportSolid) return 'profileFeature';
  if (face?.sourceSolid) return 'moveFace';
  return 'profile';
}

export function pushOperationForFace(face, distance) {
  const value = Number(distance);
  if (!Number.isFinite(value)) return null;
  const strategy = pushStrategyForFace(face);
  if (strategy === 'profile' || face?.supportContactOnly === true) return 'add';
  return value < 0 ? 'subtract' : 'add';
}

export function pushSolidForFace(face, distance, options = {}) {
  const geometryFace = face?.localFace ?? face;
  const strategy = pushStrategyForFace(geometryFace);
  if (strategy === 'profileFeature') {
    return profileFeaturePushSolid(geometryFace, distance, options);
  }
  if (strategy === 'moveFace') {
    return movedSolidFacePush(geometryFace, distance, options);
  }
  const solid = solidFromFacePush(geometryFace, distance);
  if (!solid && Number(distance) < 0) {
    options.onDiagnostic?.({
      operation: { type: 'subtract', distance },
      target: null,
      cutter: {
        outerPointCount: geometryFace?.points?.length ?? 0,
        holeCount: geometryFace?.holes?.length ?? 0,
      },
      coordinateSystem: geometryFace?.workplane ?? geometryFace?.sketchPlane ?? 'face-local',
      phase: 'profile-extrusion',
      reason: Math.abs(Number(distance)) < MINIMUM_3D_THICKNESS
        ? 'minimum-thickness'
        : 'invalid-cutter-profile',
      effectiveTolerance: MINIMUM_3D_THICKNESS,
    });
  }
  return solid;
}

export function pushFailureMessage(diagnostic) {
  return {
    'no-intersection': 'Push no válido · el perfil cortador no intersecta el sólido',
    'tangent-contact': 'Push no válido · el cortador solo tiene contacto tangente',
    'below-useful-tolerance': 'Push no válido · la intersección queda por debajo de la tolerancia útil',
    'invalid-target-solid': 'Push no válido · el sólido objetivo tiene geometría inválida',
    'invalid-cutter-profile': 'Push no válido · el perfil cortador no es cerrado o válido',
    'minimum-thickness': `Push no válido · el resultado incumple el espesor mínimo ${MINIMUM_3D_THICKNESS}`,
    'invalid-result-topology': 'Push no válido · la booleana produjo una topología no utilizable',
    'result-empty': 'Push no válido · la sustracción eliminaría completamente el sólido',
    'kernel-error': 'Push no válido · el núcleo booleano no pudo resolver la operación',
    'kernel-unavailable': 'Push no válido · el núcleo booleano 3D no está disponible',
    'invalid-overlap-test': 'Push no válido · no se pudo verificar el solape del cortador',
  }[diagnostic?.reason] ?? 'Push no válido · no se pudo completar la operación';
}

function faceCenter(face) {
  const points = Array.isArray(face?.points) ? face.points : [];
  if (!points.length) return null;
  return points.reduce((center, point) => center.add(new THREE.Vector3(
    Number(point.x),
    Number(point.y),
    Number(point.z) || 0,
  )), new THREE.Vector3()).multiplyScalar(1 / points.length);
}

export function pushDistanceToPoint(face, point) {
  const center = faceCenter(face);
  const faceNormal = face?.normal ?? { x: 0, y: 0, z: 1 };
  const normal = new THREE.Vector3(
    Number(faceNormal.x),
    Number(faceNormal.y),
    Number(faceNormal.z),
  );
  if (!center || normal.lengthSq() <= 1e-12 || !Number.isFinite(Number(point?.x)) ||
      !Number.isFinite(Number(point?.y)) || !Number.isFinite(Number(point?.z))) {
    return null;
  }
  normal.normalize();
  const distance = new THREE.Vector3(Number(point.x), Number(point.y), Number(point.z))
    .sub(center)
    .dot(normal);
  return Math.abs(distance) > 1e-9 ? distance : null;
}

function parsePushInput(input) {
  return pushHeightValue(parseScalarExpression(String(input).replace(',', '.')));
}

export function pushInputHeightForDirection(input, directionHeight) {
  const source = String(input ?? '').trim();
  const parsed = parsePushInput(source);
  if (parsed === null) return null;
  if (/^[+-]/.test(source)) return parsed;
  return Math.abs(parsed) * (Number(directionHeight) < 0 ? -1 : 1);
}

function pushStartPointerFromSelection(selection) {
  const pointer = selection?.userData?.pushStartPointer;
  const x = Number(pointer?.x);
  const y = Number(pointer?.y);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

export function createPushCommand({
  camera,
  canvas,
  controls,
  cursorInput = null,
  getUnitsLabel = () => 'mm',
  getSelectedFace,
  prepareObjectSnaps = null,
  onObjectSnap = null,
  onStatus = null,
  onConsumeFace = null,
  render = null,
  scene,
  viewport,
}) {
  const solidGroup = new THREE.Group();
  solidGroup.name = 'webcad-3d-push-solids';
  scene.add(solidGroup);

  let active = false;
  let commandFace = null;
  let input = '';
  let preview = null;
  let pointerProjector = null;
  let snapQuery = null;
  let startPointer = null;
  let lastPointer = null;
  let currentHeight = 1;
  let pointerDown = null;
  let pointerDragged = false;
  let activeSnap = null;
  let controlsWereEnabled = true;

  function status(message) {
    onStatus?.(message);
  }

  function setActiveSnap(snap) {
    activeSnap = snap || null;
    onObjectSnap?.(activeSnap);
  }

  function snapLabel(snap) {
    if (!snap) return '';
    const labels = {
      origin: 'Origen',
      endpoint: 'Punto',
      midpoint: 'Punto medio',
      center: 'Centro',
      faceCenter: 'Centro de cara',
      surface: 'Cara',
    };
    return labels[snap.type] ?? 'Punto';
  }

  function heightFromSnap(face, snap) {
    return pushDistanceToPoint(face, snap?.point);
  }

  function snapHeightFromEvent(event) {
    const snap = snapQuery?.nearest?.(event) ?? null;
    const snappedHeight = heightFromSnap(commandFace?.userData?.face, snap);
    setActiveSnap(snappedHeight === null ? null : snap);
    return snappedHeight;
  }

  function updateDynamicInput() {
    updateCursorInput(cursorInput, {
      clientPoint: lastPointer,
      text: `${input || formatNumber(currentHeight)} ${getUnitsLabel()}`,
      visible: active,
    });
  }

  function restoreControls() {
    if (controls) controls.enabled = controlsWereEnabled;
  }

  function setHiddenEdges(visible) {
    solidGroup.children.forEach((group) => setPushSolidGroupHiddenEdges(group, visible));
    render?.();
  }

  function removePreview() {
    if (!preview) return;
    scene.remove(preview.group);
    preview.dispose();
    preview = null;
    pointerProjector = null;
  }

  function applyFacePlacement(object, face) {
    if (!object || !face?.placement) return object;
    const placement = normalizeSolidPlacement(face.placement);
    object.position.set(
      placement.position.x,
      placement.position.y,
      placement.position.z,
    );
    object.quaternion.set(
      placement.quaternion.x,
      placement.quaternion.y,
      placement.quaternion.z,
      placement.quaternion.w,
    );
    object.userData.placement = placement;
    return object;
  }

  function setCommandFaceVisible(visible) {
    if (commandFace) {
      commandFace.visible = visible;
    }
  }

  function commandSolidSourceGroup() {
    const face = commandFace?.userData?.face;
    return face?.sourceSolidGroup ?? face?.supportSolidGroup ?? null;
  }

  function setCommandSolidSourceVisible(visible) {
    const sourceGroup = commandSolidSourceGroup();
    if (sourceGroup) sourceGroup.visible = visible;
  }

  function updatePreview(height) {
    const cleanHeight = pushHeightValue(height);
    if (!active || !commandFace?.userData?.face || cleanHeight === null) return;
    currentHeight = cleanHeight;
    preview?.update(currentHeight);
    status(input
      ? `Push: ${input} (${formatNumber(currentHeight)})${activeSnap ? ` · OSNAP ${snapLabel(activeSnap)}` : ''}`
      : `Push: ${formatNumber(currentHeight)} ${getUnitsLabel()}${activeSnap ? ` · OSNAP ${snapLabel(activeSnap)}` : ''} · escriba distancia o clic para confirmar`);
    updateDynamicInput();
    render?.();
  }

  function addSolidFromFace(face, height, options = {}) {
    const finalSolid = createPushSolidGroup(face, height, {
      edgeColor: PUSH_SOLID_STYLE.edgeColor,
      edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
      faceColor: options.faceColor ?? PUSH_SOLID_STYLE.faceColor,
      name: options.name ?? `webcad-push-solid-${face?.id ?? 'face'}`,
      renderOrder: 20,
    });
    if (!finalSolid) return null;
    solidGroup.add(finalSolid);
    render?.();
    return finalSolid;
  }

  function tagDocumentSolidGroup(group, record) {
    const documentSolidId = typeof record === 'string' ? record : record?.id;
    if (!group || !documentSolidId) return group;
    group.userData = {
      ...(group.userData ?? {}),
      documentSolidId,
    };
    group.traverse?.((object) => {
      object.userData = {
        ...(object.userData ?? {}),
        documentSolidId,
      };
    });
    return group;
  }

  function cancel() {
    if (!active) return false;
    active = false;
    input = '';
    setCommandSolidSourceVisible(true);
    setCommandFaceVisible(true);
    commandFace = null;
    startPointer = null;
    lastPointer = null;
    pointerDown = null;
    pointerDragged = false;
    snapQuery = null;
    setActiveSnap(null);
    removePreview();
    hideCursorInput(cursorInput);
    restoreControls();
    status('Push cancelado');
    render?.();
    return true;
  }

  function confirm() {
    if (!active || !commandFace?.userData?.face || pushHeightValue(currentHeight) === null) return false;
    if (input && pushInputHeightForDirection(input, currentHeight) === null) {
      status(`Push: distancia no valida (${input})`);
      return false;
    }
    const face = commandFace.userData.face;
    let finalSolid = null;
    let failureDiagnostic = null;
    const diagnosticOptions = {
      onDiagnostic: (diagnostic) => { failureDiagnostic = diagnostic; },
    };
    let through = false;
    const strategy = pushStrategyForFace(face);
    if (strategy === 'profileFeature') {
      const featureSolid = pushSolidForFace(face, currentHeight, diagnosticOptions);
      if (!featureSolid) {
        setCommandSolidSourceVisible(true);
        status(pushFailureMessage(failureDiagnostic));
        render?.();
        return false;
      }
      through = featureSolid.metadata?.profileFeatures?.at?.(-1)?.through === true;
      finalSolid = createPushSolidGroupFromSolid(featureSolid, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
        renderOrder: 20,
      });
      applyFacePlacement(finalSolid, face);
    }
    else if (strategy === 'moveFace') {
      const movedSolid = pushSolidForFace(face, currentHeight, diagnosticOptions);
      if (!movedSolid) {
        setCommandSolidSourceVisible(true);
        status(pushFailureMessage(failureDiagnostic));
        render?.();
        return false;
      }
      currentHeight = Number(movedSolid.metadata?.lastPushDistance) || currentHeight;
      finalSolid = createPushSolidGroupFromSolid(movedSolid, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
        renderOrder: 20,
      });
      applyFacePlacement(finalSolid, face);
    }
    else {
      finalSolid = createPushSolidGroup(face, currentHeight, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
        renderOrder: 20,
      });
      if (!finalSolid) {
        setCommandSolidSourceVisible(true);
        status(`Push no valido · espesor minimo 3D: ${MINIMUM_3D_THICKNESS}`);
        render?.();
        return false;
      }
    }
    removePreview();
    if (strategy === 'profileFeature' || strategy === 'moveFace') {
      const sourceGroup = commandSolidSourceGroup();
      if (sourceGroup) {
        solidGroup.remove(sourceGroup);
        disposeThreeObject(sourceGroup);
      }
    }
    solidGroup.add(finalSolid);
    setCommandFaceVisible(false);
    onConsumeFace?.(commandFace, finalSolid, {
      height: currentHeight,
      sourceKey: pushSourceKeyFromFace(face),
    });
    active = false;
    input = '';
    commandFace = null;
    startPointer = null;
    lastPointer = null;
    pointerDown = null;
    pointerDragged = false;
    snapQuery = null;
    setActiveSnap(null);
    hideCursorInput(cursorInput);
    restoreControls();
    status(through
      ? `Push creado · hueco pasante (${formatNumber(currentHeight)})`
      : `Push creado · altura ${formatNumber(currentHeight)}`);
    render?.();
    return true;
  }

  function start() {
    const selectedFace = getSelectedFace?.();
    if (!selectedFace?.userData?.face) {
      status('Seleccione un recinto cerrado antes de usar Push');
      return false;
    }
    cancel();
    active = true;
    commandFace = selectedFace;
    setCommandFaceVisible(false);
    input = '';
    currentHeight = 1;
    startPointer = pushStartPointerFromSelection(commandFace);
    lastPointer = startPointer;
    canvas?.focus?.({ preventScroll: true });
    controlsWereEnabled = controls?.enabled !== false;
    if (controls) controls.enabled = false;
    setCommandSolidSourceVisible(true);
    preview = createPushDragPreview(commandFace, {
      camera,
      initialDistance: currentHeight,
      operationAtDistance: (distance) =>
        pushOperationForFace(commandFace.userData.face, distance),
      worldNormal: commandFace.userData.face.normal,
    });
    if (!preview) {
      active = false;
      setCommandFaceVisible(true);
      restoreControls();
      status('Push no disponible · no se pudo determinar la normal de la cara');
      return false;
    }
    scene.add(preview.group);
    pointerProjector = createPushPointerProjector({
      axis: preview.axis,
      camera,
      controls,
      startPointer,
      viewport,
    });
    snapQuery = prepareObjectSnaps?.(commandFace.userData.face) ?? null;
    updatePreview(currentHeight);
    status('Push activo · mueva el cursor, escriba altura y confirme con clic o Enter');
    return true;
  }

  function onPointerMove(event) {
    if (!active) return;
    if (!startPointer) startPointer = { x: event.clientX, y: event.clientY };
    lastPointer = { x: event.clientX, y: event.clientY };
    if (!pointerProjector) {
      pointerProjector = createPushPointerProjector({
        axis: preview?.axis,
        camera,
        controls,
        startPointer,
        viewport,
      });
    }
    if (pointerDown) {
      const dragDistance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
      if (dragDistance > 4) pointerDragged = true;
    }
    const snappedHeight = snapHeightFromEvent(event);
    const pointerHeight = snappedHeight ??
      pointerProjector?.distanceAt(event) ??
      currentHeight;
    if (input) {
      const typedHeight = pushInputHeightForDirection(input, pointerHeight);
      if (typedHeight !== null) updatePreview(typedHeight);
      else updateDynamicInput();
      return;
    }
    if (snappedHeight === null) setActiveSnap(null);
    if (Math.abs(pointerHeight) > 1e-9) updatePreview(pointerHeight);
  }

  function onPointerDown(event) {
    if (!active) return;
    if (!startPointer) startPointer = { x: event.clientX, y: event.clientY };
    lastPointer = { x: event.clientX, y: event.clientY };
    pointerDown = { x: event.clientX, y: event.clientY };
    pointerDragged = false;
  }

  function onClick(event) {
    if (!active) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (pointerDragged) {
      pointerDown = null;
      pointerDragged = false;
      return;
    }
    pointerDown = null;
    lastPointer = { x: event.clientX, y: event.clientY };
    if (!input) {
      const snappedHeight = snapHeightFromEvent(event);
      if (snappedHeight !== null) {
        updatePreview(snappedHeight);
      }
    }
    confirm();
  }

  function onKeyDown(event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      confirm();
      return;
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
      input = input.slice(0, -1);
      const parsed = input
        ? pushInputHeightForDirection(input, currentHeight)
        : null;
      if (parsed !== null) updatePreview(parsed);
      else {
        status(input ? `Push: ${input}` : 'Push: mueva el cursor o escriba altura');
        updateDynamicInput();
      }
      return;
    }
    if (event.key.length === 1 && ALLOWED_INPUT.test(event.key)) {
      event.preventDefault();
      input += event.key;
      const parsed = pushInputHeightForDirection(input, currentHeight);
      if (parsed !== null) updatePreview(parsed);
      else {
        status(`Push: ${input}`);
        updateDynamicInput();
      }
    }
  }

  canvas?.addEventListener?.('pointermove', onPointerMove);
  canvas?.addEventListener?.('pointerdown', onPointerDown, true);
  canvas?.addEventListener?.('click', onClick, true);
  canvas?.addEventListener?.('keydown', onKeyDown);

  return {
    cancel,
    addDocumentSolid(record) {
      if (!record?.solid || record.visible === false) return null;
      const group = createPushSolidGroupFromSolid(record.solid, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-document-${record.id}`,
        renderOrder: 20,
      });
      applyFacePlacement(group, { placement: record.placement });
      tagDocumentSolidGroup(group, record);
      solidGroup.add(group);
      render?.();
      return group;
    },
    addSessionSolid(face, height) {
      return addSolidFromFace(face, height, {
        name: `webcad-push-session-${face?.id ?? 'face'}`,
      });
    },
    clearSolids() {
      removePreview();
      solidGroup.children.slice().forEach((child) => {
        solidGroup.remove(child);
        disposeThreeObject(child);
      });
      render?.();
    },
    setHiddenEdges,
    confirm,
    dispose() {
      canvas?.removeEventListener?.('pointermove', onPointerMove);
      canvas?.removeEventListener?.('pointerdown', onPointerDown, true);
      canvas?.removeEventListener?.('click', onClick, true);
      canvas?.removeEventListener?.('keydown', onKeyDown);
      cancel();
      scene.remove(solidGroup);
      disposeThreeObject(solidGroup);
    },
    getHeight: () => currentHeight,
    getSolidObjects: () => solidGroup.children,
    isActive: () => active,
    start,
    tagDocumentSolidGroup,
  };
}

/* webCAD - Comando Push 3D experimental aislado | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { formatNumber, parseScalarExpression } from '../../input/entry.js';
import { disposeThreeObject } from './three-scene-style.js';
import {
  createPushSolidGroupFromSolid,
  createPushSolidGroup,
  movedSolidFacePush,
  PUSH_SOLID_STYLE,
  pushHeightValue,
  pushSourceKeyFromFace,
  setPushSolidGroupHiddenEdges,
} from './push-geometry.js';
import { profileFeaturePushSolid } from './profile-feature.js';

const ALLOWED_INPUT = /^[0-9eE+\-*/().,\s]$/;

function pointerHeight(event, camera, controls, viewport, startY) {
  const target = controls?.target || new THREE.Vector3();
  const distance = camera.position.distanceTo(target);
  const visibleWorld = 2 * Math.max(1, distance) * Math.tan(THREE.MathUtils.degToRad(camera.fov || 36) / 2);
  const pixels = Math.max(1, viewport().height || 1);
  const rawHeight = (startY - event.clientY) * (visibleWorld / pixels);
  if (Math.abs(rawHeight) > 1e-9) return rawHeight;
  return rawHeight < 0 ? -0.1 : 0.1;
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

function pointerDistanceAlongFaceNormal(event, camera, controls, viewport, face, startPointer) {
  if (!startPointer || !face?.normal) return null;
  const center = faceCenter(face);
  const normal = new THREE.Vector3(
    Number(face.normal.x),
    Number(face.normal.y),
    Number(face.normal.z),
  );
  if (!center || normal.lengthSq() <= 1e-12) return null;
  normal.normalize();
  const distance = camera.position.distanceTo(controls?.target || center);
  const normalEnd = center.clone().addScaledVector(normal, Math.max(distance * 0.12, 1));
  const startProjected = center.clone().project(camera);
  const endProjected = normalEnd.project(camera);
  const width = Math.max(1, viewport().width || 1);
  const height = Math.max(1, viewport().height || 1);
  const screenNormal = new THREE.Vector2(
    (endProjected.x - startProjected.x) * width * 0.5,
    -(endProjected.y - startProjected.y) * height * 0.5,
  );
  if (screenNormal.lengthSq() < 64) screenNormal.set(0, -1);
  else screenNormal.normalize();
  const pointerDelta = new THREE.Vector2(
    event.clientX - startPointer.x,
    event.clientY - startPointer.y,
  );
  const pixels = pointerDelta.dot(screenNormal);
  const visibleWorld = 2 * Math.max(1, distance) * Math.tan(THREE.MathUtils.degToRad(camera.fov || 36) / 2);
  const worldPerPixel = visibleWorld / height;
  const rawDistance = pixels * worldPerPixel;
  if (Math.abs(rawDistance) > 1e-9) return rawDistance;
  return rawDistance < 0 ? -0.1 : 0.1;
}

function parsePushInput(input) {
  return pushHeightValue(parseScalarExpression(String(input).replace(',', '.')));
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
  getSelectedFace,
  getObjectSnap = null,
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
  let startPointerY = 0;
  let startPointer = null;
  let currentHeight = 1;
  let pointerDown = null;
  let pointerDragged = false;
  let activeSnap = null;
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

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

  function inputHeight(parsed) {
    if (parsed === null) return null;
    if (parsed < 0) return parsed;
    return Math.abs(parsed) * (currentHeight < 0 ? -1 : 1);
  }

  function snapHeightFromEvent(event) {
    const snap = getObjectSnap?.(event, commandFace?.userData?.face) ?? null;
    const snappedHeight = heightFromSnap(commandFace?.userData?.face, snap);
    setActiveSnap(snappedHeight === null ? null : snap);
    return snappedHeight;
  }

  function setHiddenEdges(visible) {
    solidGroup.children.forEach((group) => setPushSolidGroupHiddenEdges(group, visible));
    render?.();
  }

  function removePreview() {
    if (!preview) return;
    scene.remove(preview);
    disposeThreeObject(preview);
    preview = null;
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

  function solidFacePreview(face, height, options) {
    const movedSolid = movedSolidFacePush(face, height);
    return movedSolid
      ? createPushSolidGroupFromSolid(movedSolid, options)
      : null;
  }

  function profileFeaturePreview(face, height, options) {
    const solid = profileFeaturePushSolid(face, height);
    return solid ? createPushSolidGroupFromSolid(solid, options) : null;
  }

  function updatePreview(height) {
    const cleanHeight = pushHeightValue(height);
    if (!active || !commandFace?.userData?.face || cleanHeight === null) return;
    currentHeight = cleanHeight;
    removePreview();
    const face = commandFace.userData.face;
    const previewOptions = {
      edgeColor: PUSH_SOLID_STYLE.edgeColor,
      edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
      faceColor: PUSH_SOLID_STYLE.previewFaceColor,
      name: 'webcad-push-preview',
      renderOrder: 24,
    };
    preview = face.sourceSolid
      ? solidFacePreview(face, currentHeight, previewOptions)
      : face.supportSolid
        ? profileFeaturePreview(face, currentHeight, previewOptions)
        : createPushSolidGroup(face, currentHeight, previewOptions);
    if (!preview) {
      setCommandSolidSourceVisible(true);
      status(`Push no valido · sin material suficiente (${formatNumber(currentHeight)})`);
      render?.();
      return;
    }
    const effectiveFaceDistance = Number(preview.userData?.solid?.metadata?.lastPushDistance);
    if (face.sourceSolid && Number.isFinite(effectiveFaceDistance)) {
      currentHeight = effectiveFaceDistance;
    }
    setCommandSolidSourceVisible(false);
    preview.userData.preview = true;
    const featureOperation = preview.userData?.solid?.metadata?.profileFeatures?.at?.(-1);
    preview.userData.pushThrough = featureOperation?.through === true;
    scene.add(preview);
    const throughLabel = preview.userData.pushThrough ? ' · Hueco pasante' : '';
    status(input
      ? `Push: ${input} (${formatNumber(currentHeight)})${activeSnap ? ` · OSNAP ${snapLabel(activeSnap)}` : ''}${throughLabel}`
      : `Push: ${formatNumber(currentHeight)}${activeSnap ? ` · OSNAP ${snapLabel(activeSnap)}` : ''}${throughLabel} · escriba distancia o clic para confirmar`);
    render?.();
  }

  function referenceFromExistingSolid(event, face) {
    if (!solidGroup.children.length) return null;
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(solidGroup.children, true)
      .filter((candidate) => candidate?.point &&
        candidate?.object?.userData?.type === 'webcad-push-solid');
    const reference = hits
      .map((hit) => ({ hit, height: pushDistanceToPoint(face, hit.point) }))
      .find((candidate) => candidate.height !== null);
    if (!reference) return null;
    const { hit, height } = reference;
    return {
      height,
      snap: {
        type: 'surface',
        point: { x: hit.point.x, y: hit.point.y, z: hit.point.z },
        documentSolidId: hit.object?.userData?.documentSolidId ??
          hit.object?.parent?.userData?.documentSolidId ?? null,
      },
    };
  }

  function addSolidFromFace(face, height, options = {}) {
    const finalSolid = createPushSolidGroup(face, height, {
      edgeColor: PUSH_SOLID_STYLE.edgeColor,
      edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
      faceColor: options.faceColor ?? PUSH_SOLID_STYLE.faceColor,
      name: options.name ?? `webcad-push-solid-${face?.id ?? 'face'}`,
      renderOrder: 20,
    });
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
    pointerDown = null;
    pointerDragged = false;
    setActiveSnap(null);
    removePreview();
    status('Push cancelado');
    render?.();
    return true;
  }

  function confirm() {
    if (!active || !commandFace?.userData?.face || pushHeightValue(currentHeight) === null) return false;
    removePreview();
    const face = commandFace.userData.face;
    let finalSolid = null;
    let through = false;
    if (face.supportSolid) {
      const featureSolid = profileFeaturePushSolid(face, currentHeight);
      if (!featureSolid) {
        setCommandSolidSourceVisible(true);
        status('Push no valido · no se pudo actualizar el solido soporte');
        render?.();
        return false;
      }
      through = featureSolid.metadata?.profileFeatures?.at?.(-1)?.through === true;
      const sourceGroup = commandSolidSourceGroup();
      if (sourceGroup) {
        solidGroup.remove(sourceGroup);
        disposeThreeObject(sourceGroup);
      }
      finalSolid = createPushSolidGroupFromSolid(featureSolid, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
        renderOrder: 20,
      });
      solidGroup.add(finalSolid);
    }
    else if (face.sourceSolid) {
      const movedSolid = movedSolidFacePush(face, currentHeight);
      if (!movedSolid) {
        setCommandSolidSourceVisible(true);
        status('Push no valido · sin material suficiente');
        render?.();
        return false;
      }
      currentHeight = Number(movedSolid.metadata?.lastPushDistance) || currentHeight;
      const sourceGroup = commandSolidSourceGroup();
      if (sourceGroup) {
        solidGroup.remove(sourceGroup);
        disposeThreeObject(sourceGroup);
      }
      finalSolid = createPushSolidGroupFromSolid(movedSolid, {
        edgeColor: PUSH_SOLID_STYLE.edgeColor,
        edgeLineWidth: PUSH_SOLID_STYLE.edgeLineWidth,
        faceColor: PUSH_SOLID_STYLE.faceColor,
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
        renderOrder: 20,
      });
      solidGroup.add(finalSolid);
    }
    else {
      finalSolid = addSolidFromFace(face, currentHeight, {
        name: `webcad-push-solid-${commandFace.userData.faceId}`,
      });
    }
    setCommandFaceVisible(false);
    onConsumeFace?.(commandFace, finalSolid, {
      height: currentHeight,
      sourceKey: pushSourceKeyFromFace(face),
    });
    active = false;
    input = '';
    commandFace = null;
    startPointer = null;
    pointerDown = null;
    pointerDragged = false;
    setActiveSnap(null);
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
    startPointerY = startPointer?.y ?? 0;
    canvas?.focus?.({ preventScroll: true });
    setCommandSolidSourceVisible(false);
    updatePreview(currentHeight);
    status('Push activo · mueva el cursor, escriba altura y confirme con clic o Enter');
    return true;
  }

  function onPointerMove(event) {
    if (!active) return;
    if (!startPointerY) startPointerY = event.clientY;
    if (!startPointer) startPointer = { x: event.clientX, y: event.clientY };
    if (pointerDown) {
      const dragDistance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
      if (dragDistance > 4) pointerDragged = true;
    }
    if (input) return;
    const snappedHeight = snapHeightFromEvent(event);
    if (snappedHeight !== null) {
      updatePreview(snappedHeight);
      return;
    }
    const surfaceReference = referenceFromExistingSolid(event, commandFace?.userData?.face);
    if (surfaceReference) {
      setActiveSnap(surfaceReference.snap);
      updatePreview(surfaceReference.height);
      return;
    }
    updatePreview(
      pointerDistanceAlongFaceNormal(
        event,
        camera,
        controls,
        viewport,
        commandFace?.userData?.face,
        startPointer,
      ) ?? pointerHeight(event, camera, controls, viewport, startPointerY),
    );
  }

  function onPointerDown(event) {
    if (!active) return;
    if (!startPointerY) startPointerY = event.clientY;
    if (!startPointer) startPointer = { x: event.clientX, y: event.clientY };
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
    if (!input) {
      const snappedHeight = snapHeightFromEvent(event);
      if (snappedHeight !== null) {
        updatePreview(snappedHeight);
      }
      else {
        const surfaceReference = referenceFromExistingSolid(event, commandFace?.userData?.face);
        if (surfaceReference) {
          setActiveSnap(surfaceReference.snap);
          updatePreview(surfaceReference.height);
        }
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
      const parsed = input ? inputHeight(parsePushInput(input)) : null;
      if (parsed !== null) updatePreview(parsed);
      else status(input ? `Push: ${input}` : 'Push: mueva el cursor o escriba altura');
      return;
    }
    if (event.key.length === 1 && ALLOWED_INPUT.test(event.key)) {
      event.preventDefault();
      input += event.key;
      const parsed = inputHeight(parsePushInput(input));
      if (parsed !== null) updatePreview(parsed);
      else status(`Push: ${input}`);
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

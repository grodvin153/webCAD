/* webCAD - Corte de sólidos 3D mediante un plano | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { solidWorldToLocal } from '../solid-placement.js';
import {
  planeFromThreePoints,
  splitSolidByPlane3d,
} from './manifold-boolean.js';
import { createPoint3dInput, isSolidTransformConfirmEvent } from './solid-transform-command.js';
import { disposeThreeObject } from './three-scene-style.js';

const PLANE_PREVIEW_COLOR = 0x55c8ff;

function vector3(point) {
  return new THREE.Vector3(
    Number(point?.x) || 0,
    Number(point?.y) || 0,
    Number(point?.z) || 0,
  );
}

function point3(point) {
  return {
    x: Number(point?.x) || 0,
    y: Number(point?.y) || 0,
    z: Number(point?.z) || 0,
  };
}

export function cutPlanePartName(sourceName, side, componentIndex = 0) {
  const base = String(sourceName || 'Sólido');
  const component = Number(componentIndex) > 0
    ? ` — Parte ${Number(componentIndex) + 1}`
    : '';
  return `${base} — Corte ${side}${component}`;
}

export function createCutPlanePreview(points, size) {
  const plane = planeFromThreePoints(points);
  const previewSize = Math.max(Number(size) || 0, 1);
  if (!plane) return null;
  const group = new THREE.Group();
  group.name = 'webcad-solid-plane-cut-preview';
  const fill = new THREE.Mesh(
    new THREE.PlaneGeometry(previewSize, previewSize),
    new THREE.MeshBasicMaterial({
      color: PLANE_PREVIEW_COLOR,
      depthTest: false,
      depthWrite: false,
      opacity: 0.2,
      side: THREE.DoubleSide,
      transparent: true,
    }),
  );
  fill.name = 'webcad-solid-plane-cut-preview-fill';
  fill.renderOrder = 84;
  const half = previewSize * 0.5;
  const outlinePoints = [
    new THREE.Vector3(-half, -half, 0),
    new THREE.Vector3(half, -half, 0),
    new THREE.Vector3(half, half, 0),
    new THREE.Vector3(-half, half, 0),
    new THREE.Vector3(-half, -half, 0),
  ];
  const outline = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(outlinePoints),
    new THREE.LineBasicMaterial({
      color: PLANE_PREVIEW_COLOR,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    }),
  );
  outline.name = 'webcad-solid-plane-cut-preview-outline';
  outline.renderOrder = 85;
  group.add(fill, outline);
  group.position.copy(vector3(plane.origin));
  group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    vector3(plane.normal).normalize(),
  );
  group.userData = { plane, previewSize };
  return group;
}

function invalidCutMessage(reason) {
  return {
    'collinear-points': 'Corte no realizado: los tres puntos del plano están alineados',
    'degenerate-result': 'Corte no realizado: el resultado contiene residuos o partes degeneradas',
    'invalid-result': 'Corte no realizado: el resultado no es un sólido cerrado y válido',
    'invalid-source-solid': 'Corte no realizado: el sólido seleccionado no es válido',
    'kernel-unavailable': 'Corte no realizado: el núcleo 3D no está disponible',
    'plane-does-not-cross-interior': 'Corte no realizado: el plano no atraviesa el interior del sólido',
  }[reason] ?? 'Corte no realizado: no se pudo resolver la operación';
}

export function createSolidPlaneCutCommand({
  camera,
  canvas,
  cursorInput = null,
  doc,
  getSelectedSolidIds = () => [],
  getSolidIdAtPointer = () => null,
  getSolidObjects = () => [],
  getSnap = () => null,
  getUnitsLabel = () => 'mm',
  getWorkplane,
  onChanged = () => {},
  onSelection = () => {},
  onSnap = () => {},
  onStatus = () => {},
  render = () => {},
  scene,
} = {}) {
  let active = false;
  let phase = null;
  let solidId = null;
  let points = [];
  let preview = null;
  let suppressClick = false;
  let suppressContextMenu = false;
  let initialSelection = [];
  const helper = new THREE.AxesHelper(18);
  helper.name = 'webcad-solid-plane-cut-axis-helper';
  helper.visible = false;
  scene.add(helper);

  function recordForId(id) {
    return doc?.model3d?.solids?.find((record) => record?.id === id) ?? null;
  }

  function selectedUnlockedId(ids) {
    const unique = [...new Set(ids)].filter((id) => {
      const record = recordForId(id);
      return record && record.visible !== false && record.locked !== true;
    });
    return unique.length === 1 ? unique[0] : null;
  }

  function selectedSolidObject() {
    return getSolidObjects().find((object) =>
      object?.userData?.documentSolidId === solidId) ?? null;
  }

  function previewSize(candidatePoints = points) {
    const object = selectedSolidObject();
    const bounds = object
      ? new THREE.Box3().setFromObject(object)
      : new THREE.Box3().makeEmpty();
    const solidDiagonal = bounds.isEmpty()
      ? 0
      : bounds.getSize(new THREE.Vector3()).length();
    const pointExtent = candidatePoints.length
      ? Math.max(...candidatePoints.map((point) =>
        vector3(point).distanceTo(vector3(candidatePoints[0]))))
      : 0;
    return Math.max(solidDiagonal * 1.6, pointExtent * 2.4, 10);
  }

  function setHelper(point) {
    helper.visible = Boolean(point);
    if (point) helper.position.copy(vector3(point));
    render();
  }

  function clearPreview() {
    if (!preview) return;
    scene.remove(preview);
    disposeThreeObject(preview);
    preview = null;
  }

  function showPreview(candidatePoints) {
    clearPreview();
    preview = createCutPlanePreview(candidatePoints, previewSize(candidatePoints));
    if (preview) scene.add(preview);
    render();
    return Boolean(preview);
  }

  function cleanup() {
    picker.cancel();
    clearPreview();
    helper.visible = false;
    onSnap(null);
    active = false;
    phase = null;
    solidId = null;
    points = [];
    suppressContextMenu = false;
    render();
  }

  function cancel() {
    if (!active) return false;
    const restoreSelection = [...initialSelection];
    cleanup();
    onSelection(restoreSelection);
    onStatus('Cortar sólido por plano cancelado');
    return true;
  }

  function fail(reason) {
    const selected = solidId ? [solidId] : [...initialSelection];
    const message = invalidCutMessage(reason);
    cleanup();
    onSelection(selected);
    onStatus(message);
    return false;
  }

  function requestPoint(index) {
    const prompts = [
      'Precise primer punto del plano o [Desde]',
      'Precise segundo punto del plano o [Desde]',
      'Precise tercer punto del plano o [Desde]',
    ];
    phase = `point${index + 1}`;
    picker.start({
      allowFrom: true,
      anchor: index ? points[index - 1] : null,
      prompt: prompts[index],
      onCancel: cancel,
      onPoint(point) {
        const nextPoints = [...points, point3(point)];
        if (index === 1 && vector3(nextPoints[0]).distanceTo(vector3(nextPoints[1])) <= 1e-9) {
          onStatus('Precise segundo punto del plano · debe ser distinto del primero');
          requestPoint(1);
          return;
        }
        if (index === 2 && !planeFromThreePoints(nextPoints)) {
          clearPreview();
          onStatus('Precise tercer punto del plano · los tres puntos no pueden estar alineados');
          requestPoint(2);
          return;
        }
        points = nextPoints;
        setHelper(point);
        if (index < 2) {
          requestPoint(index + 1);
          return;
        }
        showPreview(points);
        phase = 'confirm';
        onSnap(null);
        onStatus('Cortar sólido por plano · Enter, Espacio o clic derecho para confirmar');
      },
    });
  }

  function beginPoints() {
    const record = recordForId(solidId);
    if (!record) return fail('invalid-source-solid');
    if (record.locked === true) {
      onStatus(`${record.name} está bloqueado`);
      return false;
    }
    points = [];
    onSelection([solidId]);
    requestPoint(0);
    return true;
  }

  function confirm() {
    if (!active || phase !== 'confirm' || points.length !== 3) return false;
    const record = recordForId(solidId);
    if (!record) return fail('invalid-source-solid');
    const localPoints = points.map((point) =>
      solidWorldToLocal(point, record.placement));
    const operation = {
      type: 'cutSolidByPlane',
      points: localPoints.map(point3),
    };
    const result = splitSolidByPlane3d(record.solid, localPoints, { operation });
    if (!result.ok) return fail(result.reason);
    const replacementParts = result.parts.map((part) => {
      const partOperation = {
        ...operation,
        plane: result.plane,
        side: part.side,
        component: part.componentIndex + 1,
      };
      return {
        name: cutPlanePartName(record.name, part.side, part.componentIndex),
        operation: partOperation,
        placement: record.placement,
        solid: part.solid,
      };
    });
    const records = doc?.replace3dSolidWithParts?.(solidId, replacementParts) ?? [];
    if (records.length !== replacementParts.length) return fail('invalid-result');
    const recordIds = records.map((item) => item.id);
    cleanup();
    onChanged();
    onSelection(recordIds);
    onStatus(`Corte completado · ${recordIds.length} sólidos resultantes conservados`);
    return true;
  }

  function start() {
    if (active) cancel();
    initialSelection = [...getSelectedSolidIds()];
    active = true;
    solidId = selectedUnlockedId(initialSelection);
    canvas.focus?.({ preventScroll: true });
    if (solidId) return beginPoints();
    phase = 'selection';
    onSelection([]);
    onStatus('Cortar sólido por plano · seleccione un sólido');
    return true;
  }

  const picker = createPoint3dInput({
    camera,
    canvas,
    cursorInput,
    getSnap: (event, context) => getSnap(event, {
      ...context,
      phase,
      solidId,
    }),
    getUnitsLabel,
    getWorkplane,
    onHelper: setHelper,
    onPreview(point, context) {
      onSnap(context.snap ?? null);
      if (phase === 'point3' && points.length === 2) {
        showPreview([...points, point3(point)]);
      }
    },
    onStatus,
  });

  function pointermove(event) {
    if (!active || event.buttons || !picker.isActive()) return;
    picker.pointer(event);
    render();
  }

  function pointerdown(event) {
    if (!active || (event.button !== 0 && event.button !== 2)) return;
    suppressClick = true;
    suppressContextMenu = event.button === 2;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (phase === 'selection') {
      if (event.button === 2) {
        onStatus('Cortar sólido por plano · seleccione un sólido');
        return;
      }
      const id = getSolidIdAtPointer(event);
      const record = recordForId(id);
      if (!record || record.visible === false) {
        onStatus('Cortar sólido por plano · seleccione un sólido');
        return;
      }
      if (record.locked === true) {
        onStatus(`${record.name} está bloqueado`);
        return;
      }
      solidId = id;
      beginPoints();
      return;
    }
    if (picker.isActive()) {
      picker.pointer(event);
      picker.confirm();
      return;
    }
    if (phase === 'confirm' && event.button === 2) confirm();
  }

  function click(event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function contextmenu(event) {
    if (!suppressContextMenu && !active) return;
    suppressContextMenu = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function keydown(event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancel();
      return;
    }
    if (picker.isActive()) {
      if (picker.keydown(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    if (phase === 'confirm' && isSolidTransformConfirmEvent(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      confirm();
    }
  }

  function keyup(event) {
    if (!active || !picker.isActive() || !picker.keyup(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    render();
  }

  canvas.addEventListener('pointermove', pointermove, true);
  canvas.addEventListener('pointerdown', pointerdown, true);
  canvas.addEventListener('click', click, true);
  canvas.addEventListener('contextmenu', contextmenu, true);
  canvas.addEventListener('keydown', keydown, true);
  canvas.addEventListener('keyup', keyup, true);

  return {
    cancel,
    confirm,
    dispose() {
      if (active) cancel();
      canvas.removeEventListener('pointermove', pointermove, true);
      canvas.removeEventListener('pointerdown', pointerdown, true);
      canvas.removeEventListener('click', click, true);
      canvas.removeEventListener('contextmenu', contextmenu, true);
      canvas.removeEventListener('keydown', keydown, true);
      canvas.removeEventListener('keyup', keyup, true);
      scene.remove(helper);
      disposeThreeObject(helper);
    },
    isActive: () => active,
    start,
  };
}

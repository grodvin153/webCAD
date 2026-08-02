/* webCAD - Entrada y comandos de transformacion 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  hideCursorInput,
  updateCursorInput,
} from '../../input/cursor-input.js';
import { formatNumber, parseScalarExpression } from '../../input/entry.js';
import {
  normalizeSolidPlacement,
  rotateSolidPlacement,
  translateSolidPlacement,
} from '../solid-placement.js';
import { copySolids, moveSolids, rotateSolids } from '../solid-transformations.js';
import {
  createWideLineSegments,
  disposeThreeObject,
  THREE_VIEW_STYLE,
} from './three-scene-style.js';

const POINT_EPSILON = 1e-9;
const AXIS_INFERENCE_ANGLE = 6 * Math.PI / 180;
const INPUT_CHARACTER = /^[0-9eE+\-*/().,\s]$/;
const AXES = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

export function isSolidTransformConfirmEvent(event) {
  return event?.key === 'Enter' || event?.key === ' ' || event?.button === 2;
}

export function inferProjectedAxis({
  anchor,
  axes,
  pointer,
  angleTolerance = AXIS_INFERENCE_ANGLE,
} = {}) {
  if (!anchor || !axes || !pointer) return null;
  const pointerDelta = {
    x: Number(pointer.x) - Number(anchor.x),
    y: Number(pointer.y) - Number(anchor.y),
  };
  const pointerLength = Math.hypot(pointerDelta.x, pointerDelta.y);
  if (!Number.isFinite(pointerLength) || pointerLength < 8) return null;
  let nearest = null;
  Object.entries(axes).forEach(([axis, endpoint]) => {
    const direction = {
      x: Number(endpoint?.x) - Number(anchor.x),
      y: Number(endpoint?.y) - Number(anchor.y),
    };
    const directionLength = Math.hypot(direction.x, direction.y);
    if (!Number.isFinite(directionLength) || directionLength < 4) return;
    const sine = Math.min(1, Math.abs(
      pointerDelta.x * direction.y - pointerDelta.y * direction.x
    ) / (pointerLength * directionLength));
    const angle = Math.asin(sine);
    if (angle > angleTolerance || nearest && angle >= nearest.angle) return;
    nearest = { axis, angle };
  });
  return nearest?.axis ?? null;
}

function pointObject(vector) {
  return { x: vector.x, y: vector.y, z: vector.z };
}

function vector3(point) {
  return new THREE.Vector3(
    Number(point?.x) || 0,
    Number(point?.y) || 0,
    Number(point?.z) || 0,
  );
}

function vectorInput(text) {
  const parts = String(text).split(',');
  if (parts.length !== 3) return null;
  const values = parts.map((part) => parseScalarExpression(part.trim()));
  return values.every(Number.isFinite)
    ? new THREE.Vector3(values[0], values[1], values[2])
    : null;
}

function applyPlacementToObject(object, placement) {
  const clean = normalizeSolidPlacement(placement);
  object.position.set(clean.position.x, clean.position.y, clean.position.z);
  object.quaternion.set(
    clean.quaternion.x,
    clean.quaternion.y,
    clean.quaternion.z,
    clean.quaternion.w,
  );
  object.updateMatrixWorld?.(true);
}

export function resolvePoint3dFromInput(text, {
  anchor = null,
  axis = null,
  direction = null,
} = {}) {
  const directVector = vectorInput(text);
  if (directVector) {
    return pointObject(anchor ? directVector.add(vector3(anchor)) : directVector);
  }
  const scalar = parseScalarExpression(String(text).trim());
  const distanceDirection = vector3(direction ?? AXES[axis]);
  if (!Number.isFinite(scalar) || !anchor ||
      distanceDirection.lengthSq() <= POINT_EPSILON) return null;
  return pointObject(vector3(anchor).addScaledVector(distanceDirection.normalize(), scalar));
}

export function pointFromReference(reference, displacement) {
  return {
    x: Number(reference?.x) + Number(displacement?.x),
    y: Number(reference?.y) + Number(displacement?.y),
    z: Number(reference?.z ?? 0) + Number(displacement?.z ?? 0),
  };
}

export function pointOnAxisFromSnap(anchor, snapPoint, axis) {
  const direction = AXES[axis];
  if (!anchor || !snapPoint || !direction) return null;
  const origin = vector3(anchor);
  const offset = vector3(snapPoint).sub(origin);
  return pointObject(origin.addScaledVector(direction, offset.dot(direction)));
}

export function solidTransformDisplacementStatus(displacement) {
  const vector = vector3(displacement);
  return `Precise punto de destino · Distancia ${formatNumber(vector.length())}` +
    ` · ΔX ${formatNumber(vector.x)} · ΔY ${formatNumber(vector.y)}` +
    ` · ΔZ ${formatNumber(vector.z)}`;
}

export function createPoint3dInput({
  camera,
  canvas,
  cursorInput = null,
  getSnap = () => null,
  getUnitsLabel = () => 'mm',
  getWorkplane = () => ({ origin: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: 0, z: 1 } }),
  onHelper = () => {},
  onPreview = () => {},
  onStatus = () => {},
} = {}) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let request = null;
  let input = '';
  let candidate = null;
  let lockedAxis = null;
  let inferredAxis = null;
  let inferenceLock = null;
  let shiftDown = false;
  let fromReference = null;
  let lastPointerEvent = null;
  let distanceDirection = null;
  let stage = 'point';

  function activeAxis() {
    return lockedAxis ?? inferenceLock ?? inferredAxis;
  }

  function axisLocked() {
    return Boolean(lockedAxis || shiftDown && inferenceLock);
  }

  function status() {
    if (!request) return;
    const axis = activeAxis();
    const axisLabel = !axis
      ? ''
      : axisLocked()
        ? ` · eje ${axis.toUpperCase()} bloqueado${lockedAxis ? '' : ' con Shift'}`
        : ` · en eje ${axis.toUpperCase()} · Shift para bloquear`;
    const inputLabel = input ? ` · ${input}` : '';
    onStatus(`${stage === 'reference'
      ? 'Precise punto de referencia'
      : stage === 'displacement'
        ? 'Precise desplazamiento desde la referencia'
        : request.prompt}${axisLabel}${inputLabel}`);
  }

  function setPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
  }

  function activeAnchor() {
    return stage === 'displacement' ? fromReference : request?.anchor;
  }

  function updateDynamicInput(point = null) {
    const anchor = activeAnchor();
    const liveDistance = anchor && point
      ? vector3(point).distanceTo(vector3(anchor))
      : null;
    const value = input || (Number.isFinite(liveDistance)
      ? formatNumber(liveDistance)
      : '');
    updateCursorInput(cursorInput, {
      clientPoint: lastPointerEvent
        ? { x: lastPointerEvent.clientX, y: lastPointerEvent.clientY }
        : null,
      text: value ? `${value} ${getUnitsLabel()}` : '',
      visible: Boolean(request && anchor),
    });
  }

  function constrainedPoint(anchor, axis = activeAxis()) {
    const direction = AXES[axis];
    if (!anchor || !direction) return null;
    const center = vector3(anchor);
    const extent = 1e7;
    const start = center.clone().addScaledVector(direction, -extent);
    const end = center.clone().addScaledVector(direction, extent);
    const pointOnRay = new THREE.Vector3();
    const pointOnAxis = new THREE.Vector3();
    raycaster.ray.distanceSqToSegment(start, end, pointOnRay, pointOnAxis);
    return pointObject(pointOnAxis);
  }

  function workplanePoint(anchor = null) {
    if (anchor && request?.useWorkplaneWithAnchor !== true) {
      const cameraNormal = new THREE.Vector3();
      camera.getWorldDirection(cameraNormal);
      const viewPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
        cameraNormal.normalize(),
        vector3(anchor),
      );
      const viewIntersection = new THREE.Vector3();
      return raycaster.ray.intersectPlane(viewPlane, viewIntersection)
        ? pointObject(viewIntersection)
        : null;
    }
    const plane = getWorkplane() ?? {};
    const normal = vector3(plane.normal);
    if (normal.lengthSq() <= POINT_EPSILON) normal.set(0, 0, 1);
    const threePlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      normal.normalize(),
      vector3(plane.origin),
    );
    const intersection = new THREE.Vector3();
    return raycaster.ray.intersectPlane(threePlane, intersection)
      ? pointObject(intersection)
      : null;
  }

  function projectedAxisAtPointer(anchor, event) {
    if (!anchor || !event) return null;
    const rect = canvas.getBoundingClientRect();
    const cameraDistance = Math.max(
      1,
      camera.position.distanceTo(vector3(anchor)),
    );
    const worldLength = cameraDistance * 0.35;
    const project = (point) => {
      const projected = vector3(point).project(camera);
      return {
        x: (projected.x + 1) * rect.width * 0.5,
        y: (1 - projected.y) * rect.height * 0.5,
      };
    };
    const origin = vector3(anchor);
    return inferProjectedAxis({
      anchor: project(origin),
      axes: Object.fromEntries(Object.entries(AXES).map(([axis, direction]) => [
        axis,
        project(origin.clone().addScaledVector(direction, worldLength)),
      ])),
      pointer: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    });
  }

  function update(event) {
    if (!request) return null;
    lastPointerEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      shiftKey: event.shiftKey === true,
    };
    setPointer(event);
    const anchor = activeAnchor();
    shiftDown = event.shiftKey === true;
    if (!shiftDown) inferenceLock = null;
    const snap = getSnap(event, {
      anchor,
      stage,
    });
    const projectedAxis = request?.disableAxisInference === true
      ? null
      : projectedAxisAtPointer(anchor, event);
    inferredAxis = lockedAxis || inferenceLock
      ? inferredAxis
      : snap && !shiftDown
        ? null
        : projectedAxis;
    if (shiftDown && !inferenceLock && inferredAxis) inferenceLock = inferredAxis;
    const axis = activeAxis();
    const mustConstrain = Boolean(axis && (lockedAxis || inferenceLock || !snap));
    const snapSetsAxisDistance = Boolean(
      mustConstrain && axisLocked() && anchor && snap?.point,
    );
    const constrained = snapSetsAxisDistance
      ? pointOnAxisFromSnap(anchor, snap.point, axis)
      : mustConstrain ? constrainedPoint(anchor, axis) : null;
    candidate = constrained ?? snap?.point ?? workplanePoint(anchor);
    status();
    if (candidate) {
      const candidateDirection = vector3(candidate).sub(vector3(anchor));
      if (anchor && candidateDirection.lengthSq() > POINT_EPSILON) {
        distanceDirection = pointObject(candidateDirection.normalize());
      }
      const inputPoint = input
        ? resolvePoint3dFromInput(input, {
            anchor,
            axis: activeAxis(),
            direction: distanceDirection,
          })
        : null;
      const previewPoint = inputPoint ?? candidate;
      updateDynamicInput(previewPoint);
      onPreview(previewPoint, {
        axis: mustConstrain ? axis : null,
        inferred: Boolean(axis && !axisLocked()),
        locked: axisLocked(),
        snap: snapSetsAxisDistance || !constrained ? snap : null,
        snapSetsAxisDistance,
        stage,
      });
    }
    else updateDynamicInput();
    return candidate;
  }

  function finish(point) {
    if (!request || !point) return false;
    if (stage === 'reference') {
      fromReference = point;
      stage = 'displacement';
      lockedAxis = null;
      inferredAxis = null;
      inferenceLock = null;
      distanceDirection = null;
      input = '';
      candidate = null;
      onHelper(fromReference);
      status();
      return true;
    }
    const result = point;
    const completed = request.onPoint;
    const usedFrom = stage === 'displacement';
    request = null;
    input = '';
    candidate = null;
    lockedAxis = null;
    inferredAxis = null;
    inferenceLock = null;
    fromReference = null;
    stage = 'point';
    hideCursorInput(cursorInput);
    completed(result, { usedFrom });
    return true;
  }

  function confirm() {
    if (!request) return false;
    const parsed = input
      ? resolvePoint3dFromInput(input, {
        anchor: activeAnchor(),
        axis: activeAxis(),
        direction: distanceDirection,
      })
      : null;
    return finish(parsed ?? candidate);
  }

  function start(options) {
    request = options;
    input = '';
    candidate = null;
    lockedAxis = null;
    inferredAxis = null;
    inferenceLock = null;
    shiftDown = false;
    fromReference = null;
    lastPointerEvent = null;
    distanceDirection = null;
    stage = 'point';
    hideCursorInput(cursorInput);
    if (options.anchor) onHelper(options.anchor);
    status();
  }

  function keydown(event) {
    if (!request) return false;
    const key = event.key.toLowerCase();
    if (event.key === 'Shift') {
      shiftDown = true;
      if (!inferenceLock && inferredAxis) inferenceLock = inferredAxis;
      if (lastPointerEvent) update({ ...lastPointerEvent, shiftKey: true });
      return true;
    }
    if (key === 'escape') {
      request.onCancel?.();
      return true;
    }
    if (isSolidTransformConfirmEvent(event)) {
      confirm();
      return true;
    }
    if (key === 'backspace') {
      input = input.slice(0, -1);
      if (lastPointerEvent) update({ ...lastPointerEvent, shiftKey: shiftDown });
      else {
        status();
        updateDynamicInput(candidate);
      }
      return true;
    }
    if (!input && request.allowFrom && stage === 'point' && key === 'd') {
      stage = 'reference';
      candidate = null;
      lockedAxis = null;
      status();
      return true;
    }
    if (!input && AXES[key] && activeAnchor()) {
      lockedAxis = lockedAxis === key ? null : key;
      inferredAxis = lockedAxis;
      inferenceLock = null;
      if (lockedAxis) {
        const anchor = vector3(activeAnchor());
        const existingDirection = candidate
          ? vector3(candidate).sub(anchor)
          : new THREE.Vector3();
        const sign = existingDirection.dot(AXES[lockedAxis]) < 0 ? -1 : 1;
        distanceDirection = pointObject(AXES[lockedAxis].clone().multiplyScalar(sign));
      }
      status();
      return true;
    }
    if (event.key.length === 1 && INPUT_CHARACTER.test(event.key)) {
      input += event.key;
      if (lastPointerEvent) update({ ...lastPointerEvent, shiftKey: shiftDown });
      else {
        status();
        updateDynamicInput();
      }
      return true;
    }
    return false;
  }

  return {
    cancel() {
      request = null;
      input = '';
      candidate = null;
      lockedAxis = null;
      inferredAxis = null;
      inferenceLock = null;
      shiftDown = false;
      fromReference = null;
      lastPointerEvent = null;
      distanceDirection = null;
      stage = 'point';
      hideCursorInput(cursorInput);
    },
    confirm,
    hasInput: () => Boolean(input),
    isActive: () => Boolean(request),
    keydown,
    keyup(event) {
      if (event.key !== 'Shift') return false;
      shiftDown = false;
      inferenceLock = null;
      if (lastPointerEvent) update({ ...lastPointerEvent, shiftKey: false });
      return true;
    },
    pointer: update,
    start,
  };
}

export function createSolidTransformCommands({
  camera,
  canvas,
  cursorInput = null,
  doc,
  getUnitsLabel = () => 'mm',
  getSelectedSolidIds = () => [],
  getSolidIdAtPointer = () => null,
  getSolidObjects = () => [],
  getSnap = () => null,
  getWorkplane,
  onChanged = () => {},
  onSelection = () => {},
  onSnap = () => {},
  onStatus = () => {},
  render = () => {},
  scene,
} = {}) {
  let mode = null;
  let phase = null;
  let solidIds = [];
  let basePoint = null;
  let axisStart = null;
  let axisEnd = null;
  let angleInput = '';
  let angleDegrees = 0;
  let anglePointerStart = null;
  let suppressClick = false;
  let suppressContextMenu = false;
  const originals = new Map();
  const copyPreviews = new Map();
  const helper = new THREE.Group();
  helper.name = 'webcad-solid-transform-helper';
  const axes = new THREE.AxesHelper(18);
  helper.add(axes);
  helper.visible = false;
  scene.add(helper);
  let guide = null;

  function recordForId(id) {
    return doc?.model3d?.solids?.find((record) => record?.id === id) ?? null;
  }

  function selectedUnlocked(ids) {
    return [...new Set(ids)].filter((id) => {
      const record = recordForId(id);
      return record && record.visible !== false && record.locked !== true;
    });
  }

  function solidObject(id) {
    return getSolidObjects().find((object) => object.userData?.documentSolidId === id) ?? null;
  }

  function rememberOriginals() {
    originals.clear();
    solidIds.forEach((id) => {
      const record = recordForId(id);
      if (record) originals.set(id, normalizeSolidPlacement(record.placement));
    });
  }

  function clearCopyPreviews() {
    copyPreviews.forEach((object) => {
      scene.remove(object);
      disposeThreeObject(object);
    });
    copyPreviews.clear();
  }

  function createCopyPreviews() {
    clearCopyPreviews();
    solidIds.forEach((id) => {
      const source = solidObject(id);
      if (!source) return;
      const preview = source.clone(true);
      preview.traverse?.((object) => {
        if (object.geometry) object.geometry = object.geometry.clone();
        if (Array.isArray(object.material)) {
          object.material = object.material.map((material) => material.clone());
        }
        else if (object.material) object.material = object.material.clone();
      });
      preview.name = `webcad-solid-copy-preview-${id}`;
      preview.userData = {
        ...preview.userData,
        documentSolidId: null,
        transformPreview: true,
      };
      copyPreviews.set(id, preview);
      scene.add(preview);
    });
  }

  function restorePreview() {
    originals.forEach((placement, id) => {
      const object = solidObject(id);
      if (object) applyPlacementToObject(object, placement);
    });
    render();
  }

  function setHelper(point) {
    if (!point) {
      helper.visible = false;
      return;
    }
    helper.position.copy(vector3(point));
    helper.visible = true;
    render();
  }

  function clearGuide() {
    if (!guide) return;
    helper.remove(guide);
    disposeThreeObject(guide);
    guide = null;
  }

  function axisGuide(start, end, angle = null) {
    clearGuide();
    const startVector = vector3(start);
    const endVector = vector3(end);
    const axis = endVector.clone().sub(startVector);
    if (axis.lengthSq() <= POINT_EPSILON) return;
    const material = new THREE.LineBasicMaterial({
      color: 0xffcf4d,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    });
    const points = [
      startVector.clone().sub(helper.position),
      endVector.clone().sub(helper.position),
    ];
    guide = new THREE.Group();
    guide.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      material,
    ));
    if (Number.isFinite(angle) && Math.abs(angle) > POINT_EPSILON) {
      const unit = axis.normalize();
      const basis = Math.abs(unit.z) < 0.9
        ? new THREE.Vector3(0, 0, 1)
        : new THREE.Vector3(0, 1, 0);
      const first = basis.cross(unit).normalize().multiplyScalar(9);
      const rotation = new THREE.Quaternion().setFromAxisAngle(unit, angle * Math.PI / 180);
      const arcPoints = [];
      const segments = Math.max(8, Math.ceil(Math.abs(angle) / 10));
      for (let index = 0; index <= segments; index += 1) {
        arcPoints.push(first.clone().applyQuaternion(
          new THREE.Quaternion().slerpQuaternions(
            new THREE.Quaternion(),
            rotation,
            index / segments,
          ),
        ));
      }
      guide.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(arcPoints),
        material.clone(),
      ));
    }
    helper.add(guide);
  }

  function previewMove(destination, context = {}) {
    if (!basePoint) return;
    const displacement = vector3(destination).sub(vector3(basePoint));
    clearGuide();
    if (displacement.lengthSq() > POINT_EPSILON) {
      const axisColor = {
        x: THREE_VIEW_STYLE.axisX,
        y: THREE_VIEW_STYLE.axisY,
        z: THREE_VIEW_STYLE.axisZ,
      };
      guide = createWideLineSegments([{
        start: { x: 0, y: 0, z: 0 },
        end: pointObject(displacement),
      }], {
        color: axisColor[context.axis] ?? 0xffcf4d,
        depthTest: false,
        depthWrite: false,
        linewidth: Math.max(2.2, THREE_VIEW_STYLE.axisLineWidth - 0.3),
        renderOrder: 80,
        transparent: true,
        opacity: context.locked ? 1 : 0.9,
      });
      guide.name = context.axis
        ? `webcad-solid-move-guide-${context.axis}`
        : 'webcad-solid-move-guide-free';
      helper.add(guide);
    }
    originals.forEach((placement, id) => {
      const object = mode === 'copy' ? copyPreviews.get(id) : solidObject(id);
      if (object) applyPlacementToObject(object, translateSolidPlacement(placement, displacement));
    });
    onStatus(solidTransformDisplacementStatus(displacement));
    render();
  }

  function previewRotate(angle) {
    if (!axisStart || !axisEnd) return false;
    angleDegrees = Number(angle) || 0;
    originals.forEach((placement, id) => {
      const next = rotateSolidPlacement(placement, {
        axisStart,
        axisEnd,
        angleDegrees,
      });
      const object = solidObject(id);
      if (object && next) applyPlacementToObject(object, next);
    });
    axisGuide(axisStart, axisEnd, angleDegrees);
    onStatus(`Precise ángulo de giro · ${formatNumber(angleDegrees)}°`);
    render();
    return true;
  }

  function finish(successMessage, nextSelection = null) {
    picker.cancel();
    clearGuide();
    clearCopyPreviews();
    helper.visible = false;
    mode = null;
    phase = null;
    originals.clear();
    angleInput = '';
    anglePointerStart = null;
    onChanged();
    if (nextSelection) onSelection(nextSelection);
    onStatus(successMessage);
  }

  function cancel() {
    if (!mode) return false;
    const label = mode === 'copy'
      ? 'Copiar'
      : mode === 'move'
        ? 'Mover'
        : 'Girar';
    picker.cancel();
    restorePreview();
    clearGuide();
    clearCopyPreviews();
    helper.visible = false;
    mode = null;
    phase = null;
    solidIds = [];
    originals.clear();
    angleInput = '';
    anglePointerStart = null;
    onSnap(null);
    onStatus(`${label} cancelado`);
    render();
    return true;
  }

  function confirmMove(destination) {
    restorePreview();
    const changed = moveSolids({
      doc,
      solidIds,
      from: basePoint,
      to: destination,
    });
    if (!changed) {
      cancel();
      return;
    }
    finish(`${solidIds.length} sólido${solidIds.length === 1 ? '' : 's'} desplazado${solidIds.length === 1 ? '' : 's'}`);
  }

  function confirmCopy(destination) {
    restorePreview();
    const copies = copySolids({
      doc,
      solidIds,
      from: basePoint,
      to: destination,
    });
    if (!copies.length) {
      cancel();
      return;
    }
    const copyIds = copies.map((record) => record.id);
    finish(`${copyIds.length} sólido${copyIds.length === 1 ? '' : 's'} copiado${copyIds.length === 1 ? '' : 's'}`, copyIds);
  }

  function confirmRotate() {
    if (Math.hypot(
      axisEnd.x - axisStart.x,
      axisEnd.y - axisStart.y,
      axisEnd.z - axisStart.z,
    ) <= POINT_EPSILON) {
      onStatus('Precise segundo punto del eje · el eje debe tener longitud');
      return false;
    }
    restorePreview();
    const changed = rotateSolids({
      doc,
      solidIds,
      axisStart,
      axisEnd,
      angleDegrees,
    });
    if (!changed) {
      cancel();
      return false;
    }
    finish(`${solidIds.length} sólido${solidIds.length === 1 ? '' : 's'} girado${solidIds.length === 1 ? '' : 's'} ${formatNumber(angleDegrees)}°`);
    return true;
  }

  function requestMoveBase() {
    phase = 'base';
    picker.start({
      allowFrom: true,
      prompt: 'Precise punto base o [Desde]',
      onCancel: cancel,
      onPoint(point) {
        basePoint = point;
        phase = 'destination';
        setHelper(basePoint);
        picker.start({
          anchor: basePoint,
          prompt: 'Precise punto de destino',
          onCancel: cancel,
          onPoint: mode === 'copy' ? confirmCopy : confirmMove,
        });
      },
    });
  }

  function requestAxisStart() {
    phase = 'axisStart';
    picker.start({
      allowFrom: true,
      prompt: 'Precise primer punto del eje o [Desde]',
      onCancel: cancel,
      onPoint(point) {
        axisStart = point;
        phase = 'axisEnd';
        setHelper(axisStart);
        picker.start({
          anchor: axisStart,
          prompt: 'Precise segundo punto del eje',
          onCancel: cancel,
          onPoint(point2) {
            if (vector3(point2).distanceTo(vector3(axisStart)) <= POINT_EPSILON) {
              onStatus('Precise segundo punto del eje · el eje debe tener longitud');
              requestAxisStartFromExisting();
              return;
            }
            axisEnd = point2;
            phase = 'angle';
            angleDegrees = 0;
            angleInput = '';
            axisGuide(axisStart, axisEnd, 0);
            onStatus('Precise ángulo de giro');
          },
        });
      },
    });
  }

  function requestAxisStartFromExisting() {
    phase = 'axisEnd';
    picker.start({
      anchor: axisStart,
      prompt: 'Precise segundo punto del eje',
      onCancel: cancel,
      onPoint(point2) {
        if (vector3(point2).distanceTo(vector3(axisStart)) <= POINT_EPSILON) {
          onStatus('Precise segundo punto del eje · el eje debe tener longitud');
          requestAxisStartFromExisting();
          return;
        }
        axisEnd = point2;
        phase = 'angle';
        angleDegrees = 0;
        angleInput = '';
        axisGuide(axisStart, axisEnd, 0);
        onStatus('Precise ángulo de giro');
      },
    });
  }

  function beginPoints() {
    rememberOriginals();
    if (mode === 'copy') createCopyPreviews();
    if (mode === 'move' || mode === 'copy') requestMoveBase();
    else requestAxisStart();
  }

  function start(nextMode, ids = null) {
    if (mode) cancel();
    mode = nextMode;
    solidIds = selectedUnlocked(ids ?? getSelectedSolidIds());
    onSelection(solidIds);
    canvas.focus?.({ preventScroll: true });
    if (solidIds.length) {
      beginPoints();
      return true;
    }
    phase = 'selection';
    onStatus('Seleccione sólido(s) · Enter para continuar');
    return true;
  }

  const picker = createPoint3dInput({
    camera,
    canvas,
    cursorInput,
    getSnap: (event, context) => getSnap(event, {
      ...context,
      mode,
      phase,
      solidIds: [...solidIds],
    }),
    getWorkplane,
    getUnitsLabel,
    onHelper: setHelper,
    onPreview(point, context) {
      onSnap(context.snap ?? null);
      if ((mode === 'move' || mode === 'copy') && phase === 'destination') {
        previewMove(point, context);
      }
      else if (mode === 'rotate' && phase === 'axisEnd') axisGuide(axisStart, point);
    },
    onStatus,
  });

  function pointermove(event) {
    if (!mode || event.buttons) return;
    if (picker.isActive()) {
      picker.pointer(event);
      render();
      return;
    }
    if (phase === 'angle') {
      anglePointerStart ??= { x: event.clientX, angle: angleDegrees };
      previewRotate(anglePointerStart.angle + (event.clientX - anglePointerStart.x) * 0.5);
    }
  }

  function pointerdown(event) {
    if (!mode || (event.button !== 0 && event.button !== 2)) return;
    const confirmsLikeEnter = event.button === 2;
    suppressClick = true;
    suppressContextMenu = confirmsLikeEnter;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (phase === 'selection') {
      if (confirmsLikeEnter) {
        if (solidIds.length) beginPoints();
        else onStatus('Seleccione sólido(s)');
        return;
      }
      const id = getSolidIdAtPointer(event);
      const record = recordForId(id);
      if (!record) {
        onStatus('Seleccione sólido(s)');
        return;
      }
      if (record.locked === true) {
        onStatus(`${record.name} está bloqueado`);
        return;
      }
      if (!solidIds.includes(id)) solidIds.push(id);
      onSelection(solidIds);
      onStatus(`Seleccione sólido(s) · ${solidIds.length} seleccionado${solidIds.length === 1 ? '' : 's'} · Enter para continuar`);
      render();
      return;
    }
    if (picker.isActive()) {
      picker.pointer(event);
      picker.confirm();
      return;
    }
    if (phase === 'angle') confirmRotate();
  }

  function click(event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function contextmenu(event) {
    if (!suppressContextMenu && !mode) return;
    suppressContextMenu = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function keydown(event) {
    if (!mode) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancel();
      return;
    }
    if (phase === 'selection') {
      if (isSolidTransformConfirmEvent(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (solidIds.length) beginPoints();
        else onStatus('Seleccione sólido(s)');
      }
      return;
    }
    if (picker.isActive()) {
      if (picker.keydown(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    if (phase !== 'angle') return;
    if (isSolidTransformConfirmEvent(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (angleInput) {
        const parsed = parseScalarExpression(angleInput);
        if (Number.isFinite(parsed)) previewRotate(parsed);
      }
      confirmRotate();
      return;
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
      angleInput = angleInput.slice(0, -1);
    }
    else if (event.key.length === 1 && INPUT_CHARACTER.test(event.key)) {
      event.preventDefault();
      angleInput += event.key;
    }
    else return;
    event.stopImmediatePropagation();
    const parsed = parseScalarExpression(angleInput);
    if (Number.isFinite(parsed)) previewRotate(parsed);
    else onStatus(`Precise ángulo de giro · ${angleInput}`);
  }

  function keyup(event) {
    if (!mode || !picker.isActive() || !picker.keyup(event)) return;
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
    dispose() {
      cancel();
      canvas.removeEventListener('pointermove', pointermove, true);
      canvas.removeEventListener('pointerdown', pointerdown, true);
      canvas.removeEventListener('click', click, true);
      canvas.removeEventListener('contextmenu', contextmenu, true);
      canvas.removeEventListener('keydown', keydown, true);
      canvas.removeEventListener('keyup', keyup, true);
      scene.remove(helper);
      disposeThreeObject(helper);
    },
    isActive: () => Boolean(mode),
    startCopy: (ids = null) => start('copy', ids),
    startMove: (ids = null) => start('move', ids),
    startRotate: (ids = null) => start('rotate', ids),
  };
}

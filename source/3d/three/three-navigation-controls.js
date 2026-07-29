/* webCAD - Navegacion 3D sincronizada con raton/trackpad | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

const ZOOM_SENSITIVITY = 360;
const MIN_CAMERA_DISTANCE = 0.05;

function normalizedDevice(device) {
  return device === 'mouse' ? 'mouse' : 'trackpad';
}

function wheelDelta(event) {
  const lineMode = typeof WheelEvent === 'undefined' ? 1 : WheelEvent.DOM_DELTA_LINE;
  const pageMode = typeof WheelEvent === 'undefined' ? 2 : WheelEvent.DOM_DELTA_PAGE;
  if (event.deltaMode === lineMode) return { x: event.deltaX * 16, y: event.deltaY * 16 };
  if (event.deltaMode === pageMode) return { x: event.deltaX * 800, y: event.deltaY * 800 };
  return { x: event.deltaX, y: event.deltaY };
}

export function cameraWorldHeight(camera, target) {
  if (camera?.isOrthographicCamera) {
    return Math.abs(Number(camera.top) - Number(camera.bottom)) /
      Math.max(0.0001, Number(camera.zoom) || 1);
  }
  const distance = Math.max(MIN_CAMERA_DISTANCE, camera.position.distanceTo(target));
  return 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) /
    Math.max(0.0001, Number(camera.zoom) || 1);
}

function panCameraByPixels(camera, controls, delta, viewport) {
  const width = Math.max(1, viewport.width || 1);
  const height = Math.max(1, viewport.height || 1);
  const worldHeight = cameraWorldHeight(camera, controls.target);
  const worldPerPixel = worldHeight / height;
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0).normalize();
  const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1).normalize();
  const offset = new THREE.Vector3()
    .addScaledVector(right, delta.x * worldPerPixel)
    .addScaledVector(up, -delta.y * worldPerPixel);
  camera.position.add(offset);
  controls.target.add(offset);
  controls.update();
  return width;
}

export function zoomCameraByWheel(camera, controls, deltaY) {
  const factor = Math.exp(deltaY / ZOOM_SENSITIVITY);
  if (camera?.isOrthographicCamera) {
    const nextZoom = Math.max(0.0001, (Number(camera.zoom) || 1) / factor);
    if (Math.abs(nextZoom - camera.zoom) <= 1e-12) return false;
    camera.zoom = nextZoom;
    camera.updateProjectionMatrix();
    controls.update();
    return true;
  }
  const target = controls.target;
  const direction = new THREE.Vector3().subVectors(camera.position, target);
  const currentDistance = direction.length();
  if (currentDistance <= MIN_CAMERA_DISTANCE) return false;
  const nextDistance = Math.max(MIN_CAMERA_DISTANCE, currentDistance * factor);
  direction.setLength(nextDistance);
  camera.position.copy(target).add(direction);
  controls.update();
  return true;
}

export function configureThreeNavigationControls({
  camera,
  canvas,
  controls,
  getNavigationDevice,
  render,
  viewport,
}) {
  let navigationDevice = normalizedDevice(getNavigationDevice?.());

  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
  controls.mouseButtons.MIDDLE = THREE.MOUSE.PAN;
  controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.screenSpacePanning = true;

  function setNavigationDevice(device) {
    navigationDevice = normalizedDevice(device);
    controls.enableZoom = navigationDevice === 'mouse';
  }

  function onWheel(event) {
    if (navigationDevice !== 'trackpad') {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    const delta = wheelDelta(event);
    const zooming = event.shiftKey;
    if (zooming) {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) zoomCameraByWheel(camera, controls, zoomDelta);
    }
    else {
      panCameraByPixels(camera, controls, delta, viewport());
    }
    render?.();
  }

  setNavigationDevice(navigationDevice);
  canvas.addEventListener('wheel', onWheel, { capture: true, passive: false });

  return {
    dispose() {
      canvas.removeEventListener('wheel', onWheel, { capture: true });
    },
    setNavigationDevice,
  };
}

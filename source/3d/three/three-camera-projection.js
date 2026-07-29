/* webCAD - Proyecciones intercambiables para la camara Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

export const CAMERA_PROJECTION_PERSPECTIVE = 'perspective';
export const CAMERA_PROJECTION_ORTHOGRAPHIC = 'orthographic';

export function normalizeCameraProjection(value) {
  return value === CAMERA_PROJECTION_ORTHOGRAPHIC
    ? CAMERA_PROJECTION_ORTHOGRAPHIC
    : CAMERA_PROJECTION_PERSPECTIVE;
}

export function cameraProjectionForOrientation(orientation, preference) {
  return orientation?.type === 'face'
    ? CAMERA_PROJECTION_ORTHOGRAPHIC
    : normalizeCameraProjection(preference);
}

export function createSwitchableThreeCamera({
  aspect = 1,
  far = 1000000,
  fov = 36,
  near = 0.01,
} = {}) {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.left = -1;
  camera.right = 1;
  camera.top = 1;
  camera.bottom = -1;
  camera.userData.webcadProjection = CAMERA_PROJECTION_PERSPECTIVE;
  camera.isOrthographicCamera = false;
  camera.updateProjectionMatrix = function updateSwitchableProjectionMatrix() {
    if (this.userData.webcadProjection === CAMERA_PROJECTION_ORTHOGRAPHIC) {
      THREE.OrthographicCamera.prototype.updateProjectionMatrix.call(this);
      return;
    }
    THREE.PerspectiveCamera.prototype.updateProjectionMatrix.call(this);
  };
  camera.updateProjectionMatrix();
  return camera;
}

export function cameraProjection(camera) {
  return normalizeCameraProjection(camera?.userData?.webcadProjection);
}

export function setCameraProjection(camera, value) {
  const projection = normalizeCameraProjection(value);
  camera.userData.webcadProjection = projection;
  camera.isPerspectiveCamera = projection === CAMERA_PROJECTION_PERSPECTIVE;
  camera.isOrthographicCamera = projection === CAMERA_PROJECTION_ORTHOGRAPHIC;
  camera.updateProjectionMatrix();
  return projection;
}

export function updateCameraProjectionViewport(camera, {
  height = 1,
  viewHeight = 2,
  width = 1,
} = {}) {
  const aspect = Math.max(1, Number(width) || 1) /
    Math.max(1, Number(height) || 1);
  camera.aspect = aspect;
  const halfHeight = Math.max(0.0001, Number(viewHeight) * 0.5 || 1);
  camera.left = -halfHeight * aspect;
  camera.right = halfHeight * aspect;
  camera.top = halfHeight;
  camera.bottom = -halfHeight;
  camera.updateProjectionMatrix();
}

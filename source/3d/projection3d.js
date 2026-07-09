/* webCAD - Proyeccion 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import { cross3, dot3, length3, normalize3, sub3 } from './math3d.js';

const CAMERA_EPSILON = 1e-12;

function positiveNumber(value, fallback) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : fallback;
}

function cameraBasis(camera) {
  const forward = normalize3(sub3(camera?.target, camera?.position));
  const right = normalize3(cross3(forward, camera?.up));
  if (length3(forward) <= CAMERA_EPSILON || length3(right) <= CAMERA_EPSILON) {
    return null;
  }
  return {
    forward,
    right,
    up: normalize3(cross3(right, forward)),
  };
}

export function projectPoint3d(point, camera, viewport) {
  const width = positiveNumber(viewport?.width, 1);
  const height = positiveNumber(viewport?.height, 1);
  const viewportX = Number.isFinite(Number(viewport?.x)) ? Number(viewport.x) : 0;
  const viewportY = Number.isFinite(Number(viewport?.y)) ? Number(viewport.y) : 0;
  const basis = cameraBasis(camera);
  if (!basis) {
    return null;
  }

  const relativePoint = sub3(point, camera.position);
  const cameraX = dot3(relativePoint, basis.right);
  const cameraY = dot3(relativePoint, basis.up);
  const depth = dot3(relativePoint, basis.forward);
  const zoom = positiveNumber(camera?.zoom, 1);
  const centerX = viewportX + width * 0.5;
  const centerY = viewportY + height * 0.5;
  let screenX;
  let screenY;

  if (camera?.projectionType === 'orthographic') {
    const orthographicScale = positiveNumber(camera?.orthographicScale, 20);
    const pixelsPerUnit = height * zoom / orthographicScale;
    screenX = centerX + cameraX * pixelsPerUnit;
    screenY = centerY - cameraY * pixelsPerUnit;
  }
  else {
    const near = positiveNumber(camera?.near, 0.01);
    const far = positiveNumber(camera?.far, Number.POSITIVE_INFINITY);
    if (depth < near || depth > far) {
      return null;
    }
    const fieldOfView = Math.min(179, positiveNumber(camera?.fieldOfView, 45));
    const focalLength = height * 0.5 /
      Math.tan(fieldOfView * Math.PI / 360) * zoom;
    screenX = centerX + cameraX * focalLength / depth;
    screenY = centerY - cameraY * focalLength / depth;
  }

  return {
    x: screenX,
    y: screenY,
    depth,
    visible: screenX >= viewportX && screenX <= viewportX + width &&
      screenY >= viewportY && screenY <= viewportY + height,
  };
}

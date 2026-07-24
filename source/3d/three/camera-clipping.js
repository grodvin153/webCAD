/* webCAD - Rango de recorte estable para el visor Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

function finiteCoordinate(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function cameraClipRangeForBounds(bounds, cameraPosition, {
  extrusionMargin = 24,
  minimumNear = 0.0001,
} = {}) {
  const min = bounds?.min ?? {};
  const max = bounds?.max ?? {};
  const minX = finiteCoordinate(min.x);
  const minY = finiteCoordinate(min.y);
  const minZ = finiteCoordinate(min.z);
  const maxX = finiteCoordinate(max.x, minX);
  const maxY = finiteCoordinate(max.y, minY);
  const maxZ = finiteCoordinate(max.z, minZ);
  const center = {
    x: (minX + maxX) * 0.5,
    y: (minY + maxY) * 0.5,
    z: (minZ + maxZ) * 0.5,
  };
  const radius = Math.max(Math.hypot(
    maxX - minX,
    maxY - minY,
    maxZ - minZ,
  ) * 0.5, 0.001);
  const distance = Math.hypot(
    finiteCoordinate(cameraPosition?.x) - center.x,
    finiteCoordinate(cameraPosition?.y) - center.y,
    finiteCoordinate(cameraPosition?.z) - center.z,
  );
  const frontDistance = distance - radius;
  const near = frontDistance > 0
    ? Math.max(minimumNear, frontDistance * 0.5)
    : Math.max(minimumNear, radius / 1000);
  const far = Math.max(
    near * 2,
    distance + radius * Math.max(2, extrusionMargin),
  );
  return { far, near };
}

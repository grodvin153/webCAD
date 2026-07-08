/* webCAD - Coordenadas tridimensionales compatibles con el motor 2D | SPDX-License-Identifier: GPL-3.0-or-later */

export function finiteCoordinate(value, fallback = 0) {
  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : fallback;
}

export function coordinateZ(point, fallback = 0) {
  return finiteCoordinate(point?.z, fallback);
}

export function point3(point, fallbackZ = 0) {
  return {
    x: finiteCoordinate(point?.x),
    y: finiteCoordinate(point?.y),
    z: coordinateZ(point, fallbackZ),
  };
}

export function vector3(vector) {
  return point3(vector, 0);
}

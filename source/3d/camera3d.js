/* webCAD - Camara 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

export function createDefaultCamera3d() {
  return {
    position: { x: 10, y: -10, z: 10 },
    target: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 0, z: 1 },
    zoom: 1,
    projectionType: 'perspective',
    fieldOfView: 45,
    orthographicScale: 20,
    near: 0.01,
    far: 100000,
  };
}

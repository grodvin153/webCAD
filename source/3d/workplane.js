/* webCAD - Planos de trabajo 3D experimentales | SPDX-License-Identifier: GPL-3.0-or-later */

import { dot3, normalize3, scale3, sub3 } from './math3d.js';

export function createWorldXYPlane() {
  return {
    origin: { x: 0, y: 0, z: 0 },
    xAxis: { x: 1, y: 0, z: 0 },
    yAxis: { x: 0, y: 1, z: 0 },
    normal: { x: 0, y: 0, z: 1 },
  };
}

export function projectPointToWorkplane(point, workplane = createWorldXYPlane()) {
  const normal = normalize3(workplane?.normal);
  const relativePoint = sub3(point, workplane?.origin);
  const signedDistance = dot3(relativePoint, normal);
  return sub3(point, scale3(normal, signedDistance));
}

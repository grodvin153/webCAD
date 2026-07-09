/* webCAD - Adaptador experimental Solid3d a Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { isValidSolid3d } from '../solid.js';

function triangulateFace(face) {
  if (face.length === 3) {
    return [...face];
  }
  if (face.length === 4) {
    return [face[0], face[1], face[2], face[0], face[2], face[3]];
  }
  throw new RangeError('La demo Three.js solo admite caras triangulares o cuadrangulares');
}

export function solid3dToBufferGeometry(solid) {
  if (!isValidSolid3d(solid)) {
    throw new TypeError('No se puede convertir un Solid3d no valido');
  }

  const positions = new Float32Array(solid.vertices.length * 3);
  solid.vertices.forEach((vertex, index) => {
    const offset = index * 3;
    positions[offset] = vertex.x;
    positions[offset + 1] = vertex.y;
    positions[offset + 2] = vertex.z;
  });
  const triangleIndices = solid.faces.flatMap(triangulateFace);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(triangleIndices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.userData.webcadMetadata = solid.metadata && typeof solid.metadata === 'object'
    ? { ...solid.metadata }
    : solid.metadata ?? null;
  return geometry;
}

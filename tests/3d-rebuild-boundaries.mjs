/* webCAD - Regresiones de aristas y residuos al reconstruir | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import * as THREE from 'three';

import {
  auditSolid3dTopology,
  createSolid3d,
} from '../source/3d/solid.js';
import {
  auditSolidCadTopology,
  rebuildSolidCadTopology,
  solidWithDerivedSurfaceTopology,
} from '../source/3d/three/manifold-boolean.js';

const vertices = [
  { x: -2.7503252029418945, y: 0, z: 0 },
  { x: -2.7503252029418945, y: 0, z: 12.488585472106934 },
  { x: -2.7503252029418945, y: 11.301166534423828, z: 0 },
  { x: 9.731266021728516, y: 0, z: 0 },
  { x: 0.0013549915747717023, y: 0, z: 6.774919033050537 },
  { x: 0.0013549915747717023, y: 0, z: 12.488585472106934 },
  { x: 1.4641493558883667, y: 4.708649635314941, z: 12.488585472106934 },
  { x: -2.7503252029418945, y: 11.30109691619873, z: 12.488585472106934 },
  { x: 4.865618705749512, y: 5.650583267211914, z: 6.774990081787109 },
  { x: 4.865618705749512, y: 5.650583267211914, z: 12.488585472106934 },
  { x: 0.0013549915747717023, y: 11.299544334411621, z: 6.774990081787109 },
  { x: 1.4641493558883667, y: 4.708649635314941, z: 10.354353904724121 },
  { x: 1.464188575744629, y: 4.708702564239502, z: 12.488585472106934 },
  { x: 1.5750285387039185, y: 4.858152866363525, z: 12.488585472106934 },
  { x: 1.7503741979599, y: 5.186268329620361, z: 12.488585472106934 },
  { x: 1.6707738637924194, y: 5.017918109893799, z: 12.488585472106934 },
  { x: 1.7503020763397217, y: 5.186066627502441, z: 12.488585472106934 },
  { x: 1.7503020763397217, y: 5.186066627502441, z: 10.354353904724121 },
  { x: 1.6707199811935425, y: 5.017804145812988, z: 12.488585472106934 },
  { x: 9.73126220703125, y: 11.294015884399414, z: -4.820501686708667e-8 },
  { x: 0.001354515552520752, y: 11.299520492553711, z: 12.488585472106934 },
];

const faces = [
  [0, 1, 2], [0, 3, 4], [0, 2, 3], [0, 4, 1], [4, 5, 1],
  [1, 6, 7], [4, 8, 5], [1, 5, 9], [4, 10, 8], [1, 9, 6],
  [6, 11, 12], [12, 11, 13], [6, 13, 11], [6, 12, 14],
  [12, 13, 14], [15, 16, 17], [15, 17, 14], [16, 14, 17],
  [15, 13, 18], [15, 14, 13], [18, 16, 15], [5, 8, 9],
  [6, 9, 13], [18, 13, 9], [18, 9, 16], [16, 9, 14],
  [4, 19, 10], [2, 10, 19], [1, 7, 2], [6, 14, 7],
  [7, 10, 2], [7, 20, 10], [7, 14, 9], [20, 9, 8],
  [20, 8, 10], [7, 9, 20], [4, 3, 19], [2, 19, 3],
];

function faceNormal(face) {
  const [first, second, third] = face.map((index) => vertices[index]);
  return new THREE.Vector3(
    second.x - first.x,
    second.y - first.y,
    second.z - first.z,
  ).cross(new THREE.Vector3(
    third.x - first.x,
    third.y - first.y,
    third.z - first.z,
  )).normalize();
}

const residualCurvedFaces = new Set([10, 11, 12, 15, 16, 17]);
const faceVertexNormals = faces.map((face, faceIndex) => {
  const flatNormal = faceNormal(face);
  return face.map((vertexIndex) => {
    if (!residualCurvedFaces.has(faceIndex)) {
      return {
        x: flatNormal.x,
        y: flatNormal.y,
        z: flatNormal.z,
      };
    }
    const point = vertices[vertexIndex];
    const radial = new THREE.Vector3(
      point.x + 0.0020163870930289818,
      point.y - 5.911900567041782,
      0,
    ).normalize();
    if (radial.dot(flatNormal) < 0) radial.multiplyScalar(-1);
    return { x: radial.x, y: radial.y, z: radial.z };
  });
});

const residueSolid = solidWithDerivedSurfaceTopology(createSolid3d({
  vertices,
  faces,
  edges: [],
  metadata: {
    booleanKernel: 'manifold-3d',
    booleanOperation: 'union',
    faceVertexNormals,
    profileFeatures: [{
      type: 'union',
      distance: 3.6177080318685757,
      exactProfile: {
        type: 'exact-profile',
        version: 1,
        closed: true,
        plane: {
          type: 'plane',
          origin: { x: 0, y: 0, z: 13.54991626739502 },
          xAxis: { x: 1, y: 0, z: 0 },
          yAxis: { x: 0, y: 1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
          coordinateSystem: 'sketch-plane-v1',
        },
        outerLoop: {
          type: 'exact-profile-loop',
          role: 'outer',
          closed: true,
          segments: [{
            type: 'circle',
            center: {
              x: -0.0020163870930289818,
              y: 5.911900567041782,
              z: 0,
            },
            radius: 1.896727851872914,
            clockwise: false,
          }],
        },
        innerLoops: [],
      },
    }],
  },
}));
assert.equal(auditSolid3dTopology(residueSolid).valid, true);
assert.equal(residueSolid.metadata.curvedSideFaceIndices.length, 6);

const rebuiltResidueSolid = rebuildSolidCadTopology(residueSolid, {
  toleranceFactor: 1,
});
assert.ok(rebuiltResidueSolid);
assert.equal(rebuiltResidueSolid.vertices.length, 16);
assert.equal(rebuiltResidueSolid.faces.length, 28);
assert.equal(rebuiltResidueSolid.metadata.curvedSideFaceIndices.length, 0);
const rebuiltResidueAudit = auditSolidCadTopology(rebuiltResidueSolid);
assert.equal(rebuiltResidueAudit.valid, true);
assert.equal(rebuiltResidueAudit.closed, true);
assert.equal(rebuiltResidueAudit.stats.internalTriangulationEdgeCount, 0);
assert.equal(rebuiltResidueAudit.stats.missingCadBoundaryCount, 0);

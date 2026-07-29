/* webCAD - Regresiones de reconciliacion posterior a booleanas | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import fs from 'node:fs';

import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
  solidWithDerivedSurfaceTopology,
} from '../source/3d/three/manifold-boolean.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import {
  movedSolidFacePush,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import {
  meetsMinimum3dThickness,
  MINIMUM_3D_THICKNESS,
} from '../source/3d/tolerances.js';

const noiseProjectUrl = new URL(
  './fixtures/3d/boolean-edge-noise.webcad',
  import.meta.url,
);
assert.equal(
  fs.existsSync(noiseProjectUrl),
  true,
  'El archivo real de ruido booleano debe estar disponible',
);
const noiseProject = JSON.parse(fs.readFileSync(noiseProjectUrl, 'utf8'));
const noiseRecord = noiseProject.model3d.solids[0];
const noiseSolid = noiseRecord.solid;
const firstNumericallyNullOperationIndex = noiseRecord.operations.findIndex((operation) =>
  operation.type === 'pushMoveFace' &&
  Math.abs(Number(operation.distance)) < 1e-5);
assert.equal(
  firstNumericallyNullOperationIndex,
  7,
  'La octava operacion es el primer Push practicamente nulo del archivo real',
);
const firstNumericallyNullOperation =
  noiseRecord.operations[firstNumericallyNullOperationIndex];
assert.equal(firstNumericallyNullOperation.distance, -3.100861603044791e-7);
const noiseFaceIndices = firstNumericallyNullOperation.sourceSolidFaceIndices;
const noiseFaceIndex = firstNumericallyNullOperation.sourceSolidFaceIndex;
const noiseFace = {
  sourceSolid: noiseSolid,
  sourceSolidFaceIndex: noiseFaceIndex,
  sourceSolidFaceIndices: noiseFaceIndices,
  points: noiseSolid.faces[noiseFaceIndex].map((vertexIndex) =>
    noiseSolid.vertices[vertexIndex]),
  normal: firstNumericallyNullOperation.normal ?? {
    x: -1.490879151090911e-8,
    y: 0.6433443591565647,
    z: 0.7655769298649412,
  },
};
assert.equal(
  movedSolidFacePush(noiseFace, firstNumericallyNullOperation.distance),
  null,
  'El Push nulo del archivo real debe detenerse antes de Manifold',
);

const minimumThicknessFace = {
  id: 'minimum-thickness-profile',
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 10, y: 0, z: 0 },
    { x: 10, y: 10, z: 0 },
    { x: 0, y: 10, z: 0 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
};
assert.equal(MINIMUM_3D_THICKNESS, 0.1);
assert.equal(meetsMinimum3dThickness(0.099), false);
assert.equal(meetsMinimum3dThickness(0.1), true);
assert.equal(meetsMinimum3dThickness(0.101), true);
assert.equal(
  solidFromFacePush(minimumThicknessFace, 0.099),
  null,
  'Un espesor funcional de 0.099 debe rechazarse',
);
const minimumWall = solidFromFacePush(minimumThicknessFace, 0.1);
const aboveMinimumWall = solidFromFacePush(minimumThicknessFace, 0.101);
assert.ok(minimumWall, 'Un espesor funcional de 0.1 debe aceptarse');
assert.ok(aboveMinimumWall, 'Un espesor funcional de 0.101 debe aceptarse');

await initializeManifoldBoolean();
const featureSupport = solidFromFacePush(minimumThicknessFace, 2);
const minimumFeatureFace = {
  id: 'minimum-feature-profile',
  points: [
    { x: 2, y: 2, z: 2 },
    { x: 4, y: 2, z: 2 },
    { x: 4, y: 4, z: 2 },
    { x: 2, y: 4, z: 2 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  supportSolid: featureSupport,
  supportLoops: {
    outer: minimumThicknessFace.points.map((point) => ({
      ...point,
      z: 2,
    })),
    holes: [],
  },
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
};
assert.equal(profileFeaturePushSolid(minimumFeatureFace, 0.099), null);
assert.ok(profileFeaturePushSolid(minimumFeatureFace, 0.1));
assert.ok(profileFeaturePushSolid(minimumFeatureFace, 0.101));

const minimumWallAudit = auditSolidCadTopology(minimumWall);
assert.equal(minimumWallAudit.valid, true);
assert.equal(minimumWallAudit.closed, true);
assert.equal(minimumWallAudit.stats.openCadLoopCount, 0);
assert.equal(minimumWallAudit.stats.missingCadBoundaryCount, 0);
assert.equal(minimumWallAudit.stats.orphanCadEdgeCount, 0);
assert.equal(minimumWallAudit.stats.internalTriangulationEdgeCount, 0);

assert.equal(
  solidFromFacePush(minimumThicknessFace, -0.099),
  null,
  'El limite minimo se aplica con independencia del sentido',
);

const wedgeAtMinimum = solidFromFacePush({
  ...minimumThicknessFace,
  id: 'intentional-wedge',
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 10, y: 0, z: 0 },
    { x: 0, y: 5, z: 0 },
  ],
  cadProfileVertexIndices: [0, 1, 2],
}, 0.1);
assert.ok(wedgeAtMinimum, 'Una cuña intencionada con espesor permitido se conserva');
assert.equal(auditSolidCadTopology(wedgeAtMinimum).valid, true);

const incompleteCadBoundary = structuredClone(minimumWall);
incompleteCadBoundary.edges = incompleteCadBoundary.edges.slice(1);
incompleteCadBoundary.metadata = {
  ...incompleteCadBoundary.metadata,
  booleanKernel: 'manifold-3d',
  booleanOperation: 'union',
};
const recoveredCadBoundary =
  solidWithDerivedSurfaceTopology(incompleteCadBoundary);
const recoveredCadAudit = auditSolidCadTopology(recoveredCadBoundary);
assert.equal(
  recoveredCadAudit.valid,
  true,
  'La reconciliacion debe recuperar una arista de perimetro ausente',
);
assert.equal(recoveredCadAudit.stats.missingCadBoundaryCount, 0);
assert.equal(recoveredCadAudit.stats.internalTriangulationEdgeCount, 0);

const movableWall = solidFromFacePush(minimumThicknessFace, 0.2);
const movableWallTopFace = {
  sourceSolid: movableWall,
  sourceSolidFaceIndex: 1,
  sourceSolidFaceIndices: [1],
  points: movableWall.faces[1].map((vertexIndex) =>
    movableWall.vertices[vertexIndex]),
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
};
assert.equal(
  movedSolidFacePush(movableWallTopFace, -0.101),
  null,
  'Reducir una pared de 0.2 hasta 0.099 debe rechazarse',
);
assert.ok(
  movedSolidFacePush(movableWallTopFace, -0.1),
  'Reducir una pared de 0.2 hasta 0.1 debe aceptarse',
);
assert.ok(
  movedSolidFacePush(movableWallTopFace, -0.099),
  'Reducir una pared de 0.2 hasta 0.101 debe aceptarse',
);
assert.ok(
  movedSolidFacePush(movableWallTopFace, 0.001),
  'Un movimiento pequeño que engrosa material valido debe conservarse',
);

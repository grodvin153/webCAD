/* webCAD - Regresiones de la herramienta Unir sólidos | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';

import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import {
  exactProfileFromCircle,
  exactProfileFromPolyline,
  sampleExactProfile,
} from '../source/3d/exact-profile.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
  splitSolidByPlane3d,
} from '../source/3d/three/manifold-boolean.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import { solidFromFacePush } from '../source/3d/three/push-geometry.js';
import {
  consolidateSolidRecords,
  publishSolidUnion,
} from '../source/3d/three/solid-union.js';

function createTestDocument() {
  const CadDocument = createCadDocumentClass({
    HISTORY_LIMIT: 20,
    SPATIAL_CELL_SIZE: 100,
    SPATIAL_MAX_ENTITY_CELLS: 64,
    SPATIAL_MAX_QUERY_CELLS: 4096,
    boundsIntersectsBounds: () => false,
    cloneEntity: () => null,
    mergeBounds: () => null,
    rotateEntityByAngle: () => null,
  });
  return new CadDocument();
}

function placement(x = 0, y = 0, z = 0, angle = 0) {
  return {
    position: { x, y, z },
    quaternion: {
      x: 0,
      y: 0,
      z: Math.sin(angle * 0.5),
      w: Math.cos(angle * 0.5),
    },
  };
}

function exactBox(width = 1, depth = 1, height = 1, id = 'union-box') {
  const vertices = [
    { x: 0, y: 0, z: 0 },
    { x: width, y: 0, z: 0 },
    { x: width, y: depth, z: 0 },
    { x: 0, y: depth, z: 0 },
  ];
  return solidFromFacePush({
    id,
    points: vertices.map((point) => ({ ...point, y: -point.y })),
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    sourceEntity: { id, type: 'POLYLINE', closed: true, vertices },
  }, height);
}

function exactCylinder(radius = 0.3, height = 1) {
  const exactProfile = exactProfileFromCircle({
    id: 'union-circle',
    type: 'CIRCLE',
    center: { x: 0.5, y: 0.5, z: 0 },
    radius,
  });
  const points = sampleExactProfile(exactProfile, { segments: 64 })
    .map((point) => ({ ...point, y: -point.y }));
  return solidFromFacePush({
    id: 'union-cylinder',
    points,
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    exactProfile,
    smoothProfileVertexIndices: points.map((_, index) => index),
  }, height);
}

function exactArcSolid(height = 1) {
  const exactProfile = exactProfileFromPolyline({
    type: 'POLYLINE',
    id: 'union-arc-profile',
    closed: true,
    vertices: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ],
    segments: [
      { type: 'LINE' },
      { type: 'ARC', center: { x: 1, y: 1 }, clockwise: true },
      { type: 'LINE' },
    ],
  });
  const points = sampleExactProfile(exactProfile, { segments: 48 })
    .map((point) => ({ ...point, y: -point.y }));
  return solidFromFacePush({
    id: 'union-arc-solid',
    points,
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    exactProfile,
    smoothProfileVertexIndices: points.map((_, index) => index),
  }, height);
}

function volume(solid) {
  return Math.abs(solid.faces.reduce((total, face) => {
    const first = solid.vertices[face[0]];
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = solid.vertices[face[index]];
      const third = solid.vertices[face[index + 1]];
      total += (
        first.x * (second.y * third.z - second.z * third.y) -
        first.y * (second.x * third.z - second.z * third.x) +
        first.z * (second.x * third.y - second.y * third.x)
      ) / 6;
    }
    return total;
  }, 0));
}

function record(id, solid, solidPlacement = placement()) {
  return {
    id,
    name: id,
    visible: true,
    locked: false,
    placement: solidPlacement,
    solid,
  };
}

await initializeManifoldBoolean();

const overlap = consolidateSolidRecords([
  record('overlap-a', exactBox()),
  record('overlap-b', exactBox(), placement(0.5, 0, 0)),
]);
assert.equal(overlap.ok, true);
assert.equal(overlap.groups.length, 1);
assert.ok(Math.abs(volume(overlap.groups[0].solid) - 1.5) < 1e-7);
assert.deepEqual(auditSolidCadTopology(overlap.groups[0].solid).errors, []);

const faceContact = consolidateSolidRecords([
  record('face-a', exactBox()),
  record('face-b', exactBox(), placement(1, 0, 0)),
]);
assert.equal(faceContact.groups.length, 1);
assert.equal(faceContact.groups[0].solid.metadata.planarFaceGroups.length, 6);
assert.equal(deriveSolidAnalyticEdges(faceContact.groups[0].solid).lines.length, 12);

const rotatedContact = consolidateSolidRecords([
  record('rotated-a', exactBox(), placement(3, 4, 0, Math.PI / 2)),
  record('rotated-b', exactBox(), placement(3, 5, 0, Math.PI / 2)),
]);
assert.equal(rotatedContact.groups.length, 1, 'Los placements girados deben respetarse');
assert.ok(Math.abs(volume(rotatedContact.groups[0].solid) - 2) < 1e-7);

for (const [label, toolPlacement] of [
  ['arista', placement(1, -1, 0)],
  ['vértice', placement(1, -1, 1)],
  ['vacío', placement(3, 0, 0)],
]) {
  const result = consolidateSolidRecords([
    record(`${label}-a`, exactBox()),
    record(`${label}-b`, exactBox(), toolPlacement),
  ]);
  assert.equal(result.ok, true);
  assert.equal(result.groups.length, 2, `El contacto por ${label} no debe unir`);
}

const partial = consolidateSolidRecords([
  record('component-a', exactBox()),
  record('component-b', exactBox(), placement(1, 0, 0)),
  record('component-separated', exactBox(), placement(5, 0, 0)),
]);
assert.equal(partial.groups.length, 2);
assert.deepEqual(partial.groups.map((group) => group.ids.length).sort(), [1, 2]);

const cutSource = exactBox(2, 1, 1, 'cut-source');
const cut = splitSolidByPlane3d(cutSource, [
  { x: 1, y: 0, z: 0 },
  { x: 1, y: -1, z: 0 },
  { x: 1, y: 0, z: 1 },
]);
assert.equal(cut.ok, true);
assert.equal(cut.parts.length, 2);
const cutUnion = consolidateSolidRecords(cut.parts.map((part, index) =>
  record(`cut-part-${index}`, part.solid)));
assert.equal(cutUnion.ok, true);
assert.equal(cutUnion.groups.length, 1, 'Las piezas complementarias del corte deben reunirse');
assert.ok(Math.abs(volume(cutUnion.groups[0].solid) - 2) < 1e-7);

const circleUnion = consolidateSolidRecords([
  record('circle-a', exactCylinder()),
  record('circle-b', exactCylinder(), placement(0, 0, 1)),
]);
assert.equal(circleUnion.groups.length, 1);
assert.ok(deriveSolidAnalyticEdges(circleUnion.groups[0].solid).curves.some((curve) =>
  curve.type === 'arc-circle' && curve.closed));

const arcUnion = consolidateSolidRecords([
  record('arc-a', exactArcSolid()),
  record('arc-b', exactArcSolid(), placement(0, 0, 1)),
]);
assert.equal(arcUnion.groups.length, 1);
assert.ok(deriveSolidAnalyticEdges(arcUnion.groups[0].solid).curves.some((curve) =>
  curve.type === 'arc-circle' && !curve.closed));

const document = createTestDocument();
const first = document.add3dSolid(cut.parts[0].solid, {
  id: 'solid3d-cut-a',
  recordHistory: false,
});
const second = document.add3dSolid(cut.parts[1].solid, {
  id: 'solid3d-cut-b',
  recordHistory: false,
});
const published = publishSolidUnion({
  doc: document,
  solidIds: [first.id, second.id],
});
assert.equal(published.ok, true);
assert.equal(document.model3d.solids.length, 1);
assert.equal(document.model3d.solids[0].id, first.id);
assert.equal(document.undo(), true);
assert.equal(document.model3d.solids.length, 2);
assert.equal(document.redo(), true);
assert.equal(document.model3d.solids.length, 1);

const compact = serializeModel3d(document.model3d);
assert.equal('solid' in compact.solids[0], false);
assert.equal(compact.solids[0].authority.operations.at(-1).type, 'unionSolid');
const reopened = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(compact)),
));
assert.equal(reopened.solids.length, 1);
assert.ok(Math.abs(volume(reopened.solids[0].solid) - 2) < 1e-6);
assert.deepEqual(auditSolidCadTopology(reopened.solids[0].solid).errors, []);

const separatedDocument = createTestDocument();
const separatedA = separatedDocument.add3dSolid(exactBox(), {
  placement: placement(),
  recordHistory: false,
});
const separatedB = separatedDocument.add3dSolid(exactBox(), {
  placement: placement(4, 0, 0),
  recordHistory: false,
});
const separatedSnapshot = JSON.stringify(serializeModel3d(separatedDocument.model3d));
const rejected = publishSolidUnion({
  doc: separatedDocument,
  solidIds: [separatedA.id, separatedB.id],
});
assert.equal(rejected.ok, false);
assert.equal(rejected.reason, 'no-material-connection');
assert.equal(JSON.stringify(serializeModel3d(separatedDocument.model3d)), separatedSnapshot);

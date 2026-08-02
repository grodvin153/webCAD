/* webCAD - Regresiones de la herramienta Restar sólidos | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import * as THREE from 'three';

import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import {
  sketchEditReferences,
  snapshotSketchSupportFace,
} from '../source/3d/sketch-reference.js';
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
} from '../source/3d/three/manifold-boolean.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import { solidFromFacePush } from '../source/3d/three/push-geometry.js';
import { solidObjectSnapCandidates } from '../source/3d/three/solid-object-snaps.js';
import {
  publishSolidSubtraction,
  subtractSolidRecords,
} from '../source/3d/three/solid-subtraction.js';

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

function exactBox(width = 1, depth = 1, height = 1, id = 'subtract-box') {
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

function exactCylinder(radius = 0.3, height = 2) {
  const exactProfile = exactProfileFromCircle({
    id: 'subtract-circle',
    type: 'CIRCLE',
    center: { x: 0.5, y: 0.5, z: 0 },
    radius,
  });
  const points = sampleExactProfile(exactProfile, { segments: 64 })
    .map((point) => ({ ...point, y: -point.y }));
  return solidFromFacePush({
    id: 'subtract-cylinder',
    points,
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    exactProfile,
    smoothProfileVertexIndices: points.map((_, index) => index),
  }, height);
}

function exactArcSolid(height = 2) {
  const exactProfile = exactProfileFromPolyline({
    type: 'POLYLINE',
    id: 'subtract-arc-profile',
    closed: true,
    vertices: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    segments: [
      { type: 'LINE' },
      { type: 'ARC', center: { x: 0.5, y: 0.5 }, clockwise: true },
      { type: 'LINE' },
    ],
  });
  const points = sampleExactProfile(exactProfile, { segments: 48 })
    .map((point) => ({ ...point, y: -point.y }));
  return solidFromFacePush({
    id: 'subtract-arc-solid',
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

const simple = subtractSolidRecords(
  record('simple-target', exactBox(2, 1, 1)),
  [record('simple-cutter', exactBox(), placement(0.5, 0, 0))],
);
assert.equal(simple.ok, true);
assert.equal(simple.components.length, 2);
assert.ok(Math.abs(simple.components.reduce((sum, part) =>
  sum + volume(part.solid), 0) - 1) < 1e-7);
simple.components.forEach(({ solid }) => {
  assert.deepEqual(auditSolidCadTopology(solid).errors, []);
});

const multipleCutters = subtractSolidRecords(
  record('multiple-target', exactBox(4, 1, 1)),
  [
    record('multiple-cutter-a', exactBox(), placement(0.5, 0, 0)),
    record('multiple-cutter-b', exactBox(), placement(2.5, 0, 0)),
  ],
);
assert.equal(multipleCutters.ok, true);
assert.equal(multipleCutters.components.length, 3);
assert.ok(Math.abs(multipleCutters.components.reduce((sum, part) =>
  sum + volume(part.solid), 0) - 2) < 1e-7);

const rotated = subtractSolidRecords(
  record('rotated-target', exactBox(2, 1, 1), placement(4, 3, 0, Math.PI / 2)),
  [record('rotated-cutter', exactBox(), placement(4, 3.5, 0, Math.PI / 2))],
);
assert.equal(rotated.ok, true, 'La resta debe respetar placements movidos y girados');
assert.ok(Math.abs(rotated.components.reduce((sum, part) =>
  sum + volume(part.solid), 0) - 1) < 1e-7);

for (const [label, cutterPlacement, reason] of [
  ['separado', placement(3, 0, 0), 'no-intersection'],
  ['cara tangente', placement(1, 0, 0), 'tangent-contact'],
  ['arista tangente', placement(1, -1, 0), 'tangent-contact'],
  ['vértice tangente', placement(1, -1, 1), 'tangent-contact'],
]) {
  const result = subtractSolidRecords(
    record(`${label}-target`, exactBox()),
    [record(`${label}-cutter`, exactBox(), cutterPlacement)],
  );
  assert.equal(result.ok, false);
  assert.equal(result.reason, reason, `Debe distinguir el caso ${label}`);
}

const empty = subtractSolidRecords(
  record('empty-target', exactBox()),
  [record('empty-cutter', exactBox())],
);
assert.equal(empty.ok, true);
assert.equal(empty.empty, true);
assert.equal(empty.components.length, 0);

const thinResidual = subtractSolidRecords(
  record('thin-target', exactBox()),
  [record('thin-cutter', exactBox(0.95, 1, 1), placement(0.05, 0, 0))],
);
assert.equal(thinResidual.ok, false);
assert.equal(thinResidual.reason, 'minimum-thickness');

const circleCut = subtractSolidRecords(
  record('circle-target', exactBox(2, 2, 1)),
  [record('circle-cutter', exactCylinder(), placement(0.5, -0.5, -0.5))],
);
assert.equal(circleCut.ok, true);
assert.equal(circleCut.components.length, 1);
assert.ok(deriveSolidAnalyticEdges(circleCut.components[0].solid).curves.some((curve) =>
  curve.type === 'arc-circle' && curve.closed));

const arcCut = subtractSolidRecords(
  record('arc-target', exactBox(2, 2, 1)),
  [record('arc-cutter', exactArcSolid(), placement(0.5, -0.5, -0.5))],
);
assert.equal(arcCut.ok, true);
const arcCutSolid = arcCut.components[0].solid;
assert.ok(deriveSolidAnalyticEdges(arcCutSolid).curves.some((curve) =>
  curve.type === 'arc-circle' && !curve.closed));
const arcSupportFace = [...arcCutSolid.metadata.planarFaceGroups]
  .filter((group) => Number(group?.normal?.z) > 0.9)
  .sort((first, second) =>
    (second.outerLoop?.length ?? 0) - (first.outerLoop?.length ?? 0))[0];
assert.ok(arcSupportFace);
const arcSupportPlane = {
  type: 'fixed',
  origin: { ...arcSupportFace.outerLoop[0] },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 1, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
};
const arcSupportModel = {
  solids: [record('arc-result', arcCutSolid)],
};
const arcSupport = snapshotSketchSupportFace({
  sourceSolidDocumentId: 'arc-result',
  sourceSolidFaceIndices: arcSupportFace.indices,
  points: arcSupportFace.outerLoop,
  holes: arcSupportFace.innerLoops,
}, arcSupportPlane, arcSupportModel);
const arcSupportReferences = sketchEditReferences(
  arcSupportModel,
  arcSupportPlane,
  {
    mode: 'section',
    sketch: {
      id: 'arc-result-sketch',
      metadata: { supportFace: arcSupport },
      plane: arcSupportPlane,
    },
  },
);
assert.equal(arcSupportReferences.filter((reference) =>
  reference.type === 'arc').length, 1);
assert.ok(arcSupportReferences.length <
  arcSupportFace.outerLoop.length +
  arcSupportFace.innerLoops.reduce((sum, loop) => sum + loop.length, 0));
const arcSnapRoot = new THREE.Group();
const arcSnapObject = new THREE.Object3D();
arcSnapObject.userData.solid = arcCutSolid;
arcSnapObject.userData.documentSolidId = 'arc-result';
arcSnapRoot.add(arcSnapObject);
assert.ok(solidObjectSnapCandidates([arcSnapRoot], {
  includeWorldOrigin: false,
}).some((snap) =>
  snap.analyticCurve?.type === 'arc-circle' &&
  snap.analyticCurve.closed === false));

const arcDocument = createTestDocument();
const arcDocumentTarget = arcDocument.add3dSolid(exactBox(2, 2, 1), {
  id: 'solid3d-arc-target',
  recordHistory: false,
});
const arcDocumentCutter = arcDocument.add3dSolid(exactArcSolid(), {
  id: 'solid3d-arc-cutter',
  placement: placement(0.5, -0.5, -0.5),
  recordHistory: false,
});
const publishedArc = publishSolidSubtraction({
  cutterIds: [arcDocumentCutter.id],
  doc: arcDocument,
  targetId: arcDocumentTarget.id,
});
assert.equal(publishedArc.ok, true);
const compactArc = serializeModel3d(arcDocument.model3d);
assert.equal(compactArc.solids.every((item) => !('solid' in item)), true);
const reopenedArc = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(compactArc)),
));
assert.ok(deriveSolidAnalyticEdges(reopenedArc.solids[0].solid).curves.some((curve) =>
  curve.type === 'arc-circle' && !curve.closed));

const document = createTestDocument();
const documentTarget = document.add3dSolid(exactBox(3, 1, 1), {
  id: 'solid3d-subtract-target',
  recordHistory: false,
});
const documentCutter = document.add3dSolid(exactBox(), {
  id: 'solid3d-subtract-cutter',
  placement: placement(1, 0, 0),
  recordHistory: false,
});
const published = publishSolidSubtraction({
  cutterIds: [documentCutter.id],
  doc: document,
  targetId: documentTarget.id,
});
assert.equal(published.ok, true);
assert.equal(document.model3d.solids.length, 2);
assert.equal(document.model3d.solids.some((item) => item.id === documentCutter.id), false);
assert.equal(document.undo(), true);
assert.equal(document.model3d.solids.length, 2);
assert.equal(document.model3d.solids.some((item) => item.id === documentCutter.id), true);
assert.equal(document.redo(), true);
assert.equal(document.model3d.solids.length, 2);
assert.equal(document.model3d.solids.some((item) => item.id === documentCutter.id), false);

const compact = serializeModel3d(document.model3d);
assert.equal(compact.solids.every((item) => !('solid' in item)), true);
assert.equal(compact.solids.every((item) =>
  item.authority.operations.at(-1).type === 'subtractSolid'), true);
const reopened = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(compact)),
));
assert.equal(reopened.solids.length, 2);
assert.ok(Math.abs(reopened.solids.reduce((sum, item) =>
  sum + volume(item.solid), 0) - 2) < 1e-6);
reopened.solids.forEach((item) => {
  assert.deepEqual(auditSolidCadTopology(item.solid).errors, []);
});

const unchangedDocument = createTestDocument();
const unchangedTarget = unchangedDocument.add3dSolid(exactBox(), {
  recordHistory: false,
});
const unchangedCutter = unchangedDocument.add3dSolid(exactBox(), {
  placement: placement(3, 0, 0),
  recordHistory: false,
});
const unchangedSnapshot = JSON.stringify(serializeModel3d(unchangedDocument.model3d));
const rejected = publishSolidSubtraction({
  cutterIds: [unchangedCutter.id],
  doc: unchangedDocument,
  targetId: unchangedTarget.id,
});
assert.equal(rejected.ok, false);
assert.equal(rejected.reason, 'no-intersection');
assert.equal(JSON.stringify(serializeModel3d(unchangedDocument.model3d)), unchangedSnapshot);

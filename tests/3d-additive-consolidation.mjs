/* webCAD - Regresiones de consolidacion de extrusiones aditivas | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';

import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import { createModel3d } from '../source/3d/model3d.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import { exactProfileFromCircle } from '../source/3d/exact-profile.js';
import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
} from '../source/3d/three/manifold-boolean.js';
import {
  consolidateAdditiveExtrusion,
  publishAdditiveExtrusion,
} from '../source/3d/three/additive-solid-consolidation.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import { solidFromFacePush } from '../source/3d/three/push-geometry.js';

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

function placement(x = 0, y = 0, z = 0) {
  return {
    position: { x, y, z },
    quaternion: { x: 0, y: 0, z: 0, w: 1 },
  };
}

function exactBox(width = 1, depth = 1, height = 1, id = 'box') {
  const sourcePoints = [
    { x: 0, y: 0, z: 0 },
    { x: width, y: 0, z: 0 },
    { x: width, y: depth, z: 0 },
    { x: 0, y: depth, z: 0 },
  ];
  return solidFromFacePush({
    id,
    points: sourcePoints.map((point) => ({ ...point, y: -point.y })),
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    sourceEntity: {
      id,
      type: 'POLYLINE',
      closed: true,
      vertices: sourcePoints,
    },
  }, height);
}

function exactCylinder(radius = 0.3, height = 1) {
  const center = { x: 0.5, y: -0.5, z: 0 };
  const points = Array.from({ length: 64 }, (_, index) => {
    const angle = index * Math.PI * 2 / 64;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      z: 0,
    };
  });
  return solidFromFacePush({
    id: 'parametric-cylinder',
    points,
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    cadProfileVertexIndices: [],
    smoothProfileVertexIndices: points.map((_, index) => index),
    exactProfile: exactProfileFromCircle({
      id: 'parametric-circle',
      type: 'CIRCLE',
      center: { x: 0.5, y: 0.5, z: 0 },
      radius,
    }),
  }, height);
}

function meshVolume(solid) {
  return Math.abs(solid.faces.reduce((volume, face) => {
    const first = solid.vertices[face[0]];
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = solid.vertices[face[index]];
      const third = solid.vertices[face[index + 1]];
      volume += (
        first.x * (second.y * third.z - second.z * third.y) -
        first.y * (second.x * third.z - second.z * third.x) +
        first.z * (second.x * third.y - second.y * third.x)
      ) / 6;
    }
    return volume;
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

function consolidate(basePlacement, toolPlacement, tool = exactBox()) {
  return consolidateAdditiveExtrusion({
    records: [record('solid3d-base', exactBox(), basePlacement)],
    solid: tool,
    placement: toolPlacement,
  });
}

await initializeManifoldBoolean();

const faceContact = consolidate(placement(), placement(1, 0, 0));
assert.equal(faceContact.merged, true, 'El contacto por una cara debe fusionar el material');
assert.equal(faceContact.consumedSolidIds.length, 1);
assert.ok(Math.abs(meshVolume(faceContact.solid) - 2) < 1e-7);
assert.deepEqual(auditSolidCadTopology(faceContact.solid).errors, []);
assert.equal(faceContact.solid.metadata.planarFaceGroups.length, 6);
assert.equal(deriveSolidAnalyticEdges(faceContact.solid).lines.length, 12);

const overlap = consolidate(placement(), placement(0.5, 0, 0));
assert.equal(overlap.merged, true, 'El solape volumetrico debe fusionar el material');
assert.ok(Math.abs(meshVolume(overlap.solid) - 1.5) < 1e-7);
assert.deepEqual(auditSolidCadTopology(overlap.solid).errors, []);

const left = record('solid3d-left', exactBox(), placement());
const right = record('solid3d-right', exactBox(), placement(3, 0, 0));
const bridge = consolidateAdditiveExtrusion({
  records: [left, right],
  solid: exactBox(2, 1, 1, 'bridge'),
  placement: placement(1, 0, 0),
});
assert.equal(bridge.merged, true);
assert.deepEqual(bridge.consumedSolidIds, ['solid3d-left', 'solid3d-right']);
assert.ok(Math.abs(meshVolume(bridge.solid) - 4) < 1e-7);
assert.deepEqual(auditSolidCadTopology(bridge.solid).errors, []);
assert.equal(bridge.solid.metadata.planarFaceGroups.length, 6);
assert.equal(deriveSolidAnalyticEdges(bridge.solid).lines.length, 12);

const bridgeDocument = createTestDocument();
bridgeDocument.add3dSolid(exactBox(1, 1, 1, 'bridge-left'), {
  placement: placement(),
  recordHistory: false,
});
bridgeDocument.add3dSolid(exactBox(1, 1, 1, 'bridge-right'), {
  placement: placement(3, 0, 0),
  recordHistory: false,
});
const bridgePublication = publishAdditiveExtrusion({
  doc: bridgeDocument,
  operation: { type: 'pushFromProfile', distance: 1 },
  placement: placement(1, 0, 0),
  solid: exactBox(2, 1, 1, 'bridge-published'),
});
assert.equal(bridgePublication.merged, true);
assert.equal(bridgeDocument.model3d.solids.length, 1);
assert.equal(bridgeDocument.undo(), true);
assert.equal(bridgeDocument.model3d.solids.length, 2);
assert.equal(bridgeDocument.redo(), true);
assert.equal(bridgeDocument.model3d.solids.length, 1);
const reopenedBridge = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(bridgeDocument.model3d))),
));
assert.equal(reopenedBridge.solids.length, 1);
const reopenedBridgeVolume = meshVolume(reopenedBridge.solids[0].solid);
assert.ok(
  Math.abs(reopenedBridgeVolume - 4) < 1e-4,
  `El puente reabierto debe conservar volumen 4, no ${reopenedBridgeVolume}`,
);
assert.deepEqual(auditSolidCadTopology(reopenedBridge.solids[0].solid).errors, []);

const edgeContact = consolidate(placement(), placement(1, -1, 0));
assert.equal(edgeContact.merged, false, 'El contacto solo por arista no debe fusionar');
assert.equal(edgeContact.consumedSolidIds.length, 0);

const vertexContact = consolidate(placement(), placement(1, -1, 1));
assert.equal(vertexContact.merged, false, 'El contacto solo por vertice no debe fusionar');
assert.equal(vertexContact.consumedSolidIds.length, 0);

const separated = consolidate(placement(), placement(3, 0, 0));
assert.equal(separated.merged, false, 'Un hueco real debe mantener componentes separados');
assert.equal(separated.consumedSolidIds.length, 0);

const curveContact = consolidate(
  placement(),
  placement(0, 0, 1),
  exactCylinder(),
);
assert.equal(curveContact.merged, true);
assert.equal(
  curveContact.solid.metadata.profileFeatures[0]
    .exactProfile.outerLoop.segments[0].type,
  'circle',
  'La consolidacion debe conservar el circulo parametrico autoritativo',
);
const curveTopology = deriveSolidAnalyticEdges(curveContact.solid);
assert.ok(curveTopology.curves.some((curve) =>
  curve.type === 'arc-circle' && curve.closed === true));

const document = createTestDocument();
document.model3d = createModel3d();
document.add3dSolid(exactBox(), {
  id: 'solid3d-1',
  placement: placement(),
  recordHistory: false,
});
const publication = publishAdditiveExtrusion({
  doc: document,
  operation: {
    type: 'pushFromProfile',
    distance: 1,
    sourceKey: 'face:additive-test',
  },
  placement: placement(1, 0, 0),
  solid: exactBox(1, 1, 1, 'published-tool'),
});
assert.equal(publication.merged, true);
assert.equal(document.model3d.solids.length, 1);
assert.equal(document.model3d.solids[0].id, 'solid3d-1');
assert.equal(document.undo(), true);
assert.equal(document.model3d.solids.length, 1);
assert.ok(Math.abs(meshVolume(document.model3d.solids[0].solid) - 1) < 1e-7);
assert.equal(document.redo(), true);
assert.equal(document.model3d.solids.length, 1);
assert.ok(Math.abs(meshVolume(document.model3d.solids[0].solid) - 2) < 1e-7);

const reopened = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(document.model3d))),
));
assert.equal(reopened.solids.length, 1);
assert.ok(Math.abs(meshVolume(reopened.solids[0].solid) - 2) < 2e-5);
assert.deepEqual(auditSolidCadTopology(reopened.solids[0].solid).errors, []);

const separateDocument = createTestDocument();
separateDocument.add3dSolid(exactBox(), {
  placement: placement(),
  recordHistory: false,
});
publishAdditiveExtrusion({
  doc: separateDocument,
  placement: placement(3, 0, 0),
  solid: exactBox(1, 1, 1, 'separate-tool'),
});
assert.equal(separateDocument.model3d.solids.length, 2);

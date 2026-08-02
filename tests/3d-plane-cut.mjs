import assert from 'node:assert/strict';
import * as THREE from 'three';

import { extrudeClosedProfile } from '../source/3d/extrusion.js';
import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import { createSolid3d } from '../source/3d/solid.js';
import {
  sketchEditReferences,
  snapshotSketchSupportFace,
} from '../source/3d/sketch-reference.js';
import { sketchPlaneFromFace } from '../source/3d/sketch-plane.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import {
  rotateSolidPlacement,
  solidLocalToWorld,
  solidWorldToLocal,
  translateSolidPlacement,
} from '../source/3d/solid-placement.js';
import {
  auditSolidCadTopology,
  booleanSolid3d,
  initializeManifoldBoolean,
  planeFromThreePoints,
  splitSolidByPlane3d,
} from '../source/3d/three/manifold-boolean.js';
import {
  movedSolidFacePush,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import {
  createCutPlanePreview,
  createSolidPlaneCutCommand,
  cutPlanePartName,
} from '../source/3d/three/solid-plane-cut-command.js';

function box(x0, x1, y0, y1, height) {
  return extrudeClosedProfile([
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ], height);
}

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

function assertValidCutPart(part) {
  const audit = auditSolidCadTopology(part.solid);
  assert.equal(audit.valid, true);
  assert.equal(audit.closed, true);
  assert.ok(part.solid.edges.length > 0);
  assert.ok(part.solid.metadata.planarFaceGroups.some((group) =>
    Array.isArray(group.outerLoop) && group.outerLoop.length >= 3));
}

await initializeManifoldBoolean();

const source = box(0, 10, 0, 8, 6);
const horizontalPoints = [
  { x: 0, y: 0, z: 3 },
  { x: 10, y: 0, z: 3 },
  { x: 0, y: 8, z: 3 },
];
const horizontalCut = splitSolidByPlane3d(source, horizontalPoints);
assert.equal(horizontalCut.ok, true);
assert.equal(horizontalCut.parts.length, 2);
horizontalCut.parts.forEach(assertValidCutPart);
assert.ok(Math.abs(
  horizontalCut.parts.reduce((sum, part) => sum + part.volume, 0) - 480,
) < 1e-6);
horizontalCut.parts.forEach((part) => {
  const cutFace = part.solid.metadata.planarFaceGroups.find((group) =>
    group.outerLoop.every((point) => Math.abs(point.z - 3) < 1e-5));
  assert.ok(cutFace);
  assert.equal(cutFace.innerLoops.length, 0);
  assert.ok(cutFace.outerLoop.length >= 4);
});

const inclinedPoints = [
  { x: 0, y: 0, z: 1 },
  { x: 10, y: 0, z: 4 },
  { x: 0, y: 8, z: 2 },
];
const inclinedPlane = planeFromThreePoints(inclinedPoints);
const inclinedCut = splitSolidByPlane3d(source, inclinedPoints);
assert.equal(inclinedCut.ok, true);
assert.equal(inclinedCut.parts.length, 2);
inclinedCut.parts.forEach((part) => {
  assertValidCutPart(part);
  assert.ok(part.solid.metadata.planarFaceGroups.some((group) =>
    Math.abs(
      group.normal.x * inclinedPlane.normal.x +
      group.normal.y * inclinedPlane.normal.y +
      group.normal.z * inclinedPlane.normal.z,
    ) > 0.999));
});

const circlePointCount = 64;
const cylinderPoints = Array.from({ length: circlePointCount }, (_, index) => {
  const angle = index * Math.PI * 2 / circlePointCount;
  return { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5, z: 0 };
});
const cylinder = solidFromFacePush({
  id: 'plane-cut-cylinder',
  sourceEntity: {
    id: 'plane-cut-circle',
    type: 'CIRCLE',
    center: { x: 0, y: 0, z: 0 },
    radius: 5,
  },
  points: cylinderPoints,
  normal: { x: 0, y: 0, z: 1 },
}, 10);
const obliqueCylinderCut = splitSolidByPlane3d(cylinder, [
  { x: 0, y: 0, z: 5 },
  { x: 0, y: 5, z: 5 },
  { x: 5, y: 0, z: 6 },
]);
assert.equal(obliqueCylinderCut.ok, true);
obliqueCylinderCut.parts.forEach((part) => {
  const analyticEdges = deriveSolidAnalyticEdges(part.solid);
  const cutCurves = analyticEdges.curves.filter((curve) =>
    curve.analyticSource?.role === 'plane-cut-boundary');
  assert.equal(cutCurves.length, 1);
  assert.equal(cutCurves[0].type, 'arc-ellipse');
  assert.equal(cutCurves[0].closed, true);
  assert.equal(cutCurves[0].sourceEdgeIndices.length, circlePointCount);
  assert.equal(analyticEdges.lines.length, 0);
});
const partialCylinderCut = splitSolidByPlane3d(cylinder, [
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 5, z: 1 },
  { x: 5, y: 0, z: 3.5 },
]);
assert.equal(partialCylinderCut.ok, true);
partialCylinderCut.parts.forEach((part) => {
  const analyticEdges = deriveSolidAnalyticEdges(part.solid);
  const cutCurves = analyticEdges.curves.filter((curve) =>
    curve.analyticSource?.role === 'plane-cut-boundary');
  assert.equal(cutCurves.length, 1);
  assert.equal(cutCurves[0].type, 'arc-ellipse');
  assert.equal(cutCurves[0].closed, false);
  assert.ok(cutCurves[0].sourceEdgeIndices.length > 1);
  assert.ok(analyticEdges.lines.length <= 1);
});
const partialCutSupportSolid = partialCylinderCut.parts[0].solid;
const partialCutSupportFace = partialCutSupportSolid.metadata.planarFaceGroups.find((group) =>
  Math.abs(
    group.normal.x * partialCylinderCut.plane.normal.x +
    group.normal.y * partialCylinderCut.plane.normal.y +
    group.normal.z * partialCylinderCut.plane.normal.z,
  ) > 0.999);
assert.ok(partialCutSupportFace);
const partialCutSupportPlane = sketchPlaneFromFace({
  points: partialCutSupportFace.outerLoop,
  normal: partialCutSupportFace.normal,
});
const partialCutSupportModel = {
  solids: [{
    id: 'partial-plane-cut-result',
    solid: partialCutSupportSolid,
  }],
};
const partialCutSupport = snapshotSketchSupportFace({
  sourceSolidDocumentId: 'partial-plane-cut-result',
  sourceSolidFaceIndices: partialCutSupportFace.indices,
  points: partialCutSupportFace.outerLoop,
  holes: partialCutSupportFace.innerLoops,
}, partialCutSupportPlane, partialCutSupportModel);
const partialCutSupportReferences = sketchEditReferences(
  partialCutSupportModel,
  partialCutSupportPlane,
  {
    mode: 'section',
    sketch: {
      id: 'partial-plane-cut-sketch',
      metadata: { supportFace: partialCutSupport },
      plane: partialCutSupportPlane,
    },
  },
);
assert.deepEqual(
  partialCutSupportReferences.map((reference) => reference.type).sort(),
  ['ellipse-arc', 'line'],
);

const nearVertexCutSource = createSolid3d({
  vertices: [
    [0, 0, 0],
    [0, 0, 24.999887466430664],
    [0, 50, 49.9998893737793],
    [50, 0, 0],
    [24.999900817871094, 0.00022360679577104747, 25],
    [0, 50, 0],
    [50, 50, 0],
    [24.999900817871094, 50, 25],
    [50, 50, 25],
    [24.999900817871094, 50, 49.9998893737793],
    [50, 0, 25],
  ].map(([x, y, z]) => ({ x, y, z })),
  faces: [
    [0, 1, 2], [0, 3, 1], [3, 4, 1], [4, 2, 1], [0, 2, 5], [0, 5, 6],
    [5, 7, 8], [5, 2, 7], [7, 9, 4], [2, 4, 9], [7, 2, 9], [0, 6, 3],
    [10, 4, 3], [3, 6, 10], [10, 8, 4], [5, 8, 6], [10, 6, 8], [7, 4, 8],
  ],
  edges: [
    [0, 1], [1, 2], [0, 3], [4, 1], [2, 5], [5, 0], [5, 6], [7, 8],
    [7, 9], [9, 4], [4, 7], [9, 2], [6, 3], [10, 4], [3, 10], [10, 8], [8, 6],
  ],
  metadata: {
    planarFaceGroups: [
      [0, 4], [1, 2, 12], [3, 9], [5, 11],
      [6, 7, 10, 15], [8], [13, 16], [14, 17],
    ].map((indices) => ({ indices })),
  },
});
const nearVertexCutPoints = [
  { x: 25, y: 0, z: 24.999943733215332 },
  { x: 50, y: 50, z: 25 },
  { x: 50, y: 0, z: 0 },
];
const simplifiedNearVertexCut = splitSolidByPlane3d(
  nearVertexCutSource,
  nearVertexCutPoints,
);
assert.equal(simplifiedNearVertexCut.ok, true);
const simplifiedNearVertexPart = simplifiedNearVertexCut.parts.find((part) =>
  part.solid.vertices.length > 4);
assert.ok(simplifiedNearVertexPart);
assert.equal(simplifiedNearVertexPart.solid.vertices.length, 10);
assert.equal(simplifiedNearVertexPart.solid.faces.length, 16);
assert.equal(
  deriveSolidAnalyticEdges(simplifiedNearVertexPart.solid).lines.length,
  simplifiedNearVertexPart.solid.edges.length,
);
const simplifiedNearVertexFace = simplifiedNearVertexPart.solid.metadata.planarFaceGroups
  .find((group) => Math.abs(
    group.normal.x * simplifiedNearVertexCut.plane.normal.x +
    group.normal.y * simplifiedNearVertexCut.plane.normal.y +
    group.normal.z * simplifiedNearVertexCut.plane.normal.z,
  ) > 0.999);
assert.ok(simplifiedNearVertexFace);
assert.ok(movedSolidFacePush({
  sourceSolid: simplifiedNearVertexPart.solid,
  sourceSolidFaceIndex: simplifiedNearVertexFace.indices[0],
  sourceSolidFaceIndices: simplifiedNearVertexFace.indices,
  points: simplifiedNearVertexFace.outerLoop,
  holes: simplifiedNearVertexFace.innerLoops,
  normal: simplifiedNearVertexFace.normal,
}, -5));

const simplifiedInclinedFace = simplifiedNearVertexPart.solid.metadata.planarFaceGroups
  .find((group) => group.normal.y < -0.44 && group.normal.z > 0.89);
assert.ok(simplifiedInclinedFace);
const advancedInclinedSolid = movedSolidFacePush({
  sourceSolid: simplifiedNearVertexPart.solid,
  sourceSolidFaceIndex: simplifiedInclinedFace.indices[0],
  sourceSolidFaceIndices: simplifiedInclinedFace.indices,
  points: simplifiedInclinedFace.outerLoop,
  holes: simplifiedInclinedFace.innerLoops,
  normal: simplifiedInclinedFace.normal,
}, 1);
assert.ok(advancedInclinedSolid);
const advancedInclinedFace = advancedInclinedSolid.metadata.planarFaceGroups
  .find((group) => group.normal.y < -0.44 && group.normal.y > -0.45 &&
    group.normal.z > 0.89);
const replayDiagnostics = [];
assert.ok(movedSolidFacePush({
  sourceSolid: advancedInclinedSolid,
  sourceSolidFaceIndex: advancedInclinedFace.indices[0],
  sourceSolidFaceIndices: advancedInclinedFace.indices,
  points: advancedInclinedFace.outerLoop,
  holes: advancedInclinedFace.innerLoops,
  normal: advancedInclinedFace.normal,
}, -5, {
  onDiagnostic: (diagnostic) => replayDiagnostics.push(diagnostic),
}));
assert.equal(replayDiagnostics[0].reason, 'overlap-confirmed');
assert.equal(replayDiagnostics.at(-1).reason, 'success');

const legacyNearVertexCut = splitSolidByPlane3d(
  nearVertexCutSource,
  nearVertexCutPoints,
  { simplifyTolerance: 1e-9 },
);
const legacyNearVertexPart = legacyNearVertexCut.parts.find((part) =>
  part.solid.vertices.length > 4);
assert.equal(legacyNearVertexPart.solid.vertices.length, 11);
assert.equal(deriveSolidAnalyticEdges(legacyNearVertexPart.solid).lines.length, 17);
const legacyNearVertexFace = legacyNearVertexPart.solid.metadata.planarFaceGroups
  .find((group) => Math.abs(
    group.normal.x * legacyNearVertexCut.plane.normal.x +
    group.normal.y * legacyNearVertexCut.plane.normal.y +
    group.normal.z * legacyNearVertexCut.plane.normal.z,
  ) > 0.999);
assert.ok(movedSolidFacePush({
  sourceSolid: legacyNearVertexPart.solid,
  sourceSolidFaceIndex: legacyNearVertexFace.indices[0],
  sourceSolidFaceIndices: legacyNearVertexFace.indices,
  points: legacyNearVertexFace.outerLoop,
  holes: legacyNearVertexFace.innerLoops,
  normal: legacyNearVertexFace.normal,
}, -5));

const placed = rotateSolidPlacement(
  translateSolidPlacement(undefined, { x: 20, y: -7, z: 4 }),
  {
    axisStart: { x: 20, y: -7, z: 4 },
    axisEnd: { x: 20, y: -6, z: 5 },
    angleDegrees: 37,
  },
);
const worldCutPoints = horizontalPoints.map((point) =>
  solidLocalToWorld(point, placed));
const recoveredLocalPoints = worldCutPoints.map((point) =>
  solidWorldToLocal(point, placed));
const placedCut = splitSolidByPlane3d(source, recoveredLocalPoints);
assert.equal(placedCut.ok, true);
assert.equal(placedCut.parts.length, 2);

const leftTower = box(0, 2, 0, 2, 4);
const bridge = box(2, 6, 0, 2, 1);
const rightTower = box(6, 8, 0, 2, 4);
const connectedBase = booleanSolid3d(leftTower, bridge, { operationType: 'union' });
const connectedDumbbell = booleanSolid3d(connectedBase, rightTower, {
  operationType: 'union',
});
const componentCut = splitSolidByPlane3d(connectedDumbbell, [
  { x: 0, y: 0, z: 2 },
  { x: 8, y: 0, z: 2 },
  { x: 0, y: 2, z: 2 },
]);
assert.equal(componentCut.ok, true);
assert.equal(componentCut.parts.length, 3);
assert.deepEqual(
  componentCut.parts.map((part) => part.side),
  ['A', 'A', 'B'],
);
componentCut.parts.forEach(assertValidCutPart);

assert.deepEqual(
  splitSolidByPlane3d(source, [
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 2, z: 1 },
  ]),
  { ok: false, reason: 'collinear-points', parts: [] },
);
assert.equal(splitSolidByPlane3d(source, [
  { x: 0, y: 0, z: 7 },
  { x: 10, y: 0, z: 7 },
  { x: 0, y: 8, z: 7 },
]).reason, 'plane-does-not-cross-interior');
assert.equal(splitSolidByPlane3d(source, [
  { x: 0, y: 0, z: 6 },
  { x: 10, y: 0, z: 6 },
  { x: 0, y: 8, z: 6 },
]).reason, 'plane-does-not-cross-interior');

const cutDocument = createTestDocument();
const sourceRecord = cutDocument.add3dSolid(source, {
  name: 'Prisma',
  operation: { type: 'pushFromProfile', distance: 6 },
  placement: placed,
  recordHistory: false,
});
const replacementRecords = cutDocument.replace3dSolidWithParts(
  sourceRecord.id,
  horizontalCut.parts.map((part) => ({
    name: cutPlanePartName(sourceRecord.name, part.side, part.componentIndex),
    operation: {
      type: 'cutSolidByPlane',
      plane: horizontalCut.plane,
      side: part.side,
      component: part.componentIndex + 1,
    },
    placement: sourceRecord.placement,
    solid: part.solid,
  })),
);
assert.equal(replacementRecords.length, 2);
assert.equal(new Set(replacementRecords.map((record) => record.id)).size, 2);
assert.equal(replacementRecords[0].id, sourceRecord.id);
assert.deepEqual(replacementRecords.map((record) => record.name), [
  'Prisma — Corte A',
  'Prisma — Corte B',
]);
assert.equal(replacementRecords.every((record) =>
  record.operations.length === 2), true);
assert.equal(replacementRecords.every((record) =>
  JSON.stringify(record.placement) === JSON.stringify(placed)), true);
assert.equal(cutDocument.undoStack.length, 1);
assert.equal(cutDocument.undo(), true);
assert.equal(cutDocument.model3d.solids.length, 1);
assert.equal(cutDocument.model3d.solids[0].name, 'Prisma');
assert.equal(cutDocument.redo(), true);
assert.equal(cutDocument.model3d.solids.length, 2);

assert.doesNotThrow(() => JSON.stringify(
  obliqueCylinderCut.parts[0].solid.metadata.generatedAnalyticCurves,
));

const deletedId = cutDocument.model3d.solids[1].id;
assert.equal(cutDocument.remove3dSolid(deletedId), true);
assert.equal(cutDocument.model3d.solids.length, 1);
assert.equal(cutDocument.undo(), true);
assert.equal(cutDocument.model3d.solids.length, 2);

const pushSource = cutDocument.model3d.solids[0].solid;
const newCutFace = pushSource.metadata.planarFaceGroups.find((group) =>
  group.outerLoop.every((point) => Math.abs(point.z - 3) < 1e-5));
const pushedAfterCut = movedSolidFacePush({
  sourceSolid: pushSource,
  sourceSolidFaceIndex: newCutFace.indices[0],
  sourceSolidFaceIndices: newCutFace.indices,
  points: newCutFace.outerLoop,
  holes: newCutFace.innerLoops,
  normal: newCutFace.normal,
}, 0.5);
assert.ok(pushedAfterCut);
assertValidCutPart({ solid: pushedAfterCut });

assert.equal(cutPlanePartName('Nombre', 'A', 1), 'Nombre — Corte A — Parte 2');
const planePreview = createCutPlanePreview(horizontalPoints, 20);
assert.ok(planePreview);
assert.ok(planePreview.getObjectByName('webcad-solid-plane-cut-preview-fill'));
assert.equal(createCutPlanePreview([
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 1, z: 1 },
  { x: 2, y: 2, z: 2 },
], 20), null);

const canvasListeners = new Map();
const fakeCanvas = {
  addEventListener(type, listener) {
    canvasListeners.set(type, listener);
  },
  focus() {},
  getBoundingClientRect() {
    return { left: 0, top: 0, width: 800, height: 600 };
  },
  removeEventListener(type) {
    canvasListeners.delete(type);
  },
};
const cancelDocument = createTestDocument();
const cancelRecord = cancelDocument.add3dSolid(source, { recordHistory: false });
let cancelStatus = '';
const cancelScene = new THREE.Scene();
const cancelCommand = createSolidPlaneCutCommand({
  camera: new THREE.PerspectiveCamera(36, 4 / 3, 0.01, 1000),
  canvas: fakeCanvas,
  doc: cancelDocument,
  getSelectedSolidIds: () => [cancelRecord.id],
  getWorkplane: () => ({
    origin: { x: 0, y: 0, z: 0 },
    normal: { x: 0, y: 0, z: 1 },
  }),
  onStatus: (message) => { cancelStatus = message; },
  scene: cancelScene,
});
assert.equal(cancelCommand.start(), true);
assert.equal(cancelCommand.isActive(), true);
const escapeEvent = {
  key: 'Escape',
  preventDefault() {},
  stopImmediatePropagation() {},
};
canvasListeners.get('keydown')(escapeEvent);
assert.equal(cancelCommand.isActive(), false);
assert.equal(cancelDocument.model3d.solids.length, 1);
assert.equal(cancelDocument.undoStack.length, 0);
assert.equal(cancelStatus, 'Cortar sólido por plano cancelado');
cancelCommand.dispose();

console.log('webCAD 3D plane cut: OK');

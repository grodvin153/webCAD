/* webCAD - Persistencia parametrica 3D sin malla | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';

import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import {
  addModel3dSketch,
  addModel3dSolid,
  createModel3d,
} from '../source/3d/model3d.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import { copySolids, moveSolids, rotateSolids } from '../source/3d/solid-transformations.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
  splitSolidByPlane3d,
} from '../source/3d/three/manifold-boolean.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import {
  movedSolidFacePush,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';

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

function exactBox(size = 10, height = 10) {
  const sourcePoints = [
    { x: 0, y: 0, z: 0 },
    { x: size, y: 0, z: 0 },
    { x: size, y: size, z: 0 },
    { x: 0, y: size, z: 0 },
  ];
  const points = sourcePoints.map((point) => ({ ...point, y: -point.y }));
  return solidFromFacePush({
    id: 'compact-square',
    points,
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
    sourceEntity: {
      id: 'compact-square',
      type: 'POLYLINE',
      closed: true,
      vertices: sourcePoints,
    },
  }, height);
}

function faceFromGroup(solid, group, id = null) {
  return {
    sourceSolid: solid,
    sourceSolidDocumentId: id,
    sourceSolidFaceIndex: group.indices[0],
    sourceSolidFaceIndices: group.indices,
    points: group.outerLoop,
    holes: group.innerLoops,
    normal: group.normal,
  };
}

function topFace(solid) {
  const group = (solid.metadata?.planarFaceGroups ?? []).find((candidate) =>
    candidate.normal.z > 0.999);
  if (group) return faceFromGroup(solid, group);
  return {
    sourceSolid: solid,
    sourceSolidFaceIndex: 1,
    sourceSolidFaceIndices: [1],
    points: solid.faces[1].map((index) => solid.vertices[index]),
    holes: [],
    normal: { x: 0, y: 0, z: 1 },
  };
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

function signature(solid) {
  const analytic = deriveSolidAnalyticEdges(solid);
  return {
    volume: Number(meshVolume(solid).toFixed(7)),
    cadFaces: solid.metadata?.planarFaceGroups?.length ?? solid.faces.length,
    lines: analytic.lines.length,
    curves: analytic.curves.length,
  };
}

function forbiddenPaths(value, path = []) {
  const forbidden = new Set([
    'capFaceGroups', 'curvedSideFaceIndices', 'edgeSegments', 'edges',
    'faceLoops', 'faces', 'faceVertexNormals', 'indices', 'inputSolid', 'mesh',
    'normalIndices', 'normals',
    'planarFaceGroups', 'sourceFaceIndices', 'sourceSolidFaceIndex',
    'sourceSolidFaceIndices',
    'surfaceFaceIds', 'tangentEdges', 'triangleIndex', 'triangleIndices',
    'triangleNormals', 'triangles', 'vertexNormals', 'vertices',
  ]);
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, item]) => [
    ...(forbidden.has(key) ? [[...path, key].join('.')] : []),
    ...forbiddenPaths(item, [...path, key]),
  ]);
}

await initializeManifoldBoolean();

const base = exactBox();
const reduced = movedSolidFacePush(topFace(base), -5);
assert.ok(reduced);
assert.equal(reduced.metadata.profileFeatures.at(-1).inputFace.type, 'push-input-face-v2');
assert.equal(reduced.metadata.profileFeatures.at(-1).inputSolid, undefined);

const document = createTestDocument();
const record = document.add3dSolid(reduced, { recordHistory: false });
assert.equal(moveSolids({
  doc: document,
  solidIds: [record.id],
  from: { x: 0, y: 0, z: 0 },
  to: { x: 3, y: -4, z: 2 },
}), true);
assert.equal(rotateSolids({
  doc: document,
  solidIds: [record.id],
  axisStart: { x: 0, y: 0, z: 0 },
  axisEnd: { x: 0, y: 0, z: 1 },
  angleDegrees: 30,
}), true);
const copies = copySolids({
  doc: document,
  solidIds: [record.id],
  from: { x: 0, y: 0, z: 0 },
  to: { x: 20, y: 0, z: 0 },
});
assert.equal(copies.length, 1);
assert.equal(document.undo(), true);
assert.equal(document.model3d.solids.length, 1);
assert.equal(document.redo(), true);
assert.equal(document.model3d.solids.length, 2);

const compact = serializeModel3d(document.model3d);
assert.equal(compact.version, 2);
assert.equal(forbiddenPaths(compact).length, 0);
assert.equal(compact.solids.every((item) => item.solid === undefined), true);
const reopened = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(compact)),
));
assert.equal(reopened.solids.length, 2);
reopened.solids.forEach((item, index) => {
  assert.deepEqual(auditSolidCadTopology(item.solid).errors, []);
  assert.deepEqual(signature(item.solid), signature(reduced));
  assert.deepEqual(item.placement, document.model3d.solids[index].placement);
});

const reopenedSource = reopened.solids[0];
const terminal = topFace(reopenedSource.solid);
const restored = movedSolidFacePush(
  faceFromGroup(reopenedSource.solid, terminal.sourceSolidFaceIndices
    ? {
      indices: terminal.sourceSolidFaceIndices,
      outerLoop: terminal.points,
      innerLoops: terminal.holes,
      normal: terminal.normal,
    }
    : terminal, reopenedSource.id),
  5,
);
assert.ok(restored);
assert.deepEqual(signature(restored), signature(base));
reopenedSource.solid = restored;
reopenedSource.metadata = restored.metadata;
assert.equal(forbiddenPaths(serializeModel3d(reopened)).length, 0);

const cut = splitSolidByPlane3d(base, [
  { x: 5, y: 0, z: 0 },
  { x: 5, y: 10, z: 0 },
  { x: 5, y: 0, z: 10 },
], { operation: { type: 'cutSolidByPlane' } });
assert.equal(cut.ok, true);
const cutModel = createModel3d();
cut.parts.forEach((part) => addModel3dSolid(cutModel, part.solid, {
  operation: {
    type: 'cutSolidByPlane',
    points: [
      { x: 5, y: 0, z: 0 },
      { x: 5, y: 10, z: 0 },
      { x: 5, y: 0, z: 10 },
    ],
    side: part.side,
    component: part.componentIndex + 1,
  },
}));
const cutRoundTrip = hydrateCompactModel3d(parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(cutModel))),
));
assert.equal(cutRoundTrip.solids.length, cut.parts.length);
assert.deepEqual(
  cutRoundTrip.solids.map((item) => signature(item.solid)),
  cut.parts.map((part) => signature(part.solid)),
);

const alternateMesh = structuredClone(base);
alternateMesh.faces = base.faces.flatMap((face) => face.length === 4
  ? [[face[0], face[1], face[2]], [face[0], face[2], face[3]]]
  : [face]);
const firstMeshModel = createModel3d();
const secondMeshModel = createModel3d();
addModel3dSolid(firstMeshModel, base);
addModel3dSolid(secondMeshModel, alternateMesh);
assert.deepEqual(
  serializeModel3d(firstMeshModel).solids[0].authority,
  serializeModel3d(secondMeshModel).solids[0].authority,
);

assert.throws(() => parseSerializedModel3d({
  version: 1,
  sketches: [],
  lines: [],
  solids: [{
    id: 'legacy-mesh',
    solid: { vertices: [], faces: [], edges: [], metadata: {} },
  }],
}), /experimental antiguo incompatible.*original no se ha modificado/i);

const injectedMesh = structuredClone(compact);
injectedMesh.solids[0].authority.base.profile.mesh = {
  vertices: [{ x: 0, y: 0, z: 0 }],
  triangles: [[0, 0, 0]],
};
assert.throws(
  () => parseSerializedModel3d(injectedMesh),
  /topologia derivada no permitida.*authority\.base\.profile\.mesh/i,
);

const supportedSketchModel = createModel3d();
addModel3dSketch(supportedSketchModel, {
  entities: [{
    type: 'POLYLINE',
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
    ],
  }],
  metadata: {
    supportFace: {
      sourceSolidId: 'solid3d-1',
      sourceFaceIndices: [3, 4],
      outerLoop: [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 },
      ],
      innerLoops: [],
    },
  },
});
const compactSketchModel = serializeModel3d(supportedSketchModel);
assert.equal(compactSketchModel.sketches[0].metadata.supportFace.sourceFaceIndices, undefined);
assert.equal(compactSketchModel.sketches[0].entities[0].vertices.length, 3);
const injectedSketchTopology = structuredClone(compactSketchModel);
injectedSketchTopology.sketches[0].metadata.supportFace.sourceFaceIndices = [3];
assert.throws(
  () => parseSerializedModel3d(injectedSketchTopology),
  /topologia derivada no permitida.*metadata\.supportFace\.sourceFaceIndices/i,
);

console.log('webCAD 3D compact persistence: OK');

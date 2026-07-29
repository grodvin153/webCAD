/* webCAD - Regresión de despacho Push para región analítica residual | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import fs from 'node:fs';

import {
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticTopology,
} from '../source/3d/analytic-edges.js';
import { sampleExactProfile } from '../source/3d/exact-profile.js';
import {
  addModel3dSolid,
  createModel3d,
  replaceModel3dSolid,
} from '../source/3d/model3d.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import {
  pointOnExactProfilePlane,
} from '../source/3d/sketch-plane.js';
import {
  booleanSolid3d,
  initializeManifoldBoolean,
} from '../source/3d/three/manifold-boolean.js';
import {
  createPushSolidGroupFromSolid,
  createPushSolidMeshFromSolid,
  pushSourceKeyFromFace,
  solidFromBooleanFeatureTool,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import {
  pushSolidForFace,
  pushStrategyForFace,
} from '../source/3d/three/push-command.js';
import { solidFaceFromMeshHit } from '../source/3d/three/solid-face-selection.js';
import {
  operationFromPushFace,
} from '../source/3d/three/three-demo-viewer.js';
import { disposeThreeObject } from '../source/3d/three/three-scene-style.js';
import { isValidSolid3d } from '../source/3d/solid.js';

const projectUrl = new URL(
  './fixtures/3d/analytic-residual-push.webcad',
  import.meta.url,
);
const project = JSON.parse(fs.readFileSync(projectUrl, 'utf8'));
const record = project.model3d.solids[0];
const storedOperations = record.solid.metadata.exactGeometry.operations;
const exactOperations = storedOperations.slice(0, 2);
assert.equal(exactOperations.length, 2);
assert.equal(exactOperations.every((operation) =>
  operation.exactProfile && operation.analyticRegionId), true);

const cleanLoop = (loop) => {
  const points = loop.map((point) => ({
    x: Number(point.x),
    y: Number(point.y),
    z: Number(point.z) || 0,
  }));
  if (points.length > 1 && Math.hypot(
    points[0].x - points.at(-1).x,
    points[0].y - points.at(-1).y,
    points[0].z - points.at(-1).z,
  ) <= 1e-9) {
    points.pop();
  }
  return points;
};
const faceFromExactProfile = (profile, normal, segments = 64) => {
  const sampled = sampleExactProfile(profile, {
    segments,
    structured: true,
  });
  const worldLoop = (loop) => cleanLoop(loop.map((point) =>
    pointOnExactProfilePlane(point, profile.plane)));
  return {
    points: worldLoop(sampled.outerLoop),
    holes: sampled.innerLoops.map(worldLoop),
    normal: { ...normal },
    analyticAxis: { ...normal },
    exactProfile: structuredClone(profile),
    cadProfileVertexIndices: [],
    smoothProfileVertexIndices: [],
  };
};

await initializeManifoldBoolean();
const exactBase = record.solid.metadata.exactGeometry.base;
const baseExtrusion = exactBase.extrusion;
let rebuilt = solidFromFacePush(
  faceFromExactProfile(
    baseExtrusion.profile,
    baseExtrusion.direction,
  ),
  baseExtrusion.distance,
);
rebuilt.metadata = {
  ...rebuilt.metadata,
  exactGeometry: structuredClone(exactBase),
  profileFeatures: [],
};
for (const [operationIndex, operation] of exactOperations.entries()) {
  const featureFace = faceFromExactProfile(
    operation.exactProfile,
    operation.exactProfile.plane.normal,
    operationIndex === 1 ? 24 : 64,
  );
  const tool = solidFromBooleanFeatureTool(
    rebuilt,
    featureFace,
    operation.distance,
  );
  rebuilt = booleanSolid3d(rebuilt, tool, {
    operationType: operation.type,
    operation,
  });
  assert.ok(rebuilt);
}

const topology = deriveSolidAnalyticTopology(rebuilt);
const parentRegionId = exactOperations[0].analyticRegionId;
const subdivisionRegionId = exactOperations[1].analyticRegionId;
const residualGroup = topology.semanticPlanarFaces.find((group) =>
  group.kind === 'analytic-residual-parent' &&
  group.parentRegionId === parentRegionId &&
  group.subdivisionRegionIds?.includes(subdivisionRegionId));
assert.ok(residualGroup);

const mesh = createPushSolidMeshFromSolid(rebuilt);
mesh.userData.documentSolidId = record.id;
const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
const residualHits = triangleMap.map((_, triangleIndex) =>
  solidFaceFromMeshHit({
    object: mesh,
    faceIndex: triangleIndex,
  })).filter((face) =>
  face && residualGroup.indices.includes(face.sourceSolidFaceIndex));
assert.ok(residualHits.length > 1);
const selectedFace = residualHits[0];
assert.equal(new Set(residualHits.map((face) => face.id)).size, 1);
assert.ok(pushSourceKeyFromFace(selectedFace).includes(
  selectedFace.analyticRegionId,
));
assert.equal(residualHits.every((face) =>
  face.exactProfile &&
  face.analyticRegionId === selectedFace.analyticRegionId &&
  face.analyticParentRegionId === parentRegionId &&
  face.supportSolid === face.sourceSolid), true);
assert.ok(
  selectedFace.exactProfile,
  'La selección debe copiar el perfil exacto de la región residual',
);
assert.ok(
  selectedFace.analyticRegionId,
  'La selección debe copiar la identidad analítica residual',
);
assert.equal(selectedFace.analyticParentRegionId, parentRegionId);

const requestedDistance = record.operation.distance;
const strategy = pushStrategyForFace(selectedFace);
const operation = operationFromPushFace(
  selectedFace,
  {
    height: requestedDistance,
    sourceKey: pushSourceKeyFromFace(selectedFace),
  },
  record.operation.sketchPlane,
);
assert.notEqual(
  strategy,
  'moveFace',
  'Una región residual analítica no debe despacharse como movimiento genérico',
);
assert.notEqual(
  operation.type,
  'pushMoveFace',
  'La operación documental debe conservar el perfil exacto residual',
);
assert.ok(operation.exactProfile);
assert.ok(operation.analyticRegionId);
assert.equal(operation.analyticRegionId, selectedFace.analyticRegionId);

const firstPush = pushSolidForFace(selectedFace, requestedDistance);
assert.ok(firstPush);
assert.equal(isValidSolid3d(firstPush), true);
const residualRegionId = selectedFace.analyticRegionId;
const residualFeature = firstPush.metadata.profileFeatures.find((feature) =>
  feature.analyticRegionId === residualRegionId);
assert.ok(residualFeature);
assert.equal(residualFeature.type, 'subtract');
assert.ok(residualFeature.exactProfile);

const disposeMesh = (target) => {
  target.geometry.dispose();
  if (Array.isArray(target.material)) {
    target.material.forEach((material) => material.dispose());
  }
  else {
    target.material.dispose();
  }
};
const hitFaces = (solid) => {
  const hitMesh = createPushSolidMeshFromSolid(solid);
  const hits = (hitMesh.geometry.userData.webcadFaceTriangleMap ?? [])
    .map((_, triangleIndex) => solidFaceFromMeshHit({
      object: hitMesh,
      faceIndex: triangleIndex,
    }))
    .filter(Boolean);
  disposeMesh(hitMesh);
  return hits;
};
const terminalFace = (solid, regionId) => hitFaces(solid).find((face) =>
  face.analyticRegionId === regionId &&
  face.analyticCapIndex === 1);

const secondFace = terminalFace(firstPush, residualRegionId);
assert.ok(secondFace);
assert.equal(secondFace.analyticRegionId, residualRegionId);
assert.ok(secondFace.exactProfile);
assert.equal(
  pushStrategyForFace(secondFace),
  'moveFace',
  'La tapa del feature creado debe continuar por la ruta de edición exacta',
);

const oppositeFace = terminalFace(rebuilt, subdivisionRegionId);
assert.ok(oppositeFace);
const oppositePush = pushSolidForFace(oppositeFace, 1);
assert.ok(oppositePush);
assert.equal(isValidSolid3d(oppositePush), true);

const genericFace = hitFaces(rebuilt).find((face) =>
  face.sourceSolid &&
  !face.supportSolid &&
  !face.exactProfile &&
  !face.analyticRegionId);
assert.ok(genericFace);
assert.equal(pushStrategyForFace(genericFace), 'moveFace');
assert.equal(operationFromPushFace(
  genericFace,
  { height: 1 },
  record.operation.sketchPlane,
).type, 'pushMoveFace');
assert.equal(operationFromPushFace(
  { ...genericFace, line3dGroupId: 'line3d-group-consumed' },
  { height: 1 },
  record.operation.sketchPlane,
).line3dGroupId, 'line3d-group-consumed');

const roundTripModel = createModel3d();
addModel3dSolid(roundTripModel, rebuilt, {
  id: record.id,
  operation: {
    type: 'pushUnionProfile',
    distance: exactOperations[1].distance,
    exactProfile: exactOperations[1].exactProfile,
    analyticRegionId: subdivisionRegionId,
  },
});
replaceModel3dSolid(roundTripModel, record.id, firstPush, { operation });
const reopened = parseSerializedModel3d(JSON.parse(JSON.stringify(
  serializeModel3d(roundTripModel),
)));
const reopenedRecord = reopened.solids[0];
assert.equal(reopenedRecord.revision, 2);
assert.equal(reopenedRecord.operations[1].type, 'pushSubtractProfile');
assert.equal(reopenedRecord.operations[1].analyticRegionId, residualRegionId);
assert.ok(reopenedRecord.operations[1].exactProfile);
assert.equal(reopenedRecord.solid.metadata.profileFeatures.some((feature) =>
  feature.analyticRegionId === residualRegionId &&
  feature.exactProfile), true);

disposeMesh(mesh);

const identityProjectUrl = new URL(
  './fixtures/3d/analytic-residual-identity.webcad',
  import.meta.url,
);
const identityProject = JSON.parse(fs.readFileSync(identityProjectUrl, 'utf8'));
const identityRecord = identityProject.model3d.solids[0];
const identitySolid = identityRecord.solid;
const identityExactOperation =
  identitySolid.metadata.exactGeometry.operations.at(-1);
assert.ok(identityExactOperation.analyticRegionId);
assert.equal(identityRecord.operation.type, 'pushSubtractProfile');
assert.ok(identityRecord.operation.exactProfile);
assert.equal(identityRecord.operation.analyticRegionId, null);

const identityFace = {
  id: identityRecord.operation.exactProfile.id,
  supportSolid: identitySolid,
  sourceSolidDocumentId: identityRecord.id,
  sourceSolidFaceIndices: identityRecord.operation.sourceSolidFaceIndices,
  sketchPlane: identityRecord.operation.sketchPlane,
  sketchId: identityRecord.operation.sketchId,
  workplane: identityRecord.operation.workplane,
  exactProfile: identityRecord.operation.exactProfile,
  analyticRegionId: identityRecord.operation.analyticRegionId,
};
const identityOperation = operationFromPushFace(
  identityFace,
  {
    height: identityRecord.operation.distance,
    sourceKey: identityRecord.operation.sourceKey,
  },
  identityRecord.operation.sketchPlane,
  identitySolid,
);
assert.equal(identityOperation.type, 'pushSubtractProfile');
assert.ok(identityOperation.exactProfile);
assert.equal(
  identityOperation.analyticRegionId,
  identityExactOperation.analyticRegionId,
  'La operación pública debe reutilizar la identidad creada por exactGeometry',
);
assert.ok(identityOperation.sourceKey.includes(
  identityExactOperation.analyticRegionId,
));
assert.notEqual(identityOperation.sourceKey, 'solid-face:face-composite-1');
assert.equal(
  identityOperation.exactProfile.outerLoop.segments.every((segment) =>
    segment.source?.role),
  true,
  'La operación pública debe conservar la procedencia de sus segmentos',
);

const freshViewerGroup = createPushSolidGroupFromSolid(identitySolid);
assert.deepEqual(
  freshViewerGroup.children.map((child) => child.userData?.type),
  ['webcad-push-solid', 'webcad-push-solid-edges'],
  'Un visor reconstruido no debe contener overlays ni helpers antiguos',
);
const normalEdgeObject = freshViewerGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.ok(normalEdgeObject?.visible);
assert.ok(normalEdgeObject.userData.segmentCount > 0);
disposeThreeObject(freshViewerGroup);

const edgeKey = (first, second) =>
  first < second ? `${first}:${second}` : `${second}:${first}`;
const semanticBoundaryKeys = (solid, group) => {
  const uses = new Map();
  group.indices.forEach((faceIndex) => {
    const face = solid.faces[faceIndex];
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = edgeKey(start, end);
      uses.set(key, (uses.get(key) ?? 0) + 1);
    });
  });
  return new Set([...uses].flatMap(([key, count]) =>
    count === 1 ? [key] : []));
};
const assertNoReplacedParentCapCurve = (solid) => {
  const topology = deriveSolidAnalyticTopology(solid);
  const edges = deriveSolidAnalyticEdges(solid);
  const features = solid.metadata.profileFeatures;
  const parentRegionId = features[0].analyticRegionId;
  const childFeature = features.at(-1);
  const residual = topology.semanticPlanarFaces.find((group) =>
    group.kind === 'analytic-residual-parent' &&
    group.parentRegionId === parentRegionId &&
    group.subdivisionRegionIds?.includes(childFeature.analyticRegionId));
  assert.ok(residual);
  const residualBoundary = semanticBoundaryKeys(solid, residual);
  const parentTerminalCurves = edges.curves.filter((curve) =>
    curve.ownerRegionId === parentRegionId &&
    curve.capIndex === 1);
  assert.ok(parentTerminalCurves.length > 0);
  assert.equal(parentTerminalCurves.every((curve) =>
    curve.sourceEdgeIndices.every(([start, end]) =>
      residualBoundary.has(edgeKey(start, end)))), true,
  'No debe publicarse un tramo terminal padre fuera de la región residual');

  const expectedChildArcs = childFeature.exactProfile.outerLoop.segments
    .filter((segment) => segment.type === 'arc-circle').length;
  const childTerminalCurves = edges.curves.filter((curve) =>
    curve.ownerRegionId === childFeature.analyticRegionId &&
    curve.capIndex === 1);
  assert.equal(childTerminalCurves.length, expectedChildArcs);
  const dividerLines = edges.lines.filter((line) =>
    line.analyticSource?.dividerId &&
    line.analyticSource.regionId === childFeature.analyticRegionId);
  assert.equal(dividerLines.some((line) =>
    line.analyticSource.role === 'divider'), true);
  assert.equal(dividerLines.some((line) =>
    line.analyticSource.role === 'profile-side-boundary'), true);
};

assertNoReplacedParentCapCurve(identitySolid);
const reopenedIdentityModel = parseSerializedModel3d(
  JSON.parse(JSON.stringify(identityProject.model3d)),
);
assertNoReplacedParentCapCurve(reopenedIdentityModel.solids[0].solid);

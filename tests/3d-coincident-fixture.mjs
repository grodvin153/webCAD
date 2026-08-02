/* webCAD - Regresión aislada de sustracción curva coplanaria | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';

import {
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticSideSurfaces,
  deriveSolidAnalyticTopology,
} from '../source/3d/analytic-edges.js';
import { sampleExactProfile } from '../source/3d/exact-profile.js';
import {
  addModel3dSolid,
  createModel3d,
} from '../source/3d/model3d.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import {
  faceOnSketchPlane,
  pointFromExactProfilePlane,
  pointOnExactProfilePlane,
  pointFromSketchPlane,
  pointOnSketchPlane,
} from '../source/3d/sketch-plane.js';
import {
  faceOverlapsSketchSupport,
  sketchSupportBoundaryEntities,
} from '../source/3d/sketch-reference.js';
import { visibleEntitiesForThreeView } from '../source/3d/three/entity-visibility.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import {
  createPushSolidMeshFromSolid,
  movedSolidFacePush,
} from '../source/3d/three/push-geometry.js';
import { detectSimpleClosedFaces } from '../source/3d/three/simple-faces.js';
import { solidFaceFromMeshHit } from '../source/3d/three/solid-face-selection.js';
import {
  booleanFeatureRuntimeFace,
  initializeManifoldBoolean,
  subtractFacePushSolid3d,
} from '../source/3d/three/manifold-boolean.js';
import { isValidSolid3d } from '../source/3d/solid.js';

const fixtureUrl = new URL(
  './fixtures/3d/coplanar-curved-subtraction.json',
  import.meta.url,
);
const fixture = JSON.parse(fs.readFileSync(fixtureUrl, 'utf8'));
const baseFixture = JSON.parse(fs.readFileSync(new URL(
  './fixtures/3d/coplanar-curved-subtraction-base.json',
  import.meta.url,
), 'utf8'));
const model = fixture.model3d;
const sketch = model.sketches.find((entry) => entry.id === 'sketch3d-4');
const support = sketch.metadata.supportFace;
const supportRecord = model.solids.find((entry) => entry.id === support.sourceSolidId);
assert.equal(supportRecord.solid.metadata.profileFeatures.length, 1);
assert.deepEqual(
  supportRecord.solid.metadata.profileFeatures[0]
    .exactProfile.outerLoop.segments.map((segment) => segment.type),
  ['circle'],
  'El estado anterior al Push debe conservar un único círculo continuo',
);
supportRecord.solid.metadata.exactGeometry = {
  status: 'pending',
  base: baseFixture.base,
  operations: structuredClone(supportRecord.solid.metadata.profileFeatures),
};
const entities = [
  ...visibleEntitiesForThreeView(sketch.entities),
  ...sketchSupportBoundaryEntities(sketch, model),
];
const detectedFaces = detectSimpleClosedFaces(entities);
const localFace = detectedFaces.find((face) =>
  face.exactProfile?.outerLoop?.segments.some((segment) =>
    segment.type === 'line') &&
  face.exactProfile.outerLoop.segments.some((segment) =>
    segment.type === 'arc-circle'));
assert.ok(localFace);
assert.deepEqual(
  localFace.exactProfile.outerLoop.segments.map((segment) => segment.type),
  ['line', 'arc-circle'],
  'La creación del exactProfile hijo no debe dividir la curva en la costura periódica',
);
const supportPointToWorld = (point) => pointOnSketchPlane({
  x: Number(point?.x) || 0,
  y: -(Number(point?.y) || 0),
  z: 0,
}, sketch.plane);
const supportedWorldFace = (candidate) => {
  assert.equal(faceOverlapsSketchSupport(candidate, support), true);
  const worldFace = faceOnSketchPlane(candidate, sketch.plane, sketch.id);
  worldFace.supportSolid = supportRecord.solid;
  worldFace.sourceSolidDocumentId = supportRecord.id;
  worldFace.sourceSolidFaceIndices = support.sourceFaceIndices;
  worldFace.sourceSolidFaceIndex = support.sourceFaceIndices[0];
  worldFace.supportLoops = {
    outer: support.outerLoop.map(supportPointToWorld),
    holes: support.innerLoops.map((loop) => loop.map(supportPointToWorld)),
  };
  return worldFace;
};
const face = supportedWorldFace(localFace);

await initializeManifoldBoolean();
const distance = fixture.distance;
const reproduced = profileFeaturePushSolid(face, distance);
assert.ok(reproduced);

const normal = new THREE.Vector3(face.normal.x, face.normal.y, face.normal.z)
  .normalize();
const origin = new THREE.Vector3(
  face.points[0].x,
  face.points[0].y,
  face.points[0].z,
);
let rawMesh = null;
const kernelFace = booleanFeatureRuntimeFace(
  supportRecord.solid,
  face,
  reproduced.metadata.profileFeatures[1].exactProfile,
);
const rawSolid = subtractFacePushSolid3d(
  supportRecord.solid,
  face,
  distance,
  {
    operation: reproduced.metadata.profileFeatures[1],
    inspectKernelMesh(mesh) {
      rawMesh = {
        numProp: mesh.numProp,
        triVerts: Array.from(mesh.triVerts),
        vertProperties: Array.from(mesh.vertProperties),
      };
    },
  },
);
assert.ok(rawSolid);
assert.ok(rawMesh);
assert.ok(kernelFace);
const pointInLoop = (point, loop) => {
  let inside = false;
  for (let index = 0, previous = loop.length - 1;
    index < loop.length;
    previous = index, index += 1) {
    const current = loop[index];
    const prior = loop[previous];
    if ((current.y > point.y) !== (prior.y > point.y) &&
        point.x < (prior.x - current.x) * (point.y - current.y) /
          (prior.y - current.y) + current.x) {
      inside = !inside;
    }
  }
  return inside;
};
const removedStartPlaneTrianglesFromMesh = (mesh, exactProfile) => {
  const sampled = sampleExactProfile(exactProfile, {
    segments: 64,
    structured: true,
  });
  const removed = [];
  for (let offset = 0; offset < mesh.triVerts.length; offset += 3) {
    const points = [0, 1, 2].map((index) => {
      const vertexIndex = mesh.triVerts[offset + index];
      return new THREE.Vector3(
        mesh.vertProperties[vertexIndex * mesh.numProp],
        mesh.vertProperties[vertexIndex * mesh.numProp + 1],
        mesh.vertProperties[vertexIndex * mesh.numProp + 2],
      );
    });
    if (points.some((point, index) =>
      points.some((candidate, candidateIndex) =>
        candidateIndex < index && point.equals(candidate)))) {
      continue;
    }
    if (!points.every((point) =>
      Math.abs(point.clone().sub(origin).dot(normal)) <= 1e-5)) {
      continue;
    }
    const centroid = points.reduce((sum, point) => sum.add(point),
      new THREE.Vector3()).multiplyScalar(1 / 3);
    const local = pointFromSketchPlane(centroid, exactProfile.plane);
    if (pointInLoop(local, sampled.outerLoop) &&
        !sampled.innerLoops.some((loop) => pointInLoop(local, loop))) {
      removed.push(points);
    }
  }
  return removed;
};
const removedStartPlaneTriangles = removedStartPlaneTrianglesFromMesh(
  rawMesh,
  face.exactProfile,
);
assert.equal(
  removedStartPlaneTriangles.length,
  0,
  'La malla bruta conserva triángulos dentro de la región exacta sustraída',
);

const samePoint = (first, second) =>
  first.x === second.x && first.y === second.y && first.z === second.z;
const cyclicChainMatches = (actual, expected) => {
  if (actual.length !== expected.length) return false;
  const candidates = [expected, [...expected].reverse()];
  return candidates.some((candidate) => candidate.some((point, offset) => {
    if (!samePoint(actual[0], point)) return false;
    return actual.every((entry, index) =>
      samePoint(entry, candidate[(offset + index) % candidate.length]));
  }));
};
const sourceBoundaryId = reproduced.metadata.profileFeatures.at(-1)
  .exactProfile.outerLoop.segments
  .find((segment) => segment.source?.role === 'profile-boundary')
  ?.source?.sourceBoundaryId;
assert.ok(sourceBoundaryId);
const sourceTopology = deriveSolidAnalyticTopology(supportRecord.solid);
const sourceCapGroup = sourceTopology.semanticPlanarFaces.find((group) =>
  group.exactProfile &&
  [
    group.exactProfile.outerLoop,
    ...(group.exactProfile.innerLoops ?? []),
  ].some((loop) => loop.segments.some((segment) =>
    segment.source?.sourceBoundaryId === sourceBoundaryId)) &&
  group.outerLoop.every((point) =>
    Math.abs(pointFromExactProfilePlane(
      point,
      face.exactProfile.plane,
    ).z) <= 1e-5));
assert.ok(sourceCapGroup);
const sourceCapEdgeUses = new Map();
sourceCapGroup.indices.forEach((faceIndex) => {
  const sourceFace = supportRecord.solid.faces[faceIndex];
  sourceFace.forEach((start, index) => {
    const end = sourceFace[(index + 1) % sourceFace.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    if (!sourceCapEdgeUses.has(key)) sourceCapEdgeUses.set(key, []);
    sourceCapEdgeUses.get(key).push([start, end]);
  });
});
const sourceCapNeighbors = new Map();
sourceCapEdgeUses.forEach((uses) => {
  if (uses.length !== 1) return;
  const [start, end] = uses[0];
  if (!sourceCapNeighbors.has(start)) sourceCapNeighbors.set(start, []);
  if (!sourceCapNeighbors.has(end)) sourceCapNeighbors.set(end, []);
  sourceCapNeighbors.get(start).push(end);
  sourceCapNeighbors.get(end).push(start);
});
const sourceCapVertexLoop = [];
const sourceCapStart = sourceCapNeighbors.keys().next().value;
let sourceCapPrevious = null;
let sourceCapCurrent = sourceCapStart;
do {
  sourceCapVertexLoop.push(supportRecord.solid.vertices[sourceCapCurrent]);
  const next = sourceCapNeighbors.get(sourceCapCurrent)
    .find((candidate) => candidate !== sourceCapPrevious);
  sourceCapPrevious = sourceCapCurrent;
  sourceCapCurrent = next;
} while (sourceCapCurrent !== sourceCapStart &&
  sourceCapVertexLoop.length <= sourceCapNeighbors.size);
const kernelPointSet = new Set(kernelFace.points.map((point) =>
  `${point.x}:${point.y}:${point.z}`));
const sourceSharedChain = sourceCapVertexLoop.filter((point) =>
  kernelPointSet.has(`${point.x}:${point.y}:${point.z}`));
const kernelSharedChain = [
  ...kernelFace.points.slice(1),
  kernelFace.points[0],
];
assert.equal(
  cyclicChainMatches(kernelSharedChain, sourceSharedChain),
  true,
  'El cortador debe reutilizar punto por punto la cadena runtime del límite origen',
);
const meshVertices = (mesh) => Array.from(
  { length: mesh.vertProperties.length / mesh.numProp },
  (_, index) => ({
    x: mesh.vertProperties[index * mesh.numProp],
    y: mesh.vertProperties[index * mesh.numProp + 1],
    z: mesh.vertProperties[index * mesh.numProp + 2],
  }),
);
const sharedKernelVertex = (vertices, point) => {
  const x = Math.fround(point[0]);
  const y = Math.fround(point[1]);
  return vertices.filter((vertex) =>
    vertex.x === x && vertex.y === y)
    .sort((first, second) => Math.abs(first.z) - Math.abs(second.z))[0] ?? null;
};
const sharedKernelVertices = (vertices, point) => {
  const x = Math.fround(point[0]);
  const y = Math.fround(point[1]);
  return vertices.filter((vertex) =>
    vertex.x === x && vertex.y === y);
};
const deepCutDistances = [
  -86.24548435431824,
  -155.61351957566205,
];
const deepKernelOperands = deepCutDistances.map((deepDistance) => {
  let operands = null;
  let resultMesh = null;
  const deepResult = subtractFacePushSolid3d(
    supportRecord.solid,
    face,
    deepDistance,
    {
      operation: {
        ...reproduced.metadata.profileFeatures.at(-1),
        distance: deepDistance,
      },
      inspectKernelOperands(value) {
        operands = {
          contours: value.contours,
          source: meshVertices(value.source),
          cutter: meshVertices(value.cutter),
        };
      },
      inspectKernelMesh(value) {
        resultMesh = {
          vertices: meshVertices(value),
          triangles: Array.from(value.triVerts),
          raw: {
            numProp: value.numProp,
            triVerts: Array.from(value.triVerts),
            vertProperties: Array.from(value.vertProperties),
          },
        };
      },
    },
  );
  assert.ok(deepResult);
  assert.ok(operands);
  assert.ok(resultMesh);
  return { ...operands, resultMesh, solid: deepResult };
});
deepKernelOperands.forEach((operands) => {
  operands.contours.flat().forEach((point) => {
    const sourceVertex = sharedKernelVertex(operands.source, point);
    const cutterVertex = sharedKernelVertex(operands.cutter, point);
    assert.ok(sourceVertex);
    assert.ok(cutterVertex);
    assert.deepEqual(
      cutterVertex,
      sourceVertex,
      'Sólido y cortador deben entregar el mismo vértice local a Manifold',
    );
    const cutterLevels = sharedKernelVertices(operands.cutter, point);
    const minimumCutterZ = Math.min(...cutterLevels.map((vertex) => vertex.z));
    const maximumCutterZ = Math.max(...cutterLevels.map((vertex) => vertex.z));
    sharedKernelVertices(operands.source, point)
      .filter((vertex) =>
        vertex.z >= minimumCutterZ && vertex.z <= maximumCutterZ)
      .forEach((sourceLevel) => {
        assert.equal(
          cutterLevels.some((cutterLevel) =>
            samePoint(cutterLevel, sourceLevel)),
          true,
          'Cada cruce axial compartido debe entrar literalmente en ambos operandos',
        );
      });
  });
});
const canonicalBoundaryStep = Math.min(...kernelFace.points.map(
  (point, index) => point.distanceTo(
    kernelFace.points[(index + 1) % kernelFace.points.length],
  ),
).filter((length) => length > 0));
deepKernelOperands.forEach(({ resultMesh }) => {
  const edgeLengths = [];
  for (let offset = 0; offset < resultMesh.triangles.length; offset += 3) {
    const triangle = resultMesh.triangles.slice(offset, offset + 3)
      .map((index) => resultMesh.vertices[index]);
    assert.equal(new Set(triangle.map((point) =>
      `${point.x}:${point.y}:${point.z}`)).size, 3,
    'El kernel no debe devolver triángulos con vértices coincidentes');
    triangle.forEach((point, index) => {
      const next = triangle[(index + 1) % triangle.length];
      const length = Math.hypot(
        point.x - next.x,
        point.y - next.y,
        point.z - next.z,
      );
      if (length > 0) edgeLengths.push(length);
    });
  }
  assert.ok(
    Math.min(...edgeLengths) >= canonicalBoundaryStep * 0.01,
    'El corte profundo no debe introducir intervalos minúsculos frente al paso canónico',
  );
  assert.equal(
    removedStartPlaneTrianglesFromMesh(
      resultMesh.raw,
      face.exactProfile,
    ).length,
    0,
    'Los cortes profundos no deben conservar fragmentos en el plano inicial',
  );
});

const disposeMesh = (mesh) => {
  mesh.geometry?.dispose?.();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => material.dispose?.());
  }
  else {
    mesh.material?.dispose?.();
  }
};
const hitFaces = (solid) => {
  const mesh = createPushSolidMeshFromSolid(solid);
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
  const hits = triangleMap.map((_, faceIndex) =>
    solidFaceFromMeshHit({ object: mesh, faceIndex })).filter(Boolean);
  disposeMesh(mesh);
  return hits;
};
const creatorRegionId =
  supportRecord.solid.metadata.profileFeatures[0].analyticRegionId;
const subtractFeature = reproduced.metadata.profileFeatures.at(-1);
const subtractRegionId = subtractFeature.analyticRegionId;
assert.ok(creatorRegionId);
assert.ok(subtractRegionId);
assert.deepEqual(
  subtractFeature.exactProfile.outerLoop.segments.map((segment) =>
    segment.type),
  ['line', 'arc-circle'],
);
assert.equal(
  deriveSolidAnalyticSideSurfaces(reproduced).filter((surface) =>
    surface.featureIndex === reproduced.metadata.profileFeatures.length - 1 &&
    surface.type === 'arc-circle').length,
  1,
  'El feature hijo debe crear una sola superficie para el arco continuo',
);
assert.equal(reproduced.metadata.booleanKernel, 'manifold-3d');

const firstHits = hitFaces(reproduced);
const residualHits = firstHits.filter((hit) =>
  hit.analyticParentRegionId === creatorRegionId &&
  hit.analyticRegionId !== subtractRegionId);
assert.ok(residualHits.length > 1);
assert.equal(new Set(residualHits.map((hit) => hit.id)).size, 1);
assert.equal(new Set(residualHits.map((hit) => hit.analyticRegionId)).size, 1);
assert.ok(residualHits[0].exactProfile);

const terminalFace = (solid, regionId) => hitFaces(solid).find((hit) =>
  hit.analyticRegionId === regionId &&
  hit.analyticCapIndex === 1);
const firstTerminal = terminalFace(reproduced, subtractRegionId);
assert.ok(firstTerminal);
const secondPush = movedSolidFacePush(firstTerminal, -2);
assert.ok(secondPush);
assert.equal(isValidSolid3d(secondPush), true);
assert.equal(secondPush.metadata.booleanKernel, 'manifold-3d');
assert.equal(secondPush.metadata.profileFeatures.length,
  reproduced.metadata.profileFeatures.length);
const secondFeature = secondPush.metadata.profileFeatures.find((feature) =>
  feature.analyticRegionId === subtractRegionId);
assert.ok(secondFeature?.exactProfile);
assert.deepEqual(secondFeature.exactProfile, subtractFeature.exactProfile);

const secondTerminal = terminalFace(secondPush, subtractRegionId);
assert.ok(secondTerminal);
const thirdPush = movedSolidFacePush(secondTerminal, 1);
assert.ok(thirdPush);
assert.equal(isValidSolid3d(thirdPush), true);
assert.equal(thirdPush.metadata.booleanKernel, 'manifold-3d');
assert.equal(thirdPush.metadata.profileFeatures.length,
  reproduced.metadata.profileFeatures.length);
const thirdFeature = thirdPush.metadata.profileFeatures.find((feature) =>
  feature.analyticRegionId === subtractRegionId);
assert.ok(thirdFeature?.exactProfile);
assert.deepEqual(thirdFeature.exactProfile, subtractFeature.exactProfile);

const assertClosedManifold = (solid) => {
  const edgeUses = new Map();
  solid.faces.forEach((solidFace) => solidFace.forEach((start, index) => {
    const end = solidFace[(index + 1) % solidFace.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    edgeUses.set(key, (edgeUses.get(key) ?? 0) + 1);
  }));
  assert.equal([...edgeUses.values()].every((count) => count === 2), true);
};
deepKernelOperands.forEach(({ solid }) => {
  assert.equal(isValidSolid3d(solid), true);
  assertClosedManifold(solid);
  assert.deepEqual(
    solid.metadata.profileFeatures.at(-1)
      .exactProfile.outerLoop.segments.map((segment) => segment.type),
    ['line', 'arc-circle'],
    'Los cortes profundos deben conservar el perfil exacto canonizado',
  );
});
assertClosedManifold(reproduced);
assertClosedManifold(secondPush);
assertClosedManifold(thirdPush);

const analyticEdges = deriveSolidAnalyticEdges(thirdPush);
assert.equal(analyticEdges.lines.some((line) => {
  const start = new THREE.Vector3(line.start.x, line.start.y, line.start.z);
  const end = new THREE.Vector3(line.end.x, line.end.y, line.end.z);
  return start.distanceTo(end) <= 1e-5;
}), false, 'La topología CAD no debe publicar mini-segmentos');

const roundTripModel = createModel3d();
addModel3dSolid(roundTripModel, thirdPush, { id: 'coincident-runtime-chain' });
addModel3dSolid(roundTripModel, deepKernelOperands.at(-1).solid, {
  id: 'coincident-runtime-chain-deep',
});
const reopened = hydrateCompactModel3d(parseSerializedModel3d(JSON.parse(JSON.stringify(
  serializeModel3d(roundTripModel),
))));
const reopenedSolid = reopened.solids.find((entry) =>
  entry.id === 'coincident-runtime-chain').solid;
const reopenedDeepSolid = reopened.solids.find((entry) =>
  entry.id === 'coincident-runtime-chain-deep').solid;
assert.equal(isValidSolid3d(reopenedSolid), true);
assertClosedManifold(reopenedSolid);
assert.equal(isValidSolid3d(reopenedDeepSolid), true);
assertClosedManifold(reopenedDeepSolid);
assert.deepEqual(
  reopenedDeepSolid.metadata.profileFeatures.at(-1)
    .exactProfile.outerLoop.segments.map((segment) => segment.type),
  ['line', 'arc-circle'],
);
const reopenedFeature = reopenedSolid.metadata.profileFeatures.find((feature) =>
  feature.analyticRegionId === subtractRegionId);
assert.deepEqual(reopenedFeature.exactProfile, subtractFeature.exactProfile);

const oppositeLocalFace = detectedFaces.find((candidate) =>
  candidate !== localFace &&
  candidate.exactProfile?.outerLoop?.segments.length === 2 &&
  candidate.exactProfile.outerLoop.segments.some((segment) =>
    segment.type === 'arc-circle'));
assert.ok(oppositeLocalFace);
const oppositeFace = supportedWorldFace(oppositeLocalFace);
const symmetric = profileFeaturePushSolid(oppositeFace, distance);
assert.ok(symmetric);
let symmetricRawMesh = null;
const symmetricRaw = subtractFacePushSolid3d(
  supportRecord.solid,
  oppositeFace,
  distance,
  {
    operation: symmetric.metadata.profileFeatures.at(-1),
    inspectKernelMesh(mesh) {
      symmetricRawMesh = {
        numProp: mesh.numProp,
        triVerts: Array.from(mesh.triVerts),
        vertProperties: Array.from(mesh.vertProperties),
      };
    },
  },
);
assert.ok(symmetricRaw);
assert.ok(symmetricRawMesh);
assert.equal(
  removedStartPlaneTrianglesFromMesh(
    symmetricRawMesh,
    oppositeFace.exactProfile,
  ).length,
  0,
  'La región simétrica no debe dejar material en el plano inicial',
);

const creatorProfile =
  supportRecord.solid.metadata.profileFeatures[0].exactProfile;
const creatorCircle = creatorProfile.outerLoop.segments.find((segment) =>
  segment.type === 'circle');
assert.ok(creatorCircle);
const creatorCenterWorld = pointOnExactProfilePlane(
  creatorCircle.center,
  creatorProfile.plane,
);
const rectangleCenter = pointFromExactProfilePlane(
  creatorCenterWorld,
  face.exactProfile.plane,
);
const halfSide = creatorCircle.radius * 0.05;
const rectangleLocal = [
  { x: rectangleCenter.x - halfSide, y: rectangleCenter.y - halfSide, z: 0 },
  { x: rectangleCenter.x + halfSide, y: rectangleCenter.y - halfSide, z: 0 },
  { x: rectangleCenter.x + halfSide, y: rectangleCenter.y + halfSide, z: 0 },
  { x: rectangleCenter.x - halfSide, y: rectangleCenter.y + halfSide, z: 0 },
];
const rectangleProfile = {
  plane: structuredClone(face.exactProfile.plane),
  outerLoop: {
    segments: rectangleLocal.map((start, index) => ({
      type: 'line',
      start,
      end: rectangleLocal[(index + 1) % rectangleLocal.length],
    })),
  },
  innerLoops: [],
};
const rectangleFace = {
  points: rectangleLocal.map((point) =>
    pointOnExactProfilePlane(point, rectangleProfile.plane)),
  holes: [],
  normal: structuredClone(rectangleProfile.plane.normal),
  exactProfile: rectangleProfile,
  cadProfileVertexIndices: rectangleLocal.map((_, index) => index),
  smoothProfileVertexIndices: [],
};
const rectangleKernelFace = booleanFeatureRuntimeFace(
  supportRecord.solid,
  rectangleFace,
  rectangleProfile,
);
const rectangleResult = subtractFacePushSolid3d(
  supportRecord.solid,
  rectangleFace,
  -Math.abs(distance) * 0.1,
  {
    operation: { type: 'subtract', exactProfile: rectangleProfile },
  },
);
assert.ok(rectangleResult);
assert.ok(rectangleKernelFace);
assert.equal(rectangleKernelFace.points.every((point, index) =>
  samePoint(point, rectangleFace.points[index])), true,
  'Los límites rectos sin procedencia común deben conservar su ruta anterior');

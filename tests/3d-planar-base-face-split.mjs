/* webCAD - Regresión de cara base coplanar tras Push dividido | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';

import { deriveSolidAnalyticTopology } from '../source/3d/analytic-edges.js';
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
  pointOnSketchPlane,
} from '../source/3d/sketch-plane.js';
import {
  faceOverlapsSketchSupport,
  sketchSupportBoundaryEntities,
} from '../source/3d/sketch-reference.js';
import { visibleEntitiesForThreeView } from '../source/3d/three/entity-visibility.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import {
  createPushSolidMeshFromSolid,
  movedSolidFacePush,
} from '../source/3d/three/push-geometry.js';
import { detectSimpleClosedFaces } from '../source/3d/three/simple-faces.js';
import { solidFaceFromMeshHit } from '../source/3d/three/solid-face-selection.js';
import {
  initializeManifoldBoolean,
  subtractFacePushSolid3d,
} from '../source/3d/three/manifold-boolean.js';
import { isValidSolid3d } from '../source/3d/solid.js';
import { booleanWeldTolerance } from '../source/3d/tolerances.js';

const fixture = JSON.parse(fs.readFileSync(new URL(
  './fixtures/3d/planar-base-face-split.json',
  import.meta.url,
), 'utf8'));
const model = fixture.model3d;
const sketch = model.sketches.find((entry) =>
  entry.metadata?.supportFace?.boundaries?.some((boundary) =>
    boundary.type === 'circle') &&
  entry.entities?.some((entity) => entity.type === 'LINE'));
assert.ok(sketch);
const support = sketch.metadata.supportFace;
const supportRecord = model.solids.find((entry) => entry.id === support.sourceSolidId);
assert.ok(supportRecord);
const distance = fixture.distance;
const creatorFeature = supportRecord.solid.metadata.profileFeatures.at(-1);
const baseSupportPlane = creatorFeature.exactProfile.plane;
const baseNormal = new THREE.Vector3(
  baseSupportPlane.normal.x,
  baseSupportPlane.normal.y,
  baseSupportPlane.normal.z,
).normalize();
const baseOrigin = new THREE.Vector3(
  baseSupportPlane.origin.x,
  baseSupportPlane.origin.y,
  baseSupportPlane.origin.z,
);
const tolerance = booleanWeldTolerance(supportRecord.solid);

const supportPointToWorld = (point) => pointOnSketchPlane({
  x: Number(point?.x) || 0,
  y: -(Number(point?.y) || 0),
  z: 0,
}, sketch.plane);
const worldFace = (candidate) => {
  assert.equal(faceOverlapsSketchSupport(candidate, support), true);
  const face = faceOnSketchPlane(candidate, sketch.plane, sketch.id);
  face.supportSolid = supportRecord.solid;
  face.sourceSolidDocumentId = supportRecord.id;
  face.sourceSolidFaceIndices = support.sourceFaceIndices;
  face.sourceSolidFaceIndex = support.sourceFaceIndices[0];
  face.supportLoops = {
    outer: support.outerLoop.map(supportPointToWorld),
    holes: (support.innerLoops ?? []).map((loop) =>
      loop.map(supportPointToWorld)),
  };
  return face;
};
const dividedFaces = detectSimpleClosedFaces([
  ...visibleEntitiesForThreeView(sketch.entities),
  ...sketchSupportBoundaryEntities(sketch, model),
]).filter((face) => {
  const types = face.exactProfile?.outerLoop?.segments?.map((segment) =>
    segment.type) ?? [];
  return types.includes('line') && types.includes('arc-circle');
});
assert.equal(dividedFaces.length, 2);

const meshVertices = (mesh) => Array.from(
  { length: mesh.vertProperties.length / mesh.numProp },
  (_, index) => ({
    x: mesh.vertProperties[index * mesh.numProp],
    y: mesh.vertProperties[index * mesh.numProp + 1],
    z: mesh.vertProperties[index * mesh.numProp + 2],
  }),
);
const pointOnBaseSupport = (point) =>
  Math.abs(new THREE.Vector3(point.x, point.y, point.z)
    .sub(baseOrigin).dot(baseNormal)) <= tolerance;
const indexedComponents = (indices, faceAt) => {
  const edgeUses = new Map();
  indices.forEach((faceIndex) => {
    const face = faceAt(faceIndex);
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = start < end ? `${start}:${end}` : `${end}:${start}`;
      if (!edgeUses.has(key)) edgeUses.set(key, []);
      edgeUses.get(key).push(faceIndex);
    });
  });
  const neighbors = new Map(indices.map((index) => [index, []]));
  edgeUses.forEach((uses) => {
    if (uses.length !== 2) return;
    neighbors.get(uses[0]).push(uses[1]);
    neighbors.get(uses[1]).push(uses[0]);
  });
  const visited = new Set();
  return indices.flatMap((start) => {
    if (visited.has(start)) return [];
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors.get(current).forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    return [component];
  });
};
const disposeMesh = (mesh) => {
  mesh.geometry?.dispose?.();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => material.dispose?.());
  }
  else {
    mesh.material?.dispose?.();
  }
};
const assertClosedManifold = (solid) => {
  const uses = new Map();
  solid.faces.forEach((solidFace) => solidFace.forEach((start, index) => {
    const end = solidFace[(index + 1) % solidFace.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    uses.set(key, (uses.get(key) ?? 0) + 1);
  }));
  assert.equal([...uses.values()].every((count) => count === 2), true);
};

await initializeManifoldBoolean();
for (const [sideIndex, dividedFace] of dividedFaces.entries()) {
  const face = worldFace(dividedFace);
  const publicResult = profileFeaturePushSolid(face, distance);
  assert.ok(publicResult);
  const operation = publicResult.metadata.profileFeatures.at(-1);
  let rawMesh = null;
  const result = subtractFacePushSolid3d(
    supportRecord.solid,
    face,
    distance,
    {
      operation,
      inspectKernelMesh(mesh) {
        rawMesh = {
          faceID: Array.from(mesh.faceID ?? []),
          numProp: mesh.numProp,
          triVerts: Array.from(mesh.triVerts),
          vertices: meshVertices(mesh),
        };
      },
    },
  );
  assert.ok(result);
  assert.ok(rawMesh);
  assert.equal(isValidSolid3d(result), true);
  assertClosedManifold(result);

  const rawBaseFaces = Array.from(
    { length: rawMesh.triVerts.length / 3 },
    (_, index) => index,
  ).filter((faceIndex) =>
    rawMesh.triVerts.slice(faceIndex * 3, faceIndex * 3 + 3)
      .every((vertexIndex) => pointOnBaseSupport(rawMesh.vertices[vertexIndex])));
  const rawComponents = indexedComponents(
    rawBaseFaces,
    (faceIndex) => rawMesh.triVerts.slice(faceIndex * 3, faceIndex * 3 + 3),
  );
  assert.equal(rawComponents.length, 1);
  assert.equal(new Set(rawBaseFaces.map((faceIndex) =>
    rawMesh.faceID[faceIndex])).size, 1);

  const convertedBaseFaces = result.faces.flatMap((solidFace, faceIndex) =>
    solidFace.every((vertexIndex) =>
      pointOnBaseSupport(result.vertices[vertexIndex]))
      ? [faceIndex]
      : []);
  const convertedComponents = indexedComponents(
    convertedBaseFaces,
    (faceIndex) => result.faces[faceIndex],
  );
  assert.equal(convertedComponents.length, 1);
  assert.equal(new Set(convertedBaseFaces.map((faceIndex) =>
    result.metadata.surfaceFaceIds[faceIndex])).size, 1);

  const basePlanarGroups = result.metadata.planarFaceGroups.filter((group) =>
    group.indices.some((faceIndex) => convertedBaseFaces.includes(faceIndex)));
  assert.equal(
    basePlanarGroups.length,
    1,
    'Una única cara analítica de soporte se publica como varios planarFaceGroups',
  );

  const analyticTopology = deriveSolidAnalyticTopology(result);
  assert.equal(analyticTopology.faceSurfaceIds
    .filter((_, faceIndex) => convertedBaseFaces.includes(faceIndex))
    .every((surfaceId) => surfaceId === null), true);

  const mesh = createPushSolidMeshFromSolid(result);
  mesh.userData.documentSolidId = supportRecord.id;
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
  const displaySolid = mesh.userData.solid;
  const displayBaseFaces = displaySolid.faces.flatMap((solidFace, faceIndex) =>
    solidFace.every((vertexIndex) =>
      pointOnBaseSupport(displaySolid.vertices[vertexIndex]))
      ? [faceIndex]
      : []);
  const baseHits = triangleMap.flatMap((faceIndex, triangleIndex) =>
    displayBaseFaces.includes(faceIndex)
      ? [solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex })]
      : []).filter(Boolean);
  assert.ok(baseHits.length > 1);
  assert.equal(new Set(baseHits.map((hit) => hit.id)).size, 1);

  const displayTopology = deriveSolidAnalyticTopology(displaySolid);
  const childCap = displayTopology.semanticPlanarFaces.find((group) =>
    group.regionId === operation.analyticRegionId &&
    group.capIndex === 1);
  const residualCap = displayTopology.semanticPlanarFaces.find((group) =>
    group.kind === 'analytic-residual-parent' &&
    group.parentRegionId === creatorFeature.analyticRegionId);
  assert.ok(childCap);
  assert.ok(residualCap);
  assert.equal(childCap.indices.some((faceIndex) =>
    residualCap.indices.includes(faceIndex)), false,
  'La frontera real entre la región rebajada y la residual debe conservarse');
  const childHits = triangleMap.flatMap((faceIndex, triangleIndex) =>
    childCap.indices.includes(faceIndex)
      ? [solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex })]
      : []).filter(Boolean);
  const residualHits = triangleMap.flatMap((faceIndex, triangleIndex) =>
    residualCap.indices.includes(faceIndex)
      ? [solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex })]
      : []).filter(Boolean);
  assert.ok(childHits.length > 1);
  assert.ok(residualHits.length > 1);
  assert.equal(new Set(childHits.map((hit) => hit.id)).size, 1);
  assert.equal(new Set(residualHits.map((hit) => hit.id)).size, 1);
  assert.notEqual(childHits[0].id, residualHits[0].id);

  const subsequent = movedSolidFacePush(
    childHits[0],
    Math.abs(distance) * 0.05,
  );
  assert.ok(subsequent);
  assert.equal(isValidSolid3d(subsequent), true);
  assertClosedManifold(subsequent);
  assert.equal(subsequent.metadata.profileFeatures.length,
    result.metadata.profileFeatures.length);
  const replayedFeature = subsequent.metadata.profileFeatures.find((feature) =>
    feature.analyticRegionId === operation.analyticRegionId);
  assert.ok(replayedFeature);
  assert.deepEqual(
    replayedFeature.exactProfile.outerLoop.segments.map((segment) =>
      segment.type),
    ['line', 'arc-circle'],
  );

  const roundTripModel = createModel3d();
  addModel3dSolid(roundTripModel, subsequent, {
    id: `planar-base-side-${sideIndex}`,
  });
  const reopened = parseSerializedModel3d(JSON.parse(JSON.stringify(
    serializeModel3d(roundTripModel),
  )));
  const reopenedSolid = reopened.solids[0].solid;
  assert.equal(isValidSolid3d(reopenedSolid), true);
  assertClosedManifold(reopenedSolid);
  assert.equal(reopenedSolid.metadata.profileFeatures.some((feature) =>
    feature.analyticRegionId === operation.analyticRegionId &&
    feature.exactProfile?.outerLoop?.segments?.map((segment) =>
      segment.type).join(',') === 'line,arc-circle'), true);
  disposeMesh(mesh);
}

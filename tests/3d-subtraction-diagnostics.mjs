import assert from 'node:assert/strict';

import { extrudeClosedProfile } from '../source/3d/extrusion.js';
import {
  auditSolidCadTopology,
  booleanSolid3d,
  initializeManifoldBoolean,
} from '../source/3d/three/manifold-boolean.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import { movedSolidFacePush } from '../source/3d/three/push-geometry.js';
import { pushFailureMessage } from '../source/3d/three/push-command.js';

function box(x0, x1, y0, y1, height) {
  return extrudeClosedProfile([
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ], height);
}

function subtractWithDiagnostics(target, cutter) {
  const diagnostics = [];
  const solid = booleanSolid3d(target, cutter, {
    operationType: 'subtract',
    operation: { type: 'subtract', test: true },
    onDiagnostic: (diagnostic) => diagnostics.push(diagnostic),
  });
  return { diagnostics, solid };
}

function faceShellCount(solid) {
  const facesByVertex = new Map();
  solid.faces.forEach((face, faceIndex) => face.forEach((vertexIndex) => {
    if (!facesByVertex.has(vertexIndex)) facesByVertex.set(vertexIndex, []);
    facesByVertex.get(vertexIndex).push(faceIndex);
  }));
  const pending = new Set(solid.faces.map((_, index) => index));
  let count = 0;
  while (pending.size) {
    count += 1;
    const stack = [pending.values().next().value];
    pending.delete(stack[0]);
    while (stack.length) {
      const faceIndex = stack.pop();
      solid.faces[faceIndex].forEach((vertexIndex) => {
        (facesByVertex.get(vertexIndex) ?? []).forEach((neighbor) => {
          if (!pending.delete(neighbor)) return;
          stack.push(neighbor);
        });
      });
    }
  }
  return count;
}

function faceForGroup(solid, group) {
  return {
    sourceSolid: solid,
    sourceSolidFaceIndex: group.indices[0],
    sourceSolidFaceIndices: group.indices,
    points: group.outerLoop,
    holes: group.innerLoops,
    normal: group.normal,
  };
}

await initializeManifoldBoolean();

const target = box(0, 10, 0, 10, 10);

const disjoint = subtractWithDiagnostics(target, box(20, 21, 0, 1, 1));
assert.equal(disjoint.solid, null);
assert.equal(disjoint.diagnostics.at(-1).reason, 'no-intersection');
assert.match(pushFailureMessage(disjoint.diagnostics.at(-1)), /no intersecta/);

const tangent = subtractWithDiagnostics(target, box(10, 11, 0, 10, 10));
assert.equal(tangent.solid, null);
assert.equal(tangent.diagnostics.at(-1).reason, 'tangent-contact');
assert.match(pushFailureMessage(tangent.diagnostics.at(-1)), /contacto tangente/);

const smallOverlap = subtractWithDiagnostics(target, box(9.999, 11, 0, 10, 10));
assert.ok(smallOverlap.solid);
assert.equal(smallOverlap.diagnostics[0].reason, 'overlap-confirmed');
assert.equal(smallOverlap.diagnostics.at(-1).reason, 'success');
assert.ok(smallOverlap.diagnostics[0].volumes.overlap > 0);
assert.equal(smallOverlap.diagnostics[0].operation.type, 'subtract');
assert.equal(smallOverlap.diagnostics[0].coordinateSystem, 'solid-local');
assert.ok(smallOverlap.diagnostics[0].target.bounds);
assert.ok(smallOverlap.diagnostics[0].cutter.bounds);
assert.ok(smallOverlap.diagnostics[0].effectiveTolerance > 0);
assert.equal(smallOverlap.diagnostics.at(-1).phase, 'completed');
assert.ok(smallOverlap.diagnostics.at(-1).volumes.before >
  smallOverlap.diagnostics.at(-1).volumes.after);

const nearCorner = subtractWithDiagnostics(target, box(9.99, 11, 9.99, 11, 10));
assert.ok(nearCorner.solid);
assert.equal(nearCorner.diagnostics[0].reason, 'overlap-confirmed');
assert.ok(nearCorner.diagnostics[0].volumes.overlap < 0.01);
assert.equal(auditSolidCadTopology(nearCorner.solid).valid, true);

const profileDiagnostics = [];
const profileSubtraction = profileFeaturePushSolid({
  supportSolid: target,
  points: [
    { x: 2, y: 2, z: 10 },
    { x: 8, y: 2, z: 10 },
    { x: 8, y: 8, z: 10 },
    { x: 2, y: 8, z: 10 },
  ],
  holes: [],
  supportLoops: {
    outer: [
      { x: 0, y: 0, z: 10 },
      { x: 10, y: 0, z: 10 },
      { x: 10, y: 10, z: 10 },
      { x: 0, y: 10, z: 10 },
    ],
    holes: [],
  },
  normal: { x: 0, y: 0, z: 1 },
  workplane: {
    type: 'fixed',
    origin: { x: 0, y: 0, z: 10 },
    normal: { x: 0, y: 0, z: 1 },
    xAxis: { x: 1, y: 0, z: 0 },
  },
  sourceSolidFaceIndices: [1],
}, -2, {
  onDiagnostic: (diagnostic) => profileDiagnostics.push(diagnostic),
});
assert.ok(profileSubtraction);
assert.equal(profileDiagnostics[0].reason, 'overlap-confirmed');
assert.equal(profileDiagnostics.at(-1).reason, 'success');
assert.equal(profileDiagnostics[0].coordinateSystem.type, 'face-local-frame');

const invalidTarget = subtractWithDiagnostics(
  { vertices: [], faces: [], edges: [], metadata: {} },
  box(0, 1, 0, 1, 1),
);
assert.equal(invalidTarget.solid, null);
assert.equal(invalidTarget.diagnostics.at(-1).reason, 'invalid-target-solid');

const thinWall = box(0, 10, 0, 10, 0.2);
const thinWallDiagnostics = [];
const invalidThinWallPush = movedSolidFacePush({
  sourceSolid: thinWall,
  sourceSolidFaceIndex: 1,
  sourceSolidFaceIndices: [1],
  points: thinWall.faces[1].map((index) => thinWall.vertices[index]),
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
}, -0.101, {
  onDiagnostic: (diagnostic) => thinWallDiagnostics.push(diagnostic),
});
assert.equal(invalidThinWallPush, null);
assert.equal(thinWallDiagnostics.at(-1).phase, 'precheck-material-thickness');
assert.equal(thinWallDiagnostics.at(-1).reason, 'minimum-thickness');
assert.match(pushFailureMessage(thinWallDiagnostics.at(-1)), /espesor mínimo/);

const left = box(0, 3, 0, 3, 3);
const bridge = box(3, 7, 1, 2, 1);
const right = box(7, 10, 0, 3, 3);
const joinedLeft = booleanSolid3d(left, bridge, { operationType: 'union' });
const dumbbell = booleanSolid3d(joinedLeft, right, { operationType: 'union' });
const disconnected = subtractWithDiagnostics(dumbbell, box(4, 6, 0, 3, 3));
assert.ok(disconnected.solid);
assert.equal(faceShellCount(disconnected.solid), 2);
assert.equal(disconnected.diagnostics.at(-1).reason, 'success');

const initialPush = box(0, 10, 0, 10, 4);
const initialTopFace = {
  sourceSolid: initialPush,
  sourceSolidFaceIndex: 1,
  sourceSolidFaceIndices: [1],
  points: initialPush.faces[1].map((index) => initialPush.vertices[index]),
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
};
const advanced = movedSolidFacePush(initialTopFace, 2);
assert.ok(advanced);
assert.equal(Math.max(...advanced.vertices.map((point) => point.z)), 6);
const advancedTopGroup = advanced.metadata.planarFaceGroups
  .filter((group) => group.normal.z > 0.999)
  .sort((first, second) =>
    Math.max(...second.outerLoop.map((point) => point.z)) -
    Math.max(...first.outerLoop.map((point) => point.z)))[0];
const returnedDiagnostics = [];
const returned = movedSolidFacePush(faceForGroup(advanced, advancedTopGroup), -2, {
  onDiagnostic: (diagnostic) => returnedDiagnostics.push(diagnostic),
});
assert.ok(returned);
assert.equal(Math.min(...returned.vertices.map((point) => point.z)), 0);
assert.equal(Math.max(...returned.vertices.map((point) => point.z)), 4);
assert.equal(returnedDiagnostics.at(-1).reason, 'success');

console.log('webCAD 3D subtraction diagnostics: OK');

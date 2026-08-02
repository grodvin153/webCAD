/* webCAD - Regresion de Push aditivo sobre cara de resta | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import { exactProfileFromPolyline } from '../source/3d/exact-profile.js';
import {
  pointFromSketchPlane,
  sketchPlaneFromFace,
} from '../source/3d/sketch-plane.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
} from '../source/3d/three/manifold-boolean.js';
import {
  consolidateAdditiveExtrusion,
} from '../source/3d/three/additive-solid-consolidation.js';
import { hydrateCompactModel3d } from '../source/3d/three/model3d-replay.js';
import {
  movedSolidFacePush,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import { solidPlanarFacesFromMesh } from '../source/3d/three/solid-face-selection.js';

const PUSH_DISTANCE = 22.07;

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

function span(points, axis) {
  const values = points.map((point) => Number(point[axis]));
  return Math.max(...values) - Math.min(...values);
}

function pointsCoincide(first, second, tolerance = 1e-4) {
  return Math.hypot(
    first.x - second.x,
    first.y - second.y,
    first.z - second.z,
  ) <= tolerance;
}

function lineMatchesBoundary(line, first, second) {
  return pointsCoincide(line.start, first) && pointsCoincide(line.end, second) ||
    pointsCoincide(line.start, second) && pointsCoincide(line.end, first);
}

function selectableFaces(record) {
  const mesh = {
    uuid: 'subtract-cylinder-fixture',
    userData: {
      type: 'webcad-push-solid',
      solid: record.solid,
      documentSolidId: record.id,
    },
    parent: { userData: { documentSolidId: record.id } },
  };
  return solidPlanarFacesFromMesh(mesh);
}

function equivalentExtrusion(face) {
  const plane = sketchPlaneFromFace(face);
  const localPoints = face.points.map((point) => pointFromSketchPlane(point, plane));
  const exactProfile = exactProfileFromPolyline({
    id: 'subtract-cylinder-equivalent-profile',
    type: 'POLYLINE',
    closed: true,
    vertices: localPoints,
  }, { plane });
  assert.ok(exactProfile, 'El rectangulo equivalente debe conservar un perfil exacto');
  return solidFromFacePush({
    ...face,
    id: 'subtract-cylinder-equivalent-face',
    exactProfile,
  }, PUSH_DISTANCE);
}

await initializeManifoldBoolean();

const project = JSON.parse(await readFile(
  new URL('../samples/subtract_cilindro.webcad', import.meta.url),
  'utf8',
));
const model = hydrateCompactModel3d(parseSerializedModel3d(project.model3d));
const record = model.solids[0];
const face = selectableFaces(record).find((candidate) =>
  candidate.normal.y > 0.99 &&
  span(candidate.points, 'x') > 40 &&
  span(candidate.points, 'z') > 80);

assert.ok(face, 'El fixture debe exponer la cara plana creada por subtractSolid');
assert.equal(face.exactProfile, undefined,
  'La regresion debe cubrir una cara booleana sin identidad analitica estable');
assert.equal(face.analyticRegionId, undefined);
const verticalBoundaries = face.points.map((point, index) => [
  point,
  face.points[(index + 1) % face.points.length],
]).filter(([first, second]) => Math.abs(first.z - second.z) > 80);
const peakBoundary = verticalBoundaries.sort(([first], [second]) =>
  first.x - second.x)[0];
const initialAnalyticEdges = deriveSolidAnalyticEdges(record.solid);
assert.ok(
  initialAnalyticEdges.lines.some((line) =>
    lineMatchesBoundary(line, peakBoundary[0], peakBoundary[1])),
  'La interseccion longitudinal entre la cara booleana y el arco debe representar la arista del pico',
);

const equivalentSolid = equivalentExtrusion(face);
const equivalent = consolidateAdditiveExtrusion({
  records: [record],
  solid: equivalentSolid,
  placement: record.placement,
});
assert.equal(equivalent.merged, true,
  'La extrusion equivalente debe consolidarse con el solido restado');
assert.deepEqual(auditSolidCadTopology(equivalent.solid).errors, []);

const pushed = movedSolidFacePush(face, PUSH_DISTANCE);
assert.ok(pushed, 'El Push aditivo de la cara booleana debe completarse');
assert.deepEqual(auditSolidCadTopology(pushed).errors, []);
const pushedOperation = pushed.metadata.profileFeatures.at(-1);
assert.equal(pushedOperation.type, 'union');
assert.match(pushedOperation.inputFace?.region?.id ?? '', /^push-region-/,
  'La cara sin identidad analitica debe persistir una identidad geometrica estable');

const equivalentVolume = meshVolume(equivalent.solid);
const pushedVolume = meshVolume(pushed);
assert.ok(
  Math.abs(pushedVolume - equivalentVolume) <= equivalentVolume * 1e-5,
  `Push y extrusion equivalente deben consolidar el mismo volumen: ${pushedVolume} frente a ${equivalentVolume}`,
);

record.solid = pushed;
record.metadata = pushed.metadata;
record.exactGeometry = pushed.metadata.exactGeometry;
const saved = JSON.parse(JSON.stringify(serializeModel3d(model)));
assert.equal(saved.solids[0].authority.operations.at(-1).type, 'union');
assert.equal(
  saved.solids[0].authority.operations.at(-1).inputFace.region.id,
  pushedOperation.inputFace.region.id,
);

const reopened = hydrateCompactModel3d(parseSerializedModel3d(saved));
const reopenedSolid = reopened.solids[0].solid;
assert.deepEqual(auditSolidCadTopology(reopenedSolid).errors, []);
assert.ok(
  Math.abs(meshVolume(reopenedSolid) - pushedVolume) <= pushedVolume * 1e-6,
  'Guardar, abrir y reproducir deben conservar el volumen del Push consolidado',
);

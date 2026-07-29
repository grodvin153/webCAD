/* webCAD - Regresión de agrupación de caras semánticas tras Push | SPDX-License-Identifier: GPL-3.0-or-later */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { deriveSolidAnalyticEdges } from '../source/3d/analytic-edges.js';
import { parseSerializedModel3d } from '../source/3d/serialization.js';
import { createPushSolidMeshFromSolid } from '../source/3d/three/push-geometry.js';
import { solidFaceFromMeshHit } from '../source/3d/three/solid-face-selection.js';
import { solidWithDerivedSurfaceTopology } from '../source/3d/three/manifold-boolean.js';

export function runPushPlanarFaceGroupTest() {
  // 1. Caso real: dibujo_caras sueltas.webcad produce 1 única cara semántica
  const fileUrl = new URL(
    './fixtures/3d/planar-face-groups.webcad',
    import.meta.url,
  );
  assert.equal(
    fs.existsSync(fileUrl),
    true,
    'El fixture de grupos planos debe existir',
  );
  const webcadData = JSON.parse(fs.readFileSync(fileUrl, 'utf8'));
  const model = parseSerializedModel3d(webcadData.model3d || webcadData);
  assert.ok(model?.solids?.length > 0);
  const solid = model.solids[0].solid;
  assert.ok(solid);

  const testSolid = {
    ...solid,
    metadata: {
      ...(solid.metadata ?? {}),
      planarFaceGroups: null,
    },
  };

  const rederived = solidWithDerivedSurfaceTopology(testSolid);
  assert.ok(rederived?.metadata?.planarFaceGroups);

  const faceIds = rederived.metadata?.surfaceFaceIds ?? [];
  const trisByFid = new Map();
  faceIds.forEach((fid, idx) => {
    if (fid === null || fid === undefined) return;
    if (!trisByFid.has(fid)) trisByFid.set(fid, []);
    trisByFid.get(fid).push(idx);
  });

  const edgeUses = new Map();
  rederived.faces.forEach((face, faceIndex) => {
    face.forEach((start, corner) => {
      const end = face[(corner + 1) % face.length];
      const key = start < end ? `${start}:${end}` : `${end}:${start}`;
      if (!edgeUses.has(key)) edgeUses.set(key, []);
      edgeUses.get(key).push(faceIndex);
    });
  });

  let verifiedConnectedSurface = false;
  let targetTris = [];
  trisByFid.forEach((indices) => {
    if (indices.length <= 3) return;
    const neighbors = new Map(indices.map((i) => [i, []]));
    indices.forEach((idx) => {
      const f = rederived.faces[idx];
      f.forEach((start, corner) => {
        const end = f[(corner + 1) % f.length];
        const key = start < end ? `${start}:${end}` : `${end}:${start}`;
        (edgeUses.get(key) || []).forEach((neighbor) => {
          if (neighbor !== idx && indices.includes(neighbor)) {
            neighbors.get(idx).push(neighbor);
          }
        });
      });
    });

    const visited = new Set();
    const components = [];
    indices.forEach((index) => {
      if (visited.has(index)) return;
      const component = [];
      const queue = [index];
      visited.add(index);
      while (queue.length) {
        const current = queue.pop();
        component.push(current);
        neighbors.get(current).forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      components.push(component);
    });

    if (components.length === 1) {
      verifiedConnectedSurface = true;
      targetTris = indices;
      const matchingGroups = rederived.metadata.planarFaceGroups.filter((group) =>
        group.indices.some((faceIndex) => indices.includes(faceIndex)));
      assert.equal(
        matchingGroups.length,
        1,
        'grupos publicados !== componentes semánticos reales',
      );
      assert.equal(matchingGroups[0].indices.length, indices.length);
    }
  });

  assert.equal(verifiedConnectedSurface, true, 'Debe verificarse al menos una superficie dividida por aristas');

  // 1b. Verificación de Hit-Testing e invariantes de selección sobre el sólido real
  const mesh = createPushSolidMeshFromSolid(rederived);
  mesh.userData.documentSolidId = 'solid3d-1';
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];

  assert.ok(targetTris.length > 5);

  const hitResults = targetTris.map((fIdx) => {
    const triIdx = triangleMap.indexOf(fIdx);
    assert.ok(triIdx >= 0);
    return solidFaceFromMeshHit({ object: mesh, faceIndex: triIdx });
  });

  // Invariante 1: Cada triángulo de la cara resuelve hacia el mismo conjunto de índices
  const firstIndices = hitResults[0].sourceSolidFaceIndices.sort((a, b) => a - b);
  assert.equal(firstIndices.length, targetTris.length);
  hitResults.forEach((res) => {
    assert.deepEqual(res.sourceSolidFaceIndices.sort((a, b) => a - b), firstIndices);
  });

  // Invariante 2: El triángulo central y sus vecinos generan el mismo sourceKey
  const firstSourceKey = [...firstIndices].join(',');
  hitResults.forEach((res) => {
    const key = [...res.sourceSolidFaceIndices].sort((a, b) => a - b).join(',');
    assert.equal(key, firstSourceKey);
  });
  const targetGroup = rederived.metadata.planarFaceGroups.find((group) =>
    group.indices.some((faceIndex) => targetTris.includes(faceIndex)));
  const targetGroupFaces = new Set(targetGroup.indices);
  const internalTargetEdges = new Set([...edgeUses.entries()].flatMap(([key, faces]) =>
    faces.length === 2 && faces.every((faceIndex) => targetGroupFaces.has(faceIndex))
      ? [key]
      : []));
  const publishedInternalEdges = deriveSolidAnalyticEdges(rederived).lines
    .flatMap((line) => line.sourceEdgeIndices ?? [])
    .map(([first, second]) => first < second
      ? `${first}:${second}`
      : `${second}:${first}`)
    .filter((key) => internalTargetEdges.has(key));
  assert.deepEqual(
    publishedInternalEdges,
    [],
    'La cara fusionada no debe publicar diagonales ni costuras internas',
  );

  // 2. Regresión negativa 1: dos planos con ángulo real (15°) no deben fusionarse en un único planarFaceGroup
  const angle15 = 15 * Math.PI / 180;
  const angledSolid = {
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 10, y: 0, z: 0 },
      { x: 5, y: 10, z: 0 },
      { x: 10 * Math.cos(angle15), y: 0, z: 10 * Math.sin(angle15) },
    ],
    faces: [[0, 1, 2], [0, 2, 3]],
    edges: [],
    metadata: {
      booleanKernel: 'manifold-3d',
      surfaceFaceIds: [101, 101],
    },
  };
  const derivedAngled = solidWithDerivedSurfaceTopology(angledSolid);
  assert.equal(
    derivedAngled.metadata.planarFaceGroups.length,
    2,
    'Triángulos con un ángulo real de 15° no deben unirse en un solo soporte canónico plano',
  );

  // 3. Regresión negativa 2: un parche ligeramente plegado / no coplanar no debe recibir soporte plano canónico
  const foldedSolid = {
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 10, y: 0, z: 0 },
      { x: 5, y: 10, z: 0 },
      { x: 10, y: 0, z: 0.1 },
    ],
    faces: [[0, 1, 2], [0, 2, 3]],
    edges: [],
    metadata: {
      booleanKernel: 'manifold-3d',
      surfaceFaceIds: [102, 102],
    },
  };
  const derivedFolded = solidWithDerivedSurfaceTopology(foldedSolid);
  assert.equal(
    derivedFolded.metadata.planarFaceGroups.length,
    2,
    'Un parche plegado con desviación z > EPSILON no debe unirse en una cara plana única',
  );

  // 4. Regresión negativa 3: componentes desconectados deben producir grupos independientes
  const disconnectedSolid = {
    vertices: [
      { x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 10, y: 10, z: 0 }, { x: 0, y: 10, z: 0 },
      { x: 100, y: 0, z: 0 }, { x: 110, y: 0, z: 0 }, { x: 110, y: 10, z: 0 }, { x: 100, y: 10, z: 0 },
    ],
    faces: [
      [0, 1, 2], [0, 2, 3],
      [4, 5, 6], [4, 6, 7],
    ],
    edges: [],
    metadata: {
      booleanKernel: 'manifold-3d',
      surfaceFaceIds: [103, 103, 103, 103],
    },
  };
  const derivedDisconnected = solidWithDerivedSurfaceTopology(disconnectedSolid);
  assert.equal(
    derivedDisconnected.metadata.planarFaceGroups.length,
    2,
    'Componentes desconectados por aristas deben producir grupos planos independientes',
  );
}

if (process.argv[1] && process.argv[1].endsWith('3d-push-planar-face-group.mjs')) {
  runPushPlanarFaceGroupTest();
}

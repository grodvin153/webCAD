/* webCAD - Seleccion de caras planas de solidos Push experimentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { deriveSolidAnalyticTopology } from '../analytic-edges.js';

const PLANAR_TOLERANCE = 1e-7;
const DERIVED_PLANAR_TOLERANCE_FACTOR = 2e-7;
const NORMAL_EPSILON = 1e-12;
const FACE_SELECTED_COLOR = 0xffd166;
const FACE_HIGHLIGHT_OFFSET = 0.006;
const solidAnalyticTopologyCache = new WeakMap();
const INSIDE_TEST_DIRECTIONS = [
  new THREE.Vector3(0.742, 0.421, 0.522).normalize(),
  new THREE.Vector3(-0.311, 0.817, 0.486).normalize(),
  new THREE.Vector3(0.537, -0.239, 0.809).normalize(),
];

// Face overlays stay above the shaded solid, but below every edge pass.
export const SOLID_FACE_SUPPORT_RENDER_ORDER = 24;
export const SOLID_FACE_HOVER_RENDER_ORDER = 25;
export const SOLID_FACE_SELECTION_RENDER_ORDER = 26;

function vectorFromPoint(point) {
  return new THREE.Vector3(Number(point?.x), Number(point?.y), Number(point?.z) || 0);
}

function faceNormal(points) {
  if (!Array.isArray(points) || points.length < 3) return null;
  const origin = vectorFromPoint(points[0]);
  for (let index = 1; index < points.length - 1; index += 1) {
    const normal = vectorFromPoint(points[index]).sub(origin)
      .cross(vectorFromPoint(points[index + 1]).sub(origin));
    if (normal.lengthSq() > NORMAL_EPSILON) return normal.normalize();
  }
  return null;
}

function isPlanar(points, normal, tolerance = PLANAR_TOLERANCE) {
  if (!normal || !Array.isArray(points) || points.length < 3) return false;
  const origin = vectorFromPoint(points[0]);
  return points.every((point) =>
    Math.abs(vectorFromPoint(point).sub(origin).dot(normal)) <= tolerance);
}

function derivedPlanarTolerance(loops) {
  const box = new THREE.Box3();
  loops.flat().forEach((point) => box.expandByPoint(vectorFromPoint(point)));
  const scale = box.isEmpty() ? 1 : Math.max(1, box.getSize(new THREE.Vector3()).length());
  return Math.max(PLANAR_TOLERANCE, scale * DERIVED_PLANAR_TOLERANCE_FACTOR);
}

function averagePoint(points) {
  return points.reduce((sum, point) => sum.add(vectorFromPoint(point)), new THREE.Vector3())
    .multiplyScalar(1 / Math.max(1, points.length));
}

function outwardNormal(normal, points, solid) {
  const solidCenter = averagePoint(solid.vertices);
  const faceCenter = averagePoint(points);
  return normal.dot(faceCenter.sub(solidCenter)) < 0
    ? normal.clone().multiplyScalar(-1)
    : normal;
}

function solidScale(solid) {
  const box = new THREE.Box3();
  (solid?.vertices ?? []).forEach((point) => box.expandByPoint(vectorFromPoint(point)));
  return box.isEmpty() ? 1 : Math.max(1, box.getSize(new THREE.Vector3()).length());
}

function rayIntersections(point, direction, solid, tolerance) {
  const ray = new THREE.Ray(point, direction);
  const hit = new THREE.Vector3();
  const distances = [];
  (solid?.faces ?? []).forEach((face) => {
    if (!Array.isArray(face) || face.length < 3) return;
    const first = vectorFromPoint(solid.vertices[face[0]]);
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = vectorFromPoint(solid.vertices[face[index]]);
      const third = vectorFromPoint(solid.vertices[face[index + 1]]);
      if (!ray.intersectTriangle(first, second, third, false, hit)) continue;
      const distance = hit.clone().sub(point).dot(direction);
      if (distance > tolerance) distances.push(distance);
    }
  });
  distances.sort((left, right) => left - right);
  return distances.filter((distance, index) =>
    index === 0 || Math.abs(distance - distances[index - 1]) > tolerance * 4).length;
}

function pointInsideSolid(point, solid, tolerance) {
  const insideVotes = INSIDE_TEST_DIRECTIONS.reduce((votes, direction) =>
    votes + (rayIntersections(point, direction, solid, tolerance) % 2), 0);
  return insideVotes >= 2;
}

function solidNormalOrientation(groupNormal, face, solid) {
  const facePoints = face.map((vertexIndex) => solid.vertices[vertexIndex]).filter(Boolean);
  if (facePoints.length < 3) return null;
  const sample = averagePoint(facePoints);
  const tolerance = solidScale(solid) * 1e-7;
  const positiveInside = pointInsideSolid(
    sample.clone().addScaledVector(groupNormal, tolerance * 8), solid, tolerance,
  );
  const negativeInside = pointInsideSolid(
    sample.clone().addScaledVector(groupNormal, -tolerance * 8), solid, tolerance,
  );
  if (positiveInside === negativeInside) return null;
  return positiveInside ? -1 : 1;
}

function selectionNormal(planarGroup, face, points, solid) {
  const groupNormal = planarGroup?.normal ? vectorFromPoint(planarGroup.normal) : null;
  if (groupNormal && groupNormal.lengthSq() > NORMAL_EPSILON) {
    groupNormal.normalize();
    const orientation = solidNormalOrientation(groupNormal, face, solid);
    if (orientation) return groupNormal.multiplyScalar(orientation);
    return outwardNormal(groupNormal, points, solid);
  }

  // Compatibility path for legacy extrusions without derived planar topology.
  const legacyNormal = faceNormal(points);
  return legacyNormal ? outwardNormal(legacyNormal, points, solid) : null;
}

function profileSizeFromExtrusion(solid) {
  const metadataSize = Number(solid?.metadata?.profileSize);
  if (Number.isInteger(metadataSize) && metadataSize >= 3 && solid.vertices?.length === metadataSize * 2) {
    return metadataSize;
  }
  const lowerFaceSize = solid?.faces?.[0]?.length;
  const upperFaceSize = solid?.faces?.[1]?.length;
  if (!Number.isInteger(lowerFaceSize) || lowerFaceSize < 3 || lowerFaceSize !== upperFaceSize) {
    return null;
  }
  if (solid.vertices.length !== lowerFaceSize * 2) return null;
  return lowerFaceSize;
}

function profileIndex(vertexIndex, profileSize) {
  return vertexIndex >= profileSize ? vertexIndex - profileSize : vertexIndex;
}

function isGeneratedCurvedSideFace(solid, faceIndex) {
  const face = solid?.faces?.[faceIndex];
  const profileSize = profileSizeFromExtrusion(solid);
  if (!profileSize || !Array.isArray(face) || face.length !== 4 || faceIndex < 2) return false;
  const smooth = new Set(
    Array.isArray(solid?.metadata?.smoothVerticalEdgeIndices)
      ? solid.metadata.smoothVerticalEdgeIndices
      : Array.isArray(solid?.metadata?.smoothProfileVertexIndices)
        ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  if (!smooth.size) return false;
  return face.some((vertexIndex) => smooth.has(profileIndex(vertexIndex, profileSize)));
}

function projectedPoint(point, normal) {
  const abs = {
    x: Math.abs(normal.x),
    y: Math.abs(normal.y),
    z: Math.abs(normal.z),
  };
  if (abs.z >= abs.x && abs.z >= abs.y) return new THREE.Vector2(point.x, point.y);
  if (abs.x >= abs.y) return new THREE.Vector2(point.y, point.z);
  return new THREE.Vector2(point.x, point.z);
}

function triangleIndicesForFace(points, normal, holes = []) {
  const projected = points.map((point) => projectedPoint(point, normal));
  const projectedHoles = holes.map((loop) => loop.map((point) => projectedPoint(point, normal)));
  const triangles = THREE.ShapeUtils.triangulateShape(projected, projectedHoles);
  if (triangles.length) {
    return triangles.flat();
  }
  return points.slice(1, -1).flatMap((_, index) => [0, index + 1, index + 2]);
}

function capFaceGroup(solid, faceIndex) {
  const groups = solid?.metadata?.capFaceGroups;
  if (!groups) return null;
  if (groups.lower?.includes(faceIndex)) return { indices: groups.lower, upper: false };
  if (groups.upper?.includes(faceIndex)) return { indices: groups.upper, upper: true };
  return null;
}

function capLoops(solid, upper) {
  const profileSize = Number(solid?.metadata?.profileSize);
  const loopSizes = solid?.metadata?.profileLoopSizes;
  if (!Number.isInteger(profileSize) || !Array.isArray(loopSizes) ||
      loopSizes.reduce((sum, size) => sum + size, 0) !== profileSize) return null;
  const loops = [];
  let start = upper ? profileSize : 0;
  loopSizes.forEach((size) => {
    loops.push(solid.vertices.slice(start, start + size));
    start += size;
  });
  return loops;
}

function planarFaceGroup(solid, faceIndex) {
  const index = (solid?.metadata?.planarFaceGroups ?? [])
    .findIndex((group) => Array.isArray(group?.indices) && group.indices.includes(faceIndex));
  return index >= 0 ? { group: solid.metadata.planarFaceGroups[index], index } : null;
}

function semanticPlanarFace(solid, faceIndex) {
  if (!solidAnalyticTopologyCache.has(solid)) {
    solidAnalyticTopologyCache.set(solid, deriveSolidAnalyticTopology(solid));
  }
  const topology = solidAnalyticTopologyCache.get(solid);
  const group = topology.semanticPlanarFaces.find((candidate) =>
    candidate.indices.includes(faceIndex));
  return group ? { group, index: group.id, semantic: true } : null;
}

function isProfileFeatureCurvedFace(solid, faceIndex) {
  if (Array.isArray(solid?.metadata?.curvedSideFaceIndices) &&
      solid.metadata.curvedSideFaceIndices.includes(faceIndex)) return true;
  const normals = solid?.metadata?.faceVertexNormals?.[faceIndex];
  if ((solid?.metadata?.type !== 'profileFeature' && !Array.isArray(solid?.metadata?.profileFeatures)) ||
      !Array.isArray(normals) || normals.length < 2) {
    return false;
  }
  const first = vectorFromPoint(normals[0]);
  return normals.slice(1).some((normal) => first.distanceTo(vectorFromPoint(normal)) > PLANAR_TOLERANCE);
}

function solidFaceFromMeshFace(mesh, faceIndex, requestedPlanarGroup = null) {
  if (mesh?.userData?.type !== 'webcad-push-solid') return null;
  const solid = mesh.userData.solid;
  const face = solid?.faces?.[faceIndex];
  if (!Array.isArray(face) || face.length < 3 || !Array.isArray(solid?.vertices)) return null;
  const planarEntry = requestedPlanarGroup ??
    semanticPlanarFace(solid, faceIndex) ??
    planarFaceGroup(solid, faceIndex);
  if (!planarEntry &&
      (isGeneratedCurvedSideFace(solid, faceIndex) || isProfileFeatureCurvedFace(solid, faceIndex))) return null;
  const planarGroup = planarEntry?.group ?? null;
  const capGroup = capFaceGroup(solid, faceIndex);
  const loops = planarGroup
    ? [planarGroup.outerLoop, ...(planarGroup.innerLoops ?? [])]
    : capGroup ? capLoops(solid, capGroup.upper) : null;
  const points = loops?.[0] || face.map((vertexIndex) => solid.vertices[vertexIndex]).filter(Boolean);
  const holes = loops?.slice(1) || [];
  const normal = selectionNormal(planarGroup, face, points, solid);
  const planarTolerance = planarGroup
    ? derivedPlanarTolerance([points, ...holes])
    : PLANAR_TOLERANCE;
  if (!normal || ![points, ...holes].every((loop) => isPlanar(loop, normal, planarTolerance))) {
    return null;
  }
  return {
    id: `solid-face-${mesh.uuid}-${planarEntry
      ? `planar-${planarEntry.index}`
      : capGroup ? (capGroup.upper ? 'upper-cap' : 'lower-cap') : faceIndex}`,
    sourceSolid: solid,
    sourceSolidDocumentId: mesh.userData.documentSolidId ?? mesh.parent?.userData?.documentSolidId ?? null,
    sourceSolidFaceIndex: faceIndex,
    sourceSolidFaceIndices: planarGroup?.indices
      ? [...planarGroup.indices]
      : capGroup?.indices ? [...capGroup.indices] : [faceIndex],
    sourceSolidObject: mesh,
    sourceSolidGroup: mesh.parent ?? null,
    points: points.map((point) => ({ x: point.x, y: point.y, z: point.z })),
    holes: holes.map((loop) => loop.map((point) => ({ x: point.x, y: point.y, z: point.z }))),
    normal: { x: normal.x, y: normal.y, z: normal.z },
    cadProfileVertexIndices: planarGroup?.cadProfileVertexIndices ?? points.map((_, index) => index),
    smoothProfileVertexIndices: planarGroup?.smoothProfileVertexIndices ?? [],
    holeCadProfileVertexIndices: planarGroup?.holeCadProfileVertexIndices ??
      holes.map((loop) => loop.map((_, index) => index)),
    holeSmoothProfileVertexIndices: planarGroup?.holeSmoothProfileVertexIndices ??
      holes.map(() => []),
  };
}

export function solidFaceFromMeshHit(hit) {
  const mesh = hit?.object;
  const faceIndex = mesh?.geometry?.userData?.webcadFaceTriangleMap?.[hit?.faceIndex];
  return Number.isInteger(faceIndex) ? solidFaceFromMeshFace(mesh, faceIndex) : null;
}

export function solidFaceFromPlanarGroup(mesh, planarGroupIndex) {
  const solid = mesh?.userData?.solid;
  const group = solid?.metadata?.planarFaceGroups?.[planarGroupIndex];
  const faceIndex = group?.indices?.[0];
  return Number.isInteger(faceIndex)
    ? solidFaceFromMeshFace(mesh, faceIndex, { group, index: planarGroupIndex })
    : null;
}

export function createSolidFaceSelectionMesh(face) {
  const normal = vectorFromPoint(face?.normal);
  if (normal.lengthSq() <= NORMAL_EPSILON) return null;
  normal.normalize();
  const points = Array.isArray(face?.points) ? face.points : [];
  const holes = Array.isArray(face?.holes) ? face.holes : [];
  if (points.length < 3) return null;
  const allPoints = [points, ...holes].flat();
  const positions = new Float32Array(allPoints.length * 3);
  allPoints.forEach((point, index) => {
    const offsetPoint = vectorFromPoint(point).addScaledVector(normal, FACE_HIGHLIGHT_OFFSET);
    const offset = index * 3;
    positions[offset] = offsetPoint.x;
    positions[offset + 1] = offsetPoint.y;
    positions[offset + 2] = offsetPoint.z;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(triangleIndicesForFace(points, normal, holes));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  const material = new THREE.MeshBasicMaterial({
    color: FACE_SELECTED_COLOR,
    depthTest: false,
    depthWrite: false,
    opacity: 0.72,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `webcad-selected-${face.id}`;
  mesh.renderOrder = SOLID_FACE_SELECTION_RENDER_ORDER;
  mesh.userData = {
    type: 'webcad-push-solid-face-selection',
    faceId: face.id,
    face,
    selectedColor: FACE_SELECTED_COLOR,
    transientSelection: true,
  };
  return mesh;
}

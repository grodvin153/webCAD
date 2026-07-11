/* webCAD - Seleccion de caras planas de solidos Push experimentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

const PLANAR_TOLERANCE = 1e-7;
const NORMAL_EPSILON = 1e-12;
const FACE_SELECTED_COLOR = 0xffd166;
const FACE_HIGHLIGHT_OFFSET = 0.006;

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

function profileSizeFromExtrusion(solid) {
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
    Array.isArray(solid?.metadata?.smoothProfileVertexIndices)
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

function triangleIndicesForFace(points, normal) {
  const projected = points.map((point) => projectedPoint(point, normal));
  const triangles = THREE.ShapeUtils.triangulateShape(projected, []);
  if (triangles.length) {
    return triangles.flat();
  }
  return points.slice(1, -1).flatMap((_, index) => [0, index + 1, index + 2]);
}

export function solidFaceFromMeshHit(hit) {
  const mesh = hit?.object;
  if (mesh?.userData?.type !== 'webcad-push-solid') return null;
  const solid = mesh.userData.solid;
  const faceIndex = mesh.geometry?.userData?.webcadFaceTriangleMap?.[hit.faceIndex];
  const face = solid?.faces?.[faceIndex];
  if (!Array.isArray(face) || face.length < 3 || !Array.isArray(solid?.vertices)) return null;
  if (isGeneratedCurvedSideFace(solid, faceIndex)) return null;
  const points = face.map((vertexIndex) => solid.vertices[vertexIndex]).filter(Boolean);
  const normal = faceNormal(points);
  if (!normal || !isPlanar(points, normal)) return null;
  const orientedNormal = outwardNormal(normal, points, solid);
  return {
    id: `solid-face-${mesh.uuid}-${faceIndex}`,
    sourceSolid: solid,
    sourceSolidDocumentId: mesh.userData.documentSolidId ?? mesh.parent?.userData?.documentSolidId ?? null,
    sourceSolidFaceIndex: faceIndex,
    sourceSolidObject: mesh,
    sourceSolidGroup: mesh.parent ?? null,
    points: points.map((point) => ({ x: point.x, y: point.y, z: point.z })),
    normal: { x: orientedNormal.x, y: orientedNormal.y, z: orientedNormal.z },
    cadProfileVertexIndices: points.map((_, index) => index),
    smoothProfileVertexIndices: [],
  };
}

export function createSolidFaceSelectionMesh(face) {
  const normal = vectorFromPoint(face?.normal);
  if (normal.lengthSq() <= NORMAL_EPSILON) return null;
  normal.normalize();
  const points = Array.isArray(face?.points) ? face.points : [];
  if (points.length < 3) return null;
  const positions = new Float32Array(points.length * 3);
  points.forEach((point, index) => {
    const offsetPoint = vectorFromPoint(point).addScaledVector(normal, FACE_HIGHLIGHT_OFFSET);
    const offset = index * 3;
    positions[offset] = offsetPoint.x;
    positions[offset + 1] = offsetPoint.y;
    positions[offset + 2] = offsetPoint.z;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(triangleIndicesForFace(points, normal));
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
  mesh.renderOrder = 32;
  mesh.userData = {
    type: 'webcad-push-solid-face-selection',
    faceId: face.id,
    face,
    selectedColor: FACE_SELECTED_COLOR,
    transientSelection: true,
  };
  return mesh;
}

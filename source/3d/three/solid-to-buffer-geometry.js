/* webCAD - Adaptador experimental Solid3d a Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { isValidSolid3d } from '../solid.js';

const PROJECTED_EPSILON = 1e-9;
const NORMAL_EPSILON = 1e-12;

function projectedArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area * 0.5;
}

function triangleArea(a, b, c) {
  return ((a.x * (b.y - c.y)) + (b.x * (c.y - a.y)) + (c.x * (a.y - b.y))) * 0.5;
}

function triangulateFace(face, vertices) {
  if (face.length === 3) {
    return [...face];
  }
  const projectedPoints = face.map((vertexIndex) => {
    const vertex = vertices[vertexIndex];
    return new THREE.Vector2(vertex.x, vertex.y);
  });
  const faceArea = projectedArea(projectedPoints);
  if (Math.abs(faceArea) <= PROJECTED_EPSILON) {
    if (face.length === 4) {
      return [face[0], face[1], face[2], face[0], face[2], face[3]];
    }
    return face.slice(1, -1).flatMap((_, index) => [face[0], face[index + 1], face[index + 2]]);
  }
  const triangles = THREE.ShapeUtils.triangulateShape(projectedPoints, []);
  if (triangles.length) {
    const faceSign = Math.sign(faceArea);
    return triangles.flatMap((triangle) => {
      const triangleSign = Math.sign(triangleArea(
        projectedPoints[triangle[0]],
        projectedPoints[triangle[1]],
        projectedPoints[triangle[2]],
      ));
      const orderedTriangle = triangleSign && triangleSign !== faceSign
        ? [triangle[0], triangle[2], triangle[1]]
        : triangle;
      return orderedTriangle.map((localIndex) => face[localIndex]);
    });
  }
  return face.slice(1, -1).flatMap((_, index) => [face[0], face[index + 1], face[index + 2]]);
}

function profileSizeFromExtrusion(solid) {
  const lowerFaceSize = solid.faces?.[0]?.length;
  const upperFaceSize = solid.faces?.[1]?.length;
  if (!Number.isInteger(lowerFaceSize) || lowerFaceSize < 3 || lowerFaceSize !== upperFaceSize) {
    return null;
  }
  if (solid.vertices.length !== lowerFaceSize * 2) return null;
  return lowerFaceSize;
}

function profileSignedArea(vertices, profileSize) {
  let area = 0;
  for (let index = 0; index < profileSize; index += 1) {
    const current = vertices[index];
    const next = vertices[(index + 1) % profileSize];
    area += current.x * next.y - next.x * current.y;
  }
  return area * 0.5;
}

function normalizedVector(vector, fallback = new THREE.Vector3(0, 0, 1)) {
  return vector.lengthSq() > NORMAL_EPSILON ? vector.normalize() : fallback.clone();
}

function faceNormal(face, vertices) {
  const points = face.map((index) => vertices[index]).filter(Boolean);
  for (let index = 1; index < points.length - 1; index += 1) {
    const normal = new THREE.Vector3(
      points[index].x - points[0].x,
      points[index].y - points[0].y,
      points[index].z - points[0].z,
    ).cross(new THREE.Vector3(
      points[index + 1].x - points[0].x,
      points[index + 1].y - points[0].y,
      points[index + 1].z - points[0].z,
    ));
    if (normal.lengthSq() > NORMAL_EPSILON) return normal.normalize();
  }
  return new THREE.Vector3(0, 0, 1);
}

function edgeOutwardNormal(start, end, clockwiseProfile) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const normal = clockwiseProfile
    ? new THREE.Vector3(-dy, dx, 0)
    : new THREE.Vector3(dy, -dx, 0);
  return normalizedVector(normal, new THREE.Vector3(1, 0, 0));
}

function smoothProfileNormals(vertices, profileSize) {
  const clockwiseProfile = profileSignedArea(vertices, profileSize) < 0;
  return Array.from({ length: profileSize }, (_, index) => {
    const previous = vertices[(index - 1 + profileSize) % profileSize];
    const current = vertices[index];
    const next = vertices[(index + 1) % profileSize];
    const previousNormal = edgeOutwardNormal(previous, current, clockwiseProfile);
    const nextNormal = edgeOutwardNormal(current, next, clockwiseProfile);
    return normalizedVector(previousNormal.add(nextNormal), nextNormal);
  });
}

function pushTriangle(buffers, vertices, triangle, normalForVertex) {
  triangle.forEach((vertexIndex) => {
    const vertex = vertices[vertexIndex];
    const normal = normalForVertex(vertexIndex);
    buffers.positions.push(vertex.x, vertex.y, vertex.z);
    buffers.normals.push(normal.x, normal.y, normal.z);
  });
}

function sideProfileIndex(vertexIndex, profileSize) {
  return vertexIndex >= profileSize ? vertexIndex - profileSize : vertexIndex;
}

function isVerticalSideFace(face, profileSize) {
  if (face.length !== 4) return false;
  const indices = face.map((vertexIndex) => sideProfileIndex(vertexIndex, profileSize));
  return indices[0] === indices[3] && indices[1] === indices[2];
}

function smoothExtrusionGeometry(solid, profileSize, smoothIndices) {
  const buffers = {
    normals: [],
    positions: [],
  };
  const faceTriangleMap = [];
  const smoothProfileNormalsByIndex = smoothProfileNormals(solid.vertices, profileSize);
  solid.faces.forEach((face, faceIndex) => {
    const triangles = triangulateFace(face, solid.vertices);
    const flatNormal = faceNormal(face, solid.vertices);
    const verticalSide = isVerticalSideFace(face, profileSize);
    const sideSmooth = verticalSide && face.some((vertexIndex) =>
      smoothIndices.has(sideProfileIndex(vertexIndex, profileSize)));
    for (let index = 0; index < triangles.length; index += 3) {
      const triangle = triangles.slice(index, index + 3);
      pushTriangle(buffers, solid.vertices, triangle, (vertexIndex) => {
        if (!sideSmooth) return flatNormal;
        const profileIndex = sideProfileIndex(vertexIndex, profileSize);
        const smoothNormal = smoothProfileNormalsByIndex[profileIndex] ?? flatNormal;
        return smoothNormal.dot(flatNormal) < 0 ? smoothNormal.clone().multiplyScalar(-1) : smoothNormal;
      });
      faceTriangleMap.push(faceIndex);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(buffers.positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(buffers.normals, 3));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.userData.webcadRenderMode = 'smooth-extrusion';
  geometry.userData.webcadFaceTriangleMap = faceTriangleMap;
  return geometry;
}

export function solid3dToBufferGeometry(solid) {
  if (!isValidSolid3d(solid)) {
    throw new TypeError('No se puede convertir un Solid3d no valido');
  }

  const smoothIndices = new Set(
    Array.isArray(solid.metadata?.smoothProfileVertexIndices)
      ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  const profileSize = profileSizeFromExtrusion(solid);
  if (profileSize && smoothIndices.size > 0) {
    const geometry = smoothExtrusionGeometry(solid, profileSize, smoothIndices);
    geometry.userData.webcadMetadata = solid.metadata && typeof solid.metadata === 'object'
      ? { ...solid.metadata }
      : solid.metadata ?? null;
    return geometry;
  }

  const positions = new Float32Array(solid.vertices.length * 3);
  solid.vertices.forEach((vertex, index) => {
    const offset = index * 3;
    positions[offset] = vertex.x;
    positions[offset + 1] = vertex.y;
    positions[offset + 2] = vertex.z;
  });
  const faceTriangleMap = [];
  const triangleIndices = solid.faces.flatMap((face, faceIndex) => {
    const triangles = triangulateFace(face, solid.vertices);
    for (let index = 0; index < triangles.length; index += 3) {
      faceTriangleMap.push(faceIndex);
    }
    return triangles;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(triangleIndices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.userData.webcadMetadata = solid.metadata && typeof solid.metadata === 'object'
    ? { ...solid.metadata }
    : solid.metadata ?? null;
  geometry.userData.webcadFaceTriangleMap = faceTriangleMap;
  return geometry;
}

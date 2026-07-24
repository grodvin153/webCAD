/* webCAD - Adaptador experimental Solid3d a Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { normalizeSketchPlane, pointFromSketchPlane } from '../sketch-plane.js';
import { isValidSolid3d } from '../solid.js';
import { profileTangencyIndices } from './profile-tangency.js';

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

function profilePoint(point, plane) {
  const local = pointFromSketchPlane(point, plane);
  return new THREE.Vector2(local.x, local.y);
}

function faceProjection(face, vertices) {
  const normal = faceNormal(face, vertices);
  const reference = Math.abs(normal.z) < 0.9
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(0, 1, 0);
  const xAxis = reference.cross(normal).normalize();
  const yAxis = normal.clone().cross(xAxis).normalize();
  return face.map((vertexIndex) => {
    const vertex = vertices[vertexIndex];
    const point = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
    return new THREE.Vector2(point.dot(xAxis), point.dot(yAxis));
  });
}

function triangulateFace(face, vertices) {
  if (face.length === 3) {
    return [...face];
  }
  const projectedPoints = faceProjection(face, vertices);
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
  const metadataSize = Number(solid.metadata?.profileSize);
  if (Number.isInteger(metadataSize) && metadataSize >= 3 && solid.vertices.length === metadataSize * 2) {
    return metadataSize;
  }
  const lowerFaceSize = solid.faces?.[0]?.length;
  const upperFaceSize = solid.faces?.[1]?.length;
  if (!Number.isInteger(lowerFaceSize) || lowerFaceSize < 3 || lowerFaceSize !== upperFaceSize) {
    return null;
  }
  if (solid.vertices.length !== lowerFaceSize * 2) return null;
  return lowerFaceSize;
}

function profileSignedArea(vertices, startIndex, profileSize, plane) {
  let area = 0;
  for (let index = 0; index < profileSize; index += 1) {
    const current = vertices[startIndex + index];
    const next = vertices[startIndex + (index + 1) % profileSize];
    const currentPoint = profilePoint(current, plane);
    const nextPoint = profilePoint(next, plane);
    area += currentPoint.x * nextPoint.y - nextPoint.x * currentPoint.y;
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

function edgeOutwardNormal(start, end, clockwiseProfile, plane) {
  const first = profilePoint(start, plane);
  const second = profilePoint(end, plane);
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const localNormal = clockwiseProfile ? { x: -dy, y: dx } : { x: dy, y: -dx };
  const definition = normalizeSketchPlane(plane);
  const normal = new THREE.Vector3(
    definition.xAxis.x * localNormal.x + definition.yAxis.x * localNormal.y,
    definition.xAxis.y * localNormal.x + definition.yAxis.y * localNormal.y,
    definition.xAxis.z * localNormal.x + definition.yAxis.z * localNormal.y,
  );
  return normalizedVector(normal, new THREE.Vector3(1, 0, 0));
}

function smoothProfileNormals(vertices, profileSize, loopSizes = [profileSize], plane = 'XY') {
  const normals = Array(profileSize).fill(null);
  let startIndex = 0;
  loopSizes.forEach((loopSize) => {
    const clockwiseProfile = profileSignedArea(vertices, startIndex, loopSize, plane) < 0;
    for (let index = 0; index < loopSize; index += 1) {
      const previous = vertices[startIndex + (index - 1 + loopSize) % loopSize];
      const current = vertices[startIndex + index];
      const next = vertices[startIndex + (index + 1) % loopSize];
      const previousNormal = edgeOutwardNormal(previous, current, clockwiseProfile, plane);
      const nextNormal = edgeOutwardNormal(current, next, clockwiseProfile, plane);
      normals[startIndex + index] = normalizedVector(previousNormal.add(nextNormal), nextNormal);
    }
    startIndex += loopSize;
  });
  return normals;
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
  const smoothProfileNormalsByIndex = smoothProfileNormals(
    solid.vertices,
    profileSize,
    solid.metadata?.profileLoopSizes || [profileSize],
    solid.metadata?.workplane ?? solid.metadata?.sketchPlane ?? 'XY',
  );
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

function geometryFromStoredNormals(solid) {
  const stored = solid.metadata?.faceVertexNormals;
  if (!Array.isArray(stored) || stored.length !== solid.faces.length ||
      solid.faces.some((face, index) => stored[index]?.length !== face.length)) return null;
  const positions = [];
  const normals = [];
  const faceTriangleMap = [];
  solid.faces.forEach((face, faceIndex) => {
    const triangles = triangulateFace(face, solid.vertices);
    triangles.forEach((vertexIndex) => {
      const cornerIndex = face.indexOf(vertexIndex);
      const vertex = solid.vertices[vertexIndex];
      const normal = stored[faceIndex][cornerIndex];
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
    });
    for (let index = 0; index < triangles.length; index += 3) faceTriangleMap.push(faceIndex);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  geometry.userData.webcadFaceTriangleMap = faceTriangleMap;
  geometry.userData.webcadRenderMode = 'stored-normals';
  return geometry;
}

export function solid3dToBufferGeometry(solid) {
  if (!isValidSolid3d(solid)) {
    throw new TypeError('No se puede convertir un Solid3d no valido');
  }

  const storedNormalsGeometry = geometryFromStoredNormals(solid);
  if (storedNormalsGeometry) {
    storedNormalsGeometry.userData.webcadMetadata = solid.metadata && typeof solid.metadata === 'object'
      ? { ...solid.metadata }
      : solid.metadata ?? null;
    return storedNormalsGeometry;
  }

  const smoothIndices = new Set(
    Array.isArray(solid.metadata?.smoothVerticalEdgeIndices)
      ? solid.metadata.smoothVerticalEdgeIndices
      : Array.isArray(solid.metadata?.smoothProfileVertexIndices)
        ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  profileTangencyIndices(solid, solid.metadata?.cadProfileVertexIndices)
    .forEach((index) => smoothIndices.add(index));
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

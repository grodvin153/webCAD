/* webCAD - Modelo de solido 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

function cloneVertex(vertex) {
  return {
    x: Number(vertex?.x),
    y: Number(vertex?.y),
    z: vertex?.z === undefined ? 0 : Number(vertex.z),
  };
}

function cloneMetadata(metadata) {
  return metadata && typeof metadata === 'object'
    ? { ...metadata }
    : metadata ?? null;
}

function validVertexIndex(index, vertexCount) {
  return Number.isInteger(index) && index >= 0 && index < vertexCount;
}

export function createSolid3d({ vertices = [], faces = [], edges = [], metadata = null } = {}) {
  return {
    vertices: vertices.map(cloneVertex),
    faces: faces.map((face) => [...face]),
    edges: edges.map((edge) => [...edge]),
    metadata: cloneMetadata(metadata),
  };
}

export function computeSolidBounds3d(solid) {
  if (!Array.isArray(solid?.vertices) || solid.vertices.length === 0) {
    return null;
  }

  const bounds = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    minZ: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    maxZ: Number.NEGATIVE_INFINITY,
  };
  for (const vertex of solid.vertices) {
    if (![vertex?.x, vertex?.y, vertex?.z].every(Number.isFinite)) {
      return null;
    }
    bounds.minX = Math.min(bounds.minX, vertex.x);
    bounds.minY = Math.min(bounds.minY, vertex.y);
    bounds.minZ = Math.min(bounds.minZ, vertex.z);
    bounds.maxX = Math.max(bounds.maxX, vertex.x);
    bounds.maxY = Math.max(bounds.maxY, vertex.y);
    bounds.maxZ = Math.max(bounds.maxZ, vertex.z);
  }
  return bounds;
}

export function cloneSolid3d(solid) {
  return createSolid3d(solid);
}

export function isValidSolid3d(solid) {
  if (!Array.isArray(solid?.vertices) || solid.vertices.length < 3 ||
      !Array.isArray(solid.faces) || solid.faces.length === 0 ||
      !Array.isArray(solid.edges)) {
    return false;
  }
  if (!solid.vertices.every((vertex) =>
    Number.isFinite(vertex?.x) && Number.isFinite(vertex?.y) && Number.isFinite(vertex?.z))) {
    return false;
  }

  const vertexCount = solid.vertices.length;
  const validFaces = solid.faces.every((face) =>
    Array.isArray(face) && face.length >= 3 &&
    face.every((index) => validVertexIndex(index, vertexCount)) &&
    new Set(face).size === face.length);
  const validEdges = solid.edges.every((edge) =>
    Array.isArray(edge) && edge.length === 2 && edge[0] !== edge[1] &&
    edge.every((index) => validVertexIndex(index, vertexCount)));
  return validFaces && validEdges;
}

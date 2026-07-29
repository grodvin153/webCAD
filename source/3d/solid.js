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

export function auditSolid3dTopology(solid, options = {}) {
  const errors = [];
  const fatalErrors = [];
  if (!isValidSolid3d(solid)) {
    return {
      valid: false,
      closed: false,
      errors: ['invalid-solid-contract'],
      fatalErrors: ['invalid-solid-contract'],
      stats: null,
    };
  }
  const bounds = computeSolidBounds3d(solid);
  const scale = Math.max(
    bounds.maxX - bounds.minX,
    bounds.maxY - bounds.minY,
    bounds.maxZ - bounds.minZ,
    1,
  );
  const minimumDoubleArea = Number.EPSILON * scale * scale;
  const topologyTolerance = Number.isFinite(options.weldTolerance) &&
    options.weldTolerance > 0
    ? options.weldTolerance
    : 1e-6;
  const clusters = [];
  const clusterBuckets = new Map();
  const bucketKey = (x, y, z) => `${x}:${y}:${z}`;
  const vertexKeys = solid.vertices.map((vertex) => {
    const cell = [
      Math.floor(vertex.x / topologyTolerance),
      Math.floor(vertex.y / topologyTolerance),
      Math.floor(vertex.z / topologyTolerance),
    ];
    let clusterIndex = null;
    let clusterDistance = topologyTolerance;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const candidates = clusterBuckets.get(bucketKey(
            cell[0] + x,
            cell[1] + y,
            cell[2] + z,
          )) ?? [];
          candidates.forEach((candidateIndex) => {
            const candidate = clusters[candidateIndex];
            const candidateDistance = Math.hypot(
              vertex.x - candidate.x,
              vertex.y - candidate.y,
              vertex.z - candidate.z,
            );
            if (candidateDistance <= clusterDistance) {
              clusterIndex = candidateIndex;
              clusterDistance = candidateDistance;
            }
          });
        }
      }
    }
    if (clusterIndex !== null) return clusterIndex;
    const nextIndex = clusters.length;
    clusters.push(vertex);
    const key = bucketKey(cell[0], cell[1], cell[2]);
    if (!clusterBuckets.has(key)) clusterBuckets.set(key, []);
    clusterBuckets.get(key).push(nextIndex);
    return nextIndex;
  });
  const edgeUses = new Map();
  solid.faces.forEach((face, faceIndex) => {
    const origin = solid.vertices[face[0]];
    let doubleArea = 0;
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = solid.vertices[face[index]];
      const third = solid.vertices[face[index + 1]];
      const ab = {
        x: second.x - origin.x,
        y: second.y - origin.y,
        z: second.z - origin.z,
      };
      const ac = {
        x: third.x - origin.x,
        y: third.y - origin.y,
        z: third.z - origin.z,
      };
      doubleArea += Math.hypot(
        ab.y * ac.z - ab.z * ac.y,
        ab.z * ac.x - ab.x * ac.z,
        ab.x * ac.y - ab.y * ac.x,
      );
    }
    if (doubleArea <= minimumDoubleArea) {
      errors.push(`degenerate-face:${faceIndex}`);
      fatalErrors.push(`degenerate-face:${faceIndex}`);
    }
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const startKey = vertexKeys[start];
      const endKey = vertexKeys[end];
      if (startKey === endKey) {
        errors.push(`degenerate-edge:${faceIndex}:${start}:${end}`);
        fatalErrors.push(`degenerate-edge:${faceIndex}:${start}:${end}`);
        return;
      }
      const key = startKey < endKey
        ? `${startKey}:${endKey}`
        : `${endKey}:${startKey}`;
      if (!edgeUses.has(key)) edgeUses.set(key, []);
      edgeUses.get(key).push({
        faceIndex,
        direction: startKey < endKey ? 1 : -1,
      });
    });
  });
  if (options.requireClosed !== false) {
    edgeUses.forEach((uses, key) => {
      if (uses.length !== 2) {
        errors.push(`open-or-nonmanifold-edge:${key}:${uses.length}`);
        if (uses.length > 2) {
          fatalErrors.push(`nonmanifold-edge:${key}:${uses.length}`);
        }
      }
      else if (uses[0].direction === uses[1].direction) {
        errors.push(`inconsistent-edge-orientation:${key}`);
        fatalErrors.push(`inconsistent-edge-orientation:${key}`);
      }
    });
  }
  const surfaceFaceIds = solid.metadata?.surfaceFaceIds;
  if (surfaceFaceIds !== undefined && surfaceFaceIds !== null &&
      (!Array.isArray(surfaceFaceIds) && !ArrayBuffer.isView(surfaceFaceIds) ||
        surfaceFaceIds.length !== solid.faces.length)) {
    errors.push('invalid-surface-face-ids');
    fatalErrors.push('invalid-surface-face-ids');
  }
  const assignedPlanarFaces = new Set();
  (solid.metadata?.planarFaceGroups ?? []).forEach((group, groupIndex) => {
    if (!Array.isArray(group?.indices) || !group.indices.length ||
        group.indices.some((faceIndex) =>
          !Number.isInteger(faceIndex) ||
          faceIndex < 0 ||
          faceIndex >= solid.faces.length)) {
      errors.push(`invalid-planar-face-group:${groupIndex}`);
      fatalErrors.push(`invalid-planar-face-group:${groupIndex}`);
      return;
    }
    group.indices.forEach((faceIndex) => {
      if (assignedPlanarFaces.has(faceIndex)) {
        errors.push(`overlapping-planar-face-group:${faceIndex}`);
        fatalErrors.push(`overlapping-planar-face-group:${faceIndex}`);
      }
      assignedPlanarFaces.add(faceIndex);
    });
    if (!Array.isArray(group.outerLoop) || group.outerLoop.length < 3) {
      errors.push(`invalid-planar-face-boundary:${groupIndex}`);
      fatalErrors.push(`invalid-planar-face-boundary:${groupIndex}`);
    }
  });
  const openEdges = [...edgeUses.entries()].filter(([, uses]) =>
    uses.length !== 2);
  const openEdgeLengths = openEdges.map(([key]) => {
    const [first, second] = key.split(':').map(Number);
    return Math.hypot(
      clusters[first].x - clusters[second].x,
      clusters[first].y - clusters[second].y,
      clusters[first].z - clusters[second].z,
    );
  });
  const microBoundaryTolerance =
    Number.isFinite(options.microBoundaryTolerance) &&
    options.microBoundaryTolerance > 0
      ? options.microBoundaryTolerance
      : 0;
  const openBoundaryDegree = new Map();
  openEdges.forEach(([key, uses]) => {
    if (uses.length !== 1) return;
    key.split(':').map(Number).forEach((vertexIndex) => {
      openBoundaryDegree.set(
        vertexIndex,
        (openBoundaryDegree.get(vertexIndex) ?? 0) + 1,
      );
    });
  });
  const reconciledMicroBoundary = openEdges.length > 0 &&
    openEdges.every(([, uses]) => uses.length === 1) &&
    [...openBoundaryDegree.values()].every((degree) => degree === 2) &&
    openEdgeLengths.reduce((total, length) => total + length, 0) <=
      microBoundaryTolerance * 3;
  return {
    valid: fatalErrors.length === 0,
    closed: reconciledMicroBoundary || !errors.some((error) =>
      error.startsWith('open-or-nonmanifold-edge:')),
    errors,
    fatalErrors,
    stats: {
      edgeCount: edgeUses.size,
      faceCount: solid.faces.length,
      maxOpenEdgeLength: openEdgeLengths.length
        ? Math.max(...openEdgeLengths)
        : 0,
      openEdgeCount: openEdges.length,
      totalOpenEdgeLength: openEdgeLengths.reduce((total, length) =>
        total + length, 0),
      planarFaceCount: assignedPlanarFaces.size,
      reconciledMicroBoundary,
      vertexCount: solid.vertices.length,
    },
  };
}

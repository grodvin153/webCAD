/* webCAD - Geometria aislada para Push 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { createExactExtrusion } from '../exact-extrusion.js';
import { exactProfileFromEntity } from '../exact-profile.js';
import { extrudeClosedProfile } from '../extrusion.js';
import { createSolid3d, isValidSolid3d } from '../solid.js';
import { solid3dToBufferGeometry } from './solid-to-buffer-geometry.js';
import { createWideLineSegments } from './three-scene-style.js';

const SOLID_INTEGRITY_EPSILON = 1e-6;

export const PUSH_SOLID_STYLE = {
  edgeColor: 0x000000,
  edgeLineWidth: 3.2,
  edgeRenderOrder: 28,
  faceColor: 0xffffff,
  previewFaceColor: 0xf6f8fb,
};

export function pushSourceKeyFromEntity(entity) {
  const sourceEntityId = entity?.id ?? entity?.handle ?? null;
  if (sourceEntityId !== null && sourceEntityId !== undefined) {
    return `${entity?.type ?? entity?.kind ?? 'ENTITY'}:${sourceEntityId}`;
  }
  return null;
}

export function pushSourceKeyFromFace(face) {
  const entity = face?.sourceEntity;
  const entityKey = pushSourceKeyFromEntity(entity);
  if (entityKey) return entityKey;
  if (face?.sourceSolidFaceIndex !== undefined && face?.id) return `solid-face:${face.id}`;
  return face?.id ? `face:${face.id}` : null;
}

export function pushHeightValue(height) {
  const value = Number(height);
  if (!Number.isFinite(value) || Math.abs(value) <= 1e-9) {
    return null;
  }
  return value;
}

function normalizedNormal(normal) {
  const vector = new THREE.Vector3(
    Number(normal?.x),
    Number(normal?.y),
    Number(normal?.z),
  );
  return vector.lengthSq() > 1e-12 ? vector.normalize() : null;
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function unavailableExactGeometry(reason, details = {}) {
  return {
    status: 'unavailable',
    reason,
    ...cloneJson(details),
  };
}

function pendingExactGeometry(reason, details = {}) {
  return {
    status: 'pending',
    reason,
    ...cloneJson(details),
  };
}

function exactGeometryFromProfilePush(face, distance) {
  const sourceEntity = face?.sourceEntity;
  const faceExactProfile = face?.exactProfile ? cloneJson(face.exactProfile) : null;
  if (!sourceEntity && !faceExactProfile) {
    if (face?.sourceSolidFaceIndex !== undefined) {
      return pendingExactGeometry('face-push-exact-brep-not-implemented', {
        operation: {
          type: 'pushMoveFace',
          sourceSolidFaceIndex: face.sourceSolidFaceIndex,
          distance,
        },
      });
    }
    return unavailableExactGeometry('missing-source-entity');
  }
  const profile = faceExactProfile || exactProfileFromEntity(sourceEntity);
  if (!profile) {
    return unavailableExactGeometry('unsupported-source-entity', {
      source: {
        entityId: sourceEntity?.id ?? sourceEntity?.handle ?? null,
        entityType: sourceEntity?.type ?? face?.sourceEntityType ?? null,
      },
    });
  }
  const extrusion = createExactExtrusion(profile, distance, {
    direction: { x: 0, y: 0, z: 1 },
    metadata: {
      sourceKey: pushSourceKeyFromFace(face),
      visualPushDistance: distance,
    },
  });
  if (!extrusion) {
    return unavailableExactGeometry('exact-extrusion-failed', {
      source: profile.source,
    });
  }
  return {
    status: 'available',
    representation: 'exact-extrusion-v1',
    profile,
    extrusion,
  };
}

function vertexVector(vertex) {
  return new THREE.Vector3(
    Number(vertex?.x),
    Number(vertex?.y),
    Number(vertex?.z),
  );
}

function triangleArea3d(first, second, third) {
  return vertexVector(second).sub(vertexVector(first))
    .cross(vertexVector(third).sub(vertexVector(first)))
    .length() * 0.5;
}

function faceArea3d(face, vertices) {
  if (!Array.isArray(face) || face.length < 3) return 0;
  const origin = vertices[face[0]];
  let area = 0;
  for (let index = 1; index < face.length - 1; index += 1) {
    area += triangleArea3d(origin, vertices[face[index]], vertices[face[index + 1]]);
  }
  return area;
}

function facesHaveArea(solid) {
  return solid.faces.every((face) => faceArea3d(face, solid.vertices) > SOLID_INTEGRITY_EPSILON);
}

function movedFaceKeepsMaterial(sourceSolid, sourceFace, unitNormal, distance) {
  const movingVertices = new Set(sourceFace);
  return sourceSolid.edges.every((edge) => {
    const firstMoves = movingVertices.has(edge[0]);
    const secondMoves = movingVertices.has(edge[1]);
    if (firstMoves === secondMoves) return true;
    const movingIndex = firstMoves ? edge[0] : edge[1];
    const fixedIndex = firstMoves ? edge[1] : edge[0];
    const originalThickness = vertexVector(sourceSolid.vertices[movingIndex])
      .sub(vertexVector(sourceSolid.vertices[fixedIndex]))
      .dot(unitNormal);
    if (originalThickness <= SOLID_INTEGRITY_EPSILON) return true;
    return originalThickness + distance > SOLID_INTEGRITY_EPSILON;
  });
}

export function isPushSolidIntegrityValid(solid) {
  return isValidSolid3d(solid) && facesHaveArea(solid);
}

function extrudePlanarFace(points, normal, distance, options = {}) {
  const unitNormal = normalizedNormal(normal);
  if (!unitNormal) {
    throw new TypeError('La cara seleccionada no tiene una normal valida');
  }
  if (points.length < 3 || points.some((point) =>
    ![point.x, point.y, point.z].every(Number.isFinite))) {
    throw new TypeError('El perfil de extrusion contiene coordenadas no validas');
  }
  const offset = unitNormal.clone().multiplyScalar(distance);
  const profileSize = points.length;
  const vertices = [
    ...points,
    ...points.map((point) => ({
      x: point.x + offset.x,
      y: point.y + offset.y,
      z: point.z + offset.z,
    })),
  ];
  const lowerFace = Array.from({ length: profileSize }, (_, index) => index);
  const upperFace = Array.from({ length: profileSize }, (_, index) => profileSize + index);
  const faces = distance > 0
    ? [lowerFace.slice().reverse(), upperFace]
    : [lowerFace, upperFace.slice().reverse()];
  const edges = [];
  for (let index = 0; index < profileSize; index += 1) {
    const next = (index + 1) % profileSize;
    const lowerIndex = index;
    const lowerNext = next;
    const upperIndex = profileSize + index;
    const upperNext = profileSize + next;
    faces.push(distance > 0
      ? [lowerIndex, lowerNext, upperNext, upperIndex]
      : [lowerIndex, upperIndex, upperNext, lowerNext]);
    edges.push(
      [lowerIndex, lowerNext],
      [upperIndex, upperNext],
      [lowerIndex, upperIndex],
    );
  }
  return createSolid3d({
    vertices,
    faces,
    edges,
    metadata: {
      type: 'extrusion',
      distance,
      normal: { x: unitNormal.x, y: unitNormal.y, z: unitNormal.z },
      source: options.source ?? null,
    },
  });
}

export function solidFromFacePush(face, height, options = {}) {
  const cleanHeight = pushHeightValue(height);
  if (cleanHeight === null) {
    throw new RangeError('La altura de Push debe ser distinta de cero');
  }
  const points = (Array.isArray(face?.points) ? face.points : []).map((point) => ({
    x: Number(point.x),
    y: Number(point.y),
    z: Number(point.z) || 0,
  }));
  const source = options.source ?? face?.id ?? null;
  const solid = face?.normal
    ? extrudePlanarFace(points, face.normal, cleanHeight, { source })
    : extrudeClosedProfile(points, cleanHeight, { source });
  solid.metadata = {
    ...solid.metadata,
    type: 'push',
    faceId: face?.id ?? null,
    height: cleanHeight,
    distance: cleanHeight,
    normal: face?.normal ? { ...face.normal } : (solid.metadata?.normal ?? null),
    sourceEntity: face?.sourceEntity ?? null,
    sourceEntityId: face?.sourceEntity?.id ?? face?.sourceEntity?.handle ?? null,
    sourceFaceType: face?.sourceEntityType ?? null,
    sourceSolidFaceIndex: face?.sourceSolidFaceIndex ?? null,
    sourceKey: pushSourceKeyFromFace(face),
    exactGeometry: exactGeometryFromProfilePush(face, cleanHeight),
    cadProfileVertexIndices: Array.isArray(face?.cadProfileVertexIndices)
      ? [...face.cadProfileVertexIndices]
      : [],
    smoothProfileVertexIndices: Array.isArray(face?.smoothProfileVertexIndices)
      ? [...face.smoothProfileVertexIndices]
      : [],
  };
  return solid;
}

export function movedSolidFacePush(face, distance) {
  const cleanDistance = pushHeightValue(distance);
  const sourceSolid = face?.sourceSolid;
  const faceIndex = face?.sourceSolidFaceIndex;
  const unitNormal = normalizedNormal(face?.normal);
  if (cleanDistance === null) {
    throw new RangeError('La distancia de Push debe ser distinta de cero');
  }
  if (!sourceSolid || !Number.isInteger(faceIndex) || !unitNormal) {
    return null;
  }
  const sourceFace = sourceSolid.faces?.[faceIndex];
  if (!Array.isArray(sourceFace) || sourceFace.length < 3) return null;
  const offset = unitNormal.clone().multiplyScalar(cleanDistance);
  const movingVertices = new Set(sourceFace);
  if (!movedFaceKeepsMaterial(sourceSolid, sourceFace, unitNormal, cleanDistance)) {
    return null;
  }
  const vertices = sourceSolid.vertices.map((vertex, index) => movingVertices.has(index)
    ? {
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
      z: vertex.z + offset.z,
    }
    : { ...vertex });
  const movedSolid = createSolid3d({
    vertices,
    faces: sourceSolid.faces,
    edges: sourceSolid.edges,
    metadata: {
      ...(sourceSolid.metadata && typeof sourceSolid.metadata === 'object'
        ? sourceSolid.metadata
        : {}),
      type: 'push',
      exactGeometry: pendingExactGeometry('face-push-exact-brep-not-implemented', {
        operation: {
          type: 'pushMoveFace',
          sourceSolidFaceIndex: faceIndex,
          distance: cleanDistance,
          normal: face.normal,
        },
      }),
      lastPushFaceIndex: faceIndex,
      lastPushDistance: cleanDistance,
      lastPushNormal: { x: face.normal.x, y: face.normal.y, z: face.normal.z },
    },
  });
  return isPushSolidIntegrityValid(movedSolid) ? movedSolid : null;
}

export function createPushSolidMeshFromSolid(solid, options = {}) {
  const geometry = solid3dToBufferGeometry(solid);
  const material = new THREE.MeshStandardMaterial({
    color: options.faceColor ?? options.color ?? PUSH_SOLID_STYLE.faceColor,
    depthTest: true,
    depthWrite: true,
    emissive: 0x080808,
    emissiveIntensity: 0.08,
    metalness: 0,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: 2,
    polygonOffsetUnits: 2,
    roughness: 0.82,
    side: THREE.DoubleSide,
    transparent: false,
    wireframe: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name ?? `webcad-push-solid-${solid.metadata?.faceId ?? 'solid'}`;
  mesh.renderOrder = options.renderOrder ?? 18;
  mesh.userData = {
    type: 'webcad-push-solid',
    faceId: solid.metadata?.faceId ?? null,
    height: solid.metadata.height,
    normal: solid.metadata.normal,
    sourceEntity: solid.metadata.sourceEntity,
    sourceEntityId: solid.metadata.sourceEntityId,
    sourceFaceType: solid.metadata.sourceFaceType,
    sourceSolidFaceIndex: solid.metadata.sourceSolidFaceIndex,
    sourceKey: solid.metadata.sourceKey,
    exactGeometry: solid.metadata.exactGeometry,
    cadProfileVertexIndices: solid.metadata.cadProfileVertexIndices,
    smoothProfileVertexIndices: solid.metadata.smoothProfileVertexIndices,
    solid,
  };
  return mesh;
}

export function createPushSolidMesh(face, height, options = {}) {
  return createPushSolidMeshFromSolid(solidFromFacePush(face, height, options), options);
}

export function createPushEdges(mesh, options = {}) {
  const solid = mesh.userData?.solid;
  const solidVertices = Array.isArray(solid?.vertices) ? solid.vertices : [];
  const solidEdges = Array.isArray(solid?.edges) ? solid.edges : [];
  const smoothProfileVertexIndices = new Set(
    Array.isArray(solid?.metadata?.smoothProfileVertexIndices)
      ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  const cadProfileVertexIndices = new Set(
    Array.isArray(solid?.metadata?.cadProfileVertexIndices)
      ? solid.metadata.cadProfileVertexIndices
      : [],
  );
  const isCircleProfile = mesh.userData?.sourceFaceType === 'CIRCLE';
  const hideVerticalSurfaceEdges = (isCircleProfile || smoothProfileVertexIndices.size > 0) &&
    options.showVerticalSurfaceEdges !== true;
  const segments = [];
  for (const edge of solidEdges) {
    const startIndex = edge?.[0];
    const endIndex = edge?.[1];
    const start = solidVertices[startIndex];
    const end = solidVertices[endIndex];
    if (!start || !end) continue;
    if (
      hideVerticalSurfaceEdges &&
      (isCircleProfile || (
        smoothProfileVertexIndices.has(Math.min(startIndex, endIndex)) &&
        !cadProfileVertexIndices.has(Math.min(startIndex, endIndex))
      )) &&
      Math.abs(start.x - end.x) <= 1e-9 &&
      Math.abs(start.y - end.y) <= 1e-9 &&
      Math.abs(start.z - end.z) > 1e-9
    ) {
      continue;
    }
    segments.push({
      start: {
        x: start.x,
        y: start.y,
        z: start.z,
      },
      end: {
        x: end.x,
        y: end.y,
        z: end.z,
      },
    });
  }
  const edges = createWideLineSegments(segments, {
    color: options.edgeColor ?? options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthTest: options.showHiddenEdges === true ? false : true,
    depthWrite: false,
    linewidth: options.edgeLineWidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder,
  });
  edges.name = `${mesh.name}-edges`;
  edges.userData = {
    type: 'webcad-push-solid-edges',
    faceId: mesh.userData.faceId,
    hiddenVerticalSurfaceEdges: hideVerticalSurfaceEdges,
    segmentCount: segments.length,
    sourceSegments: segments,
    sourceEntityId: mesh.userData.sourceEntityId,
    sourceKey: mesh.userData.sourceKey,
    showHiddenEdges: options.showHiddenEdges === true,
  };
  return edges;
}

export function createPushSolidGroup(face, height, options = {}) {
  return createPushSolidGroupFromSolid(solidFromFacePush(face, height, options), {
    ...options,
    name: options.name ?? `webcad-push-group-${face?.id ?? 'face'}`,
  });
}

export function createPushSolidGroupFromSolid(solid, options = {}) {
  const group = new THREE.Group();
  group.name = options.name ?? `webcad-push-group-${solid.metadata?.faceId ?? 'solid'}`;
  const mesh = createPushSolidMeshFromSolid(solid, options);
  group.add(mesh, createPushEdges(mesh, {
    edgeColor: options.edgeColor,
    edgeLineWidth: options.edgeLineWidth,
    renderOrder: options.edgeRenderOrder,
    showHiddenEdges: options.showHiddenEdges,
  }));
  group.userData = {
    type: 'webcad-push-solid-group',
    faceId: mesh.userData.faceId,
    height: mesh.userData.height,
    normal: mesh.userData.normal,
    sourceEntity: mesh.userData.sourceEntity,
    sourceEntityId: mesh.userData.sourceEntityId,
    sourceFaceType: mesh.userData.sourceFaceType,
    sourceSolidFaceIndex: mesh.userData.sourceSolidFaceIndex,
    sourceKey: mesh.userData.sourceKey,
    exactGeometry: mesh.userData.exactGeometry,
    solid: mesh.userData.solid,
  };
  return group;
}

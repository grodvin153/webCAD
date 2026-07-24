/* webCAD - Booleanas volumetricas derivadas para Solid3d | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import Module from 'manifold-3d';

import { deriveSolidAnalyticTopology } from '../analytic-edges.js';
import { createSolid3d, isValidSolid3d } from '../solid.js';
import { solid3dToBufferGeometry } from './solid-to-buffer-geometry.js';

const POSITION_EPSILON = 1e-6;
const PLANAR_EPSILON = 1e-5;
const SHARP_EDGE_ANGLE = THREE.MathUtils.degToRad(25);

let manifoldApi = null;
let initialization = null;

function manifoldWasmUrl() {
  return new URL('../../../node_modules/manifold-3d/manifold.wasm', import.meta.url).href;
}

export function initializeManifoldBoolean() {
  if (!initialization) {
    initialization = Module({ locateFile: () => manifoldWasmUrl() }).then((api) => {
      api.setup();
      manifoldApi = api;
      return api;
    });
  }
  return initialization;
}

export function isManifoldBooleanReady() {
  return Boolean(manifoldApi);
}

export function subtractionCutterDistance(sourceSolid, requestedDistance, origin, normal) {
  const distance = Number(requestedDistance);
  if (!isValidSolid3d(sourceSolid) || !Number.isFinite(distance) || distance >= 0) return distance;
  const axis = new THREE.Vector3(Number(normal?.x), Number(normal?.y), Number(normal?.z));
  const start = new THREE.Vector3(Number(origin?.x), Number(origin?.y), Number(origin?.z));
  if (axis.lengthSq() <= 1e-12 || ![start.x, start.y, start.z].every(Number.isFinite)) return distance;
  axis.normalize();
  const xs = sourceSolid.vertices.map((point) => Number(point.x));
  const ys = sourceSolid.vertices.map((point) => Number(point.y));
  const zs = sourceSolid.vertices.map((point) => Number(point.z));
  const scale = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    Math.max(...zs) - Math.min(...zs),
    Math.abs(distance),
    1,
  );
  const matchTolerance = Math.max(POSITION_EPSILON * 32, scale * 2e-6);
  let matchedLevel = null;
  let matchedDelta = Infinity;
  sourceSolid.vertices.forEach((point) => {
    const level = new THREE.Vector3(Number(point.x), Number(point.y), Number(point.z))
      .sub(start).dot(axis);
    const delta = Math.abs(level - distance);
    if (delta < matchedDelta) {
      matchedDelta = delta;
      matchedLevel = level;
    }
  });
  if (matchedLevel === null || matchedDelta > matchTolerance) return distance;
  const overrun = Math.min(
    Math.max(POSITION_EPSILON * 32, scale * 1e-6),
    Math.abs(distance) * 1e-3,
  );
  return Math.min(distance, matchedLevel) - overrun;
}

function subtractionCutterMargin(sourceSolid, distance) {
  const xs = sourceSolid.vertices.map((point) => Number(point.x));
  const ys = sourceSolid.vertices.map((point) => Number(point.y));
  const zs = sourceSolid.vertices.map((point) => Number(point.z));
  const scale = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    Math.max(...zs) - Math.min(...zs),
    Math.abs(Number(distance)),
    1,
  );
  return Math.max(POSITION_EPSILON * 32, scale * 2e-6);
}

function cleanFaceLoop(loop) {
  const result = [];
  (Array.isArray(loop) ? loop : []).forEach((point) => {
    const clean = new THREE.Vector3(Number(point?.x), Number(point?.y), Number(point?.z) || 0);
    if (![clean.x, clean.y, clean.z].every(Number.isFinite)) return;
    if (!result.length || result[result.length - 1].distanceToSquared(clean) > 1e-18) {
      result.push(clean);
    }
  });
  if (result.length > 1 && result[0].distanceToSquared(result[result.length - 1]) <= 1e-18) {
    result.pop();
  }
  return result;
}

function subtractionCutterFrame(face, distance) {
  const outer = cleanFaceLoop(face?.points);
  if (outer.length < 3) return null;
  const normal = new THREE.Vector3(
    Number(face?.normal?.x),
    Number(face?.normal?.y),
    Number(face?.normal?.z),
  );
  if (![normal.x, normal.y, normal.z].every(Number.isFinite) || normal.lengthSq() <= 1e-12) return null;
  normal.normalize();
  const direction = normal.multiplyScalar(Math.sign(distance) || -1);
  const origin = outer[0].clone();
  let xAxis = null;
  for (let index = 1; index < outer.length; index += 1) {
    const relative = outer[index].clone().sub(origin);
    const candidate = relative.clone().addScaledVector(direction, -relative.dot(direction));
    if (candidate.lengthSq() > 1e-12) {
      xAxis = candidate.normalize();
      break;
    }
  }
  if (!xAxis) {
    xAxis = Math.abs(direction.z) < 0.9
      ? new THREE.Vector3(0, 0, 1).cross(direction).normalize()
      : new THREE.Vector3(1, 0, 0).cross(direction).normalize();
  }
  const yAxis = direction.clone().cross(xAxis).normalize();
  const loops = [outer, ...(face?.holes ?? []).map(cleanFaceLoop)]
    .filter((loop) => loop.length >= 3);
  const contours = loops.map((loop) => loop.map((point) => {
    const relative = point.clone().sub(origin);
    return [relative.dot(xAxis), relative.dot(yAxis)];
  }));
  return { contours, direction, origin, xAxis, yAxis };
}

export function subtractFacePushSolid3d(sourceSolid, face, requestedDistance, options = {}) {
  if (!manifoldApi || !isValidSolid3d(sourceSolid)) return null;
  const distance = Number(requestedDistance);
  if (!Number.isFinite(distance) || distance >= 0) return null;
  const frame = subtractionCutterFrame(face, distance);
  if (!frame) return null;
  const kernelDistance = Number.isFinite(Number(options.kernelDistance))
    ? Number(options.kernelDistance)
    : subtractionCutterDistance(sourceSolid, distance, frame.origin, frame.direction.clone().negate());
  const margin = subtractionCutterMargin(sourceSolid, kernelDistance);
  const cutterOrigin = frame.origin.clone().addScaledVector(frame.direction, -margin);
  const transform = [
    frame.xAxis.x, frame.xAxis.y, frame.xAxis.z, 0,
    frame.yAxis.x, frame.yAxis.y, frame.yAxis.z, 0,
    frame.direction.x, frame.direction.y, frame.direction.z, 0,
    cutterOrigin.x, cutterOrigin.y, cutterOrigin.z, 1,
  ];
  let source = null;
  let section = null;
  let expandedSection = null;
  let localCutter = null;
  let cutter = null;
  let result = null;
  try {
    source = solidToManifold(sourceSolid, 0x10000000);
    section = new manifoldApi.CrossSection(frame.contours, 'EvenOdd');
    expandedSection = section.offset(margin, 'Miter', 4);
    localCutter = expandedSection.extrude(Math.abs(kernelDistance) + margin);
    cutter = localCutter.transform(transform);
    result = source.subtract(cutter);
    if (result.status() !== 'NoError' || result.isEmpty()) return null;
    return manifoldToSolid(result, sourceSolid, { ...options, operationType: 'subtract' });
  }
  catch (error) {
    console.warn('No se pudo resolver la sustraccion volumetrica de Push', error);
    return null;
  }
  finally {
    result?.delete?.();
    cutter?.delete?.();
    localCutter?.delete?.();
    expandedSection?.delete?.();
    section?.delete?.();
    source?.delete?.();
  }
}

function pointKey(point, tolerance = POSITION_EPSILON) {
  return `${Math.round(point.x / tolerance)}:${Math.round(point.y / tolerance)}:${Math.round(point.z / tolerance)}`;
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function faceNormal(face, vertices) {
  const first = vertices[face[0]];
  if (!first) return null;
  const origin = new THREE.Vector3(first.x, first.y, first.z);
  for (let index = 1; index < face.length - 1; index += 1) {
    const second = vertices[face[index]];
    const third = vertices[face[index + 1]];
    if (!second || !third) continue;
    const normal = new THREE.Vector3(second.x, second.y, second.z).sub(origin)
      .cross(new THREE.Vector3(third.x, third.y, third.z).sub(origin));
    if (normal.lengthSq() > 1e-18) return normal.normalize();
  }
  return null;
}

function orientTriangleSoup(vertices, triangles) {
  const triangleCount = triangles.length / 3;
  const edgeFaces = new Map();
  for (let faceIndex = 0; faceIndex < triangleCount; faceIndex += 1) {
    for (let corner = 0; corner < 3; corner += 1) {
      const first = triangles[faceIndex * 3 + corner];
      const second = triangles[faceIndex * 3 + (corner + 1) % 3];
      const key = edgeKey(first, second);
      if (!edgeFaces.has(key)) edgeFaces.set(key, []);
      edgeFaces.get(key).push({
        faceIndex,
        direction: first < second ? 1 : -1,
      });
    }
  }
  const neighbors = Array.from({ length: triangleCount }, () => []);
  edgeFaces.forEach((uses) => {
    if (uses.length !== 2) return;
    const [first, second] = uses;
    const sameDirection = first.direction === second.direction;
    neighbors[first.faceIndex].push({ faceIndex: second.faceIndex, sameDirection });
    neighbors[second.faceIndex].push({ faceIndex: first.faceIndex, sameDirection });
  });
  const flipped = Array(triangleCount).fill(null);
  const point = (vertexIndex) => {
    const offset = vertexIndex * 3;
    return new THREE.Vector3(vertices[offset], vertices[offset + 1], vertices[offset + 2]);
  };
  for (let root = 0; root < triangleCount; root += 1) {
    if (flipped[root] !== null) continue;
    flipped[root] = false;
    const component = [];
    const pending = [root];
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors[current].forEach((neighbor) => {
        const required = flipped[current] !== neighbor.sameDirection;
        if (flipped[neighbor.faceIndex] !== null) return;
        flipped[neighbor.faceIndex] = required;
        pending.push(neighbor.faceIndex);
      });
    }
    const signedVolume = component.reduce((volume, faceIndex) => {
      const indices = triangles.slice(faceIndex * 3, faceIndex * 3 + 3);
      if (flipped[faceIndex]) [indices[1], indices[2]] = [indices[2], indices[1]];
      return volume + point(indices[0]).dot(point(indices[1]).cross(point(indices[2]))) / 6;
    }, 0);
    if (signedVolume < 0) component.forEach((faceIndex) => {
      flipped[faceIndex] = !flipped[faceIndex];
    });
  }
  return triangles.flatMap((_, offset) => {
    if (offset % 3 !== 0) return [];
    const faceIndex = offset / 3;
    const indices = triangles.slice(offset, offset + 3);
    return flipped[faceIndex] ? [indices[0], indices[2], indices[1]] : indices;
  });
}

function geometryToManifoldMesh(geometry, surfaceFaceIds = []) {
  const source = geometry.index ? geometry.toNonIndexed() : geometry;
  const positions = source.getAttribute('position');
  const faceTriangleMap = geometry.userData?.webcadFaceTriangleMap ?? [];
  const vertices = [];
  const triangles = [];
  const faceIds = [];
  const vertexByPosition = new Map();
  const triangleKeys = new Set();
  for (let offset = 0; offset < positions.count; offset += 3) {
    const triangle = [];
    for (let corner = 0; corner < 3; corner += 1) {
      const index = offset + corner;
      const point = {
        x: positions.getX(index),
        y: positions.getY(index),
        z: positions.getZ(index),
      };
      const key = pointKey(point);
      let vertexIndex = vertexByPosition.get(key);
      if (vertexIndex === undefined) {
        vertexIndex = vertices.length / 3;
        vertexByPosition.set(key, vertexIndex);
        vertices.push(point.x, point.y, point.z);
      }
      triangle.push(vertexIndex);
    }
    if (new Set(triangle).size < 3) continue;
    const key = [...triangle].sort((first, second) => first - second).join(':');
    if (triangleKeys.has(key)) continue;
    triangleKeys.add(key);
    triangles.push(...triangle);
    const sourceFaceIndex = faceTriangleMap[offset / 3] ?? offset / 3;
    faceIds.push(surfaceFaceIds[sourceFaceIndex] ?? sourceFaceIndex);
  }
  if (source !== geometry) source.dispose();
  if (vertices.length < 12 || triangles.length < 12) {
    throw new TypeError('El Solid3d no contiene una envolvente cerrada utilizable');
  }
  return new manifoldApi.Mesh({
    numProp: 3,
    vertProperties: new Float32Array(vertices),
    triVerts: new Uint32Array(orientTriangleSoup(vertices, triangles)),
    faceID: new Uint32Array(faceIds),
    tolerance: POSITION_EPSILON,
  });
}

function solidToManifold(solid, namespaceBase = 0) {
  if (!isValidSolid3d(solid)) {
    throw new TypeError('La operacion booleana necesita un Solid3d valido');
  }
  const geometry = solid3dToBufferGeometry(solid);
  try {
    return manifoldApi.Manifold.ofMesh(geometryToManifoldMesh(
      geometry,
      semanticSurfaceFaceIds(solid, namespaceBase),
    ));
  }
  finally {
    geometry.dispose();
  }
}

function normalizedPropertyNormal(mesh, propertyVertex, fallback) {
  const offset = propertyVertex * mesh.numProp;
  if (mesh.numProp >= 6) {
    const normal = new THREE.Vector3(
      mesh.vertProperties[offset + 3],
      mesh.vertProperties[offset + 4],
      mesh.vertProperties[offset + 5],
    );
    if (normal.lengthSq() > 1e-12) {
      normal.normalize();
      return { x: normal.x, y: normal.y, z: normal.z };
    }
  }
  return { x: fallback.x, y: fallback.y, z: fallback.z };
}

function triangleTopology(mesh) {
  const vertices = [];
  const vertexByPosition = new Map();
  const faces = [];
  const faceVertexNormals = [];
  const triangleNormals = [];
  const faceIds = [];
  for (let triangleIndex = 0; triangleIndex < mesh.numTri; triangleIndex += 1) {
    const propertyIndices = [0, 1, 2].map((corner) => mesh.triVerts[triangleIndex * 3 + corner]);
    const face = propertyIndices.map((propertyIndex) => {
      const offset = propertyIndex * mesh.numProp;
      const point = {
        x: mesh.vertProperties[offset],
        y: mesh.vertProperties[offset + 1],
        z: mesh.vertProperties[offset + 2],
      };
      const key = pointKey(point);
      let vertexIndex = vertexByPosition.get(key);
      if (vertexIndex === undefined) {
        vertexIndex = vertices.length;
        vertexByPosition.set(key, vertexIndex);
        vertices.push(point);
      }
      return vertexIndex;
    });
    if (new Set(face).size < 3) continue;
    const normal = faceNormal(face, vertices);
    if (!normal) continue;
    faces.push(face);
    triangleNormals.push(normal);
    faceVertexNormals.push(propertyIndices.map((propertyIndex) =>
      normalizedPropertyNormal(mesh, propertyIndex, normal)));
    faceIds.push(mesh.faceID?.[triangleIndex] ?? triangleIndex);
  }
  return { faceIds, faces, faceVertexNormals, triangleNormals, vertices };
}

function edgeUses(faces) {
  const uses = new Map();
  faces.forEach((face, faceIndex) => {
    face.forEach((start, corner) => {
      const end = face[(corner + 1) % face.length];
      const key = edgeKey(start, end);
      if (!uses.has(key)) uses.set(key, { edge: [start, end], faces: [] });
      uses.get(key).faces.push(faceIndex);
    });
  });
  return uses;
}

function semanticSurfaceFaceIds(solid, namespaceBase = 0) {
  const faceCount = solid.faces.length;
  const stored = solid.metadata?.surfaceFaceIds;
  const ids = Array(faceCount).fill(null);
  let nextId = namespaceBase;
  const assignGroup = (indices) => {
    const valid = [...new Set(indices)].filter((index) =>
      Number.isInteger(index) && index >= 0 && index < faceCount && ids[index] === null);
    if (!valid.length) return;
    valid.forEach((index) => { ids[index] = nextId; });
    nextId += 1;
  };
  if ((Array.isArray(stored) || ArrayBuffer.isView(stored)) && stored.length === faceCount) {
    const remapped = new Map();
    stored.forEach((value, faceIndex) => {
      const key = Number.isFinite(Number(value)) ? Number(value) : faceIndex;
      if (!remapped.has(key)) {
        remapped.set(key, nextId);
        nextId += 1;
      }
      ids[faceIndex] = remapped.get(key);
    });
    return ids;
  }
  (solid.metadata?.planarFaceGroups ?? []).forEach((group) => assignGroup(group?.indices ?? []));
  const curvedFaces = new Set((solid.metadata?.curvedSideFaceIndices ?? [])
    .filter((index) => Number.isInteger(index) && index >= 0 && index < faceCount));
  const uses = edgeUses(solid.faces);
  const neighbors = new Map([...curvedFaces].map((index) => [index, []]));
  uses.forEach(({ faces }) => {
    if (faces.length !== 2 || !faces.every((index) => curvedFaces.has(index))) return;
    const [first, second] = faces;
    const firstNormal = faceNormal(solid.faces[first], solid.vertices);
    const secondNormal = faceNormal(solid.faces[second], solid.vertices);
    if (!firstNormal || !secondNormal || firstNormal.dot(secondNormal) < Math.cos(SHARP_EDGE_ANGLE)) return;
    neighbors.get(first).push(second);
    neighbors.get(second).push(first);
  });
  const visited = new Set();
  curvedFaces.forEach((start) => {
    if (visited.has(start) || ids[start] !== null) return;
    const component = [];
    const pending = [start];
    visited.add(start);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      (neighbors.get(current) ?? []).forEach((neighbor) => {
        if (visited.has(neighbor) || ids[neighbor] !== null) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    assignGroup(component);
  });
  ids.forEach((value, faceIndex) => {
    if (value === null) assignGroup([faceIndex]);
  });
  return ids;
}

function edgeHasContinuousNormals(topology, edge, firstFace, secondFace) {
  return edge.every((vertexIndex) => {
    const first = faceCornerNormal(topology, firstFace, vertexIndex);
    const second = faceCornerNormal(topology, secondFace, vertexIndex);
    return first && second && first.dot(second) >= 1 - 1e-5;
  });
}

function exactPlanarSideSurfaces(metadata) {
  return exactExtrusionProfiles(metadata).flatMap(({ profile, offset }) => {
    const offsetVector = new THREE.Vector3(
      Number(offset?.x) || 0,
      Number(offset?.y) || 0,
      Number(offset?.z) || 0,
    );
    const extrusionLength = offsetVector.length();
    if (extrusionLength <= 1e-9) return [];
    const extrusionDirection = offsetVector.clone().multiplyScalar(1 / extrusionLength);
    return [profile?.outerLoop, ...(profile?.innerLoops ?? [])].flatMap((loop) =>
      (loop?.segments ?? []).flatMap((segment) => {
        if (segment?.type !== 'line') return [];
        const start = exactProfileWorldPoint(segment.start, profile.plane);
        const end = exactProfileWorldPoint(segment.end, profile.plane);
        const segmentVector = end.clone().sub(start);
        const segmentLength = segmentVector.length();
        if (segmentLength <= 1e-9) return [];
        const segmentDirection = segmentVector.multiplyScalar(1 / segmentLength);
        const normal = segmentDirection.clone().cross(extrusionDirection);
        if (normal.lengthSq() <= 1e-12) return [];
        normal.normalize();
        return [{
          start,
          segmentDirection,
          segmentLength,
          extrusionDirection,
          extrusionLength,
          normal,
        }];
      }));
  });
}

function exactPlaneAxes(plane) {
  const component = (value, fallback = 0) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  };
  const normal = new THREE.Vector3(
    component(plane?.normal?.x),
    component(plane?.normal?.y),
    component(plane?.normal?.z),
  );
  if (normal.lengthSq() <= 1e-12) normal.set(0, 0, 1);
  normal.normalize();
  const xAxis = new THREE.Vector3(
    component(plane?.xAxis?.x),
    component(plane?.xAxis?.y),
    component(plane?.xAxis?.z),
  );
  if (xAxis.lengthSq() <= 1e-12) xAxis.set(1, 0, 0);
  xAxis.normalize();
  const storedYAxis = new THREE.Vector3(
    component(plane?.yAxis?.x),
    component(plane?.yAxis?.y),
    component(plane?.yAxis?.z),
  );
  const yAxis = storedYAxis.lengthSq() > 1e-12
    ? storedYAxis.normalize()
    : normal.clone().cross(xAxis).normalize();
  return { xAxis, yAxis };
}

function pointOnExactPlanarSide(point, side) {
  const relative = new THREE.Vector3(point.x, point.y, point.z).sub(side.start);
  if (Math.abs(relative.dot(side.normal)) > 1e-4) return false;
  const alongSegment = relative.dot(side.segmentDirection);
  const alongExtrusion = relative.dot(side.extrusionDirection);
  return alongSegment >= -1e-4 && alongSegment <= side.segmentLength + 1e-4 &&
    alongExtrusion >= -1e-4 && alongExtrusion <= side.extrusionLength + 1e-4;
}

function visibleEdges(topology, surface, metadata) {
  const planarGroupByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  const tangentKeys = new Set(surface.tangentEdges.map((edge) =>
    edgeKey(edge.startIndex, edge.endIndex)));
  const edges = [];
  surface.uses.forEach(({ edge, faces }) => {
    if (faces.length !== 2) {
      edges.push(edge);
      return;
    }
    const [firstFace, secondFace] = faces;
    if (topology.faceIds?.[firstFace] === topology.faceIds?.[secondFace]) return;
    if (surface.analyticTopology.internalSideEdgeKeys.has(edgeKey(edge[0], edge[1]))) return;
    const firstPlanarGroup = planarGroupByFace.get(firstFace);
    const secondPlanarGroup = planarGroupByFace.get(secondFace);
    if (firstPlanarGroup !== undefined && secondPlanarGroup !== undefined) {
      if (firstPlanarGroup === secondPlanarGroup) return;
      if (edgeHasContinuousNormals(topology, edge, firstFace, secondFace)) return;
      edges.push(edge);
      return;
    }
    if (tangentKeys.has(edgeKey(edge[0], edge[1]))) return;
    if (edgeHasContinuousNormals(topology, edge, firstFace, secondFace)) return;
    edges.push(edge);
  });
  return edges;
}

function exactProfileWorldPoint(point, plane, offset = { x: 0, y: 0, z: 0 }) {
  const { xAxis, yAxis } = exactPlaneAxes(plane);
  return new THREE.Vector3(
    (Number(plane?.origin?.x) || 0) + xAxis.x * (Number(point?.x) || 0) -
      yAxis.x * (Number(point?.y) || 0) + (Number(offset.x) || 0),
    (Number(plane?.origin?.y) || 0) + xAxis.y * (Number(point?.x) || 0) -
      yAxis.y * (Number(point?.y) || 0) + (Number(offset.y) || 0),
    (Number(plane?.origin?.z) || 0) + xAxis.z * (Number(point?.x) || 0) -
      yAxis.z * (Number(point?.y) || 0) + (Number(offset.z) || 0),
  );
}

function exactExtrusionProfiles(metadata) {
  const entries = [];
  const exactGeometry = metadata?.exactGeometry;
  const base = exactGeometry?.base ?? (exactGeometry?.extrusion ? exactGeometry : null);
  const extrusion = base?.extrusion;
  const baseProfile = extrusion?.profile ?? base?.profile;
  if (baseProfile && extrusion) {
    const distance = Number(extrusion.distance) || 0;
    entries.push({
      profile: baseProfile,
      offset: extrusion.offset ?? {
        x: (Number(extrusion.direction?.x) || 0) * distance,
        y: (Number(extrusion.direction?.y) || 0) * distance,
        z: (Number(extrusion.direction?.z) || 0) * distance,
      },
    });
  }
  (metadata?.profileFeatures ?? []).forEach((feature) => {
    const profile = feature?.exactProfile;
    const distance = Number(feature?.distance);
    if (!profile || !Number.isFinite(distance)) return;
    entries.push({
      profile,
      offset: {
        x: (Number(profile.plane?.normal?.x) || 0) * distance,
        y: (Number(profile.plane?.normal?.y) || 0) * distance,
        z: (Number(profile.plane?.normal?.z) || 0) * distance,
      },
    });
  });
  return entries;
}

function segmentTangent(segment, atEnd) {
  const start = new THREE.Vector2(Number(segment?.start?.x) || 0, Number(segment?.start?.y) || 0);
  const end = new THREE.Vector2(Number(segment?.end?.x) || 0, Number(segment?.end?.y) || 0);
  const chord = end.clone().sub(start);
  if (chord.lengthSq() <= 1e-18) return null;
  if (segment?.type === 'line') return chord.normalize();
  const point = atEnd ? end : start;
  const center = new THREE.Vector2(Number(segment?.center?.x) || 0, Number(segment?.center?.y) || 0);
  let tangent = null;
  if (segment?.type === 'arc-circle') {
    const radial = point.clone().sub(center);
    tangent = new THREE.Vector2(-radial.y, radial.x);
  }
  else if (segment?.type === 'arc-ellipse') {
    const parameter = Number(atEnd ? segment.endAngle : segment.startAngle) || 0;
    const rotation = Number(segment.rotation) || 0;
    const local = new THREE.Vector2(
      -Math.sin(parameter) * Number(segment.radiusX),
      Math.cos(parameter) * Number(segment.radiusY),
    );
    tangent = new THREE.Vector2(
      local.x * Math.cos(rotation) - local.y * Math.sin(rotation),
      local.x * Math.sin(rotation) + local.y * Math.cos(rotation),
    );
  }
  if (!tangent || tangent.lengthSq() <= 1e-18) return chord.normalize();
  tangent.normalize();
  if (tangent.dot(chord) < 0) tangent.multiplyScalar(-1);
  return tangent;
}

function sameAnalyticCurve(first, second) {
  if (first?.type !== second?.type) return false;
  if (first.type === 'line') {
    const firstDirection = segmentTangent(first, true);
    const secondDirection = segmentTangent(second, false);
    return firstDirection && secondDirection && firstDirection.dot(secondDirection) >= 1 - 1e-8;
  }
  if (first.type !== 'arc-circle' && first.type !== 'arc-ellipse') return false;
  const close = (a, b) => Math.abs((Number(a) || 0) - (Number(b) || 0)) <= 1e-6;
  return close(first.center?.x, second.center?.x) && close(first.center?.y, second.center?.y) &&
    (first.type !== 'arc-circle'
      ? close(first.radiusX, second.radiusX) && close(first.radiusY, second.radiusY) &&
        close(first.rotation, second.rotation)
      : close(first.radius, second.radius));
}

function exactJunctionLines(metadata, smooth) {
  const lines = [];
  exactExtrusionProfiles(metadata).forEach(({ profile, offset }) => {
    [profile?.outerLoop, ...(profile?.innerLoops ?? [])].forEach((loop) => {
      const segments = loop?.segments ?? [];
      if (segments.length < 2) return;
      segments.forEach((segment, index) => {
        const previous = segments[(index - 1 + segments.length) % segments.length];
        const before = segmentTangent(previous, true);
        const after = segmentTangent(segment, false);
        if (!before || !after || sameAnalyticCurve(previous, segment)) return;
        const isSmooth = before.dot(after) >= Math.cos(THREE.MathUtils.degToRad(0.5));
        if (isSmooth !== smooth) return;
        const point = segment.start ?? previous.end;
        const start = exactProfileWorldPoint(point, profile.plane);
        const end = exactProfileWorldPoint(point, profile.plane, offset);
        if (start.distanceToSquared(end) > 1e-12) lines.push({ start, end });
      });
    });
  });
  return lines;
}

function exactGeneratrixLines(metadata) {
  return exactJunctionLines(metadata, false);
}

function exactTangencyLines(metadata) {
  return exactJunctionLines(metadata, true);
}

function edgeLiesOnLine(topology, edge, line) {
  const start = topology.vertices[edge[0]];
  const end = topology.vertices[edge[1]];
  if (!start || !end) return false;
  const lineVector = line.end.clone().sub(line.start);
  const length = lineVector.length();
  if (length <= 1e-9) return false;
  const direction = lineVector.multiplyScalar(1 / length);
  return [start, end].every((point) => {
    const relative = new THREE.Vector3(point.x, point.y, point.z).sub(line.start);
    const parameter = relative.dot(direction);
    return parameter >= -1e-4 && parameter <= length + 1e-4 &&
      relative.addScaledVector(direction, -parameter).length() <= 1e-4;
  });
}

function exactGeneratrixEdges(topology, surface, metadata) {
  const lines = exactGeneratrixLines(metadata);
  if (!lines.length) return [];
  const planarGroupByFace = new Map();
  surface.planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  return [...surface.uses.values()].flatMap(({ edge, faces }) => {
    if (!lines.some((line) => edgeLiesOnLine(topology, edge, line))) return [];
    if (faces.length === 2) {
      const firstGroup = planarGroupByFace.get(faces[0]);
      const secondGroup = planarGroupByFace.get(faces[1]);
      if (firstGroup !== undefined && firstGroup === secondGroup) return [];
    }
    return [edge];
  });
}

function mergedVisibleEdges(topology, surface, metadata) {
  const merged = new Map();
  [...visibleEdges(topology, surface, metadata), ...exactGeneratrixEdges(topology, surface, metadata)]
    .forEach((edge) => merged.set(edgeKey(edge[0], edge[1]), edge));
  return [...merged.values()];
}

function isCurvedTriangle(normals) {
  if (!Array.isArray(normals) || normals.length < 2) return false;
  const first = new THREE.Vector3(normals[0].x, normals[0].y, normals[0].z);
  return normals.slice(1).some((normal) =>
    first.distanceTo(new THREE.Vector3(normal.x, normal.y, normal.z)) > PLANAR_EPSILON);
}

function faceHasFlatNormal(topology, faceIndex) {
  const triangleNormal = topology.triangleNormals[faceIndex];
  if (!triangleNormal) return false;
  return (topology.faceVertexNormals[faceIndex] ?? []).some((normal) =>
    triangleNormal.dot(new THREE.Vector3(normal.x, normal.y, normal.z).normalize()) >= 1 - 1e-8);
}

function coplanarFaces(firstIndex, secondIndex, topology) {
  const firstNormal = topology.triangleNormals[firstIndex];
  const secondNormal = topology.triangleNormals[secondIndex];
  if (!firstNormal || !secondNormal || firstNormal.dot(secondNormal) < 1 - PLANAR_EPSILON) return false;
  const firstPoint = topology.vertices[topology.faces[firstIndex][0]];
  const secondPoint = topology.vertices[topology.faces[secondIndex][0]];
  return Math.abs(new THREE.Vector3(
    secondPoint.x - firstPoint.x,
    secondPoint.y - firstPoint.y,
    secondPoint.z - firstPoint.z,
  ).dot(firstNormal)) <= PLANAR_EPSILON;
}

function planarComponents(topology, uses, curvedFaces) {
  const neighbors = topology.faces.map(() => []);
  uses.forEach(({ faces }) => {
    if (faces.length !== 2) return;
    const [first, second] = faces;
    if (curvedFaces.has(first) || curvedFaces.has(second) ||
        !coplanarFaces(first, second, topology)) return;
    neighbors[first].push(second);
    neighbors[second].push(first);
  });
  const visited = new Set();
  const components = [];
  topology.faces.forEach((_, faceIndex) => {
    if (visited.has(faceIndex) || curvedFaces.has(faceIndex)) return;
    const component = [];
    const pending = [faceIndex];
    visited.add(faceIndex);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors[current].forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    components.push(component);
  });
  return components;
}

function classifiedCurvedFaces(topology, uses) {
  const curvedFaces = new Set(topology.faceVertexNormals.flatMap((normals, faceIndex) =>
    isCurvedTriangle(normals) ? [faceIndex] : []));
  planarComponents(topology, uses, new Set()).forEach((indices) => {
    if (!indices.some((faceIndex) => faceHasFlatNormal(topology, faceIndex))) return;
    indices.forEach((faceIndex) => curvedFaces.delete(faceIndex));
  });
  return curvedFaces;
}

function boundaryLoops(component, topology) {
  const boundary = new Map();
  component.forEach((faceIndex) => {
    const face = topology.faces[faceIndex];
    face.forEach((start, corner) => {
      const end = face[(corner + 1) % face.length];
      const key = edgeKey(start, end);
      if (!boundary.has(key)) boundary.set(key, []);
      boundary.get(key).push([start, end]);
    });
  });
  const outgoing = new Map();
  boundary.forEach((directed) => {
    if (directed.length !== 1) return;
    const [start, end] = directed[0];
    if (!outgoing.has(start)) outgoing.set(start, []);
    outgoing.get(start).push(end);
  });
  const unused = new Set([...outgoing.entries()].flatMap(([start, ends]) =>
    ends.map((end) => `${start}:${end}`)));
  const loops = [];
  while (unused.size) {
    const firstEdge = unused.values().next().value;
    const [start, next] = firstEdge.split(':').map(Number);
    const loop = [start];
    let current = start;
    let following = next;
    for (let guard = 0; guard <= unused.size + topology.vertices.length; guard += 1) {
      const key = `${current}:${following}`;
      if (!unused.delete(key)) break;
      current = following;
      if (current === start) break;
      loop.push(current);
      const candidates = (outgoing.get(current) ?? []).filter((candidate) =>
        unused.has(`${current}:${candidate}`));
      if (candidates.length !== 1) break;
      [following] = candidates;
    }
    if (loop.length >= 3 && current === start) loops.push(loop);
  }
  return loops;
}

function planeBasis(normal) {
  const reference = Math.abs(normal.z) < 0.9
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(0, 1, 0);
  const xAxis = reference.cross(normal).normalize();
  const yAxis = normal.clone().cross(xAxis).normalize();
  return { xAxis, yAxis };
}

function loopArea(loop, vertices, basis) {
  const points = loop.map((index) => {
    const point = vertices[index];
    const vector = new THREE.Vector3(point.x, point.y, point.z);
    return { x: vector.dot(basis.xAxis), y: vector.dot(basis.yAxis) };
  });
  return points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - next.x * point.y;
  }, 0) * 0.5;
}

function profileVertexKinds(loop, uses, curvedFaces) {
  const curvedSegments = loop.map((start, index) => {
    const end = loop[(index + 1) % loop.length];
    return (uses.get(edgeKey(start, end))?.faces ?? [])
      .some((faceIndex) => curvedFaces.has(faceIndex));
  });
  const smooth = [];
  const cad = [];
  curvedSegments.forEach((outgoingIsCurved, index) => {
    const incomingIsCurved = curvedSegments[(index + curvedSegments.length - 1) % curvedSegments.length];
    (incomingIsCurved && outgoingIsCurved ? smooth : cad).push(index);
  });
  return { cad, smooth };
}

function planarFaceGroups(topology, uses, curvedFaces) {
  return planarComponents(topology, uses, curvedFaces).flatMap((indices) => {
    const normal = topology.triangleNormals[indices[0]];
    const loops = boundaryLoops(indices, topology);
    if (!normal || !loops.length) return [];
    const basis = planeBasis(normal);
    const ordered = loops.map((loop) => ({ loop, area: loopArea(loop, topology.vertices, basis) }))
      .sort((first, second) => Math.abs(second.area) - Math.abs(first.area));
    const outer = ordered[0];
    const outerVertexLoop = outer.area < 0 ? [...outer.loop].reverse() : outer.loop;
    const innerVertexLoops = ordered.slice(1).map(({ loop, area }) =>
      (area > 0 ? [...loop].reverse() : loop));
    const outerKinds = profileVertexKinds(outerVertexLoop, uses, curvedFaces);
    const innerKinds = innerVertexLoops.map((loop) => profileVertexKinds(loop, uses, curvedFaces));
    const outerLoop = outerVertexLoop
      .map((index) => ({ ...topology.vertices[index] }));
    const innerLoops = innerVertexLoops.map((loop) =>
      loop.map((index) => ({ ...topology.vertices[index] })));
    return [{
      indices: [...indices].sort((first, second) => first - second),
      kind: 'boolean-planar-face',
      normal: { x: normal.x, y: normal.y, z: normal.z },
      outerLoop,
      innerLoops,
      cadProfileVertexIndices: outerKinds.cad,
      smoothProfileVertexIndices: outerKinds.smooth,
      holeCadProfileVertexIndices: innerKinds.map(({ cad }) => cad),
      holeSmoothProfileVertexIndices: innerKinds.map(({ smooth }) => smooth),
    }];
  });
}

function faceCornerNormal(topology, faceIndex, vertexIndex) {
  const corner = topology.faces[faceIndex]?.indexOf(vertexIndex) ?? -1;
  const normal = topology.faceVertexNormals[faceIndex]?.[corner];
  return normal ? new THREE.Vector3(normal.x, normal.y, normal.z).normalize() : null;
}

function tangentEdges(topology, uses, curvedFaces, planarGroups) {
  const planarGroupByFace = new Map();
  planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  const result = [];
  uses.forEach(({ edge, faces }) => {
    if (faces.length !== 2) return;
    const [first, second] = faces;
    const firstPlanarGroup = planarGroupByFace.get(first);
    const secondPlanarGroup = planarGroupByFace.get(second);
    const planarFace = firstPlanarGroup !== undefined && curvedFaces.has(second)
      ? first
      : secondPlanarGroup !== undefined && curvedFaces.has(first) ? second : null;
    if (planarFace === null) return;
    const curvedFace = planarFace === first ? second : first;
    const smoothlyJoined = edge.every((vertexIndex) => {
      const planarNormal = faceCornerNormal(topology, planarFace, vertexIndex);
      const curvedNormal = faceCornerNormal(topology, curvedFace, vertexIndex);
      return planarNormal && curvedNormal && planarNormal.dot(curvedNormal) >= 1 - 1e-5;
    });
    if (!smoothlyJoined) return;
    result.push({
      startIndex: edge[0],
      endIndex: edge[1],
      planarGroupIndex: planarGroupByFace.get(planarFace),
    });
  });
  return result;
}

function exactTangentEdges(topology, edges, metadata, uses, planarGroups) {
  const exactProfiles = exactExtrusionProfiles(metadata);
  if (!exactProfiles.length) return edges;
  const lines = exactTangencyLines(metadata);
  if (!lines.length) return [];
  const planarGroupByFace = new Map();
  planarGroups.forEach((group, groupIndex) => {
    group.indices.forEach((faceIndex) => planarGroupByFace.set(faceIndex, groupIndex));
  });
  return [...uses.values()].flatMap(({ edge, faces }) => {
    if (!lines.some((line) => edgeLiesOnLine(topology, edge, line))) return [];
    const planarGroupIndex = faces.map((faceIndex) => planarGroupByFace.get(faceIndex))
      .find((value) => value !== undefined);
    return [{
      startIndex: edge[0],
      endIndex: edge[1],
      planarGroupIndex: planarGroupIndex ?? null,
    }];
  });
}

function derivedSurfaceTopology(topology, metadata = null) {
  const uses = edgeUses(topology.faces);
  const curvedFaces = classifiedCurvedFaces(topology, uses);
  const analyticPlanarSides = exactPlanarSideSurfaces(metadata);
  const analyticTopology = deriveSolidAnalyticTopology({
    vertices: topology.vertices,
    faces: topology.faces,
    metadata,
  }, {
    faceNormals: topology.triangleNormals,
  });
  topology.faces.forEach((face, faceIndex) => {
    const liesOnAnalyticPlane = analyticPlanarSides.some((side) =>
      face.every((vertexIndex) => pointOnExactPlanarSide(topology.vertices[vertexIndex], side)));
    if (liesOnAnalyticPlane) curvedFaces.delete(faceIndex);
    if (analyticTopology.faceSurfaceIds[faceIndex]) curvedFaces.add(faceIndex);
  });
  const planarGroups = planarFaceGroups(topology, uses, curvedFaces);
  const derivedTangencies = tangentEdges(topology, uses, curvedFaces, planarGroups);
  return {
    analyticTopology,
    curvedFaces,
    planarGroups,
    tangentEdges: exactTangentEdges(topology, derivedTangencies, metadata, uses, planarGroups),
    uses,
  };
}

function flattenPlanarFaceNormals(topology, planarGroups) {
  const flattened = topology.faceVertexNormals.map((normals) =>
    normals.map((normal) => ({ ...normal })));
  planarGroups.forEach((group) => {
    group.indices.forEach((faceIndex) => {
      flattened[faceIndex] = topology.faces[faceIndex].map(() => ({ ...group.normal }));
    });
  });
  return flattened;
}

function resultMetadata(sourceSolid, topology, options) {
  const operation = options.operation ? JSON.parse(JSON.stringify(options.operation)) : null;
  const previousExactGeometry = sourceSolid.metadata?.exactGeometry ?? null;
  const previousOperations = previousExactGeometry?.operations ?? [];
  const exactBase = previousExactGeometry?.base ??
    (previousExactGeometry?.status === 'available'
      ? JSON.parse(JSON.stringify(previousExactGeometry))
      : null);
  return {
    ...(sourceSolid.metadata ?? {}),
    ...(options.metadata ?? {}),
    type: 'profileFeature',
    booleanKernel: 'manifold-3d',
    booleanOperation: options.operationType,
    capFaceGroups: null,
    profileSize: null,
    profileLoopSizes: null,
    faceVertexNormals: topology.faceVertexNormals,
    surfaceFaceIds: topology.faceIds,
    planarFaceGroups: topology.planarFaceGroups,
    curvedSideFaceIndices: topology.curvedSideFaceIndices,
    tangentEdges: topology.tangentEdges,
    curvedFeatureGeneratrices: [],
    profileFeatures: operation
      ? [...(sourceSolid.metadata?.profileFeatures ?? []), operation]
      : [...(sourceSolid.metadata?.profileFeatures ?? [])],
    exactGeometry: {
      status: 'pending',
      reason: 'boolean-result-exact-brep-not-implemented',
      base: exactBase,
      operations: operation ? [...previousOperations, operation] : [...previousOperations],
    },
  };
}

function manifoldToSolid(result, sourceSolid, options) {
  let condensed = null;
  let smoothed = null;
  try {
    condensed = result.asOriginal();
    smoothed = condensed.calculateNormals(0, THREE.MathUtils.radToDeg(SHARP_EDGE_ANGLE));
    const mesh = smoothed.getMesh(0);
    const topology = triangleTopology(mesh);
    const classificationMetadata = {
      ...(sourceSolid.metadata ?? {}),
      profileFeatures: options.operation
        ? [...(sourceSolid.metadata?.profileFeatures ?? []), options.operation]
        : [...(sourceSolid.metadata?.profileFeatures ?? [])],
    };
    const surface = derivedSurfaceTopology(topology, classificationMetadata);
    topology.curvedSideFaceIndices = [...surface.curvedFaces];
    topology.planarFaceGroups = surface.planarGroups;
    topology.tangentEdges = surface.tangentEdges;
    topology.faceVertexNormals = flattenPlanarFaceNormals(topology, surface.planarGroups);
    const metadata = resultMetadata(sourceSolid, topology, options);
    return createSolid3d({
      vertices: topology.vertices,
      faces: topology.faces,
      edges: mergedVisibleEdges(topology, surface, metadata),
      metadata,
    });
  }
  finally {
    smoothed?.delete?.();
    condensed?.delete?.();
  }
}

export function solidWithDerivedSurfaceTopology(solid) {
  if (!isValidSolid3d(solid)) return solid;
  const hasAnalyticExtrusion = exactExtrusionProfiles(solid.metadata).length > 0;
  if (solid.metadata?.booleanKernel !== 'manifold-3d' && !hasAnalyticExtrusion) return solid;
  const topology = {
    vertices: solid.vertices,
    faces: solid.faces,
    faceIds: semanticSurfaceFaceIds(solid),
    triangleNormals: solid.faces.map((face) => faceNormal(face, solid.vertices)),
    faceVertexNormals: solid.faces.map((face, faceIndex) => {
      const fallback = faceNormal(face, solid.vertices) ?? new THREE.Vector3(0, 0, 1);
      const stored = solid.metadata?.faceVertexNormals?.[faceIndex];
      return Array.isArray(stored) && stored.length === face.length
        ? stored
        : face.map(() => ({ x: fallback.x, y: fallback.y, z: fallback.z }));
    }),
  };
  const surface = derivedSurfaceTopology(topology, solid.metadata);
  const hasStoredNormals = Array.isArray(solid.metadata?.faceVertexNormals);
  const faceVertexNormals = hasStoredNormals
    ? flattenPlanarFaceNormals(topology, surface.planarGroups)
    : solid.metadata?.faceVertexNormals;
  return {
    ...solid,
    edges: mergedVisibleEdges(topology, surface, solid.metadata),
    metadata: {
      ...(solid.metadata ?? {}),
      curvedSideFaceIndices: [...surface.curvedFaces],
      planarFaceGroups: surface.planarGroups,
      tangentEdges: surface.tangentEdges,
      surfaceFaceIds: topology.faceIds,
      ...(hasStoredNormals ? { faceVertexNormals } : {}),
    },
  };
}

export function booleanSolid3d(sourceSolid, toolSolid, options = {}) {
  if (!manifoldApi || !isValidSolid3d(sourceSolid) || !isValidSolid3d(toolSolid)) return null;
  const operationType = options.operationType === 'subtract' ? 'subtract' : 'union';
  let source = null;
  let tool = null;
  let result = null;
  try {
    source = solidToManifold(sourceSolid, 0x10000000);
    tool = solidToManifold(toolSolid, 0x20000000);
    result = operationType === 'subtract' ? source.subtract(tool) : source.add(tool);
    if (result.status() !== 'NoError' || result.isEmpty()) return null;
    return manifoldToSolid(result, sourceSolid, { ...options, operationType });
  }
  catch (error) {
    console.warn('No se pudo resolver la operacion volumetrica de Push', error);
    return null;
  }
  finally {
    result?.delete?.();
    tool?.delete?.();
    source?.delete?.();
  }
}

/* webCAD - Siluetas visuales para solidos Push 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { createWideLineSegments, disposeThreeObject } from './three-scene-style.js';
import { PUSH_SOLID_STYLE } from './push-geometry.js';

const SILHOUETTE_NAME = 'webcad-push-silhouette';
const FACE_EPSILON = 1e-9;

function vectorFromPoint(point) {
  return new THREE.Vector3(Number(point.x) || 0, Number(point.y) || 0, Number(point.z) || 0);
}

function cameraKey(camera) {
  return camera.matrixWorld.elements.map((value) => value.toFixed(4)).join(',');
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function faceInfo(face, vertices) {
  const points = face.map((index) => vectorFromPoint(vertices[index])).filter(Boolean);
  if (points.length < 3) return null;
  const center = points.reduce((total, point) => total.add(point), new THREE.Vector3())
    .multiplyScalar(1 / points.length);
  let normal = null;
  for (let index = 1; index < points.length - 1; index += 1) {
    const candidate = new THREE.Vector3()
      .subVectors(points[index], points[0])
      .cross(new THREE.Vector3().subVectors(points[index + 1], points[0]));
    if (candidate.lengthSq() > FACE_EPSILON) {
      normal = candidate.normalize();
      break;
    }
  }
  return normal ? { center, normal } : null;
}

function faceFacesCamera(info, camera) {
  const view = new THREE.Vector3().subVectors(camera.position, info.center);
  return info.normal.dot(view) >= 0;
}

export function buildPushSilhouetteSegments(solid, camera) {
  const vertices = Array.isArray(solid?.vertices) ? solid.vertices : [];
  const faces = Array.isArray(solid?.faces) ? solid.faces : [];
  if (!vertices.length || !faces.length || !camera) return [];
  const faceInfos = faces.map((face) => faceInfo(face, vertices));
  const edgeFaces = new Map();
  faces.forEach((face, faceIndex) => {
    for (let index = 0; index < face.length; index += 1) {
      const first = face[index];
      const second = face[(index + 1) % face.length];
      const key = edgeKey(first, second);
      if (!edgeFaces.has(key)) {
        edgeFaces.set(key, { edge: [first, second], faces: [] });
      }
      edgeFaces.get(key).faces.push(faceIndex);
    }
  });

  const segments = [];
  edgeFaces.forEach(({ edge, faces: adjacentFaces }) => {
    const visibleStates = adjacentFaces
      .map((faceIndex) => faceInfos[faceIndex])
      .filter(Boolean)
      .map((info) => faceFacesCamera(info, camera));
    const isBoundary = visibleStates.length < 2;
    const isSilhouette = visibleStates.length >= 2 && visibleStates.some(Boolean) && !visibleStates.every(Boolean);
    if (!isBoundary && !isSilhouette) return;
    const start = vertices[edge[0]];
    const end = vertices[edge[1]];
    if (!start || !end) return;
    segments.push({
      start: { x: start.x, y: start.y, z: start.z },
      end: { x: end.x, y: end.y, z: end.z },
    });
  });
  return segments;
}

export function updatePushSilhouetteGroup(group, camera, options = {}) {
  if (!group || group.userData?.type !== 'webcad-push-solid-group') return null;
  const mesh = group.children.find((child) => child.userData?.type === 'webcad-push-solid');
  const solid = mesh?.userData?.solid;
  if (!solid) return null;
  const key = cameraKey(camera);
  if (group.userData.silhouetteCameraKey === key) {
    return group.getObjectByName(SILHOUETTE_NAME) ?? null;
  }
  const previous = group.getObjectByName(SILHOUETTE_NAME);
  if (previous) {
    group.remove(previous);
    disposeThreeObject(previous);
  }
  const silhouette = createWideLineSegments(buildPushSilhouetteSegments(solid, camera), {
    color: options.color ?? PUSH_SOLID_STYLE.edgeColor,
    depthTest: true,
    depthWrite: false,
    linewidth: options.linewidth ?? PUSH_SOLID_STYLE.edgeLineWidth,
    renderOrder: options.renderOrder ?? PUSH_SOLID_STYLE.edgeRenderOrder + 1,
  });
  silhouette.name = SILHOUETTE_NAME;
  silhouette.userData = {
    type: 'webcad-push-silhouette',
    segmentCount: silhouette.userData.segmentCount,
  };
  group.add(silhouette);
  group.userData.silhouetteCameraKey = key;
  return silhouette;
}

export function updatePushSilhouettes(root, camera, options = {}) {
  const groups = [];
  root?.traverse?.((object) => {
    if (object.userData?.type === 'webcad-push-solid-group') {
      groups.push(object);
    }
  });
  const updated = [];
  groups.forEach((group) => {
    const silhouette = updatePushSilhouetteGroup(group, camera, options);
    if (silhouette) updated.push(silhouette);
  });
  return updated;
}

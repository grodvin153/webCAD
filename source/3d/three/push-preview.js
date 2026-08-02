/* webCAD - Preview ligero y guía normal para Push 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  createWideLineSegments,
  disposeThreeObject,
  THREE_VIEW_STYLE,
} from './three-scene-style.js';

const AXIS_EPSILON = 1e-12;
const MAX_CURTAIN_GUIDES = 12;
const POSITIVE_GUIDE_COLOR = 0xe06a20;
const NEGATIVE_GUIDE_COLOR = 0x2769b0;
const ADD_PREVIEW_STYLE = Object.freeze({
  capColor: 0xffb347,
  capOpacity: 0.54,
  depthTest: true,
  curtainColor: 0xe06a20,
  volumeColor: 0xf0a13a,
  volumeOpacity: 0.2,
});
const SUBTRACT_PREVIEW_STYLE = Object.freeze({
  capColor: 0xd83b36,
  capOpacity: 0.34,
  depthTest: false,
  curtainColor: 0xc92f2a,
  volumeColor: 0xd83b36,
  volumeOpacity: 0.16,
});

function pointObject(vector) {
  return { x: vector.x, y: vector.y, z: vector.z };
}

function geometryNormal(mesh) {
  const geometry = mesh?.geometry;
  if (!geometry?.getAttribute?.('normal')) geometry?.computeVertexNormals?.();
  const normalAttribute = geometry?.getAttribute?.('normal');
  if (!normalAttribute?.count) return null;
  const localNormal = new THREE.Vector3(
    normalAttribute.getX(0),
    normalAttribute.getY(0),
    normalAttribute.getZ(0),
  );
  const worldNormal = localNormal.applyNormalMatrix(
    new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld),
  );
  return worldNormal.lengthSq() > AXIS_EPSILON ? worldNormal.normalize() : null;
}

function meshWorldCenter(mesh) {
  const bounds = new THREE.Box3().setFromObject(mesh);
  return bounds.isEmpty() ? null : bounds.getCenter(new THREE.Vector3());
}

function normalizedVector(value) {
  const vector = new THREE.Vector3(
    Number(value?.x),
    Number(value?.y),
    Number(value?.z),
  );
  return vector.lengthSq() > AXIS_EPSILON ? vector.normalize() : null;
}

export function pushAxisFromFaceMesh(mesh, {
  worldNormal = null,
} = {}) {
  if (!mesh?.geometry) return null;
  mesh.updateWorldMatrix?.(true, false);
  const center = meshWorldCenter(mesh);
  const normal = normalizedVector(worldNormal) ?? geometryNormal(mesh);
  if (!center || !normal) return null;
  return {
    center: pointObject(center),
    normal: pointObject(normal),
  };
}

function arrowSegments(tip, direction, length) {
  const axis = direction.clone().normalize();
  const basis = Math.abs(axis.z) < 0.9
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(0, 1, 0);
  const side = basis.cross(axis).normalize().multiplyScalar(length * 0.42);
  const back = tip.clone().addScaledVector(axis, -length);
  return [
    { start: pointObject(tip), end: pointObject(back.clone().add(side)) },
    { start: pointObject(tip), end: pointObject(back.clone().sub(side)) },
  ];
}

function guideExtent(axis, camera, faceMesh) {
  const center = new THREE.Vector3(axis.center.x, axis.center.y, axis.center.z);
  const cameraDistance = camera?.position?.distanceTo?.(center) ?? 10;
  const faceBounds = new THREE.Box3().setFromObject(faceMesh);
  const faceSize = faceBounds.isEmpty()
    ? 1
    : faceBounds.getSize(new THREE.Vector3()).length();
  return Math.max(2, faceSize * 1.25, cameraDistance * 0.28);
}

function createNormalGuide(axis, camera, faceMesh) {
  const center = new THREE.Vector3(axis.center.x, axis.center.y, axis.center.z);
  const normal = new THREE.Vector3(axis.normal.x, axis.normal.y, axis.normal.z);
  const extent = guideExtent(axis, camera, faceMesh);
  const positiveTip = center.clone().addScaledVector(normal, extent);
  const negativeDirection = normal.clone().negate();
  const negativeTip = center.clone().addScaledVector(normal, -extent);
  const arrowLength = Math.max(extent * 0.09, 0.18);
  const group = new THREE.Group();
  group.name = 'webcad-push-normal-guide';
  group.userData = {
    type: 'webcad-push-normal-guide',
    axis,
  };
  const positive = createWideLineSegments([
    { start: pointObject(center), end: pointObject(positiveTip) },
    ...arrowSegments(positiveTip, normal, arrowLength),
  ], {
    color: POSITIVE_GUIDE_COLOR,
    depthTest: false,
    depthWrite: false,
    linewidth: Math.max(2.4, THREE_VIEW_STYLE.axisLineWidth),
    opacity: 0.98,
    renderOrder: 90,
    transparent: true,
  });
  positive.name = 'webcad-push-normal-positive';
  positive.userData.direction = 'positive';
  const negative = createWideLineSegments([
    { start: pointObject(center), end: pointObject(negativeTip) },
    ...arrowSegments(negativeTip, negativeDirection, arrowLength),
  ], {
    color: NEGATIVE_GUIDE_COLOR,
    dashed: true,
    depthTest: false,
    depthWrite: false,
    linewidth: Math.max(1.8, THREE_VIEW_STYLE.axisNegativeLineWidth),
    opacity: 0.92,
    renderOrder: 90,
    transparent: true,
  });
  negative.name = 'webcad-push-normal-negative';
  negative.userData.direction = 'negative';
  group.add(positive, negative);
  return group;
}

function uniqueWorldVertices(mesh) {
  const positions = mesh?.geometry?.getAttribute?.('position');
  if (!positions?.count) return [];
  const seen = new Set();
  const result = [];
  for (let index = 0; index < positions.count; index += 1) {
    const local = new THREE.Vector3(
      positions.getX(index),
      positions.getY(index),
      positions.getZ(index),
    );
    const world = local.applyMatrix4(mesh.matrixWorld);
    const key = `${world.x.toFixed(7)}:${world.y.toFixed(7)}:${world.z.toFixed(7)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(world);
  }
  if (result.length <= MAX_CURTAIN_GUIDES) return result;
  return Array.from({ length: MAX_CURTAIN_GUIDES }, (_, index) =>
    result[Math.floor(index * result.length / MAX_CURTAIN_GUIDES)]);
}

function faceBoundaryWorldEdges(mesh) {
  const geometry = mesh?.geometry;
  const positions = geometry?.getAttribute?.('position');
  if (!positions?.count) return [];
  const canonicalByPosition = new Map();
  const canonicalIndices = [];
  const worldVertices = [];
  for (let index = 0; index < positions.count; index += 1) {
    const local = new THREE.Vector3(
      positions.getX(index),
      positions.getY(index),
      positions.getZ(index),
    );
    const key = `${local.x.toFixed(7)}:${local.y.toFixed(7)}:${local.z.toFixed(7)}`;
    let canonicalIndex = canonicalByPosition.get(key);
    if (canonicalIndex === undefined) {
      canonicalIndex = worldVertices.length;
      canonicalByPosition.set(key, canonicalIndex);
      worldVertices.push(local.applyMatrix4(mesh.matrixWorld));
    }
    canonicalIndices[index] = canonicalIndex;
  }

  const geometryIndex = geometry.getIndex?.();
  const triangleIndexCount = geometryIndex?.count ?? positions.count;
  const edgeUses = new Map();
  const vertexIndexAt = (offset) => canonicalIndices[
    geometryIndex ? geometryIndex.getX(offset) : offset
  ];
  const addEdge = (startIndex, endIndex) => {
    if (startIndex === endIndex) return;
    const key = startIndex < endIndex
      ? `${startIndex}:${endIndex}`
      : `${endIndex}:${startIndex}`;
    const existing = edgeUses.get(key);
    if (existing) {
      existing.count += 1;
      return;
    }
    edgeUses.set(key, {
      count: 1,
      endIndex,
      startIndex,
    });
  };
  for (let offset = 0; offset + 2 < triangleIndexCount; offset += 3) {
    const a = vertexIndexAt(offset);
    const b = vertexIndexAt(offset + 1);
    const c = vertexIndexAt(offset + 2);
    addEdge(a, b);
    addEdge(b, c);
    addEdge(c, a);
  }
  return [...edgeUses.values()]
    .filter((edge) => edge.count === 1)
    .map((edge) => ({
      end: worldVertices[edge.endIndex],
      start: worldVertices[edge.startIndex],
    }));
}

function updateCurtainGeometry(curtain, vertices, normal, distance) {
  const positions = new Float32Array(vertices.length * 6);
  vertices.forEach((start, index) => {
    const end = start.clone().addScaledVector(normal, distance);
    const offset = index * 6;
    positions[offset] = start.x;
    positions[offset + 1] = start.y;
    positions[offset + 2] = start.z;
    positions[offset + 3] = end.x;
    positions[offset + 4] = end.y;
    positions[offset + 5] = end.z;
  });
  curtain.geometry.setPositions(positions);
  curtain.computeLineDistances();
}

function createPushVolume(boundaryEdges, normal) {
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(boundaryEdges.length * 18);
  const normalArray = new Float32Array(boundaryEdges.length * 18);
  boundaryEdges.forEach(({ start, end }, edgeIndex) => {
    const wallNormal = end.clone().sub(start).cross(normal).normalize();
    const offset = edgeIndex * 18;
    for (let index = 0; index < 6; index += 1) {
      const vertexOffset = offset + index * 3;
      normalArray[vertexOffset] = wallNormal.x;
      normalArray[vertexOffset + 1] = wallNormal.y;
      normalArray[vertexOffset + 2] = wallNormal.z;
    }
  });
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionArray, 3).setUsage(THREE.DynamicDrawUsage),
  );
  geometry.setAttribute('normal', new THREE.BufferAttribute(normalArray, 3));
  const material = new THREE.MeshPhongMaterial({
    color: ADD_PREVIEW_STYLE.volumeColor,
    depthTest: ADD_PREVIEW_STYLE.depthTest,
    depthWrite: false,
    opacity: ADD_PREVIEW_STYLE.volumeOpacity,
    shininess: 12,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const volume = new THREE.Mesh(geometry, material);
  volume.name = 'webcad-push-drag-volume';
  volume.frustumCulled = false;
  volume.renderOrder = 80;
  volume.userData.type = 'webcad-push-drag-volume';
  return volume;
}

function updateVolumeGeometry(volume, boundaryEdges, normal, distance) {
  const positions = volume.geometry.getAttribute('position');
  boundaryEdges.forEach(({ start, end }, edgeIndex) => {
    const displacedStartX = start.x + normal.x * distance;
    const displacedStartY = start.y + normal.y * distance;
    const displacedStartZ = start.z + normal.z * distance;
    const displacedEndX = end.x + normal.x * distance;
    const displacedEndY = end.y + normal.y * distance;
    const displacedEndZ = end.z + normal.z * distance;
    const offset = edgeIndex * 6;
    positions.setXYZ(offset, start.x, start.y, start.z);
    positions.setXYZ(offset + 1, end.x, end.y, end.z);
    positions.setXYZ(offset + 2, displacedEndX, displacedEndY, displacedEndZ);
    positions.setXYZ(offset + 3, start.x, start.y, start.z);
    positions.setXYZ(offset + 4, displacedEndX, displacedEndY, displacedEndZ);
    positions.setXYZ(
      offset + 5,
      displacedStartX,
      displacedStartY,
      displacedStartZ,
    );
  });
  positions.needsUpdate = true;
  volume.visible = Math.abs(distance) > AXIS_EPSILON;
}

function applyPreviewStyle(cap, volume, curtain, operation) {
  const isSubtracting = operation === 'subtract';
  const style = isSubtracting ? SUBTRACT_PREVIEW_STYLE : ADD_PREVIEW_STYLE;
  cap.material.color.setHex(style.capColor);
  cap.material.opacity = style.capOpacity;
  volume.material.color.setHex(style.volumeColor);
  volume.material.opacity = style.volumeOpacity;
  curtain.material.color.setHex(style.curtainColor);
  [cap.material, volume.material, curtain.material].forEach((material) => {
    if (material.depthTest === style.depthTest) return;
    material.depthTest = style.depthTest;
    material.needsUpdate = true;
  });
  return isSubtracting ? 'subtract' : 'add';
}

export function createPushDragPreview(faceMesh, {
  camera = null,
  initialDistance = 0,
  operationAtDistance = null,
  worldNormal = null,
} = {}) {
  const axis = pushAxisFromFaceMesh(faceMesh, { worldNormal });
  if (!axis) return null;
  faceMesh.updateWorldMatrix?.(true, false);
  const normal = new THREE.Vector3(axis.normal.x, axis.normal.y, axis.normal.z);
  const basePosition = new THREE.Vector3();
  const baseQuaternion = new THREE.Quaternion();
  const baseScale = new THREE.Vector3();
  faceMesh.matrixWorld.decompose(basePosition, baseQuaternion, baseScale);

  const capMaterial = new THREE.MeshBasicMaterial({
    color: ADD_PREVIEW_STYLE.capColor,
    depthTest: ADD_PREVIEW_STYLE.depthTest,
    depthWrite: false,
    opacity: ADD_PREVIEW_STYLE.capOpacity,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const cap = new THREE.Mesh(faceMesh.geometry.clone(), capMaterial);
  cap.name = 'webcad-push-drag-cap';
  cap.renderOrder = 82;
  cap.position.copy(basePosition);
  cap.quaternion.copy(baseQuaternion);
  cap.scale.copy(baseScale);
  cap.userData.type = 'webcad-push-drag-cap';

  const vertices = uniqueWorldVertices(faceMesh);
  const curtain = createWideLineSegments(vertices.map((point) => ({
    start: pointObject(point),
    end: pointObject(point),
  })), {
    color: 0xe06a20,
    depthTest: false,
    depthWrite: false,
    linewidth: 1.7,
    opacity: 0.72,
    renderOrder: 84,
    transparent: true,
  });
  curtain.name = 'webcad-push-drag-curtain';
  curtain.userData.type = 'webcad-push-drag-curtain';
  const boundaryEdges = faceBoundaryWorldEdges(faceMesh);
  const volume = createPushVolume(boundaryEdges, normal);

  const group = new THREE.Group();
  group.name = 'webcad-push-drag-preview';
  group.userData = {
    type: 'webcad-push-drag-preview',
    axis,
  };
  group.add(volume, cap, curtain, createNormalGuide(axis, camera, faceMesh));

  const update = (distance) => {
    const value = Number(distance);
    if (!Number.isFinite(value)) return false;
    cap.position.copy(basePosition).addScaledVector(normal, value);
    updateCurtainGeometry(curtain, vertices, normal, value);
    updateVolumeGeometry(volume, boundaryEdges, normal, value);
    group.userData.distance = value;
    const requestedOperation = operationAtDistance?.(value);
    const operation = requestedOperation === 'subtract' ||
      requestedOperation === 'add'
      ? requestedOperation
      : value < -AXIS_EPSILON ? 'subtract' : 'add';
    if (group.userData.operation !== operation) {
      group.userData.operation = applyPreviewStyle(
        cap,
        volume,
        curtain,
        operation,
      );
    }
    return true;
  };
  update(initialDistance);

  return {
    axis,
    cap,
    curtain,
    group,
    volume,
    update,
    dispose() {
      disposeThreeObject(group);
    },
  };
}

export function createPushPointerProjector({
  axis,
  camera,
  controls,
  startPointer,
  viewport,
} = {}) {
  if (!axis || !camera || !startPointer || !viewport) return null;
  const center = new THREE.Vector3(axis.center.x, axis.center.y, axis.center.z);
  const normal = new THREE.Vector3(axis.normal.x, axis.normal.y, axis.normal.z);
  if (normal.lengthSq() <= AXIS_EPSILON) return null;
  normal.normalize();
  const target = controls?.target || center;
  const cameraDistance = camera.position.distanceTo(target);
  const normalEnd = center.clone().addScaledVector(
    normal,
    Math.max(cameraDistance * 0.12, 1),
  );
  const startProjected = center.clone().project(camera);
  const endProjected = normalEnd.project(camera);
  const size = viewport();
  const width = Math.max(1, Number(size?.width) || 1);
  const height = Math.max(1, Number(size?.height) || 1);
  const screenAxis = new THREE.Vector2(
    (endProjected.x - startProjected.x) * width * 0.5,
    -(endProjected.y - startProjected.y) * height * 0.5,
  );
  if (screenAxis.lengthSq() < 64) screenAxis.set(0, -1);
  else screenAxis.normalize();
  const worldPerPixel = camera.isOrthographicCamera
    ? Math.abs(camera.top - camera.bottom) /
      (Math.max(0.0001, camera.zoom || 1) * height)
    : (
      2 * Math.max(1, cameraDistance) *
      Math.tan(THREE.MathUtils.degToRad(camera.fov || 36) / 2)
    ) / height;
  return {
    screenAxis: { x: screenAxis.x, y: screenAxis.y },
    distanceAt(pointer) {
      if (!pointer) return null;
      return new THREE.Vector2(
        Number(pointer.clientX) - Number(startPointer.x),
        Number(pointer.clientY) - Number(startPointer.y),
      ).dot(screenAxis) * worldPerPixel;
    },
  };
}

/* webCAD - Visibilidad y seleccion de aristas 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

const EDGE_EPSILON = 1e-9;
const VISIBILITY_SAMPLE_COUNT = 10;
const VISIBILITY_BOUNDARY_ITERATIONS = 10;

function vectorFromPoint(point) {
  return new THREE.Vector3(
    Number(point?.x) || 0,
    Number(point?.y) || 0,
    Number(point?.z) || 0,
  );
}

function segmentKey(segment) {
  const pointKey = (point) => [point.x, point.y, point.z]
    .map((value) => Number(value).toFixed(7))
    .join(':');
  const start = pointKey(segment.start);
  const end = pointKey(segment.end);
  return start < end ? `${start}|${end}` : `${end}|${start}`;
}

function pointSegmentDistance2d(point, start, end) {
  const delta = new THREE.Vector2().subVectors(end, start);
  const lengthSquared = delta.lengthSq();
  if (lengthSquared <= EDGE_EPSILON) {
    return { distance: point.distanceTo(start), parameter: 0 };
  }
  const parameter = THREE.MathUtils.clamp(
    new THREE.Vector2().subVectors(point, start).dot(delta) / lengthSquared,
    0,
    1,
  );
  const nearest = start.clone().addScaledVector(delta, parameter);
  return { distance: point.distanceTo(nearest), parameter };
}

function rayToTarget(camera, target) {
  if (camera?.isOrthographicCamera) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction).normalize();
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);
    const targetDistance = Math.max(
      EDGE_EPSILON,
      target.clone().sub(cameraPosition).dot(direction),
    );
    return {
      direction,
      origin: target.clone().addScaledVector(direction, -targetDistance),
      targetDistance,
    };
  }
  const origin = new THREE.Vector3();
  camera.getWorldPosition(origin);
  const direction = target.clone().sub(origin);
  const targetDistance = direction.length();
  if (targetDistance > EDGE_EPSILON) direction.multiplyScalar(1 / targetDistance);
  return { direction, origin, targetDistance };
}

function pointVisibleAtCamera(raycaster, occluders, camera, target) {
  const ray = rayToTarget(camera, target);
  if (ray.targetDistance <= EDGE_EPSILON) return true;
  const tolerance = Math.max(1e-6, ray.targetDistance * 1e-5);
  raycaster.set(ray.origin, ray.direction);
  raycaster.near = 0;
  raycaster.far = ray.targetDistance + tolerance;
  const firstHit = raycaster.intersectObjects(occluders, false)[0];
  return !firstHit || firstHit.distance >= ray.targetDistance - tolerance;
}

function visibilitySampleCount(value) {
  const parsed = Math.round(Number(value));
  return Number.isFinite(parsed)
    ? THREE.MathUtils.clamp(parsed, 1, 32)
    : VISIBILITY_SAMPLE_COUNT;
}

function segmentFragmentsByVisibility(
  mesh,
  camera,
  segment,
  occluders,
  raycaster,
  sampleCount,
) {
  if (!mesh?.isMesh || !camera) return { hidden: [], visible: [segment] };
  const localStart = vectorFromPoint(segment.start);
  const localEnd = vectorFromPoint(segment.end);
  const worldStart = localStart.clone().applyMatrix4(mesh.matrixWorld);
  const worldEnd = localEnd.clone().applyMatrix4(mesh.matrixWorld);
  const visibilityAt = (parameter) => pointVisibleAtCamera(
    raycaster,
    occluders,
    camera,
    worldStart.clone().lerp(worldEnd, parameter),
  );
  const refineBoundary = (firstParameter, secondParameter, firstVisible) => {
    let first = firstParameter;
    let second = secondParameter;
    for (let iteration = 0; iteration < VISIBILITY_BOUNDARY_ITERATIONS; iteration += 1) {
      const middle = (first + second) * 0.5;
      if (visibilityAt(middle) === firstVisible) first = middle;
      else second = middle;
    }
    return (first + second) * 0.5;
  };
  const visibilityCells = Array.from({ length: sampleCount }, (_, index) => {
    const parameter = (index + 0.5) / sampleCount;
    return visibilityAt(parameter);
  });
  const fragments = { hidden: [], visible: [] };
  let startParameter = 0;
  let currentVisibility = visibilityCells[0];
  const appendFragment = (endParameter) => {
    if (endParameter - startParameter <= EDGE_EPSILON) return;
    const fragmentStart = localStart.clone().lerp(localEnd, startParameter);
    const fragmentEnd = localStart.clone().lerp(localEnd, endParameter);
    fragments[currentVisibility ? 'visible' : 'hidden'].push({
      start: { x: fragmentStart.x, y: fragmentStart.y, z: fragmentStart.z },
      end: { x: fragmentEnd.x, y: fragmentEnd.y, z: fragmentEnd.z },
    });
  };
  for (let index = 1; index < visibilityCells.length; index += 1) {
    if (visibilityCells[index] === currentVisibility) continue;
    const boundary = refineBoundary(
      (index - 0.5) / sampleCount,
      (index + 0.5) / sampleCount,
      currentVisibility,
    );
    appendFragment(boundary);
    startParameter = boundary;
    currentVisibility = visibilityCells[index];
  }
  appendFragment(1);
  return fragments;
}

export function classifySolidEdgeEntries({
  camera,
  mesh,
  occluders = null,
  segments = [],
  sourceEdgeIndices = [],
  curveGroupIds = [],
  visibilitySamples = VISIBILITY_SAMPLE_COUNT,
} = {}) {
  if (!mesh?.isMesh || !camera) return { hidden: [], visible: [] };
  mesh.updateWorldMatrix(true, false);
  camera.updateWorldMatrix(true, false);
  const raycaster = new THREE.Raycaster();
  const solidMeshes = (Array.isArray(occluders) && occluders.length ? occluders : [mesh])
    .filter((object) => object?.isMesh && object.visible !== false);
  const sampleCount = visibilitySampleCount(visibilitySamples);
  solidMeshes.forEach((object) => object.updateWorldMatrix(true, false));
  const result = { hidden: [], visible: [] };
  segments.forEach((segment, index) => {
    if (!segment?.start || !segment?.end) return;
    const fragments = segmentFragmentsByVisibility(
      mesh,
      camera,
      segment,
      solidMeshes,
      raycaster,
      sampleCount,
    );
    ['visible', 'hidden'].forEach((visibility) => {
      fragments[visibility].forEach((fragment) => result[visibility].push({
        measurementSegment: segment,
        segment: fragment,
        sourceEdgeIndices: sourceEdgeIndices[index] ?? null,
        curveGroupId: curveGroupIds[index] ?? null,
      }));
    });
  });
  return result;
}

export function visibleSolidEdgeEntries(options = {}) {
  return classifySolidEdgeEntries(options).visible;
}

function edgeObjectsForGroup(group, includeHidden) {
  const visibleOverlay = group.children?.find((child) =>
    child.userData?.type === 'webcad-push-visible-edge-overlay');
  const staticEdges = group.children?.find((child) =>
    child.userData?.type === 'webcad-push-solid-edges');
  const tangentEdges = group.children?.find((child) =>
    child.userData?.type === 'webcad-push-solid-tangent-edges');
  const generatrices = group.children?.find((child) =>
    child.userData?.type === 'webcad-push-generatrix-silhouette');
  return [
    includeHidden ? staticEdges : visibleOverlay,
    tangentEdges,
    generatrices?.visible === false ? null : generatrices,
  ].filter(Boolean);
}

export function nearestSolidEdgeAtPointer(groups, camera, pointer, viewport, options = {}) {
  const width = Math.max(1, Number(viewport?.width) || 1);
  const height = Math.max(1, Number(viewport?.height) || 1);
  const maxDistancePixels = Math.max(1, Number(options.maxDistancePixels) || 5);
  const includeHidden = options.includeHidden === true;
  const pointerPixels = new THREE.Vector2(
    (pointer.x + 1) * width * 0.5,
    (1 - pointer.y) * height * 0.5,
  );
  const cameraPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  const occluders = [];
  if (!includeHidden) {
    (Array.isArray(groups) ? groups : []).forEach((group) => {
      group?.traverse?.((object) => {
        if (object?.isMesh && object.visible !== false &&
            object.userData?.type === 'webcad-push-solid') {
          object.updateWorldMatrix(true, false);
          occluders.push(object);
        }
      });
    });
  }
  const visibilityRaycaster = occluders.length ? new THREE.Raycaster() : null;
  const seen = new Set();
  let best = null;

  (Array.isArray(groups) ? groups : []).forEach((group) => {
    edgeObjectsForGroup(group, includeHidden).forEach((object) => {
      object.updateWorldMatrix(true, false);
      const segments = object.userData?.sourceSegments ?? [];
      const measurementSegments = object.userData?.measurementSegments ?? segments;
      const sourceEdgeIndices = object.userData?.sourceEdgeIndices ?? [];
      const curveGroupIds = object.userData?.curveGroupIds ?? [];
      segments.forEach((segment, index) => {
        if (!segment?.start || !segment?.end) return;
        const key = `${group.userData?.documentSolidId ?? group.uuid}:${segmentKey(segment)}`;
        if (seen.has(key)) return;
        seen.add(key);
        const start = vectorFromPoint(segment.start).applyMatrix4(object.matrixWorld);
        const end = vectorFromPoint(segment.end).applyMatrix4(object.matrixWorld);
        const projectedStart = start.clone().project(camera);
        const projectedEnd = end.clone().project(camera);
        if ((projectedStart.z < -1 && projectedEnd.z < -1) ||
            (projectedStart.z > 1 && projectedEnd.z > 1)) return;
        const startPixels = new THREE.Vector2(
          (projectedStart.x + 1) * width * 0.5,
          (1 - projectedStart.y) * height * 0.5,
        );
        const endPixels = new THREE.Vector2(
          (projectedEnd.x + 1) * width * 0.5,
          (1 - projectedEnd.y) * height * 0.5,
        );
        const nearest = pointSegmentDistance2d(pointerPixels, startPixels, endPixels);
        if (nearest.distance > maxDistancePixels) return;
        const point = start.clone().lerp(end, nearest.parameter);
        if (visibilityRaycaster &&
            !pointVisibleAtCamera(visibilityRaycaster, occluders, camera, point)) return;
        const cameraDistance = cameraPosition.distanceTo(point);
        if (best && (nearest.distance > best.screenDistance + 0.25 ||
            Math.abs(nearest.distance - best.screenDistance) <= 0.25 &&
            cameraDistance >= best.cameraDistance)) return;
        const curveGroupId = curveGroupIds[index] ?? null;
        const groupedSegments = curveGroupId === null
          ? [measurementSegments[index] ?? segment]
          : measurementSegments.filter((candidate, candidateIndex) =>
            curveGroupIds[candidateIndex] === curveGroupId && candidate?.start && candidate?.end);
        const groupedWorldSegments = [];
        const groupedSeen = new Set();
        groupedSegments.forEach((candidate) => {
          const groupedStart = vectorFromPoint(candidate.start).applyMatrix4(object.matrixWorld);
          const groupedEnd = vectorFromPoint(candidate.end).applyMatrix4(object.matrixWorld);
          const grouped = {
            start: { x: groupedStart.x, y: groupedStart.y, z: groupedStart.z },
            end: { x: groupedEnd.x, y: groupedEnd.y, z: groupedEnd.z },
          };
          const groupedKey = segmentKey(grouped);
          if (groupedSeen.has(groupedKey)) return;
          groupedSeen.add(groupedKey);
          groupedWorldSegments.push(grouped);
        });
        best = {
          cameraDistance,
          curveGroupId,
          documentSolidId: group.userData?.documentSolidId ?? null,
          end: { x: end.x, y: end.y, z: end.z },
          key: curveGroupId === null
            ? key
            : `${group.userData?.documentSolidId ?? group.uuid}:curve:${curveGroupId}`,
          length: groupedWorldSegments.reduce((total, grouped) => total +
            vectorFromPoint(grouped.start).distanceTo(vectorFromPoint(grouped.end)), 0),
          screenDistance: nearest.distance,
          segments: groupedWorldSegments,
          sourceEdgeIndices: sourceEdgeIndices[index] ?? null,
          start: { x: start.x, y: start.y, z: start.z },
        };
      });
    });
  });
  return best;
}

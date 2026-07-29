/* webCAD - Capturas de objetos sobre solidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticTopology,
  pointOnAnalyticCurve,
} from '../analytic-edges.js';
import { pointVisibleAtCamera } from './solid-edge-interaction.js';

const TWO_PI = Math.PI * 2;
const solidSnapGeometryCache = new WeakMap();

function finitePoint(point) {
  const x = Number(point?.x);
  const y = Number(point?.y);
  const z = Number(point?.z ?? 0);
  return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z) ? { x, y, z } : null;
}

function midpoint(first, second) {
  return {
    x: (first.x + second.x) * 0.5,
    y: (first.y + second.y) * 0.5,
    z: (first.z + second.z) * 0.5,
  };
}

function addCandidate(
  candidates,
  seen,
  type,
  point,
  documentSolidId,
  metadata = {},
) {
  const cleanPoint = finitePoint(point);
  if (!cleanPoint) return;
  const entityId = metadata.analyticCurveId ?? metadata.analyticLineId ?? '';
  const key = `${type}:${entityId}:` +
    `${cleanPoint.x.toFixed(8)}:${cleanPoint.y.toFixed(8)}:${cleanPoint.z.toFixed(8)}`;
  if (seen.has(key)) return;
  seen.add(key);
  candidates.push({
    type,
    point: cleanPoint,
    documentSolidId: documentSolidId ?? null,
    ...metadata,
  });
}

function normalizeAngle(angle) {
  const result = Number(angle) % TWO_PI;
  return result < 0 ? result + TWO_PI : result;
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function curveContainsAngle(curve, angle) {
  return curve.closed === true ||
    directedSweep(curve.startAngle, angle, curve.clockwise) <=
      Number(curve.sweep) + 1e-8;
}

function curveMetadata(curve) {
  return {
    analyticCurve: curve,
    analyticCurveId: curve.id,
    analyticCurveType: curve.type,
  };
}

function addAnalyticEdgeCandidates(candidates, seen, analyticEdges, documentSolidId) {
  analyticEdges.lines.forEach((line) => {
    const metadata = {
      analyticLine: line,
      analyticLineId: line.id,
    };
    addCandidate(candidates, seen, 'endpoint', line.start, documentSolidId, metadata);
    addCandidate(candidates, seen, 'endpoint', line.end, documentSolidId, metadata);
    addCandidate(
      candidates,
      seen,
      'midpoint',
      midpoint(line.start, line.end),
      documentSolidId,
      metadata,
    );
  });
  analyticEdges.curves.forEach((curve) => {
    const metadata = curveMetadata(curve);
    if (!curve.closed) {
      addCandidate(
        candidates,
        seen,
        'endpoint',
        pointOnAnalyticCurve(curve, curve.startAngle),
        documentSolidId,
        metadata,
      );
      addCandidate(
        candidates,
        seen,
        'endpoint',
        pointOnAnalyticCurve(curve, curve.endAngle),
        documentSolidId,
        metadata,
      );
      const direction = curve.clockwise ? 1 : -1;
      addCandidate(
        candidates,
        seen,
        'midpoint',
        pointOnAnalyticCurve(
          curve,
          curve.startAngle + direction * curve.sweep * 0.5,
        ),
        documentSolidId,
        metadata,
      );
    }
    addCandidate(
      candidates,
      seen,
      'center',
      curve.center,
      documentSolidId,
      metadata,
    );
    [0, Math.PI / 2, Math.PI, Math.PI * 1.5]
      .filter((angle) => curveContainsAngle(curve, angle))
      .forEach((angle) => addCandidate(
        candidates,
        seen,
        'quadrant',
        pointOnAnalyticCurve(curve, angle),
        documentSolidId,
        metadata,
      ));
  });
}

function addFaceCenter(
  candidates,
  seen,
  points,
  documentSolidId,
  metadata = {},
) {
  if (points.length < 3) return;
  const total = points.reduce((sum, point) => ({
    x: sum.x + point.x,
    y: sum.y + point.y,
    z: sum.z + point.z,
  }), { x: 0, y: 0, z: 0 });
  addCandidate(candidates, seen, 'faceCenter', {
    x: total.x / points.length,
    y: total.y / points.length,
    z: total.z / points.length,
  }, documentSolidId, metadata);
}

function addFaceCenters(candidates, seen, solid, topology, documentSolidId) {
  const vertices = Array.isArray(solid?.vertices) ? solid.vertices.map(finitePoint) : [];
  const planarGroups = (solid?.metadata?.planarFaceGroups ?? [])
    .filter((group) => Array.isArray(group?.outerLoop) && group.outerLoop.length >= 3);
  if (planarGroups.length) {
    planarGroups.forEach((group, groupIndex) => addFaceCenter(
      candidates,
      seen,
      group.outerLoop.map(finitePoint).filter(Boolean),
      documentSolidId,
      {
        semanticFaceId: group.id ?? `planar-face-${groupIndex}`,
        semanticFaceKind: group.kind ?? 'planar-face',
      },
    ));
    return;
  }
  (solid?.faces || []).forEach((face, faceIndex) => {
    if (topology.faceSurfaceIds[faceIndex]) return;
    const points = (face || []).map((index) => vertices[index]).filter(Boolean);
    addFaceCenter(candidates, seen, points, documentSolidId, {
      semanticFaceId: `solid-face-${faceIndex}`,
      semanticFaceKind: 'planar-face',
    });
  });
}

function analyticSnapGeometry(solid) {
  if (!solidSnapGeometryCache.has(solid)) {
    solidSnapGeometryCache.set(solid, {
      edges: deriveSolidAnalyticEdges(solid),
      topology: deriveSolidAnalyticTopology(solid),
    });
  }
  return solidSnapGeometryCache.get(solid);
}

function candidatesFromSolid(solid, documentSolidId) {
  const candidates = [];
  const seen = new Set();
  const geometry = analyticSnapGeometry(solid);
  addAnalyticEdgeCandidates(candidates, seen, geometry.edges, documentSolidId);
  addFaceCenters(candidates, seen, solid, geometry.topology, documentSolidId);
  return candidates;
}

function worldAnalyticCurve(curve, object) {
  if (!curve) return null;
  const center = object.localToWorld(new THREE.Vector3(
    curve.center.x,
    curve.center.y,
    curve.center.z,
  ));
  const linearTransform = new THREE.Matrix3().setFromMatrix4(object.matrixWorld);
  const transformAxis = (axis) => new THREE.Vector3(axis.x, axis.y, axis.z)
    .applyMatrix3(linearTransform);
  const uAxis = transformAxis(curve.uAxis);
  const vAxis = transformAxis(curve.vAxis);
  return {
    ...curve,
    center: { x: center.x, y: center.y, z: center.z },
    uAxis: { x: uAxis.x, y: uAxis.y, z: uAxis.z },
    vAxis: { x: vAxis.x, y: vAxis.y, z: vAxis.z },
  };
}

function worldCandidate(candidate, object) {
  const local = new THREE.Vector3(
    candidate.point.x,
    candidate.point.y,
    candidate.point.z,
  );
  object.updateWorldMatrix?.(true, false);
  const world = object.localToWorld?.(local) ?? local;
  return {
    ...candidate,
    analyticCurve: worldAnalyticCurve(candidate.analyticCurve, object),
    localPoint: { ...candidate.point },
    point: { x: world.x, y: world.y, z: world.z },
  };
}

export function solidObjectSnapCandidates(solidObjects, {
  excludeDocumentSolidIds = [],
  includeWorldOrigin = true,
} = {}) {
  const candidates = includeWorldOrigin
    ? [{
      type: 'origin',
      point: { x: 0, y: 0, z: 0 },
      localPoint: { x: 0, y: 0, z: 0 },
      documentSolidId: null,
      alwaysVisible: true,
    }]
    : [];
  const seenSolids = new Set();
  const excludedIds = new Set(excludeDocumentSolidIds);
  (solidObjects || []).forEach((group) => {
    if (excludedIds.has(group?.userData?.documentSolidId)) return;
    group?.traverse?.((object) => {
      if (excludedIds.has(object?.userData?.documentSolidId)) return;
      const solid = object?.userData?.analyticSolid ?? object?.userData?.solid;
      if (!solid || seenSolids.has(solid)) return;
      seenSolids.add(solid);
      candidates.push(...candidatesFromSolid(solid, object.userData?.documentSolidId)
        .map((candidate) => worldCandidate(candidate, object)));
    });
  });
  return candidates;
}

export function nearestSolidObjectSnap({
  camera,
  canvas,
  event,
  solidObjects,
  maxDistancePixels = 14,
  acceptCandidate = null,
  excludeDocumentSolidIds = [],
  extraCandidates = [],
  includeHidden = false,
} = {}) {
  if (!camera || !canvas || !event) return null;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const occluders = [];
  if (!includeHidden) {
    (solidObjects || []).forEach((group) => {
      group?.traverse?.((object) => {
        if (object?.isMesh && object.visible !== false &&
            object.userData?.type === 'webcad-push-solid') {
          object.updateWorldMatrix?.(true, false);
          occluders.push(object);
        }
      });
    });
  }
  const visibilityRaycaster = occluders.length ? new THREE.Raycaster() : null;
  let nearest = null;
  [
    ...solidObjectSnapCandidates(solidObjects, { excludeDocumentSolidIds }),
    ...(Array.isArray(extraCandidates) ? extraCandidates : []),
  ].forEach((candidate) => {
    if (acceptCandidate && !acceptCandidate(candidate)) return;
    const projected = new THREE.Vector3(candidate.point.x, candidate.point.y, candidate.point.z).project(camera);
    if (projected.z < -1 || projected.z > 1) return;
    const x = rect.left + (projected.x + 1) * width * 0.5;
    const y = rect.top + (1 - projected.y) * height * 0.5;
    const distance = Math.hypot(event.clientX - x, event.clientY - y);
    if (distance > maxDistancePixels) return;
    if (!candidate.alwaysVisible && visibilityRaycaster && !pointVisibleAtCamera(
      visibilityRaycaster,
      occluders,
      camera,
      new THREE.Vector3(candidate.point.x, candidate.point.y, candidate.point.z),
    )) return;
    const cameraDistance = camera.position.distanceTo(new THREE.Vector3(
      candidate.point.x,
      candidate.point.y,
      candidate.point.z,
    ));
    const sameScreenPoint = nearest && Math.abs(distance - nearest.distancePixels) <= 0.25;
    if ((nearest && distance > nearest.distancePixels + 0.25) ||
        (sameScreenPoint && cameraDistance >= nearest.cameraDistance)) return;
    nearest = { ...candidate, distancePixels: distance, cameraDistance };
  });
  return nearest;
}

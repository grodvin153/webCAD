/* webCAD - Capturas de objetos sobre solidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { pointOnPrincipalPlane, principalPlaneDefinition } from '../principal-plane.js';

const SNAP_TYPES = new Set(['circle', 'arc-circle', 'ellipse', 'arc-ellipse']);

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

function addCandidate(candidates, seen, type, point, documentSolidId) {
  const cleanPoint = finitePoint(point);
  if (!cleanPoint) return;
  const key = `${type}:${cleanPoint.x.toFixed(8)}:${cleanPoint.y.toFixed(8)}:${cleanPoint.z.toFixed(8)}`;
  if (seen.has(key)) return;
  seen.add(key);
  candidates.push({ type, point: cleanPoint, documentSolidId: documentSolidId ?? null });
}

function exactProfile(solid) {
  const exactGeometry = solid?.metadata?.exactGeometry;
  return exactGeometry?.profile ?? exactGeometry?.extrusion?.profile ?? null;
}

function exactExtrusionOffset(solid) {
  const extrusion = solid?.metadata?.exactGeometry?.extrusion;
  const offset = finitePoint(extrusion?.offset);
  if (offset) return offset;
  const distance = Number(solid?.metadata?.distance ?? solid?.metadata?.height);
  if (!Number.isFinite(distance)) return null;
  const normal = principalPlaneDefinition(solid?.metadata?.sketchPlane).normal;
  return { x: normal.x * distance, y: normal.y * distance, z: normal.z * distance };
}

function addExactCurveCenters(candidates, seen, solid, documentSolidId) {
  const profile = exactProfile(solid);
  if (!profile) return;
  const offset = exactExtrusionOffset(solid);
  const plane = solid?.metadata?.sketchPlane ?? 'XY';
  const loops = [profile.outerLoop, ...(profile.innerLoops || [])];
  loops.forEach((loop) => {
    (loop?.segments || []).forEach((segment) => {
      if (!SNAP_TYPES.has(segment?.type)) return;
      const localCenter = finitePoint(segment.center);
      if (!localCenter) return;
      const center = pointOnPrincipalPlane(localCenter, plane);
      addCandidate(candidates, seen, 'center', center, documentSolidId);
      if (offset) {
        addCandidate(candidates, seen, 'center', {
          x: center.x + offset.x,
          y: center.y + offset.y,
          z: center.z + offset.z,
        }, documentSolidId);
      }
    });
  });
}

function addFaceCenters(candidates, seen, solid, documentSolidId) {
  const vertices = Array.isArray(solid?.vertices) ? solid.vertices.map(finitePoint) : [];
  (solid?.faces || []).forEach((face) => {
    const points = (face || []).map((index) => vertices[index]).filter(Boolean);
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
    }, documentSolidId);
  });
}

function candidatesFromSolid(solid, documentSolidId) {
  const candidates = [];
  const seen = new Set();
  const vertices = Array.isArray(solid?.vertices) ? solid.vertices.map(finitePoint) : [];
  vertices.forEach((point) => addCandidate(candidates, seen, 'endpoint', point, documentSolidId));
  (solid?.edges || []).forEach(([firstIndex, secondIndex]) => {
    const first = vertices[firstIndex];
    const second = vertices[secondIndex];
    if (first && second) addCandidate(candidates, seen, 'midpoint', midpoint(first, second), documentSolidId);
  });
  addExactCurveCenters(candidates, seen, solid, documentSolidId);
  addFaceCenters(candidates, seen, solid, documentSolidId);
  return candidates;
}

export function solidObjectSnapCandidates(solidObjects) {
  const candidates = [];
  const seenSolids = new Set();
  (solidObjects || []).forEach((group) => {
    group?.traverse?.((object) => {
      const solid = object?.userData?.solid;
      if (!solid || seenSolids.has(solid)) return;
      seenSolids.add(solid);
      candidates.push(...candidatesFromSolid(solid, object.userData?.documentSolidId));
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
} = {}) {
  if (!camera || !canvas || !event) return null;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  let nearest = null;
  solidObjectSnapCandidates(solidObjects).forEach((candidate) => {
    if (acceptCandidate && !acceptCandidate(candidate)) return;
    const projected = new THREE.Vector3(candidate.point.x, candidate.point.y, candidate.point.z).project(camera);
    if (projected.z < -1 || projected.z > 1) return;
    const x = rect.left + (projected.x + 1) * width * 0.5;
    const y = rect.top + (1 - projected.y) * height * 0.5;
    const distance = Math.hypot(event.clientX - x, event.clientY - y);
    const cameraDistance = camera.position.distanceTo(new THREE.Vector3(
      candidate.point.x,
      candidate.point.y,
      candidate.point.z,
    ));
    const sameScreenPoint = nearest && Math.abs(distance - nearest.distancePixels) <= 0.25;
    if (distance > maxDistancePixels || (nearest && distance > nearest.distancePixels + 0.25) ||
        (sameScreenPoint && cameraDistance >= nearest.cameraDistance)) return;
    nearest = { ...candidate, distancePixels: distance, cameraDistance };
  });
  return nearest;
}

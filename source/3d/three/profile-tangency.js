/* webCAD - Compatibilidad de tangencias en perfiles 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { pointFromSketchPlane } from '../sketch-plane.js';

const DEFAULT_TANGENCY_ANGLE = Math.PI / 180;

function profileSize(solid) {
  const metadataSize = Number(solid?.metadata?.profileSize);
  if (Number.isInteger(metadataSize) && metadataSize >= 3) return metadataSize;
  const inferred = Number(solid?.vertices?.length) / 2;
  return Number.isInteger(inferred) && inferred >= 3 ? inferred : 0;
}

function loopForIndex(index, sizes) {
  let offset = 0;
  for (const size of sizes) {
    if (index >= offset && index < offset + size) return { offset, size };
    offset += size;
  }
  return null;
}

function profilePoint(point, plane) {
  const local = pointFromSketchPlane(point, plane);
  return { x: local.x, y: local.y };
}

function normalizedDirection(start, end, plane) {
  const first = profilePoint(start, plane);
  const second = profilePoint(end, plane);
  const x = second.x - first.x;
  const y = second.y - first.y;
  const length = Math.hypot(x, y);
  return length > 1e-12 ? { x: x / length, y: y / length } : null;
}

export function profileTangencyIndices(solid, candidates, options = {}) {
  const size = profileSize(solid);
  if (!size) return [];
  const configuredSizes = Array.isArray(solid?.metadata?.profileLoopSizes)
    ? solid.metadata.profileLoopSizes.map(Number)
    : [size];
  const loopSizes = configuredSizes.every((value) => Number.isInteger(value) && value >= 3) &&
    configuredSizes.reduce((sum, value) => sum + value, 0) === size
    ? configuredSizes
    : [size];
  const angleTolerance = Number(options.angleTolerance) || DEFAULT_TANGENCY_ANGLE;
  const cosineTolerance = Math.cos(angleTolerance);
  const result = [];
  const plane = solid?.metadata?.workplane ?? solid?.metadata?.sketchPlane ?? 'XY';
  for (const value of Array.isArray(candidates) ? candidates : []) {
    const index = Number(value);
    const loop = Number.isInteger(index) ? loopForIndex(index, loopSizes) : null;
    if (!loop) continue;
    const local = index - loop.offset;
    const previousIndex = loop.offset + (local - 1 + loop.size) % loop.size;
    const nextIndex = loop.offset + (local + 1) % loop.size;
    const incoming = normalizedDirection(solid.vertices[previousIndex], solid.vertices[index], plane);
    const outgoing = normalizedDirection(solid.vertices[index], solid.vertices[nextIndex], plane);
    if (!incoming || !outgoing) continue;
    const dot = incoming.x * outgoing.x + incoming.y * outgoing.y;
    if (Math.abs(dot) >= cosineTolerance) result.push(index);
  }
  return result;
}

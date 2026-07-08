/* webCAD - Calibracion y alineacion de imagenes | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../config.js';
import { coordinateZ } from '../coordinates/point3.js';
import { distance } from '../geometry.js';

function normalizeAngle(angle) {
  let normalized = angle;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  while (normalized <= -Math.PI) normalized += Math.PI * 2;
  return normalized;
}

function transformPoint(point, sourceStart, targetStart, scale, angle) {
  const deltaX = point.x - sourceStart.x;
  const deltaY = point.y - sourceStart.y;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    x: targetStart.x + (deltaX * cosine - deltaY * sine) * scale,
    y: targetStart.y + (deltaX * sine + deltaY * cosine) * scale,
    z: coordinateZ(point),
  };
}

export function imageAlignment(entity, sourceStart, sourceEnd, targetStart, targetEnd) {
  const sourceLength = distance(sourceStart, sourceEnd);
  const targetLength = distance(targetStart, targetEnd);
  if (sourceLength <= SNAP_THRESHOLD || targetLength <= SNAP_THRESHOLD) return null;
  const sourceAngle = Math.atan2(sourceEnd.y - sourceStart.y, sourceEnd.x - sourceStart.x);
  const targetAngle = Math.atan2(targetEnd.y - targetStart.y, targetEnd.x - targetStart.x);
  const angle = normalizeAngle(targetAngle - sourceAngle);
  const scale = targetLength / sourceLength;
  return {
    center: transformPoint(entity.center, sourceStart, targetStart, scale, angle),
    width: entity.width * scale,
    height: entity.height * scale,
    rotation: entity.rotation + angle * 180 / Math.PI,
  };
}

export function bestImageAlignment(entity, sourceStart, sourceEnd, segment) {
  const forward = imageAlignment(entity, sourceStart, sourceEnd, segment.start, segment.end);
  const reverse = imageAlignment(entity, sourceStart, sourceEnd, segment.end, segment.start);
  if (!forward) return reverse;
  if (!reverse) return forward;
  const forwardRotation = Math.abs(normalizeAngle((forward.rotation - entity.rotation) * Math.PI / 180));
  const reverseRotation = Math.abs(normalizeAngle((reverse.rotation - entity.rotation) * Math.PI / 180));
  return forwardRotation <= reverseRotation ? forward : reverse;
}

export function applyImageAlignment(entity, alignment) {
  if (!entity || !alignment) return false;
  entity.center = { ...alignment.center };
  entity.width = alignment.width;
  entity.height = alignment.height;
  entity.rotation = alignment.rotation;
  return true;
}

export function calibrateImageLength(entity, sourceStart, sourceEnd, targetLength) {
  const sourceLength = distance(sourceStart, sourceEnd);
  if (sourceLength <= SNAP_THRESHOLD || !Number.isFinite(targetLength) || targetLength <= SNAP_THRESHOLD) {
    return false;
  }
  const scale = targetLength / sourceLength;
  entity.center = {
    x: sourceStart.x + (entity.center.x - sourceStart.x) * scale,
    y: sourceStart.y + (entity.center.y - sourceStart.y) * scale,
    z: coordinateZ(entity.center),
  };
  entity.width *= scale;
  entity.height *= scale;
  return true;
}

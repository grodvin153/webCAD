/* webCAD - Adaptador experimental de entidades 2D a lineas Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

const TWO_PI = Math.PI * 2;
const DEFAULT_CURVE_SEGMENTS = 64;

function normalizeAngle(angle) {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function mappedPoint(point, invertY) {
  const x = Number(point?.x);
  const y = Number(point?.y);
  const z = point?.z === undefined ? 0 : Number(point.z);
  if (![x, y, z].every(Number.isFinite)) return null;
  return { x, y: invertY ? -y : y, z };
}

function segment(start, end, entity, segmentIndex = null) {
  return { start, end, entity, segmentIndex };
}

function circularSegments(entity, options) {
  const center = mappedPoint(entity?.center, options.invertY);
  const radius = Number(entity?.radius);
  if (!center || !Number.isFinite(radius) || radius <= 0) return [];
  const isCircle = entity.type === 'CIRCLE';
  const startAngle = isCircle ? 0 : Number(entity.startAngle);
  const endAngle = isCircle ? TWO_PI : Number(entity.endAngle);
  if (![startAngle, endAngle].every(Number.isFinite)) return [];
  const clockwise = entity.clockwise !== false;
  const sweep = isCircle
    ? TWO_PI
    : clockwise
      ? normalizeAngle(endAngle - startAngle)
      : normalizeAngle(startAngle - endAngle);
  const stepCount = Math.max(2, Math.ceil(options.curveSegments * sweep / TWO_PI));
  const direction = clockwise ? 1 : -1;
  const points = Array.from({ length: stepCount + 1 }, (_, index) => {
    const angle = startAngle + direction * sweep * index / stepCount;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + (options.invertY ? -Math.sin(angle) : Math.sin(angle)) * radius,
      z: center.z,
    };
  });
  return Array.from({ length: stepCount }, (_, index) =>
    segment(points[index], points[index + 1], entity, index));
}

function polylineSegments(entity, options) {
  if (!Array.isArray(entity?.vertices) || entity.vertices.length < 2) return [];
  const segmentCount = entity.closed
    ? entity.vertices.length
    : entity.vertices.length - 1;
  const result = [];
  for (let index = 0; index < segmentCount; index += 1) {
    const definition = entity.segments?.[index];
    if (definition?.type === 'ARC') {
      options.onWarning?.('Los arcos internos de POLYLINE todavía se omiten en la vista 3D', entity);
      continue;
    }
    const start = mappedPoint(entity.vertices[index], options.invertY);
    const end = mappedPoint(
      entity.vertices[(index + 1) % entity.vertices.length],
      options.invertY,
    );
    if (start && end) result.push(segment(start, end, entity, index));
  }
  return result;
}

export function entityLineSegments3d(entity, options = {}) {
  const settings = {
    curveSegments: Math.max(8, Number(options.curveSegments) || DEFAULT_CURVE_SEGMENTS),
    invertY: options.invertY !== false,
    onWarning: options.onWarning,
  };
  if (entity?.type === 'LINE') {
    const start = mappedPoint(entity.start, settings.invertY);
    const end = mappedPoint(entity.end, settings.invertY);
    return start && end ? [segment(start, end, entity)] : [];
  }
  if (entity?.type === 'POLYLINE') {
    return polylineSegments(entity, settings);
  }
  if (entity?.type === 'CIRCLE' || entity?.type === 'ARC') {
    return circularSegments(entity, settings);
  }
  settings.onWarning?.(`Entidad ${entity?.type ?? 'desconocida'} omitida en la vista 3D`, entity);
  return [];
}

export function entitiesToThreeLines(entities, options = {}) {
  const sourceEntities = Array.isArray(entities) ? entities : [];
  const segments = sourceEntities.flatMap((entity) => entityLineSegments3d(entity, options));
  const positions = new Float32Array(segments.length * 6);
  segments.forEach((item, index) => {
    const offset = index * 6;
    positions.set([
      item.start.x, item.start.y, item.start.z,
      item.end.x, item.end.y, item.end.z,
    ], offset);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  const material = new THREE.LineBasicMaterial({ color: options.color ?? 0x20343d });
  const lines = new THREE.LineSegments(geometry, material);
  lines.userData.segmentCount = segments.length;
  lines.userData.sourceSegments = segments;
  return lines;
}

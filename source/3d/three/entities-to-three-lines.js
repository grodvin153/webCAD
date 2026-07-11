/* webCAD - Adaptador experimental de entidades 2D a lineas Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  directedArcSweep,
  sampleArcByCenter,
  sampleEllipseEntity,
  TWO_PI,
} from './curve-discretization.js';

const DEFAULT_CURVE_SEGMENTS = 64;

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
    : directedArcSweep(startAngle, endAngle, clockwise);
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

function ellipseSegments(entity, options) {
  const points = sampleEllipseEntity(entity, options)
    .map((point) => mappedPoint(point, options.invertY))
    .filter(Boolean);
  return Array.from({ length: Math.max(0, points.length - 1) }, (_, index) =>
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
    const start = mappedPoint(entity.vertices[index], options.invertY);
    const end = mappedPoint(
      entity.vertices[(index + 1) % entity.vertices.length],
      options.invertY,
    );
    if (!start || !end) continue;
    if (definition?.type === 'ARC') {
      const center = mappedPoint(definition.center, options.invertY);
      if (!center) {
        options.onWarning?.('Arco interno de POLYLINE omitido por centro no valido', entity);
        continue;
      }
      const arcPoints = sampleArcByCenter({
        start,
        end,
        center,
        clockwise: settingsArcClockwise(definition.clockwise !== false, options.invertY),
      }, options);
      for (let step = 0; step < arcPoints.length - 1; step += 1) {
        result.push(segment(arcPoints[step], arcPoints[step + 1], entity, index));
      }
      continue;
    }
    result.push(segment(start, end, entity, index));
  }
  return result;
}

function settingsArcClockwise(clockwise, invertY) {
  return invertY ? !clockwise : clockwise;
}

export function entityLineSegments3d(entity, options = {}) {
  const settings = {
    curveSegments: Math.max(8, Number(options.curveSegments) || DEFAULT_CURVE_SEGMENTS),
    invertY: options.invertY !== false,
    arcChordTolerance: options.arcChordTolerance,
    maxArcSegmentAngle: options.maxArcSegmentAngle,
    maxArcSegments: options.maxArcSegments,
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
  if (entity?.type === 'ELLIPSE' || entity?.type === 'ELLIPSE_ARC') {
    return ellipseSegments(entity, settings);
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

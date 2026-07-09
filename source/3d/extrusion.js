/* webCAD - Extrusion de perfiles cerrados experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import { createSolid3d } from './solid.js';

const PROFILE_EPSILON = 1e-9;

function samePoint(first, second) {
  return Math.abs(first.x - second.x) <= PROFILE_EPSILON &&
    Math.abs(first.y - second.y) <= PROFILE_EPSILON &&
    Math.abs(first.z - second.z) <= PROFILE_EPSILON;
}

function normalizedProfile(points) {
  if (!Array.isArray(points)) {
    throw new TypeError('El perfil de extrusion debe ser un array de puntos');
  }

  const normalized = [];
  for (const point of points) {
    const vertex = {
      x: Number(point?.x),
      y: Number(point?.y),
      z: point?.z === undefined ? 0 : Number(point.z),
    };
    if (![vertex.x, vertex.y, vertex.z].every(Number.isFinite)) {
      throw new TypeError('El perfil de extrusion contiene coordenadas no validas');
    }
    if (!normalized.length || !samePoint(normalized[normalized.length - 1], vertex)) {
      normalized.push(vertex);
    }
  }

  if (normalized.length > 1 && samePoint(normalized[0], normalized[normalized.length - 1])) {
    normalized.pop();
  }
  if (normalized.length < 3) {
    throw new RangeError('La extrusion necesita al menos tres puntos utiles');
  }
  return normalized;
}

export function extrudeClosedProfile(points, height, options = {}) {
  const extrusionHeight = Number(height);
  if (!Number.isFinite(extrusionHeight) || Math.abs(extrusionHeight) <= PROFILE_EPSILON) {
    throw new RangeError('La altura de extrusion debe ser distinta de cero');
  }

  const profile = normalizedProfile(points);
  const profileSize = profile.length;
  const vertices = [
    ...profile,
    ...profile.map((point) => ({ ...point, z: point.z + extrusionHeight })),
  ];
  const lowerFace = Array.from({ length: profileSize }, (_, index) => profileSize - index - 1);
  const upperFace = Array.from({ length: profileSize }, (_, index) => profileSize + index);
  const faces = extrusionHeight > 0
    ? [lowerFace, upperFace]
    : [lowerFace.reverse(), upperFace.reverse()];
  const edges = [];

  for (let index = 0; index < profileSize; index += 1) {
    const next = (index + 1) % profileSize;
    const lowerIndex = index;
    const lowerNext = next;
    const upperIndex = profileSize + index;
    const upperNext = profileSize + next;
    faces.push(extrusionHeight > 0
      ? [lowerIndex, lowerNext, upperNext, upperIndex]
      : [lowerIndex, upperIndex, upperNext, lowerNext]);
    edges.push(
      [lowerIndex, lowerNext],
      [upperIndex, upperNext],
      [lowerIndex, upperIndex],
    );
  }

  return createSolid3d({
    vertices,
    faces,
    edges,
    metadata: {
      type: 'extrusion',
      height: extrusionHeight,
      source: options.source ?? null,
    },
  });
}

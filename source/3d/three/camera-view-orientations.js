/* webCAD - Orientaciones normalizadas de camara para el cubo de vistas | SPDX-License-Identifier: GPL-3.0-or-later */

const EPSILON = 1e-12;
const ISOMETRIC_COMPONENT = 1 / Math.sqrt(3);

function normalizedDirection(direction = {}) {
  const x = Number(direction.x) || 0;
  const y = Number(direction.y) || 0;
  const z = Number(direction.z) || 0;
  const length = Math.hypot(x, y, z);
  if (length <= EPSILON) {
    return {
      x: ISOMETRIC_COMPONENT,
      y: -ISOMETRIC_COMPONENT,
      z: ISOMETRIC_COMPONENT,
    };
  }
  return { x: x / length, y: y / length, z: z / length };
}

function frozenView(id, label, type, direction) {
  return Object.freeze({
    id,
    label,
    type,
    direction: Object.freeze(normalizedDirection(direction)),
  });
}

const FACE_VIEWS = [
  frozenView('planta', 'Planta', 'face', { x: 0, y: 0, z: 1 }),
  frozenView('inferior', 'Vista inferior', 'face', { x: 0, y: 0, z: -1 }),
  frozenView('alzado', 'Alzado', 'face', { x: 0, y: -1, z: 0 }),
  frozenView('posterior', 'Vista posterior', 'face', { x: 0, y: 1, z: 0 }),
  frozenView('perfil-derecho', 'Perfil derecho', 'face', { x: 1, y: 0, z: 0 }),
  frozenView('perfil-izquierdo', 'Perfil izquierdo', 'face', { x: -1, y: 0, z: 0 }),
];

const CORNER_NAMES = new Map([
  ['1,-1,1', ['iso-se', 'Isométrica sureste']],
  ['1,1,1', ['iso-ne', 'Isométrica noreste']],
  ['-1,1,1', ['iso-no', 'Isométrica noroeste']],
  ['-1,-1,1', ['iso-so', 'Isométrica suroeste']],
  ['1,-1,-1', ['iso-se-inferior', 'Isométrica sureste inferior']],
  ['1,1,-1', ['iso-ne-inferior', 'Isométrica noreste inferior']],
  ['-1,1,-1', ['iso-no-inferior', 'Isométrica noroeste inferior']],
  ['-1,-1,-1', ['iso-so-inferior', 'Isométrica suroeste inferior']],
]);

const CORNER_VIEWS = [...CORNER_NAMES.entries()].map(([key, [id, label]]) => {
  const [x, y, z] = key.split(',').map(Number);
  return frozenView(id, label, 'corner', { x, y, z });
});

const EDGE_VIEWS = [];
for (let freeAxis = 0; freeAxis < 3; freeAxis += 1) {
  for (const firstSign of [-1, 1]) {
    for (const secondSign of [-1, 1]) {
      const components = [firstSign, secondSign];
      const direction = { x: 0, y: 0, z: 0 };
      const fixedAxes = ['x', 'y', 'z'].filter((_, index) => index !== freeAxis);
      direction[fixedAxes[0]] = components[0];
      direction[fixedAxes[1]] = components[1];
      const id = `arista-${direction.x}-${direction.y}-${direction.z}`;
      EDGE_VIEWS.push(frozenView(id, 'Vista diagonal', 'edge', direction));
    }
  }
}

export const DEFAULT_ISOMETRIC_VIEW_ID = 'iso-se';
export const DEFAULT_ISOMETRIC_DIRECTION = Object.freeze({
  x: ISOMETRIC_COMPONENT,
  y: -ISOMETRIC_COMPONENT,
  z: ISOMETRIC_COMPONENT,
});
export const DEFAULT_CAMERA_DISTANCE_FACTOR = 3;

export const CAMERA_VIEW_ORIENTATIONS = Object.freeze([
  ...FACE_VIEWS,
  ...EDGE_VIEWS,
  ...CORNER_VIEWS,
]);

const VIEW_BY_ID = new Map(CAMERA_VIEW_ORIENTATIONS.map((view) => [view.id, view]));

export function cameraViewOrientation(value = DEFAULT_ISOMETRIC_VIEW_ID) {
  if (typeof value === 'string') {
    return VIEW_BY_ID.get(value) ?? VIEW_BY_ID.get(DEFAULT_ISOMETRIC_VIEW_ID);
  }
  const direction = normalizedDirection(value?.direction ?? value);
  return {
    id: value?.id ?? null,
    label: value?.label ?? 'Vista personalizada',
    type: value?.type ?? 'custom',
    direction,
  };
}

export function cameraViewPosition({
  direction,
  distance,
  position,
  target,
} = {}) {
  const center = {
    x: Number(target?.x) || 0,
    y: Number(target?.y) || 0,
    z: Number(target?.z) || 0,
  };
  const current = {
    x: Number(position?.x) || 0,
    y: Number(position?.y) || 0,
    z: Number(position?.z) || 0,
  };
  const currentDistance = Math.hypot(
    current.x - center.x,
    current.y - center.y,
    current.z - center.z,
  );
  const safeDistance = Math.max(
    EPSILON,
    Number.isFinite(Number(distance)) ? Number(distance) : currentDistance || 1,
  );
  const unit = normalizedDirection(direction);
  return {
    x: center.x + unit.x * safeDistance,
    y: center.y + unit.y * safeDistance,
    z: center.z + unit.z * safeDistance,
  };
}

export function cameraViewDirection(position, target) {
  return normalizedDirection({
    x: (Number(position?.x) || 0) - (Number(target?.x) || 0),
    y: (Number(position?.y) || 0) - (Number(target?.y) || 0),
    z: (Number(position?.z) || 0) - (Number(target?.z) || 0),
  });
}

export function cameraViewUp(value) {
  const orientation = cameraViewOrientation(value);
  return Math.abs(orientation.direction.z) > 1 - 1e-10
    ? { x: 0, y: 1, z: 0 }
    : { x: 0, y: 0, z: 1 };
}

export function closestCameraView(direction, minimumDot = 0.998) {
  const unit = normalizedDirection(direction);
  let closest = null;
  let closestDot = -Infinity;
  CAMERA_VIEW_ORIENTATIONS.forEach((view) => {
    const dot =
      unit.x * view.direction.x +
      unit.y * view.direction.y +
      unit.z * view.direction.z;
    if (dot <= closestDot) return;
    closest = view;
    closestDot = dot;
  });
  return closestDot >= minimumDot ? closest : null;
}

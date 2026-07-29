/* webCAD - Proyeccion del dibujo 2D en planos principales 3D | SPDX-License-Identifier: GPL-3.0-or-later */

export const PRINCIPAL_PLANE_IDS = Object.freeze(['XY', 'XZ', 'YZ']);

const DEFINITIONS = Object.freeze({
  XY: Object.freeze({
    id: 'XY',
    label: 'Planta XY',
    origin: Object.freeze({ x: 0, y: 0, z: 0 }),
    xAxis: Object.freeze({ x: 1, y: 0, z: 0 }),
    yAxis: Object.freeze({ x: 0, y: 1, z: 0 }),
    normal: Object.freeze({ x: 0, y: 0, z: 1 }),
  }),
  XZ: Object.freeze({
    id: 'XZ',
    label: 'Alzado XZ',
    origin: Object.freeze({ x: 0, y: 0, z: 0 }),
    xAxis: Object.freeze({ x: 1, y: 0, z: 0 }),
    yAxis: Object.freeze({ x: 0, y: 0, z: 1 }),
    normal: Object.freeze({ x: 0, y: -1, z: 0 }),
  }),
  YZ: Object.freeze({
    id: 'YZ',
    label: 'Perfil YZ',
    origin: Object.freeze({ x: 0, y: 0, z: 0 }),
    xAxis: Object.freeze({ x: 0, y: 1, z: 0 }),
    yAxis: Object.freeze({ x: 0, y: 0, z: 1 }),
    normal: Object.freeze({ x: 1, y: 0, z: 0 }),
  }),
});

function clonePoint(point) {
  return { x: Number(point?.x), y: Number(point?.y), z: Number(point?.z ?? 0) };
}

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

export function normalizePrincipalPlane(value) {
  const id = String(value ?? '').toUpperCase();
  return PRINCIPAL_PLANE_IDS.includes(id) ? id : 'XY';
}

export function principalPlaneDefinition(value) {
  const definition = DEFINITIONS[normalizePrincipalPlane(value)];
  return {
    id: definition.id,
    label: definition.label,
    origin: { ...definition.origin },
    xAxis: { ...definition.xAxis },
    yAxis: { ...definition.yAxis },
    normal: { ...definition.normal },
  };
}

export function pointOnPrincipalPlane(point, plane = 'XY') {
  const definition = principalPlaneDefinition(plane);
  const local = clonePoint(point);
  return {
    x: definition.origin.x + definition.xAxis.x * local.x + definition.yAxis.x * local.y + definition.normal.x * local.z,
    y: definition.origin.y + definition.xAxis.y * local.x + definition.yAxis.y * local.y + definition.normal.y * local.z,
    z: definition.origin.z + definition.xAxis.z * local.x + definition.yAxis.z * local.y + definition.normal.z * local.z,
  };
}

export function pointFromPrincipalPlane(point, plane = 'XY') {
  const definition = principalPlaneDefinition(plane);
  const relative = {
    x: Number(point?.x) - definition.origin.x,
    y: Number(point?.y) - definition.origin.y,
    z: Number(point?.z ?? 0) - definition.origin.z,
  };
  return {
    x: relative.x * definition.xAxis.x + relative.y * definition.xAxis.y + relative.z * definition.xAxis.z,
    y: relative.x * definition.yAxis.x + relative.y * definition.yAxis.y + relative.z * definition.yAxis.z,
    z: relative.x * definition.normal.x + relative.y * definition.normal.y + relative.z * definition.normal.z,
  };
}

export function exactProfileOnPrincipalPlane(profile, plane = 'XY') {
  if (!profile) return profile;
  const clone = cloneJson(profile);
  const definition = principalPlaneDefinition(plane);
  clone.plane = {
    type: 'plane',
    origin: definition.origin,
    normal: definition.normal,
    xAxis: definition.xAxis,
    yAxis: definition.yAxis,
  };
  return clone;
}

export function faceOnPrincipalPlane(face, plane = 'XY') {
  const id = normalizePrincipalPlane(plane);
  const definition = principalPlaneDefinition(id);
  const localPoints = (face?.points || []).map(clonePoint);
  const localHoles = (face?.holes || []).map((loop) => loop.map(clonePoint));
  return {
    ...face,
    points: localPoints.map((point) => pointOnPrincipalPlane(point, id)),
    holes: localHoles.map((loop) => loop.map((point) => pointOnPrincipalPlane(point, id))),
    normal: definition.normal,
    sketchPlane: id,
    localPoints,
    localHoles,
    exactProfile: exactProfileOnPrincipalPlane(face?.exactProfile, id),
  };
}

export function solidOnPrincipalPlane(solid, plane = 'XY') {
  const id = normalizePrincipalPlane(plane);
  const definition = principalPlaneDefinition(id);
  return {
    ...solid,
    vertices: (solid?.vertices || []).map((point) => pointOnPrincipalPlane(point, id)),
    faces: (solid?.faces || []).map((face) => [...face]),
    edges: (solid?.edges || []).map((edge) => [...edge]),
    metadata: {
      ...(solid?.metadata || {}),
      sketchPlane: id,
      normal: definition.normal,
    },
  };
}

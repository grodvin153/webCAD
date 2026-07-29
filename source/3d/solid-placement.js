/* webCAD - Colocacion rigida de solidos 3D | SPDX-License-Identifier: GPL-3.0-or-later */

const EPSILON = 1e-12;

export const IDENTITY_SOLID_PLACEMENT = Object.freeze({
  position: Object.freeze({ x: 0, y: 0, z: 0 }),
  quaternion: Object.freeze({ x: 0, y: 0, z: 0, w: 1 }),
});

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function point3(point) {
  return {
    x: finite(point?.x),
    y: finite(point?.y),
    z: finite(point?.z),
  };
}

export function normalizeQuaternion(quaternion) {
  const clean = {
    x: finite(quaternion?.x),
    y: finite(quaternion?.y),
    z: finite(quaternion?.z),
    w: finite(quaternion?.w, 1),
  };
  const length = Math.hypot(clean.x, clean.y, clean.z, clean.w);
  if (length <= EPSILON) return { ...IDENTITY_SOLID_PLACEMENT.quaternion };
  const sign = clean.w < 0 ? -1 : 1;
  return {
    x: sign * clean.x / length,
    y: sign * clean.y / length,
    z: sign * clean.z / length,
    w: sign * clean.w / length,
  };
}

export function normalizeSolidPlacement(placement) {
  return {
    position: point3(placement?.position),
    quaternion: normalizeQuaternion(placement?.quaternion),
  };
}

export function multiplyQuaternions(first, second) {
  const a = normalizeQuaternion(first);
  const b = normalizeQuaternion(second);
  return normalizeQuaternion({
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  });
}

export function quaternionFromAxisAngle(axis, angleRadians) {
  const cleanAxis = point3(axis);
  const length = Math.hypot(cleanAxis.x, cleanAxis.y, cleanAxis.z);
  const angle = finite(angleRadians);
  if (length <= EPSILON || Math.abs(angle) <= EPSILON) {
    return { ...IDENTITY_SOLID_PLACEMENT.quaternion };
  }
  const half = angle * 0.5;
  const scale = Math.sin(half) / length;
  return normalizeQuaternion({
    x: cleanAxis.x * scale,
    y: cleanAxis.y * scale,
    z: cleanAxis.z * scale,
    w: Math.cos(half),
  });
}

export function rotatePointByQuaternion(point, quaternion) {
  const p = point3(point);
  const q = normalizeQuaternion(quaternion);
  const twiceX = 2 * (q.y * p.z - q.z * p.y);
  const twiceY = 2 * (q.z * p.x - q.x * p.z);
  const twiceZ = 2 * (q.x * p.y - q.y * p.x);
  return {
    x: p.x + q.w * twiceX + q.y * twiceZ - q.z * twiceY,
    y: p.y + q.w * twiceY + q.z * twiceX - q.x * twiceZ,
    z: p.z + q.w * twiceZ + q.x * twiceY - q.y * twiceX,
  };
}

export function solidWorldMatrix(solidObject) {
  const placement = normalizeSolidPlacement(solidObject?.placement ?? solidObject);
  const { x, y, z, w } = placement.quaternion;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  return [
    1 - (yy + zz), xy + wz, xz - wy, 0,
    xy - wz, 1 - (xx + zz), yz + wx, 0,
    xz + wy, yz - wx, 1 - (xx + yy), 0,
    placement.position.x, placement.position.y, placement.position.z, 1,
  ];
}

export function solidLocalToWorld(point, solidObject) {
  const placement = normalizeSolidPlacement(solidObject?.placement ?? solidObject);
  const rotated = rotatePointByQuaternion(point, placement.quaternion);
  return {
    x: rotated.x + placement.position.x,
    y: rotated.y + placement.position.y,
    z: rotated.z + placement.position.z,
  };
}

export function solidWorldToLocal(point, solidObject) {
  const placement = normalizeSolidPlacement(solidObject?.placement ?? solidObject);
  const translated = {
    x: finite(point?.x) - placement.position.x,
    y: finite(point?.y) - placement.position.y,
    z: finite(point?.z) - placement.position.z,
  };
  const inverse = {
    x: -placement.quaternion.x,
    y: -placement.quaternion.y,
    z: -placement.quaternion.z,
    w: placement.quaternion.w,
  };
  return rotatePointByQuaternion(translated, inverse);
}

export function translateSolidPlacement(placement, displacement) {
  const current = normalizeSolidPlacement(placement);
  const vector = point3(displacement);
  return {
    position: {
      x: current.position.x + vector.x,
      y: current.position.y + vector.y,
      z: current.position.z + vector.z,
    },
    quaternion: current.quaternion,
  };
}

export function rotateSolidPlacement(placement, {
  axisStart,
  axisEnd,
  angleDegrees,
} = {}) {
  const current = normalizeSolidPlacement(placement);
  const start = point3(axisStart);
  const end = point3(axisEnd);
  const axis = {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z,
  };
  if (Math.hypot(axis.x, axis.y, axis.z) <= EPSILON) return null;
  const rotation = quaternionFromAxisAngle(axis, finite(angleDegrees) * Math.PI / 180);
  const relativePosition = {
    x: current.position.x - start.x,
    y: current.position.y - start.y,
    z: current.position.z - start.z,
  };
  const rotatedPosition = rotatePointByQuaternion(relativePosition, rotation);
  return normalizeSolidPlacement({
    position: {
      x: start.x + rotatedPosition.x,
      y: start.y + rotatedPosition.y,
      z: start.z + rotatedPosition.z,
    },
    quaternion: multiplyQuaternions(rotation, current.quaternion),
  });
}

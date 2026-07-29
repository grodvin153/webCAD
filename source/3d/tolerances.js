/* webCAD - Tolerancias numericas y de fabricacion 3D | SPDX-License-Identifier: GPL-3.0-or-later */

export const CAD_3D_EPSILON = 1e-6;
export const MINIMUM_3D_THICKNESS = 0.1;
export const BOOLEAN_WELD_MAX_TOLERANCE = 0.01;
export const MANUFACTURING_MESH_MAX_TOLERANCE = 0.1;
export const DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR = 1;
export const MIN_COPLANAR_FACE_TOLERANCE_FACTOR = 0.1;
export const MAX_COPLANAR_FACE_TOLERANCE_FACTOR = 10;

let coplanarFaceToleranceFactor = DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR;

export function normalizeCoplanarFaceToleranceFactor(value) {
  const factor = Number(value);
  return Number.isFinite(factor) &&
    factor >= MIN_COPLANAR_FACE_TOLERANCE_FACTOR &&
    factor <= MAX_COPLANAR_FACE_TOLERANCE_FACTOR
    ? factor
    : DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR;
}

export function setCoplanarFaceToleranceFactor(value) {
  coplanarFaceToleranceFactor = normalizeCoplanarFaceToleranceFactor(value);
  return coplanarFaceToleranceFactor;
}

export function getCoplanarFaceToleranceFactor() {
  return coplanarFaceToleranceFactor;
}

export function meetsMinimum3dThickness(value) {
  const thickness = Math.abs(Number(value));
  return Number.isFinite(thickness) &&
    thickness + CAD_3D_EPSILON >= MINIMUM_3D_THICKNESS;
}

export function solidScale3d(solid) {
  if (!Array.isArray(solid?.vertices) || !solid.vertices.length) return 1;
  return ['x', 'y', 'z'].reduce((largest, axis) => {
    const values = solid.vertices.map((point) => Number(point?.[axis]) || 0);
    return Math.max(largest, Math.max(...values) - Math.min(...values));
  }, 1);
}

export function booleanWeldTolerance(solid) {
  return Math.max(
    CAD_3D_EPSILON,
    Math.min(BOOLEAN_WELD_MAX_TOLERANCE, solidScale3d(solid) * 1e-4),
  );
}

export function booleanContactOverlap(solid) {
  return Math.min(
    booleanWeldTolerance(solid) * 0.1,
    Math.max(
      CAD_3D_EPSILON * 32,
      solidScale3d(solid) * 1e-6,
    ),
  );
}

export function editableBooleanMeshTolerance(solid) {
  return booleanWeldTolerance(solid) * 0.5;
}

export function coplanarFaceTolerance(
  solid,
  factor = coplanarFaceToleranceFactor,
) {
  return Math.max(
    CAD_3D_EPSILON,
    editableBooleanMeshTolerance(solid) *
      normalizeCoplanarFaceToleranceFactor(factor),
  );
}

export function coplanarFaceNormalDotTolerance(
  solid,
  factor = coplanarFaceToleranceFactor,
) {
  const scale = solidScale3d(solid);
  const linearTolerance = coplanarFaceTolerance(solid, factor);
  const angle = Math.min(
    Math.PI / 90,
    Math.max(Math.PI / 3600, Math.atan2(linearTolerance * 12, scale)),
  );
  return Math.cos(angle);
}

export function minimumBooleanOperationDistance(
  solid,
  factor = coplanarFaceToleranceFactor,
) {
  const float32Resolution = solidScale3d(solid) * 4 * 2 ** -23;
  return Math.max(
    CAD_3D_EPSILON,
    float32Resolution,
    coplanarFaceTolerance(solid, factor) * 0.01,
  );
}

export function manufacturingMeshTolerance(solid) {
  return Math.max(
    booleanWeldTolerance(solid),
    Math.min(MANUFACTURING_MESH_MAX_TOLERANCE, solidScale3d(solid) * 1e-3),
  );
}

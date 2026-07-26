/* webCAD - Tolerancias numericas y de fabricacion 3D | SPDX-License-Identifier: GPL-3.0-or-later */

export const CAD_3D_EPSILON = 1e-6;
export const BOOLEAN_WELD_MAX_TOLERANCE = 0.01;
export const MANUFACTURING_MESH_MAX_TOLERANCE = 0.1;

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

export function manufacturingMeshTolerance(solid) {
  return Math.max(
    booleanWeldTolerance(solid),
    Math.min(MANUFACTURING_MESH_MAX_TOLERANCE, solidScale3d(solid) * 1e-3),
  );
}

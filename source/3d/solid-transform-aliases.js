/* webCAD - Alias de transformaciones de solidos 3D | SPDX-License-Identifier: GPL-3.0-or-later */

const SOLID_TRANSFORM_BY_ALIAS = Object.freeze({
  c: 'copy',
  d: 'move',
  g: 'rotate',
});

export function solidTransformFromAlias(key) {
  return SOLID_TRANSFORM_BY_ALIAS[String(key ?? '').toLowerCase()] ?? null;
}

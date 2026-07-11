/* webCAD - Visibilidad de entidades 2D en la vista 3D | SPDX-License-Identifier: GPL-3.0-or-later */

const HIDDEN_LAYER_NAMES = new Set(['auxiliar', 'ejes']);

function normalizeLayerName(layerName) {
  return String(layerName || '').trim().toLowerCase();
}

export function isEntityVisibleInThreeView(entity) {
  if (!entity) return false;
  if (HIDDEN_LAYER_NAMES.has(normalizeLayerName(entity.layer))) return false;
  return true;
}

export function visibleEntitiesForThreeView(entities) {
  return (Array.isArray(entities) ? entities : []).filter(isEntityVisibleInThreeView);
}

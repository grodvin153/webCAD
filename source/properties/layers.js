/*
 * webCAD - Capas y propiedades por capa
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const DEFAULT_LAYER = {
  name: 'Normal',
  lineStyle: 'normal',
  lineType: 'continuous',
  lineColor: 'default',
};

export function createLayerServices({
  getState,
  applyLineColorToEntity,
  applyLineStyleToEntity,
  applyLineTypeToEntity,
  lineColorFromDxf,
  lineStyleFromDxf,
  lineTypeFromDxf,
}) {
  function dxfEntityOptions(record, layerDefinitionMap) {
    const requestedLayer = String(record['8'] || DEFAULT_LAYER.name).trim();
    const layer = layerDefinitionMap.get(requestedLayer.toLowerCase()) || null;
    return {
      layer: layer?.name || requestedLayer,
      lineStyle: lineStyleFromDxf(record, layer?.lineStyle),
      lineType: lineTypeFromDxf(record, layer?.lineType),
      lineColor: lineColorFromDxf(record, layer?.lineColor),
    };
  }

  function activeLayerDefinition() {
    const state = getState();
    return state.layers.find((layer) => layer.name === state.activeLayer) || state.layers[0];
  }

  function activeLayerName() {
    return activeLayerDefinition()?.name || DEFAULT_LAYER.name;
  }

  function applyLayerToEntity(entity, layer) {
    if (!entity || !layer) {
      return;
    }
    entity.layer = layer.name;
    applyLineStyleToEntity(entity, entity.type === 'DIMENSION' ? 'auxiliar' : layer.lineStyle);
    applyLineTypeToEntity(entity, entity.type === 'DIMENSION' ? 'continuous' : layer.lineType);
    applyLineColorToEntity(entity, layer.lineColor);
  }

  return {
    activeLayerDefinition,
    activeLayerName,
    applyLayerToEntity,
    dxfEntityOptions,
  };
}

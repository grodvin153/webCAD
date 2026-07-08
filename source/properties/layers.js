/*
 * webCAD - Capas y propiedades por capa
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const DEFAULT_LAYER = {
  name: 'Continua',
  lineStyle: 'normal',
  lineType: 'continuous',
  lineColor: 'aci7',
};

export const AUXILIARY_LAYER_NAME = 'Auxiliar';

export const DEFAULT_LAYERS = [
  DEFAULT_LAYER,
  {
    name: 'Oculta',
    lineStyle: 'normal',
    lineType: 'hidden',
    lineColor: 'aci7',
  },
  {
    name: 'Ejes',
    lineStyle: 'auxiliar',
    lineType: 'center',
    lineColor: 'red',
  },
  {
    name: AUXILIARY_LAYER_NAME,
    lineStyle: 'very-fine',
    lineType: 'continuous',
    lineColor: 'aci250',
  },
];

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

  function layerDefinitionByName(layerName) {
    const requested = String(layerName || '').toLowerCase();
    return getState().layers.find((layer) => layer.name.toLowerCase() === requested) || null;
  }

  function layerEntityOptions(layerName) {
    const layer = layerDefinitionByName(layerName) || activeLayerDefinition() || DEFAULT_LAYER;
    return {
      layer: layer.name,
      lineStyle: layer.lineStyle,
      lineType: layer.lineType,
      lineColor: layer.lineColor,
    };
  }

  function activeLayerName() {
    return activeLayerDefinition()?.name || DEFAULT_LAYER.name;
  }

  function applyLayerToEntity(entity, layer) {
    if (!entity || !layer) {
      return null;
    }
    const targetLayer = entity.type === 'DIMENSION' || entity.type === 'XLINE'
      ? layerDefinitionByName(AUXILIARY_LAYER_NAME) || layer
      : layer;
    entity.layer = targetLayer.name;
    applyLineStyleToEntity(entity, targetLayer.lineStyle);
    applyLineTypeToEntity(entity, targetLayer.lineType);
    applyLineColorToEntity(entity, targetLayer.lineColor);
    return targetLayer;
  }

  return {
    activeLayerDefinition,
    activeLayerName,
    applyLayerToEntity,
    dxfEntityOptions,
    layerDefinitionByName,
    layerEntityOptions,
  };
}

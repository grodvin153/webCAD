/*
 * webCAD - Estilos y constantes visuales inmutables
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const BACKGROUND_COLOR = '#f8f7f2';
export const LINE_COLOR = '#18262a';
export const PREVIEW_COLOR = '#b64d1f';
export const SELECTED_COLOR = '#0f5d8c';
export const SNAP_COLOR = '#d05a1f';
export const SNAP_MARKER_SIZE = 16;
export const X_AXIS_COLOR = 'rgba(205, 55, 55, 0.62)';
export const Y_AXIS_COLOR = 'rgba(34, 145, 82, 0.62)';
export const BY_LAYER = 'bylayer';
export const DEFAULT_LINE_STYLE = BY_LAYER;
export const DEFAULT_LINE_TYPE = BY_LAYER;
export const DEFAULT_LINE_COLOR = BY_LAYER;
export const CAD_TEXT_FONT = '"Arial Narrow", "Liberation Sans Narrow", "Nimbus Sans Narrow", sans-serif';

export const LINE_STYLES = {
  bylayer: {
    id: BY_LAYER,
    label: 'Por capa',
    layer: 'BYLAYER',
    color: LINE_COLOR,
    width: 4,
    dxfLineWeight: -1,
  },
  'very-fine': {
    id: 'very-fine',
    label: 'Muy fino',
    layer: 'MUY_FINA',
    color: '#4f6068',
    width: 1,
    dxfLineWeight: 13,
  },
  auxiliar: {
    id: 'auxiliar',
    label: 'Fino',
    layer: 'AUXILIAR',
    color: '#6f8085',
    width: 2,
    dxfLineWeight: 25,
  },
  normal: {
    id: 'normal',
    label: 'Medio',
    layer: 'NORMAL',
    color: LINE_COLOR,
    width: 4,
    dxfLineWeight: 50,
  },
  gruesa: {
    id: 'gruesa',
    label: 'Gruesa',
    layer: 'GRUESA',
    color: '#111f24',
    width: 7,
    dxfLineWeight: 80,
  },
};

export const DIMENSION_STYLES = {
  normal: { id: 'normal', label: 'Normal', scale: 1.5 },
  large: { id: 'large', label: 'Grande', scale: 2 },
  xlarge: { id: 'xlarge', label: 'Muy grande', scale: 2.5 },
  small: { id: 'small', label: 'Pequeño', scale: 1 },
  tiny: { id: 'tiny', label: 'Muy pequeño', scale: 0.75 },
};

export const DIMENSION_TOOLS = new Set([
  'dimension-horizontal',
  'dimension-vertical',
  'dimension-aligned',
  'dimension-angular',
  'dimension-radius',
  'dimension-diameter',
]);

export const LINE_TYPES = {
  bylayer: {
    id: BY_LAYER,
    label: 'Por capa',
    dxfName: 'BYLAYER',
    dash: [],
  },
  continuous: {
    id: 'continuous',
    label: 'Continua',
    dxfName: 'CONTINUOUS',
    dash: [],
  },
  hidden: {
    id: 'hidden',
    label: 'Oculta',
    dxfName: 'HIDDEN',
    dash: [12, 7],
  },
  center: {
    id: 'center',
    label: 'Trazo y punto',
    dxfName: 'CENTER',
    dash: [18, 6, 2, 6],
  },
};

export const LINE_COLORS = {
  bylayer: { id: BY_LAYER, label: 'Por capa', color: null, aci: 256 },
  default: { id: 'default', label: 'Por defecto', color: null, aci: null },
  red: { id: 'red', label: 'Rojo', color: '#e53935', aci: 1 },
  yellow: { id: 'yellow', label: 'Amarillo', color: '#d9a900', aci: 2 },
  green: { id: 'green', label: 'Verde', color: '#16a34a', aci: 3 },
  cyan: { id: 'cyan', label: 'Cian', color: '#0891b2', aci: 4 },
  blue: { id: 'blue', label: 'Azul', color: '#2563eb', aci: 5 },
  magenta: { id: 'magenta', label: 'Magenta', color: '#d946ef', aci: 6 },
  aci7: { id: 'aci7', label: 'Blanco / negro', color: LINE_COLOR, aci: 7 },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rgbHex(red, green, blue) {
  return `#${[red, green, blue]
    .map((value) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, '0'))
    .join('')}`;
}

function hsvHex(hue, saturation, value) {
  const chroma = value * saturation;
  const hueSector = ((hue % 360) + 360) % 360 / 60;
  const intermediate = chroma * (1 - Math.abs(hueSector % 2 - 1));
  const [red, green, blue] = hueSector < 1 ? [chroma, intermediate, 0]
    : hueSector < 2 ? [intermediate, chroma, 0]
      : hueSector < 3 ? [0, chroma, intermediate]
        : hueSector < 4 ? [0, intermediate, chroma]
          : hueSector < 5 ? [intermediate, 0, chroma]
            : [chroma, 0, intermediate];
  const offset = value - chroma;
  return rgbHex((red + offset) * 255, (green + offset) * 255, (blue + offset) * 255);
}

function aciPaletteColor(index) {
  if (index === 8) return '#808080';
  if (index === 9) return '#c0c0c0';
  if (index >= 250) {
    return ['#333333', '#505050', '#696969', '#828282', '#bebebe', '#ffffff'][index - 250];
  }
  const group = Math.floor((index - 10) / 10);
  const variant = (index - 10) % 10;
  const values = [1, 1, 0.65, 0.65, 0.5, 0.5, 0.3, 0.3, 0.15, 0.15];
  const saturations = [1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5];
  return hsvHex(group * 15, saturations[variant], values[variant]);
}

for (let aci = 8; aci <= 255; aci += 1) {
  LINE_COLORS[`aci${aci}`] = {
    id: `aci${aci}`,
    label: `ACI ${aci}`,
    color: aciPaletteColor(aci),
    aci,
  };
}

export function createStyleServices(getState) {
  function activeLayerProperty(property, fallback) {
    const state = getState();
    const layer = state.layers?.find((candidate) => candidate.name === state.activeLayer);
    return layer?.[property] || fallback;
  }

  function entityLayerProperty(entity, property, fallback) {
    const state = getState();
    const layer = state.layers?.find((candidate) => candidate.name === entity?.layer);
    return layer?.[property] || fallback;
  }

  function normalizeLineStyleId(value) {
    const normalized = String(value || '').toLowerCase();
    const byLayer = Object.values(LINE_STYLES).find(
      (style) => style.layer.toLowerCase() === normalized,
    );
    if (byLayer) {
      return byLayer.id;
    }
    return LINE_STYLES[normalized] ? normalized : DEFAULT_LINE_STYLE;
  }

  function lineStyleFromDxf(record, fallbackStyle = null) {
    const lineWeight = Number(record['370']);
    if (Number.isFinite(lineWeight) && lineWeight > 0) {
      if (lineWeight <= 18) {
        return 'very-fine';
      }
      if (lineWeight <= 37) {
        return 'auxiliar';
      }
      if (lineWeight >= 65) {
        return 'gruesa';
      }
      return 'normal';
    }
    if (fallbackStyle) {
      return normalizeLineStyleId(fallbackStyle);
    }
    return normalizeLineStyleId(record['8']);
  }

  function getLineStyle(styleId) {
    return LINE_STYLES[normalizeLineStyleId(styleId)];
  }

  function activeLineStyleId() {
    const active = normalizeLineStyleId(getState().activeLineStyle);
    return active === BY_LAYER
      ? normalizeLineStyleId(activeLayerProperty('lineStyle', 'normal'))
      : active;
  }

  function normalizeLineTypeId(value) {
    const normalized = String(value || '').trim().toLowerCase();
    const byDxfName = Object.values(LINE_TYPES).find(
      (lineType) => lineType.dxfName.toLowerCase() === normalized,
    );
    return byDxfName?.id || (LINE_TYPES[normalized] ? normalized : DEFAULT_LINE_TYPE);
  }

  function getLineType(lineTypeId) {
    return LINE_TYPES[normalizeLineTypeId(lineTypeId)];
  }

  function activeLineTypeId() {
    const active = normalizeLineTypeId(getState().activeLineType);
    return active === BY_LAYER
      ? normalizeLineTypeId(activeLayerProperty('lineType', 'continuous'))
      : active;
  }

  function applyLineTypeToEntity(entity, lineTypeId) {
    const normalized = normalizeLineTypeId(lineTypeId);
    entity.lineType = normalized === BY_LAYER
      ? normalizeLineTypeId(entityLayerProperty(entity, 'lineType', 'continuous'))
      : normalized;
  }

  function lineTypeFromDxf(record, fallbackType = null) {
    const rawType = String(record['6'] || '').trim().toUpperCase();
    if (!rawType || rawType === 'BYLAYER' || rawType === 'BYBLOCK') {
      return normalizeLineTypeId(fallbackType || DEFAULT_LINE_TYPE);
    }
    return normalizeLineTypeId(rawType);
  }

  function normalizeLineColorId(value) {
    const normalized = String(value || '').trim().toLowerCase();
    const numericAci = Number(normalized);
    const byAci = Number.isFinite(numericAci)
      ? Object.values(LINE_COLORS).find((lineColor) => lineColor.aci === Math.abs(numericAci))
      : null;
    return byAci?.id || (LINE_COLORS[normalized] ? normalized : DEFAULT_LINE_COLOR);
  }

  function getLineColor(lineColorId) {
    return LINE_COLORS[normalizeLineColorId(lineColorId)];
  }

  function activeLineColorId() {
    const active = normalizeLineColorId(getState().activeLineColor);
    return active === BY_LAYER
      ? normalizeLineColorId(activeLayerProperty('lineColor', 'aci7'))
      : active;
  }

  function applyLineStyleToEntity(entity, styleId) {
    const normalized = normalizeLineStyleId(styleId);
    const style = getLineStyle(normalized === BY_LAYER
      ? entityLayerProperty(entity, 'lineStyle', 'normal')
      : normalized);
    entity.lineStyle = style.id;
    entity.color = getLineColor(entity.lineColor).color || style.color;
  }

  function applyLineColorToEntity(entity, lineColorId) {
    const normalized = normalizeLineColorId(lineColorId);
    const lineColor = getLineColor(normalized === BY_LAYER
      ? entityLayerProperty(entity, 'lineColor', 'aci7')
      : normalized);
    entity.lineColor = lineColor.id;
    entity.color = lineColor.color || getLineStyle(entity.lineStyle).color;
  }

  function lineColorFromDxf(record, fallbackColor = null) {
    const aci = Number(record['62']);
    if (!Number.isFinite(aci) || aci === 0 || Math.abs(aci) === 256) {
      return normalizeLineColorId(fallbackColor || DEFAULT_LINE_COLOR);
    }
    return normalizeLineColorId(aci);
  }

  return {
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    applyLineColorToEntity,
    applyLineStyleToEntity,
    applyLineTypeToEntity,
    getLineColor,
    getLineStyle,
    getLineType,
    lineColorFromDxf,
    lineStyleFromDxf,
    lineTypeFromDxf,
    normalizeLineColorId,
    normalizeLineStyleId,
    normalizeLineTypeId,
  };
}

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
export const DEFAULT_LINE_STYLE = 'normal';
export const DEFAULT_LINE_TYPE = 'continuous';
export const DEFAULT_LINE_COLOR = 'default';
export const CAD_TEXT_FONT = '"Arial Narrow", "Liberation Sans Narrow", "Nimbus Sans Narrow", sans-serif';

export const LINE_STYLES = {
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

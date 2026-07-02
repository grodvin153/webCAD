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

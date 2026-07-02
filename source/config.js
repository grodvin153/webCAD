/*
 * webCAD - Configuracion inmutable de la aplicacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const CANVAS_SCALE = 2;
export const VIEW_SCALE_FACTOR = 1.15;
export const SNAP_THRESHOLD = 0.001;
export const FIT_PADDING = 48;
export const SPATIAL_CELL_SIZE = 100;
export const SPATIAL_MAX_ENTITY_CELLS = 256;
export const SPATIAL_MAX_QUERY_CELLS = 12000;
export const HISTORY_LIMIT = 50;

export const REPEATABLE_COMMANDS = new Set([
  'line',
  'polyline',
  'rectangle',
  'text',
  'hatch',
  'circle-center',
  'circle-3p',
  'arc-center-radius',
  'arc-3p',
  'arc-center-start-end',
  'dimension-horizontal',
  'dimension-vertical',
  'dimension-aligned',
  'dimension-angular',
  'dimension-radius',
  'dimension-diameter',
  'block-insert',
  'copy',
  'move',
  'rotate',
  'mirror',
  'trim',
  'extend',
  'fillet',
  'chamfer',
  'erase',
  'explode',
]);

export const DRAWING_PROFILES = {
  engineering: {
    id: 'engineering',
    label: 'Ingeniería',
    shortLabel: 'ING · mm',
    unitsLabel: 'mm',
    dxfInsUnits: 4,
    gridBase: 10,
    defaultDrawingSize: 200,
    defaultTextHeight: 5,
    minViewScale: 0.05,
    maxViewScale: 24,
    lineTypeScale: 1,
    dxfLineTypeScale: 1,
    hatchOpacity: 0.32,
    dimensionMetrics: {
      textHeight: 3,
      arrowSize: 3.75,
      textGap: 0.625,
      extensionOffset: 0.9375,
      extensionOvershoot: 1.875,
    },
  },
  architecture: {
    id: 'architecture',
    label: 'Arquitectura',
    shortLabel: 'ARQ · m',
    unitsLabel: 'm',
    dxfInsUnits: 6,
    gridBase: 0.5,
    defaultDrawingSize: 20,
    defaultTextHeight: 0.25,
    minViewScale: 0.01,
    maxViewScale: 2400,
    lineTypeScale: 0.85,
    dxfLineTypeScale: 0.1,
    hatchOpacity: 0.27,
    dimensionMetrics: {
      textHeight: 0.25,
      arrowSize: 0.3125,
      textGap: 0.05,
      extensionOffset: 0.075,
      extensionOvershoot: 0.15,
    },
  },
};

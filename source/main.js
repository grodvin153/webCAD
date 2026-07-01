/*
 * webCAD - Editor CAD 2D para navegador
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const canvas = document.getElementById('cad-canvas');
const selectToolButton = document.getElementById('tool-select');
const lineToolButton = document.getElementById('tool-line');
const polylineToolButton = document.getElementById('tool-polyline');
const rectangleToolButton = document.getElementById('tool-rectangle');
const textToolButton = document.getElementById('tool-text');
const hatchToolButton = document.getElementById('tool-hatch');
const circleToolButton = document.getElementById('tool-circle');
const circleToolMenuButton = document.getElementById('tool-circle-menu');
const arcToolButton = document.getElementById('tool-arc');
const arcToolMenuButton = document.getElementById('tool-arc-menu');
const blockToolButton = document.getElementById('tool-block');
const blockToolMenuButton = document.getElementById('tool-block-menu');
const trimToolButton = document.getElementById('tool-trim');
const extendToolButton = document.getElementById('tool-extend');
const filletToolButton = document.getElementById('tool-fillet');
const copyToolButton = document.getElementById('tool-copy');
const moveToolButton = document.getElementById('tool-move');
const rotateToolButton = document.getElementById('tool-rotate');
const eraseToolButton = document.getElementById('tool-erase');
const explodeToolButton = document.getElementById('tool-explode');
const dimensionStyleSelect = document.getElementById('dimension-style-select');
const dimensionToolButtons = document.querySelectorAll('.dimension-tool-button[data-command]');
const fitButton = document.getElementById('action-fit');
const navigationMouseButton = document.getElementById('navigation-mouse');
const navigationTrackpadButton = document.getElementById('navigation-trackpad');
const undoButton = document.getElementById('action-undo');
const redoButton = document.getElementById('action-redo');
const newButton = document.getElementById('action-new');
const exportDxfButton = document.getElementById('action-export-dxf');
const importDxfButton = document.getElementById('action-import-dxf');
const importDxfInput = document.getElementById('import-dxf-input');
const lineStylePicker = document.querySelector('.line-style-picker');
const lineStyleToggle = document.getElementById('line-style-toggle');
const lineStyleLabel = document.getElementById('line-style-label');
const lineStyleOptionButtons = document.querySelectorAll('[data-line-style]');
const lineTypePicker = document.querySelector('.line-type-picker');
const lineTypeToggle = document.getElementById('line-type-toggle');
const lineTypeLabel = document.getElementById('line-type-label');
const lineTypeOptionButtons = document.querySelectorAll('[data-line-type]');
const lineColorPicker = document.querySelector('.line-color-picker');
const lineColorToggle = document.getElementById('line-color-toggle');
const lineColorLabel = document.getElementById('line-color-label');
const lineColorOptionButtons = document.querySelectorAll('[data-line-color]');
const layerPicker = document.querySelector('.layer-picker');
const layerToggle = document.getElementById('layer-toggle');
const layerLabel = document.getElementById('layer-label');
const layerList = document.getElementById('layer-list');
const layerCreateOpenButton = document.getElementById('layer-create-open');
const layerCreateCancelButton = document.getElementById('layer-create-cancel');
const layerCreateConfirmButton = document.getElementById('layer-create-confirm');
const layerNameInput = document.getElementById('layer-name-input');
const layerStyleInput = document.getElementById('layer-style-input');
const layerTypeInput = document.getElementById('layer-type-input');
const layerColorInput = document.getElementById('layer-color-input');
const layerActiveSwatch = document.getElementById('layer-active-swatch');
const layerColorPreview = document.getElementById('layer-color-preview');
const layerColorPalette = document.getElementById('layer-color-palette');
const layerColorPaletteValue = document.getElementById('layer-color-palette-value');
const layerColorGrid = document.getElementById('layer-color-grid');
const menuCommandButtons = document.querySelectorAll('[data-command]');
const undoCommandButtons = document.querySelectorAll('[data-command="undo"]');
const redoCommandButtons = document.querySelectorAll('[data-command="redo"]');
const toolGroupElements = document.querySelectorAll('.tool-group');
const toolFlyoutCommandButtons = document.querySelectorAll('.tool-flyout-item[data-command]');
const cursorInput = document.getElementById('cursor-input');
const blockEditorBar = document.getElementById('block-editor-bar');
const blockEditorName = document.getElementById('block-editor-name');
const blockEditorSaveButton = document.getElementById('block-editor-save');
const blockEditorDiscardButton = document.getElementById('block-editor-discard');
const statusOrthoButton = document.getElementById('status-ortho');
const statusGridButton = document.getElementById('status-grid');
const statusLineWeightButton = document.getElementById('status-lineweight');
const statusTool = document.getElementById('status-tool');
const statusCursor = document.getElementById('status-cursor');
const statusEntities = document.getElementById('status-entities');
const statusLength = document.getElementById('status-length');
const statusLayer = document.getElementById('status-layer');
const statusMessage = document.getElementById('status-message');
const statusDxf = document.getElementById('status-dxf');
const filletRadiusControl = document.getElementById('fillet-radius-control');
const filletRadiusInput = document.getElementById('fillet-radius-input');
const drawingProfileDialog = document.getElementById('drawing-profile-dialog');
const drawingProfileCloseButton = document.getElementById('drawing-profile-close');
const drawingProfileCancelButton = document.getElementById('drawing-profile-cancel');
const drawingProfileConfirmButton = document.getElementById('drawing-profile-confirm');
const drawingProfileInputs = document.querySelectorAll('input[name="drawing-profile"]');
const textDialog = document.getElementById('text-dialog');
const textDialogTitle = document.getElementById('text-dialog-title');
const textDialogCloseButton = document.getElementById('text-dialog-close');
const textDialogCancelButton = document.getElementById('text-dialog-cancel');
const textDialogConfirmButton = document.getElementById('text-dialog-confirm');
const textContentInput = document.getElementById('text-content-input');
const textHeightInput = document.getElementById('text-height-input');
const textDialogError = document.getElementById('text-dialog-error');
const hatchDialog = document.getElementById('hatch-dialog');
const hatchDialogTitle = document.getElementById('hatch-dialog-title');
const hatchDialogCloseButton = document.getElementById('hatch-dialog-close');
const hatchDialogCancelButton = document.getElementById('hatch-dialog-cancel');
const hatchDialogConfirmButton = document.getElementById('hatch-dialog-confirm');
const hatchPatternInput = document.getElementById('hatch-pattern-input');
const hatchLayerInput = document.getElementById('hatch-layer-input');
const hatchColorInput = document.getElementById('hatch-color-input');
const hatchDialogError = document.getElementById('hatch-dialog-error');
const polylineWidthDialog = document.getElementById('polyline-width-dialog');
const polylineWidthCloseButton = document.getElementById('polyline-width-close');
const polylineWidthCancelButton = document.getElementById('polyline-width-cancel');
const polylineWidthConfirmButton = document.getElementById('polyline-width-confirm');
const polylineStartWidthInput = document.getElementById('polyline-start-width');
const polylineEndWidthInput = document.getElementById('polyline-end-width');
const polylineWidthError = document.getElementById('polyline-width-error');
const blockCreateDialog = document.getElementById('block-create-dialog');
const blockCreateCloseButton = document.getElementById('block-create-close');
const blockCreateCancelButton = document.getElementById('block-create-cancel');
const blockCreateConfirmButton = document.getElementById('block-create-confirm');
const blockNameInput = document.getElementById('block-name-input');
const blockCreateError = document.getElementById('block-create-error');
const blockInsertDialog = document.getElementById('block-insert-dialog');
const blockInsertCloseButton = document.getElementById('block-insert-close');
const blockInsertCancelButton = document.getElementById('block-insert-cancel');
const blockInsertConfirmButton = document.getElementById('block-insert-confirm');
const blockInsertNameInput = document.getElementById('block-insert-name');
const blockInsertScaleInput = document.getElementById('block-insert-scale');
const blockInsertRotationInput = document.getElementById('block-insert-rotation');
const blockInsertError = document.getElementById('block-insert-error');
const aboutDialog = document.getElementById('about-dialog');
const aboutDialogCloseButton = document.getElementById('about-dialog-close');
const aboutDialogConfirmButton = document.getElementById('about-dialog-confirm');

const CANVAS_SCALE = 2;
const VIEW_SCALE_FACTOR = 1.15;
const SNAP_THRESHOLD = 0.001;
const FIT_PADDING = 48;
const SPATIAL_CELL_SIZE = 100;
const SPATIAL_MAX_ENTITY_CELLS = 256;
const SPATIAL_MAX_QUERY_CELLS = 12000;
const HISTORY_LIMIT = 50;
const REPEATABLE_COMMANDS = new Set([
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
  'trim',
  'extend',
  'fillet',
  'erase',
  'explode',
]);
const DRAWING_PROFILES = {
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
let GRID_BASE = DRAWING_PROFILES.engineering.gridBase;
let MIN_VIEW_SCALE = DRAWING_PROFILES.engineering.minViewScale;
let MAX_VIEW_SCALE = DRAWING_PROFILES.engineering.maxViewScale;
let DEFAULT_DRAWING_SIZE = DRAWING_PROFILES.engineering.defaultDrawingSize;
let UNITS_LABEL = DRAWING_PROFILES.engineering.unitsLabel;
const BACKGROUND_COLOR = '#f8f7f2';
const LINE_COLOR = '#18262a';
const PREVIEW_COLOR = '#b64d1f';
const SELECTED_COLOR = '#0f5d8c';
const SNAP_COLOR = '#d05a1f';
const SNAP_MARKER_SIZE = 16;
const X_AXIS_COLOR = 'rgba(205, 55, 55, 0.62)';
const Y_AXIS_COLOR = 'rgba(34, 145, 82, 0.62)';
const DEFAULT_LINE_STYLE = 'normal';
const DEFAULT_LINE_TYPE = 'continuous';
const DEFAULT_LINE_COLOR = 'default';
const TWO_PI = Math.PI * 2;
const CAD_TEXT_FONT = '"Arial Narrow", "Liberation Sans Narrow", "Nimbus Sans Narrow", sans-serif';
const LINE_STYLES = {
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
const DIMENSION_STYLES = {
  normal: { id: 'normal', label: 'Normal', scale: 1.5 },
  large: { id: 'large', label: 'Grande', scale: 2 },
  xlarge: { id: 'xlarge', label: 'Muy grande', scale: 2.5 },
  small: { id: 'small', label: 'Pequeño', scale: 1 },
  tiny: { id: 'tiny', label: 'Muy pequeño', scale: 0.75 },
};
const DIMENSION_TOOLS = new Set([
  'dimension-horizontal',
  'dimension-vertical',
  'dimension-aligned',
  'dimension-angular',
  'dimension-radius',
  'dimension-diameter',
]);
const LINE_TYPES = {
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
const LINE_COLORS = {
  default: { id: 'default', label: 'Por defecto', color: null, aci: null },
  red: { id: 'red', label: 'Rojo', color: '#e53935', aci: 1 },
  yellow: { id: 'yellow', label: 'Amarillo', color: '#d9a900', aci: 2 },
  green: { id: 'green', label: 'Verde', color: '#16a34a', aci: 3 },
  cyan: { id: 'cyan', label: 'Cian', color: '#0891b2', aci: 4 },
  blue: { id: 'blue', label: 'Azul', color: '#2563eb', aci: 5 },
  magenta: { id: 'magenta', label: 'Magenta', color: '#d946ef', aci: 6 },
  aci7: { id: 'aci7', label: 'Blanco / negro', color: LINE_COLOR, aci: 7 },
};

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
const DEFAULT_LAYER = {
  name: 'Normal',
  lineStyle: 'normal',
  lineType: 'continuous',
  lineColor: 'default',
};
let nextEntityGroupId = 1;
let layerCreationColor = 'aci7';

function createEntityGroupId(prefix = 'group') {
  const id = `${prefix}-${nextEntityGroupId}`;
  nextEntityGroupId += 1;
  return id;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function snap(value, step = GRID_BASE) {
  return Math.round(value / step) * step;
}

function snapPoint(point, step = GRID_BASE) {
  return {
    x: snap(point.x, step),
    y: snap(point.y, step),
  };
}

function offsetPoint(point, vector) {
  return {
    x: point.x + vector.x,
    y: point.y + vector.y,
  };
}

function orthoPoint(start, point) {
  const deltaX = point.x - start.x;
  const deltaY = point.y - start.y;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return { x: point.x, y: start.y };
  }
  return { x: start.x, y: point.y };
}

function entityMidpoint(entity) {
  return {
    x: (entity.start.x + entity.end.x) * 0.5,
    y: (entity.start.y + entity.end.y) * 0.5,
  };
}

function lineSegmentIntersection(first, second) {
  const firstDeltaX = first.end.x - first.start.x;
  const firstDeltaY = first.end.y - first.start.y;
  const secondDeltaX = second.end.x - second.start.x;
  const secondDeltaY = second.end.y - second.start.y;
  const denominator = firstDeltaX * secondDeltaY - firstDeltaY * secondDeltaX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = second.start.x - first.start.x;
  const startDeltaY = second.start.y - first.start.y;
  const firstFactor = (startDeltaX * secondDeltaY - startDeltaY * secondDeltaX) / denominator;
  const secondFactor = (startDeltaX * firstDeltaY - startDeltaY * firstDeltaX) / denominator;
  if (
    firstFactor < -SNAP_THRESHOLD ||
    firstFactor > 1 + SNAP_THRESHOLD ||
    secondFactor < -SNAP_THRESHOLD ||
    secondFactor > 1 + SNAP_THRESHOLD
  ) {
    return null;
  }

  return {
    x: first.start.x + firstFactor * firstDeltaX,
    y: first.start.y + firstFactor * firstDeltaY,
  };
}

function lineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return clamp(
    ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared,
    0,
    1,
  );
}

function rawLineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared;
}

function pointAtLineParameter(entity, parameter) {
  return {
    x: entity.start.x + (entity.end.x - entity.start.x) * parameter,
    y: entity.start.y + (entity.end.y - entity.start.y) * parameter,
  };
}

function closestPointOnLineSegment(entity, point) {
  return pointAtLineParameter(entity, lineParameter(entity, point));
}

function circularParameter(entity, point) {
  const angle = angleOfPoint(entity.center, point);
  if (entity.type === 'CIRCLE') {
    return angleParameter(angle);
  }

  const sweep = entityArcSweep(entity);
  if (sweep <= SNAP_THRESHOLD) {
    return 0;
  }
  const angleDistance = entity.clockwise === false
    ? normalizeAngle(entity.startAngle - angle)
    : normalizeAngle(angle - entity.startAngle);
  return clamp(angleDistance / sweep, 0, 1);
}

function pointAtCircularParameter(entity, parameter) {
  const angle = entity.type === 'CIRCLE'
    ? parameter * TWO_PI
    : entity.startAngle + (entity.clockwise === false ? -1 : 1) * entityArcSweep(entity) * parameter;
  return pointAtCircleAngle(entity, angle);
}

function uniqueSortedParameters(parameters) {
  const sorted = parameters
    .map((parameter) => clamp(parameter, 0, 1))
    .sort((first, second) => first - second);
  const unique = [];
  for (const parameter of sorted) {
    if (!unique.length || Math.abs(parameter - unique[unique.length - 1]) > SNAP_THRESHOLD) {
      unique.push(parameter);
    }
  }
  return unique;
}

function normalizeAngle(angle) {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function angleParameter(angle) {
  return normalizeAngle(angle) / TWO_PI;
}

function pointAtCircleAngle(entity, angle) {
  return {
    x: entity.center.x + Math.cos(angle) * entity.radius,
    y: entity.center.y + Math.sin(angle) * entity.radius,
  };
}

function angleOfPoint(center, point) {
  return normalizeAngle(Math.atan2(point.y - center.y, point.x - center.x));
}

function arcSweep(startAngle, endAngle) {
  return normalizeAngle(endAngle - startAngle);
}

function directedArcSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? arcSweep(startAngle, endAngle)
    : normalizeAngle(startAngle - endAngle);
}

function entityArcSweep(entity) {
  return directedArcSweep(entity.startAngle, entity.endAngle, entity.clockwise !== false);
}

function angleInSweep(angle, startAngle, endAngle) {
  return normalizeAngle(angle - startAngle) <= arcSweep(startAngle, endAngle) + SNAP_THRESHOLD;
}

function angleOnArc(angle, entity) {
  if (entity.type === 'CIRCLE') {
    return true;
  }
  return entity.clockwise === false
    ? normalizeAngle(entity.startAngle - angle) <= entityArcSweep(entity) + SNAP_THRESHOLD
    : angleInSweep(angle, entity.startAngle, entity.endAngle);
}

function arcMidAngle(entity) {
  const direction = entity.clockwise === false ? -1 : 1;
  return normalizeAngle(entity.startAngle + direction * entityArcSweep(entity) * 0.5);
}

function perpendicularFootOnSegment(origin, entity) {
  if (!origin) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return null;
  }

  const factor = (
    (origin.x - entity.start.x) * segmentX +
    (origin.y - entity.start.y) * segmentY
  ) / lengthSquared;
  if (factor < -SNAP_THRESHOLD || factor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  const clampedFactor = clamp(factor, 0, 1);
  return {
    x: entity.start.x + clampedFactor * segmentX,
    y: entity.start.y + clampedFactor * segmentY,
  };
}

function infiniteLineSegmentIntersection(axisPoint, axisDirection, entity) {
  if (!axisPoint || !axisDirection) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const denominator = axisDirection.x * segmentY - axisDirection.y * segmentX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = entity.start.x - axisPoint.x;
  const startDeltaY = entity.start.y - axisPoint.y;
  const segmentFactor = (startDeltaX * axisDirection.y - startDeltaY * axisDirection.x) / denominator;
  if (segmentFactor < -SNAP_THRESHOLD || segmentFactor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: entity.start.x + segmentFactor * segmentX,
    y: entity.start.y + segmentFactor * segmentY,
  };
}

function infiniteLineLineIntersection(firstPoint, firstDirection, secondPoint, secondDirection) {
  if (!firstPoint || !firstDirection || !secondPoint || !secondDirection) {
    return null;
  }

  const denominator = firstDirection.x * secondDirection.y - firstDirection.y * secondDirection.x;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = secondPoint.x - firstPoint.x;
  const startDeltaY = secondPoint.y - firstPoint.y;
  const firstFactor = (startDeltaX * secondDirection.y - startDeltaY * secondDirection.x) / denominator;
  return {
    x: firstPoint.x + firstDirection.x * firstFactor,
    y: firstPoint.y + firstDirection.y * firstFactor,
  };
}

function infiniteLineCircularIntersectionPoints(axisPoint, axisDirection, entity, respectArc = true) {
  if (!axisPoint || !axisDirection || !isCircularEntity(entity)) {
    return [];
  }

  const a = axisDirection.x * axisDirection.x + axisDirection.y * axisDirection.y;
  if (a <= SNAP_THRESHOLD) {
    return [];
  }

  const fromCenterX = axisPoint.x - entity.center.x;
  const fromCenterY = axisPoint.y - entity.center.y;
  const b = 2 * (fromCenterX * axisDirection.x + fromCenterY * axisDirection.y);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - entity.radius * entity.radius;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const factor = -b / (2 * a);
    return [{
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }].filter((point) => !respectArc || pointOnCircularEntity(point, entity));
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .map((factor) => ({
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }))
    .filter((point) => !respectArc || pointOnCircularEntity(point, entity));
}

function distancePointToInfiniteLine(point, linePoint, direction) {
  const length = Math.hypot(direction.x, direction.y);
  if (length <= SNAP_THRESHOLD) {
    return Infinity;
  }
  return Math.abs(
    (point.x - linePoint.x) * direction.y -
    (point.y - linePoint.y) * direction.x
  ) / length;
}

function addSnapCandidate(point, candidate, tolerance, currentBest) {
  const snapDistance = distance(point, candidate.point);
  if (snapDistance > tolerance) {
    return currentBest;
  }

  if (!currentBest || snapDistance < currentBest.distance) {
    return {
      ...candidate,
      point: { x: candidate.point.x, y: candidate.point.y },
      distance: snapDistance,
    };
  }

  return currentBest;
}

function circularReferencePoints(entity) {
  if (!entity || !isCircularEntity(entity)) {
    return [];
  }

  if (entity.type === 'ARC') {
    return [
      { type: 'endpoint', key: 'start', point: pointAtCircleAngle(entity, entity.startAngle) },
      { type: 'endpoint', key: 'end', point: pointAtCircleAngle(entity, entity.endAngle) },
      { type: 'midpoint', key: 'midpoint', point: pointAtCircleAngle(entity, arcMidAngle(entity)) },
      { type: 'center', key: 'center', point: entity.center },
    ];
  }

  const candidates = [
    { type: 'center', key: 'center', point: entity.center },
    { type: 'quadrant', key: 'quadrant-0', point: { x: entity.center.x + entity.radius, y: entity.center.y } },
    { type: 'quadrant', key: 'quadrant-1', point: { x: entity.center.x, y: entity.center.y + entity.radius } },
    { type: 'quadrant', key: 'quadrant-2', point: { x: entity.center.x - entity.radius, y: entity.center.y } },
    { type: 'quadrant', key: 'quadrant-3', point: { x: entity.center.x, y: entity.center.y - entity.radius } },
  ];
  return candidates.filter((candidate) => pointOnCircularEntity(candidate.point, entity));
}

function objectSnapPoint(point, state, options = {}) {
  if (!point || !state.objectSnapEnabled || !state.doc) {
    return null;
  }

  const tolerance = (state.snapPixelTolerance || 10) / state.viewScale;
  let bestSnap = null;
  const cursorBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
  const sourceSnapEntities = state.doc.queryBounds(cursorBounds);
  const snapEntities = sourceSnapEntities
    .filter((entity) => entity !== options.ignoreEntity)
    .flatMap((entity) => entity.type === 'INSERT' ? primitiveEntityParts(entity) : [entity])
    .filter((entity) => entity.type === 'LINE' || entity.type === 'POLYLINE' || isCircularEntity(entity));
  const nearbySnapEntities = snapEntities.filter((entity) =>
    entity !== options.ignoreEntity && entityIsNearPoint(entity, point, tolerance),
  );
  const lineEntities = snapEntities.filter((entity) => entity.type === 'LINE');
  const nearbyLineEntities = nearbySnapEntities.filter((entity) => entity.type === 'LINE');
  const draftPolyline = state.tool === 'polyline' ? polylineDraftEntity(state.polylineDraft) : null;
  const nearbyDraftParts = draftPolyline
    ? primitiveEntityParts(draftPolyline)
      .filter((part) => boundsIntersectsBounds(part.bounds(), cursorBounds))
    : [];

  for (const reference of sourceSnapEntities.filter((entity) =>
    entity.type === 'INSERT' && entity !== options.ignoreEntity)) {
    bestSnap = addSnapCandidate(
      point,
      { type: 'endpoint', key: 'insertionPoint', point: reference.insertionPoint },
      tolerance,
      bestSnap,
    );
  }

  for (const entity of sourceSnapEntities.filter((candidate) =>
    candidate.type === 'DIMENSION' && candidate !== options.ignoreEntity)) {
    for (const candidate of dimensionReferencePoints(entity)) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, { ...candidate, entity }, tolerance, bestSnap);
    }
  }

  for (const entity of lineEntities) {
    const ignoredKey = entity === options.ignoreEntity ? options.ignoreKey : null;
    const candidates = [
      { type: 'endpoint', key: 'start', point: entity.start },
      { type: 'endpoint', key: 'end', point: entity.end },
      { type: 'midpoint', point: entityMidpoint(entity) },
    ].filter((candidate) => candidate.key !== ignoredKey);

    for (const candidate of candidates) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  for (const entity of snapEntities.filter((candidate) => candidate.type === 'POLYLINE')) {
    for (const candidate of polylineReferencePoints(entity)) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  if (draftPolyline) {
    for (const candidate of polylineReferencePoints(draftPolyline)) {
      if (!boundsContainsPoint(cursorBounds, candidate.point)) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  for (let firstIndex = 0; firstIndex < nearbySnapEntities.length - 1; firstIndex += 1) {
    const first = nearbySnapEntities[firstIndex];

    for (let secondIndex = firstIndex + 1; secondIndex < nearbySnapEntities.length; secondIndex += 1) {
      const second = nearbySnapEntities[secondIndex];
      for (const intersection of entityIntersectionPoints(first, second)) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(intersection, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }

        bestSnap = addSnapCandidate(
          point,
          { type: 'intersection', point: intersection },
          tolerance,
          bestSnap,
        );
      }
    }
  }

  for (const draftPart of nearbyDraftParts) {
    for (const entity of nearbySnapEntities) {
      for (const intersection of entityIntersectionPoints(draftPart, entity)) {
        bestSnap = addSnapCandidate(
          point,
          { type: 'intersection', point: intersection },
          tolerance,
          bestSnap,
        );
      }
    }
  }

  for (let firstIndex = 0; firstIndex < nearbyDraftParts.length - 1; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < nearbyDraftParts.length; secondIndex += 1) {
      for (const intersection of entityIntersectionPoints(
        nearbyDraftParts[firstIndex],
        nearbyDraftParts[secondIndex],
      )) {
        bestSnap = addSnapCandidate(
          point,
          { type: 'intersection', point: intersection },
          tolerance,
          bestSnap,
        );
      }
    }
  }

  if (options.axisLine) {
    for (const entity of nearbyLineEntities) {
      const axisIntersection = infiniteLineSegmentIntersection(
        options.axisLine.point,
        options.axisLine.direction,
        entity,
      );
      if (!axisIntersection) {
        continue;
      }

      bestSnap = addSnapCandidate(
        point,
        { type: 'intersection', point: axisIntersection },
        tolerance,
        bestSnap,
      );
    }
  }

  if (options.origin) {
    for (const entity of nearbyLineEntities) {
      const perpendicularFoot = perpendicularFootOnSegment(options.origin, entity);
      if (!perpendicularFoot) {
        continue;
      }

      bestSnap = addSnapCandidate(
        point,
        { type: 'perpendicular', point: perpendicularFoot },
        tolerance,
        bestSnap,
      );
    }
    for (const entity of nearbySnapEntities.filter((candidate) => candidate.type === 'POLYLINE')) {
      for (const segment of polylineSegmentEntities(entity).filter((candidate) => candidate.type === 'LINE')) {
        const perpendicularFoot = perpendicularFootOnSegment(options.origin, segment);
        if (perpendicularFoot) {
          bestSnap = addSnapCandidate(
            point,
            { type: 'perpendicular', point: perpendicularFoot },
            tolerance,
            bestSnap,
          );
        }
      }
    }
    for (const segment of nearbyDraftParts.filter((candidate) => candidate.type === 'LINE')) {
      const perpendicularFoot = perpendicularFootOnSegment(options.origin, segment);
      if (perpendicularFoot) {
        bestSnap = addSnapCandidate(
          point,
          { type: 'perpendicular', point: perpendicularFoot },
          tolerance,
          bestSnap,
        );
      }
    }
  }

  for (const entity of snapEntities) {
    if (entity === options.ignoreEntity) {
      continue;
    }
    if (!isCircularEntity(entity)) {
      continue;
    }

    for (const candidate of circularReferencePoints(entity)) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  return bestSnap;
}

function activeDraftOrigin(state) {
  if (state.pendingLineStart) {
    return state.pendingLineStart;
  }
  if (state.rectangleDraft?.firstPoint) {
    return state.rectangleDraft.firstPoint;
  }
  if (state.polylineDraft?.vertices.length) {
    return state.polylineDraft.vertices[state.polylineDraft.vertices.length - 1];
  }
  if (state.dimensionDraft?.phase === 'placement') {
    return dimensionPlacementOrigin(state.dimensionDraft);
  }
  if (state.circleDraft?.mode === 'center-radius' && state.circleDraft.points.length === 1) {
    return state.circleDraft.points[0];
  }
  if (
    (state.arcDraft?.mode === 'center-radius' || state.arcDraft?.mode === 'center-start-end') &&
    state.arcDraft.points.length >= 1
  ) {
    return state.arcDraft.points[0];
  }
  if (state.copyDraft?.basePoint) {
    return state.copyDraft.basePoint;
  }
  if (state.moveDraft?.basePoint) {
    return state.moveDraft.basePoint;
  }
  if (state.rotateDraft?.basePoint) {
    return state.rotateDraft.basePoint;
  }
  return null;
}

function resolveCursorPoint(point, state) {
  if (!point) {
    return null;
  }

  const origin = activeDraftOrigin(state);
  const objectSnap = objectSnapPoint(point, state, { origin });
  state.activeObjectSnap = objectSnap;

  let nextPoint = objectSnap
    ? { ...objectSnap.point }
    : state.snapEnabled ? snapPoint(point) : { ...point };
  if (!objectSnap && state.orthoEnabled && origin) {
    nextPoint = orthoPoint(origin, nextPoint);
  }
  return nextPoint;
}

function resolvePointForState(point, state, origin = null, options = {}) {
  if (!point) {
    return null;
  }

  const ignoreEntity = state.selectedGrip?.entity || null;
  const ignoreKey = state.selectedGrip?.key || null;
  const objectSnap = objectSnapPoint(point, state, { ignoreEntity, ignoreKey, origin, ...options });
  state.activeObjectSnap = objectSnap;

  let nextPoint = objectSnap
    ? { ...objectSnap.point }
    : state.snapEnabled ? snapPoint(point) : { ...point };
  if (!objectSnap && state.orthoEnabled && origin) {
    nextPoint = orthoPoint(origin, nextPoint);
  }
  return nextPoint;
}

function parseDistanceInput(value) {
  const normalized = value.replace(',', '.');
  const distanceValue = Number(normalized);
  return Number.isFinite(distanceValue) && distanceValue > 0 ? distanceValue : null;
}

function parseAngleInput(value) {
  const normalized = value.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
    return null;
  }
  const angle = Number(normalized);
  return Number.isFinite(angle) ? angle : null;
}

function parseRelativeCoordinateInput(value) {
  const match = value.trim().match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))$/);
  if (!match) {
    return null;
  }

  const x = Number(match[1]);
  const y = Number(match[2]);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

function pointFromRelativeCoordinates(origin, value) {
  const relative = parseRelativeCoordinateInput(value);
  return relative && origin
    ? { x: origin.x + relative.x, y: origin.y + relative.y }
    : null;
}

function parseCopyMultiplier(value) {
  const match = value.trim().match(/^x(\d+)$/i);
  if (!match) {
    return null;
  }

  const count = Number(match[1]);
  return Number.isInteger(count) && count >= 2 ? count : null;
}

function pointFromDistance(start, directionPoint, distanceValue) {
  const deltaX = directionPoint.x - start.x;
  const deltaY = directionPoint.y - start.y;
  const directionLength = Math.hypot(deltaX, deltaY);
  if (directionLength <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: start.x + (deltaX / directionLength) * distanceValue,
    y: start.y + (deltaY / directionLength) * distanceValue,
  };
}

function circleFromThreePoints(first, second, third) {
  const determinant = 2 * (
    first.x * (second.y - third.y) +
    second.x * (third.y - first.y) +
    third.x * (first.y - second.y)
  );

  if (Math.abs(determinant) <= SNAP_THRESHOLD) {
    return null;
  }

  const firstSquared = first.x * first.x + first.y * first.y;
  const secondSquared = second.x * second.x + second.y * second.y;
  const thirdSquared = third.x * third.x + third.y * third.y;
  const center = {
    x: (
      firstSquared * (second.y - third.y) +
      secondSquared * (third.y - first.y) +
      thirdSquared * (first.y - second.y)
    ) / determinant,
    y: (
      firstSquared * (third.x - second.x) +
      secondSquared * (first.x - third.x) +
      thirdSquared * (second.x - first.x)
    ) / determinant,
  };
  const radius = distance(center, first);

  if (!Number.isFinite(radius) || radius <= SNAP_THRESHOLD) {
    return null;
  }

  return { center, radius };
}

function arcFromThreePoints(start, mid, end) {
  const circle = circleFromThreePoints(start, mid, end);
  if (!circle) {
    return null;
  }

  const startAngle = angleOfPoint(circle.center, start);
  const midAngle = angleOfPoint(circle.center, mid);
  const endAngle = angleOfPoint(circle.center, end);
  if (angleInSweep(midAngle, startAngle, endAngle)) {
    return { ...circle, startAngle, endAngle };
  }

  return { ...circle, startAngle: endAngle, endAngle: startAngle };
}

function arcFromCenterStartEnd(center, startPoint, endPoint) {
  const radius = distance(center, startPoint);
  if (radius <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    center,
    radius,
    startAngle: angleOfPoint(center, startPoint),
    endAngle: angleOfPoint(center, endPoint),
  };
}

function pointOnRadiusFromAngle(center, radius, anglePoint) {
  const angle = angleOfPoint(center, anglePoint);
  return pointAtCircleAngle({ center, radius }, angle);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return Math.abs(value) >= 1000
    ? value.toFixed(0)
    : value.toFixed(2).replace(/\.00$/, '');
}

function formatSnapType(type) {
  if (type === 'endpoint') {
    return 'Punto final';
  }
  if (type === 'midpoint') {
    return 'Punto medio';
  }
  if (type === 'intersection') {
    return 'Interseccion';
  }
  if (type === 'perpendicular') {
    return 'Perpendicular';
  }
  if (type === 'center') {
    return 'Centro';
  }
  if (type === 'quadrant') {
    return 'Cuadrante';
  }
  return 'Snap';
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
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
  return normalizeLineStyleId(state.activeLineStyle);
}

function applyLineStyleToEntity(entity, styleId) {
  const style = getLineStyle(styleId);
  entity.lineStyle = style.id;
  entity.color = getLineColor(entity.lineColor).color || style.color;
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

function drawingProfileById(profileId) {
  return DRAWING_PROFILES[profileId] || DRAWING_PROFILES.engineering;
}

function activeDrawingProfile() {
  return drawingProfileById(state.drawingProfile);
}

function profileLineTypeDash(lineTypeId) {
  const scale = activeDrawingProfile().lineTypeScale;
  return getLineType(lineTypeId).dash.map((length) => length * scale);
}

function activeLineTypeId() {
  return normalizeLineTypeId(state.activeLineType);
}

function applyLineTypeToEntity(entity, lineTypeId) {
  entity.lineType = getLineType(lineTypeId).id;
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
  return normalizeLineColorId(state.activeLineColor);
}

function applyLineColorToEntity(entity, lineColorId) {
  const lineColor = getLineColor(lineColorId);
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

function dimensionPlacementGripPoint(entity) {
  const geometry = dimensionGeometry(entity);
  if (entity.kind === 'horizontal' || entity.kind === 'vertical' || entity.kind === 'aligned') {
    const dimensionLine = geometry.lines[geometry.lines.length - 1];
    return dimensionLine ? entityMidpoint(dimensionLine) : entity.placement;
  }
  if (entity.kind === 'angular' && geometry.arcs[0]) {
    const arc = geometry.arcs[0];
    const sweep = normalizeAngle(arc.endAngle - arc.startAngle);
    const angle = arc.startAngle + sweep * 0.5;
    return {
      x: arc.center.x + Math.cos(angle) * arc.radius,
      y: arc.center.y + Math.sin(angle) * arc.radius,
    };
  }
  return entity.placement;
}

function dimensionBaseGripPoints(entity) {
  if (!['horizontal', 'vertical', 'aligned'].includes(entity.kind) || entity.points.length < 2) {
    return [];
  }
  const [first, second] = entity.points;
  if (entity.kind === 'horizontal') {
    return [
      { x: first.x, y: entity.placement.y },
      { x: second.x, y: entity.placement.y },
    ];
  }
  if (entity.kind === 'vertical') {
    return [
      { x: entity.placement.x, y: first.y },
      { x: entity.placement.x, y: second.y },
    ];
  }
  const direction = normalizedVector(first, second);
  if (!direction) {
    return [{ ...entity.placement }, { ...entity.placement }];
  }
  const normal = { x: -direction.y, y: direction.x };
  const offset = (entity.placement.x - first.x) * normal.x +
    (entity.placement.y - first.y) * normal.y;
  return [
    { x: first.x + normal.x * offset, y: first.y + normal.y * offset },
    { x: second.x + normal.x * offset, y: second.y + normal.y * offset },
  ];
}

function dimensionReferencePoints(entity) {
  const geometry = dimensionGeometry(entity);
  const baseGrips = dimensionBaseGripPoints(entity).map((point, index) => ({
    type: 'endpoint',
    key: `base-${index}`,
    point,
  }));
  return [
    ...baseGrips,
    ...entity.points.map((point, index) => ({ type: 'endpoint', key: `point-${index}`, point })),
    { type: 'midpoint', key: 'placement', point: dimensionPlacementGripPoint(entity) },
    { type: 'center', key: 'text', point: geometry.text.point },
  ];
}

function gripPoint(selectedGrip) {
  if (!selectedGrip) {
    return null;
  }
  if (selectedGrip.entity.type === 'HATCH') {
    return selectedGrip.entity.boundary[selectedGrip.index] || null;
  }
  if (isCircularEntity(selectedGrip.entity)) {
    return circularReferencePoints(selectedGrip.entity)
      .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
  }
  if (selectedGrip.entity.type === 'POLYLINE') {
    return polylineReferencePoints(selectedGrip.entity)
      .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
  }
  if (selectedGrip.entity.type === 'DIMENSION') {
    return dimensionReferencePoints(selectedGrip.entity)
      .find((candidate) => candidate.key === selectedGrip.key)?.point || null;
  }
  if (selectedGrip.entity.type === 'INSERT') {
    return selectedGrip.entity.insertionPoint;
  }
  return selectedGrip.entity[selectedGrip.key] || null;
}

function gripReferencePoint(selectedGrip) {
  if (!selectedGrip) {
    return null;
  }
  if (isCircularEntity(selectedGrip.entity) && selectedGrip.key !== 'center') {
    return selectedGrip.entity.center;
  }
  if (selectedGrip.entity.type === 'POLYLINE') {
    const vertexMatch = selectedGrip.key.match(/^vertex-(\d+)$/);
    if (vertexMatch) {
      const index = Number(vertexMatch[1]);
      const referenceIndex = index > 0
        ? index - 1
        : selectedGrip.entity.closed ? selectedGrip.entity.vertices.length - 1 : Math.min(1, selectedGrip.entity.vertices.length - 1);
      return selectedGrip.entity.vertices[referenceIndex] || gripPoint(selectedGrip);
    }
    const arcMatch = selectedGrip.key.match(/^arc-(\d+)-(?:midpoint|center)$/);
    if (arcMatch) {
      return selectedGrip.entity.vertices[Number(arcMatch[1])] || gripPoint(selectedGrip);
    }
    return gripPoint(selectedGrip);
  }
  if (selectedGrip.entity.type === 'DIMENSION') {
    const pointMatch = selectedGrip.key.match(/^point-(\d+)$/);
    if (pointMatch) {
      const index = Number(pointMatch[1]);
      const referenceIndex = index === 0 ? Math.min(1, selectedGrip.entity.points.length - 1) : 0;
      return selectedGrip.entity.points[referenceIndex] || gripPoint(selectedGrip);
    }
    if (selectedGrip.key === 'text') {
      return dimensionPlacementGripPoint(selectedGrip.entity);
    }
    const baseMatch = selectedGrip.key.match(/^base-(\d+)$/);
    if (baseMatch) {
      return selectedGrip.entity.points[Number(baseMatch[1])] || selectedGrip.entity.points[0];
    }
    return selectedGrip.entity.points[0] || gripPoint(selectedGrip);
  }
  if (selectedGrip.entity.type !== 'LINE') {
    return gripPoint(selectedGrip);
  }
  return selectedGrip.key === 'start' ? selectedGrip.entity.end : selectedGrip.entity.start;
}

function reshapeHatchArcGroup(entity, group, movedIndex, targetPoint) {
  const indices = group.indices;
  const movedPosition = indices.indexOf(movedIndex);
  if (indices.length < 3 || movedPosition < 0) {
    return false;
  }

  const endPosition = indices.length - 1;
  const passPosition = movedPosition > 0 && movedPosition < endPosition
    ? movedPosition
    : Math.floor(endPosition * 0.5);
  if (passPosition <= 0 || passPosition >= endPosition) {
    return false;
  }

  const startPoint = movedPosition === 0
    ? targetPoint
    : entity.boundary[indices[0]];
  const passPoint = movedPosition === passPosition
    ? targetPoint
    : entity.boundary[indices[passPosition]];
  const endPoint = movedPosition === endPosition
    ? targetPoint
    : entity.boundary[indices[endPosition]];
  const circle = circleFromThreePoints(startPoint, passPoint, endPoint);
  if (!circle) {
    return false;
  }

  const startAngle = angleOfPoint(circle.center, startPoint);
  const passAngle = angleOfPoint(circle.center, passPoint);
  const endAngle = angleOfPoint(circle.center, endPoint);
  const positiveTraversal = angleInSweep(passAngle, startAngle, endAngle);
  const firstSweep = positiveTraversal
    ? normalizeAngle(passAngle - startAngle)
    : -normalizeAngle(startAngle - passAngle);
  const secondSweep = positiveTraversal
    ? normalizeAngle(endAngle - passAngle)
    : -normalizeAngle(passAngle - endAngle);
  indices.forEach((boundaryIndex, position) => {
    const angle = position <= passPosition
      ? startAngle + firstSweep * position / passPosition
      : passAngle + secondSweep * (position - passPosition) / (endPosition - passPosition);
    const point = pointAtCircleAngle(circle, angle);
    entity.boundary[boundaryIndex].x = point.x;
    entity.boundary[boundaryIndex].y = point.y;
  });
  return true;
}

function resizeHatchCircleGroup(entity, group, targetPoint) {
  const indices = [...new Set(group.indices)];
  if (indices.length < 3) {
    return false;
  }
  const center = indices.reduce((sum, index) => ({
    x: sum.x + entity.boundary[index].x / indices.length,
    y: sum.y + entity.boundary[index].y / indices.length,
  }), { x: 0, y: 0 });
  const radius = distance(center, targetPoint);
  if (radius <= SNAP_THRESHOLD) {
    return false;
  }
  const angles = indices.map((index) => angleOfPoint(center, entity.boundary[index]));
  indices.forEach((boundaryIndex, position) => {
    const point = {
      x: center.x + Math.cos(angles[position]) * radius,
      y: center.y + Math.sin(angles[position]) * radius,
    };
    entity.boundary[boundaryIndex].x = point.x;
    entity.boundary[boundaryIndex].y = point.y;
  });
  return true;
}

function moveHatchGrip(entity, index, targetPoint) {
  const curveGroups = entity.curveGroups.filter((group) => group.indices.includes(index));
  let reshaped = false;
  for (const group of curveGroups) {
    if (group.type === 'ARC') {
      reshaped = reshapeHatchArcGroup(entity, group, index, targetPoint) || reshaped;
    }
    else if (group.type === 'CIRCLE') {
      reshaped = resizeHatchCircleGroup(entity, group, targetPoint) || reshaped;
    }
  }
  if (!reshaped) {
    entity.boundary[index].x = targetPoint.x;
    entity.boundary[index].y = targetPoint.y;
  }
  return true;
}

function moveCircularGrip(entity, key, targetPoint) {
  if (key === 'center') {
    entity.center = { ...targetPoint };
    return true;
  }
  if (entity.type === 'CIRCLE' && key.startsWith('quadrant-')) {
    const radius = distance(entity.center, targetPoint);
    if (radius <= SNAP_THRESHOLD) {
      return false;
    }
    entity.radius = radius;
    return true;
  }
  if (entity.type !== 'ARC') {
    return false;
  }
  if (key === 'midpoint') {
    const radius = distance(entity.center, targetPoint);
    if (radius <= SNAP_THRESHOLD) {
      return false;
    }
    entity.radius = radius;
    return true;
  }
  if (key === 'start' || key === 'end') {
    const angleKey = key === 'start' ? 'startAngle' : 'endAngle';
    const previousAngle = entity[angleKey];
    entity[angleKey] = angleOfPoint(entity.center, targetPoint);
    if (entityArcSweep(entity) <= SNAP_THRESHOLD) {
      entity[angleKey] = previousAngle;
      return false;
    }
    return true;
  }
  return false;
}

function projectCenterToChordBisector(start, end, point) {
  const midpoint = entityMidpoint({ start, end });
  const chord = { x: end.x - start.x, y: end.y - start.y };
  const chordLength = Math.hypot(chord.x, chord.y);
  if (chordLength <= SNAP_THRESHOLD) {
    return null;
  }
  const normal = { x: -chord.y / chordLength, y: chord.x / chordLength };
  const offset = (point.x - midpoint.x) * normal.x + (point.y - midpoint.y) * normal.y;
  return {
    x: midpoint.x + normal.x * offset,
    y: midpoint.y + normal.y * offset,
  };
}

function normalizedVector(start, end) {
  const vector = { x: end.x - start.x, y: end.y - start.y };
  const length = Math.hypot(vector.x, vector.y);
  return length > SNAP_THRESHOLD
    ? { x: vector.x / length, y: vector.y / length }
    : null;
}

function polylineIncomingTangent(draft) {
  const segmentIndex = draft.segments.length - 1;
  const segment = draft.segments[segmentIndex];
  const start = draft.vertices[segmentIndex];
  const end = draft.vertices[segmentIndex + 1];
  if (!segment || !start || !end) {
    return null;
  }
  if (segment.type !== 'ARC' || !segment.center) {
    return normalizedVector(start, end);
  }
  const angle = angleOfPoint(segment.center, end);
  return segment.clockwise === false
    ? { x: Math.sin(angle), y: -Math.cos(angle) }
    : { x: -Math.sin(angle), y: Math.cos(angle) };
}

function preferredPolylineArcClockwise(draft, start, end, center) {
  const startAngle = angleOfPoint(center, start);
  const endAngle = angleOfPoint(center, end);
  const clockwiseSweep = directedArcSweep(startAngle, endAngle, true);
  const counterclockwiseSweep = directedArcSweep(startAngle, endAngle, false);
  const incoming = polylineIncomingTangent(draft);
  if (incoming) {
    const clockwiseTangent = { x: -Math.sin(startAngle), y: Math.cos(startAngle) };
    const clockwiseAlignment = incoming.x * clockwiseTangent.x + incoming.y * clockwiseTangent.y;
    const counterclockwiseAlignment = -clockwiseAlignment;
    if (Math.abs(clockwiseAlignment - counterclockwiseAlignment) > SNAP_THRESHOLD) {
      return clockwiseAlignment > counterclockwiseAlignment;
    }
  }
  return clockwiseSweep <= counterclockwiseSweep;
}

function polylineTangentArcToPoint(draft, start, end) {
  const incoming = polylineIncomingTangent(draft);
  if (incoming) {
    const normal = { x: -incoming.y, y: incoming.x };
    const chord = { x: end.x - start.x, y: end.y - start.y };
    const denominator = 2 * (chord.x * normal.x + chord.y * normal.y);
    if (Math.abs(denominator) > SNAP_THRESHOLD) {
      const centerOffset = (chord.x * chord.x + chord.y * chord.y) / denominator;
      const center = {
        x: start.x + normal.x * centerOffset,
        y: start.y + normal.y * centerOffset,
      };
      return {
        center,
        radius: Math.abs(centerOffset),
        clockwise: centerOffset > 0,
      };
    }
  }
  const center = entityMidpoint({ start, end });
  return {
    center,
    radius: distance(center, start),
    clockwise: preferredPolylineArcClockwise(draft, start, end, center),
  };
}

function arcCenterFromBulge(start, end, bulge) {
  if (Math.abs(bulge) <= SNAP_THRESHOLD) {
    return null;
  }
  const chord = { x: end.x - start.x, y: end.y - start.y };
  const chordLength = Math.hypot(chord.x, chord.y);
  if (chordLength <= SNAP_THRESHOLD) {
    return null;
  }
  const midpoint = entityMidpoint({ start, end });
  const normal = { x: -chord.y / chordLength, y: chord.x / chordLength };
  const offset = chordLength * (1 - bulge * bulge) / (4 * bulge);
  return {
    x: midpoint.x + normal.x * offset,
    y: midpoint.y + normal.y * offset,
  };
}

function movePolylineGrip(entity, key, targetPoint) {
  const vertexMatch = key.match(/^vertex-(\d+)$/);
  if (vertexMatch) {
    const vertexIndex = Number(vertexMatch[1]);
    const adjacentArcs = [];
    entity.segments.forEach((segment, segmentIndex) => {
      const endIndex = (segmentIndex + 1) % entity.vertices.length;
      if (segment.type === 'ARC' && (segmentIndex === vertexIndex || endIndex === vertexIndex)) {
        const geometry = polylineSegmentEntity(entity, segmentIndex);
        if (geometry) {
          adjacentArcs.push({
            segmentIndex,
            midpoint: pointAtCircleAngle(geometry, arcMidAngle(geometry)),
          });
        }
      }
    });
    entity.vertices[vertexIndex] = { ...targetPoint };
    adjacentArcs.forEach(({ segmentIndex, midpoint }) => {
      const start = entity.vertices[segmentIndex];
      const end = entity.vertices[(segmentIndex + 1) % entity.vertices.length];
      const circle = circleFromThreePoints(start, midpoint, end);
      if (circle) {
        entity.segments[segmentIndex].center = circle.center;
      }
    });
    return true;
  }

  const arcMatch = key.match(/^arc-(\d+)-(midpoint|center)$/);
  if (arcMatch) {
    const segmentIndex = Number(arcMatch[1]);
    const start = entity.vertices[segmentIndex];
    const end = entity.vertices[(segmentIndex + 1) % entity.vertices.length];
    if (arcMatch[2] === 'center') {
      const center = projectCenterToChordBisector(start, end, targetPoint);
      if (!center) {
        return false;
      }
      entity.segments[segmentIndex].center = center;
      return true;
    }
    const circle = circleFromThreePoints(start, targetPoint, end);
    if (!circle) {
      return false;
    }
    entity.segments[segmentIndex].center = circle.center;
    return true;
  }

  return false;
}

function moveDimensionGrip(entity, key, targetPoint) {
  if (key === 'text') {
    if (entity.kind === 'radius' || entity.kind === 'diameter') {
      const metrics = dimensionStyleMetrics(entity.dimensionStyle);
      const textOffset = metrics.textGap + metrics.textHeight * 0.55;
      let placement = { ...targetPoint };
      for (let iteration = 0; iteration < 3; iteration += 1) {
        const direction = normalizedVector(entity.points[0], placement) ||
          normalizedVector(entity.points[0], entity.placement) ||
          normalizedVector(entity.points[0], entity.points[1]) ||
          { x: 1, y: 0 };
        let textAngle = Math.atan2(direction.y, direction.x);
        if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
          textAngle += Math.PI;
        }
        const normal = naturalDimensionTextNormal(textAngle);
        placement = {
          x: targetPoint.x - normal.x * textOffset,
          y: targetPoint.y - normal.y * textOffset,
        };
      }
      entity.placement = placement;
      entity.textPosition = null;
      return true;
    }
    entity.textPosition = { ...targetPoint };
    return true;
  }
  if (key === 'placement') {
    const currentPlacement = dimensionPlacementGripPoint(entity);
    let nextPlacement = { ...targetPoint };
    if (entity.kind === 'horizontal') {
      nextPlacement = { x: entity.placement.x, y: targetPoint.y };
    }
    else if (entity.kind === 'vertical') {
      nextPlacement = { x: targetPoint.x, y: entity.placement.y };
    }
    else if (entity.kind === 'aligned') {
      const direction = normalizedVector(entity.points[0], entity.points[1]);
      if (direction) {
        const normal = { x: -direction.y, y: direction.x };
        const offset = (targetPoint.x - entity.points[0].x) * normal.x +
          (targetPoint.y - entity.points[0].y) * normal.y;
        nextPlacement = {
          x: entity.points[0].x + normal.x * offset,
          y: entity.points[0].y + normal.y * offset,
        };
      }
    }
    else if (entity.kind === 'angular') {
      const vertex = entity.points[0];
      const currentDirection = normalizedVector(vertex, currentPlacement) || { x: 1, y: 0 };
      const radius = distance(vertex, targetPoint);
      nextPlacement = {
        x: vertex.x + currentDirection.x * radius,
        y: vertex.y + currentDirection.y * radius,
      };
    }
    entity.placement = nextPlacement;
    const nextGripPoint = dimensionPlacementGripPoint(entity);
    if (entity.textPosition) {
      entity.textPosition = offsetPoint(entity.textPosition, {
        x: nextGripPoint.x - currentPlacement.x,
        y: nextGripPoint.y - currentPlacement.y,
      });
    }
    return true;
  }
  const baseMatch = key.match(/^base-(\d+)$/);
  if (baseMatch) {
    const index = Number(baseMatch[1]);
    const currentBasePoint = dimensionBaseGripPoints(entity)[index];
    if (!currentBasePoint || !entity.points[index]) {
      return false;
    }
    if (entity.kind === 'horizontal') {
      entity.points[index].x = targetPoint.x;
    }
    else if (entity.kind === 'vertical') {
      entity.points[index].y = targetPoint.y;
    }
    else {
      const direction = normalizedVector(entity.points[0], entity.points[1]);
      if (!direction) {
        return false;
      }
      const displacement = (targetPoint.x - currentBasePoint.x) * direction.x +
        (targetPoint.y - currentBasePoint.y) * direction.y;
      entity.points[index] = offsetPoint(entity.points[index], {
        x: direction.x * displacement,
        y: direction.y * displacement,
      });
    }
    return true;
  }
  const pointMatch = key.match(/^point-(\d+)$/);
  if (!pointMatch) {
    return false;
  }
  const index = Number(pointMatch[1]);
  if (!entity.points[index]) {
    return false;
  }
  entity.points[index] = { ...targetPoint };
  return true;
}

function projectPointToLine(point, linePoint, direction) {
  const lengthSquared = direction.x * direction.x + direction.y * direction.y;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return { ...point };
  }

  const factor = (
    (point.x - linePoint.x) * direction.x +
    (point.y - linePoint.y) * direction.y
  ) / lengthSquared;
  return {
    x: linePoint.x + factor * direction.x,
    y: linePoint.y + factor * direction.y,
  };
}

function distancePointToSegment(point, start, end) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return distance(point, start);
  }

  const projection = clamp(
    ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) / lengthSquared,
    0,
    1,
  );
  const projectedPoint = {
    x: start.x + projection * segmentX,
    y: start.y + projection * segmentY,
  };
  return distance(point, projectedPoint);
}

function distancePointToCircle(point, entity) {
  return Math.abs(distance(point, entity.center) - entity.radius);
}

function distancePointToArc(point, entity) {
  const angle = angleOfPoint(entity.center, point);
  if (angleOnArc(angle, entity)) {
    return Math.abs(distance(point, entity.center) - entity.radius);
  }

  return Math.min(
    distance(point, pointAtCircleAngle(entity, entity.startAngle)),
    distance(point, pointAtCircleAngle(entity, entity.endAngle)),
  );
}

function polylineSegmentEntity(entity, index) {
  if (!entity || entity.type !== 'POLYLINE' || !entity.segments[index]) {
    return null;
  }
  const segment = entity.segments[index];
  const start = entity.vertices[index];
  const end = entity.vertices[(index + 1) % entity.vertices.length];
  if (!start || !end) {
    return null;
  }
  const options = {
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  };
  if (segment.type === 'ARC' && segment.center) {
    const radius = distance(segment.center, start);
    if (radius <= SNAP_THRESHOLD) {
      return null;
    }
    return new ArcEntity(
      segment.center,
      radius,
      angleOfPoint(segment.center, start),
      angleOfPoint(segment.center, end),
      { ...options, clockwise: segment.clockwise !== false },
    );
  }
  return new LineEntity(start, end, options);
}

function polylineSegmentEntities(entity) {
  if (!entity || entity.type !== 'POLYLINE') {
    return [];
  }
  return entity.segments
    .map((_, index) => polylineSegmentEntity(entity, index))
    .filter(Boolean);
}

function polylineDraftEntity(draft) {
  if (!draft?.vertices?.length) {
    return null;
  }
  return new PolylineEntity(draft.vertices, draft.segments || [], { closed: false });
}

function primitiveEntityParts(entity) {
  if (entity?.type === 'INSERT') {
    return entity.expandedEntities().flatMap((part) => primitiveEntityParts(part));
  }
  return entity?.type === 'POLYLINE' ? polylineSegmentEntities(entity) : entity ? [entity] : [];
}

function dimensionLineFromEntity(entity, pickPoint) {
  if (entity?.type === 'LINE') {
    return entity;
  }
  if (entity?.type !== 'POLYLINE') {
    return null;
  }
  return polylineSegmentEntities(entity)
    .filter((segment) => segment.type === 'LINE')
    .sort((first, second) =>
      distancePointToSegment(pickPoint, first.start, first.end) -
      distancePointToSegment(pickPoint, second.start, second.end))[0] || null;
}

function dimensionKindForLine(line) {
  const deltaX = Math.abs(line.end.x - line.start.x);
  const deltaY = Math.abs(line.end.y - line.start.y);
  if (deltaX <= SNAP_THRESHOLD) {
    return 'vertical';
  }
  if (deltaY <= SNAP_THRESHOLD) {
    return 'horizontal';
  }
  return 'aligned';
}

function dimensionCircularFromEntity(entity, pickPoint) {
  if (isCircularEntity(entity)) {
    return entity;
  }
  if (entity?.type !== 'POLYLINE') {
    return null;
  }
  const closestSegment = polylineSegmentEntities(entity)
    .sort((first, second) =>
      entityDistanceToPoint(first, pickPoint) - entityDistanceToPoint(second, pickPoint))[0];
  return closestSegment?.type === 'ARC' ? closestSegment : null;
}

function polylineReferencePoints(entity) {
  const candidates = entity.vertices.map((point, index) => ({
    type: 'endpoint',
    key: `vertex-${index}`,
    point,
  }));
  entity.segments.forEach((segment, index) => {
    const geometry = polylineSegmentEntity(entity, index);
    if (!geometry) {
      return;
    }
    if (geometry.type === 'ARC') {
      candidates.push({
        type: 'midpoint',
        key: `arc-${index}-midpoint`,
        point: pointAtCircleAngle(geometry, arcMidAngle(geometry)),
      });
      candidates.push({ type: 'center', key: `arc-${index}-center`, point: geometry.center });
    }
    else {
      candidates.push({
        type: 'midpoint',
        key: `segment-${index}-midpoint`,
        point: entityMidpoint(geometry),
      });
    }
  });
  return candidates;
}

function lineCircleIntersectionPoints(line, circle) {
  const deltaX = line.end.x - line.start.x;
  const deltaY = line.end.y - line.start.y;
  const fromCenterX = line.start.x - circle.center.x;
  const fromCenterY = line.start.y - circle.center.y;
  const a = deltaX * deltaX + deltaY * deltaY;
  const b = 2 * (fromCenterX * deltaX + fromCenterY * deltaY);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - circle.radius * circle.radius;
  const discriminant = b * b - 4 * a * c;

  if (a <= SNAP_THRESHOLD || discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const parameter = -b / (2 * a);
    if (parameter < -SNAP_THRESHOLD || parameter > 1 + SNAP_THRESHOLD) {
      return [];
    }
    return [pointAtLineParameter(line, clamp(parameter, 0, 1))];
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .filter((parameter) => parameter >= -SNAP_THRESHOLD && parameter <= 1 + SNAP_THRESHOLD)
    .map((parameter) => pointAtLineParameter(line, clamp(parameter, 0, 1)));
}

function circleCircleIntersectionPoints(first, second) {
  const centerDistance = distance(first.center, second.center);
  if (
    centerDistance <= SNAP_THRESHOLD ||
    centerDistance > first.radius + second.radius + SNAP_THRESHOLD ||
    centerDistance < Math.abs(first.radius - second.radius) - SNAP_THRESHOLD
  ) {
    return [];
  }

  const a = (
    first.radius * first.radius -
    second.radius * second.radius +
    centerDistance * centerDistance
  ) / (2 * centerDistance);
  const heightSquared = first.radius * first.radius - a * a;
  if (heightSquared < -SNAP_THRESHOLD) {
    return [];
  }

  const baseX = first.center.x + a * (second.center.x - first.center.x) / centerDistance;
  const baseY = first.center.y + a * (second.center.y - first.center.y) / centerDistance;
  if (Math.abs(heightSquared) <= SNAP_THRESHOLD) {
    return [{ x: baseX, y: baseY }];
  }

  const height = Math.sqrt(heightSquared);
  const offsetX = -(second.center.y - first.center.y) * height / centerDistance;
  const offsetY = (second.center.x - first.center.x) * height / centerDistance;
  return [
    { x: baseX + offsetX, y: baseY + offsetY },
    { x: baseX - offsetX, y: baseY - offsetY },
  ];
}

function isCircularEntity(entity) {
  return entity?.type === 'CIRCLE' || entity?.type === 'ARC';
}

function pointOnCircularEntity(point, entity) {
  return entity.type === 'CIRCLE' || angleOnArc(angleOfPoint(entity.center, point), entity);
}

function lineFullCircleIntersectionPoints(line, circularEntity) {
  const direction = {
    x: line.end.x - line.start.x,
    y: line.end.y - line.start.y,
  };
  return infiniteLineCircularIntersectionPoints(line.start, direction, circularEntity, false);
}

function fullCircleBoundaryIntersectionPoints(circularEntity, boundary) {
  if (!isCircularEntity(circularEntity) || !boundary || boundary === circularEntity) {
    return [];
  }

  if (boundary.type === 'POLYLINE') {
    return primitiveEntityParts(boundary)
      .flatMap((part) => fullCircleBoundaryIntersectionPoints(circularEntity, part));
  }

  if (boundary.type === 'LINE') {
    return lineFullCircleIntersectionPoints(boundary, circularEntity);
  }

  if (isCircularEntity(boundary)) {
    return circleCircleIntersectionPoints(circularEntity, boundary);
  }

  return [];
}

function entityIntersectionPoints(first, second) {
  if (first?.type === 'POLYLINE' || second?.type === 'POLYLINE') {
    const intersections = [];
    for (const firstPart of primitiveEntityParts(first)) {
      for (const secondPart of primitiveEntityParts(second)) {
        if (firstPart === first && secondPart === second) {
          continue;
        }
        intersections.push(...entityIntersectionPoints(firstPart, secondPart));
      }
    }
    return intersections.filter((point, index, points) =>
      points.findIndex((candidate) => distance(candidate, point) <= SNAP_THRESHOLD) === index);
  }
  if (first.type === 'LINE' && second.type === 'LINE') {
    const intersection = lineSegmentIntersection(first, second);
    return intersection ? [intersection] : [];
  }

  if (first.type === 'LINE' && isCircularEntity(second)) {
    return lineCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, second));
  }

  if (isCircularEntity(first) && second.type === 'LINE') {
    return lineCircleIntersectionPoints(second, first)
      .filter((point) => pointOnCircularEntity(point, first));
  }

  if (isCircularEntity(first) && isCircularEntity(second)) {
    return circleCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, first) && pointOnCircularEntity(point, second));
  }

  return [];
}

function createBounds(minX, minY, maxX, maxY) {
  return { minX, minY, maxX, maxY };
}

function mergeBounds(current, next) {
  if (!next) {
    return current;
  }
  if (!current) {
    return { ...next };
  }
  return createBounds(
    Math.min(current.minX, next.minX),
    Math.min(current.minY, next.minY),
    Math.max(current.maxX, next.maxX),
    Math.max(current.maxY, next.maxY),
  );
}

function normalizeBoundsFromPoints(first, second) {
  return createBounds(
    Math.min(first.x, second.x),
    Math.min(first.y, second.y),
    Math.max(first.x, second.x),
    Math.max(first.y, second.y),
  );
}

function boundsContainsBounds(container, candidate) {
  return candidate.minX >= container.minX - SNAP_THRESHOLD &&
    candidate.maxX <= container.maxX + SNAP_THRESHOLD &&
    candidate.minY >= container.minY - SNAP_THRESHOLD &&
    candidate.maxY <= container.maxY + SNAP_THRESHOLD;
}

function boundsIntersectsBounds(first, second) {
  return first.minX <= second.maxX + SNAP_THRESHOLD &&
    first.maxX >= second.minX - SNAP_THRESHOLD &&
    first.minY <= second.maxY + SNAP_THRESHOLD &&
    first.maxY >= second.minY - SNAP_THRESHOLD;
}

function expandBounds(bounds, padding) {
  return createBounds(
    bounds.minX - padding,
    bounds.minY - padding,
    bounds.maxX + padding,
    bounds.maxY + padding,
  );
}

function offsetBounds(bounds, vector) {
  return createBounds(
    bounds.minX + vector.x,
    bounds.minY + vector.y,
    bounds.maxX + vector.x,
    bounds.maxY + vector.y,
  );
}

function boundsContainsPoint(bounds, point) {
  return point.x >= bounds.minX - SNAP_THRESHOLD &&
    point.x <= bounds.maxX + SNAP_THRESHOLD &&
    point.y >= bounds.minY - SNAP_THRESHOLD &&
    point.y <= bounds.maxY + SNAP_THRESHOLD;
}

function entityDistanceToPoint(entity, point) {
  if (entity.type === 'LINE') {
    return distancePointToSegment(point, entity.start, entity.end);
  }
  if (entity.type === 'CIRCLE') {
    return distancePointToCircle(point, entity);
  }
  if (entity.type === 'ARC') {
    return distancePointToArc(point, entity);
  }
  if (entity.type === 'TEXT') {
    const localPoint = rotatePointAround(point, entity.insertionPoint, -entity.angle);
    const minX = entity.insertionPoint.x;
    const maxX = minX + entity.width();
    const minY = entity.insertionPoint.y - entity.height;
    const maxY = entity.insertionPoint.y + entity.height * 0.22;
    const deltaX = Math.max(minX - localPoint.x, 0, localPoint.x - maxX);
    const deltaY = Math.max(minY - localPoint.y, 0, localPoint.y - maxY);
    return Math.hypot(deltaX, deltaY);
  }
  if (entity.type === 'HATCH') {
    const loops = entity.loops || [entity.boundary];
    const insideFilledArea = loops.reduce(
      (inside, loop) => pointInPolygon(point, loop) ? !inside : inside,
      false,
    );
    return insideFilledArea
      ? 0
      : loops.reduce((nearest, loop) => Math.min(nearest, polygonDistanceToPoint(point, loop)), Infinity);
  }
  if (entity.type === 'POLYLINE') {
    return entity.segments.reduce((nearest, segment, index) => {
      const geometry = polylineSegmentEntity(entity, index);
      if (!geometry) {
        return nearest;
      }
      const halfWidth = Math.max(segment.startWidth, segment.endWidth) * 0.5;
      return Math.min(nearest, Math.max(0, entityDistanceToPoint(geometry, point) - halfWidth));
    }, Infinity);
  }
  if (entity.type === 'DIMENSION') {
    const geometry = dimensionGeometry(entity);
    const lineDistance = geometry.lines.reduce(
      (nearest, line) => Math.min(nearest, distancePointToSegment(point, line.start, line.end)),
      Infinity,
    );
    const arcDistance = geometry.arcs.reduce((nearest, arc) => Math.min(
      nearest,
      distancePointToArc(point, {
        type: 'ARC',
        center: arc.center,
        radius: arc.radius,
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        clockwise: !arc.counterclockwise,
      }),
    ), Infinity);
    return Math.min(lineDistance, arcDistance, distance(point, geometry.text.point));
  }
  if (entity.type === 'INSERT') {
    return entity.expandedEntities().reduce(
      (nearest, part) => Math.min(nearest, entityDistanceToPoint(part, point)),
      distance(entity.insertionPoint, point),
    );
  }
  return Infinity;
}

function entityIsNearPoint(entity, point, tolerance) {
  if (!boundsContainsPoint(expandBounds(entity.bounds(), tolerance), point)) {
    return false;
  }
  return entityDistanceToPoint(entity, point) <= tolerance;
}

function selectionWindowMode(selectionWindow) {
  return selectionWindow.currentWorld.x >= selectionWindow.startWorld.x ? 'window' : 'capture';
}

function polygonSignedArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area * 0.5;
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const first = polygon[index];
    const second = polygon[previous];
    const intersects = (first.y > point.y) !== (second.y > point.y) &&
      point.x < (second.x - first.x) * (point.y - first.y) /
        ((second.y - first.y) || Number.EPSILON) + first.x;
    if (intersects) {
      inside = !inside;
    }
  }
  return inside;
}

function polygonDistanceToPoint(point, polygon) {
  if (pointInPolygon(point, polygon)) {
    return 0;
  }
  let nearest = Infinity;
  for (let index = 0; index < polygon.length; index += 1) {
    nearest = Math.min(
      nearest,
      distancePointToSegment(point, polygon[index], polygon[(index + 1) % polygon.length]),
    );
  }
  return nearest;
}

class LineEntity {
  constructor(start, end, options = {}) {
    this.type = 'LINE';
    this.start = { x: start.x, y: start.y };
    this.end = { x: end.x, y: end.y };
    this.groupId = options.groupId || null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  bounds() {
    return createBounds(
      Math.min(this.start.x, this.end.x),
      Math.min(this.start.y, this.end.y),
      Math.max(this.start.x, this.end.x),
      Math.max(this.start.y, this.end.y),
    );
  }

  length() {
    return distance(this.start, this.end);
  }
}

class CircleEntity {
  constructor(center, radius, options = {}) {
    this.type = 'CIRCLE';
    this.center = { x: center.x, y: center.y };
    this.radius = radius;
    this.groupId = options.groupId || null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  bounds() {
    return createBounds(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.center.x + this.radius,
      this.center.y + this.radius,
    );
  }

  length() {
    return Math.PI * 2 * this.radius;
  }
}

class ArcEntity {
  constructor(center, radius, startAngle, endAngle, options = {}) {
    this.type = 'ARC';
    this.center = { x: center.x, y: center.y };
    this.radius = radius;
    this.startAngle = normalizeAngle(startAngle);
    this.endAngle = normalizeAngle(endAngle);
    this.clockwise = options.clockwise !== false;
    this.groupId = options.groupId || null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  bounds() {
    const points = [
      pointAtCircleAngle(this, this.startAngle),
      pointAtCircleAngle(this, this.endAngle),
    ];
    for (const angle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
      if (angleOnArc(angle, this)) {
        points.push(pointAtCircleAngle(this, angle));
      }
    }

    return createBounds(
      Math.min(...points.map((point) => point.x)),
      Math.min(...points.map((point) => point.y)),
      Math.max(...points.map((point) => point.x)),
      Math.max(...points.map((point) => point.y)),
    );
  }

  length() {
    return this.radius * entityArcSweep(this);
  }
}

class PolylineEntity {
  constructor(vertices, segments, options = {}) {
    this.type = 'POLYLINE';
    this.vertices = vertices.map((point) => ({ x: point.x, y: point.y }));
    this.closed = Boolean(options.closed);
    const expectedSegments = this.closed
      ? this.vertices.length
      : Math.max(0, this.vertices.length - 1);
    this.segments = segments.slice(0, expectedSegments).map((segment) => ({
      type: segment.type === 'ARC' ? 'ARC' : 'LINE',
      center: segment.center ? { x: segment.center.x, y: segment.center.y } : null,
      clockwise: segment.clockwise !== false,
      startWidth: Math.max(0, Number(segment.startWidth) || 0),
      endWidth: Math.max(0, Number(segment.endWidth) || 0),
    }));
    while (this.segments.length < expectedSegments) {
      this.segments.push({ type: 'LINE', center: null, clockwise: true, startWidth: 0, endWidth: 0 });
    }
    this.groupId = null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  bounds() {
    let bounds = null;
    this.segments.forEach((_, index) => {
      const geometry = polylineSegmentEntity(this, index);
      if (geometry) {
        bounds = mergeBounds(bounds, geometry.bounds());
      }
    });
    if (!bounds && this.vertices.length) {
      bounds = createBounds(
        Math.min(...this.vertices.map((point) => point.x)),
        Math.min(...this.vertices.map((point) => point.y)),
        Math.max(...this.vertices.map((point) => point.x)),
        Math.max(...this.vertices.map((point) => point.y)),
      );
    }
    const maximumWidth = this.segments.reduce(
      (maximum, segment) => Math.max(maximum, segment.startWidth, segment.endWidth),
      0,
    );
    return bounds ? expandBounds(bounds, maximumWidth * 0.5) : createBounds(0, 0, 0, 0);
  }

  length() {
    return polylineSegmentEntities(this).reduce((total, segment) => total + segment.length(), 0);
  }
}

class TextEntity {
  constructor(insertionPoint, text, height, options = {}) {
    this.type = 'TEXT';
    this.insertionPoint = { x: insertionPoint.x, y: insertionPoint.y };
    this.text = String(text || '');
    this.height = Math.max(Number(height) || 0, SNAP_THRESHOLD);
    this.angle = Number(options.angle) || 0;
    this.groupId = options.groupId || null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  width() {
    return Math.max(this.height * 0.35, this.text.length * this.height * 0.56);
  }

  bounds() {
    const corners = [
      { x: this.insertionPoint.x, y: this.insertionPoint.y - this.height },
      { x: this.insertionPoint.x + this.width(), y: this.insertionPoint.y - this.height },
      { x: this.insertionPoint.x + this.width(), y: this.insertionPoint.y + this.height * 0.22 },
      { x: this.insertionPoint.x, y: this.insertionPoint.y + this.height * 0.22 },
    ].map((point) => rotatePointAround(point, this.insertionPoint, this.angle));
    return createBounds(
      Math.min(...corners.map((point) => point.x)),
      Math.min(...corners.map((point) => point.y)),
      Math.max(...corners.map((point) => point.x)),
      Math.max(...corners.map((point) => point.y)),
    );
  }

  length() {
    return this.width();
  }
}

class HatchEntity {
  constructor(boundary, options = {}) {
    this.type = 'HATCH';
    const requestedGripIndices = options.gripIndices || boundary.gripIndices;
    const requestedCurveGroups = options.curveGroups || boundary.curveGroups;
    const requestedLoops = Array.isArray(options.loops) && options.loops.length
      ? options.loops
      : [boundary];
    this.loops = requestedLoops
      .filter((loop) => Array.isArray(loop) && loop.length >= 3)
      .map((loop) => loop.map((point) => ({ x: point.x, y: point.y })));
    if (!this.loops.length) {
      this.loops = [boundary.map((point) => ({ x: point.x, y: point.y }))];
    }
    this.boundary = this.loops[0];
    this.gripIndices = Array.isArray(requestedGripIndices)
      ? [...new Set(requestedGripIndices)]
        .filter((index) => Number.isInteger(index) && index >= 0 && index < this.boundary.length)
      : this.boundary.map((_, index) => index);
    this.curveGroups = Array.isArray(requestedCurveGroups)
      ? requestedCurveGroups.map((group) => ({
        type: group.type,
        indices: [...group.indices],
      }))
      : [];
    this.pattern = 'solid';
    this.groupId = null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  bounds() {
    const points = this.loops.flat();
    return createBounds(
      Math.min(...points.map((point) => point.x)),
      Math.min(...points.map((point) => point.y)),
      Math.max(...points.map((point) => point.x)),
      Math.max(...points.map((point) => point.y)),
    );
  }

  length() {
    return this.loops.reduce((total, loop) => total + loop.reduce((loopTotal, point, index) =>
      loopTotal + distance(point, loop[(index + 1) % loop.length]), 0), 0);
  }
}

function dimensionStyleMetrics(styleId) {
  const style = DIMENSION_STYLES[styleId] || DIMENSION_STYLES.normal;
  const profileMetrics = activeDrawingProfile().dimensionMetrics;
  const scale = style.scale / DIMENSION_STYLES.normal.scale;
  return {
    textHeight: profileMetrics.textHeight * scale,
    arrowSize: profileMetrics.arrowSize * scale,
    textGap: profileMetrics.textGap,
    extensionOffset: profileMetrics.extensionOffset * scale,
    extensionOvershoot: profileMetrics.extensionOvershoot * scale,
  };
}

function dimensionArrow(tip, direction, size) {
  const unit = normalizedVector({ x: 0, y: 0 }, direction) || { x: 1, y: 0 };
  const normal = { x: -unit.y, y: unit.x };
  const arrowLength = size * 0.78;
  const base = { x: tip.x + unit.x * arrowLength, y: tip.y + unit.y * arrowLength };
  const halfWidth = size * 0.18;
  return [
    { ...tip },
    { x: base.x + normal.x * halfWidth, y: base.y + normal.y * halfWidth },
    { x: base.x - normal.x * halfWidth, y: base.y - normal.y * halfWidth },
  ];
}

function dimensionExtensionLine(reference, dimensionPoint, metrics) {
  const unit = normalizedVector(reference, dimensionPoint);
  if (!unit) {
    return null;
  }
  return {
    start: {
      x: reference.x + unit.x * metrics.extensionOffset,
      y: reference.y + unit.y * metrics.extensionOffset,
    },
    end: {
      x: dimensionPoint.x + unit.x * metrics.extensionOvershoot,
      y: dimensionPoint.y + unit.y * metrics.extensionOvershoot,
    },
  };
}

function dimensionTextValue(entity) {
  if (entity.kind === 'radius') {
    return `R${formatNumber(entity.measurement())}`;
  }
  if (entity.kind === 'diameter') {
    return `Ø${formatNumber(entity.measurement())}`;
  }
  if (entity.kind === 'angular') {
    return `${formatNumber(entity.measurement())}°`;
  }
  return formatNumber(entity.measurement());
}

function naturalDimensionTextNormal(angle) {
  let normal = { x: -Math.sin(angle), y: Math.cos(angle) };
  if (Math.abs(Math.cos(angle)) < 0.05) {
    if (normal.x > 0) {
      normal = { x: -normal.x, y: -normal.y };
    }
  }
  else if (normal.y > 0) {
    normal = { x: -normal.x, y: -normal.y };
  }
  return normal;
}

function dimensionLinearGeometry(entity, metrics) {
  const first = entity.points[0];
  const second = entity.points[1];
  const placement = entity.placement;
  let firstDimension;
  let secondDimension;
  let textAngle = 0;
  if (entity.kind === 'horizontal') {
    firstDimension = { x: first.x, y: placement.y };
    secondDimension = { x: second.x, y: placement.y };
  }
  else if (entity.kind === 'vertical') {
    firstDimension = { x: placement.x, y: first.y };
    secondDimension = { x: placement.x, y: second.y };
    textAngle = -Math.PI * 0.5;
  }
  else {
    const direction = normalizedVector(first, second) || { x: 1, y: 0 };
    const normal = { x: -direction.y, y: direction.x };
    const offset = (placement.x - first.x) * normal.x + (placement.y - first.y) * normal.y;
    firstDimension = { x: first.x + normal.x * offset, y: first.y + normal.y * offset };
    secondDimension = { x: second.x + normal.x * offset, y: second.y + normal.y * offset };
    textAngle = Math.atan2(direction.y, direction.x);
    if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
      textAngle += Math.PI;
    }
  }
  const textNormal = naturalDimensionTextNormal(textAngle);
  const lineDirection = normalizedVector(firstDimension, secondDimension) || { x: 1, y: 0 };
  const midpoint = entityMidpoint({ start: firstDimension, end: secondDimension });
  const dimensionLength = distance(firstDimension, secondDimension);
  const externalArrows = dimensionLength < metrics.arrowSize * 2.5;
  const dimensionLine = externalArrows
    ? {
      start: {
        x: firstDimension.x - lineDirection.x * metrics.arrowSize * 1.35,
        y: firstDimension.y - lineDirection.y * metrics.arrowSize * 1.35,
      },
      end: {
        x: secondDimension.x + lineDirection.x * metrics.arrowSize * 1.35,
        y: secondDimension.y + lineDirection.y * metrics.arrowSize * 1.35,
      },
    }
    : { start: firstDimension, end: secondDimension };
  return {
    lines: [
      dimensionExtensionLine(first, firstDimension, metrics),
      dimensionExtensionLine(second, secondDimension, metrics),
      dimensionLine,
    ].filter(Boolean),
    arcs: [],
    arrows: externalArrows
      ? [
        dimensionArrow(firstDimension, { x: -lineDirection.x, y: -lineDirection.y }, metrics.arrowSize),
        dimensionArrow(secondDimension, lineDirection, metrics.arrowSize),
      ]
      : [
        dimensionArrow(firstDimension, lineDirection, metrics.arrowSize),
        dimensionArrow(secondDimension, { x: -lineDirection.x, y: -lineDirection.y }, metrics.arrowSize),
      ],
    text: {
      point: {
        x: midpoint.x + textNormal.x * (metrics.textGap + metrics.textHeight * 0.55),
        y: midpoint.y + textNormal.y * (metrics.textGap + metrics.textHeight * 0.55),
      },
      angle: textAngle,
      value: dimensionTextValue(entity),
      height: metrics.textHeight,
    },
  };
}

function dimensionRadialGeometry(entity, metrics) {
  const center = entity.points[0];
  const radiusPoint = entity.points[1];
  const radius = distance(center, radiusPoint);
  const direction = normalizedVector(center, entity.placement) || normalizedVector(center, radiusPoint) || { x: 1, y: 0 };
  let textAngle = Math.atan2(direction.y, direction.x);
  if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
    textAngle += Math.PI;
  }
  const textNormal = naturalDimensionTextNormal(textAngle);
  const positiveEdge = { x: center.x + direction.x * radius, y: center.y + direction.y * radius };
  const negativeEdge = { x: center.x - direction.x * radius, y: center.y - direction.y * radius };
  const arrowExtension = metrics.arrowSize * 1.35;
  const extendedPositiveEdge = {
    x: positiveEdge.x + direction.x * arrowExtension,
    y: positiveEdge.y + direction.y * arrowExtension,
  };
  const extendedNegativeEdge = {
    x: negativeEdge.x - direction.x * arrowExtension,
    y: negativeEdge.y - direction.y * arrowExtension,
  };
  const textPoint = {
    x: entity.placement.x + textNormal.x * (metrics.textGap + metrics.textHeight * 0.55),
    y: entity.placement.y + textNormal.y * (metrics.textGap + metrics.textHeight * 0.55),
  };
  if (entity.kind === 'diameter') {
    const placementDistance = (
      (entity.placement.x - center.x) * direction.x +
      (entity.placement.y - center.y) * direction.y
    );
    const extendToCenter = placementDistance < radius;
    return {
      lines: [extendToCenter
        ? { start: extendedNegativeEdge, end: extendedPositiveEdge }
        : { start: negativeEdge, end: entity.placement }],
      arcs: [],
      arrows: [
        dimensionArrow(negativeEdge, direction, metrics.arrowSize),
        dimensionArrow(positiveEdge, { x: -direction.x, y: -direction.y }, metrics.arrowSize),
      ],
      text: { point: textPoint, angle: textAngle, value: dimensionTextValue(entity), height: metrics.textHeight },
    };
  }
  const placementDistance = (
    (entity.placement.x - center.x) * direction.x +
    (entity.placement.y - center.y) * direction.y
  );
  const radialLine = placementDistance < radius
    ? { start: center, end: extendedPositiveEdge }
    : { start: center, end: entity.placement };
  return {
    lines: [radialLine],
    arcs: [],
    arrows: [dimensionArrow(positiveEdge, direction, metrics.arrowSize)],
    text: { point: textPoint, angle: textAngle, value: dimensionTextValue(entity), height: metrics.textHeight },
  };
}

function dimensionAngularGeometry(entity, metrics) {
  const [vertex, firstRay, secondRay] = entity.points;
  let startAngle = angleOfPoint(vertex, firstRay);
  let endAngle = angleOfPoint(vertex, secondRay);
  let sweep = normalizeAngle(endAngle - startAngle);
  if (sweep > Math.PI) {
    [startAngle, endAngle] = [endAngle, startAngle];
    sweep = TWO_PI - sweep;
  }
  const radius = Math.max(distance(vertex, entity.placement), metrics.arrowSize * 2);
  const start = { x: vertex.x + Math.cos(startAngle) * radius, y: vertex.y + Math.sin(startAngle) * radius };
  const end = { x: vertex.x + Math.cos(endAngle) * radius, y: vertex.y + Math.sin(endAngle) * radius };
  const midAngle = startAngle + sweep * 0.5;
  const tangentStart = { x: -Math.sin(startAngle), y: Math.cos(startAngle) };
  const tangentEnd = { x: Math.sin(endAngle), y: -Math.cos(endAngle) };
  const externalArrows = radius * sweep < metrics.arrowSize * 2.5;
  const arrowArcExtension = externalArrows
    ? metrics.arrowSize * 1.35 / radius
    : 0;
  let textAngle = Math.atan2(
    Math.sin(midAngle + Math.PI * 0.5),
    Math.cos(midAngle + Math.PI * 0.5),
  );
  if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
    textAngle += Math.PI;
  }
  return {
    lines: [
      { start: vertex, end: { x: vertex.x + Math.cos(startAngle) * (radius + metrics.extensionOvershoot), y: vertex.y + Math.sin(startAngle) * (radius + metrics.extensionOvershoot) } },
      { start: vertex, end: { x: vertex.x + Math.cos(endAngle) * (radius + metrics.extensionOvershoot), y: vertex.y + Math.sin(endAngle) * (radius + metrics.extensionOvershoot) } },
    ],
    arcs: [{
      center: vertex,
      radius,
      startAngle: startAngle - arrowArcExtension,
      endAngle: endAngle + arrowArcExtension,
      counterclockwise: false,
    }],
    arrows: externalArrows
      ? [
        dimensionArrow(start, { x: -tangentStart.x, y: -tangentStart.y }, metrics.arrowSize),
        dimensionArrow(end, { x: -tangentEnd.x, y: -tangentEnd.y }, metrics.arrowSize),
      ]
      : [
        dimensionArrow(start, tangentStart, metrics.arrowSize),
        dimensionArrow(end, tangentEnd, metrics.arrowSize),
      ],
    text: {
      point: {
        x: vertex.x + Math.cos(midAngle) * (radius + metrics.textGap + metrics.textHeight * 0.6),
        y: vertex.y + Math.sin(midAngle) * (radius + metrics.textGap + metrics.textHeight * 0.6),
      },
      angle: textAngle,
      value: dimensionTextValue(entity),
      height: metrics.textHeight,
    },
  };
}

function dimensionGeometry(entity) {
  const metrics = dimensionStyleMetrics(entity.dimensionStyle);
  let geometry;
  if (entity.kind === 'angular') {
    geometry = dimensionAngularGeometry(entity, metrics);
  }
  else if (entity.kind === 'radius' || entity.kind === 'diameter') {
    geometry = dimensionRadialGeometry(entity, metrics);
  }
  else {
    geometry = dimensionLinearGeometry(entity, metrics);
  }
  if (entity.textPosition && entity.kind !== 'radius' && entity.kind !== 'diameter') {
    geometry.text.point = { ...entity.textPosition };
  }
  return geometry;
}

class DimensionEntity {
  constructor(kind, points, placement, options = {}) {
    this.type = 'DIMENSION';
    this.kind = kind;
    this.points = points.map((point) => ({ x: point.x, y: point.y }));
    this.placement = { x: placement.x, y: placement.y };
    this.textPosition = options.textPosition
      ? { x: options.textPosition.x, y: options.textPosition.y }
      : null;
    this.dimensionStyle = DIMENSION_STYLES[options.dimensionStyle]?.id || 'normal';
    this.groupId = null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, 'auxiliar');
    applyLineTypeToEntity(this, 'continuous');
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  measurement() {
    if (this.kind === 'horizontal') return Math.abs(this.points[1].x - this.points[0].x);
    if (this.kind === 'vertical') return Math.abs(this.points[1].y - this.points[0].y);
    if (this.kind === 'aligned') return distance(this.points[0], this.points[1]);
    if (this.kind === 'radius') return distance(this.points[0], this.points[1]);
    if (this.kind === 'diameter') return distance(this.points[0], this.points[1]) * 2;
    const firstAngle = angleOfPoint(this.points[0], this.points[1]);
    const secondAngle = angleOfPoint(this.points[0], this.points[2]);
    const sweep = normalizeAngle(secondAngle - firstAngle);
    return Math.min(sweep, TWO_PI - sweep) * 180 / Math.PI;
  }

  bounds() {
    const geometry = dimensionGeometry(this);
    const points = [
      ...this.points,
      this.placement,
      ...geometry.lines.flatMap((line) => [line.start, line.end]),
      ...geometry.arrows.flat(),
      geometry.text.point,
    ];
    geometry.arcs.forEach((arc) => {
      for (let index = 0; index <= 16; index += 1) {
        const angle = arc.startAngle + normalizeAngle(arc.endAngle - arc.startAngle) * index / 16;
        points.push({ x: arc.center.x + Math.cos(angle) * arc.radius, y: arc.center.y + Math.sin(angle) * arc.radius });
      }
    });
    const padding = geometry.text.height;
    return expandBounds(createBounds(
      Math.min(...points.map((point) => point.x)),
      Math.min(...points.map((point) => point.y)),
      Math.max(...points.map((point) => point.x)),
      Math.max(...points.map((point) => point.y)),
    ), padding);
  }

  length() {
    return this.measurement();
  }
}

function dimensionPlacementOrigin(draft) {
  return draft?.points?.[0] || null;
}

function dimensionPlacementDistance(draft, placement) {
  if (!draft?.points?.length || !placement) {
    return null;
  }
  const origin = draft.points[0];
  if (draft.kind === 'horizontal') {
    return Math.abs(placement.y - origin.y);
  }
  if (draft.kind === 'vertical') {
    return Math.abs(placement.x - origin.x);
  }
  if (draft.kind === 'aligned' && draft.points[1]) {
    return distancePointToInfiniteLine(placement, origin, {
      x: draft.points[1].x - origin.x,
      y: draft.points[1].y - origin.y,
    });
  }
  if ((draft.kind === 'radius' || draft.kind === 'diameter') && draft.points[1]) {
    return Math.max(0, distance(origin, placement) - distance(origin, draft.points[1]));
  }
  if (draft.kind === 'angular') {
    return distance(origin, placement);
  }
  return null;
}

function dimensionPlacementPoint(draft, cursor, currentState) {
  if (!draft || !cursor || draft.phase !== 'placement') {
    return cursor;
  }
  const origin = dimensionPlacementOrigin(draft);
  const coordinateTarget = pointFromRelativeCoordinates(origin, currentState.distanceInput);
  if (coordinateTarget) {
    draft.suggestionActive = false;
    return coordinateTarget;
  }
  let inputDistance = parseDistanceInput(currentState.distanceInput);
  draft.suggestionActive = false;
  if (
    inputDistance === null &&
    !currentState.activeObjectSnap &&
    Number.isFinite(draft.suggestedOffset) &&
    draft.suggestedOffset > SNAP_THRESHOLD
  ) {
    const cursorDistance = dimensionPlacementDistance(draft, cursor);
    const suggestionTolerance = (currentState.snapPixelTolerance || 10) / currentState.viewScale;
    if (
      Number.isFinite(cursorDistance) &&
      Math.abs(cursorDistance - draft.suggestedOffset) <= suggestionTolerance
    ) {
      inputDistance = draft.suggestedOffset;
      draft.suggestionActive = true;
    }
  }
  if (inputDistance === null || !origin) {
    return cursor;
  }
  if (draft.kind === 'horizontal') {
    const side = Math.sign(cursor.y - origin.y) || 1;
    return { x: cursor.x, y: origin.y + side * inputDistance };
  }
  if (draft.kind === 'vertical') {
    const side = Math.sign(cursor.x - origin.x) || 1;
    return { x: origin.x + side * inputDistance, y: cursor.y };
  }
  if (draft.kind === 'aligned' && draft.points[1]) {
    const direction = normalizedVector(draft.points[0], draft.points[1]);
    if (direction) {
      const normal = { x: -direction.y, y: direction.x };
      const side = Math.sign((cursor.x - origin.x) * normal.x + (cursor.y - origin.y) * normal.y) || 1;
      return { x: origin.x + normal.x * inputDistance * side, y: origin.y + normal.y * inputDistance * side };
    }
  }
  const direction = normalizedVector(origin, cursor) || { x: 1, y: 0 };
  const radialOffset = draft.kind === 'radius' || draft.kind === 'diameter'
    ? distance(draft.points[0], draft.points[1]) + inputDistance
    : inputDistance;
  return {
    x: origin.x + direction.x * radialOffset,
    y: origin.y + direction.y * radialOffset,
  };
}

function dimensionDraftEntity(draft, placement) {
  if (!draft || draft.phase !== 'placement' || !placement) {
    return null;
  }
  return new DimensionEntity(draft.kind, draft.points, placement, {
    layer: activeLayerName(),
    lineColor: activeLineColorId(),
    dimensionStyle: state.dimensionStyle,
  });
}

class BlockReferenceEntity {
  constructor(definition, insertionPoint, options = {}) {
    this.type = 'INSERT';
    this.blockName = definition?.name || String(options.blockName || '');
    this.definition = definition || null;
    this.insertionPoint = { x: insertionPoint.x, y: insertionPoint.y };
    this.rotation = Number(options.rotation) || 0;
    this.scaleX = Number.isFinite(Number(options.scaleX)) ? Number(options.scaleX) : 1;
    this.scaleY = Number.isFinite(Number(options.scaleY)) ? Number(options.scaleY) : this.scaleX;
    this.expandedCache = null;
    this.expandedCacheKey = '';
    this.expandedCacheDefinition = null;
    this.expandedCacheRevision = -1;
    this.groupId = null;
    this.layer = options.layer || DEFAULT_LAYER.name;
    applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
    applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
    applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
  }

  expandedEntities() {
    const cacheKey = [
      this.insertionPoint.x,
      this.insertionPoint.y,
      this.rotation,
      this.scaleX,
      this.scaleY,
    ].join(':');
    if (
      this.expandedCache &&
      this.expandedCacheKey === cacheKey &&
      this.expandedCacheDefinition === this.definition &&
      this.expandedCacheRevision === (this.definition?.revision || 0)
    ) {
      return this.expandedCache;
    }
    this.expandedCache = expandBlockReferenceEntities(this);
    this.expandedCacheKey = cacheKey;
    this.expandedCacheDefinition = this.definition;
    this.expandedCacheRevision = this.definition?.revision || 0;
    return this.expandedCache;
  }

  bounds() {
    const expanded = this.expandedEntities();
    if (!expanded.length) {
      return createBounds(
        this.insertionPoint.x,
        this.insertionPoint.y,
        this.insertionPoint.x,
        this.insertionPoint.y,
      );
    }
    return expanded.reduce((bounds, entity) => mergeBounds(bounds, entity.bounds()), null);
  }

  length() {
    return this.expandedEntities().reduce((total, entity) => total + entity.length(), 0);
  }
}

function cloneBlockDefinition(definition, definitionMap = null) {
  const clone = {
    name: definition.name,
    revision: definition.revision || 0,
    entities: [],
  };
  clone.entities = definition.entities
    .map((entity) => cloneEntity(entity, {
      definition: entity.type === 'INSERT'
        ? definitionMap?.get(entity.blockName.toLowerCase()) || entity.definition
        : undefined,
    }))
    .filter(Boolean);
  return clone;
}

function scalePointFromOrigin(point, scaleX, scaleY) {
  return { x: point.x * scaleX, y: point.y * scaleY };
}

function scaleEntityByFactors(entity, scaleX, scaleY) {
  const uniformScale = (Math.abs(scaleX) + Math.abs(scaleY)) * 0.5;
  if (entity.type === 'LINE') {
    entity.start = scalePointFromOrigin(entity.start, scaleX, scaleY);
    entity.end = scalePointFromOrigin(entity.end, scaleX, scaleY);
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => scalePointFromOrigin(point, scaleX, scaleY));
    entity.placement = scalePointFromOrigin(entity.placement, scaleX, scaleY);
    if (entity.textPosition) {
      entity.textPosition = scalePointFromOrigin(entity.textPosition, scaleX, scaleY);
    }
    return true;
  }
  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = scalePointFromOrigin(entity.center, scaleX, scaleY);
    entity.radius *= uniformScale;
    return true;
  }
  if (entity.type === 'TEXT') {
    entity.insertionPoint = scalePointFromOrigin(entity.insertionPoint, scaleX, scaleY);
    entity.height *= uniformScale;
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) =>
      loop.map((point) => scalePointFromOrigin(point, scaleX, scaleY)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => scalePointFromOrigin(point, scaleX, scaleY));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = scalePointFromOrigin(segment.center, scaleX, scaleY);
      }
      segment.startWidth *= uniformScale;
      segment.endWidth *= uniformScale;
    });
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = scalePointFromOrigin(entity.insertionPoint, scaleX, scaleY);
    entity.scaleX *= scaleX;
    entity.scaleY *= scaleY;
    return true;
  }
  return false;
}

function expandBlockReferenceEntities(reference, depth = 0, visited = new Set()) {
  const definition = reference?.definition;
  const definitionKey = String(reference?.blockName || '').toLowerCase();
  if (!definition || depth > 8 || visited.has(definitionKey)) {
    return [];
  }
  const nextVisited = new Set(visited);
  nextVisited.add(definitionKey);
  const expanded = [];
  for (const source of definition.entities) {
    const transformed = cloneEntity(source);
    if (!transformed || !scaleEntityByFactors(transformed, reference.scaleX, reference.scaleY)) {
      continue;
    }
    rotateEntityByAngle(transformed, { x: 0, y: 0 }, reference.rotation);
    moveEntityByVector(transformed, reference.insertionPoint);
    if (transformed.type === 'INSERT') {
      expanded.push(...expandBlockReferenceEntities(transformed, depth + 1, nextVisited));
    }
    else {
      expanded.push(transformed);
    }
  }
  return expanded;
}

function transformedBlockContents(reference) {
  if (!reference?.definition) {
    return [];
  }
  return reference.definition.entities.map((source) => {
    const transformed = cloneEntity(source);
    if (!transformed || !scaleEntityByFactors(transformed, reference.scaleX, reference.scaleY)) {
      return null;
    }
    rotateEntityByAngle(transformed, { x: 0, y: 0 }, reference.rotation);
    moveEntityByVector(transformed, reference.insertionPoint);
    return transformed;
  }).filter(Boolean);
}

function entityCanExplode(entity) {
  return entity?.type === 'INSERT' || entity?.type === 'POLYLINE' || Boolean(entity?.groupId);
}

function cloneEntityWithOffset(entity, vector, options = {}) {
  const groupId = Object.prototype.hasOwnProperty.call(options, 'groupId') ? options.groupId : entity.groupId;
  if (entity.type === 'LINE') {
    return new LineEntity(
      offsetPoint(entity.start, vector),
      offsetPoint(entity.end, vector),
      { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor, groupId },
    );
  }

  if (entity.type === 'CIRCLE') {
    return new CircleEntity(
      offsetPoint(entity.center, vector),
      entity.radius,
      { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor, groupId },
    );
  }

  if (entity.type === 'ARC') {
    return new ArcEntity(
      offsetPoint(entity.center, vector),
      entity.radius,
      entity.startAngle,
      entity.endAngle,
      {
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
        groupId,
        clockwise: entity.clockwise !== false,
      },
    );
  }

  if (entity.type === 'POLYLINE') {
    return new PolylineEntity(
      entity.vertices.map((point) => offsetPoint(point, vector)),
      entity.segments.map((segment) => ({
        ...segment,
        center: segment.center ? offsetPoint(segment.center, vector) : null,
      })),
      {
        closed: entity.closed,
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
      },
    );
  }

  if (entity.type === 'TEXT') {
    return new TextEntity(
      offsetPoint(entity.insertionPoint, vector),
      entity.text,
      entity.height,
      {
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
        angle: entity.angle,
        groupId,
      },
    );
  }
  if (entity.type === 'HATCH') {
    return new HatchEntity(
      entity.boundary.map((point) => offsetPoint(point, vector)),
      {
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
        gripIndices: entity.gripIndices,
        curveGroups: entity.curveGroups,
        loops: (entity.loops || [entity.boundary]).map((loop) =>
          loop.map((point) => offsetPoint(point, vector))),
      },
    );
  }

  if (entity.type === 'DIMENSION') {
    return new DimensionEntity(
      entity.kind,
      entity.points.map((point) => offsetPoint(point, vector)),
      offsetPoint(entity.placement, vector),
      {
        layer: entity.layer,
        lineColor: entity.lineColor,
        dimensionStyle: entity.dimensionStyle,
        textPosition: entity.textPosition ? offsetPoint(entity.textPosition, vector) : null,
      },
    );
  }

  if (entity.type === 'INSERT') {
    return new BlockReferenceEntity(
      options.definition || entity.definition,
      offsetPoint(entity.insertionPoint, vector),
      {
        blockName: entity.blockName,
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
        rotation: entity.rotation,
        scaleX: entity.scaleX,
        scaleY: entity.scaleY,
      },
    );
  }

  return null;
}

function cloneEntity(entity, options = {}) {
  return cloneEntityWithOffset(entity, { x: 0, y: 0 }, options);
}

function cloneEntitiesWithOffset(entities, vector, options = {}) {
  const groupMap = new Map();
  return entities
    .map((entity) => {
      let groupId = entity.groupId || null;
      if (options.remapGroups && groupId) {
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, createEntityGroupId('polyline'));
        }
        groupId = groupMap.get(groupId);
      }
      return cloneEntityWithOffset(entity, vector, { groupId });
    })
    .filter(Boolean);
}

function moveEntityByVector(entity, vector) {
  if (entity.type === 'LINE') {
    entity.start = offsetPoint(entity.start, vector);
    entity.end = offsetPoint(entity.end, vector);
    return true;
  }

  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = offsetPoint(entity.center, vector);
    return true;
  }

  if (entity.type === 'TEXT') {
    entity.insertionPoint = offsetPoint(entity.insertionPoint, vector);
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) =>
      loop.map((point) => offsetPoint(point, vector)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => offsetPoint(point, vector));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = offsetPoint(segment.center, vector);
      }
    });
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => offsetPoint(point, vector));
    entity.placement = offsetPoint(entity.placement, vector);
    if (entity.textPosition) {
      entity.textPosition = offsetPoint(entity.textPosition, vector);
    }
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = offsetPoint(entity.insertionPoint, vector);
    return true;
  }

  return false;
}

function rotatePointAround(point, basePoint, angleDegrees) {
  const angle = -angleDegrees * Math.PI / 180;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const deltaX = point.x - basePoint.x;
  const deltaY = point.y - basePoint.y;
  return {
    x: basePoint.x + deltaX * cosine - deltaY * sine,
    y: basePoint.y + deltaX * sine + deltaY * cosine,
  };
}

function rotateEntityByAngle(entity, basePoint, angleDegrees) {
  if (entity.type === 'LINE') {
    entity.start = rotatePointAround(entity.start, basePoint, angleDegrees);
    entity.end = rotatePointAround(entity.end, basePoint, angleDegrees);
    return true;
  }

  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = rotatePointAround(entity.center, basePoint, angleDegrees);
    if (entity.type === 'ARC') {
      const canvasAngle = -angleDegrees * Math.PI / 180;
      entity.startAngle = normalizeAngle(entity.startAngle + canvasAngle);
      entity.endAngle = normalizeAngle(entity.endAngle + canvasAngle);
    }
    return true;
  }

  if (entity.type === 'TEXT') {
    entity.insertionPoint = rotatePointAround(entity.insertionPoint, basePoint, angleDegrees);
    entity.angle += angleDegrees;
    return true;
  }
  if (entity.type === 'HATCH') {
    entity.loops = (entity.loops || [entity.boundary]).map((loop) => loop.map((point) =>
      rotatePointAround(point, basePoint, angleDegrees)));
    entity.boundary = entity.loops[0];
    return true;
  }
  if (entity.type === 'POLYLINE') {
    entity.vertices = entity.vertices.map((point) => rotatePointAround(point, basePoint, angleDegrees));
    entity.segments.forEach((segment) => {
      if (segment.center) {
        segment.center = rotatePointAround(segment.center, basePoint, angleDegrees);
      }
    });
    return true;
  }
  if (entity.type === 'DIMENSION') {
    entity.points = entity.points.map((point) => rotatePointAround(point, basePoint, angleDegrees));
    entity.placement = rotatePointAround(entity.placement, basePoint, angleDegrees);
    if (entity.textPosition) {
      entity.textPosition = rotatePointAround(entity.textPosition, basePoint, angleDegrees);
    }
    if (entity.kind === 'horizontal' || entity.kind === 'vertical') {
      entity.kind = 'aligned';
    }
    return true;
  }
  if (entity.type === 'INSERT') {
    entity.insertionPoint = rotatePointAround(entity.insertionPoint, basePoint, angleDegrees);
    entity.rotation += angleDegrees;
    return true;
  }

  return false;
}

function rotationAngleFromPoint(basePoint, point, orthoEnabled = false) {
  if (!basePoint || !point || distance(basePoint, point) <= SNAP_THRESHOLD) {
    return 0;
  }
  const angle = -Math.atan2(point.y - basePoint.y, point.x - basePoint.x) * 180 / Math.PI;
  return orthoEnabled ? Math.round(angle / 90) * 90 : angle;
}

class CadDocument {
  constructor() {
    this.entities = [];
    this.rootEntities = null;
    this.editingBlockName = null;
    this.editHistoryFloor = null;
    this.blockDefinitions = new Map();
    this.selectedEntity = null;
    this.selectedEntities = new Set();
    this.cachedBounds = null;
    this.boundsDirty = true;
    this.spatialDirty = true;
    this.spatialCells = new Map();
    this.spatialOverflow = new Set();
    this.spatialBounds = new Map();
    this.spatialOrder = new Map();
    this.undoStack = [];
    this.redoStack = [];
  }

  markDirty() {
    if (this.editingBlockName) {
      const definition = this.blockDefinitions.get(this.editingBlockName.toLowerCase());
      if (definition) {
        definition.entities = this.entities;
        definition.revision = (definition.revision || 0) + 1;
      }
    }
    this.boundsDirty = true;
    this.spatialDirty = true;
  }

  isEditingBlock() {
    return Boolean(this.editingBlockName && this.rootEntities);
  }

  topLevelEntities() {
    return this.isEditingBlock() ? this.rootEntities : this.entities;
  }

  beginBlockEdit(definition) {
    if (!definition || this.isEditingBlock()) {
      return false;
    }
    this.rootEntities = this.entities;
    this.editingBlockName = definition.name;
    this.editHistoryFloor = this.undoStack.length;
    this.entities = definition.entities;
    this.clearSelection();
    this.boundsDirty = true;
    this.spatialDirty = true;
    return true;
  }

  endBlockEdit() {
    if (!this.isEditingBlock()) {
      return false;
    }
    const definition = this.blockDefinitions.get(this.editingBlockName.toLowerCase());
    if (definition) {
      definition.entities = this.entities;
    }
    this.entities = this.rootEntities;
    this.rootEntities = null;
    this.editingBlockName = null;
    this.editHistoryFloor = null;
    this.clearSelection();
    this.markDirty();
    return true;
  }

  snapshot() {
    const definitions = [...this.blockDefinitions.values()].map((definition) => ({
      name: definition.name,
      revision: definition.revision || 0,
      entities: [],
    }));
    const definitionMap = new Map(definitions.map((definition) => [definition.name.toLowerCase(), definition]));
    [...this.blockDefinitions.values()].forEach((definition) => {
      const target = definitionMap.get(definition.name.toLowerCase());
      target.entities = definition.entities.map((entity) => cloneEntity(entity, {
        definition: entity.type === 'INSERT'
          ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
          : undefined,
      })).filter(Boolean);
    });
    return {
      entities: this.topLevelEntities().map((entity) => cloneEntity(entity, {
        definition: entity.type === 'INSERT'
          ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
          : undefined,
      })).filter(Boolean),
      blockDefinitions: definitions,
    };
  }

  restoreSnapshot(snapshot) {
    const snapshotEntities = Array.isArray(snapshot) ? snapshot : snapshot.entities || [];
    const snapshotDefinitions = Array.isArray(snapshot) ? [] : snapshot.blockDefinitions || [];
    const activeBlockName = this.editingBlockName;
    const definitionMap = new Map(snapshotDefinitions.map((definition) => [
      definition.name.toLowerCase(),
      { name: definition.name, revision: definition.revision || 0, entities: [] },
    ]));
    snapshotDefinitions.forEach((definition) => {
      const target = definitionMap.get(definition.name.toLowerCase());
      target.entities = definition.entities.map((entity) => cloneEntity(entity, {
        definition: entity.type === 'INSERT'
          ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
          : undefined,
      })).filter(Boolean);
    });
    this.blockDefinitions = definitionMap;
    const restoredRootEntities = snapshotEntities.map((entity) => cloneEntity(entity, {
      definition: entity.type === 'INSERT'
        ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
        : undefined,
    })).filter(Boolean);
    if (activeBlockName && definitionMap.has(activeBlockName.toLowerCase())) {
      this.rootEntities = restoredRootEntities;
      this.editingBlockName = activeBlockName;
      this.entities = definitionMap.get(activeBlockName.toLowerCase()).entities;
    }
    else {
      this.rootEntities = null;
      this.editingBlockName = null;
      this.entities = restoredRootEntities;
    }
    this.clearSelection();
    this.markDirty();
  }

  recordHistory() {
    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > HISTORY_LIMIT) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  canUndo() {
    return this.undoStack.length > (this.isEditingBlock() ? this.editHistoryFloor || 0 : 0);
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  undo() {
    if (!this.canUndo()) {
      return false;
    }

    this.redoStack.push(this.snapshot());
    this.restoreSnapshot(this.undoStack.pop());
    return true;
  }

  redo() {
    if (!this.canRedo()) {
      return false;
    }

    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > HISTORY_LIMIT) {
      this.undoStack.shift();
    }
    this.restoreSnapshot(this.redoStack.pop());
    return true;
  }

  clear(options = {}) {
    if (options.recordHistory !== false && this.entities.length) {
      this.recordHistory();
    }
    this.entities = [];
    this.rootEntities = null;
    this.editingBlockName = null;
    this.editHistoryFloor = null;
    this.blockDefinitions = new Map();
    this.clearSelection();
    this.markDirty();
  }

  addEntity(entity, options = {}) {
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.push(entity);
    this.markDirty();
  }

  addEntities(entities, options = {}) {
    const validEntities = entities.filter(Boolean);
    if (!validEntities.length) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.push(...validEntities);
    this.markDirty();
    return true;
  }

  replaceEntity(entity, replacements, options = {}) {
    const index = this.entities.indexOf(entity);
    if (index < 0) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.splice(index, 1, ...replacements);
    if (this.selectedEntities.has(entity)) {
      this.selectedEntities.delete(entity);
      replacements.forEach((replacement) => this.selectedEntities.add(replacement));
      this.selectedEntity = replacements[0] || null;
    }
    this.markDirty();
    return true;
  }

  replaceEntities(entities, replacements, options = {}) {
    const replaceSet = new Set(entities.filter((entity) => this.entities.includes(entity)));
    if (!replaceSet.size) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }

    const firstIndex = this.entities.findIndex((entity) => replaceSet.has(entity));
    const wasSelected = [...replaceSet].some((entity) => this.selectedEntities.has(entity));
    this.entities = this.entities.filter((entity) => !replaceSet.has(entity));
    this.entities.splice(firstIndex, 0, ...replacements);
    replaceSet.forEach((entity) => this.selectedEntities.delete(entity));
    if (wasSelected) {
      replacements.forEach((replacement) => this.selectedEntities.add(replacement));
    }
    this.selectedEntity = [...this.selectedEntities][0] || null;
    this.markDirty();
    return true;
  }

  removeEntity(entity, options = {}) {
    return this.replaceEntity(entity, [], options);
  }

  removeEntities(entities, options = {}) {
    const removeSet = new Set(this.expandEntityGroups(entities).filter(Boolean));
    if (!removeSet.size) {
      return 0;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    const beforeCount = this.entities.length;
    this.entities = this.entities.filter((entity) => !removeSet.has(entity));
    removeSet.forEach((entity) => this.selectedEntities.delete(entity));
    this.selectedEntity = [...this.selectedEntities][0] || null;
    this.markDirty();
    return beforeCount - this.entities.length;
  }

  setEntities(entities, options = {}) {
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.blockDefinitions = new Map((entities.blockDefinitions || []).map((definition) => [
      definition.name.toLowerCase(),
      definition,
    ]));
    this.rootEntities = null;
    this.editingBlockName = null;
    this.editHistoryFloor = null;
    this.entities = [...entities];
    this.clearSelection();
    this.markDirty();
  }

  bounds() {
    if (!this.boundsDirty) {
      return this.cachedBounds ? { ...this.cachedBounds } : null;
    }

    let bounds = null;
    for (const entity of this.entities) {
      bounds = mergeBounds(bounds, entity.bounds());
    }
    this.cachedBounds = bounds ? { ...bounds } : null;
    this.boundsDirty = false;
    return this.cachedBounds ? { ...this.cachedBounds } : null;
  }

  spatialCellRange(bounds) {
    return {
      minX: Math.floor(bounds.minX / SPATIAL_CELL_SIZE),
      minY: Math.floor(bounds.minY / SPATIAL_CELL_SIZE),
      maxX: Math.floor(bounds.maxX / SPATIAL_CELL_SIZE),
      maxY: Math.floor(bounds.maxY / SPATIAL_CELL_SIZE),
    };
  }

  spatialCellKey(x, y) {
    return `${x}:${y}`;
  }

  rebuildSpatialIndex() {
    this.spatialCells = new Map();
    this.spatialOverflow = new Set();
    this.spatialBounds = new Map();
    this.spatialOrder = new Map();

    this.entities.forEach((entity, index) => {
      const bounds = entity.bounds();
      const range = this.spatialCellRange(bounds);
      const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
      this.spatialBounds.set(entity, bounds);
      this.spatialOrder.set(entity, index);

      if (cellCount > SPATIAL_MAX_ENTITY_CELLS) {
        this.spatialOverflow.add(entity);
        return;
      }

      for (let x = range.minX; x <= range.maxX; x += 1) {
        for (let y = range.minY; y <= range.maxY; y += 1) {
          const key = this.spatialCellKey(x, y);
          if (!this.spatialCells.has(key)) {
            this.spatialCells.set(key, new Set());
          }
          this.spatialCells.get(key).add(entity);
        }
      }
    });

    this.spatialDirty = false;
  }

  queryBounds(bounds) {
    if (!bounds) {
      return [];
    }
    if (this.spatialDirty) {
      this.rebuildSpatialIndex();
    }

    const range = this.spatialCellRange(bounds);
    const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
    if (cellCount > SPATIAL_MAX_QUERY_CELLS) {
      return this.entities.filter((entity) => boundsIntersectsBounds(this.spatialBounds.get(entity), bounds));
    }

    const matches = new Set();
    for (let x = range.minX; x <= range.maxX; x += 1) {
      for (let y = range.minY; y <= range.maxY; y += 1) {
        const cell = this.spatialCells.get(this.spatialCellKey(x, y));
        if (!cell) {
          continue;
        }
        cell.forEach((entity) => {
          if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
            matches.add(entity);
          }
        });
      }
    }

    this.spatialOverflow.forEach((entity) => {
      if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
        matches.add(entity);
      }
    });

    return [...matches].sort((first, second) =>
      (this.spatialOrder.get(first) || 0) - (this.spatialOrder.get(second) || 0),
    );
  }

  groupEntities(entity) {
    if (!entity?.groupId) {
      return entity ? [entity] : [];
    }
    return this.entities.filter((candidate) => candidate.groupId === entity.groupId);
  }

  expandEntityGroups(entities) {
    const expanded = new Set();
    entities.forEach((entity) => {
      this.groupEntities(entity).forEach((groupEntity) => expanded.add(groupEntity));
    });
    return [...expanded];
  }

  selectEntity(entity) {
    this.selectedEntities.clear();
    this.expandEntityGroups([entity]).forEach((selectedEntity) => {
      this.selectedEntities.add(selectedEntity);
    });
    this.selectedEntity = [...this.selectedEntities][0] || null;
  }

  selectEntities(entities) {
    const expandedEntities = this.expandEntityGroups(entities);
    this.selectedEntities = new Set(expandedEntities);
    this.selectedEntity = expandedEntities[0] || null;
  }

  addSelectedEntities(entities) {
    this.expandEntityGroups(entities).forEach((entity) => {
      if (entity) {
        this.selectedEntities.add(entity);
      }
    });
    this.selectedEntity = [...this.selectedEntities][0] || null;
  }

  clearSelection() {
    this.selectedEntities.clear();
    this.selectedEntity = null;
  }

  isSelected(entity) {
    return this.selectedEntities.has(entity);
  }
}

function dotProduct(first, second) {
  return first.x * second.x + first.y * second.y;
}

function filletRayDirection(line, intersection, pickPoint) {
  const projectedPick = closestPointOnLineSegment(line, pickPoint);
  let direction = normalizedVector(intersection, projectedPick);
  if (direction) {
    return direction;
  }
  const preferredEndpoint = distance(pickPoint, line.start) <= distance(pickPoint, line.end)
    ? line.start
    : line.end;
  direction = normalizedVector(intersection, preferredEndpoint);
  return direction || normalizedVector(line.start, line.end);
}

function lineFilletGeometry(firstLine, firstPick, secondLine, secondPick, radius) {
  if (
    firstLine?.type !== 'LINE' || secondLine?.type !== 'LINE' ||
    firstLine === secondLine || !(radius > SNAP_THRESHOLD)
  ) {
    return { valid: false, reason: 'Seleccione dos lineas distintas' };
  }
  const firstDirection = normalizedVector(firstLine.start, firstLine.end);
  const secondDirection = normalizedVector(secondLine.start, secondLine.end);
  if (!firstDirection || !secondDirection) {
    return { valid: false, reason: 'Una de las lineas no tiene longitud' };
  }
  const intersection = infiniteLineLineIntersection(
    firstLine.start,
    firstDirection,
    secondLine.start,
    secondDirection,
  );
  if (!intersection) {
    return { valid: false, reason: 'Las lineas son paralelas' };
  }

  const firstRay = filletRayDirection(firstLine, intersection, firstPick);
  const secondRay = filletRayDirection(secondLine, intersection, secondPick);
  if (!firstRay || !secondRay) {
    return { valid: false, reason: 'No se pudo determinar el lado del empalme' };
  }
  const angle = Math.acos(clamp(dotProduct(firstRay, secondRay), -1, 1));
  const halfAngle = angle * 0.5;
  if (halfAngle <= SNAP_THRESHOLD || Math.PI * 0.5 - halfAngle <= SNAP_THRESHOLD) {
    return { valid: false, reason: 'Las lineas no forman un angulo valido' };
  }

  const tangentDistance = radius / Math.tan(halfAngle);
  const centerDistance = radius / Math.sin(halfAngle);
  const bisector = normalizedVector(
    { x: 0, y: 0 },
    { x: firstRay.x + secondRay.x, y: firstRay.y + secondRay.y },
  );
  if (!bisector || !Number.isFinite(tangentDistance) || !Number.isFinite(centerDistance)) {
    return { valid: false, reason: 'No se pudo calcular el empalme' };
  }

  const firstScores = [
    dotProduct({ x: firstLine.start.x - intersection.x, y: firstLine.start.y - intersection.y }, firstRay),
    dotProduct({ x: firstLine.end.x - intersection.x, y: firstLine.end.y - intersection.y }, firstRay),
  ];
  const secondScores = [
    dotProduct({ x: secondLine.start.x - intersection.x, y: secondLine.start.y - intersection.y }, secondRay),
    dotProduct({ x: secondLine.end.x - intersection.x, y: secondLine.end.y - intersection.y }, secondRay),
  ];
  if (
    tangentDistance >= Math.max(...firstScores) - SNAP_THRESHOLD ||
    tangentDistance >= Math.max(...secondScores) - SNAP_THRESHOLD
  ) {
    return { valid: false, reason: 'El radio es demasiado grande para esas lineas' };
  }

  const firstTangent = {
    x: intersection.x + firstRay.x * tangentDistance,
    y: intersection.y + firstRay.y * tangentDistance,
  };
  const secondTangent = {
    x: intersection.x + secondRay.x * tangentDistance,
    y: intersection.y + secondRay.y * tangentDistance,
  };
  const center = {
    x: intersection.x + bisector.x * centerDistance,
    y: intersection.y + bisector.y * centerDistance,
  };
  const startAngle = angleOfPoint(center, firstTangent);
  const endAngle = angleOfPoint(center, secondTangent);
  const clockwise = normalizeAngle(endAngle - startAngle) <= Math.PI;
  return {
    valid: true,
    center,
    radius,
    startAngle,
    endAngle,
    clockwise,
    firstTangent,
    secondTangent,
    firstEndpoint: firstScores[0] <= firstScores[1] ? 'start' : 'end',
    secondEndpoint: secondScores[0] <= secondScores[1] ? 'start' : 'end',
  };
}

function applyLineFillet(doc, firstLine, firstPick, secondLine, secondPick, radius) {
  const geometry = lineFilletGeometry(firstLine, firstPick, secondLine, secondPick, radius);
  if (!geometry.valid) {
    return geometry;
  }
  doc.recordHistory();
  firstLine[geometry.firstEndpoint] = { ...geometry.firstTangent };
  secondLine[geometry.secondEndpoint] = { ...geometry.secondTangent };
  const arc = new ArcEntity(
    geometry.center,
    geometry.radius,
    geometry.startAngle,
    geometry.endAngle,
    {
      clockwise: geometry.clockwise,
      layer: firstLine.layer,
      lineStyle: firstLine.lineStyle,
      lineType: firstLine.lineType,
      lineColor: firstLine.lineColor,
    },
  );
  doc.addEntity(arc, { recordHistory: false });
  doc.clearSelection();
  doc.markDirty();
  return { ...geometry, arc };
}

function trimLineEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !entity || entity.type !== 'LINE') {
    return { trimmed: false, keptCount: 0 };
  }

  const breakParameters = [0, 1];
  for (const otherEntity of doc.queryBounds(entity.bounds())) {
    if (otherEntity === entity) {
      continue;
    }

    for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
      const parameter = lineParameter(entity, intersection);
      if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
        breakParameters.push(parameter);
      }
    }
  }

  const sortedParameters = uniqueSortedParameters(breakParameters);
  if (sortedParameters.length < 2) {
    return { trimmed: false, keptCount: 0 };
  }

  const projectedPick = closestPointOnLineSegment(entity, pickPoint);
  const pickParameter = lineParameter(entity, projectedPick);
  let trimIndex = 0;
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (pickParameter >= sortedParameters[index] - SNAP_THRESHOLD &&
        pickParameter <= sortedParameters[index + 1] + SNAP_THRESHOLD) {
      trimIndex = index;
      break;
    }
  }

  const replacements = [];
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (index === trimIndex) {
      continue;
    }

    const startParameter = sortedParameters[index];
    const endParameter = sortedParameters[index + 1];
    if (endParameter - startParameter <= SNAP_THRESHOLD) {
      continue;
    }

    replacements.push(new LineEntity(
      pointAtLineParameter(entity, startParameter),
      pointAtLineParameter(entity, endParameter),
      { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor },
    ));
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return { trimmed: replaced, keptCount: replacements.length };
}

function createArcFromParameters(entity, startParameter, endParameter) {
  if (entity.type === 'CIRCLE') {
    const startAngle = startParameter * TWO_PI;
    const endAngle = endParameter * TWO_PI;
    if (arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
      return null;
    }
    return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, {
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
      layer: entity.layer,
    });
  }

  const sweep = entityArcSweep(entity);
  const direction = entity.clockwise === false ? -1 : 1;
  const startAngle = entity.startAngle + direction * sweep * startParameter;
  const endAngle = entity.startAngle + direction * sweep * endParameter;
  if (directedArcSweep(startAngle, endAngle, entity.clockwise !== false) <= SNAP_THRESHOLD) {
    return null;
  }
  return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, {
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
    layer: entity.layer,
    clockwise: entity.clockwise !== false,
  });
}

function trimCircularEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !isCircularEntity(entity)) {
    return { trimmed: false, keptCount: 0 };
  }

  if (entity.type === 'CIRCLE') {
    const breakParameters = [];
    for (const otherEntity of doc.queryBounds(entity.bounds())) {
      if (otherEntity === entity) {
        continue;
      }

      for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
        breakParameters.push(circularParameter(entity, intersection));
      }
    }

    const sortedParameters = uniqueSortedParameters(breakParameters);
    if (sortedParameters.length < 2) {
      const removed = doc.removeEntity(entity);
      return { trimmed: removed, keptCount: 0 };
    }

    const pickParameter = circularParameter(entity, pickPoint);
    const intervals = sortedParameters.map((startParameter, index) => {
      const endParameter = sortedParameters[(index + 1) % sortedParameters.length];
      return {
        startParameter,
        endParameter,
        wraps: index === sortedParameters.length - 1,
      };
    });

    const trimIndex = intervals.findIndex((interval) => interval.wraps
      ? pickParameter >= interval.startParameter - SNAP_THRESHOLD ||
        pickParameter <= interval.endParameter + SNAP_THRESHOLD
      : pickParameter >= interval.startParameter - SNAP_THRESHOLD &&
        pickParameter <= interval.endParameter + SNAP_THRESHOLD);

    const replacements = [];
    intervals.forEach((interval, index) => {
      if (index === trimIndex) {
        return;
      }
      const arc = createArcFromParameters(entity, interval.startParameter, interval.endParameter);
      if (arc) {
        replacements.push(arc);
      }
    });

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length };
  }

  const breakParameters = [0, 1];
  for (const otherEntity of doc.queryBounds(entity.bounds())) {
    if (otherEntity === entity) {
      continue;
    }

    for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
      const parameter = circularParameter(entity, intersection);
      if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
        breakParameters.push(parameter);
      }
    }
  }

  const sortedParameters = uniqueSortedParameters(breakParameters);
  const pickParameter = circularParameter(entity, pickPoint);
  let trimIndex = 0;
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (pickParameter >= sortedParameters[index] - SNAP_THRESHOLD &&
        pickParameter <= sortedParameters[index + 1] + SNAP_THRESHOLD) {
      trimIndex = index;
      break;
    }
  }

  const replacements = [];
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (index === trimIndex) {
      continue;
    }

    const startParameter = sortedParameters[index];
    const endParameter = sortedParameters[index + 1];
    if (endParameter - startParameter <= SNAP_THRESHOLD) {
      continue;
    }

    const arc = createArcFromParameters(entity, startParameter, endParameter);
    if (arc) {
      replacements.push(arc);
    }
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return { trimmed: replaced, keptCount: replacements.length };
}

function polylineSegmentSlice(entity, segmentIndex, startParameter, endParameter) {
  const geometry = polylineSegmentEntity(entity, segmentIndex);
  const source = entity.segments[segmentIndex];
  if (!geometry || !source || endParameter - startParameter <= SNAP_THRESHOLD) {
    return null;
  }
  const start = geometry.type === 'LINE'
    ? pointAtLineParameter(geometry, startParameter)
    : pointAtCircularParameter(geometry, startParameter);
  const end = geometry.type === 'LINE'
    ? pointAtLineParameter(geometry, endParameter)
    : pointAtCircularParameter(geometry, endParameter);
  const widthAt = (parameter) =>
    source.startWidth + (source.endWidth - source.startWidth) * parameter;
  return {
    start,
    end,
    segment: {
      type: source.type,
      center: source.center ? { ...source.center } : null,
      clockwise: source.clockwise !== false,
      startWidth: widthAt(startParameter),
      endWidth: widthAt(endParameter),
    },
  };
}

function polylineFromSlices(source, slices) {
  const validSlices = slices.filter(Boolean);
  if (!validSlices.length) {
    return null;
  }
  return new PolylineEntity(
    [validSlices[0].start, ...validSlices.map((slice) => slice.end)],
    validSlices.map((slice) => slice.segment),
    {
      closed: false,
      layer: source.layer,
      lineStyle: source.lineStyle,
      lineType: source.lineType,
      lineColor: source.lineColor,
    },
  );
}

function removePolylineSegmentAtIndex(doc, entity, segmentIndex) {
  if (!doc || entity?.type !== 'POLYLINE' || !entity.segments[segmentIndex]) {
    return { trimmed: false, keptCount: 0, grouped: true, polylineSegment: true };
  }

  const segmentSlices = (indices) => indices
    .map((index) => polylineSegmentSlice(entity, index, 0, 1))
    .filter(Boolean);
  const replacements = [];
  if (entity.closed) {
    const remainingIndices = Array.from(
      { length: entity.segments.length - 1 },
      (_, offset) => (segmentIndex + 1 + offset) % entity.segments.length,
    );
    const openedPolyline = polylineFromSlices(entity, segmentSlices(remainingIndices));
    if (openedPolyline) {
      replacements.push(openedPolyline);
    }
  }
  else {
    const beforeIndices = Array.from({ length: segmentIndex }, (_, index) => index);
    const afterIndices = Array.from(
      { length: entity.segments.length - segmentIndex - 1 },
      (_, offset) => segmentIndex + 1 + offset,
    );
    [beforeIndices, afterIndices].forEach((indices) => {
      const remainder = polylineFromSlices(entity, segmentSlices(indices));
      if (remainder) {
        replacements.push(remainder);
      }
    });
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return {
    trimmed: replaced,
    keptCount: replacements.length,
    grouped: true,
    polylineSegment: true,
    remainingSegments: Math.max(0, entity.segments.length - 1),
  };
}

function polylinePath(entity) {
  if (entity?.type !== 'POLYLINE') {
    return null;
  }
  const components = [];
  let totalLength = 0;
  entity.segments.forEach((_, index) => {
    const geometry = polylineSegmentEntity(entity, index);
    const length = geometry?.length() || 0;
    if (!geometry || length <= SNAP_THRESHOLD) {
      return;
    }
    components.push({ index, geometry, length, offset: totalLength });
    totalLength += length;
  });
  return totalLength > SNAP_THRESHOLD
    ? { components, totalLength, closed: entity.closed }
    : null;
}

function polylineRangeSlices(entity, path, startDistance, endDistance) {
  const slices = [];
  if (!path || endDistance - startDistance <= SNAP_THRESHOLD) {
    return slices;
  }
  const firstCycle = Math.floor(startDistance / path.totalLength);
  const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);
  for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
    const cycleOffset = cycle * path.totalLength;
    for (const component of path.components) {
      const componentStart = cycleOffset + component.offset;
      const componentEnd = componentStart + component.length;
      const overlapStart = Math.max(startDistance, componentStart);
      const overlapEnd = Math.min(endDistance, componentEnd);
      if (overlapEnd - overlapStart <= SNAP_THRESHOLD) {
        continue;
      }
      slices.push(polylineSegmentSlice(
        entity,
        component.index,
        (overlapStart - componentStart) / component.length,
        (overlapEnd - componentStart) / component.length,
      ));
    }
  }
  return slices.filter(Boolean);
}

function trimPolylineEntityAtPoint(doc, entity, pickPoint) {
  const path = polylinePath(entity);
  if (!doc || !path || !pickPoint) {
    return { trimmed: false, keptCount: 0, grouped: true };
  }

  const breakDistances = [];
  let pickDistance = 0;
  let pickedSegmentIndex = 0;
  let nearestPickDistance = Infinity;
  for (const component of path.components) {
    let componentPickParameter = component.geometry.type === 'LINE'
      ? lineParameter(component.geometry, pickPoint)
      : circularParameter(component.geometry, pickPoint);
    if (component.geometry.type === 'ARC' &&
        !angleOnArc(angleOfPoint(component.geometry.center, pickPoint), component.geometry)) {
      componentPickParameter = distance(
        pickPoint,
        pointAtCircularParameter(component.geometry, 0),
      ) <= distance(
        pickPoint,
        pointAtCircularParameter(component.geometry, 1),
      ) ? 0 : 1;
    }
    const projectedPick = component.geometry.type === 'LINE'
      ? pointAtLineParameter(component.geometry, componentPickParameter)
      : pointAtCircularParameter(component.geometry, componentPickParameter);
    const candidateDistance = distance(projectedPick, pickPoint);
    if (candidateDistance < nearestPickDistance) {
      nearestPickDistance = candidateDistance;
      pickDistance = component.offset + component.length * componentPickParameter;
      pickedSegmentIndex = component.index;
    }

    for (const otherEntity of doc.queryBounds(component.geometry.bounds())) {
      if (otherEntity === entity || otherEntity.type === 'HATCH' || otherEntity.type === 'TEXT') {
        continue;
      }
      for (const intersection of entityIntersectionPoints(component.geometry, otherEntity)) {
        const parameter = component.geometry.type === 'LINE'
          ? lineParameter(component.geometry, intersection)
          : circularParameter(component.geometry, intersection);
        let pathDistance = component.offset + component.length * parameter;
        if (path.closed && path.totalLength - pathDistance <= SNAP_THRESHOLD) {
          pathDistance = 0;
        }
        breakDistances.push(pathDistance);
      }
    }
  }

  const sortedBreaks = breakDistances
    .sort((first, second) => first - second)
    .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
  if ((path.closed && sortedBreaks.length < 2) || (!path.closed && !sortedBreaks.length)) {
    return removePolylineSegmentAtIndex(doc, entity, pickedSegmentIndex);
  }

  let trimStart = null;
  let trimEnd = null;
  if (path.closed) {
    for (let index = 0; index < sortedBreaks.length; index += 1) {
      const start = sortedBreaks[index];
      const next = sortedBreaks[(index + 1) % sortedBreaks.length];
      const end = index === sortedBreaks.length - 1 ? next + path.totalLength : next;
      const adjustedPick = pickDistance < start - SNAP_THRESHOLD
        ? pickDistance + path.totalLength
        : pickDistance;
      if (adjustedPick >= start - SNAP_THRESHOLD && adjustedPick <= end + SNAP_THRESHOLD) {
        trimStart = start;
        trimEnd = end;
        break;
      }
    }
  }
  else {
    const openBreaks = [0, ...sortedBreaks, path.totalLength]
      .sort((first, second) => first - second)
      .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
    for (let index = 0; index < openBreaks.length - 1; index += 1) {
      if (pickDistance >= openBreaks[index] - SNAP_THRESHOLD &&
          pickDistance <= openBreaks[index + 1] + SNAP_THRESHOLD) {
        trimStart = openBreaks[index];
        trimEnd = openBreaks[index + 1];
        break;
      }
    }
  }
  if (trimStart === null || trimEnd === null) {
    return removePolylineSegmentAtIndex(doc, entity, pickedSegmentIndex);
  }

  const replacements = [];
  if (path.closed) {
    const keepStart = trimEnd % path.totalLength;
    let keepEnd = trimStart;
    if (keepEnd <= keepStart + SNAP_THRESHOLD) {
      keepEnd += path.totalLength;
    }
    const replacement = polylineFromSlices(
      entity,
      polylineRangeSlices(entity, path, keepStart, keepEnd),
    );
    if (replacement) {
      replacements.push(replacement);
    }
  }
  else {
    [
      polylineFromSlices(entity, polylineRangeSlices(entity, path, 0, trimStart)),
      polylineFromSlices(entity, polylineRangeSlices(entity, path, trimEnd, path.totalLength)),
    ].filter(Boolean).forEach((replacement) => replacements.push(replacement));
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return { trimmed: replaced, keptCount: replacements.length, grouped: true };
}

function orderedLineGroup(groupEntities) {
  if (!groupEntities.length || groupEntities.some((entity) => entity.type !== 'LINE')) {
    return null;
  }

  const connectedAt = (point, entity) => {
    if (distance(point, entity.start) <= SNAP_THRESHOLD) {
      return { reversed: false, nextPoint: entity.end };
    }
    if (distance(point, entity.end) <= SNAP_THRESHOLD) {
      return { reversed: true, nextPoint: entity.start };
    }
    return null;
  };
  const endpointDegree = (point) => groupEntities.reduce((count, candidate) =>
    count + (distance(point, candidate.start) <= SNAP_THRESHOLD ? 1 : 0) +
    (distance(point, candidate.end) <= SNAP_THRESHOLD ? 1 : 0), 0);

  let firstEntity = groupEntities[0];
  let firstReversed = false;
  for (const candidate of groupEntities) {
    if (endpointDegree(candidate.start) === 1) {
      firstEntity = candidate;
      break;
    }
    if (endpointDegree(candidate.end) === 1) {
      firstEntity = candidate;
      firstReversed = true;
      break;
    }
  }

  const ordered = [{ entity: firstEntity, reversed: firstReversed }];
  const remaining = new Set(groupEntities);
  remaining.delete(firstEntity);
  const firstPoint = firstReversed ? firstEntity.end : firstEntity.start;
  let currentPoint = firstReversed ? firstEntity.start : firstEntity.end;

  while (remaining.size) {
    let match = null;
    for (const candidate of remaining) {
      const connection = connectedAt(currentPoint, candidate);
      if (connection) {
        match = { entity: candidate, ...connection };
        break;
      }
    }
    if (!match) {
      return null;
    }
    ordered.push({ entity: match.entity, reversed: match.reversed });
    remaining.delete(match.entity);
    currentPoint = match.nextPoint;
  }

  let offset = 0;
  ordered.forEach((component) => {
    component.length = component.entity.length();
    component.offset = offset;
    offset += component.length;
  });
  return {
    components: ordered,
    totalLength: offset,
    closed: distance(currentPoint, firstPoint) <= SNAP_THRESHOLD,
  };
}

function lineGroupPointAt(component, traversalParameter) {
  const entityParameter = component.reversed ? 1 - traversalParameter : traversalParameter;
  return pointAtLineParameter(component.entity, entityParameter);
}

function closedLineGroupPolygon(doc, entity) {
  if (entity?.type === 'POLYLINE') {
    const geometricallyClosed = entity.closed || (
      entity.vertices.length >= 3 &&
      distance(entity.vertices[0], entity.vertices[entity.vertices.length - 1]) <= SNAP_THRESHOLD
    );
    if (!geometricallyClosed || entity.vertices.length < 3) {
      return null;
    }
    const polygon = [];
    const gripIndices = [];
    const curveGroups = [];
    entity.segments.forEach((segment, segmentIndex) => {
      const geometry = polylineSegmentEntity(entity, segmentIndex);
      if (!geometry) {
        return;
      }
      if (!polygon.length) {
        polygon.push({ ...entity.vertices[segmentIndex] });
      }
      gripIndices.push(polygon.length - 1);
      if (geometry.type === 'ARC') {
        const sweep = entityArcSweep(geometry);
        const steps = clamp(Math.ceil(sweep / (Math.PI / 32)), 4, 96);
        const indices = [polygon.length - 1];
        for (let step = 1; step <= steps; step += 1) {
          const closesBoundary = segmentIndex === entity.segments.length - 1 && step === steps;
          if (closesBoundary) {
            indices.push(0);
            continue;
          }
          const point = pointAtCircularParameter(geometry, step / steps);
          polygon.push(point);
          indices.push(polygon.length - 1);
        }
        curveGroups.push({ type: 'ARC', indices });
      }
      else if (segmentIndex < entity.segments.length - 1) {
        polygon.push({ ...entity.vertices[segmentIndex + 1] });
      }
    });
    polygon.gripIndices = [...new Set(gripIndices)];
    polygon.curveGroups = curveGroups;
    return polygon;
  }
  if (!entity?.groupId) {
    return null;
  }
  const path = orderedLineGroup(doc.groupEntities(entity));
  if (!path?.closed || path.components.length < 3) {
    return null;
  }
  return path.components.map((component) =>
    component.reversed ? { ...component.entity.end } : { ...component.entity.start });
}

function circlePolygon(circle, segments = 96) {
  const polygon = Array.from({ length: segments }, (_, index) =>
    pointAtCircleAngle(circle, index * TWO_PI / segments));
  polygon.gripIndices = [0, 0.25, 0.5, 0.75]
    .map((parameter) => Math.round(parameter * segments) % segments);
  polygon.curveGroups = [{
    type: 'CIRCLE',
    indices: polygon.map((_, index) => index),
  }];
  return polygon;
}

function curveGroupsFromFaceEdges(faceEdges) {
  const runs = [];
  faceEdges.forEach((edge, index) => {
    if (!isCircularEntity(edge.sourceEntity)) {
      return;
    }
    const previousRun = runs[runs.length - 1];
    if (previousRun?.sourceEntity === edge.sourceEntity &&
        previousRun.edgeIndices[previousRun.edgeIndices.length - 1] === index - 1) {
      previousRun.edgeIndices.push(index);
    }
    else {
      runs.push({ sourceEntity: edge.sourceEntity, edgeIndices: [index] });
    }
  });

  if (
    runs.length > 1 &&
    runs[0].edgeIndices[0] === 0 &&
    runs[runs.length - 1].edgeIndices[runs[runs.length - 1].edgeIndices.length - 1] === faceEdges.length - 1 &&
    runs[0].sourceEntity === runs[runs.length - 1].sourceEntity
  ) {
    const firstRun = runs.shift();
    const lastRun = runs.pop();
    runs.unshift({
      sourceEntity: firstRun.sourceEntity,
      edgeIndices: [...lastRun.edgeIndices, ...firstRun.edgeIndices],
    });
  }

  return runs.map((run) => ({
    type: run.sourceEntity.type,
    indices: [
      ...run.edgeIndices,
      (run.edgeIndices[run.edgeIndices.length - 1] + 1) % faceEdges.length,
    ],
  }));
}

function curveArrangementFaces(doc) {
  const entities = doc.entities.flatMap((entity) => {
    if (entity.type === 'POLYLINE') {
      return polylineSegmentEntities(entity);
    }
    return entity.type === 'LINE' || entity.type === 'ARC' || entity.type === 'CIRCLE'
      ? [entity]
      : [];
  });
  if (!entities.length || entities.length > 1200) {
    return [];
  }

  const parameters = new Map(entities.map((entity) => [
    entity,
    entity.type === 'ARC'
      ? [0, 0.5, 1]
      : entity.type === 'CIRCLE'
        ? [0, 0.25, 0.5, 0.75, 1]
        : [0, 1],
  ]));
  const entityBounds = entities.map((entity) => entity.bounds());
  entities.forEach((entity, entityIndex) => {
    for (let otherIndex = entityIndex + 1; otherIndex < entities.length; otherIndex += 1) {
      if (!boundsIntersectsBounds(entityBounds[entityIndex], entityBounds[otherIndex])) {
        continue;
      }
      const other = entities[otherIndex];
      for (const intersection of entityIntersectionPoints(entity, other)) {
        parameters.get(entity).push(entity.type === 'LINE'
          ? lineParameter(entity, intersection)
          : circularParameter(entity, intersection));
        parameters.get(other).push(other.type === 'LINE'
          ? lineParameter(other, intersection)
          : circularParameter(other, intersection));
      }
    }
  });

  const nodeBuckets = new Map();
  const graphNodes = [];
  const edgeKeys = new Set();
  let nextNodeId = 1;
  const nodeForPoint = (point, logicalGrip = false) => {
    const cellX = Math.floor(point.x / SNAP_THRESHOLD);
    const cellY = Math.floor(point.y / SNAP_THRESHOLD);
    for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        const nearby = nodeBuckets.get(`${cellX + offsetX}:${cellY + offsetY}`) || [];
        const node = nearby.find((candidate) => distance(candidate.point, point) <= SNAP_THRESHOLD);
        if (node) {
          node.logicalGrip = node.logicalGrip || logicalGrip;
          return node;
        }
      }
    }

    const node = {
      id: nextNodeId,
      point: { ...point },
      outgoing: [],
      logicalGrip,
    };
    const key = `${cellX}:${cellY}`;
    const bucket = nodeBuckets.get(key) || [];
    bucket.push(node);
    nodeBuckets.set(key, bucket);
    graphNodes.push(node);
    nextNodeId += 1;
    return node;
  };

  let generatedSegmentCount = 0;
  const addSegment = (
    startPoint,
    endPoint,
    startLogical = false,
    endLogical = false,
    sourceEntity = null,
    sourceParameterStart = 0,
    sourceParameterEnd = 1,
  ) => {
    if (distance(startPoint, endPoint) <= SNAP_THRESHOLD) {
      return;
    }
    const startNode = nodeForPoint(startPoint, startLogical);
    const endNode = nodeForPoint(endPoint, endLogical);
    const key = [startNode.id, endNode.id]
      .sort((first, second) => first - second)
      .join(':');
    if (edgeKeys.has(key)) {
      return;
    }
    edgeKeys.add(key);
    const forward = {
      from: startNode,
      to: endNode,
      twin: null,
      visited: false,
      sourceEntity,
      sourceParameterStart,
      sourceParameterEnd,
    };
    const reverse = {
      from: endNode,
      to: startNode,
      twin: forward,
      visited: false,
      sourceEntity,
      sourceParameterStart: sourceParameterEnd,
      sourceParameterEnd: sourceParameterStart,
    };
    forward.twin = reverse;
    startNode.outgoing.push(forward);
    endNode.outgoing.push(reverse);
    generatedSegmentCount += 1;
  };

  for (const entity of entities) {
    const sorted = uniqueSortedParameters(parameters.get(entity));
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const startParameter = sorted[index];
      const endParameter = sorted[index + 1];
      if (entity.type === 'LINE') {
        addSegment(
          pointAtLineParameter(entity, startParameter),
          pointAtLineParameter(entity, endParameter),
          true,
          true,
          entity,
          startParameter,
          endParameter,
        );
      }
      else {
        const totalSweep = entity.type === 'CIRCLE'
          ? TWO_PI
          : entityArcSweep(entity);
        const intervalSweep = totalSweep * (endParameter - startParameter);
        const subdivisionCount = Math.max(1, Math.ceil(intervalSweep / (TWO_PI / 96)));
        let previousPoint = pointAtCircularParameter(entity, startParameter);
        let previousLogical = true;
        for (let subdivision = 1; subdivision <= subdivisionCount; subdivision += 1) {
          const parameter = startParameter +
            (endParameter - startParameter) * subdivision / subdivisionCount;
          const nextPoint = pointAtCircularParameter(entity, parameter);
          const nextLogical = subdivision === subdivisionCount;
          const previousParameter = startParameter +
            (endParameter - startParameter) * (subdivision - 1) / subdivisionCount;
          addSegment(
            previousPoint,
            nextPoint,
            previousLogical,
            nextLogical,
            entity,
            previousParameter,
            parameter,
          );
          previousPoint = nextPoint;
          previousLogical = nextLogical;
        }
      }
      if (generatedSegmentCount > 12000) {
        return [];
      }
    }
  }

  graphNodes.forEach((node) => {
    node.outgoing.sort((first, second) =>
      Math.atan2(first.to.point.y - node.point.y, first.to.point.x - node.point.x) -
      Math.atan2(second.to.point.y - node.point.y, second.to.point.x - node.point.x));
  });

  const faces = [];
  const halfEdges = graphNodes.flatMap((node) => node.outgoing);
  halfEdges.forEach((startEdge) => {
    if (startEdge.visited) {
      return;
    }
    const polygon = [];
    const gripIndices = [];
    const faceEdges = [];
    let edge = startEdge;
    let closed = false;
    for (let step = 0; step <= halfEdges.length; step += 1) {
      if (edge.visited && edge !== startEdge) {
        break;
      }
      edge.visited = true;
      if (edge.from.logicalGrip) {
        gripIndices.push(polygon.length);
      }
      polygon.push({ ...edge.from.point });
      faceEdges.push(edge);
      const outgoing = edge.to.outgoing;
      const reverseIndex = outgoing.indexOf(edge.twin);
      if (reverseIndex < 0 || !outgoing.length) {
        break;
      }
      edge = outgoing[(reverseIndex - 1 + outgoing.length) % outgoing.length];
      if (edge === startEdge) {
        closed = true;
        break;
      }
    }
    if (closed && polygon.length >= 3 && Math.abs(polygonSignedArea(polygon)) > SNAP_THRESHOLD) {
      const curveGroups = curveGroupsFromFaceEdges(faceEdges);
      curveGroups.forEach((group) => {
        if (group.type === 'ARC' && group.indices.length >= 3) {
          gripIndices.push(group.indices[Math.floor((group.indices.length - 1) * 0.5)]);
        }
      });
      polygon.gripIndices = [...new Set(gripIndices)];
      polygon.curveGroups = curveGroups;
      faces.push(polygon);
    }
  });
  return faces;
}

function hatchBoundaryAtPoint(doc, point) {
  const candidates = [];
  const visitedGroups = new Set();
  doc.topLevelEntities().forEach((entity) => {
    if (entity.type === 'POLYLINE') {
      const polygon = closedLineGroupPolygon(doc, entity);
      if (polygon && pointInPolygon(point, polygon)) {
        candidates.push(polygon);
      }
    }
    if (entity.type === 'LINE' && entity.groupId && !visitedGroups.has(entity.groupId)) {
      visitedGroups.add(entity.groupId);
      const polygon = closedLineGroupPolygon(doc, entity);
      if (polygon && pointInPolygon(point, polygon)) {
        candidates.push(polygon);
      }
    }
    if (entity.type === 'CIRCLE' && distance(entity.center, point) < entity.radius - SNAP_THRESHOLD) {
      candidates.push(circlePolygon(entity));
    }
  });
  curveArrangementFaces(doc).forEach((polygon) => {
    if (pointInPolygon(point, polygon)) {
      candidates.push(polygon);
    }
  });
  candidates.sort((first, second) =>
    Math.abs(polygonSignedArea(first)) - Math.abs(polygonSignedArea(second)));
  return candidates[0] || null;
}

function lineGroupRangeEntities(path, startDistance, endDistance, groupId) {
  const replacements = [];
  if (endDistance - startDistance <= SNAP_THRESHOLD || path.totalLength <= SNAP_THRESHOLD) {
    return replacements;
  }

  const firstCycle = Math.floor(startDistance / path.totalLength);
  const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);
  for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
    const cycleOffset = cycle * path.totalLength;
    for (const component of path.components) {
      const componentStart = cycleOffset + component.offset;
      const componentEnd = componentStart + component.length;
      const overlapStart = Math.max(startDistance, componentStart);
      const overlapEnd = Math.min(endDistance, componentEnd);
      if (overlapEnd - overlapStart <= SNAP_THRESHOLD) {
        continue;
      }

      const startParameter = (overlapStart - componentStart) / component.length;
      const endParameter = (overlapEnd - componentStart) / component.length;
      replacements.push(new LineEntity(
        lineGroupPointAt(component, startParameter),
        lineGroupPointAt(component, endParameter),
        {
          lineStyle: component.entity.lineStyle,
          lineType: component.entity.lineType,
          lineColor: component.entity.lineColor,
          layer: component.entity.layer,
          groupId,
        },
      ));
    }
  }
  return replacements;
}

function trimLineGroupAtPoint(doc, entity, pickPoint) {
  const groupEntities = doc.groupEntities(entity);
  const path = orderedLineGroup(groupEntities);
  if (!path || path.totalLength <= SNAP_THRESHOLD) {
    return { trimmed: false, keptCount: groupEntities.length, grouped: true };
  }

  const breakDistances = [];
  for (const component of path.components) {
    for (const otherEntity of doc.queryBounds(component.entity.bounds())) {
      if (otherEntity.groupId === entity.groupId) {
        continue;
      }
      for (const intersection of entityIntersectionPoints(component.entity, otherEntity)) {
        const entityParameter = lineParameter(component.entity, intersection);
        const traversalParameter = component.reversed ? 1 - entityParameter : entityParameter;
        let pathDistance = component.offset + component.length * traversalParameter;
        if (path.closed && path.totalLength - pathDistance <= SNAP_THRESHOLD) {
          pathDistance = 0;
        }
        breakDistances.push(pathDistance);
      }
    }
  }

  const sortedBreaks = [...breakDistances]
    .sort((first, second) => first - second)
    .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
  if ((path.closed && sortedBreaks.length < 2) || (!path.closed && !sortedBreaks.length)) {
    return { trimmed: false, keptCount: groupEntities.length, grouped: true };
  }

  const pickedComponent = path.components.find((component) => component.entity === entity);
  if (!pickedComponent) {
    return { trimmed: false, keptCount: groupEntities.length, grouped: true };
  }
  const pickedEntityParameter = lineParameter(entity, closestPointOnLineSegment(entity, pickPoint));
  const pickedTraversalParameter = pickedComponent.reversed
    ? 1 - pickedEntityParameter
    : pickedEntityParameter;
  const pickDistance = pickedComponent.offset + pickedComponent.length * pickedTraversalParameter;

  let trimStart = null;
  let trimEnd = null;
  if (path.closed) {
    for (let index = 0; index < sortedBreaks.length; index += 1) {
      const start = sortedBreaks[index];
      const next = sortedBreaks[(index + 1) % sortedBreaks.length];
      const end = index === sortedBreaks.length - 1 ? next + path.totalLength : next;
      const adjustedPick = pickDistance < start - SNAP_THRESHOLD ? pickDistance + path.totalLength : pickDistance;
      if (adjustedPick >= start - SNAP_THRESHOLD && adjustedPick <= end + SNAP_THRESHOLD) {
        trimStart = start;
        trimEnd = end;
        break;
      }
    }
  }
  else {
    const openBreaks = [0, ...sortedBreaks, path.totalLength]
      .sort((first, second) => first - second)
      .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
    for (let index = 0; index < openBreaks.length - 1; index += 1) {
      if (pickDistance >= openBreaks[index] - SNAP_THRESHOLD &&
          pickDistance <= openBreaks[index + 1] + SNAP_THRESHOLD) {
        trimStart = openBreaks[index];
        trimEnd = openBreaks[index + 1];
        break;
      }
    }
  }

  if (trimStart === null || trimEnd === null) {
    return { trimmed: false, keptCount: groupEntities.length, grouped: true };
  }

  let replacements = [];
  if (path.closed) {
    let keepEnd = trimStart;
    const keepStart = trimEnd % path.totalLength;
    if (keepEnd <= keepStart + SNAP_THRESHOLD) {
      keepEnd += path.totalLength;
    }
    replacements = lineGroupRangeEntities(path, keepStart, keepEnd, entity.groupId);
  }
  else {
    replacements.push(...lineGroupRangeEntities(path, 0, trimStart, entity.groupId));
    const trailingGroupId = replacements.length && trimEnd < path.totalLength - SNAP_THRESHOLD
      ? createEntityGroupId('polyline')
      : entity.groupId;
    replacements.push(...lineGroupRangeEntities(path, trimEnd, path.totalLength, trailingGroupId));
  }

  const replaced = doc.replaceEntities(groupEntities, replacements);
  return {
    trimmed: replaced,
    keptCount: replacements.length,
    removedCount: groupEntities.length,
    grouped: true,
  };
}

function hatchBoundaryPath(entity) {
  if (!entity || entity.type !== 'HATCH' || entity.boundary.length < 3) {
    return null;
  }

  let offset = 0;
  const components = entity.boundary.map((start, index) => {
    const endIndex = (index + 1) % entity.boundary.length;
    const end = entity.boundary[endIndex];
    const length = distance(start, end);
    const component = {
      start,
      end,
      startIndex: index,
      endIndex,
      length,
      offset,
    };
    offset += length;
    return component;
  }).filter((component) => component.length > SNAP_THRESHOLD);
  return components.length >= 3 && offset > SNAP_THRESHOLD
    ? { components, totalLength: offset }
    : null;
}

function hatchBoundaryRange(path, startDistance, endDistance, sourceEntity = null) {
  if (endDistance - startDistance <= SNAP_THRESHOLD) {
    return [];
  }

  const points = [];
  const sourceEdgeIndices = [];
  const sourceVertexIndices = [];
  const firstCycle = Math.floor(startDistance / path.totalLength);
  const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);
  for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
    for (const component of path.components) {
      const componentStart = cycle * path.totalLength + component.offset;
      const componentEnd = componentStart + component.length;
      const overlapStart = Math.max(startDistance, componentStart);
      const overlapEnd = Math.min(endDistance, componentEnd);
      if (overlapEnd - overlapStart <= SNAP_THRESHOLD) {
        continue;
      }

      const startParameter = clamp((overlapStart - componentStart) / component.length, 0, 1);
      const endParameter = clamp((overlapEnd - componentStart) / component.length, 0, 1);
      if (!points.length) {
        points.push({
          x: component.start.x + (component.end.x - component.start.x) * startParameter,
          y: component.start.y + (component.end.y - component.start.y) * startParameter,
        });
        sourceVertexIndices.push(startParameter <= SNAP_THRESHOLD ? component.startIndex : null);
      }
      points.push({
        x: component.start.x + (component.end.x - component.start.x) * endParameter,
        y: component.start.y + (component.end.y - component.start.y) * endParameter,
      });
      sourceVertexIndices.push(endParameter >= 1 - SNAP_THRESHOLD ? component.endIndex : null);
      sourceEdgeIndices.push(component.startIndex);
    }
  }

  if (points.length > 1 && distance(points[0], points[points.length - 1]) <= SNAP_THRESHOLD) {
    points.pop();
    sourceVertexIndices.pop();
    sourceEdgeIndices.pop();
  }
  if (!sourceEntity || points.length < 2) {
    return points;
  }

  const gripIndices = new Set([0, points.length - 1]);
  sourceVertexIndices.forEach((sourceIndex, boundaryIndex) => {
    if (sourceIndex !== null && sourceEntity.gripIndices.includes(sourceIndex)) {
      gripIndices.add(boundaryIndex);
    }
  });

  const curveGroups = [];
  for (const sourceGroup of sourceEntity.curveGroups) {
    const sourceCurveEdges = new Set(
      sourceGroup.type === 'CIRCLE'
        ? sourceGroup.indices
        : sourceGroup.indices.slice(0, -1),
    );
    let runStart = null;
    for (let edgeIndex = 0; edgeIndex <= sourceEdgeIndices.length; edgeIndex += 1) {
      const belongsToCurve = edgeIndex < sourceEdgeIndices.length &&
        sourceCurveEdges.has(sourceEdgeIndices[edgeIndex]);
      if (belongsToCurve && runStart === null) {
        runStart = edgeIndex;
      }
      if (!belongsToCurve && runStart !== null) {
        const runEnd = edgeIndex;
        const indices = Array.from(
          { length: runEnd - runStart + 1 },
          (_, index) => runStart + index,
        );
        if (indices.length >= 3) {
          curveGroups.push({
            type: sourceGroup.type === 'CIRCLE' ? 'ARC' : sourceGroup.type,
            indices,
          });
          gripIndices.add(indices[0]);
          gripIndices.add(indices[Math.floor((indices.length - 1) * 0.5)]);
          gripIndices.add(indices[indices.length - 1]);
        }
        runStart = null;
      }
    }
  }

  points.gripIndices = [...gripIndices]
    .filter((index) => index >= 0 && index < points.length)
    .sort((first, second) => first - second);
  points.curveGroups = curveGroups;
  return points;
}

function trimHatchEntityAtPoint(doc, entity, pickPoint) {
  const path = hatchBoundaryPath(entity);
  if (!doc || !path || !pickPoint) {
    return { trimmed: false, keptCount: 0, grouped: true, hatch: true };
  }

  const breakDistances = [];
  let nearestComponent = null;
  let nearestParameter = 0;
  let nearestDistance = Infinity;

  for (const component of path.components) {
    const edge = new LineEntity(component.start, component.end, {
      layer: entity.layer,
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
    });
    const pickParameter = lineParameter(edge, pickPoint);
    const projectedPick = pointAtLineParameter(edge, pickParameter);
    const pickDistance = distance(projectedPick, pickPoint);
    if (pickDistance < nearestDistance) {
      nearestDistance = pickDistance;
      nearestComponent = component;
      nearestParameter = pickParameter;
    }

    for (const otherEntity of doc.queryBounds(edge.bounds())) {
      if (otherEntity === entity || otherEntity.type === 'HATCH' || otherEntity.type === 'TEXT') {
        continue;
      }
      for (const intersection of entityIntersectionPoints(edge, otherEntity)) {
        const parameter = lineParameter(edge, intersection);
        // Circular source geometry meets every tessellated edge at its endpoints.
        // A line crossing a vertex is still a valid cut and is deduplicated below.
        if (
          (parameter <= SNAP_THRESHOLD || parameter >= 1 - SNAP_THRESHOLD) &&
          otherEntity.type !== 'LINE'
        ) {
          continue;
        }
        breakDistances.push(component.offset + component.length * parameter);
      }
    }
  }

  const sortedBreaks = breakDistances
    .sort((first, second) => first - second)
    .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
  if (sortedBreaks.length < 2 || !nearestComponent) {
    return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
  }

  const pickDistance = nearestComponent.offset + nearestComponent.length * nearestParameter;
  let trimStart = null;
  let trimEnd = null;
  for (let index = 0; index < sortedBreaks.length; index += 1) {
    const start = sortedBreaks[index];
    const next = sortedBreaks[(index + 1) % sortedBreaks.length];
    const end = index === sortedBreaks.length - 1 ? next + path.totalLength : next;
    const adjustedPick = pickDistance < start - SNAP_THRESHOLD
      ? pickDistance + path.totalLength
      : pickDistance;
    if (adjustedPick >= start - SNAP_THRESHOLD && adjustedPick <= end + SNAP_THRESHOLD) {
      trimStart = start;
      trimEnd = end;
      break;
    }
  }
  if (trimStart === null || trimEnd === null) {
    return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
  }

  const keepStart = trimEnd % path.totalLength;
  let keepEnd = trimStart;
  if (keepEnd <= keepStart + SNAP_THRESHOLD) {
    keepEnd += path.totalLength;
  }
  const boundary = hatchBoundaryRange(path, keepStart, keepEnd, entity);
  if (boundary.length < 3 || Math.abs(polygonSignedArea(boundary)) <= SNAP_THRESHOLD) {
    return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
  }

  const replacement = new HatchEntity(boundary, {
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  });
  return {
    trimmed: doc.replaceEntity(entity, [replacement]),
    keptCount: 1,
    grouped: true,
    hatch: true,
  };
}

function trimEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !entity) {
    return { trimmed: false, keptCount: 0, grouped: false };
  }

  if (entity.groupId) {
    return trimLineGroupAtPoint(doc, entity, pickPoint);
  }

  if (entity.type === 'HATCH') {
    return trimHatchEntityAtPoint(doc, entity, pickPoint);
  }

  if (entity.type === 'POLYLINE') {
    return trimPolylineEntityAtPoint(doc, entity, pickPoint);
  }

  if (entity.type === 'LINE') {
    return trimLineEntityAtPoint(doc, entity, pickPoint);
  }

  return trimCircularEntityAtPoint(doc, entity, pickPoint);
}

function extensionBoundaryIntersections(line, boundary) {
  if (!line || line.type !== 'LINE' || !boundary || boundary === line) {
    return [];
  }


  if (boundary.type === 'POLYLINE') {
    return primitiveEntityParts(boundary)
      .flatMap((part) => extensionBoundaryIntersections(line, part));
  }

  const direction = {
    x: line.end.x - line.start.x,
    y: line.end.y - line.start.y,
  };
  if (Math.hypot(direction.x, direction.y) <= SNAP_THRESHOLD) {
    return [];
  }

  if (boundary.type === 'LINE') {
    const boundaryDirection = {
      x: boundary.end.x - boundary.start.x,
      y: boundary.end.y - boundary.start.y,
    };
    const point = infiniteLineLineIntersection(line.start, direction, boundary.start, boundaryDirection);
    return point ? [point] : [];
  }

  if (isCircularEntity(boundary)) {
    return infiniteLineCircularIntersectionPoints(line.start, direction, boundary, false);
  }

  return [];
}

function lineExtensionCandidate(line, boundaryEntities, endpointKey) {
  const candidates = [];
  for (const boundary of boundaryEntities) {
    for (const point of extensionBoundaryIntersections(line, boundary)) {
      const parameter = rawLineParameter(line, point);
      if (endpointKey === 'start' && parameter < -SNAP_THRESHOLD) {
        candidates.push({ point, distance: distance(line.start, point) });
      }
      if (endpointKey === 'end' && parameter > 1 + SNAP_THRESHOLD) {
        candidates.push({ point, distance: distance(line.end, point) });
      }
    }
  }

  candidates.sort((first, second) => first.distance - second.distance);
  return candidates[0]?.point || null;
}

function extendLineToBoundaries(line, boundaryEntities, pickPoint = null) {
  if (!line || line.type !== 'LINE' || !boundaryEntities.length) {
    return false;
  }

  const startCandidate = lineExtensionCandidate(line, boundaryEntities, 'start');
  const endCandidate = lineExtensionCandidate(line, boundaryEntities, 'end');
  let endpointKey = null;
  if (pickPoint) {
    endpointKey = distance(pickPoint, line.start) <= distance(pickPoint, line.end) ? 'start' : 'end';
  }
  else if (startCandidate && endCandidate) {
    endpointKey = distance(line.start, startCandidate) <= distance(line.end, endCandidate) ? 'start' : 'end';
  }
  else if (startCandidate) {
    endpointKey = 'start';
  }
  else if (endCandidate) {
    endpointKey = 'end';
  }

  const target = endpointKey === 'start' ? startCandidate : endpointKey === 'end' ? endCandidate : null;
  if (!target) {
    return false;
  }

  line[endpointKey] = { ...target };
  return true;
}

function arcEndpointPoint(arc, endpointKey) {
  return pointAtCircleAngle(arc, endpointKey === 'start' ? arc.startAngle : arc.endAngle);
}

function arcExtensionCandidate(arc, boundaryEntities, endpointKey) {
  const candidates = [];
  const clockwise = arc.clockwise !== false;
  const currentSweep = entityArcSweep(arc);
  if (currentSweep <= SNAP_THRESHOLD) {
    return null;
  }

  for (const boundary of boundaryEntities) {
    for (const point of fullCircleBoundaryIntersectionPoints(arc, boundary)) {
      const angle = angleOfPoint(arc.center, point);
      if (angleOnArc(angle, arc)) {
        continue;
      }

      if (endpointKey === 'start') {
        const extensionSweep = directedArcSweep(angle, arc.startAngle, clockwise);
        const nextSweep = directedArcSweep(angle, arc.endAngle, clockwise);
        if (
          extensionSweep > SNAP_THRESHOLD &&
          nextSweep > currentSweep + SNAP_THRESHOLD &&
          nextSweep < TWO_PI - SNAP_THRESHOLD
        ) {
          candidates.push({ angle, distance: arc.radius * extensionSweep });
        }
      }

      if (endpointKey === 'end') {
        const extensionSweep = directedArcSweep(arc.endAngle, angle, clockwise);
        const nextSweep = directedArcSweep(arc.startAngle, angle, clockwise);
        if (
          extensionSweep > SNAP_THRESHOLD &&
          nextSweep > currentSweep + SNAP_THRESHOLD &&
          nextSweep < TWO_PI - SNAP_THRESHOLD
        ) {
          candidates.push({ angle, distance: arc.radius * extensionSweep });
        }
      }
    }
  }

  candidates.sort((first, second) => first.distance - second.distance);
  return candidates[0]?.angle ?? null;
}

function extendArcToBoundaries(arc, boundaryEntities, pickPoint = null) {
  if (!arc || arc.type !== 'ARC' || !boundaryEntities.length) {
    return false;
  }

  const startCandidate = arcExtensionCandidate(arc, boundaryEntities, 'start');
  const endCandidate = arcExtensionCandidate(arc, boundaryEntities, 'end');
  let endpointKey = null;
  if (pickPoint) {
    endpointKey = distance(pickPoint, arcEndpointPoint(arc, 'start')) <=
      distance(pickPoint, arcEndpointPoint(arc, 'end')) ? 'start' : 'end';
  }
  else if (startCandidate !== null && endCandidate !== null) {
    const clockwise = arc.clockwise !== false;
    const startDistance = arc.radius * directedArcSweep(startCandidate, arc.startAngle, clockwise);
    const endDistance = arc.radius * directedArcSweep(arc.endAngle, endCandidate, clockwise);
    endpointKey = startDistance <= endDistance ? 'start' : 'end';
  }
  else if (startCandidate !== null) {
    endpointKey = 'start';
  }
  else if (endCandidate !== null) {
    endpointKey = 'end';
  }

  const targetAngle = endpointKey === 'start'
    ? startCandidate
    : endpointKey === 'end' ? endCandidate : null;
  if (targetAngle === null) {
    return false;
  }

  if (endpointKey === 'start') {
    arc.startAngle = normalizeAngle(targetAngle);
  }
  else {
    arc.endAngle = normalizeAngle(targetAngle);
  }
  return true;
}

function extendPolylineToBoundaries(entity, boundaryEntities, pickPoint = null) {
  if (entity?.type !== 'POLYLINE' || entity.closed || !entity.segments.length ||
      !boundaryEntities.length) {
    return false;
  }
  const extensionFor = (endpointKey) => {
    const segmentIndex = endpointKey === 'start' ? 0 : entity.segments.length - 1;
    const geometry = polylineSegmentEntity(entity, segmentIndex);
    const endpointPoint = endpointKey === 'start'
      ? entity.vertices[0]
      : entity.vertices[entity.vertices.length - 1];
    if (!geometry) {
      return null;
    }
    const extended = geometry.type === 'LINE'
      ? extendLineToBoundaries(geometry, boundaryEntities, endpointPoint)
      : extendArcToBoundaries(geometry, boundaryEntities, endpointPoint);
    if (!extended) {
      return null;
    }
    const targetPoint = geometry.type === 'LINE'
      ? geometry[endpointKey]
      : arcEndpointPoint(geometry, endpointKey);
    return { endpointKey, targetPoint, distance: distance(endpointPoint, targetPoint) };
  };
  let extension;
  if (pickPoint) {
    const endpointKey = distance(pickPoint, entity.vertices[0]) <=
      distance(pickPoint, entity.vertices[entity.vertices.length - 1]) ? 'start' : 'end';
    extension = extensionFor(endpointKey);
  }
  else {
    extension = [extensionFor('start'), extensionFor('end')]
      .filter(Boolean)
      .sort((first, second) => first.distance - second.distance)[0];
  }
  if (!extension) {
    return false;
  }
  const vertexIndex = extension.endpointKey === 'start' ? 0 : entity.vertices.length - 1;
  entity.vertices[vertexIndex] = { ...extension.targetPoint };
  return true;
}

function canvasAngleToDxfDegrees(angle) {
  return normalizeAngle(-angle) * 180 / Math.PI;
}

function dxfDegreesToCanvasAngle(degrees) {
  return normalizeAngle(-Number(degrees || 0) * Math.PI / 180);
}

function appendEntityToDxf(lines, entity, options = {}) {
  if (entity.type === 'LINE') {
    lines.push(
      '0', 'LINE', '8', entity.layer,
      '6', getLineType(entity.lineType).dxfName,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
      '10', String(entity.start.x), '20', String(-entity.start.y), '30', '0',
      '11', String(entity.end.x), '21', String(-entity.end.y), '31', '0',
    );
  }
  if (entity.type === 'POLYLINE') {
    lines.push(
      '0', 'LWPOLYLINE', '8', entity.layer,
      '6', getLineType(entity.lineType).dxfName,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
      '90', String(entity.vertices.length), '70', entity.closed ? '1' : '0',
    );
    entity.vertices.forEach((point, index) => {
      const segment = entity.segments[index];
      let bulge = 0;
      if (segment?.type === 'ARC') {
        const geometry = polylineSegmentEntity(entity, index);
        if (geometry) {
          const direction = geometry.clockwise === false ? 1 : -1;
          bulge = direction * Math.tan(entityArcSweep(geometry) * 0.25);
        }
      }
      lines.push(
        '10', String(point.x), '20', String(-point.y),
        '40', String(segment?.startWidth || 0),
        '41', String(segment?.endWidth || 0),
        '42', String(bulge),
      );
    });
  }
  if (entity.type === 'CIRCLE') {
    lines.push(
      '0', 'CIRCLE', '8', entity.layer,
      '6', getLineType(entity.lineType).dxfName,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
      '10', String(entity.center.x), '20', String(-entity.center.y), '30', '0',
      '40', String(entity.radius),
    );
  }
  if (entity.type === 'ARC') {
    const dxfStartAngle = entity.clockwise === false ? entity.startAngle : entity.endAngle;
    const dxfEndAngle = entity.clockwise === false ? entity.endAngle : entity.startAngle;
    lines.push(
      '0', 'ARC', '8', entity.layer,
      '6', getLineType(entity.lineType).dxfName,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
      '10', String(entity.center.x), '20', String(-entity.center.y), '30', '0',
      '40', String(entity.radius),
      '50', String(canvasAngleToDxfDegrees(dxfStartAngle)),
      '51', String(canvasAngleToDxfDegrees(dxfEndAngle)),
    );
  }
  if (entity.type === 'TEXT') {
    lines.push(
      '0', 'TEXT', '8', entity.layer, '7', 'ROMANS',
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '10', String(entity.insertionPoint.x), '20', String(-entity.insertionPoint.y), '30', '0',
      '40', String(entity.height), '1', entity.text.replace(/[\r\n]+/g, ' '),
      '50', String(entity.angle),
    );
  }
  if (entity.type === 'HATCH') {
    const loops = entity.loops || [entity.boundary];
    lines.push(
      '0', 'HATCH', '8', entity.layer,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '10', '0', '20', '0', '30', '0', '210', '0', '220', '0', '230', '1',
      '2', 'SOLID', '70', '1', '71', '0', '91', String(loops.length),
    );
    loops.forEach((loop, index) => {
      lines.push('92', index === 0 ? '3' : '2', '72', '0', '73', '1', '93', String(loop.length));
      loop.forEach((point) => {
        lines.push('10', String(point.x), '20', String(-point.y));
      });
      lines.push('97', '0');
    });
    lines.push('75', '0', '76', '1', '98', '0');
  }
  if (entity.type === 'DIMENSION') {
    const typeCode = {
      horizontal: 0,
      vertical: 0,
      aligned: 1,
      angular: 2,
      diameter: 3,
      radius: 4,
    }[entity.kind] ?? 0;
    const styleName = `WEBCAD_${entity.dimensionStyle.toUpperCase()}`;
    const textPosition = dimensionGeometry(entity).text.point;
    const definitionPoint = entity.kind === 'radius'
      ? entity.points[0]
      : entity.kind === 'diameter'
        ? {
          x: entity.points[0].x * 2 - entity.points[1].x,
          y: entity.points[0].y * 2 - entity.points[1].y,
        }
        : entity.placement;
    lines.push(
      '0', 'DIMENSION',
      '100', 'AcDbEntity',
      '8', entity.layer,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle('auxiliar').dxfLineWeight),
      '100', 'AcDbDimension',
      ...(options.dimensionBlockName ? ['2', options.dimensionBlockName] : []),
      '10', String(definitionPoint.x), '20', String(-definitionPoint.y), '30', '0',
      '11', String(textPosition.x), '21', String(-textPosition.y), '31', '0',
      '70', String(32 + typeCode),
      '3', styleName,
      '210', '0', '220', '0', '230', '1',
    );
    if (entity.kind === 'radius' || entity.kind === 'diameter') {
      lines.push(
        '100', entity.kind === 'radius' ? 'AcDbRadialDimension' : 'AcDbDiametricDimension',
        '15', String(entity.points[1].x), '25', String(-entity.points[1].y), '35', '0',
        '40', '0',
      );
      if (entity.kind === 'radius') {
        lines.push('13', String(entity.points[0].x), '23', String(-entity.points[0].y), '33', '0');
      }
    }
    else if (entity.kind === 'angular') {
      const [vertex, firstRay, secondRay] = entity.points;
      lines.push(
        '100', 'AcDb2LineAngularDimension',
        '13', String(vertex.x), '23', String(-vertex.y), '33', '0',
        '14', String(firstRay.x), '24', String(-firstRay.y), '34', '0',
        '15', String(vertex.x), '25', String(-vertex.y), '35', '0',
        '16', String(secondRay.x), '26', String(-secondRay.y), '36', '0',
      );
    }
    else {
      lines.push(
        '100', entity.kind === 'aligned' ? 'AcDbAlignedDimension' : 'AcDbRotatedDimension',
        '13', String(entity.points[0].x), '23', String(-entity.points[0].y), '33', '0',
        '14', String(entity.points[1].x), '24', String(-entity.points[1].y), '34', '0',
      );
      if (entity.kind !== 'aligned') {
        lines.push('50', entity.kind === 'vertical' ? '90' : '0');
      }
    }
  }
  if (entity.type === 'INSERT') {
    lines.push(
      '0', 'INSERT', '8', entity.layer, '2', entity.blockName,
      '6', getLineType(entity.lineType).dxfName,
      '62', String(getLineColor(entity.lineColor).aci || 256),
      '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
      '10', String(entity.insertionPoint.x),
      '20', String(-entity.insertionPoint.y),
      '30', '0',
      '41', String(entity.scaleX),
      '42', String(entity.scaleY),
      '43', '1',
      '50', String(entity.rotation),
    );
  }
}

function appendDimensionGraphicsBlock(lines, entity, blockName) {
  const geometry = dimensionGeometry(entity);
  lines.push(
    '0', 'BLOCK', '8', '0', '2', blockName, '70', '1',
    '10', '0', '20', '0', '30', '0', '3', blockName, '1', '',
  );
  geometry.lines.forEach((line) => {
    lines.push(
      '0', 'LINE', '8', entity.layer,
      '10', String(line.start.x), '20', String(-line.start.y), '30', '0',
      '11', String(line.end.x), '21', String(-line.end.y), '31', '0',
    );
  });
  geometry.arcs.forEach((arc) => {
    lines.push(
      '0', 'ARC', '8', entity.layer,
      '10', String(arc.center.x), '20', String(-arc.center.y), '30', '0',
      '40', String(arc.radius),
      '50', String(canvasAngleToDxfDegrees(arc.endAngle)),
      '51', String(canvasAngleToDxfDegrees(arc.startAngle)),
    );
  });
  geometry.arrows.forEach((arrow) => {
    lines.push(
      '0', 'SOLID', '8', entity.layer,
      '10', String(arrow[0].x), '20', String(-arrow[0].y), '30', '0',
      '11', String(arrow[1].x), '21', String(-arrow[1].y), '31', '0',
      '12', String(arrow[2].x), '22', String(-arrow[2].y), '32', '0',
      '13', String(arrow[2].x), '23', String(-arrow[2].y), '33', '0',
    );
  });
  lines.push(
    '0', 'TEXT', '8', entity.layer, '7', 'ROMANS',
    '10', String(geometry.text.point.x), '20', String(-geometry.text.point.y), '30', '0',
    '40', String(geometry.text.height), '1', geometry.text.value,
    '50', String(-geometry.text.angle * 180 / Math.PI),
    '72', '1', '73', '2',
    '11', String(geometry.text.point.x), '21', String(-geometry.text.point.y), '31', '0',
    '0', 'ENDBLK', '8', '0',
  );
}

function serializeDocumentToDxf(doc) {
  const profile = activeDrawingProfile();
  const dxfLineTypeScale = profile.dxfLineTypeScale;
  const layerMap = new Map(state.layers.map((layer) => [layer.name, { ...layer }]));
  doc.entities.forEach((entity) => {
    if (!layerMap.has(entity.layer)) {
      layerMap.set(entity.layer, {
        name: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
      });
    }
  });
  const layerDefinitions = [...layerMap.values()];
  const topLevelDimensions = doc.topLevelEntities().filter((entity) => entity.type === 'DIMENSION');
  const dimensionBlockNames = new Map(
    topLevelDimensions.map((entity, index) => [entity, `*DWEB${index + 1}`]),
  );
  const lines = [
    '0', 'SECTION',
    '2', 'HEADER',
    '9', '$ACADVER',
    '1', 'AC1015',
    '9', '$INSUNITS',
    '70', String(profile.dxfInsUnits),
    '0', 'ENDSEC',
    '0', 'SECTION',
    '2', 'TABLES',
    '0', 'TABLE',
    '2', 'LTYPE',
    '70', '3',
    '0', 'LTYPE', '2', 'CONTINUOUS', '70', '0', '3', 'Solid line', '72', '65', '73', '0', '40', '0',
    '0', 'LTYPE', '2', 'HIDDEN', '70', '0', '3', 'Hidden __ __', '72', '65', '73', '2', '40', String(9 * dxfLineTypeScale),
    '49', String(6 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0',
    '0', 'LTYPE', '2', 'CENTER', '70', '0', '3', 'Center ____ _ ____', '72', '65', '73', '4', '40', String(17 * dxfLineTypeScale),
    '49', String(10 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0', '49', String(1 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0',
    '0', 'ENDTAB',
    '0', 'TABLE',
    '2', 'LAYER',
    '70', String(layerDefinitions.length),
  ];

  layerDefinitions.forEach((layer) => {
    lines.push(
      '0', 'LAYER',
      '2', layer.name,
      '70', '0',
      '62', String(getLineColor(layer.lineColor).aci || 7),
      '6', getLineType(layer.lineType).dxfName,
      '370', String(getLineStyle(layer.lineStyle).dxfLineWeight),
    );
  });
  lines.push(
    '0', 'ENDTAB',
    '0', 'TABLE', '2', 'STYLE', '70', '1',
    '0', 'STYLE', '2', 'ROMANS', '70', '0', '40', '0', '41', '1', '50', '0', '71', '0',
    '42', '2.5', '3', 'romans.shx', '4', '',
    '0', 'ENDTAB',
    '0', 'TABLE', '2', 'DIMSTYLE', '70', String(Object.keys(DIMENSION_STYLES).length),
  );
  Object.values(DIMENSION_STYLES).forEach((dimensionStyle) => {
    const metrics = dimensionStyleMetrics(dimensionStyle.id);
    lines.push(
      '0', 'DIMSTYLE', '2', `WEBCAD_${dimensionStyle.id.toUpperCase()}`, '70', '0',
      '40', '1',
      '41', String(metrics.arrowSize),
      '42', String(metrics.extensionOffset),
      '44', String(metrics.extensionOvershoot),
      '140', String(metrics.textHeight),
      '147', String(metrics.textGap),
      '176', '256', '177', '256', '178', '256',
      '271', '2', '275', '0',
    );
  });
  lines.push('0', 'ENDTAB', '0', 'ENDSEC');

  lines.push('0', 'SECTION', '2', 'BLOCKS');
  for (const definition of doc.blockDefinitions.values()) {
    lines.push(
      '0', 'BLOCK', '8', '0', '2', definition.name, '70', '0',
      '10', '0', '20', '0', '30', '0', '3', definition.name, '1', '',
    );
    definition.entities.forEach((entity) => appendEntityToDxf(lines, entity));
    lines.push('0', 'ENDBLK', '8', '0');
  }
  dimensionBlockNames.forEach((blockName, entity) => {
    appendDimensionGraphicsBlock(lines, entity, blockName);
  });
  lines.push('0', 'ENDSEC', '0', 'SECTION', '2', 'ENTITIES');

  for (const entity of doc.topLevelEntities()) {
    if (entity.type === 'LINE') {
      lines.push(
        '0', 'LINE',
        '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.start.x),
        '20', String(-entity.start.y),
        '30', '0',
        '11', String(entity.end.x),
        '21', String(-entity.end.y),
        '31', '0',
      );
    }

    if (entity.type === 'POLYLINE') {
      lines.push(
        '0', 'LWPOLYLINE',
        '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '90', String(entity.vertices.length),
        '70', entity.closed ? '1' : '0',
      );
      entity.vertices.forEach((point, index) => {
        const segment = entity.segments[index];
        let bulge = 0;
        if (segment?.type === 'ARC') {
          const geometry = polylineSegmentEntity(entity, index);
          if (geometry) {
            const direction = geometry.clockwise === false ? 1 : -1;
            bulge = direction * Math.tan(entityArcSweep(geometry) * 0.25);
          }
        }
        lines.push(
          '10', String(point.x),
          '20', String(-point.y),
          '40', String(segment?.startWidth || 0),
          '41', String(segment?.endWidth || 0),
          '42', String(bulge),
        );
      });
    }

    if (entity.type === 'CIRCLE') {
      lines.push(
        '0', 'CIRCLE',
        '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x),
        '20', String(-entity.center.y),
        '30', '0',
        '40', String(entity.radius),
      );
    }

    if (entity.type === 'ARC') {
      const dxfStartAngle = entity.clockwise === false ? entity.startAngle : entity.endAngle;
      const dxfEndAngle = entity.clockwise === false ? entity.endAngle : entity.startAngle;
      lines.push(
        '0', 'ARC',
        '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x),
        '20', String(-entity.center.y),
        '30', '0',
        '40', String(entity.radius),
        '50', String(canvasAngleToDxfDegrees(dxfStartAngle)),
        '51', String(canvasAngleToDxfDegrees(dxfEndAngle)),
      );
    }

    if (entity.type === 'TEXT') {
      lines.push(
        '0', 'TEXT',
        '8', entity.layer,
        '7', 'ROMANS',
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '10', String(entity.insertionPoint.x),
        '20', String(-entity.insertionPoint.y),
        '30', '0',
        '40', String(entity.height),
        '1', entity.text.replace(/[\r\n]+/g, ' '),
        '50', String(entity.angle),
      );
    }

    if (entity.type === 'HATCH') {
      const loops = entity.loops || [entity.boundary];
      lines.push(
        '0', 'HATCH',
        '8', entity.layer,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '10', '0', '20', '0', '30', '0',
        '210', '0', '220', '0', '230', '1',
        '2', 'SOLID',
        '70', '1',
        '71', '0',
        '91', String(loops.length),
      );
      loops.forEach((loop, index) => {
        lines.push('92', index === 0 ? '3' : '2', '72', '0', '73', '1', '93', String(loop.length));
        loop.forEach((point) => {
          lines.push('10', String(point.x), '20', String(-point.y));
        });
        lines.push('97', '0');
      });
      lines.push('75', '0', '76', '1', '98', '0');
    }
    if (entity.type === 'INSERT') {
      appendEntityToDxf(lines, entity);
    }
    if (entity.type === 'DIMENSION') {
      appendEntityToDxf(lines, entity, { dimensionBlockName: dimensionBlockNames.get(entity) });
    }
  }

  lines.push('0', 'ENDSEC', '0', 'EOF');
  return lines.join('\n');
}

function polylineFromDxfVertices(vertices, record, closed, layerDefinitionMap) {
  const normalizedVertices = vertices
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .map((point) => ({ ...point }));
  if (
    closed &&
    normalizedVertices.length > 2 &&
    distance(normalizedVertices[0], normalizedVertices[normalizedVertices.length - 1]) <= SNAP_THRESHOLD
  ) {
    normalizedVertices.pop();
  }
  const segmentCount = closed
    ? normalizedVertices.length
    : Math.max(0, normalizedVertices.length - 1);
  if (normalizedVertices.length < 2 || !segmentCount) {
    return null;
  }
  const segments = [];
  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
    const vertex = normalizedVertices[segmentIndex];
    const nextVertex = normalizedVertices[(segmentIndex + 1) % normalizedVertices.length];
    const center = arcCenterFromBulge(vertex, nextVertex, vertex.bulge || 0);
    segments.push({
      type: center ? 'ARC' : 'LINE',
      center,
      clockwise: (vertex.bulge || 0) >= 0,
      startWidth: Math.max(0, vertex.startWidth || 0),
      endWidth: Math.max(0, vertex.endWidth || 0),
    });
  }
  return new PolylineEntity(
    normalizedVertices,
    segments,
    { closed, ...dxfEntityOptions(record, layerDefinitionMap) },
  );
}

function dxfSectionBounds(pairs, sectionName) {
  for (let index = 0; index < pairs.length - 1; index += 1) {
    if (
      pairs[index][0] === '0' &&
      pairs[index][1] === 'SECTION' &&
      pairs[index + 1][0] === '2' &&
      pairs[index + 1][1] === sectionName
    ) {
      const start = index + 2;
      let end = start;
      while (end < pairs.length && !(pairs[end][0] === '0' && pairs[end][1] === 'ENDSEC')) {
        end += 1;
      }
      return { start, end };
    }
  }
  return null;
}

function dxfBlockEntityText(entityPairs, layerDefinitions) {
  const lines = ['0', 'SECTION', '2', 'TABLES', '0', 'TABLE', '2', 'LAYER', '70', String(layerDefinitions.length)];
  layerDefinitions.forEach((layer) => {
    lines.push(
      '0', 'LAYER', '2', layer.name, '70', '0',
      '62', String(getLineColor(layer.lineColor).aci || 7),
      '6', getLineType(layer.lineType).dxfName,
      '370', String(getLineStyle(layer.lineStyle).dxfLineWeight),
    );
  });
  lines.push('0', 'ENDTAB', '0', 'ENDSEC', '0', 'SECTION', '2', 'ENTITIES');
  entityPairs.forEach(([code, value]) => lines.push(code, value));
  lines.push('0', 'ENDSEC', '0', 'EOF');
  return lines.join('\n');
}

function appendDistinctPoint(points, point) {
  if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    return;
  }
  if (!points.length || distance(points[points.length - 1], point) > SNAP_THRESHOLD) {
    points.push(point);
  }
}

function sampleHatchBulge(points, start, end, bulge) {
  const center = arcCenterFromBulge(start, end, bulge);
  if (!center) {
    appendDistinctPoint(points, start);
    appendDistinctPoint(points, end);
    return;
  }
  const arc = {
    type: 'ARC',
    center,
    radius: distance(center, start),
    startAngle: angleOfPoint(center, start),
    endAngle: angleOfPoint(center, end),
    clockwise: bulge >= 0,
  };
  const sampleCount = clamp(Math.ceil(entityArcSweep(arc) / (Math.PI / 24)), 2, 96);
  for (let index = 0; index <= sampleCount; index += 1) {
    appendDistinctPoint(points, pointAtCircularParameter(arc, index / sampleCount));
  }
}

function repeatedDxfPoints(edgePairs, xCode, yCode) {
  const points = [];
  let pendingX = null;
  for (const [code, value] of edgePairs) {
    if (code === xCode) {
      pendingX = Number(value);
    }
    else if (code === yCode && pendingX !== null) {
      appendDistinctPoint(points, { x: pendingX, y: -Number(value) });
      pendingX = null;
    }
  }
  return points;
}

function sampleDxfHatchEdge(edgeType, edgePairs) {
  const value = (code, fallback = 0) => {
    const pair = edgePairs.find(([pairCode]) => pairCode === code);
    return Number(pair?.[1] ?? fallback);
  };
  if (edgeType === 1) {
    return [
      { x: value('10'), y: -value('20') },
      { x: value('11'), y: -value('21') },
    ];
  }
  if (edgeType === 2) {
    const center = { x: value('10'), y: -value('20') };
    const radius = value('40');
    const arc = {
      type: 'ARC',
      center,
      radius,
      startAngle: dxfDegreesToCanvasAngle(value('50')),
      endAngle: dxfDegreesToCanvasAngle(value('51')),
      clockwise: value('73', 1) !== 1,
    };
    if (!(radius > SNAP_THRESHOLD)) {
      return [];
    }
    const sampleCount = clamp(Math.ceil(entityArcSweep(arc) / (Math.PI / 24)), 2, 96);
    return Array.from({ length: sampleCount + 1 }, (_, index) =>
      pointAtCircularParameter(arc, index / sampleCount));
  }
  if (edgeType === 3) {
    const center = { x: value('10'), y: -value('20') };
    const major = { x: value('11'), y: -value('21') };
    const ratio = Math.abs(value('40', 1));
    const start = value('50') * Math.PI / 180;
    const end = value('51') * Math.PI / 180;
    const counterclockwise = value('73', 1) === 1;
    const sweep = counterclockwise ? normalizeAngle(end - start) : normalizeAngle(start - end);
    const sampleCount = clamp(Math.ceil(sweep / (Math.PI / 24)), 4, 128);
    return Array.from({ length: sampleCount + 1 }, (_, index) => {
      const parameter = start + (counterclockwise ? 1 : -1) * sweep * index / sampleCount;
      const minor = { x: major.y * ratio, y: -major.x * ratio };
      return {
        x: center.x + major.x * Math.cos(parameter) + minor.x * Math.sin(parameter),
        y: center.y + major.y * Math.cos(parameter) + minor.y * Math.sin(parameter),
      };
    });
  }
  if (edgeType === 4) {
    const fitPoints = repeatedDxfPoints(edgePairs, '11', '21');
    return fitPoints.length >= 2 ? fitPoints : repeatedDxfPoints(edgePairs, '10', '20');
  }
  return [];
}

function parseDxfHatchLoops(entityPairs) {
  const pathCountIndex = entityPairs.findIndex(([code]) => code === '91');
  if (pathCountIndex < 0) {
    return [];
  }
  const pathCount = Number(entityPairs[pathCountIndex][1]);
  if (!Number.isInteger(pathCount) || pathCount < 1 || pathCount > 4096) {
    return [];
  }
  const loops = [];
  let cursor = pathCountIndex + 1;
  for (let pathIndex = 0; pathIndex < pathCount; pathIndex += 1) {
    while (cursor < entityPairs.length && entityPairs[cursor][0] !== '92') {
      cursor += 1;
    }
    if (cursor >= entityPairs.length) {
      break;
    }
    const pathFlags = Number(entityPairs[cursor][1]);
    cursor += 1;
    const loop = [];
    if ((pathFlags & 2) === 2) {
      let closed = true;
      let vertexCount = 0;
      while (cursor < entityPairs.length && entityPairs[cursor][0] !== '93') {
        if (entityPairs[cursor][0] === '73') {
          closed = Number(entityPairs[cursor][1]) === 1;
        }
        cursor += 1;
      }
      if (cursor < entityPairs.length) {
        vertexCount = Number(entityPairs[cursor][1]);
        cursor += 1;
      }
      const vertices = [];
      for (let vertexIndex = 0; vertexIndex < vertexCount; vertexIndex += 1) {
        while (cursor < entityPairs.length && entityPairs[cursor][0] !== '10') {
          cursor += 1;
        }
        if (cursor >= entityPairs.length) {
          break;
        }
        const vertex = { x: Number(entityPairs[cursor][1]), y: 0, bulge: 0 };
        cursor += 1;
        while (cursor < entityPairs.length && !['10', '92', '97'].includes(entityPairs[cursor][0])) {
          const [code, value] = entityPairs[cursor];
          if (code === '20') {
            vertex.y = -Number(value);
          }
          else if (code === '42') {
            vertex.bulge = -Number(value) || 0;
          }
          cursor += 1;
        }
        vertices.push(vertex);
      }
      const segmentCount = closed ? vertices.length : Math.max(0, vertices.length - 1);
      for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
        const start = vertices[segmentIndex];
        const end = vertices[(segmentIndex + 1) % vertices.length];
        sampleHatchBulge(loop, start, end, start.bulge);
      }
    }
    else {
      while (cursor < entityPairs.length && entityPairs[cursor][0] !== '93') {
        cursor += 1;
      }
      const edgeCount = cursor < entityPairs.length ? Number(entityPairs[cursor][1]) : 0;
      cursor += 1;
      for (let edgeIndex = 0; edgeIndex < edgeCount; edgeIndex += 1) {
        while (cursor < entityPairs.length && entityPairs[cursor][0] !== '72') {
          cursor += 1;
        }
        if (cursor >= entityPairs.length) {
          break;
        }
        const edgeType = Number(entityPairs[cursor][1]);
        cursor += 1;
        const edgePairs = [];
        while (cursor < entityPairs.length && !['72', '92', '97'].includes(entityPairs[cursor][0])) {
          edgePairs.push(entityPairs[cursor]);
          cursor += 1;
        }
        sampleDxfHatchEdge(edgeType, edgePairs).forEach((point) => appendDistinctPoint(loop, point));
      }
    }
    if (loop.length > 2 && distance(loop[0], loop[loop.length - 1]) <= SNAP_THRESHOLD) {
      loop.pop();
    }
    if (loop.length >= 3 && Math.abs(polygonSignedArea(loop)) > SNAP_THRESHOLD) {
      loops.push(loop);
    }
  }
  return loops.sort((first, second) =>
    Math.abs(polygonSignedArea(second)) - Math.abs(polygonSignedArea(first)));
}

function parseDxf(text) {
  const rows = text.split(/\r?\n/);
  const pairs = [];
  for (let i = 0; i < rows.length; i += 2) {
    const code = rows[i];
    const value = rows[i + 1];
    if (typeof value === 'undefined') {
      break;
    }
    pairs.push([code.trim(), value.trim()]);
  }

  const layerDefinitions = [];
  let dxfInsUnits = null;
  let dxfTextSize = null;
  let dxfExtMin = null;
  let dxfExtMax = null;
  for (let headerIndex = 0; headerIndex < pairs.length - 1; headerIndex += 1) {
    if (pairs[headerIndex][0] !== '9') {
      continue;
    }
    const variable = pairs[headerIndex][1];
    const record = {};
    for (let valueIndex = headerIndex + 1; valueIndex < pairs.length; valueIndex += 1) {
      const [valueCode, value] = pairs[valueIndex];
      if (valueCode === '9' || valueCode === '0') {
        break;
      }
      record[valueCode] = value;
    }
    if (variable === '$INSUNITS') {
      dxfInsUnits = Number(record['70']);
    }
    if (variable === '$TEXTSIZE') {
      dxfTextSize = Number(record['40']);
    }
    if (variable === '$EXTMIN') {
      dxfExtMin = { x: Number(record['10']), y: Number(record['20']) };
    }
    if (variable === '$EXTMAX') {
      dxfExtMax = { x: Number(record['10']), y: Number(record['20']) };
    }
  }
  const dxfExtents = dxfExtMin && dxfExtMax &&
    Number.isFinite(dxfExtMin.x) && Number.isFinite(dxfExtMin.y) &&
    Number.isFinite(dxfExtMax.x) && Number.isFinite(dxfExtMax.y)
    ? createBounds(
      Math.min(dxfExtMin.x, dxfExtMax.x),
      Math.min(-dxfExtMin.y, -dxfExtMax.y),
      Math.max(dxfExtMin.x, dxfExtMax.x),
      Math.max(-dxfExtMin.y, -dxfExtMax.y),
    )
    : null;
  for (let layerIndex = 0; layerIndex < pairs.length; layerIndex += 1) {
    const [code, value] = pairs[layerIndex];
    if (code !== '0' || value !== 'LAYER') {
      continue;
    }
    const record = {};
    layerIndex += 1;
    while (layerIndex < pairs.length && pairs[layerIndex][0] !== '0') {
      record[pairs[layerIndex][0]] = pairs[layerIndex][1];
      layerIndex += 1;
    }
    layerIndex -= 1;
    if (record['2']) {
      layerDefinitions.push({
        name: record['2'],
        lineStyle: lineStyleFromDxf(record),
        lineType: lineTypeFromDxf(record),
        lineColor: lineColorFromDxf(record),
      });
    }
  }
  const layerDefinitionMap = new Map(
    layerDefinitions.map((layer) => [layer.name.toLowerCase(), layer]),
  );

  const blockDefinitions = [];
  const blocksSection = dxfSectionBounds(pairs, 'BLOCKS');
  if (blocksSection) {
    let blockIndex = blocksSection.start;
    while (blockIndex < blocksSection.end) {
      if (pairs[blockIndex][0] !== '0' || pairs[blockIndex][1] !== 'BLOCK') {
        blockIndex += 1;
        continue;
      }
      const blockRecord = {};
      blockIndex += 1;
      while (blockIndex < blocksSection.end && pairs[blockIndex][0] !== '0') {
        blockRecord[pairs[blockIndex][0]] = pairs[blockIndex][1];
        blockIndex += 1;
      }
      const entityStart = blockIndex;
      while (blockIndex < blocksSection.end && !(
        pairs[blockIndex][0] === '0' && pairs[blockIndex][1] === 'ENDBLK'
      )) {
        blockIndex += 1;
      }
      const name = String(blockRecord['2'] || blockRecord['3'] || '').trim();
      const isInternalBlock = /^\*(?:(?:MODEL|PAPER)_SPACE|D)/i.test(name);
      if (name && !isInternalBlock) {
        const blockEntities = parseDxf(
          dxfBlockEntityText(pairs.slice(entityStart, blockIndex), layerDefinitions),
        );
        const basePoint = {
          x: Number(blockRecord['10'] || 0),
          y: -Number(blockRecord['20'] || 0),
        };
        blockEntities.forEach((entity) => moveEntityByVector(entity, {
          x: -basePoint.x,
          y: -basePoint.y,
        }));
        blockDefinitions.push({ name, revision: 0, entities: [...blockEntities] });
      }
      blockIndex += 1;
    }
  }
  const blockDefinitionMap = new Map(
    blockDefinitions.map((definition) => [definition.name.toLowerCase(), definition]),
  );

  const entities = [];
  let skippedHatchCount = 0;
  let skippedPatternHatchCount = 0;
  const entitiesSection = dxfSectionBounds(pairs, 'ENTITIES');
  let index = entitiesSection?.start || 0;
  const entitiesEnd = entitiesSection?.end || pairs.length;

  while (index < entitiesEnd) {
    const [code, value] = pairs[index];
    if (code === '0' && value === 'POLYLINE') {
      const record = {};
      const vertices = [];
      index += 1;
      while (index < pairs.length && pairs[index][0] !== '0') {
        record[pairs[index][0]] = pairs[index][1];
        index += 1;
      }
      const flags = Number(record['70'] || 0);
      const unsupportedMesh = (flags & 16) === 16 || (flags & 64) === 64;
      while (index < pairs.length && pairs[index][0] === '0' && pairs[index][1] === 'VERTEX') {
        const vertexRecord = {};
        index += 1;
        while (index < pairs.length && pairs[index][0] !== '0') {
          vertexRecord[pairs[index][0]] = pairs[index][1];
          index += 1;
        }
        if (!unsupportedMesh) {
          vertices.push({
            x: Number(vertexRecord['10']),
            y: -Number(vertexRecord['20']),
            startWidth: Number(vertexRecord['40'] ?? record['40']) || 0,
            endWidth: Number(vertexRecord['41'] ?? record['41']) || 0,
            bulge: -Number(vertexRecord['42'] || 0),
          });
        }
      }
      if (index < pairs.length && pairs[index][0] === '0' && pairs[index][1] === 'SEQEND') {
        index += 1;
        while (index < pairs.length && pairs[index][0] !== '0') {
          index += 1;
        }
      }
      if (!unsupportedMesh) {
        const entity = polylineFromDxfVertices(
          vertices,
          record,
          (flags & 1) === 1,
          layerDefinitionMap,
        );
        if (entity) {
          entities.push(entity);
        }
      }
      continue;
    }

    if (code === '0' && value === 'LWPOLYLINE') {
      const record = {};
      const vertices = [];
      let currentVertex = null;
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        if (groupCode === '10') {
          currentVertex = {
            x: Number(groupValue),
            y: 0,
            startWidth: 0,
            endWidth: 0,
            bulge: 0,
          };
          vertices.push(currentVertex);
        }
        else if (currentVertex && groupCode === '20') {
          currentVertex.y = -Number(groupValue);
        }
        else if (currentVertex && groupCode === '40') {
          currentVertex.startWidth = Number(groupValue) || 0;
        }
        else if (currentVertex && groupCode === '41') {
          currentVertex.endWidth = Number(groupValue) || 0;
        }
        else if (currentVertex && groupCode === '42') {
          currentVertex.bulge = -Number(groupValue) || 0;
        }
        else {
          record[groupCode] = groupValue;
        }
        index += 1;
      }
      const entity = polylineFromDxfVertices(
        vertices,
        record,
        (Number(record['70'] || 0) & 1) === 1,
        layerDefinitionMap,
      );
      if (entity) {
        entities.push(entity);
      }
      continue;
    }

    if (code === '0' && value === 'INSERT') {
      const record = {};
      index += 1;
      while (index < entitiesEnd && pairs[index][0] !== '0') {
        record[pairs[index][0]] = pairs[index][1];
        index += 1;
      }
      const name = String(record['2'] || '').trim();
      const definition = blockDefinitionMap.get(name.toLowerCase());
      const insertionPoint = {
        x: Number(record['10'] || 0),
        y: -Number(record['20'] || 0),
      };
      if (definition && Number.isFinite(insertionPoint.x) && Number.isFinite(insertionPoint.y)) {
        entities.push(new BlockReferenceEntity(definition, insertionPoint, {
          ...dxfEntityOptions(record, layerDefinitionMap),
          rotation: Number(record['50'] || 0),
          scaleX: Number(record['41'] || 1),
          scaleY: Number(record['42'] || record['41'] || 1),
        }));
      }
      continue;
    }

    if (code === '0' && value === 'DIMENSION') {
      const record = {};
      index += 1;
      while (index < entitiesEnd && pairs[index][0] !== '0') {
        record[pairs[index][0]] = pairs[index][1];
        index += 1;
      }
      const typeCode = Number(record['70'] || 0) & 7;
      const point = (xCode, yCode) => ({
        x: Number(record[xCode] || 0),
        y: -Number(record[yCode] || 0),
      });
      let placement = typeCode === 3 || typeCode === 4
        ? point('11', '21')
        : point('10', '20');
      const textPosition = record['11'] !== undefined && record['21'] !== undefined
        ? point('11', '21')
        : null;
      let kind = null;
      let definitionPoints = [];
      if (typeCode === 4 || typeCode === 3) {
        kind = typeCode === 4 ? 'radius' : 'diameter';
        const radiusPoint = point('15', '25');
        const circularSource = typeCode === 4
          ? entities
            .flatMap((entity) => primitiveEntityParts(entity))
            .filter((entity) => isCircularEntity(entity) && pointOnCircularEntity(radiusPoint, entity))
            .filter((entity) => Math.abs(distance(entity.center, radiusPoint) - entity.radius) <=
              Math.max(SNAP_THRESHOLD * 10, entity.radius * 1e-6))
            .sort((first, second) =>
              entityDistanceToPoint(first, radiusPoint) - entityDistanceToPoint(second, radiusPoint))[0]
          : null;
        const center = typeCode === 4
          ? circularSource?.center || (record['13'] !== undefined ? point('13', '23') : point('10', '20'))
          : entityMidpoint({ start: point('10', '20'), end: radiusPoint });
        definitionPoints = [center, radiusPoint];
        if (textPosition) {
          const radialDirection = normalizedVector(center, radiusPoint);
          if (radialDirection) {
            const projectedDistance =
              (textPosition.x - center.x) * radialDirection.x +
              (textPosition.y - center.y) * radialDirection.y;
            placement = {
              x: center.x + radialDirection.x * projectedDistance,
              y: center.y + radialDirection.y * projectedDistance,
            };
          }
        }
      }
      else if (typeCode === 2) {
        const firstStart = point('13', '23');
        const firstEnd = point('14', '24');
        const secondStart = point('15', '25');
        const secondEnd = point('16', '26');
        const firstDirection = { x: firstEnd.x - firstStart.x, y: firstEnd.y - firstStart.y };
        const secondDirection = { x: secondEnd.x - secondStart.x, y: secondEnd.y - secondStart.y };
        const vertex = infiniteLineLineIntersection(firstStart, firstDirection, secondStart, secondDirection) || firstStart;
        kind = 'angular';
        definitionPoints = [vertex, firstEnd, secondEnd];
      }
      else {
        const rotation = Number(record['50'] || 0);
        kind = typeCode === 1
          ? 'aligned'
          : Math.abs(Math.abs(rotation) - 90) <= 0.01 ? 'vertical' : 'horizontal';
        definitionPoints = [point('13', '23'), point('14', '24')];
      }
      const styleId = String(record['3'] || '').toLowerCase().replace(/^webcad_/, '');
      if (
        kind &&
        definitionPoints.every((candidate) => Number.isFinite(candidate.x) && Number.isFinite(candidate.y))
      ) {
        entities.push(new DimensionEntity(kind, definitionPoints, placement, {
          ...dxfEntityOptions(record, layerDefinitionMap),
          dimensionStyle: DIMENSION_STYLES[styleId]?.id || 'normal',
          textPosition,
        }));
      }
      continue;
    }

    if (code === '0' && value === 'LINE') {
      const record = {};
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        record[groupCode] = groupValue;
        index += 1;
      }

      const start = {
        x: Number(record['10'] || 0),
        y: -Number(record['20'] || 0),
      };
      const end = {
        x: Number(record['11'] || 0),
        y: -Number(record['21'] || 0),
      };

      if (
        Number.isFinite(start.x) &&
        Number.isFinite(start.y) &&
        Number.isFinite(end.x) &&
        Number.isFinite(end.y)
      ) {
        entities.push(new LineEntity(start, end, dxfEntityOptions(record, layerDefinitionMap)));
      }
      continue;
    }

    if (code === '0' && value === 'CIRCLE') {
      const record = {};
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        record[groupCode] = groupValue;
        index += 1;
      }

      const center = {
        x: Number(record['10'] || 0),
        y: -Number(record['20'] || 0),
      };
      const radius = Number(record['40'] || 0);

      if (
        Number.isFinite(center.x) &&
        Number.isFinite(center.y) &&
        Number.isFinite(radius) &&
        radius > SNAP_THRESHOLD
      ) {
        entities.push(new CircleEntity(
          center,
          radius,
          dxfEntityOptions(record, layerDefinitionMap),
        ));
      }
      continue;
    }

    if (code === '0' && value === 'ARC') {
      const record = {};
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        record[groupCode] = groupValue;
        index += 1;
      }

      const center = {
        x: Number(record['10'] || 0),
        y: -Number(record['20'] || 0),
      };
      const radius = Number(record['40'] || 0);
      const startAngle = dxfDegreesToCanvasAngle(record['51']);
      const endAngle = dxfDegreesToCanvasAngle(record['50']);

      if (
        Number.isFinite(center.x) &&
        Number.isFinite(center.y) &&
        Number.isFinite(radius) &&
        radius > SNAP_THRESHOLD
      ) {
        entities.push(new ArcEntity(
          center,
          radius,
          startAngle,
          endAngle,
          dxfEntityOptions(record, layerDefinitionMap),
        ));
      }
      continue;
    }

    if (code === '0' && value === 'TEXT') {
      const record = {};
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        record[groupCode] = groupValue;
        index += 1;
      }

      const insertionPoint = {
        x: Number(record['10'] || 0),
        y: -Number(record['20'] || 0),
      };
      const height = Number(record['40'] || 0);
      if (
        Number.isFinite(insertionPoint.x) &&
        Number.isFinite(insertionPoint.y) &&
        Number.isFinite(height) &&
        height > SNAP_THRESHOLD &&
        record['1']
      ) {
        entities.push(new TextEntity(insertionPoint, record['1'], height, {
          ...dxfEntityOptions(record, layerDefinitionMap),
          angle: Number(record['50'] || 0),
        }));
      }
      continue;
    }

    if (code === '0' && value === 'HATCH') {
      const record = {};
      const hatchPairs = [];
      index += 1;
      while (index < pairs.length) {
        const [groupCode, groupValue] = pairs[index];
        if (groupCode === '0') {
          break;
        }
        hatchPairs.push(pairs[index]);
        record[groupCode] = groupValue;
        index += 1;
      }
      const hatchPattern = String(record['2'] || '').trim().toUpperCase();
      const isSolidHatch = Number(record['70']) === 1 || hatchPattern === 'SOLID';
      if (!isSolidHatch) {
        skippedPatternHatchCount += 1;
        continue;
      }
      const loops = parseDxfHatchLoops(hatchPairs);
      const boundary = loops[0] || [];
      const extentSpan = dxfExtents
        ? Math.max(dxfExtents.maxX - dxfExtents.minX, dxfExtents.maxY - dxfExtents.minY)
        : 0;
      const hatchValidationBounds = dxfExtents
        ? expandBounds(dxfExtents, Math.max(extentSpan * 0.1, 1))
        : null;
      if (boundary.length >= 3 && loops.every((loop) => loop.every((point) =>
        Number.isFinite(point.x) && Number.isFinite(point.y) &&
        (!hatchValidationBounds || (
          point.x >= hatchValidationBounds.minX && point.x <= hatchValidationBounds.maxX &&
          point.y >= hatchValidationBounds.minY && point.y <= hatchValidationBounds.maxY
        ))))) {
        entities.push(new HatchEntity(
          boundary,
          { ...dxfEntityOptions(record, layerDefinitionMap), loops },
        ));
      }
      else {
        skippedHatchCount += 1;
      }
      continue;
    }

    index += 1;
  }

  entities.layerDefinitions = layerDefinitions;
  entities.blockDefinitions = blockDefinitions;
  entities.drawingExtents = dxfExtents;
  entities.skippedHatchCount = skippedHatchCount;
  entities.skippedPatternHatchCount = skippedPatternHatchCount;
  const textHeights = entities
    .filter((entity) => entity.type === 'TEXT' && Number.isFinite(entity.height) && entity.height > 0)
    .map((entity) => entity.height)
    .sort((first, second) => first - second);
  const typicalTextHeight = Number.isFinite(dxfTextSize) && dxfTextSize > 0
    ? dxfTextSize
    : textHeights.length ? textHeights[Math.floor(textHeights.length * 0.5)] : null;
  const looksArchitectural = Number.isFinite(typicalTextHeight) && typicalTextHeight <= 1;
  entities.drawingProfile = dxfInsUnits === DRAWING_PROFILES.architecture.dxfInsUnits || looksArchitectural
    ? 'architecture'
    : dxfInsUnits === DRAWING_PROFILES.engineering.dxfInsUnits ? 'engineering' : null;
  entities.drawingProfileDetected = looksArchitectural &&
    dxfInsUnits !== DRAWING_PROFILES.architecture.dxfInsUnits;
  return entities;
}

class CadRenderer {
  constructor(canvas, doc, state) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.doc = doc;
    this.state = state;
  }

  viewportWidth() {
    return this.canvas.width / CANVAS_SCALE;
  }

  viewportHeight() {
    return this.canvas.height / CANVAS_SCALE;
  }

  visibleWorldWidth(scale = this.state.viewScale) {
    return this.viewportWidth() / scale;
  }

  visibleWorldHeight(scale = this.state.viewScale) {
    return this.viewportHeight() / scale;
  }

  visibleWorldBounds(padding = 0) {
    const bounds = createBounds(
      this.state.viewOffset.x,
      this.state.viewOffset.y,
      this.state.viewOffset.x + this.visibleWorldWidth(),
      this.state.viewOffset.y + this.visibleWorldHeight(),
    );
    return padding ? expandBounds(bounds, padding) : bounds;
  }

  displayLineWidth(entityOrStyle) {
    const styleId = typeof entityOrStyle === 'string'
      ? entityOrStyle
      : entityOrStyle?.lineStyle;
    return this.state.lineWeightDisplayEnabled ? getLineStyle(styleId).width : 2;
  }

  worldToScreen(point) {
    return {
      x: (point.x - this.state.viewOffset.x) * this.state.viewScale,
      y: (point.y - this.state.viewOffset.y) * this.state.viewScale,
    };
  }

  screenToWorld(point) {
    return {
      x: point.x / this.state.viewScale + this.state.viewOffset.x,
      y: point.y / this.state.viewScale + this.state.viewOffset.y,
    };
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(Math.round(rect.width * CANVAS_SCALE), 320 * CANVAS_SCALE);
    this.canvas.height = Math.max(Math.round(rect.height * CANVAS_SCALE), 320 * CANVAS_SCALE);
    this.canvas.style.width = `${this.canvas.width / CANVAS_SCALE}px`;
    this.canvas.style.height = `${this.canvas.height / CANVAS_SCALE}px`;

    if (!this.state.hasInitializedView) {
      this.state.hasInitializedView = true;
      this.fitToDefaultDrawing();
    }

    this.draw();
  }

  fitBounds(bounds, padding = FIT_PADDING) {
    const width = Math.max(bounds.maxX - bounds.minX, GRID_BASE * 8);
    const height = Math.max(bounds.maxY - bounds.minY, GRID_BASE * 8);
    const availableWidth = Math.max(this.viewportWidth() - padding * 2, 120);
    const availableHeight = Math.max(this.viewportHeight() - padding * 2, 120);

    this.state.viewScale = clamp(
      Math.min(availableWidth / width, availableHeight / height),
      MIN_VIEW_SCALE,
      MAX_VIEW_SCALE,
    );

    this.state.viewOffset = {
      x: bounds.minX - (this.visibleWorldWidth() - width) * 0.5,
      y: bounds.minY - (this.visibleWorldHeight() - height) * 0.5,
    };
  }

  fitToDefaultDrawing() {
    this.fitBounds(createBounds(0, 0, DEFAULT_DRAWING_SIZE, DEFAULT_DRAWING_SIZE));
  }

  fitToDocument() {
    const bounds = this.doc.bounds();
    if (!bounds) {
      this.fitToDefaultDrawing();
      if (this.state.mouseScreen) {
        this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
      }
      this.draw();
      return;
    }
    this.fitBounds(bounds);

    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
    }

    this.draw();
  }

  zoom(nextScale, anchorScreenPoint) {
    const clampedScale = clamp(nextScale, MIN_VIEW_SCALE, MAX_VIEW_SCALE);
    if (Math.abs(clampedScale - this.state.viewScale) < SNAP_THRESHOLD) {
      return false;
    }

    const anchor = anchorScreenPoint || {
      x: this.viewportWidth() * 0.5,
      y: this.viewportHeight() * 0.5,
    };
    const anchorWorld = this.screenToWorld(anchor);

    this.state.viewScale = clampedScale;
    this.state.viewOffset = {
      x: anchorWorld.x - anchor.x / this.state.viewScale,
      y: anchorWorld.y - anchor.y / this.state.viewScale,
    };

    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
    }

    this.draw();
    return true;
  }

  drawGrid(ctx) {
    const minorStep = this.computeGridStep();
    const majorStep = minorStep * 5;
    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    const drawGridFamily = (step, color, lineWidth) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      const startX = Math.floor(worldLeft / step) * step;
      for (let x = startX; x <= worldRight + step; x += step) {
        ctx.moveTo(x, worldTop);
        ctx.lineTo(x, worldBottom);
      }

      const startY = Math.floor(worldTop / step) * step;
      for (let y = startY; y <= worldBottom + step; y += step) {
        ctx.moveTo(worldLeft, y);
        ctx.lineTo(worldRight, y);
      }
      ctx.stroke();
    };

    drawGridFamily(minorStep, 'rgba(32, 63, 71, 0.055)', 0.8 / this.state.viewScale);
    drawGridFamily(majorStep, 'rgba(32, 63, 71, 0.12)', 1 / this.state.viewScale);
  }

  computeGridStep() {
    let step = GRID_BASE;
    while (step * this.state.viewScale < 18) {
      step *= 2;
    }
    while (step * this.state.viewScale > 120 && step > GRID_BASE) {
      step /= 2;
    }
    return step;
  }

  drawAxes(ctx) {
    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    ctx.lineWidth = 1.4 / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';

    ctx.beginPath();
    ctx.strokeStyle = Y_AXIS_COLOR;
    ctx.moveTo(0, worldTop);
    ctx.lineTo(0, worldBottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = X_AXIS_COLOR;
    ctx.moveTo(worldLeft, 0);
    ctx.lineTo(worldRight, 0);
    ctx.stroke();
  }

  drawLineStroke(ctx, entity, options) {
    const lineWidth = options.width / this.state.viewScale;
    const length = entity.length();
    if (length <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.moveTo(entity.start.x, entity.start.y);
    ctx.lineTo(entity.end.x, entity.end.y);
    ctx.stroke();
    ctx.restore();
  }

  drawCircleStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.arc(entity.center.x, entity.center.y, entity.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawArcStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.arc(
      entity.center.x,
      entity.center.y,
      entity.radius,
      entity.startAngle,
      entity.endAngle,
      entity.clockwise === false,
    );
    ctx.stroke();
    ctx.restore();
  }

  drawPolylineStroke(ctx, entity, options) {
    let hasVariableWidth = false;
    entity.segments.forEach((segment, index) => {
      const geometry = polylineSegmentEntity(entity, index);
      if (!geometry) {
        return;
      }
      const startWidth = Math.max(0, segment.startWidth || 0);
      const endWidth = Math.max(0, segment.endWidth || 0);
      if (startWidth <= SNAP_THRESHOLD && endWidth <= SNAP_THRESHOLD) {
        if (geometry.type === 'ARC') {
          this.drawArcStroke(ctx, geometry, options);
        }
        else {
          this.drawLineStroke(ctx, geometry, options);
        }
        return;
      }
      hasVariableWidth = true;

      const sampleCount = geometry.type === 'ARC'
        ? clamp(Math.ceil(geometry.length() * this.state.viewScale / 8), 8, 160)
        : 1;
      const left = [];
      const right = [];
      for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
        const parameter = sampleIndex / sampleCount;
        let point;
        let tangent;
        if (geometry.type === 'ARC') {
          point = pointAtCircularParameter(geometry, parameter);
          const angle = angleOfPoint(geometry.center, point);
          tangent = geometry.clockwise === false
            ? { x: Math.sin(angle), y: -Math.cos(angle) }
            : { x: -Math.sin(angle), y: Math.cos(angle) };
        }
        else {
          point = pointAtLineParameter(geometry, parameter);
          const segmentLength = geometry.length();
          tangent = {
            x: (geometry.end.x - geometry.start.x) / segmentLength,
            y: (geometry.end.y - geometry.start.y) / segmentLength,
          };
        }
        const halfWidth = (startWidth + (endWidth - startWidth) * parameter) * 0.5;
        const normal = { x: -tangent.y, y: tangent.x };
        left.push({ x: point.x + normal.x * halfWidth, y: point.y + normal.y * halfWidth });
        right.push({ x: point.x - normal.x * halfWidth, y: point.y - normal.y * halfWidth });
      }
      ctx.save();
      ctx.fillStyle = options.color;
      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      left.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      [...right].reverse().forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    if (!hasVariableWidth) {
      return;
    }
    entity.vertices.forEach((point, index) => {
      const previousIndex = index - 1 >= 0
        ? index - 1
        : entity.closed ? entity.segments.length - 1 : -1;
      const nextIndex = index < entity.segments.length ? index : -1;
      const radius = Math.max(
        previousIndex >= 0 ? entity.segments[previousIndex].endWidth * 0.5 : 0,
        nextIndex >= 0 ? entity.segments[nextIndex].startWidth * 0.5 : 0,
      );
      if (radius <= SNAP_THRESHOLD) {
        return;
      }
      ctx.save();
      ctx.fillStyle = options.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    });
  }

  drawTextStroke(ctx, entity, options) {
    if (!entity.text || entity.height <= SNAP_THRESHOLD) {
      return;
    }
    ctx.save();
    ctx.translate(entity.insertionPoint.x, entity.insertionPoint.y);
    ctx.rotate(-entity.angle * Math.PI / 180);
    ctx.fillStyle = options.color;
    ctx.font = `${entity.height}px ${CAD_TEXT_FONT}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(entity.text, 0, 0);
    ctx.restore();
  }

  drawDimensionEntity(ctx, entity, options = {}) {
    const geometry = dimensionGeometry(entity);
    const color = options.color || entity.color || LINE_COLOR;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = (options.width ?? 1.25) / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    geometry.lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
    geometry.arcs.forEach((arc) => {
      ctx.beginPath();
      ctx.arc(arc.center.x, arc.center.y, arc.radius, arc.startAngle, arc.endAngle, arc.counterclockwise);
      ctx.stroke();
    });
    geometry.arrows.forEach((arrow) => {
      ctx.beginPath();
      ctx.moveTo(arrow[0].x, arrow[0].y);
      ctx.lineTo(arrow[1].x, arrow[1].y);
      ctx.lineTo(arrow[2].x, arrow[2].y);
      ctx.closePath();
      ctx.fill();
    });
    ctx.translate(geometry.text.point.x, geometry.text.point.y);
    ctx.rotate(geometry.text.angle);
    ctx.font = `${geometry.text.height}px ${CAD_TEXT_FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(geometry.text.value, 0, 0);
    ctx.restore();
  }

  drawHatchFill(ctx, entity, options = {}) {
    const loops = entity.loops || [entity.boundary];
    if (!loops.some((loop) => loop.length >= 3)) {
      return;
    }
    ctx.save();
    ctx.beginPath();
    loops.forEach((loop) => {
      if (loop.length < 3) {
        return;
      }
      let lastDrawnPoint = null;
      loop.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
          lastDrawnPoint = point;
        }
        else if (
          !options.minPointPixels ||
          index === loop.length - 1 ||
          distance(lastDrawnPoint, point) * this.state.viewScale >= options.minPointPixels
        ) {
          ctx.lineTo(point.x, point.y);
          lastDrawnPoint = point;
        }
      });
      ctx.closePath();
    });
    ctx.fillStyle = options.color || entity.color;
    ctx.globalAlpha = options.alpha ?? activeDrawingProfile().hatchOpacity;
    ctx.fill('evenodd');
    if (options.outline) {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = options.color || entity.color;
      ctx.lineWidth = 1.5 / this.state.viewScale;
      ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBlockReference(ctx, reference, options = {}) {
    for (const entity of reference.expandedEntities()) {
      const bounds = entity.bounds();
      const pixelSpan = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) *
        this.state.viewScale;
      if (options.simplified && (
        pixelSpan < 0.75 ||
        (entity.type === 'TEXT' && entity.height * this.state.viewScale < 4)
      )) {
        continue;
      }
      const style = getLineStyle(entity.lineStyle);
      const color = options.color || entity.color || style.color;
      const width = options.width ?? this.displayLineWidth(entity);
      if (entity.type === 'LINE') {
        this.drawLineStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'ARC') {
        this.drawArcStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'POLYLINE') {
        this.drawPolylineStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'TEXT') {
        this.drawTextStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'HATCH') {
        this.drawHatchFill(ctx, entity, {
          color,
          alpha: options.alpha,
          outline: options.outline,
        });
      }
      if (entity.type === 'DIMENSION') {
        this.drawDimensionEntity(ctx, entity, { color, width: options.width });
      }
    }
  }

  drawEntityOverlay(ctx, entity, options = {}) {
    if (!entity) {
      return;
    }
    const color = options.color || PREVIEW_COLOR;
    const width = options.width ?? this.displayLineWidth(entity);
    if (entity.type === 'LINE') {
      this.drawLineStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'CIRCLE') {
      this.drawCircleStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'ARC') {
      this.drawArcStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'POLYLINE') {
      this.drawPolylineStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'TEXT') {
      this.drawTextStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'DIMENSION') {
      this.drawDimensionEntity(ctx, entity, { color, width });
    }
    if (entity.type === 'HATCH') {
      this.drawHatchFill(ctx, entity, {
        color,
        alpha: options.alpha ?? 0.28,
        outline: options.outline,
      });
    }
    if (entity.type === 'INSERT') {
      this.drawBlockReference(ctx, entity, {
        color,
        width,
        alpha: options.alpha ?? 0.28,
        outline: options.outline,
      });
    }
  }

  isExtendBoundary(entity) {
    if (this.state.tool !== 'extend') {
      return false;
    }
    return this.state.extendDraft?.boundaries?.includes(entity) || (
      this.state.extendDraft?.phase === 'boundaries' &&
      this.doc.isSelected(entity)
    );
  }

  drawHighlightedEntity(ctx, entity, color, widthBoost = 1.5) {
    if (!entity) {
      return;
    }
    this.drawEntityOverlay(ctx, entity, {
      color,
      width: Math.max(3, this.displayLineWidth(entity) + widthBoost),
      alpha: entity.type === 'HATCH' ? 0.42 : 0.28,
      outline: entity.type === 'HATCH',
    });
  }

  entityPixelSpan(entity) {
    const bounds = entity.bounds();
    return Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) * this.state.viewScale;
  }

  appendLodGeometry(batch, entity) {
    if (entity.type === 'LINE' || entity.type === 'CIRCLE' || entity.type === 'ARC') {
      batch.push(entity);
      return;
    }
    if (entity.type === 'POLYLINE') {
      entity.segments.forEach((_, index) => {
        const geometry = polylineSegmentEntity(entity, index);
        if (geometry) {
          batch.push(geometry);
        }
      });
    }
  }

  drawLodBatches(ctx, batches) {
    ctx.save();
    ctx.lineWidth = 1.15 / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const [color, geometries] of batches) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      geometries.forEach((geometry) => {
        if (geometry.type === 'LINE') {
          ctx.moveTo(geometry.start.x, geometry.start.y);
          ctx.lineTo(geometry.end.x, geometry.end.y);
        }
        else if (geometry.type === 'CIRCLE') {
          ctx.moveTo(geometry.center.x + geometry.radius, geometry.center.y);
          ctx.arc(geometry.center.x, geometry.center.y, geometry.radius, 0, TWO_PI);
        }
        else if (geometry.type === 'ARC') {
          const start = pointAtCircleAngle(geometry, geometry.startAngle);
          ctx.moveTo(start.x, start.y);
          ctx.arc(
            geometry.center.x,
            geometry.center.y,
            geometry.radius,
            geometry.startAngle,
            geometry.endAngle,
            geometry.clockwise === false,
          );
        }
      });
      ctx.stroke();
    }
    ctx.restore();
  }

  drawEntities(ctx) {
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    const visibleEntities = this.doc.queryBounds(viewBounds);
    const simplified = visibleEntities.length >= 6000;
    const verySimplified = visibleEntities.length >= 24000;
    const minimumGeometryPixels = verySimplified ? 1.1 : 0.55;
    for (const entity of visibleEntities) {
      if (entity.type !== 'HATCH' || this.doc.isSelected(entity) ||
          !boundsIntersectsBounds(entity.bounds(), viewBounds) ||
          (simplified && this.entityPixelSpan(entity) < minimumGeometryPixels)) {
        continue;
      }
      this.drawHatchFill(ctx, entity, {
        color: entity.color,
        minPointPixels: simplified ? (verySimplified ? 2.5 : 1.5) : 0,
      });
    }

    const lodBatches = new Map();
    for (const entity of visibleEntities) {
      if (this.doc.isSelected(entity)) {
        continue;
      }
      if (entity.type === 'HATCH') {
        continue;
      }
      if (!boundsIntersectsBounds(entity.bounds(), viewBounds)) {
        continue;
      }
      const style = getLineStyle(entity.lineStyle);
      const displayWidth = this.displayLineWidth(entity);
      const entityColor = entity.color || style.color;
      if (
        simplified &&
        ['LINE', 'CIRCLE', 'ARC', 'POLYLINE'].includes(entity.type)
      ) {
        if (this.entityPixelSpan(entity) >= minimumGeometryPixels) {
          if (!lodBatches.has(entityColor)) {
            lodBatches.set(entityColor, []);
          }
          this.appendLodGeometry(lodBatches.get(entityColor), entity);
        }
        continue;
      }
      if (entity.type === 'LINE') {
        this.drawLineStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'ARC') {
        this.drawArcStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'POLYLINE') {
        this.drawPolylineStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'TEXT') {
        if (!simplified || entity.height * this.state.viewScale >= (verySimplified ? 5 : 3)) {
          this.drawTextStroke(ctx, entity, { color: entityColor, width: displayWidth });
        }
      }
      if (entity.type === 'DIMENSION') {
        if (!simplified || this.entityPixelSpan(entity) >= 5) {
          this.drawDimensionEntity(ctx, entity, { color: entityColor });
        }
        if (this.state.dimensionDraft?.phase === 'placement') {
          this.drawDimensionGrips(ctx, entity, { color: PREVIEW_COLOR, passive: true });
        }
      }
      if (entity.type === 'INSERT') {
        if (!simplified || this.entityPixelSpan(entity) >= minimumGeometryPixels) {
          this.drawBlockReference(ctx, entity, { simplified });
        }
      }
    }
    if (simplified) {
      this.drawLodBatches(ctx, lodBatches);
    }

    if (this.state.tool === 'extend') {
      const boundaryEntities = this.state.extendDraft?.phase === 'boundaries'
        ? [...this.doc.selectedEntities]
        : this.state.extendDraft?.boundaries || [];
      for (const boundaryEntity of boundaryEntities) {
        if (!boundaryEntity || !boundsIntersectsBounds(boundaryEntity.bounds(), viewBounds)) {
          continue;
        }
        this.drawHighlightedEntity(ctx, boundaryEntity, PREVIEW_COLOR, 2);
      }
    }

    const filletFirstEntity = this.state.filletDraft?.firstEntity;
    if (filletFirstEntity && boundsIntersectsBounds(filletFirstEntity.bounds(), viewBounds)) {
      this.drawHighlightedEntity(ctx, filletFirstEntity, PREVIEW_COLOR, 2);
    }

    const hoveredEntity = this.state.hoveredEntity;
    if (hoveredEntity && !this.doc.isSelected(hoveredEntity)) {
      for (const entity of this.doc.expandEntityGroups([hoveredEntity])) {
        if (!this.doc.isSelected(entity) && boundsIntersectsBounds(entity.bounds(), viewBounds)) {
          this.drawHighlightedEntity(ctx, entity, PREVIEW_COLOR, 2);
        }
      }
    }

    for (const selectedEntity of this.doc.selectedEntities) {
      if (!selectedEntity || !boundsIntersectsBounds(selectedEntity.bounds(), viewBounds)) {
        continue;
      }
      if (this.isExtendBoundary(selectedEntity)) {
        continue;
      }
      if (selectedEntity?.type === 'LINE') {
        this.drawLineStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawLineGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'CIRCLE') {
        this.drawCircleStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawCircleGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'ARC') {
        this.drawArcStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawCircleGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'POLYLINE') {
        this.drawPolylineStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawPolylineGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'TEXT') {
        this.drawTextStroke(ctx, selectedEntity, { color: SELECTED_COLOR, width: 1 });
        this.drawTextGrip(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'DIMENSION') {
        this.drawDimensionEntity(ctx, selectedEntity, { color: SELECTED_COLOR, width: 2.25 });
        this.drawDimensionGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'HATCH') {
        this.drawHatchFill(ctx, selectedEntity, {
          color: SELECTED_COLOR,
          alpha: 0.35,
          outline: true,
        });
        this.drawHatchGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'INSERT') {
        this.drawBlockReference(ctx, selectedEntity, {
          color: SELECTED_COLOR,
          width: Math.max(3, this.displayLineWidth(selectedEntity) + 1),
          alpha: 0.35,
          outline: true,
        });
        this.drawBlockGrip(ctx, selectedEntity);
      }
    }
  }

  drawTextGrip(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.beginPath();
    ctx.rect(
      entity.insertionPoint.x - gripSize * 0.5,
      entity.insertionPoint.y - gripSize * 0.5,
      gripSize,
      gripSize,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawDimensionGrips(ctx, entity, options = {}) {
    const gripSize = 7 / this.state.viewScale;
    const color = options.color || SELECTED_COLOR;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    for (const candidate of dimensionReferencePoints(entity)) {
      const active = (
        this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key
      ) || (
        this.state.activeObjectSnap?.entity === entity &&
        this.state.activeObjectSnap?.key === candidate.key
      );
      ctx.fillStyle = active
        ? color
        : options.passive ? 'rgba(255, 255, 255, 0.82)' : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        candidate.point.x - gripSize * 0.5,
        candidate.point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBlockGrip(ctx, entity) {
    const gripSize = 9 / this.state.viewScale;
    const active = this.state.selectedGrip?.entity === entity;
    ctx.save();
    ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.beginPath();
    ctx.rect(
      entity.insertionPoint.x - gripSize * 0.5,
      entity.insertionPoint.y - gripSize * 0.5,
      gripSize,
      gripSize,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawLineGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;

    for (const key of ['start', 'end']) {
      const point = entity[key];
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === key;

      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawPolylineGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    for (const candidate of polylineReferencePoints(entity)) {
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        candidate.point.x - gripSize * 0.5,
        candidate.point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawHatchGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    entity.gripIndices.forEach((index) => {
      const point = entity.boundary[index];
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.index === index;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  drawCircleGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;

    for (const candidate of circularReferencePoints(entity)) {
      const point = candidate.point;
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawObjectSnapMarker(ctx) {
    const snap = this.state.activeObjectSnap;
    const visibleForTool = (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      (this.state.tool === 'copy' && !this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && !this.state.moveDraft?.selecting) ||
      (this.state.tool === 'rotate' && !this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'block-create' && !this.state.blockCreateDraft?.selecting) ||
      this.state.tool === 'block-insert' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'trim' ||
      DIMENSION_TOOLS.has(this.state.tool) ||
      Boolean(this.state.selectedGrip)
    );
    if (!snap || !visibleForTool) {
      return;
    }

    const size = SNAP_MARKER_SIZE / this.state.viewScale;
    const point = snap.point;

    ctx.save();
    ctx.strokeStyle = SNAP_COLOR;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.lineWidth = 2.4 / this.state.viewScale;
    ctx.shadowColor = 'rgba(208, 90, 31, 0.28)';
    ctx.shadowBlur = 5 / this.state.viewScale;

    if (snap.type === 'midpoint') {
      const height = size;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - height * 0.62);
      ctx.lineTo(point.x + size * 0.66, point.y + height * 0.46);
      ctx.lineTo(point.x - size * 0.66, point.y + height * 0.46);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    else if (snap.type === 'intersection') {
      const half = size * 0.48;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.moveTo(point.x + half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.stroke();
    }
    else if (snap.type === 'perpendicular') {
      const half = size * 0.42;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.stroke();
    }
    else if (snap.type === 'center') {
      const half = size * 0.46;
      ctx.beginPath();
      ctx.arc(point.x, point.y, half, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point.x - half * 0.72, point.y);
      ctx.lineTo(point.x + half * 0.72, point.y);
      ctx.moveTo(point.x, point.y - half * 0.72);
      ctx.lineTo(point.x, point.y + half * 0.72);
      ctx.stroke();
    }
    else {
      ctx.beginPath();
      ctx.rect(point.x - size * 0.5, point.y - size * 0.5, size, size);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawPreview(ctx) {
    if (!this.state.mouseWorld) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    const activeLineTypeDash = profileLineTypeDash(activeLineTypeId());
    const previewDash = activeLineTypeDash.length ? activeLineTypeDash : [10, 8];
    ctx.setLineDash(previewDash.map((length) => length / this.state.viewScale));
    const activeStyle = getLineStyle(activeLineStyleId());
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = this.displayLineWidth(activeLineStyleId()) / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.state.pendingLineStart) {
      let endPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (inputDistance !== null) {
        const distancePoint = pointFromDistance(
          this.state.pendingLineStart,
          endPoint,
          inputDistance,
        );
        if (distancePoint) {
          endPoint = distancePoint;
        }
      }

      ctx.moveTo(this.state.pendingLineStart.x, this.state.pendingLineStart.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(this.state.pendingLineStart.x, this.state.pendingLineStart.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.state.polylineDraft?.vertices.length) {
      const draft = this.state.polylineDraft;
      let previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const origin = activeDraftOrigin(this.state);
      const coordinateTarget = pointFromRelativeCoordinates(origin, this.state.distanceInput);
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (coordinateTarget) {
        previewPoint = coordinateTarget;
      }
      else if (inputDistance !== null) {
        previewPoint = pointFromDistance(origin, previewPoint, inputDistance) || previewPoint;
      }
      const previewOptions = {
        layer: activeLayerName(),
        lineStyle: activeLineStyleId(),
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      };
      if (draft.segments.length) {
        const committedPreview = new PolylineEntity(
          draft.vertices,
          draft.segments,
          previewOptions,
        );
        ctx.setLineDash([]);
        this.drawPolylineStroke(ctx, committedPreview, {
          color: committedPreview.color || activeStyle.color,
          width: this.displayLineWidth(activeLineStyleId()),
        });
        ctx.setLineDash(previewDash.map((length) => length / this.state.viewScale));
      }
      const start = draft.vertices[draft.vertices.length - 1];
      let activeSegment = null;
      let activeEnd = previewPoint;
      if (draft.mode === 'line') {
        activeSegment = { type: 'LINE', center: null };
      }
      else if (draft.mode === 'arc-end') {
        const arcGeometry = polylineTangentArcToPoint(draft, start, previewPoint);
        activeSegment = {
          type: 'ARC',
          center: arcGeometry.center,
          clockwise: arcGeometry.clockwise,
        };
      }
      if (activeSegment && distance(start, activeEnd) > SNAP_THRESHOLD) {
        const activePreview = new PolylineEntity(
          [start, activeEnd],
          [{
            ...activeSegment,
            startWidth: draft.startWidth,
            endWidth: draft.endWidth,
          }],
          previewOptions,
        );
        this.drawPolylineStroke(ctx, activePreview, {
          color: PREVIEW_COLOR,
          width: this.displayLineWidth(activeLineStyleId()),
        });
      }
      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...draft.vertices, activeEnd]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, TWO_PI);
        ctx.fill();
      }
    }

    if (this.state.rectangleDraft?.firstPoint) {
      let oppositePoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const coordinateTarget = pointFromRelativeCoordinates(
        this.state.rectangleDraft.firstPoint,
        this.state.distanceInput,
      );
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (coordinateTarget) {
        oppositePoint = coordinateTarget;
      }
      else if (inputDistance !== null) {
        const distancePoint = pointFromDistance(
          this.state.rectangleDraft.firstPoint,
          oppositePoint,
          inputDistance,
        );
        if (distancePoint) {
          oppositePoint = distancePoint;
        }
      }

      const bounds = normalizeBoundsFromPoints(this.state.rectangleDraft.firstPoint, oppositePoint);
      ctx.beginPath();
      ctx.rect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [this.state.rectangleDraft.firstPoint, oppositePoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.circleDraft?.points.length) {
      const previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const points = this.state.circleDraft.points;
      let previewCircle = null;

      if (this.state.circleDraft.mode === 'center-radius' && points.length === 1) {
        const inputDistance = parseDistanceInput(this.state.distanceInput);
        const radius = inputDistance !== null
          ? inputDistance
          : distance(points[0], previewPoint);
        if (radius > SNAP_THRESHOLD) {
          previewCircle = { center: points[0], radius };
        }
      }

      if (this.state.circleDraft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewCircle = circleFromThreePoints(points[0], points[1], previewPoint);
          if (!previewCircle) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.lineTo(previewPoint.x, previewPoint.y);
            ctx.stroke();
          }
        }
      }

      if (previewCircle) {
        ctx.beginPath();
        ctx.arc(previewCircle.center.x, previewCircle.center.y, previewCircle.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.arcDraft?.points.length) {
      const previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const draft = this.state.arcDraft;
      const points = draft.points;
      let previewArc = null;

      if (draft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromThreePoints(points[0], points[1], previewPoint);
        }
      }

      if (draft.mode === 'center-start-end') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromCenterStartEnd(points[0], points[1], previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.stroke();
        }
      }

      if (draft.mode === 'center-radius') {
        if (points.length === 1) {
          const inputDistance = parseDistanceInput(this.state.distanceInput);
          const radius = inputDistance !== null
            ? inputDistance
            : distance(points[0], previewPoint);
          if (radius > SNAP_THRESHOLD) {
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, radius, 0, TWO_PI);
            ctx.stroke();
          }
        }
        if (points.length === 2 && draft.radius) {
          const startPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(startPoint.x, startPoint.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[0].x, points[0].y, draft.radius, 0, TWO_PI);
          ctx.stroke();
        }
        if (points.length === 3 && draft.radius) {
          const endPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          previewArc = arcFromCenterStartEnd(points[0], points[2], endPoint);
        }
      }

      if (previewArc) {
        ctx.beginPath();
        ctx.arc(
          previewArc.center.x,
          previewArc.center.y,
          previewArc.radius,
          previewArc.startAngle,
          previewArc.endAngle,
        );
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.textDraft?.text) {
      const insertionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const previewText = new TextEntity(
        insertionPoint,
        this.state.textDraft.text,
        this.state.textDraft.height,
        { angle: 0 },
      );
      this.drawTextStroke(ctx, previewText, { color: PREVIEW_COLOR, width: 1 });
      ctx.setLineDash([]);
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(insertionPoint.x, insertionPoint.y, 4 / this.state.viewScale, 0, TWO_PI);
      ctx.fill();
    }

    if (this.state.hatchDraft) {
      const markerPoint = this.state.mouseWorld;
      const markerSize = 8 / this.state.viewScale;
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(208, 90, 31, 0.16)';
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 2 / this.state.viewScale;
      ctx.beginPath();
      ctx.rect(
        markerPoint.x - markerSize * 0.5,
        markerPoint.y - markerSize * 0.5,
        markerSize,
        markerSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    if (this.state.blockInsertDraft) {
      const insertionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const draft = this.state.blockInsertDraft;
      const preview = new BlockReferenceEntity(draft.definition, insertionPoint, {
        rotation: draft.rotation,
        scaleX: draft.scale,
        scaleY: draft.scale,
        layer: activeLayerName(),
        lineStyle: activeLineStyleId(),
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      });
      this.drawBlockReference(ctx, preview, {
        color: PREVIEW_COLOR,
        alpha: 0.25,
        outline: true,
      });
      ctx.setLineDash([]);
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(insertionPoint.x, insertionPoint.y, 4 / this.state.viewScale, 0, TWO_PI);
      ctx.fill();
    }

    if (this.state.dimensionDraft) {
      const draft = this.state.dimensionDraft;
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      if (draft.phase === 'placement') {
        const placement = dimensionPlacementPoint(draft, cursor, this.state);
        const preview = dimensionDraftEntity(draft, placement);
        if (preview) {
          this.drawDimensionEntity(ctx, preview, { color: PREVIEW_COLOR, width: 1.5 });
        }
      }
      else {
        const guidePoints = [...draft.points, cursor].filter(Boolean);
        ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
        ctx.strokeStyle = PREVIEW_COLOR;
        ctx.lineWidth = 1.5 / this.state.viewScale;
        if (draft.firstLine) {
          ctx.beginPath();
          ctx.moveTo(draft.firstLine.start.x, draft.firstLine.start.y);
          ctx.lineTo(draft.firstLine.end.x, draft.firstLine.end.y);
          ctx.stroke();
        }
        if (guidePoints.length > 1) {
          ctx.beginPath();
          ctx.moveTo(guidePoints[0].x, guidePoints[0].y);
          guidePoints.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    }

    ctx.setLineDash([]);
    ctx.restore();
  }

  drawGripMovePreview(ctx) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return;
    }

    const origin = gripPoint(this.state.selectedGrip);
    const coordinateTarget = pointFromRelativeCoordinates(origin, this.state.distanceInput);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance === null && !coordinateTarget) {
      return;
    }

    const referencePoint = gripReferencePoint(this.state.selectedGrip);
    const directionPoint = resolvePointForState(this.state.mouseWorld, this.state, referencePoint);
    const targetPoint = coordinateTarget || pointFromDistance(origin, directionPoint, inputDistance);
    if (!targetPoint) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6 / this.state.viewScale, 6 / this.state.viewScale]);
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 1.8 / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(targetPoint.x, targetPoint.y);
    ctx.stroke();
    ctx.restore();
  }

  copyPreviewTargetPoint() {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const coordinateTarget = pointFromRelativeCoordinates(copyDraft.basePoint, this.state.distanceInput);
    if (coordinateTarget) {
      return coordinateTarget;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(copyDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  movePreviewTargetPoint() {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const coordinateTarget = pointFromRelativeCoordinates(moveDraft.basePoint, this.state.distanceInput);
    if (coordinateTarget) {
      return coordinateTarget;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(moveDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  drawCopyPreview(ctx) {
    const draft = this.state.copyDraft || this.state.moveDraft;
    const targetPoint = this.state.copyDraft ? this.copyPreviewTargetPoint() : this.movePreviewTargetPoint();
    if (!draft?.basePoint || !targetPoint) {
      return;
    }

    const vector = {
      x: targetPoint.x - draft.basePoint.x,
      y: targetPoint.y - draft.basePoint.y,
    };

    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of draft.sourceEntities) {
      if (!boundsIntersectsBounds(offsetBounds(entity.bounds(), vector), viewBounds)) {
        continue;
      }
      const preview = cloneEntityWithOffset(entity, vector);
      if (!preview) {
        continue;
      }

      this.drawEntityOverlay(ctx, preview, {
        color: PREVIEW_COLOR,
        alpha: 0.28,
        outline: true,
      });
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  rotatePreviewAngle() {
    const draft = this.state.rotateDraft;
    if (!draft?.basePoint || !this.state.mouseWorld) {
      return null;
    }
    const inputAngle = parseAngleInput(this.state.distanceInput);
    if (inputAngle !== null) {
      return inputAngle;
    }
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    return rotationAngleFromPoint(draft.basePoint, cursor, this.state.orthoEnabled);
  }

  drawRotatePreview(ctx) {
    const draft = this.state.rotateDraft;
    const angle = this.rotatePreviewAngle();
    if (!draft?.basePoint || angle === null) {
      return;
    }

    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of draft.sourceEntities) {
      const preview = cloneEntity(entity);
      if (!preview || !rotateEntityByAngle(preview, draft.basePoint, angle) ||
          !boundsIntersectsBounds(preview.bounds(), viewBounds)) {
        continue;
      }
      this.drawHighlightedEntity(ctx, preview, PREVIEW_COLOR, 0);
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    if (cursor) {
      const inputAngle = parseAngleInput(this.state.distanceInput);
      const rayPoint = inputAngle === null
        ? cursor
        : rotatePointAround(
            { x: draft.basePoint.x + distance(draft.basePoint, cursor), y: draft.basePoint.y },
            draft.basePoint,
            inputAngle,
          );
      ctx.beginPath();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 1.5 / this.state.viewScale;
      ctx.moveTo(draft.basePoint.x, draft.basePoint.y);
      ctx.lineTo(rayPoint.x, rayPoint.y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.fillStyle = PREVIEW_COLOR;
    ctx.beginPath();
    ctx.arc(draft.basePoint.x, draft.basePoint.y, 4 / this.state.viewScale, 0, TWO_PI);
    ctx.fill();
    ctx.restore();
  }

  drawSelectionWindow(ctx) {
    const selectionWindow = this.state.selectionWindow;
    if (!selectionWindow?.currentWorld) {
      return;
    }

    const bounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    if (Math.abs(width) <= SNAP_THRESHOLD || Math.abs(height) <= SNAP_THRESHOLD) {
      return;
    }

    const mode = selectionWindowMode(selectionWindow);
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.minX, bounds.minY, width, height);
    ctx.fillStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.10)'
      : 'rgba(208, 90, 31, 0.10)';
    ctx.strokeStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.80)'
      : 'rgba(208, 90, 31, 0.85)';
    ctx.lineWidth = 1.5 / this.state.viewScale;
    if (mode === 'capture') {
      ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawCrosshair(ctx) {
    if (
      !this.state.mouseWorld ||
      this.state.tool === 'select' ||
      this.state.tool === 'select-set' ||
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting) ||
      (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) ||
      (this.state.dimensionDraft &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'))
    ) {
      return;
    }

    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    const point = resolveCursorPoint(this.state.mouseWorld, this.state);

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(182, 77, 31, 0.18)';
    ctx.lineWidth = 1 / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.moveTo(point.x, worldTop);
    ctx.lineTo(point.x, worldBottom);
    ctx.moveTo(worldLeft, point.y);
    ctx.lineTo(worldRight, point.y);
    ctx.stroke();
    ctx.restore();
  }

  draw() {
    const ctx = this.ctx;
    const transformScale = CANVAS_SCALE * this.state.viewScale;
    const translateX = -this.state.viewOffset.x * transformScale;
    const translateY = -this.state.viewOffset.y * transformScale;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.setTransform(transformScale, 0, 0, transformScale, translateX, translateY);
    if (this.state.snapEnabled) {
      this.drawGrid(ctx);
      this.drawAxes(ctx);
    }
    this.drawCrosshair(ctx);
    this.drawEntities(ctx);
    this.drawPreview(ctx);
    this.drawGripMovePreview(ctx);
    this.drawCopyPreview(ctx);
    this.drawRotatePreview(ctx);
    this.drawSelectionWindow(ctx);
    this.drawObjectSnapMarker(ctx);
  }
}

class CadController {
  constructor(canvas, doc, renderer, state) {
    this.canvas = canvas;
    this.doc = doc;
    this.renderer = renderer;
    this.state = state;
    this.panState = null;
    this.gripDragState = null;
    this.shortcutPrefix = null;
    this.shortcutTimer = null;
    this.lastTextPointerDown = null;
    this.lastHatchPointerDown = null;
    this.lastBlockPointerDown = null;
    this.keyboardRefreshFrame = null;

    this.canvas.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    this.canvas.addEventListener('pointerleave', () => this.onPointerLeave());
    window.addEventListener('pointerup', (event) => this.onPointerUp(event));
    window.addEventListener('pointercancel', (event) => this.onPointerUp(event));
    this.canvas.addEventListener('wheel', (event) => this.onWheel(event), { passive: false });
    this.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
    window.addEventListener('resize', () => this.renderer.resize());
  }

  getMouseScreenPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  updateMouse(event) {
    this.state.mouseScreen = this.getMouseScreenPosition(event);
    this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    return this.state.mouseWorld;
  }

  resolveInputPoint(point) {
    return resolveCursorPoint(point, this.state);
  }

  clearShortcutPrefix() {
    if (this.shortcutTimer) {
      clearTimeout(this.shortcutTimer);
    }
    this.shortcutPrefix = null;
    this.shortcutTimer = null;
    this.lastTextPointerDown = null;
    this.lastHatchPointerDown = null;
    this.lastBlockPointerDown = null;
  }

  armShortcutPrefix(prefix) {
    if (this.shortcutTimer) {
      clearTimeout(this.shortcutTimer);
    }
    this.shortcutPrefix = prefix;
    this.shortcutTimer = setTimeout(() => {
      if (this.shortcutPrefix === prefix) {
        this.clearShortcutPrefix();
      }
    }, 420);
  }

  cancelKeyboardRefresh() {
    if (this.keyboardRefreshFrame !== null) {
      cancelAnimationFrame(this.keyboardRefreshFrame);
      this.keyboardRefreshFrame = null;
    }
  }

  scheduleKeyboardRefresh() {
    this.updateCursorInput();
    statusMessage.textContent = this.state.statusText || 'Listo';
    if (this.keyboardRefreshFrame !== null) {
      return;
    }
    this.keyboardRefreshFrame = requestAnimationFrame(() => {
      this.keyboardRefreshFrame = null;
      this.renderer.draw();
    });
  }

  handleShortcutSequence(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }

    const key = event.key.toLowerCase();
    if (this.shortcutPrefix === 'd') {
      this.clearShortcutPrefix();
      if (key === 's') {
        event.preventDefault();
        runCommand('select-set');
        return true;
      }
      return false;
    }

    if (this.shortcutPrefix === 'c') {
      this.clearShortcutPrefix();
      if (key === 'i') {
        event.preventDefault();
        runCommand('circle-center');
        return true;
      }
      return false;
    }

    if (this.shortcutPrefix === 'r') {
      this.clearShortcutPrefix();
      if (key === 'c') {
        event.preventDefault();
        runCommand('rectangle');
        return true;
      }
      return false;
    }

    if (key === 'r') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('trim');
      this.armShortcutPrefix('r');
      return true;
    }

    if (key === 'c') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('copy');
      this.armShortcutPrefix('c');
      return true;
    }

    if (key === 'd') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('move');
      this.armShortcutPrefix('d');
      return true;
    }

    return false;
  }

  setTool(tool) {
    this.cancelKeyboardRefresh();
    this.state.tool = tool;
    this.state.pendingLineStart = null;
    this.state.polylineDraft = null;
    this.state.rectangleDraft = null;
    this.state.textDraft = null;
    this.state.hatchDraft = null;
    this.state.circleDraft = null;
    this.state.arcDraft = null;
    this.state.copyDraft = null;
    this.state.moveDraft = null;
    this.state.rotateDraft = null;
    this.state.filletDraft = tool === 'fillet'
      ? { firstEntity: null, firstPick: null }
      : null;
    this.state.selectionSetDraft = null;
    this.state.eraseDraft = null;
    this.state.explodeDraft = null;
    this.state.extendDraft = null;
    this.state.blockCreateDraft = null;
    this.state.blockInsertDraft = null;
    this.state.dimensionDraft = null;
    this.state.distanceInput = '';
    this.state.selectedGrip = null;
    this.state.activeObjectSnap = null;
    this.state.hoveredEntity = null;
    this.state.selectionWindow = null;
    this.gripDragState = null;
    if (
      tool === 'line' ||
      tool === 'polyline' ||
      tool === 'rectangle' ||
      tool === 'text' ||
      tool === 'hatch' ||
      tool === 'circle-center' ||
      tool === 'circle-3p' ||
      tool === 'arc-center-radius' ||
      tool === 'arc-3p' ||
      tool === 'arc-center-start-end' ||
      tool === 'block-create' ||
      tool === 'block-insert' ||
      DIMENSION_TOOLS.has(tool) ||
      tool === 'copy' ||
      tool === 'move' ||
      tool === 'rotate' ||
      tool === 'select-set' ||
      tool === 'trim' ||
      tool === 'fillet' ||
      tool === 'extend' ||
      tool === 'erase' ||
      tool === 'explode'
    ) {
      if (tool !== 'copy' && tool !== 'move' && tool !== 'rotate' && tool !== 'select-set' && tool !== 'erase' && tool !== 'explode' && tool !== 'extend' && tool !== 'block-create') {
        this.doc.selectEntity(null);
      }
    }
    filletRadiusControl.hidden = tool !== 'fillet';
    if (tool === 'fillet') {
      syncFilletRadiusControl();
    }
    this.state.statusText = tool === 'select'
      ? 'Seleccionar entidad'
      : tool === 'trim'
        ? 'Recortar: pique el tramo a eliminar'
        : tool === 'fillet'
          ? `Empalme R${formatNumber(activeFilletRadius())}: seleccione la primera linea`
        : tool === 'extend'
          ? 'Alargar: seleccione limites'
        : tool === 'erase'
          ? 'Borrar: seleccione objetos y confirme'
        : tool === 'explode'
          ? 'Descomponer: seleccione bloques o polilineas y confirme'
          : tool === 'copy'
            ? 'Copiar: indique punto origen'
            : tool === 'move'
              ? 'Desplazar: indique punto origen'
                : tool === 'rotate'
                  ? 'Girar: indique punto base'
                : tool === 'block-create'
                  ? 'Crear bloque: seleccione objetos'
                : tool === 'block-insert'
                  ? 'Insertar bloque: indique punto de insercion'
                : tool === 'text'
                  ? 'Texto: indique contenido y altura'
                  : tool === 'select-set'
                    ? 'Seleccionar conjunto: elija objetos y confirme'
                    : tool === 'hatch'
                      ? 'Sombreado: configure sus propiedades'
          : tool === 'circle-center'
            ? 'Circulo: indique centro'
            : tool === 'circle-3p'
              ? 'Circulo 3 puntos: indique primer punto'
              : tool === 'arc-center-radius'
                ? 'Arco centro-radio: indique centro'
                : tool === 'arc-3p'
                  ? 'Arco 3 puntos: indique primer punto'
                  : tool === 'arc-center-start-end'
                    ? 'Arco centro-inicio-final: indique centro'
                    : tool === 'rectangle'
                      ? 'Rectangulo: indique primera esquina'
                      : tool === 'polyline'
                        ? 'Polilinea: indique primer punto'
                      : 'Linea por dos puntos';
    selectToolButton.classList.toggle('is-active', tool === 'select');
    lineToolButton.classList.toggle('is-active', tool === 'line');
    polylineToolButton.classList.toggle('is-active', tool === 'polyline');
    rectangleToolButton.classList.toggle('is-active', tool === 'rectangle');
    textToolButton.classList.toggle('is-active', tool === 'text');
    hatchToolButton.classList.toggle('is-active', tool === 'hatch');
    circleToolButton.classList.toggle('is-active', tool === 'circle-center' || tool === 'circle-3p');
    arcToolButton.classList.toggle(
      'is-active',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    blockToolButton.classList.toggle('is-active', tool === 'block-create' || tool === 'block-insert');
    trimToolButton.classList.toggle('is-active', tool === 'trim');
    filletToolButton.classList.toggle('is-active', tool === 'fillet');
    extendToolButton.classList.toggle('is-active', tool === 'extend');
    copyToolButton.classList.toggle('is-active', tool === 'copy');
    moveToolButton.classList.toggle('is-active', tool === 'move');
    rotateToolButton.classList.toggle('is-active', tool === 'rotate');
    eraseToolButton.classList.toggle('is-active', tool === 'erase');
    explodeToolButton.classList.toggle('is-active', tool === 'explode');
    dimensionToolButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    this.canvas.classList.toggle('is-select-tool', tool === 'select');
    this.canvas.classList.toggle(
      'is-line-tool',
      tool === 'line' || tool === 'polyline' || tool === 'rectangle' || DIMENSION_TOOLS.has(tool),
    );
    this.canvas.classList.toggle('is-text-tool', tool === 'text');
    this.canvas.classList.toggle('is-hatch-tool', tool === 'hatch');
    this.canvas.classList.toggle('is-circle-tool', tool === 'circle-center' || tool === 'circle-3p');
    this.canvas.classList.toggle(
      'is-arc-tool',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    this.canvas.classList.toggle('is-trim-tool', tool === 'trim' || tool === 'fillet');
    this.canvas.classList.toggle('is-extend-tool', tool === 'extend');
    this.canvas.classList.toggle('is-copy-tool', tool === 'copy' && this.state.copyDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle('is-rotate-tool', tool === 'rotate' && this.state.rotateDraft?.selecting);
    this.canvas.classList.toggle('is-selection-set-tool', tool === 'select-set');
    this.canvas.classList.toggle(
      'is-dimension-select-tool',
      DIMENSION_TOOLS.has(tool) && Boolean(this.state.dimensionDraft) &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'),
    );
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting) ||
        (tool === 'rotate' && this.state.rotateDraft && !this.state.rotateDraft.selecting) ||
        (tool === 'block-create' && this.state.blockCreateDraft && !this.state.blockCreateDraft.selecting) ||
        (tool === 'block-insert' && this.state.blockInsertDraft),
    );
    this.canvas.classList.toggle('is-erase-tool', tool === 'erase');
    this.canvas.classList.toggle('is-explode-tool', tool === 'explode');
    this.updateUiStatus();
    this.renderer.draw();
  }

  findEntityAt(point) {
    const tolerance = 7 / this.state.viewScale;
    const pickBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const candidates = this.doc.queryBounds(pickBounds);
    const pickCandidates = [
      ...candidates.filter((entity) => entity.type === 'HATCH'),
      ...candidates.filter((entity) => entity.type !== 'HATCH'),
    ];
    for (let index = pickCandidates.length - 1; index >= 0; index -= 1) {
      const entity = pickCandidates[index];
      if (entity.type === 'LINE' &&
          distancePointToSegment(point, entity.start, entity.end) <= tolerance) {
        return entity;
      }
      if (entity.type === 'CIRCLE' && distancePointToCircle(point, entity) <= tolerance) {
        return entity;
      }
      if (entity.type === 'ARC' && distancePointToArc(point, entity) <= tolerance) {
        return entity;
      }
      if (entity.type === 'POLYLINE' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'TEXT' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'HATCH' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'DIMENSION' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'INSERT' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
    }
    return null;
  }

  isEntityHoverSelectionActive() {
    if (this.state.selectionWindow || this.gripDragState || this.panState) {
      return false;
    }
    if (this.state.tool === 'select') {
      return !this.state.selectedGrip;
    }
    if (this.state.tool === 'trim') {
      return true;
    }
    if (this.state.tool === 'fillet') {
      return true;
    }
    if (this.state.tool === 'select-set') {
      return Boolean(this.state.selectionSetDraft?.selecting);
    }
    if (this.state.tool === 'block-create') {
      return Boolean(this.state.blockCreateDraft?.selecting);
    }
    if (this.state.tool === 'copy') {
      return Boolean(this.state.copyDraft?.selecting);
    }
    if (this.state.tool === 'move') {
      return Boolean(this.state.moveDraft?.selecting);
    }
    if (this.state.tool === 'rotate') {
      return Boolean(this.state.rotateDraft?.selecting);
    }
    if (this.state.tool === 'erase') {
      return Boolean(this.state.eraseDraft?.selecting);
    }
    if (this.state.tool === 'explode') {
      return Boolean(this.state.explodeDraft?.selecting);
    }
    if (this.state.tool === 'extend') {
      return this.state.extendDraft?.phase === 'boundaries' ||
        this.state.extendDraft?.phase === 'targets';
    }
    if (DIMENSION_TOOLS.has(this.state.tool)) {
      return this.state.dimensionDraft?.phase === 'reference' ||
        this.state.dimensionDraft?.phase === 'second-line';
    }
    return false;
  }

  updateHoveredEntity() {
    this.state.hoveredEntity = this.isEntityHoverSelectionActive() && this.state.mouseWorld
      ? this.findEntityAt(this.state.mouseWorld)
      : null;
  }

  onPointerLeave() {
    if (!this.state.hoveredEntity) {
      return;
    }
    this.state.hoveredEntity = null;
    this.renderer.draw();
  }

  updateCanvasCursorMode() {
    this.canvas.classList.toggle('is-copy-tool', this.state.tool === 'copy' && this.state.copyDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', this.state.tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle('is-rotate-tool', this.state.tool === 'rotate' && this.state.rotateDraft?.selecting);
    this.canvas.classList.toggle('is-explode-tool', this.state.tool === 'explode');
    this.canvas.classList.toggle(
      'is-dimension-select-tool',
      DIMENSION_TOOLS.has(this.state.tool) && Boolean(this.state.dimensionDraft) &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'),
    );
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (this.state.tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (this.state.tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting) ||
        (this.state.tool === 'rotate' && this.state.rotateDraft && !this.state.rotateDraft.selecting) ||
        (this.state.tool === 'block-create' && this.state.blockCreateDraft && !this.state.blockCreateDraft.selecting) ||
        (this.state.tool === 'block-insert' && this.state.blockInsertDraft),
    );
  }

  isIdleForCommandRepeat() {
    return this.state.tool === 'select' &&
      !this.state.pendingLineStart &&
      !this.state.polylineDraft &&
      !this.state.circleDraft &&
      !this.state.arcDraft &&
      !this.state.textDraft &&
      !this.state.hatchDraft &&
      !this.state.copyDraft &&
      !this.state.moveDraft &&
      !this.state.rotateDraft &&
      !this.state.filletDraft &&
      !this.state.selectionSetDraft &&
      !this.state.eraseDraft &&
      !this.state.explodeDraft &&
      !this.state.extendDraft &&
      !this.state.blockCreateDraft &&
      !this.state.blockInsertDraft &&
      !this.state.dimensionDraft &&
      !this.state.selectionWindow &&
      !this.state.selectedGrip &&
      !this.gripDragState &&
      !this.state.distanceInput;
  }

  repeatLastCommand() {
    if (!this.state.lastCommand || !REPEATABLE_COMMANDS.has(this.state.lastCommand)) {
      this.state.statusText = 'No hay comando anterior';
      return true;
    }

    runCommand(this.state.lastCommand);
    this.state.statusText = `Repetido: ${commandLabel(this.state.lastCommand)}`;
    return true;
  }

  cancelCurrentCommand() {
    const clearCommandSelection = this.state.tool === 'copy' || this.state.tool === 'select-set';
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'block-create' ||
      this.state.tool === 'block-insert' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'rotate' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.pendingLineStart ||
      this.state.polylineDraft ||
      this.state.rectangleDraft ||
      this.state.textDraft ||
      this.state.hatchDraft ||
      this.state.circleDraft ||
      this.state.arcDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.rotateDraft ||
      this.state.filletDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
    ) {
      this.setTool('select');
      if (clearCommandSelection) {
        this.doc.clearSelection();
      }
      this.state.statusText = 'Cancelado';
      return true;
    }

    this.state.selectedGrip = null;
    this.doc.selectEntity(null);
    this.state.distanceInput = '';
    this.gripDragState = null;
    this.state.statusText = 'Seleccion limpiada';
    return false;
  }

  handleCommandEnter() {
    if (this.state.tool === 'block-create' && this.state.blockCreateDraft?.selecting) {
      return this.confirmBlockCreateSelection();
    }
    if (this.state.tool === 'copy' && this.state.copyDraft?.selecting) {
      return this.confirmCopySelection();
    }
    if (this.state.tool === 'copy' && this.state.copyDraft?.basePoint && !this.state.distanceInput) {
      this.setTool('select');
      this.doc.clearSelection();
      this.state.statusText = 'Copiar terminado';
      return true;
    }
    if (this.state.tool === 'move' && this.state.moveDraft?.selecting) {
      return this.confirmMoveSelection();
    }
    if (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) {
      return this.confirmRotateSelection();
    }
    if (this.state.tool === 'select-set' && this.state.selectionSetDraft?.selecting) {
      return this.confirmSelectionSet();
    }
    if (this.state.rotateDraft?.basePoint) {
      if (this.state.distanceInput) {
        return this.handleDistanceInputKey({ key: 'Enter' });
      }
      return this.rotateSelectionBy(this.renderer.rotatePreviewAngle());
    }
    if (this.state.tool === 'erase' && this.state.eraseDraft?.selecting) {
      return this.confirmEraseSelection();
    }
    if (this.state.tool === 'explode' && this.state.explodeDraft?.selecting) {
      return this.confirmExplodeSelection();
    }
    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'boundaries') {
      return this.confirmExtendBoundaries();
    }
    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'targets') {
      this.setTool('select');
      this.doc.clearSelection();
      this.state.statusText = 'Alargar terminado';
      return true;
    }
    if (this.state.distanceInput && this.handleDistanceInputKey({ key: 'Enter' })) {
      return true;
    }
    if (this.state.dimensionDraft?.phase === 'placement' && this.state.mouseWorld) {
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      return this.createDimensionAt(dimensionPlacementPoint(
        this.state.dimensionDraft,
        cursor,
        this.state,
      ));
    }
    if (this.state.pendingLineStart && this.state.tool === 'line') {
      this.setTool('select');
      this.state.statusText = 'Linea terminada';
      return true;
    }
    if (this.state.tool === 'polyline' && this.state.polylineDraft) {
      return this.finishPolyline(false);
    }
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'rotate' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.circleDraft ||
      this.state.polylineDraft ||
      this.state.rectangleDraft ||
      this.state.textDraft ||
      this.state.hatchDraft ||
      this.state.arcDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.rotateDraft ||
      this.state.filletDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
    ) {
      this.setTool('select');
      this.state.statusText = 'Orden terminada';
      return true;
    }

    if (this.isIdleForCommandRepeat()) {
      return this.repeatLastCommand();
    }

    return false;
  }

  findGripAt(point) {
    const tolerance = 8 / this.state.viewScale;
    const gripBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const nearbyEntities = this.doc.queryBounds(gripBounds);
    const candidates = this.doc.selectedEntity
      ? [this.doc.selectedEntity, ...nearbyEntities.filter((entity) => entity !== this.doc.selectedEntity)]
      : nearbyEntities;

    for (const entity of candidates) {
      if (entity.type === 'HATCH') {
        for (const index of entity.gripIndices) {
          if (distance(point, entity.boundary[index]) <= tolerance) {
            return { entity, key: 'boundary', index };
          }
        }
        continue;
      }
      if (entity.type === 'INSERT') {
        if (distance(point, entity.insertionPoint) <= tolerance) {
          return { entity, key: 'insertionPoint' };
        }
        continue;
      }
      if (isCircularEntity(entity)) {
        for (const candidate of circularReferencePoints(entity)) {
          if (distance(point, candidate.point) <= tolerance) {
            return { entity, key: candidate.key };
          }
        }
        continue;
      }
      if (entity.type === 'POLYLINE') {
        for (const candidate of polylineReferencePoints(entity)) {
          if (distance(point, candidate.point) <= tolerance) {
            return { entity, key: candidate.key };
          }
        }
        continue;
      }
      if (entity.type === 'DIMENSION') {
        const nearestGrip = dimensionReferencePoints(entity)
          .map((candidate) => ({ ...candidate, distance: distance(point, candidate.point) }))
          .filter((candidate) => candidate.distance <= tolerance)
          .sort((first, second) => first.distance - second.distance)[0];
        if (nearestGrip) {
          return { entity, key: nearestGrip.key };
        }
        continue;
      }
      if (entity.type !== 'LINE') {
        continue;
      }

      for (const key of ['start', 'end']) {
        if (distance(point, entity[key]) <= tolerance) {
          return { entity, key };
        }
      }
    }

    return null;
  }

  activeGripPoint() {
    return gripPoint(this.state.selectedGrip);
  }

  activeGripReferencePoint() {
    return gripReferencePoint(this.state.selectedGrip) || this.activeGripPoint();
  }

  activeGripLinkedPoints() {
    const grip = this.state.selectedGrip;
    const gripPoint = this.activeGripPoint();
    if (!grip || !gripPoint || !grip.entity.groupId) {
      return gripPoint ? [gripPoint] : [];
    }

    const linkedPoints = new Set([gripPoint]);
    for (const entity of this.doc.groupEntities(grip.entity)) {
      if (entity.type !== 'LINE') {
        continue;
      }
      for (const key of ['start', 'end']) {
        if (distance(entity[key], gripPoint) <= SNAP_THRESHOLD) {
          linkedPoints.add(entity[key]);
        }
      }
    }
    return [...linkedPoints];
  }

  moveActiveGripPointTo(targetPoint) {
    const grip = this.state.selectedGrip;
    const gripPoint = this.activeGripPoint();
    if (!grip || !gripPoint || !targetPoint || distance(gripPoint, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }

    if (grip.entity.type === 'HATCH') {
      moveHatchGrip(grip.entity, grip.index, targetPoint);
      this.doc.markDirty();
      return true;
    }
    if (grip.entity.type === 'INSERT') {
      grip.entity.insertionPoint = { ...targetPoint };
      this.doc.markDirty();
      return true;
    }
    if (isCircularEntity(grip.entity)) {
      const moved = moveCircularGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }
    if (grip.entity.type === 'POLYLINE') {
      const moved = movePolylineGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }
    if (grip.entity.type === 'DIMENSION') {
      const moved = moveDimensionGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }

    for (const point of this.activeGripLinkedPoints()) {
      point.x = targetPoint.x;
      point.y = targetPoint.y;
    }
    this.doc.markDirty();
    return true;
  }

  resolveGripTarget(point) {
    const axisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    return resolvePointForState(
      point,
      this.state,
      this.activeGripReferencePoint(),
      axisLine ? { axisLine } : {},
    );
  }

  moveSelectedGripTo(point) {
    if (!this.state.selectedGrip || !point) {
      return false;
    }

    const targetPoint = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(point, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : point;
    const target = this.resolveGripTarget(targetPoint);
    if (!target) {
      return false;
    }

    const constrainedTarget = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(target, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : target;
    const gripPoint = this.activeGripPoint();
    if (!gripPoint || distance(gripPoint, constrainedTarget) <= SNAP_THRESHOLD) {
      return false;
    }
    if (this.gripDragState && !this.gripDragState.historyRecorded) {
      this.doc.recordHistory();
      this.gripDragState.historyRecorded = true;
    }
    return this.moveActiveGripPointTo(constrainedTarget);
  }

  moveSelectedGripByDistance(distanceValue) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return false;
    }

    const origin = this.activeGripPoint();
    const directionPoint = this.resolveGripTarget(this.state.mouseWorld);
    const targetPoint = pointFromDistance(origin, directionPoint, distanceValue);
    if (!targetPoint) {
      return false;
    }

    if (distance(origin, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }
    this.doc.recordHistory();
    this.moveActiveGripPointTo(targetPoint);
    this.state.statusText = `Punto desplazado ${formatNumber(distanceValue)} ${UNITS_LABEL}`;
    return true;
  }

  rememberSelectionSet(entities = [...this.doc.selectedEntities]) {
    const validEntities = this.doc.expandEntityGroups(entities)
      .filter((entity) => this.doc.entities.includes(entity));
    if (!validEntities.length) {
      return false;
    }
    this.state.previousSelection = [...new Set(validEntities)];
    return true;
  }

  previousSelectionEntities() {
    const validEntities = this.doc.expandEntityGroups(this.state.previousSelection || [])
      .filter((entity) => this.doc.entities.includes(entity));
    this.state.previousSelection = [...new Set(validEntities)];
    return this.state.previousSelection;
  }

  recallPreviousSelection() {
    const entities = this.previousSelectionEntities();
    if (!entities.length) {
      this.state.statusText = 'No hay seleccion previa disponible';
      return false;
    }

    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'targets') {
      return this.extendEntities(entities) > 0;
    }
    if (this.state.tool === 'select') {
      this.doc.selectEntities(entities);
    }
    else if (
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting) ||
      (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'erase' && this.state.eraseDraft?.selecting) ||
      (this.state.tool === 'explode' && this.state.explodeDraft?.selecting) ||
      (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'boundaries') ||
      this.state.tool === 'select-set'
    ) {
      this.doc.addSelectedEntities(entities);
    }
    else {
      this.state.statusText = 'La orden actual no espera una seleccion';
      return false;
    }

    this.state.statusText = `${entities.length} entidad${entities.length === 1 ? '' : 'es'} recuperada${entities.length === 1 ? '' : 's'} de la seleccion previa`;
    return true;
  }

  startSelectionSet() {
    const currentSelection = [...this.doc.selectedEntities];
    this.setTool('select-set');
    if (currentSelection.length) {
      this.doc.selectEntities(currentSelection);
    }
    this.state.selectionSetDraft = { selecting: true };
    this.state.statusText = currentSelection.length
      ? `${currentSelection.length} entidad${currentSelection.length === 1 ? '' : 'es'} seleccionada${currentSelection.length === 1 ? '' : 's'} - seleccione mas o confirme`
      : 'Seleccionar conjunto: elija objetos y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmSelectionSet() {
    if (!this.state.selectionSetDraft?.selecting || !this.doc.selectedEntities.size) {
      this.state.statusText = 'Seleccione al menos una entidad';
      return false;
    }
    this.rememberSelectionSet();
    const count = this.state.previousSelection.length;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.selectedGrip = null;
    this.state.statusText = `Seleccion memorizada: ${count} entidad${count === 1 ? '' : 'es'}`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startText() {
    this.setTool('text');
    openTextDialog();
    return true;
  }

  startHatch() {
    this.setTool('hatch');
    openHatchDialog();
    return true;
  }

  startBlockCreate() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('block-create');
    this.state.blockCreateDraft = {
      sourceEntities,
      selecting: !sourceEntities.length,
      name: null,
    };
    if (sourceEntities.length) {
      this.doc.selectEntities(sourceEntities);
      openBlockCreateDialog();
    }
    else {
      this.state.statusText = 'Crear bloque: seleccione objetos y confirme';
    }
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmBlockCreateSelection() {
    if (!this.state.blockCreateDraft?.selecting) {
      return false;
    }
    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para crear el bloque';
      return false;
    }
    this.rememberSelectionSet(sourceEntities);
    this.state.blockCreateDraft = {
      sourceEntities,
      selecting: false,
      name: null,
    };
    openBlockCreateDialog();
    return true;
  }

  createBlockAt(basePoint) {
    const draft = this.state.blockCreateDraft;
    if (!draft?.name || !draft.sourceEntities.length || !basePoint) {
      return false;
    }
    const localEntities = cloneEntitiesWithOffset(
      draft.sourceEntities,
      { x: -basePoint.x, y: -basePoint.y },
    );
    if (!localEntities.length) {
      this.state.statusText = 'No se pudo crear la definicion del bloque';
      return false;
    }
    this.doc.recordHistory();
    const definition = { name: draft.name, revision: 0, entities: localEntities };
    this.doc.blockDefinitions.set(definition.name.toLowerCase(), definition);
    const reference = new BlockReferenceEntity(definition, basePoint, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    this.doc.replaceEntities(draft.sourceEntities, [reference], { recordHistory: false });
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `Bloque ${definition.name} creado`;
    return true;
  }

  startBlockInsert() {
    const hasInsertableBlock = [...this.doc.blockDefinitions.values()].some((definition) =>
      definition.name.toLowerCase() !== String(this.doc.editingBlockName || '').toLowerCase());
    if (!hasInsertableBlock) {
      this.state.statusText = 'No hay bloques definidos en el dibujo';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }
    this.setTool('block-insert');
    openBlockInsertDialog();
    return true;
  }

  insertBlockAt(insertionPoint) {
    const draft = this.state.blockInsertDraft;
    const definition = draft?.definition;
    if (!definition || !insertionPoint) {
      return false;
    }
    this.doc.addEntity(new BlockReferenceEntity(definition, insertionPoint, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
      rotation: draft.rotation,
      scaleX: draft.scale,
      scaleY: draft.scale,
    }));
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `Bloque ${definition.name} insertado`;
    return true;
  }

  createHatch(boundary) {
    if (!boundary || boundary.length < 3 || Math.abs(polygonSignedArea(boundary)) <= SNAP_THRESHOLD) {
      this.state.statusText = 'No se encontro un contorno cerrado valido';
      return false;
    }
    const draft = this.state.hatchDraft;
    const layer = this.state.layers.find((candidate) => candidate.name === draft?.layer) ||
      activeLayerDefinition();
    this.doc.addEntity(new HatchEntity(boundary, {
      layer: layer.name,
      lineStyle: layer.lineStyle,
      lineType: layer.lineType,
      lineColor: draft?.lineColor || layer.lineColor,
    }));
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = 'Sombreado solido creado';
    return true;
  }

  createTextAt(insertionPoint) {
    const draft = this.state.textDraft;
    if (!draft?.text || !insertionPoint || draft.height <= SNAP_THRESHOLD) {
      return false;
    }
    const entity = new TextEntity(insertionPoint, draft.text, draft.height, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    this.doc.addEntity(entity);
    this.state.lastTextHeight = draft.height;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `Texto creado - altura ${formatNumber(entity.height)} ${UNITS_LABEL}`;
    return true;
  }

  startCopy() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.state.lastCopy = null;
    this.setTool('copy');
    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Copiar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startMove() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('move');
    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Desplazar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startRotate() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('rotate');
    this.state.rotateDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Girar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`
      : 'Girar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startErase() {
    const selectedCount = this.doc.selectedEntities.size;
    if (selectedCount) {
      this.rememberSelectionSet();
    }
    this.setTool('erase');
    this.state.eraseDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Borrar ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} - seleccione mas o confirme`
      : 'Borrar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startExplode() {
    const selectedCount = this.doc.selectedEntities.size;
    if (selectedCount) {
      this.rememberSelectionSet();
    }
    this.setTool('explode');
    this.state.explodeDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Descomponer ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} - seleccione mas o confirme`
      : 'Descomponer: seleccione bloques o polilineas y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startExtend() {
    const selectedBoundaries = [...this.doc.selectedEntities];
    if (selectedBoundaries.length) {
      this.rememberSelectionSet(selectedBoundaries);
    }
    this.setTool('extend');
    if (selectedBoundaries.length) {
      this.doc.selectEntities(selectedBoundaries);
    }
    this.state.extendDraft = {
      phase: 'boundaries',
      boundaries: selectedBoundaries,
    };
    this.state.statusText = selectedBoundaries.length
      ? `Alargar: ${selectedBoundaries.length} limite${selectedBoundaries.length === 1 ? '' : 's'} seleccionado${selectedBoundaries.length === 1 ? '' : 's'} - confirme o seleccione mas`
      : 'Alargar: seleccione limites y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmCopySelection() {
    if (!this.state.copyDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para copiar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmMoveSelection() {
    if (!this.state.moveDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para desplazar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmRotateSelection() {
    if (!this.state.rotateDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para girar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.rotateDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Girar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`;
    this.updateCanvasCursorMode();
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmEraseSelection() {
    if (!this.state.eraseDraft?.selecting) {
      return false;
    }

    if (!this.doc.selectedEntities.size) {
      this.state.statusText = 'Seleccione entidades para borrar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    return this.deleteSelectedEntities();
  }

  deleteSelectedEntities() {
    const entities = [...this.doc.selectedEntities];
    if (!entities.length) {
      return false;
    }

    this.rememberSelectionSet(entities);

    const removedCount = this.doc.removeEntities(entities);
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = removedCount
      ? `${removedCount} entidad${removedCount === 1 ? '' : 'es'} borrada${removedCount === 1 ? '' : 's'}`
      : 'No se pudo borrar';
    return removedCount > 0;
  }

  confirmExplodeSelection() {
    if (!this.state.explodeDraft?.selecting) {
      return false;
    }
    const selectedEntities = [...this.doc.selectedEntities];
    const candidates = selectedEntities.filter(entityCanExplode);
    if (!candidates.length) {
      this.state.statusText = 'Seleccione al menos un bloque o una polilinea';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(candidates);
    this.doc.recordHistory();
    const groupedIds = new Set(candidates.map((entity) => entity.groupId).filter(Boolean));
    const standaloneCandidates = candidates.filter((entity) => !entity.groupId);
    let explodedCount = 0;
    let resultCount = 0;
    let lostVariableWidth = false;

    groupedIds.forEach((groupId) => {
      const groupEntities = this.doc.entities.filter((entity) => entity.groupId === groupId);
      groupEntities.forEach((entity) => {
        entity.groupId = null;
      });
      explodedCount += 1;
      resultCount += groupEntities.length;
    });

    for (const entity of standaloneCandidates) {
      if (!this.doc.entities.includes(entity)) {
        continue;
      }
      let replacements = [];
      if (entity.type === 'INSERT') {
        replacements = transformedBlockContents(entity);
      }
      else if (entity.type === 'POLYLINE') {
        lostVariableWidth = lostVariableWidth || entity.segments.some((segment) =>
          segment.startWidth > SNAP_THRESHOLD || segment.endWidth > SNAP_THRESHOLD);
        replacements = polylineSegmentEntities(entity);
      }
      if (!replacements.length) {
        continue;
      }
      this.doc.replaceEntity(entity, replacements, { recordHistory: false });
      explodedCount += 1;
      resultCount += replacements.length;
    }

    if (!explodedCount) {
      this.doc.undoStack.pop();
      this.state.statusText = 'No se pudo descomponer la seleccion';
      return false;
    }
    this.doc.markDirty();
    this.state.explodeDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${explodedCount} elemento${explodedCount === 1 ? '' : 's'} descompuesto${explodedCount === 1 ? '' : 's'} en ${resultCount} ${resultCount === 1 ? 'entidad' : 'entidades'}${
      lostVariableWidth ? ' · anchura variable convertida a entidades simples' : ''
    }`;
    return true;
  }

  confirmExtendBoundaries() {
    if (!this.state.extendDraft || this.state.extendDraft.phase !== 'boundaries') {
      return false;
    }

    const boundaries = [...this.doc.selectedEntities];
    if (!boundaries.length) {
      this.state.statusText = 'Seleccione entidades limite para alargar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(boundaries);

    this.state.extendDraft = {
      phase: 'targets',
      boundaries,
    };
    this.doc.clearSelection();
    this.state.statusText = `Alargar: ${boundaries.length} limite${boundaries.length === 1 ? '' : 's'} - pique lineas, arcos o polilineas abiertas`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  extendEntities(entities, pickPoint = null) {
    if (!this.state.extendDraft?.boundaries?.length) {
      this.state.statusText = 'No hay limites para alargar';
      return 0;
    }

    const targetEntities = entities.filter((entity) =>
      (entity?.type === 'LINE' || entity?.type === 'ARC' ||
        (entity?.type === 'POLYLINE' && !entity.closed)) &&
      !this.state.extendDraft.boundaries.includes(entity),
    );
    if (!targetEntities.length) {
      this.state.statusText = 'Seleccione lineas, arcos o polilineas abiertas para alargar';
      return 0;
    }

    this.rememberSelectionSet(targetEntities);

    const before = this.doc.snapshot();
    let extendedCount = 0;
    for (const entity of targetEntities) {
      const extended = entity.type === 'LINE'
        ? extendLineToBoundaries(entity, this.state.extendDraft.boundaries, pickPoint)
        : entity.type === 'ARC'
          ? extendArcToBoundaries(entity, this.state.extendDraft.boundaries, pickPoint)
          : extendPolylineToBoundaries(entity, this.state.extendDraft.boundaries, pickPoint);
      if (extended) {
        extendedCount += 1;
      }
    }

    if (!extendedCount) {
      this.state.statusText = 'No se encontro limite valido para alargar';
      return 0;
    }

    this.doc.undoStack.push(before);
    if (this.doc.undoStack.length > HISTORY_LIMIT) {
      this.doc.undoStack.shift();
    }
    this.doc.redoStack = [];
    this.doc.markDirty();
    this.doc.clearSelection();
    this.state.statusText = `${extendedCount} entidad${extendedCount === 1 ? '' : 'es'} alargada${extendedCount === 1 ? '' : 's'}`;
    return extendedCount;
  }

  copySelectionTo(targetPoint) {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - copyDraft.basePoint.x,
      y: targetPoint.y - copyDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    const copies = cloneEntitiesWithOffset(copyDraft.sourceEntities, vector, { remapGroups: true });
    this.doc.addEntities(copies);
    this.state.lastCopy = {
      sourceEntities: copyDraft.sourceEntities,
      vector,
    };
    this.state.statusText = `${copies.length} entidad${copies.length === 1 ? '' : 'es'} copiada${copies.length === 1 ? '' : 's'} - indique otro destino o termine la orden`;
    return true;
  }

  repeatLastCopy(count) {
    const lastCopy = this.state.lastCopy;
    if (!lastCopy || count < 2) {
      return false;
    }

    const copies = [];
    for (let step = 2; step <= count; step += 1) {
      const vector = {
        x: lastCopy.vector.x * step,
        y: lastCopy.vector.y * step,
      };
      copies.push(...cloneEntitiesWithOffset(lastCopy.sourceEntities, vector, { remapGroups: true }));
    }

    this.doc.addEntities(copies);
    if (!this.state.copyDraft) {
      this.doc.clearSelection();
    }
    this.state.statusText = `Matriz lineal: ${count} copias en total`;
    return true;
  }

  moveSelectionTo(targetPoint) {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - moveDraft.basePoint.x,
      y: targetPoint.y - moveDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    this.doc.recordHistory();
    moveDraft.sourceEntities.forEach((entity) => moveEntityByVector(entity, vector));
    this.doc.markDirty();
    const count = moveDraft.sourceEntities.length;
    this.state.moveDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} desplazada${count === 1 ? '' : 's'}`;
    return true;
  }

  rotateSelectionBy(angleDegrees) {
    const rotateDraft = this.state.rotateDraft;
    if (!rotateDraft?.basePoint || angleDegrees === null || !Number.isFinite(angleDegrees)) {
      return false;
    }
    if (Math.abs(angleDegrees % 360) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Angulo nulo';
      return false;
    }

    this.doc.recordHistory();
    rotateDraft.sourceEntities.forEach((entity) =>
      rotateEntityByAngle(entity, rotateDraft.basePoint, angleDegrees));
    this.doc.markDirty();
    const count = rotateDraft.sourceEntities.length;
    this.state.rotateDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} girada${count === 1 ? '' : 's'} ${formatNumber(angleDegrees)}°`;
    return true;
  }

  selectedEntitiesFromWindow(selectionWindow) {
    if (!selectionWindow?.currentWorld) {
      return [];
    }

    const selectionBounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const mode = selectionWindowMode(selectionWindow);
    const matchingEntities = this.doc.queryBounds(selectionBounds).filter((entity) => {
      const entityBounds = entity.bounds();
      return mode === 'window'
        ? boundsContainsBounds(selectionBounds, entityBounds)
        : boundsIntersectsBounds(selectionBounds, entityBounds);
    });
    return this.doc.expandEntityGroups(matchingEntities);
  }

  createLineTo(point, continueFromEnd = false) {
    if (distance(this.state.pendingLineStart, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new LineEntity(this.state.pendingLineStart, point, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.statusText = continueFromEnd
      ? `Linea ${style.label.toLowerCase()} creada - indique siguiente punto`
      : `Linea ${style.label.toLowerCase()} creada (${this.doc.entities.length})`;
    this.state.pendingLineStart = continueFromEnd ? point : null;
    return true;
  }

  beginPolyline(point) {
    this.state.polylineDraft = {
      vertices: [{ ...point }],
      segments: [],
      mode: 'line',
      startWidth: 0,
      endWidth: 0,
    };
    this.state.statusText = 'Primer punto indicado - siguiente punto · A arco · W anchura · C cerrar';
    return true;
  }

  addPolylinePoint(point) {
    const draft = this.state.polylineDraft;
    if (!draft) {
      return this.beginPolyline(point);
    }
    const start = draft.vertices[draft.vertices.length - 1];
    const closesPolyline = draft.vertices.length >= 3 &&
      distance(draft.vertices[0], point) <= SNAP_THRESHOLD;
    if (draft.mode === 'arc-end') {
      if (distance(start, point) <= SNAP_THRESHOLD) {
        this.state.statusText = 'Punto repetido';
        return false;
      }
      const arcGeometry = polylineTangentArcToPoint(draft, start, point);
      draft.segments.push({
        type: 'ARC',
        center: arcGeometry.center,
        clockwise: arcGeometry.clockwise,
        startWidth: draft.startWidth,
        endWidth: draft.endWidth,
      });
      draft.vertices.push({ ...point });
      if (closesPolyline) {
        return this.finishPolyline(true);
      }
      this.state.statusText = 'Arco tangente añadido - indique siguiente extremo · L vuelve a linea';
      return true;
    }
    if (distance(start, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }
    draft.segments.push({
      type: 'LINE',
      center: null,
      startWidth: draft.startWidth,
      endWidth: draft.endWidth,
    });
    draft.vertices.push({ ...point });
    if (closesPolyline) {
      return this.finishPolyline(true);
    }
    this.state.statusText = 'Tramo añadido - indique siguiente punto · A arco · W anchura · C cerrar';
    return true;
  }

  finishPolyline(close = false) {
    const draft = this.state.polylineDraft;
    if (!draft || draft.vertices.length < 2 || !draft.segments.length) {
      this.state.statusText = 'La polilinea necesita al menos dos puntos';
      return false;
    }
    if (close) {
      const first = draft.vertices[0];
      const last = draft.vertices[draft.vertices.length - 1];
      if (distance(first, last) <= SNAP_THRESHOLD) {
        draft.vertices.pop();
      }
      else {
        draft.segments.push({
          type: 'LINE',
          center: null,
          startWidth: draft.startWidth,
          endWidth: draft.endWidth,
        });
      }
    }
    const style = getLineStyle(activeLineStyleId());
    const entity = new PolylineEntity(draft.vertices, draft.segments, {
      closed: close,
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    this.doc.addEntity(entity);
    this.state.polylineDraft = null;
    this.state.distanceInput = '';
    this.setTool('select');
    this.state.statusText = `Polilinea ${close ? 'cerrada' : 'abierta'} creada · ${entity.segments.length} tramos`;
    return true;
  }

  handlePolylineCommandKey(event) {
    if (this.state.tool !== 'polyline' || !this.state.polylineDraft ||
        event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }
    const key = event.key.toLowerCase();
    const draft = this.state.polylineDraft;
    if (key === 'a') {
      event.preventDefault();
      draft.mode = 'arc-end';
      this.state.distanceInput = '';
      this.state.statusText = 'Modo arco tangente - indique el segundo punto';
      return true;
    }
    if (key === 'l') {
      event.preventDefault();
      draft.mode = 'line';
      this.state.distanceInput = '';
      this.state.statusText = 'Modo linea - indique siguiente punto';
      return true;
    }
    if (key === 'c') {
      event.preventDefault();
      this.finishPolyline(true);
      return true;
    }
    if (key === 'w') {
      event.preventDefault();
      openPolylineWidthDialog();
      return true;
    }
    return false;
  }

  startDimension(tool) {
    if (!DIMENSION_TOOLS.has(tool)) {
      return false;
    }
    this.setTool(tool);
    const kind = tool.replace('dimension-', '');
    this.state.dimensionDraft = {
      kind,
      requestedKind: kind,
      phase: 'reference',
      points: [],
      firstLine: null,
    };
    this.state.statusText = kind === 'radius' || kind === 'diameter'
      ? `Cota de ${kind === 'radius' ? 'radio' : 'diametro'}: seleccione un circulo o arco`
      : kind === 'angular'
        ? 'Cota angular: seleccione primera linea o capture el vertice mediante snap'
        : 'Seleccione una linea o tramo de polilinea, o capture el primer punto mediante snap';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  setDimensionKind(kind) {
    if (!this.state.dimensionDraft) {
      return false;
    }
    this.state.dimensionDraft.kind = kind;
    this.state.tool = `dimension-${kind}`;
    dimensionToolButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === this.state.tool);
    });
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === this.state.tool);
    });
    return true;
  }

  beginDimensionPlacement(message = 'Indique separacion de la cota o escriba la distancia') {
    const draft = this.state.dimensionDraft;
    if (!draft) {
      return false;
    }
    draft.phase = 'placement';
    const rememberedOffset = this.state.lastDimensionOffsets[activeDrawingProfile().id];
    this.state.distanceInput = '';
    if (Number.isFinite(rememberedOffset) && rememberedOffset > SNAP_THRESHOLD) {
      draft.suggestedOffset = rememberedOffset;
      draft.suggestionActive = false;
      this.state.statusText = `${message} · referencia ${formatNumber(rememberedOffset)} ${UNITS_LABEL}`;
    }
    else {
      draft.suggestedOffset = null;
      draft.suggestionActive = false;
      this.state.statusText = message;
    }
    return true;
  }

  createDimensionAt(placement, options = {}) {
    const draft = this.state.dimensionDraft;
    const entity = dimensionDraftEntity(draft, placement);
    if (!entity || entity.measurement() <= SNAP_THRESHOLD) {
      this.state.statusText = 'Cota no valida';
      return false;
    }
    const kind = draft.kind;
    const kindLabel = {
      horizontal: 'horizontal',
      vertical: 'vertical',
      aligned: 'alineada',
      angular: 'angular',
      radius: 'de radio',
      diameter: 'de diametro',
    }[kind] || kind;
    const placementDistance = dimensionPlacementDistance(draft, placement);
    if (
      options.rememberOffset === true &&
      Number.isFinite(placementDistance) &&
      placementDistance > SNAP_THRESHOLD
    ) {
      this.state.lastDimensionOffsets[activeDrawingProfile().id] = placementDistance;
    }
    const requestedKind = draft.requestedKind || kind;
    this.doc.addEntity(entity);
    this.startDimension(`dimension-${requestedKind}`);
    this.state.statusText = `${
      `Cota ${kindLabel} creada · ${dimensionTextValue(entity)} ${kind === 'angular' ? '' : UNITS_LABEL}`.trim()
    } · seleccione la siguiente entidad (Escape para terminar)`;
    return true;
  }

  handleDimensionPoint(worldPoint) {
    const draft = this.state.dimensionDraft;
    if (!draft) {
      return false;
    }
    if (draft.phase === 'placement') {
      const cursor = this.resolveInputPoint(worldPoint);
      return this.createDimensionAt(dimensionPlacementPoint(draft, cursor, this.state));
    }

    const pickedEntity = this.findEntityAt(worldPoint);
    const selectionSnap = draft.phase === 'reference'
      ? objectSnapPoint(worldPoint, this.state)
      : null;
    this.state.activeObjectSnap = selectionSnap;

    if (selectionSnap && draft.kind !== 'radius' && draft.kind !== 'diameter') {
      draft.points = [{ ...selectionSnap.point }];
      draft.phase = draft.kind === 'angular' ? 'first-ray' : 'second-point';
      this.state.statusText = draft.kind === 'angular'
        ? 'Vertice capturado - indique un punto sobre el primer lado'
        : 'Primer punto capturado - indique segundo punto';
      return true;
    }

    if (draft.phase === 'reference') {
      const circularEntity = dimensionCircularFromEntity(pickedEntity, worldPoint);
      if (circularEntity) {
        if (draft.kind !== 'radius' && draft.kind !== 'diameter') {
          this.setDimensionKind(circularEntity.type === 'ARC' ? 'radius' : 'diameter');
        }
        const pickedRadiusPoint = {
          x: circularEntity.center.x + Math.cos(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
          y: circularEntity.center.y + Math.sin(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
        };
        draft.points = [{ ...circularEntity.center }, pickedRadiusPoint];
        this.beginDimensionPlacement();
        return true;
      }
    }

    if (draft.kind === 'radius' || draft.kind === 'diameter') {
      const circularEntity = dimensionCircularFromEntity(pickedEntity, worldPoint);
      if (!circularEntity) {
        this.state.statusText = 'Seleccione un circulo o arco';
        return false;
      }
      const pickedRadiusPoint = {
        x: circularEntity.center.x + Math.cos(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
        y: circularEntity.center.y + Math.sin(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
      };
      draft.points = [{ ...circularEntity.center }, pickedRadiusPoint];
      this.beginDimensionPlacement();
      return true;
    }

    if (draft.kind === 'angular') {
      if (draft.phase === 'reference') {
        const firstLine = dimensionLineFromEntity(pickedEntity, worldPoint);
        if (firstLine) {
          draft.firstLine = new LineEntity(firstLine.start, firstLine.end);
          draft.phase = 'second-line';
          this.state.statusText = 'Seleccione la segunda linea o tramo';
        }
        else if (!pickedEntity) {
          draft.points = [this.resolveInputPoint(worldPoint)];
          draft.phase = 'first-ray';
          this.state.statusText = 'Vertice indicado - indique un punto sobre el primer lado';
        }
        else {
          this.state.statusText = 'Seleccione una linea o capture el vertice mediante snap';
        }
        return true;
      }
      if (draft.phase === 'second-line') {
        const secondLine = dimensionLineFromEntity(pickedEntity, worldPoint);
        if (!secondLine) {
          this.state.statusText = 'Seleccione una segunda linea o tramo de polilinea';
          return false;
        }
        const firstDirection = {
          x: draft.firstLine.end.x - draft.firstLine.start.x,
          y: draft.firstLine.end.y - draft.firstLine.start.y,
        };
        const secondDirection = {
          x: secondLine.end.x - secondLine.start.x,
          y: secondLine.end.y - secondLine.start.y,
        };
        const vertex = infiniteLineLineIntersection(
          draft.firstLine.start,
          firstDirection,
          secondLine.start,
          secondDirection,
        );
        if (!vertex) {
          this.state.statusText = 'Las lineas son paralelas';
          return false;
        }
        const fartherPoint = (line) => distance(vertex, line.start) >= distance(vertex, line.end)
          ? line.start : line.end;
        draft.points = [{ ...vertex }, { ...fartherPoint(draft.firstLine) }, { ...fartherPoint(secondLine) }];
        this.beginDimensionPlacement('Indique separacion angular o escriba la distancia');
        return true;
      }
      draft.points.push(this.resolveInputPoint(worldPoint));
      if (draft.phase === 'first-ray') {
        draft.phase = 'second-ray';
        this.state.statusText = 'Indique un punto sobre el segundo lado';
      }
      else {
        this.beginDimensionPlacement('Indique separacion angular o escriba la distancia');
      }
      return true;
    }

    if (draft.phase === 'reference') {
      const segment = dimensionLineFromEntity(pickedEntity, worldPoint);
      if (segment) {
        this.setDimensionKind(dimensionKindForLine(segment));
        draft.points = [{ ...segment.start }, { ...segment.end }];
        this.beginDimensionPlacement();
      }
      else if (!pickedEntity) {
        draft.points = [this.resolveInputPoint(worldPoint)];
        draft.phase = 'second-point';
        this.state.statusText = 'Primer punto indicado - indique segundo punto';
      }
      else {
        this.state.statusText = 'Seleccione una linea o capture el primer punto mediante snap';
      }
      return true;
    }
    draft.points.push(this.resolveInputPoint(worldPoint));
    this.beginDimensionPlacement();
    return true;
  }

  createRectangleTo(point) {
    const firstPoint = this.state.rectangleDraft?.firstPoint;
    if (!firstPoint) {
      return false;
    }

    if (
      Math.abs(point.x - firstPoint.x) <= SNAP_THRESHOLD ||
      Math.abs(point.y - firstPoint.y) <= SNAP_THRESHOLD
    ) {
      this.state.statusText = 'Rectangulo no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    const topRight = { x: point.x, y: firstPoint.y };
    const bottomLeft = { x: firstPoint.x, y: point.y };
    const segments = Array.from({ length: 4 }, () => ({
      type: 'LINE',
      center: null,
      clockwise: true,
      startWidth: 0,
      endWidth: 0,
    }));
    this.doc.addEntity(new PolylineEntity(
      [firstPoint, topRight, point, bottomLeft],
      segments,
      {
        closed: true,
        layer: activeLayerName(),
        lineStyle: style.id,
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      },
    ));
    this.state.rectangleDraft = null;
    this.state.statusText = `Rectangulo ${style.label.toLowerCase()} creado (${this.doc.entities.length})`;
    return true;
  }

  createCircle(center, radius) {
    if (radius <= SNAP_THRESHOLD) {
      this.state.statusText = 'Radio no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new CircleEntity(center, radius, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.circleDraft = null;
    this.state.statusText = `Circulo ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${UNITS_LABEL}`;
    return true;
  }

  createArc(center, radius, startAngle, endAngle) {
    if (radius <= SNAP_THRESHOLD || arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Arco no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new ArcEntity(center, radius, startAngle, endAngle, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.arcDraft = null;
    this.state.statusText = `Arco ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${UNITS_LABEL}`;
    return true;
  }

  handleFilletPoint(worldPoint) {
    const draft = this.state.filletDraft || { firstEntity: null, firstPick: null };
    const entity = this.findEntityAt(worldPoint);
    if (!entity || entity.type !== 'LINE' || entity.groupId) {
      this.state.statusText = entity?.groupId
        ? 'Descomponga la polilinea agrupada antes de empalmar'
        : 'Empalme: seleccione una entidad de linea';
      return false;
    }
    if (!draft.firstEntity) {
      draft.firstEntity = entity;
      draft.firstPick = { ...worldPoint };
      this.state.filletDraft = draft;
      this.state.statusText = `Primera linea indicada · R${formatNumber(activeFilletRadius())} · seleccione la segunda`;
      return true;
    }
    if (entity === draft.firstEntity) {
      this.state.statusText = 'Seleccione una segunda linea distinta';
      return false;
    }
    const result = applyLineFillet(
      this.doc,
      draft.firstEntity,
      draft.firstPick,
      entity,
      worldPoint,
      activeFilletRadius(),
    );
    if (!result.valid) {
      this.state.statusText = result.reason;
      return false;
    }
    this.state.filletDraft = { firstEntity: null, firstPick: null };
    this.state.hoveredEntity = null;
    this.state.statusText = `Empalme creado · R${formatNumber(result.radius)} ${UNITS_LABEL} · seleccione otra primera linea`;
    return true;
  }

  handleCirclePoint(point) {
    if (this.state.tool === 'circle-center') {
      if (!this.state.circleDraft) {
        this.state.circleDraft = { mode: 'center-radius', points: [point] };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const center = this.state.circleDraft.points[0];
      const radius = distance(center, point);
      return this.createCircle(center, radius);
    }

    if (this.state.tool === 'circle-3p') {
      const draft = this.state.circleDraft || { mode: '3p', points: [] };

      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.circleDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique segundo punto'
          : 'Segundo punto indicado - indique tercer punto';
        return true;
      }

      const circle = circleFromThreePoints(draft.points[0], draft.points[1], point);
      if (!circle) {
        this.state.statusText = 'Los 3 puntos no definen un circulo';
        return false;
      }

      return this.createCircle(circle.center, circle.radius);
    }

    return false;
  }

  handleArcPoint(point) {
    if (this.state.tool === 'arc-3p') {
      const draft = this.state.arcDraft || { mode: '3p', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique punto de paso'
          : 'Punto de paso indicado - indique punto final';
        return true;
      }

      const arc = arcFromThreePoints(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Los 3 puntos no definen un arco';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-start-end') {
      const draft = this.state.arcDraft || { mode: 'center-start-end', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Centro indicado - indique punto inicial'
          : 'Punto inicial indicado - indique punto final';
        return true;
      }

      const arc = arcFromCenterStartEnd(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-radius') {
      if (!this.state.arcDraft) {
        this.state.arcDraft = { mode: 'center-radius', points: [point], radius: null };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const draft = this.state.arcDraft;
      const center = draft.points[0];
      if (draft.points.length === 1) {
        const radius = distance(center, point);
        if (radius <= SNAP_THRESHOLD) {
          this.state.statusText = 'Radio no valido';
          return false;
        }
        draft.radius = radius;
        draft.points.push(point);
        this.state.statusText = 'Radio indicado - indique punto inicial';
        return true;
      }

      if (draft.points.length === 2) {
        const startPoint = pointOnRadiusFromAngle(center, draft.radius, point);
        draft.points.push(startPoint);
        this.state.statusText = 'Punto inicial indicado - indique punto final';
        return true;
      }

      const endPoint = pointOnRadiusFromAngle(center, draft.radius, point);
      const arc = arcFromCenterStartEnd(center, draft.points[2], endPoint);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    return false;
  }

  handleDistanceInputKey(event) {
    const circleCenterDraft = this.state.circleDraft?.mode === 'center-radius' &&
      this.state.circleDraft.points.length === 1;
    const arcRadiusDraft = this.state.arcDraft?.mode === 'center-radius' &&
      this.state.arcDraft.points.length === 1;
    const radiusDraft = circleCenterDraft || arcRadiusDraft;
    const pointDraft = Boolean(
      this.state.polylineDraft?.vertices.length ||
      this.state.rectangleDraft?.firstPoint ||
      this.state.circleDraft?.points.length ||
      this.state.arcDraft?.points.length ||
      this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      this.state.rotateDraft?.basePoint ||
      this.state.blockCreateDraft?.name ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft?.phase === 'placement'
    );
    if (!this.state.pendingLineStart && !this.state.selectedGrip && !radiusDraft && !pointDraft && !this.state.lastCopy) {
      return false;
    }

    if ((event.key.toLowerCase() === 'x' && !this.state.distanceInput) || /^[0-9]$/.test(event.key) || event.key === '-') {
      this.state.distanceInput += event.key;
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : parseRelativeCoordinateInput(this.state.distanceInput)
        ? `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : radiusDraft
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
      return true;
    }

    if (event.key === '.' || event.key === ',') {
      if (event.key === '.' || !this.state.distanceInput.includes(',')) {
        this.state.distanceInput += event.key;
      }
      this.state.statusText = parseRelativeCoordinateInput(this.state.distanceInput)
        ? this.state.rotateDraft?.basePoint
          ? `Angulo: ${this.state.distanceInput}°`
          : `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : radiusDraft
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
      return true;
    }

    if (event.key === 'Backspace') {
      this.state.distanceInput = this.state.distanceInput.slice(0, -1);
      this.state.statusText = this.state.distanceInput
        ? this.state.rotateDraft?.basePoint
          ? `Angulo: ${this.state.distanceInput}°`
          : radiusDraft
          ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
          : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`
        : this.state.rotateDraft?.basePoint
          ? 'Angulo pendiente'
          : radiusDraft ? 'Radio pendiente' : 'Segundo punto pendiente';
      return true;
    }

    if (event.key === 'Enter') {
      if (this.state.rotateDraft?.basePoint) {
        const inputAngle = parseAngleInput(this.state.distanceInput);
        if (inputAngle !== null && this.rotateSelectionBy(inputAngle)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Angulo no valido';
        }
        return true;
      }

      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      if (multiplier !== null) {
        if (this.repeatLastCopy(multiplier)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'No hay copia anterior para repetir';
        }
        return true;
      }

      const inputDistance = parseDistanceInput(this.state.distanceInput);
      const activeGripPoint = this.activeGripPoint();
      const coordinateOrigin = this.state.copyDraft?.basePoint ||
        this.state.moveDraft?.basePoint ||
        activeGripPoint ||
        this.state.pendingLineStart ||
        activeDraftOrigin(this.state) ||
        this.state.rectangleDraft?.firstPoint ||
        this.state.circleDraft?.points[0] ||
        this.state.arcDraft?.points[0] ||
        (this.state.blockCreateDraft?.name ? { x: 0, y: 0 } : null) ||
        (this.state.blockInsertDraft ? { x: 0, y: 0 } : null) ||
        dimensionPlacementOrigin(this.state.dimensionDraft) ||
        null;
      const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);

      if (this.state.dimensionDraft?.phase === 'placement') {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget || dimensionPlacementPoint(
          this.state.dimensionDraft,
          cursor,
          this.state,
        );
        if (targetPoint && this.createDimensionAt(targetPoint, { rememberOffset: true })) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Separacion de cota no valida';
        }
        return true;
      }

      if (this.state.blockCreateDraft?.name) {
        if (coordinateTarget && this.createBlockAt(coordinateTarget)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Punto base no valido';
        }
        return true;
      }

      if (this.state.blockInsertDraft) {
        if (coordinateTarget && this.insertBlockAt(coordinateTarget)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Punto de insercion no valido';
        }
        return true;
      }

      if (this.state.copyDraft?.basePoint) {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.copySelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de copia no valido';
        }
        return true;
      }

      if (this.state.moveDraft?.basePoint) {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.moveSelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de desplazamiento no valido';
        }
        return true;
      }

      if (this.state.selectedGrip) {
        if (coordinateTarget) {
          const gripPoint = this.activeGripPoint();
          if (distance(gripPoint, coordinateTarget) > SNAP_THRESHOLD) {
            this.doc.recordHistory();
            this.moveActiveGripPointTo(coordinateTarget);
          }
          this.state.distanceInput = '';
          this.state.statusText = 'Punto desplazado por coordenadas';
        }
        else if (inputDistance !== null && this.moveSelectedGripByDistance(inputDistance)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Distancia o direccion no valida';
        }
        return true;
      }

      if (circleCenterDraft) {
        const center = this.state.circleDraft.points[0];
        const radius = coordinateTarget ? distance(center, coordinateTarget) : inputDistance;
        if (radius !== null && this.createCircle(center, radius)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (arcRadiusDraft) {
        const center = this.state.arcDraft.points[0];
        const radius = coordinateTarget ? distance(center, coordinateTarget) : inputDistance;
        if (radius !== null) {
          this.state.arcDraft.radius = radius;
          this.state.arcDraft.points.push(coordinateTarget || { x: center.x + radius, y: center.y });
          this.state.distanceInput = '';
          this.state.statusText = 'Radio indicado - indique punto inicial';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (coordinateTarget && this.state.circleDraft?.points.length) {
        this.handleCirclePoint(coordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if (coordinateTarget && this.state.arcDraft?.points.length) {
        this.handleArcPoint(coordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if (this.state.polylineDraft?.vertices.length) {
        const origin = activeDraftOrigin(this.state);
        const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget || (inputDistance !== null && directionPoint
          ? pointFromDistance(origin, directionPoint, inputDistance)
          : null);
        if (targetPoint && this.addPolylinePoint(targetPoint)) {
          this.state.distanceInput = '';
        }
        else if (!targetPoint) {
          this.state.statusText = 'Distancia o coordenadas no validas';
        }
        return true;
      }

      if (this.state.rectangleDraft?.firstPoint) {
        const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget || (inputDistance !== null && directionPoint
          ? pointFromDistance(this.state.rectangleDraft.firstPoint, directionPoint, inputDistance)
          : null);
        if (targetPoint && this.createRectangleTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Rectangulo no valido';
        }
        return true;
      }

      const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const endPoint = coordinateTarget || (inputDistance !== null && directionPoint
        ? pointFromDistance(this.state.pendingLineStart, directionPoint, inputDistance)
        : null);

      if (endPoint) {
        this.createLineTo(endPoint, true);
        this.state.distanceInput = '';
      }
      else {
        this.state.statusText = 'Distancia o direccion no valida';
      }
      return true;
    }

    return false;
  }

  normalizeWheelDelta(event) {
    const lineMode = typeof WheelEvent === 'undefined' ? 1 : WheelEvent.DOM_DELTA_LINE;
    const pageMode = typeof WheelEvent === 'undefined' ? 2 : WheelEvent.DOM_DELTA_PAGE;
    if (event.deltaMode === lineMode) {
      return { x: event.deltaX * 16, y: event.deltaY * 16 };
    }
    if (event.deltaMode === pageMode) {
      return {
        x: event.deltaX * this.renderer.viewportWidth(),
        y: event.deltaY * this.renderer.viewportHeight(),
      };
    }
    return { x: event.deltaX, y: event.deltaY };
  }

  cancelMouseWheelZoom() {
    return false;
  }

  queueMouseWheelZoom(zoomDelta) {
    if (!Number.isFinite(zoomDelta) || Math.abs(zoomDelta) <= SNAP_THRESHOLD) {
      return false;
    }
    const boundedDelta = clamp(zoomDelta, -100, 100);
    const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -boundedDelta / 100);
    return this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
  }

  onPointerDown(event) {
    event.preventDefault();
    this.cancelMouseWheelZoom();
    this.cancelKeyboardRefresh();
    this.state.activeLineStyle = activeLineStyleId();
    if (typeof this.canvas.setPointerCapture === 'function') {
      this.canvas.setPointerCapture(event.pointerId);
    }
    const worldPoint = this.updateMouse(event);

    if (event.button === 1) {
      event.preventDefault();
      this.panState = {
        startScreen: { ...this.state.mouseScreen },
        originOffset: { ...this.state.viewOffset },
        dragging: false,
      };
      this.canvas.classList.add('is-panning');
      this.renderer.draw();
      return;
    }

    if (event.button === 2) {
      if (!this.handleCommandEnter()) {
        this.cancelCurrentCommand();
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (this.state.tool === 'select') {
      const grip = this.findGripAt(worldPoint);
      if (grip) {
        this.doc.selectEntity(grip.entity);
        this.rememberSelectionSet();
        this.state.selectedGrip = grip;
        const referencePoint = gripReferencePoint(grip);
        const selectedGripPoint = gripPoint(grip);
        this.gripDragState = {
          grip,
          startPoint: { ...selectedGripPoint },
          axisPoint: referencePoint ? { ...referencePoint } : null,
          axisDirection: referencePoint
            ? {
                x: selectedGripPoint.x - referencePoint.x,
                y: selectedGripPoint.y - referencePoint.y,
              }
            : null,
        };
        this.state.statusText = grip.entity.type === 'HATCH'
          ? `Pinzamiento del sombreado seleccionado`
          : grip.entity.type === 'INSERT'
            ? 'Punto de insercion del bloque seleccionado'
          : grip.entity.type === 'POLYLINE'
            ? 'Pinzamiento de polilinea seleccionado'
          : grip.entity.type === 'DIMENSION'
            ? grip.key === 'text'
              ? 'Texto de cota seleccionado'
              : 'Pinzamiento de cota seleccionado'
          : isCircularEntity(grip.entity)
            ? `Pinzamiento ${formatSnapType(grip.key === 'midpoint' ? 'midpoint' : grip.key)} seleccionado`
            : `Punto ${grip.key === 'start' ? 'inicial' : 'final'} seleccionado`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      if (entity) {
        const now = Date.now();
        const isTextDoubleClick = entity.type === 'TEXT' &&
          this.lastTextPointerDown?.entity === entity &&
          now - this.lastTextPointerDown.time <= 450;
        const isHatchDoubleClick = entity.type === 'HATCH' &&
          this.lastHatchPointerDown?.entity === entity &&
          now - this.lastHatchPointerDown.time <= 450;
        const isBlockDoubleClick = entity.type === 'INSERT' &&
          this.lastBlockPointerDown?.entity === entity &&
          now - this.lastBlockPointerDown.time <= 450;
        this.lastTextPointerDown = entity.type === 'TEXT' ? { entity, time: now } : null;
        this.lastHatchPointerDown = entity.type === 'HATCH' ? { entity, time: now } : null;
        this.lastBlockPointerDown = entity.type === 'INSERT' ? { entity, time: now } : null;
        this.doc.selectEntity(entity);
        this.rememberSelectionSet();
        if (isBlockDoubleClick) {
          this.lastBlockPointerDown = null;
          if (this.state.blockEditDraft) {
            this.state.statusText = 'Guarde o descarte el bloque actual antes de editar otro';
          }
          else {
            enterBlockEditor(entity);
          }
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        if (isTextDoubleClick) {
          this.lastTextPointerDown = null;
          openTextDialog(entity);
          this.state.statusText = 'Editando texto';
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        if (isHatchDoubleClick) {
          this.lastHatchPointerDown = null;
          openHatchDialog(entity);
          this.state.statusText = 'Editando sombreado';
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        const selectedEntities = [...this.doc.selectedEntities];
        const entityLabel = entity.type === 'POLYLINE'
          ? 'Polilinea'
          : entity.type === 'DIMENSION'
            ? 'Cota'
          : entity.type === 'INSERT'
            ? `Bloque ${entity.blockName}`
          : entity.groupId
          ? 'Polilinea'
          : entity.type === 'CIRCLE'
          ? 'Circulo'
          : entity.type === 'ARC'
            ? 'Arco'
            : entity.type === 'TEXT'
              ? 'Texto'
              : entity.type === 'HATCH' ? 'Sombreado' : 'Linea';
        const selectedLength = selectedEntities.reduce((total, selectedEntity) => total + selectedEntity.length(), 0);
        const selectionLabel = entity.type === 'INSERT' ? 'seleccionado' : 'seleccionada';
        this.state.statusText = `${entityLabel} ${selectionLabel} - capa ${entity.layer} - grosor ${getLineStyle(entity.lineStyle).label} - ${formatNumber(selectedLength)} ${UNITS_LABEL}`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      this.lastTextPointerDown = null;
      this.lastHatchPointerDown = null;
      this.lastBlockPointerDown = null;
      this.state.selectionWindow = {
        startWorld: { ...worldPoint },
        currentWorld: { ...worldPoint },
        startScreen: { ...this.state.mouseScreen },
        dragging: false,
      };
      this.state.statusText = 'Ventana de seleccion';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'select-set') {
      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} en el conjunto`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'select-set',
        };
        this.state.statusText = 'Ventana para seleccionar conjunto';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'block-create') {
      const draft = this.state.blockCreateDraft;
      if (draft?.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} para el bloque`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'block-create',
          };
          this.state.statusText = 'Ventana de seleccion para crear bloque';
        }
      }
      else if (draft?.name) {
        this.createBlockAt(this.resolveInputPoint(worldPoint));
      }
      else {
        openBlockCreateDialog();
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'block-insert') {
      if (this.state.blockInsertDraft) {
        this.insertBlockAt(this.resolveInputPoint(worldPoint));
      }
      else {
        openBlockInsertDialog();
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'copy') {
      if (!this.state.copyDraft) {
        this.startCopy();
        return;
      }

      if (this.state.copyDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para copiar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'copy',
          };
          this.state.statusText = 'Ventana de seleccion para copiar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.copyDraft.basePoint) {
        this.state.copyDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.copySelectionTo(point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'move') {
      if (!this.state.moveDraft) {
        this.startMove();
        return;
      }

      if (this.state.moveDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para desplazar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'move',
          };
          this.state.statusText = 'Ventana de seleccion para desplazar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.moveDraft.basePoint) {
        this.state.moveDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.moveSelectionTo(point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'rotate') {
      if (!this.state.rotateDraft) {
        this.startRotate();
        return;
      }

      if (this.state.rotateDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para girar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'rotate',
          };
          this.state.statusText = 'Ventana de seleccion para girar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.rotateDraft.basePoint) {
        this.state.rotateDraft.basePoint = point;
        this.state.statusText = 'Punto base indicado - indique angulo o escribalo';
      }
      else {
        const angle = rotationAngleFromPoint(
          this.state.rotateDraft.basePoint,
          point,
          this.state.orthoEnabled,
        );
        this.rotateSelectionBy(angle);
      }
      this.state.distanceInput = '';
      this.updateCanvasCursorMode();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'trim') {
      const entity = this.findEntityAt(worldPoint);
      if (!entity) {
        this.state.statusText = 'No hay entidad para recortar';
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const result = trimEntityAtPoint(this.doc, entity, worldPoint);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      this.state.statusText = result.trimmed
        ? result.hatch
          ? 'Sombreado recortado'
          : result.polylineSegment
          ? `Tramo de polilinea eliminado · quedan ${result.remainingSegments} tramo${result.remainingSegments === 1 ? '' : 's'}`
          : result.grouped
          ? `Polilinea recortada en bloque - quedan ${result.keptCount} componente${result.keptCount === 1 ? '' : 's'}`
          : `Tramo recortado - quedan ${result.keptCount} tramo${result.keptCount === 1 ? '' : 's'}`
        : 'No se pudo recortar';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'fillet') {
      this.handleFilletPoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'extend') {
      if (!this.state.extendDraft) {
        this.startExtend();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      if (this.state.extendDraft.phase === 'boundaries') {
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} limite${this.doc.selectedEntities.size === 1 ? '' : 's'} seleccionado${this.doc.selectedEntities.size === 1 ? '' : 's'} para alargar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'extend-boundaries',
          };
          this.state.statusText = 'Ventana de limites para alargar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      if (entity) {
        this.extendEntities([entity], worldPoint);
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'extend-targets',
        };
        this.state.statusText = 'Ventana de lineas o arcos a alargar';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'erase') {
      if (!this.state.eraseDraft) {
        this.startErase();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para borrar`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'erase',
        };
        this.state.statusText = 'Ventana de seleccion para borrar';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'explode') {
      if (!this.state.explodeDraft) {
        this.startExplode();
        return;
      }
      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para descomponer`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'explode',
        };
        this.state.statusText = 'Ventana de seleccion para descomponer';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'text') {
      if (!this.state.textDraft?.text) {
        openTextDialog();
        return;
      }
      const point = this.resolveInputPoint(worldPoint);
      this.createTextAt(point);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'hatch') {
      if (!this.state.hatchDraft) {
        openHatchDialog();
        return;
      }
      const boundary = hatchBoundaryAtPoint(this.doc, worldPoint);
      if (!boundary) {
        this.state.statusText = 'No se encontro un recinto cerrado en ese punto';
      }
      else {
        this.createHatch(boundary);
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'circle-center' || this.state.tool === 'circle-3p') {
      const point = this.resolveInputPoint(worldPoint);
      this.handleCirclePoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end'
    ) {
      const point = this.resolveInputPoint(worldPoint);
      this.handleArcPoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (DIMENSION_TOOLS.has(this.state.tool)) {
      const wasPlacement = this.state.dimensionDraft?.phase === 'placement';
      if (!wasPlacement) {
        this.state.distanceInput = '';
      }
      this.handleDimensionPoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'rectangle') {
      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.rectangleDraft) {
        this.state.rectangleDraft = { firstPoint: point };
        this.state.statusText = 'Primera esquina indicada - indique esquina opuesta';
      }
      else {
        this.createRectangleTo(point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'polyline') {
      const point = this.resolveInputPoint(worldPoint);
      this.addPolylinePoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool !== 'line') {
      return;
    }

    const point = this.resolveInputPoint(worldPoint);
    if (!this.state.pendingLineStart) {
      this.state.pendingLineStart = point;
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    this.createLineTo(point, true);
    this.state.distanceInput = '';
    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerMove(event) {
    this.updateMouse(event);

    if (this.state.selectionWindow) {
      const deltaX = this.state.mouseScreen.x - this.state.selectionWindow.startScreen.x;
      const deltaY = this.state.mouseScreen.y - this.state.selectionWindow.startScreen.y;
      this.state.selectionWindow.currentWorld = { ...this.state.mouseWorld };
      this.state.selectionWindow.dragging = Math.hypot(deltaX, deltaY) > 4;
      const mode = selectionWindowMode(this.state.selectionWindow) === 'window' ? 'ventana' : 'captura';
      this.state.statusText = this.state.selectionWindow.purpose === 'copy'
        ? `Seleccion para copiar por ${mode}`
        : this.state.selectionWindow.purpose === 'block-create'
          ? `Seleccion para crear bloque por ${mode}`
        : this.state.selectionWindow.purpose === 'select-set'
          ? `Seleccion de conjunto por ${mode}`
        : this.state.selectionWindow.purpose === 'move'
          ? `Seleccion para desplazar por ${mode}`
          : this.state.selectionWindow.purpose === 'rotate'
            ? `Seleccion para girar por ${mode}`
        : this.state.selectionWindow.purpose === 'erase'
          ? `Seleccion para borrar por ${mode}`
        : this.state.selectionWindow.purpose === 'explode'
          ? `Seleccion para descomponer por ${mode}`
            : this.state.selectionWindow.purpose === 'extend-boundaries'
              ? `Limites para alargar por ${mode}`
              : this.state.selectionWindow.purpose === 'extend-targets'
                ? `Lineas o arcos a alargar por ${mode}`
        : `Seleccion por ${mode}`;
    }

    if (this.gripDragState) {
      this.moveSelectedGripTo(this.state.mouseWorld);
      this.state.statusText = this.state.shiftKeyDown
        ? 'Desplazando punto sobre eje de linea'
        : 'Desplazando punto';
    }

    if (this.panState) {
      const deltaX = this.state.mouseScreen.x - this.panState.startScreen.x;
      const deltaY = this.state.mouseScreen.y - this.panState.startScreen.y;
      this.panState.dragging = true;
      this.state.viewOffset = {
        x: this.panState.originOffset.x - deltaX / this.state.viewScale,
        y: this.panState.originOffset.y - deltaY / this.state.viewScale,
      };
      this.canvas.classList.add('is-dragging');
    }

    this.updateHoveredEntity();

    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerUp(event) {
    if (
      typeof this.canvas.releasePointerCapture === 'function' &&
      this.canvas.hasPointerCapture?.(event.pointerId)
    ) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    if (this.panState) {
      this.panState = null;
      this.canvas.classList.remove('is-panning', 'is-dragging');
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.gripDragState) {
      this.gripDragState = null;
      this.doc.markDirty();
      this.state.statusText = 'Punto desplazado';
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.state.selectionWindow) {
      const selectionWindow = this.state.selectionWindow;
      this.state.selectionWindow = null;

      if (!selectionWindow.dragging) {
        if (
          selectionWindow.purpose !== 'copy' &&
          selectionWindow.purpose !== 'block-create' &&
          selectionWindow.purpose !== 'select-set' &&
          selectionWindow.purpose !== 'move' &&
          selectionWindow.purpose !== 'rotate' &&
          selectionWindow.purpose !== 'erase' &&
          selectionWindow.purpose !== 'explode' &&
          selectionWindow.purpose !== 'extend-boundaries' &&
          selectionWindow.purpose !== 'extend-targets'
        ) {
          this.doc.clearSelection();
        }
        this.state.statusText = selectionWindow.purpose === 'copy'
          ? 'Seleccione objetos para copiar'
          : selectionWindow.purpose === 'block-create'
            ? 'Seleccione objetos para crear el bloque'
          : selectionWindow.purpose === 'select-set'
            ? 'Seleccione objetos para el conjunto'
          : selectionWindow.purpose === 'move'
            ? 'Seleccione objetos para desplazar'
            : selectionWindow.purpose === 'rotate'
              ? 'Seleccione objetos para girar'
            : selectionWindow.purpose === 'erase'
              ? 'Seleccione objetos para borrar'
            : selectionWindow.purpose === 'explode'
              ? 'Seleccione bloques o polilineas para descomponer'
              : selectionWindow.purpose === 'extend-boundaries'
                ? 'Seleccione limites para alargar'
                : selectionWindow.purpose === 'extend-targets'
                  ? 'Seleccione lineas o arcos para alargar'
          : 'Sin seleccion';
      }
      else {
        const entities = this.selectedEntitiesFromWindow(selectionWindow);
        if (
          selectionWindow.purpose === 'copy' ||
          selectionWindow.purpose === 'block-create' ||
          selectionWindow.purpose === 'select-set' ||
          selectionWindow.purpose === 'move' ||
          selectionWindow.purpose === 'rotate' ||
          selectionWindow.purpose === 'erase' ||
          selectionWindow.purpose === 'explode' ||
          selectionWindow.purpose === 'extend-boundaries'
        ) {
          this.doc.addSelectedEntities(entities);
        }
        else if (selectionWindow.purpose === 'extend-targets') {
          const count = this.extendEntities(entities);
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        else {
          this.doc.selectEntities(entities);
          this.rememberSelectionSet(entities);
        }
        const mode = selectionWindowMode(selectionWindow) === 'window' ? 'ventana' : 'captura';
        const selectedCount = selectionWindow.purpose === 'copy'
          ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'block-create'
            ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'select-set'
            ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'move'
            ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'rotate'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'erase'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'explode'
              ? this.doc.selectedEntities.size
              : selectionWindow.purpose === 'extend-boundaries'
                ? this.doc.selectedEntities.size
          : entities.length;
        this.state.statusText = selectedCount
          ? `${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} seleccionada${selectedCount === 1 ? '' : 's'}${
              selectionWindow.purpose === 'copy'
                ? ' para copiar'
                : selectionWindow.purpose === 'block-create'
                  ? ' para crear el bloque'
                : selectionWindow.purpose === 'select-set'
                  ? ' para el conjunto'
                : selectionWindow.purpose === 'move'
                  ? ' para desplazar'
                  : selectionWindow.purpose === 'rotate'
                    ? ' para girar'
                  : selectionWindow.purpose === 'erase'
                    ? ' para borrar'
                  : selectionWindow.purpose === 'explode'
                    ? ' para descomponer'
                    : selectionWindow.purpose === 'extend-boundaries' ? ' como limite' : ''
            } por ${mode}`
          : `Sin seleccion por ${mode}`;
      }

      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onWheel(event) {
    event.preventDefault();
    this.updateMouse(event);
    const delta = this.normalizeWheelDelta(event);
    const shiftZoom = event.shiftKey || this.state.shiftKeyDown;
    if (this.state.navigationDevice === 'mouse') {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        this.state.statusText = 'Zoom con rueda de raton';
        this.updateUiStatus();
        this.queueMouseWheelZoom(zoomDelta);
      }
      return;
    }

    if (shiftZoom) {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        this.cancelMouseWheelZoom();
        this.state.statusText = 'Zoom con Shift + dos dedos';
        this.updateUiStatus();
        const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -zoomDelta / 100);
        this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
      }
      return;
    }

    this.cancelMouseWheelZoom();
    this.state.viewOffset = {
      x: this.state.viewOffset.x + delta.x / this.state.viewScale,
      y: this.state.viewOffset.y + delta.y / this.state.viewScale,
    };
    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    }
    this.state.statusText = 'Pan con dos dedos';
    this.updateUiStatus();
    this.renderer.draw();
  }

  onKeyDown(event) {
    if (!drawingProfileDialog.hidden || !textDialog.hidden || !hatchDialog.hidden ||
        !polylineWidthDialog.hidden || !blockCreateDialog.hidden ||
        !blockInsertDialog.hidden || !aboutDialog.hidden) {
      return;
    }
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement ||
        event.target instanceof HTMLTextAreaElement) {
      return;
    }
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = true;
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) {
        redoDrawing();
      }
      else {
        undoDrawing();
      }
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      redoDrawing();
      return;
    }
    if (
      event.key.toLowerCase() === 'o' &&
      !event.metaKey && !event.ctrlKey && !event.altKey
    ) {
      event.preventDefault();
      if (!event.repeat) {
        this.clearShortcutPrefix();
        runCommand('toggle-ortho');
      }
      return;
    }
    const deleteSelectionKey = event.key === 'Delete' ||
      (event.key === 'Backspace' && !this.state.distanceInput);
    if (
      deleteSelectionKey &&
      !event.metaKey && !event.ctrlKey && !event.altKey &&
      this.doc.selectedEntities.size
    ) {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.clearShortcutPrefix();
      this.deleteSelectedEntities();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (this.handlePolylineCommandKey(event)) {
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (this.handleShortcutSequence(event)) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.handleCommandEnter();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (
      this.state.tool === 'copy' &&
      this.state.copyDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmCopySelection();
      return;
    }
    if (
      this.state.tool === 'move' &&
      this.state.moveDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmMoveSelection();
      return;
    }
    if (
      this.state.tool === 'erase' &&
      this.state.eraseDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmEraseSelection();
      return;
    }
    if (
      this.state.tool === 'extend' &&
      this.state.extendDraft?.phase === 'boundaries' &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmExtendBoundaries();
      return;
    }
    if (event.key.toLowerCase() === 'p' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      const recallsSelection = this.state.tool !== 'select' ||
        this.state.copyDraft?.selecting ||
        this.state.moveDraft?.selecting ||
        this.state.rotateDraft?.selecting ||
        this.state.eraseDraft?.selecting ||
        this.state.explodeDraft?.selecting ||
        this.state.extendDraft?.phase === 'boundaries' ||
        this.state.selectionSetDraft?.selecting;
      if (recallsSelection) {
        this.recallPreviousSelection();
        this.updateUiStatus();
        this.renderer.draw();
      }
      else {
        runCommand('polyline');
      }
      return;
    }
    if (event.key.toLowerCase() === 'l' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('line');
      return;
    }
    if (event.key.toLowerCase() === 'a' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('extend');
      return;
    }
    if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('erase');
      return;
    }
    if (
      event.key.toLowerCase() === 'x' &&
      !event.metaKey && !event.ctrlKey && !event.altKey &&
      this.state.tool === 'select' &&
      !this.state.selectedGrip &&
      !this.state.distanceInput
    ) {
      event.preventDefault();
      runCommand('explode');
      return;
    }
    if (event.key.toLowerCase() === 'g' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('rotate');
      return;
    }
    if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('fillet');
      return;
    }
    if (event.key.toLowerCase() === 't' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('text');
      return;
    }
    if (event.key.toLowerCase() === 'h' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('hatch');
      return;
    }
    if (this.handleDistanceInputKey(event)) {
      event.preventDefault();
      this.scheduleKeyboardRefresh();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.cancelCurrentCommand();
      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onKeyUp(event) {
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = false;
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
  }

  updateCursorInput() {
    const multiplier = parseCopyMultiplier(this.state.distanceInput);
    const copyMultiplierDraft = this.state.lastCopy && /^x\d*$/i.test(this.state.distanceInput.trim());
    const dimensionSuggestedDistance = this.state.dimensionDraft?.phase === 'placement' &&
      this.state.dimensionDraft.suggestionActive &&
      Number.isFinite(this.state.dimensionDraft.suggestedOffset)
      ? formatNumber(this.state.dimensionDraft.suggestedOffset)
      : '';
    const cursorInputValue = this.state.distanceInput || dimensionSuggestedDistance;
    const visible = Boolean(
      (
        this.state.pendingLineStart ||
        this.state.polylineDraft ||
        this.state.rectangleDraft ||
        this.state.selectedGrip ||
        this.state.circleDraft ||
        this.state.arcDraft ||
        this.state.copyDraft ||
        this.state.moveDraft ||
        this.state.rotateDraft ||
        this.state.blockCreateDraft?.name ||
        this.state.blockInsertDraft ||
        this.state.dimensionDraft?.phase === 'placement' ||
        copyMultiplierDraft
      ) &&
      cursorInputValue &&
      this.state.mouseScreen,
    );

    cursorInput.classList.toggle('is-visible', visible);
    cursorInput.setAttribute('aria-hidden', String(!visible));

    if (!visible) {
      return;
    }

    cursorInput.textContent = this.state.rotateDraft?.basePoint
      ? `${this.state.distanceInput}°`
      : multiplier || copyMultiplierDraft
      ? this.state.distanceInput
      : `${cursorInputValue} ${UNITS_LABEL}`;

    const parentRect = cursorInput.parentElement.getBoundingClientRect();
    const inputRect = cursorInput.getBoundingClientRect();
    const offset = 14;
    const x = clamp(
      this.state.mouseScreen.x + offset,
      4,
      Math.max(4, parentRect.width - inputRect.width - 4),
    );
    const y = clamp(
      this.state.mouseScreen.y + offset,
      4,
      Math.max(4, parentRect.height - inputRect.height - 4),
    );

    cursorInput.style.transform = `translate(${x}px, ${y}px)`;
  }

  updateUiStatus() {
    this.updateCanvasCursorMode();
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    if (this.state.dimensionDraft?.phase === 'placement' && cursor) {
      dimensionPlacementPoint(this.state.dimensionDraft, cursor, this.state);
    }
    let toolLabel = 'Seleccion';
    if (this.state.tool === 'line') {
      toolLabel = 'Linea 2P';
    }
    if (this.state.tool === 'polyline') {
      toolLabel = 'Polilinea';
    }
    if (this.state.tool === 'rectangle') {
      toolLabel = 'Rectangulo';
    }
    if (this.state.tool === 'text') {
      toolLabel = 'Texto';
    }
    if (this.state.tool === 'hatch') {
      toolLabel = 'Sombreado';
    }
    if (this.state.tool === 'circle-center') {
      toolLabel = 'Circulo C-R';
    }
    if (this.state.tool === 'circle-3p') {
      toolLabel = 'Circulo 3P';
    }
    if (this.state.tool === 'arc-center-radius') {
      toolLabel = 'Arco C-R';
    }
    if (this.state.tool === 'arc-3p') {
      toolLabel = 'Arco 3P';
    }
    if (this.state.tool === 'arc-center-start-end') {
      toolLabel = 'Arco C-I-F';
    }
    if (this.state.tool === 'trim') {
      toolLabel = 'Recortar';
    }
    if (this.state.tool === 'fillet') {
      toolLabel = `Empalme R${formatNumber(activeFilletRadius())}`;
    }
    if (this.state.tool === 'extend') {
      toolLabel = 'Alargar';
    }
    if (this.state.tool === 'erase') {
      toolLabel = 'Borrar';
    }
    if (this.state.tool === 'copy') {
      toolLabel = 'Copiar';
    }
    if (this.state.tool === 'move') {
      toolLabel = 'Desplazar';
    }
    if (this.state.tool === 'select-set') {
      toolLabel = 'Seleccionar DS';
    }
    if (this.state.tool === 'rotate') {
      toolLabel = 'Girar';
    }
    if (this.state.tool === 'explode') {
      toolLabel = 'Descomponer';
    }
    if (this.state.tool === 'block-create') {
      toolLabel = 'Crear bloque';
    }
    if (this.state.tool === 'block-insert') {
      toolLabel = 'Insertar bloque';
    }
    if (DIMENSION_TOOLS.has(this.state.tool)) {
      toolLabel = commandLabel(this.state.tool);
    }
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    const activeGripPoint = this.activeGripPoint();
    const coordinateOrigin = this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      activeGripPoint ||
      this.state.pendingLineStart ||
      activeDraftOrigin(this.state) ||
      this.state.rectangleDraft?.firstPoint ||
      this.state.circleDraft?.points[0] ||
      this.state.arcDraft?.points[0] ||
      (this.state.blockCreateDraft?.name ? { x: 0, y: 0 } : null) ||
      (this.state.blockInsertDraft ? { x: 0, y: 0 } : null) ||
      null;
    const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);
    const activeGripReferencePoint = this.activeGripReferencePoint();
    const activeGripAxisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    const gripDirectionPoint = activeGripPoint
      ? resolvePointForState(
          this.state.mouseWorld,
          this.state,
          activeGripReferencePoint,
          activeGripAxisLine ? { axisLine: activeGripAxisLine } : {},
        )
      : null;
    const previewEnd = coordinateTarget ||
      (inputDistance !== null && this.state.pendingLineStart && cursor
      ? pointFromDistance(this.state.pendingLineStart, cursor, inputDistance)
      : cursor);
    const gripPreviewEnd = coordinateTarget ||
      (inputDistance !== null && activeGripPoint && gripDirectionPoint
      ? pointFromDistance(activeGripPoint, gripDirectionPoint, inputDistance)
      : null);
    const copyPreviewTarget = this.state.copyDraft?.basePoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const movePreviewTarget = this.state.moveDraft?.basePoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const rectanglePreviewTarget = this.state.rectangleDraft?.firstPoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.rectangleDraft.firstPoint, cursor, inputDistance)
        : cursor))
      : null;
    const previewLength = this.state.pendingLineStart && previewEnd
      ? distance(this.state.pendingLineStart, previewEnd)
      : this.state.polylineDraft?.vertices.length && cursor
        ? distance(activeDraftOrigin(this.state), cursor)
      : rectanglePreviewTarget && this.state.rectangleDraft?.firstPoint
        ? distance(this.state.rectangleDraft.firstPoint, rectanglePreviewTarget)
      : this.state.circleDraft?.mode === 'center-radius' && this.state.circleDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.circleDraft.points[0], previewEnd))
      : this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.arcDraft.points[0], previewEnd))
      : gripPreviewEnd && activeGripPoint
        ? distance(activeGripPoint, gripPreviewEnd)
      : copyPreviewTarget && this.state.copyDraft?.basePoint
        ? distance(this.state.copyDraft.basePoint, copyPreviewTarget)
      : movePreviewTarget && this.state.moveDraft?.basePoint
        ? distance(this.state.moveDraft.basePoint, movePreviewTarget)
      : null;

    if (this.state.distanceInput) {
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : coordinateTarget
        ? `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : (
        this.state.circleDraft?.mode === 'center-radius' ||
        this.state.arcDraft?.mode === 'center-radius'
      )
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
    }
    else if (this.state.pendingLineStart && previewEnd) {
      const lineLength = formatNumber(previewLength);
      this.state.statusText = `Segundo punto pendiente - longitud ${lineLength} ${UNITS_LABEL}`;
    }
    else if (this.state.polylineDraft?.vertices.length && cursor) {
      const draft = this.state.polylineDraft;
      const modeLabel = draft.mode === 'line'
        ? 'Linea'
        : 'Arco tangente';
      const start = draft.vertices[draft.vertices.length - 1];
      const pendingMeasure = draft.mode === 'arc-end'
        ? polylineTangentArcToPoint(draft, start, cursor).radius
        : previewLength;
      this.state.statusText = `${modeLabel} pendiente · ${formatNumber(pendingMeasure)} ${UNITS_LABEL} · A/L/C/W`;
    }
    else if (this.state.rotateDraft?.basePoint) {
      const previewAngle = this.renderer.rotatePreviewAngle();
      this.state.statusText = previewAngle === null
        ? 'Angulo pendiente'
        : `Angulo pendiente - ${formatNumber(previewAngle)}°${this.state.orthoEnabled ? ' (orto)' : ''}`;
    }
    else if (this.state.rectangleDraft?.firstPoint && rectanglePreviewTarget) {
      const width = Math.abs(rectanglePreviewTarget.x - this.state.rectangleDraft.firstPoint.x);
      const height = Math.abs(rectanglePreviewTarget.y - this.state.rectangleDraft.firstPoint.y);
      this.state.statusText = `Esquina opuesta pendiente - ${formatNumber(width)} x ${formatNumber(height)} ${UNITS_LABEL}`;
    }
    else if (this.state.circleDraft?.mode === 'center-radius' && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${UNITS_LABEL}`;
    }
    else if (this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${UNITS_LABEL}`;
    }
    else if (this.state.blockCreateDraft?.name) {
      this.state.statusText = `Bloque ${this.state.blockCreateDraft.name}: indique el punto base`;
    }
    else if (this.state.blockInsertDraft?.definition) {
      this.state.statusText = `Insertar ${this.state.blockInsertDraft.definition.name}: indique el punto de insercion`;
    }
    if (!this.state.statusText) {
      this.state.statusText = 'Listo';
    }

    statusTool.textContent = `Herramienta: ${toolLabel}`;
    statusCursor.textContent = cursor
      ? `Cursor: ${formatNumber(cursor.x)}, ${formatNumber(cursor.y)} ${UNITS_LABEL}${
          this.state.activeObjectSnap ? ` · ${formatSnapType(this.state.activeObjectSnap.type)}` : ''
        }`
      : 'Cursor: -';
    statusEntities.textContent = `Entidades: ${this.doc.entities.length}`;
    statusLength.textContent = previewLength !== null
      ? `${this.state.circleDraft?.mode === 'center-radius' || this.state.arcDraft?.mode === 'center-radius' ? 'Radio' : 'Longitud'}: ${formatNumber(previewLength)} ${UNITS_LABEL}`
      : 'Longitud: -';
    statusLayer.textContent = `Capa: ${activeLayerName()} · ${getLineStyle(activeLineStyleId()).label} · ${getLineType(activeLineTypeId()).label} · ${getLineColor(activeLineColorId()).label}`;
    statusMessage.textContent = this.state.statusText || 'Listo';
    const editingBlock = this.state.blockEditDraft;
    blockEditorBar.hidden = !editingBlock;
    blockEditorName.textContent = editingBlock?.name || 'Bloque';
    statusDxf.textContent = editingBlock
      ? `EDITAR BLOQUE · ${editingBlock.name}`
      : `${activeDrawingProfile().shortLabel} · DXF`;
    statusOrthoButton.classList.toggle('is-active', this.state.orthoEnabled);
    statusOrthoButton.setAttribute('aria-pressed', String(this.state.orthoEnabled));
    statusOrthoButton.title = this.state.orthoEnabled
      ? 'Modo ortogonal activo (O)'
      : 'Modo ortogonal (O)';
    statusGridButton.classList.toggle('is-active', this.state.snapEnabled);
    statusGridButton.setAttribute('aria-pressed', String(this.state.snapEnabled));
    statusGridButton.title = this.state.snapEnabled
      ? 'Snap a rejilla activo'
      : 'Snap a rejilla desactivado';
    statusLineWeightButton.classList.toggle(
      'is-active',
      this.state.lineWeightDisplayEnabled,
    );
    statusLineWeightButton.setAttribute(
      'aria-pressed',
      String(this.state.lineWeightDisplayEnabled),
    );
    statusLineWeightButton.title = this.state.lineWeightDisplayEnabled
      ? 'Grosores de línea visibles'
      : 'Grosores de línea ocultos';
    undoButton.disabled = !this.doc.canUndo();
    redoButton.disabled = !this.doc.canRedo();
    undoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canUndo();
    });
    redoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canRedo();
    });
    this.updateCursorInput();
  }
}

const doc = new CadDocument();

function loadNavigationDevice() {
  try {
    const savedDevice = localStorage.getItem('webcad-navigation-device');
    return savedDevice === 'mouse' || savedDevice === 'trackpad'
      ? savedDevice
      : 'trackpad';
  }
  catch {
    return 'trackpad';
  }
}

function loadBooleanPreference(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? fallback : storedValue === 'true';
  }
  catch {
    return fallback;
  }
}

function loadLineStylePreference() {
  try {
    const storedStyle = localStorage.getItem('webcad-active-line-style');
    return storedStyle && LINE_STYLES[storedStyle] ? storedStyle : DEFAULT_LINE_STYLE;
  }
  catch {
    return DEFAULT_LINE_STYLE;
  }
}

function storePreference(key, value) {
  try {
    localStorage.setItem(key, String(value));
  }
  catch {
    // Preferences remain active for the current session when storage is unavailable.
  }
}

const state = {
  tool: 'select',
  pendingLineStart: null,
  polylineDraft: null,
  rectangleDraft: null,
  textDraft: null,
  hatchDraft: null,
  circleDraft: null,
  arcDraft: null,
  copyDraft: null,
  moveDraft: null,
  rotateDraft: null,
  filletDraft: null,
  selectionSetDraft: null,
  eraseDraft: null,
  explodeDraft: null,
  extendDraft: null,
  blockCreateDraft: null,
  blockInsertDraft: null,
  blockEditDraft: null,
  dimensionDraft: null,
  dimensionStyle: 'normal',
  lastDimensionOffsets: {
    engineering: null,
    architecture: null,
  },
  filletRadii: {
    engineering: 10,
    architecture: 0.25,
  },
  lastCopy: null,
  drawingProfile: 'engineering',
  navigationDevice: loadNavigationDevice(),
  lastTextHeight: DRAWING_PROFILES.engineering.defaultTextHeight,
  previousSelection: [],
  mouseWorld: null,
  mouseScreen: null,
  viewScale: 1,
  viewOffset: { x: 0, y: 0 },
  snapEnabled: loadBooleanPreference('webcad-grid-enabled', true),
  orthoEnabled: false,
  lineWeightDisplayEnabled: loadBooleanPreference('webcad-lineweight-display-enabled', true),
  distanceInput: '',
  selectedGrip: null,
  objectSnapEnabled: true,
  activeObjectSnap: null,
  hoveredEntity: null,
  snapPixelTolerance: 11,
  activeLineStyle: loadLineStylePreference(),
  activeLineType: DEFAULT_LINE_TYPE,
  activeLineColor: DEFAULT_LINE_COLOR,
  layers: [{ ...DEFAULT_LAYER }],
  activeLayer: DEFAULT_LAYER.name,
  lastCommand: null,
  lastCircleTool: 'circle-center',
  lastArcTool: 'arc-center-start-end',
  doc: null,
  hasInitializedView: false,
  shiftKeyDown: false,
  statusText: 'Listo',
};

const renderer = new CadRenderer(canvas, doc, state);
const controller = new CadController(canvas, doc, renderer, state);
state.doc = doc;
let textDialogEntity = null;
let hatchDialogEntity = null;

window.webcadDebug = { doc, state, renderer, controller, parseDxf, serializeDocumentToDxf };

function syncNavigationDeviceButtons() {
  const mouseActive = state.navigationDevice === 'mouse';
  navigationMouseButton.classList.toggle('is-active', mouseActive);
  navigationMouseButton.setAttribute('aria-pressed', String(mouseActive));
  navigationTrackpadButton.classList.toggle('is-active', !mouseActive);
  navigationTrackpadButton.setAttribute('aria-pressed', String(!mouseActive));
}

function setNavigationDevice(device) {
  if (device !== 'mouse' && device !== 'trackpad') {
    return false;
  }
  controller.cancelMouseWheelZoom();
  state.navigationDevice = device;
  try {
    localStorage.setItem('webcad-navigation-device', device);
  }
  catch {
    // The selected mode still works for this session when storage is unavailable.
  }
  syncNavigationDeviceButtons();
  state.statusText = device === 'mouse'
    ? 'Modo raton: rueda para zoom · boton central para pan'
    : 'Modo trackpad: dos dedos para pan · Shift + dos dedos para zoom';
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function setDrawingProfileRuntime(profileId) {
  const profile = drawingProfileById(profileId);
  state.drawingProfile = profile.id;
  GRID_BASE = profile.gridBase;
  MIN_VIEW_SCALE = profile.minViewScale;
  MAX_VIEW_SCALE = profile.maxViewScale;
  DEFAULT_DRAWING_SIZE = profile.defaultDrawingSize;
  UNITS_LABEL = profile.unitsLabel;
  state.lastTextHeight = profile.defaultTextHeight;
  syncFilletRadiusControl();
  return profile;
}

function activeFilletRadius() {
  return state.filletRadii[state.drawingProfile] ||
    (state.drawingProfile === 'architecture' ? 0.25 : 10);
}

function syncFilletRadiusControl() {
  if (!filletRadiusInput) {
    return;
  }
  filletRadiusInput.step = state.drawingProfile === 'architecture' ? '0.01' : '1';
  filletRadiusInput.value = String(activeFilletRadius());
}

function updateFilletRadiusFromInput() {
  const radius = Number(String(filletRadiusInput.value).replace(',', '.'));
  if (!Number.isFinite(radius) || radius <= SNAP_THRESHOLD) {
    state.statusText = 'El radio de empalme debe ser mayor que cero';
    controller.updateUiStatus();
    return false;
  }
  state.filletRadii[state.drawingProfile] = radius;
  state.statusText = `Radio de empalme: ${formatNumber(radius)} ${UNITS_LABEL}`;
  controller.updateUiStatus();
  return true;
}

function applyDrawingProfile(profileId) {
  const previousProfile = activeDrawingProfile();
  const profile = drawingProfileById(profileId);
  if (profile.id === previousProfile.id) {
    state.statusText = `Perfil activo: ${profile.label} (${profile.unitsLabel})`;
    controller.updateUiStatus();
    renderer.draw();
    return false;
  }

  controller.cancelCurrentCommand();
  setDrawingProfileRuntime(profile.id);
  renderer.fitToDocument();
  state.statusText = `Tipo de dibujo: ${profile.label} · unidades en ${profile.unitsLabel}`;
  controller.updateUiStatus();
  renderer.draw();
  return true;
}

function openDrawingProfileDialog() {
  drawingProfileInputs.forEach((input) => {
    input.checked = input.value === state.drawingProfile;
  });
  drawingProfileDialog.hidden = false;
  setLayerPickerOpen(false);
  setLineStylePickerOpen(false);
  setLineTypePickerOpen(false);
  setLineColorPickerOpen(false);
}

function closeDrawingProfileDialog() {
  drawingProfileDialog.hidden = true;
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmDrawingProfileDialog() {
  const selectedProfile = [...drawingProfileInputs].find((input) => input.checked)?.value;
  if (!selectedProfile) {
    return false;
  }
  drawingProfileDialog.hidden = true;
  applyDrawingProfile(selectedProfile);
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function openTextDialog(entity = null) {
  textDialogEntity = entity?.type === 'TEXT' ? entity : null;
  textDialogTitle.textContent = textDialogEntity ? 'Editar texto' : 'Crear texto';
  textContentInput.value = textDialogEntity?.text || '';
  textHeightInput.value = String(
    textDialogEntity?.height || state.lastTextHeight || activeDrawingProfile().defaultTextHeight,
  );
  textDialogError.textContent = '';
  textDialog.hidden = false;
  setLayerPickerOpen(false);
  setLineStylePickerOpen(false);
  setLineTypePickerOpen(false);
  setLineColorPickerOpen(false);
  requestAnimationFrame(() => {
    textContentInput.focus();
    textContentInput.select();
  });
}

function closeTextDialog(cancelled = true) {
  const wasEditing = Boolean(textDialogEntity);
  textDialog.hidden = true;
  textDialogEntity = null;
  textDialogError.textContent = '';
  if (cancelled && !wasEditing && state.tool === 'text') {
    controller.setTool('select');
    state.statusText = 'Texto cancelado';
  }
  else if (cancelled && wasEditing) {
    state.statusText = 'Edicion de texto cancelada';
  }
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmTextDialog() {
  const text = textContentInput.value.trim();
  const height = Number(String(textHeightInput.value).replace(',', '.'));
  if (!text) {
    textDialogError.textContent = 'Escriba el contenido del texto.';
    textContentInput.focus();
    return false;
  }
  if (!Number.isFinite(height) || height <= SNAP_THRESHOLD) {
    textDialogError.textContent = 'Indique una altura mayor que cero.';
    textHeightInput.focus();
    return false;
  }

  if (textDialogEntity) {
    const entity = textDialogEntity;
    if (entity.text !== text || Math.abs(entity.height - height) > SNAP_THRESHOLD) {
      doc.recordHistory();
      entity.text = text;
      entity.height = height;
      doc.markDirty();
    }
    state.lastTextHeight = height;
    textDialog.hidden = true;
    textDialogEntity = null;
    state.statusText = 'Texto actualizado';
    controller.updateUiStatus();
    renderer.draw();
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
    return true;
  }

  state.lastTextHeight = height;
  state.textDraft = { text, height };
  textDialog.hidden = true;
  state.statusText = 'Indique el punto de insercion del texto';
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function openPolylineWidthDialog() {
  const draft = state.polylineDraft;
  if (!draft) {
    return false;
  }
  polylineStartWidthInput.value = String(draft.startWidth || 0);
  polylineEndWidthInput.value = String(draft.endWidth || 0);
  polylineWidthError.textContent = '';
  polylineWidthDialog.hidden = false;
  requestAnimationFrame(() => {
    polylineStartWidthInput.focus();
    polylineStartWidthInput.select();
  });
  return true;
}

function closePolylineWidthDialog() {
  polylineWidthDialog.hidden = true;
  polylineWidthError.textContent = '';
  state.statusText = 'Anchura sin cambios - continue la polilinea';
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmPolylineWidthDialog() {
  const startWidth = Number(String(polylineStartWidthInput.value).replace(',', '.'));
  const endWidth = Number(String(polylineEndWidthInput.value).replace(',', '.'));
  if (!Number.isFinite(startWidth) || startWidth < 0 ||
      !Number.isFinite(endWidth) || endWidth < 0) {
    polylineWidthError.textContent = 'Indique anchuras iguales o mayores que cero.';
    return false;
  }
  if (!state.polylineDraft) {
    polylineWidthDialog.hidden = true;
    return false;
  }
  state.polylineDraft.startWidth = startWidth;
  state.polylineDraft.endWidth = endWidth;
  polylineWidthDialog.hidden = true;
  polylineWidthError.textContent = '';
  state.statusText = `Anchura del siguiente tramo: ${formatNumber(startWidth)} → ${formatNumber(endWidth)} ${UNITS_LABEL}`;
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function suggestedBlockName() {
  let index = doc.blockDefinitions.size + 1;
  while (doc.blockDefinitions.has(`bloque ${index}`.toLowerCase())) {
    index += 1;
  }
  return `Bloque ${index}`;
}

function openBlockCreateDialog() {
  if (!state.blockCreateDraft?.sourceEntities.length) {
    return false;
  }
  blockNameInput.value = suggestedBlockName();
  blockCreateError.textContent = '';
  blockCreateDialog.hidden = false;
  requestAnimationFrame(() => {
    blockNameInput.focus();
    blockNameInput.select();
  });
  return true;
}

function closeBlockCreateDialog(cancelled = true) {
  const sourceEntities = state.blockCreateDraft?.sourceEntities || [];
  blockCreateDialog.hidden = true;
  blockCreateError.textContent = '';
  if (cancelled) {
    controller.setTool('select');
    doc.selectEntities(sourceEntities.filter((entity) => doc.entities.includes(entity)));
    state.statusText = 'Creacion de bloque cancelada';
  }
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmBlockCreateDialog() {
  const name = blockNameInput.value.trim();
  if (!name) {
    blockCreateError.textContent = 'Escriba un nombre para el bloque.';
    blockNameInput.focus();
    return false;
  }
  if (/[<>\\/:;?*|="']/u.test(name)) {
    blockCreateError.textContent = 'El nombre contiene caracteres no válidos para DXF.';
    blockNameInput.focus();
    return false;
  }
  if (doc.blockDefinitions.has(name.toLowerCase())) {
    blockCreateError.textContent = 'Ya existe un bloque con ese nombre.';
    blockNameInput.focus();
    return false;
  }
  state.blockCreateDraft.name = name;
  blockCreateDialog.hidden = true;
  blockCreateError.textContent = '';
  state.statusText = `Bloque ${name}: indique el punto base`;
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function syncBlockInsertOptions() {
  const selectedName = blockInsertNameInput.value;
  blockInsertNameInput.replaceChildren();
  [...doc.blockDefinitions.values()]
    .filter((definition) =>
      definition.name.toLowerCase() !== String(doc.editingBlockName || '').toLowerCase())
    .sort((first, second) => first.name.localeCompare(second.name, 'es'))
    .forEach((definition) => {
      const option = document.createElement('option');
      option.value = definition.name;
      option.textContent = definition.name;
      blockInsertNameInput.append(option);
    });
  if ([...blockInsertNameInput.options].some((option) => option.value === selectedName)) {
    blockInsertNameInput.value = selectedName;
  }
}

function openBlockInsertDialog() {
  syncBlockInsertOptions();
  if (!blockInsertNameInput.options.length) {
    state.statusText = 'No hay bloques definidos en el dibujo';
    controller.setTool('select');
    return false;
  }
  blockInsertScaleInput.value = '1';
  blockInsertRotationInput.value = '0';
  blockInsertError.textContent = '';
  blockInsertDialog.hidden = false;
  requestAnimationFrame(() => blockInsertNameInput.focus());
  return true;
}

function closeBlockInsertDialog(cancelled = true) {
  blockInsertDialog.hidden = true;
  blockInsertError.textContent = '';
  if (cancelled) {
    controller.setTool('select');
    state.statusText = 'Insercion de bloque cancelada';
  }
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmBlockInsertDialog() {
  const definition = doc.blockDefinitions.get(blockInsertNameInput.value.toLowerCase());
  const scale = Number(String(blockInsertScaleInput.value).replace(',', '.'));
  const rotation = Number(String(blockInsertRotationInput.value).replace(',', '.'));
  if (!definition) {
    blockInsertError.textContent = 'Seleccione un bloque válido.';
    return false;
  }
  if (!Number.isFinite(scale) || scale <= SNAP_THRESHOLD) {
    blockInsertError.textContent = 'La escala debe ser mayor que cero.';
    blockInsertScaleInput.focus();
    return false;
  }
  if (!Number.isFinite(rotation)) {
    blockInsertError.textContent = 'Indique un ángulo válido.';
    blockInsertRotationInput.focus();
    return false;
  }
  state.blockInsertDraft = { definition, scale, rotation };
  blockInsertDialog.hidden = true;
  blockInsertError.textContent = '';
  state.statusText = `Insertar ${definition.name}: indique el punto de insercion`;
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function openHatchDialog(entity = null) {
  hatchDialogEntity = entity?.type === 'HATCH' ? entity : null;
  hatchDialogTitle.textContent = hatchDialogEntity ? 'Editar sombreado' : 'Crear sombreado';
  hatchDialogConfirmButton.textContent = hatchDialogEntity ? 'Aceptar' : 'Continuar';
  hatchPatternInput.value = hatchDialogEntity?.pattern || 'solid';
  hatchLayerInput.replaceChildren();
  const selectedLayerName = hatchDialogEntity?.layer || state.activeLayer;
  state.layers.forEach((layer) => {
    const option = document.createElement('option');
    option.value = layer.name;
    option.textContent = layer.name;
    option.selected = layer.name === selectedLayerName;
    hatchLayerInput.append(option);
  });
  const selectedLayer = state.layers.find((layer) => layer.name === selectedLayerName);
  hatchColorInput.value = hatchDialogEntity &&
    normalizeLineColorId(hatchDialogEntity.lineColor) !== normalizeLineColorId(selectedLayer?.lineColor)
    ? normalizeLineColorId(hatchDialogEntity.lineColor)
    : 'bylayer';
  hatchDialogError.textContent = '';
  hatchDialog.hidden = false;
  setLayerPickerOpen(false);
  setLineStylePickerOpen(false);
  setLineTypePickerOpen(false);
  setLineColorPickerOpen(false);
}

function closeHatchDialog(cancelled = true) {
  const wasEditing = Boolean(hatchDialogEntity);
  hatchDialog.hidden = true;
  hatchDialogEntity = null;
  hatchDialogError.textContent = '';
  if (cancelled && !wasEditing && state.tool === 'hatch') {
    controller.setTool('select');
    state.statusText = 'Sombreado cancelado';
  }
  else if (cancelled && wasEditing) {
    state.statusText = 'Edicion de sombreado cancelada';
  }
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmHatchDialog() {
  const layer = state.layers.find((candidate) => candidate.name === hatchLayerInput.value);
  if (!layer) {
    hatchDialogError.textContent = 'Seleccione una capa de destino válida.';
    return false;
  }
  const selectedColor = hatchColorInput.value === 'bylayer'
    ? layer.lineColor
    : normalizeLineColorId(hatchColorInput.value);

  if (hatchDialogEntity) {
    const entity = hatchDialogEntity;
    const changed = entity.pattern !== hatchPatternInput.value ||
      entity.layer !== layer.name ||
      normalizeLineStyleId(entity.lineStyle) !== normalizeLineStyleId(layer.lineStyle) ||
      normalizeLineTypeId(entity.lineType) !== normalizeLineTypeId(layer.lineType) ||
      normalizeLineColorId(entity.lineColor) !== normalizeLineColorId(selectedColor);
    if (changed) {
      doc.recordHistory();
      entity.pattern = hatchPatternInput.value;
      entity.layer = layer.name;
      applyLineStyleToEntity(entity, layer.lineStyle);
      applyLineTypeToEntity(entity, layer.lineType);
      applyLineColorToEntity(entity, selectedColor);
      doc.markDirty();
    }
    hatchDialog.hidden = true;
    hatchDialogEntity = null;
    state.statusText = changed ? 'Sombreado actualizado' : 'Sombreado sin cambios';
    controller.updateUiStatus();
    renderer.draw();
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
    return true;
  }

  state.hatchDraft = {
    pattern: hatchPatternInput.value,
    mode: 'point',
    layer: layer.name,
    lineColor: selectedColor,
  };
  hatchDialog.hidden = true;
  state.statusText = 'Sombreado solido: indique un punto interior';
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function toggleOrthoMode() {
  state.orthoEnabled = !state.orthoEnabled;
  state.statusText = state.orthoEnabled ? 'Modo ortogonal activo' : 'Modo libre';
  controller.updateUiStatus();
  renderer.draw();
}

function toggleGridSnap() {
  state.snapEnabled = !state.snapEnabled;
  storePreference('webcad-grid-enabled', state.snapEnabled);
  state.statusText = state.snapEnabled ? 'Snap a rejilla activo' : 'Snap a rejilla desactivado';
  controller.updateUiStatus();
  renderer.draw();
}

function toggleLineWeightDisplay() {
  state.lineWeightDisplayEnabled = !state.lineWeightDisplayEnabled;
  storePreference('webcad-lineweight-display-enabled', state.lineWeightDisplayEnabled);
  state.statusText = state.lineWeightDisplayEnabled
    ? 'Grosores de línea visibles'
    : 'Grosores de línea ocultos';
  controller.updateUiStatus();
  renderer.draw();
}

function fitView() {
  state.statusText = 'Vista ajustada';
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
}

function enterBlockEditor(reference) {
  if (!reference?.definition || state.blockEditDraft || doc.isEditingBlock()) {
    return false;
  }
  controller.setTool('select');
  const initialSnapshot = doc.snapshot();
  const undoStack = [...doc.undoStack];
  const redoStack = [...doc.redoStack];
  const savedView = {
    scale: state.viewScale,
    offset: { ...state.viewOffset },
  };
  if (!doc.beginBlockEdit(reference.definition)) {
    return false;
  }
  doc.redoStack = [];
  state.blockEditDraft = {
    name: reference.blockName,
    initialSnapshot,
    undoStack,
    redoStack,
    savedView,
  };
  state.statusText = `Editando bloque ${reference.blockName}`;
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
  return true;
}

function finishBlockEditor(saveChanges) {
  const draft = state.blockEditDraft;
  if (!draft || !doc.isEditingBlock()) {
    return false;
  }
  controller.setTool('select');
  if (!saveChanges) {
    doc.restoreSnapshot(draft.initialSnapshot);
    doc.undoStack = [...draft.undoStack];
    doc.redoStack = [...draft.redoStack];
  }
  else if (doc.undoStack.length === doc.editHistoryFloor) {
    doc.redoStack = [...draft.redoStack];
  }
  doc.endBlockEdit();
  state.blockEditDraft = null;
  state.viewScale = draft.savedView.scale;
  state.viewOffset = { ...draft.savedView.offset };
  if (state.mouseScreen) {
    state.mouseWorld = renderer.screenToWorld(state.mouseScreen);
  }
  state.statusText = saveChanges
    ? `Bloque ${draft.name} guardado`
    : `Cambios del bloque ${draft.name} descartados`;
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function newDrawing() {
  if (state.blockEditDraft) {
    state.statusText = 'Guarde o descarte la edicion del bloque antes de crear un dibujo';
    controller.updateUiStatus();
    renderer.draw();
    return false;
  }
  doc.clear();
  state.layers = [{ ...DEFAULT_LAYER }];
  state.activeLayer = DEFAULT_LAYER.name;
  state.activeLineStyle = DEFAULT_LAYER.lineStyle;
  state.activeLineType = DEFAULT_LAYER.lineType;
  state.activeLineColor = DEFAULT_LAYER.lineColor;
  state.pendingLineStart = null;
  state.polylineDraft = null;
  state.rectangleDraft = null;
  state.textDraft = null;
  state.hatchDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.rotateDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.lastCopy = null;
  state.lastTextHeight = activeDrawingProfile().defaultTextHeight;
  state.previousSelection = [];
  state.distanceInput = '';
  state.selectedGrip = null;
  state.statusText = `Nuevo dibujo · ${activeDrawingProfile().label} (${UNITS_LABEL})`;
  syncLayerPicker();
  syncLineStylePicker();
  syncLineTypePicker();
  syncLineColorPicker();
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
}

function exportDxf() {
  const dxf = serializeDocumentToDxf(doc);
  const blob = new Blob([dxf], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'drawing.dxf';
  link.click();
  URL.revokeObjectURL(url);
  state.statusText = `Exportadas ${doc.topLevelEntities().length} entidades DXF`;
  renderer.draw();
}

function importDxf() {
  if (state.blockEditDraft) {
    state.statusText = 'Guarde o descarte la edicion del bloque antes de importar';
    controller.updateUiStatus();
    renderer.draw();
    return false;
  }
  importDxfInput.value = '';
  importDxfInput.click();
  return true;
}

function showAbout() {
  aboutDialog.hidden = false;
  state.statusText = 'webCAD 0.4.0 · Autor: Gonzalo Rodriguez';
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => aboutDialogCloseButton.focus());
}

function closeAboutDialog() {
  aboutDialog.hidden = true;
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function resetInteractionState() {
  state.pendingLineStart = null;
  state.polylineDraft = null;
  state.rectangleDraft = null;
  state.textDraft = null;
  state.hatchDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.rotateDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.distanceInput = '';
  state.selectedGrip = null;
  state.activeObjectSnap = null;
  controller.gripDragState = null;
  controller.panState = null;
  canvas.classList.remove('is-panning', 'is-dragging');
  controller.setTool('select');
}

function undoDrawing() {
  if (!doc.canUndo()) {
    state.statusText = 'No hay nada que deshacer';
    controller.updateUiStatus();
    renderer.draw();
    return;
  }
  resetInteractionState();
  doc.undo();
  state.statusText = 'Deshecho';
  controller.updateUiStatus();
  renderer.draw();
}

function redoDrawing() {
  if (!doc.canRedo()) {
    state.statusText = 'No hay nada que rehacer';
    controller.updateUiStatus();
    renderer.draw();
    return;
  }
  resetInteractionState();
  doc.redo();
  state.statusText = 'Rehecho';
  controller.updateUiStatus();
  renderer.draw();
}

function layerDisplayColor(layer) {
  return getLineColor(layer.lineColor).color || getLineStyle(layer.lineStyle).color;
}

function layerCreationDisplayColor() {
  return getLineColor(layerCreationColor).color || getLineStyle(layerStyleInput.value).color;
}

function ensureLayerColorOption(lineColorId) {
  const normalized = normalizeLineColorId(lineColorId);
  const existing = [...layerColorInput.options].find((option) => option.value === normalized);
  if (existing) {
    return existing;
  }
  const option = document.createElement('option');
  option.value = normalized;
  option.textContent = getLineColor(normalized).label;
  option.dataset.customColor = 'true';
  const otherOption = [...layerColorInput.options].find((candidate) => candidate.value === 'other');
  layerColorInput.insertBefore(option, otherOption || null);
  return option;
}

function syncLayerCreationColorControl() {
  ensureLayerColorOption(layerCreationColor);
  layerColorInput.value = normalizeLineColorId(layerCreationColor);
  layerColorPreview.style.background = layerCreationDisplayColor();
  const lineColor = getLineColor(layerCreationColor);
  layerColorPaletteValue.textContent = lineColor.label;
  layerColorGrid.querySelectorAll('[data-layer-palette-color]').forEach((button) => {
    button.classList.toggle(
      'is-active',
      normalizeLineColorId(button.dataset.layerPaletteColor) === lineColor.id,
    );
  });
}

function setLayerColorPaletteOpen(open) {
  layerColorPalette.hidden = !open;
  layerPicker.classList.toggle('is-palette-open', open);
  if (open) {
    syncLayerCreationColorControl();
  }
}

function selectLayerCreationColor(lineColorId) {
  layerCreationColor = normalizeLineColorId(lineColorId);
  syncLayerCreationColorControl();
  setLayerColorPaletteOpen(false);
}

function buildLayerColorPalette() {
  const paletteIds = [
    DEFAULT_LINE_COLOR,
    ...Array.from({ length: 255 }, (_, index) => normalizeLineColorId(String(index + 1))),
  ];
  const fragment = document.createDocumentFragment();
  paletteIds.forEach((lineColorId, index) => {
    const lineColor = getLineColor(lineColorId);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'layer-color-cell';
    button.dataset.layerPaletteColor = lineColor.id;
    button.setAttribute('role', 'gridcell');
    button.setAttribute('aria-label', index === 0 ? 'Color por defecto' : `Color ACI ${index}`);
    button.title = index === 0 ? 'Por defecto' : `ACI ${index}`;
    button.style.setProperty('--palette-color', lineColor.color || LINE_COLOR);
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectLayerCreationColor(lineColor.id);
    });
    fragment.append(button);
  });
  layerColorGrid.replaceChildren(fragment);
}

function setLayerPickerOpen(open) {
  if (open) {
    setLineStylePickerOpen(false);
    setLineTypePickerOpen(false);
    setLineColorPickerOpen(false);
  }
  layerPicker.classList.toggle('is-open', open);
  if (!open) {
    layerPicker.classList.remove('is-creating', 'is-palette-open');
    layerColorPalette.hidden = true;
  }
  layerToggle.setAttribute('aria-expanded', String(open));
}

function syncLayerPicker() {
  const activeLayer = activeLayerDefinition();
  layerLabel.textContent = activeLayerName();
  layerActiveSwatch.style.setProperty('--layer-color', layerDisplayColor(activeLayer));
  layerToggle.setAttribute(
    'aria-label',
    `Capa activa: ${activeLayerName()}, color ${getLineColor(activeLayer.lineColor).label}`,
  );
  layerList.replaceChildren();
  state.layers.forEach((layer) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `layer-option${layer.name === state.activeLayer ? ' is-active' : ''}`;
    button.dataset.layerName = layer.name;
    button.setAttribute('role', 'menuitem');

    const swatch = document.createElement('span');
    swatch.className = 'layer-swatch';
    swatch.style.setProperty('--layer-color', layerDisplayColor(layer));
    const label = document.createElement('span');
    label.textContent = layer.name;
    button.append(swatch, label);
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setActiveLayer(layer.name);
    });
    layerList.append(button);
  });
}

function setActiveLayer(layerName) {
  const layer = state.layers.find((candidate) => candidate.name === layerName);
  if (!layer) {
    return false;
  }

  state.activeLayer = layer.name;
  state.activeLineStyle = normalizeLineStyleId(layer.lineStyle);
  storePreference('webcad-active-line-style', state.activeLineStyle);
  state.activeLineType = normalizeLineTypeId(layer.lineType);
  state.activeLineColor = normalizeLineColorId(layer.lineColor);
  const selectedEntities = state.selectedGrip?.entity
    ? doc.groupEntities(state.selectedGrip.entity)
    : [...doc.selectedEntities];
  if (state.tool === 'select' && selectedEntities.length) {
    doc.recordHistory();
    selectedEntities.forEach((entity) => applyLayerToEntity(entity, layer));
    doc.markDirty();
    state.statusText = `${selectedEntities.length} entidad${selectedEntities.length === 1 ? '' : 'es'} movida${selectedEntities.length === 1 ? '' : 's'} a capa ${layer.name}`;
  }
  else {
    state.statusText = `Capa activa: ${layer.name}`;
  }

  syncLayerPicker();
  syncLineStylePicker();
  syncLineTypePicker();
  syncLineColorPicker();
  setLayerPickerOpen(false);
  controller.updateUiStatus();
  renderer.draw();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  return true;
}

function nextLayerName() {
  let index = 1;
  while (state.layers.some((layer) => layer.name.toLowerCase() === `capa ${index}`)) {
    index += 1;
  }
  return `Capa ${index}`;
}

function openLayerCreation() {
  layerNameInput.value = nextLayerName();
  layerStyleInput.value = 'normal';
  layerTypeInput.value = 'continuous';
  layerColorInput.querySelectorAll('[data-custom-color]').forEach((option) => option.remove());
  layerCreationColor = 'aci7';
  syncLayerCreationColorControl();
  setLayerColorPaletteOpen(false);
  layerPicker.classList.add('is-open', 'is-creating');
  layerToggle.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => {
    layerNameInput.focus();
    layerNameInput.select();
  });
}

function createLayerFromPanel() {
  const name = layerNameInput.value.trim();
  if (!name) {
    state.statusText = 'La capa necesita un nombre';
    controller.updateUiStatus();
    layerNameInput.focus();
    return false;
  }
  if (state.layers.some((layer) => layer.name.toLowerCase() === name.toLowerCase())) {
    state.statusText = `Ya existe la capa ${name}`;
    controller.updateUiStatus();
    layerNameInput.focus();
    return false;
  }

  state.layers.push({
    name,
    lineStyle: normalizeLineStyleId(layerStyleInput.value),
    lineType: normalizeLineTypeId(layerTypeInput.value),
    lineColor: normalizeLineColorId(layerCreationColor),
  });
  layerPicker.classList.remove('is-creating');
  setActiveLayer(name);
  state.statusText = `Capa ${name} creada y activada`;
  controller.updateUiStatus();
  renderer.draw();
  return true;
}

function syncLayersFromEntities(entities) {
  const layers = [{ ...DEFAULT_LAYER }];
  const addLayer = (definition) => {
    const name = String(definition.name || '').trim();
    if (!name || layers.some((layer) => layer.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    layers.push({
      name,
      lineStyle: normalizeLineStyleId(definition.lineStyle),
      lineType: normalizeLineTypeId(definition.lineType),
      lineColor: normalizeLineColorId(definition.lineColor),
    });
  };
  (entities.layerDefinitions || []).forEach(addLayer);
  entities.forEach((entity) => {
    const existing = layers.find(
      (layer) => layer.name.toLowerCase() === String(entity.layer || '').toLowerCase(),
    );
    if (existing) {
      entity.layer = existing.name;
      return;
    }
    addLayer({
      name: entity.layer || `Capa ${layers.length}`,
      lineStyle: normalizeLineStyleId(entity.lineStyle),
      lineType: normalizeLineTypeId(entity.lineType),
      lineColor: normalizeLineColorId(entity.lineColor),
    });
  });
  state.layers = layers;
  state.activeLayer = DEFAULT_LAYER.name;
  state.activeLineStyle = DEFAULT_LAYER.lineStyle;
  state.activeLineType = DEFAULT_LAYER.lineType;
  state.activeLineColor = DEFAULT_LAYER.lineColor;
  syncLayerPicker();
  syncLineStylePicker();
  syncLineTypePicker();
  syncLineColorPicker();
}

function setLineStylePickerOpen(open) {
  if (open) {
    setLayerPickerOpen(false);
    setLineTypePickerOpen(false);
    setLineColorPickerOpen(false);
  }
  lineStylePicker.classList.toggle('is-open', open);
  lineStyleToggle.setAttribute('aria-expanded', String(open));
}

function setLineTypePickerOpen(open) {
  if (open) {
    layerPicker.classList.remove('is-open', 'is-creating');
    layerToggle.setAttribute('aria-expanded', 'false');
    lineStylePicker.classList.remove('is-open');
    lineStyleToggle.setAttribute('aria-expanded', 'false');
    setLineColorPickerOpen(false);
  }
  lineTypePicker.classList.toggle('is-open', open);
  lineTypeToggle.setAttribute('aria-expanded', String(open));
}

function setLineColorPickerOpen(open) {
  if (open) {
    layerPicker.classList.remove('is-open', 'is-creating');
    layerToggle.setAttribute('aria-expanded', 'false');
    lineStylePicker.classList.remove('is-open');
    lineStyleToggle.setAttribute('aria-expanded', 'false');
    lineTypePicker.classList.remove('is-open');
    lineTypeToggle.setAttribute('aria-expanded', 'false');
  }
  lineColorPicker.classList.toggle('is-open', open);
  lineColorToggle.setAttribute('aria-expanded', String(open));
}

function syncLineStylePicker() {
  const style = getLineStyle(state.activeLineStyle);
  lineStyleLabel.textContent = style.label;
  lineStyleOptionButtons.forEach((button) => {
    const active = normalizeLineStyleId(button.dataset.lineStyle) === style.id;
    button.classList.toggle('is-active', active);
  });
}

function syncLineTypePicker() {
  const lineType = getLineType(state.activeLineType);
  const previewPath = lineTypeLabel.querySelector('path');
  if (lineType.dash.length) {
    previewPath.setAttribute('stroke-dasharray', lineType.dash.join(' '));
  }
  else {
    previewPath.removeAttribute('stroke-dasharray');
  }
  lineTypeToggle.title = lineType.label;
  lineTypeToggle.setAttribute('aria-label', `Tipo de linea: ${lineType.label}`);
  lineTypeOptionButtons.forEach((button) => {
    button.classList.toggle('is-active', normalizeLineTypeId(button.dataset.lineType) === lineType.id);
  });
}

function syncLineColorPicker() {
  const lineColor = getLineColor(state.activeLineColor);
  lineColorLabel.className = `line-color-current is-${lineColor.id}`;
  const predefinedColorIds = new Set([
    'default', 'red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'aci7',
  ]);
  lineColorLabel.style.background = predefinedColorIds.has(lineColor.id)
    ? ''
    : lineColor.color;
  lineColorToggle.title = lineColor.label;
  lineColorToggle.setAttribute('aria-label', `Color de linea: ${lineColor.label}`);
  lineColorOptionButtons.forEach((button) => {
    button.classList.toggle('is-active', normalizeLineColorId(button.dataset.lineColor) === lineColor.id);
  });
}

function setActiveLineStyle(styleId) {
  const style = getLineStyle(styleId);
  state.activeLineStyle = style.id;
  storePreference('webcad-active-line-style', state.activeLineStyle);
  syncLineStylePicker();

  const selectedEntities = state.selectedGrip?.entity
    ? [state.selectedGrip.entity]
    : [...doc.selectedEntities];
  if (state.tool === 'select' && selectedEntities.length) {
    const changedEntities = selectedEntities.filter((entity) => normalizeLineStyleId(entity.lineStyle) !== style.id);
    if (changedEntities.length) {
      doc.recordHistory();
      changedEntities.forEach((entity) => applyLineStyleToEntity(entity, style.id));
      doc.markDirty();
    }
    state.statusText = changedEntities.length === 1
      ? `Entidad cambiada a grosor ${style.label}`
      : changedEntities.length
        ? `${changedEntities.length} entidades cambiadas a grosor ${style.label}`
        : `Entidad ya tiene grosor ${style.label}`;
  }
  else {
    state.statusText = `Grosor activo: ${style.label}`;
  }

  controller.updateUiStatus();
  renderer.draw();
  setLineStylePickerOpen(false);
  lineStyleToggle.blur();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function setActiveLineType(lineTypeId) {
  const lineType = getLineType(lineTypeId);
  state.activeLineType = lineType.id;
  syncLineTypePicker();

  const selectedEntities = state.selectedGrip?.entity
    ? doc.groupEntities(state.selectedGrip.entity)
    : [...doc.selectedEntities];
  if (state.tool === 'select' && selectedEntities.length) {
    const changedEntities = selectedEntities.filter(
      (entity) => normalizeLineTypeId(entity.lineType) !== lineType.id,
    );
    if (changedEntities.length) {
      doc.recordHistory();
      changedEntities.forEach((entity) => applyLineTypeToEntity(entity, lineType.id));
      doc.markDirty();
    }
    state.statusText = changedEntities.length === 1
      ? `Entidad cambiada a linea ${lineType.label.toLowerCase()}`
      : changedEntities.length
        ? `${changedEntities.length} entidades cambiadas a linea ${lineType.label.toLowerCase()}`
        : `La seleccion ya usa linea ${lineType.label.toLowerCase()}`;
  }
  else {
    state.statusText = `Tipo de linea activo: ${lineType.label}`;
  }

  controller.updateUiStatus();
  renderer.draw();
  setLineTypePickerOpen(false);
  lineTypeToggle.blur();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function setActiveLineColor(lineColorId) {
  const lineColor = getLineColor(lineColorId);
  state.activeLineColor = lineColor.id;
  syncLineColorPicker();

  const selectedEntities = state.selectedGrip?.entity
    ? doc.groupEntities(state.selectedGrip.entity)
    : [...doc.selectedEntities];
  if (state.tool === 'select' && selectedEntities.length) {
    const changedEntities = selectedEntities.filter(
      (entity) => normalizeLineColorId(entity.lineColor) !== lineColor.id,
    );
    if (changedEntities.length) {
      doc.recordHistory();
      changedEntities.forEach((entity) => applyLineColorToEntity(entity, lineColor.id));
      doc.markDirty();
    }
    state.statusText = changedEntities.length === 1
      ? `Entidad cambiada a color ${lineColor.label.toLowerCase()}`
      : changedEntities.length
        ? `${changedEntities.length} entidades cambiadas a color ${lineColor.label.toLowerCase()}`
        : `La seleccion ya usa color ${lineColor.label.toLowerCase()}`;
  }
  else {
    state.statusText = `Color activo: ${lineColor.label}`;
  }

  controller.updateUiStatus();
  renderer.draw();
  setLineColorPickerOpen(false);
  lineColorToggle.blur();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function setToolGroupOpen(groupElement, open) {
  toolGroupElements.forEach((element) => {
    const shouldOpen = element === groupElement && open;
    element.classList.toggle('is-open', shouldOpen);
    element.querySelector('.tool-menu-button')?.setAttribute('aria-expanded', String(shouldOpen));
  });
}

function closeToolGroups() {
  setToolGroupOpen(null, false);
}

function commandLabel(command) {
  const labels = {
    line: 'Linea',
    polyline: 'Polilinea',
    rectangle: 'Rectangulo',
    text: 'Texto',
    hatch: 'Sombreado',
    'circle-center': 'Circulo centro-radio',
    'circle-3p': 'Circulo 3 puntos',
    'arc-center-radius': 'Arco centro-radio',
    'arc-3p': 'Arco 3 puntos',
    'arc-center-start-end': 'Arco centro-inicio-final',
    'block-create': 'Crear bloque',
    'block-insert': 'Insertar bloque',
    'dimension-horizontal': 'Cota horizontal',
    'dimension-vertical': 'Cota vertical',
    'dimension-aligned': 'Cota alineada',
    'dimension-angular': 'Cota angular',
    'dimension-radius': 'Cota de radio',
    'dimension-diameter': 'Cota de diametro',
    copy: 'Copiar',
    move: 'Desplazar',
    rotate: 'Girar',
    'select-set': 'Seleccionar conjunto',
    trim: 'Recortar',
    extend: 'Alargar',
    fillet: 'Empalme',
    erase: 'Borrar',
    explode: 'Descomponer',
  };
  return labels[command] || 'Comando';
}

function runCommand(command) {
  if (REPEATABLE_COMMANDS.has(command)) {
    state.lastCommand = command;
  }
  if (command === 'undo') undoDrawing();
  if (command === 'redo') redoDrawing();
  if (command === 'select') controller.setTool('select');
  if (command === 'select-set') controller.startSelectionSet();
  if (command === 'line') controller.setTool('line');
  if (command === 'polyline') controller.setTool('polyline');
  if (command === 'rectangle') controller.setTool('rectangle');
  if (command === 'text') controller.startText();
  if (command === 'hatch') controller.startHatch();
  if (command === 'block-create') controller.startBlockCreate();
  if (command === 'block-insert') controller.startBlockInsert();
  if (DIMENSION_TOOLS.has(command)) controller.startDimension(command);
  if (command === 'circle-center' || command === 'circle-3p') {
    state.lastCircleTool = command;
    circleToolButton.dataset.tool = command;
    controller.setTool(command);
  }
  if (
    command === 'arc-center-radius' ||
    command === 'arc-3p' ||
    command === 'arc-center-start-end'
  ) {
    state.lastArcTool = command;
    arcToolButton.dataset.tool = command;
    controller.setTool(command);
  }
  if (command === 'copy') controller.startCopy();
  if (command === 'move') controller.startMove();
  if (command === 'rotate') controller.startRotate();
  if (command === 'trim') controller.setTool('trim');
  if (command === 'fillet') controller.setTool('fillet');
  if (command === 'extend') controller.startExtend();
  if (command === 'erase') controller.startErase();
  if (command === 'explode') controller.startExplode();
  if (command === 'toggle-ortho') toggleOrthoMode();
  if (command === 'toggle-grid') toggleGridSnap();
  if (command === 'toggle-lineweight') toggleLineWeightDisplay();
  if (command === 'fit') fitView();
  if (command === 'navigation-mouse') setNavigationDevice('mouse');
  if (command === 'navigation-trackpad') setNavigationDevice('trackpad');
  if (command === 'new') newDrawing();
  if (command === 'drawing-profile') openDrawingProfileDialog();
  if (command === 'export-dxf') exportDxf();
  if (command === 'import-dxf') importDxf();
  if (command === 'about') showAbout();
  if (!command.startsWith('toggle-')) {
    closeToolGroups();
  }
}

menuCommandButtons.forEach((button) => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});

dimensionStyleSelect.addEventListener('change', () => {
  state.dimensionStyle = DIMENSION_STYLES[dimensionStyleSelect.value]?.id || 'normal';
  state.statusText = `Estilo de cota: ${DIMENSION_STYLES[state.dimensionStyle].label}`;
  controller.updateUiStatus();
  renderer.draw();
});

navigationMouseButton.addEventListener('click', () => runCommand('navigation-mouse'));
navigationTrackpadButton.addEventListener('click', () => runCommand('navigation-trackpad'));
statusOrthoButton.addEventListener('click', () => runCommand('toggle-ortho'));
statusGridButton.addEventListener('click', () => runCommand('toggle-grid'));
statusLineWeightButton.addEventListener('click', () => runCommand('toggle-lineweight'));
filletRadiusInput.addEventListener('change', () => {
  updateFilletRadiusFromInput();
  renderer.draw();
});
filletRadiusInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (updateFilletRadiusFromInput()) {
      canvas.focus({ preventScroll: true });
      renderer.draw();
    }
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    controller.cancelCurrentCommand();
    controller.updateUiStatus();
    renderer.draw();
    canvas.focus({ preventScroll: true });
  }
});
blockEditorSaveButton.addEventListener('click', () => finishBlockEditor(true));
blockEditorDiscardButton.addEventListener('click', () => finishBlockEditor(false));
selectToolButton.addEventListener('click', () => runCommand('select'));
lineToolButton.addEventListener('click', () => runCommand('line'));
polylineToolButton.addEventListener('click', () => runCommand('polyline'));
rectangleToolButton.addEventListener('click', () => runCommand('rectangle'));
textToolButton.addEventListener('click', () => runCommand('text'));
hatchToolButton.addEventListener('click', () => runCommand('hatch'));
circleToolButton.addEventListener('click', () => runCommand(state.lastCircleTool));
function toggleToolGroupFromButton(button, event) {
  event.preventDefault();
  event.stopPropagation();
  const group = button.closest('.tool-group');
  setToolGroupOpen(group, !group.classList.contains('is-open'));
}

circleToolMenuButton.addEventListener('pointerdown', (event) => {
  toggleToolGroupFromButton(circleToolMenuButton, event);
});
circleToolMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
arcToolButton.addEventListener('click', () => runCommand(state.lastArcTool));
arcToolMenuButton.addEventListener('pointerdown', (event) => {
  toggleToolGroupFromButton(arcToolMenuButton, event);
});
arcToolMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
blockToolButton.addEventListener('click', () => runCommand('block-insert'));
blockToolMenuButton.addEventListener('pointerdown', (event) => {
  toggleToolGroupFromButton(blockToolMenuButton, event);
});
blockToolMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
toolFlyoutCommandButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    runCommand(button.dataset.command);
  });
});
trimToolButton.addEventListener('click', () => runCommand('trim'));
extendToolButton.addEventListener('click', () => runCommand('extend'));
filletToolButton.addEventListener('click', () => runCommand('fillet'));
copyToolButton.addEventListener('click', () => runCommand('copy'));
moveToolButton.addEventListener('click', () => runCommand('move'));
rotateToolButton.addEventListener('click', () => runCommand('rotate'));
eraseToolButton.addEventListener('click', () => runCommand('erase'));
explodeToolButton.addEventListener('click', () => runCommand('explode'));
fitButton.addEventListener('click', () => runCommand('fit'));
undoButton.addEventListener('click', () => runCommand('undo'));
redoButton.addEventListener('click', () => runCommand('redo'));
newButton.addEventListener('click', () => runCommand('new'));
exportDxfButton.addEventListener('click', () => runCommand('export-dxf'));
importDxfButton.addEventListener('click', () => runCommand('import-dxf'));
lineStyleToggle.addEventListener('click', () => {
  setLineStylePickerOpen(!lineStylePicker.classList.contains('is-open'));
});
layerToggle.addEventListener('click', () => {
  setLayerPickerOpen(!layerPicker.classList.contains('is-open'));
});
layerCreateOpenButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  event.stopPropagation();
  openLayerCreation();
});
layerCreateCancelButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  event.stopPropagation();
  layerPicker.classList.remove('is-creating', 'is-palette-open');
  layerColorPalette.hidden = true;
});
layerCreateConfirmButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  event.stopPropagation();
  createLayerFromPanel();
});
layerNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    createLayerFromPanel();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    layerPicker.classList.remove('is-creating', 'is-palette-open');
    layerColorPalette.hidden = true;
  }
});
layerColorInput.addEventListener('change', () => {
  if (layerColorInput.value === 'other') {
    ensureLayerColorOption(layerCreationColor);
    layerColorInput.value = normalizeLineColorId(layerCreationColor);
    setLayerColorPaletteOpen(true);
    return;
  }
  selectLayerCreationColor(layerColorInput.value);
});
layerStyleInput.addEventListener('change', () => {
  syncLayerCreationColorControl();
});
lineStyleOptionButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveLineStyle(button.dataset.lineStyle);
  });
});
lineTypeToggle.addEventListener('click', () => {
  setLineTypePickerOpen(!lineTypePicker.classList.contains('is-open'));
});
lineTypeOptionButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveLineType(button.dataset.lineType);
  });
});
lineColorToggle.addEventListener('click', () => {
  setLineColorPickerOpen(!lineColorPicker.classList.contains('is-open'));
});
lineColorOptionButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveLineColor(button.dataset.lineColor);
  });
});
document.addEventListener('pointerdown', (event) => {
  if (!layerPicker.contains(event.target)) {
    setLayerPickerOpen(false);
  }
  if (!lineStylePicker.contains(event.target)) {
    setLineStylePickerOpen(false);
  }
  if (!lineTypePicker.contains(event.target)) {
    setLineTypePickerOpen(false);
  }
  if (!lineColorPicker.contains(event.target)) {
    setLineColorPickerOpen(false);
  }
  if (![...toolGroupElements].some((element) => element.contains(event.target))) {
    closeToolGroups();
  }
});

async function readDxfText(file) {
  const buffer = await file.arrayBuffer();
  const windowsText = new TextDecoder('windows-1252').decode(buffer);
  if (/\$DWGCODEPAGE[\s\S]{0,80}ANSI_1252/i.test(windowsText)) {
    return windowsText;
  }
  return new TextDecoder('utf-8').decode(buffer);
}

importDxfInput.addEventListener('change', async (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  state.statusText = `Analizando ${file.name}...`;
  controller.updateUiStatus();
  renderer.draw();
  await new Promise((resolve) => requestAnimationFrame(resolve));

  let entities;
  try {
    const text = await readDxfText(file);
    entities = parseDxf(text);
  }
  catch (error) {
    console.error('No se pudo importar el DXF', error);
    state.statusText = `No se pudo importar ${file.name}`;
    controller.updateUiStatus();
    renderer.draw();
    event.target.value = '';
    return;
  }
  if (entities.drawingProfile) {
    setDrawingProfileRuntime(entities.drawingProfile);
  }
  syncLayersFromEntities(entities);
  doc.setEntities(entities);
  state.pendingLineStart = null;
  state.polylineDraft = null;
  state.rectangleDraft = null;
  state.textDraft = null;
  state.hatchDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.rotateDraft = null;
  state.filletDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.lastCopy = null;
  state.previousSelection = [];
  state.distanceInput = '';
  state.selectedGrip = null;
  state.statusText = `Importadas ${entities.length} entidades DXF en ${state.layers.length} capas · ${activeDrawingProfile().label} (${UNITS_LABEL})${
    entities.drawingProfileDetected ? ' · perfil detectado automaticamente' : ''
  }${
    entities.skippedPatternHatchCount
      ? ` · ${entities.skippedPatternHatchCount} sombreados de patron omitidos`
      : ''
  }${
    entities.skippedHatchCount ? ` · ${entities.skippedHatchCount} sombreados incompatibles omitidos` : ''
  }`;
  const headerBounds = entities.drawingExtents;
  if (headerBounds) {
    renderer.fitBounds(headerBounds);
  }
  else {
    renderer.fitToDocument();
  }
  controller.updateUiStatus();
  renderer.draw();
  event.target.value = '';
});

drawingProfileConfirmButton.addEventListener('click', confirmDrawingProfileDialog);
drawingProfileCancelButton.addEventListener('click', closeDrawingProfileDialog);
drawingProfileCloseButton.addEventListener('click', closeDrawingProfileDialog);
drawingProfileDialog.addEventListener('pointerdown', (event) => {
  if (event.target === drawingProfileDialog) {
    closeDrawingProfileDialog();
  }
});
drawingProfileDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    confirmDrawingProfileDialog();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeDrawingProfileDialog();
  }
});

textDialogConfirmButton.addEventListener('click', confirmTextDialog);
textDialogCancelButton.addEventListener('click', () => closeTextDialog(true));
textDialogCloseButton.addEventListener('click', () => closeTextDialog(true));
textDialog.addEventListener('pointerdown', (event) => {
  if (event.target === textDialog) {
    closeTextDialog(true);
  }
});
[textContentInput, textHeightInput].forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmTextDialog();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeTextDialog(true);
    }
  });
});
polylineWidthConfirmButton.addEventListener('click', confirmPolylineWidthDialog);
polylineWidthCancelButton.addEventListener('click', closePolylineWidthDialog);
polylineWidthCloseButton.addEventListener('click', closePolylineWidthDialog);
polylineWidthDialog.addEventListener('pointerdown', (event) => {
  if (event.target === polylineWidthDialog) {
    closePolylineWidthDialog();
  }
});
blockCreateConfirmButton.addEventListener('click', confirmBlockCreateDialog);
blockCreateCancelButton.addEventListener('click', () => closeBlockCreateDialog(true));
blockCreateCloseButton.addEventListener('click', () => closeBlockCreateDialog(true));
blockCreateDialog.addEventListener('pointerdown', (event) => {
  if (event.target === blockCreateDialog) {
    closeBlockCreateDialog(true);
  }
});
blockNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    confirmBlockCreateDialog();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    closeBlockCreateDialog(true);
  }
});
blockInsertConfirmButton.addEventListener('click', confirmBlockInsertDialog);
blockInsertCancelButton.addEventListener('click', () => closeBlockInsertDialog(true));
blockInsertCloseButton.addEventListener('click', () => closeBlockInsertDialog(true));
blockInsertDialog.addEventListener('pointerdown', (event) => {
  if (event.target === blockInsertDialog) {
    closeBlockInsertDialog(true);
  }
});
[blockInsertNameInput, blockInsertScaleInput, blockInsertRotationInput].forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmBlockInsertDialog();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeBlockInsertDialog(true);
    }
  });
});
[polylineStartWidthInput, polylineEndWidthInput].forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmPolylineWidthDialog();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closePolylineWidthDialog();
    }
  });
});
hatchDialogConfirmButton.addEventListener('click', () => confirmHatchDialog());
hatchDialogCancelButton.addEventListener('click', () => closeHatchDialog(true));
hatchDialogCloseButton.addEventListener('click', () => closeHatchDialog(true));
hatchDialog.addEventListener('pointerdown', (event) => {
  if (event.target === hatchDialog) {
    closeHatchDialog(true);
  }
});
hatchDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    confirmHatchDialog();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeHatchDialog(true);
  }
});

aboutDialogCloseButton.addEventListener('click', closeAboutDialog);
aboutDialogConfirmButton.addEventListener('click', closeAboutDialog);
aboutDialog.addEventListener('pointerdown', (event) => {
  if (event.target === aboutDialog) {
    closeAboutDialog();
  }
});
aboutDialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    closeAboutDialog();
  }
});

renderer.resize();
buildLayerColorPalette();
syncLayerPicker();
syncLineStylePicker();
syncLineTypePicker();
syncLineColorPicker();
syncNavigationDeviceButtons();
controller.setTool('select');

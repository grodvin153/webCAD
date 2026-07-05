/*
 * webCAD - Editor CAD 2D para navegador
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
  CANVAS_SCALE,
  DRAWING_PROFILES,
  FIT_PADDING,
  HISTORY_LIMIT,
  SNAP_THRESHOLD,
  SPATIAL_CELL_SIZE,
  SPATIAL_MAX_ENTITY_CELLS,
  SPATIAL_MAX_QUERY_CELLS,
  VIEW_SCALE_FACTOR,
} from './config.js';
import {
  BACKGROUND_COLOR,
  CAD_TEXT_FONT,
  DEFAULT_LINE_COLOR,
  DEFAULT_LINE_STYLE,
  DEFAULT_LINE_TYPE,
  DIMENSION_STYLES,
  DIMENSION_TOOLS,
  LINE_COLOR,
  LINE_COLORS,
  LINE_STYLES,
  LINE_TYPES,
  PREVIEW_COLOR,
  SELECTED_COLOR,
  SNAP_COLOR,
  SNAP_MARKER_SIZE,
  X_AXIS_COLOR,
  Y_AXIS_COLOR,
  createStyleServices,
} from './properties/styles.js';
import { DEFAULT_LAYER, createLayerServices } from './properties/layers.js';
import { createProfileServices } from './properties/profiles.js';
import { bindDialogEvents } from './ui/dialogs.js';
import { createLayerUi } from './ui/layers.js';
import { createMenuServices } from './ui/menus.js';
import { createPreferenceServices } from './ui/preferences.js';
import { createArcEntityClass } from './entities/arc.js';
import { createCircleEntityClass } from './entities/circle.js';
import { createHatchEntityClass } from './entities/hatch.js';
import { createLineEntityClass } from './entities/line.js';
import { createPolylineEntityClass } from './entities/polyline.js';
import { createTextEntityClass } from './entities/text.js';
import { createRasterImageEntityClass } from './images/entity.js';
import { createPngImporter } from './images/importer.js';
import {
  applyImageAlignment,
  bestImageAlignment,
  calibrateImageLength,
} from './images/calibration.js';
import { drawRasterImage } from './images/rendering.js';
import { createDimensionStyles } from './dimensions/styles.js';
import { createLinearDimensionGeometry } from './dimensions/geometry/linear.js';
import { createRadialDimensionGeometry } from './dimensions/geometry/radial.js';
import { createAngularDimensionGeometry } from './dimensions/geometry/angular.js';
import { createDimensionEntityServices } from './dimensions/entity.js';
import { createDimensionPlacement } from './dimensions/placement.js';
import { commandLabel, REPEATABLE_COMMANDS } from './commands.js';
import {
  angleInSweep,
  angleOfPoint,
  angleOnArc,
  angleParameter,
  arcMidAngle,
  arcSweep,
  boundsContainsBounds,
  boundsIntersectsBounds,
  circularParameter,
  clamp,
  closestPointOnLineSegment,
  createBounds,
  directedArcSweep,
  distance,
  distancePointToInfiniteLine,
  distancePointToSegment,
  entityArcSweep,
  entityMidpoint,
  expandBounds,
  lineParameter,
  mergeBounds,
  normalizeAngle,
  normalizeBoundsFromPoints,
  normalizedVector,
  offsetBounds,
  offsetPoint,
  pointInPolygon,
  pointAtCircleAngle,
  pointAtCircularParameter,
  pointAtLineParameter,
  polygonSignedArea,
  rawLineParameter,
  TWO_PI,
  uniqueSortedParameters,
} from './geometry.js';
import {
  circleCircleIntersectionPoints,
  entityIntersectionPoints as intersectEntities,
  fullCircleBoundaryIntersectionPoints as intersectFullCircleBoundary,
  infiniteLineCircularIntersectionPoints,
  infiniteLineLineIntersection,
  isCircularEntity,
  lineSegmentIntersection,
  pointOnCircularEntity,
} from './intersections.js';
import {
  formatNumber,
  formatSnapType,
  parseAngleInput,
  parseCopyMultiplier,
  parseDistanceInput,
  parseRelativeCoordinateInput,
} from './input/entry.js';
import {
  arcFromCenterStartEnd,
  arcFromThreePoints,
  circleFromThreePoints,
  pointFromDistance,
  pointFromRelativeCoordinates,
  pointOnRadiusFromAngle,
} from './input/coordinates.js';
import {
  circularReferencePoints,
  createInputResolvers,
} from './input/snaps.js';
import { projectPointToLine, selectionWindowMode } from './selection/geometry.js';
import { createHitTesting } from './selection/hit-testing.js';
import { createSelectionIntersections } from './selection/intersections.js';
import { createPolylineSelectionGeometry } from './selection/polyline.js';
import { createDimensionGripMovement } from './selection/grips/dimensions.js';
import { createPolylineGripMovement, moveCircularGrip } from './selection/grips/entities.js';
import { moveHatchGrip } from './selection/grips/hatch.js';
import { createGripReferences } from './selection/grips/references.js';
import {
  createEntityTransformations,
  entityCanExplode,
} from './transformations/clone.js';
import { moveEntityByVector } from './transformations/move.js';
import {
  dotProduct,
  mirrorEntityAcrossAxis,
} from './transformations/mirror.js';
import {
  rotateEntityByAngle,
  rotatePointAround,
  rotationAngleFromPoint,
} from './transformations/rotate.js';
import { createFilletGeometry } from './operations/fillet/geometry.js';
import { createFilletApplication } from './operations/fillet/application.js';
import { createChamferGeometry } from './operations/chamfer/geometry.js';
import { createChamferApplication } from './operations/chamfer/application.js';
import { createLineTrimOperations } from './operations/trim/line.js';
import { createCircularTrimOperations } from './operations/trim/circular.js';
import { createPolylineTrimOperations } from './operations/trim/polyline.js';
import { createGroupedLineTrimOperations } from './operations/trim/grouped-lines.js';
import { createTrimOperations } from './operations/trim/index.js';
import { createLineExtendOperations } from './operations/extend/line.js';
import { createArcExtendOperations } from './operations/extend/arc.js';
import { createPolylineExtendOperations } from './operations/extend/polyline.js';
import { createHatchBoundaryGeometry } from './hatches/boundary.js';
import { createHatchFaces } from './hatches/faces.js';
import { createHatchFlood } from './hatches/flood.js';
import { createHatchTrimOperations } from './hatches/trim.js';

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
const chamferToolButton = document.getElementById('tool-chamfer');
const copyToolButton = document.getElementById('tool-copy');
const moveToolButton = document.getElementById('tool-move');
const rotateToolButton = document.getElementById('tool-rotate');
const mirrorToolButton = document.getElementById('tool-mirror');
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
const importPngInput = document.getElementById('import-png-input');
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
const chamferDistanceControl = document.getElementById('chamfer-distance-control');
const chamferDistanceFirstInput = document.getElementById('chamfer-distance-first');
const chamferDistanceSecondInput = document.getElementById('chamfer-distance-second');
const drawingProfileDialog = document.getElementById('drawing-profile-dialog');
const drawingProfileCloseButton = document.getElementById('drawing-profile-close');
const drawingProfileCancelButton = document.getElementById('drawing-profile-cancel');
const drawingProfileConfirmButton = document.getElementById('drawing-profile-confirm');
const drawingProfileInputs = document.querySelectorAll('input[name="drawing-profile"]');
const settingsDialog = document.getElementById('settings-dialog');
const settingsDialogCloseButton = document.getElementById('settings-dialog-close');
const settingsDialogCancelButton = document.getElementById('settings-dialog-cancel');
const settingsDialogConfirmButton = document.getElementById('settings-dialog-confirm');
const settingsDimensionStyleInput = document.getElementById('settings-dimension-style');
const settingsLinearPrecisionInput = document.getElementById('settings-linear-precision');
const settingsAngularPrecisionInput = document.getElementById('settings-angular-precision');
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
const imageCalibrationDialog = document.getElementById('image-calibration-dialog');
const imageCalibrationCloseButton = document.getElementById('image-calibration-close');
const imageCalibrationCancelButton = document.getElementById('image-calibration-cancel');
const imageCalibrationConfirmButton = document.getElementById('image-calibration-confirm');
const imageCalibrationMeasuredInput = document.getElementById('image-calibration-measured');
const imageCalibrationLengthInput = document.getElementById('image-calibration-length');
const imageCalibrationError = document.getElementById('image-calibration-error');

let GRID_BASE = DRAWING_PROFILES.engineering.gridBase;
let MIN_VIEW_SCALE = DRAWING_PROFILES.engineering.minViewScale;
let MAX_VIEW_SCALE = DRAWING_PROFILES.engineering.maxViewScale;
let DEFAULT_DRAWING_SIZE = DRAWING_PROFILES.engineering.defaultDrawingSize;
let UNITS_LABEL = DRAWING_PROFILES.engineering.unitsLabel;
let nextEntityGroupId = 1;

const polylineSelectionGeometry = createPolylineSelectionGeometry({
  createArcEntity: (...args) => new ArcEntity(...args),
  createLineEntity: (...args) => new LineEntity(...args),
  createPolylineEntity: (...args) => new PolylineEntity(...args),
  entityDistanceToPoint: (...args) => entityDistanceToPoint(...args),
});
const {
  dimensionCircularFromEntity,
  dimensionKindForLine,
  dimensionLineFromEntity,
  polylineDraftEntity,
  polylineReferencePoints,
  polylineSegmentEntities,
  polylineSegmentEntity,
  primitiveEntityParts,
} = polylineSelectionGeometry;

const {
  distancePointToArc,
  distancePointToCircle,
  entityDistanceToPoint,
  entityIsNearPoint,
} = createHitTesting({
  dimensionGeometry: (...args) => dimensionGeometry(...args),
  polylineSegmentEntity,
});

const {
  entityIntersectionPoints,
  fullCircleBoundaryIntersectionPoints,
} = createSelectionIntersections({
  intersectEntities,
  intersectFullCircleBoundary,
  primitiveEntityParts,
});

const {
  dimensionBaseGripPoints,
  dimensionPlacementGripPoint,
  dimensionReferencePoints,
  gripPoint,
  gripReferencePoint,
} = createGripReferences({
  dimensionGeometry: (...args) => dimensionGeometry(...args),
  polylineReferencePoints,
});

const { movePolylineGrip } = createPolylineGripMovement({ polylineSegmentEntity });
const { moveDimensionGrip } = createDimensionGripMovement({
  dimensionBaseGripPoints,
  dimensionPlacementGripPoint,
  dimensionStyleMetrics: (...args) => dimensionStyleMetrics(...args),
  naturalDimensionTextNormal: (...args) => naturalDimensionTextNormal(...args),
});

const {
  activeDraftOrigin,
  objectSnapPoint,
  resolveCursorPoint,
  resolvePointForState,
} = createInputResolvers({
  dimensionPlacementOrigin: (...args) => dimensionPlacementOrigin(...args),
  dimensionReferencePoints,
  entityIntersectionPoints,
  entityIsNearPoint,
  getGridBase: () => GRID_BASE,
  polylineDraftEntity,
  polylineReferencePoints,
  polylineSegmentEntities,
  primitiveEntityParts,
});

function createEntityGroupId(prefix = 'group') {
  const id = `${prefix}-${nextEntityGroupId}`;
  nextEntityGroupId += 1;
  return id;
}

const styleServices = createStyleServices(() => state);
const {
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
} = styleServices;

const {
  activeDrawingProfile,
  drawingProfileById,
  profileLineTypeDash,
} = createProfileServices({
  getState: () => state,
  getLineType,
});

const {
  activeLayerDefinition,
  activeLayerName,
  applyLayerToEntity,
  dxfEntityOptions,
} = createLayerServices({
  getState: () => state,
  applyLineColorToEntity,
  applyLineStyleToEntity,
  applyLineTypeToEntity,
  lineColorFromDxf,
  lineStyleFromDxf,
  lineTypeFromDxf,
});

const LineEntity = createLineEntityClass(styleServices);
const CircleEntity = createCircleEntityClass(styleServices);
const ArcEntity = createArcEntityClass(styleServices);
const PolylineEntity = createPolylineEntityClass({
  style: styleServices,
  polylineSegmentEntity,
  polylineSegmentEntities,
});
const TextEntity = createTextEntityClass(styleServices);
const HatchEntity = createHatchEntityClass(styleServices);
const RasterImageEntity = createRasterImageEntityClass(styleServices);

const dimensionStyles = createDimensionStyles({
  DIMENSION_STYLES,
  activeDrawingProfile,
  getState: () => state,
  normalizedVector,
});
const {
  dimensionArrow,
  dimensionExtensionLine,
  dimensionStyleMetrics,
  dimensionTextValue,
  naturalDimensionTextNormal,
} = dimensionStyles;
const { dimensionLinearGeometry } = createLinearDimensionGeometry({
  dimensionArrow,
  dimensionExtensionLine,
  dimensionTextValue,
  distance,
  entityMidpoint,
  naturalDimensionTextNormal,
  normalizedVector,
});
const { dimensionRadialGeometry } = createRadialDimensionGeometry({
  dimensionArrow,
  dimensionTextValue,
  distance,
  naturalDimensionTextNormal,
  normalizedVector,
});
const { dimensionAngularGeometry } = createAngularDimensionGeometry({
  SNAP_THRESHOLD,
  TWO_PI,
  angleOfPoint,
  dimensionArrow,
  dimensionTextValue,
  distance,
  normalizeAngle,
  offsetPoint,
});
const {
  DimensionEntity,
  dimensionGeometry,
} = createDimensionEntityServices({
  DEFAULT_LAYER,
  DEFAULT_LINE_COLOR,
  DIMENSION_STYLES,
  TWO_PI,
  angleOfPoint,
  applyLineColorToEntity,
  applyLineStyleToEntity,
  applyLineTypeToEntity,
  createBounds,
  dimensionAngularGeometry,
  dimensionLinearGeometry,
  dimensionRadialGeometry,
  dimensionStyleMetrics,
  distance,
  expandBounds,
  normalizeAngle,
});
const {
  dimensionDraftEntity,
  dimensionPlacementDistance,
  dimensionPlacementOrigin,
  dimensionPlacementPoint,
} = createDimensionPlacement({
  DimensionEntity,
  SNAP_THRESHOLD,
  activeLayerName,
  activeLineColorId,
  distance,
  distancePointToInfiniteLine,
  getState: () => state,
  normalizedVector,
  parseDistanceInput,
  pointFromRelativeCoordinates,
});


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

const {
  cloneBlockDefinition,
  cloneEntitiesWithOffset,
  cloneEntity,
  cloneEntityWithOffset,
  expandBlockReferenceEntities,
  transformedBlockContents,
} = createEntityTransformations({
  ArcEntity,
  BlockReferenceEntity,
  CircleEntity,
  DimensionEntity,
  HatchEntity,
  LineEntity,
  PolylineEntity,
  RasterImageEntity,
  TextEntity,
  createEntityGroupId,
});

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

const operationDependencies = {
  ArcEntity,
  HatchEntity,
  LineEntity,
  PolylineEntity,
  SNAP_THRESHOLD,
  TWO_PI,
  angleInSweep,
  angleOfPoint,
  angleOnArc,
  arcSweep,
  boundsIntersectsBounds,
  circleCircleIntersectionPoints,
  circularParameter,
  clamp,
  closestPointOnLineSegment,
  createEntityGroupId,
  directedArcSweep,
  distance,
  dotProduct,
  entityArcSweep,
  entityDistanceToPoint,
  entityIntersectionPoints,
  fullCircleBoundaryIntersectionPoints,
  infiniteLineCircularIntersectionPoints,
  infiniteLineLineIntersection,
  isCircularEntity,
  lineParameter,
  normalizeAngle,
  normalizedVector,
  pointAtCircleAngle,
  pointAtCircularParameter,
  pointAtLineParameter,
  pointInPolygon,
  pointOnCircularEntity,
  polygonSignedArea,
  polylineSegmentEntity,
  polylineSegmentEntities,
  primitiveEntityParts,
  projectPointToLine,
  rawLineParameter,
  uniqueSortedParameters,
};

const filletGeometry = createFilletGeometry(operationDependencies);
const {
  filletEndpointKey,
  filletOperandAt,
  filletRayDirection,
  filletSolutions,
  lineFilletGeometry,
} = filletGeometry;
const filletApplication = createFilletApplication({
  ...operationDependencies,
  filletEndpointKey,
  lineFilletGeometry,
});
const {
  applyFilletSolution,
  applyLineFillet,
  rotateClosedPolylineToSegment,
  setFilletOperandTangent,
} = filletApplication;

const { chamferSolution } = createChamferGeometry({
  ...operationDependencies,
  filletRayDirection,
});
const { applyChamferSolution } = createChamferApplication({
  ...operationDependencies,
  rotateClosedPolylineToSegment,
  setFilletOperandTangent,
});

const { trimLineEntityAtPoint } = createLineTrimOperations(operationDependencies);
const {
  createArcFromParameters,
  trimCircularEntityAtPoint,
} = createCircularTrimOperations(operationDependencies);
const {
  trimPolylineEntityAtPoint,
} = createPolylineTrimOperations({
  ...operationDependencies,
  createArcFromParameters,
});
const {
  closedLineGroupPolygon,
  trimLineGroupAtPoint,
} = createGroupedLineTrimOperations(operationDependencies);
const {
  circlePolygon,
  curveGroupsFromFaceEdges,
} = createHatchBoundaryGeometry(operationDependencies);
const { curveArrangementFaces } = createHatchFaces({
  ...operationDependencies,
  curveGroupsFromFaceEdges,
});
const { hatchBoundaryAtPoint } = createHatchFlood({
  ...operationDependencies,
  circlePolygon,
  closedLineGroupPolygon,
  curveArrangementFaces,
});
const { trimHatchEntityAtPoint } = createHatchTrimOperations(operationDependencies);
const { trimEntityAtPoint } = createTrimOperations({
  trimCircularEntityAtPoint,
  trimHatchEntityAtPoint,
  trimLineEntityAtPoint,
  trimLineGroupAtPoint,
  trimPolylineEntityAtPoint,
});

const { extendLineToBoundaries } = createLineExtendOperations(operationDependencies);
const {
  arcEndpointPoint,
  extendArcToBoundaries,
} = createArcExtendOperations(operationDependencies);
const { extendPolylineToBoundaries } = createPolylineExtendOperations({
  ...operationDependencies,
  arcEndpointPoint,
  extendArcToBoundaries,
  extendLineToBoundaries,
});

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
  const dimensionPrecision = state.dimensionPrecision[state.drawingProfile];
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
      '179', String(dimensionPrecision.angular),
      '271', String(dimensionPrecision.linear), '275', '0',
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
      if (entity.type === 'IMAGE') {
        this.drawImageEntity(ctx, entity, {
          alpha: options.alpha,
          outlineColor: options.outline ? color : null,
          outlineWidth: options.width,
        });
      }
    }
  }

  drawImageEntity(ctx, entity, options = {}) {
    drawRasterImage(ctx, entity, {
      alpha: options.alpha,
      outlineColor: options.outlineColor,
      outlineWidth: (options.outlineWidth || 1.5) / this.state.viewScale,
      dash: options.dash?.map((length) => length / this.state.viewScale),
      requestDraw: () => this.draw(),
    });
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
    if (entity.type === 'IMAGE') {
      this.drawImageEntity(ctx, entity, {
        alpha: options.alpha ?? entity.opacity,
        outlineColor: color,
        outlineWidth: options.width ?? 2,
        dash: [7, 5],
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

  drawFilletPreview(ctx) {
    const firstOperand = this.state.filletDraft?.firstOperand;
    const secondEntity = this.state.hoveredEntity;
    if (!firstOperand || !secondEntity || !this.state.mouseWorld) {
      return;
    }
    const secondOperand = filletOperandAt(secondEntity, this.state.mouseWorld);
    if (
      !secondOperand ||
      secondOperand.entity === firstOperand.entity &&
        secondOperand.segmentIndex === firstOperand.segmentIndex
    ) {
      return;
    }
    const solution = filletSolutions(firstOperand, secondOperand, activeFilletRadius())[0];
    if (!solution) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.fillStyle = PREVIEW_COLOR;
    ctx.lineWidth = 2 / this.state.viewScale;
    ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
    if (solution.radius > SNAP_THRESHOLD) {
      ctx.beginPath();
      ctx.arc(
        solution.center.x,
        solution.center.y,
        solution.radius,
        solution.startAngle,
        solution.endAngle,
        solution.clockwise === false,
      );
      ctx.stroke();
    }
    else {
      const markerRadius = 4 / this.state.viewScale;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(solution.center.x, solution.center.y, markerRadius, 0, TWO_PI);
      ctx.fill();
    }
    ctx.setLineDash([]);
    const tangentRadius = 3.5 / this.state.viewScale;
    for (const tangent of [solution.firstTangent, solution.secondTangent]) {
      ctx.beginPath();
      ctx.arc(tangent.x, tangent.y, tangentRadius, 0, TWO_PI);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawChamferPreview(ctx) {
    const firstOperand = this.state.chamferDraft?.firstOperand;
    const secondEntity = this.state.hoveredEntity;
    if (!firstOperand || !secondEntity || !this.state.mouseWorld) {
      return;
    }
    const secondOperand = filletOperandAt(secondEntity, this.state.mouseWorld);
    const distances = activeChamferDistances();
    const solution = chamferSolution(firstOperand, secondOperand, distances.first, distances.second);
    if (!solution.valid) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 2 / this.state.viewScale;
    ctx.setLineDash([7 / this.state.viewScale, 5 / this.state.viewScale]);
    ctx.beginPath();
    ctx.moveTo(solution.firstTangent.x, solution.firstTangent.y);
    ctx.lineTo(solution.secondTangent.x, solution.secondTangent.y);
    ctx.stroke();
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
      if (entity.type === 'IMAGE') {
        this.drawImageEntity(ctx, entity);
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

    const filletFirstEntity = this.state.filletDraft?.firstOperand?.entity;
    if (filletFirstEntity && boundsIntersectsBounds(filletFirstEntity.bounds(), viewBounds)) {
      this.drawHighlightedEntity(ctx, filletFirstEntity, PREVIEW_COLOR, 2);
    }
    const chamferFirstEntity = this.state.chamferDraft?.firstOperand?.entity;
    if (chamferFirstEntity && boundsIntersectsBounds(chamferFirstEntity.bounds(), viewBounds)) {
      this.drawHighlightedEntity(ctx, chamferFirstEntity, PREVIEW_COLOR, 2);
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
      if (selectedEntity?.type === 'IMAGE') {
        this.drawImageEntity(ctx, selectedEntity, {
          outlineColor: SELECTED_COLOR,
          outlineWidth: 2.25,
        });
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

  drawMirrorPreview(ctx) {
    const draft = this.state.mirrorDraft;
    if (!draft?.firstPoint || !this.state.mouseWorld) {
      return;
    }
    const secondPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
    if (!secondPoint || distance(draft.firstPoint, secondPoint) <= SNAP_THRESHOLD) {
      return;
    }
    ctx.save();
    for (const source of draft.sourceEntities) {
      const preview = cloneEntity(source);
      if (preview && mirrorEntityAcrossAxis(preview, draft.firstPoint, secondPoint)) {
        this.drawHighlightedEntity(ctx, preview, PREVIEW_COLOR, 0);
      }
    }
    const axis = normalizedVector(draft.firstPoint, secondPoint);
    const extent = Math.max(this.visibleWorldWidth(), this.visibleWorldHeight()) * 1.5;
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    ctx.beginPath();
    ctx.moveTo(draft.firstPoint.x - axis.x * extent, draft.firstPoint.y - axis.y * extent);
    ctx.lineTo(draft.firstPoint.x + axis.x * extent, draft.firstPoint.y + axis.y * extent);
    ctx.stroke();
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

  drawImageInteractionPreview(ctx) {
    const insertionDraft = this.state.imageDraft;
    if (this.state.tool === 'image-insert' && insertionDraft?.preview && this.state.mouseWorld) {
      insertionDraft.preview.center = resolveCursorPoint(this.state.mouseWorld, this.state);
      this.drawImageEntity(ctx, insertionDraft.preview, {
        alpha: 0.58,
        outlineColor: PREVIEW_COLOR,
        outlineWidth: 2,
        dash: [7, 5],
      });
    }

    const draft = this.state.imageCalibrationDraft;
    if (this.state.tool !== 'image-calibrate' || !draft) return;
    const cursor = this.state.mouseWorld;
    const endPoint = draft.sourceEnd || cursor;
    if (draft.sourceStart && endPoint) {
      ctx.save();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.lineWidth = 2 / this.state.viewScale;
      ctx.setLineDash([7 / this.state.viewScale, 5 / this.state.viewScale]);
      ctx.beginPath();
      ctx.moveTo(draft.sourceStart.x, draft.sourceStart.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
      ctx.setLineDash([]);
      for (const point of [draft.sourceStart, draft.sourceEnd].filter(Boolean)) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4 / this.state.viewScale, 0, TWO_PI);
        ctx.fill();
      }
      ctx.restore();
    }
    if (draft.sourceStart && draft.sourceEnd && draft.targetSegment) {
      const preview = cloneEntity(draft.entity);
      const alignment = bestImageAlignment(
        preview,
        draft.sourceStart,
        draft.sourceEnd,
        draft.targetSegment,
      );
      if (preview && applyImageAlignment(preview, alignment)) {
        this.drawImageEntity(ctx, preview, {
          alpha: 0.42,
          outlineColor: PREVIEW_COLOR,
          outlineWidth: 2,
          dash: [7, 5],
        });
      }
      ctx.save();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 3 / this.state.viewScale;
      ctx.beginPath();
      ctx.moveTo(draft.targetSegment.start.x, draft.targetSegment.start.y);
      ctx.lineTo(draft.targetSegment.end.x, draft.targetSegment.end.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawCrosshair(ctx) {
    if (
      !this.state.mouseWorld ||
      this.state.tool === 'select' ||
      this.state.tool === 'select-set' ||
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting) ||
      (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting) ||
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
    this.drawFilletPreview(ctx);
    this.drawChamferPreview(ctx);
    this.drawPreview(ctx);
    this.drawGripMovePreview(ctx);
    this.drawCopyPreview(ctx);
    this.drawRotatePreview(ctx);
    this.drawMirrorPreview(ctx);
    this.drawImageInteractionPreview(ctx);
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
    this.lastImagePointerDown = null;
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
    this.lastImagePointerDown = null;
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
    this.state.mirrorDraft = null;
    this.state.filletDraft = tool === 'fillet'
      ? { firstOperand: null }
      : null;
    this.state.chamferDraft = tool === 'chamfer'
      ? { firstOperand: null }
      : null;
    this.state.selectionSetDraft = null;
    this.state.eraseDraft = null;
    this.state.explodeDraft = null;
    this.state.extendDraft = null;
    this.state.blockCreateDraft = null;
    this.state.blockInsertDraft = null;
    this.state.dimensionDraft = null;
    this.state.imageDraft = null;
    this.state.imageCalibrationDraft = null;
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
      tool === 'mirror' ||
      tool === 'select-set' ||
      tool === 'trim' ||
      tool === 'fillet' ||
      tool === 'chamfer' ||
      tool === 'extend' ||
      tool === 'erase' ||
      tool === 'explode'
      || tool === 'image-insert'
      || tool === 'image-calibrate'
    ) {
      if (tool !== 'copy' && tool !== 'move' && tool !== 'rotate' && tool !== 'mirror' && tool !== 'select-set' && tool !== 'erase' && tool !== 'explode' && tool !== 'extend' && tool !== 'block-create') {
        this.doc.selectEntity(null);
      }
    }
    filletRadiusControl.hidden = tool !== 'fillet';
    chamferDistanceControl.hidden = tool !== 'chamfer';
    if (tool === 'fillet') {
      syncFilletRadiusControl();
    }
    if (tool === 'chamfer') {
      syncChamferDistanceControl();
    }
    this.state.statusText = tool === 'select'
      ? 'Seleccionar entidad'
      : tool === 'trim'
        ? 'Recortar: pique el tramo a eliminar'
        : tool === 'fillet'
          ? `Empalme R${formatNumber(activeFilletRadius())}: seleccione la primera linea`
        : tool === 'chamfer'
          ? `Chaflan ${formatChamferDistances()}: seleccione la primera linea o tramo`
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
                : tool === 'mirror'
                  ? 'Simetria: indique primer punto del eje'
                : tool === 'block-create'
                  ? 'Crear bloque: seleccione objetos'
                : tool === 'block-insert'
                  ? 'Insertar bloque: indique punto de insercion'
                : tool === 'image-insert'
                  ? 'Imagen: indique punto de insercion'
                : tool === 'image-calibrate'
                  ? 'Imagen: indique primer punto de referencia'
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
    chamferToolButton.classList.toggle('is-active', tool === 'chamfer');
    extendToolButton.classList.toggle('is-active', tool === 'extend');
    copyToolButton.classList.toggle('is-active', tool === 'copy');
    moveToolButton.classList.toggle('is-active', tool === 'move');
    rotateToolButton.classList.toggle('is-active', tool === 'rotate');
    mirrorToolButton.classList.toggle('is-active', tool === 'mirror');
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
    this.canvas.classList.toggle('is-trim-tool', tool === 'trim' || tool === 'fillet' || tool === 'chamfer');
    this.canvas.classList.toggle('is-extend-tool', tool === 'extend');
    this.canvas.classList.toggle('is-copy-tool', tool === 'copy' && this.state.copyDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle('is-rotate-tool',
      tool === 'rotate' && this.state.rotateDraft?.selecting ||
      tool === 'mirror' && this.state.mirrorDraft?.selecting);
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
        (tool === 'mirror' && this.state.mirrorDraft && !this.state.mirrorDraft.selecting) ||
        (tool === 'block-create' && this.state.blockCreateDraft && !this.state.blockCreateDraft.selecting) ||
        (tool === 'block-insert' && this.state.blockInsertDraft) ||
        tool === 'image-insert' || tool === 'image-calibrate',
    );
    this.canvas.classList.toggle('is-erase-tool', tool === 'erase');
    this.canvas.classList.toggle('is-explode-tool', tool === 'explode');
    this.updateUiStatus();
    this.renderer.draw();
  }

  startImageInsertion(imageData) {
    this.setTool('image-insert');
    const width = Math.max(this.renderer.visibleWorldWidth() * 0.35, SNAP_THRESHOLD * 10);
    const height = width * imageData.pixelHeight / imageData.pixelWidth;
    const center = this.state.mouseWorld || {
      x: this.state.viewOffset.x + this.renderer.visibleWorldWidth() * 0.5,
      y: this.state.viewOffset.y + this.renderer.visibleWorldHeight() * 0.5,
    };
    this.state.imageDraft = {
      preview: new RasterImageEntity(center, width, height, imageData.source, {
        name: imageData.name,
        layer: activeLayerName(),
      }),
    };
    this.state.statusText = 'Imagen cargada: indique el punto de insercion';
    this.updateUiStatus();
    this.renderer.draw();
  }

  startImageCalibration(entity) {
    this.setTool('image-calibrate');
    this.state.imageCalibrationDraft = {
      entity,
      phase: 'source-start',
      sourceStart: null,
      sourceEnd: null,
      targetSegment: null,
    };
    this.doc.selectEntity(entity);
    this.state.statusText = 'Calibrar imagen: indique el primer punto sobre la imagen';
    this.updateUiStatus();
    this.renderer.draw();
  }

  applyImageSegmentAlignment() {
    const draft = this.state.imageCalibrationDraft;
    if (!draft?.sourceStart || !draft.sourceEnd || !draft.targetSegment) return false;
    const alignment = bestImageAlignment(
      draft.entity,
      draft.sourceStart,
      draft.sourceEnd,
      draft.targetSegment,
    );
    if (!alignment) return false;
    this.doc.recordHistory();
    applyImageAlignment(draft.entity, alignment);
    this.doc.markDirty();
    const entity = draft.entity;
    this.setTool('select');
    this.doc.selectEntity(entity);
    this.state.statusText = 'Imagen alineada y escalada con el segmento de referencia';
    return true;
  }

  handleImagePoint(worldPoint) {
    if (this.state.tool === 'image-insert' && this.state.imageDraft?.preview) {
      const entity = this.state.imageDraft.preview;
      entity.center = { ...this.resolveInputPoint(worldPoint) };
      this.doc.addEntity(entity);
      this.setTool('select');
      this.doc.selectEntity(entity);
      this.state.statusText = 'Imagen insertada · doble clic para calibrar o alinear';
      return true;
    }
    const draft = this.state.imageCalibrationDraft;
    if (this.state.tool !== 'image-calibrate' || !draft) return false;
    if (draft.phase === 'source-start') {
      draft.sourceStart = { ...worldPoint };
      draft.phase = 'source-end';
      this.state.statusText = 'Calibrar imagen: indique el segundo punto de referencia';
      return true;
    }
    if (draft.phase === 'source-end') {
      if (distance(draft.sourceStart, worldPoint) <= SNAP_THRESHOLD) {
        this.state.statusText = 'Los dos puntos de referencia deben ser distintos';
        return false;
      }
      draft.sourceEnd = { ...worldPoint };
      draft.phase = 'target';
      this.state.statusText = 'Pique una linea o tramo de polilinea para alinear y escalar · Enter para indicar longitud';
      return true;
    }
    if (draft.phase === 'target') {
      draft.targetSegment = this.imageReferenceSegmentAt(worldPoint, draft.entity);
      if (draft.targetSegment) return this.applyImageSegmentAlignment();
      this.state.statusText = 'Seleccione una linea o un tramo recto de polilinea · Enter para indicar longitud';
    }
    return false;
  }

  imageReferenceSegmentAt(point, excludedEntity) {
    const candidate = this.findEntityAt(point, { exclude: excludedEntity });
    const segment = dimensionLineFromEntity(candidate, point);
    const tolerance = 7 / this.state.viewScale;
    return segment && distancePointToSegment(point, segment.start, segment.end) <= tolerance
      ? segment
      : null;
  }

  findEntityAt(point, options = {}) {
    const tolerance = 7 / this.state.viewScale;
    const pickBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const candidates = this.doc.queryBounds(pickBounds);
    const pickCandidates = [
      ...candidates.filter((entity) => entity.type === 'HATCH'),
      ...candidates.filter((entity) => entity.type !== 'HATCH'),
    ];
    for (let index = pickCandidates.length - 1; index >= 0; index -= 1) {
      const entity = pickCandidates[index];
      if (entity === options.exclude) continue;
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
      if (entity.type === 'IMAGE' && entityDistanceToPoint(entity, point) <= tolerance) {
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
    if (this.state.tool === 'chamfer') {
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
    if (this.state.tool === 'mirror') {
      return Boolean(this.state.mirrorDraft?.selecting);
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
    if (this.state.tool === 'image-calibrate') {
      return this.state.imageCalibrationDraft?.phase === 'target';
    }
    return false;
  }

  updateHoveredEntity() {
    const imageCalibration = this.state.imageCalibrationDraft;
    this.state.hoveredEntity = this.isEntityHoverSelectionActive() && this.state.mouseWorld
      ? this.findEntityAt(this.state.mouseWorld, { exclude: imageCalibration?.entity })
      : null;
    if (imageCalibration?.phase === 'target') {
      imageCalibration.targetSegment = this.imageReferenceSegmentAt(
        this.state.mouseWorld,
        imageCalibration.entity,
      );
    }
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
    this.canvas.classList.toggle('is-rotate-tool',
      this.state.tool === 'rotate' && this.state.rotateDraft?.selecting ||
      this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting);
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
        (this.state.tool === 'mirror' && this.state.mirrorDraft && !this.state.mirrorDraft.selecting) ||
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
    const clearCommandSelection = this.state.tool === 'copy' ||
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set';
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
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'chamfer' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.tool === 'image-insert' ||
      this.state.tool === 'image-calibrate' ||
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
      this.state.mirrorDraft ||
      this.state.filletDraft ||
      this.state.chamferDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
      || this.state.imageDraft ||
      this.state.imageCalibrationDraft
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
    if (
      this.state.tool === 'image-calibrate' &&
      this.state.imageCalibrationDraft?.phase === 'target'
    ) {
      openImageCalibrationDialog();
      return true;
    }
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
    if (this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting) {
      return this.confirmMirrorSelection();
    }
    if (this.state.mirrorDraft?.firstPoint) {
      if (this.state.distanceInput) {
        return this.handleDistanceInputKey({ key: 'Enter' });
      }
      const secondPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      return this.mirrorSelectionAcross(secondPoint);
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
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'chamfer' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.tool === 'image-insert' ||
      this.state.tool === 'image-calibrate' ||
      this.state.circleDraft ||
      this.state.polylineDraft ||
      this.state.rectangleDraft ||
      this.state.textDraft ||
      this.state.hatchDraft ||
      this.state.arcDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.rotateDraft ||
      this.state.mirrorDraft ||
      this.state.filletDraft ||
      this.state.chamferDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
      || this.state.imageDraft ||
      this.state.imageCalibrationDraft
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

  startMirror() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('mirror');
    this.state.mirrorDraft = {
      sourceEntities,
      firstPoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Simetria de ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique primer punto del eje`
      : 'Simetria: seleccione objetos y confirme con Enter, Espacio o clic derecho';
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

  confirmMirrorSelection() {
    if (!this.state.mirrorDraft?.selecting) {
      return false;
    }
    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para crear la simetria';
      return false;
    }
    this.rememberSelectionSet(sourceEntities);
    this.state.mirrorDraft = { sourceEntities, firstPoint: null, selecting: false };
    this.state.statusText = `Simetria de ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique primer punto del eje`;
    this.updateCanvasCursorMode();
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

  mirrorSelectionAcross(secondPoint) {
    const draft = this.state.mirrorDraft;
    if (!draft?.firstPoint || !secondPoint || distance(draft.firstPoint, secondPoint) <= SNAP_THRESHOLD) {
      this.state.statusText = 'El eje de simetria necesita dos puntos distintos';
      return false;
    }
    const copies = cloneEntitiesWithOffset(draft.sourceEntities, { x: 0, y: 0 }, { remapGroups: true });
    const mirrored = copies.filter((entity) =>
      mirrorEntityAcrossAxis(entity, draft.firstPoint, secondPoint));
    if (!mirrored.length) {
      this.state.statusText = 'No se pudieron reflejar las entidades seleccionadas';
      return false;
    }
    this.doc.addEntities(mirrored);
    const count = mirrored.length;
    this.state.mirrorDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} creada${count === 1 ? '' : 's'} por simetria`;
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
    const draft = this.state.filletDraft || { firstOperand: null };
    const entity = this.findEntityAt(worldPoint);
    const operand = filletOperandAt(entity, worldPoint);
    if (!operand || entity.groupId) {
      this.state.statusText = entity?.groupId
        ? 'Descomponga la polilinea agrupada antes de empalmar'
        : 'Empalme: seleccione linea, arco, circulo o tramo de polilinea';
      return false;
    }
    if (!draft.firstOperand) {
      draft.firstOperand = operand;
      this.state.filletDraft = draft;
      this.state.statusText = `Primera entidad indicada · R${formatNumber(activeFilletRadius())} · seleccione la segunda`;
      return true;
    }
    if (
      operand.entity === draft.firstOperand.entity &&
      operand.segmentIndex === draft.firstOperand.segmentIndex
    ) {
      this.state.statusText = 'Seleccione otra entidad o un tramo diferente de la polilinea';
      return false;
    }
    const solution = filletSolutions(draft.firstOperand, operand, activeFilletRadius())[0];
    const result = solution
      ? applyFilletSolution(this.doc, draft.firstOperand, operand, solution)
      : { valid: false, reason: 'No se encontro una solucion tangente para esas entidades' };
    if (!result.valid) {
      this.state.statusText = result.reason;
      return false;
    }
    this.state.filletDraft = { firstOperand: null };
    this.state.hoveredEntity = null;
    this.state.statusText = result.radius <= SNAP_THRESHOLD
      ? 'Entidades prolongadas hasta su interseccion · seleccione otra primera entidad'
      : `Empalme creado · R${formatNumber(result.radius)} ${UNITS_LABEL} · seleccione otra primera entidad`;
    return true;
  }

  handleChamferPoint(worldPoint) {
    const draft = this.state.chamferDraft || { firstOperand: null };
    const entity = this.findEntityAt(worldPoint);
    const operand = filletOperandAt(entity, worldPoint);
    if (!operand || operand.primitive.type !== 'LINE' || entity.groupId) {
      this.state.statusText = entity?.groupId
        ? 'Descomponga la polilinea agrupada antes de achaflanar'
        : 'Chaflan: seleccione una linea o un tramo recto de polilinea';
      return false;
    }
    if (!draft.firstOperand) {
      draft.firstOperand = operand;
      this.state.chamferDraft = draft;
      this.state.statusText = `Primera entidad indicada · ${formatChamferDistances()} · seleccione la segunda`;
      return true;
    }
    if (operand.entity === draft.firstOperand.entity && operand.segmentIndex === draft.firstOperand.segmentIndex) {
      this.state.statusText = 'Seleccione otra linea o un tramo diferente';
      return false;
    }
    const distances = activeChamferDistances();
    const solution = chamferSolution(
      draft.firstOperand,
      operand,
      distances.first,
      distances.second,
    );
    const result = solution.valid
      ? applyChamferSolution(this.doc, draft.firstOperand, operand, solution)
      : solution;
    if (!result.valid) {
      this.state.statusText = result.reason;
      return false;
    }
    this.state.chamferDraft = { firstOperand: null };
    this.state.hoveredEntity = null;
    this.state.statusText = `Chaflan creado · ${formatChamferDistances()} · seleccione otra primera entidad`;
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
        this.state.mirrorDraft?.firstPoint ||
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

      if (this.state.mirrorDraft?.firstPoint) {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.mirrorDraft.firstPoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.mirrorSelectionAcross(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Segundo punto del eje no valido';
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

    if (this.state.tool === 'image-insert' || this.state.tool === 'image-calibrate') {
      this.handleImagePoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
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
        const isImageDoubleClick = entity.type === 'IMAGE' &&
          this.lastImagePointerDown?.entity === entity &&
          now - this.lastImagePointerDown.time <= 450;
        this.lastTextPointerDown = entity.type === 'TEXT' ? { entity, time: now } : null;
        this.lastHatchPointerDown = entity.type === 'HATCH' ? { entity, time: now } : null;
        this.lastBlockPointerDown = entity.type === 'INSERT' ? { entity, time: now } : null;
        this.lastImagePointerDown = entity.type === 'IMAGE' ? { entity, time: now } : null;
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
        if (isImageDoubleClick) {
          this.lastImagePointerDown = null;
          this.startImageCalibration(entity);
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
              : entity.type === 'HATCH'
                ? 'Sombreado'
                : entity.type === 'IMAGE' ? 'Imagen' : 'Linea';
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
      this.lastImagePointerDown = null;
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

    if (this.state.tool === 'mirror') {
      if (!this.state.mirrorDraft) {
        this.startMirror();
        return;
      }
      if (this.state.mirrorDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} para simetria`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'mirror',
          };
          this.state.statusText = 'Ventana de seleccion para simetria';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }
      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.mirrorDraft.firstPoint) {
        this.state.mirrorDraft.firstPoint = point;
        this.state.statusText = 'Primer punto del eje indicado - indique segundo punto';
      }
      else {
        this.mirrorSelectionAcross(point);
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

    if (this.state.tool === 'chamfer') {
      this.handleChamferPoint(worldPoint);
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
          : this.state.selectionWindow.purpose === 'mirror'
            ? `Seleccion para simetria por ${mode}`
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
          selectionWindow.purpose !== 'mirror' &&
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
            : selectionWindow.purpose === 'mirror'
              ? 'Seleccione objetos para simetria'
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
          selectionWindow.purpose === 'mirror' ||
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
            : selectionWindow.purpose === 'mirror'
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
                  : selectionWindow.purpose === 'mirror'
                    ? ' para simetria'
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
    if (!drawingProfileDialog.hidden || !settingsDialog.hidden || !textDialog.hidden || !hatchDialog.hidden ||
        !imageCalibrationDialog.hidden ||
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
        this.state.mirrorDraft?.selecting ||
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
    if (event.key.toLowerCase() === 's' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('mirror');
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
        this.state.mirrorDraft ||
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
    if (this.state.tool === 'chamfer') {
      toolLabel = `Chaflan ${formatChamferDistances()}`;
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
    if (this.state.tool === 'mirror') {
      toolLabel = 'Simetria';
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
    if (this.state.tool === 'image-insert') {
      toolLabel = 'Insertar imagen';
    }
    if (this.state.tool === 'image-calibrate') {
      toolLabel = 'Calibrar imagen';
    }
    if (DIMENSION_TOOLS.has(this.state.tool)) {
      toolLabel = commandLabel(this.state.tool);
    }
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    const activeGripPoint = this.activeGripPoint();
    const coordinateOrigin = this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      this.state.mirrorDraft?.firstPoint ||
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

const {
  loadBooleanPreference,
  loadDimensionStylePreference,
  loadIntegerPreference,
  loadLineStylePreference,
  loadNavigationDevice,
  storePreference,
} = createPreferenceServices({
  lineStyles: LINE_STYLES,
  defaultLineStyle: DEFAULT_LINE_STYLE,
  dimensionStyles: DIMENSION_STYLES,
});

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
  mirrorDraft: null,
  filletDraft: null,
  chamferDraft: null,
  selectionSetDraft: null,
  eraseDraft: null,
  explodeDraft: null,
  extendDraft: null,
  blockCreateDraft: null,
  blockInsertDraft: null,
  blockEditDraft: null,
  dimensionDraft: null,
  imageDraft: null,
  imageCalibrationDraft: null,
  dimensionStyle: loadDimensionStylePreference(),
  dimensionPrecision: {
    engineering: {
      linear: loadIntegerPreference('webcad-dimension-linear-precision-engineering', 2, 0, 4),
      angular: loadIntegerPreference('webcad-dimension-angular-precision-engineering', 2, 0, 4),
    },
    architecture: {
      linear: loadIntegerPreference('webcad-dimension-linear-precision-architecture', 2, 0, 4),
      angular: loadIntegerPreference('webcad-dimension-angular-precision-architecture', 2, 0, 4),
    },
  },
  lastDimensionOffsets: {
    engineering: null,
    architecture: null,
  },
  filletRadii: {
    engineering: 10,
    architecture: 0.25,
  },
  chamferDistances: {
    engineering: { first: 10, second: 10 },
    architecture: { first: 0.25, second: 0.25 },
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

const pngImporter = createPngImporter({
  input: importPngInput,
  onLoad: (imageData) => controller.startImageInsertion(imageData),
  onError: (error) => {
    console.error('No se pudo importar el PNG', error);
    state.statusText = error?.message || 'No se pudo importar la imagen PNG';
    controller.updateUiStatus();
    renderer.draw();
  },
});

function openImageCalibrationDialog() {
  const draft = state.imageCalibrationDraft;
  if (!draft?.sourceStart || !draft.sourceEnd) return false;
  imageCalibrationMeasuredInput.value = `${formatNumber(distance(draft.sourceStart, draft.sourceEnd))} ${UNITS_LABEL}`;
  imageCalibrationLengthInput.value = '';
  imageCalibrationError.textContent = '';
  imageCalibrationDialog.hidden = false;
  requestAnimationFrame(() => imageCalibrationLengthInput.focus());
  return true;
}

function closeImageCalibrationDialog(cancelCommand = true) {
  imageCalibrationDialog.hidden = true;
  imageCalibrationError.textContent = '';
  if (cancelCommand && state.tool === 'image-calibrate') {
    const entity = state.imageCalibrationDraft?.entity;
    controller.setTool('select');
    if (entity) doc.selectEntity(entity);
    state.statusText = 'Calibracion de imagen cancelada';
  }
  canvas.focus({ preventScroll: true });
  controller.updateUiStatus();
  renderer.draw();
}

function confirmImageCalibrationDialog() {
  const draft = state.imageCalibrationDraft;
  const targetLength = Number(String(imageCalibrationLengthInput.value).replace(',', '.'));
  if (!draft?.sourceStart || !draft.sourceEnd || !Number.isFinite(targetLength) || targetLength <= SNAP_THRESHOLD) {
    imageCalibrationError.textContent = 'Introduzca una longitud real mayor que cero';
    return false;
  }
  doc.recordHistory();
  if (!calibrateImageLength(draft.entity, draft.sourceStart, draft.sourceEnd, targetLength)) {
    imageCalibrationError.textContent = 'No se pudo calibrar con esos puntos';
    return false;
  }
  doc.markDirty();
  const entity = draft.entity;
  imageCalibrationDialog.hidden = true;
  controller.setTool('select');
  doc.selectEntity(entity);
  state.statusText = `Imagen calibrada a ${formatNumber(targetLength)} ${UNITS_LABEL}`;
  canvas.focus({ preventScroll: true });
  controller.updateUiStatus();
  renderer.draw();
  return true;
}

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
  syncChamferDistanceControl();
  return profile;
}

function activeFilletRadius() {
  const radius = state.filletRadii[state.drawingProfile];
  return Number.isFinite(radius)
    ? radius
    : state.drawingProfile === 'architecture' ? 0.25 : 10;
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
  if (!Number.isFinite(radius) || radius < 0) {
    state.statusText = 'El radio de empalme no puede ser negativo';
    controller.updateUiStatus();
    return false;
  }
  state.filletRadii[state.drawingProfile] = radius;
  state.statusText = `Radio de empalme: ${formatNumber(radius)} ${UNITS_LABEL}`;
  controller.updateUiStatus();
  return true;
}

function activeChamferDistances() {
  return state.chamferDistances[state.drawingProfile] || { first: 10, second: 10 };
}

function formatChamferDistances() {
  const distances = activeChamferDistances();
  return `D1 ${formatNumber(distances.first)} · D2 ${formatNumber(distances.second)}`;
}

function syncChamferDistanceControl() {
  if (!chamferDistanceFirstInput || !chamferDistanceSecondInput) {
    return;
  }
  const distances = activeChamferDistances();
  const step = state.drawingProfile === 'architecture' ? '0.01' : '1';
  chamferDistanceFirstInput.step = step;
  chamferDistanceSecondInput.step = step;
  chamferDistanceFirstInput.value = String(distances.first);
  chamferDistanceSecondInput.value = String(distances.second);
}

function updateChamferDistancesFromInput() {
  const first = Number(String(chamferDistanceFirstInput.value).replace(',', '.'));
  const second = Number(String(chamferDistanceSecondInput.value).replace(',', '.'));
  if (!Number.isFinite(first) || !Number.isFinite(second) || first < 0 || second < 0) {
    state.statusText = 'Las distancias de chaflan no pueden ser negativas';
    controller.updateUiStatus();
    return false;
  }
  state.chamferDistances[state.drawingProfile] = { first, second };
  state.statusText = `Chaflan: ${formatChamferDistances()} ${UNITS_LABEL}`;
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

function openSettingsDialog() {
  const precision = state.dimensionPrecision[state.drawingProfile];
  settingsDimensionStyleInput.value = state.dimensionStyle;
  settingsLinearPrecisionInput.value = String(precision.linear);
  settingsAngularPrecisionInput.value = String(precision.angular);
  settingsDialog.hidden = false;
  setLayerPickerOpen(false);
  setLineStylePickerOpen(false);
  setLineTypePickerOpen(false);
  setLineColorPickerOpen(false);
  requestAnimationFrame(() => settingsDimensionStyleInput.focus());
}

function closeSettingsDialog() {
  settingsDialog.hidden = true;
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function confirmSettingsDialog() {
  const styleId = DIMENSION_STYLES[settingsDimensionStyleInput.value]
    ? settingsDimensionStyleInput.value
    : 'normal';
  const linear = clamp(Number(settingsLinearPrecisionInput.value), 0, 4);
  const angular = clamp(Number(settingsAngularPrecisionInput.value), 0, 4);
  if (!Number.isInteger(linear) || !Number.isInteger(angular)) {
    return false;
  }
  state.dimensionStyle = styleId;
  state.dimensionPrecision[state.drawingProfile] = { linear, angular };
  dimensionStyleSelect.value = styleId;
  storePreference('webcad-dimension-style', styleId);
  storePreference(`webcad-dimension-linear-precision-${state.drawingProfile}`, linear);
  storePreference(`webcad-dimension-angular-precision-${state.drawingProfile}`, angular);
  settingsDialog.hidden = true;
  state.statusText = `Cotas: ${DIMENSION_STYLES[styleId].label} · precision ${linear} / ${angular}`;
  controller.updateUiStatus();
  renderer.draw();
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
  state.mirrorDraft = null;
  state.filletDraft = null;
  state.chamferDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.imageDraft = null;
  state.imageCalibrationDraft = null;
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
  state.mirrorDraft = null;
  state.filletDraft = null;
  state.chamferDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.imageDraft = null;
  state.imageCalibrationDraft = null;
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

const menuServices = createMenuServices({
  elements: {
    canvas,
    layerPicker,
    layerToggle,
    lineStylePicker,
    lineStyleToggle,
    lineStyleLabel,
    lineStyleOptionButtons,
    lineTypePicker,
    lineTypeToggle,
    lineTypeLabel,
    lineTypeOptionButtons,
    lineColorPicker,
    lineColorToggle,
    lineColorLabel,
    lineColorOptionButtons,
    toolGroupElements,
  },
  getState: () => state,
  doc,
  controller,
  renderer,
  styleServices,
  storePreference,
  setLayerPickerOpen: (open) => layerUi.setLayerPickerOpen(open),
});
const {
  closeToolGroups,
  setActiveLineColor,
  setActiveLineStyle,
  setActiveLineType,
  setLineColorPickerOpen,
  setLineStylePickerOpen,
  setLineTypePickerOpen,
  setToolGroupOpen,
  syncLineColorPicker,
  syncLineStylePicker,
  syncLineTypePicker,
} = menuServices;

const layerUi = createLayerUi({
  elements: {
    canvas,
    picker: layerPicker,
    toggle: layerToggle,
    label: layerLabel,
    list: layerList,
    createOpenButton: layerCreateOpenButton,
    createCancelButton: layerCreateCancelButton,
    createConfirmButton: layerCreateConfirmButton,
    nameInput: layerNameInput,
    styleInput: layerStyleInput,
    typeInput: layerTypeInput,
    colorInput: layerColorInput,
    activeSwatch: layerActiveSwatch,
    colorPreview: layerColorPreview,
    colorPalette: layerColorPalette,
    colorPaletteValue: layerColorPaletteValue,
    colorGrid: layerColorGrid,
  },
  getState: () => state,
  doc,
  controller,
  renderer,
  defaultLayer: DEFAULT_LAYER,
  defaultLineColor: DEFAULT_LINE_COLOR,
  lineColor: LINE_COLOR,
  styleServices,
  applyLayerToEntity,
  activeLayerDefinition,
  activeLayerName,
  menuServices,
  storePreference,
});
const {
  buildLayerColorPalette,
  setLayerPickerOpen,
  syncLayerPicker,
  syncLayersFromEntities,
} = layerUi;

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
  if (command === 'mirror') controller.startMirror();
  if (command === 'trim') controller.setTool('trim');
  if (command === 'fillet') controller.setTool('fillet');
  if (command === 'chamfer') controller.setTool('chamfer');
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
  if (command === 'settings') openSettingsDialog();
  if (command === 'export-dxf') exportDxf();
  if (command === 'import-dxf') importDxf();
  if (command === 'import-png') pngImporter.importPng();
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
  storePreference('webcad-dimension-style', state.dimensionStyle);
  state.statusText = `Estilo de cota: ${DIMENSION_STYLES[state.dimensionStyle].label}`;
  controller.updateUiStatus();
  renderer.draw();
});

imageCalibrationConfirmButton.addEventListener('click', confirmImageCalibrationDialog);
imageCalibrationCancelButton.addEventListener('click', () => closeImageCalibrationDialog(true));
imageCalibrationCloseButton.addEventListener('click', () => closeImageCalibrationDialog(true));
imageCalibrationDialog.addEventListener('pointerdown', (event) => {
  if (event.target === imageCalibrationDialog) closeImageCalibrationDialog(true);
});
imageCalibrationLengthInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    confirmImageCalibrationDialog();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    closeImageCalibrationDialog(true);
  }
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
[chamferDistanceFirstInput, chamferDistanceSecondInput].forEach((input) => {
  input.addEventListener('change', () => {
    updateChamferDistancesFromInput();
    renderer.draw();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (updateChamferDistancesFromInput()) {
        canvas.focus({ preventScroll: true });
        renderer.draw();
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      controller.cancelCurrentCommand();
      renderer.draw();
      canvas.focus({ preventScroll: true });
    }
  });
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
chamferToolButton.addEventListener('click', () => runCommand('chamfer'));
copyToolButton.addEventListener('click', () => runCommand('copy'));
moveToolButton.addEventListener('click', () => runCommand('move'));
rotateToolButton.addEventListener('click', () => runCommand('rotate'));
mirrorToolButton.addEventListener('click', () => runCommand('mirror'));
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
layerUi.bindEvents();
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
  state.mirrorDraft = null;
  state.filletDraft = null;
  state.chamferDraft = null;
  state.selectionSetDraft = null;
  state.eraseDraft = null;
  state.explodeDraft = null;
  state.extendDraft = null;
  state.blockCreateDraft = null;
  state.blockInsertDraft = null;
  state.dimensionDraft = null;
  state.imageDraft = null;
  state.imageCalibrationDraft = null;
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

bindDialogEvents({
  elements: {
    drawingProfile: {
      dialog: drawingProfileDialog,
      confirmButton: drawingProfileConfirmButton,
      cancelButton: drawingProfileCancelButton,
      closeButton: drawingProfileCloseButton,
    },
    settings: {
      dialog: settingsDialog,
      confirmButton: settingsDialogConfirmButton,
      cancelButton: settingsDialogCancelButton,
      closeButton: settingsDialogCloseButton,
    },
    text: {
      dialog: textDialog,
      confirmButton: textDialogConfirmButton,
      cancelButton: textDialogCancelButton,
      closeButton: textDialogCloseButton,
      inputs: [textContentInput, textHeightInput],
    },
    polylineWidth: {
      dialog: polylineWidthDialog,
      confirmButton: polylineWidthConfirmButton,
      cancelButton: polylineWidthCancelButton,
      closeButton: polylineWidthCloseButton,
      inputs: [polylineStartWidthInput, polylineEndWidthInput],
    },
    blockCreate: {
      dialog: blockCreateDialog,
      confirmButton: blockCreateConfirmButton,
      cancelButton: blockCreateCancelButton,
      closeButton: blockCreateCloseButton,
      nameInput: blockNameInput,
    },
    blockInsert: {
      dialog: blockInsertDialog,
      confirmButton: blockInsertConfirmButton,
      cancelButton: blockInsertCancelButton,
      closeButton: blockInsertCloseButton,
      inputs: [blockInsertNameInput, blockInsertScaleInput, blockInsertRotationInput],
    },
    hatch: {
      dialog: hatchDialog,
      confirmButton: hatchDialogConfirmButton,
      cancelButton: hatchDialogCancelButton,
      closeButton: hatchDialogCloseButton,
    },
    about: {
      dialog: aboutDialog,
      confirmButton: aboutDialogConfirmButton,
      closeButton: aboutDialogCloseButton,
    },
  },
  actions: {
    confirmDrawingProfile: confirmDrawingProfileDialog,
    closeDrawingProfile: closeDrawingProfileDialog,
    confirmSettings: confirmSettingsDialog,
    closeSettings: closeSettingsDialog,
    confirmText: confirmTextDialog,
    closeText: closeTextDialog,
    confirmPolylineWidth: confirmPolylineWidthDialog,
    closePolylineWidth: closePolylineWidthDialog,
    confirmBlockCreate: confirmBlockCreateDialog,
    closeBlockCreate: closeBlockCreateDialog,
    confirmBlockInsert: confirmBlockInsertDialog,
    closeBlockInsert: closeBlockInsertDialog,
    confirmHatch: confirmHatchDialog,
    closeHatch: closeHatchDialog,
    closeAbout: closeAboutDialog,
  },
});

renderer.resize();
buildLayerColorPalette();
syncLayerPicker();
syncLineStylePicker();
syncLineTypePicker();
syncLineColorPicker();
syncNavigationDeviceButtons();
dimensionStyleSelect.value = state.dimensionStyle;
controller.setTool('select');

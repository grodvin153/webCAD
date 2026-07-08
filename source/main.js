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
import {
  AUXILIARY_LAYER_NAME,
  DEFAULT_LAYER,
  DEFAULT_LAYERS,
  createLayerServices,
} from './properties/layers.js';
import { createProfileServices } from './properties/profiles.js';
import { createLayerUi } from './ui/layers.js';
import { createMenuServices } from './ui/menus.js';
import { createPreferenceServices } from './ui/preferences.js';
import { installViewportHeight } from './ui/viewport.js';
import { createArcEntityClass } from './entities/arc.js';
import { createCircleEntityClass } from './entities/circle.js';
import { createHatchEntityClass } from './entities/hatch.js';
import { createLineEntityClass } from './entities/line.js';
import { createPolylineEntityClass } from './entities/polyline.js';
import { createTextEntityClass } from './entities/text.js';
import { createXLineEntityClass } from './entities/xline.js';
import { createRasterImageEntityClass } from './images/entity.js';
import { createImageEditor } from './images/editor.js';
import { createPngImporter } from './images/importer.js';
import {
  applyImageAlignment,
  bestImageAlignment,
  calibrateImageLength,
} from './images/calibration.js';
import { drawRasterImage } from './images/rendering.js';
import { createEntityStrokeMethods } from './renderer/entities/strokes.js';
import { createEntitySceneMethods } from './renderer/entities/scene.js';
import { createToolPreviewMethods } from './renderer/previews/tools.js';
import { createDrawingPreviewMethods } from './renderer/previews/drawing.js';
import { createTransformPreviewMethods } from './renderer/previews/transforms.js';
import { createGripOverlayMethods } from './renderer/overlays/grips.js';
import { createGuideOverlayMethods } from './renderer/overlays/guides.js';
import { createControllerSelectionMethods } from './controller/selection/methods.js';
import { createControllerShortcutMethods } from './controller/keyboard/shortcuts.js';
import { createControllerInputMethods } from './controller/keyboard/input.js';
import { createControllerKeyboardEventMethods } from './controller/keyboard/events.js';
import { createControllerNavigationMethods } from './controller/mouse/navigation.js';
import { createControllerPointerMethods } from './controller/mouse/pointer.js';
import { createControllerLifecycleMethods } from './controller/commands/lifecycle.js';
import { createControllerImageMethods } from './controller/commands/images.js';
import { createControllerTransformMethods } from './controller/commands/transforms.js';
import { createControllerDrawingMethods } from './controller/commands/drawing.js';
import { createControllerDimensionMethods } from './controller/commands/dimensions.js';
import { createControllerStatusMethods } from './controller/status.js';
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
  pointFromPartialRelativeCoordinates,
  pointFromDistance,
  pointFromRelativeCoordinates,
  pointOnRadiusFromAngle,
} from './input/coordinates.js';
import {
  circularReferencePoints,
  createInputResolvers,
} from './input/snaps.js';
import { createOrthogonalInference } from './input/inference.js';
import { drawOrthogonalInference } from './input/inference-rendering.js';
import { projectPointToLine, selectionWindowMode } from './selection/geometry.js';
import {
  anchorSelectionWindow,
  completeAnchoredSelectionWindow,
  entitiesFromSelectionWindow,
  updateSelectionWindow,
} from './selection/window.js';
import { createHitTesting } from './selection/hit-testing.js';
import { createSelectionIntersections } from './selection/intersections.js';
import { createPolylineSelectionGeometry } from './selection/polyline.js';
import { createDimensionGripMovement } from './selection/grips/dimensions.js';
import { createPolylineGripMovement, moveCircularGrip } from './selection/grips/entities.js';
import { moveHatchGrip } from './selection/grips/hatch.js';
import { createGripReferences } from './selection/grips/references.js';
import { entityCanExplode } from './transformations/clone.js';
import { moveEntityByVector } from './transformations/move.js';
import {
  createScaleCommand,
  drawScalePreview as drawScaleCommandPreview,
  parseScaleFactor,
} from './transformations/scale-command.js';
import {
  dotProduct,
  mirrorEntityAcrossAxis,
} from './transformations/mirror.js';
import {
  rotateEntityByAngle,
  rotatePointAround,
  rotationAngleFromPoint,
} from './transformations/rotate.js';
import { createPolarArrayCommand } from './transformations/polar-array/command.js';
import { drawPolarArrayPreview as drawPolarArrayCommandPreview } from './transformations/polar-array/rendering.js';
import { createFilletGeometry } from './operations/fillet/geometry.js';
import { createFilletApplication } from './operations/fillet/application.js';
import { createChamferGeometry } from './operations/chamfer/geometry.js';
import { createChamferApplication } from './operations/chamfer/application.js';
import { createOffsetGeometry } from './operations/offset/geometry.js';
import { createOffsetApplication } from './operations/offset/application.js';
import { createOffsetCommand } from './operations/offset/command.js';
import { drawOffsetPreview as drawOffsetCommandPreview } from './operations/offset/rendering.js';
import { createStretchCommand } from './operations/stretch/command.js';
import { createLineTrimOperations } from './operations/trim/line.js';
import { createCircularTrimOperations } from './operations/trim/circular.js';
import { createPolylineTrimOperations } from './operations/trim/polyline.js';
import { createGroupedLineTrimOperations } from './operations/trim/grouped-lines.js';
import { createTrimOperations } from './operations/trim/index.js';
import { createTrimCommand } from './operations/trim/command.js';
import { createLineExtendOperations } from './operations/extend/line.js';
import { createArcExtendOperations } from './operations/extend/arc.js';
import { createPolylineExtendOperations } from './operations/extend/polyline.js';
import { createExtendCommand } from './operations/extend/command.js';
import { createHatchBoundaryGeometry } from './hatches/boundary.js';
import { createHatchFaces } from './hatches/faces.js';
import { createHatchFlood } from './hatches/flood.js';
import { createHatchTrimOperations } from './hatches/trim.js';
import { createHatchCommand } from './hatches/command.js';
import { createHatchDialog } from './hatches/dialog.js';
import { createTangentLineCommand } from './tools/tangent-line/command.js';
import { drawTangentLinePreview as drawTangentLineCommandPreview } from './tools/tangent-line/rendering.js';
import { createPointTangentLineCommand } from './tools/tangent-line/point-command.js';
import { drawPointTangentLinePreview } from './tools/tangent-line/point-rendering.js';
import { createXLineCommand } from './tools/xline/command.js';
import { drawXLine, drawXLinePreview as drawXLineCommandPreview } from './tools/xline/rendering.js';
import {
  keyboardCoordinateTarget,
  keyboardPointTarget,
  rectangleTargetPoint,
} from './input/constraints.js';
import { createCadFormatRegistry } from './files/formats/registry.js';
import { createDxfExporter } from './files/formats/dxf/exporter.js';
import { createDxfImporter } from './files/formats/dxf/importer.js';
import { createLocalFileManager } from './files/local-file-manager.js';
import { createAutosaveController } from './files/autosave.js';
import { createUnsupportedLocalSaveNotifier } from './files/browser-support.js';
import { createBlockRuntime } from './blocks/runtime.js';
import { createBlockCommand } from './blocks/command.js';
import { createBlockDialogs } from './blocks/dialogs.js';
import { createBlockEditor } from './blocks/editor.js';
import { createCadDocumentClass } from './document/cad-document.js';
import { createDocumentState } from './document/state.js';
import { createDomElements } from './app/dom-elements.js';
import { createRuntimeDialogs } from './ui/runtime-dialogs.js';
import { APP_VERSION } from './version.js';
import { createCommandDispatcher } from './app/command-dispatcher.js';
import { bindDxfImportInput } from './files/formats/dxf/import-handler.js';
import { bindApplicationEvents } from './app/event-wiring.js';
import { createRuntimeControls } from './app/runtime-controls.js';
import { createDocumentActions } from './app/document-actions.js';
import { initializeApplication } from './app/bootstrap.js';

installViewportHeight();
const elements = createDomElements(document);
const {
  canvas,
  selectToolButton, lineToolButton, tangentLineToolButton, pointTangentLineToolButton,
  xlineToolButton, polylineToolButton, rectangleToolButton, textToolButton, hatchToolButton,
  circleToolButton, circleToolMenuButton, arcToolButton, arcToolMenuButton,
  blockToolButton, blockToolMenuButton, trimToolButton, extendToolButton, filletToolButton,
  offsetToolButton, chamferToolButton, copyToolButton, moveToolButton, stretchToolButton,
  rotateToolButton, polarArrayToolButton, scaleToolButton, mirrorToolButton, eraseToolButton,
  explodeToolButton, dimensionStyleSelect, dimensionToolButtons, fitButton,
  navigationMouseButton, navigationTrackpadButton, undoButton, redoButton, newButton,
  saveButton, exportDxfButton, importDxfButton, importDxfInput, importPngInput,
  lineStylePicker, lineStyleToggle, lineStyleLabel, lineStyleOptionButtons,
  lineTypePicker, lineTypeToggle, lineTypeLabel, lineTypeText, lineTypeOptionButtons,
  lineColorPicker, lineColorToggle, lineColorLabel, lineColorOptionButtons,
  layerPicker, layerToggle, layerLabel, layerList, layerCreateOpenButton, layerEditOpenButton,
  layerCreateCancelButton, layerCreateConfirmButton, layerPanelTitle, layerNameInput,
  layerStyleInput, layerTypeInput, layerColorInput, layerActiveSwatch, layerColorPreview,
  layerColorPalette, layerColorPaletteValue, layerColorGrid, menuCommandButtons,
  undoCommandButtons, redoCommandButtons, toolGroupElements, toolFlyoutCommandButtons,
  cursorInput, blockEditorBar, blockEditorName, blockEditorSaveButton,
  blockEditorDiscardButton, statusOrthoButton, statusGridButton, statusLineWeightButton,
  statusTool, statusCursor, statusEntities, statusLength, statusLayer, statusMessage,
  statusDxf, filletRadiusControl, filletRadiusInput, offsetDistanceControl,
  offsetDistanceInput, chamferDistanceControl, chamferDistanceFirstInput,
  chamferDistanceSecondInput, polarArrayCountControl, polarArrayCountInput,
  drawingProfileDialog, drawingProfileCloseButton, drawingProfileCancelButton,
  drawingProfileConfirmButton, drawingProfileInputs, settingsDialog,
  settingsDialogCloseButton, settingsDialogCancelButton, settingsDialogConfirmButton,
  settingsDimensionStyleInput, settingsLinearPrecisionInput, settingsAngularPrecisionInput,
  textDialog, textDialogTitle, textDialogCloseButton, textDialogCancelButton,
  textDialogConfirmButton, textContentInput, textHeightInput, textDialogError,
  hatchDialog, hatchDialogTitle, hatchDialogCloseButton, hatchDialogCancelButton,
  hatchDialogConfirmButton, hatchPatternInput, hatchLayerInput, hatchColorInput,
  hatchDialogError, polylineWidthDialog, polylineWidthCloseButton,
  polylineWidthCancelButton, polylineWidthConfirmButton, polylineStartWidthInput,
  polylineEndWidthInput, polylineWidthError, blockCreateDialog, blockCreateCloseButton,
  blockCreateCancelButton, blockCreateConfirmButton, blockNameInput, blockCreateError,
  blockInsertDialog, blockInsertCloseButton, blockInsertCancelButton,
  blockInsertConfirmButton, blockInsertNameInput, blockInsertScaleInput,
  blockInsertRotationInput, blockInsertError, aboutDialog, aboutDialogCloseButton,
  aboutDialogConfirmButton, imageCalibrationDialog, imageCalibrationCloseButton,
  imageCalibrationCancelButton, imageCalibrationConfirmButton,
  imageCalibrationMeasuredInput, imageCalibrationLengthInput, imageCalibrationError,
} = elements;

let GRID_BASE = DRAWING_PROFILES.engineering.gridBase;
let MIN_VIEW_SCALE = DRAWING_PROFILES.engineering.minViewScale;
let MAX_VIEW_SCALE = DRAWING_PROFILES.engineering.maxViewScale;
let DEFAULT_DRAWING_SIZE = DRAWING_PROFILES.engineering.defaultDrawingSize;
let UNITS_LABEL = DRAWING_PROFILES.engineering.unitsLabel;
let nextEntityGroupId = 1;
let scaleCommand = null;
let stretchCommand = null;
let polarArrayCommand = null;
let tangentLineCommand = null;
let pointTangentLineCommand = null;
let offsetCommand = null;
let xlineCommand = null;
let localFileManager = null;
let autosaveController = null;
let imageEditor = null;
let trimCommand = null;
let extendCommand = null;
let hatchCommand = null;
let hatchDialogController = null;
let blockCommand = null;
let blockDialogs = null;
let blockEditor = null;
let commandDispatcher = null;

function runCommand(command) {
  return commandDispatcher?.run(command);
}

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

const orthogonalInference = createOrthogonalInference();

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
  inference: orthogonalInference,
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
  layerEntityOptions,
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
const XLineEntity = createXLineEntityClass(styleServices);
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
  dimensionLayerOptions: () => layerEntityOptions(AUXILIARY_LAYER_NAME),
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


const {
  BlockReferenceEntity,
  cloneBlockDefinition,
  cloneEntitiesWithOffset,
  cloneEntity,
  cloneEntityWithOffset,
  expandBlockReferenceEntities,
  transformedBlockContents,
} = createBlockRuntime({
  ArcEntity,
  CircleEntity,
  DEFAULT_LAYER,
  DEFAULT_LINE_COLOR,
  DEFAULT_LINE_STYLE,
  DEFAULT_LINE_TYPE,
  DimensionEntity,
  HatchEntity,
  LineEntity,
  PolylineEntity,
  RasterImageEntity,
  TextEntity,
  XLineEntity,
  applyLineColorToEntity,
  applyLineStyleToEntity,
  applyLineTypeToEntity,
  createBounds,
  createEntityGroupId,
  mergeBounds,
});

const CadDocument = createCadDocumentClass({
  HISTORY_LIMIT,
  SPATIAL_CELL_SIZE,
  SPATIAL_MAX_ENTITY_CELLS,
  SPATIAL_MAX_QUERY_CELLS,
  boundsIntersectsBounds,
  cloneEntity,
  mergeBounds,
});

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

const offsetGeometry = createOffsetGeometry(operationDependencies);
const offsetApplication = createOffsetApplication({
  offsetEntity: offsetGeometry.offsetEntity,
  factories: {
    createLine: (start, end, options) => new LineEntity(start, end, options),
    createXLine: (basePoint, direction, options) => new XLineEntity(basePoint, direction, options),
    createCircle: (center, radius, options) => new CircleEntity(center, radius, options),
    createArc: (center, radius, startAngle, endAngle, options) =>
      new ArcEntity(center, radius, startAngle, endAngle, options),
    createPolyline: (vertices, segments, options) => new PolylineEntity(vertices, segments, options),
  },
});

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

const { serializeDocumentToDxf } = createDxfExporter({
  DIMENSION_STYLES,
  activeDrawingProfile,
  dimensionGeometry,
  dimensionStyleMetrics,
  entityArcSweep,
  getLineColor,
  getLineStyle,
  getLineType,
  getState: () => state,
  normalizeAngle,
  polylineSegmentEntity,
});

const { parseDxf } = createDxfImporter({
  ArcEntity,
  BlockReferenceEntity,
  CircleEntity,
  DIMENSION_STYLES,
  DRAWING_PROFILES,
  DimensionEntity,
  HatchEntity,
  LineEntity,
  PolylineEntity,
  RasterImageEntity,
  SNAP_THRESHOLD,
  TextEntity,
  XLineEntity,
  angleOfPoint,
  arcCenterFromBulge,
  clamp,
  createBounds,
  distance,
  dxfEntityOptions,
  entityArcSweep,
  entityDistanceToPoint,
  entityMidpoint,
  expandBounds,
  getLineColor,
  getLineStyle,
  getLineType,
  infiniteLineLineIntersection,
  isCircularEntity,
  lineColorFromDxf,
  lineStyleFromDxf,
  lineTypeFromDxf,
  moveEntityByVector,
  normalizeAngle,
  normalizedVector,
  pointAtCircularParameter,
  pointOnCircularEntity,
  polygonSignedArea,
  primitiveEntityParts,
});
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
      z: 0,
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
    this.drawTangentLinePreview(ctx);
    this.drawPointTangentPreview(ctx);
    this.drawXLinePreview(ctx);
    this.drawFilletPreview(ctx);
    this.drawChamferPreview(ctx);
    this.drawOffsetPreview(ctx);
    this.drawPreview(ctx);
    this.drawGripMovePreview(ctx);
    this.drawCopyPreview(ctx);
    this.drawStretchPreview(ctx);
    this.drawPolarArrayPreview(ctx);
    this.drawRotatePreview(ctx);
    this.drawMirrorPreview(ctx);
    this.drawScalePreview(ctx);
    this.drawImageInteractionPreview(ctx);
    this.drawInferenceGuide(ctx);
    this.drawSelectionWindow(ctx);
    this.drawObjectSnapMarker(ctx);
  }
}

Object.assign(
  CadRenderer.prototype,
  createEntityStrokeMethods({
    CAD_TEXT_FONT,
    LINE_COLOR,
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    activeDrawingProfile,
    angleOfPoint,
    clamp,
    dimensionGeometry,
    distance,
    drawRasterImage,
    drawXLine,
    getLineStyle,
    pointAtCircleAngle,
    pointAtCircularParameter,
    pointAtLineParameter,
    polylineSegmentEntity,
    profileLineTypeDash,
  }),
  createEntitySceneMethods({
    PREVIEW_COLOR,
    SELECTED_COLOR,
    boundsIntersectsBounds,
    getLineStyle,
  }),
);

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

}

const doc = new CadDocument();

const {
  loadBooleanPreference,
  loadDimensionStylePreference,
  loadIntegerPreference,
  loadNavigationDevice,
  loadNumberPreference,
  storePreference,
} = createPreferenceServices({
  lineStyles: LINE_STYLES,
  defaultLineStyle: DEFAULT_LINE_STYLE,
  dimensionStyles: DIMENSION_STYLES,
});

const state = createDocumentState({
  DEFAULT_LAYER,
  DEFAULT_LAYERS,
  DEFAULT_LINE_COLOR,
  DEFAULT_LINE_STYLE,
  DEFAULT_LINE_TYPE,
  DRAWING_PROFILES,
  SNAP_THRESHOLD,
  loadBooleanPreference,
  loadDimensionStylePreference,
  loadIntegerPreference,
  loadNavigationDevice,
  loadNumberPreference,
});

const renderer = new CadRenderer(canvas, doc, state);
const controller = new CadController(canvas, doc, renderer, state);
state.doc = doc;
const runtimeControls = createRuntimeControls({
  state,
  controller,
  renderer,
  canvas,
  elements,
  snapThreshold: SNAP_THRESHOLD,
  activeDrawingProfile,
  drawingProfileById,
  formatNumber,
  getUnitsLabel: () => UNITS_LABEL,
  setProfileRuntimeValues: (profile) => {
    GRID_BASE = profile.gridBase;
    MIN_VIEW_SCALE = profile.minViewScale;
    MAX_VIEW_SCALE = profile.maxViewScale;
    DEFAULT_DRAWING_SIZE = profile.defaultDrawingSize;
    UNITS_LABEL = profile.unitsLabel;
  },
  storePreference,
});
const {
  activeChamferDistances,
  activeFilletRadius,
  activeOffsetDistance,
  applyDrawingProfile,
  fitView,
  formatChamferDistances,
  setDrawingProfileRuntime,
  setNavigationDevice,
  syncChamferDistanceControl,
  syncFilletRadiusControl,
  syncOffsetDistanceControl,
  syncPolarArrayCountControl,
  toggleGridSnap,
  toggleLineWeightDisplay,
  toggleOrthoMode,
  updateChamferDistancesFromInput,
  updateFilletRadiusFromInput,
  updateOffsetDistanceFromInput,
  updatePolarArrayCountFromInput,
} = runtimeControls;
blockDialogs = createBlockDialogs({
  SNAP_THRESHOLD,
  canvas,
  doc,
  state,
  elements: {
    createDialog: blockCreateDialog,
    createError: blockCreateError,
    insertDialog: blockInsertDialog,
    insertError: blockInsertError,
    nameInput: blockNameInput,
    rotationInput: blockInsertRotationInput,
    scaleInput: blockInsertScaleInput,
    selectInput: blockInsertNameInput,
  },
  setTool: (tool) => controller.setTool(tool),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
blockCommand = createBlockCommand({
  BlockReferenceEntity,
  activeLayerName,
  activeLineColorId,
  activeLineStyleId,
  activeLineTypeId,
  cloneEntitiesWithOffset,
  doc,
  state,
  openCreateDialog: () => blockDialogs.openCreate(),
  openInsertDialog: () => blockDialogs.openInsert(),
  rememberSelection: (entities) => controller.rememberSelectionSet(entities),
  setTool: (tool) => controller.setTool(tool),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
blockEditor = createBlockEditor({
  doc,
  state,
  setTool: (tool) => controller.setTool(tool),
  fitToDocument: () => renderer.fitToDocument(),
  screenToWorld: (point) => renderer.screenToWorld(point),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
  focusCanvas: () => requestAnimationFrame(() => canvas.focus({ preventScroll: true })),
});
function stretchCommandTargetPoint(worldPoint, basePoint = null) {
  const cursor = resolveCursorPoint(worldPoint, state);
  if (!basePoint) return cursor;
  const coordinateTarget = keyboardCoordinateTarget(basePoint, cursor, state.distanceInput);
  if (coordinateTarget) return coordinateTarget;
  const inputDistance = parseDistanceInput(state.distanceInput);
  return inputDistance !== null && cursor
    ? pointFromDistance(basePoint, cursor, inputDistance)
    : cursor;
}

stretchCommand = createStretchCommand({
  state,
  doc,
  cloneEntity,
  rememberSelection: (entities) => controller.rememberSelectionSet(entities),
  setTool: (tool) => controller.setTool(tool),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
  resolveTargetPoint: stretchCommandTargetPoint,
});
polarArrayCommand = createPolarArrayCommand({
  state,
  doc,
  cloneEntities: (entities) => cloneEntitiesWithOffset(
    entities,
    { x: 0, y: 0 },
    { remapGroups: true },
  ),
  rotateEntity: rotateEntityByAngle,
  rememberSelection: (entities) => controller.rememberSelectionSet(entities),
  resolvePoint: (point, origin) => resolvePointForState(point, state, origin),
  setTool: (tool) => controller.setTool(tool),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
  countValue: () => state.polarArrayCount,
});
scaleCommand = createScaleCommand({
  state,
  doc,
  rememberSelection: (entities) => controller.rememberSelectionSet(entities),
  setTool: (tool) => controller.setTool(tool),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
  formatNumber,
});
tangentLineCommand = createTangentLineCommand({
  state,
  doc,
  setTool: (tool) => controller.setTool(tool),
  findEntityAt: (point) => controller.findEntityAt(point),
  operandAt: filletOperandAt,
  createLine: (start, end) => new LineEntity(start, end, {
    layer: activeLayerName(),
    lineStyle: activeLineStyleId(),
    lineType: activeLineTypeId(),
    lineColor: activeLineColorId(),
  }),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
pointTangentLineCommand = createPointTangentLineCommand({
  state,
  doc,
  setTool: (tool) => controller.setTool(tool),
  findEntityAt: (point) => controller.findEntityAt(point),
  operandAt: filletOperandAt,
  resolvePoint: (point, origin) => resolvePointForState(point, state, origin),
  createLine: (start, end) => new LineEntity(start, end, {
    layer: activeLayerName(),
    lineStyle: activeLineStyleId(),
    lineType: activeLineTypeId(),
    lineColor: activeLineColorId(),
  }),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
offsetCommand = createOffsetCommand({
  state,
  setTool: (tool) => controller.setTool(tool),
  findEntityAt: (point) => controller.findEntityAt(point),
  distanceValue: activeOffsetDistance,
  application: offsetApplication,
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
xlineCommand = createXLineCommand({
  state,
  doc,
  setTool: (tool) => controller.setTool(tool),
  resolvePoint: (point, origin) => resolvePointForState(point, state, origin),
  keyboardPoint: keyboardPointTarget,
  createXLine: (basePoint, direction) => new XLineEntity(basePoint, direction, {
    ...layerEntityOptions(AUXILIARY_LAYER_NAME),
  }),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
trimCommand = createTrimCommand({
  state,
  doc,
  setTool: (tool) => controller.setTool(tool),
  findEntityAt: (point) => controller.findEntityAt(point),
  trimEntityAtPoint,
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
extendCommand = createExtendCommand({
  state,
  doc,
  historyLimit: HISTORY_LIMIT,
  setTool: (tool) => controller.setTool(tool),
  findEntityAt: (point) => controller.findEntityAt(point),
  rememberSelection: (entities) => controller.rememberSelectionSet(entities),
  extendLine: extendLineToBoundaries,
  extendArc: extendArcToBoundaries,
  extendPolyline: extendPolylineToBoundaries,
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
hatchDialogController = createHatchDialog({
  state,
  doc,
  elements: {
    dialog: hatchDialog,
    title: hatchDialogTitle,
    confirmButton: hatchDialogConfirmButton,
    patternInput: hatchPatternInput,
    layerInput: hatchLayerInput,
    colorInput: hatchColorInput,
    error: hatchDialogError,
  },
  createOption: () => document.createElement('option'),
  normalizeLineStyle: normalizeLineStyleId,
  normalizeLineType: normalizeLineTypeId,
  normalizeLineColor: normalizeLineColorId,
  applyLineStyle: applyLineStyleToEntity,
  applyLineType: applyLineTypeToEntity,
  applyLineColor: applyLineColorToEntity,
  setTool: (tool) => controller.setTool(tool),
  closePickers: () => {
    setLayerPickerOpen(false);
    setLineStylePickerOpen(false);
    setLineTypePickerOpen(false);
    setLineColorPickerOpen(false);
  },
  focusCanvas: () => requestAnimationFrame(() => canvas.focus({ preventScroll: true })),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
hatchCommand = createHatchCommand({
  state,
  doc,
  HatchEntity,
  snapThreshold: SNAP_THRESHOLD,
  polygonSignedArea,
  boundaryAtPoint: hatchBoundaryAtPoint,
  setTool: (tool) => controller.setTool(tool),
  openDialog: (entity = null) => hatchDialogController.open(entity),
  refresh: () => {
    controller.updateUiStatus();
    renderer.draw();
  },
});
Object.assign(
  CadRenderer.prototype,
  createToolPreviewMethods({
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    activeChamferDistances,
    activeFilletRadius,
    chamferSolution,
    drawOffsetCommandPreview,
    drawPointTangentLinePreview,
    drawTangentLineCommandPreview,
    drawXLineCommandPreview,
    filletOperandAt,
    filletSolutions,
    offsetCommand,
    pointTangentLineCommand,
    tangentLineCommand,
    xlineCommand,
  }),
  createDrawingPreviewMethods({
    BlockReferenceEntity,
    PolylineEntity,
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    TextEntity,
    activeDraftOrigin,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    arcFromCenterStartEnd,
    arcFromThreePoints,
    circleFromThreePoints,
    dimensionDraftEntity,
    dimensionPlacementPoint,
    distance,
    getLineStyle,
    keyboardCoordinateTarget,
    normalizeBoundsFromPoints,
    parseDistanceInput,
    pointFromDistance,
    pointOnRadiusFromAngle,
    polylineTangentArcToPoint,
    profileLineTypeDash,
    rectangleTargetPoint,
    resolveCursorPoint,
  }),
  createTransformPreviewMethods({
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    boundsIntersectsBounds,
    cloneEntity,
    cloneEntityWithOffset,
    distance,
    drawPolarArrayCommandPreview,
    drawScaleCommandPreview,
    gripPoint,
    gripReferencePoint,
    keyboardCoordinateTarget,
    mirrorEntityAcrossAxis,
    normalizedVector,
    offsetBounds,
    parseAngleInput,
    parseDistanceInput,
    pointFromDistance,
    polarArrayCommand,
    resolveCursorPoint,
    resolvePointForState,
    rotateEntityByAngle,
    rotatePointAround,
    rotationAngleFromPoint,
    stretchCommand,
    stretchCommandTargetPoint,
  }),
  createGripOverlayMethods({
    DIMENSION_TOOLS,
    SELECTED_COLOR,
    SNAP_COLOR,
    SNAP_MARKER_SIZE,
    circularReferencePoints,
    dimensionReferencePoints,
    polylineReferencePoints,
  }),
  createGuideOverlayMethods({
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    applyImageAlignment,
    bestImageAlignment,
    cloneEntity,
    drawOrthogonalInference,
    normalizeBoundsFromPoints,
    resolveCursorPoint,
    selectionWindowMode,
  }),
);
const cadFormatRegistry = createCadFormatRegistry();
cadFormatRegistry.register({
  id: 'dxf',
  label: 'Dibujo DXF',
  extension: '.dxf',
  mimeType: 'application/dxf',
  parse: (text) => parseDxf(text),
  serialize: () => serializeDocumentToDxf(doc),
});
const notifyUnsupportedLocalSave = createUnsupportedLocalSaveNotifier({
  onStatus: (message) => {
    state.statusText = message;
    controller.updateUiStatus();
    renderer.draw();
  },
});
localFileManager = createLocalFileManager({
  registry: cadFormatRegistry,
  defaultFormatId: 'dxf',
  getRevision: () => doc.revision,
  onStatus: (message) => {
    state.statusText = message;
    controller.updateUiStatus();
    renderer.draw();
  },
  onError: (message) => {
    state.statusText = message;
    controller.updateUiStatus();
    renderer.draw();
  },
  onUnsupported: notifyUnsupportedLocalSave,
});
autosaveController = createAutosaveController({
  fileManager: localFileManager,
  intervalMs: 30000,
  isIdle: () => (
    !state.selectionWindow &&
    !controller.panState &&
    !controller.gripDragState &&
    !doc.isEditingBlock()
  ),
});
autosaveController.start();

const documentActions = createDocumentActions({
  state,
  doc,
  controller,
  renderer,
  canvas,
  localFileManager,
  importDxfInput,
  defaultLayers: DEFAULT_LAYERS,
  defaultLayer: DEFAULT_LAYER,
  defaultLineStyle: DEFAULT_LINE_STYLE,
  defaultLineType: DEFAULT_LINE_TYPE,
  defaultLineColor: DEFAULT_LINE_COLOR,
  activeDrawingProfile,
  getUnitsLabel: () => UNITS_LABEL,
  orthogonalInference,
  serializeDocumentToDxf,
  syncProperties: () => {
    syncLayerPicker();
    syncLineStylePicker();
    syncLineTypePicker();
    syncLineColorPicker();
  },
});
const {
  exportDxf,
  importDxf,
  newDrawing,
  redoDrawing,
  undoDrawing,
} = documentActions;

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

imageEditor = createImageEditor({
  root: document,
  recordHistory: () => doc.recordHistory(),
  markDirty: () => doc.markDirty(),
  selectEntity: (entity) => doc.selectEntity(entity),
  requestDraw: () => renderer.draw(),
  setStatus: (message) => {
    state.statusText = message;
    controller.updateUiStatus();
  },
  focusCanvas: () => canvas.focus({ preventScroll: true }),
  startSegmentAlignment: (entity) => controller.startImageCalibration(entity),
});

const runtimeDialogs = createRuntimeDialogs({
  elements,
  state,
  doc,
  controller,
  renderer,
  canvas,
  appVersion: APP_VERSION,
  snapThreshold: SNAP_THRESHOLD,
  dimensionStyles: DIMENSION_STYLES,
  activeDrawingProfile,
  applyDrawingProfile: (profileId) => applyDrawingProfile(profileId),
  calibrateImageLength,
  clamp,
  closePickers: () => {
    setLayerPickerOpen(false);
    setLineStylePickerOpen(false);
    setLineTypePickerOpen(false);
    setLineColorPickerOpen(false);
  },
  distance,
  formatNumber,
  getUnitsLabel: () => UNITS_LABEL,
  storePreference,
});
const {
  closeAboutDialog,
  closeDrawingProfileDialog,
  closeImageCalibrationDialog,
  closePolylineWidthDialog,
  closeSettingsDialog,
  closeTextDialog,
  confirmDrawingProfileDialog,
  confirmImageCalibrationDialog,
  confirmPolylineWidthDialog,
  confirmSettingsDialog,
  confirmTextDialog,
  openDrawingProfileDialog,
  openImageCalibrationDialog,
  openPolylineWidthDialog,
  openSettingsDialog,
  openTextDialog,
  showAbout,
} = runtimeDialogs;

Object.assign(
  CadController.prototype,
  createControllerSelectionMethods({
    DIMENSION_TOOLS,
    SNAP_THRESHOLD,
    circularReferencePoints,
    createBounds,
    dimensionReferencePoints,
    distance,
    distancePointToArc,
    distancePointToCircle,
    distancePointToSegment,
    entitiesFromSelectionWindow,
    entityDistanceToPoint,
    expandBounds,
    formatNumber,
    gripPoint,
    gripReferencePoint,
    isCircularEntity,
    moveCircularGrip,
    moveDimensionGrip,
    moveHatchGrip,
    movePolylineGrip,
    pointFromDistance,
    polarArrayCommand,
    polylineReferencePoints,
    projectPointToLine,
    resolvePointForState,
    stretchCommand,
    unitsLabel: () => UNITS_LABEL,
  }),
  createControllerShortcutMethods({
    formatSnapType,
    runCommand,
    statusMessage,
  }),
  createControllerInputMethods({
    SNAP_THRESHOLD,
    activeDraftOrigin,
    clamp,
    cursorInput,
    dimensionPlacementOrigin,
    dimensionPlacementPoint,
    distance,
    formatNumber,
    parseAngleInput,
    parseCopyMultiplier,
    parseDistanceInput,
    parseScaleFactor,
    pointFromDistance,
    pointFromPartialRelativeCoordinates,
    pointFromRelativeCoordinates,
    rectangleTargetPoint,
    resolveCursorPoint,
    scaleCommand,
    stretchCommand,
    stretchCommandTargetPoint,
    unitsLabel: () => UNITS_LABEL,
    xlineCommand,
  }),
  createControllerKeyboardEventMethods({
    aboutDialog,
    blockCreateDialog,
    blockInsertDialog,
    drawingProfileDialog,
    hatchDialog,
    imageCalibrationDialog,
    imageEditor,
    localFileManager,
    orthogonalInference,
    polylineWidthDialog,
    redoDrawing,
    runCommand,
    settingsDialog,
    textDialog,
    undoDrawing,
  }),
  createControllerNavigationMethods({
    SNAP_THRESHOLD,
    VIEW_SCALE_FACTOR,
    clamp,
  }),
  createControllerPointerMethods({
    DIMENSION_TOOLS,
    activeDraftOrigin,
    anchorSelectionWindow,
    completeAnchoredSelectionWindow,
    enterBlockEditor,
    extendCommand,
    formatNumber,
    formatSnapType,
    getLineStyle,
    hatchCommand,
    hatchDialogController,
    imageEditor,
    isCircularEntity,
    keyboardPointTarget,
    offsetCommand,
    openBlockCreateDialog,
    openBlockInsertDialog,
    openTextDialog,
    pointTangentLineCommand,
    polarArrayCommand,
    rectangleTargetPoint,
    rotationAngleFromPoint,
    scaleCommand,
    selectionWindowMode,
    stretchCommand,
    tangentLineCommand,
    trimCommand,
    unitsLabel: () => UNITS_LABEL,
    updateSelectionWindow,
    xlineCommand,
  }),
  createControllerLifecycleMethods({
    DIMENSION_TOOLS,
    REPEATABLE_COMMANDS,
    activeFilletRadius,
    activeOffsetDistance,
    arcToolButton,
    blockToolButton,
    chamferDistanceControl,
    chamferToolButton,
    circleToolButton,
    commandLabel,
    copyToolButton,
    dimensionPlacementPoint,
    dimensionToolButtons,
    eraseToolButton,
    explodeToolButton,
    extendCommand,
    extendToolButton,
    filletRadiusControl,
    filletToolButton,
    formatChamferDistances,
    formatNumber,
    hatchToolButton,
    lineToolButton,
    mirrorToolButton,
    moveToolButton,
    offsetDistanceControl,
    offsetToolButton,
    openImageCalibrationDialog,
    orthogonalInference,
    pointTangentLineToolButton,
    polarArrayCommand,
    polarArrayCountControl,
    polarArrayToolButton,
    polylineToolButton,
    rectangleToolButton,
    resolveCursorPoint,
    resolvePointForState,
    rotateToolButton,
    runCommand,
    scaleCommand,
    scaleToolButton,
    selectToolButton,
    stretchCommand,
    stretchToolButton,
    syncChamferDistanceControl,
    syncFilletRadiusControl,
    syncOffsetDistanceControl,
    syncPolarArrayCountControl,
    tangentLineToolButton,
    textToolButton,
    toolFlyoutCommandButtons,
    trimToolButton,
    xlineToolButton,
  }),
  createControllerImageMethods({
    RasterImageEntity,
    SNAP_THRESHOLD,
    activeLayerName,
    applyImageAlignment,
    bestImageAlignment,
    dimensionLineFromEntity,
    distance,
    distancePointToSegment,
    orthogonalInference,
  }),
  createControllerTransformMethods({
    SNAP_THRESHOLD,
    cloneEntitiesWithOffset,
    entityCanExplode,
    extendCommand,
    formatNumber,
    mirrorEntityAcrossAxis,
    moveEntityByVector,
    polylineSegmentEntities,
    rotateEntityByAngle,
    transformedBlockContents,
  }),
  createControllerDrawingMethods({
    ArcEntity,
    CircleEntity,
    LineEntity,
    PolylineEntity,
    SNAP_THRESHOLD,
    TextEntity,
    activeChamferDistances,
    activeFilletRadius,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    applyChamferSolution,
    applyFilletSolution,
    arcFromCenterStartEnd,
    arcFromThreePoints,
    arcSweep,
    blockCommand,
    chamferSolution,
    circleFromThreePoints,
    distance,
    filletOperandAt,
    filletSolutions,
    formatChamferDistances,
    formatNumber,
    getLineStyle,
    hatchCommand,
    openPolylineWidthDialog,
    openTextDialog,
    pointOnRadiusFromAngle,
    polylineTangentArcToPoint,
    unitsLabel: () => UNITS_LABEL,
  }),
  createControllerDimensionMethods({
    DIMENSION_TOOLS,
    LineEntity,
    SNAP_THRESHOLD,
    activeDrawingProfile,
    angleOfPoint,
    dimensionCircularFromEntity,
    dimensionDraftEntity,
    dimensionKindForLine,
    dimensionLineFromEntity,
    dimensionPlacementDistance,
    dimensionPlacementPoint,
    dimensionTextValue,
    dimensionToolButtons,
    distance,
    formatNumber,
    infiniteLineLineIntersection,
    toolFlyoutCommandButtons,
    unitsLabel: () => UNITS_LABEL,
  }),
  createControllerStatusMethods({
    DIMENSION_TOOLS,
    activeDraftOrigin,
    activeDrawingProfile,
    activeFilletRadius,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    activeOffsetDistance,
    blockEditorBar,
    blockEditorName,
    commandLabel,
    dimensionPlacementPoint,
    formatChamferDistances,
    formatNumber,
    formatSnapType,
    getLineColor,
    getLineStyle,
    getLineType,
    parseCopyMultiplier,
    parseDistanceInput,
    pointFromDistance,
    pointFromPartialRelativeCoordinates,
    pointFromRelativeCoordinates,
    polylineTangentArcToPoint,
    rectangleTargetPoint,
    redoButton,
    redoCommandButtons,
    resolveCursorPoint,
    resolvePointForState,
    statusCursor,
    statusDxf,
    statusEntities,
    statusGridButton,
    statusLayer,
    statusLength,
    statusLineWeightButton,
    statusMessage,
    statusOrthoButton,
    statusTool,
    undoButton,
    undoCommandButtons,
    unitsLabel: () => UNITS_LABEL,
  }),
);

window.webcadDebug = { doc, state, renderer, controller, parseDxf, serializeDocumentToDxf };

function openBlockCreateDialog() {
  return blockDialogs.openCreate();
}

function openBlockInsertDialog() {
  return blockDialogs.openInsert();
}

function enterBlockEditor(reference) {
  return blockEditor.enter(reference);
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
    lineTypeText,
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
    editOpenButton: layerEditOpenButton,
    createCancelButton: layerCreateCancelButton,
    createConfirmButton: layerCreateConfirmButton,
    panelTitle: layerPanelTitle,
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
  setLayerPickerOpen,
  syncLayerPicker,
  syncLayersFromEntities,
} = layerUi;

commandDispatcher = createCommandDispatcher({
  state,
  controller,
  repeatableCommands: REPEATABLE_COMMANDS,
  dimensionTools: DIMENSION_TOOLS,
  localFileManager,
  commands: {
    tangentLine: tangentLineCommand,
    pointTangentLine: pointTangentLineCommand,
    xline: xlineCommand,
    stretch: stretchCommand,
    polarArray: polarArrayCommand,
    scale: scaleCommand,
    trim: trimCommand,
    offset: offsetCommand,
  },
  actions: {
    undoDrawing,
    redoDrawing,
    toggleOrthoMode,
    toggleGridSnap,
    toggleLineWeightDisplay,
    fitView,
    setNavigationDevice,
    newDrawing,
    openDrawingProfileDialog,
    openSettingsDialog,
    exportDxf,
    importDxf,
    importPng: () => pngImporter.importPng(),
    showAbout,
    closeToolGroups,
  },
  elements: { circleToolButton, arcToolButton },
});

bindApplicationEvents({
  elements,
  state,
  controller,
  renderer,
  dimensionStyles: DIMENSION_STYLES,
  storePreference,
  runCommand,
  controls: {
    updateFilletRadiusFromInput,
    updateOffsetDistanceFromInput,
    updatePolarArrayCountFromInput,
    updateChamferDistancesFromInput,
  },
  blockEditor,
  menuServices,
  layerUi,
  dialogs: runtimeDialogs,
  blockDialogs,
  hatchDialog: hatchDialogController,
});

bindDxfImportInput({
  input: importDxfInput,
  state,
  controller,
  renderer,
  registry: cadFormatRegistry,
  doc,
  localFileManager,
  orthogonalInference,
  setDrawingProfileRuntime,
  syncLayersFromEntities,
  activeDrawingProfile,
  getUnitsLabel: () => UNITS_LABEL,
});

initializeApplication({
  renderer,
  layerUi,
  menuServices,
  runtimeControls,
  dimensionStyleSelect,
  state,
  controller,
});

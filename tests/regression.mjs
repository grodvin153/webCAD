import assert from 'node:assert/strict';

import { createCommandDispatcher } from '../source/app/command-dispatcher.js';
import { createDocumentActions } from '../source/app/document-actions.js';
import { exportModel3dToAsciiStl, trianglesFromSolid } from '../source/3d/stl-exporter.js';
import {
  normalizeSolidPlacement,
  solidLocalToWorld,
} from '../source/3d/solid-placement.js';
import { solidTransformFromAlias } from '../source/3d/solid-transform-aliases.js';
import { copySolids, moveSolids, rotateSolids } from '../source/3d/solid-transformations.js';
import {
  inferProjectedAxis,
  isSolidTransformConfirmEvent,
  pointOnAxisFromSnap,
  pointFromReference,
  resolvePoint3dFromInput,
  solidTransformDisplacementStatus,
} from '../source/3d/three/solid-transform-command.js';
import { createControllerTransformMethods } from '../source/controller/commands/transforms.js';
import { createControllerDimensionMethods } from '../source/controller/commands/dimensions.js';
import { createControllerInputMethods } from '../source/controller/keyboard/input.js';
import { createControllerShortcutMethods } from '../source/controller/keyboard/shortcuts.js';
import { createControllerPointerMethods } from '../source/controller/mouse/pointer.js';
import { createControllerStatusMethods } from '../source/controller/status.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import { createArcEntityClass } from '../source/entities/arc.js';
import { createCircleEntityClass } from '../source/entities/circle.js';
import { createEllipseEntityClass } from '../source/entities/ellipse.js';
import { createHatchEntityClass } from '../source/entities/hatch.js';
import { createLineEntityClass } from '../source/entities/line.js';
import { createPolylineEntityClass } from '../source/entities/polyline.js';
import { createTextEntityClass } from '../source/entities/text.js';
import { createXLineEntityClass } from '../source/entities/xline.js';
import { createDxfExporter } from '../source/files/formats/dxf/exporter.js';
import { createDxfImporter } from '../source/files/formats/dxf/importer.js';
import { createCadFormatRegistry } from '../source/files/formats/registry.js';
import { createSaveLocationPicker } from '../source/files/save-location-picker.js';
import { createHatchBoundaryGeometry } from '../source/hatches/boundary.js';
import { createHatchFaces } from '../source/hatches/faces.js';
import { createHatchFlood } from '../source/hatches/flood.js';
import { parseWebcadProject, serializeWebcadProject } from '../source/files/formats/webcad-project.js';
import {
  boundsIntersectsBounds,
  circularParameter,
  createBounds,
  distance,
  entityArcSweep,
  lineParameter,
  mergeBounds,
  normalizeAngle,
  pointAtCircleAngle,
  pointAtCircularParameter,
  pointAtLineParameter,
  pointInPolygon,
  polygonSignedArea,
  TWO_PI,
  uniqueSortedParameters,
} from '../source/geometry.js';
import { createRasterImageEntityClass } from '../source/images/entity.js';
import {
  circleCircleIntersectionPoints,
  entityIntersectionPoints,
  isCircularEntity,
  lineSegmentIntersection,
} from '../source/intersections.js';
import {
  parsePartialRelativeCoordinateInput,
  parseRelativeCoordinateInput,
  parseScalarExpression,
} from '../source/input/entry.js';
import {
  pointFromPartialRelativeCoordinates,
  pointFromRelativeCoordinates,
} from '../source/input/coordinates.js';
import {
  isPolylineJoinCompatibleEntity,
  joinClosedPolylineLoops,
  joinPolylineEntities,
} from '../source/operations/polyline-join.js';
import { createCircularTrimOperations } from '../source/operations/trim/circular.js';
import { createLineTrimOperations } from '../source/operations/trim/line.js';
import { createEllipseTrimOperations } from '../source/operations/trim/ellipse.js';
import { entitiesFromSelectionWindow } from '../source/selection/window.js';
import { mirrorEntityAcrossAxis } from '../source/transformations/mirror.js';
import { moveEntityByVector } from '../source/transformations/move.js';
import { rotateEntityByAngle } from '../source/transformations/rotate.js';
import { scaleEntityAroundPoint } from '../source/transformations/scale.js';
import { createRegularPolygonCommand, regularPolygonVertices } from '../source/tools/regular-polygon/command.js';
import { pointTangentSolutions } from '../source/tools/tangent-line/point-geometry.js';
import { createEllipseCommand } from '../source/tools/ellipse/command.js';
import {
  ellipsePoint,
  ellipseReferencePoints,
  ellipseNormalizedParameter,
  ellipseParameterAtNormalized,
  ellipseSweep,
  isEllipseEntity,
  sampleEllipse,
} from '../source/ellipse/geometry.js';

const style = {
  applyLineStyleToEntity: (entity, value) => { entity.lineStyle = value; },
  applyLineTypeToEntity: (entity, value) => { entity.lineType = value; },
  applyLineColorToEntity: (entity, value) => { entity.lineColor = value; },
};
const LineEntity = createLineEntityClass(style);
const CircleEntity = createCircleEntityClass(style);
const ArcEntity = createArcEntityClass(style);
const EllipseEntity = createEllipseEntityClass(style);
const PolylineEntity = createPolylineEntityClass({
  style,
  polylineSegmentEntity: () => null,
  polylineSegmentEntities: () => [],
});
const HatchEntity = createHatchEntityClass(style);
const TextEntity = createTextEntityClass(style);
const XLineEntity = createXLineEntityClass(style);
const RasterImageEntity = createRasterImageEntityClass(style);
const JOIN_TOLERANCE = 1e-6;

function testInputAndCoordinates() {
  assert.equal(parseScalarExpression('127/2'), 63.5);
  assert.deepEqual(parseRelativeCoordinateInput('10,20'), { x: 10, y: 20, z: 0 });
  assert.deepEqual(parseRelativeCoordinateInput('10/2,20,3*4'), { x: 5, y: 20, z: 12 });
  assert.deepEqual(parsePartialRelativeCoordinateInput('10,,5'), { x: 10, y: null, z: 5 });
  assert.deepEqual(
    pointFromRelativeCoordinates({ x: 1, y: 2, z: 3 }, '10,20,4'),
    { x: 11, y: -18, z: 7 },
  );
  assert.deepEqual(
    pointFromPartialRelativeCoordinates({ x: 1, y: 2, z: 3 }, { x: 8, y: 9, z: 3 }, '10,,5'),
    { x: 11, y: 9, z: 8 },
  );
}

function testEntitiesAndTransforms() {
  const line = new LineEntity({ x: 1, y: 2 }, { x: 3, y: 4, z: 8 });
  const circle = new CircleEntity({ x: 1, y: 2, z: 3 }, 2);
  const arc = new ArcEntity({ x: 1, y: 2, z: 4 }, 2, 0, 1);
  const polyline = new PolylineEntity(
    [{ x: 0, y: 0 }, { x: 1, y: 1, z: 5 }],
    [{ type: 'LINE' }],
  );
  const hatch = new HatchEntity([
    { x: 0, y: 0 }, { x: 1, y: 0, z: 2 }, { x: 0, y: 1, z: 2 },
  ]);
  const text = new TextEntity({ x: 1, y: 2, z: 6 }, 'A', 1);
  const xline = new XLineEntity({ x: 1, y: 2, z: 7 }, { x: 1, y: 0, z: 0 });
  const image = new RasterImageEntity(
    { x: 1, y: 2, z: 9 }, 2, 2, 'data:image/png;base64,AA==',
  );
  assert.equal(line.start.z, 0);
  assert.deepEqual(
    [line.end.z, circle.center.z, arc.center.z, polyline.vertices[1].z,
      hatch.boundary[1].z, text.insertionPoint.z, xline.basePoint.z, image.center.z],
    [8, 3, 4, 5, 2, 6, 7, 9],
  );

  moveEntityByVector(line, { x: 2, y: 3 });
  rotateEntityByAngle(line, { x: 0, y: 0, z: 99 }, 90);
  scaleEntityAroundPoint(line, { x: 1, y: 1, z: 99 }, 2);
  mirrorEntityAcrossAxis(line, { x: 0, y: 0, z: 99 }, { x: 1, y: 0, z: 99 });
  assert.deepEqual([line.start.z, line.end.z], [0, 8]);
}

function testIntersectionsAndSelection() {
  const crossing = lineSegmentIntersection(
    { start: { x: 0, y: 0, z: 2 }, end: { x: 10, y: 0, z: 6 } },
    { start: { x: 5, y: -1 }, end: { x: 5, y: 1 } },
  );
  assert.deepEqual(crossing, { x: 5, y: 0, z: 4 });
  assert.equal(circleCircleIntersectionPoints(
    { center: { x: 0, y: 0, z: 8 }, radius: 5 },
    { center: { x: 8, y: 0, z: 8 }, radius: 5 },
  )[0].z, 8);

  const inside = new LineEntity({ x: 2, y: 2 }, { x: 8, y: 2 });
  const crossingWindow = new LineEntity({ x: -2, y: 5 }, { x: 4, y: 5 });
  const doc = {
    queryBounds: () => [inside, crossingWindow],
    expandEntityGroups: (entities) => entities,
  };
  assert.deepEqual(entitiesFromSelectionWindow(doc, {
    startWorld: { x: 0, y: 0 }, currentWorld: { x: 10, y: 10 },
  }), [inside]);
  assert.deepEqual(entitiesFromSelectionWindow(doc, {
    startWorld: { x: 10, y: 10 }, currentWorld: { x: 0, y: 0 },
  }), [inside, crossingWindow]);

  const ellipse = new EllipseEntity({ x: 0, y: 0 }, 10, 4, Math.PI / 4);
  const ellipseDoc = {
    queryBounds: () => [ellipse],
    expandEntityGroups: (entities) => entities,
  };
  assert.deepEqual(entitiesFromSelectionWindow(ellipseDoc, {
    startWorld: { x: 12, y: 8 }, currentWorld: { x: 5, y: -8 },
  }), [ellipse]);
  assert.deepEqual(entitiesFromSelectionWindow(ellipseDoc, {
    startWorld: { x: 5, y: -8 }, currentWorld: { x: 12, y: 8 },
  }), []);
}

function testExactEllipseEntityAndIntersections() {
  const ellipse = new EllipseEntity({ x: 0, y: 0, z: 3 }, 5, 3, 0);
  assert.equal(ellipse.type, 'ELLIPSE');
  assert.deepEqual(ellipseReferencePoints(ellipse).map((candidate) => candidate.type), [
    'center', 'center', 'quadrant', 'quadrant', 'quadrant', 'quadrant',
  ]);
  assert.equal(ellipseReferencePoints(ellipse).length, 6);
  const lineHits = entityIntersectionPoints(
    new LineEntity({ x: -10, y: 0 }, { x: 10, y: 0 }),
    ellipse,
    (entity) => [entity],
  );
  assert.deepEqual(lineHits.map((point) => Math.round(point.x)), [-5, 5]);
  const tangentHits = entityIntersectionPoints(
    new LineEntity({ x: -10, y: 3 }, { x: 10, y: 3 }),
    ellipse,
    (entity) => [entity],
  );
  assert.equal(tangentHits.length, 1);
  assert.ok(Math.abs(tangentHits[0].x) < 1e-8);
  const circleHits = entityIntersectionPoints(
    ellipse,
    new CircleEntity({ x: 0, y: 0 }, 4),
    (entity) => [entity],
  );
  assert.equal(circleHits.length, 4);
  circleHits.forEach((point) => assert.ok(Math.abs(Math.hypot(point.x, point.y) - 4) < 1e-5));
  const tangentCircleHits = entityIntersectionPoints(
    ellipse,
    new CircleEntity({ x: 0, y: 4 }, 1),
    (entity) => [entity],
  );
  assert.equal(tangentCircleHits.length, 1);
  const arcHits = entityIntersectionPoints(
    ellipse,
    new ArcEntity({ x: 0, y: 0 }, 4, 0, Math.PI),
    (entity) => [entity],
  );
  assert.equal(arcHits.length, 2);
  const polyline = new PolylineEntity(
    [{ x: -10, y: 0 }, { x: 10, y: 0 }],
    [{ type: 'LINE' }],
  );
  const polylineHits = entityIntersectionPoints(ellipse, polyline, (entity) =>
    entity.type === 'POLYLINE'
      ? [new LineEntity(entity.vertices[0], entity.vertices[1])]
      : [entity]);
  assert.equal(polylineHits.length, 2);

  moveEntityByVector(ellipse, { x: 2, y: 1 });
  rotateEntityByAngle(ellipse, { x: 0, y: 0 }, 90);
  scaleEntityAroundPoint(ellipse, { x: 0, y: 0 }, 2);
  mirrorEntityAcrossAxis(ellipse, { x: 0, y: 0 }, { x: 1, y: 0 });
  assert.equal(ellipse.radiusX, 10);
  assert.equal(ellipse.radiusY, 6);
  assert.equal(ellipse.center.z, 3);
}

function testPointTangentsToEllipses() {
  const ellipse = new EllipseEntity({ x: 0, y: 0 }, 5, 3, 0);
  const solutions = pointTangentSolutions({ x: 10, y: 0 }, { primitive: ellipse });
  assert.equal(solutions.length, 2);
  solutions.forEach((solution) => {
    const normalized = solution.end.x ** 2 / 25 + solution.end.y ** 2 / 9;
    assert.ok(Math.abs(normalized - 1) < 1e-7);
    assert.ok(Math.abs(solution.end.x - 2.5) < 1e-5);
  });
  const ellipseArc = new EllipseEntity({ x: 0, y: 0 }, 5, 3, 0, {
    startParameter: 0,
    endParameter: Math.PI,
  });
  const arcSolutions = pointTangentSolutions({ x: 10, y: 0 }, { primitive: ellipseArc });
  assert.equal(arcSolutions.length, 1);
  assert.ok(arcSolutions[0].end.y > 0);
  assert.deepEqual(pointTangentSolutions({ x: 0, y: 0 }, { primitive: ellipse }), []);
}

function testEllipseCommandAndTrim() {
  const state = { tool: 'select', ellipseDraft: null, statusText: '' };
  const doc = { entities: [], addEntity(entity) { this.entities.push(entity); } };
  const command = createEllipseCommand({
    state,
    doc,
    EllipseEntity,
    activeLayerName: () => '0',
    activeLineColorId: () => 'bylayer',
    activeLineStyleId: () => 'bylayer',
    activeLineTypeId: () => 'bylayer',
    setTool: (tool) => { state.tool = tool; if (tool !== 'ellipse') state.ellipseDraft = null; },
    refresh() {},
    tolerance: 1e-9,
  });
  command.start();
  command.pick({ x: -5, y: 0 });
  command.pick({ x: 5, y: 0 });
  const preview = command.previewAt({ x: 0, y: 3 });
  assert.deepEqual([preview.radiusX, preview.radiusY, preview.rotation], [5, 3, 0]);
  command.pick({ x: 0, y: 3 });
  assert.equal(doc.entities[0].type, 'ELLIPSE');

  const ellipse = doc.entities[0];
  const limits = [
    new LineEntity({ x: -6, y: 0 }, { x: 6, y: 0 }),
    new LineEntity({ x: 0, y: -4 }, { x: 0, y: 4 }),
  ];
  const trimDoc = {
    queryBounds: () => [ellipse, ...limits],
    replaceEntity: (_entity, replacements) => { trimDoc.replacements = replacements; return true; },
    removeEntity: () => true,
  };
  const trim = createEllipseTrimOperations({
    EllipseEntity,
    entityIntersectionPoints: (first, second) => entityIntersectionPoints(first, second, (entity) => [entity]),
  });
  const result = trim.trimEllipseEntityAtPoint(trimDoc, ellipse, ellipsePoint(ellipse, Math.PI / 4));
  assert.equal(result.trimmed, true);
  assert.equal(trimDoc.replacements.length, 1);
  assert.equal(trimDoc.replacements[0].type, 'ELLIPSE_ARC');
  assert.equal(ellipseReferencePoints(trimDoc.replacements[0]).length, 8);

  const historyDoc = createTestCadDocument();
  historyDoc.addEntity(ellipse);
  assert.equal(historyDoc.entities[0].type, 'ELLIPSE');
  assert.equal(historyDoc.undo(), true);
  assert.equal(historyDoc.entities.length, 0);
  assert.equal(historyDoc.redo(), true);
  assert.equal(historyDoc.entities[0].type, 'ELLIPSE');
}

function testDimensionPointEntryAndEllipseKeyboard() {
  const dimensionMethods = createControllerDimensionMethods({
    DIMENSION_TOOLS: new Set(['dimension-horizontal']),
    LineEntity,
    SNAP_THRESHOLD: 1e-9,
    activeDrawingProfile: () => ({ id: 'engineering' }),
    dimensionCircularFromEntity: () => null,
    dimensionLineFromEntity: () => null,
    dimensionToolButtons: [],
    distance,
    objectSnapPoint: () => null,
    toolFlyoutCommandButtons: [],
    unitsLabel: () => 'mm',
  });
  const dimensionController = {
    ...dimensionMethods,
    state: {
      dimensionDraft: { kind: 'horizontal', requestedKind: 'horizontal', phase: 'reference', points: [] },
      lastDimensionOffsets: { engineering: null },
      statusText: '',
    },
    findEntityAt: () => null,
    resolveInputPoint: (point) => point,
  };
  assert.equal(dimensionMethods.handleDimensionPoint.call(dimensionController, { x: 0, y: 0 }), true);
  assert.equal(dimensionController.state.dimensionDraft.phase, 'second-point');
  assert.equal(dimensionMethods.handleDimensionPoint.call(dimensionController, { x: 10, y: 0 }), true);
  assert.equal(dimensionController.state.dimensionDraft.phase, 'placement');

  let ellipseTarget = null;
  const inputMethods = createControllerInputMethods({
    SNAP_THRESHOLD: 1e-9,
    activeDraftOrigin: () => ({ x: 0, y: 0 }),
    dimensionPlacementOrigin: () => null,
    ellipseCommand: { pick: (point) => { ellipseTarget = point; return true; } },
    parseCopyMultiplier: () => null,
    parseDistanceInput: (value) => Number(value),
    pointFromPartialRelativeCoordinates: () => null,
    pointFromRelativeCoordinates: () => null,
    resolveCursorPoint: (point) => point,
    unitsLabel: () => 'mm',
  });
  const inputController = {
    state: {
      distanceInput: '3',
      ellipseDraft: { points: [{ x: -5, y: 0 }, { x: 5, y: 0 }] },
      mouseWorld: { x: 0, y: 10 },
    },
    activeGripPoint: () => null,
  };
  assert.equal(inputMethods.handleDistanceInputKey.call(inputController, { key: 'Enter' }), true);
  assert.deepEqual(ellipseTarget, { x: 0, y: 3, z: 0 });
  assert.equal(inputController.state.distanceInput, '');
}

function testHatchWithEllipses() {
  const boundaryGeometry = createHatchBoundaryGeometry({
    TWO_PI,
    ellipseReferencePoints,
    isEllipseEntity,
    isCircularEntity,
    pointAtCircleAngle,
    sampleEllipse,
  });
  const faceDependencies = {
    SNAP_THRESHOLD: 1e-6,
    TWO_PI,
    boundsIntersectsBounds,
    circularParameter,
    curveGroupsFromFaceEdges: boundaryGeometry.curveGroupsFromFaceEdges,
    distance,
    ellipseNormalizedParameter,
    ellipseParameterAtNormalized,
    ellipsePoint,
    ellipseSweep,
    entityArcSweep,
    entityIntersectionPoints: (first, second) => entityIntersectionPoints(first, second, (entity) => [entity]),
    isEllipseEntity,
    lineParameter,
    pointAtCircularParameter,
    pointAtLineParameter,
    polygonSignedArea,
    polylineSegmentEntities: () => [],
    uniqueSortedParameters,
  };
  const { curveArrangementFaces } = createHatchFaces(faceDependencies);
  const { hatchBoundaryAtPoint } = createHatchFlood({
    SNAP_THRESHOLD: 1e-6,
    circlePolygon: boundaryGeometry.circlePolygon,
    ellipsePolygon: boundaryGeometry.ellipsePolygon,
    closedLineGroupPolygon: () => null,
    curveArrangementFaces,
    distance,
    pointInPolygon,
    polygonSignedArea,
  });

  const ellipse = new EllipseEntity({ x: 0, y: 0 }, 6, 3, Math.PI / 8);
  const ellipseDoc = {
    entities: [ellipse],
    topLevelEntities() { return this.entities; },
  };
  const ellipseBoundary = hatchBoundaryAtPoint(ellipseDoc, { x: 0, y: 0 });
  assert.ok(ellipseBoundary?.length >= 96);
  assert.equal(ellipseBoundary.curveGroups[0].type, 'ELLIPSE');

  const ellipseArc = new EllipseEntity({ x: 0, y: 0 }, 5, 3, 0, {
    startParameter: 0,
    endParameter: Math.PI,
  });
  const chord = new LineEntity(ellipsePoint(ellipseArc, Math.PI), ellipsePoint(ellipseArc, 0));
  const mixedDoc = {
    entities: [ellipseArc, chord],
    topLevelEntities() { return this.entities; },
  };
  const mixedBoundary = hatchBoundaryAtPoint(mixedDoc, { x: 0, y: 1 });
  assert.ok(mixedBoundary?.length >= 3);
  assert.ok(mixedBoundary.curveGroups.some((group) => group.type === 'ELLIPSE_ARC'));
}

function testTrim() {
  const target = new LineEntity({ x: 0, y: 0 }, { x: 10, y: 0 });
  const limits = [
    new LineEntity({ x: 2, y: -2 }, { x: 2, y: 2 }),
    new LineEntity({ x: 8, y: -2 }, { x: 8, y: 2 }),
  ];
  const lineDoc = {
    queryBounds: () => [target, ...limits],
    replaceEntity: (_entity, replacements) => {
      lineDoc.replacements = replacements;
      return true;
    },
  };
  const lineTrim = createLineTrimOperations({
    LineEntity,
    SNAP_THRESHOLD: 1e-9,
    closestPointOnLineSegment: (entity, point) => point,
    entityIntersectionPoints: (first, second) => entityIntersectionPoints(first, second, (item) => [item]),
    lineParameter: (entity, point) => (point.x - entity.start.x) / (entity.end.x - entity.start.x),
    pointAtLineParameter: (entity, parameter) => ({
      x: entity.start.x + (entity.end.x - entity.start.x) * parameter,
      y: entity.start.y,
      z: 0,
    }),
    uniqueSortedParameters: (values) => [...new Set(values)].sort((a, b) => a - b),
  });
  assert.equal(lineTrim.trimLineEntityAtPoint(lineDoc, target, { x: 5, y: 0 }).trimmed, true);
  assert.deepEqual(lineDoc.replacements.map((line) => [line.start.x, line.end.x]), [[0, 2], [8, 10]]);

  const circle = new CircleEntity({ x: 0, y: 0 }, 5);
  const circleLimits = [
    new LineEntity({ x: -6, y: 0 }, { x: 6, y: 0 }),
    new LineEntity({ x: 0, y: -6 }, { x: 0, y: 6 }),
  ];
  const circleDoc = {
    queryBounds: () => [circle, ...circleLimits],
    replaceEntity: (_entity, replacements) => {
      circleDoc.replacements = replacements;
      return true;
    },
  };
  const circularTrim = createCircularTrimOperations({
    ArcEntity,
    SNAP_THRESHOLD: 1e-9,
    TWO_PI: Math.PI * 2,
    arcSweep: (start, end) => normalizeAngle(end - start),
    circularParameter: (entity, point) => normalizeAngle(Math.atan2(point.y, point.x)) / (Math.PI * 2),
    directedArcSweep: (start, end) => normalizeAngle(end - start),
    entityArcSweep: (entity) => normalizeAngle(entity.endAngle - entity.startAngle),
    entityIntersectionPoints: (first, second) => entityIntersectionPoints(first, second, (item) => [item]),
    isCircularEntity: (entity) => entity.type === 'CIRCLE' || entity.type === 'ARC',
    uniqueSortedParameters: (values) => [...new Set(values.map((value) => Math.round(value * 1e9) / 1e9))]
      .sort((a, b) => a - b),
  });
  assert.equal(circularTrim.trimCircularEntityAtPoint(circleDoc, circle, { x: 4, y: 1 }).trimmed, true);
  assert.equal(circleDoc.replacements.length, 1);
  assert.equal(circleDoc.replacements[0].type, 'ARC');
}

function testDocumentHistory() {
  const cloneLine = (entity) => new LineEntity(entity.start, entity.end, {
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  });
  const CadDocument = createCadDocumentClass({
    HISTORY_LIMIT: 20,
    SPATIAL_CELL_SIZE: 100,
    SPATIAL_MAX_ENTITY_CELLS: 64,
    SPATIAL_MAX_QUERY_CELLS: 4096,
    boundsIntersectsBounds,
    cloneEntity: cloneLine,
    mergeBounds,
    rotateEntityByAngle,
  });
  const doc = new CadDocument();
  doc.addEntity(new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }), { recordHistory: false });
  doc.addEntity(new LineEntity({ x: 0, y: 1 }, { x: 1, y: 1 }));
  assert.equal(doc.entities.length, 2);
  assert.equal(doc.undo(), true);
  assert.equal(doc.entities.length, 1);
  assert.equal(doc.redo(), true);
  assert.equal(doc.entities.length, 2);

  const emptyDoc = new CadDocument();
  assert.deepEqual(emptyDoc.model3d, {
    version: 1,
    sketchPlane: 'XY',
    sketches: [],
    nextSketchId: 1,
    lines: [],
    nextLineId: 1,
    solids: [],
    nextSolidId: 1,
  });
  const lineDoc = new CadDocument();
  const line3dRecords = lineDoc.add3dLines([
    {
      start: { x: 1, y: 2, z: 3 },
      end: { x: 4, y: 5, z: 6 },
    },
  ]);
  assert.equal(line3dRecords.length, 1);
  assert.equal(lineDoc.model3d.lines[0].type, 'LINE3D');
  assert.equal(lineDoc.undo(), true);
  assert.equal(lineDoc.model3d.lines.length, 0);
  assert.equal(lineDoc.redo(), true);
  assert.deepEqual(lineDoc.model3d.lines[0].end, { x: 4, y: 5, z: 6 });
  assert.equal(lineDoc.set3dLineGroupVisibility(line3dRecords[0].groupId, false), true);
  assert.equal(lineDoc.model3d.lines[0].visible, false);
  assert.equal(lineDoc.undo(), true);
  assert.equal(lineDoc.model3d.lines[0].visible, true);
  assert.equal(lineDoc.redo(), true);
  assert.equal(lineDoc.model3d.lines[0].visible, false);
  const lineTopologyDoc = new CadDocument();
  const firstTopologyLine = lineTopologyDoc.add3dLines([{
    start: { x: 0, y: 0, z: 0 },
    end: { x: 10, y: 0, z: 0 },
  }], { recordHistory: false })[0];
  const secondTopologyLine = lineTopologyDoc.add3dLines([{
    start: { x: 5, y: -5, z: 0 },
    end: { x: 5, y: 5, z: 0 },
  }], { recordHistory: false })[0];
  assert.equal(lineTopologyDoc.update3dLineTopology({
    replacements: [{
      id: firstTopologyLine.id,
      segments: [{
        start: { x: 0, y: 0, z: 0 },
        end: { x: 5, y: 0, z: 0 },
      }, {
        start: { x: 5, y: 0, z: 0 },
        end: { x: 10, y: 0, z: 0 },
      }],
    }],
    mergeGroupIds: [firstTopologyLine.groupId, secondTopologyLine.groupId],
    targetGroupId: firstTopologyLine.groupId,
    metadata: { divided: true },
  }), true);
  assert.equal(lineTopologyDoc.model3d.lines.length, 3);
  assert.equal(new Set(lineTopologyDoc.model3d.lines.map((line) => line.groupId)).size, 1);
  assert.equal(lineTopologyDoc.model3d.lines.every((line) =>
    line.metadata.divided === true), true);
  assert.equal(lineTopologyDoc.undo(), true);
  assert.equal(lineTopologyDoc.model3d.lines.length, 2);
  assert.equal(lineTopologyDoc.redo(), true);
  assert.equal(lineTopologyDoc.model3d.lines.length, 3);
  const topologySelection = lineTopologyDoc.model3d.lines.slice(0, 2)
    .map((line) => line.id);
  assert.equal(lineTopologyDoc.remove3dLines(topologySelection), 2);
  assert.equal(lineTopologyDoc.model3d.lines.length, 1);
  assert.equal(lineTopologyDoc.undo(), true);
  assert.equal(lineTopologyDoc.model3d.lines.length, 3);
  assert.deepEqual(emptyDoc.topLevelEntities(), []);

  const planeDoc = new CadDocument();
  assert.equal(planeDoc.set3dSketchPlane('XZ'), true);
  assert.equal(planeDoc.model3d.sketchPlane, 'XZ');
  assert.equal(planeDoc.undo(), true);
  assert.equal(planeDoc.model3d.sketchPlane, 'XY');
  assert.equal(planeDoc.redo(), true);
  assert.equal(planeDoc.model3d.sketchPlane, 'XZ');

  const sketchDoc = new CadDocument();
  sketchDoc.addEntity(new LineEntity({ x: 0, y: 0 }, { x: 4, y: 0 }), { recordHistory: false });
  const sketch = sketchDoc.promoteRootEntitiesTo3dSketch({ plane: 'XY' });
  assert.equal(sketch.id, 'sketch3d-1');
  assert.equal(sketch.name, 'Sketch-1');
  assert.equal(sketch.entities.length, 1);
  assert.equal(sketchDoc.entities.length, 0);
  assert.equal(sketchDoc.beginSketchEdit(sketch.id), true);
  sketchDoc.addEntity(new LineEntity({ x: 4, y: 0 }, { x: 4, y: 3 }));
  assert.equal(sketchDoc.entities.length, 2);
  assert.equal(sketchDoc.undo(), true);
  assert.equal(sketchDoc.entities.length, 1);
  assert.equal(sketchDoc.redo(), true);
  assert.equal(sketchDoc.entities.length, 2);
  assert.equal(sketchDoc.rotate3dSketchAxes(sketch.id), true);
  assert.ok(Math.abs(sketchDoc.entities[0].end.x) < 1e-12);
  assert.equal(sketchDoc.entities[0].end.y, 4);
  assert.equal(sketchDoc.entities[0].end.z, 0);
  assert.equal(sketchDoc.model3d.sketches[0].plane.axisRotation, 90);
  assert.equal(sketchDoc.endSketchEdit(), true);
  sketchDoc.set3dSketchPlane('YZ');
  assert.equal(sketchDoc.model3d.sketches[0].plane.type, 'fixed');
  assert.equal(sketchDoc.model3d.sketches[0].plane.axisRotation, 90);
  assert.equal(sketchDoc.set3dSketchVisibility(sketch.id, false), true);
  assert.equal(sketchDoc.model3d.sketches[0].visible, false);
  assert.equal(sketchDoc.undo(), true);
  assert.equal(sketchDoc.model3d.sketches[0].visible, true);
  assert.doesNotThrow(() => JSON.stringify(sketchDoc.model3d));

  const visualSolid = {
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 2 },
      { x: 1, y: 0, z: 2 },
      { x: 1, y: 1, z: 2 },
      { x: 0, y: 1, z: 2 },
    ],
    faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
    metadata: {
      type: 'push',
      distance: 2,
      sourceEntity: new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
      sourceEntityId: 'profile-1',
      sourceKey: 'POLYLINE:profile-1',
      exactGeometry: {
        status: 'available',
        representation: 'exact-extrusion-v1',
      },
    },
  };
  const solidRecord = emptyDoc.add3dSolid(visualSolid, {
    operation: { type: 'pushFromProfile', distance: 2, sourceKey: 'POLYLINE:profile-1' },
  });
  assert.equal(emptyDoc.model3d.version, 1);
  assert.equal(emptyDoc.model3d.solids.length, 1);
  assert.equal(solidRecord.id, 'solid3d-1');
  assert.equal(solidRecord.visible, true);
  assert.equal(solidRecord.exactGeometry.status, 'available');
  assert.equal('sourceEntity' in solidRecord.metadata, false);
  assert.equal('sourceEntity' in solidRecord.solid.metadata, false);
  assert.equal(JSON.parse(JSON.stringify(emptyDoc.model3d)).solids[0].id, 'solid3d-1');

  const placementDoc = new CadDocument();
  const placedFirst = placementDoc.add3dSolid(visualSolid, { recordHistory: false });
  const placedSecond = placementDoc.add3dSolid(visualSolid, { recordHistory: false });
  const stationary = placementDoc.add3dSolid(visualSolid, { recordHistory: false });
  const originalGeometry = structuredClone(placedFirst.solid);
  assert.deepEqual(placedFirst.placement, normalizeSolidPlacement());
  assert.equal(moveSolids({
    doc: placementDoc,
    solidIds: [placedFirst.id, placedSecond.id],
    from: { x: 1, y: 1, z: 1 },
    to: { x: 7, y: -2, z: 5 },
  }), true);
  assert.deepEqual(placedFirst.placement.position, { x: 6, y: -3, z: 4 });
  assert.deepEqual(placedSecond.placement.position, { x: 6, y: -3, z: 4 });
  assert.deepEqual(stationary.placement.position, { x: 0, y: 0, z: 0 });
  assert.deepEqual(placedFirst.solid, originalGeometry);
  assert.equal(placementDoc.undoStack.length, 1);
  assert.equal(placementDoc.undo(), true);
  assert.deepEqual(placementDoc.model3d.solids[0].placement.position, { x: 0, y: 0, z: 0 });
  assert.equal(placementDoc.redo(), true);
  assert.deepEqual(placementDoc.model3d.solids[0].placement.position, { x: 6, y: -3, z: 4 });
  assert.equal(rotateSolids({
    doc: placementDoc,
    solidIds: [placedFirst.id, placedSecond.id],
    axisStart: { x: 0, y: 0, z: 0 },
    axisEnd: { x: 0, y: 0, z: 1 },
    angleDegrees: 90,
  }), true);
  assert.ok(Math.abs(placementDoc.model3d.solids[0].placement.position.x - 3) < 1e-9);
  assert.ok(Math.abs(placementDoc.model3d.solids[0].placement.position.y - 6) < 1e-9);
  assert.equal(placementDoc.undo(), true);
  assert.deepEqual(placementDoc.model3d.solids[0].placement.position, { x: 6, y: -3, z: 4 });
  assert.equal(placementDoc.redo(), true);
  const repeatedLocalPoint = solidLocalToWorld(
    { x: 1, y: 2, z: 3 },
    placementDoc.model3d.solids[0],
  );
  assert.ok(Object.values(repeatedLocalPoint).every(Number.isFinite));
  assert.deepEqual(placementDoc.model3d.solids[0].solid, originalGeometry);
  placementDoc.model3d.solids[1].locked = true;
  assert.equal(moveSolids({
    doc: placementDoc,
    solidIds: [placedSecond.id],
    from: { x: 0, y: 0, z: 0 },
    to: { x: 5, y: 0, z: 0 },
  }), false);
  assert.deepEqual(resolvePoint3dFromInput('2,3,4'), { x: 2, y: 3, z: 4 });
  assert.deepEqual(resolvePoint3dFromInput('2,3,4', {
    anchor: { x: 10, y: 20, z: 30 },
  }), { x: 12, y: 23, z: 34 });
  assert.deepEqual(resolvePoint3dFromInput('5', {
    anchor: { x: 1, y: 2, z: 3 },
    axis: 'z',
  }), { x: 1, y: 2, z: 8 });
  assert.deepEqual(pointFromReference(
    { x: 10, y: 20, z: 30 },
    { x: -2, y: 3, z: 4 },
  ), { x: 8, y: 23, z: 34 });
  const directedDistancePoint = resolvePoint3dFromInput('10', {
    anchor: { x: 1, y: 2, z: 3 },
    direction: { x: 3, y: 4, z: 0 },
  });
  assert.ok(Math.abs(directedDistancePoint.x - 7) < 1e-12);
  assert.ok(Math.abs(directedDistancePoint.y - 10) < 1e-12);
  assert.equal(directedDistancePoint.z, 3);
  assert.equal(isSolidTransformConfirmEvent({ key: 'Enter' }), true);
  assert.equal(isSolidTransformConfirmEvent({ key: ' ' }), true);
  assert.equal(isSolidTransformConfirmEvent({ button: 2 }), true);
  assert.equal(isSolidTransformConfirmEvent({ button: 0 }), false);
  assert.deepEqual(pointOnAxisFromSnap(
    { x: 1, y: 2, z: 3 },
    { x: 8, y: 11, z: -4 },
    'x',
  ), { x: 8, y: 2, z: 3 });
  assert.deepEqual(pointOnAxisFromSnap(
    { x: 1, y: 2, z: 3 },
    { x: 8, y: 11, z: -4 },
    'z',
  ), { x: 1, y: 2, z: -4 });
  assert.equal(
    solidTransformDisplacementStatus({ x: 3, y: 4, z: 12 }),
    'Precise punto de destino · Distancia 13 · ΔX 3 · ΔY 4 · ΔZ 12',
  );
  const projectedAxes = {
    x: { x: 100, y: 0 },
    y: { x: 0, y: 100 },
    z: { x: 70, y: -70 },
  };
  assert.equal(inferProjectedAxis({
    anchor: { x: 0, y: 0 },
    axes: projectedAxes,
    pointer: { x: 100, y: 5 },
  }), 'x');
  assert.equal(inferProjectedAxis({
    anchor: { x: 0, y: 0 },
    axes: projectedAxes,
    pointer: { x: 4, y: 100 },
  }), 'y');
  assert.equal(inferProjectedAxis({
    anchor: { x: 0, y: 0 },
    axes: projectedAxes,
    pointer: { x: 72, y: -68 },
  }), 'z');
  assert.equal(inferProjectedAxis({
    anchor: { x: 0, y: 0 },
    axes: projectedAxes,
    pointer: { x: 100, y: 40 },
  }), null);
  assert.equal(solidTransformFromAlias('C'), 'copy');
  assert.equal(solidTransformFromAlias('d'), 'move');
  assert.equal(solidTransformFromAlias('G'), 'rotate');
  assert.equal(solidTransformFromAlias('m'), null);

  const copyDoc = new CadDocument();
  const copySource = copyDoc.add3dSolid(visualSolid, {
    name: 'Original',
    placement: {
      position: { x: 2, y: 3, z: 4 },
      quaternion: { x: 0, y: 0, z: 0, w: 1 },
    },
    recordHistory: false,
  });
  const copies = copySolids({
    doc: copyDoc,
    solidIds: [copySource.id],
    from: { x: 1, y: 1, z: 1 },
    to: { x: 6, y: -1, z: 8 },
  });
  assert.equal(copies.length, 1);
  assert.equal(copyDoc.model3d.solids.length, 2);
  assert.deepEqual(copySource.placement.position, { x: 2, y: 3, z: 4 });
  assert.deepEqual(copies[0].placement.position, { x: 7, y: 1, z: 11 });
  assert.deepEqual(copies[0].solid, copySource.solid);
  assert.notEqual(copies[0].solid, copySource.solid);
  assert.equal(copies[0].operation.type, 'copySolid');
  assert.equal(copyDoc.undoStack.length, 1);
  assert.equal(copyDoc.undo(), true);
  assert.equal(copyDoc.model3d.solids.length, 1);
  assert.equal(copyDoc.redo(), true);
  assert.equal(copyDoc.model3d.solids.length, 2);

  const movedSolid = {
    ...visualSolid,
    vertices: visualSolid.vertices.map((vertex, index) => (index >= 4
      ? { ...vertex, z: vertex.z + 1 }
      : { ...vertex })),
    metadata: {
      ...visualSolid.metadata,
      exactGeometry: {
        status: 'pending',
        reason: 'face-push-exact-brep-not-implemented',
      },
      lastPushDistance: 1,
      lastPushFaceIndex: 1,
    },
  };
  const movedRecord = emptyDoc.replace3dSolid(solidRecord.id, movedSolid, {
    operation: { type: 'pushMoveFace', distance: 1, sourceSolidFaceIndex: 1 },
  });
  assert.equal(movedRecord.id, solidRecord.id);
  assert.equal(emptyDoc.model3d.solids.length, 1);
  assert.equal(movedRecord.revision, 2);
  assert.equal(movedRecord.operations.length, 2);
  assert.equal(movedRecord.exactGeometry.status, 'pending');
  assert.equal(emptyDoc.undo(), true);
  assert.equal(emptyDoc.model3d.solids.length, 1);
  assert.equal(emptyDoc.model3d.solids[0].exactGeometry.status, 'available');
  assert.equal(emptyDoc.undo(), true);
  assert.equal(emptyDoc.model3d.solids.length, 0);
  assert.equal(emptyDoc.redo(), true);
  assert.equal(emptyDoc.model3d.solids.length, 1);
  assert.equal(emptyDoc.redo(), true);
  assert.equal(emptyDoc.model3d.solids[0].exactGeometry.status, 'pending');

  const deleteDoc = new CadDocument();
  const firstSolid = deleteDoc.add3dSolid(visualSolid, {
    operation: { type: 'pushFromProfile', distance: 2 },
  });
  const secondSolid = deleteDoc.add3dSolid({
    ...visualSolid,
    vertices: visualSolid.vertices.map((vertex) => ({ ...vertex, x: vertex.x + 4 })),
  }, {
    operation: { type: 'pushFromProfile', distance: 2 },
  });
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [firstSolid.id, secondSolid.id]);
  assert.equal(deleteDoc.remove3dSolid(firstSolid.id), true);
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [secondSolid.id]);
  assert.equal(deleteDoc.undo(), true);
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [firstSolid.id, secondSolid.id]);
  assert.equal(deleteDoc.redo(), true);
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [secondSolid.id]);
  assert.equal(deleteDoc.undo(), true);
  assert.equal(deleteDoc.remove3dSolid(secondSolid.id), true);
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [firstSolid.id]);
  assert.equal(deleteDoc.undo(), true);
  assert.equal(deleteDoc.remove3dSolid(firstSolid.id), true);
  assert.equal(deleteDoc.remove3dSolid(secondSolid.id, { recordHistory: false }), true);
  assert.equal(deleteDoc.model3d.solids.length, 0);
  assert.equal(deleteDoc.undo(), true);
  assert.deepEqual(deleteDoc.model3d.solids.map((record) => record.id), [firstSolid.id, secondSolid.id]);
  assert.equal(deleteDoc.model3d.nextSolidId, 3);
}

function createTestCadDocument() {
  const entityOptions = (entity) => ({
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  });
  const cloneEntity = (entity) => {
    if (entity.type === 'POLYLINE') {
      return new PolylineEntity(
        entity.vertices.map((vertex) => ({ ...vertex })),
        entity.segments.map((segment) => ({
          ...segment,
          center: segment.center ? { ...segment.center } : segment.center,
        })),
        { ...entityOptions(entity), closed: entity.closed },
      );
    }
    if (entity.type === 'ARC') {
      return new ArcEntity(entity.center, entity.radius, entity.startAngle, entity.endAngle, {
        ...entityOptions(entity),
        clockwise: entity.clockwise,
      });
    }
    if (entity.type === 'CIRCLE') {
      return new CircleEntity(entity.center, entity.radius, entityOptions(entity));
    }
    if (entity.type === 'ELLIPSE' || entity.type === 'ELLIPSE_ARC') {
      return new EllipseEntity(entity.center, entity.radiusX, entity.radiusY, entity.rotation, {
        ...entityOptions(entity),
        ...(entity.type === 'ELLIPSE_ARC' ? {
          startParameter: entity.startParameter,
          endParameter: entity.endParameter,
          clockwise: entity.clockwise,
        } : {}),
      });
    }
    return new LineEntity(entity.start, entity.end, entityOptions(entity));
  };
  const CadDocument = createCadDocumentClass({
    HISTORY_LIMIT: 20,
    SPATIAL_CELL_SIZE: 100,
    SPATIAL_MAX_ENTITY_CELLS: 64,
    SPATIAL_MAX_QUERY_CELLS: 4096,
    boundsIntersectsBounds,
    cloneEntity,
    mergeBounds,
  });
  return new CadDocument();
}

function testRectangularPrismSolid(offsetX = 0) {
  return {
    vertices: [
      { x: offsetX + 0, y: 0, z: 0 },
      { x: offsetX + 1, y: 0, z: 0 },
      { x: offsetX + 1, y: 1, z: 0 },
      { x: offsetX + 0, y: 1, z: 0 },
      { x: offsetX + 0, y: 0, z: 2 },
      { x: offsetX + 1, y: 0, z: 2 },
      { x: offsetX + 1, y: 1, z: 2 },
      { x: offsetX + 0, y: 1, z: 2 },
    ],
    faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
    metadata: { type: 'push', distance: 2 },
  };
}

function testStlExport() {
  const prism = testRectangularPrismSolid();
  const prismTriangles = trianglesFromSolid(prism);
  assert.equal(prismTriangles.length, 12);
  assert.equal(prismTriangles.every((triangle) =>
    Number.isFinite(triangle.normal.x) &&
    Number.isFinite(triangle.normal.y) &&
    Number.isFinite(triangle.normal.z)), true);

  const model3d = {
    version: 1,
    nextSolidId: 4,
    solids: [
      { id: 'solid3d-1', visible: true, solid: prism },
      { id: 'solid3d-2', visible: false, solid: testRectangularPrismSolid(2) },
      {
        id: 'solid3d-3',
        visible: true,
        placement: {
          position: { x: 10, y: 20, z: 30 },
          quaternion: { x: 0, y: 0, z: 0, w: 1 },
        },
        solid: testRectangularPrismSolid(4),
      },
    ],
  };
  const stl = exportModel3dToAsciiStl(model3d, { name: 'webcad-test' });
  assert.equal(stl.solidCount, 2);
  assert.equal(stl.triangleCount, 24);
  assert.match(stl.text, /^solid webcad-test\n/);
  assert.match(stl.text, /endsolid webcad-test\n$/);
  assert.equal((stl.text.match(/facet normal/g) || []).length, 24);
  assert.equal(stl.text.includes('vertex 14.0000000000 20.0000000000 30.0000000000'), true);
  assert.equal(stl.text.includes('vertex 4.00000000000 0.00000000000 0.00000000000'), false);
  assert.equal(stl.text.includes('vertex 2.00000000000 0.00000000000 0.00000000000'), false);
  assert.throws(() => exportModel3dToAsciiStl({ version: 1, solids: [] }), /No hay solidos 3D visibles/);
}

function joinForTest(entities) {
  return joinPolylineEntities(entities, {
    PolylineEntity,
    tolerance: JOIN_TOLERANCE,
  });
}

function assertJoinOk(entities) {
  const result = joinForTest(entities);
  assert.equal(result.ok, true, result.message);
  return result.polyline;
}

function closedLoopsForTest(entities) {
  return joinClosedPolylineLoops(entities, {
    PolylineEntity,
    tolerance: JOIN_TOLERANCE,
  });
}

function squareLines(x = 0, y = 0, size = 1) {
  return [
    new LineEntity({ x, y }, { x: x + size, y }),
    new LineEntity({ x: x + size, y }, { x: x + size, y: y + size }),
    new LineEntity({ x: x + size, y: y + size }, { x, y: y + size }),
    new LineEntity({ x, y: y + size }, { x, y }),
  ];
}

function normalizedVertexPath(polyline) {
  const path = polyline.vertices.map(({ x, y }) => ({ x, y }));
  if (path.length > 1 && path[0].x > path[path.length - 1].x) {
    return path.reverse();
  }
  return path;
}

function testPolylineJoinOperation() {
  const twoLines = assertJoinOk([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 }),
  ]);
  assert.equal(twoLines.type, 'POLYLINE');
  assert.deepEqual(normalizedVertexPath(twoLines), [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
  ]);
  assert.equal(twoLines.closed, false);

  const unordered = assertJoinOk([
    new LineEntity({ x: 2, y: 0 }, { x: 3, y: 0 }),
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 }),
  ]);
  assert.deepEqual(normalizedVertexPath(unordered), [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
  ]);

  const reversed = assertJoinOk([
    new LineEntity({ x: 1, y: 0 }, { x: 0, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 }),
  ]);
  assert.deepEqual(normalizedVertexPath(reversed), [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
  ]);

  const arcPolyline = new PolylineEntity(
    [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
    [
      { type: 'LINE' },
      { type: 'ARC', center: { x: 1.5, y: 0.5 }, clockwise: false },
    ],
  );
  const mixed = assertJoinOk([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    arcPolyline,
  ]);
  assert.deepEqual(mixed.segments.map((segment) => segment.type), ['LINE', 'LINE', 'ARC']);
  assert.deepEqual(arcPolyline.vertices.map(({ x, y }) => ({ x, y })), [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 },
  ]);

  const lineAndArc = assertJoinOk([
    new ArcEntity({ x: 1, y: 1 }, 1, -Math.PI / 2, 0),
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
  ]);
  assert.equal(lineAndArc.segments.some((segment) => segment.type === 'ARC'), true);

  const closed = assertJoinOk([
    new LineEntity({ x: 1, y: 0 }, { x: 1, y: 1 }),
    new LineEntity({ x: 0, y: 1 }, { x: 0, y: 0 }),
    new LineEntity({ x: 1, y: 1 }, { x: 0, y: 1 }),
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
  ]);
  assert.equal(closed.closed, true);
  assert.equal(closed.vertices.length, 4);
  assert.equal(closed.segments.length, 4);
  assert.notDeepEqual(closed.vertices[0], closed.vertices[closed.vertices.length - 1]);

  const cleanClosed = assertJoinOk([
    new LineEntity({ x: 1, y: 0 }, { x: 1, y: 1 }),
    new LineEntity({ x: 0, y: 1 }, { x: 0, y: 0 }),
    new LineEntity({ x: 1, y: 1 }, { x: 0, y: 1 }),
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 0, y: 0 }, { x: JOIN_TOLERANCE / 2, y: 0 }),
  ]);
  assert.equal(cleanClosed.closed, true);
  assert.equal(cleanClosed.vertices.length, 4);

  assert.match(joinForTest([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 1, y: 1 }),
  ]).message, /ramas/);
  assert.match(joinForTest([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 3, y: 0 }, { x: 4, y: 0 }),
  ]).message, /desconectados|unica cadena/);
  assert.match(joinForTest([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new CircleEntity({ x: 1, y: 0 }, 1),
  ]).message, /tipos no compatibles/);
}

function testPolylineJoinClosedLoopDetection() {
  const openLines = [
    new LineEntity({ x: 20, y: 0 }, { x: 21, y: 0 }),
    new LineEntity({ x: 22, y: 0 }, { x: 23, y: 0 }),
  ];
  const twoSquares = closedLoopsForTest([
    ...squareLines(0, 0, 2),
    ...openLines,
    ...squareLines(5, 0, 2).reverse(),
  ]);
  assert.equal(twoSquares.ok, true);
  assert.equal(twoSquares.polylines.length, 2);
  assert.equal(twoSquares.usedEntities.length, 8);
  assert.equal(twoSquares.ignoredCount, 2);
  assert.equal(twoSquares.polylines.every((polyline) => polyline.closed), true);
  assert.equal(twoSquares.polylines.every((polyline) =>
    polyline.vertices[0] !== polyline.vertices[polyline.vertices.length - 1]), true);

  const arcLoop = closedLoopsForTest([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new PolylineEntity(
      [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
      [
        { type: 'ARC', center: { x: 1, y: 0.5 }, clockwise: false },
        { type: 'LINE' },
        { type: 'LINE' },
      ],
    ),
  ]);
  assert.equal(arcLoop.ok, true);
  assert.equal(arcLoop.polylines.length, 1);
  assert.equal(arcLoop.polylines[0].segments.some((segment) => segment.type === 'ARC'), true);

  const threeSquares = closedLoopsForTest([
    ...squareLines(0, 0),
    ...squareLines(3, 0),
    ...squareLines(6, 0),
  ]);
  assert.equal(threeSquares.ok, true);
  assert.equal(threeSquares.polylines.length, 3);

  const branched = closedLoopsForTest([
    ...squareLines(0, 0),
    new LineEntity({ x: 1, y: 1 }, { x: 2, y: 2 }),
  ]);
  assert.equal(branched.ok, false);
  assert.equal(branched.usedEntities.length, 0);

  const openChain = closedLoopsForTest([
    new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }),
    new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 }),
  ]);
  assert.equal(openChain.ok, false);

  const ambiguous = closedLoopsForTest([
    ...squareLines(0, 0),
    new LineEntity({ x: 1, y: 1 }, { x: 2, y: 1 }),
    new LineEntity({ x: 2, y: 1 }, { x: 2, y: 2 }),
    new LineEntity({ x: 2, y: 2 }, { x: 1, y: 2 }),
    new LineEntity({ x: 1, y: 2 }, { x: 1, y: 1 }),
  ]);
  assert.equal(ambiguous.ok, false);
  assert.equal(ambiguous.usedEntities.length, 0);
}

function testPolylineJoinUndoRedo() {
  const doc = createTestCadDocument();
  const first = new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 });
  const second = new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 });
  doc.addEntity(first, { recordHistory: false });
  doc.addEntity(second, { recordHistory: false });
  const polyline = assertJoinOk([first, second]);
  assert.equal(doc.replaceEntities([first, second], [polyline]), true);
  assert.deepEqual(doc.entities.map((entity) => entity.type), ['POLYLINE']);
  assert.equal(doc.undo(), true);
  assert.deepEqual(doc.entities.map((entity) => entity.type), ['LINE', 'LINE']);
  assert.equal(doc.redo(), true);
  assert.deepEqual(doc.entities.map((entity) => entity.type), ['POLYLINE']);
}

function testPolylineJoinCommandFiltersSelection() {
  const methods = createControllerTransformMethods({
    SNAP_THRESHOLD: JOIN_TOLERANCE,
    cloneEntitiesWithOffset: () => [],
    distance,
    entityCanExplode: () => false,
    extendCommand: {},
    formatNumber: (value) => String(value),
    isPolylineJoinCompatibleEntity,
    joinClosedPolylineLoops,
    joinPolylineEntities,
    mirrorEntityAcrossAxis,
    moveEntityByVector,
    PolylineEntity,
    polylineSegmentEntities: () => [],
    rotateEntityByAngle,
    transformedBlockContents: () => [],
  });
  const doc = createTestCadDocument();
  const first = new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 });
  const second = new ArcEntity({ x: 1, y: 1 }, 1, -Math.PI / 2, 0);
  const ignored = new CircleEntity({ x: 10, y: 10 }, 2);
  doc.addEntity(first, { recordHistory: false });
  doc.addEntity(second, { recordHistory: false });
  doc.addEntity(ignored, { recordHistory: false });
  doc.addSelectedEntities([first, second, ignored]);
  const state = {
    polylineJoinDraft: { selecting: true },
    statusText: '',
    tool: 'polyline-join',
  };
  const controller = {
    ...methods,
    doc,
    renderer: { draw() {} },
    state,
    rememberSelectionSet() {},
    setTool(tool) { state.tool = tool; state.polylineJoinDraft = null; },
    updateUiStatus() {},
  };

  assert.equal(methods.confirmPolylineJoinSelection.call(controller), true);
  assert.deepEqual(doc.entities.map((entity) => entity.type), ['POLYLINE', 'CIRCLE']);
  assert.equal(doc.entities[0].segments.some((segment) => segment.type === 'ARC'), true);
}

function testPolylineJoinCommandCreatesMultipleClosedLoopsUndoRedo() {
  const methods = createControllerTransformMethods({
    SNAP_THRESHOLD: JOIN_TOLERANCE,
    cloneEntitiesWithOffset: () => [],
    distance,
    entityCanExplode: () => false,
    extendCommand: {},
    formatNumber: (value) => String(value),
    isPolylineJoinCompatibleEntity,
    joinClosedPolylineLoops,
    joinPolylineEntities,
    mirrorEntityAcrossAxis,
    moveEntityByVector,
    PolylineEntity,
    polylineSegmentEntities: () => [],
    rotateEntityByAngle,
    transformedBlockContents: () => [],
  });
  const doc = createTestCadDocument();
  const entities = [
    ...squareLines(0, 0),
    new LineEntity({ x: 10, y: 0 }, { x: 11, y: 0 }),
    ...squareLines(3, 0),
    new LineEntity({ x: 12, y: 0 }, { x: 13, y: 0 }),
  ];
  entities.forEach((entity) => doc.addEntity(entity, { recordHistory: false }));
  doc.addSelectedEntities(entities);
  const state = {
    polylineJoinDraft: { selecting: true },
    statusText: '',
    tool: 'polyline-join',
  };
  const controller = {
    ...methods,
    doc,
    renderer: { draw() {} },
    state,
    rememberSelectionSet() {},
    setTool(tool) { state.tool = tool; state.polylineJoinDraft = null; },
    updateUiStatus() {},
  };

  assert.equal(methods.confirmPolylineJoinSelection.call(controller), true);
  assert.equal(doc.entities.filter((entity) => entity.type === 'POLYLINE' && entity.closed).length, 2);
  assert.equal(doc.entities.filter((entity) => entity.type === 'LINE').length, 2);
  assert.match(state.statusText, /Se cerraron 2 recintos; 2 entidades fueron ignoradas/);
  assert.equal(doc.undo(), true);
  assert.equal(doc.entities.length, 10);
  assert.equal(doc.entities.every((entity) => entity.type === 'LINE'), true);
  assert.equal(doc.redo(), true);
  assert.equal(doc.entities.filter((entity) => entity.type === 'POLYLINE' && entity.closed).length, 2);
  assert.equal(doc.entities.filter((entity) => entity.type === 'LINE').length, 2);
}

function testRegularPolygonCommand() {
  const vertices = regularPolygonVertices({ x: 0, y: 0 }, { x: 10, y: 0 }, 4);
  assert.equal(vertices.length, 4);
  assert.deepEqual(vertices.map(({ x, y }) => ({ x: Math.round(x), y: Math.round(y) })), [
    { x: 10, y: 0 },
    { x: 0, y: 10 },
    { x: -10, y: 0 },
    { x: -0, y: -10 },
  ]);

  const doc = createTestCadDocument();
  const state = { regularPolygonDraft: null, statusText: '', regularPolygonSides: 5 };
  const command = createRegularPolygonCommand({
    state,
    doc,
    PolylineEntity,
    activeLayerName: () => 'Continua',
    activeLineColorId: () => 'bylayer',
    activeLineStyleId: () => 'bylayer',
    activeLineTypeId: () => 'bylayer',
    getLineStyle: (id) => ({ id, label: 'Medio' }),
    resolvePoint: (point) => point,
    setTool: (tool) => { state.tool = tool; },
    refresh() {},
    sidesValue: () => state.regularPolygonSides,
    snapThreshold: JOIN_TOLERANCE,
    formatNumber: (value) => String(value),
    unitsLabel: () => 'mm',
  });
  assert.equal(command.start(), true);
  assert.equal(state.tool, 'regular-polygon');
  assert.equal(command.handlePoint({ x: 0, y: 0 }), true);
  assert.equal(command.previewAt({ x: 0, y: 2 }).length, 5);
  assert.equal(command.handlePoint({ x: 0, y: 2 }), true);
  assert.equal(doc.entities.length, 1);
  assert.equal(doc.entities[0].type, 'POLYLINE');
  assert.equal(doc.entities[0].closed, true);
  assert.equal(doc.entities[0].vertices.length, 5);
  assert.ok(Math.abs(doc.entities[0].vertices[0].x) < 1e-9);
  assert.equal(doc.entities[0].vertices[0].y, 2);
  assert.equal(state.tool, 'select');
}

function testMirrorSecondPointConfirmation() {
  const methods = createControllerTransformMethods({
    SNAP_THRESHOLD: 1e-6,
    cloneEntitiesWithOffset: (entities, vector) => entities.map((entity) =>
      new LineEntity(
        { x: entity.start.x + vector.x, y: entity.start.y + vector.y, z: entity.start.z },
        { x: entity.end.x + vector.x, y: entity.end.y + vector.y, z: entity.end.z },
        {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
        },
      )),
    distance,
    entityCanExplode: () => false,
    extendCommand: {},
    formatNumber: (value) => String(value),
    joinClosedPolylineLoops,
    joinPolylineEntities,
    mirrorEntityAcrossAxis,
    moveEntityByVector,
    PolylineEntity,
    polylineSegmentEntities: () => [],
    rotateEntityByAngle,
    transformedBlockContents: () => [],
  });
  const doc = createTestCadDocument();
  const source = new LineEntity({ x: 1, y: 0 }, { x: 2, y: 0 });
  doc.addEntity(source, { recordHistory: false });
  doc.addSelectedEntities([source]);
  let drawCount = 0;
  let statusCount = 0;
  const state = {
    mirrorDraft: { sourceEntities: [], firstPoint: null, selecting: true },
    statusText: '',
    tool: 'mirror',
  };
  const controller = {
    ...methods,
    doc,
    renderer: { draw: () => { drawCount += 1; } },
    state,
    rememberSelectionSet() {},
    setTool(tool) { state.tool = tool; },
    updateCanvasCursorMode() {},
    updateUiStatus() { statusCount += 1; },
  };

  assert.equal(methods.confirmMirrorSelection.call(controller), true);
  assert.equal(state.mirrorDraft.selecting, false);
  assert.equal(statusCount > 0, true);
  assert.equal(drawCount > 0, true);
  state.mirrorDraft.firstPoint = { x: 0, y: 0 };

  assert.equal(methods.mirrorSelectionAcross.call(controller, { x: 0, y: 1 }), true);
  assert.equal(state.tool, 'select');
  assert.equal(state.mirrorDraft, null);
  assert.equal(doc.entities.length, 2);
  assert.deepEqual(
    { start: doc.entities[1].start, end: doc.entities[1].end },
    {
      start: { x: -1, y: 0, z: 0 },
      end: { x: -2, y: 0, z: 0 },
    },
  );
}

function testWebcadProjectFormat() {
  const state = {
    activeLayer: 'Continua',
    activeLineColor: 'bylayer',
    activeLineStyle: 'bylayer',
    activeLineType: 'bylayer',
    chamferDistances: { engineering: { first: 10, second: 10 } },
    dimensionPrecision: { engineering: { linear: 2, angular: 2 } },
    dimensionStyle: 'normal',
    drawingProfile: 'engineering',
    filletRadii: { engineering: 10 },
    hasInitializedView: true,
    lastDimensionOffsets: { engineering: null },
    lastTextHeight: 2.5,
    layers: [{ name: 'Continua', lineStyle: 'normal', lineType: 'continuous', lineColor: 'aci7' }],
    lineWeightDisplayEnabled: true,
    navigationDevice: 'trackpad',
    offsetDistances: { engineering: 10 },
    orthoEnabled: false,
    polarArrayCount: 6,
    snapEnabled: true,
    viewOffset: { x: 4, y: 5 },
    viewScale: 2,
  };
  const doc2d = createTestCadDocument();
  doc2d.addEntity(new LineEntity({ x: 0, y: 0 }, { x: 2, y: 0 }), { recordHistory: false });
  const project2dText = serializeWebcadProject({
    appVersion: 'test-version',
    counters: { nextEntityGroupId: 7 },
    doc: doc2d,
    state,
  });
  const project2d = parseWebcadProject(project2dText);
  assert.equal(project2d.format, 'webcad-project');
  assert.equal(project2d.version, 1);
  assert.equal(project2d.appVersion, 'test-version');
  assert.equal(project2d.document2d.snapshot.entities.length, 1);
  assert.equal(project2d.document2d.settings.layers.length, 1);
  assert.equal(project2d.document2d.counters.nextEntityGroupId, 7);
  assert.equal(project2d.model3d.version, 1);
  assert.equal(project2d.model3d.sketchPlane, 'XY');
  assert.equal(project2d.model3d.sketches.length, 0);
  assert.equal(project2d.model3d.solids.length, 0);

  const reopened2d = createTestCadDocument();
  reopened2d.restoreSnapshot({
    ...project2d.document2d.snapshot,
    model3d: project2d.model3d,
  });
  reopened2d.undoStack = [];
  reopened2d.redoStack = [];
  reopened2d.addEntity(new LineEntity({ x: 0, y: 1 }, { x: 2, y: 1 }));
  assert.equal(reopened2d.entities.length, 2);
  assert.equal(reopened2d.undo(), true);
  assert.equal(reopened2d.entities.length, 1);

  const doc3d = createTestCadDocument();
  doc3d.set3dSketchPlane('YZ', { recordHistory: false });
  const projectSketch = doc3d.add3dSketch({
    plane: 'XZ',
    entities: [new LineEntity({ x: 0, y: 0 }, { x: 8, y: 0 })],
    metadata: {
      supportFace: {
        sourceSolidId: 'solid3d-1',
        sourceFaceIndices: [1],
        outerLoop: [
          { x: 5, y: 0, z: 0 },
          { x: 0, y: 5, z: 0 },
          { x: -5, y: 0, z: 0 },
          { x: 0, y: -5, z: 0 },
        ],
        innerLoops: [],
        boundaries: [{
          type: 'circle',
          center: { x: 0, y: 0, z: 0 },
          radius: 5,
        }],
      },
    },
  });
  const visualSolid = {
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 3 },
      { x: 1, y: 0, z: 3 },
      { x: 1, y: 1, z: 3 },
      { x: 0, y: 1, z: 3 },
    ],
    faces: [[3, 2, 1, 0], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
    metadata: {
      type: 'push',
      distance: 3,
      sourceKey: 'POLYLINE:profile-webcad',
      exactGeometry: {
        status: 'available',
        representation: 'exact-extrusion-v1',
        extrusion: { type: 'exact-extrusion', version: 1 },
      },
    },
  };
  const record = doc3d.add3dSolid(visualSolid, {
    operation: { type: 'pushFromProfile', distance: 3, sourceKey: 'POLYLINE:profile-webcad' },
    placement: {
      position: { x: 10, y: -20, z: 30 },
      quaternion: { x: 0, y: 0, z: Math.SQRT1_2, w: Math.SQRT1_2 },
    },
  });
  const project3d = parseWebcadProject(serializeWebcadProject({ appVersion: 'test-version', doc: doc3d, state }));
  assert.equal(project3d.model3d.solids.length, 1);
  assert.equal(project3d.model3d.sketchPlane, 'YZ');
  assert.equal(project3d.model3d.sketches.length, 1);
  assert.equal(project3d.model3d.sketches[0].id, projectSketch.id);
  assert.equal(project3d.model3d.sketches[0].plane.id, 'XZ');
  assert.equal(project3d.model3d.sketches[0].entities[0].type, 'LINE');
  assert.equal(
    project3d.model3d.sketches[0].metadata.supportFace.boundaries[0].type,
    'circle',
  );
  assert.equal(
    project3d.model3d.sketches[0].metadata.supportFace.boundaries[0].radius,
    5,
  );
  assert.equal(project3d.model3d.solids[0].id, record.id);
  assert.equal(project3d.model3d.solids[0].visible, true);
  assert.equal(project3d.model3d.solids[0].exactGeometry.status, 'available');
  assert.equal(project3d.model3d.solids[0].operations[0].type, 'pushFromProfile');
  assert.deepEqual(project3d.model3d.solids[0].placement, record.placement);
  assert.equal(project3d.model3d.nextSolidId, 2);
  JSON.stringify(project3d);

  const reopened3d = createTestCadDocument();
  reopened3d.restoreSnapshot({
    ...project3d.document2d.snapshot,
    model3d: project3d.model3d,
  });
  assert.equal(reopened3d.model3d.solids[0].id, record.id);
  assert.equal(reopened3d.model3d.sketchPlane, 'YZ');
  assert.equal(reopened3d.model3d.sketches[0].entities[0] instanceof LineEntity, true);
  assert.equal(
    reopened3d.model3d.sketches[0].metadata.supportFace.boundaries[0].type,
    'circle',
  );
  assert.equal(reopened3d.model3d.nextSolidId, 2);

  assert.throws(() => parseWebcadProject('{"format":"other","version":1,"document2d":{"entities":[]}}'), /formato incorrecto/);
  assert.throws(() => parseWebcadProject('{"format":"webcad-project","version":99,"document2d":{"entities":[]}}'), /no soportada/);
}

function dxfServices() {
  const noClass = class {};
  return {
    ArcEntity,
    BlockReferenceEntity: noClass,
    CircleEntity,
    EllipseEntity,
    DIMENSION_STYLES: {},
    DRAWING_PROFILES: { architecture: { dxfInsUnits: 6 }, engineering: { dxfInsUnits: 4 } },
    DimensionEntity: noClass,
    HatchEntity,
    LineEntity,
    PolylineEntity,
    RasterImageEntity,
    SNAP_THRESHOLD: 1e-9,
    TextEntity,
    XLineEntity,
    arcCenterFromBulge: () => null,
    createBounds,
    distance,
    dxfEntityOptions: () => ({}),
    lineColorFromDxf: () => 'bylayer',
    lineStyleFromDxf: () => 'bylayer',
    lineTypeFromDxf: () => 'bylayer',
    moveEntityByVector,
    normalizeAngle,
    primitiveEntityParts: (entity) => [entity],
  };
}

function testDxfRoundTrip() {
  const exporter = createDxfExporter({
    DIMENSION_STYLES: {},
    activeDrawingProfile: () => ({ dxfLineTypeScale: 1, dxfInsUnits: 4 }),
    dimensionGeometry: () => ({}),
    dimensionStyleMetrics: () => ({}),
    entityArcSweep: () => 1,
    getLineColor: () => ({ aci: 7 }),
    getLineStyle: () => ({ dxfLineWeight: 25 }),
    getLineType: () => ({ dxfName: 'CONTINUOUS' }),
    getState: () => ({
      layers: [], drawingProfile: 'engineering',
      dimensionPrecision: { engineering: { linear: 2, angular: 2 } },
    }),
    normalizeAngle,
    polylineSegmentEntity: () => null,
  });
  const source = new LineEntity({ x: 0, y: 0, z: 7 }, { x: 10, y: 0, z: 9 });
  const ellipse = new EllipseEntity({ x: 4, y: 5, z: 2 }, 8, 3, Math.PI / 6);
  const ellipseArc = new EllipseEntity({ x: -4, y: 2 }, 6, 2, Math.PI / 4, {
    startParameter: 0.2,
    endParameter: 2.4,
  });
  const dxf = exporter.serializeDocumentToDxf({
    entities: [source, ellipse, ellipseArc],
    blockDefinitions: new Map(),
    topLevelEntities() { return this.entities; },
  });
  assert.match(dxf, /30\n7\n11\n10\n21\n0\n31\n9/);
  const parsed = createDxfImporter(dxfServices()).parseDxf(dxf);
  assert.deepEqual([parsed[0].start.z, parsed[0].end.z], [7, 9]);
  assert.equal(parsed[1].type, 'ELLIPSE');
  assert.ok(Math.abs(parsed[1].radiusX - 8) < 1e-9);
  assert.ok(Math.abs(parsed[1].radiusY - 3) < 1e-9);
  assert.equal(parsed[2].type, 'ELLIPSE_ARC');
}

function testCommandDispatcher() {
  const calls = [];
  const controller = new Proxy({}, {
    get: (_target, name) => (...args) => calls.push([name, ...args]),
  });
  const noOpCommand = { start: () => calls.push(['start']) };
  const actions = new Proxy({}, {
    get: (_target, name) => (...args) => calls.push([name, ...args]),
  });
  const dispatcher = createCommandDispatcher({
    state: { lastCommand: null, lastCircleTool: 'circle-center', lastArcTool: 'arc-3p' },
    controller,
    repeatableCommands: new Set(['line']),
    dimensionTools: new Set(),
    localFileManager: { save() {}, saveAs() {} },
    commands: {
      tangentLine: noOpCommand, pointTangentLine: noOpCommand, xline: noOpCommand,
      regularPolygon: noOpCommand, ellipse: noOpCommand,
      stretch: noOpCommand, polarArray: noOpCommand, scale: noOpCommand,
      trim: noOpCommand, offset: noOpCommand,
    },
    actions,
    elements: { circleToolButton: { dataset: {} }, arcToolButton: { dataset: {} } },
  });
  dispatcher.run('line');
  dispatcher.run('polyline-join');
  dispatcher.run('regular-polygon');
  dispatcher.run('ellipse');
  dispatcher.run('toggle-grid');
  assert.deepEqual(calls.slice(0, 2), [['setTool', 'line'], ['closeToolGroups']]);
  assert.deepEqual(calls.slice(2), [['startPolylineJoin'], ['closeToolGroups'], ['start'], ['closeToolGroups'],
    ['start'], ['closeToolGroups'], ['toggleGridSnap']]);
}

function testWebcadProjectSaveUsesLocationPicker() {
  const calls = [];
  const actions = createDocumentActions({
    localFileManager: {
      saveAs(...args) {
        calls.push(args);
        return Promise.resolve(true);
      },
    },
  });
  assert.equal(actions.saveWebcadProject(), true);
  assert.equal(actions.exportDxf(), true);
  assert.deepEqual(calls, [['webcad'], ['dxf']]);
}

async function testModularSaveLocationPicker() {
  const registry = createCadFormatRegistry();
  registry.register({
    id: 'webcad',
    label: 'Proyecto webCAD',
    extension: '.webcad',
    mimeType: 'application/json',
    serialize: () => '{}',
  });
  const writes = [];
  let nativeOptions = null;
  const nativeHandle = {
    name: 'modelo.webcad',
    async createWritable() {
      return {
        async close() {
          writes.push('native-close');
        },
        async write(content) {
          writes.push(['native-write', content.type]);
        },
      };
    },
  };
  const nativePicker = createSaveLocationPicker({
    registry,
    browserWindow: {
      async showSaveFilePicker(options) {
        nativeOptions = options;
        return nativeHandle;
      },
    },
  });
  assert.equal(nativePicker.supportsLocationSelection(), true);
  const nativeDestination = await nativePicker.select({
    formatId: 'webcad',
    suggestedName: 'modelo',
  });
  assert.equal(nativeOptions.suggestedName, 'modelo.webcad');
  assert.equal(nativeDestination.handle, nativeHandle);
  await nativePicker.write(nativeDestination, '{}', registry.get('webcad'));
  assert.deepEqual(writes, [
    ['native-write', 'application/json'],
    'native-close',
  ]);

  const directoryCalls = [];
  const directoryHandle = {
    async getFileHandle(name, options) {
      directoryCalls.push(['file', name, options]);
      return nativeHandle;
    },
  };
  const directoryPicker = createSaveLocationPicker({
    registry,
    browserWindow: {
      async showDirectoryPicker(options) {
        directoryCalls.push(['directory', options]);
        return directoryHandle;
      },
    },
    requestFileName(options) {
      directoryCalls.push(['name', options]);
      return 'reconstruido';
    },
  });
  const directoryDestination = await directoryPicker.select({
    formatId: 'webcad',
    suggestedName: 'modelo.webcad',
  });
  assert.equal(directoryDestination.handle, nativeHandle);
  assert.equal(directoryCalls[0][0], 'directory');
  assert.equal(directoryCalls[1][1].directorySelected, true);
  assert.deepEqual(directoryCalls[2], [
    'file',
    'reconstruido.webcad',
    { create: true },
  ]);

  const downloads = [];
  let unsupportedCount = 0;
  const fallbackPicker = createSaveLocationPicker({
    registry,
    browserWindow: {},
    requestFileName: () => 'copia',
    onUnsupported: () => {
      unsupportedCount += 1;
    },
    download: (content, format, name) => {
      downloads.push([content, format.id, name]);
    },
  });
  assert.equal(fallbackPicker.supportsLocationSelection(), false);
  const fallbackDestination = await fallbackPicker.select({
    formatId: 'webcad',
    suggestedName: 'modelo.webcad',
  });
  await fallbackPicker.write(
    fallbackDestination,
    '{}',
    registry.get('webcad'),
  );
  assert.equal(unsupportedCount, 1);
  assert.deepEqual(downloads, [['{}', 'webcad', 'copia.webcad']]);
}

function testPolylineShortcutAlias() {
  const commands = [];
  const methods = createControllerShortcutMethods({
    formatSnapType: (type) => type,
    runCommand: (command) => commands.push(command),
    statusMessage: { textContent: '', title: '' },
  });
  let timerCallback = null;
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  globalThis.setTimeout = (callback) => {
    timerCallback = callback;
    return 1;
  };
  globalThis.clearTimeout = () => {};
  try {
    const controller = {
      ...methods,
      keyboardRefreshFrame: null,
      shortcutPrefix: null,
      shortcutTimer: null,
      state: {
        activeObjectSnap: null,
        statusText: '',
        tool: 'select',
      },
      updateCursorInput() {},
      updateUiStatus() {},
      renderer: { draw() {} },
    };
    controller.armShortcutPrefix('p');
    assert.equal(controller.shortcutPrefix, 'p');
    const prevented = [];
    assert.equal(methods.handleShortcutSequence.call(controller, {
      altKey: false,
      ctrlKey: false,
      key: 'l',
      metaKey: false,
      preventDefault: () => prevented.push(true),
    }), true);
    assert.deepEqual(commands, ['polyline']);
    assert.deepEqual(prevented, [true]);
    controller.armShortcutPrefix('p');
    assert.equal(methods.handleShortcutSequence.call(controller, {
      altKey: false,
      ctrlKey: false,
      key: 'j',
      metaKey: false,
      preventDefault: () => prevented.push(true),
    }), true);
    assert.deepEqual(commands, ['polyline', 'polyline-join']);
    assert.deepEqual(prevented, [true, true]);
    controller.armShortcutPrefix('p');
    assert.equal(methods.handleShortcutSequence.call(controller, {
      altKey: false,
      ctrlKey: false,
      key: 'g',
      metaKey: false,
      preventDefault: () => prevented.push(true),
    }), true);
    assert.deepEqual(commands, ['polyline', 'polyline-join', 'regular-polygon']);
    assert.deepEqual(prevented, [true, true, true]);
    controller.armShortcutPrefix('e');
    assert.equal(methods.handleShortcutSequence.call(controller, {
      altKey: false,
      ctrlKey: false,
      key: 'l',
      metaKey: false,
      preventDefault: () => prevented.push(true),
    }), true);
    assert.deepEqual(commands, ['polyline', 'polyline-join', 'regular-polygon', 'ellipse']);
    assert.equal(timerCallback !== null, true);
  }
  finally {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
}

function testLineDraftStatus() {
  const element = () => ({
    classList: { toggle() {} },
    disabled: false,
    hidden: false,
    setAttribute() {},
    textContent: '',
    title: '',
  });
  const statusLength = element();
  const statusMessage = element();
  const methods = createControllerStatusMethods({
    DIMENSION_TOOLS: new Set(),
    activeDraftOrigin: () => null,
    activeDrawingProfile: () => ({ shortLabel: 'ING' }),
    activeFilletRadius: () => 0,
    activeLayerName: () => 'Continua',
    activeLineColorId: () => 'bylayer',
    activeLineStyleId: () => 'bylayer',
    activeLineTypeId: () => 'bylayer',
    activeOffsetDistance: () => 0,
    blockEditorBar: element(),
    blockEditorName: element(),
    commandLabel: (tool) => tool,
    distance,
    dimensionPlacementPoint: () => null,
    formatChamferDistances: () => '0 / 0',
    formatNumber: (value) => String(value),
    formatSnapType: (type) => type,
    getLineColor: () => ({ label: 'Por capa' }),
    getLineStyle: () => ({ label: 'Por capa' }),
    getLineType: () => ({ label: 'Por capa' }),
    parseCopyMultiplier: () => null,
    parseDistanceInput: () => null,
    pointFromDistance: () => null,
    pointFromPartialRelativeCoordinates: () => null,
    pointFromRelativeCoordinates: () => null,
    polylineTangentArcToPoint: () => ({ radius: 0 }),
    rectangleTargetPoint: () => null,
    redoButton: element(),
    redoCommandButtons: [],
    resolveCursorPoint: (point) => point,
    resolvePointForState: (point) => point,
    statusCursor: element(),
    statusDxf: element(),
    statusEntities: element(),
    statusGridButton: element(),
    statusLayer: element(),
    statusLength,
    statusLineWeightButton: element(),
    statusMessage,
    statusOrthoButton: element(),
    statusTool: element(),
    undoButton: element(),
    undoCommandButtons: [],
    unitsLabel: () => 'mm',
  });
  const controller = {
    activeGripPoint: () => null,
    activeGripReferencePoint: () => null,
    doc: { canRedo: () => false, canUndo: () => false, entities: [] },
    gripDragState: null,
    state: {
      distanceInput: '',
      lineWeightDisplayEnabled: true,
      mouseWorld: { x: 3, y: 4, z: 0 },
      orthoEnabled: false,
      pendingLineStart: { x: 0, y: 0, z: 0 },
      snapEnabled: true,
      statusText: '',
      tool: 'line',
    },
    updateCanvasCursorMode() {},
    updateCursorInput() {},
  };

  methods.updateUiStatus.call(controller);
  assert.equal(statusLength.textContent, 'Longitud: 5 mm');
  assert.match(statusMessage.textContent, /Segundo punto pendiente/);
}

function testPointerGripSelectionStartsDrag() {
  const line = new LineEntity({ x: 0, y: 0 }, { x: 10, y: 0 });
  const methods = createControllerPointerMethods({
    DIMENSION_TOOLS: new Set(),
    completeAnchoredSelectionWindow: () => false,
    formatSnapType: (type) => type,
    getLineStyle: () => ({ label: 'Por capa' }),
    gripPoint: (grip) => grip.entity[grip.key],
    gripReferencePoint: (grip) => (grip.key === 'start' ? grip.entity.end : grip.entity.start),
    isCircularEntity: () => false,
  });
  const controller = {
    cancelKeyboardRefresh() {},
    cancelMouseWheelZoom() {},
    canvas: {
      classList: { add() {}, remove() {} },
      setPointerCapture() {},
    },
    doc: {
      addSelectedEntities(entities) {
        this.selectedEntities = new Set(entities);
      },
      selectedEntities: new Set(),
    },
    findGripAt: () => ({ entity: line, key: 'start' }),
    gripDragState: null,
    rememberSelectionSet() {},
    renderer: { draw() {} },
    state: {
      distanceInput: '',
      mouseScreen: { x: 0, y: 0 },
      tool: 'select',
      viewOffset: { x: 0, y: 0 },
    },
    updateMouse: () => ({ x: 0, y: 0, z: 0 }),
    updateUiStatus() {},
  };

  methods.onPointerDown.call(controller, {
    button: 0,
    pointerId: 1,
    preventDefault() {},
  });

  assert.equal(controller.state.selectedGrip.key, 'start');
  assert.deepEqual(controller.gripDragState.startPoint, { x: 0, y: 0, z: 0 });
  assert.deepEqual(controller.gripDragState.axisPoint, { x: 10, y: 0, z: 0 });
}

testInputAndCoordinates();
testEntitiesAndTransforms();
testIntersectionsAndSelection();
testExactEllipseEntityAndIntersections();
testPointTangentsToEllipses();
testEllipseCommandAndTrim();
testDimensionPointEntryAndEllipseKeyboard();
testHatchWithEllipses();
testTrim();
testDocumentHistory();
testWebcadProjectFormat();
testStlExport();
testPolylineJoinOperation();
testPolylineJoinClosedLoopDetection();
testPolylineJoinUndoRedo();
testPolylineJoinCommandFiltersSelection();
testPolylineJoinCommandCreatesMultipleClosedLoopsUndoRedo();
testRegularPolygonCommand();
testMirrorSecondPointConfirmation();
testDxfRoundTrip();
testCommandDispatcher();
testWebcadProjectSaveUsesLocationPicker();
await testModularSaveLocationPicker();
testPolylineShortcutAlias();
testLineDraftStatus();
testPointerGripSelectionStartsDrag();

console.log('webCAD regression: OK');

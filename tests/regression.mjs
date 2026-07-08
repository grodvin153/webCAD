import assert from 'node:assert/strict';

import { createCommandDispatcher } from '../source/app/command-dispatcher.js';
import { createCadDocumentClass } from '../source/document/cad-document.js';
import { createArcEntityClass } from '../source/entities/arc.js';
import { createCircleEntityClass } from '../source/entities/circle.js';
import { createHatchEntityClass } from '../source/entities/hatch.js';
import { createLineEntityClass } from '../source/entities/line.js';
import { createPolylineEntityClass } from '../source/entities/polyline.js';
import { createTextEntityClass } from '../source/entities/text.js';
import { createXLineEntityClass } from '../source/entities/xline.js';
import { createDxfExporter } from '../source/files/formats/dxf/exporter.js';
import { createDxfImporter } from '../source/files/formats/dxf/importer.js';
import {
  boundsIntersectsBounds,
  createBounds,
  distance,
  mergeBounds,
  normalizeAngle,
} from '../source/geometry.js';
import { createRasterImageEntityClass } from '../source/images/entity.js';
import {
  circleCircleIntersectionPoints,
  entityIntersectionPoints,
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
import { createCircularTrimOperations } from '../source/operations/trim/circular.js';
import { createLineTrimOperations } from '../source/operations/trim/line.js';
import { entitiesFromSelectionWindow } from '../source/selection/window.js';
import { mirrorEntityAcrossAxis } from '../source/transformations/mirror.js';
import { moveEntityByVector } from '../source/transformations/move.js';
import { rotateEntityByAngle } from '../source/transformations/rotate.js';
import { scaleEntityAroundPoint } from '../source/transformations/scale.js';

const style = {
  applyLineStyleToEntity: (entity, value) => { entity.lineStyle = value; },
  applyLineTypeToEntity: (entity, value) => { entity.lineType = value; },
  applyLineColorToEntity: (entity, value) => { entity.lineColor = value; },
};
const LineEntity = createLineEntityClass(style);
const CircleEntity = createCircleEntityClass(style);
const ArcEntity = createArcEntityClass(style);
const PolylineEntity = createPolylineEntityClass({
  style,
  polylineSegmentEntity: () => null,
  polylineSegmentEntities: () => [],
});
const HatchEntity = createHatchEntityClass(style);
const TextEntity = createTextEntityClass(style);
const XLineEntity = createXLineEntityClass(style);
const RasterImageEntity = createRasterImageEntityClass(style);

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
  });
  const doc = new CadDocument();
  doc.addEntity(new LineEntity({ x: 0, y: 0 }, { x: 1, y: 0 }), { recordHistory: false });
  doc.addEntity(new LineEntity({ x: 0, y: 1 }, { x: 1, y: 1 }));
  assert.equal(doc.entities.length, 2);
  assert.equal(doc.undo(), true);
  assert.equal(doc.entities.length, 1);
  assert.equal(doc.redo(), true);
  assert.equal(doc.entities.length, 2);
}

function dxfServices() {
  const noClass = class {};
  return {
    ArcEntity,
    BlockReferenceEntity: noClass,
    CircleEntity,
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
  const dxf = exporter.serializeDocumentToDxf({
    entities: [source],
    blockDefinitions: new Map(),
    topLevelEntities() { return this.entities; },
  });
  assert.match(dxf, /30\n7\n11\n10\n21\n0\n31\n9/);
  const parsed = createDxfImporter(dxfServices()).parseDxf(dxf);
  assert.deepEqual([parsed[0].start.z, parsed[0].end.z], [7, 9]);
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
      stretch: noOpCommand, polarArray: noOpCommand, scale: noOpCommand,
      trim: noOpCommand, offset: noOpCommand,
    },
    actions,
    elements: { circleToolButton: { dataset: {} }, arcToolButton: { dataset: {} } },
  });
  dispatcher.run('line');
  dispatcher.run('toggle-grid');
  assert.deepEqual(calls.slice(0, 2), [['setTool', 'line'], ['closeToolGroups']]);
  assert.deepEqual(calls.slice(2), [['toggleGridSnap']]);
}

testInputAndCoordinates();
testEntitiesAndTransforms();
testIntersectionsAndSelection();
testTrim();
testDocumentHistory();
testDxfRoundTrip();
testCommandDispatcher();

console.log('webCAD regression: OK');

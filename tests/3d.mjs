import assert from 'node:assert/strict';

import { createDefaultCamera3d } from '../source/3d/camera3d.js';
import { extrudeClosedProfile } from '../source/3d/extrusion.js';
import {
  add3,
  cross3,
  dot3,
  length3,
  normalize3,
  scale3,
  sub3,
} from '../source/3d/math3d.js';
import { projectPoint3d } from '../source/3d/projection3d.js';
import {
  canExtrudeEntityAsProfile,
  extrudePolylineLikeEntity,
  isClosedPolylineLike,
  profilePointsFromPolylineLike,
} from '../source/3d/profile-adapter.js';
import { cloneSolid3d, computeSolidBounds3d, isValidSolid3d } from '../source/3d/solid.js';
import { createViewer3d } from '../source/3d/viewer3d.js';
import { solid3dToBufferGeometry } from '../source/3d/three/solid-to-buffer-geometry.js';
import { entitiesToThreeEntityGroup } from '../source/3d/three/entity-line-objects.js';
import {
  entitiesToThreeLines,
  entityLineSegments3d,
} from '../source/3d/three/entities-to-three-lines.js';
import {
  createSketchAxes,
  createSketchGrid,
  disposeThreeObject,
  setSketchGridVisible,
  THREE_VIEW_STYLE,
} from '../source/3d/three/three-scene-style.js';
import {
  buildWireframeSegments3d,
  drawWireframe,
  projectWireframeSegments,
  renderSolidWireframe,
} from '../source/3d/wireframe-renderer.js';
import { createWorldXYPlane, projectPointToWorkplane } from '../source/3d/workplane.js';

assert.deepEqual(add3({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 }), { x: 5, y: 7, z: 9 });
assert.deepEqual(sub3({ x: 4, y: 5, z: 6 }, { x: 1, y: 2, z: 3 }), { x: 3, y: 3, z: 3 });
assert.deepEqual(scale3({ x: 1, y: -2, z: 3 }, 2), { x: 2, y: -4, z: 6 });
assert.equal(dot3({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }), 0);
assert.deepEqual(cross3({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }), { x: 0, y: 0, z: 1 });
assert.equal(length3({ x: 2, y: 3, z: 6 }), 7);
assert.deepEqual(normalize3({ x: 0, y: 0, z: 0 }), { x: 0, y: 0, z: 0 });

const camera = createDefaultCamera3d();
const viewport = { x: 0, y: 0, width: 800, height: 600 };
const projectedTarget = projectPoint3d(camera.target, camera, viewport);
assert.ok(projectedTarget);
assert.ok(Math.abs(projectedTarget.x - 400) < 1e-9);
assert.ok(Math.abs(projectedTarget.y - 300) < 1e-9);
assert.equal(projectedTarget.visible, true);

const orthographicCamera = { ...camera, projectionType: 'orthographic' };
const orthographicTarget = projectPoint3d(camera.target, orthographicCamera, viewport);
assert.ok(Math.abs(orthographicTarget.x - 400) < 1e-9);
assert.ok(Math.abs(orthographicTarget.y - 300) < 1e-9);

const worldXY = createWorldXYPlane();
assert.deepEqual(projectPointToWorkplane({ x: 4, y: 5, z: 6 }, worldXY), { x: 4, y: 5, z: 0 });

const rectangle = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 5 },
  { x: 0, y: 5 },
];
const rectangleExtrusion = extrudeClosedProfile(rectangle, 3, { source: 'test-rectangle' });
assert.equal(rectangleExtrusion.vertices.length, 8);
assert.equal(rectangleExtrusion.faces.length, 6);
assert.equal(rectangleExtrusion.edges.length, 12);
assert.equal(isValidSolid3d(rectangleExtrusion), true);
assert.deepEqual(computeSolidBounds3d(rectangleExtrusion), {
  minX: 0,
  minY: 0,
  minZ: 0,
  maxX: 10,
  maxY: 5,
  maxZ: 3,
});
assert.deepEqual(rectangleExtrusion.metadata, {
  type: 'extrusion',
  height: 3,
  source: 'test-rectangle',
});

const closedRectangle = extrudeClosedProfile([...rectangle, rectangle[0]], 3);
assert.equal(closedRectangle.vertices.length, 8);
assert.equal(closedRectangle.faces.length, 6);

const clonedExtrusion = cloneSolid3d(rectangleExtrusion);
clonedExtrusion.vertices[0].x = 99;
assert.equal(rectangleExtrusion.vertices[0].x, 0);
assert.throws(
  () => extrudeClosedProfile([{ x: 0, y: 0 }, { x: 1, y: 0 }], 3),
  /tres puntos utiles/,
);
assert.throws(() => extrudeClosedProfile(rectangle, 0), /distinta de cero/);

const closedPolyline = {
  type: 'POLYLINE',
  id: 'square-1',
  closed: true,
  vertices: rectangle.map((point) => ({ ...point })),
  segments: rectangle.map(() => ({ type: 'LINE' })),
};
assert.equal(isClosedPolylineLike(closedPolyline), true);
assert.equal(canExtrudeEntityAsProfile(closedPolyline), true);

const repeatedEndpointPolyline = {
  type: 'POLYLINE',
  vertices: [...rectangle.map((point) => ({ ...point })), { ...rectangle[0] }],
};
assert.equal(isClosedPolylineLike(repeatedEndpointPolyline), true);
const originalPolylineSnapshot = structuredClone(repeatedEndpointPolyline);
const adaptedProfile = profilePointsFromPolylineLike(repeatedEndpointPolyline);
assert.equal(adaptedProfile.length, 4);
assert.deepEqual(adaptedProfile[0], { x: 0, y: 0, z: 0 });
assert.deepEqual(repeatedEndpointPolyline, originalPolylineSnapshot);

const adaptedExtrusion = extrudePolylineLikeEntity(closedPolyline, 3);
assert.equal(adaptedExtrusion.vertices.length, 8);
assert.equal(adaptedExtrusion.faces.length, 6);
assert.deepEqual(adaptedExtrusion.metadata, {
  type: 'extrusion',
  height: 3,
  source: null,
  sourceEntityType: 'POLYLINE',
  sourceId: 'square-1',
});

const openPolyline = { ...closedPolyline, closed: false };
assert.equal(isClosedPolylineLike(openPolyline), false);
assert.equal(canExtrudeEntityAsProfile(openPolyline), false);

const arcPolyline = {
  ...closedPolyline,
  segments: [{ type: 'LINE' }, { type: 'ARC' }, { type: 'LINE' }],
};
assert.equal(canExtrudeEntityAsProfile(arcPolyline), false);
assert.throws(
  () => profilePointsFromPolylineLike(arcPolyline),
  /No se pueden extruir todavía polilíneas con arcos/,
);

const wireframeSolidSnapshot = structuredClone(rectangleExtrusion);
const wireframeSegments = buildWireframeSegments3d(rectangleExtrusion);
assert.equal(wireframeSegments.length, 12);
assert.deepEqual(rectangleExtrusion, wireframeSolidSnapshot);

const projectedWireframe = projectWireframeSegments(wireframeSegments, camera, viewport);
assert.equal(projectedWireframe.length, 12);
assert.equal(projectedWireframe.every((segment) =>
  Number.isFinite(segment.start.x) && Number.isFinite(segment.start.y) &&
  Number.isFinite(segment.end.x) && Number.isFinite(segment.end.y)), true);

assert.throws(
  () => buildWireframeSegments3d({
    ...rectangleExtrusion,
    edges: [...rectangleExtrusion.edges, [0, 99]],
  }),
  /vertice inexistente/,
);

const drawingCalls = [];
const mockContext = {
  beginPath: () => drawingCalls.push(['beginPath']),
  lineTo: (x, y) => drawingCalls.push(['lineTo', x, y]),
  moveTo: (x, y) => drawingCalls.push(['moveTo', x, y]),
  restore: () => drawingCalls.push(['restore']),
  save: () => drawingCalls.push(['save']),
  stroke: () => drawingCalls.push(['stroke']),
  strokeStyle: '',
  lineWidth: 0,
};
drawWireframe(mockContext, projectedWireframe);
assert.equal(mockContext.strokeStyle, '#1f2937');
assert.equal(mockContext.lineWidth, 1);
assert.deepEqual(drawingCalls[0], ['save']);
assert.deepEqual(drawingCalls.at(-1), ['restore']);
assert.equal(drawingCalls.filter(([method]) => method === 'moveTo').length, 12);
assert.equal(drawingCalls.filter(([method]) => method === 'lineTo').length, 12);

const composedCalls = [];
const composedContext = {
  beginPath: () => composedCalls.push('beginPath'),
  lineTo() {},
  moveTo() {},
  restore: () => composedCalls.push('restore'),
  save: () => composedCalls.push('save'),
  stroke: () => composedCalls.push('stroke'),
};
const renderedWireframe = renderSolidWireframe(
  composedContext,
  rectangleExtrusion,
  camera,
  viewport,
  { strokeStyle: '#ff0000', lineWidth: 2 },
);
assert.equal(renderedWireframe.length, 12);
assert.equal(composedContext.strokeStyle, '#ff0000');
assert.equal(composedContext.lineWidth, 2);
assert.deepEqual(composedCalls, ['save', 'beginPath', 'stroke', 'restore']);

const viewerWithoutCanvas = createViewer3d();
assert.deepEqual(viewerWithoutCanvas.render(), []);

const viewerCalls = [];
const viewerContext = {
  beginPath: () => viewerCalls.push(['beginPath']),
  fillRect: (x, y, width, height) => viewerCalls.push(['fillRect', x, y, width, height]),
  lineTo: (x, y) => viewerCalls.push(['lineTo', x, y]),
  moveTo: (x, y) => viewerCalls.push(['moveTo', x, y]),
  restore: () => viewerCalls.push(['restore']),
  save: () => viewerCalls.push(['save']),
  stroke: () => viewerCalls.push(['stroke']),
};
const viewerCanvas = {
  width: 640,
  height: 480,
  getContext: (type) => type === '2d' ? viewerContext : null,
};
const viewer = createViewer3d({ canvas: viewerCanvas });
viewer.setSolids([rectangleExtrusion]);
assert.equal(viewer.getSolids().length, 1);
const viewerSegments = viewer.render();
assert.equal(viewerSegments.length, 12);
assert.equal(viewerContext.fillStyle, '#ffffff');
assert.deepEqual(
  viewerCalls.find(([method]) => method === 'fillRect'),
  ['fillRect', 0, 0, 640, 480],
);

assert.equal(viewer.addSolid(closedRectangle), 2);
assert.equal(viewer.getSolids().length, 2);
assert.deepEqual(viewer.clearSolids(), []);
assert.equal(viewer.getSolids().length, 0);

const replacementCamera = { ...camera, zoom: 2 };
assert.equal(viewer.setCamera(replacementCamera), replacementCamera);
assert.equal(viewer.getCamera(), replacementCamera);
assert.deepEqual(viewer.setViewport(800, 600), { width: 800, height: 600 });
assert.deepEqual(viewer.resizeFromCanvas(), { width: 640, height: 480 });

const threeSolidSnapshot = structuredClone(rectangleExtrusion);
const threeGeometry = solid3dToBufferGeometry(rectangleExtrusion);
assert.equal(threeGeometry.getAttribute('position').count, 8);
assert.equal(threeGeometry.getAttribute('normal').count, 8);
assert.equal(threeGeometry.getIndex().count, 36);
assert.deepEqual(threeGeometry.boundingBox.min.toArray(), [0, 0, 0]);
assert.deepEqual(threeGeometry.boundingBox.max.toArray(), [10, 5, 3]);
assert.ok(threeGeometry.boundingSphere.radius > 0);
assert.deepEqual(rectangleExtrusion, threeSolidSnapshot);
threeGeometry.dispose();

const line2d = {
  type: 'LINE',
  start: { x: 1, y: 2, z: 0 },
  end: { x: 5, y: 4, z: 0 },
};
const line2dSnapshot = structuredClone(line2d);
const line3dSegments = entityLineSegments3d(line2d);
assert.equal(line3dSegments.length, 1);
assert.deepEqual(line3dSegments[0].start, { x: 1, y: -2, z: 0 });
assert.deepEqual(line2d, line2dSnapshot);

const straightPolyline2d = {
  type: 'POLYLINE',
  closed: false,
  vertices: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }],
  segments: [{ type: 'LINE' }, { type: 'LINE' }],
};
assert.equal(entityLineSegments3d(straightPolyline2d).length, 2);

const circle2d = { type: 'CIRCLE', center: { x: 0, y: 0 }, radius: 5 };
assert.equal(entityLineSegments3d(circle2d, { curveSegments: 8 }).length, 8);
const arc2d = {
  type: 'ARC',
  center: { x: 0, y: 0 },
  radius: 5,
  startAngle: 0,
  endAngle: Math.PI * 0.5,
  clockwise: true,
};
assert.equal(entityLineSegments3d(arc2d, { curveSegments: 8 }).length, 2);
assert.deepEqual(entityLineSegments3d({ type: 'TEXT' }), []);

const threeEntityLines = entitiesToThreeLines([line2d, straightPolyline2d, circle2d], {
  curveSegments: 8,
});
assert.equal(threeEntityLines.userData.segmentCount, 11);
assert.equal(threeEntityLines.geometry.getAttribute('position').count, 22);
threeEntityLines.geometry.dispose();
threeEntityLines.material.dispose();

const threeEntityGroup = entitiesToThreeEntityGroup([line2d, straightPolyline2d, circle2d], {
  curveSegments: 8,
});
assert.equal(threeEntityGroup.children.length, 3);
assert.equal(threeEntityGroup.userData.entityCount, 3);
assert.equal(threeEntityGroup.userData.segmentCount, 11);
assert.equal(threeEntityGroup.children[0].userData.selectable, true);
assert.equal(threeEntityGroup.children[0].userData.entity, line2d);
assert.equal(threeEntityGroup.children[0].position.z, THREE_VIEW_STYLE.drawingPlaneLift);
assert.equal(threeEntityGroup.children[0].renderOrder, THREE_VIEW_STYLE.drawingRenderOrder);
assert.equal(threeEntityGroup.children[0].material.depthTest, false);
assert.ok(threeEntityGroup.userData.bounds);
disposeThreeObject(threeEntityGroup);

assert.equal(THREE_VIEW_STYLE.preset, 'SK');
assert.ok(THREE_VIEW_STYLE.drawingPlaneLift > 0);
assert.ok(THREE_VIEW_STYLE.groundOpacity < 1);
const skGrid = createSketchGrid(undefined, 20);
assert.equal(skGrid.userData.preset, 'SK');
assert.ok(skGrid.getObjectByName('webcad-3d-sk-ground'));
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').material.transparent, true);
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').material.opacity, THREE_VIEW_STYLE.groundOpacity);
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').renderOrder, THREE_VIEW_STYLE.groundRenderOrder);
assert.equal(skGrid.visible, true);
assert.ok(skGrid.userData.extent >= 2000);
setSketchGridVisible(skGrid, false);
assert.equal(skGrid.visible, true);
assert.equal(skGrid.userData.gridLinesVisible, false);
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').visible, true);
assert.equal(skGrid.getObjectByName('webcad-3d-grid-minor').visible, false);
disposeThreeObject(skGrid);

const skAxes = createSketchAxes(20);
assert.equal(skAxes.userData.preset, 'SK');
assert.equal(skAxes.children.length, 3);
assert.ok(skAxes.userData.extent >= 2000);
for (const axis of skAxes.children) {
  const negative = axis.children.find((child) => child.userData.negativeAxis);
  assert.ok(negative);
  assert.equal(negative.material.dashed, true);
  assert.equal(negative.material.linewidth, THREE_VIEW_STYLE.axisNegativeLineWidth);
}
disposeThreeObject(skAxes);

console.log('webCAD 3D foundation: OK');

import assert from 'node:assert/strict';
import * as THREE from 'three';

import { createDefaultCamera3d } from '../source/3d/camera3d.js';
import {
  cloneExactProfile,
  exactProfileFromCircle,
  exactProfileFromEntity,
  exactProfileFromPolyline,
  exactProfileWithHoles,
  sampleExactProfile,
  validateExactProfile,
} from '../source/3d/exact-profile.js';
import {
  cloneExactExtrusion,
  createExactExtrusion,
  exactExtrusionBounds,
  sampleExactExtrusion,
  validateExactExtrusion,
} from '../source/3d/exact-extrusion.js';
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
import { visibleEntitiesForThreeView } from '../source/3d/three/entity-visibility.js';
import {
  createPushSolidGroupFromSolid,
  createPushSolidGroup,
  isPushSolidIntegrityValid,
  movedSolidFacePush,
  PUSH_SOLID_STYLE,
  pushSourceKeyFromEntity,
  pushSourceKeyFromFace,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import {
  buildPushSilhouetteSegments,
  updatePushSilhouetteGroup,
} from '../source/3d/three/push-silhouette.js';
import { createFaceMesh, detectSimpleClosedFaces } from '../source/3d/three/simple-faces.js';
import {
  createSolidFaceSelectionMesh,
  solidFaceFromMeshHit,
} from '../source/3d/three/solid-face-selection.js';
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

const exactCircleEntity = {
  type: 'CIRCLE',
  id: 'circle-exact-1',
  center: { x: 4, y: 5, z: 0 },
  radius: 7,
};
const exactCircleProfile = exactProfileFromCircle(exactCircleEntity);
assert.equal(validateExactProfile(exactCircleProfile), true);
assert.equal(exactCircleProfile.outerLoop.segments.length, 1);
assert.equal(exactCircleProfile.innerLoops.length, 0);
assert.equal(exactCircleProfile.segments.length, 1);
assert.equal(exactCircleProfile.segments[0].type, 'circle');
assert.deepEqual(exactCircleProfile.segments[0].center, { x: 4, y: 5, z: 0 });
assert.equal(exactCircleProfile.segments[0].radius, 7);
assert.deepEqual(exactCircleProfile.source, { entityId: 'circle-exact-1', entityType: 'CIRCLE' });
assert.deepEqual(exactCircleProfile.bounds, { minX: -3, minY: -2, maxX: 11, maxY: 12 });
assert.equal(JSON.parse(JSON.stringify(exactCircleProfile)).segments[0].type, 'circle');
assert.equal(JSON.parse(JSON.stringify(exactCircleProfile)).outerLoop.segments[0].type, 'circle');

const exactPolylineEntity = {
  type: 'POLYLINE',
  id: 'poly-exact-1',
  closed: true,
  vertices: [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
  ],
  segments: [
    { type: 'LINE' },
    { type: 'ARC', center: { x: 5, y: 5 }, clockwise: true },
    { type: 'LINE' },
  ],
};
const exactPolylineSnapshot = structuredClone(exactPolylineEntity);
const exactPolylineProfile = exactProfileFromPolyline(exactPolylineEntity);
assert.equal(validateExactProfile(exactPolylineProfile), true);
assert.equal(exactPolylineProfile.outerLoop.closed, true);
assert.equal(exactPolylineProfile.segments.length, 3);
assert.equal(exactPolylineProfile.segments[0].type, 'line');
assert.equal(exactPolylineProfile.segments[1].type, 'arc-circle');
assert.deepEqual(exactPolylineProfile.segments[1].center, { x: 5, y: 5, z: 0 });
assert.equal(Math.abs(exactPolylineProfile.segments[1].radius - Math.hypot(5, 5)) < 1e-9, true);
assert.equal(exactPolylineProfile.segments[2].type, 'line');
assert.deepEqual(exactPolylineEntity, exactPolylineSnapshot);
assert.equal(exactProfileFromEntity(exactPolylineEntity).segments[1].type, 'arc-circle');
assert.equal(exactProfileFromPolyline({ ...exactPolylineEntity, closed: false }), null);
const clonedExactPolyline = cloneExactProfile(exactPolylineProfile);
clonedExactPolyline.segments[0].start.x = 99;
assert.equal(exactPolylineProfile.segments[0].start.x, 0);
const exactPolylineBeforeSampling = structuredClone(exactPolylineProfile);
const sampledExactPolyline = sampleExactProfile(exactPolylineProfile, { segments: 12 });
assert.ok(sampledExactPolyline.length > exactPolylineProfile.segments.length);
assert.deepEqual(exactPolylineProfile, exactPolylineBeforeSampling);

const outerHoleProfile = exactProfileFromPolyline({
  type: 'POLYLINE',
  id: 'outer-with-holes',
  closed: true,
  vertices: [{ x: 0, y: 0 }, { x: 30, y: 0 }, { x: 30, y: 20 }, { x: 0, y: 20 }],
  segments: [{ type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }],
});
const circularHoleProfile = exactProfileFromCircle({
  type: 'CIRCLE',
  id: 'hole-circle',
  center: { x: 10, y: 10 },
  radius: 3,
});
const profileWithCircularHole = exactProfileWithHoles(outerHoleProfile, [circularHoleProfile]);
assert.equal(validateExactProfile(profileWithCircularHole), true);
assert.equal(profileWithCircularHole.outerLoop.segments.length, 4);
assert.equal(profileWithCircularHole.innerLoops.length, 1);
assert.equal(profileWithCircularHole.innerLoops[0].segments[0].type, 'circle');
assert.notEqual(profileWithCircularHole.outerLoop.orientation, profileWithCircularHole.innerLoops[0].orientation);
assert.equal(JSON.parse(JSON.stringify(profileWithCircularHole)).innerLoops.length, 1);
const secondHoleProfile = exactProfileFromCircle({
  type: 'CIRCLE',
  id: 'hole-circle-2',
  center: { x: 20, y: 10 },
  radius: 2,
});
const profileWithTwoHoles = exactProfileWithHoles(outerHoleProfile, [circularHoleProfile, secondHoleProfile]);
assert.equal(validateExactProfile(profileWithTwoHoles), true);
assert.equal(profileWithTwoHoles.innerLoops.length, 2);
assert.equal(profileWithTwoHoles.innerLoops.every((loop) => loop.orientation !== profileWithTwoHoles.outerLoop.orientation), true);
const sampledProfileWithHoles = sampleExactProfile(profileWithTwoHoles, { segments: 12 });
assert.ok(Array.isArray(sampledProfileWithHoles.outerLoop));
assert.equal(sampledProfileWithHoles.innerLoops.length, 2);
assert.ok(sampledProfileWithHoles.innerLoops[0].length > 4);
const invalidOpenLoopProfile = cloneExactProfile(profileWithCircularHole);
invalidOpenLoopProfile.innerLoops[0].segments.push({
  type: 'line',
  start: { x: 1, y: 1, z: 0 },
  end: { x: 2, y: 1, z: 0 },
});
assert.equal(validateExactProfile(invalidOpenLoopProfile), false);

const exactSquareExtrusion = createExactExtrusion(outerHoleProfile, 5);
assert.equal(validateExactExtrusion(exactSquareExtrusion), true);
assert.equal(exactSquareExtrusion.caps.start.type, 'plane');
assert.equal(exactSquareExtrusion.caps.end.type, 'plane');
assert.equal(exactSquareExtrusion.sideSurfaces.outer.length, 4);
assert.equal(exactSquareExtrusion.sideSurfaces.outer.every((surface) => surface.type === 'plane'), true);
assert.deepEqual(exactExtrusionBounds(exactSquareExtrusion), {
  minX: 0,
  minY: 0,
  minZ: 0,
  maxX: 30,
  maxY: 20,
  maxZ: 5,
});
assert.equal(JSON.parse(JSON.stringify(exactSquareExtrusion)).type, 'exact-extrusion');
const clonedExactExtrusion = cloneExactExtrusion(exactSquareExtrusion);
clonedExactExtrusion.profile.outerLoop.segments[0].start.x = 99;
assert.equal(exactSquareExtrusion.profile.outerLoop.segments[0].start.x, 0);
assert.equal(createExactExtrusion(outerHoleProfile, 0), null);

const exactCircleExtrusion = createExactExtrusion(exactCircleProfile, 4);
assert.equal(validateExactExtrusion(exactCircleExtrusion), true);
assert.equal(exactCircleExtrusion.sideSurfaces.outer.length, 1);
assert.equal(exactCircleExtrusion.sideSurfaces.outer[0].type, 'cylinder');
assert.equal(exactCircleExtrusion.sideSurfaces.outer[0].radius, 7);

const exactProfileWithHoleSnapshot = structuredClone(profileWithCircularHole);
const exactHoleExtrusion = createExactExtrusion(profileWithCircularHole, 6);
assert.equal(validateExactExtrusion(exactHoleExtrusion), true);
assert.equal(exactHoleExtrusion.caps.start.innerLoops.length, 1);
assert.equal(exactHoleExtrusion.caps.end.innerLoops.length, 1);
assert.equal(exactHoleExtrusion.sideSurfaces.inner.length, 1);
assert.equal(exactHoleExtrusion.sideSurfaces.inner[0].surfaces[0].type, 'cylinder');
assert.equal(exactHoleExtrusion.sideSurfaces.inner[0].surfaces[0].trimRole, 'inner');
assert.deepEqual(profileWithCircularHole, exactProfileWithHoleSnapshot);
const sampledExactHoleExtrusion = sampleExactExtrusion(exactHoleExtrusion, { segments: 16 });
assert.ok(sampledExactHoleExtrusion.caps.start.outerLoop.length >= 4);
assert.equal(sampledExactHoleExtrusion.caps.start.innerLoops.length, 1);
assert.ok(sampledExactHoleExtrusion.caps.start.innerLoops[0].length > 8);
assert.equal(sampledExactHoleExtrusion.sideFaces.inner.length, 1);
assert.ok(sampledExactHoleExtrusion.sideFaces.inner[0].length > 8);

const exactArcExtrusion = createExactExtrusion(exactPolylineProfile, 3);
assert.equal(validateExactExtrusion(exactArcExtrusion), true);
assert.equal(exactArcExtrusion.sideSurfaces.outer.some((surface) =>
  surface.type === 'linearExtrusionSurface' && surface.curveType === 'arc-circle'), true);

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

const arcPolyline2d = {
  type: 'POLYLINE',
  closed: true,
  vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }],
  segments: [
    { type: 'LINE' },
    { type: 'ARC', center: { x: 10, y: 5 }, clockwise: true },
    { type: 'LINE' },
    { type: 'LINE' },
  ],
};
const arcPolylineSnapshot = structuredClone(arcPolyline2d);
assert.ok(entityLineSegments3d(arcPolyline2d, { arcChordTolerance: 1 }).length > 4);
assert.deepEqual(arcPolyline2d, arcPolylineSnapshot);

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
const ellipse2d = {
  type: 'ELLIPSE',
  center: { x: 2, y: 3, z: 0 },
  radiusX: 6,
  radiusY: 3,
  rotation: Math.PI / 6,
};
const ellipse2dSnapshot = structuredClone(ellipse2d);
assert.equal(entityLineSegments3d(ellipse2d, { curveSegments: 16 }).length, 16);
assert.deepEqual(ellipse2d, ellipse2dSnapshot);
const ellipseArc2d = {
  ...ellipse2d,
  type: 'ELLIPSE_ARC',
  startParameter: 0,
  endParameter: Math.PI,
  clockwise: true,
};
assert.equal(entityLineSegments3d(ellipseArc2d, { curveSegments: 16 }).length, 8);
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

const auxiliaryLine = { ...line2d, layer: 'Auxiliar' };
const axesLine = { ...line2d, layer: 'Ejes' };
const normalLine = { ...line2d, layer: 'Continua' };
assert.deepEqual(visibleEntitiesForThreeView([auxiliaryLine, axesLine, normalLine]), [normalLine]);
const filteredThreeEntityGroup = entitiesToThreeEntityGroup([auxiliaryLine, axesLine, normalLine]);
assert.equal(filteredThreeEntityGroup.children.length, 1);
assert.equal(filteredThreeEntityGroup.children[0].userData.entity, normalLine);
disposeThreeObject(filteredThreeEntityGroup);

const closedSquareFace = detectSimpleClosedFaces([{
  type: 'POLYLINE',
  closed: true,
  vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }],
  segments: [{ type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }],
}]);
assert.equal(closedSquareFace.length, 1);
assert.equal(closedSquareFace[0].area, 100);
assert.equal(detectSimpleClosedFaces([{
  type: 'POLYLINE',
  vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 0 }],
}]).length, 1);
assert.equal(detectSimpleClosedFaces([straightPolyline2d]).length, 0);
assert.equal(detectSimpleClosedFaces([circle2d], { circleSegments: 16 }).length, 1);
const ellipseFace = detectSimpleClosedFaces([ellipse2d], { ellipseSegments: 24 })[0];
assert.ok(ellipseFace);
assert.equal(ellipseFace.sourceEntityType, 'ELLIPSE');
assert.equal(ellipseFace.points.length, 24);
const ellipseArcStart = ellipseFace.points[0];
const ellipseArcEnd = ellipseFace.points[12];
const ellipseArcProfile = {
  type: 'ELLIPSE_ARC',
  center: ellipse2d.center,
  radiusX: ellipse2d.radiusX,
  radiusY: ellipse2d.radiusY,
  rotation: ellipse2d.rotation,
  startParameter: 0,
  endParameter: Math.PI,
  clockwise: true,
};
const ellipseChord = {
  type: 'LINE',
  start: { x: ellipseArcEnd.x, y: -ellipseArcEnd.y },
  end: { x: ellipseArcStart.x, y: -ellipseArcStart.y },
};
const compositeEllipseFace = detectSimpleClosedFaces([ellipseArcProfile, ellipseChord], {
  ellipseSegments: 24,
})[0];
assert.ok(compositeEllipseFace);
assert.equal(compositeEllipseFace.sourceEntityType, 'COMPOSITE');
assert.ok(compositeEllipseFace.smoothProfileVertexIndices.length > 0);
assert.equal(validateExactProfile(compositeEllipseFace.exactProfile), true);
const pushedEllipseArcProfile = solidFromFacePush(compositeEllipseFace, 4);
assert.equal(pushedEllipseArcProfile.metadata.exactGeometry.status, 'available');
assert.equal(pushedEllipseArcProfile.metadata.exactGeometry.extrusion.sideSurfaces.outer.some((surface) =>
  surface.type === 'linearExtrusionSurface' && surface.curveType === 'arc-ellipse'), true);
const pushedEllipse = solidFromFacePush(ellipseFace, 4);
assert.equal(pushedEllipse.metadata.exactGeometry.status, 'available');
assert.equal(pushedEllipse.metadata.exactGeometry.extrusion.sideSurfaces.outer[0].type, 'ellipticCylinder');
assert.equal(detectSimpleClosedFaces([line2d]).length, 0);
const arcPolylineFace = detectSimpleClosedFaces([arcPolyline2d], { arcChordTolerance: 1 })[0];
assert.ok(arcPolylineFace);
assert.ok(arcPolylineFace.points.length > arcPolyline2d.vertices.length);
assert.ok(arcPolylineFace.smoothProfileVertexIndices.length > 0);
assert.ok(arcPolylineFace.cadProfileVertexIndices.includes(1));
assert.equal(arcPolylineFace.smoothProfileVertexIndices.includes(1), false);
assert.deepEqual(arcPolyline2d, arcPolylineSnapshot);
const faceMesh = createFaceMesh(closedSquareFace[0]);
assert.equal(faceMesh.userData.type, 'webcad-simple-face');
assert.equal(faceMesh.userData.faceId, closedSquareFace[0].id);
assert.equal(faceMesh.material.transparent, false);
assert.equal(faceMesh.material.opacity, 1);
faceMesh.geometry.dispose();
faceMesh.material.dispose();

const pushedSquare = solidFromFacePush(closedSquareFace[0], 5);
assert.equal(pushedSquare.vertices.length, 8);
assert.equal(pushedSquare.faces.length, 6);
assert.equal(pushedSquare.metadata.type, 'push');
assert.equal(pushedSquare.metadata.height, 5);
assert.equal(pushedSquare.metadata.exactGeometry.status, 'available');
assert.equal(pushedSquare.metadata.exactGeometry.extrusion.distance, 5);
assert.equal(validateExactExtrusion(pushedSquare.metadata.exactGeometry.extrusion), true);
assert.equal(
  pushedSquare.metadata.exactGeometry.extrusion.sideSurfaces.outer
    .every((surface) => surface.type === 'plane'),
  true,
);
assert.equal(pushedSquare.metadata.sourceKey, pushSourceKeyFromFace(closedSquareFace[0]));
const pushedSquareGroup = createPushSolidGroup(closedSquareFace[0], 5);
assert.equal(pushedSquareGroup.userData.type, 'webcad-push-solid-group');
assert.equal(pushedSquareGroup.children.length, 2);
assert.equal(pushedSquareGroup.userData.sourceKey, pushSourceKeyFromFace(closedSquareFace[0]));
assert.equal(pushedSquareGroup.userData.exactGeometry.status, 'available');
assert.equal(pushedSquareGroup.children[0].userData.type, 'webcad-push-solid');
assert.equal(pushedSquareGroup.children[0].userData.exactGeometry.status, 'available');
assert.equal(pushedSquareGroup.children[0].material.transparent, false);
assert.equal(pushedSquareGroup.children[0].material.wireframe, false);
assert.equal(pushedSquareGroup.children[0].material.type, 'MeshStandardMaterial');
assert.equal(pushedSquareGroup.children[0].material.polygonOffset, true);
assert.equal(pushedSquareGroup.children[0].material.color.getHex(), PUSH_SOLID_STYLE.faceColor);
assert.equal(pushSourceKeyFromEntity(closedSquareFace[0].sourceEntity), null);
assert.equal(pushSourceKeyFromEntity({ type: 'POLYLINE', id: 'perfil-1' }), 'POLYLINE:perfil-1');
assert.equal(pushedSquareGroup.children[1].userData.type, 'webcad-push-solid-edges');
assert.equal(pushedSquareGroup.children[1].material.color.getHex(), PUSH_SOLID_STYLE.edgeColor);
assert.equal(pushedSquareGroup.children[1].material.depthTest, true);
assert.equal(pushedSquareGroup.children[1].material.linewidth, PUSH_SOLID_STYLE.edgeLineWidth);
assert.equal(pushedSquareGroup.children[1].userData.showHiddenEdges, false);
const pushedSquareMesh = pushedSquareGroup.children[0];
const pushedSquareFaceMap = pushedSquareMesh.geometry.userData.webcadFaceTriangleMap;
assert.ok(pushedSquareFaceMap.length > 0);
const pushedSquareTopFace = solidFaceFromMeshHit({
  object: pushedSquareMesh,
  faceIndex: pushedSquareFaceMap.indexOf(1),
});
assert.ok(pushedSquareTopFace);
assert.equal(pushedSquareTopFace.sourceSolidFaceIndex, 1);
assert.ok(Math.abs(pushedSquareTopFace.normal.z - 1) < 1e-9);
assert.equal(pushedSquareTopFace.points.every((point) => Math.abs(point.z - 5) < 1e-9), true);
const pushedSquareTopSelection = createSolidFaceSelectionMesh(pushedSquareTopFace);
assert.equal(pushedSquareTopSelection.userData.type, 'webcad-push-solid-face-selection');
assert.equal(pushedSquareTopSelection.userData.face, pushedSquareTopFace);
disposeThreeObject(pushedSquareTopSelection);
const pushedSquareBottomFace = solidFaceFromMeshHit({
  object: pushedSquareMesh,
  faceIndex: pushedSquareFaceMap.indexOf(0),
});
assert.ok(pushedSquareBottomFace);
assert.ok(pushedSquareBottomFace.normal.z < -0.99);
const pushedSquareSideFace = solidFaceFromMeshHit({
  object: pushedSquareMesh,
  faceIndex: pushedSquareFaceMap.indexOf(2),
});
assert.ok(pushedSquareSideFace);
assert.ok(Math.abs(pushedSquareSideFace.normal.z) < 1e-9);
const sideFacePush = solidFromFacePush(pushedSquareSideFace, 2);
assert.equal(sideFacePush.vertices.length, 8);
assert.equal(sideFacePush.metadata.sourceSolidFaceIndex, 2);
assert.ok(sideFacePush.vertices.some((point, index) =>
  index >= 4 &&
  Math.abs(
    (point.x - sideFacePush.vertices[index - 4].x) * pushedSquareSideFace.normal.x +
    (point.y - sideFacePush.vertices[index - 4].y) * pushedSquareSideFace.normal.y +
    (point.z - sideFacePush.vertices[index - 4].z) * pushedSquareSideFace.normal.z -
    2,
  ) < 1e-9));
const movedSideFaceSolid = movedSolidFacePush(pushedSquareSideFace, 2);
assert.equal(movedSideFaceSolid.vertices.length, pushedSquare.vertices.length);
assert.equal(movedSideFaceSolid.faces.length, pushedSquare.faces.length);
assert.equal(movedSideFaceSolid.edges.length, pushedSquare.edges.length);
assert.equal(movedSideFaceSolid.metadata.lastPushFaceIndex, pushedSquareSideFace.sourceSolidFaceIndex);
assert.equal(movedSideFaceSolid.metadata.exactGeometry.status, 'pending');
assert.equal(isPushSolidIntegrityValid(movedSideFaceSolid), true);
const sideFaceVertexIndices = new Set(pushedSquare.faces[pushedSquareSideFace.sourceSolidFaceIndex]);
pushedSquare.vertices.forEach((vertex, index) => {
  const movedVertex = movedSideFaceSolid.vertices[index];
  const movedDistance =
    (movedVertex.x - vertex.x) * pushedSquareSideFace.normal.x +
    (movedVertex.y - vertex.y) * pushedSquareSideFace.normal.y +
    (movedVertex.z - vertex.z) * pushedSquareSideFace.normal.z;
  assert.ok(Math.abs(movedDistance - (sideFaceVertexIndices.has(index) ? 2 : 0)) < 1e-9);
});
const movedSideFaceGroup = createPushSolidGroupFromSolid(movedSideFaceSolid);
assert.equal(movedSideFaceGroup.userData.type, 'webcad-push-solid-group');
assert.equal(movedSideFaceGroup.children.length, 2);
disposeThreeObject(movedSideFaceGroup);
assert.equal(movedSolidFacePush(pushedSquareTopFace, -4.9)?.vertices.length, pushedSquare.vertices.length);
assert.equal(movedSolidFacePush(pushedSquareTopFace, -5), null);
assert.equal(movedSolidFacePush(pushedSquareTopFace, -6), null);
assert.equal(movedSolidFacePush(pushedSquareSideFace, -10), null);
disposeThreeObject(pushedSquareGroup);
assert.throws(() => solidFromFacePush(closedSquareFace[0], 0), /altura de Push/i);

const unsupportedExactFace = {
  id: 'unsupported-exact-face',
  sourceEntity: { type: 'TEXT', id: 'text-source' },
  points: closedSquareFace[0].points,
};
const unsupportedExactPush = solidFromFacePush(unsupportedExactFace, 2);
assert.equal(unsupportedExactPush.vertices.length, 8);
assert.equal(unsupportedExactPush.metadata.exactGeometry.status, 'unavailable');
assert.equal(unsupportedExactPush.metadata.exactGeometry.reason, 'unsupported-source-entity');
assert.equal(JSON.parse(JSON.stringify(unsupportedExactPush.metadata.exactGeometry)).status, 'unavailable');

const closedCircleFace = detectSimpleClosedFaces([circle2d], { circleSegments: 16 })[0];
const pushedCircle = solidFromFacePush(closedCircleFace, 2);
assert.equal(pushedCircle.metadata.exactGeometry.status, 'available');
assert.equal(pushedCircle.metadata.exactGeometry.extrusion.distance, 2);
assert.equal(pushedCircle.metadata.exactGeometry.extrusion.sideSurfaces.outer[0].type, 'cylinder');
const pushedCircleGeometry = solid3dToBufferGeometry(pushedCircle);
assert.equal(pushedCircle.vertices.length, 32);
assert.equal(pushedCircleGeometry.getIndex(), null);
assert.equal(pushedCircleGeometry.userData.webcadRenderMode, 'smooth-extrusion');
assert.ok(pushedCircleGeometry.getAttribute('position').count > pushedCircle.vertices.length);
assert.equal(
  pushedCircleGeometry.getAttribute('normal').count,
  pushedCircleGeometry.getAttribute('position').count,
);
pushedCircleGeometry.dispose();
const pushedCircleGroup = createPushSolidGroup(closedCircleFace, 2);
assert.equal(pushedCircleGroup.children[1].userData.segmentCount, 32);
assert.equal(pushedCircleGroup.children[1].userData.hiddenVerticalSurfaceEdges, true);
const pushedCircleMesh = pushedCircleGroup.children[0];
const pushedCircleFaceMap = pushedCircleMesh.geometry.userData.webcadFaceTriangleMap;
assert.equal(solidFaceFromMeshHit({
  object: pushedCircleMesh,
  faceIndex: pushedCircleFaceMap.indexOf(2),
}), null);
disposeThreeObject(pushedCircleGroup);

const pushedArcPolyline = solidFromFacePush(arcPolylineFace, 3);
assert.equal(pushedArcPolyline.metadata.exactGeometry.status, 'available');
assert.equal(pushedArcPolyline.metadata.exactGeometry.extrusion.distance, 3);
assert.equal(pushedArcPolyline.metadata.exactGeometry.extrusion.sideSurfaces.outer.some((surface) =>
  surface.type === 'linearExtrusionSurface' && surface.curveType === 'arc-circle'), true);
assert.equal(JSON.parse(JSON.stringify(pushedArcPolyline.metadata.exactGeometry)).status, 'available');
assert.equal(pushedArcPolyline.metadata.smoothProfileVertexIndices.length, arcPolylineFace.smoothProfileVertexIndices.length);
const pushedArcPolylineGeometry = solid3dToBufferGeometry(pushedArcPolyline);
assert.equal(pushedArcPolylineGeometry.userData.webcadRenderMode, 'smooth-extrusion');
assert.equal(pushedArcPolylineGeometry.getIndex(), null);
pushedArcPolylineGeometry.dispose();
const pushedArcPolylineGroup = createPushSolidGroup(arcPolylineFace, 3);
assert.equal(pushedArcPolylineGroup.children[1].userData.hiddenVerticalSurfaceEdges, true);
assert.ok(pushedArcPolylineGroup.children[1].userData.segmentCount < pushedArcPolyline.edges.length);
const silhouetteCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
silhouetteCamera.position.set(30, -40, 30);
silhouetteCamera.lookAt(5, -5, 1.5);
silhouetteCamera.updateMatrixWorld();
const silhouetteSegments = buildPushSilhouetteSegments(pushedArcPolyline, silhouetteCamera);
assert.ok(silhouetteSegments.length > 0);
const silhouetteObject = updatePushSilhouetteGroup(pushedArcPolylineGroup, silhouetteCamera);
assert.equal(silhouetteObject.userData.type, 'webcad-push-silhouette');
assert.equal(silhouetteObject.userData.segmentCount, silhouetteSegments.length);
disposeThreeObject(pushedArcPolylineGroup);

const tangentArcPolylineFace = detectSimpleClosedFaces([{
  type: 'POLYLINE',
  closed: true,
  vertices: [{ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 0 }, { x: 10, y: -5 }, { x: 0, y: -5 }],
  segments: [
    { type: 'ARC', center: { x: 0, y: 5 }, clockwise: true },
    { type: 'ARC', center: { x: 10, y: 5 }, clockwise: false },
    { type: 'LINE' },
    { type: 'LINE' },
    { type: 'LINE' },
  ],
}], { arcChordTolerance: 0.75 })[0];
assert.ok(tangentArcPolylineFace);
const tangentCadJoinIndex = tangentArcPolylineFace.points.findIndex((point) =>
  Math.abs(point.x - 5) < 1e-9 && Math.abs(point.y + 5) < 1e-9);
assert.ok(tangentCadJoinIndex >= 0);
assert.ok(tangentArcPolylineFace.cadProfileVertexIndices.includes(tangentCadJoinIndex));
assert.equal(tangentArcPolylineFace.smoothProfileVertexIndices.includes(tangentCadJoinIndex), false);
const pushedTangentArcGroup = createPushSolidGroup(tangentArcPolylineFace, 2);
const tangentCadJoin = tangentArcPolylineFace.points[tangentCadJoinIndex];
const tangentEdgeSegments = pushedTangentArcGroup.children[1].userData.sourceSegments ?? [];
assert.ok(tangentEdgeSegments.some((item) =>
  Math.abs(item.start.x - tangentCadJoin.x) < 1e-9 &&
  Math.abs(item.start.y - tangentCadJoin.y) < 1e-9 &&
  Math.abs(item.end.x - tangentCadJoin.x) < 1e-9 &&
  Math.abs(item.end.y - tangentCadJoin.y) < 1e-9 &&
  Math.abs(item.end.z - item.start.z) > 1e-9));
disposeThreeObject(pushedTangentArcGroup);

const concaveQuadFace = detectSimpleClosedFaces([{
  type: 'POLYLINE',
  closed: true,
  vertices: [{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 2, y: 2 }, { x: 10, y: 0 }],
  segments: [{ type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }],
}])[0];
const concaveQuadGroup = createPushSolidGroup(concaveQuadFace, 4);
assert.equal(concaveQuadGroup.children[1].userData.segmentCount, 12);
disposeThreeObject(concaveQuadGroup);

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

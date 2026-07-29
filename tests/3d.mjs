import assert from 'node:assert/strict';
import * as THREE from 'three';

import { createDefaultCamera3d } from '../source/3d/camera3d.js';
import {
  cloneExactProfile,
  exactProfileFromCircle,
  exactProfileFromCurvePieces,
  exactProfileFromEntity,
  exactProfileFromOrderedEntities,
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
  analyticSideSurfaceNormalAtPoint,
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticSideSurfaces,
  deriveSolidAnalyticTopology,
  pointOnAnalyticSideSurface,
  sampleSolidAnalyticEdges,
} from '../source/3d/analytic-edges.js';
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
  faceOnPrincipalPlane,
  pointOnPrincipalPlane,
  principalPlaneDefinition,
} from '../source/3d/principal-plane.js';
import {
  faceOnSketchPlane,
  pointFromSketchPlane,
  pointOnExactProfilePlane,
  pointOnSketchPlane,
  principalSketchPlane,
  rotateSketchPlaneAxes,
  sketchPlaneFromFace,
} from '../source/3d/sketch-plane.js';
import {
  faceOverlapsSketchSupport,
  faceTouchesSketchSupport,
  projectModel3dEdgesToSketch,
  sectionModel3dToSketch,
  rotateSketchSupportFaceAxes,
  sketchEditReferences,
  sketchSupportBoundaryEntities,
  snapshotSketchSupportFace,
} from '../source/3d/sketch-reference.js';
import {
  addModel3dSketch,
  addModel3dLines,
  addModel3dSolid,
  createModel3d,
} from '../source/3d/model3d.js';
import {
  normalizeSolidPlacement,
  rotateSolidPlacement,
  solidLocalToWorld,
  solidWorldMatrix,
  solidWorldToLocal,
  translateSolidPlacement,
} from '../source/3d/solid-placement.js';
import {
  parseSerializedModel3d,
  serializeModel3d,
} from '../source/3d/serialization.js';
import {
  canExtrudeEntityAsProfile,
  extrudePolylineLikeEntity,
  isClosedPolylineLike,
  profilePointsFromPolylineLike,
} from '../source/3d/profile-adapter.js';
import {
  auditSolid3dTopology,
  cloneSolid3d,
  computeSolidBounds3d,
  createSolid3d,
  isValidSolid3d,
} from '../source/3d/solid.js';
import {
  booleanWeldTolerance,
  coplanarFaceTolerance,
  DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR,
  editableBooleanMeshTolerance,
  getCoplanarFaceToleranceFactor,
  minimumBooleanOperationDistance,
  normalizeCoplanarFaceToleranceFactor,
  setCoplanarFaceToleranceFactor,
} from '../source/3d/tolerances.js';
import { createViewer3d } from '../source/3d/viewer3d.js';
import { solid3dToBufferGeometry } from '../source/3d/three/solid-to-buffer-geometry.js';
import { entitiesToThreeEntityGroup } from '../source/3d/three/entity-line-objects.js';
import { visibleEntitiesForThreeView } from '../source/3d/three/entity-visibility.js';
import {
  createPushSolidMeshFromSolid,
  createPushSolidGroupFromSolid,
  createPushSolidGroup,
  isPushSolidIntegrityValid,
  movedSolidFacePush,
  PUSH_SOLID_STYLE,
  pushSourceKeyFromEntity,
  pushSourceKeyFromFace,
  setPushSolidGroupHiddenEdges,
  snapBooleanOperationDistance,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import {
  auditSolidCadTopology,
  initializeManifoldBoolean,
  isManifoldBooleanReady,
  rebuildSolidCadTopology,
  solidWithDerivedSurfaceTopology,
  subtractionCutterDistance,
} from '../source/3d/three/manifold-boolean.js';
import { pushDistanceToPoint, pushSolidForFace } from '../source/3d/three/push-command.js';
import {
  isClosedLine3dChain,
  isLine3dFinishEvent,
  coplanarLine3dPlane,
  line3dBoundaryIntersectionPoints,
  line3dEntitiesFromWorldPoints,
  line3dRecordSnapCandidates,
  line3dSupportFaceForPoints,
  splitLine3dSegmentsAtIntersections,
  transformLine3dRecords,
} from '../source/3d/three/line3d-command.js';
import {
  nearestSolidObjectSnap,
  solidObjectSnapCandidates,
} from '../source/3d/three/solid-object-snaps.js';
import { nearestSolidEdgeAtPointer } from '../source/3d/three/solid-edge-interaction.js';
import { cameraClipRangeForBounds } from '../source/3d/three/camera-clipping.js';
import {
  CAMERA_VIEW_ORIENTATIONS,
  cameraViewDirection,
  cameraViewOrientation,
  cameraViewPosition,
  cameraViewUp,
  closestCameraView,
  DEFAULT_ISOMETRIC_DIRECTION,
  DEFAULT_ISOMETRIC_VIEW_ID,
} from '../source/3d/three/camera-view-orientations.js';
import {
  cameraProjection,
  cameraProjectionForOrientation,
  CAMERA_PROJECTION_ORTHOGRAPHIC,
  CAMERA_PROJECTION_PERSPECTIVE,
  createSwitchableThreeCamera,
  setCameraProjection,
  updateCameraProjectionViewport,
} from '../source/3d/three/three-camera-projection.js';
import { cameraWorldHeight } from '../source/3d/three/three-navigation-controls.js';
import { VIEW_CUBE_AXIS_COLORS } from '../source/3d/three/three-view-cube.js';
import {
  buildPushSilhouetteSegments,
  buildPushGeneratrixSilhouetteSegments,
  updatePushSilhouetteGroup,
} from '../source/3d/three/push-silhouette.js';
import { createFaceMesh, detectSimpleClosedFaces } from '../source/3d/three/simple-faces.js';
import {
  circularCenterFromPlanarBoundary,
  createSolidFaceSelectionMesh,
  SOLID_FACE_HOVER_RENDER_ORDER,
  SOLID_FACE_SELECTION_RENDER_ORDER,
  SOLID_FACE_SUPPORT_RENDER_ORDER,
  solidFaceToLocal,
  solidFaceToWorld,
  solidFaceFromMeshHit,
  solidFaceFromPlanarGroup,
} from '../source/3d/three/solid-face-selection.js';
import {
  entitiesToThreeLines,
  entityLineSegments3d,
} from '../source/3d/three/entities-to-three-lines.js';
import {
  createSketchAxes,
  createSketchGrid,
  createWideLineSegments,
  disposeThreeObject,
  setSketchGridVisible,
  THREE_VIEW_STYLE,
} from '../source/3d/three/three-scene-style.js';

const fittedClipRange = cameraClipRangeForBounds({
  min: { x: -50, y: -25, z: 0 },
  max: { x: 50, y: 25, z: 20 },
}, { x: 0, y: -190, z: 10 });
assert.ok(fittedClipRange.near > 1);
assert.ok(fittedClipRange.far > fittedClipRange.near);
assert.ok(fittedClipRange.far / fittedClipRange.near < 100);
const fittedRadius = Math.hypot(100, 50, 20) * 0.5;
assert.ok(fittedClipRange.near < 190 - fittedRadius);
assert.ok(fittedClipRange.far > 190 + fittedRadius);
const insideClipRange = cameraClipRangeForBounds({
  min: { x: -10, y: -10, z: -10 },
  max: { x: 10, y: 10, z: 10 },
}, { x: 0, y: 0, z: 0 });
assert.ok(insideClipRange.near > 0);
assert.ok(insideClipRange.far / insideClipRange.near <= 24001);

import {
  buildWireframeSegments3d,
  drawWireframe,
  projectWireframeSegments,
  renderSolidWireframe,
} from '../source/3d/wireframe-renderer.js';
import { createWorldXYPlane, projectPointToWorkplane } from '../source/3d/workplane.js';

assert.equal(pushDistanceToPoint({
  points: [{ x: 0, y: 10, z: 0 }, { x: 10, y: 10, z: 0 }, { x: 10, y: 10, z: 10 }],
  normal: { x: 0, y: -1, z: 0 },
}, { x: 500, y: 40, z: 900 }), -30);
assert.equal(pushDistanceToPoint({
  points: [{ x: 20, y: 0, z: 0 }, { x: 20, y: 10, z: 0 }, { x: 20, y: 10, z: 10 }],
  normal: { x: -1, y: 0, z: 0 },
}, { x: 5, y: 700, z: 300 }), 15);
const alignedSnapCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
alignedSnapCamera.position.set(10, 0, 0);
alignedSnapCamera.lookAt(0, 0, 0);
alignedSnapCamera.updateProjectionMatrix();
alignedSnapCamera.updateMatrixWorld();
const alignedSnapGroup = new THREE.Group();
const alignedSnapObject = new THREE.Object3D();
alignedSnapObject.userData.solid = {
  vertices: [{ x: -5, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }],
  faces: [],
  edges: [],
  metadata: {},
};
alignedSnapGroup.add(alignedSnapObject);
assert.equal(nearestSolidObjectSnap({
  camera: alignedSnapCamera,
  canvas: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) },
  event: { clientX: 50, clientY: 50 },
  solidObjects: [alignedSnapGroup],
})?.point.x, 0);

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
const fixedFacePlane = sketchPlaneFromFace({
  sourceSolidDocumentId: 'solid3d-1',
  sourceSolidFaceIndex: 2,
  points: [
    { x: 10, y: 0, z: 2 },
    { x: 14, y: 0, z: 2 },
    { x: 14, y: 0, z: 5 },
    { x: 10, y: 0, z: 5 },
  ],
  normal: { x: 0, y: -1, z: 0 },
});
assert.ok(fixedFacePlane);
assert.deepEqual(pointOnSketchPlane({ x: 2, y: 1, z: 0 }, fixedFacePlane), { x: 12, y: 0, z: 3 });
assert.deepEqual(pointFromSketchPlane({ x: 12, y: 0, z: 3 }, fixedFacePlane), { x: 2, y: 1, z: 0 });
assert.deepEqual(principalSketchPlane('YZ').normal, { x: 1, y: 0, z: 0 });
const fixedSketchFace = faceOnSketchPlane({
  id: 'fixed-sketch-square',
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 0, y: 1, z: 0 },
  ],
  holes: [],
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
}, fixedFacePlane, 'sketch3d-7');
const fixedSketchSolid = solidFromFacePush(fixedSketchFace, 2);
assert.equal(fixedSketchSolid.metadata.sketchId, 'sketch3d-7');
assert.equal(fixedSketchSolid.metadata.workplane.type, 'fixed');
assert.deepEqual(fixedSketchSolid.metadata.normal, { x: 0, y: -1, z: 0 });
assert.ok(fixedSketchSolid.vertices.some((point) => Math.abs(point.y + 2) < 1e-9));
assert.equal(pushSourceKeyFromFace({
  sketchId: 'sketch3d-7',
  sourceEntity: { type: 'LINE', id: 'edge-1' },
}), 'sketch3d-7:LINE:edge-1');
const referencePrism = {
  visible: true,
  id: 'solid3d-reference',
  solid: {
    vertices: [
      { x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 },
      { x: 4, y: 3, z: 0 }, { x: 0, y: 3, z: 0 },
      { x: 0, y: 0, z: 2 }, { x: 4, y: 0, z: 2 },
      { x: 4, y: 3, z: 2 }, { x: 0, y: 3, z: 2 },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ],
    faces: [
      [3, 2, 1, 0], [4, 5, 6, 7],
      [0, 1, 5, 4], [1, 2, 6, 5],
      [2, 3, 7, 6], [3, 0, 4, 7],
    ],
  },
};
const line3dClosedPoints = [
  { x: 0, y: 0, z: 0 },
  { x: 4, y: 0, z: 0 },
  { x: 4, y: 3, z: 0 },
  { x: 0, y: 3, z: 0 },
  { x: 0, y: 0, z: 0 },
];
const line3dEntities = line3dEntitiesFromWorldPoints(
  line3dClosedPoints,
  principalSketchPlane('XY'),
);
assert.equal(line3dEntities.length, 4);
assert.equal(isClosedLine3dChain(line3dClosedPoints), true);
assert.equal(detectSimpleClosedFaces(line3dEntities).length, 1);
const line3dDivider = line3dEntitiesFromWorldPoints([
  { x: 0, y: 1.5, z: 0 },
  { x: 4, y: 1.5, z: 0 },
], principalSketchPlane('XY'));
assert.equal(detectSimpleClosedFaces([
  ...line3dEntities,
  ...line3dDivider,
]).length, 2);
const spatialLineModel = createModel3d();
const spatialLineRecords = addModel3dLines(spatialLineModel, [
  { start: { x: 0, y: 0, z: 0 }, end: { x: 4, y: 0, z: 0 } },
  { start: { x: 4, y: 0, z: 0 }, end: { x: 4, y: 3, z: 2 } },
  { start: { x: 4, y: 3, z: 2 }, end: { x: 0, y: 3, z: 0 } },
]);
assert.equal(spatialLineRecords.length, 3);
assert.equal(spatialLineModel.lines[1].end.z, 2);
assert.deepEqual(
  parseSerializedModel3d(serializeModel3d(spatialLineModel)).lines,
  spatialLineModel.lines,
);
const spatialLineSnaps = line3dRecordSnapCandidates(spatialLineRecords);
assert.equal(spatialLineSnaps.length, 7);
assert.ok(spatialLineSnaps.some((snap) =>
  snap.type === 'endpoint' && snap.point.z === 2));
assert.ok(spatialLineSnaps.some((snap) =>
  snap.type === 'midpoint' &&
  snap.point.x === 2 && snap.point.y === 0 && snap.point.z === 0));
assert.equal(line3dRecordSnapCandidates(spatialLineRecords.map((line) => ({
  ...line,
  visible: false,
}))).length, 0);
assert.equal(isLine3dFinishEvent({ key: 'Enter' }), true);
assert.equal(isLine3dFinishEvent({ key: ' ' }), true);
assert.equal(isLine3dFinishEvent({ button: 2 }), true);
assert.equal(isLine3dFinishEvent({ button: 0 }), false);
assert.equal(isLine3dFinishEvent({ key: 'Enter' }, { hasInput: true }), false);
assert.equal(coplanarLine3dPlane(spatialLineRecords), null);
const movedSpatialLines = transformLine3dRecords(spatialLineRecords, {
  type: 'translate',
  displacement: { x: 10, y: -5, z: 2 },
});
assert.deepEqual(movedSpatialLines[0].start, { x: 10, y: -5, z: 2 });
const rotatedSpatialLines = transformLine3dRecords([spatialLineRecords[0]], {
  type: 'rotate',
  axisStart: { x: 0, y: 0, z: 0 },
  axisEnd: { x: 0, y: 0, z: 1 },
  angleDegrees: 90,
});
assert.ok(Math.abs(rotatedSpatialLines[0].end.x) < 1e-9);
assert.ok(Math.abs(rotatedSpatialLines[0].end.y - 4) < 1e-9);
const coplanarSpatialRecords = addModel3dLines(createModel3d(), [
  { start: line3dClosedPoints[0], end: line3dClosedPoints[1] },
  { start: line3dClosedPoints[1], end: line3dClosedPoints[2] },
  { start: line3dClosedPoints[2], end: line3dClosedPoints[3] },
  { start: line3dClosedPoints[3], end: line3dClosedPoints[4] },
]);
assert.ok(coplanarLine3dPlane(coplanarSpatialRecords));
const inclinedLine3dPoints = [
  { x: 0, y: 0, z: 0 },
  { x: 4, y: 0, z: 4 },
  { x: 4, y: 3, z: 4 },
  { x: 0, y: 3, z: 0 },
  { x: 0, y: 0, z: 0 },
];
const inclinedLine3dRecords = addModel3dLines(createModel3d(),
  inclinedLine3dPoints.slice(0, -1).map((start, index) => ({
    start,
    end: inclinedLine3dPoints[index + 1],
  })));
const inclinedLine3dPlane = coplanarLine3dPlane(inclinedLine3dRecords);
assert.ok(inclinedLine3dPlane);
assert.ok(Math.abs(inclinedLine3dPlane.normal.x) > 0.5);
assert.equal(detectSimpleClosedFaces(
  inclinedLine3dRecords.flatMap((line) =>
    line3dEntitiesFromWorldPoints([line.start, line.end], inclinedLine3dPlane)),
).length, 1);
const verticalSupportFace = {
  points: [
    { x: 0, y: 5, z: 0 },
    { x: 4, y: 5, z: 0 },
    { x: 4, y: 5, z: 3 },
    { x: 0, y: 5, z: 3 },
  ],
  holes: [],
  normal: { x: 0, y: 1, z: 0 },
};
const diagonalSupportMatch = line3dSupportFaceForPoints([
  { x: 0, y: 5, z: 0 },
  { x: 4, y: 5, z: 3 },
], [verticalSupportFace]);
assert.equal(diagonalSupportMatch.face, verticalSupportFace);
assert.equal(line3dSupportFaceForPoints([
  { x: 0, y: 5, z: 0 },
  { x: 4, y: 5.01, z: 3 },
], [verticalSupportFace]), null);
const pentagonSideSupportFace = {
  points: [
    { x: -40.01228713989258, y: -23.10089111328125, z: 29.80724334716797 },
    { x: 40.01210403442383, y: 23.101211547851562, z: 29.80724334716797 },
    { x: 40.01210403442383, y: 23.101211547851562, z: 59.61448669433594 },
    { x: -40.01228713989258, y: -23.10089111328125, z: 59.61448669433594 },
  ],
  holes: [],
  normal: { x: 0.5, y: -0.8660254037844386, z: 0 },
  sourceSolid: {
    vertices: [
      { x: -40.01228713989258, y: -23.101104736328125, z: 0 },
      { x: 40.01210403442383, y: 69.30331420898438, z: 59.61448669433594 },
    ],
  },
  sourceSolidDocumentId: 'solid3d-pentagon',
  sourceSolidFaceIndices: [8, 26],
};
const pentagonDiagonalPoints = [
  { x: -40.01228713989258, y: -23.101104736328125, z: 29.80724334716797 },
  { x: 40.01210403442383, y: 23.101211547851562, z: 59.61448669433594 },
];
const pentagonSupportMatch = line3dSupportFaceForPoints(
  pentagonDiagonalPoints,
  [pentagonSideSupportFace],
);
assert.equal(pentagonSupportMatch.face, pentagonSideSupportFace);
const pentagonSupportSketch = {
  id: 'sketch3d-pentagon-side',
  plane: pentagonSupportMatch.plane,
  metadata: {
    supportFace: snapshotSketchSupportFace(
      pentagonSupportMatch.face,
      pentagonSupportMatch.plane,
    ),
  },
};
assert.equal(detectSimpleClosedFaces([
  ...sketchSupportBoundaryEntities(pentagonSupportSketch),
  ...line3dEntitiesFromWorldPoints(
    pentagonDiagonalPoints,
    pentagonSupportMatch.plane,
  ),
]).length, 2);
assert.equal(line3dSupportFaceForPoints([
  { x: -2, y: 5, z: 1.5 },
  { x: 6, y: 5, z: 1.5 },
], [verticalSupportFace]), null);
assert.equal(line3dSupportFaceForPoints([
  { x: -2, y: 5, z: 1.5 },
  { x: 6, y: 5, z: 1.5 },
], [verticalSupportFace], 1e-6, { allowCrossing: true }).face, verticalSupportFace);
const vertexSplit = splitLine3dSegmentsAtIntersections({
  newSegments: [{
    start: { x: 0, y: 0, z: 0 },
    end: { x: 10, y: 0, z: 0 },
  }],
  splitPoints: [{ x: 4, y: 0, z: 0 }],
  tolerance: 1e-7,
});
assert.deepEqual(vertexSplit.newSegments, [{
  start: { x: 0, y: 0, z: 0 },
  end: { x: 4, y: 0, z: 0 },
}, {
  start: { x: 4, y: 0, z: 0 },
  end: { x: 10, y: 0, z: 0 },
}]);
const crossingSplit = splitLine3dSegmentsAtIntersections({
  existingLines: [{
    id: 'line3d-crossed',
    type: 'LINE3D',
    start: { x: 5, y: -5, z: 0 },
    end: { x: 5, y: 5, z: 0 },
  }],
  newSegments: [{
    start: { x: 0, y: 0, z: 0 },
    end: { x: 10, y: 0, z: 0 },
  }],
  tolerance: 1e-7,
});
assert.deepEqual(crossingSplit.touchedExistingLineIds, ['line3d-crossed']);
assert.equal(crossingSplit.existingReplacements[0].segments.length, 2);
assert.equal(crossingSplit.newSegments.length, 2);
assert.deepEqual(crossingSplit.existingReplacements[0].segments[0].end, {
  x: 5,
  y: 0,
  z: 0,
});
assert.deepEqual(crossingSplit.newSegments[0].end, { x: 5, y: 0, z: 0 });
const skewSplit = splitLine3dSegmentsAtIntersections({
  existingLines: [{
    id: 'line3d-skew',
    type: 'LINE3D',
    start: { x: 5, y: -5, z: 1 },
    end: { x: 5, y: 5, z: 1 },
  }],
  newSegments: [{
    start: { x: 0, y: 0, z: 0 },
    end: { x: 10, y: 0, z: 0 },
  }],
  tolerance: 1e-7,
});
assert.equal(skewSplit.existingReplacements.length, 0);
assert.equal(skewSplit.newSegments.length, 1);
const circularBoundaryIntersections = line3dBoundaryIntersectionPoints([
  { x: -10, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
], principalSketchPlane('XY'), [{
  type: 'CIRCLE',
  center: { x: 0, y: 0, z: 0 },
  radius: 5,
}]);
assert.deepEqual(circularBoundaryIntersections, [
  { x: -5, y: 0, z: 0 },
  { x: 5, y: 0, z: 0 },
]);
const arcBoundaryIntersections = line3dBoundaryIntersectionPoints([
  { x: 0, y: -10, z: 0 },
  { x: 0, y: 10, z: 0 },
], principalSketchPlane('XY'), [{
  type: 'ARC',
  center: { x: 0, y: 0, z: 0 },
  radius: 5,
  startAngle: 0,
  endAngle: Math.PI,
  clockwise: true,
}]);
assert.equal(arcBoundaryIntersections.length, 1);
assert.ok(Math.abs(arcBoundaryIntersections[0].y + 5) <= 1e-12);
const circularLineSplit = splitLine3dSegmentsAtIntersections({
  newSegments: [{
    start: { x: -10, y: 0, z: 0 },
    end: { x: 10, y: 0, z: 0 },
  }],
  splitPoints: circularBoundaryIntersections,
  tolerance: 1e-7,
});
assert.equal(circularLineSplit.newSegments.length, 3);
const circularCurveEntity = {
  type: 'CIRCLE',
  id: 'line3d-analytic-circle-boundary',
  center: { x: 0, y: 0, z: 0 },
  radius: 5,
};
assert.equal(detectSimpleClosedFaces([
  circularCurveEntity,
  ...circularLineSplit.newSegments.map((segment, index) => ({
    ...segment,
    type: 'LINE',
    id: `line3d-circle-divider-${index}`,
  })),
]).length, 2);
assert.equal(circularCurveEntity.type, 'CIRCLE');
const ellipseBoundaryIntersections = line3dBoundaryIntersectionPoints([
  { x: -10, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
], principalSketchPlane('XY'), [{
  type: 'ELLIPSE',
  center: { x: 0, y: 0, z: 0 },
  radiusX: 6,
  radiusY: 3,
  rotation: 0,
}]);
assert.equal(ellipseBoundaryIntersections.length, 2);
assert.ok(Math.abs(ellipseBoundaryIntersections[0].x + 6) <= 1e-12);
assert.ok(Math.abs(ellipseBoundaryIntersections[1].x - 6) <= 1e-12);
assert.equal(ellipseBoundaryIntersections.every((point) =>
  Math.abs(point.y) <= 1e-12 && Math.abs(point.z) <= 1e-12), true);
const ellipseArcBoundaryIntersections = line3dBoundaryIntersectionPoints([
  { x: 0, y: -10, z: 0 },
  { x: 0, y: 10, z: 0 },
], principalSketchPlane('XY'), [{
  type: 'ELLIPSE_ARC',
  center: { x: 0, y: 0, z: 0 },
  radiusX: 6,
  radiusY: 3,
  rotation: 0,
  startParameter: 0,
  endParameter: Math.PI,
  clockwise: true,
}]);
assert.equal(ellipseArcBoundaryIntersections.length, 1);
assert.ok(Math.abs(ellipseArcBoundaryIntersections[0].y + 3) <= 1e-12);
const identityPlacement = normalizeSolidPlacement();
assert.deepEqual(identityPlacement, {
  position: { x: 0, y: 0, z: 0 },
  quaternion: { x: 0, y: 0, z: 0, w: 1 },
});
const movedPlacement = translateSolidPlacement(identityPlacement, { x: 3, y: -4, z: 5 });
assert.deepEqual(movedPlacement.position, { x: 3, y: -4, z: 5 });
assert.deepEqual(solidWorldMatrix(movedPlacement).slice(12, 15), [3, -4, 5]);
assert.deepEqual(
  solidWorldToLocal(solidLocalToWorld({ x: 7, y: 8, z: 9 }, movedPlacement), movedPlacement),
  { x: 7, y: 8, z: 9 },
);
const hoveredFaceWorld = solidFaceToWorld({
  id: 'moved-hover-face',
  exactProfile: { type: 'local-profile-must-not-drive-world-overlay' },
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
}, {
  position: { x: 10, y: 20, z: 30 },
  quaternion: {
    x: 0,
    y: 0,
    z: Math.sin(Math.PI / 4),
    w: Math.cos(Math.PI / 4),
  },
});
assert.ok(Math.abs(hoveredFaceWorld.points[0].x - 10) < 1e-9);
assert.ok(Math.abs(hoveredFaceWorld.points[0].y - 20) < 1e-9);
assert.ok(Math.abs(hoveredFaceWorld.points[1].x - 10) < 1e-9);
assert.ok(Math.abs(hoveredFaceWorld.points[1].y - 22) < 1e-9);
assert.deepEqual(hoveredFaceWorld.normal, { x: 0, y: 0, z: 1 });
assert.equal('exactProfile' in hoveredFaceWorld, false);
const rotate90X = rotateSolidPlacement({
  position: { x: 0, y: 1, z: 0 },
}, {
  axisStart: { x: 0, y: 0, z: 0 },
  axisEnd: { x: 1, y: 0, z: 0 },
  angleDegrees: 90,
});
assert.ok(Math.abs(rotate90X.position.y) < 1e-9);
assert.ok(Math.abs(rotate90X.position.z - 1) < 1e-9);
const rotate90Y = rotateSolidPlacement({
  position: { x: 1, y: 0, z: 0 },
}, {
  axisStart: { x: 0, y: 0, z: 0 },
  axisEnd: { x: 0, y: 1, z: 0 },
  angleDegrees: 90,
});
assert.ok(Math.abs(rotate90Y.position.x) < 1e-9);
assert.ok(Math.abs(rotate90Y.position.z + 1) < 1e-9);
const rotate90Z = rotateSolidPlacement({
  position: { x: 1, y: 0, z: 0 },
}, {
  axisStart: { x: 0, y: 0, z: 0 },
  axisEnd: { x: 0, y: 0, z: 1 },
  angleDegrees: 90,
});
assert.ok(Math.abs(rotate90Z.position.x) < 1e-9);
assert.ok(Math.abs(rotate90Z.position.y - 1) < 1e-9);
const arbitraryAxisStart = { x: 2, y: -1, z: 3 };
const arbitraryAxisEnd = { x: 5, y: 1, z: 7 };
const arbitraryPlacement = rotateSolidPlacement({
  position: { x: 8, y: 4, z: -2 },
}, {
  axisStart: arbitraryAxisStart,
  axisEnd: arbitraryAxisEnd,
  angleDegrees: -37,
});
const distanceToAxis = (point) => {
  const start = new THREE.Vector3(
    arbitraryAxisStart.x,
    arbitraryAxisStart.y,
    arbitraryAxisStart.z,
  );
  const axis = new THREE.Vector3(
    arbitraryAxisEnd.x - arbitraryAxisStart.x,
    arbitraryAxisEnd.y - arbitraryAxisStart.y,
    arbitraryAxisEnd.z - arbitraryAxisStart.z,
  ).normalize();
  return new THREE.Vector3(point.x, point.y, point.z)
    .sub(start)
    .cross(axis)
    .length();
};
assert.ok(Math.abs(
  distanceToAxis({ x: 8, y: 4, z: -2 }) -
  distanceToAxis(arbitraryPlacement.position),
) < 1e-9);
const fullTurn = rotateSolidPlacement(movedPlacement, {
  axisStart: { x: 1, y: 2, z: 3 },
  axisEnd: { x: 2, y: 4, z: 6 },
  angleDegrees: 360,
});
assert.ok(Math.abs(fullTurn.position.x - movedPlacement.position.x) < 1e-9);
assert.ok(Math.abs(fullTurn.position.y - movedPlacement.position.y) < 1e-9);
assert.ok(Math.abs(fullTurn.position.z - movedPlacement.position.z) < 1e-9);
assert.ok(Math.abs(fullTurn.quaternion.w - 1) < 1e-9);
const placementRoundTripModel = createModel3d();
const placementRecord = addModel3dSolid(placementRoundTripModel, referencePrism.solid, {
  placement: arbitraryPlacement,
});
const parsedPlacementModel = parseSerializedModel3d(JSON.parse(JSON.stringify(
  serializeModel3d(placementRoundTripModel),
)));
assert.deepEqual(parsedPlacementModel.solids[0].placement, placementRecord.placement);
const legacyPlacementModel = parseSerializedModel3d({
  ...serializeModel3d(placementRoundTripModel),
  solids: [{
    ...serializeModel3d(placementRoundTripModel).solids[0],
    placement: undefined,
  }],
});
assert.deepEqual(legacyPlacementModel.solids[0].placement, identityPlacement);
const snapRoot = new THREE.Group();
snapRoot.position.set(10, 20, 30);
snapRoot.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
const snapMesh = new THREE.Mesh();
snapMesh.userData.solid = referencePrism.solid;
snapMesh.userData.documentSolidId = referencePrism.id;
snapRoot.add(snapMesh);
snapRoot.updateMatrixWorld(true);
const transformedSnaps = solidObjectSnapCandidates([snapRoot]);
assert.deepEqual(transformedSnaps[0], {
  type: 'origin',
  point: { x: 0, y: 0, z: 0 },
  localPoint: { x: 0, y: 0, z: 0 },
  documentSolidId: null,
  alwaysVisible: true,
});
const transformedOriginSnap = transformedSnaps.find((snap) =>
  snap.type === 'endpoint' && snap.localPoint.x === 0 &&
  snap.localPoint.y === 0 && snap.localPoint.z === 0);
assert.deepEqual(transformedOriginSnap.point, { x: 10, y: 20, z: 30 });
assert.deepEqual(transformedOriginSnap.localPoint, { x: 0, y: 0, z: 0 });
assert.equal(solidObjectSnapCandidates([snapRoot], {
  excludeDocumentSolidIds: [referencePrism.id],
}).length, 1);
const occludedSnapSolid = solidFromFacePush({
  id: 'occluded-snap-prism',
  points: referencePrism.solid.vertices.slice(0, 4),
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
}, 2);
const occludedSnapGroup = createPushSolidGroupFromSolid(occludedSnapSolid);
const occludedSnapCamera = new THREE.OrthographicCamera(-1, 5, 4, -1, 0.1, 100);
occludedSnapCamera.position.set(0, 0, 10);
occludedSnapCamera.lookAt(0, 0, 0);
occludedSnapCamera.updateProjectionMatrix();
occludedSnapCamera.updateMatrixWorld(true);
occludedSnapGroup.updateMatrixWorld(true);
const occludedProjection = new THREE.Vector3(0, 0, 0).project(occludedSnapCamera);
const occludedCanvasRect = { left: 0, top: 0, width: 200, height: 200 };
const occludedPointerEvent = {
  clientX: (occludedProjection.x + 1) * occludedCanvasRect.width * 0.5,
  clientY: (1 - occludedProjection.y) * occludedCanvasRect.height * 0.5,
};
const acceptsOccludedOrigin = (candidate) =>
  candidate.type === 'endpoint' &&
  candidate.localPoint.x === 0 &&
  candidate.localPoint.y === 0 &&
  candidate.localPoint.z === 0;
assert.equal(nearestSolidObjectSnap({
  camera: occludedSnapCamera,
  canvas: { getBoundingClientRect: () => occludedCanvasRect },
  event: occludedPointerEvent,
  solidObjects: [occludedSnapGroup],
  acceptCandidate: acceptsOccludedOrigin,
}), null);
assert.deepEqual(nearestSolidObjectSnap({
  camera: occludedSnapCamera,
  canvas: { getBoundingClientRect: () => occludedCanvasRect },
  event: occludedPointerEvent,
  solidObjects: [occludedSnapGroup],
  acceptCandidate: acceptsOccludedOrigin,
  includeHidden: true,
})?.point, { x: 0, y: 0, z: 0 });
disposeThreeObject(occludedSnapGroup);
const localPushFace = {
  sourceSolid: referencePrism.solid,
  sourceSolidFaceIndex: 1,
  sourceSolidFaceIndices: [1],
  points: referencePrism.solid.faces[1].map((index) => referencePrism.solid.vertices[index]),
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
};
const transformedPushResult = pushSolidForFace({
  localFace: localPushFace,
  placement: arbitraryPlacement,
  points: localPushFace.points.map((point) => solidLocalToWorld(point, arbitraryPlacement)),
}, 1);
assert.ok(transformedPushResult);
assert.deepEqual(transformedPushResult.vertices.slice(0, 4), referencePrism.solid.vertices.slice(0, 4));
assert.deepEqual(referencePrism.solid.vertices[4], { x: 0, y: 0, z: 2 });
const topReference = projectModel3dEdgesToSketch(
  { solids: [referencePrism] },
  principalSketchPlane('XY'),
);
assert.equal(topReference.length, 4);
assert.ok(topReference.every((segment) => segment.sourceSolidId === 'solid3d-reference'));
assert.ok(topReference.some((segment) => segment.start.y === -3 || segment.end.y === -3));
const frontReference = projectModel3dEdgesToSketch(
  { solids: [referencePrism] },
  principalSketchPlane('XZ'),
);
assert.equal(frontReference.length, 4);
const displacedReferencePrism = {
  ...referencePrism,
  placement: {
    position: { x: 100, y: 20, z: 30 },
    quaternion: { x: 0, y: 0, z: 0, w: 1 },
  },
};
const displacedFrontPlane = {
  type: 'fixed',
  origin: { x: 100, y: 20, z: 30 },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 0, z: 1 },
  normal: { x: 0, y: -1, z: 0 },
};
const displacedFrontReference = projectModel3dEdgesToSketch(
  { solids: [displacedReferencePrism] },
  displacedFrontPlane,
);
assert.equal(displacedFrontReference.length, 4);
assert.ok(displacedFrontReference.every((segment) =>
  [segment.start.x, segment.end.x].every((value) => value >= -1e-9 && value <= 4 + 1e-9) &&
  [segment.start.y, segment.end.y].every((value) => value >= -2 - 1e-9 && value <= 1e-9)));
const middleSection = sectionModel3dToSketch({ solids: [referencePrism] }, {
  type: 'fixed',
  origin: { x: 0, y: 1.5, z: 0 },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 0, z: 1 },
  normal: { x: 0, y: 1, z: 0 },
});
assert.equal(middleSection.length, 4);
assert.equal(sectionModel3dToSketch({ solids: [referencePrism] }, {
  type: 'fixed',
  origin: { x: 5, y: 0, z: 0 },
  xAxis: { x: 0, y: 1, z: 0 },
  yAxis: { x: 0, y: 0, z: 1 },
  normal: { x: 1, y: 0, z: 0 },
}).length, 0);
const supportSnapshot = snapshotSketchSupportFace({
  sourceSolidDocumentId: 'solid3d-reference',
  sourceSolidFaceIndex: 1,
  points: [
    { x: 0, y: 0, z: 2 }, { x: 4, y: 0, z: 2 },
    { x: 4, y: 3, z: 2 }, { x: 0, y: 3, z: 2 },
  ],
  holes: [],
}, principalSketchPlane('XY'));
const supportSketch = {
  id: 'sketch3d-support',
  plane: principalSketchPlane('XY'),
  metadata: { supportFace: supportSnapshot },
};
const triangulatedReferencePrism = {
  ...referencePrism,
  solid: {
    ...referencePrism.solid,
    edges: [...referencePrism.solid.edges, [4, 6]],
  },
};
const cleanSupportSection = sketchEditReferences(
  { solids: [triangulatedReferencePrism] },
  supportSketch.plane,
  { mode: 'section', sketch: supportSketch },
);
assert.equal(cleanSupportSection.length, 4);
assert.equal(cleanSupportSection.some((reference) =>
  Math.hypot(
    reference.end.x - reference.start.x,
    reference.end.y - reference.start.y,
  ) > 4), false);
assert.equal(sketchEditReferences(
  { solids: [triangulatedReferencePrism] },
  supportSketch.plane,
  { mode: 'projection', sketch: supportSketch },
).length, 4);
assert.equal(sketchEditReferences(
  { solids: [referencePrism] },
  {
    type: 'fixed',
    origin: { x: 0, y: 1.5, z: 0 },
    xAxis: { x: 1, y: 0, z: 0 },
    yAxis: { x: 0, y: 0, z: 1 },
    normal: { x: 0, y: 1, z: 0 },
  },
  { mode: 'section', sketch: { metadata: {} } },
).length, 4);
function analyticSupportModel(id, segment) {
  return {
    solids: [{
      id,
      solid: {
        metadata: {
          exactGeometry: {
            base: {
              extrusion: {
                distance: 2,
                offset: { x: 0, y: 0, z: 2 },
                profile: {
                  plane: {
                    type: 'plane',
                    origin: { x: 0, y: 0, z: 0 },
                    xAxis: { x: 1, y: 0, z: 0 },
                    yAxis: { x: 0, y: 1, z: 0 },
                    normal: { x: 0, y: 0, z: 1 },
                  },
                  outerLoop: { segments: [segment] },
                  innerLoops: [],
                },
              },
            },
          },
        },
      },
    }],
  };
}
const sampledSemicircle = Array.from({ length: 13 }, (_, index) => {
  const angle = Math.PI * index / 12;
  return { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5, z: 0 };
});
const circularSectionSketch = {
  id: 'sketch3d-circular-section',
  plane: principalSketchPlane('XY'),
  metadata: {
    supportFace: {
      sourceSolidId: 'solid3d-circular-section',
      outerLoop: sampledSemicircle,
      innerLoops: [],
    },
  },
};
const circularSectionReferences = sketchEditReferences(
  analyticSupportModel('solid3d-circular-section', {
    type: 'circle',
    center: { x: 0, y: 0, z: 0 },
    radius: 5,
  }),
  circularSectionSketch.plane,
  { mode: 'section', sketch: circularSectionSketch },
);
assert.deepEqual(
  circularSectionReferences.map((reference) => reference.type).sort(),
  ['arc', 'line'],
);
assert.ok(Math.abs(circularSectionReferences.find((reference) =>
  reference.type === 'arc').radius - 5) < 1e-9);
const circularSupportModel = analyticSupportModel('solid3d-circular-section', {
  type: 'circle',
  center: { x: 0, y: 0, z: 0 },
  radius: 5,
});
const legacyCircularDivider = {
  type: 'LINE',
  id: 'legacy-circular-divider',
  start: { x: 0, y: 0, z: 0 },
  end: { x: 0, y: 5, z: 0 },
};
const legacyCircularFaces = detectSimpleClosedFaces([
  legacyCircularDivider,
  ...sketchSupportBoundaryEntities(circularSectionSketch, circularSupportModel),
]);
assert.equal(legacyCircularFaces.length, 2);
assert.equal(legacyCircularFaces.every((face) =>
  face.sourceEntities.includes(legacyCircularDivider)), true);
assert.equal(legacyCircularFaces.every((face) =>
  face.exactProfile.outerLoop.segments.some((segment) => segment.type === 'arc-circle')), true);
const ellipseRotation = Math.PI / 7;
const ellipseArcSweep = Math.PI / 6;
const ellipsePointForTest = (parameter) => ({
  x: Math.cos(parameter) * 6 * Math.cos(ellipseRotation) -
    Math.sin(parameter) * 2 * Math.sin(ellipseRotation),
  y: Math.cos(parameter) * 6 * Math.sin(ellipseRotation) +
    Math.sin(parameter) * 2 * Math.cos(ellipseRotation),
  z: 0,
});
const ellipseArcSegment = {
  type: 'arc-ellipse',
  center: { x: 0, y: 0, z: 0 },
  radiusX: 6,
  radiusY: 2,
  rotation: ellipseRotation,
  startAngle: 0,
  endAngle: ellipseArcSweep,
  clockwise: true,
  start: ellipsePointForTest(0),
  end: ellipsePointForTest(ellipseArcSweep),
};
const ellipticalSectionSketch = {
  id: 'sketch3d-elliptical-section',
  plane: principalSketchPlane('XY'),
  metadata: {
    supportFace: {
      sourceSolidId: 'solid3d-elliptical-section',
      outerLoop: [
        ...Array.from({ length: 13 }, (_, index) =>
          ellipsePointForTest(ellipseArcSweep * index / 12)),
      ],
      innerLoops: [],
    },
  },
};
const ellipticalSectionReferences = sketchEditReferences(
  analyticSupportModel('solid3d-elliptical-section', ellipseArcSegment),
  ellipticalSectionSketch.plane,
  { mode: 'section', sketch: ellipticalSectionSketch },
);
assert.deepEqual(
  ellipticalSectionReferences.map((reference) => reference.type).sort(),
  ['ellipse-arc', 'line'],
);
const ellipticalSectionArc = ellipticalSectionReferences.find((reference) =>
  reference.type === 'ellipse-arc');
assert.ok(Math.abs(ellipticalSectionArc.radiusX - 6) < 1e-9);
assert.ok(Math.abs(ellipticalSectionArc.radiusY - 2) < 1e-9);
assert.equal(ellipticalSectionArc.clockwise, true);
assert.equal(faceOverlapsSketchSupport({
  points: [
    { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 2, y: 2 }, { x: 1, y: 2 },
  ],
  holes: [],
}, supportSnapshot), true);
assert.equal(faceOverlapsSketchSupport({
  points: [
    { x: 1, y: 4 }, { x: 2, y: 4 },
    { x: 2, y: 5 }, { x: 1, y: 5 },
  ],
  holes: [],
}, supportSnapshot), false);
const tangentOutsideSupportFace = {
  points: [
    { x: 1, y: 3 }, { x: 2, y: 3 },
    { x: 2, y: 4 }, { x: 1, y: 4 },
  ],
  holes: [],
};
assert.equal(faceOverlapsSketchSupport(tangentOutsideSupportFace, supportSnapshot), false);
assert.equal(faceTouchesSketchSupport(tangentOutsideSupportFace, supportSnapshot), true);
assert.equal(faceTouchesSketchSupport({
  points: [
    { x: 4, y: 3 }, { x: 5, y: 3 },
    { x: 5, y: 4 }, { x: 4, y: 4 },
  ],
  holes: [],
}, supportSnapshot), false);
assert.equal(faceOverlapsSketchSupport({
  points: [
    { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 2, y: 2 }, { x: 1, y: 2 },
  ],
  holes: [],
}, {
  ...supportSnapshot,
  innerLoops: [[
    { x: 0.5, y: -0.5 }, { x: 2.5, y: -0.5 },
    { x: 2.5, y: -2.5 }, { x: 0.5, y: -2.5 },
  ]],
}), false);
const dividedSupportFaces = detectSimpleClosedFaces([
  ...sketchSupportBoundaryEntities(supportSketch),
  { type: 'LINE', start: { x: 2, y: 0 }, end: { x: 2, y: -3 } },
]);
assert.equal(dividedSupportFaces.length, 2);
assert.ok(Math.abs(Math.min(
  ...dividedSupportFaces.flatMap((face) => face.points.map((point) => point.y)),
)) < 1e-12);
assert.equal(Math.max(...dividedSupportFaces.flatMap((face) => face.points.map((point) => point.y))), 3);
const diagonalSupportFaces = detectSimpleClosedFaces([
  ...sketchSupportBoundaryEntities(supportSketch),
  { type: 'LINE', start: { x: 0, y: 0 }, end: { x: 4, y: -3 } },
]);
assert.equal(diagonalSupportFaces.length, 2);
assert.equal(diagonalSupportFaces.every((face) =>
  Math.abs(face.area - 6) <= 1e-9), true);
const notchedSupportSketch = {
  id: 'sketch3d-notched-support',
  metadata: {
    supportFace: {
      outerLoop: [
        { x: 0, y: 0 }, { x: 10, y: 0 },
        { x: 10, y: 3 }, { x: 8, y: 5 },
        { x: 10, y: 7 }, { x: 10, y: 10 },
        { x: 0, y: 10 },
      ],
      innerLoops: [],
      boundaries: [
        { type: 'line', start: { x: 0, y: 0 }, end: { x: 10, y: 0 } },
        { type: 'line', start: { x: 10, y: 0 }, end: { x: 10, y: 3 } },
        {
          type: 'arc',
          center: { x: 10, y: 5 },
          radius: 2,
          startAngle: -Math.PI / 2,
          endAngle: Math.PI / 2,
          clockwise: false,
        },
        { type: 'line', start: { x: 10, y: 7 }, end: { x: 10, y: 10 } },
        { type: 'line', start: { x: 10, y: 10 }, end: { x: 0, y: 10 } },
        { type: 'line', start: { x: 0, y: 10 }, end: { x: 0, y: 0 } },
      ],
    },
  },
};
const notchedDivider = {
  type: 'LINE',
  id: 'notched-divider',
  start: { x: 0, y: 5 },
  end: { x: 8, y: 5 },
};
const dividedNotchedFaces = detectSimpleClosedFaces([
  ...sketchSupportBoundaryEntities(notchedSupportSketch),
  notchedDivider,
]);
assert.equal(dividedNotchedFaces.length, 2);
assert.equal(new Set(dividedNotchedFaces.map((face) => face.id)).size, 2);
assert.equal(dividedNotchedFaces.every((face) =>
  face.sourceEntities.includes(notchedDivider)), true);
assert.equal(dividedNotchedFaces.every((face) =>
  face.exactProfile.outerLoop.segments.some((segment) => segment.type === 'arc-circle')), true);
const dividedNotchedMeshes = dividedNotchedFaces.map(createFaceMesh);
assert.equal(dividedNotchedMeshes.every((mesh, index) =>
  mesh.userData.face === dividedNotchedFaces[index]), true);
dividedNotchedMeshes.forEach((mesh) => {
  mesh.geometry.dispose();
  mesh.material.dispose();
});
const coincidentBandSupport = {
  id: 'sketch3d-coincident-band',
  metadata: {
    supportFace: {
      outerLoop: [
        { x: 0, y: 0 }, { x: 10, y: 0 },
        { x: 10, y: 10 }, { x: 0, y: 10 },
      ],
      innerLoops: [],
    },
  },
};
const coincidentBandFaces = detectSimpleClosedFaces([
  { type: 'LINE', start: { x: 0, y: 3 }, end: { x: 10, y: 3 } },
  { type: 'LINE', start: { x: 10, y: 3 }, end: { x: 10, y: 5 } },
  { type: 'LINE', start: { x: 10, y: 5 }, end: { x: 0, y: 5 } },
  { type: 'LINE', start: { x: 0, y: 5 }, end: { x: 0, y: 3 } },
  ...sketchSupportBoundaryEntities(coincidentBandSupport),
]);
assert.equal(coincidentBandFaces.length, 3);
assert.deepEqual(coincidentBandFaces.map((face) => face.area).sort((a, b) => a - b), [20, 30, 50]);
const coincidentCornerFaces = detectSimpleClosedFaces([
  {
    type: 'ARC', center: { x: 2, y: 2 }, radius: 2,
    startAngle: Math.PI, endAngle: Math.PI * 1.5, clockwise: true,
  },
  { type: 'LINE', start: { x: 0, y: 2 }, end: { x: 0, y: 0 } },
  { type: 'LINE', start: { x: 0, y: 0 }, end: { x: 2, y: 0 } },
  ...sketchSupportBoundaryEntities(coincidentBandSupport),
]);
assert.equal(coincidentCornerFaces.length, 2);
assert.equal(coincidentCornerFaces.every((face) => face.exactProfile.outerLoop.segments.some((segment) =>
  segment.type === 'arc-circle')), true);
const verticalSketchPlane = sketchPlaneFromFace({
  points: [
    { x: 4, y: 0, z: 0 },
    { x: 4, y: 3, z: 0 },
    { x: 4, y: 3, z: 2 },
    { x: 4, y: 0, z: 2 },
  ],
  normal: { x: 1, y: 0, z: 0 },
});
const rotatedVerticalSketchPlane = rotateSketchPlaneAxes(verticalSketchPlane);
assert.deepEqual(
  pointOnSketchPlane({ x: -3, y: -2, z: 0 }, rotatedVerticalSketchPlane),
  pointOnSketchPlane({ x: 2, y: -3, z: 0 }, verticalSketchPlane),
);
assert.equal(rotatedVerticalSketchPlane.axisRotation, 90);
assert.deepEqual(rotateSketchSupportFaceAxes({
  outerLoop: [{ x: 2, y: 3, z: 0 }],
  innerLoops: [[{ x: -1, y: 4, z: 0 }]],
}), {
  outerLoop: [{ x: -3, y: 2, z: 0 }],
  innerLoops: [[{ x: -4, y: -1, z: 0 }]],
});
const verticalSupportSnapshot = snapshotSketchSupportFace({
  sourceSolidDocumentId: 'solid3d-reference',
  sourceSolidFaceIndex: 3,
  points: [
    { x: 4, y: 0, z: 0 },
    { x: 4, y: 3, z: 0 },
    { x: 4, y: 3, z: 2 },
    { x: 4, y: 0, z: 2 },
  ],
  holes: [],
}, verticalSketchPlane);
const verticalSketchFaces = detectSimpleClosedFaces([
  ...sketchSupportBoundaryEntities({
    id: 'sketch3d-vertical',
    metadata: { supportFace: verticalSupportSnapshot },
  }),
  { type: 'CIRCLE', center: { x: 1.5, y: -1 }, radius: 0.35 },
]);
assert.equal(verticalSketchFaces.length, 2);
verticalSketchFaces
  .map((face) => faceOnSketchPlane(face, verticalSketchPlane, 'sketch3d-vertical'))
  .flatMap((face) => [face.points, ...(face.holes ?? [])])
  .flat()
  .forEach((point) => assert.ok(Math.abs(point.x - 4) < 1e-9));
const booleanBaseFace = {
  id: 'boolean-base',
  points: [
    { x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 },
    { x: 4, y: 4, z: 0 }, { x: 0, y: 4, z: 0 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
};
const booleanBaseSolid = solidFromFacePush(booleanBaseFace, 2);
const placedRectangleLocalFace = {
  id: 'placed-boolean-rectangle',
  points: [
    { x: 1, y: 1, z: 2 }, { x: 3, y: 1, z: 2 },
    { x: 3, y: 3, z: 2 }, { x: 1, y: 3, z: 2 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
  supportSolid: booleanBaseSolid,
  supportLoops: {
    outer: booleanBaseFace.points.map((point) => ({ ...point, z: 2 })),
    holes: [],
  },
  sourceSolidFaceIndices: [1],
  sourceSolidDocumentId: 'solid3d-placed-boolean',
  sketchId: 'sketch3d-placed-boolean',
};
const placedRectangleWorldFace = solidFaceToWorld(
  placedRectangleLocalFace,
  arbitraryPlacement,
);
placedRectangleWorldFace.placement = arbitraryPlacement;
placedRectangleWorldFace.localFace = solidFaceToLocal(
  placedRectangleWorldFace,
  arbitraryPlacement,
);
placedRectangleLocalFace.points.forEach((point, index) => {
  const recovered = placedRectangleWorldFace.localFace.points[index];
  assert.ok(Math.abs(recovered.x - point.x) < 1e-9);
  assert.ok(Math.abs(recovered.y - point.y) < 1e-9);
  assert.ok(Math.abs(recovered.z - point.z) < 1e-9);
});
const placedRectangleUnion = pushSolidForFace(placedRectangleWorldFace, 1);
assert.equal(isValidSolid3d(placedRectangleUnion), true);
assert.equal(placedRectangleUnion.metadata.booleanOperation, 'union');
assert.equal(placedRectangleUnion.metadata.type, 'profileFeature');
assert.ok(Math.abs(computeSolidBounds3d(placedRectangleUnion).maxZ - 3) < 1e-9);
const booleanCirclePoints = Array.from({ length: 48 }, (_, index) => ({
  x: 2 + Math.cos(index * Math.PI * 2 / 48),
  y: 2 + Math.sin(index * Math.PI * 2 / 48),
  z: 2,
}));
const booleanCircleExactProfile = exactProfileFromCircle({
  id: 'boolean-circle-source',
  type: 'CIRCLE',
  center: { x: 2, y: -2, z: 0 },
  radius: 1,
});
booleanCircleExactProfile.plane.origin.z = 2;
const booleanSketchFace = {
  id: 'boolean-circle',
  points: booleanCirclePoints,
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: booleanCirclePoints.map((_, index) => index),
  supportSolid: booleanBaseSolid,
  supportLoops: {
    outer: booleanBaseFace.points.map((point) => ({ ...point, z: 2 })),
    holes: [],
  },
  sourceSolidFaceIndices: [1],
  sourceSolidDocumentId: 'solid3d-boolean',
  sketchId: 'sketch3d-boolean',
  exactProfile: booleanCircleExactProfile,
  workplane: principalSketchPlane('XY'),
};
const circularProjectionSolid = solidFromFacePush({
  id: 'circular-projection',
  points: booleanCirclePoints,
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: booleanCirclePoints.map((_, index) => index),
  exactProfile: booleanCircleExactProfile,
}, 3);
const circularSideProjection = projectModel3dEdgesToSketch({
  solids: [{
    id: 'solid3d-circular-projection',
    solid: circularProjectionSolid,
    visible: true,
  }],
}, principalSketchPlane('XZ'));
assert.equal(circularSideProjection.some((reference) =>
  reference.type === 'line' &&
  Math.abs(reference.end.y - reference.start.y) >
    Math.abs(reference.end.x - reference.start.x) * 5), false);
const circularSnapGroup = createPushSolidGroupFromSolid(circularProjectionSolid);
assert.ok(circularSnapGroup);
assert.equal(deriveSolidAnalyticEdges(circularProjectionSolid).curves.length, 2);
const sourceCircularCurve = deriveSolidAnalyticEdges(circularProjectionSolid).curves[0];
circularSnapGroup.position.set(10, 20, 30);
circularSnapGroup.quaternion.setFromAxisAngle(
  new THREE.Vector3(0, 0, 1),
  Math.PI / 2,
);
circularSnapGroup.updateMatrixWorld(true);
const circularCurveSnaps = solidObjectSnapCandidates([circularSnapGroup], {
  includeWorldOrigin: false,
});
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'center').length, 2);
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'quadrant').length, 8);
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'endpoint').length, 0);
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'midpoint').length, 0);
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'faceCenter').length, 2);
assert.equal(circularCurveSnaps.filter((snap) => snap.type === 'quadrant').every((snap) =>
  snap.analyticCurve?.type === 'arc-circle' &&
  snap.analyticCurve.closed === true &&
  snap.analyticCurveId === snap.analyticCurve.id), true);
const transformedCircularCenter = circularCurveSnaps.find((snap) =>
  snap.type === 'center' && snap.localPoint.z === 2);
assert.deepEqual(transformedCircularCenter.point, { x: 8, y: 22, z: 32 });
assert.deepEqual(transformedCircularCenter.analyticCurve.center, transformedCircularCenter.point);
assert.ok(Math.abs(
  new THREE.Vector3(
    transformedCircularCenter.analyticCurve.uAxis.x,
    transformedCircularCenter.analyticCurve.uAxis.y,
    transformedCircularCenter.analyticCurve.uAxis.z,
  ).length() -
  new THREE.Vector3(
    sourceCircularCurve.uAxis.x,
    sourceCircularCurve.uAxis.y,
    sourceCircularCurve.uAxis.z,
  ).length(),
) <= 1e-9);
disposeThreeObject(circularSnapGroup);
const placementQuaternion = new THREE.Quaternion(
  arbitraryPlacement.quaternion.x,
  arbitraryPlacement.quaternion.y,
  arbitraryPlacement.quaternion.z,
  arbitraryPlacement.quaternion.w,
);
const frameOnPlacement = (frame) => {
  const transformDirection = (direction) => {
    const value = new THREE.Vector3(direction.x, direction.y, direction.z)
      .applyQuaternion(placementQuaternion);
    return { x: value.x, y: value.y, z: value.z };
  };
  const transformed = {
    ...JSON.parse(JSON.stringify(frame)),
    origin: solidLocalToWorld(frame.origin, arbitraryPlacement),
  };
  if (frame.xAxis) transformed.xAxis = transformDirection(frame.xAxis);
  if (frame.yAxis) transformed.yAxis = transformDirection(frame.yAxis);
  if (frame.normal) transformed.normal = transformDirection(frame.normal);
  return transformed;
};
const placedCircleWorldFace = {
  ...solidFaceToWorld(booleanSketchFace, arbitraryPlacement),
  placement: arbitraryPlacement,
  exactProfile: {
    ...JSON.parse(JSON.stringify(booleanCircleExactProfile)),
    plane: frameOnPlacement(booleanCircleExactProfile.plane),
  },
  workplane: frameOnPlacement(booleanSketchFace.workplane),
};
placedCircleWorldFace.localFace = solidFaceToLocal(
  placedCircleWorldFace,
  arbitraryPlacement,
);
assert.ok(Math.abs(
  placedCircleWorldFace.localFace.exactProfile.plane.origin.z -
  booleanCircleExactProfile.plane.origin.z,
) < 1e-9);
const placedCircleUnion = pushSolidForFace(placedCircleWorldFace, 1);
assert.equal(isValidSolid3d(placedCircleUnion), true);
assert.equal(placedCircleUnion.metadata.booleanOperation, 'union');
const unionProfileSolid = profileFeaturePushSolid(booleanSketchFace, 1);
const subtractProfileSolid = profileFeaturePushSolid(booleanSketchFace, -1);
assert.equal(isValidSolid3d(unionProfileSolid), true);
assert.equal(isValidSolid3d(subtractProfileSolid), true);
assert.equal(computeSolidBounds3d(unionProfileSolid).maxZ, 3);
assert.equal(computeSolidBounds3d(subtractProfileSolid).maxZ, 2);
assert.equal(unionProfileSolid.metadata.booleanOperation, 'union');
assert.equal(subtractProfileSolid.metadata.booleanOperation, 'subtract');
assert.equal(unionProfileSolid.metadata.sourceSolidDocumentId, 'solid3d-boolean');
assert.ok(unionProfileSolid.edges.length >= booleanCirclePoints.length * 2);
assert.doesNotThrow(() => JSON.stringify(unionProfileSolid));
assert.equal(unionProfileSolid.metadata.type, 'profileFeature');
assert.equal(subtractProfileSolid.metadata.type, 'profileFeature');
assert.ok(unionProfileSolid.metadata.planarFaceGroups.length >= 2);
assert.ok(subtractProfileSolid.metadata.planarFaceGroups.length >= 2);
assert.equal(unionProfileSolid.metadata.curvedSideFaceIndices.length, booleanCirclePoints.length);
assert.equal(unionProfileSolid.metadata.curvedFeatureGeneratrices.length, booleanCirclePoints.length);
const unionProfileCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
unionProfileCamera.position.set(10, -10, 10);
unionProfileCamera.lookAt(2, 2, 2.5);
unionProfileCamera.updateMatrixWorld();
assert.ok(buildPushGeneratrixSilhouetteSegments(unionProfileSolid, unionProfileCamera).length >= 2);
const unionProfileGeometry = solid3dToBufferGeometry(unionProfileSolid);
const unionCurvedFaceIndex = unionProfileSolid.metadata.curvedSideFaceIndices[0];
assert.equal(solidFaceFromMeshHit({
  object: {
    uuid: 'profile-feature-circle',
    geometry: unionProfileGeometry,
    userData: { type: 'webcad-push-solid', solid: unionProfileSolid },
  },
  faceIndex: unionProfileGeometry.userData.webcadFaceTriangleMap.indexOf(unionCurvedFaceIndex),
}), null);
unionProfileGeometry.dispose();
const throughProfileSolid = profileFeaturePushSolid(booleanSketchFace, -3);
assert.equal(isValidSolid3d(throughProfileSolid), true);
assert.equal(throughProfileSolid.metadata.profileFeatures.at(-1).through, true);
assert.equal(throughProfileSolid.metadata.profileFeatures.at(-1).distance, -2);
assert.equal(throughProfileSolid.metadata.planarFaceGroups.some((group) =>
  group.kind === 'opposite-remainder'), true);
assert.equal(throughProfileSolid.metadata.planarFaceGroups.some((group) =>
  group.kind === 'feature-end'), false);
const reversedOppositeBaseSolid = JSON.parse(JSON.stringify(booleanBaseSolid));
reversedOppositeBaseSolid.faces[0].reverse();
const orientationIndependentThroughSolid = profileFeaturePushSolid({
  ...booleanSketchFace,
  supportSolid: reversedOppositeBaseSolid,
}, -2);
assert.equal(isValidSolid3d(orientationIndependentThroughSolid), true);
assert.equal(orientationIndependentThroughSolid.metadata.profileFeatures.at(-1).through, true);
const rectangleFeatureFace = {
  ...booleanSketchFace,
  id: 'boolean-rectangle',
  points: [
    { x: 1, y: 1, z: 2 }, { x: 3, y: 1, z: 2 },
    { x: 3, y: 3, z: 2 }, { x: 1, y: 3, z: 2 },
  ],
  cadProfileVertexIndices: [0, 1, 2, 3],
  smoothProfileVertexIndices: [],
};
const rectangleFeatureSolid = profileFeaturePushSolid(rectangleFeatureFace, 1);
assert.equal(isValidSolid3d(rectangleFeatureSolid), true);
assert.equal(rectangleFeatureSolid.edges.length, booleanBaseSolid.edges.length + 12);
assert.equal(computeSolidBounds3d(rectangleFeatureSolid).maxZ, 3);
assert.equal(rectangleFeatureSolid.metadata.curvedSideFaceIndices.length, 0);
const movedRectangleSupportGroup = rectangleFeatureSolid.metadata.planarFaceGroups.find((group) =>
  group.kind === 'support-remainder');
const movedProfileFeatureSolid = movedSolidFacePush({
  sourceSolid: rectangleFeatureSolid,
  sourceSolidFaceIndex: movedRectangleSupportGroup.indices[0],
  sourceSolidFaceIndices: movedRectangleSupportGroup.indices,
  points: movedRectangleSupportGroup.outerLoop,
  holes: movedRectangleSupportGroup.innerLoops,
  normal: movedRectangleSupportGroup.normal,
}, -0.25);
assert.equal(isValidSolid3d(movedProfileFeatureSolid), true);
assert.equal(movedProfileFeatureSolid.metadata.type, 'profileFeature');
assert.equal(buildPushSilhouetteSegments(movedProfileFeatureSolid, unionProfileCamera).length, 0);
assert.equal(movedProfileFeatureSolid.metadata.planarFaceGroups
  .find((group) => group.kind === 'support-remainder').outerLoop[0].z, 1.75);
const firstRectangleSupportGroup = rectangleFeatureSolid.metadata.planarFaceGroups.find((group) =>
  group.kind === 'support-remainder');
const adjacentRectangle = [
  { x: 3, y: 1, z: 2 }, { x: 3.5, y: 1, z: 2 },
  { x: 3.5, y: 3, z: 2 }, { x: 3, y: 3, z: 2 },
];
const joinedRectangleSolid = profileFeaturePushSolid({
  ...rectangleFeatureFace,
  id: 'boolean-adjacent-rectangle',
  points: adjacentRectangle,
  supportSolid: rectangleFeatureSolid,
  supportLoops: {
    outer: rectangleFeatureFace.supportLoops.outer,
    holes: [rectangleFeatureFace.points],
  },
  sourceSolidFaceIndices: firstRectangleSupportGroup.indices,
}, 1);
assert.equal(isValidSolid3d(joinedRectangleSolid), true);
const joinedSupportGroups = joinedRectangleSolid.metadata.planarFaceGroups.filter((group) =>
  group.kind === 'support-remainder' && group.normal.z > 0.99);
assert.equal(joinedSupportGroups.length, 1);
assert.equal(joinedSupportGroups[0].innerLoops.length, 2);
const sharedTopStart = joinedRectangleSolid.vertices.findIndex((point) =>
  Math.abs(point.x - 3) < 1e-9 && Math.abs(point.y - 1) < 1e-9 && Math.abs(point.z - 3) < 1e-9);
const sharedTopEnd = joinedRectangleSolid.vertices.findIndex((point) =>
  Math.abs(point.x - 3) < 1e-9 && Math.abs(point.y - 3) < 1e-9 && Math.abs(point.z - 3) < 1e-9);
assert.equal(joinedRectangleSolid.edges.some(([first, second]) =>
  (first === sharedTopStart && second === sharedTopEnd) ||
  (first === sharedTopEnd && second === sharedTopStart)), false);
const exteriorFeatureFace = {
  ...rectangleFeatureFace,
  id: 'boolean-exterior',
  points: rectangleFeatureFace.supportLoops.outer,
  holes: [rectangleFeatureFace.points],
  holeCadProfileVertexIndices: [[0, 1, 2, 3]],
};
const exteriorFeatureSolid = profileFeaturePushSolid(exteriorFeatureFace, 1);
assert.equal(isValidSolid3d(exteriorFeatureSolid), true);
assert.equal(computeSolidBounds3d(exteriorFeatureSolid).maxZ, 3);
assert.ok(exteriorFeatureSolid.edges.length < booleanBaseSolid.edges.length + 24);
const verticalSupportLoop = [
  { x: 4, y: 0, z: 0 }, { x: 4, y: 4, z: 0 },
  { x: 4, y: 4, z: 2 }, { x: 4, y: 0, z: 2 },
];
const verticalFeaturePlane = sketchPlaneFromFace({
  points: verticalSupportLoop,
  normal: { x: 1, y: 0, z: 0 },
});
const verticalCirclePoints = Array.from({ length: 48 }, (_, index) => ({
  x: 4,
  y: 2 + Math.cos(index * Math.PI * 2 / 48) * 0.6,
  z: 1 + Math.sin(index * Math.PI * 2 / 48) * 0.6,
}));
const verticalFeatureSolid = profileFeaturePushSolid({
  ...booleanSketchFace,
  points: verticalCirclePoints,
  supportLoops: { outer: verticalSupportLoop, holes: [] },
  sourceSolidFaceIndices: [3],
  normal: { x: 1, y: 0, z: 0 },
  workplane: verticalFeaturePlane,
}, 1);
assert.equal(isValidSolid3d(verticalFeatureSolid), true);
assert.equal(computeSolidBounds3d(verticalFeatureSolid).maxX, 5);
assert.doesNotThrow(() => solid3dToBufferGeometry(verticalFeatureSolid).dispose());
assert.deepEqual(pointOnPrincipalPlane({ x: 4, y: 5, z: 0 }, 'XY'), { x: 4, y: 5, z: 0 });
assert.deepEqual(pointOnPrincipalPlane({ x: 4, y: 5, z: 0 }, 'XZ'), { x: 4, y: 0, z: 5 });
assert.deepEqual(pointOnPrincipalPlane({ x: 4, y: 5, z: 0 }, 'YZ'), { x: 0, y: 4, z: 5 });
assert.deepEqual(principalPlaneDefinition('XZ').normal, { x: 0, y: -1, z: 0 });
assert.deepEqual(principalPlaneDefinition('YZ').normal, { x: 1, y: 0, z: 0 });
assert.deepEqual(cameraViewOrientation('planta').direction, { x: 0, y: 0, z: 1 });
assert.deepEqual(cameraViewOrientation('alzado').direction, { x: 0, y: -1, z: 0 });
assert.deepEqual(cameraViewOrientation('perfil-derecho').direction, { x: 1, y: 0, z: 0 });
assert.deepEqual(cameraViewOrientation('perfil-izquierdo').direction, { x: -1, y: 0, z: 0 });
assert.deepEqual(cameraViewUp('planta'), { x: 0, y: 1, z: 0 });
assert.deepEqual(cameraViewUp('inferior'), { x: 0, y: 1, z: 0 });
assert.deepEqual(cameraViewUp('alzado'), { x: 0, y: 0, z: 1 });
assert.deepEqual(VIEW_CUBE_AXIS_COLORS, {
  x: '#d40000',
  y: '#00a000',
  z: '#004bd8',
});
assert.equal(
  cameraProjectionForOrientation(
    cameraViewOrientation('planta'),
    CAMERA_PROJECTION_PERSPECTIVE,
  ),
  CAMERA_PROJECTION_ORTHOGRAPHIC,
);
assert.equal(
  cameraProjectionForOrientation(
    cameraViewOrientation(DEFAULT_ISOMETRIC_VIEW_ID),
    CAMERA_PROJECTION_PERSPECTIVE,
  ),
  CAMERA_PROJECTION_PERSPECTIVE,
);
const canonicalProjectionCamera = createSwitchableThreeCamera({
  aspect: 4 / 3,
  far: 1000,
  near: 0.1,
});
const canonicalProjectionTarget = new THREE.Vector3(0, 0, 0);
canonicalProjectionCamera.position.set(0, -30, 20);
canonicalProjectionCamera.lookAt(canonicalProjectionTarget);
canonicalProjectionCamera.updateMatrixWorld(true);
const canonicalPerspectiveHeight = cameraWorldHeight(
  canonicalProjectionCamera,
  canonicalProjectionTarget,
);
setCameraProjection(canonicalProjectionCamera, CAMERA_PROJECTION_ORTHOGRAPHIC);
updateCameraProjectionViewport(canonicalProjectionCamera, {
  height: 600,
  viewHeight: canonicalPerspectiveHeight,
  width: 800,
});
assert.equal(cameraProjection(canonicalProjectionCamera), CAMERA_PROJECTION_ORTHOGRAPHIC);
assert.ok(Math.abs(
  cameraWorldHeight(canonicalProjectionCamera, canonicalProjectionTarget) -
  canonicalPerspectiveHeight,
) < 1e-12);
CAMERA_VIEW_ORIENTATIONS.filter((view) => view.type === 'face').forEach((view) => {
  const up = cameraViewUp(view);
  assert.ok(Math.abs(
    view.direction.x * up.x +
    view.direction.y * up.y +
    view.direction.z * up.z,
  ) < 1e-12);
});
assert.equal(DEFAULT_ISOMETRIC_VIEW_ID, 'iso-se');
assert.deepEqual(
  cameraViewOrientation(DEFAULT_ISOMETRIC_VIEW_ID).direction,
  DEFAULT_ISOMETRIC_DIRECTION,
);
assert.ok(DEFAULT_ISOMETRIC_DIRECTION.x > 0);
assert.ok(DEFAULT_ISOMETRIC_DIRECTION.y < 0);
assert.ok(DEFAULT_ISOMETRIC_DIRECTION.z > 0);
const displacedViewTarget = { x: 140, y: -75, z: 28 };
const originalDisplacedCamera = { x: 180, y: -70, z: 40 };
const displacedViewPosition = cameraViewPosition({
  direction: cameraViewOrientation('posterior').direction,
  distance: 42,
  position: originalDisplacedCamera,
  target: displacedViewTarget,
});
assert.deepEqual(displacedViewPosition, { x: 140, y: -33, z: 28 });
assert.deepEqual(
  cameraViewDirection(displacedViewPosition, displacedViewTarget),
  cameraViewOrientation('posterior').direction,
);
assert.equal(closestCameraView(
  cameraViewDirection(displacedViewPosition, displacedViewTarget),
)?.id, 'posterior');
const preservedDistanceViewPosition = cameraViewPosition({
  direction: cameraViewOrientation('planta').direction,
  position: originalDisplacedCamera,
  target: displacedViewTarget,
});
assert.ok(Math.abs(
  Math.hypot(
    preservedDistanceViewPosition.x - displacedViewTarget.x,
    preservedDistanceViewPosition.y - displacedViewTarget.y,
    preservedDistanceViewPosition.z - displacedViewTarget.z,
  ) -
  Math.hypot(
    originalDisplacedCamera.x - displacedViewTarget.x,
    originalDisplacedCamera.y - displacedViewTarget.y,
    originalDisplacedCamera.z - displacedViewTarget.z,
  )
) < 1e-9);
assert.deepEqual(displacedViewTarget, { x: 140, y: -75, z: 28 });
assert.deepEqual(originalDisplacedCamera, { x: 180, y: -70, z: 40 });
assert.equal(new Set(CAMERA_VIEW_ORIENTATIONS.map((view) => view.id)).size, 26);
CAMERA_VIEW_ORIENTATIONS.forEach((view) => {
  const positioned = cameraViewPosition({
    direction: view.direction,
    distance: 17,
    target: displacedViewTarget,
  });
  assert.ok(Math.abs(Math.hypot(
    positioned.x - displacedViewTarget.x,
    positioned.y - displacedViewTarget.y,
    positioned.z - displacedViewTarget.z,
  ) - 17) < 1e-9);
  assert.equal(closestCameraView(view.direction, 0.999999)?.id, view.id);
});

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

const periodicBoundaryCircle = {
  type: 'CIRCLE',
  center: { x: 0, y: 0, z: 0 },
  radius: 1,
};
const periodicDividerLine = {
  type: 'LINE',
  start: { x: 0, y: -1, z: 0 },
  end: { x: 0, y: 1, z: 0 },
};
const periodicRegionPieces = (secondCircle = periodicBoundaryCircle, options = {}) => [
  {
    entity: periodicDividerLine,
    startParameter: 0,
    endParameter: 1,
  },
  {
    entity: periodicBoundaryCircle,
    startParameter: 0.25,
    endParameter: 0,
    endHasSemanticJunction: options.semanticJunction === true,
  },
  {
    entity: secondCircle,
    startParameter: 1,
    endParameter: 0.75,
    startHasSemanticJunction: options.semanticJunction === true,
  },
];
const periodicRegionProfile = exactProfileFromCurvePieces(
  periodicRegionPieces(),
);
assert.deepEqual(
  periodicRegionProfile.outerLoop.segments.map((segment) => segment.type),
  ['line', 'arc-circle'],
);
assert.equal(periodicRegionProfile.outerLoop.segments[1].clockwise, false);
assert.equal(
  periodicRegionProfile.outerLoop.segments[1].startAngle,
  Math.PI * 0.5,
);
assert.equal(
  periodicRegionProfile.outerLoop.segments[1].endAngle,
  Math.PI * 1.5,
);
assert.equal(
  exactProfileFromCurvePieces(periodicRegionPieces({
    ...periodicBoundaryCircle,
  })).outerLoop.segments.length,
  3,
  'Curvas distintas no deben fusionarse aunque coincidan geométricamente',
);
assert.equal(
  exactProfileFromCurvePieces(periodicRegionPieces(
    periodicBoundaryCircle,
    { semanticJunction: true },
  )).outerLoop.segments.length,
  3,
  'Un vértice semántico real debe conservar la división del límite',
);

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
assert.equal(threeEntityGroup.children[0].material.depthTest, true);
assert.ok(THREE_VIEW_STYLE.drawingLineWidth < PUSH_SOLID_STYLE.edgeLineWidth);
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

const arrangementLine = (start, end) => ({ type: 'LINE', start, end });
const openThreeSides = {
  type: 'POLYLINE',
  closed: false,
  vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }],
  segments: [{ type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }],
};
assert.equal(detectSimpleClosedFaces([
  openThreeSides,
  arrangementLine({ x: 0, y: 10 }, { x: 0, y: 0 }),
]).length, 1);
assert.equal(detectSimpleClosedFaces([
  { type: 'POLYLINE', closed: false, vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }], segments: [{ type: 'LINE' }, { type: 'LINE' }] },
  { type: 'POLYLINE', closed: false, vertices: [{ x: 10, y: 10 }, { x: 0, y: 10 }, { x: 0, y: 0 }], segments: [{ type: 'LINE' }, { type: 'LINE' }] },
]).length, 1);
const openArcProfileFaces = detectSimpleClosedFaces([
  {
    type: 'POLYLINE', closed: false,
    vertices: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: -5 }, { x: 0, y: -5 }],
    segments: [
      { type: 'ARC', center: { x: 5, y: 0 }, clockwise: false },
      { type: 'LINE' }, { type: 'LINE' },
    ],
  },
  arrangementLine({ x: 0, y: -5 }, { x: 0, y: 0 }),
]);
assert.equal(openArcProfileFaces.length, 1);
assert.equal(openArcProfileFaces[0].exactProfile.outerLoop.segments.some((segment) => segment.type === 'arc-circle'), true);

const rectangleNetwork = [
  arrangementLine({ x: 0, y: 0 }, { x: 10, y: 0 }),
  arrangementLine({ x: 10, y: 0 }, { x: 10, y: 10 }),
  arrangementLine({ x: 10, y: 10 }, { x: 0, y: 10 }),
  arrangementLine({ x: 0, y: 10 }, { x: 0, y: 0 }),
];
assert.equal(detectSimpleClosedFaces([
  ...rectangleNetwork,
  arrangementLine({ x: 5, y: 0 }, { x: 5, y: 10 }),
]).length, 2);
assert.equal(detectSimpleClosedFaces([
  ...rectangleNetwork,
  { type: 'POLYLINE', closed: false, vertices: [{ x: 5, y: 0 }, { x: 5, y: 5 }, { x: 5, y: 10 }], segments: [{ type: 'LINE' }, { type: 'LINE' }] },
]).length, 2);
assert.equal(detectSimpleClosedFaces([
  ...rectangleNetwork,
  arrangementLine({ x: 5, y: 2 }, { x: 5, y: 8 }),
]).length, 1);
const gridFaces = detectSimpleClosedFaces([
  arrangementLine({ x: 0, y: 0 }, { x: 10, y: 0 }),
  arrangementLine({ x: 10, y: 0 }, { x: 10, y: 10 }),
  arrangementLine({ x: 10, y: 10 }, { x: 0, y: 10 }),
  arrangementLine({ x: 0, y: 10 }, { x: 0, y: 0 }),
  arrangementLine({ x: 5, y: 0 }, { x: 5, y: 10 }),
  arrangementLine({ x: 0, y: 5 }, { x: 10, y: 5 }),
]);
assert.equal(gridFaces.length, 4);
assert.equal(new Set(gridFaces.map((face) => face.points.map((point) => `${point.x}:${point.y}`).join('|'))).size, 4);
const sharedCircle = { type: 'CIRCLE', id: 'shared-circle', center: { x: 10, y: 0 }, radius: 5 };
const leftCompositeFaces = detectSimpleClosedFaces([
  sharedCircle,
  { type: 'ARC', id: 'left-cap', center: { x: 0, y: 0 }, radius: 5,
    startAngle: Math.PI / 2, endAngle: Math.PI * 1.5, clockwise: true },
  arrangementLine({ x: 0, y: 5 }, { x: 10, y: 5 }),
  arrangementLine({ x: 10, y: -5 }, { x: 0, y: -5 }),
]);
assert.equal(leftCompositeFaces.length, 2);
const leftCompositeFace = leftCompositeFaces.find((face) =>
  face.sourceEntities?.includes(sharedCircle) && face.sourceEntities.length > 1);
assert.ok(leftCompositeFace);
assert.ok(leftCompositeFace.bounds.minX < -4.9);
assert.equal(leftCompositeFace.cadProfileVertexIndices.length, 0);
assert.equal(leftCompositeFace.exactProfile.outerLoop.segments.some((segment) =>
  segment.type === 'arc-circle'), true);
const tangentArc = (id, center, startAngle, endAngle, clockwise) => ({
  type: 'ARC', id, center, radius: 5, startAngle, endAngle, clockwise,
});
const tangentPetalFaces = detectSimpleClosedFaces([
  { type: 'CIRCLE', id: 'tangent-outer', center: { x: 0, y: 0 }, radius: 10 },
  tangentArc('tangent-top', { x: 0, y: 5 }, 0, Math.PI, true),
  tangentArc('tangent-right', { x: 5, y: 0 }, Math.PI / 2, Math.PI * 1.5, false),
  tangentArc('tangent-bottom', { x: 0, y: -5 }, 0, Math.PI, false),
  tangentArc('tangent-left', { x: -5, y: 0 }, -Math.PI / 2, Math.PI / 2, false),
  { type: 'CIRCLE', id: 'tangent-center', center: { x: 0, y: 0 }, radius: 2.5 },
], { circleSegments: 64 });
assert.equal(tangentPetalFaces.length, 6);
assert.equal(tangentPetalFaces.filter((face) => face.holes.length === 1).length, 1);
assert.equal(tangentPetalFaces.filter((face) =>
  face.sourceEntities?.some((entity) => entity.id === 'tangent-outer') &&
  face.sourceEntities.length > 1).length, 4);
const tangentPeripheralFaces = tangentPetalFaces.filter((face) =>
  face.sourceEntities?.some((entity) => entity.id === 'tangent-outer') &&
  face.sourceEntities.length > 1);
assert.equal(tangentPeripheralFaces.every((face) => face.cadProfileVertexIndices.length === 1), true);
const tangentPeripheralSolid = solidFromFacePush(tangentPeripheralFaces[0], 4);
const tangentPeripheralGroup = createPushSolidGroupFromSolid(tangentPeripheralSolid);
const tangentPeripheralEdges = tangentPeripheralGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(tangentPeripheralEdges.userData.sourceSegments.filter((segment) =>
  Math.abs(segment.start.x - segment.end.x) <= 1e-9 &&
  Math.abs(segment.start.y - segment.end.y) <= 1e-9 &&
  Math.abs(segment.start.z - segment.end.z) > 1e-9).length, 1);
disposeThreeObject(tangentPeripheralGroup);
assert.equal(new Set(tangentPetalFaces.map((face) =>
  `${face.bounds.minX.toFixed(6)}:${face.bounds.minY.toFixed(6)}:` +
  `${face.bounds.maxX.toFixed(6)}:${face.bounds.maxY.toFixed(6)}`)).size, 6);
assert.equal(detectSimpleClosedFaces([
  ...rectangleNetwork,
  { type: 'CIRCLE', center: { x: 5, y: 5 }, radius: 1 },
]).length, 2);
const nestedRegions = detectSimpleClosedFaces([
  {
    type: 'POLYLINE', closed: true,
    vertices: [{ x: -10, y: -10 }, { x: 10, y: -10 }, { x: 10, y: 10 }, { x: -10, y: 10 }],
    segments: [{ type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }, { type: 'LINE' }],
  },
  { type: 'CIRCLE', center: { x: 0, y: 0 }, radius: 6 },
  { type: 'CIRCLE', center: { x: 0, y: 0 }, radius: 3 },
], { circleSegments: 24 });
assert.equal(nestedRegions.length, 3);
assert.deepEqual(nestedRegions.map((face) => face.holes.length).sort(), [0, 1, 1]);
assert.equal(nestedRegions.filter((face) => face.exactProfile.innerLoops.length === 1).length, 2);
const circularCrownFace = nestedRegions.find((face) =>
  face.holes.length === 1 && face.area < 150);
assert.ok(circularCrownFace);
const circularCrownMesh = createFaceMesh(circularCrownFace);
assert.ok(circularCrownMesh.geometry.getAttribute('position').count > 0);
circularCrownMesh.geometry.dispose();
circularCrownMesh.material.dispose();
const circularCrownPush = solidFromFacePush(circularCrownFace, 2);
assert.equal(isPushSolidIntegrityValid(circularCrownPush), true);
assert.equal(circularCrownPush.metadata.exactGeometry.extrusion.profile.innerLoops.length, 1);
assert.ok(circularCrownPush.metadata.smoothVerticalEdgeIndices.some((index) =>
  index >= circularCrownFace.points.length));
const circularCrownGroup = createPushSolidGroupFromSolid(circularCrownPush);
const circularCrownEdges = circularCrownGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(circularCrownEdges.userData.sourceSegments.some((segment) =>
  Math.abs(segment.start.x - segment.end.x) <= 1e-9 &&
  Math.abs(segment.start.y - segment.end.y) <= 1e-9 &&
  Math.abs(segment.start.z - segment.end.z) > 1e-9), false);
const circularCrownCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
circularCrownCamera.position.set(30, -40, 30);
circularCrownCamera.lookAt(0, 0, 1);
circularCrownCamera.updateMatrixWorld();
assert.ok(buildPushGeneratrixSilhouetteSegments(circularCrownPush, circularCrownCamera).length > 0);
const exactCrownGeneratrices = buildPushGeneratrixSilhouetteSegments(
  circularCrownPush,
  circularCrownCamera,
);
assert.equal(exactCrownGeneratrices.length, 4);
exactCrownGeneratrices.forEach((segment) => {
  const radius = Math.hypot(segment.start.x, segment.start.y);
  assert.ok(Math.abs(radius - 6) <= 1e-6 || Math.abs(radius - 3) <= 1e-6);
  const radialX = segment.start.x;
  const radialY = segment.start.y;
  const viewX = circularCrownCamera.position.x - segment.start.x;
  const viewY = circularCrownCamera.position.y - segment.start.y;
  assert.ok(Math.abs(radialX * viewX + radialY * viewY) <= 1e-6);
});
updatePushSilhouetteGroup(circularCrownGroup, circularCrownCamera);
const circularCrownGeneratrices = circularCrownGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-generatrix-silhouette');
assert.ok(circularCrownGeneratrices?.visible);
const circularCrownHiddenEdges = circularCrownGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-hidden-edges');
assert.ok(circularCrownHiddenEdges);
assert.equal(circularCrownHiddenEdges.visible, false);
assert.equal(setPushSolidGroupHiddenEdges(circularCrownGroup, true), true);
assert.equal(circularCrownHiddenEdges.visible, true);
assert.equal(circularCrownHiddenEdges.material.dashed, true);
assert.equal(circularCrownHiddenEdges.material.depthTest, false);
assert.equal(circularCrownHiddenEdges.material.dashSize, 4.8);
assert.equal(circularCrownHiddenEdges.material.gapSize, 3);
assert.equal(circularCrownHiddenEdges.material.linewidth, PUSH_SOLID_STYLE.hiddenEdgeLineWidth);
assert.equal(circularCrownHiddenEdges.material.opacity, PUSH_SOLID_STYLE.hiddenEdgeOpacity);
const hiddenVerticalSegments = circularCrownHiddenEdges.userData.sourceSegments.filter((segment) =>
  Math.abs(segment.start.x - segment.end.x) <= 1e-9 &&
  Math.abs(segment.start.y - segment.end.y) <= 1e-9 &&
  Math.abs(segment.start.z - segment.end.z) > 1e-9);
assert.ok(hiddenVerticalSegments.length > 0);
assert.ok(hiddenVerticalSegments.length <
  buildPushGeneratrixSilhouetteSegments(circularCrownPush, circularCrownCamera).length);
disposeThreeObject(circularCrownGroup);
const keyedHoleFace = {
  id: 'face-keyed-hole',
  points: [{ x: -8, y: -8 }, { x: 8, y: -8 }, { x: 8, y: 8 }, { x: -8, y: 8 }],
  holes: [[
    { x: -3, y: 0 }, { x: -2, y: 2 }, { x: 0, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 0 },
  ]],
  cadProfileVertexIndices: [0, 1, 2, 3],
  holeCadProfileVertexIndices: [[0, 1]],
  holeSmoothProfileVertexIndices: [[2, 3, 4]],
};
const keyedHoleSolid = solidFromFacePush(keyedHoleFace, 2);
const keyedHoleOffset = keyedHoleFace.points.length;
assert.equal(keyedHoleSolid.metadata.cadProfileVertexIndices.includes(keyedHoleOffset), true);
assert.equal(keyedHoleSolid.metadata.cadProfileVertexIndices.includes(keyedHoleOffset + 1), true);
const keyedHoleGroup = createPushSolidGroupFromSolid(keyedHoleSolid);
const keyedHoleEdges = keyedHoleGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(keyedHoleEdges.material.depthFunc, THREE.LessEqualDepth);
assert.equal(keyedHoleEdges.material.userData.webcadDepthBias, PUSH_SOLID_STYLE.edgeDepthBias);
assert.equal(keyedHoleEdges.userData.sourceEdgeIndices.some(([first, second]) =>
  Math.min(first, second) === keyedHoleOffset &&
  Math.abs(keyedHoleSolid.vertices[first].x - keyedHoleSolid.vertices[second].x) <= 1e-9 &&
  Math.abs(keyedHoleSolid.vertices[first].y - keyedHoleSolid.vertices[second].y) <= 1e-9 &&
  Math.abs(keyedHoleSolid.vertices[first].z - keyedHoleSolid.vertices[second].z) > 1e-9), true);
disposeThreeObject(keyedHoleGroup);
const perforatedOuterFace = nestedRegions.find((face) => face.area > 200 && face.holes.length === 1);
const perforatedOuterSolid = solidFromFacePush(perforatedOuterFace, 3);
const perforatedOuterGeometry = solid3dToBufferGeometry(perforatedOuterSolid);
const perforatedNormals = perforatedOuterGeometry.getAttribute('normal');
perforatedOuterGeometry.userData.webcadFaceTriangleMap.forEach((faceIndex, triangleIndex) => {
  if (!perforatedOuterSolid.metadata.capFaceGroups.upper.includes(faceIndex)) return;
  for (let corner = 0; corner < 3; corner += 1) {
    const normalIndex = triangleIndex * 3 + corner;
    assert.ok(Math.abs(perforatedNormals.getX(normalIndex)) <= 1e-9);
    assert.ok(Math.abs(perforatedNormals.getY(normalIndex)) <= 1e-9);
    assert.ok(perforatedNormals.getZ(normalIndex) > 0.999);
  }
});
perforatedOuterGeometry.dispose();
const perforatedOuterGroup = createPushSolidGroupFromSolid(perforatedOuterSolid);
const perforatedOuterMesh = perforatedOuterGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid');
const upperCapFaces = perforatedOuterSolid.metadata.capFaceGroups.upper;
const upperCapTriangleIndex = perforatedOuterMesh.geometry.userData.webcadFaceTriangleMap
  .findIndex((faceIndex) => upperCapFaces.includes(faceIndex));
const perforatedTopFace = solidFaceFromMeshHit({
  object: perforatedOuterMesh,
  faceIndex: upperCapTriangleIndex,
});
assert.ok(perforatedTopFace);
assert.equal(perforatedTopFace.holes.length, 1);
assert.deepEqual(perforatedTopFace.sourceSolidFaceIndices, upperCapFaces);
const innerCurvedSideFaceIndex = perforatedOuterSolid.faces.length -
  perforatedOuterSolid.metadata.profileLoopSizes[1];
const innerCurvedTriangleIndex = perforatedOuterMesh.geometry.userData.webcadFaceTriangleMap
  .findIndex((faceIndex) => faceIndex === innerCurvedSideFaceIndex);
assert.equal(solidFaceFromMeshHit({
  object: perforatedOuterMesh,
  faceIndex: innerCurvedTriangleIndex,
}), null);
const perforatedSelection = createSolidFaceSelectionMesh(perforatedTopFace);
assert.ok(perforatedSelection.geometry.getIndex().count > 3);
assert.equal(perforatedSelection.renderOrder, SOLID_FACE_SELECTION_RENDER_ORDER);
assert.equal(perforatedSelection.material.depthTest, true);
assert.ok(SOLID_FACE_SUPPORT_RENDER_ORDER < SOLID_FACE_HOVER_RENDER_ORDER);
assert.ok(SOLID_FACE_HOVER_RENDER_ORDER < SOLID_FACE_SELECTION_RENDER_ORDER);
assert.ok(SOLID_FACE_SELECTION_RENDER_ORDER < PUSH_SOLID_STYLE.edgeRenderOrder);
disposeThreeObject(perforatedSelection);
const movedPerforatedTop = movedSolidFacePush(perforatedTopFace, 1);
assert.ok(movedPerforatedTop);
assert.equal(perforatedTopFace.sourceSolidFaceIndices.every((faceIndex) =>
  movedPerforatedTop.faces[faceIndex].every((vertexIndex) =>
    Math.abs(movedPerforatedTop.vertices[vertexIndex].z - 4) <= 1e-9)), true);
disposeThreeObject(perforatedOuterGroup);
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
const pushedEllipseArcAnalyticEdges = deriveSolidAnalyticEdges(
  solidWithDerivedSurfaceTopology(pushedEllipseArcProfile),
);
assert.equal(pushedEllipseArcAnalyticEdges.curves.length, 2);
const pushedEllipseArcSnapGroup = createPushSolidGroupFromSolid(pushedEllipseArcProfile);
const pushedEllipseArcSnaps = solidObjectSnapCandidates([pushedEllipseArcSnapGroup], {
  includeWorldOrigin: false,
});
pushedEllipseArcAnalyticEdges.curves.forEach((curve) => {
  const curveSnaps = pushedEllipseArcSnaps.filter((snap) =>
    snap.analyticCurveId === curve.id);
  assert.equal(curve.type, 'arc-ellipse');
  assert.equal(curveSnaps.filter((snap) => snap.type === 'center').length, 1);
  assert.equal(curveSnaps.filter((snap) => snap.type === 'midpoint').length, 1);
  assert.ok(curveSnaps.some((snap) => snap.type === 'quadrant'));
});
disposeThreeObject(pushedEllipseArcSnapGroup);
const pushedEllipse = solidFromFacePush(ellipseFace, 4);
assert.equal(pushedEllipse.metadata.exactGeometry.status, 'available');
assert.equal(pushedEllipse.metadata.exactGeometry.extrusion.sideSurfaces.outer[0].type, 'ellipticCylinder');
assert.equal(detectSimpleClosedFaces([line2d]).length, 0);
const arcPolylineFace = detectSimpleClosedFaces([arcPolyline2d], { arcChordTolerance: 1 })[0];
assert.ok(arcPolylineFace);
assert.ok(arcPolylineFace.points.length > arcPolyline2d.vertices.length);
assert.ok(arcPolylineFace.smoothProfileVertexIndices.length > 0);
assert.equal(arcPolylineFace.cadProfileVertexIndices.length, 2);
assert.deepEqual(
  arcPolylineFace.exactProfile.outerLoop.segments.map((segment) => segment.type),
  ['line', 'arc-circle', 'line', 'line'],
);
const arcPolylineTangentIndices = arcPolylineFace.points
  .map((point, index) => Math.abs(point.x - 10) <= 1e-9 &&
    (Math.abs(point.y) <= 1e-9 || Math.abs(point.y + 10) <= 1e-9) ? index : -1)
  .filter((index) => index >= 0);
assert.equal(arcPolylineTangentIndices.length, 2);
assert.equal(arcPolylineTangentIndices.every((index) =>
  arcPolylineFace.smoothProfileVertexIndices.includes(index)), true);
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
const remeshedFeatureSolid = cloneSolid3d(pushedSquare);
remeshedFeatureSolid.metadata = {
  ...remeshedFeatureSolid.metadata,
  type: 'profileFeature',
  profileFeatures: [{}],
  smoothProfileVertexIndices: remeshedFeatureSolid.vertices.map((_, index) => index),
  smoothVerticalEdgeIndices: remeshedFeatureSolid.vertices.map((_, index) => index),
};
const remeshedFeatureGroup = createPushSolidGroupFromSolid(remeshedFeatureSolid);
const remeshedFeatureEdges = remeshedFeatureGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(remeshedFeatureEdges.userData.segmentCount, remeshedFeatureSolid.edges.length);
disposeThreeObject(remeshedFeatureGroup);
const xzSquareFace = faceOnPrincipalPlane(closedSquareFace[0], 'XZ');
const pushedXzSquare = solidFromFacePush(xzSquareFace, 5);
assert.equal(pushedXzSquare.metadata.sketchPlane, 'XZ');
assert.deepEqual(pushedXzSquare.metadata.normal, { x: 0, y: -1, z: 0 });
assert.equal(pushedXzSquare.vertices.slice(0, 4).every((point) => Math.abs(point.y) < 1e-9), true);
assert.equal(pushedXzSquare.vertices.slice(4).every((point) => Math.abs(point.y + 5) < 1e-9), true);
const yzSquareFace = faceOnPrincipalPlane(closedSquareFace[0], 'YZ');
const pushedYzSquare = solidFromFacePush(yzSquareFace, 5);
assert.equal(pushedYzSquare.metadata.sketchPlane, 'YZ');
assert.deepEqual(pushedYzSquare.metadata.normal, { x: 1, y: 0, z: 0 });
assert.equal(pushedYzSquare.vertices.slice(0, 4).every((point) => Math.abs(point.x) < 1e-9), true);
assert.equal(pushedYzSquare.vertices.slice(4).every((point) => Math.abs(point.x - 5) < 1e-9), true);
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
assert.equal(pushedSquareGroup.children[1].material.polygonOffset, true);
assert.equal(
  pushedSquareGroup.children[1].material.polygonOffsetFactor,
  PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
);
assert.equal(
  pushedSquareGroup.children[1].material.polygonOffsetUnits,
  PUSH_SOLID_STYLE.edgePolygonOffsetUnits,
);
assert.equal(
  pushedSquareGroup.children[1].material.userData.webcadDepthBias,
  PUSH_SOLID_STYLE.edgeDepthBias,
);
const edgeDepthBiasShader = { vertexShader: 'void main() { gl_Position = clip; }' };
pushedSquareGroup.children[1].material.onBeforeCompile(edgeDepthBiasShader);
assert.ok(edgeDepthBiasShader.vertexShader.includes(
  `gl_Position.z -= ${PUSH_SOLID_STYLE.edgeDepthBias.toExponential(8)} * gl_Position.w`,
));
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
const concaveFaceMesh = new THREE.Mesh();
concaveFaceMesh.userData = {
  type: 'webcad-push-solid',
  solid: {
    vertices: [
      { x: -1, y: -1, z: 0 },
      { x: 1, y: -1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: -1, y: 1, z: 0 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
      { x: -2, y: -2, z: 20 },
      { x: 2, y: -2, z: 20 },
      { x: 2, y: 2, z: 20 },
      { x: -2, y: 2, z: 20 },
    ],
    faces: [
      [0, 3, 2, 1],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7],
    ],
    metadata: {
      planarFaceGroups: [{
        indices: [1],
        normal: { x: 0, y: 0, z: 1 },
        outerLoop: [
          { x: -1, y: -1, z: 1 },
          { x: 1, y: -1, z: 1 },
          { x: 1, y: 1, z: 1 },
          { x: -1, y: 1, z: 1 },
        ],
        innerLoops: [],
      }],
    },
  },
};
const concaveSelectedFace = solidFaceFromPlanarGroup(concaveFaceMesh, 0);
assert.ok(concaveSelectedFace);
assert.ok(concaveSelectedFace.normal.z > 0.99);
const booleanNoiseFaceMesh = new THREE.Mesh();
booleanNoiseFaceMesh.userData = {
  type: 'webcad-push-solid',
  solid: {
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 100, y: 0, z: 0 },
      { x: 100, y: 100, z: 0 },
      { x: 0, y: 100, z: 0 },
      { x: 0, y: 0, z: 20 },
      { x: 100, y: 0, z: 20 },
      { x: 100, y: 100, z: 20 },
      { x: 0, y: 100, z: 20 },
    ],
    faces: [
      [0, 3, 2, 1],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7],
    ],
    metadata: {
      planarFaceGroups: [{
        indices: [1],
        normal: { x: 0, y: 0, z: 1 },
        outerLoop: [
          { x: 0, y: 0, z: 20.000002 },
          { x: 100, y: 0, z: 19.999992 },
          { x: 100, y: 100, z: 20.000018 },
          { x: 0, y: 100, z: 19.999996 },
        ],
        innerLoops: [],
      }],
    },
  },
};
const booleanNoiseSelectedFace = solidFaceFromPlanarGroup(booleanNoiseFaceMesh, 0);
assert.ok(booleanNoiseSelectedFace);
assert.ok(booleanNoiseSelectedFace.normal.z > 0.99);
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
const collisionSolid = cloneSolid3d(pushedSquare);
const collisionFaceStart = collisionSolid.vertices.length;
const collisionOffset = new THREE.Vector3(
  pushedSquareSideFace.normal.x,
  pushedSquareSideFace.normal.y,
  pushedSquareSideFace.normal.z,
).multiplyScalar(4);
pushedSquareSideFace.points.forEach((point) => collisionSolid.vertices.push({
  x: point.x + collisionOffset.x,
  y: point.y + collisionOffset.y,
  z: point.z + collisionOffset.z,
}));
collisionSolid.faces.push(pushedSquareSideFace.points.map((_, index) => collisionFaceStart + index));
const clampedSideFaceSolid = movedSolidFacePush({
  ...pushedSquareSideFace,
  sourceSolid: collisionSolid,
}, 8);
assert.ok(clampedSideFaceSolid);
assert.ok(Math.abs(clampedSideFaceSolid.metadata.lastPushDistance - 4) <= 1e-9);
assert.equal(clampedSideFaceSolid.metadata.lastPushRequestedDistance, 8);
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
const reversedPushedSquareSideFace = {
  ...pushedSquareSideFace,
  normal: {
    x: -pushedSquareSideFace.normal.x,
    y: -pushedSquareSideFace.normal.y,
    z: -pushedSquareSideFace.normal.z,
  },
};
assert.ok(movedSolidFacePush(reversedPushedSquareSideFace, 9.9));
assert.equal(movedSolidFacePush(reversedPushedSquareSideFace, 10), null);
assert.equal(movedSolidFacePush(reversedPushedSquareSideFace, 12), null);
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
const facetedPushedCircle = structuredClone(pushedCircle);
delete facetedPushedCircle.metadata.faceVertexNormals;
const rebuiltPushedCircle = rebuildSolidCadTopology(facetedPushedCircle, {
  toleranceFactor: 1,
});
assert.ok(rebuiltPushedCircle);
assert.equal(
  rebuiltPushedCircle.metadata.faceVertexNormals.length,
  rebuiltPushedCircle.faces.length,
);
const rebuiltPushedCircleTopology =
  deriveSolidAnalyticTopology(rebuiltPushedCircle);
const rebuiltPushedCircleSurfaces = new Map(
  rebuiltPushedCircleTopology.sideSurfaces.map((surface) =>
    [surface.id, surface]),
);
let rebuiltPushedCircleAnalyticFaceCount = 0;
rebuiltPushedCircleTopology.faceSurfaceIds.forEach((surfaceId, faceIndex) => {
  const surface = rebuiltPushedCircleSurfaces.get(surfaceId);
  if (!surface) return;
  rebuiltPushedCircleAnalyticFaceCount += 1;
  rebuiltPushedCircle.faces[faceIndex].forEach((vertexIndex, cornerIndex) => {
    const expected = analyticSideSurfaceNormalAtPoint(
      rebuiltPushedCircle.vertices[vertexIndex],
      surface,
    );
    const stored =
      rebuiltPushedCircle.metadata.faceVertexNormals[faceIndex][cornerIndex];
    assert.ok(expected);
    assert.ok(Math.abs(Math.abs(
      expected.x * stored.x + expected.y * stored.y + expected.z * stored.z
    ) - 1) <= 1e-8);
  });
});
assert.ok(rebuiltPushedCircleAnalyticFaceCount > 0);
const rebuiltPushedCircleGeometry =
  solid3dToBufferGeometry(rebuiltPushedCircle);
assert.equal(
  rebuiltPushedCircleGeometry.userData.webcadRenderMode,
  'stored-normals',
);
rebuiltPushedCircleGeometry.dispose();
const transverselyTrimmedCircle = structuredClone(pushedCircle);
transverselyTrimmedCircle.vertices =
  transverselyTrimmedCircle.vertices.map((point) => ({
    ...point,
    z: point.z - 1,
  }));
const transverselyTrimmedCircleEdges =
  deriveSolidAnalyticEdges(transverselyTrimmedCircle);
assert.equal(transverselyTrimmedCircleEdges.curves.length, 2);
assert.equal(
  transverselyTrimmedCircleEdges.curves.every((curve) =>
    curve.type === 'arc-circle' &&
    curve.closed &&
    curve.sourceEdgeIndices.length === 16),
  true,
);
assert.deepEqual(
  transverselyTrimmedCircleEdges.curves
    .map((curve) => curve.center.z)
    .sort((first, second) => first - second),
  [-1, 1],
  'Los cortes transversales reales de una superficie circular deben publicar ambas aristas',
);
const pushedCircleGroup = createPushSolidGroup(closedCircleFace, 2);
assert.equal(pushedCircleGroup.children[1].userData.analyticEdgeGeometry.curves.length, 2);
assert.equal(pushedCircleGroup.children[1].userData.analyticEdgeGeometry.lines.length, 0);
assert.ok(pushedCircleGroup.children[1].userData.segmentCount > pushedCircle.edges.length);
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
const pushedArcTopology = solidWithDerivedSurfaceTopology(pushedArcPolyline);
assert.equal(pushedArcTopology.metadata.planarFaceGroups.length, 5);
assert.ok(pushedArcTopology.metadata.curvedSideFaceIndices.length > 0);
assert.equal(pushedArcTopology.edges.filter(([start, end]) =>
  Math.abs(start - end) === arcPolylineFace.points.length).length, 4);
const pushedArcAnalyticEdges = deriveSolidAnalyticEdges(pushedArcTopology);
assert.equal(pushedArcAnalyticEdges.curves.length, 2);
assert.equal(pushedArcAnalyticEdges.curves.every((curve) =>
  curve.type === 'arc-circle' && curve.sourceEdgeIndices.length > 1), true);
const pushedArcAnalyticSamples = sampleSolidAnalyticEdges(pushedArcTopology);
assert.equal(pushedArcAnalyticSamples.entries.some((entry) =>
  entry.type === 'arc-circle' && entry.curveGroupId), true);
const pushedArcPolylineGeometry = solid3dToBufferGeometry(pushedArcPolyline);
assert.equal(pushedArcPolylineGeometry.userData.webcadRenderMode, 'smooth-extrusion');
assert.equal(pushedArcPolylineGeometry.getIndex(), null);
pushedArcPolylineGeometry.dispose();
const pushedArcPolylineGroup = createPushSolidGroup(arcPolylineFace, 3);
const pushedArcCurveSnaps = solidObjectSnapCandidates([pushedArcPolylineGroup], {
  includeWorldOrigin: false,
});
pushedArcAnalyticEdges.curves.forEach((curve) => {
  const curveSnaps = pushedArcCurveSnaps.filter((snap) =>
    snap.analyticCurveId === curve.id);
  assert.equal(curveSnaps.filter((snap) => snap.type === 'center').length, 1);
  assert.equal(curveSnaps.filter((snap) => snap.type === 'midpoint').length, 1);
  assert.ok(curveSnaps.some((snap) => snap.type === 'quadrant'));
  assert.equal(curveSnaps.filter((snap) => snap.type === 'endpoint').length, 2);
});
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
const initialVisibleEdgeOverlay = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay');
silhouetteCamera.position.set(-35, -25, 20);
silhouetteCamera.lookAt(5, -5, 1.5);
silhouetteCamera.updateMatrixWorld();
assert.equal(updatePushSilhouetteGroup(pushedArcPolylineGroup, silhouetteCamera, {
  deferCameraRefresh: true,
}), silhouetteObject);
assert.equal(pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay'), initialVisibleEdgeOverlay);
assert.notEqual(updatePushSilhouetteGroup(pushedArcPolylineGroup, silhouetteCamera), silhouetteObject);
assert.notEqual(pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay'), initialVisibleEdgeOverlay);
silhouetteCamera.position.set(-25, 35, 18);
silhouetteCamera.lookAt(5, -5, 1.5);
silhouetteCamera.updateMatrixWorld();
const previewSilhouette = updatePushSilhouetteGroup(pushedArcPolylineGroup, silhouetteCamera, {
  visibilitySamples: 3,
});
const previewVisibleEdgeOverlay = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay');
assert.equal(pushedArcPolylineGroup.userData.silhouetteVisibilitySamples, 3);
assert.notEqual(updatePushSilhouetteGroup(pushedArcPolylineGroup, silhouetteCamera), previewSilhouette);
assert.notEqual(pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay'), previewVisibleEdgeOverlay);
assert.equal(pushedArcPolylineGroup.userData.silhouetteVisibilitySamples, 10);
const pushedArcStaticEdges = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(pushedArcStaticEdges.visible, true);
const pushedArcVisibleEdges = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-visible-edge-overlay');
assert.ok(pushedArcVisibleEdges.userData.sourceSegments.length > 0);
assert.equal(pushedArcVisibleEdges.material.depthTest, false);
const pushedArcHiddenEdges = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-hidden-edges');
const pushedArcTangentEdges = pushedArcPolylineGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-tangent-edges');
assert.ok(pushedArcHiddenEdges.userData.sourceSegments.length > 0);
assert.ok(pushedArcHiddenEdges.userData.sourceSegments.length <
  pushedArcStaticEdges.userData.sourceSegments.length +
    (pushedArcTangentEdges?.userData?.sourceSegments?.length ?? 0) +
    buildPushGeneratrixSilhouetteSegments(pushedArcPolyline, silhouetteCamera).length);
disposeThreeObject(pushedArcPolylineGroup);

const edgeSelectionCamera = new THREE.PerspectiveCamera(36, 4 / 3, 0.1, 1000);
edgeSelectionCamera.position.set(0, 0, 10);
edgeSelectionCamera.lookAt(0, 0, 0);
edgeSelectionCamera.updateMatrixWorld();
const edgeSelectionGroup = new THREE.Group();
edgeSelectionGroup.userData.documentSolidId = 'solid-edge-test';
const selectionSegment = {
  start: { x: -3, y: 0, z: 0 },
  end: { x: 3, y: 0, z: 0 },
};
const edgeSelectionLine = createWideLineSegments([selectionSegment]);
edgeSelectionLine.userData = {
  ...edgeSelectionLine.userData,
  measurementSegments: [selectionSegment],
  sourceEdgeIndices: [[4, 9]],
  sourceSegments: [selectionSegment],
  type: 'webcad-push-visible-edge-overlay',
};
edgeSelectionGroup.add(edgeSelectionLine);
edgeSelectionGroup.updateMatrixWorld(true);
const selectedSolidEdge = nearestSolidEdgeAtPointer(
  [edgeSelectionGroup],
  edgeSelectionCamera,
  { x: 0, y: 0 },
  { width: 800, height: 600 },
);
assert.equal(selectedSolidEdge.documentSolidId, 'solid-edge-test');
assert.deepEqual(selectedSolidEdge.sourceEdgeIndices, [4, 9]);
assert.equal(selectedSolidEdge.length, 6);
disposeThreeObject(edgeSelectionGroup);

const curveSelectionGroup = new THREE.Group();
curveSelectionGroup.userData.documentSolidId = 'solid-curve-test';
const curveSelectionSegments = [
  {
    start: { x: -2, y: 0, z: 0 },
    end: { x: 0, y: 1, z: 0 },
  },
  {
    start: { x: 0, y: 1, z: 0 },
    end: { x: 2, y: 0, z: 0 },
  },
];
const curveSelectionLine = createWideLineSegments(curveSelectionSegments);
curveSelectionLine.userData = {
  ...curveSelectionLine.userData,
  curveGroupIds: ['curve-a', 'curve-a'],
  measurementSegments: curveSelectionSegments,
  sourceEdgeIndices: [[0, 1], [1, 2]],
  sourceSegments: curveSelectionSegments,
  type: 'webcad-push-visible-edge-overlay',
};
curveSelectionGroup.add(curveSelectionLine);
const hiddenCurveSelectionLine = createWideLineSegments(curveSelectionSegments);
hiddenCurveSelectionLine.userData = {
  ...hiddenCurveSelectionLine.userData,
  curveGroupIds: ['curve-a', 'curve-a'],
  measurementSegments: curveSelectionSegments,
  sourceEdgeIndices: [[0, 1], [1, 2]],
  sourceSegments: curveSelectionSegments,
  type: 'webcad-push-solid-edges',
};
curveSelectionGroup.add(hiddenCurveSelectionLine);
curveSelectionGroup.updateMatrixWorld(true);
const curvePick = new THREE.Vector3(-1, 0.5, 0).project(edgeSelectionCamera);
const selectedSolidCurve = nearestSolidEdgeAtPointer(
  [curveSelectionGroup],
  edgeSelectionCamera,
  { x: curvePick.x, y: curvePick.y },
  { width: 800, height: 600 },
);
assert.equal(selectedSolidCurve.curveGroupId, 'curve-a');
assert.equal(selectedSolidCurve.segments.length, 2);
assert.match(selectedSolidCurve.key, /:curve:curve-a$/);
assert.ok(Math.abs(selectedSolidCurve.length - 2 * Math.sqrt(5)) < 1e-9);
const selectedHiddenSolidCurve = nearestSolidEdgeAtPointer(
  [curveSelectionGroup],
  edgeSelectionCamera,
  { x: curvePick.x, y: curvePick.y },
  { width: 800, height: 600 },
  { includeHidden: true },
);
assert.equal(selectedHiddenSolidCurve.curveGroupId, 'curve-a');
assert.equal(selectedHiddenSolidCurve.segments.length, 2);
assert.equal(selectedHiddenSolidCurve.key, selectedSolidCurve.key);
assert.equal(selectedHiddenSolidCurve.length, selectedSolidCurve.length);
disposeThreeObject(curveSelectionGroup);

const occludedEdgeGroup = new THREE.Group();
occludedEdgeGroup.userData.documentSolidId = 'solid-hidden-edge-test';
const edgeOccluder = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 1),
  new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
);
edgeOccluder.position.z = 1;
edgeOccluder.userData.type = 'webcad-push-solid';
occludedEdgeGroup.add(edgeOccluder);
const occludedSegment = {
  start: { x: -1, y: 0, z: 0 },
  end: { x: 1, y: 0, z: 0 },
};
['webcad-push-visible-edge-overlay', 'webcad-push-solid-edges'].forEach((type) => {
  const line = createWideLineSegments([occludedSegment]);
  line.userData = {
    ...line.userData,
    measurementSegments: [occludedSegment],
    sourceSegments: [occludedSegment],
    type,
  };
  occludedEdgeGroup.add(line);
});
occludedEdgeGroup.updateMatrixWorld(true);
assert.equal(nearestSolidEdgeAtPointer(
  [occludedEdgeGroup],
  edgeSelectionCamera,
  { x: 0, y: 0 },
  { width: 800, height: 600 },
), null);
assert.ok(nearestSolidEdgeAtPointer(
  [occludedEdgeGroup],
  edgeSelectionCamera,
  { x: 0, y: 0 },
  { width: 800, height: 600 },
  { includeHidden: true },
));
disposeThreeObject(occludedEdgeGroup);

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
const tangentCurveJoinIndex = tangentArcPolylineFace.points.findIndex((point) =>
  Math.abs(point.x - 5) < 1e-9 && Math.abs(point.y + 5) < 1e-9);
assert.ok(tangentCurveJoinIndex >= 0);
assert.equal(tangentArcPolylineFace.cadProfileVertexIndices.includes(tangentCurveJoinIndex), false);
assert.ok(tangentArcPolylineFace.smoothProfileVertexIndices.includes(tangentCurveJoinIndex));
const pushedTangentArcGroup = createPushSolidGroup(tangentArcPolylineFace, 2);
const tangentCurveJoin = tangentArcPolylineFace.points[tangentCurveJoinIndex];
const tangentEdgeSegments = pushedTangentArcGroup.children[1].userData.sourceSegments ?? [];
assert.equal(tangentEdgeSegments.some((item) =>
  Math.abs(item.start.x - tangentCurveJoin.x) < 1e-9 &&
  Math.abs(item.start.y - tangentCurveJoin.y) < 1e-9 &&
  Math.abs(item.end.x - tangentCurveJoin.x) < 1e-9 &&
  Math.abs(item.end.y - tangentCurveJoin.y) < 1e-9 &&
  Math.abs(item.end.z - item.start.z) > 1e-9), false);
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

const verticalConcaveSolid = solidFromFacePush({
  id: 'vertical-concave-face',
  points: [
    { x: 0, y: 0, z: 0 }, { x: 0, y: 4, z: 0 },
    { x: 0, y: 4, z: 4 }, { x: 0, y: 3, z: 4 },
    { x: 0, y: 3, z: 1 }, { x: 0, y: 1, z: 1 },
    { x: 0, y: 1, z: 4 }, { x: 0, y: 0, z: 4 },
  ],
  holes: [],
  normal: { x: 1, y: 0, z: 0 },
  cadProfileVertexIndices: [0, 1, 2, 3, 4, 5, 6, 7],
  smoothProfileVertexIndices: [],
}, 2);
const verticalConcaveGeometry = solid3dToBufferGeometry(verticalConcaveSolid);
const verticalPositions = verticalConcaveGeometry.getAttribute('position');
const verticalIndex = verticalConcaveGeometry.getIndex();
let verticalCapArea = 0;
verticalConcaveGeometry.userData.webcadFaceTriangleMap.forEach((faceIndex, triangleIndex) => {
  if (faceIndex !== 0) return;
  const triangle = [0, 1, 2].map((corner) => {
    const index = verticalIndex
      ? verticalIndex.getX(triangleIndex * 3 + corner)
      : triangleIndex * 3 + corner;
    return new THREE.Vector3(
      verticalPositions.getX(index),
      verticalPositions.getY(index),
      verticalPositions.getZ(index),
    );
  });
  verticalCapArea += triangle[1].clone().sub(triangle[0])
    .cross(triangle[2].clone().sub(triangle[0])).length() * 0.5;
});
assert.ok(Math.abs(verticalCapArea - 10) <= 1e-9);
verticalConcaveGeometry.dispose();

assert.equal(THREE_VIEW_STYLE.preset, 'SK');
assert.ok(THREE_VIEW_STYLE.drawingPlaneLift > 0);
assert.ok(THREE_VIEW_STYLE.groundOpacity < 1);
const skGrid = createSketchGrid(undefined, 20);
assert.equal(skGrid.userData.preset, 'SK');
assert.ok(skGrid.getObjectByName('webcad-3d-sk-ground'));
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').material.transparent, false);
assert.equal(skGrid.getObjectByName('webcad-3d-sk-ground').material.depthWrite, false);
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

await initializeManifoldBoolean();
assert.equal(isManifoldBooleanReady(), true);

const firstInclinedUnionDepth = 137.52811211300715;
const firstInclinedUnionRun = 130.71891010987662;
const firstInclinedUnionRise = 78.00648847077004;
const firstInclinedUnionArcEnd = {
  x: 15.998540544552299,
  y: -86.00758285437546,
  z: 0,
};
const firstInclinedBasePlane = principalSketchPlane('YZ');
const firstInclinedBaseProfile = exactProfileFromOrderedEntities([
  {
    type: 'LINE',
    start: { x: firstInclinedUnionRun, y: 0, z: 0 },
    end: { x: 0, y: 0, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: 0, z: 0 },
    end: { x: 0, y: -firstInclinedUnionRise, z: 0 },
  },
  {
    type: 'ARC',
    center: { x: 10, y: -firstInclinedUnionRise, z: 0 },
    radius: 10,
    startAngle: Math.PI,
    endAngle: 5.355707669724821,
    clockwise: true,
  },
  {
    type: 'LINE',
    start: firstInclinedUnionArcEnd,
    end: { x: firstInclinedUnionRun, y: 0, z: 0 },
  },
], { id: 'first-inclined-union-base' });
const firstInclinedBasePoints = sampleExactProfile(
  firstInclinedBaseProfile,
  { segments: 64 },
).map((point) => ({ x: point.x, y: -point.y, z: point.z }));
const firstInclinedBaseFace = faceOnSketchPlane({
  id: 'first-inclined-union-base',
  points: firstInclinedBasePoints,
  holes: [],
  exactProfile: firstInclinedBaseProfile,
  cadProfileVertexIndices: firstInclinedBasePoints.map((_, index) => index),
  smoothProfileVertexIndices: [],
}, firstInclinedBasePlane, 'first-inclined-union-base-sketch');
const firstInclinedBaseSolid = solidFromFacePush(
  firstInclinedBaseFace,
  -firstInclinedUnionDepth,
);
const firstInclinedNormal = {
  x: 0,
  y: 0.5998540544552299,
  z: 0.8001094383605423,
};
const firstInclinedPlane = {
  type: 'fixed',
  id: null,
  label: 'Cara plana',
  origin: {
    x: 0,
    y: firstInclinedUnionArcEnd.x,
    z: -firstInclinedUnionArcEnd.y,
  },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 0.8001094383605423, z: -0.5998540544552299 },
  normal: firstInclinedNormal,
};
const firstInclinedCircle = {
  id: 'first-inclined-union-circle',
  type: 'CIRCLE',
  center: { x: -69.79923939052188, y: -74.66681569996402, z: 0 },
  radius: 29.916761014979265,
};
const firstInclinedCircleProfile = exactProfileFromCircle(firstInclinedCircle);
const firstInclinedCirclePoints = sampleExactProfile(
  firstInclinedCircleProfile,
  { segments: 64 },
).map((point) => ({ x: point.x, y: -point.y, z: point.z }));
const firstInclinedCircleFace = faceOnSketchPlane({
  id: 'first-inclined-union-circle-face',
  points: firstInclinedCirclePoints,
  holes: [],
  exactProfile: firstInclinedCircleProfile,
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: firstInclinedCirclePoints.map((_, index) => index),
}, firstInclinedPlane, 'first-inclined-union-circle-sketch');
firstInclinedCircleFace.supportSolid = firstInclinedBaseSolid;
const firstInclinedSupportLength = Math.hypot(
  firstInclinedUnionRun - firstInclinedUnionArcEnd.x,
  firstInclinedUnionArcEnd.y,
);
firstInclinedCircleFace.supportLoops = {
  outer: [
    { x: 0, y: 0, z: 0 },
    { x: -firstInclinedUnionDepth, y: 0, z: 0 },
    { x: -firstInclinedUnionDepth, y: firstInclinedSupportLength, z: 0 },
    { x: 0, y: firstInclinedSupportLength, z: 0 },
  ].map((point) => pointOnSketchPlane(point, firstInclinedPlane)),
  holes: [],
};
firstInclinedCircleFace.sourceSolidDocumentId = 'first-inclined-union-solid';
const firstInclinedUnionDistance = 77.09186173033247;
const firstInclinedUnion = profileFeaturePushSolid(
  firstInclinedCircleFace,
  firstInclinedUnionDistance,
);
assert.ok(firstInclinedUnion);
const firstInclinedEdgeUses = new Map();
firstInclinedUnion.faces.forEach((face) => face.forEach((start, index) => {
  const end = face[(index + 1) % face.length];
  const key = start < end ? `${start}:${end}` : `${end}:${start}`;
  firstInclinedEdgeUses.set(key, (firstInclinedEdgeUses.get(key) ?? 0) + 1);
}));
assert.ok([...firstInclinedEdgeUses.values()].every((count) => count === 2));
const firstInclinedFeature = firstInclinedUnion.metadata.profileFeatures.at(-1);
const firstInclinedExactCircle = firstInclinedFeature.exactProfile.outerLoop.segments[0];
assert.equal(firstInclinedFeature.type, 'union');
assert.equal(firstInclinedExactCircle.type, 'circle');
assert.deepEqual(firstInclinedExactCircle.center, {
  ...firstInclinedCircle.center,
  y: -firstInclinedCircle.center.y,
});
assert.equal(firstInclinedExactCircle.radius, firstInclinedCircle.radius);
assert.equal(
  firstInclinedFeature.exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);
const firstInclinedAxis = new THREE.Vector3(
  firstInclinedNormal.x,
  firstInclinedNormal.y,
  firstInclinedNormal.z,
).normalize();
const firstInclinedSupportOrigin = new THREE.Vector3(
  firstInclinedPlane.origin.x,
  firstInclinedPlane.origin.y,
  firstInclinedPlane.origin.z,
);
const firstInclinedWorldCenter = pointOnSketchPlane({
  x: firstInclinedCircle.center.x,
  y: -firstInclinedCircle.center.y,
  z: 0,
}, firstInclinedPlane);
const firstInclinedLevel = (point) => new THREE.Vector3(
  point.x,
  point.y,
  point.z,
).sub(firstInclinedSupportOrigin).dot(firstInclinedAxis);
const firstInclinedSupportGroups = (
  firstInclinedUnion.metadata.planarFaceGroups ?? []
).filter((group) =>
  group.indices?.length &&
  group.indices.every((faceIndex) =>
    firstInclinedUnion.faces[faceIndex].every((vertexIndex) =>
      Math.abs(firstInclinedLevel(firstInclinedUnion.vertices[vertexIndex])) <= 1e-4)));
assert.equal(firstInclinedSupportGroups.length, 1);
assert.equal(firstInclinedSupportGroups[0].innerLoops.length, 1);
const firstInclinedHoleRadialErrors = firstInclinedSupportGroups[0].innerLoops[0]
  .map((point) => Math.abs(new THREE.Vector3(
    point.x - firstInclinedWorldCenter.x,
    point.y - firstInclinedWorldCenter.y,
    point.z - firstInclinedWorldCenter.z,
  ).length() - firstInclinedCircle.radius));
assert.ok(
  Math.max(...firstInclinedHoleRadialErrors) <=
    Math.max(5e-5, booleanWeldTolerance(firstInclinedUnion) * 0.1),
  'El limite interior de la cara inclinada debe permanecer sobre el circulo exacto',
);
const firstInclinedTopology = deriveSolidAnalyticTopology(firstInclinedUnion);
const firstInclinedCylinderSurfaces = firstInclinedTopology.sideSurfaces.filter((surface) =>
  surface.regionId === firstInclinedFeature.analyticRegionId);
assert.equal(firstInclinedCylinderSurfaces.length, 1);
assert.ok(firstInclinedTopology.faceSurfaceIds.some((surfaceId) =>
  surfaceId === firstInclinedCylinderSurfaces[0].id));
const firstInclinedEdges = deriveSolidAnalyticEdges(firstInclinedUnion);
const firstInclinedSupportCurves = firstInclinedEdges.curves.filter((curve) =>
  curve.closed &&
  Math.abs(new THREE.Vector3(
    curve.center.x,
    curve.center.y,
    curve.center.z,
  ).sub(firstInclinedSupportOrigin).dot(firstInclinedAxis)) <= 1e-4);
assert.equal(firstInclinedSupportCurves.length, 1);
assert.equal(firstInclinedSupportCurves[0].radiusX, firstInclinedCircle.radius);
assert.equal(firstInclinedEdges.lines.some((line) => {
  const points = [line.start, line.end];
  if (!points.every((point) => Math.abs(firstInclinedLevel(point)) <= 1e-4)) return false;
  return points.some((point) => new THREE.Vector3(
    point.x - firstInclinedWorldCenter.x,
    point.y - firstInclinedWorldCenter.y,
    point.z - firstInclinedWorldCenter.z,
  ).length() < firstInclinedCircle.radius - 1e-3);
}), false);
const firstInclinedMesh = createPushSolidMeshFromSolid(firstInclinedUnion);
const firstInclinedTriangleMap =
  firstInclinedMesh.geometry.userData.webcadFaceTriangleMap ?? [];
const firstInclinedSupportFaces = firstInclinedTriangleMap.flatMap(
  (faceIndex, triangleIndex) =>
    firstInclinedSupportGroups[0].indices.includes(faceIndex)
      ? [solidFaceFromMeshHit({ object: firstInclinedMesh, faceIndex: triangleIndex })]
      : [],
).filter(Boolean);
assert.ok(firstInclinedSupportFaces.length > 1);
assert.equal(new Set(firstInclinedSupportFaces.map((face) => face.id)).size, 1);
const firstInclinedTopFaces = firstInclinedTriangleMap.flatMap((faceIndex, triangleIndex) => {
  const face = firstInclinedUnion.faces[faceIndex];
  return face?.every((vertexIndex) =>
    Math.abs(firstInclinedLevel(firstInclinedUnion.vertices[vertexIndex]) -
      firstInclinedUnionDistance) <= 1e-4)
    ? [solidFaceFromMeshHit({ object: firstInclinedMesh, faceIndex: triangleIndex })]
    : [];
}).filter(Boolean);
assert.ok(firstInclinedTopFaces.length > 1);
assert.equal(new Set(firstInclinedTopFaces.map((face) => face.id)).size, 1);
assert.equal(
  firstInclinedTopFaces[0].exactProfile.outerLoop.segments[0].type,
  'circle',
);
const firstInclinedReducedDistance = -51.39457689181589;
const firstInclinedReduced = movedSolidFacePush(
  firstInclinedTopFaces[0],
  firstInclinedReducedDistance,
);
assert.ok(firstInclinedReduced);
const assertFirstInclinedReplay = (solid, expectedDistance) => {
  assert.equal(isValidSolid3d(solid), true);
  assert.equal(solid.metadata.profileFeatures.length, 1);
  assert.equal(
    solid.metadata.profileFeatures[0].analyticRegionId,
    firstInclinedFeature.analyticRegionId,
  );
  assert.ok(Math.abs(
    solid.metadata.profileFeatures[0].distance - expectedDistance,
  ) <= 1e-9);
  const supportGroups = (solid.metadata.planarFaceGroups ?? []).filter((group) =>
    group.indices?.length &&
    group.indices.every((faceIndex) =>
      solid.faces[faceIndex].every((vertexIndex) =>
        Math.abs(firstInclinedLevel(solid.vertices[vertexIndex])) <= 1e-4)));
  assert.equal(supportGroups.length, 1);
  assert.equal(supportGroups[0].innerLoops.length, 1);
  assert.ok(supportGroups[0].innerLoops[0].every((point) =>
    Math.abs(new THREE.Vector3(
      point.x - firstInclinedWorldCenter.x,
      point.y - firstInclinedWorldCenter.y,
      point.z - firstInclinedWorldCenter.z,
    ).length() - firstInclinedCircle.radius) <=
      Math.max(5e-5, booleanWeldTolerance(solid) * 0.1)));
  const edgeUses = new Map();
  solid.faces.forEach((face) => face.forEach((start, index) => {
    const end = face[(index + 1) % face.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    edgeUses.set(key, (edgeUses.get(key) ?? 0) + 1);
  }));
  assert.ok([...edgeUses.values()].every((count) => count === 2));
  assert.equal(deriveSolidAnalyticEdges(solid).lines.some((line) => {
    const points = [line.start, line.end];
    return points.every((point) => Math.abs(firstInclinedLevel(point)) <= 1e-4) &&
      points.some((point) => new THREE.Vector3(
        point.x - firstInclinedWorldCenter.x,
        point.y - firstInclinedWorldCenter.y,
        point.z - firstInclinedWorldCenter.z,
      ).length() < firstInclinedCircle.radius - 1e-3);
  }), false);
};
assertFirstInclinedReplay(firstInclinedReduced, 25.697284838516595);
const firstInclinedReducedMesh = createPushSolidMeshFromSolid(firstInclinedReduced);
const firstInclinedReducedMap =
  firstInclinedReducedMesh.geometry.userData.webcadFaceTriangleMap ?? [];
const firstInclinedReducedCap = firstInclinedReducedMap.flatMap((_, triangleIndex) => {
  const face = solidFaceFromMeshHit({
    object: firstInclinedReducedMesh,
    faceIndex: triangleIndex,
  });
  return face?.analyticRegionId === firstInclinedFeature.analyticRegionId &&
    face.analyticCapIndex === 1
    ? [face]
    : [];
})[0];
assert.ok(firstInclinedReducedCap);
const firstInclinedExtended = movedSolidFacePush(
  firstInclinedReducedCap,
  12.5,
);
assert.ok(firstInclinedExtended);
assertFirstInclinedReplay(firstInclinedExtended, 38.197284838516595);
firstInclinedReducedMesh.geometry.dispose();
firstInclinedReducedMesh.material.dispose();
firstInclinedMesh.geometry.dispose();
firstInclinedMesh.material.dispose();
const firstInclinedModel = createModel3d();
addModel3dSolid(firstInclinedModel, firstInclinedExtended, {
  id: 'first-inclined-union-solid',
});
const reopenedFirstInclinedUnion = parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(firstInclinedModel))),
).solids[0].solid;
assert.deepEqual(
  reopenedFirstInclinedUnion.metadata.profileFeatures[0].exactProfile,
  firstInclinedExtended.metadata.profileFeatures[0].exactProfile,
);
assertFirstInclinedReplay(reopenedFirstInclinedUnion, 38.197284838516595);

const localAxisPushNormal = {
  x: 0,
  y: 0.8409328308294408,
  z: 0.5411395143890191,
};
const localAxisPushPlane = {
  type: 'fixed',
  id: null,
  label: 'Cara plana',
  origin: { x: 0, y: 0, z: 98.46869239810151 },
  xAxis: { x: -1, y: 0, z: 0 },
  yAxis: { x: 0, y: -0.5411395143890191, z: 0.8409328308294408 },
  normal: localAxisPushNormal,
};
const localAxisTrianglePlane = principalSketchPlane('YZ');
const localAxisTriangleProfile = exactProfileFromOrderedEntities([
  {
    type: 'LINE',
    start: { x: 63.3645143028525, y: 0, z: 0 },
    end: { x: 0, y: 0, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: 0, z: 0 },
    end: { x: 0, y: -98.46869239810151, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: -98.46869239810151, z: 0 },
    end: { x: 63.3645143028525, y: 0, z: 0 },
  },
], { id: 'local-axis-triangle' });
const localAxisTriangleFace = faceOnSketchPlane({
  id: 'local-axis-triangle',
  points: [
    { x: 63.3645143028525, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 98.46869239810151, z: 0 },
  ],
  holes: [],
  exactProfile: localAxisTriangleProfile,
  cadProfileVertexIndices: [0, 1, 2],
  smoothProfileVertexIndices: [],
}, localAxisTrianglePlane, 'local-axis-sketch-1');
const localAxisInitialSolid = solidFromFacePush(
  localAxisTriangleFace,
  -58.11018483430643,
);
const localAxisCircle = {
  type: 'CIRCLE',
  center: { x: 29.055092417153215, y: 58.5472993728753, z: 0 },
  radius: 8.447054795100902,
};
const localAxisCircleProfile = exactProfileFromCircle(localAxisCircle);
const localAxisCirclePoints = sampleExactProfile(localAxisCircleProfile, { segments: 64 })
  .map((point) => ({ x: point.x, y: -point.y, z: point.z }));
const localAxisSupportLoop = [
  { x: 0, y: 0, z: 0 },
  { x: 58.11018483430643, y: 0, z: 0 },
  { x: 58.11018483430643, y: -117.0945987457506, z: 0 },
  { x: 0, y: -117.0945987457506, z: 0 },
].map((point) => pointOnSketchPlane(point, localAxisPushPlane));
const localAxisCircleFace = faceOnSketchPlane({
  id: 'local-axis-circle',
  points: localAxisCirclePoints,
  holes: [],
  exactProfile: localAxisCircleProfile,
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: localAxisCirclePoints.map((_, index) => index),
}, localAxisPushPlane, 'local-axis-sketch-3');
localAxisCircleFace.supportSolid = localAxisInitialSolid;
localAxisCircleFace.supportLoops = { outer: localAxisSupportLoop, holes: [] };
localAxisCircleFace.sourceSolidDocumentId = 'local-axis-solid';

const localAxisProjection = (point) =>
  point.x * localAxisPushNormal.x +
  point.y * localAxisPushNormal.y +
  point.z * localAxisPushNormal.z;
const localAxisMaxProjection = (solid) =>
  Math.max(...solid.vertices.map(localAxisProjection));
const localAxisCircleWorldCenter = pointOnSketchPlane({
  x: localAxisCircle.center.x,
  y: -localAxisCircle.center.y,
  z: 0,
}, localAxisPushPlane);
const localAxisCapCenter = (distance) => ({
  x: localAxisCircleWorldCenter.x + localAxisPushNormal.x * distance,
  y: localAxisCircleWorldCenter.y + localAxisPushNormal.y * distance,
  z: localAxisCircleWorldCenter.z + localAxisPushNormal.z * distance,
});
const localAxisCircularCap = (solid, distance) => {
  const mesh = createPushSolidMeshFromSolid(solid, {
    name: `local-axis-solid-${distance}`,
  });
  const extremeProjection = localAxisMaxProjection(solid);
  const expectedCenter = new THREE.Vector3(...Object.values(localAxisCapCenter(distance)));
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
  const faces = new Map();
  triangleMap.forEach((_, triangleIndex) => {
    const face = solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex });
    if (face) faces.set(face.id, face);
  });
  const selected = [...faces.values()].find((face) => {
    const normal = new THREE.Vector3(face.normal.x, face.normal.y, face.normal.z);
    if (normal.dot(new THREE.Vector3(
      localAxisPushNormal.x,
      localAxisPushNormal.y,
      localAxisPushNormal.z,
    )) < 1 - 1e-4) return false;
    if (!face.points.length || face.points.some((point) =>
      Math.abs(localAxisProjection(point) - extremeProjection) > 2e-3)) return false;
    return face.points.every((point) =>
      Math.abs(new THREE.Vector3(point.x, point.y, point.z)
        .distanceTo(expectedCenter) - localAxisCircle.radius) < 2e-2);
  });
  mesh.geometry.dispose();
  mesh.material.dispose();
  return selected ?? null;
};
const localAxisComponentCount = (solid) => {
  const parents = solid.vertices.map((_, index) => index);
  const root = (index) => {
    let current = index;
    while (parents[current] !== current) {
      parents[current] = parents[parents[current]];
      current = parents[current];
    }
    return current;
  };
  const join = (first, second) => {
    const firstRoot = root(first);
    const secondRoot = root(second);
    if (firstRoot !== secondRoot) parents[secondRoot] = firstRoot;
  };
  const used = new Set();
  solid.faces.forEach((face) => face.forEach((vertexIndex, index) => {
    used.add(vertexIndex);
    join(vertexIndex, face[(index + 1) % face.length]);
  }));
  return new Set([...used].map(root)).size;
};

const localAxisInitialDistance = 65.22133323476602;
const localAxisExtendedDistance = 60.37548499300373;
const localAxisRetractedDistance = -58.02521693354633;
const localAxisInitialUnion = profileFeaturePushSolid(
  localAxisCircleFace,
  localAxisInitialDistance,
);
assert.ok(localAxisInitialUnion);
const localAxisFirstCap = localAxisCircularCap(
  localAxisInitialUnion,
  localAxisInitialDistance,
);
assert.ok(localAxisFirstCap, 'La tapa circular inicial debe poder seleccionarse por hit-testing');
assert.ok(Math.abs(
  new THREE.Vector3(
    localAxisFirstCap.normal.x,
    localAxisFirstCap.normal.y,
    localAxisFirstCap.normal.z,
  ).dot(new THREE.Vector3(
    localAxisPushNormal.x,
    localAxisPushNormal.y,
    localAxisPushNormal.z,
  )) - 1,
) < 1e-10, 'La tapa analitica debe usar exactamente el eje local del workplane');
assert.ok(localAxisFirstCap.exactProfile);
assert.ok(Math.abs(
  localAxisMaxProjection(localAxisInitialUnion) -
  localAxisProjection(localAxisCircleWorldCenter) -
  localAxisInitialDistance,
) < 2e-3);

const localAxisExtendedSolid = movedSolidFacePush(
  localAxisFirstCap,
  localAxisExtendedDistance,
);
assert.ok(localAxisExtendedSolid);
const localAxisOldCapProjection = localAxisMaxProjection(localAxisExtendedSolid);
assert.ok(Math.abs(
  localAxisOldCapProjection -
  localAxisMaxProjection(localAxisInitialUnion) -
  localAxisExtendedDistance,
) < 2e-3, 'La extension debe avanzar exactamente sobre la normal local');
const localAxisExtendedCap = localAxisCircularCap(
  localAxisExtendedSolid,
  localAxisInitialDistance + localAxisExtendedDistance,
);
assert.ok(localAxisExtendedCap, 'La nueva tapa circular debe poder volver a seleccionarse');
assert.ok(localAxisExtendedCap.exactProfile);
assert.ok(Math.abs(
  new THREE.Vector3(
    localAxisExtendedCap.normal.x,
    localAxisExtendedCap.normal.y,
    localAxisExtendedCap.normal.z,
  ).dot(new THREE.Vector3(
    localAxisPushNormal.x,
    localAxisPushNormal.y,
    localAxisPushNormal.z,
  )) - 1,
) < 1e-10, 'La tapa extendida debe conservar el eje analitico exacto');
const localAxisExactPlaneShift = new THREE.Vector3(
  localAxisExtendedCap.exactProfile.plane.origin.x -
    localAxisFirstCap.exactProfile.plane.origin.x,
  localAxisExtendedCap.exactProfile.plane.origin.y -
    localAxisFirstCap.exactProfile.plane.origin.y,
  localAxisExtendedCap.exactProfile.plane.origin.z -
    localAxisFirstCap.exactProfile.plane.origin.z,
);
assert.ok(Math.abs(
  localAxisExactPlaneShift.dot(new THREE.Vector3(
    localAxisPushNormal.x,
    localAxisPushNormal.y,
    localAxisPushNormal.z,
  )) - localAxisExtendedDistance,
) < 2e-3);
assert.ok(localAxisExactPlaneShift.clone().cross(new THREE.Vector3(
  localAxisPushNormal.x,
  localAxisPushNormal.y,
  localAxisPushNormal.z,
)).length() < 2e-3);

const localAxisRetractedSolid = movedSolidFacePush(
  localAxisExtendedCap,
  localAxisRetractedDistance,
);
assert.ok(localAxisRetractedSolid);
const localAxisExpectedProjection =
  localAxisOldCapProjection + localAxisRetractedDistance;
assert.ok(Math.abs(
  localAxisMaxProjection(localAxisRetractedSolid) - localAxisExpectedProjection,
) < 2e-3, 'La retraccion debe retirar por completo la prolongacion anterior');
assert.equal(localAxisRetractedSolid.vertices.some((point) =>
  localAxisProjection(point) > localAxisExpectedProjection + 2e-3), false);
assert.equal(localAxisRetractedSolid.vertices.some((point) =>
  Math.abs(localAxisProjection(point) - localAxisOldCapProjection) < 2e-3), false);
assert.equal(isValidSolid3d(localAxisRetractedSolid), true);
assert.equal(localAxisComponentCount(localAxisRetractedSolid), 1);
const localAxisFinalCap = localAxisCircularCap(
  localAxisRetractedSolid,
  localAxisInitialDistance +
    localAxisExtendedDistance +
    localAxisRetractedDistance,
);
assert.ok(localAxisFinalCap);
assert.ok(Math.abs(
  localAxisFinalCap.exactProfile.outerLoop.segments[0].radius -
    localAxisCircle.radius,
) < 2e-3);
const localAxisCircularSurfaces = deriveSolidAnalyticSideSurfaces(localAxisRetractedSolid)
  .filter((surface) =>
    Math.abs(surface.radiusX - localAxisCircle.radius) < 2e-3 &&
    Math.abs(surface.radiusY - localAxisCircle.radius) < 2e-3);
assert.ok(localAxisCircularSurfaces.length > 0);

const inclinedShortenNormal = {
  x: 0,
  y: 0.705919637773969,
  z: 0.708291934872245,
};
const inclinedShortenPlane = {
  type: 'fixed',
  id: null,
  label: 'Cara plana',
  origin: { x: 0, y: 0, z: 86.79187959088799 },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 0.708291934872245, z: -0.705919637773969 },
  normal: inclinedShortenNormal,
};
const inclinedShortenTriangleProfile = exactProfileFromOrderedEntities([
  {
    type: 'LINE',
    start: { x: 87.08355036060428, y: 0, z: 0 },
    end: { x: 0, y: 0, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: 0, z: 0 },
    end: { x: 0, y: -86.79187959088799, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: -86.79187959088799, z: 0 },
    end: { x: 87.08355036060428, y: 0, z: 0 },
  },
], { id: 'inclined-shorten-triangle' });
const inclinedShortenBaseFace = faceOnSketchPlane({
  id: 'inclined-shorten-triangle',
  points: [
    { x: 87.08355036060428, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 86.79187959088799, z: 0 },
  ],
  holes: [],
  exactProfile: inclinedShortenTriangleProfile,
  cadProfileVertexIndices: [0, 1, 2],
  smoothProfileVertexIndices: [],
}, principalSketchPlane('YZ'), 'inclined-shorten-sketch-1');
const inclinedShortenBase = solidFromFacePush(
  inclinedShortenBaseFace,
  -73.9664720206875,
);
const inclinedShortenCircle = {
  type: 'CIRCLE',
  center: { x: -38.139693759999716, y: -63.419406704420524, z: 0 },
  radius: 16.072109179153678,
};
const inclinedShortenCircleProfile = exactProfileFromCircle(inclinedShortenCircle);
const inclinedShortenCirclePoints = sampleExactProfile(
  inclinedShortenCircleProfile,
  { segments: 64 },
).map((point) => ({ x: point.x, y: -point.y, z: point.z }));
const inclinedShortenSupportLength = Math.hypot(
  87.08355036060428,
  86.79187959088799,
);
const inclinedShortenSupportLoop = [
  { x: 0, y: 0, z: 0 },
  { x: -73.9664720206875, y: 0, z: 0 },
  { x: -73.9664720206875, y: inclinedShortenSupportLength, z: 0 },
  { x: 0, y: inclinedShortenSupportLength, z: 0 },
].map((point) => pointOnSketchPlane(point, inclinedShortenPlane));
const inclinedShortenCircleFace = faceOnSketchPlane({
  id: 'inclined-shorten-circle',
  points: inclinedShortenCirclePoints,
  holes: [],
  exactProfile: inclinedShortenCircleProfile,
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: inclinedShortenCirclePoints.map((_, index) => index),
}, inclinedShortenPlane, 'inclined-shorten-sketch-2');
inclinedShortenCircleFace.supportSolid = inclinedShortenBase;
inclinedShortenCircleFace.supportLoops = {
  outer: inclinedShortenSupportLoop,
  holes: [],
};
inclinedShortenCircleFace.sourceSolidDocumentId = 'inclined-shorten-solid';

const inclinedShortenProjection = (point) => {
  const relative = new THREE.Vector3(
    point.x - inclinedShortenPlane.origin.x,
    point.y - inclinedShortenPlane.origin.y,
    point.z - inclinedShortenPlane.origin.z,
  );
  return relative.dot(new THREE.Vector3(
    inclinedShortenNormal.x,
    inclinedShortenNormal.y,
    inclinedShortenNormal.z,
  ));
};
const inclinedShortenCap = (solid, distance) => {
  const mesh = createPushSolidMeshFromSolid(solid);
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
  const candidates = new Map();
  triangleMap.forEach((_, triangleIndex) => {
    const face = solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex });
    if (face) candidates.set(face.id, face);
  });
  const face = [...candidates.values()].find((candidate) => {
    const circle = candidate.exactProfile?.outerLoop?.segments?.[0];
    return circle?.type === 'circle' &&
      Math.abs(circle.radius - inclinedShortenCircle.radius) < 2e-3 &&
      candidate.points.every((point) =>
        Math.abs(inclinedShortenProjection(point) - distance) < 2e-3);
  });
  mesh.geometry.dispose();
  mesh.material.dispose();
  return face ?? null;
};
const inclinedShortenMaxEdgeUse = (solid) => {
  const tolerance = booleanWeldTolerance(solid);
  const pointKey = (point) =>
    `${Math.round(point.x / tolerance)}:` +
    `${Math.round(point.y / tolerance)}:` +
    `${Math.round(point.z / tolerance)}`;
  const uses = new Map();
  solid.faces.forEach((face) => face.forEach((startIndex, index) => {
    const endIndex = face[(index + 1) % face.length];
    const start = pointKey(solid.vertices[startIndex]);
    const end = pointKey(solid.vertices[endIndex]);
    if (start === end) return;
    const key = start < end ? `${start}|${end}` : `${end}|${start}`;
    uses.set(key, (uses.get(key) ?? 0) + 1);
  }));
  return Math.max(0, ...uses.values());
};

const inclinedShortenInitialDistance = 89.7614298621783;
const inclinedShortenMoveDistance = -59.84095306427038;
const inclinedShortenExpectedDistance =
  inclinedShortenInitialDistance + inclinedShortenMoveDistance;
const inclinedShortenUnion = profileFeaturePushSolid(
  inclinedShortenCircleFace,
  inclinedShortenInitialDistance,
);
assert.ok(inclinedShortenUnion);
const inclinedShortenOldCap = inclinedShortenCap(
  inclinedShortenUnion,
  inclinedShortenInitialDistance,
);
assert.ok(inclinedShortenOldCap);
const inclinedShortenResult = movedSolidFacePush(
  inclinedShortenOldCap,
  inclinedShortenMoveDistance,
);
assert.ok(inclinedShortenResult);
assert.ok(Math.abs(
  Math.max(...inclinedShortenResult.vertices.map(inclinedShortenProjection)) -
    inclinedShortenExpectedDistance,
) < 2e-3);
assert.equal(inclinedShortenResult.vertices.some((point) =>
  Math.abs(inclinedShortenProjection(point) - inclinedShortenInitialDistance) < 2e-3), false);
assert.ok(inclinedShortenMaxEdgeUse(inclinedShortenResult) <= 2);
assert.equal(isValidSolid3d(inclinedShortenResult), true);
assert.equal(inclinedShortenResult.metadata.profileFeatures.length, 1);
assert.equal(inclinedShortenResult.metadata.profileFeatures[0].type, 'union');
assert.ok(Math.abs(
  inclinedShortenResult.metadata.profileFeatures[0].distance -
    inclinedShortenExpectedDistance,
) < 2e-3);
const inclinedShortenExactCircle =
  inclinedShortenResult.metadata.profileFeatures[0].exactProfile.outerLoop.segments[0];
assert.equal(inclinedShortenExactCircle.type, 'circle');
assert.ok(Math.abs(inclinedShortenExactCircle.center.x -
  inclinedShortenCircle.center.x) < 1e-9);
assert.ok(Math.abs(inclinedShortenExactCircle.center.y -
  -inclinedShortenCircle.center.y) < 1e-9);
assert.ok(Math.abs(inclinedShortenExactCircle.radius -
  inclinedShortenCircle.radius) < 1e-9);
assert.equal(
  inclinedShortenResult.metadata.profileFeatures[0].exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);
const inclinedShortenEndCenter = pointOnSketchPlane({
  x: inclinedShortenCircle.center.x,
  y: -inclinedShortenCircle.center.y,
  z: inclinedShortenExpectedDistance,
}, inclinedShortenPlane);
assert.equal(deriveSolidAnalyticEdges(inclinedShortenResult).curves.filter((curve) =>
  curve.closed &&
  Math.abs(curve.radiusX - inclinedShortenCircle.radius) < 2e-3 &&
  Math.hypot(
    curve.center.x - inclinedShortenEndCenter.x,
    curve.center.y - inclinedShortenEndCenter.y,
    curve.center.z - inclinedShortenEndCenter.z,
  ) < 2e-3).length, 1);

const inclinedRecessInitialDistance = -18;
const inclinedRecess = profileFeaturePushSolid({
  ...inclinedShortenCircleFace,
  id: 'inclined-recess-circle',
  supportSolid: inclinedShortenBase,
}, inclinedRecessInitialDistance);
assert.ok(inclinedRecess);
const inclinedRecessBottom = inclinedShortenCap(
  inclinedRecess,
  inclinedRecessInitialDistance,
);
assert.ok(inclinedRecessBottom);
const inclinedRecessAxis = new THREE.Vector3(
  inclinedShortenNormal.x,
  inclinedShortenNormal.y,
  inclinedShortenNormal.z,
);
const inclinedRecessBottomNormal = new THREE.Vector3(
  inclinedRecessBottom.normal.x,
  inclinedRecessBottom.normal.y,
  inclinedRecessBottom.normal.z,
);
assert.ok(inclinedRecessBottomNormal.dot(
  inclinedRecessAxis.clone().multiplyScalar(Math.sign(inclinedRecessInitialDistance)),
) < -1 + 1e-10);
const inclinedRecessDeepenMove = -6;
const inclinedRecessDeepDistance = inclinedRecessInitialDistance +
  inclinedRecessBottomNormal.clone()
    .multiplyScalar(inclinedRecessDeepenMove)
    .dot(inclinedRecessAxis);
const inclinedRecessDeep = movedSolidFacePush(
  inclinedRecessBottom,
  inclinedRecessDeepenMove,
);
assert.ok(inclinedRecessDeep);
assert.equal(inclinedRecessDeep.metadata.profileFeatures.length, 1);
assert.equal(inclinedRecessDeep.metadata.profileFeatures[0].type, 'subtract');
assert.ok(Math.abs(
  inclinedRecessDeep.metadata.profileFeatures[0].distance -
    inclinedRecessDeepDistance,
) < 2e-3);
assert.equal(inclinedRecessDeep.metadata.profileFeatures.some((feature) =>
  feature.type === 'union'), false);
assert.ok(inclinedShortenMaxEdgeUse(inclinedRecessDeep) <= 2);
assert.equal(isValidSolid3d(inclinedRecessDeep), true);
const inclinedRecessDeepBottom = inclinedShortenCap(
  inclinedRecessDeep,
  inclinedRecessDeepDistance,
);
assert.ok(inclinedRecessDeepBottom);

const inclinedRecessReduceMove = 9;
const inclinedRecessReducedDistance = inclinedRecessDeepDistance +
  new THREE.Vector3(
    inclinedRecessDeepBottom.normal.x,
    inclinedRecessDeepBottom.normal.y,
    inclinedRecessDeepBottom.normal.z,
  ).multiplyScalar(inclinedRecessReduceMove).dot(inclinedRecessAxis);
const inclinedRecessReduced = movedSolidFacePush(
  inclinedRecessDeepBottom,
  inclinedRecessReduceMove,
);
assert.ok(inclinedRecessReduced);
assert.equal(inclinedRecessReduced.metadata.profileFeatures.length, 1);
assert.equal(inclinedRecessReduced.metadata.profileFeatures[0].type, 'subtract');
assert.ok(Math.abs(
  inclinedRecessReduced.metadata.profileFeatures[0].distance -
    inclinedRecessReducedDistance,
) < 2e-3);
assert.equal(inclinedRecessReduced.metadata.profileFeatures.some((feature) =>
  feature.type === 'union'), false);
assert.equal(inclinedRecessReduced.vertices.some((point) =>
  Math.abs(inclinedShortenProjection(point) - inclinedRecessDeepDistance) < 2e-3), false);
assert.ok(inclinedShortenMaxEdgeUse(inclinedRecessReduced) <= 2);
assert.equal(isValidSolid3d(inclinedRecessReduced), true);
const inclinedRecessCircle =
  inclinedRecessReduced.metadata.profileFeatures[0].exactProfile.outerLoop.segments[0];
assert.equal(inclinedRecessCircle.type, 'circle');
assert.ok(Math.abs(inclinedRecessCircle.center.x -
  inclinedShortenCircle.center.x) < 1e-9);
assert.ok(Math.abs(inclinedRecessCircle.center.y -
  -inclinedShortenCircle.center.y) < 1e-9);
assert.ok(Math.abs(inclinedRecessCircle.radius -
  inclinedShortenCircle.radius) < 1e-9);
const inclinedRecessEndCenter = pointOnSketchPlane({
  x: inclinedShortenCircle.center.x,
  y: -inclinedShortenCircle.center.y,
  z: inclinedRecessReducedDistance,
}, inclinedShortenPlane);
assert.equal(deriveSolidAnalyticEdges(inclinedRecessReduced).curves.filter((curve) =>
  curve.closed &&
  Math.abs(curve.radiusX - inclinedShortenCircle.radius) < 2e-3 &&
  Math.hypot(
    curve.center.x - inclinedRecessEndCenter.x,
    curve.center.y - inclinedRecessEndCenter.y,
    curve.center.z - inclinedRecessEndCenter.z,
  ) < 2e-3).length, 1);

const inclinedCrossUnionDistance = 76.2047981535852;
const inclinedCrossUnionMove = -143.49333073820688;
const inclinedCrossSubtractDistance =
  inclinedCrossUnionDistance + inclinedCrossUnionMove;
const inclinedCrossUnion = profileFeaturePushSolid(
  inclinedShortenCircleFace,
  inclinedCrossUnionDistance,
);
assert.ok(inclinedCrossUnion);
const inclinedCrossUnionCap = inclinedShortenCap(
  inclinedCrossUnion,
  inclinedCrossUnionDistance,
);
assert.ok(inclinedCrossUnionCap);
const inclinedCrossSubtract = movedSolidFacePush(
  inclinedCrossUnionCap,
  inclinedCrossUnionMove,
);
assert.ok(inclinedCrossSubtract);
assert.equal(inclinedCrossSubtract.metadata.profileFeatures.length, 1);
assert.equal(inclinedCrossSubtract.metadata.profileFeatures[0].type, 'subtract');
assert.equal(inclinedCrossSubtract.metadata.profileFeatures.some((feature) =>
  feature.type === 'union'), false);
assert.ok(Math.abs(
  inclinedCrossSubtract.metadata.profileFeatures[0].distance -
    inclinedCrossSubtractDistance,
) < 2e-3);
assert.equal(inclinedCrossSubtract.vertices.some((point) =>
  Math.abs(inclinedShortenProjection(point) - inclinedCrossUnionDistance) < 2e-3), false);
assert.ok(inclinedShortenMaxEdgeUse(inclinedCrossSubtract) <= 2);
assert.equal(isValidSolid3d(inclinedCrossSubtract), true);
const inclinedCrossSubtractProfile =
  inclinedCrossSubtract.metadata.profileFeatures[0].exactProfile;
const inclinedCrossSubtractCircle = inclinedCrossSubtractProfile.outerLoop.segments[0];
assert.equal(inclinedCrossSubtractCircle.type, 'circle');
assert.ok(Math.abs(inclinedCrossSubtractCircle.center.x -
  inclinedShortenCircle.center.x) < 1e-9);
assert.ok(Math.abs(inclinedCrossSubtractCircle.center.y -
  -inclinedShortenCircle.center.y) < 1e-9);
assert.ok(Math.abs(inclinedCrossSubtractCircle.radius -
  inclinedShortenCircle.radius) < 1e-9);
for (const key of ['origin', 'xAxis', 'yAxis', 'normal']) {
  for (const axis of ['x', 'y', 'z']) {
    assert.ok(Math.abs(
      inclinedCrossSubtractProfile.plane[key][axis] -
        inclinedShortenCircleFace.exactProfile.plane[key][axis],
    ) < 1e-12);
  }
}
const inclinedCrossSubtractSurfaces =
  deriveSolidAnalyticSideSurfaces(inclinedCrossSubtract)
    .filter((surface) =>
      Math.abs(surface.radiusX - inclinedShortenCircle.radius) < 2e-3 &&
      Math.abs(surface.radiusY - inclinedShortenCircle.radius) < 2e-3);
assert.equal(inclinedCrossSubtractSurfaces.length, 1);
assert.ok(Math.abs(
  new THREE.Vector3(
    inclinedCrossSubtractSurfaces[0].offset.x,
    inclinedCrossSubtractSurfaces[0].offset.y,
    inclinedCrossSubtractSurfaces[0].offset.z,
  ).dot(inclinedRecessAxis) - inclinedCrossSubtractDistance,
) < 2e-3);

const inclinedCrossRecessDistance = -18;
const inclinedCrossUnionExpectedDistance = 7;
const inclinedCrossRecess = profileFeaturePushSolid({
  ...inclinedShortenCircleFace,
  id: 'inclined-cross-recess-circle',
  supportSolid: inclinedShortenBase,
}, inclinedCrossRecessDistance);
assert.ok(inclinedCrossRecess);
const inclinedCrossRecessBottom = inclinedShortenCap(
  inclinedCrossRecess,
  inclinedCrossRecessDistance,
);
assert.ok(inclinedCrossRecessBottom);
const inclinedCrossRecessNormal = new THREE.Vector3(
  inclinedCrossRecessBottom.normal.x,
  inclinedCrossRecessBottom.normal.y,
  inclinedCrossRecessBottom.normal.z,
);
const inclinedCrossFromRecessMove = (
  inclinedCrossUnionExpectedDistance - inclinedCrossRecessDistance
) / inclinedCrossRecessNormal.dot(inclinedRecessAxis);
const inclinedCrossUnionResult = movedSolidFacePush(
  inclinedCrossRecessBottom,
  inclinedCrossFromRecessMove,
);
assert.ok(inclinedCrossUnionResult);
assert.equal(inclinedCrossUnionResult.metadata.profileFeatures.length, 1);
assert.equal(inclinedCrossUnionResult.metadata.profileFeatures[0].type, 'union');
assert.equal(inclinedCrossUnionResult.metadata.profileFeatures.some((feature) =>
  feature.type === 'subtract'), false);
assert.ok(Math.abs(
  inclinedCrossUnionResult.metadata.profileFeatures[0].distance -
    inclinedCrossUnionExpectedDistance,
) < 2e-3);
assert.equal(inclinedCrossUnionResult.vertices.some((point) =>
  Math.abs(inclinedShortenProjection(point) - inclinedCrossRecessDistance) < 2e-3), false);
assert.ok(inclinedShortenMaxEdgeUse(inclinedCrossUnionResult) <= 2);
assert.equal(isValidSolid3d(inclinedCrossUnionResult), true);
const inclinedCrossUnionSurface = deriveSolidAnalyticSideSurfaces(
  inclinedCrossUnionResult,
).find((surface) =>
  Math.abs(surface.radiusX - inclinedShortenCircle.radius) < 2e-3 &&
  Math.abs(surface.radiusY - inclinedShortenCircle.radius) < 2e-3);
assert.ok(inclinedCrossUnionSurface);
assert.ok(Math.abs(
  new THREE.Vector3(
    inclinedCrossUnionSurface.offset.x,
    inclinedCrossUnionSurface.offset.y,
    inclinedCrossUnionSurface.offset.z,
  ).dot(inclinedRecessAxis) - inclinedCrossUnionExpectedDistance,
) < 2e-3);

const inclinedZeroUnionDistance = 12;
const inclinedZeroUnion = profileFeaturePushSolid(
  inclinedShortenCircleFace,
  inclinedZeroUnionDistance,
);
assert.ok(inclinedZeroUnion);
const inclinedZeroUnionCap = inclinedShortenCap(
  inclinedZeroUnion,
  inclinedZeroUnionDistance,
);
assert.ok(inclinedZeroUnionCap);
const inclinedZeroResult = movedSolidFacePush(
  inclinedZeroUnionCap,
  -inclinedZeroUnionDistance,
);
assert.ok(inclinedZeroResult);
assert.equal(inclinedZeroResult.metadata.profileFeatures.length, 0);
assert.equal(isValidSolid3d(inclinedZeroResult), true);
const inclinedZeroBounds = computeSolidBounds3d(inclinedZeroResult);
const inclinedBaseBounds = computeSolidBounds3d(inclinedShortenBase);
for (const key of ['minX', 'minY', 'minZ', 'maxX', 'maxY', 'maxZ']) {
  assert.ok(Math.abs(inclinedZeroBounds[key] - inclinedBaseBounds[key]) < 1e-9);
}
assert.equal(deriveSolidAnalyticSideSurfaces(inclinedZeroResult).some((surface) =>
  Math.abs(surface.radiusX - inclinedShortenCircle.radius) < 2e-3 &&
  Math.abs(surface.radiusY - inclinedShortenCircle.radius) < 2e-3), false);

const flatTangentNormal = { x: 0, y: 0, z: 1 };
const smoothTangentNormal = { x: 0.02, y: 0, z: 0.9998 };
const nextCurveNormal = { x: 0.04, y: 0, z: 0.9992 };
const tangentSurfaceSolid = {
  vertices: [
    { x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 },
    { x: 10, y: 5, z: 0 }, { x: 0, y: 5, z: 0 },
    { x: 10.1, y: 0, z: 0.01 }, { x: 10.1, y: 5, z: 0.01 },
  ],
  faces: [[0, 1, 2], [0, 2, 3], [1, 4, 5], [1, 5, 2]],
  edges: [],
  metadata: {
    booleanKernel: 'manifold-3d',
    faceVertexNormals: [
      [flatTangentNormal, smoothTangentNormal, smoothTangentNormal],
      [flatTangentNormal, flatTangentNormal, flatTangentNormal],
      [smoothTangentNormal, nextCurveNormal, nextCurveNormal],
      [smoothTangentNormal, nextCurveNormal, smoothTangentNormal],
    ],
  },
};
const classifiedTangentSolid = solidWithDerivedSurfaceTopology(tangentSurfaceSolid);
assert.deepEqual(classifiedTangentSolid.metadata.planarFaceGroups[0].indices, [0, 1]);
assert.deepEqual(classifiedTangentSolid.metadata.curvedSideFaceIndices, [2, 3]);
assert.deepEqual(classifiedTangentSolid.metadata.tangentEdges, [{
  startIndex: 1, endIndex: 2, planarGroupIndex: 0,
}]);
const tangentSurfaceGroup = createPushSolidGroupFromSolid(tangentSurfaceSolid);
const tangentSurfaceEdges = tangentSurfaceGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-tangent-edges');
assert.equal(tangentSurfaceEdges.userData.segmentCount, 1);
assert.equal(tangentSurfaceEdges.material.linewidth, PUSH_SOLID_STYLE.tangentEdgeLineWidth);
assert.equal(tangentSurfaceEdges.material.polygonOffset, true);
assert.equal(
  tangentSurfaceEdges.material.polygonOffsetFactor,
  PUSH_SOLID_STYLE.edgePolygonOffsetFactor,
);
const tangentVisibilityCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 1000);
tangentVisibilityCamera.position.set(4, -8, 8);
tangentVisibilityCamera.lookAt(5, 2.5, 0);
tangentVisibilityCamera.updateMatrixWorld();
updatePushSilhouetteGroup(tangentSurfaceGroup, tangentVisibilityCamera);
const tangentSurfaceHiddenEdges = tangentSurfaceGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-hidden-edges');
assert.equal(tangentSurfaceHiddenEdges.material.depthTest, false);
disposeThreeObject(tangentSurfaceGroup);

const shallowRoofSolid = {
  ...tangentSurfaceSolid,
  metadata: {
    booleanKernel: 'manifold-3d',
    faceVertexNormals: [
      [smoothTangentNormal, nextCurveNormal, smoothTangentNormal],
      [nextCurveNormal, smoothTangentNormal, nextCurveNormal],
      [nextCurveNormal, nextCurveNormal, nextCurveNormal],
      [smoothTangentNormal, nextCurveNormal, smoothTangentNormal],
    ],
    exactGeometry: {
      base: {
        profile: {
          plane: {
            origin: { x: 0, y: 0, z: 0 },
            xAxis: { x: 1, y: 0, z: 0 },
            yAxis: { x: 0, y: 0, z: 1 },
            normal: { x: 0, y: 1, z: 0 },
          },
          outerLoop: {
            segments: [
              { type: 'line', start: { x: 0, y: 0 }, end: { x: 10, y: 0 } },
              { type: 'line', start: { x: 10, y: 0 }, end: { x: 10, y: -1 } },
              { type: 'line', start: { x: 10, y: -1 }, end: { x: 0, y: 0 } },
            ],
          },
          innerLoops: [],
        },
        extrusion: {
          direction: { x: 0, y: 1, z: 0 },
          distance: 5,
          offset: { x: 0, y: 5, z: 0 },
        },
      },
    },
  },
};
const classifiedShallowRoof = solidWithDerivedSurfaceTopology(shallowRoofSolid);
assert.deepEqual(classifiedShallowRoof.metadata.planarFaceGroups.find((group) =>
  group.indices.includes(0))?.indices, [0, 1]);
assert.equal(classifiedShallowRoof.metadata.curvedSideFaceIndices.includes(0), false);
assert.equal(classifiedShallowRoof.metadata.curvedSideFaceIndices.includes(1), false);
assert.ok(classifiedShallowRoof.edges.some(([start, end]) =>
  (start === 1 && end === 2) || (start === 2 && end === 1)));

const annulusSegments = 12;
const annulusVertices = [3, 1.5].flatMap((radius) =>
  Array.from({ length: annulusSegments }, (_, index) => ({
    x: Math.cos(index * Math.PI * 2 / annulusSegments) * radius,
    y: Math.sin(index * Math.PI * 2 / annulusSegments) * radius,
    z: 0,
  })));
const annulusFaces = Array.from({ length: annulusSegments }, (_, index) => {
  const next = (index + 1) % annulusSegments;
  return [
    [index, next, annulusSegments + next],
    [index, annulusSegments + next, annulusSegments + index],
  ];
}).flat();
const classifiedAnnulus = solidWithDerivedSurfaceTopology({
  vertices: annulusVertices,
  faces: annulusFaces,
  edges: [],
  metadata: {
    booleanKernel: 'manifold-3d',
    faceVertexNormals: annulusFaces.map((face) => face.map(() => flatTangentNormal)),
  },
});
assert.equal(classifiedAnnulus.metadata.planarFaceGroups.length, 1);
assert.equal(classifiedAnnulus.metadata.curvedSideFaceIndices.length, 0);
assert.equal(classifiedAnnulus.edges.length, annulusSegments * 2);

const contactArcPoints = [
  { x: 4, y: 1, z: 2 },
  { x: 4, y: 1, z: 3 },
  ...Array.from({ length: 8 }, (_, index) => {
    const angle = Math.PI - (index + 1) * Math.PI / 16;
    return { x: 4, y: 2 + Math.cos(angle), z: 3 + Math.sin(angle) };
  }),
  { x: 4, y: 3, z: 4 },
  { x: 4, y: 3, z: 3.5 },
  { x: 4, y: 2, z: 3.5 },
  { x: 4, y: 2, z: 2 },
];
const tangentContactUnion = profileFeaturePushSolid({
  id: 'tangent-contact-profile',
  points: contactArcPoints,
  holes: [],
  normal: { x: 1, y: 0, z: 0 },
  cadProfileVertexIndices: [0, 1, 9, 10, 11, 12, 13],
  smoothProfileVertexIndices: [2, 3, 4, 5, 6, 7, 8],
  supportSolid: booleanBaseSolid,
  supportContactOnly: true,
  supportLoops: {
    outer: [
      { x: 4, y: 0, z: 0 }, { x: 4, y: 4, z: 0 },
      { x: 4, y: 4, z: 2 }, { x: 4, y: 0, z: 2 },
    ],
    holes: [],
  },
  sourceSolidDocumentId: 'solid3d-tangent-contact',
  sketchId: 'sketch3d-tangent-contact',
  workplane: {
    type: 'fixed',
    origin: { x: 4, y: 0, z: 0 },
    xAxis: { x: 0, y: 1, z: 0 },
    yAxis: { x: 0, y: 0, z: 1 },
    normal: { x: 1, y: 0, z: 0 },
  },
}, -2);
assert.equal(isValidSolid3d(tangentContactUnion), true);
assert.equal(tangentContactUnion.metadata.booleanOperation, 'union');
assert.equal(tangentContactUnion.metadata.profileFeatures.at(-1).tangentContact, true);
assert.ok(tangentContactUnion.metadata.tangentEdges.length >= 2);

const coplanarResidue = 4e-4;
const steppedProfile = [
  [0, 0],
  [10, 0],
  [10, 10],
  [coplanarResidue, 10],
  [coplanarResidue, 5],
  [0, 5],
];
const steppedVertices = [
  ...steppedProfile.map(([y, z]) => ({ x: 0, y, z })),
  ...steppedProfile.map(([y, z]) => ({ x: 10, y, z })),
];
const steppedCap = [
  [0, 1, 4],
  [0, 4, 5],
  [1, 2, 3],
  [1, 3, 4],
];
const steppedFaces = [
  ...steppedCap.map((face) => [...face].reverse()),
  ...steppedCap.map((face) => face.map((index) => index + 6)),
  ...steppedProfile.map((_, index) => [
    index,
    (index + 1) % steppedProfile.length,
    (index + 1) % steppedProfile.length + steppedProfile.length,
    index + steppedProfile.length,
  ]),
];
const steppedSolid = solidWithDerivedSurfaceTopology(createSolid3d({
  vertices: steppedVertices,
  faces: steppedFaces,
  edges: [],
  metadata: {
    booleanKernel: 'manifold-3d',
    booleanOperation: 'union',
  },
}));
assert.equal(auditSolidCadTopology(steppedSolid).valid, true);
assert.equal(steppedSolid.metadata.planarFaceGroups.length, 8);
const rebuiltSteppedSolid = rebuildSolidCadTopology(steppedSolid, {
  toleranceFactor: 1,
});
assert.ok(rebuiltSteppedSolid);
assert.equal(rebuiltSteppedSolid.metadata.planarFaceGroups.length, 6);
const rebuiltSteppedAudit = auditSolidCadTopology(rebuiltSteppedSolid);
assert.equal(rebuiltSteppedAudit.valid, true);
assert.equal(rebuiltSteppedAudit.closed, true);
assert.equal(rebuiltSteppedAudit.stats.missingCadBoundaryCount, 0);
assert.equal(rebuiltSteppedAudit.stats.internalTriangulationEdgeCount, 0);
assert.equal(
  rebuiltSteppedSolid.metadata.faceVertexNormals.length,
  rebuiltSteppedSolid.faces.length,
);
const rebuiltSteppedGeometry =
  solid3dToBufferGeometry(rebuiltSteppedSolid);
assert.equal(
  rebuiltSteppedGeometry.userData.webcadRenderMode,
  'stored-normals',
);
rebuiltSteppedGeometry.dispose();

const manifoldRectangleUnion = profileFeaturePushSolid(rectangleFeatureFace, 1);
assert.equal(manifoldRectangleUnion.metadata.booleanKernel, 'manifold-3d');
assert.equal(manifoldRectangleUnion.metadata.booleanOperation, 'union');
assert.equal(computeSolidBounds3d(manifoldRectangleUnion).maxZ, 3);
assert.ok(manifoldRectangleUnion.metadata.planarFaceGroups.length >= 7);
assert.equal(manifoldRectangleUnion.metadata.curvedSideFaceIndices.length, 0);
assert.ok(manifoldRectangleUnion.edges.length < manifoldRectangleUnion.faces.length);
const rectanglePlanarGroupByFace = new Map();
manifoldRectangleUnion.metadata.planarFaceGroups.forEach((group, groupIndex) => {
  group.indices.forEach((faceIndex) => rectanglePlanarGroupByFace.set(faceIndex, groupIndex));
});
const rectangleEdgeFaces = new Map();
manifoldRectangleUnion.faces.forEach((face, faceIndex) => {
  face.forEach((start, index) => {
    const end = face[(index + 1) % face.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    if (!rectangleEdgeFaces.has(key)) rectangleEdgeFaces.set(key, []);
    rectangleEdgeFaces.get(key).push(faceIndex);
  });
});
manifoldRectangleUnion.edges.forEach(([start, end]) => {
  const key = start < end ? `${start}:${end}` : `${end}:${start}`;
  const faces = rectangleEdgeFaces.get(key) ?? [];
  if (faces.length !== 2) return;
  const firstGroup = rectanglePlanarGroupByFace.get(faces[0]);
  const secondGroup = rectanglePlanarGroupByFace.get(faces[1]);
  assert.equal(
    firstGroup !== undefined && firstGroup === secondGroup,
    false,
    'La booleana no debe publicar costuras internas dentro de una misma cara plana',
  );
});

const manifoldCircleUnion = profileFeaturePushSolid(booleanSketchFace, 1);
assert.equal(manifoldCircleUnion.metadata.booleanKernel, 'manifold-3d');
assert.ok(manifoldCircleUnion.metadata.curvedSideFaceIndices.length >= booleanCirclePoints.length);
assert.ok(manifoldCircleUnion.edges.length < manifoldCircleUnion.faces.length);
assert.equal(manifoldCircleUnion.metadata.tangentEdges.length, 0);
const manifoldCircleEdges = deriveSolidAnalyticEdges(manifoldCircleUnion);
assert.ok(manifoldCircleEdges.curves.length >= 2);
assert.ok(manifoldCircleEdges.curves.reduce((sum, curve) =>
  sum + curve.sourceEdgeIndices.length, 0) >= booleanCirclePoints.length * 2);
assert.equal(buildPushGeneratrixSilhouetteSegments(
  manifoldCircleUnion,
  unionProfileCamera,
).length, 2);

// Regression contract: a large oblique circular feature reproduces the scale and
// orientation of samples/casa.webcad without depending on that example file.
const phaseZeroWallHeight = 92.06571052277758;
const phaseZeroRoofRun = 80.59148108145075;
const phaseZeroRidgeHeight = 153.72520693425116;
const phaseZeroHouseDepth = 135.72994857380954;
const phaseZeroRoofRise = phaseZeroRidgeHeight - phaseZeroWallHeight;
const phaseZeroRoofLength = Math.hypot(phaseZeroRoofRun, phaseZeroRoofRise);
const phaseZeroRoofPlane = {
  type: 'fixed',
  origin: { x: 0, y: 0, z: phaseZeroWallHeight },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: {
    x: 0,
    y: phaseZeroRoofRun / phaseZeroRoofLength,
    z: phaseZeroRoofRise / phaseZeroRoofLength,
  },
  normal: {
    x: 0,
    y: -phaseZeroRoofRise / phaseZeroRoofLength,
    z: phaseZeroRoofRun / phaseZeroRoofLength,
  },
};
const phaseZeroHouseExactProfile = exactProfileFromOrderedEntities([
  {
    type: 'LINE',
    start: { x: 0, y: 0, z: 0 },
    end: { x: 0, y: -phaseZeroWallHeight, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: 0, y: -phaseZeroWallHeight, z: 0 },
    end: { x: phaseZeroRoofRun, y: -phaseZeroRidgeHeight, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: phaseZeroRoofRun, y: -phaseZeroRidgeHeight, z: 0 },
    end: { x: phaseZeroRoofRun * 2, y: -phaseZeroWallHeight, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: phaseZeroRoofRun * 2, y: -phaseZeroWallHeight, z: 0 },
    end: { x: phaseZeroRoofRun * 2, y: 0, z: 0 },
  },
  {
    type: 'LINE',
    start: { x: phaseZeroRoofRun * 2, y: 0, z: 0 },
    end: { x: 0, y: 0, z: 0 },
  },
], {
  id: 'phase-zero-house-profile',
  plane: {
    type: 'plane',
    origin: { x: 0, y: 0, z: 0 },
    xAxis: { x: 0, y: 1, z: 0 },
    yAxis: { x: 0, y: 0, z: 1 },
    normal: { x: 1, y: 0, z: 0 },
  },
});
const phaseZeroHouseSolid = solidFromFacePush({
  id: 'phase-zero-house-profile',
  points: [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: phaseZeroWallHeight },
    { x: 0, y: phaseZeroRoofRun, z: phaseZeroRidgeHeight },
    { x: 0, y: phaseZeroRoofRun * 2, z: phaseZeroWallHeight },
    { x: 0, y: phaseZeroRoofRun * 2, z: 0 },
  ],
  holes: [],
  normal: { x: -1, y: 0, z: 0 },
  exactProfile: phaseZeroHouseExactProfile,
  cadProfileVertexIndices: [0, 1, 2, 3, 4],
  smoothProfileVertexIndices: [],
}, phaseZeroHouseDepth);
const phaseZeroCircleCenter = {
  x: -72.24854766115044,
  y: 54.08993003478379,
  z: 0,
};
const phaseZeroCircleRadius = 10.000504453653773;
const phaseZeroCirclePoints = Array.from({ length: 64 }, (_, index) => {
  const angle = index * Math.PI * 2 / 64;
  return {
    x: phaseZeroCircleCenter.x + Math.cos(angle) * phaseZeroCircleRadius,
    y: phaseZeroCircleCenter.y + Math.sin(angle) * phaseZeroCircleRadius,
    z: 0,
  };
});
const phaseZeroCircleFace = faceOnSketchPlane({
  id: 'phase-zero-circle-face',
  points: phaseZeroCirclePoints,
  holes: [],
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: phaseZeroCirclePoints.map((_, index) => index),
  exactProfile: exactProfileFromCircle({
    id: 'phase-zero-circle',
    type: 'CIRCLE',
    center: {
      x: phaseZeroCircleCenter.x,
      y: -phaseZeroCircleCenter.y,
      z: 0,
    },
    radius: phaseZeroCircleRadius,
  }),
}, phaseZeroRoofPlane, 'phase-zero-sketch');
phaseZeroCircleFace.supportSolid = phaseZeroHouseSolid;
phaseZeroCircleFace.supportLoops = {
  outer: [
    { x: 0, y: 0, z: phaseZeroWallHeight },
    { x: -phaseZeroHouseDepth, y: 0, z: phaseZeroWallHeight },
    {
      x: -phaseZeroHouseDepth,
      y: phaseZeroRoofRun,
      z: phaseZeroRidgeHeight,
    },
    { x: 0, y: phaseZeroRoofRun, z: phaseZeroRidgeHeight },
  ],
  holes: [],
};
phaseZeroCircleFace.sourceSolidDocumentId = 'phase-zero-house-solid';
const phaseZeroExtrusionDistance = 46.49081957742693;
const phaseZeroUnion = profileFeaturePushSolid(
  phaseZeroCircleFace,
  phaseZeroExtrusionDistance,
);
assert.ok(phaseZeroUnion);
assert.ok(
  editableBooleanMeshTolerance(phaseZeroUnion) <
    phaseZeroCircleRadius * (1 - Math.cos(Math.PI / 32)),
  'La limpieza booleana editable no debe poder colapsar una faceta circular analítica',
);
const phaseZeroAnalyticEdges = deriveSolidAnalyticEdges(phaseZeroUnion);
const [phaseZeroCircularSide] = deriveSolidAnalyticSideSurfaces(phaseZeroUnion);
const phaseZeroAnalyticTopology = deriveSolidAnalyticTopology(phaseZeroUnion);
assert.ok(phaseZeroCircularSide);
assert.equal(phaseZeroAnalyticTopology.sideSurfaces.length, 1);
assert.ok(phaseZeroAnalyticTopology.faceSurfaceIds.some(Boolean));
assert.ok(phaseZeroAnalyticTopology.internalSideEdges.length > 0);
const phaseZeroSideAxis = new THREE.Vector3(
  phaseZeroCircularSide.offset.x,
  phaseZeroCircularSide.offset.y,
  phaseZeroCircularSide.offset.z,
).normalize();
const phaseZeroRadialError = (point) => {
  const relative = new THREE.Vector3(
    point.x - phaseZeroCircularSide.center.x,
    point.y - phaseZeroCircularSide.center.y,
    point.z - phaseZeroCircularSide.center.z,
  );
  const localX = relative.dot(new THREE.Vector3(
    phaseZeroCircularSide.uAxis.x,
    phaseZeroCircularSide.uAxis.y,
    phaseZeroCircularSide.uAxis.z,
  ));
  const localY = relative.dot(new THREE.Vector3(
    phaseZeroCircularSide.vAxis.x,
    phaseZeroCircularSide.vAxis.y,
    phaseZeroCircularSide.vAxis.z,
  ));
  return Math.abs(
    (localX / phaseZeroCircularSide.radiusX) ** 2 +
    (localY / phaseZeroCircularSide.radiusY) ** 2 -
    1,
  );
};
const phaseZeroLongitudinalMeshSeams = phaseZeroAnalyticEdges.lines.filter((line) => {
  const direction = new THREE.Vector3(
    line.end.x - line.start.x,
    line.end.y - line.start.y,
    line.end.z - line.start.z,
  );
  return direction.length() >= phaseZeroExtrusionDistance * 0.9 &&
    Math.abs(direction.normalize().dot(phaseZeroSideAxis)) >= 1 - 1e-6 &&
    phaseZeroRadialError(line.start) <= 5e-3 &&
    phaseZeroRadialError(line.end) <= 5e-3;
}).length;
const phaseZeroGeometry = solid3dToBufferGeometry(phaseZeroUnion);
const phaseZeroLevel = (point) => new THREE.Vector3(
  point.x - phaseZeroRoofPlane.origin.x,
  point.y - phaseZeroRoofPlane.origin.y,
  point.z - phaseZeroRoofPlane.origin.z,
).dot(new THREE.Vector3(
  phaseZeroRoofPlane.normal.x,
  phaseZeroRoofPlane.normal.y,
  phaseZeroRoofPlane.normal.z,
));
const phaseZeroCapFaces = new Set(phaseZeroUnion.faces.flatMap((face, faceIndex) =>
  face.every((vertexIndex) =>
    Math.abs(phaseZeroLevel(phaseZeroUnion.vertices[vertexIndex]) -
      phaseZeroExtrusionDistance) <= 1e-3)
    ? [faceIndex]
    : []));
const phaseZeroMesh = {
  uuid: 'phase-zero-oblique-circle',
  geometry: phaseZeroGeometry,
  userData: {
    type: 'webcad-push-solid',
    solid: phaseZeroUnion,
    documentSolidId: 'phase-zero-house-solid',
  },
};
const phaseZeroSelectedCapFaces = phaseZeroGeometry.userData.webcadFaceTriangleMap
  .flatMap((faceIndex, triangleIndex) => {
    if (!phaseZeroCapFaces.has(faceIndex)) return [];
    const face = solidFaceFromMeshHit({
      object: phaseZeroMesh,
      faceIndex: triangleIndex,
    });
    return face ? [face] : [];
  });
const phaseZeroSupportPlane = {
  ...phaseZeroRoofPlane,
  origin: {
    x: phaseZeroRoofPlane.origin.x +
      phaseZeroRoofPlane.normal.x * phaseZeroExtrusionDistance,
    y: phaseZeroRoofPlane.origin.y +
      phaseZeroRoofPlane.normal.y * phaseZeroExtrusionDistance,
    z: phaseZeroRoofPlane.origin.z +
      phaseZeroRoofPlane.normal.z * phaseZeroExtrusionDistance,
  },
};
const phaseZeroSupport = phaseZeroSelectedCapFaces.length
  ? snapshotSketchSupportFace(
    phaseZeroSelectedCapFaces[0],
    phaseZeroSupportPlane,
    {
      solids: [{
        id: 'phase-zero-house-solid',
        visible: true,
        solid: phaseZeroUnion,
      }],
    },
  )
  : null;
const phaseZeroContract = {
  analyticCircleCount: phaseZeroAnalyticEdges.curves.length,
  closedCircleCount: phaseZeroAnalyticEdges.curves.filter((curve) => curve.closed).length,
  longitudinalMeshSeams: phaseZeroLongitudinalMeshSeams,
  capTrianglesDetected: phaseZeroCapFaces.size > 0,
  capTrianglesSelectable: phaseZeroSelectedCapFaces.length === phaseZeroCapFaces.size,
  capFaceIdentities: new Set(phaseZeroSelectedCapFaces.map((face) => face.id)).size,
  circularSupportBoundaries: (phaseZeroSupport?.boundaries ?? [])
    .filter((boundary) => boundary.type === 'circle').length,
};

const phaseFourModel = createModel3d();
addModel3dSolid(phaseFourModel, phaseZeroUnion, {
  id: 'phase-zero-house-solid',
});
addModel3dSketch(phaseFourModel, {
  id: 'phase-four-supported-sketch',
  plane: phaseZeroSupportPlane,
  metadata: { supportFace: phaseZeroSupport },
});
const phaseFourReopened = parseSerializedModel3d(JSON.parse(JSON.stringify(
  serializeModel3d(phaseFourModel),
)));
const phaseFourReopenedSketch = phaseFourReopened.sketches[0];
const phaseFourReopenedSupport = phaseFourReopenedSketch.metadata.supportFace;
assert.equal(phaseFourReopenedSupport.sourceSolidId, 'phase-zero-house-solid');
assert.equal(phaseFourReopenedSupport.boundaries.length, 1);
assert.equal(phaseFourReopenedSupport.boundaries[0].type, 'circle');
assert.ok(Math.abs(
  phaseFourReopenedSupport.boundaries[0].radius - phaseZeroCircleRadius,
) < 1e-9);
assert.deepEqual(
  sketchSupportBoundaryEntities(phaseFourReopenedSketch, phaseFourReopened)
    .map((entity) => entity.type),
  ['CIRCLE'],
);
assert.deepEqual(
  sketchEditReferences(
    phaseFourReopened,
    phaseFourReopenedSketch.plane,
    { mode: 'section', sketch: phaseFourReopenedSketch },
  ).map((reference) => reference.type),
  ['circle'],
);
assert.equal(
  deriveSolidAnalyticEdges(phaseFourReopened.solids[0].solid)
    .curves.filter((curve) => curve.closed).length,
  2,
);

const phaseFourLegacySketch = JSON.parse(JSON.stringify(phaseFourReopenedSketch));
delete phaseFourLegacySketch.metadata.supportFace.boundaries;
assert.deepEqual(
  sketchSupportBoundaryEntities(phaseFourLegacySketch, phaseFourReopened)
    .map((entity) => entity.type),
  ['CIRCLE'],
);
assert.equal(
  phaseFourLegacySketch.metadata.supportFace.boundaries,
  undefined,
  'El enriquecimiento de archivos antiguos debe ser dinamico y no migrar el documento',
);
phaseZeroGeometry.dispose();
assert.deepEqual({
  analyticCircleCount: phaseZeroContract.analyticCircleCount,
  closedCircleCount: phaseZeroContract.closedCircleCount,
  longitudinalMeshSeams: phaseZeroContract.longitudinalMeshSeams,
}, {
  analyticCircleCount: 2,
  closedCircleCount: 2,
  longitudinalMeshSeams: 0,
}, 'Las curvas circulares conocidas deben conservar una identidad analitica por contorno');

// A semicircular subtractive push whose arc is coincident with the existing
// cylinder must not promote Manifold triangulation loops to analytic curves.
const coincidentCutRadius = phaseZeroCircleRadius;
const coincidentCutDistance = -30.993881308189756;
const coincidentCutCenter = pointOnSketchPlane({
  x: phaseZeroCircleCenter.x,
  y: phaseZeroCircleCenter.y,
  z: 0,
}, phaseZeroRoofPlane);
const coincidentCutStartCenter = {
  x: coincidentCutCenter.x + phaseZeroRoofPlane.normal.x * phaseZeroExtrusionDistance,
  y: coincidentCutCenter.y + phaseZeroRoofPlane.normal.y * phaseZeroExtrusionDistance,
  z: coincidentCutCenter.z + phaseZeroRoofPlane.normal.z * phaseZeroExtrusionDistance,
};
const coincidentCutPlane = {
  ...phaseZeroRoofPlane,
  origin: {
    x: coincidentCutStartCenter.x + coincidentCutRadius,
    y: coincidentCutStartCenter.y,
    z: coincidentCutStartCenter.z,
  },
};
const coincidentCutProfile = exactProfileFromOrderedEntities([
  {
    type: 'LINE',
    start: { x: -coincidentCutRadius * 2, y: 0, z: 0 },
    end: { x: 0, y: 0, z: 0 },
  },
  {
    type: 'ARC',
    center: { x: -coincidentCutRadius, y: 0, z: 0 },
    radius: coincidentCutRadius,
    startAngle: 0,
    endAngle: Math.PI,
    clockwise: true,
  },
], {
  id: 'phase-zero-coincident-cut-profile',
});
const coincidentCutLocalPoints = sampleExactProfile(coincidentCutProfile, { segments: 64 });
const coincidentCutFace = faceOnSketchPlane({
  id: 'phase-zero-coincident-cut-face',
  points: coincidentCutLocalPoints.map((point) => ({
    x: point.x,
    y: -point.y,
    z: point.z,
  })),
  holes: [],
  cadProfileVertexIndices: [0, coincidentCutLocalPoints.length - 1],
  smoothProfileVertexIndices: coincidentCutLocalPoints
    .map((_, index) => index)
    .filter((index) => index > 0 && index < coincidentCutLocalPoints.length - 1),
  exactProfile: coincidentCutProfile,
}, coincidentCutPlane, 'phase-zero-coincident-cut-sketch');
coincidentCutFace.supportSolid = phaseZeroUnion;
coincidentCutFace.supportLoops = {
  outer: phaseZeroCircleFace.points.map((point) => ({
    x: point.x + phaseZeroRoofPlane.normal.x * phaseZeroExtrusionDistance,
    y: point.y + phaseZeroRoofPlane.normal.y * phaseZeroExtrusionDistance,
    z: point.z + phaseZeroRoofPlane.normal.z * phaseZeroExtrusionDistance,
  })),
  holes: [],
};
coincidentCutFace.sourceSolidDocumentId = 'phase-zero-house-solid';
const coincidentCutSolid = profileFeaturePushSolid(
  coincidentCutFace,
  coincidentCutDistance,
);
assert.ok(coincidentCutSolid);
const coincidentCutAnalyticEdges = deriveSolidAnalyticEdges(coincidentCutSolid);
const coincidentCutEndCenter = {
  x: coincidentCutStartCenter.x + phaseZeroRoofPlane.normal.x * coincidentCutDistance,
  y: coincidentCutStartCenter.y + phaseZeroRoofPlane.normal.y * coincidentCutDistance,
  z: coincidentCutStartCenter.z + phaseZeroRoofPlane.normal.z * coincidentCutDistance,
};
const curvesAtCenter = (center) => coincidentCutAnalyticEdges.curves.filter((curve) =>
  Math.hypot(
    curve.center.x - center.x,
    curve.center.y - center.y,
    curve.center.z - center.z,
  ) <= 1e-2);
const coincidentCutStartCurves = curvesAtCenter(coincidentCutStartCenter);
const coincidentCutEndCurves = curvesAtCenter(coincidentCutEndCenter);
assert.equal(
  coincidentCutStartCurves.filter((curve) => curve.sweep < Math.PI / 16).length,
  0,
  'Los ciclos triangulares de la booleana no deben convertirse en arcos CAD',
);
assert.equal(
  coincidentCutEndCurves.length,
  1,
  'El fondo del vaciado debe conservar un unico arco analitico',
);
assert.ok(
  Math.abs(coincidentCutEndCurves[0].sweep - Math.PI) <= 1e-2,
  `El arco reconstruido cubre ${coincidentCutEndCurves[0].sweep} radianes`,
);
const isCoincidentCutStartCapSeam = ({ start, end }) => {
  const locations = [start, end].map((point) => {
    const relative = new THREE.Vector3(
      point.x - coincidentCutStartCenter.x,
      point.y - coincidentCutStartCenter.y,
      point.z - coincidentCutStartCenter.z,
    );
    const axial = relative.dot(new THREE.Vector3(
      phaseZeroRoofPlane.normal.x,
      phaseZeroRoofPlane.normal.y,
      phaseZeroRoofPlane.normal.z,
    ));
    return {
      axial,
      radial: relative.addScaledVector(
        new THREE.Vector3(
          phaseZeroRoofPlane.normal.x,
          phaseZeroRoofPlane.normal.y,
          phaseZeroRoofPlane.normal.z,
        ),
        -axial,
      ).length(),
    };
  });
  const length = new THREE.Vector3(
    end.x - start.x,
    end.y - start.y,
    end.z - start.z,
  ).length();
  return length < coincidentCutRadius * 0.5 && locations.every((location) =>
    Math.abs(location.axial) <= 5e-2 &&
    Math.abs(location.radial - coincidentCutRadius) <= 5e-2);
};
assert.equal(
  coincidentCutAnalyticEdges.lines.filter(isCoincidentCutStartCapSeam).length,
  0,
  'Las costuras rechazadas como curvas tampoco deben reaparecer como lineas ocultas',
);
const coincidentCutGroup = createPushSolidGroupFromSolid(coincidentCutSolid);
const coincidentCutDisplayMesh = coincidentCutGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid');
const coincidentCutStaticEdges = coincidentCutGroup.children.find((child) =>
  child.userData?.type === 'webcad-push-solid-edges');
assert.equal(
  coincidentCutStaticEdges.userData.sourceSegments.filter((segment, index) =>
    isCoincidentCutStartCapSeam(segment) &&
    !coincidentCutStaticEdges.userData.curveGroupIds[index]).length,
  0,
  'El overlay 3D no debe recibir costuras de triangulacion de la tapa curva',
);
const coplanarPatchEdges = deriveSolidAnalyticEdges({
  vertices: [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 0, y: 1, z: 0 },
  ],
  faces: [
    [0, 1, 4],
    [1, 3, 4],
    [1, 2, 3],
  ],
  edges: [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    [1, 4], [1, 3],
  ],
  metadata: {},
});
assert.equal(
  coplanarPatchEdges.lines.length,
  4,
  'Las fronteras coplanares internas no son aristas CAD y los tramos colineales se consolidan',
);
assert.ok(
  coplanarPatchEdges.lines.some((line) =>
    line.sourceEdgeIndices.length === 2 &&
    Math.abs(line.start.y) <= 1e-9 &&
    Math.abs(line.end.y) <= 1e-9),
  'Una arista CAD recta debe conservar una única identidad aunque la malla la fragmente',
);
const continuedCylinderSeam = {
  vertices: [
    { x: 1, y: 0, z: 0 },
    { x: 1, y: 0, z: 2 },
    { x: 0, y: 0, z: 0 },
  ],
  faces: [[0, 1, 2]],
  edges: [[0, 1], [1, 2], [2, 0]],
  metadata: {
    exactGeometry: {
      extrusion: {
        distance: 1,
        direction: { x: 0, y: 0, z: 1 },
        profile: {
          plane: {
            origin: { x: 0, y: 0, z: 0 },
            xAxis: { x: 1, y: 0, z: 0 },
            yAxis: { x: 0, y: 1, z: 0 },
            normal: { x: 0, y: 0, z: 1 },
          },
          outerLoop: {
            segments: [{
              type: 'circle',
              center: { x: 0, y: 0, z: 0 },
              radius: 1,
            }],
          },
          innerLoops: [],
        },
      },
    },
    profileFeatures: [{
      type: 'union',
      distance: 1,
      exactProfile: {
        plane: {
          origin: { x: 0, y: 0, z: 1 },
          xAxis: { x: 1, y: 0, z: 0 },
          yAxis: { x: 0, y: 1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
        },
        outerLoop: {
          segments: [{
            type: 'circle',
            center: { x: 0, y: 0, z: 0 },
            radius: 1,
          }],
        },
        innerLoops: [],
      },
    }],
  },
};
assert.equal(
  deriveSolidAnalyticEdges(continuedCylinderSeam).lines.some((line) =>
    line.sourceEdgeIndices.some(([start, end]) =>
      start === 0 && end === 1 || start === 1 && end === 0)),
  false,
  'Una costura que atraviesa extrusiones cilíndricas continuas no es una arista CAD',
);
const continuedCylinderFacet = {
  ...structuredClone(continuedCylinderSeam),
  vertices: [
    { x: 1, y: 0, z: 0 },
    { x: 1, y: 0, z: 2 },
    { x: Math.cos(0.2), y: -Math.sin(0.2), z: 2 },
    { x: Math.cos(0.2), y: -Math.sin(0.2), z: 0 },
  ],
  faces: [
    [0, 1, 2],
    [0, 2, 3],
  ],
  edges: [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 2],
  ],
};
assert.equal(
  deriveSolidAnalyticTopology(continuedCylinderFacet).faceSurfaceIds.every(Boolean),
  true,
  'Una faceta que cruza extrusiones cilíndricas continuas sigue siendo una cara curva',
);
const coincidentCutDisplaySolid = coincidentCutDisplayMesh.userData.solid;
const coincidentCutCadAudit = auditSolidCadTopology(coincidentCutDisplaySolid);
assert.equal(
  coincidentCutCadAudit.valid,
  true,
  'La booleana coincidente debe conservar una topologia CAD completa',
);
assert.equal(coincidentCutCadAudit.stats.openCadLoopCount, 0);
assert.equal(coincidentCutCadAudit.stats.missingCadBoundaryCount, 0);
assert.equal(coincidentCutCadAudit.stats.orphanCadEdgeCount, 0);
assert.equal(coincidentCutCadAudit.stats.internalTriangulationEdgeCount, 0);
const solidShellCount = (solid) => {
  const neighbors = solid.faces.map(() => []);
  const uses = new Map();
  solid.faces.forEach((face, faceIndex) => face.forEach((start, index) => {
    const end = face[(index + 1) % face.length];
    const key = start < end ? `${start}:${end}` : `${end}:${start}`;
    if (!uses.has(key)) uses.set(key, []);
    uses.get(key).push(faceIndex);
  }));
  uses.forEach((faceIndices) => {
    if (faceIndices.length !== 2) return;
    const [first, second] = faceIndices;
    neighbors[first].push(second);
    neighbors[second].push(first);
  });
  const visited = new Set();
  let shells = 0;
  solid.faces.forEach((_, faceIndex) => {
    if (visited.has(faceIndex)) return;
    shells += 1;
    const pending = [faceIndex];
    visited.add(faceIndex);
    while (pending.length) {
      neighbors[pending.pop()].forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
  });
  return shells;
};
const coincidentCutAxis = new THREE.Vector3(
  phaseZeroRoofPlane.normal.x,
  phaseZeroRoofPlane.normal.y,
  phaseZeroRoofPlane.normal.z,
).normalize();
const coincidentCutStartPlanarGroupIndex = (
  coincidentCutDisplaySolid.metadata.planarFaceGroups ?? []
).findIndex((group) =>
  group.outerLoop?.length >= 3 &&
  group.smoothProfileVertexIndices?.length > 0 &&
  group.cadProfileVertexIndices?.length > 0 &&
  group.outerLoop.every((point) => Math.abs(new THREE.Vector3(
    point.x - coincidentCutStartCenter.x,
    point.y - coincidentCutStartCenter.y,
    point.z - coincidentCutStartCenter.z,
  ).dot(coincidentCutAxis)) <= 5e-2));
assert.ok(
  coincidentCutStartPlanarGroupIndex >= 0,
  'La semicara superior restante debe conservar un grupo plano seleccionable',
);
const coincidentCutStartPlanarGroup =
  coincidentCutDisplaySolid.metadata.planarFaceGroups[coincidentCutStartPlanarGroupIndex];
const coincidentCutStartFace = solidFaceFromPlanarGroup(
  coincidentCutDisplayMesh,
  coincidentCutStartPlanarGroupIndex,
);
assert.ok(coincidentCutStartFace);
const noisyCoincidentCut = structuredClone(coincidentCutDisplaySolid);
const noisyCoincidentGroup =
  noisyCoincidentCut.metadata.planarFaceGroups[coincidentCutStartPlanarGroupIndex];
const noisyCoincidentTopology = deriveSolidAnalyticTopology(noisyCoincidentCut);
const noisyCoincidentSemantic = noisyCoincidentTopology.semanticPlanarFaces.find((group) =>
  group.indices.includes(noisyCoincidentGroup.indices[0]));
assert.ok(noisyCoincidentSemantic);
const noisyCoincidentNormal = new THREE.Vector3(
  noisyCoincidentSemantic.normal.x + 2e-5,
  noisyCoincidentSemantic.normal.y,
  noisyCoincidentSemantic.normal.z,
).normalize();
noisyCoincidentGroup.normal = {
  x: noisyCoincidentNormal.x,
  y: noisyCoincidentNormal.y,
  z: noisyCoincidentNormal.z,
};
const noisyCoincidentMesh = new THREE.Mesh();
noisyCoincidentMesh.userData = {
  type: 'webcad-push-solid',
  solid: noisyCoincidentCut,
};
noisyCoincidentMesh.geometry.userData.webcadFaceTriangleMap = [
  noisyCoincidentGroup.indices[0],
];
const expectedCoincidentNormal = new THREE.Vector3(
  noisyCoincidentSemantic.normal.x,
  noisyCoincidentSemantic.normal.y,
  noisyCoincidentSemantic.normal.z,
).normalize();
if (expectedCoincidentNormal.dot(noisyCoincidentNormal) < 0) {
  expectedCoincidentNormal.multiplyScalar(-1);
}
[
  solidFaceFromPlanarGroup(noisyCoincidentMesh, coincidentCutStartPlanarGroupIndex),
  solidFaceFromMeshHit({ object: noisyCoincidentMesh, faceIndex: 0 }),
].forEach((face) => {
  assert.ok(face);
  assert.ok(new THREE.Vector3(face.normal.x, face.normal.y, face.normal.z)
    .distanceTo(expectedCoincidentNormal) <= 1e-10);
  assert.ok(new THREE.Vector3(
    face.exactProfile.plane.normal.x,
    face.exactProfile.plane.normal.y,
    face.exactProfile.plane.normal.z,
  ).distanceTo(expectedCoincidentNormal) <= 1e-10);
});
noisyCoincidentMesh.geometry.dispose();
const coincidentCutTriangleMap =
  coincidentCutDisplayMesh.geometry.userData.webcadFaceTriangleMap;
const coincidentCutStartTriangleIndex = coincidentCutTriangleMap.findIndex((faceIndex) =>
  coincidentCutStartPlanarGroup.indices.includes(faceIndex));
const coincidentCutStartHitFace = solidFaceFromMeshHit({
  object: coincidentCutDisplayMesh,
  faceIndex: coincidentCutStartTriangleIndex,
});
assert.ok(
  coincidentCutStartHitFace,
  'El clic sobre la semicara superior debe resolver una cara seleccionable',
);
assert.ok(
  coincidentCutStartHitFace.exactProfile?.outerLoop?.segments.some((segment) =>
    segment.type === 'arc-circle') &&
  coincidentCutStartHitFace.exactProfile.outerLoop.segments.some((segment) =>
    segment.type === 'line'),
  'La selección superior debe conservar por separado el arco y su cuerda',
);
assert.equal(
  coincidentCutStartHitFace.exactProfile.outerLoop.segments.length,
  2,
  'La semicara superior no debe fragmentar su perfil analítico',
);
const coincidentCutSelection = createSolidFaceSelectionMesh(coincidentCutStartHitFace);
assert.ok(
  coincidentCutSelection.geometry.getAttribute('position').count >= 40,
  'El resaltado de una cara curva debe rasterizar su perfil analítico, no las facetas booleanas',
);
disposeThreeObject(coincidentCutSelection);
const coincidentCutStartRepushDistance = 2;
const coincidentCutStartRepush = movedSolidFacePush(
  coincidentCutStartHitFace,
  coincidentCutStartRepushDistance,
);
assert.ok(
  coincidentCutStartRepush && isPushSolidIntegrityValid(coincidentCutStartRepush),
  'El Push coplanario de la semicara superior debe producir un sólido íntegro',
);
assert.equal(
  solidShellCount(coincidentCutStartRepush),
  1,
  'El Push coplanario superior debe fusionarse en una única envolvente',
);
const coincidentCutStartRepushEdges = deriveSolidAnalyticEdges(coincidentCutStartRepush);
const coincidentCutStartRepushCenter = {
  x: coincidentCutStartCenter.x +
    coincidentCutStartHitFace.normal.x * coincidentCutStartRepushDistance,
  y: coincidentCutStartCenter.y +
    coincidentCutStartHitFace.normal.y * coincidentCutStartRepushDistance,
  z: coincidentCutStartCenter.z +
    coincidentCutStartHitFace.normal.z * coincidentCutStartRepushDistance,
};
const linesOnCircularCap = (edges, center, normal) => edges.lines.filter((line) => {
  const capNormal = new THREE.Vector3(normal.x, normal.y, normal.z).normalize();
  const locations = [line.start, line.end].map((point) => {
    const relative = new THREE.Vector3(
      point.x - center.x,
      point.y - center.y,
      point.z - center.z,
    );
    const axial = relative.dot(capNormal);
    return {
      axial,
      radial: relative.addScaledVector(capNormal, -axial).length(),
    };
  });
  return locations.every((location) =>
    Math.abs(location.axial) <= 5e-2 &&
    location.radial <= coincidentCutRadius * 1.05) &&
    new THREE.Vector3(
      line.end.x - line.start.x,
      line.end.y - line.start.y,
      line.end.z - line.start.z,
    ).length() >= coincidentCutRadius * 1.8;
});
assert.ok(
  coincidentCutStartRepushEdges.curves.some((curve) =>
    Math.hypot(
      curve.center.x - coincidentCutStartRepushCenter.x,
      curve.center.y - coincidentCutStartRepushCenter.y,
      curve.center.z - coincidentCutStartRepushCenter.z,
    ) <= 5e-2 &&
    Math.abs(curve.sweep - Math.PI) <= 1e-2),
  'La tapa superior desplazada debe conservar un único arco semicircular',
);
assert.equal(
  linesOnCircularCap(
    coincidentCutStartRepushEdges,
    coincidentCutStartRepushCenter,
    coincidentCutStartHitFace.normal,
  ).length,
  1,
  'La cuerda superior debe publicarse como una única arista analítica continua',
);
assert.equal(
  coincidentCutStartRepushEdges.curves.filter((curve) =>
    Math.hypot(
      curve.center.x - coincidentCutStartCenter.x,
      curve.center.y - coincidentCutStartCenter.y,
      curve.center.z - coincidentCutStartCenter.z,
    ) <= 5e-2).length,
  0,
  'La unión no debe conservar el arco de la interfaz coplanaria inicial',
);
assert.equal(
  linesOnCircularCap(
    coincidentCutStartRepushEdges,
    coincidentCutStartCenter,
    coincidentCutStartHitFace.normal,
  ).length,
  0,
  'La unión no debe conservar la cuerda de la interfaz coplanaria inicial',
);
const coincidentCutStartRepushSurface =
  deriveSolidAnalyticSideSurfaces(coincidentCutStartRepush).find((surface) =>
    Math.abs(new THREE.Vector3(
      surface.offset.x,
      surface.offset.y,
      surface.offset.z,
    ).length() - coincidentCutStartRepushDistance) <= 5e-2 &&
    Math.hypot(
      surface.center.x - coincidentCutStartCenter.x,
      surface.center.y - coincidentCutStartCenter.y,
      surface.center.z - coincidentCutStartCenter.z,
    ) <= 5e-2);
assert.ok(coincidentCutStartRepushSurface);
assert.ok(
  coincidentCutStartRepushEdges.lines.filter((line) => {
    const direction = new THREE.Vector3(
      line.end.x - line.start.x,
      line.end.y - line.start.y,
      line.end.z - line.start.z,
    );
    return direction.length() >= coincidentCutStartRepushDistance * 0.75 &&
      Math.abs(direction.normalize().dot(new THREE.Vector3(
        coincidentCutStartHitFace.normal.x,
        coincidentCutStartHitFace.normal.y,
        coincidentCutStartHitFace.normal.z,
      ))) >= 0.99 &&
      [line.start, line.end].every((point) =>
        pointOnAnalyticSideSurface(
          coincidentCutStartRepush,
          point,
          coincidentCutStartRepushSurface,
        ));
  }).length <= 2,
  'La unión superior solo debe publicar las dos generatrices CAD del semicírculo',
);
const coincidentCutEndPlanarGroupIndex = (
  coincidentCutDisplaySolid.metadata.planarFaceGroups ?? []
).findIndex((group) =>
  group.outerLoop?.length >= 3 &&
  group.smoothProfileVertexIndices?.length > 0 &&
  group.cadProfileVertexIndices?.length > 0 &&
  group.outerLoop.every((point) => Math.abs(new THREE.Vector3(
    point.x - coincidentCutEndCenter.x,
    point.y - coincidentCutEndCenter.y,
    point.z - coincidentCutEndCenter.z,
  ).dot(coincidentCutAxis)) <= 5e-2));
assert.ok(
  coincidentCutEndPlanarGroupIndex >= 0,
  'La tapa semicircular real debe conservar un grupo plano seleccionable',
);
const coincidentCutEndPlanarGroup =
  coincidentCutDisplaySolid.metadata.planarFaceGroups[coincidentCutEndPlanarGroupIndex];
const coincidentCutEndFace = solidFaceFromPlanarGroup(
  coincidentCutDisplayMesh,
  coincidentCutEndPlanarGroupIndex,
);
assert.ok(coincidentCutEndFace);
assert.ok(
  coincidentCutEndFace.cadProfileVertexIndices.length > 0 &&
  coincidentCutEndFace.smoothProfileVertexIndices.length > 0,
  'La selección debe usar el contorno semicircular booleano, no la tapa circular histórica',
);
const coincidentCutEndTriangleIndex = coincidentCutTriangleMap.findIndex((faceIndex) =>
  coincidentCutEndPlanarGroup.indices.includes(faceIndex));
const coincidentCutEndHitFace = solidFaceFromMeshHit({
  object: coincidentCutDisplayMesh,
  faceIndex: coincidentCutEndTriangleIndex,
});
assert.ok(
  coincidentCutEndHitFace,
  'El hit de la malla debe resolver la tapa semicircular',
);
assert.ok(
  coincidentCutEndHitFace.exactProfile?.outerLoop?.segments.some((segment) =>
    segment.type === 'arc-circle'),
  'La cara parcial seleccionada debe reconstruir su arco exacto para el siguiente Push',
);
const coincidentCutEndRepushDistance = 2;
const coincidentCutEndRepush = movedSolidFacePush(
  coincidentCutEndHitFace,
  coincidentCutEndRepushDistance,
);
assert.ok(
  coincidentCutEndRepush && isPushSolidIntegrityValid(coincidentCutEndRepush),
  'El Push de la tapa semicircular debe producir un sólido íntegro',
);
assert.equal(
  solidShellCount(coincidentCutEndRepush),
  1,
  'El Push de la tapa semicircular debe fusionarse en una única envolvente',
);
const coincidentCutRepushCenter = {
  x: coincidentCutEndCenter.x +
    coincidentCutEndHitFace.normal.x * coincidentCutEndRepushDistance,
  y: coincidentCutEndCenter.y +
    coincidentCutEndHitFace.normal.y * coincidentCutEndRepushDistance,
  z: coincidentCutEndCenter.z +
    coincidentCutEndHitFace.normal.z * coincidentCutEndRepushDistance,
};
const coincidentCutRepushCurves = deriveSolidAnalyticEdges(coincidentCutEndRepush).curves
  .filter((curve) => Math.hypot(
    curve.center.x - coincidentCutRepushCenter.x,
    curve.center.y - coincidentCutRepushCenter.y,
    curve.center.z - coincidentCutRepushCenter.z,
  ) <= 5e-2);
const coincidentCutRepushEdges = deriveSolidAnalyticEdges(coincidentCutEndRepush);
const coincidentRegionId =
  coincidentCutEndRepush.metadata.profileFeatures[1].analyticRegionId;
const coincidentRegionDistance =
  coincidentCutEndRepush.metadata.profileFeatures[1].distance;
const coincidentCutRepushSurface = deriveSolidAnalyticSideSurfaces(coincidentCutEndRepush)
  .find((surface) =>
    surface.regionId === coincidentRegionId &&
    Math.abs(new THREE.Vector3(
      surface.offset.x,
      surface.offset.y,
      surface.offset.z,
    ).length() - Math.abs(coincidentRegionDistance)) <= 5e-2 &&
    Math.hypot(
      surface.center.x - coincidentCutStartCenter.x,
      surface.center.y - coincidentCutStartCenter.y,
      surface.center.z - coincidentCutStartCenter.z,
    ) <= 5e-2);
assert.ok(coincidentCutRepushSurface);
const coincidentCutRepushLongitudinalLines = coincidentCutRepushEdges.lines.filter((line) => {
  const direction = new THREE.Vector3(
    line.end.x - line.start.x,
    line.end.y - line.start.y,
    line.end.z - line.start.z,
  );
  return direction.length() >= coincidentCutEndRepushDistance * 0.75 &&
    Math.abs(direction.normalize().dot(new THREE.Vector3(
      coincidentCutEndHitFace.normal.x,
      coincidentCutEndHitFace.normal.y,
      coincidentCutEndHitFace.normal.z,
    ))) >= 0.99 &&
    [line.start, line.end].every((point) =>
      pointOnAnalyticSideSurface(coincidentCutEndRepush, point, coincidentCutRepushSurface));
});
assert.ok(
  coincidentCutRepushCurves.some((curve) => Math.abs(curve.sweep - Math.PI) <= 1e-2),
  'El Push repetido debe conservar la identidad del arco semicircular desplazado',
);
assert.ok(
  coincidentCutRepushLongitudinalLines.length <= 2,
  'El Push repetido no debe publicar las generatrices facetadas de la superficie curva',
);
assert.equal(
  coincidentCutEndRepush.metadata.profileFeatures.length,
  coincidentCutSolid.metadata.profileFeatures.length,
  'Editar la tapa terminal debe actualizar su feature semantico sin acumular otro',
);
assert.ok(coincidentRegionId);
assert.equal(coincidentCutEndHitFace.analyticRegionId, coincidentRegionId);

const analyticRegionHit = (solid, predicate) => {
  const mesh = createPushSolidMeshFromSolid(solid);
  const triangleMap = mesh.geometry.userData.webcadFaceTriangleMap ?? [];
  const hits = triangleMap.flatMap((_, triangleIndex) => {
    const face = solidFaceFromMeshHit({ object: mesh, faceIndex: triangleIndex });
    return face && predicate(face) ? [face] : [];
  });
  const identities = new Set(hits.map((face) => face.id));
  const face = hits[0] ?? null;
  mesh.geometry.dispose();
  mesh.material.dispose();
  return { face, hits, hitCount: hits.length, identityCount: identities.size };
};
const assertDividedRegionFeature = (solid, regionId) => {
  const feature = solid.metadata.profileFeatures.find((candidate) =>
    candidate.analyticRegionId === regionId);
  assert.ok(feature);
  const segments = feature.exactProfile?.outerLoop?.segments ?? [];
  assert.equal(segments.length, 2);
  const line = segments.find((segment) => segment.type === 'line');
  const arc = segments.find((segment) => segment.type === 'arc-circle');
  assert.ok(line);
  assert.ok(arc);
  assert.equal(line.source?.role, 'divider');
  assert.equal(arc.source?.role, 'profile-boundary');
  assert.ok([line, arc].every((segment) =>
    Math.abs(segment.source?.orientation) === 1));
  const lineLength = Math.hypot(
    line.end.x - line.start.x,
    line.end.y - line.start.y,
    (line.end.z ?? 0) - (line.start.z ?? 0),
  );
  assert.ok(lineLength > coincidentCutRadius * 1.9);
  segments.forEach((segment, index) => {
    const next = segments[(index + 1) % segments.length];
    assert.ok(Math.hypot(
      segment.end.x - next.start.x,
      segment.end.y - next.start.y,
      (segment.end.z ?? 0) - (next.start.z ?? 0),
    ) <= booleanWeldTolerance(solid));
  });
  assert.ok(Math.abs(arc.radius - coincidentCutRadius) <= 1e-9);
  return feature;
};

let repeatedDividedRegionSolid = coincidentCutEndRepush;
const repeatedDividedRegionFeatureCount =
  repeatedDividedRegionSolid.metadata.profileFeatures.length;
for (const moveDistance of [1.25, -0.5, 0.75]) {
  const selection = analyticRegionHit(
    repeatedDividedRegionSolid,
    (face) =>
      face.analyticRegionId === coincidentRegionId &&
      face.analyticCapIndex === 1,
  );
  assert.ok(selection.face);
  assert.ok(selection.hitCount > 1);
  assert.equal(selection.identityCount, 1);
  assert.deepEqual(
    selection.face.exactProfile.outerLoop.segments.map((segment) => segment.type),
    ['line', 'arc-circle'],
  );
  repeatedDividedRegionSolid = movedSolidFacePush(selection.face, moveDistance);
  assert.ok(repeatedDividedRegionSolid);
  assert.equal(
    repeatedDividedRegionSolid.metadata.profileFeatures.length,
    repeatedDividedRegionFeatureCount,
  );
  assertDividedRegionFeature(repeatedDividedRegionSolid, coincidentRegionId);
  assert.equal(isValidSolid3d(repeatedDividedRegionSolid), true);
  assert.equal(solidShellCount(repeatedDividedRegionSolid), 1);
}
const repeatedDividedSurface = deriveSolidAnalyticSideSurfaces(
  repeatedDividedRegionSolid,
).find((surface) =>
  surface.regionId === coincidentRegionId &&
  Math.abs(surface.radiusX - coincidentCutRadius) <= 1e-9);
assert.ok(repeatedDividedSurface);

const legacyProfileFixture = (rawProfile, storedProfile) => {
  const legacy = structuredClone(rawProfile);
  legacy.plane = structuredClone(storedProfile.plane);
  delete legacy.plane.coordinateSystem;
  legacy.analyticRegionId = storedProfile.analyticRegionId;
  const storedSegments = [
    storedProfile.outerLoop,
    ...(storedProfile.innerLoops ?? []),
  ].flatMap((loop) => loop.segments ?? []);
  const legacySegments = [
    legacy.outerLoop,
    ...(legacy.innerLoops ?? []),
  ].flatMap((loop) => loop.segments ?? []);
  legacySegments.forEach((segment, index) => {
    segment.source = structuredClone(storedSegments[index]?.source ?? null);
  });
  legacy.segments = legacy.outerLoop.segments;
  return legacy;
};
const legacyResidualSolid = structuredClone(repeatedDividedRegionSolid);
const legacyCreatorFeature = legacyResidualSolid.metadata.profileFeatures[0];
legacyCreatorFeature.exactProfile = legacyProfileFixture(
  exactProfileFromCircle({
    type: 'CIRCLE',
    center: {
      x: phaseZeroCircleCenter.x,
      y: -phaseZeroCircleCenter.y,
      z: 0,
    },
    radius: phaseZeroCircleRadius,
  }),
  legacyCreatorFeature.exactProfile,
);
const legacyOperatedFeature = legacyResidualSolid.metadata.profileFeatures
  .find((feature) => feature.analyticRegionId === coincidentRegionId);
legacyOperatedFeature.exactProfile = legacyProfileFixture(
  coincidentCutProfile,
  legacyOperatedFeature.exactProfile,
);
assert.equal(legacyResidualSolid.metadata.profileFeatures.every((feature) =>
  feature.exactProfile.plane.coordinateSystem === undefined), true);
const assertSelectionOverlayMatchesExactProfile = (face) => {
  const overlay = createSolidFaceSelectionMesh(face);
  assert.ok(overlay);
  const sampled = sampleExactProfile(face.exactProfile, {
    segments: 96,
    structured: true,
  });
  const expectedLoops = [
    sampled.outerLoop,
    ...sampled.innerLoops,
  ].map((loop) => {
    const world = loop.map((point) => pointOnExactProfilePlane(
      point,
      face.exactProfile.plane,
    ));
    if (world.length > 1 && Math.hypot(
      world[0].x - world.at(-1).x,
      world[0].y - world.at(-1).y,
      world[0].z - world.at(-1).z,
    ) <= 1e-7) {
      world.pop();
    }
    return world;
  });
  const expected = expectedLoops.flat();
  const position = overlay.geometry.getAttribute('position');
  assert.equal(position.count, expected.length);
  const normal = new THREE.Vector3(
    face.normal.x,
    face.normal.y,
    face.normal.z,
  ).normalize();
  expected.forEach((point, index) => {
    const actual = new THREE.Vector3(
      position.getX(index),
      position.getY(index),
      position.getZ(index),
    ).addScaledVector(normal, -0.006);
    assert.ok(actual.distanceTo(new THREE.Vector3(
      point.x,
      point.y,
      point.z,
    )) <= 2e-5);
  });
  disposeThreeObject(overlay);
};
const legacyResidualSelection = analyticRegionHit(
  legacyResidualSolid,
  (face) => {
    const segments = face.exactProfile?.outerLoop?.segments ?? [];
    return face.analyticParentRegionId ===
        legacyCreatorFeature.analyticRegionId &&
      segments.some((segment) => segment.type === 'line') &&
      segments.some((segment) => segment.type === 'arc-circle');
  },
);
assert.ok(legacyResidualSelection.hitCount > 2);
assert.equal(legacyResidualSelection.identityCount, 1);
assert.equal(
  legacyResidualSelection.face.exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);
const legacyResidualTopology = deriveSolidAnalyticTopology(
  legacyResidualSelection.face.sourceSolid,
);
const legacyResidualGroup = legacyResidualTopology.semanticPlanarFaces.find((group) =>
  group.kind === 'analytic-residual-parent' &&
  group.indices.includes(legacyResidualSelection.face.sourceSolidFaceIndex));
assert.ok(legacyResidualGroup);
const legacyResidualGroupErrors = legacyResidualGroup.outerLoop.map((point) =>
  Math.min(...legacyResidualSelection.face.points.map((candidate) => Math.hypot(
    point.x - candidate.x,
    point.y - candidate.y,
    point.z - candidate.z,
  ))));
assert.ok(Math.max(...legacyResidualGroupErrors) <= 2e-5);
const legacyResidualArc = legacyResidualSelection.face.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'arc-circle');
const legacyResidualLine = legacyResidualSelection.face.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'line');
const legacyResidualWorldArcCenter = pointOnExactProfilePlane(
  legacyResidualArc.center,
  legacyResidualSelection.face.exactProfile.plane,
);
assert.ok(Math.hypot(
  legacyResidualWorldArcCenter.x - coincidentCutStartCenter.x,
  legacyResidualWorldArcCenter.y - coincidentCutStartCenter.y,
  legacyResidualWorldArcCenter.z - coincidentCutStartCenter.z,
) <= 2e-5);
const legacyResidualArcEnds = [
  legacyResidualArc.start,
  legacyResidualArc.end,
].map((point) => pointOnExactProfilePlane(
  point,
  legacyResidualSelection.face.exactProfile.plane,
));
const legacyResidualLineEnds = [
  legacyResidualLine.start,
  legacyResidualLine.end,
].map((point) => pointOnExactProfilePlane(
  point,
  legacyResidualSelection.face.exactProfile.plane,
));
assert.equal(legacyResidualArcEnds.every((point) =>
  legacyResidualLineEnds.some((candidate) => Math.hypot(
    point.x - candidate.x,
    point.y - candidate.y,
    point.z - candidate.z,
  ) <= 1e-5)), true);
const legacyResidualLocalSamples = sampleExactProfile(
  legacyResidualSelection.face.exactProfile,
  { segments: 96 },
);
const legacyResidualBounds = legacyResidualSelection.face.exactProfile.bounds;
assert.ok(Math.abs(
  Math.min(...legacyResidualLocalSamples.map((point) => point.x)) -
    legacyResidualBounds.minX,
) <= 1e-6);
assert.ok(Math.abs(
  Math.max(...legacyResidualLocalSamples.map((point) => point.x)) -
    legacyResidualBounds.maxX,
) <= 1e-6);
assert.ok(Math.abs(
  Math.min(...legacyResidualLocalSamples.map((point) => point.y)) -
    legacyResidualBounds.minY,
) <= 1e-6);
assert.ok(Math.abs(
  Math.max(...legacyResidualLocalSamples.map((point) => point.y)) -
    legacyResidualBounds.maxY,
) <= 1e-6);
[
  legacyResidualSelection.hits[0],
  legacyResidualSelection.hits[Math.floor(legacyResidualSelection.hits.length / 2)],
  legacyResidualSelection.hits.at(-1),
].forEach(assertSelectionOverlayMatchesExactProfile);
const legacyOperatedSelection = analyticRegionHit(
  legacyResidualSolid,
  (face) =>
    face.analyticRegionId === coincidentRegionId &&
    face.analyticCapIndex === 1,
);
assert.ok(legacyOperatedSelection.hitCount > 2);
assert.equal(legacyOperatedSelection.identityCount, 1);
[
  legacyOperatedSelection.hits[0],
  legacyOperatedSelection.hits.at(-1),
].forEach(assertSelectionOverlayMatchesExactProfile);
const legacyResidualFirstPush = movedSolidFacePush(
  legacyResidualSelection.face,
  1.5,
);
assert.ok(legacyResidualFirstPush);
assert.equal(isValidSolid3d(legacyResidualFirstPush), true);
assert.equal(solidShellCount(legacyResidualFirstPush), 1);
assert.equal(
  legacyResidualFirstPush.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount + 1,
);
assert.equal(
  legacyResidualFirstPush.metadata.profileFeatures.at(-1)
    .exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);
const legacyResidualRoundTripModel = createModel3d();
addModel3dSolid(legacyResidualRoundTripModel, legacyResidualFirstPush, {
  id: 'legacy-residual-first-push',
});
const legacyResidualRoundTrip = parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(legacyResidualRoundTripModel))),
).solids[0].solid;
assert.equal(isValidSolid3d(legacyResidualRoundTrip), true);
assert.equal(
  legacyResidualRoundTrip.metadata.profileFeatures.at(-1)
    .exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);

const oppositeRegionSelection = analyticRegionHit(
  repeatedDividedRegionSolid,
  (face) => {
    const segments = face.exactProfile?.outerLoop?.segments ?? [];
    return face.analyticParentRegionId ===
        repeatedDividedRegionSolid.metadata.profileFeatures[0].analyticRegionId &&
      segments.length === 2 &&
      segments.some((segment) => segment.type === 'line') &&
      segments.some((segment) => segment.type === 'arc-circle') &&
      face.points.every((point) => Math.abs(new THREE.Vector3(
        point.x - coincidentCutStartCenter.x,
        point.y - coincidentCutStartCenter.y,
        point.z - coincidentCutStartCenter.z,
      ).dot(coincidentCutAxis)) <= 5e-2);
  },
);
assert.ok(oppositeRegionSelection.face);
assert.ok(oppositeRegionSelection.face.analyticRegionId);
assert.notEqual(oppositeRegionSelection.face.analyticRegionId, coincidentRegionId);
assert.ok(oppositeRegionSelection.hitCount > 1);
assert.equal(oppositeRegionSelection.identityCount, 1);
assert.ok(oppositeRegionSelection.face.sourceSolidFaceIndices.length > 1);
assert.ok(new Set(oppositeRegionSelection.hits.map((face) =>
  face.sourceSolidFaceIndex)).size > 1);
const oppositeRegionPlanarGroupCount =
  (repeatedDividedRegionSolid.metadata.planarFaceGroups ?? [])
  .filter((group) => group.indices?.some((faceIndex) =>
    oppositeRegionSelection.face.sourceSolidFaceIndices.includes(faceIndex)))
    .length;
assert.equal(
  oppositeRegionPlanarGroupCount,
  1,
  'La region coplanaria seleccionable debe quedar consolidada en una sola cara CAD',
);
assert.equal(oppositeRegionSelection.hits.every((face) =>
  face.analyticRegionId === oppositeRegionSelection.face.analyticRegionId &&
  face.id === oppositeRegionSelection.face.id), true);
const oppositeRegionOverlay = createSolidFaceSelectionMesh(
  oppositeRegionSelection.face,
);
assert.ok(oppositeRegionOverlay.geometry.getAttribute('position').count >= 40);
disposeThreeObject(oppositeRegionOverlay);
const residualSelectedArc = oppositeRegionSelection.face.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'arc-circle');
const residualSelectedLine = oppositeRegionSelection.face.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'line');
assert.ok(residualSelectedArc);
assert.ok(residualSelectedLine);
const residualSelectedWorldCorners = oppositeRegionSelection.face.cadProfileVertexIndices
  .map((index) => oppositeRegionSelection.face.points[index])
  .filter(Boolean);
assert.equal(residualSelectedWorldCorners.length, 2);
const assertSameWorldPointSet = (actual, expected, tolerance, message) => {
  assert.equal(actual.length, expected.length, message);
  assert.equal(actual.every((point) => expected.some((candidate) =>
    Math.hypot(
      point.x - candidate.x,
      point.y - candidate.y,
      point.z - candidate.z,
    ) <= tolerance)), true, message);
};
const worldProfilePoint = (point, plane) => pointOnSketchPlane({
  x: point.x,
  y: point.y,
  z: point.z ?? 0,
}, plane);
const worldProfileBoundsCorners = (bounds, plane) => [
  { x: bounds.minX, y: bounds.minY, z: 0 },
  { x: bounds.minX, y: bounds.maxY, z: 0 },
  { x: bounds.maxX, y: bounds.minY, z: 0 },
  { x: bounds.maxX, y: bounds.maxY, z: 0 },
].map((point) => worldProfilePoint(point, plane));
const residualSelectedWorldBounds = worldProfileBoundsCorners(
  oppositeRegionSelection.face.exactProfile.bounds,
  oppositeRegionSelection.face.exactProfile.plane,
);
const residualExpectedLocalCenter = pointFromSketchPlane(
  coincidentCutStartCenter,
  oppositeRegionSelection.face.exactProfile.plane,
);
assert.ok(Math.abs(oppositeRegionSelection.face.exactProfile.plane.yAxis.y) > 0.1);
assert.ok(Math.abs(oppositeRegionSelection.face.exactProfile.plane.yAxis.z) > 0.1);
assert.ok(Math.abs(residualExpectedLocalCenter.y) > 1e-3);
assert.ok(Math.abs(
  residualSelectedArc.center.y - residualExpectedLocalCenter.y,
) <= 1e-5);
assert.ok(Math.abs(
  residualSelectedArc.center.y + residualExpectedLocalCenter.y,
) > 1e-3, 'La coordenada Y local residual no debe quedar reflejada');
const residualSelectedWorldCenter = worldProfilePoint(
  residualSelectedArc.center,
  oppositeRegionSelection.face.exactProfile.plane,
);
assert.ok(Math.hypot(
  residualSelectedWorldCenter.x - coincidentCutStartCenter.x,
  residualSelectedWorldCenter.y - coincidentCutStartCenter.y,
  residualSelectedWorldCenter.z - coincidentCutStartCenter.z,
) <= 1e-5);
assertSameWorldPointSet(
  [
    worldProfilePoint(
      residualSelectedLine.start,
      oppositeRegionSelection.face.exactProfile.plane,
    ),
    worldProfilePoint(
      residualSelectedLine.end,
      oppositeRegionSelection.face.exactProfile.plane,
    ),
  ],
  residualSelectedWorldCorners,
  1e-5,
  'La cuerda residual debe conservar sus extremos mundiales',
);
const residualBoundaryXAxis = new THREE.Vector3(
  oppositeRegionSelection.face.exactProfile.plane.xAxis.x,
  oppositeRegionSelection.face.exactProfile.plane.xAxis.y,
  oppositeRegionSelection.face.exactProfile.plane.xAxis.z,
).normalize();
const residualBoundaryYAxis = new THREE.Vector3(
  oppositeRegionSelection.face.exactProfile.plane.yAxis.x,
  oppositeRegionSelection.face.exactProfile.plane.yAxis.y,
  oppositeRegionSelection.face.exactProfile.plane.yAxis.z,
).normalize();
const residualBoundaryCenter = new THREE.Vector3(
  coincidentCutStartCenter.x,
  coincidentCutStartCenter.y,
  coincidentCutStartCenter.z,
);
const residualBoundaryStart = residualBoundaryCenter.clone()
  .addScaledVector(residualBoundaryXAxis, coincidentCutRadius);
const residualBoundaryEnd = residualBoundaryCenter.clone()
  .addScaledVector(residualBoundaryXAxis, -coincidentCutRadius);
const residualBoundarySample = residualBoundaryCenter.clone()
  .addScaledVector(residualBoundaryYAxis, coincidentCutRadius);
[
  oppositeRegionSelection.face.exactProfile.plane,
  {
    ...oppositeRegionSelection.face.exactProfile.plane,
    origin: {
      x: oppositeRegionSelection.face.exactProfile.plane.origin.x +
        residualBoundaryYAxis.x * 208.57204784,
      y: oppositeRegionSelection.face.exactProfile.plane.origin.y +
        residualBoundaryYAxis.y * 208.57204784,
      z: oppositeRegionSelection.face.exactProfile.plane.origin.z +
        residualBoundaryYAxis.z * 208.57204784,
    },
  },
].forEach((plane) => {
  const recoveredCenter = circularCenterFromPlanarBoundary(
    residualBoundaryStart,
    residualBoundaryEnd,
    residualBoundarySample,
    plane,
    coincidentCutRadius,
  );
  assert.ok(recoveredCenter);
  const difference = new THREE.Vector3(
    recoveredCenter.x - coincidentCutStartCenter.x,
    recoveredCenter.y - coincidentCutStartCenter.y,
    recoveredCenter.z - coincidentCutStartCenter.z,
  );
  assert.ok(difference.length() <= 5e-6);
  assert.ok(Math.abs(difference.dot(residualBoundaryYAxis)) <= 5e-6,
    'Cambiar el origen del planarFaceGroup no debe perder el offset local Y');
});
assert.equal(
  repeatedDividedRegionSolid.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount,
  'Materializar la región residual no debe crear un feature',
);
const residualRegionId = oppositeRegionSelection.face.analyticRegionId;
const residualBeforeFeatureModel = createModel3d();
addModel3dSolid(residualBeforeFeatureModel, repeatedDividedRegionSolid, {
  id: 'residual-region-before-feature',
});
const reopenedResidualBeforeFeature = parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(residualBeforeFeatureModel))),
).solids[0].solid;
const reopenedResidualSelection = analyticRegionHit(
  reopenedResidualBeforeFeature,
  (face) =>
    face.analyticRegionId === residualRegionId &&
    face.analyticParentRegionId ===
      oppositeRegionSelection.face.analyticParentRegionId,
);
assert.ok(reopenedResidualSelection.face);
assert.equal(reopenedResidualSelection.identityCount, 1);
assert.equal(
  reopenedResidualBeforeFeature.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount,
);
const oppositeRegionSolid = movedSolidFacePush(
  oppositeRegionSelection.face,
  1.5,
);
assert.ok(oppositeRegionSolid);
assert.equal(
  oppositeRegionSolid.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount + 1,
);
const oppositeRegionId =
  oppositeRegionSolid.metadata.profileFeatures.at(-1).analyticRegionId;
assert.equal(oppositeRegionId, residualRegionId);
assert.notEqual(oppositeRegionId, coincidentRegionId);
assertDividedRegionFeature(oppositeRegionSolid, oppositeRegionId);
const residualCreatedFeature = oppositeRegionSolid.metadata.profileFeatures.at(-1);
const residualCreatedArc = residualCreatedFeature.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'arc-circle');
const residualCreatedLine = residualCreatedFeature.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'line');
const residualCreatedWorldCenter = worldProfilePoint(
  residualCreatedArc.center,
  residualCreatedFeature.exactProfile.plane,
);
assert.ok(Math.hypot(
  residualCreatedWorldCenter.x - coincidentCutStartCenter.x,
  residualCreatedWorldCenter.y - coincidentCutStartCenter.y,
  residualCreatedWorldCenter.z - coincidentCutStartCenter.z,
) <= 1e-5);
assert.ok(Math.abs(residualCreatedArc.radius - coincidentCutRadius) <= 1e-9);
assertSameWorldPointSet(
  [
    worldProfilePoint(
      residualCreatedLine.start,
      residualCreatedFeature.exactProfile.plane,
    ),
    worldProfilePoint(
      residualCreatedLine.end,
      residualCreatedFeature.exactProfile.plane,
    ),
  ],
  residualSelectedWorldCorners,
  1e-5,
  'El primer feature residual no debe reflejar la cuerda al guardar el perfil',
);
assertSameWorldPointSet(
  [
    worldProfilePoint(
      residualCreatedArc.start,
      residualCreatedFeature.exactProfile.plane,
    ),
    worldProfilePoint(
      residualCreatedArc.end,
      residualCreatedFeature.exactProfile.plane,
    ),
  ],
  residualSelectedWorldCorners,
  1e-5,
  'El primer feature residual no debe reflejar los extremos del arco',
);
assertSameWorldPointSet(
  worldProfileBoundsCorners(
    residualCreatedFeature.exactProfile.bounds,
    residualCreatedFeature.exactProfile.plane,
  ),
  residualSelectedWorldBounds,
  1e-5,
  'El primer feature residual debe conservar los bounds en el mismo frame',
);
const operatedCreatedFeature = oppositeRegionSolid.metadata.profileFeatures
  .find((feature) => feature.analyticRegionId === coincidentRegionId);
const operatedCreatedArc = operatedCreatedFeature.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'arc-circle');
const operatedCreatedLine = operatedCreatedFeature.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'line');
assert.ok(operatedCreatedArc);
assert.ok(operatedCreatedLine);
assert.ok(Math.abs(operatedCreatedArc.radius - coincidentCutRadius) <= 1e-9);
assertSameWorldPointSet(
  [
    worldProfilePoint(
      operatedCreatedLine.start,
      operatedCreatedFeature.exactProfile.plane,
    ),
    worldProfilePoint(
      operatedCreatedLine.end,
      operatedCreatedFeature.exactProfile.plane,
    ),
  ],
  residualSelectedWorldCorners,
  5e-4,
  'La región operada tampoco debe reflejar la cuerda común',
);
assertSameWorldPointSet(
  [
    worldProfilePoint(
      operatedCreatedArc.start,
      operatedCreatedFeature.exactProfile.plane,
    ),
    worldProfilePoint(
      operatedCreatedArc.end,
      operatedCreatedFeature.exactProfile.plane,
    ),
  ],
  residualSelectedWorldCorners,
  5e-4,
  'La orientación opuesta debe conservar los extremos del arco operado',
);

const firstAlternatingSelection = analyticRegionHit(
  oppositeRegionSolid,
  (face) =>
    face.analyticRegionId === coincidentRegionId &&
    face.analyticCapIndex === 1,
);
assert.ok(firstAlternatingSelection.face);
const firstAlternatingSolid = movedSolidFacePush(
  firstAlternatingSelection.face,
  0.5,
);
assert.ok(firstAlternatingSolid);
assert.equal(
  firstAlternatingSolid.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount + 1,
);
const secondAlternatingSelection = analyticRegionHit(
  firstAlternatingSolid,
  (face) =>
    face.analyticRegionId === oppositeRegionId &&
    face.analyticCapIndex === 1,
);
assert.ok(secondAlternatingSelection.face);
const alternatingDividedRegionsSolid = movedSolidFacePush(
  secondAlternatingSelection.face,
  0.75,
);
assert.ok(alternatingDividedRegionsSolid);
assert.equal(
  alternatingDividedRegionsSolid.metadata.profileFeatures.length,
  repeatedDividedRegionFeatureCount + 1,
);
assertDividedRegionFeature(alternatingDividedRegionsSolid, coincidentRegionId);
assertDividedRegionFeature(alternatingDividedRegionsSolid, oppositeRegionId);
assert.equal(isValidSolid3d(alternatingDividedRegionsSolid), true);
assert.equal(solidShellCount(alternatingDividedRegionsSolid), 1);

const dividedRegionModel = createModel3d();
addModel3dSolid(dividedRegionModel, alternatingDividedRegionsSolid, {
  id: 'divided-analytic-regions-solid',
});
const reopenedDividedRegionSolid = parseSerializedModel3d(
  JSON.parse(JSON.stringify(serializeModel3d(dividedRegionModel))),
).solids[0].solid;
assert.deepEqual(
  reopenedDividedRegionSolid.metadata.profileFeatures.map((feature) =>
    feature.analyticRegionId),
  alternatingDividedRegionsSolid.metadata.profileFeatures.map((feature) =>
    feature.analyticRegionId),
);
for (const regionId of [coincidentRegionId, oppositeRegionId]) {
  assertDividedRegionFeature(reopenedDividedRegionSolid, regionId);
  const selection = analyticRegionHit(
    reopenedDividedRegionSolid,
    (face) =>
      face.analyticRegionId === regionId &&
      face.analyticCapIndex === 1,
  );
  assert.ok(selection.face);
  assert.equal(selection.identityCount, 1);
}
const reopenedResidualFeature = reopenedDividedRegionSolid.metadata.profileFeatures
  .find((feature) => feature.analyticRegionId === oppositeRegionId);
assert.equal(
  reopenedResidualFeature.exactProfile.plane.coordinateSystem,
  'sketch-plane-v1',
);
const reopenedResidualArc = reopenedResidualFeature.exactProfile.outerLoop.segments
  .find((segment) => segment.type === 'arc-circle');
const reopenedResidualWorldCenter = worldProfilePoint(
  reopenedResidualArc.center,
  reopenedResidualFeature.exactProfile.plane,
);
assert.ok(Math.hypot(
  reopenedResidualWorldCenter.x - coincidentCutStartCenter.x,
  reopenedResidualWorldCenter.y - coincidentCutStartCenter.y,
  reopenedResidualWorldCenter.z - coincidentCutStartCenter.z,
) <= 1e-5);
assert.equal(
  deriveSolidAnalyticEdges(alternatingDividedRegionsSolid).lines.some((line) =>
    line.sourceEdgeIndices.length === 1 &&
    new THREE.Vector3(
      line.end.x - line.start.x,
      line.end.y - line.start.y,
      line.end.z - line.start.z,
    ).length() < 1e-4),
  false,
  'Las regiones exactas no deben publicar fragmentos lineales diminutos',
);
const coincidentCutLongitudinalEdges = coincidentCutAnalyticEdges.lines.filter((line) => {
  const direction = new THREE.Vector3(
    line.end.x - line.start.x,
    line.end.y - line.start.y,
    line.end.z - line.start.z,
  );
  return direction.length() >= Math.abs(coincidentCutDistance) * 0.25 &&
    Math.abs(direction.normalize().dot(phaseZeroSideAxis)) >= 0.99 &&
    phaseZeroRadialError(line.start) <= 5e-2 &&
    phaseZeroRadialError(line.end) <= 5e-2;
});
assert.equal(
  coincidentCutLongitudinalEdges.length,
  2,
  'El sólido recargado solo debe publicar las dos generatrices límite del arco parcial',
);
const analyticOnlyOverlaySolid = structuredClone(coincidentCutDisplayMesh.userData.solid);
const strayLineStart = analyticOnlyOverlaySolid.vertices.length;
analyticOnlyOverlaySolid.vertices.push(
  pointOnSketchPlane({
    x: -coincidentCutRadius * 1.2,
    y: coincidentCutRadius * 0.25,
    z: 0,
  }, coincidentCutPlane),
  pointOnSketchPlane({
    x: -coincidentCutRadius * 0.8,
    y: coincidentCutRadius * 0.25,
    z: 0,
  }, coincidentCutPlane),
);
analyticOnlyOverlaySolid.edges.push([strayLineStart, strayLineStart + 1]);
assert.equal(
  deriveSolidAnalyticEdges(
    solidWithDerivedSurfaceTopology(analyticOnlyOverlaySolid),
  ).lines.some((line) =>
    line.sourceEdgeIndices.some((edge) =>
      edge.includes(strayLineStart) || edge.includes(strayLineStart + 1))),
  false,
  'El visor no debe publicar una arista que solo exista en la malla de relleno',
);
disposeThreeObject(coincidentCutGroup);
const facetedCoincidentCut = structuredClone(coincidentCutSolid);
const facetedCoincidentTopology = deriveSolidAnalyticTopology(facetedCoincidentCut);
facetedCoincidentTopology.faceSurfaceIds.forEach((surfaceId, faceIndex) => {
  if (!surfaceId) return;
  const face = facetedCoincidentCut.faces[faceIndex];
  const first = new THREE.Vector3(
    facetedCoincidentCut.vertices[face[1]].x - facetedCoincidentCut.vertices[face[0]].x,
    facetedCoincidentCut.vertices[face[1]].y - facetedCoincidentCut.vertices[face[0]].y,
    facetedCoincidentCut.vertices[face[1]].z - facetedCoincidentCut.vertices[face[0]].z,
  );
  const second = new THREE.Vector3(
    facetedCoincidentCut.vertices[face[2]].x - facetedCoincidentCut.vertices[face[0]].x,
    facetedCoincidentCut.vertices[face[2]].y - facetedCoincidentCut.vertices[face[0]].y,
    facetedCoincidentCut.vertices[face[2]].z - facetedCoincidentCut.vertices[face[0]].z,
  );
  const normal = first.cross(second).normalize();
  facetedCoincidentCut.metadata.faceVertexNormals[faceIndex] =
    face.map(() => ({ x: normal.x, y: normal.y, z: normal.z }));
});
const repairedCoincidentCut = solidWithDerivedSurfaceTopology(facetedCoincidentCut);
const repairedCoincidentTopology = deriveSolidAnalyticTopology(repairedCoincidentCut);
const repairedSurfaceById = new Map(
  repairedCoincidentTopology.sideSurfaces.map((surface) => [surface.id, surface]),
);
let repairedAnalyticFaceCount = 0;
repairedCoincidentTopology.faceSurfaceIds.forEach((surfaceId, faceIndex) => {
  const surface = repairedSurfaceById.get(surfaceId);
  if (!surface) return;
  repairedAnalyticFaceCount += 1;
  const face = repairedCoincidentCut.faces[faceIndex];
  const storedNormals = repairedCoincidentCut.metadata.faceVertexNormals[faceIndex];
  assert.equal(storedNormals.length, face.length);
  face.forEach((vertexIndex, cornerIndex) => {
    const expected = analyticSideSurfaceNormalAtPoint(
      repairedCoincidentCut.vertices[vertexIndex],
      surface,
    );
    assert.ok(expected);
    const stored = storedNormals[cornerIndex];
    assert.ok(Math.abs(Math.abs(
      expected.x * stored.x + expected.y * stored.y + expected.z * stored.z
    ) - 1) <= 1e-8);
  });
});
assert.ok(repairedAnalyticFaceCount > 0);

const exactCircleProjection = projectModel3dEdgesToSketch({ solids: [{
  id: 'solid3d-analytic-circle',
  visible: true,
  solid: manifoldCircleUnion,
}] }, principalSketchPlane('XY'));
assert.equal(exactCircleProjection.filter((reference) => reference.type === 'circle').length, 1);
assert.equal(exactCircleProjection.find((reference) => reference.type === 'circle').radius, 1);
const exactCircleSection = sectionModel3dToSketch({ solids: [{
  id: 'solid3d-analytic-circle',
  visible: true,
  solid: manifoldCircleUnion,
}] }, {
  type: 'fixed',
  origin: { x: 0, y: 0, z: 2.5 },
  xAxis: { x: 1, y: 0, z: 0 },
  yAxis: { x: 0, y: 1, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
});
assert.equal(exactCircleSection.length, 1);
assert.equal(exactCircleSection[0].type, 'circle');

const manifoldCircleThrough = profileFeaturePushSolid(booleanSketchFace, -2);
assert.equal(manifoldCircleThrough.metadata.profileFeatures.at(-1).through, true);
const throughHorizontalGroups = manifoldCircleThrough.metadata.planarFaceGroups.filter((group) =>
  Math.abs(group.normal.z) > 0.99);
assert.equal(throughHorizontalGroups.length, 2);
assert.equal(throughHorizontalGroups.every((group) => group.innerLoops.length === 1), true);
assert.equal(throughHorizontalGroups.every((group) =>
  group.holeCadProfileVertexIndices[0].length === 0 &&
  group.holeSmoothProfileVertexIndices[0].length === group.innerLoops[0].length), true);
const circularHoleGroupIndex = manifoldCircleThrough.metadata.planarFaceGroups
  .indexOf(throughHorizontalGroups[0]);
const circularHoleFace = solidFaceFromPlanarGroup({
  uuid: 'circle-through-solid',
  userData: { type: 'webcad-push-solid', solid: manifoldCircleThrough },
  parent: null,
}, circularHoleGroupIndex);
assert.equal(circularHoleFace.holes.length, 1);
assert.equal(
  circularHoleFace.holes[0].length,
  64,
  'La selección de una cara perforada debe usar un único contorno circular analítico',
);
assert.equal(circularHoleFace.holeCadProfileVertexIndices[0].length, 0);
assert.equal(
  circularHoleFace.holeSmoothProfileVertexIndices[0].length,
  circularHoleFace.holes[0].length,
);
const circularHoleTool = solidFromFacePush(circularHoleFace, 1);
const circularHoleOffset = circularHoleFace.points.length;
assert.deepEqual(
  circularHoleTool.metadata.smoothVerticalEdgeIndices,
  circularHoleFace.holeSmoothProfileVertexIndices[0]
    .map((index) => circularHoleOffset + index),
);
const circularHoleRepush = movedSolidFacePush(circularHoleFace, 1);
assert.ok(circularHoleRepush.metadata.curvedSideFaceIndices.length >= circularHoleFace.holes[0].length);

const manifoldTopFace = {
  sourceSolid: booleanBaseSolid,
  sourceSolidFaceIndex: 1,
  sourceSolidFaceIndices: [1],
  points: [
    { x: 1, y: 1, z: 2 }, { x: 3, y: 1, z: 2 },
    { x: 3, y: 3, z: 2 }, { x: 1, y: 3, z: 2 },
  ],
  holes: [],
  normal: { x: 0, y: 0, z: 1 },
};
const manifoldExactThrough = movedSolidFacePush(manifoldTopFace, -2);
assert.equal(manifoldExactThrough.metadata.lastPushDistance, -2);
assert.equal(manifoldExactThrough.metadata.profileFeatures.at(-1).through, true);
assert.equal(manifoldExactThrough.metadata.profileFeatures.at(-1).requestedDistance, -2);
assert.ok(manifoldExactThrough.metadata.profileFeatures.at(-1).kernelDistance < -2);
assert.equal(manifoldExactThrough.metadata.planarFaceGroups.filter((group) =>
  Math.abs(group.normal.z) > 0.99).every((group) => group.innerLoops.length === 1), true);
assert.ok(subtractionCutterDistance(
  booleanBaseSolid,
  -1.234,
  { x: 0, y: 0, z: 2 },
  { x: 0, y: 0, z: 1 },
) === -1.234);
assert.ok(subtractionCutterDistance(
  booleanBaseSolid,
  -4,
  { x: 4, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
) < -4);

const curvedArchProfile = [
  [0, 0], [1, 0], [1, 3], [1.15, 3.75], [1.6, 4.4], [2.25, 4.85],
  [3, 5], [7, 5], [7.75, 4.85], [8.4, 4.4], [8.85, 3.75], [9, 3],
  [9, 0], [10, 0], [10, 4], [8, 6], [2, 6], [0, 4],
].map(([y, z]) => ({ x: 0, y, z }));
const curvedArchSolid = solidFromFacePush({
  points: curvedArchProfile,
  holes: [],
  normal: { x: -1, y: 0, z: 0 },
  cadProfileVertexIndices: [],
  smoothProfileVertexIndices: [],
}, 10);
const trimmedCurvedArch = movedSolidFacePush({
  sourceSolid: curvedArchSolid,
  sourceSolidFaceIndex: 0,
  sourceSolidFaceIndices: [0],
  points: curvedArchProfile,
  holes: [],
  normal: { x: 1, y: 0, z: 0 },
}, -4);
assert.equal(isValidSolid3d(trimmedCurvedArch), true);
assert.ok(Math.abs(computeSolidBounds3d(trimmedCurvedArch).maxX + 4) < 1e-5);
assert.equal(trimmedCurvedArch.vertices.some((point) => Math.abs(point.x) < 1e-5), false);
assert.equal(trimmedCurvedArch.vertices.length, curvedArchSolid.vertices.length);

const manifoldVerticalCircle = profileFeaturePushSolid({
  ...booleanSketchFace,
  points: verticalCirclePoints,
  supportLoops: { outer: verticalSupportLoop, holes: [] },
  sourceSolidFaceIndices: [3],
  normal: { x: 1, y: 0, z: 0 },
  workplane: verticalFeaturePlane,
}, 1);
assert.equal(computeSolidBounds3d(manifoldVerticalCircle).maxX, 5);
assert.doesNotThrow(() => JSON.stringify(manifoldVerticalCircle));

const manifoldEllipseBaseFace = {
  ...booleanBaseFace,
  points: [
    { x: 0, y: 0, z: 0 }, { x: 12, y: 0, z: 0 },
    { x: 12, y: 8, z: 0 }, { x: 0, y: 8, z: 0 },
  ],
};
const manifoldEllipseBase = solidFromFacePush(manifoldEllipseBaseFace, 2);
const manifoldEllipsePoints = Array.from({ length: 64 }, (_, index) => {
  const parameter = index * Math.PI * 2 / 64;
  const x = Math.cos(parameter) * 3;
  const y = Math.sin(parameter) * 1.5;
  const rotation = Math.PI / 7;
  return {
    x: 6 + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: 4 + x * Math.sin(rotation) + y * Math.cos(rotation),
    z: 2,
  };
});
const manifoldEllipseUnion = profileFeaturePushSolid({
  ...booleanSketchFace,
  id: 'manifold-ellipse',
  points: manifoldEllipsePoints,
  smoothProfileVertexIndices: manifoldEllipsePoints.map((_, index) => index),
  supportSolid: manifoldEllipseBase,
  supportLoops: {
    outer: manifoldEllipseBaseFace.points.map((point) => ({ ...point, z: 2 })),
    holes: [],
  },
}, 1.5);
assert.equal(computeSolidBounds3d(manifoldEllipseUnion).maxZ, 3.5);
assert.ok(manifoldEllipseUnion.metadata.curvedSideFaceIndices.length >= manifoldEllipsePoints.length);
assert.ok(manifoldEllipseUnion.edges.length < manifoldEllipseUnion.faces.length);

const legacyOrientedBase = cloneSolid3d(booleanBaseSolid);
legacyOrientedBase.faces[0].reverse();
const repairedLegacyPush = profileFeaturePushSolid({
  ...rectangleFeatureFace,
  supportSolid: legacyOrientedBase,
}, 1);
assert.equal(repairedLegacyPush.metadata.booleanKernel, 'manifold-3d');
assert.equal(isValidSolid3d(repairedLegacyPush), true);

const defaultBooleanBaseTolerance = coplanarFaceTolerance(
  booleanBaseSolid,
  DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR,
);
const previousCoplanarFactor = getCoplanarFaceToleranceFactor();
try {
  assert.equal(
    normalizeCoplanarFaceToleranceFactor(Number.NaN),
    DEFAULT_COPLANAR_FACE_TOLERANCE_FACTOR,
  );
  setCoplanarFaceToleranceFactor(2);
  assert.equal(getCoplanarFaceToleranceFactor(), 2);
  assert.ok(Math.abs(
    coplanarFaceTolerance(booleanBaseSolid) -
      defaultBooleanBaseTolerance * 2
  ) <= Number.EPSILON);
  const almostBottomDistance = -2 + defaultBooleanBaseTolerance;
  assert.equal(
    snapBooleanOperationDistance(
      booleanBaseSolid,
      { x: 0, y: 0, z: 2 },
      { x: 0, y: 0, z: 1 },
      almostBottomDistance,
    ),
    -2,
  );
  assert.ok(minimumBooleanOperationDistance(booleanBaseSolid) > 1e-6);
}
finally {
  setCoplanarFaceToleranceFactor(previousCoplanarFactor);
}

const baseAudit = auditSolid3dTopology(booleanBaseSolid);
assert.equal(baseAudit.valid, true);
assert.equal(baseAudit.closed, true);
const invalidPlanarAuditSolid = structuredClone(booleanBaseSolid);
invalidPlanarAuditSolid.metadata = {
  ...(invalidPlanarAuditSolid.metadata ?? {}),
  planarFaceGroups: [
    {
      indices: [0],
      outerLoop: booleanBaseFace.points,
    },
    {
      indices: [0],
      outerLoop: booleanBaseFace.points,
    },
  ],
};
const invalidPlanarAudit = auditSolid3dTopology(invalidPlanarAuditSolid);
assert.equal(invalidPlanarAudit.valid, false);
assert.ok(invalidPlanarAudit.errors.some((error) =>
  error.startsWith('overlapping-planar-face-group:')));

assert.deepEqual(phaseZeroContract, {
  analyticCircleCount: 2,
  closedCircleCount: 2,
  longitudinalMeshSeams: 0,
  capTrianglesDetected: true,
  capTrianglesSelectable: true,
  capFaceIdentities: 1,
  circularSupportBoundaries: 1,
}, 'La topologia CAD del cilindro oblicuo debe ser independiente de la teselacion');

await import('./3d-coincident-fixture.mjs');
await import('./3d-residual-dispatch.mjs');
await import('./3d-planar-base-face-split.mjs');
await import('./3d-push-planar-face-group.mjs');
await import('./3d-boolean-reconciliation.mjs');
await import('./3d-rebuild-boundaries.mjs');

console.log('webCAD 3D foundation: OK');

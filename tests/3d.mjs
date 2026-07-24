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
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticSideSurfaces,
  deriveSolidAnalyticTopology,
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
  addModel3dSolid,
  createModel3d,
} from '../source/3d/model3d.js';
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
  setPushSolidGroupHiddenEdges,
  solidFromFacePush,
} from '../source/3d/three/push-geometry.js';
import { profileFeaturePushSolid } from '../source/3d/three/profile-feature.js';
import {
  initializeManifoldBoolean,
  isManifoldBooleanReady,
  solidWithDerivedSurfaceTopology,
  subtractionCutterDistance,
} from '../source/3d/three/manifold-boolean.js';
import { pushDistanceToPoint } from '../source/3d/three/push-command.js';
import { nearestSolidObjectSnap } from '../source/3d/three/solid-object-snaps.js';
import { nearestSolidEdgeAtPointer } from '../source/3d/three/solid-edge-interaction.js';
import { cameraClipRangeForBounds } from '../source/3d/three/camera-clipping.js';
import {
  buildPushSilhouetteSegments,
  buildPushGeneratrixSilhouetteSegments,
  updatePushSilhouetteGroup,
} from '../source/3d/three/push-silhouette.js';
import { createFaceMesh, detectSimpleClosedFaces } from '../source/3d/three/simple-faces.js';
import {
  createSolidFaceSelectionMesh,
  SOLID_FACE_HOVER_RENDER_ORDER,
  SOLID_FACE_SELECTION_RENDER_ORDER,
  SOLID_FACE_SUPPORT_RENDER_ORDER,
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
).length, 5);
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

assert.deepEqual(phaseZeroContract, {
  analyticCircleCount: 2,
  closedCircleCount: 2,
  longitudinalMeshSeams: 0,
  capTrianglesDetected: true,
  capTrianglesSelectable: true,
  capFaceIdentities: 1,
  circularSupportBoundaries: 1,
}, 'La topologia CAD del cilindro oblicuo debe ser independiente de la teselacion');

console.log('webCAD 3D foundation: OK');

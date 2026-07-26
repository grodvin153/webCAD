/* webCAD - Seleccion de caras planas de solidos Push experimentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  analyticSideSurfaceLocation,
  analyticSurfaceTolerance,
  deriveSolidAnalyticEdges,
  deriveSolidAnalyticSideSurfaces,
  deriveSolidAnalyticTopology,
} from '../analytic-edges.js';
import {
  exactProfileFromOrderedEntities,
  sampleExactProfile,
} from '../exact-profile.js';
import { sketchPlaneFromFace } from '../sketch-plane.js';
import { booleanWeldTolerance } from '../tolerances.js';

const TWO_PI = Math.PI * 2;
const PLANAR_TOLERANCE = 1e-7;
const DERIVED_PLANAR_TOLERANCE_FACTOR = 2e-7;
const NORMAL_EPSILON = 1e-12;
const FACE_SELECTED_COLOR = 0xffd166;
const FACE_HIGHLIGHT_OFFSET = 0.006;
const FACE_SELECTION_CURVE_SEGMENTS = 96;
// The manufacturing-only fill can omit a short run of facets. Semantic selection
// may bridge that gap only when the observed run still covers most of the exact curve.
const MAX_SELECTION_CURVE_ENDPOINT_SNAP_ANGLE = Math.PI / 6 + 1e-5;
const ANALYTIC_START_SNAPPED = Symbol('analytic-start-snapped');
const ANALYTIC_END_SNAPPED = Symbol('analytic-end-snapped');
const solidAnalyticTopologyCache = new WeakMap();
const solidAnalyticEdgesCache = new WeakMap();
const INSIDE_TEST_DIRECTIONS = [
  new THREE.Vector3(0.742, 0.421, 0.522).normalize(),
  new THREE.Vector3(-0.311, 0.817, 0.486).normalize(),
  new THREE.Vector3(0.537, -0.239, 0.809).normalize(),
];

// Face overlays stay above the shaded solid, but below every edge pass.
export const SOLID_FACE_SUPPORT_RENDER_ORDER = 24;
export const SOLID_FACE_HOVER_RENDER_ORDER = 25;
export const SOLID_FACE_SELECTION_RENDER_ORDER = 26;

function vectorFromPoint(point) {
  return new THREE.Vector3(Number(point?.x), Number(point?.y), Number(point?.z) || 0);
}

function faceNormal(points) {
  if (!Array.isArray(points) || points.length < 3) return null;
  const origin = vectorFromPoint(points[0]);
  for (let index = 1; index < points.length - 1; index += 1) {
    const normal = vectorFromPoint(points[index]).sub(origin)
      .cross(vectorFromPoint(points[index + 1]).sub(origin));
    if (normal.lengthSq() > NORMAL_EPSILON) return normal.normalize();
  }
  return null;
}

function isPlanar(points, normal, tolerance = PLANAR_TOLERANCE) {
  if (!normal || !Array.isArray(points) || points.length < 3) return false;
  const origin = vectorFromPoint(points[0]);
  return points.every((point) =>
    Math.abs(vectorFromPoint(point).sub(origin).dot(normal)) <= tolerance);
}

function derivedPlanarTolerance(loops) {
  const box = new THREE.Box3();
  loops.flat().forEach((point) => box.expandByPoint(vectorFromPoint(point)));
  const scale = box.isEmpty() ? 1 : Math.max(1, box.getSize(new THREE.Vector3()).length());
  return Math.max(PLANAR_TOLERANCE, scale * DERIVED_PLANAR_TOLERANCE_FACTOR);
}

function normalizeAngle(angle) {
  const normalized = Number(angle) % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function analyticEdges(solid) {
  if (!solidAnalyticEdgesCache.has(solid)) {
    solidAnalyticEdgesCache.set(solid, deriveSolidAnalyticEdges(solid));
  }
  return solidAnalyticEdgesCache.get(solid);
}

function pointOnAnalyticCurve(point, curve, tolerance) {
  const relative = vectorFromPoint(point).sub(vectorFromPoint(curve.center));
  const localX = relative.dot(vectorFromPoint(curve.uAxis)) / curve.radiusX;
  const localY = relative.dot(vectorFromPoint(curve.vAxis)) / curve.radiusY;
  const angle = normalizeAngle(Math.atan2(localY, localX));
  const planePoint = vectorFromPoint(curve.center)
    .addScaledVector(vectorFromPoint(curve.uAxis), Math.cos(angle) * curve.radiusX)
    .addScaledVector(vectorFromPoint(curve.vAxis), Math.sin(angle) * curve.radiusY);
  if (planePoint.distanceTo(vectorFromPoint(point)) > tolerance) return false;
  return curve.closed ||
    directedSweep(curve.startAngle, angle, curve.clockwise) <= curve.sweep + tolerance;
}

function analyticCurveAngle(point, curve) {
  const relative = vectorFromPoint(point).sub(vectorFromPoint(curve.center));
  return normalizeAngle(Math.atan2(
    relative.dot(vectorFromPoint(curve.vAxis)) / curve.radiusY,
    relative.dot(vectorFromPoint(curve.uAxis)) / curve.radiusX,
  ));
}

function analyticCurvePoint(curve, angle) {
  return vectorFromPoint(curve.center)
    .addScaledVector(vectorFromPoint(curve.uAxis), Math.cos(angle) * curve.radiusX)
    .addScaledVector(vectorFromPoint(curve.vAxis), Math.sin(angle) * curve.radiusY);
}

function angleDistance(first, second) {
  return Math.abs(Math.atan2(
    Math.sin(first - second),
    Math.cos(first - second),
  ));
}

function expandedSelectionCurves(solid, curves, tolerance) {
  const surfaces = deriveSolidAnalyticSideSurfaces(solid);
  const surfaceById = new Map(surfaces.map((surface, index) => [
    surface.id,
    { index, surface },
  ]));
  return curves.map((curve) => {
    const currentEntry = surfaceById.get(curve.sideSurfaceId);
    if (!currentEntry || currentEntry.index <= 0) return curve;
    const currentStart = vectorFromPoint(currentEntry.surface.center);
    const candidates = surfaces.slice(0, currentEntry.index).flatMap((surface) => {
      const predecessorEnd = vectorFromPoint(surface.center)
        .add(vectorFromPoint(surface.offset));
      if (predecessorEnd.distanceTo(currentStart) > tolerance ||
          surface.type !== curve.type ||
          surface.sweep <= curve.sweep + 1e-5 ||
          Math.abs(surface.radiusX - curve.radiusX) > tolerance ||
          Math.abs(surface.radiusY - curve.radiusY) > tolerance ||
          Math.abs(vectorFromPoint(surface.uAxis).normalize()
            .dot(vectorFromPoint(curve.uAxis).normalize())) < 1 - 1e-4 ||
          Math.abs(vectorFromPoint(surface.vAxis).normalize()
            .dot(vectorFromPoint(curve.vAxis).normalize())) < 1 - 1e-4) {
        return [];
      }
      const expanded = {
        ...curve,
        uAxis: surface.uAxis,
        vAxis: surface.vAxis,
        radiusX: surface.radiusX,
        radiusY: surface.radiusY,
        startAngle: surface.startAngle,
        endAngle: surface.endAngle,
        clockwise: surface.clockwise,
        closed: surface.closed,
        sweep: surface.sweep,
      };
      const direction = curve.clockwise ? 1 : -1;
      const contained = [0, 0.5, 1].every((parameter) => pointOnAnalyticCurve(
        analyticCurvePoint(
          curve,
          curve.startAngle + direction * curve.sweep * parameter,
        ),
        expanded,
        tolerance,
      ));
      return contained ? [expanded] : [];
    }).sort((first, second) => first.sweep - second.sweep);
    return candidates[0] ?? curve;
  });
}

function snappedAnalyticEndpoint(point, curve, enabled) {
  if (!enabled || curve.closed) return { point, snapped: false };
  const angle = analyticCurveAngle(point, curve);
  const candidates = [curve.startAngle, curve.endAngle]
    .map((boundary) => ({ boundary, distance: angleDistance(angle, boundary) }))
    .sort((first, second) => first.distance - second.distance);
  if (candidates[0].distance > MAX_SELECTION_CURVE_ENDPOINT_SNAP_ANGLE) {
    return { point, snapped: false };
  }
  const snapped = analyticCurvePoint(curve, candidates[0].boundary);
  return {
    point: { x: snapped.x, y: snapped.y, z: snapped.z },
    snapped: candidates[0].distance > 1e-8,
  };
}

function signedLoopAreaOnNormal(loop, normal) {
  const areaVector = new THREE.Vector3();
  loop.forEach((point, index) => {
    areaVector.add(vectorFromPoint(point).cross(
      vectorFromPoint(loop[(index + 1) % loop.length]),
    ));
  });
  return areaVector.dot(normal) * 0.5;
}

function sampledClosedCurve(curve, count = 64) {
  const direction = curve.clockwise ? 1 : -1;
  return Array.from({ length: count }, (_, index) => {
    const angle = curve.startAngle + direction * TWO_PI * index / count;
    return vectorFromPoint(curve.center)
      .addScaledVector(vectorFromPoint(curve.uAxis), Math.cos(angle) * curve.radiusX)
      .addScaledVector(vectorFromPoint(curve.vAxis), Math.sin(angle) * curve.radiusY);
  }).map((point) => ({ x: point.x, y: point.y, z: point.z }));
}

function consolidateAnalyticHoles(solid, outer, holes, normal) {
  if (!holes.length || outer.length < 3) return holes;
  const tolerance = booleanWeldTolerance(solid);
  const planeOrigin = vectorFromPoint(outer[0]);
  const remaining = new Set(holes.map((_, index) => index));
  const result = [];
  analyticEdges(solid).curves.filter((curve) => curve.closed).forEach((curve) => {
    const uAxis = vectorFromPoint(curve.uAxis).normalize();
    const vAxis = vectorFromPoint(curve.vAxis).normalize();
    const curveNormal = uAxis.clone().cross(vAxis).normalize();
    const center = vectorFromPoint(curve.center);
    if (Math.abs(curveNormal.dot(normal)) < 1 - 1e-4 ||
        Math.abs(center.clone().sub(planeOrigin).dot(normal)) > tolerance) {
      return;
    }
    const radialTolerance = tolerance / Math.max(
      Math.min(curve.radiusX, curve.radiusY),
      tolerance,
    );
    const covered = [...remaining].filter((holeIndex) => {
      const locations = holes[holeIndex].map((point) => {
        const relative = vectorFromPoint(point).sub(center);
        return {
          planeError: Math.abs(relative.dot(curveNormal)),
          radius: Math.hypot(
            relative.dot(uAxis) / curve.radiusX,
            relative.dot(vAxis) / curve.radiusY,
          ),
        };
      });
      return locations.every((location) =>
        location.planeError <= tolerance * 2 &&
        location.radius <= 1 + radialTolerance * 2) &&
        locations.filter((location) =>
          Math.abs(location.radius - 1) <= radialTolerance * 2).length >= 2;
    });
    if (!covered.length) return;
    covered.forEach((index) => remaining.delete(index));
    const orientationLoop = covered
      .map((index) => holes[index])
      .sort((first, second) =>
        Math.abs(signedLoopAreaOnNormal(second, normal)) -
        Math.abs(signedLoopAreaOnNormal(first, normal)))[0];
    const orientation = Math.sign(signedLoopAreaOnNormal(orientationLoop, normal));
    const sampled = sampledClosedCurve(curve);
    if (orientation &&
        Math.sign(signedLoopAreaOnNormal(sampled, normal)) !== orientation) {
      sampled.reverse();
    }
    result.push(sampled);
  });
  remaining.forEach((index) => result.push(holes[index]));
  return result;
}

function pointOnAnalyticLine(point, line, tolerance) {
  const start = vectorFromPoint(line.start);
  const end = vectorFromPoint(line.end);
  const delta = end.clone().sub(start);
  const lengthSquared = delta.lengthSq();
  if (lengthSquared <= NORMAL_EPSILON) return false;
  const parameter = vectorFromPoint(point).sub(start).dot(delta) / lengthSquared;
  if (parameter < -tolerance || parameter > 1 + tolerance) return false;
  return start.addScaledVector(delta, Math.max(0, Math.min(1, parameter)))
    .distanceTo(vectorFromPoint(point)) <= tolerance;
}

function semanticPlanarBoundarySurvives(solid, semanticEntry) {
  const geometry = analyticEdges(solid);
  const tolerance = booleanWeldTolerance(solid);
  return [
    semanticEntry.group.outerLoop,
    ...(semanticEntry.group.innerLoops ?? []),
  ].flat().every((point) =>
    geometry.curves.some((curve) => pointOnAnalyticCurve(point, curve, tolerance)) ||
    geometry.lines.some((line) => pointOnAnalyticLine(point, line, tolerance)));
}

function localPointOnExactProfile(point, plane) {
  const relative = vectorFromPoint(point).sub(vectorFromPoint(plane?.origin));
  const xAxis = vectorFromPoint(plane?.xAxis).normalize();
  const yAxis = vectorFromPoint(plane?.yAxis).normalize();
  const normal = vectorFromPoint(plane?.normal).normalize();
  return {
    x: relative.dot(xAxis),
    y: -relative.dot(yAxis),
    planeDistance: Math.abs(relative.dot(normal)),
  };
}

function pointOnExactProfileSegment(point, segment, plane, tolerance) {
  const local = localPointOnExactProfile(point, plane);
  if (local.planeDistance > tolerance) return false;
  if (segment?.type === 'line') {
    return pointOnAnalyticLine(local, {
      start: segment.start,
      end: segment.end,
    }, tolerance);
  }
  const circular = segment?.type === 'circle' || segment?.type === 'arc-circle';
  const elliptic = segment?.type === 'ellipse' || segment?.type === 'arc-ellipse';
  if (!circular && !elliptic) return false;
  const radiusX = Number(circular ? segment.radius : segment.radiusX);
  const radiusY = Number(circular ? segment.radius : segment.radiusY);
  if (!(radiusX > 0) || !(radiusY > 0)) return false;
  const rotation = Number(segment.rotation) || 0;
  const deltaX = local.x - Number(segment.center?.x);
  const deltaY = local.y - Number(segment.center?.y);
  const curveX = deltaX * Math.cos(rotation) + deltaY * Math.sin(rotation);
  const curveY = -deltaX * Math.sin(rotation) + deltaY * Math.cos(rotation);
  const normalizedRadius = Math.hypot(curveX / radiusX, curveY / radiusY);
  if (Math.abs(normalizedRadius - 1) * Math.max(radiusX, radiusY) > tolerance) {
    return false;
  }
  if (segment.type === 'circle' || segment.type === 'ellipse') return true;
  const angle = normalizeAngle(Math.atan2(curveY / radiusY, curveX / radiusX));
  const startAngle = normalizeAngle(segment.startAngle);
  const endAngle = normalizeAngle(segment.endAngle);
  return directedSweep(startAngle, angle, segment.clockwise !== false) <=
    directedSweep(startAngle, endAngle, segment.clockwise !== false) +
      tolerance / Math.max(radiusX, radiusY);
}

function edgeOnExactProfileSegment(start, end, segment, plane, tolerance) {
  if (segment?.type === 'line') {
    const midpoint = {
      x: (start.x + end.x) * 0.5,
      y: (start.y + end.y) * 0.5,
      z: (start.z + end.z) * 0.5,
    };
    return [start, midpoint, end].every((point) =>
      pointOnExactProfileSegment(point, segment, plane, tolerance));
  }
  if (!pointOnExactProfileSegment(start, segment, plane, tolerance) ||
      !pointOnExactProfileSegment(end, segment, plane, tolerance)) {
    return false;
  }
  const angleAtPoint = (point) => {
    const local = localPointOnExactProfile(point, plane);
    const rotation = Number(segment.rotation) || 0;
    const deltaX = local.x - Number(segment.center?.x);
    const deltaY = local.y - Number(segment.center?.y);
    return Math.atan2(
      -deltaX * Math.sin(rotation) + deltaY * Math.cos(rotation),
      deltaX * Math.cos(rotation) + deltaY * Math.sin(rotation),
    );
  };
  return angleDistance(angleAtPoint(start), angleAtPoint(end)) <= Math.PI / 3;
}

function derivedBoundaryMatchesSemanticProfile(solid, semantic, derived) {
  const profile = semantic?.group?.exactProfile;
  const derivedLoops = [
    derived?.group?.outerLoop,
    ...(derived?.group?.innerLoops ?? []),
  ].filter((loop) => Array.isArray(loop) && loop.length >= 3);
  const exactLoops = [
    profile?.outerLoop,
    ...(profile?.innerLoops ?? []),
  ].filter((loop) => Array.isArray(loop?.segments) && loop.segments.length);
  if (!profile?.plane || derivedLoops.length !== exactLoops.length) return false;
  const tolerance = booleanWeldTolerance(solid) * 2;
  const loopMatches = (derivedLoop, exactLoop) => derivedLoop.every((point, index) =>
    exactLoop.segments.some((segment) =>
      edgeOnExactProfileSegment(
        point,
        derivedLoop[(index + 1) % derivedLoop.length],
        segment,
        profile.plane,
        tolerance,
      )));
  const unmatched = new Set(exactLoops.map((_, index) => index));
  return derivedLoops.every((derivedLoop) => {
    const exactLoopIndex = [...unmatched].find((index) =>
      loopMatches(derivedLoop, exactLoops[index]));
    if (exactLoopIndex === undefined) return false;
    unmatched.delete(exactLoopIndex);
    return true;
  });
}

function nearestVertexIndex(point, solid, tolerance) {
  let nearest = -1;
  let distance = tolerance;
  solid.vertices.forEach((vertex, index) => {
    const candidate = vectorFromPoint(vertex).distanceTo(vectorFromPoint(point));
    if (candidate > distance) return;
    nearest = index;
    distance = candidate;
  });
  return nearest;
}

function localExactPoint(point, plane) {
  const relative = vectorFromPoint(point).sub(vectorFromPoint(plane.origin));
  const xAxis = vectorFromPoint(plane.xAxis).normalize();
  const yAxis = vectorFromPoint(plane.yAxis).normalize();
  return {
    x: relative.dot(xAxis),
    y: -relative.dot(yAxis),
    z: 0,
  };
}

function worldExactPoint(point, plane) {
  const origin = vectorFromPoint(plane?.origin);
  const xAxis = vectorFromPoint(plane?.xAxis).normalize();
  const yAxis = vectorFromPoint(plane?.yAxis).normalize();
  return origin
    .addScaledVector(xAxis, Number(point?.x))
    .addScaledVector(yAxis, -Number(point?.y));
}

function localExactDirection(direction, plane) {
  const vector = vectorFromPoint(direction);
  return {
    x: vector.dot(vectorFromPoint(plane.xAxis).normalize()),
    y: -vector.dot(vectorFromPoint(plane.yAxis).normalize()),
  };
}

function analyticCurveEntity(curve, start, end, sample, plane) {
  const center = localExactPoint(curve.center, plane);
  const uAxis = localExactDirection(curve.uAxis, plane);
  const rotation = Math.atan2(uAxis.y, uAxis.x);
  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);
  const angleAtPoint = (point) => {
    const deltaX = point.x - center.x;
    const deltaY = point.y - center.y;
    return normalizeAngle(Math.atan2(
      (-deltaX * sinRotation + deltaY * cosRotation) / curve.radiusY,
      (deltaX * cosRotation + deltaY * sinRotation) / curve.radiusX,
    ));
  };
  const rawStartAngle = angleAtPoint(localExactPoint(start, plane));
  const rawEndAngle = angleAtPoint(localExactPoint(end, plane));
  const sampleAngle = angleAtPoint(localExactPoint(sample, plane));
  const expectedSweep = curve.closed ? TWO_PI : curve.sweep;
  const rawClockwiseSweep = directedSweep(rawStartAngle, rawEndAngle, true);
  const rawCounterClockwiseSweep = directedSweep(rawStartAngle, rawEndAngle, false);
  const sampleOnClockwise = directedSweep(rawStartAngle, sampleAngle, true) <=
    rawClockwiseSweep + 1e-6;
  const sampleOnCounterClockwise = directedSweep(rawStartAngle, sampleAngle, false) <=
    rawCounterClockwiseSweep + 1e-6;
  const clockwise = sampleOnClockwise !== sampleOnCounterClockwise
    ? sampleOnClockwise
    : Math.abs(rawClockwiseSweep - expectedSweep) <=
      Math.abs(rawCounterClockwiseSweep - expectedSweep);
  const rawSweep = clockwise ? rawClockwiseSweep : rawCounterClockwiseSweep;
  const missingSweep = expectedSweep - rawSweep;
  const snapEndpoints = !curve.closed &&
    rawSweep >= expectedSweep * 0.75 &&
    missingSweep >= -1e-5 &&
    missingSweep <= MAX_SELECTION_CURVE_ENDPOINT_SNAP_ANGLE;
  const snappedStart = snappedAnalyticEndpoint(start, curve, snapEndpoints);
  const snappedEnd = snappedAnalyticEndpoint(end, curve, snapEndpoints);
  const startAngle = angleAtPoint(localExactPoint(snappedStart.point, plane));
  const endAngle = angleAtPoint(localExactPoint(snappedEnd.point, plane));
  if (curve.type === 'arc-circle') {
    const entity = {
      type: 'ARC',
      center,
      radius: curve.radiusX,
      startAngle,
      endAngle,
      clockwise,
      analyticSource: curve.analyticSource ?? null,
      analyticOwnerRegionId: curve.ownerRegionId ?? null,
    };
    entity[ANALYTIC_START_SNAPPED] = snappedStart.snapped;
    entity[ANALYTIC_END_SNAPPED] = snappedEnd.snapped;
    return entity;
  }
  if (curve.type === 'arc-ellipse') {
    const entity = {
      type: 'ELLIPSE_ARC',
      center,
      radiusX: curve.radiusX,
      radiusY: curve.radiusY,
      rotation,
      startParameter: startAngle,
      endParameter: endAngle,
      clockwise,
      analyticSource: curve.analyticSource ?? null,
      analyticOwnerRegionId: curve.ownerRegionId ?? null,
    };
    entity[ANALYTIC_START_SNAPPED] = snappedStart.snapped;
    entity[ANALYTIC_END_SNAPPED] = snappedEnd.snapped;
    return entity;
  }
  return null;
}

function analyticEntityPoint(entity, atEnd = false) {
  if (entity.type === 'LINE') return { ...(atEnd ? entity.end : entity.start) };
  const angle = atEnd
    ? (entity.type === 'ARC' ? entity.endAngle : entity.endParameter)
    : (entity.type === 'ARC' ? entity.startAngle : entity.startParameter);
  const radiusX = entity.type === 'ARC' ? entity.radius : entity.radiusX;
  const radiusY = entity.type === 'ARC' ? entity.radius : entity.radiusY;
  const rotation = entity.type === 'ARC' ? 0 : entity.rotation;
  const localX = Math.cos(angle) * radiusX;
  const localY = Math.sin(angle) * radiusY;
  return {
    x: entity.center.x + localX * Math.cos(rotation) - localY * Math.sin(rotation),
    y: entity.center.y + localX * Math.sin(rotation) + localY * Math.cos(rotation),
    z: 0,
  };
}

function snapLineEndpointsToAnalyticNeighbors(entities, tolerance) {
  entities.forEach((entity, index) => {
    const next = entities[(index + 1) % entities.length];
    if (entity.type === 'LINE' && next.type !== 'LINE') {
      const target = analyticEntityPoint(next);
      if (next[ANALYTIC_START_SNAPPED] ||
          vectorFromPoint(entity.end).distanceTo(vectorFromPoint(target)) <= tolerance) {
        entity.end = target;
      }
    }
    if (entity.type !== 'LINE' && next.type === 'LINE') {
      const target = analyticEntityPoint(entity, true);
      if (entity[ANALYTIC_END_SNAPPED] ||
          vectorFromPoint(next.start).distanceTo(vectorFromPoint(target)) <= tolerance) {
        next.start = target;
      }
    }
  });
  entities.forEach((entity) => {
    delete entity[ANALYTIC_START_SNAPPED];
    delete entity[ANALYTIC_END_SNAPPED];
  });
}

function straightEntitiesForRun(points, startEdge, runLength, plane, tolerance) {
  const entities = [];
  let runStart = startEdge;
  let previousDirection = null;
  for (let offset = 0; offset < runLength; offset += 1) {
    const pointIndex = (startEdge + offset) % points.length;
    const nextIndex = (pointIndex + 1) % points.length;
    const direction = vectorFromPoint(points[nextIndex]).sub(vectorFromPoint(points[pointIndex]));
    if (direction.lengthSq() <= tolerance * tolerance) continue;
    direction.normalize();
    const continuesStraight = previousDirection &&
      previousDirection.dot(direction) >= 1 - 1e-6;
    if (!continuesStraight && previousDirection) {
      entities.push({
        type: 'LINE',
        start: localExactPoint(points[runStart], plane),
        end: localExactPoint(points[pointIndex], plane),
      });
      runStart = pointIndex;
    }
    previousDirection = direction;
  }
  if (previousDirection) {
    entities.push({
      type: 'LINE',
      start: localExactPoint(points[runStart], plane),
      end: localExactPoint(points[(startEdge + runLength) % points.length], plane),
    });
  }
  return entities;
}

function exactProfileForPlanarBoundary(solid, points, holes, normal, id) {
  if (holes.length || points.length < 3) return null;
  const plane = sketchPlaneFromFace({ points, normal });
  if (!plane) return null;
  const tolerance = booleanWeldTolerance(solid);
  const pointIndices = points.map((point) => nearestVertexIndex(point, solid, tolerance));
  if (pointIndices.some((index) => index < 0)) return null;
  const curves = expandedSelectionCurves(
    solid,
    analyticEdges(solid).curves,
    tolerance,
  );
  const curveEdgeKeys = curves.map((curve) => new Set(
    curve.sourceEdgeIndices.map((edge) => edgeKey(edge[0], edge[1])),
  ));
  const assignments = points.map((_, index) => {
    const key = edgeKey(pointIndices[index], pointIndices[(index + 1) % points.length]);
    const curveIndex = curveEdgeKeys.findIndex((keys) => keys.has(key));
    if (curveIndex >= 0) return curveIndex;
    const start = points[index];
    const end = points[(index + 1) % points.length];
    const recoveredCurveIndex = curves.findIndex((curve) =>
      pointOnAnalyticCurve(start, curve, tolerance) &&
      pointOnAnalyticCurve(end, curve, tolerance) &&
      Math.abs(Math.atan2(
        Math.sin(analyticCurveAngle(end, curve) - analyticCurveAngle(start, curve)),
        Math.cos(analyticCurveAngle(end, curve) - analyticCurveAngle(start, curve)),
      )) <= Math.PI / 4);
    return recoveredCurveIndex >= 0 ? recoveredCurveIndex : null;
  });
  const firstTransition = assignments.findIndex((assignment, index) =>
    assignment !== assignments[(index - 1 + assignments.length) % assignments.length]);
  if (firstTransition < 0) return null;
  const entities = [];
  for (let offset = 0; offset < assignments.length;) {
    const startEdge = (firstTransition + offset) % assignments.length;
    const assignment = assignments[startEdge];
    let runLength = 1;
    while (runLength < assignments.length - offset &&
      assignments[(startEdge + runLength) % assignments.length] === assignment) {
      runLength += 1;
    }
    const endPoint = (startEdge + runLength) % points.length;
    const entity = assignment === null
      ? null
      : analyticCurveEntity(
        curves[assignment],
        points[startEdge],
        points[endPoint],
        points[(startEdge + Math.floor(runLength / 2)) % points.length],
        plane,
      );
    if (entity) {
      entities.push(entity);
    }
    else {
      entities.push(...straightEntitiesForRun(
        points,
        startEdge,
        runLength,
        plane,
        tolerance,
      ));
    }
    offset += runLength;
  }
  const analyticLines = analyticEdges(solid).lines;
  entities.forEach((entity) => {
    if (entity.type !== 'LINE') return;
    const start = worldExactPoint(entity.start, plane);
    const end = worldExactPoint(entity.end, plane);
    const source = analyticLines.find((line) =>
      pointOnAnalyticLine(start, line, tolerance) &&
      pointOnAnalyticLine(end, line, tolerance));
    entity.analyticSource = source?.analyticSource ?? { role: 'divider' };
    entity.analyticOwnerRegionId = source?.ownerRegionId ?? null;
  });
  snapLineEndpointsToAnalyticNeighbors(entities, tolerance);
  const exactProfile = exactProfileFromOrderedEntities(entities, {
    id,
    plane,
  });
  if (!exactProfile) return null;
  exactProfile.outerLoop.segments.forEach((segment, index) => {
    segment.source = JSON.parse(JSON.stringify(
      entities[index]?.analyticSource ?? { role: 'unavailable' },
    ));
  });
  const ownerRegionIds = new Set(entities
    .map((entity) => entity.analyticOwnerRegionId)
    .filter(Boolean));
  if (ownerRegionIds.size === 1) {
    exactProfile.analyticRegionId = [...ownerRegionIds][0];
  }
  const smoothProfileVertexIndices = points.flatMap((_, index) => {
    const outgoing = assignments[index];
    const incoming = assignments[(index - 1 + assignments.length) % assignments.length];
    return Number.isInteger(outgoing) && outgoing === incoming ? [index] : [];
  });
  const smoothIndices = new Set(smoothProfileVertexIndices);
  return {
    exactProfile: { ...exactProfile, plane },
    cadProfileVertexIndices: points.flatMap((_, index) =>
      smoothIndices.has(index) ? [] : [index]),
    smoothProfileVertexIndices,
  };
}

function pointsWithExactCadCorners(points, exactBoundary, tolerance) {
  const profile = exactBoundary?.exactProfile;
  const cadIndices = exactBoundary?.cadProfileVertexIndices ?? [];
  if (!profile?.plane || !cadIndices.length) return points;
  const segments = profile.outerLoop?.segments ?? [];
  const endpoints = [];
  segments.forEach((segment) => {
    [segment?.start, segment?.end].filter(Boolean).forEach((point) => {
      const world = worldExactPoint(point, profile.plane);
      if (!endpoints.some((candidate) => candidate.distanceTo(world) <= tolerance)) {
        endpoints.push(world);
      }
    });
  });
  if (!endpoints.length) return points;
  const largestRadius = segments.reduce((largest, segment) => Math.max(
    largest,
    Number(segment?.radius) || 0,
    Number(segment?.radiusX) || 0,
    Number(segment?.radiusY) || 0,
  ), 0);
  const snapDistance = Math.max(
    tolerance,
    largestRadius * 2 * Math.sin(MAX_SELECTION_CURVE_ENDPOINT_SNAP_ANGLE / 2) +
      tolerance,
  );
  const result = points.map((point) => ({ ...point }));
  const available = new Set(cadIndices);
  endpoints.forEach((endpoint) => {
    let nearestIndex = -1;
    let nearestDistance = snapDistance;
    available.forEach((index) => {
      const distance = vectorFromPoint(result[index]).distanceTo(endpoint);
      if (distance > nearestDistance) return;
      nearestIndex = index;
      nearestDistance = distance;
    });
    if (nearestIndex < 0) return;
    result[nearestIndex] = { x: endpoint.x, y: endpoint.y, z: endpoint.z };
    available.delete(nearestIndex);
  });
  return result;
}

function averagePoint(points) {
  return points.reduce((sum, point) => sum.add(vectorFromPoint(point)), new THREE.Vector3())
    .multiplyScalar(1 / Math.max(1, points.length));
}

function outwardNormal(normal, points, solid) {
  const solidCenter = averagePoint(solid.vertices);
  const faceCenter = averagePoint(points);
  return normal.dot(faceCenter.sub(solidCenter)) < 0
    ? normal.clone().multiplyScalar(-1)
    : normal;
}

function analyticAxisForPlanarBoundary(solid, points, referenceNormal) {
  if (!Array.isArray(points) || points.length < 3) return null;
  for (const surface of deriveSolidAnalyticSideSurfaces(solid)) {
    const offset = vectorFromPoint(surface.offset);
    if (offset.lengthSq() <= NORMAL_EPSILON) continue;
    const tolerance = analyticSurfaceTolerance(solid, surface);
    const extrusionLength = offset.length();
    const locations = points.map((point) =>
      analyticSideSurfaceLocation(point, surface));
    const onStart = locations.every((location) =>
      Math.abs(location.axial) <= tolerance);
    const onEnd = locations.every((location) =>
      Math.abs(location.axial - extrusionLength) <= tolerance);
    if ((!onStart && !onEnd) || locations.some((location) =>
      location.planeError > tolerance ||
      location.radialError > tolerance)) {
      continue;
    }
    const axis = vectorFromPoint(surface.vAxis)
      .cross(vectorFromPoint(surface.uAxis));
    if (axis.lengthSq() <= NORMAL_EPSILON) continue;
    axis.normalize();
    if (axis.dot(referenceNormal) < 0) axis.multiplyScalar(-1);
    return axis;
  }
  return null;
}

function solidScale(solid) {
  const box = new THREE.Box3();
  (solid?.vertices ?? []).forEach((point) => box.expandByPoint(vectorFromPoint(point)));
  return box.isEmpty() ? 1 : Math.max(1, box.getSize(new THREE.Vector3()).length());
}

function rayIntersections(point, direction, solid, tolerance) {
  const ray = new THREE.Ray(point, direction);
  const hit = new THREE.Vector3();
  const distances = [];
  (solid?.faces ?? []).forEach((face) => {
    if (!Array.isArray(face) || face.length < 3) return;
    const first = vectorFromPoint(solid.vertices[face[0]]);
    for (let index = 1; index < face.length - 1; index += 1) {
      const second = vectorFromPoint(solid.vertices[face[index]]);
      const third = vectorFromPoint(solid.vertices[face[index + 1]]);
      if (!ray.intersectTriangle(first, second, third, false, hit)) continue;
      const distance = hit.clone().sub(point).dot(direction);
      if (distance > tolerance) distances.push(distance);
    }
  });
  distances.sort((left, right) => left - right);
  return distances.filter((distance, index) =>
    index === 0 || Math.abs(distance - distances[index - 1]) > tolerance * 4).length;
}

function pointInsideSolid(point, solid, tolerance) {
  const insideVotes = INSIDE_TEST_DIRECTIONS.reduce((votes, direction) =>
    votes + (rayIntersections(point, direction, solid, tolerance) % 2), 0);
  return insideVotes >= 2;
}

function solidNormalOrientation(groupNormal, face, solid) {
  const facePoints = face.map((vertexIndex) => solid.vertices[vertexIndex]).filter(Boolean);
  if (facePoints.length < 3) return null;
  const sample = averagePoint(facePoints);
  const tolerance = solidScale(solid) * 1e-7;
  const positiveInside = pointInsideSolid(
    sample.clone().addScaledVector(groupNormal, tolerance * 8), solid, tolerance,
  );
  const negativeInside = pointInsideSolid(
    sample.clone().addScaledVector(groupNormal, -tolerance * 8), solid, tolerance,
  );
  if (positiveInside === negativeInside) return null;
  return positiveInside ? -1 : 1;
}

function selectionNormal(planarGroup, face, points, solid) {
  const groupNormal = planarGroup?.normal ? vectorFromPoint(planarGroup.normal) : null;
  const referenceNormal = groupNormal && groupNormal.lengthSq() > NORMAL_EPSILON
    ? groupNormal.normalize()
    : faceNormal(points);
  if (referenceNormal) {
    const storedAxis = planarGroup?.analyticAxis
      ? vectorFromPoint(planarGroup.analyticAxis)
      : null;
    const analyticAxis = storedAxis && storedAxis.lengthSq() > NORMAL_EPSILON
      ? storedAxis.normalize()
      : analyticAxisForPlanarBoundary(solid, points, referenceNormal);
    const normal = analyticAxis ?? referenceNormal;
    if (normal.dot(referenceNormal) < 0) normal.multiplyScalar(-1);
    const orientation = solidNormalOrientation(normal, face, solid);
    if (orientation) return normal.multiplyScalar(orientation);
    return outwardNormal(normal, points, solid);
  }

  // Compatibility path for legacy extrusions without derived planar topology.
  const legacyNormal = faceNormal(points);
  return legacyNormal ? outwardNormal(legacyNormal, points, solid) : null;
}

function profileSizeFromExtrusion(solid) {
  const metadataSize = Number(solid?.metadata?.profileSize);
  if (Number.isInteger(metadataSize) && metadataSize >= 3 && solid.vertices?.length === metadataSize * 2) {
    return metadataSize;
  }
  const lowerFaceSize = solid?.faces?.[0]?.length;
  const upperFaceSize = solid?.faces?.[1]?.length;
  if (!Number.isInteger(lowerFaceSize) || lowerFaceSize < 3 || lowerFaceSize !== upperFaceSize) {
    return null;
  }
  if (solid.vertices.length !== lowerFaceSize * 2) return null;
  return lowerFaceSize;
}

function profileIndex(vertexIndex, profileSize) {
  return vertexIndex >= profileSize ? vertexIndex - profileSize : vertexIndex;
}

function isGeneratedCurvedSideFace(solid, faceIndex) {
  const face = solid?.faces?.[faceIndex];
  const profileSize = profileSizeFromExtrusion(solid);
  if (!profileSize || !Array.isArray(face) || face.length !== 4 || faceIndex < 2) return false;
  const smooth = new Set(
    Array.isArray(solid?.metadata?.smoothVerticalEdgeIndices)
      ? solid.metadata.smoothVerticalEdgeIndices
      : Array.isArray(solid?.metadata?.smoothProfileVertexIndices)
        ? solid.metadata.smoothProfileVertexIndices
      : [],
  );
  if (!smooth.size) return false;
  return face.some((vertexIndex) => smooth.has(profileIndex(vertexIndex, profileSize)));
}

function projectedPoint(point, normal) {
  const abs = {
    x: Math.abs(normal.x),
    y: Math.abs(normal.y),
    z: Math.abs(normal.z),
  };
  if (abs.z >= abs.x && abs.z >= abs.y) return new THREE.Vector2(point.x, point.y);
  if (abs.x >= abs.y) return new THREE.Vector2(point.y, point.z);
  return new THREE.Vector2(point.x, point.z);
}

function triangleIndicesForFace(points, normal, holes = []) {
  const projected = points.map((point) => projectedPoint(point, normal));
  const projectedHoles = holes.map((loop) => loop.map((point) => projectedPoint(point, normal)));
  const triangles = THREE.ShapeUtils.triangulateShape(projected, projectedHoles);
  if (triangles.length) {
    return triangles.flat();
  }
  return points.slice(1, -1).flatMap((_, index) => [0, index + 1, index + 2]);
}

function capFaceGroup(solid, faceIndex) {
  const groups = solid?.metadata?.capFaceGroups;
  if (!groups) return null;
  if (groups.lower?.includes(faceIndex)) return { indices: groups.lower, upper: false };
  if (groups.upper?.includes(faceIndex)) return { indices: groups.upper, upper: true };
  return null;
}

function capLoops(solid, upper) {
  const profileSize = Number(solid?.metadata?.profileSize);
  const loopSizes = solid?.metadata?.profileLoopSizes;
  if (!Number.isInteger(profileSize) || !Array.isArray(loopSizes) ||
      loopSizes.reduce((sum, size) => sum + size, 0) !== profileSize) return null;
  const loops = [];
  let start = upper ? profileSize : 0;
  loopSizes.forEach((size) => {
    loops.push(solid.vertices.slice(start, start + size));
    start += size;
  });
  return loops;
}

function planarFaceGroup(solid, faceIndex) {
  const index = (solid?.metadata?.planarFaceGroups ?? [])
    .findIndex((group) => Array.isArray(group?.indices) && group.indices.includes(faceIndex));
  return index >= 0 ? { group: solid.metadata.planarFaceGroups[index], index } : null;
}

function semanticPlanarFaces(solid, faceIndex) {
  if (!solidAnalyticTopologyCache.has(solid)) {
    solidAnalyticTopologyCache.set(solid, deriveSolidAnalyticTopology(solid));
  }
  const topology = solidAnalyticTopologyCache.get(solid);
  return topology.semanticPlanarFaces
    .filter((candidate) => candidate.indices.includes(faceIndex))
    .map((group) => ({ group, index: group.id, semantic: true }));
}

function semanticPlanarFace(solid, faceIndex) {
  const candidates = semanticPlanarFaces(solid, faceIndex);
  return candidates.length === 1 ? candidates[0] : null;
}

function planarEntryOnSemanticPlane(solid, faceIndex, entry) {
  if (!entry || entry.semantic) return entry;
  const semantic = semanticPlanarFace(solid, faceIndex);
  if (!semantic?.group?.normal || !entry.group?.normal) return entry;
  const semanticNormal = vectorFromPoint(semantic?.group?.normal);
  const derivedNormal = vectorFromPoint(entry.group?.normal);
  if (semanticNormal.lengthSq() <= NORMAL_EPSILON ||
      derivedNormal.lengthSq() <= NORMAL_EPSILON) {
    return entry;
  }
  semanticNormal.normalize();
  derivedNormal.normalize();
  const alignment = semanticNormal.dot(derivedNormal);
  if (Math.abs(alignment) < 1 - 1e-4) return entry;
  if (alignment < 0) semanticNormal.multiplyScalar(-1);
  return {
    ...entry,
    group: {
      ...entry.group,
      normal: {
        x: semanticNormal.x,
        y: semanticNormal.y,
        z: semanticNormal.z,
      },
    },
  };
}

function preferredPlanarFace(solid, faceIndex) {
  const semantic = semanticPlanarFace(solid, faceIndex);
  const derived = planarFaceGroup(solid, faceIndex);
  if (!semantic || !derived) return semantic ?? derived;
  if ((derived.group.smoothProfileVertexIndices?.length ?? 0) > 0 &&
      !(semantic.group.smoothProfileVertexIndices?.length ?? 0)) {
    return derived;
  }
  return semanticPlanarBoundarySurvives(solid, semantic) ||
    derivedBoundaryMatchesSemanticProfile(solid, semantic, derived)
    ? semantic
    : derived;
}

function canonicalSegmentTopology(segments) {
  const tokens = segments.map((segment) => {
    const source = segment?.source ?? {};
    const sourceId = source.sourceBoundaryId ?? source.dividerId ?? '';
    const orientation = source.orientation === -1 ? -1 : 1;
    const interval = ['arc-circle', 'arc-ellipse'].includes(segment?.type)
      ? `:${normalizeAngle(segment.startAngle)}:${normalizeAngle(segment.endAngle)}:` +
        `${segment.clockwise !== false}`
      : '';
    return `${segment?.type ?? 'unknown'}:${source.role ?? 'unavailable'}:` +
      `${sourceId}:${orientation}${interval}`;
  });
  if (!tokens.length) return '';
  const variants = [];
  tokens.forEach((_, offset) => {
    variants.push([
      ...tokens.slice(offset),
      ...tokens.slice(0, offset),
    ].join('|'));
  });
  return variants.sort()[0];
}

function exactProfileTopologyKey(profile) {
  const outer = canonicalSegmentTopology(profile?.outerLoop?.segments ?? []);
  const inner = (profile?.innerLoops ?? [])
    .map((loop) => canonicalSegmentTopology(loop?.segments ?? []))
    .sort();
  return JSON.stringify({ outer, inner });
}

function semanticIdentityFromExactBoundary(solid, faceIndex, exactBoundary) {
  const derivedProfile = exactBoundary?.exactProfile;
  if (!derivedProfile) return null;
  const candidates = semanticPlanarFaces(solid, faceIndex)
    .filter((semantic) => semantic.group.exactProfile);
  const matches = derivedProfile.analyticRegionId
    ? candidates.filter((semantic) =>
      semantic.group.regionId === derivedProfile.analyticRegionId)
    : candidates.filter((semantic) =>
      exactProfileTopologyKey(semantic.group.exactProfile) ===
        exactProfileTopologyKey(derivedProfile));
  return matches.length === 1 ? matches[0] : null;
}

function isProfileFeatureCurvedFace(solid, faceIndex) {
  if (Array.isArray(solid?.metadata?.curvedSideFaceIndices) &&
      solid.metadata.curvedSideFaceIndices.includes(faceIndex)) return true;
  const normals = solid?.metadata?.faceVertexNormals?.[faceIndex];
  if ((solid?.metadata?.type !== 'profileFeature' && !Array.isArray(solid?.metadata?.profileFeatures)) ||
      !Array.isArray(normals) || normals.length < 2) {
    return false;
  }
  const first = vectorFromPoint(normals[0]);
  return normals.slice(1).some((normal) => first.distanceTo(vectorFromPoint(normal)) > PLANAR_TOLERANCE);
}

function solidsShareIndexedTopology(first, second) {
  if (!first || !second ||
      first.vertices?.length !== second.vertices?.length ||
      first.faces?.length !== second.faces?.length) {
    return false;
  }
  return first.faces.every((face, faceIndex) => {
    const other = second.faces[faceIndex];
    return Array.isArray(other) &&
      face.length === other.length &&
      face.every((vertexIndex, index) => vertexIndex === other[index]);
  });
}

function solidFaceFromMeshFace(mesh, faceIndex, requestedPlanarGroup = null) {
  if (mesh?.userData?.type !== 'webcad-push-solid') return null;
  const solid = mesh.userData.solid;
  const face = solid?.faces?.[faceIndex];
  if (!Array.isArray(face) || face.length < 3 || !Array.isArray(solid?.vertices)) return null;
  const rawPlanarEntry = requestedPlanarGroup ??
    preferredPlanarFace(solid, faceIndex);
  const planarEntry = planarEntryOnSemanticPlane(solid, faceIndex, rawPlanarEntry);
  if (!planarEntry &&
      (isGeneratedCurvedSideFace(solid, faceIndex) || isProfileFeatureCurvedFace(solid, faceIndex))) return null;
  const planarGroup = planarEntry?.group ?? null;
  const capGroup = capFaceGroup(solid, faceIndex);
  const loops = planarGroup
    ? [planarGroup.outerLoop, ...(planarGroup.innerLoops ?? [])]
    : capGroup ? capLoops(solid, capGroup.upper) : null;
  const points = loops?.[0] || face.map((vertexIndex) => solid.vertices[vertexIndex]).filter(Boolean);
  const rawHoles = loops?.slice(1) || [];
  const normal = selectionNormal(planarGroup, face, points, solid);
  const holes = normal && planarGroup
    ? consolidateAnalyticHoles(solid, points, rawHoles, normal)
    : rawHoles;
  const holeCadProfileVertexIndices = holes.map((loop) => {
    const rawIndex = rawHoles.indexOf(loop);
    return rawIndex >= 0
      ? planarGroup?.holeCadProfileVertexIndices?.[rawIndex] ??
        loop.map((_, index) => index)
      : [];
  });
  const holeSmoothProfileVertexIndices = holes.map((loop) => {
    const rawIndex = rawHoles.indexOf(loop);
    return rawIndex >= 0
      ? planarGroup?.holeSmoothProfileVertexIndices?.[rawIndex] ?? []
      : loop.map((_, index) => index);
  });
  const planarTolerance = planarGroup
    ? Math.max(
      derivedPlanarTolerance([points, ...holes]),
      planarEntry?.semantic ? PLANAR_TOLERANCE : booleanWeldTolerance(solid),
    )
    : PLANAR_TOLERANCE;
  if (!normal || ![points, ...holes].every((loop) => isPlanar(loop, normal, planarTolerance))) {
    return null;
  }
  const provisionalId = `solid-face-${mesh.uuid}-${planarEntry
    ? `planar-${planarEntry.index}`
    : capGroup ? (capGroup.upper ? 'upper-cap' : 'lower-cap') : faceIndex}`;
  const exactBoundary = planarGroup?.exactProfile
    ? {
      exactProfile: JSON.parse(JSON.stringify(planarGroup.exactProfile)),
      cadProfileVertexIndices: planarGroup.cadProfileVertexIndices ?? [],
      smoothProfileVertexIndices: planarGroup.smoothProfileVertexIndices ?? [],
    }
    : planarEntry && !planarEntry.semantic
      ? exactProfileForPlanarBoundary(solid, points, holes, normal, provisionalId)
      : null;
  const semanticIdentity = !planarEntry?.semantic
    ? semanticIdentityFromExactBoundary(solid, faceIndex, exactBoundary)
    : null;
  const identityEntry = semanticIdentity ?? planarEntry;
  const identityGroup = identityEntry?.group ?? planarGroup;
  const selectedBoundary = semanticIdentity
    ? {
      exactProfile: JSON.parse(JSON.stringify(identityGroup.exactProfile)),
      cadProfileVertexIndices: identityGroup.cadProfileVertexIndices ?? [],
      smoothProfileVertexIndices: identityGroup.smoothProfileVertexIndices ?? [],
    }
    : exactBoundary;
  const id = semanticIdentity
    ? `solid-face-${mesh.uuid}-planar-${semanticIdentity.index}`
    : provisionalId;
  const selectedPoints = selectedBoundary
    ? pointsWithExactCadCorners(
      points,
      selectedBoundary,
      booleanWeldTolerance(solid),
    )
    : points;
  return {
    id,
    sourceSolid: solidsShareIndexedTopology(mesh.userData.analyticSolid, solid)
      ? mesh.userData.analyticSolid
      : solid,
    sourceSolidDocumentId: mesh.userData.documentSolidId ?? mesh.parent?.userData?.documentSolidId ?? null,
    sourceSolidFaceIndex: faceIndex,
    sourceSolidFaceIndices: identityGroup?.indices
      ? [...identityGroup.indices]
      : capGroup?.indices ? [...capGroup.indices] : [faceIndex],
    sourceSolidObject: mesh,
    sourceSolidGroup: mesh.parent ?? null,
    points: selectedPoints.map((point) => ({ x: point.x, y: point.y, z: point.z })),
    holes: holes.map((loop) => loop.map((point) => ({ x: point.x, y: point.y, z: point.z }))),
    normal: { x: normal.x, y: normal.y, z: normal.z },
    ...(selectedBoundary ? {
      analyticAxis: { x: normal.x, y: normal.y, z: normal.z },
    } : {}),
    ...(Number.isInteger(identityGroup?.featureIndex) ? {
      analyticCapIndex: identityGroup.capIndex,
      analyticFeatureIndex: identityGroup.featureIndex,
      analyticOperationType: identityGroup.operationType ?? null,
    } : {}),
    ...(identityGroup?.regionId ? {
      analyticRegionId: identityGroup.regionId,
    } : {}),
    cadProfileVertexIndices: selectedBoundary?.cadProfileVertexIndices ??
      identityGroup?.cadProfileVertexIndices ?? points.map((_, index) => index),
    smoothProfileVertexIndices: selectedBoundary?.smoothProfileVertexIndices ??
      identityGroup?.smoothProfileVertexIndices ?? [],
    holeCadProfileVertexIndices,
    holeSmoothProfileVertexIndices,
    ...(selectedBoundary?.exactProfile ? {
      exactProfile: selectedBoundary.exactProfile,
    } : {}),
  };
}

export function solidFaceFromMeshHit(hit) {
  const mesh = hit?.object;
  const faceIndex = mesh?.geometry?.userData?.webcadFaceTriangleMap?.[hit?.faceIndex];
  return Number.isInteger(faceIndex) ? solidFaceFromMeshFace(mesh, faceIndex) : null;
}

export function solidFaceFromPlanarGroup(mesh, planarGroupIndex) {
  const solid = mesh?.userData?.solid;
  const group = solid?.metadata?.planarFaceGroups?.[planarGroupIndex];
  const faceIndex = group?.indices?.[0];
  return Number.isInteger(faceIndex)
    ? solidFaceFromMeshFace(mesh, faceIndex, { group, index: planarGroupIndex })
    : null;
}

function selectionLoopsFromExactProfile(face) {
  const sampled = sampleExactProfile(face?.exactProfile, {
    segments: FACE_SELECTION_CURVE_SEGMENTS,
    structured: true,
  });
  if (!sampled?.outerLoop?.length) return null;
  const plane = face.exactProfile?.plane;
  const origin = vectorFromPoint(plane?.origin);
  const xAxis = vectorFromPoint(plane?.xAxis);
  const yAxis = vectorFromPoint(plane?.yAxis);
  if (![origin, xAxis, yAxis].every((vector) =>
    Number.isFinite(vector.x) &&
    Number.isFinite(vector.y) &&
    Number.isFinite(vector.z)) ||
    xAxis.lengthSq() <= NORMAL_EPSILON ||
    yAxis.lengthSq() <= NORMAL_EPSILON) {
    return null;
  }
  xAxis.normalize();
  yAxis.normalize();
  const worldLoop = (loop) => {
    const points = loop.map((point) => worldExactPoint(point, {
      origin,
      xAxis,
      yAxis,
    }))
      .map((point) => ({ x: point.x, y: point.y, z: point.z }));
    if (points.length > 1 &&
        vectorFromPoint(points[0]).distanceTo(vectorFromPoint(points.at(-1))) <= PLANAR_TOLERANCE) {
      points.pop();
    }
    return points;
  };
  const outer = worldLoop(sampled.outerLoop);
  const holes = sampled.innerLoops.map(worldLoop);
  if (outer.length < 3 || holes.some((loop) => loop.length < 3)) return null;
  return [outer, ...holes];
}

export function createSolidFaceSelectionMesh(face) {
  const normal = vectorFromPoint(face?.normal);
  if (normal.lengthSq() <= NORMAL_EPSILON) return null;
  normal.normalize();
  const exactLoops = selectionLoopsFromExactProfile(face);
  const points = exactLoops?.[0] ??
    (Array.isArray(face?.points) ? face.points : []);
  const holes = exactLoops?.slice(1) ??
    (Array.isArray(face?.holes) ? face.holes : []);
  if (points.length < 3) return null;
  const allPoints = [points, ...holes].flat();
  const positions = new Float32Array(allPoints.length * 3);
  allPoints.forEach((point, index) => {
    const offsetPoint = vectorFromPoint(point).addScaledVector(normal, FACE_HIGHLIGHT_OFFSET);
    const offset = index * 3;
    positions[offset] = offsetPoint.x;
    positions[offset + 1] = offsetPoint.y;
    positions[offset + 2] = offsetPoint.z;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(triangleIndicesForFace(points, normal, holes));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  const material = new THREE.MeshBasicMaterial({
    color: FACE_SELECTED_COLOR,
    depthTest: true,
    depthWrite: false,
    opacity: 0.72,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `webcad-selected-${face.id}`;
  mesh.renderOrder = SOLID_FACE_SELECTION_RENDER_ORDER;
  mesh.userData = {
    type: 'webcad-push-solid-face-selection',
    faceId: face.id,
    face,
    selectedColor: FACE_SELECTED_COLOR,
    transientSelection: true,
  };
  return mesh;
}

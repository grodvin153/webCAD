/* webCAD - Herramienta modular de líneas espaciales 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  lineCircleIntersectionPoints,
  lineSegmentIntersection,
  pointOnCircularEntity,
} from '../../intersections.js';
import { lineEllipseIntersectionPoints } from '../../ellipse/geometry.js';
import { formatNumber, parseScalarExpression } from '../../input/entry.js';
import {
  normalizeSketchPlane,
  pointFromSketchPlane,
  pointOnSketchPlane,
  sketchPlaneFromFace,
} from '../sketch-plane.js';
import { booleanContactOverlap } from '../tolerances.js';
import { createPoint3dInput } from './solid-transform-command.js';
import {
  createWideLineSegments,
  disposeThreeObject,
  THREE_VIEW_STYLE,
} from './three-scene-style.js';

const POINT_TOLERANCE = 1e-7;
const SUPPORT_FACE_CONTACT_FACTOR = 4;
const LINE3D_INTERSECTION_TOLERANCE_FACTOR = 4e-6;

function point3(point) {
  return {
    x: Number(point?.x) || 0,
    y: Number(point?.y) || 0,
    z: Number(point?.z) || 0,
  };
}

function distance(first, second) {
  return Math.hypot(
    first.x - second.x,
    first.y - second.y,
    first.z - second.z,
  );
}

export function isLine3dFinishEvent(event, { hasInput = false } = {}) {
  if (event?.button === 2) return true;
  return !hasInput && (event?.key === 'Enter' || event?.key === ' ');
}

function displacementBetween(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z,
  };
}

function line3dDistanceStatus(prompt, start, end) {
  const delta = displacementBetween(start, end);
  return `${prompt} · Distancia ${formatNumber(distance(start, end))}` +
    ` · ΔX ${formatNumber(delta.x)} · ΔY ${formatNumber(delta.y)}` +
    ` · ΔZ ${formatNumber(delta.z)}`;
}

function axisColor(axis) {
  return {
    x: THREE_VIEW_STYLE.axisX,
    y: THREE_VIEW_STYLE.axisY,
    z: THREE_VIEW_STYLE.axisZ,
  }[axis] ?? 0xffcf4d;
}

function createDistanceGuide(start, end, context = {}, name = 'webcad-line3d-distance-guide') {
  if (!start || !end || distance(start, end) <= POINT_TOLERANCE) return null;
  const guide = createWideLineSegments([{ start, end }], {
    color: axisColor(context.axis),
    depthTest: false,
    depthWrite: false,
    linewidth: Math.max(2.2, THREE_VIEW_STYLE.axisLineWidth - 0.3),
    renderOrder: 82,
    transparent: true,
    opacity: context.locked ? 1 : 0.92,
  });
  guide.name = context.axis ? `${name}-${context.axis}` : `${name}-free`;
  return guide;
}

export function line3dEntitiesFromWorldPoints(points, plane, {
  idPrefix = 'line3d',
} = {}) {
  const source = Array.isArray(points) ? points.map(point3) : [];
  return source.slice(0, -1).map((start, index) => {
    const end = source[index + 1];
    const localStart = pointFromSketchPlane(start, plane);
    const localEnd = pointFromSketchPlane(end, plane);
    return {
      id: `${idPrefix}-${index + 1}`,
      type: 'LINE',
      start: { x: localStart.x, y: -localStart.y, z: localStart.z },
      end: { x: localEnd.x, y: -localEnd.y, z: localEnd.z },
    };
  });
}

export function isClosedLine3dChain(points, tolerance = POINT_TOLERANCE) {
  return Array.isArray(points) && points.length >= 4 &&
    distance(point3(points[0]), point3(points.at(-1))) <= tolerance;
}

export function line3dRecordSnapCandidates(lines) {
  const candidates = [];
  const seen = new Set();
  const add = (type, point, line) => {
    const clean = point3(point);
    const key = `${type}:${clean.x.toFixed(8)}:${clean.y.toFixed(8)}:${clean.z.toFixed(8)}`;
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push({
      type,
      point: clean,
      documentLineId: line.id,
      lineGroupId: line.groupId,
      documentSolidId: null,
    });
  };
  (lines ?? []).forEach((line) => {
    if (line?.visible === false || line?.type !== 'LINE3D') return;
    add('endpoint', line.start, line);
    add('endpoint', line.end, line);
    add('midpoint', {
      x: (line.start.x + line.end.x) * 0.5,
      y: (line.start.y + line.end.y) * 0.5,
      z: (line.start.z + line.end.z) * 0.5,
    }, line);
  });
  return candidates;
}

export function coplanarLine3dPlane(lines, tolerance = 1e-6) {
  const points = (lines ?? []).flatMap((line) => [point3(line.start), point3(line.end)]);
  if (points.length < 3) return null;
  const origin = new THREE.Vector3(points[0].x, points[0].y, points[0].z);
  let normal = null;
  for (let first = 1; first < points.length - 1 && !normal; first += 1) {
    const firstVector = new THREE.Vector3(points[first].x, points[first].y, points[first].z)
      .sub(origin);
    for (let second = first + 1; second < points.length; second += 1) {
      const secondVector = new THREE.Vector3(points[second].x, points[second].y, points[second].z)
        .sub(origin);
      const candidate = firstVector.clone().cross(secondVector);
      if (candidate.lengthSq() > tolerance * tolerance) normal = candidate.normalize();
    }
  }
  if (!normal) return null;
  if (points.some((point) => Math.abs(
    new THREE.Vector3(point.x, point.y, point.z).sub(origin).dot(normal),
  ) > tolerance)) return null;
  const xAxis = new THREE.Vector3(points[1].x, points[1].y, points[1].z)
    .sub(origin)
    .normalize();
  const yAxis = normal.clone().cross(xAxis).normalize();
  return normalizeSketchPlane({
    type: 'fixed',
    label: 'Líneas 3D coplanarias',
    origin: { x: origin.x, y: origin.y, z: origin.z },
    xAxis: { x: xAxis.x, y: xAxis.y, z: xAxis.z },
    yAxis: { x: yAxis.x, y: yAxis.y, z: yAxis.z },
    normal: { x: normal.x, y: normal.y, z: normal.z },
  });
}

function pointSegmentDistance2d(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= Number.EPSILON) {
    return Math.hypot(point.x - start.x, point.y - start.y);
  }
  const parameter = Math.max(0, Math.min(1,
    ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared));
  return Math.hypot(
    point.x - (start.x + deltaX * parameter),
    point.y - (start.y + deltaY * parameter),
  );
}

function pointOnLoopBoundary(point, loop, tolerance) {
  return loop.some((start, index) =>
    pointSegmentDistance2d(point, start, loop[(index + 1) % loop.length]) <= tolerance);
}

function pointInLoop(point, loop) {
  let inside = false;
  for (let index = 0, previous = loop.length - 1;
    index < loop.length;
    previous = index++) {
    const current = loop[index];
    const before = loop[previous];
    const intersects = (current.y > point.y) !== (before.y > point.y) &&
      point.x < (before.x - current.x) * (point.y - current.y) /
        (before.y - current.y) + current.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function polygonArea2d(loop) {
  return Math.abs(loop.reduce((sum, point, index) => {
    const next = loop[(index + 1) % loop.length];
    return sum + point.x * next.y - next.x * point.y;
  }, 0)) * 0.5;
}

function loopSegmentIntersects(start, end, loop, tolerance) {
  return loop.some((boundaryStart, index) => {
    const boundaryEnd = loop[(index + 1) % loop.length];
    const intersection = lineSegmentIntersection(
      { start, end },
      { start: boundaryStart, end: boundaryEnd },
    );
    return intersection && pointSegmentDistance2d(intersection, start, end) <= tolerance;
  });
}

export function line3dSupportFaceForPoints(
  points,
  faces,
  tolerance = 1e-6,
  { allowCrossing = false } = {},
) {
  const sourcePoints = Array.isArray(points) ? points.map(point3) : [];
  if (sourcePoints.length < 2) return null;
  const matches = (faces ?? []).map((face) => {
    if (!Array.isArray(face?.points) || face.points.length < 3) return null;
    const plane = sketchPlaneFromFace(face);
    const outerLoop = face.points.map((point) => pointFromSketchPlane(point, plane));
    const innerLoops = (face.holes ?? []).map((loop) =>
      loop.map((point) => pointFromSketchPlane(point, plane)));
    const extent = Math.max(1, ...outerLoop.map((point) => Math.hypot(point.x, point.y)));
    const solidContactTolerance = Array.isArray(face?.sourceSolid?.vertices)
      ? booleanContactOverlap(face.sourceSolid) * SUPPORT_FACE_CONTACT_FACTOR
      : 0;
    const localTolerance = Math.max(
      tolerance,
      extent * 1e-7,
      solidContactTolerance,
    );
    const samples = sourcePoints.slice(0, -1).flatMap((start, index) => {
      const end = sourcePoints[index + 1];
      return [0, 0.25, 0.5, 0.75, 1].map((parameter) => ({
        x: start.x + (end.x - start.x) * parameter,
        y: start.y + (end.y - start.y) * parameter,
        z: start.z + (end.z - start.z) * parameter,
      }));
    }).map((point) => pointFromSketchPlane(point, plane));
    const pointInsideSupport = (point) => {
      if (Math.abs(point.z) > localTolerance) return false;
      const local = { x: point.x, y: point.y };
      const insideOuter = pointOnLoopBoundary(local, outerLoop, localTolerance) ||
        pointInLoop(local, outerLoop);
      if (!insideOuter) return false;
      return innerLoops.every((loop) =>
        pointOnLoopBoundary(local, loop, localTolerance) || !pointInLoop(local, loop));
    };
    const contains = samples.every(pointInsideSupport);
    const coplanar = samples.every((point) => Math.abs(point.z) <= localTolerance);
    const crossesBoundary = allowCrossing && coplanar && (
      samples.some(pointInsideSupport) ||
      sourcePoints.slice(0, -1).some((_, index) => {
        const start = pointFromSketchPlane(sourcePoints[index], plane);
        const end = pointFromSketchPlane(sourcePoints[index + 1], plane);
        const first = { x: start.x, y: start.y };
        const second = { x: end.x, y: end.y };
        return loopSegmentIntersects(first, second, outerLoop, localTolerance) ||
          innerLoops.some((loop) =>
            loopSegmentIntersects(first, second, loop, localTolerance));
      })
    );
    if (!contains && !crossesBoundary) return null;
    return { face, plane, area: polygonArea2d(outerLoop) };
  }).filter(Boolean).sort((first, second) => first.area - second.area);
  return matches[0] ?? null;
}

function line3dScale(segments, points) {
  const allPoints = [
    ...(segments ?? []).flatMap((segment) => [segment?.start, segment?.end]),
    ...(points ?? []),
  ].map(point3);
  if (!allPoints.length) return 1;
  return ['x', 'y', 'z'].reduce((largest, axis) => {
    const values = allPoints.map((point) => point[axis]);
    return Math.max(largest, Math.max(...values) - Math.min(...values));
  }, 1);
}

function createSplitEntry(segment) {
  return {
    segment: {
      start: point3(segment.start),
      end: point3(segment.end),
    },
    points: [
      { parameter: 0, point: point3(segment.start) },
      { parameter: 1, point: point3(segment.end) },
    ],
  };
}

function addSplitPoint(entry, point, tolerance) {
  const start = entry.segment.start;
  const end = entry.segment.end;
  const delta = displacementBetween(start, end);
  const lengthSquared = delta.x ** 2 + delta.y ** 2 + delta.z ** 2;
  if (lengthSquared <= tolerance ** 2) return false;
  const parameter = (
    (point.x - start.x) * delta.x +
    (point.y - start.y) * delta.y +
    (point.z - start.z) * delta.z
  ) / lengthSquared;
  const parameterTolerance = tolerance / Math.sqrt(lengthSquared);
  if (parameter < -parameterTolerance || parameter > 1 + parameterTolerance) return false;
  const clamped = Math.max(0, Math.min(1, parameter));
  const projected = {
    x: start.x + delta.x * clamped,
    y: start.y + delta.y * clamped,
    z: start.z + delta.z * clamped,
  };
  if (distance(projected, point3(point)) > tolerance) return false;
  if (clamped <= parameterTolerance || clamped >= 1 - parameterTolerance) return true;
  const duplicate = entry.points.find((candidate) =>
    Math.abs(candidate.parameter - clamped) <= parameterTolerance);
  if (duplicate) {
    duplicate.point = point3(point);
    return true;
  }
  entry.points.push({ parameter: clamped, point: point3(point) });
  return true;
}

function closestSegmentIntersection(first, second, tolerance) {
  const firstStart = first.segment.start;
  const secondStart = second.segment.start;
  const firstDelta = displacementBetween(firstStart, first.segment.end);
  const secondDelta = displacementBetween(secondStart, second.segment.end);
  const offset = displacementBetween(secondStart, firstStart);
  const a = firstDelta.x ** 2 + firstDelta.y ** 2 + firstDelta.z ** 2;
  const b = firstDelta.x * secondDelta.x +
    firstDelta.y * secondDelta.y +
    firstDelta.z * secondDelta.z;
  const c = secondDelta.x ** 2 + secondDelta.y ** 2 + secondDelta.z ** 2;
  const d = firstDelta.x * offset.x + firstDelta.y * offset.y + firstDelta.z * offset.z;
  const e = secondDelta.x * offset.x + secondDelta.y * offset.y + secondDelta.z * offset.z;
  const denominator = a * c - b * b;
  if (a <= tolerance ** 2 || c <= tolerance ** 2 ||
      Math.abs(denominator) <= a * c * 1e-12) return null;
  const firstParameter = (b * e - c * d) / denominator;
  const secondParameter = (a * e - b * d) / denominator;
  const firstTolerance = tolerance / Math.sqrt(a);
  const secondTolerance = tolerance / Math.sqrt(c);
  if (firstParameter < -firstTolerance || firstParameter > 1 + firstTolerance ||
      secondParameter < -secondTolerance || secondParameter > 1 + secondTolerance) return null;
  const firstPoint = {
    x: firstStart.x + firstDelta.x * firstParameter,
    y: firstStart.y + firstDelta.y * firstParameter,
    z: firstStart.z + firstDelta.z * firstParameter,
  };
  const secondPoint = {
    x: secondStart.x + secondDelta.x * secondParameter,
    y: secondStart.y + secondDelta.y * secondParameter,
    z: secondStart.z + secondDelta.z * secondParameter,
  };
  if (distance(firstPoint, secondPoint) > tolerance) return null;
  return {
    x: (firstPoint.x + secondPoint.x) * 0.5,
    y: (firstPoint.y + secondPoint.y) * 0.5,
    z: (firstPoint.z + secondPoint.z) * 0.5,
  };
}

function registerSegmentIntersection(first, second, tolerance) {
  const intersection = closestSegmentIntersection(first, second, tolerance);
  if (intersection) {
    addSplitPoint(first, intersection, tolerance);
    addSplitPoint(second, intersection, tolerance);
    return true;
  }
  let touches = false;
  [first.segment.start, first.segment.end].forEach((point) => {
    if (addSplitPoint(second, point, tolerance)) touches = true;
  });
  [second.segment.start, second.segment.end].forEach((point) => {
    if (addSplitPoint(first, point, tolerance)) touches = true;
  });
  return touches;
}

function splitEntrySegments(entry, tolerance) {
  const ordered = [...entry.points].sort((first, second) =>
    first.parameter - second.parameter);
  return ordered.slice(0, -1).map((item, index) => ({
    start: point3(item.point),
    end: point3(ordered[index + 1].point),
  })).filter((segment) => distance(segment.start, segment.end) > tolerance);
}

export function splitLine3dSegmentsAtIntersections({
  existingLines = [],
  newSegments = [],
  splitPoints = [],
  tolerance = null,
} = {}) {
  const cleanExisting = (existingLines ?? []).filter((line) =>
    line?.type === 'LINE3D' && line.visible !== false && line.locked !== true &&
    line.start && line.end);
  const cleanNew = (newSegments ?? []).filter((segment) => segment?.start && segment?.end);
  const resolvedTolerance = Number.isFinite(tolerance) && tolerance > 0
    ? tolerance
    : Math.max(
      POINT_TOLERANCE,
      line3dScale([...cleanExisting, ...cleanNew], splitPoints) *
        LINE3D_INTERSECTION_TOLERANCE_FACTOR,
    );
  const existingEntries = cleanExisting.map((line) => ({
    ...createSplitEntry(line),
    line,
  }));
  const newEntries = cleanNew.map(createSplitEntry);
  newEntries.forEach((entry) => {
    (splitPoints ?? []).forEach((point) =>
      addSplitPoint(entry, point3(point), resolvedTolerance));
  });
  const touchedExistingLineIds = new Set();
  newEntries.forEach((entry, newIndex) => {
    existingEntries.forEach((existing) => {
      if (registerSegmentIntersection(entry, existing, resolvedTolerance)) {
        touchedExistingLineIds.add(existing.line.id);
      }
    });
    newEntries.slice(newIndex + 1).forEach((other) =>
      registerSegmentIntersection(entry, other, resolvedTolerance));
  });
  const existingReplacements = existingEntries.map((entry) => {
    const segments = splitEntrySegments(entry, resolvedTolerance);
    return segments.length > 1 ? { id: entry.line.id, segments } : null;
  }).filter(Boolean);
  return {
    existingReplacements,
    newSegments: newEntries.flatMap((entry) =>
      splitEntrySegments(entry, resolvedTolerance)),
    touchedExistingLineIds: [...touchedExistingLineIds],
    tolerance: resolvedTolerance,
  };
}

function boundaryIntersectionPoints(line, boundary) {
  if (boundary?.type === 'LINE') {
    const point = lineSegmentIntersection(line, boundary);
    return point ? [point] : [];
  }
  if (boundary?.type === 'CIRCLE' || boundary?.type === 'ARC') {
    return lineCircleIntersectionPoints(line, boundary)
      .filter((point) => pointOnCircularEntity(point, boundary));
  }
  if (boundary?.type === 'ELLIPSE' || boundary?.type === 'ELLIPSE_ARC') {
    return lineEllipseIntersectionPoints(line, boundary);
  }
  return [];
}

export function line3dBoundaryIntersectionPoints(points, plane, boundaries) {
  const lines = line3dEntitiesFromWorldPoints(points, plane);
  const intersections = lines.flatMap((line) =>
    (boundaries ?? []).flatMap((boundary) =>
      boundaryIntersectionPoints(line, boundary)));
  const worldPoints = intersections.map((point) => pointOnSketchPlane({
    x: point.x,
    y: -point.y,
    z: 0,
  }, plane));
  return worldPoints.filter((point, index) => worldPoints.findIndex((candidate) =>
    distance(point, candidate) <= POINT_TOLERANCE) === index);
}

export function transformLine3dRecords(lines, transform) {
  if (!Array.isArray(lines) || !transform) return [];
  const transformPoint = (point) => {
    const value = new THREE.Vector3(point.x, point.y, point.z);
    if (transform.type === 'translate') {
      const delta = point3(transform.displacement);
      value.add(new THREE.Vector3(delta.x, delta.y, delta.z));
    }
    else if (transform.type === 'rotate') {
      const start = point3(transform.axisStart);
      const end = point3(transform.axisEnd);
      const origin = new THREE.Vector3(start.x, start.y, start.z);
      const axis = new THREE.Vector3(
        end.x - start.x,
        end.y - start.y,
        end.z - start.z,
      );
      if (axis.lengthSq() <= POINT_TOLERANCE ** 2) return null;
      value.sub(origin).applyAxisAngle(
        axis.normalize(),
        THREE.MathUtils.degToRad(Number(transform.angleDegrees) || 0),
      ).add(origin);
    }
    else return null;
    return { x: value.x, y: value.y, z: value.z };
  };
  return lines.map((line) => ({
    ...line,
    start: transformPoint(line.start),
    end: transformPoint(line.end),
  })).filter((line) => line.start && line.end);
}

export function createLine3dCommand({
  camera,
  canvas,
  getContext,
  getSnap = () => null,
  onCommit = () => null,
  onSnap = () => {},
  onStatus = () => {},
  render = () => {},
  scene,
} = {}) {
  const previewRoot = new THREE.Group();
  previewRoot.name = 'webcad-line3d-preview';
  const axisHelper = new THREE.AxesHelper(18);
  axisHelper.name = 'webcad-line3d-axis-helper';
  axisHelper.visible = false;
  previewRoot.add(axisHelper);
  scene.add(previewRoot);
  let active = false;
  let context = null;
  let points = [];
  let preview = null;
  let distanceGuide = null;
  let suppressClick = false;

  function clearPreview() {
    [preview, distanceGuide].forEach((object) => {
      if (!object) return;
      previewRoot.remove(object);
      disposeThreeObject(object);
    });
    preview = null;
    distanceGuide = null;
  }

  function committedPreviewSegments() {
    return points.slice(0, -1).map((start, index) => ({
      start,
      end: points[index + 1],
    }));
  }

  function updatePreview(candidate = null, snap = null, pickerContext = {}) {
    clearPreview();
    const segments = committedPreviewSegments();
    if (segments.length) {
      preview = createWideLineSegments(segments, {
        color: THREE_VIEW_STYLE.drawingColor,
        depthTest: false,
        depthWrite: false,
        linewidth: THREE_VIEW_STYLE.drawingLineWidth,
        renderOrder: 81,
        transparent: true,
        opacity: 0.95,
      });
      previewRoot.add(preview);
    }
    if (candidate && points.length) {
      distanceGuide = createDistanceGuide(
        points.at(-1),
        point3(candidate),
        pickerContext,
        'webcad-line3d-draw-distance-guide',
      );
      if (distanceGuide) previewRoot.add(distanceGuide);
    }
    onSnap(snap);
    if (candidate && points.length) {
      onStatus(line3dDistanceStatus(
        `Línea 3D · tramo ${segments.length + 1}`,
        points.at(-1),
        point3(candidate),
      ));
    }
    render();
  }

  function complete(cancelled = false) {
    if (!active) return false;
    picker.cancel();
    const committed = !cancelled && points.length >= 2
      ? onCommit({
        context,
        closed: isClosedLine3dChain(points),
        points: points.map(point3),
      })
      : null;
    active = false;
    context = null;
    points = [];
    clearPreview();
    axisHelper.visible = false;
    onSnap(null);
    onStatus(cancelled
      ? 'Línea 3D cancelada'
      : committed ? 'Línea 3D creada' : 'Línea 3D finalizada');
    render();
    return true;
  }

  function requestPoint() {
    picker.start({
      prompt: points.length
        ? 'Precise el siguiente punto · Enter, Espacio o clic derecho para terminar'
        : 'Precise el primer punto',
      ...(points.length ? { anchor: points.at(-1) } : {}),
      onCancel() {
        complete(points.length < 2);
      },
      onPoint(point) {
        const clean = point3(point);
        if (points.length && distance(points.at(-1), clean) <= POINT_TOLERANCE) {
          requestPoint();
          return;
        }
        if (points.length >= 3 && distance(points[0], clean) <= POINT_TOLERANCE) {
          points.push({ ...points[0] });
          updatePreview();
          complete();
          return;
        }
        points.push(clean);
        updatePreview();
        requestPoint();
      },
    });
  }

  function firstPointSnap(event) {
    if (points.length < 3 || !event) return null;
    const rect = canvas.getBoundingClientRect();
    const projected = new THREE.Vector3(
      points[0].x,
      points[0].y,
      points[0].z,
    ).project(camera);
    if (projected.z < -1 || projected.z > 1) return null;
    const x = rect.left + (projected.x + 1) * rect.width * 0.5;
    const y = rect.top + (1 - projected.y) * rect.height * 0.5;
    const distancePixels = Math.hypot(event.clientX - x, event.clientY - y);
    return distancePixels <= 16
      ? {
        type: 'endpoint',
        point: { ...points[0] },
        documentSolidId: null,
        distancePixels,
      }
      : null;
  }

  const picker = createPoint3dInput({
    camera,
    canvas,
    getSnap: (event) => {
      const existing = getSnap(event, {
        context,
        firstPoint: points[0] ?? null,
        points,
      });
      const closure = firstPointSnap(event);
      return closure && (!existing ||
          closure.distancePixels <= Number(existing.distancePixels ?? Infinity))
        ? closure
        : existing;
    },
    getWorkplane: () => context?.plane,
    onHelper(point) {
      axisHelper.position.set(point.x, point.y, point.z);
      axisHelper.visible = true;
      render();
    },
    onPreview(point, pickerContext) {
      updatePreview(point, pickerContext.snap ?? null, pickerContext);
    },
    onStatus,
  });

  function start() {
    const nextContext = getContext?.();
    if (!nextContext?.plane) {
      onStatus('Línea 3D · no hay una referencia espacial válida');
      return false;
    }
    if (active) complete(true);
    active = true;
    context = nextContext;
    points = [];
    canvas.focus?.({ preventScroll: true });
    requestPoint();
    return true;
  }

  function pointermove(event) {
    if (!active || event.buttons) return;
    picker.pointer(event);
  }

  function pointerdown(event) {
    if (!active || (event.button !== 0 && event.button !== 2)) return;
    suppressClick = true;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (isLine3dFinishEvent(event)) {
      complete(points.length < 2);
      return;
    }
    picker.pointer(event);
    picker.confirm();
  }

  function click(event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function keydown(event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      complete(points.length < 2);
      return;
    }
    if (isLine3dFinishEvent(event, { hasInput: picker.hasInput() })) {
      event.preventDefault();
      event.stopImmediatePropagation();
      complete(points.length < 2);
      return;
    }
    if (picker.keydown(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function keyup(event) {
    if (!active || !picker.keyup(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function contextmenu(event) {
    if (!active) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  canvas.addEventListener('pointermove', pointermove, true);
  canvas.addEventListener('pointerdown', pointerdown, true);
  canvas.addEventListener('click', click, true);
  canvas.addEventListener('contextmenu', contextmenu, true);
  canvas.addEventListener('keydown', keydown, true);
  canvas.addEventListener('keyup', keyup, true);

  return {
    cancel: () => complete(true),
    dispose() {
      complete(true);
      canvas.removeEventListener('pointermove', pointermove, true);
      canvas.removeEventListener('pointerdown', pointerdown, true);
      canvas.removeEventListener('click', click, true);
      canvas.removeEventListener('contextmenu', contextmenu, true);
      canvas.removeEventListener('keydown', keydown, true);
      canvas.removeEventListener('keyup', keyup, true);
      scene.remove(previewRoot);
      disposeThreeObject(previewRoot);
    },
    isActive: () => active,
    start,
  };
}

export function createLine3dTransformCommand({
  camera,
  canvas,
  getSnap = () => null,
  getWorkplane,
  onSnap = () => {},
  onStatus = () => {},
  onTransform = () => false,
  render = () => {},
  scene,
} = {}) {
  const helper = new THREE.Group();
  helper.name = 'webcad-line3d-transform-helper';
  const axisHelper = new THREE.AxesHelper(18);
  axisHelper.name = 'webcad-line3d-transform-axis-helper';
  axisHelper.visible = false;
  helper.add(axisHelper);
  scene.add(helper);
  let active = false;
  let mode = null;
  let record = null;
  let phase = null;
  let firstPoint = null;
  let axisStart = null;
  let axisEnd = null;
  let angleInput = '';
  let suppressClick = false;
  let distanceGuide = null;
  let transformPreview = null;

  function clearDistanceGuide() {
    if (!distanceGuide) return;
    helper.remove(distanceGuide);
    disposeThreeObject(distanceGuide);
    distanceGuide = null;
  }

  function updateDistanceGuide(start, end, context = {}, name = 'webcad-line3d-transform-guide') {
    clearDistanceGuide();
    distanceGuide = createDistanceGuide(start, point3(end), context, name);
    if (distanceGuide) helper.add(distanceGuide);
  }

  function clearTransformPreview() {
    if (!transformPreview) return;
    helper.remove(transformPreview);
    disposeThreeObject(transformPreview);
    transformPreview = null;
  }

  function updateTransformPreview(transform) {
    clearTransformPreview();
    const transformed = transformLine3dRecords(record?.lines, transform);
    if (!transformed.length) return;
    transformPreview = createWideLineSegments(transformed.map((line) => ({
      start: line.start,
      end: line.end,
    })), {
      color: 0xffcf4d,
      depthTest: false,
      depthWrite: false,
      linewidth: THREE_VIEW_STYLE.drawingLineWidth + 0.8,
      renderOrder: 81,
      transparent: true,
      opacity: 0.82,
    });
    transformPreview.name = `webcad-line3d-${mode}-preview`;
    helper.add(transformPreview);
  }

  function reset(message = null) {
    picker.cancel();
    clearDistanceGuide();
    clearTransformPreview();
    onSnap(null);
    axisHelper.visible = false;
    active = false;
    mode = null;
    record = null;
    phase = null;
    firstPoint = null;
    axisStart = null;
    axisEnd = null;
    angleInput = '';
    if (message) onStatus(message);
    render();
  }

  function finishTranslate(destination) {
    const displacement = {
      x: destination.x - firstPoint.x,
      y: destination.y - firstPoint.y,
      z: destination.z - firstPoint.z,
    };
    const changed = onTransform({
      mode,
      record,
      transform: { type: 'translate', displacement },
    });
    reset(changed
      ? `Líneas 3D ${mode === 'copy' ? 'copiadas' : 'desplazadas'}`
      : 'Transformación de líneas 3D cancelada');
  }

  function requestDestination() {
    phase = 'destination';
    picker.start({
      anchor: firstPoint,
      prompt: 'Precise punto de destino',
      onCancel: () => reset('Transformación de líneas 3D cancelada'),
      onPoint: finishTranslate,
    });
  }

  function requestFirstPoint() {
    phase = 'base';
    picker.start({
      prompt: 'Precise punto base',
      onCancel: () => reset('Transformación de líneas 3D cancelada'),
      onPoint(point) {
        firstPoint = point3(point);
        clearDistanceGuide();
        requestDestination();
      },
    });
  }

  function requestAxisEnd() {
    phase = 'axisEnd';
    picker.start({
      anchor: axisStart,
      prompt: 'Precise segundo punto del eje',
      onCancel: () => reset('Giro de líneas 3D cancelado'),
      onPoint(point) {
        axisEnd = point3(point);
        if (distance(axisStart, axisEnd) <= POINT_TOLERANCE) {
          onStatus('El eje de giro debe tener longitud');
          requestAxisEnd();
          return;
        }
        picker.cancel();
        updateDistanceGuide(axisStart, axisEnd, { locked: true }, 'webcad-line3d-rotation-axis');
        phase = 'angle';
        angleInput = '';
        onStatus('Precise ángulo de giro');
      },
    });
  }

  function requestAxisStart() {
    phase = 'axisStart';
    picker.start({
      prompt: 'Precise primer punto del eje',
      onCancel: () => reset('Giro de líneas 3D cancelado'),
      onPoint(point) {
        axisStart = point3(point);
        requestAxisEnd();
      },
    });
  }

  function previewRotation(angleDegrees) {
    if (!Number.isFinite(angleDegrees) || !axisStart || !axisEnd) return false;
    updateTransformPreview({
      type: 'rotate',
      axisStart,
      axisEnd,
      angleDegrees,
    });
    onStatus(`Precise ángulo de giro · ${formatNumber(angleDegrees)}°`);
    render();
    return true;
  }

  function confirmRotation() {
    const angleDegrees = parseScalarExpression(angleInput);
    if (!Number.isFinite(angleDegrees)) return false;
    const changed = onTransform({
      mode,
      record,
      transform: { type: 'rotate', axisStart, axisEnd, angleDegrees },
    });
    reset(changed ? `Líneas 3D giradas ${angleDegrees}°` : 'Giro de líneas 3D cancelado');
    return true;
  }

  const picker = createPoint3dInput({
    camera,
    canvas,
    getSnap,
    getWorkplane,
    onHelper(point) {
      axisHelper.position.set(point.x, point.y, point.z);
      axisHelper.visible = true;
      render();
    },
    onStatus,
    onPreview(point, context) {
      onSnap(context.snap ?? null);
      if (phase === 'destination' && firstPoint) {
        updateDistanceGuide(firstPoint, point, context);
        updateTransformPreview({
          type: 'translate',
          displacement: displacementBetween(firstPoint, point3(point)),
        });
        onStatus(line3dDistanceStatus('Precise punto de destino', firstPoint, point3(point)));
        render();
      }
      else if (phase === 'axisEnd' && axisStart) {
        updateDistanceGuide(axisStart, point, context, 'webcad-line3d-rotation-axis');
        onStatus(line3dDistanceStatus('Precise segundo punto del eje', axisStart, point3(point)));
        render();
      }
    },
  });

  function start(nextMode, nextRecord) {
    if (!Array.isArray(nextRecord?.lines) || !nextRecord.lines.length) return false;
    if (active) reset();
    active = true;
    mode = nextMode;
    record = nextRecord;
    canvas.focus?.({ preventScroll: true });
    if (mode === 'rotate') requestAxisStart();
    else requestFirstPoint();
    return true;
  }

  function pointermove(event) {
    if (!active || !picker.isActive() || event.buttons) return;
    picker.pointer(event);
  }

  function pointerdown(event) {
    if (!active || (event.button !== 0 && event.button !== 2)) return;
    if (phase === 'angle' && event.button === 2) {
      suppressClick = true;
      event.preventDefault();
      event.stopImmediatePropagation();
      confirmRotation();
      return;
    }
    if (!picker.isActive()) return;
    suppressClick = true;
    event.preventDefault();
    event.stopImmediatePropagation();
    picker.pointer(event);
    picker.confirm();
  }

  function click(event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function keydown(event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      reset('Transformación de líneas 3D cancelada');
      return;
    }
    if (phase === 'angle') {
      if (event.key === 'Enter' || event.key === ' ') {
        if (!confirmRotation()) return;
      }
      else if (event.key === 'Backspace') angleInput = angleInput.slice(0, -1);
      else if (/^[0-9eE+\-*/().,\s]$/.test(event.key)) angleInput += event.key;
      else return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (phase === 'angle') {
        const parsed = parseScalarExpression(angleInput);
        if (!previewRotation(parsed)) {
          clearTransformPreview();
          onStatus(`Precise ángulo de giro · ${angleInput}`);
          render();
        }
      }
      return;
    }
    if (picker.keydown(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function keyup(event) {
    if (!active || !picker.isActive() || !picker.keyup(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  canvas.addEventListener('pointermove', pointermove, true);
  canvas.addEventListener('pointerdown', pointerdown, true);
  canvas.addEventListener('click', click, true);
  canvas.addEventListener('contextmenu', contextmenu, true);
  canvas.addEventListener('keydown', keydown, true);
  canvas.addEventListener('keyup', keyup, true);

  return {
    cancel: () => reset('Transformación de líneas 3D cancelada'),
    dispose() {
      reset();
      canvas.removeEventListener('pointermove', pointermove, true);
      canvas.removeEventListener('pointerdown', pointerdown, true);
      canvas.removeEventListener('click', click, true);
      canvas.removeEventListener('contextmenu', contextmenu, true);
      canvas.removeEventListener('keydown', keydown, true);
      canvas.removeEventListener('keyup', keyup, true);
      scene.remove(helper);
      disposeThreeObject(helper);
    },
    isActive: () => active,
    startCopy: (nextRecord) => start('copy', nextRecord),
    startMove: (nextRecord) => start('move', nextRecord),
    startRotate: (nextRecord) => start('rotate', nextRecord),
  };

  function contextmenu(event) {
    if (!active) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

/* webCAD - Proyeccion derivada de solidos sobre un croquis | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  normalizeSketchPlane,
  pointFromSketchPlane,
  pointOnExactProfilePlane,
} from './sketch-plane.js';
import {
  normalizeSolidPlacement,
  rotatePointByQuaternion,
  solidLocalToWorld,
} from './solid-placement.js';
import {
  deriveSolidAnalyticEdges,
  pointOnAnalyticCurve,
  sampleSolidAnalyticEdges,
} from './analytic-edges.js';
import { solidWithDerivedSurfaceTopology } from './three/manifold-boolean.js';

const DEFAULT_TOLERANCE = 1e-7;
const TWO_PI = Math.PI * 2;

function normalizeAngle(angle) {
  const normalized = Number(angle) % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function pointKey(point, tolerance) {
  return `${Math.round(point.x / tolerance)}:${Math.round(point.y / tolerance)}`;
}

function segmentKey(start, end, tolerance) {
  const first = pointKey(start, tolerance);
  const second = pointKey(end, tolerance);
  return first < second ? `${first}|${second}` : `${second}|${first}`;
}

function pointForSketchEditor(point) {
  return { x: Number(point?.x) || 0, y: -(Number(point?.y) || 0), z: 0 };
}

function dot(first, second) {
  return first.x * second.x + first.y * second.y + first.z * second.z;
}

function add(first, second) {
  return {
    x: first.x + second.x,
    y: first.y + second.y,
    z: first.z + second.z,
  };
}

function scale(vector, factor) {
  return { x: vector.x * factor, y: vector.y * factor, z: vector.z * factor };
}

function cross(first, second) {
  return {
    x: first.y * second.z - first.z * second.y,
    y: first.z * second.x - first.x * second.z,
    z: first.x * second.y - first.y * second.x,
  };
}

function worldProfilePoint(
  point,
  profilePlane,
  offset = { x: 0, y: 0, z: 0 },
  placement = null,
) {
  return solidLocalToWorld(
    add(pointOnExactProfilePlane(point, profilePlane), offset),
    placement,
  );
}

function exactExtrusionEntries(solid) {
  const entries = [];
  const exactBase = solid?.metadata?.exactGeometry?.base;
  const baseExtrusion = exactBase?.extrusion;
  const baseProfile = baseExtrusion?.profile ?? exactBase?.profile;
  if (baseProfile && baseExtrusion) {
    const distance = Number(baseExtrusion.distance) || 0;
    entries.push({
      profile: baseProfile,
      offset: baseExtrusion.offset ?? scale(baseExtrusion.direction ?? baseProfile.plane?.normal, distance),
    });
  }
  const features = solid?.metadata?.profileFeatures ?? solid?.metadata?.exactGeometry?.operations ?? [];
  features.forEach((feature) => {
    const profile = feature?.exactProfile;
    const distance = Number(feature?.distance);
    if (!profile || !Number.isFinite(distance)) return;
    entries.push({
      profile,
      offset: scale(profile.plane?.normal ?? { x: 0, y: 0, z: 1 }, distance),
    });
  });
  return entries;
}

function exactSegmentPoint(segment, parameter) {
  const rotation = Number(segment?.rotation) || 0;
  const radiusX = segment?.type === 'arc-circle'
    ? Number(segment.radius)
    : Number(segment?.radiusX);
  const radiusY = segment?.type === 'arc-circle'
    ? Number(segment.radius)
    : Number(segment?.radiusY);
  const localX = Math.cos(parameter) * radiusX;
  const localY = Math.sin(parameter) * radiusY;
  return {
    x: (Number(segment?.center?.x) || 0) +
      localX * Math.cos(rotation) - localY * Math.sin(rotation),
    y: (Number(segment?.center?.y) || 0) +
      localX * Math.sin(rotation) + localY * Math.cos(rotation),
    z: Number(segment?.center?.z) || 0,
  };
}

function curveUsesEllipse(curve) {
  return curve?.type === 'ellipse' || curve?.type === 'ellipse-arc';
}

function curveAngleFields(curve) {
  return curveUsesEllipse(curve)
    ? { start: curve.startParameter, end: curve.endParameter }
    : { start: curve.startAngle, end: curve.endAngle };
}

function partialCurveDirection(curve, midpoint) {
  const fields = curveAngleFields(curve);
  const midpointParameter = curveParameter(midpoint, curve, DEFAULT_TOLERANCE);
  if (midpointParameter === null) return true;
  return directedSweep(fields.start, midpointParameter, true) <=
    directedSweep(fields.start, fields.end, true) + 1e-6;
}

function exactCurveCandidate(
  segment,
  profilePlane,
  target,
  curveOffset,
  sourceSolidId,
  placement,
) {
  const circular = segment?.type === 'circle' || segment?.type === 'arc-circle';
  const elliptical = segment?.type === 'ellipse' || segment?.type === 'arc-ellipse';
  if (!circular && !elliptical) return null;
  const centerWorld = worldProfilePoint(segment.center, profilePlane, curveOffset, placement);
  const center = pointForSketchEditor(pointFromSketchPlane(centerWorld, target));
  const rotation = Number(segment.rotation) || 0;
  const profileOrigin = worldProfilePoint(
    { x: 0, y: 0, z: 0 },
    profilePlane,
    { x: 0, y: 0, z: 0 },
    placement,
  );
  const majorAxis = add(
    worldProfilePoint({
      x: Math.cos(rotation),
      y: Math.sin(rotation),
      z: 0,
    }, profilePlane, { x: 0, y: 0, z: 0 }, placement),
    scale(profileOrigin, -1),
  );
  const editorRotation = Math.atan2(-dot(majorAxis, target.yAxis), dot(majorAxis, target.xAxis));
  if (segment.type === 'circle') {
    return { type: 'circle', center, radius: Number(segment.radius), sourceSolidId };
  }
  if (segment.type === 'ellipse') {
    return {
      type: 'ellipse',
      center,
      radiusX: Number(segment.radiusX),
      radiusY: Number(segment.radiusY),
      rotation: editorRotation,
      sourceSolidId,
    };
  }
  const sweep = directedSweep(segment.startAngle, segment.endAngle, segment.clockwise !== false);
  const direction = segment.clockwise === false ? -1 : 1;
  const midpointParameter = segment.startAngle + direction * sweep * 0.5;
  const project = (point) => pointForSketchEditor(pointFromSketchPlane(
    worldProfilePoint(point, profilePlane, curveOffset, placement),
    target,
  ));
  const start = project(segment.start ?? exactSegmentPoint(segment, segment.startAngle));
  const end = project(segment.end ?? exactSegmentPoint(segment, segment.endAngle));
  const midpoint = project(exactSegmentPoint(segment, midpointParameter));
  const candidate = circular ? {
    type: 'arc',
    center,
    radius: Number(segment.radius),
    start,
    end,
    sourceSolidId,
  } : {
    type: 'ellipse-arc',
    center,
    radiusX: Number(segment.radiusX),
    radiusY: Number(segment.radiusY),
    rotation: editorRotation,
    start,
    end,
    sourceSolidId,
  };
  const startParameter = curveParameter(start, candidate, DEFAULT_TOLERANCE);
  const endParameter = curveParameter(end, candidate, DEFAULT_TOLERANCE);
  if (startParameter === null || endParameter === null) return null;
  if (circular) {
    candidate.startAngle = startParameter;
    candidate.endAngle = endParameter;
  }
  else {
    candidate.startParameter = startParameter;
    candidate.endParameter = endParameter;
  }
  candidate.clockwise = partialCurveDirection(candidate, midpoint);
  return candidate;
}

function derivedAnalyticCurveCandidate(
  curve,
  target,
  mode,
  sourceSolidId,
  placement,
  tolerance,
) {
  if (!['arc-circle', 'arc-ellipse'].includes(curve?.type)) return null;
  const radiusX = Number(curve.radiusX);
  const radiusY = Number(curve.radiusY);
  if (!(radiusX > 0) || !(radiusY > 0)) return null;
  const cleanPlacement = normalizeSolidPlacement(placement);
  const worldCenter = solidLocalToWorld(curve.center, cleanPlacement);
  const worldUAxis = rotatePointByQuaternion(curve.uAxis, cleanPlacement.quaternion);
  const worldVAxis = rotatePointByQuaternion(curve.vAxis, cleanPlacement.quaternion);
  const curveNormal = cross(worldUAxis, worldVAxis);
  const normalLength = Math.hypot(curveNormal.x, curveNormal.y, curveNormal.z);
  if (normalLength <= 1e-12 ||
      Math.abs(dot(curveNormal, target.normal)) / normalLength < 1 - 1e-6) {
    return null;
  }
  const localCenter = pointFromSketchPlane(worldCenter, target);
  if (mode === 'section' && Math.abs(localCenter.z) > tolerance) return null;
  const center = pointForSketchEditor(localCenter);
  const rotation = Math.atan2(
    -dot(worldUAxis, target.yAxis),
    dot(worldUAxis, target.xAxis),
  );
  const circular = curve.type === 'arc-circle';
  if (curve.closed === true) {
    return circular
      ? { type: 'circle', center, radius: radiusX, sourceSolidId }
      : {
        type: 'ellipse',
        center,
        radiusX,
        radiusY,
        rotation,
        sourceSolidId,
      };
  }
  const startAngle = Number(curve.startAngle);
  const sweep = Number(curve.sweep);
  if (!Number.isFinite(startAngle) || !(sweep > 0)) return null;
  const direction = curve.clockwise === false ? -1 : 1;
  const project = (angle) => pointForSketchEditor(pointFromSketchPlane(
    solidLocalToWorld(pointOnAnalyticCurve(curve, angle), cleanPlacement),
    target,
  ));
  const start = project(startAngle);
  const end = project(startAngle + direction * sweep);
  const midpoint = project(startAngle + direction * sweep * 0.5);
  const candidate = circular ? {
    type: 'arc',
    center,
    radius: radiusX,
    start,
    end,
    sourceSolidId,
  } : {
    type: 'ellipse-arc',
    center,
    radiusX,
    radiusY,
    rotation,
    start,
    end,
    sourceSolidId,
  };
  const startParameter = curveParameter(start, candidate, tolerance);
  const endParameter = curveParameter(end, candidate, tolerance);
  if (startParameter === null || endParameter === null) return null;
  if (circular) {
    candidate.startAngle = startParameter;
    candidate.endAngle = endParameter;
  }
  else {
    candidate.startParameter = startParameter;
    candidate.endParameter = endParameter;
  }
  candidate.clockwise = partialCurveDirection(candidate, midpoint);
  return candidate;
}

function candidateKey(candidate) {
  const center = pointKey(candidate.center, 1e-6);
  const shape = curveUsesEllipse(candidate)
    ? `${candidate.radiusX.toFixed(6)}:${candidate.radiusY.toFixed(6)}:${candidate.rotation.toFixed(6)}`
    : candidate.radius.toFixed(6);
  if (candidate.type === 'circle' || candidate.type === 'ellipse') {
    return `${candidate.type}:${center}:${shape}`;
  }
  const fields = curveAngleFields(candidate);
  return `${candidate.type}:${center}:${shape}:${fields.start.toFixed(6)}:${fields.end.toFixed(6)}:${candidate.clockwise}`;
}

function exactCurveCandidates(
  solid,
  targetPlane,
  mode,
  sourceSolidId,
  placement = null,
  tolerance = DEFAULT_TOLERANCE,
) {
  const target = normalizeSketchPlane(targetPlane);
  const cleanPlacement = normalizeSolidPlacement(placement);
  const candidates = [];
  exactExtrusionEntries(solid).forEach(({ profile, offset }) => {
    const profilePlane = normalizeSketchPlane(profile?.plane);
    const worldProfileNormal = rotatePointByQuaternion(
      profilePlane.normal,
      cleanPlacement.quaternion,
    );
    if (Math.abs(dot(worldProfileNormal, target.normal)) < 1 - 1e-6) return;
    const startDistance = pointFromSketchPlane(worldProfilePoint(
      { x: 0, y: 0, z: 0 },
      profilePlane,
      { x: 0, y: 0, z: 0 },
      placement,
    ), target).z;
    const endDistance = pointFromSketchPlane(worldProfilePoint(
      { x: 0, y: 0, z: 0 },
      profilePlane,
      offset,
      placement,
    ), target).z;
    const offsets = mode === 'section'
      ? (startDistance * endDistance <= DEFAULT_TOLERANCE ** 2 ? [{ x: 0, y: 0, z: 0 }] : [])
      : [{ x: 0, y: 0, z: 0 }, offset];
    const loops = [profile?.outerLoop, ...(profile?.innerLoops ?? [])];
    offsets.forEach((curveOffset) => loops.forEach((loop) => {
      (loop?.segments ?? []).forEach((segment) => {
        const candidate = exactCurveCandidate(
          segment,
          profilePlane,
          target,
          curveOffset,
          sourceSolidId,
          placement,
        );
        if (candidate) candidates.push(candidate);
      });
    }));
  });
  deriveSolidAnalyticEdges(solid).curves.forEach((curve) => {
    const candidate = derivedAnalyticCurveCandidate(
      curve,
      target,
      mode,
      sourceSolidId,
      cleanPlacement,
      tolerance,
    );
    if (candidate) candidates.push(candidate);
  });
  const unique = new Map();
  candidates.forEach((candidate) => {
    const key = candidateKey(candidate);
    if (!unique.has(key)) unique.set(key, candidate);
  });
  return [...unique.values()];
}

function curveParameter(point, curve, tolerance) {
  const dx = point.x - curve.center.x;
  const dy = point.y - curve.center.y;
  const rotation = curveUsesEllipse(curve) ? curve.rotation : 0;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const localX = dx * cos + dy * sin;
  const localY = -dx * sin + dy * cos;
  const radiusX = curveUsesEllipse(curve) ? curve.radiusX : curve.radius;
  const radiusY = curveUsesEllipse(curve) ? curve.radiusY : curve.radius;
  if (!(radiusX > tolerance) || !(radiusY > tolerance)) return null;
  const normalizedX = localX / radiusX;
  const normalizedY = localY / radiusY;
  const radialError = Math.abs(normalizedX * normalizedX + normalizedY * normalizedY - 1);
  // A section of triangulated curved quads contains chord midpoints slightly inside the
  // analytical curve. The complete-loop coverage check below keeps this tolerance safe.
  if (radialError > Math.max(0.05, tolerance / Math.max(radiusX, radiusY) * 20)) return null;
  return Math.atan2(normalizedY, normalizedX);
}

function parameterOnPartialCurve(parameter, curve, tolerance) {
  const fields = curveAngleFields(curve);
  const sweep = directedSweep(fields.start, fields.end, curve.clockwise !== false);
  const offset = directedSweep(fields.start, parameter, curve.clockwise !== false);
  const angularTolerance = Math.max(1e-5, tolerance / Math.max(
    curve.radius ?? curve.radiusX ?? 1,
    1e-9,
  ) * 20);
  return offset <= sweep + angularTolerance;
}

function angleDistance(first, second) {
  return Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)));
}

function connectedCurveMatches(matches, tolerance) {
  const byPoint = new Map();
  const link = (point, matchIndex) => {
    const key = pointKey(point, Math.max(tolerance, 1e-6));
    if (!byPoint.has(key)) byPoint.set(key, []);
    byPoint.get(key).push(matchIndex);
  };
  matches.forEach((match, index) => {
    link(match.segment.start, index);
    link(match.segment.end, index);
  });
  const visited = new Set();
  return matches.flatMap((_, root) => {
    if (visited.has(root)) return [];
    const component = [];
    const pending = [root];
    visited.add(root);
    while (pending.length) {
      const current = pending.pop();
      component.push(matches[current]);
      const match = matches[current];
      [match.segment.start, match.segment.end].forEach((point) => {
        const key = pointKey(point, Math.max(tolerance, 1e-6));
        (byPoint.get(key) ?? []).forEach((neighbor) => {
          if (visited.has(neighbor)) return;
          visited.add(neighbor);
          pending.push(neighbor);
        });
      });
    }
    return [component];
  });
}

function curveComponentEndpoints(component, tolerance) {
  const endpoints = new Map();
  component.forEach((match) => {
    [
      [match.segment.start, match.start],
      [match.segment.end, match.end],
    ].forEach(([point, parameter]) => {
      const key = pointKey(point, Math.max(tolerance, 1e-6));
      const endpoint = endpoints.get(key) ?? { count: 0, parameter, point };
      endpoint.count += 1;
      endpoints.set(key, endpoint);
    });
  });
  return [...endpoints.values()].filter((endpoint) => endpoint.count === 1);
}

function withoutClosingCurveChord(component, tolerance) {
  const coveredAngle = component.reduce((sum, match) => sum + match.difference, 0);
  if (component.length < 3 || curveComponentEndpoints(component, tolerance).length ||
      coveredAngle >= Math.PI * 1.75) return component;
  const closingChord = component.reduce((largest, match) =>
    !largest || match.difference > largest.difference ? match : largest, null);
  return component.filter((match) => match !== closingChord);
}

function partialCurveFromComponent(curve, component, tolerance) {
  if (component.length < 2) return null;
  const openEnds = curveComponentEndpoints(component, tolerance);
  const coveredAngle = component.reduce((sum, match) => sum + match.difference, 0);
  if (!openEnds.length && coveredAngle >= Math.PI * 1.75) return curve;
  if (openEnds.length !== 2 || coveredAngle < 0.05) return null;
  const [start, end] = openEnds;
  const clockwiseSweep = directedSweep(start.parameter, end.parameter, true);
  const counterclockwiseSweep = directedSweep(start.parameter, end.parameter, false);
  const clockwise = Math.abs(clockwiseSweep - coveredAngle) <=
    Math.abs(counterclockwiseSweep - coveredAngle);
  const partial = {
    ...curve,
    type: curve.type === 'circle' ? 'arc' : 'ellipse-arc',
    start: { ...start.point },
    end: { ...end.point },
    clockwise,
  };
  if (curve.type === 'circle') {
    partial.startAngle = start.parameter;
    partial.endAngle = end.parameter;
  }
  else {
    partial.startParameter = start.parameter;
    partial.endParameter = end.parameter;
  }
  return partial;
}

function replaceAnalyticCurves(segments, candidates, tolerance) {
  const removed = new Set();
  const curves = [];
  candidates.forEach((curve) => {
    let matches = [];
    const partial = curve.type === 'arc' || curve.type === 'ellipse-arc';
    segments.forEach((segment, index) => {
      if (removed.has(index) || segment.sourceSolidId !== curve.sourceSolidId) return;
      const start = curveParameter(segment.start, curve, tolerance);
      const end = curveParameter(segment.end, curve, tolerance);
      if (start === null || end === null) return;
      if (partial &&
          (!parameterOnPartialCurve(start, curve, tolerance) ||
           !parameterOnPartialCurve(end, curve, tolerance))) return;
      const difference = Math.abs(Math.atan2(Math.sin(end - start), Math.cos(end - start)));
      if (difference > Math.PI / 3) return;
      matches.push({ difference, end, index, segment, start });
    });
    if (partial) {
      matches = connectedCurveMatches(matches, tolerance)
        .map((component) => withoutClosingCurveChord(component, tolerance))
        .sort((first, second) =>
          second.reduce((sum, match) => sum + match.difference, 0) -
          first.reduce((sum, match) => sum + match.difference, 0))[0] ?? [];
      const parameters = matches.flatMap((match) => [match.start, match.end]);
      const coveredAngle = matches.reduce((sum, match) => sum + match.difference, 0);
      const fields = curveAngleFields(curve);
      const expectedSweep = directedSweep(fields.start, fields.end, curve.clockwise !== false);
      const endpointTolerance = Math.max(0.02, expectedSweep * 0.05);
      const reachesStart = parameters.some((parameter) =>
        angleDistance(parameter, fields.start) <= endpointTolerance);
      const reachesEnd = parameters.some((parameter) =>
        angleDistance(parameter, fields.end) <= endpointTolerance);
      if (!matches.length || coveredAngle < expectedSweep * 0.85 || !reachesStart || !reachesEnd) {
        return;
      }
    }
    else {
      const replacements = connectedCurveMatches(matches, tolerance)
        .map((component) => withoutClosingCurveChord(component, tolerance))
        .map((component) => ({ component, curve: partialCurveFromComponent(curve, component, tolerance) }))
        .filter((replacement) => replacement.curve);
      if (!replacements.length) return;
      replacements.forEach(({ component, curve: replacement }) => {
        component.forEach(({ index }) => removed.add(index));
        curves.push(replacement);
      });
      return;
    }
    matches.forEach(({ index }) => removed.add(index));
    curves.push(curve);
  });
  return [
    ...segments.filter((_, index) => !removed.has(index)),
    ...curves,
  ];
}

function pointInLoop(point, loop) {
  let inside = false;
  for (let index = 0, previous = loop.length - 1; index < loop.length; previous = index, index += 1) {
    const currentPoint = loop[index];
    const previousPoint = loop[previous];
    const crosses = (currentPoint.y > point.y) !== (previousPoint.y > point.y);
    if (!crosses) continue;
    const intersectionX = ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
      (previousPoint.y - currentPoint.y) + currentPoint.x;
    if (point.x < intersectionX) inside = !inside;
  }
  return inside;
}

function loopCentroid(loop) {
  let twiceArea = 0;
  let x = 0;
  let y = 0;
  for (let index = 0; index < loop.length; index += 1) {
    const current = loop[index];
    const next = loop[(index + 1) % loop.length];
    const cross = current.x * next.y - next.x * current.y;
    twiceArea += cross;
    x += (current.x + next.x) * cross;
    y += (current.y + next.y) * cross;
  }
  if (Math.abs(twiceArea) > 1e-12) {
    return { x: x / (3 * twiceArea), y: y / (3 * twiceArea) };
  }
  return loop.reduce((sum, point) => ({
    x: sum.x + point.x / loop.length,
    y: sum.y + point.y / loop.length,
  }), { x: 0, y: 0 });
}

function faceInteriorPoints(face) {
  const outer = face?.points ?? [];
  if (outer.length < 3) return [];
  const holes = face?.holes ?? [];
  const isInsideFace = (point) => pointInLoop(point, outer) &&
    !holes.some((loop) => pointInLoop(point, loop));
  const candidates = [loopCentroid(outer)];
  const anchor = outer[0];
  for (let index = 1; index < outer.length - 1; index += 1) {
    candidates.push({
      x: (anchor.x + outer[index].x + outer[index + 1].x) / 3,
      y: (anchor.y + outer[index].y + outer[index + 1].y) / 3,
    });
  }
  return candidates.filter(isInsideFace);
}

export function faceOverlapsSketchSupport(face, supportFace) {
  const toDetectionPoint = (point) => ({
    x: Number(point?.x) || 0,
    y: -(Number(point?.y) || 0),
  });
  const outer = (supportFace?.outerLoop ?? []).map(toDetectionPoint);
  if (outer.length < 3) return false;
  const holes = (supportFace?.innerLoops ?? []).map((loop) => loop.map(toDetectionPoint));
  return faceInteriorPoints(face).some((point) =>
    pointInLoop(point, outer) && !holes.some((loop) => pointInLoop(point, loop)));
}

function collinearOverlapLength(firstStart, firstEnd, secondStart, secondEnd, tolerance) {
  const dx = firstEnd.x - firstStart.x;
  const dy = firstEnd.y - firstStart.y;
  const length = Math.hypot(dx, dy);
  if (length <= tolerance) return 0;
  const distanceToLine = (point) =>
    Math.abs(dx * (point.y - firstStart.y) - dy * (point.x - firstStart.x)) / length;
  if (distanceToLine(secondStart) > tolerance || distanceToLine(secondEnd) > tolerance) return 0;
  const project = (point) =>
    ((point.x - firstStart.x) * dx + (point.y - firstStart.y) * dy) / length;
  const secondMin = Math.min(project(secondStart), project(secondEnd));
  const secondMax = Math.max(project(secondStart), project(secondEnd));
  return Math.max(0, Math.min(length, secondMax) - Math.max(0, secondMin));
}

export function faceTouchesSketchSupport(face, supportFace, options = {}) {
  const tolerance = Math.max(Number(options.tolerance) || 1e-6, 1e-12);
  const toDetectionPoint = (point) => ({
    x: Number(point?.x) || 0,
    y: -(Number(point?.y) || 0),
  });
  const faceLoops = [face?.points, ...(face?.holes ?? [])]
    .filter((loop) => Array.isArray(loop) && loop.length >= 3);
  const supportLoops = [supportFace?.outerLoop, ...(supportFace?.innerLoops ?? [])]
    .filter((loop) => Array.isArray(loop) && loop.length >= 3)
    .map((loop) => loop.map(toDetectionPoint));
  return faceLoops.some((faceLoop) => faceLoop.some((start, index) => {
    const end = faceLoop[(index + 1) % faceLoop.length];
    return supportLoops.some((supportLoop) => supportLoop.some((supportStart, supportIndex) =>
      collinearOverlapLength(
        start,
        end,
        supportStart,
        supportLoop[(supportIndex + 1) % supportLoop.length],
        tolerance,
      ) > tolerance));
  }));
}

export function projectModel3dEdgesToSketch(model3d, plane, options = {}) {
  const tolerance = Math.max(Number(options.tolerance) || DEFAULT_TOLERANCE, 1e-12);
  const projected = new Map();
  const analyticCandidates = [];
  (model3d?.solids ?? [])
    .filter((record) => record?.visible !== false && record?.solid)
    .forEach((record) => {
      const sourceSolid = record.solid;
      const solid = solidWithDerivedSurfaceTopology(sourceSolid);
      analyticCandidates.push(...exactCurveCandidates(
        sourceSolid,
        plane,
        'projection',
        record.id ?? null,
        record.placement,
        tolerance,
      ));
      sampleSolidAnalyticEdges(solid).entries.forEach((entry) => {
        const localStart = entry.segment?.start;
        const localEnd = entry.segment?.end;
        if (!localStart || !localEnd) return;
        const worldStart = solidLocalToWorld(localStart, record.placement);
        const worldEnd = solidLocalToWorld(localEnd, record.placement);
        const sketchStart = pointFromSketchPlane(worldStart, plane);
        const sketchEnd = pointFromSketchPlane(worldEnd, plane);
        const start = pointForSketchEditor(sketchStart);
        const end = pointForSketchEditor(sketchEnd);
        if (Math.hypot(end.x - start.x, end.y - start.y) <= tolerance) return;
        const key = segmentKey(start, end, tolerance);
        if (!projected.has(key)) {
          projected.set(key, {
            type: 'line',
            start,
            end,
            sourceSolidId: record.id ?? null,
          });
        }
      });
    });
  return replaceAnalyticCurves([...projected.values()], analyticCandidates, tolerance);
}

function interpolatePoint(first, second, factor) {
  return {
    x: first.x + (second.x - first.x) * factor,
    y: first.y + (second.y - first.y) * factor,
    z: first.z + (second.z - first.z) * factor,
  };
}

function farthestPointPair(points) {
  let result = null;
  let bestDistance = 0;
  for (let first = 0; first < points.length - 1; first += 1) {
    for (let second = first + 1; second < points.length; second += 1) {
      const value = Math.hypot(
        points[second].x - points[first].x,
        points[second].y - points[first].y,
        points[second].z - points[first].z,
      );
      if (value > bestDistance) {
        bestDistance = value;
        result = [points[first], points[second]];
      }
    }
  }
  return result;
}

export function sectionModel3dToSketch(model3d, plane, options = {}) {
  const tolerance = Math.max(Number(options.tolerance) || DEFAULT_TOLERANCE, 1e-12);
  const sections = new Map();
  const analyticCandidates = [];
  const addSegment = (worldStart, worldEnd, sourceSolidId) => {
    const start = pointForSketchEditor(pointFromSketchPlane(worldStart, plane));
    const end = pointForSketchEditor(pointFromSketchPlane(worldEnd, plane));
    if (Math.hypot(end.x - start.x, end.y - start.y) <= tolerance) return;
    const key = segmentKey(start, end, tolerance);
    if (!sections.has(key)) sections.set(key, { type: 'line', start, end, sourceSolidId });
  };
  (model3d?.solids ?? [])
    .filter((record) => record?.visible !== false && record?.solid)
    .forEach((record) => {
      const sourceSolid = record.solid;
      const solid = solidWithDerivedSurfaceTopology(sourceSolid);
      analyticCandidates.push(...exactCurveCandidates(
        sourceSolid,
        plane,
        'section',
        record.id ?? null,
        record.placement,
        tolerance,
      ));
      const signedDistance = (point) => pointFromSketchPlane(point, plane).z;
      (solid.edges ?? []).forEach((edge) => {
        const localStart = solid.vertices?.[edge?.[0]];
        const localEnd = solid.vertices?.[edge?.[1]];
        if (!localStart || !localEnd) return;
        const start = solidLocalToWorld(localStart, record.placement);
        const end = solidLocalToWorld(localEnd, record.placement);
        if (Math.abs(signedDistance(start)) > tolerance ||
            Math.abs(signedDistance(end)) > tolerance) return;
        addSegment(start, end, record.id ?? null);
      });
      (solid.faces ?? []).forEach((face) => {
        const points = face
          .map((index) => solid.vertices?.[index])
          .filter(Boolean)
          .map((point) => solidLocalToWorld(point, record.placement));
        if (points.length < 3) return;
        const distances = points.map(signedDistance);
        if (distances.every((value) => Math.abs(value) <= tolerance)) return;
        const intersections = [];
        const seen = new Set();
        const addPoint = (point) => {
          const local = pointFromSketchPlane(point, plane);
          const key = pointKey(local, tolerance);
          if (!seen.has(key)) {
            seen.add(key);
            intersections.push(point);
          }
        };
        points.forEach((start, index) => {
          const end = points[(index + 1) % points.length];
          const startDistance = distances[index];
          const endDistance = distances[(index + 1) % points.length];
          if (Math.abs(startDistance) <= tolerance) addPoint(start);
          if ((startDistance < -tolerance && endDistance > tolerance) ||
              (startDistance > tolerance && endDistance < -tolerance)) {
            addPoint(interpolatePoint(start, end, startDistance / (startDistance - endDistance)));
          }
        });
        const pair = farthestPointPair(intersections);
        if (pair) addSegment(pair[0], pair[1], record.id ?? null);
      });
    });
  return replaceAnalyticCurves([...sections.values()], analyticCandidates, tolerance);
}

function derivedSupportBoundaries(support, plane, model3d = null) {
  if (Array.isArray(support?.boundaries) && support.boundaries.length) {
    return support.boundaries.map((boundary) => ({ ...boundary }));
  }
  const sourceSolidId = support?.sourceSolidId ?? null;
  const loops = [support?.outerLoop, ...(support?.innerLoops ?? [])]
    .filter((loop) => Array.isArray(loop) && loop.length >= 3);
  const segments = loops.flatMap((loop) => loop.map((start, index) => ({
    type: 'line',
    start: { ...start },
    end: { ...loop[(index + 1) % loop.length] },
    sourceSolidId,
  })));
  if (!model3d || !sourceSolidId || !segments.length) return segments;
  const record = model3d.solids?.find((candidate) => candidate.id === sourceSolidId);
  if (!record?.solid) return segments;
  const candidates = exactCurveCandidates(
    record.solid,
    plane,
    'projection',
    sourceSolidId,
    record.placement,
    1e-6,
  );
  return replaceAnalyticCurves(segments, candidates, 1e-6);
}

export function snapshotSketchSupportFace(face, plane, model3d = null) {
  if (!Array.isArray(face?.points) || face.points.length < 3) return null;
  const toLocal = (point) => {
    const local = pointFromSketchPlane(point, plane);
    return pointForSketchEditor(local);
  };
  const sourceSolidId = face.sourceSolidDocumentId ?? null;
  const outerLoop = face.points.map(toLocal);
  const innerLoops = (face.holes ?? []).map((loop) => loop.map(toLocal));
  const support = {
    sourceSolidId,
    sourceFaceIndices: face.sourceSolidFaceIndices ??
      [face.sourceSolidFaceIndex].filter(Number.isInteger),
    outerLoop,
    innerLoops,
  };
  const boundaries = derivedSupportBoundaries(support, plane, model3d);
  if (boundaries.some((item) => item.type !== 'line')) {
    support.boundaries = boundaries;
  }
  return support;
}

export function rotateSketchSupportFaceAxes(supportFace, quarterTurns = 1) {
  if (!supportFace || typeof supportFace !== 'object') return supportFace ?? null;
  const turns = ((Math.trunc(quarterTurns) % 4) + 4) % 4;
  const rotatePoint = (point) => {
    let next = { x: Number(point?.x) || 0, y: Number(point?.y) || 0, z: 0 };
    for (let index = 0; index < turns; index += 1) {
      next = { x: -next.y, y: next.x, z: 0 };
    }
    return next;
  };
  const rotated = {
    ...JSON.parse(JSON.stringify(supportFace)),
    outerLoop: (supportFace.outerLoop ?? []).map(rotatePoint),
    innerLoops: (supportFace.innerLoops ?? []).map((loop) => loop.map(rotatePoint)),
  };
  if (supportFace.boundaries) {
    rotated.boundaries = supportFace.boundaries.map((boundary) => {
      const rotatedBoundary = { ...boundary };
      if (boundary.start) rotatedBoundary.start = rotatePoint(boundary.start);
      if (boundary.end) rotatedBoundary.end = rotatePoint(boundary.end);
      if (boundary.center) rotatedBoundary.center = rotatePoint(boundary.center);
      if (boundary.type === 'arc') {
        rotatedBoundary.startAngle = normalizeAngle(
          Number(boundary.startAngle) + turns * Math.PI / 2,
        );
        rotatedBoundary.endAngle = normalizeAngle(
          Number(boundary.endAngle) + turns * Math.PI / 2,
        );
      }
      if ((boundary.type === 'ellipse' || boundary.type === 'ellipse-arc') &&
          typeof boundary.rotation === 'number') {
        rotatedBoundary.rotation = normalizeAngle(boundary.rotation + turns * Math.PI / 2);
      }
      return rotatedBoundary;
    });
  }
  return rotated;
}

export function sketchSupportBoundaryEntities(sketch, model3d = null) {
  const support = sketch?.metadata?.supportFace;
  const boundaries = derivedSupportBoundaries(support, sketch?.plane, model3d);
  if (boundaries.length) {
    return boundaries.map((item, index) => ({
      ...item,
      type: item.type.toUpperCase().replace('-', '_'),
      id: item.id ?? `${sketch.id}-support-${index}`,
      isSketchSupport: true,
    }));
  }
  return [];
}

export function sketchEditReferences(model3d, plane, options = {}) {
  if (options.mode === 'section') {
    const supportFace = options.sketch?.metadata?.supportFace;
    const support = derivedSupportBoundaries(supportFace, plane, model3d);
    if (support.length) {
      return support.map((reference, index) => ({
        ...reference,
        type: String(reference.type || 'line').toLowerCase().replace('_', '-'),
        id: reference.id ?? `${options.sketch?.id ?? 'sketch'}-support-${index}`,
        isSketchSupport: true,
        sourceSolidId: supportFace?.sourceSolidId ?? null,
      }));
    }
    return sectionModel3dToSketch(model3d, plane, options);
  }
  return projectModel3dEdgesToSketch(model3d, plane, options);
}

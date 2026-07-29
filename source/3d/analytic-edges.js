/* webCAD - Aristas analiticas derivadas de solidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  exactProfileToSketchPlaneV1,
  pointFromExactProfilePlane,
  pointOnExactProfilePlane,
} from './sketch-plane.js';
import {
  booleanWeldTolerance,
  coplanarFaceTolerance,
} from './tolerances.js';

const TWO_PI = Math.PI * 2;
const DEFAULT_MAX_SEGMENT_ANGLE = Math.PI / 48;
const MAX_ENDPOINT_SNAP_ANGLE = Math.PI / 24;
const MIN_ANALYTIC_FACE_NORMAL_ALIGNMENT = 0.5;

function number(value, fallback = 0) {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}

function point3(point) {
  return {
    x: number(point?.x),
    y: number(point?.y),
    z: number(point?.z),
  };
}

function add(first, second) {
  return {
    x: first.x + second.x,
    y: first.y + second.y,
    z: first.z + second.z,
  };
}

function subtract(first, second) {
  return {
    x: first.x - second.x,
    y: first.y - second.y,
    z: first.z - second.z,
  };
}

function scale(vector, factor) {
  return {
    x: vector.x * factor,
    y: vector.y * factor,
    z: vector.z * factor,
  };
}

function dot(first, second) {
  return first.x * second.x + first.y * second.y + first.z * second.z;
}

function cross(first, second) {
  return {
    x: first.y * second.z - first.z * second.y,
    y: first.z * second.x - first.x * second.z,
    z: first.x * second.y - first.y * second.x,
  };
}

function length(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalized(vector, fallback) {
  const magnitude = length(vector);
  return magnitude > 1e-12 ? scale(vector, 1 / magnitude) : { ...fallback };
}

function normalizeAngle(angle) {
  const result = number(angle) % TWO_PI;
  return result < 0 ? result + TWO_PI : result;
}

function directedSweep(startAngle, endAngle, clockwise = true) {
  return clockwise
    ? normalizeAngle(endAngle - startAngle)
    : normalizeAngle(startAngle - endAngle);
}

function edgeKey(first, second) {
  return first < second ? `${first}:${second}` : `${second}:${first}`;
}

function exactExtrusionProfiles(metadata) {
  const entries = [];
  const exactGeometry = metadata?.exactGeometry;
  const base = exactGeometry?.base ?? (exactGeometry?.extrusion ? exactGeometry : null);
  const extrusion = base?.extrusion;
  const baseProfile = extrusion?.profile ?? base?.profile;
  if (baseProfile && extrusion) {
    const distance = number(extrusion.distance);
    entries.push({
      featureIndex: null,
      operationType: 'base',
      profileIndex: entries.length,
      profile: baseProfile,
      regionId: null,
      offset: extrusion.offset ?? scale(
        point3(extrusion.direction ?? baseProfile.plane?.normal),
        distance,
      ),
    });
  }
  (metadata?.profileFeatures ?? []).forEach((feature, featureIndex) => {
    const profile = feature?.exactProfile;
    const distance = Number(feature?.distance);
    if (!profile || !Number.isFinite(distance)) return;
    entries.push({
      featureIndex,
      operationType: feature?.type ?? null,
      profileIndex: entries.length,
      profile,
      regionId: feature?.analyticRegionId ?? null,
      offset: scale(point3(profile.plane?.normal), distance),
    });
  });
  return entries;
}

function planeAxes(plane) {
  const xAxis = normalized(point3(plane?.xAxis), { x: 1, y: 0, z: 0 });
  const storedYAxis = point3(plane?.yAxis);
  const yAxis = length(storedYAxis) > 1e-12
    ? normalized(storedYAxis, { x: 0, y: 1, z: 0 })
    : normalized({
      x: number(plane?.normal?.y) * xAxis.z - number(plane?.normal?.z) * xAxis.y,
      y: number(plane?.normal?.z) * xAxis.x - number(plane?.normal?.x) * xAxis.z,
      z: number(plane?.normal?.x) * xAxis.y - number(plane?.normal?.y) * xAxis.x,
    }, { x: 0, y: 1, z: 0 });
  return { xAxis, yAxis };
}

function worldPoint(local, plane, offset = { x: 0, y: 0, z: 0 }) {
  return add(pointOnExactProfilePlane(local, plane), point3(offset));
}

function curveCandidate(segment, plane, offset, id) {
  const circular = segment?.type === 'circle' || segment?.type === 'arc-circle';
  const elliptic = segment?.type === 'ellipse' || segment?.type === 'arc-ellipse';
  if (!circular && !elliptic) return null;
  const radiusX = number(circular ? segment.radius : segment.radiusX);
  const radiusY = number(circular ? segment.radius : segment.radiusY);
  if (!(radiusX > 0) || !(radiusY > 0)) return null;
  const { xAxis, yAxis } = planeAxes(plane);
  const rotation = number(segment.rotation);
  const localOrigin = worldPoint({ x: 0, y: 0, z: 0 }, plane);
  const uAxis = normalized(subtract(
    worldPoint({
      x: Math.cos(rotation),
      y: Math.sin(rotation),
      z: 0,
    }, plane),
    localOrigin,
  ), xAxis);
  const vAxis = normalized(subtract(
    worldPoint({
      x: -Math.sin(rotation),
      y: Math.cos(rotation),
      z: 0,
    }, plane),
    localOrigin,
  ), yAxis);
  const partial = segment.type === 'arc-circle' || segment.type === 'arc-ellipse';
  const startAngle = partial ? normalizeAngle(segment.startAngle) : 0;
  const endAngle = partial ? normalizeAngle(segment.endAngle) : 0;
  const clockwise = segment.clockwise !== false;
  return {
    id,
    type: circular ? 'arc-circle' : 'arc-ellipse',
    center: worldPoint(segment.center, plane, offset),
    uAxis,
    vAxis,
    radiusX,
    radiusY,
    startAngle,
    endAngle,
    clockwise,
    closed: !partial,
    sweep: partial ? directedSweep(startAngle, endAngle, clockwise) : TWO_PI,
  };
}

function curveCandidates(metadata) {
  const candidates = [];
  exactExtrusionProfiles(metadata).forEach(({
    featureIndex,
    operationType,
    profile,
    profileIndex,
    regionId,
    offset,
  }) => {
    [point3(null), point3(offset)].forEach((capOffset, capIndex) => {
      [profile?.outerLoop, ...(profile?.innerLoops ?? [])].forEach((loop, loopIndex) => {
        (loop?.segments ?? []).forEach((segment, segmentIndex) => {
          const candidate = curveCandidate(
            segment,
            profile.plane,
            capOffset,
            `analytic-${profileIndex}-${capIndex}-${loopIndex}-${segmentIndex}`,
          );
          if (candidate) {
            const analyticSource = segment.source?.role
              ? JSON.parse(JSON.stringify(segment.source))
              : {
                role: 'profile-boundary',
                featureIndex,
                regionId,
                profileIndex,
                loopIndex,
                segmentIndex,
                orientation: 1,
                sourceBoundaryId:
                  `${regionId ?? `profile-${profileIndex}`}:${loopIndex}:${segmentIndex}`,
              };
            candidates.push({
              ...candidate,
              ownerRegionId: regionId,
              capIndex,
              operationType,
              profileIndex,
              analyticSource,
              sideSurfaceId: `analytic-side-${profileIndex}-${loopIndex}-${segmentIndex}`,
            });
          }
        });
      });
    });
  });
  return candidates;
}

function straightLineCandidates(metadata) {
  const candidates = [];
  exactExtrusionProfiles(metadata).forEach(({
    featureIndex,
    profile,
    profileIndex,
    regionId,
    offset,
  }) => {
    [profile?.outerLoop, ...(profile?.innerLoops ?? [])].forEach((loop, loopIndex) => {
      (loop?.segments ?? []).forEach((segment, segmentIndex) => {
        const analyticSource = segment.source?.role
          ? JSON.parse(JSON.stringify(segment.source))
          : {
            role: 'profile-boundary',
            featureIndex,
            regionId,
            profileIndex,
            loopIndex,
            segmentIndex,
            orientation: 1,
            sourceBoundaryId:
              `${regionId ?? `profile-${profileIndex}`}:${loopIndex}:${segmentIndex}`,
          };
        if (segment?.type === 'line' && segment.start && segment.end) {
          [point3(null), point3(offset)].forEach((capOffset, capIndex) => {
            candidates.push({
              start: worldPoint(segment.start, profile.plane, capOffset),
              end: worldPoint(segment.end, profile.plane, capOffset),
              analyticSource: { ...analyticSource, capIndex },
              ownerRegionId: regionId,
            });
          });
        }
        if (!segment?.start) return;
        candidates.push({
          start: worldPoint(segment.start, profile.plane),
          end: worldPoint(segment.start, profile.plane, point3(offset)),
          analyticSource: { ...analyticSource, role: 'profile-side-boundary' },
          ownerRegionId: regionId,
        });
      });
    });
  });
  return candidates;
}

export function deriveSolidAnalyticSideSurfaces(solid) {
  const surfaces = [];
  exactExtrusionProfiles(solid?.metadata).forEach(({
    featureIndex,
    operationType,
    profile,
    profileIndex,
    regionId,
    offset,
  }) => {
    [profile?.outerLoop, ...(profile?.innerLoops ?? [])].forEach((loop, loopIndex) => {
      (loop?.segments ?? []).forEach((segment, segmentIndex) => {
        const curve = curveCandidate(
          segment,
          profile.plane,
          point3(null),
          `analytic-side-${profileIndex}-${loopIndex}-${segmentIndex}`,
        );
        if (!curve || length(point3(offset)) <= 1e-9) return;
        surfaces.push({
          ...curve,
          featureIndex,
          operationType,
          regionId,
          offset: point3(offset),
        });
      });
    });
  });
  return surfaces;
}

function solidScale(solid) {
  if (!Array.isArray(solid?.vertices) || !solid.vertices.length) return 1;
  const axes = ['x', 'y', 'z'];
  return axes.reduce((largest, axis) => {
    const values = solid.vertices.map((point) => number(point?.[axis]));
    return Math.max(largest, Math.max(...values) - Math.min(...values));
  }, 1);
}

export function analyticSurfaceTolerance(solid, surface, requested) {
  const explicit = Number(requested);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  const radius = Math.max(
    number(surface?.radiusX),
    number(surface?.radiusY),
  );
  return Math.max(1e-5, solidScale(solid) * 2e-4, radius * 3e-3);
}

export function analyticSideSurfaceLocation(point, surface) {
  const axis = normalized(point3(surface?.offset), { x: 0, y: 0, z: 1 });
  const relative = subtract(point3(point), point3(surface?.center));
  const axial = dot(relative, axis);
  const radialVector = subtract(relative, scale(axis, axial));
  const x = dot(radialVector, point3(surface?.uAxis));
  const y = dot(radialVector, point3(surface?.vAxis));
  const normalizedX = x / number(surface?.radiusX, 1);
  const normalizedY = y / number(surface?.radiusY, 1);
  const radialLength = Math.hypot(normalizedX, normalizedY);
  const reconstructed = add(
    scale(point3(surface?.uAxis), x),
    scale(point3(surface?.vAxis), y),
  );
  return {
    angle: normalizeAngle(Math.atan2(normalizedY, normalizedX)),
    axial,
    planeError: length(subtract(radialVector, reconstructed)),
    radialError: Math.abs(radialLength - 1) * Math.max(
      number(surface?.radiusX),
      number(surface?.radiusY),
    ),
    x,
    y,
  };
}

export function analyticSideSurfaceNormalAtPoint(point, surface) {
  const location = analyticSideSurfaceLocation(point, surface);
  const radiusX = number(surface?.radiusX);
  const radiusY = number(surface?.radiusY);
  if (!(radiusX > 0) || !(radiusY > 0)) return null;
  const normal = add(
    scale(point3(surface?.uAxis), location.x / (radiusX * radiusX)),
    scale(point3(surface?.vAxis), location.y / (radiusY * radiusY)),
  );
  return normalized(normal, { x: 1, y: 0, z: 0 });
}

export function pointOnAnalyticSideSurface(solid, point, surface, options = {}) {
  const extrusionLength = length(point3(surface?.offset));
  if (extrusionLength <= 1e-9) return false;
  const tolerance = analyticSurfaceTolerance(solid, surface, options.tolerance);
  const location = analyticSideSurfaceLocation(point, surface);
  if (location.axial < -tolerance || location.axial > extrusionLength + tolerance ||
      location.planeError > tolerance || location.radialError > tolerance) {
    return false;
  }
  return surface.closed || curveParameter(location.angle, surface) !== null;
}

function locationOnUnderlyingAnalyticSurface(solid, point, surface, tolerance) {
  if (length(point3(surface?.offset)) <= 1e-9) return null;
  const location = analyticSideSurfaceLocation(point, surface);
  return location.planeError <= tolerance &&
    location.radialError <= tolerance
    ? location
    : null;
}

function angleDistance(first, second) {
  return Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)));
}

function edgeFollowsAnalyticSideSurface(solid, edge, surface, tolerance) {
  const start = solid.vertices[edge[0]];
  const end = solid.vertices[edge[1]];
  if (!start || !end) return null;
  const midpoint = scale(add(point3(start), point3(end)), 0.5);
  const locations = [start, midpoint, end].map((point) =>
    locationOnUnderlyingAnalyticSurface(solid, point, surface, tolerance));
  return locations.every(Boolean) ? locations : null;
}

function edgeIsExactPartialSurfaceBoundary(locations, surface, angularTolerance) {
  if (surface.closed) return false;
  const endpoints = [locations[0], locations[2]];
  return [surface.startAngle, surface.endAngle].some((boundary) =>
    endpoints.every((location) =>
      angleDistance(location.angle, boundary) <= angularTolerance));
}

function isNonSemanticAnalyticSurfaceSeam(solid, edge, surfaces, options = {}) {
  const matches = surfaces.flatMap((surface) => {
    const tolerance = analyticSurfaceTolerance(
      solid,
      surface,
      options.surfaceTolerance,
    );
    const locations = edgeFollowsAnalyticSideSurface(
      solid,
      edge,
      surface,
      tolerance,
    );
    return locations ? [{ locations, surface, tolerance }] : [];
  });
  if (!matches.length) return false;
  const exactBoundary = matches.some(({ locations, surface, tolerance }) =>
    edgeIsExactPartialSurfaceBoundary(
      locations,
      surface,
      Math.max(
        1e-4,
        tolerance / Math.max(surface.radiusX, surface.radiusY),
      ),
    ));
  return !exactBoundary;
}

function sampledLoop(loop, plane, offset) {
  const points = [];
  const segments = loop?.segments ?? [];
  segments.forEach((segment, segmentIndex) => {
    const curve = curveCandidate(
      segment,
      plane,
      offset,
      `sampled-loop-${segmentIndex}`,
    );
    if (!curve) {
      if (segment?.start) points.push(worldPoint(segment.start, plane, offset));
      return;
    }
    const sweep = curve.closed ? TWO_PI : curve.sweep;
    const count = Math.max(8, Math.ceil(sweep / (Math.PI / 32)));
    const direction = curve.clockwise ? 1 : -1;
    for (let index = 0; index < count; index += 1) {
      const angle = curve.startAngle + direction * sweep * index / count;
      points.push(add(curve.center, add(
        scale(curve.uAxis, Math.cos(angle) * curve.radiusX),
        scale(curve.vAxis, Math.sin(angle) * curve.radiusY),
      )));
    }
  });
  return points;
}

function sampledLoopWithVertexKinds(loop, plane, offset) {
  const points = [];
  const cad = [];
  const smooth = [];
  const segments = loop?.segments ?? [];
  segments.forEach((segment, segmentIndex) => {
    const curve = curveCandidate(
      segment,
      plane,
      offset,
      `sampled-loop-kinds-${segmentIndex}`,
    );
    if (!curve) {
      if (segment?.start) {
        cad.push(points.length);
        points.push(worldPoint(segment.start, plane, offset));
      }
      return;
    }
    const sweep = curve.closed ? TWO_PI : curve.sweep;
    const count = Math.max(8, Math.ceil(sweep / (Math.PI / 32)));
    const direction = curve.clockwise ? 1 : -1;
    for (let index = 0; index < count; index += 1) {
      (curve.closed || index > 0 ? smooth : cad).push(points.length);
      const angle = curve.startAngle + direction * sweep * index / count;
      points.push(add(curve.center, add(
        scale(curve.uAxis, Math.cos(angle) * curve.radiusX),
        scale(curve.vAxis, Math.sin(angle) * curve.radiusY),
      )));
    }
  });
  return { points, cad, smooth };
}

function localPointOnProfilePlane(point, plane, offset) {
  return pointFromExactProfilePlane(
    subtract(point3(point), point3(offset)),
    plane,
  );
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1;
    current < polygon.length;
    previous = current, current += 1) {
    const first = polygon[current];
    const second = polygon[previous];
    const crosses = (first.y > point.y) !== (second.y > point.y) &&
      point.x < (second.x - first.x) * (point.y - first.y) /
        ((second.y - first.y) || 1e-12) + first.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function exactProfileAtOffset(profile, offset) {
  const shifted = JSON.parse(JSON.stringify(profile));
  const { xAxis, yAxis } = planeAxes(shifted.plane);
  shifted.plane = {
    ...shifted.plane,
    origin: add(point3(shifted.plane?.origin), point3(offset)),
    xAxis,
    yAxis,
    normal: normalized(
      point3(shifted.plane?.normal),
      cross(xAxis, yAxis),
    ),
  };
  return shifted;
}

function exactProfileWithSegmentSources(metadata, entry, tolerance) {
  const profile = JSON.parse(JSON.stringify(entry.profile));
  const previousCurves = curveCandidates(metadata)
    .filter((candidate) => candidate.profileIndex < entry.profileIndex);
  const previousLines = straightLineCandidates(metadata)
    .filter((candidate) =>
      candidate.analyticSource?.profileIndex < entry.profileIndex);
  const matches = [profile.outerLoop, ...(profile.innerLoops ?? [])].map((loop, loopIndex) =>
    (loop.segments ?? []).map((segment, segmentIndex) => {
      if (segment.source?.role) return segment.source;
      const curve = curveCandidate(
        segment,
        profile.plane,
        point3(null),
        `semantic-source-${entry.profileIndex}-${loopIndex}-${segmentIndex}`,
      );
      if (curve) {
        const inherited = previousCurves.find((candidate) =>
          curveContainsCurve(candidate, curve, tolerance));
        return inherited
          ? {
            ...inherited.analyticSource,
            orientation: (inherited.analyticSource?.orientation ?? 1) *
              (inherited.clockwise === curve.clockwise ? 1 : -1),
          }
          : null;
      }
      if (segment?.type !== 'line' || !segment.start || !segment.end) return null;
      const start = worldPoint(segment.start, profile.plane);
      const end = worldPoint(segment.end, profile.plane);
      const midpoint = scale(add(start, end), 0.5);
      const inherited = previousLines.find((candidate) =>
        pointOnLineCandidate(start, candidate, tolerance) &&
        pointOnLineCandidate(midpoint, candidate, tolerance) &&
        pointOnLineCandidate(end, candidate, tolerance));
      if (!inherited) return null;
      const inheritedDirection = normalized(
        subtract(inherited.end, inherited.start),
        { x: 1, y: 0, z: 0 },
      );
      const segmentDirection = normalized(
        subtract(end, start),
        { x: 1, y: 0, z: 0 },
      );
      return {
        ...inherited.analyticSource,
        orientation: (inherited.analyticSource?.orientation ?? 1) *
          (dot(inheritedDirection, segmentDirection) >= 0 ? 1 : -1),
      };
    }));
  const hasInheritedBoundary = matches.flat().some(Boolean);
  [profile.outerLoop, ...(profile.innerLoops ?? [])].forEach((loop, loopIndex) => {
    (loop.segments ?? []).forEach((segment, segmentIndex) => {
      segment.source = JSON.parse(JSON.stringify(
        matches[loopIndex][segmentIndex] ?? {
          role: hasInheritedBoundary ? 'divider' : 'profile-boundary',
          regionId: entry.regionId,
          orientation: 1,
          ...(hasInheritedBoundary ? {
            dividerId:
              `${entry.regionId ?? `profile-${entry.profileIndex}`}:divider:${loopIndex}:${segmentIndex}`,
          } : {
            sourceBoundaryId:
              `${entry.regionId ?? `profile-${entry.profileIndex}`}:${loopIndex}:${segmentIndex}`,
          }),
        },
      ));
    });
  });
  profile.segments = profile.outerLoop.segments;
  profile.analyticRegionId = entry.regionId ?? null;
  return profile;
}

export function exactProfileWithAnalyticSources(solid, profile, regionId = null) {
  if (!profile?.plane) return profile ? JSON.parse(JSON.stringify(profile)) : null;
  const normalizedProfile = exactProfileToSketchPlaneV1(profile);
  const entries = exactExtrusionProfiles(solid?.metadata);
  return exactProfileWithSegmentSources(solid?.metadata, {
    featureIndex: Array.isArray(solid?.metadata?.profileFeatures)
      ? solid.metadata.profileFeatures.length
      : null,
    operationType: null,
    profile: normalizedProfile,
    profileIndex: entries.length,
    regionId,
    offset: point3(null),
  }, Math.max(booleanWeldTolerance(solid), solidScale(solid) * 5e-6));
}

function rawSemanticCapFaces(solid, requestedNormals, tolerance) {
  return exactExtrusionProfiles(solid?.metadata).flatMap((entry) => {
    const {
    featureIndex,
    operationType,
    profile,
    regionId,
    offset,
    profileIndex,
    } = entry;
    const offsetVector = point3(offset);
    const extrusionLength = length(offsetVector);
    if (extrusionLength <= 1e-9) return [];
    const semanticProfile = exactProfileWithSegmentSources(
      solid?.metadata,
      entry,
      tolerance,
    );
    const axis = normalized(offsetVector, point3(profile?.plane?.normal));
    const localLoops = [
      semanticProfile?.outerLoop,
      ...(semanticProfile?.innerLoops ?? []),
    ].map((loop) => sampledLoop(loop, semanticProfile.plane, point3(null))
      .map((point) =>
        localPointOnProfilePlane(point, semanticProfile.plane, point3(null))));
    if (localLoops[0]?.length < 3) return [];
    return [point3(null), offsetVector].flatMap((capOffset, capIndex) => {
      const capOrigin = add(point3(semanticProfile.plane?.origin), capOffset);
      const faceIndices = solid.faces.flatMap((face, faceIndex) => {
        const normal = normalized(
          point3(requestedNormals[faceIndex] ?? faceNormalFromVertices(face, solid.vertices)),
          { x: 0, y: 0, z: 1 },
        );
        if (Math.abs(dot(normal, axis)) < 1 - 1e-4) return [];
        const points = face.map((vertexIndex) => point3(solid.vertices[vertexIndex]));
        if (points.some((point) =>
          Math.abs(dot(subtract(point, capOrigin), axis)) > tolerance)) return [];
        const centroid = scale(points.reduce((sum, point) => add(sum, point), point3(null)),
          1 / points.length);
        const local = localPointOnProfilePlane(
          centroid,
          semanticProfile.plane,
          capOffset,
        );
        if (!pointInPolygon(local, localLoops[0]) ||
            localLoops.slice(1).some((loop) => pointInPolygon(local, loop))) return [];
        return [faceIndex];
      });
      if (!faceIndices.length) return [];
      const loops = [
        semanticProfile.outerLoop,
        ...(semanticProfile.innerLoops ?? []),
      ].map((loop) =>
        sampledLoopWithVertexKinds(loop, semanticProfile.plane, capOffset));
      return [{
        id: `analytic-cap-${profileIndex}-${capIndex}`,
        indices: faceIndices,
        kind: 'analytic-cap',
        normal: capIndex === 0 ? scale(axis, -1) : axis,
        outerLoop: loops[0].points,
        innerLoops: loops.slice(1).map((loop) => loop.points),
        cadProfileVertexIndices: loops[0].cad,
        smoothProfileVertexIndices: loops[0].smooth,
        holeCadProfileVertexIndices: loops.slice(1).map((loop) => loop.cad),
        holeSmoothProfileVertexIndices: loops.slice(1).map((loop) => loop.smooth),
        exactProfile: exactProfileAtOffset(semanticProfile, capOffset),
        analyticAxis: normalized(
          point3(semanticProfile.plane?.normal),
          axis,
        ),
        featureIndex,
        operationType,
        profileIndex,
        regionId,
        capIndex,
      }];
    });
  });
}

function connectedFaceComponents(solid, faceIndices) {
  const selected = new Set(faceIndices);
  const edgeFaces = new Map();
  faceIndices.forEach((faceIndex) => {
    const face = solid.faces[faceIndex];
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = edgeKey(start, end);
      if (!edgeFaces.has(key)) edgeFaces.set(key, []);
      edgeFaces.get(key).push(faceIndex);
    });
  });
  const neighbors = new Map(faceIndices.map((faceIndex) => [faceIndex, []]));
  edgeFaces.forEach((indices) => {
    if (indices.length !== 2) return;
    const [first, second] = indices;
    if (!selected.has(first) || !selected.has(second)) return;
    neighbors.get(first).push(second);
    neighbors.get(second).push(first);
  });
  const visited = new Set();
  return faceIndices.flatMap((faceIndex) => {
    if (visited.has(faceIndex)) return [];
    const component = [];
    const pending = [faceIndex];
    visited.add(faceIndex);
    while (pending.length) {
      const current = pending.pop();
      component.push(current);
      neighbors.get(current).forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      });
    }
    return [component];
  });
}

function componentBoundaryLoops(solid, component) {
  const boundary = new Map();
  component.forEach((faceIndex) => {
    const face = solid.faces[faceIndex];
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = edgeKey(start, end);
      if (!boundary.has(key)) boundary.set(key, []);
      boundary.get(key).push([start, end]);
    });
  });
  const outgoing = new Map();
  boundary.forEach((directed) => {
    if (directed.length !== 1) return;
    const [start, end] = directed[0];
    if (!outgoing.has(start)) outgoing.set(start, []);
    outgoing.get(start).push(end);
  });
  const unused = new Set([...outgoing.entries()].flatMap(([start, ends]) =>
    ends.map((end) => `${start}:${end}`)));
  const loops = [];
  while (unused.size) {
    const first = unused.values().next().value;
    const [start, next] = first.split(':').map(Number);
    const loop = [start];
    let current = start;
    let following = next;
    for (let guard = 0; guard <= solid.vertices.length + unused.size; guard += 1) {
      if (!unused.delete(`${current}:${following}`)) break;
      current = following;
      if (current === start) break;
      loop.push(current);
      const candidates = (outgoing.get(current) ?? []).filter((candidate) =>
        unused.has(`${current}:${candidate}`));
      if (candidates.length !== 1) break;
      [following] = candidates;
    }
    if (loop.length >= 3 && current === start) {
      loops.push(loop.map((vertexIndex) => point3(solid.vertices[vertexIndex])));
    }
  }
  return loops;
}

function semanticCapFaces(solid, requestedNormals, tolerance) {
  const caps = rawSemanticCapFaces(solid, requestedNormals, tolerance);
  const profileEntries = exactExtrusionProfiles(solid?.metadata);
  return caps.flatMap((cap) => {
    const laterCaps = caps.filter((candidate) =>
      candidate.profileIndex > cap.profileIndex &&
      candidate.indices.some((faceIndex) => cap.indices.includes(faceIndex)));
    const capPlane = cap.exactProfile?.plane;
    const capNormal = normalized(point3(capPlane?.normal), cap.analyticAxis);
    const semanticSubdivisions = cap.regionId
      ? profileEntries.filter((entry) => {
        if (entry.profileIndex <= cap.profileIndex) return false;
        const entryPlane = entry.profile?.plane;
        const entryNormal = normalized(point3(entryPlane?.normal), capNormal);
        if (Math.abs(dot(entryNormal, capNormal)) < 1 - 1e-4 ||
            Math.abs(dot(
              subtract(point3(entryPlane?.origin), point3(capPlane?.origin)),
              capNormal,
            )) > tolerance) {
          return false;
        }
        const semanticProfile = exactProfileWithSegmentSources(
          solid?.metadata,
          entry,
          tolerance,
        );
        return [
          semanticProfile?.outerLoop,
          ...(semanticProfile?.innerLoops ?? []),
        ].some((loop) => (loop?.segments ?? []).some((segment) =>
          segment?.source?.role === 'profile-boundary' &&
          segment.source.regionId === cap.regionId &&
          segment.source.sourceBoundaryId));
      })
      : [];
    if (!laterCaps.length && !semanticSubdivisions.length) return [cap];
    const consumed = new Set(laterCaps.flatMap((candidate) => candidate.indices));
    const remaining = cap.indices.filter((faceIndex) => !consumed.has(faceIndex));
    if (!remaining.length) return [];
    const subdivisionRegionIds = [...laterCaps, ...semanticSubdivisions]
      .map((candidate) => candidate.regionId)
      .filter(Boolean);
    return connectedFaceComponents(solid, remaining).flatMap((indices, componentIndex) => {
      const loops = componentBoundaryLoops(solid, indices);
      if (!loops.length) return [];
      const ordered = loops.map((loop) => {
        const local = loop.map((point) =>
          localPointOnProfilePlane(point, cap.exactProfile.plane, point3(null)));
        const area = local.reduce((sum, point, index) => {
          const next = local[(index + 1) % local.length];
          return sum + point.x * next.y - next.x * point.y;
        }, 0) * 0.5;
        return { loop, area };
      }).sort((first, second) => Math.abs(second.area) - Math.abs(first.area));
      return [{
        id: `analytic-residual-parent-${cap.profileIndex}-${cap.capIndex}-${componentIndex}`,
        indices: [...indices].sort((first, second) => first - second),
        kind: 'analytic-residual-parent',
        normal: cap.normal,
        outerLoop: ordered[0].loop,
        innerLoops: ordered.slice(1).map((entry) => entry.loop),
        cadProfileVertexIndices: ordered[0].loop.map((_, index) => index),
        smoothProfileVertexIndices: [],
        holeCadProfileVertexIndices: ordered.slice(1)
          .map((entry) => entry.loop.map((_, index) => index)),
        holeSmoothProfileVertexIndices: ordered.slice(1).map(() => []),
        analyticAxis: cap.analyticAxis,
        profileIndex: cap.profileIndex,
        parentRegionId: cap.regionId,
        creatorFeatureIndex: cap.featureIndex,
        creatorOperationType: cap.operationType,
        capIndex: cap.capIndex,
        subdivisionRegionIds,
      }];
    });
  });
}

function faceNormalFromVertices(face, vertices) {
  if (!Array.isArray(face) || face.length < 3) return null;
  const origin = point3(vertices[face[0]]);
  for (let index = 1; index < face.length - 1; index += 1) {
    const first = subtract(point3(vertices[face[index]]), origin);
    const second = subtract(point3(vertices[face[index + 1]]), origin);
    const normal = {
      x: first.y * second.z - first.z * second.y,
      y: first.z * second.x - first.x * second.z,
      z: first.x * second.y - first.y * second.x,
    };
    if (length(normal) > 1e-12) return normalized(normal, { x: 0, y: 0, z: 1 });
  }
  return null;
}

function capCurveBoundaryMatches(solid, curve, tolerance) {
  const uses = new Map();
  solid.faces.forEach((face, faceIndex) => face.forEach((start, index) => {
    const end = face[(index + 1) % face.length];
    const key = edgeKey(start, end);
    if (!uses.has(key)) uses.set(key, { edge: [start, end], faces: [] });
    uses.get(key).faces.push(faceIndex);
  }));
  const capNormal = normalized(
    cross(point3(curve.uAxis), point3(curve.vAxis)),
    { x: 0, y: 0, z: 1 },
  );
  return [...uses.values()].flatMap(({ edge, faces }) => {
    if (faces.length !== 2) return [];
    const planarFaces = faces.filter((faceIndex) => {
      const normal = faceNormalFromVertices(solid.faces[faceIndex], solid.vertices);
      return normal && Math.abs(dot(normal, capNormal)) >= 0.99;
    });
    if (planarFaces.length !== 1) return [];
    const match = edgeCurveMatch(solid, edge, curve, tolerance);
    return match ? [match] : [];
  });
}

function internalCoplanarEdgeKeys(solid, tolerance) {
  const uses = new Map();
  solid.faces.forEach((face, faceIndex) => face.forEach((start, index) => {
    const end = face[(index + 1) % face.length];
    const key = edgeKey(start, end);
    if (!uses.has(key)) uses.set(key, { edge: [start, end], faces: [] });
    uses.get(key).faces.push(faceIndex);
  }));
  const normals = solid.faces.map((face) =>
    faceNormalFromVertices(face, solid.vertices));
  return new Set([...uses.entries()].flatMap(([key, { faces }]) => {
    if (faces.length !== 2) return [];
    const [firstIndex, secondIndex] = faces;
    const firstNormal = normals[firstIndex];
    const secondNormal = normals[secondIndex];
    if (!firstNormal || !secondNormal ||
        Math.abs(dot(firstNormal, secondNormal)) < 1 - 1e-4) return [];
    const firstPoint = point3(solid.vertices[solid.faces[firstIndex][0]]);
    const secondPoint = point3(solid.vertices[solid.faces[secondIndex][0]]);
    return Math.abs(dot(subtract(secondPoint, firstPoint), firstNormal)) <= tolerance
      ? [key]
      : [];
  }));
}

function faceTopologyEdgeKeys(solid) {
  return new Set(solid.faces.flatMap((face) => face.map((start, index) =>
    edgeKey(start, face[(index + 1) % face.length]))));
}

export function deriveSolidAnalyticTopology(solid, options = {}) {
  if (!Array.isArray(solid?.vertices) || !Array.isArray(solid?.faces)) {
    return {
      version: 1,
      sideSurfaces: [],
      faceSurfaceIds: [],
      semanticPlanarFaces: [],
      boundarySideEdges: [],
      transverseSideEdges: [],
      internalSideEdges: [],
      internalSideEdgeKeys: new Set(),
    };
  }
  const sideSurfaces = deriveSolidAnalyticSideSurfaces(solid);
  const requestedNormals = Array.isArray(options.faceNormals) ? options.faceNormals : [];
  const tolerance = Math.max(1e-5, solidScale(solid) * 2e-4);
  const faceSurfaceIds = solid.faces.map((face, faceIndex) => {
    const normal = normalized(
      point3(requestedNormals[faceIndex] ?? faceNormalFromVertices(face, solid.vertices)),
      { x: 0, y: 0, z: 1 },
    );
    const surface = sideSurfaces.find((candidate) => {
      const axis = normalized(point3(candidate.offset), { x: 0, y: 0, z: 1 });
      if (Math.abs(dot(normal, axis)) > 1e-4) return false;
      const surfaceTolerance = analyticSurfaceTolerance(
        solid,
        candidate,
        options.tolerance,
      );
      return face.every((vertexIndex) => {
        const point = solid.vertices[vertexIndex];
        const location = locationOnUnderlyingAnalyticSurface(
          solid,
          point,
          candidate,
          surfaceTolerance,
        );
        const analyticNormal = analyticSideSurfaceNormalAtPoint(point, candidate);
        return location &&
          (candidate.closed || curveParameter(location.angle, candidate) !== null) &&
          analyticNormal &&
          Math.abs(dot(normal, analyticNormal)) >= MIN_ANALYTIC_FACE_NORMAL_ALIGNMENT;
      });
    });
    return surface?.id ?? null;
  });
  const uses = new Map();
  solid.faces.forEach((face, faceIndex) => {
    face.forEach((start, index) => {
      const end = face[(index + 1) % face.length];
      const key = edgeKey(start, end);
      if (!uses.has(key)) uses.set(key, { edge: [start, end], faces: [] });
      uses.get(key).faces.push(faceIndex);
    });
  });
  const internalSideEdges = [...uses.entries()].flatMap(([key, use]) => {
    if (use.faces.length !== 2) return [];
    const [first, second] = use.faces;
    const surfaceId = faceSurfaceIds[first];
    return surfaceId && surfaceId === faceSurfaceIds[second]
      ? [{ edge: [...use.edge], key, surfaceId }]
      : [];
  });
  const surfaceById = new Map(sideSurfaces.map((surface) => [surface.id, surface]));
  const classifiedSideBoundaryEdges = [...uses.entries()].flatMap(([key, use]) => {
    const surfaceIds = [...new Set(use.faces
      .map((faceIndex) => faceSurfaceIds[faceIndex])
      .filter(Boolean))];
    return surfaceIds.flatMap((surfaceId) => {
      const surface = surfaceById.get(surfaceId);
      if (!surface || use.faces.every((faceIndex) => faceSurfaceIds[faceIndex] === surfaceId)) {
        return [];
      }
      const tolerance = analyticSurfaceTolerance(solid, surface, options.tolerance);
      const extrusionLength = length(point3(surface.offset));
      const locations = use.edge.map((vertexIndex) =>
        analyticSideSurfaceLocation(solid.vertices[vertexIndex], surface));
      const atStart = locations.every((location) => Math.abs(location.axial) <= tolerance);
      const atEnd = locations.every((location) =>
        Math.abs(location.axial - extrusionLength) <= tolerance);
      const transverse = Math.max(...locations.map((location) => location.axial)) -
        Math.min(...locations.map((location) => location.axial)) <= tolerance;
      if (!atStart && !atEnd && !transverse) return [];
      return [{
        axial: locations.reduce((sum, location) => sum + location.axial, 0) /
          locations.length,
        edge: [...use.edge],
        key,
        surfaceId,
        capIndex: atStart ? 0 : atEnd ? 1 : null,
        transverse,
      }];
    });
  });
  const boundarySideEdges = classifiedSideBoundaryEdges.filter((entry) =>
    entry.capIndex !== null);
  const transverseSideEdges = classifiedSideBoundaryEdges.filter((entry) =>
    entry.transverse);
  return {
    version: 1,
    sideSurfaces,
    faceSurfaceIds,
    semanticPlanarFaces: semanticCapFaces(solid, requestedNormals, tolerance),
    boundarySideEdges,
    transverseSideEdges,
    internalSideEdges,
    internalSideEdgeKeys: new Set(internalSideEdges.map((entry) => entry.key)),
  };
}

function solidTolerance(solid, requested) {
  const explicit = Number(requested);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  return Math.max(1e-4, solidScale(solid) * 5e-6);
}

function curveLocation(point, curve) {
  const relative = subtract(point3(point), curve.center);
  const x = dot(relative, curve.uAxis);
  const y = dot(relative, curve.vAxis);
  const normalizedX = x / curve.radiusX;
  const normalizedY = y / curve.radiusY;
  const planeDistance = length(subtract(
    relative,
    add(scale(curve.uAxis, x), scale(curve.vAxis, y)),
  ));
  return {
    angle: normalizeAngle(Math.atan2(normalizedY, normalizedX)),
    error: Math.max(
      planeDistance,
      Math.abs(Math.hypot(normalizedX, normalizedY) - 1) *
        Math.max(curve.radiusX, curve.radiusY),
    ),
  };
}

function curveParameter(angle, curve) {
  if (curve.closed) return normalizeAngle(angle) / TWO_PI;
  if (curve.sweep <= 1e-12) return null;
  const offset = directedSweep(curve.startAngle, angle, curve.clockwise);
  return offset <= curve.sweep + 1e-5 ? Math.max(0, Math.min(1, offset / curve.sweep)) : null;
}

function edgeCurveMatch(solid, edge, curve, tolerance) {
  const start = solid.vertices[edge[0]];
  const end = solid.vertices[edge[1]];
  if (!start || !end) return null;
  const first = curveLocation(start, curve);
  const second = curveLocation(end, curve);
  if (first.error > tolerance || second.error > tolerance) return null;
  const firstParameter = curveParameter(first.angle, curve);
  const secondParameter = curveParameter(second.angle, curve);
  if (firstParameter === null || secondParameter === null) return null;
  const difference = Math.abs(Math.atan2(
    Math.sin(second.angle - first.angle),
    Math.cos(second.angle - first.angle),
  ));
  if (difference > Math.PI / 3) return null;
  return {
    edge,
    firstAngle: first.angle,
    firstParameter,
    secondAngle: second.angle,
    secondParameter,
    error: first.error + second.error,
  };
}

function pointOnLineCandidate(point, candidate, tolerance) {
  const direction = subtract(candidate.end, candidate.start);
  const squaredLength = dot(direction, direction);
  if (squaredLength <= 1e-12) return false;
  const relative = subtract(point3(point), candidate.start);
  const parameter = dot(relative, direction) / squaredLength;
  const parameterTolerance = tolerance / Math.sqrt(squaredLength);
  if (parameter < -parameterTolerance || parameter > 1 + parameterTolerance) return false;
  const projected = add(candidate.start, scale(direction, parameter));
  return length(subtract(point3(point), projected)) <= tolerance;
}

function exactLineCandidateForEdge(solid, edge, candidates, tolerance) {
  const start = solid.vertices[edge[0]];
  const end = solid.vertices[edge[1]];
  if (!start || !end) return null;
  const midpoint = scale(add(point3(start), point3(end)), 0.5);
  return candidates.find((candidate) =>
    pointOnLineCandidate(start, candidate, tolerance) &&
    pointOnLineCandidate(midpoint, candidate, tolerance) &&
    pointOnLineCandidate(end, candidate, tolerance)) ?? null;
}

function degenerateMeshEdgeKeys(solid, tolerance) {
  const keys = new Set();
  solid.faces.forEach((face) => {
    if (!Array.isArray(face) || face.length !== 3) return;
    const points = face.map((vertexIndex) => point3(solid.vertices[vertexIndex]));
    const edges = [
      length(subtract(points[1], points[0])),
      length(subtract(points[2], points[1])),
      length(subtract(points[0], points[2])),
    ];
    const longest = Math.max(...edges);
    if (longest <= 1e-12) return;
    const first = subtract(points[1], points[0]);
    const second = subtract(points[2], points[0]);
    const cross = {
      x: first.y * second.z - first.z * second.y,
      y: first.z * second.x - first.x * second.z,
      z: first.x * second.y - first.y * second.x,
    };
    if (length(cross) / longest > tolerance) return;
    face.forEach((start, index) => {
      keys.add(edgeKey(start, face[(index + 1) % face.length]));
    });
  });
  return keys;
}

function connectedMatches(matches) {
  const byVertex = new Map();
  matches.forEach((match, index) => match.edge.forEach((vertexIndex) => {
    if (!byVertex.has(vertexIndex)) byVertex.set(vertexIndex, []);
    byVertex.get(vertexIndex).push(index);
  }));
  const visited = new Set();
  return matches.flatMap((_, root) => {
    if (visited.has(root)) return [];
    const component = [];
    const pending = [root];
    visited.add(root);
    while (pending.length) {
      const index = pending.pop();
      const match = matches[index];
      component.push(match);
      match.edge.forEach((vertexIndex) => (byVertex.get(vertexIndex) ?? []).forEach((neighbor) => {
        if (visited.has(neighbor)) return;
        visited.add(neighbor);
        pending.push(neighbor);
      }));
    }
    return [component];
  });
}

function uniqueSourceEdges(matches) {
  const edges = new Map();
  matches.forEach(({ edge }) => edges.set(edgeKey(edge[0], edge[1]), [...edge]));
  return [...edges.values()];
}

function componentEndpoints(component) {
  const degrees = new Map();
  component.forEach(({ edge }) => edge.forEach((index) =>
    degrees.set(index, (degrees.get(index) ?? 0) + 1)));
  return [...degrees.entries()].filter(([, degree]) => degree === 1).map(([index]) => index);
}

function componentAngularCoverage(component) {
  return component.reduce((sum, match) => sum + Math.abs(Math.atan2(
    Math.sin(match.secondAngle - match.firstAngle),
    Math.cos(match.secondAngle - match.firstAngle),
  )), 0);
}

function largestMatchAngularSpan(matches) {
  return matches.reduce((largest, match) => Math.max(
    largest,
    Math.abs(Math.atan2(
      Math.sin(match.secondAngle - match.firstAngle),
      Math.cos(match.secondAngle - match.firstAngle),
    )),
  ), 0);
}

function validConnectedCurveMatches(curve, matches, gapTolerance) {
  return connectedMatches(matches).filter((component) => {
    const endpoints = componentEndpoints(component);
    if (endpoints.length === 2) return true;
    return curve.closed && !endpoints.length &&
      componentAngularCoverage(component) >= TWO_PI - gapTolerance;
  });
}

function closedCurveComponents(curve, matches, gapTolerance = 1e-4) {
  const intervals = matches.flatMap((match) => {
    let start = Math.min(match.firstAngle, match.secondAngle);
    let end = Math.max(match.firstAngle, match.secondAngle);
    if (end - start > Math.PI) {
      return [
        { start: 0, end: start, matches: [match] },
        { start: end, end: TWO_PI, matches: [match] },
      ];
    }
    return [{ start, end, matches: [match] }];
  }).sort((first, second) => first.start - second.start);
  const merged = [];
  intervals.forEach((interval) => {
    const previous = merged.at(-1);
    if (!previous || interval.start > previous.end + gapTolerance) {
      merged.push({ ...interval, matches: [...interval.matches] });
      return;
    }
    previous.end = Math.max(previous.end, interval.end);
    previous.matches.push(...interval.matches);
  });
  if (merged.length > 1 &&
      merged[0].start <= gapTolerance &&
      merged.at(-1).end >= TWO_PI - gapTolerance) {
    const first = merged.shift();
    const last = merged.pop();
    merged.push({
      start: last.start,
      end: first.end + TWO_PI,
      matches: [...last.matches, ...first.matches],
    });
  }
  return merged.flatMap((interval, componentIndex) => {
    const sweep = interval.end - interval.start;
    if (sweep <= 1e-9) return [];
    const sourceEdgeIndices = uniqueSourceEdges(interval.matches);
    if (sweep >= TWO_PI - gapTolerance) {
      return [{
        ...curve,
        id: `${curve.id}-${componentIndex}`,
        sourceEdgeIndices,
      }];
    }
    return [{
      ...curve,
      id: `${curve.id}-${componentIndex}`,
      closed: false,
      startAngle: normalizeAngle(interval.start),
      endAngle: normalizeAngle(interval.end),
      clockwise: true,
      sweep,
      sourceEdgeIndices,
    }];
  });
}

function curvePointAtParameter(curve, parameter) {
  const direction = curve.clockwise ? 1 : -1;
  const angle = curve.startAngle + direction * curve.sweep * parameter;
  return add(curve.center, add(
    scale(curve.uAxis, Math.cos(angle) * curve.radiusX),
    scale(curve.vAxis, Math.sin(angle) * curve.radiusY),
  ));
}

function curveContainsCurve(container, candidate, tolerance) {
  if (container.type !== candidate.type ||
      container.sweep + 1e-9 < candidate.sweep ||
      length(subtract(container.center, candidate.center)) > tolerance) {
    return false;
  }
  return [0, 0.5, 1].every((parameter) => {
    const location = curveLocation(curvePointAtParameter(candidate, parameter), container);
    return location.error <= tolerance &&
      curveParameter(location.angle, container) !== null;
  });
}

function consolidateCoincidentCurves(curves, tolerance) {
  return curves.filter((curve, index) => !curves.some((candidate, candidateIndex) => {
    if (candidateIndex === index ||
        candidate.sweep < curve.sweep - 1e-9 ||
        candidate.sweep <= curve.sweep + 1e-9 && candidateIndex > index) {
      return false;
    }
    return curveContainsCurve(candidate, curve, tolerance);
  }));
}

function coincidentBooleanStartCurveIds(curves, tolerance) {
  const result = new Set();
  curves.forEach((curve, index) => {
    if (!['subtract', 'union'].includes(curve.operationType) || curve.capIndex !== 0) return;
    const coincidentSource = curves.slice(0, index).some((candidate) =>
      candidate.profileIndex < curve.profileIndex &&
      curveContainsCurve(candidate, curve, tolerance));
    if (coincidentSource) result.add(curve.id);
  });
  return result;
}

function lineDirection(line) {
  return normalized(subtract(point3(line.end), point3(line.start)), { x: 1, y: 0, z: 0 });
}

function linesTouch(first, second, tolerance) {
  return [first.start, first.end].some((firstPoint) =>
    [second.start, second.end].some((secondPoint) =>
      length(subtract(point3(firstPoint), point3(secondPoint))) <= tolerance));
}

function collinearLines(first, second, tolerance) {
  const firstDirection = lineDirection(first);
  const secondDirection = lineDirection(second);
  if (Math.abs(dot(firstDirection, secondDirection)) < 1 - 1e-6) return false;
  const relative = subtract(point3(second.start), point3(first.start));
  return length(cross(relative, firstDirection)) <= tolerance;
}

function consolidateStraightLines(lines, tolerance) {
  const parents = lines.map((_, index) => index);
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
  lines.forEach((line, index) => {
    for (let otherIndex = index + 1; otherIndex < lines.length; otherIndex += 1) {
      const other = lines[otherIndex];
      if (linesTouch(line, other, tolerance) &&
          collinearLines(line, other, tolerance)) {
        join(index, otherIndex);
      }
    }
  });
  const components = new Map();
  lines.forEach((line, index) => {
    const componentRoot = root(index);
    if (!components.has(componentRoot)) components.set(componentRoot, []);
    components.get(componentRoot).push(line);
  });
  return [...components.values()].map((component) => {
    if (component.length === 1) return component[0];
    const origin = point3(component[0].start);
    const direction = lineDirection(component[0]);
    const points = component.flatMap((line) => [point3(line.start), point3(line.end)]);
    const ordered = points.map((point) => ({
      point,
      parameter: dot(subtract(point, origin), direction),
    })).sort((first, second) => first.parameter - second.parameter);
    return {
      ...component[0],
      id: `${component[0].id}-consolidated`,
      start: ordered[0].point,
      end: ordered.at(-1).point,
      sourceEdgeIndices: component.flatMap((line) => line.sourceEdgeIndices),
    };
  });
}

function solidHasCurvePoint(solid, curve, parameter, tolerance) {
  const target = curvePointAtParameter(curve, parameter);
  return solid.vertices.some((point) => length(subtract(point3(point), target)) <= tolerance);
}

function semanticCapBoundaryEdgeKeys(solid, topology, curve) {
  const semanticCaps = (topology?.semanticPlanarFaces ?? []).filter((group) =>
    group.profileIndex === curve.profileIndex &&
    group.capIndex === curve.capIndex &&
    (group.regionId === curve.ownerRegionId ||
      group.kind === 'analytic-residual-parent' &&
      group.parentRegionId === curve.ownerRegionId));
  if (!semanticCaps.length) return null;
  const boundaries = new Set();
  semanticCaps.forEach((group) => {
    const uses = new Map();
    group.indices.forEach((faceIndex) => {
      const face = solid.faces[faceIndex];
      if (!face) return;
      face.forEach((start, index) => {
        const end = face[(index + 1) % face.length];
        const key = edgeKey(start, end);
        uses.set(key, (uses.get(key) ?? 0) + 1);
      });
    });
    uses.forEach((count, key) => {
      if (count === 1) boundaries.add(key);
    });
  });
  return boundaries;
}

function partialCurveComponents(solid, curve, matches, gapTolerance = 1e-4, tolerance = 1e-4) {
  const parameterGap = gapTolerance / Math.max(curve.sweep, 1e-9);
  const intervals = matches.map((match) => ({
    start: Math.min(match.firstParameter, match.secondParameter),
    end: Math.max(match.firstParameter, match.secondParameter),
    matches: [match],
  })).sort((first, second) => first.start - second.start);
  const merged = [];
  intervals.forEach((interval) => {
    const previous = merged.at(-1);
    if (!previous || interval.start > previous.end + parameterGap) {
      merged.push({ ...interval, matches: [...interval.matches] });
      return;
    }
    previous.end = Math.max(previous.end, interval.end);
    previous.matches.push(...interval.matches);
  });
  const endpointAngularTolerance = Math.max(gapTolerance, MAX_ENDPOINT_SNAP_ANGLE);
  if (merged.length &&
      merged[0].start * curve.sweep <= endpointAngularTolerance &&
      solidHasCurvePoint(solid, curve, 0, tolerance)) {
    merged[0].start = 0;
  }
  if (merged.length &&
      (1 - merged.at(-1).end) * curve.sweep <= endpointAngularTolerance &&
      solidHasCurvePoint(solid, curve, 1, tolerance)) {
    merged.at(-1).end = 1;
  }
  const direction = curve.clockwise ? 1 : -1;
  return merged.flatMap((interval, componentIndex) => {
    if (interval.end - interval.start <= 1e-9) return [];
    return [{
      ...curve,
      id: `${curve.id}-${componentIndex}`,
      closed: false,
      startAngle: normalizeAngle(
        curve.startAngle + direction * curve.sweep * interval.start,
      ),
      endAngle: normalizeAngle(
        curve.startAngle + direction * curve.sweep * interval.end,
      ),
      sweep: curve.sweep * (interval.end - interval.start),
      sourceEdgeIndices: uniqueSourceEdges(interval.matches),
    }];
  });
}

function transverseSurfaceBoundaryCurves(
  solid,
  analyticTopology,
  tolerance,
) {
  const surfaceById = new Map(
    analyticTopology.sideSurfaces.map((surface) => [surface.id, surface]),
  );
  const bucketsBySurface = new Map();
  analyticTopology.transverseSideEdges.forEach((entry) => {
    if (!Number.isFinite(entry.axial)) return;
    if (!bucketsBySurface.has(entry.surfaceId)) {
      bucketsBySurface.set(entry.surfaceId, []);
    }
    const buckets = bucketsBySurface.get(entry.surfaceId);
    let bucket = buckets.find((candidate) =>
      Math.abs(candidate.axial - entry.axial) <= tolerance);
    if (!bucket) {
      bucket = { axial: entry.axial, entries: [] };
      buckets.push(bucket);
    }
    bucket.entries.push(entry);
  });
  return [...bucketsBySurface.entries()].flatMap(([surfaceId, buckets]) => {
    const surface = surfaceById.get(surfaceId);
    if (!surface?.closed) return [];
    const axis = normalized(point3(surface.offset), { x: 0, y: 0, z: 1 });
    const surfaceTolerance = analyticSurfaceTolerance(
      solid,
      surface,
      tolerance,
    );
    return buckets.flatMap((bucket, bucketIndex) => {
      const curve = {
        ...surface,
        id: `analytic-transverse-${surfaceId}-${bucketIndex}`,
        center: add(
          point3(surface.center),
          scale(axis, bucket.axial),
        ),
        ownerRegionId: surface.regionId ?? null,
        sideSurfaceId: surfaceId,
        sourceEdgeIndices: [],
      };
      const matches = bucket.entries
        .map((entry) =>
          edgeCurveMatch(solid, entry.edge, curve, surfaceTolerance))
        .filter(Boolean);
      const angularTolerance = Math.max(
        1e-4,
        surfaceTolerance / Math.max(curve.radiusX, curve.radiusY),
      );
      return validConnectedCurveMatches(
        curve,
        matches,
        angularTolerance,
      ).flatMap((component, componentIndex) => {
        const reconstructionGapTolerance = Math.max(
          angularTolerance,
          largestMatchAngularSpan(component) * 1.05,
        );
        return closedCurveComponents({
          ...curve,
          id: `${curve.id}-${componentIndex}`,
        }, component, reconstructionGapTolerance)
          .filter((candidate) => candidate.closed);
      });
    });
  });
}

export function deriveSolidAnalyticEdges(solid, options = {}) {
  if (!Array.isArray(solid?.vertices) || !Array.isArray(solid?.edges)) {
    return { version: 1, curves: [], lines: [] };
  }
  const tolerance = solidTolerance(solid, options.tolerance);
  const candidates = curveCandidates(solid.metadata);
  const lineCandidates = straightLineCandidates(solid.metadata);
  const meshTolerance = booleanWeldTolerance(solid);
  const degenerateEdges = degenerateMeshEdgeKeys(solid, meshTolerance);
  const suppressedCoincidentStarts = coincidentBooleanStartCurveIds(
    candidates,
    tolerance,
  );
  const analyticTopology = deriveSolidAnalyticTopology(solid, options);
  const sideSurfaceById = new Map(
    analyticTopology.sideSurfaces.map((surface) => [surface.id, surface]),
  );
  const assigned = new Map();
  candidates.forEach((curve, candidateIndex) => {
    const surface = sideSurfaceById.get(curve.sideSurfaceId);
    const matchTolerance = surface
      ? Math.max(tolerance, analyticSurfaceTolerance(
        solid,
        surface,
        options.surfaceTolerance,
      ))
      : tolerance;
    solid.edges.forEach((edge) => {
      const key = edgeKey(edge[0], edge[1]);
      const match = edgeCurveMatch(solid, edge, curve, matchTolerance);
      if (!match) return;
      const previous = assigned.get(key);
      if (!previous || match.error < previous.match.error) {
        assigned.set(key, { candidateIndex, match });
      }
    });
  });
  const reconstructedCurves = candidates.flatMap((curve, candidateIndex) => {
    if (suppressedCoincidentStarts.has(curve.id)) return [];
    const surface = sideSurfaceById.get(curve.sideSurfaceId);
    const boundaryTolerance = surface
      ? analyticSurfaceTolerance(solid, surface, options.surfaceTolerance)
      : tolerance;
    const analyticBoundaryMatches = analyticTopology.boundarySideEdges
      .filter((entry) =>
        entry.surfaceId === curve.sideSurfaceId && entry.capIndex === curve.capIndex)
      .map((entry) => edgeCurveMatch(solid, entry.edge, curve, boundaryTolerance))
      .filter(Boolean);
    const boundaryMatches = [
      ...analyticBoundaryMatches,
      ...capCurveBoundaryMatches(solid, curve, boundaryTolerance),
    ].filter((match, index, matches) =>
      matches.findIndex((candidate) =>
        edgeKey(candidate.edge[0], candidate.edge[1]) ===
        edgeKey(match.edge[0], match.edge[1])) === index);
    const fallbackMatches = [...assigned.values()]
      .filter((assignment) => assignment.candidateIndex === candidateIndex)
      .map((assignment) => assignment.match);
    const matches = boundaryMatches.length ? boundaryMatches : fallbackMatches;
    const semanticBoundaryEdges = semanticCapBoundaryEdgeKeys(
      solid,
      analyticTopology,
      curve,
    );
    const semanticMatches = semanticBoundaryEdges
      ? matches.filter((match) =>
        semanticBoundaryEdges.has(edgeKey(match.edge[0], match.edge[1])))
      : matches;
    const angularTolerance = Math.max(
      1e-4,
      boundaryTolerance / Math.max(curve.radiusX, curve.radiusY),
    );
    const validMatches = validConnectedCurveMatches(
      curve,
      semanticMatches,
      angularTolerance,
    ).flat();
    const reconstructionGapTolerance = Math.max(
      angularTolerance,
      largestMatchAngularSpan(validMatches) * 1.05,
    );
    if (curve.closed) {
      return closedCurveComponents(
        curve,
        validMatches,
        reconstructionGapTolerance,
      );
    }
    return partialCurveComponents(
      solid,
      curve,
      validMatches,
      reconstructionGapTolerance,
      boundaryTolerance,
    );
  }).concat(transverseSurfaceBoundaryCurves(
    solid,
    analyticTopology,
    tolerance,
  ));
  const resolvedCurves = reconstructedCurves.filter((curve) =>
    curve.closed ||
    curve.sweep * Math.max(curve.radiusX, curve.radiusY) > meshTolerance);
  const curves = consolidateCoincidentCurves(resolvedCurves, tolerance);
  const consumed = new Set(curves.flatMap((curve) =>
    curve.sourceEdgeIndices.map((edge) => edgeKey(edge[0], edge[1]))));
  const rejectedCurveSeams = new Set(assigned.keys());
  const coplanarInternalEdges = internalCoplanarEdgeKeys(
    solid,
    coplanarFaceTolerance(solid),
  );
  const topologyEdges = faceTopologyEdgeKeys(solid);
  const rawLines = solid.edges.flatMap((edge, index) => {
    const key = edgeKey(edge[0], edge[1]);
    const exactLineCandidate = exactLineCandidateForEdge(
      solid,
      edge,
      lineCandidates,
      meshTolerance,
    );
    if (
      !topologyEdges.has(key) ||
      consumed.has(key) ||
      rejectedCurveSeams.has(key) ||
      coplanarInternalEdges.has(key) ||
      analyticTopology.internalSideEdgeKeys.has(key) ||
      (degenerateEdges.has(key) && !exactLineCandidate) ||
      isNonSemanticAnalyticSurfaceSeam(
        solid,
        edge,
        analyticTopology.sideSurfaces,
        options,
      )
    ) {
      return [];
    }
    const start = solid.vertices[edge[0]];
    const end = solid.vertices[edge[1]];
    return start && end ? [{
      id: `analytic-line-${index}`,
      type: 'line',
      start: point3(start),
      end: point3(end),
      analyticSource: exactLineCandidate?.analyticSource ?? null,
      ownerRegionId: exactLineCandidate?.ownerRegionId ?? null,
      sourceEdgeIndices: [[...edge]],
    }] : [];
  });
  const lines = consolidateStraightLines(rawLines, meshTolerance);
  return { version: 1, curves, lines };
}

export function pointOnAnalyticCurve(curve, angle) {
  return add(curve.center, add(
    scale(curve.uAxis, Math.cos(angle) * curve.radiusX),
    scale(curve.vAxis, Math.sin(angle) * curve.radiusY),
  ));
}

export function sampleSolidAnalyticEdges(solid, options = {}) {
  const geometry = deriveSolidAnalyticEdges(solid, options);
  const maxSegmentAngle = Math.max(
    1e-3,
    Number(options.maxSegmentAngle) || DEFAULT_MAX_SEGMENT_ANGLE,
  );
  const entries = geometry.lines.map((line) => ({
    curveGroupId: null,
    segment: { start: line.start, end: line.end },
    sourceEdgeIndices: line.sourceEdgeIndices[0] ?? null,
    type: line.type,
  }));
  geometry.curves.forEach((curve) => {
    const sweep = curve.closed ? TWO_PI : curve.sweep;
    const count = Math.max(4, Math.ceil(sweep / maxSegmentAngle));
    const direction = curve.clockwise ? 1 : -1;
    for (let index = 0; index < count; index += 1) {
      const startAngle = curve.startAngle + direction * sweep * index / count;
      const endAngle = curve.startAngle + direction * sweep * (index + 1) / count;
      entries.push({
        curveGroupId: curve.id,
        segment: {
          start: pointOnAnalyticCurve(curve, startAngle),
          end: pointOnAnalyticCurve(curve, endAngle),
        },
        sourceEdgeIndices: curve.sourceEdgeIndices,
        type: curve.type,
      });
    }
  });
  return { entries, geometry };
}

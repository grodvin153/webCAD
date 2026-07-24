/* webCAD - Aristas analiticas derivadas de solidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

const TWO_PI = Math.PI * 2;
const DEFAULT_MAX_SEGMENT_ANGLE = Math.PI / 48;

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
      profileIndex: entries.length,
      profile: baseProfile,
      offset: extrusion.offset ?? scale(
        point3(extrusion.direction ?? baseProfile.plane?.normal),
        distance,
      ),
    });
  }
  (metadata?.profileFeatures ?? []).forEach((feature) => {
    const profile = feature?.exactProfile;
    const distance = Number(feature?.distance);
    if (!profile || !Number.isFinite(distance)) return;
    entries.push({
      profileIndex: entries.length,
      profile,
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
  const origin = point3(plane?.origin);
  const { xAxis, yAxis } = planeAxes(plane);
  return add(add(add(
    origin,
    scale(xAxis, number(local?.x)),
  ), scale(yAxis, -number(local?.y))), point3(offset));
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
  const uAxis = normalized(add(
    scale(xAxis, Math.cos(rotation)),
    scale(yAxis, -Math.sin(rotation)),
  ), xAxis);
  const vAxis = normalized(add(
    scale(xAxis, -Math.sin(rotation)),
    scale(yAxis, -Math.cos(rotation)),
  ), scale(yAxis, -1));
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
  exactExtrusionProfiles(metadata).forEach(({ profile, offset }, profileIndex) => {
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
            candidates.push({
              ...candidate,
              capIndex,
              sideSurfaceId: `analytic-side-${profileIndex}-${loopIndex}-${segmentIndex}`,
            });
          }
        });
      });
    });
  });
  return candidates;
}

export function deriveSolidAnalyticSideSurfaces(solid) {
  const surfaces = [];
  exactExtrusionProfiles(solid?.metadata).forEach(({ profile, offset }, profileIndex) => {
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
  };
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

function localPointOnProfilePlane(point, plane, offset) {
  const relative = subtract(subtract(point3(point), point3(plane?.origin)), point3(offset));
  const { xAxis, yAxis } = planeAxes(plane);
  return {
    x: dot(relative, xAxis),
    y: -dot(relative, yAxis),
  };
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

function semanticCapFaces(solid, requestedNormals, tolerance) {
  return exactExtrusionProfiles(solid?.metadata).flatMap(({ profile, offset, profileIndex }) => {
    const offsetVector = point3(offset);
    const extrusionLength = length(offsetVector);
    if (extrusionLength <= 1e-9) return [];
    const axis = normalized(offsetVector, point3(profile?.plane?.normal));
    const localLoops = [profile?.outerLoop, ...(profile?.innerLoops ?? [])]
      .map((loop) => sampledLoop(loop, profile.plane, point3(null))
        .map((point) => localPointOnProfilePlane(point, profile.plane, point3(null))));
    if (localLoops[0]?.length < 3) return [];
    return [point3(null), offsetVector].flatMap((capOffset, capIndex) => {
      const capOrigin = add(point3(profile.plane?.origin), capOffset);
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
        const local = localPointOnProfilePlane(centroid, profile.plane, capOffset);
        if (!pointInPolygon(local, localLoops[0]) ||
            localLoops.slice(1).some((loop) => pointInPolygon(local, loop))) return [];
        return [faceIndex];
      });
      if (!faceIndices.length) return [];
      const loops = [profile.outerLoop, ...(profile.innerLoops ?? [])]
        .map((loop) => sampledLoop(loop, profile.plane, capOffset));
      const circularOuter = profile.outerLoop?.segments?.length === 1 &&
        ['circle', 'ellipse'].includes(profile.outerLoop.segments[0]?.type);
      return [{
        id: `analytic-cap-${profileIndex}-${capIndex}`,
        indices: faceIndices,
        kind: 'analytic-cap',
        normal: capIndex === 0 ? scale(axis, -1) : axis,
        outerLoop: loops[0],
        innerLoops: loops.slice(1),
        cadProfileVertexIndices: circularOuter
          ? []
          : loops[0].map((_, index) => index),
        smoothProfileVertexIndices: circularOuter
          ? loops[0].map((_, index) => index)
          : [],
        holeCadProfileVertexIndices: loops.slice(1).map((loop) =>
          loop.map((_, index) => index)),
        holeSmoothProfileVertexIndices: loops.slice(1).map(() => []),
        profileIndex,
        capIndex,
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

export function deriveSolidAnalyticTopology(solid, options = {}) {
  if (!Array.isArray(solid?.vertices) || !Array.isArray(solid?.faces)) {
    return {
      version: 1,
      sideSurfaces: [],
      faceSurfaceIds: [],
      semanticPlanarFaces: [],
      boundarySideEdges: [],
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
      return Math.abs(dot(normal, axis)) <= 1e-4 &&
        face.every((vertexIndex) =>
          pointOnAnalyticSideSurface(solid, solid.vertices[vertexIndex], candidate, options));
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
  const boundarySideEdges = [...uses.entries()].flatMap(([key, use]) => {
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
      if (!atStart && !atEnd) return [];
      return [{
        edge: [...use.edge],
        key,
        surfaceId,
        capIndex: atStart ? 0 : 1,
      }];
    });
  });
  return {
    version: 1,
    sideSurfaces,
    faceSurfaceIds,
    semanticPlanarFaces: semanticCapFaces(solid, requestedNormals, tolerance),
    boundarySideEdges,
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

function componentEndpoints(component) {
  const degrees = new Map();
  component.forEach(({ edge }) => edge.forEach((index) =>
    degrees.set(index, (degrees.get(index) ?? 0) + 1)));
  return [...degrees.entries()].filter(([, degree]) => degree === 1).map(([index]) => index);
}

function componentCurve(solid, curve, component, componentIndex) {
  const endpoints = componentEndpoints(component);
  const sourceEdgeIndices = component.map(({ edge }) => [...edge]);
  if (curve.closed && !endpoints.length) {
    return {
      ...curve,
      id: `${curve.id}-${componentIndex}`,
      sourceEdgeIndices,
    };
  }
  const parameters = component.flatMap((match) => [match.firstParameter, match.secondParameter]);
  if (!curve.closed) {
    const startParameter = Math.min(...parameters);
    const endParameter = Math.max(...parameters);
    if (endParameter - startParameter <= 1e-9) return null;
    const direction = curve.clockwise ? 1 : -1;
    return {
      ...curve,
      id: `${curve.id}-${componentIndex}`,
      closed: false,
      startAngle: normalizeAngle(curve.startAngle + direction * curve.sweep * startParameter),
      endAngle: normalizeAngle(curve.startAngle + direction * curve.sweep * endParameter),
      sweep: curve.sweep * (endParameter - startParameter),
      sourceEdgeIndices,
    };
  }
  if (endpoints.length !== 2) return null;
  const [first, second] = endpoints.map((index) => curveLocation(solid.vertices[index], curve).angle);
  const covered = component.reduce((sum, match) => sum + Math.abs(Math.atan2(
    Math.sin(match.secondAngle - match.firstAngle),
    Math.cos(match.secondAngle - match.firstAngle),
  )), 0);
  const forward = directedSweep(first, second, true);
  const clockwise = Math.abs(forward - covered) <= Math.abs(TWO_PI - forward - covered);
  return {
    ...curve,
    id: `${curve.id}-${componentIndex}`,
    closed: false,
    startAngle: first,
    endAngle: second,
    clockwise,
    sweep: directedSweep(first, second, clockwise),
    sourceEdgeIndices,
  };
}

export function deriveSolidAnalyticEdges(solid, options = {}) {
  if (!Array.isArray(solid?.vertices) || !Array.isArray(solid?.edges)) {
    return { version: 1, curves: [], lines: [] };
  }
  const tolerance = solidTolerance(solid, options.tolerance);
  const candidates = curveCandidates(solid.metadata);
  const analyticTopology = deriveSolidAnalyticTopology(solid, options);
  const sideSurfaceById = new Map(
    analyticTopology.sideSurfaces.map((surface) => [surface.id, surface]),
  );
  const assigned = new Map();
  candidates.forEach((curve, candidateIndex) => {
    solid.edges.forEach((edge) => {
      const key = edgeKey(edge[0], edge[1]);
      const match = edgeCurveMatch(solid, edge, curve, tolerance);
      if (!match) return;
      const previous = assigned.get(key);
      if (!previous || match.error < previous.match.error) {
        assigned.set(key, { candidateIndex, match });
      }
    });
  });
  const curves = candidates.flatMap((curve, candidateIndex) => {
    const surface = sideSurfaceById.get(curve.sideSurfaceId);
    const boundaryTolerance = surface
      ? analyticSurfaceTolerance(solid, surface, options.surfaceTolerance)
      : tolerance;
    const boundaryMatches = analyticTopology.boundarySideEdges
      .filter((entry) =>
        entry.surfaceId === curve.sideSurfaceId && entry.capIndex === curve.capIndex)
      .map((entry) => edgeCurveMatch(solid, entry.edge, curve, boundaryTolerance))
      .filter(Boolean);
    const fallbackMatches = [...assigned.values()]
      .filter((assignment) => assignment.candidateIndex === candidateIndex)
      .map((assignment) => assignment.match);
    const matches = boundaryMatches.length ? boundaryMatches : fallbackMatches;
    if (curve.closed) {
      return closedCurveComponents(
        curve,
        matches,
        Math.max(1e-4, boundaryTolerance / Math.max(curve.radiusX, curve.radiusY)),
      );
    }
    return connectedMatches(matches)
      .map((component, componentIndex) =>
        componentCurve(solid, curve, component, componentIndex))
      .filter(Boolean);
  });
  const consumed = new Set(curves.flatMap((curve) =>
    curve.sourceEdgeIndices.map((edge) => edgeKey(edge[0], edge[1]))));
  const lines = solid.edges.flatMap((edge, index) => {
    if (consumed.has(edgeKey(edge[0], edge[1]))) return [];
    const start = solid.vertices[edge[0]];
    const end = solid.vertices[edge[1]];
    return start && end ? [{
      id: `analytic-line-${index}`,
      type: 'line',
      start: point3(start),
      end: point3(end),
      sourceEdgeIndices: [[...edge]],
    }] : [];
  });
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

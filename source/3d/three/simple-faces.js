/* webCAD - Recintos simples aislados para vista 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { SNAP_THRESHOLD } from '../../config.js';
import {
  exactProfileFromCurvePieces,
  exactProfileFromEntity,
  exactProfileWithHoles,
} from '../exact-profile.js';
import {
  angleOfPoint,
  circularParameter,
  entityArcSweep,
  lineParameter,
  pointAtCircularParameter,
  pointAtLineParameter,
  polygonSignedArea,
  uniqueSortedParameters,
} from '../../geometry.js';
import { entityIntersectionPoints } from '../../intersections.js';
import {
  ellipseNormalizedParameter,
  ellipseParameterAtNormalized,
  ellipsePoint,
  ellipseSweep,
  isEllipseEntity,
} from '../../ellipse/geometry.js';

import {
  sampleArcByCenter,
  sampleEllipseEntity,
  TWO_PI,
} from './curve-discretization.js';

const DEFAULT_CIRCLE_SEGMENTS = 64;
const FACE_RENDER_ORDER = 8;
const FACE_DEFAULT_COLOR = 0xf7f7f2;
const FACE_SELECTED_COLOR = 0xd7e8ff;

function finitePoint(point, invertY = true) {
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y: invertY ? -y : y, z: 0 };
}

function samePoint(first, second, tolerance) {
  return Math.hypot(first.x - second.x, first.y - second.y) <= tolerance;
}

function polygonArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return Math.abs(area) * 0.5;
}

function boundsFromPoints(points) {
  return points.reduce((bounds, point) => ({
    minX: Math.min(bounds.minX, point.x),
    minY: Math.min(bounds.minY, point.y),
    maxX: Math.max(bounds.maxX, point.x),
    maxY: Math.max(bounds.maxY, point.y),
  }), {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  });
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const current = polygon[index];
    const before = polygon[previous];
    const intersects = (current.y > point.y) !== (before.y > point.y) &&
      point.x < (before.x - current.x) * (point.y - current.y) /
        (before.y - current.y) + current.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function pointSegmentDistance(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= Number.EPSILON) return Math.hypot(point.x - start.x, point.y - start.y);
  const parameter = Math.max(0, Math.min(1,
    ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared));
  return Math.hypot(
    point.x - (start.x + deltaX * parameter),
    point.y - (start.y + deltaY * parameter),
  );
}

function faceBoundariesTouch(first, second, tolerance) {
  return first.points.some((point) => second.points.some((start, index) =>
    pointSegmentDistance(point, start, second.points[(index + 1) % second.points.length]) <= tolerance));
}

function faceContainsFace(outer, inner, tolerance) {
  if (outer === inner || outer.area <= inner.area) return false;
  const outerSources = new Set(outer.sourceEntities || [outer.sourceEntity].filter(Boolean));
  const innerSources = inner.sourceEntities || [inner.sourceEntity].filter(Boolean);
  if (innerSources.some((entity) => outerSources.has(entity))) return false;
  if (faceBoundariesTouch(outer, inner, tolerance)) return false;
  return inner.points.every((point) => pointInPolygon(point, outer.points));
}

function regionsFromNestedFaces(faces, tolerance) {
  const parents = new Map();
  faces.forEach((face) => {
    const candidates = faces.filter((candidate) => faceContainsFace(candidate, face, tolerance));
    parents.set(face, candidates.sort((first, second) => first.area - second.area)[0] || null);
  });
  return faces.map((face) => {
    const children = faces.filter((candidate) => parents.get(candidate) === face);
    const holeProfiles = children.map((child) => child.exactProfile).filter(Boolean);
    const exactProfile = face.exactProfile && holeProfiles.length
      ? exactProfileWithHoles(face.exactProfile, holeProfiles, { id: face.id })
      : face.exactProfile;
    return {
      ...face,
      exactProfile,
      holes: children.map((child) => child.points),
      holeCadProfileVertexIndices: children.map((child) => child.cadProfileVertexIndices || []),
      holeSmoothProfileVertexIndices: children.map((child) => child.smoothProfileVertexIndices || []),
      area: Math.max(0, face.area - children.reduce((sum, child) => sum + child.area, 0)),
      sourceEntities: [...new Set([
        ...(face.sourceEntities || [face.sourceEntity]),
        ...children.flatMap((child) => child.sourceEntities || [child.sourceEntity]),
      ].filter(Boolean))],
    };
  }).filter((face) => face.area > 0 && face.exactProfile);
}

function faceId(entity, fallbackIndex) {
  return `face-${entity?.id ?? entity?.handle ?? `${entity?.type ?? 'ENTITY'}-${fallbackIndex}`}`;
}

function appendProfilePoint(points, smoothIndices, point, options = {}) {
  const last = points[points.length - 1];
  if (last && samePoint(last, point, options.tolerance)) {
    if (!options.smooth) smoothIndices.delete(points.length - 1);
    return points.length - 1;
  }
  points.push(point);
  const index = points.length - 1;
  if (options.smooth) smoothIndices.add(index);
  return index;
}

function arcClockwiseForMappedPlane(clockwise, invertY) {
  return invertY ? !clockwise : clockwise;
}

function closedPolylinePoints(entity, options) {
  if (!Array.isArray(entity?.vertices) || entity.vertices.length < 3) return null;
  const mappedVertices = entity.vertices.map((point) => finitePoint(point, options.invertY));
  if (mappedVertices.some((point) => !point)) return null;
  const lastIndex = mappedVertices.length - 1;
  const closesByRepeatedEndpoint = samePoint(mappedVertices[0], mappedVertices[lastIndex], options.tolerance);
  const sourceVertices = closesByRepeatedEndpoint ? mappedVertices.slice(0, -1) : mappedVertices;
  if (sourceVertices.length < 3) return null;
  if (!entity.closed && !closesByRepeatedEndpoint) return null;
  const segmentCount = sourceVertices.length;
  const points = [];
  const smoothIndices = new Set();
  const cadVertexIndices = new Set();
  cadVertexIndices.add(appendProfilePoint(points, smoothIndices, sourceVertices[0], options));
  for (let index = 0; index < segmentCount; index += 1) {
    const start = sourceVertices[index];
    const end = sourceVertices[(index + 1) % sourceVertices.length];
    const segment = entity.segments?.[index];
    if (segment?.type === 'ARC') {
      const center = finitePoint(segment.center, options.invertY);
      if (!center) return null;
      const arcPoints = sampleArcByCenter({
        start,
        end,
        center,
        clockwise: arcClockwiseForMappedPlane(segment.clockwise !== false, options.invertY),
      }, options);
      if (arcPoints.length < 2) return null;
      for (let step = 1; step < arcPoints.length; step += 1) {
        const addedIndex = appendProfilePoint(points, smoothIndices, arcPoints[step], {
          ...options,
          smooth: step < arcPoints.length - 1,
        });
        if (step === arcPoints.length - 1) cadVertexIndices.add(addedIndex);
      }
      continue;
    }
    cadVertexIndices.add(appendProfilePoint(points, smoothIndices, end, options));
  }
  if (points.length > 1 && samePoint(points[0], points[points.length - 1], options.tolerance)) {
    const removedIndex = points.length - 1;
    points.pop();
    smoothIndices.delete(removedIndex);
    cadVertexIndices.delete(removedIndex);
    cadVertexIndices.add(0);
  }
  if (points.length < 3) return null;
  return {
    points,
    cadProfileVertexIndices: [...cadVertexIndices].filter((index) => index < points.length),
    smoothProfileVertexIndices: [...smoothIndices].filter((index) => index < points.length),
  };
}

function circlePoints(entity, options) {
  const center = finitePoint(entity?.center, options.invertY);
  const radius = Number(entity?.radius);
  if (!center || !Number.isFinite(radius) || radius <= options.tolerance) return null;
  const segments = Math.max(16, Number(options.circleSegments) || DEFAULT_CIRCLE_SEGMENTS);
  const points = Array.from({ length: segments }, (_, index) => {
    const angle = TWO_PI * index / segments;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + (options.invertY ? -Math.sin(angle) : Math.sin(angle)) * radius,
      z: 0,
    };
  });
  return {
    points,
    cadProfileVertexIndices: [],
    smoothProfileVertexIndices: points.map((_, index) => index),
  };
}

function ellipsePoints(entity, options) {
  const sourcePoints = sampleEllipseEntity(entity, {
    ...options,
    curveSegments: Math.max(16, Number(options.ellipseSegments) || DEFAULT_CIRCLE_SEGMENTS),
  });
  if (sourcePoints.length < 4) return null;
  const points = sourcePoints.slice(0, -1).map((point) => finitePoint(point, options.invertY));
  if (points.some((point) => !point)) return null;
  return {
    points,
    cadProfileVertexIndices: [],
    smoothProfileVertexIndices: points.map((_, index) => index),
  };
}

function compositeCurvePiece(entity, options) {
  if (entity?.type === 'LINE') {
    const start = finitePoint(entity.start, options.invertY);
    const end = finitePoint(entity.end, options.invertY);
    return start && end ? { entity, points: [start, end] } : null;
  }
  if (entity?.type === 'ARC') {
    const center = finitePoint(entity.center, options.invertY);
    const radius = Number(entity.radius);
    if (!center || !Number.isFinite(radius) || radius <= options.tolerance) return null;
    const sourceStart = {
      x: entity.center.x + Math.cos(entity.startAngle) * radius,
      y: entity.center.y + Math.sin(entity.startAngle) * radius,
    };
    const sourceEnd = {
      x: entity.center.x + Math.cos(entity.endAngle) * radius,
      y: entity.center.y + Math.sin(entity.endAngle) * radius,
    };
    const start = finitePoint(sourceStart, options.invertY);
    const end = finitePoint(sourceEnd, options.invertY);
    const points = sampleArcByCenter({
      start,
      end,
      center,
      clockwise: arcClockwiseForMappedPlane(entity.clockwise !== false, options.invertY),
    }, options);
    return points.length >= 2 ? { entity, points } : null;
  }
  if (entity?.type === 'ELLIPSE_ARC') {
    const points = sampleEllipseEntity(entity, options)
      .map((point) => finitePoint(point, options.invertY));
    return points.length >= 2 && points.every(Boolean) ? { entity, points } : null;
  }
  return null;
}

function polylinePrimitives(entity, tolerance) {
  if (!Array.isArray(entity?.vertices) || entity.vertices.length < 2) return [];
  const closesByEndpoint = samePoint(entity.vertices[0], entity.vertices[entity.vertices.length - 1], tolerance);
  const vertices = closesByEndpoint ? entity.vertices.slice(0, -1) : entity.vertices;
  const count = entity.closed || closesByEndpoint
    ? vertices.length
    : Math.min(entity.segments?.length ?? vertices.length - 1, vertices.length - 1);
  return Array.from({ length: count }, (_, index) => {
    const start = vertices[index];
    const end = vertices[(index + 1) % vertices.length];
    const segment = entity.segments?.[index] || { type: 'LINE' };
    if (!start || !end) return null;
    if (segment.type !== 'ARC' || !segment.center) return { type: 'LINE', start, end, sourceEntity: entity };
    return {
      type: 'ARC', center: segment.center,
      radius: Math.hypot(start.x - segment.center.x, start.y - segment.center.y),
      startAngle: angleOfPoint(segment.center, start), endAngle: angleOfPoint(segment.center, end),
      clockwise: segment.clockwise !== false, sourceEntity: entity,
    };
  }).filter((piece) => piece && Number.isFinite(piece.radius ?? 1));
}

function arrangementPrimitives(entities, tolerance) {
  const primitives = entities.flatMap((entity) => {
    if (entity?.type === 'POLYLINE') return polylinePrimitives(entity, tolerance);
    if (entity?.type === 'LINE' || entity?.type === 'ARC' || entity?.type === 'CIRCLE' ||
      entity?.type === 'ELLIPSE' || entity?.type === 'ELLIPSE_ARC') {
      return [{ ...entity, sourceEntity: entity }];
    }
    return [];
  });
  return primitives.filter((entity) => {
    if (entity.type !== 'CIRCLE' && entity.type !== 'ELLIPSE') return true;
    return primitives.some((candidate) => candidate !== entity &&
      entityIntersectionPoints(entity, candidate, () => []).length > 0);
  });
}

function curveParameter(entity, point) {
  if (entity.type === 'LINE') return lineParameter(entity, point);
  if (isEllipseEntity(entity)) return ellipseNormalizedParameter(entity, point);
  return circularParameter(entity, point);
}

function curvePoint(entity, parameter) {
  if (entity.type === 'LINE') return pointAtLineParameter(entity, parameter);
  if (isEllipseEntity(entity)) return ellipsePoint(entity, ellipseParameterAtNormalized(entity, parameter));
  return pointAtCircularParameter(entity, parameter);
}

function pointOnLineSegment(point, line, tolerance) {
  const deltaX = line.end.x - line.start.x;
  const deltaY = line.end.y - line.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= tolerance * tolerance) return false;
  const length = Math.sqrt(lengthSquared);
  const crossDistance = Math.abs(
    (point.x - line.start.x) * deltaY - (point.y - line.start.y) * deltaX,
  ) / length;
  if (crossDistance > tolerance) return false;
  const parameter = ((point.x - line.start.x) * deltaX +
    (point.y - line.start.y) * deltaY) / lengthSquared;
  const parameterTolerance = tolerance / length;
  return parameter >= -parameterTolerance && parameter <= 1 + parameterTolerance;
}

function coincidentLineSplitPoints(first, second, tolerance) {
  if (first?.type !== 'LINE' || second?.type !== 'LINE') return [];
  const candidates = [first.start, first.end, second.start, second.end];
  return candidates.filter((point, index) =>
    pointOnLineSegment(point, first, tolerance) &&
    pointOnLineSegment(point, second, tolerance) &&
    candidates.findIndex((candidate) => samePoint(candidate, point, tolerance)) === index);
}

function sortNodeOutgoing(node, tolerance) {
  const active = node.outgoing.filter((edge) => edge.active);
  const shortestEdge = active.reduce((shortest, edge) => Math.min(
    shortest,
    Math.hypot(edge.to.point.x - node.point.x, edge.to.point.y - node.point.y),
  ), Infinity);
  const probeDistance = Number.isFinite(shortestEdge)
    ? Math.max(tolerance, shortestEdge * 0.25)
    : tolerance;
  const probeAngle = (edge) => {
    const chordLength = Math.hypot(
      edge.to.point.x - node.point.x,
      edge.to.point.y - node.point.y,
    );
    if (chordLength <= tolerance) {
      return Math.atan2(edge.to.point.y - node.point.y, edge.to.point.x - node.point.x);
    }
    const fraction = Math.min(0.25, probeDistance / chordLength);
    const parameter = edge.startParameter +
      (edge.endParameter - edge.startParameter) * fraction;
    const point = curvePoint(edge.entity, parameter) || edge.to.point;
    return Math.atan2(point.y - node.point.y, point.x - node.point.x);
  };
  node.outgoing.sort((first, second) => probeAngle(first) - probeAngle(second));
}

function edgeEndpointDirection(edge, atEnd) {
  const span = edge.endParameter - edge.startParameter;
  const step = span * 1e-4;
  const endpointParameter = atEnd ? edge.endParameter : edge.startParameter;
  const nearbyParameter = atEnd ? endpointParameter - step : endpointParameter + step;
  const endpoint = curvePoint(edge.entity, endpointParameter);
  const nearby = curvePoint(edge.entity, nearbyParameter);
  if (!endpoint || !nearby) return null;
  const x = atEnd ? endpoint.x - nearby.x : nearby.x - endpoint.x;
  const y = atEnd ? endpoint.y - nearby.y : nearby.y - endpoint.y;
  const length = Math.hypot(x, y);
  return length > 1e-12 ? { x: x / length, y: y / length } : null;
}

function edgesMeetTangentially(previous, current) {
  const incoming = edgeEndpointDirection(previous, true);
  const outgoing = edgeEndpointDirection(current, false);
  if (!incoming || !outgoing) return false;
  const dot = incoming.x * outgoing.x + incoming.y * outgoing.y;
  const cross = incoming.x * outgoing.y - incoming.y * outgoing.x;
  return Math.abs(dot) >= 1 - 1e-6 && Math.abs(cross) <= 1e-3;
}

function arrangementClosedFaces(entities, options) {
  const primitives = arrangementPrimitives(entities, options.tolerance);
  if (!primitives.length) return [];
  const parameters = new Map(primitives.map((entity) => [
    entity,
    entity.type === 'CIRCLE' || entity.type === 'ELLIPSE'
      ? [0, 0.25, 0.5, 0.75, 1]
      : [0, 1],
  ]));
  for (let index = 0; index < primitives.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < primitives.length; otherIndex += 1) {
      const first = primitives[index];
      const second = primitives[otherIndex];
      const intersections = [
        ...entityIntersectionPoints(first, second, () => []),
        ...coincidentLineSplitPoints(first, second, options.tolerance),
      ];
      for (const point of intersections) {
        parameters.get(first).push(curveParameter(first, point));
        parameters.get(second).push(curveParameter(second, point));
      }
    }
  }

  const nodes = [];
  const nodeForPoint = (point) => {
    const node = nodes.find((candidate) => samePoint(candidate.point, point, options.tolerance));
    if (node) return node;
    const created = { point: { ...point }, outgoing: [], id: nodes.length + 1 };
    nodes.push(created);
    return created;
  };
  const halfEdges = [];
  const lineEdgeKeys = new Set();
  const addEdge = (entity, startParameter, endParameter) => {
    const start = curvePoint(entity, startParameter);
    const end = curvePoint(entity, endParameter);
    if (!start || !end || samePoint(start, end, options.tolerance)) return;
    const from = nodeForPoint(start);
    const to = nodeForPoint(end);
    if (entity.type === 'LINE') {
      const key = from.id < to.id ? `${from.id}:${to.id}` : `${to.id}:${from.id}`;
      if (lineEdgeKeys.has(key)) return;
      lineEdgeKeys.add(key);
    }
    const forward = { from, to, entity, startParameter, endParameter, twin: null, active: true, visited: false };
    const reverse = { from: to, to: from, entity, startParameter: endParameter, endParameter: startParameter, twin: forward, active: true, visited: false };
    forward.twin = reverse;
    from.outgoing.push(forward);
    to.outgoing.push(reverse);
    halfEdges.push(forward, reverse);
  };
  primitives.forEach((entity) => {
    const sorted = uniqueSortedParameters(parameters.get(entity));
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const start = sorted[index];
      const end = sorted[index + 1];
      const sweep = entity.type === 'CIRCLE' || entity.type === 'ELLIPSE' ? TWO_PI :
        entity.type === 'ARC' ? entityArcSweep(entity) :
          entity.type === 'ELLIPSE_ARC' ? ellipseSweep(entity) : 0;
      const parts = Math.max(1, Math.ceil(sweep * (end - start) / (Math.PI / 48)));
      for (let part = 0; part < parts; part += 1) {
        addEdge(entity, start + (end - start) * part / parts, start + (end - start) * (part + 1) / parts);
      }
    }
  });

  // A bridge cannot bound a finite planar face. Removing it also ignores hanging interior lines.
  let changed = true;
  while (changed) {
    changed = false;
    nodes.forEach((node) => {
      const active = node.outgoing.filter((edge) => edge.active);
      if (active.length !== 1) return;
      active[0].active = false;
      active[0].twin.active = false;
      changed = true;
    });
  }
  nodes.forEach((node) => sortNodeOutgoing(node, options.tolerance));

  const faces = [];
  halfEdges.forEach((start) => {
    if (!start.active || start.visited) return;
    const edges = [];
    let edge = start;
    for (let step = 0; step <= halfEdges.length; step += 1) {
      if (!edge.active || (edge.visited && edge !== start)) return;
      edge.visited = true;
      edges.push(edge);
      const outgoing = edge.to.outgoing.filter((candidate) => candidate.active);
      const reverseIndex = outgoing.indexOf(edge.twin);
      if (reverseIndex < 0) return;
      edge = outgoing[(reverseIndex - 1 + outgoing.length) % outgoing.length];
      if (edge === start) break;
    }
    if (edge !== start) return;
    const sourcePolygon = edges.map((item) => item.from.point);
    if (sourcePolygon.length < 3 || Math.abs(polygonSignedArea(sourcePolygon)) <= options.tolerance) return;
    const points = sourcePolygon.map((point) => finitePoint(point, options.invertY));
    if (points.some((point) => !point)) return;
    const id = `face-composite-${faces.length}`;
    const exactProfile = exactProfileFromCurvePieces(edges.map((item) => ({
      entity: item.entity, startParameter: item.startParameter, endParameter: item.endParameter,
    })), { id, tolerance: options.tolerance });
    // With the right-turn walk, finite faces are counter-clockwise while the
    // unbounded exterior is the opposite cycle over the same outer boundary.
    if (!exactProfile || exactProfile.orientation.outer !== 'ccw') return;
    const smoothProfileVertexIndices = edges
      .map((item, index) => edgesMeetTangentially(
        edges[(index - 1 + edges.length) % edges.length], item,
      ) ? index : -1)
      .filter((index) => index >= 0);
    const smoothProfileVertices = new Set(smoothProfileVertexIndices);
    const cadProfileVertexIndices = edges
      .map((_, index) => smoothProfileVertices.has(index) ? -1 : index)
      .filter((index) => index >= 0);
    faces.push({
      id, sourceEntity: null,
      sourceEntities: [...new Set(edges.map((item) => item.entity.sourceEntity || item.entity))],
      sourceEntityType: 'COMPOSITE', exactProfile, points,
      bounds: boundsFromPoints(points), area: polygonArea(points),
      cadProfileVertexIndices,
      smoothProfileVertexIndices,
    });
  });
  return faces;
}

export function detectSimpleClosedFaces(entities, options = {}) {
  const settings = {
    arcChordTolerance: options.arcChordTolerance,
    circleSegments: options.circleSegments,
    ellipseSegments: options.ellipseSegments,
    invertY: options.invertY !== false,
    maxArcSegmentAngle: options.maxArcSegmentAngle,
    maxArcSegments: options.maxArcSegments,
    tolerance: Number(options.tolerance) || SNAP_THRESHOLD,
  };
  const sourceEntities = Array.isArray(entities) ? entities : [];
  const arrangementFaces = arrangementClosedFaces(sourceEntities, settings);
  const arrangementSourceEntities = new Set(arrangementFaces.flatMap((face) => face.sourceEntities || []));
  const individualFaces = sourceEntities
    .map((entity, index) => {
      if (arrangementSourceEntities.has(entity)) return null;
      const profile = entity?.type === 'CIRCLE'
        ? circlePoints(entity, settings)
        : entity?.type === 'ELLIPSE'
          ? ellipsePoints(entity, settings)
        : null;
      if (!profile?.points) return null;
      const { points } = profile;
      const area = polygonArea(points);
      if (area <= settings.tolerance) return null;
      return {
        id: faceId(entity, index),
        sourceEntity: entity,
        sourceEntityType: entity.type,
        exactProfile: exactProfileFromEntity(entity),
        points,
        bounds: boundsFromPoints(points),
        area,
        cadProfileVertexIndices: profile.cadProfileVertexIndices ?? [],
        smoothProfileVertexIndices: profile.smoothProfileVertexIndices ?? [],
      };
    })
    .filter(Boolean);
  return regionsFromNestedFaces([
    ...individualFaces,
    ...arrangementFaces,
  ], settings.tolerance);
}

export function createFaceMesh(face) {
  const shape = new THREE.Shape(face.points.map((point) => new THREE.Vector2(point.x, point.y)));
  shape.holes = (face.holes || []).map((hole) => new THREE.Path(
    hole.map((point) => new THREE.Vector2(point.x, point.y)),
  ));
  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: FACE_DEFAULT_COLOR,
    depthTest: false,
    depthWrite: false,
    opacity: 1,
    side: THREE.DoubleSide,
    transparent: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `webcad-simple-face-${face.id}`;
  mesh.renderOrder = FACE_RENDER_ORDER;
  mesh.userData = {
    type: 'webcad-simple-face',
    faceId: face.id,
    face,
    defaultColor: FACE_DEFAULT_COLOR,
    selectedColor: FACE_SELECTED_COLOR,
  };
  return mesh;
}

/* webCAD - Recintos simples aislados para vista 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { exactProfileFromOrderedEntities } from '../exact-profile.js';

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

function compositeClosedFaces(entities, options) {
  const pieces = entities.map((entity, index) => {
    const piece = compositeCurvePiece(entity, options);
    return piece ? { ...piece, sourceIndex: index, startNode: null, endNode: null } : null;
  }).filter(Boolean);
  const nodes = [];
  const nodeForPoint = (point) => {
    const existing = nodes.find((node) => samePoint(node.point, point, options.tolerance));
    if (existing) return existing;
    const node = { point, pieces: [] };
    nodes.push(node);
    return node;
  };
  pieces.forEach((piece) => {
    piece.startNode = nodeForPoint(piece.points[0]);
    piece.endNode = nodeForPoint(piece.points[piece.points.length - 1]);
    piece.startNode.pieces.push(piece);
    piece.endNode.pieces.push(piece);
  });

  const faces = [];
  const visited = new Set();
  pieces.forEach((firstPiece) => {
    if (visited.has(firstPiece)) return;
    const component = [];
    const pending = [firstPiece];
    while (pending.length) {
      const piece = pending.pop();
      if (component.includes(piece)) continue;
      component.push(piece);
      for (const node of [piece.startNode, piece.endNode]) {
        node.pieces.forEach((connected) => pending.push(connected));
      }
    }
    component.forEach((piece) => visited.add(piece));
    const componentNodes = new Set(component.flatMap((piece) => [piece.startNode, piece.endNode]));
    if (component.length < 2 || [...componentNodes].some((node) => node.pieces.length !== 2)) return;

    const ordered = [];
    const used = new Set();
    let currentPiece = component[0];
    let currentNode = currentPiece.startNode;
    const startNode = currentNode;
    while (currentPiece && !used.has(currentPiece)) {
      const reversed = currentPiece.endNode === currentNode;
      ordered.push({ piece: currentPiece, reversed });
      used.add(currentPiece);
      currentNode = reversed ? currentPiece.startNode : currentPiece.endNode;
      currentPiece = currentNode.pieces.find((piece) => !used.has(piece)) || null;
    }
    if (used.size !== component.length || currentNode !== startNode) return;

    const points = [];
    const cadIndices = new Set();
    const smoothIndices = new Set();
    ordered.forEach(({ piece, reversed }, pieceIndex) => {
      const piecePoints = reversed ? [...piece.points].reverse() : piece.points;
      piecePoints.forEach((point, pointIndex) => {
        if (pieceIndex > 0 && pointIndex === 0) return;
        const index = points.length;
        points.push({ ...point });
        if (pointIndex === 0 || pointIndex === piecePoints.length - 1) cadIndices.add(index);
        else smoothIndices.add(index);
      });
    });
    if (points.length > 1 && samePoint(points[0], points[points.length - 1], options.tolerance)) {
      points.pop();
      cadIndices.add(0);
    }
    const area = polygonArea(points);
    if (points.length < 3 || area <= options.tolerance) return;
    const firstIndex = Math.min(...component.map((piece) => piece.sourceIndex));
    const id = `face-composite-${firstIndex}`;
    faces.push({
      id,
      sourceEntity: null,
      sourceEntities: ordered.map(({ piece }) => piece.entity),
      sourceEntityType: 'COMPOSITE',
      exactProfile: exactProfileFromOrderedEntities(
        ordered.map(({ piece, reversed }) => ({ entity: piece.entity, reversed })),
        { id },
      ),
      points,
      bounds: boundsFromPoints(points),
      area,
      cadProfileVertexIndices: [...cadIndices].filter((index) => index < points.length),
      smoothProfileVertexIndices: [...smoothIndices].filter((index) => index < points.length),
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
    tolerance: Number(options.tolerance) || 1e-9,
  };
  const sourceEntities = Array.isArray(entities) ? entities : [];
  const individualFaces = sourceEntities
    .map((entity, index) => {
      const profile = entity?.type === 'CIRCLE'
        ? circlePoints(entity, settings)
        : entity?.type === 'ELLIPSE'
          ? ellipsePoints(entity, settings)
        : entity?.type === 'POLYLINE'
          ? closedPolylinePoints(entity, settings)
          : null;
      if (!profile?.points) return null;
      const { points } = profile;
      const area = polygonArea(points);
      if (area <= settings.tolerance) return null;
      return {
        id: faceId(entity, index),
        sourceEntity: entity,
        sourceEntityType: entity.type,
        points,
        bounds: boundsFromPoints(points),
        area,
        cadProfileVertexIndices: profile.cadProfileVertexIndices ?? [],
        smoothProfileVertexIndices: profile.smoothProfileVertexIndices ?? [],
      };
    })
    .filter(Boolean);
  return [...individualFaces, ...compositeClosedFaces(sourceEntities, settings)];
}

export function createFaceMesh(face) {
  const shape = new THREE.Shape(face.points.map((point) => new THREE.Vector2(point.x, point.y)));
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

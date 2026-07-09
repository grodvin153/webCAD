/* webCAD - Renderer de alambre 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import { projectPoint3d } from './projection3d.js';

const DEFAULT_STROKE_STYLE = '#1f2937';
const DEFAULT_LINE_WIDTH = 1;

function copyPoint3d(point) {
  return { x: point.x, y: point.y, z: point.z };
}

function validVertexIndex(index, vertexCount) {
  return Number.isInteger(index) && index >= 0 && index < vertexCount;
}

function assertDrawingContext(ctx) {
  const requiredMethods = ['save', 'restore', 'beginPath', 'moveTo', 'lineTo', 'stroke'];
  if (!ctx || requiredMethods.some((method) => typeof ctx[method] !== 'function')) {
    throw new TypeError('Se necesita un contexto 2D valido para dibujar el alambre');
  }
}

export function buildWireframeSegments3d(solid) {
  if (!Array.isArray(solid?.vertices) || !Array.isArray(solid?.edges)) {
    throw new TypeError('El solido debe contener vertices y aristas');
  }

  const vertexCount = solid.vertices.length;
  return solid.edges.map((edge) => {
    if (!Array.isArray(edge) || edge.length !== 2 ||
        !validVertexIndex(edge[0], vertexCount) ||
        !validVertexIndex(edge[1], vertexCount)) {
      throw new RangeError('Una arista referencia un vertice inexistente');
    }
    const start = solid.vertices[edge[0]];
    const end = solid.vertices[edge[1]];
    if (![start?.x, start?.y, start?.z, end?.x, end?.y, end?.z].every(Number.isFinite)) {
      throw new TypeError('Una arista contiene vertices no validos');
    }
    return {
      start: copyPoint3d(start),
      end: copyPoint3d(end),
      edge: [...edge],
    };
  });
}

export function projectWireframeSegments(segments, camera, viewport) {
  if (!Array.isArray(segments)) {
    throw new TypeError('Los segmentos de alambre deben ser un array');
  }

  const projectedSegments = [];
  for (const segment of segments) {
    const projectedStart = projectPoint3d(segment?.start, camera, viewport);
    const projectedEnd = projectPoint3d(segment?.end, camera, viewport);
    if (!projectedStart || !projectedEnd) {
      continue;
    }
    projectedSegments.push({
      start: { x: projectedStart.x, y: projectedStart.y },
      end: { x: projectedEnd.x, y: projectedEnd.y },
      source: segment,
    });
  }
  return projectedSegments;
}

export function drawWireframe(ctx, projectedSegments, options = {}) {
  assertDrawingContext(ctx);
  if (!Array.isArray(projectedSegments)) {
    throw new TypeError('Los segmentos proyectados deben ser un array');
  }
  const requestedLineWidth = Number(options.lineWidth);
  const lineWidth = Number.isFinite(requestedLineWidth) && requestedLineWidth > 0
    ? requestedLineWidth
    : DEFAULT_LINE_WIDTH;

  ctx.save();
  try {
    ctx.strokeStyle = options.strokeStyle ?? DEFAULT_STROKE_STYLE;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (const segment of projectedSegments) {
      if (![segment?.start?.x, segment?.start?.y, segment?.end?.x, segment?.end?.y]
        .every(Number.isFinite)) {
        throw new TypeError('El alambre contiene coordenadas proyectadas no validas');
      }
      ctx.moveTo(segment.start.x, segment.start.y);
      ctx.lineTo(segment.end.x, segment.end.y);
    }
    ctx.stroke();
  }
  finally {
    ctx.restore();
  }
}

export function renderSolidWireframe(ctx, solid, camera, viewport, options = {}) {
  const segments = buildWireframeSegments3d(solid);
  const projectedSegments = projectWireframeSegments(segments, camera, viewport);
  drawWireframe(ctx, projectedSegments, options);
  return projectedSegments;
}

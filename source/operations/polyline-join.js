/* webCAD - Union sencilla de lineas y polilineas | SPDX-License-Identifier: GPL-3.0-or-later */

function clonePoint(point) {
  return { x: point.x, y: point.y, z: point.z ?? 0 };
}

export function isPolylineJoinCompatibleEntity(entity) {
  return entity?.type === 'LINE' || entity?.type === 'POLYLINE' || entity?.type === 'ARC';
}

function samePoint(first, second, tolerance) {
  return Math.hypot(first.x - second.x, first.y - second.y) <= tolerance;
}

function pointAtAngle(center, radius, angle) {
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    z: center.z ?? 0,
  };
}

function cleanSegment(segment) {
  return {
    type: segment?.type === 'ARC' ? 'ARC' : 'LINE',
    center: segment?.center ? clonePoint(segment.center) : null,
    clockwise: segment?.clockwise !== false,
    startWidth: Math.max(0, Number(segment?.startWidth) || 0),
    endWidth: Math.max(0, Number(segment?.endWidth) || 0),
  };
}

function reverseSegment(segment) {
  return {
    ...cleanSegment(segment),
    center: segment?.center ? clonePoint(segment.center) : null,
    clockwise: segment?.type === 'ARC' ? segment.clockwise === false : segment?.clockwise !== false,
    startWidth: Math.max(0, Number(segment?.endWidth) || 0),
    endWidth: Math.max(0, Number(segment?.startWidth) || 0),
  };
}

function entityStyle(entity) {
  return {
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  };
}

function sameStyle(first, second) {
  return first.layer === second.layer &&
    first.lineStyle === second.lineStyle &&
    first.lineType === second.lineType &&
    first.lineColor === second.lineColor;
}

function pieceFromEntity(entity, tolerance) {
  if (entity?.type === 'LINE') {
    if (samePoint(entity.start, entity.end, tolerance)) return null;
    return {
      entity,
      vertices: [clonePoint(entity.start), clonePoint(entity.end)],
      segments: [{ type: 'LINE', center: null, clockwise: true, startWidth: 0, endWidth: 0 }],
      style: entityStyle(entity),
    };
  }
  if (entity?.type === 'ARC') {
    if (!Number.isFinite(entity.radius) || entity.radius <= tolerance) return null;
    return {
      entity,
      vertices: [
        pointAtAngle(entity.center, entity.radius, entity.startAngle),
        pointAtAngle(entity.center, entity.radius, entity.endAngle),
      ],
      segments: [{
        type: 'ARC',
        center: clonePoint(entity.center),
        clockwise: entity.clockwise !== false,
        startWidth: 0,
        endWidth: 0,
      }],
      style: entityStyle(entity),
    };
  }
  if (entity?.type === 'POLYLINE') {
    if (entity.closed) {
      return { error: 'Las polilineas cerradas mezcladas con otras entidades no son compatibles todavia' };
    }
    if (!Array.isArray(entity.vertices) || entity.vertices.length < 2) return null;
    const vertices = entity.vertices.map(clonePoint);
    const segments = entity.segments.map(cleanSegment);
    if (segments.length !== vertices.length - 1) {
      return { error: 'Polilinea no compatible para unir' };
    }
    return { entity, vertices, segments, style: entityStyle(entity) };
  }
  return { error: 'La seleccion contiene tipos no compatibles' };
}

function reversedPiece(piece) {
  return {
    ...piece,
    vertices: piece.vertices.slice().reverse().map(clonePoint),
    segments: piece.segments.slice().reverse().map(reverseSegment),
  };
}

function startPoint(piece) {
  return piece.vertices[0];
}

function endPoint(piece) {
  return piece.vertices[piece.vertices.length - 1];
}

function endpointClusters(pieces, tolerance) {
  const clusters = [];
  function clusterFor(point) {
    let cluster = clusters.find((candidate) => samePoint(candidate.point, point, tolerance));
    if (!cluster) {
      cluster = { point: clonePoint(point), endpoints: [] };
      clusters.push(cluster);
    }
    return cluster;
  }
  pieces.forEach((piece, index) => {
    const first = clusterFor(startPoint(piece));
    const last = clusterFor(endPoint(piece));
    first.endpoints.push({ pieceIndex: index, end: 'start' });
    last.endpoints.push({ pieceIndex: index, end: 'end' });
    piece.startCluster = first;
    piece.endCluster = last;
  });
  return clusters;
}

function nextUnusedPiece(cluster, used) {
  return cluster.endpoints.find((endpoint) => !used.has(endpoint.pieceIndex)) || null;
}

function orderPieces(pieces, clusters) {
  const degreeOne = clusters.filter((cluster) => cluster.endpoints.length === 1);
  const invalid = clusters.find((cluster) => cluster.endpoints.length > 2);
  if (invalid) return { error: 'La seleccion forma ramas y no una unica cadena' };
  if (degreeOne.length !== 0 && degreeOne.length !== 2) {
    return { error: 'La seleccion contiene varios grupos desconectados o extremos sin conectar' };
  }

  const closed = degreeOne.length === 0;
  let currentCluster = closed ? pieces[0].startCluster : degreeOne[0];
  const ordered = [];
  const used = new Set();
  while (ordered.length < pieces.length) {
    const endpoint = nextUnusedPiece(currentCluster, used);
    if (!endpoint) break;
    used.add(endpoint.pieceIndex);
    const piece = pieces[endpoint.pieceIndex];
    const oriented = piece.startCluster === currentCluster ? piece : reversedPiece(piece);
    ordered.push(oriented);
    currentCluster = piece.startCluster === currentCluster ? piece.endCluster : piece.startCluster;
  }
  if (ordered.length !== pieces.length) {
    return { error: 'La seleccion contiene varios grupos desconectados' };
  }
  if (!closed && currentCluster.endpoints.length !== 1) {
    return { error: 'Los extremos no coinciden dentro de la tolerancia' };
  }
  return { closed, ordered };
}

function connectedPieceComponents(pieces, tolerance) {
  endpointClusters(pieces, tolerance);
  const pending = new Set(pieces.map((_, index) => index));
  const components = [];
  while (pending.size) {
    const firstIndex = pending.values().next().value;
    const stack = [firstIndex];
    const component = [];
    pending.delete(firstIndex);
    while (stack.length) {
      const index = stack.pop();
      const piece = pieces[index];
      component.push(piece);
      for (const cluster of [piece.startCluster, piece.endCluster]) {
        for (const endpoint of cluster.endpoints) {
          if (!pending.has(endpoint.pieceIndex)) continue;
          pending.delete(endpoint.pieceIndex);
          stack.push(endpoint.pieceIndex);
        }
      }
    }
    components.push(component);
  }
  return components;
}

function appendPiece(targetVertices, targetSegments, piece, tolerance) {
  const startOffset = targetVertices.length && samePoint(targetVertices[targetVertices.length - 1], piece.vertices[0], tolerance)
    ? 1
    : 0;
  for (let index = startOffset; index < piece.vertices.length; index += 1) {
    targetVertices.push(clonePoint(piece.vertices[index]));
  }
  targetSegments.push(...piece.segments.map(cleanSegment));
}

function removeConsecutiveDuplicates(vertices, segments, tolerance) {
  for (let index = vertices.length - 1; index > 0; index -= 1) {
    if (!samePoint(vertices[index - 1], vertices[index], tolerance)) continue;
    vertices.splice(index, 1);
    segments.splice(Math.max(0, index - 1), 1);
  }
}

function cleanClosure(vertices, segments, closed, tolerance) {
  removeConsecutiveDuplicates(vertices, segments, tolerance);
  if (!closed || vertices.length < 2) return false;
  while (segments.length && samePoint(vertices[vertices.length - 1], vertices[0], tolerance)) {
    vertices.pop();
    if (segments.length > vertices.length) segments.pop();
    break;
  }
  while (vertices.length > 2 && segments.length >= vertices.length) {
    const closingSegment = segments[segments.length - 1];
    const previous = vertices[vertices.length - 1];
    const first = vertices[0];
    if (!samePoint(previous, first, tolerance)) break;
    vertices.pop();
    segments.pop();
    if (closingSegment?.type !== 'LINE') break;
  }
  return vertices.length >= 3 && segments.length === vertices.length;
}

function polylineFromOrderedPieces(ordered, closed, style, PolylineEntity, tolerance) {
  const vertices = [];
  const segments = [];
  ordered.forEach((piece) => appendPiece(vertices, segments, piece, tolerance));
  let finalClosed = closed || samePoint(vertices[0], vertices[vertices.length - 1], tolerance);
  if (finalClosed) finalClosed = cleanClosure(vertices, segments, true, tolerance);
  else removeConsecutiveDuplicates(vertices, segments, tolerance);
  if (vertices.length < 2 || segments.length !== (finalClosed ? vertices.length : vertices.length - 1)) {
    return null;
  }
  return new PolylineEntity(vertices, segments, {
    closed: finalClosed,
    ...style,
  });
}

function piecesFromEntities(entities, tolerance, { ignoreErrors = false } = {}) {
  const pieces = [];
  let ignoredCount = 0;
  for (const entity of entities) {
    const piece = pieceFromEntity(entity, tolerance);
    if (piece?.error) {
      if (!ignoreErrors) return { error: piece.error };
      ignoredCount += 1;
      continue;
    }
    if (piece) pieces.push(piece);
    else ignoredCount += 1;
  }
  return { pieces, ignoredCount };
}

export function joinPolylineEntities(entities, { PolylineEntity, tolerance }) {
  if (!Array.isArray(entities) || entities.length < 2) {
    return { ok: false, message: 'Seleccione al menos dos lineas o polilineas' };
  }
  const { pieces, error } = piecesFromEntities(entities, tolerance);
  if (error) return { ok: false, message: error };
  if (pieces.length < 2) {
    return { ok: false, message: 'Seleccione al menos dos lineas o polilineas validas' };
  }
  const style = pieces[0].style;
  if (pieces.some((piece) => !sameStyle(style, piece.style))) {
    return { ok: false, message: 'Las entidades deben compartir capa, color, tipo y grosor de linea' };
  }
  const clusters = endpointClusters(pieces, tolerance);
  const orderedResult = orderPieces(pieces, clusters);
  if (orderedResult.error) return { ok: false, message: orderedResult.error };

  const polyline = polylineFromOrderedPieces(
    orderedResult.ordered,
    orderedResult.closed,
    style,
    PolylineEntity,
    tolerance,
  );
  if (!polyline) {
    return { ok: false, message: 'No se pudo construir una polilinea limpia' };
  }

  return {
    ok: true,
    polyline,
  };
}

export function joinClosedPolylineLoops(entities, { PolylineEntity, tolerance }) {
  if (!Array.isArray(entities) || entities.length < 2) {
    return {
      ok: false,
      message: 'No se encontraron recintos cerrados.',
      polylines: [],
      usedEntities: [],
      ignoredCount: Array.isArray(entities) ? entities.length : 0,
    };
  }

  const { pieces } = piecesFromEntities(entities, tolerance, { ignoreErrors: true });
  const polylines = [];
  const usedEntities = [];

  for (const component of connectedPieceComponents(pieces, tolerance)) {
    if (component.length < 2) continue;
    const clusters = endpointClusters(component, tolerance);
    if (clusters.some((cluster) => cluster.endpoints.length !== 2)) continue;
    const style = component[0].style;
    if (component.some((piece) => !sameStyle(style, piece.style))) continue;
    const orderedResult = orderPieces(component, clusters);
    if (orderedResult.error || !orderedResult.closed) continue;
    const polyline = polylineFromOrderedPieces(
      orderedResult.ordered,
      true,
      style,
      PolylineEntity,
      tolerance,
    );
    if (!polyline?.closed) continue;
    polylines.push(polyline);
    usedEntities.push(...component.map((piece) => piece.entity));
  }

  const usedSet = new Set(usedEntities);
  const ignoredCount = entities.filter((entity) => !usedSet.has(entity)).length;
  if (!polylines.length) {
    return {
      ok: false,
      message: 'No se encontraron recintos cerrados.',
      polylines,
      usedEntities,
      ignoredCount,
    };
  }
  return {
    ok: true,
    message: `Se cerraron ${polylines.length} recinto${polylines.length === 1 ? '' : 's'}; ${ignoredCount} entidad${ignoredCount === 1 ? '' : 'es'} fueron ignoradas.`,
    polylines,
    usedEntities,
    ignoredCount,
  };
}

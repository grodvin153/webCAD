/* webCAD - Geometria pura de equidistancias | SPDX-License-Identifier: GPL-3.0-or-later */

export function createOffsetGeometry({
  SNAP_THRESHOLD,
  angleOfPoint,
  circleCircleIntersectionPoints,
  distance,
  entityDistanceToPoint,
  infiniteLineCircularIntersectionPoints,
  infiniteLineLineIntersection,
  normalizedVector,
  pointAtCircleAngle,
  polylineSegmentEntity,
}) {
  const styleOf = (entity) => ({
    layer: entity.layer,
    lineStyle: entity.lineStyle,
    lineType: entity.lineType,
    lineColor: entity.lineColor,
  });

  function lineSide(line, point) {
    const start = line.type === 'XLINE' ? line.basePoint : line.start;
    const direction = line.type === 'XLINE'
      ? line.direction
      : normalizedVector(line.start, line.end);
    if (!direction) return 0;
    const cross = direction.x * (point.y - start.y) - direction.y * (point.x - start.x);
    return cross >= 0 ? 1 : -1;
  }

  function circularSide(curve, point) {
    const outside = distance(curve.center, point) >= curve.radius;
    if (curve.type === 'CIRCLE') return outside ? 1 : -1;
    const outwardSide = curve.clockwise === false ? 1 : -1;
    return outside ? outwardSide : -outwardSide;
  }

  function sideForPrimitive(primitive, point) {
    return primitive.type === 'LINE' || primitive.type === 'XLINE'
      ? lineSide(primitive, point)
      : circularSide(primitive, point);
  }

  function offsetXLine(line, offset, side) {
    const vector = {
      x: -line.direction.y * offset * side,
      y: line.direction.x * offset * side,
    };
    return {
      type: 'XLINE',
      basePoint: {
        x: line.basePoint.x + vector.x,
        y: line.basePoint.y + vector.y,
        z: line.basePoint.z || 0,
      },
      direction: { ...line.direction },
    };
  }

  function offsetLine(line, offset, side) {
    const direction = normalizedVector(line.start, line.end);
    if (!direction) return null;
    const vector = { x: -direction.y * offset * side, y: direction.x * offset * side };
    return {
      type: 'LINE',
      start: { x: line.start.x + vector.x, y: line.start.y + vector.y, z: line.start.z || 0 },
      end: { x: line.end.x + vector.x, y: line.end.y + vector.y, z: line.end.z || 0 },
      direction,
    };
  }

  function offsetCircular(curve, offset, side) {
    const radiusDelta = curve.type === 'CIRCLE'
      ? offset * side
      : offset * side * (curve.clockwise === false ? 1 : -1);
    const radius = curve.radius + radiusDelta;
    if (radius <= SNAP_THRESHOLD) return null;
    if (curve.type === 'CIRCLE') {
      return { type: 'CIRCLE', center: { ...curve.center }, radius };
    }
    return {
      type: 'ARC',
      center: { ...curve.center },
      radius,
      startAngle: curve.startAngle,
      endAngle: curve.endAngle,
      clockwise: curve.clockwise !== false,
      start: pointAtCircleAngle({ center: curve.center, radius }, curve.startAngle),
      end: pointAtCircleAngle({ center: curve.center, radius }, curve.endAngle),
    };
  }

  function offsetPrimitive(primitive, offset, side) {
    if (primitive.type === 'XLINE') return offsetXLine(primitive, offset, side);
    return primitive.type === 'LINE'
      ? offsetLine(primitive, offset, side)
      : offsetCircular(primitive, offset, side);
  }

  function nearestPoint(points, reference) {
    return [...points].sort((first, second) =>
      distance(first, reference) - distance(second, reference))[0] || null;
  }

  function primitiveIntersection(first, second, reference) {
    if (first.type === 'LINE' && second.type === 'LINE') {
      return infiniteLineLineIntersection(first.start, first.direction, second.start, second.direction);
    }
    if (first.type === 'LINE') {
      return nearestPoint(infiniteLineCircularIntersectionPoints(
        first.start, first.direction, second, false,
      ), reference);
    }
    if (second.type === 'LINE') {
      return nearestPoint(infiniteLineCircularIntersectionPoints(
        second.start, second.direction, first, false,
      ), reference);
    }
    return nearestPoint(circleCircleIntersectionPoints(first, second), reference);
  }

  function offsetPolyline(entity, offset, side, createPolyline) {
    const originals = entity.segments.map((_, index) => polylineSegmentEntity(entity, index));
    const shifted = originals.map((primitive) => primitive && offsetPrimitive(primitive, offset, side));
    if (shifted.some((primitive) => !primitive)) return null;

    const joins = [];
    const joinCount = entity.closed ? shifted.length : shifted.length - 1;
    for (let index = 0; index < joinCount; index += 1) {
      const nextIndex = (index + 1) % shifted.length;
      const originalVertex = entity.vertices[nextIndex];
      const intersection = primitiveIntersection(shifted[index], shifted[nextIndex], originalVertex);
      if (!intersection) return null;
      joins[index] = intersection;
    }

    const vertices = entity.closed
      ? shifted.map((_, index) => ({ ...joins[(index - 1 + shifted.length) % shifted.length] }))
      : [
        { ...shifted[0].start },
        ...joins.map((point) => ({ ...point })),
        { ...shifted[shifted.length - 1].end },
      ];
    const segments = entity.segments.map((segment, index) => ({
      type: segment.type,
      center: shifted[index].type === 'ARC' ? { ...shifted[index].center } : null,
      clockwise: segment.clockwise !== false,
      startWidth: segment.startWidth,
      endWidth: segment.endWidth,
    }));
    return createPolyline(vertices, segments, { ...styleOf(entity), closed: entity.closed });
  }

  function offsetEntity(entity, pickPoint, sidePoint, offset, factories) {
    if (!entity || !(offset > SNAP_THRESHOLD)) return null;
    if (entity.type === 'POLYLINE') {
      let nearest = null;
      entity.segments.forEach((_, index) => {
        const primitive = polylineSegmentEntity(entity, index);
        if (!primitive) return;
        const score = entityDistanceToPoint(primitive, pickPoint);
        if (!nearest || score < nearest.score) nearest = { primitive, score };
      });
      if (!nearest) return null;
      const side = sideForPrimitive(nearest.primitive, sidePoint);
      return offsetPolyline(entity, offset, side, factories.createPolyline);
    }
    if (!['LINE', 'XLINE', 'CIRCLE', 'ARC'].includes(entity.type)) return null;
    const shifted = offsetPrimitive(entity, offset, sideForPrimitive(entity, sidePoint));
    if (!shifted) return null;
    if (shifted.type === 'LINE') {
      return factories.createLine(shifted.start, shifted.end, styleOf(entity));
    }
    if (shifted.type === 'XLINE') {
      return factories.createXLine(shifted.basePoint, shifted.direction, styleOf(entity));
    }
    if (shifted.type === 'CIRCLE') {
      return factories.createCircle(shifted.center, shifted.radius, styleOf(entity));
    }
    return factories.createArc(
      shifted.center,
      shifted.radius,
      shifted.startAngle,
      shifted.endAngle,
      { ...styleOf(entity), clockwise: shifted.clockwise },
    );
  }

  return { offsetEntity, sideForPrimitive };
}

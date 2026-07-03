/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createFilletGeometry(dependencies) {
  const {
    SNAP_THRESHOLD,
    angleOfPoint,
    circleCircleIntersectionPoints,
    circularParameter,
    clamp,
    closestPointOnLineSegment,
    distance,
    dotProduct,
    entityDistanceToPoint,
    infiniteLineCircularIntersectionPoints,
    infiniteLineLineIntersection,
    isCircularEntity,
    normalizeAngle,
    normalizedVector,
    pointAtCircleAngle,
    pointOnCircularEntity,
    polylineSegmentEntity,
    projectPointToLine,
    rawLineParameter,
  } = dependencies;

  function filletRayDirection(line, intersection, pickPoint) {
    const projectedPick = closestPointOnLineSegment(line, pickPoint);
    let direction = normalizedVector(intersection, projectedPick);
    if (direction) {
      return direction;
    }
    const preferredEndpoint = distance(pickPoint, line.start) <= distance(pickPoint, line.end)
      ? line.start
      : line.end;
    direction = normalizedVector(intersection, preferredEndpoint);
    return direction || normalizedVector(line.start, line.end);
  }

  function lineFilletGeometry(firstLine, firstPick, secondLine, secondPick, radius) {
    if (
      firstLine?.type !== 'LINE' || secondLine?.type !== 'LINE' ||
      firstLine === secondLine || !(radius > SNAP_THRESHOLD)
    ) {
      return { valid: false, reason: 'Seleccione dos lineas distintas' };
    }
    const firstDirection = normalizedVector(firstLine.start, firstLine.end);
    const secondDirection = normalizedVector(secondLine.start, secondLine.end);
    if (!firstDirection || !secondDirection) {
      return { valid: false, reason: 'Una de las lineas no tiene longitud' };
    }
    const intersection = infiniteLineLineIntersection(
      firstLine.start,
      firstDirection,
      secondLine.start,
      secondDirection,
    );
    if (!intersection) {
      return { valid: false, reason: 'Las lineas son paralelas' };
    }

    const firstRay = filletRayDirection(firstLine, intersection, firstPick);
    const secondRay = filletRayDirection(secondLine, intersection, secondPick);
    if (!firstRay || !secondRay) {
      return { valid: false, reason: 'No se pudo determinar el lado del empalme' };
    }
    const angle = Math.acos(clamp(dotProduct(firstRay, secondRay), -1, 1));
    const halfAngle = angle * 0.5;
    if (halfAngle <= SNAP_THRESHOLD || Math.PI * 0.5 - halfAngle <= SNAP_THRESHOLD) {
      return { valid: false, reason: 'Las lineas no forman un angulo valido' };
    }

    const tangentDistance = radius / Math.tan(halfAngle);
    const centerDistance = radius / Math.sin(halfAngle);
    const bisector = normalizedVector(
      { x: 0, y: 0 },
      { x: firstRay.x + secondRay.x, y: firstRay.y + secondRay.y },
    );
    if (!bisector || !Number.isFinite(tangentDistance) || !Number.isFinite(centerDistance)) {
      return { valid: false, reason: 'No se pudo calcular el empalme' };
    }

    const firstScores = [
      dotProduct({ x: firstLine.start.x - intersection.x, y: firstLine.start.y - intersection.y }, firstRay),
      dotProduct({ x: firstLine.end.x - intersection.x, y: firstLine.end.y - intersection.y }, firstRay),
    ];
    const secondScores = [
      dotProduct({ x: secondLine.start.x - intersection.x, y: secondLine.start.y - intersection.y }, secondRay),
      dotProduct({ x: secondLine.end.x - intersection.x, y: secondLine.end.y - intersection.y }, secondRay),
    ];
    if (
      tangentDistance >= Math.max(...firstScores) - SNAP_THRESHOLD ||
      tangentDistance >= Math.max(...secondScores) - SNAP_THRESHOLD
    ) {
      return { valid: false, reason: 'El radio es demasiado grande para esas lineas' };
    }

    const firstTangent = {
      x: intersection.x + firstRay.x * tangentDistance,
      y: intersection.y + firstRay.y * tangentDistance,
    };
    const secondTangent = {
      x: intersection.x + secondRay.x * tangentDistance,
      y: intersection.y + secondRay.y * tangentDistance,
    };
    const center = {
      x: intersection.x + bisector.x * centerDistance,
      y: intersection.y + bisector.y * centerDistance,
    };
    const startAngle = angleOfPoint(center, firstTangent);
    const endAngle = angleOfPoint(center, secondTangent);
    const clockwise = normalizeAngle(endAngle - startAngle) <= Math.PI;
    return {
      valid: true,
      center,
      radius,
      startAngle,
      endAngle,
      clockwise,
      firstTangent,
      secondTangent,
      firstEndpoint: firstScores[0] <= firstScores[1] ? 'start' : 'end',
      secondEndpoint: secondScores[0] <= secondScores[1] ? 'start' : 'end',
    };
  }

  function filletOperandAt(entity, pickPoint) {
    if (!entity || !pickPoint) {
      return null;
    }
    if (entity.type === 'LINE' || entity.type === 'CIRCLE' || entity.type === 'ARC') {
      return { entity, primitive: entity, segmentIndex: null, pickPoint: { ...pickPoint } };
    }
    if (entity.type !== 'POLYLINE') {
      return null;
    }
    let nearest = null;
    entity.segments.forEach((_, segmentIndex) => {
      const primitive = polylineSegmentEntity(entity, segmentIndex);
      if (!primitive) {
        return;
      }
      const candidateDistance = entityDistanceToPoint(primitive, pickPoint);
      if (!nearest || candidateDistance < nearest.distance) {
        nearest = { primitive, segmentIndex, distance: candidateDistance };
      }
    });
    return nearest
      ? {
        entity,
        primitive: nearest.primitive,
        segmentIndex: nearest.segmentIndex,
        pickPoint: { ...pickPoint },
      }
      : null;
  }

  function filletCenterLoci(operand, radius) {
    const primitive = operand?.primitive;
    if (!primitive || !(radius > SNAP_THRESHOLD)) {
      return [];
    }
    if (primitive.type === 'LINE') {
      const direction = normalizedVector(primitive.start, primitive.end);
      if (!direction) {
        return [];
      }
      const normal = { x: -direction.y, y: direction.x };
      return [-1, 1].map((side) => ({
        type: 'line',
        point: {
          x: primitive.start.x + normal.x * radius * side,
          y: primitive.start.y + normal.y * radius * side,
        },
        direction,
        side,
      }));
    }
    if (!isCircularEntity(primitive)) {
      return [];
    }
    const loci = [{
      type: 'circle',
      center: primitive.center,
      radius: primitive.radius + radius,
      mode: 'sum',
    }];
    const differenceRadius = Math.abs(primitive.radius - radius);
    if (differenceRadius > SNAP_THRESHOLD) {
      loci.push({
        type: 'circle',
        center: primitive.center,
        radius: differenceRadius,
        mode: 'difference',
      });
    }
    return loci;
  }

  function filletLocusIntersections(first, second) {
    if (first.type === 'line' && second.type === 'line') {
      const point = infiniteLineLineIntersection(
        first.point,
        first.direction,
        second.point,
        second.direction,
      );
      return point ? [point] : [];
    }
    if (first.type === 'line' && second.type === 'circle') {
      return infiniteLineCircularIntersectionPoints(
        first.point,
        first.direction,
        { type: 'CIRCLE', center: second.center, radius: second.radius },
        false,
      );
    }
    if (first.type === 'circle' && second.type === 'line') {
      return infiniteLineCircularIntersectionPoints(
        second.point,
        second.direction,
        { type: 'CIRCLE', center: first.center, radius: first.radius },
        false,
      );
    }
    if (first.type === 'circle' && second.type === 'circle') {
      return circleCircleIntersectionPoints(first, second);
    }
    return [];
  }

  function filletTangentPoint(operand, locus, center, radius) {
    const primitive = operand.primitive;
    if (primitive.type === 'LINE') {
      return projectPointToLine(center, primitive.start, {
        x: primitive.end.x - primitive.start.x,
        y: primitive.end.y - primitive.start.y,
      });
    }
    const direction = normalizedVector(primitive.center, center);
    if (!direction) {
      return null;
    }
    const tangentDirection = locus.mode === 'difference' && radius > primitive.radius
      ? { x: -direction.x, y: -direction.y }
      : direction;
    return {
      x: primitive.center.x + tangentDirection.x * primitive.radius,
      y: primitive.center.y + tangentDirection.y * primitive.radius,
    };
  }

  function filletPrimitiveIntersections(firstPrimitive, secondPrimitive) {
    if (firstPrimitive.type === 'LINE' && secondPrimitive.type === 'LINE') {
      const firstDirection = normalizedVector(firstPrimitive.start, firstPrimitive.end);
      const secondDirection = normalizedVector(secondPrimitive.start, secondPrimitive.end);
      if (!firstDirection || !secondDirection) {
        return [];
      }
      const point = infiniteLineLineIntersection(
        firstPrimitive.start,
        firstDirection,
        secondPrimitive.start,
        secondDirection,
      );
      return point ? [point] : [];
    }
    if (firstPrimitive.type === 'LINE' && isCircularEntity(secondPrimitive)) {
      const direction = normalizedVector(firstPrimitive.start, firstPrimitive.end);
      return direction
        ? infiniteLineCircularIntersectionPoints(firstPrimitive.start, direction, secondPrimitive, false)
        : [];
    }
    if (isCircularEntity(firstPrimitive) && secondPrimitive.type === 'LINE') {
      return filletPrimitiveIntersections(secondPrimitive, firstPrimitive);
    }
    if (isCircularEntity(firstPrimitive) && isCircularEntity(secondPrimitive)) {
      return circleCircleIntersectionPoints(firstPrimitive, secondPrimitive);
    }
    return [];
  }

  function filletSolutionScore(solution, firstOperand, secondOperand) {
    let score = distance(solution.firstTangent, firstOperand.pickPoint) +
      distance(solution.secondTangent, secondOperand.pickPoint);
    if (
      firstOperand.primitive.type === 'ARC' &&
      !pointOnCircularEntity(solution.firstTangent, firstOperand.primitive)
    ) {
      score += firstOperand.primitive.radius * 2;
    }
    if (
      secondOperand.primitive.type === 'ARC' &&
      !pointOnCircularEntity(solution.secondTangent, secondOperand.primitive)
    ) {
      score += secondOperand.primitive.radius * 2;
    }
    return score;
  }

  function filletSolutions(firstOperand, secondOperand, radius) {
    if (!firstOperand || !secondOperand || firstOperand.entity === secondOperand.entity &&
        firstOperand.segmentIndex === secondOperand.segmentIndex) {
      return [];
    }
    if (radius <= SNAP_THRESHOLD) {
      return filletPrimitiveIntersections(firstOperand.primitive, secondOperand.primitive)
        .map((point) => ({
          valid: true,
          radius: 0,
          firstTangent: point,
          secondTangent: point,
          center: point,
          score: distance(point, firstOperand.pickPoint) + distance(point, secondOperand.pickPoint),
        }))
        .sort((first, second) => first.score - second.score);
    }

    const solutions = [];
    for (const firstLocus of filletCenterLoci(firstOperand, radius)) {
      for (const secondLocus of filletCenterLoci(secondOperand, radius)) {
        for (const center of filletLocusIntersections(firstLocus, secondLocus)) {
          const firstTangent = filletTangentPoint(firstOperand, firstLocus, center, radius);
          const secondTangent = filletTangentPoint(secondOperand, secondLocus, center, radius);
          if (
            !firstTangent || !secondTangent ||
            distance(firstTangent, secondTangent) <= SNAP_THRESHOLD
          ) {
            continue;
          }
          const startAngle = angleOfPoint(center, firstTangent);
          const endAngle = angleOfPoint(center, secondTangent);
          const clockwise = normalizeAngle(endAngle - startAngle) <= Math.PI;
          const solution = {
            valid: true,
            radius,
            center,
            firstTangent,
            secondTangent,
            startAngle,
            endAngle,
            clockwise,
          };
          solution.score = filletSolutionScore(solution, firstOperand, secondOperand);
          if (!solutions.some((candidate) =>
            distance(candidate.center, center) <= SNAP_THRESHOLD * 10)) {
            solutions.push(solution);
          }
        }
      }
    }
    return solutions.sort((first, second) => first.score - second.score);
  }

  function filletEndpointKey(primitive, tangentPoint, pickPoint) {
    if (primitive.type === 'LINE') {
      const direction = normalizedVector(primitive.start, primitive.end);
      if (!direction) {
        return null;
      }
      const tangentParameter = rawLineParameter(primitive, tangentPoint);
      const pickParameter = rawLineParameter(primitive, closestPointOnLineSegment(primitive, pickPoint));
      if (Math.abs(pickParameter - tangentParameter) > SNAP_THRESHOLD) {
        return pickParameter < tangentParameter ? 'end' : 'start';
      }
      return distance(primitive.start, tangentPoint) <= distance(primitive.end, tangentPoint)
        ? 'start'
        : 'end';
    }
    if (primitive.type === 'ARC') {
      const tangentOnArc = pointOnCircularEntity(tangentPoint, primitive);
      if (tangentOnArc) {
        const tangentParameter = circularParameter(primitive, tangentPoint);
        const pickParameter = circularParameter(primitive, pickPoint);
        return pickParameter < tangentParameter ? 'end' : 'start';
      }
      const start = pointAtCircleAngle(primitive, primitive.startAngle);
      const end = pointAtCircleAngle(primitive, primitive.endAngle);
      return distance(start, tangentPoint) <= distance(end, tangentPoint) ? 'start' : 'end';
    }
    return null;
  }

  return {
    filletRayDirection,
    lineFilletGeometry,
    filletOperandAt,
    filletCenterLoci,
    filletLocusIntersections,
    filletTangentPoint,
    filletPrimitiveIntersections,
    filletSolutionScore,
    filletSolutions,
    filletEndpointKey,
  };
}

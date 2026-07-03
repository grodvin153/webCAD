/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createFilletApplication(dependencies) {
  const {
    ArcEntity,
    SNAP_THRESHOLD,
    angleOfPoint,
    filletEndpointKey,
    lineFilletGeometry,
  } = dependencies;

  function applyLineFillet(doc, firstLine, firstPick, secondLine, secondPick, radius) {
    const geometry = lineFilletGeometry(firstLine, firstPick, secondLine, secondPick, radius);
    if (!geometry.valid) {
      return geometry;
    }
    doc.recordHistory();
    firstLine[geometry.firstEndpoint] = { ...geometry.firstTangent };
    secondLine[geometry.secondEndpoint] = { ...geometry.secondTangent };
    const arc = new ArcEntity(
      geometry.center,
      geometry.radius,
      geometry.startAngle,
      geometry.endAngle,
      {
        clockwise: geometry.clockwise,
        layer: firstLine.layer,
        lineStyle: firstLine.lineStyle,
        lineType: firstLine.lineType,
        lineColor: firstLine.lineColor,
      },
    );
    doc.addEntity(arc, { recordHistory: false });
    doc.clearSelection();
    doc.markDirty();
    return { ...geometry, arc };
  }

  function setFilletOperandTangent(operand, tangentPoint) {
    const primitive = operand.primitive;
    if (primitive.type === 'CIRCLE') {
      return false;
    }
    const endpointKey = filletEndpointKey(primitive, tangentPoint, operand.pickPoint);
    if (!endpointKey) {
      return false;
    }
    if (operand.entity.type === 'LINE') {
      operand.entity[endpointKey] = { ...tangentPoint };
      return true;
    }
    if (operand.entity.type === 'ARC') {
      operand.entity[endpointKey === 'start' ? 'startAngle' : 'endAngle'] =
        angleOfPoint(operand.entity.center, tangentPoint);
      return true;
    }
    if (operand.entity.type === 'POLYLINE') {
      const vertexIndex = endpointKey === 'start'
        ? operand.segmentIndex
        : (operand.segmentIndex + 1) % operand.entity.vertices.length;
      operand.entity.vertices[vertexIndex] = { ...tangentPoint };
      return true;
    }
    return false;
  }

  function rotateClosedPolylineToSegment(polyline, segmentIndex) {
    if (!polyline.closed || segmentIndex <= 0) {
      return segmentIndex;
    }
    polyline.vertices = [
      ...polyline.vertices.slice(segmentIndex),
      ...polyline.vertices.slice(0, segmentIndex),
    ];
    polyline.segments = [
      ...polyline.segments.slice(segmentIndex),
      ...polyline.segments.slice(0, segmentIndex),
    ];
    return 0;
  }

  function applyAdjacentPolylineFillet(firstOperand, secondOperand, solution) {
    const polyline = firstOperand.entity;
    if (polyline !== secondOperand.entity || solution.radius <= SNAP_THRESHOLD) {
      return false;
    }
    const segmentCount = polyline.segments.length;
    let firstIndex = firstOperand.segmentIndex;
    let secondIndex = secondOperand.segmentIndex;
    let firstTangent = solution.firstTangent;
    let secondTangent = solution.secondTangent;
    let arcClockwise = solution.clockwise;
    const forwardAdjacent = polyline.closed
      ? secondIndex === (firstIndex + 1) % segmentCount
      : secondIndex === firstIndex + 1;
    if (!forwardAdjacent) {
      const reverseAdjacent = polyline.closed
        ? firstIndex === (secondIndex + 1) % segmentCount
        : firstIndex === secondIndex + 1;
      if (!reverseAdjacent) {
        return false;
      }
      [firstIndex, secondIndex] = [secondIndex, firstIndex];
      [firstTangent, secondTangent] = [secondTangent, firstTangent];
      arcClockwise = !arcClockwise;
    }
    if (!polyline.closed && secondIndex !== firstIndex + 1) {
      return false;
    }
    if (polyline.closed && firstIndex === segmentCount - 1) {
      firstIndex = rotateClosedPolylineToSegment(polyline, firstIndex);
      secondIndex = 1;
    }
    const cornerIndex = firstIndex + 1;
    polyline.vertices.splice(cornerIndex, 1, { ...firstTangent }, { ...secondTangent });
    polyline.segments.splice(cornerIndex, 0, {
      type: 'ARC',
      center: { ...solution.center },
      clockwise: arcClockwise,
      startWidth: 0,
      endWidth: 0,
    });
    return true;
  }

  function applyFilletSolution(doc, firstOperand, secondOperand, solution) {
    if (!solution?.valid) {
      return { valid: false, reason: 'No se encontro una solucion de empalme' };
    }
    if (
      solution.radius <= SNAP_THRESHOLD &&
      firstOperand.primitive.type === 'CIRCLE' &&
      secondOperand.primitive.type === 'CIRCLE'
    ) {
      return { valid: false, reason: 'El radio 0 no modifica dos circulos completos' };
    }
    doc.recordHistory();
    let firstChanged = false;
    let secondChanged = false;
    const adjacentPolyline = applyAdjacentPolylineFillet(firstOperand, secondOperand, solution);
    if (!adjacentPolyline) {
      firstChanged = setFilletOperandTangent(firstOperand, solution.firstTangent);
      secondChanged = setFilletOperandTangent(secondOperand, solution.secondTangent);
    }
    let arc = null;
    if (solution.radius > SNAP_THRESHOLD && !adjacentPolyline) {
      const styleEntity = firstOperand.entity;
      arc = new ArcEntity(
        solution.center,
        solution.radius,
        solution.startAngle,
        solution.endAngle,
        {
          clockwise: solution.clockwise,
          layer: styleEntity.layer,
          lineStyle: styleEntity.lineStyle,
          lineType: styleEntity.lineType,
          lineColor: styleEntity.lineColor,
        },
      );
      doc.addEntity(arc, { recordHistory: false });
    }
    if (!adjacentPolyline && !firstChanged && !secondChanged && !arc) {
      doc.undoStack.pop();
      return { valid: false, reason: 'Las entidades seleccionadas no necesitan modificacion' };
    }
    doc.clearSelection();
    doc.markDirty();
    return { ...solution, valid: true, arc, adjacentPolyline };
  }

  return {
    applyLineFillet,
    setFilletOperandTangent,
    rotateClosedPolylineToSegment,
    applyAdjacentPolylineFillet,
    applyFilletSolution,
  };
}

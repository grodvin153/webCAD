/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createChamferApplication(dependencies) {
  const {
    LineEntity,
    SNAP_THRESHOLD,
    distance,
    rotateClosedPolylineToSegment,
    setFilletOperandTangent,
  } = dependencies;

  function applyAdjacentPolylineChamfer(firstOperand, secondOperand, solution) {
    const polyline = firstOperand.entity;
    if (polyline !== secondOperand.entity) {
      return false;
    }
    const segmentCount = polyline.segments.length;
    let firstIndex = firstOperand.segmentIndex;
    let secondIndex = secondOperand.segmentIndex;
    let firstTangent = solution.firstTangent;
    let secondTangent = solution.secondTangent;
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
    }
    if (polyline.closed && firstIndex === segmentCount - 1) {
      firstIndex = rotateClosedPolylineToSegment(polyline, firstIndex);
    }
    const cornerIndex = firstIndex + 1;
    polyline.vertices.splice(cornerIndex, 1, { ...firstTangent }, { ...secondTangent });
    polyline.segments.splice(cornerIndex, 0, {
      type: 'LINE',
      center: null,
      clockwise: true,
      startWidth: 0,
      endWidth: 0,
    });
    return true;
  }

  function applyChamferSolution(doc, firstOperand, secondOperand, solution) {
    if (!solution?.valid) {
      return solution || { valid: false, reason: 'No se encontro una solucion de chaflan' };
    }
    doc.recordHistory();
    const adjacentPolyline = applyAdjacentPolylineChamfer(firstOperand, secondOperand, solution);
    let firstChanged = false;
    let secondChanged = false;
    if (!adjacentPolyline) {
      firstChanged = setFilletOperandTangent(firstOperand, solution.firstTangent);
      secondChanged = setFilletOperandTangent(secondOperand, solution.secondTangent);
    }
    let chamfer = null;
    if (!adjacentPolyline && distance(solution.firstTangent, solution.secondTangent) > SNAP_THRESHOLD) {
      const styleEntity = firstOperand.entity;
      chamfer = new LineEntity(solution.firstTangent, solution.secondTangent, {
        layer: styleEntity.layer,
        lineStyle: styleEntity.lineStyle,
        lineType: styleEntity.lineType,
        lineColor: styleEntity.lineColor,
      });
      doc.addEntity(chamfer, { recordHistory: false });
    }
    if (!adjacentPolyline && !firstChanged && !secondChanged && !chamfer) {
      doc.undoStack.pop();
      return { valid: false, reason: 'No se pudieron modificar las entidades' };
    }
    doc.clearSelection();
    doc.markDirty();
    return { ...solution, valid: true, adjacentPolyline, chamfer };
  }

  return {
    applyAdjacentPolylineChamfer,
    applyChamferSolution,
  };
}

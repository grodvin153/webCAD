/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createChamferGeometry(dependencies) {
  const {
    filletRayDirection,
    infiniteLineLineIntersection,
    normalizedVector,
  } = dependencies;

  function chamferSolution(firstOperand, secondOperand, firstDistance, secondDistance) {
    if (
      firstOperand?.primitive.type !== 'LINE' || secondOperand?.primitive.type !== 'LINE' ||
      firstOperand.entity === secondOperand.entity && firstOperand.segmentIndex === secondOperand.segmentIndex
    ) {
      return { valid: false, reason: 'Seleccione dos lineas o tramos rectos distintos' };
    }
    const firstDirection = normalizedVector(firstOperand.primitive.start, firstOperand.primitive.end);
    const secondDirection = normalizedVector(secondOperand.primitive.start, secondOperand.primitive.end);
    const intersection = firstDirection && secondDirection
      ? infiniteLineLineIntersection(
        firstOperand.primitive.start,
        firstDirection,
        secondOperand.primitive.start,
        secondDirection,
      )
      : null;
    if (!intersection) {
      return { valid: false, reason: 'Las entidades son paralelas o no tienen longitud' };
    }
    const firstRay = filletRayDirection(firstOperand.primitive, intersection, firstOperand.pickPoint);
    const secondRay = filletRayDirection(secondOperand.primitive, intersection, secondOperand.pickPoint);
    if (!firstRay || !secondRay) {
      return { valid: false, reason: 'No se pudo determinar el lado del chaflan' };
    }
    const firstTangent = {
      x: intersection.x + firstRay.x * firstDistance,
      y: intersection.y + firstRay.y * firstDistance,
    };
    const secondTangent = {
      x: intersection.x + secondRay.x * secondDistance,
      y: intersection.y + secondRay.y * secondDistance,
    };
    return {
      valid: true,
      firstTangent,
      secondTangent,
      intersection,
      firstDistance,
      secondDistance,
    };
  }

  return {
    chamferSolution,
  };
}

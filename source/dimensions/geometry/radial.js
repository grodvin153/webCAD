/*
 * webCAD - Geometria de cotas radiales
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createRadialDimensionGeometry(dependencies) {
  const {
    dimensionArrow,
    dimensionTextValue,
    distance,
    naturalDimensionTextNormal,
    normalizedVector,
  } = dependencies;

  function dimensionRadialGeometry(entity, metrics) {
    const center = entity.points[0];
    const radiusPoint = entity.points[1];
    const radius = distance(center, radiusPoint);
    const direction = normalizedVector(center, entity.placement) || normalizedVector(center, radiusPoint) || { x: 1, y: 0 };
    let textAngle = Math.atan2(direction.y, direction.x);
    if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
      textAngle += Math.PI;
    }
    const textNormal = naturalDimensionTextNormal(textAngle);
    const positiveEdge = { x: center.x + direction.x * radius, y: center.y + direction.y * radius };
    const negativeEdge = { x: center.x - direction.x * radius, y: center.y - direction.y * radius };
    const arrowExtension = metrics.arrowSize * 1.35;
    const extendedPositiveEdge = {
      x: positiveEdge.x + direction.x * arrowExtension,
      y: positiveEdge.y + direction.y * arrowExtension,
    };
    const extendedNegativeEdge = {
      x: negativeEdge.x - direction.x * arrowExtension,
      y: negativeEdge.y - direction.y * arrowExtension,
    };
    const textPoint = {
      x: entity.placement.x + textNormal.x * (metrics.textGap + metrics.textHeight * 0.55),
      y: entity.placement.y + textNormal.y * (metrics.textGap + metrics.textHeight * 0.55),
    };
    if (entity.kind === 'diameter') {
      const placementDistance = (
        (entity.placement.x - center.x) * direction.x +
        (entity.placement.y - center.y) * direction.y
      );
      const extendToCenter = placementDistance < radius;
      return {
        lines: [extendToCenter
          ? { start: negativeEdge, end: positiveEdge }
          : { start: negativeEdge, end: entity.placement }],
        arcs: [],
        arrows: [
          dimensionArrow(negativeEdge, direction, metrics.arrowSize),
          dimensionArrow(positiveEdge, { x: -direction.x, y: -direction.y }, metrics.arrowSize),
        ],
        text: { point: textPoint, angle: textAngle, value: dimensionTextValue(entity), height: metrics.textHeight },
      };
    }
    const placementDistance = (
      (entity.placement.x - center.x) * direction.x +
      (entity.placement.y - center.y) * direction.y
    );
    const radialLine = placementDistance < radius
      ? { start: center, end: extendedPositiveEdge }
      : { start: center, end: entity.placement };
    return {
      lines: [radialLine],
      arcs: [],
      arrows: [dimensionArrow(positiveEdge, direction, metrics.arrowSize)],
      text: { point: textPoint, angle: textAngle, value: dimensionTextValue(entity), height: metrics.textHeight },
    };
  }

  return {
    dimensionRadialGeometry,
  };
}

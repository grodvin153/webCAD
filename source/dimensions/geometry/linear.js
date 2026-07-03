/*
 * webCAD - Geometria de cotas lineales
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createLinearDimensionGeometry(dependencies) {
  const {
    dimensionArrow,
    dimensionExtensionLine,
    dimensionTextValue,
    distance,
    entityMidpoint,
    naturalDimensionTextNormal,
    normalizedVector,
  } = dependencies;

  function dimensionLinearGeometry(entity, metrics) {
    const first = entity.points[0];
    const second = entity.points[1];
    const placement = entity.placement;
    let firstDimension;
    let secondDimension;
    let textAngle = 0;
    if (entity.kind === 'horizontal') {
      firstDimension = { x: first.x, y: placement.y };
      secondDimension = { x: second.x, y: placement.y };
    }
    else if (entity.kind === 'vertical') {
      firstDimension = { x: placement.x, y: first.y };
      secondDimension = { x: placement.x, y: second.y };
      textAngle = -Math.PI * 0.5;
    }
    else {
      const direction = normalizedVector(first, second) || { x: 1, y: 0 };
      const normal = { x: -direction.y, y: direction.x };
      const offset = (placement.x - first.x) * normal.x + (placement.y - first.y) * normal.y;
      firstDimension = { x: first.x + normal.x * offset, y: first.y + normal.y * offset };
      secondDimension = { x: second.x + normal.x * offset, y: second.y + normal.y * offset };
      textAngle = Math.atan2(direction.y, direction.x);
      if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
        textAngle += Math.PI;
      }
    }
    const textNormal = naturalDimensionTextNormal(textAngle);
    const lineDirection = normalizedVector(firstDimension, secondDimension) || { x: 1, y: 0 };
    const midpoint = entityMidpoint({ start: firstDimension, end: secondDimension });
    const dimensionLength = distance(firstDimension, secondDimension);
    const externalArrows = dimensionLength < metrics.arrowSize * 2.5;
    const dimensionLine = externalArrows
      ? {
        start: {
          x: firstDimension.x - lineDirection.x * metrics.arrowSize * 1.35,
          y: firstDimension.y - lineDirection.y * metrics.arrowSize * 1.35,
        },
        end: {
          x: secondDimension.x + lineDirection.x * metrics.arrowSize * 1.35,
          y: secondDimension.y + lineDirection.y * metrics.arrowSize * 1.35,
        },
      }
      : { start: firstDimension, end: secondDimension };
    return {
      lines: [
        dimensionExtensionLine(first, firstDimension, metrics),
        dimensionExtensionLine(second, secondDimension, metrics),
        dimensionLine,
      ].filter(Boolean),
      arcs: [],
      arrows: externalArrows
        ? [
          dimensionArrow(firstDimension, { x: -lineDirection.x, y: -lineDirection.y }, metrics.arrowSize),
          dimensionArrow(secondDimension, lineDirection, metrics.arrowSize),
        ]
        : [
          dimensionArrow(firstDimension, lineDirection, metrics.arrowSize),
          dimensionArrow(secondDimension, { x: -lineDirection.x, y: -lineDirection.y }, metrics.arrowSize),
        ],
      text: {
        point: {
          x: midpoint.x + textNormal.x * (metrics.textGap + metrics.textHeight * 0.55),
          y: midpoint.y + textNormal.y * (metrics.textGap + metrics.textHeight * 0.55),
        },
        angle: textAngle,
        value: dimensionTextValue(entity),
        height: metrics.textHeight,
      },
    };
  }

  return {
    dimensionLinearGeometry,
  };
}

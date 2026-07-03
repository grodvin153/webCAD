/*
 * webCAD - Geometria de cotas angulares
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createAngularDimensionGeometry(dependencies) {
  const {
    SNAP_THRESHOLD,
    TWO_PI,
    angleOfPoint,
    dimensionArrow,
    dimensionTextValue,
    distance,
    normalizeAngle,
    offsetPoint,
  } = dependencies;

  function dimensionAngularGeometry(entity, metrics) {
    const [vertex, firstRay, secondRay] = entity.points;
    let startAngle = angleOfPoint(vertex, firstRay);
    let endAngle = angleOfPoint(vertex, secondRay);
    let sweep = normalizeAngle(endAngle - startAngle);
    if (sweep > Math.PI) {
      [startAngle, endAngle] = [endAngle, startAngle];
      sweep = TWO_PI - sweep;
    }
    const radius = Math.max(distance(vertex, entity.placement), SNAP_THRESHOLD * 10);
    const start = { x: vertex.x + Math.cos(startAngle) * radius, y: vertex.y + Math.sin(startAngle) * radius };
    const end = { x: vertex.x + Math.cos(endAngle) * radius, y: vertex.y + Math.sin(endAngle) * radius };
    const midAngle = startAngle + sweep * 0.5;
    const tangentStart = { x: -Math.sin(startAngle), y: Math.cos(startAngle) };
    const tangentEnd = { x: Math.sin(endAngle), y: -Math.cos(endAngle) };
    const externalArrows = radius * sweep < metrics.arrowSize * 2.5;
    const startArrowDirection = externalArrows
      ? tangentStart
      : { x: -tangentStart.x, y: -tangentStart.y };
    const endArrowDirection = externalArrows
      ? tangentEnd
      : { x: -tangentEnd.x, y: -tangentEnd.y };
    const tailLength = metrics.arrowSize * 0.78 + metrics.extensionOvershoot;
    let textAngle = Math.atan2(
      Math.sin(midAngle + Math.PI * 0.5),
      Math.cos(midAngle + Math.PI * 0.5),
    );
    if (textAngle > Math.PI * 0.5 || textAngle < -Math.PI * 0.5) {
      textAngle += Math.PI;
    }
    return {
      lines: [
        {
          start,
          end: offsetPoint(start, {
            x: startArrowDirection.x * tailLength,
            y: startArrowDirection.y * tailLength,
          }),
        },
        {
          start: end,
          end: offsetPoint(end, {
            x: endArrowDirection.x * tailLength,
            y: endArrowDirection.y * tailLength,
          }),
        },
      ],
      arcs: [{
        center: vertex,
        radius,
        startAngle,
        endAngle,
        counterclockwise: false,
      }],
      arrows: [
        dimensionArrow(start, startArrowDirection, metrics.arrowSize),
        dimensionArrow(end, endArrowDirection, metrics.arrowSize),
      ],
      text: {
        point: {
          x: vertex.x + Math.cos(midAngle) * (radius + metrics.textGap + metrics.textHeight * 0.6),
          y: vertex.y + Math.sin(midAngle) * (radius + metrics.textGap + metrics.textHeight * 0.6),
        },
        angle: textAngle,
        value: dimensionTextValue(entity),
        height: metrics.textHeight,
      },
    };
  }

  return {
    dimensionAngularGeometry,
  };
}

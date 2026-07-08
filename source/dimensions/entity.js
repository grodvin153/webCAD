/*
 * webCAD - Entidad y despacho geometrico de cotas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { point3 } from '../coordinates/point3.js';

export function createDimensionEntityServices(dependencies) {
  const {
    DEFAULT_LAYER,
    DEFAULT_LINE_COLOR,
    DIMENSION_STYLES,
    TWO_PI,
    angleOfPoint,
    applyLineColorToEntity,
    applyLineStyleToEntity,
    applyLineTypeToEntity,
    createBounds,
    dimensionAngularGeometry,
    dimensionLinearGeometry,
    dimensionRadialGeometry,
    dimensionStyleMetrics,
    distance,
    expandBounds,
    normalizeAngle,
  } = dependencies;

  function dimensionGeometry(entity) {
    const metrics = dimensionStyleMetrics(entity.dimensionStyle);
    let geometry;
    if (entity.kind === 'angular') {
      geometry = dimensionAngularGeometry(entity, metrics);
    }
    else if (entity.kind === 'radius' || entity.kind === 'diameter') {
      geometry = dimensionRadialGeometry(entity, metrics);
    }
    else {
      geometry = dimensionLinearGeometry(entity, metrics);
    }
    if (entity.textPosition && entity.kind !== 'radius' && entity.kind !== 'diameter') {
      geometry.text.point = { ...entity.textPosition };
    }
    return geometry;
  }

  class DimensionEntity {
    constructor(kind, points, placement, options = {}) {
      this.type = 'DIMENSION';
      this.kind = kind;
      this.points = points.map((point) => point3(point));
      this.placement = point3(placement);
      this.textPosition = options.textPosition
        ? point3(options.textPosition)
        : null;
      this.dimensionStyle = DIMENSION_STYLES[options.dimensionStyle]?.id || 'normal';
      this.groupId = null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      applyLineStyleToEntity(this, options.lineStyle || 'auxiliar');
      applyLineTypeToEntity(this, options.lineType || 'continuous');
      applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    measurement() {
      if (this.kind === 'horizontal') return Math.abs(this.points[1].x - this.points[0].x);
      if (this.kind === 'vertical') return Math.abs(this.points[1].y - this.points[0].y);
      if (this.kind === 'aligned') return distance(this.points[0], this.points[1]);
      if (this.kind === 'radius') return distance(this.points[0], this.points[1]);
      if (this.kind === 'diameter') return distance(this.points[0], this.points[1]) * 2;
      const firstAngle = angleOfPoint(this.points[0], this.points[1]);
      const secondAngle = angleOfPoint(this.points[0], this.points[2]);
      const sweep = normalizeAngle(secondAngle - firstAngle);
      return Math.min(sweep, TWO_PI - sweep) * 180 / Math.PI;
    }

    bounds() {
      const geometry = dimensionGeometry(this);
      const points = [
        ...this.points,
        this.placement,
        ...geometry.lines.flatMap((line) => [line.start, line.end]),
        ...geometry.arrows.flat(),
        geometry.text.point,
      ];
      geometry.arcs.forEach((arc) => {
        for (let index = 0; index <= 16; index += 1) {
          const angle = arc.startAngle + normalizeAngle(arc.endAngle - arc.startAngle) * index / 16;
          points.push({ x: arc.center.x + Math.cos(angle) * arc.radius, y: arc.center.y + Math.sin(angle) * arc.radius });
        }
      });
      const padding = geometry.text.height;
      return expandBounds(createBounds(
        Math.min(...points.map((point) => point.x)),
        Math.min(...points.map((point) => point.y)),
        Math.max(...points.map((point) => point.x)),
        Math.max(...points.map((point) => point.y)),
      ), padding);
    }

    length() {
      return this.measurement();
    }
  }

  return {
    dimensionGeometry,
    DimensionEntity,
  };
}

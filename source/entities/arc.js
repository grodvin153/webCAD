/* webCAD - Entidad arco | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  angleOnArc,
  createBounds,
  entityArcSweep,
  normalizeAngle,
  pointAtCircleAngle,
} from '../geometry.js';
import { point3 } from '../coordinates/point3.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createArcEntityClass(style) {
  return class ArcEntity {
    constructor(center, radius, startAngle, endAngle, options = {}) {
      this.type = 'ARC';
      this.center = point3(center);
      this.radius = radius;
      this.startAngle = normalizeAngle(startAngle);
      this.endAngle = normalizeAngle(endAngle);
      this.clockwise = options.clockwise !== false;
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      const points = [
        pointAtCircleAngle(this, this.startAngle),
        pointAtCircleAngle(this, this.endAngle),
      ];
      for (const angle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
        if (angleOnArc(angle, this)) points.push(pointAtCircleAngle(this, angle));
      }
      return createBounds(
        Math.min(...points.map((point) => point.x)),
        Math.min(...points.map((point) => point.y)),
        Math.max(...points.map((point) => point.x)),
        Math.max(...points.map((point) => point.y)),
      );
    }

    length() {
      return this.radius * entityArcSweep(this);
    }
  };
}

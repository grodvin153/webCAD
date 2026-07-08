/* webCAD - Entidad circulo | SPDX-License-Identifier: GPL-3.0-or-later */

import { createBounds } from '../geometry.js';
import { point3 } from '../coordinates/point3.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createCircleEntityClass(style) {
  return class CircleEntity {
    constructor(center, radius, options = {}) {
      this.type = 'CIRCLE';
      this.center = point3(center);
      this.radius = radius;
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      return createBounds(
        this.center.x - this.radius,
        this.center.y - this.radius,
        this.center.x + this.radius,
        this.center.y + this.radius,
      );
    }

    length() {
      return Math.PI * 2 * this.radius;
    }
  };
}

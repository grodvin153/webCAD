/* webCAD - Entidad elipse exacta | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../config.js';
import { point3 } from '../coordinates/point3.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';
import { ellipseBounds, ellipseSweep } from '../ellipse/geometry.js';
import { normalizeAngle, TWO_PI } from '../geometry.js';

export function createEllipseEntityClass(style) {
  return class EllipseEntity {
    constructor(center, radiusX, radiusY, rotation = 0, options = {}) {
      const hasArc = Number.isFinite(options.startParameter) && Number.isFinite(options.endParameter);
      this.type = hasArc ? 'ELLIPSE_ARC' : 'ELLIPSE';
      this.center = point3(center);
      this.radiusX = Math.abs(Number(radiusX));
      this.radiusY = Math.abs(Number(radiusY));
      this.rotation = normalizeAngle(Number(rotation) || 0);
      if (hasArc) {
        this.startParameter = normalizeAngle(options.startParameter);
        this.endParameter = normalizeAngle(options.endParameter);
        this.clockwise = options.clockwise !== false;
      }
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      return ellipseBounds(this);
    }

    length() {
      const h = ((this.radiusX - this.radiusY) / (this.radiusX + this.radiusY)) ** 2;
      const circumference = Math.PI * (this.radiusX + this.radiusY) *
        (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));
      return this.type === 'ELLIPSE' ? circumference : circumference * ellipseSweep(this) / TWO_PI;
    }

    valid() {
      return this.radiusX > SNAP_THRESHOLD && this.radiusY > SNAP_THRESHOLD;
    }
  };
}

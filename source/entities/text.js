/* webCAD - Entidad texto | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../config.js';
import { point3 } from '../coordinates/point3.js';
import { createBounds } from '../geometry.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';
import { rotatePointAround } from '../transformations/rotate.js';

export function createTextEntityClass(style) {
  return class TextEntity {
    constructor(insertionPoint, text, height, options = {}) {
      this.type = 'TEXT';
      this.insertionPoint = point3(insertionPoint);
      this.text = String(text || '');
      this.height = Math.max(Number(height) || 0, SNAP_THRESHOLD);
      this.angle = Number(options.angle) || 0;
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    width() {
      return Math.max(this.height * 0.35, this.text.length * this.height * 0.56);
    }

    bounds() {
      const corners = [
        { x: this.insertionPoint.x, y: this.insertionPoint.y - this.height },
        { x: this.insertionPoint.x + this.width(), y: this.insertionPoint.y - this.height },
        { x: this.insertionPoint.x + this.width(), y: this.insertionPoint.y + this.height * 0.22 },
        { x: this.insertionPoint.x, y: this.insertionPoint.y + this.height * 0.22 },
      ].map((point) => rotatePointAround(point, this.insertionPoint, this.angle));
      return createBounds(
        Math.min(...corners.map((point) => point.x)),
        Math.min(...corners.map((point) => point.y)),
        Math.max(...corners.map((point) => point.x)),
        Math.max(...corners.map((point) => point.y)),
      );
    }

    length() {
      return this.width();
    }
  };
}

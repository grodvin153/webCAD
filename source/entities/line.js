/* webCAD - Entidad linea | SPDX-License-Identifier: GPL-3.0-or-later */

import { createBounds, distance } from '../geometry.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createLineEntityClass(style) {
  return class LineEntity {
    constructor(start, end, options = {}) {
      this.type = 'LINE';
      this.start = { x: start.x, y: start.y };
      this.end = { x: end.x, y: end.y };
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      return createBounds(
        Math.min(this.start.x, this.end.x),
        Math.min(this.start.y, this.end.y),
        Math.max(this.start.x, this.end.x),
        Math.max(this.start.y, this.end.y),
      );
    }

    length() {
      return distance(this.start, this.end);
    }
  };
}

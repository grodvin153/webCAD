/* webCAD - Entidad linea infinita XLINE | SPDX-License-Identifier: GPL-3.0-or-later */

import { createBounds, normalizedVector } from '../geometry.js';
import { point3, vector3 } from '../coordinates/point3.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createXLineEntityClass(style) {
  return class XLineEntity {
    constructor(basePoint, direction, options = {}) {
      this.type = 'XLINE';
      this.basePoint = point3(basePoint);
      this.direction = vector3(normalizedVector({ x: 0, y: 0, z: 0 }, direction) || { x: 1, y: 0, z: 0 });
      this.groupId = options.groupId || null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || 'auxiliar');
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      return createBounds(
        this.basePoint.x,
        this.basePoint.y,
        this.basePoint.x,
        this.basePoint.y,
      );
    }

    length() {
      return 0;
    }
  };
}

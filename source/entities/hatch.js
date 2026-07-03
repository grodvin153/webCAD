/* webCAD - Entidad sombreado | SPDX-License-Identifier: GPL-3.0-or-later */

import { createBounds, distance } from '../geometry.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createHatchEntityClass(style) {
  return class HatchEntity {
    constructor(boundary, options = {}) {
      this.type = 'HATCH';
      const requestedGripIndices = options.gripIndices || boundary.gripIndices;
      const requestedCurveGroups = options.curveGroups || boundary.curveGroups;
      const requestedLoops = Array.isArray(options.loops) && options.loops.length
        ? options.loops
        : [boundary];
      this.loops = requestedLoops
        .filter((loop) => Array.isArray(loop) && loop.length >= 3)
        .map((loop) => loop.map((point) => ({ x: point.x, y: point.y })));
      if (!this.loops.length) {
        this.loops = [boundary.map((point) => ({ x: point.x, y: point.y }))];
      }
      this.boundary = this.loops[0];
      this.gripIndices = Array.isArray(requestedGripIndices)
        ? [...new Set(requestedGripIndices)]
          .filter((index) => Number.isInteger(index) && index >= 0 && index < this.boundary.length)
        : this.boundary.map((_, index) => index);
      this.curveGroups = Array.isArray(requestedCurveGroups)
        ? requestedCurveGroups.map((group) => ({ type: group.type, indices: [...group.indices] }))
        : [];
      this.pattern = 'solid';
      this.groupId = null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      const points = this.loops.flat();
      return createBounds(
        Math.min(...points.map((point) => point.x)),
        Math.min(...points.map((point) => point.y)),
        Math.max(...points.map((point) => point.x)),
        Math.max(...points.map((point) => point.y)),
      );
    }

    length() {
      return this.loops.reduce((total, loop) => total + loop.reduce((loopTotal, point, index) =>
        loopTotal + distance(point, loop[(index + 1) % loop.length]), 0), 0);
    }
  };
}

/* webCAD - Entidad de imagen raster | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../config.js';
import { point3 } from '../coordinates/point3.js';
import { createBounds } from '../geometry.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

function rotateVector(vector, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    x: vector.x * cosine - vector.y * sine,
    y: vector.x * sine + vector.y * cosine,
  };
}

export function createRasterImageEntityClass(style) {
  return class RasterImageEntity {
    constructor(center, width, height, source, options = {}) {
      this.type = 'IMAGE';
      this.center = point3(center);
      this.width = Math.max(Math.abs(Number(width) || 0), SNAP_THRESHOLD);
      this.height = Math.max(Math.abs(Number(height) || 0), SNAP_THRESHOLD);
      this.source = String(source || '');
      this.name = String(options.name || 'Imagen PNG');
      this.rotation = Number(options.rotation) || 0;
      this.opacity = Math.min(1, Math.max(0.05, Number(options.opacity) || 1));
      this.flipX = options.flipX === true;
      this.flipY = options.flipY === true;
      this.groupId = null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    corners() {
      const angle = this.rotation * Math.PI / 180;
      const halfWidth = this.width * 0.5;
      const halfHeight = this.height * 0.5;
      return [
        { x: -halfWidth, y: -halfHeight },
        { x: halfWidth, y: -halfHeight },
        { x: halfWidth, y: halfHeight },
        { x: -halfWidth, y: halfHeight },
      ].map((corner) => {
        const rotated = rotateVector(corner, angle);
        return { x: this.center.x + rotated.x, y: this.center.y + rotated.y, z: this.center.z };
      });
    }

    bounds() {
      const corners = this.corners();
      return createBounds(
        Math.min(...corners.map((point) => point.x)),
        Math.min(...corners.map((point) => point.y)),
        Math.max(...corners.map((point) => point.x)),
        Math.max(...corners.map((point) => point.y)),
      );
    }

    distanceToPoint(point) {
      const angle = -this.rotation * Math.PI / 180;
      const local = rotateVector({ x: point.x - this.center.x, y: point.y - this.center.y }, angle);
      const deltaX = Math.max(Math.abs(local.x) - this.width * 0.5, 0);
      const deltaY = Math.max(Math.abs(local.y) - this.height * 0.5, 0);
      return Math.hypot(deltaX, deltaY);
    }

    length() {
      return (this.width + this.height) * 2;
    }
  };
}

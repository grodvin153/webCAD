/* webCAD - Entidad polilinea | SPDX-License-Identifier: GPL-3.0-or-later */

import { createBounds, expandBounds, mergeBounds } from '../geometry.js';
import { point3 } from '../coordinates/point3.js';
import { DEFAULT_LAYER } from '../properties/layers.js';
import { DEFAULT_LINE_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_TYPE } from '../properties/styles.js';

export function createPolylineEntityClass({ style, polylineSegmentEntity, polylineSegmentEntities }) {
  return class PolylineEntity {
    constructor(vertices, segments, options = {}) {
      this.type = 'POLYLINE';
      this.vertices = vertices.map((point) => point3(point));
      this.closed = Boolean(options.closed);
      const expectedSegments = this.closed ? this.vertices.length : Math.max(0, this.vertices.length - 1);
      this.segments = segments.slice(0, expectedSegments).map((segment) => ({
        type: segment.type === 'ARC' ? 'ARC' : 'LINE',
        center: segment.center ? point3(segment.center) : null,
        clockwise: segment.clockwise !== false,
        startWidth: Math.max(0, Number(segment.startWidth) || 0),
        endWidth: Math.max(0, Number(segment.endWidth) || 0),
      }));
      while (this.segments.length < expectedSegments) {
        this.segments.push({ type: 'LINE', center: null, clockwise: true, startWidth: 0, endWidth: 0 });
      }
      this.groupId = null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      style.applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      style.applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      style.applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    bounds() {
      let bounds = null;
      this.segments.forEach((_, index) => {
        const geometry = polylineSegmentEntity(this, index);
        if (geometry) bounds = mergeBounds(bounds, geometry.bounds());
      });
      if (!bounds && this.vertices.length) {
        bounds = createBounds(
          Math.min(...this.vertices.map((point) => point.x)),
          Math.min(...this.vertices.map((point) => point.y)),
          Math.max(...this.vertices.map((point) => point.x)),
          Math.max(...this.vertices.map((point) => point.y)),
        );
      }
      const maximumWidth = this.segments.reduce(
        (maximum, segment) => Math.max(maximum, segment.startWidth, segment.endWidth), 0,
      );
      return bounds ? expandBounds(bounds, maximumWidth * 0.5) : createBounds(0, 0, 0, 0);
    }

    length() {
      return polylineSegmentEntities(this).reduce((total, segment) => total + segment.length(), 0);
    }
  };
}

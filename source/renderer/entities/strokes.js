/* webCAD - Renderizado de entidades | SPDX-License-Identifier: GPL-3.0-or-later */

export function createEntityStrokeMethods(dependencies) {
  const {
    CAD_TEXT_FONT,
    LINE_COLOR,
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    activeDrawingProfile,
    angleOfPoint,
    clamp,
    dimensionGeometry,
    distance,
    drawRasterImage,
    drawXLine,
    getLineStyle,
    pointAtCircleAngle,
    pointAtCircularParameter,
    pointAtLineParameter,
    polylineSegmentEntity,
    profileLineTypeDash,
  } = dependencies;

  class EntityStrokeMethods {
  drawLineStroke(ctx, entity, options) {
    const lineWidth = options.width / this.state.viewScale;
    const length = entity.length();
    if (length <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.moveTo(entity.start.x, entity.start.y);
    ctx.lineTo(entity.end.x, entity.end.y);
    ctx.stroke();
    ctx.restore();
  }

  drawXLineStroke(ctx, entity, options) {
    drawXLine(ctx, entity, {
      bounds: this.visibleWorldBounds(18 / this.state.viewScale),
      color: options.color,
      width: options.width,
      viewScale: this.state.viewScale,
      dash: profileLineTypeDash(entity.lineType),
    });
  }

  drawCircleStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.arc(entity.center.x, entity.center.y, entity.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawArcStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const dash = profileLineTypeDash(entity.lineType);
    if (dash.length) {
      ctx.setLineDash(dash.map((length) => length / this.state.viewScale));
    }
    ctx.arc(
      entity.center.x,
      entity.center.y,
      entity.radius,
      entity.startAngle,
      entity.endAngle,
      entity.clockwise === false,
    );
    ctx.stroke();
    ctx.restore();
  }

  drawPolylineStroke(ctx, entity, options) {
    let hasVariableWidth = false;
    entity.segments.forEach((segment, index) => {
      const geometry = polylineSegmentEntity(entity, index);
      if (!geometry) {
        return;
      }
      const startWidth = Math.max(0, segment.startWidth || 0);
      const endWidth = Math.max(0, segment.endWidth || 0);
      if (startWidth <= SNAP_THRESHOLD && endWidth <= SNAP_THRESHOLD) {
        if (geometry.type === 'ARC') {
          this.drawArcStroke(ctx, geometry, options);
        }
        else {
          this.drawLineStroke(ctx, geometry, options);
        }
        return;
      }
      hasVariableWidth = true;

      const sampleCount = geometry.type === 'ARC'
        ? clamp(Math.ceil(geometry.length() * this.state.viewScale / 8), 8, 160)
        : 1;
      const left = [];
      const right = [];
      for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
        const parameter = sampleIndex / sampleCount;
        let point;
        let tangent;
        if (geometry.type === 'ARC') {
          point = pointAtCircularParameter(geometry, parameter);
          const angle = angleOfPoint(geometry.center, point);
          tangent = geometry.clockwise === false
            ? { x: Math.sin(angle), y: -Math.cos(angle) }
            : { x: -Math.sin(angle), y: Math.cos(angle) };
        }
        else {
          point = pointAtLineParameter(geometry, parameter);
          const segmentLength = geometry.length();
          tangent = {
            x: (geometry.end.x - geometry.start.x) / segmentLength,
            y: (geometry.end.y - geometry.start.y) / segmentLength,
          };
        }
        const halfWidth = (startWidth + (endWidth - startWidth) * parameter) * 0.5;
        const normal = { x: -tangent.y, y: tangent.x };
        left.push({ x: point.x + normal.x * halfWidth, y: point.y + normal.y * halfWidth });
        right.push({ x: point.x - normal.x * halfWidth, y: point.y - normal.y * halfWidth });
      }
      ctx.save();
      ctx.fillStyle = options.color;
      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      left.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      [...right].reverse().forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    if (!hasVariableWidth) {
      return;
    }
    entity.vertices.forEach((point, index) => {
      const previousIndex = index - 1 >= 0
        ? index - 1
        : entity.closed ? entity.segments.length - 1 : -1;
      const nextIndex = index < entity.segments.length ? index : -1;
      const radius = Math.max(
        previousIndex >= 0 ? entity.segments[previousIndex].endWidth * 0.5 : 0,
        nextIndex >= 0 ? entity.segments[nextIndex].startWidth * 0.5 : 0,
      );
      if (radius <= SNAP_THRESHOLD) {
        return;
      }
      ctx.save();
      ctx.fillStyle = options.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    });
  }

  drawTextStroke(ctx, entity, options) {
    if (!entity.text || entity.height <= SNAP_THRESHOLD) {
      return;
    }
    ctx.save();
    ctx.translate(entity.insertionPoint.x, entity.insertionPoint.y);
    ctx.rotate(-entity.angle * Math.PI / 180);
    ctx.fillStyle = options.color;
    ctx.font = `${entity.height}px ${CAD_TEXT_FONT}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(entity.text, 0, 0);
    ctx.restore();
  }

  drawDimensionEntity(ctx, entity, options = {}) {
    const geometry = dimensionGeometry(entity);
    const color = options.color || entity.color || LINE_COLOR;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = (options.width ?? 1.25) / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    geometry.lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
    geometry.arcs.forEach((arc) => {
      ctx.beginPath();
      ctx.arc(arc.center.x, arc.center.y, arc.radius, arc.startAngle, arc.endAngle, arc.counterclockwise);
      ctx.stroke();
    });
    geometry.arrows.forEach((arrow) => {
      ctx.beginPath();
      ctx.moveTo(arrow[0].x, arrow[0].y);
      ctx.lineTo(arrow[1].x, arrow[1].y);
      ctx.lineTo(arrow[2].x, arrow[2].y);
      ctx.closePath();
      ctx.fill();
    });
    ctx.translate(geometry.text.point.x, geometry.text.point.y);
    ctx.rotate(geometry.text.angle);
    ctx.font = `${geometry.text.height}px ${CAD_TEXT_FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(geometry.text.value, 0, 0);
    ctx.restore();
  }

  drawHatchFill(ctx, entity, options = {}) {
    const loops = entity.loops || [entity.boundary];
    if (!loops.some((loop) => loop.length >= 3)) {
      return;
    }
    ctx.save();
    ctx.beginPath();
    loops.forEach((loop) => {
      if (loop.length < 3) {
        return;
      }
      let lastDrawnPoint = null;
      loop.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
          lastDrawnPoint = point;
        }
        else if (
          !options.minPointPixels ||
          index === loop.length - 1 ||
          distance(lastDrawnPoint, point) * this.state.viewScale >= options.minPointPixels
        ) {
          ctx.lineTo(point.x, point.y);
          lastDrawnPoint = point;
        }
      });
      ctx.closePath();
    });
    ctx.fillStyle = options.color || entity.color;
    ctx.globalAlpha = options.alpha ?? activeDrawingProfile().hatchOpacity;
    ctx.fill('evenodd');
    if (options.outline) {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = options.color || entity.color;
      ctx.lineWidth = 1.5 / this.state.viewScale;
      ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBlockReference(ctx, reference, options = {}) {
    for (const entity of reference.expandedEntities()) {
      const bounds = entity.bounds();
      const pixelSpan = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) *
        this.state.viewScale;
      if (options.simplified && (
        pixelSpan < 0.75 ||
        (entity.type === 'TEXT' && entity.height * this.state.viewScale < 4)
      )) {
        continue;
      }
      const style = getLineStyle(entity.lineStyle);
      const color = options.color || entity.color || style.color;
      const width = options.width ?? this.displayLineWidth(entity);
      if (entity.type === 'LINE') {
        this.drawLineStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'XLINE') {
        this.drawXLineStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'ARC') {
        this.drawArcStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'POLYLINE') {
        this.drawPolylineStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'TEXT') {
        this.drawTextStroke(ctx, entity, { color, width });
      }
      if (entity.type === 'HATCH') {
        this.drawHatchFill(ctx, entity, {
          color,
          alpha: options.alpha,
          outline: options.outline,
        });
      }
      if (entity.type === 'DIMENSION') {
        this.drawDimensionEntity(ctx, entity, { color, width: options.width });
      }
      if (entity.type === 'IMAGE') {
        this.drawImageEntity(ctx, entity, {
          alpha: options.alpha,
          outlineColor: options.outline ? color : null,
          outlineWidth: options.width,
        });
      }
    }
  }

  drawImageEntity(ctx, entity, options = {}) {
    drawRasterImage(ctx, entity, {
      alpha: options.alpha,
      outlineColor: options.outlineColor,
      outlineWidth: (options.outlineWidth || 1.5) / this.state.viewScale,
      dash: options.dash?.map((length) => length / this.state.viewScale),
      requestDraw: () => this.draw(),
    });
  }

  drawEntityOverlay(ctx, entity, options = {}) {
    if (!entity) {
      return;
    }
    const color = options.color || PREVIEW_COLOR;
    const width = options.width ?? this.displayLineWidth(entity);
    if (entity.type === 'LINE') {
      this.drawLineStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'XLINE') {
      this.drawXLineStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'CIRCLE') {
      this.drawCircleStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'ARC') {
      this.drawArcStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'POLYLINE') {
      this.drawPolylineStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'TEXT') {
      this.drawTextStroke(ctx, entity, { color, width });
    }
    if (entity.type === 'DIMENSION') {
      this.drawDimensionEntity(ctx, entity, { color, width });
    }
    if (entity.type === 'HATCH') {
      this.drawHatchFill(ctx, entity, {
        color,
        alpha: options.alpha ?? 0.28,
        outline: options.outline,
      });
    }
    if (entity.type === 'INSERT') {
      this.drawBlockReference(ctx, entity, {
        color,
        width,
        alpha: options.alpha ?? 0.28,
        outline: options.outline,
      });
    }
    if (entity.type === 'IMAGE') {
      this.drawImageEntity(ctx, entity, {
        alpha: options.alpha ?? entity.opacity,
        outlineColor: color,
        outlineWidth: options.width ?? 2,
        dash: [7, 5],
      });
    }
  }

  isExtendBoundary(entity) {
    if (this.state.tool !== 'extend') {
      return false;
    }
    return this.state.extendDraft?.boundaries?.includes(entity) || (
      this.state.extendDraft?.phase === 'boundaries' &&
      this.doc.isSelected(entity)
    );
  }

  drawHighlightedEntity(ctx, entity, color, widthBoost = 1.5) {
    if (!entity) {
      return;
    }
    this.drawEntityOverlay(ctx, entity, {
      color,
      width: Math.max(3, this.displayLineWidth(entity) + widthBoost),
      alpha: entity.type === 'HATCH' ? 0.42 : 0.28,
      outline: entity.type === 'HATCH',
    });
  }

  entityPixelSpan(entity) {
    const bounds = entity.bounds();
    return Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) * this.state.viewScale;
  }

  appendLodGeometry(batch, entity) {
    if (entity.type === 'LINE' || entity.type === 'CIRCLE' || entity.type === 'ARC') {
      batch.push(entity);
      return;
    }
    if (entity.type === 'POLYLINE') {
      entity.segments.forEach((_, index) => {
        const geometry = polylineSegmentEntity(entity, index);
        if (geometry) {
          batch.push(geometry);
        }
      });
    }
  }

  drawLodBatches(ctx, batches) {
    ctx.save();
    ctx.lineWidth = 1.15 / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const [color, geometries] of batches) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      geometries.forEach((geometry) => {
        if (geometry.type === 'LINE') {
          ctx.moveTo(geometry.start.x, geometry.start.y);
          ctx.lineTo(geometry.end.x, geometry.end.y);
        }
        else if (geometry.type === 'CIRCLE') {
          ctx.moveTo(geometry.center.x + geometry.radius, geometry.center.y);
          ctx.arc(geometry.center.x, geometry.center.y, geometry.radius, 0, TWO_PI);
        }
        else if (geometry.type === 'ARC') {
          const start = pointAtCircleAngle(geometry, geometry.startAngle);
          ctx.moveTo(start.x, start.y);
          ctx.arc(
            geometry.center.x,
            geometry.center.y,
            geometry.radius,
            geometry.startAngle,
            geometry.endAngle,
            geometry.clockwise === false,
          );
        }
      });
      ctx.stroke();
    }
    ctx.restore();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(EntityStrokeMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, EntityStrokeMethods.prototype[name]]),
  );
}

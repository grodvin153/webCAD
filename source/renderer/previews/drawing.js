/* webCAD - Previews de dibujo | SPDX-License-Identifier: GPL-3.0-or-later */

export function createDrawingPreviewMethods(dependencies) {
  const {
    BlockReferenceEntity,
    PolylineEntity,
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    TextEntity,
    activeDraftOrigin,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    arcFromCenterStartEnd,
    arcFromThreePoints,
    circleFromThreePoints,
    dimensionDraftEntity,
    dimensionPlacementPoint,
    distance,
    ellipseCommand,
    getLineStyle,
    keyboardCoordinateTarget,
    normalizeBoundsFromPoints,
    parseDistanceInput,
    pointFromDistance,
    pointOnRadiusFromAngle,
    polylineTangentArcToPoint,
    profileLineTypeDash,
    rectangleTargetPoint,
    regularPolygonCommand,
    resolveCursorPoint,
  } = dependencies;

  class DrawingPreviewMethods {
  drawPreview(ctx) {
    if (!this.state.mouseWorld) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    const activeLineTypeDash = profileLineTypeDash(activeLineTypeId());
    const previewDash = activeLineTypeDash.length ? activeLineTypeDash : [10, 8];
    ctx.setLineDash(previewDash.map((length) => length / this.state.viewScale));
    const activeStyle = getLineStyle(activeLineStyleId());
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = this.displayLineWidth(activeLineStyleId()) / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.state.pendingLineStart) {
      let endPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const coordinateTarget = keyboardCoordinateTarget(
        this.state.pendingLineStart,
        endPoint,
        this.state.distanceInput,
      );
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (coordinateTarget) {
        endPoint = coordinateTarget;
      }
      else if (inputDistance !== null) {
        const distancePoint = pointFromDistance(
          this.state.pendingLineStart,
          endPoint,
          inputDistance,
        );
        if (distancePoint) {
          endPoint = distancePoint;
        }
      }

      ctx.moveTo(this.state.pendingLineStart.x, this.state.pendingLineStart.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(this.state.pendingLineStart.x, this.state.pendingLineStart.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.state.polylineDraft?.vertices.length) {
      const draft = this.state.polylineDraft;
      let previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const origin = activeDraftOrigin(this.state);
      const coordinateTarget = keyboardCoordinateTarget(origin, previewPoint, this.state.distanceInput);
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (coordinateTarget) {
        previewPoint = coordinateTarget;
      }
      else if (inputDistance !== null) {
        previewPoint = pointFromDistance(origin, previewPoint, inputDistance) || previewPoint;
      }
      const previewOptions = {
        layer: activeLayerName(),
        lineStyle: activeLineStyleId(),
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      };
      if (draft.segments.length) {
        const committedPreview = new PolylineEntity(
          draft.vertices,
          draft.segments,
          previewOptions,
        );
        ctx.setLineDash([]);
        this.drawPolylineStroke(ctx, committedPreview, {
          color: committedPreview.color || activeStyle.color,
          width: this.displayLineWidth(activeLineStyleId()),
        });
        ctx.setLineDash(previewDash.map((length) => length / this.state.viewScale));
      }
      const start = draft.vertices[draft.vertices.length - 1];
      let activeSegment = null;
      let activeEnd = previewPoint;
      if (draft.mode === 'line') {
        activeSegment = { type: 'LINE', center: null };
      }
      else if (draft.mode === 'arc-end') {
        const arcGeometry = polylineTangentArcToPoint(draft, start, previewPoint);
        activeSegment = {
          type: 'ARC',
          center: arcGeometry.center,
          clockwise: arcGeometry.clockwise,
        };
      }
      if (activeSegment && distance(start, activeEnd) > SNAP_THRESHOLD) {
        const activePreview = new PolylineEntity(
          [start, activeEnd],
          [{
            ...activeSegment,
            startWidth: draft.startWidth,
            endWidth: draft.endWidth,
          }],
          previewOptions,
        );
        this.drawPolylineStroke(ctx, activePreview, {
          color: PREVIEW_COLOR,
          width: this.displayLineWidth(activeLineStyleId()),
        });
      }
      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...draft.vertices, activeEnd]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, TWO_PI);
        ctx.fill();
      }
    }

    if (this.state.rectangleDraft?.firstPoint) {
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      const oppositePoint = rectangleTargetPoint(
        this.state.rectangleDraft,
        cursor,
        this.state.distanceInput,
      );

      const bounds = normalizeBoundsFromPoints(this.state.rectangleDraft.firstPoint, oppositePoint);
      ctx.beginPath();
      ctx.rect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [this.state.rectangleDraft.firstPoint, oppositePoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.regularPolygonDraft?.center) {
      const vertices = regularPolygonCommand.previewAt(this.state.mouseWorld);
      if (vertices?.length) {
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let index = 1; index < vertices.length; index += 1) {
          ctx.lineTo(vertices[index].x, vertices[index].y);
        }
        ctx.closePath();
        ctx.stroke();

        const center = this.state.regularPolygonDraft.center;
        const radius = 4 / this.state.viewScale;
        ctx.fillStyle = PREVIEW_COLOR;
        for (const point of [center, vertices[0]]) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    if (this.state.ellipseDraft?.points.length >= 2) {
      const preview = ellipseCommand.previewAt(resolveCursorPoint(this.state.mouseWorld, this.state));
      if (preview) {
        ctx.beginPath();
        ctx.ellipse(preview.center.x, preview.center.y, preview.radiusX, preview.radiusY, preview.rotation, 0, TWO_PI);
        ctx.stroke();
      }
    }

    if (this.state.circleDraft?.points.length) {
      let previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const points = this.state.circleDraft.points;
      previewPoint = keyboardCoordinateTarget(
        activeDraftOrigin(this.state),
        previewPoint,
        this.state.distanceInput,
      ) || previewPoint;
      let previewCircle = null;

      if (this.state.circleDraft.mode === 'center-radius' && points.length === 1) {
        const inputDistance = parseDistanceInput(this.state.distanceInput);
        const radius = inputDistance !== null
          ? inputDistance
          : distance(points[0], previewPoint);
        if (radius > SNAP_THRESHOLD) {
          previewCircle = { center: points[0], radius };
        }
      }

      if (this.state.circleDraft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewCircle = circleFromThreePoints(points[0], points[1], previewPoint);
          if (!previewCircle) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.lineTo(previewPoint.x, previewPoint.y);
            ctx.stroke();
          }
        }
      }

      if (previewCircle) {
        ctx.beginPath();
        ctx.arc(previewCircle.center.x, previewCircle.center.y, previewCircle.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.arcDraft?.points.length) {
      let previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const draft = this.state.arcDraft;
      const points = draft.points;
      previewPoint = keyboardCoordinateTarget(
        activeDraftOrigin(this.state),
        previewPoint,
        this.state.distanceInput,
      ) || previewPoint;
      let previewArc = null;

      if (draft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromThreePoints(points[0], points[1], previewPoint);
        }
      }

      if (draft.mode === 'center-start-end') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromCenterStartEnd(points[0], points[1], previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.stroke();
        }
      }

      if (draft.mode === 'center-radius') {
        if (points.length === 1) {
          const inputDistance = parseDistanceInput(this.state.distanceInput);
          const radius = inputDistance !== null
            ? inputDistance
            : distance(points[0], previewPoint);
          if (radius > SNAP_THRESHOLD) {
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, radius, 0, TWO_PI);
            ctx.stroke();
          }
        }
        if (points.length === 2 && draft.radius) {
          const startPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(startPoint.x, startPoint.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[0].x, points[0].y, draft.radius, 0, TWO_PI);
          ctx.stroke();
        }
        if (points.length === 3 && draft.radius) {
          const endPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          previewArc = arcFromCenterStartEnd(points[0], points[2], endPoint);
        }
      }

      if (previewArc) {
        ctx.beginPath();
        ctx.arc(
          previewArc.center.x,
          previewArc.center.y,
          previewArc.radius,
          previewArc.startAngle,
          previewArc.endAngle,
        );
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.textDraft?.text) {
      const insertionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const previewText = new TextEntity(
        insertionPoint,
        this.state.textDraft.text,
        this.state.textDraft.height,
        { angle: 0 },
      );
      this.drawTextStroke(ctx, previewText, { color: PREVIEW_COLOR, width: 1 });
      ctx.setLineDash([]);
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(insertionPoint.x, insertionPoint.y, 4 / this.state.viewScale, 0, TWO_PI);
      ctx.fill();
    }

    if (this.state.hatchDraft) {
      const markerPoint = this.state.mouseWorld;
      const markerSize = 8 / this.state.viewScale;
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(208, 90, 31, 0.16)';
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 2 / this.state.viewScale;
      ctx.beginPath();
      ctx.rect(
        markerPoint.x - markerSize * 0.5,
        markerPoint.y - markerSize * 0.5,
        markerSize,
        markerSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    if (this.state.blockInsertDraft) {
      const insertionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const draft = this.state.blockInsertDraft;
      const preview = new BlockReferenceEntity(draft.definition, insertionPoint, {
        rotation: draft.rotation,
        scaleX: draft.scale,
        scaleY: draft.scale,
        layer: activeLayerName(),
        lineStyle: activeLineStyleId(),
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      });
      this.drawBlockReference(ctx, preview, {
        color: PREVIEW_COLOR,
        alpha: 0.25,
        outline: true,
      });
      ctx.setLineDash([]);
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(insertionPoint.x, insertionPoint.y, 4 / this.state.viewScale, 0, TWO_PI);
      ctx.fill();
    }

    if (this.state.dimensionDraft) {
      const draft = this.state.dimensionDraft;
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      if (draft.phase === 'placement') {
        const placement = dimensionPlacementPoint(draft, cursor, this.state);
        const preview = dimensionDraftEntity(draft, placement);
        if (preview) {
          this.drawDimensionEntity(ctx, preview, { color: PREVIEW_COLOR, width: 1.5 });
        }
      }
      else {
        const guidePoints = [...draft.points, cursor].filter(Boolean);
        ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
        ctx.strokeStyle = PREVIEW_COLOR;
        ctx.lineWidth = 1.5 / this.state.viewScale;
        if (draft.firstLine) {
          ctx.beginPath();
          ctx.moveTo(draft.firstLine.start.x, draft.firstLine.start.y);
          ctx.lineTo(draft.firstLine.end.x, draft.firstLine.end.y);
          ctx.stroke();
        }
        if (guidePoints.length > 1) {
          ctx.beginPath();
          ctx.moveTo(guidePoints[0].x, guidePoints[0].y);
          guidePoints.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    }

    ctx.setLineDash([]);
    ctx.restore();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(DrawingPreviewMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, DrawingPreviewMethods.prototype[name]]),
  );
}

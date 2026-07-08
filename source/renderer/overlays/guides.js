/* webCAD - Guias y overlays interactivos | SPDX-License-Identifier: GPL-3.0-or-later */

export function createGuideOverlayMethods(dependencies) {
  const {
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    applyImageAlignment,
    bestImageAlignment,
    cloneEntity,
    drawOrthogonalInference,
    normalizeBoundsFromPoints,
    resolveCursorPoint,
    selectionWindowMode,
  } = dependencies;

  class GuideOverlayMethods {
  drawSelectionWindow(ctx) {
    const selectionWindow = this.state.selectionWindow;
    if (!selectionWindow?.currentWorld) {
      return;
    }

    const bounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    if (Math.abs(width) <= SNAP_THRESHOLD || Math.abs(height) <= SNAP_THRESHOLD) {
      return;
    }

    const mode = selectionWindowMode(selectionWindow);
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.minX, bounds.minY, width, height);
    ctx.fillStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.10)'
      : 'rgba(208, 90, 31, 0.10)';
    ctx.strokeStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.80)'
      : 'rgba(208, 90, 31, 0.85)';
    ctx.lineWidth = 1.5 / this.state.viewScale;
    if (mode === 'capture') {
      ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawInferenceGuide(ctx) {
    drawOrthogonalInference(ctx, {
      inference: this.state.activeInference,
      viewScale: this.state.viewScale,
    });
  }

  drawImageInteractionPreview(ctx) {
    const insertionDraft = this.state.imageDraft;
    if (this.state.tool === 'image-insert' && insertionDraft?.preview && this.state.mouseWorld) {
      insertionDraft.preview.center = resolveCursorPoint(this.state.mouseWorld, this.state);
      this.drawImageEntity(ctx, insertionDraft.preview, {
        alpha: 0.58,
        outlineColor: PREVIEW_COLOR,
        outlineWidth: 2,
        dash: [7, 5],
      });
    }

    const draft = this.state.imageCalibrationDraft;
    if (this.state.tool !== 'image-calibrate' || !draft) return;
    const cursor = this.state.mouseWorld;
    const endPoint = draft.sourceEnd || draft.previewPoint || cursor;
    if (draft.sourceStart && endPoint) {
      ctx.save();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.lineWidth = 2 / this.state.viewScale;
      ctx.setLineDash([7 / this.state.viewScale, 5 / this.state.viewScale]);
      ctx.beginPath();
      ctx.moveTo(draft.sourceStart.x, draft.sourceStart.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
      ctx.setLineDash([]);
      for (const point of [draft.sourceStart, draft.sourceEnd].filter(Boolean)) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4 / this.state.viewScale, 0, TWO_PI);
        ctx.fill();
      }
      ctx.restore();
    }
    if (draft.sourceStart && draft.sourceEnd && draft.targetSegment) {
      const preview = cloneEntity(draft.entity);
      const alignment = bestImageAlignment(
        preview,
        draft.sourceStart,
        draft.sourceEnd,
        draft.targetSegment,
      );
      if (preview && applyImageAlignment(preview, alignment)) {
        this.drawImageEntity(ctx, preview, {
          alpha: 0.42,
          outlineColor: PREVIEW_COLOR,
          outlineWidth: 2,
          dash: [7, 5],
        });
      }
      ctx.save();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 3 / this.state.viewScale;
      ctx.beginPath();
      ctx.moveTo(draft.targetSegment.start.x, draft.targetSegment.start.y);
      ctx.lineTo(draft.targetSegment.end.x, draft.targetSegment.end.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawCrosshair(ctx) {
    if (
      !this.state.mouseWorld ||
      this.state.tool === 'select' ||
      this.state.tool === 'select-set' ||
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting) ||
      (this.state.tool === 'stretch' && this.state.stretchDraft?.selecting) ||
      (this.state.tool === 'polar-array' && this.state.polarArrayDraft?.selecting) ||
      (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting) ||
      (this.state.dimensionDraft &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'))
    ) {
      return;
    }

    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    const point = resolveCursorPoint(this.state.mouseWorld, this.state);

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(182, 77, 31, 0.18)';
    ctx.lineWidth = 1 / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.moveTo(point.x, worldTop);
    ctx.lineTo(point.x, worldBottom);
    ctx.moveTo(worldLeft, point.y);
    ctx.lineTo(worldRight, point.y);
    ctx.stroke();
    ctx.restore();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(GuideOverlayMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, GuideOverlayMethods.prototype[name]]),
  );
}

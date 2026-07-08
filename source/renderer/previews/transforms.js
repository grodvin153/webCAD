/* webCAD - Previews de transformaciones | SPDX-License-Identifier: GPL-3.0-or-later */

export function createTransformPreviewMethods(dependencies) {
  const {
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    boundsIntersectsBounds,
    cloneEntity,
    cloneEntityWithOffset,
    distance,
    drawPolarArrayCommandPreview,
    drawScaleCommandPreview,
    gripPoint,
    gripReferencePoint,
    keyboardCoordinateTarget,
    mirrorEntityAcrossAxis,
    normalizedVector,
    offsetBounds,
    parseAngleInput,
    parseDistanceInput,
    pointFromDistance,
    polarArrayCommand,
    resolveCursorPoint,
    resolvePointForState,
    rotateEntityByAngle,
    rotatePointAround,
    rotationAngleFromPoint,
    stretchCommand,
    stretchCommandTargetPoint,
  } = dependencies;

  class TransformPreviewMethods {
  drawGripMovePreview(ctx) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return;
    }

    const origin = gripPoint(this.state.selectedGrip);
    const directionPoint = resolvePointForState(this.state.mouseWorld, this.state, gripReferencePoint(this.state.selectedGrip));
    const coordinateTarget = keyboardCoordinateTarget(origin, directionPoint, this.state.distanceInput);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance === null && !coordinateTarget) {
      return;
    }

    const targetPoint = coordinateTarget || pointFromDistance(origin, directionPoint, inputDistance);
    if (!targetPoint) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6 / this.state.viewScale, 6 / this.state.viewScale]);
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 1.8 / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(targetPoint.x, targetPoint.y);
    ctx.stroke();
    ctx.restore();
  }

  copyPreviewTargetPoint() {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const coordinateTarget = keyboardCoordinateTarget(copyDraft.basePoint, cursor, this.state.distanceInput);
    if (coordinateTarget) return coordinateTarget;
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(copyDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  movePreviewTargetPoint() {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const coordinateTarget = keyboardCoordinateTarget(moveDraft.basePoint, cursor, this.state.distanceInput);
    if (coordinateTarget) return coordinateTarget;
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(moveDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  drawCopyPreview(ctx) {
    const draft = this.state.copyDraft || this.state.moveDraft;
    const targetPoint = this.state.copyDraft ? this.copyPreviewTargetPoint() : this.movePreviewTargetPoint();
    if (!draft?.basePoint || !targetPoint) {
      return;
    }

    const vector = {
      x: targetPoint.x - draft.basePoint.x,
      y: targetPoint.y - draft.basePoint.y,
    };

    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of draft.sourceEntities) {
      if (!boundsIntersectsBounds(offsetBounds(entity.bounds(), vector), viewBounds)) {
        continue;
      }
      const preview = cloneEntityWithOffset(entity, vector);
      if (!preview) {
        continue;
      }

      this.drawEntityOverlay(ctx, preview, {
        color: PREVIEW_COLOR,
        alpha: 0.28,
        outline: true,
      });
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  rotatePreviewAngle() {
    const draft = this.state.rotateDraft;
    if (!draft?.basePoint || !this.state.mouseWorld) {
      return null;
    }
    const inputAngle = parseAngleInput(this.state.distanceInput);
    if (inputAngle !== null) {
      return inputAngle;
    }
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    return rotationAngleFromPoint(draft.basePoint, cursor, this.state.orthoEnabled);
  }

  drawRotatePreview(ctx) {
    const draft = this.state.rotateDraft;
    const angle = this.rotatePreviewAngle();
    if (!draft?.basePoint || angle === null) {
      return;
    }

    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of draft.sourceEntities) {
      const preview = cloneEntity(entity);
      if (!preview || !rotateEntityByAngle(preview, draft.basePoint, angle) ||
          !boundsIntersectsBounds(preview.bounds(), viewBounds)) {
        continue;
      }
      this.drawHighlightedEntity(ctx, preview, PREVIEW_COLOR, 0);
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    if (cursor) {
      const inputAngle = parseAngleInput(this.state.distanceInput);
      const rayPoint = inputAngle === null
        ? cursor
        : rotatePointAround(
            { x: draft.basePoint.x + distance(draft.basePoint, cursor), y: draft.basePoint.y },
            draft.basePoint,
            inputAngle,
          );
      ctx.beginPath();
      ctx.strokeStyle = PREVIEW_COLOR;
      ctx.lineWidth = 1.5 / this.state.viewScale;
      ctx.moveTo(draft.basePoint.x, draft.basePoint.y);
      ctx.lineTo(rayPoint.x, rayPoint.y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.fillStyle = PREVIEW_COLOR;
    ctx.beginPath();
    ctx.arc(draft.basePoint.x, draft.basePoint.y, 4 / this.state.viewScale, 0, TWO_PI);
    ctx.fill();
    ctx.restore();
  }

  drawMirrorPreview(ctx) {
    const draft = this.state.mirrorDraft;
    if (!draft?.firstPoint || !this.state.mouseWorld) {
      return;
    }
    const secondPoint = resolvePointForState(
      this.state.mouseWorld,
      this.state,
      draft.firstPoint,
    );
    if (!secondPoint || distance(draft.firstPoint, secondPoint) <= SNAP_THRESHOLD) {
      return;
    }
    ctx.save();
    for (const source of draft.sourceEntities) {
      const preview = cloneEntity(source);
      if (preview && mirrorEntityAcrossAxis(preview, draft.firstPoint, secondPoint)) {
        this.drawHighlightedEntity(ctx, preview, PREVIEW_COLOR, 0);
      }
    }
    const axis = normalizedVector(draft.firstPoint, secondPoint);
    const extent = Math.max(this.visibleWorldWidth(), this.visibleWorldHeight()) * 1.5;
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    ctx.beginPath();
    ctx.moveTo(draft.firstPoint.x - axis.x * extent, draft.firstPoint.y - axis.y * extent);
    ctx.lineTo(draft.firstPoint.x + axis.x * extent, draft.firstPoint.y + axis.y * extent);
    ctx.stroke();
    ctx.restore();
  }

  drawScalePreview(ctx) {
    drawScaleCommandPreview(ctx, {
      draft: this.state.scaleDraft,
      mouseWorld: this.state.mouseWorld,
      distanceInput: this.state.distanceInput,
      resolvePoint: (point) => resolveCursorPoint(point, this.state),
      cloneEntity,
      drawEntity: (context, entity) =>
        this.drawHighlightedEntity(context, entity, PREVIEW_COLOR, 0),
      viewScale: this.state.viewScale,
      previewColor: PREVIEW_COLOR,
    });
  }

  drawStretchPreview(ctx) {
    const draft = this.state.stretchDraft;
    if (!draft?.basePoint || !this.state.mouseWorld || !stretchCommand) return;
    const targetPoint = stretchCommandTargetPoint(this.state.mouseWorld, draft.basePoint);
    if (!targetPoint) return;
    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    stretchCommand.preview(targetPoint).forEach((entity) => {
      this.drawEntityOverlay(ctx, entity, {
        color: PREVIEW_COLOR,
        alpha: 0.35,
        outline: true,
      });
    });
    ctx.setLineDash([]);
    ctx.restore();
  }

  drawPolarArrayPreview(ctx) {
    const draft = this.state.polarArrayDraft;
    if (!draft || draft.selecting || !this.state.mouseWorld || !polarArrayCommand) return;
    const center = resolvePointForState(this.state.mouseWorld, this.state, null);
    drawPolarArrayCommandPreview(ctx, {
      entities: polarArrayCommand.previewAt(this.state.mouseWorld),
      drawEntity: (context, entity, color) =>
        this.drawHighlightedEntity(context, entity, color, 0),
      center,
      color: PREVIEW_COLOR,
      viewScale: this.state.viewScale,
    });
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(TransformPreviewMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, TransformPreviewMethods.prototype[name]]),
  );
}

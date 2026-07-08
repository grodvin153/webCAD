/* webCAD - Previews de herramientas | SPDX-License-Identifier: GPL-3.0-or-later */

export function createToolPreviewMethods(dependencies) {
  const {
    PREVIEW_COLOR,
    SNAP_THRESHOLD,
    TWO_PI,
    activeChamferDistances,
    activeFilletRadius,
    chamferSolution,
    drawOffsetCommandPreview,
    drawPointTangentLinePreview,
    drawTangentLineCommandPreview,
    drawXLineCommandPreview,
    filletOperandAt,
    filletSolutions,
    offsetCommand,
    pointTangentLineCommand,
    tangentLineCommand,
    xlineCommand,
  } = dependencies;

  class ToolPreviewMethods {
  drawFilletPreview(ctx) {
    const firstOperand = this.state.filletDraft?.firstOperand;
    const secondEntity = this.state.hoveredEntity;
    if (!firstOperand || !secondEntity || !this.state.mouseWorld) {
      return;
    }
    const secondOperand = filletOperandAt(secondEntity, this.state.mouseWorld);
    if (
      !secondOperand ||
      secondOperand.entity === firstOperand.entity &&
        secondOperand.segmentIndex === firstOperand.segmentIndex
    ) {
      return;
    }
    const solution = filletSolutions(firstOperand, secondOperand, activeFilletRadius())[0];
    if (!solution) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.fillStyle = PREVIEW_COLOR;
    ctx.lineWidth = 2 / this.state.viewScale;
    ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
    if (solution.radius > SNAP_THRESHOLD) {
      ctx.beginPath();
      ctx.arc(
        solution.center.x,
        solution.center.y,
        solution.radius,
        solution.startAngle,
        solution.endAngle,
        solution.clockwise === false,
      );
      ctx.stroke();
    }
    else {
      const markerRadius = 4 / this.state.viewScale;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(solution.center.x, solution.center.y, markerRadius, 0, TWO_PI);
      ctx.fill();
    }
    ctx.setLineDash([]);
    const tangentRadius = 3.5 / this.state.viewScale;
    for (const tangent of [solution.firstTangent, solution.secondTangent]) {
      ctx.beginPath();
      ctx.arc(tangent.x, tangent.y, tangentRadius, 0, TWO_PI);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawTangentLinePreview(ctx) {
    if (!tangentLineCommand) return;
    drawTangentLineCommandPreview(ctx, {
      draft: this.state.tangentLineDraft,
      hoveredEntity: this.state.hoveredEntity,
      cursorPoint: this.state.mouseWorld,
      command: tangentLineCommand,
      drawOperand: (context, entity) =>
        this.drawHighlightedEntity(context, entity, PREVIEW_COLOR, 2),
      previewColor: PREVIEW_COLOR,
      viewScale: this.state.viewScale,
    });
  }

  drawPointTangentPreview(ctx) {
    if (!pointTangentLineCommand || this.state.tool !== 'point-tangent-line') return;
    drawPointTangentLinePreview(ctx, {
      draft: this.state.tangentLineDraft,
      hoveredEntity: this.state.hoveredEntity,
      cursorPoint: this.state.mouseWorld,
      command: pointTangentLineCommand,
      drawOperand: (context, entity) =>
        this.drawHighlightedEntity(context, entity, PREVIEW_COLOR, 2),
      previewColor: PREVIEW_COLOR,
      viewScale: this.state.viewScale,
    });
  }

  drawXLinePreview(ctx) {
    if (!xlineCommand || this.state.tool !== 'xline') return;
    drawXLineCommandPreview(ctx, {
      command: xlineCommand,
      cursorPoint: this.state.mouseWorld,
      bounds: this.visibleWorldBounds(18 / this.state.viewScale),
      color: PREVIEW_COLOR,
      viewScale: this.state.viewScale,
    });
  }

  drawChamferPreview(ctx) {
    const firstOperand = this.state.chamferDraft?.firstOperand;
    const secondEntity = this.state.hoveredEntity;
    if (!firstOperand || !secondEntity || !this.state.mouseWorld) {
      return;
    }
    const secondOperand = filletOperandAt(secondEntity, this.state.mouseWorld);
    const distances = activeChamferDistances();
    const solution = chamferSolution(firstOperand, secondOperand, distances.first, distances.second);
    if (!solution.valid) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 2 / this.state.viewScale;
    ctx.setLineDash([7 / this.state.viewScale, 5 / this.state.viewScale]);
    ctx.beginPath();
    ctx.moveTo(solution.firstTangent.x, solution.firstTangent.y);
    ctx.lineTo(solution.secondTangent.x, solution.secondTangent.y);
    ctx.stroke();
    ctx.restore();
  }

  drawOffsetPreview(ctx) {
    if (!offsetCommand || this.state.tool !== 'offset' || !this.state.mouseWorld) return;
    drawOffsetCommandPreview(ctx, {
      entity: offsetCommand.previewAt(this.state.mouseWorld),
      drawEntity: (context, entity, color, width) =>
        this.drawHighlightedEntity(context, entity, color, width),
      previewColor: PREVIEW_COLOR,
      viewScale: this.state.viewScale,
    });
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ToolPreviewMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ToolPreviewMethods.prototype[name]]),
  );
}

/* webCAD - Pinzamientos y marcadores de snap | SPDX-License-Identifier: GPL-3.0-or-later */

export function createGripOverlayMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    SELECTED_COLOR,
    SNAP_COLOR,
    SNAP_MARKER_SIZE,
    circularReferencePoints,
    dimensionReferencePoints,
    ellipseReferencePoints,
    polylineReferencePoints,
  } = dependencies;

  class GripOverlayMethods {
  drawTextGrip(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.beginPath();
    ctx.rect(
      entity.insertionPoint.x - gripSize * 0.5,
      entity.insertionPoint.y - gripSize * 0.5,
      gripSize,
      gripSize,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawDimensionGrips(ctx, entity, options = {}) {
    const gripSize = 7 / this.state.viewScale;
    const color = options.color || SELECTED_COLOR;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    for (const candidate of dimensionReferencePoints(entity)) {
      const active = (
        this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key
      ) || (
        this.state.activeObjectSnap?.entity === entity &&
        this.state.activeObjectSnap?.key === candidate.key
      );
      ctx.fillStyle = active
        ? color
        : options.passive ? 'rgba(255, 255, 255, 0.82)' : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        candidate.point.x - gripSize * 0.5,
        candidate.point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBlockGrip(ctx, entity) {
    const gripSize = 9 / this.state.viewScale;
    const active = this.state.selectedGrip?.entity === entity;
    ctx.save();
    ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.beginPath();
    ctx.rect(
      entity.insertionPoint.x - gripSize * 0.5,
      entity.insertionPoint.y - gripSize * 0.5,
      gripSize,
      gripSize,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawLineGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;

    for (const key of ['start', 'end']) {
      const point = entity[key];
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === key;

      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawXLineGrip(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.beginPath();
    ctx.rect(
      entity.basePoint.x - gripSize * 0.5,
      entity.basePoint.y - gripSize * 0.5,
      gripSize,
      gripSize,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawPolylineGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    for (const candidate of polylineReferencePoints(entity)) {
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        candidate.point.x - gripSize * 0.5,
        candidate.point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawHatchGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    entity.gripIndices.forEach((index) => {
      const point = entity.boundary[index];
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.index === index;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  drawCircleGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;

    for (const candidate of circularReferencePoints(entity)) {
      const point = candidate.point;
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === candidate.key;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawEllipseGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    for (const candidate of ellipseReferencePoints(entity)) {
      const active = this.state.selectedGrip?.entity === entity && this.state.selectedGrip?.key === candidate.key;
      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(candidate.point.x - gripSize * 0.5, candidate.point.y - gripSize * 0.5, gripSize, gripSize);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawObjectSnapMarker(ctx) {
    const snap = this.state.activeObjectSnap;
    const visibleForTool = (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'regular-polygon' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'ellipse' ||
      this.state.tool === 'point-tangent-line' ||
      this.state.tool === 'xline' ||
      (this.state.tool === 'copy' && !this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && !this.state.moveDraft?.selecting) ||
      (this.state.tool === 'stretch' && !this.state.stretchDraft?.selecting) ||
      (this.state.tool === 'polar-array' && !this.state.polarArrayDraft?.selecting) ||
      (this.state.tool === 'rotate' && !this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'scale' && !this.state.scaleDraft?.selecting) ||
      (this.state.tool === 'mirror' && !this.state.mirrorDraft?.selecting) ||
      (this.state.tool === 'block-create' && !this.state.blockCreateDraft?.selecting) ||
      this.state.tool === 'block-insert' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'trim' ||
      DIMENSION_TOOLS.has(this.state.tool) ||
      Boolean(this.state.selectedGrip)
    );
    if (!snap || !visibleForTool) {
      return;
    }

    const size = SNAP_MARKER_SIZE / this.state.viewScale;
    const point = snap.point;

    ctx.save();
    ctx.strokeStyle = SNAP_COLOR;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.lineWidth = 2.4 / this.state.viewScale;
    ctx.shadowColor = 'rgba(208, 90, 31, 0.28)';
    ctx.shadowBlur = 5 / this.state.viewScale;

    if (snap.type === 'midpoint') {
      const height = size;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - height * 0.62);
      ctx.lineTo(point.x + size * 0.66, point.y + height * 0.46);
      ctx.lineTo(point.x - size * 0.66, point.y + height * 0.46);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    else if (snap.type === 'intersection') {
      const half = size * 0.48;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.moveTo(point.x + half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.stroke();
    }
    else if (snap.type === 'perpendicular') {
      const half = size * 0.42;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.stroke();
    }
    else if (snap.type === 'center') {
      const half = size * 0.46;
      ctx.beginPath();
      ctx.arc(point.x, point.y, half, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point.x - half * 0.72, point.y);
      ctx.lineTo(point.x + half * 0.72, point.y);
      ctx.moveTo(point.x, point.y - half * 0.72);
      ctx.lineTo(point.x, point.y + half * 0.72);
      ctx.stroke();
    }
    else {
      ctx.beginPath();
      ctx.rect(point.x - size * 0.5, point.y - size * 0.5, size, size);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(GripOverlayMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, GripOverlayMethods.prototype[name]]),
  );
}

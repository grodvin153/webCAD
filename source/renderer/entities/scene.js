/* webCAD - Escena, LOD y seleccion de entidades | SPDX-License-Identifier: GPL-3.0-or-later */

export function createEntitySceneMethods(dependencies) {
  const {
    PREVIEW_COLOR,
    SELECTED_COLOR,
    boundsIntersectsBounds,
    getLineStyle,
    isEllipseEntity,
  } = dependencies;

  class EntitySceneMethods {
  drawEntities(ctx) {
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    const visibleEntities = this.doc.queryBounds(viewBounds);
    const simplified = visibleEntities.length >= 6000;
    const verySimplified = visibleEntities.length >= 24000;
    const minimumGeometryPixels = verySimplified ? 1.1 : 0.55;
    for (const entity of visibleEntities) {
      if (entity.type !== 'HATCH' || this.doc.isSelected(entity) ||
          !boundsIntersectsBounds(entity.bounds(), viewBounds) ||
          (simplified && this.entityPixelSpan(entity) < minimumGeometryPixels)) {
        continue;
      }
      this.drawHatchFill(ctx, entity, {
        color: entity.color,
        minPointPixels: simplified ? (verySimplified ? 2.5 : 1.5) : 0,
      });
    }

    const lodBatches = new Map();
    for (const entity of visibleEntities) {
      if (this.doc.isSelected(entity)) {
        continue;
      }
      if (entity.type === 'HATCH') {
        continue;
      }
      if (entity.type !== 'XLINE' && !boundsIntersectsBounds(entity.bounds(), viewBounds)) {
        continue;
      }
      const style = getLineStyle(entity.lineStyle);
      const displayWidth = this.displayLineWidth(entity);
      const entityColor = entity.color || style.color;
      if (
        simplified &&
        (['LINE', 'CIRCLE', 'ARC', 'POLYLINE'].includes(entity.type) || isEllipseEntity(entity))
      ) {
        if (this.entityPixelSpan(entity) >= minimumGeometryPixels) {
          if (!lodBatches.has(entityColor)) {
            lodBatches.set(entityColor, []);
          }
          this.appendLodGeometry(lodBatches.get(entityColor), entity);
        }
        continue;
      }
      if (entity.type === 'LINE') {
        this.drawLineStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'XLINE') {
        this.drawXLineStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'ARC') {
        this.drawArcStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (isEllipseEntity(entity)) {
        this.drawEllipseStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'POLYLINE') {
        this.drawPolylineStroke(ctx, entity, { color: entityColor, width: displayWidth });
      }
      if (entity.type === 'TEXT') {
        if (!simplified || entity.height * this.state.viewScale >= (verySimplified ? 5 : 3)) {
          this.drawTextStroke(ctx, entity, { color: entityColor, width: displayWidth });
        }
      }
      if (entity.type === 'DIMENSION') {
        if (!simplified || this.entityPixelSpan(entity) >= 5) {
          this.drawDimensionEntity(ctx, entity, { color: entityColor });
        }
        if (this.state.dimensionDraft?.phase === 'placement') {
          this.drawDimensionGrips(ctx, entity, { color: PREVIEW_COLOR, passive: true });
        }
      }
      if (entity.type === 'INSERT') {
        if (!simplified || this.entityPixelSpan(entity) >= minimumGeometryPixels) {
          this.drawBlockReference(ctx, entity, { simplified });
        }
      }
      if (entity.type === 'IMAGE') {
        this.drawImageEntity(ctx, entity);
      }
    }
    if (simplified) {
      this.drawLodBatches(ctx, lodBatches);
    }

    if (this.state.tool === 'extend') {
      const boundaryEntities = this.state.extendDraft?.phase === 'boundaries'
        ? [...this.doc.selectedEntities]
        : this.state.extendDraft?.boundaries || [];
      for (const boundaryEntity of boundaryEntities) {
        if (!boundaryEntity || !boundsIntersectsBounds(boundaryEntity.bounds(), viewBounds)) {
          continue;
        }
        this.drawHighlightedEntity(ctx, boundaryEntity, PREVIEW_COLOR, 2);
      }
    }

    const filletFirstEntity = this.state.filletDraft?.firstOperand?.entity;
    if (filletFirstEntity && boundsIntersectsBounds(filletFirstEntity.bounds(), viewBounds)) {
      this.drawHighlightedEntity(ctx, filletFirstEntity, PREVIEW_COLOR, 2);
    }
    const chamferFirstEntity = this.state.chamferDraft?.firstOperand?.entity;
    if (chamferFirstEntity && boundsIntersectsBounds(chamferFirstEntity.bounds(), viewBounds)) {
      this.drawHighlightedEntity(ctx, chamferFirstEntity, PREVIEW_COLOR, 2);
    }

    const hoveredEntity = this.state.hoveredEntity;
    if (hoveredEntity && !this.doc.isSelected(hoveredEntity)) {
      for (const entity of this.doc.expandEntityGroups([hoveredEntity])) {
        if (!this.doc.isSelected(entity) &&
            (entity.type === 'XLINE' || boundsIntersectsBounds(entity.bounds(), viewBounds))) {
          this.drawHighlightedEntity(ctx, entity, PREVIEW_COLOR, 2);
        }
      }
    }

    for (const selectedEntity of this.doc.selectedEntities) {
      if (!selectedEntity ||
          (selectedEntity.type !== 'XLINE' && !boundsIntersectsBounds(selectedEntity.bounds(), viewBounds))) {
        continue;
      }
      if (this.isExtendBoundary(selectedEntity)) {
        continue;
      }
      if (selectedEntity?.type === 'LINE') {
        this.drawLineStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawLineGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'XLINE') {
        this.drawXLineStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawXLineGrip(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'CIRCLE') {
        this.drawCircleStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawCircleGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'ARC') {
        this.drawArcStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawCircleGrips(ctx, selectedEntity);
      }
      if (isEllipseEntity(selectedEntity)) {
        this.drawEllipseStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawEllipseGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'POLYLINE') {
        this.drawPolylineStroke(
          ctx,
          selectedEntity,
          { color: SELECTED_COLOR, width: Math.max(3, this.displayLineWidth(selectedEntity) + 1) },
        );
        this.drawPolylineGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'TEXT') {
        this.drawTextStroke(ctx, selectedEntity, { color: SELECTED_COLOR, width: 1 });
        this.drawTextGrip(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'DIMENSION') {
        this.drawDimensionEntity(ctx, selectedEntity, { color: SELECTED_COLOR, width: 2.25 });
        this.drawDimensionGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'HATCH') {
        this.drawHatchFill(ctx, selectedEntity, {
          color: SELECTED_COLOR,
          alpha: 0.35,
          outline: true,
        });
        this.drawHatchGrips(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'INSERT') {
        this.drawBlockReference(ctx, selectedEntity, {
          color: SELECTED_COLOR,
          width: Math.max(3, this.displayLineWidth(selectedEntity) + 1),
          alpha: 0.35,
          outline: true,
        });
        this.drawBlockGrip(ctx, selectedEntity);
      }
      if (selectedEntity?.type === 'IMAGE') {
        this.drawImageEntity(ctx, selectedEntity, {
          outlineColor: SELECTED_COLOR,
          outlineWidth: 2.25,
        });
      }
    }
  }

  drawSketchReferences(ctx) {
    const references = Array.isArray(this.state.sketchReferenceEntities)
      ? this.state.sketchReferenceEntities
      : [];
    for (const entity of references) {
      this.drawEntityOverlay(ctx, entity, {
        color: '#2878c8',
        width: 1.5,
      });
    }
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(EntitySceneMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, EntitySceneMethods.prototype[name]]),
  );
}

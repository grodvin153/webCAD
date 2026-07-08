/* webCAD - Ordenes de imagen | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerImageMethods(dependencies) {
  const {
    RasterImageEntity,
    SNAP_THRESHOLD,
    activeLayerName,
    applyImageAlignment,
    bestImageAlignment,
    dimensionLineFromEntity,
    distance,
    distancePointToSegment,
    orthogonalInference,
  } = dependencies;

  class ControllerImageMethods {
  startImageInsertion(imageData) {
    this.setTool('image-insert');
    const width = Math.max(this.renderer.visibleWorldWidth() * 0.35, SNAP_THRESHOLD * 10);
    const height = width * imageData.pixelHeight / imageData.pixelWidth;
    const center = this.state.mouseWorld || {
      x: this.state.viewOffset.x + this.renderer.visibleWorldWidth() * 0.5,
      y: this.state.viewOffset.y + this.renderer.visibleWorldHeight() * 0.5,
    };
    this.state.imageDraft = {
      preview: new RasterImageEntity(center, width, height, imageData.source, {
        name: imageData.name,
        layer: activeLayerName(),
      }),
    };
    this.state.statusText = 'Imagen cargada: indique el punto de insercion';
    this.updateUiStatus();
    this.renderer.draw();
  }

  startImageCalibration(entity) {
    this.setTool('image-calibrate');
    this.state.imageCalibrationDraft = {
      entity,
      phase: 'source-start',
      sourceStart: null,
      sourceEnd: null,
      previewPoint: null,
      targetSegment: null,
    };
    this.doc.selectEntity(entity);
    this.state.statusText = 'Calibrar imagen: indique el primer punto sobre la imagen';
    this.updateUiStatus();
    this.renderer.draw();
  }

  applyImageSegmentAlignment() {
    const draft = this.state.imageCalibrationDraft;
    if (!draft?.sourceStart || !draft.sourceEnd || !draft.targetSegment) return false;
    const alignment = bestImageAlignment(
      draft.entity,
      draft.sourceStart,
      draft.sourceEnd,
      draft.targetSegment,
    );
    if (!alignment) return false;
    this.doc.recordHistory();
    applyImageAlignment(draft.entity, alignment);
    this.doc.markDirty();
    const entity = draft.entity;
    this.setTool('select');
    this.doc.selectEntity(entity);
    this.state.statusText = 'Imagen alineada y escalada con el segmento de referencia';
    return true;
  }

  handleImagePoint(worldPoint) {
    if (this.state.tool === 'image-insert' && this.state.imageDraft?.preview) {
      const entity = this.state.imageDraft.preview;
      entity.center = { ...this.resolveInputPoint(worldPoint) };
      this.doc.addEntity(entity);
      this.setTool('select');
      this.doc.selectEntity(entity);
      this.state.statusText = 'Imagen insertada · doble clic para calibrar o alinear';
      return true;
    }
    const draft = this.state.imageCalibrationDraft;
    if (this.state.tool !== 'image-calibrate' || !draft) return false;
    if (draft.phase === 'source-start') {
      const sourceStart = this.resolveInputPoint(worldPoint) || worldPoint;
      draft.sourceStart = { ...sourceStart };
      draft.phase = 'source-end';
      this.state.statusText = 'Calibrar imagen: indique el segundo punto · Shift bloquea la inferencia de eje';
      return true;
    }
    if (draft.phase === 'source-end') {
      const sourceEnd = this.resolveInputPoint(worldPoint) || worldPoint;
      if (distance(draft.sourceStart, sourceEnd) <= SNAP_THRESHOLD) {
        this.state.statusText = 'Los dos puntos de referencia deben ser distintos';
        return false;
      }
      draft.sourceEnd = { ...sourceEnd };
      draft.previewPoint = null;
      draft.phase = 'target';
      orthogonalInference.clear(this.state);
      this.state.statusText = 'Pique una linea o tramo de polilinea para alinear y escalar · Enter para indicar longitud';
      return true;
    }
    if (draft.phase === 'target') {
      draft.targetSegment = this.imageReferenceSegmentAt(worldPoint, draft.entity);
      if (draft.targetSegment) return this.applyImageSegmentAlignment();
      this.state.statusText = 'Seleccione una linea o un tramo recto de polilinea · Enter para indicar longitud';
    }
    return false;
  }

  imageReferenceSegmentAt(point, excludedEntity) {
    const candidate = this.findEntityAt(point, { exclude: excludedEntity });
    const segment = dimensionLineFromEntity(candidate, point);
    const tolerance = 7 / this.state.viewScale;
    return segment && distancePointToSegment(point, segment.start, segment.end) <= tolerance
      ? segment
      : null;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerImageMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerImageMethods.prototype[name]]),
  );
}

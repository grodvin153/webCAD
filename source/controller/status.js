/* webCAD - Estado visual del controlador | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerStatusMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    activeDraftOrigin,
    activeDrawingProfile,
    activeFilletRadius,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    activeOffsetDistance,
    blockEditorBar,
    blockEditorName,
    commandLabel,
    distance,
    dimensionPlacementPoint,
    formatChamferDistances,
    formatNumber,
    formatSnapType,
    getLineColor,
    getLineStyle,
    getLineType,
    parseCopyMultiplier,
    parseDistanceInput,
    pointFromDistance,
    pointFromPartialRelativeCoordinates,
    pointFromRelativeCoordinates,
    polylineTangentArcToPoint,
    rectangleTargetPoint,
    redoButton,
    redoCommandButtons,
    resolveCursorPoint,
    resolvePointForState,
    statusCursor,
    statusDxf,
    statusEntities,
    statusGridButton,
    statusLayer,
    statusLength,
    statusLineWeightButton,
    statusMessage,
    statusOrthoButton,
    statusTool,
    undoButton,
    undoCommandButtons,
    unitsLabel,
  } = dependencies;

  class ControllerStatusMethods {
  updateUiStatus() {
    this.updateCanvasCursorMode();
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    if (this.state.dimensionDraft?.phase === 'placement' && cursor) {
      dimensionPlacementPoint(this.state.dimensionDraft, cursor, this.state);
    }
    let toolLabel = 'Seleccion';
    if (this.state.tool === 'line') {
      toolLabel = 'Linea 2P';
    }
    if (this.state.tool === 'tangent-line') {
      toolLabel = 'Linea tangente';
    }
    if (this.state.tool === 'point-tangent-line') {
      toolLabel = 'Punto a tangente';
    }
    if (this.state.tool === 'xline') {
      toolLabel = 'Linea infinita';
    }
    if (this.state.tool === 'polyline') {
      toolLabel = 'Polilinea';
    }
    if (this.state.tool === 'rectangle') {
      toolLabel = 'Rectangulo';
    }
    if (this.state.tool === 'text') {
      toolLabel = 'Texto';
    }
    if (this.state.tool === 'hatch') {
      toolLabel = 'Sombreado';
    }
    if (this.state.tool === 'circle-center') {
      toolLabel = 'Circulo C-R';
    }
    if (this.state.tool === 'circle-3p') {
      toolLabel = 'Circulo 3P';
    }
    if (this.state.tool === 'arc-center-radius') {
      toolLabel = 'Arco C-R';
    }
    if (this.state.tool === 'arc-3p') {
      toolLabel = 'Arco 3P';
    }
    if (this.state.tool === 'arc-center-start-end') {
      toolLabel = 'Arco C-I-F';
    }
    if (this.state.tool === 'ellipse') {
      toolLabel = 'Elipse';
    }
    if (this.state.tool === 'trim') {
      toolLabel = 'Recortar';
    }
    if (this.state.tool === 'fillet') {
      toolLabel = `Empalme R${formatNumber(activeFilletRadius())}`;
    }
    if (this.state.tool === 'offset') {
      toolLabel = `Equidistancia ${formatNumber(activeOffsetDistance())}`;
    }
    if (this.state.tool === 'chamfer') {
      toolLabel = `Chaflan ${formatChamferDistances()}`;
    }
    if (this.state.tool === 'extend') {
      toolLabel = 'Alargar';
    }
    if (this.state.tool === 'erase') {
      toolLabel = 'Borrar';
    }
    if (this.state.tool === 'copy') {
      toolLabel = 'Copiar';
    }
    if (this.state.tool === 'move') {
      toolLabel = 'Desplazar';
    }
    if (this.state.tool === 'select-set') {
      toolLabel = 'Seleccionar DS';
    }
    if (this.state.tool === 'rotate') {
      toolLabel = 'Girar';
    }
    if (this.state.tool === 'scale') {
      toolLabel = 'Escala';
    }
    if (this.state.tool === 'stretch') {
      toolLabel = 'Estirar';
    }
    if (this.state.tool === 'polar-array') {
      toolLabel = `Matriz polar ${this.state.polarArrayCount}`;
    }
    if (this.state.tool === 'mirror') {
      toolLabel = 'Simetria';
    }
    if (this.state.tool === 'explode') {
      toolLabel = 'Descomponer';
    }
    if (this.state.tool === 'block-create') {
      toolLabel = 'Crear bloque';
    }
    if (this.state.tool === 'block-insert') {
      toolLabel = 'Insertar bloque';
    }
    if (this.state.tool === 'image-insert') {
      toolLabel = 'Insertar imagen';
    }
    if (this.state.tool === 'image-calibrate') {
      toolLabel = 'Calibrar imagen';
    }
    if (DIMENSION_TOOLS.has(this.state.tool)) {
      toolLabel = commandLabel(this.state.tool);
    }
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    const activeGripPoint = this.activeGripPoint();
    const coordinateOrigin = this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      this.state.stretchDraft?.basePoint ||
      this.state.mirrorDraft?.firstPoint ||
      activeGripPoint ||
      this.state.pendingLineStart ||
      activeDraftOrigin(this.state) ||
      this.state.rectangleDraft?.firstPoint ||
      this.state.regularPolygonDraft?.center ||
      this.state.circleDraft?.points[0] ||
      this.state.arcDraft?.points[0] ||
      this.state.ellipseDraft?.points[0] ||
      (this.state.blockCreateDraft?.name ? { x: 0, y: 0 } : null) ||
      (this.state.blockInsertDraft ? { x: 0, y: 0 } : null) ||
      null;
    const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);
    const partialCoordinateTarget = pointFromPartialRelativeCoordinates(
      coordinateOrigin,
      cursor,
      this.state.distanceInput,
    );
    const activeGripReferencePoint = this.activeGripReferencePoint();
    const activeGripAxisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    const gripDirectionPoint = activeGripPoint
      ? resolvePointForState(
          this.state.mouseWorld,
          this.state,
          activeGripReferencePoint,
          activeGripAxisLine ? { axisLine: activeGripAxisLine } : {},
        )
      : null;
    const previewEnd = coordinateTarget || partialCoordinateTarget ||
      (inputDistance !== null && this.state.pendingLineStart && cursor
      ? pointFromDistance(this.state.pendingLineStart, cursor, inputDistance)
      : cursor);
    const gripPreviewEnd = coordinateTarget || partialCoordinateTarget ||
      (inputDistance !== null && activeGripPoint && gripDirectionPoint
      ? pointFromDistance(activeGripPoint, gripDirectionPoint, inputDistance)
      : null);
    const copyPreviewTarget = this.state.copyDraft?.basePoint
      ? (coordinateTarget || partialCoordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const movePreviewTarget = this.state.moveDraft?.basePoint
      ? (coordinateTarget || partialCoordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const rectanglePreviewTarget = this.state.rectangleDraft?.firstPoint
      ? rectangleTargetPoint(this.state.rectangleDraft, cursor, this.state.distanceInput)
      : null;
    const previewLength = this.state.pendingLineStart && previewEnd
      ? distance(this.state.pendingLineStart, previewEnd)
      : this.state.polylineDraft?.vertices.length && cursor
        ? distance(activeDraftOrigin(this.state), cursor)
      : rectanglePreviewTarget && this.state.rectangleDraft?.firstPoint
        ? distance(this.state.rectangleDraft.firstPoint, rectanglePreviewTarget)
      : this.state.regularPolygonDraft?.center && cursor
        ? distance(this.state.regularPolygonDraft.center, cursor)
      : this.state.circleDraft?.mode === 'center-radius' && this.state.circleDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.circleDraft.points[0], previewEnd))
      : this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.arcDraft.points[0], previewEnd))
      : gripPreviewEnd && activeGripPoint
        ? distance(activeGripPoint, gripPreviewEnd)
      : copyPreviewTarget && this.state.copyDraft?.basePoint
        ? distance(this.state.copyDraft.basePoint, copyPreviewTarget)
      : movePreviewTarget && this.state.moveDraft?.basePoint
        ? distance(this.state.moveDraft.basePoint, movePreviewTarget)
      : this.state.stretchDraft?.basePoint && cursor
        ? distance(this.state.stretchDraft.basePoint, coordinateTarget || partialCoordinateTarget || cursor)
      : null;

    if (this.state.distanceInput) {
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : coordinateTarget || partialCoordinateTarget
        ? `Coordenadas: ${this.state.distanceInput} ${unitsLabel()}`
        : (
        this.state.circleDraft?.mode === 'center-radius' ||
        this.state.arcDraft?.mode === 'center-radius'
      )
        ? `Radio: ${this.state.distanceInput} ${unitsLabel()}`
        : `Distancia: ${this.state.distanceInput} ${unitsLabel()}`;
    }
    else if (this.state.pendingLineStart && previewEnd) {
      const lineLength = formatNumber(previewLength);
      this.state.statusText = `Segundo punto pendiente - longitud ${lineLength} ${unitsLabel()}`;
    }
    else if (this.state.polylineDraft?.vertices.length && cursor) {
      const draft = this.state.polylineDraft;
      const modeLabel = draft.mode === 'line'
        ? 'Linea'
        : 'Arco tangente';
      const start = draft.vertices[draft.vertices.length - 1];
      const pendingMeasure = draft.mode === 'arc-end'
        ? polylineTangentArcToPoint(draft, start, cursor).radius
        : previewLength;
      this.state.statusText = `${modeLabel} pendiente · ${formatNumber(pendingMeasure)} ${unitsLabel()} · A/L/C/W`;
    }
    else if (this.state.rotateDraft?.basePoint) {
      const previewAngle = this.renderer.rotatePreviewAngle();
      this.state.statusText = previewAngle === null
        ? 'Angulo pendiente'
        : `Angulo pendiente - ${formatNumber(previewAngle)}°${this.state.orthoEnabled ? ' (orto)' : ''}`;
    }
    else if (this.state.rectangleDraft?.firstPoint && rectanglePreviewTarget) {
      const width = Math.abs(rectanglePreviewTarget.x - this.state.rectangleDraft.firstPoint.x);
      const height = Math.abs(rectanglePreviewTarget.y - this.state.rectangleDraft.firstPoint.y);
      this.state.statusText = `Esquina opuesta pendiente - ${formatNumber(width)} x ${formatNumber(height)} ${unitsLabel()}`;
    }
    else if (this.state.regularPolygonDraft?.center && previewLength !== null) {
      this.state.statusText = `Radio de poligono pendiente - ${formatNumber(previewLength)} ${unitsLabel()}`;
    }
    else if (this.state.circleDraft?.mode === 'center-radius' && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${unitsLabel()}`;
    }
    else if (this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${unitsLabel()}`;
    }
    else if (this.state.blockCreateDraft?.name) {
      this.state.statusText = `Bloque ${this.state.blockCreateDraft.name}: indique el punto base`;
    }
    else if (this.state.blockInsertDraft?.definition) {
      this.state.statusText = `Insertar ${this.state.blockInsertDraft.definition.name}: indique el punto de insercion`;
    }
    if (this.state.activeInference && !this.state.distanceInput) {
      const axisLabel = this.state.activeInference.axis === 'horizontal' ? 'horizontal' : 'vertical';
      const inferenceLabel = this.state.activeInference.locked
        ? `Eje ${axisLabel} bloqueado con Shift`
        : `En eje ${axisLabel} · Shift para bloquear`;
      const baseStatus = (this.state.statusText || 'Inferencia')
        .replace(/ · En eje (?:horizontal|vertical) · Shift para bloquear$/, '')
        .replace(/ · Eje (?:horizontal|vertical) bloqueado con Shift$/, '');
      this.state.statusText = `${baseStatus} · ${inferenceLabel}`;
    }
    if (!this.state.statusText) {
      this.state.statusText = 'Listo';
    }

    statusTool.textContent = `Herramienta: ${toolLabel}`;
    statusCursor.textContent = cursor
      ? `Cursor: ${formatNumber(cursor.x)}, ${formatNumber(cursor.y)} ${unitsLabel()}${
          this.state.activeObjectSnap ? ` · ${formatSnapType(this.state.activeObjectSnap.type)}` : ''
        }`
      : 'Cursor: -';
    statusEntities.textContent = `Entidades: ${this.doc.entities.length}`;
    statusLength.textContent = previewLength !== null
      ? `${this.state.circleDraft?.mode === 'center-radius' || this.state.arcDraft?.mode === 'center-radius' ? 'Radio' : 'Longitud'}: ${formatNumber(previewLength)} ${unitsLabel()}`
      : 'Longitud: -';
    statusLayer.textContent = `Capa: ${activeLayerName()} · ${getLineStyle(activeLineStyleId()).label} · ${getLineType(activeLineTypeId()).label} · ${getLineColor(activeLineColorId()).label}`;
    statusMessage.textContent = this.state.statusText || 'Listo';
    const editingBlock = this.state.blockEditDraft;
    blockEditorBar.hidden = !editingBlock;
    blockEditorName.textContent = editingBlock?.name || 'Bloque';
    statusDxf.textContent = editingBlock
      ? `EDITAR BLOQUE · ${editingBlock.name}`
      : `${activeDrawingProfile().shortLabel} · DXF`;
    statusOrthoButton.classList.toggle('is-active', this.state.orthoEnabled);
    statusOrthoButton.setAttribute('aria-pressed', String(this.state.orthoEnabled));
    statusOrthoButton.title = this.state.orthoEnabled
      ? 'Modo ortogonal activo (O)'
      : 'Modo ortogonal (O)';
    statusGridButton.classList.toggle('is-active', this.state.snapEnabled);
    statusGridButton.setAttribute('aria-pressed', String(this.state.snapEnabled));
    statusGridButton.title = this.state.snapEnabled
      ? 'Snap a rejilla activo'
      : 'Snap a rejilla desactivado';
    statusLineWeightButton.classList.toggle(
      'is-active',
      this.state.lineWeightDisplayEnabled,
    );
    statusLineWeightButton.setAttribute(
      'aria-pressed',
      String(this.state.lineWeightDisplayEnabled),
    );
    statusLineWeightButton.title = this.state.lineWeightDisplayEnabled
      ? 'Grosores de línea visibles'
      : 'Grosores de línea ocultos';
    undoButton.disabled = !this.doc.canUndo();
    redoButton.disabled = !this.doc.canRedo();
    undoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canUndo();
    });
    redoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canRedo();
    });
    this.updateCursorInput();
  }
  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerStatusMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerStatusMethods.prototype[name]]),
  );
}

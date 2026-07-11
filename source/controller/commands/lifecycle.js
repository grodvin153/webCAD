/* webCAD - Ciclo de vida de ordenes | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerLifecycleMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    REPEATABLE_COMMANDS,
    activeFilletRadius,
    activeOffsetDistance,
    arcToolButton,
    blockToolButton,
    chamferDistanceControl,
    chamferToolButton,
    circleToolButton,
    commandLabel,
    copyToolButton,
    dimensionPlacementPoint,
    dimensionToolButtons,
    eraseToolButton,
    ellipseCommand,
    ellipseToolButton,
    explodeToolButton,
    extendCommand,
    extendToolButton,
    filletRadiusControl,
    filletToolButton,
    formatChamferDistances,
    formatNumber,
    hatchToolButton,
    lineToolButton,
    mirrorToolButton,
    moveToolButton,
    offsetDistanceControl,
    offsetToolButton,
    openImageCalibrationDialog,
    orthogonalInference,
    pointTangentLineToolButton,
    polarArrayCommand,
    polarArrayCountControl,
    polarArrayToolButton,
    polylineJoinToolButton,
    polylineToolButton,
    rectangleToolButton,
    regularPolygonSidesControl,
    regularPolygonToolButton,
    resolveCursorPoint,
    resolvePointForState,
    rotateToolButton,
    runCommand,
    scaleCommand,
    scaleToolButton,
    selectToolButton,
    stretchCommand,
    stretchToolButton,
    syncChamferDistanceControl,
    syncFilletRadiusControl,
    syncOffsetDistanceControl,
    syncPolarArrayCountControl,
    syncRegularPolygonSidesControl,
    tangentLineToolButton,
    textToolButton,
    toolFlyoutCommandButtons,
    trimToolButton,
    xlineToolButton,
  } = dependencies;

  class ControllerLifecycleMethods {
  resolveInputPoint(point) {
    return resolveCursorPoint(point, this.state);
  }

  resolveMirrorAxisPoint(point) {
    return resolvePointForState(
      point,
      this.state,
      this.state.mirrorDraft?.firstPoint || null,
    );
  }

  setTool(tool) {
    this.cancelKeyboardRefresh();
    this.state.tool = tool;
    this.state.pendingLineStart = null;
    this.state.polylineDraft = null;
    this.state.rectangleDraft = null;
    this.state.regularPolygonDraft = null;
    this.state.textDraft = null;
    this.state.hatchDraft = null;
    this.state.circleDraft = null;
    this.state.arcDraft = null;
    this.state.ellipseDraft = null;
    this.state.tangentLineDraft = null;
    this.state.xlineDraft = null;
    this.state.copyDraft = null;
    this.state.moveDraft = null;
    this.state.stretchDraft = null;
    this.state.polarArrayDraft = null;
    this.state.polylineJoinDraft = null;
    this.state.rotateDraft = null;
    this.state.scaleDraft = null;
    this.state.mirrorDraft = null;
    this.state.filletDraft = tool === 'fillet'
      ? { firstOperand: null }
      : null;
    this.state.chamferDraft = tool === 'chamfer'
      ? { firstOperand: null }
      : null;
    this.state.offsetDraft = null;
    this.state.selectionSetDraft = null;
    this.state.eraseDraft = null;
    this.state.explodeDraft = null;
    this.state.extendDraft = null;
    this.state.blockCreateDraft = null;
    this.state.blockInsertDraft = null;
    this.state.dimensionDraft = null;
    this.state.imageDraft = null;
    this.state.imageCalibrationDraft = null;
    this.state.distanceInput = '';
    this.state.selectedGrip = null;
    this.state.activeObjectSnap = null;
    orthogonalInference.clear(this.state);
    this.state.hoveredEntity = null;
    this.state.selectionWindow = null;
    this.gripDragState = null;
    if (
      tool === 'line' ||
      tool === 'polyline' ||
      tool === 'rectangle' ||
      tool === 'regular-polygon' ||
      tool === 'text' ||
      tool === 'hatch' ||
      tool === 'circle-center' ||
      tool === 'circle-3p' ||
      tool === 'arc-center-radius' ||
      tool === 'arc-3p' ||
      tool === 'arc-center-start-end' ||
      tool === 'ellipse' ||
      tool === 'tangent-line' ||
      tool === 'point-tangent-line' ||
      tool === 'xline' ||
      tool === 'block-create' ||
      tool === 'block-insert' ||
      DIMENSION_TOOLS.has(tool) ||
      tool === 'copy' ||
      tool === 'move' ||
      tool === 'stretch' ||
      tool === 'polar-array' ||
      tool === 'rotate' ||
      tool === 'scale' ||
      tool === 'mirror' ||
      tool === 'select-set' ||
      tool === 'trim' ||
      tool === 'fillet' ||
      tool === 'offset' ||
      tool === 'chamfer' ||
      tool === 'extend' ||
      tool === 'erase' ||
      tool === 'explode'
      || tool === 'polyline-join'
      || tool === 'image-insert'
      || tool === 'image-calibrate'
    ) {
      if (tool !== 'copy' && tool !== 'move' && tool !== 'stretch' && tool !== 'polar-array' && tool !== 'rotate' && tool !== 'scale' && tool !== 'mirror' && tool !== 'select-set' && tool !== 'erase' && tool !== 'explode' && tool !== 'polyline-join' && tool !== 'extend' && tool !== 'block-create') {
        this.doc.selectEntity(null);
      }
    }
    filletRadiusControl.hidden = tool !== 'fillet';
    offsetDistanceControl.hidden = tool !== 'offset';
    chamferDistanceControl.hidden = tool !== 'chamfer';
    polarArrayCountControl.hidden = tool !== 'polar-array';
    regularPolygonSidesControl.hidden = tool !== 'regular-polygon';
    if (tool === 'fillet') {
      syncFilletRadiusControl();
    }
    if (tool === 'offset') {
      syncOffsetDistanceControl();
    }
    if (tool === 'chamfer') {
      syncChamferDistanceControl();
    }
    if (tool === 'polar-array') {
      syncPolarArrayCountControl();
    }
    if (tool === 'regular-polygon') {
      syncRegularPolygonSidesControl();
    }
    this.state.statusText = tool === 'select'
      ? 'Seleccionar entidad'
      : tool === 'trim'
        ? 'Recortar: pique el tramo a eliminar'
        : tool === 'fillet'
          ? `Empalme R${formatNumber(activeFilletRadius())}: seleccione la primera linea`
        : tool === 'offset'
          ? `Equidistancia ${formatNumber(activeOffsetDistance())}: seleccione una entidad`
        : tool === 'chamfer'
          ? `Chaflan ${formatChamferDistances()}: seleccione la primera linea o tramo`
        : tool === 'extend'
          ? 'Alargar: seleccione limites'
        : tool === 'erase'
          ? 'Borrar: seleccione objetos y confirme'
        : tool === 'explode'
          ? 'Descomponer: seleccione bloques o polilineas y confirme'
        : tool === 'polyline-join'
          ? 'Unir polilineas: seleccione LINE y POLYLINE conectadas y confirme'
          : tool === 'copy'
            ? 'Copiar: indique punto origen'
            : tool === 'move'
              ? 'Desplazar: indique punto origen'
            : tool === 'stretch'
              ? 'Estirar: seleccione con ventana captura'
            : tool === 'polar-array'
              ? 'Matriz polar: seleccione objetos y confirme'
                : tool === 'rotate'
                  ? 'Girar: indique punto base'
                : tool === 'scale'
                  ? 'Escalar: indique punto base'
                : tool === 'mirror'
                  ? 'Simetria: indique primer punto del eje'
                : tool === 'block-create'
                  ? 'Crear bloque: seleccione objetos'
                : tool === 'block-insert'
                  ? 'Insertar bloque: indique punto de insercion'
                : tool === 'image-insert'
                  ? 'Imagen: indique punto de insercion'
                : tool === 'image-calibrate'
                  ? 'Imagen: indique primer punto de referencia'
                : tool === 'tangent-line'
                  ? 'Linea tangente: seleccione el primer objeto'
                : tool === 'point-tangent-line'
                  ? 'Linea de punto a tangente a curva: indique el punto inicial'
                : tool === 'xline'
                  ? 'Linea infinita: indique un punto'
                : tool === 'text'
                  ? 'Texto: indique contenido y altura'
                  : tool === 'select-set'
                    ? 'Seleccionar conjunto: elija objetos y confirme'
                    : tool === 'hatch'
                      ? 'Sombreado: configure sus propiedades'
          : tool === 'circle-center'
            ? 'Circulo: indique centro'
            : tool === 'circle-3p'
              ? 'Circulo 3 puntos: indique primer punto'
              : tool === 'arc-center-radius'
                ? 'Arco centro-radio: indique centro'
                : tool === 'arc-3p'
                  ? 'Arco 3 puntos: indique primer punto'
                  : tool === 'arc-center-start-end'
                    ? 'Arco centro-inicio-final: indique centro'
                      : tool === 'rectangle'
                        ? 'Rectangulo: indique primera esquina'
                      : tool === 'regular-polygon'
                        ? 'Poligono regular: indique centro'
                      : tool === 'ellipse'
                        ? 'Elipse: indique primer extremo del eje mayor'
                      : tool === 'polyline'
                        ? 'Polilinea: indique primer punto'
                      : 'Linea por dos puntos';
    selectToolButton.classList.toggle('is-active', tool === 'select');
    lineToolButton.classList.toggle('is-active', tool === 'line');
    tangentLineToolButton.classList.toggle('is-active', tool === 'tangent-line');
    pointTangentLineToolButton.classList.toggle('is-active', tool === 'point-tangent-line');
    xlineToolButton.classList.toggle('is-active', tool === 'xline');
    polylineToolButton.classList.toggle('is-active', tool === 'polyline');
    rectangleToolButton.classList.toggle('is-active', tool === 'rectangle');
    regularPolygonToolButton.classList.toggle('is-active', tool === 'regular-polygon');
    textToolButton.classList.toggle('is-active', tool === 'text');
    hatchToolButton.classList.toggle('is-active', tool === 'hatch');
    circleToolButton.classList.toggle('is-active', tool === 'circle-center' || tool === 'circle-3p');
    arcToolButton.classList.toggle(
      'is-active',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    ellipseToolButton.classList.toggle('is-active', tool === 'ellipse');
    blockToolButton.classList.toggle('is-active', tool === 'block-create' || tool === 'block-insert');
    trimToolButton.classList.toggle('is-active', tool === 'trim');
    filletToolButton.classList.toggle('is-active', tool === 'fillet');
    offsetToolButton.classList.toggle('is-active', tool === 'offset');
    chamferToolButton.classList.toggle('is-active', tool === 'chamfer');
    extendToolButton.classList.toggle('is-active', tool === 'extend');
    copyToolButton.classList.toggle('is-active', tool === 'copy');
    moveToolButton.classList.toggle('is-active', tool === 'move');
    stretchToolButton.classList.toggle('is-active', tool === 'stretch');
    polarArrayToolButton.classList.toggle('is-active', tool === 'polar-array');
    rotateToolButton.classList.toggle('is-active', tool === 'rotate');
    scaleToolButton.classList.toggle('is-active', tool === 'scale');
    mirrorToolButton.classList.toggle('is-active', tool === 'mirror');
    eraseToolButton.classList.toggle('is-active', tool === 'erase');
    explodeToolButton.classList.toggle('is-active', tool === 'explode');
    polylineJoinToolButton.classList.toggle('is-active', tool === 'polyline-join');
    dimensionToolButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    this.canvas.classList.toggle('is-select-tool', tool === 'select');
    this.canvas.classList.toggle(
      'is-line-tool',
      tool === 'line' || tool === 'tangent-line' || tool === 'point-tangent-line' || tool === 'xline' || tool === 'polyline' || tool === 'rectangle' || tool === 'regular-polygon' || tool === 'ellipse' || DIMENSION_TOOLS.has(tool),
    );
    this.canvas.classList.toggle('is-text-tool', tool === 'text');
    this.canvas.classList.toggle('is-hatch-tool', tool === 'hatch');
    this.canvas.classList.toggle('is-circle-tool', tool === 'circle-center' || tool === 'circle-3p');
    this.canvas.classList.toggle(
      'is-arc-tool',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    this.canvas.classList.toggle('is-trim-tool', tool === 'trim' || tool === 'fillet' || tool === 'offset' || tool === 'chamfer');
    this.canvas.classList.toggle('is-extend-tool', tool === 'extend');
    this.canvas.classList.toggle('is-copy-tool',
      tool === 'copy' && this.state.copyDraft?.selecting ||
      tool === 'stretch' && this.state.stretchDraft?.selecting ||
      tool === 'polar-array' && this.state.polarArrayDraft?.selecting ||
      tool === 'polyline-join' && this.state.polylineJoinDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle('is-rotate-tool',
      tool === 'rotate' && this.state.rotateDraft?.selecting ||
      tool === 'scale' && this.state.scaleDraft?.selecting ||
      tool === 'mirror' && this.state.mirrorDraft?.selecting);
    this.canvas.classList.toggle('is-selection-set-tool', tool === 'select-set');
    this.canvas.classList.toggle(
      'is-dimension-select-tool',
      DIMENSION_TOOLS.has(tool) && Boolean(this.state.dimensionDraft) &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'),
    );
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting) ||
        (tool === 'stretch' && this.state.stretchDraft && !this.state.stretchDraft.selecting) ||
        (tool === 'polar-array' && this.state.polarArrayDraft && !this.state.polarArrayDraft.selecting) ||
        (tool === 'rotate' && this.state.rotateDraft && !this.state.rotateDraft.selecting) ||
        (tool === 'scale' && this.state.scaleDraft && !this.state.scaleDraft.selecting) ||
        (tool === 'mirror' && this.state.mirrorDraft && !this.state.mirrorDraft.selecting) ||
        (tool === 'block-create' && this.state.blockCreateDraft && !this.state.blockCreateDraft.selecting) ||
        (tool === 'block-insert' && this.state.blockInsertDraft) ||
        tool === 'image-insert' || tool === 'image-calibrate',
    );
    this.canvas.classList.toggle('is-erase-tool', tool === 'erase');
    this.canvas.classList.toggle('is-explode-tool', tool === 'explode');
    this.updateUiStatus();
    this.renderer.draw();
  }

  isIdleForCommandRepeat() {
    return this.state.tool === 'select' &&
      !this.state.pendingLineStart &&
      !this.state.polylineDraft &&
      !this.state.regularPolygonDraft &&
      !this.state.circleDraft &&
      !this.state.arcDraft &&
      !this.state.tangentLineDraft &&
      !this.state.textDraft &&
      !this.state.hatchDraft &&
      !this.state.copyDraft &&
      !this.state.moveDraft &&
      !this.state.stretchDraft &&
      !this.state.polarArrayDraft &&
      !this.state.rotateDraft &&
      !this.state.scaleDraft &&
      !this.state.filletDraft &&
      !this.state.offsetDraft &&
      !this.state.selectionSetDraft &&
      !this.state.eraseDraft &&
      !this.state.explodeDraft &&
      !this.state.extendDraft &&
      !this.state.blockCreateDraft &&
      !this.state.blockInsertDraft &&
      !this.state.dimensionDraft &&
      !this.state.selectionWindow &&
      !this.state.selectedGrip &&
      !this.gripDragState &&
      !this.state.distanceInput;
  }

  repeatLastCommand() {
    if (!this.state.lastCommand || !REPEATABLE_COMMANDS.has(this.state.lastCommand)) {
      this.state.statusText = 'No hay comando anterior';
      return true;
    }

    runCommand(this.state.lastCommand);
    this.state.statusText = `Repetido: ${commandLabel(this.state.lastCommand)}`;
    return true;
  }

  cancelCurrentCommand() {
    const clearCommandSelection = this.state.tool === 'copy' ||
      this.state.tool === 'stretch' ||
      this.state.tool === 'polar-array' ||
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set';
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'regular-polygon' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'ellipse' ||
      this.state.tool === 'tangent-line' ||
      this.state.tool === 'point-tangent-line' ||
      this.state.tool === 'xline' ||
      this.state.tool === 'block-create' ||
      this.state.tool === 'block-insert' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'stretch' ||
      this.state.tool === 'polar-array' ||
      this.state.tool === 'rotate' ||
      this.state.tool === 'scale' ||
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'offset' ||
      this.state.tool === 'chamfer' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.tool === 'polyline-join' ||
      this.state.tool === 'image-insert' ||
      this.state.tool === 'image-calibrate' ||
      this.state.pendingLineStart ||
      this.state.polylineDraft ||
      this.state.rectangleDraft ||
      this.state.regularPolygonDraft ||
      this.state.textDraft ||
      this.state.hatchDraft ||
      this.state.circleDraft ||
      this.state.arcDraft ||
      this.state.ellipseDraft ||
      this.state.tangentLineDraft ||
      this.state.xlineDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.stretchDraft ||
      this.state.polarArrayDraft ||
      this.state.rotateDraft ||
      this.state.scaleDraft ||
      this.state.mirrorDraft ||
      this.state.filletDraft ||
      this.state.offsetDraft ||
      this.state.chamferDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.polylineJoinDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
      || this.state.imageDraft ||
      this.state.imageCalibrationDraft
    ) {
      this.setTool('select');
      if (clearCommandSelection) {
        this.doc.clearSelection();
      }
      this.state.statusText = 'Cancelado';
      return true;
    }

    this.state.selectedGrip = null;
    this.doc.selectEntity(null);
    this.state.distanceInput = '';
    this.gripDragState = null;
    this.state.statusText = 'Seleccion limpiada';
    return false;
  }

  handleCommandEnter() {
    if (
      this.state.tool === 'image-calibrate' &&
      this.state.imageCalibrationDraft?.phase === 'target'
    ) {
      openImageCalibrationDialog();
      return true;
    }
    if (this.state.tool === 'block-create' && this.state.blockCreateDraft?.selecting) {
      return this.confirmBlockCreateSelection();
    }
    if (this.state.tool === 'copy' && this.state.copyDraft?.selecting) {
      return this.confirmCopySelection();
    }
    if (this.state.tool === 'copy' && this.state.copyDraft?.basePoint && !this.state.distanceInput) {
      this.setTool('select');
      this.doc.clearSelection();
      this.state.statusText = 'Copiar terminado';
      return true;
    }
    if (this.state.tool === 'move' && this.state.moveDraft?.selecting) {
      return this.confirmMoveSelection();
    }
    if (this.state.tool === 'stretch' && this.state.stretchDraft?.selecting) {
      return stretchCommand.confirmSelection();
    }
    if (this.state.tool === 'polar-array' && this.state.polarArrayDraft?.selecting) {
      return polarArrayCommand.confirmSelection();
    }
    if (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) {
      return this.confirmRotateSelection();
    }
    if (this.state.tool === 'scale' && this.state.scaleDraft?.selecting) {
      return scaleCommand.confirmSelection();
    }
    if (this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting) {
      return this.confirmMirrorSelection();
    }
    if (this.state.mirrorDraft?.firstPoint) {
      if (this.state.distanceInput) {
        return this.handleDistanceInputKey({ key: 'Enter' });
      }
      const secondPoint = this.resolveMirrorAxisPoint(this.state.mouseWorld);
      return this.mirrorSelectionAcross(secondPoint);
    }
    if (this.state.tool === 'select-set' && this.state.selectionSetDraft?.selecting) {
      return this.confirmSelectionSet();
    }
    if (this.state.rotateDraft?.basePoint) {
      if (this.state.distanceInput) {
        return this.handleDistanceInputKey({ key: 'Enter' });
      }
      return this.rotateSelectionBy(this.renderer.rotatePreviewAngle());
    }
    if (this.state.scaleDraft?.basePoint) {
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      return scaleCommand.apply(scaleCommand.factorFromPoint(cursor));
    }
    if (this.state.tool === 'erase' && this.state.eraseDraft?.selecting) {
      return this.confirmEraseSelection();
    }
    if (this.state.tool === 'explode' && this.state.explodeDraft?.selecting) {
      return this.confirmExplodeSelection();
    }
    if (this.state.tool === 'polyline-join' && this.state.polylineJoinDraft?.selecting) {
      return this.confirmPolylineJoinSelection();
    }
    if (this.state.tool === 'extend') {
      return extendCommand.enter();
    }
    if (this.state.distanceInput && this.handleDistanceInputKey({ key: 'Enter' })) {
      return true;
    }
    if (this.state.dimensionDraft?.phase === 'placement' && this.state.mouseWorld) {
      const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
      return this.createDimensionAt(dimensionPlacementPoint(
        this.state.dimensionDraft,
        cursor,
        this.state,
      ));
    }
    if (this.state.tool === 'ellipse' && this.state.ellipseDraft?.points.length && this.state.mouseWorld) {
      return ellipseCommand.pick(resolveCursorPoint(this.state.mouseWorld, this.state));
    }
    if (this.state.pendingLineStart && this.state.tool === 'line') {
      this.setTool('select');
      this.state.statusText = 'Linea terminada';
      return true;
    }
    if (this.state.tool === 'polyline' && this.state.polylineDraft) {
      return this.finishPolyline(false);
    }
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'polyline' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'regular-polygon' ||
      this.state.tool === 'text' ||
      this.state.tool === 'hatch' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'ellipse' ||
      this.state.tool === 'tangent-line' ||
      this.state.tool === 'point-tangent-line' ||
      this.state.tool === 'xline' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'stretch' ||
      this.state.tool === 'polar-array' ||
      this.state.tool === 'rotate' ||
      this.state.tool === 'scale' ||
      this.state.tool === 'mirror' ||
      this.state.tool === 'select-set' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'fillet' ||
      this.state.tool === 'offset' ||
      this.state.tool === 'chamfer' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.tool === 'explode' ||
      this.state.tool === 'image-insert' ||
      this.state.tool === 'image-calibrate' ||
      this.state.circleDraft ||
      this.state.polylineDraft ||
      this.state.rectangleDraft ||
      this.state.regularPolygonDraft ||
      this.state.textDraft ||
      this.state.hatchDraft ||
      this.state.arcDraft ||
      this.state.ellipseDraft ||
      this.state.tangentLineDraft ||
      this.state.xlineDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.stretchDraft ||
      this.state.polarArrayDraft ||
      this.state.rotateDraft ||
      this.state.scaleDraft ||
      this.state.mirrorDraft ||
      this.state.filletDraft ||
      this.state.offsetDraft ||
      this.state.chamferDraft ||
      this.state.selectionSetDraft ||
      this.state.eraseDraft ||
      this.state.explodeDraft ||
      this.state.extendDraft ||
      this.state.blockCreateDraft ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft
      || this.state.imageDraft ||
      this.state.imageCalibrationDraft
    ) {
      this.setTool('select');
      this.state.statusText = 'Orden terminada';
      return true;
    }

    if (this.isIdleForCommandRepeat()) {
      return this.repeatLastCommand();
    }

    return false;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerLifecycleMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerLifecycleMethods.prototype[name]]),
  );
}

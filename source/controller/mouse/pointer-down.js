/* webCAD - Inicio de eventos de puntero | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerPointerDownMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    activeDraftOrigin,
    anchorSelectionWindow,
    completeAnchoredSelectionWindow,
    enterBlockEditor,
    ellipseCommand,
    extendCommand,
    formatNumber,
    formatSnapType,
    getLineStyle,
    gripPoint,
    gripReferencePoint,
    hatchCommand,
    hatchDialogController,
    imageEditor,
    isPolylineJoinCompatibleEntity,
    isCircularEntity,
    keyboardPointTarget,
    offsetCommand,
    openBlockCreateDialog,
    openBlockInsertDialog,
    openTextDialog,
    pointTangentLineCommand,
    polarArrayCommand,
    rectangleTargetPoint,
    regularPolygonCommand,
    rotationAngleFromPoint,
    scaleCommand,
    selectionWindowMode,
    stretchCommand,
    tangentLineCommand,
    trimCommand,
    unitsLabel,
    updateSelectionWindow,
    xlineCommand,
  } = dependencies;

  class ControllerPointerDownMethods {
  onPointerDown(event) {
    event.preventDefault();
    this.cancelMouseWheelZoom();
    this.cancelKeyboardRefresh();
    if (typeof this.canvas.setPointerCapture === 'function') {
      this.canvas.setPointerCapture(event.pointerId);
    }
    const worldPoint = this.updateMouse(event);

    if (event.button === 1) {
      event.preventDefault();
      this.panState = {
        startScreen: { ...this.state.mouseScreen },
        originOffset: { ...this.state.viewOffset },
        dragging: false,
      };
      this.canvas.classList.add('is-panning');
      this.renderer.draw();
      return;
    }

    if (event.button === 2) {
      if (!this.handleCommandEnter()) {
        this.cancelCurrentCommand();
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (completeAnchoredSelectionWindow(this.state.selectionWindow, worldPoint)) {
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'image-insert' || this.state.tool === 'image-calibrate') {
      this.handleImagePoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'select') {
      const grip = this.findGripAt(worldPoint);
      if (grip) {
        this.doc.addSelectedEntities([grip.entity]);
        this.rememberSelectionSet();
        this.state.selectedGrip = grip;
        const referencePoint = gripReferencePoint(grip);
        const selectedGripPoint = gripPoint(grip);
        this.gripDragState = {
          grip,
          startPoint: { ...selectedGripPoint },
          axisPoint: referencePoint ? { ...referencePoint } : null,
          axisDirection: referencePoint
            ? {
                x: selectedGripPoint.x - referencePoint.x,
                y: selectedGripPoint.y - referencePoint.y,
              }
            : null,
        };
        this.state.statusText = grip.entity.type === 'HATCH'
          ? `Pinzamiento del sombreado seleccionado`
          : grip.entity.type === 'INSERT'
            ? 'Punto de insercion del bloque seleccionado'
          : grip.entity.type === 'POLYLINE'
            ? 'Pinzamiento de polilinea seleccionado'
          : grip.entity.type === 'DIMENSION'
            ? grip.key === 'text'
              ? 'Texto de cota seleccionado'
              : 'Pinzamiento de cota seleccionado'
          : isCircularEntity(grip.entity)
            ? `Pinzamiento ${formatSnapType(grip.key === 'midpoint' ? 'midpoint' : grip.key)} seleccionado`
            : `Punto ${grip.key === 'start' ? 'inicial' : 'final'} seleccionado`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      if (entity) {
        const now = Date.now();
        const isTextDoubleClick = entity.type === 'TEXT' &&
          this.lastTextPointerDown?.entity === entity &&
          now - this.lastTextPointerDown.time <= 450;
        const isHatchDoubleClick = entity.type === 'HATCH' &&
          this.lastHatchPointerDown?.entity === entity &&
          now - this.lastHatchPointerDown.time <= 450;
        const isBlockDoubleClick = entity.type === 'INSERT' &&
          this.lastBlockPointerDown?.entity === entity &&
          now - this.lastBlockPointerDown.time <= 450;
        const isImageDoubleClick = entity.type === 'IMAGE' &&
          this.lastImagePointerDown?.entity === entity &&
          now - this.lastImagePointerDown.time <= 450;
        this.lastTextPointerDown = entity.type === 'TEXT' ? { entity, time: now } : null;
        this.lastHatchPointerDown = entity.type === 'HATCH' ? { entity, time: now } : null;
        this.lastBlockPointerDown = entity.type === 'INSERT' ? { entity, time: now } : null;
        this.lastImagePointerDown = entity.type === 'IMAGE' ? { entity, time: now } : null;
        this.doc.addSelectedEntities([entity]);
        this.rememberSelectionSet();
        if (isBlockDoubleClick) {
          this.lastBlockPointerDown = null;
          if (this.state.blockEditDraft) {
            this.state.statusText = 'Guarde o descarte el bloque actual antes de editar otro';
          }
          else {
            enterBlockEditor(entity);
          }
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        if (isTextDoubleClick) {
          this.lastTextPointerDown = null;
          openTextDialog(entity);
          this.state.statusText = 'Editando texto';
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        if (isHatchDoubleClick) {
          this.lastHatchPointerDown = null;
          hatchDialogController.open(entity);
          this.state.statusText = 'Editando sombreado';
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        if (isImageDoubleClick) {
          this.lastImagePointerDown = null;
          imageEditor?.open(entity);
          return;
        }
        const selectedEntities = [...this.doc.selectedEntities];
        const entityLabel = entity.type === 'POLYLINE'
          ? 'Polilinea'
          : entity.type === 'DIMENSION'
            ? 'Cota'
          : entity.type === 'INSERT'
            ? `Bloque ${entity.blockName}`
          : entity.groupId
          ? 'Polilinea'
          : entity.type === 'CIRCLE'
          ? 'Circulo'
          : entity.type === 'ARC'
            ? 'Arco'
            : entity.type === 'ELLIPSE'
              ? 'Elipse'
              : entity.type === 'ELLIPSE_ARC'
                ? 'Arco de elipse'
            : entity.type === 'TEXT'
              ? 'Texto'
              : entity.type === 'HATCH'
                ? 'Sombreado'
                : entity.type === 'IMAGE'
                  ? 'Imagen'
                  : entity.type === 'XLINE' ? 'Linea guia' : 'Linea';
        const selectedLength = selectedEntities.reduce((total, selectedEntity) => total + selectedEntity.length(), 0);
        const selectionLabel = entity.type === 'INSERT' ? 'seleccionado' : 'seleccionada';
        this.state.statusText = `${entityLabel} ${selectionLabel} - capa ${entity.layer} - grosor ${getLineStyle(entity.lineStyle).label} - ${formatNumber(selectedLength)} ${unitsLabel()}`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      this.lastTextPointerDown = null;
      this.lastHatchPointerDown = null;
      this.lastBlockPointerDown = null;
      this.lastImagePointerDown = null;
      this.state.selectionWindow = {
        startWorld: { ...worldPoint },
        currentWorld: { ...worldPoint },
        startScreen: { ...this.state.mouseScreen },
        dragging: false,
      };
      this.state.statusText = 'Ventana de seleccion';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'select-set') {
      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} en el conjunto`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'select-set',
        };
        this.state.statusText = 'Ventana para seleccionar conjunto';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'block-create') {
      const draft = this.state.blockCreateDraft;
      if (draft?.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} para el bloque`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'block-create',
          };
          this.state.statusText = 'Ventana de seleccion para crear bloque';
        }
      }
      else if (draft?.name) {
        this.createBlockAt(this.resolveInputPoint(worldPoint));
      }
      else {
        openBlockCreateDialog();
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'block-insert') {
      if (this.state.blockInsertDraft) {
        this.insertBlockAt(this.resolveInputPoint(worldPoint));
      }
      else {
        openBlockInsertDialog();
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'copy') {
      if (!this.state.copyDraft) {
        this.startCopy();
        return;
      }

      if (this.state.copyDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para copiar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'copy',
          };
          this.state.statusText = 'Ventana de seleccion para copiar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.copyDraft.basePoint) {
        this.state.copyDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.copySelectionTo(this.renderer.copyPreviewTargetPoint() || point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'move') {
      if (!this.state.moveDraft) {
        this.startMove();
        return;
      }

      if (this.state.moveDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para desplazar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'move',
          };
          this.state.statusText = 'Ventana de seleccion para desplazar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.moveDraft.basePoint) {
        this.state.moveDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.moveSelectionTo(this.renderer.movePreviewTargetPoint() || point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'stretch') {
      if (this.state.stretchDraft?.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (stretchCommand.addEntity(entity)) {
          this.state.statusText = `${this.state.stretchDraft.targets.size} entidad${this.state.stretchDraft.targets.size === 1 ? '' : 'es'} preparada${this.state.stretchDraft.targets.size === 1 ? '' : 's'} para estirar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'stretch',
          };
          this.state.statusText = 'Estirar: defina una ventana captura de derecha a izquierda';
        }
      }
      else {
        stretchCommand.point(worldPoint);
        this.state.distanceInput = '';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'polar-array') {
      if (this.state.polarArrayDraft?.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (!polarArrayCommand.addEntity(entity)) {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'polar-array',
          };
          this.state.statusText = 'Ventana de seleccion para matriz polar';
        }
      }
      else {
        polarArrayCommand.apply(worldPoint);
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'rotate') {
      if (!this.state.rotateDraft) {
        this.startRotate();
        return;
      }

      if (this.state.rotateDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para girar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'rotate',
          };
          this.state.statusText = 'Ventana de seleccion para girar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.rotateDraft.basePoint) {
        this.state.rotateDraft.basePoint = point;
        this.state.statusText = 'Punto base indicado - indique angulo o escribalo';
      }
      else {
        const angle = rotationAngleFromPoint(
          this.state.rotateDraft.basePoint,
          point,
          this.state.orthoEnabled,
        );
        this.rotateSelectionBy(angle);
      }
      this.state.distanceInput = '';
      this.updateCanvasCursorMode();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'scale') {
      if (!this.state.scaleDraft) {
        scaleCommand.start();
        return;
      }
      if (this.state.scaleDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para escalar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'scale',
          };
          this.state.statusText = 'Ventana de seleccion para escalar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }
      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.scaleDraft.basePoint) {
        scaleCommand.setBasePoint(point);
      }
      else {
        scaleCommand.apply(scaleCommand.factorFromPoint(point));
      }
      this.state.distanceInput = '';
      this.updateCanvasCursorMode();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'mirror') {
      if (!this.state.mirrorDraft) {
        this.startMirror();
        return;
      }
      if (this.state.mirrorDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} para simetria`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'mirror',
          };
          this.state.statusText = 'Ventana de seleccion para simetria';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }
      const point = this.resolveMirrorAxisPoint(worldPoint);
      if (!this.state.mirrorDraft.firstPoint) {
        this.state.mirrorDraft.firstPoint = point;
        const snapLabel = this.state.activeObjectSnap
          ? ` con OSNAP ${formatSnapType(this.state.activeObjectSnap.type)}`
          : '';
        this.state.statusText = `Primer punto del eje indicado${snapLabel} - indique segundo punto`;
      }
      else {
        this.mirrorSelectionAcross(point);
      }
      this.state.distanceInput = '';
      this.updateCanvasCursorMode();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'tangent-line') {
      tangentLineCommand.pick(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'point-tangent-line') {
      pointTangentLineCommand.pick(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'xline') {
      xlineCommand.pick(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'trim') {
      trimCommand.pick(worldPoint);
      return;
    }

    if (this.state.tool === 'fillet') {
      this.handleFilletPoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'offset') {
      offsetCommand.pick(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'chamfer') {
      this.handleChamferPoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'extend') {
      extendCommand.pick(worldPoint);
      return;
    }

    if (this.state.tool === 'erase') {
      if (!this.state.eraseDraft) {
        this.startErase();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para borrar`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'erase',
        };
        this.state.statusText = 'Ventana de seleccion para borrar';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'explode') {
      if (!this.state.explodeDraft) {
        this.startExplode();
        return;
      }
      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para descomponer`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'explode',
        };
        this.state.statusText = 'Ventana de seleccion para descomponer';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'polyline-join') {
      if (!this.state.polylineJoinDraft) {
        this.startPolylineJoin();
        return;
      }
      const entity = this.findEntityAt(worldPoint);
      if (isPolylineJoinCompatibleEntity(entity)) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para unir`;
      }
      else if (entity) {
        this.state.statusText = 'PJ admite lineas, arcos y polilineas';
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'polyline-join',
        };
        this.state.statusText = 'Ventana de seleccion para unir polilineas';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'text') {
      if (!this.state.textDraft?.text) {
        openTextDialog();
        return;
      }
      const point = this.resolveInputPoint(worldPoint);
      this.createTextAt(point);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'hatch') {
      hatchCommand.pick(worldPoint);
      return;
    }

    if (this.state.tool === 'circle-center' || this.state.tool === 'circle-3p') {
      const cursor = this.resolveInputPoint(worldPoint);
      const point = keyboardPointTarget(activeDraftOrigin(this.state), cursor, this.state.distanceInput) || cursor;
      this.handleCirclePoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end'
    ) {
      const cursor = this.resolveInputPoint(worldPoint);
      const point = keyboardPointTarget(activeDraftOrigin(this.state), cursor, this.state.distanceInput) || cursor;
      this.handleArcPoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (DIMENSION_TOOLS.has(this.state.tool)) {
      const wasPlacement = this.state.dimensionDraft?.phase === 'placement';
      if (!wasPlacement) {
        this.state.distanceInput = '';
      }
      this.handleDimensionPoint(worldPoint);
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'rectangle') {
      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.rectangleDraft) {
        this.state.rectangleDraft = { firstPoint: point };
        this.state.statusText = 'Primera esquina indicada - indique esquina opuesta';
      }
      else {
        this.createRectangleTo(rectangleTargetPoint(
          this.state.rectangleDraft,
          point,
          this.state.distanceInput,
        ) || point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'regular-polygon') {
      const point = this.resolveInputPoint(worldPoint);
      regularPolygonCommand.handlePoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'ellipse') {
      const point = this.resolveInputPoint(worldPoint);
      ellipseCommand.pick(point);
      this.state.distanceInput = '';
      return;
    }

    if (this.state.tool === 'polyline') {
      const point = this.resolveInputPoint(worldPoint);
      const origin = activeDraftOrigin(this.state);
      this.addPolylinePoint(keyboardPointTarget(origin, point, this.state.distanceInput) || point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool !== 'line') {
      return;
    }

    const point = this.resolveInputPoint(worldPoint);
    if (!this.state.pendingLineStart) {
      this.state.pendingLineStart = point;
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    this.createLineTo(keyboardPointTarget(
      this.state.pendingLineStart,
      point,
      this.state.distanceInput,
    ) || point, true);
    this.state.distanceInput = '';
    this.updateUiStatus();
    this.renderer.draw();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerPointerDownMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerPointerDownMethods.prototype[name]]),
  );
}

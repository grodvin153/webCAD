/* webCAD - Movimiento y cierre de eventos de puntero | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerPointerMotionMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    activeDraftOrigin,
    anchorSelectionWindow,
    completeAnchoredSelectionWindow,
    enterBlockEditor,
    extendCommand,
    formatNumber,
    formatSnapType,
    getLineStyle,
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

  class ControllerPointerMotionMethods {
  onPointerMove(event) {
    this.updateMouse(event);

    const imageCalibration = this.state.imageCalibrationDraft;
    if (this.state.tool === 'image-calibrate' && imageCalibration?.phase === 'source-end') {
      imageCalibration.previewPoint = this.resolveInputPoint(this.state.mouseWorld);
    }

    if (this.state.tool === 'mirror' && this.state.mirrorDraft && !this.state.mirrorDraft.selecting) {
      this.resolveMirrorAxisPoint(this.state.mouseWorld);
      this.updateMirrorStatusGuidance();
    }

    if (this.state.selectionWindow) {
      const windowMode = updateSelectionWindow(
        this.state.selectionWindow,
        this.state.mouseWorld,
        this.state.mouseScreen,
      );
      const mode = windowMode === 'window' ? 'ventana' : 'captura';
      this.state.statusText = this.state.selectionWindow.purpose === 'copy'
        ? `Seleccion para copiar por ${mode}`
        : this.state.selectionWindow.purpose === 'block-create'
          ? `Seleccion para crear bloque por ${mode}`
        : this.state.selectionWindow.purpose === 'select-set'
          ? `Seleccion de conjunto por ${mode}`
        : this.state.selectionWindow.purpose === 'move'
          ? `Seleccion para desplazar por ${mode}`
        : this.state.selectionWindow.purpose === 'stretch'
          ? `Seleccion para estirar por ${mode}`
        : this.state.selectionWindow.purpose === 'polar-array'
          ? `Seleccion para matriz polar por ${mode}`
          : this.state.selectionWindow.purpose === 'rotate'
            ? `Seleccion para girar por ${mode}`
          : this.state.selectionWindow.purpose === 'scale'
            ? `Seleccion para escalar por ${mode}`
          : this.state.selectionWindow.purpose === 'mirror'
            ? `Seleccion para simetria por ${mode}`
        : this.state.selectionWindow.purpose === 'erase'
          ? `Seleccion para borrar por ${mode}`
        : this.state.selectionWindow.purpose === 'explode'
          ? `Seleccion para descomponer por ${mode}`
        : this.state.selectionWindow.purpose === 'polyline-join'
          ? `Seleccion para unir polilineas por ${mode}`
            : this.state.selectionWindow.purpose === 'extend-boundaries'
              ? `Limites para alargar por ${mode}`
              : this.state.selectionWindow.purpose === 'extend-targets'
                ? `Lineas o arcos a alargar por ${mode}`
        : `Seleccion por ${mode}`;
    }

    if (this.gripDragState) {
      this.moveSelectedGripTo(this.state.mouseWorld);
      this.state.statusText = this.state.shiftKeyDown
        ? 'Desplazando punto sobre eje de linea'
        : 'Desplazando punto';
    }

    if (this.panState) {
      const deltaX = this.state.mouseScreen.x - this.panState.startScreen.x;
      const deltaY = this.state.mouseScreen.y - this.panState.startScreen.y;
      this.panState.dragging = true;
      this.state.viewOffset = {
        x: this.panState.originOffset.x - deltaX / this.state.viewScale,
        y: this.panState.originOffset.y - deltaY / this.state.viewScale,
      };
      this.canvas.classList.add('is-dragging');
    }

    this.updateHoveredEntity();

    if (this.state.tool === 'tangent-line') {
      tangentLineCommand.updateGuidance(this.state.hoveredEntity, this.state.mouseWorld);
    }
    if (this.state.tool === 'point-tangent-line') {
      pointTangentLineCommand.updateGuidance(this.state.hoveredEntity, this.state.mouseWorld);
    }

    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerUp(event) {
    if (
      typeof this.canvas.releasePointerCapture === 'function' &&
      this.canvas.hasPointerCapture?.(event.pointerId)
    ) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    if (this.panState) {
      this.panState = null;
      this.canvas.classList.remove('is-panning', 'is-dragging');
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.gripDragState) {
      this.gripDragState = null;
      this.doc.markDirty();
      this.state.statusText = 'Punto desplazado';
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.state.selectionWindow) {
      if (anchorSelectionWindow(this.state.selectionWindow)) {
        this.state.statusText = 'Indique la esquina opuesta de la ventana de seleccion';
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }
      const selectionWindow = this.state.selectionWindow;
      this.state.selectionWindow = null;

      if (!selectionWindow.dragging) {
        if (
          selectionWindow.purpose !== 'copy' &&
          selectionWindow.purpose !== 'block-create' &&
          selectionWindow.purpose !== 'select-set' &&
          selectionWindow.purpose !== 'move' &&
          selectionWindow.purpose !== 'stretch' &&
          selectionWindow.purpose !== 'polar-array' &&
          selectionWindow.purpose !== 'rotate' &&
          selectionWindow.purpose !== 'scale' &&
          selectionWindow.purpose !== 'mirror' &&
          selectionWindow.purpose !== 'erase' &&
          selectionWindow.purpose !== 'explode' &&
          selectionWindow.purpose !== 'polyline-join' &&
          selectionWindow.purpose !== 'extend-boundaries' &&
          selectionWindow.purpose !== 'extend-targets'
        ) {
          this.doc.clearSelection();
        }
        this.state.statusText = selectionWindow.purpose === 'copy'
          ? 'Seleccione objetos para copiar'
          : selectionWindow.purpose === 'block-create'
            ? 'Seleccione objetos para crear el bloque'
          : selectionWindow.purpose === 'select-set'
            ? 'Seleccione objetos para el conjunto'
          : selectionWindow.purpose === 'move'
            ? 'Seleccione objetos para desplazar'
          : selectionWindow.purpose === 'stretch'
            ? 'Seleccione lineas o polilineas para estirar'
          : selectionWindow.purpose === 'polar-array'
            ? 'Seleccione objetos para la matriz polar'
            : selectionWindow.purpose === 'rotate'
              ? 'Seleccione objetos para girar'
            : selectionWindow.purpose === 'scale'
              ? 'Seleccione objetos para escalar'
            : selectionWindow.purpose === 'mirror'
              ? 'Seleccione objetos para simetria'
            : selectionWindow.purpose === 'erase'
              ? 'Seleccione objetos para borrar'
            : selectionWindow.purpose === 'explode'
              ? 'Seleccione bloques o polilineas para descomponer'
            : selectionWindow.purpose === 'polyline-join'
              ? 'Seleccione lineas o polilineas para unir'
              : selectionWindow.purpose === 'extend-boundaries'
                ? 'Seleccione limites para alargar'
                : selectionWindow.purpose === 'extend-targets'
                  ? 'Seleccione lineas o arcos para alargar'
          : 'Sin seleccion';
      }
      else {
        const entities = this.selectedEntitiesFromWindow(selectionWindow);
        const selectableEntities = selectionWindow.purpose === 'polyline-join'
          ? entities.filter(isPolylineJoinCompatibleEntity)
          : entities;
        if (selectionWindow.purpose === 'stretch') {
          stretchCommand.addWindow(selectionWindow, selectableEntities);
        }
        else if (selectionWindow.purpose === 'polar-array') {
          polarArrayCommand.addEntities(selectableEntities);
        }
        else if (selectionWindow.purpose === 'extend-targets') {
          extendCommand.completeWindow(selectionWindow.purpose, selectableEntities);
          return;
        }
        else if (selectionWindow.purpose === 'extend-boundaries') {
          extendCommand.completeWindow(selectionWindow.purpose, selectableEntities);
        }
        else if (
          selectionWindow.purpose === 'copy' ||
          selectionWindow.purpose === 'block-create' ||
          selectionWindow.purpose === 'select-set' ||
          selectionWindow.purpose === 'move' ||
          selectionWindow.purpose === 'rotate' ||
          selectionWindow.purpose === 'scale' ||
          selectionWindow.purpose === 'mirror' ||
          selectionWindow.purpose === 'erase' ||
          selectionWindow.purpose === 'explode' ||
          selectionWindow.purpose === 'polyline-join'
        ) {
          this.doc.addSelectedEntities(selectableEntities);
        }
        else {
          this.doc.addSelectedEntities(selectableEntities);
          this.rememberSelectionSet();
        }
        const mode = selectionWindowMode(selectionWindow) === 'window' ? 'ventana' : 'captura';
        const selectedCount = selectionWindow.purpose === 'copy'
          ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'block-create'
            ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'select-set'
            ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'move'
            ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'stretch'
            ? this.state.stretchDraft?.targets.size || 0
          : selectionWindow.purpose === 'polar-array'
            ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'rotate'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'scale'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'mirror'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'erase'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'explode'
              ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'polyline-join'
              ? this.doc.selectedEntities.size
              : selectionWindow.purpose === 'extend-boundaries'
                ? this.doc.selectedEntities.size
          : this.doc.selectedEntities.size;
        this.state.statusText = selectedCount
          ? `${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} seleccionada${selectedCount === 1 ? '' : 's'}${
              selectionWindow.purpose === 'copy'
                ? ' para copiar'
                : selectionWindow.purpose === 'block-create'
                  ? ' para crear el bloque'
                : selectionWindow.purpose === 'select-set'
                  ? ' para el conjunto'
                : selectionWindow.purpose === 'move'
                  ? ' para desplazar'
                : selectionWindow.purpose === 'stretch'
                  ? ' para estirar'
                : selectionWindow.purpose === 'polar-array'
                  ? ' para matriz polar'
                  : selectionWindow.purpose === 'rotate'
                    ? ' para girar'
                  : selectionWindow.purpose === 'scale'
                    ? ' para escalar'
                  : selectionWindow.purpose === 'mirror'
                    ? ' para simetria'
                  : selectionWindow.purpose === 'erase'
                    ? ' para borrar'
                  : selectionWindow.purpose === 'explode'
                    ? ' para descomponer'
                  : selectionWindow.purpose === 'polyline-join'
                    ? ' para unir'
                    : selectionWindow.purpose === 'extend-boundaries' ? ' como limite' : ''
            } por ${mode}`
          : `Sin seleccion por ${mode}`;
      }

      this.updateUiStatus();
      this.renderer.draw();
    }
  }
  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerPointerMotionMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerPointerMotionMethods.prototype[name]]),
  );
}

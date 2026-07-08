/* webCAD - Eventos de teclado | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerKeyboardEventMethods(dependencies) {
  const {
    aboutDialog,
    blockCreateDialog,
    blockInsertDialog,
    drawingProfileDialog,
    hatchDialog,
    imageCalibrationDialog,
    imageEditor,
    localFileManager,
    orthogonalInference,
    polylineWidthDialog,
    redoDrawing,
    runCommand,
    settingsDialog,
    textDialog,
    undoDrawing,
  } = dependencies;

  class ControllerKeyboardEventMethods {
  onKeyDown(event) {
    if (!drawingProfileDialog.hidden || !settingsDialog.hidden || !textDialog.hidden || !hatchDialog.hidden ||
        imageEditor?.isOpen() ||
        !imageCalibrationDialog.hidden ||
        !polylineWidthDialog.hidden || !blockCreateDialog.hidden ||
        !blockInsertDialog.hidden || !aboutDialog.hidden) {
      return;
    }
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement ||
        event.target instanceof HTMLTextAreaElement) {
      return;
    }
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = true;
      orthogonalInference.lock(this.state);
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (event.shiftKey) {
        void localFileManager?.saveAs();
      }
      else {
        void localFileManager?.save();
      }
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) {
        redoDrawing();
      }
      else {
        undoDrawing();
      }
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      redoDrawing();
      return;
    }
    if (
      event.key.toLowerCase() === 'o' &&
      !event.metaKey && !event.ctrlKey && !event.altKey
    ) {
      event.preventDefault();
      if (!event.repeat) {
        this.clearShortcutPrefix();
        runCommand('toggle-ortho');
      }
      return;
    }
    const deleteSelectionKey = event.key === 'Delete' ||
      (event.key === 'Backspace' && !this.state.distanceInput);
    if (
      deleteSelectionKey &&
      !event.metaKey && !event.ctrlKey && !event.altKey &&
      this.doc.selectedEntities.size
    ) {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.clearShortcutPrefix();
      this.deleteSelectedEntities();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (this.handlePolylineCommandKey(event)) {
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (this.handleShortcutSequence(event)) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.handleCommandEnter();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (
      this.state.tool === 'copy' &&
      this.state.copyDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmCopySelection();
      return;
    }
    if (
      this.state.tool === 'move' &&
      this.state.moveDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmMoveSelection();
      return;
    }
    if (
      this.state.tool === 'erase' &&
      this.state.eraseDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmEraseSelection();
      return;
    }
    if (
      this.state.tool === 'extend' &&
      this.state.extendDraft?.phase === 'boundaries' &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmExtendBoundaries();
      return;
    }
    if (event.key.toLowerCase() === 'p' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      const recallsSelection = this.state.tool !== 'select' ||
        this.state.copyDraft?.selecting ||
        this.state.moveDraft?.selecting ||
        this.state.stretchDraft?.selecting ||
        this.state.polarArrayDraft?.selecting ||
        this.state.rotateDraft?.selecting ||
        this.state.scaleDraft?.selecting ||
        this.state.mirrorDraft?.selecting ||
        this.state.eraseDraft?.selecting ||
        this.state.explodeDraft?.selecting ||
        this.state.extendDraft?.phase === 'boundaries' ||
        this.state.selectionSetDraft?.selecting;
      if (recallsSelection) {
        this.recallPreviousSelection();
        this.updateUiStatus();
        this.renderer.draw();
      }
      else {
        runCommand('polyline');
      }
      return;
    }
    if (event.key.toLowerCase() === 'l' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('line');
      return;
    }
    if (event.key.toLowerCase() === 'a' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('extend');
      return;
    }
    if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('erase');
      return;
    }
    if (
      event.key.toLowerCase() === 'x' &&
      !event.metaKey && !event.ctrlKey && !event.altKey &&
      this.state.tool === 'select' &&
      !this.state.selectedGrip &&
      !this.state.distanceInput
    ) {
      event.preventDefault();
      runCommand('explode');
      return;
    }
    if (event.key.toLowerCase() === 'g' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('rotate');
      return;
    }
    if (event.key.toLowerCase() === 's' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('mirror');
      return;
    }
    if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('fillet');
      return;
    }
    if (event.key.toLowerCase() === 'q' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('offset');
      return;
    }
    if (event.key.toLowerCase() === 't' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('text');
      return;
    }
    if (event.key.toLowerCase() === 'h' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('hatch');
      return;
    }
    if (this.handleDistanceInputKey(event)) {
      event.preventDefault();
      this.scheduleKeyboardRefresh();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelKeyboardRefresh();
      this.cancelCurrentCommand();
      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onKeyUp(event) {
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = false;
      orthogonalInference.unlock(this.state);
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerKeyboardEventMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerKeyboardEventMethods.prototype[name]]),
  );
}

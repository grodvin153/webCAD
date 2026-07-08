/* webCAD - Edicion interna de bloques | SPDX-License-Identifier: GPL-3.0-or-later */

export function createBlockEditor(dependencies) {
  const {
    doc,
    fitToDocument,
    focusCanvas,
    refresh,
    screenToWorld,
    setTool,
    state,
  } = dependencies;

  function enter(reference) {
    if (!reference?.definition || state.blockEditDraft || doc.isEditingBlock()) {
      return false;
    }
    setTool('select');
    const initialSnapshot = doc.snapshot();
    const undoStack = [...doc.undoStack];
    const redoStack = [...doc.redoStack];
    const savedView = {
      scale: state.viewScale,
      offset: { ...state.viewOffset },
    };
    if (!doc.beginBlockEdit(reference.definition)) {
      return false;
    }
    doc.redoStack = [];
    state.blockEditDraft = {
      name: reference.blockName,
      initialSnapshot,
      undoStack,
      redoStack,
      savedView,
    };
    state.statusText = `Editando bloque ${reference.blockName}`;
    fitToDocument();
    refresh();
    return true;
  }

  function finish(saveChanges) {
    const draft = state.blockEditDraft;
    if (!draft || !doc.isEditingBlock()) {
      return false;
    }
    setTool('select');
    if (!saveChanges) {
      doc.restoreSnapshot(draft.initialSnapshot);
      doc.undoStack = [...draft.undoStack];
      doc.redoStack = [...draft.redoStack];
    }
    else if (doc.undoStack.length === doc.editHistoryFloor) {
      doc.redoStack = [...draft.redoStack];
    }
    doc.endBlockEdit();
    state.blockEditDraft = null;
    state.viewScale = draft.savedView.scale;
    state.viewOffset = { ...draft.savedView.offset };
    if (state.mouseScreen) {
      state.mouseWorld = screenToWorld(state.mouseScreen);
    }
    state.statusText = saveChanges
      ? `Bloque ${draft.name} guardado`
      : `Cambios del bloque ${draft.name} descartados`;
    refresh();
    focusCanvas();
    return true;
  }

  return { enter, finish };
}

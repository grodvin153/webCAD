/* webCAD - Orden Alargar | SPDX-License-Identifier: GPL-3.0-or-later */

function plural(count, singular, pluralForm = `${singular}s`) {
  return count === 1 ? singular : pluralForm;
}

export function createExtendCommand({
  state,
  doc,
  historyLimit,
  setTool,
  findEntityAt,
  rememberSelection,
  extendLine,
  extendArc,
  extendPolyline,
  refresh,
}) {
  function start() {
    const boundaries = [...doc.selectedEntities];
    if (boundaries.length) rememberSelection(boundaries);
    setTool('extend');
    if (boundaries.length) doc.selectEntities(boundaries);
    state.extendDraft = { phase: 'boundaries', boundaries };
    state.statusText = boundaries.length
      ? `Alargar: ${boundaries.length} ${plural(boundaries.length, 'limite')} seleccionado${boundaries.length === 1 ? '' : 's'} - confirme o seleccione mas`
      : 'Alargar: seleccione limites y confirme';
    refresh();
    return true;
  }

  function confirmBoundaries() {
    if (state.extendDraft?.phase !== 'boundaries') return false;
    const boundaries = [...doc.selectedEntities];
    if (!boundaries.length) {
      state.statusText = 'Seleccione entidades limite para alargar';
      refresh();
      return false;
    }
    rememberSelection(boundaries);
    state.extendDraft = { phase: 'targets', boundaries };
    doc.clearSelection();
    state.statusText = `Alargar: ${boundaries.length} ${plural(boundaries.length, 'limite')} - pique lineas, arcos o polilineas abiertas`;
    refresh();
    return true;
  }

  function extendEntities(entities, pickPoint = null) {
    const boundaries = state.extendDraft?.boundaries || [];
    if (!boundaries.length) {
      state.statusText = 'No hay limites para alargar';
      return 0;
    }
    const targets = entities.filter((entity) =>
      (entity?.type === 'LINE' || entity?.type === 'ARC' ||
        (entity?.type === 'POLYLINE' && !entity.closed)) &&
      !boundaries.includes(entity));
    if (!targets.length) {
      state.statusText = 'Seleccione lineas, arcos o polilineas abiertas para alargar';
      return 0;
    }
    rememberSelection(targets);
    const before = doc.snapshot();
    let count = 0;
    targets.forEach((entity) => {
      const extended = entity.type === 'LINE'
        ? extendLine(entity, boundaries, pickPoint)
        : entity.type === 'ARC'
          ? extendArc(entity, boundaries, pickPoint)
          : extendPolyline(entity, boundaries, pickPoint);
      if (extended) count += 1;
    });
    if (!count) {
      state.statusText = 'No se encontro limite valido para alargar';
      return 0;
    }
    doc.undoStack.push(before);
    if (doc.undoStack.length > historyLimit) doc.undoStack.shift();
    doc.redoStack = [];
    doc.markDirty();
    doc.clearSelection();
    state.statusText = `${count} entidad${count === 1 ? '' : 'es'} alargada${count === 1 ? '' : 's'}`;
    return count;
  }

  function beginWindow(purpose, point) {
    state.selectionWindow = {
      startWorld: { ...point },
      currentWorld: { ...point },
      startScreen: { ...state.mouseScreen },
      dragging: false,
      purpose,
    };
  }

  function pick(point) {
    if (!state.extendDraft) return start();
    const entity = findEntityAt(point);
    if (state.extendDraft.phase === 'boundaries') {
      if (entity) {
        doc.addSelectedEntities([entity]);
        const count = doc.selectedEntities.size;
        state.statusText = `${count} ${plural(count, 'limite')} seleccionado${count === 1 ? '' : 's'} para alargar`;
      }
      else {
        beginWindow('extend-boundaries', point);
        state.statusText = 'Ventana de limites para alargar';
      }
      refresh();
      return Boolean(entity);
    }
    if (entity) extendEntities([entity], point);
    else {
      beginWindow('extend-targets', point);
      state.statusText = 'Ventana de lineas o arcos a alargar';
    }
    refresh();
    return Boolean(entity);
  }

  function completeWindow(purpose, entities) {
    if (purpose === 'extend-boundaries') {
      doc.addSelectedEntities(entities);
      return true;
    }
    if (purpose === 'extend-targets') {
      extendEntities(entities);
      refresh();
      return true;
    }
    return false;
  }

  function enter() {
    if (state.extendDraft?.phase === 'boundaries') return confirmBoundaries();
    if (state.extendDraft?.phase !== 'targets') return false;
    setTool('select');
    doc.clearSelection();
    state.statusText = 'Alargar terminado';
    return true;
  }

  return { completeWindow, confirmBoundaries, enter, extendEntities, pick, start };
}

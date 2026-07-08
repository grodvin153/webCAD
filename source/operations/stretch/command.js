/* webCAD - Orden Estirar | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../../config.js';
import { normalizeBoundsFromPoints } from '../../geometry.js';
import { selectionWindowMode } from '../../selection/geometry.js';
import {
  applyStretchTarget,
  mergeStretchTarget,
  stretchTargetFromEntity,
} from './geometry.js';

export function createStretchCommand({
  state,
  doc,
  cloneEntity,
  rememberSelection,
  setTool,
  refresh,
  resolveTargetPoint,
}) {
  function draft() {
    return state.stretchDraft;
  }

  function start() {
    setTool('stretch');
    state.stretchDraft = { selecting: true, targets: new Map(), basePoint: null };
    doc.clearSelection();
    state.statusText = 'Estirar: seleccione con ventana captura y confirme';
    refresh();
    return true;
  }

  function addTarget(target) {
    if (!target) return false;
    const current = draft();
    current.targets.set(target.entity, mergeStretchTarget(current.targets.get(target.entity), target));
    doc.addSelectedEntities([target.entity]);
    return true;
  }

  function addEntity(entity) {
    if (!entity || !['LINE', 'POLYLINE'].includes(entity.type)) return false;
    return addTarget({ entity, mode: 'full', indices: [] });
  }

  function addWindow(selectionWindow, entities) {
    const bounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const mode = selectionWindowMode(selectionWindow);
    let count = 0;
    entities.forEach((entity) => {
      if (addTarget(stretchTargetFromEntity(entity, bounds, mode))) count += 1;
    });
    state.statusText = count
      ? `${draft().targets.size} entidad${draft().targets.size === 1 ? '' : 'es'} preparada${draft().targets.size === 1 ? '' : 's'} para estirar`
      : 'La captura no contiene vertices compatibles';
    return count;
  }

  function confirmSelection() {
    const current = draft();
    if (!current?.selecting || !current.targets.size) {
      state.statusText = 'Seleccione lineas o polilineas mediante captura';
      refresh();
      return false;
    }
    current.selecting = false;
    rememberSelection([...current.targets.keys()]);
    state.statusText = 'Estirar: indique punto base';
    refresh();
    return true;
  }

  function point(worldPoint) {
    const current = draft();
    if (!current || current.selecting) return false;
    const pointValue = resolveTargetPoint(worldPoint, current.basePoint);
    if (!current.basePoint) {
      current.basePoint = pointValue;
      state.statusText = 'Estirar: indique segundo punto de desplazamiento';
      refresh();
      return true;
    }
    return apply(pointValue);
  }

  function vectorTo(targetPoint) {
    const current = draft();
    if (!current?.basePoint || !targetPoint) return null;
    return {
      x: targetPoint.x - current.basePoint.x,
      y: targetPoint.y - current.basePoint.y,
    };
  }

  function apply(targetPoint) {
    const current = draft();
    const vector = vectorTo(targetPoint);
    if (!current || !vector || Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      state.statusText = 'Desplazamiento de estiramiento nulo';
      return false;
    }
    doc.recordHistory();
    let count = 0;
    current.targets.forEach((target) => {
      if (applyStretchTarget(target, vector)) count += 1;
    });
    doc.markDirty();
    setTool('select');
    doc.clearSelection();
    state.statusText = `${count} entidad${count === 1 ? '' : 'es'} estirada${count === 1 ? '' : 's'}`;
    refresh();
    return true;
  }

  function preview(targetPoint) {
    const current = draft();
    const vector = vectorTo(targetPoint);
    if (!current || !vector) return [];
    const previews = [];
    current.targets.forEach((target) => {
      const entity = cloneEntity(target.entity);
      if (entity && applyStretchTarget(target, vector, entity)) previews.push(entity);
    });
    return previews;
  }

  return { start, addEntity, addWindow, confirmSelection, point, apply, preview, vectorTo };
}

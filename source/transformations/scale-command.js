/*
 * webCAD - Orden de escala uniforme
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { SNAP_THRESHOLD } from '../config.js';
import { distance } from '../geometry.js';
import { parseScalarExpression } from '../input/entry.js';
import { scaleEntityAroundPoint } from './scale.js';

export function parseScaleFactor(value) {
  const factor = parseScalarExpression(value);
  return Number.isFinite(factor) && factor > SNAP_THRESHOLD ? factor : null;
}

export function createScaleCommand({
  state,
  doc,
  rememberSelection,
  setTool,
  refresh,
  formatNumber,
}) {
  function start() {
    const sourceEntities = [...doc.selectedEntities];
    if (sourceEntities.length) rememberSelection(sourceEntities);
    setTool('scale');
    state.scaleDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    state.statusText = sourceEntities.length
      ? `Escalar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`
      : 'Escalar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    refresh();
    return true;
  }

  function confirmSelection() {
    if (!state.scaleDraft?.selecting) return false;
    const sourceEntities = [...doc.selectedEntities];
    if (!sourceEntities.length) {
      state.statusText = 'Seleccione entidades para escalar';
      refresh();
      return false;
    }
    rememberSelection(sourceEntities);
    state.scaleDraft = { sourceEntities, basePoint: null, selecting: false };
    state.statusText = `Escalar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`;
    refresh();
    return true;
  }

  function setBasePoint(point) {
    if (!state.scaleDraft || state.scaleDraft.selecting || !point) return false;
    state.scaleDraft.basePoint = { ...point };
    state.distanceInput = '';
    state.statusText = 'Punto base indicado - indique factor de escala o escribalo';
    refresh();
    return true;
  }

  function factorFromPoint(point) {
    const basePoint = state.scaleDraft?.basePoint;
    return basePoint && point ? distance(basePoint, point) : null;
  }

  function apply(factor) {
    const draft = state.scaleDraft;
    if (!draft?.basePoint || !Number.isFinite(factor) || factor <= SNAP_THRESHOLD) {
      state.statusText = 'Factor de escala no valido';
      return false;
    }
    doc.recordHistory();
    const scaled = draft.sourceEntities.filter((entity) =>
      scaleEntityAroundPoint(entity, draft.basePoint, factor));
    if (!scaled.length) {
      state.statusText = 'No se pudieron escalar las entidades seleccionadas';
      return false;
    }
    doc.markDirty();
    const count = scaled.length;
    state.scaleDraft = null;
    setTool('select');
    doc.clearSelection();
    state.distanceInput = '';
    state.statusText = `${count} entidad${count === 1 ? '' : 'es'} escalada${count === 1 ? '' : 's'} x${formatNumber(factor)}`;
    refresh();
    return true;
  }

  return { apply, confirmSelection, factorFromPoint, setBasePoint, start };
}

export function drawScalePreview(ctx, options) {
  const {
    draft,
    mouseWorld,
    distanceInput,
    resolvePoint,
    cloneEntity,
    drawEntity,
    viewScale,
    previewColor,
  } = options;
  if (!draft?.basePoint || !mouseWorld) return;
  const cursor = resolvePoint(mouseWorld);
  const typedFactor = parseScaleFactor(distanceInput);
  const factor = typedFactor ?? distance(draft.basePoint, cursor);
  if (!Number.isFinite(factor) || factor <= SNAP_THRESHOLD) return;

  ctx.save();
  ctx.setLineDash([8 / viewScale, 6 / viewScale]);
  for (const source of draft.sourceEntities) {
    const preview = cloneEntity(source);
    if (preview && scaleEntityAroundPoint(preview, draft.basePoint, factor)) {
      drawEntity(ctx, preview);
    }
  }
  ctx.strokeStyle = previewColor;
  ctx.fillStyle = previewColor;
  ctx.lineWidth = 1.5 / viewScale;
  ctx.beginPath();
  ctx.moveTo(draft.basePoint.x, draft.basePoint.y);
  ctx.lineTo(cursor.x, cursor.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(draft.basePoint.x, draft.basePoint.y, 4 / viewScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

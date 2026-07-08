/* webCAD - Dialogo de propiedades de sombreado | SPDX-License-Identifier: GPL-3.0-or-later */

export function createHatchDialog({
  state,
  doc,
  elements,
  createOption,
  normalizeLineStyle,
  normalizeLineType,
  normalizeLineColor,
  applyLineStyle,
  applyLineType,
  applyLineColor,
  setTool,
  closePickers,
  focusCanvas,
  refresh,
}) {
  const { dialog, title, confirmButton, patternInput, layerInput, colorInput, error } = elements;
  let activeEntity = null;

  function open(entity = null) {
    activeEntity = entity?.type === 'HATCH' ? entity : null;
    title.textContent = activeEntity ? 'Editar sombreado' : 'Crear sombreado';
    confirmButton.textContent = activeEntity ? 'Aceptar' : 'Continuar';
    patternInput.value = activeEntity?.pattern || 'solid';
    layerInput.replaceChildren();
    const layerName = activeEntity?.layer || state.activeLayer;
    state.layers.forEach((layer) => {
      const option = createOption();
      option.value = layer.name;
      option.textContent = layer.name;
      option.selected = layer.name === layerName;
      layerInput.append(option);
    });
    const selectedLayer = state.layers.find((layer) => layer.name === layerName);
    colorInput.value = activeEntity &&
      normalizeLineColor(activeEntity.lineColor) !== normalizeLineColor(selectedLayer?.lineColor)
      ? normalizeLineColor(activeEntity.lineColor)
      : 'bylayer';
    error.textContent = '';
    dialog.hidden = false;
    closePickers();
    return true;
  }

  function close(cancelled = true) {
    const wasEditing = Boolean(activeEntity);
    dialog.hidden = true;
    activeEntity = null;
    error.textContent = '';
    if (cancelled && !wasEditing && state.tool === 'hatch') {
      setTool('select');
      state.statusText = 'Sombreado cancelado';
    }
    else if (cancelled && wasEditing) state.statusText = 'Edicion de sombreado cancelada';
    refresh();
    focusCanvas();
  }

  function confirm() {
    const layer = state.layers.find((candidate) => candidate.name === layerInput.value);
    if (!layer) {
      error.textContent = 'Seleccione una capa de destino válida.';
      return false;
    }
    const selectedColor = colorInput.value === 'bylayer'
      ? layer.lineColor
      : normalizeLineColor(colorInput.value);
    if (activeEntity) {
      const entity = activeEntity;
      const changed = entity.pattern !== patternInput.value ||
        entity.layer !== layer.name ||
        normalizeLineStyle(entity.lineStyle) !== normalizeLineStyle(layer.lineStyle) ||
        normalizeLineType(entity.lineType) !== normalizeLineType(layer.lineType) ||
        normalizeLineColor(entity.lineColor) !== normalizeLineColor(selectedColor);
      if (changed) {
        doc.recordHistory();
        entity.pattern = patternInput.value;
        entity.layer = layer.name;
        applyLineStyle(entity, layer.lineStyle);
        applyLineType(entity, layer.lineType);
        applyLineColor(entity, selectedColor);
        doc.markDirty();
      }
      dialog.hidden = true;
      activeEntity = null;
      state.statusText = changed ? 'Sombreado actualizado' : 'Sombreado sin cambios';
      refresh();
      focusCanvas();
      return true;
    }
    state.hatchDraft = {
      pattern: patternInput.value,
      mode: 'point',
      layer: layer.name,
      lineColor: selectedColor,
    };
    dialog.hidden = true;
    state.statusText = 'Sombreado solido: indique un punto interior';
    refresh();
    focusCanvas();
    return true;
  }

  return { close, confirm, open };
}

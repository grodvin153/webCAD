/*
 * webCAD - Menus y selectores de propiedades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createMenuServices({
  elements,
  getState,
  doc,
  controller,
  renderer,
  styleServices,
  storePreference,
  setLayerPickerOpen,
}) {
  const {
    canvas,
    layerPicker,
    layerToggle,
    lineStylePicker,
    lineStyleToggle,
    lineStyleLabel,
    lineStyleOptionButtons,
    lineTypePicker,
    lineTypeToggle,
    lineTypeLabel,
    lineTypeText,
    lineTypeOptionButtons,
    lineColorPicker,
    lineColorToggle,
    lineColorLabel,
    lineColorOptionButtons,
    toolGroupElements,
  } = elements;
  const {
    applyLineColorToEntity,
    applyLineStyleToEntity,
    applyLineTypeToEntity,
    getLineColor,
    getLineStyle,
    getLineType,
    normalizeLineColorId,
    normalizeLineStyleId,
    normalizeLineTypeId,
  } = styleServices;

  function setLineStylePickerOpen(open) {
    if (open) {
      setLayerPickerOpen(false);
      setLineTypePickerOpen(false);
      setLineColorPickerOpen(false);
    }
    lineStylePicker.classList.toggle('is-open', open);
    lineStyleToggle.setAttribute('aria-expanded', String(open));
  }

  function setLineTypePickerOpen(open) {
    if (open) {
      layerPicker.classList.remove('is-open', 'is-creating');
      layerToggle.setAttribute('aria-expanded', 'false');
      lineStylePicker.classList.remove('is-open');
      lineStyleToggle.setAttribute('aria-expanded', 'false');
      setLineColorPickerOpen(false);
    }
    lineTypePicker.classList.toggle('is-open', open);
    lineTypeToggle.setAttribute('aria-expanded', String(open));
  }

  function setLineColorPickerOpen(open) {
    if (open) {
      layerPicker.classList.remove('is-open', 'is-creating');
      layerToggle.setAttribute('aria-expanded', 'false');
      lineStylePicker.classList.remove('is-open');
      lineStyleToggle.setAttribute('aria-expanded', 'false');
      lineTypePicker.classList.remove('is-open');
      lineTypeToggle.setAttribute('aria-expanded', 'false');
    }
    lineColorPicker.classList.toggle('is-open', open);
    lineColorToggle.setAttribute('aria-expanded', String(open));
  }

  function syncLineStylePicker() {
    const style = getLineStyle(getState().activeLineStyle);
    lineStyleLabel.textContent = style.label;
    lineStyleOptionButtons.forEach((button) => {
      const active = normalizeLineStyleId(button.dataset.lineStyle) === style.id;
      button.classList.toggle('is-active', active);
    });
  }

  function syncLineTypePicker() {
    const lineType = getLineType(getState().activeLineType);
    const previewPath = lineTypeLabel.querySelector('path');
    const isByLayer = lineType.id === 'bylayer';
    lineTypeText.hidden = !isByLayer;
    lineTypeLabel.hidden = isByLayer;
    if (lineType.dash.length) {
      previewPath.setAttribute('stroke-dasharray', lineType.dash.join(' '));
    }
    else {
      previewPath.removeAttribute('stroke-dasharray');
    }
    lineTypeToggle.title = lineType.label;
    lineTypeToggle.setAttribute('aria-label', `Tipo de linea: ${lineType.label}`);
    lineTypeOptionButtons.forEach((button) => {
      button.classList.toggle('is-active', normalizeLineTypeId(button.dataset.lineType) === lineType.id);
    });
  }

  function syncLineColorPicker() {
    const lineColor = getLineColor(getState().activeLineColor);
    lineColorLabel.className = `line-color-current is-${lineColor.id}`;
    const predefinedColorIds = new Set([
      'bylayer', 'default', 'red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'aci7',
    ]);
    lineColorLabel.style.background = predefinedColorIds.has(lineColor.id) ? '' : lineColor.color;
    lineColorToggle.title = lineColor.label;
    lineColorToggle.setAttribute('aria-label', `Color de linea: ${lineColor.label}`);
    lineColorOptionButtons.forEach((button) => {
      button.classList.toggle('is-active', normalizeLineColorId(button.dataset.lineColor) === lineColor.id);
    });
  }

  function selectedEntities() {
    const state = getState();
    return state.selectedGrip?.entity
      ? doc.groupEntities(state.selectedGrip.entity)
      : [...doc.selectedEntities];
  }

  function finishPropertyChange(closePicker, toggle) {
    controller.updateUiStatus();
    renderer.draw();
    closePicker(false);
    toggle.blur();
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  }

  function setActiveLineStyle(styleId) {
    const state = getState();
    const style = getLineStyle(styleId);
    state.activeLineStyle = style.id;
    storePreference('webcad-active-line-style', state.activeLineStyle);
    syncLineStylePicker();
    const entities = state.selectedGrip?.entity ? [state.selectedGrip.entity] : [...doc.selectedEntities];
    if (state.tool === 'select' && entities.length) {
      const changed = entities.filter((entity) => normalizeLineStyleId(entity.lineStyle) !== style.id);
      if (changed.length) {
        doc.recordHistory();
        changed.forEach((entity) => applyLineStyleToEntity(entity, style.id));
        doc.markDirty();
      }
      state.statusText = changed.length === 1
        ? `Entidad cambiada a grosor ${style.label}`
        : changed.length
          ? `${changed.length} entidades cambiadas a grosor ${style.label}`
          : `Entidad ya tiene grosor ${style.label}`;
    }
    else {
      state.statusText = `Grosor activo: ${style.label}`;
    }
    finishPropertyChange(setLineStylePickerOpen, lineStyleToggle);
  }

  function setActiveLineType(lineTypeId) {
    const state = getState();
    const lineType = getLineType(lineTypeId);
    state.activeLineType = lineType.id;
    syncLineTypePicker();
    const entities = selectedEntities();
    if (state.tool === 'select' && entities.length) {
      const changed = entities.filter((entity) => normalizeLineTypeId(entity.lineType) !== lineType.id);
      if (changed.length) {
        doc.recordHistory();
        changed.forEach((entity) => applyLineTypeToEntity(entity, lineType.id));
        doc.markDirty();
      }
      state.statusText = changed.length === 1
        ? `Entidad cambiada a linea ${lineType.label.toLowerCase()}`
        : changed.length
          ? `${changed.length} entidades cambiadas a linea ${lineType.label.toLowerCase()}`
          : `La seleccion ya usa linea ${lineType.label.toLowerCase()}`;
    }
    else {
      state.statusText = `Tipo de linea activo: ${lineType.label}`;
    }
    finishPropertyChange(setLineTypePickerOpen, lineTypeToggle);
  }

  function setActiveLineColor(lineColorId) {
    const state = getState();
    const lineColor = getLineColor(lineColorId);
    state.activeLineColor = lineColor.id;
    syncLineColorPicker();
    const entities = selectedEntities();
    if (state.tool === 'select' && entities.length) {
      const changed = entities.filter((entity) => normalizeLineColorId(entity.lineColor) !== lineColor.id);
      if (changed.length) {
        doc.recordHistory();
        changed.forEach((entity) => applyLineColorToEntity(entity, lineColor.id));
        doc.markDirty();
      }
      state.statusText = changed.length === 1
        ? `Entidad cambiada a color ${lineColor.label.toLowerCase()}`
        : changed.length
          ? `${changed.length} entidades cambiadas a color ${lineColor.label.toLowerCase()}`
          : `La seleccion ya usa color ${lineColor.label.toLowerCase()}`;
    }
    else {
      state.statusText = `Color activo: ${lineColor.label}`;
    }
    finishPropertyChange(setLineColorPickerOpen, lineColorToggle);
  }

  function setToolGroupOpen(groupElement, open) {
    toolGroupElements.forEach((element) => {
      const shouldOpen = element === groupElement && open;
      element.classList.toggle('is-open', shouldOpen);
      element.querySelector('.tool-menu-button')?.setAttribute('aria-expanded', String(shouldOpen));
    });
  }

  function closeToolGroups() {
    setToolGroupOpen(null, false);
  }

  return {
    closeToolGroups,
    setActiveLineColor,
    setActiveLineStyle,
    setActiveLineType,
    setLineColorPickerOpen,
    setLineStylePickerOpen,
    setLineTypePickerOpen,
    setToolGroupOpen,
    syncLineColorPicker,
    syncLineStylePicker,
    syncLineTypePicker,
  };
}

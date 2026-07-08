/*
 * webCAD - Interfaz de capas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createLayerUi({
  elements,
  getState,
  doc,
  controller,
  renderer,
  defaultLayer,
  defaultLineColor,
  lineColor,
  styleServices,
  applyLayerToEntity,
  activeLayerDefinition,
  activeLayerName,
  menuServices,
  storePreference,
}) {
  const {
    canvas,
    picker,
    toggle,
    label,
    list,
    createOpenButton,
    editOpenButton,
    createCancelButton,
    createConfirmButton,
    panelTitle,
    nameInput,
    styleInput,
    typeInput,
    colorInput,
    activeSwatch,
    colorPreview,
    colorPalette,
    colorPaletteValue,
    colorGrid,
  } = elements;
  const {
    getLineColor,
    getLineStyle,
    normalizeLineColorId,
    normalizeLineStyleId,
    normalizeLineTypeId,
  } = styleServices;
  let creationColor = 'aci7';
  let editingLayerName = null;

  function layerDisplayColor(layer) {
    return getLineColor(layer.lineColor).color || getLineStyle(layer.lineStyle).color;
  }

  function layerCreationDisplayColor() {
    return getLineColor(creationColor).color || getLineStyle(styleInput.value).color;
  }

  function ensureLayerColorOption(lineColorId) {
    const normalized = normalizeLineColorId(lineColorId);
    const existing = [...colorInput.options].find((option) => option.value === normalized);
    if (existing) return existing;
    const option = document.createElement('option');
    option.value = normalized;
    option.textContent = getLineColor(normalized).label;
    option.dataset.customColor = 'true';
    const otherOption = [...colorInput.options].find((candidate) => candidate.value === 'other');
    colorInput.insertBefore(option, otherOption || null);
    return option;
  }

  function syncLayerCreationColorControl() {
    ensureLayerColorOption(creationColor);
    colorInput.value = normalizeLineColorId(creationColor);
    colorPreview.style.background = layerCreationDisplayColor();
    const selectedColor = getLineColor(creationColor);
    colorPaletteValue.textContent = selectedColor.label;
    colorGrid.querySelectorAll('[data-layer-palette-color]').forEach((button) => {
      button.classList.toggle(
        'is-active',
        normalizeLineColorId(button.dataset.layerPaletteColor) === selectedColor.id,
      );
    });
  }

  function setLayerColorPaletteOpen(open) {
    colorPalette.hidden = !open;
    picker.classList.toggle('is-palette-open', open);
    if (open) syncLayerCreationColorControl();
  }

  function selectLayerCreationColor(lineColorId) {
    creationColor = normalizeLineColorId(lineColorId);
    syncLayerCreationColorControl();
    setLayerColorPaletteOpen(false);
  }

  function buildLayerColorPalette() {
    const paletteIds = [
      defaultLineColor,
      ...Array.from({ length: 255 }, (_, index) => normalizeLineColorId(String(index + 1))),
    ];
    const fragment = document.createDocumentFragment();
    paletteIds.forEach((lineColorId, index) => {
      const selectedColor = getLineColor(lineColorId);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'layer-color-cell';
      button.dataset.layerPaletteColor = selectedColor.id;
      button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', index === 0 ? 'Color por defecto' : `Color ACI ${index}`);
      button.title = index === 0 ? 'Por defecto' : `ACI ${index}`;
      button.style.setProperty('--palette-color', selectedColor.color || lineColor);
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectLayerCreationColor(selectedColor.id);
      });
      fragment.append(button);
    });
    colorGrid.replaceChildren(fragment);
  }

  function setLayerPickerOpen(open) {
    if (open) {
      menuServices.setLineStylePickerOpen(false);
      menuServices.setLineTypePickerOpen(false);
      menuServices.setLineColorPickerOpen(false);
    }
    picker.classList.toggle('is-open', open);
    if (!open) {
      picker.classList.remove('is-creating', 'is-palette-open');
      colorPalette.hidden = true;
    }
    toggle.setAttribute('aria-expanded', String(open));
  }

  function syncLayerPicker() {
    const state = getState();
    const activeLayer = activeLayerDefinition();
    label.textContent = activeLayerName();
    activeSwatch.style.setProperty('--layer-color', layerDisplayColor(activeLayer));
    toggle.setAttribute(
      'aria-label',
      `Capa activa: ${activeLayerName()}, color ${getLineColor(activeLayer.lineColor).label}`,
    );
    list.replaceChildren();
    state.layers.forEach((layer) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `layer-option${layer.name === state.activeLayer ? ' is-active' : ''}`;
      button.dataset.layerName = layer.name;
      button.setAttribute('role', 'menuitem');
      const swatch = document.createElement('span');
      swatch.className = 'layer-swatch';
      swatch.style.setProperty('--layer-color', layerDisplayColor(layer));
      const layerLabel = document.createElement('span');
      layerLabel.textContent = layer.name;
      button.append(swatch, layerLabel);
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveLayer(layer.name);
      });
      list.append(button);
    });
  }

  function setActiveLayer(layerName) {
    const state = getState();
    const layer = state.layers.find((candidate) => candidate.name === layerName);
    if (!layer) return false;
    state.activeLayer = layer.name;
    state.activeLineStyle = 'bylayer';
    storePreference('webcad-active-line-style', state.activeLineStyle);
    state.activeLineType = 'bylayer';
    state.activeLineColor = 'bylayer';
    const selectedEntities = state.selectedGrip?.entity
      ? doc.groupEntities(state.selectedGrip.entity)
      : [...doc.selectedEntities];
    if (state.tool === 'select' && selectedEntities.length) {
      doc.recordHistory();
      const appliedLayers = new Set(
        selectedEntities
          .map((entity) => applyLayerToEntity(entity, layer)?.name)
          .filter(Boolean),
      );
      doc.markDirty();
      const destination = appliedLayers.size === 1
        ? [...appliedLayers][0]
        : `${layer.name}; Cotas y XLINE permanecen en Auxiliar`;
      state.statusText = `${selectedEntities.length} entidad${selectedEntities.length === 1 ? '' : 'es'} movida${selectedEntities.length === 1 ? '' : 's'} a capa ${destination}`;
    }
    else {
      state.statusText = `Capa activa: ${layer.name}`;
    }
    syncLayerPicker();
    menuServices.syncLineStylePicker();
    menuServices.syncLineTypePicker();
    menuServices.syncLineColorPicker();
    setLayerPickerOpen(false);
    controller.updateUiStatus();
    renderer.draw();
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
    return true;
  }

  function nextLayerName() {
    const state = getState();
    let index = 1;
    while (state.layers.some((layer) => layer.name.toLowerCase() === `capa ${index}`)) index += 1;
    return `Capa ${index}`;
  }

  function openLayerCreation() {
    editingLayerName = null;
    panelTitle.textContent = 'Nueva capa';
    createConfirmButton.textContent = 'Crear';
    nameInput.disabled = false;
    nameInput.value = nextLayerName();
    styleInput.value = 'normal';
    typeInput.value = 'continuous';
    colorInput.querySelectorAll('[data-custom-color]').forEach((option) => option.remove());
    creationColor = 'aci7';
    syncLayerCreationColorControl();
    setLayerColorPaletteOpen(false);
    picker.classList.add('is-open', 'is-creating');
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => {
      nameInput.focus();
      nameInput.select();
    });
  }

  function openLayerEditor() {
    const layer = activeLayerDefinition();
    if (!layer) return false;
    editingLayerName = layer.name;
    panelTitle.textContent = `Editar capa ${layer.name}`;
    createConfirmButton.textContent = 'Guardar';
    nameInput.value = layer.name;
    nameInput.disabled = true;
    styleInput.value = normalizeLineStyleId(layer.lineStyle);
    typeInput.value = normalizeLineTypeId(layer.lineType);
    colorInput.querySelectorAll('[data-custom-color]').forEach((option) => option.remove());
    creationColor = normalizeLineColorId(layer.lineColor);
    syncLayerCreationColorControl();
    setLayerColorPaletteOpen(false);
    picker.classList.add('is-open', 'is-creating');
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => styleInput.focus());
    return true;
  }

  function updateLayerFromPanel() {
    const state = getState();
    const layer = state.layers.find((candidate) => candidate.name === editingLayerName);
    if (!layer) return false;
    doc.recordHistory();
    layer.lineStyle = normalizeLineStyleId(styleInput.value);
    layer.lineType = normalizeLineTypeId(typeInput.value);
    layer.lineColor = normalizeLineColorId(creationColor);
    doc.entities
      .filter((entity) => entity.layer === layer.name)
      .forEach((entity) => applyLayerToEntity(entity, layer));
    doc.markDirty();
    editingLayerName = null;
    picker.classList.remove('is-creating');
    syncLayerPicker();
    menuServices.syncLineStylePicker();
    menuServices.syncLineTypePicker();
    menuServices.syncLineColorPicker();
    state.statusText = `Capa ${layer.name} actualizada`;
    controller.updateUiStatus();
    renderer.draw();
    setLayerPickerOpen(false);
    return true;
  }

  function createLayerFromPanel() {
    if (editingLayerName) return updateLayerFromPanel();
    const state = getState();
    const name = nameInput.value.trim();
    if (!name) {
      state.statusText = 'La capa necesita un nombre';
      controller.updateUiStatus();
      nameInput.focus();
      return false;
    }
    if (state.layers.some((layer) => layer.name.toLowerCase() === name.toLowerCase())) {
      state.statusText = `Ya existe la capa ${name}`;
      controller.updateUiStatus();
      nameInput.focus();
      return false;
    }
    state.layers.push({
      name,
      lineStyle: normalizeLineStyleId(styleInput.value),
      lineType: normalizeLineTypeId(typeInput.value),
      lineColor: normalizeLineColorId(creationColor),
    });
    picker.classList.remove('is-creating');
    setActiveLayer(name);
    state.statusText = `Capa ${name} creada y activada`;
    controller.updateUiStatus();
    renderer.draw();
    return true;
  }

  function syncLayersFromEntities(entities) {
    const state = getState();
    const layers = [{ ...defaultLayer }];
    const addLayer = (definition) => {
      const name = String(definition.name || '').trim();
      if (!name || layers.some((layer) => layer.name.toLowerCase() === name.toLowerCase())) return;
      layers.push({
        name,
        lineStyle: normalizeLineStyleId(definition.lineStyle),
        lineType: normalizeLineTypeId(definition.lineType),
        lineColor: normalizeLineColorId(definition.lineColor),
      });
    };
    (entities.layerDefinitions || []).forEach(addLayer);
    entities.forEach((entity) => {
      const existing = layers.find(
        (layer) => layer.name.toLowerCase() === String(entity.layer || '').toLowerCase(),
      );
      if (existing) {
        entity.layer = existing.name;
        return;
      }
      addLayer({
        name: entity.layer || `Capa ${layers.length}`,
        lineStyle: normalizeLineStyleId(entity.lineStyle),
        lineType: normalizeLineTypeId(entity.lineType),
        lineColor: normalizeLineColorId(entity.lineColor),
      });
    });
    state.layers = layers;
    state.activeLayer = defaultLayer.name;
    state.activeLineStyle = 'bylayer';
    state.activeLineType = 'bylayer';
    state.activeLineColor = 'bylayer';
    syncLayerPicker();
    menuServices.syncLineStylePicker();
    menuServices.syncLineTypePicker();
    menuServices.syncLineColorPicker();
  }

  function cancelLayerCreation() {
    editingLayerName = null;
    nameInput.disabled = false;
    picker.classList.remove('is-creating', 'is-palette-open');
    colorPalette.hidden = true;
  }

  function bindEvents() {
    toggle.addEventListener('click', () => setLayerPickerOpen(!picker.classList.contains('is-open')));
    createOpenButton.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLayerCreation();
    });
    editOpenButton.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLayerEditor();
    });
    createCancelButton.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      cancelLayerCreation();
    });
    createConfirmButton.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      createLayerFromPanel();
    });
    nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        createLayerFromPanel();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        cancelLayerCreation();
      }
    });
    colorInput.addEventListener('change', () => {
      if (colorInput.value === 'other') {
        ensureLayerColorOption(creationColor);
        colorInput.value = normalizeLineColorId(creationColor);
        setLayerColorPaletteOpen(true);
        return;
      }
      selectLayerCreationColor(colorInput.value);
    });
    styleInput.addEventListener('change', syncLayerCreationColorControl);
  }

  return {
    bindEvents,
    buildLayerColorPalette,
    setLayerPickerOpen,
    syncLayerPicker,
    syncLayersFromEntities,
  };
}

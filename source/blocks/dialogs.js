/* webCAD - Dialogos de bloques | SPDX-License-Identifier: GPL-3.0-or-later */

export function createBlockDialogs(dependencies) {
  const {
    SNAP_THRESHOLD,
    canvas,
    doc,
    elements,
    refresh,
    setTool,
    state,
  } = dependencies;
  const {
    createDialog,
    createError,
    insertDialog,
    insertError,
    nameInput,
    rotationInput,
    scaleInput,
    selectInput,
  } = elements;

  function focusCanvas() {
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  }

  function suggestedName() {
    let index = doc.blockDefinitions.size + 1;
    while (doc.blockDefinitions.has(`bloque ${index}`.toLowerCase())) {
      index += 1;
    }
    return `Bloque ${index}`;
  }

  function openCreate() {
    if (!state.blockCreateDraft?.sourceEntities.length) {
      return false;
    }
    nameInput.value = suggestedName();
    createError.textContent = '';
    createDialog.hidden = false;
    requestAnimationFrame(() => {
      nameInput.focus();
      nameInput.select();
    });
    return true;
  }

  function closeCreate(cancelled = true) {
    const sourceEntities = state.blockCreateDraft?.sourceEntities || [];
    createDialog.hidden = true;
    createError.textContent = '';
    if (cancelled) {
      setTool('select');
      doc.selectEntities(sourceEntities.filter((entity) => doc.entities.includes(entity)));
      state.statusText = 'Creacion de bloque cancelada';
    }
    refresh();
    focusCanvas();
  }

  function confirmCreate() {
    const name = nameInput.value.trim();
    if (!name) {
      createError.textContent = 'Escriba un nombre para el bloque.';
      nameInput.focus();
      return false;
    }
    if (/[<>\\/:;?*|="']/u.test(name)) {
      createError.textContent = 'El nombre contiene caracteres no válidos para DXF.';
      nameInput.focus();
      return false;
    }
    if (doc.blockDefinitions.has(name.toLowerCase())) {
      createError.textContent = 'Ya existe un bloque con ese nombre.';
      nameInput.focus();
      return false;
    }
    state.blockCreateDraft.name = name;
    createDialog.hidden = true;
    createError.textContent = '';
    state.statusText = `Bloque ${name}: indique el punto base`;
    refresh();
    focusCanvas();
    return true;
  }

  function syncInsertOptions() {
    const selectedName = selectInput.value;
    selectInput.replaceChildren();
    [...doc.blockDefinitions.values()]
      .filter((definition) =>
        definition.name.toLowerCase() !== String(doc.editingBlockName || '').toLowerCase())
      .sort((first, second) => first.name.localeCompare(second.name, 'es'))
      .forEach((definition) => {
        const option = document.createElement('option');
        option.value = definition.name;
        option.textContent = definition.name;
        selectInput.append(option);
      });
    if ([...selectInput.options].some((option) => option.value === selectedName)) {
      selectInput.value = selectedName;
    }
  }

  function openInsert() {
    syncInsertOptions();
    if (!selectInput.options.length) {
      state.statusText = 'No hay bloques definidos en el dibujo';
      setTool('select');
      return false;
    }
    scaleInput.value = '1';
    rotationInput.value = '0';
    insertError.textContent = '';
    insertDialog.hidden = false;
    requestAnimationFrame(() => selectInput.focus());
    return true;
  }

  function closeInsert(cancelled = true) {
    insertDialog.hidden = true;
    insertError.textContent = '';
    if (cancelled) {
      setTool('select');
      state.statusText = 'Insercion de bloque cancelada';
    }
    refresh();
    focusCanvas();
  }

  function confirmInsert() {
    const definition = doc.blockDefinitions.get(selectInput.value.toLowerCase());
    const scale = Number(String(scaleInput.value).replace(',', '.'));
    const rotation = Number(String(rotationInput.value).replace(',', '.'));
    if (!definition) {
      insertError.textContent = 'Seleccione un bloque válido.';
      return false;
    }
    if (!Number.isFinite(scale) || scale <= SNAP_THRESHOLD) {
      insertError.textContent = 'La escala debe ser mayor que cero.';
      scaleInput.focus();
      return false;
    }
    if (!Number.isFinite(rotation)) {
      insertError.textContent = 'Indique un ángulo válido.';
      rotationInput.focus();
      return false;
    }
    state.blockInsertDraft = { definition, scale, rotation };
    insertDialog.hidden = true;
    insertError.textContent = '';
    state.statusText = `Insertar ${definition.name}: indique el punto de insercion`;
    refresh();
    focusCanvas();
    return true;
  }

  return {
    closeCreate,
    closeInsert,
    confirmCreate,
    confirmInsert,
    openCreate,
    openInsert,
    syncInsertOptions,
  };
}

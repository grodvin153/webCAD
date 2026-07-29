/* webCAD - Dialogos runtime de la aplicacion | SPDX-License-Identifier: GPL-3.0-or-later */

export function createRuntimeDialogs({
  elements,
  state,
  doc,
  controller,
  renderer,
  canvas,
  appVersion,
  snapThreshold,
  dimensionStyles,
  activeDrawingProfile,
  applyDrawingProfile,
  calibrateImageLength,
  clamp,
  closePickers,
  distance,
  formatNumber,
  getUnitsLabel,
  coplanarTolerance,
  rebuildModel3d,
  storePreference,
}) {
  const {
    imageCalibrationDialog,
    imageCalibrationMeasuredInput,
    imageCalibrationLengthInput,
    imageCalibrationError,
    drawingProfileDialog,
    drawingProfileInputs,
    saveFileDialog,
    saveFileDialogTitle,
    saveFileDialogNote,
    saveFileNameInput,
    saveFileDialogError,
    settingsDialog,
    settingsDimensionStyleInput,
    settingsLinearPrecisionInput,
    settingsAngularPrecisionInput,
    settingsCoplanarToleranceInput,
    settingsCoplanarToleranceError,
    rebuildModelDialog,
    rebuildModelDialogConfirmButton,
    rebuildModelToleranceInput,
    rebuildModelDialogError,
    dimensionStyleSelect,
    textDialog,
    textDialogTitle,
    textContentInput,
    textHeightInput,
    textDialogError,
    polylineWidthDialog,
    polylineStartWidthInput,
    polylineEndWidthInput,
    polylineWidthError,
    aboutDialog,
    aboutDialogCloseButton,
  } = elements;

  let textDialogEntity = null;
  let saveFileResolver = null;
  const focusCanvas = () => requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
  const refresh = () => {
    controller.updateUiStatus();
    renderer.draw();
  };

  function openImageCalibrationDialog() {
    const draft = state.imageCalibrationDraft;
    if (!draft?.sourceStart || !draft.sourceEnd) return false;
    imageCalibrationMeasuredInput.value =
      `${formatNumber(distance(draft.sourceStart, draft.sourceEnd))} ${getUnitsLabel()}`;
    imageCalibrationLengthInput.value = '';
    imageCalibrationError.textContent = '';
    imageCalibrationDialog.hidden = false;
    requestAnimationFrame(() => imageCalibrationLengthInput.focus());
    return true;
  }

  function closeImageCalibrationDialog(cancelCommand = true) {
    imageCalibrationDialog.hidden = true;
    imageCalibrationError.textContent = '';
    if (cancelCommand && state.tool === 'image-calibrate') {
      const entity = state.imageCalibrationDraft?.entity;
      controller.setTool('select');
      if (entity) doc.selectEntity(entity);
      state.statusText = 'Calibracion de imagen cancelada';
    }
    canvas.focus({ preventScroll: true });
    refresh();
  }

  function confirmImageCalibrationDialog() {
    const draft = state.imageCalibrationDraft;
    const targetLength = Number(String(imageCalibrationLengthInput.value).replace(',', '.'));
    if (!draft?.sourceStart || !draft.sourceEnd ||
        !Number.isFinite(targetLength) || targetLength <= snapThreshold) {
      imageCalibrationError.textContent = 'Introduzca una longitud real mayor que cero';
      return false;
    }
    doc.recordHistory();
    if (!calibrateImageLength(draft.entity, draft.sourceStart, draft.sourceEnd, targetLength)) {
      imageCalibrationError.textContent = 'No se pudo calibrar con esos puntos';
      return false;
    }
    doc.markDirty();
    const entity = draft.entity;
    imageCalibrationDialog.hidden = true;
    controller.setTool('select');
    doc.selectEntity(entity);
    state.statusText = `Imagen calibrada a ${formatNumber(targetLength)} ${getUnitsLabel()}`;
    canvas.focus({ preventScroll: true });
    refresh();
    return true;
  }

  function openDrawingProfileDialog() {
    drawingProfileInputs.forEach((input) => {
      input.checked = input.value === state.drawingProfile;
    });
    drawingProfileDialog.hidden = false;
    closePickers();
  }

  function closeDrawingProfileDialog() {
    drawingProfileDialog.hidden = true;
    focusCanvas();
  }

  function confirmDrawingProfileDialog() {
    const selectedProfile = [...drawingProfileInputs].find((input) => input.checked)?.value;
    if (!selectedProfile) return false;
    drawingProfileDialog.hidden = true;
    applyDrawingProfile(selectedProfile);
    focusCanvas();
    return true;
  }

  function closeSaveFileDialog(value = null) {
    saveFileDialog.hidden = true;
    saveFileDialogError.textContent = '';
    const resolve = saveFileResolver;
    saveFileResolver = null;
    resolve?.(value);
    focusCanvas();
  }

  function confirmSaveFileDialog() {
    const fileName = saveFileNameInput.value.trim();
    if (!fileName) {
      saveFileDialogError.textContent = 'Escriba un nombre de archivo.';
      saveFileNameInput.focus();
      return false;
    }
    closeSaveFileDialog(fileName);
    return true;
  }

  function requestSaveFileName({
    directorySelected = false,
    format,
    proposedName,
  } = {}) {
    if (saveFileResolver) closeSaveFileDialog(null);
    saveFileDialogTitle.textContent = `Guardar ${format?.label || 'archivo'}`;
    saveFileDialogNote.textContent = directorySelected
      ? 'El archivo se guardará en la carpeta seleccionada.'
      : 'Este navegador no permite a webCAD elegir una carpeta. Se descargará una copia; use Chrome o Edge para seleccionar la ubicación.';
    saveFileNameInput.value = String(proposedName || 'dibujo');
    saveFileDialogError.textContent = '';
    saveFileDialog.hidden = false;
    closePickers();
    requestAnimationFrame(() => {
      saveFileNameInput.focus();
      saveFileNameInput.select();
    });
    return new Promise((resolve) => {
      saveFileResolver = resolve;
    });
  }

  function openSettingsDialog() {
    const precision = state.dimensionPrecision[state.drawingProfile];
    settingsDimensionStyleInput.value = state.dimensionStyle;
    settingsLinearPrecisionInput.value = String(precision.linear);
    settingsAngularPrecisionInput.value = String(precision.angular);
    settingsCoplanarToleranceInput.value =
      String(state.coplanarFaceToleranceFactor);
    settingsCoplanarToleranceError.textContent = '';
    settingsDialog.hidden = false;
    closePickers();
    requestAnimationFrame(() => settingsDimensionStyleInput.focus());
  }

  function closeSettingsDialog() {
    settingsDialog.hidden = true;
    settingsCoplanarToleranceError.textContent = '';
    focusCanvas();
  }

  function resetSettingsCoplanarTolerance() {
    settingsCoplanarToleranceInput.value =
      String(coplanarTolerance.defaultFactor);
    settingsCoplanarToleranceError.textContent = '';
    settingsCoplanarToleranceInput.focus();
  }

  function confirmSettingsDialog() {
    const styleId = dimensionStyles[settingsDimensionStyleInput.value]
      ? settingsDimensionStyleInput.value
      : 'normal';
    const linear = clamp(Number(settingsLinearPrecisionInput.value), 0, 4);
    const angular = clamp(Number(settingsAngularPrecisionInput.value), 0, 4);
    if (!Number.isInteger(linear) || !Number.isInteger(angular)) return false;
    const rawCoplanarFactor = Number(
      String(settingsCoplanarToleranceInput.value).replace(',', '.'),
    );
    if (!Number.isFinite(rawCoplanarFactor) ||
        rawCoplanarFactor < coplanarTolerance.minFactor ||
        rawCoplanarFactor > coplanarTolerance.maxFactor) {
      settingsCoplanarToleranceError.textContent =
        `Use un factor entre ${coplanarTolerance.minFactor} y ` +
        `${coplanarTolerance.maxFactor}.`;
      settingsCoplanarToleranceInput.focus();
      return false;
    }
    const coplanarFactor =
      coplanarTolerance.normalizeFactor(rawCoplanarFactor);
    state.dimensionStyle = styleId;
    state.dimensionPrecision[state.drawingProfile] = { linear, angular };
    state.coplanarFaceToleranceFactor = coplanarFactor;
    coplanarTolerance.setFactor(coplanarFactor);
    dimensionStyleSelect.value = styleId;
    storePreference('webcad-dimension-style', styleId);
    storePreference(`webcad-dimension-linear-precision-${state.drawingProfile}`, linear);
    storePreference(`webcad-dimension-angular-precision-${state.drawingProfile}`, angular);
    storePreference('webcad-3d-coplanar-tolerance-factor', coplanarFactor);
    settingsDialog.hidden = true;
    settingsCoplanarToleranceError.textContent = '';
    globalThis.window?.webcadThreeMode?.refreshDocument?.();
    state.statusText =
      `Cotas: ${dimensionStyles[styleId].label} · precision ${linear} / ${angular}` +
      ` · reconciliacion 3D ×${coplanarFactor}`;
    refresh();
    focusCanvas();
    return true;
  }

  function openRebuildModelDialog() {
    if (!doc.model3d?.solids?.length) {
      state.statusText = 'No hay solidos 3D que reconstruir';
      refresh();
      return false;
    }
    rebuildModelToleranceInput.value = String(Math.max(
      1,
      Number(state.coplanarFaceToleranceFactor) || 1,
    ));
    rebuildModelDialogError.textContent = '';
    rebuildModelDialog.hidden = false;
    closePickers();
    requestAnimationFrame(() => {
      rebuildModelToleranceInput.focus();
      rebuildModelToleranceInput.select();
    });
    return true;
  }

  function closeRebuildModelDialog() {
    rebuildModelDialog.hidden = true;
    rebuildModelDialogError.textContent = '';
    rebuildModelDialogConfirmButton.disabled = false;
    focusCanvas();
  }

  async function confirmRebuildModelDialog() {
    const toleranceFactor = Number(
      String(rebuildModelToleranceInput.value).replace(',', '.'),
    );
    if (!Number.isFinite(toleranceFactor) ||
        toleranceFactor < 1 ||
        toleranceFactor > coplanarTolerance.maxFactor) {
      rebuildModelDialogError.textContent =
        `Use un factor entre 1 y ${coplanarTolerance.maxFactor}.`;
      rebuildModelToleranceInput.focus();
      return false;
    }
    rebuildModelDialogConfirmButton.disabled = true;
    rebuildModelDialogError.textContent = '';
    const rebuilt = await rebuildModel3d({ toleranceFactor });
    rebuildModelDialogConfirmButton.disabled = false;
    if (!rebuilt) {
      rebuildModelDialogError.textContent =
        'No se pudo obtener una envolvente cerrada. Pruebe otro factor.';
      rebuildModelToleranceInput.focus();
      return false;
    }
    closeRebuildModelDialog();
    return true;
  }

  function openTextDialog(entity = null) {
    textDialogEntity = entity?.type === 'TEXT' ? entity : null;
    textDialogTitle.textContent = textDialogEntity ? 'Editar texto' : 'Crear texto';
    textContentInput.value = textDialogEntity?.text || '';
    textHeightInput.value = String(
      textDialogEntity?.height || state.lastTextHeight || activeDrawingProfile().defaultTextHeight,
    );
    textDialogError.textContent = '';
    textDialog.hidden = false;
    closePickers();
    requestAnimationFrame(() => {
      textContentInput.focus();
      textContentInput.select();
    });
  }

  function closeTextDialog(cancelled = true) {
    const wasEditing = Boolean(textDialogEntity);
    textDialog.hidden = true;
    textDialogEntity = null;
    textDialogError.textContent = '';
    if (cancelled && !wasEditing && state.tool === 'text') {
      controller.setTool('select');
      state.statusText = 'Texto cancelado';
    }
    else if (cancelled && wasEditing) {
      state.statusText = 'Edicion de texto cancelada';
    }
    refresh();
    focusCanvas();
  }

  function confirmTextDialog() {
    const text = textContentInput.value.trim();
    const height = Number(String(textHeightInput.value).replace(',', '.'));
    if (!text) {
      textDialogError.textContent = 'Escriba el contenido del texto.';
      textContentInput.focus();
      return false;
    }
    if (!Number.isFinite(height) || height <= snapThreshold) {
      textDialogError.textContent = 'Indique una altura mayor que cero.';
      textHeightInput.focus();
      return false;
    }

    if (textDialogEntity) {
      const entity = textDialogEntity;
      if (entity.text !== text || Math.abs(entity.height - height) > snapThreshold) {
        doc.recordHistory();
        entity.text = text;
        entity.height = height;
        doc.markDirty();
      }
      state.lastTextHeight = height;
      textDialog.hidden = true;
      textDialogEntity = null;
      state.statusText = 'Texto actualizado';
      refresh();
      focusCanvas();
      return true;
    }

    state.lastTextHeight = height;
    state.textDraft = { text, height };
    textDialog.hidden = true;
    state.statusText = 'Indique el punto de insercion del texto';
    refresh();
    focusCanvas();
    return true;
  }

  function openPolylineWidthDialog() {
    const draft = state.polylineDraft;
    if (!draft) return false;
    polylineStartWidthInput.value = String(draft.startWidth || 0);
    polylineEndWidthInput.value = String(draft.endWidth || 0);
    polylineWidthError.textContent = '';
    polylineWidthDialog.hidden = false;
    requestAnimationFrame(() => {
      polylineStartWidthInput.focus();
      polylineStartWidthInput.select();
    });
    return true;
  }

  function closePolylineWidthDialog() {
    polylineWidthDialog.hidden = true;
    polylineWidthError.textContent = '';
    state.statusText = 'Anchura sin cambios - continue la polilinea';
    refresh();
    focusCanvas();
  }

  function confirmPolylineWidthDialog() {
    const startWidth = Number(String(polylineStartWidthInput.value).replace(',', '.'));
    const endWidth = Number(String(polylineEndWidthInput.value).replace(',', '.'));
    if (!Number.isFinite(startWidth) || startWidth < 0 ||
        !Number.isFinite(endWidth) || endWidth < 0) {
      polylineWidthError.textContent = 'Indique anchuras iguales o mayores que cero.';
      return false;
    }
    if (!state.polylineDraft) {
      polylineWidthDialog.hidden = true;
      return false;
    }
    state.polylineDraft.startWidth = startWidth;
    state.polylineDraft.endWidth = endWidth;
    polylineWidthDialog.hidden = true;
    polylineWidthError.textContent = '';
    state.statusText =
      `Anchura del siguiente tramo: ${formatNumber(startWidth)} → ${formatNumber(endWidth)} ${getUnitsLabel()}`;
    refresh();
    focusCanvas();
    return true;
  }

  function showAbout() {
    aboutDialog.hidden = false;
    state.statusText = `webCAD ${appVersion} · Autor: Gonzalo Rodriguez`;
    refresh();
    requestAnimationFrame(() => aboutDialogCloseButton.focus());
  }

  function closeAboutDialog() {
    aboutDialog.hidden = true;
    focusCanvas();
  }

  return {
    closeAboutDialog,
    closeDrawingProfileDialog,
    closeImageCalibrationDialog,
    closePolylineWidthDialog,
    closeRebuildModelDialog,
    closeSaveFileDialog,
    closeSettingsDialog,
    closeTextDialog,
    confirmDrawingProfileDialog,
    confirmImageCalibrationDialog,
    confirmPolylineWidthDialog,
    confirmRebuildModelDialog,
    confirmSaveFileDialog,
    confirmSettingsDialog,
    confirmTextDialog,
    openDrawingProfileDialog,
    openImageCalibrationDialog,
    openPolylineWidthDialog,
    openRebuildModelDialog,
    openSettingsDialog,
    resetSettingsCoplanarTolerance,
    requestSaveFileName,
    openTextDialog,
    showAbout,
  };
}

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
  storePreference,
}) {
  const {
    imageCalibrationDialog,
    imageCalibrationMeasuredInput,
    imageCalibrationLengthInput,
    imageCalibrationError,
    drawingProfileDialog,
    drawingProfileInputs,
    settingsDialog,
    settingsDimensionStyleInput,
    settingsLinearPrecisionInput,
    settingsAngularPrecisionInput,
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

  function openSettingsDialog() {
    const precision = state.dimensionPrecision[state.drawingProfile];
    settingsDimensionStyleInput.value = state.dimensionStyle;
    settingsLinearPrecisionInput.value = String(precision.linear);
    settingsAngularPrecisionInput.value = String(precision.angular);
    settingsDialog.hidden = false;
    closePickers();
    requestAnimationFrame(() => settingsDimensionStyleInput.focus());
  }

  function closeSettingsDialog() {
    settingsDialog.hidden = true;
    focusCanvas();
  }

  function confirmSettingsDialog() {
    const styleId = dimensionStyles[settingsDimensionStyleInput.value]
      ? settingsDimensionStyleInput.value
      : 'normal';
    const linear = clamp(Number(settingsLinearPrecisionInput.value), 0, 4);
    const angular = clamp(Number(settingsAngularPrecisionInput.value), 0, 4);
    if (!Number.isInteger(linear) || !Number.isInteger(angular)) return false;
    state.dimensionStyle = styleId;
    state.dimensionPrecision[state.drawingProfile] = { linear, angular };
    dimensionStyleSelect.value = styleId;
    storePreference('webcad-dimension-style', styleId);
    storePreference(`webcad-dimension-linear-precision-${state.drawingProfile}`, linear);
    storePreference(`webcad-dimension-angular-precision-${state.drawingProfile}`, angular);
    settingsDialog.hidden = true;
    state.statusText = `Cotas: ${dimensionStyles[styleId].label} · precision ${linear} / ${angular}`;
    refresh();
    focusCanvas();
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
    closeSettingsDialog,
    closeTextDialog,
    confirmDrawingProfileDialog,
    confirmImageCalibrationDialog,
    confirmPolylineWidthDialog,
    confirmSettingsDialog,
    confirmTextDialog,
    openDrawingProfileDialog,
    openImageCalibrationDialog,
    openPolylineWidthDialog,
    openSettingsDialog,
    openTextDialog,
    showAbout,
  };
}

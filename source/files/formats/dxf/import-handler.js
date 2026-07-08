/* webCAD - Cableado de importacion DXF | SPDX-License-Identifier: GPL-3.0-or-later */

async function readDxfText(file) {
  const buffer = await file.arrayBuffer();
  const windowsText = new TextDecoder('windows-1252').decode(buffer);
  if (/\$DWGCODEPAGE[\s\S]{0,80}ANSI_1252/i.test(windowsText)) return windowsText;
  return new TextDecoder('utf-8').decode(buffer);
}

function clearImportedInteractionState(state, orthogonalInference) {
  [
    'pendingLineStart', 'polylineDraft', 'rectangleDraft', 'textDraft', 'hatchDraft',
    'circleDraft', 'arcDraft', 'xlineDraft', 'tangentLineDraft', 'copyDraft', 'moveDraft',
    'stretchDraft', 'polarArrayDraft', 'rotateDraft', 'scaleDraft', 'mirrorDraft',
    'filletDraft', 'offsetDraft', 'chamferDraft', 'selectionSetDraft', 'eraseDraft',
    'explodeDraft', 'extendDraft', 'blockCreateDraft', 'blockInsertDraft', 'dimensionDraft',
    'imageDraft', 'imageCalibrationDraft', 'lastCopy', 'selectedGrip',
  ].forEach((key) => { state[key] = null; });
  state.previousSelection = [];
  state.distanceInput = '';
  orthogonalInference.clear(state);
}

export function bindDxfImportInput({
  input,
  state,
  controller,
  renderer,
  registry,
  doc,
  localFileManager,
  orthogonalInference,
  setDrawingProfileRuntime,
  syncLayersFromEntities,
  activeDrawingProfile,
  getUnitsLabel,
}) {
  input.addEventListener('change', async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    state.statusText = `Analizando ${file.name}...`;
    controller.updateUiStatus();
    renderer.draw();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    let entities;
    try {
      entities = registry.get('dxf').parse(await readDxfText(file));
    }
    catch (error) {
      console.error('No se pudo importar el DXF', error);
      state.statusText = `No se pudo importar ${file.name}`;
      controller.updateUiStatus();
      renderer.draw();
      event.target.value = '';
      return;
    }

    if (entities.drawingProfile) setDrawingProfileRuntime(entities.drawingProfile);
    syncLayersFromEntities(entities);
    doc.setEntities(entities);
    localFileManager.setSuggestedName(file.name, 'dxf');
    clearImportedInteractionState(state, orthogonalInference);
    state.statusText =
      `Importadas ${entities.length} entidades DXF en ${state.layers.length} capas · ` +
      `${activeDrawingProfile().label} (${getUnitsLabel()})` +
      `${entities.drawingProfileDetected ? ' · perfil detectado automaticamente' : ''}` +
      `${entities.skippedPatternHatchCount
        ? ` · ${entities.skippedPatternHatchCount} sombreados de patron omitidos`
        : ''}` +
      `${entities.skippedHatchCount
        ? ` · ${entities.skippedHatchCount} sombreados incompatibles omitidos`
        : ''}`;

    if (entities.drawingExtents) renderer.fitBounds(entities.drawingExtents);
    else renderer.fitToDocument();
    controller.updateUiStatus();
    renderer.draw();
    event.target.value = '';
  });
}

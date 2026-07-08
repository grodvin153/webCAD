/* webCAD - Cableado de eventos de interfaz | SPDX-License-Identifier: GPL-3.0-or-later */

import { bindDialogEvents } from '../ui/dialogs.js';

export function bindApplicationEvents({
  root = document,
  elements,
  state,
  controller,
  renderer,
  dimensionStyles,
  storePreference,
  runCommand,
  controls,
  blockEditor,
  menuServices,
  layerUi,
  dialogs,
  blockDialogs,
  hatchDialog,
}) {
  const {
    canvas,
    menuCommandButtons,
    dimensionStyleSelect,
    imageCalibrationConfirmButton,
    imageCalibrationCancelButton,
    imageCalibrationCloseButton,
    imageCalibrationDialog,
    imageCalibrationLengthInput,
    navigationMouseButton,
    navigationTrackpadButton,
    statusOrthoButton,
    statusGridButton,
    statusLineWeightButton,
    filletRadiusInput,
    offsetDistanceInput,
    polarArrayCountInput,
    chamferDistanceFirstInput,
    chamferDistanceSecondInput,
    blockEditorSaveButton,
    blockEditorDiscardButton,
    selectToolButton,
    lineToolButton,
    tangentLineToolButton,
    pointTangentLineToolButton,
    xlineToolButton,
    polylineToolButton,
    rectangleToolButton,
    textToolButton,
    hatchToolButton,
    circleToolButton,
    circleToolMenuButton,
    arcToolButton,
    arcToolMenuButton,
    blockToolButton,
    blockToolMenuButton,
    toolFlyoutCommandButtons,
    trimToolButton,
    extendToolButton,
    filletToolButton,
    offsetToolButton,
    chamferToolButton,
    copyToolButton,
    moveToolButton,
    stretchToolButton,
    polarArrayToolButton,
    rotateToolButton,
    scaleToolButton,
    mirrorToolButton,
    eraseToolButton,
    explodeToolButton,
    fitButton,
    undoButton,
    redoButton,
    newButton,
    saveButton,
    exportDxfButton,
    importDxfButton,
    lineStylePicker,
    lineStyleToggle,
    lineStyleOptionButtons,
    lineTypePicker,
    lineTypeToggle,
    lineTypeOptionButtons,
    lineColorPicker,
    lineColorToggle,
    lineColorOptionButtons,
    layerPicker,
    toolGroupElements,
  } = elements;
  const focusCanvas = () => canvas.focus({ preventScroll: true });

  menuCommandButtons.forEach((button) => {
    button.addEventListener('click', () => runCommand(button.dataset.command));
  });

  dimensionStyleSelect.addEventListener('change', () => {
    state.dimensionStyle = dimensionStyles[dimensionStyleSelect.value]?.id || 'normal';
    storePreference('webcad-dimension-style', state.dimensionStyle);
    state.statusText = `Estilo de cota: ${dimensionStyles[state.dimensionStyle].label}`;
    controller.updateUiStatus();
    renderer.draw();
  });

  imageCalibrationConfirmButton.addEventListener('click', dialogs.confirmImageCalibrationDialog);
  imageCalibrationCancelButton.addEventListener('click', () => dialogs.closeImageCalibrationDialog(true));
  imageCalibrationCloseButton.addEventListener('click', () => dialogs.closeImageCalibrationDialog(true));
  imageCalibrationDialog.addEventListener('pointerdown', (event) => {
    if (event.target === imageCalibrationDialog) dialogs.closeImageCalibrationDialog(true);
  });
  imageCalibrationLengthInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dialogs.confirmImageCalibrationDialog();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      dialogs.closeImageCalibrationDialog(true);
    }
  });

  navigationMouseButton.addEventListener('click', () => runCommand('navigation-mouse'));
  navigationTrackpadButton.addEventListener('click', () => runCommand('navigation-trackpad'));
  statusOrthoButton.addEventListener('click', () => runCommand('toggle-ortho'));
  statusGridButton.addEventListener('click', () => runCommand('toggle-grid'));
  statusLineWeightButton.addEventListener('click', () => runCommand('toggle-lineweight'));

  function bindNumericControl(input, update, { live = false } = {}) {
    input.addEventListener('change', () => {
      update();
      renderer.draw();
    });
    if (live) {
      input.addEventListener('input', () => {
        const value = Math.trunc(Number(input.value));
        if (value >= 2 && value <= 360) update();
      });
    }
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (update()) {
          focusCanvas();
          renderer.draw();
        }
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        controller.cancelCurrentCommand();
        controller.updateUiStatus();
        renderer.draw();
        focusCanvas();
      }
    });
  }

  bindNumericControl(filletRadiusInput, controls.updateFilletRadiusFromInput);
  bindNumericControl(offsetDistanceInput, controls.updateOffsetDistanceFromInput);
  bindNumericControl(polarArrayCountInput, controls.updatePolarArrayCountFromInput, { live: true });
  [chamferDistanceFirstInput, chamferDistanceSecondInput].forEach((input) =>
    bindNumericControl(input, controls.updateChamferDistancesFromInput));

  blockEditorSaveButton.addEventListener('click', () => blockEditor.finish(true));
  blockEditorDiscardButton.addEventListener('click', () => blockEditor.finish(false));

  const toolCommands = new Map([
    [selectToolButton, 'select'], [lineToolButton, 'line'],
    [tangentLineToolButton, 'tangent-line'], [pointTangentLineToolButton, 'point-tangent-line'],
    [xlineToolButton, 'xline'], [polylineToolButton, 'polyline'],
    [rectangleToolButton, 'rectangle'], [textToolButton, 'text'], [hatchToolButton, 'hatch'],
    [trimToolButton, 'trim'], [extendToolButton, 'extend'], [filletToolButton, 'fillet'],
    [offsetToolButton, 'offset'], [chamferToolButton, 'chamfer'], [copyToolButton, 'copy'],
    [moveToolButton, 'move'], [stretchToolButton, 'stretch'],
    [polarArrayToolButton, 'polar-array'], [rotateToolButton, 'rotate'],
    [scaleToolButton, 'scale'], [mirrorToolButton, 'mirror'], [eraseToolButton, 'erase'],
    [explodeToolButton, 'explode'], [fitButton, 'fit'], [undoButton, 'undo'], [redoButton, 'redo'],
    [newButton, 'new'], [saveButton, 'save'], [exportDxfButton, 'export-dxf'],
    [importDxfButton, 'import-dxf'],
  ]);
  toolCommands.forEach((command, button) => button.addEventListener('click', () => runCommand(command)));
  circleToolButton.addEventListener('click', () => runCommand(state.lastCircleTool));
  arcToolButton.addEventListener('click', () => runCommand(state.lastArcTool));
  blockToolButton.addEventListener('click', () => runCommand('block-insert'));

  function bindToolGroupMenu(button) {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const group = button.closest('.tool-group');
      menuServices.setToolGroupOpen(group, !group.classList.contains('is-open'));
    });
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
  [circleToolMenuButton, arcToolMenuButton, blockToolMenuButton].forEach(bindToolGroupMenu);
  toolFlyoutCommandButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      runCommand(button.dataset.command);
    });
  });

  lineStyleToggle.addEventListener('click', () =>
    menuServices.setLineStylePickerOpen(!lineStylePicker.classList.contains('is-open')));
  lineStyleOptionButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      menuServices.setActiveLineStyle(button.dataset.lineStyle);
    });
  });
  lineTypeToggle.addEventListener('click', () =>
    menuServices.setLineTypePickerOpen(!lineTypePicker.classList.contains('is-open')));
  lineTypeOptionButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      menuServices.setActiveLineType(button.dataset.lineType);
    });
  });
  lineColorToggle.addEventListener('click', () =>
    menuServices.setLineColorPickerOpen(!lineColorPicker.classList.contains('is-open')));
  lineColorOptionButtons.forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      menuServices.setActiveLineColor(button.dataset.lineColor);
    });
  });
  layerUi.bindEvents();

  root.addEventListener('pointerdown', (event) => {
    if (!layerPicker.contains(event.target)) layerUi.setLayerPickerOpen(false);
    if (!lineStylePicker.contains(event.target)) menuServices.setLineStylePickerOpen(false);
    if (!lineTypePicker.contains(event.target)) menuServices.setLineTypePickerOpen(false);
    if (!lineColorPicker.contains(event.target)) menuServices.setLineColorPickerOpen(false);
    if (![...toolGroupElements].some((element) => element.contains(event.target))) {
      menuServices.closeToolGroups();
    }
  });

  bindDialogEvents({
    elements: {
      drawingProfile: {
        dialog: elements.drawingProfileDialog,
        confirmButton: elements.drawingProfileConfirmButton,
        cancelButton: elements.drawingProfileCancelButton,
        closeButton: elements.drawingProfileCloseButton,
      },
      settings: {
        dialog: elements.settingsDialog,
        confirmButton: elements.settingsDialogConfirmButton,
        cancelButton: elements.settingsDialogCancelButton,
        closeButton: elements.settingsDialogCloseButton,
      },
      text: {
        dialog: elements.textDialog,
        confirmButton: elements.textDialogConfirmButton,
        cancelButton: elements.textDialogCancelButton,
        closeButton: elements.textDialogCloseButton,
        inputs: [elements.textContentInput, elements.textHeightInput],
      },
      polylineWidth: {
        dialog: elements.polylineWidthDialog,
        confirmButton: elements.polylineWidthConfirmButton,
        cancelButton: elements.polylineWidthCancelButton,
        closeButton: elements.polylineWidthCloseButton,
        inputs: [elements.polylineStartWidthInput, elements.polylineEndWidthInput],
      },
      blockCreate: {
        dialog: elements.blockCreateDialog,
        confirmButton: elements.blockCreateConfirmButton,
        cancelButton: elements.blockCreateCancelButton,
        closeButton: elements.blockCreateCloseButton,
        nameInput: elements.blockNameInput,
      },
      blockInsert: {
        dialog: elements.blockInsertDialog,
        confirmButton: elements.blockInsertConfirmButton,
        cancelButton: elements.blockInsertCancelButton,
        closeButton: elements.blockInsertCloseButton,
        inputs: [elements.blockInsertNameInput, elements.blockInsertScaleInput, elements.blockInsertRotationInput],
      },
      hatch: {
        dialog: elements.hatchDialog,
        confirmButton: elements.hatchDialogConfirmButton,
        cancelButton: elements.hatchDialogCancelButton,
        closeButton: elements.hatchDialogCloseButton,
      },
      about: {
        dialog: elements.aboutDialog,
        confirmButton: elements.aboutDialogConfirmButton,
        closeButton: elements.aboutDialogCloseButton,
      },
    },
    actions: {
      confirmDrawingProfile: dialogs.confirmDrawingProfileDialog,
      closeDrawingProfile: dialogs.closeDrawingProfileDialog,
      confirmSettings: dialogs.confirmSettingsDialog,
      closeSettings: dialogs.closeSettingsDialog,
      confirmText: dialogs.confirmTextDialog,
      closeText: dialogs.closeTextDialog,
      confirmPolylineWidth: dialogs.confirmPolylineWidthDialog,
      closePolylineWidth: dialogs.closePolylineWidthDialog,
      confirmBlockCreate: blockDialogs.confirmCreate,
      closeBlockCreate: blockDialogs.closeCreate,
      confirmBlockInsert: blockDialogs.confirmInsert,
      closeBlockInsert: blockDialogs.closeInsert,
      confirmHatch: hatchDialog.confirm,
      closeHatch: hatchDialog.close,
      closeAbout: dialogs.closeAboutDialog,
    },
  });
}

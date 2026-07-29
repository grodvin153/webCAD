/*
 * webCAD - Enlace de eventos de dialogos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

function bindModal(dialog, { confirm, close, closeOnEnter = true }) {
  dialog.addEventListener('pointerdown', (event) => {
    if (event.target === dialog) {
      close();
    }
  });
  dialog.addEventListener('keydown', (event) => {
    if (closeOnEnter && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      confirm();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  });
}

export function bindDialogEvents({ elements, actions }) {
  const {
    drawingProfile,
    saveFile,
    settings,
    rebuildModel,
    text,
    polylineWidth,
    blockCreate,
    blockInsert,
    hatch,
    about,
  } = elements;

  drawingProfile.confirmButton.addEventListener('click', actions.confirmDrawingProfile);
  drawingProfile.cancelButton.addEventListener('click', actions.closeDrawingProfile);
  drawingProfile.closeButton.addEventListener('click', actions.closeDrawingProfile);
  bindModal(drawingProfile.dialog, {
    confirm: actions.confirmDrawingProfile,
    close: actions.closeDrawingProfile,
  });

  saveFile.confirmButton.addEventListener('click', actions.confirmSaveFile);
  saveFile.cancelButton.addEventListener('click', () => actions.closeSaveFile(null));
  saveFile.closeButton.addEventListener('click', () => actions.closeSaveFile(null));
  saveFile.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === saveFile.dialog) actions.closeSaveFile(null);
  });
  saveFile.nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      actions.confirmSaveFile();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      actions.closeSaveFile(null);
    }
  });

  settings.confirmButton.addEventListener('click', actions.confirmSettings);
  settings.cancelButton.addEventListener('click', actions.closeSettings);
  settings.closeButton.addEventListener('click', actions.closeSettings);
  settings.resetCoplanarToleranceButton.addEventListener(
    'click',
    actions.resetSettingsCoplanarTolerance,
  );
  bindModal(settings.dialog, { confirm: actions.confirmSettings, close: actions.closeSettings });

  rebuildModel.confirmButton.addEventListener(
    'click',
    actions.confirmRebuildModel,
  );
  rebuildModel.cancelButton.addEventListener('click', actions.closeRebuildModel);
  rebuildModel.closeButton.addEventListener('click', actions.closeRebuildModel);
  bindModal(rebuildModel.dialog, {
    confirm: actions.confirmRebuildModel,
    close: actions.closeRebuildModel,
  });

  text.confirmButton.addEventListener('click', actions.confirmText);
  text.cancelButton.addEventListener('click', () => actions.closeText(true));
  text.closeButton.addEventListener('click', () => actions.closeText(true));
  text.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === text.dialog) actions.closeText(true);
  });
  text.inputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        actions.confirmText();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        actions.closeText(true);
      }
    });
  });

  polylineWidth.confirmButton.addEventListener('click', actions.confirmPolylineWidth);
  polylineWidth.cancelButton.addEventListener('click', actions.closePolylineWidth);
  polylineWidth.closeButton.addEventListener('click', actions.closePolylineWidth);
  polylineWidth.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === polylineWidth.dialog) actions.closePolylineWidth();
  });
  polylineWidth.inputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        actions.confirmPolylineWidth();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        actions.closePolylineWidth();
      }
    });
  });

  blockCreate.confirmButton.addEventListener('click', actions.confirmBlockCreate);
  blockCreate.cancelButton.addEventListener('click', () => actions.closeBlockCreate(true));
  blockCreate.closeButton.addEventListener('click', () => actions.closeBlockCreate(true));
  blockCreate.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === blockCreate.dialog) actions.closeBlockCreate(true);
  });
  blockCreate.nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      actions.confirmBlockCreate();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      actions.closeBlockCreate(true);
    }
  });

  blockInsert.confirmButton.addEventListener('click', actions.confirmBlockInsert);
  blockInsert.cancelButton.addEventListener('click', () => actions.closeBlockInsert(true));
  blockInsert.closeButton.addEventListener('click', () => actions.closeBlockInsert(true));
  blockInsert.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === blockInsert.dialog) actions.closeBlockInsert(true);
  });
  blockInsert.inputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        actions.confirmBlockInsert();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        actions.closeBlockInsert(true);
      }
    });
  });

  hatch.confirmButton.addEventListener('click', actions.confirmHatch);
  hatch.cancelButton.addEventListener('click', () => actions.closeHatch(true));
  hatch.closeButton.addEventListener('click', () => actions.closeHatch(true));
  bindModal(hatch.dialog, {
    confirm: actions.confirmHatch,
    close: () => actions.closeHatch(true),
  });

  about.closeButton.addEventListener('click', actions.closeAbout);
  about.confirmButton.addEventListener('click', actions.closeAbout);
  about.dialog.addEventListener('pointerdown', (event) => {
    if (event.target === about.dialog) actions.closeAbout();
  });
  about.dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      actions.closeAbout();
    }
  });
}

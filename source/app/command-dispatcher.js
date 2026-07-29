/* webCAD - Despacho central de ordenes | SPDX-License-Identifier: GPL-3.0-or-later */

export function createCommandDispatcher({
  state,
  controller,
  repeatableCommands,
  dimensionTools,
  localFileManager,
  commands,
  actions,
  elements,
}) {
  function run(command) {
    if (repeatableCommands.has(command)) state.lastCommand = command;
    if (command === 'undo') actions.undoDrawing();
    if (command === 'redo') actions.redoDrawing();
    if (command === 'save') void localFileManager.save();
    if (command === 'save-as') void localFileManager.saveAs();
    if (command === 'save-webcad') actions.saveWebcadProject();
    if (command === 'open-webcad') actions.openWebcadProject();
    if (command === 'select') controller.setTool('select');
    if (command === 'select-set') controller.startSelectionSet();
    if (command === 'line') controller.setTool('line');
    if (command === 'tangent-line') commands.tangentLine.start();
    if (command === 'point-tangent-line') commands.pointTangentLine.start();
    if (command === 'xline') commands.xline.start();
    if (command === 'polyline') controller.setTool('polyline');
    if (command === 'regular-polygon') commands.regularPolygon.start();
    if (command === 'ellipse') commands.ellipse.start();
    if (command === 'rectangle') controller.setTool('rectangle');
    if (command === 'text') controller.startText();
    if (command === 'hatch') controller.startHatch();
    if (command === 'block-create') controller.startBlockCreate();
    if (command === 'block-insert') controller.startBlockInsert();
    if (dimensionTools.has(command)) controller.startDimension(command);
    if (command === 'circle-center' || command === 'circle-3p') {
      state.lastCircleTool = command;
      elements.circleToolButton.dataset.tool = command;
      controller.setTool(command);
    }
    if (['arc-center-radius', 'arc-3p', 'arc-center-start-end'].includes(command)) {
      state.lastArcTool = command;
      elements.arcToolButton.dataset.tool = command;
      controller.setTool(command);
    }
    if (command === 'copy') controller.startCopy();
    if (command === 'move') controller.startMove();
    if (command === 'stretch') commands.stretch.start();
    if (command === 'polar-array') commands.polarArray.start();
    if (command === 'rotate') controller.startRotate();
    if (command === 'scale') commands.scale.start();
    if (command === 'mirror') controller.startMirror();
    if (command === 'trim') commands.trim.start();
    if (command === 'fillet') controller.setTool('fillet');
    if (command === 'offset') commands.offset.start();
    if (command === 'chamfer') controller.setTool('chamfer');
    if (command === 'extend') controller.startExtend();
    if (command === 'erase') {
      const threeMode = globalThis.window?.webcadThreeMode;
      if (threeMode?.isActive?.()) threeMode.startDeleteSolid?.();
      else controller.startErase();
    }
    if (command === 'explode') controller.startExplode();
    if (command === 'polyline-join') controller.startPolylineJoin();
    if (command === 'toggle-ortho') actions.toggleOrthoMode();
    if (command === 'toggle-grid') actions.toggleGridSnap();
    if (command === 'toggle-axes') actions.toggleAxesVisibility();
    if (command === 'toggle-lineweight') actions.toggleLineWeightDisplay();
    if (command === 'fit') actions.fitView();
    if (command === 'navigation-mouse') actions.setNavigationDevice('mouse');
    if (command === 'navigation-trackpad') actions.setNavigationDevice('trackpad');
    if (command === 'three-projection-perspective') {
      globalThis.window?.webcadThreeMode?.setProjectionPreference?.('perspective');
    }
    if (command === 'three-projection-orthographic') {
      globalThis.window?.webcadThreeMode?.setProjectionPreference?.('orthographic');
    }
    if (command === 'new') actions.newDrawing();
    if (command === 'drawing-profile') actions.openDrawingProfileDialog();
    if (command === 'settings') actions.openSettingsDialog();
    if (command === 'rebuild-model3d') actions.openRebuildModelDialog();
    if (command === 'export-dxf') actions.exportDxf();
    if (command === 'export-stl') actions.exportStl();
    if (command === 'import-dxf') actions.importDxf();
    if (command === 'import-png') actions.importPng();
    if (command === 'about') actions.showAbout();
    if (!command.startsWith('toggle-')) actions.closeToolGroups();
  }

  return { run };
}

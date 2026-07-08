/* webCAD - Secuencia final de arranque | SPDX-License-Identifier: GPL-3.0-or-later */

export function initializeApplication({
  renderer,
  layerUi,
  menuServices,
  runtimeControls,
  dimensionStyleSelect,
  state,
  controller,
}) {
  renderer.resize();
  layerUi.buildLayerColorPalette();
  layerUi.syncLayerPicker();
  menuServices.syncLineStylePicker();
  menuServices.syncLineTypePicker();
  menuServices.syncLineColorPicker();
  runtimeControls.syncNavigationDeviceButtons();
  dimensionStyleSelect.value = state.dimensionStyle;
  controller.setTool('select');
}

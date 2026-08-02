/* webCAD - Controles runtime, perfiles y modos de vista | SPDX-License-Identifier: GPL-3.0-or-later */

export function createRuntimeControls({
  state,
  controller,
  renderer,
  canvas,
  elements,
  snapThreshold,
  activeDrawingProfile,
  drawingProfileById,
  formatNumber,
  getUnitsLabel,
  setProfileRuntimeValues,
  storePreference,
}) {
  const {
    navigationMouseButton,
    navigationTrackpadButton,
    filletRadiusInput,
    offsetDistanceInput,
    polarArrayCountInput,
    regularPolygonSidesInput,
    chamferDistanceFirstInput,
    chamferDistanceSecondInput,
  } = elements;

  function syncNavigationDeviceButtons() {
    const mouseActive = state.navigationDevice === 'mouse';
    navigationMouseButton.classList.toggle('is-active', mouseActive);
    navigationMouseButton.setAttribute('aria-pressed', String(mouseActive));
    navigationTrackpadButton.classList.toggle('is-active', !mouseActive);
    navigationTrackpadButton.setAttribute('aria-pressed', String(!mouseActive));
  }

  function setNavigationDevice(device) {
    if (device !== 'mouse' && device !== 'trackpad') return false;
    controller.cancelMouseWheelZoom();
    state.navigationDevice = device;
    try {
      localStorage.setItem('webcad-navigation-device', device);
    }
    catch {
      // El modo seleccionado sigue activo durante la sesion.
    }
    syncNavigationDeviceButtons();
    const browserWindow = globalThis.window || null;
    const event = typeof CustomEvent === 'function'
      ? new CustomEvent('webcad:navigation-device-change', { detail: { device } })
      : null;
    if (event) browserWindow?.dispatchEvent?.(event);
    browserWindow?.webcadThreeMode?.syncSettings?.();
    state.statusText = device === 'mouse'
      ? 'Modo raton: rueda para zoom · boton central para pan'
      : 'Modo trackpad: dos dedos para pan · Shift + dos dedos para zoom';
    controller.updateUiStatus();
    renderer.draw();
    requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
    return true;
  }

  function activeFilletRadius() {
    const radius = state.filletRadii[state.drawingProfile];
    return Number.isFinite(radius) ? radius : state.drawingProfile === 'architecture' ? 0.25 : 10;
  }

  function syncFilletRadiusControl() {
    if (!filletRadiusInput) return;
    filletRadiusInput.step = state.drawingProfile === 'architecture' ? '0.01' : '1';
    filletRadiusInput.value = String(activeFilletRadius());
  }

  function updateFilletRadiusFromInput() {
    const radius = Number(String(filletRadiusInput.value).replace(',', '.'));
    if (!Number.isFinite(radius) || radius < 0) {
      state.statusText = 'El radio de empalme no puede ser negativo';
      controller.updateUiStatus();
      return false;
    }
    state.filletRadii[state.drawingProfile] = radius;
    state.statusText = `Radio de empalme: ${formatNumber(radius)} ${getUnitsLabel()}`;
    controller.updateUiStatus();
    return true;
  }

  function activeOffsetDistance() {
    const offset = state.offsetDistances[state.drawingProfile];
    return Number.isFinite(offset) ? offset : state.drawingProfile === 'architecture' ? 0.25 : 10;
  }

  function syncOffsetDistanceControl() {
    if (!offsetDistanceInput) return;
    offsetDistanceInput.step = state.drawingProfile === 'architecture' ? '0.01' : '1';
    offsetDistanceInput.value = String(activeOffsetDistance());
  }

  function updateOffsetDistanceFromInput() {
    const offset = Number(String(offsetDistanceInput.value).replace(',', '.'));
    if (!Number.isFinite(offset) || offset <= snapThreshold) {
      state.statusText = 'La distancia de equidistancia debe ser mayor que cero';
      controller.updateUiStatus();
      return false;
    }
    state.offsetDistances[state.drawingProfile] = offset;
    storePreference(`webcad-offset-distance-${state.drawingProfile}`, offset);
    state.statusText = `Distancia de equidistancia: ${formatNumber(offset)} ${getUnitsLabel()}`;
    controller.updateUiStatus();
    return true;
  }

  function syncPolarArrayCountControl() {
    if (polarArrayCountInput) polarArrayCountInput.value = String(state.polarArrayCount);
  }

  function syncRegularPolygonSidesControl() {
    if (regularPolygonSidesInput) regularPolygonSidesInput.value = String(state.regularPolygonSides);
  }

  function updatePolarArrayCountFromInput() {
    const count = Math.trunc(Number(polarArrayCountInput.value));
    if (!Number.isFinite(count) || count < 2 || count > 360) {
      state.statusText = 'La matriz polar admite entre 2 y 360 elementos';
      controller.updateUiStatus();
      return false;
    }
    state.polarArrayCount = count;
    storePreference('webcad-polar-array-count', count);
    state.statusText = `Matriz polar: ${count} elementos`;
    controller.updateUiStatus();
    renderer.draw();
    return true;
  }

  function updateRegularPolygonSidesFromInput() {
    const sides = Math.trunc(Number(regularPolygonSidesInput.value));
    if (!Number.isFinite(sides) || sides < 3 || sides > 360) {
      state.statusText = 'El poligono regular admite entre 3 y 360 lados';
      controller.updateUiStatus();
      return false;
    }
    state.regularPolygonSides = sides;
    storePreference('webcad-regular-polygon-sides', sides);
    state.statusText = `Poligono regular: ${sides} lados`;
    controller.updateUiStatus();
    renderer.draw();
    return true;
  }

  function activeChamferDistances() {
    return state.chamferDistances[state.drawingProfile] || { first: 10, second: 10 };
  }

  function formatChamferDistances() {
    const distances = activeChamferDistances();
    return `D1 ${formatNumber(distances.first)} · D2 ${formatNumber(distances.second)}`;
  }

  function syncChamferDistanceControl() {
    if (!chamferDistanceFirstInput || !chamferDistanceSecondInput) return;
    const distances = activeChamferDistances();
    const step = state.drawingProfile === 'architecture' ? '0.01' : '1';
    chamferDistanceFirstInput.step = step;
    chamferDistanceSecondInput.step = step;
    chamferDistanceFirstInput.value = String(distances.first);
    chamferDistanceSecondInput.value = String(distances.second);
  }

  function updateChamferDistancesFromInput() {
    const first = Number(String(chamferDistanceFirstInput.value).replace(',', '.'));
    const second = Number(String(chamferDistanceSecondInput.value).replace(',', '.'));
    if (!Number.isFinite(first) || !Number.isFinite(second) || first < 0 || second < 0) {
      state.statusText = 'Las distancias de chaflan no pueden ser negativas';
      controller.updateUiStatus();
      return false;
    }
    state.chamferDistances[state.drawingProfile] = { first, second };
    state.statusText = `Chaflan: ${formatChamferDistances()} ${getUnitsLabel()}`;
    controller.updateUiStatus();
    return true;
  }

  function setDrawingProfileRuntime(profileId) {
    const profile = drawingProfileById(profileId);
    state.drawingProfile = profile.id;
    setProfileRuntimeValues(profile);
    state.lastTextHeight = profile.defaultTextHeight;
    syncFilletRadiusControl();
    syncOffsetDistanceControl();
    syncChamferDistanceControl();
    return profile;
  }

  function applyDrawingProfile(profileId) {
    const previousProfile = activeDrawingProfile();
    const profile = drawingProfileById(profileId);
    if (profile.id === previousProfile.id) {
      state.statusText = `Perfil activo: ${profile.label} (${profile.unitsLabel})`;
      controller.updateUiStatus();
      renderer.draw();
      return false;
    }
    controller.cancelCurrentCommand();
    setDrawingProfileRuntime(profile.id);
    renderer.fitToDocument();
    state.statusText = `Tipo de dibujo: ${profile.label} · unidades en ${profile.unitsLabel}`;
    controller.updateUiStatus();
    renderer.draw();
    return true;
  }

  function toggleOrthoMode() {
    state.orthoEnabled = !state.orthoEnabled;
    state.statusText = state.orthoEnabled ? 'Modo ortogonal activo' : 'Modo libre';
    controller.updateUiStatus();
    renderer.draw();
  }

  function toggleGridSnap() {
    state.snapEnabled = !state.snapEnabled;
    storePreference('webcad-grid-enabled', state.snapEnabled);
    state.statusText = state.snapEnabled ? 'Snap a rejilla activo' : 'Snap a rejilla desactivado';
    controller.updateUiStatus();
    renderer.draw();
  }

  function toggleAxesVisibility() {
    state.axesVisible = !state.axesVisible;
    storePreference('webcad-axes-visible', state.axesVisible);
    state.statusText = state.axesVisible ? 'Ejes visibles' : 'Ejes ocultos';
    controller.updateUiStatus();
    renderer.draw();
  }

  function toggleLineWeightDisplay() {
    state.lineWeightDisplayEnabled = !state.lineWeightDisplayEnabled;
    storePreference('webcad-lineweight-display-enabled', state.lineWeightDisplayEnabled);
    state.statusText = state.lineWeightDisplayEnabled
      ? 'Grosores de línea visibles'
      : 'Grosores de línea ocultos';
    controller.updateUiStatus();
    renderer.draw();
  }

  function fitView() {
    const threeMode = globalThis.window?.webcadThreeMode;
    if (threeMode?.isActive?.() && threeMode.fitView?.()) {
      state.statusText = 'Vista 3D ajustada';
      controller.updateUiStatus();
      return;
    }
    state.statusText = 'Vista ajustada';
    renderer.fitToDocument();
    controller.updateUiStatus();
    renderer.draw();
  }

  return {
    activeChamferDistances,
    activeFilletRadius,
    activeOffsetDistance,
    applyDrawingProfile,
    fitView,
    formatChamferDistances,
    setDrawingProfileRuntime,
    setNavigationDevice,
    syncChamferDistanceControl,
    syncFilletRadiusControl,
    syncNavigationDeviceButtons,
    syncOffsetDistanceControl,
    syncPolarArrayCountControl,
    syncRegularPolygonSidesControl,
    toggleGridSnap,
    toggleAxesVisibility,
    toggleLineWeightDisplay,
    toggleOrthoMode,
    updateChamferDistancesFromInput,
    updateFilletRadiusFromInput,
    updateOffsetDistanceFromInput,
    updatePolarArrayCountFromInput,
    updateRegularPolygonSidesFromInput,
  };
}

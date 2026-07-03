/*
 * webCAD - Persistencia de preferencias de interfaz
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createPreferenceServices({ lineStyles, defaultLineStyle, dimensionStyles }) {
  function loadNavigationDevice() {
    try {
      const savedDevice = localStorage.getItem('webcad-navigation-device');
      return savedDevice === 'mouse' || savedDevice === 'trackpad'
        ? savedDevice
        : 'trackpad';
    }
    catch {
      return 'trackpad';
    }
  }

  function loadBooleanPreference(key, fallback) {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? fallback : storedValue === 'true';
    }
    catch {
      return fallback;
    }
  }

  function loadLineStylePreference() {
    try {
      const storedStyle = localStorage.getItem('webcad-active-line-style');
      return storedStyle && lineStyles[storedStyle] ? storedStyle : defaultLineStyle;
    }
    catch {
      return defaultLineStyle;
    }
  }

  function loadIntegerPreference(key, fallback, min, max) {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) {
        return fallback;
      }
      const value = Number(storedValue);
      return Number.isInteger(value) ? value : fallback;
    }
    catch {
      return fallback;
    }
  }

  function loadDimensionStylePreference() {
    try {
      const styleId = localStorage.getItem('webcad-dimension-style');
      return dimensionStyles[styleId] ? styleId : 'normal';
    }
    catch {
      return 'normal';
    }
  }

  function storePreference(key, value) {
    try {
      localStorage.setItem(key, String(value));
    }
    catch {
      // Preferences remain active for the current session when storage is unavailable.
    }
  }

  return {
    loadBooleanPreference,
    loadDimensionStylePreference,
    loadIntegerPreference,
    loadLineStylePreference,
    loadNavigationDevice,
    storePreference,
  };
}

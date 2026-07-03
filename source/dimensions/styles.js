/*
 * webCAD - Estilos y presentacion de cotas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createDimensionStyles(dependencies) {
  const {
    DIMENSION_STYLES,
    activeDrawingProfile,
    getState,
    normalizedVector,
  } = dependencies;

  function dimensionStyleMetrics(styleId) {
    const style = DIMENSION_STYLES[styleId] || DIMENSION_STYLES.normal;
    const profileMetrics = activeDrawingProfile().dimensionMetrics;
    const scale = style.scale / DIMENSION_STYLES.normal.scale;
    return {
      textHeight: profileMetrics.textHeight * scale,
      arrowSize: profileMetrics.arrowSize * scale,
      textGap: profileMetrics.textGap,
      extensionOffset: profileMetrics.extensionOffset * scale,
      extensionOvershoot: profileMetrics.extensionOvershoot * scale,
    };
  }

  function dimensionArrow(tip, direction, size) {
    const unit = normalizedVector({ x: 0, y: 0 }, direction) || { x: 1, y: 0 };
    const normal = { x: -unit.y, y: unit.x };
    const arrowLength = size * 0.78;
    const base = { x: tip.x + unit.x * arrowLength, y: tip.y + unit.y * arrowLength };
    const halfWidth = size * 0.18;
    return [
      { ...tip },
      { x: base.x + normal.x * halfWidth, y: base.y + normal.y * halfWidth },
      { x: base.x - normal.x * halfWidth, y: base.y - normal.y * halfWidth },
    ];
  }

  function dimensionExtensionLine(reference, dimensionPoint, metrics) {
    const unit = normalizedVector(reference, dimensionPoint);
    if (!unit) {
      return null;
    }
    return {
      start: {
        x: reference.x + unit.x * metrics.extensionOffset,
        y: reference.y + unit.y * metrics.extensionOffset,
      },
      end: {
        x: dimensionPoint.x + unit.x * metrics.extensionOvershoot,
        y: dimensionPoint.y + unit.y * metrics.extensionOvershoot,
      },
    };
  }

  function dimensionTextValue(entity) {
    const state = getState();
    const precision = entity.kind === 'angular'
      ? state.dimensionPrecision[state.drawingProfile].angular
      : state.dimensionPrecision[state.drawingProfile].linear;
    const fixedValue = entity.measurement().toFixed(precision);
    const value = fixedValue.includes('.')
      ? fixedValue.replace(/0+$/, '').replace(/\.$/, '')
      : fixedValue;
    if (entity.kind === 'radius') {
      return `R${value}`;
    }
    if (entity.kind === 'diameter') {
      return `Ø${value}`;
    }
    if (entity.kind === 'angular') {
      return `${value}°`;
    }
    return value;
  }

  function naturalDimensionTextNormal(angle) {
    let normal = { x: -Math.sin(angle), y: Math.cos(angle) };
    if (Math.abs(Math.cos(angle)) < 0.05) {
      if (normal.x > 0) {
        normal = { x: -normal.x, y: -normal.y };
      }
    }
    else if (normal.y > 0) {
      normal = { x: -normal.x, y: -normal.y };
    }
    return normal;
  }

  return {
    dimensionStyleMetrics,
    dimensionArrow,
    dimensionExtensionLine,
    dimensionTextValue,
    naturalDimensionTextNormal,
  };
}

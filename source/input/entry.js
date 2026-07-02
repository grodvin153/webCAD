/*
 * webCAD - Entrada y formato de teclado
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function parseDistanceInput(value) {
  const normalized = value.replace(',', '.');
  const distanceValue = Number(normalized);
  return Number.isFinite(distanceValue) && distanceValue > 0 ? distanceValue : null;
}

export function parseAngleInput(value) {
  const normalized = value.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
    return null;
  }
  const angle = Number(normalized);
  return Number.isFinite(angle) ? angle : null;
}

export function parseRelativeCoordinateInput(value) {
  const match = value.trim().match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))$/);
  if (!match) {
    return null;
  }

  const x = Number(match[1]);
  const y = Number(match[2]);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}


export function parseCopyMultiplier(value) {
  const match = value.trim().match(/^x(\d+)$/i);
  if (!match) {
    return null;
  }

  const count = Number(match[1]);
  return Number.isInteger(count) && count >= 2 ? count : null;
}


export function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return Math.abs(value) >= 1000
    ? value.toFixed(0)
    : value.toFixed(2).replace(/\.00$/, '');
}

export function formatSnapType(type) {
  if (type === 'endpoint') {
    return 'Punto final';
  }
  if (type === 'midpoint') {
    return 'Punto medio';
  }
  if (type === 'intersection') {
    return 'Interseccion';
  }
  if (type === 'perpendicular') {
    return 'Perpendicular';
  }
  if (type === 'center') {
    return 'Centro';
  }
  if (type === 'quadrant') {
    return 'Cuadrante';
  }
  return 'Snap';
}

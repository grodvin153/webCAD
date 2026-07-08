/*
 * webCAD - Entrada y formato de teclado
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function parseScalarExpression(value) {
  const source = String(value || '').trim();
  if (!source || !/^[0-9eE+\-*/().\s]+$/.test(source)) return null;
  let index = 0;
  const skipSpaces = () => {
    while (/\s/.test(source[index] || '')) index += 1;
  };
  const parsePrimary = () => {
    skipSpaces();
    if (source[index] === '(') {
      index += 1;
      const result = parseExpression();
      skipSpaces();
      if (source[index] !== ')') throw new Error('parentesis');
      index += 1;
      return result;
    }
    const match = source.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
    if (!match) throw new Error('numero');
    index += match[0].length;
    return Number(match[0]);
  };
  const parseUnary = () => {
    skipSpaces();
    if (source[index] === '+' || source[index] === '-') {
      const sign = source[index] === '-' ? -1 : 1;
      index += 1;
      return sign * parseUnary();
    }
    return parsePrimary();
  };
  const parseTerm = () => {
    let result = parseUnary();
    while (true) {
      skipSpaces();
      const operator = source[index];
      if (operator !== '*' && operator !== '/') break;
      index += 1;
      const operand = parseUnary();
      result = operator === '*' ? result * operand : result / operand;
    }
    return result;
  };
  function parseExpression() {
    let result = parseTerm();
    while (true) {
      skipSpaces();
      const operator = source[index];
      if (operator !== '+' && operator !== '-') break;
      index += 1;
      const operand = parseTerm();
      result = operator === '+' ? result + operand : result - operand;
    }
    return result;
  }
  try {
    const result = parseExpression();
    skipSpaces();
    return index === source.length && Number.isFinite(result) ? result : null;
  }
  catch {
    return null;
  }
}

export function parseDistanceInput(value) {
  const distanceValue = parseScalarExpression(value);
  return Number.isFinite(distanceValue) && distanceValue > 0 ? distanceValue : null;
}

export function parseAngleInput(value) {
  const angle = parseScalarExpression(value);
  return Number.isFinite(angle) ? angle : null;
}

export function parseRelativeCoordinateInput(value) {
  const parts = String(value || '').split(',');
  if (![2, 3].includes(parts.length) || parts.some((part) => !part.trim())) return null;
  const x = parseScalarExpression(parts[0]);
  const y = parseScalarExpression(parts[1]);
  const z = parts.length === 3 ? parseScalarExpression(parts[2]) : 0;
  return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z) ? { x, y, z } : null;
}

export function parsePartialRelativeCoordinateInput(value) {
  const parts = String(value || '').split(',');
  if (![2, 3].includes(parts.length)) return null;
  const x = parts[0].trim() ? parseScalarExpression(parts[0]) : null;
  const y = parts[1].trim() ? parseScalarExpression(parts[1]) : null;
  const z = parts.length === 3 && parts[2].trim() ? parseScalarExpression(parts[2]) : null;
  if (
    (parts[0].trim() && x === null) ||
    (parts[1].trim() && y === null) ||
    (parts.length === 3 && parts[2].trim() && z === null) ||
    (x === null && y === null && z === null)
  ) {
    return null;
  }
  return { x, y, z };
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

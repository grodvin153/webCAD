/* webCAD - Matematicas 3D experimentales | SPDX-License-Identifier: GPL-3.0-or-later */

const NORMALIZE_EPSILON = 1e-12;

function component(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function add3(first, second) {
  return {
    x: component(first?.x) + component(second?.x),
    y: component(first?.y) + component(second?.y),
    z: component(first?.z) + component(second?.z),
  };
}

export function sub3(first, second) {
  return {
    x: component(first?.x) - component(second?.x),
    y: component(first?.y) - component(second?.y),
    z: component(first?.z) - component(second?.z),
  };
}

export function scale3(vector, factor) {
  const scalar = component(factor);
  return {
    x: component(vector?.x) * scalar,
    y: component(vector?.y) * scalar,
    z: component(vector?.z) * scalar,
  };
}

export function dot3(first, second) {
  return component(first?.x) * component(second?.x) +
    component(first?.y) * component(second?.y) +
    component(first?.z) * component(second?.z);
}

export function cross3(first, second) {
  const firstX = component(first?.x);
  const firstY = component(first?.y);
  const firstZ = component(first?.z);
  const secondX = component(second?.x);
  const secondY = component(second?.y);
  const secondZ = component(second?.z);
  return {
    x: firstY * secondZ - firstZ * secondY,
    y: firstZ * secondX - firstX * secondZ,
    z: firstX * secondY - firstY * secondX,
  };
}

export function length3(vector) {
  return Math.hypot(
    component(vector?.x),
    component(vector?.y),
    component(vector?.z),
  );
}

export function normalize3(vector) {
  const vectorLength = length3(vector);
  return vectorLength > NORMALIZE_EPSILON
    ? scale3(vector, 1 / vectorLength)
    : { x: 0, y: 0, z: 0 };
}

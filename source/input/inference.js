/* webCAD - Inferencias ortogonales bloqueables | SPDX-License-Identifier: GPL-3.0-or-later */

import { coordinateZ } from '../coordinates/point3.js';

const DEFAULT_ANGLE_TOLERANCE = 6 * Math.PI / 180;

function samePoint(first, second, tolerance = 1e-9) {
  return first && second &&
    Math.abs(first.x - second.x) <= tolerance &&
    Math.abs(first.y - second.y) <= tolerance;
}

export function inferOrthogonalAxis(origin, point, angleTolerance = DEFAULT_ANGLE_TOLERANCE) {
  if (!origin || !point) return null;
  const deltaX = point.x - origin.x;
  const deltaY = point.y - origin.y;
  if (Math.hypot(deltaX, deltaY) <= 1e-9) return null;
  const angle = Math.atan2(Math.abs(deltaY), Math.abs(deltaX));
  if (angle <= angleTolerance) return 'horizontal';
  if (Math.abs(Math.PI * 0.5 - angle) <= angleTolerance) return 'vertical';
  return null;
}

export function inferenceAxisLine(origin, axis) {
  if (!origin || !axis) return null;
  return {
    point: { ...origin },
    direction: axis === 'horizontal' ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 },
  };
}

export function projectPointToInferenceAxis(origin, point, axis) {
  if (!origin || !point || !axis) return point ? { ...point } : null;
  return axis === 'horizontal'
    ? { x: point.x, y: origin.y, z: coordinateZ(point, coordinateZ(origin)) }
    : { x: origin.x, y: point.y, z: coordinateZ(point, coordinateZ(origin)) };
}

export function createOrthogonalInference({ angleTolerance = DEFAULT_ANGLE_TOLERANCE } = {}) {
  function clear(state, { keepLock = false } = {}) {
    state.activeInference = null;
    if (!keepLock) state.inferenceLock = null;
  }

  function axisFor(point, state, origin, options = {}) {
    if (!origin || !point || state.orthoEnabled || options.disabled) {
      clear(state);
      return null;
    }
    if (!state.shiftKeyDown) state.inferenceLock = null;
    if (state.shiftKeyDown && state.inferenceLock && samePoint(state.inferenceLock.origin, origin)) {
      return state.inferenceLock.axis;
    }
    const axis = inferOrthogonalAxis(origin, point, angleTolerance);
    if (state.shiftKeyDown && axis) {
      state.inferenceLock = { axis, origin: { ...origin } };
    }
    return axis;
  }

  function constrain(candidate, state, origin, axis, { objectSnap = null } = {}) {
    if (!axis || !origin || !candidate) {
      state.activeInference = null;
      return candidate;
    }
    const locked = Boolean(state.shiftKeyDown && state.inferenceLock);
    if (objectSnap && !locked) {
      state.activeInference = null;
      return candidate;
    }
    const point = projectPointToInferenceAxis(origin, candidate, axis);
    state.activeInference = {
      axis,
      origin: { ...origin },
      point: { ...point },
      locked,
    };
    return point;
  }

  function lock(state) {
    const inference = state.activeInference;
    if (!inference) return false;
    state.inferenceLock = {
      axis: inference.axis,
      origin: { ...inference.origin },
    };
    state.activeInference = { ...inference, locked: true };
    return true;
  }

  function unlock(state) {
    state.inferenceLock = null;
    if (state.activeInference) state.activeInference.locked = false;
  }

  return { axisFor, clear, constrain, lock, unlock };
}

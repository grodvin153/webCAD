/* webCAD - Orden de linea desde punto a tangente | SPDX-License-Identifier: GPL-3.0-or-later */

import { circularTangentOperand } from './geometry.js';
import {
  bestPointTangentSolution,
  pointTangentSolutions,
} from './point-geometry.js';

export function createPointTangentLineCommand({
  state,
  doc,
  setTool,
  findEntityAt,
  operandAt,
  resolvePoint,
  createLine,
  refresh,
}) {
  function start() {
    setTool('point-tangent-line');
    state.tangentLineDraft = { startPoint: null };
    state.statusText = 'Linea punto-tangente: indique el punto inicial · OSNAP disponible';
    refresh();
    return true;
  }

  function previewAt(entity, cursorPoint) {
    const startPoint = state.tangentLineDraft?.startPoint;
    if (!startPoint || !entity || !cursorPoint) return null;
    const operand = circularTangentOperand(entity, cursorPoint, operandAt);
    if (!operand) return null;
    const solutions = pointTangentSolutions(startPoint, operand);
    return {
      operand,
      solutions,
      solution: bestPointTangentSolution(solutions, cursorPoint),
    };
  }

  function pick(point) {
    const draft = state.tangentLineDraft;
    if (!draft?.startPoint) {
      const startPoint = resolvePoint(point, null);
      state.tangentLineDraft = { startPoint };
      const snapText = state.activeObjectSnap ? ' con OSNAP' : '';
      state.statusText = `Punto inicial indicado${snapText} - seleccione circulo, arco o tramo curvo`;
      refresh();
      return true;
    }

    const entity = findEntityAt(point);
    const preview = previewAt(entity, point);
    if (!preview?.solution) {
      state.statusText = entity
        ? 'No existe una tangente valida desde ese punto a la curva'
        : 'Seleccione un circulo, arco o tramo curvo de polilinea';
      refresh();
      return false;
    }

    doc.addEntity(createLine(preview.solution.start, preview.solution.end));
    setTool('select');
    doc.clearSelection();
    state.statusText = 'Linea desde punto a tangente creada';
    refresh();
    return true;
  }

  function updateGuidance(entity, point) {
    if (!state.tangentLineDraft?.startPoint) {
      resolvePoint(point, null);
      state.statusText = state.activeObjectSnap
        ? 'Linea punto-tangente: OSNAP disponible - clic para fijar el punto inicial'
        : 'Linea punto-tangente: indique el punto inicial · OSNAP disponible';
      return;
    }
    const preview = previewAt(entity, point);
    state.statusText = preview?.solution
      ? 'Tangente disponible - clic para crear la linea'
      : 'Seleccione un circulo, arco o tramo curvo';
  }

  return { pick, previewAt, start, updateGuidance };
}

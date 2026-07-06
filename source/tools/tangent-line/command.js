/*
 * webCAD - Orden de linea tangente a dos objetos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
  bestTangentSolution,
  circularTangentOperand,
  commonTangentSolutions,
} from './geometry.js';

export function createTangentLineCommand({
  state,
  doc,
  setTool,
  findEntityAt,
  operandAt,
  createLine,
  refresh,
}) {
  function start() {
    setTool('tangent-line');
    state.tangentLineDraft = { firstOperand: null };
    state.statusText = 'Linea tangente: seleccione el primer circulo, arco o tramo curvo';
    refresh();
    return true;
  }

  function previewAt(entity, point) {
    const draft = state.tangentLineDraft;
    if (!draft?.firstOperand || !entity || !point) return null;
    const secondOperand = circularTangentOperand(entity, point, operandAt);
    if (!secondOperand) return null;
    const solutions = commonTangentSolutions(draft.firstOperand, secondOperand);
    return {
      secondOperand,
      solutions,
      solution: bestTangentSolution(solutions, draft.firstOperand.pickPoint, point),
    };
  }

  function pick(point) {
    const entity = findEntityAt(point);
    const operand = circularTangentOperand(entity, point, operandAt);
    if (!operand) {
      state.statusText = 'Seleccione un circulo, arco o tramo curvo de polilinea';
      refresh();
      return false;
    }
    if (!state.tangentLineDraft?.firstOperand) {
      state.tangentLineDraft = { firstOperand: operand };
      state.statusText = 'Primer objeto indicado - seleccione el segundo objeto tangente';
      refresh();
      return true;
    }

    const preview = previewAt(entity, point);
    if (!preview?.solution) {
      state.statusText = 'No existe una tangente valida entre esos dos objetos';
      refresh();
      return false;
    }
    doc.addEntity(createLine(preview.solution.start, preview.solution.end));
    setTool('select');
    doc.clearSelection();
    state.statusText = `Linea tangente ${preview.solution.kind === 'external' ? 'exterior' : 'interior'} creada`;
    refresh();
    return true;
  }

  function updateGuidance(entity, point) {
    if (!state.tangentLineDraft?.firstOperand) return;
    const preview = previewAt(entity, point);
    state.statusText = preview?.solution
      ? `Tangente ${preview.solution.kind === 'external' ? 'exterior' : 'interior'} disponible - clic para crear`
      : 'Seleccione el segundo circulo, arco o tramo curvo';
  }

  return { pick, previewAt, start, updateGuidance };
}

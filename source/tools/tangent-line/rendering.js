/* webCAD - Ghost de linea bitangente | SPDX-License-Identifier: GPL-3.0-or-later */

export function drawTangentLinePreview(ctx, options) {
  const {
    draft,
    hoveredEntity,
    cursorPoint,
    command,
    drawOperand,
    previewColor,
    viewScale,
  } = options;
  if (!draft?.firstOperand) return;

  drawOperand(ctx, draft.firstOperand.primitive);
  const preview = command.previewAt(hoveredEntity, cursorPoint);
  if (!preview?.solution) return;

  const solution = preview.solution;
  ctx.save();
  ctx.strokeStyle = previewColor;
  ctx.fillStyle = previewColor;
  ctx.lineWidth = 2 / viewScale;
  ctx.setLineDash([8 / viewScale, 6 / viewScale]);
  ctx.beginPath();
  ctx.moveTo(solution.start.x, solution.start.y);
  ctx.lineTo(solution.end.x, solution.end.y);
  ctx.stroke();
  ctx.setLineDash([]);
  for (const point of [solution.start, solution.end]) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4 / viewScale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

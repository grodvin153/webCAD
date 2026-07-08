/* webCAD - Ghost de linea desde punto a tangente | SPDX-License-Identifier: GPL-3.0-or-later */

export function drawPointTangentLinePreview(ctx, options) {
  const {
    draft,
    hoveredEntity,
    cursorPoint,
    command,
    drawOperand,
    previewColor,
    viewScale,
  } = options;
  if (!draft?.startPoint) return;

  const preview = command.previewAt(hoveredEntity, cursorPoint);
  if (!preview?.solution) return;

  drawOperand(ctx, preview.operand.primitive);
  const { start, end } = preview.solution;
  ctx.save();
  ctx.strokeStyle = previewColor;
  ctx.fillStyle = previewColor;
  ctx.lineWidth = 2 / viewScale;
  ctx.setLineDash([8 / viewScale, 6 / viewScale]);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
  for (const point of [start, end]) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4 / viewScale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

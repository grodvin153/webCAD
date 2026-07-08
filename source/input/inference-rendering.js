/* webCAD - Representacion de inferencias ortogonales | SPDX-License-Identifier: GPL-3.0-or-later */

export function drawOrthogonalInference(ctx, {
  inference,
  viewScale,
  horizontalColor = '#e13f32',
  verticalColor = '#27a84a',
}) {
  if (!ctx || !inference?.origin || !inference.point) return;
  const scale = Math.max(viewScale || 1, 1e-9);
  const marker = 4.5 / scale;
  const color = inference.axis === 'vertical' ? verticalColor : horizontalColor;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = (inference.locked ? 2.2 : 1.5) / scale;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(inference.origin.x, inference.origin.y);
  ctx.lineTo(inference.point.x, inference.point.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.rect(
    inference.point.x - marker * 0.5,
    inference.point.y - marker * 0.5,
    marker,
    marker,
  );
  ctx.fill();
  ctx.restore();
}

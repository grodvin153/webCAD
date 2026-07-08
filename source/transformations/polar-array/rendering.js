/* webCAD - Ghost de matriz polar | SPDX-License-Identifier: GPL-3.0-or-later */

export function drawPolarArrayPreview(ctx, {
  entities,
  drawEntity,
  center,
  color,
  viewScale,
}) {
  if (!entities?.length || !center) return;
  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.setLineDash([8 / viewScale, 6 / viewScale]);
  entities.forEach((entity) => drawEntity(ctx, entity, color));
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(center.x, center.y, 4 / viewScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

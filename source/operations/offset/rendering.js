/* webCAD - Ghost de equidistancia | SPDX-License-Identifier: GPL-3.0-or-later */

export function drawOffsetPreview(ctx, { entity, drawEntity, previewColor, viewScale }) {
  if (!entity) return;
  ctx.save();
  ctx.globalAlpha = 0.82;
  ctx.setLineDash([8 / viewScale, 6 / viewScale]);
  drawEntity(ctx, entity, previewColor, 2);
  ctx.restore();
}

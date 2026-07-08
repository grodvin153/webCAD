/* webCAD - Render y ghost de XLINE | SPDX-License-Identifier: GPL-3.0-or-later */

import { clipXLineToBounds } from './geometry.js';

export function drawXLine(ctx, entity, options) {
  const segment = clipXLineToBounds(entity.basePoint, entity.direction, options.bounds);
  if (!segment) return;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = options.color;
  ctx.lineWidth = options.width / options.viewScale;
  ctx.lineCap = 'round';
  if (options.dash?.length) {
    ctx.setLineDash(options.dash.map((length) => length / options.viewScale));
  }
  ctx.moveTo(segment.start.x, segment.start.y);
  ctx.lineTo(segment.end.x, segment.end.y);
  ctx.stroke();
  ctx.restore();
}

export function drawXLinePreview(ctx, options) {
  const preview = options.command.preview(options.cursorPoint);
  if (!preview) return;
  drawXLine(ctx, preview, {
    bounds: options.bounds,
    color: options.color,
    width: 2,
    viewScale: options.viewScale,
    dash: [8, 6],
  });
}

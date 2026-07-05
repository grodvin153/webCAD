/* webCAD - Renderizado de imagenes raster | SPDX-License-Identifier: GPL-3.0-or-later */

const imageCache = new Map();

function cachedImage(source, requestDraw) {
  let image = imageCache.get(source);
  if (image) return image;
  image = new Image();
  image.addEventListener('load', requestDraw, { once: true });
  image.src = source;
  imageCache.set(source, image);
  return image;
}

export function drawRasterImage(ctx, entity, options = {}) {
  const image = cachedImage(entity.source, options.requestDraw || (() => {}));
  ctx.save();
  ctx.translate(entity.center.x, entity.center.y);
  ctx.rotate(entity.rotation * Math.PI / 180);
  ctx.scale(entity.flipX ? -1 : 1, entity.flipY ? -1 : 1);
  ctx.globalAlpha = options.alpha ?? entity.opacity;
  if (image.complete && image.naturalWidth) {
    ctx.drawImage(image, -entity.width * 0.5, -entity.height * 0.5, entity.width, entity.height);
  }
  if (options.outlineColor) {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = options.outlineColor;
    ctx.lineWidth = options.outlineWidth || 1;
    ctx.setLineDash(options.dash || []);
    ctx.strokeRect(-entity.width * 0.5, -entity.height * 0.5, entity.width, entity.height);
  }
  ctx.restore();
}

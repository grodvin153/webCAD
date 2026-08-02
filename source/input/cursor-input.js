/* webCAD - Presentación compartida de entrada dinámica | SPDX-License-Identifier: GPL-3.0-or-later */

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function hideCursorInput(element) {
  if (!element) return;
  element.classList.toggle('is-visible', false);
  element.setAttribute('aria-hidden', 'true');
}

export function updateCursorInput(element, {
  clientPoint = null,
  point = null,
  text = '',
  visible = true,
} = {}) {
  if (!element) return;
  const hasPoint = Number.isFinite(Number(point?.x)) &&
    Number.isFinite(Number(point?.y));
  const hasClientPoint = Number.isFinite(Number(clientPoint?.x)) &&
    Number.isFinite(Number(clientPoint?.y));
  const shown = visible === true && Boolean(text) && (hasPoint || hasClientPoint);
  element.classList.toggle('is-visible', shown);
  element.setAttribute('aria-hidden', String(!shown));
  if (!shown) return;

  element.textContent = text;
  const parentRect = element.parentElement.getBoundingClientRect();
  const inputRect = element.getBoundingClientRect();
  const anchor = hasClientPoint
    ? {
      x: Number(clientPoint.x) - parentRect.left,
      y: Number(clientPoint.y) - parentRect.top,
    }
    : { x: Number(point.x), y: Number(point.y) };
  const offset = 14;
  const x = clamp(
    anchor.x + offset,
    4,
    Math.max(4, parentRect.width - inputRect.width - 4),
  );
  const y = clamp(
    anchor.y + offset,
    4,
    Math.max(4, parentRect.height - inputRect.height - 4),
  );
  element.style.transform = `translate(${x}px, ${y}px)`;
}

/* webCAD - Edicion contextual de imagenes raster | SPDX-License-Identifier: GPL-3.0-or-later */

function clampOpacity(value) {
  return Math.min(1, Math.max(0.05, Number(value) || 1));
}

export function createImageEditor(options = {}) {
  const {
    root = document,
    recordHistory = () => {},
    markDirty = () => {},
    selectEntity = () => {},
    requestDraw = () => {},
    setStatus = () => {},
    focusCanvas = () => {},
    startSegmentAlignment = () => {},
  } = options;
  const dialog = root.getElementById('image-editor-dialog');
  const closeButton = root.getElementById('image-editor-close');
  const cancelButton = root.getElementById('image-editor-cancel');
  const saveButton = root.getElementById('image-editor-save');
  const alignButton = root.getElementById('image-editor-align');
  const nameLabel = root.getElementById('image-editor-name');
  const opacityInput = root.getElementById('image-editor-opacity');
  const opacityOutput = root.getElementById('image-editor-opacity-value');
  let activeEntity = null;

  function syncOpacityLabel() {
    if (opacityOutput) opacityOutput.value = `${Math.round(Number(opacityInput?.value) || 100)}%`;
  }

  function isOpen() {
    return Boolean(dialog && !dialog.hidden);
  }

  function close({ focus = true } = {}) {
    if (dialog) dialog.hidden = true;
    activeEntity = null;
    if (focus) focusCanvas();
  }

  function apply({ closeAfter = true, announce = true } = {}) {
    if (!activeEntity || activeEntity.type !== 'IMAGE') return false;
    const opacity = clampOpacity((Number(opacityInput?.value) || 100) / 100);
    const changed = Math.abs(opacity - activeEntity.opacity) > 1e-9;
    if (changed) {
      recordHistory();
      activeEntity.opacity = opacity;
      markDirty();
    }
    selectEntity(activeEntity);
    requestDraw();
    if (announce) setStatus(`Opacidad de imagen: ${Math.round(opacity * 100)}%`);
    if (closeAfter) close();
    return true;
  }

  function startAlignment() {
    const entity = activeEntity;
    if (!entity) return false;
    apply({ closeAfter: false, announce: false });
    close({ focus: false });
    startSegmentAlignment(entity);
    return true;
  }

  function open(entity) {
    if (!dialog || entity?.type !== 'IMAGE') return false;
    activeEntity = entity;
    if (nameLabel) nameLabel.textContent = entity.name || 'Imagen PNG';
    if (opacityInput) opacityInput.value = String(Math.round(clampOpacity(entity.opacity) * 100));
    syncOpacityLabel();
    dialog.hidden = false;
    selectEntity(entity);
    setStatus('Propiedades de imagen');
    requestDraw();
    requestAnimationFrame(() => opacityInput?.focus());
    return true;
  }

  opacityInput?.addEventListener('input', syncOpacityLabel);
  saveButton?.addEventListener('click', () => apply());
  alignButton?.addEventListener('click', startAlignment);
  cancelButton?.addEventListener('click', () => close());
  closeButton?.addEventListener('click', () => close());
  dialog?.addEventListener('pointerdown', (event) => {
    if (event.target === dialog) close();
  });
  dialog?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
    else if (event.key === 'Enter' && event.target !== alignButton) {
      event.preventDefault();
      apply();
    }
  });

  return { apply, close, isOpen, open, startAlignment };
}

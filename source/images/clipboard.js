/* webCAD - Pegado de imagenes desde el portapapeles | SPDX-License-Identifier: GPL-3.0-or-later */

const SUPPORTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

function normalizedType(value) {
  return String(value || '').trim().toLowerCase();
}

function isSupportedImage(file) {
  return Boolean(file && SUPPORTED_IMAGE_TYPES.has(normalizedType(file.type)));
}

function clipboardImageFile(clipboardData) {
  const items = Array.from(clipboardData?.items || []);
  for (const item of items) {
    if (item?.kind !== 'file' || !SUPPORTED_IMAGE_TYPES.has(normalizedType(item.type))) continue;
    const file = item.getAsFile?.();
    if (isSupportedImage(file)) return file;
  }
  return Array.from(clipboardData?.files || []).find(isSupportedImage) || null;
}

function isEditableNode(node) {
  if (!node || typeof node !== 'object') return false;
  if (node.isContentEditable === true) return true;
  const tagName = String(node.tagName || '').toLowerCase();
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') return true;
  const contentEditable = node.getAttribute?.('contenteditable');
  if (contentEditable !== null && contentEditable !== undefined && contentEditable !== 'false') {
    return true;
  }
  return ['searchbox', 'spinbutton', 'textbox'].includes(node.getAttribute?.('role'));
}

export function isEditablePasteTarget(event) {
  const path = typeof event?.composedPath === 'function' ? event.composedPath() : [];
  if (path.some(isEditableNode)) return true;
  let node = event?.target || null;
  while (node) {
    if (isEditableNode(node)) return true;
    node = node.parentElement || null;
  }
  return false;
}

function loadImage(source, ImageClass) {
  return new Promise((resolve, reject) => {
    const image = new ImageClass();
    image.addEventListener('load', () => resolve(image), { once: true });
    image.addEventListener('error', () => reject(new Error('Imagen de portapapeles no valida')), {
      once: true,
    });
    image.src = source;
  });
}

function canvasPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('No se pudo normalizar la imagen del portapapeles'));
    }, 'image/png');
  });
}

function pngFile(blob, FileClass) {
  return new FileClass([blob], 'Imagen pegada.png', {
    lastModified: Date.now(),
    type: 'image/png',
  });
}

export async function normalizeClipboardImageToPng(blob, environment = {}) {
  if (!isSupportedImage(blob)) throw new Error('Imagen de portapapeles no compatible');
  const FileClass = environment.FileClass || globalThis.File;
  if (typeof FileClass !== 'function') throw new Error('El navegador no permite crear el archivo PNG');
  if (normalizedType(blob.type) === 'image/png') return pngFile(blob, FileClass);

  const documentRoot = environment.documentRoot || globalThis.document;
  const ImageClass = environment.ImageClass || globalThis.Image;
  const urlApi = environment.urlApi || globalThis.URL;
  if (!documentRoot?.createElement || typeof ImageClass !== 'function' ||
      typeof urlApi?.createObjectURL !== 'function') {
    throw new Error('El navegador no permite convertir la imagen a PNG');
  }

  const objectUrl = urlApi.createObjectURL(blob);
  let image = null;
  try {
    image = await loadImage(objectUrl, ImageClass);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    if (!width || !height) throw new Error('Imagen de portapapeles no valida');
    const canvas = documentRoot.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('No se pudo convertir la imagen del portapapeles');
    context.drawImage(image, 0, 0, width, height);
    return pngFile(await canvasPngBlob(canvas), FileClass);
  }
  finally {
    if (image) image.src = '';
    urlApi.revokeObjectURL?.(objectUrl);
  }
}

export function createClipboardImagePasteHandler({
  importPngFile,
  is3dActive = () => false,
  normalizeImage = normalizeClipboardImageToPng,
}) {
  return async function handleClipboardImagePaste(event) {
    if (is3dActive() || isEditablePasteTarget(event)) return false;
    const image = clipboardImageFile(event?.clipboardData);
    if (!image) return false;
    event.preventDefault?.();
    try {
      const png = await normalizeImage(image);
      if (is3dActive()) return false;
      return await importPngFile(png, { reportError: false }) !== false;
    }
    catch {
      return false;
    }
  };
}

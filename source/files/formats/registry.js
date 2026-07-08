/* webCAD - Registro extensible de formatos CAD | SPDX-License-Identifier: GPL-3.0-or-later */

export function createCadFormatRegistry() {
  const formats = new Map();

  function register(format) {
    if (!format?.id || typeof format.serialize !== 'function') {
      throw new TypeError('El formato necesita id y serializador');
    }
    const extension = String(format.extension || '').toLowerCase();
    if (!extension.startsWith('.')) {
      throw new TypeError('La extension del formato debe comenzar por punto');
    }
    formats.set(format.id, {
      label: format.id.toUpperCase(),
      mimeType: 'application/octet-stream',
      ...format,
      extension,
    });
    return formats.get(format.id);
  }

  function get(formatId) {
    return formats.get(formatId) || null;
  }

  function pickerTypes(formatId) {
    const format = get(formatId);
    if (!format) return [];
    return [{
      description: `${format.label} (${format.extension})`,
      accept: { [format.mimeType]: [format.extension] },
    }];
  }

  function ensureExtension(fileName, formatId) {
    const format = get(formatId);
    if (!format) return fileName;
    const name = String(fileName || `dibujo${format.extension}`);
    return name.toLowerCase().endsWith(format.extension) ? name : `${name}${format.extension}`;
  }

  return { ensureExtension, get, pickerTypes, register };
}

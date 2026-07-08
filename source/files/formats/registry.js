/* webCAD - Registro extensible de formatos CAD | SPDX-License-Identifier: GPL-3.0-or-later */

export function createCadFormatRegistry() {
  const formats = new Map();

  function register(format) {
    const canParse = typeof format?.parse === 'function';
    const canSerialize = typeof format?.serialize === 'function';
    if (!format?.id || (!canParse && !canSerialize)) {
      throw new TypeError('El formato necesita id y al menos un lector o serializador');
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

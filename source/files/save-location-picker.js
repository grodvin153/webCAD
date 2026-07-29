/* webCAD - Selector modular de destino para guardar archivos | SPDX-License-Identifier: GPL-3.0-or-later */

function fallbackPromptMessage(format, { directorySelected = false } = {}) {
  return [
    `Nombre del archivo ${format?.label || ''}:`,
    '',
    directorySelected
      ? 'El archivo se guardara en la carpeta ya seleccionada.'
      : 'El navegador descargara una copia con este nombre.',
    directorySelected
      ? ''
      : 'La carpeta de destino depende de sus preferencias de descargas.',
  ].join('\n');
}

function contentBlob(content, format) {
  return content instanceof Blob
    ? content
    : new Blob([content], { type: format.mimeType });
}

function downloadFile(content, format, fileName, {
  documentObject = globalThis.document,
  urlObject = globalThis.URL,
} = {}) {
  const url = urlObject.createObjectURL(contentBlob(content, format));
  const link = documentObject.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  urlObject.revokeObjectURL(url);
}

export function createSaveLocationPicker({
  registry,
  browserWindow = globalThis.window,
  requestFileName = null,
  onUnsupported,
  download = downloadFile,
} = {}) {
  function supportsFilePicker() {
    return typeof browserWindow?.showSaveFilePicker === 'function';
  }

  function supportsDirectoryPicker() {
    return typeof browserWindow?.showDirectoryPicker === 'function';
  }

  function supportsLocationSelection() {
    return supportsFilePicker() || supportsDirectoryPicker();
  }

  async function requestName(format, proposedName, options = {}) {
    const requestedName = typeof requestFileName === 'function'
      ? await requestFileName({ format, proposedName, ...options })
      : browserWindow?.prompt?.(
        fallbackPromptMessage(format, options),
        proposedName,
      );
    if (requestedName === null || requestedName === undefined) return null;
    const cleanName = String(requestedName).trim() || proposedName;
    return registry.ensureExtension(cleanName, format.id);
  }

  async function select({
    forceDownload = false,
    formatId,
    suggestedName,
  } = {}) {
    const format = registry.get(formatId);
    if (!format) throw new TypeError(`Formato no disponible: ${formatId}`);
    const proposedName = registry.ensureExtension(suggestedName, formatId);

    if (!forceDownload && supportsFilePicker()) {
      const handle = await browserWindow.showSaveFilePicker({
        suggestedName: proposedName,
        types: registry.pickerTypes(formatId),
        excludeAcceptAllOption: false,
      });
      return {
        handle,
        kind: 'file-system',
        name: handle.name || proposedName,
      };
    }

    if (!forceDownload && supportsDirectoryPicker()) {
      const directory = await browserWindow.showDirectoryPicker({
        id: 'webcad-save-location',
        mode: 'readwrite',
      });
      const name = await requestName(format, proposedName, {
        directorySelected: true,
      });
      if (!name) return null;
      const handle = await directory.getFileHandle(name, { create: true });
      return {
        directory,
        handle,
        kind: 'file-system',
        name: handle.name || name,
      };
    }

    const name = await requestName(format, proposedName);
    if (!name) return null;
    if (!forceDownload) onUnsupported?.();
    return {
      kind: 'download',
      name,
    };
  }

  async function write(destination, content, format) {
    if (destination?.kind === 'file-system') {
      const writable = await destination.handle.createWritable();
      await writable.write(contentBlob(content, format));
      await writable.close();
      return true;
    }
    if (destination?.kind === 'download') {
      await download(content, format, destination.name);
      return true;
    }
    return false;
  }

  return {
    select,
    supportsLocationSelection,
    write,
  };
}

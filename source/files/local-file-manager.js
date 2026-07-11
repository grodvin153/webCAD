/* webCAD - Guardado local mediante File System Access API | SPDX-License-Identifier: GPL-3.0-or-later */

function downloadFallback(content, format, fileName) {
  const blob = content instanceof Blob
    ? content
    : new Blob([content], { type: format.mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function fallbackPromptMessage(format) {
  return [
    `Nombre del archivo ${format?.label || ''}:`,
    '',
    'Safari y Firefox descargaran una copia con este nombre.',
    'La carpeta de destino depende de las preferencias de descargas del navegador.',
  ].join('\n');
}

export function createLocalFileManager({
  registry,
  defaultFormatId,
  getRevision = () => 0,
  onStatus,
  onError,
  onUnsupported,
}) {
  let currentHandle = null;
  let currentFormatId = defaultFormatId;
  let suggestedName = registry.ensureExtension('dibujo', defaultFormatId);
  let savedRevision = getRevision();
  let activeSave = null;

  function nativeSaveSupported() {
    return typeof window.showSaveFilePicker === 'function';
  }

  function clearCurrentFile() {
    currentHandle = null;
    currentFormatId = defaultFormatId;
    suggestedName = registry.ensureExtension('dibujo', defaultFormatId);
    savedRevision = getRevision();
  }

  function setSuggestedName(fileName, formatId = currentFormatId) {
    if (!registry.get(formatId)) return false;
    currentFormatId = formatId;
    suggestedName = registry.ensureExtension(fileName, formatId);
    savedRevision = getRevision();
    return true;
  }

  function suggestedNameForFormat(formatId) {
    const targetFormat = registry.get(formatId);
    const currentFormat = registry.get(currentFormatId);
    let name = String(suggestedName || `dibujo${targetFormat?.extension || ''}`);
    if (currentFormat?.extension && name.toLowerCase().endsWith(currentFormat.extension)) {
      name = name.slice(0, -currentFormat.extension.length);
    }
    return registry.ensureExtension(name, formatId);
  }

  function chooseFallbackFileName(formatId) {
    const format = registry.get(formatId);
    const proposedName = suggestedNameForFormat(formatId);
    const requestedName = window.prompt(fallbackPromptMessage(format), proposedName);
    if (requestedName === null) return null;
    const cleanName = String(requestedName).trim() || proposedName;
    return registry.ensureExtension(cleanName, formatId);
  }

  async function chooseHandle(formatId) {
    const format = registry.get(formatId);
    return window.showSaveFilePicker({
      suggestedName: suggestedNameForFormat(formatId),
      types: registry.pickerTypes(formatId),
      excludeAcceptAllOption: false,
    }).then((handle) => ({ handle, format }));
  }

  async function performSave(options = {}) {
    const formatId = options.formatId || currentFormatId || defaultFormatId;
    const format = registry.get(formatId);
    if (!format) {
      onError?.(`Formato no disponible: ${formatId}`);
      return false;
    }

    try {
      if (options.automatic && !currentHandle) return false;

      if (!nativeSaveSupported()) {
        const fileName = chooseFallbackFileName(formatId);
        if (!fileName) {
          onStatus?.('Guardado cancelado');
          return false;
        }
        onUnsupported?.();
        const content = await format.serialize();
        downloadFallback(content, format, fileName);
        suggestedName = fileName;
        currentFormatId = formatId;
        onStatus?.(`${fileName} exportado; este navegador no permite escritura directa`);
        return true;
      }

      if (!currentHandle || options.saveAs || formatId !== currentFormatId) {
        const selection = await chooseHandle(formatId);
        currentHandle = selection.handle;
        currentFormatId = formatId;
      }
      if (!options.automatic) onStatus?.(`Guardando ${currentHandle.name || suggestedName}...`);
      const content = await format.serialize();
      const writable = await currentHandle.createWritable();
      await writable.write(content instanceof Blob
        ? content
        : new Blob([content], { type: format.mimeType }));
      await writable.close();
      suggestedName = currentHandle.name || suggestedName;
      savedRevision = getRevision();
      onStatus?.(`${options.automatic ? 'Autoguardado' : 'Guardado'}: ${suggestedName}`);
      return true;
    }
    catch (error) {
      if (error?.name === 'AbortError') {
        onStatus?.('Guardado cancelado');
        return false;
      }
      console.error('No se pudo guardar el archivo local', error);
      onError?.(`No se pudo guardar ${suggestedName}`);
      return false;
    }
  }

  function save(options = {}) {
    if (activeSave) return activeSave;
    activeSave = performSave(options).finally(() => {
      activeSave = null;
    });
    return activeSave;
  }

  return {
    clearCurrentFile,
    currentFileName: () => currentHandle?.name || suggestedName,
    hasCurrentFile: () => Boolean(currentHandle),
    nativeSaveSupported,
    needsSave: () => getRevision() !== savedRevision,
    save: () => save(),
    saveAutomatic: () => save({ automatic: true }),
    saveAs: (formatId = currentFormatId) => save({ saveAs: true, formatId }),
    setSuggestedName,
  };
}

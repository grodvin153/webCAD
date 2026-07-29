/* webCAD - Guardado local mediante File System Access API | SPDX-License-Identifier: GPL-3.0-or-later */

import { createSaveLocationPicker } from './save-location-picker.js';

export function createLocalFileManager({
  registry,
  defaultFormatId,
  getRevision = () => 0,
  onStatus,
  onError,
  onUnsupported,
  requestFileName = null,
  saveLocationPicker = null,
}) {
  const locationPicker = saveLocationPicker ?? createSaveLocationPicker({
    registry,
    requestFileName,
    onUnsupported,
  });
  let currentHandle = null;
  let currentFormatId = defaultFormatId;
  let suggestedName = registry.ensureExtension('dibujo', defaultFormatId);
  let savedRevision = getRevision();
  let activeSave = null;

  function nativeSaveSupported() {
    return locationPicker.supportsLocationSelection();
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

  async function performSave(options = {}) {
    const formatId = options.formatId || currentFormatId || defaultFormatId;
    const format = registry.get(formatId);
    if (!format) {
      onError?.(`Formato no disponible: ${formatId}`);
      return false;
    }

    try {
      if (options.automatic && !currentHandle) return false;
      if (!options.automatic &&
          (!currentHandle || options.saveAs || formatId !== currentFormatId)) {
        onStatus?.(`Seleccione nombre y carpeta para ${format.label} · ` +
          `${options.download === true || !nativeSaveSupported()
            ? 'descarga del navegador'
            : 'selector del sistema'}`);
      }

      if (!currentHandle || options.saveAs || formatId !== currentFormatId) {
        const destination = await locationPicker.select({
          forceDownload: options.download === true,
          formatId,
          suggestedName: suggestedNameForFormat(formatId),
        });
        if (!destination) {
          onStatus?.('Guardado cancelado');
          return false;
        }
        if (destination.kind === 'download') {
          const content = await format.serialize();
          await locationPicker.write(destination, content, format);
          suggestedName = destination.name;
          currentFormatId = formatId;
          onStatus?.(options.download === true
            ? `${destination.name} guardado como descarga`
            : `${destination.name} exportado; este navegador no permite elegir carpeta`);
          return true;
        }
        currentHandle = destination.handle;
        suggestedName = destination.name || suggestedName;
        currentFormatId = formatId;
      }
      if (!options.automatic) onStatus?.(`Guardando ${currentHandle.name || suggestedName}...`);
      const content = await format.serialize();
      await locationPicker.write({
        handle: currentHandle,
        kind: 'file-system',
        name: currentHandle.name || suggestedName,
      }, content, format);
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
    saveAs: (formatId = currentFormatId, options = {}) =>
      save({ ...options, saveAs: true, formatId }),
    setSuggestedName,
  };
}

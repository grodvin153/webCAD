/* webCAD - Importacion de imagenes PNG | SPDX-License-Identifier: GPL-3.0-or-later */

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () => reject(reader.error || new Error('No se pudo leer la imagen')));
    reader.readAsDataURL(file);
  });
}

function readImageSize(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve({ width: image.naturalWidth, height: image.naturalHeight }));
    image.addEventListener('error', () => reject(new Error('El archivo PNG no es valido')));
    image.src = source;
  });
}

export function createPngImporter({ input, onLoad, onError }) {
  async function handleFile(file) {
    if (!file || (file.type && file.type !== 'image/png') || !/\.png$/i.test(file.name)) {
      throw new Error('Seleccione un archivo PNG');
    }
    const source = await readFileAsDataUrl(file);
    const size = await readImageSize(source);
    if (!size.width || !size.height) {
      throw new Error('No se pudo obtener el tamano de la imagen');
    }
    return { source, name: file.name, pixelWidth: size.width, pixelHeight: size.height };
  }

  async function importFile(file, { reportError = true } = {}) {
    try {
      onLoad(await handleFile(file));
      return true;
    }
    catch (error) {
      if (reportError) onError(error);
      return false;
    }
  }

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    await importFile(file);
    input.value = '';
  });

  return {
    importFile,
    importPng() {
      input.value = '';
      input.click();
      return true;
    },
  };
}

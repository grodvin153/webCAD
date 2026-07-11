/* webCAD - Avisos de compatibilidad del guardado local | SPDX-License-Identifier: GPL-3.0-or-later */

export function createUnsupportedLocalSaveNotifier({ onStatus } = {}) {
  return () => {
    const message = 'Este navegador no permite elegir carpeta ni sobrescribir un archivo local desde webCAD. Se descargara una copia con el nombre indicado.';
    onStatus?.(message);
  };
}

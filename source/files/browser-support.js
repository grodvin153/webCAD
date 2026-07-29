/* webCAD - Avisos de compatibilidad del guardado local | SPDX-License-Identifier: GPL-3.0-or-later */

export function createUnsupportedLocalSaveNotifier({ onStatus } = {}) {
  return () => {
    const message = 'Este navegador no ofrece un selector de carpeta a webCAD. Se descargara una copia; use Chrome o Edge para elegir la ubicacion desde la aplicacion.';
    onStatus?.(message);
  };
}

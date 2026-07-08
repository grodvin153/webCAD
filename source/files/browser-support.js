/* webCAD - Avisos de compatibilidad del guardado local | SPDX-License-Identifier: GPL-3.0-or-later */

export function createUnsupportedLocalSaveNotifier({ onStatus } = {}) {
  let notified = false;

  return () => {
    const message = 'Este navegador no permite elegir y sobrescribir un archivo local. Se descargara una copia; para guardado directo y autoguardado local use un navegador compatible.';
    onStatus?.(message);
    if (notified) return;
    notified = true;
    window.alert(message);
  };
}

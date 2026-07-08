/* webCAD - Programador ligero de autoguardado | SPDX-License-Identifier: GPL-3.0-or-later */

export function createAutosaveController({ fileManager, isIdle, intervalMs = 30000 }) {
  let intervalId = null;
  let idleId = null;
  let timeoutId = null;

  function clearPendingIdleWork() {
    if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
      window.cancelIdleCallback(idleId);
    }
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    idleId = null;
    timeoutId = null;
  }

  function runIfPossible() {
    clearPendingIdleWork();
    if (
      document.visibilityState !== 'visible' ||
      !fileManager.hasCurrentFile() ||
      !fileManager.needsSave() ||
      !isIdle()
    ) return;
    void fileManager.saveAutomatic();
  }

  function schedule() {
    if (!fileManager.hasCurrentFile() || !fileManager.needsSave()) return;
    clearPendingIdleWork();
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(runIfPossible, { timeout: 2500 });
    }
    else {
      timeoutId = window.setTimeout(runIfPossible, 350);
    }
  }

  function start() {
    if (intervalId !== null) return;
    intervalId = window.setInterval(schedule, intervalMs);
  }

  function stop() {
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = null;
    clearPendingIdleWork();
  }

  return { schedule, start, stop };
}

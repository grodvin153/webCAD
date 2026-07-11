/* webCAD - Atajos de teclado | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerShortcutMethods(dependencies) {
  const {
    formatSnapType,
    runCommand,
    statusMessage,
  } = dependencies;

  class ControllerShortcutMethods {
  updateMirrorStatusGuidance() {
    const draft = this.state.mirrorDraft;
    if (this.state.tool !== 'mirror' || !draft || draft.selecting) return;
    const snapLabel = this.state.activeObjectSnap
      ? ` · OSNAP ${formatSnapType(this.state.activeObjectSnap.type)}`
      : ' · OSNAP disponible';
    this.state.statusText = draft.firstPoint
      ? `Simetria: indique segundo punto del eje${snapLabel} · clic para confirmar`
      : `Simetria: indique primer punto del eje${snapLabel}`;
  }

  clearShortcutPrefix() {
    if (this.shortcutTimer) {
      clearTimeout(this.shortcutTimer);
    }
    this.shortcutPrefix = null;
    this.shortcutTimer = null;
    this.lastTextPointerDown = null;
    this.lastHatchPointerDown = null;
    this.lastBlockPointerDown = null;
    this.lastImagePointerDown = null;
  }

  armShortcutPrefix(prefix, onTimeout = null) {
    if (this.shortcutTimer) {
      clearTimeout(this.shortcutTimer);
    }
    this.shortcutPrefix = prefix;
    this.shortcutTimer = setTimeout(() => {
      if (this.shortcutPrefix === prefix) {
        this.clearShortcutPrefix();
        if (onTimeout) onTimeout();
      }
    }, 420);
  }

  cancelKeyboardRefresh() {
    if (this.keyboardRefreshFrame !== null) {
      cancelAnimationFrame(this.keyboardRefreshFrame);
      this.keyboardRefreshFrame = null;
    }
  }

  scheduleKeyboardRefresh() {
    this.updateCursorInput();
    statusMessage.textContent = this.state.statusText || 'Listo';
    statusMessage.title = this.state.statusText || 'Listo';
    if (this.keyboardRefreshFrame !== null) {
      return;
    }
    this.keyboardRefreshFrame = requestAnimationFrame(() => {
      this.keyboardRefreshFrame = null;
      this.renderer.draw();
    });
  }

  handleShortcutSequence(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }

    const key = event.key.toLowerCase();
    if (this.shortcutPrefix === 'p') {
      this.clearShortcutPrefix();
      if (key === 'l') {
        event.preventDefault();
        runCommand('polyline');
        return true;
      }
      if (key === 'j') {
        event.preventDefault();
        runCommand('polyline-join');
        return true;
      }
      if (key === 'g') {
        event.preventDefault();
        runCommand('regular-polygon');
        return true;
      }
      return false;
    }
    if (this.shortcutPrefix === 'x') {
      this.clearShortcutPrefix();
      if (key === 'l') {
        event.preventDefault();
        runCommand('xline');
        return true;
      }
      return false;
    }
    if (this.shortcutPrefix === 'e') {
      this.clearShortcutPrefix();
      if (key === 's') {
        event.preventDefault();
        runCommand('scale');
        return true;
      }
      if (key === 'l') {
        event.preventDefault();
        runCommand('ellipse');
        return true;
      }
      return false;
    }
    if (this.shortcutPrefix === 'm') {
      this.clearShortcutPrefix();
      if (key === 'p') {
        event.preventDefault();
        runCommand('polar-array');
        return true;
      }
      return false;
    }
    if (this.shortcutPrefix === 'd') {
      this.clearShortcutPrefix();
      if (key === 's') {
        event.preventDefault();
        runCommand('select-set');
        return true;
      }
      return false;
    }

    if (this.shortcutPrefix === 'c') {
      this.clearShortcutPrefix();
      if (key === 'i') {
        event.preventDefault();
        runCommand('circle-center');
        return true;
      }
      return false;
    }

    if (this.shortcutPrefix === 'r') {
      this.clearShortcutPrefix();
      if (key === 'c') {
        event.preventDefault();
        runCommand('rectangle');
        return true;
      }
      return false;
    }

    if (key === 'r') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('trim');
      this.armShortcutPrefix('r');
      return true;
    }

    if (key === 'c') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('copy');
      this.armShortcutPrefix('c');
      return true;
    }

    if (key === 'd') {
      event.preventDefault();
      this.clearShortcutPrefix();
      runCommand('move');
      this.armShortcutPrefix('d');
      return true;
    }

    if (key === 'e' && this.state.tool === 'select') {
      event.preventDefault();
      this.clearShortcutPrefix();
      this.armShortcutPrefix('e', () => runCommand('stretch'));
      this.state.statusText = 'E: Estirar · ES Escala · EL Elipse';
      this.updateUiStatus();
      return true;
    }

    if (key === 'm' && this.state.tool === 'select') {
      event.preventDefault();
      this.clearShortcutPrefix();
      this.armShortcutPrefix('m');
      this.state.statusText = 'Atajo MP: pulse P para Matriz polar';
      this.updateUiStatus();
      return true;
    }

    if (key === 'x' && this.state.tool === 'select') {
      event.preventDefault();
      this.clearShortcutPrefix();
      this.armShortcutPrefix('x', () => runCommand('explode'));
      this.state.statusText = 'Atajo XL: pulse L para XLINE · X para descomponer';
      this.updateUiStatus();
      return true;
    }

    return false;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerShortcutMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerShortcutMethods.prototype[name]]),
  );
}

/* webCAD - Navegacion con raton y trackpad | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerNavigationMethods(dependencies) {
  const {
    SNAP_THRESHOLD,
    VIEW_SCALE_FACTOR,
    clamp,
  } = dependencies;

  class ControllerNavigationMethods {
  getMouseScreenPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  updateMouse(event) {
    this.state.mouseScreen = this.getMouseScreenPosition(event);
    this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    return this.state.mouseWorld;
  }

  normalizeWheelDelta(event) {
    const lineMode = typeof WheelEvent === 'undefined' ? 1 : WheelEvent.DOM_DELTA_LINE;
    const pageMode = typeof WheelEvent === 'undefined' ? 2 : WheelEvent.DOM_DELTA_PAGE;
    if (event.deltaMode === lineMode) {
      return { x: event.deltaX * 16, y: event.deltaY * 16 };
    }
    if (event.deltaMode === pageMode) {
      return {
        x: event.deltaX * this.renderer.viewportWidth(),
        y: event.deltaY * this.renderer.viewportHeight(),
      };
    }
    return { x: event.deltaX, y: event.deltaY };
  }

  cancelMouseWheelZoom() {
    return false;
  }

  queueMouseWheelZoom(zoomDelta) {
    if (!Number.isFinite(zoomDelta) || Math.abs(zoomDelta) <= SNAP_THRESHOLD) {
      return false;
    }
    const boundedDelta = clamp(zoomDelta, -100, 100);
    const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -boundedDelta / 100);
    return this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
  }

  onWheel(event) {
    event.preventDefault();
    this.updateMouse(event);
    const delta = this.normalizeWheelDelta(event);
    const shiftZoom = event.shiftKey || this.state.shiftKeyDown;
    if (this.state.navigationDevice === 'mouse') {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        this.state.statusText = 'Zoom con rueda de raton';
        this.updateUiStatus();
        this.queueMouseWheelZoom(zoomDelta);
      }
      return;
    }

    if (shiftZoom) {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        this.cancelMouseWheelZoom();
        this.state.statusText = 'Zoom con Shift + dos dedos';
        this.updateUiStatus();
        const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -zoomDelta / 100);
        this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
      }
      return;
    }

    this.cancelMouseWheelZoom();
    this.state.viewOffset = {
      x: this.state.viewOffset.x + delta.x / this.state.viewScale,
      y: this.state.viewOffset.y + delta.y / this.state.viewScale,
    };
    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    }
    this.state.statusText = 'Pan con dos dedos';
    this.updateUiStatus();
    this.renderer.draw();
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerNavigationMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerNavigationMethods.prototype[name]]),
  );
}

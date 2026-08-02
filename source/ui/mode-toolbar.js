/* webCAD - Barra de herramientas dependiente del modo | SPDX-License-Identifier: GPL-3.0-or-later */

export const TOOLBAR_MODE_2D = '2d';
export const TOOLBAR_MODE_3D = '3d';
export const TOOLBAR_MODE_SKETCH = 'sketch';

const GLOBAL_COMMANDS = new Set([
  'about',
  'drawing-profile',
  'fit',
  'navigation-mouse',
  'navigation-trackpad',
  'new',
  'open-webcad',
  'redo',
  'save',
  'save-as',
  'save-webcad',
  'settings',
  'toggle-axes',
  'toggle-grid',
  'undo',
]);

const THREE_COMMANDS = new Set([
  'export-stl',
  'rebuild-model3d',
  'three-projection-orthographic',
  'three-projection-perspective',
]);

export function normalizeToolbarMode(mode) {
  if (mode === TOOLBAR_MODE_3D || mode === TOOLBAR_MODE_SKETCH) return mode;
  return TOOLBAR_MODE_2D;
}

export function commandToolbarMode(command) {
  if (GLOBAL_COMMANDS.has(command)) return 'global';
  if (THREE_COMMANDS.has(command)) return TOOLBAR_MODE_3D;
  return TOOLBAR_MODE_2D;
}

export function isCommandAvailableInMode(command, mode) {
  const commandMode = commandToolbarMode(command);
  const activeMode = normalizeToolbarMode(mode);
  if (commandMode === 'global') return true;
  if (activeMode === TOOLBAR_MODE_SKETCH) return commandMode === TOOLBAR_MODE_2D;
  return commandMode === activeMode;
}

export function isToolbarScopeVisible(scope, mode) {
  const activeMode = normalizeToolbarMode(mode);
  return String(scope ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .includes(activeMode);
}

export function applyToolbarMode(root, mode) {
  const activeMode = normalizeToolbarMode(mode);
  root?.querySelectorAll?.('[data-tool-mode]').forEach((element) => {
    element.hidden = !isToolbarScopeVisible(element.dataset.toolMode, activeMode);
  });
  root?.querySelectorAll?.('.tool-group.is-open').forEach((group) => {
    group.classList.remove('is-open');
    group.querySelector?.('.tool-menu-button')
      ?.setAttribute?.('aria-expanded', 'false');
  });
  const documentElement = root?.documentElement ?? root;
  if (documentElement?.dataset) documentElement.dataset.webcadMode = activeMode;
  return activeMode;
}

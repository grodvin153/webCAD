/* webCAD - Altura visual estable entre navegadores | SPDX-License-Identifier: GPL-3.0-or-later */

export function installViewportHeight(root = document.documentElement) {
  const viewport = window.visualViewport;
  const update = () => {
    const height = viewport?.height || window.innerHeight;
    root.style.setProperty('--app-height', `${Math.round(height)}px`);
  };
  update();
  window.addEventListener('resize', update);
  viewport?.addEventListener('resize', update);
  viewport?.addEventListener('scroll', update);
  return () => {
    window.removeEventListener('resize', update);
    viewport?.removeEventListener('resize', update);
    viewport?.removeEventListener('scroll', update);
  };
}

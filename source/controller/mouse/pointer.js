/* webCAD - Composicion de eventos de puntero | SPDX-License-Identifier: GPL-3.0-or-later */

import { createControllerPointerDownMethods } from './pointer-down.js';
import { createControllerPointerMotionMethods } from './pointer-motion.js';

export function createControllerPointerMethods(dependencies) {
  return {
    ...createControllerPointerDownMethods(dependencies),
    ...createControllerPointerMotionMethods(dependencies),
  };
}

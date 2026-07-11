/* webCAD - Serializacion del modelo 3D documental | SPDX-License-Identifier: GPL-3.0-or-later */

import { cloneModel3d, createModel3d, MODEL3D_VERSION } from './model3d.js';

export function serializeModel3d(model) {
  const serialized = cloneModel3d(model);
  if (serialized.version !== MODEL3D_VERSION) {
    throw new Error(`Version de modelo 3D no soportada: ${serialized.version}`);
  }
  JSON.stringify(serialized);
  return serialized;
}

export function parseSerializedModel3d(model) {
  if (model === undefined || model === null) {
    return createModel3d();
  }
  if (!model || typeof model !== 'object' || Array.isArray(model)) {
    throw new Error('El modelo 3D del proyecto no es valido');
  }
  if (Number(model.version) !== MODEL3D_VERSION) {
    throw new Error(`Version de modelo 3D no soportada: ${model.version ?? 'desconocida'}`);
  }
  if (!Array.isArray(model.solids)) {
    throw new Error('El modelo 3D del proyecto no contiene una lista de solidos');
  }
  const parsed = cloneModel3d(model);
  JSON.stringify(parsed);
  return parsed;
}

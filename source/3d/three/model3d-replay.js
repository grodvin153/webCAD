/* webCAD - Replay parametrico del modelo 3D compacto | SPDX-License-Identifier: GPL-3.0-or-later */

import { MODEL3D_VERSION } from '../model3d.js';
import { auditSolidCadTopology } from './manifold-boolean.js';
import { rebuildSolidFromAuthority } from './push-geometry.js';

function operationLog(record) {
  const authority = record.authority;
  const base = authority.base;
  return [{
    type: 'pushFromProfile',
    distance: base.distance,
    sourceKey: base.metadata?.sourceKey ?? null,
  }, ...(authority.operations ?? []).map((operation) => {
    if (['cutSolidByPlane', 'subtractSolid', 'unionSolid'].includes(operation.type)) {
      return { ...operation };
    }
    return {
      ...operation,
      type: operation.exactProfile
        ? operation.type === 'union' ? 'pushUnionProfile' : 'pushSubtractProfile'
        : 'pushMoveFace',
    };
  })];
}

export function hydrateCompactModel3d(model, options = {}) {
  if (Number(model?.version) !== MODEL3D_VERSION) return model;
  const pending = (model.solids ?? []).filter((record) => !record?.solid);
  if (!pending.length) return model;
  const rebuilt = pending.map((record) => {
    const solid = rebuildSolidFromAuthority({
      ...record.authority,
      sourceSolidDocumentId: record.id,
    }, options);
    const audit = solid ? auditSolidCadTopology(solid) : null;
    if (!solid || !audit?.valid) {
      throw new Error(
        `No se pudo reconstruir ${record.name || record.id}: ` +
        `${audit?.errors?.join(', ') || 'replay parametrico incompleto'}`,
      );
    }
    return { record, solid };
  });
  rebuilt.forEach(({ record, solid }) => {
    const operations = operationLog(record);
    solid.metadata = {
      ...solid.metadata,
      sourceSolidDocumentId: record.id,
    };
    record.solid = solid;
    record.metadata = solid.metadata;
    record.exactGeometry = solid.metadata.exactGeometry ?? null;
    record.operations = operations;
    record.operation = record.provenance ?? operations.at(-1) ?? null;
  });
  return model;
}

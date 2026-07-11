/* webCAD - Modelo documental 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

export const MODEL3D_VERSION = 1;

const SKIPPED_METADATA_KEYS = new Set([
  'sourceEntity',
  'sourceSolid',
  'sourceSolidGroup',
  'sourceSolidObject',
]);

function cloneJsonValue(value, seen = new WeakSet()) {
  if (value === null || value === undefined) return value ?? null;
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }
  if (typeof value !== 'object') return undefined;
  if (seen.has(value)) return undefined;
  seen.add(value);
  if (Array.isArray(value)) {
    const clone = value
      .map((item) => cloneJsonValue(item, seen))
      .filter((item) => item !== undefined);
    seen.delete(value);
    return clone;
  }
  const clone = {};
  Object.entries(value).forEach(([key, item]) => {
    if (SKIPPED_METADATA_KEYS.has(key)) return;
    const cloned = cloneJsonValue(item, seen);
    if (cloned !== undefined) clone[key] = cloned;
  });
  seen.delete(value);
  return clone;
}

function cloneNumberPoint(point) {
  return {
    x: Number(point?.x),
    y: Number(point?.y),
    z: point?.z === undefined ? 0 : Number(point.z),
  };
}

function cloneSolidForDocument(solid) {
  return {
    vertices: Array.isArray(solid?.vertices) ? solid.vertices.map(cloneNumberPoint) : [],
    faces: Array.isArray(solid?.faces) ? solid.faces.map((face) => [...face]) : [],
    edges: Array.isArray(solid?.edges) ? solid.edges.map((edge) => [...edge]) : [],
    metadata: cloneJsonValue(solid?.metadata ?? {}),
  };
}

function nextSolidNumber(model) {
  const explicitNext = Number(model?.nextSolidId);
  if (Number.isInteger(explicitNext) && explicitNext > 0) return explicitNext;
  const maxExisting = (Array.isArray(model?.solids) ? model.solids : [])
    .map((solid) => Number(String(solid?.id ?? '').replace(/^solid3d-/, '')))
    .filter((value) => Number.isInteger(value) && value > 0)
    .reduce((max, value) => Math.max(max, value), 0);
  return maxExisting + 1;
}

function inferOperationFromSolid(solid) {
  const metadata = solid?.metadata && typeof solid.metadata === 'object' ? solid.metadata : {};
  return {
    type: metadata.lastPushFaceIndex === undefined || metadata.lastPushFaceIndex === null
      ? 'pushFromProfile'
      : 'pushMoveFace',
    distance: metadata.lastPushDistance ?? metadata.distance ?? metadata.height ?? null,
    sourceKey: metadata.sourceKey ?? null,
    sourceEntityId: metadata.sourceEntityId ?? null,
    sourceSolidFaceIndex: metadata.lastPushFaceIndex ?? metadata.sourceSolidFaceIndex ?? null,
  };
}

function createRecord(solid, {
  id,
  operation = null,
  previous = null,
  visible = true,
} = {}) {
  const documentSolid = cloneSolidForDocument(solid);
  const metadata = cloneJsonValue(documentSolid.metadata ?? {});
  const exactGeometry = cloneJsonValue(metadata?.exactGeometry ?? null);
  if (exactGeometry) metadata.exactGeometry = exactGeometry;
  documentSolid.metadata = metadata;
  const nextOperation = cloneJsonValue(operation ?? inferOperationFromSolid(documentSolid));
  const operations = [
    ...(Array.isArray(previous?.operations) ? previous.operations.map((item) => cloneJsonValue(item)) : []),
    nextOperation,
  ].filter(Boolean);
  return {
    id,
    type: 'document-solid3d',
    visible: visible !== false,
    revision: (Number(previous?.revision) || 0) + 1,
    solid: documentSolid,
    metadata,
    exactGeometry,
    operation: nextOperation,
    operations,
  };
}

export function createModel3d() {
  return {
    version: MODEL3D_VERSION,
    solids: [],
    nextSolidId: 1,
  };
}

export function cloneModel3d(model) {
  if (!model || typeof model !== 'object') return createModel3d();
  const clone = {
    version: Number(model.version) || MODEL3D_VERSION,
    solids: Array.isArray(model.solids)
      ? model.solids.map((record) => cloneJsonValue(record)).filter(Boolean)
      : [],
    nextSolidId: nextSolidNumber(model),
  };
  if (clone.nextSolidId <= clone.solids.length) {
    clone.nextSolidId = nextSolidNumber(clone);
  }
  return clone;
}

export function addModel3dSolid(model, solid, options = {}) {
  const target = model || createModel3d();
  if (!Array.isArray(target.solids)) target.solids = [];
  const solidNumber = nextSolidNumber(target);
  const id = options.id ?? `solid3d-${solidNumber}`;
  const record = createRecord(solid, {
    id,
    operation: options.operation,
    visible: options.visible,
  });
  target.solids.push(record);
  target.version = Number(target.version) || MODEL3D_VERSION;
  target.nextSolidId = Math.max(solidNumber + 1, nextSolidNumber(target));
  return record;
}

export function replaceModel3dSolid(model, id, solid, options = {}) {
  if (!model || !Array.isArray(model.solids) || !id) return null;
  const index = model.solids.findIndex((record) => record?.id === id);
  if (index < 0) return null;
  const previous = model.solids[index];
  const record = createRecord(solid, {
    id,
    operation: options.operation,
    previous,
    visible: options.visible ?? previous.visible,
  });
  model.solids.splice(index, 1, record);
  model.version = Number(model.version) || MODEL3D_VERSION;
  model.nextSolidId = nextSolidNumber(model);
  return record;
}

export function removeModel3dSolid(model, id) {
  if (!model || !Array.isArray(model.solids) || !id) return false;
  const before = model.solids.length;
  model.solids = model.solids.filter((record) => record?.id !== id);
  return model.solids.length !== before;
}

/* webCAD - Modelo documental 3D experimental | SPDX-License-Identifier: GPL-3.0-or-later */

import { normalizePrincipalPlane } from './principal-plane.js';
import { normalizeSketchPlane } from './sketch-plane.js';
import { normalizeSolidPlacement } from './solid-placement.js';

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

function nextSketchNumber(model) {
  const explicitNext = Number(model?.nextSketchId);
  if (Number.isInteger(explicitNext) && explicitNext > 0) return explicitNext;
  const maxExisting = (Array.isArray(model?.sketches) ? model.sketches : [])
    .map((sketch) => Number(String(sketch?.id ?? '').replace(/^sketch3d-/, '')))
    .filter((value) => Number.isInteger(value) && value > 0)
    .reduce((max, value) => Math.max(max, value), 0);
  return maxExisting + 1;
}

function nextLineNumber(model) {
  const explicitNext = Number(model?.nextLineId);
  const maxExisting = (Array.isArray(model?.lines) ? model.lines : [])
    .map((line) => Number(String(line?.id ?? '').replace(/^line3d-/, '')))
    .filter((value) => Number.isInteger(value) && value > 0)
    .reduce((max, value) => Math.max(max, value), 0);
  return Math.max(
    Number.isInteger(explicitNext) && explicitNext > 0 ? explicitNext : 1,
    maxExisting + 1,
  );
}

function cloneLineRecord(record) {
  return {
    id: String(record?.id || ''),
    type: 'LINE3D',
    groupId: String(record?.groupId || ''),
    start: cloneNumberPoint(record?.start),
    end: cloneNumberPoint(record?.end),
    visible: record?.visible !== false,
    locked: record?.locked === true,
    revision: Number(record?.revision) || 0,
    metadata: cloneJsonValue(record?.metadata ?? {}),
  };
}

function cloneSketchRecord(record, cloneEntity = null) {
  return {
    id: String(record?.id || ''),
    type: 'document-sketch3d',
    name: String(record?.name || 'Sketch'),
    visible: record?.visible !== false,
    revision: Number(record?.revision) || 0,
    plane: normalizeSketchPlane(record?.plane ?? record?.sketchPlane ?? 'XY'),
    entities: Array.isArray(record?.entities)
      ? record.entities.map((entity) => cloneEntity?.(entity) ?? cloneJsonValue(entity)).filter(Boolean)
      : [],
    metadata: cloneJsonValue(record?.metadata ?? {}),
  };
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
  locked = false,
  name = null,
  operation = null,
  placement = null,
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
    name: String(name ?? previous?.name ?? id),
    visible: visible !== false,
    locked: locked === true || previous?.locked === true,
    placement: normalizeSolidPlacement(placement ?? previous?.placement),
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
    sketchPlane: 'XY',
    sketches: [],
    nextSketchId: 1,
    lines: [],
    nextLineId: 1,
    solids: [],
    nextSolidId: 1,
  };
}

export function cloneModel3d(model, options = {}) {
  if (!model || typeof model !== 'object') return createModel3d();
  const clone = {
    version: Number(model.version) || MODEL3D_VERSION,
    sketchPlane: normalizePrincipalPlane(model.sketchPlane),
    sketches: Array.isArray(model.sketches)
      ? model.sketches.map((record) => cloneSketchRecord(record, options.cloneEntity)).filter(Boolean)
      : [],
    nextSketchId: nextSketchNumber(model),
    lines: Array.isArray(model.lines)
      ? model.lines.map(cloneLineRecord).filter((record) => record.id)
      : [],
    nextLineId: nextLineNumber(model),
    solids: Array.isArray(model.solids)
      ? model.solids.map((record) => ({
        ...cloneJsonValue(record),
        name: String(record?.name ?? record?.id ?? 'Solid'),
        visible: record?.visible !== false,
        locked: record?.locked === true,
        placement: normalizeSolidPlacement(record?.placement),
      })).filter(Boolean)
      : [],
    nextSolidId: nextSolidNumber(model),
  };
  if (clone.nextSolidId <= clone.solids.length) {
    clone.nextSolidId = nextSolidNumber(clone);
  }
  if (clone.nextSketchId <= clone.sketches.length) {
    clone.nextSketchId = nextSketchNumber(clone);
  }
  return clone;
}

export function addModel3dLines(model, segments, options = {}) {
  const target = model || createModel3d();
  if (!Array.isArray(target.lines)) target.lines = [];
  let lineNumber = nextLineNumber(target);
  const groupId = options.groupId ?? `line3d-group-${lineNumber}`;
  const records = (segments ?? []).map((segment) => cloneLineRecord({
    id: `line3d-${lineNumber++}`,
    groupId,
    start: segment.start,
    end: segment.end,
    visible: options.visible,
    metadata: options.metadata,
  }));
  target.lines.push(...records);
  target.nextLineId = lineNumber;
  return records;
}

export function setModel3dLineGroupVisibility(model, groupId, visible) {
  if (!model || !Array.isArray(model.lines) || !groupId) return false;
  const nextVisible = visible !== false;
  let changed = false;
  model.lines.forEach((line) => {
    if (line?.groupId !== groupId || line.visible === nextVisible) return;
    line.visible = nextVisible;
    line.revision = (Number(line.revision) || 0) + 1;
    changed = true;
  });
  return changed;
}

export function removeModel3dLines(model, ids) {
  if (!model || !Array.isArray(model.lines)) return 0;
  const selectedIds = new Set(Array.isArray(ids) ? ids : [ids]);
  if (!selectedIds.size) return 0;
  const previousLength = model.lines.length;
  model.lines = model.lines.filter((line) => !selectedIds.has(line?.id));
  return previousLength - model.lines.length;
}

export function updateModel3dLineTopology(model, {
  replacements = [],
  mergeGroupIds = [],
  targetGroupId = null,
  metadata = null,
} = {}) {
  if (!model || !Array.isArray(model.lines)) return false;
  const replacementById = new Map((replacements ?? [])
    .filter((replacement) => replacement?.id && Array.isArray(replacement.segments))
    .map((replacement) => [replacement.id, replacement.segments]));
  const mergedGroups = new Set(mergeGroupIds ?? []);
  let lineNumber = nextLineNumber(model);
  let changed = false;
  const nextLines = [];
  model.lines.forEach((line) => {
    const segments = replacementById.get(line?.id);
    const pieces = segments?.length ? segments : [line];
    pieces.forEach((piece, index) => {
      const groupChanged = targetGroupId && mergedGroups.has(line.groupId) &&
        line.groupId !== targetGroupId;
      const metadataChanged = metadata && mergedGroups.has(line.groupId);
      const geometryChanged = Boolean(segments);
      const record = cloneLineRecord({
        ...line,
        id: index === 0 ? line.id : `line3d-${lineNumber++}`,
        groupId: groupChanged ? targetGroupId : line.groupId,
        start: piece.start,
        end: piece.end,
        metadata: metadataChanged ? metadata : line.metadata,
        revision: geometryChanged || groupChanged || metadataChanged
          ? (Number(line.revision) || 0) + 1
          : line.revision,
      });
      nextLines.push(record);
      if (index > 0 || geometryChanged || groupChanged || metadataChanged) changed = true;
    });
  });
  if (!changed) return false;
  model.lines = nextLines;
  model.nextLineId = Math.max(nextLineNumber(model), lineNumber);
  return true;
}

export function addModel3dSketch(model, options = {}) {
  const target = model || createModel3d();
  if (!Array.isArray(target.sketches)) target.sketches = [];
  const sketchNumber = nextSketchNumber(target);
  const id = options.id ?? `sketch3d-${sketchNumber}`;
  const record = cloneSketchRecord({
    id,
    name: options.name ?? `Sketch-${sketchNumber}`,
    plane: options.plane ?? target.sketchPlane ?? 'XY',
    entities: options.entities ?? [],
    visible: options.visible,
    revision: 0,
    metadata: options.metadata,
  }, options.cloneEntity);
  target.sketches.push(record);
  target.nextSketchId = Math.max(sketchNumber + 1, nextSketchNumber(target));
  return record;
}

export function removeModel3dSketch(model, id) {
  if (!model || !Array.isArray(model.sketches) || !id) return false;
  const before = model.sketches.length;
  model.sketches = model.sketches.filter((record) => record?.id !== id);
  return model.sketches.length !== before;
}

export function addModel3dSolid(model, solid, options = {}) {
  const target = model || createModel3d();
  if (!Array.isArray(target.solids)) target.solids = [];
  const solidNumber = nextSolidNumber(target);
  const id = options.id ?? `solid3d-${solidNumber}`;
  const record = createRecord(solid, {
    id,
    locked: options.locked,
    name: options.name ?? `Solid-${solidNumber}`,
    operation: options.operation,
    placement: options.placement,
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
    locked: options.locked,
    name: options.name,
    operation: options.operation,
    placement: options.placement,
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

export function updateModel3dSolidPlacements(model, updates) {
  if (!model || !Array.isArray(model.solids) || !(updates instanceof Map)) return 0;
  let changed = 0;
  model.solids.forEach((record) => {
    if (!updates.has(record?.id) || record?.locked === true) return;
    record.placement = normalizeSolidPlacement(updates.get(record.id));
    record.revision = (Number(record.revision) || 0) + 1;
    changed += 1;
  });
  return changed;
}

/* webCAD - Formato de proyecto .webcad | SPDX-License-Identifier: GPL-3.0-or-later */

import { parseSerializedModel3d, serializeModel3d } from '../../3d/serialization.js';

export const WEBCAD_PROJECT_FORMAT = 'webcad-project';
export const WEBCAD_PROJECT_VERSION = 1;

function cloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function documentSettingsFromState(state = {}) {
  return cloneJson({
    layers: Array.isArray(state.layers) ? state.layers : [],
    activeLayer: state.activeLayer ?? null,
    activeLineStyle: state.activeLineStyle ?? null,
    activeLineType: state.activeLineType ?? null,
    activeLineColor: state.activeLineColor ?? null,
    drawingProfile: state.drawingProfile ?? null,
    dimensionStyle: state.dimensionStyle ?? null,
    dimensionPrecision: state.dimensionPrecision ?? null,
    lastDimensionOffsets: state.lastDimensionOffsets ?? null,
    filletRadii: state.filletRadii ?? null,
    offsetDistances: state.offsetDistances ?? null,
    polarArrayCount: state.polarArrayCount ?? null,
    regularPolygonSides: state.regularPolygonSides ?? null,
    chamferDistances: state.chamferDistances ?? null,
    snapEnabled: state.snapEnabled ?? null,
    orthoEnabled: state.orthoEnabled ?? null,
    lineWeightDisplayEnabled: state.lineWeightDisplayEnabled ?? null,
    navigationDevice: state.navigationDevice ?? null,
    lastTextHeight: state.lastTextHeight ?? null,
    view: {
      scale: state.viewScale ?? null,
      offset: state.viewOffset ?? null,
      hasInitializedView: state.hasInitializedView ?? false,
    },
  });
}

function nextEntityGroupIdFromSnapshot(snapshot, model3d = null) {
  let nextId = 1;
  const visitEntity = (entity) => {
    const match = typeof entity?.groupId === 'string' ? entity.groupId.match(/-(\d+)$/) : null;
    if (match) nextId = Math.max(nextId, Number(match[1]) + 1);
  };
  (snapshot?.entities ?? []).forEach(visitEntity);
  (snapshot?.blockDefinitions ?? []).forEach((definition) =>
    (definition.entities ?? []).forEach(visitEntity));
  (model3d?.sketches ?? []).forEach((sketch) =>
    (sketch.entities ?? []).forEach(visitEntity));
  return nextId;
}

function document2dFromSnapshot(snapshot, state, counters = {}, model3d = null) {
  return {
    snapshot: cloneJson({
      entities: snapshot?.entities ?? [],
      blockDefinitions: snapshot?.blockDefinitions ?? [],
    }),
    settings: documentSettingsFromState(state),
    counters: {
      nextEntityGroupId: Math.max(
        Number(counters.nextEntityGroupId) || 1,
        nextEntityGroupIdFromSnapshot(snapshot, model3d),
      ),
    },
  };
}

export function createWebcadProject({ appVersion = null, counters = {}, doc, state } = {}) {
  if (!doc || typeof doc.snapshot !== 'function') {
    throw new TypeError('No hay documento webCAD para guardar');
  }
  const snapshot = doc.snapshot();
  const model3d = serializeModel3d(doc.model3d ?? snapshot.model3d);
  return {
    format: WEBCAD_PROJECT_FORMAT,
    version: WEBCAD_PROJECT_VERSION,
    appVersion,
    document2d: document2dFromSnapshot(snapshot, state, counters, model3d),
    model3d,
  };
}

export function serializeWebcadProject(options = {}) {
  return `${JSON.stringify(createWebcadProject(options), null, 2)}\n`;
}

export function parseWebcadProject(text) {
  let project = null;
  try {
    project = typeof text === 'string' ? JSON.parse(text) : text;
  }
  catch {
    throw new Error('Archivo .webcad no valido: JSON incorrecto');
  }
  if (!project || typeof project !== 'object' || Array.isArray(project)) {
    throw new Error('Archivo .webcad no valido: el contenido no es un proyecto');
  }
  if (project.format !== WEBCAD_PROJECT_FORMAT) {
    throw new Error('Archivo .webcad no valido: formato incorrecto');
  }
  if (Number(project.version) !== WEBCAD_PROJECT_VERSION) {
    throw new Error(`Version .webcad no soportada: ${project.version ?? 'desconocida'}`);
  }
  const document2d = project.document2d;
  if (!document2d || typeof document2d !== 'object' || Array.isArray(document2d)) {
    throw new Error('Archivo .webcad no valido: falta document2d');
  }
  const snapshot = document2d.snapshot && typeof document2d.snapshot === 'object'
    ? document2d.snapshot
    : document2d;
  if (!Array.isArray(snapshot.entities)) {
    throw new Error('Archivo .webcad no valido: document2d no contiene entidades');
  }
  if (snapshot.blockDefinitions !== undefined && !Array.isArray(snapshot.blockDefinitions)) {
    throw new Error('Archivo .webcad no valido: bloques 2D incorrectos');
  }
  const model3d = parseSerializedModel3d(project.model3d);
  return {
    format: WEBCAD_PROJECT_FORMAT,
    version: WEBCAD_PROJECT_VERSION,
    appVersion: project.appVersion ?? null,
    document2d: {
      snapshot: cloneJson({
        entities: snapshot.entities,
        blockDefinitions: snapshot.blockDefinitions ?? [],
      }),
      settings: cloneJson(document2d.settings ?? {}),
      counters: cloneJson({
        nextEntityGroupId: Math.max(
          Number(document2d.counters?.nextEntityGroupId) || 1,
          nextEntityGroupIdFromSnapshot(snapshot, model3d),
        ),
      }),
    },
    model3d,
  };
}

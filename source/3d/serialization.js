/* webCAD - Serializacion compacta del modelo 3D documental | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  cloneModel3d,
  createModel3d,
  MODEL3D_VERSION,
} from './model3d.js';

export const LEGACY_MODEL3D_VERSION = 1;

const DERIVED_GEOMETRY_KEYS = new Set([
  'capFaceGroups',
  'curvedSideFaceIndices',
  'edgeSegments',
  'edges',
  'faceLoops',
  'faces',
  'faceVertexNormals',
  'mesh',
  'normalIndices',
  'normals',
  'indices',
  'inputSolid',
  'planarFaceGroups',
  'sourceFaceIndices',
  'sourceSolidFaceIndex',
  'sourceSolidFaceIndices',
  'surfaceFaceIds',
  'tangentEdges',
  'triangleIndex',
  'triangleIndices',
  'triangleNormals',
  'triangles',
  'vertexNormals',
  'vertices',
]);

function cloneCompactValue(value, seen = new WeakSet()) {
  if (value === null || value === undefined) return value ?? null;
  if (['boolean', 'string'].includes(typeof value)) return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('La geometria autoritativa contiene un numero no finito');
    }
    return value;
  }
  if (typeof value !== 'object' || seen.has(value)) return undefined;
  seen.add(value);
  if (Array.isArray(value)) {
    const clone = value
      .map((item) => cloneCompactValue(item, seen))
      .filter((item) => item !== undefined);
    seen.delete(value);
    return clone;
  }
  const clone = {};
  Object.entries(value).forEach(([key, item]) => {
    if (DERIVED_GEOMETRY_KEYS.has(key)) return;
    const clean = cloneCompactValue(item, seen);
    if (clean !== undefined) clone[key] = clean;
  });
  seen.delete(value);
  return clone;
}

function finitePoint(point) {
  const clean = {
    x: Number(point?.x),
    y: Number(point?.y),
    z: point?.z === undefined ? 0 : Number(point.z),
  };
  return Object.values(clean).every(Number.isFinite) ? clean : null;
}

function firstDerivedGeometryPath(value, path = '', seen = new WeakSet()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return null;
  seen.add(value);
  for (const [key, item] of Object.entries(value)) {
    const itemPath = path ? `${path}.${key}` : key;
    if (DERIVED_GEOMETRY_KEYS.has(key)) return itemPath;
    const nestedPath = firstDerivedGeometryPath(item, itemPath, seen);
    if (nestedPath) return nestedPath;
  }
  return null;
}

function compactInputFace(inputFace) {
  const points = (inputFace?.points ?? []).map(finitePoint);
  const holes = (inputFace?.holes ?? []).map((loop) => loop.map(finitePoint));
  const normal = finitePoint(inputFace?.normal);
  if (!normal || points.length < 3 ||
      [points, ...holes].some((loop) => loop.some((point) => !point))) return null;
  return {
    type: 'push-input-face-v2',
    points,
    holes,
    normal,
    region: cloneCompactValue(inputFace.region ?? null),
    provenance: cloneCompactValue(inputFace.provenance ?? null),
  };
}

function compactFeature(feature, index, solidName) {
  const type = String(feature?.type ?? '');
  if (['subtractSolid', 'unionSolid'].includes(type)) {
    const transform = (feature?.tool?.transform ?? []).map(Number);
    if (transform.length !== 16 || transform.some((value) => !Number.isFinite(value))) {
      throw new Error(
        `No se puede guardar ${solidName}: la booleana ${index + 1} no tiene un placement estable`,
      );
    }
    if (type === 'subtractSolid' &&
        (!Number.isInteger(Number(feature.component)) || Number(feature.component) < 1)) {
      throw new Error(
        `No se puede guardar ${solidName}: la resta ${index + 1} no identifica un componente estable`,
      );
    }
    const authority = validateCompactSolidAuthority(
      feature?.tool?.authority,
      `${solidName} (operando booleano ${index + 1})`,
    );
    const analyticProfiles = (feature?.analyticProfiles ?? []).map((entry) => {
      const distance = Number(entry?.distance);
      if (!entry?.profile?.plane || !Number.isFinite(distance)) {
        throw new Error(
          `No se puede guardar ${solidName}: la booleana ${index + 1} contiene una curva inestable`,
        );
      }
      return {
        profile: cloneCompactValue(entry.profile),
        distance,
        operationType: String(entry.operationType ?? 'union'),
      };
    });
    return {
      type,
      tool: { authority, transform },
      analyticProfiles,
      ...(type === 'subtractSolid' ? {
        component: Number(feature.component),
      } : {}),
    };
  }
  if (type === 'cutSolidByPlane') {
    const points = (feature.points ?? []).map(finitePoint);
    if (points.length !== 3 || points.some((point) => !point) ||
        !['A', 'B'].includes(feature.side) ||
        !Number.isInteger(Number(feature.component)) || Number(feature.component) < 1) {
      throw new Error(
        `No se puede guardar ${solidName}: el corte ${index + 1} no tiene una referencia estable`,
      );
    }
    return {
      type,
      points,
      side: feature.side,
      component: Number(feature.component),
    };
  }
  if (!['subtract', 'union'].includes(type) || !Number.isFinite(Number(feature.distance))) {
    throw new Error(
      `No se puede guardar ${solidName}: la operacion 3D ${index + 1} no es reproducible`,
    );
  }
  const exactProfile = feature?.exactProfile?.plane
    ? cloneCompactValue(feature.exactProfile)
    : null;
  const inputFace = exactProfile ? null : compactInputFace(feature?.inputFace);
  if (!exactProfile && !inputFace) {
    throw new Error(
      `No se puede guardar ${solidName}: al Push ${index + 1} le falta su contorno autoritativo`,
    );
  }
  return {
    type,
    distance: Number(feature.distance),
    requestedDistance: Number.isFinite(Number(feature.requestedDistance))
      ? Number(feature.requestedDistance)
      : Number(feature.distance),
    through: feature.through === true,
    tangentContact: feature.tangentContact === true,
    sketchId: feature.sketchId ?? null,
    ...(exactProfile ? { exactProfile } : { inputFace }),
    ...(feature.analyticRegionId ? {
      analyticRegionId: String(feature.analyticRegionId),
    } : {}),
  };
}

function exactBaseFromSolid(solid) {
  const exactGeometry = solid?.metadata?.exactGeometry;
  return exactGeometry?.base ?? (exactGeometry?.extrusion ? exactGeometry : null);
}

export function compactSolidAuthority(record) {
  const solidName = String(record?.name ?? record?.id ?? 'solido 3D');
  const solid = record?.solid;
  const exactBase = exactBaseFromSolid(solid);
  const extrusion = exactBase?.extrusion;
  const profile = extrusion?.profile ?? exactBase?.profile;
  const distance = Number(extrusion?.distance);
  const direction = finitePoint(extrusion?.direction);
  if (!profile?.plane || !direction || !Number.isFinite(distance) || Math.abs(distance) <= 1e-9) {
    throw new Error(
      `No se puede guardar ${solidName}: falta la extrusion base autoritativa`,
    );
  }
  const operations = (solid?.metadata?.profileFeatures ?? [])
    .map((feature, index) => compactFeature(feature, index, solidName));
  return {
    type: 'parametric-solid-v1',
    base: {
      type: 'extrusion',
      profile: cloneCompactValue(profile),
      distance,
      direction,
      metadata: cloneCompactValue(extrusion?.metadata ?? {}),
    },
    operations,
  };
}

export function validateCompactSolidAuthority(authority, solidName = 'solido 3D') {
  if (authority?.type !== 'parametric-solid-v1' ||
      authority?.base?.type !== 'extrusion') {
    throw new Error(
      `No se puede abrir ${solidName}: su autoridad parametrica no es compatible`,
    );
  }
  const record = {
    name: solidName,
    solid: {
      metadata: {
        exactGeometry: {
          base: {
            profile: authority?.base?.profile,
            extrusion: authority?.base,
          },
        },
        profileFeatures: authority?.operations,
      },
    },
  };
  return compactSolidAuthority(record);
}

function compactSolidRecord(record) {
  const authority = record?.solid
    ? compactSolidAuthority(record)
    : validateCompactSolidAuthority(record?.authority, record?.name);
  const provenance = record?.operation?.type === 'copySolid'
    ? cloneCompactValue(record.operation)
    : null;
  return {
    id: String(record?.id ?? ''),
    type: 'document-solid3d',
    name: String(record?.name ?? record?.id ?? 'Solid'),
    visible: record?.visible !== false,
    locked: record?.locked === true,
    placement: cloneCompactValue(record?.placement),
    revision: Number(record?.revision) || 0,
    authority,
    ...(provenance ? { provenance } : {}),
  };
}

function compactReferenceMetadata(metadata) {
  const source = metadata && typeof metadata === 'object' ? metadata : {};
  if (!source.supportFace) return cloneCompactValue(source);
  return {
    ...cloneCompactValue(source),
    supportFace: cloneCompactValue(source.supportFace),
  };
}

export function serializeModel3d(model) {
  const source = cloneModel3d(model);
  const serialized = {
    ...source,
    version: MODEL3D_VERSION,
    sketches: source.sketches.map((record) => ({
      ...record,
      metadata: compactReferenceMetadata(record.metadata),
    })),
    lines: source.lines.map((record) => ({
      ...record,
      metadata: compactReferenceMetadata(record.metadata),
    })),
    solids: source.solids.map(compactSolidRecord),
  };
  JSON.stringify(serialized);
  return serialized;
}

function parseCompactModel3d(model) {
  if (!Array.isArray(model.solids)) {
    throw new Error('El modelo 3D del proyecto no contiene una lista de solidos');
  }
  model.solids.forEach((record) => {
    if (record?.solid !== undefined || record?.metadata !== undefined ||
        record?.exactGeometry !== undefined) {
      throw new Error('El modelo 3D compacto contiene una malla persistida no permitida');
    }
    const derivedPath = firstDerivedGeometryPath(record);
    if (derivedPath) {
      throw new Error(
        `El modelo 3D compacto contiene topologia derivada no permitida en ${derivedPath}`,
      );
    }
    validateCompactSolidAuthority(record?.authority, record?.name);
  });
  [...(model.sketches ?? []), ...(model.lines ?? [])].forEach((record) => {
    const derivedPath = firstDerivedGeometryPath(record?.metadata);
    if (derivedPath) {
      throw new Error(
        `El modelo 3D compacto contiene topologia derivada no permitida en metadata.${derivedPath}`,
      );
    }
  });
  const parsed = cloneModel3d(model);
  parsed.version = MODEL3D_VERSION;
  return parsed;
}

export function parseSerializedModel3d(model) {
  if (model === undefined || model === null) return createModel3d();
  if (!model || typeof model !== 'object' || Array.isArray(model)) {
    throw new Error('El modelo 3D del proyecto no es valido');
  }
  const version = Number(model.version);
  if (version === LEGACY_MODEL3D_VERSION) {
    throw new Error(
      'Proyecto 3D experimental antiguo incompatible: la version 1 dependia de una malla ' +
      'sin garantias suficientes para reconstruir sus operaciones. El archivo original no se ha modificado.',
    );
  }
  if (version !== MODEL3D_VERSION) {
    throw new Error(`Version de modelo 3D no soportada: ${model.version ?? 'desconocida'}`);
  }
  const parsed = parseCompactModel3d(model);
  JSON.stringify(parsed);
  return parsed;
}

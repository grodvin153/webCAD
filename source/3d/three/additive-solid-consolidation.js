/* webCAD - Consolidacion material de extrusiones aditivas | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import {
  IDENTITY_SOLID_PLACEMENT,
  normalizeSolidPlacement,
  solidWorldMatrix,
} from '../solid-placement.js';
import { unionSolid3dComponents } from './manifold-boolean.js';

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function placementMatrix(placement) {
  return new THREE.Matrix4().fromArray(solidWorldMatrix(
    normalizeSolidPlacement(placement),
  ));
}

function relativePlacementMatrix(sourcePlacement, toolPlacement) {
  return placementMatrix(sourcePlacement).invert()
    .multiply(placementMatrix(toolPlacement));
}

function transformedPoint(point, matrix) {
  const transformed = new THREE.Vector3(
    Number(point?.x),
    Number(point?.y),
    Number(point?.z) || 0,
  ).applyMatrix4(matrix);
  return { x: transformed.x, y: transformed.y, z: transformed.z };
}

function transformedDirection(direction, matrix) {
  const transformed = new THREE.Vector3(
    Number(direction?.x),
    Number(direction?.y),
    Number(direction?.z),
  ).transformDirection(matrix);
  return { x: transformed.x, y: transformed.y, z: transformed.z };
}

function transformedExactProfile(profile, matrix) {
  if (!profile?.plane) return null;
  const transformed = clone(profile);
  transformed.plane = {
    ...transformed.plane,
    origin: transformedPoint(profile.plane.origin, matrix),
    xAxis: transformedDirection(profile.plane.xAxis, matrix),
    normal: transformedDirection(profile.plane.normal, matrix),
    ...(profile.plane.yAxis ? {
      yAxis: transformedDirection(profile.plane.yAxis, matrix),
    } : {}),
  };
  return transformed;
}

function transformedInputFace(inputFace, matrix) {
  if (!Array.isArray(inputFace?.points) || inputFace.points.length < 3) return null;
  return {
    ...clone(inputFace),
    points: inputFace.points.map((point) => transformedPoint(point, matrix)),
    holes: (inputFace.holes ?? []).map((loop) =>
      loop.map((point) => transformedPoint(point, matrix))),
    normal: transformedDirection(inputFace.normal, matrix),
  };
}

function transformedUnionFeature(feature, matrix) {
  if (feature?.type !== 'union' || !Number.isFinite(Number(feature.distance))) {
    return null;
  }
  const exactProfile = feature.exactProfile
    ? transformedExactProfile(feature.exactProfile, matrix)
    : null;
  const inputFace = exactProfile
    ? null
    : transformedInputFace(feature.inputFace, matrix);
  if (!exactProfile && !inputFace) return null;
  return {
    ...clone(feature),
    type: 'union',
    distance: Number(feature.distance),
    requestedDistance: Number.isFinite(Number(feature.requestedDistance))
      ? Number(feature.requestedDistance)
      : Number(feature.distance),
    ...(exactProfile ? { exactProfile } : { inputFace }),
  };
}

function exactExtrusionFromSolid(solid) {
  const exactGeometry = solid?.metadata?.exactGeometry;
  const base = exactGeometry?.base ??
    (exactGeometry?.extrusion ? exactGeometry : null);
  const extrusion = base?.extrusion;
  const profile = extrusion?.profile ?? base?.profile;
  const distance = Number(extrusion?.distance ?? base?.distance);
  return profile?.plane && Number.isFinite(distance)
    ? { distance, profile }
    : null;
}

export function analyticProfileSnapshotsFromSolid(
  solid,
  matrix = new THREE.Matrix4(),
) {
  const extrusion = exactExtrusionFromSolid(solid);
  if (!extrusion) return null;
  const baseProfile = transformedExactProfile(extrusion.profile, matrix);
  if (!baseProfile) return null;
  const profiles = [{
    profile: baseProfile,
    distance: extrusion.distance,
    operationType: 'union',
  }];
  for (const feature of solid?.metadata?.profileFeatures ?? []) {
    if (feature?.exactProfile?.plane && Number.isFinite(Number(feature.distance))) {
      const profile = transformedExactProfile(feature.exactProfile, matrix);
      if (!profile) return null;
      profiles.push({
        profile,
        distance: Number(feature.distance),
        operationType: feature.type,
      });
    }
    for (const entry of feature?.analyticProfiles ?? []) {
      if (!entry?.profile?.plane || !Number.isFinite(Number(entry.distance))) return null;
      const profile = transformedExactProfile(entry.profile, matrix);
      if (!profile) return null;
      profiles.push({
        profile,
        distance: Number(entry.distance),
        operationType: entry.operationType ?? 'union',
      });
    }
  }
  return profiles;
}

export function additiveUnionOperationsFromSolid(solid, matrix = new THREE.Matrix4()) {
  const extrusion = exactExtrusionFromSolid(solid);
  if (!extrusion) return null;
  const exactProfile = transformedExactProfile(extrusion.profile, matrix);
  if (!exactProfile) return null;
  const baseOperation = {
    type: 'union',
    distance: extrusion.distance,
    requestedDistance: extrusion.distance,
    through: false,
    tangentContact: false,
    sketchId: solid?.metadata?.sketchId ?? null,
    exactProfile,
  };
  const features = (solid?.metadata?.profileFeatures ?? [])
    .map((feature) => transformedUnionFeature(feature, matrix));
  if (features.some((feature) => !feature)) return null;
  return [baseOperation, ...features];
}

function candidateRecords(records, excludedIds) {
  return (records ?? []).filter((record) =>
    record?.solid &&
    record.visible !== false &&
    record.locked !== true &&
    !excludedIds.has(record.id));
}

export function consolidateAdditiveSweep(sourceSolid, toolSolid, options = {}) {
  if (!sourceSolid || !toolSolid) return null;
  const components = unionSolid3dComponents(sourceSolid, toolSolid, options);
  return components?.length === 1 ? components[0] : null;
}

export function consolidateAdditiveExtrusion({
  records = [],
  solid,
  placement = IDENTITY_SOLID_PLACEMENT,
  sourceSolidDocumentId = null,
} = {}) {
  if (!solid) return null;
  const sourceRecord = sourceSolidDocumentId
    ? records.find((record) => record?.id === sourceSolidDocumentId) ?? null
    : null;
  if (sourceSolidDocumentId && !sourceRecord) return null;

  let primaryRecord = sourceRecord;
  let consolidatedSolid = solid;
  let consolidatedPlacement = normalizeSolidPlacement(
    sourceRecord?.placement ?? placement,
  );
  const consumedIds = new Set(sourceRecord ? [sourceRecord.id] : []);
  let pending = candidateRecords(records, consumedIds);
  let changed = true;

  while (changed) {
    changed = false;
    for (const candidate of pending) {
      let sourceSolid = consolidatedSolid;
      let toolSolid = candidate.solid;
      let sourcePlacement = consolidatedPlacement;
      let toolPlacement = candidate.placement;
      if (!primaryRecord) {
        sourceSolid = candidate.solid;
        toolSolid = consolidatedSolid;
        sourcePlacement = candidate.placement;
        toolPlacement = consolidatedPlacement;
      }
      const relativeMatrix = relativePlacementMatrix(sourcePlacement, toolPlacement);
      const operations = additiveUnionOperationsFromSolid(toolSolid, relativeMatrix);
      if (!operations) continue;
      const mergedSolid = consolidateAdditiveSweep(sourceSolid, toolSolid, {
        operation: operations.at(-1),
        operations,
        toolTransform: relativeMatrix.elements,
      });
      if (!mergedSolid) continue;
      consolidatedSolid = mergedSolid;
      consolidatedPlacement = normalizeSolidPlacement(sourcePlacement);
      if (!primaryRecord) primaryRecord = candidate;
      consumedIds.add(candidate.id);
      pending = candidateRecords(records, consumedIds);
      changed = true;
      break;
    }
  }

  return {
    consumedSolidIds: [...consumedIds],
    merged: consumedIds.size > (sourceRecord ? 1 : 0),
    placement: consolidatedPlacement,
    primaryRecord,
    solid: consolidatedSolid,
  };
}

export function publishAdditiveExtrusion({
  doc,
  operation = null,
  placement = IDENTITY_SOLID_PLACEMENT,
  solid,
  sourceSolidDocumentId = null,
} = {}) {
  if (!doc || !solid) return null;
  const consolidation = consolidateAdditiveExtrusion({
    records: doc.model3d?.solids ?? [],
    solid,
    placement,
    sourceSolidDocumentId,
  });
  if (!consolidation) return null;
  const primaryId = consolidation.primaryRecord?.id ?? null;
  if (!primaryId) {
    const record = doc.add3dSolid?.(consolidation.solid, {
      operation,
      placement: consolidation.placement,
    }) ?? null;
    return record ? { ...consolidation, record } : null;
  }
  doc.recordHistory?.();
  const record = doc.replace3dSolid?.(primaryId, consolidation.solid, {
    operation,
    placement: consolidation.placement,
    recordHistory: false,
  }) ?? null;
  if (!record) return null;
  consolidation.consumedSolidIds.forEach((id) => {
    if (id !== primaryId) doc.remove3dSolid?.(id, { recordHistory: false });
  });
  return { ...consolidation, record };
}

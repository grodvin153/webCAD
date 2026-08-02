/* webCAD - Resta canónica de sólidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  relativeSolidPlacementMatrix,
  stableBooleanToolOperation,
} from './solid-union.js';
import { subtractSolid3dComponents } from './manifold-boolean.js';

const NON_INTERSECTING_REASONS = new Set([
  'no-intersection',
  'tangent-contact',
]);

export function subtractSolidRecords(targetRecord, cutterRecords = []) {
  if (!targetRecord?.solid) return { ok: false, reason: 'invalid-target-solid' };
  if (!cutterRecords.length) return { ok: false, reason: 'too-few-cutters' };
  let components = [{ solid: targetRecord.solid }];
  let removedMaterial = false;
  const ignoredContacts = [];

  for (const cutter of cutterRecords) {
    const relativeMatrix = relativeSolidPlacementMatrix(
      targetRecord.placement,
      cutter.placement,
    );
    const operation = stableBooleanToolOperation(
      cutter,
      relativeMatrix,
      'subtractSolid',
    );
    if (!operation) return { ok: false, reason: 'non-replayable-solid' };
    const nextComponents = [];
    for (const component of components) {
      const result = subtractSolid3dComponents(component.solid, cutter.solid, {
        operation,
        toolTransform: relativeMatrix.elements,
      });
      if (NON_INTERSECTING_REASONS.has(result.reason)) {
        ignoredContacts.push({ cutterId: cutter.id, reason: result.reason });
        nextComponents.push(component);
        continue;
      }
      if (result.reason === 'result-empty') {
        removedMaterial = true;
        continue;
      }
      if (!result.ok) return result;
      removedMaterial = true;
      nextComponents.push(...result.solids.map((solid) => ({ solid })));
    }
    components = nextComponents;
    if (!components.length) break;
  }

  if (!removedMaterial) {
    const tangentOnly = ignoredContacts.length > 0 &&
      ignoredContacts.every((contact) => contact.reason === 'tangent-contact');
    return {
      ok: false,
      reason: tangentOnly ? 'tangent-contact' : 'no-intersection',
      ignoredContacts,
    };
  }
  return {
    ok: true,
    components,
    empty: components.length === 0,
    ignoredContacts,
  };
}

export function publishSolidSubtraction({
  cutterIds = [],
  doc,
  targetId = null,
} = {}) {
  const uniqueCutterIds = [...new Set(cutterIds)].filter((id) => id !== targetId);
  if (!targetId) return { ok: false, reason: 'invalid-target-solid' };
  if (!uniqueCutterIds.length) return { ok: false, reason: 'too-few-cutters' };
  const target = doc?.model3d?.solids?.find((record) => record?.id === targetId) ?? null;
  const cutters = uniqueCutterIds.map((id) =>
    doc?.model3d?.solids?.find((record) => record?.id === id) ?? null);
  if (!target || target.visible === false) {
    return { ok: false, reason: 'invalid-target-solid' };
  }
  if (cutters.some((record) => !record || record.visible === false)) {
    return { ok: false, reason: 'invalid-cutter-geometry' };
  }
  if (target.locked === true || cutters.some((record) => record.locked === true)) {
    return { ok: false, reason: 'locked-solid' };
  }

  const subtraction = subtractSolidRecords(target, cutters);
  if (!subtraction.ok) return subtraction;
  doc.recordHistory?.();
  if (subtraction.empty) {
    doc.remove3dSolid?.(target.id, { recordHistory: false });
    cutters.forEach((cutter) => {
      doc.remove3dSolid?.(cutter.id, { recordHistory: false });
    });
    return { ...subtraction, resultIds: [] };
  }

  const parts = subtraction.components.map(({ solid }, index) => ({
    name: subtraction.components.length === 1
      ? target.name
      : `${target.name} — Parte ${index + 1}`,
    operation: solid.metadata?.profileFeatures?.at(-1) ?? {
      type: 'subtractSolid',
    },
    placement: target.placement,
    solid,
  }));
  const records = doc.replace3dSolidWithParts?.(target.id, parts, {
    recordHistory: false,
  }) ?? [];
  if (records.length !== parts.length) {
    return { ok: false, reason: 'publication-failed' };
  }
  cutters.forEach((cutter) => {
    doc.remove3dSolid?.(cutter.id, { recordHistory: false });
  });
  return {
    ...subtraction,
    resultIds: records.map((record) => record.id),
  };
}

/* webCAD - Unión material canónica de sólidos documentales | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { compactSolidAuthority } from '../serialization.js';
import {
  normalizeSolidPlacement,
  solidWorldMatrix,
} from '../solid-placement.js';
import { analyticProfileSnapshotsFromSolid } from './additive-solid-consolidation.js';
import { unionSolid3dComponents } from './manifold-boolean.js';

function placementMatrix(placement) {
  return new THREE.Matrix4().fromArray(solidWorldMatrix(
    normalizeSolidPlacement(placement),
  ));
}

export function relativeSolidPlacementMatrix(sourcePlacement, toolPlacement) {
  return placementMatrix(sourcePlacement).invert()
    .multiply(placementMatrix(toolPlacement));
}

export function stableBooleanToolOperation(
  toolGroup,
  relativeMatrix,
  type = 'unionSolid',
) {
  let authority = null;
  try {
    authority = compactSolidAuthority({
      name: toolGroup.name,
      solid: toolGroup.solid,
    });
  }
  catch {
    return null;
  }
  const analyticProfiles = analyticProfileSnapshotsFromSolid(
    toolGroup.solid,
    relativeMatrix,
  );
  if (!analyticProfiles) return null;
  return {
    type,
    tool: {
      authority,
      transform: [...relativeMatrix.elements],
    },
    analyticProfiles: type === 'subtractSolid'
      ? analyticProfiles.map((entry) => ({ ...entry, operationType: 'subtract' }))
      : analyticProfiles,
  };
}

function groupFromRecord(record) {
  return {
    ids: [record.id],
    name: record.name,
    placement: normalizeSolidPlacement(record.placement),
    primaryRecord: record,
    solid: record.solid,
  };
}

export function consolidateSolidRecords(records = []) {
  const groups = records.map(groupFromRecord);
  let mergedPairCount = 0;
  let changed = true;

  while (changed) {
    changed = false;
    pairSearch:
    for (let sourceIndex = 0; sourceIndex < groups.length; sourceIndex += 1) {
      for (let toolIndex = sourceIndex + 1; toolIndex < groups.length; toolIndex += 1) {
        const source = groups[sourceIndex];
        const tool = groups[toolIndex];
        const relativeMatrix = relativeSolidPlacementMatrix(
          source.placement,
          tool.placement,
        );
        const operation = stableBooleanToolOperation(tool, relativeMatrix);
        if (!operation) {
          return { ok: false, reason: 'non-replayable-solid', groups: [] };
        }
        const components = unionSolid3dComponents(source.solid, tool.solid, {
          operation,
          toolTransform: relativeMatrix.elements,
        });
        if (!components) {
          return { ok: false, reason: 'invalid-result', groups: [] };
        }
        if (components.length !== 1) continue;
        groups[sourceIndex] = {
          ...source,
          ids: [...source.ids, ...tool.ids],
          name: `${source.name} + ${tool.name}`,
          solid: components[0],
        };
        groups.splice(toolIndex, 1);
        mergedPairCount += 1;
        changed = true;
        break pairSearch;
      }
    }
  }

  return {
    ok: true,
    groups,
    mergedPairCount,
    mergedSolidCount: groups.reduce(
      (count, group) => count + Math.max(0, group.ids.length - 1),
      0,
    ),
  };
}

export function publishSolidUnion({ doc, solidIds = [] } = {}) {
  const uniqueIds = [...new Set(solidIds)];
  if (uniqueIds.length < 2) return { ok: false, reason: 'too-few-solids' };
  const records = uniqueIds.map((id) =>
    doc?.model3d?.solids?.find((record) => record?.id === id) ?? null);
  if (records.some((record) => !record || record.visible === false)) {
    return { ok: false, reason: 'invalid-selection' };
  }
  if (records.some((record) => record.locked === true)) {
    return { ok: false, reason: 'locked-solid' };
  }

  const consolidation = consolidateSolidRecords(records);
  if (!consolidation.ok) return consolidation;
  const mergedGroups = consolidation.groups.filter((group) => group.ids.length > 1);
  if (!mergedGroups.length) {
    return { ...consolidation, ok: false, reason: 'no-material-connection' };
  }

  doc.recordHistory?.();
  const resultIds = [];
  for (const group of consolidation.groups) {
    if (group.ids.length === 1) {
      resultIds.push(group.ids[0]);
      continue;
    }
    const operation = group.solid?.metadata?.profileFeatures?.at(-1) ?? {
      type: 'unionSolid',
    };
    const record = doc.replace3dSolid?.(group.ids[0], group.solid, {
      name: group.name,
      operation,
      placement: group.placement,
      recordHistory: false,
    });
    if (!record) return { ok: false, reason: 'publication-failed' };
    group.ids.slice(1).forEach((id) => {
      doc.remove3dSolid?.(id, { recordHistory: false });
    });
    resultIds.push(record.id);
  }

  return {
    ...consolidation,
    ok: true,
    resultIds,
  };
}

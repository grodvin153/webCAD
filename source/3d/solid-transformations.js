/* webCAD - Transformaciones documentales de solidos completos | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  rotateSolidPlacement,
  translateSolidPlacement,
} from './solid-placement.js';

function cleanIds(solidIds) {
  return [...new Set(Array.isArray(solidIds) ? solidIds.filter(Boolean) : [])];
}

function unlockedRecords(doc, solidIds) {
  const ids = new Set(cleanIds(solidIds));
  return (doc?.model3d?.solids ?? [])
    .filter((record) => ids.has(record?.id) && record?.locked !== true);
}

export function moveSolids({ doc, solidIds, from, to } = {}) {
  const records = unlockedRecords(doc, solidIds);
  if (!records.length || !from || !to) return false;
  const displacement = {
    x: Number(to.x) - Number(from.x),
    y: Number(to.y) - Number(from.y),
    z: Number(to.z ?? 0) - Number(from.z ?? 0),
  };
  if (!Object.values(displacement).every(Number.isFinite)) return false;
  const updates = new Map(records.map((record) => [
    record.id,
    translateSolidPlacement(record.placement, displacement),
  ]));
  return doc.update3dSolidPlacements?.(updates) === true;
}

export function copySolids({ doc, solidIds, from, to } = {}) {
  const records = unlockedRecords(doc, solidIds);
  if (!records.length || !from || !to ||
      typeof doc?.add3dSolid !== 'function' ||
      typeof doc?.recordHistory !== 'function') return [];
  const displacement = {
    x: Number(to.x) - Number(from.x),
    y: Number(to.y) - Number(from.y),
    z: Number(to.z ?? 0) - Number(from.z ?? 0),
  };
  if (!Object.values(displacement).every(Number.isFinite)) return [];
  doc.recordHistory();
  return records.map((record) => doc.add3dSolid(record.solid, {
    name: `Copia de ${record.name}`,
    operation: {
      type: 'copySolid',
      sourceSolidId: record.id,
      displacement,
    },
    placement: translateSolidPlacement(record.placement, displacement),
    recordHistory: false,
    visible: record.visible,
  })).filter(Boolean);
}

export function rotateSolids({
  doc,
  solidIds,
  axisStart,
  axisEnd,
  angleDegrees,
} = {}) {
  const records = unlockedRecords(doc, solidIds);
  const angle = Number(angleDegrees);
  if (!records.length || !axisStart || !axisEnd || !Number.isFinite(angle)) return false;
  const updates = new Map();
  for (const record of records) {
    const placement = rotateSolidPlacement(record.placement, {
      axisStart,
      axisEnd,
      angleDegrees: angle,
    });
    if (!placement) return false;
    updates.set(record.id, placement);
  }
  return doc.update3dSolidPlacements?.(updates) === true;
}

/* webCAD - Objetos Three.js por entidad CAD 2D | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { entityLineSegments3d } from './entities-to-three-lines.js';
import { createWideLineSegments, THREE_VIEW_STYLE } from './three-scene-style.js';

function entityKey(entity, fallbackIndex) {
  return entity?.id ?? entity?.handle ?? `${entity?.type ?? 'ENTITY'}-${fallbackIndex}`;
}

export function entityToThreeLineObject(entity, options = {}) {
  const segments = entityLineSegments3d(entity, options);
  if (!segments.length) return null;
  const object = createWideLineSegments(segments, {
    color: options.color ?? THREE_VIEW_STYLE.drawingColor,
    depthTest: false,
    depthWrite: false,
    linewidth: options.linewidth ?? THREE_VIEW_STYLE.drawingLineWidth,
    renderOrder: THREE_VIEW_STYLE.drawingRenderOrder,
    transparent: true,
  });
  object.position.z = options.visualLift ?? THREE_VIEW_STYLE.drawingPlaneLift;
  object.renderOrder = THREE_VIEW_STYLE.drawingRenderOrder;
  object.name = `webcad-entity-${entity?.type ?? 'unknown'}`;
  object.userData.entity = entity;
  object.userData.entityType = entity?.type ?? null;
  object.userData.sourceSegments = segments;
  object.userData.selectable = true;
  return object;
}

export function entitiesToThreeEntityGroup(entities, options = {}) {
  const group = new THREE.Group();
  group.name = 'webcad-3d-entities';
  const bounds = new THREE.Box3();
  let segmentCount = 0;
  let entityCount = 0;

  (Array.isArray(entities) ? entities : []).forEach((entity, index) => {
    const object = entityToThreeLineObject(entity, options);
    if (!object) return;
    object.userData.entityKey = entityKey(entity, index);
    group.add(object);
    entityCount += 1;
    segmentCount += object.userData.segmentCount || 0;
    if (object.userData.bounds) bounds.union(object.userData.bounds);
  });

  group.userData.bounds = bounds.isEmpty() ? null : bounds;
  group.userData.entityCount = entityCount;
  group.userData.segmentCount = segmentCount;
  return group;
}

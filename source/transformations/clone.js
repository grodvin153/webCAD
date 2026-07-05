/*
 * webCAD - Clonado y expansion de entidades
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { offsetPoint } from '../geometry.js';
import { moveEntityByVector } from './move.js';
import { rotateEntityByAngle } from './rotate.js';
import { scaleEntityByFactors } from './scale.js';

export function entityCanExplode(entity) {
  return entity?.type === 'INSERT' || entity?.type === 'POLYLINE' || Boolean(entity?.groupId);
}


export function createEntityTransformations({
  ArcEntity,
  BlockReferenceEntity,
  CircleEntity,
  DimensionEntity,
  HatchEntity,
  LineEntity,
  PolylineEntity,
  RasterImageEntity,
  TextEntity,
  createEntityGroupId,
}) {
  function cloneBlockDefinition(definition, definitionMap = null) {
    const clone = {
      name: definition.name,
      revision: definition.revision || 0,
      entities: [],
    };
    clone.entities = definition.entities
      .map((entity) => cloneEntity(entity, {
        definition: entity.type === 'INSERT'
          ? definitionMap?.get(entity.blockName.toLowerCase()) || entity.definition
          : undefined,
      }))
      .filter(Boolean);
    return clone;
  }

  function expandBlockReferenceEntities(reference, depth = 0, visited = new Set()) {
    const definition = reference?.definition;
    const definitionKey = String(reference?.blockName || '').toLowerCase();
    if (!definition || depth > 8 || visited.has(definitionKey)) {
      return [];
    }
    const nextVisited = new Set(visited);
    nextVisited.add(definitionKey);
    const expanded = [];
    for (const source of definition.entities) {
      const transformed = cloneEntity(source);
      if (!transformed || !scaleEntityByFactors(transformed, reference.scaleX, reference.scaleY)) {
        continue;
      }
      rotateEntityByAngle(transformed, { x: 0, y: 0 }, reference.rotation);
      moveEntityByVector(transformed, reference.insertionPoint);
      if (transformed.type === 'INSERT') {
        expanded.push(...expandBlockReferenceEntities(transformed, depth + 1, nextVisited));
      }
      else {
        expanded.push(transformed);
      }
    }
    return expanded;
  }

  function transformedBlockContents(reference) {
    if (!reference?.definition) {
      return [];
    }
    return reference.definition.entities.map((source) => {
      const transformed = cloneEntity(source);
      if (!transformed || !scaleEntityByFactors(transformed, reference.scaleX, reference.scaleY)) {
        return null;
      }
      rotateEntityByAngle(transformed, { x: 0, y: 0 }, reference.rotation);
      moveEntityByVector(transformed, reference.insertionPoint);
      return transformed;
    }).filter(Boolean);
  }

  function cloneEntityWithOffset(entity, vector, options = {}) {
    const groupId = Object.prototype.hasOwnProperty.call(options, 'groupId') ? options.groupId : entity.groupId;
    if (entity.type === 'LINE') {
      return new LineEntity(
        offsetPoint(entity.start, vector),
        offsetPoint(entity.end, vector),
        { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor, groupId },
      );
    }

    if (entity.type === 'CIRCLE') {
      return new CircleEntity(
        offsetPoint(entity.center, vector),
        entity.radius,
        { layer: entity.layer, lineStyle: entity.lineStyle, lineType: entity.lineType, lineColor: entity.lineColor, groupId },
      );
    }

    if (entity.type === 'ARC') {
      return new ArcEntity(
        offsetPoint(entity.center, vector),
        entity.radius,
        entity.startAngle,
        entity.endAngle,
        {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          groupId,
          clockwise: entity.clockwise !== false,
        },
      );
    }

    if (entity.type === 'POLYLINE') {
      return new PolylineEntity(
        entity.vertices.map((point) => offsetPoint(point, vector)),
        entity.segments.map((segment) => ({
          ...segment,
          center: segment.center ? offsetPoint(segment.center, vector) : null,
        })),
        {
          closed: entity.closed,
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
        },
      );
    }

    if (entity.type === 'TEXT') {
      return new TextEntity(
        offsetPoint(entity.insertionPoint, vector),
        entity.text,
        entity.height,
        {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          angle: entity.angle,
          groupId,
        },
      );
    }
    if (entity.type === 'IMAGE') {
      return new RasterImageEntity(
        offsetPoint(entity.center, vector),
        entity.width,
        entity.height,
        entity.source,
        {
          name: entity.name,
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          rotation: entity.rotation,
          opacity: entity.opacity,
          flipX: entity.flipX,
          flipY: entity.flipY,
        },
      );
    }
    if (entity.type === 'HATCH') {
      return new HatchEntity(
        entity.boundary.map((point) => offsetPoint(point, vector)),
        {
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          gripIndices: entity.gripIndices,
          curveGroups: entity.curveGroups,
          loops: (entity.loops || [entity.boundary]).map((loop) =>
            loop.map((point) => offsetPoint(point, vector))),
        },
      );
    }

    if (entity.type === 'DIMENSION') {
      return new DimensionEntity(
        entity.kind,
        entity.points.map((point) => offsetPoint(point, vector)),
        offsetPoint(entity.placement, vector),
        {
          layer: entity.layer,
          lineColor: entity.lineColor,
          dimensionStyle: entity.dimensionStyle,
          textPosition: entity.textPosition ? offsetPoint(entity.textPosition, vector) : null,
        },
      );
    }

    if (entity.type === 'INSERT') {
      return new BlockReferenceEntity(
        options.definition || entity.definition,
        offsetPoint(entity.insertionPoint, vector),
        {
          blockName: entity.blockName,
          layer: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
          rotation: entity.rotation,
          scaleX: entity.scaleX,
          scaleY: entity.scaleY,
        },
      );
    }

    return null;
  }

  function cloneEntity(entity, options = {}) {
    return cloneEntityWithOffset(entity, { x: 0, y: 0 }, options);
  }

  function cloneEntitiesWithOffset(entities, vector, options = {}) {
    const groupMap = new Map();
    return entities
      .map((entity) => {
        let groupId = entity.groupId || null;
        if (options.remapGroups && groupId) {
          if (!groupMap.has(groupId)) {
            groupMap.set(groupId, createEntityGroupId('polyline'));
          }
          groupId = groupMap.get(groupId);
        }
        return cloneEntityWithOffset(entity, vector, { groupId });
      })
      .filter(Boolean);
  }

  return {
    cloneBlockDefinition,
    cloneEntitiesWithOffset,
    cloneEntity,
    cloneEntityWithOffset,
    expandBlockReferenceEntities,
    transformedBlockContents,
  };
}

/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createPolylineExtendOperations(dependencies) {
  const {
    arcEndpointPoint,
    distance,
    extendArcToBoundaries,
    extendLineToBoundaries,
    polylineSegmentEntity,
  } = dependencies;

  function extendPolylineToBoundaries(entity, boundaryEntities, pickPoint = null) {
    if (entity?.type !== 'POLYLINE' || entity.closed || !entity.segments.length ||
        !boundaryEntities.length) {
      return false;
    }
    const extensionFor = (endpointKey) => {
      const segmentIndex = endpointKey === 'start' ? 0 : entity.segments.length - 1;
      const geometry = polylineSegmentEntity(entity, segmentIndex);
      const endpointPoint = endpointKey === 'start'
        ? entity.vertices[0]
        : entity.vertices[entity.vertices.length - 1];
      if (!geometry) {
        return null;
      }
      const extended = geometry.type === 'LINE'
        ? extendLineToBoundaries(geometry, boundaryEntities, endpointPoint)
        : extendArcToBoundaries(geometry, boundaryEntities, endpointPoint);
      if (!extended) {
        return null;
      }
      const targetPoint = geometry.type === 'LINE'
        ? geometry[endpointKey]
        : arcEndpointPoint(geometry, endpointKey);
      return { endpointKey, targetPoint, distance: distance(endpointPoint, targetPoint) };
    };
    let extension;
    if (pickPoint) {
      const endpointKey = distance(pickPoint, entity.vertices[0]) <=
        distance(pickPoint, entity.vertices[entity.vertices.length - 1]) ? 'start' : 'end';
      extension = extensionFor(endpointKey);
    }
    else {
      extension = [extensionFor('start'), extensionFor('end')]
        .filter(Boolean)
        .sort((first, second) => first.distance - second.distance)[0];
    }
    if (!extension) {
      return false;
    }
    const vertexIndex = extension.endpointKey === 'start' ? 0 : entity.vertices.length - 1;
    entity.vertices[vertexIndex] = { ...extension.targetPoint };
    return true;
  }

  return {
    extendPolylineToBoundaries,
  };
}

/*
 * webCAD - Deteccion de caras cerradas
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createHatchFaces(dependencies) {
  const {
    SNAP_THRESHOLD,
    TWO_PI,
    boundsIntersectsBounds,
    circularParameter,
    curveGroupsFromFaceEdges,
    distance,
    ellipseNormalizedParameter,
    ellipseParameterAtNormalized,
    ellipsePoint,
    ellipseSweep,
    entityArcSweep,
    entityIntersectionPoints,
    lineParameter,
    pointAtCircularParameter,
    pointAtLineParameter,
    polygonSignedArea,
    polylineSegmentEntities,
    isEllipseEntity,
    uniqueSortedParameters,
  } = dependencies;

  function curveArrangementFaces(doc) {
    const entities = doc.entities.flatMap((entity) => {
      if (entity.type === 'POLYLINE') {
        return polylineSegmentEntities(entity);
      }
      return entity.type === 'LINE' || entity.type === 'ARC' || entity.type === 'CIRCLE' || isEllipseEntity(entity)
        ? [entity]
        : [];
    });
    if (!entities.length || entities.length > 1200) {
      return [];
    }

    const parameters = new Map(entities.map((entity) => [
      entity,
      entity.type === 'ARC'
        ? [0, 0.5, 1]
        : entity.type === 'ELLIPSE_ARC'
          ? [0, 0.5, 1]
        : entity.type === 'CIRCLE'
          ? [0, 0.25, 0.5, 0.75, 1]
          : entity.type === 'ELLIPSE'
            ? [0, 0.25, 0.5, 0.75, 1]
          : [0, 1],
    ]));
    const entityBounds = entities.map((entity) => entity.bounds());
    entities.forEach((entity, entityIndex) => {
      for (let otherIndex = entityIndex + 1; otherIndex < entities.length; otherIndex += 1) {
        if (!boundsIntersectsBounds(entityBounds[entityIndex], entityBounds[otherIndex])) {
          continue;
        }
        const other = entities[otherIndex];
        for (const intersection of entityIntersectionPoints(entity, other)) {
          parameters.get(entity).push(entity.type === 'LINE'
            ? lineParameter(entity, intersection)
            : isEllipseEntity(entity)
              ? ellipseNormalizedParameter(entity, intersection)
              : circularParameter(entity, intersection));
          parameters.get(other).push(other.type === 'LINE'
            ? lineParameter(other, intersection)
            : isEllipseEntity(other)
              ? ellipseNormalizedParameter(other, intersection)
              : circularParameter(other, intersection));
        }
      }
    });

    const nodeBuckets = new Map();
    const graphNodes = [];
    const edgeKeys = new Set();
    let nextNodeId = 1;
    const nodeForPoint = (point, logicalGrip = false) => {
      const cellX = Math.floor(point.x / SNAP_THRESHOLD);
      const cellY = Math.floor(point.y / SNAP_THRESHOLD);
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          const nearby = nodeBuckets.get(`${cellX + offsetX}:${cellY + offsetY}`) || [];
          const node = nearby.find((candidate) => distance(candidate.point, point) <= SNAP_THRESHOLD);
          if (node) {
            node.logicalGrip = node.logicalGrip || logicalGrip;
            return node;
          }
        }
      }

      const node = {
        id: nextNodeId,
        point: { ...point },
        outgoing: [],
        logicalGrip,
      };
      const key = `${cellX}:${cellY}`;
      const bucket = nodeBuckets.get(key) || [];
      bucket.push(node);
      nodeBuckets.set(key, bucket);
      graphNodes.push(node);
      nextNodeId += 1;
      return node;
    };

    let generatedSegmentCount = 0;
    const addSegment = (
      startPoint,
      endPoint,
      startLogical = false,
      endLogical = false,
      sourceEntity = null,
      sourceParameterStart = 0,
      sourceParameterEnd = 1,
    ) => {
      if (distance(startPoint, endPoint) <= SNAP_THRESHOLD) {
        return;
      }
      const startNode = nodeForPoint(startPoint, startLogical);
      const endNode = nodeForPoint(endPoint, endLogical);
      const key = [startNode.id, endNode.id]
        .sort((first, second) => first - second)
        .join(':');
      if (edgeKeys.has(key)) {
        return;
      }
      edgeKeys.add(key);
      const forward = {
        from: startNode,
        to: endNode,
        twin: null,
        visited: false,
        sourceEntity,
        sourceParameterStart,
        sourceParameterEnd,
      };
      const reverse = {
        from: endNode,
        to: startNode,
        twin: forward,
        visited: false,
        sourceEntity,
        sourceParameterStart: sourceParameterEnd,
        sourceParameterEnd: sourceParameterStart,
      };
      forward.twin = reverse;
      startNode.outgoing.push(forward);
      endNode.outgoing.push(reverse);
      generatedSegmentCount += 1;
    };

    for (const entity of entities) {
      const sorted = uniqueSortedParameters(parameters.get(entity));
      for (let index = 0; index < sorted.length - 1; index += 1) {
        const startParameter = sorted[index];
        const endParameter = sorted[index + 1];
        if (entity.type === 'LINE') {
          addSegment(
            pointAtLineParameter(entity, startParameter),
            pointAtLineParameter(entity, endParameter),
            true,
            true,
            entity,
            startParameter,
            endParameter,
          );
        }
        else {
          const totalSweep = entity.type === 'CIRCLE'
            ? TWO_PI
            : isEllipseEntity(entity)
              ? ellipseSweep(entity)
              : entityArcSweep(entity);
          const intervalSweep = totalSweep * (endParameter - startParameter);
          const subdivisionCount = Math.max(1, Math.ceil(intervalSweep / (TWO_PI / 96)));
          const pointAtParameter = isEllipseEntity(entity)
            ? (parameter) => ellipsePoint(entity, ellipseParameterAtNormalized(entity, parameter))
            : null;
          let previousPoint = isEllipseEntity(entity)
            ? pointAtParameter(startParameter)
            : pointAtCircularParameter(entity, startParameter);
          let previousLogical = true;
          for (let subdivision = 1; subdivision <= subdivisionCount; subdivision += 1) {
            const parameter = startParameter +
              (endParameter - startParameter) * subdivision / subdivisionCount;
            const nextPoint = isEllipseEntity(entity)
              ? pointAtParameter(parameter)
              : pointAtCircularParameter(entity, parameter);
            const nextLogical = subdivision === subdivisionCount;
            const previousParameter = startParameter +
              (endParameter - startParameter) * (subdivision - 1) / subdivisionCount;
            addSegment(
              previousPoint,
              nextPoint,
              previousLogical,
              nextLogical,
              entity,
              previousParameter,
              parameter,
            );
            previousPoint = nextPoint;
            previousLogical = nextLogical;
          }
        }
        if (generatedSegmentCount > 12000) {
          return [];
        }
      }
    }

    graphNodes.forEach((node) => {
      node.outgoing.sort((first, second) =>
        Math.atan2(first.to.point.y - node.point.y, first.to.point.x - node.point.x) -
        Math.atan2(second.to.point.y - node.point.y, second.to.point.x - node.point.x));
    });

    const faces = [];
    const halfEdges = graphNodes.flatMap((node) => node.outgoing);
    halfEdges.forEach((startEdge) => {
      if (startEdge.visited) {
        return;
      }
      const polygon = [];
      const gripIndices = [];
      const faceEdges = [];
      let edge = startEdge;
      let closed = false;
      for (let step = 0; step <= halfEdges.length; step += 1) {
        if (edge.visited && edge !== startEdge) {
          break;
        }
        edge.visited = true;
        if (edge.from.logicalGrip) {
          gripIndices.push(polygon.length);
        }
        polygon.push({ ...edge.from.point });
        faceEdges.push(edge);
        const outgoing = edge.to.outgoing;
        const reverseIndex = outgoing.indexOf(edge.twin);
        if (reverseIndex < 0 || !outgoing.length) {
          break;
        }
        edge = outgoing[(reverseIndex - 1 + outgoing.length) % outgoing.length];
        if (edge === startEdge) {
          closed = true;
          break;
        }
      }
      if (closed && polygon.length >= 3 && Math.abs(polygonSignedArea(polygon)) > SNAP_THRESHOLD) {
        const curveGroups = curveGroupsFromFaceEdges(faceEdges);
        curveGroups.forEach((group) => {
          if ((group.type === 'ARC' || group.type === 'ELLIPSE_ARC') && group.indices.length >= 3) {
            gripIndices.push(group.indices[Math.floor((group.indices.length - 1) * 0.5)]);
          }
        });
        polygon.gripIndices = [...new Set(gripIndices)];
        polygon.curveGroups = curveGroups;
        faces.push(polygon);
      }
    });
    return faces;
  }

  return {
    curveArrangementFaces,
  };
}

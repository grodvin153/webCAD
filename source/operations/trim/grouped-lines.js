/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createGroupedLineTrimOperations(dependencies) {
  const {
    LineEntity,
    SNAP_THRESHOLD,
    clamp,
    closestPointOnLineSegment,
    createEntityGroupId,
    distance,
    entityArcSweep,
    entityIntersectionPoints,
    lineParameter,
    pointAtCircularParameter,
    pointAtLineParameter,
    polylineSegmentEntity,
  } = dependencies;

  function orderedLineGroup(groupEntities) {
    if (!groupEntities.length || groupEntities.some((entity) => entity.type !== 'LINE')) {
      return null;
    }

    const connectedAt = (point, entity) => {
      if (distance(point, entity.start) <= SNAP_THRESHOLD) {
        return { reversed: false, nextPoint: entity.end };
      }
      if (distance(point, entity.end) <= SNAP_THRESHOLD) {
        return { reversed: true, nextPoint: entity.start };
      }
      return null;
    };
    const endpointDegree = (point) => groupEntities.reduce((count, candidate) =>
      count + (distance(point, candidate.start) <= SNAP_THRESHOLD ? 1 : 0) +
      (distance(point, candidate.end) <= SNAP_THRESHOLD ? 1 : 0), 0);

    let firstEntity = groupEntities[0];
    let firstReversed = false;
    for (const candidate of groupEntities) {
      if (endpointDegree(candidate.start) === 1) {
        firstEntity = candidate;
        break;
      }
      if (endpointDegree(candidate.end) === 1) {
        firstEntity = candidate;
        firstReversed = true;
        break;
      }
    }

    const ordered = [{ entity: firstEntity, reversed: firstReversed }];
    const remaining = new Set(groupEntities);
    remaining.delete(firstEntity);
    const firstPoint = firstReversed ? firstEntity.end : firstEntity.start;
    let currentPoint = firstReversed ? firstEntity.start : firstEntity.end;

    while (remaining.size) {
      let match = null;
      for (const candidate of remaining) {
        const connection = connectedAt(currentPoint, candidate);
        if (connection) {
          match = { entity: candidate, ...connection };
          break;
        }
      }
      if (!match) {
        return null;
      }
      ordered.push({ entity: match.entity, reversed: match.reversed });
      remaining.delete(match.entity);
      currentPoint = match.nextPoint;
    }

    let offset = 0;
    ordered.forEach((component) => {
      component.length = component.entity.length();
      component.offset = offset;
      offset += component.length;
    });
    return {
      components: ordered,
      totalLength: offset,
      closed: distance(currentPoint, firstPoint) <= SNAP_THRESHOLD,
    };
  }

  function lineGroupPointAt(component, traversalParameter) {
    const entityParameter = component.reversed ? 1 - traversalParameter : traversalParameter;
    return pointAtLineParameter(component.entity, entityParameter);
  }

  function closedLineGroupPolygon(doc, entity) {
    if (entity?.type === 'POLYLINE') {
      const geometricallyClosed = entity.closed || (
        entity.vertices.length >= 3 &&
        distance(entity.vertices[0], entity.vertices[entity.vertices.length - 1]) <= SNAP_THRESHOLD
      );
      if (!geometricallyClosed || entity.vertices.length < 3) {
        return null;
      }
      const polygon = [];
      const gripIndices = [];
      const curveGroups = [];
      entity.segments.forEach((segment, segmentIndex) => {
        const geometry = polylineSegmentEntity(entity, segmentIndex);
        if (!geometry) {
          return;
        }
        if (!polygon.length) {
          polygon.push({ ...entity.vertices[segmentIndex] });
        }
        gripIndices.push(polygon.length - 1);
        if (geometry.type === 'ARC') {
          const sweep = entityArcSweep(geometry);
          const steps = clamp(Math.ceil(sweep / (Math.PI / 32)), 4, 96);
          const indices = [polygon.length - 1];
          for (let step = 1; step <= steps; step += 1) {
            const closesBoundary = segmentIndex === entity.segments.length - 1 && step === steps;
            if (closesBoundary) {
              indices.push(0);
              continue;
            }
            const point = pointAtCircularParameter(geometry, step / steps);
            polygon.push(point);
            indices.push(polygon.length - 1);
          }
          curveGroups.push({ type: 'ARC', indices });
        }
        else if (segmentIndex < entity.segments.length - 1) {
          polygon.push({ ...entity.vertices[segmentIndex + 1] });
        }
      });
      polygon.gripIndices = [...new Set(gripIndices)];
      polygon.curveGroups = curveGroups;
      return polygon;
    }
    if (!entity?.groupId) {
      return null;
    }
    const path = orderedLineGroup(doc.groupEntities(entity));
    if (!path?.closed || path.components.length < 3) {
      return null;
    }
    return path.components.map((component) =>
      component.reversed ? { ...component.entity.end } : { ...component.entity.start });
  }

  function lineGroupRangeEntities(path, startDistance, endDistance, groupId) {
    const replacements = [];
    if (endDistance - startDistance <= SNAP_THRESHOLD || path.totalLength <= SNAP_THRESHOLD) {
      return replacements;
    }

    const firstCycle = Math.floor(startDistance / path.totalLength);
    const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);
    for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
      const cycleOffset = cycle * path.totalLength;
      for (const component of path.components) {
        const componentStart = cycleOffset + component.offset;
        const componentEnd = componentStart + component.length;
        const overlapStart = Math.max(startDistance, componentStart);
        const overlapEnd = Math.min(endDistance, componentEnd);
        if (overlapEnd - overlapStart <= SNAP_THRESHOLD) {
          continue;
        }

        const startParameter = (overlapStart - componentStart) / component.length;
        const endParameter = (overlapEnd - componentStart) / component.length;
        replacements.push(new LineEntity(
          lineGroupPointAt(component, startParameter),
          lineGroupPointAt(component, endParameter),
          {
            lineStyle: component.entity.lineStyle,
            lineType: component.entity.lineType,
            lineColor: component.entity.lineColor,
            layer: component.entity.layer,
            groupId,
          },
        ));
      }
    }
    return replacements;
  }

  function trimLineGroupAtPoint(doc, entity, pickPoint) {
    const groupEntities = doc.groupEntities(entity);
    const path = orderedLineGroup(groupEntities);
    if (!path || path.totalLength <= SNAP_THRESHOLD) {
      return { trimmed: false, keptCount: groupEntities.length, grouped: true };
    }

    const breakDistances = [];
    for (const component of path.components) {
      for (const otherEntity of doc.queryBounds(component.entity.bounds())) {
        if (otherEntity.groupId === entity.groupId) {
          continue;
        }
        for (const intersection of entityIntersectionPoints(component.entity, otherEntity)) {
          const entityParameter = lineParameter(component.entity, intersection);
          const traversalParameter = component.reversed ? 1 - entityParameter : entityParameter;
          let pathDistance = component.offset + component.length * traversalParameter;
          if (path.closed && path.totalLength - pathDistance <= SNAP_THRESHOLD) {
            pathDistance = 0;
          }
          breakDistances.push(pathDistance);
        }
      }
    }

    const sortedBreaks = [...breakDistances]
      .sort((first, second) => first - second)
      .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
    if ((path.closed && sortedBreaks.length < 2) || (!path.closed && !sortedBreaks.length)) {
      return { trimmed: false, keptCount: groupEntities.length, grouped: true };
    }

    const pickedComponent = path.components.find((component) => component.entity === entity);
    if (!pickedComponent) {
      return { trimmed: false, keptCount: groupEntities.length, grouped: true };
    }
    const pickedEntityParameter = lineParameter(entity, closestPointOnLineSegment(entity, pickPoint));
    const pickedTraversalParameter = pickedComponent.reversed
      ? 1 - pickedEntityParameter
      : pickedEntityParameter;
    const pickDistance = pickedComponent.offset + pickedComponent.length * pickedTraversalParameter;

    let trimStart = null;
    let trimEnd = null;
    if (path.closed) {
      for (let index = 0; index < sortedBreaks.length; index += 1) {
        const start = sortedBreaks[index];
        const next = sortedBreaks[(index + 1) % sortedBreaks.length];
        const end = index === sortedBreaks.length - 1 ? next + path.totalLength : next;
        const adjustedPick = pickDistance < start - SNAP_THRESHOLD ? pickDistance + path.totalLength : pickDistance;
        if (adjustedPick >= start - SNAP_THRESHOLD && adjustedPick <= end + SNAP_THRESHOLD) {
          trimStart = start;
          trimEnd = end;
          break;
        }
      }
    }
    else {
      const openBreaks = [0, ...sortedBreaks, path.totalLength]
        .sort((first, second) => first - second)
        .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
      for (let index = 0; index < openBreaks.length - 1; index += 1) {
        if (pickDistance >= openBreaks[index] - SNAP_THRESHOLD &&
            pickDistance <= openBreaks[index + 1] + SNAP_THRESHOLD) {
          trimStart = openBreaks[index];
          trimEnd = openBreaks[index + 1];
          break;
        }
      }
    }

    if (trimStart === null || trimEnd === null) {
      return { trimmed: false, keptCount: groupEntities.length, grouped: true };
    }

    let replacements = [];
    if (path.closed) {
      let keepEnd = trimStart;
      const keepStart = trimEnd % path.totalLength;
      if (keepEnd <= keepStart + SNAP_THRESHOLD) {
        keepEnd += path.totalLength;
      }
      replacements = lineGroupRangeEntities(path, keepStart, keepEnd, entity.groupId);
    }
    else {
      replacements.push(...lineGroupRangeEntities(path, 0, trimStart, entity.groupId));
      const trailingGroupId = replacements.length && trimEnd < path.totalLength - SNAP_THRESHOLD
        ? createEntityGroupId('polyline')
        : entity.groupId;
      replacements.push(...lineGroupRangeEntities(path, trimEnd, path.totalLength, trailingGroupId));
    }

    const replaced = doc.replaceEntities(groupEntities, replacements);
    return {
      trimmed: replaced,
      keptCount: replacements.length,
      removedCount: groupEntities.length,
      grouped: true,
    };
  }

  return {
    orderedLineGroup,
    lineGroupPointAt,
    closedLineGroupPolygon,
    lineGroupRangeEntities,
    trimLineGroupAtPoint,
  };
}

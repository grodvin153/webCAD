/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createHatchTrimOperations(dependencies) {
  const {
    HatchEntity,
    LineEntity,
    SNAP_THRESHOLD,
    clamp,
    distance,
    entityIntersectionPoints,
    lineParameter,
    pointAtLineParameter,
    polygonSignedArea,
  } = dependencies;

  function hatchBoundaryPath(entity) {
    if (!entity || entity.type !== 'HATCH' || entity.boundary.length < 3) {
      return null;
    }

    let offset = 0;
    const components = entity.boundary.map((start, index) => {
      const endIndex = (index + 1) % entity.boundary.length;
      const end = entity.boundary[endIndex];
      const length = distance(start, end);
      const component = {
        start,
        end,
        startIndex: index,
        endIndex,
        length,
        offset,
      };
      offset += length;
      return component;
    }).filter((component) => component.length > SNAP_THRESHOLD);
    return components.length >= 3 && offset > SNAP_THRESHOLD
      ? { components, totalLength: offset }
      : null;
  }

  function hatchBoundaryRange(path, startDistance, endDistance, sourceEntity = null) {
    if (endDistance - startDistance <= SNAP_THRESHOLD) {
      return [];
    }

    const points = [];
    const sourceEdgeIndices = [];
    const sourceVertexIndices = [];
    const firstCycle = Math.floor(startDistance / path.totalLength);
    const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);
    for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
      for (const component of path.components) {
        const componentStart = cycle * path.totalLength + component.offset;
        const componentEnd = componentStart + component.length;
        const overlapStart = Math.max(startDistance, componentStart);
        const overlapEnd = Math.min(endDistance, componentEnd);
        if (overlapEnd - overlapStart <= SNAP_THRESHOLD) {
          continue;
        }

        const startParameter = clamp((overlapStart - componentStart) / component.length, 0, 1);
        const endParameter = clamp((overlapEnd - componentStart) / component.length, 0, 1);
        if (!points.length) {
          points.push({
            x: component.start.x + (component.end.x - component.start.x) * startParameter,
            y: component.start.y + (component.end.y - component.start.y) * startParameter,
          });
          sourceVertexIndices.push(startParameter <= SNAP_THRESHOLD ? component.startIndex : null);
        }
        points.push({
          x: component.start.x + (component.end.x - component.start.x) * endParameter,
          y: component.start.y + (component.end.y - component.start.y) * endParameter,
        });
        sourceVertexIndices.push(endParameter >= 1 - SNAP_THRESHOLD ? component.endIndex : null);
        sourceEdgeIndices.push(component.startIndex);
      }
    }

    if (points.length > 1 && distance(points[0], points[points.length - 1]) <= SNAP_THRESHOLD) {
      points.pop();
      sourceVertexIndices.pop();
      sourceEdgeIndices.pop();
    }
    if (!sourceEntity || points.length < 2) {
      return points;
    }

    const gripIndices = new Set([0, points.length - 1]);
    sourceVertexIndices.forEach((sourceIndex, boundaryIndex) => {
      if (sourceIndex !== null && sourceEntity.gripIndices.includes(sourceIndex)) {
        gripIndices.add(boundaryIndex);
      }
    });

    const curveGroups = [];
    for (const sourceGroup of sourceEntity.curveGroups) {
      const sourceCurveEdges = new Set(
        sourceGroup.type === 'CIRCLE'
          ? sourceGroup.indices
          : sourceGroup.indices.slice(0, -1),
      );
      let runStart = null;
      for (let edgeIndex = 0; edgeIndex <= sourceEdgeIndices.length; edgeIndex += 1) {
        const belongsToCurve = edgeIndex < sourceEdgeIndices.length &&
          sourceCurveEdges.has(sourceEdgeIndices[edgeIndex]);
        if (belongsToCurve && runStart === null) {
          runStart = edgeIndex;
        }
        if (!belongsToCurve && runStart !== null) {
          const runEnd = edgeIndex;
          const indices = Array.from(
            { length: runEnd - runStart + 1 },
            (_, index) => runStart + index,
          );
          if (indices.length >= 3) {
            curveGroups.push({
              type: sourceGroup.type === 'CIRCLE' ? 'ARC' : sourceGroup.type,
              indices,
            });
            gripIndices.add(indices[0]);
            gripIndices.add(indices[Math.floor((indices.length - 1) * 0.5)]);
            gripIndices.add(indices[indices.length - 1]);
          }
          runStart = null;
        }
      }
    }

    points.gripIndices = [...gripIndices]
      .filter((index) => index >= 0 && index < points.length)
      .sort((first, second) => first - second);
    points.curveGroups = curveGroups;
    return points;
  }

  function trimHatchEntityAtPoint(doc, entity, pickPoint) {
    const path = hatchBoundaryPath(entity);
    if (!doc || !path || !pickPoint) {
      return { trimmed: false, keptCount: 0, grouped: true, hatch: true };
    }

    const breakDistances = [];
    let nearestComponent = null;
    let nearestParameter = 0;
    let nearestDistance = Infinity;

    for (const component of path.components) {
      const edge = new LineEntity(component.start, component.end, {
        layer: entity.layer,
        lineStyle: entity.lineStyle,
        lineType: entity.lineType,
        lineColor: entity.lineColor,
      });
      const pickParameter = lineParameter(edge, pickPoint);
      const projectedPick = pointAtLineParameter(edge, pickParameter);
      const pickDistance = distance(projectedPick, pickPoint);
      if (pickDistance < nearestDistance) {
        nearestDistance = pickDistance;
        nearestComponent = component;
        nearestParameter = pickParameter;
      }

      for (const otherEntity of doc.queryBounds(edge.bounds())) {
        if (otherEntity === entity || otherEntity.type === 'HATCH' || otherEntity.type === 'TEXT') {
          continue;
        }
        for (const intersection of entityIntersectionPoints(edge, otherEntity)) {
          const parameter = lineParameter(edge, intersection);
          // Circular source geometry meets every tessellated edge at its endpoints.
          // A line crossing a vertex is still a valid cut and is deduplicated below.
          if (
            (parameter <= SNAP_THRESHOLD || parameter >= 1 - SNAP_THRESHOLD) &&
            otherEntity.type !== 'LINE'
          ) {
            continue;
          }
          breakDistances.push(component.offset + component.length * parameter);
        }
      }
    }

    const sortedBreaks = breakDistances
      .sort((first, second) => first - second)
      .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
    if (sortedBreaks.length < 2 || !nearestComponent) {
      return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
    }

    const pickDistance = nearestComponent.offset + nearestComponent.length * nearestParameter;
    let trimStart = null;
    let trimEnd = null;
    for (let index = 0; index < sortedBreaks.length; index += 1) {
      const start = sortedBreaks[index];
      const next = sortedBreaks[(index + 1) % sortedBreaks.length];
      const end = index === sortedBreaks.length - 1 ? next + path.totalLength : next;
      const adjustedPick = pickDistance < start - SNAP_THRESHOLD
        ? pickDistance + path.totalLength
        : pickDistance;
      if (adjustedPick >= start - SNAP_THRESHOLD && adjustedPick <= end + SNAP_THRESHOLD) {
        trimStart = start;
        trimEnd = end;
        break;
      }
    }
    if (trimStart === null || trimEnd === null) {
      return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
    }

    const keepStart = trimEnd % path.totalLength;
    let keepEnd = trimStart;
    if (keepEnd <= keepStart + SNAP_THRESHOLD) {
      keepEnd += path.totalLength;
    }
    const boundary = hatchBoundaryRange(path, keepStart, keepEnd, entity);
    if (boundary.length < 3 || Math.abs(polygonSignedArea(boundary)) <= SNAP_THRESHOLD) {
      return { trimmed: false, keptCount: 1, grouped: true, hatch: true };
    }

    const replacement = new HatchEntity(boundary, {
      layer: entity.layer,
      lineStyle: entity.lineStyle,
      lineType: entity.lineType,
      lineColor: entity.lineColor,
    });
    return {
      trimmed: doc.replaceEntity(entity, [replacement]),
      keptCount: 1,
      grouped: true,
      hatch: true,
    };
  }

  return {
    hatchBoundaryPath,
    hatchBoundaryRange,
    trimHatchEntityAtPoint,
  };
}

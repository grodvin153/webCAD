/*
 * webCAD - Operaciones de modificacion
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createPolylineTrimOperations(dependencies) {
  const {
    PolylineEntity,
    SNAP_THRESHOLD,
    angleInSweep,
    angleOfPoint,
    angleOnArc,
    circularParameter,
    distance,
    entityIntersectionPoints,
    lineParameter,
    pointAtCircularParameter,
    pointAtLineParameter,
    polylineSegmentEntity,
  } = dependencies;

  function polylineSegmentSlice(entity, segmentIndex, startParameter, endParameter) {
    const geometry = polylineSegmentEntity(entity, segmentIndex);
    const source = entity.segments[segmentIndex];
    if (!geometry || !source || endParameter - startParameter <= SNAP_THRESHOLD) {
      return null;
    }
    const start = geometry.type === 'LINE'
      ? pointAtLineParameter(geometry, startParameter)
      : pointAtCircularParameter(geometry, startParameter);
    const end = geometry.type === 'LINE'
      ? pointAtLineParameter(geometry, endParameter)
      : pointAtCircularParameter(geometry, endParameter);
    const widthAt = (parameter) =>
      source.startWidth + (source.endWidth - source.startWidth) * parameter;
    return {
      start,
      end,
      segment: {
        type: source.type,
        center: source.center ? { ...source.center } : null,
        clockwise: source.clockwise !== false,
        startWidth: widthAt(startParameter),
        endWidth: widthAt(endParameter),
      },
    };
  }

  function polylineFromSlices(source, slices) {
    const validSlices = slices.filter(Boolean);
    if (!validSlices.length) {
      return null;
    }
    return new PolylineEntity(
      [validSlices[0].start, ...validSlices.map((slice) => slice.end)],
      validSlices.map((slice) => slice.segment),
      {
        closed: false,
        layer: source.layer,
        lineStyle: source.lineStyle,
        lineType: source.lineType,
        lineColor: source.lineColor,
      },
    );
  }

  function removePolylineSegmentAtIndex(doc, entity, segmentIndex) {
    if (!doc || entity?.type !== 'POLYLINE' || !entity.segments[segmentIndex]) {
      return { trimmed: false, keptCount: 0, grouped: true, polylineSegment: true };
    }

    const segmentSlices = (indices) => indices
      .map((index) => polylineSegmentSlice(entity, index, 0, 1))
      .filter(Boolean);
    const replacements = [];
    if (entity.closed) {
      const remainingIndices = Array.from(
        { length: entity.segments.length - 1 },
        (_, offset) => (segmentIndex + 1 + offset) % entity.segments.length,
      );
      const openedPolyline = polylineFromSlices(entity, segmentSlices(remainingIndices));
      if (openedPolyline) {
        replacements.push(openedPolyline);
      }
    }
    else {
      const beforeIndices = Array.from({ length: segmentIndex }, (_, index) => index);
      const afterIndices = Array.from(
        { length: entity.segments.length - segmentIndex - 1 },
        (_, offset) => segmentIndex + 1 + offset,
      );
      [beforeIndices, afterIndices].forEach((indices) => {
        const remainder = polylineFromSlices(entity, segmentSlices(indices));
        if (remainder) {
          replacements.push(remainder);
        }
      });
    }

    const replaced = doc.replaceEntity(entity, replacements);
    return {
      trimmed: replaced,
      keptCount: replacements.length,
      grouped: true,
      polylineSegment: true,
      remainingSegments: Math.max(0, entity.segments.length - 1),
    };
  }

  function polylinePath(entity) {
    if (entity?.type !== 'POLYLINE') {
      return null;
    }
    const components = [];
    let totalLength = 0;
    entity.segments.forEach((_, index) => {
      const geometry = polylineSegmentEntity(entity, index);
      const length = geometry?.length() || 0;
      if (!geometry || length <= SNAP_THRESHOLD) {
        return;
      }
      components.push({ index, geometry, length, offset: totalLength });
      totalLength += length;
    });
    return totalLength > SNAP_THRESHOLD
      ? { components, totalLength, closed: entity.closed }
      : null;
  }

  function polylineRangeSlices(entity, path, startDistance, endDistance) {
    const slices = [];
    if (!path || endDistance - startDistance <= SNAP_THRESHOLD) {
      return slices;
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
        slices.push(polylineSegmentSlice(
          entity,
          component.index,
          (overlapStart - componentStart) / component.length,
          (overlapEnd - componentStart) / component.length,
        ));
      }
    }
    return slices.filter(Boolean);
  }

  function trimPolylineEntityAtPoint(doc, entity, pickPoint) {
    const path = polylinePath(entity);
    if (!doc || !path || !pickPoint) {
      return { trimmed: false, keptCount: 0, grouped: true };
    }

    const breakDistances = [];
    let pickDistance = 0;
    let pickedSegmentIndex = 0;
    let nearestPickDistance = Infinity;
    for (const component of path.components) {
      let componentPickParameter = component.geometry.type === 'LINE'
        ? lineParameter(component.geometry, pickPoint)
        : circularParameter(component.geometry, pickPoint);
      if (component.geometry.type === 'ARC' &&
          !angleOnArc(angleOfPoint(component.geometry.center, pickPoint), component.geometry)) {
        componentPickParameter = distance(
          pickPoint,
          pointAtCircularParameter(component.geometry, 0),
        ) <= distance(
          pickPoint,
          pointAtCircularParameter(component.geometry, 1),
        ) ? 0 : 1;
      }
      const projectedPick = component.geometry.type === 'LINE'
        ? pointAtLineParameter(component.geometry, componentPickParameter)
        : pointAtCircularParameter(component.geometry, componentPickParameter);
      const candidateDistance = distance(projectedPick, pickPoint);
      if (candidateDistance < nearestPickDistance) {
        nearestPickDistance = candidateDistance;
        pickDistance = component.offset + component.length * componentPickParameter;
        pickedSegmentIndex = component.index;
      }

      for (const otherEntity of doc.queryBounds(component.geometry.bounds())) {
        if (otherEntity === entity || otherEntity.type === 'HATCH' || otherEntity.type === 'TEXT') {
          continue;
        }
        for (const intersection of entityIntersectionPoints(component.geometry, otherEntity)) {
          const parameter = component.geometry.type === 'LINE'
            ? lineParameter(component.geometry, intersection)
            : circularParameter(component.geometry, intersection);
          let pathDistance = component.offset + component.length * parameter;
          if (path.closed && path.totalLength - pathDistance <= SNAP_THRESHOLD) {
            pathDistance = 0;
          }
          breakDistances.push(pathDistance);
        }
      }
    }

    const sortedBreaks = breakDistances
      .sort((first, second) => first - second)
      .filter((value, index, values) => index === 0 || value - values[index - 1] > SNAP_THRESHOLD);
    if ((path.closed && sortedBreaks.length < 2) || (!path.closed && !sortedBreaks.length)) {
      return removePolylineSegmentAtIndex(doc, entity, pickedSegmentIndex);
    }

    let trimStart = null;
    let trimEnd = null;
    if (path.closed) {
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
      return removePolylineSegmentAtIndex(doc, entity, pickedSegmentIndex);
    }

    const replacements = [];
    if (path.closed) {
      const keepStart = trimEnd % path.totalLength;
      let keepEnd = trimStart;
      if (keepEnd <= keepStart + SNAP_THRESHOLD) {
        keepEnd += path.totalLength;
      }
      const replacement = polylineFromSlices(
        entity,
        polylineRangeSlices(entity, path, keepStart, keepEnd),
      );
      if (replacement) {
        replacements.push(replacement);
      }
    }
    else {
      [
        polylineFromSlices(entity, polylineRangeSlices(entity, path, 0, trimStart)),
        polylineFromSlices(entity, polylineRangeSlices(entity, path, trimEnd, path.totalLength)),
      ].filter(Boolean).forEach((replacement) => replacements.push(replacement));
    }

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length, grouped: true };
  }

  return {
    polylineSegmentSlice,
    polylineFromSlices,
    removePolylineSegmentAtIndex,
    polylinePath,
    polylineRangeSlices,
    trimPolylineEntityAtPoint,
  };
}

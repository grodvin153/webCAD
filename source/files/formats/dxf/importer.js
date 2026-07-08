/* webCAD - Importacion DXF | SPDX-License-Identifier: GPL-3.0-or-later */

import { parseEmbeddedImageFromDxf } from '../../../images/dxf.js';
import { coordinateZ } from '../../../coordinates/point3.js';

export function createDxfImporter(dependencies) {
  const {
    ArcEntity,
    BlockReferenceEntity,
    CircleEntity,
    DIMENSION_STYLES,
    DRAWING_PROFILES,
    DimensionEntity,
    HatchEntity,
    LineEntity,
    PolylineEntity,
    RasterImageEntity,
    SNAP_THRESHOLD,
    TextEntity,
    XLineEntity,
    angleOfPoint,
    arcCenterFromBulge,
    clamp,
    createBounds,
    distance,
    dxfEntityOptions,
    entityArcSweep,
    entityDistanceToPoint,
    entityMidpoint,
    expandBounds,
    getLineColor,
    getLineStyle,
    getLineType,
    infiniteLineLineIntersection,
    isCircularEntity,
    lineColorFromDxf,
    lineStyleFromDxf,
    lineTypeFromDxf,
    moveEntityByVector,
    normalizeAngle,
    normalizedVector,
    pointAtCircularParameter,
    pointOnCircularEntity,
    polygonSignedArea,
    primitiveEntityParts,
  } = dependencies;

  function dxfDegreesToCanvasAngle(degrees) {
    return normalizeAngle(-Number(degrees || 0) * Math.PI / 180);
  }

  function dxfPoint(record, xCode = '10', yCode = '20', zCode = String(Number(xCode) + 20)) {
    return {
      x: Number(record[xCode] || 0),
      y: -Number(record[yCode] || 0),
      z: Number(record[zCode] || 0),
    };
  }
  function polylineFromDxfVertices(vertices, record, closed, layerDefinitionMap) {
    const normalizedVertices = vertices
      .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
      .map((point) => ({ ...point }));
    if (
      closed &&
      normalizedVertices.length > 2 &&
      distance(normalizedVertices[0], normalizedVertices[normalizedVertices.length - 1]) <= SNAP_THRESHOLD
    ) {
      normalizedVertices.pop();
    }
    const segmentCount = closed
      ? normalizedVertices.length
      : Math.max(0, normalizedVertices.length - 1);
    if (normalizedVertices.length < 2 || !segmentCount) {
      return null;
    }
    const segments = [];
    for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
      const vertex = normalizedVertices[segmentIndex];
      const nextVertex = normalizedVertices[(segmentIndex + 1) % normalizedVertices.length];
      const center = arcCenterFromBulge(vertex, nextVertex, vertex.bulge || 0);
      segments.push({
        type: center ? 'ARC' : 'LINE',
        center,
        clockwise: (vertex.bulge || 0) >= 0,
        startWidth: Math.max(0, vertex.startWidth || 0),
        endWidth: Math.max(0, vertex.endWidth || 0),
      });
    }
    return new PolylineEntity(
      normalizedVertices,
      segments,
      { closed, ...dxfEntityOptions(record, layerDefinitionMap) },
    );
  }

  function dxfSectionBounds(pairs, sectionName) {
    for (let index = 0; index < pairs.length - 1; index += 1) {
      if (
        pairs[index][0] === '0' &&
        pairs[index][1] === 'SECTION' &&
        pairs[index + 1][0] === '2' &&
        pairs[index + 1][1] === sectionName
      ) {
        const start = index + 2;
        let end = start;
        while (end < pairs.length && !(pairs[end][0] === '0' && pairs[end][1] === 'ENDSEC')) {
          end += 1;
        }
        return { start, end };
      }
    }
    return null;
  }

  function dxfBlockEntityText(entityPairs, layerDefinitions) {
    const lines = ['0', 'SECTION', '2', 'TABLES', '0', 'TABLE', '2', 'LAYER', '70', String(layerDefinitions.length)];
    layerDefinitions.forEach((layer) => {
      lines.push(
        '0', 'LAYER', '2', layer.name, '70', '0',
        '62', String(getLineColor(layer.lineColor).aci || 7),
        '6', getLineType(layer.lineType).dxfName,
        '370', String(getLineStyle(layer.lineStyle).dxfLineWeight),
      );
    });
    lines.push('0', 'ENDTAB', '0', 'ENDSEC', '0', 'SECTION', '2', 'ENTITIES');
    entityPairs.forEach(([code, value]) => lines.push(code, value));
    lines.push('0', 'ENDSEC', '0', 'EOF');
    return lines.join('\n');
  }

  function appendDistinctPoint(points, point) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      return;
    }
    if (!points.length || distance(points[points.length - 1], point) > SNAP_THRESHOLD) {
      points.push(point);
    }
  }

  function sampleHatchBulge(points, start, end, bulge) {
    const center = arcCenterFromBulge(start, end, bulge);
    if (!center) {
      appendDistinctPoint(points, start);
      appendDistinctPoint(points, end);
      return;
    }
    const arc = {
      type: 'ARC',
      center,
      radius: distance(center, start),
      startAngle: angleOfPoint(center, start),
      endAngle: angleOfPoint(center, end),
      clockwise: bulge >= 0,
    };
    const sampleCount = clamp(Math.ceil(entityArcSweep(arc) / (Math.PI / 24)), 2, 96);
    for (let index = 0; index <= sampleCount; index += 1) {
      appendDistinctPoint(points, pointAtCircularParameter(arc, index / sampleCount));
    }
  }

  function repeatedDxfPoints(edgePairs, xCode, yCode) {
    const points = [];
    let pendingX = null;
    for (const [code, value] of edgePairs) {
      if (code === xCode) {
        pendingX = Number(value);
      }
      else if (code === yCode && pendingX !== null) {
        appendDistinctPoint(points, { x: pendingX, y: -Number(value) });
        pendingX = null;
      }
    }
    return points;
  }

  function sampleDxfHatchEdge(edgeType, edgePairs) {
    const value = (code, fallback = 0) => {
      const pair = edgePairs.find(([pairCode]) => pairCode === code);
      return Number(pair?.[1] ?? fallback);
    };
    if (edgeType === 1) {
      return [
        { x: value('10'), y: -value('20'), z: value('30') },
        { x: value('11'), y: -value('21'), z: value('31') },
      ];
    }
    if (edgeType === 2) {
      const center = { x: value('10'), y: -value('20'), z: value('30') };
      const radius = value('40');
      const arc = {
        type: 'ARC',
        center,
        radius,
        startAngle: dxfDegreesToCanvasAngle(value('50')),
        endAngle: dxfDegreesToCanvasAngle(value('51')),
        clockwise: value('73', 1) !== 1,
      };
      if (!(radius > SNAP_THRESHOLD)) {
        return [];
      }
      const sampleCount = clamp(Math.ceil(entityArcSweep(arc) / (Math.PI / 24)), 2, 96);
      return Array.from({ length: sampleCount + 1 }, (_, index) =>
        pointAtCircularParameter(arc, index / sampleCount));
    }
    if (edgeType === 3) {
      const center = { x: value('10'), y: -value('20'), z: value('30') };
      const major = { x: value('11'), y: -value('21'), z: value('31') };
      const ratio = Math.abs(value('40', 1));
      const start = value('50') * Math.PI / 180;
      const end = value('51') * Math.PI / 180;
      const counterclockwise = value('73', 1) === 1;
      const sweep = counterclockwise ? normalizeAngle(end - start) : normalizeAngle(start - end);
      const sampleCount = clamp(Math.ceil(sweep / (Math.PI / 24)), 4, 128);
      return Array.from({ length: sampleCount + 1 }, (_, index) => {
        const parameter = start + (counterclockwise ? 1 : -1) * sweep * index / sampleCount;
        const minor = { x: major.y * ratio, y: -major.x * ratio };
        return {
          x: center.x + major.x * Math.cos(parameter) + minor.x * Math.sin(parameter),
          y: center.y + major.y * Math.cos(parameter) + minor.y * Math.sin(parameter),
          z: center.z,
        };
      });
    }
    if (edgeType === 4) {
      const fitPoints = repeatedDxfPoints(edgePairs, '11', '21');
      return fitPoints.length >= 2 ? fitPoints : repeatedDxfPoints(edgePairs, '10', '20');
    }
    return [];
  }

  function parseDxfHatchLoops(entityPairs) {
    const pathCountIndex = entityPairs.findIndex(([code]) => code === '91');
    if (pathCountIndex < 0) {
      return [];
    }
    const pathCount = Number(entityPairs[pathCountIndex][1]);
    if (!Number.isInteger(pathCount) || pathCount < 1 || pathCount > 4096) {
      return [];
    }
    const loops = [];
    let cursor = pathCountIndex + 1;
    for (let pathIndex = 0; pathIndex < pathCount; pathIndex += 1) {
      while (cursor < entityPairs.length && entityPairs[cursor][0] !== '92') {
        cursor += 1;
      }
      if (cursor >= entityPairs.length) {
        break;
      }
      const pathFlags = Number(entityPairs[cursor][1]);
      cursor += 1;
      const loop = [];
      if ((pathFlags & 2) === 2) {
        let closed = true;
        let vertexCount = 0;
        while (cursor < entityPairs.length && entityPairs[cursor][0] !== '93') {
          if (entityPairs[cursor][0] === '73') {
            closed = Number(entityPairs[cursor][1]) === 1;
          }
          cursor += 1;
        }
        if (cursor < entityPairs.length) {
          vertexCount = Number(entityPairs[cursor][1]);
          cursor += 1;
        }
        const vertices = [];
        for (let vertexIndex = 0; vertexIndex < vertexCount; vertexIndex += 1) {
          while (cursor < entityPairs.length && entityPairs[cursor][0] !== '10') {
            cursor += 1;
          }
          if (cursor >= entityPairs.length) {
            break;
          }
          const vertex = { x: Number(entityPairs[cursor][1]), y: 0, bulge: 0 };
          cursor += 1;
          while (cursor < entityPairs.length && !['10', '92', '97'].includes(entityPairs[cursor][0])) {
            const [code, value] = entityPairs[cursor];
            if (code === '20') {
              vertex.y = -Number(value);
            }
            else if (code === '42') {
              vertex.bulge = -Number(value) || 0;
            }
            cursor += 1;
          }
          vertices.push(vertex);
        }
        const segmentCount = closed ? vertices.length : Math.max(0, vertices.length - 1);
        for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
          const start = vertices[segmentIndex];
          const end = vertices[(segmentIndex + 1) % vertices.length];
          sampleHatchBulge(loop, start, end, start.bulge);
        }
      }
      else {
        while (cursor < entityPairs.length && entityPairs[cursor][0] !== '93') {
          cursor += 1;
        }
        const edgeCount = cursor < entityPairs.length ? Number(entityPairs[cursor][1]) : 0;
        cursor += 1;
        for (let edgeIndex = 0; edgeIndex < edgeCount; edgeIndex += 1) {
          while (cursor < entityPairs.length && entityPairs[cursor][0] !== '72') {
            cursor += 1;
          }
          if (cursor >= entityPairs.length) {
            break;
          }
          const edgeType = Number(entityPairs[cursor][1]);
          cursor += 1;
          const edgePairs = [];
          while (cursor < entityPairs.length && !['72', '92', '97'].includes(entityPairs[cursor][0])) {
            edgePairs.push(entityPairs[cursor]);
            cursor += 1;
          }
          sampleDxfHatchEdge(edgeType, edgePairs).forEach((point) => appendDistinctPoint(loop, point));
        }
      }
      if (loop.length > 2 && distance(loop[0], loop[loop.length - 1]) <= SNAP_THRESHOLD) {
        loop.pop();
      }
      if (loop.length >= 3 && Math.abs(polygonSignedArea(loop)) > SNAP_THRESHOLD) {
        loops.push(loop);
      }
    }
    return loops.sort((first, second) =>
      Math.abs(polygonSignedArea(second)) - Math.abs(polygonSignedArea(first)));
  }

  function parseDxf(text) {
    const rows = text.split(/\r?\n/);
    const pairs = [];
    for (let i = 0; i < rows.length; i += 2) {
      const code = rows[i];
      const value = rows[i + 1];
      if (typeof value === 'undefined') {
        break;
      }
      pairs.push([code.trim(), value.trim()]);
    }

    const layerDefinitions = [];
    let dxfInsUnits = null;
    let dxfTextSize = null;
    let dxfExtMin = null;
    let dxfExtMax = null;
    for (let headerIndex = 0; headerIndex < pairs.length - 1; headerIndex += 1) {
      if (pairs[headerIndex][0] !== '9') {
        continue;
      }
      const variable = pairs[headerIndex][1];
      const record = {};
      for (let valueIndex = headerIndex + 1; valueIndex < pairs.length; valueIndex += 1) {
        const [valueCode, value] = pairs[valueIndex];
        if (valueCode === '9' || valueCode === '0') {
          break;
        }
        record[valueCode] = value;
      }
      if (variable === '$INSUNITS') {
        dxfInsUnits = Number(record['70']);
      }
      if (variable === '$TEXTSIZE') {
        dxfTextSize = Number(record['40']);
      }
      if (variable === '$EXTMIN') {
        dxfExtMin = { x: Number(record['10']), y: Number(record['20']) };
      }
      if (variable === '$EXTMAX') {
        dxfExtMax = { x: Number(record['10']), y: Number(record['20']) };
      }
    }
    const dxfExtents = dxfExtMin && dxfExtMax &&
      Number.isFinite(dxfExtMin.x) && Number.isFinite(dxfExtMin.y) &&
      Number.isFinite(dxfExtMax.x) && Number.isFinite(dxfExtMax.y)
      ? createBounds(
        Math.min(dxfExtMin.x, dxfExtMax.x),
        Math.min(-dxfExtMin.y, -dxfExtMax.y),
        Math.max(dxfExtMin.x, dxfExtMax.x),
        Math.max(-dxfExtMin.y, -dxfExtMax.y),
      )
      : null;
    for (let layerIndex = 0; layerIndex < pairs.length; layerIndex += 1) {
      const [code, value] = pairs[layerIndex];
      if (code !== '0' || value !== 'LAYER') {
        continue;
      }
      const record = {};
      layerIndex += 1;
      while (layerIndex < pairs.length && pairs[layerIndex][0] !== '0') {
        record[pairs[layerIndex][0]] = pairs[layerIndex][1];
        layerIndex += 1;
      }
      layerIndex -= 1;
      if (record['2']) {
        layerDefinitions.push({
          name: record['2'],
          lineStyle: lineStyleFromDxf(record),
          lineType: lineTypeFromDxf(record),
          lineColor: lineColorFromDxf(record),
        });
      }
    }
    const layerDefinitionMap = new Map(
      layerDefinitions.map((layer) => [layer.name.toLowerCase(), layer]),
    );

    const blockDefinitions = [];
    const blocksSection = dxfSectionBounds(pairs, 'BLOCKS');
    if (blocksSection) {
      let blockIndex = blocksSection.start;
      while (blockIndex < blocksSection.end) {
        if (pairs[blockIndex][0] !== '0' || pairs[blockIndex][1] !== 'BLOCK') {
          blockIndex += 1;
          continue;
        }
        const blockRecord = {};
        blockIndex += 1;
        while (blockIndex < blocksSection.end && pairs[blockIndex][0] !== '0') {
          blockRecord[pairs[blockIndex][0]] = pairs[blockIndex][1];
          blockIndex += 1;
        }
        const entityStart = blockIndex;
        while (blockIndex < blocksSection.end && !(
          pairs[blockIndex][0] === '0' && pairs[blockIndex][1] === 'ENDBLK'
        )) {
          blockIndex += 1;
        }
        const name = String(blockRecord['2'] || blockRecord['3'] || '').trim();
        const isInternalBlock = /^\*(?:(?:MODEL|PAPER)_SPACE|D)/i.test(name);
        if (name && !isInternalBlock) {
          const blockEntities = parseDxf(
            dxfBlockEntityText(pairs.slice(entityStart, blockIndex), layerDefinitions),
          );
          const basePoint = {
            x: Number(blockRecord['10'] || 0),
            y: -Number(blockRecord['20'] || 0),
            z: Number(blockRecord['30'] || 0),
          };
          blockEntities.forEach((entity) => moveEntityByVector(entity, {
            x: -basePoint.x,
            y: -basePoint.y,
            z: -basePoint.z,
          }));
          blockDefinitions.push({ name, revision: 0, entities: [...blockEntities] });
        }
        blockIndex += 1;
      }
    }
    const blockDefinitionMap = new Map(
      blockDefinitions.map((definition) => [definition.name.toLowerCase(), definition]),
    );

    const entities = [];
    let skippedHatchCount = 0;
    let skippedPatternHatchCount = 0;
    const entitiesSection = dxfSectionBounds(pairs, 'ENTITIES');
    let index = entitiesSection?.start || 0;
    const entitiesEnd = entitiesSection?.end || pairs.length;

    while (index < entitiesEnd) {
      const [code, value] = pairs[index];
      if (code === '0' && value === 'POLYLINE') {
        const record = {};
        const vertices = [];
        index += 1;
        while (index < pairs.length && pairs[index][0] !== '0') {
          record[pairs[index][0]] = pairs[index][1];
          index += 1;
        }
        const flags = Number(record['70'] || 0);
        const unsupportedMesh = (flags & 16) === 16 || (flags & 64) === 64;
        while (index < pairs.length && pairs[index][0] === '0' && pairs[index][1] === 'VERTEX') {
          const vertexRecord = {};
          index += 1;
          while (index < pairs.length && pairs[index][0] !== '0') {
            vertexRecord[pairs[index][0]] = pairs[index][1];
            index += 1;
          }
          if (!unsupportedMesh) {
            vertices.push({
              x: Number(vertexRecord['10']),
              y: -Number(vertexRecord['20']),
              z: Number(vertexRecord['30'] || record['30'] || 0),
              startWidth: Number(vertexRecord['40'] ?? record['40']) || 0,
              endWidth: Number(vertexRecord['41'] ?? record['41']) || 0,
              bulge: -Number(vertexRecord['42'] || 0),
            });
          }
        }
        if (index < pairs.length && pairs[index][0] === '0' && pairs[index][1] === 'SEQEND') {
          index += 1;
          while (index < pairs.length && pairs[index][0] !== '0') {
            index += 1;
          }
        }
        if (!unsupportedMesh) {
          const entity = polylineFromDxfVertices(
            vertices,
            record,
            (flags & 1) === 1,
            layerDefinitionMap,
          );
          if (entity) {
            entities.push(entity);
          }
        }
        continue;
      }

      if (code === '0' && value === 'LWPOLYLINE') {
        const record = {};
        const vertices = [];
        let currentVertex = null;
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          if (groupCode === '10') {
            currentVertex = {
              x: Number(groupValue),
              y: 0,
              startWidth: 0,
              endWidth: 0,
              bulge: 0,
            };
            vertices.push(currentVertex);
          }
          else if (currentVertex && groupCode === '20') {
            currentVertex.y = -Number(groupValue);
          }
          else if (currentVertex && groupCode === '40') {
            currentVertex.startWidth = Number(groupValue) || 0;
          }
          else if (currentVertex && groupCode === '41') {
            currentVertex.endWidth = Number(groupValue) || 0;
          }
          else if (currentVertex && groupCode === '42') {
            currentVertex.bulge = -Number(groupValue) || 0;
          }
          else {
            record[groupCode] = groupValue;
          }
          index += 1;
        }
        const entity = polylineFromDxfVertices(
          vertices.map((vertex) => ({ ...vertex, z: Number(vertex.z ?? record['38'] ?? 0) })),
          record,
          (Number(record['70'] || 0) & 1) === 1,
          layerDefinitionMap,
        );
        if (entity) {
          entities.push(entity);
        }
        continue;
      }

      if (code === '0' && value === 'INSERT') {
        const record = {};
        index += 1;
        while (index < entitiesEnd && pairs[index][0] !== '0') {
          record[pairs[index][0]] = pairs[index][1];
          index += 1;
        }
        const name = String(record['2'] || '').trim();
        const definition = blockDefinitionMap.get(name.toLowerCase());
        const insertionPoint = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        if (definition && Number.isFinite(insertionPoint.x) && Number.isFinite(insertionPoint.y)) {
          entities.push(new BlockReferenceEntity(definition, insertionPoint, {
            ...dxfEntityOptions(record, layerDefinitionMap),
            rotation: Number(record['50'] || 0),
            scaleX: Number(record['41'] || 1),
            scaleY: Number(record['42'] || record['41'] || 1),
          }));
        }
        continue;
      }

      if (code === '0' && value === 'DIMENSION') {
        const record = {};
        index += 1;
        while (index < entitiesEnd && pairs[index][0] !== '0') {
          record[pairs[index][0]] = pairs[index][1];
          index += 1;
        }
        const typeCode = Number(record['70'] || 0) & 7;
        const point = (xCode, yCode) => dxfPoint(record, xCode, yCode);
        let placement = typeCode === 3 || typeCode === 4
          ? point('11', '21')
          : point('10', '20');
        const textPosition = record['11'] !== undefined && record['21'] !== undefined
          ? point('11', '21')
          : null;
        let kind = null;
        let definitionPoints = [];
        if (typeCode === 4 || typeCode === 3) {
          kind = typeCode === 4 ? 'radius' : 'diameter';
          const radiusPoint = point('15', '25');
          const circularSource = typeCode === 4
            ? entities
              .flatMap((entity) => primitiveEntityParts(entity))
              .filter((entity) => isCircularEntity(entity) && pointOnCircularEntity(radiusPoint, entity))
              .filter((entity) => Math.abs(distance(entity.center, radiusPoint) - entity.radius) <=
                Math.max(SNAP_THRESHOLD * 10, entity.radius * 1e-6))
              .sort((first, second) =>
                entityDistanceToPoint(first, radiusPoint) - entityDistanceToPoint(second, radiusPoint))[0]
            : null;
          const center = typeCode === 4
            ? circularSource?.center || (record['13'] !== undefined ? point('13', '23') : point('10', '20'))
            : entityMidpoint({ start: point('10', '20'), end: radiusPoint });
          definitionPoints = [center, radiusPoint];
          if (textPosition) {
            const radialDirection = normalizedVector(center, radiusPoint);
            if (radialDirection) {
              const projectedDistance =
                (textPosition.x - center.x) * radialDirection.x +
                (textPosition.y - center.y) * radialDirection.y;
              placement = {
                x: center.x + radialDirection.x * projectedDistance,
                y: center.y + radialDirection.y * projectedDistance,
                z: coordinateZ(textPosition, coordinateZ(center)),
              };
            }
          }
        }
        else if (typeCode === 2) {
          const firstStart = point('13', '23');
          const firstEnd = point('14', '24');
          const secondStart = point('15', '25');
          const secondEnd = point('16', '26');
          const firstDirection = { x: firstEnd.x - firstStart.x, y: firstEnd.y - firstStart.y };
          const secondDirection = { x: secondEnd.x - secondStart.x, y: secondEnd.y - secondStart.y };
          const vertex = infiniteLineLineIntersection(firstStart, firstDirection, secondStart, secondDirection) || firstStart;
          kind = 'angular';
          definitionPoints = [vertex, firstEnd, secondEnd];
        }
        else {
          const rotation = Number(record['50'] || 0);
          kind = typeCode === 1
            ? 'aligned'
            : Math.abs(Math.abs(rotation) - 90) <= 0.01 ? 'vertical' : 'horizontal';
          definitionPoints = [point('13', '23'), point('14', '24')];
        }
        const styleId = String(record['3'] || '').toLowerCase().replace(/^webcad_/, '');
        if (
          kind &&
          definitionPoints.every((candidate) => Number.isFinite(candidate.x) && Number.isFinite(candidate.y))
        ) {
          entities.push(new DimensionEntity(kind, definitionPoints, placement, {
            ...dxfEntityOptions(record, layerDefinitionMap),
            dimensionStyle: DIMENSION_STYLES[styleId]?.id || 'normal',
            textPosition,
          }));
        }
        continue;
      }

      if (code === '0' && value === 'LINE') {
        const record = {};
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          record[groupCode] = groupValue;
          index += 1;
        }

        const start = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        const end = {
          x: Number(record['11'] || 0),
          y: -Number(record['21'] || 0),
          z: Number(record['31'] || 0),
        };

        if (
          Number.isFinite(start.x) &&
          Number.isFinite(start.y) &&
          Number.isFinite(end.x) &&
          Number.isFinite(end.y)
        ) {
          entities.push(new LineEntity(start, end, dxfEntityOptions(record, layerDefinitionMap)));
        }
        continue;
      }

      if (code === '0' && value === 'XLINE') {
        const record = {};
        index += 1;
        while (index < pairs.length && pairs[index][0] !== '0') {
          record[pairs[index][0]] = pairs[index][1];
          index += 1;
        }
        const basePoint = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        const direction = {
          x: Number(record['11'] || 0),
          y: -Number(record['21'] || 0),
          z: Number(record['31'] || 0),
        };
        if (
          Number.isFinite(basePoint.x) && Number.isFinite(basePoint.y) &&
          Number.isFinite(direction.x) && Number.isFinite(direction.y) &&
          Math.hypot(direction.x, direction.y) > SNAP_THRESHOLD
        ) {
          entities.push(new XLineEntity(
            basePoint,
            direction,
            dxfEntityOptions(record, layerDefinitionMap),
          ));
        }
        continue;
      }

      if (code === '0' && value === 'CIRCLE') {
        const record = {};
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          record[groupCode] = groupValue;
          index += 1;
        }

        const center = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        const radius = Number(record['40'] || 0);

        if (
          Number.isFinite(center.x) &&
          Number.isFinite(center.y) &&
          Number.isFinite(radius) &&
          radius > SNAP_THRESHOLD
        ) {
          entities.push(new CircleEntity(
            center,
            radius,
            dxfEntityOptions(record, layerDefinitionMap),
          ));
        }
        continue;
      }

      if (code === '0' && value === 'ARC') {
        const record = {};
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          record[groupCode] = groupValue;
          index += 1;
        }

        const center = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        const radius = Number(record['40'] || 0);
        const startAngle = dxfDegreesToCanvasAngle(record['51']);
        const endAngle = dxfDegreesToCanvasAngle(record['50']);

        if (
          Number.isFinite(center.x) &&
          Number.isFinite(center.y) &&
          Number.isFinite(radius) &&
          radius > SNAP_THRESHOLD
        ) {
          entities.push(new ArcEntity(
            center,
            radius,
            startAngle,
            endAngle,
            dxfEntityOptions(record, layerDefinitionMap),
          ));
        }
        continue;
      }

      if (code === '0' && value === 'TEXT') {
        const record = {};
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          record[groupCode] = groupValue;
          index += 1;
        }

        const insertionPoint = {
          x: Number(record['10'] || 0),
          y: -Number(record['20'] || 0),
          z: Number(record['30'] || 0),
        };
        const height = Number(record['40'] || 0);
        if (
          Number.isFinite(insertionPoint.x) &&
          Number.isFinite(insertionPoint.y) &&
          Number.isFinite(height) &&
          height > SNAP_THRESHOLD &&
          record['1']
        ) {
          entities.push(new TextEntity(insertionPoint, record['1'], height, {
            ...dxfEntityOptions(record, layerDefinitionMap),
            angle: Number(record['50'] || 0),
          }));
        }
        continue;
      }

      if (code === '0' && value === 'IMAGE') {
        const record = {};
        const imagePairs = [];
        index += 1;
        while (index < pairs.length && pairs[index][0] !== '0') {
          const [groupCode, groupValue] = pairs[index];
          imagePairs.push(pairs[index]);
          record[groupCode] = groupValue;
          index += 1;
        }
        const embedded = parseEmbeddedImageFromDxf(imagePairs);
        if (
          embedded &&
          Number.isFinite(embedded.center.x) && Number.isFinite(embedded.center.y) &&
          Number.isFinite(embedded.width) && embedded.width > SNAP_THRESHOLD &&
          Number.isFinite(embedded.height) && embedded.height > SNAP_THRESHOLD
        ) {
          entities.push(new RasterImageEntity(
            embedded.center,
            embedded.width,
            embedded.height,
            embedded.source,
            {
              ...dxfEntityOptions(record, layerDefinitionMap),
              name: embedded.name,
              rotation: embedded.rotation,
              opacity: embedded.opacity,
              flipX: embedded.flipX,
              flipY: embedded.flipY,
            },
          ));
        }
        continue;
      }

      if (code === '0' && value === 'HATCH') {
        const record = {};
        const hatchPairs = [];
        index += 1;
        while (index < pairs.length) {
          const [groupCode, groupValue] = pairs[index];
          if (groupCode === '0') {
            break;
          }
          hatchPairs.push(pairs[index]);
          record[groupCode] = groupValue;
          index += 1;
        }
        const hatchPattern = String(record['2'] || '').trim().toUpperCase();
        const isSolidHatch = Number(record['70']) === 1 || hatchPattern === 'SOLID';
        if (!isSolidHatch) {
          skippedPatternHatchCount += 1;
          continue;
        }
        const hatchElevation = Number(record['30'] || 0);
        const loops = parseDxfHatchLoops(hatchPairs).map((loop) =>
          loop.map((point) => ({ ...point, z: coordinateZ(point, hatchElevation) })),
        );
        const boundary = loops[0] || [];
        const extentSpan = dxfExtents
          ? Math.max(dxfExtents.maxX - dxfExtents.minX, dxfExtents.maxY - dxfExtents.minY)
          : 0;
        const hatchValidationBounds = dxfExtents
          ? expandBounds(dxfExtents, Math.max(extentSpan * 0.1, 1))
          : null;
        if (boundary.length >= 3 && loops.every((loop) => loop.every((point) =>
          Number.isFinite(point.x) && Number.isFinite(point.y) &&
          (!hatchValidationBounds || (
            point.x >= hatchValidationBounds.minX && point.x <= hatchValidationBounds.maxX &&
            point.y >= hatchValidationBounds.minY && point.y <= hatchValidationBounds.maxY
          ))))) {
          entities.push(new HatchEntity(
            boundary,
            { ...dxfEntityOptions(record, layerDefinitionMap), loops },
          ));
        }
        else {
          skippedHatchCount += 1;
        }
        continue;
      }

      index += 1;
    }

    entities.layerDefinitions = layerDefinitions;
    entities.blockDefinitions = blockDefinitions;
    entities.drawingExtents = dxfExtents;
    entities.skippedHatchCount = skippedHatchCount;
    entities.skippedPatternHatchCount = skippedPatternHatchCount;
    const textHeights = entities
      .filter((entity) => entity.type === 'TEXT' && Number.isFinite(entity.height) && entity.height > 0)
      .map((entity) => entity.height)
      .sort((first, second) => first - second);
    const typicalTextHeight = Number.isFinite(dxfTextSize) && dxfTextSize > 0
      ? dxfTextSize
      : textHeights.length ? textHeights[Math.floor(textHeights.length * 0.5)] : null;
    const looksArchitectural = Number.isFinite(typicalTextHeight) && typicalTextHeight <= 1;
    entities.drawingProfile = dxfInsUnits === DRAWING_PROFILES.architecture.dxfInsUnits || looksArchitectural
      ? 'architecture'
      : dxfInsUnits === DRAWING_PROFILES.engineering.dxfInsUnits ? 'engineering' : null;
    entities.drawingProfileDetected = looksArchitectural &&
      dxfInsUnits !== DRAWING_PROFILES.architecture.dxfInsUnits;
    return entities;
  }


  return { parseDxf };
}

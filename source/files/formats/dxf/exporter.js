/* webCAD - Exportacion DXF | SPDX-License-Identifier: GPL-3.0-or-later */

import { appendEmbeddedImageToDxf, embeddedImageAppId } from '../../../images/dxf.js';
import { coordinateZ } from '../../../coordinates/point3.js';

export function createDxfExporter(dependencies) {
  const {
    DIMENSION_STYLES,
    activeDrawingProfile,
    dimensionGeometry,
    dimensionStyleMetrics,
    entityArcSweep,
    getLineColor,
    getLineStyle,
    getLineType,
    getState,
    normalizeAngle,
    polylineSegmentEntity,
  } = dependencies;

  function canvasAngleToDxfDegrees(angle) {
    return normalizeAngle(-angle) * 180 / Math.PI;
  }

  function appendEntityToDxf(lines, entity, options = {}) {
    if (entity.type === 'LINE') {
      lines.push(
        '0', 'LINE', '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.start.x), '20', String(-entity.start.y), '30', String(coordinateZ(entity.start)),
        '11', String(entity.end.x), '21', String(-entity.end.y), '31', String(coordinateZ(entity.end)),
      );
    }
    if (entity.type === 'XLINE') {
      lines.push(
        '0', 'XLINE', '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.basePoint.x), '20', String(-entity.basePoint.y), '30', String(coordinateZ(entity.basePoint)),
        '11', String(entity.direction.x), '21', String(-entity.direction.y), '31', String(coordinateZ(entity.direction)),
      );
    }
    if (entity.type === 'POLYLINE') {
      lines.push(
        '0', 'LWPOLYLINE', '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '90', String(entity.vertices.length), '70', entity.closed ? '1' : '0',
        '38', String(coordinateZ(entity.vertices[0])),
      );
      entity.vertices.forEach((point, index) => {
        const segment = entity.segments[index];
        let bulge = 0;
        if (segment?.type === 'ARC') {
          const geometry = polylineSegmentEntity(entity, index);
          if (geometry) {
            const direction = geometry.clockwise === false ? 1 : -1;
            bulge = direction * Math.tan(entityArcSweep(geometry) * 0.25);
          }
        }
        lines.push(
          '10', String(point.x), '20', String(-point.y),
          '40', String(segment?.startWidth || 0),
          '41', String(segment?.endWidth || 0),
          '42', String(bulge),
        );
      });
    }
    if (entity.type === 'CIRCLE') {
      lines.push(
        '0', 'CIRCLE', '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x), '20', String(-entity.center.y), '30', String(coordinateZ(entity.center)),
        '40', String(entity.radius),
      );
    }
    if (entity.type === 'ARC') {
      const dxfStartAngle = entity.clockwise === false ? entity.startAngle : entity.endAngle;
      const dxfEndAngle = entity.clockwise === false ? entity.endAngle : entity.startAngle;
      lines.push(
        '0', 'ARC', '8', entity.layer,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x), '20', String(-entity.center.y), '30', String(coordinateZ(entity.center)),
        '40', String(entity.radius),
        '50', String(canvasAngleToDxfDegrees(dxfStartAngle)),
        '51', String(canvasAngleToDxfDegrees(dxfEndAngle)),
      );
    }
    if (entity.type === 'TEXT') {
      lines.push(
        '0', 'TEXT', '8', entity.layer, '7', 'ROMANS',
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '10', String(entity.insertionPoint.x), '20', String(-entity.insertionPoint.y), '30', String(coordinateZ(entity.insertionPoint)),
        '40', String(entity.height), '1', entity.text.replace(/[\r\n]+/g, ' '),
        '50', String(entity.angle),
      );
    }
    if (entity.type === 'HATCH') {
      const loops = entity.loops || [entity.boundary];
      lines.push(
        '0', 'HATCH', '8', entity.layer,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '10', '0', '20', '0', '30', String(coordinateZ(loops[0]?.[0])), '210', '0', '220', '0', '230', '1',
        '2', 'SOLID', '70', '1', '71', '0', '91', String(loops.length),
      );
      loops.forEach((loop, index) => {
        lines.push('92', index === 0 ? '3' : '2', '72', '0', '73', '1', '93', String(loop.length));
        loop.forEach((point) => {
          lines.push('10', String(point.x), '20', String(-point.y));
        });
        lines.push('97', '0');
      });
      lines.push('75', '0', '76', '1', '98', '0');
    }
    if (entity.type === 'IMAGE') {
      appendEmbeddedImageToDxf(lines, entity);
    }
    if (entity.type === 'DIMENSION') {
      const typeCode = {
        horizontal: 0,
        vertical: 0,
        aligned: 1,
        angular: 2,
        diameter: 3,
        radius: 4,
      }[entity.kind] ?? 0;
      const styleName = `WEBCAD_${entity.dimensionStyle.toUpperCase()}`;
      const textPosition = dimensionGeometry(entity).text.point;
      const definitionPoint = entity.kind === 'radius'
        ? entity.points[0]
        : entity.kind === 'diameter'
          ? {
            x: entity.points[0].x * 2 - entity.points[1].x,
            y: entity.points[0].y * 2 - entity.points[1].y,
            z: coordinateZ(entity.points[0]) * 2 - coordinateZ(entity.points[1]),
          }
          : entity.placement;
      lines.push(
        '0', 'DIMENSION',
        '100', 'AcDbEntity',
        '8', entity.layer,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '100', 'AcDbDimension',
        ...(options.dimensionBlockName ? ['2', options.dimensionBlockName] : []),
        '10', String(definitionPoint.x), '20', String(-definitionPoint.y), '30', String(coordinateZ(definitionPoint)),
        '11', String(textPosition.x), '21', String(-textPosition.y), '31', String(coordinateZ(textPosition, coordinateZ(entity.placement))),
        '70', String(32 + typeCode),
        '3', styleName,
        '210', '0', '220', '0', '230', '1',
      );
      if (entity.kind === 'radius' || entity.kind === 'diameter') {
        lines.push(
          '100', entity.kind === 'radius' ? 'AcDbRadialDimension' : 'AcDbDiametricDimension',
          '15', String(entity.points[1].x), '25', String(-entity.points[1].y), '35', String(coordinateZ(entity.points[1])),
          '40', '0',
        );
        if (entity.kind === 'radius') {
          lines.push('13', String(entity.points[0].x), '23', String(-entity.points[0].y), '33', String(coordinateZ(entity.points[0])));
        }
      }
      else if (entity.kind === 'angular') {
        const [vertex, firstRay, secondRay] = entity.points;
        lines.push(
          '100', 'AcDb2LineAngularDimension',
          '13', String(vertex.x), '23', String(-vertex.y), '33', String(coordinateZ(vertex)),
          '14', String(firstRay.x), '24', String(-firstRay.y), '34', String(coordinateZ(firstRay)),
          '15', String(vertex.x), '25', String(-vertex.y), '35', String(coordinateZ(vertex)),
          '16', String(secondRay.x), '26', String(-secondRay.y), '36', String(coordinateZ(secondRay)),
        );
      }
      else {
        lines.push(
          '100', entity.kind === 'aligned' ? 'AcDbAlignedDimension' : 'AcDbRotatedDimension',
          '13', String(entity.points[0].x), '23', String(-entity.points[0].y), '33', String(coordinateZ(entity.points[0])),
          '14', String(entity.points[1].x), '24', String(-entity.points[1].y), '34', String(coordinateZ(entity.points[1])),
        );
        if (entity.kind !== 'aligned') {
          lines.push('50', entity.kind === 'vertical' ? '90' : '0');
        }
      }
    }
    if (entity.type === 'INSERT') {
      lines.push(
        '0', 'INSERT', '8', entity.layer, '2', entity.blockName,
        '6', getLineType(entity.lineType).dxfName,
        '62', String(getLineColor(entity.lineColor).aci || 256),
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.insertionPoint.x),
        '20', String(-entity.insertionPoint.y),
        '30', String(coordinateZ(entity.insertionPoint)),
        '41', String(entity.scaleX),
        '42', String(entity.scaleY),
        '43', '1',
        '50', String(entity.rotation),
      );
    }
  }

  function appendDimensionGraphicsBlock(lines, entity, blockName) {
    const geometry = dimensionGeometry(entity);
    lines.push(
      '0', 'BLOCK', '8', '0', '2', blockName, '70', '1',
      '10', '0', '20', '0', '30', '0', '3', blockName, '1', '',
    );
    geometry.lines.forEach((line) => {
      lines.push(
        '0', 'LINE', '8', entity.layer,
        '10', String(line.start.x), '20', String(-line.start.y), '30', String(coordinateZ(line.start, coordinateZ(entity.placement))),
        '11', String(line.end.x), '21', String(-line.end.y), '31', String(coordinateZ(line.end, coordinateZ(entity.placement))),
      );
    });
    geometry.arcs.forEach((arc) => {
      lines.push(
        '0', 'ARC', '8', entity.layer,
        '10', String(arc.center.x), '20', String(-arc.center.y), '30', String(coordinateZ(arc.center, coordinateZ(entity.placement))),
        '40', String(arc.radius),
        '50', String(canvasAngleToDxfDegrees(arc.endAngle)),
        '51', String(canvasAngleToDxfDegrees(arc.startAngle)),
      );
    });
    geometry.arrows.forEach((arrow) => {
      lines.push(
        '0', 'SOLID', '8', entity.layer,
        '10', String(arrow[0].x), '20', String(-arrow[0].y), '30', String(coordinateZ(arrow[0], coordinateZ(entity.placement))),
        '11', String(arrow[1].x), '21', String(-arrow[1].y), '31', String(coordinateZ(arrow[1], coordinateZ(entity.placement))),
        '12', String(arrow[2].x), '22', String(-arrow[2].y), '32', String(coordinateZ(arrow[2], coordinateZ(entity.placement))),
        '13', String(arrow[2].x), '23', String(-arrow[2].y), '33', String(coordinateZ(arrow[2], coordinateZ(entity.placement))),
      );
    });
    lines.push(
      '0', 'TEXT', '8', entity.layer, '7', 'ROMANS',
      '10', String(geometry.text.point.x), '20', String(-geometry.text.point.y), '30', String(coordinateZ(geometry.text.point, coordinateZ(entity.placement))),
      '40', String(geometry.text.height), '1', geometry.text.value,
      '50', String(-geometry.text.angle * 180 / Math.PI),
      '72', '1', '73', '2',
      '11', String(geometry.text.point.x), '21', String(-geometry.text.point.y), '31', String(coordinateZ(geometry.text.point, coordinateZ(entity.placement))),
      '0', 'ENDBLK', '8', '0',
    );
  }

  function serializeDocumentToDxf(doc) {
    const profile = activeDrawingProfile();
    const dxfLineTypeScale = profile.dxfLineTypeScale;
    const layerMap = new Map(getState().layers.map((layer) => [layer.name, { ...layer }]));
    doc.entities.forEach((entity) => {
      if (!layerMap.has(entity.layer)) {
        layerMap.set(entity.layer, {
          name: entity.layer,
          lineStyle: entity.lineStyle,
          lineType: entity.lineType,
          lineColor: entity.lineColor,
        });
      }
    });
    const layerDefinitions = [...layerMap.values()];
    const topLevelDimensions = doc.topLevelEntities().filter((entity) => entity.type === 'DIMENSION');
    const dimensionBlockNames = new Map(
      topLevelDimensions.map((entity, index) => [entity, `*DWEB${index + 1}`]),
    );
    const lines = [
      '0', 'SECTION',
      '2', 'HEADER',
      '9', '$ACADVER',
      '1', 'AC1015',
      '9', '$INSUNITS',
      '70', String(profile.dxfInsUnits),
      '0', 'ENDSEC',
      '0', 'SECTION',
      '2', 'TABLES',
      '0', 'TABLE',
      '2', 'LTYPE',
      '70', '3',
      '0', 'LTYPE', '2', 'CONTINUOUS', '70', '0', '3', 'Solid line', '72', '65', '73', '0', '40', '0',
      '0', 'LTYPE', '2', 'HIDDEN', '70', '0', '3', 'Hidden __ __', '72', '65', '73', '2', '40', String(9 * dxfLineTypeScale),
      '49', String(6 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0',
      '0', 'LTYPE', '2', 'CENTER', '70', '0', '3', 'Center ____ _ ____', '72', '65', '73', '4', '40', String(17 * dxfLineTypeScale),
      '49', String(10 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0', '49', String(1 * dxfLineTypeScale), '74', '0', '49', String(-3 * dxfLineTypeScale), '74', '0',
      '0', 'ENDTAB',
      '0', 'TABLE',
      '2', 'LAYER',
      '70', String(layerDefinitions.length),
    ];

    layerDefinitions.forEach((layer) => {
      lines.push(
        '0', 'LAYER',
        '2', layer.name,
        '70', '0',
        '62', String(getLineColor(layer.lineColor).aci || 7),
        '6', getLineType(layer.lineType).dxfName,
        '370', String(getLineStyle(layer.lineStyle).dxfLineWeight),
      );
    });
    lines.push(
      '0', 'ENDTAB',
      '0', 'TABLE', '2', 'APPID', '70', '1',
      '0', 'APPID', '2', embeddedImageAppId(), '70', '0',
      '0', 'ENDTAB',
      '0', 'TABLE', '2', 'STYLE', '70', '1',
      '0', 'STYLE', '2', 'ROMANS', '70', '0', '40', '0', '41', '1', '50', '0', '71', '0',
      '42', '2.5', '3', 'romans.shx', '4', '',
      '0', 'ENDTAB',
      '0', 'TABLE', '2', 'DIMSTYLE', '70', String(Object.keys(DIMENSION_STYLES).length),
    );
    const currentState = getState();
    const dimensionPrecision = currentState.dimensionPrecision[currentState.drawingProfile];
    Object.values(DIMENSION_STYLES).forEach((dimensionStyle) => {
      const metrics = dimensionStyleMetrics(dimensionStyle.id);
      lines.push(
        '0', 'DIMSTYLE', '2', `WEBCAD_${dimensionStyle.id.toUpperCase()}`, '70', '0',
        '40', '1',
        '41', String(metrics.arrowSize),
        '42', String(metrics.extensionOffset),
        '44', String(metrics.extensionOvershoot),
        '140', String(metrics.textHeight),
        '147', String(metrics.textGap),
        '176', '256', '177', '256', '178', '256',
        '179', String(dimensionPrecision.angular),
        '271', String(dimensionPrecision.linear), '275', '0',
      );
    });
    lines.push('0', 'ENDTAB', '0', 'ENDSEC');

    lines.push('0', 'SECTION', '2', 'BLOCKS');
    for (const definition of doc.blockDefinitions.values()) {
      lines.push(
        '0', 'BLOCK', '8', '0', '2', definition.name, '70', '0',
        '10', '0', '20', '0', '30', '0', '3', definition.name, '1', '',
      );
      definition.entities.forEach((entity) => appendEntityToDxf(lines, entity));
      lines.push('0', 'ENDBLK', '8', '0');
    }
    dimensionBlockNames.forEach((blockName, entity) => {
      appendDimensionGraphicsBlock(lines, entity, blockName);
    });
    lines.push('0', 'ENDSEC', '0', 'SECTION', '2', 'ENTITIES');

    for (const entity of doc.topLevelEntities()) {
      if (entity.type === 'LINE') {
        lines.push(
          '0', 'LINE',
          '8', entity.layer,
          '6', getLineType(entity.lineType).dxfName,
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
          '10', String(entity.start.x),
          '20', String(-entity.start.y),
          '30', String(coordinateZ(entity.start)),
          '11', String(entity.end.x),
          '21', String(-entity.end.y),
          '31', String(coordinateZ(entity.end)),
        );
      }

      if (entity.type === 'XLINE') {
        appendEntityToDxf(lines, entity);
      }

      if (entity.type === 'POLYLINE') {
        lines.push(
          '0', 'LWPOLYLINE',
          '8', entity.layer,
          '6', getLineType(entity.lineType).dxfName,
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
          '90', String(entity.vertices.length),
          '70', entity.closed ? '1' : '0',
          '38', String(coordinateZ(entity.vertices[0])),
        );
        entity.vertices.forEach((point, index) => {
          const segment = entity.segments[index];
          let bulge = 0;
          if (segment?.type === 'ARC') {
            const geometry = polylineSegmentEntity(entity, index);
            if (geometry) {
              const direction = geometry.clockwise === false ? 1 : -1;
              bulge = direction * Math.tan(entityArcSweep(geometry) * 0.25);
            }
          }
          lines.push(
            '10', String(point.x),
            '20', String(-point.y),
            '40', String(segment?.startWidth || 0),
            '41', String(segment?.endWidth || 0),
            '42', String(bulge),
          );
        });
      }

      if (entity.type === 'CIRCLE') {
        lines.push(
          '0', 'CIRCLE',
          '8', entity.layer,
          '6', getLineType(entity.lineType).dxfName,
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
          '10', String(entity.center.x),
          '20', String(-entity.center.y),
          '30', String(coordinateZ(entity.center)),
          '40', String(entity.radius),
        );
      }

      if (entity.type === 'ARC') {
        const dxfStartAngle = entity.clockwise === false ? entity.startAngle : entity.endAngle;
        const dxfEndAngle = entity.clockwise === false ? entity.endAngle : entity.startAngle;
        lines.push(
          '0', 'ARC',
          '8', entity.layer,
          '6', getLineType(entity.lineType).dxfName,
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
          '10', String(entity.center.x),
          '20', String(-entity.center.y),
          '30', String(coordinateZ(entity.center)),
          '40', String(entity.radius),
          '50', String(canvasAngleToDxfDegrees(dxfStartAngle)),
          '51', String(canvasAngleToDxfDegrees(dxfEndAngle)),
        );
      }

      if (entity.type === 'TEXT') {
        lines.push(
          '0', 'TEXT',
          '8', entity.layer,
          '7', 'ROMANS',
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '10', String(entity.insertionPoint.x),
          '20', String(-entity.insertionPoint.y),
          '30', String(coordinateZ(entity.insertionPoint)),
          '40', String(entity.height),
          '1', entity.text.replace(/[\r\n]+/g, ' '),
          '50', String(entity.angle),
        );
      }

      if (entity.type === 'HATCH') {
        const loops = entity.loops || [entity.boundary];
        lines.push(
          '0', 'HATCH',
          '8', entity.layer,
          '62', String(getLineColor(entity.lineColor).aci || 256),
          '10', '0', '20', '0', '30', String(coordinateZ(loops[0]?.[0])),
          '210', '0', '220', '0', '230', '1',
          '2', 'SOLID',
          '70', '1',
          '71', '0',
          '91', String(loops.length),
        );
        loops.forEach((loop, index) => {
          lines.push('92', index === 0 ? '3' : '2', '72', '0', '73', '1', '93', String(loop.length));
          loop.forEach((point) => {
            lines.push('10', String(point.x), '20', String(-point.y));
          });
          lines.push('97', '0');
        });
        lines.push('75', '0', '76', '1', '98', '0');
      }
      if (entity.type === 'IMAGE') {
        appendEmbeddedImageToDxf(lines, entity);
      }
      if (entity.type === 'INSERT') {
        appendEntityToDxf(lines, entity);
      }
      if (entity.type === 'DIMENSION') {
        appendEntityToDxf(lines, entity, { dimensionBlockName: dimensionBlockNames.get(entity) });
      }
    }

    lines.push('0', 'ENDSEC', '0', 'EOF');
    return lines.join('\n');
  }


  return { serializeDocumentToDxf };
}

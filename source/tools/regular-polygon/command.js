/* webCAD - Orden Poligono regular | SPDX-License-Identifier: GPL-3.0-or-later */

function point3(point) {
  return { x: point.x, y: point.y, z: point.z ?? 0 };
}

export function regularPolygonVertices(center, radiusPoint, sides) {
  const count = Math.trunc(Number(sides));
  if (!center || !radiusPoint || !Number.isFinite(count) || count < 3) {
    return [];
  }
  const radius = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y);
  if (!Number.isFinite(radius) || radius <= 0) {
    return [];
  }
  const startAngle = Math.atan2(radiusPoint.y - center.y, radiusPoint.x - center.x);
  return Array.from({ length: count }, (_, index) => {
    const angle = startAngle + index * Math.PI * 2 / count;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      z: center.z ?? radiusPoint.z ?? 0,
    };
  });
}

export function createRegularPolygonCommand({
  state,
  doc,
  PolylineEntity,
  activeLayerName,
  activeLineColorId,
  activeLineStyleId,
  activeLineTypeId,
  getLineStyle,
  resolvePoint,
  setTool,
  refresh,
  sidesValue,
  snapThreshold,
  formatNumber,
  unitsLabel,
}) {
  function start() {
    setTool('regular-polygon');
    state.regularPolygonDraft = { center: null };
    state.statusText = `Poligono regular ${sidesValue()} lados: indique centro`;
    refresh();
    return true;
  }

  function previewAt(point) {
    const draft = state.regularPolygonDraft;
    if (!draft?.center || !point) return null;
    const radiusPoint = resolvePoint(point, draft.center);
    const vertices = regularPolygonVertices(draft.center, radiusPoint, sidesValue());
    return vertices.length >= 3 ? vertices : null;
  }

  function setCenter(point) {
    if (!point) return false;
    state.regularPolygonDraft = { center: point3(point) };
    state.statusText = `Centro indicado - indique radio y giro · ${sidesValue()} lados`;
    refresh();
    return true;
  }

  function createAt(point) {
    const draft = state.regularPolygonDraft;
    if (!draft?.center || !point) return false;
    const radiusPoint = resolvePoint(point, draft.center);
    const vertices = regularPolygonVertices(draft.center, radiusPoint, sidesValue());
    if (vertices.length < 3) {
      state.statusText = 'Poligono no valido';
      refresh();
      return false;
    }
    const radius = Math.hypot(radiusPoint.x - draft.center.x, radiusPoint.y - draft.center.y);
    if (radius <= snapThreshold) {
      state.statusText = 'Radio no valido';
      refresh();
      return false;
    }
    const style = getLineStyle(activeLineStyleId());
    const segments = vertices.map(() => ({
      type: 'LINE',
      center: null,
      clockwise: true,
      startWidth: 0,
      endWidth: 0,
    }));
    const entity = new PolylineEntity(vertices, segments, {
      closed: true,
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    doc.addEntity(entity);
    setTool('select');
    doc.clearSelection();
    state.statusText = `Poligono regular creado · ${sidesValue()} lados · R${formatNumber(radius)} ${unitsLabel()}`;
    refresh();
    return true;
  }

  function handlePoint(point) {
    if (!state.regularPolygonDraft?.center) {
      return setCenter(point);
    }
    return createAt(point);
  }

  return { start, previewAt, setCenter, createAt, handlePoint };
}

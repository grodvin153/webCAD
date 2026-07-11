/* webCAD - Orden Elipse por ejes | SPDX-License-Identifier: GPL-3.0-or-later */

import { coordinateZ } from '../../coordinates/point3.js';

function ellipseFromAxisPoints(points, tolerance) {
  if (!Array.isArray(points) || points.length < 3) return null;
  const [majorStart, majorEnd, minorPoint] = points;
  const center = {
    x: (majorStart.x + majorEnd.x) * 0.5,
    y: (majorStart.y + majorEnd.y) * 0.5,
    z: (coordinateZ(majorStart) + coordinateZ(majorEnd)) * 0.5,
  };
  const majorDelta = { x: majorEnd.x - majorStart.x, y: majorEnd.y - majorStart.y };
  const majorLength = Math.hypot(majorDelta.x, majorDelta.y);
  if (majorLength <= tolerance * 2) return null;
  const axis = { x: majorDelta.x / majorLength, y: majorDelta.y / majorLength };
  const normal = { x: -axis.y, y: axis.x };
  const radiusY = Math.abs(
    (minorPoint.x - center.x) * normal.x + (minorPoint.y - center.y) * normal.y,
  );
  if (radiusY <= tolerance || radiusY > majorLength * 0.5 + tolerance) return null;
  return { center, radiusX: majorLength * 0.5, radiusY, rotation: Math.atan2(axis.y, axis.x) };
}

export function createEllipseCommand({
  state,
  doc,
  EllipseEntity,
  activeLayerName,
  activeLineColorId,
  activeLineStyleId,
  activeLineTypeId,
  setTool,
  refresh,
  tolerance,
}) {
  function start() {
    setTool('ellipse');
    state.ellipseDraft = { points: [] };
    state.statusText = 'Elipse: indique primer extremo del eje mayor';
    refresh();
    return true;
  }

  function previewAt(point) {
    const points = state.ellipseDraft?.points || [];
    if (points.length < 2 || !point) return null;
    return ellipseFromAxisPoints([...points, point], tolerance);
  }

  function pick(point) {
    if (!state.ellipseDraft) start();
    const points = state.ellipseDraft.points;
    points.push({ ...point });
    if (points.length === 1) {
      state.statusText = 'Elipse: indique segundo extremo del eje mayor';
    }
    else if (points.length === 2) {
      state.statusText = 'Eje mayor indicado - indique semieje menor';
    }
    else {
      const geometry = ellipseFromAxisPoints(points, tolerance);
      if (!geometry) {
        points.pop();
        state.statusText = 'Los ejes de la elipse no son validos';
        refresh();
        return false;
      }
      doc.addEntity(new EllipseEntity(
        geometry.center,
        geometry.radiusX,
        geometry.radiusY,
        geometry.rotation,
        {
          layer: activeLayerName(),
          lineStyle: activeLineStyleId(),
          lineType: activeLineTypeId(),
          lineColor: activeLineColorId(),
        },
      ));
      state.ellipseDraft = null;
      setTool('select');
      state.statusText = 'Elipse creada';
    }
    refresh();
    return true;
  }

  return { start, pick, previewAt, ellipseFromAxisPoints };
}

export { ellipseFromAxisPoints };

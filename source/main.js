const canvas = document.getElementById('cad-canvas');
const selectToolButton = document.getElementById('tool-select');
const lineToolButton = document.getElementById('tool-line');
const circleToolButton = document.getElementById('tool-circle');
const circleToolMenuButton = document.getElementById('tool-circle-menu');
const arcToolButton = document.getElementById('tool-arc');
const arcToolMenuButton = document.getElementById('tool-arc-menu');
const trimToolButton = document.getElementById('tool-trim');
const eraseToolButton = document.getElementById('tool-erase');
const fitButton = document.getElementById('action-fit');
const newButton = document.getElementById('action-new');
const exportDxfButton = document.getElementById('action-export-dxf');
const importDxfButton = document.getElementById('action-import-dxf');
const importDxfInput = document.getElementById('import-dxf-input');
const lineStylePicker = document.querySelector('.line-style-picker');
const lineStyleToggle = document.getElementById('line-style-toggle');
const lineStyleLabel = document.getElementById('line-style-label');
const lineStyleOptionButtons = document.querySelectorAll('[data-line-style]');
const menuCommandButtons = document.querySelectorAll('[data-command]');
const toolGroupElements = document.querySelectorAll('.tool-group');
const toolFlyoutCommandButtons = document.querySelectorAll('.tool-flyout-item[data-command]');
const cursorInput = document.getElementById('cursor-input');
const statusOrthoButton = document.getElementById('status-ortho');
const statusGridButton = document.getElementById('status-grid');
const statusTool = document.getElementById('status-tool');
const statusCursor = document.getElementById('status-cursor');
const statusEntities = document.getElementById('status-entities');
const statusLength = document.getElementById('status-length');
const statusLayer = document.getElementById('status-layer');
const statusMessage = document.getElementById('status-message');
const statusDxf = document.getElementById('status-dxf');

const GRID_BASE = 10;
const CANVAS_SCALE = 2;
const MIN_VIEW_SCALE = 0.05;
const MAX_VIEW_SCALE = 24;
const VIEW_SCALE_FACTOR = 1.15;
const SNAP_THRESHOLD = 0.001;
const FIT_PADDING = 48;
const DEFAULT_DRAWING_SIZE = 200;
const UNITS_LABEL = 'mm';
const BACKGROUND_COLOR = '#f8f7f2';
const LINE_COLOR = '#18262a';
const PREVIEW_COLOR = '#b64d1f';
const SELECTED_COLOR = '#0f5d8c';
const SNAP_COLOR = '#d05a1f';
const SNAP_MARKER_SIZE = 16;
const AXIS_COLOR = 'rgba(30, 90, 99, 0.28)';
const DEFAULT_LINE_STYLE = 'normal';
const TWO_PI = Math.PI * 2;
const LINE_STYLES = {
  auxiliar: {
    id: 'auxiliar',
    label: 'Auxiliar',
    layer: 'AUXILIAR',
    color: '#6f8085',
    width: 2,
    dxfLineWeight: 25,
  },
  normal: {
    id: 'normal',
    label: 'Normal',
    layer: 'NORMAL',
    color: LINE_COLOR,
    width: 4,
    dxfLineWeight: 50,
  },
  gruesa: {
    id: 'gruesa',
    label: 'Gruesa',
    layer: 'GRUESA',
    color: '#111f24',
    width: 7,
    dxfLineWeight: 80,
  },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function snap(value, step = GRID_BASE) {
  return Math.round(value / step) * step;
}

function snapPoint(point, step = GRID_BASE) {
  return {
    x: snap(point.x, step),
    y: snap(point.y, step),
  };
}

function orthoPoint(start, point) {
  const deltaX = point.x - start.x;
  const deltaY = point.y - start.y;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return { x: point.x, y: start.y };
  }
  return { x: start.x, y: point.y };
}

function entityMidpoint(entity) {
  return {
    x: (entity.start.x + entity.end.x) * 0.5,
    y: (entity.start.y + entity.end.y) * 0.5,
  };
}

function lineSegmentIntersection(first, second) {
  const firstDeltaX = first.end.x - first.start.x;
  const firstDeltaY = first.end.y - first.start.y;
  const secondDeltaX = second.end.x - second.start.x;
  const secondDeltaY = second.end.y - second.start.y;
  const denominator = firstDeltaX * secondDeltaY - firstDeltaY * secondDeltaX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = second.start.x - first.start.x;
  const startDeltaY = second.start.y - first.start.y;
  const firstFactor = (startDeltaX * secondDeltaY - startDeltaY * secondDeltaX) / denominator;
  const secondFactor = (startDeltaX * firstDeltaY - startDeltaY * firstDeltaX) / denominator;
  if (
    firstFactor < -SNAP_THRESHOLD ||
    firstFactor > 1 + SNAP_THRESHOLD ||
    secondFactor < -SNAP_THRESHOLD ||
    secondFactor > 1 + SNAP_THRESHOLD
  ) {
    return null;
  }

  return {
    x: first.start.x + firstFactor * firstDeltaX,
    y: first.start.y + firstFactor * firstDeltaY,
  };
}

function lineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return clamp(
    ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared,
    0,
    1,
  );
}

function pointAtLineParameter(entity, parameter) {
  return {
    x: entity.start.x + (entity.end.x - entity.start.x) * parameter,
    y: entity.start.y + (entity.end.y - entity.start.y) * parameter,
  };
}

function closestPointOnLineSegment(entity, point) {
  return pointAtLineParameter(entity, lineParameter(entity, point));
}

function circularParameter(entity, point) {
  const angle = angleOfPoint(entity.center, point);
  if (entity.type === 'CIRCLE') {
    return angleParameter(angle);
  }

  const sweep = arcSweep(entity.startAngle, entity.endAngle);
  if (sweep <= SNAP_THRESHOLD) {
    return 0;
  }
  return clamp(normalizeAngle(angle - entity.startAngle) / sweep, 0, 1);
}

function pointAtCircularParameter(entity, parameter) {
  const angle = entity.type === 'CIRCLE'
    ? parameter * TWO_PI
    : entity.startAngle + arcSweep(entity.startAngle, entity.endAngle) * parameter;
  return pointAtCircleAngle(entity, angle);
}

function uniqueSortedParameters(parameters) {
  const sorted = parameters
    .map((parameter) => clamp(parameter, 0, 1))
    .sort((first, second) => first - second);
  const unique = [];
  for (const parameter of sorted) {
    if (!unique.length || Math.abs(parameter - unique[unique.length - 1]) > SNAP_THRESHOLD) {
      unique.push(parameter);
    }
  }
  return unique;
}

function normalizeAngle(angle) {
  const normalized = angle % TWO_PI;
  return normalized < 0 ? normalized + TWO_PI : normalized;
}

function angleParameter(angle) {
  return normalizeAngle(angle) / TWO_PI;
}

function pointAtCircleAngle(entity, angle) {
  return {
    x: entity.center.x + Math.cos(angle) * entity.radius,
    y: entity.center.y + Math.sin(angle) * entity.radius,
  };
}

function angleOfPoint(center, point) {
  return normalizeAngle(Math.atan2(point.y - center.y, point.x - center.x));
}

function arcSweep(startAngle, endAngle) {
  return normalizeAngle(endAngle - startAngle);
}

function angleInSweep(angle, startAngle, endAngle) {
  return normalizeAngle(angle - startAngle) <= arcSweep(startAngle, endAngle) + SNAP_THRESHOLD;
}

function angleOnArc(angle, entity) {
  if (entity.type === 'CIRCLE') {
    return true;
  }
  return angleInSweep(angle, entity.startAngle, entity.endAngle);
}

function arcMidAngle(entity) {
  return normalizeAngle(entity.startAngle + arcSweep(entity.startAngle, entity.endAngle) * 0.5);
}

function perpendicularFootOnSegment(origin, entity) {
  if (!origin) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return null;
  }

  const factor = (
    (origin.x - entity.start.x) * segmentX +
    (origin.y - entity.start.y) * segmentY
  ) / lengthSquared;
  if (factor < -SNAP_THRESHOLD || factor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  const clampedFactor = clamp(factor, 0, 1);
  return {
    x: entity.start.x + clampedFactor * segmentX,
    y: entity.start.y + clampedFactor * segmentY,
  };
}

function infiniteLineSegmentIntersection(axisPoint, axisDirection, entity) {
  if (!axisPoint || !axisDirection) {
    return null;
  }

  const segmentX = entity.end.x - entity.start.x;
  const segmentY = entity.end.y - entity.start.y;
  const denominator = axisDirection.x * segmentY - axisDirection.y * segmentX;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = entity.start.x - axisPoint.x;
  const startDeltaY = entity.start.y - axisPoint.y;
  const segmentFactor = (startDeltaX * axisDirection.y - startDeltaY * axisDirection.x) / denominator;
  if (segmentFactor < -SNAP_THRESHOLD || segmentFactor > 1 + SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: entity.start.x + segmentFactor * segmentX,
    y: entity.start.y + segmentFactor * segmentY,
  };
}

function distancePointToInfiniteLine(point, linePoint, direction) {
  const length = Math.hypot(direction.x, direction.y);
  if (length <= SNAP_THRESHOLD) {
    return Infinity;
  }
  return Math.abs(
    (point.x - linePoint.x) * direction.y -
    (point.y - linePoint.y) * direction.x
  ) / length;
}

function addSnapCandidate(point, candidate, tolerance, currentBest) {
  const snapDistance = distance(point, candidate.point);
  if (snapDistance > tolerance) {
    return currentBest;
  }

  if (!currentBest || snapDistance < currentBest.distance) {
    return {
      type: candidate.type,
      point: { x: candidate.point.x, y: candidate.point.y },
      distance: snapDistance,
    };
  }

  return currentBest;
}

function circularReferencePoints(entity) {
  if (!entity || !isCircularEntity(entity)) {
    return [];
  }

  if (entity.type === 'ARC') {
    return [
      { type: 'endpoint', point: pointAtCircleAngle(entity, entity.startAngle) },
      { type: 'endpoint', point: pointAtCircleAngle(entity, entity.endAngle) },
      { type: 'midpoint', point: pointAtCircleAngle(entity, arcMidAngle(entity)) },
      { type: 'center', point: entity.center },
    ];
  }

  const candidates = [
    { type: 'center', point: entity.center },
    { type: 'quadrant', point: { x: entity.center.x + entity.radius, y: entity.center.y } },
    { type: 'quadrant', point: { x: entity.center.x, y: entity.center.y + entity.radius } },
    { type: 'quadrant', point: { x: entity.center.x - entity.radius, y: entity.center.y } },
    { type: 'quadrant', point: { x: entity.center.x, y: entity.center.y - entity.radius } },
  ];
  return candidates.filter((candidate) => pointOnCircularEntity(candidate.point, entity));
}

function objectSnapPoint(point, state, options = {}) {
  if (!point || !state.objectSnapEnabled || !state.doc) {
    return null;
  }

  const tolerance = (state.snapPixelTolerance || 10) / state.viewScale;
  let bestSnap = null;
  const lineEntities = state.doc.entities.filter((entity) => entity.type === 'LINE');
  const snapEntities = state.doc.entities.filter((entity) => entity.type === 'LINE' || isCircularEntity(entity));

  for (const entity of lineEntities) {
    const ignoredKey = entity === options.ignoreEntity ? options.ignoreKey : null;
    const candidates = [
      { type: 'endpoint', key: 'start', point: entity.start },
      { type: 'endpoint', key: 'end', point: entity.end },
      { type: 'midpoint', point: entityMidpoint(entity) },
    ].filter((candidate) => candidate.key !== ignoredKey);

    for (const candidate of candidates) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  for (let firstIndex = 0; firstIndex < snapEntities.length - 1; firstIndex += 1) {
    const first = snapEntities[firstIndex];
    if (first === options.ignoreEntity) {
      continue;
    }

    for (let secondIndex = firstIndex + 1; secondIndex < snapEntities.length; secondIndex += 1) {
      const second = snapEntities[secondIndex];
      if (second === options.ignoreEntity) {
        continue;
      }

      for (const intersection of entityIntersectionPoints(first, second)) {
        if (
          options.axisLine &&
          distancePointToInfiniteLine(intersection, options.axisLine.point, options.axisLine.direction) > tolerance
        ) {
          continue;
        }

        bestSnap = addSnapCandidate(
          point,
          { type: 'intersection', point: intersection },
          tolerance,
          bestSnap,
        );
      }
    }
  }

  if (options.axisLine) {
    for (const entity of lineEntities) {
      if (entity === options.ignoreEntity) {
        continue;
      }

      const axisIntersection = infiniteLineSegmentIntersection(
        options.axisLine.point,
        options.axisLine.direction,
        entity,
      );
      if (!axisIntersection) {
        continue;
      }

      bestSnap = addSnapCandidate(
        point,
        { type: 'intersection', point: axisIntersection },
        tolerance,
        bestSnap,
      );
    }
  }

  if (options.origin) {
    for (const entity of lineEntities) {
      if (entity === options.ignoreEntity) {
        continue;
      }

      const perpendicularFoot = perpendicularFootOnSegment(options.origin, entity);
      if (!perpendicularFoot) {
        continue;
      }

      bestSnap = addSnapCandidate(
        point,
        { type: 'perpendicular', point: perpendicularFoot },
        tolerance,
        bestSnap,
      );
    }
  }

  for (const entity of snapEntities) {
    if (entity === options.ignoreEntity) {
      continue;
    }
    if (!isCircularEntity(entity)) {
      continue;
    }

    for (const candidate of circularReferencePoints(entity)) {
      if (
        options.axisLine &&
        distancePointToInfiniteLine(candidate.point, options.axisLine.point, options.axisLine.direction) > tolerance
      ) {
        continue;
      }
      bestSnap = addSnapCandidate(point, candidate, tolerance, bestSnap);
    }
  }

  return bestSnap;
}

function activeDraftOrigin(state) {
  if (state.pendingLineStart) {
    return state.pendingLineStart;
  }
  if (state.circleDraft?.mode === 'center-radius' && state.circleDraft.points.length === 1) {
    return state.circleDraft.points[0];
  }
  if (
    (state.arcDraft?.mode === 'center-radius' || state.arcDraft?.mode === 'center-start-end') &&
    state.arcDraft.points.length >= 1
  ) {
    return state.arcDraft.points[0];
  }
  return null;
}

function resolveCursorPoint(point, state) {
  if (!point) {
    return null;
  }

  const origin = activeDraftOrigin(state);
  const objectSnap = objectSnapPoint(point, state, { origin });
  state.activeObjectSnap = objectSnap;

  let nextPoint = objectSnap
    ? { ...objectSnap.point }
    : state.snapEnabled ? snapPoint(point) : { ...point };
  if (!objectSnap && state.orthoEnabled && origin) {
    nextPoint = orthoPoint(origin, nextPoint);
  }
  return nextPoint;
}

function resolvePointForState(point, state, origin = null, options = {}) {
  if (!point) {
    return null;
  }

  const ignoreEntity = state.selectedGrip?.entity || null;
  const ignoreKey = state.selectedGrip?.key || null;
  const objectSnap = objectSnapPoint(point, state, { ignoreEntity, ignoreKey, origin, ...options });
  state.activeObjectSnap = objectSnap;

  let nextPoint = objectSnap
    ? { ...objectSnap.point }
    : state.snapEnabled ? snapPoint(point) : { ...point };
  if (!objectSnap && state.orthoEnabled && origin) {
    nextPoint = orthoPoint(origin, nextPoint);
  }
  return nextPoint;
}

function parseDistanceInput(value) {
  const normalized = value.replace(',', '.');
  const distanceValue = Number(normalized);
  return Number.isFinite(distanceValue) && distanceValue > 0 ? distanceValue : null;
}

function pointFromDistance(start, directionPoint, distanceValue) {
  const deltaX = directionPoint.x - start.x;
  const deltaY = directionPoint.y - start.y;
  const directionLength = Math.hypot(deltaX, deltaY);
  if (directionLength <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    x: start.x + (deltaX / directionLength) * distanceValue,
    y: start.y + (deltaY / directionLength) * distanceValue,
  };
}

function circleFromThreePoints(first, second, third) {
  const determinant = 2 * (
    first.x * (second.y - third.y) +
    second.x * (third.y - first.y) +
    third.x * (first.y - second.y)
  );

  if (Math.abs(determinant) <= SNAP_THRESHOLD) {
    return null;
  }

  const firstSquared = first.x * first.x + first.y * first.y;
  const secondSquared = second.x * second.x + second.y * second.y;
  const thirdSquared = third.x * third.x + third.y * third.y;
  const center = {
    x: (
      firstSquared * (second.y - third.y) +
      secondSquared * (third.y - first.y) +
      thirdSquared * (first.y - second.y)
    ) / determinant,
    y: (
      firstSquared * (third.x - second.x) +
      secondSquared * (first.x - third.x) +
      thirdSquared * (second.x - first.x)
    ) / determinant,
  };
  const radius = distance(center, first);

  if (!Number.isFinite(radius) || radius <= SNAP_THRESHOLD) {
    return null;
  }

  return { center, radius };
}

function arcFromThreePoints(start, mid, end) {
  const circle = circleFromThreePoints(start, mid, end);
  if (!circle) {
    return null;
  }

  const startAngle = angleOfPoint(circle.center, start);
  const midAngle = angleOfPoint(circle.center, mid);
  const endAngle = angleOfPoint(circle.center, end);
  if (angleInSweep(midAngle, startAngle, endAngle)) {
    return { ...circle, startAngle, endAngle };
  }

  return { ...circle, startAngle: endAngle, endAngle: startAngle };
}

function arcFromCenterStartEnd(center, startPoint, endPoint) {
  const radius = distance(center, startPoint);
  if (radius <= SNAP_THRESHOLD) {
    return null;
  }

  return {
    center,
    radius,
    startAngle: angleOfPoint(center, startPoint),
    endAngle: angleOfPoint(center, endPoint),
  };
}

function pointOnRadiusFromAngle(center, radius, anglePoint) {
  const angle = angleOfPoint(center, anglePoint);
  return pointAtCircleAngle({ center, radius }, angle);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return Math.abs(value) >= 1000
    ? value.toFixed(0)
    : value.toFixed(2).replace(/\.00$/, '');
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function normalizeLineStyleId(value) {
  const normalized = String(value || '').toLowerCase();
  const byLayer = Object.values(LINE_STYLES).find(
    (style) => style.layer.toLowerCase() === normalized,
  );
  if (byLayer) {
    return byLayer.id;
  }
  return LINE_STYLES[normalized] ? normalized : DEFAULT_LINE_STYLE;
}

function lineStyleFromDxf(record) {
  const lineWeight = Number(record['370']);
  if (Number.isFinite(lineWeight) && lineWeight > 0) {
    if (lineWeight <= 37) {
      return 'auxiliar';
    }
    if (lineWeight >= 65) {
      return 'gruesa';
    }
    return 'normal';
  }
  return normalizeLineStyleId(record['8']);
}

function getLineStyle(styleId) {
  return LINE_STYLES[normalizeLineStyleId(styleId)];
}

function activeLineStyleId() {
  return normalizeLineStyleId(state.activeLineStyle);
}

function applyLineStyleToEntity(entity, styleId) {
  const style = getLineStyle(styleId);
  entity.lineStyle = style.id;
  entity.layer = style.layer;
  entity.color = style.color;
}

function gripReferencePoint(selectedGrip) {
  if (!selectedGrip || selectedGrip.entity.type !== 'LINE') {
    return selectedGrip ? selectedGrip.entity[selectedGrip.key] : null;
  }
  return selectedGrip.key === 'start' ? selectedGrip.entity.end : selectedGrip.entity.start;
}

function projectPointToLine(point, linePoint, direction) {
  const lengthSquared = direction.x * direction.x + direction.y * direction.y;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return { ...point };
  }

  const factor = (
    (point.x - linePoint.x) * direction.x +
    (point.y - linePoint.y) * direction.y
  ) / lengthSquared;
  return {
    x: linePoint.x + factor * direction.x,
    y: linePoint.y + factor * direction.y,
  };
}

function distancePointToSegment(point, start, end) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return distance(point, start);
  }

  const projection = clamp(
    ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) / lengthSquared,
    0,
    1,
  );
  const projectedPoint = {
    x: start.x + projection * segmentX,
    y: start.y + projection * segmentY,
  };
  return distance(point, projectedPoint);
}

function distancePointToCircle(point, entity) {
  return Math.abs(distance(point, entity.center) - entity.radius);
}

function distancePointToArc(point, entity) {
  const angle = angleOfPoint(entity.center, point);
  if (angleOnArc(angle, entity)) {
    return Math.abs(distance(point, entity.center) - entity.radius);
  }

  return Math.min(
    distance(point, pointAtCircleAngle(entity, entity.startAngle)),
    distance(point, pointAtCircleAngle(entity, entity.endAngle)),
  );
}

function lineCircleIntersectionPoints(line, circle) {
  const deltaX = line.end.x - line.start.x;
  const deltaY = line.end.y - line.start.y;
  const fromCenterX = line.start.x - circle.center.x;
  const fromCenterY = line.start.y - circle.center.y;
  const a = deltaX * deltaX + deltaY * deltaY;
  const b = 2 * (fromCenterX * deltaX + fromCenterY * deltaY);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - circle.radius * circle.radius;
  const discriminant = b * b - 4 * a * c;

  if (a <= SNAP_THRESHOLD || discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const parameter = -b / (2 * a);
    if (parameter < -SNAP_THRESHOLD || parameter > 1 + SNAP_THRESHOLD) {
      return [];
    }
    return [pointAtLineParameter(line, clamp(parameter, 0, 1))];
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .filter((parameter) => parameter >= -SNAP_THRESHOLD && parameter <= 1 + SNAP_THRESHOLD)
    .map((parameter) => pointAtLineParameter(line, clamp(parameter, 0, 1)));
}

function circleCircleIntersectionPoints(first, second) {
  const centerDistance = distance(first.center, second.center);
  if (
    centerDistance <= SNAP_THRESHOLD ||
    centerDistance > first.radius + second.radius + SNAP_THRESHOLD ||
    centerDistance < Math.abs(first.radius - second.radius) - SNAP_THRESHOLD
  ) {
    return [];
  }

  const a = (
    first.radius * first.radius -
    second.radius * second.radius +
    centerDistance * centerDistance
  ) / (2 * centerDistance);
  const heightSquared = first.radius * first.radius - a * a;
  if (heightSquared < -SNAP_THRESHOLD) {
    return [];
  }

  const baseX = first.center.x + a * (second.center.x - first.center.x) / centerDistance;
  const baseY = first.center.y + a * (second.center.y - first.center.y) / centerDistance;
  if (Math.abs(heightSquared) <= SNAP_THRESHOLD) {
    return [{ x: baseX, y: baseY }];
  }

  const height = Math.sqrt(heightSquared);
  const offsetX = -(second.center.y - first.center.y) * height / centerDistance;
  const offsetY = (second.center.x - first.center.x) * height / centerDistance;
  return [
    { x: baseX + offsetX, y: baseY + offsetY },
    { x: baseX - offsetX, y: baseY - offsetY },
  ];
}

function isCircularEntity(entity) {
  return entity?.type === 'CIRCLE' || entity?.type === 'ARC';
}

function pointOnCircularEntity(point, entity) {
  return entity.type === 'CIRCLE' || angleOnArc(angleOfPoint(entity.center, point), entity);
}

function entityIntersectionPoints(first, second) {
  if (first.type === 'LINE' && second.type === 'LINE') {
    const intersection = lineSegmentIntersection(first, second);
    return intersection ? [intersection] : [];
  }

  if (first.type === 'LINE' && isCircularEntity(second)) {
    return lineCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, second));
  }

  if (isCircularEntity(first) && second.type === 'LINE') {
    return lineCircleIntersectionPoints(second, first)
      .filter((point) => pointOnCircularEntity(point, first));
  }

  if (isCircularEntity(first) && isCircularEntity(second)) {
    return circleCircleIntersectionPoints(first, second)
      .filter((point) => pointOnCircularEntity(point, first) && pointOnCircularEntity(point, second));
  }

  return [];
}

function createBounds(minX, minY, maxX, maxY) {
  return { minX, minY, maxX, maxY };
}

function mergeBounds(current, next) {
  if (!next) {
    return current;
  }
  if (!current) {
    return { ...next };
  }
  return createBounds(
    Math.min(current.minX, next.minX),
    Math.min(current.minY, next.minY),
    Math.max(current.maxX, next.maxX),
    Math.max(current.maxY, next.maxY),
  );
}

class LineEntity {
  constructor(start, end, options = {}) {
    this.type = 'LINE';
    this.start = { x: start.x, y: start.y };
    this.end = { x: end.x, y: end.y };
    applyLineStyleToEntity(this, options.lineStyle || options.layer || DEFAULT_LINE_STYLE);
  }

  bounds() {
    return createBounds(
      Math.min(this.start.x, this.end.x),
      Math.min(this.start.y, this.end.y),
      Math.max(this.start.x, this.end.x),
      Math.max(this.start.y, this.end.y),
    );
  }

  length() {
    return distance(this.start, this.end);
  }
}

class CircleEntity {
  constructor(center, radius, options = {}) {
    this.type = 'CIRCLE';
    this.center = { x: center.x, y: center.y };
    this.radius = radius;
    applyLineStyleToEntity(this, options.lineStyle || options.layer || DEFAULT_LINE_STYLE);
  }

  bounds() {
    return createBounds(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.center.x + this.radius,
      this.center.y + this.radius,
    );
  }

  length() {
    return Math.PI * 2 * this.radius;
  }
}

class ArcEntity {
  constructor(center, radius, startAngle, endAngle, options = {}) {
    this.type = 'ARC';
    this.center = { x: center.x, y: center.y };
    this.radius = radius;
    this.startAngle = normalizeAngle(startAngle);
    this.endAngle = normalizeAngle(endAngle);
    applyLineStyleToEntity(this, options.lineStyle || options.layer || DEFAULT_LINE_STYLE);
  }

  bounds() {
    const points = [
      pointAtCircleAngle(this, this.startAngle),
      pointAtCircleAngle(this, this.endAngle),
    ];
    for (const angle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
      if (angleOnArc(angle, this)) {
        points.push(pointAtCircleAngle(this, angle));
      }
    }

    return createBounds(
      Math.min(...points.map((point) => point.x)),
      Math.min(...points.map((point) => point.y)),
      Math.max(...points.map((point) => point.x)),
      Math.max(...points.map((point) => point.y)),
    );
  }

  length() {
    return this.radius * arcSweep(this.startAngle, this.endAngle);
  }
}

class CadDocument {
  constructor() {
    this.entities = [];
    this.selectedEntity = null;
  }

  clear() {
    this.entities = [];
    this.selectedEntity = null;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  replaceEntity(entity, replacements) {
    const index = this.entities.indexOf(entity);
    if (index < 0) {
      return false;
    }
    this.entities.splice(index, 1, ...replacements);
    if (this.selectedEntity === entity) {
      this.selectedEntity = null;
    }
    return true;
  }

  removeEntity(entity) {
    return this.replaceEntity(entity, []);
  }

  setEntities(entities) {
    this.entities = [...entities];
    this.selectedEntity = null;
  }

  bounds() {
    let bounds = null;
    for (const entity of this.entities) {
      bounds = mergeBounds(bounds, entity.bounds());
    }
    return bounds;
  }

  selectEntity(entity) {
    this.selectedEntity = entity || null;
  }
}

function trimLineEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !entity || entity.type !== 'LINE') {
    return { trimmed: false, keptCount: 0 };
  }

  const breakParameters = [0, 1];
  for (const otherEntity of doc.entities) {
    if (otherEntity === entity) {
      continue;
    }

    for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
      const parameter = lineParameter(entity, intersection);
      if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
        breakParameters.push(parameter);
      }
    }
  }

  const sortedParameters = uniqueSortedParameters(breakParameters);
  if (sortedParameters.length < 2) {
    return { trimmed: false, keptCount: 0 };
  }

  const projectedPick = closestPointOnLineSegment(entity, pickPoint);
  const pickParameter = lineParameter(entity, projectedPick);
  let trimIndex = 0;
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (pickParameter >= sortedParameters[index] - SNAP_THRESHOLD &&
        pickParameter <= sortedParameters[index + 1] + SNAP_THRESHOLD) {
      trimIndex = index;
      break;
    }
  }

  const replacements = [];
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (index === trimIndex) {
      continue;
    }

    const startParameter = sortedParameters[index];
    const endParameter = sortedParameters[index + 1];
    if (endParameter - startParameter <= SNAP_THRESHOLD) {
      continue;
    }

    replacements.push(new LineEntity(
      pointAtLineParameter(entity, startParameter),
      pointAtLineParameter(entity, endParameter),
      { lineStyle: entity.lineStyle },
    ));
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return { trimmed: replaced, keptCount: replacements.length };
}

function createArcFromParameters(entity, startParameter, endParameter) {
  if (entity.type === 'CIRCLE') {
    const startAngle = startParameter * TWO_PI;
    const endAngle = endParameter * TWO_PI;
    if (arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
      return null;
    }
    return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, { lineStyle: entity.lineStyle });
  }

  const sweep = arcSweep(entity.startAngle, entity.endAngle);
  const startAngle = entity.startAngle + sweep * startParameter;
  const endAngle = entity.startAngle + sweep * endParameter;
  if (arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
    return null;
  }
  return new ArcEntity(entity.center, entity.radius, startAngle, endAngle, { lineStyle: entity.lineStyle });
}

function trimCircularEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !isCircularEntity(entity)) {
    return { trimmed: false, keptCount: 0 };
  }

  if (entity.type === 'CIRCLE') {
    const breakParameters = [];
    for (const otherEntity of doc.entities) {
      if (otherEntity === entity) {
        continue;
      }

      for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
        breakParameters.push(circularParameter(entity, intersection));
      }
    }

    const sortedParameters = uniqueSortedParameters(breakParameters);
    if (sortedParameters.length < 2) {
      const removed = doc.removeEntity(entity);
      return { trimmed: removed, keptCount: 0 };
    }

    const pickParameter = circularParameter(entity, pickPoint);
    const intervals = sortedParameters.map((startParameter, index) => {
      const endParameter = sortedParameters[(index + 1) % sortedParameters.length];
      return {
        startParameter,
        endParameter,
        wraps: index === sortedParameters.length - 1,
      };
    });

    const trimIndex = intervals.findIndex((interval) => interval.wraps
      ? pickParameter >= interval.startParameter - SNAP_THRESHOLD ||
        pickParameter <= interval.endParameter + SNAP_THRESHOLD
      : pickParameter >= interval.startParameter - SNAP_THRESHOLD &&
        pickParameter <= interval.endParameter + SNAP_THRESHOLD);

    const replacements = [];
    intervals.forEach((interval, index) => {
      if (index === trimIndex) {
        return;
      }
      const arc = createArcFromParameters(entity, interval.startParameter, interval.endParameter);
      if (arc) {
        replacements.push(arc);
      }
    });

    const replaced = doc.replaceEntity(entity, replacements);
    return { trimmed: replaced, keptCount: replacements.length };
  }

  const breakParameters = [0, 1];
  for (const otherEntity of doc.entities) {
    if (otherEntity === entity) {
      continue;
    }

    for (const intersection of entityIntersectionPoints(entity, otherEntity)) {
      const parameter = circularParameter(entity, intersection);
      if (parameter > SNAP_THRESHOLD && parameter < 1 - SNAP_THRESHOLD) {
        breakParameters.push(parameter);
      }
    }
  }

  const sortedParameters = uniqueSortedParameters(breakParameters);
  const pickParameter = circularParameter(entity, pickPoint);
  let trimIndex = 0;
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (pickParameter >= sortedParameters[index] - SNAP_THRESHOLD &&
        pickParameter <= sortedParameters[index + 1] + SNAP_THRESHOLD) {
      trimIndex = index;
      break;
    }
  }

  const replacements = [];
  for (let index = 0; index < sortedParameters.length - 1; index += 1) {
    if (index === trimIndex) {
      continue;
    }

    const startParameter = sortedParameters[index];
    const endParameter = sortedParameters[index + 1];
    if (endParameter - startParameter <= SNAP_THRESHOLD) {
      continue;
    }

    const arc = createArcFromParameters(entity, startParameter, endParameter);
    if (arc) {
      replacements.push(arc);
    }
  }

  const replaced = doc.replaceEntity(entity, replacements);
  return { trimmed: replaced, keptCount: replacements.length };
}

function canvasAngleToDxfDegrees(angle) {
  return normalizeAngle(-angle) * 180 / Math.PI;
}

function dxfDegreesToCanvasAngle(degrees) {
  return normalizeAngle(-Number(degrees || 0) * Math.PI / 180);
}

function serializeDocumentToDxf(doc) {
  const lines = [
    '0', 'SECTION',
    '2', 'HEADER',
    '9', '$ACADVER',
    '1', 'AC1015',
    '9', '$INSUNITS',
    '70', '4',
    '0', 'ENDSEC',
    '0', 'SECTION',
    '2', 'ENTITIES',
  ];

  for (const entity of doc.entities) {
    if (entity.type === 'LINE') {
      lines.push(
        '0', 'LINE',
        '8', entity.layer,
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.start.x),
        '20', String(-entity.start.y),
        '30', '0',
        '11', String(entity.end.x),
        '21', String(-entity.end.y),
        '31', '0',
      );
    }

    if (entity.type === 'CIRCLE') {
      lines.push(
        '0', 'CIRCLE',
        '8', entity.layer,
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x),
        '20', String(-entity.center.y),
        '30', '0',
        '40', String(entity.radius),
      );
    }

    if (entity.type === 'ARC') {
      lines.push(
        '0', 'ARC',
        '8', entity.layer,
        '370', String(getLineStyle(entity.lineStyle).dxfLineWeight),
        '10', String(entity.center.x),
        '20', String(-entity.center.y),
        '30', '0',
        '40', String(entity.radius),
        '50', String(canvasAngleToDxfDegrees(entity.endAngle)),
        '51', String(canvasAngleToDxfDegrees(entity.startAngle)),
      );
    }
  }

  lines.push('0', 'ENDSEC', '0', 'EOF');
  return lines.join('\n');
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

  const entities = [];
  let index = 0;

  while (index < pairs.length) {
    const [code, value] = pairs[index];
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
      };
      const end = {
        x: Number(record['11'] || 0),
        y: -Number(record['21'] || 0),
      };

      if (
        Number.isFinite(start.x) &&
        Number.isFinite(start.y) &&
        Number.isFinite(end.x) &&
        Number.isFinite(end.y)
      ) {
        entities.push(new LineEntity(start, end, { lineStyle: lineStyleFromDxf(record) }));
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
      };
      const radius = Number(record['40'] || 0);

      if (
        Number.isFinite(center.x) &&
        Number.isFinite(center.y) &&
        Number.isFinite(radius) &&
        radius > SNAP_THRESHOLD
      ) {
        entities.push(new CircleEntity(center, radius, { lineStyle: lineStyleFromDxf(record) }));
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
        entities.push(new ArcEntity(center, radius, startAngle, endAngle, { lineStyle: lineStyleFromDxf(record) }));
      }
      continue;
    }

    index += 1;
  }

  return entities;
}

class CadRenderer {
  constructor(canvas, doc, state) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.doc = doc;
    this.state = state;
  }

  viewportWidth() {
    return this.canvas.width / CANVAS_SCALE;
  }

  viewportHeight() {
    return this.canvas.height / CANVAS_SCALE;
  }

  visibleWorldWidth(scale = this.state.viewScale) {
    return this.viewportWidth() / scale;
  }

  visibleWorldHeight(scale = this.state.viewScale) {
    return this.viewportHeight() / scale;
  }

  worldToScreen(point) {
    return {
      x: (point.x - this.state.viewOffset.x) * this.state.viewScale,
      y: (point.y - this.state.viewOffset.y) * this.state.viewScale,
    };
  }

  screenToWorld(point) {
    return {
      x: point.x / this.state.viewScale + this.state.viewOffset.x,
      y: point.y / this.state.viewScale + this.state.viewOffset.y,
    };
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(Math.round(rect.width * CANVAS_SCALE), 320 * CANVAS_SCALE);
    this.canvas.height = Math.max(Math.round(rect.height * CANVAS_SCALE), 320 * CANVAS_SCALE);
    this.canvas.style.width = `${this.canvas.width / CANVAS_SCALE}px`;
    this.canvas.style.height = `${this.canvas.height / CANVAS_SCALE}px`;

    if (!this.state.hasInitializedView) {
      this.state.hasInitializedView = true;
      this.fitToDefaultDrawing();
    }

    this.draw();
  }

  fitBounds(bounds, padding = FIT_PADDING) {
    const width = Math.max(bounds.maxX - bounds.minX, GRID_BASE * 8);
    const height = Math.max(bounds.maxY - bounds.minY, GRID_BASE * 8);
    const availableWidth = Math.max(this.viewportWidth() - padding * 2, 120);
    const availableHeight = Math.max(this.viewportHeight() - padding * 2, 120);

    this.state.viewScale = clamp(
      Math.min(availableWidth / width, availableHeight / height),
      MIN_VIEW_SCALE,
      MAX_VIEW_SCALE,
    );

    this.state.viewOffset = {
      x: bounds.minX - (this.visibleWorldWidth() - width) * 0.5,
      y: bounds.minY - (this.visibleWorldHeight() - height) * 0.5,
    };
  }

  fitToDefaultDrawing() {
    this.fitBounds(createBounds(0, 0, DEFAULT_DRAWING_SIZE, DEFAULT_DRAWING_SIZE));
  }

  fitToDocument() {
    const bounds = this.doc.bounds();
    if (!bounds) {
      this.fitToDefaultDrawing();
      if (this.state.mouseScreen) {
        this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
      }
      this.draw();
      return;
    }
    this.fitBounds(bounds);

    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
    }

    this.draw();
  }

  zoom(nextScale, anchorScreenPoint) {
    const clampedScale = clamp(nextScale, MIN_VIEW_SCALE, MAX_VIEW_SCALE);
    if (Math.abs(clampedScale - this.state.viewScale) < SNAP_THRESHOLD) {
      return false;
    }

    const anchor = anchorScreenPoint || {
      x: this.viewportWidth() * 0.5,
      y: this.viewportHeight() * 0.5,
    };
    const anchorWorld = this.screenToWorld(anchor);

    this.state.viewScale = clampedScale;
    this.state.viewOffset = {
      x: anchorWorld.x - anchor.x / this.state.viewScale,
      y: anchorWorld.y - anchor.y / this.state.viewScale,
    };

    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.screenToWorld(this.state.mouseScreen);
    }

    this.draw();
    return true;
  }

  drawGrid(ctx) {
    const minorStep = this.computeGridStep();
    const majorStep = minorStep * 5;
    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    const drawGridFamily = (step, color, lineWidth) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      const startX = Math.floor(worldLeft / step) * step;
      for (let x = startX; x <= worldRight + step; x += step) {
        ctx.moveTo(x, worldTop);
        ctx.lineTo(x, worldBottom);
      }

      const startY = Math.floor(worldTop / step) * step;
      for (let y = startY; y <= worldBottom + step; y += step) {
        ctx.moveTo(worldLeft, y);
        ctx.lineTo(worldRight, y);
      }
      ctx.stroke();
    };

    drawGridFamily(minorStep, 'rgba(32, 63, 71, 0.055)', 0.8 / this.state.viewScale);
    drawGridFamily(majorStep, 'rgba(32, 63, 71, 0.12)', 1 / this.state.viewScale);
  }

  computeGridStep() {
    let step = GRID_BASE;
    while (step * this.state.viewScale < 18) {
      step *= 2;
    }
    while (step * this.state.viewScale > 120 && step > GRID_BASE) {
      step /= 2;
    }
    return step;
  }

  drawAxes(ctx) {
    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    ctx.beginPath();
    ctx.strokeStyle = AXIS_COLOR;
    ctx.lineWidth = 1.4 / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.moveTo(0, worldTop);
    ctx.lineTo(0, worldBottom);
    ctx.moveTo(worldLeft, 0);
    ctx.lineTo(worldRight, 0);
    ctx.stroke();
  }

  drawLineStroke(ctx, entity, options) {
    const lineWidth = options.width / this.state.viewScale;
    const length = entity.length();
    if (length <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(entity.start.x, entity.start.y);
    ctx.lineTo(entity.end.x, entity.end.y);
    ctx.stroke();
    ctx.restore();
  }

  drawCircleStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.arc(entity.center.x, entity.center.y, entity.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawArcStroke(ctx, entity, options) {
    if (entity.radius <= SNAP_THRESHOLD) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.arc(entity.center.x, entity.center.y, entity.radius, entity.startAngle, entity.endAngle);
    ctx.stroke();
    ctx.restore();
  }

  drawEntities(ctx) {
    for (const entity of this.doc.entities) {
      if (entity === this.doc.selectedEntity) {
        continue;
      }
      const style = getLineStyle(entity.lineStyle);
      if (entity.type === 'LINE') {
        this.drawLineStroke(ctx, entity, { color: style.color, width: style.width });
      }
      if (entity.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, entity, { color: style.color, width: style.width });
      }
      if (entity.type === 'ARC') {
        this.drawArcStroke(ctx, entity, { color: style.color, width: style.width });
      }
    }

    const selectedEntity = this.doc.selectedEntity;
    if (selectedEntity?.type === 'LINE') {
      const selectedStyle = getLineStyle(selectedEntity.lineStyle);
      this.drawLineStroke(
        ctx,
        selectedEntity,
        { color: SELECTED_COLOR, width: Math.max(3, selectedStyle.width + 1) },
      );
      this.drawLineGrips(ctx, selectedEntity);
    }
    if (selectedEntity?.type === 'CIRCLE') {
      const selectedStyle = getLineStyle(selectedEntity.lineStyle);
      this.drawCircleStroke(
        ctx,
        selectedEntity,
        { color: SELECTED_COLOR, width: Math.max(3, selectedStyle.width + 1) },
      );
      this.drawCircleGrips(ctx, selectedEntity);
    }
    if (selectedEntity?.type === 'ARC') {
      const selectedStyle = getLineStyle(selectedEntity.lineStyle);
      this.drawArcStroke(
        ctx,
        selectedEntity,
        { color: SELECTED_COLOR, width: Math.max(3, selectedStyle.width + 1) },
      );
      this.drawCircleGrips(ctx, selectedEntity);
    }
  }

  drawLineGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;

    for (const key of ['start', 'end']) {
      const point = entity[key];
      const active = this.state.selectedGrip?.entity === entity &&
        this.state.selectedGrip?.key === key;

      ctx.fillStyle = active ? SELECTED_COLOR : '#ffffff';
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawCircleGrips(ctx, entity) {
    const gripSize = 7 / this.state.viewScale;
    ctx.save();
    ctx.strokeStyle = SELECTED_COLOR;
    ctx.lineWidth = 1.5 / this.state.viewScale;
    ctx.fillStyle = '#ffffff';

    for (const candidate of circularReferencePoints(entity)) {
      const point = candidate.point;
      ctx.beginPath();
      ctx.rect(
        point.x - gripSize * 0.5,
        point.y - gripSize * 0.5,
        gripSize,
        gripSize,
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawObjectSnapMarker(ctx) {
    const snap = this.state.activeObjectSnap;
    const visibleForTool = (
      this.state.tool === 'line' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'trim' ||
      Boolean(this.state.selectedGrip)
    );
    if (!snap || !visibleForTool) {
      return;
    }

    const size = SNAP_MARKER_SIZE / this.state.viewScale;
    const point = snap.point;

    ctx.save();
    ctx.strokeStyle = SNAP_COLOR;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.lineWidth = 2.4 / this.state.viewScale;
    ctx.shadowColor = 'rgba(208, 90, 31, 0.28)';
    ctx.shadowBlur = 5 / this.state.viewScale;

    if (snap.type === 'midpoint') {
      const height = size;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - height * 0.62);
      ctx.lineTo(point.x + size * 0.66, point.y + height * 0.46);
      ctx.lineTo(point.x - size * 0.66, point.y + height * 0.46);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    else if (snap.type === 'intersection') {
      const half = size * 0.48;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.moveTo(point.x + half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.stroke();
    }
    else if (snap.type === 'perpendicular') {
      const half = size * 0.42;
      ctx.beginPath();
      ctx.moveTo(point.x - half, point.y - half);
      ctx.lineTo(point.x - half, point.y + half);
      ctx.lineTo(point.x + half, point.y + half);
      ctx.stroke();
    }
    else {
      ctx.beginPath();
      ctx.rect(point.x - size * 0.5, point.y - size * 0.5, size, size);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawPreview(ctx) {
    if (!this.state.mouseWorld) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([10 / this.state.viewScale, 8 / this.state.viewScale]);
    const activeStyle = getLineStyle(activeLineStyleId());
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = activeStyle.width / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.state.pendingLineStart) {
      let endPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (inputDistance !== null) {
        const distancePoint = pointFromDistance(
          this.state.pendingLineStart,
          endPoint,
          inputDistance,
        );
        if (distancePoint) {
          endPoint = distancePoint;
        }
      }

      ctx.moveTo(this.state.pendingLineStart.x, this.state.pendingLineStart.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      ctx.beginPath();
      ctx.arc(this.state.pendingLineStart.x, this.state.pendingLineStart.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.state.circleDraft?.points.length) {
      const previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const points = this.state.circleDraft.points;
      let previewCircle = null;

      if (this.state.circleDraft.mode === 'center-radius' && points.length === 1) {
        const inputDistance = parseDistanceInput(this.state.distanceInput);
        const radius = inputDistance !== null
          ? inputDistance
          : distance(points[0], previewPoint);
        if (radius > SNAP_THRESHOLD) {
          previewCircle = { center: points[0], radius };
        }
      }

      if (this.state.circleDraft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewCircle = circleFromThreePoints(points[0], points[1], previewPoint);
          if (!previewCircle) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.lineTo(previewPoint.x, previewPoint.y);
            ctx.stroke();
          }
        }
      }

      if (previewCircle) {
        ctx.beginPath();
        ctx.arc(previewCircle.center.x, previewCircle.center.y, previewCircle.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (this.state.arcDraft?.points.length) {
      const previewPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const draft = this.state.arcDraft;
      const points = draft.points;
      let previewArc = null;

      if (draft.mode === '3p') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromThreePoints(points[0], points[1], previewPoint);
        }
      }

      if (draft.mode === 'center-start-end') {
        if (points.length === 1) {
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(previewPoint.x, previewPoint.y);
          ctx.stroke();
        }
        if (points.length === 2) {
          previewArc = arcFromCenterStartEnd(points[0], points[1], previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.stroke();
        }
      }

      if (draft.mode === 'center-radius') {
        if (points.length === 1) {
          const inputDistance = parseDistanceInput(this.state.distanceInput);
          const radius = inputDistance !== null
            ? inputDistance
            : distance(points[0], previewPoint);
          if (radius > SNAP_THRESHOLD) {
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, radius, 0, TWO_PI);
            ctx.stroke();
          }
        }
        if (points.length === 2 && draft.radius) {
          const startPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(startPoint.x, startPoint.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(points[0].x, points[0].y, draft.radius, 0, TWO_PI);
          ctx.stroke();
        }
        if (points.length === 3 && draft.radius) {
          const endPoint = pointOnRadiusFromAngle(points[0], draft.radius, previewPoint);
          previewArc = arcFromCenterStartEnd(points[0], points[2], endPoint);
        }
      }

      if (previewArc) {
        ctx.beginPath();
        ctx.arc(
          previewArc.center.x,
          previewArc.center.y,
          previewArc.radius,
          previewArc.startAngle,
          previewArc.endAngle,
        );
        ctx.stroke();
      }

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [...points, previewPoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.setLineDash([]);
    ctx.restore();
  }

  drawGripMovePreview(ctx) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return;
    }

    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance === null) {
      return;
    }

    const origin = this.state.selectedGrip.entity[this.state.selectedGrip.key];
    const referencePoint = gripReferencePoint(this.state.selectedGrip);
    const directionPoint = resolvePointForState(this.state.mouseWorld, this.state, referencePoint);
    const targetPoint = pointFromDistance(origin, directionPoint, inputDistance);
    if (!targetPoint) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6 / this.state.viewScale, 6 / this.state.viewScale]);
    ctx.strokeStyle = PREVIEW_COLOR;
    ctx.lineWidth = 1.8 / this.state.viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(targetPoint.x, targetPoint.y);
    ctx.stroke();
    ctx.restore();
  }

  drawCrosshair(ctx) {
    if (!this.state.mouseWorld || this.state.tool === 'select') {
      return;
    }

    const worldLeft = this.state.viewOffset.x;
    const worldTop = this.state.viewOffset.y;
    const worldRight = worldLeft + this.visibleWorldWidth();
    const worldBottom = worldTop + this.visibleWorldHeight();

    const point = resolveCursorPoint(this.state.mouseWorld, this.state);

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(182, 77, 31, 0.18)';
    ctx.lineWidth = 1 / this.state.viewScale;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.moveTo(point.x, worldTop);
    ctx.lineTo(point.x, worldBottom);
    ctx.moveTo(worldLeft, point.y);
    ctx.lineTo(worldRight, point.y);
    ctx.stroke();
    ctx.restore();
  }

  draw() {
    const ctx = this.ctx;
    const transformScale = CANVAS_SCALE * this.state.viewScale;
    const translateX = -this.state.viewOffset.x * transformScale;
    const translateY = -this.state.viewOffset.y * transformScale;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.setTransform(transformScale, 0, 0, transformScale, translateX, translateY);
    if (this.state.snapEnabled) {
      this.drawGrid(ctx);
    }
    this.drawAxes(ctx);
    this.drawCrosshair(ctx);
    this.drawEntities(ctx);
    this.drawPreview(ctx);
    this.drawGripMovePreview(ctx);
    this.drawObjectSnapMarker(ctx);
  }
}

class CadController {
  constructor(canvas, doc, renderer, state) {
    this.canvas = canvas;
    this.doc = doc;
    this.renderer = renderer;
    this.state = state;
    this.panState = null;
    this.gripDragState = null;

    this.canvas.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    window.addEventListener('pointerup', (event) => this.onPointerUp(event));
    window.addEventListener('pointercancel', (event) => this.onPointerUp(event));
    this.canvas.addEventListener('wheel', (event) => this.onWheel(event), { passive: false });
    this.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
    window.addEventListener('resize', () => this.renderer.resize());
  }

  getMouseScreenPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  updateMouse(event) {
    this.state.mouseScreen = this.getMouseScreenPosition(event);
    this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    return this.state.mouseWorld;
  }

  resolveInputPoint(point) {
    return resolveCursorPoint(point, this.state);
  }

  setTool(tool) {
    this.state.tool = tool;
    this.state.pendingLineStart = null;
    this.state.circleDraft = null;
    this.state.arcDraft = null;
    this.state.distanceInput = '';
    this.state.selectedGrip = null;
    this.state.activeObjectSnap = null;
    this.gripDragState = null;
    if (
      tool === 'line' ||
      tool === 'circle-center' ||
      tool === 'circle-3p' ||
      tool === 'arc-center-radius' ||
      tool === 'arc-3p' ||
      tool === 'arc-center-start-end' ||
      tool === 'trim' ||
      tool === 'erase'
    ) {
      this.doc.selectEntity(null);
    }
    this.state.statusText = tool === 'select'
      ? 'Seleccionar entidad'
      : tool === 'trim'
        ? 'Recortar: pique el tramo a eliminar'
        : tool === 'erase'
          ? 'Borrar: pique una entidad'
          : tool === 'circle-center'
            ? 'Circulo: indique centro'
            : tool === 'circle-3p'
              ? 'Circulo 3 puntos: indique primer punto'
              : tool === 'arc-center-radius'
                ? 'Arco centro-radio: indique centro'
                : tool === 'arc-3p'
                  ? 'Arco 3 puntos: indique primer punto'
                  : tool === 'arc-center-start-end'
                    ? 'Arco centro-inicio-final: indique centro'
                    : 'Linea por dos puntos';
    selectToolButton.classList.toggle('is-active', tool === 'select');
    lineToolButton.classList.toggle('is-active', tool === 'line');
    circleToolButton.classList.toggle('is-active', tool === 'circle-center' || tool === 'circle-3p');
    arcToolButton.classList.toggle(
      'is-active',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    trimToolButton.classList.toggle('is-active', tool === 'trim');
    eraseToolButton.classList.toggle('is-active', tool === 'erase');
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    this.canvas.classList.toggle('is-select-tool', tool === 'select');
    this.canvas.classList.toggle('is-line-tool', tool === 'line');
    this.canvas.classList.toggle('is-circle-tool', tool === 'circle-center' || tool === 'circle-3p');
    this.canvas.classList.toggle(
      'is-arc-tool',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    this.canvas.classList.toggle('is-trim-tool', tool === 'trim');
    this.canvas.classList.toggle('is-erase-tool', tool === 'erase');
    this.updateUiStatus();
    this.renderer.draw();
  }

  findEntityAt(point) {
    const tolerance = 7 / this.state.viewScale;
    for (let index = this.doc.entities.length - 1; index >= 0; index -= 1) {
      const entity = this.doc.entities[index];
      if (entity.type === 'LINE' &&
          distancePointToSegment(point, entity.start, entity.end) <= tolerance) {
        return entity;
      }
      if (entity.type === 'CIRCLE' && distancePointToCircle(point, entity) <= tolerance) {
        return entity;
      }
      if (entity.type === 'ARC' && distancePointToArc(point, entity) <= tolerance) {
        return entity;
      }
    }
    return null;
  }

  findGripAt(point) {
    const tolerance = 8 / this.state.viewScale;
    const candidates = this.doc.selectedEntity
      ? [this.doc.selectedEntity, ...this.doc.entities.filter((entity) => entity !== this.doc.selectedEntity)]
      : this.doc.entities;

    for (const entity of candidates) {
      if (entity.type !== 'LINE') {
        continue;
      }

      for (const key of ['start', 'end']) {
        if (distance(point, entity[key]) <= tolerance) {
          return { entity, key };
        }
      }
    }

    return null;
  }

  activeGripPoint() {
    return this.state.selectedGrip
      ? this.state.selectedGrip.entity[this.state.selectedGrip.key]
      : null;
  }

  activeGripReferencePoint() {
    return gripReferencePoint(this.state.selectedGrip) || this.activeGripPoint();
  }

  resolveGripTarget(point) {
    const axisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    return resolvePointForState(
      point,
      this.state,
      this.activeGripReferencePoint(),
      axisLine ? { axisLine } : {},
    );
  }

  moveSelectedGripTo(point) {
    if (!this.state.selectedGrip || !point) {
      return false;
    }

    const targetPoint = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(point, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : point;
    const target = this.resolveGripTarget(targetPoint);
    if (!target) {
      return false;
    }

    const constrainedTarget = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(target, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : target;
    const gripPoint = this.activeGripPoint();
    gripPoint.x = constrainedTarget.x;
    gripPoint.y = constrainedTarget.y;
    return true;
  }

  moveSelectedGripByDistance(distanceValue) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return false;
    }

    const origin = this.activeGripPoint();
    const directionPoint = this.resolveGripTarget(this.state.mouseWorld);
    const targetPoint = pointFromDistance(origin, directionPoint, distanceValue);
    if (!targetPoint) {
      return false;
    }

    origin.x = targetPoint.x;
    origin.y = targetPoint.y;
    this.state.statusText = `Punto desplazado ${formatNumber(distanceValue)} ${UNITS_LABEL}`;
    return true;
  }

  applyActiveLineStyleToEntity(entity) {
    if (!entity) {
      return false;
    }
    applyLineStyleToEntity(entity, activeLineStyleId());
    return true;
  }

  createLineTo(point, continueFromEnd = false) {
    if (distance(this.state.pendingLineStart, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new LineEntity(this.state.pendingLineStart, point, { lineStyle: style.id }));
    this.state.statusText = `Linea ${style.label.toLowerCase()} creada (${this.doc.entities.length})`;
    this.state.pendingLineStart = continueFromEnd ? point : null;
    return true;
  }

  createCircle(center, radius) {
    if (radius <= SNAP_THRESHOLD) {
      this.state.statusText = 'Radio no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new CircleEntity(center, radius, { lineStyle: style.id }));
    this.state.circleDraft = null;
    this.state.statusText = `Circulo ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${UNITS_LABEL}`;
    return true;
  }

  createArc(center, radius, startAngle, endAngle) {
    if (radius <= SNAP_THRESHOLD || arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Arco no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new ArcEntity(center, radius, startAngle, endAngle, { lineStyle: style.id }));
    this.state.arcDraft = null;
    this.state.statusText = `Arco ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${UNITS_LABEL}`;
    return true;
  }

  handleCirclePoint(point) {
    if (this.state.tool === 'circle-center') {
      if (!this.state.circleDraft) {
        this.state.circleDraft = { mode: 'center-radius', points: [point] };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const center = this.state.circleDraft.points[0];
      const radius = distance(center, point);
      return this.createCircle(center, radius);
    }

    if (this.state.tool === 'circle-3p') {
      const draft = this.state.circleDraft || { mode: '3p', points: [] };

      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.circleDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique segundo punto'
          : 'Segundo punto indicado - indique tercer punto';
        return true;
      }

      const circle = circleFromThreePoints(draft.points[0], draft.points[1], point);
      if (!circle) {
        this.state.statusText = 'Los 3 puntos no definen un circulo';
        return false;
      }

      return this.createCircle(circle.center, circle.radius);
    }

    return false;
  }

  handleArcPoint(point) {
    if (this.state.tool === 'arc-3p') {
      const draft = this.state.arcDraft || { mode: '3p', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique punto de paso'
          : 'Punto de paso indicado - indique punto final';
        return true;
      }

      const arc = arcFromThreePoints(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Los 3 puntos no definen un arco';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-start-end') {
      const draft = this.state.arcDraft || { mode: 'center-start-end', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Centro indicado - indique punto inicial'
          : 'Punto inicial indicado - indique punto final';
        return true;
      }

      const arc = arcFromCenterStartEnd(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-radius') {
      if (!this.state.arcDraft) {
        this.state.arcDraft = { mode: 'center-radius', points: [point], radius: null };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const draft = this.state.arcDraft;
      const center = draft.points[0];
      if (draft.points.length === 1) {
        const radius = distance(center, point);
        if (radius <= SNAP_THRESHOLD) {
          this.state.statusText = 'Radio no valido';
          return false;
        }
        draft.radius = radius;
        draft.points.push(point);
        this.state.statusText = 'Radio indicado - indique punto inicial';
        return true;
      }

      if (draft.points.length === 2) {
        const startPoint = pointOnRadiusFromAngle(center, draft.radius, point);
        draft.points.push(startPoint);
        this.state.statusText = 'Punto inicial indicado - indique punto final';
        return true;
      }

      const endPoint = pointOnRadiusFromAngle(center, draft.radius, point);
      const arc = arcFromCenterStartEnd(center, draft.points[2], endPoint);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    return false;
  }

  handleDistanceInputKey(event) {
    const circleCenterDraft = this.state.circleDraft?.mode === 'center-radius' &&
      this.state.circleDraft.points.length === 1;
    const arcRadiusDraft = this.state.arcDraft?.mode === 'center-radius' &&
      this.state.arcDraft.points.length === 1;
    const radiusDraft = circleCenterDraft || arcRadiusDraft;
    if (!this.state.pendingLineStart && !this.state.selectedGrip && !radiusDraft) {
      return false;
    }

    if (/^[0-9]$/.test(event.key)) {
      this.state.distanceInput += event.key;
      this.state.statusText = radiusDraft
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
      return true;
    }

    if (event.key === '.' || event.key === ',') {
      if (!/[.,]/.test(this.state.distanceInput)) {
        this.state.distanceInput += event.key;
      }
      this.state.statusText = radiusDraft
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
      return true;
    }

    if (event.key === 'Backspace') {
      this.state.distanceInput = this.state.distanceInput.slice(0, -1);
      this.state.statusText = this.state.distanceInput
        ? radiusDraft
          ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
          : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`
        : radiusDraft ? 'Radio pendiente' : 'Segundo punto pendiente';
      return true;
    }

    if (event.key === 'Enter') {
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (this.state.selectedGrip) {
        if (inputDistance !== null && this.moveSelectedGripByDistance(inputDistance)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Distancia o direccion no valida';
        }
        return true;
      }

      if (circleCenterDraft) {
        if (inputDistance !== null && this.createCircle(this.state.circleDraft.points[0], inputDistance)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (arcRadiusDraft) {
        if (inputDistance !== null) {
          const center = this.state.arcDraft.points[0];
          this.state.arcDraft.radius = inputDistance;
          this.state.arcDraft.points.push({ x: center.x + inputDistance, y: center.y });
          this.state.distanceInput = '';
          this.state.statusText = 'Radio indicado - indique punto inicial';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const endPoint = inputDistance !== null && directionPoint
        ? pointFromDistance(this.state.pendingLineStart, directionPoint, inputDistance)
        : null;

      if (endPoint) {
        this.createLineTo(endPoint, true);
        this.state.distanceInput = '';
      }
      else {
        this.state.statusText = 'Distancia o direccion no valida';
      }
      return true;
    }

    return false;
  }

  normalizeWheelDelta(event) {
    const lineMode = typeof WheelEvent === 'undefined' ? 1 : WheelEvent.DOM_DELTA_LINE;
    const pageMode = typeof WheelEvent === 'undefined' ? 2 : WheelEvent.DOM_DELTA_PAGE;
    if (event.deltaMode === lineMode) {
      return { x: event.deltaX * 16, y: event.deltaY * 16 };
    }
    if (event.deltaMode === pageMode) {
      return {
        x: event.deltaX * this.renderer.viewportWidth(),
        y: event.deltaY * this.renderer.viewportHeight(),
      };
    }
    return { x: event.deltaX, y: event.deltaY };
  }

  onPointerDown(event) {
    event.preventDefault();
    this.state.activeLineStyle = activeLineStyleId();
    if (typeof this.canvas.setPointerCapture === 'function') {
      this.canvas.setPointerCapture(event.pointerId);
    }
    const worldPoint = this.updateMouse(event);

    if (event.button === 1) {
      event.preventDefault();
      this.panState = {
        startScreen: { ...this.state.mouseScreen },
        originOffset: { ...this.state.viewOffset },
        dragging: false,
      };
      this.canvas.classList.add('is-panning');
      this.renderer.draw();
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (this.state.tool === 'select') {
      const grip = this.findGripAt(worldPoint);
      if (grip) {
        this.doc.selectEntity(grip.entity);
        this.state.selectedGrip = grip;
        const referencePoint = gripReferencePoint(grip);
        const gripPoint = grip.entity[grip.key];
        this.gripDragState = {
          grip,
          startPoint: { ...gripPoint },
          axisPoint: referencePoint ? { ...referencePoint } : null,
          axisDirection: referencePoint
            ? { x: gripPoint.x - referencePoint.x, y: gripPoint.y - referencePoint.y }
            : null,
        };
        this.state.statusText = `Punto ${grip.key === 'start' ? 'inicial' : 'final'} seleccionado`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      this.doc.selectEntity(entity);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      if (entity) {
        this.applyActiveLineStyleToEntity(entity);
      }
      const activeStyle = getLineStyle(activeLineStyleId());
      const entityLabel = entity?.type === 'CIRCLE'
        ? 'Circulo'
        : entity?.type === 'ARC' ? 'Arco' : 'Linea';
      this.state.statusText = entity
        ? `${entityLabel} seleccionada - capa ${activeStyle.label} - ${formatNumber(entity.length())} ${UNITS_LABEL}`
        : 'Sin seleccion';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'trim') {
      const entity = this.findEntityAt(worldPoint);
      if (!entity) {
        this.state.statusText = 'No hay entidad para recortar';
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const result = entity.type === 'LINE'
        ? trimLineEntityAtPoint(this.doc, entity, worldPoint)
        : trimCircularEntityAtPoint(this.doc, entity, worldPoint);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      this.state.statusText = result.trimmed
        ? `Tramo recortado - quedan ${result.keptCount} tramo${result.keptCount === 1 ? '' : 's'}`
        : 'No se pudo recortar';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'erase') {
      const entity = this.findEntityAt(worldPoint);
      if (!entity) {
        this.state.statusText = 'No hay entidad para borrar';
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const removed = this.doc.removeEntity(entity);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      this.state.statusText = removed
        ? `Entidad borrada (${this.doc.entities.length} restantes)`
        : 'No se pudo borrar';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'circle-center' || this.state.tool === 'circle-3p') {
      const point = this.resolveInputPoint(worldPoint);
      this.handleCirclePoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end'
    ) {
      const point = this.resolveInputPoint(worldPoint);
      this.handleArcPoint(point);
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool !== 'line') {
      return;
    }

    const point = this.resolveInputPoint(worldPoint);
    if (!this.state.pendingLineStart) {
      this.state.pendingLineStart = point;
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    this.createLineTo(point);
    this.state.distanceInput = '';
    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerMove(event) {
    this.updateMouse(event);

    if (this.gripDragState) {
      this.moveSelectedGripTo(this.state.mouseWorld);
      this.state.statusText = this.state.shiftKeyDown
        ? 'Desplazando punto sobre eje de linea'
        : 'Desplazando punto';
    }

    if (this.panState) {
      const deltaX = this.state.mouseScreen.x - this.panState.startScreen.x;
      const deltaY = this.state.mouseScreen.y - this.panState.startScreen.y;
      this.panState.dragging = true;
      this.state.viewOffset = {
        x: this.panState.originOffset.x - deltaX / this.state.viewScale,
        y: this.panState.originOffset.y - deltaY / this.state.viewScale,
      };
      this.canvas.classList.add('is-dragging');
    }

    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerUp(event) {
    if (
      typeof this.canvas.releasePointerCapture === 'function' &&
      this.canvas.hasPointerCapture?.(event.pointerId)
    ) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    if (this.panState) {
      this.panState = null;
      this.canvas.classList.remove('is-panning', 'is-dragging');
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.gripDragState) {
      this.gripDragState = null;
      this.state.statusText = 'Punto desplazado';
      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onWheel(event) {
    event.preventDefault();
    this.updateMouse(event);
    const delta = this.normalizeWheelDelta(event);

    if (event.shiftKey || this.state.shiftKeyDown) {
      const zoomDelta = Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -zoomDelta / 100);
        this.state.statusText = 'Zoom con Shift + dos dedos';
        this.updateUiStatus();
        this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
      }
      return;
    }

    this.state.viewOffset = {
      x: this.state.viewOffset.x + delta.x / this.state.viewScale,
      y: this.state.viewOffset.y + delta.y / this.state.viewScale,
    };
    if (this.state.mouseScreen) {
      this.state.mouseWorld = this.renderer.screenToWorld(this.state.mouseScreen);
    }
    this.state.statusText = 'Pan con dos dedos';
    this.updateUiStatus();
    this.renderer.draw();
  }

  onKeyDown(event) {
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = true;
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
    if (event.key.toLowerCase() === 'l' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      this.setTool('line');
      this.state.statusText = 'Linea por dos puntos';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (event.key.toLowerCase() === 'r' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      this.setTool('trim');
      this.state.statusText = 'Recortar: pique el tramo a eliminar';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      this.setTool('erase');
      this.state.statusText = 'Borrar: pique una entidad';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (this.handleDistanceInputKey(event)) {
      event.preventDefault();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (
        this.state.tool === 'line' ||
        this.state.tool === 'circle-center' ||
        this.state.tool === 'circle-3p' ||
        this.state.tool === 'arc-center-radius' ||
        this.state.tool === 'arc-3p' ||
        this.state.tool === 'arc-center-start-end' ||
        this.state.tool === 'trim' ||
        this.state.tool === 'erase' ||
        this.state.pendingLineStart ||
        this.state.circleDraft ||
        this.state.arcDraft
      ) {
        this.setTool('select');
        this.state.statusText = 'Cancelado';
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      this.state.selectedGrip = null;
      this.doc.selectEntity(null);
      this.state.distanceInput = '';
      this.gripDragState = null;
      this.state.statusText = 'Seleccion limpiada';
      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onKeyUp(event) {
    if (event.key === 'Shift') {
      this.state.shiftKeyDown = false;
      if (this.gripDragState && this.state.mouseWorld) {
        this.moveSelectedGripTo(this.state.mouseWorld);
        this.updateUiStatus();
        this.renderer.draw();
      }
    }
  }

  updateCursorInput() {
    const visible = Boolean(
      (this.state.pendingLineStart || this.state.selectedGrip || this.state.circleDraft || this.state.arcDraft) &&
      this.state.distanceInput &&
      this.state.mouseScreen,
    );

    cursorInput.classList.toggle('is-visible', visible);
    cursorInput.setAttribute('aria-hidden', String(!visible));

    if (!visible) {
      return;
    }

    cursorInput.textContent = `${this.state.distanceInput} ${UNITS_LABEL}`;

    const parentRect = cursorInput.parentElement.getBoundingClientRect();
    const inputRect = cursorInput.getBoundingClientRect();
    const offset = 14;
    const x = clamp(
      this.state.mouseScreen.x + offset,
      4,
      Math.max(4, parentRect.width - inputRect.width - 4),
    );
    const y = clamp(
      this.state.mouseScreen.y + offset,
      4,
      Math.max(4, parentRect.height - inputRect.height - 4),
    );

    cursorInput.style.transform = `translate(${x}px, ${y}px)`;
  }

  updateUiStatus() {
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    let toolLabel = 'Seleccion';
    if (this.state.tool === 'line') {
      toolLabel = 'Linea 2P';
    }
    if (this.state.tool === 'circle-center') {
      toolLabel = 'Circulo C-R';
    }
    if (this.state.tool === 'circle-3p') {
      toolLabel = 'Circulo 3P';
    }
    if (this.state.tool === 'arc-center-radius') {
      toolLabel = 'Arco C-R';
    }
    if (this.state.tool === 'arc-3p') {
      toolLabel = 'Arco 3P';
    }
    if (this.state.tool === 'arc-center-start-end') {
      toolLabel = 'Arco C-I-F';
    }
    if (this.state.tool === 'trim') {
      toolLabel = 'Recortar';
    }
    if (this.state.tool === 'erase') {
      toolLabel = 'Borrar';
    }
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    const activeGripPoint = this.activeGripPoint();
    const activeGripReferencePoint = this.activeGripReferencePoint();
    const activeGripAxisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    const gripDirectionPoint = activeGripPoint
      ? resolvePointForState(
          this.state.mouseWorld,
          this.state,
          activeGripReferencePoint,
          activeGripAxisLine ? { axisLine: activeGripAxisLine } : {},
        )
      : null;
    const previewEnd = inputDistance !== null && this.state.pendingLineStart && cursor
      ? pointFromDistance(this.state.pendingLineStart, cursor, inputDistance)
      : cursor;
    const gripPreviewEnd = inputDistance !== null && activeGripPoint && gripDirectionPoint
      ? pointFromDistance(activeGripPoint, gripDirectionPoint, inputDistance)
      : null;
    const previewLength = this.state.pendingLineStart && previewEnd
      ? distance(this.state.pendingLineStart, previewEnd)
      : this.state.circleDraft?.mode === 'center-radius' && this.state.circleDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.circleDraft.points[0], previewEnd))
      : this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.arcDraft.points[0], previewEnd))
      : gripPreviewEnd && activeGripPoint
        ? distance(activeGripPoint, gripPreviewEnd)
      : null;

    if (this.state.distanceInput) {
      this.state.statusText = (
        this.state.circleDraft?.mode === 'center-radius' ||
        this.state.arcDraft?.mode === 'center-radius'
      )
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
    }
    else if (this.state.pendingLineStart && previewEnd) {
      const lineLength = formatNumber(previewLength);
      this.state.statusText = `Segundo punto pendiente - longitud ${lineLength} ${UNITS_LABEL}`;
    }
    else if (this.state.circleDraft?.mode === 'center-radius' && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${UNITS_LABEL}`;
    }
    else if (this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewLength !== null) {
      this.state.statusText = `Radio pendiente - ${formatNumber(previewLength)} ${UNITS_LABEL}`;
    }
    if (!this.state.statusText) {
      this.state.statusText = 'Listo';
    }

    statusTool.textContent = `Herramienta: ${toolLabel}`;
    statusCursor.textContent = cursor
      ? `Cursor: ${formatNumber(cursor.x)}, ${formatNumber(cursor.y)} ${UNITS_LABEL}`
      : 'Cursor: -';
    statusEntities.textContent = `Entidades: ${this.doc.entities.length}`;
    statusLength.textContent = previewLength !== null
      ? `${this.state.circleDraft?.mode === 'center-radius' || this.state.arcDraft?.mode === 'center-radius' ? 'Radio' : 'Longitud'}: ${formatNumber(previewLength)} ${UNITS_LABEL}`
      : 'Longitud: -';
    statusLayer.textContent = `Capa: ${getLineStyle(activeLineStyleId()).label}`;
    statusMessage.textContent = this.state.statusText || 'Listo';
    statusDxf.textContent = 'DXF: LINE/CIRCLE/ARC';
    statusOrthoButton.classList.toggle('is-active', this.state.orthoEnabled);
    statusOrthoButton.setAttribute('aria-pressed', String(this.state.orthoEnabled));
    statusOrthoButton.title = this.state.orthoEnabled
      ? 'Modo ortogonal activo'
      : 'Modo ortogonal';
    statusGridButton.classList.toggle('is-active', this.state.snapEnabled);
    statusGridButton.setAttribute('aria-pressed', String(this.state.snapEnabled));
    statusGridButton.title = this.state.snapEnabled
      ? 'Snap a rejilla activo'
      : 'Snap a rejilla desactivado';
    this.updateCursorInput();
  }
}

const doc = new CadDocument();
const state = {
  tool: 'select',
  pendingLineStart: null,
  circleDraft: null,
  arcDraft: null,
  mouseWorld: null,
  mouseScreen: null,
  viewScale: 1,
  viewOffset: { x: 0, y: 0 },
  snapEnabled: true,
  orthoEnabled: false,
  distanceInput: '',
  selectedGrip: null,
  objectSnapEnabled: true,
  activeObjectSnap: null,
  snapPixelTolerance: 11,
  activeLineStyle: DEFAULT_LINE_STYLE,
  lastCircleTool: 'circle-center',
  lastArcTool: 'arc-center-start-end',
  doc: null,
  hasInitializedView: false,
  shiftKeyDown: false,
  statusText: 'Listo',
};

const renderer = new CadRenderer(canvas, doc, state);
const controller = new CadController(canvas, doc, renderer, state);
state.doc = doc;

window.webcadDebug = { doc, state, renderer, controller };

function toggleOrthoMode() {
  state.orthoEnabled = !state.orthoEnabled;
  state.statusText = state.orthoEnabled ? 'Modo ortogonal activo' : 'Modo libre';
  controller.updateUiStatus();
  renderer.draw();
}

function toggleGridSnap() {
  state.snapEnabled = !state.snapEnabled;
  state.statusText = state.snapEnabled ? 'Snap a rejilla activo' : 'Snap a rejilla desactivado';
  controller.updateUiStatus();
  renderer.draw();
}

function fitView() {
  state.statusText = 'Vista ajustada';
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
}

function newDrawing() {
  doc.clear();
  state.pendingLineStart = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.distanceInput = '';
  state.selectedGrip = null;
  state.statusText = 'Nuevo dibujo';
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
}

function exportDxf() {
  const dxf = serializeDocumentToDxf(doc);
  const blob = new Blob([dxf], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'drawing.dxf';
  link.click();
  URL.revokeObjectURL(url);
  state.statusText = `Exportadas ${doc.entities.length} entidades DXF`;
  renderer.draw();
}

function importDxf() {
  importDxfInput.value = '';
  importDxfInput.click();
}

function showAbout() {
  state.statusText = 'webCAD - Autor: Gonzalo Rodriguez';
  controller.updateUiStatus();
  renderer.draw();
}

function setLineStylePickerOpen(open) {
  lineStylePicker.classList.toggle('is-open', open);
  lineStyleToggle.setAttribute('aria-expanded', String(open));
}

function syncLineStylePicker() {
  const style = getLineStyle(state.activeLineStyle);
  lineStyleLabel.textContent = style.label;
  lineStyleOptionButtons.forEach((button) => {
    const active = normalizeLineStyleId(button.dataset.lineStyle) === style.id;
    button.classList.toggle('is-active', active);
  });
}

function setActiveLineStyle(styleId) {
  const style = getLineStyle(styleId);
  state.activeLineStyle = style.id;
  syncLineStylePicker();

  const selectedEntity = state.selectedGrip?.entity || doc.selectedEntity;
  if (state.tool === 'select' && selectedEntity) {
    applyLineStyleToEntity(selectedEntity, style.id);
    state.statusText = `Entidad cambiada a capa ${style.label}`;
  }
  else {
    state.statusText = `Capa activa: ${style.label}`;
  }

  controller.updateUiStatus();
  renderer.draw();
  setLineStylePickerOpen(false);
  lineStyleToggle.blur();
  requestAnimationFrame(() => canvas.focus({ preventScroll: true }));
}

function setToolGroupOpen(groupElement, open) {
  toolGroupElements.forEach((element) => {
    const shouldOpen = element === groupElement && open;
    element.classList.toggle('is-open', shouldOpen);
    element.querySelector('.tool-menu-button')?.setAttribute('aria-expanded', String(shouldOpen));
  });
}

function closeToolGroups() {
  setToolGroupOpen(null, false);
}

function runCommand(command) {
  if (command === 'select') controller.setTool('select');
  if (command === 'line') controller.setTool('line');
  if (command === 'circle-center' || command === 'circle-3p') {
    state.lastCircleTool = command;
    circleToolButton.dataset.tool = command;
    controller.setTool(command);
  }
  if (
    command === 'arc-center-radius' ||
    command === 'arc-3p' ||
    command === 'arc-center-start-end'
  ) {
    state.lastArcTool = command;
    arcToolButton.dataset.tool = command;
    controller.setTool(command);
  }
  if (command === 'trim') controller.setTool('trim');
  if (command === 'erase') controller.setTool('erase');
  if (command === 'toggle-ortho') toggleOrthoMode();
  if (command === 'toggle-grid') toggleGridSnap();
  if (command === 'fit') fitView();
  if (command === 'new') newDrawing();
  if (command === 'export-dxf') exportDxf();
  if (command === 'import-dxf') importDxf();
  if (command === 'about') showAbout();
  if (!command.startsWith('toggle-')) {
    closeToolGroups();
  }
}

menuCommandButtons.forEach((button) => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});

statusOrthoButton.addEventListener('click', () => runCommand('toggle-ortho'));
statusGridButton.addEventListener('click', () => runCommand('toggle-grid'));
selectToolButton.addEventListener('click', () => runCommand('select'));
lineToolButton.addEventListener('click', () => runCommand('line'));
circleToolButton.addEventListener('click', () => runCommand(state.lastCircleTool));
circleToolMenuButton.addEventListener('click', (event) => {
  event.stopPropagation();
  setToolGroupOpen(circleToolMenuButton.closest('.tool-group'), !circleToolMenuButton.closest('.tool-group').classList.contains('is-open'));
});
arcToolButton.addEventListener('click', () => runCommand(state.lastArcTool));
arcToolMenuButton.addEventListener('click', (event) => {
  event.stopPropagation();
  setToolGroupOpen(arcToolMenuButton.closest('.tool-group'), !arcToolMenuButton.closest('.tool-group').classList.contains('is-open'));
});
toolFlyoutCommandButtons.forEach((button) => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});
trimToolButton.addEventListener('click', () => runCommand('trim'));
eraseToolButton.addEventListener('click', () => runCommand('erase'));
fitButton.addEventListener('click', () => runCommand('fit'));
newButton.addEventListener('click', () => runCommand('new'));
exportDxfButton.addEventListener('click', () => runCommand('export-dxf'));
importDxfButton.addEventListener('click', () => runCommand('import-dxf'));
lineStyleToggle.addEventListener('click', () => {
  setLineStylePickerOpen(!lineStylePicker.classList.contains('is-open'));
});
lineStyleOptionButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveLineStyle(button.dataset.lineStyle);
  });
});
document.addEventListener('pointerdown', (event) => {
  if (!lineStylePicker.contains(event.target)) {
    setLineStylePickerOpen(false);
  }
  if (![...toolGroupElements].some((element) => element.contains(event.target))) {
    closeToolGroups();
  }
});

importDxfInput.addEventListener('change', async (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const text = await file.text();
  const entities = parseDxf(text);
  doc.setEntities(entities);
  state.pendingLineStart = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.distanceInput = '';
  state.selectedGrip = null;
  state.statusText = `Importadas ${entities.length} entidades DXF`;
  renderer.fitToDocument();
  controller.updateUiStatus();
  renderer.draw();
});

renderer.resize();
syncLineStylePicker();
controller.setTool('select');

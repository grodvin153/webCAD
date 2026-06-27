const canvas = document.getElementById('cad-canvas');
const selectToolButton = document.getElementById('tool-select');
const lineToolButton = document.getElementById('tool-line');
const rectangleToolButton = document.getElementById('tool-rectangle');
const circleToolButton = document.getElementById('tool-circle');
const circleToolMenuButton = document.getElementById('tool-circle-menu');
const arcToolButton = document.getElementById('tool-arc');
const arcToolMenuButton = document.getElementById('tool-arc-menu');
const trimToolButton = document.getElementById('tool-trim');
const extendToolButton = document.getElementById('tool-extend');
const copyToolButton = document.getElementById('tool-copy');
const moveToolButton = document.getElementById('tool-move');
const eraseToolButton = document.getElementById('tool-erase');
const fitButton = document.getElementById('action-fit');
const undoButton = document.getElementById('action-undo');
const redoButton = document.getElementById('action-redo');
const newButton = document.getElementById('action-new');
const exportDxfButton = document.getElementById('action-export-dxf');
const importDxfButton = document.getElementById('action-import-dxf');
const importDxfInput = document.getElementById('import-dxf-input');
const lineStylePicker = document.querySelector('.line-style-picker');
const lineStyleToggle = document.getElementById('line-style-toggle');
const lineStyleLabel = document.getElementById('line-style-label');
const lineStyleOptionButtons = document.querySelectorAll('[data-line-style]');
const menuCommandButtons = document.querySelectorAll('[data-command]');
const undoCommandButtons = document.querySelectorAll('[data-command="undo"]');
const redoCommandButtons = document.querySelectorAll('[data-command="redo"]');
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
const SPATIAL_CELL_SIZE = 100;
const SPATIAL_MAX_ENTITY_CELLS = 256;
const SPATIAL_MAX_QUERY_CELLS = 12000;
const HISTORY_LIMIT = 50;
const REPEATABLE_COMMANDS = new Set([
  'line',
  'rectangle',
  'circle-center',
  'circle-3p',
  'arc-center-radius',
  'arc-3p',
  'arc-center-start-end',
  'copy',
  'move',
  'trim',
  'extend',
  'erase',
]);
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
let nextEntityGroupId = 1;

function createEntityGroupId(prefix = 'group') {
  const id = `${prefix}-${nextEntityGroupId}`;
  nextEntityGroupId += 1;
  return id;
}

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

function offsetPoint(point, vector) {
  return {
    x: point.x + vector.x,
    y: point.y + vector.y,
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

function rawLineParameter(entity, point) {
  const deltaX = entity.end.x - entity.start.x;
  const deltaY = entity.end.y - entity.start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared <= SNAP_THRESHOLD) {
    return 0;
  }
  return ((point.x - entity.start.x) * deltaX + (point.y - entity.start.y) * deltaY) / lengthSquared;
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

function infiniteLineLineIntersection(firstPoint, firstDirection, secondPoint, secondDirection) {
  if (!firstPoint || !firstDirection || !secondPoint || !secondDirection) {
    return null;
  }

  const denominator = firstDirection.x * secondDirection.y - firstDirection.y * secondDirection.x;
  if (Math.abs(denominator) <= SNAP_THRESHOLD) {
    return null;
  }

  const startDeltaX = secondPoint.x - firstPoint.x;
  const startDeltaY = secondPoint.y - firstPoint.y;
  const firstFactor = (startDeltaX * secondDirection.y - startDeltaY * secondDirection.x) / denominator;
  return {
    x: firstPoint.x + firstDirection.x * firstFactor,
    y: firstPoint.y + firstDirection.y * firstFactor,
  };
}

function infiniteLineCircularIntersectionPoints(axisPoint, axisDirection, entity, respectArc = true) {
  if (!axisPoint || !axisDirection || !isCircularEntity(entity)) {
    return [];
  }

  const a = axisDirection.x * axisDirection.x + axisDirection.y * axisDirection.y;
  if (a <= SNAP_THRESHOLD) {
    return [];
  }

  const fromCenterX = axisPoint.x - entity.center.x;
  const fromCenterY = axisPoint.y - entity.center.y;
  const b = 2 * (fromCenterX * axisDirection.x + fromCenterY * axisDirection.y);
  const c = fromCenterX * fromCenterX + fromCenterY * fromCenterY - entity.radius * entity.radius;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < -SNAP_THRESHOLD) {
    return [];
  }

  if (Math.abs(discriminant) <= SNAP_THRESHOLD) {
    const factor = -b / (2 * a);
    return [{
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }].filter((point) => !respectArc || pointOnCircularEntity(point, entity));
  }

  const root = Math.sqrt(discriminant);
  return [
    (-b - root) / (2 * a),
    (-b + root) / (2 * a),
  ]
    .map((factor) => ({
      x: axisPoint.x + axisDirection.x * factor,
      y: axisPoint.y + axisDirection.y * factor,
    }))
    .filter((point) => !respectArc || pointOnCircularEntity(point, entity));
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
  const cursorBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
  const snapEntities = state.doc
    .queryBounds(cursorBounds)
    .filter((entity) => entity.type === 'LINE' || isCircularEntity(entity));
  const nearbySnapEntities = snapEntities.filter((entity) =>
    entity !== options.ignoreEntity && entityIsNearPoint(entity, point, tolerance),
  );
  const lineEntities = snapEntities.filter((entity) => entity.type === 'LINE');
  const nearbyLineEntities = nearbySnapEntities.filter((entity) => entity.type === 'LINE');

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

  for (let firstIndex = 0; firstIndex < nearbySnapEntities.length - 1; firstIndex += 1) {
    const first = nearbySnapEntities[firstIndex];

    for (let secondIndex = firstIndex + 1; secondIndex < nearbySnapEntities.length; secondIndex += 1) {
      const second = nearbySnapEntities[secondIndex];
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
    for (const entity of nearbyLineEntities) {
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
    for (const entity of nearbyLineEntities) {
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
  if (state.rectangleDraft?.firstPoint) {
    return state.rectangleDraft.firstPoint;
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
  if (state.copyDraft?.basePoint) {
    return state.copyDraft.basePoint;
  }
  if (state.moveDraft?.basePoint) {
    return state.moveDraft.basePoint;
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

function parseRelativeCoordinateInput(value) {
  const match = value.trim().match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))$/);
  if (!match) {
    return null;
  }

  const x = Number(match[1]);
  const y = Number(match[2]);
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
}

function pointFromRelativeCoordinates(origin, value) {
  const relative = parseRelativeCoordinateInput(value);
  return relative && origin
    ? { x: origin.x + relative.x, y: origin.y + relative.y }
    : null;
}

function parseCopyMultiplier(value) {
  const match = value.trim().match(/^x(\d+)$/i);
  if (!match) {
    return null;
  }

  const count = Number(match[1]);
  return Number.isInteger(count) && count >= 2 ? count : null;
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

function formatSnapType(type) {
  if (type === 'endpoint') {
    return 'Punto final';
  }
  if (type === 'midpoint') {
    return 'Punto medio';
  }
  if (type === 'intersection') {
    return 'Interseccion';
  }
  if (type === 'perpendicular') {
    return 'Perpendicular';
  }
  if (type === 'center') {
    return 'Centro';
  }
  if (type === 'quadrant') {
    return 'Cuadrante';
  }
  return 'Snap';
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

function lineFullCircleIntersectionPoints(line, circularEntity) {
  const direction = {
    x: line.end.x - line.start.x,
    y: line.end.y - line.start.y,
  };
  return infiniteLineCircularIntersectionPoints(line.start, direction, circularEntity, false);
}

function fullCircleBoundaryIntersectionPoints(circularEntity, boundary) {
  if (!isCircularEntity(circularEntity) || !boundary || boundary === circularEntity) {
    return [];
  }

  if (boundary.type === 'LINE') {
    return lineFullCircleIntersectionPoints(boundary, circularEntity);
  }

  if (isCircularEntity(boundary)) {
    return circleCircleIntersectionPoints(circularEntity, boundary);
  }

  return [];
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

function normalizeBoundsFromPoints(first, second) {
  return createBounds(
    Math.min(first.x, second.x),
    Math.min(first.y, second.y),
    Math.max(first.x, second.x),
    Math.max(first.y, second.y),
  );
}

function boundsContainsBounds(container, candidate) {
  return candidate.minX >= container.minX - SNAP_THRESHOLD &&
    candidate.maxX <= container.maxX + SNAP_THRESHOLD &&
    candidate.minY >= container.minY - SNAP_THRESHOLD &&
    candidate.maxY <= container.maxY + SNAP_THRESHOLD;
}

function boundsIntersectsBounds(first, second) {
  return first.minX <= second.maxX + SNAP_THRESHOLD &&
    first.maxX >= second.minX - SNAP_THRESHOLD &&
    first.minY <= second.maxY + SNAP_THRESHOLD &&
    first.maxY >= second.minY - SNAP_THRESHOLD;
}

function expandBounds(bounds, padding) {
  return createBounds(
    bounds.minX - padding,
    bounds.minY - padding,
    bounds.maxX + padding,
    bounds.maxY + padding,
  );
}

function offsetBounds(bounds, vector) {
  return createBounds(
    bounds.minX + vector.x,
    bounds.minY + vector.y,
    bounds.maxX + vector.x,
    bounds.maxY + vector.y,
  );
}

function boundsContainsPoint(bounds, point) {
  return point.x >= bounds.minX - SNAP_THRESHOLD &&
    point.x <= bounds.maxX + SNAP_THRESHOLD &&
    point.y >= bounds.minY - SNAP_THRESHOLD &&
    point.y <= bounds.maxY + SNAP_THRESHOLD;
}

function entityDistanceToPoint(entity, point) {
  if (entity.type === 'LINE') {
    return distancePointToSegment(point, entity.start, entity.end);
  }
  if (entity.type === 'CIRCLE') {
    return distancePointToCircle(point, entity);
  }
  if (entity.type === 'ARC') {
    return distancePointToArc(point, entity);
  }
  return Infinity;
}

function entityIsNearPoint(entity, point, tolerance) {
  if (!boundsContainsPoint(expandBounds(entity.bounds(), tolerance), point)) {
    return false;
  }
  return entityDistanceToPoint(entity, point) <= tolerance;
}

function selectionWindowMode(selectionWindow) {
  return selectionWindow.currentWorld.x >= selectionWindow.startWorld.x ? 'window' : 'capture';
}

class LineEntity {
  constructor(start, end, options = {}) {
    this.type = 'LINE';
    this.start = { x: start.x, y: start.y };
    this.end = { x: end.x, y: end.y };
    this.groupId = options.groupId || null;
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
    this.groupId = options.groupId || null;
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
    this.groupId = options.groupId || null;
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

function cloneEntityWithOffset(entity, vector, options = {}) {
  const groupId = Object.prototype.hasOwnProperty.call(options, 'groupId') ? options.groupId : entity.groupId;
  if (entity.type === 'LINE') {
    return new LineEntity(
      offsetPoint(entity.start, vector),
      offsetPoint(entity.end, vector),
      { lineStyle: entity.lineStyle, groupId },
    );
  }

  if (entity.type === 'CIRCLE') {
    return new CircleEntity(
      offsetPoint(entity.center, vector),
      entity.radius,
      { lineStyle: entity.lineStyle, groupId },
    );
  }

  if (entity.type === 'ARC') {
    return new ArcEntity(
      offsetPoint(entity.center, vector),
      entity.radius,
      entity.startAngle,
      entity.endAngle,
      { lineStyle: entity.lineStyle, groupId },
    );
  }

  return null;
}

function cloneEntity(entity) {
  return cloneEntityWithOffset(entity, { x: 0, y: 0 });
}

function cloneEntitiesWithOffset(entities, vector, options = {}) {
  const groupMap = new Map();
  return entities
    .map((entity) => {
      let groupId = entity.groupId || null;
      if (options.remapGroups && groupId) {
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, createEntityGroupId('polyline'));
        }
        groupId = groupMap.get(groupId);
      }
      return cloneEntityWithOffset(entity, vector, { groupId });
    })
    .filter(Boolean);
}

function moveEntityByVector(entity, vector) {
  if (entity.type === 'LINE') {
    entity.start = offsetPoint(entity.start, vector);
    entity.end = offsetPoint(entity.end, vector);
    return true;
  }

  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    entity.center = offsetPoint(entity.center, vector);
    return true;
  }

  return false;
}

class CadDocument {
  constructor() {
    this.entities = [];
    this.selectedEntity = null;
    this.selectedEntities = new Set();
    this.cachedBounds = null;
    this.boundsDirty = true;
    this.spatialDirty = true;
    this.spatialCells = new Map();
    this.spatialOverflow = new Set();
    this.spatialBounds = new Map();
    this.spatialOrder = new Map();
    this.undoStack = [];
    this.redoStack = [];
  }

  markDirty() {
    this.boundsDirty = true;
    this.spatialDirty = true;
  }

  snapshot() {
    return this.entities.map((entity) => cloneEntity(entity)).filter(Boolean);
  }

  restoreSnapshot(snapshot) {
    this.entities = snapshot.map((entity) => cloneEntity(entity)).filter(Boolean);
    this.clearSelection();
    this.markDirty();
  }

  recordHistory() {
    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > HISTORY_LIMIT) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  undo() {
    if (!this.canUndo()) {
      return false;
    }

    this.redoStack.push(this.snapshot());
    this.restoreSnapshot(this.undoStack.pop());
    return true;
  }

  redo() {
    if (!this.canRedo()) {
      return false;
    }

    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > HISTORY_LIMIT) {
      this.undoStack.shift();
    }
    this.restoreSnapshot(this.redoStack.pop());
    return true;
  }

  clear(options = {}) {
    if (options.recordHistory !== false && this.entities.length) {
      this.recordHistory();
    }
    this.entities = [];
    this.clearSelection();
    this.markDirty();
  }

  addEntity(entity, options = {}) {
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.push(entity);
    this.markDirty();
  }

  addEntities(entities, options = {}) {
    const validEntities = entities.filter(Boolean);
    if (!validEntities.length) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.push(...validEntities);
    this.markDirty();
    return true;
  }

  replaceEntity(entity, replacements, options = {}) {
    const index = this.entities.indexOf(entity);
    if (index < 0) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities.splice(index, 1, ...replacements);
    if (this.selectedEntities.has(entity)) {
      this.selectedEntities.delete(entity);
      replacements.forEach((replacement) => this.selectedEntities.add(replacement));
      this.selectedEntity = replacements[0] || null;
    }
    this.markDirty();
    return true;
  }

  replaceEntities(entities, replacements, options = {}) {
    const replaceSet = new Set(entities.filter((entity) => this.entities.includes(entity)));
    if (!replaceSet.size) {
      return false;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }

    const firstIndex = this.entities.findIndex((entity) => replaceSet.has(entity));
    const wasSelected = [...replaceSet].some((entity) => this.selectedEntities.has(entity));
    this.entities = this.entities.filter((entity) => !replaceSet.has(entity));
    this.entities.splice(firstIndex, 0, ...replacements);
    replaceSet.forEach((entity) => this.selectedEntities.delete(entity));
    if (wasSelected) {
      replacements.forEach((replacement) => this.selectedEntities.add(replacement));
    }
    this.selectedEntity = [...this.selectedEntities][0] || null;
    this.markDirty();
    return true;
  }

  removeEntity(entity, options = {}) {
    return this.replaceEntity(entity, [], options);
  }

  removeEntities(entities, options = {}) {
    const removeSet = new Set(this.expandEntityGroups(entities).filter(Boolean));
    if (!removeSet.size) {
      return 0;
    }
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    const beforeCount = this.entities.length;
    this.entities = this.entities.filter((entity) => !removeSet.has(entity));
    removeSet.forEach((entity) => this.selectedEntities.delete(entity));
    this.selectedEntity = [...this.selectedEntities][0] || null;
    this.markDirty();
    return beforeCount - this.entities.length;
  }

  setEntities(entities, options = {}) {
    if (options.recordHistory !== false) {
      this.recordHistory();
    }
    this.entities = [...entities];
    this.clearSelection();
    this.markDirty();
  }

  bounds() {
    if (!this.boundsDirty) {
      return this.cachedBounds ? { ...this.cachedBounds } : null;
    }

    let bounds = null;
    for (const entity of this.entities) {
      bounds = mergeBounds(bounds, entity.bounds());
    }
    this.cachedBounds = bounds ? { ...bounds } : null;
    this.boundsDirty = false;
    return this.cachedBounds ? { ...this.cachedBounds } : null;
  }

  spatialCellRange(bounds) {
    return {
      minX: Math.floor(bounds.minX / SPATIAL_CELL_SIZE),
      minY: Math.floor(bounds.minY / SPATIAL_CELL_SIZE),
      maxX: Math.floor(bounds.maxX / SPATIAL_CELL_SIZE),
      maxY: Math.floor(bounds.maxY / SPATIAL_CELL_SIZE),
    };
  }

  spatialCellKey(x, y) {
    return `${x}:${y}`;
  }

  rebuildSpatialIndex() {
    this.spatialCells = new Map();
    this.spatialOverflow = new Set();
    this.spatialBounds = new Map();
    this.spatialOrder = new Map();

    this.entities.forEach((entity, index) => {
      const bounds = entity.bounds();
      const range = this.spatialCellRange(bounds);
      const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
      this.spatialBounds.set(entity, bounds);
      this.spatialOrder.set(entity, index);

      if (cellCount > SPATIAL_MAX_ENTITY_CELLS) {
        this.spatialOverflow.add(entity);
        return;
      }

      for (let x = range.minX; x <= range.maxX; x += 1) {
        for (let y = range.minY; y <= range.maxY; y += 1) {
          const key = this.spatialCellKey(x, y);
          if (!this.spatialCells.has(key)) {
            this.spatialCells.set(key, new Set());
          }
          this.spatialCells.get(key).add(entity);
        }
      }
    });

    this.spatialDirty = false;
  }

  queryBounds(bounds) {
    if (!bounds) {
      return [];
    }
    if (this.spatialDirty) {
      this.rebuildSpatialIndex();
    }

    const range = this.spatialCellRange(bounds);
    const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
    if (cellCount > SPATIAL_MAX_QUERY_CELLS) {
      return this.entities.filter((entity) => boundsIntersectsBounds(this.spatialBounds.get(entity), bounds));
    }

    const matches = new Set();
    for (let x = range.minX; x <= range.maxX; x += 1) {
      for (let y = range.minY; y <= range.maxY; y += 1) {
        const cell = this.spatialCells.get(this.spatialCellKey(x, y));
        if (!cell) {
          continue;
        }
        cell.forEach((entity) => {
          if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
            matches.add(entity);
          }
        });
      }
    }

    this.spatialOverflow.forEach((entity) => {
      if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
        matches.add(entity);
      }
    });

    return [...matches].sort((first, second) =>
      (this.spatialOrder.get(first) || 0) - (this.spatialOrder.get(second) || 0),
    );
  }

  groupEntities(entity) {
    if (!entity?.groupId) {
      return entity ? [entity] : [];
    }
    return this.entities.filter((candidate) => candidate.groupId === entity.groupId);
  }

  expandEntityGroups(entities) {
    const expanded = new Set();
    entities.forEach((entity) => {
      this.groupEntities(entity).forEach((groupEntity) => expanded.add(groupEntity));
    });
    return [...expanded];
  }

  selectEntity(entity) {
    this.selectedEntities.clear();
    this.expandEntityGroups([entity]).forEach((selectedEntity) => {
      this.selectedEntities.add(selectedEntity);
    });
    this.selectedEntity = [...this.selectedEntities][0] || null;
  }

  selectEntities(entities) {
    const expandedEntities = this.expandEntityGroups(entities);
    this.selectedEntities = new Set(expandedEntities);
    this.selectedEntity = expandedEntities[0] || null;
  }

  addSelectedEntities(entities) {
    this.expandEntityGroups(entities).forEach((entity) => {
      if (entity) {
        this.selectedEntities.add(entity);
      }
    });
    this.selectedEntity = [...this.selectedEntities][0] || null;
  }

  clearSelection() {
    this.selectedEntities.clear();
    this.selectedEntity = null;
  }

  isSelected(entity) {
    return this.selectedEntities.has(entity);
  }
}

function trimLineEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !entity || entity.type !== 'LINE') {
    return { trimmed: false, keptCount: 0 };
  }

  const breakParameters = [0, 1];
  for (const otherEntity of doc.queryBounds(entity.bounds())) {
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
    for (const otherEntity of doc.queryBounds(entity.bounds())) {
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
  for (const otherEntity of doc.queryBounds(entity.bounds())) {
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
        { lineStyle: component.entity.lineStyle, groupId },
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

function trimEntityAtPoint(doc, entity, pickPoint) {
  if (!doc || !entity) {
    return { trimmed: false, keptCount: 0, grouped: false };
  }

  if (entity.groupId) {
    return trimLineGroupAtPoint(doc, entity, pickPoint);
  }

  if (entity.type === 'LINE') {
    return trimLineEntityAtPoint(doc, entity, pickPoint);
  }

  return trimCircularEntityAtPoint(doc, entity, pickPoint);
}

function extensionBoundaryIntersections(line, boundary) {
  if (!line || line.type !== 'LINE' || !boundary || boundary === line) {
    return [];
  }

  const direction = {
    x: line.end.x - line.start.x,
    y: line.end.y - line.start.y,
  };
  if (Math.hypot(direction.x, direction.y) <= SNAP_THRESHOLD) {
    return [];
  }

  if (boundary.type === 'LINE') {
    const boundaryDirection = {
      x: boundary.end.x - boundary.start.x,
      y: boundary.end.y - boundary.start.y,
    };
    const point = infiniteLineLineIntersection(line.start, direction, boundary.start, boundaryDirection);
    return point ? [point] : [];
  }

  if (isCircularEntity(boundary)) {
    return infiniteLineCircularIntersectionPoints(line.start, direction, boundary, false);
  }

  return [];
}

function lineExtensionCandidate(line, boundaryEntities, endpointKey) {
  const candidates = [];
  for (const boundary of boundaryEntities) {
    for (const point of extensionBoundaryIntersections(line, boundary)) {
      const parameter = rawLineParameter(line, point);
      if (endpointKey === 'start' && parameter < -SNAP_THRESHOLD) {
        candidates.push({ point, distance: distance(line.start, point) });
      }
      if (endpointKey === 'end' && parameter > 1 + SNAP_THRESHOLD) {
        candidates.push({ point, distance: distance(line.end, point) });
      }
    }
  }

  candidates.sort((first, second) => first.distance - second.distance);
  return candidates[0]?.point || null;
}

function extendLineToBoundaries(line, boundaryEntities, pickPoint = null) {
  if (!line || line.type !== 'LINE' || !boundaryEntities.length) {
    return false;
  }

  const startCandidate = lineExtensionCandidate(line, boundaryEntities, 'start');
  const endCandidate = lineExtensionCandidate(line, boundaryEntities, 'end');
  let endpointKey = null;
  if (pickPoint) {
    endpointKey = distance(pickPoint, line.start) <= distance(pickPoint, line.end) ? 'start' : 'end';
  }
  else if (startCandidate && endCandidate) {
    endpointKey = distance(line.start, startCandidate) <= distance(line.end, endCandidate) ? 'start' : 'end';
  }
  else if (startCandidate) {
    endpointKey = 'start';
  }
  else if (endCandidate) {
    endpointKey = 'end';
  }

  const target = endpointKey === 'start' ? startCandidate : endpointKey === 'end' ? endCandidate : null;
  if (!target) {
    return false;
  }

  line[endpointKey] = { ...target };
  return true;
}

function arcEndpointPoint(arc, endpointKey) {
  return pointAtCircleAngle(arc, endpointKey === 'start' ? arc.startAngle : arc.endAngle);
}

function arcExtensionCandidate(arc, boundaryEntities, endpointKey) {
  const candidates = [];
  const currentSweep = arcSweep(arc.startAngle, arc.endAngle);
  if (currentSweep <= SNAP_THRESHOLD) {
    return null;
  }

  for (const boundary of boundaryEntities) {
    for (const point of fullCircleBoundaryIntersectionPoints(arc, boundary)) {
      const angle = angleOfPoint(arc.center, point);
      if (angleOnArc(angle, arc)) {
        continue;
      }

      if (endpointKey === 'start') {
        const extensionSweep = normalizeAngle(arc.startAngle - angle);
        const nextSweep = arcSweep(angle, arc.endAngle);
        if (
          extensionSweep > SNAP_THRESHOLD &&
          nextSweep > currentSweep + SNAP_THRESHOLD &&
          nextSweep < TWO_PI - SNAP_THRESHOLD
        ) {
          candidates.push({ angle, distance: arc.radius * extensionSweep });
        }
      }

      if (endpointKey === 'end') {
        const extensionSweep = normalizeAngle(angle - arc.endAngle);
        const nextSweep = arcSweep(arc.startAngle, angle);
        if (
          extensionSweep > SNAP_THRESHOLD &&
          nextSweep > currentSweep + SNAP_THRESHOLD &&
          nextSweep < TWO_PI - SNAP_THRESHOLD
        ) {
          candidates.push({ angle, distance: arc.radius * extensionSweep });
        }
      }
    }
  }

  candidates.sort((first, second) => first.distance - second.distance);
  return candidates[0]?.angle ?? null;
}

function extendArcToBoundaries(arc, boundaryEntities, pickPoint = null) {
  if (!arc || arc.type !== 'ARC' || !boundaryEntities.length) {
    return false;
  }

  const startCandidate = arcExtensionCandidate(arc, boundaryEntities, 'start');
  const endCandidate = arcExtensionCandidate(arc, boundaryEntities, 'end');
  let endpointKey = null;
  if (pickPoint) {
    endpointKey = distance(pickPoint, arcEndpointPoint(arc, 'start')) <=
      distance(pickPoint, arcEndpointPoint(arc, 'end')) ? 'start' : 'end';
  }
  else if (startCandidate !== null && endCandidate !== null) {
    const startDistance = arc.radius * normalizeAngle(arc.startAngle - startCandidate);
    const endDistance = arc.radius * normalizeAngle(endCandidate - arc.endAngle);
    endpointKey = startDistance <= endDistance ? 'start' : 'end';
  }
  else if (startCandidate !== null) {
    endpointKey = 'start';
  }
  else if (endCandidate !== null) {
    endpointKey = 'end';
  }

  const targetAngle = endpointKey === 'start'
    ? startCandidate
    : endpointKey === 'end' ? endCandidate : null;
  if (targetAngle === null) {
    return false;
  }

  if (endpointKey === 'start') {
    arc.startAngle = normalizeAngle(targetAngle);
  }
  else {
    arc.endAngle = normalizeAngle(targetAngle);
  }
  return true;
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

  visibleWorldBounds(padding = 0) {
    const bounds = createBounds(
      this.state.viewOffset.x,
      this.state.viewOffset.y,
      this.state.viewOffset.x + this.visibleWorldWidth(),
      this.state.viewOffset.y + this.visibleWorldHeight(),
    );
    return padding ? expandBounds(bounds, padding) : bounds;
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

  isExtendBoundary(entity) {
    if (this.state.tool !== 'extend') {
      return false;
    }
    return this.state.extendDraft?.boundaries?.includes(entity) || (
      this.state.extendDraft?.phase === 'boundaries' &&
      this.doc.isSelected(entity)
    );
  }

  drawHighlightedEntity(ctx, entity, color, widthBoost = 1.5) {
    if (!entity) {
      return;
    }
    const style = getLineStyle(entity.lineStyle);
    const options = { color, width: Math.max(3, style.width + widthBoost) };
    if (entity.type === 'LINE') {
      this.drawLineStroke(ctx, entity, options);
    }
    if (entity.type === 'CIRCLE') {
      this.drawCircleStroke(ctx, entity, options);
    }
    if (entity.type === 'ARC') {
      this.drawArcStroke(ctx, entity, options);
    }
  }

  drawEntities(ctx) {
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of this.doc.queryBounds(viewBounds)) {
      if (this.doc.isSelected(entity)) {
        continue;
      }
      if (!boundsIntersectsBounds(entity.bounds(), viewBounds)) {
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

    if (this.state.tool === 'extend') {
      const boundaryEntities = this.state.extendDraft?.phase === 'boundaries'
        ? [...this.doc.selectedEntities]
        : this.state.extendDraft?.boundaries || [];
      for (const boundaryEntity of boundaryEntities) {
        if (!boundaryEntity || !boundsIntersectsBounds(boundaryEntity.bounds(), viewBounds)) {
          continue;
        }
        this.drawHighlightedEntity(ctx, boundaryEntity, PREVIEW_COLOR, 2);
      }
    }

    for (const selectedEntity of this.doc.selectedEntities) {
      if (!selectedEntity || !boundsIntersectsBounds(selectedEntity.bounds(), viewBounds)) {
        continue;
      }
      if (this.isExtendBoundary(selectedEntity)) {
        continue;
      }
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
      (this.state.tool === 'copy' && !this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && !this.state.moveDraft?.selecting) ||
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
    else if (snap.type === 'center') {
      const half = size * 0.46;
      ctx.beginPath();
      ctx.arc(point.x, point.y, half, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point.x - half * 0.72, point.y);
      ctx.lineTo(point.x + half * 0.72, point.y);
      ctx.moveTo(point.x, point.y - half * 0.72);
      ctx.lineTo(point.x, point.y + half * 0.72);
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

    if (this.state.rectangleDraft?.firstPoint) {
      let oppositePoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const coordinateTarget = pointFromRelativeCoordinates(
        this.state.rectangleDraft.firstPoint,
        this.state.distanceInput,
      );
      const inputDistance = parseDistanceInput(this.state.distanceInput);
      if (coordinateTarget) {
        oppositePoint = coordinateTarget;
      }
      else if (inputDistance !== null) {
        const distancePoint = pointFromDistance(
          this.state.rectangleDraft.firstPoint,
          oppositePoint,
          inputDistance,
        );
        if (distancePoint) {
          oppositePoint = distancePoint;
        }
      }

      const bounds = normalizeBoundsFromPoints(this.state.rectangleDraft.firstPoint, oppositePoint);
      ctx.beginPath();
      ctx.rect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
      ctx.stroke();

      const radius = 4 / this.state.viewScale;
      ctx.fillStyle = PREVIEW_COLOR;
      for (const point of [this.state.rectangleDraft.firstPoint, oppositePoint]) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
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

    const origin = this.state.selectedGrip.entity[this.state.selectedGrip.key];
    const coordinateTarget = pointFromRelativeCoordinates(origin, this.state.distanceInput);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance === null && !coordinateTarget) {
      return;
    }

    const referencePoint = gripReferencePoint(this.state.selectedGrip);
    const directionPoint = resolvePointForState(this.state.mouseWorld, this.state, referencePoint);
    const targetPoint = coordinateTarget || pointFromDistance(origin, directionPoint, inputDistance);
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

  copyPreviewTargetPoint() {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const coordinateTarget = pointFromRelativeCoordinates(copyDraft.basePoint, this.state.distanceInput);
    if (coordinateTarget) {
      return coordinateTarget;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(copyDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  movePreviewTargetPoint() {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !this.state.mouseWorld) {
      return null;
    }

    const coordinateTarget = pointFromRelativeCoordinates(moveDraft.basePoint, this.state.distanceInput);
    if (coordinateTarget) {
      return coordinateTarget;
    }

    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    if (inputDistance !== null && cursor) {
      return pointFromDistance(moveDraft.basePoint, cursor, inputDistance);
    }
    return cursor;
  }

  drawCopyPreview(ctx) {
    const draft = this.state.copyDraft || this.state.moveDraft;
    const targetPoint = this.state.copyDraft ? this.copyPreviewTargetPoint() : this.movePreviewTargetPoint();
    if (!draft?.basePoint || !targetPoint) {
      return;
    }

    const vector = {
      x: targetPoint.x - draft.basePoint.x,
      y: targetPoint.y - draft.basePoint.y,
    };

    ctx.save();
    ctx.setLineDash([8 / this.state.viewScale, 6 / this.state.viewScale]);
    const viewBounds = this.visibleWorldBounds(18 / this.state.viewScale);
    for (const entity of draft.sourceEntities) {
      if (!boundsIntersectsBounds(offsetBounds(entity.bounds(), vector), viewBounds)) {
        continue;
      }
      const preview = cloneEntityWithOffset(entity, vector);
      if (!preview) {
        continue;
      }

      const width = getLineStyle(preview.lineStyle).width;
      if (preview.type === 'LINE') {
        this.drawLineStroke(ctx, preview, { color: PREVIEW_COLOR, width });
      }
      if (preview.type === 'CIRCLE') {
        this.drawCircleStroke(ctx, preview, { color: PREVIEW_COLOR, width });
      }
      if (preview.type === 'ARC') {
        this.drawArcStroke(ctx, preview, { color: PREVIEW_COLOR, width });
      }
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  drawSelectionWindow(ctx) {
    const selectionWindow = this.state.selectionWindow;
    if (!selectionWindow?.currentWorld) {
      return;
    }

    const bounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    if (Math.abs(width) <= SNAP_THRESHOLD || Math.abs(height) <= SNAP_THRESHOLD) {
      return;
    }

    const mode = selectionWindowMode(selectionWindow);
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.minX, bounds.minY, width, height);
    ctx.fillStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.10)'
      : 'rgba(208, 90, 31, 0.10)';
    ctx.strokeStyle = mode === 'window'
      ? 'rgba(15, 93, 140, 0.80)'
      : 'rgba(208, 90, 31, 0.85)';
    ctx.lineWidth = 1.5 / this.state.viewScale;
    if (mode === 'capture') {
      ctx.setLineDash([6 / this.state.viewScale, 5 / this.state.viewScale]);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawCrosshair(ctx) {
    if (
      !this.state.mouseWorld ||
      this.state.tool === 'select' ||
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting)
    ) {
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
    this.drawCopyPreview(ctx);
    this.drawSelectionWindow(ctx);
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
    this.shortcutPrefix = null;
    this.shortcutTimer = null;

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

  clearShortcutPrefix() {
    if (this.shortcutTimer) {
      clearTimeout(this.shortcutTimer);
    }
    this.shortcutPrefix = null;
    this.shortcutTimer = null;
  }

  handleShortcutSequence(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }

    const key = event.key.toLowerCase();
    if (this.shortcutPrefix === 'r') {
      this.clearShortcutPrefix();
      if (key === 'c') {
        event.preventDefault();
        runCommand('rectangle');
        return true;
      }
      event.preventDefault();
      runCommand('trim');
      return true;
    }

    if (key === 'r') {
      event.preventDefault();
      this.clearShortcutPrefix();
      this.shortcutPrefix = 'r';
      this.state.statusText = 'R: pulse C para rectangulo';
      this.updateUiStatus();
      this.renderer.draw();
      this.shortcutTimer = setTimeout(() => {
        if (this.shortcutPrefix === 'r') {
          this.clearShortcutPrefix();
          runCommand('trim');
        }
      }, 420);
      return true;
    }

    return false;
  }

  setTool(tool) {
    this.state.tool = tool;
    this.state.pendingLineStart = null;
    this.state.rectangleDraft = null;
    this.state.circleDraft = null;
    this.state.arcDraft = null;
    this.state.copyDraft = null;
    this.state.moveDraft = null;
    this.state.eraseDraft = null;
    this.state.extendDraft = null;
    this.state.distanceInput = '';
    this.state.selectedGrip = null;
    this.state.activeObjectSnap = null;
    this.state.selectionWindow = null;
    this.gripDragState = null;
    if (
      tool === 'line' ||
      tool === 'rectangle' ||
      tool === 'circle-center' ||
      tool === 'circle-3p' ||
      tool === 'arc-center-radius' ||
      tool === 'arc-3p' ||
      tool === 'arc-center-start-end' ||
      tool === 'copy' ||
      tool === 'move' ||
      tool === 'trim' ||
      tool === 'extend' ||
      tool === 'erase'
    ) {
      if (tool !== 'copy' && tool !== 'move' && tool !== 'erase' && tool !== 'extend') {
        this.doc.selectEntity(null);
      }
    }
    this.state.statusText = tool === 'select'
      ? 'Seleccionar entidad'
      : tool === 'trim'
        ? 'Recortar: pique el tramo a eliminar'
        : tool === 'extend'
          ? 'Alargar: seleccione limites'
        : tool === 'erase'
          ? 'Borrar: seleccione objetos y confirme'
          : tool === 'copy'
            ? 'Copiar: indique punto origen'
            : tool === 'move'
              ? 'Desplazar: indique punto origen'
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
                    : tool === 'rectangle'
                      ? 'Rectangulo: indique primera esquina'
                      : 'Linea por dos puntos';
    selectToolButton.classList.toggle('is-active', tool === 'select');
    lineToolButton.classList.toggle('is-active', tool === 'line');
    rectangleToolButton.classList.toggle('is-active', tool === 'rectangle');
    circleToolButton.classList.toggle('is-active', tool === 'circle-center' || tool === 'circle-3p');
    arcToolButton.classList.toggle(
      'is-active',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    trimToolButton.classList.toggle('is-active', tool === 'trim');
    extendToolButton.classList.toggle('is-active', tool === 'extend');
    copyToolButton.classList.toggle('is-active', tool === 'copy');
    moveToolButton.classList.toggle('is-active', tool === 'move');
    eraseToolButton.classList.toggle('is-active', tool === 'erase');
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === tool);
    });
    this.canvas.classList.toggle('is-select-tool', tool === 'select');
    this.canvas.classList.toggle('is-line-tool', tool === 'line' || tool === 'rectangle');
    this.canvas.classList.toggle('is-circle-tool', tool === 'circle-center' || tool === 'circle-3p');
    this.canvas.classList.toggle(
      'is-arc-tool',
      tool === 'arc-center-radius' || tool === 'arc-3p' || tool === 'arc-center-start-end',
    );
    this.canvas.classList.toggle('is-trim-tool', tool === 'trim');
    this.canvas.classList.toggle('is-extend-tool', tool === 'extend');
    this.canvas.classList.toggle('is-copy-tool', tool === 'copy' && this.state.copyDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting),
    );
    this.canvas.classList.toggle('is-erase-tool', tool === 'erase');
    this.updateUiStatus();
    this.renderer.draw();
  }

  findEntityAt(point) {
    const tolerance = 7 / this.state.viewScale;
    const pickBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const candidates = this.doc.queryBounds(pickBounds);
    for (let index = candidates.length - 1; index >= 0; index -= 1) {
      const entity = candidates[index];
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

  updateCanvasCursorMode() {
    this.canvas.classList.toggle('is-copy-tool', this.state.tool === 'copy' && this.state.copyDraft?.selecting);
    this.canvas.classList.toggle('is-move-tool', this.state.tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (this.state.tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (this.state.tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting),
    );
  }

  isIdleForCommandRepeat() {
    return this.state.tool === 'select' &&
      !this.state.pendingLineStart &&
      !this.state.circleDraft &&
      !this.state.arcDraft &&
      !this.state.copyDraft &&
      !this.state.moveDraft &&
      !this.state.eraseDraft &&
      !this.state.extendDraft &&
      !this.state.selectionWindow &&
      !this.state.selectedGrip &&
      !this.gripDragState &&
      !this.state.distanceInput;
  }

  repeatLastCommand() {
    if (!this.state.lastCommand || !REPEATABLE_COMMANDS.has(this.state.lastCommand)) {
      this.state.statusText = 'No hay comando anterior';
      return true;
    }

    runCommand(this.state.lastCommand);
    this.state.statusText = `Repetido: ${commandLabel(this.state.lastCommand)}`;
    return true;
  }

  cancelCurrentCommand() {
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.pendingLineStart ||
      this.state.rectangleDraft ||
      this.state.circleDraft ||
      this.state.arcDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.eraseDraft ||
      this.state.extendDraft
    ) {
      this.setTool('select');
      this.state.statusText = 'Cancelado';
      return true;
    }

    this.state.selectedGrip = null;
    this.doc.selectEntity(null);
    this.state.distanceInput = '';
    this.gripDragState = null;
    this.state.statusText = 'Seleccion limpiada';
    return false;
  }

  handleCommandEnter() {
    if (this.state.tool === 'copy' && this.state.copyDraft?.selecting) {
      return this.confirmCopySelection();
    }
    if (this.state.tool === 'move' && this.state.moveDraft?.selecting) {
      return this.confirmMoveSelection();
    }
    if (this.state.tool === 'erase' && this.state.eraseDraft?.selecting) {
      return this.confirmEraseSelection();
    }
    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'boundaries') {
      return this.confirmExtendBoundaries();
    }
    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'targets') {
      this.setTool('select');
      this.doc.clearSelection();
      this.state.statusText = 'Alargar terminado';
      return true;
    }
    if (this.state.distanceInput && this.handleDistanceInputKey({ key: 'Enter' })) {
      return true;
    }
    if (this.state.pendingLineStart && this.state.tool === 'line') {
      this.setTool('select');
      this.state.statusText = 'Linea terminada';
      return true;
    }
    if (
      this.state.tool === 'line' ||
      this.state.tool === 'rectangle' ||
      this.state.tool === 'circle-center' ||
      this.state.tool === 'circle-3p' ||
      this.state.tool === 'arc-center-radius' ||
      this.state.tool === 'arc-3p' ||
      this.state.tool === 'arc-center-start-end' ||
      this.state.tool === 'copy' ||
      this.state.tool === 'move' ||
      this.state.tool === 'trim' ||
      this.state.tool === 'extend' ||
      this.state.tool === 'erase' ||
      this.state.circleDraft ||
      this.state.rectangleDraft ||
      this.state.arcDraft ||
      this.state.copyDraft ||
      this.state.moveDraft ||
      this.state.eraseDraft ||
      this.state.extendDraft
    ) {
      this.setTool('select');
      this.state.statusText = 'Orden terminada';
      return true;
    }

    if (this.isIdleForCommandRepeat()) {
      return this.repeatLastCommand();
    }

    return false;
  }

  findGripAt(point) {
    const tolerance = 8 / this.state.viewScale;
    const gripBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const nearbyEntities = this.doc.queryBounds(gripBounds);
    const candidates = this.doc.selectedEntity
      ? [this.doc.selectedEntity, ...nearbyEntities.filter((entity) => entity !== this.doc.selectedEntity)]
      : nearbyEntities;

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

  activeGripLinkedPoints() {
    const grip = this.state.selectedGrip;
    const gripPoint = this.activeGripPoint();
    if (!grip || !gripPoint || !grip.entity.groupId) {
      return gripPoint ? [gripPoint] : [];
    }

    const linkedPoints = new Set([gripPoint]);
    for (const entity of this.doc.groupEntities(grip.entity)) {
      if (entity.type !== 'LINE') {
        continue;
      }
      for (const key of ['start', 'end']) {
        if (distance(entity[key], gripPoint) <= SNAP_THRESHOLD) {
          linkedPoints.add(entity[key]);
        }
      }
    }
    return [...linkedPoints];
  }

  moveActiveGripPointTo(targetPoint) {
    const gripPoint = this.activeGripPoint();
    if (!gripPoint || !targetPoint || distance(gripPoint, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }

    for (const point of this.activeGripLinkedPoints()) {
      point.x = targetPoint.x;
      point.y = targetPoint.y;
    }
    this.doc.markDirty();
    return true;
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
    if (!gripPoint || distance(gripPoint, constrainedTarget) <= SNAP_THRESHOLD) {
      return false;
    }
    if (this.gripDragState && !this.gripDragState.historyRecorded) {
      this.doc.recordHistory();
      this.gripDragState.historyRecorded = true;
    }
    return this.moveActiveGripPointTo(constrainedTarget);
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

    if (distance(origin, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }
    this.doc.recordHistory();
    this.moveActiveGripPointTo(targetPoint);
    this.state.statusText = `Punto desplazado ${formatNumber(distanceValue)} ${UNITS_LABEL}`;
    return true;
  }

  applyActiveLineStyleToEntity(entity) {
    if (!entity) {
      return false;
    }
    return this.applyActiveLineStyleToEntities(this.doc.groupEntities(entity));
  }

  applyActiveLineStyleToEntities(entities) {
    const nextStyle = activeLineStyleId();
    const changedEntities = entities.filter((entity) => normalizeLineStyleId(entity.lineStyle) !== nextStyle);
    if (!changedEntities.length) {
      return false;
    }
    this.doc.recordHistory();
    changedEntities.forEach((entity) => applyLineStyleToEntity(entity, nextStyle));
    this.doc.markDirty();
    return true;
  }

  startCopy() {
    const sourceEntities = [...this.doc.selectedEntities];
    this.state.lastCopy = null;
    this.setTool('copy');
    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Copiar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startMove() {
    const sourceEntities = [...this.doc.selectedEntities];
    this.setTool('move');
    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Desplazar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startErase() {
    const selectedCount = this.doc.selectedEntities.size;
    this.setTool('erase');
    this.state.eraseDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Borrar ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} - seleccione mas o confirme`
      : 'Borrar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startExtend() {
    const selectedBoundaries = [...this.doc.selectedEntities];
    this.setTool('extend');
    if (selectedBoundaries.length) {
      this.doc.selectEntities(selectedBoundaries);
    }
    this.state.extendDraft = {
      phase: 'boundaries',
      boundaries: selectedBoundaries,
    };
    this.state.statusText = selectedBoundaries.length
      ? `Alargar: ${selectedBoundaries.length} limite${selectedBoundaries.length === 1 ? '' : 's'} seleccionado${selectedBoundaries.length === 1 ? '' : 's'} - confirme o seleccione mas`
      : 'Alargar: seleccione limites y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmCopySelection() {
    if (!this.state.copyDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para copiar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmMoveSelection() {
    if (!this.state.moveDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para desplazar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmEraseSelection() {
    if (!this.state.eraseDraft?.selecting) {
      return false;
    }

    const entities = [...this.doc.selectedEntities];
    if (!entities.length) {
      this.state.statusText = 'Seleccione entidades para borrar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    const removedCount = this.doc.removeEntities(entities);
    this.state.eraseDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = removedCount
      ? `${removedCount} entidad${removedCount === 1 ? '' : 'es'} borrada${removedCount === 1 ? '' : 's'}`
      : 'No se pudo borrar';
    return removedCount > 0;
  }

  confirmExtendBoundaries() {
    if (!this.state.extendDraft || this.state.extendDraft.phase !== 'boundaries') {
      return false;
    }

    const boundaries = [...this.doc.selectedEntities];
    if (!boundaries.length) {
      this.state.statusText = 'Seleccione entidades limite para alargar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.state.extendDraft = {
      phase: 'targets',
      boundaries,
    };
    this.doc.clearSelection();
    this.state.statusText = `Alargar: ${boundaries.length} limite${boundaries.length === 1 ? '' : 's'} - pique lineas o arcos a alargar`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  extendEntities(entities, pickPoint = null) {
    if (!this.state.extendDraft?.boundaries?.length) {
      this.state.statusText = 'No hay limites para alargar';
      return 0;
    }

    const targetEntities = entities.filter((entity) =>
      (entity?.type === 'LINE' || entity?.type === 'ARC') &&
      !this.state.extendDraft.boundaries.includes(entity),
    );
    if (!targetEntities.length) {
      this.state.statusText = 'Seleccione lineas o arcos para alargar';
      return 0;
    }

    const before = this.doc.snapshot();
    let extendedCount = 0;
    for (const entity of targetEntities) {
      const extended = entity.type === 'LINE'
        ? extendLineToBoundaries(entity, this.state.extendDraft.boundaries, pickPoint)
        : extendArcToBoundaries(entity, this.state.extendDraft.boundaries, pickPoint);
      if (extended) {
        extendedCount += 1;
      }
    }

    if (!extendedCount) {
      this.state.statusText = 'No se encontro limite valido para alargar';
      return 0;
    }

    this.doc.undoStack.push(before);
    if (this.doc.undoStack.length > HISTORY_LIMIT) {
      this.doc.undoStack.shift();
    }
    this.doc.redoStack = [];
    this.doc.markDirty();
    this.doc.clearSelection();
    this.state.statusText = `${extendedCount} entidad${extendedCount === 1 ? '' : 'es'} alargada${extendedCount === 1 ? '' : 's'}`;
    return extendedCount;
  }

  copySelectionTo(targetPoint) {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - copyDraft.basePoint.x,
      y: targetPoint.y - copyDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    const copies = cloneEntitiesWithOffset(copyDraft.sourceEntities, vector, { remapGroups: true });
    this.doc.addEntities(copies);
    this.state.lastCopy = {
      sourceEntities: copyDraft.sourceEntities,
      vector,
    };
    this.state.copyDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${copies.length} entidad${copies.length === 1 ? '' : 'es'} copiada${copies.length === 1 ? '' : 's'} - escriba x2, x3... para repetir`;
    return true;
  }

  repeatLastCopy(count) {
    const lastCopy = this.state.lastCopy;
    if (!lastCopy || count < 2) {
      return false;
    }

    const copies = [];
    for (let step = 2; step <= count; step += 1) {
      const vector = {
        x: lastCopy.vector.x * step,
        y: lastCopy.vector.y * step,
      };
      copies.push(...cloneEntitiesWithOffset(lastCopy.sourceEntities, vector, { remapGroups: true }));
    }

    this.doc.addEntities(copies);
    this.doc.clearSelection();
    this.state.statusText = `Matriz lineal: ${count} copias en total`;
    return true;
  }

  moveSelectionTo(targetPoint) {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - moveDraft.basePoint.x,
      y: targetPoint.y - moveDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    this.doc.recordHistory();
    moveDraft.sourceEntities.forEach((entity) => moveEntityByVector(entity, vector));
    this.doc.markDirty();
    const count = moveDraft.sourceEntities.length;
    this.state.moveDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} desplazada${count === 1 ? '' : 's'}`;
    return true;
  }

  selectedEntitiesFromWindow(selectionWindow) {
    if (!selectionWindow?.currentWorld) {
      return [];
    }

    const selectionBounds = normalizeBoundsFromPoints(selectionWindow.startWorld, selectionWindow.currentWorld);
    const mode = selectionWindowMode(selectionWindow);
    const matchingEntities = this.doc.queryBounds(selectionBounds).filter((entity) => {
      const entityBounds = entity.bounds();
      return mode === 'window'
        ? boundsContainsBounds(selectionBounds, entityBounds)
        : boundsIntersectsBounds(selectionBounds, entityBounds);
    });
    return this.doc.expandEntityGroups(matchingEntities);
  }

  createLineTo(point, continueFromEnd = false) {
    if (distance(this.state.pendingLineStart, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new LineEntity(this.state.pendingLineStart, point, { lineStyle: style.id }));
    this.state.statusText = continueFromEnd
      ? `Linea ${style.label.toLowerCase()} creada - indique siguiente punto`
      : `Linea ${style.label.toLowerCase()} creada (${this.doc.entities.length})`;
    this.state.pendingLineStart = continueFromEnd ? point : null;
    return true;
  }

  createRectangleTo(point) {
    const firstPoint = this.state.rectangleDraft?.firstPoint;
    if (!firstPoint) {
      return false;
    }

    if (
      Math.abs(point.x - firstPoint.x) <= SNAP_THRESHOLD ||
      Math.abs(point.y - firstPoint.y) <= SNAP_THRESHOLD
    ) {
      this.state.statusText = 'Rectangulo no valido';
      return false;
    }

    this.state.activeLineStyle = activeLineStyleId();
    const style = getLineStyle(activeLineStyleId());
    const groupId = createEntityGroupId('polyline');
    const topRight = { x: point.x, y: firstPoint.y };
    const bottomLeft = { x: firstPoint.x, y: point.y };
    const entities = [
      new LineEntity(firstPoint, topRight, { lineStyle: style.id, groupId }),
      new LineEntity(topRight, point, { lineStyle: style.id, groupId }),
      new LineEntity(point, bottomLeft, { lineStyle: style.id, groupId }),
      new LineEntity(bottomLeft, firstPoint, { lineStyle: style.id, groupId }),
    ];
    this.doc.addEntities(entities);
    this.state.rectangleDraft = null;
    this.state.statusText = `Rectangulo ${style.label.toLowerCase()} creado (${this.doc.entities.length})`;
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
    const pointDraft = Boolean(
      this.state.rectangleDraft?.firstPoint ||
      this.state.circleDraft?.points.length ||
      this.state.arcDraft?.points.length ||
      this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint,
    );
    if (!this.state.pendingLineStart && !this.state.selectedGrip && !radiusDraft && !pointDraft && !this.state.lastCopy) {
      return false;
    }

    if ((event.key.toLowerCase() === 'x' && !this.state.distanceInput) || /^[0-9]$/.test(event.key) || event.key === '-') {
      this.state.distanceInput += event.key;
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : parseRelativeCoordinateInput(this.state.distanceInput)
        ? `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : radiusDraft
        ? `Radio: ${this.state.distanceInput} ${UNITS_LABEL}`
        : `Distancia: ${this.state.distanceInput} ${UNITS_LABEL}`;
      return true;
    }

    if (event.key === '.' || event.key === ',') {
      if (event.key === '.' || !this.state.distanceInput.includes(',')) {
        this.state.distanceInput += event.key;
      }
      this.state.statusText = parseRelativeCoordinateInput(this.state.distanceInput)
        ? `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : radiusDraft
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
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      if (multiplier !== null) {
        if (this.repeatLastCopy(multiplier)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'No hay copia anterior para repetir';
        }
        return true;
      }

      const inputDistance = parseDistanceInput(this.state.distanceInput);
      const activeGripPoint = this.activeGripPoint();
      const coordinateOrigin = this.state.copyDraft?.basePoint ||
        this.state.moveDraft?.basePoint ||
        activeGripPoint ||
        this.state.pendingLineStart ||
        this.state.rectangleDraft?.firstPoint ||
        this.state.circleDraft?.points[0] ||
        this.state.arcDraft?.points[0] ||
        null;
      const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);

      if (this.state.copyDraft?.basePoint) {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.copySelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de copia no valido';
        }
        return true;
      }

      if (this.state.moveDraft?.basePoint) {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.moveSelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de desplazamiento no valido';
        }
        return true;
      }

      if (this.state.selectedGrip) {
        if (coordinateTarget) {
          const gripPoint = this.activeGripPoint();
          if (distance(gripPoint, coordinateTarget) > SNAP_THRESHOLD) {
            this.doc.recordHistory();
            this.moveActiveGripPointTo(coordinateTarget);
          }
          this.state.distanceInput = '';
          this.state.statusText = 'Punto desplazado por coordenadas';
        }
        else if (inputDistance !== null && this.moveSelectedGripByDistance(inputDistance)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Distancia o direccion no valida';
        }
        return true;
      }

      if (circleCenterDraft) {
        const center = this.state.circleDraft.points[0];
        const radius = coordinateTarget ? distance(center, coordinateTarget) : inputDistance;
        if (radius !== null && this.createCircle(center, radius)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (arcRadiusDraft) {
        const center = this.state.arcDraft.points[0];
        const radius = coordinateTarget ? distance(center, coordinateTarget) : inputDistance;
        if (radius !== null) {
          this.state.arcDraft.radius = radius;
          this.state.arcDraft.points.push(coordinateTarget || { x: center.x + radius, y: center.y });
          this.state.distanceInput = '';
          this.state.statusText = 'Radio indicado - indique punto inicial';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (coordinateTarget && this.state.circleDraft?.points.length) {
        this.handleCirclePoint(coordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if (coordinateTarget && this.state.arcDraft?.points.length) {
        this.handleArcPoint(coordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if (this.state.rectangleDraft?.firstPoint) {
        const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget || (inputDistance !== null && directionPoint
          ? pointFromDistance(this.state.rectangleDraft.firstPoint, directionPoint, inputDistance)
          : null);
        if (targetPoint && this.createRectangleTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Rectangulo no valido';
        }
        return true;
      }

      const directionPoint = resolveCursorPoint(this.state.mouseWorld, this.state);
      const endPoint = coordinateTarget || (inputDistance !== null && directionPoint
        ? pointFromDistance(this.state.pendingLineStart, directionPoint, inputDistance)
        : null);

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

  isMouseWheelZoom(event, delta) {
    const lineMode = typeof WheelEvent === 'undefined' ? 1 : WheelEvent.DOM_DELTA_LINE;
    if (event.deltaMode === lineMode) {
      return true;
    }

    const absX = Math.abs(delta.x);
    const absY = Math.abs(delta.y);
    if (absY <= SNAP_THRESHOLD || absX > 1) {
      return false;
    }

    const wheelDeltaY = Math.abs(Number(event.wheelDeltaY || 0));
    if (wheelDeltaY >= 100 && Math.abs(wheelDeltaY % 120) <= SNAP_THRESHOLD) {
      return true;
    }

    return absY >= 80;
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

    if (event.button === 2) {
      if (!this.handleCommandEnter()) {
        this.cancelCurrentCommand();
      }
      this.updateUiStatus();
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
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      if (entity) {
        this.doc.selectEntity(entity);
        this.applyActiveLineStyleToEntity(entity);
        const activeStyle = getLineStyle(activeLineStyleId());
        const selectedEntities = [...this.doc.selectedEntities];
        const entityLabel = entity.groupId
          ? 'Polilinea'
          : entity.type === 'CIRCLE'
          ? 'Circulo'
          : entity.type === 'ARC' ? 'Arco' : 'Linea';
        const selectedLength = selectedEntities.reduce((total, selectedEntity) => total + selectedEntity.length(), 0);
        this.state.statusText = `${entityLabel} seleccionada - capa ${activeStyle.label} - ${formatNumber(selectedLength)} ${UNITS_LABEL}`;
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      this.state.selectionWindow = {
        startWorld: { ...worldPoint },
        currentWorld: { ...worldPoint },
        startScreen: { ...this.state.mouseScreen },
        dragging: false,
      };
      this.state.statusText = 'Ventana de seleccion';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'copy') {
      if (!this.state.copyDraft) {
        this.startCopy();
        return;
      }

      if (this.state.copyDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para copiar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'copy',
          };
          this.state.statusText = 'Ventana de seleccion para copiar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.copyDraft.basePoint) {
        this.state.copyDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.copySelectionTo(point);
      }
      this.state.distanceInput = '';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'move') {
      if (!this.state.moveDraft) {
        this.startMove();
        return;
      }

      if (this.state.moveDraft.selecting) {
        const entity = this.findEntityAt(worldPoint);
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para desplazar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'move',
          };
          this.state.statusText = 'Ventana de seleccion para desplazar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.moveDraft.basePoint) {
        this.state.moveDraft.basePoint = point;
        this.state.statusText = 'Punto origen indicado - indique destino';
      }
      else {
        this.moveSelectionTo(point);
      }
      this.state.distanceInput = '';
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

      const result = trimEntityAtPoint(this.doc, entity, worldPoint);
      this.state.selectedGrip = null;
      this.state.distanceInput = '';
      this.state.statusText = result.trimmed
        ? result.grouped
          ? `Polilinea recortada en bloque - quedan ${result.keptCount} componente${result.keptCount === 1 ? '' : 's'}`
          : `Tramo recortado - quedan ${result.keptCount} tramo${result.keptCount === 1 ? '' : 's'}`
        : 'No se pudo recortar';
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'extend') {
      if (!this.state.extendDraft) {
        this.startExtend();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      if (this.state.extendDraft.phase === 'boundaries') {
        if (entity) {
          this.doc.addSelectedEntities([entity]);
          this.state.statusText = `${this.doc.selectedEntities.size} limite${this.doc.selectedEntities.size === 1 ? '' : 's'} seleccionado${this.doc.selectedEntities.size === 1 ? '' : 's'} para alargar`;
        }
        else {
          this.state.selectionWindow = {
            startWorld: { ...worldPoint },
            currentWorld: { ...worldPoint },
            startScreen: { ...this.state.mouseScreen },
            dragging: false,
            purpose: 'extend-boundaries',
          };
          this.state.statusText = 'Ventana de limites para alargar';
        }
        this.updateUiStatus();
        this.renderer.draw();
        return;
      }

      if (entity) {
        this.extendEntities([entity], worldPoint);
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'extend-targets',
        };
        this.state.statusText = 'Ventana de lineas o arcos a alargar';
      }
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }

    if (this.state.tool === 'erase') {
      if (!this.state.eraseDraft) {
        this.startErase();
        return;
      }

      const entity = this.findEntityAt(worldPoint);
      if (entity) {
        this.doc.addSelectedEntities([entity]);
        this.state.statusText = `${this.doc.selectedEntities.size} entidad${this.doc.selectedEntities.size === 1 ? '' : 'es'} seleccionada${this.doc.selectedEntities.size === 1 ? '' : 's'} para borrar`;
      }
      else {
        this.state.selectionWindow = {
          startWorld: { ...worldPoint },
          currentWorld: { ...worldPoint },
          startScreen: { ...this.state.mouseScreen },
          dragging: false,
          purpose: 'erase',
        };
        this.state.statusText = 'Ventana de seleccion para borrar';
      }
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

    if (this.state.tool === 'rectangle') {
      const point = this.resolveInputPoint(worldPoint);
      if (!this.state.rectangleDraft) {
        this.state.rectangleDraft = { firstPoint: point };
        this.state.statusText = 'Primera esquina indicada - indique esquina opuesta';
      }
      else {
        this.createRectangleTo(point);
      }
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

    this.createLineTo(point, true);
    this.state.distanceInput = '';
    this.updateUiStatus();
    this.renderer.draw();
  }

  onPointerMove(event) {
    this.updateMouse(event);

    if (this.state.selectionWindow) {
      const deltaX = this.state.mouseScreen.x - this.state.selectionWindow.startScreen.x;
      const deltaY = this.state.mouseScreen.y - this.state.selectionWindow.startScreen.y;
      this.state.selectionWindow.currentWorld = { ...this.state.mouseWorld };
      this.state.selectionWindow.dragging = Math.hypot(deltaX, deltaY) > 4;
      const mode = selectionWindowMode(this.state.selectionWindow) === 'window' ? 'ventana' : 'captura';
      this.state.statusText = this.state.selectionWindow.purpose === 'copy'
        ? `Seleccion para copiar por ${mode}`
        : this.state.selectionWindow.purpose === 'move'
          ? `Seleccion para desplazar por ${mode}`
          : this.state.selectionWindow.purpose === 'erase'
            ? `Seleccion para borrar por ${mode}`
            : this.state.selectionWindow.purpose === 'extend-boundaries'
              ? `Limites para alargar por ${mode}`
              : this.state.selectionWindow.purpose === 'extend-targets'
                ? `Lineas o arcos a alargar por ${mode}`
        : `Seleccion por ${mode}`;
    }

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
      this.doc.markDirty();
      this.state.statusText = 'Punto desplazado';
      this.updateUiStatus();
      this.renderer.draw();
    }
    if (this.state.selectionWindow) {
      const selectionWindow = this.state.selectionWindow;
      this.state.selectionWindow = null;

      if (!selectionWindow.dragging) {
        if (
          selectionWindow.purpose !== 'copy' &&
          selectionWindow.purpose !== 'move' &&
          selectionWindow.purpose !== 'erase' &&
          selectionWindow.purpose !== 'extend-boundaries' &&
          selectionWindow.purpose !== 'extend-targets'
        ) {
          this.doc.clearSelection();
        }
        this.state.statusText = selectionWindow.purpose === 'copy'
          ? 'Seleccione objetos para copiar'
          : selectionWindow.purpose === 'move'
            ? 'Seleccione objetos para desplazar'
            : selectionWindow.purpose === 'erase'
              ? 'Seleccione objetos para borrar'
              : selectionWindow.purpose === 'extend-boundaries'
                ? 'Seleccione limites para alargar'
                : selectionWindow.purpose === 'extend-targets'
                  ? 'Seleccione lineas o arcos para alargar'
          : 'Sin seleccion';
      }
      else {
        const entities = this.selectedEntitiesFromWindow(selectionWindow);
        if (
          selectionWindow.purpose === 'copy' ||
          selectionWindow.purpose === 'move' ||
          selectionWindow.purpose === 'erase' ||
          selectionWindow.purpose === 'extend-boundaries'
        ) {
          this.doc.addSelectedEntities(entities);
        }
        else if (selectionWindow.purpose === 'extend-targets') {
          const count = this.extendEntities(entities);
          this.updateUiStatus();
          this.renderer.draw();
          return;
        }
        else {
          this.doc.selectEntities(entities);
          this.applyActiveLineStyleToEntities(entities);
        }
        const mode = selectionWindowMode(selectionWindow) === 'window' ? 'ventana' : 'captura';
        const selectedCount = selectionWindow.purpose === 'copy'
          ? this.doc.selectedEntities.size
          : selectionWindow.purpose === 'move'
            ? this.doc.selectedEntities.size
            : selectionWindow.purpose === 'erase'
              ? this.doc.selectedEntities.size
              : selectionWindow.purpose === 'extend-boundaries'
                ? this.doc.selectedEntities.size
          : entities.length;
        this.state.statusText = selectedCount
          ? `${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} seleccionada${selectedCount === 1 ? '' : 's'}${
              selectionWindow.purpose === 'copy'
                ? ' para copiar'
                : selectionWindow.purpose === 'move'
                  ? ' para desplazar'
                  : selectionWindow.purpose === 'erase'
                    ? ' para borrar'
                    : selectionWindow.purpose === 'extend-boundaries' ? ' como limite' : ''
            } por ${mode}`
          : `Sin seleccion por ${mode}`;
      }

      this.updateUiStatus();
      this.renderer.draw();
    }
  }

  onWheel(event) {
    event.preventDefault();
    this.updateMouse(event);
    const delta = this.normalizeWheelDelta(event);

    const verticalWheelDelta = Math.abs(delta.y) > SNAP_THRESHOLD && Math.abs(delta.y) >= Math.abs(delta.x);
    const shouldZoom = event.shiftKey ||
      this.state.shiftKeyDown ||
      verticalWheelDelta ||
      this.isMouseWheelZoom(event, delta);
    if (shouldZoom) {
      const zoomDelta = verticalWheelDelta ? delta.y : Math.abs(delta.y) >= Math.abs(delta.x) ? delta.y : delta.x;
      if (zoomDelta !== 0) {
        const zoomFactor = Math.pow(VIEW_SCALE_FACTOR, -zoomDelta / 100);
        this.state.statusText = event.shiftKey || this.state.shiftKeyDown
          ? 'Zoom con Shift + dos dedos'
          : 'Zoom con rueda de raton';
        this.updateUiStatus();
        this.renderer.zoom(this.state.viewScale * zoomFactor, this.state.mouseScreen);
      }
      return;
    }

    this.state.viewOffset = {
      x: this.state.viewOffset.x + delta.x / this.state.viewScale,
      y: this.state.viewOffset.y,
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
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) {
        redoDrawing();
      }
      else {
        undoDrawing();
      }
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      redoDrawing();
      return;
    }
    if (this.handleShortcutSequence(event)) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCommandEnter();
      this.updateUiStatus();
      this.renderer.draw();
      return;
    }
    if (
      this.state.tool === 'copy' &&
      this.state.copyDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmCopySelection();
      return;
    }
    if (
      this.state.tool === 'move' &&
      this.state.moveDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmMoveSelection();
      return;
    }
    if (
      this.state.tool === 'erase' &&
      this.state.eraseDraft?.selecting &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmEraseSelection();
      return;
    }
    if (
      this.state.tool === 'extend' &&
      this.state.extendDraft?.phase === 'boundaries' &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.confirmExtendBoundaries();
      return;
    }
    if (event.key.toLowerCase() === 'l' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('line');
      return;
    }
    if (event.key.toLowerCase() === 'a' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('extend');
      return;
    }
    if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('erase');
      return;
    }
    if (event.key.toLowerCase() === 'c' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('copy');
      return;
    }
    if (event.key.toLowerCase() === 'd' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      runCommand('move');
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
      this.cancelCurrentCommand();
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
    const multiplier = parseCopyMultiplier(this.state.distanceInput);
    const copyMultiplierDraft = this.state.lastCopy && /^x\d*$/i.test(this.state.distanceInput.trim());
    const visible = Boolean(
      (
        this.state.pendingLineStart ||
        this.state.rectangleDraft ||
        this.state.selectedGrip ||
        this.state.circleDraft ||
        this.state.arcDraft ||
        this.state.copyDraft ||
        this.state.moveDraft ||
        copyMultiplierDraft
      ) &&
      this.state.distanceInput &&
      this.state.mouseScreen,
    );

    cursorInput.classList.toggle('is-visible', visible);
    cursorInput.setAttribute('aria-hidden', String(!visible));

    if (!visible) {
      return;
    }

    cursorInput.textContent = multiplier || copyMultiplierDraft
      ? this.state.distanceInput
      : `${this.state.distanceInput} ${UNITS_LABEL}`;

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
    this.updateCanvasCursorMode();
    const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
    let toolLabel = 'Seleccion';
    if (this.state.tool === 'line') {
      toolLabel = 'Linea 2P';
    }
    if (this.state.tool === 'rectangle') {
      toolLabel = 'Rectangulo';
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
    if (this.state.tool === 'extend') {
      toolLabel = 'Alargar';
    }
    if (this.state.tool === 'erase') {
      toolLabel = 'Borrar';
    }
    if (this.state.tool === 'copy') {
      toolLabel = 'Copiar';
    }
    if (this.state.tool === 'move') {
      toolLabel = 'Desplazar';
    }
    const inputDistance = parseDistanceInput(this.state.distanceInput);
    const activeGripPoint = this.activeGripPoint();
    const coordinateOrigin = this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      activeGripPoint ||
      this.state.pendingLineStart ||
      this.state.rectangleDraft?.firstPoint ||
      this.state.circleDraft?.points[0] ||
      this.state.arcDraft?.points[0] ||
      null;
    const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);
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
    const previewEnd = coordinateTarget ||
      (inputDistance !== null && this.state.pendingLineStart && cursor
      ? pointFromDistance(this.state.pendingLineStart, cursor, inputDistance)
      : cursor);
    const gripPreviewEnd = coordinateTarget ||
      (inputDistance !== null && activeGripPoint && gripDirectionPoint
      ? pointFromDistance(activeGripPoint, gripDirectionPoint, inputDistance)
      : null);
    const copyPreviewTarget = this.state.copyDraft?.basePoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const movePreviewTarget = this.state.moveDraft?.basePoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
        : cursor))
      : null;
    const rectanglePreviewTarget = this.state.rectangleDraft?.firstPoint
      ? (coordinateTarget || (inputDistance !== null && cursor
        ? pointFromDistance(this.state.rectangleDraft.firstPoint, cursor, inputDistance)
        : cursor))
      : null;
    const previewLength = this.state.pendingLineStart && previewEnd
      ? distance(this.state.pendingLineStart, previewEnd)
      : rectanglePreviewTarget && this.state.rectangleDraft?.firstPoint
        ? distance(this.state.rectangleDraft.firstPoint, rectanglePreviewTarget)
      : this.state.circleDraft?.mode === 'center-radius' && this.state.circleDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.circleDraft.points[0], previewEnd))
      : this.state.arcDraft?.mode === 'center-radius' && this.state.arcDraft.points.length === 1 && previewEnd
        ? (inputDistance !== null ? inputDistance : distance(this.state.arcDraft.points[0], previewEnd))
      : gripPreviewEnd && activeGripPoint
        ? distance(activeGripPoint, gripPreviewEnd)
      : copyPreviewTarget && this.state.copyDraft?.basePoint
        ? distance(this.state.copyDraft.basePoint, copyPreviewTarget)
      : movePreviewTarget && this.state.moveDraft?.basePoint
        ? distance(this.state.moveDraft.basePoint, movePreviewTarget)
      : null;

    if (this.state.distanceInput) {
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : coordinateTarget
        ? `Coordenadas: ${this.state.distanceInput} ${UNITS_LABEL}`
        : (
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
    else if (this.state.rectangleDraft?.firstPoint && rectanglePreviewTarget) {
      const width = Math.abs(rectanglePreviewTarget.x - this.state.rectangleDraft.firstPoint.x);
      const height = Math.abs(rectanglePreviewTarget.y - this.state.rectangleDraft.firstPoint.y);
      this.state.statusText = `Esquina opuesta pendiente - ${formatNumber(width)} x ${formatNumber(height)} ${UNITS_LABEL}`;
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
      ? `Cursor: ${formatNumber(cursor.x)}, ${formatNumber(cursor.y)} ${UNITS_LABEL}${
          this.state.activeObjectSnap ? ` · ${formatSnapType(this.state.activeObjectSnap.type)}` : ''
        }`
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
    undoButton.disabled = !this.doc.canUndo();
    redoButton.disabled = !this.doc.canRedo();
    undoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canUndo();
    });
    redoCommandButtons.forEach((button) => {
      button.disabled = !this.doc.canRedo();
    });
    this.updateCursorInput();
  }
}

const doc = new CadDocument();
const state = {
  tool: 'select',
  pendingLineStart: null,
  rectangleDraft: null,
  circleDraft: null,
  arcDraft: null,
  copyDraft: null,
  moveDraft: null,
  eraseDraft: null,
  extendDraft: null,
  lastCopy: null,
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
  lastCommand: null,
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
  state.rectangleDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.eraseDraft = null;
  state.extendDraft = null;
  state.lastCopy = null;
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

function resetInteractionState() {
  state.pendingLineStart = null;
  state.rectangleDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.eraseDraft = null;
  state.extendDraft = null;
  state.distanceInput = '';
  state.selectedGrip = null;
  state.activeObjectSnap = null;
  controller.gripDragState = null;
  controller.panState = null;
  canvas.classList.remove('is-panning', 'is-dragging');
  controller.setTool('select');
}

function undoDrawing() {
  if (!doc.canUndo()) {
    state.statusText = 'No hay nada que deshacer';
    controller.updateUiStatus();
    renderer.draw();
    return;
  }
  resetInteractionState();
  doc.undo();
  state.statusText = 'Deshecho';
  controller.updateUiStatus();
  renderer.draw();
}

function redoDrawing() {
  if (!doc.canRedo()) {
    state.statusText = 'No hay nada que rehacer';
    controller.updateUiStatus();
    renderer.draw();
    return;
  }
  resetInteractionState();
  doc.redo();
  state.statusText = 'Rehecho';
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

  const selectedEntities = state.selectedGrip?.entity
    ? [state.selectedGrip.entity]
    : [...doc.selectedEntities];
  if (state.tool === 'select' && selectedEntities.length) {
    const changedEntities = selectedEntities.filter((entity) => normalizeLineStyleId(entity.lineStyle) !== style.id);
    if (changedEntities.length) {
      doc.recordHistory();
      changedEntities.forEach((entity) => applyLineStyleToEntity(entity, style.id));
      doc.markDirty();
    }
    state.statusText = changedEntities.length === 1
      ? `Entidad cambiada a capa ${style.label}`
      : changedEntities.length
        ? `${changedEntities.length} entidades cambiadas a capa ${style.label}`
        : `Entidad ya esta en capa ${style.label}`;
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

function commandLabel(command) {
  const labels = {
    line: 'Linea',
    rectangle: 'Rectangulo',
    'circle-center': 'Circulo centro-radio',
    'circle-3p': 'Circulo 3 puntos',
    'arc-center-radius': 'Arco centro-radio',
    'arc-3p': 'Arco 3 puntos',
    'arc-center-start-end': 'Arco centro-inicio-final',
    copy: 'Copiar',
    move: 'Desplazar',
    trim: 'Recortar',
    extend: 'Alargar',
    erase: 'Borrar',
  };
  return labels[command] || 'Comando';
}

function runCommand(command) {
  if (REPEATABLE_COMMANDS.has(command)) {
    state.lastCommand = command;
  }
  if (command === 'undo') undoDrawing();
  if (command === 'redo') redoDrawing();
  if (command === 'select') controller.setTool('select');
  if (command === 'line') controller.setTool('line');
  if (command === 'rectangle') controller.setTool('rectangle');
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
  if (command === 'copy') controller.startCopy();
  if (command === 'move') controller.startMove();
  if (command === 'trim') controller.setTool('trim');
  if (command === 'extend') controller.startExtend();
  if (command === 'erase') controller.startErase();
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
rectangleToolButton.addEventListener('click', () => runCommand('rectangle'));
circleToolButton.addEventListener('click', () => runCommand(state.lastCircleTool));
function toggleToolGroupFromButton(button, event) {
  event.preventDefault();
  event.stopPropagation();
  const group = button.closest('.tool-group');
  setToolGroupOpen(group, !group.classList.contains('is-open'));
}

circleToolMenuButton.addEventListener('pointerdown', (event) => {
  toggleToolGroupFromButton(circleToolMenuButton, event);
});
circleToolMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
arcToolButton.addEventListener('click', () => runCommand(state.lastArcTool));
arcToolMenuButton.addEventListener('pointerdown', (event) => {
  toggleToolGroupFromButton(arcToolMenuButton, event);
});
arcToolMenuButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
toolFlyoutCommandButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    runCommand(button.dataset.command);
  });
});
trimToolButton.addEventListener('click', () => runCommand('trim'));
extendToolButton.addEventListener('click', () => runCommand('extend'));
copyToolButton.addEventListener('click', () => runCommand('copy'));
moveToolButton.addEventListener('click', () => runCommand('move'));
eraseToolButton.addEventListener('click', () => runCommand('erase'));
fitButton.addEventListener('click', () => runCommand('fit'));
undoButton.addEventListener('click', () => runCommand('undo'));
redoButton.addEventListener('click', () => runCommand('redo'));
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
  state.rectangleDraft = null;
  state.circleDraft = null;
  state.arcDraft = null;
  state.copyDraft = null;
  state.moveDraft = null;
  state.eraseDraft = null;
  state.extendDraft = null;
  state.lastCopy = null;
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

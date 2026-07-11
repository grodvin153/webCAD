/* webCAD - Geometria analitica de elipses | SPDX-License-Identifier: GPL-3.0-or-later */

import { SNAP_THRESHOLD } from '../config.js';
import { coordinateZ } from '../coordinates/point3.js';
import { createBounds, distance, normalizeAngle, TWO_PI } from '../geometry.js';

export function isEllipseEntity(entity) {
  return entity?.type === 'ELLIPSE' || entity?.type === 'ELLIPSE_ARC';
}

export function ellipsePoint(entity, parameter) {
  const cosine = Math.cos(parameter);
  const sine = Math.sin(parameter);
  const rotationCosine = Math.cos(entity.rotation);
  const rotationSine = Math.sin(entity.rotation);
  return {
    x: entity.center.x + entity.radiusX * cosine * rotationCosine - entity.radiusY * sine * rotationSine,
    y: entity.center.y + entity.radiusX * cosine * rotationSine + entity.radiusY * sine * rotationCosine,
    z: coordinateZ(entity.center),
  };
}

export function ellipseParameter(entity, point) {
  const cosine = Math.cos(entity.rotation);
  const sine = Math.sin(entity.rotation);
  const deltaX = point.x - entity.center.x;
  const deltaY = point.y - entity.center.y;
  const localX = deltaX * cosine + deltaY * sine;
  const localY = -deltaX * sine + deltaY * cosine;
  return normalizeAngle(Math.atan2(localY / entity.radiusY, localX / entity.radiusX));
}

export function ellipseSweep(entity) {
  if (entity.type === 'ELLIPSE') return TWO_PI;
  return entity.clockwise === false
    ? normalizeAngle(entity.startParameter - entity.endParameter)
    : normalizeAngle(entity.endParameter - entity.startParameter);
}

export function ellipseParameterOnEntity(parameter, entity, tolerance = SNAP_THRESHOLD) {
  if (entity.type === 'ELLIPSE') return true;
  const sweep = ellipseSweep(entity);
  const offset = entity.clockwise === false
    ? normalizeAngle(entity.startParameter - parameter)
    : normalizeAngle(parameter - entity.startParameter);
  return offset <= sweep + tolerance;
}

export function ellipseNormalizedParameter(entity, point) {
  const parameter = ellipseParameter(entity, point);
  if (entity.type === 'ELLIPSE') return parameter / TWO_PI;
  const sweep = ellipseSweep(entity);
  if (sweep <= SNAP_THRESHOLD) return 0;
  const offset = entity.clockwise === false
    ? normalizeAngle(entity.startParameter - parameter)
    : normalizeAngle(parameter - entity.startParameter);
  return Math.max(0, Math.min(1, offset / sweep));
}

export function ellipseParameterAtNormalized(entity, normalized) {
  if (entity.type === 'ELLIPSE') return normalizeAngle(normalized * TWO_PI);
  const direction = entity.clockwise === false ? -1 : 1;
  return normalizeAngle(entity.startParameter + direction * ellipseSweep(entity) * normalized);
}

export function ellipseReferencePoints(entity) {
  if (!isEllipseEntity(entity)) return [];
  const axis = { x: Math.cos(entity.rotation), y: Math.sin(entity.rotation) };
  const normal = { x: -axis.y, y: axis.x };
  const focalRadius = Math.sqrt(Math.max(0, entity.radiusX ** 2 - entity.radiusY ** 2));
  const point = (x, y) => ({ x, y, z: coordinateZ(entity.center) });
  const candidates = [
    { type: 'center', key: 'focus-0', point: point(entity.center.x + axis.x * focalRadius, entity.center.y + axis.y * focalRadius) },
    { type: 'center', key: 'focus-1', point: point(entity.center.x - axis.x * focalRadius, entity.center.y - axis.y * focalRadius) },
    { type: 'quadrant', key: 'major-0', point: point(entity.center.x + axis.x * entity.radiusX, entity.center.y + axis.y * entity.radiusX) },
    { type: 'quadrant', key: 'major-1', point: point(entity.center.x - axis.x * entity.radiusX, entity.center.y - axis.y * entity.radiusX) },
    { type: 'quadrant', key: 'minor-0', point: point(entity.center.x + normal.x * entity.radiusY, entity.center.y + normal.y * entity.radiusY) },
    { type: 'quadrant', key: 'minor-1', point: point(entity.center.x - normal.x * entity.radiusY, entity.center.y - normal.y * entity.radiusY) },
  ];
  if (entity.type === 'ELLIPSE_ARC') {
    candidates.push(
      { type: 'endpoint', key: 'start', point: ellipsePoint(entity, entity.startParameter) },
      { type: 'endpoint', key: 'end', point: ellipsePoint(entity, entity.endParameter) },
    );
  }
  return candidates;
}

export function ellipseBounds(entity) {
  const parameters = entity.type === 'ELLIPSE_ARC'
    ? [entity.startParameter, entity.endParameter]
    : [];
  const cosine = Math.cos(entity.rotation);
  const sine = Math.sin(entity.rotation);
  const xExtreme = Math.atan2(-entity.radiusY * sine, entity.radiusX * cosine);
  const yExtreme = Math.atan2(entity.radiusY * cosine, entity.radiusX * sine);
  for (const parameter of [xExtreme, xExtreme + Math.PI, yExtreme, yExtreme + Math.PI]) {
    const normalized = normalizeAngle(parameter);
    if (ellipseParameterOnEntity(normalized, entity)) parameters.push(normalized);
  }
  const points = parameters.length
    ? parameters.map((parameter) => ellipsePoint(entity, parameter))
    : [ellipsePoint(entity, 0)];
  return createBounds(
    Math.min(...points.map((point) => point.x)),
    Math.min(...points.map((point) => point.y)),
    Math.max(...points.map((point) => point.x)),
    Math.max(...points.map((point) => point.y)),
  );
}

export function sampleEllipse(entity, count = 96) {
  const samples = Math.max(8, Math.floor(count));
  const points = [];
  for (let index = 0; index <= samples; index += 1) {
    points.push(ellipsePoint(entity, ellipseParameterAtNormalized(entity, index / samples)));
  }
  return points;
}

export function distancePointToEllipse(point, entity) {
  const samples = Math.min(512, Math.max(48,
    Math.ceil(ellipseSweep(entity) * Math.max(entity.radiusX, entity.radiusY) / 2)));
  let bestParameter = entity.type === 'ELLIPSE_ARC' ? entity.startParameter : 0;
  let bestDistance = Infinity;
  for (let index = 0; index <= samples; index += 1) {
    const parameter = ellipseParameterAtNormalized(entity, index / samples);
    const candidateDistance = distance(point, ellipsePoint(entity, parameter));
    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      bestParameter = parameter;
    }
  }
  let parameter = bestParameter;
  for (let iteration = 0; iteration < 12; iteration += 1) {
    const step = 1e-5;
    const current = ellipsePoint(entity, parameter);
    const before = ellipsePoint(entity, parameter - step);
    const after = ellipsePoint(entity, parameter + step);
    const firstX = (after.x - before.x) / (2 * step);
    const firstY = (after.y - before.y) / (2 * step);
    const secondX = (after.x - 2 * current.x + before.x) / (step * step);
    const secondY = (after.y - 2 * current.y + before.y) / (step * step);
    const deltaX = current.x - point.x;
    const deltaY = current.y - point.y;
    const numerator = deltaX * firstX + deltaY * firstY;
    const denominator = firstX * firstX + firstY * firstY + deltaX * secondX + deltaY * secondY;
    if (Math.abs(denominator) <= 1e-12) break;
    parameter = normalizeAngle(parameter - numerator / denominator);
    if (!ellipseParameterOnEntity(parameter, entity)) {
      return Math.min(
        distance(point, ellipsePoint(entity, entity.startParameter)),
        distance(point, ellipsePoint(entity, entity.endParameter)),
      );
    }
  }
  return distance(point, ellipsePoint(entity, parameter));
}

function uniquePoints(points) {
  return points.filter((point, index) => points.findIndex((candidate) =>
    distance(candidate, point) <= SNAP_THRESHOLD) === index);
}

export function lineEllipseIntersectionPoints(line, ellipse) {
  const cosine = Math.cos(ellipse.rotation);
  const sine = Math.sin(ellipse.rotation);
  const local = (point) => ({
    x: ((point.x - ellipse.center.x) * cosine + (point.y - ellipse.center.y) * sine) / ellipse.radiusX,
    y: (-(point.x - ellipse.center.x) * sine + (point.y - ellipse.center.y) * cosine) / ellipse.radiusY,
  });
  const start = local(line.start);
  const end = local(line.end);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const a = dx * dx + dy * dy;
  const b = 2 * (start.x * dx + start.y * dy);
  const c = start.x * start.x + start.y * start.y - 1;
  const discriminant = b * b - 4 * a * c;
  if (a <= 1e-14 || discriminant < -SNAP_THRESHOLD) return [];
  const roots = Math.abs(discriminant) <= SNAP_THRESHOLD
    ? [-b / (2 * a)]
    : [(-b - Math.sqrt(discriminant)) / (2 * a), (-b + Math.sqrt(discriminant)) / (2 * a)];
  return uniquePoints(roots
    .filter((parameter) => parameter >= -SNAP_THRESHOLD && parameter <= 1 + SNAP_THRESHOLD)
    .map((parameter) => ({
      x: line.start.x + (line.end.x - line.start.x) * parameter,
      y: line.start.y + (line.end.y - line.start.y) * parameter,
      z: coordinateZ(line.start) + (coordinateZ(line.end) - coordinateZ(line.start)) * parameter,
    }))
    .filter((point) => ellipseParameterOnEntity(ellipseParameter(ellipse, point), ellipse)));
}

function conicForEntity(entity) {
  if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
    return { xx: 1, xy: 0, yy: 1, x: -2 * entity.center.x, y: -2 * entity.center.y,
      constant: entity.center.x ** 2 + entity.center.y ** 2 - entity.radius ** 2 };
  }
  const cosine = Math.cos(entity.rotation);
  const sine = Math.sin(entity.rotation);
  const inverseX = 1 / (entity.radiusX ** 2);
  const inverseY = 1 / (entity.radiusY ** 2);
  const xx = cosine ** 2 * inverseX + sine ** 2 * inverseY;
  const yy = sine ** 2 * inverseX + cosine ** 2 * inverseY;
  const xy = 2 * cosine * sine * (inverseX - inverseY);
  return {
    xx, xy, yy,
    x: -2 * xx * entity.center.x - xy * entity.center.y,
    y: -xy * entity.center.x - 2 * yy * entity.center.y,
    constant: xx * entity.center.x ** 2 + xy * entity.center.x * entity.center.y +
      yy * entity.center.y ** 2 - 1,
  };
}

function evaluateConic(conic, point) {
  return conic.xx * point.x ** 2 + conic.xy * point.x * point.y + conic.yy * point.y ** 2 +
    conic.x * point.x + conic.y * point.y + conic.constant;
}

function complexMultiply(first, second) {
  return { r: first.r * second.r - first.i * second.i, i: first.r * second.i + first.i * second.r };
}

function complexDivide(first, second) {
  const denominator = second.r ** 2 + second.i ** 2;
  return { r: (first.r * second.r + first.i * second.i) / denominator,
    i: (first.i * second.r - first.r * second.i) / denominator };
}

function polynomialValue(coefficients, value) {
  return coefficients.reduce((result, coefficient) => ({
    r: result.r * value.r - result.i * value.i + coefficient,
    i: result.r * value.i + result.i * value.r,
  }), { r: 0, i: 0 });
}

function realPolynomialRoots(coefficients) {
  const scale = Math.max(...coefficients.map(Math.abs), 1);
  const values = coefficients.map((value) => Math.abs(value / scale) <= 1e-12 ? 0 : value / scale);
  while (values.length > 1 && values[0] === 0) values.shift();
  const degree = values.length - 1;
  if (degree <= 0) return [];
  if (degree === 1) return [-values[1] / values[0]];
  if (degree === 2) {
    const discriminant = values[1] ** 2 - 4 * values[0] * values[2];
    if (discriminant < -1e-10) return [];
    if (Math.abs(discriminant) <= 1e-10) return [-values[1] / (2 * values[0])];
    return [(-values[1] - Math.sqrt(discriminant)) / (2 * values[0]),
      (-values[1] + Math.sqrt(discriminant)) / (2 * values[0])];
  }
  const normalized = values.map((value) => value / values[0]);
  const radius = 1 + Math.max(...normalized.slice(1).map(Math.abs));
  const roots = Array.from({ length: degree }, (_, index) => {
    const angle = TWO_PI * (index + 0.35) / degree;
    return { r: radius * Math.cos(angle), i: radius * Math.sin(angle) };
  });
  for (let iteration = 0; iteration < 140; iteration += 1) {
    let maximumChange = 0;
    for (let index = 0; index < degree; index += 1) {
      let denominator = { r: 1, i: 0 };
      for (let other = 0; other < degree; other += 1) {
        if (other === index) continue;
        denominator = complexMultiply(denominator, {
          r: roots[index].r - roots[other].r,
          i: roots[index].i - roots[other].i,
        });
      }
      if (denominator.r ** 2 + denominator.i ** 2 <= 1e-24) continue;
      const correction = complexDivide(polynomialValue(normalized, roots[index]), denominator);
      roots[index] = { r: roots[index].r - correction.r, i: roots[index].i - correction.i };
      maximumChange = Math.max(maximumChange, Math.hypot(correction.r, correction.i));
    }
    if (maximumChange <= 1e-11) break;
  }
  return roots.filter((root) => Math.abs(root.i) <= 1e-5).map((root) => root.r);
}

export function ellipseConicIntersectionPoints(ellipse, other) {
  const conic = conicForEntity(other);
  const rotationCosine = Math.cos(ellipse.rotation);
  const rotationSine = Math.sin(ellipse.rotation);
  const center = ellipse.center;
  const u = { x: ellipse.radiusX * rotationCosine, y: ellipse.radiusX * rotationSine };
  const v = { x: -ellipse.radiusY * rotationSine, y: ellipse.radiusY * rotationCosine };
  const quadratic = (first, second) =>
    conic.xx * first.x * second.x + conic.xy * (first.x * second.y + first.y * second.x) * 0.5 +
    conic.yy * first.y * second.y;
  const linear = (vector) => conic.x * vector.x + conic.y * vector.y;
  const a = quadratic(u, u);
  const b = 2 * quadratic(u, v);
  const c = quadratic(v, v);
  const d = 2 * quadratic(center, u) + linear(u);
  const e = 2 * quadratic(center, v) + linear(v);
  const f = evaluateConic(conic, center);
  const roots = realPolynomialRoots([
    a - d + f,
    -2 * b + 2 * e,
    -2 * a + 4 * c + 2 * f,
    2 * b + 2 * e,
    a + d + f,
  ]);
  const parameters = roots.map((root) => normalizeAngle(2 * Math.atan(root)));
  if (Math.abs(evaluateConic(conic, ellipsePoint(ellipse, Math.PI))) <= 1e-7) parameters.push(Math.PI);
  return uniquePoints(parameters
    .map((parameter) => ellipsePoint(ellipse, parameter))
    .filter((point) => Math.abs(evaluateConic(conic, point)) <= 1e-5)
    .filter((point) => ellipseParameterOnEntity(ellipseParameter(ellipse, point), ellipse))
    .filter((point) => {
      if (other.type === 'ARC') {
        const angle = normalizeAngle(Math.atan2(point.y - other.center.y, point.x - other.center.x));
        const sweep = other.clockwise === false
          ? normalizeAngle(other.startAngle - angle)
          : normalizeAngle(angle - other.startAngle);
        const total = other.clockwise === false
          ? normalizeAngle(other.startAngle - other.endAngle)
          : normalizeAngle(other.endAngle - other.startAngle);
        return sweep <= total + SNAP_THRESHOLD;
      }
      return !isEllipseEntity(other) || ellipseParameterOnEntity(ellipseParameter(other, point), other);
    }));
}

export function ellipseIntersectionPoints(first, second) {
  if (first.type === 'LINE') return lineEllipseIntersectionPoints(first, second);
  if (second.type === 'LINE') return lineEllipseIntersectionPoints(second, first);
  if (isEllipseEntity(first) && (isEllipseEntity(second) || second.type === 'CIRCLE' || second.type === 'ARC')) {
    return ellipseConicIntersectionPoints(first, second);
  }
  if (isEllipseEntity(second) && (first.type === 'CIRCLE' || first.type === 'ARC')) {
    return ellipseConicIntersectionPoints(second, first);
  }
  return [];
}

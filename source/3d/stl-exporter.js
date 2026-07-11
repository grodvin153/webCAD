/* webCAD - Exportacion STL desde modelo documental 3D | SPDX-License-Identifier: GPL-3.0-or-later */

const EPSILON = 1e-10;

function point3(point) {
  return {
    x: Number(point?.x),
    y: Number(point?.y),
    z: Number(point?.z),
  };
}

function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function length(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function finitePoint(point) {
  return Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.z);
}

function triangleNormal(a, b, c) {
  const normal = cross(sub(b, a), sub(c, a));
  const normalLength = length(normal);
  if (normalLength <= EPSILON || !Number.isFinite(normalLength)) return null;
  return {
    x: normal.x / normalLength,
    y: normal.y / normalLength,
    z: normal.z / normalLength,
  };
}

function polygonNormal(points) {
  const normal = { x: 0, y: 0, z: 0 };
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    normal.x += (current.y - next.y) * (current.z + next.z);
    normal.y += (current.z - next.z) * (current.x + next.x);
    normal.z += (current.x - next.x) * (current.y + next.y);
  }
  return length(normal) > EPSILON ? normal : null;
}

function projectPoint(point, normal) {
  const ax = Math.abs(normal.x);
  const ay = Math.abs(normal.y);
  const az = Math.abs(normal.z);
  if (az >= ax && az >= ay) return { x: point.x, y: point.y };
  if (ax >= ay) return { x: point.y, y: point.z };
  return { x: point.x, y: point.z };
}

function signedArea2d(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return area * 0.5;
}

function cross2d(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function pointInTriangle(point, a, b, c, orientation) {
  const ab = cross2d(a, b, point) * orientation;
  const bc = cross2d(b, c, point) * orientation;
  const ca = cross2d(c, a, point) * orientation;
  return ab >= -EPSILON && bc >= -EPSILON && ca >= -EPSILON;
}

function triangulateProjectedPolygon(projected) {
  if (projected.length === 3) return [[0, 1, 2]];
  const area = signedArea2d(projected);
  const orientation = area < 0 ? -1 : 1;
  const remaining = projected.map((_, index) => index);
  const triangles = [];
  let guard = 0;
  while (remaining.length > 3 && guard < projected.length * projected.length) {
    guard += 1;
    let clipped = false;
    for (let item = 0; item < remaining.length; item += 1) {
      const previousIndex = remaining[(item - 1 + remaining.length) % remaining.length];
      const currentIndex = remaining[item];
      const nextIndex = remaining[(item + 1) % remaining.length];
      const previous = projected[previousIndex];
      const current = projected[currentIndex];
      const next = projected[nextIndex];
      if (cross2d(previous, current, next) * orientation <= EPSILON) continue;
      const containsPoint = remaining.some((candidateIndex) => {
        if ([previousIndex, currentIndex, nextIndex].includes(candidateIndex)) return false;
        return pointInTriangle(projected[candidateIndex], previous, current, next, orientation);
      });
      if (containsPoint) continue;
      triangles.push([previousIndex, currentIndex, nextIndex]);
      remaining.splice(item, 1);
      clipped = true;
      break;
    }
    if (!clipped) break;
  }
  if (remaining.length === 3) triangles.push([...remaining]);
  return triangles.length ? triangles : projected.slice(1, -1).map((_, index) => [0, index + 1, index + 2]);
}

export function triangulateSolidFace(solid, face) {
  if (!Array.isArray(face) || face.length < 3 || !Array.isArray(solid?.vertices)) return [];
  const points = face.map((vertexIndex) => point3(solid.vertices[vertexIndex]));
  if (!points.every(finitePoint)) return [];
  if (points.length === 3) {
    const normal = triangleNormal(points[0], points[1], points[2]);
    return normal ? [{ normal, vertices: points }] : [];
  }
  const normal = polygonNormal(points);
  if (!normal) return [];
  const projected = points.map((point) => projectPoint(point, normal));
  return triangulateProjectedPolygon(projected)
    .map((triangle) => triangle.map((index) => points[index]))
    .map((vertices) => ({
      normal: triangleNormal(vertices[0], vertices[1], vertices[2]),
      vertices,
    }))
    .filter((triangle) => triangle.normal);
}

export function visibleDocumentSolids(model3d) {
  return (Array.isArray(model3d?.solids) ? model3d.solids : [])
    .filter((record) => record?.visible !== false && record?.solid);
}

export function trianglesFromSolid(solid) {
  return (Array.isArray(solid?.faces) ? solid.faces : [])
    .flatMap((face) => triangulateSolidFace(solid, face));
}

function stlNumber(value) {
  return Number.isFinite(value) ? Number(value).toPrecision(12) : '0';
}

function stlVertex(point) {
  return `      vertex ${stlNumber(point.x)} ${stlNumber(point.y)} ${stlNumber(point.z)}`;
}

export function exportModel3dToAsciiStl(model3d, options = {}) {
  const visibleSolids = visibleDocumentSolids(model3d);
  if (!visibleSolids.length) {
    throw new Error('No hay solidos 3D visibles para exportar a STL');
  }
  const triangles = visibleSolids.flatMap((record) => trianglesFromSolid(record.solid));
  if (!triangles.length) {
    throw new Error('Los solidos 3D visibles no contienen triangulos STL validos');
  }
  const name = String(options.name || 'webcad').replace(/[^\w.-]+/g, '_') || 'webcad';
  const lines = [`solid ${name}`];
  triangles.forEach((triangle) => {
    lines.push(
      `  facet normal ${stlNumber(triangle.normal.x)} ${stlNumber(triangle.normal.y)} ${stlNumber(triangle.normal.z)}`,
      '    outer loop',
      stlVertex(triangle.vertices[0]),
      stlVertex(triangle.vertices[1]),
      stlVertex(triangle.vertices[2]),
      '    endloop',
      '  endfacet',
    );
  });
  lines.push(`endsolid ${name}`);
  return {
    solidCount: visibleSolids.length,
    text: `${lines.join('\n')}\n`,
    triangleCount: triangles.length,
  };
}

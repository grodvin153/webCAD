/* webCAD - Cubo navegador superpuesto para la vista Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  cameraViewDirection,
  cameraViewOrientation,
  closestCameraView,
  DEFAULT_ISOMETRIC_VIEW_ID,
} from './camera-view-orientations.js';
import { THREE_VIEW_STYLE } from './three-scene-style.js';

function cssColor(value) {
  return `#${Number(value).toString(16).padStart(6, '0')}`;
}

export const VIEW_CUBE_AXIS_COLORS = Object.freeze({
  x: cssColor(THREE_VIEW_STYLE.axisX),
  y: cssColor(THREE_VIEW_STYLE.axisY),
  z: cssColor(THREE_VIEW_STYLE.axisZ),
});

const FACE_DEFINITIONS = [
  {
    id: 'perfil-derecho',
    label: 'PERFIL',
    normal: { x: 1, y: 0, z: 0 },
    vertices: [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
  },
  {
    id: 'perfil-izquierdo',
    label: 'PERFIL IZQ.',
    normal: { x: -1, y: 0, z: 0 },
    vertices: [[-1, 1, -1], [-1, -1, -1], [-1, -1, 1], [-1, 1, 1]],
  },
  {
    id: 'posterior',
    label: 'POST.',
    normal: { x: 0, y: 1, z: 0 },
    vertices: [[1, 1, -1], [-1, 1, -1], [-1, 1, 1], [1, 1, 1]],
  },
  {
    id: 'alzado',
    label: 'ALZADO',
    normal: { x: 0, y: -1, z: 0 },
    vertices: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
  },
  {
    id: 'planta',
    label: 'PLANTA',
    normal: { x: 0, y: 0, z: 1 },
    vertices: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
  },
  {
    id: 'inferior',
    label: 'INFERIOR',
    normal: { x: 0, y: 0, z: -1 },
    vertices: [[-1, 1, -1], [1, 1, -1], [1, -1, -1], [-1, -1, -1]],
  },
];

const CORNERS = [];
for (const x of [-1, 1]) {
  for (const y of [-1, 1]) {
    for (const z of [-1, 1]) CORNERS.push({ x, y, z });
  }
}

const EDGES = [];
for (let first = 0; first < CORNERS.length; first += 1) {
  for (let second = first + 1; second < CORNERS.length; second += 1) {
    const a = CORNERS[first];
    const b = CORNERS[second];
    const differences = ['x', 'y', 'z'].filter((axis) => a[axis] !== b[axis]);
    if (differences.length !== 1) continue;
    const axis = differences[0];
    const direction = {
      x: a.x === b.x ? a.x : 0,
      y: a.y === b.y ? a.y : 0,
      z: a.z === b.z ? a.z : 0,
    };
    EDGES.push({ a, axis, b, direction });
  }
}

function rotateIntoCamera(vector, quaternion) {
  const qx = -Number(quaternion?.x || 0);
  const qy = -Number(quaternion?.y || 0);
  const qz = -Number(quaternion?.z || 0);
  const qw = Number(quaternion?.w ?? 1);
  const ix = qw * vector.x + qy * vector.z - qz * vector.y;
  const iy = qw * vector.y + qz * vector.x - qx * vector.z;
  const iz = qw * vector.z + qx * vector.y - qy * vector.x;
  const iw = -qx * vector.x - qy * vector.y - qz * vector.z;
  return {
    x: ix * qw + iw * -qx + iy * -qz - iz * -qy,
    y: iy * qw + iw * -qy + iz * -qx - ix * -qz,
    z: iz * qw + iw * -qz + ix * -qy - iy * -qx,
  };
}

function polygonContains(point, polygon) {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1;
    current < polygon.length;
    previous = current, current += 1) {
    const a = polygon[current];
    const b = polygon[previous];
    const crosses = (a.y > point.y) !== (b.y > point.y) &&
      point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function distanceToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared <= 1e-12) return Math.hypot(point.x - start.x, point.y - start.y);
  const ratio = Math.max(0, Math.min(
    1,
    ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared,
  ));
  return Math.hypot(
    point.x - (start.x + dx * ratio),
    point.y - (start.y + dy * ratio),
  );
}

function sameDirection(a, b) {
  return Math.abs(a.x - b.x) < 1e-9 &&
    Math.abs(a.y - b.y) < 1e-9 &&
    Math.abs(a.z - b.z) < 1e-9;
}

function polygonCenter(points) {
  return points.reduce((center, point) => ({
    x: center.x + point.x / points.length,
    y: center.y + point.y / points.length,
  }), { x: 0, y: 0 });
}

function polygonArea(points) {
  return Math.abs(points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - next.x * point.y;
  }, 0) * 0.5);
}

export function createThreeViewCube({
  camera,
  canvas,
  container,
  homeButton,
  label,
  onSelect,
  target,
} = {}) {
  if (!camera || !canvas || !container) return null;
  const context = canvas.getContext('2d');
  if (!context) return null;

  let frame = null;
  let hovered = null;
  let disposed = false;

  function orientationForHit(hit) {
    if (!hit) return null;
    if (hit.id) return cameraViewOrientation(hit.id);
    const direction = hit.direction;
    const closest = closestCameraView(direction, 0.999999);
    return closest ?? cameraViewOrientation({
      direction,
      label: hit.type === 'edge' ? 'Vista diagonal' : 'Vista isométrica',
      type: hit.type,
    });
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width || 116));
    const height = Math.max(1, Math.round(bounds.height || 116));
    const pixelRatio = Math.min(globalThis.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(width * pixelRatio);
    const pixelHeight = Math.round(height * pixelRatio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return { height, width };
  }

  function projectPoint(point, center, scale) {
    const transformed = rotateIntoCamera(point, camera.quaternion);
    return {
      x: center.x + transformed.x * scale,
      y: center.y - transformed.y * scale,
      z: transformed.z,
    };
  }

  function buildFrame(width, height) {
    const center = { x: width / 2, y: height / 2 };
    const scale = Math.min(width, height) * 0.27;
    const faces = FACE_DEFINITIONS.map((face) => {
      const normal = rotateIntoCamera(face.normal, camera.quaternion);
      const points = face.vertices.map(([x, y, z]) =>
        projectPoint({ x, y, z }, center, scale));
      return {
        ...face,
        depth: points.reduce((sum, point) => sum + point.z, 0) / points.length,
        direction: face.normal,
        normal,
        points,
        type: 'face',
      };
    }).filter((face) => face.normal.z > 0.001)
      .sort((a, b) => a.depth - b.depth);
    const corners = CORNERS.map((corner) => ({
      depth: rotateIntoCamera(corner, camera.quaternion).z,
      direction: corner,
      point: projectPoint(corner, center, scale),
      type: 'corner',
      visible: faces.some((face) => face.vertices.some(([x, y, z]) =>
        x === corner.x && y === corner.y && z === corner.z)),
    })).filter((corner) => corner.visible);
    const edges = EDGES.map((edge) => ({
      ...edge,
      depth: (
        rotateIntoCamera(edge.a, camera.quaternion).z +
        rotateIntoCamera(edge.b, camera.quaternion).z
      ) / 2,
      end: projectPoint(edge.b, center, scale),
      start: projectPoint(edge.a, center, scale),
      type: 'edge',
      visible: faces.some((face) =>
        face.vertices.some(([x, y, z]) =>
          x === edge.a.x && y === edge.a.y && z === edge.a.z) &&
        face.vertices.some(([x, y, z]) =>
          x === edge.b.x && y === edge.b.y && z === edge.b.z)),
    })).filter((edge) => edge.visible);
    return { corners, edges, faces, height, width };
  }

  function activeView() {
    return closestCameraView(cameraViewDirection(camera.position, target()), 0.998);
  }

  function draw() {
    if (disposed || container.hidden) return;
    const { width, height } = resizeCanvas();
    frame = buildFrame(width, height);
    context.clearRect(0, 0, width, height);
    const active = activeView();

    frame.faces.forEach((face) => {
      const isHovered = hovered?.type === 'face' && hovered.id === face.id;
      const isActive = active?.type === 'face' && active.id === face.id;
      context.beginPath();
      face.points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.closePath();
      context.fillStyle = isHovered
        ? '#ffd7b8'
        : isActive
          ? '#f3a56f'
          : `rgba(238, 245, 244, ${0.72 + face.normal.z * 0.18})`;
      context.strokeStyle = isHovered || isActive ? '#ad4b1f' : '#6e8791';
      context.lineWidth = isHovered || isActive ? 2.3 : 1.25;
      context.fill();
      context.stroke();
      if (polygonArea(face.points) < 260) return;
      const center = polygonCenter(face.points);
      context.fillStyle = '#243d47';
      context.font = '700 9px "Arial Narrow", Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(face.label, center.x, center.y);
    });

    [...frame.edges]
      .sort((a, b) => a.depth - b.depth)
      .forEach((edge) => {
        context.beginPath();
        context.moveTo(edge.start.x, edge.start.y);
        context.lineTo(edge.end.x, edge.end.y);
        context.strokeStyle = VIEW_CUBE_AXIS_COLORS[edge.axis];
        context.globalAlpha = 0.82;
        context.lineCap = 'round';
        context.lineWidth = 1.8;
        context.stroke();
        context.globalAlpha = 1;
      });

    frame.edges.forEach((edge) => {
      const edgeDirection = cameraViewOrientation({ direction: edge.direction }).direction;
      const isHovered = hovered?.type === 'edge' &&
        sameDirection(cameraViewOrientation({ direction: hovered.direction }).direction, edgeDirection);
      const isActive = active?.type === 'edge' &&
        sameDirection(active.direction, edgeDirection);
      if (!isHovered && !isActive) return;
      context.beginPath();
      context.moveTo(edge.start.x, edge.start.y);
      context.lineTo(edge.end.x, edge.end.y);
      context.strokeStyle = isHovered ? '#d05a1f' : '#b84a19';
      context.lineCap = 'round';
      context.lineWidth = isHovered ? 7 : 5;
      context.stroke();
    });

    frame.corners.forEach((corner) => {
      const cornerDirection = cameraViewOrientation({ direction: corner.direction }).direction;
      const isHovered = hovered?.type === 'corner' &&
        sameDirection(
          cameraViewOrientation({ direction: hovered.direction }).direction,
          cornerDirection,
        );
      const isActive = active?.type === 'corner' &&
        sameDirection(active.direction, cornerDirection);
      if (!isHovered && !isActive) return;
      context.beginPath();
      context.arc(corner.point.x, corner.point.y, isHovered ? 7 : 5.5, 0, Math.PI * 2);
      context.fillStyle = isHovered ? '#d05a1f' : '#b84a19';
      context.fill();
      context.strokeStyle = '#fff8f0';
      context.lineWidth = 1.5;
      context.stroke();
    });

    const activeLabel = active?.label ?? 'Vista libre';
    if (label) label.textContent = activeLabel;
    homeButton?.setAttribute(
      'aria-pressed',
      String(active?.id === DEFAULT_ISOMETRIC_VIEW_ID),
    );
  }

  function hitAt(event) {
    if (!frame) return null;
    const bounds = canvas.getBoundingClientRect();
    const point = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    const corner = [...frame.corners]
      .sort((a, b) => b.depth - a.depth)
      .find((candidate) =>
        Math.hypot(point.x - candidate.point.x, point.y - candidate.point.y) <= 9);
    if (corner) return corner;
    const edge = [...frame.edges]
      .sort((a, b) => b.depth - a.depth)
      .find((candidate) => distanceToSegment(point, candidate.start, candidate.end) <= 6);
    if (edge) return edge;
    return [...frame.faces]
      .sort((a, b) => b.depth - a.depth)
      .find((face) => polygonContains(point, face.points)) ?? null;
  }

  function updateHover(event) {
    hovered = hitAt(event);
    canvas.classList.toggle('is-interactive', Boolean(hovered));
    const orientation = orientationForHit(hovered);
    canvas.setAttribute(
      'aria-label',
      orientation
        ? `Cubo de vistas. Activar ${orientation.label}`
        : 'Cubo navegador de vistas 3D',
    );
    draw();
  }

  function leave() {
    hovered = null;
    canvas.classList.remove('is-interactive');
    canvas.setAttribute('aria-label', 'Cubo navegador de vistas 3D');
    draw();
  }

  function selectHovered(event) {
    const hit = hitAt(event);
    const orientation = orientationForHit(hit);
    if (!orientation) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect?.(orientation);
  }

  function resetView(event) {
    event.preventDefault();
    event.stopPropagation();
    onSelect?.(cameraViewOrientation(DEFAULT_ISOMETRIC_VIEW_ID));
  }

  canvas.addEventListener('pointermove', updateHover);
  canvas.addEventListener('pointerleave', leave);
  canvas.addEventListener('click', selectHovered);
  homeButton?.addEventListener('click', resetView);

  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      canvas.removeEventListener('pointermove', updateHover);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('click', selectHovered);
      homeButton?.removeEventListener('click', resetView);
    },
    draw,
  };
}

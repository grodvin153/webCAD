/* webCAD - Estilo visual aislado para la vista Three.js | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';

export const THREE_VIEW_STYLE = {
  preset: 'SK',
  skyColor: 0xbfe5fb,
  groundColor: 0x9bbd91,
  groundOpacity: 0.48,
  groundRenderOrder: -20,
  background: 0xbfe5fb,
  drawingColor: 0x16282f,
  drawingLineWidth: 3,
  drawingPlaneLift: 0.08,
  drawingRenderOrder: 20,
  gridMinorColor: 0x8a9b8f,
  gridMajorColor: 0x6f8276,
  gridMinorWidth: 0.7,
  gridMajorWidth: 1.05,
  axisLineWidth: 2.8,
  axisNegativeLineWidth: 1.4,
  axisNegativeDashSize: 12,
  axisNegativeGapSize: 7,
  axisX: 0xd40000,
  axisY: 0x00a000,
  axisZ: 0x004bd8,
};

function colorVector(color) {
  const value = new THREE.Color(color);
  return new THREE.Vector3(value.r, value.g, value.b);
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function disposeThreeObject(object) {
  if (!object) return;
  object.traverse?.((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose?.());
    else child.material?.dispose?.();
  });
}

export function createWideLineSegments(segments, options = {}) {
  const positions = [];
  const bounds = new THREE.Box3();
  for (const item of Array.isArray(segments) ? segments : []) {
    const start = item?.start;
    const end = item?.end;
    if (!start || !end) continue;
    const a = new THREE.Vector3(
      finiteNumber(start.x),
      finiteNumber(start.y),
      finiteNumber(start.z),
    );
    const b = new THREE.Vector3(
      finiteNumber(end.x),
      finiteNumber(end.y),
      finiteNumber(end.z),
    );
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    bounds.expandByPoint(a);
    bounds.expandByPoint(b);
  }

  const geometry = new LineSegmentsGeometry();
  geometry.setPositions(positions);
  const materialSettings = {
    color: options.color ?? THREE_VIEW_STYLE.drawingColor,
    depthTest: options.depthTest !== false,
    depthWrite: options.depthWrite !== false,
    linewidth: options.linewidth ?? THREE_VIEW_STYLE.drawingLineWidth,
    dashed: options.dashed === true,
    opacity: options.opacity ?? 1,
    transparent: options.transparent === true,
    worldUnits: false,
  };
  if (options.dashed === true) {
    materialSettings.dashSize = options.dashSize ?? THREE_VIEW_STYLE.axisNegativeDashSize;
    materialSettings.gapSize = options.gapSize ?? THREE_VIEW_STYLE.axisNegativeGapSize;
  }
  const material = new LineMaterial(materialSettings);
  const line = new LineSegments2(geometry, material);
  if (Number.isFinite(options.renderOrder)) line.renderOrder = options.renderOrder;
  line.computeLineDistances();
  line.userData.segmentCount = positions.length / 6;
  line.userData.bounds = bounds.isEmpty() ? null : bounds;
  return line;
}

export function updateWideLineResolution(object, width, height) {
  if (!object) return;
  const safeWidth = Math.max(1, Math.round(width || 1));
  const safeHeight = Math.max(1, Math.round(height || 1));
  object.traverse?.((child) => {
    if (child.material?.isLineMaterial) {
      child.material.resolution.set(safeWidth, safeHeight);
    }
  });
}

function niceStep(rawStep) {
  const value = Math.max(0.0001, rawStep);
  const power = 10 ** Math.floor(Math.log10(value));
  const factor = value / power;
  if (factor <= 1) return power;
  if (factor <= 2) return 2 * power;
  if (factor <= 5) return 5 * power;
  return 10 * power;
}

function createProceduralGridMaterial(minorStep, majorStep) {
  return new THREE.ShaderMaterial({
    depthWrite: false,
    extensions: { derivatives: true },
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      majorAlpha: { value: 0.42 },
      majorColor: { value: colorVector(THREE_VIEW_STYLE.gridMajorColor) },
      majorStep: { value: majorStep },
      majorWidth: { value: 1.15 },
      minorAlpha: { value: 0.24 },
      minorColor: { value: colorVector(THREE_VIEW_STYLE.gridMinorColor) },
      minorStep: { value: minorStep },
      minorWidth: { value: 0.9 },
    },
    vertexShader: `
      varying vec2 vWorldXY;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldXY = worldPosition.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vWorldXY;
      uniform float majorAlpha;
      uniform vec3 majorColor;
      uniform float majorStep;
      uniform float majorWidth;
      uniform float minorAlpha;
      uniform vec3 minorColor;
      uniform float minorStep;
      uniform float minorWidth;

      float gridLine(float step, float width) {
        vec2 coord = vWorldXY / step;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        return 1.0 - min(line / width, 1.0);
      }

      void main() {
        float minorLine = gridLine(minorStep, minorWidth);
        float majorLine = gridLine(majorStep, majorWidth);
        float alpha = max(minorLine * minorAlpha, majorLine * majorAlpha);
        vec3 color = mix(minorColor, majorColor, majorLine);
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });
}

export function createSketchGrid(center = new THREE.Vector3(), extent = 20, options = {}) {
  const group = new THREE.Group();
  group.name = 'webcad-3d-grid';
  group.position.z = -0.002;

  const gridExtent = Math.max(2000, extent * 80);
  const minorStep = niceStep(Math.max(extent, 50) / 7);
  const majorStep = minorStep * 5;
  const lineLimit = Math.max(10, Math.ceil(gridExtent / minorStep) * minorStep);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(lineLimit * 2, lineLimit * 2),
    new THREE.MeshBasicMaterial({
      color: THREE_VIEW_STYLE.groundColor,
      depthTest: false,
      depthWrite: false,
      opacity: THREE_VIEW_STYLE.groundOpacity,
      side: THREE.DoubleSide,
      transparent: true,
    }),
  );
  ground.name = 'webcad-3d-sk-ground';
  ground.position.set(center.x, center.y, -0.001);
  ground.renderOrder = THREE_VIEW_STYLE.groundRenderOrder;
  ground.userData.isSketchGround = true;
  group.add(ground);

  const gridPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(lineLimit * 2, lineLimit * 2),
    createProceduralGridMaterial(minorStep, majorStep),
  );
  gridPlane.name = 'webcad-3d-grid-minor';
  gridPlane.position.set(center.x, center.y, 0.001);
  gridPlane.renderOrder = THREE_VIEW_STYLE.groundRenderOrder + 1;
  gridPlane.userData.isSketchGridLine = true;
  group.add(gridPlane);
  group.userData.preset = THREE_VIEW_STYLE.preset;
  group.userData.step = minorStep;
  group.userData.extent = lineLimit;
  setSketchGridVisible(group, options.visible !== false);
  return group;
}

export function setSketchGridVisible(grid, visible) {
  if (!grid) return;
  const nextVisible = visible !== false;
  grid.visible = true;
  grid.traverse?.((child) => {
    if (child.userData?.isSketchGridLine) child.visible = nextVisible;
    if (child.userData?.isSketchGround) child.visible = true;
  });
  grid.userData.gridLinesVisible = nextVisible;
}

function createAxisLine(direction, color, length, label) {
  const group = new THREE.Group();
  group.name = `webcad-3d-axis-${label}`;
  const dir = direction.clone().normalize();
  const positive = createWideLineSegments([
    {
      start: { x: 0, y: 0, z: 0 },
      end: { x: dir.x * length, y: dir.y * length, z: dir.z * length },
    },
  ], {
    color,
    linewidth: THREE_VIEW_STYLE.axisLineWidth,
  });
  positive.name = `webcad-3d-axis-${label}-positive`;
  const negative = createWideLineSegments([
    {
      start: { x: 0, y: 0, z: 0 },
      end: { x: -dir.x * length, y: -dir.y * length, z: -dir.z * length },
    },
  ], {
    color,
    dashSize: THREE_VIEW_STYLE.axisNegativeDashSize,
    dashed: true,
    gapSize: THREE_VIEW_STYLE.axisNegativeGapSize,
    linewidth: THREE_VIEW_STYLE.axisNegativeLineWidth,
  });
  negative.name = `webcad-3d-axis-${label}-negative`;
  negative.userData.negativeAxis = true;
  group.add(positive, negative);
  return group;
}

export function createSketchAxes(extent = 20) {
  const length = Math.max(2000, extent * 80);
  const group = new THREE.Group();
  group.name = 'webcad-3d-axes';
  group.add(
    createAxisLine(new THREE.Vector3(1, 0, 0), THREE_VIEW_STYLE.axisX, length, 'x'),
    createAxisLine(new THREE.Vector3(0, 1, 0), THREE_VIEW_STYLE.axisY, length, 'y'),
    createAxisLine(new THREE.Vector3(0, 0, 1), THREE_VIEW_STYLE.axisZ, length * 0.72, 'z'),
  );
  group.userData.preset = THREE_VIEW_STYLE.preset;
  group.userData.extent = length;
  return group;
}

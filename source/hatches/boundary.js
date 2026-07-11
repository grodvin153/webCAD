/*
 * webCAD - Geometria de contornos de sombreado
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createHatchBoundaryGeometry(dependencies) {
  const {
    TWO_PI,
    ellipseReferencePoints,
    isEllipseEntity,
    isCircularEntity,
    pointAtCircleAngle,
    sampleEllipse,
  } = dependencies;

  function circlePolygon(circle, segments = 96) {
    const polygon = Array.from({ length: segments }, (_, index) =>
      pointAtCircleAngle(circle, index * TWO_PI / segments));
    polygon.gripIndices = [0, 0.25, 0.5, 0.75]
      .map((parameter) => Math.round(parameter * segments) % segments);
    polygon.curveGroups = [{
      type: 'CIRCLE',
      indices: polygon.map((_, index) => index),
    }];
    return polygon;
  }

  function ellipsePolygon(ellipse, segments = 128) {
    const polygon = sampleEllipse(ellipse, segments).slice(0, -1);
    const references = ellipseReferencePoints(ellipse);
    polygon.gripIndices = references
      .filter((reference) => reference.type === 'quadrant')
      .map((reference) => polygon.reduce((best, point, index) => {
        const squaredDistance = (point.x - reference.point.x) ** 2 + (point.y - reference.point.y) ** 2;
        return squaredDistance < best.distance ? { index, distance: squaredDistance } : best;
      }, { index: 0, distance: Infinity }).index);
    polygon.curveGroups = [{
      type: 'ELLIPSE',
      indices: polygon.map((_, index) => index),
    }];
    return polygon;
  }

  function curveGroupsFromFaceEdges(faceEdges) {
    const runs = [];
    faceEdges.forEach((edge, index) => {
      if (!isCircularEntity(edge.sourceEntity) && !isEllipseEntity(edge.sourceEntity)) {
        return;
      }
      const previousRun = runs[runs.length - 1];
      if (previousRun?.sourceEntity === edge.sourceEntity &&
          previousRun.edgeIndices[previousRun.edgeIndices.length - 1] === index - 1) {
        previousRun.edgeIndices.push(index);
      }
      else {
        runs.push({ sourceEntity: edge.sourceEntity, edgeIndices: [index] });
      }
    });

    if (
      runs.length > 1 &&
      runs[0].edgeIndices[0] === 0 &&
      runs[runs.length - 1].edgeIndices[runs[runs.length - 1].edgeIndices.length - 1] === faceEdges.length - 1 &&
      runs[0].sourceEntity === runs[runs.length - 1].sourceEntity
    ) {
      const firstRun = runs.shift();
      const lastRun = runs.pop();
      runs.unshift({
        sourceEntity: firstRun.sourceEntity,
        edgeIndices: [...lastRun.edgeIndices, ...firstRun.edgeIndices],
      });
    }

    return runs.map((run) => ({
      type: run.sourceEntity.type,
      indices: [
        ...run.edgeIndices,
        (run.edgeIndices[run.edgeIndices.length - 1] + 1) % faceEdges.length,
      ],
    }));
  }

  return {
    circlePolygon,
    ellipsePolygon,
    curveGroupsFromFaceEdges,
  };
}

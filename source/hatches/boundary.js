/*
 * webCAD - Geometria de contornos de sombreado
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function createHatchBoundaryGeometry(dependencies) {
  const {
    TWO_PI,
    isCircularEntity,
    pointAtCircleAngle,
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

  function curveGroupsFromFaceEdges(faceEdges) {
    const runs = [];
    faceEdges.forEach((edge, index) => {
      if (!isCircularEntity(edge.sourceEntity)) {
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
    curveGroupsFromFaceEdges,
  };
}

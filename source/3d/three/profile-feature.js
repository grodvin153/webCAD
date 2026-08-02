/* webCAD - Push topologico de perfil sobre cara plana | SPDX-License-Identifier: GPL-3.0-or-later */

import * as THREE from 'three';

import { exactProfileWithAnalyticSources } from '../analytic-edges.js';
import { normalizeSketchPlane, pointFromSketchPlane } from '../sketch-plane.js';
import { createSolid3d, isValidSolid3d } from '../solid.js';
import {
  booleanSolid3d,
  isManifoldBooleanReady,
  subtractFacePushSolid3d,
  subtractionCutterDistance,
} from './manifold-boolean.js';
import {
  createAnalyticRegionId,
  pushInputFaceSnapshot,
  snapBooleanOperationDistance,
  solidFromBooleanFeatureTool,
  solidFromFacePush,
} from './push-geometry.js';
import {
  meetsMinimum3dThickness,
  minimumBooleanOperationDistance,
} from '../tolerances.js';

const TOLERANCE = 1e-7;

function point3(point) {
  return { x: Number(point?.x), y: Number(point?.y), z: Number(point?.z) || 0 };
}

function pointKey(point) {
  return `${Math.round(point.x / TOLERANCE)}:${Math.round(point.y / TOLERANCE)}:${Math.round(point.z / TOLERANCE)}`;
}

function pointPairKey(first, second) {
  const firstKey = pointKey(first);
  const secondKey = pointKey(second);
  return firstKey < secondKey ? `${firstKey}|${secondKey}` : `${secondKey}|${firstKey}`;
}

function pointSetKey(points) {
  return points.map(pointKey).sort().join('|');
}

function vector(point) {
  return new THREE.Vector3(point.x, point.y, point.z);
}

function normalized(value, fallback = { x: 0, y: 0, z: 1 }) {
  const result = vector(point3(value));
  if (result.lengthSq() <= 1e-12) return point3(fallback);
  result.normalize();
  return { x: result.x, y: result.y, z: result.z };
}

function translated(point, normal, distance) {
  return {
    x: point.x + normal.x * distance,
    y: point.y + normal.y * distance,
    z: point.z + normal.z * distance,
  };
}

function loopEquivalent(first, second) {
  if (!Array.isArray(first) || !Array.isArray(second) || first.length !== second.length) return false;
  const secondKeys = new Set(second.map(pointKey));
  return first.every((point) => secondKeys.has(pointKey(point)));
}

function matchingSupportGroups(solid, supportOuter, normal) {
  const normalVector = vector(normal);
  return (solid?.metadata?.planarFaceGroups ?? []).filter((group) => {
    if (group?.kind !== 'support-remainder' && group?.kind !== 'opposite-remainder') return false;
    if (!Array.isArray(group.indices) || !loopEquivalent(group.outerLoop, supportOuter)) return false;
    const groupNormal = vector(point3(group.normal));
    return groupNormal.lengthSq() > 1e-12 && groupNormal.normalize().dot(normalVector) > 0.99;
  });
}

function uniqueLoops(loops) {
  const seen = new Set();
  return loops.filter((loop) => {
    if (!Array.isArray(loop) || loop.length < 3) return false;
    const key = loop.map(pointKey).sort().join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function faceNormal(face, vertices) {
  const points = face.map((index) => vertices[index]).filter(Boolean);
  for (let index = 1; index < points.length - 1; index += 1) {
    const normal = vector(points[index]).sub(vector(points[0]))
      .cross(vector(points[index + 1]).sub(vector(points[0])));
    if (normal.lengthSq() > 1e-12) {
      normal.normalize();
      return { x: normal.x, y: normal.y, z: normal.z };
    }
  }
  return { x: 0, y: 0, z: 1 };
}

function profileDepth(sourceSolid, origin, normal) {
  return Math.min(...sourceSolid.vertices.map((vertex) =>
    vector(vertex).sub(vector(origin)).dot(vector(normal))));
}

function oppositePlaneFaces(sourceSolid, origin, normal, depth) {
  const normalVector = vector(normal);
  return sourceSolid.faces.reduce((indices, face, faceIndex) => {
    const points = face.map((index) => sourceSolid.vertices[index]).filter(Boolean);
    if (points.length < 3 || points.some((point) =>
      Math.abs(vector(point).sub(vector(origin)).dot(normalVector) - depth) > TOLERANCE)) {
      return indices;
    }
    indices.push(faceIndex);
    return indices;
  }, []);
}

function planePoint(point, plane) {
  const local = pointFromSketchPlane(point, plane);
  return new THREE.Vector2(local.x, local.y);
}

function polygonArea(loop, plane) {
  const points = loop.map((point) => planePoint(point, plane));
  return points.reduce((area, current, index) => {
    const next = points[(index + 1) % points.length];
    return area + current.x * next.y - next.x * current.y;
  }, 0) * 0.5;
}

export function profileFeaturePushSolid(face, distance, options = {}) {
  const sourceSolid = face?.supportSolid;
  const outer = (face?.points ?? []).map(point3);
  const holes = (face?.holes ?? []).map((loop) => loop.map(point3));
  const supportOuter = (face?.supportLoops?.outer ?? []).map(point3);
  const snapshotSupportHoles = (face?.supportLoops?.holes ?? []).map((loop) => loop.map(point3));
  const normal = normalized(face?.normal);
  const plane = normalizeSketchPlane(face?.workplane ?? {
    type: 'fixed', origin: outer[0], normal,
    xAxis: { x: 1, y: 0, z: 0 },
  });
  const emitDiagnostic = (diagnostic) => options.onDiagnostic?.({
    operation: { type: Number(distance) < 0 ? 'subtract' : 'union', distance },
    target: {
      id: face?.sourceSolidDocumentId ?? null,
      vertexCount: sourceSolid?.vertices?.length ?? 0,
      faceCount: sourceSolid?.faces?.length ?? 0,
    },
    cutter: {
      outerPointCount: outer.length,
      holeCount: holes.length,
    },
    coordinateSystem: plane,
    ...diagnostic,
  });
  if (!isValidSolid3d(sourceSolid) || outer.length < 3 || supportOuter.length < 3 ||
      !Number.isFinite(distance)) {
    if (Number(distance) < 0) {
      emitDiagnostic({
        phase: 'input-validation',
        reason: !isValidSolid3d(sourceSolid)
          ? 'invalid-target-solid'
          : 'invalid-cutter-profile',
      });
    }
    return null;
  }
  const requestedDistance = Number(distance);
  const effectiveDistance = snapBooleanOperationDistance(
    sourceSolid,
    supportOuter[0],
    normal,
    requestedDistance,
  );
  if (Math.abs(effectiveDistance) <= minimumBooleanOperationDistance(sourceSolid)) {
    if (requestedDistance < 0) {
      emitDiagnostic({
        phase: 'distance-validation',
        reason: 'below-useful-tolerance',
        requestedDistance,
        effectiveDistance,
        effectiveTolerance: minimumBooleanOperationDistance(sourceSolid),
      });
    }
    return null;
  }
  if (!meetsMinimum3dThickness(effectiveDistance)) {
    if (requestedDistance < 0) {
      emitDiagnostic({
        phase: 'distance-validation',
        reason: 'minimum-thickness',
        requestedDistance,
        effectiveDistance,
      });
    }
    return null;
  }
  const additiveContact = face?.supportContactOnly === true;
  const operationType = additiveContact || effectiveDistance > 0 ? 'union' : 'subtract';
  if (isManifoldBooleanReady()) {
    const depth = profileDepth(sourceSolid, supportOuter[0], normal);
    const through = operationType === 'subtract' &&
      effectiveDistance <= depth + TOLERANCE;
    const kernelDistance = operationType === 'subtract'
      ? subtractionCutterDistance(
        sourceSolid,
        effectiveDistance,
        supportOuter[0],
        normal,
      )
      : effectiveDistance;
    const analyticRegionId = face.exactProfile
      ? face.analyticRegionId ?? createAnalyticRegionId()
      : null;
    const inputFace = face.exactProfile
      ? null
      : pushInputFaceSnapshot(face, sourceSolid);
    if (!face.exactProfile && !inputFace) return null;
    const operation = {
      type: operationType,
      distance: effectiveDistance,
      requestedDistance,
      ...(kernelDistance !== effectiveDistance ? { kernelDistance } : {}),
      through,
      tangentContact: additiveContact,
      sketchId: face.sketchId ?? null,
      exactProfile: face.exactProfile
        ? exactProfileWithAnalyticSources(
          sourceSolid,
          face.exactProfile,
          analyticRegionId,
        )
        : null,
      ...(inputFace ? { inputFace } : {}),
      ...(analyticRegionId ? {
        analyticRegionId,
      } : {}),
    };
    if (operationType === 'subtract') {
      return subtractFacePushSolid3d(sourceSolid, face, effectiveDistance, {
        kernelDistance,
        operation,
        onDiagnostic: options.onDiagnostic,
        metadata: {
          sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
        },
      });
    }
    let toolSolid = null;
    try {
      toolSolid = solidFromBooleanFeatureTool(
        sourceSolid,
        face,
        kernelDistance,
      );
    }
    catch {
      return null;
    }
    return booleanSolid3d(sourceSolid, toolSolid, {
      operationType: operation.type,
      operation,
      onDiagnostic: options.onDiagnostic,
      metadata: {
        sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
      },
    });
  }
  if (additiveContact) return null;
  const supportGroups = matchingSupportGroups(sourceSolid, supportOuter, normal);
  const supportHoles = uniqueLoops([
    ...snapshotSupportHoles,
    ...supportGroups.flatMap((group) => group.innerLoops ?? []),
  ]).map((loop) => loop.map(point3));
  const sourceSolidFaceIndices = supportGroups.length
    ? [...new Set(supportGroups.flatMap((group) => group.indices))]
    : face.sourceSolidFaceIndices ?? [];
  const depth = profileDepth(sourceSolid, supportOuter[0], normal);
  const throughCut = effectiveDistance < 0 &&
    effectiveDistance <= depth + TOLERANCE;
  const fallbackDistance = throughCut ? depth : effectiveDistance;
  const oppositeFaces = throughCut
    ? oppositePlaneFaces(sourceSolid, supportOuter[0], normal, depth)
    : [];
  if (throughCut && !oppositeFaces.length) return null;

  const vertices = sourceSolid.vertices.map(point3);
  const vertexMap = new Map(vertices.map((point, index) => [pointKey(point), index]));
  const vertexIndex = (point) => {
    const clean = point3(point);
    const key = pointKey(clean);
    if (!vertexMap.has(key)) {
      vertexMap.set(key, vertices.length);
      vertices.push(clean);
    }
    return vertexMap.get(key);
  };
  const removedFaces = new Set([
    ...sourceSolidFaceIndices,
    ...oppositeFaces,
  ]);
  const internalSideSegments = new Set();
  const internalBoundaryEdges = new Set();
  if (effectiveDistance > 0) {
    const sourceFacesByPoints = new Map();
    sourceSolid.faces.forEach((sourceFace, faceIndex) => {
      const key = pointSetKey(sourceFace.map((index) => sourceSolid.vertices[index]).filter(Boolean));
      if (key) sourceFacesByPoints.set(key, faceIndex);
    });
    [outer, ...holes].forEach((loop, loopIndex) => {
      const endLoop = loop.map((point) => translated(point, normal, fallbackDistance));
      const cadIndices = new Set(loopIndex === 0
        ? face.cadProfileVertexIndices ?? []
        : face.holeCadProfileVertexIndices?.[loopIndex - 1] ?? []);
      loop.forEach((point, index) => {
        const nextIndex = (index + 1) % loop.length;
        const sideKey = pointSetKey([point, loop[nextIndex], endLoop[nextIndex], endLoop[index]]);
        const coincidentFaceIndex = sourceFacesByPoints.get(sideKey);
        if (coincidentFaceIndex === undefined) return;
        removedFaces.add(coincidentFaceIndex);
        internalSideSegments.add(`${loopIndex}:${index}`);
        internalBoundaryEdges.add(pointPairKey(point, loop[nextIndex]));
        internalBoundaryEdges.add(pointPairKey(endLoop[index], endLoop[nextIndex]));
        if (!cadIndices.has(index)) {
          internalBoundaryEdges.add(pointPairKey(point, endLoop[index]));
        }
        if (!cadIndices.has(nextIndex)) {
          internalBoundaryEdges.add(pointPairKey(loop[nextIndex], endLoop[nextIndex]));
        }
      });
    });
  }
  const faces = [];
  const faceVertexNormals = [];
  const planarFaceGroups = [];
  const sourceFaceIndexMap = new Map();
  const sourceNormals = sourceSolid.metadata?.faceVertexNormals;
  sourceSolid.faces.forEach((sourceFace, sourceIndex) => {
    if (removedFaces.has(sourceIndex)) return;
    sourceFaceIndexMap.set(sourceIndex, faces.length);
    faces.push([...sourceFace]);
    const stored = sourceNormals?.[sourceIndex];
    const flat = faceNormal(sourceFace, sourceSolid.vertices);
    faceVertexNormals.push(Array.isArray(stored) && stored.length === sourceFace.length
      ? stored.map(point3)
      : sourceFace.map(() => ({ ...flat })));
  });
  (sourceSolid.metadata?.planarFaceGroups ?? []).forEach((group) => {
    if (!Array.isArray(group?.indices) || group.indices.some((index) => !sourceFaceIndexMap.has(index))) return;
    planarFaceGroups.push({
      ...JSON.parse(JSON.stringify(group)),
      indices: group.indices.map((index) => sourceFaceIndexMap.get(index)),
    });
  });
  const curvedSideFaceIndices = (sourceSolid.metadata?.curvedSideFaceIndices ?? [])
    .filter((index) => sourceFaceIndexMap.has(index))
    .map((index) => sourceFaceIndexMap.get(index));
  const curvedFeatureGeneratrices = (sourceSolid.metadata?.curvedFeatureGeneratrices ?? [])
    .filter((entry) => sourceFaceIndexMap.has(entry?.beforeFaceIndex) &&
      sourceFaceIndexMap.has(entry?.afterFaceIndex))
    .map((entry) => ({
      ...entry,
      beforeFaceIndex: sourceFaceIndexMap.get(entry.beforeFaceIndex),
      afterFaceIndex: sourceFaceIndexMap.get(entry.afterFaceIndex),
    }));

  const orientTriangle = (triangle, desiredNormal) => {
    const [a, b, c] = triangle.map((index) => vector(vertices[index]));
    const triangleNormal = b.sub(a).cross(c.sub(a));
    return triangleNormal.dot(vector(desiredNormal)) < 0
      ? [triangle[0], triangle[2], triangle[1]]
      : triangle;
  };
  const addPlanarRegion = (regionOuter, regionHoles, desiredNormal, kind) => {
    if (regionOuter.length < 3) return [];
    const contour2d = regionOuter.map((point) => planePoint(point, plane));
    const holes2d = regionHoles.map((loop) => loop.map((point) => planePoint(point, plane)));
    const flatIndices = [regionOuter, ...regionHoles].flat().map(vertexIndex);
    const triangles = THREE.ShapeUtils.triangulateShape(contour2d, holes2d);
    const groupIndices = [];
    triangles.forEach((triangle) => {
      const faceIndices = orientTriangle(triangle.map((index) => flatIndices[index]), desiredNormal);
      groupIndices.push(faces.length);
      faces.push(faceIndices);
      faceVertexNormals.push(faceIndices.map(() => ({ ...desiredNormal })));
    });
    if (groupIndices.length) {
      planarFaceGroups.push({
        indices: groupIndices,
        kind,
        normal: { ...desiredNormal },
        outerLoop: regionOuter.map(point3),
        innerLoops: regionHoles.map((loop) => loop.map(point3)),
      });
    }
    return groupIndices;
  };

  const profileMatchesSupport = loopEquivalent(outer, supportOuter);
  if (profileMatchesSupport) {
    holes.forEach((hole) => addPlanarRegion(hole, [], normal, 'support-island'));
  }
  else {
    addPlanarRegion(supportOuter, [...supportHoles, outer], normal, 'support-remainder');
    holes.forEach((hole) => addPlanarRegion(hole, [], normal, 'support-island'));
  }
  const endOuter = outer.map((point) => translated(point, normal, fallbackDistance));
  const endHoles = holes.map((loop) =>
    loop.map((point) => translated(point, normal, fallbackDistance)));
  if (throughCut) {
    const oppositeNormal = { x: -normal.x, y: -normal.y, z: -normal.z };
    const oppositeOuter = supportOuter.map((point) =>
      translated(point, normal, fallbackDistance));
    const oppositeHoles = supportHoles.map((loop) =>
      loop.map((point) => translated(point, normal, fallbackDistance)));
    if (profileMatchesSupport) {
      endHoles.forEach((hole) => addPlanarRegion(hole, [], oppositeNormal, 'opposite-island'));
    }
    else {
      addPlanarRegion(oppositeOuter, [...oppositeHoles, endOuter], oppositeNormal, 'opposite-remainder');
      endHoles.forEach((hole) => addPlanarRegion(hole, [], oppositeNormal, 'opposite-island'));
    }
  }
  else {
    addPlanarRegion(endOuter, endHoles, normal, 'feature-end');
  }

  const addSideLoop = (loop, loopIndex) => {
    const endLoop = loop.map((point) => translated(point, normal, fallbackDistance));
    const smoothIndices = new Set(loopIndex === 0
      ? face.smoothProfileVertexIndices ?? []
      : face.holeSmoothProfileVertexIndices?.[loopIndex - 1] ?? []);
    const cadIndices = new Set(loopIndex === 0
      ? face.cadProfileVertexIndices ?? []
      : face.holeCadProfileVertexIndices?.[loopIndex - 1] ?? []);
    const sideFaceIndices = [];
    const curvedSegments = [];
    const area = polygonArea(loop, plane);
    loop.forEach((point, index) => {
      const nextIndex = (index + 1) % loop.length;
      const next = loop[nextIndex];
      const baseIndices = [vertexIndex(point), vertexIndex(next)];
      const endIndices = [vertexIndex(endLoop[index]), vertexIndex(endLoop[nextIndex])];
      if (internalSideSegments.has(`${loopIndex}:${index}`)) {
        sideFaceIndices.push(null);
        curvedSegments.push(false);
        return;
      }
      let quad = [baseIndices[0], baseIndices[1], endIndices[1], endIndices[0]];
      const firstLocal = planePoint(point, plane);
      const nextLocal = planePoint(next, plane);
      let outward2d = area >= 0
        ? { x: nextLocal.y - firstLocal.y, y: firstLocal.x - nextLocal.x }
        : { x: firstLocal.y - nextLocal.y, y: nextLocal.x - firstLocal.x };
      if (loopIndex > 0) outward2d = { x: -outward2d.x, y: -outward2d.y };
      if (fallbackDistance < 0) outward2d = { x: -outward2d.x, y: -outward2d.y };
      const desired = normalized({
        x: plane.xAxis.x * outward2d.x + plane.yAxis.x * outward2d.y,
        y: plane.xAxis.y * outward2d.x + plane.yAxis.y * outward2d.y,
        z: plane.xAxis.z * outward2d.x + plane.yAxis.z * outward2d.y,
      });
      const oriented = orientTriangle([quad[0], quad[1], quad[2]], desired);
      if (oriented[1] !== quad[1]) quad = [quad[0], quad[3], quad[2], quad[1]];
      const sideFaceIndex = faces.length;
      faces.push(quad);
      sideFaceIndices.push(sideFaceIndex);
      const curvedSegment = (smoothIndices.has(index) && smoothIndices.has(nextIndex)) ||
        !(cadIndices.has(index) && cadIndices.has(nextIndex));
      curvedSegments.push(curvedSegment);
      if (curvedSegment) {
        curvedSideFaceIndices.push(sideFaceIndex);
        const radialAt = (vertexIndexInLoop) => {
          const previous = loop[(vertexIndexInLoop - 1 + loop.length) % loop.length];
          const current = loop[vertexIndexInLoop];
          const after = loop[(vertexIndexInLoop + 1) % loop.length];
          const beforeDirection = vector(current).sub(vector(previous)).normalize();
          const afterDirection = vector(after).sub(vector(current)).normalize();
          let radial = beforeDirection.cross(vector(normal)).add(afterDirection.cross(vector(normal)));
          if (loopIndex > 0) radial.multiplyScalar(-1);
          if (fallbackDistance < 0) radial.multiplyScalar(-1);
          radial.normalize();
          return { x: radial.x, y: radial.y, z: radial.z };
        };
        const normalsByVertex = new Map([
          [baseIndices[0], radialAt(index)], [endIndices[0], radialAt(index)],
          [baseIndices[1], radialAt(nextIndex)], [endIndices[1], radialAt(nextIndex)],
        ]);
        faceVertexNormals.push(quad.map((indexValue) => normalsByVertex.get(indexValue) ?? desired));
      }
      else {
        faceVertexNormals.push(quad.map(() => ({ ...desired })));
      }
    });
    loop.forEach((point, index) => {
      const beforeSegment = (index - 1 + loop.length) % loop.length;
      if (!curvedSegments[beforeSegment] || !curvedSegments[index]) return;
      curvedFeatureGeneratrices.push({
        startIndex: vertexIndex(point),
        endIndex: vertexIndex(endLoop[index]),
        beforeFaceIndex: sideFaceIndices[beforeSegment],
        afterFaceIndex: sideFaceIndices[index],
      });
    });
  };
  [outer, ...holes].forEach(addSideLoop);

  const edges = [];
  const edgeKeys = new Set();
  const addEdge = (start, end) => {
    const first = vertexIndex(start);
    const second = vertexIndex(end);
    if (first === second) return;
    const key = first < second ? `${first}:${second}` : `${second}:${first}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push(first < second ? [first, second] : [second, first]);
  };
  const supportBoundaryKeys = new Set(supportOuter.flatMap((point, index) => {
    const next = supportOuter[(index + 1) % supportOuter.length];
    const first = pointKey(point);
    const second = pointKey(next);
    return [first < second ? `${first}|${second}` : `${second}|${first}`];
  }));
  sourceSolid.edges.forEach(([startIndex, endIndex]) => {
    const start = sourceSolid.vertices[startIndex];
    const end = sourceSolid.vertices[endIndex];
    const boundaryKey = pointPairKey(start, end);
    if (internalBoundaryEdges.has(boundaryKey)) return;
    if (profileMatchesSupport && supportBoundaryKeys.has(boundaryKey)) return;
    addEdge(start, end);
  });
  [outer, ...holes].forEach((loop, loopIndex) => {
    const endLoop = loop.map((point) => translated(point, normal, fallbackDistance));
    loop.forEach((point, index) => {
      const next = loop[(index + 1) % loop.length];
      const internalSide = internalSideSegments.has(`${loopIndex}:${index}`);
      if (!internalSide && (!profileMatchesSupport || loopIndex > 0)) addEdge(point, next);
      if (!internalSide) addEdge(endLoop[index], endLoop[(index + 1) % loop.length]);
    });
    const cadIndices = loopIndex === 0
      ? face.cadProfileVertexIndices ?? []
      : face.holeCadProfileVertexIndices?.[loopIndex - 1] ?? [];
    cadIndices.forEach((index) => addEdge(loop[index], endLoop[index]));
  });

  const operation = {
    type: effectiveDistance > 0 ? 'union' : 'subtract',
    distance: fallbackDistance,
    requestedDistance,
    through: throughCut,
    sketchId: face.sketchId ?? null,
    exactProfile: face.exactProfile ?? null,
  };
  const solid = createSolid3d({
    vertices,
    faces,
    edges,
    metadata: {
      ...(sourceSolid.metadata ?? {}),
      type: 'profileFeature',
      booleanOperation: effectiveDistance > 0 ? 'union' : 'subtract',
      capFaceGroups: null,
      faceVertexNormals,
      planarFaceGroups,
      curvedSideFaceIndices,
      curvedFeatureGeneratrices,
      profileFeatures: [...(sourceSolid.metadata?.profileFeatures ?? []), operation],
      sourceSolidDocumentId: face.sourceSolidDocumentId ?? null,
      exactGeometry: {
        status: 'pending',
        reason: 'profile-feature-exact-brep-not-implemented',
        operations: [...(sourceSolid.metadata?.exactGeometry?.operations ?? []), operation],
      },
    },
  });
  return isValidSolid3d(solid) ? solid : null;
}

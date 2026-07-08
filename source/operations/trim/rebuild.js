/* webCAD - Reconstruccion de restos contiguos de polilinea | SPDX-License-Identifier: GPL-3.0-or-later */

function sameEntityStyle(first, second) {
  return first.layer === second.layer &&
    first.lineStyle === second.lineStyle &&
    first.lineType === second.lineType &&
    first.lineColor === second.lineColor;
}

export function polylineFromLineGroupRange({
  path,
  startDistance,
  endDistance,
  PolylineEntity,
  SNAP_THRESHOLD,
  pointAt,
}) {
  if (!path || !PolylineEntity || endDistance - startDistance <= SNAP_THRESHOLD) return null;
  const slices = [];
  const firstCycle = Math.floor(startDistance / path.totalLength);
  const lastCycle = Math.floor((endDistance - SNAP_THRESHOLD) / path.totalLength);

  for (let cycle = firstCycle; cycle <= lastCycle; cycle += 1) {
    const cycleOffset = cycle * path.totalLength;
    for (const component of path.components) {
      const componentStart = cycleOffset + component.offset;
      const componentEnd = componentStart + component.length;
      const overlapStart = Math.max(startDistance, componentStart);
      const overlapEnd = Math.min(endDistance, componentEnd);
      if (overlapEnd - overlapStart <= SNAP_THRESHOLD) continue;
      slices.push({
        component,
        start: pointAt(component, (overlapStart - componentStart) / component.length),
        end: pointAt(component, (overlapEnd - componentStart) / component.length),
      });
    }
  }

  if (!slices.length) return null;
  const styleSource = slices[0].component.entity;
  if (slices.some((slice) => !sameEntityStyle(styleSource, slice.component.entity))) return null;

  return new PolylineEntity(
    [slices[0].start, ...slices.map((slice) => slice.end)],
    slices.map(() => ({
      type: 'LINE',
      center: null,
      clockwise: true,
      startWidth: 0,
      endWidth: 0,
    })),
    {
      closed: false,
      layer: styleSource.layer,
      lineStyle: styleSource.lineStyle,
      lineType: styleSource.lineType,
      lineColor: styleSource.lineColor,
    },
  );
}

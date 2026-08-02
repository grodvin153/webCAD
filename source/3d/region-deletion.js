/* webCAD - Borrado documental de recintos 3D | SPDX-License-Identifier: GPL-3.0-or-later */

function uniqueEntities(entities) {
  return [...new Set((entities ?? []).filter(Boolean))];
}

export function regionSourceEntities(face) {
  return uniqueEntities([
    ...(Array.isArray(face?.sourceEntities) ? face.sourceEntities : []),
    face?.sourceEntity,
  ]);
}

export function deleteRegionFromDocument(doc, face) {
  if (!doc || !face) return null;

  if (face.line3dGroupId) {
    const ids = (doc.model3d?.lines ?? [])
      .filter((line) =>
        line?.groupId === face.line3dGroupId &&
        line.locked !== true)
      .map((line) => line.id);
    const count = ids.length ? doc.remove3dLines?.(ids) ?? 0 : 0;
    return count ? { count, kind: 'line3d' } : null;
  }

  const sources = regionSourceEntities(face);
  if (!sources.length) return null;

  if (face.sketchId) {
    const sketch = doc.model3d?.sketches?.find((record) => record?.id === face.sketchId);
    const sketchSources = sources.filter((entity) => sketch?.entities?.includes(entity));
    const count = sketchSources.length
      ? doc.remove3dSketchEntities?.(face.sketchId, sketchSources) ?? 0
      : 0;
    return count ? { count, kind: 'sketch' } : null;
  }

  const activeSources = sources.filter((entity) => doc.entities?.includes(entity));
  const count = activeSources.length ? doc.removeEntities?.(activeSources) ?? 0 : 0;
  return count ? { count, kind: 'entities' } : null;
}

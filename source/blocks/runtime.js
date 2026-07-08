/* webCAD - Entidad y transformaciones de bloques | SPDX-License-Identifier: GPL-3.0-or-later */

import { createEntityTransformations } from '../transformations/clone.js';
import { point3 } from '../coordinates/point3.js';

export function createBlockRuntime(dependencies) {
  const {
    ArcEntity,
    CircleEntity,
    DEFAULT_LAYER,
    DEFAULT_LINE_COLOR,
    DEFAULT_LINE_STYLE,
    DEFAULT_LINE_TYPE,
    DimensionEntity,
    HatchEntity,
    LineEntity,
    PolylineEntity,
    RasterImageEntity,
    TextEntity,
    XLineEntity,
    applyLineColorToEntity,
    applyLineStyleToEntity,
    applyLineTypeToEntity,
    createBounds,
    createEntityGroupId,
    mergeBounds,
  } = dependencies;

  let expandBlockReferenceEntities = () => [];

  class BlockReferenceEntity {
    constructor(definition, insertionPoint, options = {}) {
      this.type = 'INSERT';
      this.blockName = definition?.name || String(options.blockName || '');
      this.definition = definition || null;
      this.insertionPoint = point3(insertionPoint);
      this.rotation = Number(options.rotation) || 0;
      this.scaleX = Number.isFinite(Number(options.scaleX)) ? Number(options.scaleX) : 1;
      this.scaleY = Number.isFinite(Number(options.scaleY)) ? Number(options.scaleY) : this.scaleX;
      this.expandedCache = null;
      this.expandedCacheKey = '';
      this.expandedCacheDefinition = null;
      this.expandedCacheRevision = -1;
      this.groupId = null;
      this.layer = options.layer || DEFAULT_LAYER.name;
      applyLineStyleToEntity(this, options.lineStyle || DEFAULT_LINE_STYLE);
      applyLineTypeToEntity(this, options.lineType || DEFAULT_LINE_TYPE);
      applyLineColorToEntity(this, options.lineColor || DEFAULT_LINE_COLOR);
    }

    expandedEntities() {
      const cacheKey = [
        this.insertionPoint.x,
        this.insertionPoint.y,
        this.insertionPoint.z,
        this.rotation,
        this.scaleX,
        this.scaleY,
      ].join(':');
      if (
        this.expandedCache &&
        this.expandedCacheKey === cacheKey &&
        this.expandedCacheDefinition === this.definition &&
        this.expandedCacheRevision === (this.definition?.revision || 0)
      ) {
        return this.expandedCache;
      }
      this.expandedCache = expandBlockReferenceEntities(this);
      this.expandedCacheKey = cacheKey;
      this.expandedCacheDefinition = this.definition;
      this.expandedCacheRevision = this.definition?.revision || 0;
      return this.expandedCache;
    }

    bounds() {
      const expanded = this.expandedEntities();
      if (!expanded.length) {
        return createBounds(
          this.insertionPoint.x,
          this.insertionPoint.y,
          this.insertionPoint.x,
          this.insertionPoint.y,
        );
      }
      return expanded.reduce((bounds, entity) => mergeBounds(bounds, entity.bounds()), null);
    }

    length() {
      return this.expandedEntities().reduce((total, entity) => total + entity.length(), 0);
    }
  }

  const transformations = createEntityTransformations({
    ArcEntity,
    BlockReferenceEntity,
    CircleEntity,
    DimensionEntity,
    HatchEntity,
    LineEntity,
    PolylineEntity,
    RasterImageEntity,
    TextEntity,
    XLineEntity,
    createEntityGroupId,
  });
  expandBlockReferenceEntities = transformations.expandBlockReferenceEntities;

  return { BlockReferenceEntity, ...transformations };
}

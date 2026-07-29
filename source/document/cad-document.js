/* webCAD - Modelo documental CAD | SPDX-License-Identifier: GPL-3.0-or-later */

import {
  addModel3dLines,
  addModel3dSolid,
  addModel3dSketch,
  cloneModel3d,
  createModel3d,
  removeModel3dLines,
  removeModel3dSolid,
  removeModel3dSketch,
  replaceModel3dSolid,
  setModel3dLineGroupVisibility,
  updateModel3dLineTopology,
  updateModel3dSolidPlacements,
} from '../3d/model3d.js';
import { normalizePrincipalPlane } from '../3d/principal-plane.js';
import { rotateSketchPlaneAxes } from '../3d/sketch-plane.js';
import { rotateSketchSupportFaceAxes } from '../3d/sketch-reference.js';

export function createCadDocumentClass(dependencies) {
  const {
    HISTORY_LIMIT,
    SPATIAL_CELL_SIZE,
    SPATIAL_MAX_ENTITY_CELLS,
    SPATIAL_MAX_QUERY_CELLS,
    boundsIntersectsBounds,
    cloneEntity,
    mergeBounds,
    rotateEntityByAngle,
  } = dependencies;

  class CadDocument {
    constructor() {
      this.entities = [];
      this.rootEntities = null;
      this.editingBlockName = null;
      this.editingSketchId = null;
      this.editHistoryFloor = null;
      this.blockDefinitions = new Map();
      this.selectedEntity = null;
      this.selectedEntities = new Set();
      this.cachedBounds = null;
      this.boundsDirty = true;
      this.spatialDirty = true;
      this.spatialCells = new Map();
      this.spatialOverflow = new Set();
      this.spatialBounds = new Map();
      this.spatialOrder = new Map();
      this.model3d = createModel3d();
      this.undoStack = [];
      this.redoStack = [];
      this.revision = 0;
    }

    markDirty() {
      this.revision += 1;
      if (this.editingBlockName) {
        const definition = this.blockDefinitions.get(this.editingBlockName.toLowerCase());
        if (definition) {
          definition.entities = this.entities;
          definition.revision = (definition.revision || 0) + 1;
        }
      }
      if (this.editingSketchId) {
        const sketch = this.model3d?.sketches?.find((record) => record.id === this.editingSketchId);
        if (sketch) {
          sketch.entities = this.entities;
          sketch.revision = (sketch.revision || 0) + 1;
        }
      }
      this.boundsDirty = true;
      this.spatialDirty = true;
    }

    isEditingBlock() {
      return Boolean(this.editingBlockName && this.rootEntities);
    }

    isEditingSketch() {
      return Boolean(this.editingSketchId && this.rootEntities);
    }

    isEditingNestedDocument() {
      return this.isEditingBlock() || this.isEditingSketch();
    }

    topLevelEntities() {
      return this.isEditingNestedDocument() ? this.rootEntities : this.entities;
    }

    beginBlockEdit(definition) {
      if (!definition || this.isEditingNestedDocument()) {
        return false;
      }
      this.rootEntities = this.entities;
      this.editingBlockName = definition.name;
      this.editHistoryFloor = this.undoStack.length;
      this.entities = definition.entities;
      this.clearSelection();
      this.boundsDirty = true;
      this.spatialDirty = true;
      return true;
    }

    beginSketchEdit(id) {
      const sketch = this.model3d?.sketches?.find((record) => record?.id === id);
      if (!sketch || this.isEditingNestedDocument()) return false;
      this.rootEntities = this.entities;
      this.editingSketchId = sketch.id;
      this.editHistoryFloor = this.undoStack.length;
      this.entities = sketch.entities;
      this.clearSelection();
      this.boundsDirty = true;
      this.spatialDirty = true;
      return true;
    }

    endSketchEdit() {
      if (!this.isEditingSketch()) return false;
      const sketch = this.model3d.sketches.find((record) => record.id === this.editingSketchId);
      if (sketch) sketch.entities = this.entities;
      this.entities = this.rootEntities;
      this.rootEntities = null;
      this.editingSketchId = null;
      this.editHistoryFloor = null;
      this.clearSelection();
      this.markDirty();
      return true;
    }

    endBlockEdit() {
      if (!this.isEditingBlock()) {
        return false;
      }
      const definition = this.blockDefinitions.get(this.editingBlockName.toLowerCase());
      if (definition) {
        definition.entities = this.entities;
      }
      this.entities = this.rootEntities;
      this.rootEntities = null;
      this.editingBlockName = null;
      this.editHistoryFloor = null;
      this.clearSelection();
      this.markDirty();
      return true;
    }

    snapshot() {
      const definitions = [...this.blockDefinitions.values()].map((definition) => ({
        name: definition.name,
        revision: definition.revision || 0,
        entities: [],
      }));
      const definitionMap = new Map(definitions.map((definition) => [definition.name.toLowerCase(), definition]));
      [...this.blockDefinitions.values()].forEach((definition) => {
        const target = definitionMap.get(definition.name.toLowerCase());
        target.entities = definition.entities.map((entity) => cloneEntity(entity, {
          definition: entity.type === 'INSERT'
            ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
            : undefined,
        })).filter(Boolean);
      });
      return {
        entities: this.topLevelEntities().map((entity) => cloneEntity(entity, {
          definition: entity.type === 'INSERT'
            ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
            : undefined,
        })).filter(Boolean),
        blockDefinitions: definitions,
        model3d: cloneModel3d(this.model3d, { cloneEntity }),
      };
    }

    restoreSnapshot(snapshot) {
      const snapshotEntities = Array.isArray(snapshot) ? snapshot : snapshot.entities || [];
      const snapshotDefinitions = Array.isArray(snapshot) ? [] : snapshot.blockDefinitions || [];
      const snapshotModel3d = Array.isArray(snapshot) ? null : snapshot.model3d;
      const activeBlockName = this.editingBlockName;
      const activeSketchId = this.editingSketchId;
      const definitionMap = new Map(snapshotDefinitions.map((definition) => [
        definition.name.toLowerCase(),
        { name: definition.name, revision: definition.revision || 0, entities: [] },
      ]));
      snapshotDefinitions.forEach((definition) => {
        const target = definitionMap.get(definition.name.toLowerCase());
        target.entities = definition.entities.map((entity) => cloneEntity(entity, {
          definition: entity.type === 'INSERT'
            ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
            : undefined,
        })).filter(Boolean);
      });
      this.blockDefinitions = definitionMap;
      const restoredRootEntities = snapshotEntities.map((entity) => cloneEntity(entity, {
        definition: entity.type === 'INSERT'
          ? definitionMap.get(entity.blockName.toLowerCase()) || entity.definition
          : undefined,
      })).filter(Boolean);
      this.model3d = cloneModel3d(snapshotModel3d, { cloneEntity });
      const activeSketch = this.model3d.sketches.find((record) => record.id === activeSketchId);
      if (activeSketch) {
        this.rootEntities = restoredRootEntities;
        this.editingBlockName = null;
        this.editingSketchId = activeSketch.id;
        this.entities = activeSketch.entities;
      }
      else if (activeBlockName && definitionMap.has(activeBlockName.toLowerCase())) {
        this.rootEntities = restoredRootEntities;
        this.editingBlockName = activeBlockName;
        this.editingSketchId = null;
        this.entities = definitionMap.get(activeBlockName.toLowerCase()).entities;
      }
      else {
        this.rootEntities = null;
        this.editingBlockName = null;
        this.editingSketchId = null;
        this.entities = restoredRootEntities;
      }
      this.clearSelection();
      this.markDirty();
    }

    recordHistory() {
      this.undoStack.push(this.snapshot());
      if (this.undoStack.length > HISTORY_LIMIT) {
        this.undoStack.shift();
      }
      this.redoStack = [];
    }

    canUndo() {
      return this.undoStack.length > (this.isEditingNestedDocument() ? this.editHistoryFloor || 0 : 0);
    }

    canRedo() {
      return this.redoStack.length > 0;
    }

    undo() {
      if (!this.canUndo()) {
        return false;
      }

      this.redoStack.push(this.snapshot());
      this.restoreSnapshot(this.undoStack.pop());
      return true;
    }

    redo() {
      if (!this.canRedo()) {
        return false;
      }

      this.undoStack.push(this.snapshot());
      if (this.undoStack.length > HISTORY_LIMIT) {
        this.undoStack.shift();
      }
      this.restoreSnapshot(this.redoStack.pop());
      return true;
    }

    clear(options = {}) {
      const hasModel3d = (Array.isArray(this.model3d?.solids) && this.model3d.solids.length > 0) ||
        (Array.isArray(this.model3d?.sketches) && this.model3d.sketches.length > 0);
      if (options.recordHistory !== false && (this.entities.length || hasModel3d)) {
        this.recordHistory();
      }
      this.entities = [];
      this.rootEntities = null;
      this.editingBlockName = null;
      this.editingSketchId = null;
      this.editHistoryFloor = null;
      this.blockDefinitions = new Map();
      this.model3d = createModel3d();
      this.clearSelection();
      this.markDirty();
    }

    add3dSolid(solid, options = {}) {
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      const record = addModel3dSolid(this.model3d, solid, options);
      this.markDirty();
      return record;
    }

    replace3dSolid(id, solid, options = {}) {
      if (!this.model3d?.solids?.some((record) => record?.id === id)) {
        return null;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      const record = replaceModel3dSolid(this.model3d, id, solid, options);
      if (record) {
        this.markDirty();
      }
      return record;
    }

    remove3dSolid(id, options = {}) {
      if (!this.model3d?.solids?.some((record) => record?.id === id)) {
        return false;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      const removed = removeModel3dSolid(this.model3d, id);
      if (removed) {
        this.markDirty();
      }
      return removed;
    }

    update3dSolidPlacements(updates, options = {}) {
      if (!(updates instanceof Map) || ![...updates.keys()].some((id) =>
        this.model3d?.solids?.some((record) => record?.id === id && record?.locked !== true))) {
        return false;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      const changed = updateModel3dSolidPlacements(this.model3d, updates);
      if (!changed) return false;
      this.markDirty();
      return true;
    }

    set3dSketchPlane(plane, options = {}) {
      const nextPlane = normalizePrincipalPlane(plane);
      if (this.model3d?.sketchPlane === nextPlane) return false;
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      this.model3d.sketchPlane = nextPlane;
      this.markDirty();
      return true;
    }

    add3dSketch(options = {}) {
      if (options.recordHistory !== false) this.recordHistory();
      const record = addModel3dSketch(this.model3d, { ...options, cloneEntity });
      this.markDirty();
      return record;
    }

    add3dLines(segments, options = {}) {
      if (!Array.isArray(segments) || !segments.length) return [];
      if (options.recordHistory !== false) this.recordHistory();
      const records = addModel3dLines(this.model3d, segments, options);
      if (records.length) this.markDirty();
      return records;
    }

    set3dLineGroupVisibility(groupId, visible, options = {}) {
      if (!this.model3d?.lines?.some((line) =>
        line?.groupId === groupId && line.visible !== (visible !== false))) {
        return false;
      }
      if (options.recordHistory !== false) this.recordHistory();
      const changed = setModel3dLineGroupVisibility(this.model3d, groupId, visible);
      if (changed) this.markDirty();
      return changed;
    }

    remove3dLines(ids, options = {}) {
      const selectedIds = new Set(Array.isArray(ids) ? ids : [ids]);
      if (!this.model3d?.lines?.some((line) => selectedIds.has(line?.id))) {
        return 0;
      }
      if (options.recordHistory !== false) this.recordHistory();
      const removed = removeModel3dLines(this.model3d, [...selectedIds]);
      if (removed) this.markDirty();
      return removed;
    }

    update3dLineTopology(update, options = {}) {
      if (!this.model3d?.lines?.length || !update) return false;
      if (options.recordHistory !== false) this.recordHistory();
      const changed = updateModel3dLineTopology(this.model3d, update);
      if (changed) this.markDirty();
      return changed;
    }

    promoteRootEntitiesTo3dSketch(options = {}) {
      if (this.isEditingNestedDocument() || !this.entities.length) return null;
      if (options.recordHistory !== false) this.recordHistory();
      const sourceEntities = this.entities;
      const record = addModel3dSketch(this.model3d, {
        ...options,
        entities: sourceEntities,
        cloneEntity,
      });
      this.entities = [];
      this.clearSelection();
      this.markDirty();
      return record;
    }

    remove3dSketch(id, options = {}) {
      if (this.editingSketchId === id || !this.model3d?.sketches?.some((record) => record.id === id)) {
        return false;
      }
      if (options.recordHistory !== false) this.recordHistory();
      const removed = removeModel3dSketch(this.model3d, id);
      if (removed) this.markDirty();
      return removed;
    }

    set3dSketchVisibility(id, visible, options = {}) {
      const sketch = this.model3d?.sketches?.find((record) => record.id === id);
      if (!sketch || sketch.visible === (visible !== false)) return false;
      if (options.recordHistory !== false) this.recordHistory();
      sketch.visible = visible !== false;
      sketch.revision = (sketch.revision || 0) + 1;
      this.markDirty();
      return true;
    }

    rename3dSketch(id, name, options = {}) {
      const sketch = this.model3d?.sketches?.find((record) => record.id === id);
      const nextName = String(name || '').trim();
      if (!sketch || !nextName || sketch.name === nextName) return false;
      if (options.recordHistory !== false) this.recordHistory();
      sketch.name = nextName;
      sketch.revision = (sketch.revision || 0) + 1;
      this.markDirty();
      return true;
    }

    rotate3dSketchAxes(id, options = {}) {
      const sketch = this.model3d?.sketches?.find((record) => record.id === id);
      if (!sketch || typeof rotateEntityByAngle !== 'function') return false;
      const entities = sketch.entities.map((entity) => cloneEntity(entity)).filter(Boolean);
      if (entities.length !== sketch.entities.length ||
          !entities.every((entity) => rotateEntityByAngle(entity, { x: 0, y: 0 }, -90))) {
        return false;
      }
      if (options.recordHistory !== false) this.recordHistory();
      sketch.entities = entities;
      sketch.plane = rotateSketchPlaneAxes(sketch.plane);
      if (sketch.metadata?.supportFace) {
        sketch.metadata.supportFace = rotateSketchSupportFaceAxes(sketch.metadata.supportFace);
      }
      sketch.revision = (sketch.revision || 0) + 1;
      if (this.editingSketchId === id) this.entities = sketch.entities;
      this.markDirty();
      return true;
    }

    addEntity(entity, options = {}) {
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      this.entities.push(entity);
      this.markDirty();
    }

    addEntities(entities, options = {}) {
      const validEntities = entities.filter(Boolean);
      if (!validEntities.length) {
        return false;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      this.entities.push(...validEntities);
      this.markDirty();
      return true;
    }

    replaceEntity(entity, replacements, options = {}) {
      const index = this.entities.indexOf(entity);
      if (index < 0) {
        return false;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      this.entities.splice(index, 1, ...replacements);
      if (this.selectedEntities.has(entity)) {
        this.selectedEntities.delete(entity);
        replacements.forEach((replacement) => this.selectedEntities.add(replacement));
        this.selectedEntity = replacements[0] || null;
      }
      this.markDirty();
      return true;
    }

    replaceEntities(entities, replacements, options = {}) {
      const replaceSet = new Set(entities.filter((entity) => this.entities.includes(entity)));
      if (!replaceSet.size) {
        return false;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }

      const firstIndex = this.entities.findIndex((entity) => replaceSet.has(entity));
      const wasSelected = [...replaceSet].some((entity) => this.selectedEntities.has(entity));
      this.entities = this.entities.filter((entity) => !replaceSet.has(entity));
      this.entities.splice(firstIndex, 0, ...replacements);
      replaceSet.forEach((entity) => this.selectedEntities.delete(entity));
      if (wasSelected) {
        replacements.forEach((replacement) => this.selectedEntities.add(replacement));
      }
      this.selectedEntity = [...this.selectedEntities][0] || null;
      this.markDirty();
      return true;
    }

    removeEntity(entity, options = {}) {
      return this.replaceEntity(entity, [], options);
    }

    removeEntities(entities, options = {}) {
      const removeSet = new Set(this.expandEntityGroups(entities).filter(Boolean));
      if (!removeSet.size) {
        return 0;
      }
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      const beforeCount = this.entities.length;
      this.entities = this.entities.filter((entity) => !removeSet.has(entity));
      removeSet.forEach((entity) => this.selectedEntities.delete(entity));
      this.selectedEntity = [...this.selectedEntities][0] || null;
      this.markDirty();
      return beforeCount - this.entities.length;
    }

    setEntities(entities, options = {}) {
      if (options.recordHistory !== false) {
        this.recordHistory();
      }
      this.blockDefinitions = new Map((entities.blockDefinitions || []).map((definition) => [
        definition.name.toLowerCase(),
        definition,
      ]));
      this.rootEntities = null;
      this.editingBlockName = null;
      this.editingSketchId = null;
      this.editHistoryFloor = null;
      this.entities = [...entities];
      this.clearSelection();
      this.markDirty();
    }

    bounds() {
      if (!this.boundsDirty) {
        return this.cachedBounds ? { ...this.cachedBounds } : null;
      }

      let bounds = null;
      for (const entity of this.entities) {
        if (entity.type === 'XLINE') continue;
        bounds = mergeBounds(bounds, entity.bounds());
      }
      this.cachedBounds = bounds ? { ...bounds } : null;
      this.boundsDirty = false;
      return this.cachedBounds ? { ...this.cachedBounds } : null;
    }

    spatialCellRange(bounds) {
      return {
        minX: Math.floor(bounds.minX / SPATIAL_CELL_SIZE),
        minY: Math.floor(bounds.minY / SPATIAL_CELL_SIZE),
        maxX: Math.floor(bounds.maxX / SPATIAL_CELL_SIZE),
        maxY: Math.floor(bounds.maxY / SPATIAL_CELL_SIZE),
      };
    }

    spatialCellKey(x, y) {
      return `${x}:${y}`;
    }

    rebuildSpatialIndex() {
      this.spatialCells = new Map();
      this.spatialOverflow = new Set();
      this.spatialBounds = new Map();
      this.spatialOrder = new Map();

      this.entities.forEach((entity, index) => {
        const bounds = entity.bounds();
        const range = this.spatialCellRange(bounds);
        const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
        this.spatialBounds.set(entity, bounds);
        this.spatialOrder.set(entity, index);

        if (cellCount > SPATIAL_MAX_ENTITY_CELLS) {
          this.spatialOverflow.add(entity);
          return;
        }

        for (let x = range.minX; x <= range.maxX; x += 1) {
          for (let y = range.minY; y <= range.maxY; y += 1) {
            const key = this.spatialCellKey(x, y);
            if (!this.spatialCells.has(key)) {
              this.spatialCells.set(key, new Set());
            }
            this.spatialCells.get(key).add(entity);
          }
        }
      });

      this.spatialDirty = false;
    }

    queryBounds(bounds) {
      if (!bounds) {
        return [];
      }
      if (this.spatialDirty) {
        this.rebuildSpatialIndex();
      }

      const range = this.spatialCellRange(bounds);
      const cellCount = (range.maxX - range.minX + 1) * (range.maxY - range.minY + 1);
      if (cellCount > SPATIAL_MAX_QUERY_CELLS) {
        return this.entities.filter((entity) =>
          entity.type === 'XLINE' || boundsIntersectsBounds(this.spatialBounds.get(entity), bounds));
      }

      const matches = new Set();
      for (let x = range.minX; x <= range.maxX; x += 1) {
        for (let y = range.minY; y <= range.maxY; y += 1) {
          const cell = this.spatialCells.get(this.spatialCellKey(x, y));
          if (!cell) {
            continue;
          }
          cell.forEach((entity) => {
            if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
              matches.add(entity);
            }
          });
        }
      }

      this.spatialOverflow.forEach((entity) => {
        if (boundsIntersectsBounds(this.spatialBounds.get(entity), bounds)) {
          matches.add(entity);
        }
      });

      this.entities.forEach((entity) => {
        if (entity.type === 'XLINE') matches.add(entity);
      });

      return [...matches].sort((first, second) =>
        (this.spatialOrder.get(first) || 0) - (this.spatialOrder.get(second) || 0),
      );
    }

    groupEntities(entity) {
      if (!entity?.groupId) {
        return entity ? [entity] : [];
      }
      return this.entities.filter((candidate) => candidate.groupId === entity.groupId);
    }

    expandEntityGroups(entities) {
      const expanded = new Set();
      entities.forEach((entity) => {
        this.groupEntities(entity).forEach((groupEntity) => expanded.add(groupEntity));
      });
      return [...expanded];
    }

    selectEntity(entity) {
      this.selectedEntities.clear();
      this.expandEntityGroups([entity]).forEach((selectedEntity) => {
        this.selectedEntities.add(selectedEntity);
      });
      this.selectedEntity = [...this.selectedEntities][0] || null;
    }

    selectEntities(entities) {
      const expandedEntities = this.expandEntityGroups(entities);
      this.selectedEntities = new Set(expandedEntities);
      this.selectedEntity = expandedEntities[0] || null;
    }

    addSelectedEntities(entities) {
      this.expandEntityGroups(entities).forEach((entity) => {
        if (entity) {
          this.selectedEntities.add(entity);
        }
      });
      this.selectedEntity = [...this.selectedEntities][0] || null;
    }

    clearSelection() {
      this.selectedEntities.clear();
      this.selectedEntity = null;
    }

    isSelected(entity) {
      return this.selectedEntities.has(entity);
    }
  }

  return CadDocument;
}

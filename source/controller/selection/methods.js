/* webCAD - Seleccion, hover y pinzamientos del controlador | SPDX-License-Identifier: GPL-3.0-or-later */

import { coordinateZ, point3 } from '../../coordinates/point3.js';

export function createControllerSelectionMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    SNAP_THRESHOLD,
    boundsIntersectsBounds,
    circularReferencePoints,
    createBounds,
    dimensionReferencePoints,
    distance,
    distancePointToArc,
    distancePointToCircle,
    distancePointToSegment,
    entitiesFromSelectionWindow,
    entityDistanceToPoint,
    ellipseReferencePoints,
    expandBounds,
    formatNumber,
    gripPoint,
    gripReferencePoint,
    isCircularEntity,
    isEllipseEntity,
    moveCircularGrip,
    moveEllipseGrip,
    moveDimensionGrip,
    moveHatchGrip,
    movePolylineGrip,
    pointFromDistance,
    polarArrayCommand,
    polylineReferencePoints,
    projectPointToLine,
    resolvePointForState,
    stretchCommand,
    unitsLabel,
  } = dependencies;

  class ControllerSelectionMethods {
  findEntityAt(point, options = {}) {
    const tolerance = 7 / this.state.viewScale;
    const pickBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const sketchReferences = options.includeSketchReferences
      ? (this.state.sketchReferenceEntities ?? []).filter((entity) =>
        boundsIntersectsBounds(entity.bounds(), pickBounds))
      : [];
    const candidates = [
      ...this.doc.queryBounds(pickBounds),
      ...sketchReferences,
    ];
    const pickCandidates = [
      ...candidates.filter((entity) => entity.type === 'HATCH'),
      ...candidates.filter((entity) => entity.type !== 'HATCH'),
    ];
    for (let index = pickCandidates.length - 1; index >= 0; index -= 1) {
      const entity = pickCandidates[index];
      if (entity === options.exclude) continue;
      if (entity.type === 'LINE' &&
          distancePointToSegment(point, entity.start, entity.end) <= tolerance) {
        return entity;
      }
      if (entity.type === 'XLINE' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'CIRCLE' && distancePointToCircle(point, entity) <= tolerance) {
        return entity;
      }
      if (entity.type === 'ARC' && distancePointToArc(point, entity) <= tolerance) {
        return entity;
      }
      if (isEllipseEntity(entity) && entityDistanceToPoint(entity, point) <= tolerance) return entity;
      if (entity.type === 'POLYLINE' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'TEXT' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'HATCH' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'DIMENSION' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'INSERT' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
      if (entity.type === 'IMAGE' && entityDistanceToPoint(entity, point) <= tolerance) {
        return entity;
      }
    }
    return null;
  }

  isEntityHoverSelectionActive() {
    if (this.state.selectionWindow || this.gripDragState || this.panState) {
      return false;
    }
    if (this.state.tool === 'select') {
      return !this.state.selectedGrip;
    }
    if (this.state.tool === 'trim') {
      return true;
    }
    if (this.state.tool === 'fillet') {
      return true;
    }
    if (this.state.tool === 'offset') {
      return !this.state.offsetDraft?.entity;
    }
    if (this.state.tool === 'tangent-line') {
      return true;
    }
    if (this.state.tool === 'point-tangent-line') {
      return Boolean(this.state.tangentLineDraft?.startPoint);
    }
    if (this.state.tool === 'xline') {
      return false;
    }
    if (this.state.tool === 'chamfer') {
      return true;
    }
    if (this.state.tool === 'select-set') {
      return Boolean(this.state.selectionSetDraft?.selecting);
    }
    if (this.state.tool === 'block-create') {
      return Boolean(this.state.blockCreateDraft?.selecting);
    }
    if (this.state.tool === 'copy') {
      return Boolean(this.state.copyDraft?.selecting);
    }
    if (this.state.tool === 'move') {
      return Boolean(this.state.moveDraft?.selecting);
    }
    if (this.state.tool === 'stretch') {
      return Boolean(this.state.stretchDraft?.selecting);
    }
    if (this.state.tool === 'polar-array') {
      return Boolean(this.state.polarArrayDraft?.selecting);
    }
    if (this.state.tool === 'rotate') {
      return Boolean(this.state.rotateDraft?.selecting);
    }
    if (this.state.tool === 'scale') {
      return Boolean(this.state.scaleDraft?.selecting);
    }
    if (this.state.tool === 'mirror') {
      return Boolean(this.state.mirrorDraft?.selecting);
    }
    if (this.state.tool === 'erase') {
      return Boolean(this.state.eraseDraft?.selecting);
    }
    if (this.state.tool === 'explode') {
      return Boolean(this.state.explodeDraft?.selecting);
    }
    if (this.state.tool === 'polyline-join') {
      return Boolean(this.state.polylineJoinDraft?.selecting);
    }
    if (this.state.tool === 'extend') {
      return this.state.extendDraft?.phase === 'boundaries' ||
        this.state.extendDraft?.phase === 'targets';
    }
    if (DIMENSION_TOOLS.has(this.state.tool)) {
      return this.state.dimensionDraft?.phase === 'reference' ||
        this.state.dimensionDraft?.phase === 'second-line';
    }
    if (this.state.tool === 'image-calibrate') {
      return this.state.imageCalibrationDraft?.phase === 'target';
    }
    return false;
  }

  updateHoveredEntity() {
    const imageCalibration = this.state.imageCalibrationDraft;
    this.state.hoveredEntity = this.isEntityHoverSelectionActive() && this.state.mouseWorld
      ? this.findEntityAt(this.state.mouseWorld, {
        exclude: imageCalibration?.entity,
        includeSketchReferences:
          this.state.tool === 'copy' || this.state.tool === 'offset',
      })
      : null;
    if (imageCalibration?.phase === 'target') {
      imageCalibration.targetSegment = this.imageReferenceSegmentAt(
        this.state.mouseWorld,
        imageCalibration.entity,
      );
    }
  }

  onPointerLeave() {
    if (!this.state.hoveredEntity) {
      return;
    }

    this.state.hoveredEntity = null;
    this.renderer.draw();
  }

  updateCanvasCursorMode() {
    this.canvas.classList.toggle('is-move-tool', this.state.tool === 'move' && this.state.moveDraft?.selecting);
    this.canvas.classList.toggle('is-copy-tool',
      this.state.tool === 'copy' && this.state.copyDraft?.selecting ||
      this.state.tool === 'stretch' && this.state.stretchDraft?.selecting ||
      this.state.tool === 'polar-array' && this.state.polarArrayDraft?.selecting ||
      this.state.tool === 'polyline-join' && this.state.polylineJoinDraft?.selecting);
    this.canvas.classList.toggle('is-rotate-tool',
      this.state.tool === 'rotate' && this.state.rotateDraft?.selecting ||
      this.state.tool === 'scale' && this.state.scaleDraft?.selecting ||
      this.state.tool === 'mirror' && this.state.mirrorDraft?.selecting);
    this.canvas.classList.toggle('is-explode-tool', this.state.tool === 'explode');
    this.canvas.classList.toggle(
      'is-dimension-select-tool',
      DIMENSION_TOOLS.has(this.state.tool) && Boolean(this.state.dimensionDraft) &&
        (this.state.dimensionDraft.phase === 'reference' || this.state.dimensionDraft.phase === 'second-line'),
    );
    this.canvas.classList.toggle(
      'is-point-input-tool',
      (this.state.tool === 'copy' && this.state.copyDraft && !this.state.copyDraft.selecting) ||
        (this.state.tool === 'move' && this.state.moveDraft && !this.state.moveDraft.selecting) ||
        (this.state.tool === 'stretch' && this.state.stretchDraft && !this.state.stretchDraft.selecting) ||
        (this.state.tool === 'polar-array' && this.state.polarArrayDraft && !this.state.polarArrayDraft.selecting) ||
        (this.state.tool === 'rotate' && this.state.rotateDraft && !this.state.rotateDraft.selecting) ||
        (this.state.tool === 'scale' && this.state.scaleDraft && !this.state.scaleDraft.selecting) ||
        (this.state.tool === 'mirror' && this.state.mirrorDraft && !this.state.mirrorDraft.selecting) ||
        (this.state.tool === 'block-create' && this.state.blockCreateDraft && !this.state.blockCreateDraft.selecting) ||
        (this.state.tool === 'block-insert' && this.state.blockInsertDraft),
    );
  }

  findGripAt(point) {
    const tolerance = 8 / this.state.viewScale;
    const gripBounds = expandBounds(createBounds(point.x, point.y, point.x, point.y), tolerance);
    const nearbyEntities = this.doc.queryBounds(gripBounds);
    const candidates = this.doc.selectedEntity
      ? [this.doc.selectedEntity, ...nearbyEntities.filter((entity) => entity !== this.doc.selectedEntity)]
      : nearbyEntities;

    for (const entity of candidates) {
      if (entity.type === 'HATCH') {
        for (const index of entity.gripIndices) {
          if (distance(point, entity.boundary[index]) <= tolerance) {
            return { entity, key: 'boundary', index };
          }
        }
        continue;
      }
      if (entity.type === 'INSERT') {
        if (distance(point, entity.insertionPoint) <= tolerance) {
          return { entity, key: 'insertionPoint' };
        }
        continue;
      }
      if (entity.type === 'XLINE') {
        if (distance(point, entity.basePoint) <= tolerance) {
          return { entity, key: 'basePoint' };
        }
        continue;
      }
      if (isCircularEntity(entity)) {
        for (const candidate of circularReferencePoints(entity)) {
          if (distance(point, candidate.point) <= tolerance) {
            return { entity, key: candidate.key };
          }
        }
        continue;
      }
      if (isEllipseEntity(entity)) {
        for (const candidate of ellipseReferencePoints(entity)) {
          if (distance(point, candidate.point) <= tolerance) return { entity, key: candidate.key };
        }
        continue;
      }
      if (entity.type === 'POLYLINE') {
        for (const candidate of polylineReferencePoints(entity)) {
          if (distance(point, candidate.point) <= tolerance) {
            return { entity, key: candidate.key };
          }
        }
        continue;
      }
      if (entity.type === 'DIMENSION') {
        const nearestGrip = dimensionReferencePoints(entity)
          .map((candidate) => ({ ...candidate, distance: distance(point, candidate.point) }))
          .filter((candidate) => candidate.distance <= tolerance)
          .sort((first, second) => first.distance - second.distance)[0];
        if (nearestGrip) {
          return { entity, key: nearestGrip.key };
        }
        continue;
      }
      if (entity.type !== 'LINE') {
        continue;
      }

      for (const key of ['start', 'end']) {
        if (distance(point, entity[key]) <= tolerance) {
          return { entity, key };
        }
      }
    }

    return null;
  }

  activeGripPoint() {
    return gripPoint(this.state.selectedGrip);
  }

  activeGripReferencePoint() {
    return gripReferencePoint(this.state.selectedGrip) || this.activeGripPoint();
  }

  activeGripLinkedPoints() {
    const grip = this.state.selectedGrip;
    const gripPoint = this.activeGripPoint();
    if (!grip || !gripPoint || !grip.entity.groupId) {
      return gripPoint ? [gripPoint] : [];
    }

    const linkedPoints = new Set([gripPoint]);
    for (const entity of this.doc.groupEntities(grip.entity)) {
      if (entity.type !== 'LINE') {
        continue;
      }
      for (const key of ['start', 'end']) {
        if (distance(entity[key], gripPoint) <= SNAP_THRESHOLD) {
          linkedPoints.add(entity[key]);
        }
      }
    }
    return [...linkedPoints];
  }

  moveActiveGripPointTo(targetPoint) {
    const grip = this.state.selectedGrip;
    const gripPoint = this.activeGripPoint();
    if (!grip || !gripPoint || !targetPoint || distance(gripPoint, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }

    if (grip.entity.type === 'HATCH') {
      moveHatchGrip(grip.entity, grip.index, targetPoint);
      this.doc.markDirty();
      return true;
    }
    if (grip.entity.type === 'INSERT') {
      grip.entity.insertionPoint = point3(
        targetPoint,
        coordinateZ(grip.entity.insertionPoint),
      );
      this.doc.markDirty();
      return true;
    }
    if (isCircularEntity(grip.entity)) {
      const moved = moveCircularGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }
    if (isEllipseEntity(grip.entity)) {
      const moved = moveEllipseGrip(grip.entity, grip.key, targetPoint);
      if (moved) this.doc.markDirty();
      return moved;
    }
    if (grip.entity.type === 'POLYLINE') {
      const moved = movePolylineGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }
    if (grip.entity.type === 'DIMENSION') {
      const moved = moveDimensionGrip(grip.entity, grip.key, targetPoint);
      if (moved) {
        this.doc.markDirty();
      }
      return moved;
    }

    for (const point of this.activeGripLinkedPoints()) {
      point.x = targetPoint.x;
      point.y = targetPoint.y;
    }
    this.doc.markDirty();
    return true;
  }

  resolveGripTarget(point) {
    const axisLine = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? {
          point: this.gripDragState.axisPoint,
          direction: this.gripDragState.axisDirection,
        }
      : null;
    return resolvePointForState(
      point,
      this.state,
      this.activeGripReferencePoint(),
      axisLine ? { axisLine } : {},
    );
  }

  moveSelectedGripTo(point) {
    if (!this.state.selectedGrip || !point) {
      return false;
    }

    const targetPoint = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(point, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : point;
    const target = this.resolveGripTarget(targetPoint);
    if (!target) {
      return false;
    }

    const constrainedTarget = this.state.shiftKeyDown && this.gripDragState?.axisPoint && this.gripDragState?.axisDirection
      ? projectPointToLine(target, this.gripDragState.axisPoint, this.gripDragState.axisDirection)
      : target;
    const gripPoint = this.activeGripPoint();
    if (!gripPoint || distance(gripPoint, constrainedTarget) <= SNAP_THRESHOLD) {
      return false;
    }
    if (this.gripDragState && !this.gripDragState.historyRecorded) {
      this.doc.recordHistory();
      this.gripDragState.historyRecorded = true;
    }
    return this.moveActiveGripPointTo(constrainedTarget);
  }

  moveSelectedGripByDistance(distanceValue) {
    if (!this.state.selectedGrip || !this.state.mouseWorld) {
      return false;
    }

    const origin = this.activeGripPoint();
    const directionPoint = this.resolveGripTarget(this.state.mouseWorld);
    const targetPoint = pointFromDistance(origin, directionPoint, distanceValue);
    if (!targetPoint) {
      return false;
    }

    if (distance(origin, targetPoint) <= SNAP_THRESHOLD) {
      return false;
    }
    this.doc.recordHistory();
    this.moveActiveGripPointTo(targetPoint);
    this.state.statusText = `Punto desplazado ${formatNumber(distanceValue)} ${unitsLabel()}`;
    return true;
  }

  rememberSelectionSet(entities = [...this.doc.selectedEntities]) {
    const validEntities = this.doc.expandEntityGroups(entities)
      .filter((entity) => this.doc.entities.includes(entity));
    if (!validEntities.length) {
      return false;
    }
    this.state.previousSelection = [...new Set(validEntities)];
    return true;
  }

  previousSelectionEntities() {
    const validEntities = this.doc.expandEntityGroups(this.state.previousSelection || [])
      .filter((entity) => this.doc.entities.includes(entity));
    this.state.previousSelection = [...new Set(validEntities)];
    return this.state.previousSelection;
  }

  recallPreviousSelection() {
    const entities = this.previousSelectionEntities();
    if (!entities.length) {
      this.state.statusText = 'No hay seleccion previa disponible';
      return false;
    }

    if (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'targets') {
      return this.extendEntities(entities) > 0;
    }
    if (this.state.tool === 'select') {
      this.doc.selectEntities(entities);
    }
    else if (
      (this.state.tool === 'copy' && this.state.copyDraft?.selecting) ||
      (this.state.tool === 'move' && this.state.moveDraft?.selecting) ||
      (this.state.tool === 'stretch' && this.state.stretchDraft?.selecting) ||
      (this.state.tool === 'polar-array' && this.state.polarArrayDraft?.selecting) ||
      (this.state.tool === 'rotate' && this.state.rotateDraft?.selecting) ||
      (this.state.tool === 'scale' && this.state.scaleDraft?.selecting) ||
      (this.state.tool === 'erase' && this.state.eraseDraft?.selecting) ||
      (this.state.tool === 'explode' && this.state.explodeDraft?.selecting) ||
      (this.state.tool === 'polyline-join' && this.state.polylineJoinDraft?.selecting) ||
      (this.state.tool === 'extend' && this.state.extendDraft?.phase === 'boundaries') ||
      this.state.tool === 'select-set'
    ) {
      if (this.state.tool === 'stretch') {
        entities.forEach((entity) => stretchCommand.addEntity(entity));
      }
      else if (this.state.tool === 'polar-array') {
        polarArrayCommand.addEntities(entities);
      }
      else {
        this.doc.addSelectedEntities(entities);
      }
    }
    else {
      this.state.statusText = 'La orden actual no espera una seleccion';
      return false;
    }

    this.state.statusText = `${entities.length} entidad${entities.length === 1 ? '' : 'es'} recuperada${entities.length === 1 ? '' : 's'} de la seleccion previa`;
    return true;
  }

  startSelectionSet() {
    const currentSelection = [...this.doc.selectedEntities];
    this.setTool('select-set');
    if (currentSelection.length) {
      this.doc.selectEntities(currentSelection);
    }
    this.state.selectionSetDraft = { selecting: true };
    this.state.statusText = currentSelection.length
      ? `${currentSelection.length} entidad${currentSelection.length === 1 ? '' : 'es'} seleccionada${currentSelection.length === 1 ? '' : 's'} - seleccione mas o confirme`
      : 'Seleccionar conjunto: elija objetos y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmSelectionSet() {
    if (!this.state.selectionSetDraft?.selecting || !this.doc.selectedEntities.size) {
      this.state.statusText = 'Seleccione al menos una entidad';
      return false;
    }
    this.rememberSelectionSet();
    const count = this.state.previousSelection.length;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.selectedGrip = null;
    this.state.statusText = `Seleccion memorizada: ${count} entidad${count === 1 ? '' : 'es'}`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  selectedEntitiesFromWindow(selectionWindow) {
    return entitiesFromSelectionWindow(this.doc, selectionWindow);
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerSelectionMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerSelectionMethods.prototype[name]]),
  );
}

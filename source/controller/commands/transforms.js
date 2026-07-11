/* webCAD - Ordenes de transformacion | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerTransformMethods(dependencies) {
  const {
    SNAP_THRESHOLD,
    cloneEntitiesWithOffset,
    distance,
    entityCanExplode,
    extendCommand,
    formatNumber,
    isPolylineJoinCompatibleEntity,
    joinClosedPolylineLoops,
    joinPolylineEntities,
    mirrorEntityAcrossAxis,
    moveEntityByVector,
    PolylineEntity,
    polylineSegmentEntities,
    rotateEntityByAngle,
    transformedBlockContents,
  } = dependencies;

  class ControllerTransformMethods {
  startCopy() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.state.lastCopy = null;
    this.setTool('copy');
    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Copiar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startMove() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('move');
    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`
      : 'Desplazar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startRotate() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('rotate');
    this.state.rotateDraft = {
      sourceEntities,
      basePoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Girar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`
      : 'Girar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startMirror() {
    const sourceEntities = [...this.doc.selectedEntities];
    if (sourceEntities.length) {
      this.rememberSelectionSet(sourceEntities);
    }
    this.setTool('mirror');
    this.state.mirrorDraft = {
      sourceEntities,
      firstPoint: null,
      selecting: !sourceEntities.length,
    };
    this.state.statusText = sourceEntities.length
      ? `Simetria de ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique primer punto del eje · OSNAP activo`
      : 'Simetria: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startErase() {
    const selectedCount = this.doc.selectedEntities.size;
    if (selectedCount) {
      this.rememberSelectionSet();
    }
    this.setTool('erase');
    this.state.eraseDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Borrar ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} - seleccione mas o confirme`
      : 'Borrar: seleccione objetos y confirme con Enter, Espacio o clic derecho';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startExplode() {
    const selectedCount = this.doc.selectedEntities.size;
    if (selectedCount) {
      this.rememberSelectionSet();
    }
    this.setTool('explode');
    this.state.explodeDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Descomponer ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} - seleccione mas o confirme`
      : 'Descomponer: seleccione bloques o polilineas y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startPolylineJoin() {
    const selectedCount = this.doc.selectedEntities.size;
    if (selectedCount) {
      this.rememberSelectionSet();
    }
    this.setTool('polyline-join');
    this.state.polylineJoinDraft = { selecting: true };
    this.state.statusText = selectedCount
      ? `Unir polilineas: ${selectedCount} entidad${selectedCount === 1 ? '' : 'es'} seleccionada${selectedCount === 1 ? '' : 's'} - seleccione mas o confirme`
      : 'Unir polilineas: seleccione LINE y POLYLINE conectadas y confirme';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  startExtend() {
    return extendCommand.start();
  }

  confirmCopySelection() {
    if (!this.state.copyDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para copiar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.copyDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Copiar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmMoveSelection() {
    if (!this.state.moveDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para desplazar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.moveDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Desplazar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto origen`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmRotateSelection() {
    if (!this.state.rotateDraft?.selecting) {
      return false;
    }

    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para girar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(sourceEntities);

    this.state.rotateDraft = {
      sourceEntities,
      basePoint: null,
      selecting: false,
    };
    this.state.statusText = `Girar ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique punto base`;
    this.updateCanvasCursorMode();
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmMirrorSelection() {
    if (!this.state.mirrorDraft?.selecting) {
      return false;
    }
    const sourceEntities = [...this.doc.selectedEntities];
    if (!sourceEntities.length) {
      this.state.statusText = 'Seleccione entidades para crear la simetria';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }
    this.rememberSelectionSet(sourceEntities);
    this.state.mirrorDraft = { sourceEntities, firstPoint: null, selecting: false };
    this.state.statusText = `Simetria de ${sourceEntities.length} entidad${sourceEntities.length === 1 ? '' : 'es'} - indique primer punto del eje · OSNAP activo`;
    this.updateCanvasCursorMode();
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmEraseSelection() {
    if (!this.state.eraseDraft?.selecting) {
      return false;
    }

    if (!this.doc.selectedEntities.size) {
      this.state.statusText = 'Seleccione entidades para borrar';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    return this.deleteSelectedEntities();
  }

  deleteSelectedEntities() {
    const entities = [...this.doc.selectedEntities];
    if (!entities.length) {
      return false;
    }

    this.rememberSelectionSet(entities);

    const removedCount = this.doc.removeEntities(entities);
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = removedCount
      ? `${removedCount} entidad${removedCount === 1 ? '' : 'es'} borrada${removedCount === 1 ? '' : 's'}`
      : 'No se pudo borrar';
    return removedCount > 0;
  }

  confirmExplodeSelection() {
    if (!this.state.explodeDraft?.selecting) {
      return false;
    }
    const selectedEntities = [...this.doc.selectedEntities];
    const candidates = selectedEntities.filter(entityCanExplode);
    if (!candidates.length) {
      this.state.statusText = 'Seleccione al menos un bloque o una polilinea';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }

    this.rememberSelectionSet(candidates);
    this.doc.recordHistory();
    const groupedIds = new Set(candidates.map((entity) => entity.groupId).filter(Boolean));
    const standaloneCandidates = candidates.filter((entity) => !entity.groupId);
    let explodedCount = 0;
    let resultCount = 0;
    let lostVariableWidth = false;

    groupedIds.forEach((groupId) => {
      const groupEntities = this.doc.entities.filter((entity) => entity.groupId === groupId);
      groupEntities.forEach((entity) => {
        entity.groupId = null;
      });
      explodedCount += 1;
      resultCount += groupEntities.length;
    });

    for (const entity of standaloneCandidates) {
      if (!this.doc.entities.includes(entity)) {
        continue;
      }
      let replacements = [];
      if (entity.type === 'INSERT') {
        replacements = transformedBlockContents(entity);
      }
      else if (entity.type === 'POLYLINE') {
        lostVariableWidth = lostVariableWidth || entity.segments.some((segment) =>
          segment.startWidth > SNAP_THRESHOLD || segment.endWidth > SNAP_THRESHOLD);
        replacements = polylineSegmentEntities(entity);
      }
      if (!replacements.length) {
        continue;
      }
      this.doc.replaceEntity(entity, replacements, { recordHistory: false });
      explodedCount += 1;
      resultCount += replacements.length;
    }

    if (!explodedCount) {
      this.doc.undoStack.pop();
      this.state.statusText = 'No se pudo descomponer la seleccion';
      return false;
    }
    this.doc.markDirty();
    this.state.explodeDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${explodedCount} elemento${explodedCount === 1 ? '' : 's'} descompuesto${explodedCount === 1 ? '' : 's'} en ${resultCount} ${resultCount === 1 ? 'entidad' : 'entidades'}${
      lostVariableWidth ? ' · anchura variable convertida a entidades simples' : ''
    }`;
    return true;
  }

  confirmPolylineJoinSelection() {
    if (!this.state.polylineJoinDraft?.selecting) {
      return false;
    }
    const selectedEntities = [...this.doc.selectedEntities].filter(isPolylineJoinCompatibleEntity);
    if (selectedEntities.length < 2) {
      this.state.statusText = 'Seleccione al menos dos lineas, arcos o polilineas';
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }
    this.rememberSelectionSet(selectedEntities);
    const closedLoops = joinClosedPolylineLoops(selectedEntities, {
      PolylineEntity,
      tolerance: SNAP_THRESHOLD,
    });
    if (closedLoops.ok) {
      const replaced = this.doc.replaceEntities(closedLoops.usedEntities, closedLoops.polylines);
      if (!replaced) {
        this.state.statusText = 'No se pudieron sustituir los recintos detectados';
        return false;
      }
      this.setTool('select');
      this.doc.clearSelection();
      this.doc.addSelectedEntities(closedLoops.polylines);
      this.state.statusText = closedLoops.message;
      this.updateUiStatus();
      this.renderer.draw();
      return true;
    }
    const result = joinPolylineEntities(selectedEntities, {
      PolylineEntity,
      tolerance: SNAP_THRESHOLD,
    });
    if (!result.ok) {
      this.state.statusText = closedLoops.message || result.message;
      this.updateUiStatus();
      this.renderer.draw();
      return false;
    }
    const replaced = this.doc.replaceEntities(selectedEntities, [result.polyline]);
    if (!replaced) {
      this.state.statusText = 'No se pudo sustituir la seleccion por una polilinea';
      return false;
    }
    this.setTool('select');
    this.doc.selectEntity(result.polyline);
    this.state.statusText = `Unir polilineas: creada una polilinea ${result.polyline.closed ? 'cerrada' : 'abierta'}`;
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  confirmExtendBoundaries() {
    return extendCommand.confirmBoundaries();
  }

  extendEntities(entities, pickPoint = null) {
    return extendCommand.extendEntities(entities, pickPoint);
  }

  copySelectionTo(targetPoint) {
    const copyDraft = this.state.copyDraft;
    if (!copyDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - copyDraft.basePoint.x,
      y: targetPoint.y - copyDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    const copies = cloneEntitiesWithOffset(copyDraft.sourceEntities, vector, { remapGroups: true });
    this.doc.addEntities(copies);
    this.state.lastCopy = {
      sourceEntities: copyDraft.sourceEntities,
      vector,
    };
    this.state.statusText = `${copies.length} entidad${copies.length === 1 ? '' : 'es'} copiada${copies.length === 1 ? '' : 's'} - indique otro destino o termine la orden`;
    return true;
  }

  repeatLastCopy(count) {
    const lastCopy = this.state.lastCopy;
    if (!lastCopy || count < 2) {
      return false;
    }

    const copies = [];
    for (let step = 2; step <= count; step += 1) {
      const vector = {
        x: lastCopy.vector.x * step,
        y: lastCopy.vector.y * step,
      };
      copies.push(...cloneEntitiesWithOffset(lastCopy.sourceEntities, vector, { remapGroups: true }));
    }

    this.doc.addEntities(copies);
    if (!this.state.copyDraft) {
      this.doc.clearSelection();
    }
    this.state.statusText = `Matriz lineal: ${count} copias en total`;
    return true;
  }

  moveSelectionTo(targetPoint) {
    const moveDraft = this.state.moveDraft;
    if (!moveDraft?.basePoint || !targetPoint) {
      return false;
    }

    const vector = {
      x: targetPoint.x - moveDraft.basePoint.x,
      y: targetPoint.y - moveDraft.basePoint.y,
    };
    if (Math.hypot(vector.x, vector.y) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Desplazamiento nulo';
      return false;
    }

    this.doc.recordHistory();
    moveDraft.sourceEntities.forEach((entity) => moveEntityByVector(entity, vector));
    this.doc.markDirty();
    const count = moveDraft.sourceEntities.length;
    this.state.moveDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} desplazada${count === 1 ? '' : 's'}`;
    return true;
  }

  rotateSelectionBy(angleDegrees) {
    const rotateDraft = this.state.rotateDraft;
    if (!rotateDraft?.basePoint || angleDegrees === null || !Number.isFinite(angleDegrees)) {
      return false;
    }
    if (Math.abs(angleDegrees % 360) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Angulo nulo';
      return false;
    }

    this.doc.recordHistory();
    rotateDraft.sourceEntities.forEach((entity) =>
      rotateEntityByAngle(entity, rotateDraft.basePoint, angleDegrees));
    this.doc.markDirty();
    const count = rotateDraft.sourceEntities.length;
    this.state.rotateDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} girada${count === 1 ? '' : 's'} ${formatNumber(angleDegrees)}°`;
    return true;
  }

  mirrorSelectionAcross(secondPoint) {
    const draft = this.state.mirrorDraft;
    if (!draft?.firstPoint || !secondPoint || distance(draft.firstPoint, secondPoint) <= SNAP_THRESHOLD) {
      this.state.statusText = 'El eje de simetria necesita dos puntos distintos';
      return false;
    }
    const copies = cloneEntitiesWithOffset(draft.sourceEntities, { x: 0, y: 0 }, { remapGroups: true });
    const mirrored = copies.filter((entity) =>
      mirrorEntityAcrossAxis(entity, draft.firstPoint, secondPoint));
    if (!mirrored.length) {
      this.state.statusText = 'No se pudieron reflejar las entidades seleccionadas';
      return false;
    }
    this.doc.addEntities(mirrored);
    const count = mirrored.length;
    this.state.mirrorDraft = null;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `${count} entidad${count === 1 ? '' : 'es'} creada${count === 1 ? '' : 's'} por simetria`;
    return true;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerTransformMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerTransformMethods.prototype[name]]),
  );
}

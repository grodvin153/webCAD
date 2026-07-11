/* webCAD - Ordenes de acotacion | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerDimensionMethods(dependencies) {
  const {
    DIMENSION_TOOLS,
    LineEntity,
    SNAP_THRESHOLD,
    activeDrawingProfile,
    angleOfPoint,
    dimensionCircularFromEntity,
    dimensionDraftEntity,
    dimensionKindForLine,
    dimensionLineFromEntity,
    dimensionPlacementDistance,
    dimensionPlacementPoint,
    dimensionTextValue,
    dimensionToolButtons,
    distance,
    formatNumber,
    infiniteLineLineIntersection,
    objectSnapPoint,
    toolFlyoutCommandButtons,
    unitsLabel,
  } = dependencies;

  class ControllerDimensionMethods {
  startDimension(tool) {
    if (!DIMENSION_TOOLS.has(tool)) {
      return false;
    }
    this.setTool(tool);
    const kind = tool.replace('dimension-', '');
    this.state.dimensionDraft = {
      kind,
      requestedKind: kind,
      phase: 'reference',
      points: [],
      firstLine: null,
    };
    this.state.statusText = kind === 'radius' || kind === 'diameter'
      ? `Cota de ${kind === 'radius' ? 'radio' : 'diametro'}: seleccione un circulo o arco`
      : kind === 'angular'
        ? 'Cota angular: seleccione primera linea o capture el vertice mediante snap'
        : 'Seleccione una linea o tramo de polilinea, o capture el primer punto mediante snap';
    this.updateUiStatus();
    this.renderer.draw();
    return true;
  }

  setDimensionKind(kind) {
    if (!this.state.dimensionDraft) {
      return false;
    }
    this.state.dimensionDraft.kind = kind;
    this.state.tool = `dimension-${kind}`;
    dimensionToolButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === this.state.tool);
    });
    toolFlyoutCommandButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.command === this.state.tool);
    });
    return true;
  }

  beginDimensionPlacement(message = 'Indique separacion de la cota o escriba la distancia') {
    const draft = this.state.dimensionDraft;
    if (!draft) {
      return false;
    }
    draft.phase = 'placement';
    const rememberedOffset = this.state.lastDimensionOffsets[activeDrawingProfile().id];
    this.state.distanceInput = '';
    if (Number.isFinite(rememberedOffset) && rememberedOffset > SNAP_THRESHOLD) {
      draft.suggestedOffset = rememberedOffset;
      draft.suggestionActive = false;
      this.state.statusText = `${message} · referencia ${formatNumber(rememberedOffset)} ${unitsLabel()}`;
    }
    else {
      draft.suggestedOffset = null;
      draft.suggestionActive = false;
      this.state.statusText = message;
    }
    return true;
  }

  createDimensionAt(placement, options = {}) {
    const draft = this.state.dimensionDraft;
    const entity = dimensionDraftEntity(draft, placement);
    if (!entity || entity.measurement() <= SNAP_THRESHOLD) {
      this.state.statusText = 'Cota no valida';
      return false;
    }
    const kind = draft.kind;
    const kindLabel = {
      horizontal: 'horizontal',
      vertical: 'vertical',
      aligned: 'alineada',
      angular: 'angular',
      radius: 'de radio',
      diameter: 'de diametro',
    }[kind] || kind;
    const placementDistance = dimensionPlacementDistance(draft, placement);
    if (
      options.rememberOffset === true &&
      Number.isFinite(placementDistance) &&
      placementDistance > SNAP_THRESHOLD
    ) {
      this.state.lastDimensionOffsets[activeDrawingProfile().id] = placementDistance;
    }
    const requestedKind = draft.requestedKind || kind;
    this.doc.addEntity(entity);
    this.startDimension(`dimension-${requestedKind}`);
    this.state.statusText = `${
      `Cota ${kindLabel} creada · ${dimensionTextValue(entity)} ${kind === 'angular' ? '' : unitsLabel()}`.trim()
    } · seleccione la siguiente entidad (Escape para terminar)`;
    return true;
  }

  handleDimensionPoint(worldPoint) {
    const draft = this.state.dimensionDraft;
    if (!draft) {
      return false;
    }
    if (draft.phase === 'placement') {
      const cursor = this.resolveInputPoint(worldPoint);
      return this.createDimensionAt(dimensionPlacementPoint(draft, cursor, this.state));
    }

    const pickedEntity = this.findEntityAt(worldPoint);
    const selectionSnap = draft.phase === 'reference'
      ? objectSnapPoint(worldPoint, this.state)
      : null;
    this.state.activeObjectSnap = selectionSnap;

    if (selectionSnap && draft.kind !== 'radius' && draft.kind !== 'diameter') {
      draft.points = [{ ...selectionSnap.point }];
      draft.phase = draft.kind === 'angular' ? 'first-ray' : 'second-point';
      this.state.statusText = draft.kind === 'angular'
        ? 'Vertice capturado - indique un punto sobre el primer lado'
        : 'Primer punto capturado - indique segundo punto';
      return true;
    }

    if (draft.phase === 'reference') {
      const circularEntity = dimensionCircularFromEntity(pickedEntity, worldPoint);
      if (circularEntity) {
        if (draft.kind !== 'radius' && draft.kind !== 'diameter') {
          this.setDimensionKind(circularEntity.type === 'ARC' ? 'radius' : 'diameter');
        }
        const pickedRadiusPoint = {
          x: circularEntity.center.x + Math.cos(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
          y: circularEntity.center.y + Math.sin(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
        };
        draft.points = [{ ...circularEntity.center }, pickedRadiusPoint];
        this.beginDimensionPlacement();
        return true;
      }
    }

    if (draft.kind === 'radius' || draft.kind === 'diameter') {
      const circularEntity = dimensionCircularFromEntity(pickedEntity, worldPoint);
      if (!circularEntity) {
        this.state.statusText = 'Seleccione un circulo o arco';
        return false;
      }
      const pickedRadiusPoint = {
        x: circularEntity.center.x + Math.cos(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
        y: circularEntity.center.y + Math.sin(angleOfPoint(circularEntity.center, worldPoint)) * circularEntity.radius,
      };
      draft.points = [{ ...circularEntity.center }, pickedRadiusPoint];
      this.beginDimensionPlacement();
      return true;
    }

    if (draft.kind === 'angular') {
      if (draft.phase === 'reference') {
        const firstLine = dimensionLineFromEntity(pickedEntity, worldPoint);
        if (firstLine) {
          draft.firstLine = new LineEntity(firstLine.start, firstLine.end);
          draft.phase = 'second-line';
          this.state.statusText = 'Seleccione la segunda linea o tramo';
        }
        else if (!pickedEntity) {
          draft.points = [this.resolveInputPoint(worldPoint)];
          draft.phase = 'first-ray';
          this.state.statusText = 'Vertice indicado - indique un punto sobre el primer lado';
        }
        else {
          this.state.statusText = 'Seleccione una linea o capture el vertice mediante snap';
        }
        return true;
      }
      if (draft.phase === 'second-line') {
        const secondLine = dimensionLineFromEntity(pickedEntity, worldPoint);
        if (!secondLine) {
          this.state.statusText = 'Seleccione una segunda linea o tramo de polilinea';
          return false;
        }
        const firstDirection = {
          x: draft.firstLine.end.x - draft.firstLine.start.x,
          y: draft.firstLine.end.y - draft.firstLine.start.y,
        };
        const secondDirection = {
          x: secondLine.end.x - secondLine.start.x,
          y: secondLine.end.y - secondLine.start.y,
        };
        const vertex = infiniteLineLineIntersection(
          draft.firstLine.start,
          firstDirection,
          secondLine.start,
          secondDirection,
        );
        if (!vertex) {
          this.state.statusText = 'Las lineas son paralelas';
          return false;
        }
        const fartherPoint = (line) => distance(vertex, line.start) >= distance(vertex, line.end)
          ? line.start : line.end;
        draft.points = [{ ...vertex }, { ...fartherPoint(draft.firstLine) }, { ...fartherPoint(secondLine) }];
        this.beginDimensionPlacement('Indique separacion angular o escriba la distancia');
        return true;
      }
      draft.points.push(this.resolveInputPoint(worldPoint));
      if (draft.phase === 'first-ray') {
        draft.phase = 'second-ray';
        this.state.statusText = 'Indique un punto sobre el segundo lado';
      }
      else {
        this.beginDimensionPlacement('Indique separacion angular o escriba la distancia');
      }
      return true;
    }

    if (draft.phase === 'reference') {
      const segment = dimensionLineFromEntity(pickedEntity, worldPoint);
      if (segment) {
        this.setDimensionKind(dimensionKindForLine(segment));
        draft.points = [{ ...segment.start }, { ...segment.end }];
        this.beginDimensionPlacement();
      }
      else if (!pickedEntity) {
        draft.points = [this.resolveInputPoint(worldPoint)];
        draft.phase = 'second-point';
        this.state.statusText = 'Primer punto indicado - indique segundo punto';
      }
      else {
        this.state.statusText = 'Seleccione una linea o capture el primer punto mediante snap';
      }
      return true;
    }
    draft.points.push(this.resolveInputPoint(worldPoint));
    this.beginDimensionPlacement();
    return true;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerDimensionMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerDimensionMethods.prototype[name]]),
  );
}

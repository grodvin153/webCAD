/* webCAD - Ordenes de dibujo | SPDX-License-Identifier: GPL-3.0-or-later */

export function createControllerDrawingMethods(dependencies) {
  const {
    ArcEntity,
    CircleEntity,
    LineEntity,
    PolylineEntity,
    SNAP_THRESHOLD,
    TextEntity,
    activeChamferDistances,
    activeFilletRadius,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    applyChamferSolution,
    applyFilletSolution,
    arcFromCenterStartEnd,
    arcFromThreePoints,
    arcSweep,
    blockCommand,
    chamferSolution,
    circleFromThreePoints,
    distance,
    filletOperandAt,
    filletSolutions,
    formatChamferDistances,
    formatNumber,
    getLineStyle,
    hatchCommand,
    openPolylineWidthDialog,
    openTextDialog,
    pointOnRadiusFromAngle,
    polylineTangentArcToPoint,
    unitsLabel,
  } = dependencies;

  class ControllerDrawingMethods {
  startText() {
    this.setTool('text');
    openTextDialog();
    return true;
  }

  startHatch() {
    return hatchCommand.start();
  }

  startBlockCreate() {
    return blockCommand.startCreate();
  }

  confirmBlockCreateSelection() {
    return blockCommand.confirmCreateSelection();
  }

  createBlockAt(basePoint) {
    return blockCommand.createAt(basePoint);
  }

  startBlockInsert() {
    return blockCommand.startInsert();
  }

  insertBlockAt(insertionPoint) {
    return blockCommand.insertAt(insertionPoint);
  }

  createHatch(boundary) {
    return hatchCommand.create(boundary);
  }

  createTextAt(insertionPoint) {
    const draft = this.state.textDraft;
    if (!draft?.text || !insertionPoint || draft.height <= SNAP_THRESHOLD) {
      return false;
    }
    const entity = new TextEntity(insertionPoint, draft.text, draft.height, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    this.doc.addEntity(entity);
    this.state.lastTextHeight = draft.height;
    this.setTool('select');
    this.doc.clearSelection();
    this.state.statusText = `Texto creado - altura ${formatNumber(entity.height)} ${unitsLabel()}`;
    return true;
  }

  createLineTo(point, continueFromEnd = false) {
    if (distance(this.state.pendingLineStart, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }

    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new LineEntity(this.state.pendingLineStart, point, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.statusText = continueFromEnd
      ? `Linea ${style.label.toLowerCase()} creada - indique siguiente punto`
      : `Linea ${style.label.toLowerCase()} creada (${this.doc.entities.length})`;
    this.state.pendingLineStart = continueFromEnd ? point : null;
    return true;
  }

  beginPolyline(point) {
    this.state.polylineDraft = {
      vertices: [{ ...point }],
      segments: [],
      mode: 'line',
      startWidth: 0,
      endWidth: 0,
    };
    this.state.statusText = 'Primer punto indicado - siguiente punto · A arco · W anchura · C cerrar';
    return true;
  }

  addPolylinePoint(point) {
    const draft = this.state.polylineDraft;
    if (!draft) {
      return this.beginPolyline(point);
    }
    const start = draft.vertices[draft.vertices.length - 1];
    const closesPolyline = draft.vertices.length >= 3 &&
      distance(draft.vertices[0], point) <= SNAP_THRESHOLD;
    if (draft.mode === 'arc-end') {
      if (distance(start, point) <= SNAP_THRESHOLD) {
        this.state.statusText = 'Punto repetido';
        return false;
      }
      const arcGeometry = polylineTangentArcToPoint(draft, start, point);
      draft.segments.push({
        type: 'ARC',
        center: arcGeometry.center,
        clockwise: arcGeometry.clockwise,
        startWidth: draft.startWidth,
        endWidth: draft.endWidth,
      });
      draft.vertices.push({ ...point });
      if (closesPolyline) {
        return this.finishPolyline(true);
      }
      this.state.statusText = 'Arco tangente añadido - indique siguiente extremo · L vuelve a linea';
      return true;
    }
    if (distance(start, point) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Punto repetido';
      return false;
    }
    draft.segments.push({
      type: 'LINE',
      center: null,
      startWidth: draft.startWidth,
      endWidth: draft.endWidth,
    });
    draft.vertices.push({ ...point });
    if (closesPolyline) {
      return this.finishPolyline(true);
    }
    this.state.statusText = 'Tramo añadido - indique siguiente punto · A arco · W anchura · C cerrar';
    return true;
  }

  finishPolyline(close = false) {
    const draft = this.state.polylineDraft;
    if (!draft || draft.vertices.length < 2 || !draft.segments.length) {
      this.state.statusText = 'La polilinea necesita al menos dos puntos';
      return false;
    }
    if (close) {
      const first = draft.vertices[0];
      const last = draft.vertices[draft.vertices.length - 1];
      if (distance(first, last) <= SNAP_THRESHOLD) {
        draft.vertices.pop();
      }
      else {
        draft.segments.push({
          type: 'LINE',
          center: null,
          startWidth: draft.startWidth,
          endWidth: draft.endWidth,
        });
      }
    }
    const style = getLineStyle(activeLineStyleId());
    const entity = new PolylineEntity(draft.vertices, draft.segments, {
      closed: close,
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    this.doc.addEntity(entity);
    this.state.polylineDraft = null;
    this.state.distanceInput = '';
    this.setTool('select');
    this.state.statusText = `Polilinea ${close ? 'cerrada' : 'abierta'} creada · ${entity.segments.length} tramos`;
    return true;
  }

  handlePolylineCommandKey(event) {
    if (this.state.tool !== 'polyline' || !this.state.polylineDraft ||
        event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }
    const key = event.key.toLowerCase();
    const draft = this.state.polylineDraft;
    if (key === 'a') {
      event.preventDefault();
      draft.mode = 'arc-end';
      this.state.distanceInput = '';
      this.state.statusText = 'Modo arco tangente - indique el segundo punto';
      return true;
    }
    if (key === 'l') {
      event.preventDefault();
      draft.mode = 'line';
      this.state.distanceInput = '';
      this.state.statusText = 'Modo linea - indique siguiente punto';
      return true;
    }
    if (key === 'c') {
      event.preventDefault();
      this.finishPolyline(true);
      return true;
    }
    if (key === 'w') {
      event.preventDefault();
      openPolylineWidthDialog();
      return true;
    }
    return false;
  }

  createRectangleTo(point) {
    const firstPoint = this.state.rectangleDraft?.firstPoint;
    if (!firstPoint) {
      return false;
    }

    if (
      Math.abs(point.x - firstPoint.x) <= SNAP_THRESHOLD ||
      Math.abs(point.y - firstPoint.y) <= SNAP_THRESHOLD
    ) {
      this.state.statusText = 'Rectangulo no valido';
      return false;
    }

    const style = getLineStyle(activeLineStyleId());
    const topRight = { x: point.x, y: firstPoint.y };
    const bottomLeft = { x: firstPoint.x, y: point.y };
    const segments = Array.from({ length: 4 }, () => ({
      type: 'LINE',
      center: null,
      clockwise: true,
      startWidth: 0,
      endWidth: 0,
    }));
    this.doc.addEntity(new PolylineEntity(
      [firstPoint, topRight, point, bottomLeft],
      segments,
      {
        closed: true,
        layer: activeLayerName(),
        lineStyle: style.id,
        lineType: activeLineTypeId(),
        lineColor: activeLineColorId(),
      },
    ));
    this.state.rectangleDraft = null;
    this.state.statusText = `Rectangulo ${style.label.toLowerCase()} creado (${this.doc.entities.length})`;
    return true;
  }

  createCircle(center, radius) {
    if (radius <= SNAP_THRESHOLD) {
      this.state.statusText = 'Radio no valido';
      return false;
    }

    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new CircleEntity(center, radius, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.circleDraft = null;
    this.state.statusText = `Circulo ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${unitsLabel()}`;
    return true;
  }

  createArc(center, radius, startAngle, endAngle) {
    if (radius <= SNAP_THRESHOLD || arcSweep(startAngle, endAngle) <= SNAP_THRESHOLD) {
      this.state.statusText = 'Arco no valido';
      return false;
    }

    const style = getLineStyle(activeLineStyleId());
    this.doc.addEntity(new ArcEntity(center, radius, startAngle, endAngle, {
      layer: activeLayerName(),
      lineStyle: style.id,
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    }));
    this.state.arcDraft = null;
    this.state.statusText = `Arco ${style.label.toLowerCase()} creado - radio ${formatNumber(radius)} ${unitsLabel()}`;
    return true;
  }

  handleFilletPoint(worldPoint) {
    const draft = this.state.filletDraft || { firstOperand: null };
    const entity = this.findEntityAt(worldPoint);
    const operand = filletOperandAt(entity, worldPoint);
    if (!operand || entity.groupId) {
      this.state.statusText = entity?.groupId
        ? 'Descomponga la polilinea agrupada antes de empalmar'
        : 'Empalme: seleccione linea, arco, circulo o tramo de polilinea';
      return false;
    }
    if (!draft.firstOperand) {
      draft.firstOperand = operand;
      this.state.filletDraft = draft;
      this.state.statusText = `Primera entidad indicada · R${formatNumber(activeFilletRadius())} · seleccione la segunda`;
      return true;
    }
    if (
      operand.entity === draft.firstOperand.entity &&
      operand.segmentIndex === draft.firstOperand.segmentIndex
    ) {
      this.state.statusText = 'Seleccione otra entidad o un tramo diferente de la polilinea';
      return false;
    }
    const solution = filletSolutions(draft.firstOperand, operand, activeFilletRadius())[0];
    const result = solution
      ? applyFilletSolution(this.doc, draft.firstOperand, operand, solution)
      : { valid: false, reason: 'No se encontro una solucion tangente para esas entidades' };
    if (!result.valid) {
      this.state.statusText = result.reason;
      return false;
    }
    this.state.filletDraft = { firstOperand: null };
    this.state.hoveredEntity = null;
    this.state.statusText = result.radius <= SNAP_THRESHOLD
      ? 'Entidades prolongadas hasta su interseccion · seleccione otra primera entidad'
      : `Empalme creado · R${formatNumber(result.radius)} ${unitsLabel()} · seleccione otra primera entidad`;
    return true;
  }

  handleChamferPoint(worldPoint) {
    const draft = this.state.chamferDraft || { firstOperand: null };
    const entity = this.findEntityAt(worldPoint);
    const operand = filletOperandAt(entity, worldPoint);
    if (!operand || operand.primitive.type !== 'LINE' || entity.groupId) {
      this.state.statusText = entity?.groupId
        ? 'Descomponga la polilinea agrupada antes de achaflanar'
        : 'Chaflan: seleccione una linea o un tramo recto de polilinea';
      return false;
    }
    if (!draft.firstOperand) {
      draft.firstOperand = operand;
      this.state.chamferDraft = draft;
      this.state.statusText = `Primera entidad indicada · ${formatChamferDistances()} · seleccione la segunda`;
      return true;
    }
    if (operand.entity === draft.firstOperand.entity && operand.segmentIndex === draft.firstOperand.segmentIndex) {
      this.state.statusText = 'Seleccione otra linea o un tramo diferente';
      return false;
    }
    const distances = activeChamferDistances();
    const solution = chamferSolution(
      draft.firstOperand,
      operand,
      distances.first,
      distances.second,
    );
    const result = solution.valid
      ? applyChamferSolution(this.doc, draft.firstOperand, operand, solution)
      : solution;
    if (!result.valid) {
      this.state.statusText = result.reason;
      return false;
    }
    this.state.chamferDraft = { firstOperand: null };
    this.state.hoveredEntity = null;
    this.state.statusText = `Chaflan creado · ${formatChamferDistances()} · seleccione otra primera entidad`;
    return true;
  }

  handleCirclePoint(point) {
    if (this.state.tool === 'circle-center') {
      if (!this.state.circleDraft) {
        this.state.circleDraft = { mode: 'center-radius', points: [point] };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const center = this.state.circleDraft.points[0];
      const radius = distance(center, point);
      return this.createCircle(center, radius);
    }

    if (this.state.tool === 'circle-3p') {
      const draft = this.state.circleDraft || { mode: '3p', points: [] };

      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.circleDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique segundo punto'
          : 'Segundo punto indicado - indique tercer punto';
        return true;
      }

      const circle = circleFromThreePoints(draft.points[0], draft.points[1], point);
      if (!circle) {
        this.state.statusText = 'Los 3 puntos no definen un circulo';
        return false;
      }

      return this.createCircle(circle.center, circle.radius);
    }

    return false;
  }

  handleArcPoint(point) {
    if (this.state.tool === 'arc-3p') {
      const draft = this.state.arcDraft || { mode: '3p', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Primer punto indicado - indique punto de paso'
          : 'Punto de paso indicado - indique punto final';
        return true;
      }

      const arc = arcFromThreePoints(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Los 3 puntos no definen un arco';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-start-end') {
      const draft = this.state.arcDraft || { mode: 'center-start-end', points: [] };
      if (draft.points.length < 2) {
        draft.points.push(point);
        this.state.arcDraft = draft;
        this.state.statusText = draft.points.length === 1
          ? 'Centro indicado - indique punto inicial'
          : 'Punto inicial indicado - indique punto final';
        return true;
      }

      const arc = arcFromCenterStartEnd(draft.points[0], draft.points[1], point);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    if (this.state.tool === 'arc-center-radius') {
      if (!this.state.arcDraft) {
        this.state.arcDraft = { mode: 'center-radius', points: [point], radius: null };
        this.state.statusText = 'Centro indicado - indique radio';
        return true;
      }

      const draft = this.state.arcDraft;
      const center = draft.points[0];
      if (draft.points.length === 1) {
        const radius = distance(center, point);
        if (radius <= SNAP_THRESHOLD) {
          this.state.statusText = 'Radio no valido';
          return false;
        }
        draft.radius = radius;
        draft.points.push(point);
        this.state.statusText = 'Radio indicado - indique punto inicial';
        return true;
      }

      if (draft.points.length === 2) {
        const startPoint = pointOnRadiusFromAngle(center, draft.radius, point);
        draft.points.push(startPoint);
        this.state.statusText = 'Punto inicial indicado - indique punto final';
        return true;
      }

      const endPoint = pointOnRadiusFromAngle(center, draft.radius, point);
      const arc = arcFromCenterStartEnd(center, draft.points[2], endPoint);
      if (!arc) {
        this.state.statusText = 'Arco no valido';
        return false;
      }
      return this.createArc(arc.center, arc.radius, arc.startAngle, arc.endAngle);
    }

    return false;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerDrawingMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerDrawingMethods.prototype[name]]),
  );
}

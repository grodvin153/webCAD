/* webCAD - Entrada numerica y coordenadas | SPDX-License-Identifier: GPL-3.0-or-later */

function ellipseDistanceTarget(draft, cursor, distance) {
  const points = draft?.points || [];
  if (!cursor || !Number.isFinite(distance) || distance <= 0 || !points.length) return null;
  if (points.length === 1) {
    const deltaX = cursor.x - points[0].x;
    const deltaY = cursor.y - points[0].y;
    const length = Math.hypot(deltaX, deltaY);
    if (length <= 1e-12) return null;
    return {
      x: points[0].x + deltaX * distance / length,
      y: points[0].y + deltaY * distance / length,
      z: points[0].z || 0,
    };
  }
  const [first, second] = points;
  const center = { x: (first.x + second.x) * 0.5, y: (first.y + second.y) * 0.5 };
  const majorX = second.x - first.x;
  const majorY = second.y - first.y;
  const majorLength = Math.hypot(majorX, majorY);
  if (majorLength <= 1e-12) return null;
  const normal = { x: -majorY / majorLength, y: majorX / majorLength };
  const side = Math.sign((cursor.x - center.x) * normal.x + (cursor.y - center.y) * normal.y) || 1;
  return {
    x: center.x + normal.x * distance * side,
    y: center.y + normal.y * distance * side,
    z: ((first.z || 0) + (second.z || 0)) * 0.5,
  };
}

export function createControllerInputMethods(dependencies) {
  const {
    SNAP_THRESHOLD,
    activeDraftOrigin,
    clamp,
    cursorInput,
    dimensionPlacementOrigin,
    dimensionPlacementPoint,
    distance,
    ellipseCommand,
    formatNumber,
    parseAngleInput,
    parseCopyMultiplier,
    parseDistanceInput,
    parseScaleFactor,
    pointFromDistance,
    pointFromPartialRelativeCoordinates,
    pointFromRelativeCoordinates,
    rectangleTargetPoint,
    regularPolygonCommand,
    resolveCursorPoint,
    scaleCommand,
    stretchCommand,
    stretchCommandTargetPoint,
    unitsLabel,
    xlineCommand,
  } = dependencies;

  class ControllerInputMethods {
  handleDistanceInputKey(event) {
    const circleCenterDraft = this.state.circleDraft?.mode === 'center-radius' &&
      this.state.circleDraft.points.length === 1;
    const arcRadiusDraft = this.state.arcDraft?.mode === 'center-radius' &&
      this.state.arcDraft.points.length === 1;
    const radiusDraft = circleCenterDraft || arcRadiusDraft;
    const pointDraft = Boolean(
      this.state.polylineDraft?.vertices.length ||
      this.state.rectangleDraft?.firstPoint ||
      this.state.regularPolygonDraft?.center ||
      this.state.circleDraft?.points.length ||
      this.state.arcDraft?.points.length ||
      this.state.ellipseDraft?.points.length ||
      this.state.xlineDraft?.firstPoint ||
      this.state.copyDraft?.basePoint ||
      this.state.moveDraft?.basePoint ||
      this.state.rotateDraft?.basePoint ||
      this.state.scaleDraft?.basePoint ||
      this.state.blockCreateDraft?.name ||
      this.state.blockInsertDraft ||
      this.state.dimensionDraft?.phase === 'placement'
    );
    if (!this.state.pendingLineStart && !this.state.selectedGrip && !radiusDraft && !pointDraft && !this.state.lastCopy) {
      return false;
    }

    if (
      (event.key.toLowerCase() === 'x' && !this.state.distanceInput) ||
      /^[0-9+\-*/()]$/.test(event.key)
    ) {
      this.state.distanceInput += event.key;
      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      this.state.statusText = multiplier
        ? `Repetir copia: x${multiplier}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : this.state.scaleDraft?.basePoint
        ? `Factor de escala: x${this.state.distanceInput}`
        : this.state.distanceInput.includes(',')
        ? `Coordenadas: ${this.state.distanceInput} ${unitsLabel()}`
        : radiusDraft
        ? `Radio: ${this.state.distanceInput} ${unitsLabel()}`
        : `Distancia: ${this.state.distanceInput} ${unitsLabel()}`;
      return true;
    }

    if (event.key === '.' || event.key === ',') {
      if (event.key === '.' || !this.state.distanceInput.includes(',')) {
        this.state.distanceInput += event.key;
      }
      this.state.statusText = this.state.distanceInput.includes(',')
        ? this.state.rotateDraft?.basePoint
          ? `Angulo: ${this.state.distanceInput}°`
          : this.state.scaleDraft?.basePoint
            ? `Factor de escala: x${this.state.distanceInput}`
          : `Coordenadas: ${this.state.distanceInput} ${unitsLabel()}`
        : this.state.rotateDraft?.basePoint
        ? `Angulo: ${this.state.distanceInput}°`
        : this.state.scaleDraft?.basePoint
        ? `Factor de escala: x${this.state.distanceInput}`
        : radiusDraft
        ? `Radio: ${this.state.distanceInput} ${unitsLabel()}`
        : `Distancia: ${this.state.distanceInput} ${unitsLabel()}`;
      return true;
    }

    if (event.key === 'Backspace') {
      this.state.distanceInput = this.state.distanceInput.slice(0, -1);
      this.state.statusText = this.state.distanceInput
        ? this.state.rotateDraft?.basePoint
          ? `Angulo: ${this.state.distanceInput}°`
          : this.state.scaleDraft?.basePoint
          ? `Factor de escala: x${this.state.distanceInput}`
          : radiusDraft
          ? `Radio: ${this.state.distanceInput} ${unitsLabel()}`
          : `Distancia: ${this.state.distanceInput} ${unitsLabel()}`
        : this.state.rotateDraft?.basePoint
          ? 'Angulo pendiente'
          : this.state.scaleDraft?.basePoint
            ? 'Factor de escala pendiente'
          : radiusDraft ? 'Radio pendiente' : 'Segundo punto pendiente';
      return true;
    }

    if (event.key === 'Enter') {
      if (this.state.rotateDraft?.basePoint) {
        const inputAngle = parseAngleInput(this.state.distanceInput);
        if (inputAngle !== null && this.rotateSelectionBy(inputAngle)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Angulo no valido';
        }
        return true;
      }

      if (this.state.scaleDraft?.basePoint) {
        const factor = parseScaleFactor(this.state.distanceInput);
        if (factor !== null && scaleCommand.apply(factor)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Factor de escala no valido';
        }
        return true;
      }

      const multiplier = parseCopyMultiplier(this.state.distanceInput);
      if (multiplier !== null) {
        if (this.repeatLastCopy(multiplier)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'No hay copia anterior para repetir';
        }
        return true;
      }

      const inputDistance = parseDistanceInput(this.state.distanceInput);
      const activeGripPoint = this.activeGripPoint();
      const coordinateOrigin = this.state.copyDraft?.basePoint ||
        this.state.moveDraft?.basePoint ||
        this.state.mirrorDraft?.firstPoint ||
        activeGripPoint ||
        this.state.pendingLineStart ||
        activeDraftOrigin(this.state) ||
        this.state.rectangleDraft?.firstPoint ||
        this.state.circleDraft?.points[0] ||
        this.state.arcDraft?.points[0] ||
        this.state.ellipseDraft?.points[0] ||
        (this.state.blockCreateDraft?.name ? { x: 0, y: 0 } : null) ||
        (this.state.blockInsertDraft ? { x: 0, y: 0 } : null) ||
        dimensionPlacementOrigin(this.state.dimensionDraft) ||
        null;
      const coordinateTarget = pointFromRelativeCoordinates(coordinateOrigin, this.state.distanceInput);
      const cursorTarget = resolveCursorPoint(this.state.mouseWorld, this.state);
      const partialCoordinateTarget = pointFromPartialRelativeCoordinates(
        coordinateOrigin,
        cursorTarget,
        this.state.distanceInput,
      );

      if (this.state.dimensionDraft?.phase === 'placement') {
        const cursor = resolveCursorPoint(this.state.mouseWorld, this.state);
        const targetPoint = coordinateTarget || partialCoordinateTarget || dimensionPlacementPoint(
          this.state.dimensionDraft,
          cursor,
          this.state,
        );
        if (targetPoint && this.createDimensionAt(targetPoint, { rememberOffset: true })) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Separacion de cota no valida';
        }
        return true;
      }

      if (this.state.blockCreateDraft?.name) {
        if ((coordinateTarget || partialCoordinateTarget) && this.createBlockAt(coordinateTarget || partialCoordinateTarget)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Punto base no valido';
        }
        return true;
      }

      if (this.state.blockInsertDraft) {
        if ((coordinateTarget || partialCoordinateTarget) && this.insertBlockAt(coordinateTarget || partialCoordinateTarget)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Punto de insercion no valido';
        }
        return true;
      }

      if (this.state.copyDraft?.basePoint) {
        const cursor = cursorTarget;
        const targetPoint = coordinateTarget || partialCoordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.copyDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.copySelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de copia no valido';
        }
        return true;
      }

      if (this.state.moveDraft?.basePoint) {
        const cursor = cursorTarget;
        const targetPoint = coordinateTarget || partialCoordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.moveDraft.basePoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.moveSelectionTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de desplazamiento no valido';
        }
        return true;
      }

      if (this.state.stretchDraft?.basePoint) {
        const targetPoint = stretchCommandTargetPoint(this.state.mouseWorld, this.state.stretchDraft.basePoint);
        if (targetPoint && stretchCommand.apply(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Destino de estiramiento no valido';
        }
        return true;
      }

      if (this.state.mirrorDraft?.firstPoint) {
        const cursor = this.resolveMirrorAxisPoint(this.state.mouseWorld);
        const targetPoint = coordinateTarget || partialCoordinateTarget ||
          (inputDistance !== null && cursor
            ? pointFromDistance(this.state.mirrorDraft.firstPoint, cursor, inputDistance)
            : null);
        if (targetPoint && this.mirrorSelectionAcross(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Segundo punto del eje no valido';
        }
        return true;
      }

      if (this.state.selectedGrip) {
        if (coordinateTarget || partialCoordinateTarget) {
          const gripPoint = this.activeGripPoint();
          const targetPoint = coordinateTarget || partialCoordinateTarget;
          if (distance(gripPoint, targetPoint) > SNAP_THRESHOLD) {
            this.doc.recordHistory();
            this.moveActiveGripPointTo(targetPoint);
          }
          this.state.distanceInput = '';
          this.state.statusText = 'Punto desplazado por coordenadas';
        }
        else if (inputDistance !== null && this.moveSelectedGripByDistance(inputDistance)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Distancia o direccion no valida';
        }
        return true;
      }

      if (circleCenterDraft) {
        const center = this.state.circleDraft.points[0];
        const radius = coordinateTarget || partialCoordinateTarget
          ? distance(center, coordinateTarget || partialCoordinateTarget)
          : inputDistance;
        if (radius !== null && this.createCircle(center, radius)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if (arcRadiusDraft) {
        const center = this.state.arcDraft.points[0];
        const radius = coordinateTarget || partialCoordinateTarget
          ? distance(center, coordinateTarget || partialCoordinateTarget)
          : inputDistance;
        if (radius !== null) {
          this.state.arcDraft.radius = radius;
          this.state.arcDraft.points.push(coordinateTarget || partialCoordinateTarget || { x: center.x + radius, y: center.y });
          this.state.distanceInput = '';
          this.state.statusText = 'Radio indicado - indique punto inicial';
        }
        else {
          this.state.statusText = 'Radio no valido';
        }
        return true;
      }

      if ((coordinateTarget || partialCoordinateTarget) && this.state.circleDraft?.points.length) {
        this.handleCirclePoint(coordinateTarget || partialCoordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if ((coordinateTarget || partialCoordinateTarget) && this.state.arcDraft?.points.length) {
        this.handleArcPoint(coordinateTarget || partialCoordinateTarget);
        this.state.distanceInput = '';
        return true;
      }

      if (this.state.ellipseDraft?.points.length) {
        const targetPoint = coordinateTarget || partialCoordinateTarget ||
          ellipseDistanceTarget(this.state.ellipseDraft, cursorTarget, inputDistance);
        if (!targetPoint) {
          this.state.statusText = 'Distancia o coordenadas no validas';
          return true;
        }
        ellipseCommand.pick(targetPoint);
        this.state.distanceInput = '';
        return true;
      }

      if (this.state.xlineDraft?.firstPoint) {
        return xlineCommand.pick(this.state.mouseWorld);
      }

      if (this.state.polylineDraft?.vertices.length) {
        const origin = activeDraftOrigin(this.state);
        const directionPoint = cursorTarget;
        const targetPoint = coordinateTarget || partialCoordinateTarget || (inputDistance !== null && directionPoint
          ? pointFromDistance(origin, directionPoint, inputDistance)
          : null);
        if (targetPoint && this.addPolylinePoint(targetPoint)) {
          this.state.distanceInput = '';
        }
        else if (!targetPoint) {
          this.state.statusText = 'Distancia o coordenadas no validas';
        }
        return true;
      }

      if (this.state.rectangleDraft?.firstPoint) {
        if (!this.state.distanceInput.includes(',') && inputDistance !== null && !this.state.rectangleDraft.fixedWidth) {
          this.state.rectangleDraft.fixedWidth = inputDistance;
          this.state.distanceInput = '';
          this.state.statusText = `Ancho fijado: ${formatNumber(inputDistance)} ${unitsLabel()} · indique la altura con el cursor`;
          return true;
        }
        const targetPoint = rectangleTargetPoint(
          this.state.rectangleDraft,
          cursorTarget,
          this.state.distanceInput,
        );
        if (targetPoint && this.createRectangleTo(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Rectangulo no valido';
        }
        return true;
      }

      if (this.state.regularPolygonDraft?.center) {
        const directionPoint = cursorTarget;
        const targetPoint = coordinateTarget || partialCoordinateTarget || (inputDistance !== null && directionPoint
          ? pointFromDistance(this.state.regularPolygonDraft.center, directionPoint, inputDistance)
          : null);
        if (targetPoint && regularPolygonCommand?.createAt?.(targetPoint)) {
          this.state.distanceInput = '';
        }
        else {
          this.state.statusText = 'Radio de poligono no valido';
        }
        return true;
      }

      const directionPoint = cursorTarget;
      const endPoint = coordinateTarget || partialCoordinateTarget || (inputDistance !== null && directionPoint
        ? pointFromDistance(this.state.pendingLineStart, directionPoint, inputDistance)
        : null);

      if (endPoint) {
        this.createLineTo(endPoint, true);
        this.state.distanceInput = '';
      }
      else {
        this.state.statusText = 'Distancia o direccion no valida';
      }
      return true;
    }

    return false;
  }

  updateCursorInput() {
    const multiplier = parseCopyMultiplier(this.state.distanceInput);
    const copyMultiplierDraft = this.state.lastCopy && /^x\d*$/i.test(this.state.distanceInput.trim());
    const dimensionSuggestedDistance = this.state.dimensionDraft?.phase === 'placement' &&
      this.state.dimensionDraft.suggestionActive &&
      Number.isFinite(this.state.dimensionDraft.suggestedOffset)
      ? formatNumber(this.state.dimensionDraft.suggestedOffset)
      : '';
    const cursorInputValue = this.state.distanceInput || dimensionSuggestedDistance;
    const visible = Boolean(
      (
        this.state.pendingLineStart ||
        this.state.polylineDraft ||
        this.state.rectangleDraft ||
        this.state.regularPolygonDraft ||
        this.state.selectedGrip ||
        this.state.circleDraft ||
        this.state.arcDraft ||
        this.state.ellipseDraft ||
        this.state.copyDraft ||
        this.state.moveDraft ||
        this.state.stretchDraft ||
        this.state.rotateDraft ||
        this.state.scaleDraft ||
        this.state.mirrorDraft ||
        this.state.blockCreateDraft?.name ||
        this.state.blockInsertDraft ||
        this.state.dimensionDraft?.phase === 'placement' ||
        copyMultiplierDraft
      ) &&
      cursorInputValue &&
      this.state.mouseScreen,
    );

    cursorInput.classList.toggle('is-visible', visible);
    cursorInput.setAttribute('aria-hidden', String(!visible));

    if (!visible) {
      return;
    }

    cursorInput.textContent = this.state.rotateDraft?.basePoint
      ? `${this.state.distanceInput}°`
      : this.state.scaleDraft?.basePoint
      ? `x${this.state.distanceInput}`
      : multiplier || copyMultiplierDraft
      ? this.state.distanceInput
      : `${cursorInputValue} ${unitsLabel()}`;

    const parentRect = cursorInput.parentElement.getBoundingClientRect();
    const inputRect = cursorInput.getBoundingClientRect();
    const offset = 14;
    const x = clamp(
      this.state.mouseScreen.x + offset,
      4,
      Math.max(4, parentRect.width - inputRect.width - 4),
    );
    const y = clamp(
      this.state.mouseScreen.y + offset,
      4,
      Math.max(4, parentRect.height - inputRect.height - 4),
    );

    cursorInput.style.transform = `translate(${x}px, ${y}px)`;
  }

  }

  return Object.fromEntries(
    Object.getOwnPropertyNames(ControllerInputMethods.prototype)
      .filter((name) => name !== 'constructor')
      .map((name) => [name, ControllerInputMethods.prototype[name]]),
  );
}

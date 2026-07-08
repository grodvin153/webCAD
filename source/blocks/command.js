/* webCAD - Ordenes de creacion e insercion de bloques | SPDX-License-Identifier: GPL-3.0-or-later */

export function createBlockCommand(dependencies) {
  const {
    BlockReferenceEntity,
    activeLayerName,
    activeLineColorId,
    activeLineStyleId,
    activeLineTypeId,
    cloneEntitiesWithOffset,
    doc,
    openCreateDialog,
    openInsertDialog,
    refresh,
    rememberSelection,
    setTool,
    state,
  } = dependencies;

  function startCreate() {
    const sourceEntities = [...doc.selectedEntities];
    if (sourceEntities.length) {
      rememberSelection(sourceEntities);
    }
    setTool('block-create');
    state.blockCreateDraft = {
      sourceEntities,
      selecting: !sourceEntities.length,
      name: null,
    };
    if (sourceEntities.length) {
      doc.selectEntities(sourceEntities);
      openCreateDialog();
    }
    else {
      state.statusText = 'Crear bloque: seleccione objetos y confirme';
    }
    refresh();
    return true;
  }

  function confirmCreateSelection() {
    if (!state.blockCreateDraft?.selecting) {
      return false;
    }
    const sourceEntities = [...doc.selectedEntities];
    if (!sourceEntities.length) {
      state.statusText = 'Seleccione entidades para crear el bloque';
      return false;
    }
    rememberSelection(sourceEntities);
    state.blockCreateDraft = {
      sourceEntities,
      selecting: false,
      name: null,
    };
    openCreateDialog();
    return true;
  }

  function createAt(basePoint) {
    const draft = state.blockCreateDraft;
    if (!draft?.name || !draft.sourceEntities.length || !basePoint) {
      return false;
    }
    const localEntities = cloneEntitiesWithOffset(
      draft.sourceEntities,
      { x: -basePoint.x, y: -basePoint.y, z: -(basePoint.z || 0) },
    );
    if (!localEntities.length) {
      state.statusText = 'No se pudo crear la definicion del bloque';
      return false;
    }
    doc.recordHistory();
    const definition = { name: draft.name, revision: 0, entities: localEntities };
    doc.blockDefinitions.set(definition.name.toLowerCase(), definition);
    const reference = new BlockReferenceEntity(definition, basePoint, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
    });
    doc.replaceEntities(draft.sourceEntities, [reference], { recordHistory: false });
    setTool('select');
    doc.clearSelection();
    state.statusText = `Bloque ${definition.name} creado`;
    return true;
  }

  function startInsert() {
    const hasInsertableBlock = [...doc.blockDefinitions.values()].some((definition) =>
      definition.name.toLowerCase() !== String(doc.editingBlockName || '').toLowerCase());
    if (!hasInsertableBlock) {
      state.statusText = 'No hay bloques definidos en el dibujo';
      refresh();
      return false;
    }
    setTool('block-insert');
    openInsertDialog();
    return true;
  }

  function insertAt(insertionPoint) {
    const draft = state.blockInsertDraft;
    const definition = draft?.definition;
    if (!definition || !insertionPoint) {
      return false;
    }
    doc.addEntity(new BlockReferenceEntity(definition, insertionPoint, {
      layer: activeLayerName(),
      lineStyle: activeLineStyleId(),
      lineType: activeLineTypeId(),
      lineColor: activeLineColorId(),
      rotation: draft.rotation,
      scaleX: draft.scale,
      scaleY: draft.scale,
    }));
    setTool('select');
    doc.clearSelection();
    state.statusText = `Bloque ${definition.name} insertado`;
    return true;
  }

  return {
    confirmCreateSelection,
    createAt,
    insertAt,
    startCreate,
    startInsert,
  };
}

/* webCAD - Comando interactivo para unir sólidos 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { isSolidTransformConfirmEvent } from './solid-transform-command.js';
import { publishSolidUnion } from './solid-union.js';

function failureMessage(reason) {
  return {
    'invalid-result': 'Unión no realizada: la geometría resultante no es cerrada y válida',
    'invalid-selection': 'Unión no realizada: la selección contiene un sólido no disponible',
    'locked-solid': 'Unión no realizada: uno de los sólidos está bloqueado',
    'no-material-connection': 'Unión no realizada: los sólidos están separados o solo se tocan por una arista o un punto',
    'non-replayable-solid': 'Unión no realizada: uno de los sólidos no tiene geometría paramétrica reproducible',
    'publication-failed': 'Unión no realizada: no se pudo actualizar el documento',
    'too-few-solids': 'Seleccione al menos dos sólidos para unir',
  }[reason] ?? 'Unión no realizada: no se pudo resolver la operación';
}

export function createSolidUnionCommand({
  canvas,
  doc,
  getSelectedSolidIds = () => [],
  getSolidIdAtPointer = () => null,
  onChanged = () => {},
  onSelection = () => {},
  onStatus = () => {},
} = {}) {
  let active = false;
  let initialSelection = [];
  let selectedIds = [];
  let suppressClick = false;
  let suppressContextMenu = false;

  function recordForId(id) {
    return doc?.model3d?.solids?.find((record) => record?.id === id) ?? null;
  }

  function selectableIds(ids) {
    return [...new Set(ids)].filter((id) => {
      const record = recordForId(id);
      return record && record.visible !== false && record.locked !== true;
    });
  }

  function selectionStatus() {
    const count = selectedIds.length;
    onStatus(
      `Unir sólidos · ${count} seleccionado${count === 1 ? '' : 's'}` +
      (count >= 2 ? ' · Enter, Espacio o clic derecho para confirmar' : ''),
    );
  }

  function cleanup() {
    active = false;
    suppressContextMenu = false;
  }

  function cancel() {
    if (!active) return false;
    cleanup();
    onSelection([...initialSelection]);
    onStatus('Unir sólidos cancelado');
    return true;
  }

  function confirm() {
    if (!active) return false;
    if (selectedIds.length < 2) {
      selectionStatus();
      return false;
    }
    const result = publishSolidUnion({ doc, solidIds: selectedIds });
    if (!result.ok) {
      onSelection([...selectedIds]);
      onStatus(failureMessage(result.reason));
      return false;
    }
    cleanup();
    onChanged();
    onSelection(result.resultIds);
    const components = result.groups.length;
    const separated = result.groups.filter((group) => group.ids.length === 1).length;
    onStatus(
      `Unión completada · ${components} componente${components === 1 ? '' : 's'} material${components === 1 ? '' : 'es'}` +
      (separated ? ` · ${separated} sólido${separated === 1 ? '' : 's'} separado${separated === 1 ? '' : 's'} conservado${separated === 1 ? '' : 's'}` : ''),
    );
    return true;
  }

  function start() {
    if (active) cancel();
    initialSelection = [...getSelectedSolidIds()];
    selectedIds = selectableIds(initialSelection);
    active = true;
    canvas.focus?.({ preventScroll: true });
    onSelection([...selectedIds]);
    selectionStatus();
    return true;
  }

  function pointerdown(event) {
    if (!active || (event.button !== 0 && event.button !== 2)) return;
    suppressClick = true;
    suppressContextMenu = event.button === 2;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.button === 2) {
      confirm();
      return;
    }
    const id = getSolidIdAtPointer(event);
    const record = recordForId(id);
    if (!record || record.visible === false) {
      selectionStatus();
      return;
    }
    if (record.locked === true) {
      onStatus(`${record.name} está bloqueado`);
      return;
    }
    selectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onSelection([...selectedIds]);
    selectionStatus();
  }

  function click(event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function contextmenu(event) {
    if (!suppressContextMenu && !active) return;
    suppressContextMenu = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function keydown(event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancel();
      return;
    }
    if (!isSolidTransformConfirmEvent(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    confirm();
  }

  canvas.addEventListener('pointerdown', pointerdown, true);
  canvas.addEventListener('click', click, true);
  canvas.addEventListener('contextmenu', contextmenu, true);
  canvas.addEventListener('keydown', keydown, true);

  return {
    cancel,
    confirm,
    dispose() {
      if (active) cancel();
      canvas.removeEventListener('pointerdown', pointerdown, true);
      canvas.removeEventListener('click', click, true);
      canvas.removeEventListener('contextmenu', contextmenu, true);
      canvas.removeEventListener('keydown', keydown, true);
    },
    isActive: () => active,
    start,
  };
}

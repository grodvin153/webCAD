/* webCAD - Comando interactivo para restar sólidos 3D | SPDX-License-Identifier: GPL-3.0-or-later */

import { isSolidTransformConfirmEvent } from './solid-transform-command.js';
import { publishSolidSubtraction } from './solid-subtraction.js';

function failureMessage(reason) {
  return {
    'below-useful-tolerance': 'Resta no realizada: la intersección es degenerada o demasiado pequeña',
    'invalid-cutter-geometry': 'Resta no realizada: uno de los cortadores no es válido',
    'invalid-overlap-test': 'Resta no realizada: el contacto entre sólidos es ambiguo',
    'invalid-result': 'Resta no realizada: el resultado no es cerrado y válido',
    'invalid-target-solid': 'Resta no realizada: el sólido objetivo no es válido',
    'kernel-error': 'Resta no realizada: el núcleo 3D no pudo resolver la geometría',
    'kernel-unavailable': 'Resta no realizada: el núcleo 3D no está disponible',
    'locked-solid': 'Resta no realizada: uno de los sólidos está bloqueado',
    'minimum-thickness': 'Resta no realizada: el resultado incumple el espesor mínimo',
    'no-intersection': 'Resta no realizada: ningún cortador atraviesa el volumen del objetivo',
    'non-replayable-solid': 'Resta no realizada: uno de los sólidos no tiene geometría paramétrica reproducible',
    'publication-failed': 'Resta no realizada: no se pudo actualizar el documento',
    'tangent-contact': 'Resta no realizada: solo existe contacto tangente por cara, arista o vértice',
    'too-few-cutters': 'Seleccione al menos un sólido cortador',
  }[reason] ?? 'Resta no realizada: no se pudo resolver la operación';
}

export function createSolidSubtractionCommand({
  canvas,
  doc,
  getSelectedSolidIds = () => [],
  getSolidIdAtPointer = () => null,
  onChanged = () => {},
  onSelection = () => {},
  onStatus = () => {},
} = {}) {
  let active = false;
  let cutterIds = [];
  let initialSelection = [];
  let phase = 'target';
  let suppressClick = false;
  let suppressContextMenu = false;
  let targetId = null;

  function recordForId(id) {
    return doc?.model3d?.solids?.find((record) => record?.id === id) ?? null;
  }

  function selectableRecord(id) {
    const record = recordForId(id);
    return record && record.visible !== false && record.locked !== true ? record : null;
  }

  function selectionStatus() {
    if (!targetId) {
      onStatus('Restar sólidos · seleccione primero el sólido objetivo');
      return;
    }
    const count = cutterIds.length;
    onStatus(
      `Restar sólidos · objetivo seleccionado · ${count} cortador${count === 1 ? '' : 'es'}` +
      (count ? ' · Enter, Espacio o clic derecho para confirmar' : ''),
    );
  }

  function syncSelection() {
    onSelection([targetId, ...cutterIds].filter(Boolean));
  }

  function cleanup() {
    active = false;
    phase = 'target';
    targetId = null;
    cutterIds = [];
    suppressContextMenu = false;
  }

  function cancel() {
    if (!active) return false;
    cleanup();
    onSelection([...initialSelection]);
    onStatus('Restar sólidos cancelado');
    return true;
  }

  function confirm() {
    if (!active || !targetId || !cutterIds.length) {
      selectionStatus();
      return false;
    }
    const selected = [targetId, ...cutterIds];
    const result = publishSolidSubtraction({ cutterIds, doc, targetId });
    if (!result.ok) {
      onSelection(selected);
      onStatus(failureMessage(result.reason));
      return false;
    }
    const resultCount = result.resultIds.length;
    cleanup();
    onChanged();
    onSelection(result.resultIds);
    onStatus(result.empty
      ? 'Resta completada · el volumen objetivo se ha eliminado por completo'
      : `Resta completada · ${resultCount} componente${resultCount === 1 ? '' : 's'} resultante${resultCount === 1 ? '' : 's'}`);
    return true;
  }

  function start() {
    if (active) cancel();
    initialSelection = [...getSelectedSolidIds()];
    const selected = initialSelection.filter((id) => selectableRecord(id));
    targetId = selected[0] ?? null;
    cutterIds = selected.slice(1);
    phase = targetId ? 'cutters' : 'target';
    active = true;
    canvas.focus?.({ preventScroll: true });
    syncSelection();
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
    if (phase === 'target') {
      targetId = id;
      phase = 'cutters';
      syncSelection();
      selectionStatus();
      return;
    }
    if (id === targetId) {
      onStatus('El sólido objetivo ya está seleccionado · seleccione los cortadores');
      return;
    }
    cutterIds = cutterIds.includes(id)
      ? cutterIds.filter((cutterId) => cutterId !== id)
      : [...cutterIds, id];
    syncSelection();
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

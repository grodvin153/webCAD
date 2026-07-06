/*
 * webCAD - Catalogo de comandos
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const REPEATABLE_COMMANDS = new Set([
  'line',
  'tangent-line',
  'polyline',
  'rectangle',
  'text',
  'hatch',
  'circle-center',
  'circle-3p',
  'arc-center-radius',
  'arc-3p',
  'arc-center-start-end',
  'dimension-horizontal',
  'dimension-vertical',
  'dimension-aligned',
  'dimension-angular',
  'dimension-radius',
  'dimension-diameter',
  'block-insert',
  'copy',
  'move',
  'rotate',
  'scale',
  'mirror',
  'trim',
  'extend',
  'fillet',
  'chamfer',
  'erase',
  'explode',
]);

export function commandLabel(command) {
  const labels = {
    line: 'Linea',
    'tangent-line': 'Linea tangente',
    polyline: 'Polilinea',
    rectangle: 'Rectangulo',
    text: 'Texto',
    hatch: 'Sombreado',
    'circle-center': 'Circulo centro-radio',
    'circle-3p': 'Circulo 3 puntos',
    'arc-center-radius': 'Arco centro-radio',
    'arc-3p': 'Arco 3 puntos',
    'arc-center-start-end': 'Arco centro-inicio-final',
    'block-create': 'Crear bloque',
    'block-insert': 'Insertar bloque',
    'dimension-horizontal': 'Cota horizontal',
    'dimension-vertical': 'Cota vertical',
    'dimension-aligned': 'Cota alineada',
    'dimension-angular': 'Cota angular',
    'dimension-radius': 'Cota de radio',
    'dimension-diameter': 'Cota de diametro',
    copy: 'Copiar',
    move: 'Desplazar',
    rotate: 'Girar',
    scale: 'Escala',
    mirror: 'Simetria',
    'select-set': 'Seleccionar conjunto',
    trim: 'Recortar',
    extend: 'Alargar',
    fillet: 'Empalme',
    chamfer: 'Chaflan',
    erase: 'Borrar',
    explode: 'Descomponer',
  };
  return labels[command] || 'Comando';
}

# Historial de cambios

## 0.5.1 - 2026-07-08

- Corregida la dependencia de cálculo de distancia perdida al extraer el estado visual del controlador.
- Restaurada la creación de líneas por puntos y su encadenamiento continuo.
- Añadida una regresión específica para el estado dinámico del primer punto de línea.

## 0.5.0 - 2026-07-08

### Arquitectura

- Modularización progresiva de entidades, operaciones, cotas, sombreados, bloques, documento, renderizador y controladores.
- Extracción final de diálogos, arranque, eventos, controles y acciones documentales.
- Reducción de `source/main.js` a un punto de composición de aproximadamente 2.200 líneas.
- Separación de importación y exportación DXF para facilitar futuros formatos CAD.

### Modelo y compatibilidad

- Coordenadas normalizadas como X, Y y Z sin alterar el comportamiento 2D existente.
- Conservación de elevaciones Z en entidades, transformaciones, intersecciones y DXF.
- Compatibilidad global mantenida para los accesos, menús y eventos existentes.

### Calidad

- Nueva batería de regresión para entrada matemática, XYZ, transformaciones, intersecciones, selección, recorte, historial, DXF y despacho de órdenes.
- Comando único de verificación mediante `npm run verify`.
- Documentación de desarrollo y mapa de módulos.

## 0.4.0

- Empalmes entre entidades, mejoras de cotas y sombreados DXF.
- Nivel de detalle adaptativo para planos grandes.
- Preferencias persistentes y ejes CAD diferenciados.

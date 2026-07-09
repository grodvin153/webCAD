# webCAD

Editor CAD 2D para navegador, orientado a dibujo técnico de ingeniería y arquitectura. Incluye entidades CAD, capas, snaps, cotas, bloques, modificaciones, imágenes calibrables e importación/exportación DXF.

## Desarrollo

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

Verificación completa antes de publicar:

```bash
npm run verify
```

## Arquitectura

`source/main.js` es el punto de composición. La lógica se organiza en módulos especializados:

- `source/app/`: arranque, cableado, diálogos y acciones globales.
- `source/controller/`: ratón, teclado, selección y órdenes.
- `source/document/`: documento CAD, historial y estado documental.
- `source/entities/`: entidades geométricas.
- `source/operations/`: operaciones de modificación.
- `source/dimensions/`, `source/hatches/`, `source/blocks/`: dominios CAD específicos.
- `source/renderer/`: entidades, previews y overlays.
- `source/files/formats/`: registro de formatos e importación/exportación DXF.
- `source/input/`, `source/coordinates/`, `source/intersections.js`: entrada, XYZ, snaps e intersecciones.

La visualización continúa siendo 2D sobre XY, pero los puntos conservan coordenada Z para ampliar el modelo en el futuro y mantener elevaciones DXF.

## Versión

Versión estable actual: **0.6.0**.

## Autoría y licencia

Copyright (C) 2026 Gonzalo Rodriguez.

webCAD se distribuye bajo GNU GPL v3 o posterior. Consulte `LICENSE` y `NOTICE`.

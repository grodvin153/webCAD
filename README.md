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
- `source/3d/`: croquis, geometría exacta, sólidos, extrusiones y serialización 3D.
- `source/3d/three/`: visor interactivo, selección, push y booleanas con Manifold.

El editor 2D continúa trabajando sobre XY y conserva la coordenada Z. El modo
3D experimental añade croquis en planos principales o caras, extrusión de
perfiles, edición de sólidos y guardado del modelo en proyectos `.webcad`.

## Versión

Versión estable actual: **0.8.0**.

## Autoría y licencia

Copyright (C) 2026 Gonzalo Rodriguez.

webCAD se distribuye bajo GNU GPL v3 o posterior. Consulte `LICENSE` y `NOTICE`.

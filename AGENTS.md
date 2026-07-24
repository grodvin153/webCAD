# AGENTS.md

## Alcance

Estas instrucciones se aplican a todo el repositorio. No hay otros `AGENTS.md`
anidados en este momento.

## Qué es webCAD

webCAD es un editor CAD que se ejecuta íntegramente en el navegador. La
aplicación estable sigue siendo un editor 2D sobre Canvas, pero todos los puntos
del modelo conservan `x`, `y` y `z`, y existe un flujo 3D experimental basado en
Three.js y `manifold-3d`.

Funciones principales:

- dibujo y edición de líneas, líneas infinitas, polilíneas, círculos, arcos,
  elipses, texto, sombreados, cotas, imágenes y bloques;
- capas, estilos, tipos y colores de línea;
- snaps, rejilla, ortogonal, selección, pinzamientos e historial;
- transformaciones y operaciones CAD (copiar, mover, girar, escala, simetría,
  matriz polar, estirar, recortar, alargar, empalme, chaflán y equidistancia);
- importación/exportación DXF, proyectos `.webcad`, PNG, STL y guardado local;
- croquis en planos principales, extrusión/push, sólidos y visualización 3D.

La interfaz, los mensajes y la documentación del producto están en español. El
código usa nombres en inglés. La licencia es GPL-3.0-or-later.

## Estado y restricciones del proyecto

- JavaScript moderno con módulos ESM; no hay TypeScript.
- No se usa ningún framework de interfaz: DOM, Canvas 2D y WebGL directamente.
- Vite sirve y empaqueta la aplicación.
- Dependencias de ejecución: `three` y `manifold-3d`.
- No hay ESLint, Prettier, typecheck ni runner de pruebas externo configurados.
- Las pruebas usan `node:assert/strict` y se ejecutan como scripts ESM.
- `source/main.js` todavía es un composition root grande. La dirección
  arquitectónica es extraer comportamiento a módulos, no devolverlo a
  `main.js`.
- El modo 3D es experimental y está deliberadamente separado del arranque 2D.
- `docs/` es la salida de producción generada por Vite, aunque está versionada
  para publicación estática. No se edita a mano.

## Puesta en marcha

Se requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

El servidor de Vite usa `source/` como raíz. También existe
`abrir_webcad.command` para macOS: busca un puerto libre entre 5173 y 5180,
arranca Vite y abre el navegador.

Comandos disponibles:

```bash
npm run dev       # servidor de desarrollo
npm test          # regresiones 2D/compartidas y base 3D
npm run build     # genera docs/
npm run preview   # sirve el build de producción
npm run verify    # npm test && npm run build
```

Antes de entregar cambios de código, ejecutar como mínimo la prueba afectada y,
preferentemente, `npm run verify`.

## Mapa del repositorio

### Raíz

- `package.json`: dependencias y comandos oficiales.
- `vite.config.js`: raíz `source/`, base relativa `./` y salida en `docs/`.
- `README.md`: introducción pública y comandos de desarrollo.
- `CHANGELOG.md`: cambios publicados.
- `source/version.js`: versión mostrada por la aplicación.
- `LICENSE` y `NOTICE`: licencia y atribución; no eliminarlos.
- `abrir_webcad.command`: lanzador local para macOS.
- `tests/regression.mjs`: regresiones del núcleo 2D y de contratos compartidos.
- `tests/3d.mjs`: geometría, documentos, renderización auxiliar y flujo 3D.
- `docs/`: build generado para distribución/publicación.
- `samples/`: archivos de ejemplo para pruebas manuales cuando existan.
- `scratch/`: experimentos locales; no es código de producción.

Los DXF grandes o archivos de ejemplo que aparezcan en la raíz pueden ser datos
locales no versionados. No los edites, borres ni añadas al control de versiones
salvo petición expresa.

### `source/`

- `index.html`: estructura completa de la interfaz, menús, botones, canvases y
  diálogos. Carga `main.js` y `3d/three/three-mode-toggle.js` como módulos
  independientes.
- `styles.css`: todos los estilos 2D/3D y de la interfaz.
- `main.js`: composition root. Crea entidades, documento, estado, renderer,
  controller, comandos, servicios y cableado final.
- `config.js`: escalas, umbrales, índice espacial, historial y perfiles de
  dibujo.
- `geometry.js`, `intersections.js`: primitivas geométricas compartidas.
- `commands.js`: etiquetas, alias y conjunto de comandos repetibles.
- `app/`: arranque, resolución de elementos DOM, despacho de comandos, eventos,
  acciones documentales y controles de ejecución.
- `document/`: estado mutable de sesión y modelo documental con historial,
  selección, bloques, croquis, sólidos e índice espacial.
- `entities/`: clases de entidades 2D básicas.
- `coordinates/`: normalización de puntos 3D compatibles con el motor 2D.
- `input/`: expresiones numéricas, coordenadas, restricciones, snaps e
  inferencias.
- `selection/`: hit testing, ventanas, intersecciones y movimiento de
  pinzamientos.
- `renderer/`: trazado de entidades, escenas, previews y overlays Canvas 2D.
- `controller/`: interacción de ratón/teclado, ciclo de comandos y estado.
- `operations/`: recorte, alargamiento, offset, empalme, chaflán, estirar y
  unión de polilíneas.
- `transformations/`: clonado, mover, girar, escala, simetría y matriz polar.
- `tools/`: herramientas de dibujo modulares.
- `dimensions/`, `hatches/`, `blocks/`, `images/`, `ellipse/`: dominios CAD
  especializados.
- `properties/`: capas, perfiles y estilos.
- `ui/`: menús, capas, preferencias, diálogos y viewport.
- `files/`: formatos, File System Access API, fallback de descarga y
  autoguardado.
- `3d/`: matemáticas, planos, croquis, sólidos, extrusiones, serialización, STL
  y visor alámbrico independiente.
- `3d/three/`: integración Three.js, visor interactivo, selección de caras y
  aristas, push, siluetas, conversión de geometría y booleanas Manifold.

## Arquitectura de ejecución

### Arranque 2D

`source/main.js`:

1. obtiene todos los nodos mediante `createDomElements(document)`;
2. crea servicios y clases de entidad mediante fábricas con dependencias
   explícitas;
3. construye `CadDocument`, `state`, `CadRenderer` y `CadController`;
4. amplía los prototipos de renderer/controller con los objetos devueltos por
   `create*Methods(...)`;
5. crea comandos especializados y les inyecta callbacks mínimos;
6. registra los formatos `dxf`, `webcad` y `stl`;
7. conecta eventos, inputs de archivo y controles;
8. llama a `initializeApplication`.

Evita importaciones circulares y singletons nuevos. Para lógica nueva, prefiere
una función pura o una fábrica en el módulo de dominio y conecta sus
dependencias en `main.js`.

### Documento, estado e historial

`createDocumentState()` crea el estado transitorio de interfaz: herramienta
activa, drafts de comandos, preferencias, cursor, vista y mensajes. El estado no
es la fuente de verdad de las entidades.

`CadDocument` es la fuente de verdad documental:

- `entities` contiene el documento activo;
- `rootEntities` conserva el nivel superior al editar un bloque o croquis;
- `blockDefinitions` es un `Map` por nombre normalizado;
- `model3d` contiene croquis y sólidos documentales;
- `selectedEntities` es un `Set`;
- `undoStack`/`redoStack` guardan snapshots;
- `revision` controla cambios y guardado;
- bounds e índice espacial se invalidan en `markDirty()`.

Reglas al mutar el documento:

- registra historial **antes** de la primera mutación de una operación lógica;
- una operación compuesta debe producir un único paso de undo, no uno por
  entidad;
- usa los métodos `addEntity`, `addEntities`, `replaceEntity`,
  `replaceEntities`, `removeEntities`, `add3dSolid`, `replace3dSolid`, etc.;
- si una ruta excepcional muta estructuras directamente, debe mantener
  selección, historial, revisión y cachés de bounds/índice espacial;
- al editar documentos anidados respeta `rootEntities`, `editingBlockName`,
  `editingSketchId` y `editHistoryFloor`;
- los snapshots deben ser clones serializables, no referencias vivas.

### Renderer y controller

`CadRenderer` mantiene transformaciones mundo/pantalla y dibuja, en orden,
rejilla/ejes, referencias, entidades, previews, guías, selección y snaps. Los
métodos especializados se añaden con `Object.assign` desde `renderer/`.

`CadController` posee los listeners de pointer, wheel y teclado. Los módulos de
`controller/` devuelven métodos que se ejecutan con `this` enlazado a la
instancia. Si se añade una dependencia a uno de esos métodos, debe inyectarse
desde el bloque `Object.assign` de `main.js`.

Después de una interacción que cambie estado visible, el patrón habitual es:

```js
controller.updateUiStatus();
renderer.draw();
```

### Modo 3D

`index.html` carga `three-mode-toggle.js` aparte de `main.js`. El visor pesado
`three-demo-viewer.js` se importa dinámicamente al entrar en 3D. Su creación
inicializa también el WASM de `manifold-3d`.

La integración actual usa dos puentes globales intencionados:

- `window.webcadDebug`: expone documento, estado, renderer/controller y helpers
  necesarios para el modo 3D y depuración;
- `window.webcadThreeMode`: expone entrada/salida, refresco y acciones 3D al
  núcleo 2D.

No amplíes estos globals sin necesidad. Mantén la carga 3D perezosa y evita que
un fallo WebGL/WASM rompa el editor 2D.

El modelo 3D documental (`source/3d/model3d.js`) no debe almacenar objetos
Three.js. Guarda datos JSON:

- puntos numéricos;
- `faces` y `edges` como índices;
- metadata clonable;
- registros versionados de croquis/sólidos y sus operaciones.

Las referencias runtime como `sourceEntity`, `sourceSolid` o grupos Three.js se
excluyen explícitamente al clonar. Conserva esa separación.

### Geometría analítica y teselación

La geometría analítica es la autoridad semántica de toda geometría visible. Una
línea, arco, círculo, elipse o arco elíptico conocido debe seguir siendo esa
misma primitiva después de extrusiones, divisiones de caras, push, booleanas,
guardado y reapertura.

La teselación tiene únicamente dos usos permitidos:

- generar triángulos runtime para que WebGL rasterice las superficies;
- producir la malla final de una exportación STL.

Los triángulos, diagonales, costuras entre facetas y generatrices de muestreo no
son aristas CAD y nunca deben convertirse en fuente de verdad para:

- aristas visibles u ocultas del visor;
- selección, medición, snaps o resaltado;
- siluetas y generatrices de superficies curvas;
- proyección o sección de croquis;
- contornos de caras o perfiles extruibles;
- persistencia documental o reconstrucción tras abrir un proyecto.

`exactGeometry`, los perfiles exactos y las operaciones analíticas persistidas
son la fuente primaria. La topología de malla solo puede usarse para recortar o
confirmar qué parte de una curva analítica sobrevive a una operación. El visor
debe reconstruir primero aristas analíticas y muestrearlas después para
Three.js; no debe publicar directamente `solid.faces` o `solid.edges` cuando
esos arrays representan una teselación.

`source/3d/analytic-edges.js` centraliza la topología analítica runtime mediante
`deriveSolidAnalyticTopology`. Visor, booleanas y selección de caras deben
consumir sus superficies laterales, aristas límite, costuras internas y caras
planas semánticas; no dupliques clasificadores geométricos con tolerancias
distintas en cada consumidor. Las tolerancias deben escalar con el tamaño del
sólido y de la curva exacta.

Una tapa plana teselada sigue siendo una única cara CAD. Todos sus triángulos
seleccionables deben resolver a una sola identidad semántica y al contorno
exacto del perfil, incluidos huecos. No persistas estos grupos runtime: deben
reconstruirse desde `exactGeometry` al cargar el documento.

Cuando una booleana cree una curva nueva que no pueda expresarse todavía con
las primitivas soportadas, no la etiquetes silenciosamente como geometría
analítica ni expongas sus costuras internas. Conserva un estado explícito de
geometría pendiente/no disponible y añade el soporte geométrico antes de usar
esa curva como contrato CAD.

Toda funcionalidad 3D nueva o modificada debe incluir regresiones que
demuestren, según corresponda:

- que las curvas conocidas conservan tipo, centro, radios, parámetros y
  sentido;
- que las cadenas facetadas quedan consolidadas bajo una única identidad de
  curva para selección y medición;
- que las aristas internas de triangulación no aparecen en el visor;
- que las siluetas curvas proceden de tangencias analíticas;
- que guardar y volver a abrir no degrada la representación.

### Referencias al editar croquis

Al editar un croquis desde el modo 3D se generan referencias 2D de la geometría
del modelo. Hay dos modos con contratos distintos:

- `projection` proyecta deliberadamente todas las aristas visibles del modelo
  sobre el plano del croquis;
- `section` representa únicamente la intersección o el contorno de apoyo en el
  plano del croquis.

Para un croquis asociado a una cara plana, `section` debe usar primero el
contorno consolidado de `metadata.supportFace`. No debe recorrer directamente
todas las `solid.edges` coplanares: la malla y los resultados booleanos pueden
contener diagonales, costuras de triangulación y otras aristas internas que no
son geometría real. Si el croquis no tiene cara de apoyo, usa
`sectionModel3dToSketch` como fallback.

`supportFace` puede contener:

- `sourceSolidId`;
- `sourceFaceIndices`;
- `outerLoop`;
- `innerLoops`;
- `boundaries`, cuando se conoce o puede reconstruirse la geometría analítica.

`outerLoop` e `innerLoops` son muestras de puntos y se conservan por
compatibilidad. `boundaries` es la representación preferida para editar y puede
incluir `line`, `circle`, `arc`, `ellipse` y `ellipse-arc`. Los documentos
antiguos pueden no tener `boundaries`; enriquécelos dinámicamente desde los
metadatos exactos del sólido de origen al abrir el croquis, sin exigir una
migración ni volver a guardar el archivo.

El round trip `.webcad` debe conservar `boundaries` cuando ya existen. El
enriquecimiento dinámico de un documento antiguo no debe mutar su
`supportFace`, forzar una migración ni degradar un círculo completo a una lista
de líneas.

Las curvas conocidas no deben degradarse a polilíneas. Una cadena facetada que
pertenezca a una curva exacta debe reconstruirse como entidad CAD:

- un tramo circular parcial se convierte en `ARC`;
- un tramo elíptico parcial se convierte en `ELLIPSE_ARC`;
- los círculos y elipses completos permanecen como entidades completas.

La reconstrucción debe preservar centro, radios, rotación, parámetros o ángulos
inicial y final, y sentido horario. Separa cualquier cuerda recta de cierre de
la cadena curva: esa cuerda sigue siendo una línea y no forma parte del arco.
Al rotar los ejes del croquis transforma también los puntos y centros de los
contornos, actualiza los ángulos de arcos circulares y la rotación de elipses.

## Contratos de datos importantes

### Coordenadas

- Todo punto persistente debe normalizarse con `point3()` y tener
  `{ x, y, z }`; `z` vale `0` cuando falta.
- El editor 2D dibuja sobre XY y conserva Z sin proyectarlo.
- Las coordenadas internas siguen la orientación de Canvas: Y crece hacia
  abajo.
- DXF usa Y en sentido opuesto. El importador niega Y y el exportador debe
  invertirla de nuevo.
- Las funciones que interpolan o transforman geometría deben conservar o
  interpolar Z cuando corresponda.
- No sustituyas tolerancias geométricas por igualdad exacta. Usa
  `SNAP_THRESHOLD` o una tolerancia local justificada.
- Los ángulos internos están normalmente en radianes; las entradas de usuario y
  varias operaciones públicas usan grados. Comprueba el contrato de cada
  función antes de convertir.

### Entidades 2D

Las entidades se discriminan con `entity.type` (`LINE`, `XLINE`, `POLYLINE`,
`CIRCLE`, `ARC`, `ELLIPSE`, `ELLIPSE_ARC`, `TEXT`, `HATCH`, `IMAGE`,
`DIMENSION`, `INSERT`, etc.). En general deben:

- normalizar sus puntos;
- implementar `bounds()` y, cuando tenga sentido, `length()`;
- conservar `layer`, `lineStyle`, `lineType`, `lineColor` y `groupId`;
- poder clonarse y serializarse mediante la infraestructura existente.

Añadir o modificar un tipo puede afectar simultáneamente a:

- clonación y transformaciones;
- bounds e índice espacial;
- hit testing, ventanas, snaps, intersecciones y grips;
- render normal, selección y previews;
- bloques y explosión;
- importador/exportador DXF;
- snapshots `.webcad`;
- adaptación/visibilidad 3D;
- las dos baterías de pruebas.

### Proyecto `.webcad`

`source/files/formats/webcad-project.js` define el formato
`webcad-project`, versión 1. Contiene:

- snapshot y ajustes 2D;
- contadores de ids;
- modelo 3D serializado.

No cambies silenciosamente la forma persistida. Si una modificación deja de ser
compatible, incrementa la versión, valida el nuevo esquema y añade migración o
un error explícito. Prueba round trips JSON y proyectos antiguos relevantes.

### DXF y STL

- DXF es el principal formato interoperable 2D. Mantén importación y exportación
  simétricas siempre que el formato lo permita.
- La lectura detecta archivos Windows-1252 mediante `$DWGCODEPAGE`; no fuerces
  siempre UTF-8.
- Las imágenes DXF pueden llevar datos embebidos.
- STL exporta únicamente sólidos 3D visibles y es una malla sin unidades,
  curvas exactas, capas ni historial de operaciones.

## Cómo implementar cambios frecuentes

### Nueva herramienta u orden

1. Coloca geometría pura y aplicación del cambio fuera del controller.
2. Modela el flujo interactivo con un draft propio en `document/state.js`.
3. Crea una fábrica de comando o métodos de controller con dependencias
   explícitas.
4. Conecta la orden en `app/command-dispatcher.js`.
5. Añade botón/menú con `data-command` o id en `index.html`.
6. Declara el nodo en `app/dom-elements.js` y enlaza eventos en
   `app/event-wiring.js`.
7. Añade preview y texto de estado/cancelación cuando corresponda.
8. Protege historia, selección, repetición y atajos con pruebas.

No implementes rutas divergentes para botón, menú y atajo: todos deben acabar
en el mismo comando.

### Nueva entidad o capacidad geométrica

Empieza por una representación y geometría puras. Después cubre, según aplique:
entidad, clonación, transforms, bounds, intersecciones, selección, snaps, grips,
renderer, operaciones, DXF, bloques, 3D y pruebas. No añadas únicamente el
trazado visual.

### Cambio de interfaz

- Actualiza juntos `source/index.html`, `source/app/dom-elements.js`, el módulo
  que enlaza el evento y `source/styles.css`.
- Los ids consultados por `createDomElements` son contratos: un id ausente rompe
  el arranque.
- Conserva `aria-label`, `aria-pressed`, `aria-expanded`, foco de canvas y
  navegación por teclado.
- Los controles modales deben poder cancelar sin mutar el documento.
- No edites `docs/index.html` ni CSS/JS con hash; se regeneran con el build.

### Cambio 3D

- Mantén separadas geometría exacta/documental, malla renderizable y objetos
  Three.js.
- Haz que visor, selección, snaps, proyección y secciones consuman la misma
  reconstrucción central de aristas analíticas; no implementes filtros de
  triangulación independientes para cada consumidor.
- Muestrea una curva analítica solo en el último paso de renderizado o
  exportación STL y conserva una identidad común para todos sus segmentos
  renderizados.
- No expongas aristas internas de triangulación como geometría de una sección
  de croquis.
- Conserva las curvas analíticas como `ARC`, `ELLIPSE_ARC`, círculo o elipse,
  incluidos sus parámetros.
- Respeta la diferencia semántica entre `projection` y `section`.
- Verifica que los `supportFace` antiguos sin `boundaries` funcionen mediante
  enriquecimiento dinámico.
- Libera geometrías, materiales, grupos y recursos Manifold cuando dejan de
  usarse.
- La selección de cara/arista, siluetas y clipping dependen de la cámara; prueba
  vistas ortogonales y oblicuas.
- Las booleanas pueden fallar por tolerancias/topología: valida sólidos antes y
  después, y conserva fallbacks seguros.
- Prueba extrusión positiva/negativa, caras en XY/XZ/YZ, huecos, perfiles curvos
  y round trip `.webcad`.

## Convenciones de código

- ESM con imports relativos y extensión `.js`.
- Indentación de 2 espacios, comillas simples y punto y coma.
- `const` por defecto; `let` solo para estado reasignado.
- Early returns para casos inválidos o no aplicables.
- Nombres de código en inglés; mensajes de usuario en español.
- Fábricas llamadas `create...`; servicios y dependencias se pasan como
  objetos para que los módulos sean comprobables en Node.
- Prefiere funciones puras para matemáticas y geometría.
- No introduzcas dependencias nuevas para algo que el navegador o el código
  actual resuelve de forma sencilla.
- Conserva en archivos fuente nuevos/modificados el encabezado SPDX usado por
  el repositorio:

```js
/* webCAD - Descripción | SPDX-License-Identifier: GPL-3.0-or-later */
```

- Evita reformatear archivos enteros o mezclar refactors no relacionados.
- No dejes `console.log` de depuración en producción. `console.warn/error` son
  aceptables para fallos recuperables con contexto.
- No uses APIs del DOM en módulos geométricos puros.
- Si una función depende del navegador, diseña su dependencia para poder
  sustituirla en pruebas.

## Pruebas y validación

### Suites actuales

`tests/regression.mjs` cubre, entre otros:

- expresiones y coordenadas XYZ;
- entidades, geometría, transformaciones, selección e intersecciones;
- elipses, recorte, sombreados, polilíneas y comandos;
- historial y documento;
- round trips DXF y `.webcad`;
- despacho, atajos, estado y pinzamientos;
- exportación STL compartida.

`tests/3d.mjs` cubre:

- matemáticas, cámara, planos de croquis y proyecciones;
- sólidos, perfiles y extrusiones exactas;
- conversión a Three.js, caras, aristas, siluetas y snaps;
- modelo documental 3D y serialización;
- referencias al editar croquis: `supportFace`, secciones sin costuras de
  triangulación y fallback sin cara de apoyo;
- reconstrucción de arcos circulares y elípticos parciales como entidades
  analíticas;
- extrusiones circulares oblicuas a escala real: dos contornos analíticos
  cerrados, ninguna generatriz de teselación visible y una sola identidad para
  todos los triángulos de la tapa;
- round trip de croquis apoyados con `boundaries` circulares y enriquecimiento
  no destructivo de snapshots antiguos;
- snapshots antiguos de `supportFace` sin `boundaries`;
- push y booleanas con Manifold.

Las pruebas no usan `describe`/`it`: añade funciones/asserts cerca del dominio
correspondiente, invócalos al final si procede y conserva el mensaje final de
éxito. Los tests deben ser deterministas y no depender de un servidor o de una
sesión real del navegador.

### Matriz mínima según el cambio

- Geometría/entidad/comando 2D: `node tests/regression.mjs`.
- Modelo, geometría o visor 3D: `node tests/3d.mjs`.
- Referencias de croquis, secciones o curvas exactas: `node tests/3d.mjs` y
  revisión manual del sample afectado.
- Persistencia, coordenadas, DXF o código compartido: ambas suites.
- DOM/CSS/interacción: ambas suites, build y prueba manual en `npm run dev`.
- Dependencias, imports dinámicos, WASM o empaquetado: `npm run verify` y
  `npm run preview`.

Para una prueba manual de interfaz, comprobar al menos:

- que la aplicación arranca sin errores en consola;
- crear, seleccionar, modificar, deshacer y rehacer una entidad afectada;
- cancelar el comando a mitad de flujo;
- zoom/pan y entrada por teclado;
- guardar/abrir o importar/exportar si cambió persistencia;
- alternar 2D/3D si el cambio toca documento o geometría compartida;
- al editar un croquis apoyado, comparar `projection` y `section`;
- comprobar que la sección no muestra diagonales ni costuras de triangulación;
- comprobar que los arcos circulares y elípticos parciales son entidades reales
  y no cadenas de líneas.

## Build, archivos generados y publicación

`npm run build` vacía y regenera `docs/`. Los nombres de assets llevan hash y
pueden cambiar aunque la modificación fuente sea pequeña. Reglas:

- modifica siempre `source/`, nunca el bundle;
- no intentes conservar nombres hash antiguos;
- no mezcles por accidente un build parcial con fuentes nuevas;
- incluye cambios de `docs/` únicamente cuando el alcance incluya actualizar el
  artefacto publicado;
- para validar sin intención de publicar, revisa el estado de Git después del
  build y no sobrescribas cambios preexistentes del usuario.

`.vite-cache/`, `node_modules/`, `.DS_Store`, temporales `~`, capturas y
experimentos de `scratch/` no deben añadirse.

## Versionado

Cuando se prepare una versión pública, sincroniza como mínimo:

- `package.json` y `package-lock.json`;
- `source/version.js`;
- versión y novedades visibles en `source/index.html`;
- `README.md` si muestra la versión estable;
- `CHANGELOG.md`;
- build final de `docs/`.

No cambies versión ni changelog para una corrección ordinaria salvo que se pida
preparar una publicación.

## Reglas de trabajo para agentes

- Lee `git status` antes y después: el repositorio puede contener trabajo local
  importante.
- Trata todos los cambios preexistentes y archivos no versionados como propiedad
  del usuario.
- No restaures, borres, muevas ni formatees cambios ajenos.
- Mantén el parche limitado al objetivo solicitado.
- Busca usos de un contrato antes de cambiarlo; en este proyecto una entidad o
  comando suele atravesar muchos módulos.
- No afirmes que algo funciona solo porque compila: ejecuta las pruebas
  proporcionales al cambio.
- Documenta cualquier validación que no haya podido ejecutarse.
- Si el build modifica `docs/` fuera del alcance, no lo incluyas en el parche.

## Checklist antes de entregar

- [ ] El cambio vive en el módulo de dominio correcto y `main.js` solo lo
      compone.
- [ ] Las coordenadas conservan Z y respetan la inversión Y de DXF.
- [ ] Historial, selección, revisión y cachés siguen coherentes.
- [ ] Un tipo de entidad nuevo está cubierto en todos los consumidores
      relevantes.
- [ ] Los cambios DOM incluyen resolución, eventos, estilos y accesibilidad.
- [ ] La persistencia sigue siendo compatible o está versionada/migrada.
- [ ] Las rutas 2D no dependen obligatoriamente de WebGL/WASM.
- [ ] Las secciones apoyadas usan `supportFace`, no las aristas internas de la
      malla.
- [ ] Los tramos circulares y elípticos conservan entidades y parámetros
      analíticos.
- [ ] Los `supportFace` antiguos sin `boundaries` se enriquecen sin migración
      obligatoria.
- [ ] Hay una regresión que falla sin el cambio.
- [ ] Se ejecutó la matriz de pruebas apropiada.
- [ ] `docs/` y archivos locales no se editaron o incluyeron accidentalmente.
- [ ] `git diff` contiene solo cambios intencionados.

# Historial de cambios

## 0.9.0 - 2026-08-02

### Modelado y operaciones 3D

- Añadidas herramientas interactivas para unir sólidos, restar uno o varios cortadores y dividir un sólido mediante un plano definido por tres puntos.
- Incorporada la consolidación automática de extrusiones aditivas conectadas para obtener componentes materiales coherentes y editables.
- Renovado Push con arrastre y previsualización en tiempo real, entrada numérica junto al cursor, snaps 3D, diagnósticos de fallo y protección frente a espesores o contactos degenerados.
- Reforzadas las booleanas Manifold, la reconstrucción de regiones analíticas, las secciones por plano y los snaps sobre sólidos resultantes.

### Persistencia paramétrica

- Introducido el modelo 3D compacto versión 2: guarda extrusiones exactas, operaciones ordenadas, colocaciones y procedencia estable, y reconstruye la geometría runtime al abrir.
- Eliminada del archivo `.webcad` la persistencia de mallas, triángulos, aristas visuales e índices derivados para evitar degradación y referencias inestables.
- Añadido replay determinista para Push, uniones, restas, cortes y transformaciones, incluido soporte para undo/redo y reapertura editable.
- Los modelos 3D experimentales versión 1 que dependían de malla se rechazan de forma explícita y segura, sin sobrescribir el archivo original.

### Interfaz y flujo de trabajo

- Unificada la barra lateral y sus menús para mostrar las herramientas adecuadas en los modos 2D, 3D y edición de croquis, cancelando correctamente la interacción al cambiar de modo.
- Añadidos estados activos accesibles para selección, herramientas 3D, proyección y aristas ocultas.
- Incorporado pegado directo de imágenes PNG, JPEG y WebP desde el portapapeles, con normalización a PNG e historial documental.
- Ampliadas las regresiones de persistencia compacta, replay, consolidación aditiva, corte por plano, unión, resta, Push e interfaz por modos.

## 0.8.0 - 2026-07-29

### Edición y reconstrucción 3D

- Añadidas líneas espaciales con snaps sobre sólidos, intersecciones y apoyo en caras analíticas.
- Incorporadas copia, desplazamiento y giro de sólidos completos mediante colocaciones documentales, conservadas al guardar y exportar STL.
- Reforzada la reconstrucción posterior a booleanas para consolidar caras coplanarias, recuperar perímetros CAD y eliminar residuos o costuras internas.
- Añadida la reconstrucción manual del modelo con tolerancia configurable y un único paso de historial.

### Geometría analítica

- Consolidadas caras semánticas y regiones residuales para mantener identidad, selección y continuidad después de operaciones Push.
- Recuperadas aristas circulares parciales y completas sin publicar pequeñas generatrices facetadas como aristas CAD.
- Añadidos snaps de centro y cuadrante sobre curvas analíticas de caras, con soporte para sólidos colocados.
- Endurecidos los límites de espesor y las auditorías de topología antes y después de operaciones booleanas.

### Archivos y calidad

- Centralizado el selector de destino de guardado para solicitar nombre y carpeta mediante la capacidad disponible del navegador.
- Añadidas regresiones portables para reconstrucción, caras coplanarias, booleanas curvas, colocaciones, herramientas 3D y guardado local.

## 0.7.0 - 2026-07-24

### Modelado 3D

- Incorporados croquis documentales en planos XY, XZ, YZ y caras planas, con edición, visibilidad, renombrado, borrado y giro de ejes.
- Añadidas extrusiones y operaciones push sobre perfiles y caras, incluidas uniones y sustracciones robustas mediante `manifold-3d`.
- Añadidas selección de caras y aristas, resaltado, snaps de sólidos, siluetas analíticas y controles de visualización 3D.
- Incorporada persistencia completa del modelo 3D y de sus operaciones en proyectos `.webcad`, manteniendo compatibilidad con documentos anteriores.

### Geometría exacta

- Separada la geometría analítica de la teselación de renderizado para círculos, arcos y elipses.
- Consolidadas las curvas extruidas bajo identidades CAD únicas, eliminando costuras, diagonales y generatrices internas del visor.
- Unificada la selección de tapas teseladas como caras semánticas completas aptas para apoyar nuevos croquis.
- Conservadas las fronteras circulares y elípticas al editar croquis, guardar y volver a abrir el proyecto.

### Calidad e interfaz

- Ampliada la interfaz 3D con creación y gestión de croquis, modos de referencia por proyección o sección y acciones de sólidos.
- Añadidas regresiones para booleanas, perfiles curvos, selección semántica, referencias analíticas, archivos antiguos y round trips `.webcad`.
- Actualizada la documentación técnica de agentes con los contratos de topología analítica, selección de caras y persistencia.

## 0.6.0 - 2026-07-09

- Añadida base experimental 3D aislada con Three.js, alternancia visual 2D/3D y estilo de referencia tipo SK.
- Incorporadas utilidades 3D, sólidos, extrusión de perfiles, adaptador de polilíneas, visor alámbrico y pruebas.
- Corregido el fallo general de pinzamientos 2D al iniciar el arrastre en líneas, círculos, arcos y otras entidades.
- Añadidas regresiones para proteger el arranque de arrastre de pinzamientos y la base 3D.

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

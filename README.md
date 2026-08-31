# Ferretería Naranjal

Web estática de ferretería: catálogo de artículos, servicios de instalación y mantenimiento, horario, galería con fotos Creative Commons y panel de administración local.

Publicada en GitHub Pages:

https://javidei.github.io/Ferreteria/

## Versión actual

**0.1.0 — 31/08/2026**

La versión visible está en el pie de cada página y en [`version.json`](version.json). El historial va en [`CHANGELOG.md`](CHANGELOG.md).

## Criterio de versionado

Semántico `MAJOR.MINOR.PATCH` en serie `0.x.x` mientras el estilo no esté unificado:

- `MAJOR`: cambio incompatible o etapa estable.
- `MINOR`: páginas nuevas, catálogo o unificación de estilo.
- `PATCH`: textos, horarios, correcciones.

## Páginas

| Ruta | Contenido | Propuesta visual |
| --- | --- | --- |
| `/` | Inicio | Industrial |
| `/catalogo.html` | Artículos | Almacén |
| `/servicios.html` | Aires, piscinas, toldos y oficios | Técnico |
| `/horario.html` | Horario y festivos | Barrio |
| `/mantenimiento.html` | Galería CC, sin base de datos | Taller |
| `/estilos.html` | Comparador de fuentes, colores y botones | Laboratorio |
| `/admin/` | CRUD del catálogo en el navegador | Consola |

Cada pantalla usa una tipografía, paleta y forma de botón distintas a propósito. Cuando se elija una, se unifican las demás.

## Catálogo sin base de datos

- Semilla en `data/productos.json`.
- Administración guarda cambios en `localStorage` de ese navegador.
- El catálogo público lee primero lo guardado y, si no hay nada, la semilla.
- Se puede exportar JSON y restaurar la semilla. Nada se sincroniza entre dispositivos.

## Créditos

Las fotos de mantenimiento proceden de Wikimedia Commons. Detalle en [`assets/cc/CREDITOS.md`](assets/cc/CREDITOS.md).

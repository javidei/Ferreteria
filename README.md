# Ferretería Naranjal

Web estática de ferretería: catálogo de artículos, servicios de instalación y mantenimiento, horario, galería con fotos Creative Commons y panel de administración local.

Publicada en GitHub Pages:

https://javidei.github.io/Ferreteria/

## Versión actual

**0.2.2 — 31/08/2026**

La versión visible está en el pie de cada página y en [`version.json`](version.json). El historial va en [`CHANGELOG.md`](CHANGELOG.md).

## Criterio de versionado

Semántico `MAJOR.MINOR.PATCH` en serie `0.x.x`:

- `MAJOR`: cambio incompatible o etapa estable.
- `MINOR`: páginas nuevas, catálogo o cambios de identidad.
- `PATCH`: textos, horarios, correcciones.

Identidad visual: fondo papel claro; azul `#042b7c` y naranja `#f84c08` en marca, títulos y botones. Títulos **Pirata One**, texto **VT323** (Google Fonts, SIL OFL). Botones rectos.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/catalogo.html` | Artículos |
| `/servicios.html` | Aires, piscinas, toldos y oficios |
| `/horario.html` | Horario y festivos |
| `/mantenimiento.html` | Galería CC, sin base de datos |
| `/estilos.html` | Identidad de marca |
| `/admin/` | CRUD del catálogo en el navegador |

## Catálogo sin base de datos

- Semilla en `data/productos.json`.
- Administración guarda cambios en `localStorage` de ese navegador.
- El catálogo público lee primero lo guardado y, si no hay nada, la semilla.
- Se puede exportar JSON y restaurar la semilla. Nada se sincroniza entre dispositivos.

## Créditos

Las fotos de mantenimiento proceden de Wikimedia Commons. Detalle en [`assets/cc/CREDITOS.md`](assets/cc/CREDITOS.md).

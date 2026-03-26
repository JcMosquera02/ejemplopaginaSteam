# 📋 Guía de Git — ProyectoSteam
## Integrantes: Julián (dueño), José (colaborador), Miguel (colaborador)
## Cada persona tiene exactamente 6 ramas

---

## 📐 Árbol de ramas

```
main
└── dev
    │
    │  ── JULIÁN (6 ramas) ──────────────────────────────────────
    ├── feat/estructura-readme/julian/001
    ├── feat/html-index/julian/002
    ├── feat/html-show/julian/003
    ├── feat/html-favoritos/julian/004
    ├── feat/css-base-nav/julian/005
    └── feat/css-base-botones/julian/006
    │
    │  ── JOSÉ (6 ramas) ────────────────────────────────────────
    ├── feat/js-state/jose/001
    ├── feat/js-service/jose/002
    ├── feat/js-storage/jose/003
    ├── feat/js-persistance/jose/004
    ├── feat/css-inicio-busqueda/jose/005
    └── feat/css-inicio-paginacion/jose/006
    │
    │  ── MIGUEL (6 ramas) ──────────────────────────────────────
    ├── feat/css-detalle/miguel/001
    ├── feat/css-favoritos/miguel/002
    ├── feat/js-ui-grid-esqueleto/miguel/003
    ├── feat/js-ui-paginacion-detalle/miguel/004
    ├── feat/js-app/miguel/005
    └── feat/js-show-favorites-main/miguel/006
```

---

## 🗂️ División de archivos — qué sube cada persona

### 👤 Julián — Estructura, HTMLs y CSS base
| # | Rama | Archivos |
|---|------|----------|
| 1 | `feat/estructura-readme/julian/001` | `README.md`, carpetas `css/`, `js/`, `assets/` |
| 2 | `feat/html-index/julian/002` | `index.html`, `js/main.js` |
| 3 | `feat/html-show/julian/003` | `show.html` |
| 4 | `feat/html-favoritos/julian/004` | `favorites.html` |
| 5 | `feat/css-base-nav/julian/005` | `css/base.css` — sección nav + hamburguesa + contenedor |
| 6 | `feat/css-base-botones/julian/006` | `css/base.css` — sección botones + inputs + etiquetas + vacio + shimmer + pie |

> ℹ️ Julián sube `base.css` en dos ramas: la rama 005 crea el archivo con la primera mitad, la rama 006 agrega el resto con `git add` + nuevo commit.

---

### 👤 José — Capa de datos y CSS de inicio
| # | Rama | Archivos |
|---|------|----------|
| 1 | `feat/js-state/jose/001` | `js/state.js` |
| 2 | `feat/js-service/jose/002` | `js/service.js` |
| 3 | `feat/js-storage/jose/003` | `js/storage.js` |
| 4 | `feat/js-persistance/jose/004` | `js/persistance.js` |
| 5 | `feat/css-inicio-busqueda/jose/005` | `css/inicio.css` — barra búsqueda + historial + info bar + cuadrícula + tarjeta + esqueleto |
| 6 | `feat/css-inicio-paginacion/jose/006` | `css/inicio.css` — sección paginación + puntos + botones nav |

> ℹ️ José sube `inicio.css` en dos ramas igual que Julián con `base.css`.

---

### 👤 Miguel — CSS de páginas secundarias y capa UI/lógica
| # | Rama | Archivos |
|---|------|----------|
| 1 | `feat/css-detalle/miguel/001` | `css/detalle.css` |
| 2 | `feat/css-favoritos/miguel/002` | `css/favoritos.css` |
| 3 | `feat/js-ui-grid-esqueleto/miguel/003` | `js/ui.js` — funciones: `mostrarEsqueleto`, `renderizarCuadricula`, `renderizarCategorias`, `renderizarHistorial`, helpers |
| 4 | `feat/js-ui-paginacion-detalle/miguel/004` | `js/ui.js` — funciones: `renderizarPaginacion`, `renderizarFavoritos`, `mostrarEsqueletoDetalle`, `renderizarDetalle`, `renderizarErrorDetalle` |
| 5 | `feat/js-app/miguel/005` | `js/app.js` |
| 6 | `feat/js-show-favorites-main/miguel/006` | `js/show-main.js`, `js/favorites-main.js` |

> ℹ️ Miguel sube `ui.js` en dos ramas: la 003 crea el archivo con las primeras funciones, la 004 agrega el resto.

---

## ⚙️ PASO 0 — Julián: Crear el repositorio

```bash
# ── En GitHub web ──────────────────────────────────────
# 1. Ir a github.com/new
# 2. Nombre: ProyectoSteam
# 3. Privado o público según prefieran
# 4. Crear repositorio (sin agregar README, lo haremos manual)

# ── En tu máquina ──────────────────────────────────────
cd ProyectoSteam       # entrar a la carpeta del proyecto

git init
git add README.md
git commit -m "chore: inicializar repositorio"

git branch -M main
git remote add origin https://github.com/julian/ProyectoSteam.git
git push -u origin main

# Crear rama dev
git checkout -b dev
git push -u origin dev

# ── En GitHub web ──────────────────────────────────────
# Agregar colaboradores:
# Settings → Collaborators → Add people → escribir usuario de José → Add
# Settings → Collaborators → Add people → escribir usuario de Miguel → Add
```

---

---

# 👤 JULIÁN — 6 ramas

---

### 🌿 feat/estructura-readme/julian/001
**Qué hace:** Crea las carpetas del proyecto y el README.

```bash
# Siempre partir desde dev actualizado
git checkout dev
git pull origin dev

git checkout -b feat/estructura-readme/julian/001

# Crear carpetas vacías con .gitkeep para que Git las rastree
mkdir -p css js assets
touch css/.gitkeep js/.gitkeep assets/.gitkeep

# Copiar el contenido del README al archivo README.md
# (pegar el texto del README del proyecto)

git add README.md css/.gitkeep js/.gitkeep assets/.gitkeep
git commit -m "feat: crear estructura de carpetas y README del proyecto"

git push origin feat/estructura-readme/julian/001
# → Abrir Pull Request en GitHub: esta rama → dev
# → Pedir a José o Miguel que lo revisen y aprueben
# → Hacer merge desde GitHub
```

---

### 🌿 feat/html-index/julian/002
**Qué hace:** Página principal con buscador, filtro de categorías, historial, cuadrícula y paginación.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/html-index/julian/002

# Crear index.html y main.js con su contenido
mkdir -p Paginas && touch Paginas/index.html js/main.js
# (copiar el contenido de cada archivo)

git add Paginas/index.html js/main.js
git commit -m "feat: agregar index.html con buscador, cuadricula y paginacion"

git push origin feat/html-index/julian/002
# → Pull Request → dev
```

---

### 🌿 feat/html-show/julian/003
**Qué hace:** Página de detalle de una serie individual.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/html-show/julian/003

touch Paginas/show.html
# (copiar el contenido)

git add Paginas/show.html
git commit -m "feat: agregar show.html con estructura de detalle de serie"

git push origin feat/html-show/julian/003
# → Pull Request → dev
```

---

### 🌿 feat/html-favoritos/julian/004
**Qué hace:** Página de lista de favoritos con búsqueda interna y ordenamiento.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/html-favoritos/julian/004

touch Paginas/favorites.html
# (copiar el contenido)

git add Paginas/favorites.html
git commit -m "feat: agregar favorites.html con lista de favoritos y ordenamiento"

git push origin feat/html-favoritos/julian/004
# → Pull Request → dev
```

---

### 🌿 feat/css-base-nav/julian/005
**Qué hace:** Primera parte de `base.css` — variables, reset, navegación y menú hamburguesa.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/css-base-nav/julian/005

touch css/base.css
# Copiar SOLO la primera mitad del base.css:
# Desde el inicio hasta el final de la sección ".pagina { ... }"
# (variables, reset, body, nav, nav__logo, nav__boton-menu,
#  nav__menu, nav__enlace, media queries del nav, .pagina)

git add css/base.css
git commit -m "feat: agregar base.css con variables, reset, nav y menu hamburguesa"

git push origin feat/css-base-nav/julian/005
# → Pull Request → dev
```

---

### 🌿 feat/css-base-botones/julian/006
**Qué hace:** Segunda parte de `base.css` — botones, inputs, etiquetas, vació, shimmer y pie de página.

```bash
git checkout dev
git pull origin dev

# IMPORTANTE: partir desde la rama anterior para tener base.css
git checkout feat/css-base-nav/julian/005
git pull origin feat/css-base-nav/julian/005

git checkout -b feat/css-base-botones/julian/006

# Agregar al final de css/base.css:
# Secciones: .btn, .campo/.selector, .etiqueta, .vacio, .shimmer, .pie
# (copiar la segunda mitad del base.css)

git add css/base.css
git commit -m "feat: completar base.css con botones, inputs, shimmer y pie de pagina"

git push origin feat/css-base-botones/julian/006
# → Pull Request → dev
```

---

---

# 👤 JOSÉ — 6 ramas

### Clonar (primera vez)
```bash
git clone https://github.com/julian/ProyectoSteam.git
cd ProyectoSteam

# Configurar nombre y email si no lo tienen
git config user.name "Jose"
git config user.email "jose@email.com"

git checkout dev
git pull origin dev
```

---

### 🌿 feat/js-state/jose/001
**Qué hace:** Gestión del estado en memoria — series, página actual, filtro, búsqueda.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-state/jose/001

touch js/state.js
# (copiar el contenido de state.js)

git add js/state.js
git commit -m "feat: agregar state.js con gestion de estado en memoria de la aplicacion"

git push origin feat/js-state/jose/001
# → Pull Request → dev
```

---

### 🌿 feat/js-service/jose/002
**Qué hace:** Todas las llamadas `fetch` a la API de TVMaze.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-service/jose/002

touch js/service.js
# (copiar el contenido de service.js)

git add js/service.js
git commit -m "feat: agregar service.js con peticiones fetch a la API de TVMaze"

git push origin feat/js-service/jose/002
# → Pull Request → dev
```

---

### 🌿 feat/js-storage/jose/003
**Qué hace:** Lectura y escritura de favoritos, historial y preferencias en `localStorage`.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-storage/jose/003

touch js/storage.js
# (copiar el contenido de storage.js)

git add js/storage.js
git commit -m "feat: agregar storage.js con acceso a localStorage para favoritos e historial"

git push origin feat/js-storage/jose/003
# → Pull Request → dev
```

---

### 🌿 feat/js-persistance/jose/004
**Qué hace:** Reglas de negocio sobre el almacenamiento — alternar favorito, registrar búsqueda.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-persistance/jose/004

touch js/persistance.js
# (copiar el contenido de persistance.js)

git add js/persistance.js
git commit -m "feat: agregar persistance.js con reglas de negocio sobre el almacenamiento"

git push origin feat/js-persistance/jose/004
# → Pull Request → dev
```

---

### 🌿 feat/css-inicio-busqueda/jose/005
**Qué hace:** Primera parte de `inicio.css` — búsqueda, historial, info bar, cuadrícula, tarjeta y esqueleto.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/css-inicio-busqueda/jose/005

touch css/inicio.css
# Copiar SOLO la primera mitad de inicio.css:
# Secciones: .barra-busqueda, .historial, .barra-info,
#            .cuadricula, .tarjeta, .cuadricula-esqueleto, .tarjeta-esqueleto

git add css/inicio.css
git commit -m "feat: agregar inicio.css con buscador, cuadricula de tarjetas y esqueleto"

git push origin feat/css-inicio-busqueda/jose/005
# → Pull Request → dev
```

---

### 🌿 feat/css-inicio-paginacion/jose/006
**Qué hace:** Segunda parte de `inicio.css` — paginación, puntos de elipsis y botones de navegación.

```bash
git checkout dev
git pull origin dev

# Partir desde la rama anterior para tener inicio.css
git checkout feat/css-inicio-busqueda/jose/005
git pull origin feat/css-inicio-busqueda/jose/005

git checkout -b feat/css-inicio-paginacion/jose/006

# Agregar al final de css/inicio.css:
# Secciones: .paginacion, .btn-pagina, .pagina-puntos, .btn-pagina--nav

git add css/inicio.css
git commit -m "feat: completar inicio.css con estilos de paginacion y botones de navegacion"

git push origin feat/css-inicio-paginacion/jose/006
# → Pull Request → dev
```

---

---

# 👤 MIGUEL — 6 ramas

### Clonar (primera vez)
```bash
git clone https://github.com/julian/ProyectoSteam.git
cd ProyectoSteam

git config user.name "Miguel"
git config user.email "miguel@email.com"

git checkout dev
git pull origin dev
```

---

### 🌿 feat/css-detalle/miguel/001
**Qué hace:** Estilos de la página de detalle — migas de pan, bloque detalle, poster, esqueleto.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/css-detalle/miguel/001

touch css/detalle.css
# (copiar el contenido de detalle.css)

git add css/detalle.css
git commit -m "feat: agregar detalle.css con estilos de la pagina de detalle de serie"

git push origin feat/css-detalle/miguel/001
# → Pull Request → dev
```

---

### 🌿 feat/css-favoritos/miguel/002
**Qué hace:** Estilos de la página de favoritos — lista, items, barra de herramientas.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/css-favoritos/miguel/002

touch css/favoritos.css
# (copiar el contenido de favoritos.css)

git add css/favoritos.css
git commit -m "feat: agregar favoritos.css con estilos de la pagina de favoritos"

git push origin feat/css-favoritos/miguel/002
# → Pull Request → dev
```

---

### 🌿 feat/js-ui-grid-esqueleto/miguel/003
**Qué hace:** Primera parte de `ui.js` — funciones de esqueleto, cuadrícula, categorías, historial y helpers.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-ui-grid-esqueleto/miguel/003

touch js/ui.js
# Copiar SOLO la primera mitad de ui.js:
# Funciones: _escapar, _etiquetas, mostrarEsqueleto,
#            renderizarCuadricula, renderizarCategorias,
#            renderizarHistorial, mostrarVacio, actualizarContador

git add js/ui.js
git commit -m "feat: agregar ui.js con funciones de esqueleto, cuadricula e historial"

git push origin feat/js-ui-grid-esqueleto/miguel/003
# → Pull Request → dev
```

---

### 🌿 feat/js-ui-paginacion-detalle/miguel/004
**Qué hace:** Segunda parte de `ui.js` — paginación, favoritos, esqueleto de detalle, renderizado de detalle y errores.

```bash
git checkout dev
git pull origin dev

# Partir desde la rama anterior para tener ui.js
git checkout feat/js-ui-grid-esqueleto/miguel/003
git pull origin feat/js-ui-grid-esqueleto/miguel/003

git checkout -b feat/js-ui-paginacion-detalle/miguel/004

# Agregar al final de js/ui.js:
# Funciones: renderizarPaginacion, renderizarFavoritos,
#            actualizarContadorFavoritos, mostrarEsqueletoDetalle,
#            renderizarDetalle, renderizarErrorDetalle
# También actualizar el export al final del archivo

git add js/ui.js
git commit -m "feat: completar ui.js con paginacion, favoritos y renderizado de detalle"

git push origin feat/js-ui-paginacion-detalle/miguel/004
# → Pull Request → dev
```

---

### 🌿 feat/js-app/miguel/005
**Qué hace:** Toda la lógica de `index.html` — menú, búsqueda, categoría, paginación, favoritos.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-app/miguel/005

touch js/app.js
# (copiar el contenido de app.js)

git add js/app.js
git commit -m "feat: agregar app.js con logica completa de la pagina principal"

git push origin feat/js-app/miguel/005
# → Pull Request → dev
```

---

### 🌿 feat/js-show-favorites-main/miguel/006
**Qué hace:** Lógica de `show.html` y `favorites.html`.

```bash
git checkout dev
git pull origin dev

git checkout -b feat/js-show-favorites-main/miguel/006

touch js/show-main.js js/favorites-main.js
# (copiar el contenido de ambos archivos)

git add js/show-main.js js/favorites-main.js
git commit -m "feat: agregar show-main.js y favorites-main.js con logica de sus paginas"

git push origin feat/js-show-favorites-main/miguel/006
# → Pull Request → dev
```

---

---

## 🔄 Flujo de cada tarea (resumen)

```
1.  git checkout dev
2.  git pull origin dev                        ← siempre actualizar antes
3.  git checkout -b feat/nombre/persona/número ← crear rama
4.  (escribir / pegar el código)
5.  git add archivo(s)
6.  git commit -m "feat: descripción"
7.  git push origin feat/nombre/persona/número
8.  Abrir Pull Request en GitHub → base: dev
9.  Otro integrante revisa y aprueba el PR
10. Merge desde GitHub
11. git checkout dev && git pull origin dev    ← todos sincronizan
```

---

## 📌 Convención de commits

| Prefijo     | Cuándo usarlo                              |
|-------------|--------------------------------------------|
| `feat:`     | Nueva funcionalidad o archivo nuevo        |
| `fix:`      | Corrección de un error                     |
| `chore:`    | Configuración, estructura, herramientas    |
| `style:`    | Solo cambios de estilos CSS                |
| `docs:`     | Documentación (README, comentarios)        |
| `refactor:` | Refactorización sin cambiar comportamiento |

---

## ⚠️ Reglas del equipo

- Nunca hacer `push` directo a `main` ni a `dev`
- Siempre crear rama desde `dev` actualizado
- Siempre fusionar mediante Pull Request, nunca merge local
- Un compañero diferente al autor debe revisar y aprobar cada PR
- Solo Julián hace merge de `dev` → `main` al final del proyecto

---

## 🏁 Merge final a producción (solo Julián)

```bash
git checkout main
git pull origin main

git merge dev
git push origin main

# Etiquetar la versión final
git tag -a v1.0.0 -m "release: version 1.0.0 entrega final"
git push origin v1.0.0
```

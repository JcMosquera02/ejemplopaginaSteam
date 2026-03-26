# ProyectoSteam

Aplicación web para explorar series usando la API de TVMaze.

## Integrantes
- Integrante 1
- Integrante 2
- Integrante 3

## Funcionalidades
- Listado automático de series al ingresar
- Búsqueda en tiempo real: filtra por nombre letra a letra
- Filtro por categoría con select (combinado con la búsqueda)
- Paginación con selector de 10 / 20 / 50 elementos por página
- Historial de búsquedas persistente
- Página de detalle: imagen, géneros, rating, idioma, estado, estreno, resumen
- Favoritos guardados en `localStorage` sin duplicados
- Página de favoritos con búsqueda interna y ordenamiento

## Estructura
```
ProyectoSteam/
├── Paginas/
│   ├── index.html
│   ├── show.html
│   └── favorites.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js            ← index.html
│   ├── show-main.js       ← show.html
│   ├── favorites-main.js  ← favorites.html
│   ├── state.js
│   ├── service.js
│   ├── storage.js
│   ├── persistance.js
│   └── ui.js
└── assets/
```

## Cómo ejecutar
```bash
npx serve .
# o usar Live Server en VS Code
```
Abrir `http://localhost:3000`

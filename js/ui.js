/**
 * ui.js — único módulo que escribe en el DOM.
 * Todas las clases CSS están en español.
 * La paginación muestra TODOS los números de página.
 */

const _escapar = (s = '') =>
  String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const _etiquetas = (arr = []) =>
  arr.slice(0, 3).map(g => `<span class="etiqueta">${_escapar(g)}</span>`).join('');

/* ── Esqueleto de carga ── */
const mostrarEsqueleto = (areaEl, cantidad = 8) => {
  if (!areaEl) return;
  const items = Array.from({ length: cantidad }, () => `
    <li class="tarjeta-esqueleto">
      <div class="tarjeta-esqueleto__imagen shimmer"></div>
      <div class="tarjeta-esqueleto__cuerpo">
        <div class="tarjeta-esqueleto__linea shimmer"></div>
        <div class="tarjeta-esqueleto__linea tarjeta-esqueleto__linea--corta shimmer"></div>
      </div>
    </li>`).join('');
  areaEl.innerHTML = `<ul class="cuadricula-esqueleto">${items}</ul>`;
};

/* ── Cuadrícula de tarjetas ── */
const renderizarCuadricula = (series, areaEl, esFavoritoFn) => {
  if (!areaEl) return;
  if (!series.length) { areaEl.innerHTML = ''; return; }
  areaEl.innerHTML = `<ul class="cuadricula">${series.map(s => {
    const img    = s.image?.medium || s.image?.original || '';
    const calif  = s.rating?.average;
    const esFav  = esFavoritoFn(s.id);
    return `
      <li class="tarjeta">
        <div class="tarjeta__imagen">
          ${img
            ? `<img src="${_escapar(img)}" alt="${_escapar(s.name)}" loading="lazy" />`
            : `<div class="tarjeta__sin-imagen">Sin imagen</div>`}
        </div>
        <div class="tarjeta__cuerpo">
          <p class="tarjeta__titulo">${_escapar(s.name || 'Sin título')}</p>
          <div class="tarjeta__generos">${_etiquetas(s.genres)}</div>
          ${calif ? `<p class="tarjeta__calificacion">★ ${calif}</p>` : ''}
          <div class="tarjeta__acciones">
            <a href="../Paginas/show.html?id=${s.id}" class="btn btn--primario">Ver</a>
            <button class="btn btn--contorno" data-id-fav="${s.id}" aria-pressed="${esFav}">
              ${esFav ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </li>`;
  }).join('')}</ul>`;
};

/* ── Paginación: << < ventana de páginas > >>
   Muestra siempre primera, última y ventana de 5 centrada en la actual ── */
const renderizarPaginacion = (actual, total, contenedorEl, btnPrimera, btnAnterior, btnSiguiente, btnUltima) => {
  if (!contenedorEl) return;

  btnPrimera.disabled   = actual <= 1;
  btnAnterior.disabled  = actual <= 1;
  btnSiguiente.disabled = actual >= total;
  btnUltima.disabled    = actual >= total;

  if (total <= 1) { contenedorEl.innerHTML = ''; return; }

  const VENTANA = 5;
  let inicio = Math.max(1, actual - Math.floor(VENTANA / 2));
  let fin    = inicio + VENTANA - 1;
  if (fin > total) { fin = total; inicio = Math.max(1, fin - VENTANA + 1); }

  const items = [];

  if (inicio > 1) {
    items.push(`<button class="btn-pagina" data-pagina="1" aria-label="Ir a página 1">1</button>`);
    if (inicio > 2) items.push(`<span class="pagina-puntos">…</span>`);
  }

  for (let n = inicio; n <= fin; n++) {
    const activo = n === actual;
    items.push(`<button class="btn-pagina ${activo ? 'activo' : ''}" data-pagina="${n}" ${activo ? 'disabled' : ''} aria-label="Ir a página ${n}" aria-current="${activo ? 'page' : 'false'}">${n}</button>`);
  }

  if (fin < total) {
    if (fin < total - 1) items.push(`<span class="pagina-puntos">…</span>`);
    items.push(`<button class="btn-pagina" data-pagina="${total}" aria-label="Ir a página ${total}">${total}</button>`);
  }

  contenedorEl.innerHTML = items.join('');
};

/* ── Select de categorías ── */
const renderizarCategorias = (categorias, activa, selectEl) => {
  if (!selectEl) return;
  selectEl.innerHTML =
    `<option value="all" ${activa === 'all' ? 'selected' : ''}>Todas</option>` +
    categorias.map(c =>
      `<option value="${_escapar(c)}" ${activa === c ? 'selected' : ''}>${_escapar(c)}</option>`
    ).join('');
};

/* ── Historial ── */
const renderizarHistorial = (historial, listaEl, contenedorEl) => {
  if (!listaEl || !contenedorEl) return;
  if (!historial.length) { contenedorEl.hidden = true; return; }
  contenedorEl.hidden = false;
  listaEl.innerHTML = historial.map(q =>
    `<li><button class="historial__etiqueta" data-busqueda="${_escapar(q)}">${_escapar(q)}</button></li>`
  ).join('');
};

/* ── Helpers de visibilidad ── */
const mostrarVacio  = (el, mostrar) => { if (el) el.hidden = !mostrar; };
const actualizarContador = (n, el) => { if (el) el.textContent = `${n} resultado${n !== 1 ? 's' : ''}`; };

/* ── Lista de favoritos ── */
const renderizarFavoritos = (favoritos, el) => {
  if (!el) return;
  el.innerHTML = favoritos.map(s => {
    const img = s.image?.medium || s.image?.original || '';
    return `
      <li class="item-favorito">
        <div class="item-favorito__miniatura">
          ${img
            ? `<img src="${_escapar(img)}" alt="" loading="lazy" />`
            : `<div class="item-favorito__sin-imagen">?</div>`}
        </div>
        <div class="item-favorito__info">
          <p class="item-favorito__titulo">${_escapar(s.name || 'Sin título')}</p>
          <div class="item-favorito__generos">${_etiquetas(s.genres)}</div>
          <div class="item-favorito__acciones">
            <a href="../Paginas/show.html?id=${s.id}" class="btn btn--primario">Ver detalles</a>
            <button class="btn btn--peligro" data-id-eliminar="${s.id}">Eliminar</button>
          </div>
        </div>
      </li>`;
  }).join('');
};

const actualizarContadorFavoritos = (n, contadorEl, btnEliminar) => {
  if (contadorEl) contadorEl.textContent = n;
  if (btnEliminar) btnEliminar.hidden = n === 0;
};

/* ── Detalle de serie ── */
const mostrarEsqueletoDetalle = (areaEl) => {
  if (!areaEl) return;
  areaEl.innerHTML = `
    <div class="detalle-esqueleto">
      <div class="esq-caja shimmer" style="width:120px;aspect-ratio:2/3;flex-shrink:0"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:10px">
        <div class="esq-linea esq-linea--grande shimmer"></div>
        <div class="esq-linea esq-linea--mediana shimmer"></div>
        <div class="esq-linea shimmer"></div>
        <div class="esq-linea shimmer"></div>
        <div class="esq-linea esq-linea--pequena shimmer"></div>
      </div>
    </div>`;
};

const renderizarDetalle = (serie, areaEl, migaNombreEl, esFav) => {
  if (!areaEl) return;
  const { id, name, image, genres = [], rating, summary, language, status, premiered } = serie;
  document.title = `${name} — ProyectoSteam`;
  if (migaNombreEl) migaNombreEl.textContent = name;

  const src = image?.original || image?.medium || '';
  const posterHTML = src
    ? `<img src="${_escapar(src)}" alt="${_escapar(name)}" />`
    : `<div class="detalle__sin-imagen">Sin imagen</div>`;

  const datosHTML = [
    language  && `<span><strong>Idioma:</strong> ${_escapar(language)}</span>`,
    status    && `<span><strong>Estado:</strong> ${_escapar(status)}</span>`,
    premiered && `<span><strong>Estreno:</strong> ${_escapar(premiered)}</span>`,
  ].filter(Boolean).join('');

  const calif = rating?.average;

  areaEl.innerHTML = `
    <div class="detalle">
      <div class="detalle__poster">${posterHTML}</div>
      <div class="detalle__info">
        <h1 class="detalle__titulo">${_escapar(name)}</h1>
        <div class="detalle__generos">${_etiquetas(genres)}</div>
        <div class="detalle__datos">${datosHTML}</div>
        ${calif ? `<p class="detalle__calificacion">★ ${calif} / 10</p>` : ''}
        <div class="detalle__resumen">${summary || '<p>Sin descripción disponible.</p>'}</div>
        <div class="detalle__acciones">
          <button class="btn btn--primario" id="btn-favorito" data-id-serie="${id}">
            ${esFav ? '♥ En favoritos' : 'Agregar a favoritos'}
          </button>
          <a href="../Paginas/index.html" class="btn btn--contorno">← Volver</a>
        </div>
      </div>
    </div>`;
};

const renderizarErrorDetalle = (areaEl) => {
  if (!areaEl) return;
  areaEl.innerHTML = `
    <div class="vacio">
      <strong>Serie no encontrada</strong>
      No se pudo cargar la información.
      <a href="../Paginas/index.html" class="btn btn--contorno">← Volver al inicio</a>
    </div>`;
};

export default Object.freeze({
  mostrarEsqueleto,
  renderizarCuadricula,
  renderizarPaginacion,
  renderizarCategorias,
  renderizarHistorial,
  mostrarVacio,
  actualizarContador,
  renderizarFavoritos,
  actualizarContadorFavoritos,
  mostrarEsqueletoDetalle,
  renderizarDetalle,
  renderizarErrorDetalle,
});

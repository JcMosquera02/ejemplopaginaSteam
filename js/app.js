/**
 * app.js — toda la lógica de index.html
 * main.js solo llama App.iniciar()
 */

import Estado      from './state.js';
import Servicio    from './service.js';
import Persistencia from './persistance.js';
import UI          from './ui.js';

const $ = id => document.getElementById(id);

const iniciar = () => {
  /* ── Referencias DOM ── */
  const areaEl       = $('area-contenido');
  const sinResultados = $('sin-resultados');
  const contadorEl   = $('contador-resultados');
  const categoriaEl  = $('selector-categoria');
  const porPaginaEl  = $('selector-por-pagina');
  const numerosEl    = $('numeros-pagina');
  const btnPrimera   = $('btn-primera');
  const btnAnterior  = $('btn-anterior');
  const btnSiguiente = $('btn-siguiente');
  const btnUltima    = $('btn-ultima');
  const campoBusq    = $('campo-busqueda');
  const btnLimpiar   = $('btn-limpiar');
  const histContenedor = $('historial-contenedor');
  const histLista    = $('historial-lista');
  const botonMenu    = $('boton-menu');
  const menuNav      = $('menu-nav');

  /* ── Menú hamburguesa ── */
  botonMenu?.addEventListener('click', () => {
    const abierto = menuNav.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', abierto);
  });
  document.addEventListener('click', e => {
    if (!botonMenu?.contains(e.target) && !menuNav?.contains(e.target)) {
      menuNav?.classList.remove('abierto');
      botonMenu?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Renderizar vista actual ── */
  const _renderizar = () => {
    const items      = Estado.itemsPagina();
    const filtradas  = Estado.obtenerFiltradas();
    const { paginaActual, categoriaActiva, series } = Estado.obtener();
    const categorias = [...new Set(series.flatMap(s => s.genres || []))].sort();

    UI.renderizarCuadricula(items, areaEl, Persistencia.esFavorito);
    UI.mostrarVacio(sinResultados, items.length === 0);
    UI.actualizarContador(filtradas.length, contadorEl);
    UI.renderizarPaginacion(paginaActual, Estado.totalPaginas(), numerosEl, btnPrimera, btnAnterior, btnSiguiente, btnUltima);
    UI.renderizarCategorias(categorias, categoriaActiva, categoriaEl);
  };

  /* ── Carga inicial ── */
  const _cargar = async () => {
    UI.mostrarEsqueleto(areaEl, 8);
    try {
      const series = await Servicio.obtenerSeries(0);
      Estado.establecer({ series, textoBusqueda: '', categoriaActiva: 'all' });
      Estado.reiniciarPagina();
      _renderizar();
    } catch (err) {
      console.error('[app]', err);
      areaEl.innerHTML = '';
      UI.mostrarVacio(sinResultados, true);
    }
  };

  /* ── Búsqueda en tiempo real ── */
  campoBusq?.addEventListener('input', () => {
    const q = campoBusq.value;
    btnLimpiar.hidden = !q;
    Estado.establecer({ textoBusqueda: q });
    Estado.reiniciarPagina();
    if (q.trim().length >= 2) {
      Persistencia.registrarBusqueda(q.trim());
      UI.renderizarHistorial(Persistencia.obtenerHistorial(), histLista, histContenedor);
    }
    _renderizar();
  });

  btnLimpiar?.addEventListener('click', () => {
    campoBusq.value = '';
    btnLimpiar.hidden = true;
    Estado.establecer({ textoBusqueda: '' });
    Estado.reiniciarPagina();
    _renderizar();
  });

  /* ── Cambio de categoría ── */
  categoriaEl?.addEventListener('change', () => {
    Estado.establecer({ categoriaActiva: categoriaEl.value });
    Estado.reiniciarPagina();
    _renderizar();
  });

  /* ── Elementos por página ── */
  porPaginaEl?.addEventListener('change', () => {
    const n = parseInt(porPaginaEl.value);
    Estado.establecer({ porPagina: n });
    Estado.reiniciarPagina();
    Persistencia.guardarPorPagina(n);
    _renderizar();
  });

  /* ── Paginación anterior / siguiente ── */
  btnAnterior?.addEventListener('click', () => {
    const { paginaActual } = Estado.obtener();
    if (paginaActual <= 1) return;
    Estado.establecer({ paginaActual: paginaActual - 1 });
    _renderizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnSiguiente?.addEventListener('click', () => {
    const { paginaActual } = Estado.obtener();
    if (paginaActual >= Estado.totalPaginas()) return;
    Estado.establecer({ paginaActual: paginaActual + 1 });
    _renderizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Primera y última página ── */
  btnPrimera?.addEventListener('click', () => {
    Estado.establecer({ paginaActual: 1 });
    _renderizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnUltima?.addEventListener('click', () => {
    Estado.establecer({ paginaActual: Estado.totalPaginas() });
    _renderizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Paginación por número ── */
  numerosEl?.addEventListener('click', e => {
    const btn = e.target.closest('[data-pagina]');
    if (!btn) return;
    Estado.establecer({ paginaActual: parseInt(btn.dataset.pagina) });
    _renderizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Toggle favorito desde la cuadrícula ── */
  areaEl?.addEventListener('click', e => {
    const btn = e.target.closest('[data-id-fav]');
    if (!btn) return;
    e.preventDefault();
    const id    = parseInt(btn.dataset.idFav);
    const serie = Estado.obtener().series.find(s => s.id === id);
    if (!serie) return;
    const { agregado } = Persistencia.alternarFavorito(serie);
    btn.setAttribute('aria-pressed', agregado);
    btn.textContent = agregado ? '♥' : '♡';
  });

  /* ── Historial: clic en una búsqueda anterior ── */
  histLista?.addEventListener('click', e => {
    const btn = e.target.closest('[data-busqueda]');
    if (!btn) return;
    campoBusq.value = btn.dataset.busqueda;
    btnLimpiar.hidden = false;
    Estado.establecer({ textoBusqueda: btn.dataset.busqueda });
    Estado.reiniciarPagina();
    _renderizar();
  });

  /* ── Inicialización ── */
  const porPagina = Persistencia.obtenerPorPagina(10);
  Estado.establecer({ porPagina });
  if (porPaginaEl) porPaginaEl.value = String(porPagina);
  UI.renderizarHistorial(Persistencia.obtenerHistorial(), histLista, histContenedor);
  _cargar();
};

export default Object.freeze({ iniciar });

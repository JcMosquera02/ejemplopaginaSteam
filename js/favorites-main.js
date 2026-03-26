/**
 * favorites-main.js — lógica de favorites.html
 */

import Persistencia from './persistance.js';
import UI           from './ui.js';

const $ = id => document.getElementById(id);

const iniciar = () => {
  const listaEl        = $('lista-favoritos');
  const listaVaciaEl   = $('lista-vacia');
  const sinCoincidencias = $('sin-coincidencias');
  const contadorEl     = $('contador-favoritos');
  const btnEliminarTodo = $('btn-eliminar-todo');
  const buscarEl       = $('buscar-favoritos');
  const botonesOrden   = document.querySelectorAll('.btn-orden');
  const botonMenu      = $('boton-menu');
  const menuNav        = $('menu-nav');

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

  let _orden = 'agregado';

  const _ordenar = (favs) => {
    const c = [...favs];
    if (_orden === 'nombre')       return c.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (_orden === 'calificacion') return c.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    return c.sort((a, b) => (b._guardadoEn || 0) - (a._guardadoEn || 0));
  };

  const _renderizar = () => {
    const todos   = Persistencia.obtenerFavoritos();
    const q       = buscarEl?.value?.trim().toLowerCase() || '';
    const visibles = _ordenar(todos).filter(f => !q || (f.name || '').toLowerCase().includes(q));

    UI.actualizarContadorFavoritos(todos.length, contadorEl, btnEliminarTodo);
    UI.mostrarVacio(listaVaciaEl, todos.length === 0);
    UI.mostrarVacio(sinCoincidencias, todos.length > 0 && visibles.length === 0);

    if (todos.length === 0 || visibles.length === 0) {
      if (listaEl) listaEl.innerHTML = '';
      return;
    }
    UI.renderizarFavoritos(visibles, listaEl);
  };

  /* ── Eliminar uno ── */
  listaEl?.addEventListener('click', e => {
    const btn = e.target.closest('[data-id-eliminar]');
    if (!btn) return;
    Persistencia.eliminarFavorito(parseInt(btn.dataset.idEliminar));
    _renderizar();
  });

  /* ── Eliminar todos ── */
  btnEliminarTodo?.addEventListener('click', () => {
    if (!confirm('¿Eliminar todos los favoritos?')) return;
    Persistencia.limpiarFavoritos();
    _renderizar();
  });

  /* ── Búsqueda interna ── */
  buscarEl?.addEventListener('input', _renderizar);

  /* ── Ordenamiento ── */
  botonesOrden?.forEach(btn => {
    btn.addEventListener('click', () => {
      _orden = btn.dataset.orden;
      botonesOrden.forEach(b => b.classList.toggle('activo', b === btn));
      _renderizar();
    });
  });

  _renderizar();
};

iniciar();

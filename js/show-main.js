/**
 * show-main.js — lógica de show.html
 */

import Servicio     from './service.js';
import Persistencia from './persistance.js';
import UI           from './ui.js';

const $ = id => document.getElementById(id);

const iniciar = async () => {
  const areaEl      = $('area-contenido');
  const migaNombre  = $('miga-nombre');
  const botonMenu   = $('boton-menu');
  const menuNav     = $('menu-nav');

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

  const id = new URLSearchParams(window.location.search).get('id');
  if (!id || isNaN(Number(id))) { UI.renderizarErrorDetalle(areaEl); return; }

  UI.mostrarEsqueletoDetalle(areaEl);

  try {
    const serie = await Servicio.obtenerSeriePorId(id);
    const esFav = Persistencia.esFavorito(serie.id);
    UI.renderizarDetalle(serie, areaEl, migaNombre, esFav);

    areaEl.addEventListener('click', e => {
      const btn = e.target.closest('#btn-favorito');
      if (!btn) return;
      const { agregado } = Persistencia.alternarFavorito(serie);
      btn.textContent = agregado ? '♥ En favoritos' : 'Agregar a favoritos';
    });

  } catch (err) {
    console.error('[show-main]', err);
    UI.renderizarErrorDetalle(areaEl);
  }
};

iniciar();

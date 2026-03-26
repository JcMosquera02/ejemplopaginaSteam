/** storage.js — lectura y escritura en localStorage */
const CLAVES = { FAV: 'me_fav', HIST: 'me_hist', PP: 'me_pp' };
const leer    = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const obtenerFavoritos   = ()   => leer(CLAVES.FAV, []);
const esFavorito         = (id) => obtenerFavoritos().some(f => f.id === id);
const agregarFavorito    = (s)  => { if (!esFavorito(s.id)) guardar(CLAVES.FAV, [...obtenerFavoritos(), { ...s, _guardadoEn: Date.now() }]); };
const eliminarFavorito   = (id) => guardar(CLAVES.FAV, obtenerFavoritos().filter(f => f.id !== id));
const limpiarFavoritos   = ()   => guardar(CLAVES.FAV, []);

const obtenerHistorial   = ()  => leer(CLAVES.HIST, []);
const agregarAlHistorial = (q) => {
  const t = q.trim(); if (!t) return;
  guardar(CLAVES.HIST, [t, ...obtenerHistorial().filter(h => h.toLowerCase() !== t.toLowerCase())].slice(0, 8));
};

const guardarPorPagina   = (n)      => guardar(CLAVES.PP, n);
const obtenerPorPagina   = (d = 10) => leer(CLAVES.PP, d);

export default Object.freeze({
  obtenerFavoritos, esFavorito, agregarFavorito, eliminarFavorito, limpiarFavoritos,
  obtenerHistorial, agregarAlHistorial,
  guardarPorPagina, obtenerPorPagina,
});

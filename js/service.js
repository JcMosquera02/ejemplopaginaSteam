/** service.js — llamadas a la API de TVMaze */
const BASE = 'https://api.tvmaze.com';
const _obtener = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error API: ${res.status}`);
  return res.json();
};
const obtenerSeries    = (pagina = 0) => _obtener(`${BASE}/shows?page=${pagina}`);
const buscarSeries     = (q)          => _obtener(`${BASE}/search/shows?q=${encodeURIComponent(q)}`);
const obtenerSeriePorId = (id)        => _obtener(`${BASE}/shows/${id}`);
export default Object.freeze({ obtenerSeries, buscarSeries, obtenerSeriePorId });

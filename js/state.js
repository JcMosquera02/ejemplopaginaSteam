/** state.js — estado en memoria */
const Estado = (() => {
  let _s = { series: [], paginaActual: 1, porPagina: 20, categoriaActiva: 'all', textoBusqueda: '' };

  const obtener    = ()      => ({ ..._s });
  const establecer = (patch) => { _s = { ..._s, ...patch }; };
  const reiniciarPagina = () => { _s = { ..._s, paginaActual: 1 }; };

  const obtenerFiltradas = () => {
    const { series, categoriaActiva, textoBusqueda } = _s;
    const q = textoBusqueda.trim().toLowerCase();
    return series.filter(s => {
      const porCategoria = categoriaActiva === 'all' || (s.genres || []).includes(categoriaActiva);
      const porTexto     = !q || (s.name || '').toLowerCase().includes(q);
      return porCategoria && porTexto;
    });
  };

  const totalPaginas = () => Math.ceil(obtenerFiltradas().length / _s.porPagina);

  const itemsPagina = () => {
    const filtradas = obtenerFiltradas();
    const inicio = (_s.paginaActual - 1) * _s.porPagina;
    return filtradas.slice(inicio, inicio + _s.porPagina);
  };

  return Object.freeze({ obtener, establecer, reiniciarPagina, obtenerFiltradas, totalPaginas, itemsPagina });
})();

export default Estado;

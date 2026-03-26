/** persistance.js — reglas de negocio sobre almacenamiento */
import Almacenamiento from './storage.js';

const alternarFavorito = (serie) => {
  const era = Almacenamiento.esFavorito(serie.id);
  era ? Almacenamiento.eliminarFavorito(serie.id) : Almacenamiento.agregarFavorito(serie);
  return { agregado: !era };
};

const registrarBusqueda = (q) => {
  Almacenamiento.agregarAlHistorial(q);
  return Almacenamiento.obtenerHistorial();
};

export default Object.freeze({
  alternarFavorito, registrarBusqueda,
  obtenerFavoritos:   Almacenamiento.obtenerFavoritos,
  esFavorito:         Almacenamiento.esFavorito,
  eliminarFavorito:   Almacenamiento.eliminarFavorito,
  limpiarFavoritos:   Almacenamiento.limpiarFavoritos,
  obtenerHistorial:   Almacenamiento.obtenerHistorial,
  guardarPorPagina:   Almacenamiento.guardarPorPagina,
  obtenerPorPagina:   Almacenamiento.obtenerPorPagina,
});

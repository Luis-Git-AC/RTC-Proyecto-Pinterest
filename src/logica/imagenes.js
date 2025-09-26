import { obtenerImagenesIniciales, buscarImagenes } from '../api/unsplash.js';
import { mostrarMensaje } from '../auxiliares/mensajes.js';

export async function cargarImagenesIniciales(cuadriculaImagenes, setImagenesActuales) {
    try {
        const imagenes = await obtenerImagenesIniciales();
        setImagenesActuales(imagenes);
        cuadriculaImagenes.actualizarImagenes(imagenes);
    } catch (error) {
        console.error('Error al cargar imágenes iniciales:', error);
        mostrarMensaje('Error al cargar imágenes. Intenta recargar la página.');
    }
}

export async function manejarBusqueda(consulta, cuadriculaImagenes, setImagenesActuales) {
    try {
        let imagenes = await buscarImagenes(consulta);

        if (imagenes.length === 0) {
            imagenes = await buscarImagenes('gatos');
            setImagenesActuales(imagenes);
            cuadriculaImagenes.actualizarImagenes(imagenes);
            mostrarMensaje(`No se encontraron resultados para "${consulta}". Mostrando imágenes de gatos.`);
        } else {
            setImagenesActuales(imagenes);
            cuadriculaImagenes.actualizarImagenes(imagenes);
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        mostrarMensaje('Error al realizar la búsqueda. Intenta más tarde.');
    }
}

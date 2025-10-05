import { obtenerImagenes } from '../api/unsplash.js';
import { mostrarMensaje } from '../auxiliares/mensajes.js';

export async function cargarImagenes({ tipo = 'random', consulta = '', cuadriculaImagenes, setImagenesActuales }) {
    try {
        let imagenes = await obtenerImagenes({ tipo, consulta });

        if (tipo === 'search' && imagenes.length === 0) {
            imagenes = await obtenerImagenes({ tipo: 'search', consulta: 'gatos' });
            mostrarMensaje(`No se encontraron resultados para "${consulta}". Mostrando imágenes de gatos.`);
        }

        setImagenesActuales(imagenes);
        cuadriculaImagenes.actualizarImagenes(imagenes);

    } catch (error) {
        console.error('Error al cargar imágenes:', error);
        mostrarMensaje('Error al cargar imágenes. Intenta más tarde.');
    }
}
const CLAVE_ACCESO = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const URL_BASE = 'https://api.unsplash.com';

export async function obtenerImagenes({ tipo = 'random', consulta = '', cantidad = 20 } = {}) {
    try {
        let endpoint = '';

        if (tipo === 'random') {
            endpoint = `/photos/random?count=${cantidad}`;
        } else if (tipo === 'search') {
            const consultaCodificada = encodeURIComponent(consulta);
            endpoint = `/search/photos?query=${consultaCodificada}&per_page=${cantidad}`;
        } else {
            throw new Error('Tipo de petición no válido');
        }

        const url = `${URL_BASE}${endpoint}&client_id=${CLAVE_ACCESO}`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);

        const datos = await respuesta.json();
        return tipo === 'search' ? datos.results : datos;

    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        throw error;
    }
}

export async function obtenerEstadisticas(photoId) {
    try {
        if (!CLAVE_ACCESO) throw new Error('Clave de acceso no definida');
        const url = `${URL_BASE}/photos/${photoId}/statistics?client_id=${CLAVE_ACCESO}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        throw error;
    }
}

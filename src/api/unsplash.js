const CLAVE_ACCESO = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const URL_BASE = 'https://api.unsplash.com';
export async function obtenerImagenesIniciales() {
    try {
        const url = `${URL_BASE}/photos/random?count=20&client_id=${CLAVE_ACCESO}`;
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) throw new Error('Error al obtener imágenes');
        
        const imagenes = await respuesta.json();
        return imagenes;
    } catch (error) {
        console.log(' Error al obtener imágenes iniciales:', error);
        throw error;
    }
}
export async function buscarImagenes(consulta) {
    try {
        const consultaCodificada = encodeURIComponent(consulta);
        const url = `${URL_BASE}/search/photos?query=${consultaCodificada}&per_page=20&client_id=${CLAVE_ACCESO}`;
        
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('Error en la búsqueda');
        
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.log('Error en la búsqueda:', error);
        throw error;
    }
}
import { obtenerImagenesIniciales, buscarImagenes } from './api/unsplash.js';
import Header from './componentes/Header/Header.js';
import ImageGrid from './componentes/ImageGrid/ImageGrid.js';


export default function App() {
    const aplicacion = document.getElementById('app');
    let imagenesActuales = [];

    function mostrarMensaje(mensaje) {
        const mensajeExistente = document.querySelector('.mensaje');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        const divMensaje = document.createElement('div');
        divMensaje.className = 'mensaje';
        divMensaje.textContent = mensaje;
        document.body.appendChild(divMensaje);

        setTimeout(() => {
            if (divMensaje.parentNode) {
                divMensaje.remove();
            }
        }, 3000);
    }

    async function cargarImagenesIniciales() {
        try {
            const imagenes = await obtenerImagenesIniciales();
            imagenesActuales = imagenes;
            cuadriculaImagenes.actualizarImagenes(imagenes);
        } catch (error) {
            console.log('Error al cargar imágenes iniciales:', error);
            mostrarMensaje('Error al cargar imágenes. Intenta recargar la página.');
        }
    }

    async function manejarBusqueda(consulta) {
        try {
            let imagenes = await buscarImagenes(consulta);
            
            if (imagenes.length === 0) {//fallback a gatos. la api nunca devuelve imagenes.length === 0 ?
                imagenes = await buscarImagenes('gatos');
                imagenesActuales = imagenes;
                cuadriculaImagenes.actualizarImagenes(imagenes);
                mostrarMensaje(`No se encontraron resultados para "${consulta}". Mostrando imágenes de gatos.`); 
            } else {
                imagenesActuales = imagenes;
                cuadriculaImagenes.actualizarImagenes(imagenes);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            mostrarMensaje('Error al realizar la búsqueda. Intenta más tarde.');
        }
    }

    function manejarClicImagen(imagen) {
        console.log('Imagen clicada:', imagen); // check clic funcionando
    }

    function manejarClicLogo() {
        cargarImagenesIniciales();
    }

    
    Header({
        alBuscar: manejarBusqueda,
        alClicLogo: manejarClicLogo
    });

    const cuadriculaImagenes = ImageGrid({
        imagenes: [],
        alClicImagen: manejarClicImagen
    });
    aplicacion.appendChild(cuadriculaImagenes);

    cargarImagenesIniciales();

    return aplicacion;
}
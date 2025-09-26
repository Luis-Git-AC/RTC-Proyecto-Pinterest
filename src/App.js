import Header from './componentes/Header/Header.js';
import ImageGrid from './componentes/ImageGrid/ImageGrid.js';
import { cargarImagenesIniciales, manejarBusqueda } from './logica/imagenes.js';

export default function App() {
    const aplicacion = document.getElementById('app');
    let imagenesActuales = [];

    const cuadriculaImagenes = ImageGrid({
        imagenes: [],
        alClicImagen: (imagen) => console.log('Imagen clicada:', imagen)
    });
    aplicacion.appendChild(cuadriculaImagenes);

    Header({
        alBuscar: (consulta) =>
            manejarBusqueda(consulta, cuadriculaImagenes, (imagenes) => (imagenesActuales = imagenes)),
        alClicLogo: () =>
            cargarImagenesIniciales(cuadriculaImagenes, (imagenes) => (imagenesActuales = imagenes))
    });

    cargarImagenesIniciales(cuadriculaImagenes, (imagenes) => (imagenesActuales = imagenes));

    return aplicacion;
}

import Header from './componentes/Header/Header.js';
import ImageGrid from './componentes/ImageGrid/ImageGrid.js';
import { cargarImagenes } from './logica/imagenes.js';

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
            cargarImagenes({
                tipo: 'search',
                consulta,
                cuadriculaImagenes,
                setImagenesActuales: (imagenes) => (imagenesActuales = imagenes)
            }),
        alClicLogo: () =>
            cargarImagenes({
                tipo: 'random',
                cuadriculaImagenes,
                setImagenesActuales: (imagenes) => (imagenesActuales = imagenes)
            })
    });

    cargarImagenes({
        tipo: 'random',
        cuadriculaImagenes,
        setImagenesActuales: (imagenes) => (imagenesActuales = imagenes)
    });

    return aplicacion;
}

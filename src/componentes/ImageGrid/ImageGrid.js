import './image-grid.css';
import ImageCard from '../ImageCard/ImageCard.js';



export default function ImageGrid({ imagenes, alClicImagen }) {
    const cuadricula = document.createElement('main');
    cuadricula.className = 'image-grid';
    cuadricula.id = 'image-grid';
    
    cuadricula.actualizarImagenes = (nuevasImagenes) => {
        cuadricula.innerHTML = ''; 
        
        nuevasImagenes.forEach(imagen => {
            const tarjeta = ImageCard({ 
                imagen, 
                alClic: () => alClicImagen(imagen) 
            });
            cuadricula.appendChild(tarjeta);
        });
    };
    
    cuadricula.actualizarImagenes(imagenes);
    
    return cuadricula;
}
import './image-card.css';

export default function ImageCard({ imagen, alClic }) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'image-card';
    
    tarjeta.innerHTML = `
        <div class="image-container">
            <img src="${imagen.urls.small}" 
                 alt="${imagen.alt_description || 'Imagen'}" 
                 loading="lazy">
        </div>
        <div class="card-footer">
            <div class="user-info">
                <img class="user-avatar" 
                     src="${imagen.user.profile_image.small}" 
                     alt="${imagen.user.name}">
                <span class="user-name">${imagen.user.name}</span>
            </div>
            <button class="save-button">Guardar</button>
        </div>
    `;
    
    tarjeta.addEventListener('click', alClic);
    
    return tarjeta;
}
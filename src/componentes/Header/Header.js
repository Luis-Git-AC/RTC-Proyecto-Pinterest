import './header.css';

export default function Header({ alBuscar, alClicLogo }) {
    const header = document.createElement('header');
    header.className = 'header';
    
    header.innerHTML = `
  <div class="contenedor-header">
    <div class="logo-navegacion">
      <!-- Logo oficial Pinterest -->
      <div class="logo" id="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.004 0C5.372 0 0 5.373 0 12.004c0 5.15 3.156 9.541 7.603 11.338-.105-.961-.199-2.436.042-3.486.217-.946 1.402-6.02 1.402-6.02s-.357-.713-.357-1.767c0-1.654.958-2.89 2.151-2.89 1.014 0 1.503.761 1.503 1.673 0 1.018-.648 2.539-.982 3.95-.279 1.177.591 2.135 1.751 2.135 2.102 0 3.717-2.216 3.717-5.406 0-2.826-2.032-4.797-4.933-4.797-3.361 0-5.338 2.514-5.338 5.116 0 1.017.391 2.112.879 2.71a.354.354 0 0 1 .081.339c-.09.372-.29 1.177-.33 1.341-.053.217-.172.263-.397.158-1.48-.687-2.406-2.854-2.406-4.602 0-3.748 2.724-7.184 7.853-7.184 4.117 0 7.321 2.933 7.321 6.84 0 4.073-2.567 7.357-6.135 7.357-1.197 0-2.324-.621-2.708-1.352 0 0-.575 2.209-.71 2.707-.268 1.03-.997 2.065-1.578 2.89 1.183.364 2.434.561 3.738.561 6.632 0 12.004-5.372 12.004-12.004S18.636 0 12.004 0z"
          />
        </svg>
        <span>Pinterest</span>
      </div>

      <nav class="navegacion-principal">
        <a href="#" class="enlace-navegacion">Explorar</a>
        <a href="#" class="enlace-navegacion">Crear</a>
      </nav>
    </div>

    <div class="barra-busqueda">
      <input type="text" id="entrada-busqueda" placeholder="Buscar imágenes...">
      <button id="boton-busqueda">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </div>

    <div class="derecha-header">
      <button class="boton-icono" aria-label="Notificaciones">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      </button>

      <button class="boton-perfil" aria-label="Perfil de usuario">
        <img src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dummy=1" 
             alt="Avatar usuario" class="imagen-perfil">
      </button>
    </div>
  </div>
`;


    const entradaBusqueda = header.querySelector('#entrada-busqueda');
    const botonBusqueda = header.querySelector('#boton-busqueda');
    const logo = header.querySelector('#logo');

    const realizarBusqueda = () => {
        const consulta = entradaBusqueda.value.trim();
        if (consulta) {
            alBuscar(consulta);
            entradaBusqueda.value = '';
        }
    };

    botonBusqueda.addEventListener('click', realizarBusqueda);
    
    entradaBusqueda.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') realizarBusqueda();
    });

    logo.addEventListener('click', alClicLogo);

    document.body.prepend(header);
    
    return header;
}
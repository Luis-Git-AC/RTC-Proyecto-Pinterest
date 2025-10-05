export function mostrarMensaje(mensaje) {
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

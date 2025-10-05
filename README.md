RTC Proyecto: Pinterest Async

Réplica básica de Pinterest utilizando Vite, Vanilla JS y la API de Unsplash.

Configuración inicial del proyecto y estructura base de carpetas
Obtención y config de la API de Unsplash
Creación del archivo .env para almacenar la API key
Creación de los componentes y estructura del DOM
Componentes principales

Header → barra de búsqueda, logo y botones de perfil/notificaciones

ImageGrid → cuadrícula de tarjetas de imágenes

ImageCard → tarjeta individual con imagen, usuario y botón guardar

App.js — "Cerebro" de la aplicación Importa y ejecuta Header e ImageGrid Controla la carga inicial de imágenes Gestiona las búsquedas y fallbacks Muestra mensajes de error/éxito

main.js — Punto de entrada Inicializa la aplicación Carga todos los estilos CSS Espera a que el DOM esté listo Ejecuta App() para iniciar la aplicación

Correcciones 26/9

Error en el responsive ImageGrid corregido

Creado el archivo .gitignore, eliminé el repositorio porque no conseguía que no se viera el .env. Comenzando de cero elegí la plantilla Node de .gitignore que cubre los modulos y el .env que era lo que me interesaba

Reestructuración de las carpetas de los componentes, creo una carpeta para cada grupo de .js y .css

Modularización de App.js. Creo imagenes.js para manejar las funciones relacionadas con la API y las imagenes; mensajes.js maneja las funciones relacionadas con las notificaciones temporales (error, ...)

Correcciones 2:

Reemplazar el contenedor de la cuadrícula de <div> a <main> para mejorar la estructura semántica y la accesibilidad de la página

Refactorizar las funciones de carga y búsqueda de imágenes en una sola función.

Implementar overlay de datos en hover.

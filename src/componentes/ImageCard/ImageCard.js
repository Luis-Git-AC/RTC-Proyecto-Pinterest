import './image-card.css';
import { obtenerEstadisticas } from '../../api/unsplash.js';

function formatCount(n) {
    if (n === undefined || n === null) return '—';
    const num = Number(n);
    if (Number.isNaN(num)) return String(n);
    if (num < 1000) return String(num);
    if (num < 1_000_000) return Math.round(num / 1000) + 'K';
    return Math.round(num / 1_000_000) + 'M';
}

const statsCache = new Map();

export default function ImageCard({ imagen, alClic }) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'image-card';
    
    const formattedDate = (imagen && imagen.created_at) ?
        new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(imagen.created_at)) :
        '—';

    tarjeta.innerHTML = `
        <div class="image-container">
            <img src="${imagen.urls.small}"
                 alt="${imagen.alt_description || 'Imagen'}"
                 loading="lazy">

            <div class="card-overlay" aria-hidden="true">
                <div class="overlay-top-left">
                    <div class="badge views">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7zm0 11a4 4 0 110-8 4 4 0 010 8z" fill="currentColor"/></svg>
                        <span class="views-count">—</span>
                    </div>
                </div>
                <div class="overlay-top-right">
                    <div class="badge likes">
                        <!-- Heart icon (material-style, filled) -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="icon-heart">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span class="likes-count">${imagen.likes ?? '—'}</span>
                    </div>
                </div>

                <div class="overlay-center">
                    <div>
                        <button class="btn-visitar">Visitar</button>
                        <div class="upload-date">
                            <!-- simple upload icon + time -->
                            <svg class="icon-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M19 15v4H5v-4H3v4a2 2 0 002 2h12a2 2 0 002-2v-4h-2zM11 16h2v-5h3l-4-5-4 5h3v5z"/></svg>
                            <time datetime="${imagen.created_at || ''}">${formattedDate}</time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Avatar overlay: siempre visible -->
        <div class="author-avatar-overlay" role="group" aria-label="Información del autor">
            <img class="author-avatar" src="${imagen.user?.profile_image?.large || 'https://via.placeholder.com/56'}" alt="${imagen.user?.name || 'Autor'}" loading="lazy">
        </div>
            <!-- Author name as independent element (separate from avatar container) -->
            <div class="author-name-overlay" aria-hidden="false">${imagen.user?.name || ''}</div>
    `;

    const btnVisitar = tarjeta.querySelector('.btn-visitar');

    const isTouchDevice = typeof window !== 'undefined' && (
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    );
    const isTouch = isTouchDevice;

    let _docClickHandler = null;
    const showOverlay = () => {
        document.querySelectorAll('.image-card.hovered').forEach(el => {
            if (el !== tarjeta) el.classList.remove('hovered');
        });

        if (!tarjeta.classList.contains('hovered')) {
            tarjeta.classList.add('hovered');
            cargarStatsSiNecesario();
        }

        if (_docClickHandler) document.removeEventListener('click', _docClickHandler);
        _docClickHandler = (ev) => {
            if (!tarjeta.contains(ev.target)) {
                tarjeta.classList.remove('hovered');
                document.removeEventListener('click', _docClickHandler);
                _docClickHandler = null;
            }
        };
        document.addEventListener('click', _docClickHandler);
    };

    btnVisitar.addEventListener('click', (e) => {
        const url = imagen.links && imagen.links.html ? imagen.links.html : imagen.urls.full;

        if (isTouch && !tarjeta.classList.contains('hovered')) {
            e.stopPropagation();
            e.preventDefault();
            showOverlay();
            return;
        }

        const overlayEl = tarjeta.querySelector('.card-overlay');
        if (overlayEl) {
            const computed = window.getComputedStyle(overlayEl);
            const opacity = parseFloat(computed.opacity || '0');
            if (opacity < 0.99) {
                e.stopPropagation();
                e.preventDefault();

                const openIfStillHovered = () => {
                    if (tarjeta.classList.contains('hovered')) {
                        window.open(url, '_blank', 'noopener');
                    }
                };

                const onTransitionEnd = (ev) => {
                    if (ev && ev.propertyName && ev.propertyName !== 'opacity') return;
                    overlayEl.removeEventListener('transitionend', onTransitionEnd);
                    openIfStillHovered();
                };

                overlayEl.addEventListener('transitionend', onTransitionEnd);

                const fallback = setTimeout(() => {
                    overlayEl.removeEventListener('transitionend', onTransitionEnd);
                    openIfStillHovered();
                }, 450);

                const wrappedOnTransitionEnd = (ev) => {
                    clearTimeout(fallback);
                    onTransitionEnd(ev);
                };
                overlayEl.removeEventListener('transitionend', onTransitionEnd);
                overlayEl.addEventListener('transitionend', wrappedOnTransitionEnd);

                return;
            }
        }

        e.stopPropagation();
        window.open(url, '_blank', 'noopener');
    });

    const likesSpan = tarjeta.querySelector('.likes-count');
    if (likesSpan) {
        likesSpan.textContent = formatCount(Number(imagen.likes));
        likesSpan.title = imagen.likes ? imagen.likes.toLocaleString('es') : '';
    }
    const viewsSpan = tarjeta.querySelector('.views-count');
    if (viewsSpan && statsCache.has(imagen.id)) {
        const cached = statsCache.get(imagen.id);
        const v = cached?.views?.total ?? null;
        viewsSpan.textContent = formatCount(Number(v));
        viewsSpan.title = v ? v.toLocaleString('es') : '';
    }

    const avatarEl = tarjeta.querySelector('.author-avatar');
    if (avatarEl) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70;
        const lightness = 65; 
        const color = `hsl(${hue} ${saturation}% ${lightness}%)`;
        avatarEl.style.setProperty('--author-border-color', color);
    }

    const nameEl = tarjeta.querySelector('.author-name-overlay');
    if (nameEl) {
        const nombre = imagen.user?.name || '';
        nameEl.textContent = nombre;
        if (nombre) nameEl.title = nombre;
        nameEl.style.pointerEvents = 'none';
    }

    const imageContainer = tarjeta.querySelector('.image-container');
    let estadisticasCargando = false;

    const cargarStatsSiNecesario = async () => {
        if (statsCache.has(imagen.id) || estadisticasCargando) return;
        try {
            estadisticasCargando = true;
            const datos = await obtenerEstadisticas(imagen.id);
            statsCache.set(imagen.id, datos);
            const views = datos && datos.views && datos.views.total ? datos.views.total : null;
            const viewsSpan = tarjeta.querySelector('.views-count');
            if (viewsSpan) {
                viewsSpan.textContent = formatCount(Number(views));
                viewsSpan.title = views ? views.toLocaleString('es') : '';
            }
        } catch (err) {
        } finally {
            estadisticasCargando = false;
        }
    };


    if (isTouchDevice) {
        let overlayShownByTap = false;

        imageContainer.addEventListener('click', (e) => {
            if (!tarjeta.classList.contains('hovered')) {
                showOverlay();
                overlayShownByTap = true;
                e.stopPropagation();
                return;
            }

            if (overlayShownByTap) {
                overlayShownByTap = false;
                if (_docClickHandler) {
                    document.removeEventListener('click', _docClickHandler);
                    _docClickHandler = null;
                }
                return;
            }

        });
    } else {
        imageContainer.addEventListener('mouseenter', () => {
            showOverlay();
        });

        imageContainer.addEventListener('mouseleave', () => {
            tarjeta.classList.remove('hovered');
            if (_docClickHandler) {
                document.removeEventListener('click', _docClickHandler);
                _docClickHandler = null;
            }
        });
    }

    tarjeta.addEventListener('click', alClic);
    
    return tarjeta;
}


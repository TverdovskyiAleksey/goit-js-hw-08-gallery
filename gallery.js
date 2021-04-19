import itemsGallery from './gallery-items.js'

const galleryEl = document.querySelector('.js-gallery');
const lightBoxEl = document.querySelector('.js-lightbox');
const lightBoxOverlayEl = document.querySelector('.lightbox__overlay');
const lightBoxImgEl = document.querySelector('.lightbox__image');
const modalButtonCloseEl = document.querySelector('[data-action="close-lightbox"]');

function createGalleryMarkup(picturess) {
    return picturess.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <img class="gallery__image"
            src="${preview}" 
            alt="${description}"
            data-src="${original}" 
            data-descr="${description}"/>
        </li>
        `;
    })
    .join('');
};

const galleryItemEl = createGalleryMarkup(itemsGallery);
galleryEl.insertAdjacentHTML('beforeend', galleryItemEl);

galleryEl.addEventListener('click', onImageClick);

function onImageClick(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return
    };

    openModal();
    updatePictureAttr( e.target.dataset.src,e.target.alt)
};

function openModal() {
    window.addEventListener('keydown', onArrowKeyPress);
    window.addEventListener('keydown', onEscKeyPress);
    lightBoxEl.classList.add('is-open');
};

modalButtonCloseEl.addEventListener('click', onModalCloseButtonClick);

function onModalCloseButtonClick() {
    closeModal();
    updatePictureAttr('', '');
};

function closeModal() {
    window.removeEventListener('keydown', onArrowKeyPress);
    window.addEventListener('keydown', onEscKeyPress);
    lightBoxEl.classList.remove('is-open');
};

function updatePictureAttr(src,alt) {
    lightBoxImgEl.src = src;
    lightBoxImgEl.alt = alt;
};

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        closeModal();
        updatePictureAttr('','');
    };
};

lightBoxOverlayEl.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
    if (e.currentTarget === e.target) {
        closeModal();
        updatePictureAttr('', '');
    };
};

function onArrowKeyPress(e) {
    if (e.code === 'ArrowLeft') {
        const i = itemsGallery.findIndex(picture => picture.original === lightBoxImgEl.src) - 1;
        if (i === -1) {
            return
        }
        lightBoxImgEl.src = itemsGallery[i].original;
        lightBoxImgEl.alt = itemsGallery[i].description;
    } else if (e.code === 'ArrowRight') {
        const i = itemsGallery.findIndex(picture => picture.original === lightBoxImgEl.src) + 1;
        if (i === itemsGallery.length - 1) {
            return
        }   
        lightBoxImgEl.src = itemsGallery[i].original;
        lightBoxImgEl.alt = itemsGallery[i].description;
    };
};
import itemsGallery from './gallery-items.js'

const listEl = document.querySelector('.js-gallery');

const ligthBoxEl = document.querySelector('.js-lightbox')
const overlayEl = document.querySelector('.lightbox__overlay');
const imgEl = document.querySelector('.lightbox__image');
const buttonClsEl = document.querySelector('.lightbox__button');

function createGalleryMarkup(picturesArr) {
    return picturesArr.map(({ preview, original, description }) => {
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
}

const galleryItemEl = createGalleryMarkup(itemsGallery);
listEl.insertAdjacentHTML('beforeend', galleryItemEl);

listEl.addEventListener('click', onImgClick);

function onImgClick(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return
    }
    
    openModal()
    changePicturesSrc(e)
}

function openModal() {
    window.addEventListener('keydown', onLeftKeyPress);
    window.addEventListener('keydown', onRightKeyPress);
    window.addEventListener('keydown', onEscKeyPress);
    ligthBoxEl.classList.add('is-open'); 
}

function changePicturesSrc(e) {
    imgEl.src = e.target.dataset.src;
    imgEl.alt = e.target.alt;
}

buttonClsEl.addEventListener('click', onModalCloseButtonClick)

function onModalCloseButtonClick() {
    closeModal()
    cleanPicturesAtr()
}

function closeModal() {
    window.removeEventListener('keydown', onLeftKeyPress);
    window.removeEventListener('keydown', onRightKeyPress);
    window.removeEventListener('keydown', onEscKeyPress);
    ligthBoxEl.classList.remove('is-open');
}

function cleanPicturesAtr() {
    imgEl.src = '';
    imgEl.alt = '';
}

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        closeModal();
        cleanPicturesAtr();
    }
}

overlayEl.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
        closeModal()
        cleanPicturesAtr()
    }
}

function onLeftKeyPress(e) {
    if (e.code === 'ArrowLeft') {
        const i = itemsGallery.findIndex(picture => picture.original === imgEl.src) - 1;
        if (i === -1) {
            return;
        }
        imgEl.src = itemsGallery[i].original;
        imgEl.alt = itemsGallery[i].description;
    }
}

function onRightKeyPress(e) {
  if (e.code === 'ArrowRight') {
    const i = itemsGallery.findIndex(picture => picture.original === imgEl.src) + 1;
    if (i === itemsGallery.length - 1) {
      return;
    }
    imgEl.src = itemsGallery[i].original;
    imgEl.alt = itemsGallery[i].description;
  }
}
"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../js/photoswipe/photoswipe-lightbox.esm.js';
import PhotoSwipe from '../js/photoswipe/photoswipe.esm.js'


const photoswipe_pwa = () => {
    const lightbox = new PhotoSwipeLightbox({
    gallery: '#Instructions',
    children: '.pswp-gallery__item',
    imageClickAction: 'zoom',
    tapAction: 'zoom',
    pswpModule: PhotoSwipe
    });
    lightbox.init();
}
export default photoswipe_pwa;
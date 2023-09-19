"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../js/photoswipe/photoswipe-lightbox.esm.js';
import PhotoSwipe from '../js/photoswipe/photoswipe.esm.js'

const photoswipe_apptab = () => {
    const lightbox = new PhotoSwipeLightbox({
    gallery: '#devTools-Gallery',
    children: '.pswp-gallery__item',
    imageClickAction: 'zoom',
    tapAction: 'zoom',
    pswpModule: PhotoSwipe
    });
    const options = {
    gallery: '#devTools-Picture',
    children: '.pswp-gallery__item',
    imageClickAction: 'zoom',
    tapAction: 'zoom',
    pswpModule: PhotoSwipe
    }
    const picbox = new PhotoSwipeLightbox(options);
    lightbox.init();
    picbox.init();
}
export default photoswipe_apptab
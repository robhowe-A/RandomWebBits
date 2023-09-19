"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../js/photoswipe/photoswipe-lightbox.esm.js';
import PhotoSwipe from '../js/photoswipe/photoswipe.esm.js'


const photoswipe_inspctpgs = () => {
    const options = {
    gallery:'#inspectPages-Gallery',
    children:'.pswp-gallery__item',
    pswpModule: PhotoSwipe
    };
    const lightbox2 = new PhotoSwipeLightbox(options);
    lightbox2.init();
    }
export default photoswipe_inspctpgs;
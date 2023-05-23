//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../photoswipe/photoswipe-lightbox.esm.js';
const options = {
  gallery:'#inspectPages-Gallery',
  children:'.pswp-gallery__item',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
};
const lightbox2 = new PhotoSwipeLightbox(options);
lightbox2.init();

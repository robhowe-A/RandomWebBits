import PhotoSwipeLightbox from '../photoswipe/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#devTools-Gallery',
  children: '.pswp-gallery__item',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
});
const picbox = new PhotoSwipeLightbox({
  gallery: '#devTools-Picture',
  children: '.pswp-gallery__item',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
});
lightbox.init();
picbox.init();
"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../photoswipe/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#Instructions',
  children: '.pswp-gallery__item',
  imageClickAction: 'zoom',
  tapAction: 'zoom',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
});
lightbox.init();

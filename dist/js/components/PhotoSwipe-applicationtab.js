//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from '../photoswipe/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#devTools-Gallery',
  children: '.pswp-gallery__item',
  imageClickAction: 'zoom',
  tapAction: 'zoom',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
});
const options = {
  gallery: '#devTools-Picture',
  children: '.pswp-gallery__item',
  imageClickAction: 'zoom',
  tapAction: 'zoom',
  pswpModule: () => import('../photoswipe/photoswipe.esm.js')
}
const picbox = new PhotoSwipeLightbox(options);
lightbox.init();
picbox.init();

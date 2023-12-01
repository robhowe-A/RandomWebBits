"strict mode";
//--Copyright (c) 2023 Robert A. Howell
import PhotoSwipeLightbox from "../js/photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "../js/photoswipe/photoswipe.esm.js";

const photoswipe_apptab = () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#devTools-Gallery",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  });
  const options = {
    gallery: "#devTools-Picture",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const all = {
    gallery: "#ElementsTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allConsole = {
    gallery: "#ConsoleTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allSources = {
    gallery: "#SourcesTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allNetwork = {
    gallery: "#NetworkTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allPerformance = {
    gallery: "#PerformanceTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allMemory = {
    gallery: "#MemoryTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allSecurity = {
    gallery: "#SecurityTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allLighthouse = {
    gallery: "#LighthouseTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allCSSOverview = {
    gallery: "#CSSOverviewTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const picbox = new PhotoSwipeLightbox(options);
  const page = new PhotoSwipeLightbox(all);
  const pageConsole = new PhotoSwipeLightbox(allConsole);
  const pageSources = new PhotoSwipeLightbox(allSources);
  const pageNetwork = new PhotoSwipeLightbox(allNetwork);
  const pagePerformance = new PhotoSwipeLightbox(allPerformance);
  const pageMemory = new PhotoSwipeLightbox(allMemory);
  const pageSecurity = new PhotoSwipeLightbox(allSecurity);
  const pageLighthouse = new PhotoSwipeLightbox(allLighthouse);
  const pageCSSOverview = new PhotoSwipeLightbox(allCSSOverview);

  lightbox.init();
  picbox.init();
  page.init();
  pageConsole.init();
  pageSources.init();
  pageNetwork.init();
  pagePerformance.init();
  pageMemory.init();
  pageSecurity.init();
  pageLighthouse.init();
  pageCSSOverview.init();

};

const photoswipe_pwa = () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#Instructions",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  });
  lightbox.init();
};

const photoswipe_inspctpgs = () => {
  const options = {
    gallery: "#inspectPages-Gallery",
    children: ".pswp-gallery__item",
    pswpModule: PhotoSwipe,
  };
  const lightbox2 = new PhotoSwipeLightbox(options);
  lightbox2.init();
};
export { photoswipe_pwa as PS_pwa, photoswipe_apptab as PS_at, photoswipe_inspctpgs as PS_ip };

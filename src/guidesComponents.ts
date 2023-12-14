//--Copyright (c) 2023 Robert A. Howell
import classComponents from "./classComponents";
import slideShowWidget from "./components/guides/slideShowWidget";
import { ps_Pwa, ps_At, ps_Ip } from "./components/guides/photoSwipe";
import RwbPerf from "./models/scriptPerf";

const guideComponents = {
  checkPage: (page: string) => {
    classComponents.fourohfour();

    switch (page) {
      // Initialize slideshow components
      case "/guides/pwaicon.html":
        ps_Pwa();
        slideShowWidget.init();
        break;
      case "/guides/elementinspect.html":
      case "/guides/https.html":
        ps_Pwa();
        break;
      case "/guides/devtools/applicationtab.html":
      case "/guides/devtools/elementstab.html":
      case "/guides/devtools/consoletab.html":
      case "/guides/devtools/sourcestab.html":
      case "/guides/devtools/networktab.html":
      case "/guides/devtools/performancetab.html":
      case "/guides/devtools/memorytab.html":
      case "/guides/devtools/securitytab.html":
      case "/guides/devtools/cssoverviewtab.html":
      case "/guides/clearcookiesquickly.html":
        ps_At();
        break;
      case "/guides/inspectpages.html":
        ps_Ip();
        break;
      case "/guides/devtools/lighthousetab.html":
        const lighthouseTab = document.querySelector("article.lh-root");
        const lighthouseTabDetailsElem = document.querySelector("#lighthousearticle");
        lighthouseTabDetailsElem.insertAdjacentElement("afterbegin", lighthouseTab);
        ps_At();
        break;
    }
  },
  init: () => {
    let page = window.location.pathname;
    const pagePerf = new RwbPerf("Guidecomponents"); //measure performance

    guideComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  load: () => {},
};

window.addEventListener("DOMContentLoaded", guideComponents.init)

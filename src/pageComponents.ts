//--Copyright (c) 2023 Robert A. Howell
import AcronymsElem from "./components/acronyms-element";
import classComponents from "./classComponents";
import { rwbCardsWidget, webBitsSlideShow, webBitsAccordion } from "./components/webBits";
import expandingListDOMWidget from "./components/expandingListDomWidget";
import activeCardsWidget from "./components/growingCard";
import slideShowWidget from "./components/slideShowWidget";
import { ps_Pwa, ps_At, ps_Ip } from "./components/photoSwipe";
import { cssexColorCode, htmlexColorCode, urlexColorCode } from "./components/colorCode";
import flashCardGameWidget from "./components/flashcardGameWidget";
import RwbPerf from "./models/scriptPerf";
import domainLookup from "./components/domainLookup";
import sliderBar from "./components/sliderBar";
import hslColorWidget from "./components/hslColor";
import latencyCalculator from "./components/calculate";

const pageComponents = {
  checkPage: (page: string) => {
    classComponents.fourohfour();

    switch (page) {
      //'Index' and 'Pages' routes, add cards widget
      case "/RandomWebBits/index.html":
      case "/index.html":
      case "/":
      case "":
      case "/RandomWebBits/pages.html":
      case "/pages.html":
        rwbCardsWidget.init(); // cards widget initialization
        webBitsSlideShow.init();
        webBitsAccordion.init();
        break;
      // dom.html page uses expandingLists component
      case "/pages/dom.html":
      case "/pages/svg.html":
        expandingListDOMWidget.init();
        break;
      // Initialize webIDE widget
      case "/pages/webides.html":
        activeCardsWidget.init();
        break;
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
      // Initialize CSSEX components
      case "/pages/css.html":
        cssexColorCode.init();
        break;
      // Initialize htmlexColorCode components
      case "/pages/html.html":
        htmlexColorCode.init();
        break;
      // Initialize urlexColorCode components
      case "/pages/url.html":
        urlexColorCode.init();
        break;
      // Initialize flashcard components
      case "/flashcards.html":
        flashCardGameWidget.init();
        break;
      // Initialize domain name lookup
      case "/pages/domainlookup.html":
        domainLookup.init();
        break;
      case "/pages/markup.html":
        sliderBar.init();
        break;
      // Initialize HSL color picker
      case "/pages/hsl.html":
        hslColorWidget.init();
        break;
      // Initialize Propagation Latency calculator
      case "/pages/latency.html":
        latencyCalculator.init();
        break;
      case "/guides/devtools/lighthousetab.html":
        const lighthouseTab = document.querySelector("article.lh-root");
        const lighthouseTabDetailsElem = document.querySelector("#lighthousearticle");
        lighthouseTabDetailsElem.insertAdjacentElement("afterbegin", lighthouseTab);
        ps_At();
        break;
    }
  },
  init: (page: string) => {
    const pagePerf = new RwbPerf("Pagecomponents"); //measure performance

    customElements.define("acronyms-list", AcronymsElem);
    pageComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  load: () => {},
};

export default pageComponents;

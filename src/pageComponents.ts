//--Copyright (c) 2023 Robert A. Howell
import {RWBCardsWidget, WebBitsSlideShow, WebBitsAccordion} from "./components/webBits";
import ExpandingListDOMWidget from "./components/expandingListDomWidget";
import ActiveCardsWidget from "./components/growingCard";
import flashcardgameWidget from "./components/flashcardGameWidget";
import slideshowWidget from "./components/slideShowWidget";
import {cssexColorCode, htmlexColorCode, urlexColorCode} from "./components/colorCode";
import RWBPerf from "./models/scriptPerf";
import domainlookup from "./components/domainLookup";
import sliderbar from "./components/sliderbar";
import hslcolorwidget from "./components/hslColor";

import { AcronymsElem } from "./components/acronyms-element";
import { PS_pwa, PS_at, PS_ip } from "./components/photoSwipe";
import ClassComponents from "./classComponents";
import latencyCalculator from "./components/calculate";

const PageComponents = {
  CheckPage: (page: string) => {
    ClassComponents.fourohfour();

    switch (page) {
      //'Index' and 'Pages' routes, add cards widget
      case "/RandomWebBits/index.html":
      case "/index.html":
      case "/":
      case "":
      case "/RandomWebBits/pages.html":
      case "/pages.html":
        RWBCardsWidget.init(); // cards widget initialization
        WebBitsSlideShow.init();
        WebBitsAccordion.init();
        break;
      // dom.html page uses expandingLists component
      case "/pages/dom.html":
      case "/pages/svg.html":
        ExpandingListDOMWidget.init();
        break;
      // Initialize webIDE widget
      case "/pages/webides.html":
        ActiveCardsWidget.init();
        break;
      // Initialize slideshow components
      case "/guides/pwaicon.html":
        PS_pwa();
        slideshowWidget.init();
        break;
      case "/guides/elementinspect.html":
      case "/guides/https.html":
        PS_pwa();
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
        PS_at();
        break;
      case "/guides/inspectpages.html":
        PS_ip();
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
        flashcardgameWidget.init();
        break;
      // Initialize domain name lookup
      case "/pages/domainlookup.html":
        domainlookup.init();
        break;
      case "/pages/markup.html":
        sliderbar.init();
        break;
      // Initialize HSL color picker
      case "/pages/hsl.html":
        hslcolorwidget.init();
        break;
      // Initialize Propagation Latency calculator
      case "/pages/latency.html":
        latencyCalculator.init();
        break;
      case "/guides/devtools/lighthousetab.html":
        const LighthouseTab = document.querySelector("article.lh-root");
        const LighthouseTabDetailsElem = document.querySelector("#lighthousearticle");
        LighthouseTabDetailsElem.insertAdjacentElement("afterbegin", LighthouseTab);
        PS_at();
        break;
    }
  },
  init: (page: string) => {
    const pageperf = new RWBPerf("Pagecomponents"); //measure performance

    customElements.define("acronyms-list", AcronymsElem);
    PageComponents.CheckPage(page);

    pageperf.end(); //end performance measure
  },
  load: () => {},
};

export default PageComponents;

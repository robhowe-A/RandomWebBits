//--Copyright (c) 2023 Robert A. Howell
import ExpandingListDOMWidget from "./components/ExpandingListDOMWidget";
import ActiveCardsWidget from "./components/GrowingCard";
import flashcardgameWidget from "./components/FlashcardGameWidget";
import slideshowWidget from "./components/SlideShowWidget";
import cssexColorCode from "./components/cssex";
import htmlexColorCode from "./components/colorcode";
import RWBCardsWidget from "./components/WebBits";
import urlexColorCode from "./components/colorcodeurl";
import RWBPerf from "./models/ScriptPerf";
import domainlookup from "./components/domainlookup";
import sliderbar from "./components/sliderbar";
import hslcolorwidget from "./components/hslcolor";

import WebBitsSlideShow from "./components/WebBitsSlideshow";
import { AcronymsElem } from "./components/acronyms-element";
import { PS_pwa, PS_at, PS_ip } from "./components/PhotoSwipe";
import ClassComponents from "./ClassComponents";
import latencyCalculator from "./components/calculate";
import WebBitsAccordion from "./components/WebBitsAccordian";

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

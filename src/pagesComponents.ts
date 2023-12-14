//--Copyright (c) 2023 Robert A. Howell
import AcronymsElem from "./components/page/acronyms-element";
import classComponents from "./classComponents";
import expandingListDOMWidget from "./components/page/expandingListDomWidget";
import activeCardsWidget from "./components/page/growingCard";
import { cssexColorCode, htmlexColorCode, urlexColorCode } from "./components/page/colorCode";
import RwbPerf from "./models/scriptPerf";
import domainLookup from "./components/page/domainLookup";
import sliderBar from "./components/page/sliderBar";
import hslColorWidget from "./components/page/hslColor";
import latencyCalculator from "./components/page/calculate";

const pageComponents = {
  checkPage: (page: string) => {
    classComponents.fourohfour();

    switch (page) {
      // dom.html page uses expandingLists component
      case "/pages/dom.html":
      case "/pages/svg.html":
        expandingListDOMWidget.init();
        break;
      // Initialize webIDE widget
      case "/pages/webides.html":
        activeCardsWidget.init();
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
    }
  },
  init: () => {
    let page = window.location.pathname;
    const pagePerf = new RwbPerf("Pagecomponents"); //measure performance

    customElements.define("acronyms-list", AcronymsElem);
    pageComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  load: () => {},
};

window.addEventListener("DOMContentLoaded", pageComponents.init)

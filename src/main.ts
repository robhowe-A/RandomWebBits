"strict mode";
//--Copyright (c) 2023 Robert A. Howell
import HeaderFooter from "./components/HeaderFooter";
import PageComponents from "./PageComponents";
import ClassComponents from "./ClassComponents";
import RWBPerf from "./models/ScriptPerf";

const mainperf = new RWBPerf("main");

// entry point
/**
 * TypeScript entry point. This script initializes page components and models as
 *  they're needed main.init() is the initialization of "typescript.js".
 */
<<<<<<< HEAD
const RWB = {
  /**
   * Initialize page widgets and application functions.
   */
  init: () => {
    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", RWB.main);
  },
  main: () => {
    // Add header and footer components
    HeaderFooter.headerWidget.init();
    HeaderFooter.footerWidget.init();

    let page: string = window.location.pathname;

    // Initialize page components
    PageComponents.init(page);

    // Initialize element components
    ClassComponents.init(page);

    mainperf.end();
=======
const main = {
  /**
   * Initialize page widgets and application functions.
   */
  init() {
    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", () => {
      // Add header and footer components
      HeaderFooter.headerWidget.init();
      HeaderFooter.footerWidget.init();

      let page: string = window.location.pathname;

      // Initialize page components
      PageComponents.init(page);

      // Initialize element components
      ClassComponents.init(page);

      mainperf.end();
    });
>>>>>>> 1cc56c337858e9aee18e8a24841018bd8bf2ec3e
  },
};

RWB.init();

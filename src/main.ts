"strict mode";
//--Copyright (c) 2023 Robert A. Howell
import headerFooter from "./components/headerFooter";
import PageComponents from "./pageComponents";
import ClassComponents from "./classComponents";
import RWBPerf from "./models/scriptPerf";

const mainperf = new RWBPerf("main");

// entry point
/**
 * TypeScript entry point. This script initializes page components and models. 
 * Start is the entry point.
 */
const RWB = {
  main: () => {
    // Add header and footer components
    headerFooter.headerWidget.init();
    headerFooter.footerWidget.init();

    let page: string = window.location.pathname;

    // Initialize page components
    PageComponents.init(page);

    // Initialize element components
    ClassComponents.init(page);

    mainperf.end();
  },
  /**
   * Initialize page widgets and application functions.
   */
  start: () => {
    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", RWB.main);
  },
};

RWB.start();

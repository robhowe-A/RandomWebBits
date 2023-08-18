"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import HeaderFooter from './components/HeaderFooter';
import PageComponents from './components/PageComponents';
import ClassComponents from './components/ClassComponents';
import mobileAbbrMarkup from './components/mobileMarkup'
import RWBPerf from './models/ScriptPerf'

const mainperf = new RWBPerf("main");

// entry point
/**
 * TypeScript entry point. This script initializes page components and models as
 *  they're needed main.init() is the initialization of "typescript.js".
 */
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

            // Initialize page components
            PageComponents.init();

            // Initialize element components
            ClassComponents.init();

            // <abbr></abbr> styles: implemented for mobile devices
            mobileAbbrMarkup.init();

            mainperf.end();
        })
    }    
};

main.init();

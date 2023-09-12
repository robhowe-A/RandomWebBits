//--Copyright (c) 2023 Robert A. Howell
import ExpandingListDOMWidget from './ExpandingListDOMWidget';
import ActiveCardsWidget from './GrowingCard';
import flashcardgameWidget from './FlashcardGameWidget';
import slideshowWidget from './SlideShowWidget';
import cssex from './cssex';
import htmlexColorCode from './colorcode';
import RWBCardsWidget from './WebBits';
import urlexColorCode from './colorcodeurl';
import RWBPerf from '../models/ScriptPerf';
import domainlookup from './domainlookup';
import sliderbar from './sliderbar';
import hslcolorwidget from './hslcolor';
import notfound404widget from './404';

const PageComponents = {
    init: () => {
        const pageperf = new RWBPerf("Pagecomponents"); //measure performance

        PageComponents.CheckPage();
        pageperf.end(); //end performance measure
    },
    CheckPage: () => {
        switch (window.location.pathname) {
            //'Index' and 'Pages' routes, add cards widget
            case '/RandomWebBits/index.html':
            case '/index.html':
            case '/':
            case '':
            case '/RandomWebBits/pages.html':
            case '/pages.html':
                RWBCardsWidget.init(); // cards widget initialization
                break;
            // dom.html, svg.html page uses expandingLists component
            case '/pages/dom.html':
            case '/pages/svg.html':
                ExpandingListDOMWidget.init();
                break;
            // Initialize webIDE widget
            case '/pages/webides.html':
                ActiveCardsWidget.init();
                break;
            // Initialize slideshow components
            case '/guides/pwaicon.html':
                slideshowWidget.init();
                break;
            // Initialize CSSEX components
            case '/pages/css.html':
                cssex.CSSEXColorCode();
                break;
            // Initialize htmlexColorCode components
            case '/pages/html.html':
                htmlexColorCode.HTMLEXColorCode();
                break;
            // Initialize urlexColorCode components
            case '/pages/url.html':
                urlexColorCode.URLEXColorCode();
                break;
            // Initialize flashcard components
            case '/flashcards.html':
                flashcardgameWidget.init();
                break;
            // Initialize domain name lookup
            case '/pages/domainlookup.html':
                domainlookup.init();
                break;
            case '/pages/markup.html':
                sliderbar.init();
                break;
            // Initialize HSL color picker
            case '/pages/hsl.html':
                hslcolorwidget.inithslcolorpicker();
                break;
            case '/404.html':
                notfound404widget.init();
        }
    }
}

export default PageComponents;

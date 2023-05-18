//--Copyright (c) Robert A. Howell
import HeaderFooter from './components/HeaderFooter';
import RWBCardsWidget from './components/WebBits';
import ToDosWidget from './components/ToDos';
import DictionaryWidget from './components/DictionaryWidget';
import ExpandingListDOMWidget from './components/ExpandingListDOMWidget';
import ActiveCardsWidget from './components/GrowingCard';
import flashcardgameWidget from './components/FlashcardGameWidget';

// entry point
(() => {
    //PERF: let t1 = performance.now();
    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", () => {

        //'Index' and 'Pages' routes, add cards widget
        if (
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '' ||
            window.location.pathname == '/RandomWebBits/pages.html' ||
            window.location.pathname == '/pages.html') {
            RWBCardsWidget.init(); // cards widget initialization
        }

        // Add header and footer components
        HeaderFooter.headerWidget.init();
        HeaderFooter.footerWidget.init();

        // Initialize page components
        // dom.html page uses expandingLists component
        if (window.location.pathname == '/pages/dom.html' ||
            window.location.pathname == '/pages/svg.html') {
            ExpandingListDOMWidget.init();
        }

        // Initialize webIDE widget
        if (window.location.pathname == '/pages/webides.html') {
            ActiveCardsWidget.init();
        }

        // Initialize webIDE page components
        if (window.location.pathname == '/flashcards.html') {
            flashcardgameWidget.init();
        }

        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement) {
            DictionaryWidget.init(dictionaryElement);
        }

        // Add ToDos widget if that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            ToDosWidget.init(toDosElement);

        //PERF: let t2 = performance.now();
        //PERF: const totaltime = t2 - t1;
        //PERF: console.log("the time is: ", totaltime);
    })

})();
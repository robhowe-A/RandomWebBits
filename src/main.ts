//--Copyright (c) Robert A. Howell
import HeaderFooter from './components/headerfooter';
import RWBCardsWidget from './components/WebBits'
import ToDosWidget from './components/todos';
import DictionaryWidget from './components/dictionarywidget';
import ExpandingListDOMWidget from './components/expandingListDOMWidget';
import ActiveCardsWidget from './components/growingcard';

// entry point
(() => {
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
        if (window.location.pathname == '/pages/dom.html') {
            ExpandingListDOMWidget.init();
        }
        if (window.location.pathname == '/pages/webides.html') {
            ActiveCardsWidget.init();
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
    })

})();
//--Copyright (c) Robert A. Howell
import cardsWidget from './components/WebBits'
import dictionaryWidget from './components/dictionarywidget';
import todosWidget from './components/todos';
import HEADERFOOTER from './components/headerfooter';
import expandingListDOMWidget from './components/expandingListDOMWidget';
import activeCard from './components/growingcard';

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
            cardsWidget.init(); // cards widget initialization
        }

        // Add header and footer components
        HEADERFOOTER.headerWidget.init();
        HEADERFOOTER.footerWidget.init();

        // Initialize page components
        // dom.html page uses expandingLists component
        if ( window.location.pathname == '/pages/dom.html') {
            expandingListDOMWidget.init();
        }
        if ( window.location.pathname == '/pages/webide.html') {
            activeCard.init();
        }

        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement) {
            dictionaryWidget.init(dictionaryElement);
        }

        // Add ToDos widget if that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            todosWidget.init(toDosElement);
    })

})();
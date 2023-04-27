//--Copyright (c) Robert A. Howell
import cardsWidget from './components/WebBits'
import dictionaryWidget from './components/dictionary';
import todosWidget from './components/todos';
import HEADERFOOTER from './components/headerfooter';
import expandingList from './expandingList'

(() => {
    window.addEventListener("DOMContentLoaded", () => {
        if ( //'Index' and 'Pages' route, add cards widget first
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '' ||
            window.location.pathname == '/RandomWebBits/pages.html' ||
            window.location.pathname == '/pages.html') {
            cardsWidget.init();
        }
        // Add the header and footer
        HEADERFOOTER.headerWidget.init();
        HEADERFOOTER.footerWidget.init();

        // Initialize page components
        // dom.html page uses expandingLists component
        if ( 
            window.location.pathname == '/pages/dom.html'){
                expandingList.init();
            }

        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement)
            dictionaryWidget.init(dictionaryElement);
            const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            todosWidget.init(toDosElement);
    })

})();
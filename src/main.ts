"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import HeaderFooter from './components/HeaderFooter';
import RWBCardsWidget from './components/WebBits';
import ToDosWidget from './components/ToDos';
import DictionaryWidget from './components/DictionaryWidget';
import ExpandingListDOMWidget from './components/ExpandingListDOMWidget';
import ActiveCardsWidget from './components/GrowingCard';
import flashcardgameWidget from './components/FlashcardGameWidget';
import slideshowWidget from './components/SlideShowWidget';
import cssex from './components/cssex'
import htmlexColorCode from './components/colorcode'

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
            switch (window.location.pathname) {
                // dom.html page uses expandingLists component
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
                // Initialize flashcard components
                case '/flashcards.html':
                    flashcardgameWidget.init();
                    break;
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
            main.mobileAbbrMarkup();
        })
    },
    /**
     * Attribute tags on mobile do not have hover option. This function adds a click
     *  ability to define an abbr tag, than rely on the title attribute.
     */
    mobileAbbrMarkup() {
        /**
         * 
         */
        class AbbrOpen{
            isOpen: boolean = false;
            abbrElement: HTMLElement;
            

            constructor(){
                this.isOpen = true;
            };
        }
        const allabbreviationelems = document.querySelectorAll("abbr");
        if(allabbreviationelems.length > 0){
            for (let abbr of allabbreviationelems){
                let abbrev = new AbbrOpen();
                abbrev.abbrElement = abbr;

                abbrev.abbrElement.addEventListener("click", (e) => {
                    e.preventDefault();
                    let abbrtitleattrval:string = abbrev.abbrElement.getAttribute("title");
                    let description: HTMLSpanElement;

                    if (e.target == abbr){
                        if(abbrev.abbrElement.children.length < 1){ //create the span element
                            description = abbrev.abbrElement.appendChild(document.createElement("span"));
                            description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(160)})`;
                        }                        
                        else { //show the span element
                            description = abbrev.abbrElement.querySelector("span");
                            description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(160)})`;
                        }
                    }
                    abbrev.abbrElement.addEventListener("mouseleave", () => {

                            description.textContent = "";
                    });
                });
            }
        }
    }
};

main.init();
"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import HeaderFooter from './components/HeaderFooter';
import PageComponents from './components/PageComponents';
import ClassComponents from './components/ClassComponents';

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
        const t1 = performance.now(); //PERF
        let t2: number;
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
            main.mobileAbbrMarkup();
            
            t2 = performance.now(); //PERF
            console.log(`Main execution time is: ${t2 - t1}`); //PERF
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
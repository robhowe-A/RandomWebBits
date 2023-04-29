//--Copyright (c) Robert A. Howell
import { ExpandingList } from "./components/expandingList";

const expandingList = {
    init:() => {
        // Define the expanding list element, for use within the page
        customElements.define('expanding-list', ExpandingList, { extends: 'ul' });

        // "DOM" page specific properties
        // Add a title attribute to all li-span that can expand further
        const expandableLiOpenOpen = document.querySelectorAll(`ul[is="expanding-list"] li span:first-child`);
        const expandableLiCloseSpan = document.querySelectorAll(`ul[is="expanding-list"] li span:nth-child(3)`);

        // Set attributes and property values for expanding-element expandable elements
        for (let span of expandableLiOpenOpen){
            span.setAttribute('title', 'Select to expand...');
            span.setAttribute('tabindex', '0');
            // Add a click event listener to the 'DOM' items elements
            // --->when clicked, change the title property to reflect open or closed status
            span.addEventListener('click', (e) => {
                e.preventDefault();
                span.getAttribute('title') == 'Select to expand...' 
                    ? (() =>{
                        span.setAttribute('title', 'Select to close...');
                        if (span.nextElementSibling.nextElementSibling == null) return;
                        span.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to close.');
                    })()
                    : (() => {
                        span.setAttribute('title', 'Select to expand...' );
                        if (span.nextElementSibling.nextElementSibling == null) return;
                        span.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to expand.');
                    })();
            })
        }
        // Set property of closing span elements
        for (let span of expandableLiCloseSpan){
            span.setAttribute('title', 'Select opening element tag to expand.');
        }
    }
}

export default expandingList;
//--Copyright (c) Robert A. Howell
import { ExpandingList } from "./components/expandingList";

const expandingList = {
    init:() => {
        // Define the new element
        customElements.define('expanding-list', ExpandingList, { extends: 'ul' });

        // Add title attribute to all li that can expand further
        const expandableLiOpenOpen = document.querySelectorAll(`ul[is="expanding-list"] li span:first-child`);
        const expandableLiCloseSpan = document.querySelectorAll(`ul[is="expanding-list"] li span:nth-child(3)`);

        for (let li of expandableLiOpenOpen){
            li.setAttribute('title', 'Select to expand...');
            li.addEventListener('click', (e) => {
                e.preventDefault();
                li.getAttribute('title') == 'Select to expand...' ? (() =>{
                    li.setAttribute('title', 'Select to close...');
                    if (li.nextElementSibling.nextElementSibling == null) return;
                    li.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to close.');
                })()
                : (() => {
                    li.setAttribute('title', 'Select to expand...' );
                    if (li.nextElementSibling.nextElementSibling == null) return;
                    li.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to expand.');
                })();
            })
            li.setAttribute('tabindex', '0');
        }
        for (let li of expandableLiCloseSpan){
            li.setAttribute('title', 'Select opening element tag to expand.');
        }
    }
}

export default expandingList;
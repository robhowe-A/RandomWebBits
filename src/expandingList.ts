import { ExpandingList } from "./components/expandingList";

const expandingList = {
    init:() => {
        // Define the new element
        customElements.define('expanding-list', ExpandingList, { extends: 'ul' });

        // Add title attribute to all li that can expand further
        const expandableLis = document.querySelectorAll(`ul[is="expanding-list"] li span`);

        for (let li of expandableLis){
            li.setAttribute('title', 'Click to expand...');
        }
    }
}

export default expandingList;
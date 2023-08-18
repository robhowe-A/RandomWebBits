//--Copyright (c) 2023 Robert A. Howell

const domainlookup = {
    init: () => {
        // Get the form, assign to a variable
        const form = document.getElementById('searchWhoIS') as HTMLFormElement | null;
        if (form == null){ //If the form is not found, throw exception.
            throw new ReferenceError("Lookup form not found.");
        }
        form.addEventListener("submit", domainlookup.searchWHOIS);
    },
    searchWHOIS: () => {
        let inputelem = document.getElementById('txtSearch') as HTMLInputElement;
        let value = inputelem.value;
        var URL = 'https://www.whois.com/whois/' + value;
        window.open(URL, '_blank');
        return false;
    }
}

export default domainlookup;
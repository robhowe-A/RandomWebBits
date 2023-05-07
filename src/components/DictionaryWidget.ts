//--Copyright (c) Robert A. Howell
import { DictionarySearch, DictionarySearchMarkup } from "../models/DictionarySearch"

const DictionaryWidget = {
    init: (elem: Element) => {
        let dictionarysearch = new DictionarySearch();

        // Create the dictionary widget, call create
        var Srchelements = DictionarySearchMarkup.createDictionaryWidgetMarkup(elem);

        // Initialize event listeners: word search, button clicks, etc
        dictionarysearch.addWordSearchEvents(Srchelements);

        // Find items pre-existing in local storage/cache
        DictionarySearchMarkup.getLocalStorageWordCaches();

    }
};

export default DictionaryWidget;
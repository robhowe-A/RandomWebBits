//--Copyright (c) Robert A. Howell
import { DictionarySearch } from "../models/DictionarySearch"

/**
 * Component containing the dictionary widget's creation.
 */
const DictionaryWidget = {
    /**
     * Create a dictionary search widget by calling the constructor.
     * @param elem - Element containing 'dictionaryWidget' class
     */
    init: (elem: Element) => {
        // DictionarySearch constructor
        new DictionarySearch(elem);
    }
};

export default DictionaryWidget;
//--Copyright (c) 2023 Robert A. Howell
import { DictionarySearchWidget } from "../models/DictionarySearch"

/**
 * Component containing the dictionary widget's creation.
 */
const DictionaryWidget = {
    /**
     * This initialization function creates a dictionary search widget by calling the
     *  constructor.
     * @param elem - Element containing 'dictionaryWidget' class
     */
    init: (elem: Element) => {
        // DictionarySearch constructor
        Object.create(new DictionarySearchWidget(elem));
    }
};

export default DictionaryWidget;

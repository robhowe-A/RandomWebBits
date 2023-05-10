//--Copyright (c) Robert A. Howell
import { DictionarySearch, } from "../models/DictionarySearch"

const DictionaryWidget = {
    init: (elem: Element) => {
        // Create the dictionary widget
        // DictionarySearch constructor calls initial markup creation
        new DictionarySearch(elem);
    }
};

export default DictionaryWidget;
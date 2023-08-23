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
    init: () => {
        let dictionaryWidgetStartingElement: Element
        try{
            dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");
        }
        catch (err){
            console.log("%cCould not query dictionary widget element.", "color:orange;")
        }

        // DictionarySearch constructor
        Object.create(new DictionarySearchWidget(dictionaryWidgetStartingElement));
    }
};

export default DictionaryWidget;

//--Copyright (c) 2023 Robert A. Howell
import { DictionarySearch } from "../models/dictionarySearch";

/**
 * Component containing the dictionary widget's creation.
 */
const dictionaryWidget = {
  /**
   * This initialization function creates a dictionary search widget by calling the
   *  constructor.
   * @param elem - Element containing 'dictionaryWidget' class
   */
  init: () => {
    let dictionaryWidgetStartingElement: Element;
    dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");

    // DictionarySearch constructor
    Object.create(new DictionarySearch(dictionaryWidgetStartingElement));
  },
};

export default dictionaryWidget;

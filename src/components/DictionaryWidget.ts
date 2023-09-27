//--Copyright (c) 2023 Robert A. Howell
import { DictionarySearch } from "../models/DictionarySearch";
import RWBError from "../models/RWBErrorBus";

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
    let dictionaryWidgetStartingElement: Element;
    dictionaryWidgetStartingElement =
      document.querySelector(".dictionaryWidget");

    // DictionarySearch constructor
    Object.create(new DictionarySearch(dictionaryWidgetStartingElement));
  },
};

export default DictionaryWidget;

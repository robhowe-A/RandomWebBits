//--Copyright (c) 2023 Robert A. Howell
import { DictionarySearchElements } from "./WidgetMarkupElements";

/**
 * A DictionarySearchWidget is made to create the markup needed for the
 *  Dictionary Search. Elements are created and appended to the page to the class
 *  'dictionaryWidget'
 */
export default class DictionarySearchMarkup {
  public searchElements: DictionarySearchElements;

  constructor(elem: Element){
    //insert the widget after the passed in "elem"
    if (elem == undefined) {
      console.log(`%cThere is no "dictionaryWidget" class on this page.`, "color: orange;");
      return;
    }
    if (!elem.classList.contains("dictionaryWidget")) {
      console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
      return;
    }
    this.createDictionaryWidgetMarkup(elem);
  }
  /**
   * Primary widget markup structuring the widget elements and search input.
   *
   * @param elem - The reference element before the widget.
   * @returns searchElements: DictionarySearchElements --> interface of
   *  important HTML elements used through widget function.
   */
  public createDictionaryWidgetMarkup(elem: Element) {
    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
    if (dictionary == null) {
      console.log("The determined dictionary element is null.");
      return;
    }
    // Create widget elements
    const artH = dictionary.appendChild(document.createElement("h3"));
    const searchForm = dictionary.appendChild(document.createElement("form"));
    const previousWords = dictionary.appendChild(document.createElement("div"));

    // Return elements used in later functions
    let searchElements: DictionarySearchElements = {
      searchWord: searchForm.appendChild(document.createElement("input")),
      wordSearch: searchForm.appendChild(document.createElement("button")),
      dictionaryElem: <HTMLElement>dictionary,
      errorElem: searchForm.appendChild(document.createElement("span")),
      previousWordBtn: previousWords.appendChild(document.createElement("button")),
      refreshBtn: previousWords.appendChild(document.createElement("button")),
    };
    
    // Add attributes and property values
    const fontAwesomeSearchIcon = searchElements.wordSearch.appendChild(document.createElement("i"));
    previousWords.classList.add("previousWords");
    searchElements.searchWord.classList.add("monospace");
    searchElements.previousWordBtn.classList.add("dictionary-btn");
    searchElements.refreshBtn.classList.add("dictionary-btn");
    fontAwesomeSearchIcon.classList.add("fa");
    fontAwesomeSearchIcon.classList.add("fa-search");
    searchElements.searchWord.setAttribute("type", "text");
    searchElements.searchWord.setAttribute("placeholder", "Search...");
    searchElements.searchWord.setAttribute("aria-label", "Input");
    searchElements.wordSearch.setAttribute("type", "button");
    searchElements.wordSearch.setAttribute("aria-label", "Search");
    dictionary.id = "dictionary";
    artH.textContent = "Dictionary Term:";
    searchForm.id = "dictionary-search";
    searchForm.action = "index.html";
    searchElements.searchWord.id = "search-word";
    searchElements.wordSearch.id = "word-search";
    searchElements.previousWordBtn.innerText = "Previous Word Searches";
    searchElements.refreshBtn.innerText = "Refresh";

    this.searchElements = searchElements;
  }

  /**
   * Creates the markup to house returned words from DictionarySearch. The markup
   *  is created based on API egress. Words and their definitions vary. The markup is
   *  adaptive to returned word data structures.
   *
   * @param wordData - This parameter is an object of word types, definitions, and examples.
   * @param searchElems - Widget Elements -- key widget function elements.
   */
  public createDictionaryTermWithMarkup(wordData: any, searchElems: DictionarySearchElements) {
    if (wordData == null || !(wordData instanceof Object)) {
        console.log("%cThere is no definition for this word.", "color:darkgreen;");
      return;
    }
    console.log(typeof wordData);

    // Add word definition to the dictionary widget
    const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
    const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
    definitionDescription.appendChild(document.createElement("hr")); // word definition separator
    definitionDescriptionContainer.classList.add("definitionDescription");

    // The word data represents complex JSON object
    // Recurse the word data object, adding elements from the various levels
    wordData.map((word: any) => {
      definitionDescriptionContainer.setAttribute("word", word.word);
      //console.log("The word is: ",word)
      const wordTitle = definitionDescription.appendChild(
        document.createElement("h3")
      );
      wordTitle.textContent = word.word;
      //Add the word and examples to page
      word.meanings.map((wordType: any) => {
        //console.log("WordType are: ", wordType)
        const wordTypeH = definitionDescription.appendChild(
          document.createElement("h4")
        );
        const wordTypeList = definitionDescription.appendChild(
          document.createElement("ul")
        );
        wordTypeH.textContent = wordType.partOfSpeech;
        wordType.definitions.map((def: any) => {
          //console.log("Definition is: ", def);
          let wordTypeDefItem = wordTypeList.appendChild(
            document.createElement("li")
          );
          let definitionP = wordTypeDefItem.appendChild(
            document.createElement("p")
          );
          definitionP.textContent = def.definition;
          definitionP.classList.add("wordDefinition");

          const addAdjacentElem = () => {
            //console.log("Definitions is: ", def);
            const newP = definitionP.insertAdjacentElement(
              "beforeend",
              document.createElement("p")
            );
            if (newP instanceof HTMLElement) {
              const newPi = newP.appendChild(document.createElement("i"));
              newPi.textContent = def.example;
            }
            definitionP.classList.add("example");
          };
          //check if key "example" is in definition. If it is, add the example to list
          "example" in def ? addAdjacentElem() : true == true;
        });
      });
    });

    //create clear button
    const deleteWordTermHeadingElem = definitionDescriptionContainer.appendChild(document.createElement("button"));
    deleteWordTermHeadingElem.setAttribute("type", "word-clear");
    deleteWordTermHeadingElem.classList.add("dictionary-word-btn-clear");

    //when clear button is hovered, display it
    definitionDescriptionContainer.addEventListener("mouseover", (event) => {
      deleteWordTermHeadingElem.style.display = "inline-block";
      //when clear button is not hovered, hide it
      definitionDescriptionContainer.addEventListener("mouseout", () => {
        deleteWordTermHeadingElem.style.display = "none";
      });
    });

    //when clear button is clicked, clear the elements
    deleteWordTermHeadingElem.addEventListener("click", (event) => {
      event.preventDefault();
      definitionDescriptionContainer.remove();
      console.log(`%c<RWB>%cRemoved word: ${definitionDescriptionContainer.getAttribute("word")}`, 'color:goldenrod;font-weight:bold;', 'color:goldenrod;');
    });

    //add clear button to widget
    definitionDescriptionContainer.appendChild(definitionDescription);
  }
}

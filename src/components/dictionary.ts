//--Copyright (c) Robert A. Howell

interface SchWordSchButtonDicElem {
    searchWord: HTMLInputElement;
    wordSearch: HTMLButtonElement;
    dictionaryElem: HTMLElement;
    errorElem: HTMLSpanElement;
}

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const dictionaryWidget = {
    init: (elem: Element) => {
        var twoelements = dictionaryWidget.buildDictionaryTermSection.createDictionaryWidget(elem);
        dictionaryWidget.buildDictionaryTermSection.updateWordSearch(twoelements);
    },
    requestDictionaryTerm: {
        // API fetch request the data from dictionary api:
        url: "https://api.dictionaryapi.dev/api/v2/entries/en/",
        apiResponseErrorCheck: (res) => {
            if (!res.ok || res.status != 200) {
                throw new Error(res.ok + ": " + res.status);
            }
            return res.json();
        },
        apiData: (data: any, elem: SchWordSchButtonDicElem) => {
            dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
        },
        apiGET: (url: URL, elem: SchWordSchButtonDicElem) => {
            //submit validation
            fetch(url)
                .then((response) => dictionaryWidget.requestDictionaryTerm.apiResponseErrorCheck(response))
                .then((data) => dictionaryWidget.requestDictionaryTerm.apiData(data, elem))
                .catch(e => console.error(e));
        }
    },
    buildDictionaryTermSection:  {
        createDictionaryWidget: (elem: Element) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("dictionaryWidget")) {
                    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                    if (dictionary != null){
                        dictionary.id = "dictionary";
                        const artH = dictionary.appendChild(document.createElement("h3"));
                        artH.textContent = "Dictionary Term:";
                        //create dictionary form
                        dictionary.appendChild(document.createElement("div"));
                        const searchForm = dictionary.appendChild(document.createElement("form"));
                        searchForm.id = "dictionary-search";
                        searchForm.action = "index.html";
                        let searchWords: SchWordSchButtonDicElem = {
                            searchWord: searchForm.appendChild(document.createElement("input")),
                            wordSearch: searchForm.appendChild(document.createElement("button")),
                            dictionaryElem: <HTMLElement>dictionary,
                            errorElem: searchForm.appendChild(document.createElement("span")),
                        }
                        searchWords.searchWord.id = "search-word";
                        searchWords.searchWord.setAttribute('type', 'text');
                        searchWords.searchWord.setAttribute('placeholder', 'Search...');
                        searchWords.searchWord.classList.add("monospace");
                        searchWords.searchWord.setAttribute("aria-label", "Input");
                        searchWords.wordSearch .id = "word-search";
                        searchWords.wordSearch .setAttribute('type', 'button');
                        searchWords.wordSearch .setAttribute("aria-label", "Search");
                        const fontAwesomeSearchIcon = searchWords.wordSearch.appendChild(document.createElement("i"));
                        fontAwesomeSearchIcon.classList.add("fa");
                        fontAwesomeSearchIcon.classList.add("fa-search");
                        searchWords.errorElem.classList.add("error");

                        return searchWords;
                    }
                    else {
                        console.log("The determined dictionary element is null.");
                    }
                } 
                else {
                    console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`)
                }
            } 
            else {
                console.log(`There is no "dictionaryWidget" class on this page.`)
            }
        },
        updateWordSearch: (searchElems: SchWordSchButtonDicElem | undefined) => {
            if (searchElems == undefined){
                console.log("A search element undefined from searchWord | wordSearch");
                return;
            }

            //Add form input event listeners
            //Upon input entry, fire API fetch
            searchElems.wordSearch.addEventListener("click", (event) => {
                event.preventDefault();
                let acceptedInputWord: boolean = false;
                dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value)
                ? acceptedInputWord = true : acceptedInputWord = false;
                if (acceptedInputWord) {
                    let wordURL: URL = new URL(searchElems.searchWord.value.toString(), "https://api.dictionaryapi.dev/api/v2/entries/en/");
                    dictionaryWidget.requestDictionaryTerm.apiGET(wordURL, searchElems);
                    searchElems.searchWord.classList.remove("invalid");
                    searchElems.wordSearch.classList.remove("invalid");
                    searchElems.errorElem.classList.remove("error");
                    searchElems.errorElem.textContent = "";
                }
                else {
                    searchElems.searchWord.classList.add("invalid");
                    searchElems.wordSearch.classList.add("invalid");
                    searchElems.errorElem.textContent = "Invalid word!";
                    searchElems.errorElem.classList.add("error");
                }
                searchElems.searchWord.value = '';
            })
            searchElems.searchWord.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    let acceptedInputWord: boolean = false;
                    dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value)
                    ? acceptedInputWord = true : acceptedInputWord = false;
                    if (acceptedInputWord) {
                        let wordURL: URL = new URL(searchElems.searchWord.value.toString(), "https://api.dictionaryapi.dev/api/v2/entries/en/");
                        dictionaryWidget.requestDictionaryTerm.apiGET(wordURL, searchElems);
                        searchElems.searchWord.classList.remove("invalid");
                        searchElems.wordSearch.classList.remove("invalid");
                        searchElems.errorElem.classList.remove("error");
                        searchElems.errorElem.textContent = "";
                    }
                    else {
                        searchElems.searchWord.classList.add("invalid");
                        searchElems.wordSearch.classList.add("invalid");
                        searchElems.errorElem.textContent = "Invalid word!";
                        searchElems.errorElem.classList.add("error");
                    }
                    searchElems.searchWord.value = '';
                }
            })
        },
        wordValidation: (intxt: string) => {
            let trimmed = intxt.trim();
            let lettersRE = new RegExp("^[A-Za-z]{0,45}$");
            if (lettersRE.test(trimmed)) {
                return true;
            }
            else {
                //word is not an acceptable word.`);
                return false;
            }
        }
    },
    createDictionaryTermWithMarkup: (wordData: any, searchElems: SchWordSchButtonDicElem) => {
        const definitionDescription = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr"));

        wordData.map((word: any) => {
            //console.log("The word is: ",word)
            const wordTitle = definitionDescription.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map((wordType: any) => {
                //console.log("WordType are: ", wordType)
                const wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
                wordTypeH.textContent = wordType.partOfSpeech;
                const wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
                wordType.definitions.map((def: any) => {
                    //console.log("Definition is: ", def);
                    let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                    let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                    definitionP.textContent = def.definition;
                    definitionP.classList.add("wordDefinition")

                    const addAdjacentElem = () => {
                        definitionP.classList.add("example")
                        //console.log("What are all the selections: ", def);
                        const newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
                        if (newP instanceof HTMLElement){
                            const newPi = newP.appendChild(document.createElement("i"));
                            newPi.textContent = def.example;
                        }
                        else {
                            console.log("Definition element is null.");
                        }
                    }
                    //check if key "example" is in definition. If it is, add the example to list
                    "example" in def ? addAdjacentElem() : true == true;
                });
            });
        });
        
        searchElems.dictionaryElem.appendChild(definitionDescription);
    },
}

export default dictionaryWidget;
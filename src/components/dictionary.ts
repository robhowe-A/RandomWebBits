//--Copyright (c) Robert A. Howell

interface SchWordSchButtonDicElem {
    searchWord: any;
    wordSearch: any;
    dictionaryElem: any;
}

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
        apiData: (data, elem) => {
            dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
        },
        apiGET: (url, word, elem) => {
            //submit validation
            url += word;
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
                            dictionaryElem: dictionary,
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
                        const errorSpan = searchForm.appendChild(document.createElement("span"));
                        errorSpan.classList.add("error");

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
            const error = searchElems.searchWord.nextElementSibling;
            searchElems.wordSearch.addEventListener("click", (event) => {
                event.preventDefault();
                const acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value);
                if (acceptedWord) {
                    dictionaryWidget.requestDictionaryTerm.apiGET(dictionaryWidget.requestDictionaryTerm.url, searchElems.searchWord.value, searchElems);
                    searchElems.searchWord.classList.remove("invalid");
                    searchElems.wordSearch.classList.remove("invalid");
                    error.classList.remove("error");
                    error.textContent = "";
                }
                else {
                    searchElems.searchWord.classList.add("invalid");
                    searchElems.wordSearch.classList.add("invalid");
                    error.textContent = "Invalid word!";
                    error.classList.add("error");
                }
                searchElems.searchWord.value = '';
            })
            searchElems.searchWord.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value);
                    if (acceptedWord) {
                        dictionaryWidget.requestDictionaryTerm.apiGET(dictionaryWidget.requestDictionaryTerm.url, searchElems.searchWord.value, searchElems);
                        searchElems.searchWord.classList.remove("invalid");
                        searchElems.wordSearch.classList.remove("invalid");
                        error.classList.remove("error");
                        error.textContent = "";
                    }
                    else {
                        searchElems.searchWord.classList.add("invalid");
                        searchElems.wordSearch.classList.add("invalid");
                        error.textContent = "Invalid word!";
                        error.classList.add("error");
                    }
                    searchElems.searchWord.value = '';
                }
            })
        },
        wordValidation: (intxt) => {
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
    createDictionaryTermWithMarkup: (wordData, searchElems: SchWordSchButtonDicElem) => {
        searchElems.dictionaryElem = document.querySelector("#dictionary");
        const definitionDescription = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr"));

        wordData.map((word) => {
            //console.log("The word is: ",word)
            const wordTitle = definitionDescription.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map((wordType) => {
                //console.log("WordType are: ", wordType)
                const wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
                wordTypeH.textContent = wordType.partOfSpeech;
                const wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
                wordType.definitions.map((def) => {
                    //console.log("Definition is: ", def);
                    let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                    let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                    definitionP.textContent = def.definition;
                    definitionP.classList.add("wordDefinition")

                    const addAdjacentElem = () => {
                        definitionP.classList.add("example")
                        //console.log("What are all the selections: ", def);
                        const newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
                        const newPi = newP.appendChild(document.createElement("i"));
                        newPi.textContent = def.example;
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
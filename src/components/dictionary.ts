//--Copyright (c) Robert A. Howell

const dictionaryWidget = {
    init: (elem) => {
        dictionaryWidget.buildDictionaryTermSection.createDictionaryWidget(elem);
        dictionaryWidget.buildDictionaryTermSection.updateWordSearch();
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
        apiData: (data) => {
            dictionaryWidget.createDictionaryTermWithMarkup(data);
        },
        apiGET: (url, word) => {
            //submit validation
            url += word;
            fetch(url)
                .then((response) => dictionaryWidget.requestDictionaryTerm.apiResponseErrorCheck(response))
                .then((data) => dictionaryWidget.requestDictionaryTerm.apiData(data))
                .catch(e => console.error(e));
        }
    },
    buildDictionaryTermSection:  {
        createDictionaryWidget: (elem) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("dictionaryWidget")) {
                    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                    dictionary.id = "dictionary";
                    const artH = dictionary.appendChild(document.createElement("h3"));
                    artH.textContent = "Dictionary Term:";
                    //create dictionary form
                    dictionary.appendChild(document.createElement("div"));
                    const searchForm = dictionary.appendChild(document.createElement("form"));
                    searchForm.id = "dictionary-search";
                    searchForm.action = "index.html";
                    const searchInput = searchForm.appendChild(document.createElement("input"));
                    searchInput.id = "search-word";
                    searchInput.type = "text";
                    searchInput.placeholder = "Search..."
                    searchInput.classList.add("monospace");
                    searchInput.setAttribute("aria-label", "Input");
                    const searchButton = searchForm.appendChild(document.createElement("button"));
                    searchButton.id = "word-search";
                    searchButton.type = "button";
                    searchButton.setAttribute("aria-label", "Search");
                    const fontAwesomeSearchIcon = searchButton.appendChild(document.createElement("i"));
                    fontAwesomeSearchIcon.classList.add("fa");
                    fontAwesomeSearchIcon.classList.add("fa-search");
                    const errorSpan = searchForm.appendChild(document.createElement("span"));
                    errorSpan.classList.add("error");
                } 
                else {
                    console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`)
                }
            } 
            else {
                console.log(`There is no "dictionaryWidget" class on this page.`)
            }
        },
        updateWordSearch: () => {
            const searchWord = document.querySelector("#search-word");
            const wordSearch = document.querySelector("#word-search");
            const error = wordSearch.nextElementSibling;
            wordSearch.addEventListener("click", (event) => {
                event.preventDefault();
                const acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchWord.value);
                if (acceptedWord) {
                    dictionaryWidget.requestDictionaryTerm.apiGET(dictionaryWidget.requestDictionaryTerm.url, searchWord.value);
                    searchWord.classList.remove("invalid");
                    wordSearch.classList.remove("invalid");
                    error.classList.remove("error");
                    error.textContent = "";
                }
                else {
                    searchWord.classList.add("invalid");
                    wordSearch.classList.add("invalid");
                    error.textContent = "Invalid word!";
                    error.classList.add("error");
                }
                searchWord.value = '';
            })
            searchWord.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchWord.value);
                    if (acceptedWord) {
                        dictionaryWidget.requestDictionaryTerm.apiGET(dictionaryWidget.requestDictionaryTerm.url, searchWord.value);
                        searchWord.classList.remove("invalid");
                        wordSearch.classList.remove("invalid");
                        error.classList.remove("error");
                        error.textContent = "";
                    }
                    else {
                        searchWord.classList.add("invalid");
                        wordSearch.classList.add("invalid");
                        error.textContent = "Invalid word!";
                        error.classList.add("error");
                    }
                    searchWord.value = '';
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
    createDictionaryTermWithMarkup: (wordData) => {
        const definition = document.querySelector("#dictionary");
        const dictionary = definition.appendChild(document.createElement("div"));
        dictionary.appendChild(document.createElement("hr"));

        wordData.map((word) => {
            //console.log("The word is: ",word)
            const wordTitle = dictionary.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map((wordType) => {
                //console.log("WordType are: ", wordType)
                const wordTypeH = dictionary.appendChild(document.createElement("h4"));
                wordTypeH.textContent = wordType.partOfSpeech;
                const wordTypeList = dictionary.appendChild(document.createElement("ul"));
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
        definition.appendChild(dictionary);
    },
}

export default dictionaryWidget;
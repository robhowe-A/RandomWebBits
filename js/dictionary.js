
// API fetch request the data from dictionary api:

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
//const url = "https://od-api.oxforddictionaries.com/api/v2/entries/en-US/arbitrary"

//const url = "https://anapioficeandfire.com/api/characters/1770";

const apiResponseErrorCheck = function(res) {
    if(!res.ok || res.status != 200){
        throw new Error(res.ok + ": " + res.status);
    }
    return res.json();
}

//TODO: global variable
const apiData = function(data) {
    definitionSection.createDictionaryMarkup(data);
}

const apiGET = function(url, word) {
    url += word;
    fetch(url)
        .then((response) => apiResponseErrorCheck(response))
        .then((data) => apiData(data))
        .catch(e => console.error(e));
}

//apiGET(url);

// Create page elements showcasing a definition card.
const dictionaryWidget = (function() {
    
    definitionSection = {
        createDictionaryMarkup: function(wordData){
            const definition = document.querySelector("#dictionary");
            const dictionary = definition.appendChild(document.createElement("div"));
            dictionary.appendChild(document.createElement("hr"));
            
            wordData.map((word) => {
                console.log("The word is: ",word)
                const wordTitle = dictionary.appendChild(document.createElement("h3"));
                wordTitle.textContent = word.word;
                
                word.meanings.map((wordType) => {
                    console.log("WordType are: ", wordType)
                    const wordTypeH = dictionary.appendChild(document.createElement("h4"));
                    wordTypeH.textContent = wordType.partOfSpeech;
                    const wordTypeList = dictionary.appendChild(document.createElement("ul"));
                    wordType.definitions.map((def) => {
                        console.log("Definition is: ", def);
                        let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                        let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                        definitionP.textContent = def.definition;

                        addAdjacentElem = function(){
                            definitionP.classList.add("wordDefinition")
                            
                            console.log("What are all the selections: ", def);
                            const newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
                            const newPi = newP.appendChild(document.createElement("i"));
                            newPi.textContent = def.example;
                        }

                        //check if key "example" is in definition. If it is, add the example to list
                        "example" in def ?  addAdjacentElem(): true==true;
                    });
                });
            });

            definition.appendChild(dictionary);
        },
        updateWordSearch: function(){
            const searchWord = document.querySelector("#search-word");
            const wordSearch = document.querySelector("#word-search");
            wordSearch.addEventListener("click", function(event){
                event.preventDefault();
                apiGET(url, searchWord.value);
                
            })
        }

    }
    //definitionSection.createDictionaryMarkup();
    definitionSection.updateWordSearch();
}());


// Implement a search function to search your own words

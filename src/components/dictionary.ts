//--Copyright (c) Robert A. Howell
import { apiGET } from "./api";

class Dictionary {
    private static isExistingCacheinBrowser: boolean;
    private static cachedWordsCount: number;
    private static existingCaches: string[];
    public static wordCaches: caches[];
    public static previousWordsBtnWasClicked: boolean = false;
    public static previousWordsBtnIsCreated: boolean = false;
    public wordURL: URL;
    //private static wordURLs: any[];
    constructor() {
        //new dictionary. no initializing functions needed
        //static class - needs to show on browser any caches that exist
        //and their names
    }
    public static getLocalStorageWordCaches() {
        //enumerate all of the caches
        //cache response links and cache name are previously stored in local storage

        //Enumerate local storage 'word-caches' items
        let storageStr = localStorage.getItem('word-caches');
        if (storageStr != null){
            Dictionary.wordCaches = JSON.parse(storageStr);
            return Dictionary.wordCaches;
        }
        //getCacheStorage()
        // for (let cache of wordcaches){
        //     console.log("'Cache Storage' name found: ", cache.cacheName);
        // }
        // if(wordcaches.length != null){
        //     for (let cache of wordcaches) {

        //         //check 'Cache Storage' against list of cached words in local storage
        //         //console output any cache storage match
        //         let promise = new Promise(async (resolve, reject) => {
        //             const cacheStorage = await caches.open(cache.cacheName);
        //             resolve(cacheStorage.match(cache.wordURL));//executor function
        //             reject("Error, could not resolve.");
        //         });
        //         let returnPromiseValue;
        //         (() => { //consuming function
        //             returnPromiseValue = promise.then(
        //                 (result) => {
        //                     let parsedResult: string = <string>result;
        //                     console.log("parsedResult is: ", parsedResult);
        //                     return parsedResult},
        //                 (error) => {
        //                     console.log(error)
        //                 }
        //             )
        //         })();
        //     }
        // }
        // return wordcaches;
    }
    // displayCachedWords() {
    //     //caches
    //     }
}

interface SchWordSchButtonDicElem {
    searchWord: HTMLInputElement;
    wordSearch: HTMLButtonElement;
    dictionaryElem: HTMLElement;
    errorElem: HTMLSpanElement;
    previousWordBtn: HTMLButtonElement;
    refreshBtn: HTMLButtonElement;
}

interface caches {
    inCache: boolean,
    word: string,
    wordURL: URL,
    cacheName: string,
}

let wordSearches = new Dictionary();
//let wordcaches: caches[] = []; //filling for private static member which has errors mapping

const dictionaryWidget = {
    init: (elem: Element) => {
        var twoelements = dictionaryWidget.buildDictionaryTermSection.createDictionaryWidget(elem);
        dictionaryWidget.buildDictionaryTermSection.addWordSearchEvents(twoelements);
        dictionaryWidget.buildDictionaryTermSection.checkCacheStorage();
    },
    requestDictionaryTerm: {
        // API fetch request the data from dictionary api:
        requestUrl: "https://api.dictionaryapi.dev/api/v2/entries/en/",
        
        fetchDictionaryTerm: (word:string, wordUrl: URL, elem: SchWordSchButtonDicElem, sendToCache: boolean, cacheName:string) => {
            // The function calls to either store in Cache Storage
            // If items are to be cached, edit Local Storage cache names
            //TODO: dictionary fetch api:
            //TODO: 1.) is to be cached true? --check
            //TODO: 2.) is to be cached false? --check
            //TODO: --> are they the same behavior? --check
            //TODO: --> is the result in the cache? --check
            //TODO: send to cache true option allows empty string
            let wordCacheStore: any = [];
            let wordcache: caches = {
                inCache: sendToCache,
                word: word,
                wordURL: wordUrl,
                cacheName: sendToCache ? cacheName : "",
            }
            wordCacheStore.push(wordcache);

            // Add the cache item to Local Storage
            const setCacheItem = (sendToBrowserCache: boolean, wordArray:any[], ) =>{
                try {
                    if (localStorage.getItem('word-caches') == null) { 
                        // Local storage empty => add the word
                        localStorage.setItem('word-caches', JSON.stringify(wordCacheStore));
                    }
                    else {
                        // Add word to current 'word-caches' in local storage
                        let storageStr = localStorage.getItem('word-caches');
                        if (storageStr == null)
                        {
                            try {
                                throw new Error("Local storage 'word-caches' values null.");
                            }
                            catch (error){
                                if (error instanceof Error){
                                    console.log(error.name);
                                    console.log(error.message);
                                    console.log(error.stack);
                                }
                            }
                        }
                        else{
                            let allcache: caches[] = JSON.parse(storageStr);
                            for (let cache of allcache){
                                if (cache.wordURL == wordcache.wordURL){ 
                                    // Word is already in local storage
                                    // No need to add it to the array
                                    return;
                                }
                            }

                            // Add word to existing 'word-caches' in local storage
                            allcache.push(wordcache);
                            localStorage.setItem('word-caches', JSON.stringify(allcache));
                        }
                    }
                }
                catch (err) {
                    console.log("Problem storing To-do list item: ", err);
                }
            }

            const wordFetchRequest = async () => {
                //set apiGET sendToBrowserCache to true to use cache storage
                const wordFetch = new apiGET(wordcache.wordURL, false, wordcache.cacheName, elem.errorElem)

                let data = await wordFetch.apiGET(wordFetch.getGETURL());
                    if (data instanceof Response){
                        data.json();
                    }
                    let wordData: any = data;
                    let noDefinitions: boolean = false;
                    // if (Object.hasOwn(wordData, 'title')){
                    //     noDefinitions = true;
                    // }
                    if (data != undefined && !noDefinitions) {
                        dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
                        setCacheItem(wordFetch.getSendToBrowserCache(), wordCacheStore);
                    }
                    else {
                        if (noDefinitions){
                            if (wordData.title == "No Definitions Found")
                                //--> 404 from fetch request
                                elem.searchWord.classList.add("invalid-notfound");
                                elem.errorElem.classList.add("error-notfound");
                                elem.errorElem.innerText = "No Definitions Found";
                        }
                        else {
                            //error
                            elem.searchWord.classList.add("invalid-notfound");
                            elem.errorElem.innerText = "Invalid word!";
                            elem.errorElem.classList.add("error-notfound");
                        }
                    }
                };
            wordFetchRequest();
        }

    },
    buildDictionaryTermSection: {
        createDictionaryWidget: (elem: Element) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("dictionaryWidget")) {
                    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                    if (dictionary != null) {
                        dictionary.id = "dictionary";
                        const artH = dictionary.appendChild(document.createElement("h3"));
                        artH.textContent = "Dictionary Term:";
                        //create dictionary form
                        const searchForm = dictionary.appendChild(document.createElement("form"));
                        const previousWords = dictionary.appendChild(document.createElement("div"))
                        searchForm.id = "dictionary-search";
                        searchForm.action = "index.html";
                        previousWords.classList.add("previousWords");
                        let searchWords: SchWordSchButtonDicElem = {
                            searchWord: searchForm.appendChild(document.createElement("input")),
                            wordSearch: searchForm.appendChild(document.createElement("button")),
                            dictionaryElem: <HTMLElement>dictionary,
                            errorElem: searchForm.appendChild(document.createElement("span")),
                            previousWordBtn: previousWords.appendChild(document.createElement("button")),
                            refreshBtn: previousWords.appendChild(document.createElement("button")),
                        }
                        searchWords.searchWord.id = "search-word";
                        searchWords.searchWord.setAttribute('type', 'text');
                        searchWords.searchWord.setAttribute('placeholder', 'Search...');
                        searchWords.searchWord.classList.add("monospace");
                        searchWords.searchWord.setAttribute("aria-label", "Input");
                        searchWords.wordSearch.id = "word-search";
                        searchWords.wordSearch.setAttribute('type', 'button');
                        searchWords.wordSearch.setAttribute("aria-label", "Search");
                        const fontAwesomeSearchIcon = searchWords.wordSearch.appendChild(document.createElement("i"));
                        searchWords.previousWordBtn.innerText = "Previous Word Searches";
                        searchWords.previousWordBtn.classList.add("dictionary-btn");
                        fontAwesomeSearchIcon.classList.add("fa");
                        fontAwesomeSearchIcon.classList.add("fa-search");
                        searchWords.refreshBtn.innerText = "Refresh";
                        searchWords.refreshBtn.classList.add("dictionary-btn");

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
        checkCacheStorage: () => {
            // gather local storage word with getLocalStorageWordCaches()
            Dictionary.getLocalStorageWordCaches();
        },
        wordValidation: (intxt: string) => {
            let trimmed = intxt.trim();
            let lettersRE = new RegExp("^[A-Za-z]{1,45}$");
            if (lettersRE.test(trimmed)) {
                return true;
            }
            else {
                //word is not an acceptable word.`);
                return false;
            }
        },
        wordSearchUpdate: (searchElems: SchWordSchButtonDicElem) => {
            let acceptedInputWord: boolean = false;
            dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value)
                ? acceptedInputWord = true : acceptedInputWord = false;
            if (acceptedInputWord) {
                wordSearches.wordURL = new URL(searchElems.searchWord.value.toString(), dictionaryWidget.requestDictionaryTerm.requestUrl);

                dictionaryWidget.requestDictionaryTerm.fetchDictionaryTerm(searchElems.searchWord.value, wordSearches.wordURL, searchElems, false, "");
                searchElems.searchWord.classList.remove("invalid");
                searchElems.searchWord.classList.remove("invalid-notfound");
                searchElems.errorElem.classList.remove("error");
                searchElems.errorElem.classList.remove("error-notfound");
                searchElems.errorElem.textContent = "";
            }
            else {
                searchElems.searchWord.classList.remove("invalid-notfound");
                searchElems.searchWord.classList.add("invalid");
                searchElems.errorElem.textContent = "Invalid word!";
                searchElems.errorElem.classList.remove("error-notfound");
                searchElems.errorElem.classList.add("error");
            }
            searchElems.searchWord.value = '';
        },
        addWordSearchEvents: (searchElems: SchWordSchButtonDicElem | undefined) => {
            if (searchElems == undefined) {
                console.log("A search element is undefined from searchWord | wordSearch");
                return;
            }
            //Add form input event listeners
            //Upon input entry, fire API fetch
            searchElems.wordSearch.addEventListener("click", (event) => {
                event.preventDefault();
                dictionaryWidget.buildDictionaryTermSection.wordSearchUpdate(searchElems);
            })
            searchElems.searchWord.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                        dictionaryWidget.buildDictionaryTermSection.wordSearchUpdate(searchElems);
                }
            })
            // "Previous word searches" button fetches locally stored words
            // Clicking the button displays each word in a list within the widget
            searchElems.previousWordBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const placementlocationholder = document.querySelector(".previousWords");
                let buttonContainer = document.getElementById("dictionary-btns");
                let newButtonContainer: Element;
                if ( Dictionary.previousWordsBtnWasClicked == false ){
                    if( Dictionary.previousWordsBtnIsCreated == false ){
                        newButtonContainer = placementlocationholder.insertAdjacentElement('afterend',document.createElement("div"));
                        newButtonContainer.id = "dictionary-btns";
                        //Check the placement location and word caches for undefined
                        if (placementlocationholder != undefined && Dictionary.wordCaches !== undefined){
                            for (let wordCache of Dictionary.wordCaches){
                                const cacheWordHeadingElem = newButtonContainer.appendChild(document.createElement("button"));
                                cacheWordHeadingElem.setAttribute("type", "button");
                                cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
                                cacheWordHeadingElem.textContent = wordCache.word;
                                //add event listener for new button
                                cacheWordHeadingElem.addEventListener("click", (event) => {
                                    event.preventDefault();
                                    dictionaryWidget.requestDictionaryTerm.fetchDictionaryTerm(wordCache.word, wordCache.wordURL, searchElems, false, "");
                                })
                                Dictionary.previousWordsBtnIsCreated = true;
                            }
                        }
                        else {
                            const noWordsHeadingElem = newButtonContainer.appendChild(document.createElement("div"));
                            noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                            noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                        }
                        }
                        else{
                            buttonContainer.style.display = "block";
                            Dictionary.previousWordsBtnWasClicked = true;
                            return;
                        }
                }
                else {
                    buttonContainer.style.display = "none";
                    Dictionary.previousWordsBtnWasClicked = false;
                    return;
                }
                Dictionary.previousWordsBtnWasClicked = true;
            })
            searchElems.refreshBtn.addEventListener("click", (event) => {
                event.preventDefault();
                location.reload();
            })
        }
    },
    createDictionaryTermWithMarkup: (wordData: any, searchElems: SchWordSchButtonDicElem) => {
        const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        definitionDescriptionContainer.classList.add("definitionDescription");
        const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
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
                        if (newP instanceof HTMLElement) {
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

        definitionDescriptionContainer.appendChild(definitionDescription);
        Dictionary.previousWordsBtnWasClicked = false;
    },
}

export default dictionaryWidget;

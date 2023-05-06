(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const LinkDetails_1 = require("./LinkDetails");
//Icon links used for image Attribution
class AttributionLink extends LinkDetails_1.default {
    attributeowner;
    articleid;
    constructor(title, innerText, hReference, attributeowner, pageName, articleid) {
        super(title, innerText, pageName, hReference);
        this.attributeowner = attributeowner;
        this.articleid = articleid;
    }
}
exports.default = AttributionLink;

},{"./LinkDetails":2}],2:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class LinkDetails {
    title;
    innerText;
    pageName;
    hReference;
    constructor(title, innerText, pageName, hReference) {
        this.title = title,
            this.innerText = innerText,
            this.pageName = pageName,
            this.hReference = hReference;
    }
}
exports.default = LinkDetails;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
class WebBit {
    id;
    articleNumber;
    name;
    description;
    dateCreated;
    articleLink;
    cardImage;
    cardImageALT;
    constructor(id, articleNumber, name, description, dateCreated, articleLink, cardImage, cardImageALT) {
        this.id = id;
        this.name = name;
        this.articleNumber = articleNumber;
        this.description = description;
        this.dateCreated = dateCreated;
        this.articleLink = articleLink;
        this.cardImage = cardImage;
        this.cardImageALT = cardImageALT;
    }
}
exports.default = WebBit;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../lib/data");
const data_AttributionLinks_1 = require("../lib/data_AttributionLinks");
const cardsWidget = {
    init: () => {
        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores 
        let cardsArticles = [
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
        ];
        // Split the cards arrays on the page into their respective category
        let cardsSection = [
            cardsWidget.buildCardContainingSection("Arbitrary Articles:"),
            cardsWidget.buildCardContainingSection("Guide Shorts:"),
            cardsWidget.buildCardContainingSection("Exlore the Web:"),
        ];
        // Route Checks -> Add widget and format multiple pages
        // Index (Home) page shortens each section to 3 articles only
        if (window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/RandomWebBits/' ||
            window.location.pathname == '/dist/index.html') {
            const getMultipleRandom = (arr, num) => {
                // randomize the array
                const shuffled = [...arr].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, num); // return the requested number of elements
            };
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 3);
        }
        // Add the cards to the page by deconstruction and addition
        // Outer loop: iterate the data to each respective category: Pages, Guides, Explores
        for (let i = 0; i < cardsSection.length; i++) {
            if (cardsSection[i] != undefined) {
                // Inner loop: iterate through the category data
                // From the cards stack, append each to section
                cardsArticles.shift().forEach((article) => {
                    cardsSection[i].append(article);
                });
            }
            else {
                console.log("There's an error.");
            }
        }
    },
    buildCardContainingSection: (name) => {
        // Create divisor sectional elements to append to main
        const pageMain = document.querySelector("main");
        if (pageMain != null && pageMain.nodeName === 'MAIN') {
            // Create card section elements
            // <section class="cards">
            //     <h2>Arbitrary Articles:</h2>
            //     <div class="card_columns">
            //     </div>
            // </section>
            //
            const AASection = document.createElement("section");
            let aaHeading = document.createElement('h2');
            let aaCardsSection = document.createElement('div');
            AASection.appendChild(aaHeading);
            AASection.appendChild(aaCardsSection);
            pageMain.append(AASection);
            // Add data attributes and property values
            AASection.classList.add("cards");
            aaCardsSection.classList.add('card_columns');
            aaHeading.innerText = `${name}`;
            return aaCardsSection;
        }
        else {
            try {
                throw new Error("No main element exists on the page.");
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    buildArticleCards: (cardsData, attrlinks) => {
        // Map WebBit data to a card, each
        //
        // <div class="card">
        // <div><!--card image panel-->
        //     <img src="" alt="" article="">
        // </div><!--end card image panel-->
        // <div class="cardBody">
        //     <h3></h3>
        //     <p></p><a href=""></a>
        //     </div>
        // </div>
        //
        // Iterate each card --> build the card elements and add the data
        let AAs = cardsData.map((article) => {
            let WebBit = document.createElement('div');
            let cardImgTop = document.createElement('div');
            let cardImg = document.createElement('img');
            let cardBody = document.createElement('div');
            let cardBodyHeading = document.createElement('h3');
            let cardBodyPara = document.createElement('p');
            let cardBodyLink = document.createElement('a');
            cardImgTop.appendChild(cardImg);
            cardBody.appendChild(cardBodyHeading);
            cardBody.appendChild(cardBodyPara);
            cardBody.appendChild(cardBodyLink);
            // Add card data attributes and property values
            WebBit.classList.add('card');
            cardBody.classList.add("cardBody");
            cardImg.setAttribute('src', article.cardImage);
            cardImg.setAttribute('alt', article.cardImageALT);
            cardImg.setAttribute('Article', article.articleNumber);
            cardBodyLink.setAttribute('href', article.articleLink);
            cardBodyHeading.innerText = article.name;
            cardBodyPara.textContent = article.description;
            cardBodyLink.textContent = "Go to Page";
            // Image attribution may be needed for the image used
            // Attribution data is imported as 'attrlinks' signature parameter
            attrlinks.map((link) => {
                // To determine image attribution, the image id and article id will match,
                // otherwise the data isn't entered, causing a miss
                if (cardImg.getAttribute('Article') === link.articleid.toString()) {
                    //
                    // <div class="flip-card"><!--card image panel-->
                    // <div class="inner">
                    //     <div class="cardFront">
                    //         <img src="" alt="" article="">
                    //     </div>
                    //          <div class="cardBack">
                    //              <h3></h3>
                    //              <p></p>
                    //              <img src="" alt="" article="" class="imgSmall imgPTR">
                    //          </div>
                    //     </div>
                    // </div><!--end card image panel-->
                    //
                    // Create image back panel elements and add the data
                    // Redefine card image panel as a flip panel
                    const cardInner = cardImgTop.appendChild(document.createElement("div"));
                    const cardFront = cardInner.appendChild(document.createElement("div"));
                    cardFront.appendChild(cardImg); // move image within card front divisor
                    let smallImg = cardImg.cloneNode(false);
                    const cardBack = cardInner.appendChild(document.createElement("div"));
                    const backHeading = cardBack.appendChild(document.createElement("h3"));
                    cardBack.appendChild(smallImg);
                    const backPara = cardBack.appendChild(document.createElement("p"));
                    const attributeLink = cardBody.appendChild(document.createElement("a")); //append to front panel
                    // Add flip-panel data attributes and property values
                    cardImgTop.classList.add("flip-card");
                    cardInner.classList.add("inner");
                    cardFront.classList.add("cardFront");
                    smallImg.classList.add("imgSmall", "imgPTR");
                    cardBack.classList.add("cardBack");
                    attributeLink.classList.add("attribute");
                    backHeading.textContent = link.attributeowner;
                    backPara.textContent = link.innerText;
                    attributeLink.href = link.hReference;
                    attributeLink.title = link.title;
                    attributeLink.textContent = link.attributeowner;
                }
            });
            // The card is WebBit
            // Add the markup to the containing element
            WebBit.appendChild(cardImgTop);
            WebBit.appendChild(cardBody);
            return WebBit;
        });
        return AAs;
    }
};
exports.default = cardsWidget;

},{"../lib/data":12,"../lib/data_AttributionLinks":13}],5:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGET = void 0;
class apiGET {
    GETURL;
    sendToBrowserCache = false;
    browserCacheName;
    errorElem;
    dataIsInCache = false; //TODO: dataincache overall
    receivedData; //TODO: check if this is needed
    constructor(GETURL, sendToBrowserCache, browserCacheName, errorElem) {
        this.GETURL = GETURL;
        this.sendToBrowserCache = sendToBrowserCache;
        this.browserCacheName = browserCacheName;
        this.errorElem = errorElem;
    }
    getSendToBrowserCache() {
        return this.sendToBrowserCache;
    }
    getGETURL() {
        return this.GETURL;
    }
    ;
    setSendToBrowserCache() {
        return this.sendToBrowserCache ? false : true;
    }
    setGETURL(GETURL) {
        if (typeof GETURL === 'string') {
            this.GETURL = new URL(GETURL);
        }
        else {
            this.GETURL = GETURL;
        }
    }
    apiResponseErrorCheck(res) {
        if (res.status == 404) {
            this.errorElem.classList.add("error");
            this.errorElem.innerText = "404 fetch error!";
            return res;
        }
        if (!res.ok || res.status != 200) {
            throw new Error(res.ok + ": " + res.status);
        }
        return res.json();
    }
    fetchData(GETURL) {
        return fetch(GETURL)
            .then((response) => this.apiResponseErrorCheck(response))
            .then((data) => {
            if (data instanceof Response) {
                return data.text();
            }
            else
                return data;
        })
            .catch((e) => {
            console.log(e);
            this.errorElem.classList.add("error");
            this.errorElem.innerText = `${e.message}`;
        });
    }
    async apiGET(GETURL) {
        if (this.sendToBrowserCache) {
            let dataCachePromise = new Promise((resolve, reject) => {
                if ('caches' in window) {
                    // Open cache and check for request existing in Cache Storage
                    window.caches.open(this.browserCacheName).then((cache) => {
                        caches.match(GETURL).then((result) => {
                            if (result === undefined) {
                                // Fetch the request normally
                                fetch(GETURL).then((result) => {
                                    // Make a copy of the response since it can only be read once
                                    let clonedresp = result.clone();
                                    // Add the result to the cache
                                    cache.put(GETURL, result);
                                    resolve(clonedresp.json().then((text) => text));
                                });
                            }
                            else {
                                resolve(result.json().then((text) => text));
                            }
                        });
                    });
                }
            });
            dataCachePromise.then((response) => {
                return response;
            });
            return dataCachePromise;
        }
        else {
            let dataPromise = new Promise((resolve, reject) => {
                resolve(this.fetchData(GETURL));
            });
            dataPromise.then((data) => {
                return data;
            });
            return dataPromise;
        }
    }
}
exports.apiGET = apiGET;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const api_1 = require("./api");
class DictionaryWidget {
    static isExistingCacheinBrowser;
    static cachedWordsCount;
    static existingCaches;
    static requestUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    static wordCaches;
    static previousWordsBtnWasClicked = false;
    static previousWordsBtnIsCreated = false;
    static previousWordsNotFoundOnce = false;
    wordURL;
    constructor() {
        //new dictionary. no initializing functions needed
        //static class - needs to show on browser any caches that exist
        //and their names
    }
    createDictionaryWidget(elem) {
        var Srchelements = DictionaryWidgetMarkup.createDictionaryWidgetMarkup(elem);
        // Initialize event listeners: word search, button clicks, etc
        this.addWordSearchEvents(Srchelements);
        // Find items pre-existing in local storage/cache
        DictionaryWidget.getLocalStorageWordCaches();
    }
    static getLocalStorageWordCaches() {
        //enumerate all of the caches
        //cache response links and cache name are previously stored in local storage
        //Enumerate local storage 'word-caches' items
        let storageStr = localStorage.getItem('word-caches');
        if (storageStr != null) {
            DictionaryWidget.wordCaches = JSON.parse(storageStr);
            return DictionaryWidget.wordCaches;
        }
    }
    addWordSearchEvents(searchElems) {
        if (searchElems == undefined) {
            console.log("A search element is undefined from searchWord | wordSearch");
            return;
        }
        //Add form input event listeners
        //Upon input entry, fire API fetch
        searchElems.wordSearch.addEventListener("click", (event) => {
            event.preventDefault();
            this.wordSearchUpdate(searchElems);
        });
        searchElems.searchWord.addEventListener("keypress", (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.wordSearchUpdate(searchElems);
            }
        });
        // "Previous word searches" button fetches locally stored words
        // Clicking the button displays each word in a list within the widget
        searchElems.previousWordBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const placementlocationholder = document.querySelector(".previousWords");
            let buttonContainer = document.getElementById("dictionary-btns");
            let newButtonContainer;
            if (DictionaryWidget.previousWordsBtnWasClicked == false) {
                if (DictionaryWidget.previousWordsBtnIsCreated == false) {
                    newButtonContainer = placementlocationholder.insertAdjacentElement('afterend', document.createElement("div"));
                    newButtonContainer.id = "dictionary-btns";
                    //Check the placement location and word caches for undefined
                    if (placementlocationholder != undefined && DictionaryWidget.wordCaches !== undefined) {
                        for (let wordCache of DictionaryWidget.wordCaches) {
                            const cacheWordHeadingElem = newButtonContainer.appendChild(document.createElement("button"));
                            cacheWordHeadingElem.setAttribute("type", "button");
                            cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
                            cacheWordHeadingElem.textContent = wordCache.word;
                            //add event listener for new button
                            cacheWordHeadingElem.addEventListener("click", (event) => {
                                event.preventDefault();
                                this.fetchDictionaryTerm(wordCache.word, wordCache.wordURL, searchElems, false, "");
                            });
                            DictionaryWidget.previousWordsBtnIsCreated = true;
                        }
                    }
                    else {
                        if (DictionaryWidget.previousWordsNotFoundOnce == false) {
                            const noWordsHeadingElem = newButtonContainer.appendChild(document.createElement("div"));
                            noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                            noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                            DictionaryWidget.previousWordsNotFoundOnce = true;
                            DictionaryWidget.previousWordsBtnWasClicked = true;
                        }
                        else {
                            buttonContainer.style.display = "block";
                            DictionaryWidget.previousWordsBtnWasClicked = true;
                            return;
                        }
                    }
                }
                else {
                    buttonContainer.style.display = "block";
                    DictionaryWidget.previousWordsBtnWasClicked = true;
                    return;
                }
            }
            else {
                buttonContainer.style.display = "none";
                DictionaryWidget.previousWordsBtnWasClicked = false;
                return;
            }
            DictionaryWidget.previousWordsBtnWasClicked = true;
        });
        searchElems.refreshBtn.addEventListener("click", (event) => {
            event.preventDefault();
            location.reload();
        });
    }
    addDictionaryTermtoLocalStorage(sendToBrowserCache, wordcache, wordArray) {
        // Add the cache item to Local Storage
        try {
            if (localStorage.getItem('word-caches') == null) {
                // Local storage empty => add the word
                localStorage.setItem('word-caches', JSON.stringify(wordArray));
            }
            else {
                // Add word to current 'word-caches' in local storage
                let storageStr = localStorage.getItem('word-caches');
                if (storageStr == null) {
                    try {
                        throw new Error("Local storage 'word-caches' values null.");
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.log(error.name);
                            console.log(error.message);
                            console.log(error.stack);
                        }
                    }
                }
                else {
                    let allcache = JSON.parse(storageStr);
                    for (let cache of allcache) {
                        if (cache.wordURL == wordcache.wordURL) {
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
    fetchDictionaryTerm(word, wordUrl, elem, sendToCache, cacheName) {
        //TODO: dictionary cache management:
        //TODO: 1.) is to be cached true? --check
        //TODO: 2.) is to be cached false? --check
        //TODO: --> are they the same behavior? --check
        //TODO: --> is the result in the cache? --check
        //TODO: implement a send to cache option
        //
        //
        // The function calls to either store in Cache Storage
        // If items are to be cached, edit Local Storage cache names
        let wordCacheStore = [];
        let wordcache = {
            inCache: sendToCache,
            word: word,
            wordURL: wordUrl,
            cacheName: sendToCache ? cacheName : "",
        };
        wordCacheStore.push(wordcache);
        const wordFetchRequest = async () => {
            //set apiGET::sendToBrowserCache to true to use cache storage
            const wordFetch = new api_1.apiGET(wordcache.wordURL, false, wordcache.cacheName, elem.errorElem);
            //fetch request
            let data = await wordFetch.apiGET(wordFetch.getGETURL());
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }
            let wordData = data;
            let noDefinitions = false;
            if (typeof data == 'object') {
                if (Object.hasOwn(wordData, 'title')) {
                    noDefinitions = true;
                }
            }
            if (data != undefined && !noDefinitions) { // good fetch--> move forward to markup render
                DictionaryWidgetMarkup.createDictionaryTermWithMarkup(data, elem);
                this.addDictionaryTermtoLocalStorage(wordFetch.getSendToBrowserCache(), wordcache, wordCacheStore);
            }
            else {
                if (navigator.onLine !== false) { // check network status via navigator object
                    if (noDefinitions) {
                        if (wordData.title == "No Definitions Found")
                            elem.searchWord.classList.add("invalid-notfound");
                        elem.errorElem.classList.add("error-notfound");
                        elem.errorElem.innerText = "No Definitions Found";
                    }
                    else {
                        elem.searchWord.classList.add("invalid-notfound");
                        elem.errorElem.classList.add("error-notfound");
                        elem.errorElem.innerText = "Invalid word!";
                    }
                }
                else {
                    elem.errorElem.innerText += ", check network connection.";
                }
            }
        };
        wordFetchRequest();
    }
    wordValidation(intxt) {
        let trimmed = intxt.trim();
        let lettersRE = new RegExp("^[A-Za-z]{1,45}$");
        if (lettersRE.test(trimmed)) {
            return true;
        }
        else {
            //word is not an acceptable word.`);
            return false;
        }
    }
    wordSearchUpdate(searchElems) {
        // Take user input and filter to an accepted string
        let acceptedInputWord = false;
        this.wordValidation(searchElems.searchWord.value)
            ? acceptedInputWord = true : acceptedInputWord = false;
        if (acceptedInputWord) {
            // Create a URL of the accepted word for use in the fetch call
            this.wordURL = new URL(searchElems.searchWord.value.toString(), DictionaryWidget.requestUrl);
            this.fetchDictionaryTerm(searchElems.searchWord.value, this.wordURL, searchElems, false, "");
            // Remove unneeded classes if applied previously
            searchElems.searchWord.classList.remove("invalid");
            searchElems.searchWord.classList.remove("invalid-notfound");
            searchElems.errorElem.classList.remove("error");
            searchElems.errorElem.classList.remove("error-notfound");
            searchElems.errorElem.textContent = "";
        }
        else {
            searchElems.searchWord.classList.remove("invalid-notfound");
            searchElems.searchWord.classList.add("invalid");
            searchElems.errorElem.classList.remove("error-notfound");
            searchElems.errorElem.classList.add("error");
            searchElems.errorElem.textContent = "Invalid word!";
        }
        searchElems.searchWord.value = ''; // reset input string
    }
}
class DictionaryWidgetMarkup extends DictionaryWidget {
    static createDictionaryWidgetMarkup(elem) {
        //insert the widget after the passed in "elem"
        if (elem !== undefined) {
            if (elem.classList.contains("dictionaryWidget")) {
                const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                if (dictionary != null) {
                    // Create widget elements
                    const artH = dictionary.appendChild(document.createElement("h3"));
                    const searchForm = dictionary.appendChild(document.createElement("form"));
                    const previousWords = dictionary.appendChild(document.createElement("div"));
                    // Return the elements used in later functions
                    let searchWords = {
                        searchWord: searchForm.appendChild(document.createElement("input")),
                        wordSearch: searchForm.appendChild(document.createElement("button")),
                        dictionaryElem: dictionary,
                        errorElem: searchForm.appendChild(document.createElement("span")),
                        previousWordBtn: previousWords.appendChild(document.createElement("button")),
                        refreshBtn: previousWords.appendChild(document.createElement("button")),
                    };
                    const fontAwesomeSearchIcon = searchWords.wordSearch.appendChild(document.createElement("i"));
                    // Add attributes and property values
                    previousWords.classList.add("previousWords");
                    searchWords.searchWord.classList.add("monospace");
                    searchWords.previousWordBtn.classList.add("dictionary-btn");
                    searchWords.refreshBtn.classList.add("dictionary-btn");
                    fontAwesomeSearchIcon.classList.add("fa");
                    fontAwesomeSearchIcon.classList.add("fa-search");
                    searchWords.searchWord.setAttribute('type', 'text');
                    searchWords.searchWord.setAttribute('placeholder', 'Search...');
                    searchWords.searchWord.setAttribute("aria-label", "Input");
                    searchWords.wordSearch.setAttribute('type', 'button');
                    searchWords.wordSearch.setAttribute("aria-label", "Search");
                    dictionary.id = "dictionary";
                    artH.textContent = "Dictionary Term:";
                    searchForm.id = "dictionary-search";
                    searchForm.action = "index.html";
                    searchWords.searchWord.id = "search-word";
                    searchWords.wordSearch.id = "word-search";
                    searchWords.previousWordBtn.innerText = "Previous Word Searches";
                    searchWords.refreshBtn.innerText = "Refresh";
                    return searchWords;
                }
                else {
                    console.log("The determined dictionary element is null.");
                }
            }
            else {
                console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
            }
        }
        else {
            console.log(`There is no "dictionaryWidget" class on this page.`);
        }
    }
    static createDictionaryTermWithMarkup(wordData, searchElems) {
        if (wordData == null || wordData instanceof Object) {
            try {
                throw new Error("The data is null");
            }
            catch (error) {
                console.log(error.message);
            }
        }
        // Add the word's definition to the dictionary widget
        const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr")); // word definition separator
        definitionDescriptionContainer.classList.add("definitionDescription");
        // The word data represents complex JSON object
        // Recurse the word data object, adding elements from the various levels
        wordData.map((word) => {
            //console.log("The word is: ",word)
            const wordTitle = definitionDescription.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map((wordType) => {
                //console.log("WordType are: ", wordType)
                const wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
                const wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
                wordTypeH.textContent = wordType.partOfSpeech;
                wordType.definitions.map((def) => {
                    //console.log("Definition is: ", def);
                    let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                    let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                    definitionP.textContent = def.definition;
                    definitionP.classList.add("wordDefinition");
                    const addAdjacentElem = () => {
                        //console.log("Definitions is: ", def);
                        const newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
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
        definitionDescriptionContainer.appendChild(definitionDescription);
        DictionaryWidget.previousWordsBtnWasClicked = false;
    }
}
const dictionaryWidget = {
    init: (elem) => {
        // Create the dictionary widget, call create
        let dictionaryWidget = new DictionaryWidget();
        dictionaryWidget.createDictionaryWidget(elem);
    }
};
exports.default = dictionaryWidget;

},{"./api":5}],7:[function(require,module,exports){
"use strict";
//Author: Robert A Howell, April 2023
//Original Author(s): Mozilla Contributors, MDN
//License: https://www.mozilla.org/en-US/about/governance/policies/participation/
//MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//Source distribution: https://github.com/mdn/web-components-examples/tree/main/expanding-list-web-component
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingList = void 0;
// Create a class for the element
class ExpandingList extends HTMLUListElement {
    constructor() {
        // Always call super first in constructor
        // Return value from super() is a reference to this element
        super();
        // Get ul and li elements that are a child of this custom ul element
        // li elements can be containers if they have uls within them
        const uls = this.querySelectorAll('ul');
        const lis = this.querySelectorAll('li');
        // Hide all child uls
        // These lists will be shown when the user clicks a higher level container
        uls.forEach(ul => {
            ul.style.display = 'none';
        });
        // Look through each li element in the ul
        lis.forEach(li => {
            // If this li has a ul as a child, decorate it and add a click handler
            if (li.querySelectorAll('ul').length > 0) {
                // Add an attribute which can be used  by the style
                // to show an open or closed icon
                li.setAttribute('class', 'closed');
                // Wrap the li element's text in a new span element
                // so we can assign style and event handlers to the span
                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');
                // Copy text from li to span, set cursor style
                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = 'pointer';
                // Add click handler to this span
                newSpan.onclick = this.showul;
                newSpan.addEventListener('keydown', (event) => {
                    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
                        // next sibling to the span should be the ul
                        let nextul = newSpan.nextElementSibling;
                        // Toggle visible state and update class attribute on ul
                        if (nextul.style.display == 'block') {
                            nextul.style.display = 'none';
                            let spanParent = nextul.parentNode;
                            spanParent.setAttribute('class', 'ulistelem-closed');
                        }
                        else {
                            nextul.style.display = 'block';
                            let spanParent = nextul.parentNode;
                            spanParent.setAttribute('class', 'ulistelem-open');
                        }
                    }
                });
                // Add the span and remove the bare text node from the li
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
    }
    // li click handler
    showul = function (e) {
        // next sibling to the span should be the ul
        const nextul = e.target.nextElementSibling;
        // Toggle visible state and update class attribute on ul
        if (nextul.style.display == 'block') {
            nextul.style.display = 'none';
            nextul.parentNode.setAttribute('class', 'ulistelem-closed');
        }
        else {
            nextul.style.display = 'block';
            nextul.parentNode.setAttribute('class', 'ulistelem-open');
        }
    };
}
exports.ExpandingList = ExpandingList;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const expandingList_1 = require("./expandingList");
const expandingListDOMWidget = {
    init: () => {
        // Define the expanding list element, for use within the page
        customElements.define('expanding-list', expandingList_1.ExpandingList, { extends: 'ul' });
        // Update expanding list element properties
        // "DOM" page specific properties
        // Add a title attribute to all li-span that can expand further
        const expandableLiOpenOpen = document.querySelectorAll(`ul[is="expanding-list"] li span:first-child`);
        const expandableLiCloseSpan = document.querySelectorAll(`ul[is="expanding-list"] li span:nth-child(3)`);
        // Set attributes and property values for expanding-element expandable elements
        for (let span of expandableLiOpenOpen) {
            span.setAttribute('title', 'Select to expand...');
            span.setAttribute('tabindex', '0');
            // Add a click event listener to the 'DOM' items elements
            // --->when clicked, change the title property to reflect open or closed status
            span.addEventListener('click', (e) => {
                e.preventDefault();
                span.getAttribute('title') == 'Select to expand...'
                    ? (() => {
                        span.setAttribute('title', 'Select to close...');
                        if (span.nextElementSibling.nextElementSibling == null)
                            return;
                        span.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to close.');
                    })()
                    : (() => {
                        span.setAttribute('title', 'Select to expand...');
                        if (span.nextElementSibling.nextElementSibling == null)
                            return;
                        span.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to expand.');
                    })();
            });
        }
        // Set property of closing span elements
        for (let span of expandableLiCloseSpan) {
            span.setAttribute('title', 'Select opening element tag to expand.');
        }
    }
};
exports.default = expandingListDOMWidget;

},{"./expandingList":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
class GrowingCard extends HTMLLIElement {
    isGrown = false;
    // private static hasLink;
    // private static hadDetails;
    // private static hasDescription;
    constructor() {
        super();
        this.addEventListener('click', this.growCard);
    }
    static shrinkCard = (li) => {
        if (li.style.scale) {
            li.style.scale = "1";
            li.style.zIndex = "1";
            li.setIsGrown(false);
        }
    };
    static shadeInactiveCard = (li) => {
        if (GrowingCard.getIsAtLeastOneBig()) {
            if (!li.getIsGrown()) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    li.style.opacity = ".5";
                }
                else {
                    li.style.opacity = ".3";
                }
            }
            else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    li.style.opacity = "1";
                }
                else {
                    li.style.opacity = "1";
                }
            }
        }
        else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                li.style.opacity = "1";
            }
            else {
                li.style.opacity = "1";
            }
        }
    };
    static getIsAtLeastOneBig = () => {
        let listLIs = Array.from(document.querySelectorAll(`#webIDECards li`));
        let atLeastOneIsBig = listLIs.some((li) => li.getIsGrown() == true);
        return atLeastOneIsBig;
    };
    getIsGrown = () => {
        return this.isGrown;
    };
    setIsGrown = (truefalse) => {
        return this.isGrown = truefalse;
    };
    growCard = () => {
        this.style.scale = "1.2";
        this.style.zIndex = "2";
        this.style.opacity = "1";
        this.setIsGrown(true);
        // Need all the list elements to reference which one to grow
        // If it's not the clicked element, shrink it.
        let listLIs = document.querySelectorAll("#webIDECards li");
        for (let item of listLIs) {
            if (item !== this) {
                GrowingCard.shrinkCard(item);
                GrowingCard.shadeInactiveCard(item);
                // set the scale property for each card
                if (item.style.scale == "") {
                    item.style.scale = "1";
                    item.style.zIndex = "1";
                }
            }
        }
    };
}
const activeCard = {
    init: () => {
        customElements.define('growing-card', GrowingCard, { extends: 'li' });
        document.body.addEventListener('click', (e) => {
            if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLDetailsElement) {
                return;
            }
            e.preventDefault();
            // Array of list items (cards)
            let listLIs = Array.from(document.querySelectorAll("#webIDECards li"));
            // Click event to resize the cards if clicking outside of a card
            // When clicking outside a card, resize all cards to normal
            for (let item of listLIs) {
                let tempItem = item;
                if (e.target !== tempItem && !tempItem.contains(e.target)) {
                    GrowingCard.shrinkCard(tempItem);
                }
            }
            // Reshade all cards because none of them are big
            for (let li of listLIs) {
                GrowingCard.shadeInactiveCard(li);
            }
        });
    }
};
exports.default = activeCard;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const LinkDetails_1 = require("./LinkDetails");
//Header navigation links
const homeNavLink = new LinkDetails_1.default("Index", "Home", "Home", "index.html");
const pagesNavLink = new LinkDetails_1.default("Pages", "Pages", "Pages", "pages.html");
const NAVITEMS = [homeNavLink, pagesNavLink];
const HEADERFOOTER = {
    headerWidget: {
        init: () => {
            const pageMain = document.querySelector('main');
            let siteHeader;
            // Add header element to the page
            if (pageMain != null) {
                // if main element exists, add the header to it
                siteHeader = pageMain.insertAdjacentElement('beforebegin', HEADERFOOTER.headerWidget.buildHeader(pageMain));
                if (siteHeader != null)
                    siteHeader.prepend(HEADERFOOTER.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null before 'main' element.");
            }
            else {
                // if main element does not exist, add the header to the body
                siteHeader = document.body.insertAdjacentElement('afterbegin', HEADERFOOTER.headerWidget.buildHeader(null));
                if (siteHeader != null)
                    siteHeader.prepend(HEADERFOOTER.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null after 'body' element.");
            }
        },
        buildHeader: (main) => {
            const siteHeader = document.createElement('header');
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>'; //H1 Logo
            H1.setAttribute("id", "RandomWebBits");
            siteHeader.append(H1);
            if (main != null) {
                main.prepend(siteHeader);
            }
            else
                document.body.prepend(siteHeader);
            return siteHeader;
        },
        buildNavigation: () => {
            // Build the header navigation based on navigation data
            // Create navigation elements
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));
            // Append nav data to nav elements
            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
                // Add navigation attributes and property values
                navListLinks.textContent = `${item.innerText}`;
                // Environment links edit, requiring different link relatives to operate
                // Github pages operates from repository, not '/'
                if (window.location.host == 'rhowell476.github.io') {
                    //link data edit for dev environment
                    navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                }
                else {
                    //link data in other environments
                    navListLinks.setAttribute('href', `/${item.hReference}`);
                }
            });
            return headerNavFrag;
        }
    },
    footerWidget: {
        init: () => {
            // Add footer element to the page end
            let footer = HEADERFOOTER.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HEADERFOOTER.footerWidget.buildFaviconAttribution(footer));
        },
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            siteFooter.append(footerPara);
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
            return siteFooter;
        },
        buildFaviconAttribution: (footer) => {
            // Favicon attribution section + link to source
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755';
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = `Favicon designed by IconHome at `;
            // Append attribution to footer para
            footerIconPara.appendChild(footerIconLink);
            footer.appendChild(footerIconPara);
            return footerIconPara;
        }
    }
};
exports.default = HEADERFOOTER;

},{"./LinkDetails":2}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToDoWidget {
    static todosInLocalStorage = false;
    static ToDOs = 0;
    static ToDoElements;
    static setToDoListElements(ToDoListElements) {
        ToDoWidget.ToDoElements = ToDoListElements;
    }
    getToDoListElements() {
        let ToDoElements = {
            todoTable: document.querySelector('#ToDO table'),
            todoTableBody: document.getElementById('ToDoItems'),
            addButton: document.getElementById('AddButton'),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        };
        return ToDoElements;
    }
    createToDoListWidget(elem) {
        // Insert the widget after the passed in "elem"
        // Dependent on the page, todo widget may have pre-existing markup in place
        // Switch against the current page to determine markup needed
        if (elem !== undefined) {
            if (elem.classList.contains("ToDoList")) {
                switch (window.location.pathname) {
                    case '/RandomWebBits/':
                    case '/RandomWebBits/index.html':
                    case '/index.html':
                    case '/':
                    case '/dist/index.html':
                        // Create table elements needed for the todo list
                        const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                        const header = todolistSection.appendChild(document.createElement('h3'));
                        const div = todolistSection.appendChild(document.createElement('div'));
                        const table = div.appendChild(document.createElement('table'));
                        const thead = table.appendChild(document.createElement('thead'));
                        const tr1 = thead.appendChild(document.createElement('tr'));
                        const thleft = tr1.appendChild(document.createElement('th'));
                        const thmiddle = tr1.appendChild(document.createElement('th'));
                        const tbody = table.appendChild(document.createElement('tbody'));
                        const tfoot = table.appendChild(document.createElement('tfoot'));
                        const tr3 = tfoot.appendChild(document.createElement('tr'));
                        const td3left = tr3.appendChild(document.createElement('td'));
                        const td3IN = td3left.appendChild(document.createElement('input'));
                        const td3middle = tr3.appendChild(document.createElement('td'));
                        const INPUT = td3middle.appendChild(document.createElement('input'));
                        // Add attributes and property values
                        table.appendChild(document.createElement('tfoot'));
                        td3IN.setAttribute("aria-label", "Add");
                        td3IN.setAttribute("Value", "Add");
                        INPUT.setAttribute("name", "itemINPUT");
                        INPUT.setAttribute("type", "text");
                        INPUT.setAttribute("aria-label", "Input");
                        header.textContent = "To-Do:";
                        todolistSection.id = "ToDO";
                        thleft.textContent = "Complete?";
                        thmiddle.textContent = "Description";
                        tbody.id = "ToDoItems";
                        td3IN.id = "AddButton";
                        td3IN.type = "button";
                        // Create a sample to do item (it is not stored in cache)
                        this.createSampleTo_Do(tbody);
                        // With the elements created, set the class list elements
                        let listElements = this.getToDoListElements();
                        ToDoWidget.setToDoListElements(listElements);
                        this.populateToDoList();
                        this.addToDoEventListeners();
                        break;
                    case '/RandomWebBits/pages/todos.html':
                    case '/pages/todos.html':
                        // Markup exists on the page already
                        // With the elements created, set the class list elements
                        let listElementsPages = this.getToDoListElements();
                        ToDoWidget.setToDoListElements(listElementsPages);
                        // Create a sample to do item (it is not stored in cache)
                        const htbody = ToDoWidget.ToDoElements.todoTableBody;
                        if (htbody != null) {
                            this.createSampleTo_Do(htbody);
                        }
                        else {
                            try {
                                throw new Error("'ToDoItems' element was not found or is null");
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.log(error.name);
                                    console.log(error.message);
                                    console.log(error.stack);
                                }
                            }
                        }
                        this.populateToDoList();
                        this.addToDoEventListeners();
                        break;
                    default:
                        console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.");
                }
            }
            else {
                console.log(`Add "ToDoList" class to ${elem.nodeName} node.`);
            }
        }
        else {
            console.log(`There is no "ToDoList" class on this page.`);
        }
    }
    static isToDoInStorage() {
        let todos = JSON.parse(localStorage.getItem('ToDos'));
        if (todos == null) {
            return false;
        }
        else
            return true;
    }
    addtoDoToStorage(description) {
        let ToDo = {
            inCache: false,
            todoitem: description,
        };
        let ToDos = [];
        ToDos.push(ToDo);
        //add the ToDos to local cache
        let todos = JSON.parse(localStorage.getItem('ToDos'));
        try {
            if (todos == null) {
                localStorage.setItem('ToDos', JSON.stringify(ToDos));
                ToDoWidget.todosInLocalStorage = true;
            }
            else {
                todos.push(ToDo);
                localStorage.setItem('ToDos', JSON.stringify(todos));
            }
        }
        catch (err) {
            console.log("Problem storing To-do list item: ", err);
        }
    }
    removetoDoFromStorage(item) {
        if (!ToDoWidget.isToDoInStorage()) {
            try {
                throw new Error("Local storage values null.");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.name);
                    console.log(error.message);
                    console.log(error.stack);
                }
            }
        }
        else {
            let todos = JSON.parse(localStorage.getItem('ToDos'));
            todos = todos.filter((todo) => todo.todoitem !== item);
            if (todos.length > 0)
                localStorage.setItem('ToDos', JSON.stringify(todos));
            else
                localStorage.removeItem('ToDos');
        }
    }
    AddToDoRow(description, firstPaint) {
        //Create a table row with checkbox and delete options
        const TABLEITEM = ToDoWidget.ToDoElements.todoTable;
        if (TABLEITEM != null) {
            const tableFrag = document.createDocumentFragment();
            const newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
            const firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
            const checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
            const newITEM = newRow.appendChild(document.createElement('td')); //Table second data
            const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
            const delBOX = secondCOL.appendChild(document.createElement('input')); //Add deletebox
            // Add attributes and property values
            checkBOX.setAttribute('type', 'checkbox');
            checkBOX.setAttribute('aria-label', 'Checkbox');
            checkBOX.setAttribute('aria-label', 'Delete');
            newITEM.setAttribute('num', ToDoWidget.ToDOs ? (() => {
                let elem = document.querySelector('#ToDO td[num]');
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoWidget.ToDOs).toString();
            })() : (1).toString());
            newITEM.textContent = description.toString(); //Populate second col
            ToDoWidget.ToDOs++; //Number of Items
            delBOX.setAttribute('type', 'submit');
            delBOX.setAttribute('value', 'Delete');
            // Add the row to the ToDos table
            TABLEITEM.appendChild(tableFrag);
            //add an event listener for when 'delete' is clicked
            delBOX.addEventListener("click", () => { this.DeleteButton(delBOX); });
            if (firstPaint) {
                //add to list storage
                this.addtoDoToStorage(description);
            }
        }
        else {
            try {
                throw new Error("There were no 'ToDoItems' found or they are null.");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.name);
                    console.log(error.message);
                    console.log(error.stack);
                }
            }
        }
    }
    populateToDoList() {
        //retrieve todo items in local storage and add each to the list
        let parsedToDos = JSON.parse(localStorage.getItem('ToDos'));
        if (parsedToDos != null) {
            for (let i = 0; i < parsedToDos.length; i++) {
                this.AddToDoRow(parsedToDos[i].todoitem, false);
            }
        }
    }
    addToDoEventListeners() {
        const ADDBUTTON = ToDoWidget.ToDoElements.addButton;
        const ADDITEMENTER = ToDoWidget.ToDoElements.addItemToEnter;
        if (ADDBUTTON != null && ADDITEMENTER != null) {
            ADDBUTTON.addEventListener("click", () => {
                this.AddToDoRow(ADDITEMENTER.value, true);
                ADDITEMENTER.value = '';
            });
            ADDITEMENTER.addEventListener("keydown", (e) => {
                if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                    this.AddToDoRow(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                }
            });
        }
        else {
            try {
                throw new Error("Element was not found or is null");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.name);
                    console.log(error.message);
                    console.log(error.stack);
                }
            }
        }
    }
    DeleteButton(box) {
        if (box.parentNode != null && box.parentNode.previousSibling != null &&
            box.parentNode.previousSibling.previousSibling != null) {
            let rowChkBx = box.parentNode.previousSibling.previousSibling;
            let rowChkBxIN = rowChkBx.childNodes[0];
            const todoTable = ToDoWidget.ToDoElements.todoTable;
            if (todoTable != null) {
                let tr = box.parentNode.parentNode;
                let i = tr.rowIndex;
                let value = box.parentNode.previousSibling.textContent;
                if (rowChkBxIN.checked) {
                    //remove row since completed
                    todoTable.deleteRow(i);
                    if (value != 'Add a ToDO Item.') {
                        ToDoWidget.ToDOs--;
                        //delete associated storage item
                        this.removetoDoFromStorage(value);
                    }
                }
                else {
                    todoTable.deleteRow(i);
                    ToDoWidget.ToDOs--;
                }
            }
            else {
                try {
                    throw new Error("'table' element not found or it is null.");
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }
        }
    }
    createSampleTo_Do(tbody) {
        if (!ToDoWidget.isToDoInStorage()) {
            // Create a sample entry in the ToDo table as a placeholder
            const tr2 = tbody.appendChild(document.createElement('tr'));
            const td2left = tr2.appendChild(document.createElement('td'));
            const td2IN = td2left.appendChild(document.createElement('input'));
            const td2middle = tr2.appendChild(document.createElement('td'));
            const td2right = tr2.appendChild(document.createElement('td'));
            const td2DEL = td2right.appendChild(document.createElement('input'));
            // Add attributes and property values
            td2IN.setAttribute("aria-label", "Checkbox");
            td2middle.setAttribute("num", `${1}`);
            td2IN.setAttribute("aria-label", "Delete");
            td2DEL.setAttribute("type", "reset");
            td2DEL.setAttribute("value", "Delete");
            td2IN.type = "checkbox";
            td2middle.textContent = "Add a ToDO Item.";
            ToDoWidget.ToDOs++;
            //"delete" event listener
            td2DEL.addEventListener("click", () => { this.DeleteButton(td2DEL); });
        }
    }
}
const todosWidget = {
    init: (elem) => {
        // Create the to-do widget, call create
        const todoWidget = new ToDoWidget();
        // Creates the markup needed and imports data from local storage, containing the todo items
        todoWidget.createToDoListWidget(elem);
    }
};
exports.default = todosWidget;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const WebBit_1 = require("../components/WebBit");
// Create new AA (Arbitrary Article)
const ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup"), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example"), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate"), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo"), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon"), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction"), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo"), new WebBit_1.default("IP Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon"), new WebBit_1.default("HTML Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon"), new WebBit_1.default("Network Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon"), new WebBit_1.default("PowerShell Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon"), new WebBit_1.default("LEARN: DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard"), new WebBit_1.default("LEARN: Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon"), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon"), new WebBit_1.default("WebIDE", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon"));
const GuideShorts = new Array(new WebBit_1.default("Search Verticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon"), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon"), new WebBit_1.default("DevTools", 19, "GUIDE: Dev Tools: Application Tab", "Review site data when clearing the browser history", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon"), new WebBit_1.default("DevToolsTwo", 21, "GUIDE: Dev Tools: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two"));
const Explore = new Array(new WebBit_1.default("nasa", 3, "EXPLORE: NASA Pages", "Check out some NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo"), new WebBit_1.default("Virtual Tour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON"));
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"../components/WebBit":3}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const AttributionLink_1 = require("../components/AttributionLink");
let ATTRIBUTIONLINKDATA = [
    new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1),
    new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2),
    new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4),
    new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8),
    new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9),
    new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10),
    new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11),
    new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12),
    new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13),
    new AttributionLink_1.default("content writing icons", "Content writing icons created by Vectors Tank - Flaticon", "https://www.flaticon.com/free-icons/content-writing", "Flaticon", "Search Verticals", 14),
    new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15),
    new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "SMTP and Email", 16),
    new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17),
    new AttributionLink_1.default("google expeditions icons", "Google expeditions icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/google-expeditions", "Flaticon", "Virtual Tour", 18),
    new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "DevTools", 19),
    new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20),
    new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "DevToolsTwo", 21),
    new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22),
    new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23),
    new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)
];
exports.default = ATTRIBUTIONLINKDATA;

},{"../components/AttributionLink":1}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const WebBits_1 = require("./components/WebBits");
const dictionarywidget_1 = require("./components/dictionarywidget");
const todos_1 = require("./components/todos");
const headerfooter_1 = require("./components/headerfooter");
const expandingListDOMWidget_1 = require("./components/expandingListDOMWidget");
const growingcard_1 = require("./components/growingcard");
// entry point
(() => {
    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", () => {
        //'Index' and 'Pages' routes, add cards widget
        if (window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '' ||
            window.location.pathname == '/RandomWebBits/pages.html' ||
            window.location.pathname == '/pages.html') {
            WebBits_1.default.init(); // cards widget initialization
        }
        // Add header and footer components
        headerfooter_1.default.headerWidget.init();
        headerfooter_1.default.footerWidget.init();
        // Initialize page components
        // dom.html page uses expandingLists component
        if (window.location.pathname == '/pages/dom.html') {
            expandingListDOMWidget_1.default.init();
        }
        if (window.location.pathname == '/pages/webides.html') {
            growingcard_1.default.init();
        }
        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement) {
            dictionarywidget_1.default.init(dictionaryElement);
        }
        // Add ToDos widget if that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            todos_1.default.init(toDosElement);
    });
})();

},{"./components/WebBits":4,"./components/dictionarywidget":6,"./components/expandingListDOMWidget":8,"./components/growingcard":9,"./components/headerfooter":10,"./components/todos":11}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvY29tcG9uZW50cy9MaW5rRGV0YWlscy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdC50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvY29tcG9uZW50cy9hcGkudHMiLCJzcmMvY29tcG9uZW50cy9kaWN0aW9uYXJ5d2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvZXhwYW5kaW5nTGlzdC50cyIsInNyYy9jb21wb25lbnRzL2V4cGFuZGluZ0xpc3RET01XaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9ncm93aW5nY2FyZC50cyIsInNyYy9jb21wb25lbnRzL2hlYWRlcmZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL3RvZG9zLnRzIiwic3JjL2xpYi9kYXRhLnRzIiwic3JjL2xpYi9kYXRhX0F0dHJpYnV0aW9uTGlua3MudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsa0NBQWtDO0FBQ2xDLCtDQUF3QztBQUV4Qyx1Q0FBdUM7QUFDdkMsTUFBTSxlQUFnQixTQUFRLHFCQUFXO0lBQ3JDLGNBQWMsQ0FBUztJQUN2QixTQUFTLENBQVM7SUFFbEIsWUFDSSxLQUFhLEVBQ2IsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsUUFBZ0IsRUFDaEIsU0FBaUI7UUFHakIsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQUVELGtCQUFlLGVBQWUsQ0FBQzs7OztBQ3ZCL0Isa0NBQWtDOztBQUVsQyxNQUFNLFdBQVc7SUFDYixLQUFLLENBQVM7SUFDZCxTQUFTLENBQVM7SUFDbEIsUUFBUSxDQUFTO0lBQ2pCLFVBQVUsQ0FBUztJQUVuQixZQUFZLEtBQWEsRUFBRSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsVUFBa0I7UUFDOUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUztZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7SUFDaEMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsV0FBVyxDQUFDOzs7OztBQ2hCM0Isa0NBQWtDO0FBQ2xDLE1BQU0sTUFBTTtJQUNSLEVBQUUsQ0FBUztJQUNYLGFBQWEsQ0FBUztJQUN0QixJQUFJLENBQVM7SUFDYixXQUFXLENBQVM7SUFDcEIsV0FBVyxDQUFPO0lBQ2xCLFdBQVcsQ0FBUztJQUNwQixTQUFTLENBQVM7SUFDbEIsWUFBWSxDQUFTO0lBRXJCLFlBQ0ksRUFBVSxFQUNWLGFBQXFCLEVBQ3JCLElBQVksRUFDWixXQUFtQixFQUNuQixXQUFpQixFQUNqQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixZQUFvQjtRQUVwQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ3BDLENBQUM7Q0FDSjtBQUVELGtCQUFlLE1BQU0sQ0FBQzs7Ozs7QUM5QnRCLHNDQUFvQztBQUNwQyx3RUFBK0Q7QUFFL0QsTUFBTSxXQUFXLEdBQUc7SUFDaEIsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNQLHVEQUF1RDtRQUN2RCw2RUFBNkU7UUFDN0UsSUFBSSxhQUFhLEdBQVE7WUFDckIsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSwrQkFBbUIsQ0FBQztZQUN0RSxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBVSxDQUFDLEtBQUssRUFBRSxFQUFFLCtCQUFtQixDQUFDO1lBQ3RFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsK0JBQW1CLENBQUM7U0FDekUsQ0FBQztRQUVGLG9FQUFvRTtRQUNwRSxJQUFJLFlBQVksR0FBcUI7WUFDakMsV0FBVyxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixDQUFFO1lBQzlELFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUU7WUFDeEQsV0FBVyxDQUFDLDBCQUEwQixDQUFDLGlCQUFpQixDQUFFO1NBQzdELENBQUM7UUFFRix1REFBdUQ7UUFDdkQsNkRBQTZEO1FBQzdELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLDJCQUEyQjtZQUN2RCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUI7WUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCLEVBQUU7WUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRTtnQkFDaEQsc0JBQXNCO2dCQUN0QixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFMUQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztZQUM3RSxDQUFDLENBQUE7WUFDRCxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsMkRBQTJEO1FBQzNELG9GQUFvRjtRQUNwRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUM7Z0JBQzdCLGdEQUFnRDtnQkFDaEQsK0NBQStDO2dCQUMvQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7b0JBQzNDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQ0k7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO2FBQ25DO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsMEJBQTBCLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRTtRQUN6QyxzREFBc0Q7UUFDdEQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUM7WUFDakQsK0JBQStCO1lBQy9CLDBCQUEwQjtZQUMxQixtQ0FBbUM7WUFDbkMsaUNBQWlDO1lBRWpDLGFBQWE7WUFDYixhQUFhO1lBQ2IsRUFBRTtZQUNGLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNCLDBDQUEwQztZQUMxQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3QyxTQUFTLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFFaEMsT0FBTyxjQUFjLENBQUM7U0FDekI7YUFDSTtZQUNELElBQUk7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsT0FBTyxLQUFLLEVBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtTQUNKO0lBRUwsQ0FBQztJQUNELGlCQUFpQixFQUFFLENBQUMsU0FBYyxFQUFFLFNBQTRCLEVBQUUsRUFBRTtRQUNoRSxrQ0FBa0M7UUFDbEMsRUFBRTtRQUNGLHFCQUFxQjtRQUNyQiwrQkFBK0I7UUFDL0IscUNBQXFDO1FBQ3JDLG9DQUFvQztRQUNwQyx5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLDZCQUE2QjtRQUM3QixhQUFhO1FBQ2IsU0FBUztRQUNULEVBQUU7UUFDRixpRUFBaUU7UUFDakUsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ3JDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVuQywrQ0FBK0M7WUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkQsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3RELGVBQWUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN6QyxZQUFZLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDL0MsWUFBWSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUM7WUFFeEMscURBQXFEO1lBQ3JELGtFQUFrRTtZQUNsRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLDBFQUEwRTtnQkFDMUUsbURBQW1EO2dCQUNuRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDL0QsRUFBRTtvQkFDRixpREFBaUQ7b0JBQ2pELHNCQUFzQjtvQkFDdEIsOEJBQThCO29CQUM5Qix5Q0FBeUM7b0JBQ3pDLGFBQWE7b0JBQ2Isa0NBQWtDO29CQUNsQyx5QkFBeUI7b0JBQ3pCLHVCQUF1QjtvQkFDdkIsc0VBQXNFO29CQUN0RSxrQkFBa0I7b0JBQ2xCLGFBQWE7b0JBQ2Isb0NBQW9DO29CQUNwQyxFQUFFO29CQUNGLG9EQUFvRDtvQkFDcEQsNENBQTRDO29CQUM1QyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEUsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7b0JBQ3ZFLElBQUksUUFBUSxHQUFxQixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdEUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQy9CLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNuRSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtvQkFFaEcscURBQXFEO29CQUNyRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtvQkFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNyQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzdDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUM5QyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7b0JBQ3JDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDckMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNqQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7aUJBRW5EO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBcUI7WUFDckIsMkNBQTJDO1lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFFRCxrQkFBZSxXQUFXLENBQUE7Ozs7QUMxTDFCLGtDQUFrQzs7O0FBRWxDLE1BQWEsTUFBTTtJQUNQLE1BQU0sQ0FBTTtJQUNaLGtCQUFrQixHQUFZLEtBQUssQ0FBQztJQUNwQyxnQkFBZ0IsQ0FBUztJQUMxQixTQUFTLENBQWM7SUFDdEIsYUFBYSxHQUFZLEtBQUssQ0FBQyxDQUFDLDJCQUEyQjtJQUMzRCxZQUFZLENBQU0sQ0FBQywrQkFBK0I7SUFFMUQsWUFBWSxNQUFXLEVBQUUsa0JBQTJCLEVBQUUsZ0JBQXdCLEVBQUUsU0FBc0I7UUFDbEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBRUsscUJBQXFCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRU0sU0FBUyxDQUFDLE1BQW9CO1FBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakM7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVPLHFCQUFxQixDQUFDLEdBQWE7UUFDdkMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxNQUFXO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNYLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hELElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxJQUFJLFlBQVksUUFBUSxFQUFDO2dCQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0Qjs7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBVztRQUMzQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBQztZQUN4QixJQUFJLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxFQUFFO2dCQUNsRCxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7b0JBQ3BCLDZEQUE2RDtvQkFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUU7NEJBQ2hDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBQztnQ0FDckIsNkJBQTZCO2dDQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0NBQzFCLDZEQUE2RDtvQ0FDN0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29DQUVoQyw4QkFBOEI7b0NBQzlCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29DQUMxQixPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDcEQsQ0FBQyxDQUFDLENBQUE7NkJBQ0w7aUNBQ0k7Z0NBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NkJBQy9DO3dCQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQyxDQUFBO2lCQUNMO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUUsQ0FBQyxRQUFZLEVBQUcsRUFBRTtnQkFDckMsT0FBTyxRQUFRLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGdCQUFnQixDQUFDO1NBQzNCO2FBQ0k7WUFDRCxJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxDQUFDLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLFdBQVcsQ0FBQztTQUN0QjtJQUVMLENBQUM7Q0FDSjtBQXpHRCx3QkF5R0M7Ozs7O0FDM0dELGtDQUFrQztBQUNsQywrQkFBK0I7QUFJL0IsTUFBTSxnQkFBZ0I7SUFDVixNQUFNLENBQUMsd0JBQXdCLENBQVU7SUFDekMsTUFBTSxDQUFDLGdCQUFnQixDQUFTO0lBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQVc7SUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBVyxrREFBa0QsQ0FBQztJQUNoRixNQUFNLENBQUMsVUFBVSxDQUEwQjtJQUMzQyxNQUFNLENBQUMsMEJBQTBCLEdBQVksS0FBSyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyx5QkFBeUIsR0FBWSxLQUFLLENBQUM7SUFDbEQsTUFBTSxDQUFDLHlCQUF5QixHQUFZLEtBQUssQ0FBQztJQUNsRCxPQUFPLENBQU07SUFFcEI7UUFDSSxrREFBa0Q7UUFDbEQsK0RBQStEO1FBQy9ELGlCQUFpQjtJQUNyQixDQUFDO0lBQ00sc0JBQXNCLENBQUMsSUFBYTtRQUN2QyxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3RSw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZDLGlEQUFpRDtRQUNqRCxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLENBQUMseUJBQXlCO1FBQ25DLDZCQUE2QjtRQUM3Qiw0RUFBNEU7UUFFNUUsNkNBQTZDO1FBQzdDLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3BCLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVNLG1CQUFtQixDQUFDLFdBQWlEO1FBQ3hFLElBQUksV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDREQUE0RCxDQUFDLENBQUM7WUFDMUUsT0FBTztTQUNWO1FBQ0QsZ0NBQWdDO1FBQ2hDLGtDQUFrQztRQUNsQyxXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUE7UUFDRixXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRiwrREFBK0Q7UUFDL0QscUVBQXFFO1FBQ3JFLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDNUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sdUJBQXVCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pFLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNqRSxJQUFJLGtCQUEyQixDQUFDO1lBQ2hDLElBQUksZ0JBQWdCLENBQUMsMEJBQTBCLElBQUksS0FBSyxFQUFFO2dCQUN0RCxJQUFJLGdCQUFnQixDQUFDLHlCQUF5QixJQUFJLEtBQUssRUFBRTtvQkFDckQsa0JBQWtCLEdBQUcsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDOUcsa0JBQWtCLENBQUMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO29CQUMxQyw0REFBNEQ7b0JBQzVELElBQUksdUJBQXVCLElBQUksU0FBUyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7d0JBQ25GLEtBQUssSUFBSSxTQUFTLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFOzRCQUMvQyxNQUFNLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQzlGLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ3BELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLENBQUMsQ0FBQzs0QkFDNUUsb0JBQW9CLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7NEJBQ2xELG1DQUFtQzs0QkFDbkMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0NBQ3JELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQ0FDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUN4RixDQUFDLENBQUMsQ0FBQTs0QkFDRixnQkFBZ0IsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7eUJBQ3JEO3FCQUNKO3lCQUNJO3dCQUNELElBQUksZ0JBQWdCLENBQUMseUJBQXlCLElBQUksS0FBSyxFQUFFOzRCQUNyRCxNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ3pGLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDckUsa0JBQWtCLENBQUMsV0FBVyxHQUFHLCtDQUErQyxDQUFDOzRCQUNqRixnQkFBZ0IsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7NEJBQ2xELGdCQUFnQixDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQzt5QkFDdEQ7NkJBQ0k7NEJBQ0QsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUN4QyxnQkFBZ0IsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7NEJBQ25ELE9BQU87eUJBQ1Y7cUJBQ0o7aUJBQ0o7cUJBQ0k7b0JBQ0QsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN4QyxnQkFBZ0IsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7b0JBQ25ELE9BQU87aUJBQ1Y7YUFDSjtpQkFDSTtnQkFDRCxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3ZDLGdCQUFnQixDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQztnQkFDcEQsT0FBTzthQUNWO1lBQ0QsZ0JBQWdCLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLCtCQUErQixDQUFDLGtCQUEyQixFQUFFLFNBQWdDLEVBQUUsU0FBZ0I7UUFDbkgsc0NBQXNDO1FBQ3RDLElBQUk7WUFDQSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUM3QyxzQ0FBc0M7Z0JBQ3RDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNsRTtpQkFDSTtnQkFDRCxxREFBcUQ7Z0JBQ3JELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3JELElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtvQkFDcEIsSUFBSTt3QkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7cUJBQy9EO29CQUNELE9BQU8sS0FBSyxFQUFFO3dCQUNWLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTs0QkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDNUI7cUJBQ0o7aUJBQ0o7cUJBQ0k7b0JBQ0QsSUFBSSxRQUFRLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9ELEtBQUssSUFBSSxLQUFLLElBQUksUUFBUSxFQUFFO3dCQUN4QixJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTs0QkFDcEMsbUNBQW1DOzRCQUNuQyxpQ0FBaUM7NEJBQ2pDLE9BQU87eUJBQ1Y7cUJBQ0o7b0JBRUQsc0RBQXNEO29CQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QixZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0o7U0FDSjtRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsT0FBWSxFQUFFLElBQThCLEVBQ2xGLFdBQW9CLEVBQUUsU0FBaUI7UUFDdkMsb0NBQW9DO1FBQ3BDLHlDQUF5QztRQUN6QywwQ0FBMEM7UUFDMUMsK0NBQStDO1FBQy9DLCtDQUErQztRQUMvQyx3Q0FBd0M7UUFDeEMsRUFBRTtRQUNGLEVBQUU7UUFDRixzREFBc0Q7UUFDdEQsNERBQTREO1FBQzVELElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBMEI7WUFDbkMsT0FBTyxFQUFFLFdBQVc7WUFDcEIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDMUMsQ0FBQTtRQUNELGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0IsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQyw2REFBNkQ7WUFDN0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUYsZUFBZTtZQUNmLElBQUksSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUM7WUFDekIsSUFBSSxhQUFhLEdBQVksS0FBSyxDQUFDO1lBQ25DLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO2dCQUN6QixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFO29CQUNsQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUN4QjthQUNKO1lBQ0QsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsOENBQThDO2dCQUNyRixzQkFBc0IsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDdEc7aUJBQ0k7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRSxFQUFFLDRDQUE0QztvQkFDMUUsSUFBSSxhQUFhLEVBQUU7d0JBQ2YsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLHNCQUFzQjs0QkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztxQkFDckQ7eUJBQ0k7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7cUJBQzlDO2lCQUNKO3FCQUNJO29CQUNELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLDZCQUE2QixDQUFDO2lCQUM3RDthQUNKO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sY0FBYyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFDSTtZQUNELG9DQUFvQztZQUNwQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxXQUFxQztRQUMxRCxtREFBbUQ7UUFDbkQsSUFBSSxpQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM3QyxDQUFDLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDM0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQiw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTdGLGdEQUFnRDtZQUNoRCxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pELFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUMxQzthQUNJO1lBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pELFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7U0FDdkQ7UUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7SUFDNUQsQ0FBQzs7QUFJTCxNQUFNLHNCQUF1QixTQUFRLGdCQUFnQjtJQUUxQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBYTtRQUNwRCw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtvQkFDcEIseUJBQXlCO29CQUN6QixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEUsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzFFLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUUzRSw4Q0FBOEM7b0JBQzlDLElBQUksV0FBVyxHQUE2Qjt3QkFDeEMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbkUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDcEUsY0FBYyxFQUFlLFVBQVU7d0JBQ3ZDLFNBQVMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2pFLGVBQWUsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzVFLFVBQVUsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzFFLENBQUE7b0JBQ0QsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRTlGLHFDQUFxQztvQkFDckMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzdDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbEQsV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQzVELFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN2RCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNqRCxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3BELFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDaEUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMzRCxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3RELFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUQsVUFBVSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUM7b0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUM7b0JBQ3RDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUM7b0JBQ3BDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO29CQUNqQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7b0JBQzFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQztvQkFDMUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7b0JBQ2pFLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFFN0MsT0FBTyxXQUFXLENBQUM7aUJBQ3RCO3FCQUNJO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztpQkFDN0Q7YUFDSjtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsUUFBUSxRQUFRLENBQUMsQ0FBQTthQUN4RTtTQUNKO2FBQ0k7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7U0FDcEU7SUFDTCxDQUFDO0lBQ00sTUFBTSxDQUFDLDhCQUE4QixDQUFDLFFBQWEsRUFBRSxXQUFxQztRQUM3RixJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUyxZQUFZLE1BQU0sRUFBRTtZQUNqRCxJQUFJO2dCQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTthQUN0QztZQUNELE9BQU8sS0FBSyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFFRCxxREFBcUQ7UUFDckQsTUFBTSw4QkFBOEIsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0csTUFBTSxxQkFBcUIsR0FBRyw4QkFBOEIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFDN0YsOEJBQThCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXRFLCtDQUErQztRQUMvQyx3RUFBd0U7UUFDeEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3ZCLG1DQUFtQztZQUNuQyxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsQyxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDaEMseUNBQXlDO2dCQUN6QyxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyRixTQUFTLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQzlDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7b0JBQ2xDLHNDQUFzQztvQkFDdEMsSUFBSSxlQUFlLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzdFLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxXQUFXLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7b0JBRTNDLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRTt3QkFDekIsdUNBQXVDO3dCQUN2QyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDekYsSUFBSSxJQUFJLFlBQVksV0FBVyxFQUFFOzRCQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDNUQsS0FBSyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO3lCQUNuQzt3QkFDRCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDeEMsQ0FBQyxDQUFBO29CQUNELDRFQUE0RTtvQkFDNUUsU0FBUyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUFFRCxNQUFNLGdCQUFnQixHQUFHO0lBQ3JCLElBQUksRUFBRSxDQUFDLElBQWEsRUFBRSxFQUFFO1FBQ3JCLDRDQUE0QztRQUM1QyxJQUFJLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLGdCQUFnQixDQUFDOzs7O0FDclloQyxxQ0FBcUM7QUFDckMsK0NBQStDO0FBQy9DLGlGQUFpRjtBQUNqRiw4RUFBOEU7QUFDOUUsNEdBQTRHOzs7QUFFNUcsaUNBQWlDO0FBQ2pDLE1BQWEsYUFBYyxTQUFRLGdCQUFnQjtJQUMvQztRQUNJLHlDQUF5QztRQUN6QywyREFBMkQ7UUFDM0QsS0FBSyxFQUFFLENBQUM7UUFFUixvRUFBb0U7UUFDcEUsNkRBQTZEO1FBQzdELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMscUJBQXFCO1FBQ3JCLDBFQUEwRTtRQUMxRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2IsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgseUNBQXlDO1FBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDYixzRUFBc0U7WUFDdEUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEMsbURBQW1EO2dCQUNuRCxpQ0FBaUM7Z0JBQ2pDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUVuQyxtREFBbUQ7Z0JBQ25ELHdEQUF3RDtnQkFDeEQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFL0MsOENBQThDO2dCQUM5QyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFFakMsaUNBQWlDO2dCQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDMUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLGFBQWEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBQzt3QkFDakQsNENBQTRDO3dCQUM1QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsa0JBQXNDLENBQUM7d0JBRTVELHdEQUF3RDt3QkFDeEQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUU7NEJBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs0QkFDOUIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQTZCLENBQUM7NEJBQ3RELFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUE7eUJBQ25EOzZCQUFNOzRCQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDL0IsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQTZCLENBQUM7NEJBQ3RELFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUE7eUJBQ2pEO3FCQUNSO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2dCQUVGLHlEQUF5RDtnQkFDekQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RCxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixNQUFNLEdBQUcsVUFBVSxDQUFNO1FBQ3JCLDRDQUE0QztRQUM1QyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1FBRTNDLHdEQUF3RDtRQUN4RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUMsQ0FBQztDQUNMO0FBM0VELHNDQTJFQzs7Ozs7QUNsRkQsa0NBQWtDO0FBQ2xDLG1EQUFnRDtBQUVoRCxNQUFNLHNCQUFzQixHQUFHO0lBQzNCLElBQUksRUFBQyxHQUFHLEVBQUU7UUFDTiw2REFBNkQ7UUFDN0QsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSw2QkFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUUsMkNBQTJDO1FBQzNDLGlDQUFpQztRQUNqQywrREFBK0Q7UUFDL0QsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUN0RyxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRXhHLCtFQUErRTtRQUMvRSxLQUFLLElBQUksSUFBSSxJQUFJLG9CQUFvQixFQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkMseURBQXlEO1lBQ3pELCtFQUErRTtZQUMvRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxxQkFBcUI7b0JBQy9DLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTt3QkFDSixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJOzRCQUFFLE9BQU87d0JBQy9ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHNDQUFzQyxDQUFDLENBQUM7b0JBQzdHLENBQUMsQ0FBQyxFQUFFO29CQUNKLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTt3QkFDSixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBRSxDQUFDO3dCQUNuRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJOzRCQUFFLE9BQU87d0JBQy9ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHVDQUF1QyxDQUFDLENBQUM7b0JBQzlHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQTtTQUNMO1FBQ0Qsd0NBQXdDO1FBQ3hDLEtBQUssSUFBSSxJQUFJLElBQUkscUJBQXFCLEVBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsc0JBQXNCLENBQUM7Ozs7O0FDMUN0QyxrQ0FBa0M7QUFDbEMsTUFBTSxXQUFZLFNBQVEsYUFBYTtJQUMzQixPQUFPLEdBQVksS0FBSyxDQUFDO0lBQ2pDLDBCQUEwQjtJQUMxQiw2QkFBNkI7SUFDN0IsaUNBQWlDO0lBRWpDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQWUsRUFBRSxFQUFFO1FBQzNDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7WUFDZixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDLENBQUE7SUFFTSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFlLEVBQUUsRUFBRTtRQUNsRCxJQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFDO1lBQ2hDLElBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUM7Z0JBQ2hCLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNqRixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQzNCO3FCQUNJO29CQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDM0I7YUFDSjtpQkFDSTtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDakYsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2lCQUMxQjtxQkFDSTtvQkFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7aUJBQzFCO2FBQ0o7U0FDSjthQUNJO1lBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pGLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzthQUMxQjtpQkFDSTtnQkFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUMsQ0FBQTtJQUVNLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7UUFDcEMsSUFBSSxPQUFPLEdBQW1CLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUN2RixJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUM7UUFDcEUsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtRQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQyxDQUFBO0lBRU8sVUFBVSxHQUFHLENBQUMsU0FBa0IsRUFBRSxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDcEMsQ0FBQyxDQUFBO0lBRU8sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLDREQUE0RDtRQUM1RCw4Q0FBOEM7UUFDOUMsSUFBSSxPQUFPLEdBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUE2QixDQUFDO1FBQ3hGLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksSUFBSSxLQUFLLElBQUksRUFBQztnQkFDZCxXQUFXLENBQUMsVUFBVSxDQUFFLElBQW9CLENBQUMsQ0FBQztnQkFDOUMsV0FBVyxDQUFDLGlCQUFpQixDQUFFLElBQW9CLENBQUMsQ0FBQztnQkFFckQsdUNBQXVDO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7aUJBQzNCO2FBQ0o7U0FDSjtJQUNMLENBQUMsQ0FBQTs7QUFJTCxNQUFNLFVBQVUsR0FBRztJQUNmLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV0RSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUcsQ0FBQyxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLGtCQUFrQixFQUFDO2dCQUMvRSxPQUFPO2FBQ1Y7WUFDRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsOEJBQThCO1lBQzlCLElBQUksT0FBTyxHQUFtQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFFdkYsZ0VBQWdFO1lBQ2hFLDJEQUEyRDtZQUMzRCxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQWMsQ0FBQyxFQUFDO29CQUM5RCxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1lBRUQsaURBQWlEO1lBQ2pELEtBQUssSUFBSSxFQUFFLElBQUksT0FBTyxFQUFDO2dCQUNuQixXQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckM7UUFFTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsVUFBVSxDQUFDOzs7OztBQ3ZIMUIsa0NBQWtDO0FBQ2xDLCtDQUF3QztBQUV4Qyx5QkFBeUI7QUFDekIsTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBVyxDQUMvQixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLENBQ2YsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVcsQ0FDaEMsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsWUFBWSxDQUNmLENBQUE7QUFDRCxNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUU3QyxNQUFNLFlBQVksR0FBRztJQUNqQixZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ1AsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFJLFVBQTBCLENBQUM7WUFFL0IsaUNBQWlDO1lBQ2pDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtnQkFFbEIsK0NBQStDO2dCQUMvQyxVQUFVLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxJQUFJLFVBQVUsSUFBSSxJQUFJO29CQUNsQixVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzs7b0JBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQzthQUMzRTtpQkFDSTtnQkFDRCw2REFBNkQ7Z0JBQzdELFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxJQUFJLFVBQVUsSUFBSSxJQUFJO29CQUNsQixVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzs7b0JBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELENBQUMsQ0FBQzthQUMxRTtRQUNMLENBQUM7UUFDRCxXQUFXLEVBQUUsQ0FBQyxJQUF3QixFQUFFLEVBQUU7WUFDdEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxTQUFTO1lBQy9DLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdEIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDNUI7O2dCQUVHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxlQUFlLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLHVEQUF1RDtZQUN2RCw2QkFBNkI7WUFDN0IsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEQsTUFBTSxTQUFTLEdBQUcsYUFBYTtpQkFDMUIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFL0Msa0NBQWtDO1lBQ2xDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFL0IsZ0RBQWdEO2dCQUNoRCxZQUFZLENBQUMsV0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMvQyx3RUFBd0U7Z0JBQ3hFLGlEQUFpRDtnQkFDakQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxzQkFBc0IsRUFBRTtvQkFDaEQsb0NBQW9DO29CQUNwQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7aUJBQzFFO3FCQUFNO29CQUNILGlDQUFpQztvQkFDakMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztpQkFDNUQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7S0FDSjtJQUVELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDUCxxQ0FBcUM7WUFDckMsSUFBSSxNQUFNLEdBQWdCLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUNELFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDZCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixVQUFVLENBQUMsV0FBVyxHQUFHLGtEQUFrRCxDQUFDO1lBRTVFLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFDRCx1QkFBdUIsRUFBRSxDQUFDLE1BQW1CLEVBQUUsRUFBRTtZQUM3QywrQ0FBK0M7WUFDL0MsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDNUQsY0FBYyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsY0FBYyxDQUFDLElBQUksR0FBRyw2R0FBNkcsQ0FBQTtZQUNuSSxjQUFjLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1lBQy9DLGNBQWMsQ0FBQyxXQUFXLEdBQUcsa0NBQWtDLENBQUM7WUFFaEUsb0NBQW9DO1lBQ3BDLGNBQWMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVuQyxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO0tBQ0o7Q0FDSixDQUFBO0FBRUQsa0JBQWUsWUFBWSxDQUFDOzs7OztBQ3ZINUIsTUFBTSxVQUFVO0lBQ0wsTUFBTSxDQUFDLG1CQUFtQixHQUFZLEtBQUssQ0FBQztJQUM1QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsWUFBWSxDQUFtQjtJQUV2QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWtDO1FBQ2hFLFVBQVUsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7SUFDL0MsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixJQUFJLFlBQVksR0FBcUI7WUFDakMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQ2hELGFBQWEsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUNuRCxTQUFTLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDL0MsY0FBYyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7U0FDcEUsQ0FBQTtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxJQUFhO1FBRXJDLCtDQUErQztRQUMvQywyRUFBMkU7UUFDM0UsNkRBQTZEO1FBQzdELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNyQyxRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO29CQUM5QixLQUFLLGlCQUFpQixDQUFDO29CQUN2QixLQUFLLDJCQUEyQixDQUFDO29CQUNqQyxLQUFLLGFBQWEsQ0FBQztvQkFDbkIsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxrQkFBa0I7d0JBQ25CLGlEQUFpRDt3QkFDakQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xHLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN6RSxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQy9ELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNqRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzdELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDakUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2pFLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDOUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ25FLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFFckUscUNBQXFDO3dCQUNyQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDbkQsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNuQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25DLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQzt3QkFDOUIsZUFBZSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7d0JBQzVCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO3dCQUNqQyxRQUFRLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQzt3QkFDckMsS0FBSyxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDO3dCQUN2QixLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzt3QkFFdEIseURBQXlEO3dCQUN6RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRTlCLHlEQUF5RDt3QkFDekQsSUFBSSxZQUFZLEdBQW9CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUMvRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBRTdDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzt3QkFHN0IsTUFBTTtvQkFDVixLQUFLLGlDQUFpQyxDQUFDO29CQUN2QyxLQUFLLG1CQUFtQjt3QkFDcEIsb0NBQW9DO3dCQUNwQyx5REFBeUQ7d0JBQ3pELElBQUksaUJBQWlCLEdBQW9CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUNwRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFFbEQseURBQXlEO3dCQUN6RCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDckQsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFOzRCQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ2xDOzZCQUNJOzRCQUNELElBQUk7Z0NBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDOzZCQUNuRTs0QkFDRCxPQUFPLEtBQUssRUFBRTtnQ0FDVixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7b0NBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUNBQzVCOzZCQUNKO3lCQUNKO3dCQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzt3QkFFN0IsTUFBTTtvQkFDVjt3QkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFGQUFxRixDQUFDLENBQUE7aUJBQ3pHO2FBQ0o7aUJBQ0k7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsSUFBSSxDQUFDLFFBQVEsUUFBUSxDQUFDLENBQUE7YUFDaEU7U0FDSjthQUNJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1NBQzVEO0lBR0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxlQUFlO1FBQzFCLElBQUksS0FBSyxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQTtTQUNmOztZQUNJLE9BQU8sSUFBSSxDQUFBO0lBQ3BCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxXQUFtQjtRQUV4QyxJQUFJLElBQUksR0FBMEI7WUFDOUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxRQUFRLEVBQUUsV0FBVztTQUN4QixDQUFBO1FBQ0QsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsOEJBQThCO1FBQzlCLElBQUksS0FBSyxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJO1lBQ0EsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNmLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckQsVUFBVSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQzthQUN6QztpQkFDSTtnQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDeEQ7U0FDSjtRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxJQUFZO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDL0IsSUFBSTtnQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDakQ7WUFDRCxPQUFPLEtBQUssRUFBRTtnQkFDVixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7U0FDSjthQUNJO1lBQ0QsSUFBSSxLQUFLLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9FLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNoQixZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O2dCQUVyRCxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVPLFVBQVUsQ0FBQyxXQUFtQixFQUFFLFVBQW1CO1FBQ3ZELHFEQUFxRDtRQUNyRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUNwRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDbkIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDcEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQzdFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1lBQ3JGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztZQUN0RixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtZQUNyRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtZQUN0RixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxDQUFDLGVBQWU7WUFFckYscUNBQXFDO1lBQ3JDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUNqRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtZQUNuRSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxpQkFBaUI7WUFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFdkMsaUNBQWlDO1lBQ2pDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFakMsb0RBQW9EO1lBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZFLElBQUksVUFBVSxFQUFFO2dCQUNaLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7YUFDSTtZQUNELElBQUk7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QjthQUNKO1NBQ0o7SUFFTCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLCtEQUErRDtRQUMvRCxJQUFJLFdBQVcsR0FBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFckYsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbkQ7U0FDSjtJQUNMLENBQUM7SUFFTyxxQkFBcUI7UUFDekIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDcEQsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7UUFDNUQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDM0MsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxhQUFhLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJO1lBQ0QsSUFBSTtnQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7YUFDdkQ7WUFDRCxPQUFPLEtBQUssRUFBRTtnQkFDVixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsR0FBcUI7UUFDdEMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSxJQUFJO1lBQ2hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFFeEQsSUFBSSxRQUFRLEdBQWdCLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztZQUMzRSxJQUFJLFVBQVUsR0FBcUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNLFNBQVMsR0FBcUIsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDdEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNuQixJQUFJLEVBQUUsR0FBNkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztnQkFDdkQsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO29CQUNwQiw0QkFBNEI7b0JBQzVCLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZCLElBQUksS0FBSyxJQUFJLGtCQUFrQixFQUFFO3dCQUM3QixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBRW5CLGdDQUFnQzt3QkFDaEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztpQkFDSjtxQkFDSTtvQkFDRCxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7aUJBQ0k7Z0JBQ0QsSUFBSTtvQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7aUJBQy9EO2dCQUNELE9BQU8sS0FBSyxFQUFFO29CQUNWLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQWM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUMvQiwyREFBMkQ7WUFDM0QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFckUscUNBQXFDO1lBQ3JDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUN4QixTQUFTLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO1lBQzNDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQix5QkFBeUI7WUFDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekU7SUFDTCxDQUFDOztBQUdMLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLElBQUksRUFBRSxDQUFDLElBQWEsRUFBRSxFQUFFO1FBRXBCLHVDQUF1QztRQUN2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRXBDLDJGQUEyRjtRQUMzRixVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUM7Ozs7O0FDL1YzQixrQ0FBa0M7QUFDbEMsaURBQXlDO0FBRXpDLG9DQUFvQztBQUVwQyxNQUFNLGlCQUFpQixHQUFHLElBQUksS0FBSyxDQUMvQixJQUFJLGdCQUFNLENBQ04sY0FBYyxFQUNkLENBQUMsRUFDRCxlQUFlLEVBQ2Ysa0RBQWtELEVBQ2xELElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ3JCLHlCQUF5QixFQUN6QixnQkFBZ0IsRUFDaEIsY0FBYyxDQUNqQixFQUNELElBQUksZ0JBQU0sQ0FDTixlQUFlLEVBQ2YsQ0FBQyxFQUNELGFBQWEsRUFDYiw0Q0FBNEMsRUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDdEIsMEJBQTBCLEVBQzFCLHNCQUFzQixFQUN0QixxQkFBcUIsQ0FDeEIsRUFDRCxJQUFJLGdCQUFNLENBQ04sV0FBVyxFQUNYLENBQUMsRUFDRCxtQkFBbUIsRUFDbkIsOENBQThDLEVBQzlDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ3RCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsb0NBQW9DLENBQ3ZDLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFNBQVMsRUFDVCxDQUFDLEVBQ0QsWUFBWSxFQUNaLDhCQUE4QixFQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHFEQUFxRCxDQUN4RCxFQUNELElBQUksZ0JBQU0sQ0FDTixZQUFZLEVBQ1osQ0FBQyxFQUNELFlBQVksRUFDWixzQkFBc0IsRUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDcEIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixpREFBaUQsQ0FDcEQsRUFDRCxJQUFJLGdCQUFNLENBQ04sT0FBTyxFQUNQLENBQUMsRUFDRCxlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsNENBQTRDLENBQy9DLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFNBQVMsRUFDVCxDQUFDLEVBQ0QsaUJBQWlCLEVBQ2pCLCtDQUErQyxFQUMvQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLG9CQUFvQixDQUN2QixFQUNELElBQUksZ0JBQU0sQ0FDTixTQUFTLEVBQ1QsQ0FBQyxFQUNELFVBQVUsRUFDVixpREFBaUQsRUFDakQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQiwyQkFBMkIsQ0FDOUIsRUFDRCxJQUFJLGdCQUFNLENBQ04sWUFBWSxFQUNaLEVBQUUsRUFDRixrQkFBa0IsRUFDbEIsOENBQThDLEVBQzlDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsMkJBQTJCLENBQzlCLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLE9BQU8sRUFDUCxFQUFFLEVBQ0YsK0JBQStCLEVBQy9CLGtEQUFrRCxFQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixrQkFBa0IsRUFDbEIsdUJBQXVCLEVBQ3ZCLFlBQVksQ0FDZixFQUNELElBQUksZ0JBQU0sQ0FDTixZQUFZLEVBQ1osRUFBRSxFQUNGLG1CQUFtQixFQUNuQixzQ0FBc0MsRUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYiw4QkFBOEIsQ0FDakMsRUFDRCxJQUFJLGdCQUFNLENBQ04sYUFBYSxFQUNiLEVBQUUsRUFDRixrQkFBa0IsRUFDbEIsd0NBQXdDLEVBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsa0JBQWtCLENBQ3JCLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGVBQWUsRUFDZixFQUFFLEVBQ0Ysb0JBQW9CLEVBQ3BCLG9EQUFvRCxFQUNwRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQix5QkFBeUIsRUFDekIscUJBQXFCLEVBQ3JCLHNCQUFzQixDQUN6QixFQUNELElBQUksZ0JBQU0sQ0FDTixtQkFBbUIsRUFDbkIsRUFBRSxFQUNGLG1CQUFtQixFQUNuQixvREFBb0QsRUFDcEQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQix3QkFBd0IsQ0FDM0IsRUFDRCxJQUFJLGdCQUFNLENBQ04sWUFBWSxFQUNaLEVBQUUsRUFDRixlQUFlLEVBQ2YsMENBQTBDLEVBQzFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3BCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsb0NBQW9DLENBQ3ZDLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGVBQWUsRUFDZixFQUFFLEVBQ0Ysc0JBQXNCLEVBQ3RCLGtDQUFrQyxFQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQixtQkFBbUIsRUFDbkIsd0JBQXdCLEVBQ3hCLGtCQUFrQixDQUNyQixFQUNELElBQUksZ0JBQU0sQ0FDTixLQUFLLEVBQ0wsRUFBRSxFQUNGLEtBQUssRUFDTCxnQ0FBZ0MsRUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLENBQ2hCLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFFBQVEsRUFDUixFQUFFLEVBQ0YsUUFBUSxFQUNSLDBDQUEwQyxFQUMxQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLDZCQUE2QixDQUNoQyxDQUNKLENBQUM7QUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FDekIsSUFBSSxnQkFBTSxDQUNOLGtCQUFrQixFQUNsQixFQUFFLEVBQ0YseUJBQXlCLEVBQ3pCLDhDQUE4QyxFQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQiw2QkFBNkIsRUFDN0IsMEJBQTBCLEVBQzFCLHNCQUFzQixDQUN6QixFQUNELElBQUksZ0JBQU0sQ0FDTixNQUFNLEVBQ04sRUFBRSxFQUNGLHVCQUF1QixFQUN2Qix3Q0FBd0MsRUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QixtQ0FBbUMsQ0FDdEMsRUFDRCxJQUFJLGdCQUFNLENBQ04sVUFBVSxFQUNWLEVBQUUsRUFDRixtQ0FBbUMsRUFDbkMsb0RBQW9ELEVBQ3BELElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLDRCQUE0QixFQUM1QixtQkFBbUIsRUFDbkIsMkJBQTJCLENBQzlCLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGFBQWEsRUFDYixFQUFFLEVBQ0YsaUNBQWlDLEVBQ2pDLDBDQUEwQyxFQUMxQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQiwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBQ3BCLCtCQUErQixDQUNsQyxDQUNKLENBQUM7QUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FDckIsSUFBSSxnQkFBTSxDQUNOLE1BQU0sRUFDTixDQUFDLEVBQ0QscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUN0QixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLG1CQUFtQixDQUN0QixFQUNELElBQUksZ0JBQU0sQ0FDTixjQUFjLEVBQ2QsRUFBRSxFQUNGLHdCQUF3QixFQUN4Qix5Q0FBeUMsRUFDekMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsMEJBQTBCLEVBQzFCLDZCQUE2QixFQUM3Qix1Q0FBdUMsQ0FDMUMsQ0FDSixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFFNUQsa0JBQWUsVUFBVSxDQUFDOzs7OztBQzlQMUIsa0NBQWtDO0FBQ2xDLG1FQUE0RDtBQUU1RCxJQUFJLG1CQUFtQixHQUFHO0lBRTFCLElBQUkseUJBQWUsQ0FDZixjQUFjLEVBQ2QsNENBQTRDLEVBQzVDLDRDQUE0QyxFQUM1QyxVQUFVLEVBQ1YsZUFBZSxFQUNmLENBQUMsQ0FDQTtJQUNMLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMENBQTBDLEVBQzFDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLENBQUMsQ0FDQTtJQUNMLElBQUkseUJBQWUsQ0FDZix1QkFBdUIsRUFDdkIsMkRBQTJELEVBQzNELHFEQUFxRCxFQUNyRCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLENBQUMsQ0FDQTtJQUNMLElBQUkseUJBQWUsQ0FDZixVQUFVLEVBQ1Ysd0NBQXdDLEVBQ3hDLHdDQUF3QyxFQUN4QyxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLENBQUMsQ0FDQTtJQUNMLElBQUkseUJBQWUsQ0FDZixpQkFBaUIsRUFDakIsK0NBQStDLEVBQy9DLCtDQUErQyxFQUMvQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLENBQUMsQ0FDQTtJQUNMLElBQUkseUJBQWUsQ0FDZixrQkFBa0IsRUFDbEIsZ0RBQWdELEVBQ2hELGdEQUFnRCxFQUNoRCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixhQUFhLEVBQ2IsK0VBQStFLEVBQy9FLDRCQUE0QixFQUM1QixPQUFPLEVBQ1AsK0JBQStCLEVBQy9CLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixVQUFVLEVBQ1YsMkNBQTJDLEVBQzNDLHdDQUF3QyxFQUN4QyxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMENBQTBDLEVBQzFDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZix1QkFBdUIsRUFDdkIsMERBQTBELEVBQzFELHFEQUFxRCxFQUNyRCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixrQkFBa0IsRUFDbEIsMkRBQTJELEVBQzNELGdEQUFnRCxFQUNoRCxVQUFVLEVBQ1YsZUFBZSxFQUNmLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixjQUFjLEVBQ2QsNENBQTRDLEVBQzVDLDRDQUE0QyxFQUM1QyxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixnQkFBZ0IsRUFDaEIsaURBQWlELEVBQ2pELDhDQUE4QyxFQUM5QyxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZiwwQkFBMEIsRUFDMUIsd0RBQXdELEVBQ3hELHdEQUF3RCxFQUN4RCxVQUFVLEVBQ1YsY0FBYyxFQUNkLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixlQUFlLEVBQ2YsNkNBQTZDLEVBQzdDLDZDQUE2QyxFQUM3QyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixXQUFXLEVBQ1gsNENBQTRDLEVBQzVDLHlDQUF5QyxFQUN6QyxVQUFVLEVBQ1YsWUFBWSxFQUNaLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixlQUFlLEVBQ2YsNkNBQTZDLEVBQzdDLDZDQUE2QyxFQUM3QyxVQUFVLEVBQ1YsYUFBYSxFQUNiLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osOENBQThDLEVBQzlDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1YsZUFBZSxFQUNmLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMkNBQTJDLEVBQzNDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1YsS0FBSyxFQUNMLEVBQUUsQ0FDRDtJQUNMLElBQUkseUJBQWUsQ0FDZixjQUFjLEVBQ2QsNENBQTRDLEVBQzVDLDRDQUE0QyxFQUM1QyxVQUFVLEVBQ1YsU0FBUyxFQUNULEVBQUUsQ0FDRDtDQUNKLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQzs7Ozs7QUN2S25DLGtDQUFrQztBQUNsQyxrREFBOEM7QUFDOUMsb0VBQTZEO0FBQzdELDhDQUE2QztBQUM3Qyw0REFBcUQ7QUFDckQsZ0ZBQXlFO0FBQ3pFLDBEQUFrRDtBQUVsRCxjQUFjO0FBQ2QsQ0FBQyxHQUFHLEVBQUU7SUFDRixxREFBcUQ7SUFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtRQUU3Qyw4Q0FBOEM7UUFDOUMsSUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSwyQkFBMkI7WUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksMkJBQTJCO1lBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUMzQyxpQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsOEJBQThCO1NBQ3JEO1FBRUQsbUNBQW1DO1FBQ25DLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpDLDZCQUE2QjtRQUM3Qiw4Q0FBOEM7UUFDOUMsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtZQUNoRCxnQ0FBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCLEVBQUU7WUFDcEQscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtRQUVELG1EQUFtRDtRQUNuRCxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN0RSxJQUFJLGlCQUFpQixFQUFFO1lBQ25CLDBCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsOENBQThDO1FBQzlDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsSUFBSSxZQUFZLElBQUksSUFBSTtZQUNwQixlQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBMaW5rRGV0YWlscyBmcm9tIFwiLi9MaW5rRGV0YWlsc1wiO1xuXG4vL0ljb24gbGlua3MgdXNlZCBmb3IgaW1hZ2UgQXR0cmlidXRpb25cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIExpbmtEZXRhaWxzIHtcbiAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nO1xuICAgIGFydGljbGVpZDogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nLFxuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuICAgICAgICBcbiAgICAgICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVvd25lciA9IGF0dHJpYnV0ZW93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmNsYXNzIExpbmtEZXRhaWxzIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIHBhZ2VOYW1lOiBzdHJpbmc7XG4gICAgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtEZXRhaWxzOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmNsYXNzIFdlYkJpdCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gICAgYXJ0aWNsZUxpbms6IHN0cmluZztcbiAgICBjYXJkSW1hZ2U6IHN0cmluZztcbiAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgICAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi4vbGliL2RhdGFcIlxuaW1wb3J0IEFUVFJJQlVUSU9OTElOS0RBVEEgZnJvbSBcIi4uL2xpYi9kYXRhX0F0dHJpYnV0aW9uTGlua3NcIjtcblxuY29uc3QgY2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgY2FyZCBkYXRhICsgYXR0cmlidXRpb24gbGluayBkYXRhXG4gICAgICAgIC8vIFdFQkJJVERBVEEgYnJva2VuIGludG8gMyBhcnJheXM6IFBhZ2VzLCBvciBhcnRpY2xlcywgR3VpZGVzLCBhbmQgRXhwbG9yZXMgXG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzOiBhbnkgPSBbXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRBcnRpY2xlQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpLCBBVFRSSUJVVElPTkxJTktEQVRBKSxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSwgQVRUUklCVVRJT05MSU5LREFUQSksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gU3BsaXQgdGhlIGNhcmRzIGFycmF5cyBvbiB0aGUgcGFnZSBpbnRvIHRoZWlyIHJlc3BlY3RpdmUgY2F0ZWdvcnlcbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiQXJiaXRyYXJ5IEFydGljbGVzOlwiKSEsXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIikhLFxuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJFeGxvcmUgdGhlIFdlYjpcIikhLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFJvdXRlIENoZWNrcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgbXVsdGlwbGUgcGFnZXNcbiAgICAgICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9uIHRvIDMgYXJ0aWNsZXMgb25seVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgZGVjb25zdHJ1Y3Rpb24gYW5kIGFkZGl0aW9uXG4gICAgICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgdGhlIGRhdGEgdG8gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIC8vIElubmVyIGxvb3A6IGl0ZXJhdGUgdGhyb3VnaCB0aGUgY2F0ZWdvcnkgZGF0YVxuICAgICAgICAgICAgICAgIC8vIEZyb20gdGhlIGNhcmRzIHN0YWNrLCBhcHBlbmQgZWFjaCB0byBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY2FyZHNBcnRpY2xlcy5zaGlmdCgpLmZvckVhY2goKGFydGljbGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkc1NlY3Rpb25baV0uYXBwZW5kKGFydGljbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSdzIGFuIGVycm9yLlwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBidWlsZENhcmRDb250YWluaW5nU2VjdGlvbjogKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgZGl2aXNvciBzZWN0aW9uYWwgZWxlbWVudHMgdG8gYXBwZW5kIHRvIG1haW5cbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgJiYgcGFnZU1haW4ubm9kZU5hbWUgPT09ICdNQUlOJyl7XG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FyZCBzZWN0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyA8c2VjdGlvbiBjbGFzcz1cImNhcmRzXCI+XG4gICAgICAgICAgICAvLyAgICAgPGgyPkFyYml0cmFyeSBBcnRpY2xlczo8L2gyPlxuICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkX2NvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAvLyA8L3NlY3Rpb24+XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICAgICAgICBsZXQgYWFIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhSGVhZGluZyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFDYXJkc1NlY3Rpb24pO1xuICAgICAgICAgICAgcGFnZU1haW4uYXBwZW5kKEFBU2VjdGlvbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgQUFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc1wiKTtcbiAgICAgICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcmRfY29sdW1ucycpO1xuICAgICAgICAgICAgYWFIZWFkaW5nLmlubmVyVGV4dCA9IGAke25hbWV9YDtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG4gICAgYnVpbGRBcnRpY2xlQ2FyZHM6IChjYXJkc0RhdGE6IGFueSwgYXR0cmxpbmtzOiBBdHRyaWJ1dGlvbkxpbmtbXSkgPT4ge1xuICAgICAgICAvLyBNYXAgV2ViQml0IGRhdGEgdG8gYSBjYXJkLCBlYWNoXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIC8vIDxkaXY+PCEtLWNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgICAgLy8gICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAgICAvLyA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgICAgLy8gPGRpdiBjbGFzcz1cImNhcmRCb2R5XCI+XG4gICAgICAgIC8vICAgICA8aDM+PC9oMz5cbiAgICAgICAgLy8gICAgIDxwPjwvcD48YSBocmVmPVwiXCI+PC9hPlxuICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgIC8vIDwvZGl2PlxuICAgICAgICAvL1xuICAgICAgICAvLyBJdGVyYXRlIGVhY2ggY2FyZCAtLT4gYnVpbGQgdGhlIGNhcmQgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgY2FyZEltZ1RvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbGV0IGNhcmRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBjYXJkQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoY2FyZEltZyk7XG4gICAgICAgICAgICBjYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcbiAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBjYXJkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBXZWJCaXQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICAgICAgY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIpO1xuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcbiAgICAgICAgICAgIGNhcmRJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhcnRpY2xlLmNhcmRJbWFnZUFMVCk7XG4gICAgICAgICAgICBjYXJkSW1nLnNldEF0dHJpYnV0ZSgnQXJ0aWNsZScsIGFydGljbGUuYXJ0aWNsZU51bWJlcik7XG4gICAgICAgICAgICBjYXJkQm9keUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYXJ0aWNsZS5hcnRpY2xlTGluaylcbiAgICAgICAgICAgIGNhcmRCb2R5SGVhZGluZy5pbm5lclRleHQgPSBhcnRpY2xlLm5hbWU7XG4gICAgICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgY2FyZEJvZHlMaW5rLnRleHRDb250ZW50ID0gXCJHbyB0byBQYWdlXCI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEltYWdlIGF0dHJpYnV0aW9uIG1heSBiZSBuZWVkZWQgZm9yIHRoZSBpbWFnZSB1c2VkXG4gICAgICAgICAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGF0dHJsaW5rcy5tYXAoKGxpbmspID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUbyBkZXRlcm1pbmUgaW1hZ2UgYXR0cmlidXRpb24sIHRoZSBpbWFnZSBpZCBhbmQgYXJ0aWNsZSBpZCB3aWxsIG1hdGNoLFxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSB0aGUgZGF0YSBpc24ndCBlbnRlcmVkLCBjYXVzaW5nIGEgbWlzc1xuICAgICAgICAgICAgICAgIGlmIChjYXJkSW1nLmdldEF0dHJpYnV0ZSgnQXJ0aWNsZScpID09PSBsaW5rLmFydGljbGVpZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIDxkaXYgY2xhc3M9XCJmbGlwLWNhcmRcIj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAgICAgICAgICAgICAgICAvLyA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkRnJvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIDxoMz48L2gzPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgPHA+PC9wPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCIgY2xhc3M9XCJpbWdTbWFsbCBpbWdQVFJcIj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgLy8gPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBpbWFnZSBiYWNrIHBhbmVsIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVkZWZpbmUgY2FyZCBpbWFnZSBwYW5lbCBhcyBhIGZsaXAgcGFuZWxcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FyZElubmVyID0gY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FyZEZyb250ID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkRnJvbnQuYXBwZW5kQ2hpbGQoY2FyZEltZyk7IC8vIG1vdmUgaW1hZ2Ugd2l0aGluIGNhcmQgZnJvbnQgZGl2aXNvclxuICAgICAgICAgICAgICAgICAgICBsZXQgc21hbGxJbWcgPSA8SFRNTEltYWdlRWxlbWVudD5jYXJkSW1nLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSBjYXJkQm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSk7IC8vYXBwZW5kIHRvIGZyb250IHBhbmVsXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZmxpcC1wYW5lbCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBjYXJkSW1nVG9wLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIilcbiAgICAgICAgICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHNtYWxsSW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdTbWFsbFwiLCBcImltZ1BUUlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmNsYXNzTGlzdC5hZGQoXCJhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tIZWFkaW5nLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVvd25lcjtcbiAgICAgICAgICAgICAgICAgICAgYmFja1BhcmEudGV4dENvbnRlbnQgPSBsaW5rLmlubmVyVGV4dFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVvd25lcjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgICAgICAgICAgLy8gQWRkIHRoZSBtYXJrdXAgdG8gdGhlIGNvbnRhaW5pbmcgZWxlbWVudFxuICAgICAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKGNhcmRJbWdUb3ApO1xuICAgICAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKGNhcmRCb2R5KTtcblxuICAgICAgICAgICAgcmV0dXJuIFdlYkJpdDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhcmRzV2lkZ2V0XG4iLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICAgIHByaXZhdGUgR0VUVVJMOiBVUkw7XG4gICAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRhdGFJc0luQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTsgLy9UT0RPOiBkYXRhaW5jYWNoZSBvdmVyYWxsXG4gICAgcHJpdmF0ZSByZWNlaXZlZERhdGE6IGFueTsgLy9UT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKEdFVFVSTDogVVJMLCBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZywgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtID0gZXJyb3JFbGVtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R0VUVVJMKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5HRVRVUkw7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0R0VUVVJMKEdFVFVSTDogVVJMIHwgc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgR0VUVVJMID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLkdFVFVSTCA9IG5ldyBVUkwoR0VUVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSA0MDQpe1xuICAgICAgICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLm9rIHx8IHJlcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLm9rICsgXCI6IFwiICsgcmVzLnN0YXR1cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRGF0YShHRVRVUkw6IFVSTCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goR0VUVVJMKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5hcGlSZXNwb25zZUVycm9yQ2hlY2socmVzcG9uc2UpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBgJHtlLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIHB1YmxpYyBhc3luYyBhcGlHRVQoR0VUVVJMOiBVUkwpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlKXtcbiAgICAgICAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCdjYWNoZXMnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICAvLyBPcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jYWNoZXMub3Blbih0aGlzLmJyb3dzZXJDYWNoZU5hbWUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZXMubWF0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIHJlcXVlc3Qgbm9ybWFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSByZXNwb25zZSBzaW5jZSBpdCBjYW4gb25seSBiZSByZWFkIG9uY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRyZXNwID0gcmVzdWx0LmNsb25lKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZXN1bHQgdG8gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS5wdXQoR0VUVVJMLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRyZXNwLmpzb24oKS50aGVuKCh0ZXh0KSA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5qc29uKCkudGhlbigodGV4dCkgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbiggKHJlc3BvbnNlOmFueSkgID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRhdGFQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRhdGFQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZGF0YVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSAnLi93aWRnZXRtYXJrdXBlbGVtZW50cydcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmRjYWNoZSB9IGZyb20gXCIuL2xvY2Fsc3RvcmFnZWNhY2hlc1wiO1xuXG5jbGFzcyBEaWN0aW9uYXJ5V2lkZ2V0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBpc0V4aXN0aW5nQ2FjaGVpbkJyb3dzZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FjaGVkV29yZHNDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhdGljIGV4aXN0aW5nQ2FjaGVzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgd29yZENhY2hlczogbG9jYWxzdG9yYWdld29yZGNhY2hlW107XG4gICAgcHVibGljIHN0YXRpYyBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyB3b3JkVVJMOiBVUkw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9uZXcgZGljdGlvbmFyeS4gbm8gaW5pdGlhbGl6aW5nIGZ1bmN0aW9ucyBuZWVkZWRcbiAgICAgICAgLy9zdGF0aWMgY2xhc3MgLSBuZWVkcyB0byBzaG93IG9uIGJyb3dzZXIgYW55IGNhY2hlcyB0aGF0IGV4aXN0XG4gICAgICAgIC8vYW5kIHRoZWlyIG5hbWVzXG4gICAgfVxuICAgIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIFNyY2hlbGVtZW50cyA9IERpY3Rpb25hcnlXaWRnZXRNYXJrdXAuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGV2ZW50IGxpc3RlbmVyczogd29yZCBzZWFyY2gsIGJ1dHRvbiBjbGlja3MsIGV0Y1xuICAgICAgICB0aGlzLmFkZFdvcmRTZWFyY2hFdmVudHMoU3JjaGVsZW1lbnRzKTtcblxuICAgICAgICAvLyBGaW5kIGl0ZW1zIHByZS1leGlzdGluZyBpbiBsb2NhbCBzdG9yYWdlL2NhY2hlXG4gICAgICAgIERpY3Rpb25hcnlXaWRnZXQuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAgICAgLy9lbnVtZXJhdGUgYWxsIG9mIHRoZSBjYWNoZXNcbiAgICAgICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZVxuXG4gICAgICAgIC8vRW51bWVyYXRlIGxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtc1xuICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgICBpZiAoc3RvcmFnZVN0ciAhPSBudWxsKSB7XG4gICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LndvcmRDYWNoZXMgPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgICAgICAgcmV0dXJuIERpY3Rpb25hcnlXaWRnZXQud29yZENhY2hlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRXb3JkU2VhcmNoRXZlbnRzKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNlYXJjaEVsZW1zID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICAgICAgc2VhcmNoRWxlbXMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy53b3JkU2VhcmNoVXBkYXRlKHNlYXJjaEVsZW1zKTtcbiAgICAgICAgfSlcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRTZWFyY2hVcGRhdGUoc2VhcmNoRWxlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyBcIlByZXZpb3VzIHdvcmQgc2VhcmNoZXNcIiBidXR0b24gZmV0Y2hlcyBsb2NhbGx5IHN0b3JlZCB3b3Jkc1xuICAgICAgICAvLyBDbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICAgICAgc2VhcmNoRWxlbXMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICAgICAgICAgIGxldCBuZXdCdXR0b25Db250YWluZXI6IEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRpb24gYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyICE9IHVuZGVmaW5lZCAmJiBEaWN0aW9uYXJ5V2lkZ2V0LndvcmRDYWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgd29yZENhY2hlIG9mIERpY3Rpb25hcnlXaWRnZXQud29yZENhY2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID0gbmV3QnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZENhY2hlLndvcmQsIHdvcmRDYWNoZS53b3JkVVJMLCBzZWFyY2hFbGVtcywgZmFsc2UsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzTm90Rm91bmRPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIHNlYXJjaEVsZW1zLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sIHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZGNhY2hlLCB3b3JkQXJyYXk6IGFueVtdLCkge1xuICAgICAgICAvLyBBZGQgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JkLWNhY2hlcycsIEpTT04uc3RyaW5naWZ5KHdvcmRBcnJheSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gY3VycmVudCAnd29yZC1jYWNoZXMnIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkY2FjaGVbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSB3b3JkY2FjaGUud29yZFVSTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdvcmQgaXMgYWxyZWFkeSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIGFsbGNhY2hlLnB1c2god29yZGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmQtY2FjaGVzJywgSlNPTi5zdHJpbmdpZnkoYWxsY2FjaGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybSh3b3JkOiBzdHJpbmcsIHdvcmRVcmw6IFVSTCwgZWxlbTogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgICAgICBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgLy9UT0RPOiBkaWN0aW9uYXJ5IGNhY2hlIG1hbmFnZW1lbnQ6XG4gICAgICAgIC8vVE9ETzogMS4pIGlzIHRvIGJlIGNhY2hlZCB0cnVlPyAtLWNoZWNrXG4gICAgICAgIC8vVE9ETzogMi4pIGlzIHRvIGJlIGNhY2hlZCBmYWxzZT8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IC0tPiBhcmUgdGhleSB0aGUgc2FtZSBiZWhhdmlvcj8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IC0tPiBpcyB0aGUgcmVzdWx0IGluIHRoZSBjYWNoZT8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBhIHNlbmQgdG8gY2FjaGUgb3B0aW9uXG4gICAgICAgIC8vXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBmdW5jdGlvbiBjYWxscyB0byBlaXRoZXIgc3RvcmUgaW4gQ2FjaGUgU3RvcmFnZVxuICAgICAgICAvLyBJZiBpdGVtcyBhcmUgdG8gYmUgY2FjaGVkLCBlZGl0IExvY2FsIFN0b3JhZ2UgY2FjaGUgbmFtZXNcbiAgICAgICAgbGV0IHdvcmRDYWNoZVN0b3JlOiBhbnkgPSBbXTtcbiAgICAgICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZGNhY2hlID0ge1xuICAgICAgICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICAgICAgICB3b3JkOiB3b3JkLFxuICAgICAgICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgICAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgICAgICB9XG4gICAgICAgIHdvcmRDYWNoZVN0b3JlLnB1c2god29yZGNhY2hlKTtcblxuICAgICAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy9zZXQgYXBpR0VUOjpzZW5kVG9Ccm93c2VyQ2FjaGUgdG8gdHJ1ZSB0byB1c2UgY2FjaGUgc3RvcmFnZVxuICAgICAgICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVCh3b3JkY2FjaGUud29yZFVSTCwgZmFsc2UsIHdvcmRjYWNoZS5jYWNoZU5hbWUsIGVsZW0uZXJyb3JFbGVtKTtcblxuICAgICAgICAgICAgLy9mZXRjaCByZXF1ZXN0XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCAndGl0bGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgIW5vRGVmaW5pdGlvbnMpIHsgLy8gZ29vZCBmZXRjaC0tPiBtb3ZlIGZvcndhcmQgdG8gbWFya3VwIHJlbmRlclxuICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXRNYXJrdXAuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIGVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkRmV0Y2guZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCksIHdvcmRjYWNoZSwgd29yZENhY2hlU3RvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUgIT09IGZhbHNlKSB7IC8vIGNoZWNrIG5ldHdvcmsgc3RhdHVzIHZpYSBuYXZpZ2F0b3Igb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdvcmRWYWxpZGF0aW9uKGludHh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICAgICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3b3JkU2VhcmNoVXBkYXRlKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMpIHtcbiAgICAgICAgLy8gVGFrZSB1c2VyIGlucHV0IGFuZCBmaWx0ZXIgdG8gYW4gYWNjZXB0ZWQgc3RyaW5nXG4gICAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLndvcmRWYWxpZGF0aW9uKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUpXG4gICAgICAgICAgICA/IGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSA6IGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2U7XG4gICAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgVVJMIG9mIHRoZSBhY2NlcHRlZCB3b3JkIGZvciB1c2UgaW4gdGhlIGZldGNoIGNhbGxcbiAgICAgICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3RVcmwpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsIHRoaXMud29yZFVSTCwgc2VhcmNoRWxlbXMsIGZhbHNlLCBcIlwiKTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVubmVlZGVkIGNsYXNzZXMgaWYgYXBwbGllZCBwcmV2aW91c2x5XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gJyc7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICAgIH1cbn1cblxuXG5jbGFzcyBEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwIGV4dGVuZHMgRGljdGlvbmFyeVdpZGdldCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbTogRWxlbWVudCkge1xuICAgICAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGljdGlvbmFyeSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1dvcmRzID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXJjaFdvcmRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3JkOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoV29yZHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnU2VhcmNoLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgICAgICAgICAgICAgICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hXb3JkcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAod29yZERhdGE6IGFueSwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cykge1xuICAgICAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCB3b3JkRGF0YSEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGRhdGEgaXMgbnVsbFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIHdvcmQncyBkZWZpbml0aW9uIHRvIHRoZSBkaWN0aW9uYXJ5IHdpZGdldFxuICAgICAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPSBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcblxuICAgICAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgICAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICAgICAgd29yZERhdGEubWFwKCh3b3JkOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgICAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgICAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRUeXBlSCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICAgICAgICAgIHdvcmRUeXBlSC50ZXh0Q29udGVudCA9IHdvcmRUeXBlLnBhcnRPZlNwZWVjaDtcbiAgICAgICAgICAgICAgICB3b3JkVHlwZS5kZWZpbml0aW9ucy5tYXAoKGRlZjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9uIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uUC50ZXh0Q29udGVudCA9IGRlZi5kZWZpbml0aW9uO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIilcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XG4gICAgICAgICAgICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZpbml0aW9uRGVzY3JpcHRpb24pO1xuICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBkaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIGluaXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG4gICAgICAgLy8gQ3JlYXRlIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCwgY2FsbCBjcmVhdGVcbiAgICAgICBsZXQgZGljdGlvbmFyeVdpZGdldCA9IG5ldyBEaWN0aW9uYXJ5V2lkZ2V0KCk7XG4gICAgICAgZGljdGlvbmFyeVdpZGdldC5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0KGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7IiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuLy8gQ3JlYXRlIGEgY2xhc3MgZm9yIHRoZSBlbGVtZW50XG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nTGlzdCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEdldCB1bCBhbmQgbGkgZWxlbWVudHMgdGhhdCBhcmUgYSBjaGlsZCBvZiB0aGlzIGN1c3RvbSB1bCBlbGVtZW50XG4gICAgICAgIC8vIGxpIGVsZW1lbnRzIGNhbiBiZSBjb250YWluZXJzIGlmIHRoZXkgaGF2ZSB1bHMgd2l0aGluIHRoZW1cbiAgICAgICAgY29uc3QgdWxzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuICAgICAgICBjb25zdCBsaXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gSGlkZSBhbGwgY2hpbGQgdWxzXG4gICAgICAgIC8vIFRoZXNlIGxpc3RzIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgdXNlciBjbGlja3MgYSBoaWdoZXIgbGV2ZWwgY29udGFpbmVyXG4gICAgICAgIHVscy5mb3JFYWNoKHVsID0+IHtcbiAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBlYWNoIGxpIGVsZW1lbnQgaW4gdGhlIHVsXG4gICAgICAgIGxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgbGkgaGFzIGEgdWwgYXMgYSBjaGlsZCwgZGVjb3JhdGUgaXQgYW5kIGFkZCBhIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW4gYXR0cmlidXRlIHdoaWNoIGNhbiBiZSB1c2VkICBieSB0aGUgc3R5bGVcbiAgICAgICAgICAgICAgICAvLyB0byBzaG93IGFuIG9wZW4gb3IgY2xvc2VkIGljb25cbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb3NlZCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgbGkgZWxlbWVudCdzIHRleHQgaW4gYSBuZXcgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGFzc2lnbiBzdHlsZSBhbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHNwYW5cbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBsaS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDb3B5IHRleHQgZnJvbSBsaSB0byBzcGFuLCBzZXQgY3Vyc29yIHN0eWxlXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IGNoaWxkVGV4dC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjbGljayBoYW5kbGVyIHRvIHRoaXMgc3BhblxuICAgICAgICAgICAgICAgIG5ld1NwYW4ub25jbGljayA9IHRoaXMuc2hvd3VsO1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGV2ZW50LmNvZGUgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRXhwYW5kaW5nTGlzdCB9IGZyb20gXCIuL2V4cGFuZGluZ0xpc3RcIjtcblxuY29uc3QgZXhwYW5kaW5nTGlzdERPTVdpZGdldCA9IHtcbiAgICBpbml0OigpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdCwgeyBleHRlbmRzOiAndWwnIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQgcHJvcGVydGllc1xuICAgICAgICAvLyBcIkRPTVwiIHBhZ2Ugc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICAvLyBBZGQgYSB0aXRsZSBhdHRyaWJ1dGUgdG8gYWxsIGxpLXNwYW4gdGhhdCBjYW4gZXhwYW5kIGZ1cnRoZXJcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpT3Blbk9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46Zmlyc3QtY2hpbGRgKTtcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOm50aC1jaGlsZCgzKWApO1xuXG4gICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGV4cGFuZGluZy1lbGVtZW50IGV4cGFuZGFibGUgZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlPcGVuT3Blbil7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJyBcbiAgICAgICAgICAgICAgICAgICAgPyAoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIFNldCBwcm9wZXJ0eSBvZiBjbG9zaW5nIHNwYW4gZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlDbG9zZVNwYW4pe1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwYW5kaW5nTGlzdERPTVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5jbGFzcyBHcm93aW5nQ2FyZCBleHRlbmRzIEhUTUxMSUVsZW1lbnQge1xuICAgIHByaXZhdGUgaXNHcm93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIHByaXZhdGUgc3RhdGljIGhhc0xpbms7XG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgaGFkRGV0YWlscztcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBoYXNEZXNjcmlwdGlvbjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ3Jvd0NhcmQpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIHNocmlua0NhcmQgPSAobGk6IEdyb3dpbmdDYXJkKSA9PiB7IC8vVE9ETzogY2hlY2sgY2xhc3MgcHJvcGVydHlcbiAgICAgICAgaWYgKGxpLnN0eWxlLnNjYWxlKXtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnNldElzR3Jvd24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFkZUluYWN0aXZlQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmQpID0+IHtcbiAgICAgICAgaWYoR3Jvd2luZ0NhcmQuZ2V0SXNBdExlYXN0T25lQmlnKCkpe1xuICAgICAgICAgICAgaWYoIWxpLmdldElzR3Jvd24oKSl7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi4zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXNBdExlYXN0T25lQmlnID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRbXSAgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCN3ZWJJREVDYXJkcyBsaWApKTtcbiAgICAgICAgbGV0IGF0TGVhc3RPbmVJc0JpZyA9IGxpc3RMSXMuc29tZSgobGkpID0+IGxpLmdldElzR3Jvd24oKSA9PSB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGF0TGVhc3RPbmVJc0JpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXNHcm93biA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93bjtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRJc0dyb3duID0gKHRydWVmYWxzZTogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duID0gdHJ1ZWZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdyb3dDYXJkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0eWxlLnNjYWxlID0gXCIxLjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS56SW5kZXggPSBcIjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIHRoaXMuc2V0SXNHcm93bih0cnVlKTtcblxuICAgICAgICAvLyBOZWVkIGFsbCB0aGUgbGlzdCBlbGVtZW50cyB0byByZWZlcmVuY2Ugd2hpY2ggb25lIHRvIGdyb3dcbiAgICAgICAgLy8gSWYgaXQncyBub3QgdGhlIGNsaWNrZWQgZWxlbWVudCwgc2hyaW5rIGl0LlxuICAgICAgICBsZXQgbGlzdExJcyA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KTtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcyl7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmQuc2hyaW5rQ2FyZCgoaXRlbSBhcyBHcm93aW5nQ2FyZCkpO1xuICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkLnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjYWxlIHByb3BlcnR5IGZvciBlYWNoIGNhcmRcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdHlsZS5zY2FsZSA9PSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5zY2FsZSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBhY3RpdmVDYXJkID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdncm93aW5nLWNhcmQnLCBHcm93aW5nQ2FyZCwgeyBleHRlbmRzOiAnbGknIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCB8fCBlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxEZXRhaWxzRWxlbWVudCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBcnJheSBvZiBsaXN0IGl0ZW1zIChjYXJkcylcbiAgICAgICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZFtdICA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSk7XG5cbiAgICAgICAgICAgIC8vIENsaWNrIGV2ZW50IHRvIHJlc2l6ZSB0aGUgY2FyZHMgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBhIGNhcmRcbiAgICAgICAgICAgIC8vIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSBhIGNhcmQsIHJlc2l6ZSBhbGwgY2FyZHMgdG8gbm9ybWFsXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEl0ZW06IEdyb3dpbmdDYXJkID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSl7XG4gICAgICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkLnNocmlua0NhcmQodGVtcEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVzaGFkZSBhbGwgY2FyZHMgYmVjYXVzZSBub25lIG9mIHRoZW0gYXJlIGJpZ1xuICAgICAgICAgICAgZm9yIChsZXQgbGkgb2YgbGlzdExJcyl7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmQuc2hhZGVJbmFjdGl2ZUNhcmQobGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhY3RpdmVDYXJkO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4vTGlua0RldGFpbHMnO1xuXG4vL0hlYWRlciBuYXZpZ2F0aW9uIGxpbmtzXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkluZGV4XCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJpbmRleC5odG1sXCJcbik7XG5cbmNvbnN0IHBhZ2VzTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcInBhZ2VzLmh0bWxcIlxuKVxuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGlua107XG5cbmNvbnN0IEhFQURFUkZPT1RFUiA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICBsZXQgc2l0ZUhlYWRlcjogRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgZWxlbWVudCB0byB0aGUgcGFnZVxuICAgICAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIC8vIGlmIG1haW4gZWxlbWVudCBleGlzdHMsIGFkZCB0aGUgaGVhZGVyIHRvIGl0XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKHBhZ2VNYWluKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGVIZWFkZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5wcmVwZW5kKEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBiZWZvcmUgJ21haW4nIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgbWFpbiBlbGVtZW50IGRvZXMgbm90IGV4aXN0LCBhZGQgdGhlIGhlYWRlciB0byB0aGUgYm9keVxuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIobnVsbCkpO1xuICAgICAgICAgICAgICAgIGlmIChzaXRlSGVhZGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIucHJlcGVuZChIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYWZ0ZXIgJ2JvZHknIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBidWlsZEhlYWRlcjogKG1haW46IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICAgICAgICBIMS50ZXh0Q29udGVudCA9ICc8UmFuZG9tIFdlYiBCaXRzPic7IC8vSDEgTG9nb1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoSDEpO1xuXG4gICAgICAgICAgICBpZiAobWFpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFpbi5wcmVwZW5kKHNpdGVIZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChzaXRlSGVhZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlSGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZE5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBoZWFkZXIgbmF2aWdhdGlvbiBiYXNlZCBvbiBuYXZpZ2F0aW9uIGRhdGFcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuYXZpZ2F0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXZGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2ID0gaGVhZGVyTmF2RnJhZ1xuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBuYXYgZGF0YSB0byBuYXYgZWxlbWVudHNcbiAgICAgICAgICAgIE5BVklURU1TLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0TGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICAgICAgICAgIGhlYWRlck5hdi5hcHBlbmQobmF2TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBuYXZpZ2F0aW9uIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICAgICAgLy8gRW52aXJvbm1lbnQgbGlua3MgZWRpdCwgcmVxdWlyaW5nIGRpZmZlcmVudCBsaW5rIHJlbGF0aXZlcyB0byBvcGVyYXRlXG4gICAgICAgICAgICAgICAgLy8gR2l0aHViIHBhZ2VzIG9wZXJhdGVzIGZyb20gcmVwb3NpdG9yeSwgbm90ICcvJ1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncmhvd2VsbDQ3Ni5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGVkaXQgZm9yIGRldiBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBBZGQgZm9vdGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2UgZW5kXG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhFQURFUkZPT1RFUi5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kKEhFQURFUkZPT1RFUi5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIHNpdGVGb290ZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjIgUmFuZG9tIFdlYkJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiSWNvbkhvbWU6ICM0NTAyNjc1NVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhFQURFUkZPT1RFUjsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdEVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0bWFya3VwZWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSB9IGZyb20gXCIuL2xvY2Fsc3RvcmFnZWNhY2hlc1wiO1xuXG5jbGFzcyBUb0RvV2lkZ2V0IHtcbiAgICBwdWJsaWMgc3RhdGljIHRvZG9zSW5Mb2NhbFN0b3JhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9Eb0xpc3RFbGVtZW50cyhUb0RvTGlzdEVsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgICAgIFRvRG9XaWRnZXQuVG9Eb0VsZW1lbnRzID0gVG9Eb0xpc3RFbGVtZW50cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICAgICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRhYmxlJyksXG4gICAgICAgICAgICB0b2RvVGFibGVCb2R5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyksXG4gICAgICAgICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgICAgICBcbiAgICAgICAgLy8gSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgICAgICAvLyBEZXBlbmRlbnQgb24gdGhlIHBhZ2UsIHRvZG8gd2lkZ2V0IG1heSBoYXZlIHByZS1leGlzdGluZyBtYXJrdXAgaW4gcGxhY2VcbiAgICAgICAgLy8gU3dpdGNoIGFnYWluc3QgdGhlIGN1cnJlbnQgcGFnZSB0byBkZXRlcm1pbmUgbWFya3VwIG5lZWRlZFxuICAgICAgICBpZiAoZWxlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvZGlzdC9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0YWJsZSBlbGVtZW50cyBuZWVkZWQgZm9yIHRoZSB0b2RvIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhsZWZ0ID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGZvb3QgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzbGVmdCA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM0lOID0gdGQzbGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IElOUFVUID0gdGQzbWlkZGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvbGlzdFNlY3Rpb24uaWQgPSBcIlRvRE9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8odGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0RWxlbWVudHM6VG9Eb0xpc3RFbGVtZW50cyA9IHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb1dpZGdldC5zZXRUb0RvTGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdEVsZW1lbnRzUGFnZXM6VG9Eb0xpc3RFbGVtZW50cyA9IHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb1dpZGdldC5zZXRUb0RvTGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50c1BhZ2VzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvV2lkZ2V0LlRvRG9FbGVtZW50cy50b2RvVGFibGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0Ym9keSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19EbyhodGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ1RvRG9JdGVtcycgZWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSBpcyBubyBcIlRvRG9MaXN0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc1RvRG9JblN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCB0b2RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuXG4gICAgICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgVG9Eb3M6IGFueSA9IFtdO1xuICAgICAgICBUb0Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAvL2FkZCB0aGUgVG9Eb3MgdG8gbG9jYWwgY2FjaGVcbiAgICAgICAgbGV0IHRvZG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeShUb0RvcykpO1xuICAgICAgICAgICAgICAgIFRvRG9XaWRnZXQudG9kb3NJbkxvY2FsU3RvcmFnZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgICAgICBpZiAoIVRvRG9XaWRnZXQuaXNUb0RvSW5TdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgICAgICBpZiAodG9kb3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBBZGRUb0RvUm93KGRlc2NyaXB0aW9uOiBzdHJpbmcsIGZpcnN0UGFpbnQ6IGJvb2xlYW4pIHtcbiAgICAgICAgLy9DcmVhdGUgYSB0YWJsZSByb3cgd2l0aCBjaGVja2JveCBhbmQgZGVsZXRlIG9wdGlvbnNcbiAgICAgICAgY29uc3QgVEFCTEVJVEVNID0gVG9Eb1dpZGdldC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHRhYmxlRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTsgLy9BZGQgcm93XG4gICAgICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICAgICAgY29uc3QgbmV3SVRFTSA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdEZWxldGUnKTtcbiAgICAgICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvV2lkZ2V0LlRvRE9zID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvV2lkZ2V0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSkoKSA6ICgxKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIG5ld0lURU0udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbi50b1N0cmluZygpOyAvL1BvcHVsYXRlIHNlY29uZCBjb2xcbiAgICAgICAgICAgIFRvRG9XaWRnZXQuVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSByb3cgdG8gdGhlIFRvRG9zIHRhYmxlXG4gICAgICAgICAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcblxuICAgICAgICAgICAgLy9hZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICAgICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuRGVsZXRlQnV0dG9uKGRlbEJPWCk7IH0pO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgICAgIC8vYWRkIHRvIGxpc3Qgc3RvcmFnZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIHdlcmUgbm8gJ1RvRG9JdGVtcycgZm91bmQgb3IgdGhleSBhcmUgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVUb0RvTGlzdCgpIHtcbiAgICAgICAgLy9yZXRyaWV2ZSB0b2RvIGl0ZW1zIGluIGxvY2FsIHN0b3JhZ2UgYW5kIGFkZCBlYWNoIHRvIHRoZSBsaXN0XG4gICAgICAgIGxldCBwYXJzZWRUb0RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcblxuICAgICAgICBpZiAocGFyc2VkVG9Eb3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRUb0Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhwYXJzZWRUb0Rvc1tpXS50b2RvaXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9XaWRnZXQuVG9Eb0VsZW1lbnRzLmFkZEJ1dHRvbjtcbiAgICAgICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb1dpZGdldC5Ub0RvRWxlbWVudHMuYWRkSXRlbVRvRW50ZXI7XG4gICAgICAgIGlmIChBRERCVVRUT04gIT0gbnVsbCAmJiBBRERJVEVNRU5URVIgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIERlbGV0ZUJ1dHRvbihib3g6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGJveC5wYXJlbnROb2RlICE9IG51bGwgJiYgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nICE9IG51bGwgJiZcbiAgICAgICAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICBsZXQgcm93Q2hrQnggPSA8SFRNTEVsZW1lbnQ+Ym94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIGxldCByb3dDaGtCeElOID0gPEhUTUxJbnB1dEVsZW1lbnQ+cm93Q2hrQnguY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHRvZG9UYWJsZTogSFRNTFRhYmxlRWxlbWVudCA9IFRvRG9XaWRnZXQuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgICAgIGlmICh0b2RvVGFibGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmJveC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSB0ci5yb3dJbmRleDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb1dpZGdldC5Ub0RPcy0tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBhc3NvY2lhdGVkIHN0b3JhZ2UgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgICAgICAgICBUb0RvV2lkZ2V0LlRvRE9zLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhYmxlJyBlbGVtZW50IG5vdCBmb3VuZCBvciBpdCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgICAgICBpZiAoIVRvRG9XaWRnZXQuaXNUb0RvSW5TdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNhbXBsZSBlbnRyeSBpbiB0aGUgVG9EbyB0YWJsZSBhcyBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICAgICAgICAgIFRvRG9XaWRnZXQuVG9ET3MrKztcblxuICAgICAgICAgICAgLy9cImRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICB0ZDJERUwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5EZWxldGVCdXR0b24odGQyREVMKSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgdG9kb3NXaWRnZXQgPSB7XG4gICAgaW5pdDogKGVsZW06IEVsZW1lbnQpID0+IHtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIHRvLWRvIHdpZGdldCwgY2FsbCBjcmVhdGVcbiAgICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvV2lkZ2V0KCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlcyB0aGUgbWFya3VwIG5lZWRlZCBhbmQgaW1wb3J0cyBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZSwgY29udGFpbmluZyB0aGUgdG9kbyBpdGVtc1xuICAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9zV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi4vY29tcG9uZW50cy9XZWJCaXRcIlxuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcInBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVAgQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MIE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYklERVwiLFxuICAgICAgICAyNCxcbiAgICAgICAgXCJXZWJJREVcIixcbiAgICAgICAgXCJUcnkgc2tpcHBpbmcgdGhlIGRvd25sb2FkIHdpdGggYSB3ZWIgSURFXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDMpLFxuICAgICAgICBcInBhZ2VzL3dlYmlkZXMuaHRtbFwiLFxuICAgICAgICBcImltZy91eC53ZWJwXCIsXG4gICAgICAgIFwiQSBjb21wdXRlciBhcHBsaWNhdGlvbiBpY29uXCJcbiAgICApLFxuKTtcbmNvbnN0IEd1aWRlU2hvcnRzID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICAxNCxcbiAgICAgICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICBcIk9wdGltaXplIHlvdXIgc2VhcmNoIGVuZ2luZSBuZXdzIGFuZCByZXN1bHRzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoX3NldHRpbmdzLndlYnBcIixcbiAgICAgICAgXCJTZWFyY2ggc2V0dGluZ3MgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNNVFBcIixcbiAgICAgICAgMTYsXG4gICAgICAgIFwiR1VJREU6IFNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgIFwiTGVhcm4gRW1haWwgcHJvdG9jb2xzIGFuZCBwb3J0IG51bWJlcnNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMTMpLFxuICAgICAgICBcImd1aWRlcy9zbXRwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29tbXVuaWNhdGlvbnMud2VicFwiLFxuICAgICAgICBcIkVtYWlsIHNlcnZlci1zdGFjayB3aXRoIG1haWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldlRvb2xzXCIsXG4gICAgICAgIDE5LFxuICAgICAgICBcIkdVSURFOiBEZXYgVG9vbHM6IEFwcGxpY2F0aW9uIFRhYlwiLFxuICAgICAgICBcIlJldmlldyBzaXRlIGRhdGEgd2hlbiBjbGVhcmluZyB0aGUgYnJvd3NlciBoaXN0b3J5XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvYXBwbGljYXRpb250YWIuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveC53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldlRvb2xzVHdvXCIsXG4gICAgICAgIDIxLFxuICAgICAgICBcIkdVSURFOiBEZXYgVG9vbHM6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgXCJPcGVuIHRoZSBkZXZlbG9wZXIncyB0b29sYm94IGFub3RoZXIgd2F5XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDEwKSxcbiAgICAgICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gyLndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uIHR3b1wiXG4gICAgKSxcbik7XG5jb25zdCBFeHBsb3JlID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwibmFzYVwiLFxuICAgICAgICAzLFxuICAgICAgICBcIkVYUExPUkU6IE5BU0EgUGFnZXNcIixcbiAgICAgICAgXCJDaGVjayBvdXQgc29tZSBOQVNBIGxpbmtzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxOCksXG4gICAgICAgIFwiZXhwbG9yZS9uYXNhLmh0bWxcIixcbiAgICAgICAgXCJpbWcvTkFTQS53ZWJwXCIsXG4gICAgICAgIFwiTkFTQSBBcnRlbWlzIExvZ29cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAgICAgMTgsXG4gICAgICAgIFwiRVhQTE9SRTogVmlydHVhbCBUb3Vyc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIHJlYWwgd29ybGQgaW4gYSB3ZWIgYnJvd3NlclwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMyksXG4gICAgICAgIFwiZXhwbG9yZS92aXJ0dWFsdG91ci5odG1sXCIsXG4gICAgICAgIFwiaW1nL2dvb2dsZS1leHBlZGl0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiR29vZ2xlIEV4cGVkaXRpb25zIGxvZ28gZnJvbSBGTEFUSUNPTlwiXG4gICAgKSxcbik7XG5cbmNvbnN0IFdFQkJJVERBVEEgPSBbQXJiaXRyYXJ5QXJ0aWNsZXMsIEd1aWRlU2hvcnRzLCBFeHBsb3JlXVxuXG5leHBvcnQgZGVmYXVsdCBXRUJCSVREQVRBO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmtcIjtcblxubGV0IEFUVFJJQlVUSU9OTElOS0RBVEEgPSBbXG5cbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJkb21haW4gaWNvbnNcIixcbiAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG9tYWluXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgIDFcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImNvZGUgaWNvbnNcIixcbiAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvZGVcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgMlxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwic3NsIGNlcnRpZmljYXRlIGljb25zXCIsXG4gICAgXCJTc2wgY2VydGlmaWNhdGUgaWNvbnMgY3JlYXRlZCBieSBpbmlwYWdpc3R1ZGlvIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbC1jZXJ0aWZpY2F0ZVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgNFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiYWkgaWNvbnNcIixcbiAgICBcIkFpIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgIDhcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInByb3RvdHlwZSBpY29uc1wiLFxuICAgIFwiUHJvdG90eXBlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wcm90b3R5cGVcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJQYWludCAzRFwiLFxuICAgIDlcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImRpY3Rpb25hcnkgaWNvbnNcIixcbiAgICBcIkRpY3Rpb25hcnkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RpY3Rpb25hcnlcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgMTBcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayAoXG4gICAgXCJCT0lOQyBpY29uc1wiLFxuICAgIFwiQk9JTkMgaWNvbiBkZXNpZ25lZCBieSBNaWNoYWwgS3Jha293aWFrLiBDb3lyaWdodChDKSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWFcIixcbiAgICBcImh0dHBzOi8vYm9pbmMuYmVya2VsZXkuZWR1XCIsXG4gICAgXCJCT0lOQ1wiLFxuICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAxMVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiSVAgaWNvbnNcIixcbiAgICBcIklQIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgMTJcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImh0bWwgaWNvbnNcIixcbiAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0bWxcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgMTNcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImNvbnRlbnQgd3JpdGluZyBpY29uc1wiLFxuICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvbnRlbnQtd3JpdGluZ1wiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAxNFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwicGFnZSBzcGVlZCBpY29uc1wiLFxuICAgIFwiUGFnZSBzcGVlZCBpY29ucyBjcmVhdGVkIGJ5IFByb3N5bWJvbHMgUHJlbWl1bSAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgIDE1XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiU01UUCBhbmQgRW1haWxcIixcbiAgICAxNlxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90ZXJtaW5hbFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgMTdcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImdvb2dsZSBleHBlZGl0aW9ucyBpY29uc1wiLFxuICAgIFwiR29vZ2xlIGV4cGVkaXRpb25zIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAxOFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRldlRvb2xzXCIsXG4gICAgMTlcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImRucyBpY29uc1wiLFxuICAgIFwiRG5zIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kbnNcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJMRUFSTjogRE5TXCIsXG4gICAgMjBcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJEZXZUb29sc1R3b1wiLFxuICAgIDIxXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJyYW5rIGljb25zXCIsXG4gICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcmFua1wiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAyMlxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwidHJlZSBpY29uc1wiLFxuICAgIFwiVHJlZSBpY29ucyBjcmVhdGVkIGJ5IGp1c3RpY29uIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RyZWVcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJET01cIixcbiAgICAyM1xuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZGVzaWduIGljb25zXCIsXG4gICAgXCJEZXNpZ24gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIndlYmlkZXNcIixcbiAgICAyNFxuICAgIClcbl07XG5cbmV4cG9ydCBkZWZhdWx0IEFUVFJJQlVUSU9OTElOS0RBVEE7IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IGNhcmRzV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9XZWJCaXRzJ1xuaW1wb3J0IGRpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL2RpY3Rpb25hcnl3aWRnZXQnO1xuaW1wb3J0IHRvZG9zV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy90b2Rvcyc7XG5pbXBvcnQgSEVBREVSRk9PVEVSIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXJmb290ZXInO1xuaW1wb3J0IGV4cGFuZGluZ0xpc3RET01XaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL2V4cGFuZGluZ0xpc3RET01XaWRnZXQnO1xuaW1wb3J0IGFjdGl2ZUNhcmQgZnJvbSAnLi9jb21wb25lbnRzL2dyb3dpbmdjYXJkJztcblxuLy8gZW50cnkgcG9pbnRcbigoKSA9PiB7XG4gICAgLy8gRXZlbnQgZmlyZWQgYmVmb3JlIGFzc2V0cyBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZXMsIGFkZCBjYXJkcyB3aWRnZXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMuaHRtbCcpIHtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICBpZiAoIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzL2RvbS5odG1sJykge1xuICAgICAgICAgICAgZXhwYW5kaW5nTGlzdERPTVdpZGdldC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy93ZWJpZGVzLmh0bWwnKSB7XG4gICAgICAgICAgICBhY3RpdmVDYXJkLmluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcbiAgICAgICAgaWYgKGRpY3Rpb25hcnlFbGVtZW50KSB7XG4gICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmluaXQoZGljdGlvbmFyeUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIFRvRG9zIHdpZGdldCBpZiB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBjb25zdCB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xuICAgICAgICBpZiAodG9Eb3NFbGVtZW50ICE9IG51bGwpXG4gICAgICAgICAgICB0b2Rvc1dpZGdldC5pbml0KHRvRG9zRWxlbWVudCk7XG4gICAgfSlcblxufSkoKTsiXX0=

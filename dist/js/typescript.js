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
const data_1 = require("./data");
const data_AttributionLinks_1 = require("./data_AttributionLinks");
const cardsWidget = {
    init: () => {
        let cardsArticles = [
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
        ];
        let cardsSection = [
            cardsWidget.buildCardSection("Arbitrary Articles:"),
            cardsWidget.buildCardSection("Guide Shorts:"),
            cardsWidget.buildCardSection("Exlore the Web:"),
        ];
        //Route Checks -> Add widget and format multiple pages
        if (window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/RandomWebBits/' ||
            window.location.pathname == '/dist/index.html') {
            const getMultipleRandom = (arr, num) => {
                const shuffled = [...arr].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, num);
            };
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 3);
        }
        for (let i = 0; i < cardsSection.length; i++) {
            if (cardsSection[i] != undefined) {
                //from cards stack, append each to section
                cardsArticles.shift().forEach((article) => {
                    cardsSection[i].append(article);
                });
            }
            else {
                console.log("There's an error.");
            }
        }
    },
    buildCardSection: (name) => {
        //Create Artibrary Articles section element and append to Main
        const pageMain = document.querySelector("main");
        if (pageMain != null && pageMain.nodeName === 'MAIN') {
            const AASection = document.createElement("section");
            AASection.classList.add("cards");
            //Create card section heading and div element. Append to section
            let aaHeading = document.createElement('h2');
            aaHeading.innerText = `${name}`;
            let aaCardsSection = document.createElement('div');
            aaCardsSection.classList.add('card_columns');
            AASection.appendChild(aaHeading);
            AASection.appendChild(aaCardsSection);
            pageMain.append(AASection);
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
        //Map WebBits to a card, each
        let AAs = cardsData.map((article) => {
            let WebBit = document.createElement('div');
            WebBit.classList.add('card');
            let cardImgTop = document.createElement('div');
            let cardImg = document.createElement('img');
            cardImg.setAttribute('src', article.cardImage);
            cardImg.setAttribute('alt', article.cardImageALT);
            cardImg.setAttribute('Article', article.articleNumber);
            cardImgTop.appendChild(cardImg);
            let cardBody = document.createElement('div');
            cardBody.classList.add("cardBody");
            let cardBodyHeading = document.createElement('h3');
            let cardBodyPara = document.createElement('p');
            let cardBodyLink = document.createElement('a');
            cardBody.appendChild(cardBodyHeading);
            cardBody.appendChild(cardBodyPara);
            cardBody.appendChild(cardBodyLink);
            cardBodyHeading.innerText = article.name;
            attrlinks.map((link) => {
                //Determine if card image needs attribution panel
                if (cardImg.getAttribute('Article') === link.articleid.toString()) { //match WebBit ID to Icon ID
                    cardImgTop.classList.add("flip-card");
                    const cardInner = cardImgTop.appendChild(document.createElement("div"));
                    cardInner.classList.add("inner");
                    const cardFront = cardInner.appendChild(document.createElement("div"));
                    cardFront.classList.add("cardFront");
                    cardFront.appendChild(cardImg);
                    let smallImg = cardImg.cloneNode(false);
                    smallImg.classList.add("imgSmall", "imgPTR");
                    const cardBack = cardInner.appendChild(document.createElement("div"));
                    cardBack.classList.add("cardBack");
                    const backHeading = cardBack.appendChild(document.createElement("h3"));
                    backHeading.textContent = link.attributeowner;
                    cardBack.appendChild(smallImg);
                    const backPara = cardBack.appendChild(document.createElement("p"));
                    backPara.textContent = link.innerText;
                    const attributeLink = cardBody.appendChild(document.createElement("a"));
                    attributeLink.href = link.hReference;
                    attributeLink.title = link.title;
                    attributeLink.textContent = link.attributeowner;
                    attributeLink.classList.add("attribute");
                }
            });
            cardBodyPara.textContent = article.description;
            cardBodyLink.setAttribute('href', article.articleLink);
            cardBodyLink.textContent = "Go to Page";
            WebBit.appendChild(cardImgTop);
            WebBit.appendChild(cardBody);
            return WebBit;
        });
        return AAs;
    }
};
exports.default = cardsWidget;

},{"./data":6,"./data_AttributionLinks":7}],5:[function(require,module,exports){
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
            this.errorElem.innerText = "404 fetch error!";
            this.errorElem.classList.add("error");
        }
        if (!res.ok || res.status != 200) {
            throw new Error(res.ok + ": " + res.status);
        }
        return res.json();
    }
    fetchData(GETURL) {
        return fetch(GETURL)
            .then((response) => this.apiResponseErrorCheck(response))
            .then((data) => data)
            .catch(e => {
            console.error(e);
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
const WebBit_1 = require("./WebBit");
// Create new AA (Arbitrary Article)
const ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup"), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example"), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate"), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo"), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon"), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction"), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo"), new WebBit_1.default("IP Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon"), new WebBit_1.default("HTML Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon"), new WebBit_1.default("Network Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon"), new WebBit_1.default("PowerShell Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon"), new WebBit_1.default("LEARN: DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard"), new WebBit_1.default("LEARN: Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon"), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 10), "pages/dom.html", "img/tree.webp", "A tree icon"));
const GuideShorts = new Array(new WebBit_1.default("Search Verticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon"), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon"), new WebBit_1.default("DevTools", 19, "GUIDE: Dev Tools: Application Tab", "Review site data when clearing the browser history", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon"), new WebBit_1.default("DevToolsTwo", 21, "GUIDE: Dev Tools: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two"));
const Explore = new Array(new WebBit_1.default("nasa", 3, "EXPLORE: NASA Pages", "Check out some NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo"), new WebBit_1.default("Virtual Tour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON"));
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"./WebBit":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const AttributionLink_1 = require("./AttributionLink");
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
    new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)
];
exports.default = ATTRIBUTIONLINKDATA;

},{"./AttributionLink":1}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const api_1 = require("./api");
class Dictionary {
    static isExistingCacheinBrowser;
    static cachedWordsCount;
    static existingCaches;
    static wordCaches;
    static previousWordsBtnWasClicked = false;
    static previousWordsBtnIsCreated = false;
    wordURL;
    //private static wordURLs: any[];
    constructor() {
        //new dictionary. no initializing functions needed
        //static class - needs to show on browser any caches that exist
        //and their names
    }
    static getLocalStorageWordCaches() {
        //enumerate all of the caches
        //cache response links and cache name are previously stored in local storage
        //Enumerate local storage 'word-caches' items
        let storageStr = localStorage.getItem('word-caches');
        if (storageStr != null) {
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
}
let wordSearches = new Dictionary();
//let wordcaches: caches[] = []; //filling for private static member which has errors mapping
const dictionaryWidget = {
    init: (elem) => {
        var twoelements = dictionaryWidget.buildDictionaryTermSection.createDictionaryWidget(elem);
        dictionaryWidget.buildDictionaryTermSection.addWordSearchEvents(twoelements);
        dictionaryWidget.buildDictionaryTermSection.checkCacheStorage();
    },
    requestDictionaryTerm: {
        // API fetch request the data from dictionary api:
        requestUrl: "https://api.dictionaryapi.dev/api/v2/entries/en/",
        fetchDictionaryTerm: (word, wordUrl, elem, sendToCache, cacheName) => {
            // The function calls to either store in Cache Storage
            // If items are to be cached, edit Local Storage cache names
            //TODO: dictionary fetch api:
            //TODO: 1.) is to be cached true? --check
            //TODO: 2.) is to be cached false? --check
            //TODO: --> are they the same behavior? --check
            //TODO: --> is the result in the cache? --check
            //TODO: send to cache true option allows empty string
            let wordCacheStore = [];
            let wordcache = {
                inCache: sendToCache,
                word: word,
                wordURL: wordUrl,
                cacheName: sendToCache ? cacheName : "",
            };
            wordCacheStore.push(wordcache);
            // Add the cache item to Local Storage
            const setCacheItem = (sendToBrowserCache, wordArray) => {
                try {
                    if (localStorage.getItem('word-caches') == null) {
                        // Local storage empty => add the word
                        localStorage.setItem('word-caches', JSON.stringify(wordCacheStore));
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
            };
            const wordFetchRequest = async () => {
                //set apiGET sendToBrowserCache to true to use cache storage
                const wordFetch = new api_1.apiGET(wordcache.wordURL, false, wordcache.cacheName, elem.errorElem);
                let data = await wordFetch.apiGET(wordFetch.getGETURL());
                if (data instanceof Response) {
                    data.json();
                }
                let wordData = data;
                let noDefinitions = false;
                // if (Object.hasOwn(wordData, 'title')){
                //     noDefinitions = true;
                // }
                if (data != undefined && !noDefinitions) {
                    dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
                    setCacheItem(wordFetch.getSendToBrowserCache(), wordCacheStore);
                }
                else {
                    if (noDefinitions) {
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
        createDictionaryWidget: (elem) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("dictionaryWidget")) {
                    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                    if (dictionary != null) {
                        dictionary.id = "dictionary";
                        const artH = dictionary.appendChild(document.createElement("h3"));
                        artH.textContent = "Dictionary Term:";
                        //create dictionary form
                        const searchForm = dictionary.appendChild(document.createElement("form"));
                        const previousWords = dictionary.appendChild(document.createElement("div"));
                        searchForm.id = "dictionary-search";
                        searchForm.action = "index.html";
                        previousWords.classList.add("previousWords");
                        let searchWords = {
                            searchWord: searchForm.appendChild(document.createElement("input")),
                            wordSearch: searchForm.appendChild(document.createElement("button")),
                            dictionaryElem: dictionary,
                            errorElem: searchForm.appendChild(document.createElement("span")),
                            previousWordBtn: previousWords.appendChild(document.createElement("button")),
                            refreshBtn: previousWords.appendChild(document.createElement("button")),
                        };
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
                    console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
                }
            }
            else {
                console.log(`There is no "dictionaryWidget" class on this page.`);
            }
        },
        checkCacheStorage: () => {
            // gather local storage word with getLocalStorageWordCaches()
            Dictionary.getLocalStorageWordCaches();
        },
        wordValidation: (intxt) => {
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
        wordSearchUpdate: (searchElems) => {
            let acceptedInputWord = false;
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
        addWordSearchEvents: (searchElems) => {
            if (searchElems == undefined) {
                console.log("A search element is undefined from searchWord | wordSearch");
                return;
            }
            //Add form input event listeners
            //Upon input entry, fire API fetch
            searchElems.wordSearch.addEventListener("click", (event) => {
                event.preventDefault();
                dictionaryWidget.buildDictionaryTermSection.wordSearchUpdate(searchElems);
            });
            searchElems.searchWord.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    dictionaryWidget.buildDictionaryTermSection.wordSearchUpdate(searchElems);
                }
            });
            // "Previous word searches" button fetches locally stored words
            // Clicking the button displays each word in a list within the widget
            searchElems.previousWordBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const placementlocationholder = document.querySelector(".previousWords");
                let buttonContainer = document.getElementById("dictionary-btns");
                let newButtonContainer;
                if (Dictionary.previousWordsBtnWasClicked == false) {
                    if (Dictionary.previousWordsBtnIsCreated == false) {
                        newButtonContainer = placementlocationholder.insertAdjacentElement('afterend', document.createElement("div"));
                        newButtonContainer.id = "dictionary-btns";
                        //Check the placement location and word caches for undefined
                        if (placementlocationholder != undefined && Dictionary.wordCaches !== undefined) {
                            for (let wordCache of Dictionary.wordCaches) {
                                const cacheWordHeadingElem = newButtonContainer.appendChild(document.createElement("button"));
                                cacheWordHeadingElem.setAttribute("type", "button");
                                cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
                                cacheWordHeadingElem.textContent = wordCache.word;
                                //add event listener for new button
                                cacheWordHeadingElem.addEventListener("click", (event) => {
                                    event.preventDefault();
                                    dictionaryWidget.requestDictionaryTerm.fetchDictionaryTerm(wordCache.word, wordCache.wordURL, searchElems, false, "");
                                });
                                Dictionary.previousWordsBtnIsCreated = true;
                            }
                        }
                        else {
                            const noWordsHeadingElem = newButtonContainer.appendChild(document.createElement("div"));
                            noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                            noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                        }
                    }
                    else {
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
            });
            searchElems.refreshBtn.addEventListener("click", (event) => {
                event.preventDefault();
                location.reload();
            });
        }
    },
    createDictionaryTermWithMarkup: (wordData, searchElems) => {
        const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        definitionDescriptionContainer.classList.add("definitionDescription");
        const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
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
                    definitionP.classList.add("wordDefinition");
                    const addAdjacentElem = () => {
                        definitionP.classList.add("example");
                        //console.log("What are all the selections: ", def);
                        const newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
                        if (newP instanceof HTMLElement) {
                            const newPi = newP.appendChild(document.createElement("i"));
                            newPi.textContent = def.example;
                        }
                        else {
                            console.log("Definition element is null.");
                        }
                    };
                    //check if key "example" is in definition. If it is, add the example to list
                    "example" in def ? addAdjacentElem() : true == true;
                });
            });
        });
        definitionDescriptionContainer.appendChild(definitionDescription);
        Dictionary.previousWordsBtnWasClicked = false;
    },
};
exports.default = dictionaryWidget;

},{"./api":5}],9:[function(require,module,exports){
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
        self = super();
        // Get ul and li elements that are a child of this custom ul element
        // li elements can be containers if they have uls within them
        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));
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
                newSpan.onclick = self.showul;
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

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (pageMain != null) {
                siteHeader = pageMain.insertAdjacentElement('beforebegin', HEADERFOOTER.headerWidget.buildHeader(pageMain));
                if (siteHeader != null)
                    siteHeader.prepend(HEADERFOOTER.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null before 'main' element.");
            }
            else {
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
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));
            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                if (window.location.host == 'rhowell476.github.io') {
                    navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                }
                else {
                    navListLinks.setAttribute('href', `/${item.hReference}`);
                }
                navListLinks.textContent = `${item.innerText}`;
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
            });
            return headerNavFrag;
        }
    },
    footerWidget: {
        init: () => {
            let footer = HEADERFOOTER.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HEADERFOOTER.footerWidget.buildFaviconAttribution(footer));
        },
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
            siteFooter.append(footerPara);
            return siteFooter;
        },
        buildFaviconAttribution: (footer) => {
            //Favicon designed by IconHome attribution
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755';
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = `Favicon designed by IconHome at `;
            footerIconPara.appendChild(footerIconLink);
            footer.appendChild(footerIconPara);
            return footerIconPara;
        }
    }
};
exports.default = HEADERFOOTER;

},{"./LinkDetails":2}],11:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const todosWidget = {
    init: (elem) => {
        todosWidget.toDosListSection.createToDoListWidget(elem);
    },
    toDosListSection: {
        ToDOs: 0,
        createSampleTo_Do: (tbody) => {
            if (localStorage.getItem('ToDos') == null) {
                const tr2 = tbody.appendChild(document.createElement('tr'));
                const td2left = tr2.appendChild(document.createElement('td'));
                const td2IN = td2left.appendChild(document.createElement('input'));
                td2IN.type = "checkbox";
                td2IN.setAttribute("aria-label", "Checkbox");
                const td2middle = tr2.appendChild(document.createElement('td'));
                td2middle.setAttribute("num", `${1}`);
                todosWidget.toDosListSection.ToDOs++;
                td2middle.textContent = "Add a ToDO Item.";
                const td2right = tr2.appendChild(document.createElement('td'));
                const td2DEL = td2right.appendChild(document.createElement('input'));
                td2IN.setAttribute("aria-label", "Delete");
                td2DEL.setAttribute("type", "reset");
                td2DEL.setAttribute("value", "Delete");
                //"delete" event listener
                td2DEL.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(td2DEL); });
            }
        },
        AddToDo: (description, firstPaint) => {
            //after "Add" is clicked, insert new table row
            const TABLEITEM = document.getElementById('ToDoItems');
            if (TABLEITEM != null) {
                const tableFrag = document.createDocumentFragment();
                const newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
                const firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
                const checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
                checkBOX.setAttribute('type', 'checkbox');
                checkBOX.setAttribute('aria-label', 'Checkbox');
                const newITEM = newRow.appendChild(document.createElement('td')); //Table second data
                newITEM.textContent = description.toString(); //Populate second col
                newITEM.setAttribute('num', todosWidget.toDosListSection.ToDOs ? (() => {
                    let elem = document.querySelector('#ToDO td[num]');
                    return ((Number(elem?.getAttribute("num")) || -1000) + todosWidget.toDosListSection.ToDOs).toString();
                })() : (1).toString());
                todosWidget.toDosListSection.ToDOs++; //Number of Items
                const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
                const delBOX = secondCOL.appendChild(document.createElement('input')); //Add deletebox
                delBOX.setAttribute('type', 'submit');
                delBOX.setAttribute('value', 'Delete');
                checkBOX.setAttribute('aria-label', 'Delete');
                TABLEITEM.appendChild(tableFrag);
                //"delete" event listener
                delBOX.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(delBOX); });
                if (firstPaint) {
                    //add to list storage
                    todosWidget.toDoListStorage.addtoDoToStorage(description);
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
        },
        DeleteButton: (box) => {
            if (box.parentNode != null && box.parentNode.previousSibling != null &&
                box.parentNode.previousSibling.previousSibling != null) {
                let rowChkBx = box.parentNode.previousSibling.previousSibling;
                let rowChkBxIN = rowChkBx.childNodes[0];
                const table = document.querySelector('table');
                if (table != null) {
                    let tr = box.parentNode.parentNode;
                    let i = tr.rowIndex;
                    let value = box.parentNode.previousSibling.textContent;
                    if (rowChkBxIN.checked) {
                        //remove row since completed
                        table.deleteRow(i);
                        if (value != 'Add a ToDO Item.') {
                            todosWidget.toDosListSection.ToDOs--;
                            //delete associated storage item
                            todosWidget.toDoListStorage.removetoDoFromStorage(value);
                        }
                        console.log("Done.");
                    }
                    else {
                        table.deleteRow(i);
                        todosWidget.toDosListSection.ToDOs--;
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
        },
        addToDoEventListeners: () => {
            const ADDBUTTON = document.getElementById('AddButton');
            const ADDITEMENTER = document.querySelector('input[name="itemINPUT"]');
            if (ADDBUTTON != null && ADDITEMENTER != null) {
                ADDBUTTON.addEventListener("click", () => {
                    todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                });
                ADDITEMENTER.addEventListener("keydown", (e) => {
                    if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                        todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
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
        },
        populateToDoList: () => {
            //retrieve Storage, add if missing
            let storageToDos = todosWidget.toDoListStorage.getAlltoDoFromStorage();
            if (storageToDos.length > 0) {
                for (let i = 0; i < storageToDos.length; i++) {
                    todosWidget.toDosListSection.AddToDo(storageToDos[i].ToDoItem, false);
                }
            }
        },
        createToDoListWidget: (elem) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("ToDoList")) {
                    switch (window.location.pathname) {
                        case '/RandomWebBits/':
                        case '/RandomWebBits/index.html':
                        case '/index.html':
                        case '/':
                        case '/dist/index.html':
                            const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                            const header = todolistSection.appendChild(document.createElement('h3'));
                            header.textContent = "To-Do:";
                            todolistSection.id = "ToDO";
                            const div = todolistSection.appendChild(document.createElement('div'));
                            const table = div.appendChild(document.createElement('table'));
                            const thead = table.appendChild(document.createElement('thead'));
                            const tr1 = thead.appendChild(document.createElement('tr'));
                            const thleft = tr1.appendChild(document.createElement('th'));
                            thleft.textContent = "Complete?";
                            const thmiddle = tr1.appendChild(document.createElement('th'));
                            thmiddle.textContent = "Description";
                            const tbody = table.appendChild(document.createElement('tbody'));
                            tbody.id = "ToDoItems";
                            todosWidget.toDosListSection.createSampleTo_Do(tbody);
                            const tfoot = table.appendChild(document.createElement('tfoot'));
                            const tr3 = tfoot.appendChild(document.createElement('tr'));
                            const td3left = tr3.appendChild(document.createElement('td'));
                            const td3IN = td3left.appendChild(document.createElement('input'));
                            td3IN.id = "AddButton";
                            td3IN.type = "button";
                            td3IN.setAttribute("aria-label", "Add");
                            td3IN.setAttribute("Value", "Add");
                            const td3middle = tr3.appendChild(document.createElement('td'));
                            const INPUT = td3middle.appendChild(document.createElement('input'));
                            INPUT.setAttribute("name", "itemINPUT");
                            INPUT.setAttribute("type", "text");
                            INPUT.setAttribute("aria-label", "Input");
                            table.appendChild(document.createElement('tfoot'));
                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();
                            break;
                        case '/RandomWebBits/pages/todos.html':
                        case '/pages/todos.html':
                            const htbody = document.querySelector("#ToDoItems");
                            if (htbody != null) {
                                todosWidget.toDosListSection.createSampleTo_Do(htbody);
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
                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();
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
    },
    toDoListStorage: {
        getAlltoDoFromStorage: () => {
            let values = localStorage.getItem('ToDos');
            return values ? JSON.parse(values) : [];
        },
        addtoDoToStorage: (description) => {
            let ToDo = {
                ToDoItem: description,
            };
            //add the ToDos to local cache
            try {
                if (localStorage.getItem('ToDos') == null) {
                    let todos = [];
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
                else {
                    let storageStr = localStorage.getItem('ToDos');
                    if (storageStr == null) {
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
                        let todos = JSON.parse(storageStr);
                        todos.push(ToDo);
                        localStorage.setItem('ToDos', JSON.stringify(todos));
                    }
                }
            }
            catch (err) {
                console.log("Problem storing To-do list item: ", err);
            }
        },
        removetoDoFromStorage: (item) => {
            let storageStr = localStorage.getItem('ToDos');
            if (storageStr == null) {
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
                let todos = JSON.parse(storageStr);
                todos = todos.filter((todo) => todo.ToDoItem !== item);
                if (todos.length > 0)
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                else
                    localStorage.removeItem('ToDos');
            }
        }
    }
};
exports.default = todosWidget;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expandingList_1 = require("./components/expandingList");
const expandingList = {
    init: () => {
        // Define the new element
        customElements.define('expanding-list', expandingList_1.ExpandingList, { extends: 'ul' });
        // Add title attribute to all li that can expand further
        const expandableLis = document.querySelectorAll(`ul[is="expanding-list"] li span`);
        for (let li of expandableLis) {
            li.setAttribute('title', 'Click to expand...');
        }
    }
};
exports.default = expandingList;

},{"./components/expandingList":9}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const WebBits_1 = require("./components/WebBits");
const dictionary_1 = require("./components/dictionary");
const todos_1 = require("./components/todos");
const headerfooter_1 = require("./components/headerfooter");
const expandingList_1 = require("./expandingList");
(() => {
    window.addEventListener("DOMContentLoaded", () => {
        if ( //'Index' and 'Pages' route, add cards widget first
        window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '' ||
            window.location.pathname == '/RandomWebBits/pages.html' ||
            window.location.pathname == '/pages.html') {
            WebBits_1.default.init();
        }
        // Add the header and footer
        headerfooter_1.default.headerWidget.init();
        headerfooter_1.default.footerWidget.init();
        // Initialize page components
        // dom.html page uses expandingLists component
        if (window.location.pathname == '/pages/dom.html') {
            expandingList_1.default.init();
        }
        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement)
            dictionary_1.default.init(dictionaryElement);
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            todos_1.default.init(toDosElement);
    });
})();

},{"./components/WebBits":4,"./components/dictionary":8,"./components/headerfooter":10,"./components/todos":11,"./expandingList":12}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvY29tcG9uZW50cy9MaW5rRGV0YWlscy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdC50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvY29tcG9uZW50cy9hcGkudHMiLCJzcmMvY29tcG9uZW50cy9kYXRhLnRzIiwic3JjL2NvbXBvbmVudHMvZGF0YV9BdHRyaWJ1dGlvbkxpbmtzLnRzIiwic3JjL2NvbXBvbmVudHMvZGljdGlvbmFyeS50cyIsInNyYy9jb21wb25lbnRzL2V4cGFuZGluZ0xpc3QudHMiLCJzcmMvY29tcG9uZW50cy9oZWFkZXJmb290ZXIudHMiLCJzcmMvY29tcG9uZW50cy90b2Rvcy50cyIsInNyYy9leHBhbmRpbmdMaXN0LnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLGtDQUFrQztBQUNsQywrQ0FBd0M7QUFFeEMsdUNBQXVDO0FBQ3ZDLE1BQU0sZUFBZ0IsU0FBUSxxQkFBVztJQUNyQyxjQUFjLENBQVM7SUFDdkIsU0FBUyxDQUFTO0lBRWxCLFlBQ0ksS0FBYSxFQUNiLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLGNBQXNCLEVBQ3RCLFFBQWdCLEVBQ2hCLFNBQWlCO1FBR2pCLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxlQUFlLENBQUM7Ozs7QUN2Qi9CLGtDQUFrQzs7QUFFbEMsTUFBTSxXQUFXO0lBQ2IsS0FBSyxDQUFTO0lBQ2QsU0FBUyxDQUFTO0lBQ2xCLFFBQVEsQ0FBUztJQUNqQixV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QkFBMkI7WUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksMkJBQTJCO1lBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUMzQyxpQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsNEJBQTRCO1FBQzVCLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpDLDZCQUE2QjtRQUM3Qiw4Q0FBOEM7UUFDOUMsSUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFBQztZQUMxQyx1QkFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCO1FBRUwsbURBQW1EO1FBQ25ELE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksaUJBQWlCO1lBQ2pCLG9CQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsSUFBSSxZQUFZLElBQUksSUFBSTtZQUNwQixlQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBMaW5rRGV0YWlscyBmcm9tIFwiLi9MaW5rRGV0YWlsc1wiO1xuXG4vL0ljb24gbGlua3MgdXNlZCBmb3IgaW1hZ2UgQXR0cmlidXRpb25cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIExpbmtEZXRhaWxzIHtcbiAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nO1xuICAgIGFydGljbGVpZDogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nLFxuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuICAgICAgICBcbiAgICAgICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVvd25lciA9IGF0dHJpYnV0ZW93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmNsYXNzIExpbmtEZXRhaWxzIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIHBhZ2VOYW1lOiBzdHJpbmc7XG4gICAgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtEZXRhaWxzOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmNsYXNzIFdlYkJpdCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gICAgYXJ0aWNsZUxpbms6IHN0cmluZztcbiAgICBjYXJkSW1hZ2U6IHN0cmluZztcbiAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgICAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL1dlYkJpdFwiO1xuaW1wb3J0IFdFQkJJVERBVEEgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgQVRUUklCVVRJT05MSU5LREFUQSBmcm9tIFwiLi9kYXRhX0F0dHJpYnV0aW9uTGlua3NcIjtcblxuY29uc3QgY2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRBcnRpY2xlQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpLCBBVFRSSUJVVElPTkxJTktEQVRBKSxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSwgQVRUUklCVVRJT05MSU5LREFUQSksXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBjYXJkc1NlY3Rpb246IEhUTUxEaXZFbGVtZW50W10gPSBbXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRTZWN0aW9uKFwiQXJiaXRyYXJ5IEFydGljbGVzOlwiKSEsXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiKSEsXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRTZWN0aW9uKFwiRXhsb3JlIHRoZSBXZWI6XCIpISxcbiAgICAgICAgXTtcblxuICAgICAgICAvL1JvdXRlIENoZWNrcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgbXVsdGlwbGUgcGFnZXNcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Rpc3QvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFycjogYW55LCBudW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1swXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMF0sIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYXJkc1NlY3Rpb25baV0gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL2Zyb20gY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkQ2FyZFNlY3Rpb246IChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy9DcmVhdGUgQXJ0aWJyYXJ5IEFydGljbGVzIHNlY3Rpb24gZWxlbWVudCBhbmQgYXBwZW5kIHRvIE1haW5cbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgJiYgcGFnZU1haW4ubm9kZU5hbWUgPT09ICdNQUlOJyl7XG4gICAgICAgICAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XG5cbiAgICAgICAgICAgIC8vQ3JlYXRlIGNhcmQgc2VjdGlvbiBoZWFkaW5nIGFuZCBkaXYgZWxlbWVudC4gQXBwZW5kIHRvIHNlY3Rpb25cbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgYWFIZWFkaW5nLmlubmVyVGV4dCA9IGAke25hbWV9YDtcbiAgICAgICAgICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFIZWFkaW5nKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG4gICAgYnVpbGRBcnRpY2xlQ2FyZHM6IChjYXJkc0RhdGE6IGFueSwgYXR0cmxpbmtzOiBBdHRyaWJ1dGlvbkxpbmtbXSkgPT4ge1xuICAgICAgICAvL01hcCBXZWJCaXRzIHRvIGEgY2FyZCwgZWFjaFxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBXZWJCaXQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICAgICAgbGV0IGNhcmRJbWdUb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGxldCBjYXJkSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBjYXJkSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYXJ0aWNsZS5jYXJkSW1hZ2UpO1xuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgICAgIGNhcmRJbWcuc2V0QXR0cmlidXRlKCdBcnRpY2xlJywgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyKTtcbiAgICAgICAgICAgIGNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoY2FyZEltZyk7XG4gICAgICAgICAgICBsZXQgY2FyZEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiKTtcbiAgICAgICAgICAgIGxldCBjYXJkQm9keUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGxldCBjYXJkQm9keUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBjYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcbiAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG4gICAgICAgICAgICBjYXJkQm9keUhlYWRpbmcuaW5uZXJUZXh0ID0gYXJ0aWNsZS5uYW1lO1xuICAgICAgICAgICAgYXR0cmxpbmtzLm1hcCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIC8vRGV0ZXJtaW5lIGlmIGNhcmQgaW1hZ2UgbmVlZHMgYXR0cmlidXRpb24gcGFuZWxcbiAgICAgICAgICAgICAgICBpZiAoY2FyZEltZy5nZXRBdHRyaWJ1dGUoJ0FydGljbGUnKSA9PT0gbGluay5hcnRpY2xlaWQudG9TdHJpbmcoKSkgeyAvL21hdGNoIFdlYkJpdCBJRCB0byBJY29uIElEXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJkSW5uZXIgPSBjYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkRnJvbnQuYXBwZW5kQ2hpbGQoY2FyZEltZyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkQmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tIZWFkaW5nID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xuICAgICAgICAgICAgICAgICAgICBjYXJkQmFjay5hcHBlbmRDaGlsZChzbWFsbEltZyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tQYXJhID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSBjYXJkQm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmNsYXNzTGlzdC5hZGQoXCJhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgY2FyZEJvZHlMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFydGljbGUuYXJ0aWNsZUxpbmspXG4gICAgICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgICAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKGNhcmRJbWdUb3ApO1xuICAgICAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKGNhcmRCb2R5KTtcblxuICAgICAgICAgICAgcmV0dXJuIFdlYkJpdDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhcmRzV2lkZ2V0XG4iLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICAgIHByaXZhdGUgR0VUVVJMOiBVUkw7XG4gICAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRhdGFJc0luQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTsgLy9UT0RPOiBkYXRhaW5jYWNoZSBvdmVyYWxsXG4gICAgcHJpdmF0ZSByZWNlaXZlZERhdGE6IGFueTsgLy9UT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKEdFVFVSTDogVVJMLCBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZywgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtID0gZXJyb3JFbGVtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R0VUVVJMKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5HRVRVUkw7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0R0VUVVJMKEdFVFVSTDogVVJMIHwgc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgR0VUVVJMID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLkdFVFVSTCA9IG5ldyBVUkwoR0VUVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSA0MDQpe1xuICAgICAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChHRVRVUkwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKX1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgICAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpe1xuICAgICAgICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJ2NhY2hlcycgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4oKHRleHQpID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKCh0ZXh0KSA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKCAocmVzcG9uc2U6YW55KSAgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIlxuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcInBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVAgQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MIE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDEwKSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiXG4gICAgKSxcbik7XG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBBcHBsaWNhdGlvbiBUYWJcIixcbiAgICAgICAgXCJSZXZpZXcgc2l0ZSBkYXRhIHdoZW4gY2xlYXJpbmcgdGhlIGJyb3dzZXIgaGlzdG9yeVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIlxuICAgICksXG4pO1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIm5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiQ2hlY2sgb3V0IHNvbWUgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIlxuICAgICksXG4pO1xuXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cblxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL0F0dHJpYnV0aW9uTGlua1wiO1xuXG5sZXQgQVRUUklCVVRJT05MSU5LREFUQSA9IFtcblxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImRvbWFpbiBpY29uc1wiLFxuICAgIFwiRG9tYWluIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgMVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiY29kZSBpY29uc1wiLFxuICAgIFwiQ29kZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29kZVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAyXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJzc2wgY2VydGlmaWNhdGUgaWNvbnNcIixcbiAgICBcIlNzbCBjZXJ0aWZpY2F0ZSBpY29ucyBjcmVhdGVkIGJ5IGluaXBhZ2lzdHVkaW8gLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICA0XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJhaSBpY29uc1wiLFxuICAgIFwiQWkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2FpXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgOFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwicHJvdG90eXBlIGljb25zXCIsXG4gICAgXCJQcm90b3R5cGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Byb3RvdHlwZVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlBhaW50IDNEXCIsXG4gICAgOVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZGljdGlvbmFyeSBpY29uc1wiLFxuICAgIFwiRGljdGlvbmFyeSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcbiAgICAxMFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rIChcbiAgICBcIkJPSU5DIGljb25zXCIsXG4gICAgXCJCT0lOQyBpY29uIGRlc2lnbmVkIGJ5IE1pY2hhbCBLcmFrb3dpYWsuIENveXJpZ2h0KEMpIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYVwiLFxuICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcbiAgICBcIkJPSU5DXCIsXG4gICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgIDExXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJJUCBpY29uc1wiLFxuICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2lwXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAxMlxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiaHRtbCBpY29uc1wiLFxuICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAxM1xuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiY29udGVudCB3cml0aW5nIGljb25zXCIsXG4gICAgXCJDb250ZW50IHdyaXRpbmcgaWNvbnMgY3JlYXRlZCBieSBWZWN0b3JzIFRhbmsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgIDE0XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXG4gICAgXCJQYWdlIHNwZWVkIGljb25zIGNyZWF0ZWQgYnkgUHJvc3ltYm9scyBQcmVtaXVtIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3BhZ2Utc3BlZWRcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJOZXR3b3JrIFNwZWVkXCIsXG4gICAgMTVcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInNlcnZlciBpY29uc1wiLFxuICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zZXJ2ZXJcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxuICAgIDE2XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJ0ZXJtaW5hbCBpY29uc1wiLFxuICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBGbGF0IEljb25zIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAxN1xuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZ29vZ2xlIGV4cGVkaXRpb25zIGljb25zXCIsXG4gICAgXCJHb29nbGUgZXhwZWRpdGlvbnMgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2dvb2dsZS1leHBlZGl0aW9uc1wiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlZpcnR1YWwgVG91clwiLFxuICAgIDE4XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRGV2VG9vbHNcIixcbiAgICAxOVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZG5zIGljb25zXCIsXG4gICAgXCJEbnMgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkxFQVJOOiBETlNcIixcbiAgICAyMFxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRldlRvb2xzVHdvXCIsXG4gICAgMjFcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInJhbmsgaWNvbnNcIixcbiAgICBcIlJhbmsgaWNvbnMgY3JlYXRlZCBieSBQaXhlbG1lZXR1cCAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9yYW5rXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiTEVBUk46IEdvb2dsZVwiLFxuICAgIDIyXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJ0cmVlIGljb25zXCIsXG4gICAgXCJUcmVlIGljb25zIGNyZWF0ZWQgYnkganVzdGljb24gLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRPTVwiLFxuICAgIDIzXG4gICAgKVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgQVRUUklCVVRJT05MSU5LREFUQTsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBhcGlHRVQgfSBmcm9tIFwiLi9hcGlcIjtcblxuY2xhc3MgRGljdGlvbmFyeSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNFeGlzdGluZ0NhY2hlaW5Ccm93c2VyOiBib29sZWFuO1xuICAgIHByaXZhdGUgc3RhdGljIGNhY2hlZFdvcmRzQ291bnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHN0YXRpYyBleGlzdGluZ0NhY2hlczogc3RyaW5nW107XG4gICAgcHVibGljIHN0YXRpYyB3b3JkQ2FjaGVzOiBjYWNoZXNbXTtcbiAgICBwdWJsaWMgc3RhdGljIHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHdvcmRVUkw6IFVSTDtcbiAgICAvL3ByaXZhdGUgc3RhdGljIHdvcmRVUkxzOiBhbnlbXTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9uZXcgZGljdGlvbmFyeS4gbm8gaW5pdGlhbGl6aW5nIGZ1bmN0aW9ucyBuZWVkZWRcbiAgICAgICAgLy9zdGF0aWMgY2xhc3MgLSBuZWVkcyB0byBzaG93IG9uIGJyb3dzZXIgYW55IGNhY2hlcyB0aGF0IGV4aXN0XG4gICAgICAgIC8vYW5kIHRoZWlyIG5hbWVzXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAgICAgLy9lbnVtZXJhdGUgYWxsIG9mIHRoZSBjYWNoZXNcbiAgICAgICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZVxuXG4gICAgICAgIC8vRW51bWVyYXRlIGxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtc1xuICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgICBpZiAoc3RvcmFnZVN0ciAhPSBudWxsKXtcbiAgICAgICAgICAgIERpY3Rpb25hcnkud29yZENhY2hlcyA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICByZXR1cm4gRGljdGlvbmFyeS53b3JkQ2FjaGVzO1xuICAgICAgICB9XG4gICAgICAgIC8vZ2V0Q2FjaGVTdG9yYWdlKClcbiAgICAgICAgLy8gZm9yIChsZXQgY2FjaGUgb2Ygd29yZGNhY2hlcyl7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIidDYWNoZSBTdG9yYWdlJyBuYW1lIGZvdW5kOiBcIiwgY2FjaGUuY2FjaGVOYW1lKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZih3b3JkY2FjaGVzLmxlbmd0aCAhPSBudWxsKXtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGNhY2hlIG9mIHdvcmRjYWNoZXMpIHtcblxuICAgICAgICAvLyAgICAgICAgIC8vY2hlY2sgJ0NhY2hlIFN0b3JhZ2UnIGFnYWluc3QgbGlzdCBvZiBjYWNoZWQgd29yZHMgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAvLyAgICAgICAgIC8vY29uc29sZSBvdXRwdXQgYW55IGNhY2hlIHN0b3JhZ2UgbWF0Y2hcbiAgICAgICAgLy8gICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgY2FjaGVTdG9yYWdlID0gYXdhaXQgY2FjaGVzLm9wZW4oY2FjaGUuY2FjaGVOYW1lKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZShjYWNoZVN0b3JhZ2UubWF0Y2goY2FjaGUud29yZFVSTCkpOy8vZXhlY3V0b3IgZnVuY3Rpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgcmVqZWN0KFwiRXJyb3IsIGNvdWxkIG5vdCByZXNvbHZlLlwiKTtcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmV0dXJuUHJvbWlzZVZhbHVlO1xuICAgICAgICAvLyAgICAgICAgICgoKSA9PiB7IC8vY29uc3VtaW5nIGZ1bmN0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVyblByb21pc2VWYWx1ZSA9IHByb21pc2UudGhlbihcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkUmVzdWx0OiBzdHJpbmcgPSA8c3RyaW5nPnJlc3VsdDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcnNlZFJlc3VsdCBpczogXCIsIHBhcnNlZFJlc3VsdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFJlc3VsdH0sXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgKVxuICAgICAgICAvLyAgICAgICAgIH0pKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gcmV0dXJuIHdvcmRjYWNoZXM7XG4gICAgfVxuICAgIC8vIGRpc3BsYXlDYWNoZWRXb3JkcygpIHtcbiAgICAvLyAgICAgLy9jYWNoZXNcbiAgICAvLyAgICAgfVxufVxuXG5pbnRlcmZhY2UgU2NoV29yZFNjaEJ1dHRvbkRpY0VsZW0ge1xuICAgIHNlYXJjaFdvcmQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgd29yZFNlYXJjaDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZGljdGlvbmFyeUVsZW06IEhUTUxFbGVtZW50O1xuICAgIGVycm9yRWxlbTogSFRNTFNwYW5FbGVtZW50O1xuICAgIHByZXZpb3VzV29yZEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVmcmVzaEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBjYWNoZXMge1xuICAgIGluQ2FjaGU6IGJvb2xlYW4sXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVUkw6IFVSTCxcbiAgICBjYWNoZU5hbWU6IHN0cmluZyxcbn1cblxubGV0IHdvcmRTZWFyY2hlcyA9IG5ldyBEaWN0aW9uYXJ5KCk7XG4vL2xldCB3b3JkY2FjaGVzOiBjYWNoZXNbXSA9IFtdOyAvL2ZpbGxpbmcgZm9yIHByaXZhdGUgc3RhdGljIG1lbWJlciB3aGljaCBoYXMgZXJyb3JzIG1hcHBpbmdcblxuY29uc3QgZGljdGlvbmFyeVdpZGdldCA9IHtcbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuICAgICAgICB2YXIgdHdvZWxlbWVudHMgPSBkaWN0aW9uYXJ5V2lkZ2V0LmJ1aWxkRGljdGlvbmFyeVRlcm1TZWN0aW9uLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXQoZWxlbSk7XG4gICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24uYWRkV29yZFNlYXJjaEV2ZW50cyh0d29lbGVtZW50cyk7XG4gICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24uY2hlY2tDYWNoZVN0b3JhZ2UoKTtcbiAgICB9LFxuICAgIHJlcXVlc3REaWN0aW9uYXJ5VGVybToge1xuICAgICAgICAvLyBBUEkgZmV0Y2ggcmVxdWVzdCB0aGUgZGF0YSBmcm9tIGRpY3Rpb25hcnkgYXBpOlxuICAgICAgICByZXF1ZXN0VXJsOiBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiLFxuICAgICAgICBcbiAgICAgICAgZmV0Y2hEaWN0aW9uYXJ5VGVybTogKHdvcmQ6c3RyaW5nLCB3b3JkVXJsOiBVUkwsIGVsZW06IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtLCBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGNhbGxzIHRvIGVpdGhlciBzdG9yZSBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgICAvLyBJZiBpdGVtcyBhcmUgdG8gYmUgY2FjaGVkLCBlZGl0IExvY2FsIFN0b3JhZ2UgY2FjaGUgbmFtZXNcbiAgICAgICAgICAgIC8vVE9ETzogZGljdGlvbmFyeSBmZXRjaCBhcGk6XG4gICAgICAgICAgICAvL1RPRE86IDEuKSBpcyB0byBiZSBjYWNoZWQgdHJ1ZT8gLS1jaGVja1xuICAgICAgICAgICAgLy9UT0RPOiAyLikgaXMgdG8gYmUgY2FjaGVkIGZhbHNlPyAtLWNoZWNrXG4gICAgICAgICAgICAvL1RPRE86IC0tPiBhcmUgdGhleSB0aGUgc2FtZSBiZWhhdmlvcj8gLS1jaGVja1xuICAgICAgICAgICAgLy9UT0RPOiAtLT4gaXMgdGhlIHJlc3VsdCBpbiB0aGUgY2FjaGU/IC0tY2hlY2tcbiAgICAgICAgICAgIC8vVE9ETzogc2VuZCB0byBjYWNoZSB0cnVlIG9wdGlvbiBhbGxvd3MgZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICBsZXQgd29yZENhY2hlU3RvcmU6IGFueSA9IFtdO1xuICAgICAgICAgICAgbGV0IHdvcmRjYWNoZTogY2FjaGVzID0ge1xuICAgICAgICAgICAgICAgIGluQ2FjaGU6IHNlbmRUb0NhY2hlLFxuICAgICAgICAgICAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICAgICAgICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWU6IHNlbmRUb0NhY2hlID8gY2FjaGVOYW1lIDogXCJcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdvcmRDYWNoZVN0b3JlLnB1c2god29yZGNhY2hlKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgICAgIGNvbnN0IHNldENhY2hlSXRlbSA9IChzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sIHdvcmRBcnJheTphbnlbXSwgKSA9PntcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmQtY2FjaGVzJykgPT0gbnVsbCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvY2FsIHN0b3JhZ2UgZW1wdHkgPT4gYWRkIHRoZSB3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29yZC1jYWNoZXMnLCBKU09OLnN0cmluZ2lmeSh3b3JkQ2FjaGVTdG9yZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gY3VycmVudCAnd29yZC1jYWNoZXMnIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmQtY2FjaGVzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbGxjYWNoZTogY2FjaGVzW10gPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gd29yZGNhY2hlLndvcmRVUkwpeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdvcmQgaXMgYWxyZWFkeSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBuZWVkIHRvIGFkZCBpdCB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB3b3JkIHRvIGV4aXN0aW5nICd3b3JkLWNhY2hlcycgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbGNhY2hlLnB1c2god29yZGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29yZC1jYWNoZXMnLCBKU09OLnN0cmluZ2lmeShhbGxjYWNoZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHdvcmRGZXRjaFJlcXVlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9zZXQgYXBpR0VUIHNlbmRUb0Jyb3dzZXJDYWNoZSB0byB0cnVlIHRvIHVzZSBjYWNoZSBzdG9yYWdlXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVCh3b3JkY2FjaGUud29yZFVSTCwgZmFsc2UsIHdvcmRjYWNoZS5jYWNoZU5hbWUsIGVsZW0uZXJyb3JFbGVtKVxuXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3b3JkRmV0Y2guYXBpR0VUKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgJ3RpdGxlJykpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbm9EZWZpbml0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkICYmICFub0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cChkYXRhLCBlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENhY2hlSXRlbSh3b3JkRmV0Y2guZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCksIHdvcmRDYWNoZVN0b3JlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy0tPiA0MDQgZnJvbSBmZXRjaCByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb246IHtcbiAgICAgICAgY3JlYXRlRGljdGlvbmFyeVdpZGdldDogKGVsZW06IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHsgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnkuaWQgPSBcImRpY3Rpb25hcnlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFydEggPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NyZWF0ZSBkaWN0aW9uYXJ5IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzV29yZHMgPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hGb3JtLmlkID0gXCJkaWN0aW9uYXJ5LXNlYXJjaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV29yZHMuY2xhc3NMaXN0LmFkZChcInByZXZpb3VzV29yZHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VhcmNoV29yZHM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmQ6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlFbGVtOiA8SFRNTEVsZW1lbnQ+ZGljdGlvbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckVsZW06IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsICdTZWFyY2guLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoV29yZHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc2VhcmNoXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoV29yZHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkZXRlcm1pbmVkIGRpY3Rpb25hcnkgZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrQ2FjaGVTdG9yYWdlOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBnYXRoZXIgbG9jYWwgc3RvcmFnZSB3b3JkIHdpdGggZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpXG4gICAgICAgICAgICBEaWN0aW9uYXJ5LmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgd29yZFZhbGlkYXRpb246IChpbnR4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgdHJpbW1lZCA9IGludHh0LnRyaW0oKTtcbiAgICAgICAgICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICAgICAgICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy93b3JkIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHdvcmQuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3b3JkU2VhcmNoVXBkYXRlOiAoc2VhcmNoRWxlbXM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWNjZXB0ZWRJbnB1dFdvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24ud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSlcbiAgICAgICAgICAgICAgICA/IGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSA6IGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoYWNjZXB0ZWRJbnB1dFdvcmQpIHtcbiAgICAgICAgICAgICAgICB3b3JkU2VhcmNoZXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBkaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3REaWN0aW9uYXJ5VGVybS5yZXF1ZXN0VXJsKTtcblxuICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQucmVxdWVzdERpY3Rpb25hcnlUZXJtLmZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSwgd29yZFNlYXJjaGVzLndvcmRVUkwsIHNlYXJjaEVsZW1zLCBmYWxzZSwgXCJcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSAnJztcbiAgICAgICAgfSxcbiAgICAgICAgYWRkV29yZFNlYXJjaEV2ZW50czogKHNlYXJjaEVsZW1zOiBTY2hXb3JkU2NoQnV0dG9uRGljRWxlbSB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNlYXJjaEVsZW1zID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQSBzZWFyY2ggZWxlbWVudCBpcyB1bmRlZmluZWQgZnJvbSBzZWFyY2hXb3JkIHwgd29yZFNlYXJjaFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0FkZCBmb3JtIGlucHV0IGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgLy9VcG9uIGlucHV0IGVudHJ5LCBmaXJlIEFQSSBmZXRjaFxuICAgICAgICAgICAgc2VhcmNoRWxlbXMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmJ1aWxkRGljdGlvbmFyeVRlcm1TZWN0aW9uLndvcmRTZWFyY2hVcGRhdGUoc2VhcmNoRWxlbXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24ud29yZFNlYXJjaFVwZGF0ZShzZWFyY2hFbGVtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIFwiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgICAgICAgICAvLyBDbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnByZXZpb3VzV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0J1dHRvbkNvbnRhaW5lcjogRWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAoIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPT0gZmFsc2UgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9PSBmYWxzZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0aW9uIGFuZCB3b3JkIGNhY2hlcyBmb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VtZW50bG9jYXRpb25ob2xkZXIgIT0gdW5kZWZpbmVkICYmIERpY3Rpb25hcnkud29yZENhY2hlcyAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgRGljdGlvbmFyeS53b3JkQ2FjaGVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImRpY3Rpb25hcnktd29yZC1idG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gd29yZENhY2hlLndvcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3REaWN0aW9uYXJ5VGVybS5mZXRjaERpY3Rpb25hcnlUZXJtKHdvcmRDYWNoZS53b3JkLCB3b3JkQ2FjaGUud29yZFVSTCwgc2VhcmNoRWxlbXMsIGZhbHNlLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5yZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwOiAod29yZERhdGE6IGFueSwgc2VhcmNoRWxlbXM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lciA9IHNlYXJjaEVsZW1zLmRpY3Rpb25hcnlFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTtcblxuICAgICAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XG4gICAgICAgICAgICAvL0FkZCB0aGUgd29yZCBhbmQgZXhhbXBsZXMgdG8gcGFnZVxuICAgICAgICAgICAgd29yZC5tZWFuaW5ncy5tYXAoKHdvcmRUeXBlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiV29yZFR5cGUgYXJlOiBcIiwgd29yZFR5cGUpXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgICAgICAgICAgd29yZFR5cGVILnRleHRDb250ZW50ID0gd29yZFR5cGUucGFydE9mU3BlZWNoO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICAgICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29yZFR5cGVEZWZJdGVtID0gd29yZFR5cGVMaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJ3b3JkRGVmaW5pdGlvblwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiV2hhdCBhcmUgYWxsIHRoZSBzZWxlY3Rpb25zOiBcIiwgZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdQIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BpLnRleHRDb250ZW50ID0gZGVmLmV4YW1wbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlZmluaXRpb24gZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gICAgICAgIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkaWN0aW9uYXJ5V2lkZ2V0O1xuIiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuLy8gQ3JlYXRlIGEgY2xhc3MgZm9yIHRoZSBlbGVtZW50XG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nTGlzdCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBzZWxmID0gc3VwZXIoKTtcblxuICAgICAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgICAgICAvLyBsaSBlbGVtZW50cyBjYW4gYmUgY29udGFpbmVycyBpZiB0aGV5IGhhdmUgdWxzIHdpdGhpbiB0aGVtXG4gICAgICAgIGNvbnN0IHVscyA9IEFycmF5LmZyb20oc2VsZi5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpKTtcbiAgICAgICAgY29uc3QgbGlzID0gQXJyYXkuZnJvbShzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuXG4gICAgICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgICAgICAvLyBUaGVzZSBsaXN0cyB3aWxsIGJlIHNob3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgaGlnaGVyIGxldmVsIGNvbnRhaW5lclxuICAgICAgICB1bHMuZm9yRWFjaCh1bCA9PiB7XG4gICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb29rIHRocm91Z2ggZWFjaCBsaSBlbGVtZW50IGluIHRoZSB1bFxuICAgICAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLy8gdG8gc2hvdyBhbiBvcGVuIG9yIGNsb3NlZCBpY29uXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGhlIGxpIGVsZW1lbnQncyB0ZXh0IGluIGEgbmV3IHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhc3NpZ24gc3R5bGUgYW5kIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzcGFuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0ZXh0IGZyb20gbGkgdG8gc3Bhbiwgc2V0IGN1cnNvciBzdHlsZVxuICAgICAgICAgICAgICAgIG5ld1NwYW4udGV4dENvbnRlbnQgPSBjaGlsZFRleHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgICAgICAgICBuZXdTcGFuLm9uY2xpY2sgPSBzZWxmLnNob3d1bDtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3BhbiBhbmQgcmVtb3ZlIHRoZSBiYXJlIHRleHQgbm9kZSBmcm9tIHRoZSBsaVxuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTcGFuLCBjaGlsZFRleHQpO1xuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxpIGNsaWNrIGhhbmRsZXJcbiAgICBzaG93dWwgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4vTGlua0RldGFpbHMnO1xuXG4vL0hlYWRlciBuYXZpZ2F0aW9uIGxpbmtzXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkluZGV4XCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJpbmRleC5odG1sXCJcbik7XG5cbmNvbnN0IHBhZ2VzTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcInBhZ2VzLmh0bWxcIlxuKVxuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGlua107XG5cbmNvbnN0IEhFQURFUkZPT1RFUiA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICBsZXQgc2l0ZUhlYWRlcjogRWxlbWVudCB8IG51bGw7XG4gICAgICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCApe1xuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBwYWdlTWFpbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZEhlYWRlciggcGFnZU1haW4gKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGVIZWFkZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5wcmVwZW5kKEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBiZWZvcmUgJ21haW4nIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZEhlYWRlciggbnVsbCApKTtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZUhlYWRlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLnByZXBlbmQoSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGFmdGVyICdib2R5JyBlbGVtZW50LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRIZWFkZXI6IChtYWluOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGNvbnN0IEgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkgxXCIpO1xuICAgICAgICAgICAgSDEudGV4dENvbnRlbnQgPSAnPFJhbmRvbSBXZWIgQml0cz4nOyAvL0gxIExvZ29cbiAgICAgICAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXIuYXBwZW5kKEgxKTtcblxuICAgICAgICAgICAgaWYgKG1haW4gIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgbWFpbi5wcmVwZW5kKHNpdGVIZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChzaXRlSGVhZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlSGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZE5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdkZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpKTtcblxuICAgICAgICAgICAgTkFWSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncmhvd2VsbDQ3Ni5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgL1JhbmRvbVdlYkJpdHMvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnByZXBlbmQobmF2TGlzdExpbmtzKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhFQURFUkZPT1RFUi5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kKEhFQURFUkZPT1RFUi5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGZvb3RlclBhcmEudGV4dENvbnRlbnQgPSBgXFx1MDBBOSAyMDIyIFJhbmRvbSBXZWJCaXRzLiBBbGwgUmlnaHRzIFJlc2VydmVkLmA7XG4gICAgICAgICAgICBzaXRlRm9vdGVyLmFwcGVuZChmb290ZXJQYXJhKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy9GYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0dHJpYnV0aW9uXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLmhyZWYgPSAnaHR0cHM6Ly93d3cudmVjdG9yc3RvY2suY29tL3JveWFsdHktZnJlZS12ZWN0b3IvbWFpbnRlbmFuY2UtaWNvbi1mb3ItZ3JhcGhpYy1hbmQtd2ViLWRlc2lnbi12ZWN0b3ItNDUwMjY3NTUnXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJJY29uSG9tZTogIzQ1MDI2NzU1XCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBcIl9ibGFua1wiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gJ1ZlY3RvclN0b2NrLmNvbSc7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhFQURFUkZPT1RFUjsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmludGVyZmFjZSBUb0RvICB7XG4gICAgVG9Eb0l0ZW06IHN0cmluZztcbn1cblxuY29uc3QgdG9kb3NXaWRnZXQgPSB7XG4gICAgaW5pdDogKGVsZW06IEVsZW1lbnQpID0+IHtcbiAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAgICB9LFxuICAgIHRvRG9zTGlzdFNlY3Rpb246IHtcbiAgICAgICAgVG9ET3M6IDAsXG5cbiAgICAgICAgY3JlYXRlU2FtcGxlVG9fRG86ICh0Ym9keTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkMklOID0gdGQybGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgICAgICB0ZDJJTi50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDaGVja2JveFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MrKztcbiAgICAgICAgICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIlxuICAgICAgICAgICAgICAgIGNvbnN0IHRkMnJpZ2h0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG5cbiAgICAgICAgICAgICAgICAvL1wiZGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICB0ZDJERUwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5EZWxldGVCdXR0b24odGQyREVMKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgQWRkVG9EbzogKGRlc2NyaXB0aW9uOiBzdHJpbmcsIGZpcnN0UGFpbnQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIC8vYWZ0ZXIgXCJBZGRcIiBpcyBjbGlja2VkLCBpbnNlcnQgbmV3IHRhYmxlIHJvd1xuICAgICAgICAgICAgY29uc3QgVEFCTEVJVEVNID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RvRG9JdGVtcycpO1xuICAgICAgICAgICAgaWYgKFRBQkxFSVRFTSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tCT1ggPSBmaXJzdENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTsgLy9BZGQgY2hlY2tib3hcbiAgICAgICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2hlY2tib3gnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgICAgICAgICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uLnRvU3RyaW5nKCk7IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICAgICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLlRvRE9zID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjVG9ETyB0ZFtudW1dJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSkoKSA6ICgxKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLlRvRE9zKys7IC8vTnVtYmVyIG9mIEl0ZW1zXG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxCT1ggPSBzZWNvbmRDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSkgLy9BZGQgZGVsZXRlYm94XG4gICAgICAgICAgICAgICAgZGVsQk9YLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcbiAgICAgICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgICAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgICAgICAgICAgICAgLy9cImRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uRGVsZXRlQnV0dG9uKGRlbEJPWCk7IH0pO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vYWRkIHRvIGxpc3Qgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0RvTGlzdFN0b3JhZ2UuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgd2VyZSBubyAnVG9Eb0l0ZW1zJyBmb3VuZCBvciB0aGV5IGFyZSBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBEZWxldGVCdXR0b246IChib3g6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChib3gucGFyZW50Tm9kZSAhPSBudWxsICYmIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgcm93Q2hrQnggPSA8SFRNTEVsZW1lbnQ+Ym94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgICAgICBsZXQgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PiByb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUnKTtcbiAgICAgICAgICAgICAgICBpZih0YWJsZSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSB0ci5yb3dJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5kZWxldGVSb3coaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSAnQWRkIGEgVG9ETyBJdGVtLicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBhc3NvY2lhdGVkIHN0b3JhZ2UgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9MaXN0U3RvcmFnZS5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb25lLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YWJsZScgZWxlbWVudCBub3QgZm91bmQgb3IgaXQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRvRG9FdmVudExpc3RlbmVyczogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgQUREQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgQURESVRFTUVOVEVSOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIml0ZW1JTlBVVFwiXScpITtcbiAgICAgICAgICAgIGlmKEFEREJVVFRPTiAhPSBudWxsICYmIEFERElURU1FTlRFUiAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBBRERCVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5BZGRUb0RvKEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZS5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uQWRkVG9EbyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3B1bGF0ZVRvRG9MaXN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvL3JldHJpZXZlIFN0b3JhZ2UsIGFkZCBpZiBtaXNzaW5nXG4gICAgICAgICAgICBsZXQgc3RvcmFnZVRvRG9zID0gdG9kb3NXaWRnZXQudG9Eb0xpc3RTdG9yYWdlLmdldEFsbHRvRG9Gcm9tU3RvcmFnZSgpO1xuICAgICAgICAgICAgaWYgKHN0b3JhZ2VUb0Rvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yYWdlVG9Eb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5BZGRUb0RvKHN0b3JhZ2VUb0Rvc1tpXS5Ub0RvSXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlVG9Eb0xpc3RXaWRnZXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbSAhPT0gdW5kZWZpbmVkKSB7IC8vaW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9kaXN0L2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvLURvOlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhsZWZ0LnRleHRDb250ZW50ID0gXCJDb21wbGV0ZT9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aG1pZGRsZSA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLmNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcIlZhbHVlXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiaXRlbUlOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24ucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjVG9Eb0l0ZW1zXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInVG9Eb0l0ZW1zJyBlbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSBpcyBubyBcIlRvRG9MaXN0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvRG9MaXN0U3RvcmFnZToge1xuICAgICAgICBnZXRBbGx0b0RvRnJvbVN0b3JhZ2U6ICgpID0+IHsgLy9UT0RPOiBnbG9iYWwgdXNhZ2VcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMgPyBKU09OLnBhcnNlKHZhbHVlcykgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkdG9Eb1RvU3RvcmFnZTogKGRlc2NyaXB0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFRvRG86IFRvRG8gPSAge1xuICAgICAgICAgICAgICAgIFRvRG9JdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vYWRkIHRoZSBUb0RvcyB0byBsb2NhbCBjYWNoZVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG9kb3M6IFRvRG9bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0b2Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VTdHIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbCBzdG9yYWdlIHZhbHVlcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBzdG9yaW5nIFRvLWRvIGxpc3QgaXRlbTogXCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZXRvRG9Gcm9tU3RvcmFnZTogKGl0ZW06IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9kb3M6IFRvRG9bXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICAgICAgdG9kb3MgPSB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uVG9Eb0l0ZW0gIT09IGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9zV2lkZ2V0O1xuIiwiaW1wb3J0IHsgRXhwYW5kaW5nTGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvZXhwYW5kaW5nTGlzdFwiO1xuXG5jb25zdCBleHBhbmRpbmdMaXN0ID0ge1xuICAgIGluaXQ6KCkgPT4ge1xuICAgICAgICAvLyBEZWZpbmUgdGhlIG5ldyBlbGVtZW50XG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZXhwYW5kaW5nLWxpc3QnLCBFeHBhbmRpbmdMaXN0LCB7IGV4dGVuZHM6ICd1bCcgfSk7XG5cbiAgICAgICAgLy8gQWRkIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGkgdGhhdCBjYW4gZXhwYW5kIGZ1cnRoZXJcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbmApO1xuXG4gICAgICAgIGZvciAobGV0IGxpIG9mIGV4cGFuZGFibGVMaXMpe1xuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCd0aXRsZScsICdDbGljayB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwYW5kaW5nTGlzdDsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgY2FyZHNXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL1dlYkJpdHMnXG5pbXBvcnQgZGljdGlvbmFyeVdpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvZGljdGlvbmFyeSc7XG5pbXBvcnQgdG9kb3NXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL3RvZG9zJztcbmltcG9ydCBIRUFERVJGT09URVIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcmZvb3Rlcic7XG5pbXBvcnQgZXhwYW5kaW5nTGlzdCBmcm9tICcuL2V4cGFuZGluZ0xpc3QnXG5cbigoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCAvLydJbmRleCcgYW5kICdQYWdlcycgcm91dGUsIGFkZCBjYXJkcyB3aWRnZXQgZmlyc3RcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMuaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzLmh0bWwnKSB7XG4gICAgICAgICAgICBjYXJkc1dpZGdldC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSBoZWFkZXIgYW5kIGZvb3RlclxuICAgICAgICBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICBpZiAoIFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMvZG9tLmh0bWwnKXtcbiAgICAgICAgICAgICAgICBleHBhbmRpbmdMaXN0LmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpY3Rpb25hcnlXaWRnZXRcIik7XG4gICAgICAgIGlmIChkaWN0aW9uYXJ5RWxlbWVudClcbiAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuaW5pdChkaWN0aW9uYXJ5RWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xuICAgICAgICBpZiAodG9Eb3NFbGVtZW50ICE9IG51bGwpXG4gICAgICAgICAgICB0b2Rvc1dpZGdldC5pbml0KHRvRG9zRWxlbWVudCk7XG4gICAgfSlcblxufSkoKTsiXX0=

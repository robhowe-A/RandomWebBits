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
const WebBit_1 = require("./WebBit");
// Create new AA (Arbitrary Article)
const ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup"), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example"), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate"), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo"), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon"), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction"), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo"), new WebBit_1.default("IP Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon"), new WebBit_1.default("HTML Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon"), new WebBit_1.default("Network Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon"), new WebBit_1.default("PowerShell Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon"), new WebBit_1.default("LEARN: DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard"), new WebBit_1.default("LEARN: Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon"), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon"));
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
                if (data != undefined && !noDefinitions) {
                    dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
                    setCacheItem(wordFetch.getSendToBrowserCache(), wordCacheStore);
                }
                else {
                    if (navigator.onLine !== false) {
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
                    else {
                        elem.errorElem.innerText += ", check network connection.";
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
//--Copyright (c) Robert A. Howell
const expandingList_1 = require("./components/expandingList");
const expandingList = {
    init: () => {
        // Define the new element
        customElements.define('expanding-list', expandingList_1.ExpandingList, { extends: 'ul' });
        // Add title attribute to all li that can expand further
        const expandableLiOpenOpen = document.querySelectorAll(`ul[is="expanding-list"] li span:first-child`);
        const expandableLiCloseSpan = document.querySelectorAll(`ul[is="expanding-list"] li span:nth-child(3)`);
        for (let li of expandableLiOpenOpen) {
            li.setAttribute('title', 'Select to expand...');
            li.addEventListener('click', (e) => {
                e.preventDefault();
                li.getAttribute('title') == 'Select to expand...' ? (() => {
                    li.setAttribute('title', 'Select to close...');
                    if (li.nextElementSibling.nextElementSibling == null)
                        return;
                    li.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to close.');
                })()
                    : (() => {
                        li.setAttribute('title', 'Select to expand...');
                        if (li.nextElementSibling.nextElementSibling == null)
                            return;
                        li.nextElementSibling.nextElementSibling.setAttribute('title', 'Select opening element tag to expand.');
                    })();
            });
            li.setAttribute('tabindex', '0');
        }
        for (let li of expandableLiCloseSpan) {
            li.setAttribute('title', 'Select opening element tag to expand.');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvY29tcG9uZW50cy9MaW5rRGV0YWlscy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdC50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvY29tcG9uZW50cy9hcGkudHMiLCJzcmMvY29tcG9uZW50cy9kYXRhLnRzIiwic3JjL2NvbXBvbmVudHMvZGF0YV9BdHRyaWJ1dGlvbkxpbmtzLnRzIiwic3JjL2NvbXBvbmVudHMvZGljdGlvbmFyeS50cyIsInNyYy9jb21wb25lbnRzL2V4cGFuZGluZ0xpc3QudHMiLCJzcmMvY29tcG9uZW50cy9oZWFkZXJmb290ZXIudHMiLCJzcmMvY29tcG9uZW50cy90b2Rvcy50cyIsInNyYy9leHBhbmRpbmdMaXN0LnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLGtDQUFrQztBQUNsQywrQ0FBd0M7QUFFeEMsdUNBQXVDO0FBQ3ZDLE1BQU0sZUFBZ0IsU0FBUSxxQkFBVztJQUNyQyxjQUFjLENBQVM7SUFDdkIsU0FBUyxDQUFTO0lBRWxCLFlBQ0ksS0FBYSxFQUNiLFNBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLGNBQXNCLEVBQ3RCLFFBQWdCLEVBQ2hCLFNBQWlCO1FBR2pCLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxlQUFlLENBQUM7Ozs7QUN2Qi9CLGtDQUFrQzs7QUFFbEMsTUFBTSxXQUFXO0lBQ2IsS0FBSyxDQUFTO0lBQ2QsU0FBUyxDQUFTO0lBQ2xCLFFBQVEsQ0FBUztJQUNqQixV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Y2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gXCIuL0xpbmtEZXRhaWxzXCI7XG5cbi8vSWNvbiBsaW5rcyB1c2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxuY2xhc3MgQXR0cmlidXRpb25MaW5rIGV4dGVuZHMgTGlua0RldGFpbHMge1xuICAgIGF0dHJpYnV0ZW93bmVyOiBzdHJpbmc7XG4gICAgYXJ0aWNsZWlkOiBudW1iZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgIGlubmVyVGV4dDogc3RyaW5nLFxuICAgICAgICBoUmVmZXJlbmNlOiBzdHJpbmcsXG4gICAgICAgIGF0dHJpYnV0ZW93bmVyOiBzdHJpbmcsXG4gICAgICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgICAgIGFydGljbGVpZDogbnVtYmVyXG4gICAgICAgIFxuICAgICAgICApIHtcbiAgICAgICAgc3VwZXIodGl0bGUsIGlubmVyVGV4dCwgcGFnZU5hbWUsIGhSZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZW93bmVyID0gYXR0cmlidXRlb3duZXI7XG4gICAgICAgIHRoaXMuYXJ0aWNsZWlkID0gYXJ0aWNsZWlkO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRpb25MaW5rOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcblxuY2xhc3MgTGlua0RldGFpbHMge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgaW5uZXJUZXh0OiBzdHJpbmc7XG4gICAgcGFnZU5hbWU6IHN0cmluZztcbiAgICBoUmVmZXJlbmNlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZTogc3RyaW5nLCBpbm5lclRleHQ6IHN0cmluZywgcGFnZU5hbWU6IHN0cmluZywgaFJlZmVyZW5jZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBpbm5lclRleHQsXG4gICAgICAgIHRoaXMucGFnZU5hbWUgPSBwYWdlTmFtZSxcbiAgICAgICAgdGhpcy5oUmVmZXJlbmNlID0gaFJlZmVyZW5jZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua0RldGFpbHM7IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuY2xhc3MgV2ViQml0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGFydGljbGVOdW1iZXI6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBkYXRlQ3JlYXRlZDogRGF0ZTtcbiAgICBhcnRpY2xlTGluazogc3RyaW5nO1xuICAgIGNhcmRJbWFnZTogc3RyaW5nO1xuICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFydGljbGVOdW1iZXI6IG51bWJlcixcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICAgICBkYXRlQ3JlYXRlZDogRGF0ZSxcbiAgICAgICAgYXJ0aWNsZUxpbms6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcnRpY2xlTnVtYmVyID0gYXJ0aWNsZU51bWJlcjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmRhdGVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQ7XG4gICAgICAgIHRoaXMuYXJ0aWNsZUxpbmsgPSBhcnRpY2xlTGluaztcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2UgPSBjYXJkSW1hZ2U7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlQUxUID0gY2FyZEltYWdlQUxUXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJCaXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi9BdHRyaWJ1dGlvbkxpbmtcIjtcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4vV2ViQml0XCI7XG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBBVFRSSUJVVElPTkxJTktEQVRBIGZyb20gXCIuL2RhdGFfQXR0cmlidXRpb25MaW5rc1wiO1xuXG5jb25zdCBjYXJkc1dpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzOiBhbnkgPSBbXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRBcnRpY2xlQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpLCBBVFRSSUJVVElPTkxJTktEQVRBKSxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSwgQVRUUklCVVRJT05MSU5LREFUQSksXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZFNlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIpISxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZFNlY3Rpb24oXCJHdWlkZSBTaG9ydHM6XCIpISxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZFNlY3Rpb24oXCJFeGxvcmUgdGhlIFdlYjpcIikhLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vUm91dGUgQ2hlY2tzIC0+IEFkZCB3aWRnZXQgYW5kIGZvcm1hdCBtdWx0aXBsZSBwYWdlc1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uYXJyXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKDAsIG51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzBdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1swXSwgMyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIC8vZnJvbSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXMuc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNTZWN0aW9uW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGRDYXJkU2VjdGlvbjogKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAvL0NyZWF0ZSBBcnRpYnJhcnkgQXJ0aWNsZXMgc2VjdGlvbiBlbGVtZW50IGFuZCBhcHBlbmQgdG8gTWFpblxuICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKXtcbiAgICAgICAgICAgIGNvbnN0IEFBU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc1wiKTtcblxuICAgICAgICAgICAgLy9DcmVhdGUgY2FyZCBzZWN0aW9uIGhlYWRpbmcgYW5kIGRpdiBlbGVtZW50LiBBcHBlbmQgdG8gc2VjdGlvblxuICAgICAgICAgICAgbGV0IGFhSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7bmFtZX1gO1xuICAgICAgICAgICAgbGV0IGFhQ2FyZHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXJkX2NvbHVtbnMnKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhQ2FyZHNTZWN0aW9uKTtcbiAgICAgICAgICAgIHBhZ2VNYWluLmFwcGVuZChBQVNlY3Rpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gYWFDYXJkc1NlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1haW4gZWxlbWVudCBleGlzdHMgb24gdGhlIHBhZ2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcbiAgICBidWlsZEFydGljbGVDYXJkczogKGNhcmRzRGF0YTogYW55LCBhdHRybGlua3M6IEF0dHJpYnV0aW9uTGlua1tdKSA9PiB7XG4gICAgICAgIC8vTWFwIFdlYkJpdHMgdG8gYSBjYXJkLCBlYWNoXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgICAgICBsZXQgY2FyZEltZ1RvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbGV0IGNhcmRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGNhcmRJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBhcnRpY2xlLmNhcmRJbWFnZSk7XG4gICAgICAgICAgICBjYXJkSW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYXJ0aWNsZS5jYXJkSW1hZ2VBTFQpO1xuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIpO1xuICAgICAgICAgICAgY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChjYXJkSW1nKTtcbiAgICAgICAgICAgIGxldCBjYXJkQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5SGVhZGluZyk7XG4gICAgICAgICAgICBjYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcbiAgICAgICAgICAgIGNhcmRCb2R5SGVhZGluZy5pbm5lclRleHQgPSBhcnRpY2xlLm5hbWU7XG4gICAgICAgICAgICBhdHRybGlua3MubWFwKChsaW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9EZXRlcm1pbmUgaWYgY2FyZCBpbWFnZSBuZWVkcyBhdHRyaWJ1dGlvbiBwYW5lbFxuICAgICAgICAgICAgICAgIGlmIChjYXJkSW1nLmdldEF0dHJpYnV0ZSgnQXJ0aWNsZScpID09PSBsaW5rLmFydGljbGVpZC50b1N0cmluZygpKSB7IC8vbWF0Y2ggV2ViQml0IElEIHRvIEljb24gSURcbiAgICAgICAgICAgICAgICAgICAgY2FyZEltZ1RvcC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IGNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udCA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChjYXJkSW1nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNtYWxsSW1nID0gPEhUTUxJbWFnZUVsZW1lbnQ+Y2FyZEltZy5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzbWFsbEltZy5jbGFzc0xpc3QuYWRkKFwiaW1nU21hbGxcIiwgXCJpbWdQVFJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRCYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFja0hlYWRpbmcgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgICAgICAgICBiYWNrSGVhZGluZy50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlb3duZXI7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tQYXJhLnRleHRDb250ZW50ID0gbGluay5pbm5lclRleHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IGNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay5ocmVmID0gbGluay5oUmVmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlb3duZXI7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuY2xhc3NMaXN0LmFkZChcImF0dHJpYnV0ZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhcmRCb2R5UGFyYS50ZXh0Q29udGVudCA9IGFydGljbGUuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBjYXJkQm9keUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYXJ0aWNsZS5hcnRpY2xlTGluaylcbiAgICAgICAgICAgIGNhcmRCb2R5TGluay50ZXh0Q29udGVudCA9IFwiR28gdG8gUGFnZVwiO1xuXG4gICAgICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQoY2FyZEltZ1RvcCk7XG4gICAgICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQoY2FyZEJvZHkpO1xuXG4gICAgICAgICAgICByZXR1cm4gV2ViQml0O1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gQUFzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FyZHNXaWRnZXRcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gICAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGF0YUlzSW5DYWNoZTogYm9vbGVhbiA9IGZhbHNlOyAvL1RPRE86IGRhdGFpbmNhY2hlIG92ZXJhbGxcbiAgICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG4gICAgXG4gICAgY29uc3RydWN0b3IoR0VUVVJMOiBVUkwsIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiwgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nLCBlcnJvckVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IHNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICAgICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHRVRVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkdFVFVSTDtcbiAgICB9O1xuXG4gICAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCl7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChHRVRVUkwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IGAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgICAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpe1xuICAgICAgICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJ2NhY2hlcycgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4oKHRleHQpID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKCh0ZXh0KSA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKCAocmVzcG9uc2U6YW55KSAgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIlxuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcInBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVAgQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MIE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiXG4gICAgKSxcbik7XG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBBcHBsaWNhdGlvbiBUYWJcIixcbiAgICAgICAgXCJSZXZpZXcgc2l0ZSBkYXRhIHdoZW4gY2xlYXJpbmcgdGhlIGJyb3dzZXIgaGlzdG9yeVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIlxuICAgICksXG4pO1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIm5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiQ2hlY2sgb3V0IHNvbWUgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIlxuICAgICksXG4pO1xuXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cblxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG5cbmxldCBBVFRSSUJVVElPTkxJTktEQVRBID0gW1xuXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgXCJEb21haW4gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RvbWFpblwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAxXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJjb2RlIGljb25zXCIsXG4gICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgIDJcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zc2wtY2VydGlmaWNhdGVcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgIDRcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImFpIGljb25zXCIsXG4gICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvYWlcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICA4XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJwcm90b3R5cGUgaWNvbnNcIixcbiAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiUGFpbnQgM0RcIixcbiAgICA5XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kaWN0aW9uYXJ5XCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgIDEwXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsgKFxuICAgIFwiQk9JTkMgaWNvbnNcIixcbiAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgIFwiQk9JTkNcIixcbiAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgMTFcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcIklQIGljb25zXCIsXG4gICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgIDEyXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJodG1sIGljb25zXCIsXG4gICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgIDEzXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb250ZW50LXdyaXRpbmdcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgMTRcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcGFnZS1zcGVlZFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAxNVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlNNVFAgYW5kIEVtYWlsXCIsXG4gICAgMTZcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQgSWNvbnMgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgIDE3XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZ29vZ2xlLWV4cGVkaXRpb25zXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgMThcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJEZXZUb29sc1wiLFxuICAgIDE5XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJkbnMgaWNvbnNcIixcbiAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiTEVBUk46IEROU1wiLFxuICAgIDIwXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRGV2VG9vbHNUd29cIixcbiAgICAyMVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwicmFuayBpY29uc1wiLFxuICAgIFwiUmFuayBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsbWVldHVwIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgMjJcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRyZWUgaWNvbnNcIixcbiAgICBcIlRyZWUgaWNvbnMgY3JlYXRlZCBieSBqdXN0aWNvbiAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRE9NXCIsXG4gICAgMjNcbiAgICApXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBBVFRSSUJVVElPTkxJTktEQVRBOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuL2FwaVwiO1xuXG5jbGFzcyBEaWN0aW9uYXJ5IHtcbiAgICBwcml2YXRlIHN0YXRpYyBpc0V4aXN0aW5nQ2FjaGVpbkJyb3dzZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FjaGVkV29yZHNDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhdGljIGV4aXN0aW5nQ2FjaGVzOiBzdHJpbmdbXTtcbiAgICBwdWJsaWMgc3RhdGljIHdvcmRDYWNoZXM6IGNhY2hlc1tdO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIHByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgd29yZFVSTDogVVJMO1xuICAgIC8vcHJpdmF0ZSBzdGF0aWMgd29yZFVSTHM6IGFueVtdO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL25ldyBkaWN0aW9uYXJ5LiBubyBpbml0aWFsaXppbmcgZnVuY3Rpb25zIG5lZWRlZFxuICAgICAgICAvL3N0YXRpYyBjbGFzcyAtIG5lZWRzIHRvIHNob3cgb24gYnJvd3NlciBhbnkgY2FjaGVzIHRoYXQgZXhpc3RcbiAgICAgICAgLy9hbmQgdGhlaXIgbmFtZXNcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkge1xuICAgICAgICAvL2VudW1lcmF0ZSBhbGwgb2YgdGhlIGNhY2hlc1xuICAgICAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlXG5cbiAgICAgICAgLy9FbnVtZXJhdGUgbG9jYWwgc3RvcmFnZSAnd29yZC1jYWNoZXMnIGl0ZW1zXG4gICAgICAgIGxldCBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmQtY2FjaGVzJyk7XG4gICAgICAgIGlmIChzdG9yYWdlU3RyICE9IG51bGwpe1xuICAgICAgICAgICAgRGljdGlvbmFyeS53b3JkQ2FjaGVzID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgICAgIHJldHVybiBEaWN0aW9uYXJ5LndvcmRDYWNoZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy9nZXRDYWNoZVN0b3JhZ2UoKVxuICAgICAgICAvLyBmb3IgKGxldCBjYWNoZSBvZiB3b3JkY2FjaGVzKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiJ0NhY2hlIFN0b3JhZ2UnIG5hbWUgZm91bmQ6IFwiLCBjYWNoZS5jYWNoZU5hbWUpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmKHdvcmRjYWNoZXMubGVuZ3RoICE9IG51bGwpe1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgY2FjaGUgb2Ygd29yZGNhY2hlcykge1xuXG4gICAgICAgIC8vICAgICAgICAgLy9jaGVjayAnQ2FjaGUgU3RvcmFnZScgYWdhaW5zdCBsaXN0IG9mIGNhY2hlZCB3b3JkcyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlIG91dHB1dCBhbnkgY2FjaGUgc3RvcmFnZSBtYXRjaFxuICAgICAgICAvLyAgICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCBjYWNoZVN0b3JhZ2UgPSBhd2FpdCBjYWNoZXMub3BlbihjYWNoZS5jYWNoZU5hbWUpO1xuICAgICAgICAvLyAgICAgICAgICAgICByZXNvbHZlKGNhY2hlU3RvcmFnZS5tYXRjaChjYWNoZS53b3JkVVJMKSk7Ly9leGVjdXRvciBmdW5jdGlvblxuICAgICAgICAvLyAgICAgICAgICAgICByZWplY3QoXCJFcnJvciwgY291bGQgbm90IHJlc29sdmUuXCIpO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgIGxldCByZXR1cm5Qcm9taXNlVmFsdWU7XG4gICAgICAgIC8vICAgICAgICAgKCgpID0+IHsgLy9jb25zdW1pbmcgZnVuY3Rpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuUHJvbWlzZVZhbHVlID0gcHJvbWlzZS50aGVuKFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWRSZXN1bHQ6IHN0cmluZyA9IDxzdHJpbmc+cmVzdWx0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyc2VkUmVzdWx0IGlzOiBcIiwgcGFyc2VkUmVzdWx0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkUmVzdWx0fSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICApXG4gICAgICAgIC8vICAgICAgICAgfSkoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyByZXR1cm4gd29yZGNhY2hlcztcbiAgICB9XG4gICAgLy8gZGlzcGxheUNhY2hlZFdvcmRzKCkge1xuICAgIC8vICAgICAvL2NhY2hlc1xuICAgIC8vICAgICB9XG59XG5cbmludGVyZmFjZSBTY2hXb3JkU2NoQnV0dG9uRGljRWxlbSB7XG4gICAgc2VhcmNoV29yZDogSFRNTElucHV0RWxlbWVudDtcbiAgICB3b3JkU2VhcmNoOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBkaWN0aW9uYXJ5RWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgZXJyb3JFbGVtOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJldmlvdXNXb3JkQnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICByZWZyZXNoQnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIGNhY2hlcyB7XG4gICAgaW5DYWNoZTogYm9vbGVhbixcbiAgICB3b3JkOiBzdHJpbmcsXG4gICAgd29yZFVSTDogVVJMLFxuICAgIGNhY2hlTmFtZTogc3RyaW5nLFxufVxuXG5sZXQgd29yZFNlYXJjaGVzID0gbmV3IERpY3Rpb25hcnkoKTtcbi8vbGV0IHdvcmRjYWNoZXM6IGNhY2hlc1tdID0gW107IC8vZmlsbGluZyBmb3IgcHJpdmF0ZSBzdGF0aWMgbWVtYmVyIHdoaWNoIGhhcyBlcnJvcnMgbWFwcGluZ1xuXG5jb25zdCBkaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIGluaXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG4gICAgICAgIHZhciB0d29lbGVtZW50cyA9IGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24uY3JlYXRlRGljdGlvbmFyeVdpZGdldChlbGVtKTtcbiAgICAgICAgZGljdGlvbmFyeVdpZGdldC5idWlsZERpY3Rpb25hcnlUZXJtU2VjdGlvbi5hZGRXb3JkU2VhcmNoRXZlbnRzKHR3b2VsZW1lbnRzKTtcbiAgICAgICAgZGljdGlvbmFyeVdpZGdldC5idWlsZERpY3Rpb25hcnlUZXJtU2VjdGlvbi5jaGVja0NhY2hlU3RvcmFnZSgpO1xuICAgIH0sXG4gICAgcmVxdWVzdERpY3Rpb25hcnlUZXJtOiB7XG4gICAgICAgIC8vIEFQSSBmZXRjaCByZXF1ZXN0IHRoZSBkYXRhIGZyb20gZGljdGlvbmFyeSBhcGk6XG4gICAgICAgIHJlcXVlc3RVcmw6IFwiaHR0cHM6Ly9hcGkuZGljdGlvbmFyeWFwaS5kZXYvYXBpL3YyL2VudHJpZXMvZW4vXCIsXG4gICAgICAgIFxuICAgICAgICBmZXRjaERpY3Rpb25hcnlUZXJtOiAod29yZDpzdHJpbmcsIHdvcmRVcmw6IFVSTCwgZWxlbTogU2NoV29yZFNjaEJ1dHRvbkRpY0VsZW0sIHNlbmRUb0NhY2hlOiBib29sZWFuLCBjYWNoZU5hbWU6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gY2FsbHMgdG8gZWl0aGVyIHN0b3JlIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICAgIC8vIElmIGl0ZW1zIGFyZSB0byBiZSBjYWNoZWQsIGVkaXQgTG9jYWwgU3RvcmFnZSBjYWNoZSBuYW1lc1xuICAgICAgICAgICAgLy9UT0RPOiBkaWN0aW9uYXJ5IGZldGNoIGFwaTpcbiAgICAgICAgICAgIC8vVE9ETzogMS4pIGlzIHRvIGJlIGNhY2hlZCB0cnVlPyAtLWNoZWNrXG4gICAgICAgICAgICAvL1RPRE86IDIuKSBpcyB0byBiZSBjYWNoZWQgZmFsc2U/IC0tY2hlY2tcbiAgICAgICAgICAgIC8vVE9ETzogLS0+IGFyZSB0aGV5IHRoZSBzYW1lIGJlaGF2aW9yPyAtLWNoZWNrXG4gICAgICAgICAgICAvL1RPRE86IC0tPiBpcyB0aGUgcmVzdWx0IGluIHRoZSBjYWNoZT8gLS1jaGVja1xuICAgICAgICAgICAgLy9UT0RPOiBzZW5kIHRvIGNhY2hlIHRydWUgb3B0aW9uIGFsbG93cyBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgIGxldCB3b3JkQ2FjaGVTdG9yZTogYW55ID0gW107XG4gICAgICAgICAgICBsZXQgd29yZGNhY2hlOiBjYWNoZXMgPSB7XG4gICAgICAgICAgICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICAgICAgICAgICAgd29yZDogd29yZCxcbiAgICAgICAgICAgICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd29yZENhY2hlU3RvcmUucHVzaCh3b3JkY2FjaGUpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZVxuICAgICAgICAgICAgY29uc3Qgc2V0Q2FjaGVJdGVtID0gKHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiwgd29yZEFycmF5OmFueVtdLCApID0+e1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29yZC1jYWNoZXMnKSA9PSBudWxsKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JkLWNhY2hlcycsIEpTT04uc3RyaW5naWZ5KHdvcmRDYWNoZVN0b3JlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgd29yZCB0byBjdXJyZW50ICd3b3JkLWNhY2hlcycgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29yZC1jYWNoZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSAnd29yZC1jYWNoZXMnIHZhbHVlcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFsbGNhY2hlOiBjYWNoZXNbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2FjaGUgb2YgYWxsY2FjaGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSB3b3JkY2FjaGUud29yZFVSTCl7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV29yZCBpcyBhbHJlYWR5IGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gYWRkIGl0IHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsY2FjaGUucHVzaCh3b3JkY2FjaGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JkLWNhY2hlcycsIEpTT04uc3RyaW5naWZ5KGFsbGNhY2hlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gc3RvcmluZyBUby1kbyBsaXN0IGl0ZW06IFwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAvL3NldCBhcGlHRVQgc2VuZFRvQnJvd3NlckNhY2hlIHRvIHRydWUgdG8gdXNlIGNhY2hlIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkRmV0Y2ggPSBuZXcgYXBpR0VUKHdvcmRjYWNoZS53b3JkVVJMLCBmYWxzZSwgd29yZGNhY2hlLmNhY2hlTmFtZSwgZWxlbS5lcnJvckVsZW0pXG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsICd0aXRsZScpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCAmJiAhbm9EZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDYWNoZUl0ZW0od29yZEZldGNoLmdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpLCB3b3JkQ2FjaGVTdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmF2aWdhdG9yLm9uTGluZSAhPT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0+IDQwNCBmcm9tIGZldGNoIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBidWlsZERpY3Rpb25hcnlUZXJtU2VjdGlvbjoge1xuICAgICAgICBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkgeyAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJkaWN0aW9uYXJ5V2lkZ2V0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlIGRpY3Rpb25hcnkgZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNXb3Jkcy5jbGFzc0xpc3QuYWRkKFwicHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWFyY2hXb3JkczogU2NoV29yZFNjaEJ1dHRvbkRpY0VsZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yRWxlbTogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNXb3JkQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLmlkID0gXCJzZWFyY2gtd29yZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLmlkID0gXCJ3b3JkLXNlYXJjaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJTZWFyY2hcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnByZXZpb3VzV29yZEJ0bi5pbm5lclRleHQgPSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMucmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hXb3JkcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSBpcyBubyBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tDYWNoZVN0b3JhZ2U6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGdhdGhlciBsb2NhbCBzdG9yYWdlIHdvcmQgd2l0aCBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKClcbiAgICAgICAgICAgIERpY3Rpb25hcnkuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgICAgICB9LFxuICAgICAgICB3b3JkVmFsaWRhdGlvbjogKGludHh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgICAgICAgICAgbGV0IGxldHRlcnNSRSA9IG5ldyBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpO1xuICAgICAgICAgICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdvcmRTZWFyY2hVcGRhdGU6IChzZWFyY2hFbGVtczogU2NoV29yZFNjaEJ1dHRvbkRpY0VsZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5idWlsZERpY3Rpb25hcnlUZXJtU2VjdGlvbi53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICAgICAgICAgID8gYWNjZXB0ZWRJbnB1dFdvcmQgPSB0cnVlIDogYWNjZXB0ZWRJbnB1dFdvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAgICAgICAgIHdvcmRTZWFyY2hlcy53b3JkVVJMID0gbmV3IFVSTChzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLnRvU3RyaW5nKCksIGRpY3Rpb25hcnlXaWRnZXQucmVxdWVzdERpY3Rpb25hcnlUZXJtLnJlcXVlc3RVcmwpO1xuXG4gICAgICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5yZXF1ZXN0RGljdGlvbmFyeVRlcm0uZmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCB3b3JkU2VhcmNoZXMud29yZFVSTCwgc2VhcmNoRWxlbXMsIGZhbHNlLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9ICcnO1xuICAgICAgICB9LFxuICAgICAgICBhZGRXb3JkU2VhcmNoRXZlbnRzOiAoc2VhcmNoRWxlbXM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoRWxlbXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy53b3JkU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24ud29yZFNlYXJjaFVwZGF0ZShzZWFyY2hFbGVtcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5idWlsZERpY3Rpb25hcnlUZXJtU2VjdGlvbi53b3JkU2VhcmNoVXBkYXRlKHNlYXJjaEVsZW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAgICAgICAgIC8vIENsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgICAgICAgICAgc2VhcmNoRWxlbXMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3QnV0dG9uQ29udGFpbmVyOiBFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmICggRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9PSBmYWxzZSApe1xuICAgICAgICAgICAgICAgICAgICBpZiggRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID09IGZhbHNlICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIgPSBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJyxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0J1dHRvbkNvbnRhaW5lci5pZCA9IFwiZGljdGlvbmFyeS1idG5zXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRpb24gYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciAhPSB1bmRlZmluZWQgJiYgRGljdGlvbmFyeS53b3JkQ2FjaGVzICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBEaWN0aW9uYXJ5LndvcmRDYWNoZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZVdvcmRIZWFkaW5nRWxlbSA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSB3b3JkQ2FjaGUud29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQucmVxdWVzdERpY3Rpb25hcnlUZXJtLmZldGNoRGljdGlvbmFyeVRlcm0od29yZENhY2hlLndvcmQsIHdvcmRDYWNoZS53b3JkVVJMLCBzZWFyY2hFbGVtcywgZmFsc2UsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5LnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIERpY3Rpb25hcnkucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXA6ICh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogU2NoV29yZFNjaEJ1dHRvbkRpY0VsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpO1xuXG4gICAgICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIHdvcmQgaXM6IFwiLHdvcmQpXG4gICAgICAgICAgICBjb25zdCB3b3JkVGl0bGUgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgIHdvcmRUaXRsZS50ZXh0Q29udGVudCA9IHdvcmQud29yZDtcbiAgICAgICAgICAgIC8vQWRkIHRoZSB3b3JkIGFuZCBleGFtcGxlcyB0byBwYWdlXG4gICAgICAgICAgICB3b3JkLm1lYW5pbmdzLm1hcCgod29yZFR5cGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkVHlwZUggPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpKTtcbiAgICAgICAgICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZFR5cGVMaXN0ID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgICAgICAgICAgICAgd29yZFR5cGUuZGVmaW5pdGlvbnMubWFwKChkZWY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b3JkVHlwZURlZkl0ZW0gPSB3b3JkVHlwZUxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAudGV4dENvbnRlbnQgPSBkZWYuZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJXaGF0IGFyZSBhbGwgdGhlIHNlbGVjdGlvbnM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYga2V5IFwiZXhhbXBsZVwiIGlzIGluIGRlZmluaXRpb24uIElmIGl0IGlzLCBhZGQgdGhlIGV4YW1wbGUgdG8gbGlzdFxuICAgICAgICAgICAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcbiAgICAgICAgRGljdGlvbmFyeS5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7XG4iLCIvL0F1dGhvcjogUm9iZXJ0IEEgSG93ZWxsLCBBcHJpbCAyMDIzXG4vL09yaWdpbmFsIEF1dGhvcihzKTogTW96aWxsYSBDb250cmlidXRvcnMsIE1ETlxuLy9MaWNlbnNlOiBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9lbi1VUy9hYm91dC9nb3Zlcm5hbmNlL3BvbGljaWVzL3BhcnRpY2lwYXRpb24vXG4vL01ETjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2NyZWF0ZUVsZW1lbnRcbi8vU291cmNlIGRpc3RyaWJ1dGlvbjogaHR0cHM6Ly9naXRodWIuY29tL21kbi93ZWItY29tcG9uZW50cy1leGFtcGxlcy90cmVlL21haW4vZXhwYW5kaW5nLWxpc3Qtd2ViLWNvbXBvbmVudFxuXG4vLyBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlIGVsZW1lbnRcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdMaXN0IGV4dGVuZHMgSFRNTFVMaXN0RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXG4gICAgICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIHN1cGVyKCkgaXMgYSByZWZlcmVuY2UgdG8gdGhpcyBlbGVtZW50XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gR2V0IHVsIGFuZCBsaSBlbGVtZW50cyB0aGF0IGFyZSBhIGNoaWxkIG9mIHRoaXMgY3VzdG9tIHVsIGVsZW1lbnRcbiAgICAgICAgLy8gbGkgZWxlbWVudHMgY2FuIGJlIGNvbnRhaW5lcnMgaWYgdGhleSBoYXZlIHVscyB3aXRoaW4gdGhlbVxuICAgICAgICBjb25zdCB1bHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJyk7XG4gICAgICAgIGNvbnN0IGxpcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBIaWRlIGFsbCBjaGlsZCB1bHNcbiAgICAgICAgLy8gVGhlc2UgbGlzdHMgd2lsbCBiZSBzaG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIGhpZ2hlciBsZXZlbCBjb250YWluZXJcbiAgICAgICAgdWxzLmZvckVhY2godWwgPT4ge1xuICAgICAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGVhY2ggbGkgZWxlbWVudCBpbiB0aGUgdWxcbiAgICAgICAgbGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBsaSBoYXMgYSB1bCBhcyBhIGNoaWxkLCBkZWNvcmF0ZSBpdCBhbmQgYWRkIGEgY2xpY2sgaGFuZGxlclxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbiBhdHRyaWJ1dGUgd2hpY2ggY2FuIGJlIHVzZWQgIGJ5IHRoZSBzdHlsZVxuICAgICAgICAgICAgICAgIC8vIHRvIHNob3cgYW4gb3BlbiBvciBjbG9zZWQgaWNvblxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRoZSBsaSBlbGVtZW50J3MgdGV4dCBpbiBhIG5ldyBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXNzaWduIHN0eWxlIGFuZCBldmVudCBoYW5kbGVycyB0byB0aGUgc3BhblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGxpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIENvcHkgdGV4dCBmcm9tIGxpIHRvIHNwYW4sIHNldCBjdXJzb3Igc3R5bGVcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnRleHRDb250ZW50ID0gY2hpbGRUZXh0LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXIgdG8gdGhpcyBzcGFuXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5vbmNsaWNrID0gdGhpcy5zaG93dWw7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZXZlbnQuY29kZSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0dWwgPSBuZXdTcGFuLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3BhbiBhbmQgcmVtb3ZlIHRoZSBiYXJlIHRleHQgbm9kZSBmcm9tIHRoZSBsaVxuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTcGFuLCBjaGlsZFRleHQpO1xuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxpIGNsaWNrIGhhbmRsZXJcbiAgICBzaG93dWwgPSBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgIGNvbnN0IG5leHR1bCA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpO1xuICAgICAgICB9XG4gICAgfTtcbn0iLCJpbXBvcnQgTGlua0RldGFpbHMgZnJvbSAnLi9MaW5rRGV0YWlscyc7XG5cbi8vSGVhZGVyIG5hdmlnYXRpb24gbGlua3NcbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pXG5jb25zdCBOQVZJVEVNUyA9IFtob21lTmF2TGluaywgcGFnZXNOYXZMaW5rXTtcblxuY29uc3QgSEVBREVSRk9PVEVSID0ge1xuICAgIGhlYWRlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsICl7XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCBwYWdlTWFpbiApKTtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZUhlYWRlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLnByZXBlbmQoSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGJlZm9yZSAnbWFpbicgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCBudWxsICkpO1xuICAgICAgICAgICAgICAgIGlmIChzaXRlSGVhZGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIucHJlcGVuZChIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYWZ0ZXIgJ2JvZHknIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBidWlsZEhlYWRlcjogKG1haW46IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICAgICAgICBIMS50ZXh0Q29udGVudCA9ICc8UmFuZG9tIFdlYiBCaXRzPic7IC8vSDEgTG9nb1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoSDEpO1xuXG4gICAgICAgICAgICBpZiAobWFpbiAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBtYWluLnByZXBlbmQoc2l0ZUhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKHNpdGVIZWFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHNpdGVIZWFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlck5hdkZyYWdcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJykpO1xuXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdExpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyaG93ZWxsNDc2LmdpdGh1Yi5pbycpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvUmFuZG9tV2ViQml0cy8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnRleHRDb250ZW50ID0gYCR7aXRlbS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICAgICAgICAgIGhlYWRlck5hdi5hcHBlbmQobmF2TGlzdEl0ZW1zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmQoSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5idWlsZEZhdmljb25BdHRyaWJ1dGlvbihmb290ZXIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGb290ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjIgUmFuZG9tIFdlYkJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcbiAgICAgICAgICAgIHNpdGVGb290ZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUZvb3RlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGYXZpY29uQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAvL0Zhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXR0cmlidXRpb25cbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9ICdodHRwczovL3d3dy52ZWN0b3JzdG9jay5jb20vcm95YWx0eS1mcmVlLXZlY3Rvci9tYWludGVuYW5jZS1pY29uLWZvci1ncmFwaGljLWFuZC13ZWItZGVzaWduLXZlY3Rvci00NTAyNjc1NSdcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkljb25Ib21lOiAjNDUwMjY3NTVcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLmFwcGVuZENoaWxkKGZvb3Rlckljb25MaW5rKTtcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJJY29uUGFyYSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSEVBREVSRk9PVEVSOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcblxuaW50ZXJmYWNlIFRvRG8gIHtcbiAgICBUb0RvSXRlbTogc3RyaW5nO1xufVxuXG5jb25zdCB0b2Rvc1dpZGdldCA9IHtcbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICAgIH0sXG4gICAgdG9Eb3NMaXN0U2VjdGlvbjoge1xuICAgICAgICBUb0RPczogMCxcblxuICAgICAgICBjcmVhdGVTYW1wbGVUb19EbzogKHRib2R5OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyMiA9IHRib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkMm1pZGRsZSA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcysrO1xuICAgICAgICAgICAgICAgIHRkMm1pZGRsZS50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG9ETyBJdGVtLlwiXG4gICAgICAgICAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQyREVMID0gdGQycmlnaHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJlc2V0XCIpO1xuICAgICAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcblxuICAgICAgICAgICAgICAgIC8vXCJkZWxldGVcIiBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLkRlbGV0ZUJ1dHRvbih0ZDJERUwpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBBZGRUb0RvOiAoZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgLy9hZnRlciBcIkFkZFwiIGlzIGNsaWNrZWQsIGluc2VydCBuZXcgdGFibGUgcm93XG4gICAgICAgICAgICBjb25zdCBUQUJMRUlURU0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyk7XG4gICAgICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdSb3cgPSB0YWJsZUZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7IC8vQWRkIHJvd1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIGZpcnN0IGRhdGFcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0lURU0gPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgc2Vjb25kIGRhdGFcbiAgICAgICAgICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb24udG9TdHJpbmcoKTsgLy9Qb3B1bGF0ZSBzZWNvbmQgY29sXG4gICAgICAgICAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoTnVtYmVyKGVsZW0/LmdldEF0dHJpYnV0ZShcIm51bVwiKSkgfHwgLTEwMDApICsgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgdGhpcmQgZGF0YVxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcbiAgICAgICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0RlbGV0ZScpO1xuICAgICAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdEZWxldGUnKTtcbiAgICAgICAgICAgICAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcbiAgICAgICAgICAgICAgICAvL1wiZGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5EZWxldGVCdXR0b24oZGVsQk9YKTsgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0UGFpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9MaXN0U3RvcmFnZS5hZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSB3ZXJlIG5vICdUb0RvSXRlbXMnIGZvdW5kIG9yIHRoZXkgYXJlIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIERlbGV0ZUJ1dHRvbjogKGJveDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJveC5wYXJlbnROb2RlICE9IG51bGwgJiYgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyAhPSBudWxsKXtcblxuICAgICAgICAgICAgICAgIGxldCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD5ib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGxldCByb3dDaGtCeElOID0gPEhUTUxJbnB1dEVsZW1lbnQ+IHJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuICAgICAgICAgICAgICAgIGlmKHRhYmxlICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHI6IEhUTUxUYWJsZVJvd0VsZW1lbnQgPSA8SFRNTFRhYmxlUm93RWxlbWVudD5ib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3dDaGtCeElOLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmRlbGV0ZVJvdyhpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb0xpc3RTdG9yYWdlLnJlbW92ZXRvRG9Gcm9tU3RvcmFnZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcy0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhYmxlJyBlbGVtZW50IG5vdCBmb3VuZCBvciBpdCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBBRERCVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWRkQnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBBRERJVEVNRU5URVI6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJykhO1xuICAgICAgICAgICAgaWYoQUREQlVUVE9OICE9IG51bGwgJiYgQURESVRFTUVOVEVSICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLkFkZFRvRG8oQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBlLmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5BZGRUb0RvKEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvcHVsYXRlVG9Eb0xpc3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vcmV0cmlldmUgU3RvcmFnZSwgYWRkIGlmIG1pc3NpbmdcbiAgICAgICAgICAgIGxldCBzdG9yYWdlVG9Eb3MgPSB0b2Rvc1dpZGdldC50b0RvTGlzdFN0b3JhZ2UuZ2V0QWxsdG9Eb0Zyb21TdG9yYWdlKCk7XG4gICAgICAgICAgICBpZiAoc3RvcmFnZVRvRG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VUb0Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLkFkZFRvRG8oc3RvcmFnZVRvRG9zW2ldLlRvRG9JdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVUb0RvTGlzdFdpZGdldDogKGVsZW06IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHsgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiVG9Eb0xpc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnL2Rpc3QvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kb2xpc3RTZWN0aW9uID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVhZCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGxlZnQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlP1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRib2R5ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uY3JlYXRlU2FtcGxlVG9fRG8odGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIzID0gdGZvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzbGVmdCA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uaWQgPSBcIkFkZEJ1dHRvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzbWlkZGxlID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IElOUFVUID0gdGQzbWlkZGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNUb0RvSXRlbXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0Ym9keSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5jcmVhdGVTYW1wbGVUb19EbyhodGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidUb0RvSXRlbXMnIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24ucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZXJlIGlzIG5vIFwiVG9Eb0xpc3RcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9Eb0xpc3RTdG9yYWdlOiB7XG4gICAgICAgIGdldEFsbHRvRG9Gcm9tU3RvcmFnZTogKCkgPT4geyAvL1RPRE86IGdsb2JhbCB1c2FnZVxuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyA/IEpTT04ucGFyc2UodmFsdWVzKSA6IFtdO1xuICAgICAgICB9LFxuICAgICAgICBhZGR0b0RvVG9TdG9yYWdlOiAoZGVzY3JpcHRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgVG9EbzogVG9EbyA9ICB7XG4gICAgICAgICAgICAgICAgVG9Eb0l0ZW06IGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9hZGQgdGhlIFRvRG9zIHRvIGxvY2FsIGNhY2hlXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgdmFsdWVzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZG9zOiBUb0RvW10gPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlOiAoaXRlbTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgaWYgKHN0b3JhZ2VTdHIgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbCBzdG9yYWdlIHZhbHVlcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5Ub0RvSXRlbSAhPT0gaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRvZG9zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBFeHBhbmRpbmdMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9leHBhbmRpbmdMaXN0XCI7XG5cbmNvbnN0IGV4cGFuZGluZ0xpc3QgPSB7XG4gICAgaW5pdDooKSA9PiB7XG4gICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGVsZW1lbnRcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdleHBhbmRpbmctbGlzdCcsIEV4cGFuZGluZ0xpc3QsIHsgZXh0ZW5kczogJ3VsJyB9KTtcblxuICAgICAgICAvLyBBZGQgdGl0bGUgYXR0cmlidXRlIHRvIGFsbCBsaSB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlPcGVuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpmaXJzdC1jaGlsZGApO1xuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlDbG9zZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46bnRoLWNoaWxkKDMpYCk7XG5cbiAgICAgICAgZm9yIChsZXQgbGkgb2YgZXhwYW5kYWJsZUxpT3Blbk9wZW4pe1xuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxpLmdldEF0dHJpYnV0ZSgndGl0bGUnKSA9PSAnU2VsZWN0IHRvIGV4cGFuZC4uLicgPyAoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaS5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGkubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICA6ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBsaS5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgbGkgb2YgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuKXtcbiAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBleHBhbmRpbmdMaXN0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBjYXJkc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvV2ViQml0cydcbmltcG9ydCBkaWN0aW9uYXJ5V2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9kaWN0aW9uYXJ5JztcbmltcG9ydCB0b2Rvc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvdG9kb3MnO1xuaW1wb3J0IEhFQURFUkZPT1RFUiBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyZm9vdGVyJztcbmltcG9ydCBleHBhbmRpbmdMaXN0IGZyb20gJy4vZXhwYW5kaW5nTGlzdCdcblxuKCgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZSwgYWRkIGNhcmRzIHdpZGdldCBmaXJzdFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMuaHRtbCcpIHtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgdGhlIGhlYWRlciBhbmQgZm9vdGVyXG4gICAgICAgIEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuaW5pdCgpO1xuICAgICAgICBIRUFERVJGT09URVIuZm9vdGVyV2lkZ2V0LmluaXQoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHBhZ2UgY29tcG9uZW50c1xuICAgICAgICAvLyBkb20uaHRtbCBwYWdlIHVzZXMgZXhwYW5kaW5nTGlzdHMgY29tcG9uZW50XG4gICAgICAgIGlmICggXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy9kb20uaHRtbCcpe1xuICAgICAgICAgICAgICAgIGV4cGFuZGluZ0xpc3QuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcbiAgICAgICAgaWYgKGRpY3Rpb25hcnlFbGVtZW50KVxuICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5pbml0KGRpY3Rpb25hcnlFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgIGlmICh0b0Rvc0VsZW1lbnQgIT0gbnVsbClcbiAgICAgICAgICAgIHRvZG9zV2lkZ2V0LmluaXQodG9Eb3NFbGVtZW50KTtcbiAgICB9KVxuXG59KSgpOyJdfQ==

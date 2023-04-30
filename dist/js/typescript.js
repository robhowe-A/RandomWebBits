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

},{"./expandingList":9}],11:[function(require,module,exports){
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

},{"./LinkDetails":2}],12:[function(require,module,exports){
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
                    console.log("Done.");
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
const WebBits_1 = require("./components/WebBits");
const dictionarywidget_1 = require("./components/dictionarywidget");
const todos_1 = require("./components/todos");
const headerfooter_1 = require("./components/headerfooter");
const expandingListDOMWidget_1 = require("./components/expandingListDOMWidget");
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

},{"./components/WebBits":4,"./components/dictionarywidget":8,"./components/expandingListDOMWidget":10,"./components/headerfooter":11,"./components/todos":12}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvY29tcG9uZW50cy9MaW5rRGV0YWlscy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdC50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvY29tcG9uZW50cy9hcGkudHMiLCJzcmMvY29tcG9uZW50cy9kYXRhLnRzIiwic3JjL2NvbXBvbmVudHMvZGF0YV9BdHRyaWJ1dGlvbkxpbmtzLnRzIiwic3JjL2NvbXBvbmVudHMvZGljdGlvbmFyeXdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL2V4cGFuZGluZ0xpc3QudHMiLCJzcmMvY29tcG9uZW50cy9leHBhbmRpbmdMaXN0RE9NV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvaGVhZGVyZm9vdGVyLnRzIiwic3JjL2NvbXBvbmVudHMvdG9kb3MudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsa0NBQWtDO0FBQ2xDLCtDQUF3QztBQUV4Qyx1Q0FBdUM7QUFDdkMsTUFBTSxlQUFnQixTQUFRLHFCQUFXO0lBQ3JDLGNBQWMsQ0FBUztJQUN2QixTQUFTLENBQVM7SUFFbEIsWUFDSSxLQUFhLEVBQ2IsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsY0FBc0IsRUFDdEIsUUFBZ0IsRUFDaEIsU0FBaUI7UUFHakIsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQUVELGtCQUFlLGVBQWUsQ0FBQzs7OztBQ3ZCL0Isa0NBQWtDOztBQUVsQyxNQUFNLFdBQVc7SUFDYixLQUFLLENBQVM7SUFDZCxTQUFTLENB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ekQsSUFBSSxZQUFZLElBQUksSUFBSTtZQUNwQixlQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBMaW5rRGV0YWlscyBmcm9tIFwiLi9MaW5rRGV0YWlsc1wiO1xuXG4vL0ljb24gbGlua3MgdXNlZCBmb3IgaW1hZ2UgQXR0cmlidXRpb25cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIExpbmtEZXRhaWxzIHtcbiAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nO1xuICAgIGFydGljbGVpZDogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nLFxuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuICAgICAgICBcbiAgICAgICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVvd25lciA9IGF0dHJpYnV0ZW93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5cbmNsYXNzIExpbmtEZXRhaWxzIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIHBhZ2VOYW1lOiBzdHJpbmc7XG4gICAgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtEZXRhaWxzOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmNsYXNzIFdlYkJpdCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gICAgYXJ0aWNsZUxpbms6IHN0cmluZztcbiAgICBjYXJkSW1hZ2U6IHN0cmluZztcbiAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgICAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBBVFRSSUJVVElPTkxJTktEQVRBIGZyb20gXCIuL2RhdGFfQXR0cmlidXRpb25MaW5rc1wiO1xuXG5jb25zdCBjYXJkc1dpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjYXJkIGRhdGEgKyBhdHRyaWJ1dGlvbiBsaW5rIGRhdGFcbiAgICAgICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMsIG9yIGFydGljbGVzLCBHdWlkZXMsIGFuZCBFeHBsb3JlcyBcbiAgICAgICAgbGV0IGNhcmRzQXJ0aWNsZXM6IGFueSA9IFtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSwgQVRUUklCVVRJT05MSU5LREFUQSksXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRBcnRpY2xlQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpLCBBVFRSSUJVVElPTkxJTktEQVRBKSxcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIG9uIHRoZSBwYWdlIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICBsZXQgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudFtdID0gW1xuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIpISxcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiKSEsXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4bG9yZSB0aGUgV2ViOlwiKSEsXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gUm91dGUgQ2hlY2tzIC0+IEFkZCB3aWRnZXQgYW5kIGZvcm1hdCBtdWx0aXBsZSBwYWdlc1xuICAgICAgICAvLyBJbmRleCAoSG9tZSkgcGFnZSBzaG9ydGVucyBlYWNoIHNlY3Rpb24gdG8gMyBhcnRpY2xlcyBvbmx5XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9kaXN0L2luZGV4Lmh0bWwnKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRNdWx0aXBsZVJhbmRvbSA9IChhcnI6IGFueSwgbnVtOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByYW5kb21pemUgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uYXJyXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKDAsIG51bSk7IC8vIHJldHVybiB0aGUgcmVxdWVzdGVkIG51bWJlciBvZiBlbGVtZW50c1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1swXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMF0sIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjYXJkcyB0byB0aGUgcGFnZSBieSBkZWNvbnN0cnVjdGlvbiBhbmQgYWRkaXRpb25cbiAgICAgICAgLy8gT3V0ZXIgbG9vcDogaXRlcmF0ZSB0aGUgZGF0YSB0byBlYWNoIHJlc3BlY3RpdmUgY2F0ZWdvcnk6IFBhZ2VzLCBHdWlkZXMsIEV4cGxvcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNTZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2FyZHNTZWN0aW9uW2ldICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgLy8gSW5uZXIgbG9vcDogaXRlcmF0ZSB0aHJvdWdoIHRoZSBjYXRlZ29yeSBkYXRhXG4gICAgICAgICAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uOiAobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSBkaXZpc29yIHNlY3Rpb25hbCBlbGVtZW50cyB0byBhcHBlbmQgdG8gbWFpblxuICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKXtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjYXJkIHNlY3Rpb24gZWxlbWVudHNcbiAgICAgICAgICAgIC8vIDxzZWN0aW9uIGNsYXNzPVwiY2FyZHNcIj5cbiAgICAgICAgICAgIC8vICAgICA8aDI+QXJiaXRyYXJ5IEFydGljbGVzOjwvaDI+XG4gICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzcz1cImNhcmRfY29sdW1uc1wiPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgIC8vIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgbGV0IGFhQ2FyZHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFIZWFkaW5nKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBBQVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRzXCIpO1xuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7bmFtZX1gO1xuXG4gICAgICAgICAgICByZXR1cm4gYWFDYXJkc1NlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1haW4gZWxlbWVudCBleGlzdHMgb24gdGhlIHBhZ2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcbiAgICBidWlsZEFydGljbGVDYXJkczogKGNhcmRzRGF0YTogYW55LCBhdHRybGlua3M6IEF0dHJpYnV0aW9uTGlua1tdKSA9PiB7XG4gICAgICAgIC8vIE1hcCBXZWJCaXQgZGF0YSB0byBhIGNhcmQsIGVhY2hcbiAgICAgICAgLy9cbiAgICAgICAgLy8gPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgLy8gPGRpdj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAgICAvLyAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICAgIC8vIDwvZGl2PjwhLS1lbmQgY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAgICAvLyA8ZGl2IGNsYXNzPVwiY2FyZEJvZHlcIj5cbiAgICAgICAgLy8gICAgIDxoMz48L2gzPlxuICAgICAgICAvLyAgICAgPHA+PC9wPjxhIGhyZWY9XCJcIj48L2E+XG4gICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgLy8gPC9kaXY+XG4gICAgICAgIC8vXG4gICAgICAgIC8vIEl0ZXJhdGUgZWFjaCBjYXJkIC0tPiBidWlsZCB0aGUgY2FyZCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGxldCBjYXJkSW1nVG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgY2FyZEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgbGV0IGNhcmRCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIGxldCBjYXJkQm9keVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBsZXQgY2FyZEJvZHlMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChjYXJkSW1nKTtcbiAgICAgICAgICAgIGNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5SGVhZGluZyk7XG4gICAgICAgICAgICBjYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcblxuICAgICAgICAgICAgLy8gQWRkIGNhcmQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgICAgICBjYXJkQm9keS5jbGFzc0xpc3QuYWRkKFwiY2FyZEJvZHlcIik7XG4gICAgICAgICAgICBjYXJkSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYXJ0aWNsZS5jYXJkSW1hZ2UpO1xuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgICAgIGNhcmRJbWcuc2V0QXR0cmlidXRlKCdBcnRpY2xlJywgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyKTtcbiAgICAgICAgICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBhcnRpY2xlLmFydGljbGVMaW5rKVxuICAgICAgICAgICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcbiAgICAgICAgICAgIGNhcmRCb2R5UGFyYS50ZXh0Q29udGVudCA9IGFydGljbGUuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSW1hZ2UgYXR0cmlidXRpb24gbWF5IGJlIG5lZWRlZCBmb3IgdGhlIGltYWdlIHVzZWRcbiAgICAgICAgICAgIC8vIEF0dHJpYnV0aW9uIGRhdGEgaXMgaW1wb3J0ZWQgYXMgJ2F0dHJsaW5rcycgc2lnbmF0dXJlIHBhcmFtZXRlclxuICAgICAgICAgICAgYXR0cmxpbmtzLm1hcCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHRoZSBkYXRhIGlzbid0IGVudGVyZWQsIGNhdXNpbmcgYSBtaXNzXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT09IGxpbmsuYXJ0aWNsZWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gPGRpdiBjbGFzcz1cImZsaXAtY2FyZFwiPjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICAgICAgICAgICAgICAgIC8vIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzcz1cImNhcmRGcm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQmFja1wiPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgPGgzPjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICA8cD48L3A+XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIiBjbGFzcz1cImltZ1NtYWxsIGltZ1BUUlwiPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAvLyA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGltYWdlIGJhY2sgcGFuZWwgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICAgICAgICAgICAgICAvLyBSZWRlZmluZSBjYXJkIGltYWdlIHBhbmVsIGFzIGEgZmxpcCBwYW5lbFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJkSW5uZXIgPSBjYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChjYXJkSW1nKTsgLy8gbW92ZSBpbWFnZSB3aXRoaW4gY2FyZCBmcm9udCBkaXZpc29yXG4gICAgICAgICAgICAgICAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tIZWFkaW5nID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY2FyZEJhY2suYXBwZW5kQ2hpbGQoc21hbGxJbWcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IGNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTsgLy9hcHBlbmQgdG8gZnJvbnQgcGFuZWxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBmbGlwLXBhbmVsIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgICAgICAgICBjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkRnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYXJkQmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuY2xhc3NMaXN0LmFkZChcImF0dHJpYnV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xuICAgICAgICAgICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVGhlIGNhcmQgaXMgV2ViQml0XG4gICAgICAgICAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQoY2FyZEltZ1RvcCk7XG4gICAgICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQoY2FyZEJvZHkpO1xuXG4gICAgICAgICAgICByZXR1cm4gV2ViQml0O1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gQUFzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FyZHNXaWRnZXRcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gICAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGF0YUlzSW5DYWNoZTogYm9vbGVhbiA9IGZhbHNlOyAvL1RPRE86IGRhdGFpbmNhY2hlIG92ZXJhbGxcbiAgICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG4gICAgXG4gICAgY29uc3RydWN0b3IoR0VUVVJMOiBVUkwsIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiwgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nLCBlcnJvckVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IHNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICAgICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHRVRVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkdFVFVSTDtcbiAgICB9O1xuXG4gICAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCl7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChHRVRVUkwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IGAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgICAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpe1xuICAgICAgICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJ2NhY2hlcycgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4oKHRleHQpID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKCh0ZXh0KSA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKCAocmVzcG9uc2U6YW55KSAgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIlxuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcInBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVAgQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MIE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiXG4gICAgKSxcbik7XG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBBcHBsaWNhdGlvbiBUYWJcIixcbiAgICAgICAgXCJSZXZpZXcgc2l0ZSBkYXRhIHdoZW4gY2xlYXJpbmcgdGhlIGJyb3dzZXIgaGlzdG9yeVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIlxuICAgICksXG4pO1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIm5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiQ2hlY2sgb3V0IHNvbWUgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIlxuICAgICksXG4pO1xuXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cblxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG5cbmxldCBBVFRSSUJVVElPTkxJTktEQVRBID0gW1xuXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgXCJEb21haW4gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RvbWFpblwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAxXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJjb2RlIGljb25zXCIsXG4gICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgIDJcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zc2wtY2VydGlmaWNhdGVcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgIDRcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcImFpIGljb25zXCIsXG4gICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvYWlcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICA4XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJwcm90b3R5cGUgaWNvbnNcIixcbiAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiUGFpbnQgM0RcIixcbiAgICA5XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kaWN0aW9uYXJ5XCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgIDEwXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsgKFxuICAgIFwiQk9JTkMgaWNvbnNcIixcbiAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgIFwiQk9JTkNcIixcbiAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgMTFcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcIklQIGljb25zXCIsXG4gICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgIDEyXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJodG1sIGljb25zXCIsXG4gICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgIDEzXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb250ZW50LXdyaXRpbmdcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgMTRcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcGFnZS1zcGVlZFwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAxNVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgIFwiRmxhdGljb25cIixcbiAgICBcIlNNVFAgYW5kIEVtYWlsXCIsXG4gICAgMTZcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQgSWNvbnMgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgIDE3XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZ29vZ2xlLWV4cGVkaXRpb25zXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgMThcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJEZXZUb29sc1wiLFxuICAgIDE5XG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJkbnMgaWNvbnNcIixcbiAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiTEVBUk46IEROU1wiLFxuICAgIDIwXG4gICAgKSxcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRGV2VG9vbHNUd29cIixcbiAgICAyMVxuICAgICksXG5uZXcgQXR0cmlidXRpb25MaW5rKFxuICAgIFwicmFuayBpY29uc1wiLFxuICAgIFwiUmFuayBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsbWVldHVwIC0gRmxhdGljb25cIixcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICBcIkZsYXRpY29uXCIsXG4gICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgMjJcbiAgICApLFxubmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICBcInRyZWUgaWNvbnNcIixcbiAgICBcIlRyZWUgaWNvbnMgY3JlYXRlZCBieSBqdXN0aWNvbiAtIEZsYXRpY29uXCIsXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgXCJGbGF0aWNvblwiLFxuICAgIFwiRE9NXCIsXG4gICAgMjNcbiAgICApXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBBVFRSSUJVVElPTkxJTktEQVRBOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSAnLi93aWRnZXRtYXJrdXBlbGVtZW50cydcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmRjYWNoZSB9IGZyb20gXCIuL2xvY2Fsc3RvcmFnZWNhY2hlc1wiO1xuXG5jbGFzcyBEaWN0aW9uYXJ5V2lkZ2V0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBpc0V4aXN0aW5nQ2FjaGVpbkJyb3dzZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FjaGVkV29yZHNDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhdGljIGV4aXN0aW5nQ2FjaGVzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgd29yZENhY2hlczogbG9jYWxzdG9yYWdld29yZGNhY2hlW107XG4gICAgcHVibGljIHN0YXRpYyBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyB3b3JkVVJMOiBVUkw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9uZXcgZGljdGlvbmFyeS4gbm8gaW5pdGlhbGl6aW5nIGZ1bmN0aW9ucyBuZWVkZWRcbiAgICAgICAgLy9zdGF0aWMgY2xhc3MgLSBuZWVkcyB0byBzaG93IG9uIGJyb3dzZXIgYW55IGNhY2hlcyB0aGF0IGV4aXN0XG4gICAgICAgIC8vYW5kIHRoZWlyIG5hbWVzXG4gICAgfVxuICAgIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIFNyY2hlbGVtZW50cyA9IERpY3Rpb25hcnlXaWRnZXRNYXJrdXAuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGV2ZW50IGxpc3RlbmVyczogd29yZCBzZWFyY2gsIGJ1dHRvbiBjbGlja3MsIGV0Y1xuICAgICAgICB0aGlzLmFkZFdvcmRTZWFyY2hFdmVudHMoU3JjaGVsZW1lbnRzKTtcblxuICAgICAgICAvLyBGaW5kIGl0ZW1zIHByZS1leGlzdGluZyBpbiBsb2NhbCBzdG9yYWdlL2NhY2hlXG4gICAgICAgIERpY3Rpb25hcnlXaWRnZXQuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAgICAgLy9lbnVtZXJhdGUgYWxsIG9mIHRoZSBjYWNoZXNcbiAgICAgICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZVxuXG4gICAgICAgIC8vRW51bWVyYXRlIGxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtc1xuICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgICBpZiAoc3RvcmFnZVN0ciAhPSBudWxsKSB7XG4gICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LndvcmRDYWNoZXMgPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgICAgICAgcmV0dXJuIERpY3Rpb25hcnlXaWRnZXQud29yZENhY2hlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRXb3JkU2VhcmNoRXZlbnRzKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNlYXJjaEVsZW1zID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICAgICAgc2VhcmNoRWxlbXMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy53b3JkU2VhcmNoVXBkYXRlKHNlYXJjaEVsZW1zKTtcbiAgICAgICAgfSlcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRTZWFyY2hVcGRhdGUoc2VhcmNoRWxlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyBcIlByZXZpb3VzIHdvcmQgc2VhcmNoZXNcIiBidXR0b24gZmV0Y2hlcyBsb2NhbGx5IHN0b3JlZCB3b3Jkc1xuICAgICAgICAvLyBDbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICAgICAgc2VhcmNoRWxlbXMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICAgICAgICAgIGxldCBuZXdCdXR0b25Db250YWluZXI6IEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRpb24gYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyICE9IHVuZGVmaW5lZCAmJiBEaWN0aW9uYXJ5V2lkZ2V0LndvcmRDYWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgd29yZENhY2hlIG9mIERpY3Rpb25hcnlXaWRnZXQud29yZENhY2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID0gbmV3QnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZENhY2hlLndvcmQsIHdvcmRDYWNoZS53b3JkVVJMLCBzZWFyY2hFbGVtcywgZmFsc2UsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzTm90Rm91bmRPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIHNlYXJjaEVsZW1zLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sIHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZGNhY2hlLCB3b3JkQXJyYXk6IGFueVtdLCkge1xuICAgICAgICAvLyBBZGQgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JkLWNhY2hlcycsIEpTT04uc3RyaW5naWZ5KHdvcmRBcnJheSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gY3VycmVudCAnd29yZC1jYWNoZXMnIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkY2FjaGVbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSB3b3JkY2FjaGUud29yZFVSTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdvcmQgaXMgYWxyZWFkeSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIGFsbGNhY2hlLnB1c2god29yZGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmQtY2FjaGVzJywgSlNPTi5zdHJpbmdpZnkoYWxsY2FjaGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybSh3b3JkOiBzdHJpbmcsIHdvcmRVcmw6IFVSTCwgZWxlbTogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgICAgICBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgLy9UT0RPOiBkaWN0aW9uYXJ5IGNhY2hlIG1hbmFnZW1lbnQ6XG4gICAgICAgIC8vVE9ETzogMS4pIGlzIHRvIGJlIGNhY2hlZCB0cnVlPyAtLWNoZWNrXG4gICAgICAgIC8vVE9ETzogMi4pIGlzIHRvIGJlIGNhY2hlZCBmYWxzZT8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IC0tPiBhcmUgdGhleSB0aGUgc2FtZSBiZWhhdmlvcj8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IC0tPiBpcyB0aGUgcmVzdWx0IGluIHRoZSBjYWNoZT8gLS1jaGVja1xuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBhIHNlbmQgdG8gY2FjaGUgb3B0aW9uXG4gICAgICAgIC8vXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBmdW5jdGlvbiBjYWxscyB0byBlaXRoZXIgc3RvcmUgaW4gQ2FjaGUgU3RvcmFnZVxuICAgICAgICAvLyBJZiBpdGVtcyBhcmUgdG8gYmUgY2FjaGVkLCBlZGl0IExvY2FsIFN0b3JhZ2UgY2FjaGUgbmFtZXNcbiAgICAgICAgbGV0IHdvcmRDYWNoZVN0b3JlOiBhbnkgPSBbXTtcbiAgICAgICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZGNhY2hlID0ge1xuICAgICAgICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICAgICAgICB3b3JkOiB3b3JkLFxuICAgICAgICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgICAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgICAgICB9XG4gICAgICAgIHdvcmRDYWNoZVN0b3JlLnB1c2god29yZGNhY2hlKTtcblxuICAgICAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy9zZXQgYXBpR0VUOjpzZW5kVG9Ccm93c2VyQ2FjaGUgdG8gdHJ1ZSB0byB1c2UgY2FjaGUgc3RvcmFnZVxuICAgICAgICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVCh3b3JkY2FjaGUud29yZFVSTCwgZmFsc2UsIHdvcmRjYWNoZS5jYWNoZU5hbWUsIGVsZW0uZXJyb3JFbGVtKTtcblxuICAgICAgICAgICAgLy9mZXRjaCByZXF1ZXN0XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCAndGl0bGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgIW5vRGVmaW5pdGlvbnMpIHsgLy8gZ29vZCBmZXRjaC0tPiBtb3ZlIGZvcndhcmQgdG8gbWFya3VwIHJlbmRlclxuICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXRNYXJrdXAuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIGVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkRmV0Y2guZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCksIHdvcmRjYWNoZSwgd29yZENhY2hlU3RvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUgIT09IGZhbHNlKSB7IC8vIGNoZWNrIG5ldHdvcmsgc3RhdHVzIHZpYSBuYXZpZ2F0b3Igb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdvcmRWYWxpZGF0aW9uKGludHh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICAgICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3b3JkU2VhcmNoVXBkYXRlKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMpIHtcbiAgICAgICAgLy8gVGFrZSB1c2VyIGlucHV0IGFuZCBmaWx0ZXIgdG8gYW4gYWNjZXB0ZWQgc3RyaW5nXG4gICAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLndvcmRWYWxpZGF0aW9uKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUpXG4gICAgICAgICAgICA/IGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSA6IGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2U7XG4gICAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgVVJMIG9mIHRoZSBhY2NlcHRlZCB3b3JkIGZvciB1c2UgaW4gdGhlIGZldGNoIGNhbGxcbiAgICAgICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3RVcmwpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsIHRoaXMud29yZFVSTCwgc2VhcmNoRWxlbXMsIGZhbHNlLCBcIlwiKTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHVubmVlZGVkIGNsYXNzZXMgaWYgYXBwbGllZCBwcmV2aW91c2x5XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gJyc7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICAgIH1cbn1cblxuXG5jbGFzcyBEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwIGV4dGVuZHMgRGljdGlvbmFyeVdpZGdldCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbTogRWxlbWVudCkge1xuICAgICAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGljdGlvbmFyeSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1dvcmRzID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXJjaFdvcmRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3JkOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoV29yZHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnU2VhcmNoLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgICAgICAgICAgICAgICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hXb3JkcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAod29yZERhdGE6IGFueSwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cykge1xuICAgICAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCB3b3JkRGF0YSEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGRhdGEgaXMgbnVsbFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIHdvcmQncyBkZWZpbml0aW9uIHRvIHRoZSBkaWN0aW9uYXJ5IHdpZGdldFxuICAgICAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPSBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcblxuICAgICAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgICAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICAgICAgd29yZERhdGEubWFwKCh3b3JkOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgICAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgICAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRUeXBlSCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICAgICAgICAgIHdvcmRUeXBlSC50ZXh0Q29udGVudCA9IHdvcmRUeXBlLnBhcnRPZlNwZWVjaDtcbiAgICAgICAgICAgICAgICB3b3JkVHlwZS5kZWZpbml0aW9ucy5tYXAoKGRlZjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9uIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uUC50ZXh0Q29udGVudCA9IGRlZi5kZWZpbml0aW9uO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIilcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XG4gICAgICAgICAgICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZpbml0aW9uRGVzY3JpcHRpb24pO1xuICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBkaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIGluaXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG4gICAgICAgLy8gQ3JlYXRlIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCwgY2FsbCBjcmVhdGVcbiAgICAgICBsZXQgZGljdGlvbmFyeVdpZGdldCA9IG5ldyBEaWN0aW9uYXJ5V2lkZ2V0KCk7XG4gICAgICAgZGljdGlvbmFyeVdpZGdldC5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0KGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7IiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuLy8gQ3JlYXRlIGEgY2xhc3MgZm9yIHRoZSBlbGVtZW50XG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nTGlzdCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEdldCB1bCBhbmQgbGkgZWxlbWVudHMgdGhhdCBhcmUgYSBjaGlsZCBvZiB0aGlzIGN1c3RvbSB1bCBlbGVtZW50XG4gICAgICAgIC8vIGxpIGVsZW1lbnRzIGNhbiBiZSBjb250YWluZXJzIGlmIHRoZXkgaGF2ZSB1bHMgd2l0aGluIHRoZW1cbiAgICAgICAgY29uc3QgdWxzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuICAgICAgICBjb25zdCBsaXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gSGlkZSBhbGwgY2hpbGQgdWxzXG4gICAgICAgIC8vIFRoZXNlIGxpc3RzIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgdXNlciBjbGlja3MgYSBoaWdoZXIgbGV2ZWwgY29udGFpbmVyXG4gICAgICAgIHVscy5mb3JFYWNoKHVsID0+IHtcbiAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBlYWNoIGxpIGVsZW1lbnQgaW4gdGhlIHVsXG4gICAgICAgIGxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgbGkgaGFzIGEgdWwgYXMgYSBjaGlsZCwgZGVjb3JhdGUgaXQgYW5kIGFkZCBhIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW4gYXR0cmlidXRlIHdoaWNoIGNhbiBiZSB1c2VkICBieSB0aGUgc3R5bGVcbiAgICAgICAgICAgICAgICAvLyB0byBzaG93IGFuIG9wZW4gb3IgY2xvc2VkIGljb25cbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb3NlZCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgbGkgZWxlbWVudCdzIHRleHQgaW4gYSBuZXcgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGFzc2lnbiBzdHlsZSBhbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHNwYW5cbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBsaS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDb3B5IHRleHQgZnJvbSBsaSB0byBzcGFuLCBzZXQgY3Vyc29yIHN0eWxlXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IGNoaWxkVGV4dC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjbGljayBoYW5kbGVyIHRvIHRoaXMgc3BhblxuICAgICAgICAgICAgICAgIG5ld1NwYW4ub25jbGljayA9IHRoaXMuc2hvd3VsO1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGV2ZW50LmNvZGUgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRXhwYW5kaW5nTGlzdCB9IGZyb20gXCIuL2V4cGFuZGluZ0xpc3RcIjtcblxuY29uc3QgZXhwYW5kaW5nTGlzdERPTVdpZGdldCA9IHtcbiAgICBpbml0OigpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdCwgeyBleHRlbmRzOiAndWwnIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQgcHJvcGVydGllc1xuICAgICAgICAvLyBcIkRPTVwiIHBhZ2Ugc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICAvLyBBZGQgYSB0aXRsZSBhdHRyaWJ1dGUgdG8gYWxsIGxpLXNwYW4gdGhhdCBjYW4gZXhwYW5kIGZ1cnRoZXJcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpT3Blbk9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46Zmlyc3QtY2hpbGRgKTtcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOm50aC1jaGlsZCgzKWApO1xuXG4gICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGV4cGFuZGluZy1lbGVtZW50IGV4cGFuZGFibGUgZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlPcGVuT3Blbil7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJyBcbiAgICAgICAgICAgICAgICAgICAgPyAoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIFNldCBwcm9wZXJ0eSBvZiBjbG9zaW5nIHNwYW4gZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlDbG9zZVNwYW4pe1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwYW5kaW5nTGlzdERPTVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgTGlua0RldGFpbHMgZnJvbSAnLi9MaW5rRGV0YWlscyc7XG5cbi8vSGVhZGVyIG5hdmlnYXRpb24gbGlua3NcbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pXG5jb25zdCBOQVZJVEVNUyA9IFtob21lTmF2TGluaywgcGFnZXNOYXZMaW5rXTtcblxuY29uc3QgSEVBREVSRk9PVEVSID0ge1xuICAgIGhlYWRlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBlbGVtZW50IHRvIHRoZSBwYWdlXG4gICAgICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgbWFpbiBlbGVtZW50IGV4aXN0cywgYWRkIHRoZSBoZWFkZXIgdG8gaXRcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gcGFnZU1haW4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIocGFnZU1haW4pKTtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZUhlYWRlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLnByZXBlbmQoSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGJlZm9yZSAnbWFpbicgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBtYWluIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QsIGFkZCB0aGUgaGVhZGVyIHRvIHRoZSBib2R5XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcihudWxsKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGVIZWFkZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5wcmVwZW5kKEhFQURFUkZPT1RFUi5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBhZnRlciAnYm9keScgZWxlbWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkSGVhZGVyOiAobWFpbjogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgICAgICBjb25zdCBIMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJIMVwiKTtcbiAgICAgICAgICAgIEgxLnRleHRDb250ZW50ID0gJzxSYW5kb20gV2ViIEJpdHM+JzsgLy9IMSBMb2dvXG4gICAgICAgICAgICBIMS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIlJhbmRvbVdlYkJpdHNcIik7XG4gICAgICAgICAgICBzaXRlSGVhZGVyLmFwcGVuZChIMSk7XG5cbiAgICAgICAgICAgIGlmIChtYWluICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYWluLnByZXBlbmQoc2l0ZUhlYWRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKHNpdGVIZWFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHNpdGVIZWFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIGhlYWRlciBuYXZpZ2F0aW9uIGJhc2VkIG9uIG5hdmlnYXRpb24gZGF0YVxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5hdmlnYXRpb24gZWxlbWVudHNcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdkZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpKTtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIG5hdiBkYXRhIHRvIG5hdiBlbGVtZW50c1xuICAgICAgICAgICAgTkFWSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgIG5hdkxpc3RJdGVtcy5wcmVwZW5kKG5hdkxpc3RMaW5rcyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTmF2LmFwcGVuZChuYXZMaXN0SXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIG5hdmlnYXRpb24gYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnRleHRDb250ZW50ID0gYCR7aXRlbS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgICAgICAvLyBFbnZpcm9ubWVudCBsaW5rcyBlZGl0LCByZXF1aXJpbmcgZGlmZmVyZW50IGxpbmsgcmVsYXRpdmVzIHRvIG9wZXJhdGVcbiAgICAgICAgICAgICAgICAvLyBHaXRodWIgcGFnZXMgb3BlcmF0ZXMgZnJvbSByZXBvc2l0b3J5LCBub3QgJy8nXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyaG93ZWxsNDc2LmdpdGh1Yi5pbycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgZWRpdCBmb3IgZGV2IGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgL1JhbmRvbVdlYkJpdHMvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgaW4gb3RoZXIgZW52aXJvbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBmb290ZXIgZWxlbWVudCB0byB0aGUgcGFnZSBlbmRcbiAgICAgICAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmQoSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5idWlsZEZhdmljb25BdHRyaWJ1dGlvbihmb290ZXIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGb290ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgc2l0ZUZvb3Rlci5hcHBlbmQoZm9vdGVyUGFyYSk7XG4gICAgICAgICAgICBmb290ZXJQYXJhLnRleHRDb250ZW50ID0gYFxcdTAwQTkgMjAyMiBSYW5kb20gV2ViQml0cy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5gO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUZvb3RlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGYXZpY29uQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBGYXZpY29uIGF0dHJpYnV0aW9uIHNlY3Rpb24gKyBsaW5rIHRvIHNvdXJjZVxuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvblBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25MaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJJY29uSG9tZTogIzQ1MDI2NzU1XCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBcIl9ibGFua1wiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLmhyZWYgPSAnaHR0cHM6Ly93d3cudmVjdG9yc3RvY2suY29tL3JveWFsdHktZnJlZS12ZWN0b3IvbWFpbnRlbmFuY2UtaWNvbi1mb3ItZ3JhcGhpYy1hbmQtd2ViLWRlc2lnbi12ZWN0b3ItNDUwMjY3NTUnXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay50ZXh0Q29udGVudCA9ICdWZWN0b3JTdG9jay5jb20nO1xuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEudGV4dENvbnRlbnQgPSBgRmF2aWNvbiBkZXNpZ25lZCBieSBJY29uSG9tZSBhdCBgO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgYXR0cmlidXRpb24gdG8gZm9vdGVyIHBhcmFcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLmFwcGVuZENoaWxkKGZvb3Rlckljb25MaW5rKTtcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChmb290ZXJJY29uUGFyYSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSEVBREVSRk9PVEVSOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0RWxlbWVudHMgfSBmcm9tIFwiLi93aWRnZXRtYXJrdXBlbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdldG9kb2NhY2hlIH0gZnJvbSBcIi4vbG9jYWxzdG9yYWdlY2FjaGVzXCI7XG5cbmNsYXNzIFRvRG9XaWRnZXQge1xuICAgIHB1YmxpYyBzdGF0aWMgdG9kb3NJbkxvY2FsU3RvcmFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgVG9ET3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuXG4gICAgcHVibGljIHN0YXRpYyBzZXRUb0RvTGlzdEVsZW1lbnRzKFRvRG9MaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMpIHtcbiAgICAgICAgVG9Eb1dpZGdldC5Ub0RvRWxlbWVudHMgPSBUb0RvTGlzdEVsZW1lbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG9Eb0xpc3RFbGVtZW50cygpIHtcbiAgICAgICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGFibGUnKSxcbiAgICAgICAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb0RvSXRlbXMnKSxcbiAgICAgICAgICAgIGFkZEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpLFxuICAgICAgICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVG9Eb0VsZW1lbnRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIFxuICAgICAgICAvLyBJbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIC8vIERlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgICAgICAvLyBTd2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9kaXN0L2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRhYmxlIGVsZW1lbnRzIG5lZWRlZCBmb3IgdGhlIHRvZG8gbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kb2xpc3RTZWN0aW9uID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVhZCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIxID0gdGhlYWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aG1pZGRsZSA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRib2R5ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIzID0gdGZvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNsZWZ0ID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzbWlkZGxlID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSU5QVVQgPSB0ZDNtaWRkbGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcIlZhbHVlXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhsZWZ0LnRleHRDb250ZW50ID0gXCJDb21wbGV0ZT9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uaWQgPSBcIkFkZEJ1dHRvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIChpdCBpcyBub3Qgc3RvcmVkIGluIGNhY2hlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RFbGVtZW50czpUb0RvTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvV2lkZ2V0LnNldFRvRG9MaXN0RWxlbWVudHMobGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFya3VwIGV4aXN0cyBvbiB0aGUgcGFnZSBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0RWxlbWVudHNQYWdlczpUb0RvTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvV2lkZ2V0LnNldFRvRG9MaXN0RWxlbWVudHMobGlzdEVsZW1lbnRzUGFnZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IFRvRG9XaWRnZXQuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKGh0Ym9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInVG9Eb0l0ZW1zJyBlbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJUb0RvTGlzdFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZXJlIGlzIG5vIFwiVG9Eb0xpc3RcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYClcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzVG9Eb0luU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHRvZG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuICAgICAgICBpZiAodG9kb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IFRvRG86IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSA9IHtcbiAgICAgICAgICAgIGluQ2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9kb2l0ZW06IGRlc2NyaXB0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBUb0RvczogYW55ID0gW107XG4gICAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAgIC8vYWRkIHRoZSBUb0RvcyB0byBsb2NhbCBjYWNoZVxuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodG9kb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KFRvRG9zKSk7XG4gICAgICAgICAgICAgICAgVG9Eb1dpZGdldC50b2Rvc0luTG9jYWxTdG9yYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RvRG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gc3RvcmluZyBUby1kbyBsaXN0IGl0ZW06IFwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghVG9Eb1dpZGdldC5pc1RvRG9JblN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbCBzdG9yYWdlIHZhbHVlcyBudWxsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0b2RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgICAgIHRvZG9zID0gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRvZG9pdGVtICE9PSBpdGVtKTtcbiAgICAgICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIEFkZFRvRG9Sb3coZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikge1xuICAgICAgICAvL0NyZWF0ZSBhIHRhYmxlIHJvdyB3aXRoIGNoZWNrYm94IGFuZCBkZWxldGUgb3B0aW9uc1xuICAgICAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvV2lkZ2V0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGlmIChUQUJMRUlURU0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Q09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIGZpcnN0IGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQk9YID0gZmlyc3RDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7IC8vQWRkIGNoZWNrYm94XG4gICAgICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgdGhpcmQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZGVsQk9YID0gc2Vjb25kQ09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpIC8vQWRkIGRlbGV0ZWJveFxuXG4gICAgICAgICAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0RlbGV0ZScpO1xuICAgICAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIFRvRG9XaWRnZXQuVG9ET3MgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGRbbnVtXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9XaWRnZXQuVG9ET3MpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uLnRvU3RyaW5nKCk7IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICAgICAgVG9Eb1dpZGdldC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICAgICAgZGVsQk9YLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0RlbGV0ZScpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgICAgIFRBQkxFSVRFTS5hcHBlbmRDaGlsZCh0YWJsZUZyYWcpO1xuXG4gICAgICAgICAgICAvL2FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5EZWxldGVCdXR0b24oZGVsQk9YKTsgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAgICAgICAgICAgLy9hZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgd2VyZSBubyAnVG9Eb0l0ZW1zJyBmb3VuZCBvciB0aGV5IGFyZSBudWxsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZVRvRG9MaXN0KCkge1xuICAgICAgICAvL3JldHJpZXZlIHRvZG8gaXRlbXMgaW4gbG9jYWwgc3RvcmFnZSBhbmQgYWRkIGVhY2ggdG8gdGhlIGxpc3RcbiAgICAgICAgbGV0IHBhcnNlZFRvRG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuXG4gICAgICAgIGlmIChwYXJzZWRUb0RvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZFRvRG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KHBhcnNlZFRvRG9zW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgQUREQlVUVE9OID0gVG9Eb1dpZGdldC5Ub0RvRWxlbWVudHMuYWRkQnV0dG9uO1xuICAgICAgICBjb25zdCBBRERJVEVNRU5URVIgPSBUb0RvV2lkZ2V0LlRvRG9FbGVtZW50cy5hZGRJdGVtVG9FbnRlcjtcbiAgICAgICAgaWYgKEFEREJVVFRPTiAhPSBudWxsICYmIEFERElURU1FTlRFUiAhPSBudWxsKSB7XG4gICAgICAgICAgICBBRERCVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBBRERJVEVNRU5URVIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZS5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgRGVsZXRlQnV0dG9uKGJveDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgIT0gbnVsbCAmJiBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIGxldCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD5ib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgbGV0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb1dpZGdldC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICAgICAgaWYgKHRvZG9UYWJsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gJ0FkZCBhIFRvRE8gSXRlbS4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvV2lkZ2V0LlRvRE9zLS07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZXRvRG9Gcm9tU3RvcmFnZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb25lLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG4gICAgICAgICAgICAgICAgICAgIFRvRG9XaWRnZXQuVG9ET3MtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFibGUnIGVsZW1lbnQgbm90IGZvdW5kIG9yIGl0IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5OiBFbGVtZW50KSB7XG4gICAgICAgIGlmICghVG9Eb1dpZGdldC5pc1RvRG9JblN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc2FtcGxlIGVudHJ5IGluIHRoZSBUb0RvIHRhYmxlIGFzIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIGNvbnN0IHRyMiA9IHRib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgY29uc3QgdGQybGVmdCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMklOID0gdGQybGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMm1pZGRsZSA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMnJpZ2h0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQyREVMID0gdGQycmlnaHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDaGVja2JveFwiKTtcbiAgICAgICAgICAgIHRkMm1pZGRsZS5zZXRBdHRyaWJ1dGUoXCJudW1cIiwgYCR7MX1gKTtcbiAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJlc2V0XCIpO1xuICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgICAgIHRkMm1pZGRsZS50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG9ETyBJdGVtLlwiO1xuICAgICAgICAgICAgVG9Eb1dpZGdldC5Ub0RPcysrO1xuXG4gICAgICAgICAgICAvL1wiZGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCB0b2Rvc1dpZGdldCA9IHtcbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdG8tZG8gd2lkZ2V0LCBjYWxsIGNyZWF0ZVxuICAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9XaWRnZXQoKTtcblxuICAgICAgICAvLyBDcmVhdGVzIHRoZSBtYXJrdXAgbmVlZGVkIGFuZCBpbXBvcnRzIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlLCBjb250YWluaW5nIHRoZSB0b2RvIGl0ZW1zXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgY2FyZHNXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL1dlYkJpdHMnXG5pbXBvcnQgZGljdGlvbmFyeVdpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvZGljdGlvbmFyeXdpZGdldCc7XG5pbXBvcnQgdG9kb3NXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL3RvZG9zJztcbmltcG9ydCBIRUFERVJGT09URVIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcmZvb3Rlcic7XG5pbXBvcnQgZXhwYW5kaW5nTGlzdERPTVdpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvZXhwYW5kaW5nTGlzdERPTVdpZGdldCdcblxuLy8gZW50cnkgcG9pbnRcbigoKSA9PiB7XG4gICAgLy8gRXZlbnQgZmlyZWQgYmVmb3JlIGFzc2V0cyBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZXMsIGFkZCBjYXJkcyB3aWRnZXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMuaHRtbCcpIHtcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy9kb20uaHRtbCcpIHtcbiAgICAgICAgICAgIGV4cGFuZGluZ0xpc3RET01XaWRnZXQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGRpY3Rpb25hcnkgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuICAgICAgICBpZiAoZGljdGlvbmFyeUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXQuaW5pdChkaWN0aW9uYXJ5RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgIGlmICh0b0Rvc0VsZW1lbnQgIT0gbnVsbClcbiAgICAgICAgICAgIHRvZG9zV2lkZ2V0LmluaXQodG9Eb3NFbGVtZW50KTtcbiAgICB9KVxuXG59KSgpOyJdfQ==

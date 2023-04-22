(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var LinkDetails_1 = require("./LinkDetails");
//Icon links used for image Attribution
var AttributionLink = /** @class */ (function (_super) {
    __extends(AttributionLink, _super);
    function AttributionLink(title, innerText, hReference, attributeowner, pageName, articleid) {
        var _this = _super.call(this, title, innerText, pageName, hReference) || this;
        _this.attributeowner = attributeowner;
        _this.articleid = articleid;
        return _this;
    }
    return AttributionLink;
}(LinkDetails_1.default));
exports.default = AttributionLink;

},{"./LinkDetails":2}],2:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
var LinkDetails = /** @class */ (function () {
    function LinkDetails(title, innerText, pageName, hReference) {
        this.title = title,
            this.innerText = innerText,
            this.pageName = pageName,
            this.hReference = hReference;
    }
    return LinkDetails;
}());
exports.default = LinkDetails;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var WebBit = /** @class */ (function () {
    function WebBit(id, articleNumber, name, description, dateCreated, articleLink, cardImage, cardImageALT) {
        this.id = id;
        this.name = name;
        this.articleNumber = articleNumber;
        this.description = description;
        this.dateCreated = dateCreated;
        this.articleLink = articleLink;
        this.cardImage = cardImage;
        this.cardImageALT = cardImageALT;
    }
    return WebBit;
}());
exports.default = WebBit;

},{}],4:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var data_1 = require("./data");
var data_AttributionLinks_1 = require("./data_AttributionLinks");
var cardsWidget = {
    init: function () {
        var cardsArticles = [
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
            cardsWidget.buildArticleCards(data_1.default.shift(), data_AttributionLinks_1.default),
        ];
        var cardsSection = [
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
            var getMultipleRandom = function (arr, num) {
                var shuffled = __spreadArray([], arr, true).sort(function () { return 0.5 - Math.random(); });
                return shuffled.slice(0, num);
            };
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 3);
        }
        var _loop_1 = function (i) {
            if (cardsSection[i] != undefined) {
                //from cards stack, append each to section
                cardsArticles.shift().forEach(function (article) {
                    cardsSection[i].append(article);
                });
            }
            else {
                console.log("There's an error.");
            }
        };
        for (var i = 0; i < cardsSection.length; i++) {
            _loop_1(i);
        }
    },
    buildCardSection: function (name) {
        //Create Artibrary Articles section element and append to Main
        var pageMain = document.querySelector("main");
        if (pageMain != null && pageMain.nodeName === 'MAIN') {
            var AASection = document.createElement("section");
            AASection.classList.add("cards");
            //Create card section heading and div element. Append to section
            var aaHeading = document.createElement('h2');
            aaHeading.innerText = "".concat(name);
            var aaCardsSection = document.createElement('div');
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
    buildArticleCards: function (cardsData, attrlinks) {
        //Map WebBits to a card, each
        var AAs = cardsData.map(function (article) {
            var WebBit = document.createElement('div');
            WebBit.classList.add('card');
            var cardImgTop = document.createElement('div');
            var cardImg = document.createElement('img');
            cardImg.setAttribute('src', article.cardImage);
            cardImg.setAttribute('alt', article.cardImageALT);
            cardImg.setAttribute('Article', article.articleNumber);
            cardImgTop.appendChild(cardImg);
            var cardBody = document.createElement('div');
            cardBody.classList.add("cardBody");
            var cardBodyHeading = document.createElement('h3');
            var cardBodyPara = document.createElement('p');
            var cardBodyLink = document.createElement('a');
            cardBody.appendChild(cardBodyHeading);
            cardBody.appendChild(cardBodyPara);
            cardBody.appendChild(cardBodyLink);
            cardBodyHeading.innerText = article.name;
            attrlinks.map(function (link) {
                //Determine if card image needs attribution panel
                if (cardImg.getAttribute('Article') == link.articleid) { //match WebBit ID to Icon ID
                    cardImgTop.classList.add("flip-card");
                    var cardInner = cardImgTop.appendChild(document.createElement("div"));
                    cardInner.classList.add("inner");
                    var cardFront = cardInner.appendChild(document.createElement("div"));
                    cardFront.classList.add("cardFront");
                    cardFront.appendChild(cardImg);
                    var smallImg = cardImg.cloneNode(false);
                    smallImg.classList.add("imgSmall", "imgPTR");
                    var cardBack = cardInner.appendChild(document.createElement("div"));
                    cardBack.classList.add("cardBack");
                    var backHeading = cardBack.appendChild(document.createElement("h3"));
                    backHeading.textContent = link.attributeowner;
                    cardBack.appendChild(smallImg);
                    var backPara = cardBack.appendChild(document.createElement("p"));
                    backPara.textContent = link.innerText;
                    var attributeLink = cardBody.appendChild(document.createElement("a"));
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

},{"./data":5,"./data_AttributionLinks":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var WebBit_1 = require("./WebBit");
// Create new AA (Arbitrary Article)
var ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup"), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example"), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate"), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo"), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon"), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction"), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo"), new WebBit_1.default("IP Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon"), new WebBit_1.default("HTML Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon"), new WebBit_1.default("Network Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon"), new WebBit_1.default("PowerShell Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon"), new WebBit_1.default("LEARN: DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard"), new WebBit_1.default("LEARN: Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon"));
var GuideShorts = new Array(new WebBit_1.default("Search Verticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon"), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon"), new WebBit_1.default("DevTools", 19, "GUIDE: Dev Tools: Application Tab", "Review site data when clearing the browser history", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon"), new WebBit_1.default("DevToolsTwo", 21, "GUIDE: Dev Tools: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two"));
var Explore = new Array(new WebBit_1.default("nasa", 3, "EXPLORE: NASA Pages", "Check out some NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo"), new WebBit_1.default("Virtual Tour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON"));
var WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"./WebBit":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var AttributionLink_1 = require("./AttributionLink");
var ATTRIBUTIONLINKDATA = [
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
    new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)
];
exports.default = ATTRIBUTIONLINKDATA;

},{"./AttributionLink":1}],7:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
var dictionaryWidget = {
    init: function (elem) {
        var twoelements = dictionaryWidget.buildDictionaryTermSection.createDictionaryWidget(elem);
        dictionaryWidget.buildDictionaryTermSection.updateWordSearch(twoelements);
    },
    requestDictionaryTerm: {
        // API fetch request the data from dictionary api:
        url: "https://api.dictionaryapi.dev/api/v2/entries/en/",
        apiResponseErrorCheck: function (res) {
            if (!res.ok || res.status != 200) {
                throw new Error(res.ok + ": " + res.status);
            }
            return res.json();
        },
        apiData: function (data, elem) {
            dictionaryWidget.createDictionaryTermWithMarkup(data, elem);
        },
        apiGET: function (url, word, elem) {
            //submit validation
            url += word;
            fetch(url)
                .then(function (response) { return dictionaryWidget.requestDictionaryTerm.apiResponseErrorCheck(response); })
                .then(function (data) { return dictionaryWidget.requestDictionaryTerm.apiData(data, elem); })
                .catch(function (e) { return console.error(e); });
        }
    },
    buildDictionaryTermSection: {
        createDictionaryWidget: function (elem) {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("dictionaryWidget")) {
                    var dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
                    if (dictionary != null) {
                        dictionary.id = "dictionary";
                        var artH = dictionary.appendChild(document.createElement("h3"));
                        artH.textContent = "Dictionary Term:";
                        //create dictionary form
                        dictionary.appendChild(document.createElement("div"));
                        var searchForm = dictionary.appendChild(document.createElement("form"));
                        searchForm.id = "dictionary-search";
                        searchForm.action = "index.html";
                        var searchWords = {
                            searchWord: searchForm.appendChild(document.createElement("input")),
                            wordSearch: searchForm.appendChild(document.createElement("button")),
                            dictionaryElem: dictionary
                        };
                        searchWords.searchWord.id = "search-word";
                        searchWords.searchWord.setAttribute('type', 'text');
                        searchWords.searchWord.setAttribute('placeholder', 'Search...');
                        searchWords.searchWord.classList.add("monospace");
                        searchWords.searchWord.setAttribute("aria-label", "Input");
                        searchWords.wordSearch.id = "word-search";
                        searchWords.wordSearch.setAttribute('type', 'button');
                        searchWords.wordSearch.setAttribute("aria-label", "Search");
                        var fontAwesomeSearchIcon = searchWords.wordSearch.appendChild(document.createElement("i"));
                        fontAwesomeSearchIcon.classList.add("fa");
                        fontAwesomeSearchIcon.classList.add("fa-search");
                        var errorSpan = searchForm.appendChild(document.createElement("span"));
                        errorSpan.classList.add("error");
                        return searchWords;
                    }
                    else {
                        console.log("The determined dictionary element is null.");
                    }
                }
                else {
                    console.log("Add \"dictionaryWidget\" class to ".concat(elem.nodeName, " node."));
                }
            }
            else {
                console.log("There is no \"dictionaryWidget\" class on this page.");
            }
        },
        updateWordSearch: function (searchElems) {
            if (searchElems == undefined) {
                console.log("A search element undefined from searchWord | wordSearch");
                return;
            }
            var error = searchElems.searchWord.nextElementSibling;
            searchElems.wordSearch.addEventListener("click", function (event) {
                event.preventDefault();
                var acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value);
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
            });
            searchElems.searchWord.addEventListener("keypress", function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    var acceptedWord = dictionaryWidget.buildDictionaryTermSection.wordValidation(searchElems.searchWord.value);
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
            });
        },
        wordValidation: function (intxt) {
            var trimmed = intxt.trim();
            var lettersRE = new RegExp("^[A-Za-z]{0,45}$");
            if (lettersRE.test(trimmed)) {
                return true;
            }
            else {
                //word is not an acceptable word.`);
                return false;
            }
        }
    },
    createDictionaryTermWithMarkup: function (wordData, searchElems) {
        searchElems.dictionaryElem = document.querySelector("#dictionary");
        var definitionDescription = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr"));
        wordData.map(function (word) {
            //console.log("The word is: ",word)
            var wordTitle = definitionDescription.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map(function (wordType) {
                //console.log("WordType are: ", wordType)
                var wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
                wordTypeH.textContent = wordType.partOfSpeech;
                var wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
                wordType.definitions.map(function (def) {
                    //console.log("Definition is: ", def);
                    var wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                    var definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                    definitionP.textContent = def.definition;
                    definitionP.classList.add("wordDefinition");
                    var addAdjacentElem = function () {
                        definitionP.classList.add("example");
                        //console.log("What are all the selections: ", def);
                        var newP = definitionP.insertAdjacentElement('beforeend', document.createElement("p"));
                        var newPi = newP.appendChild(document.createElement("i"));
                        newPi.textContent = def.example;
                    };
                    //check if key "example" is in definition. If it is, add the example to list
                    "example" in def ? addAdjacentElem() : true == true;
                });
            });
        });
        searchElems.dictionaryElem.appendChild(definitionDescription);
    }
};
exports.default = dictionaryWidget;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkDetails_1 = require("./LinkDetails");
//Header navigation links
var homeNavLink = new LinkDetails_1.default("Index", "Home", "Home", "index.html");
var pagesNavLink = new LinkDetails_1.default("Pages", "Pages", "Pages", "pages.html");
var NAVITEMS = [homeNavLink, pagesNavLink];
var HEADERFOOTER = {
    headerWidget: {
        init: function () {
            var pageMain = document.querySelector('main');
            var siteHeader;
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
        buildHeader: function (main) {
            var siteHeader = document.createElement('header');
            var H1 = document.createElement("H1");
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
        buildNavigation: function () {
            var headerNavFrag = document.createDocumentFragment();
            var headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));
            NAVITEMS.map(function (item) {
                var navListItems = document.createElement("li");
                var navListLinks = document.createElement("a");
                if (window.location.host == 'rhowell476.github.io') {
                    navListLinks.setAttribute('href', "/RandomWebBits/".concat(item.hReference));
                }
                else {
                    navListLinks.setAttribute('href', "/".concat(item.hReference));
                }
                navListLinks.textContent = "".concat(item.innerText);
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
            });
            return headerNavFrag;
        }
    },
    footerWidget: {
        init: function () {
            var footer = HEADERFOOTER.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HEADERFOOTER.footerWidget.buildFaviconAttribution(footer));
        },
        buildFooter: function () {
            var siteFooter = document.createElement("footer");
            var footerPara = document.createElement("p");
            footerPara.textContent = "\u00A9 2022 Random WebBits. All Rights Reserved.";
            siteFooter.append(footerPara);
            return siteFooter;
        },
        buildFaviconAttribution: function (footer) {
            //Favicon designed by IconHome attribution
            var footerIconPara = document.createElement("p");
            var footerIconLink = document.createElement("a");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755';
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = "Favicon designed by IconHome at ";
            footerIconPara.appendChild(footerIconLink);
            footer.appendChild(footerIconPara);
            return footerIconPara;
        }
    }
};
exports.default = HEADERFOOTER;

},{"./LinkDetails":2}],9:[function(require,module,exports){
"use strict";
//--Copyright (c) Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
var todosWidget = {
    init: function (elem) {
        todosWidget.toDosListSection.createToDoListWidget(elem);
    },
    toDosListSection: {
        ToDOs: 0,
        createSampleTo_Do: function (tbody) {
            if (localStorage.getItem('ToDos') == null) {
                var tr2 = tbody.appendChild(document.createElement('tr'));
                var td2left = tr2.appendChild(document.createElement('td'));
                var td2IN = td2left.appendChild(document.createElement('input'));
                td2IN.type = "checkbox";
                td2IN.setAttribute("aria-label", "Checkbox");
                var td2middle = tr2.appendChild(document.createElement('td'));
                td2middle.setAttribute("num", "".concat(1));
                todosWidget.toDosListSection.ToDOs++;
                td2middle.textContent = "Add a ToDO Item.";
                var td2right = tr2.appendChild(document.createElement('td'));
                var td2DEL_1 = td2right.appendChild(document.createElement('input'));
                td2IN.setAttribute("aria-label", "Delete");
                td2DEL_1.setAttribute("type", "reset");
                td2DEL_1.setAttribute("value", "Delete");
                //"delete" event listener
                td2DEL_1.addEventListener("click", function () { todosWidget.toDosListSection.DeleteButton(td2DEL_1); });
            }
        },
        AddToDo: function (description, firstPaint) {
            //after "Add" is clicked, insert new table row
            var TABLEITEM = document.getElementById('ToDoItems');
            if (TABLEITEM != null) {
                var tableFrag = document.createDocumentFragment();
                var newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
                var firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
                var checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
                checkBOX.setAttribute('type', 'checkbox');
                checkBOX.setAttribute('aria-label', 'Checkbox');
                var newITEM = newRow.appendChild(document.createElement('td')); //Table second data
                newITEM.textContent = description.toString(); //Populate second col
                newITEM.setAttribute('num', todosWidget.toDosListSection.ToDOs ? (function () {
                    var elem = document.querySelector('#ToDO td[num]');
                    return ((Number(elem === null || elem === void 0 ? void 0 : elem.getAttribute("num")) || -1000) + todosWidget.toDosListSection.ToDOs).toString();
                })() : (1).toString());
                todosWidget.toDosListSection.ToDOs++; //Number of Items
                var secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
                var delBOX_1 = secondCOL.appendChild(document.createElement('input')); //Add deletebox
                delBOX_1.setAttribute('type', 'submit');
                delBOX_1.setAttribute('value', 'Delete');
                checkBOX.setAttribute('aria-label', 'Delete');
                TABLEITEM.appendChild(tableFrag);
                //"delete" event listener
                delBOX_1.addEventListener("click", function () { todosWidget.toDosListSection.DeleteButton(delBOX_1); });
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
        DeleteButton: function (box) {
            if (box.parentNode != null && box.parentNode.previousSibling != null &&
                box.parentNode.previousSibling.previousSibling != null) {
                var rowChkBx = box.parentNode.previousSibling.previousSibling;
                var rowChkBxIN = rowChkBx.childNodes[0];
                var table = document.querySelector('table');
                if (table != null) {
                    var tr = box.parentNode.parentNode;
                    var i = tr.rowIndex;
                    var value = box.parentNode.previousSibling.textContent;
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
        addToDoEventListeners: function () {
            var ADDBUTTON = document.getElementById('AddButton');
            var ADDITEMENTER = document.querySelector('input[name="itemINPUT"]');
            if (ADDBUTTON != null && ADDITEMENTER != null) {
                ADDBUTTON.addEventListener("click", function () {
                    todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                });
                ADDITEMENTER.addEventListener("keydown", function (e) {
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
        populateToDoList: function () {
            //retrieve Storage, add if missing
            var storageToDos = todosWidget.toDoListStorage.getAlltoDoFromStorage();
            if (storageToDos.length > 0) {
                for (var i = 0; i < storageToDos.length; i++) {
                    todosWidget.toDosListSection.AddToDo(storageToDos[i].ToDoItem, false);
                }
            }
        },
        createToDoListWidget: function (elem) {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("ToDoList")) {
                    switch (window.location.pathname) {
                        case '/RandomWebBits/':
                        case '/RandomWebBits/index.html':
                        case '/index.html':
                        case '/':
                        case '/dist/index.html':
                            var todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                            var header = todolistSection.appendChild(document.createElement('h3'));
                            header.textContent = "To-Do:";
                            todolistSection.id = "ToDO";
                            var div = todolistSection.appendChild(document.createElement('div'));
                            var table = div.appendChild(document.createElement('table'));
                            var thead = table.appendChild(document.createElement('thead'));
                            var tr1 = thead.appendChild(document.createElement('tr'));
                            var thleft = tr1.appendChild(document.createElement('th'));
                            thleft.textContent = "Complete?";
                            var thmiddle = tr1.appendChild(document.createElement('th'));
                            thmiddle.textContent = "Description";
                            var tbody = table.appendChild(document.createElement('tbody'));
                            tbody.id = "ToDoItems";
                            todosWidget.toDosListSection.createSampleTo_Do(tbody);
                            var tfoot = table.appendChild(document.createElement('tfoot'));
                            var tr3 = tfoot.appendChild(document.createElement('tr'));
                            var td3left = tr3.appendChild(document.createElement('td'));
                            var td3IN = td3left.appendChild(document.createElement('input'));
                            td3IN.id = "AddButton";
                            td3IN.type = "button";
                            td3IN.setAttribute("aria-label", "Add");
                            td3IN.setAttribute("Value", "Add");
                            var td3middle = tr3.appendChild(document.createElement('td'));
                            var INPUT = td3middle.appendChild(document.createElement('input'));
                            INPUT.setAttribute("name", "itemINPUT");
                            INPUT.setAttribute("type", "text");
                            INPUT.setAttribute("aria-label", "Input");
                            table.appendChild(document.createElement('tfoot'));
                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();
                            break;
                        case '/RandomWebBits/pages/todos.html':
                        case '/pages/todos.html':
                            var htbody = document.querySelector("#ToDoItems");
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
                    console.log("Add \"ToDoList\" class to ".concat(elem.nodeName, " node."));
                }
            }
            else {
                console.log("There is no \"ToDoList\" class on this page.");
            }
        }
    },
    toDoListStorage: {
        getAlltoDoFromStorage: function () {
            var values = localStorage.getItem('ToDos');
            return values ? JSON.parse(values) : [];
        },
        addtoDoToStorage: function (description) {
            var ToDo = {
                ToDoItem: description
            };
            //add the ToDos to local cache
            try {
                if (localStorage.getItem('ToDos') == null) {
                    var todos = [];
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
                else {
                    var storageStr = localStorage.getItem('ToDos');
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
                        var todos = JSON.parse(storageStr);
                        todos.push(ToDo);
                        localStorage.setItem('ToDos', JSON.stringify(todos));
                    }
                }
            }
            catch (err) {
                console.log("Problem storing To-do list item: ", err);
            }
        },
        removetoDoFromStorage: function (item) {
            var storageStr = localStorage.getItem('ToDos');
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
                var todos = JSON.parse(storageStr);
                todos = todos.filter(function (todo) { return todo.ToDoItem !== item; });
                if (todos.length > 0)
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                else
                    localStorage.removeItem('ToDos');
            }
        }
    }
};
exports.default = todosWidget;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) Robert A. Howell
var WebBits_1 = require("./components/WebBits");
var dictionary_1 = require("./components/dictionary");
var todos_1 = require("./components/todos");
var headerfooter_1 = require("./components/headerfooter");
(function () {
    window.addEventListener("DOMContentLoaded", function () {
        if ( //'Index' and 'Pages' route, add cards widget first
        window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '' ||
            window.location.pathname == '/RandomWebBits/pages.html' ||
            window.location.pathname == '/pages.html') {
            WebBits_1.default.init();
        }
        // Add dictionary widget if that class is on a page
        var dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement)
            dictionary_1.default.init(dictionaryElement);
        var toDosElement = document.querySelector(".ToDoList");
        if (toDosElement)
            todos_1.default.init(toDosElement);
    });
    window.addEventListener("DOMContentLoaded", function () {
        // Add the header and footer
        headerfooter_1.default.headerWidget.init();
        headerfooter_1.default.footerWidget.init();
    });
})();

},{"./components/WebBits":4,"./components/dictionary":7,"./components/headerfooter":8,"./components/todos":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvY29tcG9uZW50cy9MaW5rRGV0YWlscy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdC50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvY29tcG9uZW50cy9kYXRhLnRzIiwic3JjL2NvbXBvbmVudHMvZGF0YV9BdHRyaWJ1dGlvbkxpbmtzLnRzIiwic3JjL2NvbXBvbmVudHMvZGljdGlvbmFyeS50cyIsInNyYy9jb21wb25lbnRzL2hlYWRlcmZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL3RvZG9zLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLGtDQUFrQztBQUNsQyw2Q0FBd0M7QUFFeEMsdUNBQXVDO0FBQ3ZDO0lBQThCLG1DQUFXO0lBSXJDLHlCQUNJLEtBQUssRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsU0FBUztRQU5iLFlBU0ksa0JBQU0sS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBR2hEO1FBRkcsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQy9CLENBQUM7SUFDTCxzQkFBQztBQUFELENBakJBLEFBaUJDLENBakI2QixxQkFBVyxHQWlCeEM7QUFFRCxrQkFBZSxlQUFlLENBQUM7Ozs7QUN2Qi9CLGtDQUFrQzs7QUFFbEM7SUFNSSxxQkFBWSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxR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Q0FBQztJQUNHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtRQUN4QyxLQUFLLG1EQUFtRDtRQUNwRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSwyQkFBMkI7WUFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksYUFBYTtZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksMkJBQTJCO1lBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUMzQyxpQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsbURBQW1EO1FBQ25ELElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksaUJBQWlCO1lBQ2pCLG9CQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsSUFBSSxZQUFZO1lBQ1osZUFBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtRQUN4Qyw0QkFBNEI7UUFDNUIsc0JBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsc0JBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxyXG5pbXBvcnQgTGlua0RldGFpbHMgZnJvbSBcIi4vTGlua0RldGFpbHNcIjtcclxuXHJcbi8vSWNvbiBsaW5rcyB1c2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxyXG5jbGFzcyBBdHRyaWJ1dGlvbkxpbmsgZXh0ZW5kcyBMaW5rRGV0YWlscyB7XHJcbiAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nO1xyXG4gICAgYXJ0aWNsZWlkOiBudW1iZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIGlubmVyVGV4dCxcclxuICAgICAgICBoUmVmZXJlbmNlLFxyXG4gICAgICAgIGF0dHJpYnV0ZW93bmVyLFxyXG4gICAgICAgIHBhZ2VOYW1lLFxyXG4gICAgICAgIGFydGljbGVpZFxyXG4gICAgICAgIFxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZW93bmVyID0gYXR0cmlidXRlb3duZXI7XHJcbiAgICAgICAgdGhpcy5hcnRpY2xlaWQgPSBhcnRpY2xlaWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXHJcblxyXG5jbGFzcyBMaW5rRGV0YWlscyB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgaW5uZXJUZXh0OiBzdHJpbmc7XHJcbiAgICBwYWdlTmFtZTogc3RyaW5nO1xyXG4gICAgaFJlZmVyZW5jZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxyXG4gICAgICAgIHRoaXMucGFnZU5hbWUgPSBwYWdlTmFtZSxcclxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtEZXRhaWxzOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcclxuY2xhc3MgV2ViQml0IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgZGF0ZUNyZWF0ZWQ6IERhdGU7XHJcbiAgICBhcnRpY2xlTGluazogc3RyaW5nO1xyXG4gICAgY2FyZEltYWdlOiBzdHJpbmc7XHJcbiAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgIGFydGljbGVOdW1iZXI6IG51bWJlcixcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICBkYXRlQ3JlYXRlZDogRGF0ZSxcclxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxyXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxyXG4gICAgICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQ7XHJcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xyXG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xyXG4gICAgICAgIHRoaXMuY2FyZEltYWdlQUxUID0gY2FyZEltYWdlQUxUXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYkJpdDsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXHJcbmltcG9ydCBXRUJCSVREQVRBIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgQVRUUklCVVRJT05MSU5LREFUQSBmcm9tIFwiLi9kYXRhX0F0dHJpYnV0aW9uTGlua3NcIjtcclxuXHJcbmNvbnN0IGNhcmRzV2lkZ2V0ID0ge1xyXG4gICAgaW5pdDogKCkgPT4ge1xyXG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzID0gW1xyXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxyXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxyXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCksIEFUVFJJQlVUSU9OTElOS0RBVEEpLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBjYXJkc1NlY3Rpb246IEhUTUxEaXZFbGVtZW50W10gPSBbXHJcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmJ1aWxkQ2FyZFNlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIpISxcclxuICAgICAgICAgICAgY2FyZHNXaWRnZXQuYnVpbGRDYXJkU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIikhLFxyXG4gICAgICAgICAgICBjYXJkc1dpZGdldC5idWlsZENhcmRTZWN0aW9uKFwiRXhsb3JlIHRoZSBXZWI6XCIpISxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvL1JvdXRlIENoZWNrcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgbXVsdGlwbGUgcGFnZXNcclxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvJyB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9kaXN0L2luZGV4Lmh0bWwnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFyciwgbnVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZCA9IFsuLi5hcnJdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKDAsIG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1swXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMF0sIDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy9mcm9tIGNhcmRzIHN0YWNrLCBhcHBlbmQgZWFjaCB0byBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZENhcmRTZWN0aW9uOiAobmFtZSkgPT4ge1xyXG4gICAgICAgIC8vQ3JlYXRlIEFydGlicmFyeSBBcnRpY2xlcyBzZWN0aW9uIGVsZW1lbnQgYW5kIGFwcGVuZCB0byBNYWluXHJcbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcclxuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKXtcclxuICAgICAgICAgICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBjYXJkIHNlY3Rpb24gaGVhZGluZyBhbmQgZGl2IGVsZW1lbnQuIEFwcGVuZCB0byBzZWN0aW9uXHJcbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7bmFtZX1gO1xyXG4gICAgICAgICAgICBsZXQgYWFDYXJkc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XHJcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xyXG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFDYXJkc1NlY3Rpb24pO1xyXG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhYUNhcmRzU2VjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGJ1aWxkQXJ0aWNsZUNhcmRzOiAoY2FyZHNEYXRhLCBhdHRybGlua3MpID0+IHtcclxuICAgICAgICAvL01hcCBXZWJCaXRzIHRvIGEgY2FyZCwgZWFjaFxyXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgV2ViQml0LmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcclxuICAgICAgICAgICAgbGV0IGNhcmRJbWdUb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IGNhcmRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcclxuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcclxuICAgICAgICAgICAgY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIpO1xyXG4gICAgICAgICAgICBjYXJkSW1nVG9wLmFwcGVuZENoaWxkKGNhcmRJbWcpO1xyXG4gICAgICAgICAgICBsZXQgY2FyZEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIpO1xyXG4gICAgICAgICAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgICAgICAgICAgbGV0IGNhcmRCb2R5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlIZWFkaW5nKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcclxuICAgICAgICAgICAgY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcclxuICAgICAgICAgICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcclxuICAgICAgICAgICAgYXR0cmxpbmtzLm1hcCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9EZXRlcm1pbmUgaWYgY2FyZCBpbWFnZSBuZWVkcyBhdHRyaWJ1dGlvbiBwYW5lbFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT0gbGluay5hcnRpY2xlaWQpIHsgLy9tYXRjaCBXZWJCaXQgSUQgdG8gSWNvbiBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IGNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEZyb250LmFwcGVuZENoaWxkKGNhcmRJbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEltZy5jbGFzc0xpc3QuYWRkKFwiaW1nU21hbGxcIiwgXCJpbWdQVFJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRCYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IGNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlb3duZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FyZEJvZHlQYXJhLnRleHRDb250ZW50ID0gYXJ0aWNsZS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgY2FyZEJvZHlMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFydGljbGUuYXJ0aWNsZUxpbmspXHJcbiAgICAgICAgICAgIGNhcmRCb2R5TGluay50ZXh0Q29udGVudCA9IFwiR28gdG8gUGFnZVwiO1xyXG5cclxuICAgICAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKGNhcmRJbWdUb3ApO1xyXG4gICAgICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQoY2FyZEJvZHkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFdlYkJpdDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBBQXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhcmRzV2lkZ2V0XHJcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcclxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIlxyXG5cclxuLy8gQ3JlYXRlIG5ldyBBQSAoQXJiaXRyYXJ5IEFydGljbGUpXHJcblxyXG5jb25zdCBBcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcclxuICAgICAgICAxLFxyXG4gICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxyXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDQpLFxyXG4gICAgICAgIFwicGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIixcclxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXHJcbiAgICAgICAgXCJXaG9JcyBMb29rdXBcIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJodG1scmVzcG9uc2VzXCIsXHJcbiAgICAgICAgMixcclxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXHJcbiAgICAgICAgXCJWaWV3IEhUTUwgcGFnZSByZXNwb25zZSBzdGF0dXMgaW5mb3JtYXRpb25cIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxyXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvSFRNTF9GcmFtZXMud2VicFwiLFxyXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcImh0dHBzY2VydFwiLFxyXG4gICAgICAgIDQsXHJcbiAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxyXG4gICAgICAgIFwiU2VsZWN0IHRvIHZpZXcgYSB3ZWJzaXRlJ3MgSFRUUFMgY2VydGlmaWNhdGVcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxyXG4gICAgICAgIFwicGFnZXMvaHR0cHMuaHRtbFwiLFxyXG4gICAgICAgIFwiaW1nL2h0dHBzX2NlcnQud2VicFwiLFxyXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcIndlYlRlY2hcIixcclxuICAgICAgICA1LFxyXG4gICAgICAgIFwiV2FwcGFseXplclwiLFxyXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxyXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDIpLFxyXG4gICAgICAgIFwicGFnZXMvd2VidGVjaC5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcclxuICAgICAgICBcIkJyb3dzZXIgZXh0ZW5zaW9uIGxvZ28uIEEgd2hpdGUgdyBvbiBhIHB1cnBsZSB0aWxlLlwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcImpzb25PYmplY3RcIixcclxuICAgICAgICA2LFxyXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxyXG4gICAgICAgIFwiSlNPTiBvYmplY3Qgbm90YXRpb25cIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCA5KSxcclxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxyXG4gICAgICAgIFwiaW1nL2pzb24ud2VicFwiLFxyXG4gICAgICAgIFwiSlNPTiBsb2dvOiBBIGdyZXkgY2lyY2xlIHdpdGggYXJ0aXN0aWMgc3BpcmFscy5cIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJXaS1GaVwiLFxyXG4gICAgICAgIDcsXHJcbiAgICAgICAgXCJXaS1GaSBWZXJzaW9uXCIsXHJcbiAgICAgICAgXCJEZXRlcm1pbmUgV2lmaSBWZXJzaW9uXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxyXG4gICAgICAgIFwicGFnZXMvd2lmaS5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvd2lmaS53ZWJwXCIsXHJcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJjaGF0R1BUXCIsXHJcbiAgICAgICAgOCxcclxuICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxyXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxyXG4gICAgICAgIFwicGFnZXMvY2hhdGdwdC5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxyXG4gICAgICAgIFwiRGVjb3JhdGl2ZSBBSSBsb2dvXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwicGFpbnQzZFwiLFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgXCJQYWludCAzRFwiLFxyXG4gICAgICAgIFwiRWRpdCBwaWN0dXJlcyBvciBzY3JlZW4gY2FwdHVyZXMgdXNpbmcgcGFpbnQgM0RcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXHJcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcclxuICAgICAgICBcImltZy9wcm90b3R5cGUud2VicFwiLFxyXG4gICAgICAgIFwiQ29sb3JmdWwgcHJvdG90eXBpbmcgaWNvblwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcIkRpY3Rpb25hcnlcIixcclxuICAgICAgICAxMCxcclxuICAgICAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcclxuICAgICAgICBcIkxpc3QgZGljdGlvbmFyeSB0ZXJtcyB1c2luZyBhIGRpY3Rpb25hcnkgQVBJXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxyXG4gICAgICAgIFwicGFnZXMvZGljdGlvbmFyeXdvcmQuaHRtbFwiLFxyXG4gICAgICAgIFwiaW1nL2RpY3Rpb25hcnkud2VicFwiLFxyXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcIkJPSU5DXCIsXHJcbiAgICAgICAgMTEsXHJcbiAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxyXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgNiksXHJcbiAgICAgICAgXCJwYWdlcy9ib2luYy5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcclxuICAgICAgICBcIkJPSU5DIGxvZ29cIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJJUCBBZGRyZXNzXCIsXHJcbiAgICAgICAgMTIsXHJcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxyXG4gICAgICAgIFwiTG9va3VwIHB1YmxpYyBhbmQgbG9jYWwgSVAgYWRkcmVzc2VzXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMTMpLFxyXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcclxuICAgICAgICBcImltZy9pcC53ZWJwXCIsXHJcbiAgICAgICAgXCJJUCBsb2NhdGlvbiBhbmQgYnJvd3NlciBpY29uXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwiSFRNTCBNYXJrdXBcIixcclxuICAgICAgICAxMyxcclxuICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcclxuICAgICAgICBcIlJldmVhbCBIVE1MIHNvdXJjZSBjb2RlIGFuZCBKYXZhU2NyaXB0XCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxyXG4gICAgICAgIFwicGFnZXMvbWFya3VwLmh0bWxcIixcclxuICAgICAgICBcImltZy9IVE1MX3NvdXJjZS53ZWJwXCIsXHJcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxyXG4gICAgICAgIDE1LFxyXG4gICAgICAgIFwiTmV0d29yayBTcGVlZCBUZXN0XCIsXHJcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxyXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDcpLFxyXG4gICAgICAgIFwicGFnZXMvbmV0d29ya3NwZWVkLmh0bWxcIixcclxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcclxuICAgICAgICBcIlNwZWVkIHRlc3QgZGlhbCBpY29uXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcclxuICAgICAgICAxNyxcclxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXHJcbiAgICAgICAgXCJTaW1pbGFyIHRvIGFuIEhERCwgZXhjZXB0IGl0IGlzIG9ubHkgaW4gUG93ZXJTaGVsbFwiLFxyXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIwKSxcclxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvdGVybWluYWwud2VicFwiLFxyXG4gICAgICAgIFwiQ29tcHV0ZXIgdGVybWluYWwgaWNvblwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcIkxFQVJOOiBETlNcIixcclxuICAgICAgICAyMCxcclxuICAgICAgICBcIkhvdyBETlMgd29ya3NcIixcclxuICAgICAgICBcIkEgZ2VuZXJhbCBvdmVydmlldyBvZiBEb21haW4gTmFtZSBTeXN0ZW1cIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcclxuICAgICAgICBcInBhZ2VzL2Rucy5odG1sXCIsXHJcbiAgICAgICAgXCJpbWcvZG5zLndlYnBcIixcclxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgXCJHb29nbGUgaXMgIzEgd2Vic2l0ZVwiLFxyXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxNyksXHJcbiAgICAgICAgXCJwYWdlcy9nb29nbGUuaHRtbFwiLFxyXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxyXG4gICAgICAgIFwiQSBiYXIgZ3JhcGggaWNvblwiXHJcbiAgICApLFxyXG4pO1xyXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXHJcbiAgICAgICAgMTQsXHJcbiAgICAgICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxyXG4gICAgICAgIFwiT3B0aW1pemUgeW91ciBzZWFyY2ggZW5naW5lIG5ld3MgYW5kIHJlc3VsdHNcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXHJcbiAgICAgICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcclxuICAgICAgICBcImltZy9zZWFyY2hfc2V0dGluZ3Mud2VicFwiLFxyXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIlxyXG4gICAgKSxcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJTTVRQXCIsXHJcbiAgICAgICAgMTYsXHJcbiAgICAgICAgXCJHVUlERTogU01UUCBhbmQgRW1haWxcIixcclxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMTMpLFxyXG4gICAgICAgIFwiZ3VpZGVzL3NtdHAuaHRtbFwiLFxyXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcclxuICAgICAgICBcIkVtYWlsIHNlcnZlci1zdGFjayB3aXRoIG1haWwgaWNvblwiXHJcbiAgICApLFxyXG4gICAgbmV3IFdlYkJpdChcclxuICAgICAgICBcIkRldlRvb2xzXCIsXHJcbiAgICAgICAgMTksXHJcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBBcHBsaWNhdGlvbiBUYWJcIixcclxuICAgICAgICBcIlJldmlldyBzaXRlIGRhdGEgd2hlbiBjbGVhcmluZyB0aGUgYnJvd3NlciBoaXN0b3J5XCIsXHJcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjcpLFxyXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcclxuICAgICAgICBcImltZy90b29sLWJveC53ZWJwXCIsXHJcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwiRGV2VG9vbHNUd29cIixcclxuICAgICAgICAyMSxcclxuICAgICAgICBcIkdVSURFOiBEZXYgVG9vbHM6IEluc3BlY3QgUGFnZXNcIixcclxuICAgICAgICBcIk9wZW4gdGhlIGRldmVsb3BlcidzIHRvb2xib3ggYW5vdGhlciB3YXlcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXHJcbiAgICAgICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcclxuICAgICAgICBcImltZy90b29sLWJveDIud2VicFwiLFxyXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIlxyXG4gICAgKSxcclxuKTtcclxuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcclxuICAgIG5ldyBXZWJCaXQoXHJcbiAgICAgICAgXCJuYXNhXCIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICBcIkVYUExPUkU6IE5BU0EgUGFnZXNcIixcclxuICAgICAgICBcIkNoZWNrIG91dCBzb21lIE5BU0EgbGlua3NcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxyXG4gICAgICAgIFwiZXhwbG9yZS9uYXNhLmh0bWxcIixcclxuICAgICAgICBcImltZy9OQVNBLndlYnBcIixcclxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCJcclxuICAgICksXHJcbiAgICBuZXcgV2ViQml0KFxyXG4gICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXHJcbiAgICAgICAgMTgsXHJcbiAgICAgICAgXCJFWFBMT1JFOiBWaXJ0dWFsIFRvdXJzXCIsXHJcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcclxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMyksXHJcbiAgICAgICAgXCJleHBsb3JlL3ZpcnR1YWx0b3VyLmh0bWxcIixcclxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxyXG4gICAgICAgIFwiR29vZ2xlIEV4cGVkaXRpb25zIGxvZ28gZnJvbSBGTEFUSUNPTlwiXHJcbiAgICApLFxyXG4pO1xyXG5cclxuY29uc3QgV0VCQklUREFUQSA9IFtBcmJpdHJhcnlBcnRpY2xlcywgR3VpZGVTaG9ydHMsIEV4cGxvcmVdXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXRUJCSVREQVRBOyIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcclxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi9BdHRyaWJ1dGlvbkxpbmtcIjtcclxuXHJcbmxldCBBVFRSSUJVVElPTkxJTktEQVRBID0gW1xyXG5cclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwiZG9tYWluIGljb25zXCIsXHJcbiAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiRG9tYWluIExvb2t1cFwiLFxyXG4gICAgMVxyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwiY29kZSBpY29uc1wiLFxyXG4gICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvZGVcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxyXG4gICAgMlxyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwic3NsIGNlcnRpZmljYXRlIGljb25zXCIsXHJcbiAgICBcIlNzbCBjZXJ0aWZpY2F0ZSBpY29ucyBjcmVhdGVkIGJ5IGluaXBhZ2lzdHVkaW8gLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zc2wtY2VydGlmaWNhdGVcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcclxuICAgIDRcclxuICAgICksXHJcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXHJcbiAgICBcImFpIGljb25zXCIsXHJcbiAgICBcIkFpIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2FpXCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxyXG4gICAgOFxyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwicHJvdG90eXBlIGljb25zXCIsXHJcbiAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wcm90b3R5cGVcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiUGFpbnQgM0RcIixcclxuICAgIDlcclxuICAgICksXHJcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXHJcbiAgICBcImRpY3Rpb25hcnkgaWNvbnNcIixcclxuICAgIFwiRGljdGlvbmFyeSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kaWN0aW9uYXJ5XCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcclxuICAgIDEwXHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rIChcclxuICAgIFwiQk9JTkMgaWNvbnNcIixcclxuICAgIFwiQk9JTkMgaWNvbiBkZXNpZ25lZCBieSBNaWNoYWwgS3Jha293aWFrLiBDb3lyaWdodChDKSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWFcIixcclxuICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcclxuICAgIFwiQk9JTkNcIixcclxuICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcclxuICAgIDExXHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJJUCBpY29uc1wiLFxyXG4gICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxyXG4gICAgXCJGbGF0aWNvblwiLFxyXG4gICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxyXG4gICAgMTJcclxuICAgICksXHJcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXHJcbiAgICBcImh0bWwgaWNvbnNcIixcclxuICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIkhUTUwgU291cmNlIENvZGVcIixcclxuICAgIDEzXHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcclxuICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcclxuICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcclxuICAgIDE0XHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXHJcbiAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIk5ldHdvcmsgU3BlZWRcIixcclxuICAgIDE1XHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJzZXJ2ZXIgaWNvbnNcIixcclxuICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxyXG4gICAgXCJGbGF0aWNvblwiLFxyXG4gICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxyXG4gICAgMTZcclxuICAgICksXHJcbm5ldyBBdHRyaWJ1dGlvbkxpbmsoXHJcbiAgICBcInRlcm1pbmFsIGljb25zXCIsXHJcbiAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXHJcbiAgICBcIkZsYXRpY29uXCIsXHJcbiAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXHJcbiAgICAxN1xyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwiZ29vZ2xlIGV4cGVkaXRpb25zIGljb25zXCIsXHJcbiAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxyXG4gICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiVmlydHVhbCBUb3VyXCIsXHJcbiAgICAxOFxyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwidG9vbGJveCBpY29uc1wiLFxyXG4gICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiRGV2VG9vbHNcIixcclxuICAgIDE5XHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJkbnMgaWNvbnNcIixcclxuICAgIFwiRG5zIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxyXG4gICAgXCJGbGF0aWNvblwiLFxyXG4gICAgXCJMRUFSTjogRE5TXCIsXHJcbiAgICAyMFxyXG4gICAgKSxcclxubmV3IEF0dHJpYnV0aW9uTGluayhcclxuICAgIFwidG9vbGJveCBpY29uc1wiLFxyXG4gICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiRGV2VG9vbHNUd29cIixcclxuICAgIDIxXHJcbiAgICApLFxyXG5uZXcgQXR0cmlidXRpb25MaW5rKFxyXG4gICAgXCJyYW5rIGljb25zXCIsXHJcbiAgICBcIlJhbmsgaWNvbnMgY3JlYXRlZCBieSBQaXhlbG1lZXR1cCAtIEZsYXRpY29uXCIsXHJcbiAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcclxuICAgIFwiRmxhdGljb25cIixcclxuICAgIFwiTEVBUk46IEdvb2dsZVwiLFxyXG4gICAgMjJcclxuICAgIClcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFUVFJJQlVUSU9OTElOS0RBVEE7IiwiLy8tLUNvcHlyaWdodCAoYykgUm9iZXJ0IEEuIEhvd2VsbFxyXG5cclxuaW50ZXJmYWNlIFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtIHtcclxuICAgIHNlYXJjaFdvcmQ6IGFueTtcclxuICAgIHdvcmRTZWFyY2g6IGFueTtcclxuICAgIGRpY3Rpb25hcnlFbGVtOiBhbnk7XHJcbn1cclxuXHJcbmNvbnN0IGRpY3Rpb25hcnlXaWRnZXQgPSB7XHJcbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHZhciB0d29lbGVtZW50cyA9IGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24uY3JlYXRlRGljdGlvbmFyeVdpZGdldChlbGVtKTtcclxuICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmJ1aWxkRGljdGlvbmFyeVRlcm1TZWN0aW9uLnVwZGF0ZVdvcmRTZWFyY2godHdvZWxlbWVudHMpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3REaWN0aW9uYXJ5VGVybToge1xyXG4gICAgICAgIC8vIEFQSSBmZXRjaCByZXF1ZXN0IHRoZSBkYXRhIGZyb20gZGljdGlvbmFyeSBhcGk6XHJcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiLFxyXG4gICAgICAgIGFwaVJlc3BvbnNlRXJyb3JDaGVjazogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpRGF0YTogKGRhdGEsIGVsZW0pID0+IHtcclxuICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgZWxlbSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcGlHRVQ6ICh1cmwsIHdvcmQsIGVsZW0pID0+IHtcclxuICAgICAgICAgICAgLy9zdWJtaXQgdmFsaWRhdGlvblxyXG4gICAgICAgICAgICB1cmwgKz0gd29yZDtcclxuICAgICAgICAgICAgZmV0Y2godXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBkaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3REaWN0aW9uYXJ5VGVybS5hcGlSZXNwb25zZUVycm9yQ2hlY2socmVzcG9uc2UpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRpY3Rpb25hcnlXaWRnZXQucmVxdWVzdERpY3Rpb25hcnlUZXJtLmFwaURhdGEoZGF0YSwgZWxlbSkpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb246ICB7XHJcbiAgICAgICAgY3JlYXRlRGljdGlvbmFyeVdpZGdldDogKGVsZW06IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkgeyAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnkuaWQgPSBcImRpY3Rpb25hcnlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJ0SC50ZXh0Q29udGVudCA9IFwiRGljdGlvbmFyeSBUZXJtOlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NyZWF0ZSBkaWN0aW9uYXJ5IGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hGb3JtLmlkID0gXCJkaWN0aW9uYXJ5LXNlYXJjaFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VhcmNoV29yZHM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZFNlYXJjaDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlFbGVtOiBkaWN0aW9uYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaC4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFdvcmRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoIC5pZCA9IFwid29yZC1zZWFyY2hcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZHMud29yZFNlYXJjaCAuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoIC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hXb3Jkcy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yU3BhbiA9IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclNwYW4uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFdvcmRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVXb3JkU2VhcmNoOiAoc2VhcmNoRWxlbXM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hFbGVtcyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLndvcmRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdGVkV29yZCA9IGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24ud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjZXB0ZWRXb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldC5yZXF1ZXN0RGljdGlvbmFyeVRlcm0uYXBpR0VUKGRpY3Rpb25hcnlXaWRnZXQucmVxdWVzdERpY3Rpb25hcnlUZXJtLnVybCwgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSwgc2VhcmNoRWxlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMud29yZFNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy53b3JkU2VhcmNoLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdGVkV29yZCA9IGRpY3Rpb25hcnlXaWRnZXQuYnVpbGREaWN0aW9uYXJ5VGVybVNlY3Rpb24ud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjY2VwdGVkV29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LnJlcXVlc3REaWN0aW9uYXJ5VGVybS5hcGlHRVQoZGljdGlvbmFyeVdpZGdldC5yZXF1ZXN0RGljdGlvbmFyeVRlcm0udXJsLCBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCBzZWFyY2hFbGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLndvcmRTZWFyY2guY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMud29yZFNlYXJjaC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IudGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3b3JkVmFsaWRhdGlvbjogKGludHh0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xyXG4gICAgICAgICAgICBsZXQgbGV0dGVyc1JFID0gbmV3IFJlZ0V4cChcIl5bQS1aYS16XXswLDQ1fSRcIik7XHJcbiAgICAgICAgICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXA6ICh3b3JkRGF0YSwgc2VhcmNoRWxlbXM6IFNjaFdvcmRTY2hCdXR0b25EaWNFbGVtKSA9PiB7XHJcbiAgICAgICAgc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RpY3Rpb25hcnlcIik7XHJcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7XHJcblxyXG4gICAgICAgIHdvcmREYXRhLm1hcCgod29yZCkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIHdvcmQgaXM6IFwiLHdvcmQpXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xyXG4gICAgICAgICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSB3b3JkIGFuZCBleGFtcGxlcyB0byBwYWdlXHJcbiAgICAgICAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XHJcbiAgICAgICAgICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkVHlwZUxpc3QgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpKTtcclxuICAgICAgICAgICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3b3JkVHlwZURlZkl0ZW0gPSB3b3JkVHlwZUxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIldoYXQgYXJlIGFsbCB0aGUgc2VsZWN0aW9uczogXCIsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UGkgPSBuZXdQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7IiwiaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4vTGlua0RldGFpbHMnO1xyXG5cclxuLy9IZWFkZXIgbmF2aWdhdGlvbiBsaW5rc1xyXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcclxuICAgIFwiSW5kZXhcIixcclxuICAgIFwiSG9tZVwiLFxyXG4gICAgXCJIb21lXCIsXHJcbiAgICBcImluZGV4Lmh0bWxcIlxyXG4pO1xyXG5cclxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxyXG4gICAgXCJQYWdlc1wiLFxyXG4gICAgXCJQYWdlc1wiLFxyXG4gICAgXCJQYWdlc1wiLFxyXG4gICAgXCJwYWdlcy5odG1sXCJcclxuKVxyXG5jb25zdCBOQVZJVEVNUyA9IFtob21lTmF2TGluaywgcGFnZXNOYXZMaW5rXTtcclxuXHJcbmNvbnN0IEhFQURFUkZPT1RFUiA9IHtcclxuICAgIGhlYWRlcldpZGdldDoge1xyXG4gICAgICAgIGluaXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcclxuICAgICAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgKXtcclxuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBwYWdlTWFpbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZEhlYWRlciggcGFnZU1haW4gKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZUhlYWRlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIucHJlcGVuZChIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGJlZm9yZSAnbWFpbicgZWxlbWVudC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBIRUFERVJGT09URVIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCBudWxsICkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNpdGVIZWFkZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLnByZXBlbmQoSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBhZnRlciAnYm9keScgZWxlbWVudC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkSGVhZGVyOiAobWFpbjogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcclxuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XHJcbiAgICAgICAgICAgIEgxLnRleHRDb250ZW50ID0gJzxSYW5kb20gV2ViIEJpdHM+JzsgLy9IMSBMb2dvXHJcbiAgICAgICAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcclxuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoSDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1haW4gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBtYWluLnByZXBlbmQoc2l0ZUhlYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wcmVwZW5kKHNpdGVIZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXZGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XHJcblxyXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyaG93ZWxsNDc2LmdpdGh1Yi5pbycpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XHJcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTmF2LmFwcGVuZChuYXZMaXN0SXRlbXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb290ZXJXaWRnZXQ6IHtcclxuICAgICAgICBpbml0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChmb290ZXIpO1xyXG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kKEhFQURFUkZPT1RFUi5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidWlsZEZvb3RlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcclxuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBmb290ZXJQYXJhLnRleHRDb250ZW50ID0gYFxcdTAwQTkgMjAyMiBSYW5kb20gV2ViQml0cy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5gO1xyXG4gICAgICAgICAgICBzaXRlRm9vdGVyLmFwcGVuZChmb290ZXJQYXJhKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzaXRlRm9vdGVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGRGYXZpY29uQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vRmF2aWNvbiBkZXNpZ25lZCBieSBJY29uSG9tZSBhdHRyaWJ1dGlvblxyXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xyXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJJY29uSG9tZTogIzQ1MDI2NzU1XCIpO1xyXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xyXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay50ZXh0Q29udGVudCA9ICdWZWN0b3JTdG9jay5jb20nO1xyXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XHJcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLmFwcGVuZENoaWxkKGZvb3Rlckljb25MaW5rKTtcclxuICAgICAgICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKGZvb3Rlckljb25QYXJhKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhFQURFUkZPT1RFUjsiLCIvLy0tQ29weXJpZ2h0IChjKSBSb2JlcnQgQS4gSG93ZWxsXHJcblxyXG5pbnRlcmZhY2UgVG9EbyAge1xyXG4gICAgVG9Eb0l0ZW06IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgdG9kb3NXaWRnZXQgPSB7XHJcbiAgICBpbml0OiAoZWxlbSkgPT4ge1xyXG4gICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XHJcbiAgICB9LFxyXG4gICAgdG9Eb3NMaXN0U2VjdGlvbjoge1xyXG4gICAgICAgIFRvRE9zOiAwLFxyXG5cclxuICAgICAgICBjcmVhdGVTYW1wbGVUb19EbzogKHRib2R5OiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICB0ZDJJTi50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgICAgICAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xyXG4gICAgICAgICAgICAgICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xyXG4gICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcysrO1xyXG4gICAgICAgICAgICAgICAgdGQybWlkZGxlLnRleHRDb250ZW50ID0gXCJBZGQgYSBUb0RPIEl0ZW0uXCJcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRkMnJpZ2h0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGQyREVMID0gdGQycmlnaHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1wiZGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICAgICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLkRlbGV0ZUJ1dHRvbih0ZDJERUwpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBBZGRUb0RvOiAoZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAvL2FmdGVyIFwiQWRkXCIgaXMgY2xpY2tlZCwgaW5zZXJ0IG5ldyB0YWJsZSByb3dcclxuICAgICAgICAgICAgY29uc3QgVEFCTEVJVEVNID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RvRG9JdGVtcycpO1xyXG4gICAgICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGVGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIGZpcnN0IGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQk9YID0gZmlyc3RDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7IC8vQWRkIGNoZWNrYm94XHJcbiAgICAgICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SVRFTSA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxyXG4gICAgICAgICAgICAgICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uLnRvU3RyaW5nKCk7IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxyXG4gICAgICAgICAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MgPyAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGRbbnVtXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uVG9ET3MpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcclxuICAgICAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XHJcbiAgICAgICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdEZWxldGUnKTtcclxuICAgICAgICAgICAgICAgIFRBQkxFSVRFTS5hcHBlbmRDaGlsZCh0YWJsZUZyYWcpO1xyXG4gICAgICAgICAgICAgICAgLy9cImRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5EZWxldGVCdXR0b24oZGVsQk9YKTsgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFBhaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgdG8gbGlzdCBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb0xpc3RTdG9yYWdlLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSB3ZXJlIG5vICdUb0RvSXRlbXMnIGZvdW5kIG9yIHRoZXkgYXJlIG51bGwuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIERlbGV0ZUJ1dHRvbjogKGJveDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgIT0gbnVsbCAmJiBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PmJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PiByb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFibGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuZGVsZXRlUm93KGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLlRvRE9zLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0RvTGlzdFN0b3JhZ2UucmVtb3ZldG9Eb0Zyb21TdG9yYWdlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuZGVsZXRlUm93KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLlRvRE9zLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhYmxlJyBlbGVtZW50IG5vdCBmb3VuZCBvciBpdCBpcyBudWxsLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IEFEREJVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKTtcclxuICAgICAgICAgICAgY29uc3QgQURESVRFTUVOVEVSOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIml0ZW1JTlBVVFwiXScpITtcclxuICAgICAgICAgICAgaWYoQUREQlVUVE9OICE9IG51bGwgJiYgQURESVRFTUVOVEVSICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5BZGRUb0RvKEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uQWRkVG9EbyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwb3B1bGF0ZVRvRG9MaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vcmV0cmlldmUgU3RvcmFnZSwgYWRkIGlmIG1pc3NpbmdcclxuICAgICAgICAgICAgbGV0IHN0b3JhZ2VUb0RvcyA9IHRvZG9zV2lkZ2V0LnRvRG9MaXN0U3RvcmFnZS5nZXRBbGx0b0RvRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2VUb0Rvcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JhZ2VUb0Rvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24uQWRkVG9EbyhzdG9yYWdlVG9Eb3NbaV0uVG9Eb0l0ZW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlVG9Eb0xpc3RXaWRnZXQ6IChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHsgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvZGlzdC9pbmRleC5odG1sJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhsZWZ0ID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhsZWZ0LnRleHRDb250ZW50ID0gXCJDb21wbGV0ZT9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhtaWRkbGUudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIzID0gdGZvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNsZWZ0ID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uaWQgPSBcIkFkZEJ1dHRvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24ucG9wdWxhdGVUb0RvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy9wYWdlcy90b2Rvcy5odG1sJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjVG9Eb0l0ZW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0Ym9keSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2Rvc1dpZGdldC50b0Rvc0xpc3RTZWN0aW9uLmNyZWF0ZVNhbXBsZVRvX0RvKGh0Ym9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInVG9Eb0l0ZW1zJyBlbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9zV2lkZ2V0LnRvRG9zTGlzdFNlY3Rpb24ucG9wdWxhdGVUb0RvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3NXaWRnZXQudG9Eb3NMaXN0U2VjdGlvbi5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvRG9MaXN0U3RvcmFnZToge1xyXG4gICAgICAgIGdldEFsbHRvRG9Gcm9tU3RvcmFnZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMgPyBKU09OLnBhcnNlKHZhbHVlcykgOiBbXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZHRvRG9Ub1N0b3JhZ2U6IChkZXNjcmlwdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgVG9EbzogVG9EbyA9ICB7XHJcbiAgICAgICAgICAgICAgICBUb0RvSXRlbTogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9hZGQgdGhlIFRvRG9zIHRvIGxvY2FsIGNhY2hlXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdG9kb3MucHVzaChUb0RvKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgdmFsdWVzIG51bGwuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb3MucHVzaChUb0RvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RvRG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlOiAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsIHN0b3JhZ2UgdmFsdWVzIG51bGwuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvczogVG9Eb1tdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcclxuICAgICAgICAgICAgICAgIHRvZG9zID0gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLlRvRG9JdGVtICE9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1RvRG9zJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9kb3NXaWRnZXQ7XHJcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIFJvYmVydCBBLiBIb3dlbGxcclxuaW1wb3J0IGNhcmRzV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9XZWJCaXRzJ1xyXG5pbXBvcnQgZGljdGlvbmFyeVdpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvZGljdGlvbmFyeSc7XHJcbmltcG9ydCB0b2Rvc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvdG9kb3MnO1xyXG5pbXBvcnQgSEVBREVSRk9PVEVSIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXJmb290ZXInO1xyXG5cclxuKCgpID0+IHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCAvLydJbmRleCcgYW5kICdQYWdlcycgcm91dGUsIGFkZCBjYXJkcyB3aWRnZXQgZmlyc3RcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9pbmRleC5odG1sJyB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL3BhZ2VzLmh0bWwnIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzLmh0bWwnKSB7XHJcbiAgICAgICAgICAgIGNhcmRzV2lkZ2V0LmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGRpY3Rpb25hcnkgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpY3Rpb25hcnlXaWRnZXRcIik7XHJcbiAgICAgICAgaWYgKGRpY3Rpb25hcnlFbGVtZW50KVxyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmluaXQoZGljdGlvbmFyeUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xyXG4gICAgICAgIGlmICh0b0Rvc0VsZW1lbnQpXHJcbiAgICAgICAgICAgIHRvZG9zV2lkZ2V0LmluaXQodG9Eb3NFbGVtZW50KTtcclxuICAgIH0pXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgICAgICAvLyBBZGQgdGhlIGhlYWRlciBhbmQgZm9vdGVyXHJcbiAgICAgICAgSEVBREVSRk9PVEVSLmhlYWRlcldpZGdldC5pbml0KCk7XHJcbiAgICAgICAgSEVBREVSRk9PVEVSLmZvb3RlcldpZGdldC5pbml0KCk7XHJcbiAgICB9KVxyXG5cclxufSkoKTsiXX0=

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const classComponents_1 = __importDefault(require("./classComponents"));
const webBits_1 = require("./components/webBits");
const flashcardGameWidget_1 = __importDefault(require("./components/flashcardGameWidget"));
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const cardComponents = {
    checkPage: (page) => {
        classComponents_1.default.fourohfour();
        switch (page) {
            case "/RandomWebBits/index.html":
            case "/index.html":
            case "/":
            case "/RandomWebBits/pages.html":
            case "/pages.html":
                webBits_1.rwbCardsWidget.init(); // cards widget initialization
                webBits_1.webBitsSlideShow.init();
                webBits_1.webBitsAccordion.init();
                break;
            // Initialize flashcard components
            case "/flashcards.html":
                flashcardGameWidget_1.default.init();
                break;
        }
    },
    init: () => {
        let page = window.location.pathname;
        const pagePerf = new scriptPerf_1.default("Cardcomponents"); //measure performance
        cardComponents.checkPage(page);
        pagePerf.end(); //end performance measure
    },
    load: () => { },
};
window.addEventListener("DOMContentLoaded", cardComponents.init);

},{"./classComponents":2,"./components/flashcardGameWidget":5,"./components/webBits":7,"./models/scriptPerf":23}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const toDosWidget_1 = __importDefault(require("./components/toDosWidget"));
const dictionaryWidget_1 = __importDefault(require("./components/dictionaryWidget"));
const _404_1 = __importDefault(require("./components/404"));
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const rwbErrorBus_1 = __importDefault(require("./models/rwbErrorBus"));
const abbrDescription_1 = __importDefault(require("./models/abbrDescription"));
const classComponents = {
    /**
     * Attribute tags on mobile do not have hover option. This function adds a click
     *  ability to define an abbr tag, than rely on the title attribute.
     */
    abbrDefinitions: () => {
        const mobileabbrperf = new scriptPerf_1.default("Mobileabbrperf"); //start performance measure
        /**Give all abbr elements option to click to reveal the expanded description. */
        const allabbreviationelems = document.querySelectorAll("abbr");
        if (allabbreviationelems.length > 0) {
            for (let abbr of allabbreviationelems) {
                let abbrev = new abbrDescription_1.default(abbr);
                abbrev.revealAbbrDescription();
            }
        }
        mobileabbrperf.end(); //end performance measure
    },
    fourohfour: () => {
        if (!rwbErrorBus_1.default.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
            _404_1.default.init();
        }
    },
    init: (page) => {
        const classperf = new scriptPerf_1.default("Classcomponents"); //begin performance measure
        // Add Dictionary Widget if an element with that class is on a page
        if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
            if (rwbErrorBus_1.default.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true))
                return;
            dictionaryWidget_1.default.init();
        }
        // Add ToDos widget if an element with that class is on a page
        if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
            if (rwbErrorBus_1.default.checkElementforNull("ClassComponent", ".ToDoList", true, true))
                return;
            toDosWidget_1.default.init();
        }
        // Add abbr definitions
        classComponents.abbrDefinitions();
        // Add RWB links definitions: appends ".html" to anchor href text (which is natively removed in Netlify)
        classComponents.rwbDataTypeAnchor();
        classperf.end(); //end performance measure
    },
    rwbDataTypeAnchor: () => {
        switch (location.pathname) {
            case "/guides/clearcookiesquickly.html":
                const rwbLink0 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink0[0].href = "/guides/devtools/applicationtab.html";
                break;
            case "/guides/devtools/applicationtab.html":
                const rwbLink1 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink1[0].href = "/guides/devtools/elementstab.html";
                rwbLink1[1].href = "/guides/devtools/consoletab.html";
                rwbLink1[2].href = "/guides/devtools/sourcestab.html";
                rwbLink1[3].href = "/guides/devtools/networktab.html";
                rwbLink1[4].href = "/guides/devtools/performancetab.html";
                rwbLink1[5].href = "/guides/devtools/memorytab.html";
                rwbLink1[6].href = "/guides/devtools/applicationtab.html";
                rwbLink1[7].href = "/guides/devtools/securitytab.html";
                rwbLink1[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink1[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink1[10].href = "/guides/clearcookiesquickly.html";
                break;
            case "/guides/devtools/consoletab.html":
                const rwbLink2 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink2[0].href = "/guides/devtools/elementstab.html";
                rwbLink2[1].href = "/guides/devtools/consoletab.html";
                rwbLink2[2].href = "/guides/devtools/sourcestab.html";
                rwbLink2[3].href = "/guides/devtools/networktab.html";
                rwbLink2[4].href = "/guides/devtools/performancetab.html";
                rwbLink2[5].href = "/guides/devtools/memorytab.html";
                rwbLink2[6].href = "/guides/devtools/applicationtab.html";
                rwbLink2[7].href = "/guides/devtools/securitytab.html";
                rwbLink2[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink2[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink2[10].href = "/explore/webbtelescope.html";
                rwbLink2[11].href = "/pages/dom.html";
                break;
            case "/guides/devtools/elementstab.html":
                const rwbLink3 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink3[0].href = "/guides/devtools/elementstab.html";
                rwbLink3[1].href = "/guides/devtools/consoletab.html";
                rwbLink3[2].href = "/guides/devtools/sourcestab.html";
                rwbLink3[3].href = "/guides/devtools/networktab.html";
                rwbLink3[4].href = "/guides/devtools/performancetab.html";
                rwbLink3[5].href = "/guides/devtools/memorytab.html";
                rwbLink3[6].href = "/guides/devtools/applicationtab.html";
                rwbLink3[7].href = "/guides/devtools/securitytab.html";
                rwbLink3[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink3[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink3[10].href = "/pages/dom.html";
                break;
            case "/guides/devtools/memorytab.html":
                const rwbLink4 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink4[0].href = "/guides/devtools/elementstab.html";
                rwbLink4[1].href = "/guides/devtools/consoletab.html";
                rwbLink4[2].href = "/guides/devtools/sourcestab.html";
                rwbLink4[3].href = "/guides/devtools/networktab.html";
                rwbLink4[4].href = "/guides/devtools/performancetab.html";
                rwbLink4[5].href = "/guides/devtools/memorytab.html";
                rwbLink4[6].href = "/guides/devtools/applicationtab.html";
                rwbLink4[7].href = "/guides/devtools/securitytab.html";
                rwbLink4[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink4[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/networktab.html":
                const rwbLink5 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink5[0].href = "/guides/devtools/elementstab.html";
                rwbLink5[1].href = "/guides/devtools/consoletab.html";
                rwbLink5[2].href = "/guides/devtools/sourcestab.html";
                rwbLink5[3].href = "/guides/devtools/networktab.html";
                rwbLink5[4].href = "/guides/devtools/performancetab.html";
                rwbLink5[5].href = "/guides/devtools/memorytab.html";
                rwbLink5[6].href = "/guides/devtools/applicationtab.html";
                rwbLink5[7].href = "/guides/devtools/securitytab.html";
                rwbLink5[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink5[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink5[10].href = "/pages/htmlresponses.html";
                break;
            case "/guides/devtools/performancetab.html":
                const rwbLink6 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink6[0].href = "/guides/devtools/elementstab.html";
                rwbLink6[1].href = "/guides/devtools/consoletab.html";
                rwbLink6[2].href = "/guides/devtools/sourcestab.html";
                rwbLink6[3].href = "/guides/devtools/networktab.html";
                rwbLink6[4].href = "/guides/devtools/performancetab.html";
                rwbLink6[5].href = "/guides/devtools/memorytab.html";
                rwbLink6[6].href = "/guides/devtools/applicationtab.html";
                rwbLink6[7].href = "/guides/devtools/securitytab.html";
                rwbLink6[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink6[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/sourcestab.html":
                const rwbLink7 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink7[0].href = "/guides/devtools/elementstab.html";
                rwbLink7[1].href = "/guides/devtools/consoletab.html";
                rwbLink7[2].href = "/guides/devtools/sourcestab.html";
                rwbLink7[3].href = "/guides/devtools/networktab.html";
                rwbLink7[4].href = "/guides/devtools/performancetab.html";
                rwbLink7[5].href = "/guides/devtools/memorytab.html";
                rwbLink7[6].href = "/guides/devtools/applicationtab.html";
                rwbLink7[7].href = "/guides/devtools/securitytab.html";
                rwbLink7[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink7[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/securitytab.html":
                const rwbLink11 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink11[0].href = "/guides/devtools/elementstab.html";
                rwbLink11[1].href = "/guides/devtools/consoletab.html";
                rwbLink11[2].href = "/guides/devtools/sourcestab.html";
                rwbLink11[3].href = "/guides/devtools/networktab.html";
                rwbLink11[4].href = "/guides/devtools/performancetab.html";
                rwbLink11[5].href = "/guides/devtools/memorytab.html";
                rwbLink11[6].href = "/guides/devtools/applicationtab.html";
                rwbLink11[7].href = "/guides/devtools/securitytab.html";
                rwbLink11[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink11[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink11[10].href = "/guides/https.html";
                break;
            case "/guides/devtools/lighthousetab.html":
                const rwbLink12 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink12[0].href = "/guides/devtools/elementstab.html";
                rwbLink12[1].href = "/guides/devtools/consoletab.html";
                rwbLink12[2].href = "/guides/devtools/sourcestab.html";
                rwbLink12[3].href = "/guides/devtools/networktab.html";
                rwbLink12[4].href = "/guides/devtools/performancetab.html";
                rwbLink12[5].href = "/guides/devtools/memorytab.html";
                rwbLink12[6].href = "/guides/devtools/applicationtab.html";
                rwbLink12[7].href = "/guides/devtools/securitytab.html";
                rwbLink12[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink12[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink12[10].href = "/pages/hsl.html";
                break;
            case "/guides/devtools/cssoverviewtab.html":
                const rwbLink13 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink13[0].href = "/guides/devtools/elementstab.html";
                rwbLink13[1].href = "/guides/devtools/consoletab.html";
                rwbLink13[2].href = "/guides/devtools/sourcestab.html";
                rwbLink13[3].href = "/guides/devtools/networktab.html";
                rwbLink13[4].href = "/guides/devtools/performancetab.html";
                rwbLink13[5].href = "/guides/devtools/memorytab.html";
                rwbLink13[6].href = "/guides/devtools/applicationtab.html";
                rwbLink13[7].href = "/guides/devtools/securitytab.html";
                rwbLink13[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink13[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink13[10].href = "/pages.html";
                break;
            case "/pages/datastorage.html":
                const rwbLink8 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink8[0].href = "/pages/markup.html";
                rwbLink8[1].href = "/guides/devtools/applicationtab.html";
                break;
            case "/pages/htmlresponses.html":
                const rwbLink9 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink9[0].href = "/guides/devtools/networktab.html";
                rwbLink9[1].href = "/pages/webides.html";
                break;
            case "/pages/url.html":
                const rwbLink10 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink10[0].href = "/pages/domainlookup.html";
                break;
            default:
                console.debug("No elements of type data-rwb-type=link found."); //shown with verbose logging
        }
    },
};
exports.default = classComponents;

},{"./components/404":3,"./components/dictionaryWidget":4,"./components/toDosWidget":6,"./models/abbrDescription":10,"./models/rwbErrorBus":20,"./models/scriptPerf":23}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const client_1 = require("../models/client");
const notFound404Widget = {
    init: () => {
        let client404 = new client_1.client();
        let clientRefferInfo = document.querySelector("#clientreferrer");
        let clientRttInfo = document.querySelector("#clientrtt");
        let clientPlatformInfo = document.querySelector("#clientplat");
        //Fill information secion
        clientRefferInfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
        clientRttInfo.textContent = `${client404.connectiontype ? client404.connectiontype : "No connection type found."}`;
        clientRttInfo.textContent += `, rtt of ${client404.connectionrtt ? client404.connectionrtt : "No rtt found."}`;
        clientPlatformInfo.textContent = client404.browserplatform
            ? client404.browserplatform
            : "No platform information found.";
        clientPlatformInfo.textContent += `, ${client404.useragent ? client404.useragent : "No user agent info."}`;
        //Provide a link to go back where you came from
        let gobacklink = document.querySelector("#oldURL");
        if (client404.oldURL.includes("404.html")) {
            client404.oldURL = window.location.origin;
        }
        let gobackhref = client404.oldURL ? client404.oldURL : window.location.origin;
        gobacklink.setAttribute("href", `${gobackhref}`);
        gobacklink.setAttribute("title", gobackhref);
    },
};
exports.default = notFound404Widget;

},{"../models/client":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const dictionarySearch_1 = require("../models/dictionarySearch");
/**
 * Component containing the dictionary widget's creation.
 */
const dictionaryWidget = {
    /**
     * This initialization function creates a dictionary search widget by calling the
     *  constructor.
     * @param elem - Element containing 'dictionaryWidget' class
     */
    init: () => {
        let dictionaryWidgetStartingElement;
        dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");
        // DictionarySearch constructor
        Object.create(new dictionarySearch_1.DictionarySearch(dictionaryWidgetStartingElement));
    },
};
exports.default = dictionaryWidget;

},{"../models/dictionarySearch":15}],5:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const flashcardCardElems_1 = require("../models/flashcardCardElems");
const portNums_1 = __importDefault(require("../data/portNums"));
const flashCardGameWidget = {
    init: () => {
        // Establish which port numbers to test and the definition
        // TODO: functions flashcards
        const methodDefinitions = new Map([
            ["charAt()", "Returns a new string of the character at a given index."],
        ]);
        // Create flashcard elements
        let mainFlashCardDivs = new flashcardCardElems_1.FlashcardCardElems(portNums_1.default);
        // Add the game's title element
        let mainFlashCardPage = document.getElementById("mainFlashCardGame");
        let mainFlashCardPageDiv = document.getElementById("mainFlashCards");
        const gameTitleElem = document.createElement("h2");
        gameTitleElem.innerText = "Computing Port Numbers";
        mainFlashCardPage.insertAdjacentElement("afterbegin", gameTitleElem);
        // Add the flashcards to widget
        for (let elem of mainFlashCardDivs.m_flashcardsArr) {
            mainFlashCardPageDiv.appendChild(elem);
        }
    },
};
exports.default = flashCardGameWidget;

},{"../data/portNums":9,"../models/flashcardCardElems":17}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const toDo_1 = require("../models/toDo");
/**
 * Component containing the To-Do List widget's creation.
 */
const toDosWidget = {
    /**
     * Create a To-Do List widget.
     * @param elem - Element containing 'ToDoList' class
     */
    init: () => {
        let toDosElement;
        toDosElement = document.querySelector(".ToDoList");
        //ToDoList object
        const toDoWidget = new toDo_1.ToDoList();
        //Creates widget markup and populates To-Do tasks contained in Local Storage
        toDoWidget.createToDoListWidget(toDosElement);
    },
};
exports.default = toDosWidget;

},{"../models/toDo":24}],7:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webBitsSlideShow = exports.webBitsAccordion = exports.rwbCardsWidget = void 0;
//--Copyright (c) 2023 Robert A. Howell
const data_1 = __importDefault(require("../data/data"));
const randomWebBits_1 = __importDefault(require("../models/randomWebBits"));
const cardsSlideShow_1 = __importDefault(require("../models/cardsSlideShow"));
class Accordion {
    accordionElements = new Map();
    constructor(accordionNodes) {
        for (let card of accordionNodes) {
            this.accordionElements.set(card, false);
        }
    }
}
/**
 * Card widget to initialize article data into HTML card elements. This widget
 * creates multiple sections of cards to add to a page.
 */
const rwbCardsWidget = {
    addCardSectionClass: (cards, cls) => {
        if (Array.isArray(cards)) {
            // cards is an array of cards; append class to all cards
            for (let card of cards) {
                card.classList.add(`${cls}`);
            }
        }
        if (!Array.isArray(cards)) {
            // cards is an element; append class to the element
            cards.classList.add(`${cls}`);
        }
    },
    buildRandomWebBits: (page) => {
        let arbitraryArticles;
        let guideShorts;
        let exploretheWeb;
        switch (page) {
            case "Home":
                let CardContainerType;
                (function (CardContainerType) {
                    CardContainerType["Slideshow"] = "slideshow";
                    CardContainerType["Accordion"] = "accordion";
                })(CardContainerType || (CardContainerType = {}));
                // Split the cards arrays into their respective category
                arbitraryArticles = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Arbitrary Articles:", "ArbitraryArticles", CardContainerType.Slideshow), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                guideShorts = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Guide Shorts:", "GuideShorts", CardContainerType.Accordion), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                exploretheWeb = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Explore the Web:", "ExploretheWeb"), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                break;
            default:
                // Split the cards arrays into their respective category
                arbitraryArticles = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Arbitrary Articles:", "ArbitraryArticles"), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                guideShorts = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Guide Shorts:", "GuideShorts"), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                exploretheWeb = new randomWebBits_1.default(randomWebBits_1.default.buildCardContainingSection("Explore the Web:", "ExploretheWeb"), randomWebBits_1.default.buildRWBCards(data_1.default.shift()));
                break;
        }
        /** Multiple categories of card data exist. This array holds the markup needed
         * to create category sections divisions when placed on a page.
         */
        const cardsSections = [
            arbitraryArticles.cardsSection,
            guideShorts.cardsSection,
            exploretheWeb.cardsSection,
        ];
        // Create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages (or articles), Guides, and Explores
        /**This array holds the markup of card elements. Each index stores the cards' data
         * for one category of articles. */
        const cardsData = [arbitraryArticles.cardsData, guideShorts.cardsData, exploretheWeb.cardsData];
        const RWB = [cardsSections, cardsData];
        return RWB;
    },
    /** Cards initialization function. This function breaks down the data structure in
     * order to formulate the article details into one card for each article data.
     *
     * Articles have different categories, so each category must be respected.
     * */
    init: () => {
        let RWBSectionCards;
        // Routes -> Add widget and format pages
        // Index (Home) page shortens each sections' card count and randomizes
        if (window.location.pathname == "/index.html" ||
            window.location.pathname == "/" ||
            window.location.pathname == "/RandomWebBits/index.html" ||
            window.location.pathname == "/RandomWebBits/" ||
            window.location.pathname == "/dist/index.html") {
            //Build RWB Sections + card slideshow, accordian
            RWBSectionCards = rwbCardsWidget.buildRandomWebBits("Home");
            // Apply classes to cards relevant of the container type
            rwbCardsWidget.addCardSectionClass(RWBSectionCards[1][0], "slide");
            rwbCardsWidget.addCardSectionClass(RWBSectionCards[1][1], "accordionslide");
            //Randomize the cards in the slideshow section
            rwbCardsWidget.randomizeWebBits(RWBSectionCards[1]);
            //Add introduction section and append to main
            RWBSectionCards[0].unshift(randomWebBits_1.default.buildRWBIntroduction());
            const main = document.querySelector("main");
            main.prepend(RWBSectionCards[0].shift());
        }
        else {
            //Build RWB Sections + cards as default
            RWBSectionCards = rwbCardsWidget.buildRandomWebBits();
        }
        // Add the cards to the page by combining rwb[1] (the cards) to rwb[0] (the section elements)
        // Outer loop: iterate each category, respectively: Pages, Guides, Explores
        for (let i = 0; i < RWBSectionCards[0].length; i++) {
            if (RWBSectionCards[0][i] != undefined) {
                // Inner loop: iterate through the category data
                // From the cards stack, append each to section
                RWBSectionCards[1].shift().forEach((article) => {
                    RWBSectionCards[0][i].append(article);
                });
            }
            else {
                console.debug("There's an error in the data.");
            }
        }
    },
    randomizeWebBits(cardsArticles) {
        /** Randomize the order of cards. */
        const getMultipleRandom = (arr, num) => {
            // randomize the array
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num); // return the requested number of elements
        };
        cardsArticles[0] = getMultipleRandom(cardsArticles[0], cardsArticles[0].length); //randomize all pages
        cardsArticles[1] = getMultipleRandom(cardsArticles[1], 8); //randomly select 3 guides
    },
};
exports.rwbCardsWidget = rwbCardsWidget;
const webBitsAccordion = {
    addCardAccordionStyles: (cardAccordion, screenSize) => {
        cardAccordion.accordionElements.forEach((isOpen, card) => {
            card.style.removeProperty("flexDirection");
            card.style.setProperty("max-width", "900px");
            card.style.setProperty("margin", "0");
            card.style.setProperty("height", "100px");
            card.style.setProperty("overflow", "hidden");
            //hide the 'Flaticon' links
            for (let inner of card.childNodes) {
                let innerelem = inner;
                innerelem.style.width = "50%";
            }
            //card body attr style
            let attrlink = card.childNodes[1].childNodes[3];
            attrlink.style.top = "55px";
            attrlink.style.right = "100%";
            if (screenSize == "SMALL") {
                //card image style
                let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
                image.style.setProperty("max-height", "200px");
                image.style.setProperty("max-width", "200px");
                //card image small style
                let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1];
                imageSmall.style.setProperty("max-height", "100px");
                imageSmall.style.setProperty("max-width", "100px");
                //card back para style
                let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2];
                imagePara.style.setProperty("margin", "0");
                imagePara.style.setProperty("font-size", "16px");
            }
            if (screenSize == "MEDIUM") {
                //card image style
                let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
                image.style.setProperty("max-height", "275px");
                image.style.setProperty("max-width", "275px");
                //card image small style
                let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1];
                imageSmall.style.setProperty("max-height", "100px");
                imageSmall.style.setProperty("max-width", "100px");
            }
            let pagelink = card.childNodes[1].childNodes[2];
            //add click event
            card.addEventListener("click", e => {
                if (e.target == attrlink || e.target == pagelink)
                    return;
                e.preventDefault();
                const close = () => {
                    card.style.setProperty("height", "100px");
                    isOpen = false;
                };
                const open = () => {
                    card.style.setProperty("height", "275px");
                    isOpen = true;
                };
                isOpen ? close() : open();
            });
            //add focus event
            let sitelink = card.childNodes[1].childNodes[2];
            sitelink.addEventListener("focus", e => {
                e.preventDefault();
                const open = () => {
                    card.style.setProperty("height", "275px");
                    isOpen = true;
                };
                open();
            });
            sitelink.addEventListener("focusout", e => {
                e.preventDefault();
                const close = () => {
                    card.style.setProperty("height", "100px");
                    isOpen = false;
                };
                close();
            });
            //add unfocus event
            attrlink.addEventListener("focusout", e => {
                e.preventDefault();
                const close = () => {
                    card.style.setProperty("height", "100px");
                    isOpen = false;
                };
                close();
            });
            //add unfocus event
            attrlink.addEventListener("focus", e => {
                e.preventDefault();
                const open = () => {
                    card.style.setProperty("height", "275px");
                    isOpen = true;
                };
                open();
            });
        });
    },
    init: () => {
        const accordionContainer = document.querySelector(".cardaccordion");
        accordionContainer.style.maxWidth = "75em";
        //create accordion card map state
        const cardaccordion = document.querySelectorAll(".cardaccordion .accordionslide");
        let accordion = Object.create(new Accordion(cardaccordion));
        if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
            webBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
        }
        else if (window.matchMedia("(min-width: 769px)").matches) {
            webBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
        }
        window.addEventListener("resize", e => {
            e.preventDefault();
            if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
                webBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
            }
            if (window.matchMedia("(min-width: 769px)").matches) {
                webBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
            }
            if (window.matchMedia("(max-width: 500px)").matches) {
                webBitsAccordion.removeCardAccorionStyles(accordion);
            }
        });
    },
    removeCardAccorionStyles: (cardaccordion) => {
        cardaccordion.accordionElements.forEach((isOpen, card) => {
            card.style.setProperty("flexDirection", "column");
            card.style.removeProperty("height");
            card.style.removeProperty("max-width");
            card.style.removeProperty("margin");
            card.style.removeProperty("overflow");
            card.removeAttribute("style");
            //card body attr style
            let attrlink = card.childNodes[1].childNodes[3];
            attrlink.style.removeProperty("top");
            attrlink.style.removeProperty("right");
            attrlink.removeAttribute("style");
            //card image style
            let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
            image.style.removeProperty("max-height");
            image.style.removeProperty("max-width");
            //card image small style
            let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1];
            imageSmall.style.removeProperty("max-height");
            imageSmall.style.removeProperty("max-width");
            //card back para style
            let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2];
            imagePara.style.removeProperty("margin");
            imagePara.style.removeProperty("font-size");
            for (let inner of card.childNodes) {
                let innerelem = inner;
                innerelem.style.removeProperty("width");
                innerelem.removeAttribute("style");
            }
            card.replaceWith(card.cloneNode(true));
        });
    },
};
exports.webBitsAccordion = webBitsAccordion;
const webBitsSlideShow = {
    init: () => {
        if (window.location.pathname == "/pages.html")
            return;
        let cards = document.querySelectorAll(".cardslideshow .slide");
        var small = window.matchMedia("(max-width: 819px)");
        var tablet = window.matchMedia("(min-width: 820px) and (max-width: 1090px)");
        //Implement slideshow for section articles
        let slideshow;
        let slideshowmed;
        let slideshowlarge;
        let currentslideshow;
        //Based on the matched media size, create a small, medium, or large slideshow
        if (small.matches) {
            slideshow = new cardsSlideShow_1.default(cards, 1, "SMALL");
            currentslideshow = slideshow;
        }
        else if (tablet.matches) {
            slideshowmed = new cardsSlideShow_1.default(cards, 2, "MEDIUM");
            currentslideshow = slideshowmed;
        }
        else {
            slideshowlarge = new cardsSlideShow_1.default(cards, 3, "LARGE");
            currentslideshow = slideshowlarge;
        }
        window.addEventListener("resize", e => {
            e.preventDefault();
            let slideshowsmall = document.querySelector(".slidescontainer.SMALL");
            let slideshowmedium = document.querySelector(".slidescontainer.MEDIUM");
            let slideshowlarge = document.querySelector(".slidescontainer.LARGE");
            if (window.matchMedia("(max-width: 819px)").matches) {
                if (slideshowmedium != null) {
                    slideshowmedium.remove();
                    console.debug(`Removed med slideshow ${slideshowmedium}`);
                }
                if (slideshowlarge != null) {
                    slideshowlarge.remove();
                    console.debug(`Removed large slideshow ${slideshowlarge}`);
                }
                currentslideshow.ssContainer.remove();
                currentslideshow.arrowsContainer.remove();
                currentslideshow = new cardsSlideShow_1.default(cards, 1, "SMALL");
                currentslideshow.onResizeShowStartingElems();
            }
            if (window.matchMedia("(min-width: 820px) and (max-width: 1090px)").matches) {
                if (slideshowsmall != null) {
                    slideshowsmall.remove();
                    console.debug(`Removed small slideshow ${slideshowsmall}`);
                }
                if (slideshowlarge != null) {
                    slideshowlarge.remove();
                    console.debug(`Removed large slideshow ${slideshowlarge}`);
                }
                currentslideshow.ssContainer.remove();
                currentslideshow.arrowsContainer.remove();
                currentslideshow = new cardsSlideShow_1.default(cards, 2, "MEDIUM");
                currentslideshow.onResizeShowStartingElems();
            }
            if (window.matchMedia("(min-width: 1091px)").matches) {
                if (slideshowsmall != null) {
                    slideshowsmall.remove();
                    console.debug(`Removed small element ${slideshowsmall}`);
                }
                if (slideshowmedium != null) {
                    slideshowmedium.remove();
                    console.debug(`Removed medium element ${slideshowmedium}`);
                }
                currentslideshow.ssContainer.remove();
                currentslideshow.arrowsContainer.remove();
                currentslideshow = new cardsSlideShow_1.default(cards, 3, "LARGE");
                currentslideshow.onResizeShowStartingElems();
            }
        });
    },
};
exports.webBitsSlideShow = webBitsSlideShow;

},{"../data/data":8,"../models/cardsSlideShow":13,"../models/randomWebBits":18}],8:[function(require,module,exports){
"strict mode";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const webBit_1 = __importDefault(require("../models/webBit"));
const attributionLink_1 = __importDefault(require("../models/attributionLink"));
// Create new AA (Arbitrary Article)
/**
 * "Arbitrary Articles' section card data."
 */
const arbitraryArticles = new Array(new webBit_1.default("Domainlookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new attributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new webBit_1.default("Htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new attributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Frames", 2)), new webBit_1.default("Webtech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 11, 19), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile.", new attributionLink_1.default("Wappalyzer app", "Graphical logo for Wappalyzer.", "https://www.wappalyzer.com/logos/", "Wappalyzer", "Wappalyzer", 5)), new webBit_1.default("Jsonobject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals.", new attributionLink_1.default("JavaScript Object Notation", "Graphical logo for JSON.", "https://www.json.org/", "json.org", "jsonObject", 6)), new webBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background.", new attributionLink_1.default("Wireless Fidelity", "Wi-Fi graphical logo.", "https://www.wi-fi.org/who-we-are/our-brands", "WiFi Alliance", "Wi-Fi Version", 7)), new webBit_1.default("Chatgpt", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new attributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new webBit_1.default("Paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new attributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new webBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new attributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new webBit_1.default("Boinc", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new attributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new webBit_1.default("IPAddress", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new attributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new webBit_1.default("HTMLMarkup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new attributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new webBit_1.default("Networkspeed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new attributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new webBit_1.default("PowerShelldrives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new attributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new webBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new attributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new webBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 11, 19), "pages/googleplatform.html", "img/search-engine.webp", "A bar graph icon", new attributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new webBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new attributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new webBit_1.default("Webide", 24, "WebIDE", "Try skipping the download by using a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new attributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new webBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new attributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new webBit_1.default("Disable_Javascript", 26, "Disable JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new attributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new webBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new attributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new webBit_1.default("CSSdef", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new attributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new webBit_1.default("Latency", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new attributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)), new webBit_1.default("HTMLdef", 33, "Create HTML elements", "Learn the parts and syntax of an HTML element", new Date(2023, 7, 25), "pages/html.html", "img/html.webp", "HTML element syntax icon", new attributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "Create HTML elements", 33)), new webBit_1.default("URL", 34, "URL Address Examples", "Learn the parts and syntax of a URL", new Date(2023, 8, 7), "pages/url.html", "img/www.webp", "URL example icon", new attributionLink_1.default("url icons", "Url icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/url", "Flaticon", "Create HTML elements", 34)), new webBit_1.default("DataStorage", 35, "Data Storage", "Local storage saves data when needed for concurrent page surfing.", new Date(2023, 8, 14), "pages/datastorage.html", "img/server.webp", "Data storage icon", new attributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "Data Storage", 35)), new webBit_1.default("HSL", 36, "Hue, Saturation, and Lightness", "HSL colors manipulate hues.", new Date(2023, 9, 6), "pages/hsl.html", "img/color-wheel.webp", "Color wheel icon", new attributionLink_1.default("variety icons", "Variety icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/variety", "Flaticon", "Hue, Saturation, and Lightness", 36)), new webBit_1.default("To-Do_List", 37, "To-Do List", "A ToDo list available through JavaScript and localStorage.", new Date(2023, 9, 28), "pages/todos.html", "img/check.webp", "To-do list notepad", new attributionLink_1.default("tasks icons", "Tasks icons created by popcornarts - Flaticon", "https://www.flaticon.com/free-icons/tasks", "Flaticon", "To-Do List", 37)));
/**
 * "Guide Shorts' section card data."
 */
const guideShorts = new Array(new webBit_1.default("Httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "guides/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new attributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new webBit_1.default("Searchverticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon", new attributionLink_1.default("content writing icons", "Content writing icons created by Vectors Tank - Flaticon", "https://www.flaticon.com/free-icons/content-writing", "Flaticon", "Search Verticals", 14)), new webBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon", new attributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "SMTP and Email", 16)), new webBit_1.default("Devtools", 19, "GUIDE: Dev Application", "Review dev tool's application tab", new Date(2023, 3, 27), "guides/devtools/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon", new attributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Dev Application", 19)), new webBit_1.default("Devtoolstwo", 21, "GUIDE: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two", new attributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Inspect Pages", 21)), new webBit_1.default("PWAIcon", 27, "GUIDE: Install the PWA applications", "Progressive websites have an installation option", new Date(2023, 5, 27), "guides/pwaicon.html", "img/app-development.webp", "App development icon", new attributionLink_1.default("development icons", "Development icons created by Design Circle - Flaticon", "https://www.flaticon.com/free-icons/development", "Flaticon", "JavaScript", 27)), new webBit_1.default("Clearcookies", 30, "GUIDE: Clear cookies quickly", "Don't waste time sifting through settings", new Date(2023, 7, 2), "guides/clearcookiesquickly.html", "img/cookies.webp", "Browser cookie icon", new attributionLink_1.default("cookie icons", "Cookie icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/cookie", "Flaticon", "GUIDE: Clear cookies quickly", 30)), new webBit_1.default("InspectElement", 38, "Element Inspect", "See an element's metadata using hover details.", new Date(2023, 10, 9), "guides/elementinspect.html", "img/checked.webp", "Inspect element icon depiction", new attributionLink_1.default("inspection icons", "Inspection icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/inspection", "Flaticon", "Element Inspect", 38)), new webBit_1.default("DevToolsElements", 39, "Guide: Dev Elements", "Review dev tool's elements tab", new Date(2023, 10, 28), "guides/devtools/elementstab.html", "img/web-development.webp", "Computer depiction of developer's tools", new attributionLink_1.default("development icons", "Development icons created by Flat-icons-com - Flaticon", "https://www.flaticon.com/free-icons/development", "Flaticon", "Guide: Dev Elements", 39)), new webBit_1.default("DevToolsConsole", 40, "GUIDE: Dev Console", "Review dev tool's console tab", new Date(2023, 10, 29), "guides/devtools/consoletab.html", "img/terminal2.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev Console", 40)), new webBit_1.default("DevToolsSources", 41, "GUIDE: Dev Sources", "Review dev tool's sources tab", new Date(2023, 10, 30), "guides/devtools/sourcestab.html", "img/terminal3.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev Sources", 41)), new webBit_1.default("DevToolsNetwork", 42, "GUIDE: Dev Network", "Review dev tool's network tab", new Date(2023, 10, 31), "guides/devtools/networktab.html", "img/terminal4.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev Network", 42)), new webBit_1.default("DevToolsPerformance", 43, "GUIDE: Dev Performance", "Review dev tool's performance tab", new Date(2023, 11, 1), "guides/devtools/performancetab.html", "img/terminal5.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev Performance", 43)), new webBit_1.default("DevToolsMemory", 44, "GUIDE: Dev Memory", "Review dev tool's memory tab", new Date(2023, 11, 2), "guides/devtools/memorytab.html", "img/terminal6.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev Memory", 44)), new webBit_1.default("DevToolsSecurity", 45, "GUIDE: Dev Security", "Review dev tool's security tab", new Date(2023, 11, 3), "guides/devtools/securitytab.html", "img/ssl.webp", "Icon depiction of security items: a lock and a shield", new attributionLink_1.default("ssl icons", "Ssl icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ssl", "Flaticon", "GUIDE: Dev Security", 45)), new webBit_1.default("DevToolsLighthouse", 46, "GUIDE: Dev Lighthouse", "Review dev tool's Lighthouse tab", new Date(2023, 11, 19), "/guides/devtools/lighthousetab.html", "img/lighthouse.webp", "Icon depiction of a lighthouse", new attributionLink_1.default("lighthouse icons", "Lighthouse icons created by BZZRINCANTATION - Flaticon", "https://www.flaticon.com/free-icons/lighthouse", "Flaticon", "GUIDE: Dev Lighthouse", 46)), new webBit_1.default("DevToolsCSSOverview", 47, "GUIDE: Dev CSS Overview", "Review dev tool's CSS Overview tab", new Date(2023, 11, 19), "/guides/devtools/cssoverviewtab.html", "img/terminal7.webp", "Icon depiction of developer's tools", new attributionLink_1.default("terminal icons", "Terminal icons created by Smashicons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "GUIDE: Dev CSS Overview", 47)));
/**
 * "Explore section card data."
 */
const explores = new Array(new webBit_1.default("Nasa", 3, "EXPLORE: NASA Pages", "Explore the NASA domain. Learn about the universe via NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo", new attributionLink_1.default("NASA", "Image source via the National Aeronautics and Space Administration", "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html", "NASA", "NASA Pages", 3)), new webBit_1.default("Virtualtour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON", new attributionLink_1.default("google expeditions icons", "Google expeditions icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/google-expeditions", "Flaticon", "Virtual Tour", 18)), new webBit_1.default("Webb", 31, "James Webb Space Telescope", "Discover the science mission of NASA's James Webb Space Telescope (JWST)", new Date(2023, 7, 3), "explore/webbtelescope.html", "img/JWST_poster.webp", "James Webb space telescope poster image", new attributionLink_1.default("Hexagon Litho (2018)", "James Webb Space Telescope icon provided by nasa.gov", "https://jwst.nasa.gov/content/features/educational/print.html", "jwst.nasa.gov", "James Webb Space Telescope icon", 31)));
/**
 * Multidimensional array. Rows are the different sections. Columns
 * contain each article's data belonging in that section.
 */
const WEBBITDATA = [arbitraryArticles, guideShorts, explores];
exports.default = WEBBITDATA;

},{"../models/attributionLink":12,"../models/webBit":25}],9:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const portDefinitions = new Map([
    [20, "FTP-data"],
    [21, "FTP"],
    [22, "Secure SSH  /TCP"],
    [23, "Telnet (unsecure)"],
    [25, "SMTP - 465 for encrypted."],
    [37, "timeserver /TCP/UDP"],
    [49, "TACACS+"],
    [53, "DNS  /UDP/TCP"],
    [67, "DHCP"],
    [68, "DHCP"],
    [80, "HTTP  /TCP"],
    [88, "Kerberos-sec  /TCP/UDP"],
    [110, "POP - 995 for encrypted."],
    [135, "RPC"],
    [137, "NETBIOS"],
    [138, "NETBIOS"],
    [139, "NETBIOS"],
    [143, "IMAP - 993 for encrypted"],
    [161, "SNMP  Manager"],
    [162, "SNMP  Agent"],
    [389, "LDAP - 636 for secure"],
    [443, "HTTPS  /TCP"],
    [445, "SMB  /TCP"],
    [465, "SMTP by TLS"],
    [514, "SYSLOG  /UDP"],
    [587, "SMTPS STARTTLS"],
    [636, "LDAP SSL"],
    [990, "FTPS"],
    [993, "IMAP TLS"],
    [995, "POP TLS"],
    [1812, "RADIUS  /TCP/UDP"],
    [1813, "RADIUS  /TCP/UDP"],
    // [3309, "SQL  /TCP/UDP"],
    [3269, "Microsoft Global Catalog"],
    [3389, "RDP"],
]);
exports.default = portDefinitions;

},{}],10:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class AbbrOpen {
    isOpen = false;
    abbrElement;
    description;
    constructor(abbrElement) {
        this.isOpen = false;
        this.abbrElement = abbrElement;
    }
    ;
    revealAbbrDescription() {
        this.abbrElement.addEventListener("click", e => {
            e.preventDefault();
            if (this.isOpen) {
                this.description.remove();
            }
            let abbrTitleAttrVal = this.abbrElement.getAttribute("title");
            if (e.target == this.abbrElement) {
                //create the span element
                this.description = this.abbrElement.appendChild(document.createElement("span"));
                this.description.textContent = `${String.fromCharCode(160)}(${abbrTitleAttrVal})${String.fromCharCode(160)}`;
                this.isOpen = true;
            }
        });
    }
    ;
}
exports.default = AbbrOpen;

},{}],11:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGET = void 0;
/**
 * apiGET is for fetch requests. Use an apiGET object to manipulate the fetch
 *  request into either:
 *
 * 1. returning data
 *
 * --or --
 *
 * 2. storing the request in the browser cache to retrieve later
 */
class apiGET {
    errorElem;
    getUrl;
    sendToBrowserCache = false;
    browserCacheName;
    /**
     * This constructor gathers all the needed information for fetch and/or browser
     *  storage.
     *
     * @param getUrl - the (full) url of data request.
     * @param sendToBrowserCache  - Boolean value determining fetch caching.
     * @param browserCacheName - If storing the request in browser cache, this string provides the name for storage.
     * @param errorElem - Should the fetch request fail, return error status to this element.
     */
    constructor(getUrl, sendToBrowserCache, errorElem, browserCacheName) {
        this.getUrl = getUrl;
        this.sendToBrowserCache = sendToBrowserCache;
        this.browserCacheName = browserCacheName;
        this.errorElem = errorElem;
    }
    ;
    /**
     *
     * @returns this.sendToBrowserCache
     */
    getSendToBrowserCache() {
        return this.sendToBrowserCache;
    }
    ;
    /**
     *
     * @returns this.GETURL
     */
    getGetUrl() {
        return this.getUrl;
    }
    ;
    /**
     * Flip this.sendToBrowserCache boolean value from the current value.
     */
    setSendToBrowserCache() {
        return this.sendToBrowserCache ? false : true;
    }
    ;
    /**
     * A fetch request can take URL or string parameter. This function sets the apiGET
     *  object for a URL fetch by creating a URL from the string, or passing the URL.
     * @param getUrl - the (full) url of data request.
     */
    setGetUrl(getUrl) {
        if (typeof getUrl === "string") {
            this.getUrl = new URL(getUrl);
        }
        else {
            this.getUrl = getUrl;
        }
    }
    ;
    /**
     * A public function creating a data promise object for the called fetch function. If
     *  the request needs added to browser storage, the fetch is made and sent to
     *  storage. A cloned copy of the fetched data is returned and the original request is
     *  sent to the cache. Without sending to browser cache, the fetch is requested and
     * returned.
     *
     * @param getUrl - the (full) url of data request.
     * @returns dataCachePromise: Promise<unknown>
     */
    async apiGet(getUrl) {
        //Check if the request is for cache storage
        if (this.sendToBrowserCache) {
            //The returned data is packages as a Promise object
            let dataCachePromise = new Promise((resolve, reject) => {
                if ("caches" in window) {
                    //Open cache and check for request existing in Cache Storage
                    window.caches
                        .open(this.browserCacheName)
                        .then(cache => {
                        caches.match(getUrl).then(result => {
                            if (result === undefined) {
                                //No matches for this request in Storage Cache, so fetch the request normally
                                //Upon success, a cloned copy will need to be returned.
                                fetch(getUrl).then(result => {
                                    //Copy the response since it can only be read once
                                    let clonedResp = result.clone();
                                    //Add the result to the cache
                                    if (clonedResp.status != 404) {
                                        cache.put(getUrl, result);
                                    }
                                    resolve(clonedResp.json().then(text => text));
                                });
                            }
                            else {
                                //Cache hit success, return the response data
                                resolve(result.json().then(text => text));
                            }
                        });
                    })
                        .catch(e => {
                        //Cannot open Storage Cache
                        console.error(`%cProblem opening Cache Storage. Name: ${this.browserCacheName}`, "color: grey");
                        this.sendToBrowserCache = false;
                    })
                        .finally(() => {
                        //Attempt raw fetch
                        resolve(this.fetchData(getUrl));
                        reject(new Error("Promise error on data fetch."));
                    });
                }
            });
            //The promise has resolved --> return the promise data
            dataCachePromise.then((response) => {
                return response;
            });
            return dataCachePromise;
        }
        else {
            let dataCachePromise = new Promise((resolve, reject) => {
                resolve(this.fetchData(getUrl));
            });
            dataCachePromise.then(data => {
                return data;
            });
            return dataCachePromise;
        }
    }
    ;
    /**
     * Checks whether the requested response is of valid status 'OK' and '200'
     * @param res - the fetched response.
     * @returns - returns res.json() on success or returns response on failure.
     */
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
    ;
    /**
     * The fetch request, returning a fetch promise.
     * @param getUrl - the (full) url of data request.
     * @returns data.text() or data based on the instance returned.
     */
    fetchData(getUrl) {
        return fetch(getUrl)
            .then(response => this.apiResponseErrorCheck(response))
            .then(data => {
            if (data instanceof Response) {
                return data.text();
            }
            else
                return data;
        })
            .catch((e) => {
            console.debug(e);
            this.errorElem.classList.add("error");
            this.errorElem.innerText = `${e.message}`;
        });
    }
    ;
}
exports.apiGET = apiGET;

},{}],12:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const rwbLink_1 = __importDefault(require("./rwbLink"));
/**
 * Used for image Attribution
 */
class AttributionLink extends rwbLink_1.default {
    /**Counts the number of objects instantiated */
    static count = 0;
    /**Name of the owner */
    attributedOwner;
    /**WebBits article data ID */
    articleId;
    constructor(
    /**Link title */
    title, 
    /**Link inner text */
    innerText, 
    /** link href */
    hReference, 
    /**Name of the owner */
    attributedOwner, 
    /**WebBits page */
    pageName, 
    /**WebBits article data ID */
    articleId) {
        super(title, innerText, pageName, hReference);
        this.attributedOwner = attributedOwner;
        this.articleId = articleId;
        AttributionLink.count++;
    }
    ;
}
exports.default = AttributionLink;

},{"./rwbLink":22}],13:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class CardsSlideShow {
    ssContainer;
    arrowsContainer;
    prevBtn;
    nextBtn;
    cards;
    cardShowQuant;
    cardIndxStart = 0;
    cardCounter = 1;
    cardsIndxEnd;
    turn = 0;
    maxTurnCount;
    slideShowContainer = document.querySelector(".cardslideshow");
    numberElement;
    windowSize;
    constructor(cards, quantityShow, windowSize) {
        this.cards = cards;
        this.cardShowQuant = quantityShow;
        this.cardsIndxEnd = this.cardShowQuant - 1;
        this.maxTurnCount = this.cards.length - this.cardShowQuant;
        this.windowSize = windowSize;
        this.hideOverflowElements();
        this.onInitSetupCardPosition();
        this.ssContainer = this.newContainerMarkup();
        this.arrowsContainer = this.newArrowsMarkup();
        this.newNumberElement();
        this.addBtnEventListeners();
        this.showHideSlideShowButtons();
    }
    ;
    nextSlide() {
        if (this.turn == this.maxTurnCount) {
            return;
        }
        if (this.windowSize == "LARGE") {
            if (this.cards[this.cardIndxStart - 1] != undefined) {
                this.cards[this.cardIndxStart - 1].style.display = "none";
                this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Hide the first element in slideshow
            this.cards[this.cardIndxStart].style.opacity = "0%";
            this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");
            //Move middle element to left
            this.cards[this.cardIndxStart + 1].style.transform = "translateX(-365px)";
            //Move right to the middle
            this.cards[this.cardIndxStart + 2].style.transform = "translateX(0px)";
            //Display the next element for slideshow
            this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");
            //Move in new element
            this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(365px)";
            if (this.cards[this.cardsIndxEnd + 2] != undefined) {
                this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].style.display = "block";
                this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
            }
        }
        if (this.windowSize == "MEDIUM") {
            if (this.cards[this.cardIndxStart - 1] != undefined) {
                this.cards[this.cardIndxStart - 1].style.display = "none";
                this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Hide the first element in slideshow
            this.cards[this.cardIndxStart].style.opacity = "0%";
            this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");
            //Move the right element to left
            this.cards[this.cardIndxStart + 1].style.transform = "translateX(-182.5px)";
            //Display the next element for slideshow
            this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");
            //Move in new element
            this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(182.5px)";
            if (this.cards[this.cardsIndxEnd + 2] != undefined) {
                this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].style.display = "block";
                this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
            }
        }
        if (this.windowSize == "SMALL") {
            if (this.cards[this.cardIndxStart - 1] != undefined) {
                this.cards[this.cardIndxStart - 1].style.display = "none";
                this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Hide the first element in slideshow
            this.cards[this.cardIndxStart].style.opacity = "0%";
            this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");
            //Move element to left
            this.cards[this.cardIndxStart].style.transform = "translateX(-182.5px)";
            //Move element to center
            this.cards[this.cardIndxStart + 1].style.transform = "translateX(0px)";
            //Display the next element for slideshow
            this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
            this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");
            if (this.cards[this.cardsIndxEnd + 2] != undefined) {
                this.cards[this.cardsIndxEnd + 2].style.transform = "translateX(182.5px)";
                this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
                this.cards[this.cardsIndxEnd + 2].style.display = "block";
                this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
            }
        }
        //Increment index counter
        this.cardIndxStart++;
        this.cardsIndxEnd++;
        this.turn++;
        this.cardCounter++;
    }
    ;
    prevSlide() {
        if (this.turn == 0) {
            return;
        }
        if (this.windowSize == "LARGE") {
            //Hide the last element in slideshow
            this.cards[this.cardsIndxEnd].style.opacity = "0%";
            this.cards[this.cardsIndxEnd].style.zIndex = "-1";
            this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
            if (this.cards[this.cardsIndxEnd + 1] != undefined) {
                this.cards[this.cardsIndxEnd + 1].style.display = "none";
                this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Move middle element to to the right
            this.cards[this.cardIndxStart + 1].style.transform = "translateX(365px)";
            //Move left element to the right
            this.cards[this.cardIndxStart].style.transform = "translateX(0px)";
            //Display the next element for slideshow
            this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
            this.cards[this.cardIndxStart - 1].style.removeProperty("display");
            //Move in new element
            this.cards[this.cardIndxStart - 1].style.transform = "translateX(-365px)";
            if (this.cards[this.cardIndxStart - 2] != undefined) {
                this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
                this.cards[this.cardIndxStart - 2].style.display = "block";
            }
        }
        if (this.windowSize == "MEDIUM") {
            //Hide the last element in slideshow
            this.cards[this.cardsIndxEnd].style.opacity = "0%";
            this.cards[this.cardsIndxEnd].style.zIndex = "-1";
            this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
            if (this.cards[this.cardsIndxEnd + 1] != undefined) {
                this.cards[this.cardsIndxEnd + 1].style.display = "none";
                this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Move left element to the right
            this.cards[this.cardIndxStart].style.transform = "translateX(182.5px)";
            //Display the next element for slideshow
            this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
            this.cards[this.cardIndxStart - 1].style.removeProperty("display");
            //Move in new element
            this.cards[this.cardIndxStart - 1].style.transform = "translateX(-182.5px)";
            if (this.cards[this.cardIndxStart - 2] != undefined) {
                this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
                this.cards[this.cardIndxStart - 2].style.display = "block";
            }
        }
        if (this.windowSize == "SMALL") {
            //Hide the first element in slideshow
            this.cards[this.cardIndxStart].style.opacity = "0%";
            this.cards[this.cardsIndxEnd].style.zIndex = "-1";
            this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
            this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
            if (this.cards[this.cardsIndxEnd + 1] != undefined) {
                this.cards[this.cardsIndxEnd + 1].style.display = "none";
                this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
                this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
            }
            //Move element to right
            this.cards[this.cardIndxStart].style.transform = "translateX(182.5px)";
            //Move element to center
            this.cards[this.cardIndxStart - 1].style.transform = "translateX(0px)";
            //Display the next element for slideshow
            this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
            this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
            this.cards[this.cardIndxStart - 1].style.removeProperty("display");
            if (this.cards[this.cardIndxStart - 2] != undefined) {
                this.cards[this.cardIndxStart - 2].style.display = "block";
                this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
            }
        }
        //Increment index counter
        this.cardIndxStart--;
        this.cardsIndxEnd--;
        this.turn--;
        this.cardCounter--;
    }
    ;
    addBtnEventListeners = () => {
        //Event listeners for the next and previous buttons
        this.nextBtn.addEventListener("click", e => {
            e.preventDefault();
            this.nextSlide();
            this.showHideSlideShowButtons();
            this.numberArrowText();
        });
        this.prevBtn.addEventListener("click", e => {
            e.preventDefault();
            this.prevSlide();
            this.showHideSlideShowButtons();
            this.numberArrowText();
        });
    };
    showHideSlideShowButtons() {
        if (this.cardIndxStart == 0) {
            this.prevBtn.style.opacity = "0%";
            this.prevBtn.setAttribute("tabindex", "-1");
            return;
        }
        if (this.cardsIndxEnd == this.cards.length - 1) {
            this.nextBtn.style.opacity = "0%";
            this.nextBtn.setAttribute("tabindex", "-1");
            return;
        }
        this.prevBtn.style.removeProperty("opacity");
        this.nextBtn.style.removeProperty("opacity");
        this.prevBtn.removeAttribute("tabindex");
        this.nextBtn.removeAttribute("tabindex");
    }
    ;
    numberArrowText = () => {
        if (this.windowSize == "SMALL") {
            this.numberElement.innerText = `${this.cardCounter.toString()} of ${this.cards.length.toString()}`;
        }
        else {
            this.numberElement.innerText = `[${this.cardCounter.toString()}..${(this.cardCounter + this.cardShowQuant - 1).toString()}] of ${this.cards.length.toString()}`;
        }
    };
    onResizeShowStartingElems() {
        //screen has refreshed. counter is reset to start. card elements may be
        //hidden from the display, depending on when the refresh occurred, so
        //reset the starting elements to visible
        //Show overflow elements
        if (this.cardIndxStart < this.cardShowQuant) {
            for (let i = 0; i <= this.cardsIndxEnd; i++) {
                this.cards[i].style.setProperty("opacity", "1");
                this.cards[i].style.setProperty("display", "block");
                if (this.windowSize == "SMALL") {
                    this.cards[i].style.transform = "translateX(0px)";
                    continue;
                }
                if (this.windowSize == "LARGE") {
                    if (i == 1) {
                        this.cards[i].style.transform = "translateX(0px)";
                    }
                    continue;
                }
            }
        }
    }
    ;
    hideOverflowElements() {
        //Hide overflow elements
        if (this.cardIndxStart < this.cardShowQuant) {
            for (let i = this.cards.length - 1; i > this.cardsIndxEnd; i--) {
                this.cards[i].style.position = "absolute";
                this.cards[i].style.opacity = "0%";
                this.cards[i].style.display = "none";
                if (this.windowSize == "SMALL") {
                    this.cards[i].style.transform = "translateX(0px)";
                    continue;
                }
                if (this.windowSize == "MEDIUM") {
                    this.cards[i].style.transform = "translateX(182.5px)";
                    continue;
                }
                this.cards[i].style.transform = "translateX(365px)";
            }
        }
        this.cards[0].style.position = "absolute";
    }
    ;
    newContainerMarkup() {
        const newContainerStyles = () => {
            //Container styles
            slideShowSlides.classList.add("slidescontainer");
            slideShowSlides.style.width = "100%";
            slideShowSlides.style.height = "32em";
            slideShowSlides.style.display = "flex";
            slideShowSlides.style.position = "relative";
            this.slideShowContainer.style.justifyContent = "center";
        };
        //Build the markup needed for the slideshow
        //Add cards to container
        let slideShowSlides = this.slideShowContainer.appendChild(document.createElement("div"));
        for (let card of this.cards) {
            let temp = card;
            slideShowSlides.insertAdjacentElement("beforeend", temp);
            newContainerStyles();
        }
        slideShowSlides.classList.add(`${this.windowSize}`);
        return slideShowSlides;
    }
    ;
    newArrowsMarkup() {
        //Add left and right buttons
        let slideshowbtns = this.slideShowContainer.appendChild(document.createElement("div"));
        //Left slideshow btn
        let previousslideshowbtn = document.createElement("button");
        previousslideshowbtn.classList.add("slideshowPrev");
        previousslideshowbtn.innerText = "❮";
        slideshowbtns.insertAdjacentElement("beforeend", previousslideshowbtn);
        //Update slideshow object
        this.prevBtn = previousslideshowbtn;
        //Right slideshow btn
        let nextslideshowbtn = document.createElement("button");
        nextslideshowbtn.classList.add("slideshowNext");
        nextslideshowbtn.innerText = "❯";
        slideshowbtns.insertAdjacentElement("beforeend", nextslideshowbtn);
        slideshowbtns.style.display = "flex";
        slideshowbtns.style.justifyContent = "center";
        //Update slideshow object
        this.nextBtn = nextslideshowbtn;
        return slideshowbtns;
    }
    ;
    newNumberElement() {
        //Number element
        this.numberElement = document.createElement("div");
        this.numberArrowText();
        this.nextBtn.insertAdjacentElement("beforebegin", this.numberElement);
        this.numberElement.style.whiteSpace = "nowrap";
        this.numberElement.style.display = "grid";
        this.numberElement.style.alignContent = "center";
        this.numberElement.style.marginInline = "1.5rem";
    }
    ;
    onInitSetupCardPosition() {
        switch (this.windowSize) {
            case "SMALL":
                //small window size logic
                this.cards[1].style.transform = "translateX(182.5px)";
                this.cards[1].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[1].children[1].children[3].setAttribute("tabindex", "-1");
                break;
            case "MEDIUM":
                //medium window size logic
                this.cards[0].style.transform = "translateX(-182.5px)";
                this.cards[1].style.position = "absolute";
                this.cards[1].style.transform = "translateX(182.5px)";
                this.cards[2].style.display = "block";
                this.cards[2].style.zIndex = "-1";
                this.cards[2].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[2].children[1].children[3].setAttribute("tabindex", "-1");
                break;
            case "LARGE":
                //large window size logic
                this.cards[0].style.transform = "translateX(-365px)";
                this.cards[1].style.position = "absolute";
                this.cards[2].style.position = "absolute";
                this.cards[2].style.transform = "translateX(365px)";
                this.cards[3].style.display = "block";
                this.cards[3].style.zIndex = "-1";
                this.cards[3].children[1].children[2].setAttribute("tabindex", "-1");
                this.cards[3].children[1].children[3].setAttribute("tabindex", "-1");
                break;
            default:
                console.debug("Screen size property not set on slideshow.");
                break;
        }
    }
    ;
}
exports.default = CardsSlideShow;

},{}],14:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
class client {
    oldURL = document.referrer;
    browserplatform;
    useragent = window.navigator.userAgent;
    connectiontype;
    connectionrtt;
    constructor() {
        this.browserplatform = this.setbrowserplatform();
        this.connectiontype = this.setconnectiontype();
        this.connectionrtt = this.setconnectionrtt();
    }
    ;
    setbrowserplatform() {
        if ("userAgentData" in window.navigator) {
            //userAgentData is NavigatorUAData type, not found in TypeScript.
            //Known to Edge browser: Object.getPrototypeOf(window.navigator.userAgentData)
            let userAgentData = window.navigator.userAgentData;
            let platformdata = userAgentData.platform;
            return platformdata;
        }
        else
            this.browserplatform = "";
    }
    ;
    setconnectiontype() {
        if ("connection" in window.navigator) {
            //connection is NetworkInformation type, not found in TypeScript.
            //Known to Edge browser: Object.getPrototypeOf(window.navigator.connection)
            let connection = window.navigator.connection;
            let effectivetype = connection.effectiveType;
            return effectivetype;
        }
        else
            this.connectiontype = "";
    }
    ;
    setconnectionrtt() {
        if ("connection" in window.navigator) {
            let connection = window.navigator.connection;
            let rtt = connection.rtt;
            return rtt;
        }
        else
            this.connectionrtt = "";
    }
    ;
}
exports.client = client;

},{}],15:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionarySearch = void 0;
//--Copyright (c) 2023 Robert A. Howell
const api_1 = require("./api");
const dictionarySearchMarkup_1 = __importDefault(require("./dictionarySearchMarkup"));
const rwbErrorBus_1 = __importDefault(require("./rwbErrorBus"));
const rwbJsonConverter_1 = require("./rwbJsonConverter");
const rwbJsonConverter_2 = require("./rwbJsonConverter");
/**
 * A DictionarySearch is a set of markup creation and functions which allow a user
 *  to look up a word like a Dictionary. When called, the user's input is validated
 *  as an acceptable word or it declines the request, then showing the user if the word
 *  is acceptable.
 *
 * Creating a dictionary search widget requires passing a reference element (for a
 * known placement location) that contains the 'dictionaryWidget' class.
 *
 *   new DictionarySearch(elem);
 *
 * All the needed elements and functionality are added to the page.
 *
 */
class DictionarySearch extends dictionarySearchMarkup_1.default {
    static count = 0;
    static wordStorage;
    static CacheStorageNameofWordRequest = "RWB_word_fetch";
    static requestUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    previousWordsBtnIsCreated = false;
    previousWordsBtnWasClicked = false;
    wordURL;
    wordData;
    /**
     * This constructor creates all the functionality and markup needed for the
     *  Dictionary Search widget interface.
     *
     * @param elem - The reference element used to place widget markup.
     */
    constructor(elem) {
        //Invoke superclass constructor.
        super(elem);
        if (this.searchElements == undefined)
            return;
        //Initialize the dictionary widget with click event listeners
        this.addWidgetEvents();
        //Store words cache data with initialization.
        DictionarySearch.wordStorage = DictionarySearch.getLocalStorageWordCaches();
        DictionarySearch.count++;
    }
    ;
    /**
     * Retrieve Local Storage words previously stored with the Dictionary Search Widget.
     *
     * @returns DictionarySearch.wordStorage - these are the words stored previously in the
     *  browser cache.
     */
    static getLocalStorageWordCaches() {
        //Local Storage 'word-caches' items data assignment
        //cache response links and cache name are previously stored in Local Storage
        let storageStr;
        if (rwbErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", true, true)) {
            //The Local Storage is null or empty--> Confirm here the browser does not have any Cache Storage items in error
            if ("caches" in window) {
                if (window.caches.has(DictionarySearch.CacheStorageNameofWordRequest)) {
                    window.caches.delete(DictionarySearch.CacheStorageNameofWordRequest);
                }
                localStorage.removeItem("word-caches");
                return;
            }
        }
        storageStr = localStorage.getItem("word-caches");
        //check the word-cache value for correct json parsing
        let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(storageStr));
        if (!parsetest.passed) {
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, "color:orange;font-size:14px;font-weight:bold;", "color:orange;font-size:16px;");
            this.getLocalStorageWordCaches();
            return;
        }
        return parsetest.returnobj;
    }
    ;
    /**
     * Call to return the previously searched word.
     *
     * @returns this.wordURL
     */
    getWordURL() {
        return this.wordURL;
    }
    ;
    /**
     * Call to return the fetched word data.
     *
     * @returns this.wordData
     */
    getWordData() {
        return this.wordData;
    }
    ;
    /**
     * Adds click and keypress event listeners to the widget. Input event listeners 'click'
     *  and 'keypress' await for a search call. Also, should a user want to search a
     *  previously searched word, the widget adapts markup for that request.
     */
    addWidgetEvents() {
        if (this.searchElements == undefined) {
            console.log("A search element is undefined from searchWord | wordSearch");
            return;
        }
        let buttonContainer = document.getElementById("dictionary-btns");
        const hidePreviousPanel = () => {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = true;
        };
        //Add form input event listeners
        //Upon input entry, fire API fetch
        this.searchElements.wordSearch.addEventListener("click", event => {
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        this.searchElements.searchWord.addEventListener("keypress", event => {
            if (event.key !== "Enter")
                return;
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        //"Previous word searches" button fetches locally stored words
        //Clicking the button displays each word in a list within the widget
        this.searchElements.previousWordBtn.addEventListener("click", event => {
            event.preventDefault();
            this.checkcreatePreviousWordButtons();
        });
        //"Refresh" button reloads the page
        this.searchElements.refreshBtn.addEventListener("click", event => {
            event.preventDefault();
            location.reload();
        });
    }
    ;
    checkcreatePreviousWordButtons() {
        const placementlocationholder = document.querySelector(".previousWords");
        let buttonContainer = this.searchElements.previousWordsContainer;
        //Check the placement locator and word caches for undefined
        if (placementlocationholder == null || DictionarySearch.wordStorage == null) {
            if (!this.previousWordsBtnIsCreated) {
                const noWordsHeadingElem = buttonContainer.appendChild(document.createElement("div"));
                noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                this.previousWordsBtnIsCreated = true;
                this.previousWordsBtnWasClicked = true;
                return;
            }
            if (!this.previousWordsBtnWasClicked) {
                buttonContainer.style.display = "block";
                this.previousWordsBtnWasClicked = true;
                return;
            }
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        if (this.previousWordsBtnWasClicked) {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        if (this.previousWordsBtnIsCreated) {
            buttonContainer.style.display = "block";
            this.previousWordsBtnWasClicked = true;
            return;
        }
        this.createPreviousWordButtons(this.previousWordsBtnWasClicked, buttonContainer);
    }
    ;
    createPreviousWordButtons(previousWordsBtnWasClicked, buttonContainer) {
        if (previousWordsBtnWasClicked) {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        let previouswordbuttons = this.createPreviousWordSearchesElements(DictionarySearch.wordStorage, buttonContainer);
        for (let btn of previouswordbuttons) {
            this.previousWordsBtnWasClicked = true;
            this.previousWordsBtnIsCreated = true;
            //add event listener for new button.
            //this is the cached word butten. when it's clicked, fire a word search
            btn.cacheWordHeadingElem.addEventListener("click", (event) => {
                event.preventDefault();
                this.wordSearch(this.searchElements, true, btn.word);
            });
            //MOBILE
            //when hovered, display the delete button option
            btn.wordHeadingElemContainer.addEventListener("touchstart", () => {
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
                //when not hovered, hide the delete button option
                btn.wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                    if (event.target == btn.deleteCacheWordHeadingElem) {
                        return;
                    }
                    btn.deleteCacheWordHeadingElem.style.opacity = "50%;";
                });
            });
            //when hovered, display the delete button option
            btn.wordHeadingElemContainer.addEventListener("mouseover", (event) => {
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
                //when not hovered, hide the delete button option
                btn.wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                    if (event.target == btn.deleteCacheWordHeadingElem) {
                        return;
                    }
                    btn.deleteCacheWordHeadingElem.style.display = "none";
                });
            });
            //when focus (such as using keyboard only), display the delete button
            btn.cacheWordHeadingElem.addEventListener("focus", (e) => {
                e.preventDefault();
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
            });
            //when not focused, hide the delete button option
            btn.deleteCacheWordHeadingElem.addEventListener("focusout", (event) => {
                if (event.target == btn.cacheWordHeadingElem) {
                    return;
                }
                btn.deleteCacheWordHeadingElem.style.display = "none";
            });
            //add event listener for delete button
            btn.deleteCacheWordHeadingElem.addEventListener("click", (event) => {
                event.preventDefault();
                btn.wordHeadingElemContainer.remove();
                this.removeDictionaryTermfromLocalStorage(btn.cacheWordHeadingElem.textContent);
            });
        }
    }
    ;
    /**
     * Adds the word to the browser's Local Storage containing word data, URL, and caching.
     *
     * @param localstoragevalue - This interface stores information where sending to Local Storage.
     */
    addDictionaryTermtoLocalStorage(localstoragevalue) {
        //Log the word cache creation
        const addedwordcache = () => {
            console.log(`%c<RWB>%cAdded word cache: ${localstoragevalue.word}`, "color:cyan;font-weight:bold;", "color:cyan;");
        };
        //The 'localstoragevalue' needs added to local storage cache
        //Local storage may be empty or already having the wanted searched word
        //Check storage is not null. If it is, add the word.
        if (DictionarySearch.wordStorage == null) {
            if (rwbErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", false, false)) {
                //Add the storage word to an array
                let wordStore = [];
                wordStore.push(localstoragevalue);
                let jsonstr = "";
                //Call RWBStringifyJSON to stringify the object
                let stringifytestsingleword = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(wordStore));
                if (!stringifytestsingleword.passed) {
                    //stringify object did not work, so return
                    //LOGLEAF
                    return;
                }
                jsonstr = stringifytestsingleword.returnstr;
                // Local storage is empty => add the word
                localStorage.setItem("word-caches", jsonstr);
                console.log(`%c<RWB>%cCreated storage key: word-caches`, "color:cyan;font-size:14px;font-weight:bold;", "color:cyan;font-size:16px;");
                addedwordcache();
                return;
            }
            //LOGLEAF
            return;
        }
        //Local storage is not empty. Here, we need to add the word to the existing word cache.
        let allcache = DictionarySearch.wordStorage;
        let jsonstr = "";
        //Match the current URL for cache management
        for (let cache of allcache) {
            if (cache.wordURL == localstoragevalue.wordURL) {
                //Word is already in Local Storage
                //No need to add it to the array
                //LOGLEAF
                return;
            }
        }
        //Add word to existing 'word-caches' in Local Storage
        allcache.push(localstoragevalue);
        //Call RWBStringifyJSON to stringify the object
        let stringifytestdoubleword = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(allcache));
        if (!stringifytestdoubleword.passed) {
            //stringify object did not work, so return
            //LOGLEAF
            return;
        }
        jsonstr = stringifytestdoubleword.returnstr;
        localStorage.setItem("word-caches", jsonstr);
        addedwordcache();
    }
    ;
    /**
     * Remove a previous word data from browser's Local Storage --> Key/Value
     * data referencing words stored in local cache.
     *
     * @param localstorageword - string from "Previous Word Searches" button
     */
    removeDictionaryTermfromLocalStorage(localstorageword) {
        //Remove the cache item to Local Storage, Cache Storage
        //Check local storage is not null or empty
        if (DictionarySearch.wordStorage == null) {
            //LOGLEAF
            return;
        }
        //Get the words array from Local Storage
        //RWBError.checkLocalStorageNullorEmpty("DictionaryWidget", "word-caches"); //log whether fetched word cache is null or empty.
        let allcache = DictionarySearch.wordStorage;
        //Remove the word from Cache Storage and Local Storage word array
        for (let wordCache of allcache) {
            if (wordCache.word == localstorageword) {
                this.removeRequestfromCacheStorage(wordCache.wordURL);
                allcache.splice(allcache.indexOf(wordCache), 1);
                console.log(`%c<RWB>%cDeleted word cache: ${localstorageword}`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
            }
        }
        if (allcache.length == 0) {
            //The removed word was the last word in the array, so remove the container
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, "color:darkcyan;font-size:14px;font-weight:bold;", "color:darkcyan;font-size:16px;");
            return;
        }
        //Call RWBStringifyJSON to stringify the object
        let wordcachesstrfytest = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(allcache));
        if (!wordcachesstrfytest.passed) {
            //LOGLEAF
            return;
        }
        //Return remaining words to Local Storage
        localStorage.setItem("word-caches", wordcachesstrfytest.returnstr);
    }
    ;
    /**
     * Remove a fetch request from Cache Storage. Utilizes
     * DictionarySearch.CacheStorageNameofWordRequest for cache name.
     * @param removeURL
     */
    removeRequestfromCacheStorage(removeURL) {
        window.caches.open(DictionarySearch.CacheStorageNameofWordRequest).then(cache => {
            caches.match(removeURL).then(result => {
                if (result === undefined) {
                    console.log("Problem matching the result. Result: ", result);
                }
                else {
                    let cachePromise = new Promise(resolve => resolve(result));
                    cachePromise.then(() => {
                        cache.delete(removeURL);
                    });
                }
            });
        });
    }
    ;
    /**
     * This function dynamically recalls a word definition request and instantiates apiGET(). The
     * returned promise also dymanically answers the widget markup.
     *
     * @param word - The word searched from widget input.
     * @param wordUrl - The fetch request URL.
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param sendToCache - ? Send fetch request to Cache Storage : Fetch without storing the request.
     * @param cacheName - If sending fetch requests to cache, provide a name to store it under.
     * @returns - wordData: Promise<unknown>
     */
    fetchDictionaryTerm(word, wordUrl, searchElems, sendToCache, cacheName) {
        //A function call parameter option is to store the word request in browser's Cache Storage
        //Structure the word data via 'localstoragewordvalue' interface used throughout fetching
        let wordcache = {
            inCache: sendToCache,
            word: word,
            wordURL: wordUrl,
            cacheName: sendToCache ? cacheName : "",
        };
        //Asynchronous fetch reqeust and dynamic markup creation from the data's return
        const wordFetchRequest = async () => {
            //Call apiGET() object constructor
            const wordFetch = new api_1.apiGET(wordcache.wordURL, wordcache.inCache, searchElems.errorElem, wordcache.cacheName);
            let noDefinitions;
            //Fetch request method call. Returned data may be the word definition
            let data = await wordFetch.apiGet(wordFetch.getGetUrl());
            if (typeof data == "string") {
                //If the returned data is a string, it is the word definition data.
                noDefinitions = false;
                let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(data));
                if (!parsetest.passed) {
                    return;
                }
                data = parsetest.returnobj;
            }
            let wordData = data;
            //If the returned data is an object, confirm it is 'no definition' server data
            if (typeof data == "object") {
                if (Object.hasOwn(wordData, "title")) {
                    //No definitions were found when data is an object with a title property
                    //wordData.title == "No Definitions Found"
                    noDefinitions = true;
                    if (wordData.title == "No Definitions Found" && wordcache.inCache == true) {
                        //The data stream here is without word data. This function awaits the api fetch's data
                        //to complete storage/promise returns. It waits 5 seconds for the browser to complete its store functions
                        //then removes the unwanted cache request.
                        //TODO:BUGRESEARCH=>During the 5 timeout, if the page refreshes a 'bad word' will be stored in the cache
                        //This 'bad word' can be removed by deleting all previous words via UI and refreshing the page. This will
                        // fire getLocalStorageWordCaches() to clear any mismatched worddata<-->cachedrequests.
                        setTimeout(() => {
                            //Function awaiting request's Cache Storage caching
                            try {
                                this.removeRequestfromCacheStorage(wordFetch.getGetUrl());
                            }
                            catch {
                                console.log("Could not remove from Cache Storage. Name: ", wordFetch.getGetUrl());
                            }
                        }, 5000);
                    }
                }
            }
            if (data == undefined || noDefinitions) {
                //Good data--> return data for markup render
                //'Bad data' due to "No definitions found", invalid word, bad network connection
                if (!navigator.onLine) {
                    //Online, problem with fetch
                    //Offline request
                    searchElems.errorElem.innerText += ", check network connection.";
                    return;
                }
                if (noDefinitions) {
                    //Server returned no definitions data
                    if (wordData.title == "No Definitions Found")
                        searchElems.errorElem.innerText = "No Definitions Found";
                    searchElems.errorElem.classList.add("error-notfound");
                    return data;
                }
                return;
            }
            this.addDictionaryTermtoLocalStorage(wordcache);
            return data;
        };
        let wordData = wordFetchRequest();
        return wordData;
    }
    ;
    /**
     * User input validation function tests the input string against a valid Regular Expression.
     *
     *    RegExp("^[A-Za-z]{1,45}$")
     *
     * @param intxt - String value received from user field input.
     * @returns Acceptable user input: true or false.
     */
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
    ;
    /**
     * callFetchDictionaryTerm awaits a promise, fetching a dictionary term. The data
     * ingress calls markup creation function.
     *
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param word - The word to be fetched.
     * @param wordURL - A URL composing the full url of the fetch request.
     */
    callFetchDictionaryTerm(searchElems, word, wordURL) {
        // When the word data resolves, call markup functions
        let wordDataPromise = new Promise(resolve => {
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, true, DictionarySearch.CacheStorageNameofWordRequest));
        });
        wordDataPromise.then((data) => {
            this.wordData = data;
            this.createDictionaryTermWithMarkup(data, searchElems);
            if (data == undefined || Object.hasOwn(data, "title"))
                return;
            console.log(`%c<RWB>%cRetrieved word: ${word}`, "color:gold;font-weight:bold;", "color:gold;");
            // Remove unneeded classes if applied previously
            searchElems.searchWord.classList.remove("invalid");
            searchElems.searchWord.classList.remove("invalid-notfound");
            searchElems.errorElem.classList.remove("error");
            searchElems.errorElem.classList.remove("error-notfound");
            searchElems.errorElem.textContent = "";
        });
    }
    ;
    /**
     * wordSearch() begins a word search request. The user input listener chooses
     * whether the fetch is called from cache or is new.
     *
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param isFromPreviousWords - True if the user requested a search from a previous word, to call data from Browser Cache.
     * @param cachedWord - If the user called for a previous word, cachedWord is within the Local Storage.
     */
    wordSearch(searchElems, isFromPreviousWords, cachedWord) {
        if (isFromPreviousWords) {
            this.callFetchDictionaryTerm(searchElems, cachedWord.word, cachedWord.wordURL);
        }
        else {
            // Take user input and filter to an accepted string
            let acceptedInputWord = false;
            this.wordValidation(searchElems.searchWord.value)
                ? (acceptedInputWord = true)
                : (acceptedInputWord = false);
            if (acceptedInputWord) {
                // Create a URL of the accepted word for use in the fetch call
                this.wordURL = new URL(searchElems.searchWord.value.toString(), DictionarySearch.requestUrl);
                this.callFetchDictionaryTerm(searchElems, searchElems.searchWord.value, this.wordURL);
            }
            else {
                searchElems.searchWord.classList.remove("invalid-notfound");
                searchElems.searchWord.classList.add("invalid");
                searchElems.errorElem.classList.remove("error-notfound");
                searchElems.errorElem.classList.add("error");
                searchElems.errorElem.textContent = "Invalid word!";
                searchElems.searchWord.classList.add("invalid-notfound");
            }
        }
        searchElems.searchWord.value = ""; // reset input string
    }
    ;
}
exports.DictionarySearch = DictionarySearch;

},{"./api":11,"./dictionarySearchMarkup":16,"./rwbErrorBus":20,"./rwbJsonConverter":21}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A DictionarySearchWidget is made to create the markup needed for the
 *  Dictionary Search. Elements are created and appended to the page to the class
 *  'dictionaryWidget'
 */
class DictionarySearchMarkup {
    searchElements;
    constructor(elem) {
        //insert the widget after the passed in "elem"
        if (elem == undefined) {
            console.log(`%cThere is no "dictionaryWidget" class on this page.`, "color: orange;");
            return;
        }
        if (!elem.classList.contains("dictionaryWidget")) {
            console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
            return;
        }
        this.createDictionaryWidgetMarkup(elem);
    }
    ;
    /**
     * Primary widget markup structuring the widget elements and search input.
     *
     * @param elem - The reference element before the widget.
     * @returns searchElements: DictionarySearchElements --> interface of
     *  important HTML elements used through widget function.
     */
    createDictionaryWidgetMarkup(elem) {
        const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
        if (dictionary == null) {
            console.log("The determined dictionary element is null.");
            return;
        }
        // Create widget elements
        const artH = dictionary.appendChild(document.createElement("h3"));
        const searchForm = dictionary.appendChild(document.createElement("form"));
        const previousWords = dictionary.appendChild(document.createElement("div"));
        // Return elements used in later functions
        let searchElements = {
            searchWord: searchForm.appendChild(document.createElement("input")),
            wordSearch: searchForm.appendChild(document.createElement("button")),
            dictionaryElem: dictionary,
            errorElem: searchForm.appendChild(document.createElement("span")),
            previousWordBtn: previousWords.appendChild(document.createElement("button")),
            previousWordsContainer: dictionary.appendChild(document.createElement("div")),
            refreshBtn: previousWords.appendChild(document.createElement("button")),
        };
        // Add attributes and property values
        const fontAwesomeSearchIcon = searchElements.wordSearch.appendChild(document.createElement("i"));
        fontAwesomeSearchIcon.classList.add("fa");
        fontAwesomeSearchIcon.classList.add("fa-search");
        previousWords.classList.add("previousWords");
        searchElements.searchWord.classList.add("monospace");
        searchElements.previousWordBtn.classList.add("dictionary-btn");
        searchElements.refreshBtn.classList.add("dictionary-btn");
        searchElements.searchWord.setAttribute("type", "search");
        searchElements.searchWord.setAttribute("placeholder", "Search...");
        searchElements.searchWord.setAttribute("aria-label", "Input");
        searchElements.wordSearch.setAttribute("type", "submit");
        searchElements.wordSearch.setAttribute("aria-label", "Search");
        searchElements.searchWord.id = "search-word";
        searchElements.wordSearch.id = "word-search";
        searchElements.previousWordBtn.innerText = "Previous Word Searches";
        searchElements.refreshBtn.innerText = "Refresh";
        searchElements.previousWordsContainer.id = "dictionary-btns";
        dictionary.id = "dictionary";
        searchForm.id = "dictionary-search";
        searchForm.action = "index.html";
        artH.textContent = "Dictionary Term:";
        this.searchElements = searchElements;
    }
    ;
    /**
     * Creates the markup to house returned words from DictionarySearch. The markup
     *  is created based on API egress. Words and their definitions vary. The markup is
     *  adaptive to returned word data structures.
     *
     * @param wordData - This parameter is an object of word types, definitions, and examples.
     * @param searchElems - Widget Elements -- key widget function elements.
     */
    createDictionaryTermWithMarkup(wordData, searchElems) {
        if (wordData == null || !(wordData instanceof Object) || Object.hasOwn(wordData, "title")) {
            console.log("%cThere is no definition for this word.", "color:darkgreen;");
            return;
        }
        // Add word definition to the dictionary widget
        const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr")); // word definition separator
        definitionDescriptionContainer.classList.add("definitionDescription");
        // The word data represents complex JSON object
        // Recurse the word data object, adding elements from the various levels
        wordData.map((word) => {
            definitionDescriptionContainer.setAttribute("word", word.word);
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
                        const newP = definitionP.insertAdjacentElement("beforeend", document.createElement("p"));
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
        //create clear button
        const deleteWordTermHeadingElem = definitionDescriptionContainer.appendChild(document.createElement("button"));
        deleteWordTermHeadingElem.setAttribute("type", "word-clear");
        deleteWordTermHeadingElem.classList.add("dictionary-word-btn-clear");
        deleteWordTermHeadingElem.style.display = "block";
        //when clear button is hovered, display it
        definitionDescriptionContainer.addEventListener("mouseover", event => {
            deleteWordTermHeadingElem.style.opacity = "100%";
            //when clear button is not hovered, hide it
            definitionDescriptionContainer.addEventListener("mouseout", () => {
                deleteWordTermHeadingElem.style.opacity = "50%";
            });
        });
        //when clear button is clicked, clear the elements
        deleteWordTermHeadingElem.addEventListener("click", event => {
            event.preventDefault();
            definitionDescriptionContainer.remove();
            console.log(`%c<RWB>%cRemoved word: ${definitionDescriptionContainer.getAttribute("word")}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
        });
        //add clear button to widget
        definitionDescriptionContainer.appendChild(definitionDescription);
    }
    ;
    createPreviousWordSearchesElements(wordstorage, buttonContainer) {
        let buttonsarr = [];
        //Because the locator and the Local Storage values are viable, create the markup
        //needed to display those words. Add event listeners for widget functionality.
        for (let wordCache of wordstorage) {
            const wordHeadingElemContainer = buttonContainer.appendChild(document.createElement("div"));
            const cacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
            const deleteCacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
            deleteCacheWordHeadingElem.setAttribute("type", "button-clear");
            deleteCacheWordHeadingElem.classList.add("dictionary-word-btn-clear");
            cacheWordHeadingElem.setAttribute("type", "button");
            cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
            cacheWordHeadingElem.textContent = wordCache.word;
            let previouswordbtn = {
                word: wordCache,
                cacheWordHeadingElem: cacheWordHeadingElem,
                wordHeadingElemContainer: wordHeadingElemContainer,
                deleteCacheWordHeadingElem: deleteCacheWordHeadingElem,
            };
            buttonsarr.push(previouswordbtn);
        }
        return buttonsarr;
    }
    ;
}
exports.default = DictionarySearchMarkup;

},{}],17:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardCardElems = void 0;
/** This object creates an array of div elements from port number information*/
class FlashcardCardElems {
    /**Counts the number of widget objects instantiated */
    static widgetcount = 0;
    /**Counts the number of objects within the widget instantiated [flashcards] */
    static totalflashcards = 0;
    m_flashcardsArr = [];
    flashcardscount = 0;
    m_portInfoMap;
    constructor(portnumbersMap) {
        this.m_portInfoMap = portnumbersMap;
        const mapIter = this.m_portInfoMap.keys();
        FlashcardCardElems.widgetcount++;
        this.m_portInfoMap.forEach(port => {
            // Create list element
            let flashcard = document.createElement("li");
            //TODO: let flashcard = new GrowingCardElement();
            //Unable to instantiate li element as growing card due to DOM unavalable --> requires shadowDOM manipulate
            // Populate element for page use
            const inner = flashcard.appendChild(document.createElement("div"));
            const flipfront = inner.appendChild(document.createElement("div"));
            const flipback = inner.appendChild(document.createElement("div"));
            let gameCardSpan = flipfront.appendChild(document.createElement("span"));
            let gameCardBackSpan = flipback.appendChild(document.createElement("span"));
            flashcard.classList.add("flip-card", "gameCard");
            inner.classList.add("inner", "vertical");
            flipfront.classList.add("cardFront");
            flipback.classList.add("cardBack", "vertical");
            gameCardSpan.innerText = `Port# ${mapIter.next().value}`;
            gameCardBackSpan.innerText = `${port}`;
            this.flashcardscount++;
            FlashcardCardElems.totalflashcards++;
            // Add div to flashcard instance
            this.m_flashcardsArr.push(flashcard);
        });
    }
    ;
}
exports.FlashcardCardElems = FlashcardCardElems;

},{}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rwbCard_1 = __importDefault(require("./rwbCard"));
const rwbErrorBus_1 = __importDefault(require("./rwbErrorBus"));
class RandomWebBits {
    cardsSection;
    cardsData;
    constructor(cardsSection, cardsData) {
        this.cardsSection = cardsSection;
        this.cardsData = cardsData;
    }
    ;
    static buildCardContainingSection(sectionTitle, sectionHeadingID, containerType) {
        // Create sectional elements to append to main
        const pageMain = document.querySelector("main");
        if (pageMain == null || pageMain.nodeName !== "MAIN") {
            if (rwbErrorBus_1.default.checkElementforNull("MainRWB", "main", true, true)) {
                ReadableStreamDefaultController;
            }
        }
        // Create card section elements
        // <section class="cards">
        //     <h2>Arbitrary Articles:</h2>
        //     <div class="card_columns">
        //     </div>
        // </section>
        //
        const AASection = document.createElement("section");
        let aaHeading = document.createElement("h2");
        let aaCardsSection = document.createElement("div");
        AASection.appendChild(aaHeading);
        AASection.appendChild(aaCardsSection);
        pageMain.append(AASection);
        // Add data attributes and property values
        AASection.classList.add("cards");
        switch (containerType) {
            case "slideshow":
                aaCardsSection.classList.add("card_columns", "cardslideshow", "grid");
                break;
            case "accordion":
                aaCardsSection.classList.add("card_columns", "cardaccordion", "grid");
                break;
            default:
                aaCardsSection.classList.add("card_columns", "grid");
                break;
        }
        aaHeading.innerText = `${sectionTitle}`;
        aaHeading.setAttribute("id", sectionHeadingID);
        return aaCardsSection;
    }
    ;
    static buildRWBCards(cardsData) {
        // Iterate each card in the array. Build the card elements and add the data
        return cardsData.map((article) => {
            const rwbcard = new rwbCard_1.default();
            return rwbcard.buildRWBCardMarkup(article);
        });
    }
    ;
    static buildRWBIntroduction() {
        let introduction = document.createElement("section");
        let Title = introduction.appendChild(document.createElement("h1"));
        Title.classList.add("Title");
        Title.innerText = "Home | Arbitrary Web Bits";
        let h2 = introduction.appendChild(document.createElement("h2"));
        h2.innerText = "New to the Web?";
        let para1 = introduction.appendChild(document.createElement("p"));
        para1.innerText =
            "If you are new to web development, there are innumerous enumerations of stuff and things the World Wide Web offers that you don't know.";
        let para2 = introduction.appendChild(document.createElement("p"));
        para2.innerText = "You may want to start by claiming a stake to a domain name.";
        return introduction;
    }
    ;
}
exports.default = RandomWebBits;

},{"./rwbCard":19,"./rwbErrorBus":20}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RWBCard {
    /**
     * Card elements to display an icon picture and card body. An image, the image top, the card body.
     */
    rwbcardelements;
    /**
     *  Map WebBit data to a card each
     *
     *  <div class="card">
     *      <div>
     *          <img src="" alt="" article="">
     *      </div>
     *      <div class="cardBody">
     *          <h3></h3>
     *          <p></p>
     *          <a href=""></a>
     *      </div>
     *  </div>
     */
    buildRWBCardMarkup(article) {
        let WebBit = document.createElement("div");
        this.rwbcardelements = {
            cardImg: document.createElement("img"),
            cardImgTop: document.createElement("div"),
            cardBody: document.createElement("div"),
        };
        let cardBodyHeading = document.createElement("h3");
        let cardBodyPara = document.createElement("p");
        let cardBodyLink = document.createElement("a");
        this.rwbcardelements.cardImgTop.appendChild(this.rwbcardelements.cardImg);
        this.rwbcardelements.cardBody.appendChild(cardBodyHeading);
        this.rwbcardelements.cardBody.appendChild(cardBodyPara);
        this.rwbcardelements.cardBody.appendChild(cardBodyLink);
        // Add card data attributes and property values
        WebBit.classList.add("card");
        WebBit.setAttribute("id", `${article.id}`);
        this.rwbcardelements.cardBody.classList.add("cardBody");
        this.rwbcardelements.cardImg.setAttribute("src", article.cardImage);
        this.rwbcardelements.cardImg.setAttribute("alt", article.cardImageALT);
        this.rwbcardelements.cardImg.setAttribute("Article", article.articleNumber.toString());
        cardBodyLink.setAttribute("href", article.articleLink);
        cardBodyHeading.innerText = article.name;
        cardBodyPara.textContent = article.description;
        cardBodyLink.textContent = "Go to Page";
        // Image attribution may be needed for the image used
        // Attribution data is imported as 'attrlinks' signature parameter
        if (article.linkAttribution) {
            this.buildRWBCardAttributionPanel(this.rwbcardelements, article.linkAttribution);
        }
        // The card is WebBit
        // Add the markup to the containing element
        WebBit.appendChild(this.rwbcardelements.cardImgTop);
        WebBit.appendChild(this.rwbcardelements.cardBody);
        return WebBit;
    }
    ;
    /**
     * Function to determine image attribution, the image id and article id will match,
     * otherwise the data isn't entered, causing a miss
     *
     *  <div class="flip-card"><!--card image panel-->
     *  <div class="inner">
     *      <div class="cardFront">
     *          <img src="" alt="" article="">
     *      </div>
     *           <div class="cardBack">
     *               <h3></h3>
     *               <p></p>
     *               <img src="" alt="" article="" class="imgSmall imgPTR">
     *           </div>
     *      </div>
     *  </div><!--end card image panel-->
     * @param rwbcardelements Card elements to display an icon picture and card body. An image, the image top, the card body.
     * @param link Attribution link
     */
    buildRWBCardAttributionPanel(rwbcardelements, link) {
        if (rwbcardelements.cardImg.getAttribute("Article") === link.articleId.toString()) {
            // Create image back panel elements and add the data
            // Redefine card image panel as a flip panel
            const cardInner = rwbcardelements.cardImgTop.appendChild(document.createElement("div"));
            const cardFront = cardInner.appendChild(document.createElement("div"));
            cardFront.appendChild(rwbcardelements.cardImg); // move image within card front divisor
            let smallImg = rwbcardelements.cardImg.cloneNode(false);
            const cardBack = cardInner.appendChild(document.createElement("div"));
            const backHeading = cardBack.appendChild(document.createElement("h3"));
            cardBack.appendChild(smallImg);
            const backPara = cardBack.appendChild(document.createElement("p"));
            const attributeLink = rwbcardelements.cardBody.appendChild(document.createElement("a")); //append to front panel
            // Add flip-panel data attributes and property values
            rwbcardelements.cardImgTop.classList.add("flip-card");
            cardInner.classList.add("inner");
            cardFront.classList.add("cardFront");
            smallImg.classList.add("imgSmall", "imgPTR");
            cardBack.classList.add("cardBack");
            attributeLink.classList.add("attribute");
            backHeading.textContent = link.attributedOwner;
            backPara.textContent = link.innerText;
            attributeLink.href = link.hReference;
            attributeLink.title = link.title;
            attributeLink.textContent = link.attributedOwner;
        }
    }
    ;
}
exports.default = RWBCard;

},{}],20:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.RwbDomException = exports.RwbSyntaxError = exports.RwbReferenceError = void 0;
/** Create this object to record reference errors. */
class RwbError {
    /**Counts the number of objects instantiated */
    static count = 0;
    constructor() {
        RwbError.count++;
    }
    ;
    static checkElementforNull(componentName, cssQuery, logMessage, supressException) {
        let elem;
        let logmssg = true; //Log message option default
        if (!logMessage)
            logmssg = logMessage;
        let supressexcpt = false; //Supress message option default
        if (supressException)
            supressexcpt = true;
        let query = `${cssQuery}`;
        // Add dictionary widget if an element with that class is on a page
        try {
            elem = document.querySelector(query);
        }
        catch {
            Object.create(new RwbReferenceError("GetElement", `Could not get element: '${query}'`));
        }
        if (elem == null) {
            if (logmssg)
                console.info(`%cNo element found with query: ${query}.`, "color: orange;");
            if (!supressexcpt)
                Object.create(new RwbReferenceError(`${componentName}NullReference`, `Element not found`));
            return true;
        }
        return false;
    }
    ;
    static checkLocalStorageEqualNull(componentName, key, checkEmptyString, logMessage) {
        let logmssg = true;
        if (!logMessage)
            logmssg = logMessage;
        if (localStorage.getItem(`${key}`) == null) {
            if (logmssg)
                console.info(`%cNo local storage for ${componentName}.`, "color:purple;");
            return true;
        }
        if (checkEmptyString)
            return RwbError.checkLocalStorageNullorEmpty(componentName, key, logmssg);
    }
    ;
    static checkLocalStorageNullorEmpty(componentName, key, logMessage) {
        let logmssg = true;
        if (!logMessage)
            logmssg = logMessage;
        let test;
        try {
            test = localStorage.getItem(`${key}`);
        }
        catch {
            throw new Error(`Could get local storage key: ${key}`);
        }
        if (test == null) {
            if (logmssg)
                console.warn(`%cLocal storage key not found: ${key}.`, "color: yellow;font-weight:bold;");
            Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Key not found`));
            return true;
        }
        if (test == "" || test == "[]") {
            if (logmssg)
                console.warn(`%cLocal storage value is empty for key: ${key}`, "color: yellow;font-weight:bold;");
            Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Value is empty`));
            return true;
        }
        return false;
    }
    ;
}
exports.default = RwbError;
/** Create this object to store reference error data. */
class RwbReferenceError extends ReferenceError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    refError;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        let err = new ReferenceError(this.message);
        this.refError = err;
        console.error(`%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.refError, "color:red;font-weight:bold;");
        RwbReferenceError.count++;
    }
    ;
}
exports.RwbReferenceError = RwbReferenceError;
/** Create this object to store syntax error data. */
class RwbSyntaxError extends SyntaxError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    syntaxError;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        let err = new SyntaxError(this.message);
        this.syntaxError = err;
        console.error(`%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.syntaxError, "color:red;font-weight:bold;");
        RwbSyntaxError.count++;
    }
    ;
}
exports.RwbSyntaxError = RwbSyntaxError;
class RwbDomException extends DOMException {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    stack;
    page;
    domError;
    constructor(name, message, error) {
        super();
        this.name = name;
        this.message = message;
        this.stack = error;
        this.page = window.location.pathname;
        let err = new DOMException(this.message);
        this.domError = err;
        console.error(`%c<RWB>%cExecution experienced a DOM error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.stack, "color:red;font-weight:bold;");
        RwbDomException.count++;
    }
    ;
}
exports.RwbDomException = RwbDomException;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RWBStringifyJSON = exports.RWBParseJSON = void 0;
//--Copyright (c) 2023 Robert A. Howell
const rwbErrorBus_1 = require("./rwbErrorBus");
/** An RWBParseJSON parses json and stores the parsed string with the result. */
class RWBParseJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    returnobj;
    passed;
    parsestr;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(parsestr) {
        RWBParseJSON.count++;
        this.parsestr = parsestr;
        this.passed = this.RWBparseJSON();
    }
    ;
    RWBparseJSON() {
        try {
            this.returnobj = JSON.parse(this.parsestr);
        }
        catch (e) {
            this.returnobj = null;
            new rwbErrorBus_1.RwbSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
    ;
}
exports.RWBParseJSON = RWBParseJSON;
/** An RWBParseJSON tests whether an object can be stringified into a valid
 * json string. */
class RWBStringifyJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    returnstr;
    passed;
    json;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(json) {
        RWBStringifyJSON.count++;
        this.json = json;
        this.passed = this.parseJSON();
    }
    ;
    parseJSON() {
        try {
            this.returnstr = JSON.stringify(this.json);
        }
        catch (e) {
            this.returnstr = null;
            new rwbErrorBus_1.RwbSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
    ;
}
exports.RWBStringifyJSON = RWBStringifyJSON;

},{"./rwbErrorBus":20}],22:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HTML link element data. Used with anchor tags.
 */
class RwbLink {
    /**Counts the number of objects instantiated */
    static count = 0;
    /**HTML title attribute */
    title;
    /**Inner text string */
    innerText;
    /**The page the link is associated to */
    pageName;
    /**HTML href attribute */
    hReference;
    constructor(title, innerText, pageName, hReference) {
        (this.title = title),
            (this.innerText = innerText),
            (this.pageName = pageName),
            (this.hReference = hReference),
            RwbLink.count++;
    }
    ;
}
exports.default = RwbLink;

},{}],23:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
/** Create this object to record performance start and end marks. */
class RwbPerf {
    /**Counts the number of objects instantiated */
    static count = 0;
    scriptRuntimeMarks = {
        name: null,
        startMark: null,
        endMark: null,
    };
    /** Instantiating a ScriptPerf records the performance start mark. */
    constructor(scriptName) {
        this.scriptRuntimeMarks.name = scriptName;
        this.scriptRuntimeMarks.startMark = performance.mark(`${this.scriptRuntimeMarks.name}-start`);
        RwbPerf.count++;
    }
    ;
    /** Call end() to set the end time stamp. */
    end() {
        this.scriptRuntimeMarks.endMark = performance.mark(`${this.scriptRuntimeMarks.name}-end`);
        this.measure();
    }
    ;
    /** A console output of this object's performance measurement. */
    measure() {
        let measure = performance.measure(this.scriptRuntimeMarks.name, this.scriptRuntimeMarks.startMark.name, this.scriptRuntimeMarks.endMark.name);
        return console.debug(`${this.scriptRuntimeMarks.name} execution time is: ${measure.duration}`);
    }
    ;
}
exports.default = RwbPerf;

},{}],24:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
const rwbJsonConverter_1 = require("./rwbJsonConverter");
const rwbErrorBus_1 = __importDefault(require("./rwbErrorBus"));
/**
 * A ToDoList is an HTML widget to store To-Dos in the browser. Instantiate the
 *  ToDoList constructor to create widget markup and functionality. To-Dos are
 *  stored in the browser's Local Storage and read and rendered when the page loads.
 *
 * To create a ToDoList, an element on the page must have '.ToDoList' class. Call the
 *  class constructor, passing in that element to create the widget.
 *
 *       const todoWidget = new ToDoList();
 *       todoWidget.createToDoListWidget(elem);
 *
 * Then, the widget is created and To-Dos are retrieved from storage.
 */
class ToDoList {
    /**Total number of ToDOs*/
    static ToDOs = 0;
    /**Widget elements used to populate todos */
    static ToDoElements;
    static ToDoInStorage;
    /**Todo HTML elements */
    listElements;
    /**
     * Sets the To-Do list widget's elements.
     *
     *      ToDoList.ToDoElements
     * @param ToDoElements Widget Elements -- key widget function elements.
     */
    static setToDoListElements(ToDoElements) {
        ToDoList.ToDoElements = ToDoElements;
    }
    ;
    /**
     * Random Web Bits uses multiple locations to apply the To-Do List widget. Create
     *  the list markup, passing in a reference element for placement of the widget.
     * @param elem - widget is placed after this reference element.
     */
    createToDoListWidget(elem) {
        //Insert the widget after the passed in "elem"
        //Dependent on the page, todo widget may have pre-existing markup in place
        //Switch against the current page to determine markup needed
        if (elem == undefined) {
            console.log(`%cThere is no "ToDoList" class on this page.`, "color:orange;");
            return;
        }
        if (!elem.classList.contains("ToDoList")) {
            console.log(`Add "ToDoList" class to ${elem.nodeName} node.`);
            return;
        }
        switch (window.location.pathname) {
            case "/RandomWebBits/":
            case "/RandomWebBits/index.html":
            case "/index.html":
            case "/":
            case "/dist/index.html":
                //Markup does not exist on the page
                //Create table elements needed for the todo list
                const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                const header = todolistSection.appendChild(document.createElement("h3"));
                const div = todolistSection.appendChild(document.createElement("div"));
                const table = div.appendChild(document.createElement("table"));
                const thead = table.appendChild(document.createElement("thead"));
                const tr1 = thead.appendChild(document.createElement("tr"));
                const thleft = tr1.appendChild(document.createElement("th"));
                const thmiddle = tr1.appendChild(document.createElement("th"));
                const tbody = table.appendChild(document.createElement("tbody"));
                const tfoot = table.appendChild(document.createElement("tfoot"));
                const tr3 = tfoot.appendChild(document.createElement("tr"));
                const td3left = tr3.appendChild(document.createElement("td"));
                const td3IN = td3left.appendChild(document.createElement("input"));
                const td3middle = tr3.appendChild(document.createElement("td"));
                const INPUT = td3middle.appendChild(document.createElement("input"));
                //Add attributes and property values
                table.appendChild(document.createElement("tfoot"));
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
                //Create a sample to do item (it is not stored in cache)
                this.createSampleTo_Do(tbody);
                //With the elements created, set the class list elements
                this.getToDoListElements();
                ToDoList.setToDoListElements(this.listElements);
                this.populateToDoList();
                this.addToDoEventListeners();
                break;
            case "/RandomWebBits/pages/todos.html":
            case "/pages/todos.html":
                //Markup exists on the page already
                //With the elements created, set the class list elements
                this.getToDoListElements();
                ToDoList.setToDoListElements(this.listElements);
                //Create a sample to do item due to cache empty
                const htbody = ToDoList.ToDoElements.todoTableBody;
                if (htbody != null) {
                    this.createSampleTo_Do(htbody);
                }
                this.populateToDoList();
                this.addToDoEventListeners();
                break;
            default:
                console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.");
        }
    }
    ;
    /**
   * Checks for To-Do items from Local Storage.
   * @returns boolean true or false
   */
    static getToDoInStorage(checkemptyvaluestring, logmessage) {
        if (rwbErrorBus_1.default.checkLocalStorageEqualNull("ToDoList", "ToDos", checkemptyvaluestring, logmessage)) {
            return false;
        }
        let parsestr = localStorage.getItem("ToDos");
        let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(parsestr));
        if (!parsetest.passed) {
            //parsed JSON is malformed
            localStorage.removeItem("ToDos");
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, "color:orange;font-size:14px;font-weight:bold;", "color:orange;font-size:16px;");
            return false;
        }
        this.ToDoInStorage = parsetest.returnobj;
        return true;
    }
    ;
    /**
     * Gather necessary elements from the created widget.
     * @returns ToDoElements: ToDoListElements
     */
    getToDoListElements() {
        //Gather necessary elements from the created widget
        //Each widget location's elements may vary, so a call of getToDoListElements()
        //locates the page's elements to populate the ToDoElements interface.
        let ToDoElements = {
            todoTable: document.querySelector("#ToDO table"),
            todoTableBody: document.getElementById("ToDoItems"),
            addButton: document.getElementById("AddButton"),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        };
        this.listElements = ToDoElements;
    }
    ;
    /**
     * Adds a To-Do to Local Storage.
     * @param description - The UI form input description.
     */
    addtoDoToStorage(description) {
        //Add the ToDos array to local cache.
        //The 'localstoragetodocache' interface structures the data for later retrieval.
        let ToDo = {
            inCache: false,
            todoitem: description,
        };
        let ToDos = []; //ToDo array
        let strgfy;
        const stringifytodo = (todostr) => {
            //Call RWBStringifyJSON to stringify the object
            let todosstrgfytest = Object.create(new rwbJsonConverter_1.RWBStringifyJSON(todostr));
            if (!todosstrgfytest.passed) {
                //LOGLEAF
                return;
            }
            return todosstrgfytest.returnstr;
        };
        //First, read current Local Storage ToDos
        let todosstoragecache = ToDoList.getToDoInStorage(false, false);
        if (todosstoragecache) {
            ToDos = ToDoList.ToDoInStorage;
            ToDos.push(ToDo);
            //Call RWBStringifyJSON to stringify the object
            strgfy = stringifytodo(ToDos);
            localStorage.setItem("ToDos", strgfy);
        }
        else {
            ToDos.push(ToDo);
            //Call RWBStringifyJSON to stringify the object
            strgfy = stringifytodo(ToDos);
            localStorage.setItem("ToDos", strgfy);
            console.log(`%c<RWB>%cCreated to-do cache key: ToDos`, "color:cyan;font-size:14px;font-weight:bold;", "color:cyan;font-size:16px;");
        }
        console.log(`%c<RWB>%cAdded to-do cache: ${description}`, "color:cyan;font-weight:bold;", "color:cyan;");
    }
    ;
    /**
     * Removes a To-Do item from Local Storage. The requested To-Do to remove is
     *  pulled individually from the key-value pair object.
     * @param item - the To-Do item requested to remove
     */
    removetoDoFromStorage(item) {
        ToDoList.ToDoInStorage = ToDoList.ToDoInStorage.filter(todo => todo.todoitem !== item);
        console.log(`%c<RWB>%cDeleted todo cache: ${item}`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
        let todoinstoragestrgfytest = Object.create(new rwbJsonConverter_1.RWBStringifyJSON(ToDoList.ToDoInStorage));
        if (!todoinstoragestrgfytest.passed) {
            //LOGLEAF
            return;
        }
        let jsonstr = todoinstoragestrgfytest.returnstr;
        if (jsonstr == "" || jsonstr == "[]") {
            localStorage.removeItem("ToDos");
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, "color:darkcyan;font-size:14px;font-weight:bold;", "color:darkcyan;font-size:16px;");
            return;
        }
        localStorage.setItem("ToDos", jsonstr);
    }
    ;
    /**
     * This function creates the necessary markup to add a row to the To-Do table.
     *  A row consists of three columns: a complete tick-box, a description, and a delete button.
     * @param description - User form input to add as a description.
     * @param firstPaint - Boolean value used by adding list storage
     */
    AddToDoRow(description, firstPaint) {
        //Create a table row with checkbox and delete options
        const TABLEITEM = ToDoList.ToDoElements.todoTable;
        const tableFrag = document.createDocumentFragment();
        const newRow = tableFrag.appendChild(document.createElement("tr")); //Add row
        const firstCOL = newRow.appendChild(document.createElement("td")); //Table first data
        const checkBOX = firstCOL.appendChild(document.createElement("input")); //Add checkbox
        const newITEM = newRow.appendChild(document.createElement("td")); //Table second data
        const secondCOL = newRow.appendChild(document.createElement("td")); //Table third data
        const delBOX = secondCOL.appendChild(document.createElement("input")); //Add deletebox
        //Add attributes and property values
        checkBOX.setAttribute("type", "checkbox");
        checkBOX.setAttribute("aria-label", "Checkbox");
        checkBOX.setAttribute("aria-label", "Delete");
        newITEM.setAttribute("num", ToDoList.ToDOs
            ? (() => {
                let elem = document.querySelector("#ToDO td[num]");
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoList.ToDOs).toString();
            })()
            : (1).toString());
        newITEM.textContent = description; //Populate second col
        ToDoList.ToDOs++; //Number of Items
        delBOX.setAttribute("type", "submit");
        delBOX.setAttribute("value", "Delete");
        if (firstPaint) {
            //Add to list storage
            this.addtoDoToStorage(description);
        }
        //Add the row to the ToDos table
        TABLEITEM.appendChild(tableFrag);
        console.log(`%c<RWB>%cCreated to-do table row`, "color:gold;font-weight:bold;", "color:gold;");
        //Add an event listener for when 'delete' is clicked
        delBOX.addEventListener("click", () => {
            this.DeleteButton(delBOX);
        });
    }
    ;
    /**
     * Function called to create the To-Do item rows from To-Dos stored in the browser Local Storage.
     */
    populateToDoList() {
        if (ToDoList.getToDoInStorage(true, false)) {
            for (let i = 0; i < ToDoList.ToDoInStorage.length; i++) {
                this.AddToDoRow(ToDoList.ToDoInStorage[i].todoitem, false);
            }
        }
    }
    ;
    /**
     * Add button functionality.
     */
    addToDoEventListeners() {
        const ADDBUTTON = ToDoList.ToDoElements.addButton;
        const ADDITEMENTER = ToDoList.ToDoElements.addItemToEnter;
        if (ADDBUTTON == null && ADDITEMENTER == null) {
            throw new Error("Element was not found or is null");
        }
        /**Add input text to the todo list from clicking the add button*/
        ADDBUTTON.addEventListener("click", () => {
            this.AddToDoRow(ADDITEMENTER.value, true);
            ADDITEMENTER.value = "";
        });
        /**Add input text to the todo list when using key enter*/
        ADDITEMENTER.addEventListener("keydown", e => {
            if (e.code == "NumpadEnter" || e.code == "Enter") {
                this.AddToDoRow(ADDITEMENTER.value, true);
                ADDITEMENTER.value = "";
            }
        });
    }
    ;
    /**
     * function determining the delete button. Items are deleted when pushed, but are
     *  not removed from storage without 'Complete?' checkebox checked.
     * @param box input element
     */
    DeleteButton(box) {
        if (box.parentNode == null ||
            box.parentNode.previousSibling == null ||
            box.parentNode.previousSibling.previousSibling == null) {
            throw new Error("Missing a table element.");
        }
        const rowChkBx = (box.parentNode.previousSibling.previousSibling);
        /** Input element */
        const rowChkBxIN = rowChkBx.childNodes[0];
        const todoTable = ToDoList.ToDoElements.todoTable;
        const tr = (box.parentNode.parentNode);
        let i = tr.rowIndex;
        const value = box.parentNode.previousSibling.textContent;
        if (rowChkBxIN.checked) {
            //remove row since completed
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cDeleted todo row: ${box.parentElement.previousElementSibling.textContent}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
            if (value != "Add a ToDO Item.") {
                ToDoList.ToDOs--;
                //delete associated storage item
                this.removetoDoFromStorage(value);
            }
        }
        else {
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cRemoved todo row: ${box.parentElement.previousElementSibling.textContent}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
            ToDoList.ToDOs--;
        }
    }
    ;
    /**
     * This function is called to seed the To-Do List when there are no Local Storage items
     *  which would populate the list. The sample remains on page but is never stored in the browser.
     * @param tbody table body element
     */
    createSampleTo_Do(tbody) {
        if (ToDoList.getToDoInStorage(false, true))
            return;
        //Create a sample entry in the ToDo table as a placeholder
        const tr2 = tbody.appendChild(document.createElement("tr"));
        const td2left = tr2.appendChild(document.createElement("td"));
        const td2IN = td2left.appendChild(document.createElement("input"));
        const td2middle = tr2.appendChild(document.createElement("td"));
        const td2right = tr2.appendChild(document.createElement("td"));
        const td2DEL = td2right.appendChild(document.createElement("input"));
        //Add attributes and property values
        td2IN.setAttribute("aria-label", "Checkbox");
        td2middle.setAttribute("num", `${1}`);
        td2IN.setAttribute("aria-label", "Delete");
        td2DEL.setAttribute("type", "reset");
        td2DEL.setAttribute("value", "Delete");
        td2IN.type = "checkbox";
        td2middle.textContent = "Add a ToDO Item.";
        ToDoList.ToDOs++;
        //"Delete" event listener
        td2DEL.addEventListener("click", () => {
            this.DeleteButton(td2DEL);
            console.log(`%c<RWB>%cRemoved todo: ${td2DEL.parentElement.previousElementSibling.textContent}`, "color:purple;font-weight:bold;", "color:purple;");
        });
    }
    ;
}
exports.ToDoList = ToDoList;

},{"./rwbErrorBus":20,"./rwbJsonConverter":21}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class holds the data for 'WebBit' article cards. Key information
 * of the article's contents are contained: name, description, data created,
 * etc.
 */
class WebBit {
    /**Counts the number of objects instantiated */
    static count = 0;
    id;
    articleNumber;
    name;
    description;
    dateCreated;
    articleLink;
    cardImage;
    cardImageALT;
    linkAttribution;
    constructor(id, articleNumber, name, description, dateCreated, articleLink, cardImage, cardImageALT, linkAttribution) {
        this.id = id;
        this.name = name;
        this.articleNumber = articleNumber;
        this.description = description;
        this.dateCreated = dateCreated;
        this.articleLink = articleLink;
        this.cardImage = cardImage;
        this.cardImageALT = cardImageALT;
        this.linkAttribution = linkAttribution;
        WebBit.count++;
    }
    ;
}
exports.default = WebBit;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2FyZENvbXBvbmVudHMudHMiLCJzcmMvY2xhc3NDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvNDA0LnRzIiwic3JjL2NvbXBvbmVudHMvZGljdGlvbmFyeVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL2ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy90b0Rvc1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL3dlYkJpdHMudHMiLCJzcmMvZGF0YS9kYXRhLnRzIiwic3JjL2RhdGEvcG9ydE51bXMudHMiLCJzcmMvbW9kZWxzL2FiYnJEZXNjcmlwdGlvbi50cyIsInNyYy9tb2RlbHMvYXBpLnRzIiwic3JjL21vZGVscy9hdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvbW9kZWxzL2NhcmRzU2xpZGVTaG93LnRzIiwic3JjL21vZGVscy9jbGllbnQudHMiLCJzcmMvbW9kZWxzL2RpY3Rpb25hcnlTZWFyY2gudHMiLCJzcmMvbW9kZWxzL2RpY3Rpb25hcnlTZWFyY2hNYXJrdXAudHMiLCJzcmMvbW9kZWxzL2ZsYXNoY2FyZENhcmRFbGVtcy50cyIsInNyYy9tb2RlbHMvcmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvcndiQ2FyZC50cyIsInNyYy9tb2RlbHMvcndiRXJyb3JCdXMudHMiLCJzcmMvbW9kZWxzL3J3Ykpzb25Db252ZXJ0ZXIudHMiLCJzcmMvbW9kZWxzL3J3YkxpbmsudHMiLCJzcmMvbW9kZWxzL3NjcmlwdFBlcmYudHMiLCJzcmMvbW9kZWxzL3RvRG8udHMiLCJzcmMvbW9kZWxzL3dlYkJpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsdUNBQXVDO0FBQ3ZDLHdFQUFnRDtBQUNoRCxrREFBMEY7QUFDMUYsMkZBQW1FO0FBQ25FLHFFQUEwQztBQUUxQyxNQUFNLGNBQWMsR0FBRztJQUNyQixTQUFT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QyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdEYsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDO1lBRTVFLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FB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QyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVsRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO2dCQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN2RDtTQUNGO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFBQSxDQUFDO0lBRUssU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUM5QixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkY7WUFDRCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7WUFFekUsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7WUFFbkUsd0NBQXdDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbkUscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO1lBQzFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQzVEO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFFO1lBQy9CLG9DQUFvQztZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2RjtZQUNELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1lBRXZFLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRW5FLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztZQUM1RSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUM1RDtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUM5QixxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMs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O0lBQ1gsYUFBYSxDQUFTO0lBQ3RCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBUztJQUNwQixXQUFXLENBQU87SUFDbEIsV0FBVyxDQUFTO0lBQ3BCLFNBQVMsQ0FBUztJQUNsQixZQUFZLENBQVM7SUFDckIsZUFBZSxDQUFrQjtJQUV4QyxZQUNFLEVBQVUsRUFDVixhQUFxQixFQUNyQixJQUFZLEVBQ1osV0FBbUIsRUFDbkIsV0FBaUIsRUFDakIsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsWUFBb0IsRUFDcEIsZUFBaUM7UUFFakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUFBLENBQUM7O0FBSUosa0JBQWUsTUFBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgY2xhc3NDb21wb25lbnRzIGZyb20gXCIuL2NsYXNzQ29tcG9uZW50c1wiO1xuaW1wb3J0IHsgcndiQ2FyZHNXaWRnZXQsIHdlYkJpdHNTbGlkZVNob3csIHdlYkJpdHNBY2NvcmRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL3dlYkJpdHNcIjtcbmltcG9ydCBmbGFzaENhcmRHYW1lV2lkZ2V0IGZyb20gXCIuL2NvbXBvbmVudHMvZmxhc2hjYXJkR2FtZVdpZGdldFwiO1xuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4vbW9kZWxzL3NjcmlwdFBlcmZcIjtcblxuY29uc3QgY2FyZENvbXBvbmVudHMgPSB7XG4gIGNoZWNrUGFnZTogKHBhZ2U6IHN0cmluZykgPT4ge1xuICAgIGNsYXNzQ29tcG9uZW50cy5mb3Vyb2hmb3VyKCk7XG5cbiAgICBzd2l0Y2ggKHBhZ2UpIHtcbiAgICAgIGNhc2UgXCIvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sXCI6XG4gICAgICBjYXNlIFwiL2luZGV4Lmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvXCI6XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvcGFnZXMuaHRtbFwiOlxuICAgICAgY2FzZSBcIi9wYWdlcy5odG1sXCI6XG4gICAgICAgIHJ3YkNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgIHdlYkJpdHNTbGlkZVNob3cuaW5pdCgpO1xuICAgICAgICB3ZWJCaXRzQWNjb3JkaW9uLmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBJbml0aWFsaXplIGZsYXNoY2FyZCBjb21wb25lbnRzXG4gICAgICBjYXNlIFwiL2ZsYXNoY2FyZHMuaHRtbFwiOlxuICAgICAgICBmbGFzaENhcmRHYW1lV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuICBpbml0OiAoKSA9PiB7XG4gICAgbGV0IHBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgY29uc3QgcGFnZVBlcmYgPSBuZXcgUndiUGVyZihcIkNhcmRjb21wb25lbnRzXCIpOyAvL21lYXN1cmUgcGVyZm9ybWFuY2VcblxuICAgIGNhcmRDb21wb25lbnRzLmNoZWNrUGFnZShwYWdlKTtcblxuICAgIHBhZ2VQZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gIH0sXG4gIGxvYWQ6ICgpID0+IHt9LFxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGNhcmRDb21wb25lbnRzLmluaXQpXG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB0b0Rvc1dpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL3RvRG9zV2lkZ2V0XCI7XG5pbXBvcnQgZGljdGlvbmFyeVdpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2RpY3Rpb25hcnlXaWRnZXRcIjtcbmltcG9ydCBub3RGb3VuZDQwNFdpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzLzQwNFwiO1xuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4vbW9kZWxzL3NjcmlwdFBlcmZcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9tb2RlbHMvcndiRXJyb3JCdXNcIjtcbmltcG9ydCBBYmJyT3BlbiBmcm9tIFwiLi9tb2RlbHMvYWJickRlc2NyaXB0aW9uXCI7XG5cbmNvbnN0IGNsYXNzQ29tcG9uZW50cyA9IHtcbiAgLyoqXG4gICAqIEF0dHJpYnV0ZSB0YWdzIG9uIG1vYmlsZSBkbyBub3QgaGF2ZSBob3ZlciBvcHRpb24uIFRoaXMgZnVuY3Rpb24gYWRkcyBhIGNsaWNrXG4gICAqICBhYmlsaXR5IHRvIGRlZmluZSBhbiBhYmJyIHRhZywgdGhhbiByZWx5IG9uIHRoZSB0aXRsZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBhYmJyRGVmaW5pdGlvbnM6ICgpID0+IHtcbiAgICBjb25zdCBtb2JpbGVhYmJycGVyZiA9IG5ldyBSd2JQZXJmKFwiTW9iaWxlYWJicnBlcmZcIik7IC8vc3RhcnQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuXG4gICAgLyoqR2l2ZSBhbGwgYWJiciBlbGVtZW50cyBvcHRpb24gdG8gY2xpY2sgdG8gcmV2ZWFsIHRoZSBleHBhbmRlZCBkZXNjcmlwdGlvbi4gKi9cbiAgICBjb25zdCBhbGxhYmJyZXZpYXRpb25lbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhYmJyXCIpO1xuXG4gICAgaWYgKGFsbGFiYnJldmlhdGlvbmVsZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGFiYnIgb2YgYWxsYWJicmV2aWF0aW9uZWxlbXMpIHtcbiAgICAgICAgbGV0IGFiYnJldiA9IG5ldyBBYmJyT3BlbihhYmJyKTtcbiAgICAgICAgYWJicmV2LnJldmVhbEFiYnJEZXNjcmlwdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1vYmlsZWFiYnJwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gIH0sXG4gIGZvdXJvaGZvdXI6ICgpID0+IHtcbiAgICBpZiAoIVJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJQYWdlQ29tcG9uZW50c1wiLCBcIiNGb3VyLU9oLUZvdXJcIiwgZmFsc2UsIHRydWUpKSB7XG4gICAgICBub3RGb3VuZDQwNFdpZGdldC5pbml0KCk7XG4gICAgfVxuICB9LFxuICBpbml0OiAocGFnZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xhc3NwZXJmID0gbmV3IFJ3YlBlcmYoXCJDbGFzc2NvbXBvbmVudHNcIik7IC8vYmVnaW4gcGVyZm9ybWFuY2UgbWVhc3VyZVxuXG4gICAgLy8gQWRkIERpY3Rpb25hcnkgV2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgIGlmIChwYWdlID09IFwiL3BhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIiB8fCBwYWdlID09IFwiL2luZGV4Lmh0bWxcIiB8fCBwYWdlID09IFwiL1wiIHx8IHBhZ2UgPT0gXCJcIikge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJDbGFzc0NvbXBvbmVudFwiLCBcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgIGlmIChwYWdlID09IFwiL3BhZ2VzL3RvZG9zLmh0bWxcIiB8fCBwYWdlID09IFwiL2luZGV4Lmh0bWxcIiB8fCBwYWdlID09IFwiL1wiIHx8IHBhZ2UgPT0gXCJcIikge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJDbGFzc0NvbXBvbmVudFwiLCBcIi5Ub0RvTGlzdFwiLCB0cnVlLCB0cnVlKSkgcmV0dXJuO1xuICAgICAgdG9Eb3NXaWRnZXQuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBhYmJyIGRlZmluaXRpb25zXG4gICAgY2xhc3NDb21wb25lbnRzLmFiYnJEZWZpbml0aW9ucygpO1xuXG4gICAgLy8gQWRkIFJXQiBsaW5rcyBkZWZpbml0aW9uczogYXBwZW5kcyBcIi5odG1sXCIgdG8gYW5jaG9yIGhyZWYgdGV4dCAod2hpY2ggaXMgbmF0aXZlbHkgcmVtb3ZlZCBpbiBOZXRsaWZ5KVxuICAgIGNsYXNzQ29tcG9uZW50cy5yd2JEYXRhVHlwZUFuY2hvcigpO1xuXG4gICAgY2xhc3NwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gIH0sXG4gIHJ3YkRhdGFUeXBlQW5jaG9yOiAoKSA9PiB7XG4gICAgc3dpdGNoIChsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgY2FzZSBcIi9ndWlkZXMvY2xlYXJjb29raWVzcXVpY2tseS5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmswID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazBbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsxMF0uaHJlZiA9IFwiL2d1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMTBdLmhyZWYgPSBcIi9leHBsb3JlL3dlYmJ0ZWxlc2NvcGUuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxMV0uaHJlZiA9IFwiL3BhZ2VzL2RvbS5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmszWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1sxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1syXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1szXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1sxMF0uaHJlZiA9IFwiL3BhZ2VzL2RvbS5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNFswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNVswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMTBdLmhyZWYgPSBcIi9wYWdlcy9odG1scmVzcG9uc2VzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazZbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazdbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMTFbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsxMF0uaHJlZiA9IFwiL2d1aWRlcy9odHRwcy5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMlsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzEwXS5ocmVmID0gXCIvcGFnZXMvaHNsLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxM1swXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1syXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzEwXS5ocmVmID0gXCIvcGFnZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rOCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms4WzBdLmhyZWYgPSBcIi9wYWdlcy9tYXJrdXAuaHRtbFwiO1xuICAgICAgICByd2JMaW5rOFsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rOSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms5WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms5WzFdLmhyZWYgPSBcIi9wYWdlcy93ZWJpZGVzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL3BhZ2VzL3VybC5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMFswXS5ocmVmID0gXCIvcGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTm8gZWxlbWVudHMgb2YgdHlwZSBkYXRhLXJ3Yi10eXBlPWxpbmsgZm91bmQuXCIpOyAvL3Nob3duIHdpdGggdmVyYm9zZSBsb2dnaW5nXG4gICAgfVxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSBcIi4uL21vZGVscy9jbGllbnRcIjtcblxuY29uc3Qgbm90Rm91bmQ0MDRXaWRnZXQgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgY2xpZW50NDA0ID0gbmV3IGNsaWVudCgpO1xuICAgIGxldCBjbGllbnRSZWZmZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGllbnRyZWZlcnJlclwiKTtcbiAgICBsZXQgY2xpZW50UnR0SW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xpZW50cnR0XCIpO1xuICAgIGxldCBjbGllbnRQbGF0Zm9ybUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsaWVudHBsYXRcIik7XG5cbiAgICAvL0ZpbGwgaW5mb3JtYXRpb24gc2VjaW9uXG4gICAgY2xpZW50UmVmZmVySW5mby50ZXh0Q29udGVudCA9IGNsaWVudDQwNC5vbGRVUkwgPyBjbGllbnQ0MDQub2xkVVJMIDogd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgY2xpZW50UnR0SW5mby50ZXh0Q29udGVudCA9IGAke1xuICAgICAgY2xpZW50NDA0LmNvbm5lY3Rpb250eXBlID8gY2xpZW50NDA0LmNvbm5lY3Rpb250eXBlIDogXCJObyBjb25uZWN0aW9uIHR5cGUgZm91bmQuXCJcbiAgICB9YDtcbiAgICBjbGllbnRSdHRJbmZvLnRleHRDb250ZW50ICs9IGAsIHJ0dCBvZiAke1xuICAgICAgY2xpZW50NDA0LmNvbm5lY3Rpb25ydHQgPyBjbGllbnQ0MDQuY29ubmVjdGlvbnJ0dCA6IFwiTm8gcnR0IGZvdW5kLlwiXG4gICAgfWA7XG4gICAgY2xpZW50UGxhdGZvcm1JbmZvLnRleHRDb250ZW50ID0gY2xpZW50NDA0LmJyb3dzZXJwbGF0Zm9ybVxuICAgICAgPyBjbGllbnQ0MDQuYnJvd3NlcnBsYXRmb3JtXG4gICAgICA6IFwiTm8gcGxhdGZvcm0gaW5mb3JtYXRpb24gZm91bmQuXCI7XG4gICAgY2xpZW50UGxhdGZvcm1JbmZvLnRleHRDb250ZW50ICs9IGAsICR7XG4gICAgICBjbGllbnQ0MDQudXNlcmFnZW50ID8gY2xpZW50NDA0LnVzZXJhZ2VudCA6IFwiTm8gdXNlciBhZ2VudCBpbmZvLlwiXG4gICAgfWA7XG5cbiAgICAvL1Byb3ZpZGUgYSBsaW5rIHRvIGdvIGJhY2sgd2hlcmUgeW91IGNhbWUgZnJvbVxuICAgIGxldCBnb2JhY2tsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRVUkxcIik7XG4gICAgaWYgKGNsaWVudDQwNC5vbGRVUkwuaW5jbHVkZXMoXCI0MDQuaHRtbFwiKSkge1xuICAgICAgY2xpZW50NDA0Lm9sZFVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgfVxuICAgIGxldCBnb2JhY2tocmVmID0gY2xpZW50NDA0Lm9sZFVSTCA/IGNsaWVudDQwNC5vbGRVUkwgOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgJHtnb2JhY2tocmVmfWApO1xuICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgZ29iYWNraHJlZik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RGb3VuZDQwNFdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaCB9IGZyb20gXCIuLi9tb2RlbHMvZGljdGlvbmFyeVNlYXJjaFwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBkaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAvKipcbiAgICogVGhpcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBjcmVhdGVzIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IGJ5IGNhbGxpbmcgdGhlXG4gICAqICBjb25zdHJ1Y3Rvci5cbiAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzXG4gICAqL1xuICBpbml0OiAoKSA9PiB7XG4gICAgbGV0IGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcblxuICAgIC8vIERpY3Rpb25hcnlTZWFyY2ggY29uc3RydWN0b3JcbiAgICBPYmplY3QuY3JlYXRlKG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQpKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEZsYXNoY2FyZENhcmRFbGVtcyB9IGZyb20gXCIuLi9tb2RlbHMvZmxhc2hjYXJkQ2FyZEVsZW1zXCI7XG5pbXBvcnQgcG9ydERlZmluaXRpb25zIGZyb20gXCIuLi9kYXRhL3BvcnROdW1zXCI7XG5cbmNvbnN0IGZsYXNoQ2FyZEdhbWVXaWRnZXQgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICAvLyBFc3RhYmxpc2ggd2hpY2ggcG9ydCBudW1iZXJzIHRvIHRlc3QgYW5kIHRoZSBkZWZpbml0aW9uXG4gICAgLy8gVE9ETzogZnVuY3Rpb25zIGZsYXNoY2FyZHNcbiAgICBjb25zdCBtZXRob2REZWZpbml0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KFtcbiAgICAgIFtcImNoYXJBdCgpXCIsIFwiUmV0dXJucyBhIG5ldyBzdHJpbmcgb2YgdGhlIGNoYXJhY3RlciBhdCBhIGdpdmVuIGluZGV4LlwiXSxcbiAgICBdKTtcblxuICAgIC8vIENyZWF0ZSBmbGFzaGNhcmQgZWxlbWVudHNcbiAgICBsZXQgbWFpbkZsYXNoQ2FyZERpdnMgPSBuZXcgRmxhc2hjYXJkQ2FyZEVsZW1zKHBvcnREZWZpbml0aW9ucyk7XG5cbiAgICAvLyBBZGQgdGhlIGdhbWUncyB0aXRsZSBlbGVtZW50XG4gICAgbGV0IG1haW5GbGFzaENhcmRQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRmxhc2hDYXJkR2FtZVwiKTtcbiAgICBsZXQgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5GbGFzaENhcmRzXCIpO1xuXG4gICAgY29uc3QgZ2FtZVRpdGxlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBnYW1lVGl0bGVFbGVtLmlubmVyVGV4dCA9IFwiQ29tcHV0aW5nIFBvcnQgTnVtYmVyc1wiO1xuICAgIG1haW5GbGFzaENhcmRQYWdlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZ2FtZVRpdGxlRWxlbSk7XG5cbiAgICAvLyBBZGQgdGhlIGZsYXNoY2FyZHMgdG8gd2lkZ2V0XG4gICAgZm9yIChsZXQgZWxlbSBvZiBtYWluRmxhc2hDYXJkRGl2cy5tX2ZsYXNoY2FyZHNBcnIpIHtcbiAgICAgIG1haW5GbGFzaENhcmRQYWdlRGl2LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXNoQ2FyZEdhbWVXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0IH0gZnJvbSBcIi4uL21vZGVscy90b0RvXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIFRvLURvIExpc3Qgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IHRvRG9zV2lkZ2V0ID0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgVG8tRG8gTGlzdCB3aWRnZXQuXG4gICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdUb0RvTGlzdCcgY2xhc3NcbiAgICovXG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgdG9Eb3NFbGVtZW50OiBFbGVtZW50O1xuICAgIHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG5cbiAgICAvL1RvRG9MaXN0IG9iamVjdFxuICAgIGNvbnN0IHRvRG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgIC8vQ3JlYXRlcyB3aWRnZXQgbWFya3VwIGFuZCBwb3B1bGF0ZXMgVG8tRG8gdGFza3MgY29udGFpbmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICB0b0RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KHRvRG9zRWxlbWVudCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b0Rvc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdFQkJJVERBVEEgZnJvbSBcIi4uL2RhdGEvZGF0YVwiO1xuaW1wb3J0IFJhbmRvbVdlYkJpdHMgZnJvbSBcIi4uL21vZGVscy9yYW5kb21XZWJCaXRzXCI7XG5pbXBvcnQgQ2FyZHNTbGlkZVNob3cgZnJvbSBcIi4uL21vZGVscy9jYXJkc1NsaWRlU2hvd1wiO1xuXG5jbGFzcyBBY2NvcmRpb24ge1xuICBwdWJsaWMgYWNjb3JkaW9uRWxlbWVudHMgPSBuZXcgTWFwPEhUTUxEaXZFbGVtZW50LCBib29sZWFuPigpO1xuICBjb25zdHJ1Y3RvcihhY2NvcmRpb25Ob2RlczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4pIHtcbiAgICBmb3IgKGxldCBjYXJkIG9mIGFjY29yZGlvbk5vZGVzKSB7XG4gICAgICB0aGlzLmFjY29yZGlvbkVsZW1lbnRzLnNldChjYXJkLCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FyZCB3aWRnZXQgdG8gaW5pdGlhbGl6ZSBhcnRpY2xlIGRhdGEgaW50byBIVE1MIGNhcmQgZWxlbWVudHMuIFRoaXMgd2lkZ2V0XG4gKiBjcmVhdGVzIG11bHRpcGxlIHNlY3Rpb25zIG9mIGNhcmRzIHRvIGFkZCB0byBhIHBhZ2UuXG4gKi9cbmNvbnN0IHJ3YkNhcmRzV2lkZ2V0ID0ge1xuICBhZGRDYXJkU2VjdGlvbkNsYXNzOiAoY2FyZHM6IEhUTUxEaXZFbGVtZW50W10gfCBIVE1MRGl2RWxlbWVudCwgY2xzOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjYXJkcykpIHtcbiAgICAgIC8vIGNhcmRzIGlzIGFuIGFycmF5IG9mIGNhcmRzOyBhcHBlbmQgY2xhc3MgdG8gYWxsIGNhcmRzXG4gICAgICBmb3IgKGxldCBjYXJkIG9mIGNhcmRzKSB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZChgJHtjbHN9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjYXJkcykpIHtcbiAgICAgIC8vIGNhcmRzIGlzIGFuIGVsZW1lbnQ7IGFwcGVuZCBjbGFzcyB0byB0aGUgZWxlbWVudFxuICAgICAgY2FyZHMuY2xhc3NMaXN0LmFkZChgJHtjbHN9YCk7XG4gICAgfVxuICB9LFxuICBidWlsZFJhbmRvbVdlYkJpdHM6IChwYWdlPzogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGFyYml0cmFyeUFydGljbGVzOiBSYW5kb21XZWJCaXRzO1xuICAgIGxldCBndWlkZVNob3J0czogUmFuZG9tV2ViQml0cztcbiAgICBsZXQgZXhwbG9yZXRoZVdlYjogUmFuZG9tV2ViQml0cztcblxuICAgIHN3aXRjaCAocGFnZSkge1xuICAgICAgY2FzZSBcIkhvbWVcIjpcbiAgICAgICAgZW51bSBDYXJkQ29udGFpbmVyVHlwZSB7XG4gICAgICAgICAgU2xpZGVzaG93ID0gXCJzbGlkZXNob3dcIixcbiAgICAgICAgICBBY2NvcmRpb24gPSBcImFjY29yZGlvblwiLFxuICAgICAgICB9XG4gICAgICAgIC8vIFNwbGl0IHRoZSBjYXJkcyBhcnJheXMgaW50byB0aGVpciByZXNwZWN0aXZlIGNhdGVnb3J5XG4gICAgICAgIGFyYml0cmFyeUFydGljbGVzID0gbmV3IFJhbmRvbVdlYkJpdHMoXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcbiAgICAgICAgICAgIFwiQXJiaXRyYXJ5IEFydGljbGVzOlwiLFxuICAgICAgICAgICAgXCJBcmJpdHJhcnlBcnRpY2xlc1wiLFxuICAgICAgICAgICAgQ2FyZENvbnRhaW5lclR5cGUuU2xpZGVzaG93XG4gICAgICAgICAgKSxcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKVxuICAgICAgICApO1xuXG4gICAgICAgIGd1aWRlU2hvcnRzID0gbmV3IFJhbmRvbVdlYkJpdHMoXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcbiAgICAgICAgICAgIFwiR3VpZGUgU2hvcnRzOlwiLFxuICAgICAgICAgICAgXCJHdWlkZVNob3J0c1wiLFxuICAgICAgICAgICAgQ2FyZENvbnRhaW5lclR5cGUuQWNjb3JkaW9uXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKVxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGxvcmV0aGVXZWIgPSBuZXcgUmFuZG9tV2ViQml0cyhcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiRXhwbG9yZSB0aGUgV2ViOlwiLCBcIkV4cGxvcmV0aGVXZWJcIiksXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICBhcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBSYW5kb21XZWJCaXRzKFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIsIFwiQXJiaXRyYXJ5QXJ0aWNsZXNcIiksXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSlcbiAgICAgICAgKTtcblxuICAgICAgICBndWlkZVNob3J0cyA9IG5ldyBSYW5kb21XZWJCaXRzKFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJHdWlkZSBTaG9ydHM6XCIsIFwiR3VpZGVTaG9ydHNcIiksXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSlcbiAgICAgICAgKTtcblxuICAgICAgICBleHBsb3JldGhlV2ViID0gbmV3IFJhbmRvbVdlYkJpdHMoXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4cGxvcmUgdGhlIFdlYjpcIiwgXCJFeHBsb3JldGhlV2ViXCIpLFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8qKiBNdWx0aXBsZSBjYXRlZ29yaWVzIG9mIGNhcmQgZGF0YSBleGlzdC4gVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG5lZWRlZFxuICAgICAqIHRvIGNyZWF0ZSBjYXRlZ29yeSBzZWN0aW9ucyBkaXZpc2lvbnMgd2hlbiBwbGFjZWQgb24gYSBwYWdlLlxuICAgICAqL1xuICAgIGNvbnN0IGNhcmRzU2VjdGlvbnM6IEhUTUxEaXZFbGVtZW50W10gPSBbXG4gICAgICBhcmJpdHJhcnlBcnRpY2xlcy5jYXJkc1NlY3Rpb24sXG4gICAgICBndWlkZVNob3J0cy5jYXJkc1NlY3Rpb24sXG4gICAgICBleHBsb3JldGhlV2ViLmNhcmRzU2VjdGlvbixcbiAgICBdO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIGNhcmQgZGF0YSArIGF0dHJpYnV0aW9uIGxpbmsgZGF0YVxuICAgIC8vIFdFQkJJVERBVEEgYnJva2VuIGludG8gMyBhcnJheXM6IFBhZ2VzIChvciBhcnRpY2xlcyksIEd1aWRlcywgYW5kIEV4cGxvcmVzXG4gICAgLyoqVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG9mIGNhcmQgZWxlbWVudHMuIEVhY2ggaW5kZXggc3RvcmVzIHRoZSBjYXJkcycgZGF0YVxuICAgICAqIGZvciBvbmUgY2F0ZWdvcnkgb2YgYXJ0aWNsZXMuICovXG4gICAgY29uc3QgY2FyZHNEYXRhOiBhbnkgPSBbYXJiaXRyYXJ5QXJ0aWNsZXMuY2FyZHNEYXRhLCBndWlkZVNob3J0cy5jYXJkc0RhdGEsIGV4cGxvcmV0aGVXZWIuY2FyZHNEYXRhXTtcbiAgICBjb25zdCBSV0IgPSBbY2FyZHNTZWN0aW9ucywgY2FyZHNEYXRhXTtcblxuICAgIHJldHVybiBSV0I7XG4gIH0sXG4gIC8qKiBDYXJkcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiBicmVha3MgZG93biB0aGUgZGF0YSBzdHJ1Y3R1cmUgaW5cbiAgICogb3JkZXIgdG8gZm9ybXVsYXRlIHRoZSBhcnRpY2xlIGRldGFpbHMgaW50byBvbmUgY2FyZCBmb3IgZWFjaCBhcnRpY2xlIGRhdGEuXG4gICAqXG4gICAqIEFydGljbGVzIGhhdmUgZGlmZmVyZW50IGNhdGVnb3JpZXMsIHNvIGVhY2ggY2F0ZWdvcnkgbXVzdCBiZSByZXNwZWN0ZWQuXG4gICAqICovXG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgUldCU2VjdGlvbkNhcmRzOiBhbnk7XG4gICAgLy8gUm91dGVzIC0+IEFkZCB3aWRnZXQgYW5kIGZvcm1hdCBwYWdlc1xuICAgIC8vIEluZGV4IChIb21lKSBwYWdlIHNob3J0ZW5zIGVhY2ggc2VjdGlvbnMnIGNhcmQgY291bnQgYW5kIHJhbmRvbWl6ZXNcbiAgICBpZiAoXG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gXCIvaW5kZXguaHRtbFwiIHx8XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gXCIvXCIgfHxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWxcIiB8fFxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL1JhbmRvbVdlYkJpdHMvXCIgfHxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9kaXN0L2luZGV4Lmh0bWxcIlxuICAgICkge1xuICAgICAgLy9CdWlsZCBSV0IgU2VjdGlvbnMgKyBjYXJkIHNsaWRlc2hvdywgYWNjb3JkaWFuXG4gICAgICBSV0JTZWN0aW9uQ2FyZHMgPSByd2JDYXJkc1dpZGdldC5idWlsZFJhbmRvbVdlYkJpdHMoXCJIb21lXCIpO1xuXG4gICAgICAvLyBBcHBseSBjbGFzc2VzIHRvIGNhcmRzIHJlbGV2YW50IG9mIHRoZSBjb250YWluZXIgdHlwZVxuICAgICAgcndiQ2FyZHNXaWRnZXQuYWRkQ2FyZFNlY3Rpb25DbGFzcyhSV0JTZWN0aW9uQ2FyZHNbMV1bMF0sIFwic2xpZGVcIik7XG4gICAgICByd2JDYXJkc1dpZGdldC5hZGRDYXJkU2VjdGlvbkNsYXNzKFJXQlNlY3Rpb25DYXJkc1sxXVsxXSwgXCJhY2NvcmRpb25zbGlkZVwiKTtcblxuICAgICAgLy9SYW5kb21pemUgdGhlIGNhcmRzIGluIHRoZSBzbGlkZXNob3cgc2VjdGlvblxuICAgICAgcndiQ2FyZHNXaWRnZXQucmFuZG9taXplV2ViQml0cyhSV0JTZWN0aW9uQ2FyZHNbMV0pO1xuXG4gICAgICAvL0FkZCBpbnRyb2R1Y3Rpb24gc2VjdGlvbiBhbmQgYXBwZW5kIHRvIG1haW5cbiAgICAgIFJXQlNlY3Rpb25DYXJkc1swXS51bnNoaWZ0KFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JJbnRyb2R1Y3Rpb24oKSk7XG4gICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgICBtYWluLnByZXBlbmQoUldCU2VjdGlvbkNhcmRzWzBdLnNoaWZ0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL0J1aWxkIFJXQiBTZWN0aW9ucyArIGNhcmRzIGFzIGRlZmF1bHRcbiAgICAgIFJXQlNlY3Rpb25DYXJkcyA9IHJ3YkNhcmRzV2lkZ2V0LmJ1aWxkUmFuZG9tV2ViQml0cygpO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgY29tYmluaW5nIHJ3YlsxXSAodGhlIGNhcmRzKSB0byByd2JbMF0gKHRoZSBzZWN0aW9uIGVsZW1lbnRzKVxuICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgZWFjaCBjYXRlZ29yeSwgcmVzcGVjdGl2ZWx5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUldCU2VjdGlvbkNhcmRzWzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoUldCU2VjdGlvbkNhcmRzWzBdW2ldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBJbm5lciBsb29wOiBpdGVyYXRlIHRocm91Z2ggdGhlIGNhdGVnb3J5IGRhdGFcbiAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgUldCU2VjdGlvbkNhcmRzWzFdLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgUldCU2VjdGlvbkNhcmRzWzBdW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVGhlcmUncyBhbiBlcnJvciBpbiB0aGUgZGF0YS5cIik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICByYW5kb21pemVXZWJCaXRzKGNhcmRzQXJ0aWNsZXM6IGFueSkge1xuICAgIC8qKiBSYW5kb21pemUgdGhlIG9yZGVyIG9mIGNhcmRzLiAqL1xuICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFycjogYW55LCBudW06IG51bWJlcikgPT4ge1xuICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uYXJyXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgICByZXR1cm4gc2h1ZmZsZWQuc2xpY2UoMCwgbnVtKTsgLy8gcmV0dXJuIHRoZSByZXF1ZXN0ZWQgbnVtYmVyIG9mIGVsZW1lbnRzXG4gICAgfTtcbiAgICBjYXJkc0FydGljbGVzWzBdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1swXSwgY2FyZHNBcnRpY2xlc1swXS5sZW5ndGgpOyAvL3JhbmRvbWl6ZSBhbGwgcGFnZXNcbiAgICBjYXJkc0FydGljbGVzWzFdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1sxXSwgOCk7IC8vcmFuZG9tbHkgc2VsZWN0IDMgZ3VpZGVzXG4gIH0sXG59O1xuXG5jb25zdCB3ZWJCaXRzQWNjb3JkaW9uID0ge1xuICBhZGRDYXJkQWNjb3JkaW9uU3R5bGVzOiAoY2FyZEFjY29yZGlvbjogQWNjb3JkaW9uLCBzY3JlZW5TaXplOiBzdHJpbmcpID0+IHtcbiAgICBjYXJkQWNjb3JkaW9uLmFjY29yZGlvbkVsZW1lbnRzLmZvckVhY2goKGlzT3BlbiwgY2FyZCkgPT4ge1xuICAgICAgY2FyZC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImZsZXhEaXJlY3Rpb25cIik7XG4gICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiOTAwcHhcIik7XG4gICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwibWFyZ2luXCIsIFwiMFwiKTtcbiAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIxMDBweFwiKTtcbiAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcbiAgICAgIC8vaGlkZSB0aGUgJ0ZsYXRpY29uJyBsaW5rc1xuXG4gICAgICBmb3IgKGxldCBpbm5lciBvZiBjYXJkLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgbGV0IGlubmVyZWxlbSA9IDxIVE1MRWxlbWVudD5pbm5lcjtcbiAgICAgICAgaW5uZXJlbGVtLnN0eWxlLndpZHRoID0gXCI1MCVcIjtcbiAgICAgIH1cbiAgICAgIC8vY2FyZCBib2R5IGF0dHIgc3R5bGVcbiAgICAgIGxldCBhdHRybGluayA9IGNhcmQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgICAgYXR0cmxpbmsuc3R5bGUudG9wID0gXCI1NXB4XCI7XG4gICAgICBhdHRybGluay5zdHlsZS5yaWdodCA9IFwiMTAwJVwiO1xuXG4gICAgICBpZiAoc2NyZWVuU2l6ZSA9PSBcIlNNQUxMXCIpIHtcbiAgICAgICAgLy9jYXJkIGltYWdlIHN0eWxlXG4gICAgICAgIGxldCBpbWFnZSA9IGNhcmQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICBpbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC1oZWlnaHRcIiwgXCIyMDBweFwiKTtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtd2lkdGhcIiwgXCIyMDBweFwiKTtcblxuICAgICAgICAvL2NhcmQgaW1hZ2Ugc21hbGwgc3R5bGVcbiAgICAgICAgbGV0IGltYWdlU21hbGwgPSBjYXJkLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMV0gYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgaW1hZ2VTbWFsbC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC1oZWlnaHRcIiwgXCIxMDBweFwiKTtcbiAgICAgICAgaW1hZ2VTbWFsbC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC13aWR0aFwiLCBcIjEwMHB4XCIpO1xuXG4gICAgICAgIC8vY2FyZCBiYWNrIHBhcmEgc3R5bGVcbiAgICAgICAgbGV0IGltYWdlUGFyYSA9IGNhcmQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1syXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICBpbWFnZVBhcmEuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXJnaW5cIiwgXCIwXCIpO1xuICAgICAgICBpbWFnZVBhcmEuc3R5bGUuc2V0UHJvcGVydHkoXCJmb250LXNpemVcIiwgXCIxNnB4XCIpO1xuICAgICAgfVxuICAgICAgaWYgKHNjcmVlblNpemUgPT0gXCJNRURJVU1cIikge1xuICAgICAgICAvL2NhcmQgaW1hZ2Ugc3R5bGVcbiAgICAgICAgbGV0IGltYWdlID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIGltYWdlLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LWhlaWdodFwiLCBcIjI3NXB4XCIpO1xuICAgICAgICBpbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC13aWR0aFwiLCBcIjI3NXB4XCIpO1xuXG4gICAgICAgIC8vY2FyZCBpbWFnZSBzbWFsbCBzdHlsZVxuICAgICAgICBsZXQgaW1hZ2VTbWFsbCA9IGNhcmQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICBpbWFnZVNtYWxsLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LWhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgICBpbWFnZVNtYWxsLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiMTAwcHhcIik7XG4gICAgICB9XG4gICAgICBsZXQgcGFnZWxpbmsgPSBjYXJkLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1syXSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcblxuICAgICAgLy9hZGQgY2xpY2sgZXZlbnRcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT0gYXR0cmxpbmsgfHwgZS50YXJnZXQgPT0gcGFnZWxpbmspXG4gICAgICAgIHJldHVyblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIxMDBweFwiKTtcbiAgICAgICAgICBpc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIyNzVweFwiKTtcbiAgICAgICAgICBpc09wZW4gPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBpc09wZW4gPyBjbG9zZSgpIDogb3BlbigpO1xuICAgICAgfSk7XG4gICAgICAvL2FkZCBmb2N1cyBldmVudFxuICAgICAgbGV0IHNpdGVsaW5rID0gY2FyZC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMl0gYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICBzaXRlbGluay5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAgICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMjc1cHhcIik7XG4gICAgICAgICAgaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgb3BlbigpO1xuICAgICAgfSk7XG4gICAgICBzaXRlbGluay5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICAvL2FkZCB1bmZvY3VzIGV2ZW50XG4gICAgICBhdHRybGluay5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICAvL2FkZCB1bmZvY3VzIGV2ZW50XG4gICAgICBhdHRybGluay5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAgICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMjc1cHhcIik7XG4gICAgICAgICAgaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgb3BlbigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGluaXQ6ICgpID0+IHtcbiAgICBjb25zdCBhY2NvcmRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRhY2NvcmRpb25cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgYWNjb3JkaW9uQ29udGFpbmVyLnN0eWxlLm1heFdpZHRoID0gXCI3NWVtXCI7XG4gICAgLy9jcmVhdGUgYWNjb3JkaW9uIGNhcmQgbWFwIHN0YXRlXG4gICAgY29uc3QgY2FyZGFjY29yZGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIi5jYXJkYWNjb3JkaW9uIC5hY2NvcmRpb25zbGlkZVwiXG4gICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIGxldCBhY2NvcmRpb24gPSBPYmplY3QuY3JlYXRlKG5ldyBBY2NvcmRpb24oY2FyZGFjY29yZGlvbikpO1xuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNTAxcHgpIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlcykge1xuICAgICAgd2ViQml0c0FjY29yZGlvbi5hZGRDYXJkQWNjb3JkaW9uU3R5bGVzKGFjY29yZGlvbiwgXCJTTUFMTFwiKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNzY5cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgIHdlYkJpdHNBY2NvcmRpb24uYWRkQ2FyZEFjY29yZGlvblN0eWxlcyhhY2NvcmRpb24sIFwiTUVESVVNXCIpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNTAxcHgpIGFuZCAobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlcykge1xuICAgICAgICB3ZWJCaXRzQWNjb3JkaW9uLmFkZENhcmRBY2NvcmRpb25TdHlsZXMoYWNjb3JkaW9uLCBcIlNNQUxMXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNzY5cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgd2ViQml0c0FjY29yZGlvbi5hZGRDYXJkQWNjb3JkaW9uU3R5bGVzKGFjY29yZGlvbiwgXCJNRURJVU1cIik7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1MDBweClcIikubWF0Y2hlcykge1xuICAgICAgICB3ZWJCaXRzQWNjb3JkaW9uLnJlbW92ZUNhcmRBY2NvcmlvblN0eWxlcyhhY2NvcmRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICByZW1vdmVDYXJkQWNjb3Jpb25TdHlsZXM6IChjYXJkYWNjb3JkaW9uOiBBY2NvcmRpb24pID0+IHtcbiAgICBjYXJkYWNjb3JkaW9uLmFjY29yZGlvbkVsZW1lbnRzLmZvckVhY2goKGlzT3BlbiwgY2FyZCkgPT4ge1xuICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImZsZXhEaXJlY3Rpb25cIiwgXCJjb2x1bW5cIik7XG4gICAgICBjYXJkLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuXG4gICAgICBjYXJkLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWF4LXdpZHRoXCIpO1xuICAgICAgY2FyZC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpblwiKTtcbiAgICAgIGNhcmQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgICAgIGNhcmQucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG5cbiAgICAgIC8vY2FyZCBib2R5IGF0dHIgc3R5bGVcbiAgICAgIGxldCBhdHRybGluayA9IGNhcmQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzNdIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgICAgYXR0cmxpbmsuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0b3BcIik7XG4gICAgICBhdHRybGluay5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInJpZ2h0XCIpO1xuICAgICAgYXR0cmxpbmsucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG5cbiAgICAgIC8vY2FyZCBpbWFnZSBzdHlsZVxuICAgICAgbGV0IGltYWdlID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWFnZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1heC1oZWlnaHRcIik7XG4gICAgICBpbWFnZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1heC13aWR0aFwiKTtcblxuICAgICAgLy9jYXJkIGltYWdlIHNtYWxsIHN0eWxlXG4gICAgICBsZXQgaW1hZ2VTbWFsbCA9IGNhcmQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgaW1hZ2VTbWFsbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1heC1oZWlnaHRcIik7XG4gICAgICBpbWFnZVNtYWxsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWF4LXdpZHRoXCIpO1xuXG4gICAgICAvL2NhcmQgYmFjayBwYXJhIHN0eWxlXG4gICAgICBsZXQgaW1hZ2VQYXJhID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzJdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWFnZVBhcmEuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXJnaW5cIik7XG4gICAgICBpbWFnZVBhcmEuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJmb250LXNpemVcIik7XG5cbiAgICAgIGZvciAobGV0IGlubmVyIG9mIGNhcmQuY2hpbGROb2Rlcykge1xuICAgICAgICBsZXQgaW5uZXJlbGVtID0gPEhUTUxFbGVtZW50PmlubmVyO1xuICAgICAgICBpbm5lcmVsZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ3aWR0aFwiKTtcbiAgICAgICAgaW5uZXJlbGVtLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgfVxuICAgICAgY2FyZC5yZXBsYWNlV2l0aChjYXJkLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5jb25zdCB3ZWJCaXRzU2xpZGVTaG93ID0ge1xuICBpbml0OiAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9wYWdlcy5odG1sXCIpIHJldHVybjtcbiAgICBsZXQgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRzbGlkZXNob3cgLnNsaWRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+O1xuICAgIHZhciBzbWFsbCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogODE5cHgpXCIpO1xuICAgIHZhciB0YWJsZXQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDgyMHB4KSBhbmQgKG1heC13aWR0aDogMTA5MHB4KVwiKTtcblxuICAgIC8vSW1wbGVtZW50IHNsaWRlc2hvdyBmb3Igc2VjdGlvbiBhcnRpY2xlc1xuICAgIGxldCBzbGlkZXNob3c6IENhcmRzU2xpZGVTaG93O1xuICAgIGxldCBzbGlkZXNob3dtZWQ6IENhcmRzU2xpZGVTaG93O1xuICAgIGxldCBzbGlkZXNob3dsYXJnZTogQ2FyZHNTbGlkZVNob3c7XG4gICAgbGV0IGN1cnJlbnRzbGlkZXNob3c6IENhcmRzU2xpZGVTaG93O1xuXG4gICAgLy9CYXNlZCBvbiB0aGUgbWF0Y2hlZCBtZWRpYSBzaXplLCBjcmVhdGUgYSBzbWFsbCwgbWVkaXVtLCBvciBsYXJnZSBzbGlkZXNob3dcbiAgICBpZiAoc21hbGwubWF0Y2hlcykge1xuICAgICAgc2xpZGVzaG93ID0gbmV3IENhcmRzU2xpZGVTaG93KGNhcmRzLCAxLCBcIlNNQUxMXCIpO1xuICAgICAgY3VycmVudHNsaWRlc2hvdyA9IHNsaWRlc2hvdztcbiAgICB9IGVsc2UgaWYgKHRhYmxldC5tYXRjaGVzKSB7XG4gICAgICBzbGlkZXNob3dtZWQgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDIsIFwiTUVESVVNXCIpO1xuICAgICAgY3VycmVudHNsaWRlc2hvdyA9IHNsaWRlc2hvd21lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVzaG93bGFyZ2UgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDMsIFwiTEFSR0VcIik7XG4gICAgICBjdXJyZW50c2xpZGVzaG93ID0gc2xpZGVzaG93bGFyZ2U7XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHNsaWRlc2hvd3NtYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXNjb250YWluZXIuU01BTExcIik7XG4gICAgICBsZXQgc2xpZGVzaG93bWVkaXVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXNjb250YWluZXIuTUVESVVNXCIpO1xuICAgICAgbGV0IHNsaWRlc2hvd2xhcmdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXNjb250YWluZXIuTEFSR0VcIik7XG5cbiAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDgxOXB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGlmIChzbGlkZXNob3dtZWRpdW0gIT0gbnVsbCkge1xuICAgICAgICAgIHNsaWRlc2hvd21lZGl1bS5yZW1vdmUoKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKGBSZW1vdmVkIG1lZCBzbGlkZXNob3cgJHtzbGlkZXNob3dtZWRpdW19YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsaWRlc2hvd2xhcmdlICE9IG51bGwpIHtcbiAgICAgICAgICBzbGlkZXNob3dsYXJnZS5yZW1vdmUoKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKGBSZW1vdmVkIGxhcmdlIHNsaWRlc2hvdyAke3NsaWRlc2hvd2xhcmdlfWApO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cuc3NDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cuYXJyb3dzQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93ID0gbmV3IENhcmRzU2xpZGVTaG93KGNhcmRzLCAxLCBcIlNNQUxMXCIpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93Lm9uUmVzaXplU2hvd1N0YXJ0aW5nRWxlbXMoKTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDgyMHB4KSBhbmQgKG1heC13aWR0aDogMTA5MHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGlmIChzbGlkZXNob3dzbWFsbCAhPSBudWxsKSB7XG4gICAgICAgICAgc2xpZGVzaG93c21hbGwucmVtb3ZlKCk7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhgUmVtb3ZlZCBzbWFsbCBzbGlkZXNob3cgJHtzbGlkZXNob3dzbWFsbH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xpZGVzaG93bGFyZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHNsaWRlc2hvd2xhcmdlLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFJlbW92ZWQgbGFyZ2Ugc2xpZGVzaG93ICR7c2xpZGVzaG93bGFyZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5zc0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5hcnJvd3NDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDIsIFwiTUVESVVNXCIpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93Lm9uUmVzaXplU2hvd1N0YXJ0aW5nRWxlbXMoKTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEwOTFweClcIikubWF0Y2hlcykge1xuICAgICAgICBpZiAoc2xpZGVzaG93c21hbGwgIT0gbnVsbCkge1xuICAgICAgICAgIHNsaWRlc2hvd3NtYWxsLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFJlbW92ZWQgc21hbGwgZWxlbWVudCAke3NsaWRlc2hvd3NtYWxsfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzbGlkZXNob3dtZWRpdW0gIT0gbnVsbCkge1xuICAgICAgICAgIHNsaWRlc2hvd21lZGl1bS5yZW1vdmUoKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKGBSZW1vdmVkIG1lZGl1bSBlbGVtZW50ICR7c2xpZGVzaG93bWVkaXVtfWApO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cuc3NDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cuYXJyb3dzQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93ID0gbmV3IENhcmRzU2xpZGVTaG93KGNhcmRzLCAzLCBcIkxBUkdFXCIpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93Lm9uUmVzaXplU2hvd1N0YXJ0aW5nRWxlbXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7cndiQ2FyZHNXaWRnZXQsIHdlYkJpdHNBY2NvcmRpb24sIHdlYkJpdHNTbGlkZVNob3d9O1xuIiwiXCJzdHJpY3QgbW9kZVwiO1xuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvd2ViQml0XCI7XG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvYXR0cmlidXRpb25MaW5rXCI7XG5cbi8vIENyZWF0ZSBuZXcgQUEgKEFyYml0cmFyeSBBcnRpY2xlKVxuXG4vKipcbiAqIFwiQXJiaXRyYXJ5IEFydGljbGVzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBhcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRvbWFpbmxvb2t1cFwiLFxuICAgIDEsXG4gICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgXCJDaGVjayBhbiBhdmFpbGFibGUgZG9tYWluIHVzaW5nIFdob0lTIEFQSSBzZWFyY2hcIixcbiAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgNCksXG4gICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgIFwiaW1nL3dob2lzLndlYnBcIixcbiAgICBcIldob0lzIExvb2t1cFwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImRvbWFpbiBpY29uc1wiLFxuICAgICAgXCJEb21haW4gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG9tYWluXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgIDFcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJIdG1scmVzcG9uc2VzXCIsXG4gICAgMixcbiAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgXCJWaWV3IEhUTUwgcGFnZSByZXNwb25zZSBzdGF0dXMgaW5mb3JtYXRpb25cIixcbiAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxuICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgXCJpbWcvSFRNTF9GcmFtZXMud2VicFwiLFxuICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImNvZGUgaWNvbnNcIixcbiAgICAgIFwiQ29kZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAyXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiV2VidGVjaFwiLFxuICAgIDUsXG4gICAgXCJXYXBwYWx5emVyXCIsXG4gICAgXCJXYXBwYWx5emVyIGJyb3dzZXIgZXh0ZW5zaW9uXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTEsIDE5KSxcbiAgICBcInBhZ2VzL3dlYnRlY2guaHRtbFwiLFxuICAgIFwiaW1nL3dhcHBhbHl6ZXItbG9nby53ZWJwXCIsXG4gICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJXYXBwYWx5emVyIGFwcFwiLFxuICAgICAgXCJHcmFwaGljYWwgbG9nbyBmb3IgV2FwcGFseXplci5cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cud2FwcGFseXplci5jb20vbG9nb3MvXCIsXG4gICAgICBcIldhcHBhbHl6ZXJcIixcbiAgICAgIFwiV2FwcGFseXplclwiLFxuICAgICAgNVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkpzb25vYmplY3RcIixcbiAgICA2LFxuICAgIFwianNvbk9iamVjdFwiLFxuICAgIFwiSlNPTiBvYmplY3Qgbm90YXRpb25cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxLCA5KSxcbiAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgIFwiaW1nL2pzb24ud2VicFwiLFxuICAgIFwiSlNPTiBsb2dvOiBBIGdyZXkgY2lyY2xlIHdpdGggYXJ0aXN0aWMgc3BpcmFscy5cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJKYXZhU2NyaXB0IE9iamVjdCBOb3RhdGlvblwiLFxuICAgICAgXCJHcmFwaGljYWwgbG9nbyBmb3IgSlNPTi5cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuanNvbi5vcmcvXCIsXG4gICAgICBcImpzb24ub3JnXCIsXG4gICAgICBcImpzb25PYmplY3RcIixcbiAgICAgIDZcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJXaS1GaVwiLFxuICAgIDcsXG4gICAgXCJXaS1GaSBWZXJzaW9uXCIsXG4gICAgXCJEZXRlcm1pbmUgV2lmaSBWZXJzaW9uXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgIFwicGFnZXMvd2lmaS5odG1sXCIsXG4gICAgXCJpbWcvd2lmaS53ZWJwXCIsXG4gICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJXaXJlbGVzcyBGaWRlbGl0eVwiLFxuICAgICAgXCJXaS1GaSBncmFwaGljYWwgbG9nby5cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cud2ktZmkub3JnL3doby13ZS1hcmUvb3VyLWJyYW5kc1wiLFxuICAgICAgXCJXaUZpIEFsbGlhbmNlXCIsXG4gICAgICBcIldpLUZpIFZlcnNpb25cIixcbiAgICAgIDdcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJDaGF0Z3B0XCIsXG4gICAgOCxcbiAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgIFwicGFnZXMvY2hhdGdwdC5odG1sXCIsXG4gICAgXCJpbWcvYWkud2VicFwiLFxuICAgIFwiRGVjb3JhdGl2ZSBBSSBsb2dvXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiYWkgaWNvbnNcIixcbiAgICAgIFwiQWkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvYWlcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICA4XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiUGFpbnQzZFwiLFxuICAgIDksXG4gICAgXCJQYWludCAzRFwiLFxuICAgIFwiRWRpdCBwaWN0dXJlcyBvciBzY3JlZW4gY2FwdHVyZXMgdXNpbmcgcGFpbnQgM0RcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICBcImltZy9wcm90b3R5cGUud2VicFwiLFxuICAgIFwiQ29sb3JmdWwgcHJvdG90eXBpbmcgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInByb3RvdHlwZSBpY29uc1wiLFxuICAgICAgXCJQcm90b3R5cGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIlBhaW50IDNEXCIsXG4gICAgICA5XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGljdGlvbmFyeVwiLFxuICAgIDEwLFxuICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxLCAzMCksXG4gICAgXCJwYWdlcy9kaWN0aW9uYXJ5d29yZC5odG1sXCIsXG4gICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgXCJEaWN0aW9uYXJ5IGljb24gZGVwaWN0aW9uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiZGljdGlvbmFyeSBpY29uc1wiLFxuICAgICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RpY3Rpb25hcnlcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgMTBcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJCb2luY1wiLFxuICAgIDExLFxuICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICBcIlBpdm90IHRoZSB1bnVzZWQgY29tcHV0aW5nIHBvdGVudGlhbCBmb3Igc2NpZW5jZVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgIFwicGFnZXMvYm9pbmMuaHRtbFwiLFxuICAgIFwiaW1nL2JvaW5jX2dsb3NzeS53ZWJwXCIsXG4gICAgXCJCT0lOQyBsb2dvXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiQk9JTkMgaWNvbnNcIixcbiAgICAgIFwiQk9JTkMgaWNvbiBkZXNpZ25lZCBieSBNaWNoYWwgS3Jha293aWFrLiBDb3lyaWdodChDKSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWFcIixcbiAgICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcbiAgICAgIFwiQk9JTkNcIixcbiAgICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAgIDExXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSVBBZGRyZXNzXCIsXG4gICAgMTIsXG4gICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgIFwiTG9va3VwIHB1YmxpYyBhbmQgbG9jYWwgSVAgYWRkcmVzc2VzXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMiwgMTMpLFxuICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICBcImltZy9pcC53ZWJwXCIsXG4gICAgXCJJUCBsb2NhdGlvbiBhbmQgYnJvd3NlciBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiSVAgaWNvbnNcIixcbiAgICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgIDEyXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSFRNTE1hcmt1cFwiLFxuICAgIDEzLFxuICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgXCJwYWdlcy9tYXJrdXAuaHRtbFwiLFxuICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICBcIkhUTUwgZnJhbWVzIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAxM1xuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIk5ldHdvcmtzcGVlZFwiLFxuICAgIDE1LFxuICAgIFwiTmV0d29yayBTcGVlZCBUZXN0XCIsXG4gICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDMsIDcpLFxuICAgIFwicGFnZXMvbmV0d29ya3NwZWVkLmh0bWxcIixcbiAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICBcIlNwZWVkIHRlc3QgZGlhbCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwicGFnZSBzcGVlZCBpY29uc1wiLFxuICAgICAgXCJQYWdlIHNwZWVkIGljb25zIGNyZWF0ZWQgYnkgUHJvc3ltYm9scyBQcmVtaXVtIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcGFnZS1zcGVlZFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJOZXR3b3JrIFNwZWVkXCIsXG4gICAgICAxNVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIlBvd2VyU2hlbGxkcml2ZXNcIixcbiAgICAxNyxcbiAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgXCJTaW1pbGFyIHRvIGFuIEhERCwgZXhjZXB0IGl0IGlzIG9ubHkgaW4gUG93ZXJTaGVsbFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIwKSxcbiAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWwud2VicFwiLFxuICAgIFwiQ29tcHV0ZXIgdGVybWluYWwgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAxN1xuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkxFQVJOX19ETlNcIixcbiAgICAyMCxcbiAgICBcIkhvdyBETlMgd29ya3NcIixcbiAgICBcIkEgZ2VuZXJhbCBvdmVydmlldyBvZiBEb21haW4gTmFtZSBTeXN0ZW1cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICBcInBhZ2VzL2Rucy5odG1sXCIsXG4gICAgXCJpbWcvZG5zLndlYnBcIixcbiAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJkbnMgaWNvbnNcIixcbiAgICAgIFwiRG5zIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJMRUFSTjogRE5TXCIsXG4gICAgICAyMFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkxFQVJOX19Hb29nbGVcIixcbiAgICAyMixcbiAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgXCJHb29nbGUgaXMgdGhlICMxIHRyYWZmaWNrZWQgc2l0ZVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDExLCAxOSksXG4gICAgXCJwYWdlcy9nb29nbGVwbGF0Zm9ybS5odG1sXCIsXG4gICAgXCJpbWcvc2VhcmNoLWVuZ2luZS53ZWJwXCIsXG4gICAgXCJBIGJhciBncmFwaCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwicmFuayBpY29uc1wiLFxuICAgICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9yYW5rXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAgIDIyXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRE9NXCIsXG4gICAgMjMsXG4gICAgXCJET01cIixcbiAgICBcIlJldmlldyB0aGUgRE9NIHdpdGggYSBET00gdHJlZVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICBcInBhZ2VzL2RvbS5odG1sXCIsXG4gICAgXCJpbWcvdHJlZS53ZWJwXCIsXG4gICAgXCJBIHRyZWUgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRyZWUgaWNvbnNcIixcbiAgICAgIFwiVHJlZSBpY29ucyBjcmVhdGVkIGJ5IGp1c3RpY29uIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJET01cIixcbiAgICAgIDIzXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiV2ViaWRlXCIsXG4gICAgMjQsXG4gICAgXCJXZWJJREVcIixcbiAgICBcIlRyeSBza2lwcGluZyB0aGUgZG93bmxvYWQgYnkgdXNpbmcgYSB3ZWIgSURFXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNSwgMyksXG4gICAgXCJwYWdlcy93ZWJpZGVzLmh0bWxcIixcbiAgICBcImltZy91eC53ZWJwXCIsXG4gICAgXCJBIGNvbXB1dGVyIGFwcGxpY2F0aW9uIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJkZXNpZ24gaWNvbnNcIixcbiAgICAgIFwiRGVzaWduIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJ3ZWJpZGVzXCIsXG4gICAgICAyNFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIlNWR1wiLFxuICAgIDI1LFxuICAgIFwiU1ZHXCIsXG4gICAgXCJGaW5kIGFuIFNWRyBhbmQgbGVhcm4gYWJvdXQgdGhlIFNWRyBsYW5ndWFnZVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDUsIDkpLFxuICAgIFwicGFnZXMvc3ZnLmh0bWxcIixcbiAgICBcImltZy9zdmcuc3ZnXCIsXG4gICAgXCJBbiBzdmcgaWNvbiBleGFtcGxlLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInNjYWxhYmxlIHZlY3RvciBncmFwaGljc1wiLFxuICAgICAgXCJTVkcgaWNvbiBjcmVhdGVkIGJ5IEhhcnZleSBSYXluZXJcIixcbiAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHL1wiLFxuICAgICAgXCJXM0NcIixcbiAgICAgIFwic3ZnXCIsXG4gICAgICAyNVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRpc2FibGVfSmF2YXNjcmlwdFwiLFxuICAgIDI2LFxuICAgIFwiRGlzYWJsZSBKYXZhU2NyaXB0XCIsXG4gICAgXCJEaXNhYmxlIHRoZSBKYXZhU2NyaXB0IHRvIHRlc3Qgd2Vic2l0ZSBmdW5jdGlvblwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDUsIDIyKSxcbiAgICBcInBhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgIFwiaW1nL3NvZnR3YXJlLWFwcGxpY2F0aW9uLndlYnBcIixcbiAgICBcIkEgamF2YXNjcmlwdCBmdW5jdGlvbiBpY29uLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgIFwiV2ViIGNvZGluZyBpY29ucyBjcmVhdGVkIGJ5IE11aGFtbWFkIEF0aWYgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy93ZWItY29kaW5nXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgIDI2XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiTEVBUk5fX0hUVFBcIixcbiAgICAyOCxcbiAgICBcIkhUVFBcIixcbiAgICBcIkhUVFAgbWFrZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nIHdlYiBwYWdlcyBwb3NzaWJsZS5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxMiksXG4gICAgXCJwYWdlcy9odHRwLmh0bWxcIixcbiAgICBcImltZy9odHRwLndlYnBcIixcbiAgICBcIkh0dHAgdmVyYiBpbiBmcm9udCBvZiBhIGdsb2JlIGljb24uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiaHR0cCBpY29uc1wiLFxuICAgICAgXCJIdHRwIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0dHBcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiTEVBUk46IEhUVFBcIixcbiAgICAgIDI4XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiQ1NTZGVmXCIsXG4gICAgMjksXG4gICAgXCJDU1NcIixcbiAgICBcIkNTUyBzdHlsZXMgdGhlIGVsZW1lbnRzIHdpdGhpbiBhIHBhZ2UuXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNiwgMTkpLFxuICAgIFwicGFnZXMvY3NzLmh0bWxcIixcbiAgICBcImltZy9jc3MtMy53ZWJwXCIsXG4gICAgXCJBIENTUyB0aHJlZSBsb2dvLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImNzcyBpY29uc1wiLFxuICAgICAgXCJDc3MgaWNvbnMgY3JlYXRlZCBieSBQaXhlbCBwZXJmZWN0IC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY3NzXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkNTU1wiLFxuICAgICAgMjlcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJMYXRlbmN5XCIsXG4gICAgMzIsXG4gICAgXCJMYXRlbmN5XCIsXG4gICAgXCJUcmF2ZWwgbGF0ZW5jeSBjYW4gc2xvdyBkb3duIGEgd2Vic2l0ZS5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA3LCAxOCksXG4gICAgXCJwYWdlcy9sYXRlbmN5Lmh0bWxcIixcbiAgICBcImltZy9jaHJvbm9tZXRlci53ZWJwXCIsXG4gICAgXCJBIHN0b3B3YXRjaCBpY29uLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRpbWVyIGljb25zXCIsXG4gICAgICBcIlRpbWVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RpbWVyXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkxhdGVuY3lcIixcbiAgICAgIDMyXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSFRNTGRlZlwiLFxuICAgIDMzLFxuICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGFuIEhUTUwgZWxlbWVudFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDcsIDI1KSxcbiAgICBcInBhZ2VzL2h0bWwuaHRtbFwiLFxuICAgIFwiaW1nL2h0bWwud2VicFwiLFxuICAgIFwiSFRNTCBlbGVtZW50IHN5bnRheCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiaHRtbCBpY29uc1wiLFxuICAgICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0bWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICAgIDMzXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiVVJMXCIsXG4gICAgMzQsXG4gICAgXCJVUkwgQWRkcmVzcyBFeGFtcGxlc1wiLFxuICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYSBVUkxcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA4LCA3KSxcbiAgICBcInBhZ2VzL3VybC5odG1sXCIsXG4gICAgXCJpbWcvd3d3LndlYnBcIixcbiAgICBcIlVSTCBleGFtcGxlIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ1cmwgaWNvbnNcIixcbiAgICAgIFwiVXJsIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3VybFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgMzRcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEYXRhU3RvcmFnZVwiLFxuICAgIDM1LFxuICAgIFwiRGF0YSBTdG9yYWdlXCIsXG4gICAgXCJMb2NhbCBzdG9yYWdlIHNhdmVzIGRhdGEgd2hlbiBuZWVkZWQgZm9yIGNvbmN1cnJlbnQgcGFnZSBzdXJmaW5nLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDgsIDE0KSxcbiAgICBcInBhZ2VzL2RhdGFzdG9yYWdlLmh0bWxcIixcbiAgICBcImltZy9zZXJ2ZXIud2VicFwiLFxuICAgIFwiRGF0YSBzdG9yYWdlIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgIDM1XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSFNMXCIsXG4gICAgMzYsXG4gICAgXCJIdWUsIFNhdHVyYXRpb24sIGFuZCBMaWdodG5lc3NcIixcbiAgICBcIkhTTCBjb2xvcnMgbWFuaXB1bGF0ZSBodWVzLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDksIDYpLFxuICAgIFwicGFnZXMvaHNsLmh0bWxcIixcbiAgICBcImltZy9jb2xvci13aGVlbC53ZWJwXCIsXG4gICAgXCJDb2xvciB3aGVlbCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidmFyaWV0eSBpY29uc1wiLFxuICAgICAgXCJWYXJpZXR5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3ZhcmlldHlcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiSHVlLCBTYXR1cmF0aW9uLCBhbmQgTGlnaHRuZXNzXCIsXG4gICAgICAzNlxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIlRvLURvX0xpc3RcIixcbiAgICAzNyxcbiAgICBcIlRvLURvIExpc3RcIixcbiAgICBcIkEgVG9EbyBsaXN0IGF2YWlsYWJsZSB0aHJvdWdoIEphdmFTY3JpcHQgYW5kIGxvY2FsU3RvcmFnZS5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA5LCAyOCksXG4gICAgXCJwYWdlcy90b2Rvcy5odG1sXCIsXG4gICAgXCJpbWcvY2hlY2sud2VicFwiLFxuICAgIFwiVG8tZG8gbGlzdCBub3RlcGFkXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGFza3MgaWNvbnNcIixcbiAgICAgIFwiVGFza3MgaWNvbnMgY3JlYXRlZCBieSBwb3Bjb3JuYXJ0cyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rhc2tzXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIlRvLURvIExpc3RcIixcbiAgICAgIDM3XG4gICAgKVxuICApXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBndWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgbmV3IFdlYkJpdChcbiAgICBcIkh0dHBzY2VydFwiLFxuICAgIDQsXG4gICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgIFwiU2VsZWN0IHRvIHZpZXcgYSB3ZWJzaXRlJ3MgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgIFwiZ3VpZGVzL2h0dHBzLmh0bWxcIixcbiAgICBcImltZy9odHRwc19jZXJ0LndlYnBcIixcbiAgICBcIkN1cnNvciBzZWxlY3RpbmcgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJzc2wgY2VydGlmaWNhdGUgaWNvbnNcIixcbiAgICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbC1jZXJ0aWZpY2F0ZVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgNFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIlNlYXJjaHZlcnRpY2Fsc1wiLFxuICAgIDE0LFxuICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICBcIk9wdGltaXplIHlvdXIgc2VhcmNoIGVuZ2luZSBuZXdzIGFuZCByZXN1bHRzXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgXCJpbWcvc2VhcmNoX3NldHRpbmdzLndlYnBcIixcbiAgICBcIlNlYXJjaCBzZXR0aW5ncyBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiY29udGVudCB3cml0aW5nIGljb25zXCIsXG4gICAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvbnRlbnQtd3JpdGluZ1wiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAxNFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIlNNVFBcIixcbiAgICAxNixcbiAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgIFwiTGVhcm4gRW1haWwgcHJvdG9jb2xzIGFuZCBwb3J0IG51bWJlcnNcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAzLCAxMyksXG4gICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgXCJpbWcvY29tbXVuaWNhdGlvbnMud2VicFwiLFxuICAgIFwiRW1haWwgc2VydmVyLXN0YWNrIHdpdGggbWFpbCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zZXJ2ZXJcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiU01UUCBhbmQgRW1haWxcIixcbiAgICAgIDE2XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2dG9vbHNcIixcbiAgICAxOSxcbiAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIGFwcGxpY2F0aW9uIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDMsIDI3KSxcbiAgICBcImd1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCIsXG4gICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgIDE5XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2dG9vbHN0d29cIixcbiAgICAyMSxcbiAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgXCJPcGVuIHRoZSBkZXZlbG9wZXIncyB0b29sYm94IGFub3RoZXIgd2F5XCIsXG4gICAgbmV3IERhdGUoMjAyMywgNCwgMTApLFxuICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgXCJpbWcvdG9vbC1ib3gyLndlYnBcIixcbiAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb24gdHdvXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgIDIxXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiUFdBSWNvblwiLFxuICAgIDI3LFxuICAgIFwiR1VJREU6IEluc3RhbGwgdGhlIFBXQSBhcHBsaWNhdGlvbnNcIixcbiAgICBcIlByb2dyZXNzaXZlIHdlYnNpdGVzIGhhdmUgYW4gaW5zdGFsbGF0aW9uIG9wdGlvblwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDUsIDI3KSxcbiAgICBcImd1aWRlcy9wd2FpY29uLmh0bWxcIixcbiAgICBcImltZy9hcHAtZGV2ZWxvcG1lbnQud2VicFwiLFxuICAgIFwiQXBwIGRldmVsb3BtZW50IGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJkZXZlbG9wbWVudCBpY29uc1wiLFxuICAgICAgXCJEZXZlbG9wbWVudCBpY29ucyBjcmVhdGVkIGJ5IERlc2lnbiBDaXJjbGUgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXZlbG9wbWVudFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAyN1xuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkNsZWFyY29va2llc1wiLFxuICAgIDMwLFxuICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgIFwiRG9uJ3Qgd2FzdGUgdGltZSBzaWZ0aW5nIHRocm91Z2ggc2V0dGluZ3NcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyKSxcbiAgICBcImd1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIixcbiAgICBcImltZy9jb29raWVzLndlYnBcIixcbiAgICBcIkJyb3dzZXIgY29va2llIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJjb29raWUgaWNvbnNcIixcbiAgICAgIFwiQ29va2llIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nvb2tpZVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAzMFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkluc3BlY3RFbGVtZW50XCIsXG4gICAgMzgsXG4gICAgXCJFbGVtZW50IEluc3BlY3RcIixcbiAgICBcIlNlZSBhbiBlbGVtZW50J3MgbWV0YWRhdGEgdXNpbmcgaG92ZXIgZGV0YWlscy5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMCwgOSksXG4gICAgXCJndWlkZXMvZWxlbWVudGluc3BlY3QuaHRtbFwiLFxuICAgIFwiaW1nL2NoZWNrZWQud2VicFwiLFxuICAgIFwiSW5zcGVjdCBlbGVtZW50IGljb24gZGVwaWN0aW9uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiaW5zcGVjdGlvbiBpY29uc1wiLFxuICAgICAgXCJJbnNwZWN0aW9uIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2luc3BlY3Rpb25cIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiRWxlbWVudCBJbnNwZWN0XCIsXG4gICAgICAzOFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzRWxlbWVudHNcIixcbiAgICAzOSxcbiAgICBcIkd1aWRlOiBEZXYgRWxlbWVudHNcIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIGVsZW1lbnRzIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEwLCAyOCksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3dlYi1kZXZlbG9wbWVudC53ZWJwXCIsXG4gICAgXCJDb21wdXRlciBkZXBpY3Rpb24gb2YgZGV2ZWxvcGVyJ3MgdG9vbHNcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJkZXZlbG9wbWVudCBpY29uc1wiLFxuICAgICAgXCJEZXZlbG9wbWVudCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQtaWNvbnMtY29tIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGV2ZWxvcG1lbnRcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR3VpZGU6IERldiBFbGVtZW50c1wiLFxuICAgICAgMzlcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc0NvbnNvbGVcIixcbiAgICA0MCxcbiAgICBcIkdVSURFOiBEZXYgQ29uc29sZVwiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgY29uc29sZSB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMCwgMjkpLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3Rlcm1pbmFsMi53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBkZXZlbG9wZXIncyB0b29sc1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgU21hc2hpY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgQ29uc29sZVwiLFxuICAgICAgNDBcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc1NvdXJjZXNcIixcbiAgICA0MSxcbiAgICBcIkdVSURFOiBEZXYgU291cmNlc1wiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3Mgc291cmNlcyB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMCwgMzApLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3Rlcm1pbmFsMy53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBkZXZlbG9wZXIncyB0b29sc1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgU21hc2hpY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgU291cmNlc1wiLFxuICAgICAgNDFcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc05ldHdvcmtcIixcbiAgICA0MixcbiAgICBcIkdVSURFOiBEZXYgTmV0d29ya1wiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgbmV0d29yayB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMCwgMzEpLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3Rlcm1pbmFsNC53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBkZXZlbG9wZXIncyB0b29sc1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgU21hc2hpY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgTmV0d29ya1wiLFxuICAgICAgNDJcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc1BlcmZvcm1hbmNlXCIsXG4gICAgNDMsXG4gICAgXCJHVUlERTogRGV2IFBlcmZvcm1hbmNlXCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBwZXJmb3JtYW5jZSB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMSwgMSksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3Rlcm1pbmFsNS53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBkZXZlbG9wZXIncyB0b29sc1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgU21hc2hpY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgUGVyZm9ybWFuY2VcIixcbiAgICAgIDQzXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2VG9vbHNNZW1vcnlcIixcbiAgICA0NCxcbiAgICBcIkdVSURFOiBEZXYgTWVtb3J5XCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBtZW1vcnkgdGFiXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTEsIDIpLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWw2LndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBNZW1vcnlcIixcbiAgICAgIDQ0XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2VG9vbHNTZWN1cml0eVwiLFxuICAgIDQ1LFxuICAgIFwiR1VJREU6IERldiBTZWN1cml0eVwiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3Mgc2VjdXJpdHkgdGFiXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTEsIDMpLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIixcbiAgICBcImltZy9zc2wud2VicFwiLFxuICAgIFwiSWNvbiBkZXBpY3Rpb24gb2Ygc2VjdXJpdHkgaXRlbXM6IGEgbG9jayBhbmQgYSBzaGllbGRcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJzc2wgaWNvbnNcIixcbiAgICAgIFwiU3NsIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogRGV2IFNlY3VyaXR5XCIsXG4gICAgICA0NVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzTGlnaHRob3VzZVwiLFxuICAgIDQ2LFxuICAgIFwiR1VJREU6IERldiBMaWdodGhvdXNlXCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBMaWdodGhvdXNlIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDExLCAxOSksXG4gICAgXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiLFxuICAgIFwiaW1nL2xpZ2h0aG91c2Uud2VicFwiLFxuICAgIFwiSWNvbiBkZXBpY3Rpb24gb2YgYSBsaWdodGhvdXNlXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwibGlnaHRob3VzZSBpY29uc1wiLFxuICAgICAgXCJMaWdodGhvdXNlIGljb25zIGNyZWF0ZWQgYnkgQlpaUklOQ0FOVEFUSU9OIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvbGlnaHRob3VzZVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogRGV2IExpZ2h0aG91c2VcIixcbiAgICAgIDQ2XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2VG9vbHNDU1NPdmVydmlld1wiLFxuICAgIDQ3LFxuICAgIFwiR1VJREU6IERldiBDU1MgT3ZlcnZpZXdcIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIENTUyBPdmVydmlldyB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMSwgMTkpLFxuICAgIFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWw3LndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBDU1MgT3ZlcnZpZXdcIixcbiAgICAgIDQ3XG4gICAgKVxuICApXG4pO1xuXG4vKipcbiAqIFwiRXhwbG9yZSBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBleHBsb3JlcyA9IG5ldyBBcnJheShcbiAgbmV3IFdlYkJpdChcbiAgICBcIk5hc2FcIixcbiAgICAzLFxuICAgIFwiRVhQTE9SRTogTkFTQSBQYWdlc1wiLFxuICAgIFwiRXhwbG9yZSB0aGUgTkFTQSBkb21haW4uIExlYXJuIGFib3V0IHRoZSB1bml2ZXJzZSB2aWEgTkFTQSBsaW5rc1wiLFxuICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxOCksXG4gICAgXCJleHBsb3JlL25hc2EuaHRtbFwiLFxuICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgIFwiTkFTQSBBcnRlbWlzIExvZ29cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJOQVNBXCIsXG4gICAgICBcIkltYWdlIHNvdXJjZSB2aWEgdGhlIE5hdGlvbmFsIEFlcm9uYXV0aWNzIGFuZCBTcGFjZSBBZG1pbmlzdHJhdGlvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5uYXNhLmdvdi9hdWRpZW5jZS9mb3JzdHVkZW50cy81LTgvZmVhdHVyZXMvc3ltYm9scy1vZi1uYXNhLmh0bWxcIixcbiAgICAgIFwiTkFTQVwiLFxuICAgICAgXCJOQVNBIFBhZ2VzXCIsXG4gICAgICAzXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiVmlydHVhbHRvdXJcIixcbiAgICAxOCxcbiAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICBcIkV4cGxvcmUgdGhlIHJlYWwgd29ybGQgaW4gYSB3ZWIgYnJvd3NlclwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIzKSxcbiAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgIFwiaW1nL2dvb2dsZS1leHBlZGl0aW9ucy53ZWJwXCIsXG4gICAgXCJHb29nbGUgRXhwZWRpdGlvbnMgbG9nbyBmcm9tIEZMQVRJQ09OXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiZ29vZ2xlIGV4cGVkaXRpb25zIGljb25zXCIsXG4gICAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAxOFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIldlYmJcIixcbiAgICAzMSxcbiAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlXCIsXG4gICAgXCJEaXNjb3ZlciB0aGUgc2NpZW5jZSBtaXNzaW9uIG9mIE5BU0EncyBKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSAoSldTVClcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA3LCAzKSxcbiAgICBcImV4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCIsXG4gICAgXCJpbWcvSldTVF9wb3N0ZXIud2VicFwiLFxuICAgIFwiSmFtZXMgV2ViYiBzcGFjZSB0ZWxlc2NvcGUgcG9zdGVyIGltYWdlXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiSGV4YWdvbiBMaXRobyAoMjAxOClcIixcbiAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvbiBwcm92aWRlZCBieSBuYXNhLmdvdlwiLFxuICAgICAgXCJodHRwczovL2p3c3QubmFzYS5nb3YvY29udGVudC9mZWF0dXJlcy9lZHVjYXRpb25hbC9wcmludC5odG1sXCIsXG4gICAgICBcImp3c3QubmFzYS5nb3ZcIixcbiAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvblwiLFxuICAgICAgMzFcbiAgICApXG4gIClcbik7XG5cbi8qKlxuICogTXVsdGlkaW1lbnNpb25hbCBhcnJheS4gUm93cyBhcmUgdGhlIGRpZmZlcmVudCBzZWN0aW9ucy4gQ29sdW1uc1xuICogY29udGFpbiBlYWNoIGFydGljbGUncyBkYXRhIGJlbG9uZ2luZyBpbiB0aGF0IHNlY3Rpb24uXG4gKi9cbmNvbnN0IFdFQkJJVERBVEEgPSBbYXJiaXRyYXJ5QXJ0aWNsZXMsIGd1aWRlU2hvcnRzLCBleHBsb3Jlc107XG5leHBvcnQgZGVmYXVsdCBXRUJCSVREQVRBO1xuIiwiXCJzdHJpY3QgbW9kZVwiO1xuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5jb25zdCBwb3J0RGVmaW5pdGlvbnMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gIFsyMCwgXCJGVFAtZGF0YVwiXSxcbiAgWzIxLCBcIkZUUFwiXSxcbiAgWzIyLCBcIlNlY3VyZSBTU0ggIC9UQ1BcIl0sXG4gIFsyMywgXCJUZWxuZXQgKHVuc2VjdXJlKVwiXSxcbiAgWzI1LCBcIlNNVFAgLSA0NjUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gIFszNywgXCJ0aW1lc2VydmVyIC9UQ1AvVURQXCJdLFxuICBbNDksIFwiVEFDQUNTK1wiXSxcbiAgWzUzLCBcIkROUyAgL1VEUC9UQ1BcIl0sXG4gIFs2NywgXCJESENQXCJdLFxuICBbNjgsIFwiREhDUFwiXSxcbiAgWzgwLCBcIkhUVFAgIC9UQ1BcIl0sXG4gIFs4OCwgXCJLZXJiZXJvcy1zZWMgIC9UQ1AvVURQXCJdLFxuICBbMTEwLCBcIlBPUCAtIDk5NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgWzEzNSwgXCJSUENcIl0sXG4gIFsxMzcsIFwiTkVUQklPU1wiXSxcbiAgWzEzOCwgXCJORVRCSU9TXCJdLFxuICBbMTM5LCBcIk5FVEJJT1NcIl0sXG4gIFsxNDMsIFwiSU1BUCAtIDk5MyBmb3IgZW5jcnlwdGVkXCJdLFxuICBbMTYxLCBcIlNOTVAgIE1hbmFnZXJcIl0sXG4gIFsxNjIsIFwiU05NUCAgQWdlbnRcIl0sXG4gIFszODksIFwiTERBUCAtIDYzNiBmb3Igc2VjdXJlXCJdLFxuICBbNDQzLCBcIkhUVFBTICAvVENQXCJdLFxuICBbNDQ1LCBcIlNNQiAgL1RDUFwiXSxcbiAgWzQ2NSwgXCJTTVRQIGJ5IFRMU1wiXSxcbiAgWzUxNCwgXCJTWVNMT0cgIC9VRFBcIl0sXG4gIFs1ODcsIFwiU01UUFMgU1RBUlRUTFNcIl0sXG4gIFs2MzYsIFwiTERBUCBTU0xcIl0sXG4gIFs5OTAsIFwiRlRQU1wiXSxcbiAgWzk5MywgXCJJTUFQIFRMU1wiXSxcbiAgWzk5NSwgXCJQT1AgVExTXCJdLFxuICBbMTgxMiwgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICBbMTgxMywgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAvLyBbMzMwOSwgXCJTUUwgIC9UQ1AvVURQXCJdLFxuICBbMzI2OSwgXCJNaWNyb3NvZnQgR2xvYmFsIENhdGFsb2dcIl0sXG4gIFszMzg5LCBcIlJEUFwiXSxcbl0pO1xuZXhwb3J0IGRlZmF1bHQgcG9ydERlZmluaXRpb25zO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFiYnJPcGVuIHtcbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5hYmJyRWxlbWVudCA9IGFiYnJFbGVtZW50O1xuICB9O1xuXG4gIHB1YmxpYyByZXZlYWxBYmJyRGVzY3JpcHRpb24oKSB7XG4gICAgdGhpcy5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGxldCBhYmJyVGl0bGVBdHRyVmFsOiBzdHJpbmcgPSB0aGlzLmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcblxuICAgICAgaWYgKGUudGFyZ2V0ID09IHRoaXMuYWJickVsZW1lbnQpIHtcbiAgICAgICAgLy9jcmVhdGUgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5hYmJyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJiclRpdGxlQXR0clZhbH0pJHtTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgIDE2MFxuICAgICAgICApfWA7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBnZXRVcmw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBnZXRVcmwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBnZXRVcmw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuZ2V0VXJsID0gZ2V0VXJsO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAqL1xuICBwdWJsaWMgZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHZXRVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIGZldGNoIHJlcXVlc3QgY2FuIHRha2UgVVJMIG9yIHN0cmluZyBwYXJhbWV0ZXIuIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYXBpR0VUXG4gICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKi9cbiAgcHVibGljIHNldEdldFVybChnZXRVcmw6IFVSTCB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZ2V0VXJsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmdldFVybCA9IG5ldyBVUkwoZ2V0VXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRVcmwgPSBnZXRVcmw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBIHB1YmxpYyBmdW5jdGlvbiBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAqICB0aGUgcmVxdWVzdCBuZWVkcyBhZGRlZCB0byBicm93c2VyIHN0b3JhZ2UsIHRoZSBmZXRjaCBpcyBtYWRlIGFuZCBzZW50IHRvXG4gICAqICBzdG9yYWdlLiBBIGNsb25lZCBjb3B5IG9mIHRoZSBmZXRjaGVkIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGlzXG4gICAqICBzZW50IHRvIHRoZSBjYWNoZS4gV2l0aG91dCBzZW5kaW5nIHRvIGJyb3dzZXIgY2FjaGUsIHRoZSBmZXRjaCBpcyByZXF1ZXN0ZWQgYW5kXG4gICAqIHJldHVybmVkLlxuICAgKlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYXBpR2V0KGdldFVybDogVVJMKSB7XG4gICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgY2FjaGUgc3RvcmFnZVxuICAgIGlmICh0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSkge1xuICAgICAgLy9UaGUgcmV0dXJuZWQgZGF0YSBpcyBwYWNrYWdlcyBhcyBhIFByb21pc2Ugb2JqZWN0XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgLy9PcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgd2luZG93LmNhY2hlc1xuICAgICAgICAgICAgLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKVxuICAgICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICBjYWNoZXMubWF0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAvL05vIG1hdGNoZXMgZm9yIHRoaXMgcmVxdWVzdCBpbiBTdG9yYWdlIENhY2hlLCBzbyBmZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgICAgZmV0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRSZXNwID0gcmVzdWx0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lZFJlc3Auc3RhdHVzICE9IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChnZXRVcmwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRSZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgIC8vQ2Fubm90IG9wZW4gU3RvcmFnZSBDYWNoZVxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKGdldFVybCkpO1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvbWlzZSBlcnJvciBvbiBkYXRhIGZldGNoLlwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvL1RoZSBwcm9taXNlIGhhcyByZXNvbHZlZCAtLT4gcmV0dXJuIHRoZSBwcm9taXNlIGRhdGFcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShnZXRVcmwpKTtcbiAgICAgIH0pO1xuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgZmV0Y2ggcmVxdWVzdCwgcmV0dXJuaW5nIGEgZmV0Y2ggcHJvbWlzZS5cbiAgICogQHBhcmFtIGdldFVybCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAqL1xuICBwcml2YXRlIGZldGNoRGF0YShnZXRVcmw6IFVSTCkge1xuICAgIHJldHVybiBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSd2JMaW5rIGZyb20gXCIuL3J3YkxpbmtcIjtcblxuLyoqXG4gKiBVc2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxuICovXG5jbGFzcyBBdHRyaWJ1dGlvbkxpbmsgZXh0ZW5kcyBSd2JMaW5rIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgcHVibGljIGF0dHJpYnV0ZWRPd25lcjogc3RyaW5nO1xuICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICBwdWJsaWMgYXJ0aWNsZUlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLyoqTGluayB0aXRsZSAqL1xuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgLyoqTGluayBpbm5lciB0ZXh0ICovXG4gICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgLyoqIGxpbmsgaHJlZiAqL1xuICAgIGhSZWZlcmVuY2U6IHN0cmluZyxcbiAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgIGF0dHJpYnV0ZWRPd25lcjogc3RyaW5nLFxuICAgIC8qKldlYkJpdHMgcGFnZSAqL1xuICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICBhcnRpY2xlSWQ6IG51bWJlclxuICApIHtcbiAgICBzdXBlcih0aXRsZSwgaW5uZXJUZXh0LCBwYWdlTmFtZSwgaFJlZmVyZW5jZSk7XG4gICAgdGhpcy5hdHRyaWJ1dGVkT3duZXIgPSBhdHRyaWJ1dGVkT3duZXI7XG4gICAgdGhpcy5hcnRpY2xlSWQgPSBhcnRpY2xlSWQ7XG4gICAgQXR0cmlidXRpb25MaW5rLmNvdW50Kys7XG4gIH07XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBBdHRyaWJ1dGlvbkxpbms7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZHNTbGlkZVNob3cge1xuICBwdWJsaWMgc3NDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwdWJsaWMgYXJyb3dzQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgcHVibGljIHByZXZCdG46IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgbmV4dEJ0bjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY2FyZHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+O1xuICBwcml2YXRlIGNhcmRTaG93UXVhbnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjYXJkSW5keFN0YXJ0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGNhcmRDb3VudGVyOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGNhcmRzSW5keEVuZDogbnVtYmVyO1xuICBwcml2YXRlIHR1cm46IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbWF4VHVybkNvdW50OiBudW1iZXI7XG4gIHByaXZhdGUgc2xpZGVTaG93Q29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNsaWRlc2hvd1wiKSBhcyBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBudW1iZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB3aW5kb3dTaXplOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2FyZHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+LCBxdWFudGl0eVNob3c6IG51bWJlciwgd2luZG93U2l6ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jYXJkcyA9IGNhcmRzO1xuICAgIHRoaXMuY2FyZFNob3dRdWFudCA9IHF1YW50aXR5U2hvdztcbiAgICB0aGlzLmNhcmRzSW5keEVuZCA9IHRoaXMuY2FyZFNob3dRdWFudCAtIDE7XG4gICAgdGhpcy5tYXhUdXJuQ291bnQgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIHRoaXMuY2FyZFNob3dRdWFudDtcbiAgICB0aGlzLndpbmRvd1NpemUgPSB3aW5kb3dTaXplO1xuXG4gICAgdGhpcy5oaWRlT3ZlcmZsb3dFbGVtZW50cygpO1xuICAgIHRoaXMub25Jbml0U2V0dXBDYXJkUG9zaXRpb24oKTtcbiAgICB0aGlzLnNzQ29udGFpbmVyID0gdGhpcy5uZXdDb250YWluZXJNYXJrdXAoKTtcbiAgICB0aGlzLmFycm93c0NvbnRhaW5lciA9IHRoaXMubmV3QXJyb3dzTWFya3VwKCk7XG4gICAgdGhpcy5uZXdOdW1iZXJFbGVtZW50KCk7XG4gICAgdGhpcy5hZGRCdG5FdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuc2hvd0hpZGVTbGlkZVNob3dCdXR0b25zKCk7XG4gIH07XG5cbiAgcHVibGljIG5leHRTbGlkZSgpIHtcbiAgICBpZiAodGhpcy50dXJuID09IHRoaXMubWF4VHVybkNvdW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJMQVJHRVwiKSB7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB9XG4gICAgICAvL0hpZGUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgICAgIC8vTW92ZSBtaWRkbGUgZWxlbWVudCB0byBsZWZ0XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgtMzY1cHgpXCI7XG5cbiAgICAgIC8vTW92ZSByaWdodCB0byB0aGUgbWlkZGxlXG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCArIDJdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwcHgpXCI7XG5cbiAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInotaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcblxuICAgICAgLy9Nb3ZlIGluIG5ldyBlbGVtZW50XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDM2NXB4KVwiO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIk1FRElVTVwiKSB7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB9XG4gICAgICAvL0hpZGUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgICAgIC8vTW92ZSB0aGUgcmlnaHQgZWxlbWVudCB0byBsZWZ0XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgtMTgyLjVweClcIjtcblxuICAgICAgLy9EaXNwbGF5IHRoZSBuZXh0IGVsZW1lbnQgZm9yIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiei1pbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAvL01vdmUgaW4gbmV3IGVsZW1lbnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTgyLjVweClcIjtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJTTUFMTFwiKSB7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB9XG4gICAgICAvL0hpZGUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgICAgIC8vTW92ZSBlbGVtZW50IHRvIGxlZnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoLTE4Mi41cHgpXCI7XG5cbiAgICAgIC8vTW92ZSBlbGVtZW50IHRvIGNlbnRlclxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgKyAxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMHB4KVwiO1xuXG4gICAgICAvL0Rpc3BsYXkgdGhlIG5leHQgZWxlbWVudCBmb3Igc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ6LWluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG5cbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTgyLjVweClcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0luY3JlbWVudCBpbmRleCBjb3VudGVyXG4gICAgdGhpcy5jYXJkSW5keFN0YXJ0Kys7XG4gICAgdGhpcy5jYXJkc0luZHhFbmQrKztcbiAgICB0aGlzLnR1cm4rKztcbiAgICB0aGlzLmNhcmRDb3VudGVyKys7XG4gIH07XG5cbiAgcHVibGljIHByZXZTbGlkZSgpIHtcbiAgICBpZiAodGhpcy50dXJuID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIkxBUkdFXCIpIHtcbiAgICAgIC8vSGlkZSB0aGUgbGFzdCBlbGVtZW50IGluIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB9XG4gICAgICAvL01vdmUgbWlkZGxlIGVsZW1lbnQgdG8gdG8gdGhlIHJpZ2h0XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgzNjVweClcIjtcblxuICAgICAgLy9Nb3ZlIGxlZnQgZWxlbWVudCB0byB0aGUgcmlnaHRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMHB4KVwiO1xuXG4gICAgICAvL0Rpc3BsYXkgdGhlIG5leHQgZWxlbWVudCBmb3Igc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG5cbiAgICAgIC8vTW92ZSBpbiBuZXcgZWxlbWVudFxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoLTM2NXB4KVwiO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJNRURJVU1cIikge1xuICAgICAgLy9IaWRlIHRoZSBsYXN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIH1cbiAgICAgIC8vTW92ZSBsZWZ0IGVsZW1lbnQgdG8gdGhlIHJpZ2h0XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDE4Mi41cHgpXCI7XG5cbiAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcblxuICAgICAgLy9Nb3ZlIGluIG5ldyBlbGVtZW50XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgtMTgyLjVweClcIjtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiU01BTExcIikge1xuICAgICAgLy9IaWRlIHRoZSBmaXJzdCBlbGVtZW50IGluIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgfVxuICAgICAgLy9Nb3ZlIGVsZW1lbnQgdG8gcmlnaHRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTgyLjVweClcIjtcblxuICAgICAgLy9Nb3ZlIGVsZW1lbnQgdG8gY2VudGVyXG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwcHgpXCI7XG5cbiAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcblxuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9JbmNyZW1lbnQgaW5kZXggY291bnRlclxuICAgIHRoaXMuY2FyZEluZHhTdGFydC0tO1xuICAgIHRoaXMuY2FyZHNJbmR4RW5kLS07XG4gICAgdGhpcy50dXJuLS07XG4gICAgdGhpcy5jYXJkQ291bnRlci0tO1xuICB9O1xuXG4gIHB1YmxpYyBhZGRCdG5FdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAvL0V2ZW50IGxpc3RlbmVycyBmb3IgdGhlIG5leHQgYW5kIHByZXZpb3VzIGJ1dHRvbnNcbiAgICB0aGlzLm5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcbiAgICAgIHRoaXMuc2hvd0hpZGVTbGlkZVNob3dCdXR0b25zKCk7XG4gICAgICB0aGlzLm51bWJlckFycm93VGV4dCgpO1xuICAgIH0pO1xuICAgIHRoaXMucHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnByZXZTbGlkZSgpO1xuICAgICAgdGhpcy5zaG93SGlkZVNsaWRlU2hvd0J1dHRvbnMoKTtcbiAgICAgIHRoaXMubnVtYmVyQXJyb3dUZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIHNob3dIaWRlU2xpZGVTaG93QnV0dG9ucygpIHtcbiAgICBpZiAodGhpcy5jYXJkSW5keFN0YXJ0ID09IDApIHtcbiAgICAgIHRoaXMucHJldkJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5wcmV2QnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmNhcmRzSW5keEVuZCA9PSB0aGlzLmNhcmRzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMubmV4dEJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5uZXh0QnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJldkJ0bi5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgdGhpcy5uZXh0QnRuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICB0aGlzLnByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgdGhpcy5uZXh0QnRuLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICB9O1xuXG4gIHB1YmxpYyBudW1iZXJBcnJvd1RleHQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIlNNQUxMXCIpIHtcbiAgICAgIHRoaXMubnVtYmVyRWxlbWVudC5pbm5lclRleHQgPSBgJHt0aGlzLmNhcmRDb3VudGVyLnRvU3RyaW5nKCl9IG9mICR7dGhpcy5jYXJkcy5sZW5ndGgudG9TdHJpbmcoKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm51bWJlckVsZW1lbnQuaW5uZXJUZXh0ID0gYFske3RoaXMuY2FyZENvdW50ZXIudG9TdHJpbmcoKX0uLiR7KHRoaXMuY2FyZENvdW50ZXIgKyB0aGlzLmNhcmRTaG93UXVhbnQgLSAxKS50b1N0cmluZygpfV0gb2YgJHt0aGlzLmNhcmRzLmxlbmd0aC50b1N0cmluZygpfWA7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBvblJlc2l6ZVNob3dTdGFydGluZ0VsZW1zKCkge1xuICAgIC8vc2NyZWVuIGhhcyByZWZyZXNoZWQuIGNvdW50ZXIgaXMgcmVzZXQgdG8gc3RhcnQuIGNhcmQgZWxlbWVudHMgbWF5IGJlXG4gICAgLy9oaWRkZW4gZnJvbSB0aGUgZGlzcGxheSwgZGVwZW5kaW5nIG9uIHdoZW4gdGhlIHJlZnJlc2ggb2NjdXJyZWQsIHNvXG4gICAgLy9yZXNldCB0aGUgc3RhcnRpbmcgZWxlbWVudHMgdG8gdmlzaWJsZVxuICAgIC8vU2hvdyBvdmVyZmxvdyBlbGVtZW50c1xuICAgIGlmICh0aGlzLmNhcmRJbmR4U3RhcnQgPCB0aGlzLmNhcmRTaG93UXVhbnQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuY2FyZHNJbmR4RW5kOyBpKyspIHtcbiAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS5zZXRQcm9wZXJ0eShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW2ldLnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiU01BTExcIikge1xuICAgICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiTEFSR0VcIikge1xuICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBoaWRlT3ZlcmZsb3dFbGVtZW50cygpIHtcbiAgICAvL0hpZGUgb3ZlcmZsb3cgZWxlbWVudHNcbiAgICBpZiAodGhpcy5jYXJkSW5keFN0YXJ0IDwgdGhpcy5jYXJkU2hvd1F1YW50KSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5jYXJkcy5sZW5ndGggLSAxOyBpID4gdGhpcy5jYXJkc0luZHhFbmQ7IGktLSkge1xuICAgICAgICB0aGlzLmNhcmRzW2ldLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmNhcmRzW2ldLnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiU01BTExcIikge1xuICAgICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiTUVESVVNXCIpIHtcbiAgICAgICAgICB0aGlzLmNhcmRzW2ldLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDM2NXB4KVwiO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNhcmRzWzBdLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICB9O1xuXG4gIHByaXZhdGUgbmV3Q29udGFpbmVyTWFya3VwKCkge1xuICAgIGNvbnN0IG5ld0NvbnRhaW5lclN0eWxlcyA9ICgpID0+IHtcbiAgICAgIC8vQ29udGFpbmVyIHN0eWxlc1xuICAgICAgc2xpZGVTaG93U2xpZGVzLmNsYXNzTGlzdC5hZGQoXCJzbGlkZXNjb250YWluZXJcIik7XG4gICAgICBzbGlkZVNob3dTbGlkZXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgIHNsaWRlU2hvd1NsaWRlcy5zdHlsZS5oZWlnaHQgPSBcIjMyZW1cIjtcbiAgICAgIHNsaWRlU2hvd1NsaWRlcy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBzbGlkZVNob3dTbGlkZXMuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICB0aGlzLnNsaWRlU2hvd0NvbnRhaW5lci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XG4gICAgfTtcblxuICAgIC8vQnVpbGQgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZSBzbGlkZXNob3dcbiAgICAvL0FkZCBjYXJkcyB0byBjb250YWluZXJcbiAgICBsZXQgc2xpZGVTaG93U2xpZGVzID0gdGhpcy5zbGlkZVNob3dDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmNhcmRzKSB7XG4gICAgICBsZXQgdGVtcCA9IGNhcmQ7XG4gICAgICBzbGlkZVNob3dTbGlkZXMuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRlbXApO1xuICAgICAgbmV3Q29udGFpbmVyU3R5bGVzKCk7XG4gICAgfVxuICAgIHNsaWRlU2hvd1NsaWRlcy5jbGFzc0xpc3QuYWRkKGAke3RoaXMud2luZG93U2l6ZX1gKTtcbiAgICByZXR1cm4gc2xpZGVTaG93U2xpZGVzO1xuICB9O1xuXG4gIHByaXZhdGUgbmV3QXJyb3dzTWFya3VwKCkge1xuICAgIC8vQWRkIGxlZnQgYW5kIHJpZ2h0IGJ1dHRvbnNcbiAgICBsZXQgc2xpZGVzaG93YnRucyA9IHRoaXMuc2xpZGVTaG93Q29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuXG4gICAgLy9MZWZ0IHNsaWRlc2hvdyBidG5cbiAgICBsZXQgcHJldmlvdXNzbGlkZXNob3didG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHByZXZpb3Vzc2xpZGVzaG93YnRuLmNsYXNzTGlzdC5hZGQoXCJzbGlkZXNob3dQcmV2XCIpO1xuICAgIHByZXZpb3Vzc2xpZGVzaG93YnRuLmlubmVyVGV4dCA9IFwi4p2uXCI7XG4gICAgc2xpZGVzaG93YnRucy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgcHJldmlvdXNzbGlkZXNob3didG4pO1xuXG4gICAgLy9VcGRhdGUgc2xpZGVzaG93IG9iamVjdFxuICAgIHRoaXMucHJldkJ0biA9IHByZXZpb3Vzc2xpZGVzaG93YnRuO1xuXG4gICAgLy9SaWdodCBzbGlkZXNob3cgYnRuXG4gICAgbGV0IG5leHRzbGlkZXNob3didG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5leHRzbGlkZXNob3didG4uY2xhc3NMaXN0LmFkZChcInNsaWRlc2hvd05leHRcIik7XG4gICAgbmV4dHNsaWRlc2hvd2J0bi5pbm5lclRleHQgPSBcIuKdr1wiO1xuICAgIHNsaWRlc2hvd2J0bnMuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG5leHRzbGlkZXNob3didG4pO1xuICAgIHNsaWRlc2hvd2J0bnMuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHNsaWRlc2hvd2J0bnMuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xuXG4gICAgLy9VcGRhdGUgc2xpZGVzaG93IG9iamVjdFxuICAgIHRoaXMubmV4dEJ0biA9IG5leHRzbGlkZXNob3didG47XG5cbiAgICByZXR1cm4gc2xpZGVzaG93YnRucztcbiAgfTtcblxuICBwcml2YXRlIG5ld051bWJlckVsZW1lbnQoKSB7XG4gICAgLy9OdW1iZXIgZWxlbWVudFxuICAgIHRoaXMubnVtYmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICB0aGlzLm51bWJlckFycm93VGV4dCgpO1xuICAgIHRoaXMubmV4dEJ0bi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmViZWdpblwiLCB0aGlzLm51bWJlckVsZW1lbnQpO1xuICAgIHRoaXMubnVtYmVyRWxlbWVudC5zdHlsZS53aGl0ZVNwYWNlID0gXCJub3dyYXBcIjtcbiAgICB0aGlzLm51bWJlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgIHRoaXMubnVtYmVyRWxlbWVudC5zdHlsZS5hbGlnbkNvbnRlbnQgPSBcImNlbnRlclwiO1xuICAgIHRoaXMubnVtYmVyRWxlbWVudC5zdHlsZS5tYXJnaW5JbmxpbmUgPSBcIjEuNXJlbVwiO1xuICB9O1xuXG4gIHByaXZhdGUgb25Jbml0U2V0dXBDYXJkUG9zaXRpb24oKXtcbiAgICBzd2l0Y2ggKHRoaXMud2luZG93U2l6ZSkge1xuICAgICAgY2FzZSBcIlNNQUxMXCI6XG4gICAgICAgIC8vc21hbGwgd2luZG93IHNpemUgbG9naWNcbiAgICAgICAgdGhpcy5jYXJkc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTgyLjVweClcIjtcbiAgICAgICAgdGhpcy5jYXJkc1sxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzWzFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTUVESVVNXCI6XG4gICAgICAgIC8vbWVkaXVtIHdpbmRvdyBzaXplIGxvZ2ljXG4gICAgICAgIHRoaXMuY2FyZHNbMF0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKC0xODIuNXB4KVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzFdLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzJdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbMl0uc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJMQVJHRVwiOlxuICAgICAgICAvL2xhcmdlIHdpbmRvdyBzaXplIGxvZ2ljXG4gICAgICAgIHRoaXMuY2FyZHNbMF0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKC0zNjVweClcIjtcbiAgICAgICAgdGhpcy5jYXJkc1sxXS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1syXS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1syXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMzY1cHgpXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbM10uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1szXS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbM10uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1szXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNjcmVlbiBzaXplIHByb3BlcnR5IG5vdCBzZXQgb24gc2xpZGVzaG93LlwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgY2xpZW50IHtcbiAgcHVibGljIG9sZFVSTCA9IGRvY3VtZW50LnJlZmVycmVyO1xuICBwdWJsaWMgYnJvd3NlcnBsYXRmb3JtOiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VyYWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcHVibGljIGNvbm5lY3Rpb250eXBlO1xuICBwdWJsaWMgY29ubmVjdGlvbnJ0dDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJyb3dzZXJwbGF0Zm9ybSA9IHRoaXMuc2V0YnJvd3NlcnBsYXRmb3JtKCk7XG4gICAgdGhpcy5jb25uZWN0aW9udHlwZSA9IHRoaXMuc2V0Y29ubmVjdGlvbnR5cGUoKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25ydHQgPSB0aGlzLnNldGNvbm5lY3Rpb25ydHQoKTtcbiAgfTtcblxuICBwcml2YXRlIHNldGJyb3dzZXJwbGF0Zm9ybSgpIHtcbiAgICBpZiAoXCJ1c2VyQWdlbnREYXRhXCIgaW4gd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgLy91c2VyQWdlbnREYXRhIGlzIE5hdmlnYXRvclVBRGF0YSB0eXBlLCBub3QgZm91bmQgaW4gVHlwZVNjcmlwdC5cbiAgICAgIC8vS25vd24gdG8gRWRnZSBicm93c2VyOiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnREYXRhKVxuICAgICAgbGV0IHVzZXJBZ2VudERhdGE6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50RGF0YSBhcyBvYmplY3Q7XG4gICAgICBsZXQgcGxhdGZvcm1kYXRhOiBzdHJpbmcgPSA8c3RyaW5nPnVzZXJBZ2VudERhdGEucGxhdGZvcm07XG4gICAgICByZXR1cm4gcGxhdGZvcm1kYXRhO1xuICAgIH0gZWxzZSB0aGlzLmJyb3dzZXJwbGF0Zm9ybSA9IFwiXCI7XG4gIH07XG5cbiAgcHJpdmF0ZSBzZXRjb25uZWN0aW9udHlwZSgpIHtcbiAgICBpZiAoXCJjb25uZWN0aW9uXCIgaW4gd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgLy9jb25uZWN0aW9uIGlzIE5ldHdvcmtJbmZvcm1hdGlvbiB0eXBlLCBub3QgZm91bmQgaW4gVHlwZVNjcmlwdC5cbiAgICAgIC8vS25vd24gdG8gRWRnZSBicm93c2VyOiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci5jb25uZWN0aW9uKVxuICAgICAgbGV0IGNvbm5lY3Rpb246IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbiBhcyBvYmplY3Q7XG4gICAgICBsZXQgZWZmZWN0aXZldHlwZTogc3RyaW5nID0gPHN0cmluZz5jb25uZWN0aW9uLmVmZmVjdGl2ZVR5cGU7XG4gICAgICByZXR1cm4gZWZmZWN0aXZldHlwZTtcbiAgICB9IGVsc2UgdGhpcy5jb25uZWN0aW9udHlwZSA9IFwiXCI7XG4gIH07XG5cbiAgcHJpdmF0ZSBzZXRjb25uZWN0aW9ucnR0KCkge1xuICAgIGlmIChcImNvbm5lY3Rpb25cIiBpbiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICBsZXQgY29ubmVjdGlvbjogYW55ID0gd2luZG93Lm5hdmlnYXRvci5jb25uZWN0aW9uIGFzIG9iamVjdDtcbiAgICAgIGxldCBydHQ6IHN0cmluZyA9IDxzdHJpbmc+Y29ubmVjdGlvbi5ydHQ7XG4gICAgICByZXR1cm4gcnR0O1xuICAgIH0gZWxzZSB0aGlzLmNvbm5lY3Rpb25ydHQgPSBcIlwiO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgYXBpR0VUIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCBmcm9tIFwiLi9kaWN0aW9uYXJ5U2VhcmNoTWFya3VwXCI7XG5pbXBvcnQgUndiRXJyb3IgZnJvbSBcIi4vcndiRXJyb3JCdXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IFJXQlN0cmluZ2lmeUpTT04gfSBmcm9tIFwiLi9yd2JKc29uQ29udmVydGVyXCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoIGlzIGEgc2V0IG9mIG1hcmt1cCBjcmVhdGlvbiBhbmQgZnVuY3Rpb25zIHdoaWNoIGFsbG93IGEgdXNlclxuICogIHRvIGxvb2sgdXAgYSB3b3JkIGxpa2UgYSBEaWN0aW9uYXJ5LiBXaGVuIGNhbGxlZCwgdGhlIHVzZXIncyBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAqICBhcyBhbiBhY2NlcHRhYmxlIHdvcmQgb3IgaXQgZGVjbGluZXMgdGhlIHJlcXVlc3QsIHRoZW4gc2hvd2luZyB0aGUgdXNlciBpZiB0aGUgd29yZFxuICogIGlzIGFjY2VwdGFibGUuXG4gKlxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICoga25vd24gcGxhY2VtZW50IGxvY2F0aW9uKSB0aGF0IGNvbnRhaW5zIHRoZSAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3MuXG4gKlxuICogICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAqXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaCBleHRlbmRzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkW107XG4gIHByaXZhdGUgc3RhdGljIENhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0OiBzdHJpbmcgPSBcIlJXQl93b3JkX2ZldGNoXCI7XG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RVcmw6IHN0cmluZyA9IFwiaHR0cHM6Ly9hcGkuZGljdGlvbmFyeWFwaS5kZXYvYXBpL3YyL2VudHJpZXMvZW4vXCI7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd29yZFVSTDogVVJMO1xuICBwcml2YXRlIHdvcmREYXRhOiBvYmplY3Q7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgY3JlYXRlcyBhbGwgdGhlIGZ1bmN0aW9uYWxpdHkgYW5kIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICAgKiAgRGljdGlvbmFyeSBTZWFyY2ggd2lkZ2V0IGludGVyZmFjZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW52b2tlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuXG4gICAgc3VwZXIoZWxlbSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgLy9Jbml0aWFsaXplIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuYWRkV2lkZ2V0RXZlbnRzKCk7XG4gICAgLy9TdG9yZSB3b3JkcyBjYWNoZSBkYXRhIHdpdGggaW5pdGlhbGl6YXRpb24uXG4gICAgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9IERpY3Rpb25hcnlTZWFyY2guZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgIERpY3Rpb25hcnlTZWFyY2guY291bnQrKztcbiAgfTtcblxuICAvKipcbiAgICogUmV0cmlldmUgTG9jYWwgU3RvcmFnZSB3b3JkcyBwcmV2aW91c2x5IHN0b3JlZCB3aXRoIHRoZSBEaWN0aW9uYXJ5IFNlYXJjaCBXaWRnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgLSB0aGVzZSBhcmUgdGhlIHdvcmRzIHN0b3JlZCBwcmV2aW91c2x5IGluIHRoZVxuICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAvL0xvY2FsIFN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtcyBkYXRhIGFzc2lnbm1lbnRcbiAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VTdHI6IHN0cmluZztcbiAgICBpZiAoUndiRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJEaWN0aW9uYXJ5U2VhcmNoXCIsIFwid29yZC1jYWNoZXNcIiwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIC8vVGhlIExvY2FsIFN0b3JhZ2UgaXMgbnVsbCBvciBlbXB0eS0tPiBDb25maXJtIGhlcmUgdGhlIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBhbnkgQ2FjaGUgU3RvcmFnZSBpdGVtcyBpbiBlcnJvclxuICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgIGlmICh3aW5kb3cuY2FjaGVzLmhhcyhEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KSkge1xuICAgICAgICAgIHdpbmRvdy5jYWNoZXMuZGVsZXRlKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgLy9jaGVjayB0aGUgd29yZC1jYWNoZSB2YWx1ZSBmb3IgY29ycmVjdCBqc29uIHBhcnNpbmdcbiAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKHN0b3JhZ2VTdHIpKTtcbiAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCxcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICB0aGlzLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNldGVzdC5yZXR1cm5vYmo7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZFVSTFxuICAgKi9cbiAgcHVibGljIGdldFdvcmRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZFVSTDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIGZldGNoZWQgd29yZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmREYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZERhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xpY2sgYW5kIGtleXByZXNzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgd2lkZ2V0LiBJbnB1dCBldmVudCBsaXN0ZW5lcnMgJ2NsaWNrJ1xuICAgKiAgYW5kICdrZXlwcmVzcycgYXdhaXQgZm9yIGEgc2VhcmNoIGNhbGwuIEFsc28sIHNob3VsZCBhIHVzZXIgd2FudCB0byBzZWFyY2ggYVxuICAgKiAgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLCB0aGUgd2lkZ2V0IGFkYXB0cyBtYXJrdXAgZm9yIHRoYXQgcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgYWRkV2lkZ2V0RXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgY29uc3QgaGlkZVByZXZpb3VzUGFuZWwgPSAoKSA9PiB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy9VcG9uIGlucHV0IGVudHJ5LCBmaXJlIEFQSSBmZXRjaFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkgaGlkZVByZXZpb3VzUGFuZWwoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkgaGlkZVByZXZpb3VzUGFuZWwoKTtcbiAgICB9KTtcblxuICAgIC8vXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAvL0NsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKTtcbiAgICB9KTtcblxuICAgIC8vXCJSZWZyZXNoXCIgYnV0dG9uIHJlbG9hZHMgdGhlIHBhZ2VcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIGNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpIHtcbiAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyO1xuXG4gICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0b3IgYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICBpZiAocGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPT0gbnVsbCB8fCBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIGlmICghdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkKSB7XG4gICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSBcIlByZXZpb3VzIHdvcmRzIG5vdCBmb3VuZC4gVGhlIGNhY2hlIGlzIGVtcHR5LlwiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucyh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkLCBidXR0b25Db250YWluZXIpO1xuICB9O1xuXG4gIHByaXZhdGUgY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucyhwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYW55LCBidXR0b25Db250YWluZXI6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgaWYgKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcHJldmlvdXN3b3JkYnV0dG9uczogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzW10gPVxuICAgICAgdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRTZWFyY2hlc0VsZW1lbnRzKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UsIGJ1dHRvbkNvbnRhaW5lcik7XG4gICAgZm9yIChsZXQgYnRuIG9mIHByZXZpb3Vzd29yZGJ1dHRvbnMpIHtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBidXR0b24uXG4gICAgICAvL3RoaXMgaXMgdGhlIGNhY2hlZCB3b3JkIGJ1dHRlbi4gd2hlbiBpdCdzIGNsaWNrZWQsIGZpcmUgYSB3b3JkIHNlYXJjaFxuICAgICAgYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgdHJ1ZSwgYnRuLndvcmQpO1xuICAgICAgfSk7XG4gICAgICAvL01PQklMRVxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsICgpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUub3BhY2l0eSA9IFwiNTAlO1wiO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvL3doZW4gZm9jdXMgKHN1Y2ggYXMgdXNpbmcga2V5Ym9hcmQgb25seSksIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b25cbiAgICAgIGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKGU6IGFueSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgIH0pO1xuICAgICAgLy93aGVuIG5vdCBmb2N1c2VkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSk7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHdvcmQgdG8gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGNvbnRhaW5pbmcgd29yZCBkYXRhLCBVUkwsIGFuZCBjYWNoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdldmFsdWUgLSBUaGlzIGludGVyZmFjZSBzdG9yZXMgaW5mb3JtYXRpb24gd2hlcmUgc2VuZGluZyB0byBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXZhbHVlOiBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgLy9Mb2cgdGhlIHdvcmQgY2FjaGUgY3JlYXRpb25cbiAgICBjb25zdCBhZGRlZHdvcmRjYWNoZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjQWRkZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkfWAsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmN5YW47XCJcbiAgICAgICk7XG4gICAgfTtcbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldmFsdWUnIG5lZWRzIGFkZGVkIHRvIGxvY2FsIHN0b3JhZ2UgY2FjaGVcbiAgICAvL0xvY2FsIHN0b3JhZ2UgbWF5IGJlIGVtcHR5IG9yIGFscmVhZHkgaGF2aW5nIHRoZSB3YW50ZWQgc2VhcmNoZWQgd29yZFxuICAgIC8vQ2hlY2sgc3RvcmFnZSBpcyBub3QgbnVsbC4gSWYgaXQgaXMsIGFkZCB0aGUgd29yZC5cbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoUndiRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJEaWN0aW9uYXJ5U2VhcmNoXCIsIFwid29yZC1jYWNoZXNcIiwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgICAvL0FkZCB0aGUgc3RvcmFnZSB3b3JkIHRvIGFuIGFycmF5XG4gICAgICAgIGxldCB3b3JkU3RvcmU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IFtdO1xuICAgICAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG4gICAgICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgIGxldCBzdHJpbmdpZnl0ZXN0c2luZ2xld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04od29yZFN0b3JlKSk7XG4gICAgICAgIGlmICghc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQucGFzc2VkKSB7XG4gICAgICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGpzb25zdHIgPSBzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5yZXR1cm5zdHI7XG5cbiAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBpcyBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBqc29uc3RyKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYCVjPFJXQj4lY0NyZWF0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCxcbiAgICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICAgKTtcbiAgICAgICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vTG9jYWwgc3RvcmFnZSBpcyBub3QgZW1wdHkuIEhlcmUsIHdlIG5lZWQgdG8gYWRkIHRoZSB3b3JkIHRvIHRoZSBleGlzdGluZyB3b3JkIGNhY2hlLlxuICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZFtdID0gRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZTtcbiAgICBsZXQganNvbnN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vTWF0Y2ggdGhlIGN1cnJlbnQgVVJMIGZvciBjYWNoZSBtYW5hZ2VtZW50XG4gICAgZm9yIChsZXQgY2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgIGlmIChjYWNoZS53b3JkVVJMID09IGxvY2Fsc3RvcmFnZXZhbHVlLndvcmRVUkwpIHtcbiAgICAgICAgLy9Xb3JkIGlzIGFscmVhZHkgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICAvL05vIG5lZWQgdG8gYWRkIGl0IHRvIHRoZSBhcnJheVxuICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICAvL0FkZCB3b3JkIHRvIGV4aXN0aW5nICd3b3JkLWNhY2hlcycgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGFsbGNhY2hlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuXG4gICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICBsZXQgc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKGFsbGNhY2hlKSk7XG4gICAgaWYgKCFzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZC5wYXNzZWQpIHtcbiAgICAgIC8vc3RyaW5naWZ5IG9iamVjdCBkaWQgbm90IHdvcmssIHNvIHJldHVyblxuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGpzb25zdHIgPSBzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZC5yZXR1cm5zdHI7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIGpzb25zdHIpO1xuICAgIGFkZGVkd29yZGNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHByZXZpb3VzIHdvcmQgZGF0YSBmcm9tIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIC0tPiBLZXkvVmFsdWVcbiAgICogZGF0YSByZWZlcmVuY2luZyB3b3JkcyBzdG9yZWQgaW4gbG9jYWwgY2FjaGUuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V3b3JkIC0gc3RyaW5nIGZyb20gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCIgYnV0dG9uXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V3b3JkOiBzdHJpbmcpIHtcbiAgICAvL1JlbW92ZSB0aGUgY2FjaGUgaXRlbSB0byBMb2NhbCBTdG9yYWdlLCBDYWNoZSBTdG9yYWdlXG4gICAgLy9DaGVjayBsb2NhbCBzdG9yYWdlIGlzIG5vdCBudWxsIG9yIGVtcHR5XG4gICAgaWYgKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vR2V0IHRoZSB3b3JkcyBhcnJheSBmcm9tIExvY2FsIFN0b3JhZ2VcbiAgICAvL1JXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoXCJEaWN0aW9uYXJ5V2lkZ2V0XCIsIFwid29yZC1jYWNoZXNcIik7IC8vbG9nIHdoZXRoZXIgZmV0Y2hlZCB3b3JkIGNhY2hlIGlzIG51bGwgb3IgZW1wdHkuXG4gICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuXG4gICAgLy9SZW1vdmUgdGhlIHdvcmQgZnJvbSBDYWNoZSBTdG9yYWdlIGFuZCBMb2NhbCBTdG9yYWdlIHdvcmQgYXJyYXlcbiAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgIGlmICh3b3JkQ2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZENhY2hlLndvcmRVUkwpO1xuICAgICAgICBhbGxjYWNoZS5zcGxpY2UoYWxsY2FjaGUuaW5kZXhPZih3b3JkQ2FjaGUpLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V3b3JkfWAsXG4gICAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICAgIFwiY29sb3I6ZGFya2N5YW47XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbGNhY2hlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAvL1RoZSByZW1vdmVkIHdvcmQgd2FzIHRoZSBsYXN0IHdvcmQgaW4gdGhlIGFycmF5LCBzbyByZW1vdmUgdGhlIGNvbnRhaW5lclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLFxuICAgICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHdvcmRjYWNoZXNzdHJmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKGFsbGNhY2hlKSk7XG4gICAgaWYgKCF3b3JkY2FjaGVzc3RyZnl0ZXN0LnBhc3NlZCkge1xuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9SZXR1cm4gcmVtYWluaW5nIHdvcmRzIHRvIExvY2FsIFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIHdvcmRjYWNoZXNzdHJmeXRlc3QucmV0dXJuc3RyKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmV0Y2ggcmVxdWVzdCBmcm9tIENhY2hlIFN0b3JhZ2UuIFV0aWxpemVzXG4gICAqIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QgZm9yIGNhY2hlIG5hbWUuXG4gICAqIEBwYXJhbSByZW1vdmVVUkxcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2UocmVtb3ZlVVJMOiBVUkwpIHtcbiAgICB3aW5kb3cuY2FjaGVzLm9wZW4oRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCkudGhlbihjYWNoZSA9PiB7XG4gICAgICBjYWNoZXMubWF0Y2gocmVtb3ZlVVJMKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBtYXRjaGluZyB0aGUgcmVzdWx0LiBSZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUocmVzdWx0KSk7XG4gICAgICAgICAgY2FjaGVQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FjaGUuZGVsZXRlKHJlbW92ZVVSTCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGR5bmFtaWNhbGx5IHJlY2FsbHMgYSB3b3JkIGRlZmluaXRpb24gcmVxdWVzdCBhbmQgaW5zdGFudGlhdGVzIGFwaUdFVCgpLiBUaGVcbiAgICogcmV0dXJuZWQgcHJvbWlzZSBhbHNvIGR5bWFuaWNhbGx5IGFuc3dlcnMgdGhlIHdpZGdldCBtYXJrdXAuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgc2VhcmNoZWQgZnJvbSB3aWRnZXQgaW5wdXQuXG4gICAqIEBwYXJhbSB3b3JkVXJsIC0gVGhlIGZldGNoIHJlcXVlc3QgVVJMLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHNlbmRUb0NhY2hlIC0gPyBTZW5kIGZldGNoIHJlcXVlc3QgdG8gQ2FjaGUgU3RvcmFnZSA6IEZldGNoIHdpdGhvdXQgc3RvcmluZyB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIGNhY2hlTmFtZSAtIElmIHNlbmRpbmcgZmV0Y2ggcmVxdWVzdHMgdG8gY2FjaGUsIHByb3ZpZGUgYSBuYW1lIHRvIHN0b3JlIGl0IHVuZGVyLlxuICAgKiBAcmV0dXJucyAtIHdvcmREYXRhOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwcml2YXRlIGZldGNoRGljdGlvbmFyeVRlcm0oXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVcmw6IFVSTCxcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIHNlbmRUb0NhY2hlOiBib29sZWFuLFxuICAgIGNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICAvL0EgZnVuY3Rpb24gY2FsbCBwYXJhbWV0ZXIgb3B0aW9uIGlzIHRvIHN0b3JlIHRoZSB3b3JkIHJlcXVlc3QgaW4gYnJvd3NlcidzIENhY2hlIFN0b3JhZ2VcbiAgICAvL1N0cnVjdHVyZSB0aGUgd29yZCBkYXRhIHZpYSAnbG9jYWxzdG9yYWdld29yZHZhbHVlJyBpbnRlcmZhY2UgdXNlZCB0aHJvdWdob3V0IGZldGNoaW5nXG4gICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZCA9IHtcbiAgICAgIGluQ2FjaGU6IHNlbmRUb0NhY2hlLFxuICAgICAgd29yZDogd29yZCxcbiAgICAgIHdvcmRVUkw6IHdvcmRVcmwsXG4gICAgICBjYWNoZU5hbWU6IHNlbmRUb0NhY2hlID8gY2FjaGVOYW1lIDogXCJcIixcbiAgICB9O1xuXG4gICAgLy9Bc3luY2hyb25vdXMgZmV0Y2ggcmVxZXVzdCBhbmQgZHluYW1pYyBtYXJrdXAgY3JlYXRpb24gZnJvbSB0aGUgZGF0YSdzIHJldHVyblxuICAgIGNvbnN0IHdvcmRGZXRjaFJlcXVlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgICAvL0NhbGwgYXBpR0VUKCkgb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICBjb25zdCB3b3JkRmV0Y2ggPSBuZXcgYXBpR0VUKFxuICAgICAgICB3b3JkY2FjaGUud29yZFVSTCxcbiAgICAgICAgd29yZGNhY2hlLmluQ2FjaGUsXG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbSxcbiAgICAgICAgd29yZGNhY2hlLmNhY2hlTmFtZVxuICAgICAgKTtcbiAgICAgIGxldCBub0RlZmluaXRpb25zOiBib29sZWFuO1xuXG4gICAgICAvL0ZldGNoIHJlcXVlc3QgbWV0aG9kIGNhbGwuIFJldHVybmVkIGRhdGEgbWF5IGJlIHRoZSB3b3JkIGRlZmluaXRpb25cbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd29yZEZldGNoLmFwaUdldCh3b3JkRmV0Y2guZ2V0R2V0VXJsKCkpO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy9JZiB0aGUgcmV0dXJuZWQgZGF0YSBpcyBhIHN0cmluZywgaXQgaXMgdGhlIHdvcmQgZGVmaW5pdGlvbiBkYXRhLlxuICAgICAgICBub0RlZmluaXRpb25zID0gZmFsc2U7XG4gICAgICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04oZGF0YSkpO1xuICAgICAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHBhcnNldGVzdC5yZXR1cm5vYmo7XG4gICAgICB9XG4gICAgICBsZXQgd29yZERhdGE6IGFueSA9IGRhdGE7XG4gICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGFuIG9iamVjdCwgY29uZmlybSBpdCBpcyAnbm8gZGVmaW5pdGlvbicgc2VydmVyIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICAgICAgLy9ObyBkZWZpbml0aW9ucyB3ZXJlIGZvdW5kIHdoZW4gZGF0YSBpcyBhbiBvYmplY3Qgd2l0aCBhIHRpdGxlIHByb3BlcnR5XG4gICAgICAgICAgLy93b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCJcbiAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiICYmIHdvcmRjYWNoZS5pbkNhY2hlID09IHRydWUpIHtcbiAgICAgICAgICAgIC8vVGhlIGRhdGEgc3RyZWFtIGhlcmUgaXMgd2l0aG91dCB3b3JkIGRhdGEuIFRoaXMgZnVuY3Rpb24gYXdhaXRzIHRoZSBhcGkgZmV0Y2gncyBkYXRhXG4gICAgICAgICAgICAvL3RvIGNvbXBsZXRlIHN0b3JhZ2UvcHJvbWlzZSByZXR1cm5zLiBJdCB3YWl0cyA1IHNlY29uZHMgZm9yIHRoZSBicm93c2VyIHRvIGNvbXBsZXRlIGl0cyBzdG9yZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIC8vdGhlbiByZW1vdmVzIHRoZSB1bndhbnRlZCBjYWNoZSByZXF1ZXN0LlxuICAgICAgICAgICAgLy9UT0RPOkJVR1JFU0VBUkNIPT5EdXJpbmcgdGhlIDUgdGltZW91dCwgaWYgdGhlIHBhZ2UgcmVmcmVzaGVzIGEgJ2JhZCB3b3JkJyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgIC8vVGhpcyAnYmFkIHdvcmQnIGNhbiBiZSByZW1vdmVkIGJ5IGRlbGV0aW5nIGFsbCBwcmV2aW91cyB3b3JkcyB2aWEgVUkgYW5kIHJlZnJlc2hpbmcgdGhlIHBhZ2UuIFRoaXMgd2lsbFxuICAgICAgICAgICAgLy8gZmlyZSBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkgdG8gY2xlYXIgYW55IG1pc21hdGNoZWQgd29yZGRhdGE8LS0+Y2FjaGVkcmVxdWVzdHMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9GdW5jdGlvbiBhd2FpdGluZyByZXF1ZXN0J3MgQ2FjaGUgU3RvcmFnZSBjYWNoaW5nXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkRmV0Y2guZ2V0R2V0VXJsKCkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZW1vdmUgZnJvbSBDYWNoZSBTdG9yYWdlLiBOYW1lOiBcIiwgd29yZEZldGNoLmdldEdldFVybCgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQgfHwgbm9EZWZpbml0aW9ucykge1xuICAgICAgICAvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICAvLydCYWQgZGF0YScgZHVlIHRvIFwiTm8gZGVmaW5pdGlvbnMgZm91bmRcIiwgaW52YWxpZCB3b3JkLCBiYWQgbmV0d29yayBjb25uZWN0aW9uXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm9uTGluZSkge1xuICAgICAgICAgIC8vT25saW5lLCBwcm9ibGVtIHdpdGggZmV0Y2hcbiAgICAgICAgICAvL09mZmxpbmUgcmVxdWVzdFxuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAvL1NlcnZlciByZXR1cm5lZCBubyBkZWZpbml0aW9ucyBkYXRhXG4gICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCI7XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgbGV0IHdvcmREYXRhID0gd29yZEZldGNoUmVxdWVzdCgpO1xuICAgIHJldHVybiB3b3JkRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogVXNlciBpbnB1dCB2YWxpZGF0aW9uIGZ1bmN0aW9uIHRlc3RzIHRoZSBpbnB1dCBzdHJpbmcgYWdhaW5zdCBhIHZhbGlkIFJlZ3VsYXIgRXhwcmVzc2lvbi5cbiAgICpcbiAgICogICAgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKVxuICAgKlxuICAgKiBAcGFyYW0gaW50eHQgLSBTdHJpbmcgdmFsdWUgcmVjZWl2ZWQgZnJvbSB1c2VyIGZpZWxkIGlucHV0LlxuICAgKiBAcmV0dXJucyBBY2NlcHRhYmxlIHVzZXIgaW5wdXQ6IHRydWUgb3IgZmFsc2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRWYWxpZGF0aW9uKGludHh0OiBzdHJpbmcpIHtcbiAgICBsZXQgdHJpbW1lZCA9IGludHh0LnRyaW0oKTtcbiAgICBsZXQgbGV0dGVyc1JFID0gbmV3IFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIik7XG4gICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy93b3JkIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHdvcmQuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybSBhd2FpdHMgYSBwcm9taXNlLCBmZXRjaGluZyBhIGRpY3Rpb25hcnkgdGVybS4gVGhlIGRhdGFcbiAgICogaW5ncmVzcyBjYWxscyBtYXJrdXAgY3JlYXRpb24gZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHRvIGJlIGZldGNoZWQuXG4gICAqIEBwYXJhbSB3b3JkVVJMIC0gQSBVUkwgY29tcG9zaW5nIHRoZSBmdWxsIHVybCBvZiB0aGUgZmV0Y2ggcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgd29yZDogc3RyaW5nLCB3b3JkVVJMOiBVUkwpIHtcbiAgICAvLyBXaGVuIHRoZSB3b3JkIGRhdGEgcmVzb2x2ZXMsIGNhbGwgbWFya3VwIGZ1bmN0aW9uc1xuICAgIGxldCB3b3JkRGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlc29sdmUoXG4gICAgICAgIHRoaXMuZmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICAgICAgICB3b3JkLFxuICAgICAgICAgIHdvcmRVUkwsXG4gICAgICAgICAgc2VhcmNoRWxlbXMsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gICAgd29yZERhdGFQcm9taXNlLnRoZW4oKGRhdGE6IG9iamVjdCkgPT4ge1xuICAgICAgdGhpcy53b3JkRGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cChkYXRhLCBzZWFyY2hFbGVtcyk7XG4gICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQgfHwgT2JqZWN0Lmhhc093bihkYXRhLCBcInRpdGxlXCIpKSByZXR1cm47XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmV0cmlldmVkIHdvcmQ6ICR7d29yZH1gLCBcImNvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIiwgXCJjb2xvcjpnb2xkO1wiKTtcbiAgICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBjbGFzc2VzIGlmIGFwcGxpZWQgcHJldmlvdXNseVxuICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHdvcmRTZWFyY2goKSBiZWdpbnMgYSB3b3JkIHNlYXJjaCByZXF1ZXN0LiBUaGUgdXNlciBpbnB1dCBsaXN0ZW5lciBjaG9vc2VzXG4gICAqIHdoZXRoZXIgdGhlIGZldGNoIGlzIGNhbGxlZCBmcm9tIGNhY2hlIG9yIGlzIG5ldy5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBpc0Zyb21QcmV2aW91c1dvcmRzIC0gVHJ1ZSBpZiB0aGUgdXNlciByZXF1ZXN0ZWQgYSBzZWFyY2ggZnJvbSBhIHByZXZpb3VzIHdvcmQsIHRvIGNhbGwgZGF0YSBmcm9tIEJyb3dzZXIgQ2FjaGUuXG4gICAqIEBwYXJhbSBjYWNoZWRXb3JkIC0gSWYgdGhlIHVzZXIgY2FsbGVkIGZvciBhIHByZXZpb3VzIHdvcmQsIGNhY2hlZFdvcmQgaXMgd2l0aGluIHRoZSBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkU2VhcmNoKFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsXG4gICAgaXNGcm9tUHJldmlvdXNXb3JkczogYm9vbGVhbixcbiAgICBjYWNoZWRXb3JkOiBsb2NhbHN0b3JhZ2V3b3JkIHwgbnVsbFxuICApIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgY2FjaGVkV29yZC53b3JkLCBjYWNoZWRXb3JkLndvcmRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5U2VhcmNoLnJlcXVlc3RVcmwpO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCB0aGlzLndvcmRVUkwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSBcIlwiOyAvLyByZXNldCBpbnB1dCBzdHJpbmdcbiAgfTtcblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IGlzIG1hZGUgdG8gY3JlYXRlIHRoZSBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAqICBEaWN0aW9uYXJ5IFNlYXJjaC4gRWxlbWVudHMgYXJlIGNyZWF0ZWQgYW5kIGFwcGVuZGVkIHRvIHRoZSBwYWdlIHRvIHRoZSBjbGFzc1xuICogICdkaWN0aW9uYXJ5V2lkZ2V0J1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIHtcbiAgcHVibGljIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHM7XG5cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vaW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIGlmIChlbGVtID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coYCVjVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmAsIFwiY29sb3I6IG9yYW5nZTtcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJkaWN0aW9uYXJ5V2lkZ2V0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQWRkIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcmltYXJ5IHdpZGdldCBtYXJrdXAgc3RydWN0dXJpbmcgdGhlIHdpZGdldCBlbGVtZW50cyBhbmQgc2VhcmNoIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCBiZWZvcmUgdGhlIHdpZGdldC5cbiAgICogQHJldHVybnMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyAtLT4gaW50ZXJmYWNlIG9mXG4gICAqICBpbXBvcnRhbnQgSFRNTCBlbGVtZW50cyB1c2VkIHRocm91Z2ggd2lkZ2V0IGZ1bmN0aW9uLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbTogRWxlbWVudCkge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICBpZiAoZGljdGlvbmFyeSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBkZXRlcm1pbmVkIGRpY3Rpb25hcnkgZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIHdpZGdldCBlbGVtZW50c1xuICAgIGNvbnN0IGFydEggPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xuICAgIGNvbnN0IHByZXZpb3VzV29yZHMgPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuXG4gICAgLy8gUmV0dXJuIGVsZW1lbnRzIHVzZWQgaW4gbGF0ZXIgZnVuY3Rpb25zXG4gICAgbGV0IHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgPSB7XG4gICAgICBzZWFyY2hXb3JkOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSksXG4gICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKSxcbiAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgIHByZXZpb3VzV29yZHNDb250YWluZXI6IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSksXG4gICAgICByZWZyZXNoQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgIH07XG5cbiAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInNlYXJjaFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiU2VhcmNoLi4uXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJTZWFyY2hcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmlkID0gXCJ3b3JkLXNlYXJjaFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5pbm5lclRleHQgPSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZHNDb250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgIGRpY3Rpb25hcnkuaWQgPSBcImRpY3Rpb25hcnlcIjtcbiAgICBzZWFyY2hGb3JtLmlkID0gXCJkaWN0aW9uYXJ5LXNlYXJjaFwiO1xuICAgIHNlYXJjaEZvcm0uYWN0aW9uID0gXCJpbmRleC5odG1sXCI7XG4gICAgYXJ0SC50ZXh0Q29udGVudCA9IFwiRGljdGlvbmFyeSBUZXJtOlwiO1xuXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cyA9IHNlYXJjaEVsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtYXJrdXAgdG8gaG91c2UgcmV0dXJuZWQgd29yZHMgZnJvbSBEaWN0aW9uYXJ5U2VhcmNoLiBUaGUgbWFya3VwXG4gICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAqICBhZGFwdGl2ZSB0byByZXR1cm5lZCB3b3JkIGRhdGEgc3RydWN0dXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHdvcmREYXRhIC0gVGhpcyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IG9mIHdvcmQgdHlwZXMsIGRlZmluaXRpb25zLCBhbmQgZXhhbXBsZXMuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cCh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzKSB7XG4gICAgaWYgKHdvcmREYXRhID09IG51bGwgfHwgISh3b3JkRGF0YSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgXCJ0aXRsZVwiKSkge1xuICAgICAgY29uc29sZS5sb2coXCIlY1RoZXJlIGlzIG5vIGRlZmluaXRpb24gZm9yIHRoaXMgd29yZC5cIiwgXCJjb2xvcjpkYXJrZ3JlZW47XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCB3b3JkIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgKTtcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7IC8vIHdvcmQgZGVmaW5pdGlvbiBzZXBhcmF0b3JcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcblxuICAgIC8vIFRoZSB3b3JkIGRhdGEgcmVwcmVzZW50cyBjb21wbGV4IEpTT04gb2JqZWN0XG4gICAgLy8gUmVjdXJzZSB0aGUgd29yZCBkYXRhIG9iamVjdCwgYWRkaW5nIGVsZW1lbnRzIGZyb20gdGhlIHZhcmlvdXMgbGV2ZWxzXG4gICAgd29yZERhdGEubWFwKCh3b3JkOiBhbnkpID0+IHtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJ3b3JkXCIsIHdvcmQud29yZCk7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIHdvcmQgaXM6IFwiLHdvcmQpXG4gICAgICBjb25zdCB3b3JkVGl0bGUgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgIHdvcmRUaXRsZS50ZXh0Q29udGVudCA9IHdvcmQud29yZDtcbiAgICAgIC8vQWRkIHRoZSB3b3JkIGFuZCBleGFtcGxlcyB0byBwYWdlXG4gICAgICB3b3JkLm1lYW5pbmdzLm1hcCgod29yZFR5cGU6IGFueSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiV29yZFR5cGUgYXJlOiBcIiwgd29yZFR5cGUpXG4gICAgICAgIGNvbnN0IHdvcmRUeXBlSCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIikpO1xuICAgICAgICBjb25zdCB3b3JkVHlwZUxpc3QgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpKTtcbiAgICAgICAgd29yZFR5cGVILnRleHRDb250ZW50ID0gd29yZFR5cGUucGFydE9mU3BlZWNoO1xuICAgICAgICB3b3JkVHlwZS5kZWZpbml0aW9ucy5tYXAoKGRlZjogYW55KSA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xuICAgICAgICAgIGxldCB3b3JkVHlwZURlZkl0ZW0gPSB3b3JkVHlwZUxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpKTtcbiAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpO1xuXG4gICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb25zIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vY3JlYXRlIGNsZWFyIGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ3b3JkLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBob3ZlcmVkLCBkaXNwbGF5IGl0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZXZlbnQgPT4ge1xuICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCIxMDAlXCI7XG4gICAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIG5vdCBob3ZlcmVkLCBoaWRlIGl0XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCI1MCVcIjtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBjbGlja2VkLCBjbGVhciB0aGUgZWxlbWVudHNcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHdvcmQ6ICR7ZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmdldEF0dHJpYnV0ZShcIndvcmRcIil9YCxcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7XCJcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjbGVhciBidXR0b24gdG8gd2lkZ2V0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gIH07XG5cbiAgcHVibGljIGNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMoXG4gICAgd29yZHN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXSxcbiAgICBidXR0b25Db250YWluZXI6IEhUTUxEaXZFbGVtZW50XG4gICkge1xuICAgIGxldCBidXR0b25zYXJyOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9IFtdO1xuXG4gICAgLy9CZWNhdXNlIHRoZSBsb2NhdG9yIGFuZCB0aGUgTG9jYWwgU3RvcmFnZSB2YWx1ZXMgYXJlIHZpYWJsZSwgY3JlYXRlIHRoZSBtYXJrdXBcbiAgICAvL25lZWRlZCB0byBkaXNwbGF5IHRob3NlIHdvcmRzLiBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aWRnZXQgZnVuY3Rpb25hbGl0eS5cbiAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2Ygd29yZHN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lciA9IGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID0gd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgY29uc3QgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICk7XG4gICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uLWNsZWFyXCIpO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gd29yZENhY2hlLndvcmQ7XG5cbiAgICAgIGxldCBwcmV2aW91c3dvcmRidG46IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyA9IHtcbiAgICAgICAgd29yZDogd29yZENhY2hlLFxuICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbTogY2FjaGVXb3JkSGVhZGluZ0VsZW0sXG4gICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcjogd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLFxuICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbTogZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0sXG4gICAgICB9O1xuICAgICAgYnV0dG9uc2Fyci5wdXNoKHByZXZpb3Vzd29yZGJ0bik7XG4gICAgfVxuICAgIHJldHVybiBidXR0b25zYXJyO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKiogVGhpcyBvYmplY3QgY3JlYXRlcyBhbiBhcnJheSBvZiBkaXYgZWxlbWVudHMgZnJvbSBwb3J0IG51bWJlciBpbmZvcm1hdGlvbiovXG5leHBvcnQgY2xhc3MgRmxhc2hjYXJkQ2FyZEVsZW1zIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygd2lkZ2V0IG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgd2lkZ2V0Y291bnQ6IG51bWJlciA9IDA7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgd2l0aGluIHRoZSB3aWRnZXQgaW5zdGFudGlhdGVkIFtmbGFzaGNhcmRzXSAqL1xuICBwdWJsaWMgc3RhdGljIHRvdGFsZmxhc2hjYXJkczogbnVtYmVyID0gMDtcbiAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gIHB1YmxpYyBmbGFzaGNhcmRzY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbV9wb3J0SW5mb01hcDogTWFwPGFueSwgc3RyaW5nPjtcblxuICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPGFueSwgc3RyaW5nPikge1xuICAgIHRoaXMubV9wb3J0SW5mb01hcCA9IHBvcnRudW1iZXJzTWFwO1xuICAgIGNvbnN0IG1hcEl0ZXIgPSB0aGlzLm1fcG9ydEluZm9NYXAua2V5cygpO1xuICAgIEZsYXNoY2FyZENhcmRFbGVtcy53aWRnZXRjb3VudCsrO1xuXG4gICAgdGhpcy5tX3BvcnRJbmZvTWFwLmZvckVhY2gocG9ydCA9PiB7XG4gICAgICAvLyBDcmVhdGUgbGlzdCBlbGVtZW50XG4gICAgICBsZXQgZmxhc2hjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgLy9UT0RPOiBsZXQgZmxhc2hjYXJkID0gbmV3IEdyb3dpbmdDYXJkRWxlbWVudCgpO1xuICAgICAgLy9VbmFibGUgdG8gaW5zdGFudGlhdGUgbGkgZWxlbWVudCBhcyBncm93aW5nIGNhcmQgZHVlIHRvIERPTSB1bmF2YWxhYmxlIC0tPiByZXF1aXJlcyBzaGFkb3dET00gbWFuaXB1bGF0ZVxuXG4gICAgICAvLyBQb3B1bGF0ZSBlbGVtZW50IGZvciBwYWdlIHVzZVxuICAgICAgY29uc3QgaW5uZXIgPSBmbGFzaGNhcmQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBjb25zdCBmbGlwZnJvbnQgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGZsaXBiYWNrID0gaW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBsZXQgZ2FtZUNhcmRTcGFuID0gZmxpcGZyb250LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgIGxldCBnYW1lQ2FyZEJhY2tTcGFuID0gZmxpcGJhY2suYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICApO1xuICAgICAgZmxhc2hjYXJkLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIiwgXCJnYW1lQ2FyZFwiKTtcbiAgICAgIGlubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgZmxpcGZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICBmbGlwYmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgIGdhbWVDYXJkU3Bhbi5pbm5lclRleHQgPSBgUG9ydCMgJHttYXBJdGVyLm5leHQoKS52YWx1ZX1gO1xuICAgICAgZ2FtZUNhcmRCYWNrU3Bhbi5pbm5lclRleHQgPSBgJHtwb3J0fWA7XG5cbiAgICAgIHRoaXMuZmxhc2hjYXJkc2NvdW50Kys7XG4gICAgICBGbGFzaGNhcmRDYXJkRWxlbXMudG90YWxmbGFzaGNhcmRzKys7XG5cbiAgICAgIC8vIEFkZCBkaXYgdG8gZmxhc2hjYXJkIGluc3RhbmNlXG4gICAgICB0aGlzLm1fZmxhc2hjYXJkc0Fyci5wdXNoKGZsYXNoY2FyZCk7XG4gICAgfSk7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL3dlYkJpdFwiO1xuaW1wb3J0IFJXQkNhcmQgZnJvbSBcIi4vcndiQ2FyZFwiO1xuaW1wb3J0IFJ3YkVycm9yIGZyb20gXCIuL3J3YkVycm9yQnVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbVdlYkJpdHMge1xuICBwdWJsaWMgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgcHVibGljIGNhcmRzRGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnQsIGNhcmRzRGF0YTogYW55KSB7XG4gICAgdGhpcy5jYXJkc1NlY3Rpb24gPSBjYXJkc1NlY3Rpb247XG4gICAgdGhpcy5jYXJkc0RhdGEgPSBjYXJkc0RhdGE7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBidWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcbiAgICBzZWN0aW9uVGl0bGU6IHN0cmluZyxcbiAgICBzZWN0aW9uSGVhZGluZ0lEOiBzdHJpbmcsXG4gICAgY29udGFpbmVyVHlwZT86IHN0cmluZ1xuICApIHtcbiAgICAvLyBDcmVhdGUgc2VjdGlvbmFsIGVsZW1lbnRzIHRvIGFwcGVuZCB0byBtYWluXG4gICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBpZiAocGFnZU1haW4gPT0gbnVsbCB8fCBwYWdlTWFpbi5ub2RlTmFtZSAhPT0gXCJNQUlOXCIpIHtcbiAgICAgIGlmIChSd2JFcnJvci5jaGVja0VsZW1lbnRmb3JOdWxsKFwiTWFpblJXQlwiLCBcIm1haW5cIiwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ3JlYXRlIGNhcmQgc2VjdGlvbiBlbGVtZW50c1xuICAgIC8vIDxzZWN0aW9uIGNsYXNzPVwiY2FyZHNcIj5cbiAgICAvLyAgICAgPGgyPkFyYml0cmFyeSBBcnRpY2xlczo8L2gyPlxuICAgIC8vICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9jb2x1bW5zXCI+XG5cbiAgICAvLyAgICAgPC9kaXY+XG4gICAgLy8gPC9zZWN0aW9uPlxuICAgIC8vXG4gICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgbGV0IGFhSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBsZXQgYWFDYXJkc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xuICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgcGFnZU1haW4uYXBwZW5kKEFBU2VjdGlvbik7XG5cbiAgICAvLyBBZGQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBBQVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRzXCIpO1xuICAgIHN3aXRjaCAoY29udGFpbmVyVHlwZSkge1xuICAgICAgY2FzZSBcInNsaWRlc2hvd1wiOlxuICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9jb2x1bW5zXCIsIFwiY2FyZHNsaWRlc2hvd1wiLCBcImdyaWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImFjY29yZGlvblwiOlxuICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9jb2x1bW5zXCIsIFwiY2FyZGFjY29yZGlvblwiLCBcImdyaWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRfY29sdW1uc1wiLCBcImdyaWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7c2VjdGlvblRpdGxlfWA7XG4gICAgYWFIZWFkaW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIHNlY3Rpb25IZWFkaW5nSUQpO1xuXG4gICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgYnVpbGRSV0JDYXJkcyhjYXJkc0RhdGE6IFdlYkJpdFtdKSB7XG4gICAgLy8gSXRlcmF0ZSBlYWNoIGNhcmQgaW4gdGhlIGFycmF5LiBCdWlsZCB0aGUgY2FyZCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgcmV0dXJuIGNhcmRzRGF0YS5tYXAoKGFydGljbGU6IFdlYkJpdCkgPT4ge1xuICAgICAgY29uc3QgcndiY2FyZCA9IG5ldyBSV0JDYXJkKCk7XG4gICAgICByZXR1cm4gcndiY2FyZC5idWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBidWlsZFJXQkludHJvZHVjdGlvbigpIHtcbiAgICBsZXQgaW50cm9kdWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgbGV0IFRpdGxlID0gaW50cm9kdWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKSk7XG4gICAgVGl0bGUuY2xhc3NMaXN0LmFkZChcIlRpdGxlXCIpO1xuICAgIFRpdGxlLmlubmVyVGV4dCA9IFwiSG9tZSB8IEFyYml0cmFyeSBXZWIgQml0c1wiO1xuICAgIGxldCBoMiA9IGludHJvZHVjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgIGgyLmlubmVyVGV4dCA9IFwiTmV3IHRvIHRoZSBXZWI/XCI7XG4gICAgbGV0IHBhcmExID0gaW50cm9kdWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICBwYXJhMS5pbm5lclRleHQgPVxuICAgICAgXCJJZiB5b3UgYXJlIG5ldyB0byB3ZWIgZGV2ZWxvcG1lbnQsIHRoZXJlIGFyZSBpbm51bWVyb3VzIGVudW1lcmF0aW9ucyBvZiBzdHVmZiBhbmQgdGhpbmdzIHRoZSBXb3JsZCBXaWRlIFdlYiBvZmZlcnMgdGhhdCB5b3UgZG9uJ3Qga25vdy5cIjtcbiAgICBsZXQgcGFyYTIgPSBpbnRyb2R1Y3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgIHBhcmEyLmlubmVyVGV4dCA9IFwiWW91IG1heSB3YW50IHRvIHN0YXJ0IGJ5IGNsYWltaW5nIGEgc3Rha2UgdG8gYSBkb21haW4gbmFtZS5cIjtcblxuICAgIHJldHVybiBpbnRyb2R1Y3Rpb247XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL2F0dHJpYnV0aW9uTGlua1wiO1xuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi93ZWJCaXRcIjtcbmltcG9ydCB7IFJXQkNhcmRFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQkNhcmQge1xuICAvKipcbiAgICogQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICovXG4gIHByaXZhdGUgcndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHM7XG5cbiAgLyoqXG4gICAqICBNYXAgV2ViQml0IGRhdGEgdG8gYSBjYXJkIGVhY2hcbiAgICpcbiAgICogIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAqICAgICAgPGRpdj5cbiAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAqICAgICAgPC9kaXY+XG4gICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRCb2R5XCI+XG4gICAqICAgICAgICAgIDxoMz48L2gzPlxuICAgKiAgICAgICAgICA8cD48L3A+XG4gICAqICAgICAgICAgIDxhIGhyZWY9XCJcIj48L2E+XG4gICAqICAgICAgPC9kaXY+XG4gICAqICA8L2Rpdj5cbiAgICovXG4gIHB1YmxpYyBidWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZTogV2ViQml0KSB7XG4gICAgbGV0IFdlYkJpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMgPSB7XG4gICAgICBjYXJkSW1nOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpLFxuICAgICAgY2FyZEltZ1RvcDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICAgIGNhcmRCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIH07XG4gICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlIZWFkaW5nKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG5cbiAgICAvLyBBZGQgY2FyZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKFwiY2FyZFwiKTtcbiAgICBXZWJCaXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7YXJ0aWNsZS5pZH1gKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5jbGFzc0xpc3QuYWRkKFwiY2FyZEJvZHlcIik7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYXJ0aWNsZS5jYXJkSW1hZ2UpO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZShcIkFydGljbGVcIiwgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGFydGljbGUuYXJ0aWNsZUxpbmspO1xuICAgIGNhcmRCb2R5SGVhZGluZy5pbm5lclRleHQgPSBhcnRpY2xlLm5hbWU7XG4gICAgY2FyZEJvZHlQYXJhLnRleHRDb250ZW50ID0gYXJ0aWNsZS5kZXNjcmlwdGlvbjtcbiAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgIC8vIEltYWdlIGF0dHJpYnV0aW9uIG1heSBiZSBuZWVkZWQgZm9yIHRoZSBpbWFnZSB1c2VkXG4gICAgLy8gQXR0cmlidXRpb24gZGF0YSBpcyBpbXBvcnRlZCBhcyAnYXR0cmxpbmtzJyBzaWduYXR1cmUgcGFyYW1ldGVyXG4gICAgaWYgKGFydGljbGUubGlua0F0dHJpYnV0aW9uKSB7XG4gICAgICB0aGlzLmJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwodGhpcy5yd2JjYXJkZWxlbWVudHMsIGFydGljbGUubGlua0F0dHJpYnV0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgY2FyZCBpcyBXZWJCaXRcbiAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3ApO1xuICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keSk7XG5cbiAgICByZXR1cm4gV2ViQml0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgaW1hZ2UgYXR0cmlidXRpb24sIHRoZSBpbWFnZSBpZCBhbmQgYXJ0aWNsZSBpZCB3aWxsIG1hdGNoLFxuICAgKiBvdGhlcndpc2UgdGhlIGRhdGEgaXNuJ3QgZW50ZXJlZCwgY2F1c2luZyBhIG1pc3NcbiAgICpcbiAgICogIDxkaXYgY2xhc3M9XCJmbGlwLWNhcmRcIj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgKiAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRGcm9udFwiPlxuICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICogICAgICA8L2Rpdj5cbiAgICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQmFja1wiPlxuICAgKiAgICAgICAgICAgICAgIDxoMz48L2gzPlxuICAgKiAgICAgICAgICAgICAgIDxwPjwvcD5cbiAgICogICAgICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIiBjbGFzcz1cImltZ1NtYWxsIGltZ1BUUlwiPlxuICAgKiAgICAgICAgICAgPC9kaXY+XG4gICAqICAgICAgPC9kaXY+XG4gICAqICA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICogQHBhcmFtIHJ3YmNhcmRlbGVtZW50cyBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgKiBAcGFyYW0gbGluayBBdHRyaWJ1dGlvbiBsaW5rXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwocndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHMsIGxpbms6IEF0dHJpYnV0aW9uTGluaykge1xuICAgIGlmIChyd2JjYXJkZWxlbWVudHMuY2FyZEltZy5nZXRBdHRyaWJ1dGUoXCJBcnRpY2xlXCIpID09PSBsaW5rLmFydGljbGVJZC50b1N0cmluZygpKSB7XG4gICAgICAvLyBDcmVhdGUgaW1hZ2UgYmFjayBwYW5lbCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAvLyBSZWRlZmluZSBjYXJkIGltYWdlIHBhbmVsIGFzIGEgZmxpcCBwYW5lbFxuICAgICAgY29uc3QgY2FyZElubmVyID0gcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBjYXJkRnJvbnQuYXBwZW5kQ2hpbGQocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcpOyAvLyBtb3ZlIGltYWdlIHdpdGhpbiBjYXJkIGZyb250IGRpdmlzb3JcbiAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICBjb25zdCBjYXJkQmFjayA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGJhY2tIZWFkaW5nID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcbiAgICAgIGNvbnN0IGJhY2tQYXJhID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSk7IC8vYXBwZW5kIHRvIGZyb250IHBhbmVsXG5cbiAgICAgIC8vIEFkZCBmbGlwLXBhbmVsIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIpO1xuICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xuICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRPd25lcjtcbiAgICAgIGJhY2tQYXJhLnRleHRDb250ZW50ID0gbGluay5pbm5lclRleHQ7XG4gICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XG4gICAgICBhdHRyaWJ1dGVMaW5rLnRpdGxlID0gbGluay50aXRsZTtcbiAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRPd25lcjtcbiAgICB9XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSd2JFcnJvciB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgUndiRXJyb3IuY291bnQrKztcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGNoZWNrRWxlbWVudGZvck51bGwoXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxuICAgIGNzc1F1ZXJ5OiBzdHJpbmcsXG4gICAgbG9nTWVzc2FnZT86IGJvb2xlYW4sXG4gICAgc3VwcmVzc0V4Y2VwdGlvbj86IGJvb2xlYW5cbiAgKSB7XG4gICAgbGV0IGVsZW06IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBsZXQgbG9nbXNzZzogYm9vbGVhbiA9IHRydWU7IC8vTG9nIG1lc3NhZ2Ugb3B0aW9uIGRlZmF1bHRcbiAgICBpZiAoIWxvZ01lc3NhZ2UpIGxvZ21zc2cgPSBsb2dNZXNzYWdlO1xuICAgIGxldCBzdXByZXNzZXhjcHQ6IGJvb2xlYW4gPSBmYWxzZTsgLy9TdXByZXNzIG1lc3NhZ2Ugb3B0aW9uIGRlZmF1bHRcbiAgICBpZiAoc3VwcmVzc0V4Y2VwdGlvbikgc3VwcmVzc2V4Y3B0ID0gdHJ1ZTtcbiAgICBsZXQgcXVlcnk6IHN0cmluZyA9IGAke2Nzc1F1ZXJ5fWA7XG5cbiAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgdHJ5IHtcbiAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKFwiR2V0RWxlbWVudFwiLCBgQ291bGQgbm90IGdldCBlbGVtZW50OiAnJHtxdWVyeX0nYCkpO1xuICAgIH1cbiAgICBpZiAoZWxlbSA9PSBudWxsKSB7XG4gICAgICBpZiAobG9nbXNzZykgY29uc29sZS5pbmZvKGAlY05vIGVsZW1lbnQgZm91bmQgd2l0aCBxdWVyeTogJHtxdWVyeX0uYCwgXCJjb2xvcjogb3JhbmdlO1wiKTtcbiAgICAgIGlmICghc3VwcmVzc2V4Y3B0KVxuICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSd2JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnROYW1lfU51bGxSZWZlcmVuY2VgLCBgRWxlbWVudCBub3QgZm91bmRgKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXG4gICAgY29tcG9uZW50TmFtZTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICAgIGNoZWNrRW1wdHlTdHJpbmc/OiBib29sZWFuLFxuICAgIGxvZ01lc3NhZ2U/OiBib29sZWFuXG4gICkge1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoIWxvZ01lc3NhZ2UpIGxvZ21zc2cgPSBsb2dNZXNzYWdlO1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCkgPT0gbnVsbCkge1xuICAgICAgaWYgKGxvZ21zc2cpIGNvbnNvbGUuaW5mbyhgJWNObyBsb2NhbCBzdG9yYWdlIGZvciAke2NvbXBvbmVudE5hbWV9LmAsIFwiY29sb3I6cHVycGxlO1wiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY2hlY2tFbXB0eVN0cmluZykgcmV0dXJuIFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoY29tcG9uZW50TmFtZSwga2V5LCBsb2dtc3NnKTtcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoY29tcG9uZW50TmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgbG9nTWVzc2FnZT86IGJvb2xlYW4pIHtcbiAgICBsZXQgbG9nbXNzZzogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKCFsb2dNZXNzYWdlKSBsb2dtc3NnID0gbG9nTWVzc2FnZTtcbiAgICBsZXQgdGVzdDogc3RyaW5nIHwgbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICB0ZXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7a2V5fWApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBnZXQgbG9jYWwgc3RvcmFnZSBrZXk6ICR7a2V5fWApO1xuICAgIH1cbiAgICBpZiAodGVzdCA9PSBudWxsKSB7XG4gICAgICBpZiAobG9nbXNzZykgY29uc29sZS53YXJuKGAlY0xvY2FsIHN0b3JhZ2Uga2V5IG5vdCBmb3VuZDogJHtrZXl9LmAsIFwiY29sb3I6IHllbGxvdztmb250LXdlaWdodDpib2xkO1wiKTtcbiAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudE5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYEtleSBub3QgZm91bmRgKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRlc3QgPT0gXCJcIiB8fCB0ZXN0ID09IFwiW11cIikge1xuICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgIGNvbnNvbGUud2FybihgJWNMb2NhbCBzdG9yYWdlIHZhbHVlIGlzIGVtcHR5IGZvciBrZXk6ICR7a2V5fWAsIFwiY29sb3I6IHllbGxvdztmb250LXdlaWdodDpib2xkO1wiKTtcbiAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudE5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYFZhbHVlIGlzIGVtcHR5YCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHJlZmVyZW5jZSBlcnJvciBkYXRhLiAqL1xuZXhwb3J0IGNsYXNzIFJ3YlJlZmVyZW5jZUVycm9yIGV4dGVuZHMgUmVmZXJlbmNlRXJyb3Ige1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICBwcml2YXRlIHJlZkVycm9yOiBSZWZlcmVuY2VFcnJvcjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICBsZXQgZXJyID0gbmV3IFJlZmVyZW5jZUVycm9yKHRoaXMubWVzc2FnZSk7XG4gICAgdGhpcy5yZWZFcnJvciA9IGVycjtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIHJlZmVyZW5jZSBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCxcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICBcImNvbG9yOnJlZDtcIixcbiAgICAgIHRoaXMucmVmRXJyb3IsXG4gICAgICBcImNvbG9yOnJlZDtmb250LXdlaWdodDpib2xkO1wiXG4gICAgKTtcbiAgICBSd2JSZWZlcmVuY2VFcnJvci5jb3VudCsrO1xuICB9O1xuXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgc3ludGF4IGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUndiU3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ludGF4RXJyb3I6IFN5bnRheEVycm9yO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBlcnIgPSBuZXcgU3ludGF4RXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLnN5bnRheEVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgc3ludGF4IGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5zeW50YXhFcnJvcixcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YlN5bnRheEVycm9yLmNvdW50Kys7XG4gIH07XG5cbn1cblxuZXhwb3J0IGNsYXNzIFJ3YkRvbUV4Y2VwdGlvbiBleHRlbmRzIERPTUV4Y2VwdGlvbiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBzdGFjazogYW55O1xuICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICBwcml2YXRlIGRvbUVycm9yOiBET01FeGNlcHRpb247XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGVycm9yOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gZXJyb3I7XG4gICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBlcnIgPSBuZXcgRE9NRXhjZXB0aW9uKHRoaXMubWVzc2FnZSk7XG4gICAgdGhpcy5kb21FcnJvciA9IGVycjtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIERPTSBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCxcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICBcImNvbG9yOnJlZDtcIixcbiAgICAgIHRoaXMuc3RhY2ssXG4gICAgICBcImNvbG9yOnJlZDtmb250LXdlaWdodDpib2xkO1wiXG4gICAgKTtcbiAgICBSd2JEb21FeGNlcHRpb24uY291bnQrKztcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFJ3YlN5bnRheEVycm9yIH0gZnJvbSBcIi4vcndiRXJyb3JCdXNcIjtcblxuLyoqIEFuIFJXQlBhcnNlSlNPTiBwYXJzZXMganNvbiBhbmQgc3RvcmVzIHRoZSBwYXJzZWQgc3RyaW5nIHdpdGggdGhlIHJlc3VsdC4gKi9cbmV4cG9ydCBjbGFzcyBSV0JQYXJzZUpTT04ge1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgcmV0dXJub2JqOiBvYmplY3Q7XG4gIHB1YmxpYyBwYXNzZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgcGFyc2VzdHI6IHN0cmluZztcblxuICAvKipDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcGFyc2UgcmVzdWx0cyBhbmQgcGFyc2VkXG4gICAqIEpTT04gb2JqZWN0LlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyc2VzdHI6IHN0cmluZykge1xuICAgIFJXQlBhcnNlSlNPTi5jb3VudCsrO1xuICAgIHRoaXMucGFyc2VzdHIgPSBwYXJzZXN0cjtcbiAgICB0aGlzLnBhc3NlZCA9IHRoaXMuUldCcGFyc2VKU09OKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBSV0JwYXJzZUpTT04oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmV0dXJub2JqID0gSlNPTi5wYXJzZSh0aGlzLnBhcnNlc3RyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnJldHVybm9iaiA9IG51bGw7XG4gICAgICBuZXcgUndiU3ludGF4RXJyb3IoXCJQYXJzZUVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG59XG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gdGVzdHMgd2hldGhlciBhbiBvYmplY3QgY2FuIGJlIHN0cmluZ2lmaWVkIGludG8gYSB2YWxpZFxuICoganNvbiBzdHJpbmcuICovXG5leHBvcnQgY2xhc3MgUldCU3RyaW5naWZ5SlNPTiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyByZXR1cm5zdHI6IHN0cmluZztcbiAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBqc29uOiBhbnk7XG4gIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICogSlNPTiBvYmplY3QuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihqc29uOiBhbnkpIHtcbiAgICBSV0JTdHJpbmdpZnlKU09OLmNvdW50Kys7XG4gICAgdGhpcy5qc29uID0ganNvbjtcbiAgICB0aGlzLnBhc3NlZCA9IHRoaXMucGFyc2VKU09OKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBwYXJzZUpTT04oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmV0dXJuc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5qc29uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnJldHVybnN0ciA9IG51bGw7XG4gICAgICBuZXcgUndiU3ludGF4RXJyb3IoXCJQYXJzZUVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIEhUTUwgbGluayBlbGVtZW50IGRhdGEuIFVzZWQgd2l0aCBhbmNob3IgdGFncy5cbiAqL1xuY2xhc3MgUndiTGluayB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIC8qKkhUTUwgdGl0bGUgYXR0cmlidXRlICovXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAvKipJbm5lciB0ZXh0IHN0cmluZyAqL1xuICBwdWJsaWMgaW5uZXJUZXh0OiBzdHJpbmc7XG4gIC8qKlRoZSBwYWdlIHRoZSBsaW5rIGlzIGFzc29jaWF0ZWQgdG8gKi9cbiAgcHVibGljIHBhZ2VOYW1lOiBzdHJpbmc7XG4gIC8qKkhUTUwgaHJlZiBhdHRyaWJ1dGUgKi9cbiAgcHVibGljIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGlubmVyVGV4dDogc3RyaW5nLFxuICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgaFJlZmVyZW5jZTogc3RyaW5nXG4gICkge1xuICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLFxuICAgICAgKHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0KSxcbiAgICAgICh0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUpLFxuICAgICAgKHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2UpLFxuICAgICAgUndiTGluay5jb3VudCsrO1xuICB9O1xuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUndiTGluaztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5pbnRlcmZhY2UgU2NyaXB0UnVudGltZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgc3RhcnRNYXJrOiBQZXJmb3JtYW5jZU1hcms7XG4gIGVuZE1hcms6IFBlcmZvcm1hbmNlTWFyaztcbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcGVyZm9ybWFuY2Ugc3RhcnQgYW5kIGVuZCBtYXJrcy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ3YlBlcmYge1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHNjcmlwdFJ1bnRpbWVNYXJrczogU2NyaXB0UnVudGltZSA9IHtcbiAgICBuYW1lOiBudWxsLFxuICAgIHN0YXJ0TWFyazogbnVsbCxcbiAgICBlbmRNYXJrOiBudWxsLFxuICB9O1xuXG4gIC8qKiBJbnN0YW50aWF0aW5nIGEgU2NyaXB0UGVyZiByZWNvcmRzIHRoZSBwZXJmb3JtYW5jZSBzdGFydCBtYXJrLiAqL1xuICBjb25zdHJ1Y3RvcihzY3JpcHROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lID0gc2NyaXB0TmFtZTtcbiAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5zdGFydE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0UnVudGltZU1hcmtzLm5hbWV9LXN0YXJ0YCk7XG4gICAgUndiUGVyZi5jb3VudCsrO1xuICB9O1xuXG4gIC8qKiBDYWxsIGVuZCgpIHRvIHNldCB0aGUgZW5kIHRpbWUgc3RhbXAuICovXG4gIHB1YmxpYyBlbmQoKSB7XG4gICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MuZW5kTWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZX0tZW5kYCk7XG4gICAgdGhpcy5tZWFzdXJlKCk7XG4gIH07XG5cbiAgLyoqIEEgY29uc29sZSBvdXRwdXQgb2YgdGhpcyBvYmplY3QncyBwZXJmb3JtYW5jZSBtZWFzdXJlbWVudC4gKi9cbiAgcHJpdmF0ZSBtZWFzdXJlKCkge1xuICAgIGxldCBtZWFzdXJlID0gcGVyZm9ybWFuY2UubWVhc3VyZShcbiAgICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLm5hbWUsXG4gICAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5zdGFydE1hcmsubmFtZSxcbiAgICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLmVuZE1hcmsubmFtZVxuICAgICk7XG4gICAgcmV0dXJuIGNvbnNvbGUuZGVidWcoYCR7dGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZX0gZXhlY3V0aW9uIHRpbWUgaXM6ICR7bWVhc3VyZS5kdXJhdGlvbn1gKTtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0RWxlbWVudHMgfSBmcm9tIFwiLi93aWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdldG9kb2NhY2hlIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBSV0JQYXJzZUpTT04sIFJXQlN0cmluZ2lmeUpTT04gfSBmcm9tIFwiLi9yd2JKc29uQ29udmVydGVyXCI7XG5pbXBvcnQgUndiRXJyb3IgZnJvbSBcIi4vcndiRXJyb3JCdXNcIjtcblxuLyoqXG4gKiBBIFRvRG9MaXN0IGlzIGFuIEhUTUwgd2lkZ2V0IHRvIHN0b3JlIFRvLURvcyBpbiB0aGUgYnJvd3Nlci4gSW5zdGFudGlhdGUgdGhlXG4gKiAgVG9Eb0xpc3QgY29uc3RydWN0b3IgdG8gY3JlYXRlIHdpZGdldCBtYXJrdXAgYW5kIGZ1bmN0aW9uYWxpdHkuIFRvLURvcyBhcmVcbiAqICBzdG9yZWQgaW4gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGFuZCByZWFkIGFuZCByZW5kZXJlZCB3aGVuIHRoZSBwYWdlIGxvYWRzLlxuICpcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqXG4gKiBUaGVuLCB0aGUgd2lkZ2V0IGlzIGNyZWF0ZWQgYW5kIFRvLURvcyBhcmUgcmV0cmlldmVkIGZyb20gc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvRG9MaXN0IHtcbiAgLyoqVG90YWwgbnVtYmVyIG9mIFRvRE9zKi9cbiAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgLyoqV2lkZ2V0IGVsZW1lbnRzIHVzZWQgdG8gcG9wdWxhdGUgdG9kb3MgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuICBwcml2YXRlIHN0YXRpYyBUb0RvSW5TdG9yYWdlOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXTtcbiAgLyoqVG9kbyBIVE1MIGVsZW1lbnRzICovXG4gIHByaXZhdGUgbGlzdEVsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBUby1EbyBsaXN0IHdpZGdldCdzIGVsZW1lbnRzLlxuICAgKlxuICAgKiAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50c1xuICAgKiBAcGFyYW0gVG9Eb0VsZW1lbnRzIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzZXRUb0RvTGlzdEVsZW1lbnRzKFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cykge1xuICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgfTtcblxuICAvKipcbiAgICogUmFuZG9tIFdlYiBCaXRzIHVzZXMgbXVsdGlwbGUgbG9jYXRpb25zIHRvIGFwcGx5IHRoZSBUby1EbyBMaXN0IHdpZGdldC4gQ3JlYXRlXG4gICAqICB0aGUgbGlzdCBtYXJrdXAsIHBhc3NpbmcgaW4gYSByZWZlcmVuY2UgZWxlbWVudCBmb3IgcGxhY2VtZW50IG9mIHRoZSB3aWRnZXQuXG4gICAqIEBwYXJhbSBlbGVtIC0gd2lkZ2V0IGlzIHBsYWNlZCBhZnRlciB0aGlzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL0luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAvL0RlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgIC8vU3dpdGNoIGFnYWluc3QgdGhlIGN1cnJlbnQgcGFnZSB0byBkZXRlcm1pbmUgbWFya3VwIG5lZWRlZFxuICAgIGlmIChlbGVtID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlY1RoZXJlIGlzIG5vIFwiVG9Eb0xpc3RcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCxcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xuICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL1wiOlxuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvaW5kZXguaHRtbFwiOlxuICAgICAgY2FzZSBcIi9cIjpcbiAgICAgIGNhc2UgXCIvZGlzdC9pbmRleC5odG1sXCI6XG4gICAgICAgIC8vTWFya3VwIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgICAgIC8vQ3JlYXRlIHRhYmxlIGVsZW1lbnRzIG5lZWRlZCBmb3IgdGhlIHRvZG8gbGlzdFxuICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXYgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKSk7XG4gICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpKTtcbiAgICAgICAgY29uc3QgdHIxID0gdGhlYWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTtcbiAgICAgICAgY29uc3QgdGhsZWZ0ID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKSk7XG4gICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKSk7XG4gICAgICAgIGNvbnN0IHRib2R5ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpKTtcbiAgICAgICAgY29uc3QgdGZvb3QgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGZvb3RcIikpO1xuICAgICAgICBjb25zdCB0cjMgPSB0Zm9vdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgICAgICBjb25zdCB0ZDNsZWZ0ID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7XG4gICAgICAgIGNvbnN0IHRkM0lOID0gdGQzbGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICAgICAgY29uc3QgSU5QVVQgPSB0ZDNtaWRkbGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRmb290XCIpKTtcbiAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZFwiKTtcbiAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XG4gICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICB0aGxlZnQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlP1wiO1xuICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICB0ZDNJTi5pZCA9IFwiQWRkQnV0dG9uXCI7XG4gICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8odGJvZHkpO1xuXG4gICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvUmFuZG9tV2ViQml0cy9wYWdlcy90b2Rvcy5odG1sXCI6XG4gICAgICBjYXNlIFwiL3BhZ2VzL3RvZG9zLmh0bWxcIjpcbiAgICAgICAgLy9NYXJrdXAgZXhpc3RzIG9uIHRoZSBwYWdlIGFscmVhZHlcbiAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gZHVlIHRvIGNhY2hlIGVtcHR5XG4gICAgICAgIGNvbnN0IGh0Ym9keSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGVCb2R5O1xuICAgICAgICBpZiAoaHRib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKGh0Ym9keSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIlxuICAgICAgICApO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAqIENoZWNrcyBmb3IgVG8tRG8gaXRlbXMgZnJvbSBMb2NhbCBTdG9yYWdlLlxuICogQHJldHVybnMgYm9vbGVhbiB0cnVlIG9yIGZhbHNlXG4gKi9cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VG9Eb0luU3RvcmFnZShcbiAgICBjaGVja2VtcHR5dmFsdWVzdHJpbmc6IGJvb2xlYW4sXG4gICAgbG9nbWVzc2FnZTogYm9vbGVhblxuICApIHtcbiAgICBpZiAoXG4gICAgICBSd2JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcbiAgICAgICAgXCJUb0RvTGlzdFwiLFxuICAgICAgICBcIlRvRG9zXCIsXG4gICAgICAgIGNoZWNrZW1wdHl2YWx1ZXN0cmluZyxcbiAgICAgICAgbG9nbWVzc2FnZVxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgcGFyc2VzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRvRG9zXCIpO1xuICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04ocGFyc2VzdHIpKTtcbiAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpIHtcbiAgICAgIC8vcGFyc2VkIEpTT04gaXMgbWFsZm9ybWVkXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlRvRG9zXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNnB4O1wiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuVG9Eb0luU3RvcmFnZSA9IHBhcnNldGVzdC5yZXR1cm5vYmo7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdhdGhlciBuZWNlc3NhcnkgZWxlbWVudHMgZnJvbSB0aGUgY3JlYXRlZCB3aWRnZXQuXG4gICAqIEByZXR1cm5zIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRUb0RvTGlzdEVsZW1lbnRzKCkge1xuICAgIC8vR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldFxuICAgIC8vRWFjaCB3aWRnZXQgbG9jYXRpb24ncyBlbGVtZW50cyBtYXkgdmFyeSwgc28gYSBjYWxsIG9mIGdldFRvRG9MaXN0RWxlbWVudHMoKVxuICAgIC8vbG9jYXRlcyB0aGUgcGFnZSdzIGVsZW1lbnRzIHRvIHBvcHVsYXRlIHRoZSBUb0RvRWxlbWVudHMgaW50ZXJmYWNlLlxuICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjVG9ETyB0YWJsZVwiKSxcbiAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVG9Eb0l0ZW1zXCIpLFxuICAgICAgYWRkQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkFkZEJ1dHRvblwiKSxcbiAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgfTtcbiAgICB0aGlzLmxpc3RFbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIFRvLURvIHRvIExvY2FsIFN0b3JhZ2UuXG4gICAqIEBwYXJhbSBkZXNjcmlwdGlvbiAtIFRoZSBVSSBmb3JtIGlucHV0IGRlc2NyaXB0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICAvL0FkZCB0aGUgVG9Eb3MgYXJyYXkgdG8gbG9jYWwgY2FjaGUuXG4gICAgLy9UaGUgJ2xvY2Fsc3RvcmFnZXRvZG9jYWNoZScgaW50ZXJmYWNlIHN0cnVjdHVyZXMgdGhlIGRhdGEgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICBsZXQgVG9EbzogbG9jYWxzdG9yYWdldG9kb2NhY2hlID0ge1xuICAgICAgaW5DYWNoZTogZmFsc2UsXG4gICAgICB0b2RvaXRlbTogZGVzY3JpcHRpb24sXG4gICAgfTtcbiAgICBsZXQgVG9Eb3M6IGFueSA9IFtdOyAvL1RvRG8gYXJyYXlcbiAgICBsZXQgc3RyZ2Z5O1xuXG4gICAgY29uc3Qgc3RyaW5naWZ5dG9kbyA9ICh0b2Rvc3RyOiBhbnkpID0+IHtcbiAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICBsZXQgdG9kb3NzdHJnZnl0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih0b2Rvc3RyKSk7XG4gICAgICBpZiAoIXRvZG9zc3RyZ2Z5dGVzdC5wYXNzZWQpIHtcbiAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2Rvc3N0cmdmeXRlc3QucmV0dXJuc3RyO1xuICAgIH07XG4gICAgLy9GaXJzdCwgcmVhZCBjdXJyZW50IExvY2FsIFN0b3JhZ2UgVG9Eb3NcbiAgICBsZXQgdG9kb3NzdG9yYWdlY2FjaGUgPSBUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKGZhbHNlLCBmYWxzZSk7XG4gICAgaWYgKHRvZG9zc3RvcmFnZWNhY2hlKSB7XG4gICAgICBUb0RvcyA9IFRvRG9MaXN0LlRvRG9JblN0b3JhZ2U7XG4gICAgICBUb0Rvcy5wdXNoKFRvRG8pO1xuICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgIHN0cmdmeSA9IHN0cmluZ2lmeXRvZG8oVG9Eb3MpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb0Rvc1wiLCBzdHJnZnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBUb0Rvcy5wdXNoKFRvRG8pO1xuICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgIHN0cmdmeSA9IHN0cmluZ2lmeXRvZG8oVG9Eb3MpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb0Rvc1wiLCBzdHJnZnkpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIGNhY2hlIGtleTogVG9Eb3NgLFxuICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4O1wiXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAlYzxSV0I+JWNBZGRlZCB0by1kbyBjYWNoZTogJHtkZXNjcmlwdGlvbn1gLFxuICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICBcImNvbG9yOmN5YW47XCJcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgVG8tRG8gaXRlbSBmcm9tIExvY2FsIFN0b3JhZ2UuIFRoZSByZXF1ZXN0ZWQgVG8tRG8gdG8gcmVtb3ZlIGlzXG4gICAqICBwdWxsZWQgaW5kaXZpZHVhbGx5IGZyb20gdGhlIGtleS12YWx1ZSBwYWlyIG9iamVjdC5cbiAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZXRvRG9Gcm9tU3RvcmFnZShpdGVtOiBzdHJpbmcpIHtcbiAgICBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZS5maWx0ZXIoXG4gICAgICB0b2RvID0+IHRvZG8udG9kb2l0ZW0gIT09IGl0ZW1cbiAgICApO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgdG9kbyBjYWNoZTogJHtpdGVtfWAsXG4gICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICBcImNvbG9yOmRhcmtjeWFuO1wiXG4gICAgKTtcbiAgICBsZXQgdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKFxuICAgICAgbmV3IFJXQlN0cmluZ2lmeUpTT04oVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZSlcbiAgICApO1xuICAgIGlmICghdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QucGFzc2VkKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGpzb25zdHIgPSB0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdC5yZXR1cm5zdHI7XG4gICAgaWYgKGpzb25zdHIgPT0gXCJcIiB8fCBqc29uc3RyID09IFwiW11cIikge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJUb0Rvc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogVG9Eb3NgLFxuICAgICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVG9Eb3NcIiwganNvbnN0cik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgbmVjZXNzYXJ5IG1hcmt1cCB0byBhZGQgYSByb3cgdG8gdGhlIFRvLURvIHRhYmxlLlxuICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVXNlciBmb3JtIGlucHV0IHRvIGFkZCBhcyBhIGRlc2NyaXB0aW9uLlxuICAgKiBAcGFyYW0gZmlyc3RQYWludCAtIEJvb2xlYW4gdmFsdWUgdXNlZCBieSBhZGRpbmcgbGlzdCBzdG9yYWdlXG4gICAqL1xuICBwcml2YXRlIEFkZFRvRG9Sb3coZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikge1xuICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgY29uc3QgVEFCTEVJVEVNID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICBjb25zdCB0YWJsZUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSk7IC8vQWRkIHJvd1xuICAgIGNvbnN0IGZpcnN0Q09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7IC8vVGFibGUgZmlyc3QgZGF0YVxuICAgIGNvbnN0IGNoZWNrQk9YID0gZmlyc3RDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTsgLy9BZGQgY2hlY2tib3hcbiAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7IC8vVGFibGUgc2Vjb25kIGRhdGFcbiAgICBjb25zdCBzZWNvbmRDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSB0aGlyZCBkYXRhXG4gICAgY29uc3QgZGVsQk9YID0gc2Vjb25kQ09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7IC8vQWRkIGRlbGV0ZWJveFxuXG4gICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDaGVja2JveFwiKTtcbiAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKFxuICAgICAgXCJudW1cIixcbiAgICAgIFRvRG9MaXN0LlRvRE9zXG4gICAgICAgID8gKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNUb0RPIHRkW251bV1cIik7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAoTnVtYmVyKGVsZW0/LmdldEF0dHJpYnV0ZShcIm51bVwiKSkgfHwgLTEwMDApICsgVG9Eb0xpc3QuVG9ET3NcbiAgICAgICAgICAgICkudG9TdHJpbmcoKTtcbiAgICAgICAgICB9KSgpXG4gICAgICAgIDogKDEpLnRvU3RyaW5nKClcbiAgICApO1xuICAgIG5ld0lURU0udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjsgLy9Qb3B1bGF0ZSBzZWNvbmQgY29sXG4gICAgVG9Eb0xpc3QuVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICBkZWxCT1guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgICBkZWxCT1guc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG5cbiAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIC8vQWRkIHRoZSByb3cgdG8gdGhlIFRvRG9zIHRhYmxlXG4gICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgJWM8UldCPiVjQ3JlYXRlZCB0by1kbyB0YWJsZSByb3dgLFxuICAgICAgXCJjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICBcImNvbG9yOmdvbGQ7XCJcbiAgICApO1xuXG4gICAgLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgIGRlbEJPWC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5EZWxldGVCdXR0b24oZGVsQk9YKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSB0aGUgVG8tRG8gaXRlbSByb3dzIGZyb20gVG8tRG9zIHN0b3JlZCBpbiB0aGUgYnJvd3NlciBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZVRvRG9MaXN0KCkge1xuICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKHRydWUsIGZhbHNlKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYnV0dG9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqL1xuICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBBRERCVVRUT04gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkQnV0dG9uO1xuICAgIGNvbnN0IEFERElURU1FTlRFUiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRJdGVtVG9FbnRlcjtcbiAgICBpZiAoQUREQlVUVE9OID09IG51bGwgJiYgQURESVRFTUVOVEVSID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgIH1cbiAgICAvKipBZGQgaW5wdXQgdGV4dCB0byB0aGUgdG9kbyBsaXN0IGZyb20gY2xpY2tpbmcgdGhlIGFkZCBidXR0b24qL1xuICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICBBRERJVEVNRU5URVIudmFsdWUgPSBcIlwiO1xuICAgIH0pO1xuICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3Qgd2hlbiB1c2luZyBrZXkgZW50ZXIqL1xuICAgIEFERElURU1FTlRFUi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICAgIGlmIChlLmNvZGUgPT0gXCJOdW1wYWRFbnRlclwiIHx8IGUuY29kZSA9PSBcIkVudGVyXCIpIHtcbiAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIGRldGVybWluaW5nIHRoZSBkZWxldGUgYnV0dG9uLiBJdGVtcyBhcmUgZGVsZXRlZCB3aGVuIHB1c2hlZCwgYnV0IGFyZVxuICAgKiAgbm90IHJlbW92ZWQgZnJvbSBzdG9yYWdlIHdpdGhvdXQgJ0NvbXBsZXRlPycgY2hlY2tlYm94IGNoZWNrZWQuXG4gICAqIEBwYXJhbSBib3ggaW5wdXQgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBEZWxldGVCdXR0b24oYm94OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKFxuICAgICAgYm94LnBhcmVudE5vZGUgPT0gbnVsbCB8fFxuICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nID09IG51bGwgfHxcbiAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhIHRhYmxlIGVsZW1lbnQuXCIpO1xuICAgIH1cbiAgICBjb25zdCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD4oXG4gICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nXG4gICAgKTtcbiAgICAvKiogSW5wdXQgZWxlbWVudCAqL1xuICAgIGNvbnN0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xuICAgIGNvbnN0IHRvZG9UYWJsZTogSFRNTFRhYmxlRWxlbWVudCA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgY29uc3QgdHI6IEhUTUxUYWJsZVJvd0VsZW1lbnQgPSA8SFRNTFRhYmxlUm93RWxlbWVudD4oXG4gICAgICBib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgKTtcbiAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgIGNvbnN0IHZhbHVlID0gYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50O1xuICAgIGlmIChyb3dDaGtCeElOLmNoZWNrZWQpIHtcbiAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgdG9kbyByb3c6ICR7Ym94LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtcIlxuICAgICAgKTtcbiAgICAgIGlmICh2YWx1ZSAhPSBcIkFkZCBhIFRvRE8gSXRlbS5cIikge1xuICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuXG4gICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXG4gICAgICAgIHRoaXMucmVtb3ZldG9Eb0Zyb21TdG9yYWdlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjUmVtb3ZlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO1wiXG4gICAgICApO1xuICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIHNlZWQgdGhlIFRvLURvIExpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gTG9jYWwgU3RvcmFnZSBpdGVtc1xuICAgKiAgd2hpY2ggd291bGQgcG9wdWxhdGUgdGhlIGxpc3QuIFRoZSBzYW1wbGUgcmVtYWlucyBvbiBwYWdlIGJ1dCBpcyBuZXZlciBzdG9yZWQgaW4gdGhlIGJyb3dzZXIuXG4gICAqIEBwYXJhbSB0Ym9keSB0YWJsZSBib2R5IGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlU2FtcGxlVG9fRG8odGJvZHk6IEVsZW1lbnQpIHtcbiAgICBpZiAoVG9Eb0xpc3QuZ2V0VG9Eb0luU3RvcmFnZShmYWxzZSwgdHJ1ZSkpIHJldHVybjtcbiAgICAvL0NyZWF0ZSBhIHNhbXBsZSBlbnRyeSBpbiB0aGUgVG9EbyB0YWJsZSBhcyBhIHBsYWNlaG9sZGVyXG4gICAgY29uc3QgdHIyID0gdGJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTtcbiAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7XG4gICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7XG4gICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuXG4gICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgIHRkMm1pZGRsZS5zZXRBdHRyaWJ1dGUoXCJudW1cIiwgYCR7MX1gKTtcbiAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmVzZXRcIik7XG4gICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiRGVsZXRlXCIpO1xuICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgdGQybWlkZGxlLnRleHRDb250ZW50ID0gXCJBZGQgYSBUb0RPIEl0ZW0uXCI7XG4gICAgVG9Eb0xpc3QuVG9ET3MrKztcblxuICAgIC8vXCJEZWxldGVcIiBldmVudCBsaXN0ZW5lclxuICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5EZWxldGVCdXR0b24odGQyREVMKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjUmVtb3ZlZCB0b2RvOiAke3RkMkRFTC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCxcbiAgICAgICAgXCJjb2xvcjpwdXJwbGU7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpwdXJwbGU7XCJcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi9hdHRyaWJ1dGlvbkxpbmtcIjtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGhvbGRzIHRoZSBkYXRhIGZvciAnV2ViQml0JyBhcnRpY2xlIGNhcmRzLiBLZXkgaW5mb3JtYXRpb25cbiAqIG9mIHRoZSBhcnRpY2xlJ3MgY29udGVudHMgYXJlIGNvbnRhaW5lZDogbmFtZSwgZGVzY3JpcHRpb24sIGRhdGEgY3JlYXRlZCxcbiAqIGV0Yy5cbiAqL1xuY2xhc3MgV2ViQml0IHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gIHB1YmxpYyBhcnRpY2xlTGluazogc3RyaW5nO1xuICBwdWJsaWMgY2FyZEltYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcbiAgcHVibGljIGxpbmtBdHRyaWJ1dGlvbjogQXR0cmlidXRpb25MaW5rO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgY2FyZEltYWdlOiBzdHJpbmcsXG4gICAgY2FyZEltYWdlQUxUOiBzdHJpbmcsXG4gICAgbGlua0F0dHJpYnV0aW9uPzogQXR0cmlidXRpb25MaW5rXG4gICkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgdGhpcy5jYXJkSW1hZ2UgPSBjYXJkSW1hZ2U7XG4gICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFQ7XG4gICAgdGhpcy5saW5rQXR0cmlidXRpb24gPSBsaW5rQXR0cmlidXRpb247XG4gICAgV2ViQml0LmNvdW50Kys7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0O1xuIl19

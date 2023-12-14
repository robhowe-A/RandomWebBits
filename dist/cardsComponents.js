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
                webBits_1.rwbCardsWidget.init(); // cards widget initialization
                webBits_1.webBitsSlideShow.init();
                webBits_1.webBitsAccordion.init();
                break;
            case "/RandomWebBits/pages.html":
            case "/pages.html":
                webBits_1.rwbCardsWidget.init(); // cards widget initialization
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

},{"./classComponents":2,"./components/flashcardGameWidget":3,"./components/webBits":7,"./models/scriptPerf":23}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const rwbErrorBus_1 = __importDefault(require("./models/rwbErrorBus"));
const dictionaryWidget_1 = __importDefault(require("./components/global/dictionaryWidget"));
const toDosWidget_1 = __importDefault(require("./components/global/toDosWidget"));
const _404_1 = __importDefault(require("./components/global/404"));
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

},{"./components/global/404":4,"./components/global/dictionaryWidget":5,"./components/global/toDosWidget":6,"./models/abbrDescription":10,"./models/rwbErrorBus":20,"./models/scriptPerf":23}],3:[function(require,module,exports){
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

},{"../data/portNums":9,"../models/flashcardCardElems":17}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const client_1 = require("../../models/client");
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

},{"../../models/client":14}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const dictionarySearch_1 = require("../../models/dictionarySearch");
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

},{"../../models/dictionarySearch":15}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const toDo_1 = require("../../models/toDo");
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

},{"../../models/toDo":24}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2FyZHNDb21wb25lbnRzLnRzIiwic3JjL2NsYXNzQ29tcG9uZW50cy50cyIsInNyYy9jb21wb25lbnRzL2ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9nbG9iYWwvNDA0LnRzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFsL2RpY3Rpb25hcnlXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9nbG9iYWwvdG9Eb3NXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy93ZWJCaXRzLnRzIiwic3JjL2RhdGEvZGF0YS50cyIsInNyYy9kYXRhL3BvcnROdW1zLnRzIiwic3JjL21vZGVscy9hYmJyRGVzY3JpcHRpb24udHMiLCJzcmMvbW9kZWxzL2FwaS50cyIsInNyYy9tb2RlbHMvYXR0cmlidXRpb25MaW5rLnRzIiwic3JjL21vZGVscy9jYXJkc1NsaWRlU2hvdy50cyIsInNyYy9tb2RlbHMvY2xpZW50LnRzIiwic3JjL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnRzIiwic3JjL21vZGVscy9mbGFzaGNhcmRDYXJkRWxlbXMudHMiLCJzcmMvbW9kZWxzL3JhbmRvbVdlYkJpdHMudHMiLCJzcmMvbW9kZWxzL3J3YkNhcmQudHMiLCJzcmMvbW9kZWxzL3J3YkVycm9yQnVzLnRzIiwic3JjL21vZGVscy9yd2JKc29uQ29udmVydGVyLnRzIiwic3JjL21vZGVscy9yd2JMaW5rLnRzIiwic3JjL21vZGVscy9zY3JpcHRQZXJmLnRzIiwic3JjL21vZGVscy90b0RvLnRzIiwic3JjL21vZGVscy93ZWJCaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLHVDQUF1QztBQUN2Qyx3RUFBZ0Q7QUFDaEQsa0RBQTBGO0FBQzFGLDJGQUFtRTtBQUNuRSxxRUFBMEM7QUFFMUMsTUFB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TUFBTSxNQUFNO0lBQ1YsK0NBQStDO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ3pCLEVBQUUsQ0FBUztJQUNYLGFBQWEsQ0FBUztJQUN0QixJQUFJLENBQVM7SUFDYixXQUFXLENBQVM7SUFDcEIsV0FBVyxDQUFPO0lBQ2xCLFdBQVcsQ0FBUztJQUNwQixTQUFTLENBQVM7SUFDbEIsWUFBWSxDQUFTO0lBQ3JCLGVBQWUsQ0FBa0I7SUFFeEMsWUFDRSxFQUFVLEVBQ1YsYUFBcUIsRUFDckIsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLFdBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLFlBQW9CLEVBQ3BCLGVBQWlDO1FBRWpDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFBQSxDQUFDOztBQUlKLGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IGNsYXNzQ29tcG9uZW50cyBmcm9tIFwiLi9jbGFzc0NvbXBvbmVudHNcIjtcbmltcG9ydCB7IHJ3YkNhcmRzV2lkZ2V0LCB3ZWJCaXRzU2xpZGVTaG93LCB3ZWJCaXRzQWNjb3JkaW9uIH0gZnJvbSBcIi4vY29tcG9uZW50cy93ZWJCaXRzXCI7XG5pbXBvcnQgZmxhc2hDYXJkR2FtZVdpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2ZsYXNoY2FyZEdhbWVXaWRnZXRcIjtcbmltcG9ydCBSd2JQZXJmIGZyb20gXCIuL21vZGVscy9zY3JpcHRQZXJmXCI7XG5cbmNvbnN0IGNhcmRDb21wb25lbnRzID0ge1xuICBjaGVja1BhZ2U6IChwYWdlOiBzdHJpbmcpID0+IHtcbiAgICBjbGFzc0NvbXBvbmVudHMuZm91cm9oZm91cigpO1xuXG4gICAgc3dpdGNoIChwYWdlKSB7XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbFwiOlxuICAgICAgY2FzZSBcIi9pbmRleC5odG1sXCI6XG4gICAgICBjYXNlIFwiL1wiOlxuICAgICAgICByd2JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICB3ZWJCaXRzU2xpZGVTaG93LmluaXQoKTtcbiAgICAgICAgd2ViQml0c0FjY29yZGlvbi5pbml0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL3BhZ2VzLmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvcGFnZXMuaHRtbFwiOlxuICAgICAgICByd2JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICBicmVhaztcbiAgICAgIC8vIEluaXRpYWxpemUgZmxhc2hjYXJkIGNvbXBvbmVudHNcbiAgICAgIGNhc2UgXCIvZmxhc2hjYXJkcy5odG1sXCI6XG4gICAgICAgIGZsYXNoQ2FyZEdhbWVXaWRnZXQuaW5pdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgcGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICBjb25zdCBwYWdlUGVyZiA9IG5ldyBSd2JQZXJmKFwiQ2FyZGNvbXBvbmVudHNcIik7IC8vbWVhc3VyZSBwZXJmb3JtYW5jZVxuXG4gICAgY2FyZENvbXBvbmVudHMuY2hlY2tQYWdlKHBhZ2UpO1xuXG4gICAgcGFnZVBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgbG9hZDogKCkgPT4ge30sXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY2FyZENvbXBvbmVudHMuaW5pdClcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4vbW9kZWxzL3NjcmlwdFBlcmZcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9tb2RlbHMvcndiRXJyb3JCdXNcIjtcbmltcG9ydCBkaWN0aW9uYXJ5V2lkZ2V0IGZyb20gXCIuL2NvbXBvbmVudHMvZ2xvYmFsL2RpY3Rpb25hcnlXaWRnZXRcIjtcbmltcG9ydCB0b0Rvc1dpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2dsb2JhbC90b0Rvc1dpZGdldFwiO1xuaW1wb3J0IG5vdEZvdW5kNDA0V2lkZ2V0IGZyb20gXCIuL2NvbXBvbmVudHMvZ2xvYmFsLzQwNFwiO1xuaW1wb3J0IEFiYnJPcGVuIGZyb20gXCIuL21vZGVscy9hYmJyRGVzY3JpcHRpb25cIjtcblxuY29uc3QgY2xhc3NDb21wb25lbnRzID0ge1xuICAvKipcbiAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICogIGFiaWxpdHkgdG8gZGVmaW5lIGFuIGFiYnIgdGFnLCB0aGFuIHJlbHkgb24gdGhlIHRpdGxlIGF0dHJpYnV0ZS5cbiAgICovXG4gIGFiYnJEZWZpbml0aW9uczogKCkgPT4ge1xuICAgIGNvbnN0IG1vYmlsZWFiYnJwZXJmID0gbmV3IFJ3YlBlcmYoXCJNb2JpbGVhYmJycGVyZlwiKTsgLy9zdGFydCBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAvKipHaXZlIGFsbCBhYmJyIGVsZW1lbnRzIG9wdGlvbiB0byBjbGljayB0byByZXZlYWwgdGhlIGV4cGFuZGVkIGRlc2NyaXB0aW9uLiAqL1xuICAgIGNvbnN0IGFsbGFiYnJldmlhdGlvbmVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFiYnJcIik7XG5cbiAgICBpZiAoYWxsYWJicmV2aWF0aW9uZWxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgYWJiciBvZiBhbGxhYmJyZXZpYXRpb25lbGVtcykge1xuICAgICAgICBsZXQgYWJicmV2ID0gbmV3IEFiYnJPcGVuKGFiYnIpO1xuICAgICAgICBhYmJyZXYucmV2ZWFsQWJickRlc2NyaXB0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbW9iaWxlYWJicnBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgZm91cm9oZm91cjogKCkgPT4ge1xuICAgIGlmICghUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIlBhZ2VDb21wb25lbnRzXCIsIFwiI0ZvdXItT2gtRm91clwiLCBmYWxzZSwgdHJ1ZSkpIHtcbiAgICAgIG5vdEZvdW5kNDA0V2lkZ2V0LmluaXQoKTtcbiAgICB9XG4gIH0sXG4gIGluaXQ6IChwYWdlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjbGFzc3BlcmYgPSBuZXcgUndiUGVyZihcIkNsYXNzY29tcG9uZW50c1wiKTsgLy9iZWdpbiBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAvLyBBZGQgRGljdGlvbmFyeSBXaWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgaWYgKHBhZ2UgPT0gXCIvcGFnZXMvZGljdGlvbmFyeXdvcmQuaHRtbFwiIHx8IHBhZ2UgPT0gXCIvaW5kZXguaHRtbFwiIHx8IHBhZ2UgPT0gXCIvXCIgfHwgcGFnZSA9PSBcIlwiKSB7XG4gICAgICBpZiAoUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiLmRpY3Rpb25hcnlXaWRnZXRcIiwgdHJ1ZSwgdHJ1ZSkpIHJldHVybjtcbiAgICAgIGRpY3Rpb25hcnlXaWRnZXQuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgaWYgKHBhZ2UgPT0gXCIvcGFnZXMvdG9kb3MuaHRtbFwiIHx8IHBhZ2UgPT0gXCIvaW5kZXguaHRtbFwiIHx8IHBhZ2UgPT0gXCIvXCIgfHwgcGFnZSA9PSBcIlwiKSB7XG4gICAgICBpZiAoUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiLlRvRG9MaXN0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICB0b0Rvc1dpZGdldC5pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFiYnIgZGVmaW5pdGlvbnNcbiAgICBjbGFzc0NvbXBvbmVudHMuYWJickRlZmluaXRpb25zKCk7XG5cbiAgICAvLyBBZGQgUldCIGxpbmtzIGRlZmluaXRpb25zOiBhcHBlbmRzIFwiLmh0bWxcIiB0byBhbmNob3IgaHJlZiB0ZXh0ICh3aGljaCBpcyBuYXRpdmVseSByZW1vdmVkIGluIE5ldGxpZnkpXG4gICAgY2xhc3NDb21wb25lbnRzLnJ3YkRhdGFUeXBlQW5jaG9yKCk7XG5cbiAgICBjbGFzc3BlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgcndiRGF0YVR5cGVBbmNob3I6ICgpID0+IHtcbiAgICBzd2l0Y2ggKGxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMFswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazFbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzEwXS5ocmVmID0gXCIvZ3VpZGVzL2NsZWFyY29va2llc3F1aWNrbHkuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsyWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxMF0uaHJlZiA9IFwiL2V4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzExXS5ocmVmID0gXCIvcGFnZXMvZG9tLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmszID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazNbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzEwXS5ocmVmID0gXCIvcGFnZXMvZG9tLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rNCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms0WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rNSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms1WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsxMF0uaHJlZiA9IFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rN1swXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMVswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzEwXS5ocmVmID0gXCIvZ3VpZGVzL2h0dHBzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEyWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMlszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbMTBdLmhyZWYgPSBcIi9wYWdlcy9oc2wuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEzWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1szXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbMTBdLmhyZWYgPSBcIi9wYWdlcy5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9wYWdlcy9kYXRhc3RvcmFnZS5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazhbMF0uaHJlZiA9IFwiL3BhZ2VzL21hcmt1cC5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms4WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazlbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazlbMV0uaHJlZiA9IFwiL3BhZ2VzL3dlYmlkZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvdXJsLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEwWzBdLmhyZWYgPSBcIi9wYWdlcy9kb21haW5sb29rdXAuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJObyBlbGVtZW50cyBvZiB0eXBlIGRhdGEtcndiLXR5cGU9bGluayBmb3VuZC5cIik7IC8vc2hvd24gd2l0aCB2ZXJib3NlIGxvZ2dpbmdcbiAgICB9XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3NDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBGbGFzaGNhcmRDYXJkRWxlbXMgfSBmcm9tIFwiLi4vbW9kZWxzL2ZsYXNoY2FyZENhcmRFbGVtc1wiO1xuaW1wb3J0IHBvcnREZWZpbml0aW9ucyBmcm9tIFwiLi4vZGF0YS9wb3J0TnVtc1wiO1xuXG5jb25zdCBmbGFzaENhcmRHYW1lV2lkZ2V0ID0ge1xuICBpbml0OiAoKSA9PiB7XG4gICAgLy8gRXN0YWJsaXNoIHdoaWNoIHBvcnQgbnVtYmVycyB0byB0ZXN0IGFuZCB0aGUgZGVmaW5pdGlvblxuICAgIC8vIFRPRE86IGZ1bmN0aW9ucyBmbGFzaGNhcmRzXG4gICAgY29uc3QgbWV0aG9kRGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihbXG4gICAgICBbXCJjaGFyQXQoKVwiLCBcIlJldHVybnMgYSBuZXcgc3RyaW5nIG9mIHRoZSBjaGFyYWN0ZXIgYXQgYSBnaXZlbiBpbmRleC5cIl0sXG4gICAgXSk7XG5cbiAgICAvLyBDcmVhdGUgZmxhc2hjYXJkIGVsZW1lbnRzXG4gICAgbGV0IG1haW5GbGFzaENhcmREaXZzID0gbmV3IEZsYXNoY2FyZENhcmRFbGVtcyhwb3J0RGVmaW5pdGlvbnMpO1xuXG4gICAgLy8gQWRkIHRoZSBnYW1lJ3MgdGl0bGUgZWxlbWVudFxuICAgIGxldCBtYWluRmxhc2hDYXJkUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZsYXNoQ2FyZEdhbWVcIik7XG4gICAgbGV0IG1haW5GbGFzaENhcmRQYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRmxhc2hDYXJkc1wiKTtcblxuICAgIGNvbnN0IGdhbWVUaXRsZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZ2FtZVRpdGxlRWxlbS5pbm5lclRleHQgPSBcIkNvbXB1dGluZyBQb3J0IE51bWJlcnNcIjtcbiAgICBtYWluRmxhc2hDYXJkUGFnZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGdhbWVUaXRsZUVsZW0pO1xuXG4gICAgLy8gQWRkIHRoZSBmbGFzaGNhcmRzIHRvIHdpZGdldFxuICAgIGZvciAobGV0IGVsZW0gb2YgbWFpbkZsYXNoQ2FyZERpdnMubV9mbGFzaGNhcmRzQXJyKSB7XG4gICAgICBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmbGFzaENhcmRHYW1lV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xuXG5jb25zdCBub3RGb3VuZDQwNFdpZGdldCA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBjbGllbnQ0MDQgPSBuZXcgY2xpZW50KCk7XG4gICAgbGV0IGNsaWVudFJlZmZlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsaWVudHJlZmVycmVyXCIpO1xuICAgIGxldCBjbGllbnRSdHRJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGllbnRydHRcIik7XG4gICAgbGV0IGNsaWVudFBsYXRmb3JtSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xpZW50cGxhdFwiKTtcblxuICAgIC8vRmlsbCBpbmZvcm1hdGlvbiBzZWNpb25cbiAgICBjbGllbnRSZWZmZXJJbmZvLnRleHRDb250ZW50ID0gY2xpZW50NDA0Lm9sZFVSTCA/IGNsaWVudDQwNC5vbGRVUkwgOiB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjbGllbnRSdHRJbmZvLnRleHRDb250ZW50ID0gYCR7XG4gICAgICBjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgPyBjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgOiBcIk5vIGNvbm5lY3Rpb24gdHlwZSBmb3VuZC5cIlxuICAgIH1gO1xuICAgIGNsaWVudFJ0dEluZm8udGV4dENvbnRlbnQgKz0gYCwgcnR0IG9mICR7XG4gICAgICBjbGllbnQ0MDQuY29ubmVjdGlvbnJ0dCA/IGNsaWVudDQwNC5jb25uZWN0aW9ucnR0IDogXCJObyBydHQgZm91bmQuXCJcbiAgICB9YDtcbiAgICBjbGllbnRQbGF0Zm9ybUluZm8udGV4dENvbnRlbnQgPSBjbGllbnQ0MDQuYnJvd3NlcnBsYXRmb3JtXG4gICAgICA/IGNsaWVudDQwNC5icm93c2VycGxhdGZvcm1cbiAgICAgIDogXCJObyBwbGF0Zm9ybSBpbmZvcm1hdGlvbiBmb3VuZC5cIjtcbiAgICBjbGllbnRQbGF0Zm9ybUluZm8udGV4dENvbnRlbnQgKz0gYCwgJHtcbiAgICAgIGNsaWVudDQwNC51c2VyYWdlbnQgPyBjbGllbnQ0MDQudXNlcmFnZW50IDogXCJObyB1c2VyIGFnZW50IGluZm8uXCJcbiAgICB9YDtcblxuICAgIC8vUHJvdmlkZSBhIGxpbmsgdG8gZ28gYmFjayB3aGVyZSB5b3UgY2FtZSBmcm9tXG4gICAgbGV0IGdvYmFja2xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFVSTFwiKTtcbiAgICBpZiAoY2xpZW50NDA0Lm9sZFVSTC5pbmNsdWRlcyhcIjQwNC5odG1sXCIpKSB7XG4gICAgICBjbGllbnQ0MDQub2xkVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICB9XG4gICAgbGV0IGdvYmFja2hyZWYgPSBjbGllbnQ0MDQub2xkVVJMID8gY2xpZW50NDA0Lm9sZFVSTCA6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgZ29iYWNrbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAke2dvYmFja2hyZWZ9YCk7XG4gICAgZ29iYWNrbGluay5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBnb2JhY2tocmVmKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvdW5kNDA0V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IGRpY3Rpb25hcnlXaWRnZXQgPSB7XG4gIC8qKlxuICAgKiBUaGlzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgYnkgY2FsbGluZyB0aGVcbiAgICogIGNvbnN0cnVjdG9yLlxuICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3NcbiAgICovXG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudDogRWxlbWVudDtcbiAgICBkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuXG4gICAgLy8gRGljdGlvbmFyeVNlYXJjaCBjb25zdHJ1Y3RvclxuICAgIE9iamVjdC5jcmVhdGUobmV3IERpY3Rpb25hcnlTZWFyY2goZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCkpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGljdGlvbmFyeVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3RvRG9cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgVG8tRG8gTGlzdCB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgdG9Eb3NXaWRnZXQgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBUby1EbyBMaXN0IHdpZGdldC5cbiAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ1RvRG9MaXN0JyBjbGFzc1xuICAgKi9cbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCB0b0Rvc0VsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgdG9Eb3NFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Ub0RvTGlzdFwiKTtcblxuICAgIC8vVG9Eb0xpc3Qgb2JqZWN0XG4gICAgY29uc3QgdG9Eb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuXG4gICAgLy9DcmVhdGVzIHdpZGdldCBtYXJrdXAgYW5kIHBvcHVsYXRlcyBUby1EbyB0YXNrcyBjb250YWluZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgIHRvRG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQodG9Eb3NFbGVtZW50KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvRG9zV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XG5pbXBvcnQgUmFuZG9tV2ViQml0cyBmcm9tIFwiLi4vbW9kZWxzL3JhbmRvbVdlYkJpdHNcIjtcbmltcG9ydCBDYXJkc1NsaWRlU2hvdyBmcm9tIFwiLi4vbW9kZWxzL2NhcmRzU2xpZGVTaG93XCI7XG5cbmNsYXNzIEFjY29yZGlvbiB7XG4gIHB1YmxpYyBhY2NvcmRpb25FbGVtZW50cyA9IG5ldyBNYXA8SFRNTERpdkVsZW1lbnQsIGJvb2xlYW4+KCk7XG4gIGNvbnN0cnVjdG9yKGFjY29yZGlvbk5vZGVzOiBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50Pikge1xuICAgIGZvciAobGV0IGNhcmQgb2YgYWNjb3JkaW9uTm9kZXMpIHtcbiAgICAgIHRoaXMuYWNjb3JkaW9uRWxlbWVudHMuc2V0KGNhcmQsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYXJkIHdpZGdldCB0byBpbml0aWFsaXplIGFydGljbGUgZGF0YSBpbnRvIEhUTUwgY2FyZCBlbGVtZW50cy4gVGhpcyB3aWRnZXRcbiAqIGNyZWF0ZXMgbXVsdGlwbGUgc2VjdGlvbnMgb2YgY2FyZHMgdG8gYWRkIHRvIGEgcGFnZS5cbiAqL1xuY29uc3QgcndiQ2FyZHNXaWRnZXQgPSB7XG4gIGFkZENhcmRTZWN0aW9uQ2xhc3M6IChjYXJkczogSFRNTERpdkVsZW1lbnRbXSB8IEhUTUxEaXZFbGVtZW50LCBjbHM6IHN0cmluZykgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNhcmRzKSkge1xuICAgICAgLy8gY2FyZHMgaXMgYW4gYXJyYXkgb2YgY2FyZHM7IGFwcGVuZCBjbGFzcyB0byBhbGwgY2FyZHNcbiAgICAgIGZvciAobGV0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKGAke2Nsc31gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNhcmRzKSkge1xuICAgICAgLy8gY2FyZHMgaXMgYW4gZWxlbWVudDsgYXBwZW5kIGNsYXNzIHRvIHRoZSBlbGVtZW50XG4gICAgICBjYXJkcy5jbGFzc0xpc3QuYWRkKGAke2Nsc31gKTtcbiAgICB9XG4gIH0sXG4gIGJ1aWxkUmFuZG9tV2ViQml0czogKHBhZ2U/OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYXJiaXRyYXJ5QXJ0aWNsZXM6IFJhbmRvbVdlYkJpdHM7XG4gICAgbGV0IGd1aWRlU2hvcnRzOiBSYW5kb21XZWJCaXRzO1xuICAgIGxldCBleHBsb3JldGhlV2ViOiBSYW5kb21XZWJCaXRzO1xuXG4gICAgc3dpdGNoIChwYWdlKSB7XG4gICAgICBjYXNlIFwiSG9tZVwiOlxuICAgICAgICBlbnVtIENhcmRDb250YWluZXJUeXBlIHtcbiAgICAgICAgICBTbGlkZXNob3cgPSBcInNsaWRlc2hvd1wiLFxuICAgICAgICAgIEFjY29yZGlvbiA9IFwiYWNjb3JkaW9uXCIsXG4gICAgICAgIH1cbiAgICAgICAgLy8gU3BsaXQgdGhlIGNhcmRzIGFycmF5cyBpbnRvIHRoZWlyIHJlc3BlY3RpdmUgY2F0ZWdvcnlcbiAgICAgICAgYXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgUmFuZG9tV2ViQml0cyhcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFxuICAgICAgICAgICAgXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIsXG4gICAgICAgICAgICBcIkFyYml0cmFyeUFydGljbGVzXCIsXG4gICAgICAgICAgICBDYXJkQ29udGFpbmVyVHlwZS5TbGlkZXNob3dcbiAgICAgICAgICApLFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgZ3VpZGVTaG9ydHMgPSBuZXcgUmFuZG9tV2ViQml0cyhcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFxuICAgICAgICAgICAgXCJHdWlkZSBTaG9ydHM6XCIsXG4gICAgICAgICAgICBcIkd1aWRlU2hvcnRzXCIsXG4gICAgICAgICAgICBDYXJkQ29udGFpbmVyVHlwZS5BY2NvcmRpb25cbiAgICAgICAgICApLFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwbG9yZXRoZVdlYiA9IG5ldyBSYW5kb21XZWJCaXRzKFxuICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJFeHBsb3JlIHRoZSBXZWI6XCIsIFwiRXhwbG9yZXRoZVdlYlwiKSxcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFNwbGl0IHRoZSBjYXJkcyBhcnJheXMgaW50byB0aGVpciByZXNwZWN0aXZlIGNhdGVnb3J5XG4gICAgICAgIGFyYml0cmFyeUFydGljbGVzID0gbmV3IFJhbmRvbVdlYkJpdHMoXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkFyYml0cmFyeSBBcnRpY2xlczpcIiwgXCJBcmJpdHJhcnlBcnRpY2xlc1wiKSxcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKVxuICAgICAgICApO1xuXG4gICAgICAgIGd1aWRlU2hvcnRzID0gbmV3IFJhbmRvbVdlYkJpdHMoXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIiwgXCJHdWlkZVNob3J0c1wiKSxcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKVxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGxvcmV0aGVXZWIgPSBuZXcgUmFuZG9tV2ViQml0cyhcbiAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiRXhwbG9yZSB0aGUgV2ViOlwiLCBcIkV4cGxvcmV0aGVXZWJcIiksXG4gICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLyoqIE11bHRpcGxlIGNhdGVnb3JpZXMgb2YgY2FyZCBkYXRhIGV4aXN0LiBUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgbmVlZGVkXG4gICAgICogdG8gY3JlYXRlIGNhdGVnb3J5IHNlY3Rpb25zIGRpdmlzaW9ucyB3aGVuIHBsYWNlZCBvbiBhIHBhZ2UuXG4gICAgICovXG4gICAgY29uc3QgY2FyZHNTZWN0aW9uczogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgIGFyYml0cmFyeUFydGljbGVzLmNhcmRzU2VjdGlvbixcbiAgICAgIGd1aWRlU2hvcnRzLmNhcmRzU2VjdGlvbixcbiAgICAgIGV4cGxvcmV0aGVXZWIuY2FyZHNTZWN0aW9uLFxuICAgIF07XG5cbiAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2YgY2FyZCBkYXRhICsgYXR0cmlidXRpb24gbGluayBkYXRhXG4gICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMgKG9yIGFydGljbGVzKSwgR3VpZGVzLCBhbmQgRXhwbG9yZXNcbiAgICAvKipUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgb2YgY2FyZCBlbGVtZW50cy4gRWFjaCBpbmRleCBzdG9yZXMgdGhlIGNhcmRzJyBkYXRhXG4gICAgICogZm9yIG9uZSBjYXRlZ29yeSBvZiBhcnRpY2xlcy4gKi9cbiAgICBjb25zdCBjYXJkc0RhdGE6IGFueSA9IFthcmJpdHJhcnlBcnRpY2xlcy5jYXJkc0RhdGEsIGd1aWRlU2hvcnRzLmNhcmRzRGF0YSwgZXhwbG9yZXRoZVdlYi5jYXJkc0RhdGFdO1xuICAgIGNvbnN0IFJXQiA9IFtjYXJkc1NlY3Rpb25zLCBjYXJkc0RhdGFdO1xuXG4gICAgcmV0dXJuIFJXQjtcbiAgfSxcbiAgLyoqIENhcmRzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIGJyZWFrcyBkb3duIHRoZSBkYXRhIHN0cnVjdHVyZSBpblxuICAgKiBvcmRlciB0byBmb3JtdWxhdGUgdGhlIGFydGljbGUgZGV0YWlscyBpbnRvIG9uZSBjYXJkIGZvciBlYWNoIGFydGljbGUgZGF0YS5cbiAgICpcbiAgICogQXJ0aWNsZXMgaGF2ZSBkaWZmZXJlbnQgY2F0ZWdvcmllcywgc28gZWFjaCBjYXRlZ29yeSBtdXN0IGJlIHJlc3BlY3RlZC5cbiAgICogKi9cbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBSV0JTZWN0aW9uQ2FyZHM6IGFueTtcbiAgICAvLyBSb3V0ZXMgLT4gQWRkIHdpZGdldCBhbmQgZm9ybWF0IHBhZ2VzXG4gICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9ucycgY2FyZCBjb3VudCBhbmQgcmFuZG9taXplc1xuICAgIGlmIChcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9pbmRleC5odG1sXCIgfHxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9cIiB8fFxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbFwiIHx8XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gXCIvUmFuZG9tV2ViQml0cy9cIiB8fFxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL2Rpc3QvaW5kZXguaHRtbFwiXG4gICAgKSB7XG4gICAgICAvL0J1aWxkIFJXQiBTZWN0aW9ucyArIGNhcmQgc2xpZGVzaG93LCBhY2NvcmRpYW5cbiAgICAgIFJXQlNlY3Rpb25DYXJkcyA9IHJ3YkNhcmRzV2lkZ2V0LmJ1aWxkUmFuZG9tV2ViQml0cyhcIkhvbWVcIik7XG5cbiAgICAgIC8vIEFwcGx5IGNsYXNzZXMgdG8gY2FyZHMgcmVsZXZhbnQgb2YgdGhlIGNvbnRhaW5lciB0eXBlXG4gICAgICByd2JDYXJkc1dpZGdldC5hZGRDYXJkU2VjdGlvbkNsYXNzKFJXQlNlY3Rpb25DYXJkc1sxXVswXSwgXCJzbGlkZVwiKTtcbiAgICAgIHJ3YkNhcmRzV2lkZ2V0LmFkZENhcmRTZWN0aW9uQ2xhc3MoUldCU2VjdGlvbkNhcmRzWzFdWzFdLCBcImFjY29yZGlvbnNsaWRlXCIpO1xuXG4gICAgICAvL1JhbmRvbWl6ZSB0aGUgY2FyZHMgaW4gdGhlIHNsaWRlc2hvdyBzZWN0aW9uXG4gICAgICByd2JDYXJkc1dpZGdldC5yYW5kb21pemVXZWJCaXRzKFJXQlNlY3Rpb25DYXJkc1sxXSk7XG5cbiAgICAgIC8vQWRkIGludHJvZHVjdGlvbiBzZWN0aW9uIGFuZCBhcHBlbmQgdG8gbWFpblxuICAgICAgUldCU2VjdGlvbkNhcmRzWzBdLnVuc2hpZnQoUmFuZG9tV2ViQml0cy5idWlsZFJXQkludHJvZHVjdGlvbigpKTtcbiAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgIG1haW4ucHJlcGVuZChSV0JTZWN0aW9uQ2FyZHNbMF0uc2hpZnQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vQnVpbGQgUldCIFNlY3Rpb25zICsgY2FyZHMgYXMgZGVmYXVsdFxuICAgICAgUldCU2VjdGlvbkNhcmRzID0gcndiQ2FyZHNXaWRnZXQuYnVpbGRSYW5kb21XZWJCaXRzKCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBjYXJkcyB0byB0aGUgcGFnZSBieSBjb21iaW5pbmcgcndiWzFdICh0aGUgY2FyZHMpIHRvIHJ3YlswXSAodGhlIHNlY3Rpb24gZWxlbWVudHMpXG4gICAgLy8gT3V0ZXIgbG9vcDogaXRlcmF0ZSBlYWNoIGNhdGVnb3J5LCByZXNwZWN0aXZlbHk6IFBhZ2VzLCBHdWlkZXMsIEV4cGxvcmVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSV0JTZWN0aW9uQ2FyZHNbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChSV0JTZWN0aW9uQ2FyZHNbMF1baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIElubmVyIGxvb3A6IGl0ZXJhdGUgdGhyb3VnaCB0aGUgY2F0ZWdvcnkgZGF0YVxuICAgICAgICAvLyBGcm9tIHRoZSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICBSV0JTZWN0aW9uQ2FyZHNbMV0uc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICBSV0JTZWN0aW9uQ2FyZHNbMF1baV0uYXBwZW5kKGFydGljbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJUaGVyZSdzIGFuIGVycm9yIGluIHRoZSBkYXRhLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJhbmRvbWl6ZVdlYkJpdHMoY2FyZHNBcnRpY2xlczogYW55KSB7XG4gICAgLyoqIFJhbmRvbWl6ZSB0aGUgb3JkZXIgb2YgY2FyZHMuICovXG4gICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAvLyByYW5kb21pemUgdGhlIGFycmF5XG4gICAgICBjb25zdCBzaHVmZmxlZCA9IFsuLi5hcnJdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG5cbiAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICB9O1xuICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCBjYXJkc0FydGljbGVzWzBdLmxlbmd0aCk7IC8vcmFuZG9taXplIGFsbCBwYWdlc1xuICAgIGNhcmRzQXJ0aWNsZXNbMV0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzFdLCA4KTsgLy9yYW5kb21seSBzZWxlY3QgMyBndWlkZXNcbiAgfSxcbn07XG5cbmNvbnN0IHdlYkJpdHNBY2NvcmRpb24gPSB7XG4gIGFkZENhcmRBY2NvcmRpb25TdHlsZXM6IChjYXJkQWNjb3JkaW9uOiBBY2NvcmRpb24sIHNjcmVlblNpemU6IHN0cmluZykgPT4ge1xuICAgIGNhcmRBY2NvcmRpb24uYWNjb3JkaW9uRWxlbWVudHMuZm9yRWFjaCgoaXNPcGVuLCBjYXJkKSA9PiB7XG4gICAgICBjYXJkLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZmxleERpcmVjdGlvblwiKTtcbiAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtd2lkdGhcIiwgXCI5MDBweFwiKTtcbiAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXJnaW5cIiwgXCIwXCIpO1xuICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgLy9oaWRlIHRoZSAnRmxhdGljb24nIGxpbmtzXG5cbiAgICAgIGZvciAobGV0IGlubmVyIG9mIGNhcmQuY2hpbGROb2Rlcykge1xuICAgICAgICBsZXQgaW5uZXJlbGVtID0gPEhUTUxFbGVtZW50PmlubmVyO1xuICAgICAgICBpbm5lcmVsZW0uc3R5bGUud2lkdGggPSBcIjUwJVwiO1xuICAgICAgfVxuICAgICAgLy9jYXJkIGJvZHkgYXR0ciBzdHlsZVxuICAgICAgbGV0IGF0dHJsaW5rID0gY2FyZC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10gYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICBhdHRybGluay5zdHlsZS50b3AgPSBcIjU1cHhcIjtcbiAgICAgIGF0dHJsaW5rLnN0eWxlLnJpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICAgIGlmIChzY3JlZW5TaXplID09IFwiU01BTExcIikge1xuICAgICAgICAvL2NhcmQgaW1hZ2Ugc3R5bGVcbiAgICAgICAgbGV0IGltYWdlID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIGltYWdlLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LWhlaWdodFwiLCBcIjIwMHB4XCIpO1xuICAgICAgICBpbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC13aWR0aFwiLCBcIjIwMHB4XCIpO1xuXG4gICAgICAgIC8vY2FyZCBpbWFnZSBzbWFsbCBzdHlsZVxuICAgICAgICBsZXQgaW1hZ2VTbWFsbCA9IGNhcmQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICBpbWFnZVNtYWxsLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LWhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgICBpbWFnZVNtYWxsLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiMTAwcHhcIik7XG5cbiAgICAgICAgLy9jYXJkIGJhY2sgcGFyYSBzdHlsZVxuICAgICAgICBsZXQgaW1hZ2VQYXJhID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzJdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIGltYWdlUGFyYS5zdHlsZS5zZXRQcm9wZXJ0eShcIm1hcmdpblwiLCBcIjBcIik7XG4gICAgICAgIGltYWdlUGFyYS5zdHlsZS5zZXRQcm9wZXJ0eShcImZvbnQtc2l6ZVwiLCBcIjE2cHhcIik7XG4gICAgICB9XG4gICAgICBpZiAoc2NyZWVuU2l6ZSA9PSBcIk1FRElVTVwiKSB7XG4gICAgICAgIC8vY2FyZCBpbWFnZSBzdHlsZVxuICAgICAgICBsZXQgaW1hZ2UgPSBjYXJkLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtaGVpZ2h0XCIsIFwiMjc1cHhcIik7XG4gICAgICAgIGltYWdlLnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiMjc1cHhcIik7XG5cbiAgICAgICAgLy9jYXJkIGltYWdlIHNtYWxsIHN0eWxlXG4gICAgICAgIGxldCBpbWFnZVNtYWxsID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIGltYWdlU21hbGwuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtaGVpZ2h0XCIsIFwiMTAwcHhcIik7XG4gICAgICAgIGltYWdlU21hbGwuc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtd2lkdGhcIiwgXCIxMDBweFwiKTtcbiAgICAgIH1cbiAgICAgIGxldCBwYWdlbGluayA9IGNhcmQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzJdIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuXG4gICAgICAvL2FkZCBjbGljayBldmVudFxuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PSBhdHRybGluayB8fCBlLnRhcmdldCA9PSBwYWdlbGluaylcbiAgICAgICAgcmV0dXJuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjEwMHB4XCIpO1xuICAgICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgY2FyZC5zdHlsZS5zZXRQcm9wZXJ0eShcImhlaWdodFwiLCBcIjI3NXB4XCIpO1xuICAgICAgICAgIGlzT3BlbiA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGlzT3BlbiA/IGNsb3NlKCkgOiBvcGVuKCk7XG4gICAgICB9KTtcbiAgICAgIC8vYWRkIGZvY3VzIGV2ZW50XG4gICAgICBsZXQgc2l0ZWxpbmsgPSBjYXJkLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1syXSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICAgIHNpdGVsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIyNzVweFwiKTtcbiAgICAgICAgICBpc09wZW4gPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuKCk7XG4gICAgICB9KTtcbiAgICAgIHNpdGVsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMTAwcHhcIik7XG4gICAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIC8vYWRkIHVuZm9jdXMgZXZlbnRcbiAgICAgIGF0dHJsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwiaGVpZ2h0XCIsIFwiMTAwcHhcIik7XG4gICAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIC8vYWRkIHVuZm9jdXMgZXZlbnRcbiAgICAgIGF0dHJsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICAgICAgIGNhcmQuc3R5bGUuc2V0UHJvcGVydHkoXCJoZWlnaHRcIiwgXCIyNzVweFwiKTtcbiAgICAgICAgICBpc09wZW4gPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgaW5pdDogKCkgPT4ge1xuICAgIGNvbnN0IGFjY29yZGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZGFjY29yZGlvblwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBhY2NvcmRpb25Db250YWluZXIuc3R5bGUubWF4V2lkdGggPSBcIjc1ZW1cIjtcbiAgICAvL2NyZWF0ZSBhY2NvcmRpb24gY2FyZCBtYXAgc3RhdGVcbiAgICBjb25zdCBjYXJkYWNjb3JkaW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiLmNhcmRhY2NvcmRpb24gLmFjY29yZGlvbnNsaWRlXCJcbiAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgbGV0IGFjY29yZGlvbiA9IE9iamVjdC5jcmVhdGUobmV3IEFjY29yZGlvbihjYXJkYWNjb3JkaW9uKSk7XG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA1MDFweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICB3ZWJCaXRzQWNjb3JkaW9uLmFkZENhcmRBY2NvcmRpb25TdHlsZXMoYWNjb3JkaW9uLCBcIlNNQUxMXCIpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA3NjlweClcIikubWF0Y2hlcykge1xuICAgICAgd2ViQml0c0FjY29yZGlvbi5hZGRDYXJkQWNjb3JkaW9uU3R5bGVzKGFjY29yZGlvbiwgXCJNRURJVU1cIik7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA1MDFweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIHdlYkJpdHNBY2NvcmRpb24uYWRkQ2FyZEFjY29yZGlvblN0eWxlcyhhY2NvcmRpb24sIFwiU01BTExcIik7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA3NjlweClcIikubWF0Y2hlcykge1xuICAgICAgICB3ZWJCaXRzQWNjb3JkaW9uLmFkZENhcmRBY2NvcmRpb25TdHlsZXMoYWNjb3JkaW9uLCBcIk1FRElVTVwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDUwMHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIHdlYkJpdHNBY2NvcmRpb24ucmVtb3ZlQ2FyZEFjY29yaW9uU3R5bGVzKGFjY29yZGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHJlbW92ZUNhcmRBY2NvcmlvblN0eWxlczogKGNhcmRhY2NvcmRpb246IEFjY29yZGlvbikgPT4ge1xuICAgIGNhcmRhY2NvcmRpb24uYWNjb3JkaW9uRWxlbWVudHMuZm9yRWFjaCgoaXNPcGVuLCBjYXJkKSA9PiB7XG4gICAgICBjYXJkLnN0eWxlLnNldFByb3BlcnR5KFwiZmxleERpcmVjdGlvblwiLCBcImNvbHVtblwiKTtcbiAgICAgIGNhcmQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJoZWlnaHRcIik7XG5cbiAgICAgIGNhcmQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXgtd2lkdGhcIik7XG4gICAgICBjYXJkLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWFyZ2luXCIpO1xuICAgICAgY2FyZC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xuICAgICAgY2FyZC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgICAgLy9jYXJkIGJvZHkgYXR0ciBzdHlsZVxuICAgICAgbGV0IGF0dHJsaW5rID0gY2FyZC5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbM10gYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICBhdHRybGluay5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRvcFwiKTtcbiAgICAgIGF0dHJsaW5rLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwicmlnaHRcIik7XG4gICAgICBhdHRybGluay5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgICAgLy9jYXJkIGltYWdlIHN0eWxlXG4gICAgICBsZXQgaW1hZ2UgPSBjYXJkLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltYWdlLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWF4LWhlaWdodFwiKTtcbiAgICAgIGltYWdlLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWF4LXdpZHRoXCIpO1xuXG4gICAgICAvL2NhcmQgaW1hZ2Ugc21hbGwgc3R5bGVcbiAgICAgIGxldCBpbWFnZVNtYWxsID0gY2FyZC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWFnZVNtYWxsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWF4LWhlaWdodFwiKTtcbiAgICAgIGltYWdlU21hbGwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXgtd2lkdGhcIik7XG5cbiAgICAgIC8vY2FyZCBiYWNrIHBhcmEgc3R5bGVcbiAgICAgIGxldCBpbWFnZVBhcmEgPSBjYXJkLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMl0gYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltYWdlUGFyYS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpblwiKTtcbiAgICAgIGltYWdlUGFyYS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImZvbnQtc2l6ZVwiKTtcblxuICAgICAgZm9yIChsZXQgaW5uZXIgb2YgY2FyZC5jaGlsZE5vZGVzKSB7XG4gICAgICAgIGxldCBpbm5lcmVsZW0gPSA8SFRNTEVsZW1lbnQ+aW5uZXI7XG4gICAgICAgIGlubmVyZWxlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIndpZHRoXCIpO1xuICAgICAgICBpbm5lcmVsZW0ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgICB9XG4gICAgICBjYXJkLnJlcGxhY2VXaXRoKGNhcmQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbmNvbnN0IHdlYkJpdHNTbGlkZVNob3cgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL3BhZ2VzLmh0bWxcIikgcmV0dXJuO1xuICAgIGxldCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZHNsaWRlc2hvdyAuc2xpZGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD47XG4gICAgdmFyIHNtYWxsID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA4MTlweClcIik7XG4gICAgdmFyIHRhYmxldCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogODIwcHgpIGFuZCAobWF4LXdpZHRoOiAxMDkwcHgpXCIpO1xuXG4gICAgLy9JbXBsZW1lbnQgc2xpZGVzaG93IGZvciBzZWN0aW9uIGFydGljbGVzXG4gICAgbGV0IHNsaWRlc2hvdzogQ2FyZHNTbGlkZVNob3c7XG4gICAgbGV0IHNsaWRlc2hvd21lZDogQ2FyZHNTbGlkZVNob3c7XG4gICAgbGV0IHNsaWRlc2hvd2xhcmdlOiBDYXJkc1NsaWRlU2hvdztcbiAgICBsZXQgY3VycmVudHNsaWRlc2hvdzogQ2FyZHNTbGlkZVNob3c7XG5cbiAgICAvL0Jhc2VkIG9uIHRoZSBtYXRjaGVkIG1lZGlhIHNpemUsIGNyZWF0ZSBhIHNtYWxsLCBtZWRpdW0sIG9yIGxhcmdlIHNsaWRlc2hvd1xuICAgIGlmIChzbWFsbC5tYXRjaGVzKSB7XG4gICAgICBzbGlkZXNob3cgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDEsIFwiU01BTExcIik7XG4gICAgICBjdXJyZW50c2xpZGVzaG93ID0gc2xpZGVzaG93O1xuICAgIH0gZWxzZSBpZiAodGFibGV0Lm1hdGNoZXMpIHtcbiAgICAgIHNsaWRlc2hvd21lZCA9IG5ldyBDYXJkc1NsaWRlU2hvdyhjYXJkcywgMiwgXCJNRURJVU1cIik7XG4gICAgICBjdXJyZW50c2xpZGVzaG93ID0gc2xpZGVzaG93bWVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXNob3dsYXJnZSA9IG5ldyBDYXJkc1NsaWRlU2hvdyhjYXJkcywgMywgXCJMQVJHRVwiKTtcbiAgICAgIGN1cnJlbnRzbGlkZXNob3cgPSBzbGlkZXNob3dsYXJnZTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2xpZGVzaG93c21hbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlc2NvbnRhaW5lci5TTUFMTFwiKTtcbiAgICAgIGxldCBzbGlkZXNob3dtZWRpdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlc2NvbnRhaW5lci5NRURJVU1cIik7XG4gICAgICBsZXQgc2xpZGVzaG93bGFyZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlc2NvbnRhaW5lci5MQVJHRVwiKTtcblxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogODE5cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaWYgKHNsaWRlc2hvd21lZGl1bSAhPSBudWxsKSB7XG4gICAgICAgICAgc2xpZGVzaG93bWVkaXVtLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFJlbW92ZWQgbWVkIHNsaWRlc2hvdyAke3NsaWRlc2hvd21lZGl1bX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xpZGVzaG93bGFyZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHNsaWRlc2hvd2xhcmdlLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFJlbW92ZWQgbGFyZ2Ugc2xpZGVzaG93ICR7c2xpZGVzaG93bGFyZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5zc0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5hcnJvd3NDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDEsIFwiU01BTExcIik7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cub25SZXNpemVTaG93U3RhcnRpbmdFbGVtcygpO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogODIwcHgpIGFuZCAobWF4LXdpZHRoOiAxMDkwcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaWYgKHNsaWRlc2hvd3NtYWxsICE9IG51bGwpIHtcbiAgICAgICAgICBzbGlkZXNob3dzbWFsbC5yZW1vdmUoKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKGBSZW1vdmVkIHNtYWxsIHNsaWRlc2hvdyAke3NsaWRlc2hvd3NtYWxsfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzbGlkZXNob3dsYXJnZSAhPSBudWxsKSB7XG4gICAgICAgICAgc2xpZGVzaG93bGFyZ2UucmVtb3ZlKCk7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhgUmVtb3ZlZCBsYXJnZSBzbGlkZXNob3cgJHtzbGlkZXNob3dsYXJnZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50c2xpZGVzaG93LnNzQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICBjdXJyZW50c2xpZGVzaG93LmFycm93c0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY3VycmVudHNsaWRlc2hvdyA9IG5ldyBDYXJkc1NsaWRlU2hvdyhjYXJkcywgMiwgXCJNRURJVU1cIik7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cub25SZXNpemVTaG93U3RhcnRpbmdFbGVtcygpO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTA5MXB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGlmIChzbGlkZXNob3dzbWFsbCAhPSBudWxsKSB7XG4gICAgICAgICAgc2xpZGVzaG93c21hbGwucmVtb3ZlKCk7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhgUmVtb3ZlZCBzbWFsbCBlbGVtZW50ICR7c2xpZGVzaG93c21hbGx9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsaWRlc2hvd21lZGl1bSAhPSBudWxsKSB7XG4gICAgICAgICAgc2xpZGVzaG93bWVkaXVtLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFJlbW92ZWQgbWVkaXVtIGVsZW1lbnQgJHtzbGlkZXNob3dtZWRpdW19YCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5zc0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY3VycmVudHNsaWRlc2hvdy5hcnJvd3NDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cgPSBuZXcgQ2FyZHNTbGlkZVNob3coY2FyZHMsIDMsIFwiTEFSR0VcIik7XG4gICAgICAgIGN1cnJlbnRzbGlkZXNob3cub25SZXNpemVTaG93U3RhcnRpbmdFbGVtcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IHtyd2JDYXJkc1dpZGdldCwgd2ViQml0c0FjY29yZGlvbiwgd2ViQml0c1NsaWRlU2hvd307XG4iLCJcInN0cmljdCBtb2RlXCI7XG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy93ZWJCaXRcIjtcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9hdHRyaWJ1dGlvbkxpbmtcIjtcblxuLy8gQ3JlYXRlIG5ldyBBQSAoQXJiaXRyYXJ5IEFydGljbGUpXG5cbi8qKlxuICogXCJBcmJpdHJhcnkgQXJ0aWNsZXMnIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IGFyYml0cmFyeUFydGljbGVzID0gbmV3IEFycmF5KFxuICBuZXcgV2ViQml0KFxuICAgIFwiRG9tYWlubG9va3VwXCIsXG4gICAgMSxcbiAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICBcIkNoZWNrIGFuIGF2YWlsYWJsZSBkb21haW4gdXNpbmcgV2hvSVMgQVBJIHNlYXJjaFwiLFxuICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICBcInBhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgXCJpbWcvd2hvaXMud2VicFwiLFxuICAgIFwiV2hvSXMgTG9va3VwXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgMVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkh0bWxyZXNwb25zZXNcIixcbiAgICAyLFxuICAgIFwiSFRNTCBGcmFtZXNcIixcbiAgICBcIlZpZXcgSFRNTCBwYWdlIHJlc3BvbnNlIHN0YXR1cyBpbmZvcm1hdGlvblwiLFxuICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgXCJwYWdlcy9odG1scmVzcG9uc2VzLmh0bWxcIixcbiAgICBcImltZy9IVE1MX0ZyYW1lcy53ZWJwXCIsXG4gICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiY29kZSBpY29uc1wiLFxuICAgICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvZGVcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiSFRNTCBGcmFtZXNcIixcbiAgICAgIDJcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJXZWJ0ZWNoXCIsXG4gICAgNSxcbiAgICBcIldhcHBhbHl6ZXJcIixcbiAgICBcIldhcHBhbHl6ZXIgYnJvd3NlciBleHRlbnNpb25cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMSwgMTkpLFxuICAgIFwicGFnZXMvd2VidGVjaC5odG1sXCIsXG4gICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICBcIkJyb3dzZXIgZXh0ZW5zaW9uIGxvZ28uIEEgd2hpdGUgdyBvbiBhIHB1cnBsZSB0aWxlLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcIldhcHBhbHl6ZXIgYXBwXCIsXG4gICAgICBcIkdyYXBoaWNhbCBsb2dvIGZvciBXYXBwYWx5emVyLlwiLFxuICAgICAgXCJodHRwczovL3d3dy53YXBwYWx5emVyLmNvbS9sb2dvcy9cIixcbiAgICAgIFwiV2FwcGFseXplclwiLFxuICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICA1XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSnNvbm9iamVjdFwiLFxuICAgIDYsXG4gICAgXCJqc29uT2JqZWN0XCIsXG4gICAgXCJKU09OIG9iamVjdCBub3RhdGlvblwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgIFwicGFnZXMvanNvbm9iamVjdC5odG1sXCIsXG4gICAgXCJpbWcvanNvbi53ZWJwXCIsXG4gICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcIkphdmFTY3JpcHQgT2JqZWN0IE5vdGF0aW9uXCIsXG4gICAgICBcIkdyYXBoaWNhbCBsb2dvIGZvciBKU09OLlwiLFxuICAgICAgXCJodHRwczovL3d3dy5qc29uLm9yZy9cIixcbiAgICAgIFwianNvbi5vcmdcIixcbiAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgNlxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIldpLUZpXCIsXG4gICAgNyxcbiAgICBcIldpLUZpIFZlcnNpb25cIixcbiAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxLCAxNiksXG4gICAgXCJwYWdlcy93aWZpLmh0bWxcIixcbiAgICBcImltZy93aWZpLndlYnBcIixcbiAgICBcIldpLUZpIGxvZ28gd2l0aCBhIGJsYWNrIGNpcmNsZSBiYWNrZ3JvdW5kLlwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcIldpcmVsZXNzIEZpZGVsaXR5XCIsXG4gICAgICBcIldpLUZpIGdyYXBoaWNhbCBsb2dvLlwiLFxuICAgICAgXCJodHRwczovL3d3dy53aS1maS5vcmcvd2hvLXdlLWFyZS9vdXItYnJhbmRzXCIsXG4gICAgICBcIldpRmkgQWxsaWFuY2VcIixcbiAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgN1xuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkNoYXRncHRcIixcbiAgICA4LFxuICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgXCJDaGF0IHdpdGggYW4gQUkgZm9yIHJlc2VhcmNoIGFuZCBkZXZlbG9wbWVudC5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICBcImltZy9haS53ZWJwXCIsXG4gICAgXCJEZWNvcmF0aXZlIEFJIGxvZ29cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJhaSBpY29uc1wiLFxuICAgICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgIDhcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJQYWludDNkXCIsXG4gICAgOSxcbiAgICBcIlBhaW50IDNEXCIsXG4gICAgXCJFZGl0IHBpY3R1cmVzIG9yIHNjcmVlbiBjYXB0dXJlcyB1c2luZyBwYWludCAzRFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICBcInBhZ2VzL3BhaW50M2QuaHRtbFwiLFxuICAgIFwiaW1nL3Byb3RvdHlwZS53ZWJwXCIsXG4gICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwicHJvdG90eXBlIGljb25zXCIsXG4gICAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wcm90b3R5cGVcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgIDlcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEaWN0aW9uYXJ5XCIsXG4gICAgMTAsXG4gICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgXCJMaXN0IGRpY3Rpb25hcnkgdGVybXMgdXNpbmcgYSBkaWN0aW9uYXJ5IEFQSVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEsIDMwKSxcbiAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICBcImltZy9kaWN0aW9uYXJ5LndlYnBcIixcbiAgICBcIkRpY3Rpb25hcnkgaWNvbiBkZXBpY3Rpb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgICBcIkRpY3Rpb25hcnkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAxMFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkJvaW5jXCIsXG4gICAgMTEsXG4gICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMiwgNiksXG4gICAgXCJwYWdlcy9ib2luYy5odG1sXCIsXG4gICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICBcIkJPSU5DIGxvZ29cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJCT0lOQyBpY29uc1wiLFxuICAgICAgXCJCT0lOQyBpY29uIGRlc2lnbmVkIGJ5IE1pY2hhbCBLcmFrb3dpYWsuIENveXJpZ2h0KEMpIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYVwiLFxuICAgICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgICAgXCJCT0lOQ1wiLFxuICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgMTFcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJJUEFkZHJlc3NcIixcbiAgICAxMixcbiAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgXCJMb29rdXAgcHVibGljIGFuZCBsb2NhbCBJUCBhZGRyZXNzZXNcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgXCJwYWdlcy9pcGFkZHJlc3MuaHRtbFwiLFxuICAgIFwiaW1nL2lwLndlYnBcIixcbiAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJJUCBpY29uc1wiLFxuICAgICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgMTJcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJIVE1MTWFya3VwXCIsXG4gICAgMTMsXG4gICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgXCJSZXZlYWwgSFRNTCBzb3VyY2UgY29kZSBhbmQgSmF2YVNjcmlwdFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgXCJpbWcvSFRNTF9zb3VyY2Uud2VicFwiLFxuICAgIFwiSFRNTCBmcmFtZXMgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgIDEzXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiTmV0d29ya3NwZWVkXCIsXG4gICAgMTUsXG4gICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICBcIlRlc3QgdGhlIG5ldHdvcmsgYWRhcHRlcnMgd2l0aCBhIFBvd2VyU2hlbGwgc2NyaXB0XCIsXG4gICAgbmV3IERhdGUoMjAyMywgMywgNyksXG4gICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgIFwiaW1nL3BhZ2Utc3BlZWQud2VicFwiLFxuICAgIFwiU3BlZWQgdGVzdCBkaWFsIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXG4gICAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAgIDE1XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiUG93ZXJTaGVsbGRyaXZlc1wiLFxuICAgIDE3LFxuICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICBcIlNpbWlsYXIgdG8gYW4gSERELCBleGNlcHQgaXQgaXMgb25seSBpbiBQb3dlclNoZWxsXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgIFwicGFnZXMvZHJpdmVzLmh0bWxcIixcbiAgICBcImltZy90ZXJtaW5hbC53ZWJwXCIsXG4gICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBGbGF0IEljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgIDE3XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiTEVBUk5fX0ROU1wiLFxuICAgIDIwLFxuICAgIFwiSG93IEROUyB3b3Jrc1wiLFxuICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDQsIDQpLFxuICAgIFwicGFnZXMvZG5zLmh0bWxcIixcbiAgICBcImltZy9kbnMud2VicFwiLFxuICAgIFwiRE5TIGRyYXdpbmcgYXR0YWNoZWQgdG8gYSBrZXlib2FyZFwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImRucyBpY29uc1wiLFxuICAgICAgXCJEbnMgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkxFQVJOOiBETlNcIixcbiAgICAgIDIwXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiTEVBUk5fX0dvb2dsZVwiLFxuICAgIDIyLFxuICAgIFwiR29vZ2xlIGlzICMxIHdlYnNpdGVcIixcbiAgICBcIkdvb2dsZSBpcyB0aGUgIzEgdHJhZmZpY2tlZCBzaXRlXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTEsIDE5KSxcbiAgICBcInBhZ2VzL2dvb2dsZXBsYXRmb3JtLmh0bWxcIixcbiAgICBcImltZy9zZWFyY2gtZW5naW5lLndlYnBcIixcbiAgICBcIkEgYmFyIGdyYXBoIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJyYW5rIGljb25zXCIsXG4gICAgICBcIlJhbmsgaWNvbnMgY3JlYXRlZCBieSBQaXhlbG1lZXR1cCAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiTEVBUk46IEdvb2dsZVwiLFxuICAgICAgMjJcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJET01cIixcbiAgICAyMyxcbiAgICBcIkRPTVwiLFxuICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNCwgMjcpLFxuICAgIFwicGFnZXMvZG9tLmh0bWxcIixcbiAgICBcImltZy90cmVlLndlYnBcIixcbiAgICBcIkEgdHJlZSBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidHJlZSBpY29uc1wiLFxuICAgICAgXCJUcmVlIGljb25zIGNyZWF0ZWQgYnkganVzdGljb24gLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkRPTVwiLFxuICAgICAgMjNcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJXZWJpZGVcIixcbiAgICAyNCxcbiAgICBcIldlYklERVwiLFxuICAgIFwiVHJ5IHNraXBwaW5nIHRoZSBkb3dubG9hZCBieSB1c2luZyBhIHdlYiBJREVcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA1LCAzKSxcbiAgICBcInBhZ2VzL3dlYmlkZXMuaHRtbFwiLFxuICAgIFwiaW1nL3V4LndlYnBcIixcbiAgICBcIkEgY29tcHV0ZXIgYXBwbGljYXRpb24gaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImRlc2lnbiBpY29uc1wiLFxuICAgICAgXCJEZXNpZ24gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGVzaWduXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIndlYmlkZXNcIixcbiAgICAgIDI0XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiU1ZHXCIsXG4gICAgMjUsXG4gICAgXCJTVkdcIixcbiAgICBcIkZpbmQgYW4gU1ZHIGFuZCBsZWFybiBhYm91dCB0aGUgU1ZHIGxhbmd1YWdlXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNSwgOSksXG4gICAgXCJwYWdlcy9zdmcuaHRtbFwiLFxuICAgIFwiaW1nL3N2Zy5zdmdcIixcbiAgICBcIkFuIHN2ZyBpY29uIGV4YW1wbGUuXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwic2NhbGFibGUgdmVjdG9yIGdyYXBoaWNzXCIsXG4gICAgICBcIlNWRyBpY29uIGNyZWF0ZWQgYnkgSGFydmV5IFJheW5lclwiLFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvXCIsXG4gICAgICBcIlczQ1wiLFxuICAgICAgXCJzdmdcIixcbiAgICAgIDI1XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGlzYWJsZV9KYXZhc2NyaXB0XCIsXG4gICAgMjYsXG4gICAgXCJEaXNhYmxlIEphdmFTY3JpcHRcIixcbiAgICBcIkRpc2FibGUgdGhlIEphdmFTY3JpcHQgdG8gdGVzdCB3ZWJzaXRlIGZ1bmN0aW9uXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNSwgMjIpLFxuICAgIFwicGFnZXMvamF2YXNjcmlwdC5odG1sXCIsXG4gICAgXCJpbWcvc29mdHdhcmUtYXBwbGljYXRpb24ud2VicFwiLFxuICAgIFwiQSBqYXZhc2NyaXB0IGZ1bmN0aW9uIGljb24uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwid2ViIGNvZGluZyBpY29uc1wiLFxuICAgICAgXCJXZWIgY29kaW5nIGljb25zIGNyZWF0ZWQgYnkgTXVoYW1tYWQgQXRpZiAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3dlYi1jb2RpbmdcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgMjZcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJMRUFSTl9fSFRUUFwiLFxuICAgIDI4LFxuICAgIFwiSFRUUFwiLFxuICAgIFwiSFRUUCBtYWtlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmcgd2ViIHBhZ2VzIHBvc3NpYmxlLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDYsIDEyKSxcbiAgICBcInBhZ2VzL2h0dHAuaHRtbFwiLFxuICAgIFwiaW1nL2h0dHAud2VicFwiLFxuICAgIFwiSHR0cCB2ZXJiIGluIGZyb250IG9mIGEgZ2xvYmUgaWNvbi5cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJodHRwIGljb25zXCIsXG4gICAgICBcIkh0dHAgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHR0cFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJMRUFSTjogSFRUUFwiLFxuICAgICAgMjhcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJDU1NkZWZcIixcbiAgICAyOSxcbiAgICBcIkNTU1wiLFxuICAgIFwiQ1NTIHN0eWxlcyB0aGUgZWxlbWVudHMgd2l0aGluIGEgcGFnZS5cIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxOSksXG4gICAgXCJwYWdlcy9jc3MuaHRtbFwiLFxuICAgIFwiaW1nL2Nzcy0zLndlYnBcIixcbiAgICBcIkEgQ1NTIHRocmVlIGxvZ28uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwiY3NzIGljb25zXCIsXG4gICAgICBcIkNzcyBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsIHBlcmZlY3QgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jc3NcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiQ1NTXCIsXG4gICAgICAyOVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkxhdGVuY3lcIixcbiAgICAzMixcbiAgICBcIkxhdGVuY3lcIixcbiAgICBcIlRyYXZlbCBsYXRlbmN5IGNhbiBzbG93IGRvd24gYSB3ZWJzaXRlLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDcsIDE4KSxcbiAgICBcInBhZ2VzL2xhdGVuY3kuaHRtbFwiLFxuICAgIFwiaW1nL2Nocm9ub21ldGVyLndlYnBcIixcbiAgICBcIkEgc3RvcHdhdGNoIGljb24uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGltZXIgaWNvbnNcIixcbiAgICAgIFwiVGltZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGltZXJcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgMzJcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJIVE1MZGVmXCIsXG4gICAgMzMsXG4gICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYW4gSFRNTCBlbGVtZW50XCIsXG4gICAgbmV3IERhdGUoMjAyMywgNywgMjUpLFxuICAgIFwicGFnZXMvaHRtbC5odG1sXCIsXG4gICAgXCJpbWcvaHRtbC53ZWJwXCIsXG4gICAgXCJIVE1MIGVsZW1lbnQgc3ludGF4IGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgMzNcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJVUkxcIixcbiAgICAzNCxcbiAgICBcIlVSTCBBZGRyZXNzIEV4YW1wbGVzXCIsXG4gICAgXCJMZWFybiB0aGUgcGFydHMgYW5kIHN5bnRheCBvZiBhIFVSTFwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDgsIDcpLFxuICAgIFwicGFnZXMvdXJsLmh0bWxcIixcbiAgICBcImltZy93d3cud2VicFwiLFxuICAgIFwiVVJMIGV4YW1wbGUgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInVybCBpY29uc1wiLFxuICAgICAgXCJVcmwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdXJsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAzNFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRhdGFTdG9yYWdlXCIsXG4gICAgMzUsXG4gICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICBcIkxvY2FsIHN0b3JhZ2Ugc2F2ZXMgZGF0YSB3aGVuIG5lZWRlZCBmb3IgY29uY3VycmVudCBwYWdlIHN1cmZpbmcuXCIsXG4gICAgbmV3IERhdGUoMjAyMywgOCwgMTQpLFxuICAgIFwicGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiLFxuICAgIFwiaW1nL3NlcnZlci53ZWJwXCIsXG4gICAgXCJEYXRhIHN0b3JhZ2UgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkRhdGEgU3RvcmFnZVwiLFxuICAgICAgMzVcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJIU0xcIixcbiAgICAzNixcbiAgICBcIkh1ZSwgU2F0dXJhdGlvbiwgYW5kIExpZ2h0bmVzc1wiLFxuICAgIFwiSFNMIGNvbG9ycyBtYW5pcHVsYXRlIGh1ZXMuXCIsXG4gICAgbmV3IERhdGUoMjAyMywgOSwgNiksXG4gICAgXCJwYWdlcy9oc2wuaHRtbFwiLFxuICAgIFwiaW1nL2NvbG9yLXdoZWVsLndlYnBcIixcbiAgICBcIkNvbG9yIHdoZWVsIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ2YXJpZXR5IGljb25zXCIsXG4gICAgICBcIlZhcmlldHkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdmFyaWV0eVwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJIdWUsIFNhdHVyYXRpb24sIGFuZCBMaWdodG5lc3NcIixcbiAgICAgIDM2XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiVG8tRG9fTGlzdFwiLFxuICAgIDM3LFxuICAgIFwiVG8tRG8gTGlzdFwiLFxuICAgIFwiQSBUb0RvIGxpc3QgYXZhaWxhYmxlIHRocm91Z2ggSmF2YVNjcmlwdCBhbmQgbG9jYWxTdG9yYWdlLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDksIDI4KSxcbiAgICBcInBhZ2VzL3RvZG9zLmh0bWxcIixcbiAgICBcImltZy9jaGVjay53ZWJwXCIsXG4gICAgXCJUby1kbyBsaXN0IG5vdGVwYWRcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ0YXNrcyBpY29uc1wiLFxuICAgICAgXCJUYXNrcyBpY29ucyBjcmVhdGVkIGJ5IHBvcGNvcm5hcnRzIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGFza3NcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiVG8tRG8gTGlzdFwiLFxuICAgICAgMzdcbiAgICApXG4gIClcbik7XG5cbi8qKlxuICogXCJHdWlkZSBTaG9ydHMnIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IGd1aWRlU2hvcnRzID0gbmV3IEFycmF5KFxuICBuZXcgV2ViQml0KFxuICAgIFwiSHR0cHNjZXJ0XCIsXG4gICAgNCxcbiAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAyNiksXG4gICAgXCJndWlkZXMvaHR0cHMuaHRtbFwiLFxuICAgIFwiaW1nL2h0dHBzX2NlcnQud2VicFwiLFxuICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgICAgXCJTc2wgY2VydGlmaWNhdGUgaWNvbnMgY3JlYXRlZCBieSBpbmlwYWdpc3R1ZGlvIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICA0XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiU2VhcmNodmVydGljYWxzXCIsXG4gICAgMTQsXG4gICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgIFwiT3B0aW1pemUgeW91ciBzZWFyY2ggZW5naW5lIG5ld3MgYW5kIHJlc3VsdHNcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcbiAgICBcImltZy9zZWFyY2hfc2V0dGluZ3Mud2VicFwiLFxuICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgIDE0XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiU01UUFwiLFxuICAgIDE2LFxuICAgIFwiR1VJREU6IFNNVFAgYW5kIEVtYWlsXCIsXG4gICAgXCJMZWFybiBFbWFpbCBwcm90b2NvbHMgYW5kIHBvcnQgbnVtYmVyc1wiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICBcImd1aWRlcy9zbXRwLmh0bWxcIixcbiAgICBcImltZy9jb21tdW5pY2F0aW9ucy53ZWJwXCIsXG4gICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgMTZcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZ0b29sc1wiLFxuICAgIDE5LFxuICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgYXBwbGljYXRpb24gdGFiXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMywgMjcpLFxuICAgIFwiZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICBcImltZy90b29sLWJveC53ZWJwXCIsXG4gICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgICAgMTlcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZ0b29sc3R3b1wiLFxuICAgIDIxLFxuICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICBcIk9wZW4gdGhlIGRldmVsb3BlcidzIHRvb2xib3ggYW5vdGhlciB3YXlcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcbiAgICBcImltZy90b29sLWJveDIud2VicFwiLFxuICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgMjFcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJQV0FJY29uXCIsXG4gICAgMjcsXG4gICAgXCJHVUlERTogSW5zdGFsbCB0aGUgUFdBIGFwcGxpY2F0aW9uc1wiLFxuICAgIFwiUHJvZ3Jlc3NpdmUgd2Vic2l0ZXMgaGF2ZSBhbiBpbnN0YWxsYXRpb24gb3B0aW9uXCIsXG4gICAgbmV3IERhdGUoMjAyMywgNSwgMjcpLFxuICAgIFwiZ3VpZGVzL3B3YWljb24uaHRtbFwiLFxuICAgIFwiaW1nL2FwcC1kZXZlbG9wbWVudC53ZWJwXCIsXG4gICAgXCJBcHAgZGV2ZWxvcG1lbnQgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImRldmVsb3BtZW50IGljb25zXCIsXG4gICAgICBcIkRldmVsb3BtZW50IGljb25zIGNyZWF0ZWQgYnkgRGVzaWduIENpcmNsZSAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RldmVsb3BtZW50XCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgIDI3XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiQ2xlYXJjb29raWVzXCIsXG4gICAgMzAsXG4gICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgXCJEb24ndCB3YXN0ZSB0aW1lIHNpZnRpbmcgdGhyb3VnaCBzZXR0aW5nc1wiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDcsIDIpLFxuICAgIFwiZ3VpZGVzL2NsZWFyY29va2llc3F1aWNrbHkuaHRtbFwiLFxuICAgIFwiaW1nL2Nvb2tpZXMud2VicFwiLFxuICAgIFwiQnJvd3NlciBjb29raWUgaWNvblwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImNvb2tpZSBpY29uc1wiLFxuICAgICAgXCJDb29raWUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29va2llXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgIDMwXG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiSW5zcGVjdEVsZW1lbnRcIixcbiAgICAzOCxcbiAgICBcIkVsZW1lbnQgSW5zcGVjdFwiLFxuICAgIFwiU2VlIGFuIGVsZW1lbnQncyBtZXRhZGF0YSB1c2luZyBob3ZlciBkZXRhaWxzLlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEwLCA5KSxcbiAgICBcImd1aWRlcy9lbGVtZW50aW5zcGVjdC5odG1sXCIsXG4gICAgXCJpbWcvY2hlY2tlZC53ZWJwXCIsXG4gICAgXCJJbnNwZWN0IGVsZW1lbnQgaWNvbiBkZXBpY3Rpb25cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJpbnNwZWN0aW9uIGljb25zXCIsXG4gICAgICBcIkluc3BlY3Rpb24gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaW5zcGVjdGlvblwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJFbGVtZW50IEluc3BlY3RcIixcbiAgICAgIDM4XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2VG9vbHNFbGVtZW50c1wiLFxuICAgIDM5LFxuICAgIFwiR3VpZGU6IERldiBFbGVtZW50c1wiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgZWxlbWVudHMgdGFiXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTAsIDI4KSxcbiAgICBcImd1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCIsXG4gICAgXCJpbWcvd2ViLWRldmVsb3BtZW50LndlYnBcIixcbiAgICBcIkNvbXB1dGVyIGRlcGljdGlvbiBvZiBkZXZlbG9wZXIncyB0b29sc1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcImRldmVsb3BtZW50IGljb25zXCIsXG4gICAgICBcIkRldmVsb3BtZW50IGljb25zIGNyZWF0ZWQgYnkgRmxhdC1pY29ucy1jb20gLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXZlbG9wbWVudFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHdWlkZTogRGV2IEVsZW1lbnRzXCIsXG4gICAgICAzOVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzQ29uc29sZVwiLFxuICAgIDQwLFxuICAgIFwiR1VJREU6IERldiBDb25zb2xlXCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBjb25zb2xlIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEwLCAyOSksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWwyLndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBDb25zb2xlXCIsXG4gICAgICA0MFxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzU291cmNlc1wiLFxuICAgIDQxLFxuICAgIFwiR1VJREU6IERldiBTb3VyY2VzXCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBzb3VyY2VzIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEwLCAzMCksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWwzLndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBTb3VyY2VzXCIsXG4gICAgICA0MVxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzTmV0d29ya1wiLFxuICAgIDQyLFxuICAgIFwiR1VJREU6IERldiBOZXR3b3JrXCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBuZXR3b3JrIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDEwLCAzMSksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWw0LndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBOZXR3b3JrXCIsXG4gICAgICA0MlxuICAgIClcbiAgKSxcbiAgbmV3IFdlYkJpdChcbiAgICBcIkRldlRvb2xzUGVyZm9ybWFuY2VcIixcbiAgICA0MyxcbiAgICBcIkdVSURFOiBEZXYgUGVyZm9ybWFuY2VcIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIHBlcmZvcm1hbmNlIHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDExLCAxKSxcbiAgICBcImd1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCIsXG4gICAgXCJpbWcvdGVybWluYWw1LndlYnBcIixcbiAgICBcIkljb24gZGVwaWN0aW9uIG9mIGRldmVsb3BlcidzIHRvb2xzXCIsXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBTbWFzaGljb25zIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgIFwiRmxhdGljb25cIixcbiAgICAgIFwiR1VJREU6IERldiBQZXJmb3JtYW5jZVwiLFxuICAgICAgNDNcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc01lbW9yeVwiLFxuICAgIDQ0LFxuICAgIFwiR1VJREU6IERldiBNZW1vcnlcIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIG1lbW9yeSB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMSwgMiksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIixcbiAgICBcImltZy90ZXJtaW5hbDYud2VicFwiLFxuICAgIFwiSWNvbiBkZXBpY3Rpb24gb2YgZGV2ZWxvcGVyJ3MgdG9vbHNcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ0ZXJtaW5hbCBpY29uc1wiLFxuICAgICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IFNtYXNoaWNvbnMgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90ZXJtaW5hbFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogRGV2IE1lbW9yeVwiLFxuICAgICAgNDRcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc1NlY3VyaXR5XCIsXG4gICAgNDUsXG4gICAgXCJHVUlERTogRGV2IFNlY3VyaXR5XCIsXG4gICAgXCJSZXZpZXcgZGV2IHRvb2wncyBzZWN1cml0eSB0YWJcIixcbiAgICBuZXcgRGF0ZSgyMDIzLCAxMSwgMyksXG4gICAgXCJndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiLFxuICAgIFwiaW1nL3NzbC53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBzZWN1cml0eSBpdGVtczogYSBsb2NrIGFuZCBhIHNoaWVsZFwiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcInNzbCBpY29uc1wiLFxuICAgICAgXCJTc2wgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgU2VjdXJpdHlcIixcbiAgICAgIDQ1XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiRGV2VG9vbHNMaWdodGhvdXNlXCIsXG4gICAgNDYsXG4gICAgXCJHVUlERTogRGV2IExpZ2h0aG91c2VcIixcbiAgICBcIlJldmlldyBkZXYgdG9vbCdzIExpZ2h0aG91c2UgdGFiXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMTEsIDE5KSxcbiAgICBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCIsXG4gICAgXCJpbWcvbGlnaHRob3VzZS53ZWJwXCIsXG4gICAgXCJJY29uIGRlcGljdGlvbiBvZiBhIGxpZ2h0aG91c2VcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJsaWdodGhvdXNlIGljb25zXCIsXG4gICAgICBcIkxpZ2h0aG91c2UgaWNvbnMgY3JlYXRlZCBieSBCWlpSSU5DQU5UQVRJT04gLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9saWdodGhvdXNlXCIsXG4gICAgICBcIkZsYXRpY29uXCIsXG4gICAgICBcIkdVSURFOiBEZXYgTGlnaHRob3VzZVwiLFxuICAgICAgNDZcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJEZXZUb29sc0NTU092ZXJ2aWV3XCIsXG4gICAgNDcsXG4gICAgXCJHVUlERTogRGV2IENTUyBPdmVydmlld1wiLFxuICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgQ1NTIE92ZXJ2aWV3IHRhYlwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDExLCAxOSksXG4gICAgXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIixcbiAgICBcImltZy90ZXJtaW5hbDcud2VicFwiLFxuICAgIFwiSWNvbiBkZXBpY3Rpb24gb2YgZGV2ZWxvcGVyJ3MgdG9vbHNcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJ0ZXJtaW5hbCBpY29uc1wiLFxuICAgICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IFNtYXNoaWNvbnMgLSBGbGF0aWNvblwiLFxuICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90ZXJtaW5hbFwiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJHVUlERTogRGV2IENTUyBPdmVydmlld1wiLFxuICAgICAgNDdcbiAgICApXG4gIClcbik7XG5cbi8qKlxuICogXCJFeHBsb3JlIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IGV4cGxvcmVzID0gbmV3IEFycmF5KFxuICBuZXcgV2ViQml0KFxuICAgIFwiTmFzYVwiLFxuICAgIDMsXG4gICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgXCJFeHBsb3JlIHRoZSBOQVNBIGRvbWFpbi4gTGVhcm4gYWJvdXQgdGhlIHVuaXZlcnNlIHZpYSBOQVNBIGxpbmtzXCIsXG4gICAgbmV3IERhdGUoMjAyMiwgMTIsIDE4KSxcbiAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgXCJpbWcvTkFTQS53ZWJwXCIsXG4gICAgXCJOQVNBIEFydGVtaXMgTG9nb1wiLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICBcIk5BU0FcIixcbiAgICAgIFwiSW1hZ2Ugc291cmNlIHZpYSB0aGUgTmF0aW9uYWwgQWVyb25hdXRpY3MgYW5kIFNwYWNlIEFkbWluaXN0cmF0aW9uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3Lm5hc2EuZ292L2F1ZGllbmNlL2ZvcnN0dWRlbnRzLzUtOC9mZWF0dXJlcy9zeW1ib2xzLW9mLW5hc2EuaHRtbFwiLFxuICAgICAgXCJOQVNBXCIsXG4gICAgICBcIk5BU0EgUGFnZXNcIixcbiAgICAgIDNcbiAgICApXG4gICksXG4gIG5ldyBXZWJCaXQoXG4gICAgXCJWaXJ0dWFsdG91clwiLFxuICAgIDE4LFxuICAgIFwiRVhQTE9SRTogVmlydHVhbCBUb3Vyc1wiLFxuICAgIFwiRXhwbG9yZSB0aGUgcmVhbCB3b3JsZCBpbiBhIHdlYiBicm93c2VyXCIsXG4gICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgIFwiZXhwbG9yZS92aXJ0dWFsdG91ci5odG1sXCIsXG4gICAgXCJpbWcvZ29vZ2xlLWV4cGVkaXRpb25zLndlYnBcIixcbiAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICAgIFwiR29vZ2xlIGV4cGVkaXRpb25zIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2dvb2dsZS1leHBlZGl0aW9uc1wiLFxuICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAgIDE4XG4gICAgKVxuICApLFxuICBuZXcgV2ViQml0KFxuICAgIFwiV2ViYlwiLFxuICAgIDMxLFxuICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGVcIixcbiAgICBcIkRpc2NvdmVyIHRoZSBzY2llbmNlIG1pc3Npb24gb2YgTkFTQSdzIEphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIChKV1NUKVwiLFxuICAgIG5ldyBEYXRlKDIwMjMsIDcsIDMpLFxuICAgIFwiZXhwbG9yZS93ZWJidGVsZXNjb3BlLmh0bWxcIixcbiAgICBcImltZy9KV1NUX3Bvc3Rlci53ZWJwXCIsXG4gICAgXCJKYW1lcyBXZWJiIHNwYWNlIHRlbGVzY29wZSBwb3N0ZXIgaW1hZ2VcIixcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgXCJIZXhhZ29uIExpdGhvICgyMDE4KVwiLFxuICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uIHByb3ZpZGVkIGJ5IG5hc2EuZ292XCIsXG4gICAgICBcImh0dHBzOi8vandzdC5uYXNhLmdvdi9jb250ZW50L2ZlYXR1cmVzL2VkdWNhdGlvbmFsL3ByaW50Lmh0bWxcIixcbiAgICAgIFwiandzdC5uYXNhLmdvdlwiLFxuICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uXCIsXG4gICAgICAzMVxuICAgIClcbiAgKVxuKTtcblxuLyoqXG4gKiBNdWx0aWRpbWVuc2lvbmFsIGFycmF5LiBSb3dzIGFyZSB0aGUgZGlmZmVyZW50IHNlY3Rpb25zLiBDb2x1bW5zXG4gKiBjb250YWluIGVhY2ggYXJ0aWNsZSdzIGRhdGEgYmVsb25naW5nIGluIHRoYXQgc2VjdGlvbi5cbiAqL1xuY29uc3QgV0VCQklUREFUQSA9IFthcmJpdHJhcnlBcnRpY2xlcywgZ3VpZGVTaG9ydHMsIGV4cGxvcmVzXTtcbmV4cG9ydCBkZWZhdWx0IFdFQkJJVERBVEE7XG4iLCJcInN0cmljdCBtb2RlXCI7XG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmNvbnN0IHBvcnREZWZpbml0aW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgWzIwLCBcIkZUUC1kYXRhXCJdLFxuICBbMjEsIFwiRlRQXCJdLFxuICBbMjIsIFwiU2VjdXJlIFNTSCAgL1RDUFwiXSxcbiAgWzIzLCBcIlRlbG5ldCAodW5zZWN1cmUpXCJdLFxuICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgWzM3LCBcInRpbWVzZXJ2ZXIgL1RDUC9VRFBcIl0sXG4gIFs0OSwgXCJUQUNBQ1MrXCJdLFxuICBbNTMsIFwiRE5TICAvVURQL1RDUFwiXSxcbiAgWzY3LCBcIkRIQ1BcIl0sXG4gIFs2OCwgXCJESENQXCJdLFxuICBbODAsIFwiSFRUUCAgL1RDUFwiXSxcbiAgWzg4LCBcIktlcmJlcm9zLXNlYyAgL1RDUC9VRFBcIl0sXG4gIFsxMTAsIFwiUE9QIC0gOTk1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICBbMTM1LCBcIlJQQ1wiXSxcbiAgWzEzNywgXCJORVRCSU9TXCJdLFxuICBbMTM4LCBcIk5FVEJJT1NcIl0sXG4gIFsxMzksIFwiTkVUQklPU1wiXSxcbiAgWzE0MywgXCJJTUFQIC0gOTkzIGZvciBlbmNyeXB0ZWRcIl0sXG4gIFsxNjEsIFwiU05NUCAgTWFuYWdlclwiXSxcbiAgWzE2MiwgXCJTTk1QICBBZ2VudFwiXSxcbiAgWzM4OSwgXCJMREFQIC0gNjM2IGZvciBzZWN1cmVcIl0sXG4gIFs0NDMsIFwiSFRUUFMgIC9UQ1BcIl0sXG4gIFs0NDUsIFwiU01CICAvVENQXCJdLFxuICBbNDY1LCBcIlNNVFAgYnkgVExTXCJdLFxuICBbNTE0LCBcIlNZU0xPRyAgL1VEUFwiXSxcbiAgWzU4NywgXCJTTVRQUyBTVEFSVFRMU1wiXSxcbiAgWzYzNiwgXCJMREFQIFNTTFwiXSxcbiAgWzk5MCwgXCJGVFBTXCJdLFxuICBbOTkzLCBcIklNQVAgVExTXCJdLFxuICBbOTk1LCBcIlBPUCBUTFNcIl0sXG4gIFsxODEyLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gIFsxODEzLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gIC8vIFszMzA5LCBcIlNRTCAgL1RDUC9VRFBcIl0sXG4gIFszMjY5LCBcIk1pY3Jvc29mdCBHbG9iYWwgQ2F0YWxvZ1wiXSxcbiAgWzMzODksIFwiUkRQXCJdLFxuXSk7XG5leHBvcnQgZGVmYXVsdCBwb3J0RGVmaW5pdGlvbnM7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJick9wZW4ge1xuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYWJickVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGRlc2NyaXB0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoYWJickVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmFiYnJFbGVtZW50ID0gYWJickVsZW1lbnQ7XG4gIH07XG5cbiAgcHVibGljIHJldmVhbEFiYnJEZXNjcmlwdGlvbigpIHtcbiAgICB0aGlzLmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgbGV0IGFiYnJUaXRsZUF0dHJWYWw6IHN0cmluZyA9IHRoaXMuYWJickVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikgYXMgc3RyaW5nO1xuXG4gICAgICBpZiAoZS50YXJnZXQgPT0gdGhpcy5hYmJyRWxlbWVudCkge1xuICAgICAgICAvL2NyZWF0ZSB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLmFiYnJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0oJHthYmJyVGl0bGVBdHRyVmFsfSkke1N0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgICAgMTYwXG4gICAgICAgICl9YDtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogYXBpR0VUIGlzIGZvciBmZXRjaCByZXF1ZXN0cy4gVXNlIGFuIGFwaUdFVCBvYmplY3QgdG8gbWFuaXB1bGF0ZSB0aGUgZmV0Y2hcbiAqICByZXF1ZXN0IGludG8gZWl0aGVyOlxuICpcbiAqIDEuIHJldHVybmluZyBkYXRhXG4gKlxuICogLS1vciAtLVxuICpcbiAqIDIuIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gdGhlIGJyb3dzZXIgY2FjaGUgdG8gcmV0cmlldmUgbGF0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGdldFVybDogVVJMO1xuICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBnYXRoZXJzIGFsbCB0aGUgbmVlZGVkIGluZm9ybWF0aW9uIGZvciBmZXRjaCBhbmQvb3IgYnJvd3NlclxuICAgKiAgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIGdldFVybCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHBhcmFtIHNlbmRUb0Jyb3dzZXJDYWNoZSAgLSBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGZldGNoIGNhY2hpbmcuXG4gICAqIEBwYXJhbSBicm93c2VyQ2FjaGVOYW1lIC0gSWYgc3RvcmluZyB0aGUgcmVxdWVzdCBpbiBicm93c2VyIGNhY2hlLCB0aGlzIHN0cmluZyBwcm92aWRlcyB0aGUgbmFtZSBmb3Igc3RvcmFnZS5cbiAgICogQHBhcmFtIGVycm9yRWxlbSAtIFNob3VsZCB0aGUgZmV0Y2ggcmVxdWVzdCBmYWlsLCByZXR1cm4gZXJyb3Igc3RhdHVzIHRvIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGdldFVybDogVVJMLFxuICAgIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbixcbiAgICBlcnJvckVsZW06IEhUTUxFbGVtZW50LFxuICAgIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5nZXRVcmwgPSBnZXRVcmw7XG4gICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICB0aGlzLmVycm9yRWxlbSA9IGVycm9yRWxlbTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGVcbiAgICovXG4gIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICB9O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLkdFVFVSTFxuICAgKi9cbiAgcHVibGljIGdldEdldFVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRVcmw7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZsaXAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgYm9vbGVhbiB2YWx1ZSBmcm9tIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPyBmYWxzZSA6IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2ggcmVxdWVzdCBjYW4gdGFrZSBVUkwgb3Igc3RyaW5nIHBhcmFtZXRlci4gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBhcGlHRVRcbiAgICogIG9iamVjdCBmb3IgYSBVUkwgZmV0Y2ggYnkgY3JlYXRpbmcgYSBVUkwgZnJvbSB0aGUgc3RyaW5nLCBvciBwYXNzaW5nIHRoZSBVUkwuXG4gICAqIEBwYXJhbSBnZXRVcmwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqL1xuICBwdWJsaWMgc2V0R2V0VXJsKGdldFVybDogVVJMIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBnZXRVcmwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuZ2V0VXJsID0gbmV3IFVSTChnZXRVcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFVybCA9IGdldFVybDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgcHVibGljIGZ1bmN0aW9uIGNyZWF0aW5nIGEgZGF0YSBwcm9taXNlIG9iamVjdCBmb3IgdGhlIGNhbGxlZCBmZXRjaCBmdW5jdGlvbi4gSWZcbiAgICogIHRoZSByZXF1ZXN0IG5lZWRzIGFkZGVkIHRvIGJyb3dzZXIgc3RvcmFnZSwgdGhlIGZldGNoIGlzIG1hZGUgYW5kIHNlbnQgdG9cbiAgICogIHN0b3JhZ2UuIEEgY2xvbmVkIGNvcHkgb2YgdGhlIGZldGNoZWQgZGF0YSBpcyByZXR1cm5lZCBhbmQgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXNcbiAgICogIHNlbnQgdG8gdGhlIGNhY2hlLiBXaXRob3V0IHNlbmRpbmcgdG8gYnJvd3NlciBjYWNoZSwgdGhlIGZldGNoIGlzIHJlcXVlc3RlZCBhbmRcbiAgICogcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSBnZXRVcmwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGFDYWNoZVByb21pc2U6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBhcGlHZXQoZ2V0VXJsOiBVUkwpIHtcbiAgICAvL0NoZWNrIGlmIHRoZSByZXF1ZXN0IGlzIGZvciBjYWNoZSBzdG9yYWdlXG4gICAgaWYgKHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlKSB7XG4gICAgICAvL1RoZSByZXR1cm5lZCBkYXRhIGlzIHBhY2thZ2VzIGFzIGEgUHJvbWlzZSBvYmplY3RcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAvL09wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICB3aW5kb3cuY2FjaGVzXG4gICAgICAgICAgICAub3Blbih0aGlzLmJyb3dzZXJDYWNoZU5hbWUpXG4gICAgICAgICAgICAudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICAgIGNhY2hlcy5tYXRjaChnZXRVcmwpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vTm8gbWF0Y2hlcyBmb3IgdGhpcyByZXF1ZXN0IGluIFN0b3JhZ2UgQ2FjaGUsIHNvIGZldGNoIHRoZSByZXF1ZXN0IG5vcm1hbGx5XG4gICAgICAgICAgICAgICAgICAvL1Vwb24gc3VjY2VzcywgYSBjbG9uZWQgY29weSB3aWxsIG5lZWQgdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICAgICAgICAgICBmZXRjaChnZXRVcmwpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9Db3B5IHRoZSByZXNwb25zZSBzaW5jZSBpdCBjYW4gb25seSBiZSByZWFkIG9uY2VcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZFJlc3AgPSByZXN1bHQuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcmVzdWx0IHRvIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVkUmVzcC5zdGF0dXMgIT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KGdldFVybCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZFJlc3AuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy9DYWNoZSBoaXQgc3VjY2VzcywgcmV0dXJuIHRoZSByZXNwb25zZSBkYXRhXG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgLy9DYW5ub3Qgb3BlbiBTdG9yYWdlIENhY2hlXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCVjUHJvYmxlbSBvcGVuaW5nIENhY2hlIFN0b3JhZ2UuIE5hbWU6ICR7dGhpcy5icm93c2VyQ2FjaGVOYW1lfWAsIFwiY29sb3I6IGdyZXlcIik7XG4gICAgICAgICAgICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0F0dGVtcHQgcmF3IGZldGNoXG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoZ2V0VXJsKSk7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9taXNlIGVycm9yIG9uIGRhdGEgZmV0Y2guXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vVGhlIHByb21pc2UgaGFzIHJlc29sdmVkIC0tPiByZXR1cm4gdGhlIHByb21pc2UgZGF0YVxuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKGdldFVybCkpO1xuICAgICAgfSk7XG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSByZXF1ZXN0ZWQgcmVzcG9uc2UgaXMgb2YgdmFsaWQgc3RhdHVzICdPSycgYW5kICcyMDAnXG4gICAqIEBwYXJhbSByZXMgLSB0aGUgZmV0Y2hlZCByZXNwb25zZS5cbiAgICogQHJldHVybnMgLSByZXR1cm5zIHJlcy5qc29uKCkgb24gc3VjY2VzcyBvciByZXR1cm5zIHJlc3BvbnNlIG9uIGZhaWx1cmUuXG4gICAqL1xuICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gNDA0KSB7XG4gICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICghcmVzLm9rIHx8IHJlcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLm9rICsgXCI6IFwiICsgcmVzLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBmZXRjaCByZXF1ZXN0LCByZXR1cm5pbmcgYSBmZXRjaCBwcm9taXNlLlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhLnRleHQoKSBvciBkYXRhIGJhc2VkIG9uIHRoZSBpbnN0YW5jZSByZXR1cm5lZC5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEYXRhKGdldFVybDogVVJMKSB7XG4gICAgcmV0dXJuIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHRoaXMuYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlc3BvbnNlKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhlKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBgJHtlLm1lc3NhZ2V9YDtcbiAgICAgIH0pO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJ3YkxpbmsgZnJvbSBcIi4vcndiTGlua1wiO1xuXG4vKipcbiAqIFVzZWQgZm9yIGltYWdlIEF0dHJpYnV0aW9uXG4gKi9cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIFJ3Ykxpbmsge1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICBwdWJsaWMgYXR0cmlidXRlZE93bmVyOiBzdHJpbmc7XG4gIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gIHB1YmxpYyBhcnRpY2xlSWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvKipMaW5rIHRpdGxlICovXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICAvKipMaW5rIGlubmVyIHRleHQgKi9cbiAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAvKiogbGluayBocmVmICovXG4gICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgYXR0cmlidXRlZE93bmVyOiBzdHJpbmcsXG4gICAgLyoqV2ViQml0cyBwYWdlICovXG4gICAgcGFnZU5hbWU6IHN0cmluZyxcbiAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgIGFydGljbGVJZDogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICB0aGlzLmF0dHJpYnV0ZWRPd25lciA9IGF0dHJpYnV0ZWRPd25lcjtcbiAgICB0aGlzLmFydGljbGVJZCA9IGFydGljbGVJZDtcbiAgICBBdHRyaWJ1dGlvbkxpbmsuY291bnQrKztcbiAgfTtcbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluaztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkc1NsaWRlU2hvdyB7XG4gIHB1YmxpYyBzc0NvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIHB1YmxpYyBhcnJvd3NDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwdWJsaWMgcHJldkJ0bjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBuZXh0QnRuOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjYXJkczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD47XG4gIHByaXZhdGUgY2FyZFNob3dRdWFudDogbnVtYmVyO1xuICBwcml2YXRlIGNhcmRJbmR4U3RhcnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY2FyZENvdW50ZXI6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgY2FyZHNJbmR4RW5kOiBudW1iZXI7XG4gIHByaXZhdGUgdHVybjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtYXhUdXJuQ291bnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBzbGlkZVNob3dDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc2xpZGVzaG93XCIpIGFzIEhUTUxFbGVtZW50O1xuICBwcml2YXRlIG51bWJlckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHdpbmRvd1NpemU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihjYXJkczogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4sIHF1YW50aXR5U2hvdzogbnVtYmVyLCB3aW5kb3dTaXplOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhcmRzID0gY2FyZHM7XG4gICAgdGhpcy5jYXJkU2hvd1F1YW50ID0gcXVhbnRpdHlTaG93O1xuICAgIHRoaXMuY2FyZHNJbmR4RW5kID0gdGhpcy5jYXJkU2hvd1F1YW50IC0gMTtcbiAgICB0aGlzLm1heFR1cm5Db3VudCA9IHRoaXMuY2FyZHMubGVuZ3RoIC0gdGhpcy5jYXJkU2hvd1F1YW50O1xuICAgIHRoaXMud2luZG93U2l6ZSA9IHdpbmRvd1NpemU7XG5cbiAgICB0aGlzLmhpZGVPdmVyZmxvd0VsZW1lbnRzKCk7XG4gICAgdGhpcy5vbkluaXRTZXR1cENhcmRQb3NpdGlvbigpO1xuICAgIHRoaXMuc3NDb250YWluZXIgPSB0aGlzLm5ld0NvbnRhaW5lck1hcmt1cCgpO1xuICAgIHRoaXMuYXJyb3dzQ29udGFpbmVyID0gdGhpcy5uZXdBcnJvd3NNYXJrdXAoKTtcbiAgICB0aGlzLm5ld051bWJlckVsZW1lbnQoKTtcbiAgICB0aGlzLmFkZEJ0bkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5zaG93SGlkZVNsaWRlU2hvd0J1dHRvbnMoKTtcbiAgfTtcblxuICBwdWJsaWMgbmV4dFNsaWRlKCkge1xuICAgIGlmICh0aGlzLnR1cm4gPT0gdGhpcy5tYXhUdXJuQ291bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIkxBUkdFXCIpIHtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIH1cbiAgICAgIC8vSGlkZSB0aGUgZmlyc3QgZWxlbWVudCBpbiBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAgICAgLy9Nb3ZlIG1pZGRsZSBlbGVtZW50IHRvIGxlZnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0ICsgMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKC0zNjVweClcIjtcblxuICAgICAgLy9Nb3ZlIHJpZ2h0IHRvIHRoZSBtaWRkbGVcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0ICsgMl0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcblxuICAgICAgLy9EaXNwbGF5IHRoZSBuZXh0IGVsZW1lbnQgZm9yIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiei1pbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAvL01vdmUgaW4gbmV3IGVsZW1lbnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMzY1cHgpXCI7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiTUVESVVNXCIpIHtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIH1cbiAgICAgIC8vSGlkZSB0aGUgZmlyc3QgZWxlbWVudCBpbiBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAgICAgLy9Nb3ZlIHRoZSByaWdodCBlbGVtZW50IHRvIGxlZnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0ICsgMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKC0xODIuNXB4KVwiO1xuXG4gICAgICAvL0Rpc3BsYXkgdGhlIG5leHQgZWxlbWVudCBmb3Igc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ6LWluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG5cbiAgICAgIC8vTW92ZSBpbiBuZXcgZWxlbWVudFxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIlNNQUxMXCIpIHtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIH1cbiAgICAgIC8vSGlkZSB0aGUgZmlyc3QgZWxlbWVudCBpbiBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAgICAgLy9Nb3ZlIGVsZW1lbnQgdG8gbGVmdFxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgtMTgyLjVweClcIjtcblxuICAgICAgLy9Nb3ZlIGVsZW1lbnQgdG8gY2VudGVyXG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCArIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwcHgpXCI7XG5cbiAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInotaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcblxuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAyXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMl0uc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vSW5jcmVtZW50IGluZGV4IGNvdW50ZXJcbiAgICB0aGlzLmNhcmRJbmR4U3RhcnQrKztcbiAgICB0aGlzLmNhcmRzSW5keEVuZCsrO1xuICAgIHRoaXMudHVybisrO1xuICAgIHRoaXMuY2FyZENvdW50ZXIrKztcbiAgfTtcblxuICBwdWJsaWMgcHJldlNsaWRlKCkge1xuICAgIGlmICh0aGlzLnR1cm4gPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiTEFSR0VcIikge1xuICAgICAgLy9IaWRlIHRoZSBsYXN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5zdHlsZS5vcGFjaXR5ID0gXCIwJVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uc3R5bGUuekluZGV4ID0gXCItMVwiO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIH1cbiAgICAgIC8vTW92ZSBtaWRkbGUgZWxlbWVudCB0byB0byB0aGUgcmlnaHRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0ICsgMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDM2NXB4KVwiO1xuXG4gICAgICAvL01vdmUgbGVmdCBlbGVtZW50IHRvIHRoZSByaWdodFxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgwcHgpXCI7XG5cbiAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcblxuICAgICAgLy9Nb3ZlIGluIG5ldyBlbGVtZW50XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgtMzY1cHgpXCI7XG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMud2luZG93U2l6ZSA9PSBcIk1FRElVTVwiKSB7XG4gICAgICAvL0hpZGUgdGhlIGxhc3QgZWxlbWVudCBpbiBzbGlkZXNob3dcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIGlmICh0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgfVxuICAgICAgLy9Nb3ZlIGxlZnQgZWxlbWVudCB0byB0aGUgcmlnaHRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0XS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMTgyLjVweClcIjtcblxuICAgICAgLy9EaXNwbGF5IHRoZSBuZXh0IGVsZW1lbnQgZm9yIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAvL01vdmUgaW4gbmV3IGVsZW1lbnRcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKC0xODIuNXB4KVwiO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJTTUFMTFwiKSB7XG4gICAgICAvL0hpZGUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydF0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmRdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgaWYgKHRoaXMuY2FyZHNbdGhpcy5jYXJkc0luZHhFbmQgKyAxXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRzSW5keEVuZCArIDFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnJlbW92ZUF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZHNJbmR4RW5kICsgMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB9XG4gICAgICAvL01vdmUgZWxlbWVudCB0byByaWdodFxuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnRdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuXG4gICAgICAvL01vdmUgZWxlbWVudCB0byBjZW50ZXJcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcblxuICAgICAgLy9EaXNwbGF5IHRoZSBuZXh0IGVsZW1lbnQgZm9yIHNsaWRlc2hvd1xuICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAxXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDFdLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMV0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuXG4gICAgICBpZiAodGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jYXJkc1t0aGlzLmNhcmRJbmR4U3RhcnQgLSAyXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmNhcmRzW3RoaXMuY2FyZEluZHhTdGFydCAtIDJdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbdGhpcy5jYXJkSW5keFN0YXJ0IC0gMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0luY3JlbWVudCBpbmRleCBjb3VudGVyXG4gICAgdGhpcy5jYXJkSW5keFN0YXJ0LS07XG4gICAgdGhpcy5jYXJkc0luZHhFbmQtLTtcbiAgICB0aGlzLnR1cm4tLTtcbiAgICB0aGlzLmNhcmRDb3VudGVyLS07XG4gIH07XG5cbiAgcHVibGljIGFkZEJ0bkV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIC8vRXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgbmV4dCBhbmQgcHJldmlvdXMgYnV0dG9uc1xuICAgIHRoaXMubmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgdGhpcy5zaG93SGlkZVNsaWRlU2hvd0J1dHRvbnMoKTtcbiAgICAgIHRoaXMubnVtYmVyQXJyb3dUZXh0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5wcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMucHJldlNsaWRlKCk7XG4gICAgICB0aGlzLnNob3dIaWRlU2xpZGVTaG93QnV0dG9ucygpO1xuICAgICAgdGhpcy5udW1iZXJBcnJvd1RleHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgc2hvd0hpZGVTbGlkZVNob3dCdXR0b25zKCkge1xuICAgIGlmICh0aGlzLmNhcmRJbmR4U3RhcnQgPT0gMCkge1xuICAgICAgdGhpcy5wcmV2QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICB0aGlzLnByZXZCdG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FyZHNJbmR4RW5kID09IHRoaXMuY2FyZHMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5uZXh0QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjAlXCI7XG4gICAgICB0aGlzLm5leHRCdG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcmV2QnRuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICB0aGlzLm5leHRCdG4uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgIHRoaXMucHJldkJ0bi5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICB0aGlzLm5leHRCdG4ucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIik7XG4gIH07XG5cbiAgcHVibGljIG51bWJlckFycm93VGV4dCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy53aW5kb3dTaXplID09IFwiU01BTExcIikge1xuICAgICAgdGhpcy5udW1iZXJFbGVtZW50LmlubmVyVGV4dCA9IGAke3RoaXMuY2FyZENvdW50ZXIudG9TdHJpbmcoKX0gb2YgJHt0aGlzLmNhcmRzLmxlbmd0aC50b1N0cmluZygpfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubnVtYmVyRWxlbWVudC5pbm5lclRleHQgPSBgWyR7dGhpcy5jYXJkQ291bnRlci50b1N0cmluZygpfS4uJHsodGhpcy5jYXJkQ291bnRlciArIHRoaXMuY2FyZFNob3dRdWFudCAtIDEpLnRvU3RyaW5nKCl9XSBvZiAke3RoaXMuY2FyZHMubGVuZ3RoLnRvU3RyaW5nKCl9YDtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIG9uUmVzaXplU2hvd1N0YXJ0aW5nRWxlbXMoKSB7XG4gICAgLy9zY3JlZW4gaGFzIHJlZnJlc2hlZC4gY291bnRlciBpcyByZXNldCB0byBzdGFydC4gY2FyZCBlbGVtZW50cyBtYXkgYmVcbiAgICAvL2hpZGRlbiBmcm9tIHRoZSBkaXNwbGF5LCBkZXBlbmRpbmcgb24gd2hlbiB0aGUgcmVmcmVzaCBvY2N1cnJlZCwgc29cbiAgICAvL3Jlc2V0IHRoZSBzdGFydGluZyBlbGVtZW50cyB0byB2aXNpYmxlXG4gICAgLy9TaG93IG92ZXJmbG93IGVsZW1lbnRzXG4gICAgaWYgKHRoaXMuY2FyZEluZHhTdGFydCA8IHRoaXMuY2FyZFNob3dRdWFudCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5jYXJkc0luZHhFbmQ7IGkrKykge1xuICAgICAgICB0aGlzLmNhcmRzW2ldLnN0eWxlLnNldFByb3BlcnR5KFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUuc2V0UHJvcGVydHkoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJTTUFMTFwiKSB7XG4gICAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMHB4KVwiO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJMQVJHRVwiKSB7XG4gICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMHB4KVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGhpZGVPdmVyZmxvd0VsZW1lbnRzKCkge1xuICAgIC8vSGlkZSBvdmVyZmxvdyBlbGVtZW50c1xuICAgIGlmICh0aGlzLmNhcmRJbmR4U3RhcnQgPCB0aGlzLmNhcmRTaG93UXVhbnQpIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcmRzLmxlbmd0aCAtIDE7IGkgPiB0aGlzLmNhcmRzSW5keEVuZDsgaS0tKSB7XG4gICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcbiAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJTTUFMTFwiKSB7XG4gICAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMHB4KVwiO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpbmRvd1NpemUgPT0gXCJNRURJVU1cIikge1xuICAgICAgICAgIHRoaXMuY2FyZHNbaV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDE4Mi41cHgpXCI7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYXJkc1tpXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoMzY1cHgpXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2FyZHNbMF0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIH07XG5cbiAgcHJpdmF0ZSBuZXdDb250YWluZXJNYXJrdXAoKSB7XG4gICAgY29uc3QgbmV3Q29udGFpbmVyU3R5bGVzID0gKCkgPT4ge1xuICAgICAgLy9Db250YWluZXIgc3R5bGVzXG4gICAgICBzbGlkZVNob3dTbGlkZXMuY2xhc3NMaXN0LmFkZChcInNsaWRlc2NvbnRhaW5lclwiKTtcbiAgICAgIHNsaWRlU2hvd1NsaWRlcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgc2xpZGVTaG93U2xpZGVzLnN0eWxlLmhlaWdodCA9IFwiMzJlbVwiO1xuICAgICAgc2xpZGVTaG93U2xpZGVzLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgIHNsaWRlU2hvd1NsaWRlcy5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgIHRoaXMuc2xpZGVTaG93Q29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICB9O1xuXG4gICAgLy9CdWlsZCB0aGUgbWFya3VwIG5lZWRlZCBmb3IgdGhlIHNsaWRlc2hvd1xuICAgIC8vQWRkIGNhcmRzIHRvIGNvbnRhaW5lclxuICAgIGxldCBzbGlkZVNob3dTbGlkZXMgPSB0aGlzLnNsaWRlU2hvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBmb3IgKGxldCBjYXJkIG9mIHRoaXMuY2FyZHMpIHtcbiAgICAgIGxldCB0ZW1wID0gY2FyZDtcbiAgICAgIHNsaWRlU2hvd1NsaWRlcy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGVtcCk7XG4gICAgICBuZXdDb250YWluZXJTdHlsZXMoKTtcbiAgICB9XG4gICAgc2xpZGVTaG93U2xpZGVzLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy53aW5kb3dTaXplfWApO1xuICAgIHJldHVybiBzbGlkZVNob3dTbGlkZXM7XG4gIH07XG5cbiAgcHJpdmF0ZSBuZXdBcnJvd3NNYXJrdXAoKSB7XG4gICAgLy9BZGQgbGVmdCBhbmQgcmlnaHQgYnV0dG9uc1xuICAgIGxldCBzbGlkZXNob3didG5zID0gdGhpcy5zbGlkZVNob3dDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG5cbiAgICAvL0xlZnQgc2xpZGVzaG93IGJ0blxuICAgIGxldCBwcmV2aW91c3NsaWRlc2hvd2J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcHJldmlvdXNzbGlkZXNob3didG4uY2xhc3NMaXN0LmFkZChcInNsaWRlc2hvd1ByZXZcIik7XG4gICAgcHJldmlvdXNzbGlkZXNob3didG4uaW5uZXJUZXh0ID0gXCLina5cIjtcbiAgICBzbGlkZXNob3didG5zLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBwcmV2aW91c3NsaWRlc2hvd2J0bik7XG5cbiAgICAvL1VwZGF0ZSBzbGlkZXNob3cgb2JqZWN0XG4gICAgdGhpcy5wcmV2QnRuID0gcHJldmlvdXNzbGlkZXNob3didG47XG5cbiAgICAvL1JpZ2h0IHNsaWRlc2hvdyBidG5cbiAgICBsZXQgbmV4dHNsaWRlc2hvd2J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgbmV4dHNsaWRlc2hvd2J0bi5jbGFzc0xpc3QuYWRkKFwic2xpZGVzaG93TmV4dFwiKTtcbiAgICBuZXh0c2xpZGVzaG93YnRuLmlubmVyVGV4dCA9IFwi4p2vXCI7XG4gICAgc2xpZGVzaG93YnRucy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbmV4dHNsaWRlc2hvd2J0bik7XG4gICAgc2xpZGVzaG93YnRucy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgc2xpZGVzaG93YnRucy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XG5cbiAgICAvL1VwZGF0ZSBzbGlkZXNob3cgb2JqZWN0XG4gICAgdGhpcy5uZXh0QnRuID0gbmV4dHNsaWRlc2hvd2J0bjtcblxuICAgIHJldHVybiBzbGlkZXNob3didG5zO1xuICB9O1xuXG4gIHByaXZhdGUgbmV3TnVtYmVyRWxlbWVudCgpIHtcbiAgICAvL051bWJlciBlbGVtZW50XG4gICAgdGhpcy5udW1iZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHRoaXMubnVtYmVyQXJyb3dUZXh0KCk7XG4gICAgdGhpcy5uZXh0QnRuLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWJlZ2luXCIsIHRoaXMubnVtYmVyRWxlbWVudCk7XG4gICAgdGhpcy5udW1iZXJFbGVtZW50LnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcFwiO1xuICAgIHRoaXMubnVtYmVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgdGhpcy5udW1iZXJFbGVtZW50LnN0eWxlLmFsaWduQ29udGVudCA9IFwiY2VudGVyXCI7XG4gICAgdGhpcy5udW1iZXJFbGVtZW50LnN0eWxlLm1hcmdpbklubGluZSA9IFwiMS41cmVtXCI7XG4gIH07XG5cbiAgcHJpdmF0ZSBvbkluaXRTZXR1cENhcmRQb3NpdGlvbigpe1xuICAgIHN3aXRjaCAodGhpcy53aW5kb3dTaXplKSB7XG4gICAgICBjYXNlIFwiU01BTExcIjpcbiAgICAgICAgLy9zbWFsbCB3aW5kb3cgc2l6ZSBsb2dpY1xuICAgICAgICB0aGlzLmNhcmRzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgxODIuNXB4KVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzFdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzJdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgIHRoaXMuY2FyZHNbMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bM10uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNRURJVU1cIjpcbiAgICAgICAgLy9tZWRpdW0gd2luZG93IHNpemUgbG9naWNcbiAgICAgICAgdGhpcy5jYXJkc1swXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoLTE4Mi41cHgpXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbMV0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDE4Mi41cHgpXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbMl0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5jYXJkc1syXS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XG4gICAgICAgIHRoaXMuY2FyZHNbMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5jYXJkc1syXS5jaGlsZHJlblsxXS5jaGlsZHJlblszXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkxBUkdFXCI6XG4gICAgICAgIC8vbGFyZ2Ugd2luZG93IHNpemUgbG9naWNcbiAgICAgICAgdGhpcy5jYXJkc1swXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoLTM2NXB4KVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzFdLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzJdLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmNhcmRzWzJdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCgzNjVweClcIjtcbiAgICAgICAgdGhpcy5jYXJkc1szXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmNhcmRzWzNdLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcbiAgICAgICAgdGhpcy5jYXJkc1szXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICB0aGlzLmNhcmRzWzNdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzNdLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiU2NyZWVuIHNpemUgcHJvcGVydHkgbm90IHNldCBvbiBzbGlkZXNob3cuXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBjbGllbnQge1xuICBwdWJsaWMgb2xkVVJMID0gZG9jdW1lbnQucmVmZXJyZXI7XG4gIHB1YmxpYyBicm93c2VycGxhdGZvcm06IHN0cmluZztcbiAgcHVibGljIHVzZXJhZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBwdWJsaWMgY29ubmVjdGlvbnR5cGU7XG4gIHB1YmxpYyBjb25uZWN0aW9ucnR0O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnJvd3NlcnBsYXRmb3JtID0gdGhpcy5zZXRicm93c2VycGxhdGZvcm0oKTtcbiAgICB0aGlzLmNvbm5lY3Rpb250eXBlID0gdGhpcy5zZXRjb25uZWN0aW9udHlwZSgpO1xuICAgIHRoaXMuY29ubmVjdGlvbnJ0dCA9IHRoaXMuc2V0Y29ubmVjdGlvbnJ0dCgpO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0YnJvd3NlcnBsYXRmb3JtKCkge1xuICAgIGlmIChcInVzZXJBZ2VudERhdGFcIiBpbiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICAvL3VzZXJBZ2VudERhdGEgaXMgTmF2aWdhdG9yVUFEYXRhIHR5cGUsIG5vdCBmb3VuZCBpbiBUeXBlU2NyaXB0LlxuICAgICAgLy9Lbm93biB0byBFZGdlIGJyb3dzZXI6IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpXG4gICAgICBsZXQgdXNlckFnZW50RGF0YTogYW55ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnREYXRhIGFzIG9iamVjdDtcbiAgICAgIGxldCBwbGF0Zm9ybWRhdGE6IHN0cmluZyA9IDxzdHJpbmc+dXNlckFnZW50RGF0YS5wbGF0Zm9ybTtcbiAgICAgIHJldHVybiBwbGF0Zm9ybWRhdGE7XG4gICAgfSBlbHNlIHRoaXMuYnJvd3NlcnBsYXRmb3JtID0gXCJcIjtcbiAgfTtcblxuICBwcml2YXRlIHNldGNvbm5lY3Rpb250eXBlKCkge1xuICAgIGlmIChcImNvbm5lY3Rpb25cIiBpbiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICAvL2Nvbm5lY3Rpb24gaXMgTmV0d29ya0luZm9ybWF0aW9uIHR5cGUsIG5vdCBmb3VuZCBpbiBUeXBlU2NyaXB0LlxuICAgICAgLy9Lbm93biB0byBFZGdlIGJyb3dzZXI6IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24pXG4gICAgICBsZXQgY29ubmVjdGlvbjogYW55ID0gd2luZG93Lm5hdmlnYXRvci5jb25uZWN0aW9uIGFzIG9iamVjdDtcbiAgICAgIGxldCBlZmZlY3RpdmV0eXBlOiBzdHJpbmcgPSA8c3RyaW5nPmNvbm5lY3Rpb24uZWZmZWN0aXZlVHlwZTtcbiAgICAgIHJldHVybiBlZmZlY3RpdmV0eXBlO1xuICAgIH0gZWxzZSB0aGlzLmNvbm5lY3Rpb250eXBlID0gXCJcIjtcbiAgfTtcblxuICBwcml2YXRlIHNldGNvbm5lY3Rpb25ydHQoKSB7XG4gICAgaWYgKFwiY29ubmVjdGlvblwiIGluIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIGxldCBjb25uZWN0aW9uOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24gYXMgb2JqZWN0O1xuICAgICAgbGV0IHJ0dDogc3RyaW5nID0gPHN0cmluZz5jb25uZWN0aW9uLnJ0dDtcbiAgICAgIHJldHVybiBydHQ7XG4gICAgfSBlbHNlIHRoaXMuY29ubmVjdGlvbnJ0dCA9IFwiXCI7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBhcGlHRVQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIGZyb20gXCIuL2RpY3Rpb25hcnlTZWFyY2hNYXJrdXBcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuaW1wb3J0IHsgUldCUGFyc2VKU09OIH0gZnJvbSBcIi4vcndiSnNvbkNvbnZlcnRlclwiO1xuaW1wb3J0IHsgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2ggaXMgYSBzZXQgb2YgbWFya3VwIGNyZWF0aW9uIGFuZCBmdW5jdGlvbnMgd2hpY2ggYWxsb3cgYSB1c2VyXG4gKiAgdG8gbG9vayB1cCBhIHdvcmQgbGlrZSBhIERpY3Rpb25hcnkuIFdoZW4gY2FsbGVkLCB0aGUgdXNlcidzIGlucHV0IGlzIHZhbGlkYXRlZFxuICogIGFzIGFuIGFjY2VwdGFibGUgd29yZCBvciBpdCBkZWNsaW5lcyB0aGUgcmVxdWVzdCwgdGhlbiBzaG93aW5nIHRoZSB1c2VyIGlmIHRoZSB3b3JkXG4gKiAgaXMgYWNjZXB0YWJsZS5cbiAqXG4gKiBDcmVhdGluZyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCByZXF1aXJlcyBwYXNzaW5nIGEgcmVmZXJlbmNlIGVsZW1lbnQgKGZvciBhXG4gKiBrbm93biBwbGFjZW1lbnQgbG9jYXRpb24pIHRoYXQgY29udGFpbnMgdGhlICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzcy5cbiAqXG4gKiAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICpcbiAqIEFsbCB0aGUgbmVlZGVkIGVsZW1lbnRzIGFuZCBmdW5jdGlvbmFsaXR5IGFyZSBhZGRlZCB0byB0aGUgcGFnZS5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoIGV4dGVuZHMgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCB7XG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzdGF0aWMgd29yZFN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3Q6IHN0cmluZyA9IFwiUldCX3dvcmRfZmV0Y2hcIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVxdWVzdFVybDogc3RyaW5nID0gXCJodHRwczovL2FwaS5kaWN0aW9uYXJ5YXBpLmRldi9hcGkvdjIvZW50cmllcy9lbi9cIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBjcmVhdGVzIGFsbCB0aGUgZnVuY3Rpb25hbGl0eSBhbmQgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gICAqICBEaWN0aW9uYXJ5IFNlYXJjaCB3aWRnZXQgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBsYWNlIHdpZGdldCBtYXJrdXAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9JbnZva2Ugc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcihlbGVtKTtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAvL0luaXRpYWxpemUgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRXaWRnZXRFdmVudHMoKTtcbiAgICAvL1N0b3JlIHdvcmRzIGNhY2hlIGRhdGEgd2l0aCBpbml0aWFsaXphdGlvbi5cbiAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID0gRGljdGlvbmFyeVNlYXJjaC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gICAgRGljdGlvbmFyeVNlYXJjaC5jb3VudCsrO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBMb2NhbCBTdG9yYWdlIHdvcmRzIHByZXZpb3VzbHkgc3RvcmVkIHdpdGggdGhlIERpY3Rpb25hcnkgU2VhcmNoIFdpZGdldC5cbiAgICpcbiAgICogQHJldHVybnMgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSAtIHRoZXNlIGFyZSB0aGUgd29yZHMgc3RvcmVkIHByZXZpb3VzbHkgaW4gdGhlXG4gICAqICBicm93c2VyIGNhY2hlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkge1xuICAgIC8vTG9jYWwgU3RvcmFnZSAnd29yZC1jYWNoZXMnIGl0ZW1zIGRhdGEgYXNzaWdubWVudFxuICAgIC8vY2FjaGUgcmVzcG9uc2UgbGlua3MgYW5kIGNhY2hlIG5hbWUgYXJlIHByZXZpb3VzbHkgc3RvcmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZVN0cjogc3RyaW5nO1xuICAgIGlmIChSd2JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCB0cnVlLCB0cnVlKSkge1xuICAgICAgLy9UaGUgTG9jYWwgU3RvcmFnZSBpcyBudWxsIG9yIGVtcHR5LS0+IENvbmZpcm0gaGVyZSB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGFueSBDYWNoZSBTdG9yYWdlIGl0ZW1zIGluIGVycm9yXG4gICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jYWNoZXMuaGFzKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpKSB7XG4gICAgICAgICAgd2luZG93LmNhY2hlcy5kZWxldGUoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAvL2NoZWNrIHRoZSB3b3JkLWNhY2hlIHZhbHVlIGZvciBjb3JyZWN0IGpzb24gcGFyc2luZ1xuICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04oc3RvcmFnZVN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHRoaXMuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZC5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkVVJMO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgZmV0Y2hlZCB3b3JkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBjbGljayBhbmQga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB3aWRnZXQuIElucHV0IGV2ZW50IGxpc3RlbmVycyAnY2xpY2snXG4gICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAqICBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQsIHRoZSB3aWRnZXQgYWRhcHRzIG1hcmt1cCBmb3IgdGhhdCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkEgc2VhcmNoIGVsZW1lbnQgaXMgdW5kZWZpbmVkIGZyb20gc2VhcmNoV29yZCB8IHdvcmRTZWFyY2hcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICBjb25zdCBoaWRlUHJldmlvdXNQYW5lbCA9ICgpID0+IHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgIH0pO1xuXG4gICAgLy9cIlByZXZpb3VzIHdvcmQgc2VhcmNoZXNcIiBidXR0b24gZmV0Y2hlcyBsb2NhbGx5IHN0b3JlZCB3b3Jkc1xuICAgIC8vQ2xpY2tpbmcgdGhlIGJ1dHRvbiBkaXNwbGF5cyBlYWNoIHdvcmQgaW4gYSBsaXN0IHdpdGhpbiB0aGUgd2lkZ2V0XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpO1xuICAgIH0pO1xuXG4gICAgLy9cIlJlZnJlc2hcIiBidXR0b24gcmVsb2FkcyB0aGUgcGFnZVxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgY2hlY2tjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKCkge1xuICAgIGNvbnN0IHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgIGxldCBidXR0b25Db250YWluZXIgPSB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZHNDb250YWluZXI7XG5cbiAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRvciBhbmQgd29yZCBjYWNoZXMgZm9yIHVuZGVmaW5lZFxuICAgIGlmIChwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9PSBudWxsIHx8IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgICAgY29uc3Qgbm9Xb3Jkc0hlYWRpbmdFbGVtID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQsIGJ1dHRvbkNvbnRhaW5lcik7XG4gIH07XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBhbnksIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBpZiAocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcmV2aW91c3dvcmRidXR0b25zOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9XG4gICAgICB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSwgYnV0dG9uQ29udGFpbmVyKTtcbiAgICBmb3IgKGxldCBidG4gb2YgcHJldmlvdXN3b3JkYnV0dG9ucykge1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgbmV3IGJ1dHRvbi5cbiAgICAgIC8vdGhpcyBpcyB0aGUgY2FjaGVkIHdvcmQgYnV0dGVuLiB3aGVuIGl0J3MgY2xpY2tlZCwgZmlyZSBhIHdvcmQgc2VhcmNoXG4gICAgICBidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCB0cnVlLCBidG4ud29yZCk7XG4gICAgICB9KTtcbiAgICAgIC8vTU9CSUxFXG4gICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKCkgPT4ge1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCI1MCU7XCI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vd2hlbiBmb2N1cyAoc3VjaCBhcyB1c2luZyBrZXlib2FyZCBvbmx5KSwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoZTogYW55KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgfSk7XG4gICAgICAvL3doZW4gbm90IGZvY3VzZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0ZSBidXR0b25cbiAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UoYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkcyB0aGUgd29yZCB0byB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgY29udGFpbmluZyB3b3JkIGRhdGEsIFVSTCwgYW5kIGNhY2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V2YWx1ZSAtIFRoaXMgaW50ZXJmYWNlIHN0b3JlcyBpbmZvcm1hdGlvbiB3aGVyZSBzZW5kaW5nIHRvIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIGFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdldmFsdWU6IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAvL0xvZyB0aGUgd29yZCBjYWNoZSBjcmVhdGlvblxuICAgIGNvbnN0IGFkZGVkd29yZGNhY2hlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNBZGRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXZhbHVlLndvcmR9YCxcbiAgICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtcIlxuICAgICAgKTtcbiAgICB9O1xuICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V2YWx1ZScgbmVlZHMgYWRkZWQgdG8gbG9jYWwgc3RvcmFnZSBjYWNoZVxuICAgIC8vTG9jYWwgc3RvcmFnZSBtYXkgYmUgZW1wdHkgb3IgYWxyZWFkeSBoYXZpbmcgdGhlIHdhbnRlZCBzZWFyY2hlZCB3b3JkXG4gICAgLy9DaGVjayBzdG9yYWdlIGlzIG5vdCBudWxsLiBJZiBpdCBpcywgYWRkIHRoZSB3b3JkLlxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIGlmIChSd2JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICAgIC8vQWRkIHRoZSBzdG9yYWdlIHdvcmQgdG8gYW4gYXJyYXlcbiAgICAgICAgbGV0IHdvcmRTdG9yZTogbG9jYWxzdG9yYWdld29yZFtdID0gW107XG4gICAgICAgIHdvcmRTdG9yZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcbiAgICAgICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgICAgbGV0IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih3b3JkU3RvcmUpKTtcbiAgICAgICAgaWYgKCFzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5wYXNzZWQpIHtcbiAgICAgICAgICAvL3N0cmluZ2lmeSBvYmplY3QgZGlkIG5vdCB3b3JrLCBzbyByZXR1cm5cbiAgICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkLnJldHVybnN0cjtcblxuICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGlzIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIGpzb25zdHIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJWM8UldCPiVjQ3JlYXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLFxuICAgICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgICApO1xuICAgICAgICBhZGRlZHdvcmRjYWNoZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9Mb2NhbCBzdG9yYWdlIGlzIG5vdCBlbXB0eS4gSGVyZSwgd2UgbmVlZCB0byBhZGQgdGhlIHdvcmQgdG8gdGhlIGV4aXN0aW5nIHdvcmQgY2FjaGUuXG4gICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy9NYXRjaCB0aGUgY3VycmVudCBVUkwgZm9yIGNhY2hlIG1hbmFnZW1lbnRcbiAgICBmb3IgKGxldCBjYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gbG9jYWxzdG9yYWdldmFsdWUud29yZFVSTCkge1xuICAgICAgICAvL1dvcmQgaXMgYWxyZWFkeSBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIC8vTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgIC8vTE9HTEVBRlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIC8vQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgYWxsY2FjaGUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgIGxldCBzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZiAoIXN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnBhc3NlZCkge1xuICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnJldHVybnN0cjtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgcHJldmlvdXMgd29yZCBkYXRhIGZyb20gYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgLS0+IEtleS9WYWx1ZVxuICAgKiBkYXRhIHJlZmVyZW5jaW5nIHdvcmRzIHN0b3JlZCBpbiBsb2NhbCBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXdvcmQgLSBzdHJpbmcgZnJvbSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIiBidXR0b25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXdvcmQ6IHN0cmluZykge1xuICAgIC8vUmVtb3ZlIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2UsIENhY2hlIFN0b3JhZ2VcbiAgICAvL0NoZWNrIGxvY2FsIHN0b3JhZ2UgaXMgbm90IG51bGwgb3IgZW1wdHlcbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9HZXQgdGhlIHdvcmRzIGFycmF5IGZyb20gTG9jYWwgU3RvcmFnZVxuICAgIC8vUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShcIkRpY3Rpb25hcnlXaWRnZXRcIiwgXCJ3b3JkLWNhY2hlc1wiKTsgLy9sb2cgd2hldGhlciBmZXRjaGVkIHdvcmQgY2FjaGUgaXMgbnVsbCBvciBlbXB0eS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG5cbiAgICAvL1JlbW92ZSB0aGUgd29yZCBmcm9tIENhY2hlIFN0b3JhZ2UgYW5kIExvY2FsIFN0b3JhZ2Ugd29yZCBhcnJheVxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKHdvcmRDYWNoZS53b3JkID09IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkQ2FjaGUud29yZFVSTCk7XG4gICAgICAgIGFsbGNhY2hlLnNwbGljZShhbGxjYWNoZS5pbmRleE9mKHdvcmRDYWNoZSksIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXdvcmR9YCxcbiAgICAgICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsY2FjaGUubGVuZ3RoID09IDApIHtcbiAgICAgIC8vVGhlIHJlbW92ZWQgd29yZCB3YXMgdGhlIGxhc3Qgd29yZCBpbiB0aGUgYXJyYXksIHNvIHJlbW92ZSB0aGUgY29udGFpbmVyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICBsZXQgd29yZGNhY2hlc3N0cmZ5dGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZiAoIXdvcmRjYWNoZXNzdHJmeXRlc3QucGFzc2VkKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL1JldHVybiByZW1haW5pbmcgd29yZHMgdG8gTG9jYWwgU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgd29yZGNhY2hlc3N0cmZ5dGVzdC5yZXR1cm5zdHIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmZXRjaCByZXF1ZXN0IGZyb20gQ2FjaGUgU3RvcmFnZS4gVXRpbGl6ZXNcbiAgICogRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCBmb3IgY2FjaGUgbmFtZS5cbiAgICogQHBhcmFtIHJlbW92ZVVSTFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkw6IFVSTCkge1xuICAgIHdpbmRvdy5jYWNoZXMub3BlbihEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KS50aGVuKGNhY2hlID0+IHtcbiAgICAgIGNhY2hlcy5tYXRjaChyZW1vdmVVUkwpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIG1hdGNoaW5nIHRoZSByZXN1bHQuIFJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgICBjYWNoZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5kZWxldGUocmVtb3ZlVVJMKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZHluYW1pY2FsbHkgcmVjYWxscyBhIHdvcmQgZGVmaW5pdGlvbiByZXF1ZXN0IGFuZCBpbnN0YW50aWF0ZXMgYXBpR0VUKCkuIFRoZVxuICAgKiByZXR1cm5lZCBwcm9taXNlIGFsc28gZHltYW5pY2FsbHkgYW5zd2VycyB0aGUgd2lkZ2V0IG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCBzZWFyY2hlZCBmcm9tIHdpZGdldCBpbnB1dC5cbiAgICogQHBhcmFtIHdvcmRVcmwgLSBUaGUgZmV0Y2ggcmVxdWVzdCBVUkwuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gc2VuZFRvQ2FjaGUgLSA/IFNlbmQgZmV0Y2ggcmVxdWVzdCB0byBDYWNoZSBTdG9yYWdlIDogRmV0Y2ggd2l0aG91dCBzdG9yaW5nIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gY2FjaGVOYW1lIC0gSWYgc2VuZGluZyBmZXRjaCByZXF1ZXN0cyB0byBjYWNoZSwgcHJvdmlkZSBhIG5hbWUgdG8gc3RvcmUgaXQgdW5kZXIuXG4gICAqIEByZXR1cm5zIC0gd29yZERhdGE6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICB3b3JkOiBzdHJpbmcsXG4gICAgd29yZFVybDogVVJMLFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsXG4gICAgc2VuZFRvQ2FjaGU6IGJvb2xlYW4sXG4gICAgY2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIC8vQSBmdW5jdGlvbiBjYWxsIHBhcmFtZXRlciBvcHRpb24gaXMgdG8gc3RvcmUgdGhlIHdvcmQgcmVxdWVzdCBpbiBicm93c2VyJ3MgQ2FjaGUgU3RvcmFnZVxuICAgIC8vU3RydWN0dXJlIHRoZSB3b3JkIGRhdGEgdmlhICdsb2NhbHN0b3JhZ2V3b3JkdmFsdWUnIGludGVyZmFjZSB1c2VkIHRocm91Z2hvdXQgZmV0Y2hpbmdcbiAgICBsZXQgd29yZGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkID0ge1xuICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICB3b3JkOiB3b3JkLFxuICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgIH07XG5cbiAgICAvL0FzeW5jaHJvbm91cyBmZXRjaCByZXFldXN0IGFuZCBkeW5hbWljIG1hcmt1cCBjcmVhdGlvbiBmcm9tIHRoZSBkYXRhJ3MgcmV0dXJuXG4gICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vQ2FsbCBhcGlHRVQoKSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgIGNvbnN0IHdvcmRGZXRjaCA9IG5ldyBhcGlHRVQoXG4gICAgICAgIHdvcmRjYWNoZS53b3JkVVJMLFxuICAgICAgICB3b3JkY2FjaGUuaW5DYWNoZSxcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLFxuICAgICAgICB3b3JkY2FjaGUuY2FjaGVOYW1lXG4gICAgICApO1xuICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW47XG5cbiAgICAgIC8vRmV0Y2ggcmVxdWVzdCBtZXRob2QgY2FsbC4gUmV0dXJuZWQgZGF0YSBtYXkgYmUgdGhlIHdvcmQgZGVmaW5pdGlvblxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3b3JkRmV0Y2guYXBpR2V0KHdvcmRGZXRjaC5nZXRHZXRVcmwoKSk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGEgc3RyaW5nLCBpdCBpcyB0aGUgd29yZCBkZWZpbml0aW9uIGRhdGEuXG4gICAgICAgIG5vRGVmaW5pdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihkYXRhKSk7XG4gICAgICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICAgIH1cbiAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYW4gb2JqZWN0LCBjb25maXJtIGl0IGlzICdubyBkZWZpbml0aW9uJyBzZXJ2ZXIgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgICAgICAvL05vIGRlZmluaXRpb25zIHdlcmUgZm91bmQgd2hlbiBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIGEgdGl0bGUgcHJvcGVydHlcbiAgICAgICAgICAvL3dvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIlxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIgJiYgd29yZGNhY2hlLmluQ2FjaGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy9UaGUgZGF0YSBzdHJlYW0gaGVyZSBpcyB3aXRob3V0IHdvcmQgZGF0YS4gVGhpcyBmdW5jdGlvbiBhd2FpdHMgdGhlIGFwaSBmZXRjaCdzIGRhdGFcbiAgICAgICAgICAgIC8vdG8gY29tcGxldGUgc3RvcmFnZS9wcm9taXNlIHJldHVybnMuIEl0IHdhaXRzIDUgc2Vjb25kcyBmb3IgdGhlIGJyb3dzZXIgdG8gY29tcGxldGUgaXRzIHN0b3JlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy90aGVuIHJlbW92ZXMgdGhlIHVud2FudGVkIGNhY2hlIHJlcXVlc3QuXG4gICAgICAgICAgICAvL1RPRE86QlVHUkVTRUFSQ0g9PkR1cmluZyB0aGUgNSB0aW1lb3V0LCBpZiB0aGUgcGFnZSByZWZyZXNoZXMgYSAnYmFkIHdvcmQnIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgLy9UaGlzICdiYWQgd29yZCcgY2FuIGJlIHJlbW92ZWQgYnkgZGVsZXRpbmcgYWxsIHByZXZpb3VzIHdvcmRzIHZpYSBVSSBhbmQgcmVmcmVzaGluZyB0aGUgcGFnZS4gVGhpcyB3aWxsXG4gICAgICAgICAgICAvLyBmaXJlIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB0byBjbGVhciBhbnkgbWlzbWF0Y2hlZCB3b3JkZGF0YTwtLT5jYWNoZWRyZXF1ZXN0cy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0Z1bmN0aW9uIGF3YWl0aW5nIHJlcXVlc3QncyBDYWNoZSBTdG9yYWdlIGNhY2hpbmdcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHZXRVcmwoKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IHJlbW92ZSBmcm9tIENhY2hlIFN0b3JhZ2UuIE5hbWU6IFwiLCB3b3JkRmV0Y2guZ2V0R2V0VXJsKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBub0RlZmluaXRpb25zKSB7XG4gICAgICAgIC8vR29vZCBkYXRhLS0+IHJldHVybiBkYXRhIGZvciBtYXJrdXAgcmVuZGVyXG4gICAgICAgIC8vJ0JhZCBkYXRhJyBkdWUgdG8gXCJObyBkZWZpbml0aW9ucyBmb3VuZFwiLCBpbnZhbGlkIHdvcmQsIGJhZCBuZXR3b3JrIGNvbm5lY3Rpb25cbiAgICAgICAgaWYgKCFuYXZpZ2F0b3Iub25MaW5lKSB7XG4gICAgICAgICAgLy9PbmxpbmUsIHByb2JsZW0gd2l0aCBmZXRjaFxuICAgICAgICAgIC8vT2ZmbGluZSByZXF1ZXN0XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9EZWZpbml0aW9ucykge1xuICAgICAgICAgIC8vU2VydmVyIHJldHVybmVkIG5vIGRlZmluaXRpb25zIGRhdGFcbiAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkY2FjaGUpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBsZXQgd29yZERhdGEgPSB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHdvcmREYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtIGF3YWl0cyBhIHByb21pc2UsIGZldGNoaW5nIGEgZGljdGlvbmFyeSB0ZXJtLiBUaGUgZGF0YVxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCB3b3JkOiBzdHJpbmcsIHdvcmRVUkw6IFVSTCkge1xuICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgbGV0IHdvcmREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgcmVzb2x2ZShcbiAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHdvcmQsXG4gICAgICAgICAgd29yZFVSTCxcbiAgICAgICAgICBzZWFyY2hFbGVtcyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3RcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB3b3JkRGF0YVByb21pc2UudGhlbigoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLndvcmREYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIHNlYXJjaEVsZW1zKTtcbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBPYmplY3QuaGFzT3duKGRhdGEsIFwidGl0bGVcIikpIHJldHVybjtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZXRyaWV2ZWQgd29yZDogJHt3b3JkfWAsIFwiY29sb3I6Z29sZDtmb250LXdlaWdodDpib2xkO1wiLCBcImNvbG9yOmdvbGQ7XCIpO1xuICAgICAgLy8gUmVtb3ZlIHVubmVlZGVkIGNsYXNzZXMgaWYgYXBwbGllZCBwcmV2aW91c2x5XG4gICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICBpc0Zyb21QcmV2aW91c1dvcmRzOiBib29sZWFuLFxuICAgIGNhY2hlZFdvcmQ6IGxvY2Fsc3RvcmFnZXdvcmQgfCBudWxsXG4gICkge1xuICAgIGlmIChpc0Zyb21QcmV2aW91c1dvcmRzKSB7XG4gICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBjYWNoZWRXb3JkLndvcmQsIGNhY2hlZFdvcmQud29yZFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRha2UgdXNlciBpbnB1dCBhbmQgZmlsdGVyIHRvIGFuIGFjY2VwdGVkIHN0cmluZ1xuICAgICAgbGV0IGFjY2VwdGVkSW5wdXRXb3JkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICB0aGlzLndvcmRWYWxpZGF0aW9uKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUpXG4gICAgICAgID8gKGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSlcbiAgICAgICAgOiAoYWNjZXB0ZWRJbnB1dFdvcmQgPSBmYWxzZSk7XG4gICAgICBpZiAoYWNjZXB0ZWRJbnB1dFdvcmQpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgVVJMIG9mIHRoZSBhY2NlcHRlZCB3b3JkIGZvciB1c2UgaW4gdGhlIGZldGNoIGNhbGxcbiAgICAgICAgdGhpcy53b3JkVVJMID0gbmV3IFVSTChzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLnRvU3RyaW5nKCksIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybCk7XG4gICAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMsIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsIHRoaXMud29yZFVSTCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9IFwiXCI7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICB9O1xuXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWNUaGVyZSBpcyBubyBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCwgXCJjb2xvcjogb3JhbmdlO1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByaW1hcnkgd2lkZ2V0IG1hcmt1cCBzdHJ1Y3R1cmluZyB0aGUgd2lkZ2V0IGVsZW1lbnRzIGFuZCBzZWFyY2ggaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IGJlZm9yZSB0aGUgd2lkZ2V0LlxuICAgKiBAcmV0dXJucyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIC0tPiBpbnRlcmZhY2Ugb2ZcbiAgICogIGltcG9ydGFudCBIVE1MIGVsZW1lbnRzIHVzZWQgdGhyb3VnaCB3aWRnZXQgZnVuY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtOiBFbGVtZW50KSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgIGlmIChkaWN0aW9uYXJ5ID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgd2lkZ2V0IGVsZW1lbnRzXG4gICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG5cbiAgICAvLyBSZXR1cm4gZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICBsZXQgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyA9IHtcbiAgICAgIHNlYXJjaFdvcmQ6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICBkaWN0aW9uYXJ5RWxlbTogPEhUTUxFbGVtZW50PmRpY3Rpb25hcnksXG4gICAgICBlcnJvckVsZW06IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpLFxuICAgICAgcHJldmlvdXNXb3JkQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgcHJldmlvdXNXb3Jkc0NvbnRhaW5lcjogZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxcbiAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgfTtcblxuICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc2VhcmNoXCIpO1xuICAgIHByZXZpb3VzV29yZHMuY2xhc3NMaXN0LmFkZChcInByZXZpb3VzV29yZHNcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJTZWFyY2guLi5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlNlYXJjaFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmlkID0gXCJzZWFyY2gtd29yZFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guaWQgPSBcIndvcmQtc2VhcmNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uaW5uZXJUZXh0ID0gXCJSZWZyZXNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lci5pZCA9IFwiZGljdGlvbmFyeS1idG5zXCI7XG4gICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG5cbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzID0gc2VhcmNoRWxlbWVudHM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1hcmt1cCB0byBob3VzZSByZXR1cm5lZCB3b3JkcyBmcm9tIERpY3Rpb25hcnlTZWFyY2guIFRoZSBtYXJrdXBcbiAgICogIGlzIGNyZWF0ZWQgYmFzZWQgb24gQVBJIGVncmVzcy4gV29yZHMgYW5kIHRoZWlyIGRlZmluaXRpb25zIHZhcnkuIFRoZSBtYXJrdXAgaXNcbiAgICogIGFkYXB0aXZlIHRvIHJldHVybmVkIHdvcmQgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZERhdGEgLSBUaGlzIHBhcmFtZXRlciBpcyBhbiBvYmplY3Qgb2Ygd29yZCB0eXBlcywgZGVmaW5pdGlvbnMsIGFuZCBleGFtcGxlcy5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKHdvcmREYXRhOiBhbnksIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMpIHtcbiAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCAhKHdvcmREYXRhIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIiVjVGhlcmUgaXMgbm8gZGVmaW5pdGlvbiBmb3IgdGhpcyB3b3JkLlwiLCBcImNvbG9yOmRhcmtncmVlbjtcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWRkIHdvcmQgZGVmaW5pdGlvbiB0byB0aGUgZGljdGlvbmFyeSB3aWRnZXRcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPSBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICApO1xuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbiA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuXG4gICAgLy8gVGhlIHdvcmQgZGF0YSByZXByZXNlbnRzIGNvbXBsZXggSlNPTiBvYmplY3RcbiAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIndvcmRcIiwgd29yZC53b3JkKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgZGVmaW5pdGlvblAudGV4dENvbnRlbnQgPSBkZWYuZGVmaW5pdGlvbjtcbiAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIik7XG5cbiAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBpZiAobmV3UCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgIG5ld1BpLnRleHRDb250ZW50ID0gZGVmLmV4YW1wbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwiZXhhbXBsZVwiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2hlY2sgaWYga2V5IFwiZXhhbXBsZVwiIGlzIGluIGRlZmluaXRpb24uIElmIGl0IGlzLCBhZGQgdGhlIGV4YW1wbGUgdG8gbGlzdFxuICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9jcmVhdGUgY2xlYXIgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICApO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIndvcmQtY2xlYXJcIik7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGhvdmVyZWQsIGRpc3BsYXkgaXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBldmVudCA9PiB7XG4gICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjEwMCVcIjtcbiAgICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgbm90IGhvdmVyZWQsIGhpZGUgaXRcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjUwJVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGNsaWNrZWQsIGNsZWFyIHRoZSBlbGVtZW50c1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY1JlbW92ZWQgd29yZDogJHtkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuZ2V0QXR0cmlidXRlKFwid29yZFwiKX1gLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtcIlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGNsZWFyIGJ1dHRvbiB0byB3aWRnZXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICBwdWJsaWMgY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyhcbiAgICB3b3Jkc3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdLFxuICAgIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcbiAgKSB7XG4gICAgbGV0IGJ1dHRvbnNhcnI6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID0gW107XG5cbiAgICAvL0JlY2F1c2UgdGhlIGxvY2F0b3IgYW5kIHRoZSBMb2NhbCBTdG9yYWdlIHZhbHVlcyBhcmUgdmlhYmxlLCBjcmVhdGUgdGhlIG1hcmt1cFxuICAgIC8vbmVlZGVkIHRvIGRpc3BsYXkgdGhvc2Ugd29yZHMuIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpZGdldCBmdW5jdGlvbmFsaXR5LlxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiB3b3Jkc3RvcmFnZSkge1xuICAgICAgY29uc3Qgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICBjb25zdCBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSA9IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b24tY2xlYXJcIik7XG4gICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSB3b3JkQ2FjaGUud29yZDtcblxuICAgICAgbGV0IHByZXZpb3Vzd29yZGJ0bjogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzID0ge1xuICAgICAgICB3b3JkOiB3b3JkQ2FjaGUsXG4gICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtOiBjYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyOiB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIsXG4gICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtOiBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgIH07XG4gICAgICBidXR0b25zYXJyLnB1c2gocHJldmlvdXN3b3JkYnRuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbnNhcnI7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKiBUaGlzIG9iamVjdCBjcmVhdGVzIGFuIGFycmF5IG9mIGRpdiBlbGVtZW50cyBmcm9tIHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uKi9cbmV4cG9ydCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiB3aWRnZXQgb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyB3aWRnZXRjb3VudDogbnVtYmVyID0gMDtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyB3aXRoaW4gdGhlIHdpZGdldCBpbnN0YW50aWF0ZWQgW2ZsYXNoY2FyZHNdICovXG4gIHB1YmxpYyBzdGF0aWMgdG90YWxmbGFzaGNhcmRzOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgbV9mbGFzaGNhcmRzQXJyOiBIVE1MTElFbGVtZW50W10gPSBbXTtcbiAgcHVibGljIGZsYXNoY2FyZHNjb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtX3BvcnRJbmZvTWFwOiBNYXA8YW55LCBzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHBvcnRudW1iZXJzTWFwOiBNYXA8YW55LCBzdHJpbmc+KSB7XG4gICAgdGhpcy5tX3BvcnRJbmZvTWFwID0gcG9ydG51bWJlcnNNYXA7XG4gICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG4gICAgRmxhc2hjYXJkQ2FyZEVsZW1zLndpZGdldGNvdW50Kys7XG5cbiAgICB0aGlzLm1fcG9ydEluZm9NYXAuZm9yRWFjaChwb3J0ID0+IHtcbiAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG5cbiAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICk7XG4gICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpO1xuICAgICAgaW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIsIFwidmVydGljYWxcIik7XG4gICAgICBmbGlwZnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgIGZsaXBiYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgZ2FtZUNhcmRTcGFuLmlubmVyVGV4dCA9IGBQb3J0IyAke21hcEl0ZXIubmV4dCgpLnZhbHVlfWA7XG4gICAgICBnYW1lQ2FyZEJhY2tTcGFuLmlubmVyVGV4dCA9IGAke3BvcnR9YDtcblxuICAgICAgdGhpcy5mbGFzaGNhcmRzY291bnQrKztcbiAgICAgIEZsYXNoY2FyZENhcmRFbGVtcy50b3RhbGZsYXNoY2FyZHMrKztcblxuICAgICAgLy8gQWRkIGRpdiB0byBmbGFzaGNhcmQgaW5zdGFuY2VcbiAgICAgIHRoaXMubV9mbGFzaGNhcmRzQXJyLnB1c2goZmxhc2hjYXJkKTtcbiAgICB9KTtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4vd2ViQml0XCI7XG5pbXBvcnQgUldCQ2FyZCBmcm9tIFwiLi9yd2JDYXJkXCI7XG5pbXBvcnQgUndiRXJyb3IgZnJvbSBcIi4vcndiRXJyb3JCdXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tV2ViQml0cyB7XG4gIHB1YmxpYyBjYXJkc1NlY3Rpb246IEhUTUxEaXZFbGVtZW50O1xuICBwdWJsaWMgY2FyZHNEYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudCwgY2FyZHNEYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNhcmRzU2VjdGlvbiA9IGNhcmRzU2VjdGlvbjtcbiAgICB0aGlzLmNhcmRzRGF0YSA9IGNhcmRzRGF0YTtcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFxuICAgIHNlY3Rpb25UaXRsZTogc3RyaW5nLFxuICAgIHNlY3Rpb25IZWFkaW5nSUQ6IHN0cmluZyxcbiAgICBjb250YWluZXJUeXBlPzogc3RyaW5nXG4gICkge1xuICAgIC8vIENyZWF0ZSBzZWN0aW9uYWwgZWxlbWVudHMgdG8gYXBwZW5kIHRvIG1haW5cbiAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgIGlmIChwYWdlTWFpbiA9PSBudWxsIHx8IHBhZ2VNYWluLm5vZGVOYW1lICE9PSBcIk1BSU5cIikge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJNYWluUldCXCIsIFwibWFpblwiLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDcmVhdGUgY2FyZCBzZWN0aW9uIGVsZW1lbnRzXG4gICAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjYXJkc1wiPlxuICAgIC8vICAgICA8aDI+QXJiaXRyYXJ5IEFydGljbGVzOjwvaDI+XG4gICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkX2NvbHVtbnNcIj5cblxuICAgIC8vICAgICA8L2Rpdj5cbiAgICAvLyA8L3NlY3Rpb24+XG4gICAgLy9cbiAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBsZXQgYWFIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhSGVhZGluZyk7XG4gICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhQ2FyZHNTZWN0aW9uKTtcbiAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcblxuICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XG4gICAgc3dpdGNoIChjb250YWluZXJUeXBlKSB7XG4gICAgICBjYXNlIFwic2xpZGVzaG93XCI6XG4gICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX2NvbHVtbnNcIiwgXCJjYXJkc2xpZGVzaG93XCIsIFwiZ3JpZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYWNjb3JkaW9uXCI6XG4gICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX2NvbHVtbnNcIiwgXCJjYXJkYWNjb3JkaW9uXCIsIFwiZ3JpZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9jb2x1bW5zXCIsIFwiZ3JpZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGFhSGVhZGluZy5pbm5lclRleHQgPSBgJHtzZWN0aW9uVGl0bGV9YDtcbiAgICBhYUhlYWRpbmcuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VjdGlvbkhlYWRpbmdJRCk7XG5cbiAgICByZXR1cm4gYWFDYXJkc1NlY3Rpb247XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBidWlsZFJXQkNhcmRzKGNhcmRzRGF0YTogV2ViQml0W10pIHtcbiAgICAvLyBJdGVyYXRlIGVhY2ggY2FyZCBpbiB0aGUgYXJyYXkuIEJ1aWxkIHRoZSBjYXJkIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICByZXR1cm4gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogV2ViQml0KSA9PiB7XG4gICAgICBjb25zdCByd2JjYXJkID0gbmV3IFJXQkNhcmQoKTtcbiAgICAgIHJldHVybiByd2JjYXJkLmJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlKTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGJ1aWxkUldCSW50cm9kdWN0aW9uKCkge1xuICAgIGxldCBpbnRyb2R1Y3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBsZXQgVGl0bGUgPSBpbnRyb2R1Y3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpKTtcbiAgICBUaXRsZS5jbGFzc0xpc3QuYWRkKFwiVGl0bGVcIik7XG4gICAgVGl0bGUuaW5uZXJUZXh0ID0gXCJIb21lIHwgQXJiaXRyYXJ5IFdlYiBCaXRzXCI7XG4gICAgbGV0IGgyID0gaW50cm9kdWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgaDIuaW5uZXJUZXh0ID0gXCJOZXcgdG8gdGhlIFdlYj9cIjtcbiAgICBsZXQgcGFyYTEgPSBpbnRyb2R1Y3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgIHBhcmExLmlubmVyVGV4dCA9XG4gICAgICBcIklmIHlvdSBhcmUgbmV3IHRvIHdlYiBkZXZlbG9wbWVudCwgdGhlcmUgYXJlIGlubnVtZXJvdXMgZW51bWVyYXRpb25zIG9mIHN0dWZmIGFuZCB0aGluZ3MgdGhlIFdvcmxkIFdpZGUgV2ViIG9mZmVycyB0aGF0IHlvdSBkb24ndCBrbm93LlwiO1xuICAgIGxldCBwYXJhMiA9IGludHJvZHVjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgcGFyYTIuaW5uZXJUZXh0ID0gXCJZb3UgbWF5IHdhbnQgdG8gc3RhcnQgYnkgY2xhaW1pbmcgYSBzdGFrZSB0byBhIGRvbWFpbiBuYW1lLlwiO1xuXG4gICAgcmV0dXJuIGludHJvZHVjdGlvbjtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vYXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL3dlYkJpdFwiO1xuaW1wb3J0IHsgUldCQ2FyZEVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCQ2FyZCB7XG4gIC8qKlxuICAgKiBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgKi9cbiAgcHJpdmF0ZSByd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cztcblxuICAvKipcbiAgICogIE1hcCBXZWJCaXQgZGF0YSB0byBhIGNhcmQgZWFjaFxuICAgKlxuICAgKiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICogICAgICA8ZGl2PlxuICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICogICAgICA8L2Rpdj5cbiAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJvZHlcIj5cbiAgICogICAgICAgICAgPGgzPjwvaDM+XG4gICAqICAgICAgICAgIDxwPjwvcD5cbiAgICogICAgICAgICAgPGEgaHJlZj1cIlwiPjwvYT5cbiAgICogICAgICA8L2Rpdj5cbiAgICogIDwvZGl2PlxuICAgKi9cbiAgcHVibGljIGJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlOiBXZWJCaXQpIHtcbiAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cyA9IHtcbiAgICAgIGNhcmRJbWc6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksXG4gICAgICBjYXJkSW1nVG9wOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgY2FyZEJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgfTtcbiAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGxldCBjYXJkQm9keVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZXQgY2FyZEJvZHlMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5UGFyYSk7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcblxuICAgIC8vIEFkZCBjYXJkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgV2ViQml0LmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpO1xuICAgIFdlYkJpdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHthcnRpY2xlLmlkfWApO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiKTtcbiAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBhcnRpY2xlLmNhcmRJbWFnZSk7XG4gICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgYXJ0aWNsZS5jYXJkSW1hZ2VBTFQpO1xuICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKFwiQXJ0aWNsZVwiLCBhcnRpY2xlLmFydGljbGVOdW1iZXIudG9TdHJpbmcoKSk7XG4gICAgY2FyZEJvZHlMaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgYXJ0aWNsZS5hcnRpY2xlTGluayk7XG4gICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcbiAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgIGNhcmRCb2R5TGluay50ZXh0Q29udGVudCA9IFwiR28gdG8gUGFnZVwiO1xuXG4gICAgLy8gSW1hZ2UgYXR0cmlidXRpb24gbWF5IGJlIG5lZWRlZCBmb3IgdGhlIGltYWdlIHVzZWRcbiAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICBpZiAoYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pIHtcbiAgICAgIHRoaXMuYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbCh0aGlzLnJ3YmNhcmRlbGVtZW50cywgYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pO1xuICAgIH1cblxuICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgIC8vIEFkZCB0aGUgbWFya3VwIHRvIHRoZSBjb250YWluaW5nIGVsZW1lbnRcbiAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcCk7XG4gICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5KTtcblxuICAgIHJldHVybiBXZWJCaXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAqIG90aGVyd2lzZSB0aGUgZGF0YSBpc24ndCBlbnRlcmVkLCBjYXVzaW5nIGEgbWlzc1xuICAgKlxuICAgKiAgPGRpdiBjbGFzcz1cImZsaXAtY2FyZFwiPjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAqICA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEZyb250XCI+XG4gICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgKiAgICAgIDwvZGl2PlxuICAgKiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRCYWNrXCI+XG4gICAqICAgICAgICAgICAgICAgPGgzPjwvaDM+XG4gICAqICAgICAgICAgICAgICAgPHA+PC9wPlxuICAgKiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiIGNsYXNzPVwiaW1nU21hbGwgaW1nUFRSXCI+XG4gICAqICAgICAgICAgICA8L2Rpdj5cbiAgICogICAgICA8L2Rpdj5cbiAgICogIDwvZGl2PjwhLS1lbmQgY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgKiBAcGFyYW0gcndiY2FyZGVsZW1lbnRzIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAqIEBwYXJhbSBsaW5rIEF0dHJpYnV0aW9uIGxpbmtcbiAgICovXG4gIHByaXZhdGUgYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChyd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cywgbGluazogQXR0cmlidXRpb25MaW5rKSB7XG4gICAgaWYgKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmdldEF0dHJpYnV0ZShcIkFydGljbGVcIikgPT09IGxpbmsuYXJ0aWNsZUlkLnRvU3RyaW5nKCkpIHtcbiAgICAgIC8vIENyZWF0ZSBpbWFnZSBiYWNrIHBhbmVsIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgIC8vIFJlZGVmaW5lIGNhcmQgaW1hZ2UgcGFuZWwgYXMgYSBmbGlwIHBhbmVsXG4gICAgICBjb25zdCBjYXJkSW5uZXIgPSByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGNhcmRGcm9udCA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChyd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7IC8vIG1vdmUgaW1hZ2Ugd2l0aGluIGNhcmQgZnJvbnQgZGl2aXNvclxuICAgICAgbGV0IHNtYWxsSW1nID0gPEhUTUxJbWFnZUVsZW1lbnQ+cndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgYmFja0hlYWRpbmcgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgY2FyZEJhY2suYXBwZW5kQ2hpbGQoc21hbGxJbWcpO1xuICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVMaW5rID0gcndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTsgLy9hcHBlbmQgdG8gZnJvbnQgcGFuZWxcblxuICAgICAgLy8gQWRkIGZsaXAtcGFuZWwgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgIHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIik7XG4gICAgICBjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIpO1xuICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICBzbWFsbEltZy5jbGFzc0xpc3QuYWRkKFwiaW1nU21hbGxcIiwgXCJpbWdQVFJcIik7XG4gICAgICBjYXJkQmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIik7XG4gICAgICBhdHRyaWJ1dGVMaW5rLmNsYXNzTGlzdC5hZGQoXCJhdHRyaWJ1dGVcIik7XG4gICAgICBiYWNrSGVhZGluZy50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZE93bmVyO1xuICAgICAgYmFja1BhcmEudGV4dENvbnRlbnQgPSBsaW5rLmlubmVyVGV4dDtcbiAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgIGF0dHJpYnV0ZUxpbmsudGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZE93bmVyO1xuICAgIH1cbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ3YkVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBSd2JFcnJvci5jb3VudCsrO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tFbGVtZW50Zm9yTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAgY3NzUXVlcnk6IHN0cmluZyxcbiAgICBsb2dNZXNzYWdlPzogYm9vbGVhbixcbiAgICBzdXByZXNzRXhjZXB0aW9uPzogYm9vbGVhblxuICApIHtcbiAgICBsZXQgZWxlbTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTsgLy9Mb2cgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlOyAvL1N1cHJlc3MgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmIChzdXByZXNzRXhjZXB0aW9uKSBzdXByZXNzZXhjcHQgPSB0cnVlO1xuICAgIGxldCBxdWVyeTogc3RyaW5nID0gYCR7Y3NzUXVlcnl9YDtcblxuICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICB0cnkge1xuICAgICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoXCJHZXRFbGVtZW50XCIsIGBDb3VsZCBub3QgZ2V0IGVsZW1lbnQ6ICcke3F1ZXJ5fSdgKSk7XG4gICAgfVxuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLmluZm8oYCVjTm8gZWxlbWVudCBmb3VuZCB3aXRoIHF1ZXJ5OiAke3F1ZXJ5fS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgaWYgKCFzdXByZXNzZXhjcHQpXG4gICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudE5hbWV9TnVsbFJlZmVyZW5jZWAsIGBFbGVtZW50IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBjaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgY2hlY2tFbXB0eVN0cmluZz86IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZT86IGJvb2xlYW5cbiAgKSB7XG4gICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICBpZiAobG9nbXNzZykgY29uc29sZS5pbmZvKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50TmFtZX0uYCwgXCJjb2xvcjpwdXJwbGU7XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjaGVja0VtcHR5U3RyaW5nKSByZXR1cm4gUndiRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lLCBrZXksIGxvZ21zc2cpO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCBsb2dNZXNzYWdlPzogYm9vbGVhbikge1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoIWxvZ01lc3NhZ2UpIGxvZ21zc2cgPSBsb2dNZXNzYWdlO1xuICAgIGxldCB0ZXN0OiBzdHJpbmcgfCBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIGdldCBsb2NhbCBzdG9yYWdlIGtleTogJHtrZXl9YCk7XG4gICAgfVxuICAgIGlmICh0ZXN0ID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLndhcm4oYCVjTG9jYWwgc3RvcmFnZSBrZXkgbm90IGZvdW5kOiAke2tleX0uYCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgS2V5IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGVzdCA9PSBcIlwiIHx8IHRlc3QgPT0gXCJbXVwiKSB7XG4gICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgY29uc29sZS53YXJuKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgVmFsdWUgaXMgZW1wdHlgKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcmVmZXJlbmNlIGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUndiUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBSZWZlcmVuY2VFcnJvciB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVmRXJyb3I6IFJlZmVyZW5jZUVycm9yO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBlcnIgPSBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLnJlZkVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgcmVmZXJlbmNlIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5yZWZFcnJvcixcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YlJlZmVyZW5jZUVycm9yLmNvdW50Kys7XG4gIH07XG5cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBzeW50YXggZXJyb3IgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBSd2JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHBhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBzeW50YXhFcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgIHRoaXMuc3ludGF4RXJyb3IgPSBlcnI7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGAlYzxSV0I+JWNFeGVjdXRpb24gZXhwZXJpZW5jZWQgYSBzeW50YXggZXJyb3I6XFxuJW9cXG4lYzwvUldCPmAsXG4gICAgICBcImNvbG9yOnJlZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgXCJjb2xvcjpyZWQ7XCIsXG4gICAgICB0aGlzLnN5bnRheEVycm9yLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIlxuICAgICk7XG4gICAgUndiU3ludGF4RXJyb3IuY291bnQrKztcbiAgfTtcblxufVxuXG5leHBvcnQgY2xhc3MgUndiRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHN0YWNrOiBhbnk7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgZG9tRXJyb3I6IERPTUV4Y2VwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgZXJyb3I6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSBlcnJvcjtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLmRvbUVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgRE9NIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5zdGFjayxcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YkRvbUV4Y2VwdGlvbi5jb3VudCsrO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgUndiU3ludGF4RXJyb3IgfSBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKiogQW4gUldCUGFyc2VKU09OIHBhcnNlcyBqc29uIGFuZCBzdG9yZXMgdGhlIHBhcnNlZCBzdHJpbmcgd2l0aCB0aGUgcmVzdWx0LiAqL1xuZXhwb3J0IGNsYXNzIFJXQlBhcnNlSlNPTiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyByZXR1cm5vYmo6IG9iamVjdDtcbiAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwYXJzZXN0cjogc3RyaW5nO1xuXG4gIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICogSlNPTiBvYmplY3QuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJzZXN0cjogc3RyaW5nKSB7XG4gICAgUldCUGFyc2VKU09OLmNvdW50Kys7XG4gICAgdGhpcy5wYXJzZXN0ciA9IHBhcnNlc3RyO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5SV0JwYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIFJXQnBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5vYmogPSBKU09OLnBhcnNlKHRoaXMucGFyc2VzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJub2JqID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbn1cblxuLyoqIEFuIFJXQlBhcnNlSlNPTiB0ZXN0cyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gYmUgc3RyaW5naWZpZWQgaW50byBhIHZhbGlkXG4gKiBqc29uIHN0cmluZy4gKi9cbmV4cG9ydCBjbGFzcyBSV0JTdHJpbmdpZnlKU09OIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIHJldHVybnN0cjogc3RyaW5nO1xuICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICBwcml2YXRlIGpzb246IGFueTtcbiAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgKiBKU09OIG9iamVjdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGpzb246IGFueSkge1xuICAgIFJXQlN0cmluZ2lmeUpTT04uY291bnQrKztcbiAgICB0aGlzLmpzb24gPSBqc29uO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIHBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5zdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmpzb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJuc3RyID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogSFRNTCBsaW5rIGVsZW1lbnQgZGF0YS4gVXNlZCB3aXRoIGFuY2hvciB0YWdzLlxuICovXG5jbGFzcyBSd2JMaW5rIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgLyoqSFRNTCB0aXRsZSBhdHRyaWJ1dGUgKi9cbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIC8qKklubmVyIHRleHQgc3RyaW5nICovXG4gIHB1YmxpYyBpbm5lclRleHQ6IHN0cmluZztcbiAgLyoqVGhlIHBhZ2UgdGhlIGxpbmsgaXMgYXNzb2NpYXRlZCB0byAqL1xuICBwdWJsaWMgcGFnZU5hbWU6IHN0cmluZztcbiAgLyoqSFRNTCBocmVmIGF0dHJpYnV0ZSAqL1xuICBwdWJsaWMgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgcGFnZU5hbWU6IHN0cmluZyxcbiAgICBoUmVmZXJlbmNlOiBzdHJpbmdcbiAgKSB7XG4gICAgKHRoaXMudGl0bGUgPSB0aXRsZSksXG4gICAgICAodGhpcy5pbm5lclRleHQgPSBpbm5lclRleHQpLFxuICAgICAgKHRoaXMucGFnZU5hbWUgPSBwYWdlTmFtZSksXG4gICAgICAodGhpcy5oUmVmZXJlbmNlID0gaFJlZmVyZW5jZSksXG4gICAgICBSd2JMaW5rLmNvdW50Kys7XG4gIH07XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBSd2JMaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzdGFydE1hcms6IFBlcmZvcm1hbmNlTWFyaztcbiAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrO1xufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUndiUGVyZiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc2NyaXB0UnVudGltZU1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgIG5hbWU6IG51bGwsXG4gICAgc3RhcnRNYXJrOiBudWxsLFxuICAgIGVuZE1hcms6IG51bGwsXG4gIH07XG5cbiAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuICovXG4gIGNvbnN0cnVjdG9yKHNjcmlwdE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLm5hbWUgPSBzY3JpcHROYW1lO1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZX0tc3RhcnRgKTtcbiAgICBSd2JQZXJmLmNvdW50Kys7XG4gIH07XG5cbiAgLyoqIENhbGwgZW5kKCkgdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC4gKi9cbiAgcHVibGljIGVuZCgpIHtcbiAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5lbmRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfS1lbmRgKTtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgfTtcblxuICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICBwcml2YXRlIG1lYXN1cmUoKSB7XG4gICAgbGV0IG1lYXN1cmUgPSBwZXJmb3JtYW5jZS5tZWFzdXJlKFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZSxcbiAgICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyay5uYW1lLFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MuZW5kTWFyay5uYW1lXG4gICAgKTtcbiAgICByZXR1cm4gY29uc29sZS5kZWJ1ZyhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiwgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKlxuICogVG8gY3JlYXRlIGEgVG9Eb0xpc3QsIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2UgbXVzdCBoYXZlICcuVG9Eb0xpc3QnIGNsYXNzLiBDYWxsIHRoZVxuICogIGNsYXNzIGNvbnN0cnVjdG9yLCBwYXNzaW5nIGluIHRoYXQgZWxlbWVudCB0byBjcmVhdGUgdGhlIHdpZGdldC5cbiAqXG4gKiAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG4gKiAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICpcbiAqIFRoZW4sIHRoZSB3aWRnZXQgaXMgY3JlYXRlZCBhbmQgVG8tRG9zIGFyZSByZXRyaWV2ZWQgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgVG9Eb0xpc3Qge1xuICAvKipUb3RhbCBudW1iZXIgb2YgVG9ET3MqL1xuICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAvKipXaWRnZXQgZWxlbWVudHMgdXNlZCB0byBwb3B1bGF0ZSB0b2RvcyAqL1xuICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gIHByaXZhdGUgc3RhdGljIFRvRG9JblN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdO1xuICAvKipUb2RvIEhUTUwgZWxlbWVudHMgKi9cbiAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAqXG4gICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAqIEBwYXJhbSBUb0RvRWxlbWVudHMgV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICogIHRoZSBsaXN0IG1hcmt1cCwgcGFzc2luZyBpbiBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciBwbGFjZW1lbnQgb2YgdGhlIHdpZGdldC5cbiAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgLy9Td2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvXCI6XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbFwiOlxuICAgICAgY2FzZSBcIi9pbmRleC5odG1sXCI6XG4gICAgICBjYXNlIFwiL1wiOlxuICAgICAgY2FzZSBcIi9kaXN0L2luZGV4Lmh0bWxcIjpcbiAgICAgICAgLy9NYXJrdXAgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpKTtcbiAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIikpO1xuICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikpO1xuICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Zm9vdFwiKSk7XG4gICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSk7XG4gICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGZvb3RcIikpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICB0Ym9keS5pZCA9IFwiVG9Eb0l0ZW1zXCI7XG4gICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvcGFnZXMvdG9kb3MuaHRtbFwiOlxuICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSBkdWUgdG8gY2FjaGUgZW1wdHlcbiAgICAgICAgY29uc3QgaHRib2R5ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZUJvZHk7XG4gICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiXG4gICAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAqL1xuICBwcml2YXRlIHN0YXRpYyBnZXRUb0RvSW5TdG9yYWdlKFxuICAgIGNoZWNrZW1wdHl2YWx1ZXN0cmluZzogYm9vbGVhbixcbiAgICBsb2dtZXNzYWdlOiBib29sZWFuXG4gICkge1xuICAgIGlmIChcbiAgICAgIFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFxuICAgICAgICBcIlRvRG9MaXN0XCIsXG4gICAgICAgIFwiVG9Eb3NcIixcbiAgICAgICAgY2hlY2tlbXB0eXZhbHVlc3RyaW5nLFxuICAgICAgICBsb2dtZXNzYWdlXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBwYXJzZXN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVG9Eb3NcIik7XG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihwYXJzZXN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgLy9wYXJzZWQgSlNPTiBpcyBtYWxmb3JtZWRcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiVG9Eb3NcIik7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCxcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5Ub0RvSW5TdG9yYWdlID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICogQHJldHVybnMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzXG4gICAqL1xuICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgLy9FYWNoIHdpZGdldCBsb2NhdGlvbidzIGVsZW1lbnRzIG1heSB2YXJ5LCBzbyBhIGNhbGwgb2YgZ2V0VG9Eb0xpc3RFbGVtZW50cygpXG4gICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNUb0RPIHRhYmxlXCIpLFxuICAgICAgdG9kb1RhYmxlQm9keTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUb0RvSXRlbXNcIiksXG4gICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQWRkQnV0dG9uXCIpLFxuICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICB9O1xuICAgIHRoaXMubGlzdEVsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS5cbiAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAqL1xuICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIC8vQWRkIHRoZSBUb0RvcyBhcnJheSB0byBsb2NhbCBjYWNoZS5cbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICB9O1xuICAgIGxldCBUb0RvczogYW55ID0gW107IC8vVG9EbyBhcnJheVxuICAgIGxldCBzdHJnZnk7XG5cbiAgICBjb25zdCBzdHJpbmdpZnl0b2RvID0gKHRvZG9zdHI6IGFueSkgPT4ge1xuICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgIGxldCB0b2Rvc3N0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHRvZG9zdHIpKTtcbiAgICAgIGlmICghdG9kb3NzdHJnZnl0ZXN0LnBhc3NlZCkge1xuICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvZG9zc3RyZ2Z5dGVzdC5yZXR1cm5zdHI7XG4gICAgfTtcbiAgICAvL0ZpcnN0LCByZWFkIGN1cnJlbnQgTG9jYWwgU3RvcmFnZSBUb0Rvc1xuICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICBpZiAodG9kb3NzdG9yYWdlY2FjaGUpIHtcbiAgICAgIFRvRG9zID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gY2FjaGUga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCVjPFJXQj4lY0FkZGVkIHRvLWRvIGNhY2hlOiAke2Rlc2NyaXB0aW9ufWAsXG4gICAgICBcImNvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Y3lhbjtcIlxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICogIHB1bGxlZCBpbmRpdmlkdWFsbHkgZnJvbSB0aGUga2V5LXZhbHVlIHBhaXIgb2JqZWN0LlxuICAgKiBAcGFyYW0gaXRlbSAtIHRoZSBUby1EbyBpdGVtIHJlcXVlc3RlZCB0byByZW1vdmVcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcihcbiAgICAgIHRvZG8gPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbVxuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIGNhY2hlOiAke2l0ZW19YCxcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47XCJcbiAgICApO1xuICAgIGxldCB0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdCA9IE9iamVjdC5jcmVhdGUoXG4gICAgICBuZXcgUldCU3RyaW5naWZ5SlNPTihUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlKVxuICAgICk7XG4gICAgaWYgKCF0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdC5wYXNzZWQpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQganNvbnN0ciA9IHRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnJldHVybnN0cjtcbiAgICBpZiAoanNvbnN0ciA9PSBcIlwiIHx8IGpzb25zdHIgPT0gXCJbXVwiKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlRvRG9zXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb0Rvc1wiLCBqc29uc3RyKTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAqICBBIHJvdyBjb25zaXN0cyBvZiB0aHJlZSBjb2x1bW5zOiBhIGNvbXBsZXRlIHRpY2stYm94LCBhIGRlc2NyaXB0aW9uLCBhbmQgYSBkZWxldGUgYnV0dG9uLlxuICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICovXG4gIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgLy9DcmVhdGUgYSB0YWJsZSByb3cgd2l0aCBjaGVja2JveCBhbmQgZGVsZXRlIG9wdGlvbnNcbiAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBuZXdSb3cgPSB0YWJsZUZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTsgLy9BZGQgcm93XG4gICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgY29uc3QgY2hlY2tCT1ggPSBmaXJzdENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpOyAvL0FkZCBjaGVja2JveFxuICAgIGNvbnN0IG5ld0lURU0gPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICBjb25zdCBkZWxCT1ggPSBzZWNvbmRDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTsgLy9BZGQgZGVsZXRlYm94XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcIm51bVwiLFxuICAgICAgVG9Eb0xpc3QuVG9ET3NcbiAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1RvRE8gdGRbbnVtXVwiKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvTGlzdC5Ub0RPc1xuICAgICAgICAgICAgKS50b1N0cmluZygpO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgOiAoMSkudG9TdHJpbmcoKVxuICAgICk7XG4gICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uOyAvL1BvcHVsYXRlIHNlY29uZCBjb2xcbiAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcblxuICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAvL0FkZCB0byBsaXN0IHN0b3JhZ2VcbiAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsXG4gICAgICBcImNvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Z29sZDtcIlxuICAgICk7XG5cbiAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIHRoZSBUby1EbyBpdGVtIHJvd3MgZnJvbSBUby1Eb3Mgc3RvcmVkIGluIHRoZSBicm93c2VyIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgaWYgKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UodHJ1ZSwgZmFsc2UpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5BZGRUb0RvUm93KFRvRG9MaXN0LlRvRG9JblN0b3JhZ2VbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICovXG4gIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRCdXR0b247XG4gICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgIGlmIChBRERCVVRUT04gPT0gbnVsbCAmJiBBRERJVEVNRU5URVIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgfVxuICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3QgZnJvbSBjbGlja2luZyB0aGUgYWRkIGJ1dHRvbiovXG4gICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG4gICAgLyoqQWRkIGlucHV0IHRleHQgdG8gdGhlIHRvZG8gbGlzdCB3aGVuIHVzaW5nIGtleSBlbnRlciovXG4gICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgICAgaWYgKGUuY29kZSA9PSBcIk51bXBhZEVudGVyXCIgfHwgZS5jb2RlID09IFwiRW50ZXJcIikge1xuICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAqICBub3QgcmVtb3ZlZCBmcm9tIHN0b3JhZ2Ugd2l0aG91dCAnQ29tcGxldGU/JyBjaGVja2Vib3ggY2hlY2tlZC5cbiAgICogQHBhcmFtIGJveCBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIERlbGV0ZUJ1dHRvbihib3g6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICBib3gucGFyZW50Tm9kZSA9PSBudWxsIHx8XG4gICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCB8fFxuICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyA9PSBudWxsXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGEgdGFibGUgZWxlbWVudC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmdcbiAgICApO1xuICAgIC8qKiBJbnB1dCBlbGVtZW50ICovXG4gICAgY29uc3Qgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICBjb25zdCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICApO1xuICAgIGxldCBpID0gdHIucm93SW5kZXg7XG4gICAgY29uc3QgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgLy9yZW1vdmUgcm93IHNpbmNlIGNvbXBsZXRlZFxuICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO1wiXG4gICAgICApO1xuICAgICAgaWYgKHZhbHVlICE9IFwiQWRkIGEgVG9ETyBJdGVtLlwiKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG5cbiAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCxcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7XCJcbiAgICAgICk7XG4gICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gc2VlZCB0aGUgVG8tRG8gTGlzdCB3aGVuIHRoZXJlIGFyZSBubyBMb2NhbCBTdG9yYWdlIGl0ZW1zXG4gICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKGZhbHNlLCB0cnVlKSkgcmV0dXJuO1xuICAgIC8vQ3JlYXRlIGEgc2FtcGxlIGVudHJ5IGluIHRoZSBUb0RvIHRhYmxlIGFzIGEgcGxhY2Vob2xkZXJcbiAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG4gICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICBUb0RvTGlzdC5Ub0RPcysrO1xuXG4gICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG86ICR7dGQyREVMLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtcIlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL2F0dHJpYnV0aW9uTGlua1wiO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaG9sZHMgdGhlIGRhdGEgZm9yICdXZWJCaXQnIGFydGljbGUgY2FyZHMuIEtleSBpbmZvcm1hdGlvblxuICogb2YgdGhlIGFydGljbGUncyBjb250ZW50cyBhcmUgY29udGFpbmVkOiBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0YSBjcmVhdGVkLFxuICogZXRjLlxuICovXG5jbGFzcyBXZWJCaXQge1xuICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGFydGljbGVOdW1iZXI6IG51bWJlcjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBkYXRlQ3JlYXRlZDogRGF0ZTtcbiAgcHVibGljIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXJkSW1hZ2U6IHN0cmluZztcbiAgcHVibGljIGNhcmRJbWFnZUFMVDogc3RyaW5nO1xuICBwdWJsaWMgbGlua0F0dHJpYnV0aW9uOiBBdHRyaWJ1dGlvbkxpbms7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgYXJ0aWNsZUxpbms6IHN0cmluZyxcbiAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZyxcbiAgICBsaW5rQXR0cmlidXRpb24/OiBBdHRyaWJ1dGlvbkxpbmtcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5hcnRpY2xlTnVtYmVyID0gYXJ0aWNsZU51bWJlcjtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgIHRoaXMuYXJ0aWNsZUxpbmsgPSBhcnRpY2xlTGluaztcbiAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVDtcbiAgICB0aGlzLmxpbmtBdHRyaWJ1dGlvbiA9IGxpbmtBdHRyaWJ1dGlvbjtcbiAgICBXZWJCaXQuY291bnQrKztcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJCaXQ7XG4iXX0=

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./components/global/404":2,"./components/global/dictionaryWidget":3,"./components/global/toDosWidget":5,"./models/abbrDescription":8,"./models/rwbErrorBus":13,"./models/scriptPerf":16}],2:[function(require,module,exports){
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

},{"../../models/client":10}],3:[function(require,module,exports){
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

},{"../../models/dictionarySearch":11}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const navItems_1 = __importDefault(require("../../data/navItems"));
const rwbErrorBus_1 = require("../../models/rwbErrorBus");
const scriptPerf_1 = __importDefault(require("../../models/scriptPerf"));
/**
 * Widget to add site header and footer. Instantiated in 'Main' script.
 */
const headerFooter = {
    headerWidget: {
        /**
         * Create header with site logo appended.
         * @param main HTML 'main' element
         * @returns Populated header element
         */
        buildHeader: () => {
            /**
             * Basic HTML header element containing logo (H1)
             */
            const siteHeader = document.createElement("header");
            const siteHeaderContainer = document.createElement("div");
            siteHeaderContainer.classList.add("width-max-center");
            const H1 = document.createElement("H1");
            H1.textContent = "<Random Web Bits>";
            H1.setAttribute("id", "RandomWebBits");
            siteHeaderContainer.append(H1);
            siteHeader.append(siteHeaderContainer);
            return siteHeader;
        },
        buildNavigation: () => {
            // Build the header navigation based on navigation data
            // Create navigation elements
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement("nav"))
                .appendChild(document.createElement("ul"));
            // Append nav data to nav elements
            navItems_1.default.map(item => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
                // Add navigation attributes and property values
                navListLinks.textContent = `${item.innerText}`;
                // Environment links edit, requiring different link relatives to operate
                // Github pages operates from repository, not '/'
                //if (window.location.host == 'robhowe-a.github.io') {
                //link data edit for dev environment
                //navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                //} else {
                //link data in other environments
                navListLinks.setAttribute("href", `/${item.hReference}`);
                //}
                navListLinks.setAttribute("title", item.title);
            });
            return headerNavFrag;
        },
        /**
         * Site header containing navigation links and site logo.
         */
        init: () => {
            const headerperf = new scriptPerf_1.default("Header");
            /**
             * HTML 'main' element
             */
            const pageMain = document.querySelector("main");
            /** Header element container */
            let siteHeader;
            // Add header element to the page
            if (pageMain != null) {
                // 'Main' element exists, add the header to it
                try {
                    siteHeader = pageMain.insertAdjacentElement("beforebegin", headerFooter.headerWidget.buildHeader());
                }
                catch (e) {
                    new rwbErrorBus_1.RwbDomException("DomException", "Check site header element. Encountered error:", e);
                }
            }
            else {
                // 'Main' element does not exist, add the header to the body
                try {
                    siteHeader = document.body.insertAdjacentElement("afterbegin", headerFooter.headerWidget.buildHeader());
                }
                catch (e) {
                    new rwbErrorBus_1.RwbDomException("DomException", "Check site header is not null. Encountered error:", e);
                }
            }
            //Append navigation items to header
            try {
                siteHeader.childNodes[0].appendChild(headerFooter.headerWidget.buildNavigation());
            }
            catch (e) {
                new rwbErrorBus_1.RwbDomException("DomException", "Cannot prepend navigation items. Encountered error:", e);
            }
            headerperf.end();
        },
    },
    footerWidget: {
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const siteFooterContainer = document.createElement("div");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022-2023 Random Web Bits. All Rights Reserved.`;
            siteFooterContainer.append(footerPara);
            siteFooter.append(siteFooterContainer);
            return siteFooter;
        },
        buildFaviconAttribution: (footer) => {
            // Favicon attribution section + link to source
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.setAttribute("title", "IconHome: #45026755");
            footerIconLink.setAttribute("target", "_blank");
            footerIconLink.href =
                "https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755";
            footerIconLink.target = "_blank";
            footerIconLink.rel = "noopener";
            footerIconLink.title = "Maintenance icon for graphic and web design Vector Image";
            footerIconLink.textContent = "VectorStock.com";
            footerIconPara.textContent = `Favicon designed by IconHome at `;
            // Append attribution to footer para
            footerIconPara.appendChild(footerIconLink);
            footer.childNodes[0].appendChild(footerIconPara);
            return footerIconPara;
        },
        buildDeveloperAttribution: (footer) => {
            const devattrib = document.createElement("div");
            const dev = document.createElement("p");
            dev.textContent = "Developed by Robert Howell";
            devattrib.append(dev);
            footer.appendChild(devattrib);
            return;
        },
        init: () => {
            const footerperf = new scriptPerf_1.default("Footer");
            // Add footer element to the page end
            let footer = headerFooter.footerWidget.buildFooter();
            document.body.append(footer);
            footer.childNodes[0].appendChild(headerFooter.footerWidget.buildFaviconAttribution(footer));
            headerFooter.footerWidget.buildDeveloperAttribution(footer);
            footerperf.end();
        },
    },
};
exports.default = headerFooter;

},{"../../data/navItems":6,"../../models/rwbErrorBus":13,"../../models/scriptPerf":16}],5:[function(require,module,exports){
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

},{"../../models/toDo":17}],6:[function(require,module,exports){
"strict mode";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const rwbLink_1 = __importDefault(require("../models/rwbLink"));
/**
 * Header navigation link data
 */
const homeNavLink = new rwbLink_1.default("Index", "Home", "Home", "index.html");
const pagesNavLink = new rwbLink_1.default("Pages", "Pages", "Pages", "pages.html");
const gameNavLink = new rwbLink_1.default("Game", "FlashCards", "Game", "flashcards.html");
/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
exports.default = NAVITEMS;

},{"../models/rwbLink":15}],7:[function(require,module,exports){
"strict mode";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const headerFooter_1 = __importDefault(require("./components/global/headerFooter"));
//import pageComponents from "./pageComponents";
const classComponents_1 = __importDefault(require("./classComponents"));
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const mainPerf = new scriptPerf_1.default("main");
// entry point
/**
 * TypeScript entry point. This script initializes page components and models.
 * Start is the entry point.
 */
const RWB = {
    main: () => {
        // Add header and footer components
        headerFooter_1.default.headerWidget.init();
        headerFooter_1.default.footerWidget.init();
        let page = window.location.pathname;
        // Initialize element components
        classComponents_1.default.init(page);
        mainPerf.end();
    },
    /**
     * Initialize page widgets and application functions.
     */
    start: () => {
        // Event fired before assets are rendered to the page
        window.addEventListener("DOMContentLoaded", RWB.main);
    },
};
RWB.start();

},{"./classComponents":1,"./components/global/headerFooter":4,"./models/scriptPerf":16}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"./api":9,"./dictionarySearchMarkup":12,"./rwbErrorBus":13,"./rwbJsonConverter":14}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./rwbErrorBus":13}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./rwbErrorBus":13,"./rwbJsonConverter":14}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xhc3NDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFsLzQwNC50cyIsInNyYy9jb21wb25lbnRzL2dsb2JhbC9kaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFsL2hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL2dsb2JhbC90b0Rvc1dpZGdldC50cyIsInNyYy9kYXRhL25hdkl0ZW1zLnRzIiwic3JjL21haW4udHMiLCJzcmMvbW9kZWxzL2FiYnJEZXNjcmlwdGlvbi50cyIsInNyYy9tb2RlbHMvYXBpLnRzIiwic3JjL21vZGVscy9jbGllbnQudHMiLCJzcmMvbW9kZWxzL2RpY3Rpb25hcnlTZWFyY2gudHMiLCJzcmMvbW9kZWxzL2RpY3Rpb25hcnlTZWFyY2hNYXJrdXAudHMiLCJzcmMvbW9kZWxzL3J3YkVycm9yQnVzLnRzIiwic3JjL21vZGVscy9yd2JKc29uQ29udmVydGVyLnRzIiwic3JjL21vZGVscy9yd2JMaW5rLnRzIiwic3JjL21vZGVscy9zY3JpcHRQZXJmLnRzIiwic3JjL21vZGVscy90b0RvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSx1Q0FBdUM7QUFDdkMscUVBQTBDO0FBQzFDLHVFQUE0QztBQUM1Qyw0RkFBb0U7QUFDcEUsa0ZBQTBEO0FBQzFELG1FQUF3RDtBQUN4RCwrRUFBZ0Q7QUFFaEQsTUFBTSxlQUFlLEdBQUc7SUFDdEI7OztPQUdHO0lBQ0gsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUNwQixNQUFNLGNBQWMsR0FBRyxJQUFJLG9CQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtRQUVqRixnRkFBZ0Y7UUFDaEYsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0QsSUFBSSxvQkFBb0Is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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSd2JQZXJmIGZyb20gXCIuL21vZGVscy9zY3JpcHRQZXJmXCI7XG5pbXBvcnQgUndiRXJyb3IgZnJvbSBcIi4vbW9kZWxzL3J3YkVycm9yQnVzXCI7XG5pbXBvcnQgZGljdGlvbmFyeVdpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2dsb2JhbC9kaWN0aW9uYXJ5V2lkZ2V0XCI7XG5pbXBvcnQgdG9Eb3NXaWRnZXQgZnJvbSBcIi4vY29tcG9uZW50cy9nbG9iYWwvdG9Eb3NXaWRnZXRcIjtcbmltcG9ydCBub3RGb3VuZDQwNFdpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2dsb2JhbC80MDRcIjtcbmltcG9ydCBBYmJyT3BlbiBmcm9tIFwiLi9tb2RlbHMvYWJickRlc2NyaXB0aW9uXCI7XG5cbmNvbnN0IGNsYXNzQ29tcG9uZW50cyA9IHtcbiAgLyoqXG4gICAqIEF0dHJpYnV0ZSB0YWdzIG9uIG1vYmlsZSBkbyBub3QgaGF2ZSBob3ZlciBvcHRpb24uIFRoaXMgZnVuY3Rpb24gYWRkcyBhIGNsaWNrXG4gICAqICBhYmlsaXR5IHRvIGRlZmluZSBhbiBhYmJyIHRhZywgdGhhbiByZWx5IG9uIHRoZSB0aXRsZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBhYmJyRGVmaW5pdGlvbnM6ICgpID0+IHtcbiAgICBjb25zdCBtb2JpbGVhYmJycGVyZiA9IG5ldyBSd2JQZXJmKFwiTW9iaWxlYWJicnBlcmZcIik7IC8vc3RhcnQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuXG4gICAgLyoqR2l2ZSBhbGwgYWJiciBlbGVtZW50cyBvcHRpb24gdG8gY2xpY2sgdG8gcmV2ZWFsIHRoZSBleHBhbmRlZCBkZXNjcmlwdGlvbi4gKi9cbiAgICBjb25zdCBhbGxhYmJyZXZpYXRpb25lbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhYmJyXCIpO1xuXG4gICAgaWYgKGFsbGFiYnJldmlhdGlvbmVsZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGFiYnIgb2YgYWxsYWJicmV2aWF0aW9uZWxlbXMpIHtcbiAgICAgICAgbGV0IGFiYnJldiA9IG5ldyBBYmJyT3BlbihhYmJyKTtcbiAgICAgICAgYWJicmV2LnJldmVhbEFiYnJEZXNjcmlwdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1vYmlsZWFiYnJwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gIH0sXG4gIGZvdXJvaGZvdXI6ICgpID0+IHtcbiAgICBpZiAoIVJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJQYWdlQ29tcG9uZW50c1wiLCBcIiNGb3VyLU9oLUZvdXJcIiwgZmFsc2UsIHRydWUpKSB7XG4gICAgICBub3RGb3VuZDQwNFdpZGdldC5pbml0KCk7XG4gICAgfVxuICB9LFxuICBpbml0OiAocGFnZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xhc3NwZXJmID0gbmV3IFJ3YlBlcmYoXCJDbGFzc2NvbXBvbmVudHNcIik7IC8vYmVnaW4gcGVyZm9ybWFuY2UgbWVhc3VyZVxuXG4gICAgLy8gQWRkIERpY3Rpb25hcnkgV2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgIGlmIChwYWdlID09IFwiL3BhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIiB8fCBwYWdlID09IFwiL2luZGV4Lmh0bWxcIiB8fCBwYWdlID09IFwiL1wiIHx8IHBhZ2UgPT0gXCJcIikge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJDbGFzc0NvbXBvbmVudFwiLCBcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICBkaWN0aW9uYXJ5V2lkZ2V0LmluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgIGlmIChwYWdlID09IFwiL3BhZ2VzL3RvZG9zLmh0bWxcIiB8fCBwYWdlID09IFwiL2luZGV4Lmh0bWxcIiB8fCBwYWdlID09IFwiL1wiIHx8IHBhZ2UgPT0gXCJcIikge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJDbGFzc0NvbXBvbmVudFwiLCBcIi5Ub0RvTGlzdFwiLCB0cnVlLCB0cnVlKSkgcmV0dXJuO1xuICAgICAgdG9Eb3NXaWRnZXQuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBhYmJyIGRlZmluaXRpb25zXG4gICAgY2xhc3NDb21wb25lbnRzLmFiYnJEZWZpbml0aW9ucygpO1xuXG4gICAgLy8gQWRkIFJXQiBsaW5rcyBkZWZpbml0aW9uczogYXBwZW5kcyBcIi5odG1sXCIgdG8gYW5jaG9yIGhyZWYgdGV4dCAod2hpY2ggaXMgbmF0aXZlbHkgcmVtb3ZlZCBpbiBOZXRsaWZ5KVxuICAgIGNsYXNzQ29tcG9uZW50cy5yd2JEYXRhVHlwZUFuY2hvcigpO1xuXG4gICAgY2xhc3NwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gIH0sXG4gIHJ3YkRhdGFUeXBlQW5jaG9yOiAoKSA9PiB7XG4gICAgc3dpdGNoIChsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgY2FzZSBcIi9ndWlkZXMvY2xlYXJjb29raWVzcXVpY2tseS5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmswID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazBbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVsxMF0uaHJlZiA9IFwiL2d1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbMTBdLmhyZWYgPSBcIi9leHBsb3JlL3dlYmJ0ZWxlc2NvcGUuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxMV0uaHJlZiA9IFwiL3BhZ2VzL2RvbS5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmszWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1sxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1syXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1szXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1sxMF0uaHJlZiA9IFwiL3BhZ2VzL2RvbS5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNFswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNVswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbMTBdLmhyZWYgPSBcIi9wYWdlcy9odG1scmVzcG9uc2VzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazZbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazdbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMTFbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsxMF0uaHJlZiA9IFwiL2d1aWRlcy9odHRwcy5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMlsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzEwXS5ocmVmID0gXCIvcGFnZXMvaHNsLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxM1swXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1syXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzEwXS5ocmVmID0gXCIvcGFnZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rOCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms4WzBdLmhyZWYgPSBcIi9wYWdlcy9tYXJrdXAuaHRtbFwiO1xuICAgICAgICByd2JMaW5rOFsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rOSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms5WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms5WzFdLmhyZWYgPSBcIi9wYWdlcy93ZWJpZGVzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL3BhZ2VzL3VybC5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMFswXS5ocmVmID0gXCIvcGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTm8gZWxlbWVudHMgb2YgdHlwZSBkYXRhLXJ3Yi10eXBlPWxpbmsgZm91bmQuXCIpOyAvL3Nob3duIHdpdGggdmVyYm9zZSBsb2dnaW5nXG4gICAgfVxuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcblxuY29uc3Qgbm90Rm91bmQ0MDRXaWRnZXQgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgY2xpZW50NDA0ID0gbmV3IGNsaWVudCgpO1xuICAgIGxldCBjbGllbnRSZWZmZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGllbnRyZWZlcnJlclwiKTtcbiAgICBsZXQgY2xpZW50UnR0SW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xpZW50cnR0XCIpO1xuICAgIGxldCBjbGllbnRQbGF0Zm9ybUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsaWVudHBsYXRcIik7XG5cbiAgICAvL0ZpbGwgaW5mb3JtYXRpb24gc2VjaW9uXG4gICAgY2xpZW50UmVmZmVySW5mby50ZXh0Q29udGVudCA9IGNsaWVudDQwNC5vbGRVUkwgPyBjbGllbnQ0MDQub2xkVVJMIDogd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgY2xpZW50UnR0SW5mby50ZXh0Q29udGVudCA9IGAke1xuICAgICAgY2xpZW50NDA0LmNvbm5lY3Rpb250eXBlID8gY2xpZW50NDA0LmNvbm5lY3Rpb250eXBlIDogXCJObyBjb25uZWN0aW9uIHR5cGUgZm91bmQuXCJcbiAgICB9YDtcbiAgICBjbGllbnRSdHRJbmZvLnRleHRDb250ZW50ICs9IGAsIHJ0dCBvZiAke1xuICAgICAgY2xpZW50NDA0LmNvbm5lY3Rpb25ydHQgPyBjbGllbnQ0MDQuY29ubmVjdGlvbnJ0dCA6IFwiTm8gcnR0IGZvdW5kLlwiXG4gICAgfWA7XG4gICAgY2xpZW50UGxhdGZvcm1JbmZvLnRleHRDb250ZW50ID0gY2xpZW50NDA0LmJyb3dzZXJwbGF0Zm9ybVxuICAgICAgPyBjbGllbnQ0MDQuYnJvd3NlcnBsYXRmb3JtXG4gICAgICA6IFwiTm8gcGxhdGZvcm0gaW5mb3JtYXRpb24gZm91bmQuXCI7XG4gICAgY2xpZW50UGxhdGZvcm1JbmZvLnRleHRDb250ZW50ICs9IGAsICR7XG4gICAgICBjbGllbnQ0MDQudXNlcmFnZW50ID8gY2xpZW50NDA0LnVzZXJhZ2VudCA6IFwiTm8gdXNlciBhZ2VudCBpbmZvLlwiXG4gICAgfWA7XG5cbiAgICAvL1Byb3ZpZGUgYSBsaW5rIHRvIGdvIGJhY2sgd2hlcmUgeW91IGNhbWUgZnJvbVxuICAgIGxldCBnb2JhY2tsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvbGRVUkxcIik7XG4gICAgaWYgKGNsaWVudDQwNC5vbGRVUkwuaW5jbHVkZXMoXCI0MDQuaHRtbFwiKSkge1xuICAgICAgY2xpZW50NDA0Lm9sZFVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgfVxuICAgIGxldCBnb2JhY2tocmVmID0gY2xpZW50NDA0Lm9sZFVSTCA/IGNsaWVudDQwNC5vbGRVUkwgOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgJHtnb2JhY2tocmVmfWApO1xuICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgZ29iYWNraHJlZik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RGb3VuZDQwNFdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGljdGlvbmFyeVNlYXJjaFwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBkaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAvKipcbiAgICogVGhpcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBjcmVhdGVzIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IGJ5IGNhbGxpbmcgdGhlXG4gICAqICBjb25zdHJ1Y3Rvci5cbiAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzXG4gICAqL1xuICBpbml0OiAoKSA9PiB7XG4gICAgbGV0IGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcblxuICAgIC8vIERpY3Rpb25hcnlTZWFyY2ggY29uc3RydWN0b3JcbiAgICBPYmplY3QuY3JlYXRlKG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQpKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpY3Rpb25hcnlXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBOQVZJVEVNUyBmcm9tIFwiLi4vLi4vZGF0YS9uYXZJdGVtc1wiO1xuaW1wb3J0IHsgUndiRG9tRXhjZXB0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9yd2JFcnJvckJ1c1wiO1xuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4uLy4uL21vZGVscy9zY3JpcHRQZXJmXCI7XG5cbi8qKlxuICogV2lkZ2V0IHRvIGFkZCBzaXRlIGhlYWRlciBhbmQgZm9vdGVyLiBJbnN0YW50aWF0ZWQgaW4gJ01haW4nIHNjcmlwdC5cbiAqL1xuY29uc3QgaGVhZGVyRm9vdGVyID0ge1xuICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgaGVhZGVyIHdpdGggc2l0ZSBsb2dvIGFwcGVuZGVkLlxuICAgICAqIEBwYXJhbSBtYWluIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyBQb3B1bGF0ZWQgaGVhZGVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBidWlsZEhlYWRlcjogKCkgPT4ge1xuICAgICAgLyoqXG4gICAgICAgKiBCYXNpYyBIVE1MIGhlYWRlciBlbGVtZW50IGNvbnRhaW5pbmcgbG9nbyAoSDEpXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgICAgY29uc3Qgc2l0ZUhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzaXRlSGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aWR0aC1tYXgtY2VudGVyXCIpO1xuICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICBIMS50ZXh0Q29udGVudCA9IFwiPFJhbmRvbSBXZWIgQml0cz5cIjtcbiAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcbiAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuYXBwZW5kKEgxKTtcbiAgICAgIHNpdGVIZWFkZXIuYXBwZW5kKHNpdGVIZWFkZXJDb250YWluZXIpO1xuXG4gICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcbiAgICB9LFxuICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xuICAgICAgLy8gQnVpbGQgdGhlIGhlYWRlciBuYXZpZ2F0aW9uIGJhc2VkIG9uIG5hdmlnYXRpb24gZGF0YVxuICAgICAgLy8gQ3JlYXRlIG5hdmlnYXRpb24gZWxlbWVudHNcbiAgICAgIGNvbnN0IGhlYWRlck5hdkZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXG4gICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpKVxuICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpKTtcblxuICAgICAgLy8gQXBwZW5kIG5hdiBkYXRhIHRvIG5hdiBlbGVtZW50c1xuICAgICAgTkFWSVRFTVMubWFwKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG5cbiAgICAgICAgLy8gQWRkIG5hdmlnYXRpb24gYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgIC8vIEVudmlyb25tZW50IGxpbmtzIGVkaXQsIHJlcXVpcmluZyBkaWZmZXJlbnQgbGluayByZWxhdGl2ZXMgdG8gb3BlcmF0ZVxuICAgICAgICAvLyBHaXRodWIgcGFnZXMgb3BlcmF0ZXMgZnJvbSByZXBvc2l0b3J5LCBub3QgJy8nXG4gICAgICAgIC8vaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyb2Job3dlLWEuZ2l0aHViLmlvJykge1xuICAgICAgICAvL2xpbmsgZGF0YSBlZGl0IGZvciBkZXYgZW52aXJvbm1lbnRcbiAgICAgICAgLy9uYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAvL31cbiAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGl0ZW0udGl0bGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU2l0ZSBoZWFkZXIgY29udGFpbmluZyBuYXZpZ2F0aW9uIGxpbmtzIGFuZCBzaXRlIGxvZ28uXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgY29uc3QgaGVhZGVycGVyZiA9IG5ldyBSd2JQZXJmKFwiSGVhZGVyXCIpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgIC8qKiBIZWFkZXIgZWxlbWVudCBjb250YWluZXIgKi9cbiAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcblxuICAgICAgLy8gQWRkIGhlYWRlciBlbGVtZW50IHRvIHRoZSBwYWdlXG4gICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCkge1xuICAgICAgICAvLyAnTWFpbicgZWxlbWVudCBleGlzdHMsIGFkZCB0aGUgaGVhZGVyIHRvIGl0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWJlZ2luXCIsIGhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBuZXcgUndiRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2hlY2sgc2l0ZSBoZWFkZXIgZWxlbWVudC4gRW5jb3VudGVyZWQgZXJyb3I6XCIsIGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAnTWFpbicgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgYWRkIHRoZSBoZWFkZXIgdG8gdGhlIGJvZHlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICAgICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgICAgICAgIGhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBuZXcgUndiRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwuIEVuY291bnRlcmVkIGVycm9yOlwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL0FwcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zIHRvIGhlYWRlclxuICAgICAgdHJ5IHtcbiAgICAgICAgc2l0ZUhlYWRlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKGhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBuZXcgUndiRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2Fubm90IHByZXBlbmQgbmF2aWdhdGlvbiBpdGVtcy4gRW5jb3VudGVyZWQgZXJyb3I6XCIsIGUpO1xuICAgICAgfVxuXG4gICAgICBoZWFkZXJwZXJmLmVuZCgpO1xuICAgIH0sXG4gIH0sXG5cbiAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgYnVpbGRGb290ZXI6ICgpID0+IHtcbiAgICAgIGNvbnN0IHNpdGVGb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgICAgY29uc3Qgc2l0ZUZvb3RlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBmb290ZXJQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBmb290ZXJQYXJhLnRleHRDb250ZW50ID0gYFxcdTAwQTkgMjAyMi0yMDIzIFJhbmRvbSBXZWIgQml0cy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5gO1xuXG4gICAgICBzaXRlRm9vdGVyQ29udGFpbmVyLmFwcGVuZChmb290ZXJQYXJhKTtcbiAgICAgIHNpdGVGb290ZXIuYXBwZW5kKHNpdGVGb290ZXJDb250YWluZXIpO1xuXG4gICAgICByZXR1cm4gc2l0ZUZvb3RlcjtcbiAgICB9LFxuICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJJY29uSG9tZTogIzQ1MDI2NzU1XCIpO1xuICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIFwiX2JsYW5rXCIpO1xuICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9XG4gICAgICAgIFwiaHR0cHM6Ly93d3cudmVjdG9yc3RvY2suY29tL3JveWFsdHktZnJlZS12ZWN0b3IvbWFpbnRlbmFuY2UtaWNvbi1mb3ItZ3JhcGhpYy1hbmQtd2ViLWRlc2lnbi12ZWN0b3ItNDUwMjY3NTVcIjtcbiAgICAgIGZvb3Rlckljb25MaW5rLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgICBmb290ZXJJY29uTGluay5yZWwgPSBcIm5vb3BlbmVyXCI7XG4gICAgICBmb290ZXJJY29uTGluay50aXRsZSA9IFwiTWFpbnRlbmFuY2UgaWNvbiBmb3IgZ3JhcGhpYyBhbmQgd2ViIGRlc2lnbiBWZWN0b3IgSW1hZ2VcIjtcbiAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gXCJWZWN0b3JTdG9jay5jb21cIjtcbiAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICBmb290ZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChmb290ZXJJY29uUGFyYSk7XG5cbiAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcbiAgICB9LFxuICAgIGJ1aWxkRGV2ZWxvcGVyQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBkZXZhdHRyaWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgZGV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBkZXYudGV4dENvbnRlbnQgPSBcIkRldmVsb3BlZCBieSBSb2JlcnQgSG93ZWxsXCI7XG5cbiAgICAgIGRldmF0dHJpYi5hcHBlbmQoZGV2KTtcbiAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChkZXZhdHRyaWIpO1xuXG4gICAgICByZXR1cm47XG4gICAgfSxcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICBjb25zdCBmb290ZXJwZXJmID0gbmV3IFJ3YlBlcmYoXCJGb290ZXJcIik7XG5cbiAgICAgIC8vIEFkZCBmb290ZXIgZWxlbWVudCB0byB0aGUgcGFnZSBlbmRcbiAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gaGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICAgIGZvb3Rlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKGhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG4gICAgICBoZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRGV2ZWxvcGVyQXR0cmlidXRpb24oZm9vdGVyKTtcblxuICAgICAgZm9vdGVycGVyZi5lbmQoKTtcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyRm9vdGVyO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG9Eb1wiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBUby1EbyBMaXN0IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCB0b0Rvc1dpZGdldCA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFRvLURvIExpc3Qgd2lkZ2V0LlxuICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnVG9Eb0xpc3QnIGNsYXNzXG4gICAqL1xuICBpbml0OiAoKSA9PiB7XG4gICAgbGV0IHRvRG9zRWxlbWVudDogRWxlbWVudDtcbiAgICB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xuXG4gICAgLy9Ub0RvTGlzdCBvYmplY3RcbiAgICBjb25zdCB0b0RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG5cbiAgICAvL0NyZWF0ZXMgd2lkZ2V0IG1hcmt1cCBhbmQgcG9wdWxhdGVzIFRvLURvIHRhc2tzIGNvbnRhaW5lZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgdG9Eb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldCh0b0Rvc0VsZW1lbnQpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9Eb3NXaWRnZXQ7XG4iLCJcInN0cmljdCBtb2RlXCI7XG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSd2JMaW5rIGZyb20gXCIuLi9tb2RlbHMvcndiTGlua1wiO1xuXG4vKipcbiAqIEhlYWRlciBuYXZpZ2F0aW9uIGxpbmsgZGF0YVxuICovXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBSd2JMaW5rKFwiSW5kZXhcIiwgXCJIb21lXCIsIFwiSG9tZVwiLCBcImluZGV4Lmh0bWxcIik7XG5cbmNvbnN0IHBhZ2VzTmF2TGluayA9IG5ldyBSd2JMaW5rKFwiUGFnZXNcIiwgXCJQYWdlc1wiLCBcIlBhZ2VzXCIsIFwicGFnZXMuaHRtbFwiKTtcblxuY29uc3QgZ2FtZU5hdkxpbmsgPSBuZXcgUndiTGluayhcbiAgXCJHYW1lXCIsXG4gIFwiRmxhc2hDYXJkc1wiLFxuICBcIkdhbWVcIixcbiAgXCJmbGFzaGNhcmRzLmh0bWxcIlxuKTtcblxuLyoqIE5hdmlnYXRpb24gbGlua3MgKi9cbmNvbnN0IE5BVklURU1TID0gW2hvbWVOYXZMaW5rLCBwYWdlc05hdkxpbmssIGdhbWVOYXZMaW5rXTtcbmV4cG9ydCBkZWZhdWx0IE5BVklURU1TO1xuIiwiXCJzdHJpY3QgbW9kZVwiO1xuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgaGVhZGVyRm9vdGVyIGZyb20gXCIuL2NvbXBvbmVudHMvZ2xvYmFsL2hlYWRlckZvb3RlclwiO1xuLy9pbXBvcnQgcGFnZUNvbXBvbmVudHMgZnJvbSBcIi4vcGFnZUNvbXBvbmVudHNcIjtcbmltcG9ydCBjbGFzc0NvbXBvbmVudHMgZnJvbSBcIi4vY2xhc3NDb21wb25lbnRzXCI7XG5pbXBvcnQgUndiUGVyZiBmcm9tIFwiLi9tb2RlbHMvc2NyaXB0UGVyZlwiO1xuXG5jb25zdCBtYWluUGVyZiA9IG5ldyBSd2JQZXJmKFwibWFpblwiKTtcblxuLy8gZW50cnkgcG9pbnRcbi8qKlxuICogVHlwZVNjcmlwdCBlbnRyeSBwb2ludC4gVGhpcyBzY3JpcHQgaW5pdGlhbGl6ZXMgcGFnZSBjb21wb25lbnRzIGFuZCBtb2RlbHMuIFxuICogU3RhcnQgaXMgdGhlIGVudHJ5IHBvaW50LlxuICovXG5jb25zdCBSV0IgPSB7XG4gIG1haW46ICgpID0+IHtcbiAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgIGhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuaW5pdCgpO1xuICAgIGhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuaW5pdCgpO1xuXG4gICAgbGV0IHBhZ2U6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIC8vIEluaXRpYWxpemUgZWxlbWVudCBjb21wb25lbnRzXG4gICAgY2xhc3NDb21wb25lbnRzLmluaXQocGFnZSk7XG5cbiAgICBtYWluUGVyZi5lbmQoKTtcbiAgfSxcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgcGFnZSB3aWRnZXRzIGFuZCBhcHBsaWNhdGlvbiBmdW5jdGlvbnMuXG4gICAqL1xuICBzdGFydDogKCkgPT4ge1xuICAgIC8vIEV2ZW50IGZpcmVkIGJlZm9yZSBhc3NldHMgYXJlIHJlbmRlcmVkIHRvIHRoZSBwYWdlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIFJXQi5tYWluKTtcbiAgfSxcbn07XG5cblJXQi5zdGFydCgpO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFiYnJPcGVuIHtcbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5hYmJyRWxlbWVudCA9IGFiYnJFbGVtZW50O1xuICB9O1xuXG4gIHB1YmxpYyByZXZlYWxBYmJyRGVzY3JpcHRpb24oKSB7XG4gICAgdGhpcy5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGxldCBhYmJyVGl0bGVBdHRyVmFsOiBzdHJpbmcgPSB0aGlzLmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcblxuICAgICAgaWYgKGUudGFyZ2V0ID09IHRoaXMuYWJickVsZW1lbnQpIHtcbiAgICAgICAgLy9jcmVhdGUgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5hYmJyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJiclRpdGxlQXR0clZhbH0pJHtTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgIDE2MFxuICAgICAgICApfWA7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBnZXRVcmw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBnZXRVcmwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBnZXRVcmw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuZ2V0VXJsID0gZ2V0VXJsO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAqL1xuICBwdWJsaWMgZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHZXRVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIGZldGNoIHJlcXVlc3QgY2FuIHRha2UgVVJMIG9yIHN0cmluZyBwYXJhbWV0ZXIuIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYXBpR0VUXG4gICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKi9cbiAgcHVibGljIHNldEdldFVybChnZXRVcmw6IFVSTCB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZ2V0VXJsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmdldFVybCA9IG5ldyBVUkwoZ2V0VXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRVcmwgPSBnZXRVcmw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBIHB1YmxpYyBmdW5jdGlvbiBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAqICB0aGUgcmVxdWVzdCBuZWVkcyBhZGRlZCB0byBicm93c2VyIHN0b3JhZ2UsIHRoZSBmZXRjaCBpcyBtYWRlIGFuZCBzZW50IHRvXG4gICAqICBzdG9yYWdlLiBBIGNsb25lZCBjb3B5IG9mIHRoZSBmZXRjaGVkIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGlzXG4gICAqICBzZW50IHRvIHRoZSBjYWNoZS4gV2l0aG91dCBzZW5kaW5nIHRvIGJyb3dzZXIgY2FjaGUsIHRoZSBmZXRjaCBpcyByZXF1ZXN0ZWQgYW5kXG4gICAqIHJldHVybmVkLlxuICAgKlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYXBpR2V0KGdldFVybDogVVJMKSB7XG4gICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgY2FjaGUgc3RvcmFnZVxuICAgIGlmICh0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSkge1xuICAgICAgLy9UaGUgcmV0dXJuZWQgZGF0YSBpcyBwYWNrYWdlcyBhcyBhIFByb21pc2Ugb2JqZWN0XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgLy9PcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgd2luZG93LmNhY2hlc1xuICAgICAgICAgICAgLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKVxuICAgICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICBjYWNoZXMubWF0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAvL05vIG1hdGNoZXMgZm9yIHRoaXMgcmVxdWVzdCBpbiBTdG9yYWdlIENhY2hlLCBzbyBmZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgICAgZmV0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRSZXNwID0gcmVzdWx0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lZFJlc3Auc3RhdHVzICE9IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChnZXRVcmwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRSZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgIC8vQ2Fubm90IG9wZW4gU3RvcmFnZSBDYWNoZVxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKGdldFVybCkpO1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvbWlzZSBlcnJvciBvbiBkYXRhIGZldGNoLlwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvL1RoZSBwcm9taXNlIGhhcyByZXNvbHZlZCAtLT4gcmV0dXJuIHRoZSBwcm9taXNlIGRhdGFcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShnZXRVcmwpKTtcbiAgICAgIH0pO1xuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgZmV0Y2ggcmVxdWVzdCwgcmV0dXJuaW5nIGEgZmV0Y2ggcHJvbWlzZS5cbiAgICogQHBhcmFtIGdldFVybCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAqL1xuICBwcml2YXRlIGZldGNoRGF0YShnZXRVcmw6IFVSTCkge1xuICAgIHJldHVybiBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIGNsaWVudCB7XG4gIHB1YmxpYyBvbGRVUkwgPSBkb2N1bWVudC5yZWZlcnJlcjtcbiAgcHVibGljIGJyb3dzZXJwbGF0Zm9ybTogc3RyaW5nO1xuICBwdWJsaWMgdXNlcmFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIHB1YmxpYyBjb25uZWN0aW9udHlwZTtcbiAgcHVibGljIGNvbm5lY3Rpb25ydHQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm93c2VycGxhdGZvcm0gPSB0aGlzLnNldGJyb3dzZXJwbGF0Zm9ybSgpO1xuICAgIHRoaXMuY29ubmVjdGlvbnR5cGUgPSB0aGlzLnNldGNvbm5lY3Rpb250eXBlKCk7XG4gICAgdGhpcy5jb25uZWN0aW9ucnR0ID0gdGhpcy5zZXRjb25uZWN0aW9ucnR0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBzZXRicm93c2VycGxhdGZvcm0oKSB7XG4gICAgaWYgKFwidXNlckFnZW50RGF0YVwiIGluIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIC8vdXNlckFnZW50RGF0YSBpcyBOYXZpZ2F0b3JVQURhdGEgdHlwZSwgbm90IGZvdW5kIGluIFR5cGVTY3JpcHQuXG4gICAgICAvL0tub3duIHRvIEVkZ2UgYnJvd3NlcjogT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50RGF0YSlcbiAgICAgIGxldCB1c2VyQWdlbnREYXRhOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgYXMgb2JqZWN0O1xuICAgICAgbGV0IHBsYXRmb3JtZGF0YTogc3RyaW5nID0gPHN0cmluZz51c2VyQWdlbnREYXRhLnBsYXRmb3JtO1xuICAgICAgcmV0dXJuIHBsYXRmb3JtZGF0YTtcbiAgICB9IGVsc2UgdGhpcy5icm93c2VycGxhdGZvcm0gPSBcIlwiO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0Y29ubmVjdGlvbnR5cGUoKSB7XG4gICAgaWYgKFwiY29ubmVjdGlvblwiIGluIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIC8vY29ubmVjdGlvbiBpcyBOZXR3b3JrSW5mb3JtYXRpb24gdHlwZSwgbm90IGZvdW5kIGluIFR5cGVTY3JpcHQuXG4gICAgICAvL0tub3duIHRvIEVkZ2UgYnJvd3NlcjogT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbilcbiAgICAgIGxldCBjb25uZWN0aW9uOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24gYXMgb2JqZWN0O1xuICAgICAgbGV0IGVmZmVjdGl2ZXR5cGU6IHN0cmluZyA9IDxzdHJpbmc+Y29ubmVjdGlvbi5lZmZlY3RpdmVUeXBlO1xuICAgICAgcmV0dXJuIGVmZmVjdGl2ZXR5cGU7XG4gICAgfSBlbHNlIHRoaXMuY29ubmVjdGlvbnR5cGUgPSBcIlwiO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0Y29ubmVjdGlvbnJ0dCgpIHtcbiAgICBpZiAoXCJjb25uZWN0aW9uXCIgaW4gd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgbGV0IGNvbm5lY3Rpb246IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbiBhcyBvYmplY3Q7XG4gICAgICBsZXQgcnR0OiBzdHJpbmcgPSA8c3RyaW5nPmNvbm5lY3Rpb24ucnR0O1xuICAgICAgcmV0dXJuIHJ0dDtcbiAgICB9IGVsc2UgdGhpcy5jb25uZWN0aW9ucnR0ID0gXCJcIjtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgfSBmcm9tIFwiLi93aWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZCB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IERpY3Rpb25hcnlTZWFyY2hNYXJrdXAgZnJvbSBcIi4vZGljdGlvbmFyeVNlYXJjaE1hcmt1cFwiO1xuaW1wb3J0IFJ3YkVycm9yIGZyb20gXCIuL3J3YkVycm9yQnVzXCI7XG5pbXBvcnQgeyBSV0JQYXJzZUpTT04gfSBmcm9tIFwiLi9yd2JKc29uQ29udmVydGVyXCI7XG5pbXBvcnQgeyBSV0JTdHJpbmdpZnlKU09OIH0gZnJvbSBcIi4vcndiSnNvbkNvbnZlcnRlclwiO1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaCBpcyBhIHNldCBvZiBtYXJrdXAgY3JlYXRpb24gYW5kIGZ1bmN0aW9ucyB3aGljaCBhbGxvdyBhIHVzZXJcbiAqICB0byBsb29rIHVwIGEgd29yZCBsaWtlIGEgRGljdGlvbmFyeS4gV2hlbiBjYWxsZWQsIHRoZSB1c2VyJ3MgaW5wdXQgaXMgdmFsaWRhdGVkXG4gKiAgYXMgYW4gYWNjZXB0YWJsZSB3b3JkIG9yIGl0IGRlY2xpbmVzIHRoZSByZXF1ZXN0LCB0aGVuIHNob3dpbmcgdGhlIHVzZXIgaWYgdGhlIHdvcmRcbiAqICBpcyBhY2NlcHRhYmxlLlxuICpcbiAqIENyZWF0aW5nIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IHJlcXVpcmVzIHBhc3NpbmcgYSByZWZlcmVuY2UgZWxlbWVudCAoZm9yIGFcbiAqIGtub3duIHBsYWNlbWVudCBsb2NhdGlvbikgdGhhdCBjb250YWlucyB0aGUgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzLlxuICpcbiAqICAgbmV3IERpY3Rpb25hcnlTZWFyY2goZWxlbSk7XG4gKlxuICogQWxsIHRoZSBuZWVkZWQgZWxlbWVudHMgYW5kIGZ1bmN0aW9uYWxpdHkgYXJlIGFkZGVkIHRvIHRoZSBwYWdlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2ggZXh0ZW5kcyBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIHtcbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIHN0YXRpYyB3b3JkU3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdO1xuICBwcml2YXRlIHN0YXRpYyBDYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdDogc3RyaW5nID0gXCJSV0Jfd29yZF9mZXRjaFwiO1xuICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHdvcmRVUkw6IFVSTDtcbiAgcHJpdmF0ZSB3b3JkRGF0YTogb2JqZWN0O1xuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYWxsIHRoZSBmdW5jdGlvbmFsaXR5IGFuZCBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAgICogIERpY3Rpb25hcnkgU2VhcmNoIHdpZGdldCBpbnRlcmZhY2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcGxhY2Ugd2lkZ2V0IG1hcmt1cC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL0ludm9rZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLlxuICAgIHN1cGVyKGVsZW0pO1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGljdGlvbmFyeSB3aWRnZXQgd2l0aCBjbGljayBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLmFkZFdpZGdldEV2ZW50cygpO1xuICAgIC8vU3RvcmUgd29yZHMgY2FjaGUgZGF0YSB3aXRoIGluaXRpYWxpemF0aW9uLlxuICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPSBEaWN0aW9uYXJ5U2VhcmNoLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICBEaWN0aW9uYXJ5U2VhcmNoLmNvdW50Kys7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIExvY2FsIFN0b3JhZ2Ugd29yZHMgcHJldmlvdXNseSBzdG9yZWQgd2l0aCB0aGUgRGljdGlvbmFyeSBTZWFyY2ggV2lkZ2V0LlxuICAgKlxuICAgKiBAcmV0dXJucyBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlIC0gdGhlc2UgYXJlIHRoZSB3b3JkcyBzdG9yZWQgcHJldmlvdXNseSBpbiB0aGVcbiAgICogIGJyb3dzZXIgY2FjaGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB7XG4gICAgLy9Mb2NhbCBTdG9yYWdlICd3b3JkLWNhY2hlcycgaXRlbXMgZGF0YSBhc3NpZ25tZW50XG4gICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGxldCBzdG9yYWdlU3RyOiBzdHJpbmc7XG4gICAgaWYgKFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIHRydWUsIHRydWUpKSB7XG4gICAgICAvL1RoZSBMb2NhbCBTdG9yYWdlIGlzIG51bGwgb3IgZW1wdHktLT4gQ29uZmlybSBoZXJlIHRoZSBicm93c2VyIGRvZXMgbm90IGhhdmUgYW55IENhY2hlIFN0b3JhZ2UgaXRlbXMgaW4gZXJyb3JcbiAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdykge1xuICAgICAgICBpZiAod2luZG93LmNhY2hlcy5oYXMoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCkpIHtcbiAgICAgICAgICB3aW5kb3cuY2FjaGVzLmRlbGV0ZShEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgIC8vY2hlY2sgdGhlIHdvcmQtY2FjaGUgdmFsdWUgZm9yIGNvcnJlY3QganNvbiBwYXJzaW5nXG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihzdG9yYWdlU3RyKSk7XG4gICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsXG4gICAgICAgIFwiY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNnB4O1wiXG4gICAgICApO1xuICAgICAgdGhpcy5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBwYXJzZXRlc3QucmV0dXJub2JqO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkVVJMKCkge1xuICAgIHJldHVybiB0aGlzLndvcmRVUkw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBmZXRjaGVkIHdvcmQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkRGF0YVxuICAgKi9cbiAgcHVibGljIGdldFdvcmREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLndvcmREYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGFuZCBrZXlwcmVzcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHdpZGdldC4gSW5wdXQgZXZlbnQgbGlzdGVuZXJzICdjbGljaydcbiAgICogIGFuZCAna2V5cHJlc3MnIGF3YWl0IGZvciBhIHNlYXJjaCBjYWxsLiBBbHNvLCBzaG91bGQgYSB1c2VyIHdhbnQgdG8gc2VhcmNoIGFcbiAgICogIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZCwgdGhlIHdpZGdldCBhZGFwdHMgbWFya3VwIGZvciB0aGF0IHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGFkZFdpZGdldEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQSBzZWFyY2ggZWxlbWVudCBpcyB1bmRlZmluZWQgZnJvbSBzZWFyY2hXb3JkIHwgd29yZFNlYXJjaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGljdGlvbmFyeS1idG5zXCIpO1xuICAgIGNvbnN0IGhpZGVQcmV2aW91c1BhbmVsID0gKCkgPT4ge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICAvL0FkZCBmb3JtIGlucHV0IGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgZmFsc2UsIG51bGwpO1xuICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgZmFsc2UsIG51bGwpO1xuICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgfSk7XG5cbiAgICAvL1wiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgLy9DbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2hlY2tjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKCk7XG4gICAgfSk7XG5cbiAgICAvL1wiUmVmcmVzaFwiIGJ1dHRvbiByZWxvYWRzIHRoZSBwYWdlXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBjaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXZpb3VzV29yZHNcIik7XG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lcjtcblxuICAgIC8vQ2hlY2sgdGhlIHBsYWNlbWVudCBsb2NhdG9yIGFuZCB3b3JkIGNhY2hlcyBmb3IgdW5kZWZpbmVkXG4gICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID09IG51bGwgfHwgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkKSB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnModGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCwgYnV0dG9uQ29udGFpbmVyKTtcbiAgfTtcblxuICBwcml2YXRlIGNyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGFueSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIGlmIChwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHByZXZpb3Vzd29yZGJ1dHRvbnM6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID1cbiAgICAgIHRoaXMuY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyhEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlLCBidXR0b25Db250YWluZXIpO1xuICAgIGZvciAobGV0IGJ0biBvZiBwcmV2aW91c3dvcmRidXR0b25zKSB7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uLlxuICAgICAgLy90aGlzIGlzIHRoZSBjYWNoZWQgd29yZCBidXR0ZW4uIHdoZW4gaXQncyBjbGlja2VkLCBmaXJlIGEgd29yZCBzZWFyY2hcbiAgICAgIGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIHRydWUsIGJ0bi53b3JkKTtcbiAgICAgIH0pO1xuICAgICAgLy9NT0JJTEVcbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjUwJTtcIjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLy93aGVuIGZvY3VzIChzdWNoIGFzIHVzaW5nIGtleWJvYXJkIG9ubHkpLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uXG4gICAgICBidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICB9KTtcbiAgICAgIC8vd2hlbiBub3QgZm9jdXNlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuXG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRlIGJ1dHRvblxuICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSB3b3JkIHRvIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBjb250YWluaW5nIHdvcmQgZGF0YSwgVVJMLCBhbmQgY2FjaGluZy5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXZhbHVlIC0gVGhpcyBpbnRlcmZhY2Ugc3RvcmVzIGluZm9ybWF0aW9uIHdoZXJlIHNlbmRpbmcgdG8gTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V2YWx1ZTogbG9jYWxzdG9yYWdld29yZCkge1xuICAgIC8vTG9nIHRoZSB3b3JkIGNhY2hlIGNyZWF0aW9uXG4gICAgY29uc3QgYWRkZWR3b3JkY2FjaGUgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0FkZGVkIHdvcmQgY2FjaGU6ICR7bG9jYWxzdG9yYWdldmFsdWUud29yZH1gLFxuICAgICAgICBcImNvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpjeWFuO1wiXG4gICAgICApO1xuICAgIH07XG4gICAgLy9UaGUgJ2xvY2Fsc3RvcmFnZXZhbHVlJyBuZWVkcyBhZGRlZCB0byBsb2NhbCBzdG9yYWdlIGNhY2hlXG4gICAgLy9Mb2NhbCBzdG9yYWdlIG1heSBiZSBlbXB0eSBvciBhbHJlYWR5IGhhdmluZyB0aGUgd2FudGVkIHNlYXJjaGVkIHdvcmRcbiAgICAvL0NoZWNrIHN0b3JhZ2UgaXMgbm90IG51bGwuIElmIGl0IGlzLCBhZGQgdGhlIHdvcmQuXG4gICAgaWYgKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgICAgLy9BZGQgdGhlIHN0b3JhZ2Ugd29yZCB0byBhbiBhcnJheVxuICAgICAgICBsZXQgd29yZFN0b3JlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBbXTtcbiAgICAgICAgd29yZFN0b3JlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuICAgICAgICBsZXQganNvbnN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgICBsZXQgc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHdvcmRTdG9yZSkpO1xuICAgICAgICBpZiAoIXN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkLnBhc3NlZCkge1xuICAgICAgICAgIC8vc3RyaW5naWZ5IG9iamVjdCBkaWQgbm90IHdvcmssIHNvIHJldHVyblxuICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBqc29uc3RyID0gc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQucmV0dXJuc3RyO1xuXG4gICAgICAgIC8vIExvY2FsIHN0b3JhZ2UgaXMgZW1wdHkgPT4gYWRkIHRoZSB3b3JkXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAlYzxSV0I+JWNDcmVhdGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsXG4gICAgICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4O1wiXG4gICAgICAgICk7XG4gICAgICAgIGFkZGVkd29yZGNhY2hlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0xvY2FsIHN0b3JhZ2UgaXMgbm90IGVtcHR5LiBIZXJlLCB3ZSBuZWVkIHRvIGFkZCB0aGUgd29yZCB0byB0aGUgZXhpc3Rpbmcgd29yZCBjYWNoZS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG4gICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL01hdGNoIHRoZSBjdXJyZW50IFVSTCBmb3IgY2FjaGUgbWFuYWdlbWVudFxuICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSBsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkVVJMKSB7XG4gICAgICAgIC8vV29yZCBpcyBhbHJlYWR5IGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgLy9ObyBuZWVkIHRvIGFkZCBpdCB0byB0aGUgYXJyYXlcbiAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9BZGQgd29yZCB0byBleGlzdGluZyAnd29yZC1jYWNoZXMnIGluIExvY2FsIFN0b3JhZ2VcbiAgICBhbGxjYWNoZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcblxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTihhbGxjYWNoZSkpO1xuICAgIGlmICghc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQucGFzc2VkKSB7XG4gICAgICAvL3N0cmluZ2lmeSBvYmplY3QgZGlkIG5vdCB3b3JrLCBzbyByZXR1cm5cbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBqc29uc3RyID0gc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQucmV0dXJuc3RyO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBqc29uc3RyKTtcbiAgICBhZGRlZHdvcmRjYWNoZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBwcmV2aW91cyB3b3JkIGRhdGEgZnJvbSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSAtLT4gS2V5L1ZhbHVlXG4gICAqIGRhdGEgcmVmZXJlbmNpbmcgd29yZHMgc3RvcmVkIGluIGxvY2FsIGNhY2hlLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdld29yZCAtIHN0cmluZyBmcm9tIFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiIGJ1dHRvblxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdld29yZDogc3RyaW5nKSB7XG4gICAgLy9SZW1vdmUgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZSwgQ2FjaGUgU3RvcmFnZVxuICAgIC8vQ2hlY2sgbG9jYWwgc3RvcmFnZSBpcyBub3QgbnVsbCBvciBlbXB0eVxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0dldCB0aGUgd29yZHMgYXJyYXkgZnJvbSBMb2NhbCBTdG9yYWdlXG4gICAgLy9SV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KFwiRGljdGlvbmFyeVdpZGdldFwiLCBcIndvcmQtY2FjaGVzXCIpOyAvL2xvZyB3aGV0aGVyIGZldGNoZWQgd29yZCBjYWNoZSBpcyBudWxsIG9yIGVtcHR5LlxuICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZFtdID0gRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZTtcblxuICAgIC8vUmVtb3ZlIHRoZSB3b3JkIGZyb20gQ2FjaGUgU3RvcmFnZSBhbmQgTG9jYWwgU3RvcmFnZSB3b3JkIGFycmF5XG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAod29yZENhY2hlLndvcmQgPT0gbG9jYWxzdG9yYWdld29yZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRDYWNoZS53b3JkVVJMKTtcbiAgICAgICAgYWxsY2FjaGUuc3BsaWNlKGFsbGNhY2hlLmluZGV4T2Yod29yZENhY2hlKSwgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHdvcmQgY2FjaGU6ICR7bG9jYWxzdG9yYWdld29yZH1gLFxuICAgICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgICBcImNvbG9yOmRhcmtjeWFuO1wiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxjYWNoZS5sZW5ndGggPT0gMCkge1xuICAgICAgLy9UaGUgcmVtb3ZlZCB3b3JkIHdhcyB0aGUgbGFzdCB3b3JkIGluIHRoZSBhcnJheSwgc28gcmVtb3ZlIHRoZSBjb250YWluZXJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCxcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNnB4O1wiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgIGxldCB3b3JkY2FjaGVzc3RyZnl0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTihhbGxjYWNoZSkpO1xuICAgIGlmICghd29yZGNhY2hlc3N0cmZ5dGVzdC5wYXNzZWQpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vUmV0dXJuIHJlbWFpbmluZyB3b3JkcyB0byBMb2NhbCBTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCB3b3JkY2FjaGVzc3RyZnl0ZXN0LnJldHVybnN0cik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZldGNoIHJlcXVlc3QgZnJvbSBDYWNoZSBTdG9yYWdlLiBVdGlsaXplc1xuICAgKiBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0IGZvciBjYWNoZSBuYW1lLlxuICAgKiBAcGFyYW0gcmVtb3ZlVVJMXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHJlbW92ZVVSTDogVVJMKSB7XG4gICAgd2luZG93LmNhY2hlcy5vcGVuKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgY2FjaGVzLm1hdGNoKHJlbW92ZVVSTCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gbWF0Y2hpbmcgdGhlIHJlc3VsdC4gUmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgY2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHJlc3VsdCkpO1xuICAgICAgICAgIGNhY2hlUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhY2hlLmRlbGV0ZShyZW1vdmVVUkwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBkeW5hbWljYWxseSByZWNhbGxzIGEgd29yZCBkZWZpbml0aW9uIHJlcXVlc3QgYW5kIGluc3RhbnRpYXRlcyBhcGlHRVQoKS4gVGhlXG4gICAqIHJldHVybmVkIHByb21pc2UgYWxzbyBkeW1hbmljYWxseSBhbnN3ZXJzIHRoZSB3aWRnZXQgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgKiBAcGFyYW0gd29yZFVybCAtIFRoZSBmZXRjaCByZXF1ZXN0IFVSTC5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBzZW5kVG9DYWNoZSAtID8gU2VuZCBmZXRjaCByZXF1ZXN0IHRvIENhY2hlIFN0b3JhZ2UgOiBGZXRjaCB3aXRob3V0IHN0b3JpbmcgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBjYWNoZU5hbWUgLSBJZiBzZW5kaW5nIGZldGNoIHJlcXVlc3RzIHRvIGNhY2hlLCBwcm92aWRlIGEgbmFtZSB0byBzdG9yZSBpdCB1bmRlci5cbiAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgIHdvcmQ6IHN0cmluZyxcbiAgICB3b3JkVXJsOiBVUkwsXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICBzZW5kVG9DYWNoZTogYm9vbGVhbixcbiAgICBjYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgLy9BIGZ1bmN0aW9uIGNhbGwgcGFyYW1ldGVyIG9wdGlvbiBpcyB0byBzdG9yZSB0aGUgd29yZCByZXF1ZXN0IGluIGJyb3dzZXIncyBDYWNoZSBTdG9yYWdlXG4gICAgLy9TdHJ1Y3R1cmUgdGhlIHdvcmQgZGF0YSB2aWEgJ2xvY2Fsc3RvcmFnZXdvcmR2YWx1ZScgaW50ZXJmYWNlIHVzZWQgdGhyb3VnaG91dCBmZXRjaGluZ1xuICAgIGxldCB3b3JkY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmQgPSB7XG4gICAgICBpbkNhY2hlOiBzZW5kVG9DYWNoZSxcbiAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgY2FjaGVOYW1lOiBzZW5kVG9DYWNoZSA/IGNhY2hlTmFtZSA6IFwiXCIsXG4gICAgfTtcblxuICAgIC8vQXN5bmNocm9ub3VzIGZldGNoIHJlcWV1c3QgYW5kIGR5bmFtaWMgbWFya3VwIGNyZWF0aW9uIGZyb20gdGhlIGRhdGEncyByZXR1cm5cbiAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgLy9DYWxsIGFwaUdFVCgpIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVChcbiAgICAgICAgd29yZGNhY2hlLndvcmRVUkwsXG4gICAgICAgIHdvcmRjYWNoZS5pbkNhY2hlLFxuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0sXG4gICAgICAgIHdvcmRjYWNoZS5jYWNoZU5hbWVcbiAgICAgICk7XG4gICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbjtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHZXQod29yZEZldGNoLmdldEdldFVybCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgbm9EZWZpbml0aW9ucyA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKGRhdGEpKTtcbiAgICAgICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSBwYXJzZXRlc3QucmV0dXJub2JqO1xuICAgICAgfVxuICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgLy9JZiB0aGUgcmV0dXJuZWQgZGF0YSBpcyBhbiBvYmplY3QsIGNvbmZpcm0gaXQgaXMgJ25vIGRlZmluaXRpb24nIHNlcnZlciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgXCJ0aXRsZVwiKSkge1xuICAgICAgICAgIC8vTm8gZGVmaW5pdGlvbnMgd2VyZSBmb3VuZCB3aGVuIGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggYSB0aXRsZSBwcm9wZXJ0eVxuICAgICAgICAgIC8vd29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiXG4gICAgICAgICAgbm9EZWZpbml0aW9ucyA9IHRydWU7XG4gICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIiAmJiB3b3JkY2FjaGUuaW5DYWNoZSA9PSB0cnVlKSB7XG4gICAgICAgICAgICAvL1RoZSBkYXRhIHN0cmVhbSBoZXJlIGlzIHdpdGhvdXQgd29yZCBkYXRhLiBUaGlzIGZ1bmN0aW9uIGF3YWl0cyB0aGUgYXBpIGZldGNoJ3MgZGF0YVxuICAgICAgICAgICAgLy90byBjb21wbGV0ZSBzdG9yYWdlL3Byb21pc2UgcmV0dXJucy4gSXQgd2FpdHMgNSBzZWNvbmRzIGZvciB0aGUgYnJvd3NlciB0byBjb21wbGV0ZSBpdHMgc3RvcmUgZnVuY3Rpb25zXG4gICAgICAgICAgICAvL3RoZW4gcmVtb3ZlcyB0aGUgdW53YW50ZWQgY2FjaGUgcmVxdWVzdC5cbiAgICAgICAgICAgIC8vVE9ETzpCVUdSRVNFQVJDSD0+RHVyaW5nIHRoZSA1IHRpbWVvdXQsIGlmIHRoZSBwYWdlIHJlZnJlc2hlcyBhICdiYWQgd29yZCcgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGNhY2hlXG4gICAgICAgICAgICAvL1RoaXMgJ2JhZCB3b3JkJyBjYW4gYmUgcmVtb3ZlZCBieSBkZWxldGluZyBhbGwgcHJldmlvdXMgd29yZHMgdmlhIFVJIGFuZCByZWZyZXNoaW5nIHRoZSBwYWdlLiBUaGlzIHdpbGxcbiAgICAgICAgICAgIC8vIGZpcmUgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHRvIGNsZWFyIGFueSBtaXNtYXRjaGVkIHdvcmRkYXRhPC0tPmNhY2hlZHJlcXVlc3RzLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIC8vRnVuY3Rpb24gYXdhaXRpbmcgcmVxdWVzdCdzIENhY2hlIFN0b3JhZ2UgY2FjaGluZ1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZEZldGNoLmdldEdldFVybCgpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3QgcmVtb3ZlIGZyb20gQ2FjaGUgU3RvcmFnZS4gTmFtZTogXCIsIHdvcmRGZXRjaC5nZXRHZXRVcmwoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IG5vRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgLy9Hb29kIGRhdGEtLT4gcmV0dXJuIGRhdGEgZm9yIG1hcmt1cCByZW5kZXJcbiAgICAgICAgLy8nQmFkIGRhdGEnIGR1ZSB0byBcIk5vIGRlZmluaXRpb25zIGZvdW5kXCIsIGludmFsaWQgd29yZCwgYmFkIG5ldHdvcmsgY29ubmVjdGlvblxuICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHtcbiAgICAgICAgICAvL09ubGluZSwgcHJvYmxlbSB3aXRoIGZldGNoXG4gICAgICAgICAgLy9PZmZsaW5lIHJlcXVlc3RcbiAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ICs9IFwiLCBjaGVjayBuZXR3b3JrIGNvbm5lY3Rpb24uXCI7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgLy9TZXJ2ZXIgcmV0dXJuZWQgbm8gZGVmaW5pdGlvbnMgZGF0YVxuICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIpXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiO1xuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKHdvcmRjYWNoZSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIGxldCB3b3JkRGF0YSA9IHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICByZXR1cm4gd29yZERhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVzZXIgaW5wdXQgdmFsaWRhdGlvbiBmdW5jdGlvbiB0ZXN0cyB0aGUgaW5wdXQgc3RyaW5nIGFnYWluc3QgYSB2YWxpZCBSZWd1bGFyIEV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgIFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIilcbiAgICpcbiAgICogQHBhcmFtIGludHh0IC0gU3RyaW5nIHZhbHVlIHJlY2VpdmVkIGZyb20gdXNlciBmaWVsZCBpbnB1dC5cbiAgICogQHJldHVybnMgQWNjZXB0YWJsZSB1c2VyIGlucHV0OiB0cnVlIG9yIGZhbHNlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkVmFsaWRhdGlvbihpbnR4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgbGV0IGxldHRlcnNSRSA9IG5ldyBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpO1xuICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gYXdhaXRzIGEgcHJvbWlzZSwgZmV0Y2hpbmcgYSBkaWN0aW9uYXJ5IHRlcm0uIFRoZSBkYXRhXG4gICAqIGluZ3Jlc3MgY2FsbHMgbWFya3VwIGNyZWF0aW9uIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCB0byBiZSBmZXRjaGVkLlxuICAgKiBAcGFyYW0gd29yZFVSTCAtIEEgVVJMIGNvbXBvc2luZyB0aGUgZnVsbCB1cmwgb2YgdGhlIGZldGNoIHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIHdvcmQ6IHN0cmluZywgd29yZFVSTDogVVJMKSB7XG4gICAgLy8gV2hlbiB0aGUgd29yZCBkYXRhIHJlc29sdmVzLCBjYWxsIG1hcmt1cCBmdW5jdGlvbnNcbiAgICBsZXQgd29yZERhdGFQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICByZXNvbHZlKFxuICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0oXG4gICAgICAgICAgd29yZCxcbiAgICAgICAgICB3b3JkVVJMLFxuICAgICAgICAgIHNlYXJjaEVsZW1zLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdFxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICAgIHdvcmREYXRhUHJvbWlzZS50aGVuKChkYXRhOiBvYmplY3QpID0+IHtcbiAgICAgIHRoaXMud29yZERhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgc2VhcmNoRWxlbXMpO1xuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IE9iamVjdC5oYXNPd24oZGF0YSwgXCJ0aXRsZVwiKSkgcmV0dXJuO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JldHJpZXZlZCB3b3JkOiAke3dvcmR9YCwgXCJjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsIFwiY29sb3I6Z29sZDtcIik7XG4gICAgICAvLyBSZW1vdmUgdW5uZWVkZWQgY2xhc3NlcyBpZiBhcHBsaWVkIHByZXZpb3VzbHlcbiAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XG4gICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiB3b3JkU2VhcmNoKCkgYmVnaW5zIGEgd29yZCBzZWFyY2ggcmVxdWVzdC4gVGhlIHVzZXIgaW5wdXQgbGlzdGVuZXIgY2hvb3Nlc1xuICAgKiB3aGV0aGVyIHRoZSBmZXRjaCBpcyBjYWxsZWQgZnJvbSBjYWNoZSBvciBpcyBuZXcuXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gaXNGcm9tUHJldmlvdXNXb3JkcyAtIFRydWUgaWYgdGhlIHVzZXIgcmVxdWVzdGVkIGEgc2VhcmNoIGZyb20gYSBwcmV2aW91cyB3b3JkLCB0byBjYWxsIGRhdGEgZnJvbSBCcm93c2VyIENhY2hlLlxuICAgKiBAcGFyYW0gY2FjaGVkV29yZCAtIElmIHRoZSB1c2VyIGNhbGxlZCBmb3IgYSBwcmV2aW91cyB3b3JkLCBjYWNoZWRXb3JkIGlzIHdpdGhpbiB0aGUgTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFNlYXJjaChcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIGlzRnJvbVByZXZpb3VzV29yZHM6IGJvb2xlYW4sXG4gICAgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZCB8IG51bGxcbiAgKSB7XG4gICAgaWYgKGlzRnJvbVByZXZpb3VzV29yZHMpIHtcbiAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMsIGNhY2hlZFdvcmQud29yZCwgY2FjaGVkV29yZC53b3JkVVJMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGFrZSB1c2VyIGlucHV0IGFuZCBmaWx0ZXIgdG8gYW4gYWNjZXB0ZWQgc3RyaW5nXG4gICAgICBsZXQgYWNjZXB0ZWRJbnB1dFdvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSlcbiAgICAgICAgPyAoYWNjZXB0ZWRJbnB1dFdvcmQgPSB0cnVlKVxuICAgICAgICA6IChhY2NlcHRlZElucHV0V29yZCA9IGZhbHNlKTtcbiAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAvLyBDcmVhdGUgYSBVUkwgb2YgdGhlIGFjY2VwdGVkIHdvcmQgZm9yIHVzZSBpbiB0aGUgZmV0Y2ggY2FsbFxuICAgICAgICB0aGlzLndvcmRVUkwgPSBuZXcgVVJMKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUudG9TdHJpbmcoKSwgRGljdGlvbmFyeVNlYXJjaC5yZXF1ZXN0VXJsKTtcbiAgICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSwgdGhpcy53b3JkVVJMKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gXCJcIjsgLy8gcmVzZXQgaW5wdXQgc3RyaW5nXG4gIH07XG5cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZCB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgfSBmcm9tIFwiLi93aWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBpcyBtYWRlIHRvIGNyZWF0ZSB0aGUgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gKiAgRGljdGlvbmFyeSBTZWFyY2guIEVsZW1lbnRzIGFyZSBjcmVhdGVkIGFuZCBhcHBlbmRlZCB0byB0aGUgcGFnZSB0byB0aGUgY2xhc3NcbiAqICAnZGljdGlvbmFyeVdpZGdldCdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCB7XG4gIHB1YmxpYyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcbiAgfTtcblxuICAvKipcbiAgICogUHJpbWFyeSB3aWRnZXQgbWFya3VwIHN0cnVjdHVyaW5nIHRoZSB3aWRnZXQgZWxlbWVudHMgYW5kIHNlYXJjaCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgYmVmb3JlIHRoZSB3aWRnZXQuXG4gICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgKiAgaW1wb3J0YW50IEhUTUwgZWxlbWVudHMgdXNlZCB0aHJvdWdoIHdpZGdldCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgaWYgKGRpY3Rpb25hcnkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICBjb25zdCBhcnRIID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpKTtcbiAgICBjb25zdCBwcmV2aW91c1dvcmRzID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcblxuICAgIC8vIFJldHVybiBlbGVtZW50cyB1c2VkIGluIGxhdGVyIGZ1bmN0aW9uc1xuICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxuICAgICAgd29yZFNlYXJjaDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgIGRpY3Rpb25hcnlFbGVtOiA8SFRNTEVsZW1lbnQ+ZGljdGlvbmFyeSxcbiAgICAgIGVycm9yRWxlbTogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRzQ29udGFpbmVyOiBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLFxuICAgICAgcmVmcmVzaEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICB9O1xuXG4gICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XG4gICAgcHJldmlvdXNXb3Jkcy5jbGFzc0xpc3QuYWRkKFwicHJldmlvdXNXb3Jkc1wiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJzZWFyY2hcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlNlYXJjaC4uLlwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJzdWJtaXRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyLmlkID0gXCJkaWN0aW9uYXJ5LWJ0bnNcIjtcbiAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcblxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMgPSBzZWFyY2hFbGVtZW50cztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWFya3VwIHRvIGhvdXNlIHJldHVybmVkIHdvcmRzIGZyb20gRGljdGlvbmFyeVNlYXJjaC4gVGhlIG1hcmt1cFxuICAgKiAgaXMgY3JlYXRlZCBiYXNlZCBvbiBBUEkgZWdyZXNzLiBXb3JkcyBhbmQgdGhlaXIgZGVmaW5pdGlvbnMgdmFyeS4gVGhlIG1hcmt1cCBpc1xuICAgKiAgYWRhcHRpdmUgdG8gcmV0dXJuZWQgd29yZCBkYXRhIHN0cnVjdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkRGF0YSAtIFRoaXMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCBvZiB3b3JkIHR5cGVzLCBkZWZpbml0aW9ucywgYW5kIGV4YW1wbGVzLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAod29yZERhdGE6IGFueSwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cykge1xuICAgIGlmICh3b3JkRGF0YSA9PSBudWxsIHx8ICEod29yZERhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHx8IE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiJWNUaGVyZSBpcyBubyBkZWZpbml0aW9uIGZvciB0aGlzIHdvcmQuXCIsIFwiY29sb3I6ZGFya2dyZWVuO1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBZGQgd29yZCBkZWZpbml0aW9uIHRvIHRoZSBkaWN0aW9uYXJ5IHdpZGdldFxuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lciA9IHNlYXJjaEVsZW1zLmRpY3Rpb25hcnlFbGVtLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICk7XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uRGVzY3JpcHRpb25cIik7XG5cbiAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwid29yZFwiLCB3b3JkLndvcmQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XG4gICAgICAvL0FkZCB0aGUgd29yZCBhbmQgZXhhbXBsZXMgdG8gcGFnZVxuICAgICAgd29yZC5tZWFuaW5ncy5tYXAoKHdvcmRUeXBlOiBhbnkpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxuICAgICAgICBjb25zdCB3b3JkVHlwZUggPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpKTtcbiAgICAgICAgY29uc3Qgd29yZFR5cGVMaXN0ID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgICAgIHdvcmRUeXBlSC50ZXh0Q29udGVudCA9IHdvcmRUeXBlLnBhcnRPZlNwZWVjaDtcbiAgICAgICAgd29yZFR5cGUuZGVmaW5pdGlvbnMubWFwKChkZWY6IGFueSkgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9uIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICBsZXQgd29yZFR5cGVEZWZJdGVtID0gd29yZFR5cGVMaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICBkZWZpbml0aW9uUC50ZXh0Q29udGVudCA9IGRlZi5kZWZpbml0aW9uO1xuICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJ3b3JkRGVmaW5pdGlvblwiKTtcblxuICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9ucyBpczogXCIsIGRlZik7XG4gICAgICAgICAgICBjb25zdCBuZXdQID0gZGVmaW5pdGlvblAuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGlmIChuZXdQIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3UGkgPSBuZXdQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XG4gICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL2NyZWF0ZSBjbGVhciBidXR0b25cbiAgICBjb25zdCBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICk7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwid29yZC1jbGVhclwiKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgaG92ZXJlZCwgZGlzcGxheSBpdFxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGV2ZW50ID0+IHtcbiAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUub3BhY2l0eSA9IFwiMTAwJVwiO1xuICAgICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBub3QgaG92ZXJlZCwgaGlkZSBpdFxuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUub3BhY2l0eSA9IFwiNTAlXCI7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgY2xpY2tlZCwgY2xlYXIgdGhlIGVsZW1lbnRzXG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjUmVtb3ZlZCB3b3JkOiAke2RlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJ3b3JkXCIpfWAsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO1wiXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgY2xlYXIgYnV0dG9uIHRvIHdpZGdldFxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZpbml0aW9uRGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHB1YmxpYyBjcmVhdGVQcmV2aW91c1dvcmRTZWFyY2hlc0VsZW1lbnRzKFxuICAgIHdvcmRzdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkW10sXG4gICAgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudFxuICApIHtcbiAgICBsZXQgYnV0dG9uc2FycjogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzW10gPSBbXTtcblxuICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgLy9uZWVkZWQgdG8gZGlzcGxheSB0aG9zZSB3b3Jkcy4gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2lkZ2V0IGZ1bmN0aW9uYWxpdHkuXG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIHdvcmRzdG9yYWdlKSB7XG4gICAgICBjb25zdCB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIgPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBjb25zdCBjYWNoZVdvcmRIZWFkaW5nRWxlbSA9IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICAgIGNvbnN0IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtID0gd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICApO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImRpY3Rpb25hcnktd29yZC1idG5cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuXG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnRuOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgPSB7XG4gICAgICAgIHdvcmQ6IHdvcmRDYWNoZSxcbiAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW06IGNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXI6IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcixcbiAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW06IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgfTtcbiAgICAgIGJ1dHRvbnNhcnIucHVzaChwcmV2aW91c3dvcmRidG4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uc2FycjtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ3YkVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBSd2JFcnJvci5jb3VudCsrO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tFbGVtZW50Zm9yTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAgY3NzUXVlcnk6IHN0cmluZyxcbiAgICBsb2dNZXNzYWdlPzogYm9vbGVhbixcbiAgICBzdXByZXNzRXhjZXB0aW9uPzogYm9vbGVhblxuICApIHtcbiAgICBsZXQgZWxlbTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTsgLy9Mb2cgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlOyAvL1N1cHJlc3MgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmIChzdXByZXNzRXhjZXB0aW9uKSBzdXByZXNzZXhjcHQgPSB0cnVlO1xuICAgIGxldCBxdWVyeTogc3RyaW5nID0gYCR7Y3NzUXVlcnl9YDtcblxuICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICB0cnkge1xuICAgICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoXCJHZXRFbGVtZW50XCIsIGBDb3VsZCBub3QgZ2V0IGVsZW1lbnQ6ICcke3F1ZXJ5fSdgKSk7XG4gICAgfVxuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLmluZm8oYCVjTm8gZWxlbWVudCBmb3VuZCB3aXRoIHF1ZXJ5OiAke3F1ZXJ5fS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgaWYgKCFzdXByZXNzZXhjcHQpXG4gICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudE5hbWV9TnVsbFJlZmVyZW5jZWAsIGBFbGVtZW50IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBjaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgY2hlY2tFbXB0eVN0cmluZz86IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZT86IGJvb2xlYW5cbiAgKSB7XG4gICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICBpZiAobG9nbXNzZykgY29uc29sZS5pbmZvKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50TmFtZX0uYCwgXCJjb2xvcjpwdXJwbGU7XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjaGVja0VtcHR5U3RyaW5nKSByZXR1cm4gUndiRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lLCBrZXksIGxvZ21zc2cpO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCBsb2dNZXNzYWdlPzogYm9vbGVhbikge1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoIWxvZ01lc3NhZ2UpIGxvZ21zc2cgPSBsb2dNZXNzYWdlO1xuICAgIGxldCB0ZXN0OiBzdHJpbmcgfCBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIGdldCBsb2NhbCBzdG9yYWdlIGtleTogJHtrZXl9YCk7XG4gICAgfVxuICAgIGlmICh0ZXN0ID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLndhcm4oYCVjTG9jYWwgc3RvcmFnZSBrZXkgbm90IGZvdW5kOiAke2tleX0uYCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgS2V5IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGVzdCA9PSBcIlwiIHx8IHRlc3QgPT0gXCJbXVwiKSB7XG4gICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgY29uc29sZS53YXJuKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgVmFsdWUgaXMgZW1wdHlgKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcmVmZXJlbmNlIGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUndiUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBSZWZlcmVuY2VFcnJvciB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVmRXJyb3I6IFJlZmVyZW5jZUVycm9yO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBlcnIgPSBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLnJlZkVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgcmVmZXJlbmNlIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5yZWZFcnJvcixcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YlJlZmVyZW5jZUVycm9yLmNvdW50Kys7XG4gIH07XG5cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBzeW50YXggZXJyb3IgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBSd2JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHBhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBzeW50YXhFcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgIHRoaXMuc3ludGF4RXJyb3IgPSBlcnI7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGAlYzxSV0I+JWNFeGVjdXRpb24gZXhwZXJpZW5jZWQgYSBzeW50YXggZXJyb3I6XFxuJW9cXG4lYzwvUldCPmAsXG4gICAgICBcImNvbG9yOnJlZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgXCJjb2xvcjpyZWQ7XCIsXG4gICAgICB0aGlzLnN5bnRheEVycm9yLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIlxuICAgICk7XG4gICAgUndiU3ludGF4RXJyb3IuY291bnQrKztcbiAgfTtcblxufVxuXG5leHBvcnQgY2xhc3MgUndiRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHN0YWNrOiBhbnk7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgZG9tRXJyb3I6IERPTUV4Y2VwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgZXJyb3I6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSBlcnJvcjtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLmRvbUVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgRE9NIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5zdGFjayxcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YkRvbUV4Y2VwdGlvbi5jb3VudCsrO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgUndiU3ludGF4RXJyb3IgfSBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKiogQW4gUldCUGFyc2VKU09OIHBhcnNlcyBqc29uIGFuZCBzdG9yZXMgdGhlIHBhcnNlZCBzdHJpbmcgd2l0aCB0aGUgcmVzdWx0LiAqL1xuZXhwb3J0IGNsYXNzIFJXQlBhcnNlSlNPTiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyByZXR1cm5vYmo6IG9iamVjdDtcbiAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwYXJzZXN0cjogc3RyaW5nO1xuXG4gIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICogSlNPTiBvYmplY3QuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJzZXN0cjogc3RyaW5nKSB7XG4gICAgUldCUGFyc2VKU09OLmNvdW50Kys7XG4gICAgdGhpcy5wYXJzZXN0ciA9IHBhcnNlc3RyO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5SV0JwYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIFJXQnBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5vYmogPSBKU09OLnBhcnNlKHRoaXMucGFyc2VzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJub2JqID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbn1cblxuLyoqIEFuIFJXQlBhcnNlSlNPTiB0ZXN0cyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gYmUgc3RyaW5naWZpZWQgaW50byBhIHZhbGlkXG4gKiBqc29uIHN0cmluZy4gKi9cbmV4cG9ydCBjbGFzcyBSV0JTdHJpbmdpZnlKU09OIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIHJldHVybnN0cjogc3RyaW5nO1xuICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICBwcml2YXRlIGpzb246IGFueTtcbiAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgKiBKU09OIG9iamVjdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGpzb246IGFueSkge1xuICAgIFJXQlN0cmluZ2lmeUpTT04uY291bnQrKztcbiAgICB0aGlzLmpzb24gPSBqc29uO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIHBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5zdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmpzb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJuc3RyID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogSFRNTCBsaW5rIGVsZW1lbnQgZGF0YS4gVXNlZCB3aXRoIGFuY2hvciB0YWdzLlxuICovXG5jbGFzcyBSd2JMaW5rIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgLyoqSFRNTCB0aXRsZSBhdHRyaWJ1dGUgKi9cbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIC8qKklubmVyIHRleHQgc3RyaW5nICovXG4gIHB1YmxpYyBpbm5lclRleHQ6IHN0cmluZztcbiAgLyoqVGhlIHBhZ2UgdGhlIGxpbmsgaXMgYXNzb2NpYXRlZCB0byAqL1xuICBwdWJsaWMgcGFnZU5hbWU6IHN0cmluZztcbiAgLyoqSFRNTCBocmVmIGF0dHJpYnV0ZSAqL1xuICBwdWJsaWMgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgcGFnZU5hbWU6IHN0cmluZyxcbiAgICBoUmVmZXJlbmNlOiBzdHJpbmdcbiAgKSB7XG4gICAgKHRoaXMudGl0bGUgPSB0aXRsZSksXG4gICAgICAodGhpcy5pbm5lclRleHQgPSBpbm5lclRleHQpLFxuICAgICAgKHRoaXMucGFnZU5hbWUgPSBwYWdlTmFtZSksXG4gICAgICAodGhpcy5oUmVmZXJlbmNlID0gaFJlZmVyZW5jZSksXG4gICAgICBSd2JMaW5rLmNvdW50Kys7XG4gIH07XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBSd2JMaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzdGFydE1hcms6IFBlcmZvcm1hbmNlTWFyaztcbiAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrO1xufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUndiUGVyZiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc2NyaXB0UnVudGltZU1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgIG5hbWU6IG51bGwsXG4gICAgc3RhcnRNYXJrOiBudWxsLFxuICAgIGVuZE1hcms6IG51bGwsXG4gIH07XG5cbiAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuICovXG4gIGNvbnN0cnVjdG9yKHNjcmlwdE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLm5hbWUgPSBzY3JpcHROYW1lO1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZX0tc3RhcnRgKTtcbiAgICBSd2JQZXJmLmNvdW50Kys7XG4gIH07XG5cbiAgLyoqIENhbGwgZW5kKCkgdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC4gKi9cbiAgcHVibGljIGVuZCgpIHtcbiAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5lbmRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfS1lbmRgKTtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgfTtcblxuICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICBwcml2YXRlIG1lYXN1cmUoKSB7XG4gICAgbGV0IG1lYXN1cmUgPSBwZXJmb3JtYW5jZS5tZWFzdXJlKFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZSxcbiAgICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyay5uYW1lLFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MuZW5kTWFyay5uYW1lXG4gICAgKTtcbiAgICByZXR1cm4gY29uc29sZS5kZWJ1ZyhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiwgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKlxuICogVG8gY3JlYXRlIGEgVG9Eb0xpc3QsIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2UgbXVzdCBoYXZlICcuVG9Eb0xpc3QnIGNsYXNzLiBDYWxsIHRoZVxuICogIGNsYXNzIGNvbnN0cnVjdG9yLCBwYXNzaW5nIGluIHRoYXQgZWxlbWVudCB0byBjcmVhdGUgdGhlIHdpZGdldC5cbiAqXG4gKiAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG4gKiAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICpcbiAqIFRoZW4sIHRoZSB3aWRnZXQgaXMgY3JlYXRlZCBhbmQgVG8tRG9zIGFyZSByZXRyaWV2ZWQgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgVG9Eb0xpc3Qge1xuICAvKipUb3RhbCBudW1iZXIgb2YgVG9ET3MqL1xuICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAvKipXaWRnZXQgZWxlbWVudHMgdXNlZCB0byBwb3B1bGF0ZSB0b2RvcyAqL1xuICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gIHByaXZhdGUgc3RhdGljIFRvRG9JblN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdO1xuICAvKipUb2RvIEhUTUwgZWxlbWVudHMgKi9cbiAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAqXG4gICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAqIEBwYXJhbSBUb0RvRWxlbWVudHMgV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICogIHRoZSBsaXN0IG1hcmt1cCwgcGFzc2luZyBpbiBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciBwbGFjZW1lbnQgb2YgdGhlIHdpZGdldC5cbiAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgLy9Td2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvXCI6XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbFwiOlxuICAgICAgY2FzZSBcIi9pbmRleC5odG1sXCI6XG4gICAgICBjYXNlIFwiL1wiOlxuICAgICAgY2FzZSBcIi9kaXN0L2luZGV4Lmh0bWxcIjpcbiAgICAgICAgLy9NYXJrdXAgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpKTtcbiAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIikpO1xuICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikpO1xuICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Zm9vdFwiKSk7XG4gICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSk7XG4gICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGZvb3RcIikpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICB0Ym9keS5pZCA9IFwiVG9Eb0l0ZW1zXCI7XG4gICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvcGFnZXMvdG9kb3MuaHRtbFwiOlxuICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSBkdWUgdG8gY2FjaGUgZW1wdHlcbiAgICAgICAgY29uc3QgaHRib2R5ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZUJvZHk7XG4gICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiXG4gICAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAqL1xuICBwcml2YXRlIHN0YXRpYyBnZXRUb0RvSW5TdG9yYWdlKFxuICAgIGNoZWNrZW1wdHl2YWx1ZXN0cmluZzogYm9vbGVhbixcbiAgICBsb2dtZXNzYWdlOiBib29sZWFuXG4gICkge1xuICAgIGlmIChcbiAgICAgIFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFxuICAgICAgICBcIlRvRG9MaXN0XCIsXG4gICAgICAgIFwiVG9Eb3NcIixcbiAgICAgICAgY2hlY2tlbXB0eXZhbHVlc3RyaW5nLFxuICAgICAgICBsb2dtZXNzYWdlXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBwYXJzZXN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVG9Eb3NcIik7XG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihwYXJzZXN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgLy9wYXJzZWQgSlNPTiBpcyBtYWxmb3JtZWRcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiVG9Eb3NcIik7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCxcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5Ub0RvSW5TdG9yYWdlID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICogQHJldHVybnMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzXG4gICAqL1xuICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgLy9FYWNoIHdpZGdldCBsb2NhdGlvbidzIGVsZW1lbnRzIG1heSB2YXJ5LCBzbyBhIGNhbGwgb2YgZ2V0VG9Eb0xpc3RFbGVtZW50cygpXG4gICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNUb0RPIHRhYmxlXCIpLFxuICAgICAgdG9kb1RhYmxlQm9keTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUb0RvSXRlbXNcIiksXG4gICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQWRkQnV0dG9uXCIpLFxuICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICB9O1xuICAgIHRoaXMubGlzdEVsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS5cbiAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAqL1xuICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIC8vQWRkIHRoZSBUb0RvcyBhcnJheSB0byBsb2NhbCBjYWNoZS5cbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICB9O1xuICAgIGxldCBUb0RvczogYW55ID0gW107IC8vVG9EbyBhcnJheVxuICAgIGxldCBzdHJnZnk7XG5cbiAgICBjb25zdCBzdHJpbmdpZnl0b2RvID0gKHRvZG9zdHI6IGFueSkgPT4ge1xuICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgIGxldCB0b2Rvc3N0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHRvZG9zdHIpKTtcbiAgICAgIGlmICghdG9kb3NzdHJnZnl0ZXN0LnBhc3NlZCkge1xuICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvZG9zc3RyZ2Z5dGVzdC5yZXR1cm5zdHI7XG4gICAgfTtcbiAgICAvL0ZpcnN0LCByZWFkIGN1cnJlbnQgTG9jYWwgU3RvcmFnZSBUb0Rvc1xuICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICBpZiAodG9kb3NzdG9yYWdlY2FjaGUpIHtcbiAgICAgIFRvRG9zID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gY2FjaGUga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCVjPFJXQj4lY0FkZGVkIHRvLWRvIGNhY2hlOiAke2Rlc2NyaXB0aW9ufWAsXG4gICAgICBcImNvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Y3lhbjtcIlxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICogIHB1bGxlZCBpbmRpdmlkdWFsbHkgZnJvbSB0aGUga2V5LXZhbHVlIHBhaXIgb2JqZWN0LlxuICAgKiBAcGFyYW0gaXRlbSAtIHRoZSBUby1EbyBpdGVtIHJlcXVlc3RlZCB0byByZW1vdmVcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcihcbiAgICAgIHRvZG8gPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbVxuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIGNhY2hlOiAke2l0ZW19YCxcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47XCJcbiAgICApO1xuICAgIGxldCB0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdCA9IE9iamVjdC5jcmVhdGUoXG4gICAgICBuZXcgUldCU3RyaW5naWZ5SlNPTihUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlKVxuICAgICk7XG4gICAgaWYgKCF0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdC5wYXNzZWQpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQganNvbnN0ciA9IHRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnJldHVybnN0cjtcbiAgICBpZiAoanNvbnN0ciA9PSBcIlwiIHx8IGpzb25zdHIgPT0gXCJbXVwiKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlRvRG9zXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb0Rvc1wiLCBqc29uc3RyKTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAqICBBIHJvdyBjb25zaXN0cyBvZiB0aHJlZSBjb2x1bW5zOiBhIGNvbXBsZXRlIHRpY2stYm94LCBhIGRlc2NyaXB0aW9uLCBhbmQgYSBkZWxldGUgYnV0dG9uLlxuICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICovXG4gIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgLy9DcmVhdGUgYSB0YWJsZSByb3cgd2l0aCBjaGVja2JveCBhbmQgZGVsZXRlIG9wdGlvbnNcbiAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBuZXdSb3cgPSB0YWJsZUZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTsgLy9BZGQgcm93XG4gICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgY29uc3QgY2hlY2tCT1ggPSBmaXJzdENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpOyAvL0FkZCBjaGVja2JveFxuICAgIGNvbnN0IG5ld0lURU0gPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICBjb25zdCBkZWxCT1ggPSBzZWNvbmRDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTsgLy9BZGQgZGVsZXRlYm94XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcIm51bVwiLFxuICAgICAgVG9Eb0xpc3QuVG9ET3NcbiAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1RvRE8gdGRbbnVtXVwiKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvTGlzdC5Ub0RPc1xuICAgICAgICAgICAgKS50b1N0cmluZygpO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgOiAoMSkudG9TdHJpbmcoKVxuICAgICk7XG4gICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uOyAvL1BvcHVsYXRlIHNlY29uZCBjb2xcbiAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcblxuICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAvL0FkZCB0byBsaXN0IHN0b3JhZ2VcbiAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsXG4gICAgICBcImNvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Z29sZDtcIlxuICAgICk7XG5cbiAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIHRoZSBUby1EbyBpdGVtIHJvd3MgZnJvbSBUby1Eb3Mgc3RvcmVkIGluIHRoZSBicm93c2VyIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgaWYgKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UodHJ1ZSwgZmFsc2UpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5BZGRUb0RvUm93KFRvRG9MaXN0LlRvRG9JblN0b3JhZ2VbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICovXG4gIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRCdXR0b247XG4gICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgIGlmIChBRERCVVRUT04gPT0gbnVsbCAmJiBBRERJVEVNRU5URVIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgfVxuICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3QgZnJvbSBjbGlja2luZyB0aGUgYWRkIGJ1dHRvbiovXG4gICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG4gICAgLyoqQWRkIGlucHV0IHRleHQgdG8gdGhlIHRvZG8gbGlzdCB3aGVuIHVzaW5nIGtleSBlbnRlciovXG4gICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgICAgaWYgKGUuY29kZSA9PSBcIk51bXBhZEVudGVyXCIgfHwgZS5jb2RlID09IFwiRW50ZXJcIikge1xuICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAqICBub3QgcmVtb3ZlZCBmcm9tIHN0b3JhZ2Ugd2l0aG91dCAnQ29tcGxldGU/JyBjaGVja2Vib3ggY2hlY2tlZC5cbiAgICogQHBhcmFtIGJveCBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIERlbGV0ZUJ1dHRvbihib3g6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICBib3gucGFyZW50Tm9kZSA9PSBudWxsIHx8XG4gICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCB8fFxuICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyA9PSBudWxsXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGEgdGFibGUgZWxlbWVudC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmdcbiAgICApO1xuICAgIC8qKiBJbnB1dCBlbGVtZW50ICovXG4gICAgY29uc3Qgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICBjb25zdCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICApO1xuICAgIGxldCBpID0gdHIucm93SW5kZXg7XG4gICAgY29uc3QgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgLy9yZW1vdmUgcm93IHNpbmNlIGNvbXBsZXRlZFxuICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO1wiXG4gICAgICApO1xuICAgICAgaWYgKHZhbHVlICE9IFwiQWRkIGEgVG9ETyBJdGVtLlwiKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG5cbiAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCxcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7XCJcbiAgICAgICk7XG4gICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gc2VlZCB0aGUgVG8tRG8gTGlzdCB3aGVuIHRoZXJlIGFyZSBubyBMb2NhbCBTdG9yYWdlIGl0ZW1zXG4gICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKGZhbHNlLCB0cnVlKSkgcmV0dXJuO1xuICAgIC8vQ3JlYXRlIGEgc2FtcGxlIGVudHJ5IGluIHRoZSBUb0RvIHRhYmxlIGFzIGEgcGxhY2Vob2xkZXJcbiAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG4gICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICBUb0RvTGlzdC5Ub0RPcysrO1xuXG4gICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG86ICR7dGQyREVMLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtcIlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxufVxuIl19

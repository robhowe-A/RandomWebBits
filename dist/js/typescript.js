(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const DictionarySearch_1 = require("../models/DictionarySearch");
/**
 * Component containing the dictionary widget's creation.
 */
const DictionaryWidget = {
    /**
     * This initialization function creates a dictionary search widget by calling the
     *  constructor.
     * @param elem - Element containing 'dictionaryWidget' class
     */
    init: (elem) => {
        // DictionarySearch constructor
        new DictionarySearch_1.DictionarySearch(elem);
    }
};
exports.default = DictionaryWidget;

},{"../models/DictionarySearch":14}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ExpandingList_1 = require("../models/ExpandingList");
const ExpandingListDOMWidget = {
    init: () => {
        // Define the expanding list element, for use within the page
        customElements.define('expanding-list', ExpandingList_1.ExpandingListElement, { extends: 'ul' });
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
exports.default = ExpandingListDOMWidget;

},{"../models/ExpandingList":16}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const FlashcardCardElems_1 = require("../models/FlashcardCardElems");
const flashcardgameWidget = {
    init: () => {
        // Establish which port numbers to test and the definition
        const portdefinitions = new Map([
            [22, "Secure SSH  /TCP"],
            [23, "Telnet (unsecure)"],
            [25, "SMTP - 465 for encrypted."],
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
            [587, "SMTPS for MSA"],
            [636, "LDAP SSL"],
            [990, "FTPS"],
            [1812, "RADIUS  /TCP/UDP"],
            [1813, "RADIUS  /TCP/UDP"],
            [3269, "Microsoft Global Catalog"],
            [3389, "RDP"],
        ]);
        // Create flashcard elements
        let mainFlashCardDivs = new FlashcardCardElems_1.default(portdefinitions);
        // Add the game's title element
        let mainFlashCardPageDiv = document.getElementById("mainFlashCards");
        const gametitleElem = mainFlashCardPageDiv.appendChild(document.createElement("h2"));
        gametitleElem.innerText = "Computing Port Numbers";
        // Add the flashcards to page
        for (let elem of mainFlashCardDivs.m_flashcardsArr) {
            mainFlashCardPageDiv.appendChild(elem);
        }
    }
};
exports.default = flashcardgameWidget;

},{"../models/FlashcardCardElems":17}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const GrowingCard_1 = require("../models/GrowingCard");
const ActiveCardsWidget = {
    init: () => {
        customElements.define('growing-card', GrowingCard_1.GrowingCardElement, { extends: 'li' });
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
                    GrowingCard_1.GrowingCardElement.shrinkCard(tempItem);
                }
            }
            // Reshade all cards because none of them are big
            for (let li of listLIs) {
                GrowingCard_1.GrowingCardElement.shadeInactiveCard(li);
            }
        });
    }
};
exports.default = ActiveCardsWidget;

},{"../models/GrowingCard":18}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const LinkDetails_1 = require("../models/LinkDetails");
//Header navigation links
const homeNavLink = new LinkDetails_1.default("Index", "Home", "Home", "index.html");
const pagesNavLink = new LinkDetails_1.default("Pages", "Pages", "Pages", "pages.html");
const gameNavLink = new LinkDetails_1.default("Game", "FlashCards", "Game", "flashcards.html");
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
const HeaderFooter = {
    headerWidget: {
        init: () => {
            const pageMain = document.querySelector('main');
            let siteHeader;
            // Add header element to the page
            if (pageMain != null) {
                // if main element exists, add the header to it
                siteHeader = pageMain.insertAdjacentElement('beforebegin', HeaderFooter.headerWidget.buildHeader(pageMain));
                if (siteHeader != null)
                    siteHeader.prepend(HeaderFooter.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null before 'main' element.");
            }
            else {
                // if main element does not exist, add the header to the body
                siteHeader = document.body.insertAdjacentElement('afterbegin', HeaderFooter.headerWidget.buildHeader(null));
                if (siteHeader != null)
                    siteHeader.prepend(HeaderFooter.headerWidget.buildNavigation());
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
                navListLinks.setAttribute("title", item.title);
            });
            return headerNavFrag;
        }
    },
    footerWidget: {
        init: () => {
            // Add footer element to the page end
            let footer = HeaderFooter.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HeaderFooter.footerWidget.buildFaviconAttribution(footer));
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
exports.default = HeaderFooter;

},{"../models/LinkDetails":19}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const data_AttributionLinks_1 = require("../lib/data_AttributionLinks");
class RWBCard {
    buildRWBCardMarkup(article) {
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
        let WebBit = document.createElement('div');
        let RWBElements = {
            cardImg: document.createElement('img'),
            cardImgTop: document.createElement('div'),
            cardBody: document.createElement('div')
        };
        let cardBodyHeading = document.createElement('h3');
        let cardBodyPara = document.createElement('p');
        let cardBodyLink = document.createElement('a');
        RWBElements.cardImgTop.appendChild(RWBElements.cardImg);
        RWBElements.cardBody.appendChild(cardBodyHeading);
        RWBElements.cardBody.appendChild(cardBodyPara);
        RWBElements.cardBody.appendChild(cardBodyLink);
        // Add card data attributes and property values
        WebBit.classList.add('card');
        RWBElements.cardBody.classList.add("cardBody");
        RWBElements.cardImg.setAttribute('src', article.cardImage);
        RWBElements.cardImg.setAttribute('alt', article.cardImageALT);
        RWBElements.cardImg.setAttribute('Article', article.articleNumber.toString());
        cardBodyLink.setAttribute('href', article.articleLink);
        cardBodyHeading.innerText = article.name;
        cardBodyPara.textContent = article.description;
        cardBodyLink.textContent = "Go to Page";
        // Image attribution may be needed for the image used
        // Attribution data is imported as 'attrlinks' signature parameter
        data_AttributionLinks_1.default.map((link) => this.buildRWBCardAttributionPanel(RWBElements, link));
        // The card is WebBit
        // Add the markup to the containing element
        WebBit.appendChild(RWBElements.cardImgTop);
        WebBit.appendChild(RWBElements.cardBody);
        return WebBit;
    }
    buildRWBCardAttributionPanel(cardAttrElement, link) {
        // To determine image attribution, the image id and article id will match,
        // otherwise the data isn't entered, causing a miss
        if (cardAttrElement.cardImg.getAttribute('Article') === link.articleid.toString()) {
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
            const cardInner = cardAttrElement.cardImgTop.appendChild(document.createElement("div"));
            const cardFront = cardInner.appendChild(document.createElement("div"));
            cardFront.appendChild(cardAttrElement.cardImg); // move image within card front divisor
            let smallImg = cardAttrElement.cardImg.cloneNode(false);
            const cardBack = cardInner.appendChild(document.createElement("div"));
            const backHeading = cardBack.appendChild(document.createElement("h3"));
            cardBack.appendChild(smallImg);
            const backPara = cardBack.appendChild(document.createElement("p"));
            const attributeLink = cardAttrElement.cardBody.appendChild(document.createElement("a")); //append to front panel
            // Add flip-panel data attributes and property values
            cardAttrElement.cardImgTop.classList.add("flip-card");
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
    }
}
exports.default = RWBCard;

},{"../lib/data_AttributionLinks":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ToDo_1 = require("../models/ToDo");
/**
 * Component containing the To-Do List widget's creation.
 */
const ToDosWidget = {
    /**
     * Create a To-Do List widget.
     * @param elem - Element containing 'ToDoList' class
     */
    init: (elem) => {
        // ToDoList constructor
        const todoWidget = new ToDo_1.ToDoList();
        // Creates the markup needed and imports data from local storage, containing the todo items
        todoWidget.createToDoListWidget(elem);
    }
};
exports.default = ToDosWidget;

},{"../models/ToDo":21}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const data_1 = require("../lib/data");
const RandomWebBits_1 = require("../models/RandomWebBits");
const RWBCardsWidget = {
    init: () => {
        // Split the cards arrays into their respective category
        let cardsSection = [
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Arbitrary Articles:"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Guide Shorts:"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Exlore the Web:"),
        ];
        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores 
        let cardsArticles = [
            RandomWebBits_1.RandomWebBits.buildArticleCards(data_1.default.shift()),
            RandomWebBits_1.RandomWebBits.buildArticleCards(data_1.default.shift()),
            RandomWebBits_1.RandomWebBits.buildArticleCards(data_1.default.shift()),
        ];
        // Routes -> Add widget and format pages
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
    }
};
exports.default = RWBCardsWidget;

},{"../lib/data":9,"../models/RandomWebBits":20}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const WebBit_1 = require("../models/WebBit");
// Create new AA (Arbitrary Article)
const ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup"), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example"), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate"), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo"), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon"), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction"), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo"), new WebBit_1.default("IP Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon"), new WebBit_1.default("HTML Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon"), new WebBit_1.default("Network Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon"), new WebBit_1.default("PowerShell Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon"), new WebBit_1.default("LEARN: DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard"), new WebBit_1.default("LEARN: Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon"), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon"), new WebBit_1.default("WebIDE", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon"), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example."), new WebBit_1.default("JavaScript", 26, "JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon."));
const GuideShorts = new Array(new WebBit_1.default("Search Verticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon"), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon"), new WebBit_1.default("DevTools", 19, "GUIDE: Dev Tools: Application Tab", "Review site data when clearing the browser history", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon"), new WebBit_1.default("DevToolsTwo", 21, "GUIDE: Dev Tools: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two"));
const Explore = new Array(new WebBit_1.default("nasa", 3, "EXPLORE: NASA Pages", "Explore the NASA domain. Learn about the universe via NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo"), new WebBit_1.default("Virtual Tour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON"));
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"../models/WebBit":22}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const AttributionLink_1 = require("../models/AttributionLink");
let ATTRIBUTIONLINKDATA = [
    new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1),
    new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2),
    new AttributionLink_1.default("NASA", "Image source via the National Aeronautics and Space Administration", "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html", "NASA", "NASA Pages", 3),
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
    new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24),
    new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25),
    new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)
];
exports.default = ATTRIBUTIONLINKDATA;

},{"../models/AttributionLink":13}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const HeaderFooter_1 = require("./components/HeaderFooter");
const WebBits_1 = require("./components/WebBits");
const ToDos_1 = require("./components/ToDos");
const DictionaryWidget_1 = require("./components/DictionaryWidget");
const ExpandingListDOMWidget_1 = require("./components/ExpandingListDOMWidget");
const GrowingCard_1 = require("./components/GrowingCard");
const FlashcardGameWidget_1 = require("./components/FlashcardGameWidget");
// entry point
(() => {
    //PERF: let t1 = performance.now();
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
        HeaderFooter_1.default.headerWidget.init();
        HeaderFooter_1.default.footerWidget.init();
        // Initialize page components
        // dom.html page uses expandingLists component
        if (window.location.pathname == '/pages/dom.html' ||
            window.location.pathname == '/pages/svg.html') {
            ExpandingListDOMWidget_1.default.init();
        }
        // Initialize webIDE widget
        if (window.location.pathname == '/pages/webides.html') {
            GrowingCard_1.default.init();
        }
        // Initialize webIDE page components
        if (window.location.pathname == '/flashcards.html') {
            FlashcardGameWidget_1.default.init();
        }
        // Add dictionary widget if that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement) {
            DictionaryWidget_1.default.init(dictionaryElement);
        }
        // Add ToDos widget if that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            ToDos_1.default.init(toDosElement);
        //PERF: let t2 = performance.now();
        //PERF: const totaltime = t2 - t1;
        //PERF: console.log("the time is: ", totaltime);
    });
})();

},{"./components/DictionaryWidget":1,"./components/ExpandingListDOMWidget":2,"./components/FlashcardGameWidget":3,"./components/GrowingCard":4,"./components/HeaderFooter":5,"./components/ToDos":7,"./components/WebBits":8}],12:[function(require,module,exports){
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
    GETURL;
    sendToBrowserCache = false;
    browserCacheName;
    errorElem;
    dataIsInCache = false; //TODO: dataincache overall
    receivedData; //TODO: check if this is needed
    /**
     * This constructor gathers all the needed information for fetch and/or browser
     *  storage.
     *
     * @param GETURL - the (full) url of data request.
     * @param sendToBrowserCache  - Boolean value determining fetch caching.
     * @param browserCacheName - If storing the request in browser cache, this string provides the name for storage.
     * @param errorElem - Should the fetch request fail, return error status to this element.
     */
    constructor(GETURL, sendToBrowserCache, errorElem, browserCacheName) {
        this.GETURL = GETURL;
        this.sendToBrowserCache = sendToBrowserCache;
        this.browserCacheName = browserCacheName;
        this.errorElem = errorElem;
    }
    /**
     *
     * @returns this.sendToBrowserCache
     */
    getSendToBrowserCache() {
        return this.sendToBrowserCache;
    }
    /**
     *
     * @returns this.GETURL
     */
    getGETURL() {
        return this.GETURL;
    }
    ;
    /**
     * Flip this.sendToBrowserCache boolean value from the current value.
     */
    setSendToBrowserCache() {
        return this.sendToBrowserCache ? false : true;
    }
    /**
     * A fetch request can take URL or string parameter. This function sets the apiGET
     *  object for a URL fetch by creating a URL from the string, or passing the URL.
     * @param GETURL - the (full) url of data request.
     */
    setGETURL(GETURL) {
        if (typeof GETURL === 'string') {
            this.GETURL = new URL(GETURL);
        }
        else {
            this.GETURL = GETURL;
        }
    }
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
    /**
     * The fetch request, returning a fetch promise.
     * @param GETURL - the (full) url of data request.
     * @returns data.text() or data based on the instance returned.
     */
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
    /**
     * A public function, creating a data promise object for the called fetch function. If
     *  the request needs added to browser storage, the fetch is made and sent to
     *  storage. A cloned copy of the fetched data is returned. Without sending to
     *  browser cache, the fetch is requested and returned.
     * @param GETURL - the (full) url of data request.
     * @returns dataCachePromise: Promise<unknown>
     */
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
            let dataCachePromise = new Promise((resolve, reject) => {
                resolve(this.fetchData(GETURL));
            });
            dataCachePromise.then((data) => {
                return data;
            });
            return dataCachePromise;
        }
    }
}
exports.apiGET = apiGET;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
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

},{"./LinkDetails":19}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionarySearch = void 0;
//--Copyright (c) 2023 Robert A. Howell
const API_1 = require("../models/API");
const DictionarySearchWidget_1 = require("./DictionarySearchWidget");
/**
 * A DictionarySearch is a set of markup creation and functions which allow a user
 *  to look up a word like a Dictionary. When called, the user's input is validated
 *  as an acceptable word or it declines the request, then showing the user if the word
 *  is acceptable.
 *
 * Creating a dictionary search widget requires passing a reference element (for a
 *  known placement location) that contains the 'dictionaryWidget' class.
 *
 *   new DictionarySearch(elem);
 *
 * All the needed elements and functionality are added to the page.
 *
 */
class DictionarySearch extends DictionarySearchWidget_1.default {
    static wordStorage;
    static isExistingCacheinBrowser;
    static cachedWordsCount;
    static existingCaches;
    static requestUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    previousWordsBtnIsCreated = false;
    previousWordsBtnWasClicked = false;
    previousWordsNotFoundOnce = false;
    wordURL;
    wordData;
    dictionarySearchMarkup;
    /**
     * This constructor creates all the functionality and markup needed for the
     *  Dictionary Search widget interface.
     *
     * @param elem - The reference element used to place widget markup.
     */
    constructor(elem) {
        // Invoke DictionarySearchWidget superclass constructor.
        super();
        // Call creation for all the markup needed to begin the widget
        this.dictionarySearchMarkup = this.createDictionaryWidgetMarkup(elem);
        // Initialize the dictionary widget with click event listeners
        this.addWidgetEvents();
        DictionarySearch.getLocalStorageWordCaches();
    }
    /**
     * Retrieve Local Storage words previously stored with the Dictionary Search Widget.
     *
     * @returns DictionarySearch.wordStorage - these are the words stored previously in the
     *  browser cache.
     */
    static getLocalStorageWordCaches() {
        //enumerate all of the caches
        //cache response links and cache name are previously stored in local storage
        //Enumerate local storage 'word-caches' items
        let storageStr = localStorage.getItem('word-caches');
        if (storageStr != null) {
            DictionarySearch.wordStorage = JSON.parse(storageStr);
            return DictionarySearch.wordStorage;
        }
    }
    /**
     * Call to return the previously searched word.
     *
     * @returns this.wordURL
     */
    getWordURL() {
        return this.wordURL;
    }
    /**
     * Call to return the fetched word data.
     *
     * @returns this.wordData
     */
    getWordData() {
        return this.wordData;
    }
    /**
     * Adds click and keypress event listeners to the widget. Input event listeners 'click'
     *  and 'keypress' await for a search call. Also, should a user want to search a
     *  previously searched word, the widget adapts markup for that request.
     */
    addWidgetEvents() {
        if (this.dictionarySearchMarkup == undefined) {
            console.log("A search element is undefined from searchWord | wordSearch");
            return;
        }
        //Add form input event listeners
        //Upon input entry, fire API fetch
        this.dictionarySearchMarkup.wordSearch.addEventListener("click", (event) => {
            event.preventDefault();
            this.wordSearch(this.dictionarySearchMarkup, false, null);
        });
        this.dictionarySearchMarkup.searchWord.addEventListener("keypress", (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.wordSearch(this.dictionarySearchMarkup, false, null);
            }
        });
        // "Previous word searches" button fetches locally stored words
        // Clicking the button displays each word in a list within the widget
        this.dictionarySearchMarkup.previousWordBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const placementlocationholder = document.querySelector(".previousWords");
            let buttonContainer = document.getElementById("dictionary-btns");
            let newButtonContainer;
            if (this.previousWordsBtnWasClicked == false) {
                if (this.previousWordsBtnIsCreated == false) {
                    newButtonContainer = placementlocationholder.insertAdjacentElement('afterend', document.createElement("div"));
                    newButtonContainer.id = "dictionary-btns";
                    //Check the placement location and word caches for undefined
                    if (placementlocationholder != undefined && DictionarySearch.wordStorage !== undefined) {
                        for (let wordCache of DictionarySearch.wordStorage) {
                            const cacheWordHeadingElem = newButtonContainer.appendChild(document.createElement("button"));
                            cacheWordHeadingElem.setAttribute("type", "button");
                            cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
                            cacheWordHeadingElem.textContent = wordCache.word;
                            //add event listener for new button
                            cacheWordHeadingElem.addEventListener("click", (event) => {
                                event.preventDefault();
                                this.wordSearch(this.dictionarySearchMarkup, true, wordCache);
                            });
                            this.previousWordsBtnIsCreated = true;
                        }
                    }
                    else {
                        if (this.previousWordsNotFoundOnce == false) {
                            const noWordsHeadingElem = newButtonContainer.appendChild(document.createElement("div"));
                            noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                            noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                            this.previousWordsNotFoundOnce = true;
                            this.previousWordsBtnWasClicked = true;
                        }
                        else {
                            buttonContainer.style.display = "block";
                            this.previousWordsBtnWasClicked = true;
                            return;
                        }
                    }
                }
                else {
                    buttonContainer.style.display = "block";
                    this.previousWordsBtnWasClicked = true;
                    return;
                }
            }
            else {
                buttonContainer.style.display = "none";
                this.previousWordsBtnWasClicked = false;
                return;
            }
        });
        this.dictionarySearchMarkup.refreshBtn.addEventListener("click", (event) => {
            event.preventDefault();
            location.reload();
        });
    }
    /**
     * Adds the fetched term to the browser's Local Storage --> Key/Value
     * data referencing if words are in local cache.
     *
     * @param sendToBrowserCache - //TODO: testing add/delete
     * @param localstoragevalue - This is an interface implementation, storing
     *  information where sending to local storage.
     */
    addDictionaryTermtoLocalStorage(sendToBrowserCache, localstoragevalue) {
        let wordStore = [];
        wordStore.push(localstoragevalue);
        // Add the cache item to Local Storage
        try {
            if (localStorage.getItem('word-caches') == null) {
                // Local storage empty => add the word
                localStorage.setItem('word-caches', JSON.stringify(wordStore));
                return;
            }
            // Add word to current 'word-caches' in local storage
            let storageStr = localStorage.getItem('word-caches');
            if (storageStr == null) {
                try {
                    throw new Error("'word-caches' values are null. Try clearing browser cache.");
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
                    if (cache.wordURL == localstoragevalue.wordURL) {
                        // Word is already in local storage
                        // No need to add it to the array
                        return;
                    }
                }
                // Add word to existing 'word-caches' in local storage
                allcache.push(localstoragevalue);
                localStorage.setItem('word-caches', JSON.stringify(allcache));
            }
        }
        catch (err) {
            console.log("Problem storing key-value. Error: ", err);
        }
    }
    /**
     * This function structures inbound fetch request before sending an API fetch
     * request. apiGET() is created and called based on parameter data.
     *
     * @param word - The word searched from widget input.
     * @param wordUrl - The fetch request URL.
     * @param searchElems - Widget Elements -- used for data validation.
     * @param sendToCache - ? Send fetch request to Cache Storage : Fetch without storing the request.
     * @param cacheName - If sending fetch requests to cache, provide a name to store it under.
     * @returns - wordData: Promise<unknown>
     */
    fetchDictionaryTerm(word, wordUrl, searchElems, sendToCache, cacheName) {
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
        let wordcache = {
            inCache: sendToCache,
            word: word,
            wordURL: wordUrl,
            cacheName: sendToCache ? cacheName : "",
        };
        const wordFetchRequest = async () => {
            //set apiGET::sendToBrowserCache to true to use cache storage
            const wordFetch = new API_1.apiGET(wordcache.wordURL, false, searchElems.errorElem, wordcache.cacheName);
            let noDefinitions = false;
            //fetch request
            let data = await wordFetch.apiGET(wordFetch.getGETURL());
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }
            let wordData = data;
            //check if the returned object is valid word data definitions
            if (typeof data == 'object') {
                if (Object.hasOwn(wordData, 'title')) {
                    // no definitions were found
                    noDefinitions = true;
                }
            }
            if (data != undefined && !noDefinitions) { // good fetch--> move forward to markup render
                this.addDictionaryTermtoLocalStorage(wordFetch.getSendToBrowserCache(), wordcache);
                return data;
            }
            else {
                if (navigator.onLine !== false) { // check network status via navigator object
                    if (noDefinitions) {
                        if (wordData.title == "No Definitions Found")
                            searchElems.searchWord.classList.add("invalid-notfound");
                        searchElems.errorElem.classList.add("error-notfound");
                        searchElems.errorElem.innerText = "No Definitions Found";
                    }
                    else {
                        searchElems.searchWord.classList.add("invalid-notfound");
                        searchElems.errorElem.classList.add("error-notfound");
                        searchElems.errorElem.innerText = "Invalid word!";
                    }
                }
                else {
                    searchElems.errorElem.innerText += ", check network connection.";
                }
            }
        };
        let wordData = wordFetchRequest();
        return wordData;
    }
    /**
     * User input validation function tests the input string against a valid Regular Expression.
     *
     * RegExp("^[A-Za-z]{1,45}$")
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
    /**
     * callFetchDictionaryTerm creates a promise to fetch a dictionary term.
     * Of data ingress ti DictionarySearch, markup creation is called for.
     *
     * @param searchElems - Widget Elements -- used for data validation.
     * @param word - The word to be fetched.
     * @param wordURL - A URL object composing the full string of the fetch request.
     */
    callFetchDictionaryTerm(searchElems, word, wordURL) {
        // When the word data resolves, call markup functions
        let wordDataPromise = new Promise((resolve) => {
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, false, null));
        });
        wordDataPromise.then((data) => {
            this.wordData = data;
            this.createDictionaryTermWithMarkup(data, searchElems);
        });
        // Remove unneeded classes if applied previously
        searchElems.searchWord.classList.remove("invalid");
        searchElems.searchWord.classList.remove("invalid-notfound");
        searchElems.errorElem.classList.remove("error");
        searchElems.errorElem.classList.remove("error-notfound");
        searchElems.errorElem.textContent = "";
    }
    /**
     * wordSearch() begins a word search request. The user input listener chooses
     * whether the fetch is called from cache or is new.
     *
     * @param searchElems - Widget Elements -- used for data validation.
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
                ? acceptedInputWord = true : acceptedInputWord = false;
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
            }
        }
        searchElems.searchWord.value = ''; // reset input string
    }
}
exports.DictionarySearch = DictionarySearch;

},{"../models/API":12,"./DictionarySearchWidget":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A DictionarySearchWidget is made to create Dictionary Search markup for the
 *  page display. Without markup, a search widget does not exist for user
 *  interaction.
 *
 * Each public functions, the widget markup can be created in multiple site locations.
 *  All that is needed is a reference element for the widget's placement on
 *  the page.
 *
 */
class DictionarySearchWidget {
    /**
     * Primary widget markup structuring the widget elements and search input.
     *
     * @param elem - The reference element before the widget.
     * @returns searchElements: DictionarySearchElements --> interface of
     *  important HTML elements used through widget function.
     */
    createDictionaryWidgetMarkup(elem) {
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
                    let searchElements = {
                        searchWord: searchForm.appendChild(document.createElement("input")),
                        wordSearch: searchForm.appendChild(document.createElement("button")),
                        dictionaryElem: dictionary,
                        errorElem: searchForm.appendChild(document.createElement("span")),
                        previousWordBtn: previousWords.appendChild(document.createElement("button")),
                        refreshBtn: previousWords.appendChild(document.createElement("button")),
                    };
                    const fontAwesomeSearchIcon = searchElements.wordSearch.appendChild(document.createElement("i"));
                    // Add attributes and property values
                    previousWords.classList.add("previousWords");
                    searchElements.searchWord.classList.add("monospace");
                    searchElements.previousWordBtn.classList.add("dictionary-btn");
                    searchElements.refreshBtn.classList.add("dictionary-btn");
                    fontAwesomeSearchIcon.classList.add("fa");
                    fontAwesomeSearchIcon.classList.add("fa-search");
                    searchElements.searchWord.setAttribute('type', 'text');
                    searchElements.searchWord.setAttribute('placeholder', 'Search...');
                    searchElements.searchWord.setAttribute("aria-label", "Input");
                    searchElements.wordSearch.setAttribute('type', 'button');
                    searchElements.wordSearch.setAttribute("aria-label", "Search");
                    dictionary.id = "dictionary";
                    artH.textContent = "Dictionary Term:";
                    searchForm.id = "dictionary-search";
                    searchForm.action = "index.html";
                    searchElements.searchWord.id = "search-word";
                    searchElements.wordSearch.id = "word-search";
                    searchElements.previousWordBtn.innerText = "Previous Word Searches";
                    searchElements.refreshBtn.innerText = "Refresh";
                    return searchElements;
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
    /**
     * Creates the markup to house returned words from DictionarySearch. The markup
     *  is created based on API egress. Words and their definitions vary. The markup is
     *  adaptive to returned word data structures.
     *
     * @param wordData - This parameter is an object of word types, definitions, and examples.
     * @param searchElems - Widget Elements -- used for data validation.
     */
    createDictionaryTermWithMarkup(wordData, searchElems) {
        if (wordData == null || !(wordData instanceof Object)) {
            try {
                throw new Error("The data is null or an incorrect type");
            }
            catch (error) {
                console.log(error.message);
            }
            return;
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
    }
}
exports.default = DictionarySearchWidget;

},{}],16:[function(require,module,exports){
"use strict";
//Author: Robert A Howell, April 2023
//Original Author(s): Mozilla Contributors, MDN
//License: https://www.mozilla.org/en-US/about/governance/policies/participation/
//MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//Source distribution: https://github.com/mdn/web-components-examples/tree/main/expanding-list-web-component
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingListElement = void 0;
// Create a class for the element
class ExpandingListElement extends HTMLUListElement {
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
exports.ExpandingListElement = ExpandingListElement;

},{}],17:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
// This object creates an array of divs from input port number information
class FlashcardCardElems {
    m_flashcardsArr = [];
    m_portInfoMap;
    constructor(portnumbersMap) {
        this.m_portInfoMap = portnumbersMap;
        const mapIter = this.m_portInfoMap.keys();
        this.m_portInfoMap.forEach((port) => {
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
            // Add div to flashcard instance
            this.m_flashcardsArr.push(flashcard);
        });
    }
}
exports.default = FlashcardCardElems;

},{}],18:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowingCardElement = void 0;
class GrowingCardElement extends HTMLLIElement {
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
        if (GrowingCardElement.getIsAtLeastOneBig()) {
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
                GrowingCardElement.shrinkCard(item);
                GrowingCardElement.shadeInactiveCard(item);
                // set the scale property for each card
                if (item.style.scale == "") {
                    item.style.scale = "1";
                    item.style.zIndex = "1";
                }
            }
        }
    };
}
exports.GrowingCardElement = GrowingCardElement;

},{}],19:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
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

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomWebBits = void 0;
const RWBCard_1 = require("../components/RWBCard");
class RandomWebBits {
    static buildCardContainingSection(name) {
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
    }
    static buildArticleCards(cardsData) {
        // Iterate each card in the array. Build the card elements and add the data
        let AAs = cardsData.map((article) => {
            const rwbcard = new RWBCard_1.default();
            return rwbcard.buildRWBCardMarkup(article);
            ;
        });
        return AAs;
    }
}
exports.RandomWebBits = RandomWebBits;

},{"../components/RWBCard":6}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
/**
 * A ToDoList is an HTML widget to store To-Dos in the browser. Instantiate the
 *  ToDoList constructor to create widget markup and functionality. To-Dos are
 *  stored in the browser's local storage and read and rendered when the page loads.
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
    static todosInLocalStorage = false;
    static ToDOs = 0;
    static ToDoElements;
    listElements;
    static setToDoListElements(ToDoListElements) {
        ToDoList.ToDoElements = ToDoListElements;
    }
    /**
     * Random Web Bits uses multiple locations to apply the To-Do List widget. Create
     *  the list markup, passing in a reference element for placement of the widget.
     * @param elem - widget is placed after this reference element.
     */
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
                        // Markup does not exist on the page
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
                        this.getToDoListElements();
                        ToDoList.setToDoListElements(this.listElements);
                        this.populateToDoList();
                        this.addToDoEventListeners();
                        break;
                    case '/RandomWebBits/pages/todos.html':
                    case '/pages/todos.html':
                        // Markup exists on the page already
                        // With the elements created, set the class list elements
                        this.getToDoListElements();
                        ToDoList.setToDoListElements(this.listElements);
                        // Create a sample to do item (it is not stored in cache)
                        const htbody = ToDoList.ToDoElements.todoTableBody;
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
    /**
     * Gather necessary elements from the created widget.
     * @returns ToDoElements: ToDoListElements
     */
    getToDoListElements() {
        // Gather necessary elements from the created widget
        let ToDoElements = {
            todoTable: document.querySelector('#ToDO table'),
            todoTableBody: document.getElementById('ToDoItems'),
            addButton: document.getElementById('AddButton'),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        };
        this.listElements = ToDoElements;
    }
    /**
     * Checks for To-Do items previously in storage.
     * @returns boolean true or false
     */
    static isToDoInStorage() {
        let todos = JSON.parse(localStorage.getItem('ToDos'));
        if (todos == null) {
            return false;
        }
        else
            return true;
    }
    /**
     * Adds a To-Do string to Local Storage. The 'localstoragetodocache' interface
     *  structures the data for later retrieval.
     * @param description - User form input to add as a description.
     */
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
                ToDoList.todosInLocalStorage = true;
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
    /**
     * Removes a To-Do item from Local Storage. The requested To-Do to remove is
     *  pulled individually from the key-value pair object.
     * @param item - the To-Do item requested to remove
     */
    removetoDoFromStorage(item) {
        if (!ToDoList.isToDoInStorage()) {
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
    /**
     * This function creates the necessary markup to add a row to the To-Do table.
     *  A row consists of three columns: a complete tick-box, a description, and a delete button.
     * @param description - User form input to add as a description.
     * @param firstPaint - Boolean value used by adding list storage
     */
    AddToDoRow(description, firstPaint) {
        //Create a table row with checkbox and delete options
        const TABLEITEM = ToDoList.ToDoElements.todoTable;
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
            newITEM.setAttribute('num', ToDoList.ToDOs ? (() => {
                let elem = document.querySelector('#ToDO td[num]');
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoList.ToDOs).toString();
            })() : (1).toString());
            newITEM.textContent = description.toString(); //Populate second col
            ToDoList.ToDOs++; //Number of Items
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
    /**
     * Function called to create the To-Do item rows from To-Dos stored in the browser Local Storage.
     */
    populateToDoList() {
        //retrieve todo items in local storage and add each to the list
        let parsedToDos = JSON.parse(localStorage.getItem('ToDos'));
        if (parsedToDos != null) {
            for (let i = 0; i < parsedToDos.length; i++) {
                this.AddToDoRow(parsedToDos[i].todoitem, false);
            }
        }
    }
    /**
     * Adds button functionality: Delete, Add.
     */
    addToDoEventListeners() {
        const ADDBUTTON = ToDoList.ToDoElements.addButton;
        const ADDITEMENTER = ToDoList.ToDoElements.addItemToEnter;
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
    /**
     * function determining the delete button. Items are deleted when pushed, but are
     *  not removed from storage without 'Complete?' checkebox checked.
     * @param box checkbox element
     */
    DeleteButton(box) {
        if (box.parentNode != null && box.parentNode.previousSibling != null &&
            box.parentNode.previousSibling.previousSibling != null) {
            let rowChkBx = box.parentNode.previousSibling.previousSibling;
            let rowChkBxIN = rowChkBx.childNodes[0];
            const todoTable = ToDoList.ToDoElements.todoTable;
            if (todoTable != null) {
                let tr = box.parentNode.parentNode;
                let i = tr.rowIndex;
                let value = box.parentNode.previousSibling.textContent;
                if (rowChkBxIN.checked) {
                    //remove row since completed
                    todoTable.deleteRow(i);
                    if (value != 'Add a ToDO Item.') {
                        ToDoList.ToDOs--;
                        //delete associated storage item
                        this.removetoDoFromStorage(value);
                    }
                }
                else {
                    todoTable.deleteRow(i);
                    ToDoList.ToDOs--;
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
    /**
     * This function is called to seed the To-Do List when there are no Local Storage items
     *  which would populate the list. The sample remains on page but is never stored in the browser.
     * @param tbody table body element
     */
    createSampleTo_Do(tbody) {
        if (!ToDoList.isToDoInStorage()) {
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
            ToDoList.ToDOs++;
            //"delete" event listener
            td2DEL.addEventListener("click", () => { this.DeleteButton(td2DEL); });
        }
    }
}
exports.ToDoList = ToDoList;

},{}],22:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
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

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1JXQkNhcmQudHMiLCJzcmMvY29tcG9uZW50cy9Ub0Rvcy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvbGliL2RhdGEudHMiLCJzcmMvbGliL2RhdGFfQXR0cmlidXRpb25MaW5rcy50cyIsInNyYy9tYWluLnRzIiwic3JjL21vZGVscy9BUEkudHMiLCJzcmMvbW9kZWxzL0F0dHJpYnV0aW9uTGluay50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaC50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaFdpZGdldC50cyIsInNyYy9tb2RlbHMvRXhwYW5kaW5nTGlzdC50cyIsInNyYy9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zLnRzIiwic3JjL21vZGVscy9Hcm93aW5nQ2FyZC50cyIsInNyYy9tb2RlbHMvTGlua0RldGFpbHMudHMiLCJzcmMvbW9kZWxzL1JhbmRvbVdlYkJpdHMudHMiLCJzcmMvbW9kZWxzL1RvRG8udHMiLCJzcmMvbW9kZWxzL1dlYkJpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsdUNBQXVDO0FBQ3ZDLGlFQUE2RDtBQUU3RDs7R0FFRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDckI7Ozs7T0FJRztJQUNILElBQUksRUFBRSxDQUFDLElBQWEsRUFBRSxFQUFFO1FBQ3BCLCtCQUErQjtRQUMvQixJQUFJLG1DQUFnQixDQUFDLElBQUksQ0FB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V0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ3BDLENBQUM7Q0FDSjtBQUVELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaCB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaFwiXG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IERpY3Rpb25hcnlXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBjcmVhdGVzIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IGJ5IGNhbGxpbmcgdGhlXG4gICAgICogIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG4gICAgICAgIC8vIERpY3Rpb25hcnlTZWFyY2ggY29uc3RydWN0b3JcbiAgICAgICAgbmV3IERpY3Rpb25hcnlTZWFyY2goZWxlbSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEV4cGFuZGluZ0xpc3RFbGVtZW50IH0gZnJvbSBcIi4uL21vZGVscy9FeHBhbmRpbmdMaXN0XCI7XG5cbmNvbnN0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBEZWZpbmUgdGhlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQsIGZvciB1c2Ugd2l0aGluIHRoZSBwYWdlXG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZXhwYW5kaW5nLWxpc3QnLCBFeHBhbmRpbmdMaXN0RWxlbWVudCwgeyBleHRlbmRzOiAndWwnIH0pO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50IHByb3BlcnRpZXNcbiAgICAgICAgLy8gXCJET01cIiBwYWdlIHNwZWNpZmljIHByb3BlcnRpZXNcbiAgICAgICAgLy8gQWRkIGEgdGl0bGUgYXR0cmlidXRlIHRvIGFsbCBsaS1zcGFuIHRoYXQgY2FuIGV4cGFuZCBmdXJ0aGVyXG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaU9wZW5PcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOmZpcnN0LWNoaWxkYCk7XG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaUNsb3NlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpudGgtY2hpbGQoMylgKTtcblxuICAgICAgICAvLyBTZXQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzIGZvciBleHBhbmRpbmctZWxlbWVudCBleHBhbmRhYmxlIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpT3Blbk9wZW4pIHtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlICdET00nIGl0ZW1zIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyAtLS0+d2hlbiBjbGlja2VkLCBjaGFuZ2UgdGhlIHRpdGxlIHByb3BlcnR5IHRvIHJlZmxlY3Qgb3BlbiBvciBjbG9zZWQgc3RhdHVzXG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3Bhbi5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgPT0gJ1NlbGVjdCB0byBleHBhbmQuLi4nXG4gICAgICAgICAgICAgICAgICAgID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gY2xvc2UuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gY2xvc2UuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICAgICAgOiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgcHJvcGVydHkgb2YgY2xvc2luZyBzcGFuIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEZsYXNoY2FyZENhcmRFbGVtcyBmcm9tICcuLi9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zJ1xuXG5jb25zdCBmbGFzaGNhcmRnYW1lV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gRXN0YWJsaXNoIHdoaWNoIHBvcnQgbnVtYmVycyB0byB0ZXN0IGFuZCB0aGUgZGVmaW5pdGlvblxuICAgICAgICBjb25zdCBwb3J0ZGVmaW5pdGlvbnMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gICAgICAgICAgICBbMjIsIFwiU2VjdXJlIFNTSCAgL1RDUFwiXSxcbiAgICAgICAgICAgIFsyMywgXCJUZWxuZXQgKHVuc2VjdXJlKVwiXSxcbiAgICAgICAgICAgIFsyNSwgXCJTTVRQIC0gNDY1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICAgICAgICAgICAgWzQ5LCBcIlRBQ0FDUytcIl0sXG4gICAgICAgICAgICBbNTMsIFwiRE5TICAvVURQL1RDUFwiXSxcbiAgICAgICAgICAgIFs2NywgXCJESENQXCJdLFxuICAgICAgICAgICAgWzY4LCBcIkRIQ1BcIl0sXG4gICAgICAgICAgICBbODAsIFwiSFRUUCAgL1RDUFwiXSxcbiAgICAgICAgICAgIFs4OCwgXCJLZXJiZXJvcy1zZWMgIC9UQ1AvVURQXCJdLFxuICAgICAgICAgICAgWzExMCwgXCJQT1AgLSA5OTUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gICAgICAgICAgICBbMTM1LCBcIlJQQ1wiXSxcbiAgICAgICAgICAgIFsxMzcsIFwiTkVUQklPU1wiXSxcbiAgICAgICAgICAgIFsxMzgsIFwiTkVUQklPU1wiXSxcbiAgICAgICAgICAgIFsxMzksIFwiTkVUQklPU1wiXSxcbiAgICAgICAgICAgIFsxNDMsIFwiSU1BUCAtIDk5MyBmb3IgZW5jcnlwdGVkXCJdLFxuICAgICAgICAgICAgWzE2MSwgXCJTTk1QICBNYW5hZ2VyXCJdLFxuICAgICAgICAgICAgWzE2MiwgXCJTTk1QICBBZ2VudFwiXSxcbiAgICAgICAgICAgIFszODksIFwiTERBUCAtIDYzNiBmb3Igc2VjdXJlXCJdLFxuICAgICAgICAgICAgWzQ0MywgXCJIVFRQUyAgL1RDUFwiXSxcbiAgICAgICAgICAgIFs0NDUsIFwiU01CICAvVENQXCJdLFxuICAgICAgICAgICAgWzQ2NSwgXCJTTVRQIGJ5IFRMU1wiXSxcbiAgICAgICAgICAgIFs1MTQsIFwiU1lTTE9HICAvVURQXCJdLFxuICAgICAgICAgICAgWzU4NywgXCJTTVRQUyBmb3IgTVNBXCJdLFxuICAgICAgICAgICAgWzYzNiwgXCJMREFQIFNTTFwiXSxcbiAgICAgICAgICAgIFs5OTAsIFwiRlRQU1wiXSxcbiAgICAgICAgICAgIFsxODEyLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgICAgICAgICBbMTgxMywgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgICAgICAgICAgWzMyNjksIFwiTWljcm9zb2Z0IEdsb2JhbCBDYXRhbG9nXCJdLFxuICAgICAgICAgICAgWzMzODksIFwiUkRQXCJdLFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBDcmVhdGUgZmxhc2hjYXJkIGVsZW1lbnRzXG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkRGl2cyA9IG5ldyBGbGFzaGNhcmRDYXJkRWxlbXMocG9ydGRlZmluaXRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCB0aGUgZ2FtZSdzIHRpdGxlIGVsZW1lbnRcbiAgICAgICAgbGV0IG1haW5GbGFzaENhcmRQYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRmxhc2hDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgZ2FtZXRpdGxlRWxlbSA9IG1haW5GbGFzaENhcmRQYWdlRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgICAgIGdhbWV0aXRsZUVsZW0uaW5uZXJUZXh0ID0gXCJDb21wdXRpbmcgUG9ydCBOdW1iZXJzXCJcblxuICAgICAgICAvLyBBZGQgdGhlIGZsYXNoY2FyZHMgdG8gcGFnZVxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIG1haW5GbGFzaENhcmREaXZzLm1fZmxhc2hjYXJkc0Fycil7XG4gICAgICAgICAgICBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmxhc2hjYXJkZ2FtZVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEdyb3dpbmdDYXJkRWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvR3Jvd2luZ0NhcmRcIlxuXG5jb25zdCBBY3RpdmVDYXJkc1dpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ3Jvd2luZy1jYXJkJywgR3Jvd2luZ0NhcmRFbGVtZW50LCB7IGV4dGVuZHM6ICdsaScgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCB8fCBlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxEZXRhaWxzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQXJyYXkgb2YgbGlzdCBpdGVtcyAoY2FyZHMpXG4gICAgICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikpO1xuXG4gICAgICAgICAgICAvLyBDbGljayBldmVudCB0byByZXNpemUgdGhlIGNhcmRzIGlmIGNsaWNraW5nIG91dHNpZGUgb2YgYSBjYXJkXG4gICAgICAgICAgICAvLyBXaGVuIGNsaWNraW5nIG91dHNpZGUgYSBjYXJkLCByZXNpemUgYWxsIGNhcmRzIHRvIG5vcm1hbFxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBJdGVtOiBHcm93aW5nQ2FyZEVsZW1lbnQgPSBpdGVtO1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGVtcEl0ZW0gJiYgIXRlbXBJdGVtLmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaHJpbmtDYXJkKHRlbXBJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlc2hhZGUgYWxsIGNhcmRzIGJlY2F1c2Ugbm9uZSBvZiB0aGVtIGFyZSBiaWdcbiAgICAgICAgICAgIGZvciAobGV0IGxpIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQobGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVDYXJkc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4uL21vZGVscy9MaW5rRGV0YWlscyc7XG5cbi8vSGVhZGVyIG5hdmlnYXRpb24gbGlua3NcbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pO1xuXG5jb25zdCBnYW1lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG5jb25zdCBOQVZJVEVNUyA9IFtob21lTmF2TGluaywgcGFnZXNOYXZMaW5rLCBnYW1lTmF2TGlua107XG5cbmNvbnN0IEhlYWRlckZvb3RlciA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICBsZXQgc2l0ZUhlYWRlcjogRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgZWxlbWVudCB0byB0aGUgcGFnZVxuICAgICAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIC8vIGlmIG1haW4gZWxlbWVudCBleGlzdHMsIGFkZCB0aGUgaGVhZGVyIHRvIGl0XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKHBhZ2VNYWluKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGVIZWFkZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5wcmVwZW5kKEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBiZWZvcmUgJ21haW4nIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgbWFpbiBlbGVtZW50IGRvZXMgbm90IGV4aXN0LCBhZGQgdGhlIGhlYWRlciB0byB0aGUgYm9keVxuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIobnVsbCkpO1xuICAgICAgICAgICAgICAgIGlmIChzaXRlSGVhZGVyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIucHJlcGVuZChIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYWZ0ZXIgJ2JvZHknIGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBidWlsZEhlYWRlcjogKG1haW46IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICAgICAgICBIMS50ZXh0Q29udGVudCA9ICc8UmFuZG9tIFdlYiBCaXRzPic7IC8vSDEgTG9nb1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoSDEpO1xuXG4gICAgICAgICAgICBpZiAobWFpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWFpbi5wcmVwZW5kKHNpdGVIZWFkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChzaXRlSGVhZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlSGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZE5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBoZWFkZXIgbmF2aWdhdGlvbiBiYXNlZCBvbiBuYXZpZ2F0aW9uIGRhdGFcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuYXZpZ2F0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXZGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2ID0gaGVhZGVyTmF2RnJhZ1xuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBuYXYgZGF0YSB0byBuYXYgZWxlbWVudHNcbiAgICAgICAgICAgIE5BVklURU1TLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0TGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICAgICAgICAgIGhlYWRlck5hdi5hcHBlbmQobmF2TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBuYXZpZ2F0aW9uIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICAgICAgLy8gRW52aXJvbm1lbnQgbGlua3MgZWRpdCwgcmVxdWlyaW5nIGRpZmZlcmVudCBsaW5rIHJlbGF0aXZlcyB0byBvcGVyYXRlXG4gICAgICAgICAgICAgICAgLy8gR2l0aHViIHBhZ2VzIG9wZXJhdGVzIGZyb20gcmVwb3NpdG9yeSwgbm90ICcvJ1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncmhvd2VsbDQ3Ni5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGVkaXQgZm9yIGRldiBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBBZGQgZm9vdGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2UgZW5kXG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kKEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIHNpdGVGb290ZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjIgUmFuZG9tIFdlYkJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiSWNvbkhvbWU6ICM0NTAyNjc1NVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckZvb3RlcjsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBVFRSSUJVVElPTkxJTktEQVRBIGZyb20gXCIuLi9saWIvZGF0YV9BdHRyaWJ1dGlvbkxpbmtzXCI7XG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgeyBSV0JDYXJkRWxlbWVudHMgfSBmcm9tIFwiLi4vbW9kZWxzL1dpZGdldE1hcmt1cEVsZW1lbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCQ2FyZCB7XG4gICAgcHVibGljIGJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlOiBXZWJCaXQpIHtcbiAgICAgICAgLy8gTWFwIFdlYkJpdCBkYXRhIHRvIGEgY2FyZCwgZWFjaFxuICAgICAgICAvL1xuICAgICAgICAvLyA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAvLyA8ZGl2PjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICAgIC8vICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgICAgLy8gPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICAgIC8vIDxkaXYgY2xhc3M9XCJjYXJkQm9keVwiPlxuICAgICAgICAvLyAgICAgPGgzPjwvaDM+XG4gICAgICAgIC8vICAgICA8cD48L3A+PGEgaHJlZj1cIlwiPjwvYT5cbiAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAvLyA8L2Rpdj5cblxuICAgICAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBSV0JFbGVtZW50czogUldCQ2FyZEVsZW1lbnRzID0ge1xuICAgICAgICAgICAgY2FyZEltZzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBjYXJkSW1nVG9wOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIGNhcmRCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB9XG4gICAgICAgIGxldCBjYXJkQm9keUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsZXQgY2FyZEJvZHlMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBSV0JFbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKFJXQkVsZW1lbnRzLmNhcmRJbWcpO1xuICAgICAgICBSV0JFbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgICAgICBSV0JFbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgICAgICBSV0JFbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUxpbmspO1xuXG4gICAgICAgIC8vIEFkZCBjYXJkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgIFJXQkVsZW1lbnRzLmNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiKTtcbiAgICAgICAgUldCRWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcbiAgICAgICAgUldCRWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgUldCRWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBhcnRpY2xlLmFydGljbGVMaW5rKVxuICAgICAgICBjYXJkQm9keUhlYWRpbmcuaW5uZXJUZXh0ID0gYXJ0aWNsZS5uYW1lO1xuICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgICAgICAvLyBJbWFnZSBhdHRyaWJ1dGlvbiBtYXkgYmUgbmVlZGVkIGZvciB0aGUgaW1hZ2UgdXNlZFxuICAgICAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICAgICAgQVRUUklCVVRJT05MSU5LREFUQS5tYXAoKGxpbmspID0+IHRoaXMuYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChSV0JFbGVtZW50cywgbGluaykpO1xuXG4gICAgICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgICAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZChSV0JFbGVtZW50cy5jYXJkSW1nVG9wKTtcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKFJXQkVsZW1lbnRzLmNhcmRCb2R5KTtcblxuICAgICAgICByZXR1cm4gV2ViQml0O1xuXG4gICAgfVxuICAgIHByaXZhdGUgYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChjYXJkQXR0ckVsZW1lbnQ6IFJXQkNhcmRFbGVtZW50cywgbGluazogQXR0cmlidXRpb25MaW5rKSB7XG4gICAgICAgIC8vIFRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAgICAgIC8vIG90aGVyd2lzZSB0aGUgZGF0YSBpc24ndCBlbnRlcmVkLCBjYXVzaW5nIGEgbWlzc1xuICAgICAgICBpZiAoY2FyZEF0dHJFbGVtZW50LmNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT09IGxpbmsuYXJ0aWNsZWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyA8ZGl2IGNsYXNzPVwiZmxpcC1jYXJkXCI+PCEtLWNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgICAgICAgIC8vIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkRnJvbnRcIj5cbiAgICAgICAgICAgIC8vICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAvLyAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJhY2tcIj5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICA8cD48L3A+XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCIgY2xhc3M9XCJpbWdTbWFsbCBpbWdQVFJcIj5cbiAgICAgICAgICAgIC8vICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgLy8gPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGltYWdlIGJhY2sgcGFuZWwgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICAgICAgLy8gUmVkZWZpbmUgY2FyZCBpbWFnZSBwYW5lbCBhcyBhIGZsaXAgcGFuZWxcbiAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IGNhcmRBdHRyRWxlbWVudC5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250ID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY2FyZEZyb250LmFwcGVuZENoaWxkKGNhcmRBdHRyRWxlbWVudC5jYXJkSW1nKTsgLy8gbW92ZSBpbWFnZSB3aXRoaW4gY2FyZCBmcm9udCBkaXZpc29yXG4gICAgICAgICAgICBsZXQgc21hbGxJbWcgPSA8SFRNTEltYWdlRWxlbWVudD5jYXJkQXR0ckVsZW1lbnQuY2FyZEltZy5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICBjYXJkQmFjay5hcHBlbmRDaGlsZChzbWFsbEltZyk7XG4gICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSBjYXJkQXR0ckVsZW1lbnQuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpOyAvL2FwcGVuZCB0byBmcm9udCBwYW5lbFxuXG4gICAgICAgICAgICAvLyBBZGQgZmxpcC1wYW5lbCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgY2FyZEF0dHJFbGVtZW50LmNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xuICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZW93bmVyO1xuICAgICAgICAgICAgYmFja1BhcmEudGV4dENvbnRlbnQgPSBsaW5rLmlubmVyVGV4dFxuICAgICAgICAgICAgYXR0cmlidXRlTGluay5ocmVmID0gbGluay5oUmVmZXJlbmNlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVvd25lcjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0IH0gZnJvbSBcIi4uL21vZGVscy9Ub0RvXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIFRvLURvIExpc3Qgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IFRvRG9zV2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFRvLURvIExpc3Qgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdUb0RvTGlzdCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuXG4gICAgICAgIC8vIFRvRG9MaXN0IGNvbnN0cnVjdG9yXG4gICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgICAgICAvLyBDcmVhdGVzIHRoZSBtYXJrdXAgbmVlZGVkIGFuZCBpbXBvcnRzIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlLCBjb250YWluaW5nIHRoZSB0b2RvIGl0ZW1zXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9Eb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXRUJCSVREQVRBIGZyb20gXCIuLi9saWIvZGF0YVwiXG5pbXBvcnQgeyBSYW5kb21XZWJCaXRzIH0gZnJvbSBcIi4uL21vZGVscy9SYW5kb21XZWJCaXRzXCJcblxuY29uc3QgUldCQ2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICBsZXQgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudFtdID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkFyYml0cmFyeSBBcnRpY2xlczpcIikhLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIikhLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4bG9yZSB0aGUgV2ViOlwiKSEsXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGNhcmQgZGF0YSArIGF0dHJpYnV0aW9uIGxpbmsgZGF0YVxuICAgICAgICAvLyBXRUJCSVREQVRBIGJyb2tlbiBpbnRvIDMgYXJyYXlzOiBQYWdlcywgb3IgYXJ0aWNsZXMsIEd1aWRlcywgYW5kIEV4cGxvcmVzIFxuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFJvdXRlcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgcGFnZXNcbiAgICAgICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9uIHRvIDMgYXJ0aWNsZXMgb25seVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgZGVjb25zdHJ1Y3Rpb24gYW5kIGFkZGl0aW9uXG4gICAgICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgdGhlIGRhdGEgdG8gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJbm5lciBsb29wOiBpdGVyYXRlIHRocm91Z2ggdGhlIGNhdGVnb3J5IGRhdGFcbiAgICAgICAgICAgICAgICAvLyBGcm9tIHRoZSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXMuc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNTZWN0aW9uW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUldCQ2FyZHNXaWRnZXQiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIlxuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJkb21haW5Mb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcInBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVAgQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MIE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYklERVwiLFxuICAgICAgICAyNCxcbiAgICAgICAgXCJXZWJJREVcIixcbiAgICAgICAgXCJUcnkgc2tpcHBpbmcgdGhlIGRvd25sb2FkIHdpdGggYSB3ZWIgSURFXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDMpLFxuICAgICAgICBcInBhZ2VzL3dlYmlkZXMuaHRtbFwiLFxuICAgICAgICBcImltZy91eC53ZWJwXCIsXG4gICAgICAgIFwiQSBjb21wdXRlciBhcHBsaWNhdGlvbiBpY29uXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIDI1LFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICBcIkZpbmQgYW4gU1ZHIGFuZCBsZWFybiBhYm91dCB0aGUgU1ZHIGxhbmd1YWdlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDkpLFxuICAgICAgICBcInBhZ2VzL3N2Zy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3N2Zy5zdmdcIixcbiAgICAgICAgXCJBbiBzdmcgaWNvbiBleGFtcGxlLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgMjYsXG4gICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICBcIkRpc2FibGUgdGhlIEphdmFTY3JpcHQgdG8gdGVzdCB3ZWJzaXRlIGZ1bmN0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDIyKSxcbiAgICAgICAgXCJwYWdlcy9qYXZhc2NyaXB0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvc29mdHdhcmUtYXBwbGljYXRpb24ud2VicFwiLFxuICAgICAgICBcIkEgamF2YXNjcmlwdCBmdW5jdGlvbiBpY29uLlwiXG4gICAgKSxcbik7XG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBBcHBsaWNhdGlvbiBUYWJcIixcbiAgICAgICAgXCJSZXZpZXcgc2l0ZSBkYXRhIHdoZW4gY2xlYXJpbmcgdGhlIGJyb3dzZXIgaGlzdG9yeVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogRGV2IFRvb2xzOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIlxuICAgICksXG4pO1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIm5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgTkFTQSBkb21haW4uIExlYXJuIGFib3V0IHRoZSB1bml2ZXJzZSB2aWEgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIlxuICAgICksXG4pO1xuXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cblxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vbW9kZWxzL0F0dHJpYnV0aW9uTGlua1wiO1xuXG5sZXQgQVRUUklCVVRJT05MSU5LREFUQSA9IFtcblxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICAgIFwiRG9tYWluIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG9tYWluXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIDFcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwiY29kZSBpY29uc1wiLFxuICAgICAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIDJcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwiTkFTQVwiLFxuICAgICAgICBcIkltYWdlIHNvdXJjZSB2aWEgdGhlIE5hdGlvbmFsIEFlcm9uYXV0aWNzIGFuZCBTcGFjZSBBZG1pbmlzdHJhdGlvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3Lm5hc2EuZ292L2F1ZGllbmNlL2ZvcnN0dWRlbnRzLzUtOC9mZWF0dXJlcy9zeW1ib2xzLW9mLW5hc2EuaHRtbFwiLFxuICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgXCJOQVNBIFBhZ2VzXCIsXG4gICAgICAgIDNcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwic3NsIGNlcnRpZmljYXRlIGljb25zXCIsXG4gICAgICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICA0XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcImFpIGljb25zXCIsXG4gICAgICAgIFwiQWkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIDhcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwicHJvdG90eXBlIGljb25zXCIsXG4gICAgICAgIFwiUHJvdG90eXBlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICA5XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcImRpY3Rpb25hcnkgaWNvbnNcIixcbiAgICAgICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICAxMFxuICAgICksXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgXCJCT0lOQyBpY29uc1wiLFxuICAgICAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcbiAgICAgICAgXCJCT0lOQ1wiLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIDExXG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcIklQIGljb25zXCIsXG4gICAgICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgMTJcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwiaHRtbCBpY29uc1wiLFxuICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIDEzXG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcImNvbnRlbnQgd3JpdGluZyBpY29uc1wiLFxuICAgICAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgIDE0XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICAgICAgXCJQYWdlIHNwZWVkIGljb25zIGNyZWF0ZWQgYnkgUHJvc3ltYm9scyBQcmVtaXVtIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkXCIsXG4gICAgICAgIDE1XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgMTZcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQgSWNvbnMgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgICAgICAxN1xuICAgICksXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICAgICAgXCJHb29nbGUgZXhwZWRpdGlvbnMgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcbiAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICBcIlZpcnR1YWwgVG91clwiLFxuICAgICAgICAxOFxuICAgICksXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICBcIkRldlRvb2xzXCIsXG4gICAgICAgIDE5XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcImRucyBpY29uc1wiLFxuICAgICAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAyMFxuICAgICksXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICBcIkRldlRvb2xzVHdvXCIsXG4gICAgICAgIDIxXG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcInJhbmsgaWNvbnNcIixcbiAgICAgICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAgICAgMjJcbiAgICApLFxuICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgIFwidHJlZSBpY29uc1wiLFxuICAgICAgICBcIlRyZWUgaWNvbnMgY3JlYXRlZCBieSBqdXN0aWNvbiAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIDIzXG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcImRlc2lnbiBpY29uc1wiLFxuICAgICAgICBcIkRlc2lnbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwid2ViaWRlc1wiLFxuICAgICAgICAyNFxuICAgICksXG4gICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgXCJzY2FsYWJsZSB2ZWN0b3IgZ3JhcGhpY3NcIixcbiAgICAgICAgXCJTVkcgaWNvbiBjcmVhdGVkIGJ5IEhhcnZleSBSYXluZXJcIixcbiAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvXCIsXG4gICAgICAgIFwiVzNDXCIsXG4gICAgICAgIFwic3ZnXCIsXG4gICAgICAgIDI1XG4gICAgKSxcbiAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgICAgXCJXZWIgY29kaW5nIGljb25zIGNyZWF0ZWQgYnkgTXVoYW1tYWQgQXRpZiAtIEZsYXRpY29uXCIsXG4gICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvd2ViLWNvZGluZ1wiLFxuICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAyNlxuICAgIClcbl07XG5cbmV4cG9ydCBkZWZhdWx0IEFUVFJJQlVUSU9OTElOS0RBVEE7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgSGVhZGVyRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9IZWFkZXJGb290ZXInO1xuaW1wb3J0IFJXQkNhcmRzV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9XZWJCaXRzJztcbmltcG9ydCBUb0Rvc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvVG9Eb3MnO1xuaW1wb3J0IERpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL0RpY3Rpb25hcnlXaWRnZXQnO1xuaW1wb3J0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL0V4cGFuZGluZ0xpc3RET01XaWRnZXQnO1xuaW1wb3J0IEFjdGl2ZUNhcmRzV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9Hcm93aW5nQ2FyZCc7XG5pbXBvcnQgZmxhc2hjYXJkZ2FtZVdpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvRmxhc2hjYXJkR2FtZVdpZGdldCc7XG5cbi8vIGVudHJ5IHBvaW50XG4oKCkgPT4ge1xuICAgIC8vUEVSRjogbGV0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgLy8gRXZlbnQgZmlyZWQgYmVmb3JlIGFzc2V0cyBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZXMsIGFkZCBjYXJkcyB3aWRnZXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMuaHRtbCcpIHtcbiAgICAgICAgICAgIFJXQkNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvcGFnZXMvZG9tLmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy9zdmcuaHRtbCcpIHtcbiAgICAgICAgICAgIEV4cGFuZGluZ0xpc3RET01XaWRnZXQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3ZWJJREUgd2lkZ2V0XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy93ZWJpZGVzLmh0bWwnKSB7XG4gICAgICAgICAgICBBY3RpdmVDYXJkc1dpZGdldC5pbml0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0aWFsaXplIHdlYklERSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2ZsYXNoY2FyZHMuaHRtbCcpIHtcbiAgICAgICAgICAgIGZsYXNoY2FyZGdhbWVXaWRnZXQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGRpY3Rpb25hcnkgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuICAgICAgICBpZiAoZGljdGlvbmFyeUVsZW1lbnQpIHtcbiAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQuaW5pdChkaWN0aW9uYXJ5RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgIGlmICh0b0Rvc0VsZW1lbnQgIT0gbnVsbClcbiAgICAgICAgICAgIFRvRG9zV2lkZ2V0LmluaXQodG9Eb3NFbGVtZW50KTtcblxuICAgICAgICAvL1BFUkY6IGxldCB0MiA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAvL1BFUkY6IGNvbnN0IHRvdGFsdGltZSA9IHQyIC0gdDE7XG4gICAgICAgIC8vUEVSRjogY29uc29sZS5sb2coXCJ0aGUgdGltZSBpczogXCIsIHRvdGFsdGltZSk7XG4gICAgfSlcblxufSkoKTsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBhcGlHRVQgaXMgZm9yIGZldGNoIHJlcXVlc3RzLiBVc2UgYW4gYXBpR0VUIG9iamVjdCB0byBtYW5pcHVsYXRlIHRoZSBmZXRjaFxuICogIHJlcXVlc3QgaW50byBlaXRoZXI6XG4gKiBcbiAqIDEuIHJldHVybmluZyBkYXRhIFxuICogXG4gKiAtLW9yIC0tXG4gKiBcbiAqIDIuIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gdGhlIGJyb3dzZXIgY2FjaGUgdG8gcmV0cmlldmUgbGF0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gICAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGF0YUlzSW5DYWNoZTogYm9vbGVhbiA9IGZhbHNlOyAvL1RPRE86IGRhdGFpbmNhY2hlIG92ZXJhbGxcbiAgICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG4gICAgXG4gICAgLyoqXG4gICAgICogVGhpcyBjb25zdHJ1Y3RvciBnYXRoZXJzIGFsbCB0aGUgbmVlZGVkIGluZm9ybWF0aW9uIGZvciBmZXRjaCBhbmQvb3IgYnJvd3NlclxuICAgICAqICBzdG9yYWdlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHNlbmRUb0Jyb3dzZXJDYWNoZSAgLSBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGZldGNoIGNhY2hpbmcuXG4gICAgICogQHBhcmFtIGJyb3dzZXJDYWNoZU5hbWUgLSBJZiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIGJyb3dzZXIgY2FjaGUsIHRoaXMgc3RyaW5nIHByb3ZpZGVzIHRoZSBuYW1lIGZvciBzdG9yYWdlLlxuICAgICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoR0VUVVJMOiBVUkwsIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiwgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCwgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtID0gZXJyb3JFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAgICovXG4gICAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHRoaXMuR0VUVVJMXG4gICAgICovXG4gICAgcHVibGljIGdldEdFVFVSTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuR0VUVVJMO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmZXRjaCByZXF1ZXN0IGNhbiB0YWtlIFVSTCBvciBzdHJpbmcgcGFyYW1ldGVyLiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGFwaUdFVFxuICAgICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuIFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgICAqIEBwYXJhbSByZXMgLSB0aGUgZmV0Y2hlZCByZXNwb25zZS5cbiAgICAgKiBAcmV0dXJucyAtIHJldHVybnMgcmVzLmpzb24oKSBvbiBzdWNjZXNzIG9yIHJldHVybnMgcmVzcG9uc2Ugb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCl7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBmZXRjaCByZXF1ZXN0LCByZXR1cm5pbmcgYSBmZXRjaCBwcm9taXNlLlxuICAgICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBmZXRjaERhdGEoR0VUVVJMOiBVUkwpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKEdFVFVSTClcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHRoaXMuYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlc3BvbnNlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcHVibGljIGZ1bmN0aW9uLCBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAgICogIHRoZSByZXF1ZXN0IG5lZWRzIGFkZGVkIHRvIGJyb3dzZXIgc3RvcmFnZSwgdGhlIGZldGNoIGlzIG1hZGUgYW5kIHNlbnQgdG9cbiAgICAgKiAgc3RvcmFnZS4gQSBjbG9uZWQgY29weSBvZiB0aGUgZmV0Y2hlZCBkYXRhIGlzIHJldHVybmVkLiBXaXRob3V0IHNlbmRpbmcgdG9cbiAgICAgKiAgYnJvd3NlciBjYWNoZSwgdGhlIGZldGNoIGlzIHJlcXVlc3RlZCBhbmQgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgICAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpe1xuICAgICAgICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJ2NhY2hlcycgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4oKHRleHQpID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKCh0ZXh0KSA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKCAocmVzcG9uc2U6YW55KSAgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgTGlua0RldGFpbHMgZnJvbSBcIi4vTGlua0RldGFpbHNcIjtcblxuLy9JY29uIGxpbmtzIHVzZWQgZm9yIGltYWdlIEF0dHJpYnV0aW9uXG5jbGFzcyBBdHRyaWJ1dGlvbkxpbmsgZXh0ZW5kcyBMaW5rRGV0YWlscyB7XG4gICAgYXR0cmlidXRlb3duZXI6IHN0cmluZztcbiAgICBhcnRpY2xlaWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICBhdHRyaWJ1dGVvd25lcjogc3RyaW5nLFxuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVvd25lciA9IGF0dHJpYnV0ZW93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuLi9tb2RlbHMvQVBJXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tICcuL1dpZGdldE1hcmt1cEVsZW1lbnRzJ1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZHZhbHVlIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBmcm9tIFwiLi9EaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0XCJcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2ggaXMgYSBzZXQgb2YgbWFya3VwIGNyZWF0aW9uIGFuZCBmdW5jdGlvbnMgd2hpY2ggYWxsb3cgYSB1c2VyXG4gKiAgdG8gbG9vayB1cCBhIHdvcmQgbGlrZSBhIERpY3Rpb25hcnkuIFdoZW4gY2FsbGVkLCB0aGUgdXNlcidzIGlucHV0IGlzIHZhbGlkYXRlZFxuICogIGFzIGFuIGFjY2VwdGFibGUgd29yZCBvciBpdCBkZWNsaW5lcyB0aGUgcmVxdWVzdCwgdGhlbiBzaG93aW5nIHRoZSB1c2VyIGlmIHRoZSB3b3JkXG4gKiAgaXMgYWNjZXB0YWJsZS5cbiAqIFxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICogIGtub3duIHBsYWNlbWVudCBsb2NhdGlvbikgdGhhdCBjb250YWlucyB0aGUgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzLlxuICogXG4gKiAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICogXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKiBcbiAqL1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2ggZXh0ZW5kcyBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IHtcbiAgICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXTtcbiAgICBwcml2YXRlIHN0YXRpYyBpc0V4aXN0aW5nQ2FjaGVpbkJyb3dzZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FjaGVkV29yZHNDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhdGljIGV4aXN0aW5nQ2FjaGVzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICAgIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHdvcmRVUkw6IFVSTDtcbiAgICBwcml2YXRlIHdvcmREYXRhOiBvYmplY3Q7XG4gICAgcHJpdmF0ZSBkaWN0aW9uYXJ5U2VhcmNoTWFya3VwOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHM7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYWxsIHRoZSBmdW5jdGlvbmFsaXR5IGFuZCBtYXJrdXAgbmVlZGVkIGZvciB0aGUgXG4gICAgICogIERpY3Rpb25hcnkgU2VhcmNoIHdpZGdldCBpbnRlcmZhY2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgLy8gSW52b2tlIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLy8gQ2FsbCBjcmVhdGlvbiBmb3IgYWxsIHRoZSBtYXJrdXAgbmVlZGVkIHRvIGJlZ2luIHRoZSB3aWRnZXRcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwID0gdGhpcy5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW0pO1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmFkZFdpZGdldEV2ZW50cygpO1xuICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBMb2NhbCBTdG9yYWdlIHdvcmRzIHByZXZpb3VzbHkgc3RvcmVkIHdpdGggdGhlIERpY3Rpb25hcnkgU2VhcmNoIFdpZGdldC5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlIC0gdGhlc2UgYXJlIHRoZSB3b3JkcyBzdG9yZWQgcHJldmlvdXNseSBpbiB0aGVcbiAgICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB7XG4gICAgICAgIC8vZW51bWVyYXRlIGFsbCBvZiB0aGUgY2FjaGVzXG4gICAgICAgIC8vY2FjaGUgcmVzcG9uc2UgbGlua3MgYW5kIGNhY2hlIG5hbWUgYXJlIHByZXZpb3VzbHkgc3RvcmVkIGluIGxvY2FsIHN0b3JhZ2VcblxuICAgICAgICAvL0VudW1lcmF0ZSBsb2NhbCBzdG9yYWdlICd3b3JkLWNhY2hlcycgaXRlbXNcbiAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29yZC1jYWNoZXMnKTtcbiAgICAgICAgaWYgKHN0b3JhZ2VTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgICAgICByZXR1cm4gRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQuXG4gICAgICogXG4gICAgICogQHJldHVybnMgdGhpcy53b3JkVVJMXG4gICAgICovXG4gICAgcHVibGljIGdldFdvcmRVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndvcmRVUkw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0byByZXR1cm4gdGhlIGZldGNoZWQgd29yZCBkYXRhLlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0V29yZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndvcmREYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY2xpY2sgYW5kIGtleXByZXNzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgd2lkZ2V0LiBJbnB1dCBldmVudCBsaXN0ZW5lcnMgJ2NsaWNrJ1xuICAgICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAgICogIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZCwgdGhlIHdpZGdldCBhZGFwdHMgbWFya3VwIGZvciB0aGF0IHJlcXVlc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkEgc2VhcmNoIGVsZW1lbnQgaXMgdW5kZWZpbmVkIGZyb20gc2VhcmNoV29yZCB8IHdvcmRTZWFyY2hcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgLy9VcG9uIGlucHV0IGVudHJ5LCBmaXJlIEFQSSBmZXRjaFxuICAgICAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cCwgZmFsc2UsIG51bGwpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIFwiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgICAgIC8vIENsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgICAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICAgICAgICAgIGxldCBuZXdCdXR0b25Db250YWluZXI6IEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRpb24gYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyICE9IHVuZGVmaW5lZCAmJiBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gd29yZENhY2hlLndvcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAsIHRydWUsIHdvcmRDYWNoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5yZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogQWRkcyB0aGUgZmV0Y2hlZCB0ZXJtIHRvIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSAtLT4gS2V5L1ZhbHVlIFxuICAgICAqIGRhdGEgcmVmZXJlbmNpbmcgaWYgd29yZHMgYXJlIGluIGxvY2FsIGNhY2hlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgLSAvL1RPRE86IHRlc3RpbmcgYWRkL2RlbGV0ZVxuICAgICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V2YWx1ZSAtIFRoaXMgaXMgYW4gaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uLCBzdG9yaW5nXG4gICAgICogIGluZm9ybWF0aW9uIHdoZXJlIHNlbmRpbmcgdG8gbG9jYWwgc3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uoc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuLCBsb2NhbHN0b3JhZ2V2YWx1ZTogbG9jYWxzdG9yYWdld29yZHZhbHVlKSB7XG4gICAgICAgIGxldCB3b3JkU3RvcmU6IGFueSA9IFtdO1xuICAgICAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29yZC1jYWNoZXMnKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29yZC1jYWNoZXMnLCBKU09OLnN0cmluZ2lmeSh3b3JkU3RvcmUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgd29yZCB0byBjdXJyZW50ICd3b3JkLWNhY2hlcycgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29yZC1jYWNoZXMnKTtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInd29yZC1jYWNoZXMnIHZhbHVlcyBhcmUgbnVsbC4gVHJ5IGNsZWFyaW5nIGJyb3dzZXIgY2FjaGUuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZVtdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSBsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkVVJMKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXb3JkIGlzIGFscmVhZHkgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgYWxsY2FjaGUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmQtY2FjaGVzJywgSlNPTi5zdHJpbmdpZnkoYWxsY2FjaGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gc3RvcmluZyBrZXktdmFsdWUuIEVycm9yOiBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RydWN0dXJlcyBpbmJvdW5kIGZldGNoIHJlcXVlc3QgYmVmb3JlIHNlbmRpbmcgYW4gQVBJIGZldGNoIFxuICAgICAqIHJlcXVlc3QuIGFwaUdFVCgpIGlzIGNyZWF0ZWQgYW5kIGNhbGxlZCBiYXNlZCBvbiBwYXJhbWV0ZXIgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgICAqIEBwYXJhbSB3b3JkVXJsIC0gVGhlIGZldGNoIHJlcXVlc3QgVVJMLlxuICAgICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSB1c2VkIGZvciBkYXRhIHZhbGlkYXRpb24uXG4gICAgICogQHBhcmFtIHNlbmRUb0NhY2hlIC0gPyBTZW5kIGZldGNoIHJlcXVlc3QgdG8gQ2FjaGUgU3RvcmFnZSA6IEZldGNoIHdpdGhvdXQgc3RvcmluZyB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0gY2FjaGVOYW1lIC0gSWYgc2VuZGluZyBmZXRjaCByZXF1ZXN0cyB0byBjYWNoZSwgcHJvdmlkZSBhIG5hbWUgdG8gc3RvcmUgaXQgdW5kZXIuXG4gICAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgICAqL1xuICAgIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybSh3b3JkOiBzdHJpbmcsIHdvcmRVcmw6IFVSTCwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICAgICAgc2VuZFRvQ2FjaGU6IGJvb2xlYW4sIGNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICAvL1RPRE86IGRpY3Rpb25hcnkgY2FjaGUgbWFuYWdlbWVudDpcbiAgICAgICAgLy9UT0RPOiAxLikgaXMgdG8gYmUgY2FjaGVkIHRydWU/IC0tY2hlY2tcbiAgICAgICAgLy9UT0RPOiAyLikgaXMgdG8gYmUgY2FjaGVkIGZhbHNlPyAtLWNoZWNrXG4gICAgICAgIC8vVE9ETzogLS0+IGFyZSB0aGV5IHRoZSBzYW1lIGJlaGF2aW9yPyAtLWNoZWNrXG4gICAgICAgIC8vVE9ETzogLS0+IGlzIHRoZSByZXN1bHQgaW4gdGhlIGNhY2hlPyAtLWNoZWNrXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50IGEgc2VuZCB0byBjYWNoZSBvcHRpb25cbiAgICAgICAgLy9cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGNhbGxzIHRvIGVpdGhlciBzdG9yZSBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgIC8vIElmIGl0ZW1zIGFyZSB0byBiZSBjYWNoZWQsIGVkaXQgTG9jYWwgU3RvcmFnZSBjYWNoZSBuYW1lc1xuICAgICAgICBsZXQgd29yZGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBzZW5kVG9DYWNoZSxcbiAgICAgICAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICAgICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgICAgICAgY2FjaGVOYW1lOiBzZW5kVG9DYWNoZSA/IGNhY2hlTmFtZSA6IFwiXCIsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy9zZXQgYXBpR0VUOjpzZW5kVG9Ccm93c2VyQ2FjaGUgdG8gdHJ1ZSB0byB1c2UgY2FjaGUgc3RvcmFnZVxuICAgICAgICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVCh3b3JkY2FjaGUud29yZFVSTCwgZmFsc2UsIHNlYXJjaEVsZW1zLmVycm9yRWxlbSwgd29yZGNhY2hlLmNhY2hlTmFtZSk7XG4gICAgICAgICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL2ZldGNoIHJlcXVlc3RcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgd29yZEZldGNoLmFwaUdFVCh3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd29yZERhdGE6IGFueSA9IGRhdGE7XG4gICAgICAgICAgICAvL2NoZWNrIGlmIHRoZSByZXR1cm5lZCBvYmplY3QgaXMgdmFsaWQgd29yZCBkYXRhIGRlZmluaXRpb25zXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgJ3RpdGxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gZGVmaW5pdGlvbnMgd2VyZSBmb3VuZFxuICAgICAgICAgICAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgIW5vRGVmaW5pdGlvbnMpIHsgLy8gZ29vZCBmZXRjaC0tPiBtb3ZlIGZvcndhcmQgdG8gbWFya3VwIHJlbmRlclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkRmV0Y2guZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCksIHdvcmRjYWNoZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobmF2aWdhdG9yLm9uTGluZSAhPT0gZmFsc2UpIHsgLy8gY2hlY2sgbmV0d29yayBzdGF0dXMgdmlhIG5hdmlnYXRvciBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCB3b3JkRGF0YSA9IHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICAgICAgcmV0dXJuIHdvcmREYXRhO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgICAqIFxuICAgICAqIFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIilcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaW50eHQgLSBTdHJpbmcgdmFsdWUgcmVjZWl2ZWQgZnJvbSB1c2VyIGZpZWxkIGlucHV0LlxuICAgICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHdvcmRWYWxpZGF0aW9uKGludHh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICAgICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gY3JlYXRlcyBhIHByb21pc2UgdG8gZmV0Y2ggYSBkaWN0aW9uYXJ5IHRlcm0uXG4gICAgICogT2YgZGF0YSBpbmdyZXNzIHRpIERpY3Rpb25hcnlTZWFyY2gsIG1hcmt1cCBjcmVhdGlvbiBpcyBjYWxsZWQgZm9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIHVzZWQgZm9yIGRhdGEgdmFsaWRhdGlvbi5cbiAgICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHRvIGJlIGZldGNoZWQuXG4gICAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBvYmplY3QgY29tcG9zaW5nIHRoZSBmdWxsIHN0cmluZyBvZiB0aGUgZmV0Y2ggcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIHdvcmQ6IHN0cmluZywgd29yZFVSTDogVVJMKSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgICAgIGxldCB3b3JkRGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZCwgd29yZFVSTCwgc2VhcmNoRWxlbXMsIGZhbHNlLCBudWxsKSk7XG4gICAgICAgIH0pXG4gICAgICAgIHdvcmREYXRhUHJvbWlzZS50aGVuKChkYXRhOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud29yZERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgc2VhcmNoRWxlbXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZW1vdmUgdW5uZWVkZWQgY2xhc3NlcyBpZiBhcHBsaWVkIHByZXZpb3VzbHlcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3b3JkU2VhcmNoKCkgYmVnaW5zIGEgd29yZCBzZWFyY2ggcmVxdWVzdC4gVGhlIHVzZXIgaW5wdXQgbGlzdGVuZXIgY2hvb3NlcyBcbiAgICAgKiB3aGV0aGVyIHRoZSBmZXRjaCBpcyBjYWxsZWQgZnJvbSBjYWNoZSBvciBpcyBuZXcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIHVzZWQgZm9yIGRhdGEgdmFsaWRhdGlvbi5cbiAgICAgKiBAcGFyYW0gaXNGcm9tUHJldmlvdXNXb3JkcyAtIFRydWUgaWYgdGhlIHVzZXIgcmVxdWVzdGVkIGEgc2VhcmNoIGZyb20gYSBwcmV2aW91cyB3b3JkLCB0byBjYWxsIGRhdGEgZnJvbSBCcm93c2VyIENhY2hlLlxuICAgICAqIEBwYXJhbSBjYWNoZWRXb3JkIC0gSWYgdGhlIHVzZXIgY2FsbGVkIGZvciBhIHByZXZpb3VzIHdvcmQsIGNhY2hlZFdvcmQgaXMgd2l0aGluIHRoZSBMb2NhbCBTdG9yYWdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgd29yZFNlYXJjaChzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBpc0Zyb21QcmV2aW91c1dvcmRzOiBib29sZWFuLCBjYWNoZWRXb3JkOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWUgfCBudWxsKSB7XG4gICAgICAgIGlmIChpc0Zyb21QcmV2aW91c1dvcmRzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBjYWNoZWRXb3JkLndvcmQsIGNhY2hlZFdvcmQud29yZFVSTCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgICAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICAgICAgICAgID8gYWNjZXB0ZWRJbnB1dFdvcmQgPSB0cnVlIDogYWNjZXB0ZWRJbnB1dFdvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgICAgICAgICAgdGhpcy53b3JkVVJMID0gbmV3IFVSTChzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLnRvU3RyaW5nKCksIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSwgdGhpcy53b3JkVVJMKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gJyc7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICAgIH1cbn1cblxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tICcuL1dpZGdldE1hcmt1cEVsZW1lbnRzJ1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBpcyBtYWRlIHRvIGNyZWF0ZSBEaWN0aW9uYXJ5IFNlYXJjaCBtYXJrdXAgZm9yIHRoZVxuICogIHBhZ2UgZGlzcGxheS4gV2l0aG91dCBtYXJrdXAsIGEgc2VhcmNoIHdpZGdldCBkb2VzIG5vdCBleGlzdCBmb3IgdXNlclxuICogIGludGVyYWN0aW9uLlxuICogXG4gKiBFYWNoIHB1YmxpYyBmdW5jdGlvbnMsIHRoZSB3aWRnZXQgbWFya3VwIGNhbiBiZSBjcmVhdGVkIGluIG11bHRpcGxlIHNpdGUgbG9jYXRpb25zLlxuICogIEFsbCB0aGF0IGlzIG5lZWRlZCBpcyBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciB0aGUgd2lkZ2V0J3MgcGxhY2VtZW50IG9uXG4gKiAgdGhlIHBhZ2UuXG4gKiBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaFdpZGdldCB7XG5cbiAgICAvKipcbiAgICAgKiBQcmltYXJ5IHdpZGdldCBtYXJrdXAgc3RydWN0dXJpbmcgdGhlIHdpZGdldCBlbGVtZW50cyBhbmQgc2VhcmNoIGlucHV0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IGJlZm9yZSB0aGUgd2lkZ2V0LlxuICAgICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgICAqICBpbXBvcnRhbnQgSFRNTCBlbGVtZW50cyB1c2VkIHRocm91Z2ggd2lkZ2V0IGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgd2lkZ2V0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFydEggPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSlcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGVsZW1lbnRzIHVzZWQgaW4gbGF0ZXIgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZFNlYXJjaDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlFbGVtOiA8SFRNTEVsZW1lbnQ+ZGljdGlvbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yRWxlbTogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNXb3Jkcy5jbGFzc0xpc3QuYWRkKFwicHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaC4uLicpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlNlYXJjaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgICAgICAgICAgICAgICAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZvcm0uYWN0aW9uID0gXCJpbmRleC5odG1sXCI7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guaWQgPSBcIndvcmQtc2VhcmNoXCI7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5pbm5lclRleHQgPSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIjtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoRWxlbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkZXRlcm1pbmVkIGRpY3Rpb25hcnkgZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbWFya3VwIHRvIGhvdXNlIHJldHVybmVkIHdvcmRzIGZyb20gRGljdGlvbmFyeVNlYXJjaC4gVGhlIG1hcmt1cFxuICAgICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAgICogIGFkYXB0aXZlIHRvIHJldHVybmVkIHdvcmQgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB3b3JkRGF0YSAtIFRoaXMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCBvZiB3b3JkIHR5cGVzLCBkZWZpbml0aW9ucywgYW5kIGV4YW1wbGVzLlxuICAgICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSB1c2VkIGZvciBkYXRhIHZhbGlkYXRpb24uXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cCh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzKSB7XG4gICAgICAgIGlmICh3b3JkRGF0YSA9PSBudWxsIHx8ICEod29yZERhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhIGlzIG51bGwgb3IgYW4gaW5jb3JyZWN0IHR5cGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgd29yZCdzIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lciA9IHNlYXJjaEVsZW1zLmRpY3Rpb25hcnlFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuXG4gICAgICAgIC8vIFRoZSB3b3JkIGRhdGEgcmVwcmVzZW50cyBjb21wbGV4IEpTT04gb2JqZWN0XG4gICAgICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgICAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XG4gICAgICAgICAgICAvL0FkZCB0aGUgd29yZCBhbmQgZXhhbXBsZXMgdG8gcGFnZVxuICAgICAgICAgICAgd29yZC5tZWFuaW5ncy5tYXAoKHdvcmRUeXBlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiV29yZFR5cGUgYXJlOiBcIiwgd29yZFR5cGUpXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZFR5cGVMaXN0ID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgICAgICAgICAgICAgd29yZFR5cGVILnRleHRDb250ZW50ID0gd29yZFR5cGUucGFydE9mU3BlZWNoO1xuICAgICAgICAgICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29yZFR5cGVEZWZJdGVtID0gd29yZFR5cGVMaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJ3b3JkRGVmaW5pdGlvblwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9ucyBpczogXCIsIGRlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQID0gZGVmaW5pdGlvblAuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3UCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UGkgPSBuZXdQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gICAgfVxufSIsIi8vQXV0aG9yOiBSb2JlcnQgQSBIb3dlbGwsIEFwcmlsIDIwMjNcbi8vT3JpZ2luYWwgQXV0aG9yKHMpOiBNb3ppbGxhIENvbnRyaWJ1dG9ycywgTUROXG4vL0xpY2Vuc2U6IGh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2VuLVVTL2Fib3V0L2dvdmVybmFuY2UvcG9saWNpZXMvcGFydGljaXBhdGlvbi9cbi8vTUROOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvY3JlYXRlRWxlbWVudFxuLy9Tb3VyY2UgZGlzdHJpYnV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vbWRuL3dlYi1jb21wb25lbnRzLWV4YW1wbGVzL3RyZWUvbWFpbi9leHBhbmRpbmctbGlzdC13ZWItY29tcG9uZW50XG5cbi8vIENyZWF0ZSBhIGNsYXNzIGZvciB0aGUgZWxlbWVudFxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ0xpc3RFbGVtZW50IGV4dGVuZHMgSFRNTFVMaXN0RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXG4gICAgICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIHN1cGVyKCkgaXMgYSByZWZlcmVuY2UgdG8gdGhpcyBlbGVtZW50XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gR2V0IHVsIGFuZCBsaSBlbGVtZW50cyB0aGF0IGFyZSBhIGNoaWxkIG9mIHRoaXMgY3VzdG9tIHVsIGVsZW1lbnRcbiAgICAgICAgLy8gbGkgZWxlbWVudHMgY2FuIGJlIGNvbnRhaW5lcnMgaWYgdGhleSBoYXZlIHVscyB3aXRoaW4gdGhlbVxuICAgICAgICBjb25zdCB1bHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJyk7XG4gICAgICAgIGNvbnN0IGxpcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBIaWRlIGFsbCBjaGlsZCB1bHNcbiAgICAgICAgLy8gVGhlc2UgbGlzdHMgd2lsbCBiZSBzaG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIGhpZ2hlciBsZXZlbCBjb250YWluZXJcbiAgICAgICAgdWxzLmZvckVhY2godWwgPT4ge1xuICAgICAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGVhY2ggbGkgZWxlbWVudCBpbiB0aGUgdWxcbiAgICAgICAgbGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBsaSBoYXMgYSB1bCBhcyBhIGNoaWxkLCBkZWNvcmF0ZSBpdCBhbmQgYWRkIGEgY2xpY2sgaGFuZGxlclxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbiBhdHRyaWJ1dGUgd2hpY2ggY2FuIGJlIHVzZWQgIGJ5IHRoZSBzdHlsZVxuICAgICAgICAgICAgICAgIC8vIHRvIHNob3cgYW4gb3BlbiBvciBjbG9zZWQgaWNvblxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRoZSBsaSBlbGVtZW50J3MgdGV4dCBpbiBhIG5ldyBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXNzaWduIHN0eWxlIGFuZCBldmVudCBoYW5kbGVycyB0byB0aGUgc3BhblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGxpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIENvcHkgdGV4dCBmcm9tIGxpIHRvIHNwYW4sIHNldCBjdXJzb3Igc3R5bGVcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnRleHRDb250ZW50ID0gY2hpbGRUZXh0LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXIgdG8gdGhpcyBzcGFuXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5vbmNsaWNrID0gdGhpcy5zaG93dWw7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZXZlbnQuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHR1bCA9IG5ld1NwYW4ubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzcGFuIGFuZCByZW1vdmUgdGhlIGJhcmUgdGV4dCBub2RlIGZyb20gdGhlIGxpXG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1NwYW4sIGNoaWxkVGV4dCk7XG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbGkgY2xpY2sgaGFuZGxlclxuICAgIHNob3d1bCA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgY29uc3QgbmV4dHVsID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpO1xuICAgICAgICB9XG4gICAgfTtcbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLy8gVGhpcyBvYmplY3QgY3JlYXRlcyBhbiBhcnJheSBvZiBkaXZzIGZyb20gaW5wdXQgcG9ydCBudW1iZXIgaW5mb3JtYXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsYXNoY2FyZENhcmRFbGVtcyB7XG4gICAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBtX3BvcnRJbmZvTWFwOiBNYXA8bnVtYmVyLCBzdHJpbmc+XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPG51bWJlciwgc3RyaW5nPikge1xuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAgPSBwb3J0bnVtYmVyc01hcDtcbiAgICAgICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG5cbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwLmZvckVhY2goIChwb3J0KSA9PiB7IFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxpc3QgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGZsYXNoY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIC8vVE9ETzogbGV0IGZsYXNoY2FyZCA9IG5ldyBHcm93aW5nQ2FyZEVsZW1lbnQoKTtcbiAgICAgICAgICAgIC8vVW5hYmxlIHRvIGluc3RhbnRpYXRlIGxpIGVsZW1lbnQgYXMgZ3Jvd2luZyBjYXJkIGR1ZSB0byBET00gdW5hdmFsYWJsZSAtLT4gcmVxdWlyZXMgc2hhZG93RE9NIG1hbmlwdWxhdGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgZWxlbWVudCBmb3IgcGFnZSB1c2VcbiAgICAgICAgICAgIGNvbnN0IGlubmVyID0gZmxhc2hjYXJkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGZyb250ID0gaW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBmbGlwYmFjayA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkU3BhbiA9IGZsaXBmcm9udC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBsZXQgZ2FtZUNhcmRCYWNrU3BhbiA9IGZsaXBiYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgIGZsYXNoY2FyZC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIsIFwiZ2FtZUNhcmRcIilcbiAgICAgICAgICAgIGlubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgZmxpcGZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICBmbGlwYmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGdhbWVDYXJkU3Bhbi5pbm5lclRleHQgPSBgUG9ydCMgJHttYXBJdGVyLm5leHQoKS52YWx1ZX1gO1xuICAgICAgICAgICAgZ2FtZUNhcmRCYWNrU3Bhbi5pbm5lclRleHQgPSBgJHtwb3J0fWA7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkaXYgdG8gZmxhc2hjYXJkIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLm1fZmxhc2hjYXJkc0Fyci5wdXNoKGZsYXNoY2FyZCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBHcm93aW5nQ2FyZEVsZW1lbnQgZXh0ZW5kcyBIVE1MTElFbGVtZW50IHtcbiAgICBwcml2YXRlIGlzR3Jvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBoYXNMaW5rO1xuICAgIC8vIHByaXZhdGUgc3RhdGljIGhhZERldGFpbHM7XG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgaGFzRGVzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ3Jvd0NhcmQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hyaW5rQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7IC8vVE9ETzogY2hlY2sgY2xhc3MgcHJvcGVydHlcbiAgICAgICAgaWYgKGxpLnN0eWxlLnNjYWxlKSB7XG4gICAgICAgICAgICBsaS5zdHlsZS5zY2FsZSA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zZXRJc0dyb3duKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hhZGVJbmFjdGl2ZUNhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoR3Jvd2luZ0NhcmRFbGVtZW50LmdldElzQXRMZWFzdE9uZUJpZygpKSB7XG4gICAgICAgICAgICBpZiAoIWxpLmdldElzR3Jvd24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi41XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuM1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXNBdExlYXN0T25lQmlnID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCN3ZWJJREVDYXJkcyBsaWApKTtcbiAgICAgICAgbGV0IGF0TGVhc3RPbmVJc0JpZyA9IGxpc3RMSXMuc29tZSgobGkpID0+IGxpLmdldElzR3Jvd24oKSA9PSB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGF0TGVhc3RPbmVJc0JpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXNHcm93biA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93bjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldElzR3Jvd24gPSAodHJ1ZWZhbHNlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd24gPSB0cnVlZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBncm93Q2FyZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdHlsZS5zY2FsZSA9IFwiMS4yXCI7XG4gICAgICAgIHRoaXMuc3R5bGUuekluZGV4ID0gXCIyXCI7XG4gICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICB0aGlzLnNldElzR3Jvd24odHJ1ZSk7XG5cbiAgICAgICAgLy8gTmVlZCBhbGwgdGhlIGxpc3QgZWxlbWVudHMgdG8gcmVmZXJlbmNlIHdoaWNoIG9uZSB0byBncm93XG4gICAgICAgIC8vIElmIGl0J3Mgbm90IHRoZSBjbGlja2VkIGVsZW1lbnQsIHNocmluayBpdC5cbiAgICAgICAgbGV0IGxpc3RMSXMgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pik7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCgoaXRlbSBhcyBHcm93aW5nQ2FyZEVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjYWxlIHByb3BlcnR5IGZvciBlYWNoIGNhcmRcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdHlsZS5zY2FsZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNsYXNzIExpbmtEZXRhaWxzIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIHBhZ2VOYW1lOiBzdHJpbmc7XG4gICAgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtEZXRhaWxzOyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIjtcbmltcG9ydCBSV0JDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL1JXQkNhcmRcIjtcblxuZXhwb3J0IGNsYXNzIFJhbmRvbVdlYkJpdHMge1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24obmFtZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIENyZWF0ZSBkaXZpc29yIHNlY3Rpb25hbCBlbGVtZW50cyB0byBhcHBlbmQgdG8gbWFpblxuICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FyZCBzZWN0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyA8c2VjdGlvbiBjbGFzcz1cImNhcmRzXCI+XG4gICAgICAgICAgICAvLyAgICAgPGgyPkFyYml0cmFyeSBBcnRpY2xlczo8L2gyPlxuICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkX2NvbHVtbnNcIj5cblxuICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgLy8gPC9zZWN0aW9uPlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGNvbnN0IEFBU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgbGV0IGFhSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICBsZXQgYWFDYXJkc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhQ2FyZHNTZWN0aW9uKTtcbiAgICAgICAgICAgIHBhZ2VNYWluLmFwcGVuZChBQVNlY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XG4gICAgICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXJkX2NvbHVtbnMnKTtcbiAgICAgICAgICAgIGFhSGVhZGluZy5pbm5lclRleHQgPSBgJHtuYW1lfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBhYUNhcmRzU2VjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWFpbiBlbGVtZW50IGV4aXN0cyBvbiB0aGUgcGFnZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQXJ0aWNsZUNhcmRzKGNhcmRzRGF0YTogV2ViQml0W10pIHtcbiAgICAgICAgLy8gSXRlcmF0ZSBlYWNoIGNhcmQgaW4gdGhlIGFycmF5LiBCdWlsZCB0aGUgY2FyZCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlOiBXZWJCaXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJ3YmNhcmQgPSBuZXcgUldCQ2FyZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJ3YmNhcmQuYnVpbGRSV0JDYXJkTWFya3VwKGFydGljbGUpOztcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIGxvY2FsIHN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKiBcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqIFxuICogVGhlbiwgdGhlIHdpZGdldCBpcyBjcmVhdGVkIGFuZCBUby1Eb3MgYXJlIHJldHJpZXZlZCBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XG4gICAgcHVibGljIHN0YXRpYyB0b2Rvc0luTG9jYWxTdG9yYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0xpc3RFbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cykge1xuICAgICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHMgPSBUb0RvTGlzdEVsZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJhbmRvbSBXZWIgQml0cyB1c2VzIG11bHRpcGxlIGxvY2F0aW9ucyB0byBhcHBseSB0aGUgVG8tRG8gTGlzdCB3aWRnZXQuIENyZWF0ZVxuICAgICAqICB0aGUgbGlzdCBtYXJrdXAsIHBhc3NpbmcgaW4gYSByZWZlcmVuY2UgZWxlbWVudCBmb3IgcGxhY2VtZW50IG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIC8vIERlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgICAgICAvLyBTd2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9kaXN0L2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFya3VwIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjMgPSB0Zm9vdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiaXRlbUlOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvLURvOlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGxlZnQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlP1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhtaWRkbGUudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0Ym9keS5pZCA9IFwiVG9Eb0l0ZW1zXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5pZCA9IFwiQWRkQnV0dG9uXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi50eXBlID0gXCJidXR0b25cIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXJrdXAgZXhpc3RzIG9uIHRoZSBwYWdlIGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidUb0RvSXRlbXMnIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVsZW1lbnQgaXMgbm90IHZhbGlkLiBQbGVhc2UgZW5zdXJlIGEgdmFsaWQgZWxlbWVudCBmb3IgVG9EbyBsaXN0IHdpZGdldCB0byBmb2xsb3cuXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIC8vIEdhdGhlciBuZWNlc3NhcnkgZWxlbWVudHMgZnJvbSB0aGUgY3JlYXRlZCB3aWRnZXRcbiAgICAgICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGFibGUnKSxcbiAgICAgICAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb0RvSXRlbXMnKSxcbiAgICAgICAgICAgIGFkZEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpLFxuICAgICAgICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RFbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIFRvLURvIGl0ZW1zIHByZXZpb3VzbHkgaW4gc3RvcmFnZS5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpc1RvRG9JblN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCB0b2RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgVG8tRG8gc3RyaW5nIHRvIExvY2FsIFN0b3JhZ2UuIFRoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2VcbiAgICAgKiAgc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiAtIFVzZXIgZm9ybSBpbnB1dCB0byBhZGQgYXMgYSBkZXNjcmlwdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuXG4gICAgICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgVG9Eb3M6IGFueSA9IFtdO1xuICAgICAgICBUb0Rvcy5wdXNoKFRvRG8pO1xuXG4gICAgICAgIC8vYWRkIHRoZSBUb0RvcyB0byBsb2NhbCBjYWNoZVxuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodG9kb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KFRvRG9zKSk7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3QudG9kb3NJbkxvY2FsU3RvcmFnZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghVG9Eb0xpc3QuaXNUb0RvSW5TdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgICAgICBpZiAodG9kb3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAgICogIEEgcm93IGNvbnNpc3RzIG9mIHRocmVlIGNvbHVtbnM6IGEgY29tcGxldGUgdGljay1ib3gsIGEgZGVzY3JpcHRpb24sIGFuZCBhIGRlbGV0ZSBidXR0b24uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVXNlciBmb3JtIGlucHV0IHRvIGFkZCBhcyBhIGRlc2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZFRvRG9Sb3coZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikge1xuICAgICAgICAvL0NyZWF0ZSBhIHRhYmxlIHJvdyB3aXRoIGNoZWNrYm94IGFuZCBkZWxldGUgb3B0aW9uc1xuICAgICAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHRhYmxlRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTsgLy9BZGQgcm93XG4gICAgICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICAgICAgY29uc3QgbmV3SVRFTSA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdEZWxldGUnKTtcbiAgICAgICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvTGlzdC5Ub0RPcyA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjVG9ETyB0ZFtudW1dJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoTnVtYmVyKGVsZW0/LmdldEF0dHJpYnV0ZShcIm51bVwiKSkgfHwgLTEwMDApICsgVG9Eb0xpc3QuVG9ET3MpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uLnRvU3RyaW5nKCk7IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSByb3cgdG8gdGhlIFRvRG9zIHRhYmxlXG4gICAgICAgICAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcblxuICAgICAgICAgICAgLy9hZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICAgICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuRGVsZXRlQnV0dG9uKGRlbEJPWCk7IH0pO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgICAgIC8vYWRkIHRvIGxpc3Qgc3RvcmFnZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIHdlcmUgbm8gJ1RvRG9JdGVtcycgZm91bmQgb3IgdGhleSBhcmUgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgdGhlIFRvLURvIGl0ZW0gcm93cyBmcm9tIFRvLURvcyBzdG9yZWQgaW4gdGhlIGJyb3dzZXIgTG9jYWwgU3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgICAgIC8vcmV0cmlldmUgdG9kbyBpdGVtcyBpbiBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgZWFjaCB0byB0aGUgbGlzdFxuICAgICAgICBsZXQgcGFyc2VkVG9Eb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG5cbiAgICAgICAgaWYgKHBhcnNlZFRvRG9zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2VkVG9Eb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3cocGFyc2VkVG9Eb3NbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYnV0dG9uIGZ1bmN0aW9uYWxpdHk6IERlbGV0ZSwgQWRkLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBBRERCVVRUT04gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkQnV0dG9uO1xuICAgICAgICBjb25zdCBBRERJVEVNRU5URVIgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkSXRlbVRvRW50ZXI7XG4gICAgICAgIGlmIChBRERCVVRUT04gIT0gbnVsbCAmJiBBRERJVEVNRU5URVIgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmdW5jdGlvbiBkZXRlcm1pbmluZyB0aGUgZGVsZXRlIGJ1dHRvbi4gSXRlbXMgYXJlIGRlbGV0ZWQgd2hlbiBwdXNoZWQsIGJ1dCBhcmVcbiAgICAgKiAgbm90IHJlbW92ZWQgZnJvbSBzdG9yYWdlIHdpdGhvdXQgJ0NvbXBsZXRlPycgY2hlY2tlYm94IGNoZWNrZWQuXG4gICAgICogQHBhcmFtIGJveCBjaGVja2JveCBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBEZWxldGVCdXR0b24oYm94OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlmIChib3gucGFyZW50Tm9kZSAhPSBudWxsICYmIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZyAhPSBudWxsICYmXG4gICAgICAgICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nICE9IG51bGwpIHtcblxuICAgICAgICAgICAgbGV0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PmJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICBsZXQgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b2RvVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICAgICAgaWYgKHRvZG9UYWJsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gJ0FkZCBhIFRvRE8gSXRlbS4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBhc3NvY2lhdGVkIHN0b3JhZ2UgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YWJsZScgZWxlbWVudCBub3QgZm91bmQgb3IgaXQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIHNlZWQgdGhlIFRvLURvIExpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gTG9jYWwgU3RvcmFnZSBpdGVtc1xuICAgICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gdGJvZHkgdGFibGUgYm9keSBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgICAgICBpZiAoIVRvRG9MaXN0LmlzVG9Eb0luU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzYW1wbGUgZW50cnkgaW4gdGhlIFRvRG8gdGFibGUgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgY29uc3QgdHIyID0gdGJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgICAgICAgICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgICAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmVzZXRcIik7XG4gICAgICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG4gICAgICAgICAgICB0ZDJJTi50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgICAgdGQybWlkZGxlLnRleHRDb250ZW50ID0gXCJBZGQgYSBUb0RPIEl0ZW0uXCI7XG4gICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcysrO1xuXG4gICAgICAgICAgICAvL1wiZGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5jbGFzcyBXZWJCaXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGRhdGVDcmVhdGVkOiBEYXRlO1xuICAgIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlQUxUOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlQUxUOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkJpdDsiXX0=

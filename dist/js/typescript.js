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
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const LinkDetails_1 = require("../models/LinkDetails");
/**
 * Header navigation link data
 */
const homeNavLink = new LinkDetails_1.default("Index", "Home", "Home", "index.html");
const pagesNavLink = new LinkDetails_1.default("Pages", "Pages", "Pages", "pages.html");
const gameNavLink = new LinkDetails_1.default("Game", "FlashCards", "Game", "flashcards.html");
/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
/**
 * Widget to add site header and footer. Instantiated in 'Main' script.
 */
const HeaderFooter = {
    headerWidget: {
        /**
         * Site header containing navigation links and site logo.
         */
        init: () => {
            /**
             * HTML 'main' element
             */
            const pageMain = document.querySelector('main');
            /** Header element container */
            let siteHeader;
            // Add header element to the page
            if (pageMain != null) { // 'Main' element exists, add the header to it
                try {
                    siteHeader = pageMain.insertAdjacentElement('beforebegin', HeaderFooter.headerWidget.buildHeader());
                }
                catch (e) {
                    console.log("Check site header is not null before 'main' element.`n", e);
                }
            }
            else { // 'Main' element does not exist, add the header to the body
                try {
                    siteHeader = document.body.insertAdjacentElement('afterbegin', HeaderFooter.headerWidget.buildHeader());
                }
                catch (e) {
                    console.log("Check site header is not null after 'body' element.`n", e);
                }
            }
            //Append navigation items to header
            try {
                siteHeader.prepend(HeaderFooter.headerWidget.buildNavigation());
            }
            catch (e) {
                console.log("Cannot prepend navigation items.", e);
            }
        },
        /**
         * Create header with site logo appended.
         * @param main HTML 'main' element
         * @returns Populated header element
         */
        buildHeader: () => {
            /**
             * Basic HTML header element containing logo (H1)
             */
            const siteHeader = document.createElement('header');
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>';
            H1.setAttribute("id", "RandomWebBits");
            siteHeader.append(H1);
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
                if (window.location.host == 'robhowe-a.github.io') {
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
        let WebBit = document.createElement('div');
        this.rwbcardelements = {
            cardImg: document.createElement('img'),
            cardImgTop: document.createElement('div'),
            cardBody: document.createElement('div')
        };
        let cardBodyHeading = document.createElement('h3');
        let cardBodyPara = document.createElement('p');
        let cardBodyLink = document.createElement('a');
        this.rwbcardelements.cardImgTop.appendChild(this.rwbcardelements.cardImg);
        this.rwbcardelements.cardBody.appendChild(cardBodyHeading);
        this.rwbcardelements.cardBody.appendChild(cardBodyPara);
        this.rwbcardelements.cardBody.appendChild(cardBodyLink);
        // Add card data attributes and property values
        WebBit.classList.add('card');
        WebBit.setAttribute("id", `${article.id}`);
        this.rwbcardelements.cardBody.classList.add("cardBody");
        this.rwbcardelements.cardImg.setAttribute('src', article.cardImage);
        this.rwbcardelements.cardImg.setAttribute('alt', article.cardImageALT);
        this.rwbcardelements.cardImg.setAttribute('Article', article.articleNumber.toString());
        cardBodyLink.setAttribute('href', article.articleLink);
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
        if (rwbcardelements.cardImg.getAttribute('Article') === link.articleid.toString()) {
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
            backHeading.textContent = link.attributedowner;
            backPara.textContent = link.innerText;
            attributeLink.href = link.hReference;
            attributeLink.title = link.title;
            attributeLink.textContent = link.attributedowner;
        }
    }
}
exports.default = RWBCard;

},{}],7:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
// Attribution: Robert A Howell, May 2023
// Content derived from: W3Schools, https://www.w3schools.com/howto/howto_js_slideshow.asp
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Component creating slideshow widgets
 */
const slideshowWidget = {
    slideIndex: 1,
    /**
     * Create slideshow components.
     */
    init: () => {
        slideshowWidget.showSlides(slideshowWidget.slideIndex);
        // Next/previous controls
        function plusSlides(n) {
            slideshowWidget.showSlides(slideshowWidget.slideIndex += n);
        }
        // Thumbnail image controls
        function currentSlide(n) {
            slideshowWidget.showSlides(slideshowWidget.slideIndex = n);
        }
        //Change to next slide when arrow buttons are clicked
        const slideShowPreviousBtns = document.getElementsByClassName("slideshowPrev");
        const slideShowNextBtns = document.getElementsByClassName("slideshowNext");
        for (let btn of slideShowPreviousBtns) {
            btn.addEventListener("click", () => {
                plusSlides(-1);
            });
        }
        for (let btn of slideShowNextBtns) {
            btn.addEventListener("click", () => {
                plusSlides(1);
            });
        }
        //Change to selected slide when dot are clicked
        const slideShowDots = document.getElementsByClassName("dot");
        let dotCounter = 1;
        for (let dot of slideShowDots) {
            //add dot counter
            dot.setAttribute("dotindex", `${dotCounter}`);
            //when clicked, navigate to the slide indicated
            dot.addEventListener("click", () => {
                plusSlides(dotCounter);
            });
            dotCounter++;
        }
        dotCounter = 1;
    },
    showSlides: (n) => {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideshowWidget.slideIndex = 1;
        }
        if (n < 1) {
            slideshowWidget.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            let tempSlide = slides[i];
            tempSlide.style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        let tempSlide = slides[slideshowWidget.slideIndex - 1];
        tempSlide.style.display = "block";
        dots[slideshowWidget.slideIndex - 1].className += " active";
    }
};
exports.default = slideshowWidget;

},{}],8:[function(require,module,exports){
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
        //ToDoList constructor
        const todoWidget = new ToDo_1.ToDoList();
        //Creates widget markup and populates To-Do tasks contained in Local Storage
        todoWidget.createToDoListWidget(elem);
    }
};
exports.default = ToDosWidget;

},{"../models/ToDo":21}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const data_1 = require("../lib/data");
const RandomWebBits_1 = require("../models/RandomWebBits");
/**
 * Card widget to initialize article data into HTML card elements. This widget
 * creates multiple sections of cards to add to a page.
 */
const RWBCardsWidget = {
    /** Cards initialization function. This function breaks down the data structure in
     * order to formulate the article details into one card for each article data.
     *
     * Articles have different categories, so each category must be respected.
     * */
    init: () => {
        // Split the cards arrays into their respective category
        /** Multiple categories of card data exist. This array holds the markup needed
         * to create category sections divisions when placed on a page.
         */
        let cardsSection = [
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Arbitrary Articles:"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Guide Shorts:"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Exlore the Web:"),
        ];
        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores
        /**This array holds the markup of card elements. Each index stores the cards' data
         * for one category of articles. */
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
            /** Randomize the order of cards. */
            const getMultipleRandom = (arr, num) => {
                // randomize the array
                const shuffled = [...arr].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, num); // return the requested number of elements
            };
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 5);
            cardsArticles[1] = getMultipleRandom(cardsArticles[1], 3);
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

},{"../lib/data":10,"../models/RandomWebBits":20}],10:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const WebBit_1 = require("../models/WebBit");
const AttributionLink_1 = require("../models/AttributionLink");
// Create new AA (Arbitrary Article)
/**
 * "Arbitrary Articles' section card data."
 */
const ArbitraryArticles = new Array(new WebBit_1.default("domainLookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new WebBit_1.default("htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2)), new WebBit_1.default("httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new WebBit_1.default("webTech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("jsonObject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("chatGPT", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new WebBit_1.default("paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new WebBit_1.default("BOINC", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new WebBit_1.default("IP_Address", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new WebBit_1.default("HTML_Markup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new WebBit_1.default("Network_Speed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new WebBit_1.default("PowerShell_Drives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new WebBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new WebBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon", new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new WebBit_1.default("WebIDE", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new WebBit_1.default("JavaScript", 26, "JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new WebBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new AttributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new WebBit_1.default("WB_CSS", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new AttributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new WebBit_1.default("LATENCY", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new AttributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)));
/**
 * "Guide Shorts' section card data."
 */
const GuideShorts = new Array(new WebBit_1.default("Search_Verticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon", new AttributionLink_1.default("content writing icons", "Content writing icons created by Vectors Tank - Flaticon", "https://www.flaticon.com/free-icons/content-writing", "Flaticon", "Search Verticals", 14)), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "SMTP and Email", 16)), new WebBit_1.default("DevTools", 19, "GUIDE: Dev Application", "Review dev tool's application tab", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Dev Application", 19)), new WebBit_1.default("DevToolsTwo", 21, "GUIDE: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Inspect Pages", 21)), new WebBit_1.default("PWAIcon", 27, "GUIDE: Install the PWA applications", "Progressive websites have an installation option", new Date(2023, 5, 27), "guides/pwaicon.html", "img/app-development.webp", "App development icon", new AttributionLink_1.default("development icons", "Development icons created by Design Circle - Flaticon", "https://www.flaticon.com/free-icons/development", "Flaticon", "JavaScript", 27)), new WebBit_1.default("ClearCookies", 30, "GUIDE: Clear cookies quickly", "Don't waste time sifting through settings", new Date(2023, 7, 2), "guides/clearcookiesquickly.html", "img/cookies.webp", "Browser cookie icon", new AttributionLink_1.default("cookie icons", "Cookie icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/cookie", "Flaticon", "GUIDE: Clear cookies quickly", 30)));
/**
 * "Explore section card data."
 */
const Explore = new Array(new WebBit_1.default("nasa", 3, "EXPLORE: NASA Pages", "Explore the NASA domain. Learn about the universe via NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo", new AttributionLink_1.default("NASA", "Image source via the National Aeronautics and Space Administration", "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html", "NASA", "NASA Pages", 3)), new WebBit_1.default("Virtual_Tour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON", new AttributionLink_1.default("google expeditions icons", "Google expeditions icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/google-expeditions", "Flaticon", "Virtual Tour", 18)), new WebBit_1.default("Webb", 31, "James Webb Space Telescope", "", new Date(2023, 7, 3), "explore/webbtelescope.html", "img/JWST_poster.webp", "James Webb space telescope poster image", new AttributionLink_1.default("Hexagon Litho (2018)", "James Webb Space Telescope icon provided by nasa.gov", "https://jwst.nasa.gov/content/features/educational/print.html", "jwst.nasa.gov", "James Webb Space Telescope icon", 31)));
/**
 * Multidimensional array. Rows are the different sections. Columns
 * contain each article's data belonging in that section.
 */
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"../models/AttributionLink":13,"../models/WebBit":22}],11:[function(require,module,exports){
"strict mode";
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
const SlideShowWidget_1 = require("./components/SlideShowWidget");
// entry point
/**
 * TypeScript entry point. This script initializes page components and models as
 *  they're needed main.init() is the initialization of "typescript.js".
 */
const main = {
    /**
     * Initialize page widgets and application functions.
     */
    init() {
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
            // Initialize slideshow components
            if (window.location.pathname == '/guides/pwaicon.html') {
                SlideShowWidget_1.default.init();
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
            main.mobileAbbrMarkup();
        });
    },
    /**
     * Attribute tags on mobile do not have hover option. This function adds a click
     *  ability to define an abbr tag, than rely on the title attribute.
     */
    mobileAbbrMarkup() {
        /**
         *
         */
        class AbbrOpen {
            isOpen = false;
            abbrElement;
            constructor() {
                this.isOpen = true;
            }
            ;
        }
        const allabbreviationelems = document.querySelectorAll("abbr");
        if (allabbreviationelems.length > 0) {
            for (let abbr of allabbreviationelems) {
                let abbrev = new AbbrOpen();
                abbrev.abbrElement = abbr;
                abbrev.abbrElement.addEventListener("click", (e) => {
                    e.preventDefault();
                    let abbrtitleattrval = abbrev.abbrElement.getAttribute("title");
                    let description;
                    if (e.target == abbr) {
                        if (abbrev.abbrElement.children.length < 1) { //create the span element
                            description = abbrev.abbrElement.appendChild(document.createElement("span"));
                            description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(160)})`;
                        }
                        else { //show the span element
                            description = abbrev.abbrElement.querySelector("span");
                            description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(160)})`;
                        }
                    }
                    abbrev.abbrElement.addEventListener("mouseleave", () => {
                        description.textContent = "";
                    });
                });
            }
        }
    }
};
main.init();

},{"./components/DictionaryWidget":1,"./components/ExpandingListDOMWidget":2,"./components/FlashcardGameWidget":3,"./components/GrowingCard":4,"./components/HeaderFooter":5,"./components/SlideShowWidget":7,"./components/ToDos":8,"./components/WebBits":9}],12:[function(require,module,exports){
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
        if (typeof GETURL === "string") {
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
     * A public function creating a data promise object for the called fetch function. If
     *  the request needs added to browser storage, the fetch is made and sent to
     *  storage. A cloned copy of the fetched data is returned and the original request is
     *  sent to the cache. Without sending to browser cache, the fetch is requested and
     * returned.
     *
     * @param GETURL - the (full) url of data request.
     * @returns dataCachePromise: Promise<unknown>
     */
    async apiGET(GETURL) {
        //Check if the request is for cache storage
        if (this.sendToBrowserCache) {
            //The returned data is packages as a Promise object
            let dataCachePromise = new Promise((resolve, reject) => {
                if ("caches" in window) {
                    //Open cache and check for request existing in Cache Storage
                    window.caches.open(this.browserCacheName).then((cache) => {
                        caches.match(GETURL).then((result) => {
                            if (result === undefined) {
                                //No matches for this request in Storage Cache, so fetch the request normally
                                //Upon success, a cloned copy will need to be returned.
                                fetch(GETURL).then((result) => {
                                    //Copy the response since it can only be read once
                                    let clonedresp = result.clone();
                                    //Add the result to the cache
                                    cache.put(GETURL, result);
                                    resolve(clonedresp.json().then(text => text));
                                });
                            }
                            else {
                                //Cache hit success, return the response data
                                resolve(result.json().then(text => text));
                            }
                        });
                    })
                        .catch(e => {
                        console.log(`%cProblem opening Cache Storage. Name: ${this.browserCacheName}`, "color: grey");
                        this.sendToBrowserCache = false;
                    }).finally(() => {
                        resolve(this.fetchData(GETURL));
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
/**
 * Used for image Attribution
*/
class AttributionLink extends LinkDetails_1.default {
    /**Name of the owner */
    attributedowner;
    /**WebBits article data ID */
    articleid;
    constructor(
    /**Link title */
    title, 
    /**Link inner text */
    innerText, 
    /** link href */
    hReference, 
    /**Name of the owner */
    attributedowner, 
    /**WebBits page */
    pageName, 
    /**WebBits article data ID */
    articleid) {
        super(title, innerText, pageName, hReference);
        this.attributedowner = attributedowner;
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
 * known placement location) that contains the 'dictionaryWidget' class.
 *
 *   new DictionarySearch(elem);
 *
 * All the needed elements and functionality are added to the page.
 *
 */
class DictionarySearch extends DictionarySearchWidget_1.default {
    static wordStorage;
    static CacheStorageNameofWordRequest = "RWB_word_fetch";
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
        //Invoke DictionarySearchWidget superclass constructor.
        super();
        //Call creation for all the markup needed to begin the widget
        this.dictionarySearchMarkup = this.createDictionaryWidgetMarkup(elem);
        //Initialize the dictionary widget with click event listeners
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
        //Local Storage 'word-caches' items data assignment
        //cache response links and cache name are previously stored in Local Storage
        let storageStr;
        try {
            storageStr = localStorage.getItem("word-caches");
        }
        catch (e) {
            if (e instanceof DOMException) {
                console.log(`%cCannot get Local Storage "word-caches."
        %c${e.name} 
        ${e.message} 
        %c${e.stack}`, "color: grey", "color: orangered", "color: red");
            }
            else {
                console.log(`Problem getting Local Storage key: word-caches`);
            }
        }
        if (storageStr != null && storageStr != "[]") {
            DictionarySearch.wordStorage = JSON.parse(storageStr);
            return DictionarySearch.wordStorage;
        }
        else {
            //The Local Storage is null --> Confirm here the browser does not have any Cache Storage items in error
            if ("caches" in window) {
                if (window.caches.has(DictionarySearch.CacheStorageNameofWordRequest)) {
                    window.caches.delete(DictionarySearch.CacheStorageNameofWordRequest);
                }
            }
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
            if (event.key === "Enter") {
                event.preventDefault();
                this.wordSearch(this.dictionarySearchMarkup, false, null);
            }
        });
        //"Previous word searches" button fetches locally stored words
        //Clicking the button displays each word in a list within the widget
        this.dictionarySearchMarkup.previousWordBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const placementlocationholder = document.querySelector(".previousWords");
            let buttonContainer = document.getElementById("dictionary-btns");
            let newButtonContainer;
            if (this.previousWordsBtnWasClicked == false) {
                if (this.previousWordsBtnIsCreated == false) {
                    newButtonContainer = placementlocationholder.insertAdjacentElement("afterend", document.createElement("div"));
                    newButtonContainer.id = "dictionary-btns";
                    //Check the placement locator and word caches for undefined
                    if (placementlocationholder != undefined &&
                        DictionarySearch.wordStorage !== undefined &&
                        DictionarySearch.wordStorage.length !== 0) {
                        //Because the locator and the Local Storage values are viable, create the markup
                        //needed to display those words. Add event listeners for widget functionality.
                        for (let wordCache of DictionarySearch.wordStorage) {
                            const wordHeadingElemContainer = newButtonContainer.appendChild(document.createElement("div"));
                            const cacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
                            const deleteCacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
                            deleteCacheWordHeadingElem.setAttribute("type", "button-clear");
                            deleteCacheWordHeadingElem.classList.add("dictionary-word-btn-clear");
                            cacheWordHeadingElem.setAttribute("type", "button");
                            cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
                            cacheWordHeadingElem.textContent = wordCache.word;
                            //add event listener for new button
                            //when clicked, fire a word search
                            cacheWordHeadingElem.addEventListener("click", (event) => {
                                event.preventDefault();
                                this.wordSearch(this.dictionarySearchMarkup, true, wordCache);
                            });
                            //MOBILE
                            //when hovered, display the delete button option
                            wordHeadingElemContainer.addEventListener("touchstart", () => {
                                deleteCacheWordHeadingElem.style.display = "inline-block";
                                //when not hovered, hide the delete button option
                                wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                                    if (event.target == deleteCacheWordHeadingElem) {
                                        return;
                                    }
                                    deleteCacheWordHeadingElem.style.display = "none";
                                });
                            });
                            //when hovered, display the delete button option
                            wordHeadingElemContainer.addEventListener("mouseover", (event) => {
                                deleteCacheWordHeadingElem.style.display = "inline-block";
                                //when not hovered, hide the delete button option
                                wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                                    if (event.target == deleteCacheWordHeadingElem) {
                                        return;
                                    }
                                    deleteCacheWordHeadingElem.style.display = "none";
                                });
                            });
                            //add event listener for delete button
                            deleteCacheWordHeadingElem.addEventListener("click", (event) => {
                                event.preventDefault();
                                wordHeadingElemContainer.remove();
                                this.removeDictionaryTermfromLocalStorage(cacheWordHeadingElem.textContent);
                            });
                            this.previousWordsBtnIsCreated = true;
                        }
                    }
                    else {
                        if (this.previousWordsNotFoundOnce == false) {
                            const noWordsHeadingElem = newButtonContainer.appendChild(document.createElement("div"));
                            noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                            noWordsHeadingElem.textContent =
                                "Previous words not found. The cache is empty.";
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
     * Adds the word to the browser's Local Storage containing word data, URL, and caching.
     *
     * @param localstoragevalue - This interface stores information where sending to Local Storage.
     */
    addDictionaryTermtoLocalStorage(localstoragevalue) {
        let wordStore = [];
        wordStore.push(localstoragevalue);
        //Add the cache item to Local Storage
        try {
            if (localStorage.getItem("word-caches") == null) {
                // Local storage empty => add the word
                localStorage.setItem("word-caches", JSON.stringify(wordStore));
                return;
            }
            //Add word to current 'word-caches' in Local Storage
            let storageStr = localStorage.getItem("word-caches");
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
                        //Word is already in Local Storage
                        // No need to add it to the array
                        return;
                    }
                }
                //Add word to existing 'word-caches' in Local Storage
                allcache.push(localstoragevalue);
                localStorage.setItem("word-caches", JSON.stringify(allcache));
            }
        }
        catch (e) {
            if (e instanceof DOMException) {
                console.log(`%cCannot get Local Storage "word-caches."
        %c${e.name} 
        ${e.message} 
        %c${e.stack}`, "color: grey", "color: orangered", "color: red");
            }
            else {
                console.log(`Problem getting Local Storage key: word-caches`);
            }
        }
    }
    /**
     * Remove a previous word data from browser's Local Storage --> Key/Value
     * data referencing if words are in local cache.
     *
     * @param localstorageword - string from "Previous Word Searches" button
     */
    removeDictionaryTermfromLocalStorage(localstorageword) {
        //Remove the cache item to Local Storage, Cache Storage
        try {
            if (localStorage.getItem("word-caches") == null) {
                //No words in storage, there's been an error!
                console.log("No stored words, refresh the page!");
                return;
            }
            //Get the words array from Local Storage
            let storageStr = localStorage.getItem("word-caches");
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
                let removeURL;
                for (let wordCache of DictionarySearch.wordStorage) {
                    if (wordCache.word == localstorageword) {
                        removeURL = wordCache.wordURL;
                    }
                }
                this.removeRequestfromCacheStorage(removeURL);
                //Remove the word from Local Storage word array, return words to storage
                let allcache = JSON.parse(storageStr);
                for (let cache of allcache) {
                    if (cache.word == localstorageword) {
                        allcache.splice(allcache.indexOf(cache), 1);
                    }
                }
                localStorage.setItem("word-caches", JSON.stringify(allcache));
            }
        }
        catch (err) {
            console.log("Problem removing the word. Error: ", err);
        }
    }
    /**
     * Remove a fetch request from Cache Storage. Utilizes
     * DictionarySearch.CacheStorageNameofWordRequest for cache name.
     * @param removeURL
     */
    removeRequestfromCacheStorage(removeURL) {
        window.caches
            .open(DictionarySearch.CacheStorageNameofWordRequest)
            .then((cache) => {
            caches.match(removeURL).then((result) => {
                if (result === undefined) {
                    console.log("Problem matching the result. Result: ", result);
                }
                else {
                    let cachePromise = new Promise((resolve) => resolve(result));
                    cachePromise.then(() => {
                        cache.delete(removeURL);
                    });
                }
            });
        });
    }
    /**
     * This function structures with word definition request and instantiates apiGET(). The
     * promise return data structures the widget markup.
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
            const wordFetch = new API_1.apiGET(wordcache.wordURL, wordcache.inCache, searchElems.errorElem, wordcache.cacheName);
            let noDefinitions = false;
            //Fetch request method call. Returned data may be the word definition
            let data = await wordFetch.apiGET(wordFetch.getGETURL());
            if (typeof data == "string") {
                //If the returned data is a string, it is the word definition data.
                data = JSON.parse(data);
            }
            let wordData = data;
            //If the returned data is an object, confirm it is 'no definition' server data
            if (typeof data == "object") {
                if (Object.hasOwn(wordData, "title")) {
                    //No definitions were found
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
                                this.removeRequestfromCacheStorage(wordFetch.getGETURL());
                            }
                            catch {
                                console.log("Could not remove from Cache Storage. Name: ", wordFetch.getGETURL());
                            }
                        }, 5000);
                    }
                }
            }
            if (data != undefined && !noDefinitions) { //Good data--> return data for markup render
                this.addDictionaryTermtoLocalStorage(wordcache);
                return data;
            }
            else { //'Bad data' due to "No definitions found", invalid word, bad network connection
                if (navigator.onLine !== false) { //Online, problem with fetch
                    if (noDefinitions) { //Server returned no definitions data
                        if (wordData.title == "No Definitions Found")
                            searchElems.searchWord.classList.add("invalid-notfound");
                        searchElems.errorElem.classList.add("error-notfound");
                        searchElems.errorElem.innerText = "No Definitions Found";
                    }
                    else { //Invalid word data
                        searchElems.searchWord.classList.add("invalid-notfound");
                        searchElems.errorElem.classList.add("error-notfound");
                        searchElems.errorElem.innerText = "Invalid word!";
                    }
                }
                else { //Offline request
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
        let wordDataPromise = new Promise((resolve) => {
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, true, DictionarySearch.CacheStorageNameofWordRequest));
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
            }
        }
        searchElems.searchWord.value = ""; // reset input string
    }
}
exports.DictionarySearch = DictionarySearch;

},{"../models/API":12,"./DictionarySearchWidget":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A DictionarySearchWidget is made to create the markup needed for the
 *  Dictionary Search. Elements are created and appended to the page to the class
 *  'dictionaryWidget'
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
                    searchElements.searchWord.setAttribute("type", "text");
                    searchElements.searchWord.setAttribute("placeholder", "Search...");
                    searchElements.searchWord.setAttribute("aria-label", "Input");
                    searchElements.wordSearch.setAttribute("type", "button");
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
     * @param searchElems - Widget Elements -- key widget function elements.
     */
    createDictionaryTermWithMarkup(wordData, searchElems) {
        if (wordData == null || !(wordData instanceof Object)) {
            try {
                throw new Error("There is no definition for this word.");
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
        const deleteWordTermHeadingElem = definitionDescriptionContainer.appendChild(document.createElement("button"));
        deleteWordTermHeadingElem.setAttribute("type", "word-clear");
        deleteWordTermHeadingElem.classList.add("dictionary-word-btn-clear");
        //when hovered, display the delete button option
        definitionDescriptionContainer.addEventListener("mouseover", (event) => {
            deleteWordTermHeadingElem.style.display = "inline-block";
            //when not hovered, hide the delete button option
            definitionDescriptionContainer.addEventListener("mouseout", () => {
                deleteWordTermHeadingElem.style.display = "none";
            });
        });
        //add event listener for delete button
        deleteWordTermHeadingElem.addEventListener("click", (event) => {
            event.preventDefault();
            definitionDescriptionContainer.remove();
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
/**
 * HTML link element data. Used with anchor tags.
 */
class LinkDetails {
    /**HTML title attribute */
    title;
    /**Inner text string*/
    innerText;
    /**The page the link is associated to*/
    pageName;
    /**HTML href attribute*/
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
    static todosInLocalStorage = false;
    static ToDOs = 0;
    static ToDoElements;
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
    /**
     * Random Web Bits uses multiple locations to apply the To-Do List widget. Create
     *  the list markup, passing in a reference element for placement of the widget.
     * @param elem - widget is placed after this reference element.
     */
    createToDoListWidget(elem) {
        //Insert the widget after the passed in "elem"
        //Dependent on the page, todo widget may have pre-existing markup in place
        //Switch against the current page to determine markup needed
        if (elem !== undefined) {
            if (elem.classList.contains("ToDoList")) {
                switch (window.location.pathname) {
                    case '/RandomWebBits/':
                    case '/RandomWebBits/index.html':
                    case '/index.html':
                    case '/':
                    case '/dist/index.html':
                        //Markup does not exist on the page
                        //Create table elements needed for the todo list
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
                        //Add attributes and property values
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
                        //Create a sample to do item (it is not stored in cache)
                        this.createSampleTo_Do(tbody);
                        //With the elements created, set the class list elements
                        this.getToDoListElements();
                        ToDoList.setToDoListElements(this.listElements);
                        this.populateToDoList();
                        this.addToDoEventListeners();
                        break;
                    case '/RandomWebBits/pages/todos.html':
                    case '/pages/todos.html':
                        //Markup exists on the page already
                        //With the elements created, set the class list elements
                        this.getToDoListElements();
                        ToDoList.setToDoListElements(this.listElements);
                        //Create a sample to do item (it is not stored in cache)
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
        //Gather necessary elements from the created widget
        //Each widget location's elements may vary, so a call of getToDoListElements()
        //locates the page's elements to populate the ToDoElements interface.
        let ToDoElements = {
            todoTable: document.querySelector('#ToDO table'),
            todoTableBody: document.getElementById('ToDoItems'),
            addButton: document.getElementById('AddButton'),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        };
        this.listElements = ToDoElements;
    }
    /**
     * Checks for To-Do items from Local Storage.
     * @returns boolean true or false
     */
    static isToDoInStorage() {
        let todos;
        try {
            todos = JSON.parse(localStorage.getItem('ToDos'));
        }
        catch (e) {
            if (e instanceof DOMException) {
                console.log(`%cCannot get Local Storage "ToDos."
              %c${e.name} 
              ${e.message} 
              %c${e.stack}`, "color: grey", "color: orangered", "color: red");
            }
            else {
                console.log(`Problem getting Local Storage key: ToDos`);
            }
        }
        if (todos == null) {
            return false;
        }
        else
            return true;
    }
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
        ToDos.push(ToDo);
        //First, read current Local Storage ToDos
        let todos = JSON.parse(localStorage.getItem('ToDos'));
        try {
            if (todos == null) { //Nothing in storage, push current
                localStorage.setItem('ToDos', JSON.stringify(ToDos));
                ToDoList.todosInLocalStorage = true;
            }
            else { //Add the new ToDo to the current ToDos and push via setItem()
                todos.push(ToDo);
                localStorage.setItem('ToDos', JSON.stringify(todos));
            }
        }
        catch (err) {
            console.log("Problem storing To-do list item: ", err);
            if (err instanceof DOMException) {
                console.log(err.name, err.message, err.stack);
            }
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
            //Add attributes and property values
            checkBOX.setAttribute('type', 'checkbox');
            checkBOX.setAttribute('aria-label', 'Checkbox');
            checkBOX.setAttribute('aria-label', 'Delete');
            newITEM.setAttribute('num', ToDoList.ToDOs ? (() => {
                let elem = document.querySelector('#ToDO td[num]');
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoList.ToDOs).toString();
            })() : (1).toString());
            newITEM.textContent = description; //Populate second col
            ToDoList.ToDOs++; //Number of Items
            delBOX.setAttribute('type', 'submit');
            delBOX.setAttribute('value', 'Delete');
            //Add the row to the ToDos table
            TABLEITEM.appendChild(tableFrag);
            //Add an event listener for when 'delete' is clicked
            delBOX.addEventListener("click", () => { this.DeleteButton(delBOX); });
            if (firstPaint) {
                //Add to list storage
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
        //Retrieve todo items in Local Storage and add each to the list
        let parsedToDos;
        try {
            parsedToDos = JSON.parse(localStorage.getItem('ToDos'));
        }
        catch (e) {
            if (e instanceof DOMException) {
                console.log(`%cCannot get Local Storage "ToDos."
              %c${e.name} 
              ${e.message} 
              %c${e.stack}`, "color: grey", "color: orangered", "color: red");
            }
            else {
                console.log(`Problem getting Local Storage key: ToDos`);
            }
        }
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
            //Create a sample entry in the ToDo table as a placeholder
            const tr2 = tbody.appendChild(document.createElement('tr'));
            const td2left = tr2.appendChild(document.createElement('td'));
            const td2IN = td2left.appendChild(document.createElement('input'));
            const td2middle = tr2.appendChild(document.createElement('td'));
            const td2right = tr2.appendChild(document.createElement('td'));
            const td2DEL = td2right.appendChild(document.createElement('input'));
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
            td2DEL.addEventListener("click", () => { this.DeleteButton(td2DEL); });
        }
    }
}
exports.ToDoList = ToDoList;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class holds the data for 'WebBit' article cards. Key information
 * of the article's contents are contained: name, description, data created,
 * etc.
 */
class WebBit {
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
    }
}
exports.default = WebBit;

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1JXQkNhcmQudHMiLCJzcmMvY29tcG9uZW50cy9TbGlkZVNob3dXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Ub0Rvcy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHMudHMiLCJzcmMvbGliL2RhdGEudHMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbHMvQVBJLnRzIiwic3JjL21vZGVscy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvbW9kZWxzL0RpY3Rpb25hcnlTZWFyY2gudHMiLCJzcmMvbW9kZWxzL0RpY3Rpb25hcnlTZWFyY2hXaWRnZXQudHMiLCJzcmMvbW9kZWxzL0V4cGFuZGluZ0xpc3QudHMiLCJzcmMvbW9kZWxzL0ZsYXNoY2FyZENhcmRFbGVtcy50cyIsInNyYy9tb2RlbHMvR3Jvd2luZ0NhcmQudHMiLCJzcmMvbW9kZWxzL0xpbmtEZXRhaWxzLnRzIiwic3JjL21vZGVscy9SYW5kb21XZWJCaXRzLnRzIiwic3JjL21vZGVscy9Ub0RvLnRzIiwic3JjL21vZGVscy9XZWJCaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHVDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0Q7O0dBRUc7QUFDSCxNQUFNLGdCQUFnQixHQUFHO0lBQ3JCOzs7O09BSUc7SUFDSCxJQUFJLEVBQUUsQ0FBQyxJQUFhLEVBQUUsRUFBRTtRQUNwQiwrQkFBK0I7UUFDL0IsSUFBSSxtQ0FBZ0IsQ0FBQyxJQUFJLENB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a2FDOzs7OztBQ2piRDs7OztHQUlHO0FBQ0gsTUFBTSxNQUFNO0lBQ1IsRUFBRSxDQUFTO0lBQ1gsYUFBYSxDQUFTO0lBQ3RCLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBUztJQUNwQixXQUFXLENBQU87SUFDbEIsV0FBVyxDQUFTO0lBQ3BCLFNBQVMsQ0FBUztJQUNsQixZQUFZLENBQVM7SUFDckIsZUFBZSxDQUFrQjtJQUVqQyxZQUNJLEVBQVUsRUFDVixhQUFxQixFQUNyQixJQUFZLEVBQ1osV0FBbUIsRUFDbkIsV0FBaUIsRUFDakIsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsWUFBb0IsRUFDcEIsZUFBaUM7UUFFakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2ggfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlTZWFyY2hcIlxuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBEaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gY3JlYXRlcyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCBieSBjYWxsaW5nIHRoZVxuICAgICAqICBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBEaWN0aW9uYXJ5U2VhcmNoIGNvbnN0cnVjdG9yXG4gICAgICAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlXaWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBFeHBhbmRpbmdMaXN0RWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvRXhwYW5kaW5nTGlzdFwiO1xuXG5jb25zdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdEVsZW1lbnQsIHsgZXh0ZW5kczogJ3VsJyB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIFwiRE9NXCIgcGFnZSBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIEFkZCBhIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGktc3BhbiB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlPcGVuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpmaXJzdC1jaGlsZGApO1xuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlDbG9zZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46bnRoLWNoaWxkKDMpYCk7XG5cbiAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlcyBmb3IgZXhwYW5kaW5nLWVsZW1lbnQgZXhwYW5kYWJsZSBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaU9wZW5PcGVuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJ1xuICAgICAgICAgICAgICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG9mIGNsb3Npbmcgc3BhbiBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaUNsb3NlU3Bhbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nTGlzdERPTVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBGbGFzaGNhcmRDYXJkRWxlbXMgZnJvbSAnLi4vbW9kZWxzL0ZsYXNoY2FyZENhcmRFbGVtcydcblxuY29uc3QgZmxhc2hjYXJkZ2FtZVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIEVzdGFibGlzaCB3aGljaCBwb3J0IG51bWJlcnMgdG8gdGVzdCBhbmQgdGhlIGRlZmluaXRpb25cbiAgICAgICAgY29uc3QgcG9ydGRlZmluaXRpb25zID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgICAgICAgICAgWzIyLCBcIlNlY3VyZSBTU0ggIC9UQ1BcIl0sXG4gICAgICAgICAgICBbMjMsIFwiVGVsbmV0ICh1bnNlY3VyZSlcIl0sXG4gICAgICAgICAgICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICAgICAgICAgIFs0OSwgXCJUQUNBQ1MrXCJdLFxuICAgICAgICAgICAgWzUzLCBcIkROUyAgL1VEUC9UQ1BcIl0sXG4gICAgICAgICAgICBbNjcsIFwiREhDUFwiXSxcbiAgICAgICAgICAgIFs2OCwgXCJESENQXCJdLFxuICAgICAgICAgICAgWzgwLCBcIkhUVFAgIC9UQ1BcIl0sXG4gICAgICAgICAgICBbODgsIFwiS2VyYmVyb3Mtc2VjICAvVENQL1VEUFwiXSxcbiAgICAgICAgICAgIFsxMTAsIFwiUE9QIC0gOTk1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICAgICAgICAgICAgWzEzNSwgXCJSUENcIl0sXG4gICAgICAgICAgICBbMTM3LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTM4LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTM5LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTQzLCBcIklNQVAgLSA5OTMgZm9yIGVuY3J5cHRlZFwiXSxcbiAgICAgICAgICAgIFsxNjEsIFwiU05NUCAgTWFuYWdlclwiXSxcbiAgICAgICAgICAgIFsxNjIsIFwiU05NUCAgQWdlbnRcIl0sXG4gICAgICAgICAgICBbMzg5LCBcIkxEQVAgLSA2MzYgZm9yIHNlY3VyZVwiXSxcbiAgICAgICAgICAgIFs0NDMsIFwiSFRUUFMgIC9UQ1BcIl0sXG4gICAgICAgICAgICBbNDQ1LCBcIlNNQiAgL1RDUFwiXSxcbiAgICAgICAgICAgIFs0NjUsIFwiU01UUCBieSBUTFNcIl0sXG4gICAgICAgICAgICBbNTE0LCBcIlNZU0xPRyAgL1VEUFwiXSxcbiAgICAgICAgICAgIFs1ODcsIFwiU01UUFMgZm9yIE1TQVwiXSxcbiAgICAgICAgICAgIFs2MzYsIFwiTERBUCBTU0xcIl0sXG4gICAgICAgICAgICBbOTkwLCBcIkZUUFNcIl0sXG4gICAgICAgICAgICBbMTgxMiwgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgICAgICAgICAgWzE4MTMsIFwiUkFESVVTICAvVENQL1VEUFwiXSxcbiAgICAgICAgICAgIFszMjY5LCBcIk1pY3Jvc29mdCBHbG9iYWwgQ2F0YWxvZ1wiXSxcbiAgICAgICAgICAgIFszMzg5LCBcIlJEUFwiXSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGZsYXNoY2FyZCBlbGVtZW50c1xuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZERpdnMgPSBuZXcgRmxhc2hjYXJkQ2FyZEVsZW1zKHBvcnRkZWZpbml0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgdGhlIGdhbWUncyB0aXRsZSBlbGVtZW50XG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkUGFnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZsYXNoQ2FyZHNcIik7XG4gICAgICAgIGNvbnN0IGdhbWV0aXRsZUVsZW0gPSBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgICAgICBnYW1ldGl0bGVFbGVtLmlubmVyVGV4dCA9IFwiQ29tcHV0aW5nIFBvcnQgTnVtYmVyc1wiXG5cbiAgICAgICAgLy8gQWRkIHRoZSBmbGFzaGNhcmRzIHRvIHBhZ2VcbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBtYWluRmxhc2hDYXJkRGl2cy5tX2ZsYXNoY2FyZHNBcnIpe1xuICAgICAgICAgICAgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXNoY2FyZGdhbWVXaWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBHcm93aW5nQ2FyZEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3dpbmdDYXJkXCJcblxuY29uc3QgQWN0aXZlQ2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dyb3dpbmctY2FyZCcsIEdyb3dpbmdDYXJkRWxlbWVudCwgeyBleHRlbmRzOiAnbGknIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgfHwgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRGV0YWlsc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGxpc3QgaXRlbXMgKGNhcmRzKVxuICAgICAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpKTtcblxuICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnQgdG8gcmVzaXplIHRoZSBjYXJkcyBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGEgY2FyZFxuICAgICAgICAgICAgLy8gV2hlbiBjbGlja2luZyBvdXRzaWRlIGEgY2FyZCwgcmVzaXplIGFsbCBjYXJkcyB0byBub3JtYWxcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wSXRlbTogR3Jvd2luZ0NhcmRFbGVtZW50ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCh0ZW1wSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXNoYWRlIGFsbCBjYXJkcyBiZWNhdXNlIG5vbmUgb2YgdGhlbSBhcmUgYmlnXG4gICAgICAgICAgICBmb3IgKGxldCBsaSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKGxpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlQ2FyZHNXaWRnZXQ7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4uL21vZGVscy9MaW5rRGV0YWlscyc7XG5cbi8qKlxuICogSGVhZGVyIG5hdmlnYXRpb24gbGluayBkYXRhXG4gKi9cbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pO1xuXG5jb25zdCBnYW1lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG4vKiogTmF2aWdhdGlvbiBsaW5rcyAqL1xuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGluaywgZ2FtZU5hdkxpbmtdO1xuXG4vKipcbiAqIFdpZGdldCB0byBhZGQgc2l0ZSBoZWFkZXIgYW5kIGZvb3Rlci4gSW5zdGFudGlhdGVkIGluICdNYWluJyBzY3JpcHQuXG4gKi9cbmNvbnN0IEhlYWRlckZvb3RlciA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpdGUgaGVhZGVyIGNvbnRhaW5pbmcgbmF2aWdhdGlvbiBsaW5rcyBhbmQgc2l0ZSBsb2dvLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIVE1MICdtYWluJyBlbGVtZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICAgICAgLyoqIEhlYWRlciBlbGVtZW50IGNvbnRhaW5lciAqL1xuICAgICAgICAgICAgbGV0IHNpdGVIZWFkZXI6IEVsZW1lbnQgfCBudWxsO1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsKSB7Ly8gJ01haW4nIGVsZW1lbnQgZXhpc3RzLCBhZGQgdGhlIGhlYWRlciB0byBpdFxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBwYWdlTWFpbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcigpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYmVmb3JlICdtYWluJyBlbGVtZW50LmBuXCIsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyAnTWFpbicgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgYWRkIHRoZSBoZWFkZXIgdG8gdGhlIGJvZHlcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBhZnRlciAnYm9keScgZWxlbWVudC5gblwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQXBwZW5kIG5hdmlnYXRpb24gaXRlbXMgdG8gaGVhZGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIucHJlcGVuZChIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBwcmVwZW5kIG5hdmlnYXRpb24gaXRlbXMuXCIsIGUpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBoZWFkZXIgd2l0aCBzaXRlIGxvZ28gYXBwZW5kZWQuXG4gICAgICAgICAqIEBwYXJhbSBtYWluIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybnMgUG9wdWxhdGVkIGhlYWRlciBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBidWlsZEhlYWRlcjogKCkgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNpYyBIVE1MIGhlYWRlciBlbGVtZW50IGNvbnRhaW5pbmcgbG9nbyAoSDEpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGNvbnN0IEgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkgxXCIpO1xuICAgICAgICAgICAgSDEudGV4dENvbnRlbnQgPSAnPFJhbmRvbSBXZWIgQml0cz4nO1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoSDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGROYXZpZ2F0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBCdWlsZCB0aGUgaGVhZGVyIG5hdmlnYXRpb24gYmFzZWQgb24gbmF2aWdhdGlvbiBkYXRhXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmF2aWdhdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlck5hdkZyYWdcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJykpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgbmF2IGRhdGEgdG8gbmF2IGVsZW1lbnRzXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdExpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnByZXBlbmQobmF2TGlzdExpbmtzKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgbmF2aWdhdGlvbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3MudGV4dENvbnRlbnQgPSBgJHtpdGVtLmlubmVyVGV4dH1gO1xuICAgICAgICAgICAgICAgIC8vIEVudmlyb25tZW50IGxpbmtzIGVkaXQsIHJlcXVpcmluZyBkaWZmZXJlbnQgbGluayByZWxhdGl2ZXMgdG8gb3BlcmF0ZVxuICAgICAgICAgICAgICAgIC8vIEdpdGh1YiBwYWdlcyBvcGVyYXRlcyBmcm9tIHJlcG9zaXRvcnksIG5vdCAnLydcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT0gJ3JvYmhvd2UtYS5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGVkaXQgZm9yIGRldiBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBBZGQgZm9vdGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2UgZW5kXG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kKEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIHNpdGVGb290ZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjIgUmFuZG9tIFdlYkJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiSWNvbkhvbWU6ICM0NTAyNjc1NVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckZvb3RlcjsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9BdHRyaWJ1dGlvbkxpbmtcIjtcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIjtcbmltcG9ydCB7IFJXQkNhcmRFbGVtZW50cyB9IGZyb20gXCIuLi9tb2RlbHMvV2lkZ2V0TWFya3VwRWxlbWVudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JDYXJkIHtcbiAgICAvKipcbiAgICAgKiBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqL1xuICAgIHByaXZhdGUgcndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHM7XG4gICAgLyoqXG4gICAgICogIE1hcCBXZWJCaXQgZGF0YSB0byBhIGNhcmQgZWFjaFxuICAgICAqIFxuICAgICAqICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAqICAgICAgPGRpdj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRCb2R5XCI+XG4gICAgICogICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgIDxhIGhyZWY9XCJcIj48L2E+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+XG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlOiBXZWJCaXQpIHtcbiAgICAgICAgbGV0IFdlYkJpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cyA9IHtcbiAgICAgICAgICAgIGNhcmRJbWc6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgICAgICAgICAgY2FyZEltZ1RvcDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBjYXJkQm9keTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlIZWFkaW5nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcblxuICAgICAgICAvLyBBZGQgY2FyZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICBXZWJCaXQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBXZWJCaXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7YXJ0aWNsZS5pZH1gKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIsKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBhcnRpY2xlLmFydGljbGVMaW5rKVxuICAgICAgICBjYXJkQm9keUhlYWRpbmcuaW5uZXJUZXh0ID0gYXJ0aWNsZS5uYW1lO1xuICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgICAgICAvLyBJbWFnZSBhdHRyaWJ1dGlvbiBtYXkgYmUgbmVlZGVkIGZvciB0aGUgaW1hZ2UgdXNlZFxuICAgICAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICAgICAgaWYgKGFydGljbGUubGlua0F0dHJpYnV0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbCh0aGlzLnJ3YmNhcmRlbGVtZW50cywgYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGNhcmQgaXMgV2ViQml0XG4gICAgICAgIC8vIEFkZCB0aGUgbWFya3VwIHRvIHRoZSBjb250YWluaW5nIGVsZW1lbnRcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3ApO1xuICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkpO1xuXG4gICAgICAgIHJldHVybiBXZWJCaXQ7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGltYWdlIGF0dHJpYnV0aW9uLCB0aGUgaW1hZ2UgaWQgYW5kIGFydGljbGUgaWQgd2lsbCBtYXRjaCxcbiAgICAgKiBvdGhlcndpc2UgdGhlIGRhdGEgaXNuJ3QgZW50ZXJlZCwgY2F1c2luZyBhIG1pc3NcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImZsaXAtY2FyZFwiPjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRGcm9udFwiPlxuICAgICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQmFja1wiPlxuICAgICAqICAgICAgICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgICAgICA8cD48L3A+XG4gICAgICogICAgICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIiBjbGFzcz1cImltZ1NtYWxsIGltZ1BUUlwiPlxuICAgICAqICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgKiBAcGFyYW0gcndiY2FyZGVsZW1lbnRzIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAgICogQHBhcmFtIGxpbmsgQXR0cmlidXRpb24gbGlua1xuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChyd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cywgbGluazogQXR0cmlidXRpb25MaW5rKSB7XG4gICAgICAgIGlmIChyd2JjYXJkZWxlbWVudHMuY2FyZEltZy5nZXRBdHRyaWJ1dGUoJ0FydGljbGUnKSA9PT0gbGluay5hcnRpY2xlaWQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGltYWdlIGJhY2sgcGFuZWwgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICAgICAgLy8gUmVkZWZpbmUgY2FyZCBpbWFnZSBwYW5lbCBhcyBhIGZsaXAgcGFuZWxcbiAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250ID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY2FyZEZyb250LmFwcGVuZENoaWxkKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTsgLy8gbW92ZSBpbWFnZSB3aXRoaW4gY2FyZCBmcm9udCBkaXZpc29yXG4gICAgICAgICAgICBsZXQgc21hbGxJbWcgPSA8SFRNTEltYWdlRWxlbWVudD5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICBjYXJkQmFjay5hcHBlbmRDaGlsZChzbWFsbEltZyk7XG4gICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSByd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpOyAvL2FwcGVuZCB0byBmcm9udCBwYW5lbFxuXG4gICAgICAgICAgICAvLyBBZGQgZmxpcC1wYW5lbCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xuICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgICAgIGJhY2tQYXJhLnRleHRDb250ZW50ID0gbGluay5pbm5lclRleHRcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZG93bmVyO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuLy8gQXR0cmlidXRpb246IFJvYmVydCBBIEhvd2VsbCwgTWF5IDIwMjNcbi8vIENvbnRlbnQgZGVyaXZlZCBmcm9tOiBXM1NjaG9vbHMsIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vaG93dG8vaG93dG9fanNfc2xpZGVzaG93LmFzcFxuXG5cbi8qKlxuICogQ29tcG9uZW50IGNyZWF0aW5nIHNsaWRlc2hvdyB3aWRnZXRzXG4gKi9cbmNvbnN0IHNsaWRlc2hvd1dpZGdldCA9IHtcbiAgICBzbGlkZUluZGV4OiAxLFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzbGlkZXNob3cgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE5leHQvcHJldmlvdXMgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gcGx1c1NsaWRlcyhuOm51bWJlcikge1xuICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggKz0gbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFRodW1ibmFpbCBpbWFnZSBjb250cm9sc1xuICAgICAgICBmdW5jdGlvbiBjdXJyZW50U2xpZGUobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBuZXh0IHNsaWRlIHdoZW4gYXJyb3cgYnV0dG9ucyBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dQcmV2aW91c0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93UHJldlwiKTtcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93TmV4dEJ0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93TmV4dFwiKTtcbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd1ByZXZpb3VzQnRucyl7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcygtMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBidG4gb2Ygc2xpZGVTaG93TmV4dEJ0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hhbmdlIHRvIHNlbGVjdGVkIHNsaWRlIHdoZW4gZG90IGFyZSBjbGlja2VkXG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd0RvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICBsZXQgZG90Q291bnRlciA9IDE7XG4gICAgICAgIGZvcihsZXQgZG90IG9mIHNsaWRlU2hvd0RvdHMpe1xuICAgICAgICAgICAgLy9hZGQgZG90IGNvdW50ZXJcbiAgICAgICAgICAgIGRvdC5zZXRBdHRyaWJ1dGUoXCJkb3RpbmRleFwiLCBgJHtkb3RDb3VudGVyfWApXG4gICAgICAgICAgICAvL3doZW4gY2xpY2tlZCwgbmF2aWdhdGUgdG8gdGhlIHNsaWRlIGluZGljYXRlZFxuICAgICAgICAgICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoZG90Q291bnRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvdENvdW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBkb3RDb3VudGVyID0gMTtcbiAgICB9LFxuICAgIHNob3dTbGlkZXM6IChuOiBudW1iZXIpPT57XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlTbGlkZXNcIik7XG4gICAgICAgICAgICBsZXQgZG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XG4gICAgICAgICAgICBpZiAobiA+IHNsaWRlcy5sZW5ndGgpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IDF9XG4gICAgICAgICAgICBpZiAobiA8IDEpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IHNsaWRlcy5sZW5ndGh9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbaV07XG4gICAgICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gZG90c1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGVtcFNsaWRlID0gPEhUTUxEaXZFbGVtZW50PnNsaWRlc1tzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCAtIDFdXG4gICAgICAgICAgICB0ZW1wU2xpZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGRvdHNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXS5jbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVzaG93V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdCB9IGZyb20gXCIuLi9tb2RlbHMvVG9Eb1wiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBUby1EbyBMaXN0IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBUb0Rvc1dpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBUby1EbyBMaXN0IHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnVG9Eb0xpc3QnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKGVsZW06IEVsZW1lbnQpID0+IHtcblxuICAgICAgICAvL1RvRG9MaXN0IGNvbnN0cnVjdG9yXG4gICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgICAgICAvL0NyZWF0ZXMgd2lkZ2V0IG1hcmt1cCBhbmQgcG9wdWxhdGVzIFRvLURvIHRhc2tzIGNvbnRhaW5lZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9Eb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXRUJCSVREQVRBIGZyb20gXCIuLi9saWIvZGF0YVwiXG5pbXBvcnQgeyBSYW5kb21XZWJCaXRzIH0gZnJvbSBcIi4uL21vZGVscy9SYW5kb21XZWJCaXRzXCJcblxuLyoqXG4gKiBDYXJkIHdpZGdldCB0byBpbml0aWFsaXplIGFydGljbGUgZGF0YSBpbnRvIEhUTUwgY2FyZCBlbGVtZW50cy4gVGhpcyB3aWRnZXQgXG4gKiBjcmVhdGVzIG11bHRpcGxlIHNlY3Rpb25zIG9mIGNhcmRzIHRvIGFkZCB0byBhIHBhZ2UuXG4gKi9cbmNvbnN0IFJXQkNhcmRzV2lkZ2V0ID0ge1xuICAgIC8qKiBDYXJkcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiBicmVha3MgZG93biB0aGUgZGF0YSBzdHJ1Y3R1cmUgaW4gXG4gICAgICogb3JkZXIgdG8gZm9ybXVsYXRlIHRoZSBhcnRpY2xlIGRldGFpbHMgaW50byBvbmUgY2FyZCBmb3IgZWFjaCBhcnRpY2xlIGRhdGEuXG4gICAgICogXG4gICAgICogQXJ0aWNsZXMgaGF2ZSBkaWZmZXJlbnQgY2F0ZWdvcmllcywgc28gZWFjaCBjYXRlZ29yeSBtdXN0IGJlIHJlc3BlY3RlZC4gXG4gICAgICogKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIFNwbGl0IHRoZSBjYXJkcyBhcnJheXMgaW50byB0aGVpciByZXNwZWN0aXZlIGNhdGVnb3J5XG4gICAgICAgIC8qKiBNdWx0aXBsZSBjYXRlZ29yaWVzIG9mIGNhcmQgZGF0YSBleGlzdC4gVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG5lZWRlZCBcbiAgICAgICAgICogdG8gY3JlYXRlIGNhdGVnb3J5IHNlY3Rpb25zIGRpdmlzaW9ucyB3aGVuIHBsYWNlZCBvbiBhIHBhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudFtdID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkFyYml0cmFyeSBBcnRpY2xlczpcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJFeGxvcmUgdGhlIFdlYjpcIiksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGNhcmQgZGF0YSArIGF0dHJpYnV0aW9uIGxpbmsgZGF0YVxuICAgICAgICAvLyBXRUJCSVREQVRBIGJyb2tlbiBpbnRvIDMgYXJyYXlzOiBQYWdlcywgb3IgYXJ0aWNsZXMsIEd1aWRlcywgYW5kIEV4cGxvcmVzXG4gICAgICAgIC8qKlRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBvZiBjYXJkIGVsZW1lbnRzLiBFYWNoIGluZGV4IHN0b3JlcyB0aGUgY2FyZHMnIGRhdGFcbiAgICAgICAgICogZm9yIG9uZSBjYXRlZ29yeSBvZiBhcnRpY2xlcy4gKi8gXG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzOiBhbnkgPSBbXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQXJ0aWNsZUNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgIF07XG5cbiAgICAgICAgXG4gICAgICAgIC8vIFJvdXRlcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgcGFnZXNcbiAgICAgICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9uIHRvIDMgYXJ0aWNsZXMgb25seVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgICAgIC8qKiBSYW5kb21pemUgdGhlIG9yZGVyIG9mIGNhcmRzLiAqL1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCA1KTtcbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMV0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzFdLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgZGVjb25zdHJ1Y3Rpb24gYW5kIGFkZGl0aW9uXG4gICAgICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgdGhlIGRhdGEgdG8gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJbm5lciBsb29wOiBpdGVyYXRlIHRocm91Z2ggdGhlIGNhdGVnb3J5IGRhdGFcbiAgICAgICAgICAgICAgICAvLyBGcm9tIHRoZSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXMuc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNTZWN0aW9uW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUldCQ2FyZHNXaWRnZXQiLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi4vbW9kZWxzL1dlYkJpdFwiXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5cbi8vIENyZWF0ZSBuZXcgQUEgKEFyYml0cmFyeSBBcnRpY2xlKVxuXG4vKipcbiAqIFwiQXJiaXRyYXJ5IEFydGljbGVzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBBcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcImRvbWFpbkxvb2t1cFwiLFxuICAgICAgICAxLFxuICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgXCJDaGVjayBhbiBhdmFpbGFibGUgZG9tYWluIHVzaW5nIFdob0lTIEFQSSBzZWFyY2hcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDQpLFxuICAgICAgICBcInBhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dob2lzLndlYnBcIixcbiAgICAgICAgXCJXaG9JcyBMb29rdXBcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICAgICAgMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcImh0bWxyZXNwb25zZXNcIixcbiAgICAgICAgMixcbiAgICAgICAgXCJIVE1MIEZyYW1lc1wiLFxuICAgICAgICBcIlZpZXcgSFRNTCBwYWdlIHJlc3BvbnNlIHN0YXR1cyBpbmZvcm1hdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxuICAgICAgICBcInBhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX0ZyYW1lcy53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb2RlIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29kZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiaHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzc2wgY2VydGlmaWNhdGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbC1jZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIndlYlRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJjaGF0R1BUXCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJhaSBpY29uc1wiLFxuICAgICAgICAgICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgICAgIDhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJwYWludDNkXCIsXG4gICAgICAgIDksXG4gICAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgICAgXCJFZGl0IHBpY3R1cmVzIG9yIHNjcmVlbiBjYXB0dXJlcyB1c2luZyBwYWludCAzRFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgICAgIFwicGFnZXMvcGFpbnQzZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Byb3RvdHlwZS53ZWJwXCIsXG4gICAgICAgIFwiQ29sb3JmdWwgcHJvdG90eXBpbmcgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwcm90b3R5cGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUHJvdG90eXBlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Byb3RvdHlwZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICAgICAgOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpY3Rpb25hcnlcIixcbiAgICAgICAgMTAsXG4gICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICBcIkxpc3QgZGljdGlvbmFyeSB0ZXJtcyB1c2luZyBhIGRpY3Rpb25hcnkgQVBJXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDMwKSxcbiAgICAgICAgXCJwYWdlcy9kaWN0aW9uYXJ5d29yZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2RpY3Rpb25hcnkud2VicFwiLFxuICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbiBkZXBpY3Rpb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGljdGlvbmFyeSBpY29uc1wiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RpY3Rpb25hcnlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICAgICAgMTBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJCT0lOQ1wiLFxuICAgICAgICAxMSxcbiAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICBcIlBpdm90IHRoZSB1bnVzZWQgY29tcHV0aW5nIHBvdGVudGlhbCBmb3Igc2NpZW5jZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCA2KSxcbiAgICAgICAgXCJwYWdlcy9ib2luYy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2JvaW5jX2dsb3NzeS53ZWJwXCIsXG4gICAgICAgIFwiQk9JTkMgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uc1wiLFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uIGRlc2lnbmVkIGJ5IE1pY2hhbCBLcmFrb3dpYWsuIENveXJpZ2h0KEMpIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgICAgICAgICAgXCJCT0lOQ1wiLFxuICAgICAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICAgICAgMTFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJJUF9BZGRyZXNzXCIsXG4gICAgICAgIDEyLFxuICAgICAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgICAgIFwiTG9va3VwIHB1YmxpYyBhbmQgbG9jYWwgSVAgYWRkcmVzc2VzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDEzKSxcbiAgICAgICAgXCJwYWdlcy9pcGFkZHJlc3MuaHRtbFwiLFxuICAgICAgICBcImltZy9pcC53ZWJwXCIsXG4gICAgICAgIFwiSVAgbG9jYXRpb24gYW5kIGJyb3dzZXIgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJJUCBpY29uc1wiLFxuICAgICAgICAgICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICAgICAgMTJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MX01hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDEzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29ya19TcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXG4gICAgICAgICAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAgICAgICAgIDE1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUG93ZXJTaGVsbF9Ecml2ZXNcIixcbiAgICAgICAgMTcsXG4gICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgXCJTaW1pbGFyIHRvIGFuIEhERCwgZXhjZXB0IGl0IGlzIG9ubHkgaW4gUG93ZXJTaGVsbFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMCksXG4gICAgICAgIFwicGFnZXMvZHJpdmVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdGVybWluYWwud2VicFwiLFxuICAgICAgICBcIkNvbXB1dGVyIHRlcm1pbmFsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBGbGF0IEljb25zIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgICAgIDE3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0ROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG5zIGljb25zXCIsXG4gICAgICAgICAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kbnNcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAgICAgMjBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicmFuayBpY29uc1wiLFxuICAgICAgICAgICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9yYW5rXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAgICAgICAgIDIyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIDIzLFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICBcIlJldmlldyB0aGUgRE9NIHdpdGggYSBET00gdHJlZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAyNyksXG4gICAgICAgIFwicGFnZXMvZG9tLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdHJlZS53ZWJwXCIsXG4gICAgICAgIFwiQSB0cmVlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidHJlZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJUcmVlIGljb25zIGNyZWF0ZWQgYnkganVzdGljb24gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRPTVwiLFxuICAgICAgICAgICAgMjNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJJREVcIixcbiAgICAgICAgMjQsXG4gICAgICAgIFwiV2ViSURFXCIsXG4gICAgICAgIFwiVHJ5IHNraXBwaW5nIHRoZSBkb3dubG9hZCB3aXRoIGEgd2ViIElERVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAzKSxcbiAgICAgICAgXCJwYWdlcy93ZWJpZGVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdXgud2VicFwiLFxuICAgICAgICBcIkEgY29tcHV0ZXIgYXBwbGljYXRpb24gaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkZXNpZ24gaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGVzaWduIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJ3ZWJpZGVzXCIsXG4gICAgICAgICAgICAyNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICAyNSxcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgXCJGaW5kIGFuIFNWRyBhbmQgbGVhcm4gYWJvdXQgdGhlIFNWRyBsYW5ndWFnZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCA5KSxcbiAgICAgICAgXCJwYWdlcy9zdmcuaHRtbFwiLFxuICAgICAgICBcImltZy9zdmcuc3ZnXCIsXG4gICAgICAgIFwiQW4gc3ZnIGljb24gZXhhbXBsZS5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2NhbGFibGUgdmVjdG9yIGdyYXBoaWNzXCIsXG4gICAgICAgICAgICBcIlNWRyBpY29uIGNyZWF0ZWQgYnkgSGFydmV5IFJheW5lclwiLFxuICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvXCIsXG4gICAgICAgICAgICBcIlczQ1wiLFxuICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIDI1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAyNixcbiAgICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgIFwiRGlzYWJsZSB0aGUgSmF2YVNjcmlwdCB0byB0ZXN0IHdlYnNpdGUgZnVuY3Rpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjIpLFxuICAgICAgICBcInBhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgICAgICBcImltZy9zb2Z0d2FyZS1hcHBsaWNhdGlvbi53ZWJwXCIsXG4gICAgICAgIFwiQSBqYXZhc2NyaXB0IGZ1bmN0aW9uIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiV2ViIGNvZGluZyBpY29ucyBjcmVhdGVkIGJ5IE11aGFtbWFkIEF0aWYgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy93ZWItY29kaW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0hUVFBcIixcbiAgICAgICAgMjgsXG4gICAgICAgIFwiSFRUUFwiLFxuICAgICAgICBcIkhUVFAgbWFrZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nIHdlYiBwYWdlcyBwb3NzaWJsZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTIpLFxuICAgICAgICBcInBhZ2VzL2h0dHAuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwLndlYnBcIixcbiAgICAgICAgXCJIdHRwIHZlcmIgaW4gZnJvbnQgb2YgYSBnbG9iZSBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodHRwIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0dHAgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHR0cFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogSFRUUFwiLFxuICAgICAgICAgICAgMjhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXQl9DU1NcIixcbiAgICAgICAgMjksXG4gICAgICAgIFwiQ1NTXCIsXG4gICAgICAgIFwiQ1NTIHN0eWxlcyB0aGUgZWxlbWVudHMgd2l0aGluIGEgcGFnZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTkpLFxuICAgICAgICBcInBhZ2VzL2Nzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nzcy0zLndlYnBcIixcbiAgICAgICAgXCJBIENTUyB0aHJlZSBsb2dvLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjc3MgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ3NzIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWwgcGVyZmVjdCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nzc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDU1NcIixcbiAgICAgICAgICAgIDI5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEFURU5DWVwiLFxuICAgICAgICAzMixcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIFwiVHJhdmVsIGxhdGVuY3kgY2FuIHNsb3cgZG93biBhIHdlYnNpdGUuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDE4KSxcbiAgICAgICAgXCJwYWdlcy9sYXRlbmN5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY2hyb25vbWV0ZXIud2VicFwiLFxuICAgICAgICBcIkEgc3RvcHdhdGNoIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRpbWVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlRpbWVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RpbWVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgICAgIDMyXG4gICAgICAgIClcbiAgICApXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaF9WZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29udGVudCB3cml0aW5nIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvbnRlbnQtd3JpdGluZ1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgICAgICAxNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNNVFBcIixcbiAgICAgICAgMTYsXG4gICAgICAgIFwiR1VJREU6IFNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgIFwiTGVhcm4gRW1haWwgcHJvdG9jb2xzIGFuZCBwb3J0IG51bWJlcnNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMTMpLFxuICAgICAgICBcImd1aWRlcy9zbXRwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29tbXVuaWNhdGlvbnMud2VicFwiLFxuICAgICAgICBcIkVtYWlsIHNlcnZlci1zdGFjayB3aXRoIG1haWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICAgICAgMTZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZUb29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgYXBwbGljYXRpb24gdGFiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvYXBwbGljYXRpb250YWIuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveC53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAxOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldlRvb2xzVHdvXCIsXG4gICAgICAgIDIxLFxuICAgICAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgICAgIDIxXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUFdBSWNvblwiLFxuICAgICAgICAyNyxcbiAgICAgICAgXCJHVUlERTogSW5zdGFsbCB0aGUgUFdBIGFwcGxpY2F0aW9uc1wiLFxuICAgICAgICBcIlByb2dyZXNzaXZlIHdlYnNpdGVzIGhhdmUgYW4gaW5zdGFsbGF0aW9uIG9wdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL3B3YWljb24uaHRtbFwiLFxuICAgICAgICBcImltZy9hcHAtZGV2ZWxvcG1lbnQud2VicFwiLFxuICAgICAgICBcIkFwcCBkZXZlbG9wbWVudCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRldmVsb3BtZW50IGljb25zXCIsXG4gICAgICAgICAgICBcIkRldmVsb3BtZW50IGljb25zIGNyZWF0ZWQgYnkgRGVzaWduIENpcmNsZSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RldmVsb3BtZW50XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ2xlYXJDb29raWVzXCIsXG4gICAgICAgIDMwLFxuICAgICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgICAgXCJEb24ndCB3YXN0ZSB0aW1lIHNpZnRpbmcgdGhyb3VnaCBzZXR0aW5nc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyKSxcbiAgICAgICAgXCJndWlkZXMvY2xlYXJjb29raWVzcXVpY2tseS5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nvb2tpZXMud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgY29va2llIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29va2llIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvb2tpZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb29raWVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICAgICAgMzBcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiRXhwbG9yZSBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBFeHBsb3JlID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwibmFzYVwiLFxuICAgICAgICAzLFxuICAgICAgICBcIkVYUExPUkU6IE5BU0EgUGFnZXNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSBOQVNBIGRvbWFpbi4gTGVhcm4gYWJvdXQgdGhlIHVuaXZlcnNlIHZpYSBOQVNBIGxpbmtzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxOCksXG4gICAgICAgIFwiZXhwbG9yZS9uYXNhLmh0bWxcIixcbiAgICAgICAgXCJpbWcvTkFTQS53ZWJwXCIsXG4gICAgICAgIFwiTkFTQSBBcnRlbWlzIExvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJJbWFnZSBzb3VyY2UgdmlhIHRoZSBOYXRpb25hbCBBZXJvbmF1dGljcyBhbmQgU3BhY2UgQWRtaW5pc3RyYXRpb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cubmFzYS5nb3YvYXVkaWVuY2UvZm9yc3R1ZGVudHMvNS04L2ZlYXR1cmVzL3N5bWJvbHMtb2YtbmFzYS5odG1sXCIsXG4gICAgICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgICAgIFwiTkFTQSBQYWdlc1wiLFxuICAgICAgICAgICAgM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlZpcnR1YWxfVG91clwiLFxuICAgICAgICAxOCxcbiAgICAgICAgXCJFWFBMT1JFOiBWaXJ0dWFsIFRvdXJzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgcmVhbCB3b3JsZCBpbiBhIHdlYiBicm93c2VyXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIzKSxcbiAgICAgICAgXCJleHBsb3JlL3ZpcnR1YWx0b3VyLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZ29vZ2xlLWV4cGVkaXRpb25zLndlYnBcIixcbiAgICAgICAgXCJHb29nbGUgRXhwZWRpdGlvbnMgbG9nbyBmcm9tIEZMQVRJQ09OXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImdvb2dsZSBleHBlZGl0aW9ucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJHb29nbGUgZXhwZWRpdGlvbnMgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZ29vZ2xlLWV4cGVkaXRpb25zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlZpcnR1YWwgVG91clwiLFxuICAgICAgICAgICAgMThcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJiXCIsXG4gICAgICAgIDMxLFxuICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlXCIsXG4gICAgICAgIFwiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDMpLFxuICAgICAgICBcImV4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL0pXU1RfcG9zdGVyLndlYnBcIixcbiAgICAgICAgXCJKYW1lcyBXZWJiIHNwYWNlIHRlbGVzY29wZSBwb3N0ZXIgaW1hZ2VcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSGV4YWdvbiBMaXRobyAoMjAxOClcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvbiBwcm92aWRlZCBieSBuYXNhLmdvdlwiLFxuICAgICAgICAgICAgXCJodHRwczovL2p3c3QubmFzYS5nb3YvY29udGVudC9mZWF0dXJlcy9lZHVjYXRpb25hbC9wcmludC5odG1sXCIsXG4gICAgICAgICAgICBcImp3c3QubmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvblwiLFxuICAgICAgICAgICAgMzFcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIE11bHRpZGltZW5zaW9uYWwgYXJyYXkuIFJvd3MgYXJlIHRoZSBkaWZmZXJlbnQgc2VjdGlvbnMuIENvbHVtbnNcbiAqIGNvbnRhaW4gZWFjaCBhcnRpY2xlJ3MgZGF0YSBiZWxvbmdpbmcgaW4gdGhhdCBzZWN0aW9uLlxuICovXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cblxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTsiLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEhlYWRlckZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyRm9vdGVyJztcbmltcG9ydCBSV0JDYXJkc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvV2ViQml0cyc7XG5pbXBvcnQgVG9Eb3NXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL1RvRG9zJztcbmltcG9ydCBEaWN0aW9uYXJ5V2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0JztcbmltcG9ydCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0IGZyb20gJy4vY29tcG9uZW50cy9FeHBhbmRpbmdMaXN0RE9NV2lkZ2V0JztcbmltcG9ydCBBY3RpdmVDYXJkc1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvR3Jvd2luZ0NhcmQnO1xuaW1wb3J0IGZsYXNoY2FyZGdhbWVXaWRnZXQgZnJvbSAnLi9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQnO1xuaW1wb3J0IHNsaWRlc2hvd1dpZGdldCBmcm9tICcuL2NvbXBvbmVudHMvU2xpZGVTaG93V2lkZ2V0JztcblxuLy8gZW50cnkgcG9pbnRcbi8qKlxuICogVHlwZVNjcmlwdCBlbnRyeSBwb2ludC4gVGhpcyBzY3JpcHQgaW5pdGlhbGl6ZXMgcGFnZSBjb21wb25lbnRzIGFuZCBtb2RlbHMgYXNcbiAqICB0aGV5J3JlIG5lZWRlZCBtYWluLmluaXQoKSBpcyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgXCJ0eXBlc2NyaXB0LmpzXCIuXG4gKi9cbmNvbnN0IG1haW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwYWdlIHdpZGdldHMgYW5kIGFwcGxpY2F0aW9uIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICAvL1BFUkY6IGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAvLyBFdmVudCBmaXJlZCBiZWZvcmUgYXNzZXRzIGFyZSByZW5kZXJlZCB0byB0aGUgcGFnZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLydJbmRleCcgYW5kICdQYWdlcycgcm91dGVzLCBhZGQgY2FyZHMgd2lkZ2V0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvJyB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnJyB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMuaHRtbCcgfHxcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy5odG1sJykge1xuICAgICAgICAgICAgICAgIFJXQkNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgYW5kIGZvb3RlciBjb21wb25lbnRzXG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHBhZ2UgY29tcG9uZW50c1xuICAgICAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzL2RvbS5odG1sJyB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzL3N2Zy5odG1sJykge1xuICAgICAgICAgICAgICAgIEV4cGFuZGluZ0xpc3RET01XaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdlYklERSB3aWRnZXRcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9wYWdlcy93ZWJpZGVzLmh0bWwnKSB7XG4gICAgICAgICAgICAgICAgQWN0aXZlQ2FyZHNXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdlYklERSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9mbGFzaGNhcmRzLmh0bWwnKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hjYXJkZ2FtZVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgc2xpZGVzaG93IGNvbXBvbmVudHNcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9ndWlkZXMvcHdhaWNvbi5odG1sJyl7XG4gICAgICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIGRpY3Rpb25hcnkgd2lkZ2V0IGlmIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgICAgICBjb25zdCBkaWN0aW9uYXJ5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIERpY3Rpb25hcnlXaWRnZXQuaW5pdChkaWN0aW9uYXJ5RWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICAgICAgICAgIGNvbnN0IHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgICAgICBpZiAodG9Eb3NFbGVtZW50ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgVG9Eb3NXaWRnZXQuaW5pdCh0b0Rvc0VsZW1lbnQpO1xuXG4gICAgICAgICAgICAvL1BFUkY6IGxldCB0MiA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgLy9QRVJGOiBjb25zdCB0b3RhbHRpbWUgPSB0MiAtIHQxO1xuICAgICAgICAgICAgLy9QRVJGOiBjb25zb2xlLmxvZyhcInRoZSB0aW1lIGlzOiBcIiwgdG90YWx0aW1lKTtcbiAgICAgICAgICAgIG1haW4ubW9iaWxlQWJick1hcmt1cCgpO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICAgKiAgYWJpbGl0eSB0byBkZWZpbmUgYW4gYWJiciB0YWcsIHRoYW4gcmVseSBvbiB0aGUgdGl0bGUgYXR0cmlidXRlLlxuICAgICAqL1xuICAgIG1vYmlsZUFiYnJNYXJrdXAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzIEFiYnJPcGVue1xuICAgICAgICAgICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBhYmJyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbGFiYnJldmlhdGlvbmVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFiYnJcIik7XG4gICAgICAgIGlmKGFsbGFiYnJldmlhdGlvbmVsZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgYWJiciBvZiBhbGxhYmJyZXZpYXRpb25lbGVtcyl7XG4gICAgICAgICAgICAgICAgbGV0IGFiYnJldiA9IG5ldyBBYmJyT3BlbigpO1xuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudCA9IGFiYnI7XG5cbiAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFiYnJ0aXRsZWF0dHJ2YWw6c3RyaW5nID0gYWJicmV2LmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb246IEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT0gYWJicil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhYmJyZXYuYWJickVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIDwgMSl7IC8vY3JlYXRlIHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJicnRpdGxlYXR0cnZhbH0ke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL3Nob3cgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gYWJicmV2LmFiYnJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tYWluLmluaXQoKTsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBhcGlHRVQgaXMgZm9yIGZldGNoIHJlcXVlc3RzLiBVc2UgYW4gYXBpR0VUIG9iamVjdCB0byBtYW5pcHVsYXRlIHRoZSBmZXRjaFxuICogIHJlcXVlc3QgaW50byBlaXRoZXI6XG4gKlxuICogMS4gcmV0dXJuaW5nIGRhdGFcbiAqXG4gKiAtLW9yIC0tXG4gKlxuICogMi4gc3RvcmluZyB0aGUgcmVxdWVzdCBpbiB0aGUgYnJvd3NlciBjYWNoZSB0byByZXRyaWV2ZSBsYXRlclxuICovXG5leHBvcnQgY2xhc3MgYXBpR0VUIHtcbiAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBHRVRVUkw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGVcbiAgICovXG4gIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuR0VUVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0R0VUVVJMKCkge1xuICAgIHJldHVybiB0aGlzLkdFVFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2ggcmVxdWVzdCBjYW4gdGFrZSBVUkwgb3Igc3RyaW5nIHBhcmFtZXRlci4gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBhcGlHRVRcbiAgICogIG9iamVjdCBmb3IgYSBVUkwgZmV0Y2ggYnkgY3JlYXRpbmcgYSBVUkwgZnJvbSB0aGUgc3RyaW5nLCBvciBwYXNzaW5nIHRoZSBVUkwuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqL1xuICBwdWJsaWMgc2V0R0VUVVJMKEdFVFVSTDogVVJMIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHJlcXVlc3RlZCByZXNwb25zZSBpcyBvZiB2YWxpZCBzdGF0dXMgJ09LJyBhbmQgJzIwMCdcbiAgICogQHBhcmFtIHJlcyAtIHRoZSBmZXRjaGVkIHJlc3BvbnNlLlxuICAgKiBAcmV0dXJucyAtIHJldHVybnMgcmVzLmpzb24oKSBvbiBzdWNjZXNzIG9yIHJldHVybnMgcmVzcG9uc2Ugb24gZmFpbHVyZS5cbiAgICovXG4gIHByaXZhdGUgYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlczogUmVzcG9uc2UpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PSA0MDQpIHtcbiAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiNDA0IGZldGNoIGVycm9yIVwiO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmV0Y2ggcmVxdWVzdCwgcmV0dXJuaW5nIGEgZmV0Y2ggcHJvbWlzZS5cbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAqL1xuICBwcml2YXRlIGZldGNoRGF0YShHRVRVUkw6IFVSTCkge1xuICAgIHJldHVybiBmZXRjaChHRVRVUkwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHRoaXMuYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlc3BvbnNlKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS50ZXh0KCk7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBgJHtlLm1lc3NhZ2V9YDtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcHVibGljIGZ1bmN0aW9uIGNyZWF0aW5nIGEgZGF0YSBwcm9taXNlIG9iamVjdCBmb3IgdGhlIGNhbGxlZCBmZXRjaCBmdW5jdGlvbi4gSWZcbiAgICogIHRoZSByZXF1ZXN0IG5lZWRzIGFkZGVkIHRvIGJyb3dzZXIgc3RvcmFnZSwgdGhlIGZldGNoIGlzIG1hZGUgYW5kIHNlbnQgdG9cbiAgICogIHN0b3JhZ2UuIEEgY2xvbmVkIGNvcHkgb2YgdGhlIGZldGNoZWQgZGF0YSBpcyByZXR1cm5lZCBhbmQgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXNcbiAgICogIHNlbnQgdG8gdGhlIGNhY2hlLiBXaXRob3V0IHNlbmRpbmcgdG8gYnJvd3NlciBjYWNoZSwgdGhlIGZldGNoIGlzIHJlcXVlc3RlZCBhbmQgXG4gICAqIHJldHVybmVkLlxuICAgKiAgXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGFDYWNoZVByb21pc2U6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBhcGlHRVQoR0VUVVJMOiBVUkwpIHtcbiAgICAvL0NoZWNrIGlmIHRoZSByZXF1ZXN0IGlzIGZvciBjYWNoZSBzdG9yYWdlXG4gICAgaWYgKHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlKSB7XG4gICAgICAvL1RoZSByZXR1cm5lZCBkYXRhIGlzIHBhY2thZ2VzIGFzIGEgUHJvbWlzZSBvYmplY3RcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAvL09wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICB3aW5kb3cuY2FjaGVzLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKS50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgICAgICAgY2FjaGVzLm1hdGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vTm8gbWF0Y2hlcyBmb3IgdGhpcyByZXF1ZXN0IGluIFN0b3JhZ2UgQ2FjaGUsIHNvIGZldGNoIHRoZSByZXF1ZXN0IG5vcm1hbGx5XG4gICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgIGZldGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAvL0NvcHkgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9DYWNoZSBoaXQgc3VjY2VzcywgcmV0dXJuIHRoZSByZXNwb25zZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGUgPT4gey8vQ2Fubm90IG9wZW4gU3RvcmFnZSBDYWNoZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjUHJvYmxlbSBvcGVuaW5nIENhY2hlIFN0b3JhZ2UuIE5hbWU6ICR7dGhpcy5icm93c2VyQ2FjaGVOYW1lfWAsIFwiY29sb3I6IGdyZXlcIik7XG4gICAgICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4gey8vQXR0ZW1wdCByYXcgZmV0Y2hcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvbWlzZSBlcnJvciBvbiBkYXRhIGZldGNoLlwiKSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvL1RoZSBwcm9taXNlIGhhcyByZXNvbHZlZCAtLT4gcmV0dXJuIHRoZSBwcm9taXNlIGRhdGFcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKTtcbiAgICAgIH0pO1xuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9XG4gIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBMaW5rRGV0YWlscyBmcm9tIFwiLi9MaW5rRGV0YWlsc1wiO1xuXG4vKiogXG4gKiBVc2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxuKi9cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIExpbmtEZXRhaWxzIHtcbiAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgIGF0dHJpYnV0ZWRvd25lcjogc3RyaW5nO1xuICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgYXJ0aWNsZWlkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqTGluayB0aXRsZSAqL1xuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAvKipMaW5rIGlubmVyIHRleHQgKi9cbiAgICAgICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgICAgIC8qKiBsaW5rIGhyZWYgKi9cbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgICAgICBhdHRyaWJ1dGVkb3duZXI6IHN0cmluZyxcbiAgICAgICAgLyoqV2ViQml0cyBwYWdlICovXG4gICAgICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgICAgIGFydGljbGVpZDogbnVtYmVyXG5cbiAgICApIHtcbiAgICAgICAgc3VwZXIodGl0bGUsIGlubmVyVGV4dCwgcGFnZU5hbWUsIGhSZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZWRvd25lciA9IGF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgdGhpcy5hcnRpY2xlaWQgPSBhcnRpY2xlaWQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdHRyaWJ1dGlvbkxpbms7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBhcGlHRVQgfSBmcm9tIFwiLi4vbW9kZWxzL0FQSVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgZnJvbSBcIi4vRGljdGlvbmFyeVNlYXJjaFdpZGdldFwiO1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaCBpcyBhIHNldCBvZiBtYXJrdXAgY3JlYXRpb24gYW5kIGZ1bmN0aW9ucyB3aGljaCBhbGxvdyBhIHVzZXJcbiAqICB0byBsb29rIHVwIGEgd29yZCBsaWtlIGEgRGljdGlvbmFyeS4gV2hlbiBjYWxsZWQsIHRoZSB1c2VyJ3MgaW5wdXQgaXMgdmFsaWRhdGVkXG4gKiAgYXMgYW4gYWNjZXB0YWJsZSB3b3JkIG9yIGl0IGRlY2xpbmVzIHRoZSByZXF1ZXN0LCB0aGVuIHNob3dpbmcgdGhlIHVzZXIgaWYgdGhlIHdvcmRcbiAqICBpcyBhY2NlcHRhYmxlLlxuICpcbiAqIENyZWF0aW5nIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IHJlcXVpcmVzIHBhc3NpbmcgYSByZWZlcmVuY2UgZWxlbWVudCAoZm9yIGFcbiAqIGtub3duIHBsYWNlbWVudCBsb2NhdGlvbikgdGhhdCBjb250YWlucyB0aGUgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzLlxuICpcbiAqICAgbmV3IERpY3Rpb25hcnlTZWFyY2goZWxlbSk7XG4gKlxuICogQWxsIHRoZSBuZWVkZWQgZWxlbWVudHMgYW5kIGZ1bmN0aW9uYWxpdHkgYXJlIGFkZGVkIHRvIHRoZSBwYWdlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2ggZXh0ZW5kcyBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IHtcbiAgcHVibGljIHN0YXRpYyB3b3JkU3RvcmFnZTogbG9jYWxzdG9yYWdld29yZHZhbHVlW107XG4gIHByaXZhdGUgc3RhdGljIENhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0OiBzdHJpbmcgPSBcIlJXQl93b3JkX2ZldGNoXCI7XG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RVcmw6IHN0cmluZyA9XG4gICAgXCJodHRwczovL2FwaS5kaWN0aW9uYXJ5YXBpLmRldi9hcGkvdjIvZW50cmllcy9lbi9cIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzTm90Rm91bmRPbmNlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd29yZFVSTDogVVJMO1xuICBwcml2YXRlIHdvcmREYXRhOiBvYmplY3Q7XG4gIHByaXZhdGUgZGljdGlvbmFyeVNlYXJjaE1hcmt1cDogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYWxsIHRoZSBmdW5jdGlvbmFsaXR5IGFuZCBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAgICogIERpY3Rpb25hcnkgU2VhcmNoIHdpZGdldCBpbnRlcmZhY2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcGxhY2Ugd2lkZ2V0IG1hcmt1cC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL0ludm9rZSBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IHN1cGVyY2xhc3MgY29uc3RydWN0b3IuXG4gICAgc3VwZXIoKTtcbiAgICAvL0NhbGwgY3JlYXRpb24gZm9yIGFsbCB0aGUgbWFya3VwIG5lZWRlZCB0byBiZWdpbiB0aGUgd2lkZ2V0XG4gICAgdGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwID0gdGhpcy5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW0pO1xuICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGljdGlvbmFyeSB3aWRnZXQgd2l0aCBjbGljayBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLmFkZFdpZGdldEV2ZW50cygpO1xuICAgIERpY3Rpb25hcnlTZWFyY2guZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIExvY2FsIFN0b3JhZ2Ugd29yZHMgcHJldmlvdXNseSBzdG9yZWQgd2l0aCB0aGUgRGljdGlvbmFyeSBTZWFyY2ggV2lkZ2V0LlxuICAgKlxuICAgKiBAcmV0dXJucyBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlIC0gdGhlc2UgYXJlIHRoZSB3b3JkcyBzdG9yZWQgcHJldmlvdXNseSBpbiB0aGVcbiAgICogIGJyb3dzZXIgY2FjaGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB7XG4gICAgLy9Mb2NhbCBTdG9yYWdlICd3b3JkLWNhY2hlcycgaXRlbXMgZGF0YSBhc3NpZ25tZW50XG4gICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGxldCBzdG9yYWdlU3RyOiBzdHJpbmc7XG4gICAgdHJ5e1xuICAgICAgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgfVxuICAgIGNhdGNoIChlKXtcbiAgICAgIGlmKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pe1xuICAgICAgICBjb25zb2xlLmxvZyhgJWNDYW5ub3QgZ2V0IExvY2FsIFN0b3JhZ2UgXCJ3b3JkLWNhY2hlcy5cIlxuICAgICAgICAlYyR7ZS5uYW1lfSBcbiAgICAgICAgJHtlLm1lc3NhZ2V9IFxuICAgICAgICAlYyR7ZS5zdGFja31gLCBcImNvbG9yOiBncmV5XCIsIFwiY29sb3I6IG9yYW5nZXJlZFwiLCBcImNvbG9yOiByZWRcIik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFByb2JsZW0gZ2V0dGluZyBMb2NhbCBTdG9yYWdlIGtleTogd29yZC1jYWNoZXNgKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RvcmFnZVN0ciAhPSBudWxsICYmIHN0b3JhZ2VTdHIgIT0gXCJbXVwiKSB7XG4gICAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgIHJldHVybiBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy9UaGUgTG9jYWwgU3RvcmFnZSBpcyBudWxsIC0tPiBDb25maXJtIGhlcmUgdGhlIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBhbnkgQ2FjaGUgU3RvcmFnZSBpdGVtcyBpbiBlcnJvclxuICAgICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpe1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5jYWNoZXMuaGFzKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FjaGVzLmRlbGV0ZShEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkVVJMKCkge1xuICAgIHJldHVybiB0aGlzLndvcmRVUkw7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIGZldGNoZWQgd29yZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmREYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZERhdGE7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjbGljayBhbmQga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB3aWRnZXQuIElucHV0IGV2ZW50IGxpc3RlbmVycyAnY2xpY2snXG4gICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAqICBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQsIHRoZSB3aWRnZXQgYWRhcHRzIG1hcmt1cCBmb3IgdGhhdCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQSBzZWFyY2ggZWxlbWVudCBpcyB1bmRlZmluZWQgZnJvbSBzZWFyY2hXb3JkIHwgd29yZFNlYXJjaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgdGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLndvcmRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCBmYWxzZSwgbnVsbCk7XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJrZXlwcmVzc1wiLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cCwgZmFsc2UsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICAvL1wiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgLy9DbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPVxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGljdGlvbmFyeS1idG5zXCIpO1xuICAgICAgICBsZXQgbmV3QnV0dG9uQ29udGFpbmVyOiBFbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG5ld0J1dHRvbkNvbnRhaW5lciA9IHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICAgICAgXCJhZnRlcmVuZFwiLFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyLmlkID0gXCJkaWN0aW9uYXJ5LWJ0bnNcIjtcbiAgICAgICAgICAgIC8vQ2hlY2sgdGhlIHBsYWNlbWVudCBsb2NhdG9yIGFuZCB3b3JkIGNhY2hlcyBmb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvL0JlY2F1c2UgdGhlIGxvY2F0b3IgYW5kIHRoZSBMb2NhbCBTdG9yYWdlIHZhbHVlcyBhcmUgdmlhYmxlLCBjcmVhdGUgdGhlIG1hcmt1cFxuICAgICAgICAgICAgICAvL25lZWRlZCB0byBkaXNwbGF5IHRob3NlIHdvcmRzLiBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aWRnZXQgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgICAgZm9yIChsZXQgd29yZENhY2hlIG9mIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIgPSBuZXdCdXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZVdvcmRIZWFkaW5nRWxlbSA9XG4gICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0gPVxuICAgICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b24tY2xlYXJcIik7XG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgIFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgICAgICBcImRpY3Rpb25hcnktYnRuXCIsXG4gICAgICAgICAgICAgICAgICBcImRpY3Rpb25hcnktd29yZC1idG5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSB3b3JkQ2FjaGUud29yZDtcbiAgICAgICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgbmV3IGJ1dHRvblxuICAgICAgICAgICAgICAgIC8vd2hlbiBjbGlja2VkLCBmaXJlIGEgd29yZCBzZWFyY2hcbiAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cCwgdHJ1ZSwgd29yZENhY2hlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL01PQklMRVxuICAgICAgICAgICAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgXCJ0b3VjaHN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgIFwibW91c2VsZWF2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgIFwibW91c2VvdmVyXCIsXG4gICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgXCJtb3VzZWxlYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShcbiAgICAgICAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgXCJkaWN0aW9uYXJ5LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgXCJlcnJvci1ub3Rmb3VuZFwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgICAgICAgXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5yZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSB3b3JkIHRvIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBjb250YWluaW5nIHdvcmQgZGF0YSwgVVJMLCBhbmQgY2FjaGluZy5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXZhbHVlIC0gVGhpcyBpbnRlcmZhY2Ugc3RvcmVzIGluZm9ybWF0aW9uIHdoZXJlIHNlbmRpbmcgdG8gTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V2YWx1ZTogbG9jYWxzdG9yYWdld29yZHZhbHVlKSB7XG4gICAgbGV0IHdvcmRTdG9yZTogbG9jYWxzdG9yYWdld29yZHZhbHVlW10gPSBbXTtcbiAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICAvL0FkZCB0aGUgY2FjaGUgaXRlbSB0byBMb2NhbCBTdG9yYWdlXG4gICAgdHJ5IHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpID09IG51bGwpIHtcbiAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBKU09OLnN0cmluZ2lmeSh3b3JkU3RvcmUpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy9BZGQgd29yZCB0byBjdXJyZW50ICd3b3JkLWNhY2hlcycgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgaWYgKHN0b3JhZ2VTdHIgPT0gbnVsbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiJ3dvcmQtY2FjaGVzJyB2YWx1ZXMgYXJlIG51bGwuIFRyeSBjbGVhcmluZyBicm93c2VyIGNhY2hlLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZHZhbHVlW10gPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgICBmb3IgKGxldCBjYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgICAgIGlmIChjYWNoZS53b3JkVVJMID09IGxvY2Fsc3RvcmFnZXZhbHVlLndvcmRVUkwpIHtcbiAgICAgICAgICAgIC8vV29yZCBpcyBhbHJlYWR5IGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gYWRkIGl0IHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0FkZCB3b3JkIHRvIGV4aXN0aW5nICd3b3JkLWNhY2hlcycgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICBhbGxjYWNoZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBKU09OLnN0cmluZ2lmeShhbGxjYWNoZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgaWYoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlY0Nhbm5vdCBnZXQgTG9jYWwgU3RvcmFnZSBcIndvcmQtY2FjaGVzLlwiXG4gICAgICAgICVjJHtlLm5hbWV9IFxuICAgICAgICAke2UubWVzc2FnZX0gXG4gICAgICAgICVjJHtlLnN0YWNrfWAsIFwiY29sb3I6IGdyZXlcIiwgXCJjb2xvcjogb3JhbmdlcmVkXCIsIFwiY29sb3I6IHJlZFwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgUHJvYmxlbSBnZXR0aW5nIExvY2FsIFN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2ApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHByZXZpb3VzIHdvcmQgZGF0YSBmcm9tIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIC0tPiBLZXkvVmFsdWVcbiAgICogZGF0YSByZWZlcmVuY2luZyBpZiB3b3JkcyBhcmUgaW4gbG9jYWwgY2FjaGUuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V3b3JkIC0gc3RyaW5nIGZyb20gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCIgYnV0dG9uXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V3b3JkOiBzdHJpbmcpIHtcbiAgICAvL1JlbW92ZSB0aGUgY2FjaGUgaXRlbSB0byBMb2NhbCBTdG9yYWdlLCBDYWNoZSBTdG9yYWdlXG4gICAgdHJ5IHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpID09IG51bGwpIHtcbiAgICAgICAgLy9ObyB3b3JkcyBpbiBzdG9yYWdlLCB0aGVyZSdzIGJlZW4gYW4gZXJyb3IhXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc3RvcmVkIHdvcmRzLCByZWZyZXNoIHRoZSBwYWdlIVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy9HZXQgdGhlIHdvcmRzIGFycmF5IGZyb20gTG9jYWwgU3RvcmFnZVxuICAgICAgbGV0IHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgaWYgKHN0b3JhZ2VTdHIgPT0gbnVsbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIFwiJ3dvcmQtY2FjaGVzJyB2YWx1ZXMgYXJlIG51bGwuIFRyeSBjbGVhcmluZyBicm93c2VyIGNhY2hlLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZW1vdmVVUkw6IFVSTDtcbiAgICAgICAgZm9yIChsZXQgd29yZENhY2hlIG9mIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UpIHtcbiAgICAgICAgICBpZiAod29yZENhY2hlLndvcmQgPT0gbG9jYWxzdG9yYWdld29yZCkge1xuICAgICAgICAgICAgcmVtb3ZlVVJMID0gd29yZENhY2hlLndvcmRVUkw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2UocmVtb3ZlVVJMKTtcblxuICAgICAgICAvL1JlbW92ZSB0aGUgd29yZCBmcm9tIExvY2FsIFN0b3JhZ2Ugd29yZCBhcnJheSwgcmV0dXJuIHdvcmRzIHRvIHN0b3JhZ2VcbiAgICAgICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICAgICAgaWYgKGNhY2hlLndvcmQgPT0gbG9jYWxzdG9yYWdld29yZCkge1xuICAgICAgICAgICAgYWxsY2FjaGUuc3BsaWNlKGFsbGNhY2hlLmluZGV4T2YoY2FjaGUpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBKU09OLnN0cmluZ2lmeShhbGxjYWNoZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHJlbW92aW5nIHRoZSB3b3JkLiBFcnJvcjogXCIsIGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZldGNoIHJlcXVlc3QgZnJvbSBDYWNoZSBTdG9yYWdlLiBVdGlsaXplcyBcbiAgICogRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCBmb3IgY2FjaGUgbmFtZS5cbiAgICogQHBhcmFtIHJlbW92ZVVSTCBcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2UocmVtb3ZlVVJMOiBVUkwpIHtcbiAgICB3aW5kb3cuY2FjaGVzXG4gICAgLm9wZW4oRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdClcbiAgICAudGhlbigoY2FjaGUpID0+IHtcbiAgICAgIGNhY2hlcy5tYXRjaChyZW1vdmVVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gbWF0Y2hpbmcgdGhlIHJlc3VsdC4gUmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgY2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUocmVzdWx0KSk7XG4gICAgICAgICAgY2FjaGVQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FjaGUuZGVsZXRlKHJlbW92ZVVSTCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc3RydWN0dXJlcyB3aXRoIHdvcmQgZGVmaW5pdGlvbiByZXF1ZXN0IGFuZCBpbnN0YW50aWF0ZXMgYXBpR0VUKCkuIFRoZSBcbiAgICogcHJvbWlzZSByZXR1cm4gZGF0YSBzdHJ1Y3R1cmVzIHRoZSB3aWRnZXQgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgKiBAcGFyYW0gd29yZFVybCAtIFRoZSBmZXRjaCByZXF1ZXN0IFVSTC5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBzZW5kVG9DYWNoZSAtID8gU2VuZCBmZXRjaCByZXF1ZXN0IHRvIENhY2hlIFN0b3JhZ2UgOiBGZXRjaCB3aXRob3V0IHN0b3JpbmcgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBjYWNoZU5hbWUgLSBJZiBzZW5kaW5nIGZldGNoIHJlcXVlc3RzIHRvIGNhY2hlLCBwcm92aWRlIGEgbmFtZSB0byBzdG9yZSBpdCB1bmRlci5cbiAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgIHdvcmQ6IHN0cmluZyxcbiAgICB3b3JkVXJsOiBVUkwsXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICBzZW5kVG9DYWNoZTogYm9vbGVhbixcbiAgICBjYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgLy9BIGZ1bmN0aW9uIGNhbGwgcGFyYW1ldGVyIG9wdGlvbiBpcyB0byBzdG9yZSB0aGUgd29yZCByZXF1ZXN0IGluIGJyb3dzZXIncyBDYWNoZSBTdG9yYWdlXG4gICAgLy9TdHJ1Y3R1cmUgdGhlIHdvcmQgZGF0YSB2aWEgJ2xvY2Fsc3RvcmFnZXdvcmR2YWx1ZScgaW50ZXJmYWNlIHVzZWQgdGhyb3VnaG91dCBmZXRjaGluZ1xuICAgIGxldCB3b3JkY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZSA9IHtcbiAgICAgIGluQ2FjaGU6IHNlbmRUb0NhY2hlLFxuICAgICAgd29yZDogd29yZCxcbiAgICAgIHdvcmRVUkw6IHdvcmRVcmwsXG4gICAgICBjYWNoZU5hbWU6IHNlbmRUb0NhY2hlID8gY2FjaGVOYW1lIDogXCJcIixcbiAgICB9O1xuXG4gICAgLy9Bc3luY2hyb25vdXMgZmV0Y2ggcmVxZXVzdCBhbmQgZHluYW1pYyBtYXJrdXAgY3JlYXRpb24gZnJvbSB0aGUgZGF0YSdzIHJldHVyblxuICAgIGNvbnN0IHdvcmRGZXRjaFJlcXVlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgICAvL0NhbGwgYXBpR0VUKCkgb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICBjb25zdCB3b3JkRmV0Y2ggPSBuZXcgYXBpR0VUKFxuICAgICAgICB3b3JkY2FjaGUud29yZFVSTCxcbiAgICAgICAgd29yZGNhY2hlLmluQ2FjaGUsXG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbSxcbiAgICAgICAgd29yZGNhY2hlLmNhY2hlTmFtZVxuICAgICAgKTtcbiAgICAgIGxldCBub0RlZmluaXRpb25zOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgIC8vRmV0Y2ggcmVxdWVzdCBtZXRob2QgY2FsbC4gUmV0dXJuZWQgZGF0YSBtYXkgYmUgdGhlIHdvcmQgZGVmaW5pdGlvblxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3b3JkRmV0Y2guYXBpR0VUKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGEgc3RyaW5nLCBpdCBpcyB0aGUgd29yZCBkZWZpbml0aW9uIGRhdGEuXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfVxuICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgLy9JZiB0aGUgcmV0dXJuZWQgZGF0YSBpcyBhbiBvYmplY3QsIGNvbmZpcm0gaXQgaXMgJ25vIGRlZmluaXRpb24nIHNlcnZlciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgXCJ0aXRsZVwiKSkge1xuICAgICAgICAgIC8vTm8gZGVmaW5pdGlvbnMgd2VyZSBmb3VuZFxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIiAmJiB3b3JkY2FjaGUuaW5DYWNoZSA9PSB0cnVlKXtcbiAgICAgICAgICAgIC8vVGhlIGRhdGEgc3RyZWFtIGhlcmUgaXMgd2l0aG91dCB3b3JkIGRhdGEuIFRoaXMgZnVuY3Rpb24gYXdhaXRzIHRoZSBhcGkgZmV0Y2gncyBkYXRhXG4gICAgICAgICAgICAvL3RvIGNvbXBsZXRlIHN0b3JhZ2UvcHJvbWlzZSByZXR1cm5zLiBJdCB3YWl0cyA1IHNlY29uZHMgZm9yIHRoZSBicm93c2VyIHRvIGNvbXBsZXRlIGl0cyBzdG9yZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIC8vdGhlbiByZW1vdmVzIHRoZSB1bndhbnRlZCBjYWNoZSByZXF1ZXN0LlxuICAgICAgICAgICAgLy9UT0RPOkJVR1JFU0VBUkNIPT5EdXJpbmcgdGhlIDUgdGltZW91dCwgaWYgdGhlIHBhZ2UgcmVmcmVzaGVzIGEgJ2JhZCB3b3JkJyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgIC8vVGhpcyAnYmFkIHdvcmQnIGNhbiBiZSByZW1vdmVkIGJ5IGRlbGV0aW5nIGFsbCBwcmV2aW91cyB3b3JkcyB2aWEgVUkgYW5kIHJlZnJlc2hpbmcgdGhlIHBhZ2UuIFRoaXMgd2lsbFxuICAgICAgICAgICAgLy8gZmlyZSBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkgdG8gY2xlYXIgYW55IG1pc21hdGNoZWQgd29yZGRhdGE8LS0+Y2FjaGVkcmVxdWVzdHMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9GdW5jdGlvbiBhd2FpdGluZyByZXF1ZXN0J3MgQ2FjaGUgU3RvcmFnZSBjYWNoaW5nXG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZW1vdmUgZnJvbSBDYWNoZSBTdG9yYWdlLiBOYW1lOiBcIiwgd29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkICYmICFub0RlZmluaXRpb25zKSB7Ly9Hb29kIGRhdGEtLT4gcmV0dXJuIGRhdGEgZm9yIG1hcmt1cCByZW5kZXJcbiAgICAgICAgdGhpcy5hZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKHdvcmRjYWNoZSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSBlbHNlIHsvLydCYWQgZGF0YScgZHVlIHRvIFwiTm8gZGVmaW5pdGlvbnMgZm91bmRcIiwgaW52YWxpZCB3b3JkLCBiYWQgbmV0d29yayBjb25uZWN0aW9uXG4gICAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lICE9PSBmYWxzZSkgey8vT25saW5lLCBwcm9ibGVtIHdpdGggZmV0Y2hcbiAgICAgICAgICBpZiAobm9EZWZpbml0aW9ucykgey8vU2VydmVyIHJldHVybmVkIG5vIGRlZmluaXRpb25zIGRhdGFcbiAgICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIpXG4gICAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICB9IGVsc2Ugey8vSW52YWxpZCB3b3JkIGRhdGFcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsvL09mZmxpbmUgcmVxdWVzdFxuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgbGV0IHdvcmREYXRhID0gd29yZEZldGNoUmVxdWVzdCgpO1xuICAgIHJldHVybiB3b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gYXdhaXRzIGEgcHJvbWlzZSwgZmV0Y2hpbmcgYSBkaWN0aW9uYXJ5IHRlcm0uIFRoZSBkYXRhIFxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIHdvcmQ6IHN0cmluZyxcbiAgICB3b3JkVVJMOiBVUkxcbiAgKSB7XG4gICAgLy8gV2hlbiB0aGUgd29yZCBkYXRhIHJlc29sdmVzLCBjYWxsIG1hcmt1cCBmdW5jdGlvbnNcbiAgICBsZXQgd29yZERhdGFQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoXG4gICAgICAgIHRoaXMuZmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICAgICAgICB3b3JkLFxuICAgICAgICAgIHdvcmRVUkwsXG4gICAgICAgICAgc2VhcmNoRWxlbXMsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gICAgd29yZERhdGFQcm9taXNlLnRoZW4oKGRhdGE6IG9iamVjdCkgPT4ge1xuICAgICAgdGhpcy53b3JkRGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cChkYXRhLCBzZWFyY2hFbGVtcyk7XG4gICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgdW5uZWVkZWQgY2xhc3NlcyBpZiBhcHBsaWVkIHByZXZpb3VzbHlcbiAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICBpc0Zyb21QcmV2aW91c1dvcmRzOiBib29sZWFuLFxuICAgIGNhY2hlZFdvcmQ6IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZSB8IG51bGxcbiAgKSB7XG4gICAgaWYgKGlzRnJvbVByZXZpb3VzV29yZHMpIHtcbiAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oXG4gICAgICAgIHNlYXJjaEVsZW1zLFxuICAgICAgICBjYWNoZWRXb3JkLndvcmQsXG4gICAgICAgIGNhY2hlZFdvcmQud29yZFVSTFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGFrZSB1c2VyIGlucHV0IGFuZCBmaWx0ZXIgdG8gYW4gYWNjZXB0ZWQgc3RyaW5nXG4gICAgICBsZXQgYWNjZXB0ZWRJbnB1dFdvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSlcbiAgICAgICAgPyAoYWNjZXB0ZWRJbnB1dFdvcmQgPSB0cnVlKVxuICAgICAgICA6IChhY2NlcHRlZElucHV0V29yZCA9IGZhbHNlKTtcbiAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAvLyBDcmVhdGUgYSBVUkwgb2YgdGhlIGFjY2VwdGVkIHdvcmQgZm9yIHVzZSBpbiB0aGUgZmV0Y2ggY2FsbFxuICAgICAgICB0aGlzLndvcmRVUkwgPSBuZXcgVVJMKFxuICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLnJlcXVlc3RVcmxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICAgICAgICBzZWFyY2hFbGVtcyxcbiAgICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLFxuICAgICAgICAgIHRoaXMud29yZFVSTFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSBcIlwiOyAvLyByZXNldCBpbnB1dCBzdHJpbmdcbiAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQge1xuICAvKipcbiAgICogUHJpbWFyeSB3aWRnZXQgbWFya3VwIHN0cnVjdHVyaW5nIHRoZSB3aWRnZXQgZWxlbWVudHMgYW5kIHNlYXJjaCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgYmVmb3JlIHRoZSB3aWRnZXQuXG4gICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgKiAgaW1wb3J0YW50IEhUTUwgZWxlbWVudHMgdXNlZCB0aHJvdWdoIHdpZGdldCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICBpZiAoZWxlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJkaWN0aW9uYXJ5V2lkZ2V0XCIpKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRpY3Rpb25hcnkgIT0gbnVsbCkge1xuICAgICAgICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICAgICAgICBjb25zdCBhcnRIID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzV29yZHMgPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBSZXR1cm4gdGhlIGVsZW1lbnRzIHVzZWQgaW4gbGF0ZXIgZnVuY3Rpb25zXG4gICAgICAgICAgbGV0IHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgPSB7XG4gICAgICAgICAgICBzZWFyY2hXb3JkOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSksXG4gICAgICAgICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKSxcbiAgICAgICAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIilcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgIHByZXZpb3VzV29yZHMuY2xhc3NMaXN0LmFkZChcInByZXZpb3VzV29yZHNcIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJTZWFyY2guLi5cIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlNlYXJjaFwiKTtcbiAgICAgICAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgICAgICAgYXJ0SC50ZXh0Q29udGVudCA9IFwiRGljdGlvbmFyeSBUZXJtOlwiO1xuICAgICAgICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgICAgICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmlkID0gXCJzZWFyY2gtd29yZFwiO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guaWQgPSBcIndvcmQtc2VhcmNoXCI7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uaW5uZXJUZXh0ID0gXCJSZWZyZXNoXCI7XG5cbiAgICAgICAgICByZXR1cm4gc2VhcmNoRWxlbWVudHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtYXJrdXAgdG8gaG91c2UgcmV0dXJuZWQgd29yZHMgZnJvbSBEaWN0aW9uYXJ5U2VhcmNoLiBUaGUgbWFya3VwXG4gICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAqICBhZGFwdGl2ZSB0byByZXR1cm5lZCB3b3JkIGRhdGEgc3RydWN0dXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHdvcmREYXRhIC0gVGhpcyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IG9mIHdvcmQgdHlwZXMsIGRlZmluaXRpb25zLCBhbmQgZXhhbXBsZXMuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cChcbiAgICB3b3JkRGF0YTogYW55LFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHNcbiAgKSB7XG4gICAgaWYgKHdvcmREYXRhID09IG51bGwgfHwgISh3b3JkRGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGRlZmluaXRpb24gZm9yIHRoaXMgd29yZC5cIik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIHdvcmQncyBkZWZpbml0aW9uIHRvIHRoZSBkaWN0aW9uYXJ5IHdpZGdldFxuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lciA9XG4gICAgICBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuXG4gICAgLy8gVGhlIHdvcmQgZGF0YSByZXByZXNlbnRzIGNvbXBsZXggSlNPTiBvYmplY3RcbiAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIndvcmRcIiwgd29yZC53b3JkKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG4gICAgICApO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB3b3JkVHlwZUxpc3QgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgICAgICk7XG4gICAgICAgIHdvcmRUeXBlSC50ZXh0Q29udGVudCA9IHdvcmRUeXBlLnBhcnRPZlNwZWVjaDtcbiAgICAgICAgd29yZFR5cGUuZGVmaW5pdGlvbnMubWFwKChkZWY6IGFueSkgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9uIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICBsZXQgd29yZFR5cGVEZWZJdGVtID0gd29yZFR5cGVMaXN0LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgZGVmaW5pdGlvblAudGV4dENvbnRlbnQgPSBkZWYuZGVmaW5pdGlvbjtcbiAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIik7XG5cbiAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAobmV3UCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgIG5ld1BpLnRleHRDb250ZW50ID0gZGVmLmV4YW1wbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwiZXhhbXBsZVwiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2hlY2sgaWYga2V5IFwiZXhhbXBsZVwiIGlzIGluIGRlZmluaXRpb24uIElmIGl0IGlzLCBhZGQgdGhlIGV4YW1wbGUgdG8gbGlzdFxuICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbSA9XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICk7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwid29yZC1jbGVhclwiKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuXG4gICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRlIGJ1dHRvblxuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZpbml0aW9uRGVzY3JpcHRpb24pO1xuICB9XG59XG4iLCIvL0F1dGhvcjogUm9iZXJ0IEEgSG93ZWxsLCBBcHJpbCAyMDIzXG4vL09yaWdpbmFsIEF1dGhvcihzKTogTW96aWxsYSBDb250cmlidXRvcnMsIE1ETlxuLy9MaWNlbnNlOiBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9lbi1VUy9hYm91dC9nb3Zlcm5hbmNlL3BvbGljaWVzL3BhcnRpY2lwYXRpb24vXG4vL01ETjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2NyZWF0ZUVsZW1lbnRcbi8vU291cmNlIGRpc3RyaWJ1dGlvbjogaHR0cHM6Ly9naXRodWIuY29tL21kbi93ZWItY29tcG9uZW50cy1leGFtcGxlcy90cmVlL21haW4vZXhwYW5kaW5nLWxpc3Qtd2ViLWNvbXBvbmVudFxuXG4vLyBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlIGVsZW1lbnRcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdMaXN0RWxlbWVudCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEdldCB1bCBhbmQgbGkgZWxlbWVudHMgdGhhdCBhcmUgYSBjaGlsZCBvZiB0aGlzIGN1c3RvbSB1bCBlbGVtZW50XG4gICAgICAgIC8vIGxpIGVsZW1lbnRzIGNhbiBiZSBjb250YWluZXJzIGlmIHRoZXkgaGF2ZSB1bHMgd2l0aGluIHRoZW1cbiAgICAgICAgY29uc3QgdWxzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuICAgICAgICBjb25zdCBsaXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gSGlkZSBhbGwgY2hpbGQgdWxzXG4gICAgICAgIC8vIFRoZXNlIGxpc3RzIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgdXNlciBjbGlja3MgYSBoaWdoZXIgbGV2ZWwgY29udGFpbmVyXG4gICAgICAgIHVscy5mb3JFYWNoKHVsID0+IHtcbiAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBlYWNoIGxpIGVsZW1lbnQgaW4gdGhlIHVsXG4gICAgICAgIGxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgbGkgaGFzIGEgdWwgYXMgYSBjaGlsZCwgZGVjb3JhdGUgaXQgYW5kIGFkZCBhIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW4gYXR0cmlidXRlIHdoaWNoIGNhbiBiZSB1c2VkICBieSB0aGUgc3R5bGVcbiAgICAgICAgICAgICAgICAvLyB0byBzaG93IGFuIG9wZW4gb3IgY2xvc2VkIGljb25cbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb3NlZCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgbGkgZWxlbWVudCdzIHRleHQgaW4gYSBuZXcgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGFzc2lnbiBzdHlsZSBhbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHNwYW5cbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBsaS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDb3B5IHRleHQgZnJvbSBsaSB0byBzcGFuLCBzZXQgY3Vyc29yIHN0eWxlXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IGNoaWxkVGV4dC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjbGljayBoYW5kbGVyIHRvIHRoaXMgc3BhblxuICAgICAgICAgICAgICAgIG5ld1NwYW4ub25jbGljayA9IHRoaXMuc2hvd3VsO1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGV2ZW50LmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0dWwgPSBuZXdTcGFuLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3BhbiBhbmQgcmVtb3ZlIHRoZSBiYXJlIHRleHQgbm9kZSBmcm9tIHRoZSBsaVxuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTcGFuLCBjaGlsZFRleHQpO1xuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxpIGNsaWNrIGhhbmRsZXJcbiAgICBzaG93dWwgPSBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgIGNvbnN0IG5leHR1bCA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8vIFRoaXMgb2JqZWN0IGNyZWF0ZXMgYW4gYXJyYXkgb2YgZGl2cyBmcm9tIGlucHV0IHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAgIHB1YmxpYyBtX2ZsYXNoY2FyZHNBcnI6IEhUTUxMSUVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgbV9wb3J0SW5mb01hcDogTWFwPG51bWJlciwgc3RyaW5nPlxuXG4gICAgY29uc3RydWN0b3IocG9ydG51bWJlcnNNYXA6IE1hcDxudW1iZXIsIHN0cmluZz4pIHtcbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwID0gcG9ydG51bWJlcnNNYXA7XG4gICAgICAgIGNvbnN0IG1hcEl0ZXIgPSB0aGlzLm1fcG9ydEluZm9NYXAua2V5cygpO1xuXG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcC5mb3JFYWNoKCAocG9ydCkgPT4geyBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAgICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpXG4gICAgICAgICAgICBpbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGZsaXBmcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgZmxpcGJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBnYW1lQ2FyZFNwYW4uaW5uZXJUZXh0ID0gYFBvcnQjICR7bWFwSXRlci5uZXh0KCkudmFsdWV9YDtcbiAgICAgICAgICAgIGdhbWVDYXJkQmFja1NwYW4uaW5uZXJUZXh0ID0gYCR7cG9ydH1gO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGl2IHRvIGZsYXNoY2FyZCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5tX2ZsYXNoY2FyZHNBcnIucHVzaChmbGFzaGNhcmQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgR3Jvd2luZ0NhcmRFbGVtZW50IGV4dGVuZHMgSFRNTExJRWxlbWVudCB7XG4gICAgcHJpdmF0ZSBpc0dyb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgaGFzTGluaztcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBoYWREZXRhaWxzO1xuICAgIC8vIHByaXZhdGUgc3RhdGljIGhhc0Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmdyb3dDYXJkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNocmlua0NhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4geyAvL1RPRE86IGNoZWNrIGNsYXNzIHByb3BlcnR5XG4gICAgICAgIGlmIChsaS5zdHlsZS5zY2FsZSkge1xuICAgICAgICAgICAgbGkuc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc2V0SXNHcm93bihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNoYWRlSW5hY3RpdmVDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKEdyb3dpbmdDYXJkRWxlbWVudC5nZXRJc0F0TGVhc3RPbmVCaWcoKSkge1xuICAgICAgICAgICAgaWYgKCFsaS5nZXRJc0dyb3duKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuNVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldElzQXRMZWFzdE9uZUJpZyA9ICgpID0+IHtcbiAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjd2ViSURFQ2FyZHMgbGlgKSk7XG4gICAgICAgIGxldCBhdExlYXN0T25lSXNCaWcgPSBsaXN0TElzLnNvbWUoKGxpKSA9PiBsaS5nZXRJc0dyb3duKCkgPT0gdHJ1ZSk7XG4gICAgICAgIHJldHVybiBhdExlYXN0T25lSXNCaWc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElzR3Jvd24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc0dyb3duID0gKHRydWVmYWxzZTogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duID0gdHJ1ZWZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ3Jvd0NhcmQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3R5bGUuc2NhbGUgPSBcIjEuMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgdGhpcy5zZXRJc0dyb3duKHRydWUpO1xuXG4gICAgICAgIC8vIE5lZWQgYWxsIHRoZSBsaXN0IGVsZW1lbnRzIHRvIHJlZmVyZW5jZSB3aGljaCBvbmUgdG8gZ3Jvd1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgICAgIGxldCBsaXN0TElzID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3R5bGUuc2NhbGUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIEhUTUwgbGluayBlbGVtZW50IGRhdGEuIFVzZWQgd2l0aCBhbmNob3IgdGFncy5cbiAqL1xuY2xhc3MgTGlua0RldGFpbHMge1xuICAgIC8qKkhUTUwgdGl0bGUgYXR0cmlidXRlICovXG4gICAgdGl0bGU6IHN0cmluZztcbiAgICAvKipJbm5lciB0ZXh0IHN0cmluZyovXG4gICAgaW5uZXJUZXh0OiBzdHJpbmc7XG4gICAgLyoqVGhlIHBhZ2UgdGhlIGxpbmsgaXMgYXNzb2NpYXRlZCB0byovXG4gICAgcGFnZU5hbWU6IHN0cmluZztcbiAgICAvKipIVE1MIGhyZWYgYXR0cmlidXRlKi9cbiAgICBoUmVmZXJlbmNlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZTogc3RyaW5nLCBpbm5lclRleHQ6IHN0cmluZywgcGFnZU5hbWU6IHN0cmluZywgaFJlZmVyZW5jZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBpbm5lclRleHQsXG4gICAgICAgIHRoaXMucGFnZU5hbWUgPSBwYWdlTmFtZSxcbiAgICAgICAgdGhpcy5oUmVmZXJlbmNlID0gaFJlZmVyZW5jZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua0RldGFpbHM7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL1dlYkJpdFwiO1xuaW1wb3J0IFJXQkNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvUldCQ2FyZFwiO1xuXG5leHBvcnQgY2xhc3MgUmFuZG9tV2ViQml0cyB7XG4gICAgcHVibGljIHN0YXRpYyBidWlsZENhcmRDb250YWluaW5nU2VjdGlvbihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGRpdmlzb3Igc2VjdGlvbmFsIGVsZW1lbnRzIHRvIGFwcGVuZCB0byBtYWluXG4gICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsICYmIHBhZ2VNYWluLm5vZGVOYW1lID09PSAnTUFJTicpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjYXJkIHNlY3Rpb24gZWxlbWVudHNcbiAgICAgICAgICAgIC8vIDxzZWN0aW9uIGNsYXNzPVwiY2FyZHNcIj5cbiAgICAgICAgICAgIC8vICAgICA8aDI+QXJiaXRyYXJ5IEFydGljbGVzOjwvaDI+XG4gICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzcz1cImNhcmRfY29sdW1uc1wiPlxuXG4gICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAvLyA8L3NlY3Rpb24+XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICAgICAgICBsZXQgYWFIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhSGVhZGluZyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFDYXJkc1NlY3Rpb24pO1xuICAgICAgICAgICAgcGFnZU1haW4uYXBwZW5kKEFBU2VjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgQUFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc1wiKTtcbiAgICAgICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcmRfY29sdW1ucycpO1xuICAgICAgICAgICAgYWFIZWFkaW5nLmlubmVyVGV4dCA9IGAke25hbWV9YDtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRBcnRpY2xlQ2FyZHMoY2FyZHNEYXRhOiBXZWJCaXRbXSkge1xuICAgICAgICAvLyBJdGVyYXRlIGVhY2ggY2FyZCBpbiB0aGUgYXJyYXkuIEJ1aWxkIHRoZSBjYXJkIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgbGV0IEFBcyA9IGNhcmRzRGF0YS5tYXAoKGFydGljbGU6IFdlYkJpdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcndiY2FyZCA9IG5ldyBSV0JDYXJkKCk7XG4gICAgICAgICAgICByZXR1cm4gcndiY2FyZC5idWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZSk7O1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gQUFzO1xuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0RWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdldG9kb2NhY2hlIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5cbi8qKlxuICogQSBUb0RvTGlzdCBpcyBhbiBIVE1MIHdpZGdldCB0byBzdG9yZSBUby1Eb3MgaW4gdGhlIGJyb3dzZXIuIEluc3RhbnRpYXRlIHRoZVxuICogIFRvRG9MaXN0IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSB3aWRnZXQgbWFya3VwIGFuZCBmdW5jdGlvbmFsaXR5LiBUby1Eb3MgYXJlXG4gKiAgc3RvcmVkIGluIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBhbmQgcmVhZCBhbmQgcmVuZGVyZWQgd2hlbiB0aGUgcGFnZSBsb2Fkcy5cbiAqIFxuICogVG8gY3JlYXRlIGEgVG9Eb0xpc3QsIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2UgbXVzdCBoYXZlICcuVG9Eb0xpc3QnIGNsYXNzLiBDYWxsIHRoZVxuICogIGNsYXNzIGNvbnN0cnVjdG9yLCBwYXNzaW5nIGluIHRoYXQgZWxlbWVudCB0byBjcmVhdGUgdGhlIHdpZGdldC5cbiAqXG4gKiAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG4gKiAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICogXG4gKiBUaGVuLCB0aGUgd2lkZ2V0IGlzIGNyZWF0ZWQgYW5kIFRvLURvcyBhcmUgcmV0cmlldmVkIGZyb20gc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvRG9MaXN0IHtcbiAgICBwdWJsaWMgc3RhdGljIHRvZG9zSW5Mb2NhbFN0b3JhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcbiAgICBwcml2YXRlIGxpc3RFbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAgICogXG4gICAgICogICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHNcbiAgICAgKiBAcGFyYW0gVG9Eb0VsZW1lbnRzIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9Eb0xpc3RFbGVtZW50cyhUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMpIHtcbiAgICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJhbmRvbSBXZWIgQml0cyB1c2VzIG11bHRpcGxlIGxvY2F0aW9ucyB0byBhcHBseSB0aGUgVG8tRG8gTGlzdCB3aWRnZXQuIENyZWF0ZVxuICAgICAqICB0aGUgbGlzdCBtYXJrdXAsIHBhc3NpbmcgaW4gYSByZWZlcmVuY2UgZWxlbWVudCBmb3IgcGxhY2VtZW50IG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgLy9JbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgICAgIC8vU3dpdGNoIGFnYWluc3QgdGhlIGN1cnJlbnQgcGFnZSB0byBkZXRlcm1pbmUgbWFya3VwIG5lZWRlZFxuICAgICAgICBpZiAoZWxlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvZGlzdC9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTWFya3VwIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0YWJsZSBlbGVtZW50cyBuZWVkZWQgZm9yIHRoZSB0b2RvIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhsZWZ0ID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGZvb3QgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQzbGVmdCA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM0lOID0gdGQzbGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IElOUFVUID0gdGQzbWlkZGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcIlZhbHVlXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhsZWZ0LnRleHRDb250ZW50ID0gXCJDb21wbGV0ZT9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4uaWQgPSBcIkFkZEJ1dHRvblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTWFya3VwIGV4aXN0cyBvbiB0aGUgcGFnZSBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0Ym9keSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19EbyhodGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ1RvRG9JdGVtcycgZWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSBpcyBubyBcIlRvRG9MaXN0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0LlxuICAgICAqIEByZXR1cm5zIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VG9Eb0xpc3RFbGVtZW50cygpIHtcbiAgICAgICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgICAgIC8vRWFjaCB3aWRnZXQgbG9jYXRpb24ncyBlbGVtZW50cyBtYXkgdmFyeSwgc28gYSBjYWxsIG9mIGdldFRvRG9MaXN0RWxlbWVudHMoKVxuICAgICAgICAvL2xvY2F0ZXMgdGhlIHBhZ2UncyBlbGVtZW50cyB0byBwb3B1bGF0ZSB0aGUgVG9Eb0VsZW1lbnRzIGludGVyZmFjZS5cbiAgICAgICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGFibGUnKSxcbiAgICAgICAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb0RvSXRlbXMnKSxcbiAgICAgICAgICAgIGFkZEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpLFxuICAgICAgICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RFbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIFRvLURvIGl0ZW1zIGZyb20gTG9jYWwgU3RvcmFnZS5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpc1RvRG9JblN0b3JhZ2UoKSB7XG4gICAgICAgIGxldCB0b2RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW11cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICBpZihlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjQ2Fubm90IGdldCBMb2NhbCBTdG9yYWdlIFwiVG9Eb3MuXCJcbiAgICAgICAgICAgICAgJWMke2UubmFtZX0gXG4gICAgICAgICAgICAgICR7ZS5tZXNzYWdlfSBcbiAgICAgICAgICAgICAgJWMke2Uuc3RhY2t9YCwgXCJjb2xvcjogZ3JleVwiLCBcImNvbG9yOiBvcmFuZ2VyZWRcIiwgXCJjb2xvcjogcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByb2JsZW0gZ2V0dGluZyBMb2NhbCBTdG9yYWdlIGtleTogVG9Eb3NgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodG9kb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBUby1EbyB0byBMb2NhbCBTdG9yYWdlLiBcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBUaGUgVUkgZm9ybSBpbnB1dCBkZXNjcmlwdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgICAgICAvL0FkZCB0aGUgVG9Eb3MgYXJyYXkgdG8gbG9jYWwgY2FjaGUuXG4gICAgICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V0b2RvY2FjaGUnIGludGVyZmFjZSBzdHJ1Y3R1cmVzIHRoZSBkYXRhIGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgVG9Eb3M6IGFueSA9IFtdOyAvL1RvRG8gYXJyYXlcbiAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcblxuICAgICAgICAvL0ZpcnN0LCByZWFkIGN1cnJlbnQgTG9jYWwgU3RvcmFnZSBUb0Rvc1xuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodG9kb3MgPT0gbnVsbCkgey8vTm90aGluZyBpbiBzdG9yYWdlLCBwdXNoIGN1cnJlbnRcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeShUb0RvcykpO1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LnRvZG9zSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7Ly9BZGQgdGhlIG5ldyBUb0RvIHRvIHRoZSBjdXJyZW50IFRvRG9zIGFuZCBwdXNoIHZpYSBzZXRJdGVtKClcbiAgICAgICAgICAgICAgICB0b2Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIHN0b3JpbmcgVG8tZG8gbGlzdCBpdGVtOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIGlmKGVyciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUsIGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIFRvLURvIGl0ZW0gZnJvbSBMb2NhbCBTdG9yYWdlLiBUaGUgcmVxdWVzdGVkIFRvLURvIHRvIHJlbW92ZSBpc1xuICAgICAqICBwdWxsZWQgaW5kaXZpZHVhbGx5IGZyb20gdGhlIGtleS12YWx1ZSBwYWlyIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gaXRlbSAtIHRoZSBUby1EbyBpdGVtIHJlcXVlc3RlZCB0byByZW1vdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZXRvRG9Gcm9tU3RvcmFnZShpdGVtOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFUb0RvTGlzdC5pc1RvRG9JblN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbCBzdG9yYWdlIHZhbHVlcyBudWxsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0b2RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgICAgIHRvZG9zID0gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRvZG9pdGVtICE9PSBpdGVtKTtcbiAgICAgICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgdG8gYWRkIGEgcm93IHRvIHRoZSBUby1EbyB0YWJsZS5cbiAgICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIGZpcnN0UGFpbnQgLSBCb29sZWFuIHZhbHVlIHVzZWQgYnkgYWRkaW5nIGxpc3Qgc3RvcmFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IFRBQkxFSVRFTSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGlmIChUQUJMRUlURU0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Q09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIGZpcnN0IGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQk9YID0gZmlyc3RDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7IC8vQWRkIGNoZWNrYm94XG4gICAgICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgdGhpcmQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZGVsQk9YID0gc2Vjb25kQ09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpIC8vQWRkIGRlbGV0ZWJveFxuXG4gICAgICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0NoZWNrYm94Jyk7XG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgICAgICBuZXdJVEVNLnNldEF0dHJpYnV0ZSgnbnVtJywgVG9Eb0xpc3QuVG9ET3MgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGRbbnVtXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9MaXN0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSkoKSA6ICgxKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIG5ld0lURU0udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjsgLy9Qb3B1bGF0ZSBzZWNvbmQgY29sXG4gICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICAgICAgZGVsQk9YLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0RlbGV0ZScpO1xuXG4gICAgICAgICAgICAvL0FkZCB0aGUgcm93IHRvIHRoZSBUb0RvcyB0YWJsZVxuICAgICAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG5cbiAgICAgICAgICAgIC8vQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB3aGVuICdkZWxldGUnIGlzIGNsaWNrZWRcbiAgICAgICAgICAgIGRlbEJPWC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpOyB9KTtcblxuICAgICAgICAgICAgaWYgKGZpcnN0UGFpbnQpIHtcbiAgICAgICAgICAgICAgICAvL0FkZCB0byBsaXN0IHN0b3JhZ2VcbiAgICAgICAgICAgICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSB3ZXJlIG5vICdUb0RvSXRlbXMnIGZvdW5kIG9yIHRoZXkgYXJlIG51bGwuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIHRoZSBUby1EbyBpdGVtIHJvd3MgZnJvbSBUby1Eb3Mgc3RvcmVkIGluIHRoZSBicm93c2VyIExvY2FsIFN0b3JhZ2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZVRvRG9MaXN0KCkge1xuICAgICAgICAvL1JldHJpZXZlIHRvZG8gaXRlbXMgaW4gTG9jYWwgU3RvcmFnZSBhbmQgYWRkIGVhY2ggdG8gdGhlIGxpc3RcbiAgICAgICAgbGV0IHBhcnNlZFRvRG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXVxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBwYXJzZWRUb0RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGlmKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pe1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNDYW5ub3QgZ2V0IExvY2FsIFN0b3JhZ2UgXCJUb0Rvcy5cIlxuICAgICAgICAgICAgICAlYyR7ZS5uYW1lfSBcbiAgICAgICAgICAgICAgJHtlLm1lc3NhZ2V9IFxuICAgICAgICAgICAgICAlYyR7ZS5zdGFja31gLCBcImNvbG9yOiBncmV5XCIsIFwiY29sb3I6IG9yYW5nZXJlZFwiLCBcImNvbG9yOiByZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJvYmxlbSBnZXR0aW5nIExvY2FsIFN0b3JhZ2Uga2V5OiBUb0Rvc2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlZFRvRG9zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2VkVG9Eb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3cocGFyc2VkVG9Eb3NbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYnV0dG9uIGZ1bmN0aW9uYWxpdHk6IERlbGV0ZSwgQWRkLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBBRERCVVRUT04gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkQnV0dG9uO1xuICAgICAgICBjb25zdCBBRERJVEVNRU5URVIgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkSXRlbVRvRW50ZXI7XG4gICAgICAgIGlmIChBRERCVVRUT04gIT0gbnVsbCAmJiBBRERJVEVNRU5URVIgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmdW5jdGlvbiBkZXRlcm1pbmluZyB0aGUgZGVsZXRlIGJ1dHRvbi4gSXRlbXMgYXJlIGRlbGV0ZWQgd2hlbiBwdXNoZWQsIGJ1dCBhcmVcbiAgICAgKiAgbm90IHJlbW92ZWQgZnJvbSBzdG9yYWdlIHdpdGhvdXQgJ0NvbXBsZXRlPycgY2hlY2tlYm94IGNoZWNrZWQuXG4gICAgICogQHBhcmFtIGJveCBjaGVja2JveCBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBEZWxldGVCdXR0b24oYm94OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlmIChib3gucGFyZW50Tm9kZSAhPSBudWxsICYmIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZyAhPSBudWxsICYmXG4gICAgICAgICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nICE9IG51bGwpIHtcblxuICAgICAgICAgICAgbGV0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PmJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICBsZXQgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b2RvVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICAgICAgaWYgKHRvZG9UYWJsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gJ0FkZCBhIFRvRE8gSXRlbS4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBhc3NvY2lhdGVkIHN0b3JhZ2UgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YWJsZScgZWxlbWVudCBub3QgZm91bmQgb3IgaXQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIHNlZWQgdGhlIFRvLURvIExpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gTG9jYWwgU3RvcmFnZSBpdGVtc1xuICAgICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gdGJvZHkgdGFibGUgYm9keSBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgICAgICBpZiAoIVRvRG9MaXN0LmlzVG9Eb0luU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSBlbnRyeSBpbiB0aGUgVG9EbyB0YWJsZSBhcyBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDaGVja2JveFwiKTtcbiAgICAgICAgICAgIHRkMm1pZGRsZS5zZXRBdHRyaWJ1dGUoXCJudW1cIiwgYCR7MX1gKTtcbiAgICAgICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJlc2V0XCIpO1xuICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgICAgIHRkMm1pZGRsZS50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG9ETyBJdGVtLlwiO1xuICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKztcblxuICAgICAgICAgICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICB0ZDJERUwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5EZWxldGVCdXR0b24odGQyREVMKSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG4vKipcbiAqIFRoaXMgY2xhc3MgaG9sZHMgdGhlIGRhdGEgZm9yICdXZWJCaXQnIGFydGljbGUgY2FyZHMuIEtleSBpbmZvcm1hdGlvblxuICogb2YgdGhlIGFydGljbGUncyBjb250ZW50cyBhcmUgY29udGFpbmVkOiBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0YSBjcmVhdGVkLFxuICogZXRjLlxuICovXG5jbGFzcyBXZWJCaXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGRhdGVDcmVhdGVkOiBEYXRlO1xuICAgIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlQUxUOiBzdHJpbmc7XG4gICAgbGlua0F0dHJpYnV0aW9uOiBBdHRyaWJ1dGlvbkxpbms7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlQUxUOiBzdHJpbmcsXG4gICAgICAgIGxpbmtBdHRyaWJ1dGlvbj86IEF0dHJpYnV0aW9uTGluayxcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFQ7XG4gICAgICAgIHRoaXMubGlua0F0dHJpYnV0aW9uID0gbGlua0F0dHJpYnV0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0OyJdfQ==

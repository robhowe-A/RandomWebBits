(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ToDos_1 = require("./ToDos");
const DictionaryWidget_1 = require("./DictionaryWidget");
const ScriptPerf_1 = require("../models/ScriptPerf");
const ClassComponents = {
    init: () => {
        const classperf = new ScriptPerf_1.default("Classcomponents"); //begin performance measure
        // Add dictionary widget if an element with that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement != null) {
            DictionaryWidget_1.default.init(dictionaryElement);
        }
        // Add ToDos widget if an element with that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            ToDos_1.default.init(toDosElement);
        classperf.end(); //end performance measure
    }
};
exports.default = ClassComponents;

},{"../models/ScriptPerf":25,"./DictionaryWidget":2,"./ToDos":10}],2:[function(require,module,exports){
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

},{"../models/DictionarySearch":18}],3:[function(require,module,exports){
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

},{"../models/ExpandingList":20}],4:[function(require,module,exports){
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
            [587, "SMTPS STARTTLS"],
            [636, "LDAP SSL"],
            [990, "FTPS"],
            [993, "IMAP TLS"],
            [995, "POP TLS"],
            [1812, "RADIUS  /TCP/UDP"],
            [1813, "RADIUS  /TCP/UDP"],
            [3269, "Microsoft Global Catalog"],
            [3389, "RDP"],
        ]);
        // Establish which port numbers to test and the definition
        const methoddefinitions = new Map([
            ["charAt()", "Returns a new string of the character at a given index."]
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

},{"../models/FlashcardCardElems":21}],5:[function(require,module,exports){
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

},{"../models/GrowingCard":22}],6:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const LinkDetails_1 = require("../models/LinkDetails");
const ScriptPerf_1 = require("../models/ScriptPerf");
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
            const headerperf = new ScriptPerf_1.default("Header");
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
                siteHeader.childNodes[0].appendChild(HeaderFooter.headerWidget.buildNavigation());
            }
            catch (e) {
                console.log("Cannot prepend navigation items.", e);
            }
            headerperf.end();
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
            const siteHeaderContainer = document.createElement('div');
            siteHeaderContainer.classList.add("width-max-center");
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>';
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
                //if (window.location.host == 'robhowe-a.github.io') {
                //link data edit for dev environment
                //navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                //} else {
                //link data in other environments
                navListLinks.setAttribute('href', `/${item.hReference}`);
                //}
                navListLinks.setAttribute("title", item.title);
            });
            return headerNavFrag;
        }
    },
    footerWidget: {
        init: () => {
            const footerperf = new ScriptPerf_1.default("Footer");
            // Add footer element to the page end
            let footer = HeaderFooter.footerWidget.buildFooter();
            document.body.append(footer);
            footer.childNodes[0].appendChild(HeaderFooter.footerWidget.buildFaviconAttribution(footer));
            footerperf.end();
        },
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const siteFooterContainer = document.createElement("div");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022 Random Web Bits. All Rights Reserved.`;
            siteFooterContainer.append(footerPara);
            siteFooter.append(siteFooterContainer);
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
            footer.childNodes[0].appendChild(footerIconPara);
            return footerIconPara;
        }
    }
};
exports.default = HeaderFooter;

},{"../models/LinkDetails":23,"../models/ScriptPerf":25}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ExpandingListDOMWidget_1 = require("./ExpandingListDOMWidget");
const GrowingCard_1 = require("./GrowingCard");
const FlashcardGameWidget_1 = require("./FlashcardGameWidget");
const SlideShowWidget_1 = require("./SlideShowWidget");
const cssex_1 = require("./cssex");
const colorcode_1 = require("./colorcode");
const WebBits_1 = require("./WebBits");
const ScriptPerf_1 = require("../models/ScriptPerf");
const PageComponents = {
    init: () => {
        const pageperf = new ScriptPerf_1.default("Pagecomponents"); //measure performance
        PageComponents.CheckPage();
        pageperf.end(); //end performance measure
    },
    CheckPage: () => {
        switch (window.location.pathname) {
            //'Index' and 'Pages' routes, add cards widget
            case '/RandomWebBits/index.html':
            case '/index.html':
            case '/':
            case '':
            case '/RandomWebBits/pages.html':
            case '/pages.html':
                WebBits_1.default.init(); // cards widget initialization
            // dom.html page uses expandingLists component
            case '/pages/dom.html':
            case '/pages/svg.html':
                ExpandingListDOMWidget_1.default.init();
                break;
            // Initialize webIDE widget
            case '/pages/webides.html':
                GrowingCard_1.default.init();
                break;
            // Initialize slideshow components
            case '/guides/pwaicon.html':
                SlideShowWidget_1.default.init();
                break;
            // Initialize CSSEX components
            case '/pages/css.html':
                cssex_1.default.CSSEXColorCode();
                break;
            // Initialize htmlexColorCode components
            case '/pages/html.html':
                colorcode_1.default.HTMLEXColorCode();
                break;
            // Initialize flashcard components
            case '/flashcards.html':
                FlashcardGameWidget_1.default.init();
                break;
        }
    }
};
exports.default = PageComponents;

},{"../models/ScriptPerf":25,"./ExpandingListDOMWidget":3,"./FlashcardGameWidget":4,"./GrowingCard":5,"./SlideShowWidget":9,"./WebBits":11,"./colorcode":12,"./cssex":13}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../models/ToDo":26}],11:[function(require,module,exports){
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

},{"../lib/data":14,"../models/RandomWebBits":24}],12:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const htmlexColorCode = {
    HTMLEXColorCode: () => {
        const openers = document.querySelectorAll(".Tagopen");
        const closers = document.querySelectorAll(".Tagclose");
        const values = document.querySelectorAll(".TextVal");
        const attributes = document.querySelectorAll(".Attribute");
        const resetBTN = document.querySelector(".reset");
        htmlexColorCode.CSSExampleHighlighting(openers, "var(--clr-WhoIS_Orange)");
        htmlexColorCode.CSSExampleHighlighting(closers, "var(--clr-Red)");
        htmlexColorCode.CSSExampleHighlighting(values, "var(--clr-DarkCyan)");
        htmlexColorCode.CSSExampleHighlighting(attributes, "var(--clr-Green)");
        //function to reset the css code properties color to original
        resetBTN.addEventListener("click", () => {
            openers.forEach((selector) => {
                selector.style.color = "initial";
            });
            closers.forEach((attribute) => {
                attribute.style.color = "initial";
            });
            values.forEach((value) => {
                value.style.color = "initial";
            });
            attributes.forEach((psuedo) => {
                psuedo.style.color = "initial";
            });
        });
    },
    /**
     * Function to color the example area's elements using css
     */
    CSSExampleHighlighting: (items, color) => {
        items.forEach((item) => {
            item.addEventListener("mouseover", (event) => {
                event.preventDefault();
                items.forEach((item) => {
                    item.style.color = color;
                });
            });
            item.addEventListener("click", (event) => {
                event.preventDefault();
                items.forEach((item) => {
                    item.style.color = "initial";
                });
            });
        });
    }
};
exports.default = htmlexColorCode;

},{}],13:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const cssex = {
    /**
     * Cssex is a widget in CSS page, applying style colors to elements of different
     * types (based on the CSS programming language)
     */
    CSSEXColorCode: () => {
        const selectors = document.querySelectorAll(".Selector");
        const attributes = document.querySelectorAll(".Attribute");
        const values = document.querySelectorAll(".Value");
        const psuedos = document.querySelectorAll(".Psuedo-class");
        const resetBTN = document.querySelector(".reset");
        cssex.CSSExampleHighlighting(selectors, "var(--clr-Red)");
        cssex.CSSExampleHighlighting(attributes, "var(--clr-WhoIS_Orange)");
        cssex.CSSExampleHighlighting(values, "var(--clr-Skyblue)");
        cssex.CSSExampleHighlighting(psuedos, "var(--clr-Green)");
        //function to reset the css code properties color to original
        resetBTN.addEventListener("click", () => {
            selectors.forEach((selector) => {
                selector.style.color = "initial";
            });
            attributes.forEach((attribute) => {
                attribute.style.color = "initial";
            });
            values.forEach((value) => {
                value.style.color = "initial";
            });
            psuedos.forEach((psuedo) => {
                psuedo.style.color = "initial";
            });
        });
    },
    // 
    /**
     * Function to color the example area's elements using css
     * @param elems - Node list of HTMLElelements from query.SelectorAll()
     * @param color - String of CSS color value
     */
    CSSExampleHighlighting: (elems, color) => {
        elems.forEach((elem) => {
            elem.addEventListener("mouseover", (event) => {
                event.preventDefault();
                elems.forEach((elem) => {
                    elem.style.color = color;
                });
            });
            elem.addEventListener("click", (event) => {
                event.preventDefault();
                elems.forEach((elem) => {
                    elem.style.color = "initial";
                });
            });
        });
    }
};
exports.default = cssex;

},{}],14:[function(require,module,exports){
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
const ArbitraryArticles = new Array(new WebBit_1.default("Domainlookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new WebBit_1.default("Htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2)), new WebBit_1.default("Httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new WebBit_1.default("Webtech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("Jsonobject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("Chatgpt", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new WebBit_1.default("Paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new WebBit_1.default("Boinc", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new WebBit_1.default("IPAddress", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new WebBit_1.default("HTMLMarkup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new WebBit_1.default("Networkspeed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new WebBit_1.default("PowerShelldrives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new WebBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new WebBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon", new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new WebBit_1.default("Webide", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new WebBit_1.default("Javascript", 26, "JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new WebBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new AttributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new WebBit_1.default("CSSdef", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new AttributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new WebBit_1.default("Latency", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new AttributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)), new WebBit_1.default("HTMLdef", 33, "Create HTML elements", "Learn the parts and syntax of an HTML element", new Date(2023, 7, 25), "pages/html.html", "img/html.webp", "HTML element syntax icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "Create HTML elements", 33)));
/**
 * "Guide Shorts' section card data."
 */
const GuideShorts = new Array(new WebBit_1.default("Searchverticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon", new AttributionLink_1.default("content writing icons", "Content writing icons created by Vectors Tank - Flaticon", "https://www.flaticon.com/free-icons/content-writing", "Flaticon", "Search Verticals", 14)), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "SMTP and Email", 16)), new WebBit_1.default("Devtools", 19, "GUIDE: Dev Application", "Review dev tool's application tab", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Dev Application", 19)), new WebBit_1.default("Devtoolstwo", 21, "GUIDE: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Inspect Pages", 21)), new WebBit_1.default("PWAIcon", 27, "GUIDE: Install the PWA applications", "Progressive websites have an installation option", new Date(2023, 5, 27), "guides/pwaicon.html", "img/app-development.webp", "App development icon", new AttributionLink_1.default("development icons", "Development icons created by Design Circle - Flaticon", "https://www.flaticon.com/free-icons/development", "Flaticon", "JavaScript", 27)), new WebBit_1.default("Clearcookies", 30, "GUIDE: Clear cookies quickly", "Don't waste time sifting through settings", new Date(2023, 7, 2), "guides/clearcookiesquickly.html", "img/cookies.webp", "Browser cookie icon", new AttributionLink_1.default("cookie icons", "Cookie icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/cookie", "Flaticon", "GUIDE: Clear cookies quickly", 30)));
/**
 * "Explore section card data."
 */
const Explore = new Array(new WebBit_1.default("Nasa", 3, "EXPLORE: NASA Pages", "Explore the NASA domain. Learn about the universe via NASA links", new Date(2022, 12, 18), "explore/nasa.html", "img/NASA.webp", "NASA Artemis Logo", new AttributionLink_1.default("NASA", "Image source via the National Aeronautics and Space Administration", "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html", "NASA", "NASA Pages", 3)), new WebBit_1.default("Virtualtour", 18, "EXPLORE: Virtual Tours", "Explore the real world in a web browser", new Date(2023, 3, 23), "explore/virtualtour.html", "img/google-expeditions.webp", "Google Expeditions logo from FLATICON", new AttributionLink_1.default("google expeditions icons", "Google expeditions icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/google-expeditions", "Flaticon", "Virtual Tour", 18)), new WebBit_1.default("Webb", 31, "James Webb Space Telescope", "", new Date(2023, 7, 3), "explore/webbtelescope.html", "img/JWST_poster.webp", "James Webb space telescope poster image", new AttributionLink_1.default("Hexagon Litho (2018)", "James Webb Space Telescope icon provided by nasa.gov", "https://jwst.nasa.gov/content/features/educational/print.html", "jwst.nasa.gov", "James Webb Space Telescope icon", 31)));
/**
 * Multidimensional array. Rows are the different sections. Columns
 * contain each article's data belonging in that section.
 */
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore];
exports.default = WEBBITDATA;

},{"../models/AttributionLink":17,"../models/WebBit":27}],15:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const HeaderFooter_1 = require("./components/HeaderFooter");
const PageComponents_1 = require("./components/PageComponents");
const ClassComponents_1 = require("./components/ClassComponents");
const ScriptPerf_1 = require("./models/ScriptPerf");
const mainperf = new ScriptPerf_1.default("main");
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
        // Event fired before assets are rendered to the page
        window.addEventListener("DOMContentLoaded", () => {
            // Add header and footer components
            HeaderFooter_1.default.headerWidget.init();
            HeaderFooter_1.default.footerWidget.init();
            // Initialize page components
            PageComponents_1.default.init();
            // Initialize element components
            ClassComponents_1.default.init();
            // <abbr></abbr> styles: implemented for mobile devices
            main.mobileAbbrMarkup();
            mainperf.end();
        });
    },
    /**
     * Attribute tags on mobile do not have hover option. This function adds a click
     *  ability to define an abbr tag, than rely on the title attribute.
     */
    mobileAbbrMarkup() {
        const mobileabbrperf = new ScriptPerf_1.default("Mobileabbrperf"); //start performance measure
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
        mobileabbrperf.end(); //end performance measure
    }
};
main.init();

},{"./components/ClassComponents":1,"./components/HeaderFooter":6,"./components/PageComponents":7,"./models/ScriptPerf":25}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./LinkDetails":23}],18:[function(require,module,exports){
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

},{"../models/API":16,"./DictionarySearchWidget":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"../components/RWBCard":8}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Create this object to record performance start and end marks. */
class ScriptPerf {
    scriptruntimemarks = {
        name: null,
        startMark: null,
        endMark: null
    };
    /** Instantiating a ScriptPerf records the performance start mark. Call SriptPerf.end()
     * to set the end time stamp.
    */
    constructor(scriptname) {
        this.scriptruntimemarks.name = scriptname;
        this.scriptruntimemarks.startMark = performance.mark(`${this.scriptruntimemarks.name}-start`);
    }
    end() {
        this.scriptruntimemarks.endMark = performance.mark(`${this.scriptruntimemarks.name}-end`);
        this.measure();
    }
    /** A console output of this object's performance measurement. */
    measure() {
        let measure = performance.measure(this.scriptruntimemarks.name, this.scriptruntimemarks.startMark.name, this.scriptruntimemarks.endMark.name);
        return console.log(`${this.scriptruntimemarks.name} execution time is: ${measure.duration}`);
    }
}
exports.default = ScriptPerf;

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zLnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2xpYi9kYXRhLnRzIiwic3JjL21haW4udHMiLCJzcmMvbW9kZWxzL0FQSS50cyIsInNyYy9tb2RlbHMvQXR0cmlidXRpb25MaW5rLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LnRzIiwic3JjL21vZGVscy9FeHBhbmRpbmdMaXN0LnRzIiwic3JjL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMudHMiLCJzcmMvbW9kZWxzL0dyb3dpbmdDYXJkLnRzIiwic3JjL21vZGVscy9MaW5rRGV0YWlscy50cyIsInNyYy9tb2RlbHMvUmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvU2NyaXB0UGVyZi50cyIsInNyYy9tb2RlbHMvVG9Eby50cyIsInNyYy9tb2RlbHMvV2ViQml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFB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QUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBUb0Rvc1dpZGdldCBmcm9tICcuL1RvRG9zJztcbmltcG9ydCBEaWN0aW9uYXJ5V2lkZ2V0IGZyb20gJy4vRGljdGlvbmFyeVdpZGdldCc7XG5pbXBvcnQgU2NyaXB0UGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbmNvbnN0IENsYXNzQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzcGVyZiA9IG5ldyBTY3JpcHRQZXJmKFwiQ2xhc3Njb21wb25lbnRzXCIpOyAvL2JlZ2luIHBlcmZvcm1hbmNlIG1lYXN1cmVcblxuICAgICAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuICAgICAgICBpZiAoZGljdGlvbmFyeUVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgRGljdGlvbmFyeVdpZGdldC5pbml0KGRpY3Rpb25hcnlFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGNvbnN0IHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgIGlmICh0b0Rvc0VsZW1lbnQgIT0gbnVsbClcbiAgICAgICAgICAgIFRvRG9zV2lkZ2V0LmluaXQodG9Eb3NFbGVtZW50KTtcbiAgICAgICAgXG4gICAgICAgIGNsYXNzcGVyZi5lbmQoKTsgLy9lbmQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENsYXNzQ29tcG9uZW50czsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2ggfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlTZWFyY2hcIlxuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBEaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gY3JlYXRlcyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCBieSBjYWxsaW5nIHRoZVxuICAgICAqICBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoZWxlbTogRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBEaWN0aW9uYXJ5U2VhcmNoIGNvbnN0cnVjdG9yXG4gICAgICAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlXaWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBFeHBhbmRpbmdMaXN0RWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvRXhwYW5kaW5nTGlzdFwiO1xuXG5jb25zdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdEVsZW1lbnQsIHsgZXh0ZW5kczogJ3VsJyB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIFwiRE9NXCIgcGFnZSBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIEFkZCBhIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGktc3BhbiB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlPcGVuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpmaXJzdC1jaGlsZGApO1xuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlDbG9zZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46bnRoLWNoaWxkKDMpYCk7XG5cbiAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlcyBmb3IgZXhwYW5kaW5nLWVsZW1lbnQgZXhwYW5kYWJsZSBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaU9wZW5PcGVuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJ1xuICAgICAgICAgICAgICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG9mIGNsb3Npbmcgc3BhbiBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaUNsb3NlU3Bhbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nTGlzdERPTVdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBGbGFzaGNhcmRDYXJkRWxlbXMgZnJvbSAnLi4vbW9kZWxzL0ZsYXNoY2FyZENhcmRFbGVtcydcblxuY29uc3QgZmxhc2hjYXJkZ2FtZVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIEVzdGFibGlzaCB3aGljaCBwb3J0IG51bWJlcnMgdG8gdGVzdCBhbmQgdGhlIGRlZmluaXRpb25cbiAgICAgICAgY29uc3QgcG9ydGRlZmluaXRpb25zID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgICAgICAgICAgWzIyLCBcIlNlY3VyZSBTU0ggIC9UQ1BcIl0sXG4gICAgICAgICAgICBbMjMsIFwiVGVsbmV0ICh1bnNlY3VyZSlcIl0sXG4gICAgICAgICAgICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICAgICAgICAgIFs0OSwgXCJUQUNBQ1MrXCJdLFxuICAgICAgICAgICAgWzUzLCBcIkROUyAgL1VEUC9UQ1BcIl0sXG4gICAgICAgICAgICBbNjcsIFwiREhDUFwiXSxcbiAgICAgICAgICAgIFs2OCwgXCJESENQXCJdLFxuICAgICAgICAgICAgWzgwLCBcIkhUVFAgIC9UQ1BcIl0sXG4gICAgICAgICAgICBbODgsIFwiS2VyYmVyb3Mtc2VjICAvVENQL1VEUFwiXSxcbiAgICAgICAgICAgIFsxMTAsIFwiUE9QIC0gOTk1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICAgICAgICAgICAgWzEzNSwgXCJSUENcIl0sXG4gICAgICAgICAgICBbMTM3LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTM4LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTM5LCBcIk5FVEJJT1NcIl0sXG4gICAgICAgICAgICBbMTQzLCBcIklNQVAgLSA5OTMgZm9yIGVuY3J5cHRlZFwiXSxcbiAgICAgICAgICAgIFsxNjEsIFwiU05NUCAgTWFuYWdlclwiXSxcbiAgICAgICAgICAgIFsxNjIsIFwiU05NUCAgQWdlbnRcIl0sXG4gICAgICAgICAgICBbMzg5LCBcIkxEQVAgLSA2MzYgZm9yIHNlY3VyZVwiXSxcbiAgICAgICAgICAgIFs0NDMsIFwiSFRUUFMgIC9UQ1BcIl0sXG4gICAgICAgICAgICBbNDQ1LCBcIlNNQiAgL1RDUFwiXSxcbiAgICAgICAgICAgIFs0NjUsIFwiU01UUCBieSBUTFNcIl0sXG4gICAgICAgICAgICBbNTE0LCBcIlNZU0xPRyAgL1VEUFwiXSxcbiAgICAgICAgICAgIFs1ODcsIFwiU01UUFMgU1RBUlRUTFNcIl0sXG4gICAgICAgICAgICBbNjM2LCBcIkxEQVAgU1NMXCJdLFxuICAgICAgICAgICAgWzk5MCwgXCJGVFBTXCJdLFxuICAgICAgICAgICAgWzk5MywgXCJJTUFQIFRMU1wiXSxcbiAgICAgICAgICAgIFs5OTUsIFwiUE9QIFRMU1wiXSxcbiAgICAgICAgICAgIFsxODEyLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgICAgICAgICBbMTgxMywgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgICAgICAgICAgWzMyNjksIFwiTWljcm9zb2Z0IEdsb2JhbCBDYXRhbG9nXCJdLFxuICAgICAgICAgICAgWzMzODksIFwiUkRQXCJdLFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBFc3RhYmxpc2ggd2hpY2ggcG9ydCBudW1iZXJzIHRvIHRlc3QgYW5kIHRoZSBkZWZpbml0aW9uXG4gICAgICAgIGNvbnN0IG1ldGhvZGRlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oW1xuICAgICAgICAgICAgW1wiY2hhckF0KClcIiwgXCJSZXR1cm5zIGEgbmV3IHN0cmluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGEgZ2l2ZW4gaW5kZXguXCJdXG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gQ3JlYXRlIGZsYXNoY2FyZCBlbGVtZW50c1xuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZERpdnMgPSBuZXcgRmxhc2hjYXJkQ2FyZEVsZW1zKHBvcnRkZWZpbml0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgdGhlIGdhbWUncyB0aXRsZSBlbGVtZW50XG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkUGFnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZsYXNoQ2FyZHNcIik7XG4gICAgICAgIGNvbnN0IGdhbWV0aXRsZUVsZW0gPSBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgICAgICBnYW1ldGl0bGVFbGVtLmlubmVyVGV4dCA9IFwiQ29tcHV0aW5nIFBvcnQgTnVtYmVyc1wiXG5cbiAgICAgICAgLy8gQWRkIHRoZSBmbGFzaGNhcmRzIHRvIHBhZ2VcbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBtYWluRmxhc2hDYXJkRGl2cy5tX2ZsYXNoY2FyZHNBcnIpe1xuICAgICAgICAgICAgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXNoY2FyZGdhbWVXaWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBHcm93aW5nQ2FyZEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3dpbmdDYXJkXCJcblxuY29uc3QgQWN0aXZlQ2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dyb3dpbmctY2FyZCcsIEdyb3dpbmdDYXJkRWxlbWVudCwgeyBleHRlbmRzOiAnbGknIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgfHwgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRGV0YWlsc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGxpc3QgaXRlbXMgKGNhcmRzKVxuICAgICAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpKTtcblxuICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnQgdG8gcmVzaXplIHRoZSBjYXJkcyBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGEgY2FyZFxuICAgICAgICAgICAgLy8gV2hlbiBjbGlja2luZyBvdXRzaWRlIGEgY2FyZCwgcmVzaXplIGFsbCBjYXJkcyB0byBub3JtYWxcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wSXRlbTogR3Jvd2luZ0NhcmRFbGVtZW50ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCh0ZW1wSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXNoYWRlIGFsbCBjYXJkcyBiZWNhdXNlIG5vbmUgb2YgdGhlbSBhcmUgYmlnXG4gICAgICAgICAgICBmb3IgKGxldCBsaSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKGxpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlQ2FyZHNXaWRnZXQ7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4uL21vZGVscy9MaW5rRGV0YWlscyc7XG5pbXBvcnQgU2NyaXB0UGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbi8qKlxuICogSGVhZGVyIG5hdmlnYXRpb24gbGluayBkYXRhXG4gKi9cbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pO1xuXG5jb25zdCBnYW1lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG4vKiogTmF2aWdhdGlvbiBsaW5rcyAqL1xuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGluaywgZ2FtZU5hdkxpbmtdO1xuXG4vKipcbiAqIFdpZGdldCB0byBhZGQgc2l0ZSBoZWFkZXIgYW5kIGZvb3Rlci4gSW5zdGFudGlhdGVkIGluICdNYWluJyBzY3JpcHQuXG4gKi9cbmNvbnN0IEhlYWRlckZvb3RlciA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpdGUgaGVhZGVyIGNvbnRhaW5pbmcgbmF2aWdhdGlvbiBsaW5rcyBhbmQgc2l0ZSBsb2dvLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVycGVyZiA9IG5ldyBTY3JpcHRQZXJmKFwiSGVhZGVyXCIpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICAvKiogSGVhZGVyIGVsZW1lbnQgY29udGFpbmVyICovXG4gICAgICAgICAgICBsZXQgc2l0ZUhlYWRlcjogRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgZWxlbWVudCB0byB0aGUgcGFnZVxuICAgICAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwpIHsvLyAnTWFpbicgZWxlbWVudCBleGlzdHMsIGFkZCB0aGUgaGVhZGVyIHRvIGl0XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBiZWZvcmUgJ21haW4nIGVsZW1lbnQuYG5cIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vICdNYWluJyBlbGVtZW50IGRvZXMgbm90IGV4aXN0LCBhZGQgdGhlIGhlYWRlciB0byB0aGUgYm9keVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGFmdGVyICdib2R5JyBlbGVtZW50LmBuXCIsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9BcHBlbmQgbmF2aWdhdGlvbiBpdGVtcyB0byBoZWFkZXJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2Fubm90IHByZXBlbmQgbmF2aWdhdGlvbiBpdGVtcy5cIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGhlYWRlcnBlcmYuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgaGVhZGVyIHdpdGggc2l0ZSBsb2dvIGFwcGVuZGVkLlxuICAgICAgICAgKiBAcGFyYW0gbWFpbiBIVE1MICdtYWluJyBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm5zIFBvcHVsYXRlZCBoZWFkZXIgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYnVpbGRIZWFkZXI6ICgpID0+IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQmFzaWMgSFRNTCBoZWFkZXIgZWxlbWVudCBjb250YWluaW5nIGxvZ28gKEgxKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBzaXRlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgICAgICBjb25zdCBzaXRlSGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzaXRlSGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aWR0aC1tYXgtY2VudGVyXCIpO1xuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICAgICAgICBIMS50ZXh0Q29udGVudCA9ICc8UmFuZG9tIFdlYiBCaXRzPic7XG4gICAgICAgICAgICBIMS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIlJhbmRvbVdlYkJpdHNcIik7XG4gICAgICAgICAgICBzaXRlSGVhZGVyQ29udGFpbmVyLmFwcGVuZChIMSk7XG4gICAgICAgICAgICBzaXRlSGVhZGVyLmFwcGVuZChzaXRlSGVhZGVyQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVIZWFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIGhlYWRlciBuYXZpZ2F0aW9uIGJhc2VkIG9uIG5hdmlnYXRpb24gZGF0YVxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5hdmlnYXRpb24gZWxlbWVudHNcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdkZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpKTtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIG5hdiBkYXRhIHRvIG5hdiBlbGVtZW50c1xuICAgICAgICAgICAgTkFWSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgIG5hdkxpc3RJdGVtcy5wcmVwZW5kKG5hdkxpc3RMaW5rcyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTmF2LmFwcGVuZChuYXZMaXN0SXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIG5hdmlnYXRpb24gYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnRleHRDb250ZW50ID0gYCR7aXRlbS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgICAgICAvLyBFbnZpcm9ubWVudCBsaW5rcyBlZGl0LCByZXF1aXJpbmcgZGlmZmVyZW50IGxpbmsgcmVsYXRpdmVzIHRvIG9wZXJhdGVcbiAgICAgICAgICAgICAgICAvLyBHaXRodWIgcGFnZXMgb3BlcmF0ZXMgZnJvbSByZXBvc2l0b3J5LCBub3QgJy8nXG4gICAgICAgICAgICAgICAgLy9pZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT0gJ3JvYmhvd2UtYS5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGVkaXQgZm9yIGRldiBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgICAgICAvL25hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgL1JhbmRvbVdlYkJpdHMvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2xpbmsgZGF0YSBpbiBvdGhlciBlbnZpcm9ubWVudHNcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJwZXJmID0gbmV3IFNjcmlwdFBlcmYoXCJGb290ZXJcIik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBmb290ZXIgZWxlbWVudCB0byB0aGUgcGFnZSBlbmRcbiAgICAgICAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICAgICAgICAgIGZvb3Rlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG5cbiAgICAgICAgICAgIGZvb3RlcnBlcmYuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjIgUmFuZG9tIFdlYiBCaXRzLiBBbGwgUmlnaHRzIFJlc2VydmVkLmA7XG5cbiAgICAgICAgICAgIHNpdGVGb290ZXJDb250YWluZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgc2l0ZUZvb3Rlci5hcHBlbmQoc2l0ZUZvb3RlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlRm9vdGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZhdmljb25BdHRyaWJ1dGlvbjogKGZvb3RlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEZhdmljb24gYXR0cmlidXRpb24gc2VjdGlvbiArIGxpbmsgdG8gc291cmNlXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkljb25Ib21lOiAjNDUwMjY3NTVcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9ICdodHRwczovL3d3dy52ZWN0b3JzdG9jay5jb20vcm95YWx0eS1mcmVlLXZlY3Rvci9tYWludGVuYW5jZS1pY29uLWZvci1ncmFwaGljLWFuZC13ZWItZGVzaWduLXZlY3Rvci00NTAyNjc1NSdcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gJ1ZlY3RvclN0b2NrLmNvbSc7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBhdHRyaWJ1dGlvbiB0byBmb290ZXIgcGFyYVxuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEuYXBwZW5kQ2hpbGQoZm9vdGVySWNvbkxpbmspO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckZvb3RlcjsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0IGZyb20gJy4vRXhwYW5kaW5nTGlzdERPTVdpZGdldCc7XG5pbXBvcnQgQWN0aXZlQ2FyZHNXaWRnZXQgZnJvbSAnLi9Hcm93aW5nQ2FyZCc7XG5pbXBvcnQgZmxhc2hjYXJkZ2FtZVdpZGdldCBmcm9tICcuL0ZsYXNoY2FyZEdhbWVXaWRnZXQnO1xuaW1wb3J0IHNsaWRlc2hvd1dpZGdldCBmcm9tICcuL1NsaWRlU2hvd1dpZGdldCc7XG5pbXBvcnQgY3NzZXggZnJvbSAnLi9jc3NleCc7XG5pbXBvcnQgaHRtbGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RlJztcbmltcG9ydCBSV0JDYXJkc1dpZGdldCBmcm9tICcuL1dlYkJpdHMnO1xuaW1wb3J0IFNjcmlwdFBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnO1xuXG5jb25zdCBQYWdlQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2VwZXJmID0gbmV3IFNjcmlwdFBlcmYoXCJQYWdlY29tcG9uZW50c1wiKTsgLy9tZWFzdXJlIHBlcmZvcm1hbmNlXG5cbiAgICAgICAgUGFnZUNvbXBvbmVudHMuQ2hlY2tQYWdlKCk7XG4gICAgICAgIHBhZ2VwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfSxcbiAgICBDaGVja1BhZ2U6ICgpID0+IHtcbiAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZXMsIGFkZCBjYXJkcyB3aWRnZXRcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMuaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMuaHRtbCc6XG4gICAgICAgICAgICAgICAgUldCQ2FyZHNXaWRnZXQuaW5pdCgpOyAvLyBjYXJkcyB3aWRnZXQgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2RvbS5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9zdmcuaHRtbCc6XG4gICAgICAgICAgICAgICAgRXhwYW5kaW5nTGlzdERPTVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdlYklERSB3aWRnZXRcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy93ZWJpZGVzLmh0bWwnOlxuICAgICAgICAgICAgICAgIEFjdGl2ZUNhcmRzV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgc2xpZGVzaG93IGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9ndWlkZXMvcHdhaWNvbi5odG1sJzpcbiAgICAgICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBDU1NFWCBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvY3NzLmh0bWwnOlxuICAgICAgICAgICAgICAgIGNzc2V4LkNTU0VYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGh0bWxleENvbG9yQ29kZSBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvaHRtbC5odG1sJzpcbiAgICAgICAgICAgICAgICBodG1sZXhDb2xvckNvZGUuSFRNTEVYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGZsYXNoY2FyZCBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvZmxhc2hjYXJkcy5odG1sJzpcbiAgICAgICAgICAgICAgICBmbGFzaGNhcmRnYW1lV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZUNvbXBvbmVudHM7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgeyBSV0JDYXJkRWxlbWVudHMgfSBmcm9tIFwiLi4vbW9kZWxzL1dpZGdldE1hcmt1cEVsZW1lbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCQ2FyZCB7XG4gICAgLyoqXG4gICAgICogQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJ3YmNhcmRlbGVtZW50czogUldCQ2FyZEVsZW1lbnRzO1xuICAgIC8qKlxuICAgICAqICBNYXAgV2ViQml0IGRhdGEgdG8gYSBjYXJkIGVhY2hcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgKiAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQm9keVwiPlxuICAgICAqICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgIDxwPjwvcD5cbiAgICAgKiAgICAgICAgICA8YSBocmVmPVwiXCI+PC9hPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogIDwvZGl2PlxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZTogV2ViQml0KSB7XG4gICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMgPSB7XG4gICAgICAgICAgICBjYXJkSW1nOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGNhcmRJbWdUb3A6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgY2FyZEJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGxldCBjYXJkQm9keVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGxldCBjYXJkQm9keUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5SGVhZGluZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5UGFyYSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgV2ViQml0LmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgV2ViQml0LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2FydGljbGUuaWR9YCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiLCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBhcnRpY2xlLmNhcmRJbWFnZSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhcnRpY2xlLmNhcmRJbWFnZUFMVCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdBcnRpY2xlJywgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgICAgICBjYXJkQm9keUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYXJ0aWNsZS5hcnRpY2xlTGluaylcbiAgICAgICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcbiAgICAgICAgY2FyZEJvZHlQYXJhLnRleHRDb250ZW50ID0gYXJ0aWNsZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgY2FyZEJvZHlMaW5rLnRleHRDb250ZW50ID0gXCJHbyB0byBQYWdlXCI7XG5cbiAgICAgICAgLy8gSW1hZ2UgYXR0cmlidXRpb24gbWF5IGJlIG5lZWRlZCBmb3IgdGhlIGltYWdlIHVzZWRcbiAgICAgICAgLy8gQXR0cmlidXRpb24gZGF0YSBpcyBpbXBvcnRlZCBhcyAnYXR0cmxpbmtzJyBzaWduYXR1cmUgcGFyYW1ldGVyXG4gICAgICAgIGlmIChhcnRpY2xlLmxpbmtBdHRyaWJ1dGlvbil7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwodGhpcy5yd2JjYXJkZWxlbWVudHMsIGFydGljbGUubGlua0F0dHJpYnV0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgICAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wKTtcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5KTtcblxuICAgICAgICByZXR1cm4gV2ViQml0O1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAgICogb3RoZXJ3aXNlIHRoZSBkYXRhIGlzbid0IGVudGVyZWQsIGNhdXNpbmcgYSBtaXNzXG4gICAgICogXG4gICAgICogIDxkaXYgY2xhc3M9XCJmbGlwLWNhcmRcIj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAqICA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkRnJvbnRcIj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJhY2tcIj5cbiAgICAgKiAgICAgICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCIgY2xhc3M9XCJpbWdTbWFsbCBpbWdQVFJcIj5cbiAgICAgKiAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogQHBhcmFtIHJ3YmNhcmRlbGVtZW50cyBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqIEBwYXJhbSBsaW5rIEF0dHJpYnV0aW9uIGxpbmtcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwocndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHMsIGxpbms6IEF0dHJpYnV0aW9uTGluaykge1xuICAgICAgICBpZiAocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT09IGxpbmsuYXJ0aWNsZWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbWFnZSBiYWNrIHBhbmVsIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgICAgIC8vIFJlZGVmaW5lIGNhcmQgaW1hZ2UgcGFuZWwgYXMgYSBmbGlwIHBhbmVsXG4gICAgICAgICAgICBjb25zdCBjYXJkSW5uZXIgPSByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udCA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChyd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7IC8vIG1vdmUgaW1hZ2Ugd2l0aGluIGNhcmQgZnJvbnQgZGl2aXNvclxuICAgICAgICAgICAgbGV0IHNtYWxsSW1nID0gPEhUTUxJbWFnZUVsZW1lbnQ+cndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgYmFja0hlYWRpbmcgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgY2FyZEJhY2suYXBwZW5kQ2hpbGQoc21hbGxJbWcpO1xuICAgICAgICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVMaW5rID0gcndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTsgLy9hcHBlbmQgdG8gZnJvbnQgcGFuZWxcblxuICAgICAgICAgICAgLy8gQWRkIGZsaXAtcGFuZWwgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIilcbiAgICAgICAgICAgIGNhcmRJbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIik7XG4gICAgICAgICAgICBjYXJkRnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgICAgICAgIHNtYWxsSW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdTbWFsbFwiLCBcImltZ1BUUlwiKTtcbiAgICAgICAgICAgIGNhcmRCYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuY2xhc3NMaXN0LmFkZChcImF0dHJpYnV0ZVwiKTtcbiAgICAgICAgICAgIGJhY2tIZWFkaW5nLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbi8vIEF0dHJpYnV0aW9uOiBSb2JlcnQgQSBIb3dlbGwsIE1heSAyMDIzXG4vLyBDb250ZW50IGRlcml2ZWQgZnJvbTogVzNTY2hvb2xzLCBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2hvd3RvL2hvd3RvX2pzX3NsaWRlc2hvdy5hc3BcblxuXG4vKipcbiAqIENvbXBvbmVudCBjcmVhdGluZyBzbGlkZXNob3cgd2lkZ2V0c1xuICovXG5jb25zdCBzbGlkZXNob3dXaWRnZXQgPSB7XG4gICAgc2xpZGVJbmRleDogMSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc2xpZGVzaG93IGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCk7XG4gICAgICAgIFxuICAgICAgICAvLyBOZXh0L3ByZXZpb3VzIGNvbnRyb2xzXG4gICAgICAgIGZ1bmN0aW9uIHBsdXNTbGlkZXMobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ICs9IG4pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBUaHVtYm5haWwgaW1hZ2UgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gY3VycmVudFNsaWRlKG46bnVtYmVyKSB7XG4gICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IG4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGFuZ2UgdG8gbmV4dCBzbGlkZSB3aGVuIGFycm93IGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93UHJldmlvdXNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd1ByZXZcIik7XG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd05leHRCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd05leHRcIik7XG4gICAgICAgIGZvciAobGV0IGJ0biBvZiBzbGlkZVNob3dQcmV2aW91c0J0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoLTEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd05leHRCdG5zKXtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBzZWxlY3RlZCBzbGlkZSB3aGVuIGRvdCBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dEb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcbiAgICAgICAgbGV0IGRvdENvdW50ZXIgPSAxO1xuICAgICAgICBmb3IobGV0IGRvdCBvZiBzbGlkZVNob3dEb3RzKXtcbiAgICAgICAgICAgIC8vYWRkIGRvdCBjb3VudGVyXG4gICAgICAgICAgICBkb3Quc2V0QXR0cmlidXRlKFwiZG90aW5kZXhcIiwgYCR7ZG90Q291bnRlcn1gKVxuICAgICAgICAgICAgLy93aGVuIGNsaWNrZWQsIG5hdmlnYXRlIHRvIHRoZSBzbGlkZSBpbmRpY2F0ZWRcbiAgICAgICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKGRvdENvdW50ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb3RDb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZG90Q291bnRlciA9IDE7XG4gICAgfSxcbiAgICBzaG93U2xpZGVzOiAobjogbnVtYmVyKT0+e1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBsZXQgc2xpZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm15U2xpZGVzXCIpO1xuICAgICAgICAgICAgbGV0IGRvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICAgICAgaWYgKG4gPiBzbGlkZXMubGVuZ3RoKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSAxfVxuICAgICAgICAgICAgaWYgKG4gPCAxKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSBzbGlkZXMubGVuZ3RofVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wU2xpZGUgPSA8SFRNTERpdkVsZW1lbnQ+c2xpZGVzW2ldO1xuICAgICAgICAgICAgICAgIHRlbXBTbGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9IGRvdHNbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXVxuICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb3RzW3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4IC0gMV0uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlc2hvd1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3QgfSBmcm9tIFwiLi4vbW9kZWxzL1RvRG9cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgVG8tRG8gTGlzdCB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgVG9Eb3NXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVG8tRG8gTGlzdCB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ1RvRG9MaXN0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6IChlbGVtOiBFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgLy9Ub0RvTGlzdCBjb25zdHJ1Y3RvclxuICAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG5cbiAgICAgICAgLy9DcmVhdGVzIHdpZGdldCBtYXJrdXAgYW5kIHBvcHVsYXRlcyBUby1EbyB0YXNrcyBjb250YWluZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9zV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi4vbGliL2RhdGFcIlxuaW1wb3J0IHsgUmFuZG9tV2ViQml0cyB9IGZyb20gXCIuLi9tb2RlbHMvUmFuZG9tV2ViQml0c1wiXG5cbi8qKlxuICogQ2FyZCB3aWRnZXQgdG8gaW5pdGlhbGl6ZSBhcnRpY2xlIGRhdGEgaW50byBIVE1MIGNhcmQgZWxlbWVudHMuIFRoaXMgd2lkZ2V0IFxuICogY3JlYXRlcyBtdWx0aXBsZSBzZWN0aW9ucyBvZiBjYXJkcyB0byBhZGQgdG8gYSBwYWdlLlxuICovXG5jb25zdCBSV0JDYXJkc1dpZGdldCA9IHtcbiAgICAvKiogQ2FyZHMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gYnJlYWtzIGRvd24gdGhlIGRhdGEgc3RydWN0dXJlIGluIFxuICAgICAqIG9yZGVyIHRvIGZvcm11bGF0ZSB0aGUgYXJ0aWNsZSBkZXRhaWxzIGludG8gb25lIGNhcmQgZm9yIGVhY2ggYXJ0aWNsZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEFydGljbGVzIGhhdmUgZGlmZmVyZW50IGNhdGVnb3JpZXMsIHNvIGVhY2ggY2F0ZWdvcnkgbXVzdCBiZSByZXNwZWN0ZWQuIFxuICAgICAqICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICAvKiogTXVsdGlwbGUgY2F0ZWdvcmllcyBvZiBjYXJkIGRhdGEgZXhpc3QuIFRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBuZWVkZWQgXG4gICAgICAgICAqIHRvIGNyZWF0ZSBjYXRlZ29yeSBzZWN0aW9ucyBkaXZpc2lvbnMgd2hlbiBwbGFjZWQgb24gYSBwYWdlLlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiRXhsb3JlIHRoZSBXZWI6XCIpLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjYXJkIGRhdGEgKyBhdHRyaWJ1dGlvbiBsaW5rIGRhdGFcbiAgICAgICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMsIG9yIGFydGljbGVzLCBHdWlkZXMsIGFuZCBFeHBsb3Jlc1xuICAgICAgICAvKipUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgb2YgY2FyZCBlbGVtZW50cy4gRWFjaCBpbmRleCBzdG9yZXMgdGhlIGNhcmRzJyBkYXRhXG4gICAgICAgICAqIGZvciBvbmUgY2F0ZWdvcnkgb2YgYXJ0aWNsZXMuICovIFxuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICBdO1xuXG4gICAgICAgIFxuICAgICAgICAvLyBSb3V0ZXMgLT4gQWRkIHdpZGdldCBhbmQgZm9ybWF0IHBhZ2VzXG4gICAgICAgIC8vIEluZGV4IChIb21lKSBwYWdlIHNob3J0ZW5zIGVhY2ggc2VjdGlvbiB0byAzIGFydGljbGVzIG9ubHlcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Rpc3QvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgICAgICAvKiogUmFuZG9taXplIHRoZSBvcmRlciBvZiBjYXJkcy4gKi9cbiAgICAgICAgICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFycjogYW55LCBudW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJhbmRvbWl6ZSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZCA9IFsuLi5hcnJdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2h1ZmZsZWQuc2xpY2UoMCwgbnVtKTsgLy8gcmV0dXJuIHRoZSByZXF1ZXN0ZWQgbnVtYmVyIG9mIGVsZW1lbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzBdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1swXSwgNSk7XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzFdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1sxXSwgMyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGNhcmRzIHRvIHRoZSBwYWdlIGJ5IGRlY29uc3RydWN0aW9uIGFuZCBhZGRpdGlvblxuICAgICAgICAvLyBPdXRlciBsb29wOiBpdGVyYXRlIHRoZSBkYXRhIHRvIGVhY2ggcmVzcGVjdGl2ZSBjYXRlZ29yeTogUGFnZXMsIEd1aWRlcywgRXhwbG9yZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYXJkc1NlY3Rpb25baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5uZXIgbG9vcDogaXRlcmF0ZSB0aHJvdWdoIHRoZSBjYXRlZ29yeSBkYXRhXG4gICAgICAgICAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJXQkNhcmRzV2lkZ2V0IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IGh0bWxleENvbG9yQ29kZSA9IHtcbiAgICBIVE1MRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnb3BlblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgY2xvc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnY2xvc2VcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGV4dFZhbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCByZXNldEJUTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG5cbiAgICAgICAgXG4gICAgICAgIGh0bWxleENvbG9yQ29kZS5DU1NFeGFtcGxlSGlnaGxpZ2h0aW5nKG9wZW5lcnMsIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIik7XG4gICAgICAgIGh0bWxleENvbG9yQ29kZS5DU1NFeGFtcGxlSGlnaGxpZ2h0aW5nKGNsb3NlcnMsIFwidmFyKC0tY2xyLVJlZClcIik7XG4gICAgICAgIGh0bWxleENvbG9yQ29kZS5DU1NFeGFtcGxlSGlnaGxpZ2h0aW5nKHZhbHVlcywgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIpO1xuICAgICAgICBodG1sZXhDb2xvckNvZGUuQ1NTRXhhbXBsZUhpZ2hsaWdodGluZyhhdHRyaWJ1dGVzLCBcInZhcigtLWNsci1HcmVlbilcIik7XG5cbiAgICAgICAgLy9mdW5jdGlvbiB0byByZXNldCB0aGUgY3NzIGNvZGUgcHJvcGVydGllcyBjb2xvciB0byBvcmlnaW5hbFxuICAgICAgICByZXNldEJUTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIG9wZW5lcnMuZm9yRWFjaCgoc2VsZWN0b3IpPT57XG4gICAgICAgICAgICAgICAgc2VsZWN0b3Iuc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2xvc2Vycy5mb3JFYWNoKChhdHRyaWJ1dGUpPT57XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSk9PntcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goKHBzdWVkbyk9PntcbiAgICAgICAgICAgICAgICBwc3VlZG8uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29sb3IgdGhlIGV4YW1wbGUgYXJlYSdzIGVsZW1lbnRzIHVzaW5nIGNzc1xuICAgICAqL1xuICAgIENTU0V4YW1wbGVIaWdobGlnaHRpbmc6IChpdGVtczogIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+LCBjb2xvcjogc3RyaW5nKSA9PntcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGh0bWxleENvbG9yQ29kZTtcblxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IGNzc2V4ID0ge1xuICAgIC8qKlxuICAgICAqIENzc2V4IGlzIGEgd2lkZ2V0IGluIENTUyBwYWdlLCBhcHBseWluZyBzdHlsZSBjb2xvcnMgdG8gZWxlbWVudHMgb2YgZGlmZmVyZW50XG4gICAgICogdHlwZXMgKGJhc2VkIG9uIHRoZSBDU1MgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UpXG4gICAgICovXG4gICAgQ1NTRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5TZWxlY3RvclwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlZhbHVlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBwc3VlZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5Qc3VlZG8tY2xhc3NcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHJlc2V0QlROID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbiAgICAgICAgXG4gICAgICAgIGNzc2V4LkNTU0V4YW1wbGVIaWdobGlnaHRpbmcoc2VsZWN0b3JzLCBcInZhcigtLWNsci1SZWQpXCIpO1xuICAgICAgICBjc3NleC5DU1NFeGFtcGxlSGlnaGxpZ2h0aW5nKGF0dHJpYnV0ZXMsIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIik7XG4gICAgICAgIGNzc2V4LkNTU0V4YW1wbGVIaWdobGlnaHRpbmcodmFsdWVzLCBcInZhcigtLWNsci1Ta3libHVlKVwiKTtcbiAgICAgICAgY3NzZXguQ1NTRXhhbXBsZUhpZ2hsaWdodGluZyhwc3VlZG9zLCBcInZhcigtLWNsci1HcmVlbilcIik7XG4gICAgICAgIFxuICAgICAgICAvL2Z1bmN0aW9uIHRvIHJlc2V0IHRoZSBjc3MgY29kZSBwcm9wZXJ0aWVzIGNvbG9yIHRvIG9yaWdpbmFsXG4gICAgICAgIHJlc2V0QlROLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgc2VsZWN0b3JzLmZvckVhY2goKHNlbGVjdG9yKT0+e1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKT0+e1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpPT57XG4gICAgICAgICAgICAgICAgdmFsdWUuc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHN1ZWRvcy5mb3JFYWNoKChwc3VlZG8pPT57XG4gICAgICAgICAgICAgICAgcHN1ZWRvLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIC8vIFxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbG9yIHRoZSBleGFtcGxlIGFyZWEncyBlbGVtZW50cyB1c2luZyBjc3NcbiAgICAgKiBAcGFyYW0gZWxlbXMgLSBOb2RlIGxpc3Qgb2YgSFRNTEVsZWxlbWVudHMgZnJvbSBxdWVyeS5TZWxlY3RvckFsbCgpXG4gICAgICogQHBhcmFtIGNvbG9yIC0gU3RyaW5nIG9mIENTUyBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIENTU0V4YW1wbGVIaWdobGlnaHRpbmc6IChlbGVtczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sIGNvbG9yOiBzdHJpbmcpID0+IHtcblxuICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3NzZXg7IiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIlxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vbW9kZWxzL0F0dHJpYnV0aW9uTGlua1wiO1xuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuLyoqXG4gKiBcIkFyYml0cmFyeSBBcnRpY2xlcycgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEb21haW5sb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRvbWFpbiBpY29uc1wiLFxuICAgICAgICAgICAgXCJEb21haW4gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG9tYWluXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIdG1scmVzcG9uc2VzXCIsXG4gICAgICAgIDIsXG4gICAgICAgIFwiSFRNTCBGcmFtZXNcIixcbiAgICAgICAgXCJWaWV3IEhUTUwgcGFnZSByZXNwb25zZSBzdGF0dXMgaW5mb3JtYXRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDExKSxcbiAgICAgICAgXCJwYWdlcy9odG1scmVzcG9uc2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSFRNTF9GcmFtZXMud2VicFwiLFxuICAgICAgICBcIkhUTUwgZnJhbWVzIGV4YW1wbGVcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29kZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvZGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICAgICAgMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0dHBzY2VydFwiLFxuICAgICAgICA0LFxuICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgIFwiU2VsZWN0IHRvIHZpZXcgYSB3ZWJzaXRlJ3MgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDI2KSxcbiAgICAgICAgXCJwYWdlcy9odHRwcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0dHBzX2NlcnQud2VicFwiLFxuICAgICAgICBcIkN1cnNvciBzZWxlY3RpbmcgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic3NsIGNlcnRpZmljYXRlIGljb25zXCIsXG4gICAgICAgICAgICBcIlNzbCBjZXJ0aWZpY2F0ZSBpY29ucyBjcmVhdGVkIGJ5IGluaXBhZ2lzdHVkaW8gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zc2wtY2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIDRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJ0ZWNoXCIsXG4gICAgICAgIDUsXG4gICAgICAgIFwiV2FwcGFseXplclwiLFxuICAgICAgICBcIldhcHBhbHl6ZXIgYnJvd3NlciBleHRlbnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMiksXG4gICAgICAgIFwicGFnZXMvd2VidGVjaC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dhcHBhbHl6ZXItbG9nby53ZWJwXCIsXG4gICAgICAgIFwiQnJvd3NlciBleHRlbnNpb24gbG9nby4gQSB3aGl0ZSB3IG9uIGEgcHVycGxlIHRpbGUuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSnNvbm9iamVjdFwiLFxuICAgICAgICA2LFxuICAgICAgICBcImpzb25PYmplY3RcIixcbiAgICAgICAgXCJKU09OIG9iamVjdCBub3RhdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCA5KSxcbiAgICAgICAgXCJwYWdlcy9qc29ub2JqZWN0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvanNvbi53ZWJwXCIsXG4gICAgICAgIFwiSlNPTiBsb2dvOiBBIGdyZXkgY2lyY2xlIHdpdGggYXJ0aXN0aWMgc3BpcmFscy5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXaS1GaVwiLFxuICAgICAgICA3LFxuICAgICAgICBcIldpLUZpIFZlcnNpb25cIixcbiAgICAgICAgXCJEZXRlcm1pbmUgV2lmaSBWZXJzaW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDE2KSxcbiAgICAgICAgXCJwYWdlcy93aWZpLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2lmaS53ZWJwXCIsXG4gICAgICAgIFwiV2ktRmkgbG9nbyB3aXRoIGEgYmxhY2sgY2lyY2xlIGJhY2tncm91bmQuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ2hhdGdwdFwiLFxuICAgICAgICA4LFxuICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgICAgICBcIkNoYXQgd2l0aCBhbiBBSSBmb3IgcmVzZWFyY2ggYW5kIGRldmVsb3BtZW50LlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgICAgIFwicGFnZXMvY2hhdGdwdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2FpLndlYnBcIixcbiAgICAgICAgXCJEZWNvcmF0aXZlIEFJIGxvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiYWkgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQWkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvYWlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgICAgICA4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUGFpbnQzZFwiLFxuICAgICAgICA5LFxuICAgICAgICBcIlBhaW50IDNEXCIsXG4gICAgICAgIFwiRWRpdCBwaWN0dXJlcyBvciBzY3JlZW4gY2FwdHVyZXMgdXNpbmcgcGFpbnQgM0RcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgICAgICBcInBhZ2VzL3BhaW50M2QuaHRtbFwiLFxuICAgICAgICBcImltZy9wcm90b3R5cGUud2VicFwiLFxuICAgICAgICBcIkNvbG9yZnVsIHByb3RvdHlwaW5nIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicHJvdG90eXBlIGljb25zXCIsXG4gICAgICAgICAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wcm90b3R5cGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgICAgICAgIDlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEaWN0aW9uYXJ5XCIsXG4gICAgICAgIDEwLFxuICAgICAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcbiAgICAgICAgXCJMaXN0IGRpY3Rpb25hcnkgdGVybXMgdXNpbmcgYSBkaWN0aW9uYXJ5IEFQSVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAzMCksXG4gICAgICAgIFwicGFnZXMvZGljdGlvbmFyeXdvcmQuaHRtbFwiLFxuICAgICAgICBcImltZy9kaWN0aW9uYXJ5LndlYnBcIixcbiAgICAgICAgXCJEaWN0aW9uYXJ5IGljb24gZGVwaWN0aW9uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRpY3Rpb25hcnkgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGljdGlvbmFyeSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kaWN0aW9uYXJ5XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcbiAgICAgICAgICAgIDEwXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQm9pbmNcIixcbiAgICAgICAgMTEsXG4gICAgICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAgICAgXCJQaXZvdCB0aGUgdW51c2VkIGNvbXB1dGluZyBwb3RlbnRpYWwgZm9yIHNjaWVuY2VcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgNiksXG4gICAgICAgIFwicGFnZXMvYm9pbmMuaHRtbFwiLFxuICAgICAgICBcImltZy9ib2luY19nbG9zc3kud2VicFwiLFxuICAgICAgICBcIkJPSU5DIGxvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiQk9JTkMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQk9JTkMgaWNvbiBkZXNpZ25lZCBieSBNaWNoYWwgS3Jha293aWFrLiBDb3lyaWdodChDKSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWFcIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcbiAgICAgICAgICAgIFwiQk9JTkNcIixcbiAgICAgICAgICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAgICAgICAgIDExXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVBBZGRyZXNzXCIsXG4gICAgICAgIDEyLFxuICAgICAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgICAgIFwiTG9va3VwIHB1YmxpYyBhbmQgbG9jYWwgSVAgYWRkcmVzc2VzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDEzKSxcbiAgICAgICAgXCJwYWdlcy9pcGFkZHJlc3MuaHRtbFwiLFxuICAgICAgICBcImltZy9pcC53ZWJwXCIsXG4gICAgICAgIFwiSVAgbG9jYXRpb24gYW5kIGJyb3dzZXIgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJJUCBpY29uc1wiLFxuICAgICAgICAgICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICAgICAgMTJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MTWFya3VwXCIsXG4gICAgICAgIDEzLFxuICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgXCJSZXZlYWwgSFRNTCBzb3VyY2UgY29kZSBhbmQgSmF2YVNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwicGFnZXMvbWFya3VwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSFRNTF9zb3VyY2Uud2VicFwiLFxuICAgICAgICBcIkhUTUwgZnJhbWVzIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiaHRtbCBpY29uc1wiLFxuICAgICAgICAgICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0bWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICAgICAgMTNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJOZXR3b3Jrc3BlZWRcIixcbiAgICAgICAgMTUsXG4gICAgICAgIFwiTmV0d29yayBTcGVlZCBUZXN0XCIsXG4gICAgICAgIFwiVGVzdCB0aGUgbmV0d29yayBhZGFwdGVycyB3aXRoIGEgUG93ZXJTaGVsbCBzY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgNyksXG4gICAgICAgIFwicGFnZXMvbmV0d29ya3NwZWVkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcGFnZS1zcGVlZC53ZWJwXCIsXG4gICAgICAgIFwiU3BlZWQgdGVzdCBkaWFsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicGFnZSBzcGVlZCBpY29uc1wiLFxuICAgICAgICAgICAgXCJQYWdlIHNwZWVkIGljb25zIGNyZWF0ZWQgYnkgUHJvc3ltYm9scyBQcmVtaXVtIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcGFnZS1zcGVlZFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJOZXR3b3JrIFNwZWVkXCIsXG4gICAgICAgICAgICAxNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGxkcml2ZXNcIixcbiAgICAgICAgMTcsXG4gICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgXCJTaW1pbGFyIHRvIGFuIEhERCwgZXhjZXB0IGl0IGlzIG9ubHkgaW4gUG93ZXJTaGVsbFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMCksXG4gICAgICAgIFwicGFnZXMvZHJpdmVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdGVybWluYWwud2VicFwiLFxuICAgICAgICBcIkNvbXB1dGVyIHRlcm1pbmFsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBGbGF0IEljb25zIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgICAgIDE3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0ROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG5zIGljb25zXCIsXG4gICAgICAgICAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kbnNcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAgICAgMjBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicmFuayBpY29uc1wiLFxuICAgICAgICAgICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9yYW5rXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAgICAgICAgIDIyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIDIzLFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICBcIlJldmlldyB0aGUgRE9NIHdpdGggYSBET00gdHJlZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAyNyksXG4gICAgICAgIFwicGFnZXMvZG9tLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdHJlZS53ZWJwXCIsXG4gICAgICAgIFwiQSB0cmVlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidHJlZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJUcmVlIGljb25zIGNyZWF0ZWQgYnkganVzdGljb24gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRPTVwiLFxuICAgICAgICAgICAgMjNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJpZGVcIixcbiAgICAgICAgMjQsXG4gICAgICAgIFwiV2ViSURFXCIsXG4gICAgICAgIFwiVHJ5IHNraXBwaW5nIHRoZSBkb3dubG9hZCB3aXRoIGEgd2ViIElERVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAzKSxcbiAgICAgICAgXCJwYWdlcy93ZWJpZGVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdXgud2VicFwiLFxuICAgICAgICBcIkEgY29tcHV0ZXIgYXBwbGljYXRpb24gaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkZXNpZ24gaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGVzaWduIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJ3ZWJpZGVzXCIsXG4gICAgICAgICAgICAyNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICAyNSxcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgXCJGaW5kIGFuIFNWRyBhbmQgbGVhcm4gYWJvdXQgdGhlIFNWRyBsYW5ndWFnZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCA5KSxcbiAgICAgICAgXCJwYWdlcy9zdmcuaHRtbFwiLFxuICAgICAgICBcImltZy9zdmcuc3ZnXCIsXG4gICAgICAgIFwiQW4gc3ZnIGljb24gZXhhbXBsZS5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2NhbGFibGUgdmVjdG9yIGdyYXBoaWNzXCIsXG4gICAgICAgICAgICBcIlNWRyBpY29uIGNyZWF0ZWQgYnkgSGFydmV5IFJheW5lclwiLFxuICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvXCIsXG4gICAgICAgICAgICBcIlczQ1wiLFxuICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIDI1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSmF2YXNjcmlwdFwiLFxuICAgICAgICAyNixcbiAgICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgIFwiRGlzYWJsZSB0aGUgSmF2YVNjcmlwdCB0byB0ZXN0IHdlYnNpdGUgZnVuY3Rpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjIpLFxuICAgICAgICBcInBhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgICAgICBcImltZy9zb2Z0d2FyZS1hcHBsaWNhdGlvbi53ZWJwXCIsXG4gICAgICAgIFwiQSBqYXZhc2NyaXB0IGZ1bmN0aW9uIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiV2ViIGNvZGluZyBpY29ucyBjcmVhdGVkIGJ5IE11aGFtbWFkIEF0aWYgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy93ZWItY29kaW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0hUVFBcIixcbiAgICAgICAgMjgsXG4gICAgICAgIFwiSFRUUFwiLFxuICAgICAgICBcIkhUVFAgbWFrZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nIHdlYiBwYWdlcyBwb3NzaWJsZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTIpLFxuICAgICAgICBcInBhZ2VzL2h0dHAuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwLndlYnBcIixcbiAgICAgICAgXCJIdHRwIHZlcmIgaW4gZnJvbnQgb2YgYSBnbG9iZSBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodHRwIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0dHAgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHR0cFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogSFRUUFwiLFxuICAgICAgICAgICAgMjhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDU1NkZWZcIixcbiAgICAgICAgMjksXG4gICAgICAgIFwiQ1NTXCIsXG4gICAgICAgIFwiQ1NTIHN0eWxlcyB0aGUgZWxlbWVudHMgd2l0aGluIGEgcGFnZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTkpLFxuICAgICAgICBcInBhZ2VzL2Nzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nzcy0zLndlYnBcIixcbiAgICAgICAgXCJBIENTUyB0aHJlZSBsb2dvLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjc3MgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ3NzIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWwgcGVyZmVjdCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nzc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDU1NcIixcbiAgICAgICAgICAgIDI5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAzMixcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIFwiVHJhdmVsIGxhdGVuY3kgY2FuIHNsb3cgZG93biBhIHdlYnNpdGUuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDE4KSxcbiAgICAgICAgXCJwYWdlcy9sYXRlbmN5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY2hyb25vbWV0ZXIud2VicFwiLFxuICAgICAgICBcIkEgc3RvcHdhdGNoIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRpbWVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlRpbWVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RpbWVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgICAgIDMyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTGRlZlwiLFxuICAgICAgICAzMyxcbiAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGFuIEhUTUwgZWxlbWVudFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyNSksXG4gICAgICAgIFwicGFnZXMvaHRtbC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0bWwud2VicFwiLFxuICAgICAgICBcIkhUTUwgZWxlbWVudCBzeW50YXggaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzNcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaHZlcnRpY2Fsc1wiLFxuICAgICAgICAxNCxcbiAgICAgICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICBcIk9wdGltaXplIHlvdXIgc2VhcmNoIGVuZ2luZSBuZXdzIGFuZCByZXN1bHRzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoX3NldHRpbmdzLndlYnBcIixcbiAgICAgICAgXCJTZWFyY2ggc2V0dGluZ3MgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgICAgIDE0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU01UUFwiLFxuICAgICAgICAxNixcbiAgICAgICAgXCJHVUlERTogU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgXCJMZWFybiBFbWFpbCBwcm90b2NvbHMgYW5kIHBvcnQgbnVtYmVyc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAxMyksXG4gICAgICAgIFwiZ3VpZGVzL3NtdHAuaHRtbFwiLFxuICAgICAgICBcImltZy9jb21tdW5pY2F0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiRW1haWwgc2VydmVyLXN0YWNrIHdpdGggbWFpbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgICAgICAxNlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldnRvb2xzXCIsXG4gICAgICAgIDE5LFxuICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgXCJSZXZpZXcgZGV2IHRvb2wncyBhcHBsaWNhdGlvbiB0YWJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjcpLFxuICAgICAgICBcImd1aWRlcy9hcHBsaWNhdGlvbnRhYi5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94LndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgICAgIDE5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGV2dG9vbHN0d29cIixcbiAgICAgICAgMjEsXG4gICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgXCJPcGVuIHRoZSBkZXZlbG9wZXIncyB0b29sYm94IGFub3RoZXIgd2F5XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDEwKSxcbiAgICAgICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gyLndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uIHR3b1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgICAgICAgMjFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQV0FJY29uXCIsXG4gICAgICAgIDI3LFxuICAgICAgICBcIkdVSURFOiBJbnN0YWxsIHRoZSBQV0EgYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiUHJvZ3Jlc3NpdmUgd2Vic2l0ZXMgaGF2ZSBhbiBpbnN0YWxsYXRpb24gb3B0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvcHdhaWNvbi5odG1sXCIsXG4gICAgICAgIFwiaW1nL2FwcC1kZXZlbG9wbWVudC53ZWJwXCIsXG4gICAgICAgIFwiQXBwIGRldmVsb3BtZW50IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGV2ZWxvcG1lbnQgaWNvbnMgY3JlYXRlZCBieSBEZXNpZ24gQ2lyY2xlIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGV2ZWxvcG1lbnRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjdcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDbGVhcmNvb2tpZXNcIixcbiAgICAgICAgMzAsXG4gICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICBcIkRvbid0IHdhc3RlIHRpbWUgc2lmdGluZyB0aHJvdWdoIHNldHRpbmdzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDIpLFxuICAgICAgICBcImd1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29va2llcy53ZWJwXCIsXG4gICAgICAgIFwiQnJvd3NlciBjb29raWUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb29raWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29va2llIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nvb2tpZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAgICAgICAzMFxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogXCJFeHBsb3JlIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEV4cGxvcmUgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJOYXNhXCIsXG4gICAgICAgIDMsXG4gICAgICAgIFwiRVhQTE9SRTogTkFTQSBQYWdlc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIE5BU0EgZG9tYWluLiBMZWFybiBhYm91dCB0aGUgdW5pdmVyc2UgdmlhIE5BU0EgbGlua3NcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDE4KSxcbiAgICAgICAgXCJleHBsb3JlL25hc2EuaHRtbFwiLFxuICAgICAgICBcImltZy9OQVNBLndlYnBcIixcbiAgICAgICAgXCJOQVNBIEFydGVtaXMgTG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJOQVNBXCIsXG4gICAgICAgICAgICBcIkltYWdlIHNvdXJjZSB2aWEgdGhlIE5hdGlvbmFsIEFlcm9uYXV0aWNzIGFuZCBTcGFjZSBBZG1pbmlzdHJhdGlvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5uYXNhLmdvdi9hdWRpZW5jZS9mb3JzdHVkZW50cy81LTgvZmVhdHVyZXMvc3ltYm9scy1vZi1uYXNhLmh0bWxcIixcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJOQVNBIFBhZ2VzXCIsXG4gICAgICAgICAgICAzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbHRvdXJcIixcbiAgICAgICAgMTgsXG4gICAgICAgIFwiRVhQTE9SRTogVmlydHVhbCBUb3Vyc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIHJlYWwgd29ybGQgaW4gYSB3ZWIgYnJvd3NlclwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMyksXG4gICAgICAgIFwiZXhwbG9yZS92aXJ0dWFsdG91ci5odG1sXCIsXG4gICAgICAgIFwiaW1nL2dvb2dsZS1leHBlZGl0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiR29vZ2xlIEV4cGVkaXRpb25zIGxvZ28gZnJvbSBGTEFUSUNPTlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiR29vZ2xlIGV4cGVkaXRpb25zIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2dvb2dsZS1leHBlZGl0aW9uc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAgICAgICAgIDE4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViYlwiLFxuICAgICAgICAzMSxcbiAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZVwiLFxuICAgICAgICBcIlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAzKSxcbiAgICAgICAgXCJleHBsb3JlL3dlYmJ0ZWxlc2NvcGUuaHRtbFwiLFxuICAgICAgICBcImltZy9KV1NUX3Bvc3Rlci53ZWJwXCIsXG4gICAgICAgIFwiSmFtZXMgV2ViYiBzcGFjZSB0ZWxlc2NvcGUgcG9zdGVyIGltYWdlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkhleGFnb24gTGl0aG8gKDIwMTgpXCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb24gcHJvdmlkZWQgYnkgbmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9qd3N0Lm5hc2EuZ292L2NvbnRlbnQvZmVhdHVyZXMvZWR1Y2F0aW9uYWwvcHJpbnQuaHRtbFwiLFxuICAgICAgICAgICAgXCJqd3N0Lm5hc2EuZ292XCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb25cIixcbiAgICAgICAgICAgIDMxXG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBNdWx0aWRpbWVuc2lvbmFsIGFycmF5LiBSb3dzIGFyZSB0aGUgZGlmZmVyZW50IHNlY3Rpb25zLiBDb2x1bW5zXG4gKiBjb250YWluIGVhY2ggYXJ0aWNsZSdzIGRhdGEgYmVsb25naW5nIGluIHRoYXQgc2VjdGlvbi5cbiAqL1xuY29uc3QgV0VCQklUREFUQSA9IFtBcmJpdHJhcnlBcnRpY2xlcywgR3VpZGVTaG9ydHMsIEV4cGxvcmVdXG5cbmV4cG9ydCBkZWZhdWx0IFdFQkJJVERBVEE7IiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBIZWFkZXJGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlckZvb3Rlcic7XG5pbXBvcnQgUGFnZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzJztcbmltcG9ydCBDbGFzc0NvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL0NsYXNzQ29tcG9uZW50cyc7XG5pbXBvcnQgU2NyaXB0UGVyZiBmcm9tICcuL21vZGVscy9TY3JpcHRQZXJmJ1xuXG5jb25zdCBtYWlucGVyZiA9IG5ldyBTY3JpcHRQZXJmKFwibWFpblwiKTtcblxuLy8gZW50cnkgcG9pbnRcbi8qKlxuICogVHlwZVNjcmlwdCBlbnRyeSBwb2ludC4gVGhpcyBzY3JpcHQgaW5pdGlhbGl6ZXMgcGFnZSBjb21wb25lbnRzIGFuZCBtb2RlbHMgYXNcbiAqICB0aGV5J3JlIG5lZWRlZCBtYWluLmluaXQoKSBpcyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgXCJ0eXBlc2NyaXB0LmpzXCIuXG4gKi9cbmNvbnN0IG1haW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwYWdlIHdpZGdldHMgYW5kIGFwcGxpY2F0aW9uIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBFdmVudCBmaXJlZCBiZWZvcmUgYXNzZXRzIGFyZSByZW5kZXJlZCB0byB0aGUgcGFnZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5pbml0KCk7XG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIFBhZ2VDb21wb25lbnRzLmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBlbGVtZW50IGNvbXBvbmVudHNcbiAgICAgICAgICAgIENsYXNzQ29tcG9uZW50cy5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIDxhYmJyPjwvYWJicj4gc3R5bGVzOiBpbXBsZW1lbnRlZCBmb3IgbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIG1haW4ubW9iaWxlQWJick1hcmt1cCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtYWlucGVyZi5lbmQoKTtcbiAgICAgICAgfSlcblxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICAgKiAgYWJpbGl0eSB0byBkZWZpbmUgYW4gYWJiciB0YWcsIHRoYW4gcmVseSBvbiB0aGUgdGl0bGUgYXR0cmlidXRlLlxuICAgICAqL1xuICAgIG1vYmlsZUFiYnJNYXJrdXAoKSB7XG4gICAgICAgIGNvbnN0IG1vYmlsZWFiYnJwZXJmID0gbmV3IFNjcmlwdFBlcmYoXCJNb2JpbGVhYmJycGVyZlwiKTsgLy9zdGFydCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzIEFiYnJPcGVue1xuICAgICAgICAgICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBhYmJyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxhYmJyZXZpYXRpb25lbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhYmJyXCIpO1xuICAgICAgICBpZihhbGxhYmJyZXZpYXRpb25lbGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvciAobGV0IGFiYnIgb2YgYWxsYWJicmV2aWF0aW9uZWxlbXMpe1xuICAgICAgICAgICAgICAgIGxldCBhYmJyZXYgPSBuZXcgQWJick9wZW4oKTtcbiAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQgPSBhYmJyO1xuXG4gICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhYmJydGl0bGVhdHRydmFsOnN0cmluZyA9IGFiYnJldi5hYmJyRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGFiYnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWJicmV2LmFiYnJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA8IDEpeyAvL2NyZWF0ZSB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9zaG93IHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0oJHthYmJydGl0bGVhdHRydmFsfSR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbW9iaWxlYWJicnBlcmYuZW5kKCkgLy9lbmQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgIH1cbn07XG5cbm1haW4uaW5pdCgpOyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwcml2YXRlIEdFVFVSTDogVVJMO1xuICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGVycm9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgcmVjZWl2ZWREYXRhOiBhbnk7IC8vVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBnYXRoZXJzIGFsbCB0aGUgbmVlZGVkIGluZm9ybWF0aW9uIGZvciBmZXRjaCBhbmQvb3IgYnJvd3NlclxuICAgKiAgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHBhcmFtIHNlbmRUb0Jyb3dzZXJDYWNoZSAgLSBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGZldGNoIGNhY2hpbmcuXG4gICAqIEBwYXJhbSBicm93c2VyQ2FjaGVOYW1lIC0gSWYgc3RvcmluZyB0aGUgcmVxdWVzdCBpbiBicm93c2VyIGNhY2hlLCB0aGlzIHN0cmluZyBwcm92aWRlcyB0aGUgbmFtZSBmb3Igc3RvcmFnZS5cbiAgICogQHBhcmFtIGVycm9yRWxlbSAtIFNob3VsZCB0aGUgZmV0Y2ggcmVxdWVzdCBmYWlsLCByZXR1cm4gZXJyb3Igc3RhdHVzIHRvIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEdFVFVSTDogVVJMLFxuICAgIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbixcbiAgICBlcnJvckVsZW06IEhUTUxFbGVtZW50LFxuICAgIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICB0aGlzLmVycm9yRWxlbSA9IGVycm9yRWxlbTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZVxuICAgKi9cbiAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHRVRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMuR0VUVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsaXAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgYm9vbGVhbiB2YWx1ZSBmcm9tIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmZXRjaCByZXF1ZXN0IGNhbiB0YWtlIFVSTCBvciBzdHJpbmcgcGFyYW1ldGVyLiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGFwaUdFVFxuICAgKiAgb2JqZWN0IGZvciBhIFVSTCBmZXRjaCBieSBjcmVhdGluZyBhIFVSTCBmcm9tIHRoZSBzdHJpbmcsIG9yIHBhc3NpbmcgdGhlIFVSTC5cbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICovXG4gIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIEdFVFVSTCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5HRVRVUkwgPSBuZXcgVVJMKEdFVFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmZXRjaCByZXF1ZXN0LCByZXR1cm5pbmcgYSBmZXRjaCBwcm9taXNlLlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhLnRleHQoKSBvciBkYXRhIGJhc2VkIG9uIHRoZSBpbnN0YW5jZSByZXR1cm5lZC5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgcmV0dXJuIGZldGNoKEdFVFVSTClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5hcGlSZXNwb25zZUVycm9yQ2hlY2socmVzcG9uc2UpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IGAke2UubWVzc2FnZX1gO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQSBwdWJsaWMgZnVuY3Rpb24gY3JlYXRpbmcgYSBkYXRhIHByb21pc2Ugb2JqZWN0IGZvciB0aGUgY2FsbGVkIGZldGNoIGZ1bmN0aW9uLiBJZlxuICAgKiAgdGhlIHJlcXVlc3QgbmVlZHMgYWRkZWQgdG8gYnJvd3NlciBzdG9yYWdlLCB0aGUgZmV0Y2ggaXMgbWFkZSBhbmQgc2VudCB0b1xuICAgKiAgc3RvcmFnZS4gQSBjbG9uZWQgY29weSBvZiB0aGUgZmV0Y2hlZCBkYXRhIGlzIHJldHVybmVkIGFuZCB0aGUgb3JpZ2luYWwgcmVxdWVzdCBpc1xuICAgKiAgc2VudCB0byB0aGUgY2FjaGUuIFdpdGhvdXQgc2VuZGluZyB0byBicm93c2VyIGNhY2hlLCB0aGUgZmV0Y2ggaXMgcmVxdWVzdGVkIGFuZCBcbiAgICogcmV0dXJuZWQuXG4gICAqICBcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YUNhY2hlUHJvbWlzZTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgIC8vQ2hlY2sgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGNhY2hlIHN0b3JhZ2VcbiAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpIHtcbiAgICAgIC8vVGhlIHJldHVybmVkIGRhdGEgaXMgcGFja2FnZXMgYXMgYSBQcm9taXNlIG9iamVjdFxuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdykge1xuICAgICAgICAgIC8vT3BlbiBjYWNoZSBhbmQgY2hlY2sgZm9yIHJlcXVlc3QgZXhpc3RpbmcgaW4gQ2FjaGUgU3RvcmFnZVxuICAgICAgICAgIHdpbmRvdy5jYWNoZXMub3Blbih0aGlzLmJyb3dzZXJDYWNoZU5hbWUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICBjYWNoZXMubWF0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy9ObyBtYXRjaGVzIGZvciB0aGlzIHJlcXVlc3QgaW4gU3RvcmFnZSBDYWNoZSwgc28gZmV0Y2ggdGhlIHJlcXVlc3Qgbm9ybWFsbHlcbiAgICAgICAgICAgICAgICAvL1Vwb24gc3VjY2VzcywgYSBjbG9uZWQgY29weSB3aWxsIG5lZWQgdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICAgICAgICAgZmV0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICBsZXQgY2xvbmVkcmVzcCA9IHJlc3VsdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcmVzdWx0IHRvIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KEdFVFVSTCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVkcmVzcC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0NhY2hlIGhpdCBzdWNjZXNzLCByZXR1cm4gdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZSA9PiB7Ly9DYW5ub3Qgb3BlbiBTdG9yYWdlIENhY2hlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNQcm9ibGVtIG9wZW5pbmcgQ2FjaGUgU3RvcmFnZS4gTmFtZTogJHt0aGlzLmJyb3dzZXJDYWNoZU5hbWV9YCwgXCJjb2xvcjogZ3JleVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gZmFsc2U7XG4gICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7Ly9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9taXNlIGVycm9yIG9uIGRhdGEgZmV0Y2guXCIpKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vVGhlIHByb21pc2UgaGFzIHJlc29sdmVkIC0tPiByZXR1cm4gdGhlIHByb21pc2UgZGF0YVxuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgfSk7XG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH1cbiAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gXCIuL0xpbmtEZXRhaWxzXCI7XG5cbi8qKiBcbiAqIFVzZWQgZm9yIGltYWdlIEF0dHJpYnV0aW9uXG4qL1xuY2xhc3MgQXR0cmlidXRpb25MaW5rIGV4dGVuZHMgTGlua0RldGFpbHMge1xuICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgYXR0cmlidXRlZG93bmVyOiBzdHJpbmc7XG4gICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICBhcnRpY2xlaWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKipMaW5rIHRpdGxlICovXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgIC8qKkxpbmsgaW5uZXIgdGV4dCAqL1xuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgLyoqIGxpbmsgaHJlZiAqL1xuICAgICAgICBoUmVmZXJlbmNlOiBzdHJpbmcsXG4gICAgICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgICAgIGF0dHJpYnV0ZWRvd25lcjogc3RyaW5nLFxuICAgICAgICAvKipXZWJCaXRzIHBhZ2UgKi9cbiAgICAgICAgcGFnZU5hbWU6IHN0cmluZyxcbiAgICAgICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICAgICAgYXJ0aWNsZWlkOiBudW1iZXJcblxuICAgICkge1xuICAgICAgICBzdXBlcih0aXRsZSwgaW5uZXJUZXh0LCBwYWdlTmFtZSwgaFJlZmVyZW5jZSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlZG93bmVyID0gYXR0cmlidXRlZG93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluazsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuLi9tb2RlbHMvQVBJXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZHZhbHVlIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBmcm9tIFwiLi9EaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0XCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoIGlzIGEgc2V0IG9mIG1hcmt1cCBjcmVhdGlvbiBhbmQgZnVuY3Rpb25zIHdoaWNoIGFsbG93IGEgdXNlclxuICogIHRvIGxvb2sgdXAgYSB3b3JkIGxpa2UgYSBEaWN0aW9uYXJ5LiBXaGVuIGNhbGxlZCwgdGhlIHVzZXIncyBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAqICBhcyBhbiBhY2NlcHRhYmxlIHdvcmQgb3IgaXQgZGVjbGluZXMgdGhlIHJlcXVlc3QsIHRoZW4gc2hvd2luZyB0aGUgdXNlciBpZiB0aGUgd29yZFxuICogIGlzIGFjY2VwdGFibGUuXG4gKlxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICoga25vd24gcGxhY2VtZW50IGxvY2F0aW9uKSB0aGF0IGNvbnRhaW5zIHRoZSAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3MuXG4gKlxuICogICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAqXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaCBleHRlbmRzIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQge1xuICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3Q6IHN0cmluZyA9IFwiUldCX3dvcmRfZmV0Y2hcIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVxdWVzdFVybDogc3RyaW5nID1cbiAgICBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcbiAgcHJpdmF0ZSBkaWN0aW9uYXJ5U2VhcmNoTWFya3VwOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHM7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgY3JlYXRlcyBhbGwgdGhlIGZ1bmN0aW9uYWxpdHkgYW5kIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICAgKiAgRGljdGlvbmFyeSBTZWFyY2ggd2lkZ2V0IGludGVyZmFjZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW52b2tlIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcigpO1xuICAgIC8vQ2FsbCBjcmVhdGlvbiBmb3IgYWxsIHRoZSBtYXJrdXAgbmVlZGVkIHRvIGJlZ2luIHRoZSB3aWRnZXRcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAgPSB0aGlzLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbSk7XG4gICAgLy9Jbml0aWFsaXplIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuYWRkV2lkZ2V0RXZlbnRzKCk7XG4gICAgRGljdGlvbmFyeVNlYXJjaC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgTG9jYWwgU3RvcmFnZSB3b3JkcyBwcmV2aW91c2x5IHN0b3JlZCB3aXRoIHRoZSBEaWN0aW9uYXJ5IFNlYXJjaCBXaWRnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgLSB0aGVzZSBhcmUgdGhlIHdvcmRzIHN0b3JlZCBwcmV2aW91c2x5IGluIHRoZVxuICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAvL0xvY2FsIFN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtcyBkYXRhIGFzc2lnbm1lbnRcbiAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VTdHI6IHN0cmluZztcbiAgICB0cnl7XG4gICAgICBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpe1xuICAgICAgaWYoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlY0Nhbm5vdCBnZXQgTG9jYWwgU3RvcmFnZSBcIndvcmQtY2FjaGVzLlwiXG4gICAgICAgICVjJHtlLm5hbWV9IFxuICAgICAgICAke2UubWVzc2FnZX0gXG4gICAgICAgICVjJHtlLnN0YWNrfWAsIFwiY29sb3I6IGdyZXlcIiwgXCJjb2xvcjogb3JhbmdlcmVkXCIsIFwiY29sb3I6IHJlZFwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgUHJvYmxlbSBnZXR0aW5nIExvY2FsIFN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2ApXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdG9yYWdlU3RyICE9IG51bGwgJiYgc3RvcmFnZVN0ciAhPSBcIltdXCIpIHtcbiAgICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgcmV0dXJuIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvL1RoZSBMb2NhbCBTdG9yYWdlIGlzIG51bGwgLS0+IENvbmZpcm0gaGVyZSB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGFueSBDYWNoZSBTdG9yYWdlIGl0ZW1zIGluIGVycm9yXG4gICAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdyl7XG4gICAgICAgICAgICBpZiAod2luZG93LmNhY2hlcy5oYXMoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCkpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jYWNoZXMuZGVsZXRlKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZFVSTFxuICAgKi9cbiAgcHVibGljIGdldFdvcmRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgZmV0Y2hlZCB3b3JkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGFuZCBrZXlwcmVzcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHdpZGdldC4gSW5wdXQgZXZlbnQgbGlzdGVuZXJzICdjbGljaydcbiAgICogIGFuZCAna2V5cHJlc3MnIGF3YWl0IGZvciBhIHNlYXJjaCBjYWxsLiBBbHNvLCBzaG91bGQgYSB1c2VyIHdhbnQgdG8gc2VhcmNoIGFcbiAgICogIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZCwgdGhlIHdpZGdldCBhZGFwdHMgbWFya3VwIGZvciB0aGF0IHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGFkZFdpZGdldEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0FkZCBmb3JtIGlucHV0IGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAsIGZhbHNlLCBudWxsKTtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImtleXByZXNzXCIsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIC8vXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAvL0NsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5wcmV2aW91c1dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgICAgIGxldCBuZXdCdXR0b25Db250YWluZXI6IEVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0b3IgYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgICAgICAgICAgIC8vbmVlZGVkIHRvIGRpc3BsYXkgdGhvc2Ugd29yZHMuIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpZGdldCBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAgICAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lciA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID1cbiAgICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSA9XG4gICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgICAgICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgIFwiZGljdGlvbmFyeS1idG5cIixcbiAgICAgICAgICAgICAgICAgIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy93aGVuIGNsaWNrZWQsIGZpcmUgYSB3b3JkIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCB0cnVlLCB3b3JkQ2FjaGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vTU9CSUxFXG4gICAgICAgICAgICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICBcInRvdWNoc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgXCJtb3VzZWxlYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgXCJtb3VzZW92ZXJcIixcbiAgICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICBcIm1vdXNlbGVhdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKFxuICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzTm90Rm91bmRPbmNlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9Xb3Jkc0hlYWRpbmdFbGVtID0gbmV3QnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgICAgICBcImRpY3Rpb25hcnktYnRuXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW5vdGZvdW5kXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICAgICAgICBcIlByZXZpb3VzIHdvcmRzIG5vdCBmb3VuZC4gVGhlIGNhY2hlIGlzIGVtcHR5LlwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHdvcmQgdG8gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGNvbnRhaW5pbmcgd29yZCBkYXRhLCBVUkwsIGFuZCBjYWNoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdldmFsdWUgLSBUaGlzIGludGVyZmFjZSBzdG9yZXMgaW5mb3JtYXRpb24gd2hlcmUgc2VuZGluZyB0byBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXZhbHVlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWUpIHtcbiAgICBsZXQgd29yZFN0b3JlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXSA9IFtdO1xuICAgIHdvcmRTdG9yZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcblxuICAgIC8vQWRkIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2VcbiAgICB0cnkge1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIikgPT0gbnVsbCkge1xuICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KHdvcmRTdG9yZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0FkZCB3b3JkIHRvIGN1cnJlbnQgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCInd29yZC1jYWNoZXMnIHZhbHVlcyBhcmUgbnVsbC4gVHJ5IGNsZWFyaW5nIGJyb3dzZXIgY2FjaGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gbG9jYWxzdG9yYWdldmFsdWUud29yZFVSTCkge1xuICAgICAgICAgICAgLy9Xb3JkIGlzIGFscmVhZHkgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIGFsbGNhY2hlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KGFsbGNhY2hlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICBpZihlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKXtcbiAgICAgICAgY29uc29sZS5sb2coYCVjQ2Fubm90IGdldCBMb2NhbCBTdG9yYWdlIFwid29yZC1jYWNoZXMuXCJcbiAgICAgICAgJWMke2UubmFtZX0gXG4gICAgICAgICR7ZS5tZXNzYWdlfSBcbiAgICAgICAgJWMke2Uuc3RhY2t9YCwgXCJjb2xvcjogZ3JleVwiLCBcImNvbG9yOiBvcmFuZ2VyZWRcIiwgXCJjb2xvcjogcmVkXCIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBQcm9ibGVtIGdldHRpbmcgTG9jYWwgU3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcHJldmlvdXMgd29yZCBkYXRhIGZyb20gYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgLS0+IEtleS9WYWx1ZVxuICAgKiBkYXRhIHJlZmVyZW5jaW5nIGlmIHdvcmRzIGFyZSBpbiBsb2NhbCBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXdvcmQgLSBzdHJpbmcgZnJvbSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIiBidXR0b25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXdvcmQ6IHN0cmluZykge1xuICAgIC8vUmVtb3ZlIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2UsIENhY2hlIFN0b3JhZ2VcbiAgICB0cnkge1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIikgPT0gbnVsbCkge1xuICAgICAgICAvL05vIHdvcmRzIGluIHN0b3JhZ2UsIHRoZXJlJ3MgYmVlbiBhbiBlcnJvciFcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzdG9yZWQgd29yZHMsIHJlZnJlc2ggdGhlIHBhZ2UhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0dldCB0aGUgd29yZHMgYXJyYXkgZnJvbSBMb2NhbCBTdG9yYWdlXG4gICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCInd29yZC1jYWNoZXMnIHZhbHVlcyBhcmUgbnVsbC4gVHJ5IGNsZWFyaW5nIGJyb3dzZXIgY2FjaGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlbW92ZVVSTDogVVJMO1xuICAgICAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSkge1xuICAgICAgICAgIGlmICh3b3JkQ2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgICAgICByZW1vdmVVUkwgPSB3b3JkQ2FjaGUud29yZFVSTDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkwpO1xuXG4gICAgICAgIC8vUmVtb3ZlIHRoZSB3b3JkIGZyb20gTG9jYWwgU3RvcmFnZSB3b3JkIGFycmF5LCByZXR1cm4gd29yZHMgdG8gc3RvcmFnZVxuICAgICAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZVtdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgZm9yIChsZXQgY2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgICAgICBpZiAoY2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgICAgICBhbGxjYWNoZS5zcGxpY2UoYWxsY2FjaGUuaW5kZXhPZihjYWNoZSksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KGFsbGNhY2hlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gcmVtb3ZpbmcgdGhlIHdvcmQuIEVycm9yOiBcIiwgZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmV0Y2ggcmVxdWVzdCBmcm9tIENhY2hlIFN0b3JhZ2UuIFV0aWxpemVzIFxuICAgKiBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0IGZvciBjYWNoZSBuYW1lLlxuICAgKiBAcGFyYW0gcmVtb3ZlVVJMIFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkw6IFVSTCkge1xuICAgIHdpbmRvdy5jYWNoZXNcbiAgICAub3BlbihEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KVxuICAgIC50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgY2FjaGVzLm1hdGNoKHJlbW92ZVVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBtYXRjaGluZyB0aGUgcmVzdWx0LiBSZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgICBjYWNoZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5kZWxldGUocmVtb3ZlVVJMKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzdHJ1Y3R1cmVzIHdpdGggd29yZCBkZWZpbml0aW9uIHJlcXVlc3QgYW5kIGluc3RhbnRpYXRlcyBhcGlHRVQoKS4gVGhlIFxuICAgKiBwcm9taXNlIHJldHVybiBkYXRhIHN0cnVjdHVyZXMgdGhlIHdpZGdldCBtYXJrdXAuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgc2VhcmNoZWQgZnJvbSB3aWRnZXQgaW5wdXQuXG4gICAqIEBwYXJhbSB3b3JkVXJsIC0gVGhlIGZldGNoIHJlcXVlc3QgVVJMLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHNlbmRUb0NhY2hlIC0gPyBTZW5kIGZldGNoIHJlcXVlc3QgdG8gQ2FjaGUgU3RvcmFnZSA6IEZldGNoIHdpdGhvdXQgc3RvcmluZyB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIGNhY2hlTmFtZSAtIElmIHNlbmRpbmcgZmV0Y2ggcmVxdWVzdHMgdG8gY2FjaGUsIHByb3ZpZGUgYSBuYW1lIHRvIHN0b3JlIGl0IHVuZGVyLlxuICAgKiBAcmV0dXJucyAtIHdvcmREYXRhOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwcml2YXRlIGZldGNoRGljdGlvbmFyeVRlcm0oXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVcmw6IFVSTCxcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIHNlbmRUb0NhY2hlOiBib29sZWFuLFxuICAgIGNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICAvL0EgZnVuY3Rpb24gY2FsbCBwYXJhbWV0ZXIgb3B0aW9uIGlzIHRvIHN0b3JlIHRoZSB3b3JkIHJlcXVlc3QgaW4gYnJvd3NlcidzIENhY2hlIFN0b3JhZ2VcbiAgICAvL1N0cnVjdHVyZSB0aGUgd29yZCBkYXRhIHZpYSAnbG9jYWxzdG9yYWdld29yZHZhbHVlJyBpbnRlcmZhY2UgdXNlZCB0aHJvdWdob3V0IGZldGNoaW5nXG4gICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZHZhbHVlID0ge1xuICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICB3b3JkOiB3b3JkLFxuICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgIH07XG5cbiAgICAvL0FzeW5jaHJvbm91cyBmZXRjaCByZXFldXN0IGFuZCBkeW5hbWljIG1hcmt1cCBjcmVhdGlvbiBmcm9tIHRoZSBkYXRhJ3MgcmV0dXJuXG4gICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vQ2FsbCBhcGlHRVQoKSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgIGNvbnN0IHdvcmRGZXRjaCA9IG5ldyBhcGlHRVQoXG4gICAgICAgIHdvcmRjYWNoZS53b3JkVVJMLFxuICAgICAgICB3b3JkY2FjaGUuaW5DYWNoZSxcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLFxuICAgICAgICB3b3JkY2FjaGUuY2FjaGVOYW1lXG4gICAgICApO1xuICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9XG4gICAgICBsZXQgd29yZERhdGE6IGFueSA9IGRhdGE7XG4gICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGFuIG9iamVjdCwgY29uZmlybSBpdCBpcyAnbm8gZGVmaW5pdGlvbicgc2VydmVyIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICAgICAgLy9ObyBkZWZpbml0aW9ucyB3ZXJlIGZvdW5kXG4gICAgICAgICAgbm9EZWZpbml0aW9ucyA9IHRydWU7XG4gICAgICAgICAgaWYod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiICYmIHdvcmRjYWNoZS5pbkNhY2hlID09IHRydWUpe1xuICAgICAgICAgICAgLy9UaGUgZGF0YSBzdHJlYW0gaGVyZSBpcyB3aXRob3V0IHdvcmQgZGF0YS4gVGhpcyBmdW5jdGlvbiBhd2FpdHMgdGhlIGFwaSBmZXRjaCdzIGRhdGFcbiAgICAgICAgICAgIC8vdG8gY29tcGxldGUgc3RvcmFnZS9wcm9taXNlIHJldHVybnMuIEl0IHdhaXRzIDUgc2Vjb25kcyBmb3IgdGhlIGJyb3dzZXIgdG8gY29tcGxldGUgaXRzIHN0b3JlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy90aGVuIHJlbW92ZXMgdGhlIHVud2FudGVkIGNhY2hlIHJlcXVlc3QuXG4gICAgICAgICAgICAvL1RPRE86QlVHUkVTRUFSQ0g9PkR1cmluZyB0aGUgNSB0aW1lb3V0LCBpZiB0aGUgcGFnZSByZWZyZXNoZXMgYSAnYmFkIHdvcmQnIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgLy9UaGlzICdiYWQgd29yZCcgY2FuIGJlIHJlbW92ZWQgYnkgZGVsZXRpbmcgYWxsIHByZXZpb3VzIHdvcmRzIHZpYSBVSSBhbmQgcmVmcmVzaGluZyB0aGUgcGFnZS4gVGhpcyB3aWxsXG4gICAgICAgICAgICAvLyBmaXJlIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB0byBjbGVhciBhbnkgbWlzbWF0Y2hlZCB3b3JkZGF0YTwtLT5jYWNoZWRyZXF1ZXN0cy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0Z1bmN0aW9uIGF3YWl0aW5nIHJlcXVlc3QncyBDYWNoZSBTdG9yYWdlIGNhY2hpbmdcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2h7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IHJlbW92ZSBmcm9tIENhY2hlIFN0b3JhZ2UuIE5hbWU6IFwiLCB3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgIW5vRGVmaW5pdGlvbnMpIHsvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9IGVsc2Ugey8vJ0JhZCBkYXRhJyBkdWUgdG8gXCJObyBkZWZpbml0aW9ucyBmb3VuZFwiLCBpbnZhbGlkIHdvcmQsIGJhZCBuZXR3b3JrIGNvbm5lY3Rpb25cbiAgICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUgIT09IGZhbHNlKSB7Ly9PbmxpbmUsIHByb2JsZW0gd2l0aCBmZXRjaFxuICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7Ly9TZXJ2ZXIgcmV0dXJuZWQgbm8gZGVmaW5pdGlvbnMgZGF0YVxuICAgICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiO1xuICAgICAgICAgIH0gZWxzZSB7Ly9JbnZhbGlkIHdvcmQgZGF0YVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Ugey8vT2ZmbGluZSByZXF1ZXN0XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBsZXQgd29yZERhdGEgPSB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHdvcmREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgaW5wdXQgdmFsaWRhdGlvbiBmdW5jdGlvbiB0ZXN0cyB0aGUgaW5wdXQgc3RyaW5nIGFnYWluc3QgYSB2YWxpZCBSZWd1bGFyIEV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgIFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIilcbiAgICpcbiAgICogQHBhcmFtIGludHh0IC0gU3RyaW5nIHZhbHVlIHJlY2VpdmVkIGZyb20gdXNlciBmaWVsZCBpbnB1dC5cbiAgICogQHJldHVybnMgQWNjZXB0YWJsZSB1c2VyIGlucHV0OiB0cnVlIG9yIGZhbHNlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkVmFsaWRhdGlvbihpbnR4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgbGV0IGxldHRlcnNSRSA9IG5ldyBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpO1xuICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybSBhd2FpdHMgYSBwcm9taXNlLCBmZXRjaGluZyBhIGRpY3Rpb25hcnkgdGVybS4gVGhlIGRhdGEgXG4gICAqIGluZ3Jlc3MgY2FsbHMgbWFya3VwIGNyZWF0aW9uIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCB0byBiZSBmZXRjaGVkLlxuICAgKiBAcGFyYW0gd29yZFVSTCAtIEEgVVJMIGNvbXBvc2luZyB0aGUgZnVsbCB1cmwgb2YgdGhlIGZldGNoIHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVUkw6IFVSTFxuICApIHtcbiAgICAvLyBXaGVuIHRoZSB3b3JkIGRhdGEgcmVzb2x2ZXMsIGNhbGwgbWFya3VwIGZ1bmN0aW9uc1xuICAgIGxldCB3b3JkRGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShcbiAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHdvcmQsXG4gICAgICAgICAgd29yZFVSTCxcbiAgICAgICAgICBzZWFyY2hFbGVtcyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3RcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB3b3JkRGF0YVByb21pc2UudGhlbigoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLndvcmREYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIHNlYXJjaEVsZW1zKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBjbGFzc2VzIGlmIGFwcGxpZWQgcHJldmlvdXNseVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiB3b3JkU2VhcmNoKCkgYmVnaW5zIGEgd29yZCBzZWFyY2ggcmVxdWVzdC4gVGhlIHVzZXIgaW5wdXQgbGlzdGVuZXIgY2hvb3Nlc1xuICAgKiB3aGV0aGVyIHRoZSBmZXRjaCBpcyBjYWxsZWQgZnJvbSBjYWNoZSBvciBpcyBuZXcuXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gaXNGcm9tUHJldmlvdXNXb3JkcyAtIFRydWUgaWYgdGhlIHVzZXIgcmVxdWVzdGVkIGEgc2VhcmNoIGZyb20gYSBwcmV2aW91cyB3b3JkLCB0byBjYWxsIGRhdGEgZnJvbSBCcm93c2VyIENhY2hlLlxuICAgKiBAcGFyYW0gY2FjaGVkV29yZCAtIElmIHRoZSB1c2VyIGNhbGxlZCBmb3IgYSBwcmV2aW91cyB3b3JkLCBjYWNoZWRXb3JkIGlzIHdpdGhpbiB0aGUgTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFNlYXJjaChcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIGlzRnJvbVByZXZpb3VzV29yZHM6IGJvb2xlYW4sXG4gICAgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZHZhbHVlIHwgbnVsbFxuICApIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICAgICAgc2VhcmNoRWxlbXMsXG4gICAgICAgIGNhY2hlZFdvcmQud29yZCxcbiAgICAgICAgY2FjaGVkV29yZC53b3JkVVJMXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoXG4gICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHNlYXJjaEVsZW1zLFxuICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsXG4gICAgICAgICAgdGhpcy53b3JkVVJMXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9IFwiXCI7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBpcyBtYWRlIHRvIGNyZWF0ZSB0aGUgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gKiAgRGljdGlvbmFyeSBTZWFyY2guIEVsZW1lbnRzIGFyZSBjcmVhdGVkIGFuZCBhcHBlbmRlZCB0byB0aGUgcGFnZSB0byB0aGUgY2xhc3NcbiAqICAnZGljdGlvbmFyeVdpZGdldCdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaFdpZGdldCB7XG4gIC8qKlxuICAgKiBQcmltYXJ5IHdpZGdldCBtYXJrdXAgc3RydWN0dXJpbmcgdGhlIHdpZGdldCBlbGVtZW50cyBhbmQgc2VhcmNoIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCBiZWZvcmUgdGhlIHdpZGdldC5cbiAgICogQHJldHVybnMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyAtLT4gaW50ZXJmYWNlIG9mXG4gICAqICBpbXBvcnRhbnQgSFRNTCBlbGVtZW50cyB1c2VkIHRocm91Z2ggd2lkZ2V0IGZ1bmN0aW9uLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbTogRWxlbWVudCkge1xuICAgIC8vaW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxuICAgICAgICApO1xuICAgICAgICBpZiAoZGljdGlvbmFyeSAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIHdpZGdldCBlbGVtZW50c1xuICAgICAgICAgIGNvbnN0IGFydEggPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIFJldHVybiB0aGUgZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICAgICAgICBsZXQgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHNlYXJjaFdvcmQ6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgICAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBkaWN0aW9uYXJ5RWxlbTogPEhUTUxFbGVtZW50PmRpY3Rpb25hcnksXG4gICAgICAgICAgICBlcnJvckVsZW06IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpLFxuICAgICAgICAgICAgcHJldmlvdXNXb3JkQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVmcmVzaEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgcHJldmlvdXNXb3Jkcy5jbGFzc0xpc3QuYWRkKFwicHJldmlvdXNXb3Jkc1wiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICAgICAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgICAgICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc2VhcmNoXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlNlYXJjaC4uLlwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgICAgICAgIGRpY3Rpb25hcnkuaWQgPSBcImRpY3Rpb25hcnlcIjtcbiAgICAgICAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG4gICAgICAgICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICAgICAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcblxuICAgICAgICAgIHJldHVybiBzZWFyY2hFbGVtZW50cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkZXRlcm1pbmVkIGRpY3Rpb25hcnkgZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSBpcyBubyBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1hcmt1cCB0byBob3VzZSByZXR1cm5lZCB3b3JkcyBmcm9tIERpY3Rpb25hcnlTZWFyY2guIFRoZSBtYXJrdXBcbiAgICogIGlzIGNyZWF0ZWQgYmFzZWQgb24gQVBJIGVncmVzcy4gV29yZHMgYW5kIHRoZWlyIGRlZmluaXRpb25zIHZhcnkuIFRoZSBtYXJrdXAgaXNcbiAgICogIGFkYXB0aXZlIHRvIHJldHVybmVkIHdvcmQgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZERhdGEgLSBUaGlzIHBhcmFtZXRlciBpcyBhbiBvYmplY3Qgb2Ygd29yZCB0eXBlcywgZGVmaW5pdGlvbnMsIGFuZCBleGFtcGxlcy5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKFxuICAgIHdvcmREYXRhOiBhbnksXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50c1xuICApIHtcbiAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCAhKHdvcmREYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm8gZGVmaW5pdGlvbiBmb3IgdGhpcyB3b3JkLlwiKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgd29yZCdzIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID1cbiAgICAgIHNlYXJjaEVsZW1zLmRpY3Rpb25hcnlFbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbiA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICApO1xuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uRGVzY3JpcHRpb25cIik7XG5cbiAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwid29yZFwiLCB3b3JkLndvcmQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcbiAgICAgICk7XG4gICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XG4gICAgICAvL0FkZCB0aGUgd29yZCBhbmQgZXhhbXBsZXMgdG8gcGFnZVxuICAgICAgd29yZC5tZWFuaW5ncy5tYXAoKHdvcmRUeXBlOiBhbnkpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxuICAgICAgICBjb25zdCB3b3JkVHlwZUggPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICAgICAgKTtcbiAgICAgICAgd29yZFR5cGVILnRleHRDb250ZW50ID0gd29yZFR5cGUucGFydE9mU3BlZWNoO1xuICAgICAgICB3b3JkVHlwZS5kZWZpbml0aW9ucy5tYXAoKGRlZjogYW55KSA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xuICAgICAgICAgIGxldCB3b3JkVHlwZURlZkl0ZW0gPSB3b3JkVHlwZUxpc3QuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcbiAgICAgICAgICApO1xuICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkZWZpbml0aW9uUC50ZXh0Q29udGVudCA9IGRlZi5kZWZpbml0aW9uO1xuICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJ3b3JkRGVmaW5pdGlvblwiKTtcblxuICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9ucyBpczogXCIsIGRlZik7XG4gICAgICAgICAgICBjb25zdCBuZXdQID0gZGVmaW5pdGlvblAuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgICAgICBcImJlZm9yZWVuZFwiLFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChuZXdQIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3UGkgPSBuZXdQLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XG4gICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtID1cbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ3b3JkLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG5cbiAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gIH1cbn1cbiIsIi8vQXV0aG9yOiBSb2JlcnQgQSBIb3dlbGwsIEFwcmlsIDIwMjNcbi8vT3JpZ2luYWwgQXV0aG9yKHMpOiBNb3ppbGxhIENvbnRyaWJ1dG9ycywgTUROXG4vL0xpY2Vuc2U6IGh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2VuLVVTL2Fib3V0L2dvdmVybmFuY2UvcG9saWNpZXMvcGFydGljaXBhdGlvbi9cbi8vTUROOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvY3JlYXRlRWxlbWVudFxuLy9Tb3VyY2UgZGlzdHJpYnV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vbWRuL3dlYi1jb21wb25lbnRzLWV4YW1wbGVzL3RyZWUvbWFpbi9leHBhbmRpbmctbGlzdC13ZWItY29tcG9uZW50XG5cbi8vIENyZWF0ZSBhIGNsYXNzIGZvciB0aGUgZWxlbWVudFxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ0xpc3RFbGVtZW50IGV4dGVuZHMgSFRNTFVMaXN0RWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXG4gICAgICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIHN1cGVyKCkgaXMgYSByZWZlcmVuY2UgdG8gdGhpcyBlbGVtZW50XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gR2V0IHVsIGFuZCBsaSBlbGVtZW50cyB0aGF0IGFyZSBhIGNoaWxkIG9mIHRoaXMgY3VzdG9tIHVsIGVsZW1lbnRcbiAgICAgICAgLy8gbGkgZWxlbWVudHMgY2FuIGJlIGNvbnRhaW5lcnMgaWYgdGhleSBoYXZlIHVscyB3aXRoaW4gdGhlbVxuICAgICAgICBjb25zdCB1bHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJyk7XG4gICAgICAgIGNvbnN0IGxpcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBIaWRlIGFsbCBjaGlsZCB1bHNcbiAgICAgICAgLy8gVGhlc2UgbGlzdHMgd2lsbCBiZSBzaG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIGhpZ2hlciBsZXZlbCBjb250YWluZXJcbiAgICAgICAgdWxzLmZvckVhY2godWwgPT4ge1xuICAgICAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGVhY2ggbGkgZWxlbWVudCBpbiB0aGUgdWxcbiAgICAgICAgbGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBsaSBoYXMgYSB1bCBhcyBhIGNoaWxkLCBkZWNvcmF0ZSBpdCBhbmQgYWRkIGEgY2xpY2sgaGFuZGxlclxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbiBhdHRyaWJ1dGUgd2hpY2ggY2FuIGJlIHVzZWQgIGJ5IHRoZSBzdHlsZVxuICAgICAgICAgICAgICAgIC8vIHRvIHNob3cgYW4gb3BlbiBvciBjbG9zZWQgaWNvblxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRoZSBsaSBlbGVtZW50J3MgdGV4dCBpbiBhIG5ldyBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXNzaWduIHN0eWxlIGFuZCBldmVudCBoYW5kbGVycyB0byB0aGUgc3BhblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGxpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIENvcHkgdGV4dCBmcm9tIGxpIHRvIHNwYW4sIHNldCBjdXJzb3Igc3R5bGVcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnRleHRDb250ZW50ID0gY2hpbGRUZXh0LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXIgdG8gdGhpcyBzcGFuXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5vbmNsaWNrID0gdGhpcy5zaG93dWw7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZXZlbnQuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHR1bCA9IG5ld1NwYW4ubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzcGFuIGFuZCByZW1vdmUgdGhlIGJhcmUgdGV4dCBub2RlIGZyb20gdGhlIGxpXG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1NwYW4sIGNoaWxkVGV4dCk7XG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbGkgY2xpY2sgaGFuZGxlclxuICAgIHNob3d1bCA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgY29uc3QgbmV4dHVsID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpO1xuICAgICAgICB9XG4gICAgfTtcbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLy8gVGhpcyBvYmplY3QgY3JlYXRlcyBhbiBhcnJheSBvZiBkaXZzIGZyb20gaW5wdXQgcG9ydCBudW1iZXIgaW5mb3JtYXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsYXNoY2FyZENhcmRFbGVtcyB7XG4gICAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gICAgcHJpdmF0ZSBtX3BvcnRJbmZvTWFwOiBNYXA8YW55LCBzdHJpbmc+XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPGFueSwgc3RyaW5nPikge1xuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAgPSBwb3J0bnVtYmVyc01hcDtcbiAgICAgICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG5cbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwLmZvckVhY2goIChwb3J0KSA9PiB7IFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxpc3QgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGZsYXNoY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIC8vVE9ETzogbGV0IGZsYXNoY2FyZCA9IG5ldyBHcm93aW5nQ2FyZEVsZW1lbnQoKTtcbiAgICAgICAgICAgIC8vVW5hYmxlIHRvIGluc3RhbnRpYXRlIGxpIGVsZW1lbnQgYXMgZ3Jvd2luZyBjYXJkIGR1ZSB0byBET00gdW5hdmFsYWJsZSAtLT4gcmVxdWlyZXMgc2hhZG93RE9NIG1hbmlwdWxhdGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgZWxlbWVudCBmb3IgcGFnZSB1c2VcbiAgICAgICAgICAgIGNvbnN0IGlubmVyID0gZmxhc2hjYXJkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGZyb250ID0gaW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBmbGlwYmFjayA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkU3BhbiA9IGZsaXBmcm9udC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBsZXQgZ2FtZUNhcmRCYWNrU3BhbiA9IGZsaXBiYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgIGZsYXNoY2FyZC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIsIFwiZ2FtZUNhcmRcIilcbiAgICAgICAgICAgIGlubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgZmxpcGZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICBmbGlwYmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGdhbWVDYXJkU3Bhbi5pbm5lclRleHQgPSBgUG9ydCMgJHttYXBJdGVyLm5leHQoKS52YWx1ZX1gO1xuICAgICAgICAgICAgZ2FtZUNhcmRCYWNrU3Bhbi5pbm5lclRleHQgPSBgJHtwb3J0fWA7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkaXYgdG8gZmxhc2hjYXJkIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLm1fZmxhc2hjYXJkc0Fyci5wdXNoKGZsYXNoY2FyZCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBHcm93aW5nQ2FyZEVsZW1lbnQgZXh0ZW5kcyBIVE1MTElFbGVtZW50IHtcbiAgICBwcml2YXRlIGlzR3Jvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBoYXNMaW5rO1xuICAgIC8vIHByaXZhdGUgc3RhdGljIGhhZERldGFpbHM7XG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgaGFzRGVzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ3Jvd0NhcmQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hyaW5rQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7IC8vVE9ETzogY2hlY2sgY2xhc3MgcHJvcGVydHlcbiAgICAgICAgaWYgKGxpLnN0eWxlLnNjYWxlKSB7XG4gICAgICAgICAgICBsaS5zdHlsZS5zY2FsZSA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zZXRJc0dyb3duKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hhZGVJbmFjdGl2ZUNhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoR3Jvd2luZ0NhcmRFbGVtZW50LmdldElzQXRMZWFzdE9uZUJpZygpKSB7XG4gICAgICAgICAgICBpZiAoIWxpLmdldElzR3Jvd24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi41XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuM1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXNBdExlYXN0T25lQmlnID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCN3ZWJJREVDYXJkcyBsaWApKTtcbiAgICAgICAgbGV0IGF0TGVhc3RPbmVJc0JpZyA9IGxpc3RMSXMuc29tZSgobGkpID0+IGxpLmdldElzR3Jvd24oKSA9PSB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGF0TGVhc3RPbmVJc0JpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXNHcm93biA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93bjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldElzR3Jvd24gPSAodHJ1ZWZhbHNlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd24gPSB0cnVlZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBncm93Q2FyZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdHlsZS5zY2FsZSA9IFwiMS4yXCI7XG4gICAgICAgIHRoaXMuc3R5bGUuekluZGV4ID0gXCIyXCI7XG4gICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICB0aGlzLnNldElzR3Jvd24odHJ1ZSk7XG5cbiAgICAgICAgLy8gTmVlZCBhbGwgdGhlIGxpc3QgZWxlbWVudHMgdG8gcmVmZXJlbmNlIHdoaWNoIG9uZSB0byBncm93XG4gICAgICAgIC8vIElmIGl0J3Mgbm90IHRoZSBjbGlja2VkIGVsZW1lbnQsIHNocmluayBpdC5cbiAgICAgICAgbGV0IGxpc3RMSXMgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pik7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCgoaXRlbSBhcyBHcm93aW5nQ2FyZEVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjYWxlIHByb3BlcnR5IGZvciBlYWNoIGNhcmRcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdHlsZS5zY2FsZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogSFRNTCBsaW5rIGVsZW1lbnQgZGF0YS4gVXNlZCB3aXRoIGFuY2hvciB0YWdzLlxuICovXG5jbGFzcyBMaW5rRGV0YWlscyB7XG4gICAgLyoqSFRNTCB0aXRsZSBhdHRyaWJ1dGUgKi9cbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIC8qKklubmVyIHRleHQgc3RyaW5nKi9cbiAgICBpbm5lclRleHQ6IHN0cmluZztcbiAgICAvKipUaGUgcGFnZSB0aGUgbGluayBpcyBhc3NvY2lhdGVkIHRvKi9cbiAgICBwYWdlTmFtZTogc3RyaW5nO1xuICAgIC8qKkhUTUwgaHJlZiBhdHRyaWJ1dGUqL1xuICAgIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIGlubmVyVGV4dDogc3RyaW5nLCBwYWdlTmFtZTogc3RyaW5nLCBoUmVmZXJlbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGlubmVyVGV4dCxcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lLFxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaW5rRGV0YWlsczsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4vV2ViQml0XCI7XG5pbXBvcnQgUldCQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9SV0JDYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBSYW5kb21XZWJCaXRzIHtcbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKG5hbWU6IHN0cmluZykge1xuICAgICAgICAvLyBDcmVhdGUgZGl2aXNvciBzZWN0aW9uYWwgZWxlbWVudHMgdG8gYXBwZW5kIHRvIG1haW5cbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgJiYgcGFnZU1haW4ubm9kZU5hbWUgPT09ICdNQUlOJykge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNhcmQgc2VjdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjYXJkc1wiPlxuICAgICAgICAgICAgLy8gICAgIDxoMj5BcmJpdHJhcnkgQXJ0aWNsZXM6PC9oMj5cbiAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9jb2x1bW5zXCI+XG5cbiAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgIC8vIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgbGV0IGFhQ2FyZHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFIZWFkaW5nKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gQWRkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBBQVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRzXCIpO1xuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7bmFtZX1gO1xuXG4gICAgICAgICAgICByZXR1cm4gYWFDYXJkc1NlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1haW4gZWxlbWVudCBleGlzdHMgb24gdGhlIHBhZ2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBidWlsZEFydGljbGVDYXJkcyhjYXJkc0RhdGE6IFdlYkJpdFtdKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgZWFjaCBjYXJkIGluIHRoZSBhcnJheS4gQnVpbGQgdGhlIGNhcmQgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogV2ViQml0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByd2JjYXJkID0gbmV3IFJXQkNhcmQoKTtcbiAgICAgICAgICAgIHJldHVybiByd2JjYXJkLmJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlKTs7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBBQXM7XG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW50ZXJmYWNlIFNjcmlwdFJ1bnRpbWUge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzdGFydE1hcms6IFBlcmZvcm1hbmNlTWFyayxcbiAgICBlbmRNYXJrOiBQZXJmb3JtYW5jZU1hcmssXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHBlcmZvcm1hbmNlIHN0YXJ0IGFuZCBlbmQgbWFya3MuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JpcHRQZXJmIHtcbiAgICBzY3JpcHRydW50aW1lbWFya3M6IFNjcmlwdFJ1bnRpbWUgPSB7XG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIHN0YXJ0TWFyazogbnVsbCxcbiAgICAgICAgZW5kTWFyazogbnVsbFxuICAgIH07XG5cbiAgICAvKiogSW5zdGFudGlhdGluZyBhIFNjcmlwdFBlcmYgcmVjb3JkcyB0aGUgcGVyZm9ybWFuY2Ugc3RhcnQgbWFyay4gQ2FsbCBTcmlwdFBlcmYuZW5kKClcbiAgICAgKiB0byBzZXQgdGhlIGVuZCB0aW1lIHN0YW1wLlxuICAgICovXG4gICAgY29uc3RydWN0b3IoIHNjcmlwdG5hbWU6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUgPSBzY3JpcHRuYW1lO1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5zdGFydE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LXN0YXJ0YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuZCgpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5lbmRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1lbmRgKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlKCk7XG4gICAgfVxuXG4gICAgLyoqIEEgY29uc29sZSBvdXRwdXQgb2YgdGhpcyBvYmplY3QncyBwZXJmb3JtYW5jZSBtZWFzdXJlbWVudC4gKi9cbiAgICBwcml2YXRlIG1lYXN1cmUoKXtcbiAgICAgICAgbGV0IG1lYXN1cmUgPSBwZXJmb3JtYW5jZS5tZWFzdXJlKCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lLCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5zdGFydE1hcmsubmFtZSwgdGhpcy5zY3JpcHRydW50aW1lbWFya3MuZW5kTWFyay5uYW1lKVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coYCR7dGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZX0gZXhlY3V0aW9uIHRpbWUgaXM6ICR7bWVhc3VyZS5kdXJhdGlvbn1gKTtcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKiBcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqIFxuICogVGhlbiwgdGhlIHdpZGdldCBpcyBjcmVhdGVkIGFuZCBUby1Eb3MgYXJlIHJldHJpZXZlZCBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XG4gICAgcHVibGljIHN0YXRpYyB0b2Rvc0luTG9jYWxTdG9yYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBUby1EbyBsaXN0IHdpZGdldCdzIGVsZW1lbnRzLlxuICAgICAqIFxuICAgICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAgICogQHBhcmFtIFRvRG9FbGVtZW50cyBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICAgKiAgdGhlIGxpc3QgbWFya3VwLCBwYXNzaW5nIGluIGEgcmVmZXJlbmNlIGVsZW1lbnQgZm9yIHBsYWNlbWVudCBvZiB0aGUgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gd2lkZ2V0IGlzIHBsYWNlZCBhZnRlciB0aGlzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgICAgICAvL0RlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgICAgICAvL1N3aXRjaCBhZ2FpbnN0IHRoZSBjdXJyZW50IHBhZ2UgdG8gZGV0ZXJtaW5lIG1hcmt1cCBuZWVkZWRcbiAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiVG9Eb0xpc3RcIikpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy8nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL2Rpc3QvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01hcmt1cCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjMgPSB0Zm9vdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvbGlzdFNlY3Rpb24uaWQgPSBcIlRvRE9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIChpdCBpcyBub3Qgc3RvcmVkIGluIGNhY2hlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidUb0RvSXRlbXMnIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVsZW1lbnQgaXMgbm90IHZhbGlkLiBQbGVhc2UgZW5zdXJlIGEgdmFsaWQgZWxlbWVudCBmb3IgVG9EbyBsaXN0IHdpZGdldCB0byBmb2xsb3cuXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIC8vR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldFxuICAgICAgICAvL0VhY2ggd2lkZ2V0IGxvY2F0aW9uJ3MgZWxlbWVudHMgbWF5IHZhcnksIHNvIGEgY2FsbCBvZiBnZXRUb0RvTGlzdEVsZW1lbnRzKClcbiAgICAgICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICAgICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRhYmxlJyksXG4gICAgICAgICAgICB0b2RvVGFibGVCb2R5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyksXG4gICAgICAgICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0RWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIG9yIGZhbHNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUb0RvSW5TdG9yYWdlKCkge1xuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0Nhbm5vdCBnZXQgTG9jYWwgU3RvcmFnZSBcIlRvRG9zLlwiXG4gICAgICAgICAgICAgICVjJHtlLm5hbWV9IFxuICAgICAgICAgICAgICAke2UubWVzc2FnZX0gXG4gICAgICAgICAgICAgICVjJHtlLnN0YWNrfWAsIFwiY29sb3I6IGdyZXlcIiwgXCJjb2xvcjogb3JhbmdlcmVkXCIsIFwiY29sb3I6IHJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQcm9ibGVtIGdldHRpbmcgTG9jYWwgU3RvcmFnZSBrZXk6IFRvRG9zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS4gXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgLy9BZGQgdGhlIFRvRG9zIGFycmF5IHRvIGxvY2FsIGNhY2hlLlxuICAgICAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgICAgICBsZXQgVG9EbzogbG9jYWxzdG9yYWdldG9kb2NhY2hlID0ge1xuICAgICAgICAgICAgaW5DYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB0b2RvaXRlbTogZGVzY3JpcHRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IFRvRG9zOiBhbnkgPSBbXTsgLy9Ub0RvIGFycmF5XG4gICAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG5cbiAgICAgICAgLy9GaXJzdCwgcmVhZCBjdXJyZW50IExvY2FsIFN0b3JhZ2UgVG9Eb3NcbiAgICAgICAgbGV0IHRvZG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHsvL05vdGhpbmcgaW4gc3RvcmFnZSwgcHVzaCBjdXJyZW50XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RvRG9zJywgSlNPTi5zdHJpbmdpZnkoVG9Eb3MpKTtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC50b2Rvc0luTG9jYWxTdG9yYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugey8vQWRkIHRoZSBuZXcgVG9EbyB0byB0aGUgY3VycmVudCBUb0RvcyBhbmQgcHVzaCB2aWEgc2V0SXRlbSgpXG4gICAgICAgICAgICAgICAgdG9kb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBzdG9yaW5nIFRvLWRvIGxpc3QgaXRlbTogXCIsIGVycik7XG4gICAgICAgICAgICBpZihlcnIgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghVG9Eb0xpc3QuaXNUb0RvSW5TdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgICAgICBpZiAodG9kb3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAgICogIEEgcm93IGNvbnNpc3RzIG9mIHRocmVlIGNvbHVtbnM6IGEgY29tcGxldGUgdGljay1ib3gsIGEgZGVzY3JpcHRpb24sIGFuZCBhIGRlbGV0ZSBidXR0b24uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVXNlciBmb3JtIGlucHV0IHRvIGFkZCBhcyBhIGRlc2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZFRvRG9Sb3coZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikge1xuICAgICAgICAvL0NyZWF0ZSBhIHRhYmxlIHJvdyB3aXRoIGNoZWNrYm94IGFuZCBkZWxldGUgb3B0aW9uc1xuICAgICAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHRhYmxlRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTsgLy9BZGQgcm93XG4gICAgICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICAgICAgY29uc3QgbmV3SVRFTSA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0RlbGV0ZScpO1xuICAgICAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIFRvRG9MaXN0LlRvRE9zID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvTGlzdC5Ub0RPcykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0pKCkgOiAoMSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgICAgIFRBQkxFSVRFTS5hcHBlbmRDaGlsZCh0YWJsZUZyYWcpO1xuXG4gICAgICAgICAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5EZWxldGVCdXR0b24oZGVsQk9YKTsgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgd2VyZSBubyAnVG9Eb0l0ZW1zJyBmb3VuZCBvciB0aGV5IGFyZSBudWxsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSB0aGUgVG8tRG8gaXRlbSByb3dzIGZyb20gVG8tRG9zIHN0b3JlZCBpbiB0aGUgYnJvd3NlciBMb2NhbCBTdG9yYWdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVUb0RvTGlzdCgpIHtcbiAgICAgICAgLy9SZXRyaWV2ZSB0b2RvIGl0ZW1zIGluIExvY2FsIFN0b3JhZ2UgYW5kIGFkZCBlYWNoIHRvIHRoZSBsaXN0XG4gICAgICAgIGxldCBwYXJzZWRUb0RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW11cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcGFyc2VkVG9Eb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBpZihlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjQ2Fubm90IGdldCBMb2NhbCBTdG9yYWdlIFwiVG9Eb3MuXCJcbiAgICAgICAgICAgICAgJWMke2UubmFtZX0gXG4gICAgICAgICAgICAgICR7ZS5tZXNzYWdlfSBcbiAgICAgICAgICAgICAgJWMke2Uuc3RhY2t9YCwgXCJjb2xvcjogZ3JleVwiLCBcImNvbG9yOiBvcmFuZ2VyZWRcIiwgXCJjb2xvcjogcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByb2JsZW0gZ2V0dGluZyBMb2NhbCBTdG9yYWdlIGtleTogVG9Eb3NgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZWRUb0RvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZFRvRG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KHBhcnNlZFRvRG9zW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGJ1dHRvbiBmdW5jdGlvbmFsaXR5OiBEZWxldGUsIEFkZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgQUREQlVUVE9OID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEJ1dHRvbjtcbiAgICAgICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgICAgICBpZiAoQUREQlVUVE9OICE9IG51bGwgJiYgQURESVRFTUVOVEVSICE9IG51bGwpIHtcbiAgICAgICAgICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIEFERElURU1FTlRFUi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBlLmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAgICogIG5vdCByZW1vdmVkIGZyb20gc3RvcmFnZSB3aXRob3V0ICdDb21wbGV0ZT8nIGNoZWNrZWJveCBjaGVja2VkLlxuICAgICAqIEBwYXJhbSBib3ggY2hlY2tib3ggZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgRGVsZXRlQnV0dG9uKGJveDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgIT0gbnVsbCAmJiBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIGxldCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD5ib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgbGV0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgICAgIGlmICh0b2RvVGFibGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmJveC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSB0ci5yb3dJbmRleDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZldG9Eb0Zyb21TdG9yYWdlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFibGUnIGVsZW1lbnQgbm90IGZvdW5kIG9yIGl0IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBzZWVkIHRoZSBUby1EbyBMaXN0IHdoZW4gdGhlcmUgYXJlIG5vIExvY2FsIFN0b3JhZ2UgaXRlbXNcbiAgICAgKiAgd2hpY2ggd291bGQgcG9wdWxhdGUgdGhlIGxpc3QuIFRoZSBzYW1wbGUgcmVtYWlucyBvbiBwYWdlIGJ1dCBpcyBuZXZlciBzdG9yZWQgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU2FtcGxlVG9fRG8odGJvZHk6IEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFUb0RvTGlzdC5pc1RvRG9JblN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgZW50cnkgaW4gdGhlIFRvRG8gdGFibGUgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgY29uc3QgdHIyID0gdGJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICAgICAgICAgIFRvRG9MaXN0LlRvRE9zKys7XG5cbiAgICAgICAgICAgIC8vXCJEZWxldGVcIiBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuRGVsZXRlQnV0dG9uKHRkMkRFTCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL0F0dHJpYnV0aW9uTGlua1wiO1xuLyoqXG4gKiBUaGlzIGNsYXNzIGhvbGRzIHRoZSBkYXRhIGZvciAnV2ViQml0JyBhcnRpY2xlIGNhcmRzLiBLZXkgaW5mb3JtYXRpb25cbiAqIG9mIHRoZSBhcnRpY2xlJ3MgY29udGVudHMgYXJlIGNvbnRhaW5lZDogbmFtZSwgZGVzY3JpcHRpb24sIGRhdGEgY3JlYXRlZCxcbiAqIGV0Yy5cbiAqL1xuY2xhc3MgV2ViQml0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGFydGljbGVOdW1iZXI6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBkYXRlQ3JlYXRlZDogRGF0ZTtcbiAgICBhcnRpY2xlTGluazogc3RyaW5nO1xuICAgIGNhcmRJbWFnZTogc3RyaW5nO1xuICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nO1xuICAgIGxpbmtBdHRyaWJ1dGlvbjogQXR0cmlidXRpb25MaW5rO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFydGljbGVOdW1iZXI6IG51bWJlcixcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICAgICBkYXRlQ3JlYXRlZDogRGF0ZSxcbiAgICAgICAgYXJ0aWNsZUxpbms6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nLFxuICAgICAgICBsaW5rQXR0cmlidXRpb24/OiBBdHRyaWJ1dGlvbkxpbmssXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcnRpY2xlTnVtYmVyID0gYXJ0aWNsZU51bWJlcjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmRhdGVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQ7XG4gICAgICAgIHRoaXMuYXJ0aWNsZUxpbmsgPSBhcnRpY2xlTGluaztcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2UgPSBjYXJkSW1hZ2U7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlQUxUID0gY2FyZEltYWdlQUxUO1xuICAgICAgICB0aGlzLmxpbmtBdHRyaWJ1dGlvbiA9IGxpbmtBdHRyaWJ1dGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkJpdDsiXX0=

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

},{"../models/ScriptPerf":30,"./DictionaryWidget":2,"./ToDos":10}],2:[function(require,module,exports){
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

},{"../models/DictionarySearch":23}],3:[function(require,module,exports){
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

},{"../models/ExpandingList":25}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const FlashcardCardElems_1 = require("../models/FlashcardCardElems");
const portnums_1 = require("../data/portnums");
const flashcardgameWidget = {
    init: () => {
        // Establish which port numbers to test and the definition
        // TODO: functions flashcards
        const methoddefinitions = new Map([
            ["charAt()", "Returns a new string of the character at a given index."]
        ]);
        // Create flashcard elements
        let mainFlashCardDivs = new FlashcardCardElems_1.default(portnums_1.default);
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

},{"../data/portnums":18,"../models/FlashcardCardElems":26}],5:[function(require,module,exports){
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

},{"../models/GrowingCard":27}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const navitems_1 = require("../data/navitems");
const ScriptPerf_1 = require("../models/ScriptPerf");
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
            navitems_1.default.map((item) => {
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
            footerPara.textContent = `\u00A9 2022-2023 Random Web Bits. All Rights Reserved.`;
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

},{"../data/navitems":17,"../models/ScriptPerf":30}],7:[function(require,module,exports){
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
const colorcodeurl_1 = require("./colorcodeurl");
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
            // Initialize urlexColorCode components
            case '/pages/url.html':
                colorcodeurl_1.default.URLEXColorCode();
                break;
            // Initialize flashcard components
            case '/flashcards.html':
                FlashcardGameWidget_1.default.init();
                break;
        }
    }
};
exports.default = PageComponents;

},{"../models/ScriptPerf":30,"./ExpandingListDOMWidget":3,"./FlashcardGameWidget":4,"./GrowingCard":5,"./SlideShowWidget":9,"./WebBits":11,"./colorcode":12,"./colorcodeurl":13,"./cssex":14}],8:[function(require,module,exports){
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

},{"../models/ToDo":31}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const data_1 = require("../data/data");
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
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Arbitrary Articles:", "ArbitraryArticles"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Guide Shorts:", "GuideShorts"),
            RandomWebBits_1.RandomWebBits.buildCardContainingSection("Explore the Web:", "ExploretheWeb"),
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

},{"../data/data":16,"../models/RandomWebBits":29}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ColorCode_1 = require("../models/ColorCode");
const htmlexColorCode = {
    HTMLEXColorCode: () => {
        // Get component elements that will be used in widget interactivity
        const openers = document.querySelectorAll(".Tagopen");
        const closers = document.querySelectorAll(".Tagclose");
        const values = document.querySelectorAll(".TextVal");
        const attributes = document.querySelectorAll(".Attribute");
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlesselements = new Array(openers, closers, values, attributes);
        const elementscolors = new Array("var(--clr-WhoIS_Orange)", "var(--clr-Red)", "var(--clr-DarkCyan)", "var(--clr-Green)");
        // Instantiate a color code object with all needed elements
        new ColorCode_1.default(colorlesselements, elementscolors, document.querySelector(".reset"));
    }
};
exports.default = htmlexColorCode;

},{"../models/ColorCode":22}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ColorCode_1 = require("../models/ColorCode");
const urlexColorCode = {
    URLEXColorCode: () => {
        const protocol = document.querySelectorAll(".protocol");
        const domain = document.querySelectorAll(".domain");
        const port = document.querySelectorAll(".port");
        const folder = document.querySelectorAll(".folder");
        const file = document.querySelectorAll(".file");
        const query = document.querySelectorAll(".query");
        const key = document.querySelectorAll(".key");
        const value = document.querySelectorAll(".value");
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlesselements = new Array(protocol, domain, port, folder, file, query, key, value);
        const elementscolors = new Array("var(--clr-WhoIS_Orange)", "var(--clr-Skyblue)", "var(--clr-DarkCyan)", "var(--clr-Green)", "var(--clr-Red)", "var(--clr-primary-600)", "var(--clr-all-primary-500)", "var(--clr-Lightcoral)");
        // Instantiate a color code object with all needed elements
        new ColorCode_1.default(colorlesselements, elementscolors, document.querySelector(".reset"));
    }
};
exports.default = urlexColorCode;

},{"../models/ColorCode":22}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ColorCode_1 = require("../models/ColorCode");
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
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlesselements = new Array(selectors, attributes, values, psuedos);
        const elementscolors = new Array("var(--clr-Red)", "var(--clr-WhoIS_Orange)", "var(--clr-Skyblue)", "var(--clr-Green)");
        // Instantiate a color code object with all needed elements
        new ColorCode_1.default(colorlesselements, elementscolors, document.querySelector(".reset"));
    }
};
exports.default = cssex;

},{"../models/ColorCode":22}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ScriptPerf_1 = require("../models/ScriptPerf");
const mobileAbbrMarkup = {
    init: () => {
        //begin mobile markup
        mobileAbbrMarkup.mobileAbbrMarkups();
    },
    /**
         * Attribute tags on mobile do not have hover option. This function adds a click
         *  ability to define an abbr tag, than rely on the title attribute.
         */
    mobileAbbrMarkups: () => {
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
exports.default = mobileAbbrMarkup;

},{"../models/ScriptPerf":30}],16:[function(require,module,exports){
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
const ArbitraryArticles = new Array(new WebBit_1.default("Domainlookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new WebBit_1.default("Htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2)), new WebBit_1.default("Httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new WebBit_1.default("Webtech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("Jsonobject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("Chatgpt", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new WebBit_1.default("Paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new WebBit_1.default("Boinc", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new WebBit_1.default("IPAddress", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new WebBit_1.default("HTMLMarkup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new WebBit_1.default("Networkspeed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new WebBit_1.default("PowerShelldrives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new WebBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new WebBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon", new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new WebBit_1.default("Webide", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new WebBit_1.default("Disable_Javascript", 26, "Disable JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new WebBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new AttributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new WebBit_1.default("CSSdef", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new AttributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new WebBit_1.default("Latency", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new AttributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)), new WebBit_1.default("HTMLdef", 33, "Create HTML elements", "Learn the parts and syntax of an HTML element", new Date(2023, 7, 25), "pages/html.html", "img/html.webp", "HTML element syntax icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "Create HTML elements", 33)), new WebBit_1.default("URL", 34, "URL Address Examples", "Learn the parts and syntax of a URL", new Date(2023, 8, 7), "pages/url.html", "img/www.webp", "URL example icon", new AttributionLink_1.default("url icons", "Url icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/url", "Flaticon", "Create HTML elements", 34)), new WebBit_1.default("DataStorage", 35, "Data Storage", "Local storage saves data when needed for concurrent page surfing.", new Date(2023, 8, 14), "pages/datastorage.html", "img/server.webp", "Data storage icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "Data Storage", 35)));
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

},{"../models/AttributionLink":21,"../models/WebBit":32}],17:[function(require,module,exports){
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
exports.default = NAVITEMS;

},{"../models/LinkDetails":28}],18:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
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
exports.default = portdefinitions;

},{}],19:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const HeaderFooter_1 = require("./components/HeaderFooter");
const PageComponents_1 = require("./components/PageComponents");
const ClassComponents_1 = require("./components/ClassComponents");
const mobileMarkup_1 = require("./components/mobileMarkup");
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
            mobileMarkup_1.default.init();
            mainperf.end();
        });
    }
};
main.init();

},{"./components/ClassComponents":1,"./components/HeaderFooter":6,"./components/PageComponents":7,"./components/mobileMarkup":15,"./models/ScriptPerf":30}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
    static count = 0;
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
        AttributionLink.count++;
    }
}
exports.default = AttributionLink;

},{"./LinkDetails":28}],22:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class ColorCode {
    elems;
    color;
    resetbtn;
    constructor(colorlesselements, colors, resetbtn) {
        this.elems = colorlesselements;
        this.color = colors;
        this.resetbtn = resetbtn;
        for (let i = 0; i < this.elems.length; i++) {
            this.cssExampleHighlighting(this.elems[i], this.color[i]);
            this.cssExampleHighlightReset(this.elems[i]);
        }
    }
    /**
     * Function to color the example area's elements using css
     * @param elemslist - Node list of HTMLElelements. I.E. using query.SelectorAll()
     * @param color - String of CSS color value
     */
    cssExampleHighlighting(elemslist, color) {
        elemslist.forEach((elem) => {
            elem.addEventListener("mouseover", (event) => {
                event.preventDefault();
                elemslist.forEach((elem) => {
                    elem.style.color = color;
                });
            });
            elem.addEventListener("click", (event) => {
                event.preventDefault();
                elemslist.forEach((elem) => {
                    elem.style.color = "initial";
                });
            });
        });
    }
    //function to reset the css code properties color to original
    cssExampleHighlightReset(elemslist) {
        this.resetbtn.addEventListener("click", () => {
            elemslist.forEach((elem) => {
                elem.style.color = "initial";
            });
        });
    }
}
exports.default = ColorCode;

},{}],23:[function(require,module,exports){
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

},{"../models/API":20,"./DictionarySearchWidget":24}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomWebBits = void 0;
const RWBCard_1 = require("../components/RWBCard");
class RandomWebBits {
    static buildCardContainingSection(sectionTitle, sectionHeadingID) {
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
            aaHeading.innerText = `${sectionTitle}`;
            aaHeading.setAttribute("id", sectionHeadingID);
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

},{"../components/RWBCard":8}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zLnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZXVybC50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwLnRzIiwic3JjL2RhdGEvZGF0YS50cyIsInNyYy9kYXRhL25hdml0ZW1zLnRzIiwic3JjL2RhdGEvcG9ydG51bXMudHMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbHMvQVBJLnRzIiwic3JjL21vZGVscy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvbW9kZWxzL0NvbG9yQ29kZS50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaC50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaFdpZGdldC50cyIsInNyYy9tb2RlbHMvRXhwYW5kaW5nTGlzdC50cyIsInNyYy9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zLnRzIiwic3JjL21vZGVscy9Hcm93aW5nQ2FyZC50cyIsInNyYy9tb2RlbHMvTGlua0RldGFpbHMudHMiLCJzcmMvbW9kZWxzL1JhbmRvbVdlYkJpdHMudHMiLCJzcmMvbW9kZWxzL1NjcmlwdFBlcmYudHMiLCJzcmMvbW9kZWxzL1RvRG8udHMiLCJzcmMvbW9kZWxzL1dlYkJpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsdUNBQXVDO0FBQ3ZDLG1DQUFrQztBQUNsQyx5REFBa0Q7QUFDbEQscURBQThDO0FBRTlDLE1BQU0sZUFBZSxHQUFHO0lBQ3BCLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtRQUVoRixtRUFBbUU7UUFDbkUsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdEUsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7WUFDM0IsMEJBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDNUM7UUFFRCw4REFBOEQ7UUFDOUQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RCxJQUFJLFlBQVksSUFBSSxJQUFJO1lBQ3BCLGVBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMseUJBQXlCO0lBQzlDLENBQUM7Q0FDSixDQUFBO0FBQ0Qsa0JBQWUsZUFBZSxDQUFDOzs7OztBQ3ZCL0IsdUNBQXVDO0FBQ3ZDLGlFQUE2RDtBQUU3RDs7R0FFRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDckI7Ozs7T0FJRztJQUNILElBQUksRUFBRSxDQUFDLElBQWEsRUFBRSxFQUFFO1FBQ3BCLCtCQUErQjtRQUMvQixJQUFJLG1DQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsZ0JBQWdCLENBQUM7Ozs7O0FDbEJo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QUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekU7SUFDTCxDQUFDOztBQWphTCw0QkFrYUM7Ozs7O0FDamJEOzs7O0dBSUc7QUFDSCxNQUFNLE1BQU07SUFDUixFQUFFLENBQVM7SUFDWCxhQUFhLENBQVM7SUFDdEIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBTztJQUNsQixXQUFXLENBQVM7SUFDcEIsU0FBUyxDQUFTO0lBQ2xCLFlBQVksQ0FBUztJQUNyQixlQUFlLENBQWtCO0lBRWpDLFlBQ0ksRUFBVSxFQUNWLGFBQXFCLEVBQ3JCLElBQVksRUFDWixXQUFtQixFQUNuQixXQUFpQixFQUNqQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixZQUFvQixFQUNwQixlQUFpQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQUVELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFRvRG9zV2lkZ2V0IGZyb20gJy4vVG9Eb3MnO1xuaW1wb3J0IERpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9EaWN0aW9uYXJ5V2lkZ2V0JztcbmltcG9ydCBTY3JpcHRQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcblxuY29uc3QgQ2xhc3NDb21wb25lbnRzID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NwZXJmID0gbmV3IFNjcmlwdFBlcmYoXCJDbGFzc2NvbXBvbmVudHNcIik7IC8vYmVnaW4gcGVyZm9ybWFuY2UgbWVhc3VyZVxuXG4gICAgICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpY3Rpb25hcnlXaWRnZXRcIik7XG4gICAgICAgIGlmIChkaWN0aW9uYXJ5RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LmluaXQoZGljdGlvbmFyeUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIFRvRG9zIHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICAgICAgY29uc3QgdG9Eb3NFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Ub0RvTGlzdFwiKTtcbiAgICAgICAgaWYgKHRvRG9zRWxlbWVudCAhPSBudWxsKVxuICAgICAgICAgICAgVG9Eb3NXaWRnZXQuaW5pdCh0b0Rvc0VsZW1lbnQpO1xuICAgICAgICBcbiAgICAgICAgY2xhc3NwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2xhc3NDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoIH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoXCJcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgZGljdGlvbmFyeSB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgRGljdGlvbmFyeVdpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgYnkgY2FsbGluZyB0aGVcbiAgICAgKiAgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKGVsZW06IEVsZW1lbnQpID0+IHtcbiAgICAgICAgLy8gRGljdGlvbmFyeVNlYXJjaCBjb25zdHJ1Y3RvclxuICAgICAgICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBFeHBhbmRpbmdMaXN0RWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvRXhwYW5kaW5nTGlzdFwiO1xuXG5jb25zdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdEVsZW1lbnQsIHsgZXh0ZW5kczogJ3VsJyB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIFwiRE9NXCIgcGFnZSBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIEFkZCBhIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGktc3BhbiB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlPcGVuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpmaXJzdC1jaGlsZGApO1xuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlDbG9zZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46bnRoLWNoaWxkKDMpYCk7XG5cbiAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlcyBmb3IgZXhwYW5kaW5nLWVsZW1lbnQgZXhwYW5kYWJsZSBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaU9wZW5PcGVuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJ1xuICAgICAgICAgICAgICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG9mIGNsb3Npbmcgc3BhbiBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaUNsb3NlU3Bhbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nTGlzdERPTVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEZsYXNoY2FyZENhcmRFbGVtcyBmcm9tICcuLi9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zJ1xuaW1wb3J0IHBvcnRkZWZpbml0aW9ucyBmcm9tICcuLi9kYXRhL3BvcnRudW1zJ1xuXG5jb25zdCBmbGFzaGNhcmRnYW1lV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vIEVzdGFibGlzaCB3aGljaCBwb3J0IG51bWJlcnMgdG8gdGVzdCBhbmQgdGhlIGRlZmluaXRpb25cbiAgICAgICAgLy8gVE9ETzogZnVuY3Rpb25zIGZsYXNoY2FyZHNcbiAgICAgICAgY29uc3QgbWV0aG9kZGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihbXG4gICAgICAgICAgICBbXCJjaGFyQXQoKVwiLCBcIlJldHVybnMgYSBuZXcgc3RyaW5nIG9mIHRoZSBjaGFyYWN0ZXIgYXQgYSBnaXZlbiBpbmRleC5cIl1cbiAgICAgICAgXSk7XG5cblxuICAgICAgICAvLyBDcmVhdGUgZmxhc2hjYXJkIGVsZW1lbnRzXG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkRGl2cyA9IG5ldyBGbGFzaGNhcmRDYXJkRWxlbXMocG9ydGRlZmluaXRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCB0aGUgZ2FtZSdzIHRpdGxlIGVsZW1lbnRcbiAgICAgICAgbGV0IG1haW5GbGFzaENhcmRQYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRmxhc2hDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgZ2FtZXRpdGxlRWxlbSA9IG1haW5GbGFzaENhcmRQYWdlRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgICAgIGdhbWV0aXRsZUVsZW0uaW5uZXJUZXh0ID0gXCJDb21wdXRpbmcgUG9ydCBOdW1iZXJzXCJcblxuICAgICAgICAvLyBBZGQgdGhlIGZsYXNoY2FyZHMgdG8gcGFnZVxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIG1haW5GbGFzaENhcmREaXZzLm1fZmxhc2hjYXJkc0Fycil7XG4gICAgICAgICAgICBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmxhc2hjYXJkZ2FtZVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgR3Jvd2luZ0NhcmRFbGVtZW50IH0gZnJvbSBcIi4uL21vZGVscy9Hcm93aW5nQ2FyZFwiXG5cbmNvbnN0IEFjdGl2ZUNhcmRzV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdncm93aW5nLWNhcmQnLCBHcm93aW5nQ2FyZEVsZW1lbnQsIHsgZXh0ZW5kczogJ2xpJyB9KTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50IHx8IGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTERldGFpbHNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBBcnJheSBvZiBsaXN0IGl0ZW1zIChjYXJkcylcbiAgICAgICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSk7XG5cbiAgICAgICAgICAgIC8vIENsaWNrIGV2ZW50IHRvIHJlc2l6ZSB0aGUgY2FyZHMgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBhIGNhcmRcbiAgICAgICAgICAgIC8vIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSBhIGNhcmQsIHJlc2l6ZSBhbGwgY2FyZHMgdG8gbm9ybWFsXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEl0ZW06IEdyb3dpbmdDYXJkRWxlbWVudCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0ZW1wSXRlbSAmJiAhdGVtcEl0ZW0uY29udGFpbnMoZS50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQodGVtcEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVzaGFkZSBhbGwgY2FyZHMgYmVjYXVzZSBub25lIG9mIHRoZW0gYXJlIGJpZ1xuICAgICAgICAgICAgZm9yIChsZXQgbGkgb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaGFkZUluYWN0aXZlQ2FyZChsaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZUNhcmRzV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgTkFWSVRFTVMgZnJvbSAnLi4vZGF0YS9uYXZpdGVtcydcbmltcG9ydCBTY3JpcHRQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcblxuLyoqXG4gKiBXaWRnZXQgdG8gYWRkIHNpdGUgaGVhZGVyIGFuZCBmb290ZXIuIEluc3RhbnRpYXRlZCBpbiAnTWFpbicgc2NyaXB0LlxuICovXG5jb25zdCBIZWFkZXJGb290ZXIgPSB7XG4gICAgaGVhZGVyV2lkZ2V0OiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaXRlIGhlYWRlciBjb250YWluaW5nIG5hdmlnYXRpb24gbGlua3MgYW5kIHNpdGUgbG9nby5cbiAgICAgICAgICovXG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnBlcmYgPSBuZXcgU2NyaXB0UGVyZihcIkhlYWRlclwiKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIVE1MICdtYWluJyBlbGVtZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICAgICAgLyoqIEhlYWRlciBlbGVtZW50IGNvbnRhaW5lciAqL1xuICAgICAgICAgICAgbGV0IHNpdGVIZWFkZXI6IEVsZW1lbnQgfCBudWxsO1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsKSB7Ly8gJ01haW4nIGVsZW1lbnQgZXhpc3RzLCBhZGQgdGhlIGhlYWRlciB0byBpdFxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBwYWdlTWFpbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcigpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYmVmb3JlICdtYWluJyBlbGVtZW50LmBuXCIsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyAnTWFpbicgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgYWRkIHRoZSBoZWFkZXIgdG8gdGhlIGJvZHlcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBhZnRlciAnYm9keScgZWxlbWVudC5gblwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQXBwZW5kIG5hdmlnYXRpb24gaXRlbXMgdG8gaGVhZGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBwcmVwZW5kIG5hdmlnYXRpb24gaXRlbXMuXCIsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBoZWFkZXJwZXJmLmVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGhlYWRlciB3aXRoIHNpdGUgbG9nbyBhcHBlbmRlZC5cbiAgICAgICAgICogQHBhcmFtIG1haW4gSFRNTCAnbWFpbicgZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJucyBQb3B1bGF0ZWQgaGVhZGVyIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGJ1aWxkSGVhZGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEJhc2ljIEhUTUwgaGVhZGVyIGVsZW1lbnQgY29udGFpbmluZyBsb2dvIChIMSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2lkdGgtbWF4LWNlbnRlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IEgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkgxXCIpO1xuICAgICAgICAgICAgSDEudGV4dENvbnRlbnQgPSAnPFJhbmRvbSBXZWIgQml0cz4nO1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlckNvbnRhaW5lci5hcHBlbmQoSDEpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoc2l0ZUhlYWRlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlSGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZE5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBoZWFkZXIgbmF2aWdhdGlvbiBiYXNlZCBvbiBuYXZpZ2F0aW9uIGRhdGFcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuYXZpZ2F0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXZGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2ID0gaGVhZGVyTmF2RnJhZ1xuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBuYXYgZGF0YSB0byBuYXYgZWxlbWVudHNcbiAgICAgICAgICAgIE5BVklURU1TLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0TGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICAgICAgICAgIGhlYWRlck5hdi5hcHBlbmQobmF2TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBuYXZpZ2F0aW9uIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICAgICAgLy8gRW52aXJvbm1lbnQgbGlua3MgZWRpdCwgcmVxdWlyaW5nIGRpZmZlcmVudCBsaW5rIHJlbGF0aXZlcyB0byBvcGVyYXRlXG4gICAgICAgICAgICAgICAgLy8gR2l0aHViIHBhZ2VzIG9wZXJhdGVzIGZyb20gcmVwb3NpdG9yeSwgbm90ICcvJ1xuICAgICAgICAgICAgICAgIC8vaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyb2Job3dlLWEuZ2l0aHViLmlvJykge1xuICAgICAgICAgICAgICAgICAgICAvL2xpbmsgZGF0YSBlZGl0IGZvciBkZXYgZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgaW4gb3RoZXIgZW52aXJvbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBpdGVtLnRpdGxlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyTmF2RnJhZztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmb290ZXJXaWRnZXQ6IHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm9vdGVycGVyZiA9IG5ldyBTY3JpcHRQZXJmKFwiRm9vdGVyXCIpO1xuXG4gICAgICAgICAgICAvLyBBZGQgZm9vdGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2UgZW5kXG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uKGZvb3RlcikpO1xuXG4gICAgICAgICAgICBmb290ZXJwZXJmLmVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZvb3RlcjogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGZvb3RlclBhcmEudGV4dENvbnRlbnQgPSBgXFx1MDBBOSAyMDIyLTIwMjMgUmFuZG9tIFdlYiBCaXRzLiBBbGwgUmlnaHRzIFJlc2VydmVkLmA7XG5cbiAgICAgICAgICAgIHNpdGVGb290ZXJDb250YWluZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgc2l0ZUZvb3Rlci5hcHBlbmQoc2l0ZUZvb3RlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlRm9vdGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZhdmljb25BdHRyaWJ1dGlvbjogKGZvb3RlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEZhdmljb24gYXR0cmlidXRpb24gc2VjdGlvbiArIGxpbmsgdG8gc291cmNlXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkljb25Ib21lOiAjNDUwMjY3NTVcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9ICdodHRwczovL3d3dy52ZWN0b3JzdG9jay5jb20vcm95YWx0eS1mcmVlLXZlY3Rvci9tYWludGVuYW5jZS1pY29uLWZvci1ncmFwaGljLWFuZC13ZWItZGVzaWduLXZlY3Rvci00NTAyNjc1NSdcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gJ1ZlY3RvclN0b2NrLmNvbSc7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBhdHRyaWJ1dGlvbiB0byBmb290ZXIgcGFyYVxuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEuYXBwZW5kQ2hpbGQoZm9vdGVySWNvbkxpbmspO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckZvb3RlcjtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgZnJvbSAnLi9FeHBhbmRpbmdMaXN0RE9NV2lkZ2V0JztcbmltcG9ydCBBY3RpdmVDYXJkc1dpZGdldCBmcm9tICcuL0dyb3dpbmdDYXJkJztcbmltcG9ydCBmbGFzaGNhcmRnYW1lV2lkZ2V0IGZyb20gJy4vRmxhc2hjYXJkR2FtZVdpZGdldCc7XG5pbXBvcnQgc2xpZGVzaG93V2lkZ2V0IGZyb20gJy4vU2xpZGVTaG93V2lkZ2V0JztcbmltcG9ydCBjc3NleCBmcm9tICcuL2Nzc2V4JztcbmltcG9ydCBodG1sZXhDb2xvckNvZGUgZnJvbSAnLi9jb2xvcmNvZGUnO1xuaW1wb3J0IFJXQkNhcmRzV2lkZ2V0IGZyb20gJy4vV2ViQml0cyc7XG5pbXBvcnQgdXJsZXhDb2xvckNvZGUgZnJvbSAnLi9jb2xvcmNvZGV1cmwnXG5pbXBvcnQgU2NyaXB0UGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbmNvbnN0IFBhZ2VDb21wb25lbnRzID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFnZXBlcmYgPSBuZXcgU2NyaXB0UGVyZihcIlBhZ2Vjb21wb25lbnRzXCIpOyAvL21lYXN1cmUgcGVyZm9ybWFuY2VcblxuICAgICAgICBQYWdlQ29tcG9uZW50cy5DaGVja1BhZ2UoKTtcbiAgICAgICAgcGFnZXBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9LFxuICAgIENoZWNrUGFnZTogKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgLy8nSW5kZXgnIGFuZCAnUGFnZXMnIHJvdXRlcywgYWRkIGNhcmRzIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBSV0JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBkb20uaHRtbCBwYWdlIHVzZXMgZXhwYW5kaW5nTGlzdHMgY29tcG9uZW50XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvZG9tLmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3N2Zy5odG1sJzpcbiAgICAgICAgICAgICAgICBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgd2ViSURFIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3dlYmlkZXMuaHRtbCc6XG4gICAgICAgICAgICAgICAgQWN0aXZlQ2FyZHNXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXNob3cgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2d1aWRlcy9wd2FpY29uLmh0bWwnOlxuICAgICAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIENTU0VYIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9jc3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgY3NzZXguQ1NTRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgaHRtbGV4Q29sb3JDb2RlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9odG1sLmh0bWwnOlxuICAgICAgICAgICAgICAgIGh0bWxleENvbG9yQ29kZS5IVE1MRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdXJsZXhDb2xvckNvZGUgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3VybC5odG1sJzpcbiAgICAgICAgICAgICAgICB1cmxleENvbG9yQ29kZS5VUkxFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBmbGFzaGNhcmQgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2ZsYXNoY2FyZHMuaHRtbCc6XG4gICAgICAgICAgICAgICAgZmxhc2hjYXJkZ2FtZVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgeyBSV0JDYXJkRWxlbWVudHMgfSBmcm9tIFwiLi4vbW9kZWxzL1dpZGdldE1hcmt1cEVsZW1lbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCQ2FyZCB7XG4gICAgLyoqXG4gICAgICogQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJ3YmNhcmRlbGVtZW50czogUldCQ2FyZEVsZW1lbnRzO1xuICAgIC8qKlxuICAgICAqICBNYXAgV2ViQml0IGRhdGEgdG8gYSBjYXJkIGVhY2hcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgKiAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQm9keVwiPlxuICAgICAqICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgIDxwPjwvcD5cbiAgICAgKiAgICAgICAgICA8YSBocmVmPVwiXCI+PC9hPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogIDwvZGl2PlxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZTogV2ViQml0KSB7XG4gICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMgPSB7XG4gICAgICAgICAgICBjYXJkSW1nOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGNhcmRJbWdUb3A6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgY2FyZEJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGxldCBjYXJkQm9keVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGxldCBjYXJkQm9keUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5SGVhZGluZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5UGFyYSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgV2ViQml0LmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgV2ViQml0LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2FydGljbGUuaWR9YCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiLCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBhcnRpY2xlLmNhcmRJbWFnZSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhcnRpY2xlLmNhcmRJbWFnZUFMVCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdBcnRpY2xlJywgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgICAgICBjYXJkQm9keUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYXJ0aWNsZS5hcnRpY2xlTGluaylcbiAgICAgICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcbiAgICAgICAgY2FyZEJvZHlQYXJhLnRleHRDb250ZW50ID0gYXJ0aWNsZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgY2FyZEJvZHlMaW5rLnRleHRDb250ZW50ID0gXCJHbyB0byBQYWdlXCI7XG5cbiAgICAgICAgLy8gSW1hZ2UgYXR0cmlidXRpb24gbWF5IGJlIG5lZWRlZCBmb3IgdGhlIGltYWdlIHVzZWRcbiAgICAgICAgLy8gQXR0cmlidXRpb24gZGF0YSBpcyBpbXBvcnRlZCBhcyAnYXR0cmxpbmtzJyBzaWduYXR1cmUgcGFyYW1ldGVyXG4gICAgICAgIGlmIChhcnRpY2xlLmxpbmtBdHRyaWJ1dGlvbil7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwodGhpcy5yd2JjYXJkZWxlbWVudHMsIGFydGljbGUubGlua0F0dHJpYnV0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgICAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wKTtcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5KTtcblxuICAgICAgICByZXR1cm4gV2ViQml0O1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAgICogb3RoZXJ3aXNlIHRoZSBkYXRhIGlzbid0IGVudGVyZWQsIGNhdXNpbmcgYSBtaXNzXG4gICAgICogXG4gICAgICogIDxkaXYgY2xhc3M9XCJmbGlwLWNhcmRcIj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAqICA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkRnJvbnRcIj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJhY2tcIj5cbiAgICAgKiAgICAgICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCIgY2xhc3M9XCJpbWdTbWFsbCBpbWdQVFJcIj5cbiAgICAgKiAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogQHBhcmFtIHJ3YmNhcmRlbGVtZW50cyBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqIEBwYXJhbSBsaW5rIEF0dHJpYnV0aW9uIGxpbmtcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwocndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHMsIGxpbms6IEF0dHJpYnV0aW9uTGluaykge1xuICAgICAgICBpZiAocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT09IGxpbmsuYXJ0aWNsZWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbWFnZSBiYWNrIHBhbmVsIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgICAgIC8vIFJlZGVmaW5lIGNhcmQgaW1hZ2UgcGFuZWwgYXMgYSBmbGlwIHBhbmVsXG4gICAgICAgICAgICBjb25zdCBjYXJkSW5uZXIgPSByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udCA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChyd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7IC8vIG1vdmUgaW1hZ2Ugd2l0aGluIGNhcmQgZnJvbnQgZGl2aXNvclxuICAgICAgICAgICAgbGV0IHNtYWxsSW1nID0gPEhUTUxJbWFnZUVsZW1lbnQ+cndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgYmFja0hlYWRpbmcgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgY2FyZEJhY2suYXBwZW5kQ2hpbGQoc21hbGxJbWcpO1xuICAgICAgICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVMaW5rID0gcndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTsgLy9hcHBlbmQgdG8gZnJvbnQgcGFuZWxcblxuICAgICAgICAgICAgLy8gQWRkIGZsaXAtcGFuZWwgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIilcbiAgICAgICAgICAgIGNhcmRJbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIik7XG4gICAgICAgICAgICBjYXJkRnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgICAgICAgIHNtYWxsSW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdTbWFsbFwiLCBcImltZ1BUUlwiKTtcbiAgICAgICAgICAgIGNhcmRCYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuY2xhc3NMaXN0LmFkZChcImF0dHJpYnV0ZVwiKTtcbiAgICAgICAgICAgIGJhY2tIZWFkaW5nLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuLy8gQXR0cmlidXRpb246IFJvYmVydCBBIEhvd2VsbCwgTWF5IDIwMjNcbi8vIENvbnRlbnQgZGVyaXZlZCBmcm9tOiBXM1NjaG9vbHMsIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vaG93dG8vaG93dG9fanNfc2xpZGVzaG93LmFzcFxuXG5cbi8qKlxuICogQ29tcG9uZW50IGNyZWF0aW5nIHNsaWRlc2hvdyB3aWRnZXRzXG4gKi9cbmNvbnN0IHNsaWRlc2hvd1dpZGdldCA9IHtcbiAgICBzbGlkZUluZGV4OiAxLFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzbGlkZXNob3cgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE5leHQvcHJldmlvdXMgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gcGx1c1NsaWRlcyhuOm51bWJlcikge1xuICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggKz0gbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFRodW1ibmFpbCBpbWFnZSBjb250cm9sc1xuICAgICAgICBmdW5jdGlvbiBjdXJyZW50U2xpZGUobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBuZXh0IHNsaWRlIHdoZW4gYXJyb3cgYnV0dG9ucyBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dQcmV2aW91c0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93UHJldlwiKTtcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93TmV4dEJ0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93TmV4dFwiKTtcbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd1ByZXZpb3VzQnRucyl7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcygtMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBidG4gb2Ygc2xpZGVTaG93TmV4dEJ0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hhbmdlIHRvIHNlbGVjdGVkIHNsaWRlIHdoZW4gZG90IGFyZSBjbGlja2VkXG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd0RvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICBsZXQgZG90Q291bnRlciA9IDE7XG4gICAgICAgIGZvcihsZXQgZG90IG9mIHNsaWRlU2hvd0RvdHMpe1xuICAgICAgICAgICAgLy9hZGQgZG90IGNvdW50ZXJcbiAgICAgICAgICAgIGRvdC5zZXRBdHRyaWJ1dGUoXCJkb3RpbmRleFwiLCBgJHtkb3RDb3VudGVyfWApXG4gICAgICAgICAgICAvL3doZW4gY2xpY2tlZCwgbmF2aWdhdGUgdG8gdGhlIHNsaWRlIGluZGljYXRlZFxuICAgICAgICAgICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoZG90Q291bnRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvdENvdW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBkb3RDb3VudGVyID0gMTtcbiAgICB9LFxuICAgIHNob3dTbGlkZXM6IChuOiBudW1iZXIpPT57XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlTbGlkZXNcIik7XG4gICAgICAgICAgICBsZXQgZG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XG4gICAgICAgICAgICBpZiAobiA+IHNsaWRlcy5sZW5ndGgpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IDF9XG4gICAgICAgICAgICBpZiAobiA8IDEpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IHNsaWRlcy5sZW5ndGh9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbaV07XG4gICAgICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gZG90c1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGVtcFNsaWRlID0gPEhUTUxEaXZFbGVtZW50PnNsaWRlc1tzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCAtIDFdXG4gICAgICAgICAgICB0ZW1wU2xpZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGRvdHNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXS5jbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVzaG93V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdCB9IGZyb20gXCIuLi9tb2RlbHMvVG9Eb1wiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBUby1EbyBMaXN0IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBUb0Rvc1dpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBUby1EbyBMaXN0IHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnVG9Eb0xpc3QnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKGVsZW06IEVsZW1lbnQpID0+IHtcblxuICAgICAgICAvL1RvRG9MaXN0IGNvbnN0cnVjdG9yXG4gICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgICAgICAvL0NyZWF0ZXMgd2lkZ2V0IG1hcmt1cCBhbmQgcG9wdWxhdGVzIFRvLURvIHRhc2tzIGNvbnRhaW5lZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9Eb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXRUJCSVREQVRBIGZyb20gXCIuLi9kYXRhL2RhdGFcIlxuaW1wb3J0IHsgUmFuZG9tV2ViQml0cyB9IGZyb20gXCIuLi9tb2RlbHMvUmFuZG9tV2ViQml0c1wiXG5cbi8qKlxuICogQ2FyZCB3aWRnZXQgdG8gaW5pdGlhbGl6ZSBhcnRpY2xlIGRhdGEgaW50byBIVE1MIGNhcmQgZWxlbWVudHMuIFRoaXMgd2lkZ2V0IFxuICogY3JlYXRlcyBtdWx0aXBsZSBzZWN0aW9ucyBvZiBjYXJkcyB0byBhZGQgdG8gYSBwYWdlLlxuICovXG5jb25zdCBSV0JDYXJkc1dpZGdldCA9IHtcbiAgICAvKiogQ2FyZHMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gYnJlYWtzIGRvd24gdGhlIGRhdGEgc3RydWN0dXJlIGluIFxuICAgICAqIG9yZGVyIHRvIGZvcm11bGF0ZSB0aGUgYXJ0aWNsZSBkZXRhaWxzIGludG8gb25lIGNhcmQgZm9yIGVhY2ggYXJ0aWNsZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEFydGljbGVzIGhhdmUgZGlmZmVyZW50IGNhdGVnb3JpZXMsIHNvIGVhY2ggY2F0ZWdvcnkgbXVzdCBiZSByZXNwZWN0ZWQuIFxuICAgICAqICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICAvKiogTXVsdGlwbGUgY2F0ZWdvcmllcyBvZiBjYXJkIGRhdGEgZXhpc3QuIFRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBuZWVkZWQgXG4gICAgICAgICAqIHRvIGNyZWF0ZSBjYXRlZ29yeSBzZWN0aW9ucyBkaXZpc2lvbnMgd2hlbiBwbGFjZWQgb24gYSBwYWdlLlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIsIFwiQXJiaXRyYXJ5QXJ0aWNsZXNcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiLCBcIkd1aWRlU2hvcnRzXCIpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4cGxvcmUgdGhlIFdlYjpcIiwgXCJFeHBsb3JldGhlV2ViXCIpLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjYXJkIGRhdGEgKyBhdHRyaWJ1dGlvbiBsaW5rIGRhdGFcbiAgICAgICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMsIG9yIGFydGljbGVzLCBHdWlkZXMsIGFuZCBFeHBsb3Jlc1xuICAgICAgICAvKipUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgb2YgY2FyZCBlbGVtZW50cy4gRWFjaCBpbmRleCBzdG9yZXMgdGhlIGNhcmRzJyBkYXRhXG4gICAgICAgICAqIGZvciBvbmUgY2F0ZWdvcnkgb2YgYXJ0aWNsZXMuICovIFxuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZEFydGljbGVDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICBdO1xuXG4gICAgICAgIFxuICAgICAgICAvLyBSb3V0ZXMgLT4gQWRkIHdpZGdldCBhbmQgZm9ybWF0IHBhZ2VzXG4gICAgICAgIC8vIEluZGV4IChIb21lKSBwYWdlIHNob3J0ZW5zIGVhY2ggc2VjdGlvbiB0byAzIGFydGljbGVzIG9ubHlcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Rpc3QvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgICAgICAvKiogUmFuZG9taXplIHRoZSBvcmRlciBvZiBjYXJkcy4gKi9cbiAgICAgICAgICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFycjogYW55LCBudW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJhbmRvbWl6ZSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZCA9IFsuLi5hcnJdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2h1ZmZsZWQuc2xpY2UoMCwgbnVtKTsgLy8gcmV0dXJuIHRoZSByZXF1ZXN0ZWQgbnVtYmVyIG9mIGVsZW1lbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzBdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1swXSwgNSk7XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzFdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1sxXSwgMyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGNhcmRzIHRvIHRoZSBwYWdlIGJ5IGRlY29uc3RydWN0aW9uIGFuZCBhZGRpdGlvblxuICAgICAgICAvLyBPdXRlciBsb29wOiBpdGVyYXRlIHRoZSBkYXRhIHRvIGVhY2ggcmVzcGVjdGl2ZSBjYXRlZ29yeTogUGFnZXMsIEd1aWRlcywgRXhwbG9yZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYXJkc1NlY3Rpb25baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5uZXIgbG9vcDogaXRlcmF0ZSB0aHJvdWdoIHRoZSBjYXRlZ29yeSBkYXRhXG4gICAgICAgICAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJXQkNhcmRzV2lkZ2V0XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgaHRtbGV4Q29sb3JDb2RlID0ge1xuICAgIEhUTUxFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICAvLyBHZXQgY29tcG9uZW50IGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB1c2VkIGluIHdpZGdldCBpbnRlcmFjdGl2aXR5XG4gICAgICAgIGNvbnN0IG9wZW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRhZ29wZW5cIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGNsb3NlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRhZ2Nsb3NlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRleHRWYWxcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkF0dHJpYnV0ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShvcGVuZXJzLCBjbG9zZXJzLCB2YWx1ZXMsIGF0dHJpYnV0ZXMpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVJlZClcIiwgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHRtbGV4Q29sb3JDb2RlO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ29sb3JDb2RlIGZyb20gJy4uL21vZGVscy9Db2xvckNvZGUnXG5cbmNvbnN0IHVybGV4Q29sb3JDb2RlID0ge1xuICAgIFVSTEVYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm90b2NvbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZG9tYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kb21haW5cIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcnRcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZm9sZGVyXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWxlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlcnlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5XCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmFsdWVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICAgICAgY29uc3QgY29sb3JsZXNzZWxlbWVudHMgPSBuZXcgQXJyYXkocHJvdG9jb2wsIGRvbWFpbiwgcG9ydCwgZm9sZGVyLCBcbiAgICAgICAgICAgIGZpbGUsIHF1ZXJ5LCBrZXksIHZhbHVlKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHNjb2xvcnMgPSBuZXcgQXJyYXkoXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1Ta3libHVlKVwiLCBcbiAgICAgICAgICAgIFwidmFyKC0tY2xyLURhcmtDeWFuKVwiLCBcInZhcigtLWNsci1HcmVlbilcIiwgXCJ2YXIoLS1jbHItUmVkKVwiLCBcbiAgICAgICAgICAgIFwidmFyKC0tY2xyLXByaW1hcnktNjAwKVwiLCBcInZhcigtLWNsci1hbGwtcHJpbWFyeS01MDApXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItTGlnaHRjb3JhbClcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVybGV4Q29sb3JDb2RlO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ29sb3JDb2RlIGZyb20gJy4uL21vZGVscy9Db2xvckNvZGUnXG5cbmNvbnN0IGNzc2V4ID0ge1xuICAgIC8qKlxuICAgICAqIENzc2V4IGlzIGEgd2lkZ2V0IGluIENTUyBwYWdlLCBhcHBseWluZyBzdHlsZSBjb2xvcnMgdG8gZWxlbWVudHMgb2YgZGlmZmVyZW50XG4gICAgICogdHlwZXMgKGJhc2VkIG9uIHRoZSBDU1MgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UpXG4gICAgICovXG4gICAgQ1NTRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5TZWxlY3RvclwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlZhbHVlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBwc3VlZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5Qc3VlZG8tY2xhc3NcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICAgICAgY29uc3QgY29sb3JsZXNzZWxlbWVudHMgPSBuZXcgQXJyYXkoc2VsZWN0b3JzLCBhdHRyaWJ1dGVzLCB2YWx1ZXMsIHBzdWVkb3MpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1SZWQpXCIsIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItU2t5Ymx1ZSlcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjc3NleDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFNjcmlwdFBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnXG5cbmNvbnN0IG1vYmlsZUFiYnJNYXJrdXAgPSB7XG4gICAgaW5pdDogKCkgPT57XG4gICAgICAgIC8vYmVnaW4gbW9iaWxlIG1hcmt1cFxuICAgICAgICBtb2JpbGVBYmJyTWFya3VwLm1vYmlsZUFiYnJNYXJrdXBzKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgICAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICAgICAgICogIGFiaWxpdHkgdG8gZGVmaW5lIGFuIGFiYnIgdGFnLCB0aGFuIHJlbHkgb24gdGhlIHRpdGxlIGF0dHJpYnV0ZS5cbiAgICAgICAgICovXG4gICAgbW9iaWxlQWJick1hcmt1cHM6ICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9iaWxlYWJicnBlcmYgPSBuZXcgU2NyaXB0UGVyZihcIk1vYmlsZWFiYnJwZXJmXCIpOyAvL3N0YXJ0IHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3MgQWJick9wZW57XG4gICAgICAgICAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbGFiYnJldmlhdGlvbmVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFiYnJcIik7XG4gICAgICAgIGlmKGFsbGFiYnJldmlhdGlvbmVsZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgYWJiciBvZiBhbGxhYmJyZXZpYXRpb25lbGVtcyl7XG4gICAgICAgICAgICAgICAgbGV0IGFiYnJldiA9IG5ldyBBYmJyT3BlbigpO1xuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudCA9IGFiYnI7XG5cbiAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFiYnJ0aXRsZWF0dHJ2YWw6IHN0cmluZyA9IGFiYnJldi5hYmJyRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBhYmJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFiYnJldi5hYmJyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPCAxKXsgLy9jcmVhdGUgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gYWJicmV2LmFiYnJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0oJHthYmJydGl0bGVhdHRydmFsfSR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vc2hvdyB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtb2JpbGVhYmJycGVyZi5lbmQoKSAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbW9iaWxlQWJick1hcmt1cDtcbiIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCJcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9BdHRyaWJ1dGlvbkxpbmtcIjtcblxuLy8gQ3JlYXRlIG5ldyBBQSAoQXJiaXRyYXJ5IEFydGljbGUpXG5cbi8qKlxuICogXCJBcmJpdHJhcnkgQXJ0aWNsZXMnIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEFyYml0cmFyeUFydGljbGVzID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRG9tYWlubG9va3VwXCIsXG4gICAgICAgIDEsXG4gICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICBcIkNoZWNrIGFuIGF2YWlsYWJsZSBkb21haW4gdXNpbmcgV2hvSVMgQVBJIHNlYXJjaFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgNCksXG4gICAgICAgIFwicGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2hvaXMud2VicFwiLFxuICAgICAgICBcIldob0lzIExvb2t1cFwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkb21haW4gaWNvbnNcIixcbiAgICAgICAgICAgIFwiRG9tYWluIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RvbWFpblwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgICAgICAxXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvZGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29kZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIdHRwc2NlcnRcIixcbiAgICAgICAgNCxcbiAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBcIlNlbGVjdCB0byB2aWV3IGEgd2Vic2l0ZSdzIEhUVFBTIGNlcnRpZmljYXRlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAyNiksXG4gICAgICAgIFwicGFnZXMvaHR0cHMuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwc19jZXJ0LndlYnBcIixcbiAgICAgICAgXCJDdXJzb3Igc2VsZWN0aW5nIEhUVFBTIGNlcnRpZmljYXRlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJTc2wgY2VydGlmaWNhdGUgaWNvbnMgY3JlYXRlZCBieSBpbmlwYWdpc3R1ZGlvIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICA0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2VidGVjaFwiLFxuICAgICAgICA1LFxuICAgICAgICBcIldhcHBhbHl6ZXJcIixcbiAgICAgICAgXCJXYXBwYWx5emVyIGJyb3dzZXIgZXh0ZW5zaW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDIpLFxuICAgICAgICBcInBhZ2VzL3dlYnRlY2guaHRtbFwiLFxuICAgICAgICBcImltZy93YXBwYWx5emVyLWxvZ28ud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgZXh0ZW5zaW9uIGxvZ28uIEEgd2hpdGUgdyBvbiBhIHB1cnBsZSB0aWxlLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkpzb25vYmplY3RcIixcbiAgICAgICAgNixcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIFwiSlNPTiBvYmplY3Qgbm90YXRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgOSksXG4gICAgICAgIFwicGFnZXMvanNvbm9iamVjdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2pzb24ud2VicFwiLFxuICAgICAgICBcIkpTT04gbG9nbzogQSBncmV5IGNpcmNsZSB3aXRoIGFydGlzdGljIHNwaXJhbHMuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ktRmlcIixcbiAgICAgICAgNyxcbiAgICAgICAgXCJXaS1GaSBWZXJzaW9uXCIsXG4gICAgICAgIFwiRGV0ZXJtaW5lIFdpZmkgVmVyc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAxNiksXG4gICAgICAgIFwicGFnZXMvd2lmaS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dpZmkud2VicFwiLFxuICAgICAgICBcIldpLUZpIGxvZ28gd2l0aCBhIGJsYWNrIGNpcmNsZSBiYWNrZ3JvdW5kLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNoYXRncHRcIixcbiAgICAgICAgOCxcbiAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgXCJDaGF0IHdpdGggYW4gQUkgZm9yIHJlc2VhcmNoIGFuZCBkZXZlbG9wbWVudC5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgICAgICBcInBhZ2VzL2NoYXRncHQuaHRtbFwiLFxuICAgICAgICBcImltZy9haS53ZWJwXCIsXG4gICAgICAgIFwiRGVjb3JhdGl2ZSBBSSBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImFpIGljb25zXCIsXG4gICAgICAgICAgICBcIkFpIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2FpXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgICAgICAgICAgOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInByb3RvdHlwZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJQcm90b3R5cGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBhaW50IDNEXCIsXG4gICAgICAgICAgICA5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgICAgICAxMFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJvaW5jXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkJPSU5DIGljb25zXCIsXG4gICAgICAgICAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vYm9pbmMuYmVya2VsZXkuZWR1XCIsXG4gICAgICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgICAgICAxMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIklQQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSVAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgICAgIDEyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDEzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29ya3NwZWVkXCIsXG4gICAgICAgIDE1LFxuICAgICAgICBcIk5ldHdvcmsgU3BlZWQgVGVzdFwiLFxuICAgICAgICBcIlRlc3QgdGhlIG5ldHdvcmsgYWRhcHRlcnMgd2l0aCBhIFBvd2VyU2hlbGwgc2NyaXB0XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDcpLFxuICAgICAgICBcInBhZ2VzL25ldHdvcmtzcGVlZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3BhZ2Utc3BlZWQud2VicFwiLFxuICAgICAgICBcIlNwZWVkIHRlc3QgZGlhbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUGFnZSBzcGVlZCBpY29ucyBjcmVhdGVkIGJ5IFByb3N5bWJvbHMgUHJlbWl1bSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3BhZ2Utc3BlZWRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAgICAgMTVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQb3dlclNoZWxsZHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICAgICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgICAgICAxN1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19ETlNcIixcbiAgICAgICAgMjAsXG4gICAgICAgIFwiSG93IEROUyB3b3Jrc1wiLFxuICAgICAgICBcIkEgZ2VuZXJhbCBvdmVydmlldyBvZiBEb21haW4gTmFtZSBTeXN0ZW1cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgNCksXG4gICAgICAgIFwicGFnZXMvZG5zLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZG5zLndlYnBcIixcbiAgICAgICAgXCJETlMgZHJhd2luZyBhdHRhY2hlZCB0byBhIGtleWJvYXJkXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJEbnMgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBETlNcIixcbiAgICAgICAgICAgIDIwXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0dvb2dsZVwiLFxuICAgICAgICAyMixcbiAgICAgICAgXCJHb29nbGUgaXMgIzEgd2Vic2l0ZVwiLFxuICAgICAgICBcIkdvb2dsZSBpcyB0aGUgIzEgdHJhZmZpY2tlZCBzaXRlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDE3KSxcbiAgICAgICAgXCJwYWdlcy9nb29nbGUuaHRtbFwiLFxuICAgICAgICBcImltZy9zZWFyY2gtZW5naW5lLndlYnBcIixcbiAgICAgICAgXCJBIGJhciBncmFwaCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInJhbmsgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUmFuayBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsbWVldHVwIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcmFua1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgICAgICAyMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICAyMyxcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgXCJSZXZpZXcgdGhlIERPTSB3aXRoIGEgRE9NIHRyZWVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMjcpLFxuICAgICAgICBcInBhZ2VzL2RvbS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3RyZWUud2VicFwiLFxuICAgICAgICBcIkEgdHJlZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRyZWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVHJlZSBpY29ucyBjcmVhdGVkIGJ5IGp1c3RpY29uIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJET01cIixcbiAgICAgICAgICAgIDIzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViaWRlXCIsXG4gICAgICAgIDI0LFxuICAgICAgICBcIldlYklERVwiLFxuICAgICAgICBcIlRyeSBza2lwcGluZyB0aGUgZG93bmxvYWQgd2l0aCBhIHdlYiBJREVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMyksXG4gICAgICAgIFwicGFnZXMvd2ViaWRlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3V4LndlYnBcIixcbiAgICAgICAgXCJBIGNvbXB1dGVyIGFwcGxpY2F0aW9uIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGVzaWduIGljb25zXCIsXG4gICAgICAgICAgICBcIkRlc2lnbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXNpZ25cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwid2ViaWRlc1wiLFxuICAgICAgICAgICAgMjRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgMjUsXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIFwiRmluZCBhbiBTVkcgYW5kIGxlYXJuIGFib3V0IHRoZSBTVkcgbGFuZ3VhZ2VcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgOSksXG4gICAgICAgIFwicGFnZXMvc3ZnLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc3ZnLnN2Z1wiLFxuICAgICAgICBcIkFuIHN2ZyBpY29uIGV4YW1wbGUuXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNjYWxhYmxlIHZlY3RvciBncmFwaGljc1wiLFxuICAgICAgICAgICAgXCJTVkcgaWNvbiBjcmVhdGVkIGJ5IEhhcnZleSBSYXluZXJcIixcbiAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHL1wiLFxuICAgICAgICAgICAgXCJXM0NcIixcbiAgICAgICAgICAgIFwic3ZnXCIsXG4gICAgICAgICAgICAyNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpc2FibGVfSmF2YXNjcmlwdFwiLFxuICAgICAgICAyNixcbiAgICAgICAgXCJEaXNhYmxlIEphdmFTY3JpcHRcIixcbiAgICAgICAgXCJEaXNhYmxlIHRoZSBKYXZhU2NyaXB0IHRvIHRlc3Qgd2Vic2l0ZSBmdW5jdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyMiksXG4gICAgICAgIFwicGFnZXMvamF2YXNjcmlwdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NvZnR3YXJlLWFwcGxpY2F0aW9uLndlYnBcIixcbiAgICAgICAgXCJBIGphdmFzY3JpcHQgZnVuY3Rpb24gaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwid2ViIGNvZGluZyBpY29uc1wiLFxuICAgICAgICAgICAgXCJXZWIgY29kaW5nIGljb25zIGNyZWF0ZWQgYnkgTXVoYW1tYWQgQXRpZiAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3dlYi1jb2RpbmdcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fSFRUUFwiLFxuICAgICAgICAyOCxcbiAgICAgICAgXCJIVFRQXCIsXG4gICAgICAgIFwiSFRUUCBtYWtlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmcgd2ViIHBhZ2VzIHBvc3NpYmxlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxMiksXG4gICAgICAgIFwicGFnZXMvaHR0cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0dHAud2VicFwiLFxuICAgICAgICBcIkh0dHAgdmVyYiBpbiBmcm9udCBvZiBhIGdsb2JlIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0dHAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHR0cCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odHRwXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBIVFRQXCIsXG4gICAgICAgICAgICAyOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNTU2RlZlwiLFxuICAgICAgICAyOSxcbiAgICAgICAgXCJDU1NcIixcbiAgICAgICAgXCJDU1Mgc3R5bGVzIHRoZSBlbGVtZW50cyB3aXRoaW4gYSBwYWdlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxOSksXG4gICAgICAgIFwicGFnZXMvY3NzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY3NzLTMud2VicFwiLFxuICAgICAgICBcIkEgQ1NTIHRocmVlIGxvZ28uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNzcyBpY29uc1wiLFxuICAgICAgICAgICAgXCJDc3MgaWNvbnMgY3JlYXRlZCBieSBQaXhlbCBwZXJmZWN0IC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY3NzXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNTU1wiLFxuICAgICAgICAgICAgMjlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIDMyLFxuICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgXCJUcmF2ZWwgbGF0ZW5jeSBjYW4gc2xvdyBkb3duIGEgd2Vic2l0ZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMTgpLFxuICAgICAgICBcInBhZ2VzL2xhdGVuY3kuaHRtbFwiLFxuICAgICAgICBcImltZy9jaHJvbm9tZXRlci53ZWJwXCIsXG4gICAgICAgIFwiQSBzdG9wd2F0Y2ggaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGltZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGltZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGltZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAgICAgMzJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MZGVmXCIsXG4gICAgICAgIDMzLFxuICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYW4gSFRNTCBlbGVtZW50XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDI1KSxcbiAgICAgICAgXCJwYWdlcy9odG1sLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHRtbC53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBlbGVtZW50IHN5bnRheCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgICAgICAzM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlVSTFwiLFxuICAgICAgICAzNCxcbiAgICAgICAgXCJVUkwgQWRkcmVzcyBFeGFtcGxlc1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGEgVVJMXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDgsIDcpLFxuICAgICAgICBcInBhZ2VzL3VybC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3d3dy53ZWJwXCIsXG4gICAgICAgIFwiVVJMIGV4YW1wbGUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ1cmwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVXJsIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3VybFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEYXRhU3RvcmFnZVwiLFxuICAgICAgICAzNSxcbiAgICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgICAgXCJMb2NhbCBzdG9yYWdlIHNhdmVzIGRhdGEgd2hlbiBuZWVkZWQgZm9yIGNvbmN1cnJlbnQgcGFnZSBzdXJmaW5nLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA4LCAxNCksXG4gICAgICAgIFwicGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiLFxuICAgICAgICBcImltZy9zZXJ2ZXIud2VicFwiLFxuICAgICAgICBcIkRhdGEgc3RvcmFnZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRhdGEgU3RvcmFnZVwiLFxuICAgICAgICAgICAgMzVcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaHZlcnRpY2Fsc1wiLFxuICAgICAgICAxNCxcbiAgICAgICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICBcIk9wdGltaXplIHlvdXIgc2VhcmNoIGVuZ2luZSBuZXdzIGFuZCByZXN1bHRzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoX3NldHRpbmdzLndlYnBcIixcbiAgICAgICAgXCJTZWFyY2ggc2V0dGluZ3MgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgICAgIDE0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU01UUFwiLFxuICAgICAgICAxNixcbiAgICAgICAgXCJHVUlERTogU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgXCJMZWFybiBFbWFpbCBwcm90b2NvbHMgYW5kIHBvcnQgbnVtYmVyc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAxMyksXG4gICAgICAgIFwiZ3VpZGVzL3NtdHAuaHRtbFwiLFxuICAgICAgICBcImltZy9jb21tdW5pY2F0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiRW1haWwgc2VydmVyLXN0YWNrIHdpdGggbWFpbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgICAgICAxNlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldnRvb2xzXCIsXG4gICAgICAgIDE5LFxuICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgXCJSZXZpZXcgZGV2IHRvb2wncyBhcHBsaWNhdGlvbiB0YWJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjcpLFxuICAgICAgICBcImd1aWRlcy9hcHBsaWNhdGlvbnRhYi5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94LndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgICAgIDE5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGV2dG9vbHN0d29cIixcbiAgICAgICAgMjEsXG4gICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgXCJPcGVuIHRoZSBkZXZlbG9wZXIncyB0b29sYm94IGFub3RoZXIgd2F5XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDEwKSxcbiAgICAgICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gyLndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uIHR3b1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgICAgICAgMjFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQV0FJY29uXCIsXG4gICAgICAgIDI3LFxuICAgICAgICBcIkdVSURFOiBJbnN0YWxsIHRoZSBQV0EgYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiUHJvZ3Jlc3NpdmUgd2Vic2l0ZXMgaGF2ZSBhbiBpbnN0YWxsYXRpb24gb3B0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvcHdhaWNvbi5odG1sXCIsXG4gICAgICAgIFwiaW1nL2FwcC1kZXZlbG9wbWVudC53ZWJwXCIsXG4gICAgICAgIFwiQXBwIGRldmVsb3BtZW50IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGV2ZWxvcG1lbnQgaWNvbnMgY3JlYXRlZCBieSBEZXNpZ24gQ2lyY2xlIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGV2ZWxvcG1lbnRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjdcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDbGVhcmNvb2tpZXNcIixcbiAgICAgICAgMzAsXG4gICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICBcIkRvbid0IHdhc3RlIHRpbWUgc2lmdGluZyB0aHJvdWdoIHNldHRpbmdzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDIpLFxuICAgICAgICBcImd1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29va2llcy53ZWJwXCIsXG4gICAgICAgIFwiQnJvd3NlciBjb29raWUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb29raWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29va2llIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nvb2tpZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAgICAgICAzMFxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogXCJFeHBsb3JlIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEV4cGxvcmUgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJOYXNhXCIsXG4gICAgICAgIDMsXG4gICAgICAgIFwiRVhQTE9SRTogTkFTQSBQYWdlc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIE5BU0EgZG9tYWluLiBMZWFybiBhYm91dCB0aGUgdW5pdmVyc2UgdmlhIE5BU0EgbGlua3NcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDE4KSxcbiAgICAgICAgXCJleHBsb3JlL25hc2EuaHRtbFwiLFxuICAgICAgICBcImltZy9OQVNBLndlYnBcIixcbiAgICAgICAgXCJOQVNBIEFydGVtaXMgTG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJOQVNBXCIsXG4gICAgICAgICAgICBcIkltYWdlIHNvdXJjZSB2aWEgdGhlIE5hdGlvbmFsIEFlcm9uYXV0aWNzIGFuZCBTcGFjZSBBZG1pbmlzdHJhdGlvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5uYXNhLmdvdi9hdWRpZW5jZS9mb3JzdHVkZW50cy81LTgvZmVhdHVyZXMvc3ltYm9scy1vZi1uYXNhLmh0bWxcIixcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJOQVNBIFBhZ2VzXCIsXG4gICAgICAgICAgICAzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbHRvdXJcIixcbiAgICAgICAgMTgsXG4gICAgICAgIFwiRVhQTE9SRTogVmlydHVhbCBUb3Vyc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIHJlYWwgd29ybGQgaW4gYSB3ZWIgYnJvd3NlclwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMyksXG4gICAgICAgIFwiZXhwbG9yZS92aXJ0dWFsdG91ci5odG1sXCIsXG4gICAgICAgIFwiaW1nL2dvb2dsZS1leHBlZGl0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiR29vZ2xlIEV4cGVkaXRpb25zIGxvZ28gZnJvbSBGTEFUSUNPTlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiR29vZ2xlIGV4cGVkaXRpb25zIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2dvb2dsZS1leHBlZGl0aW9uc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAgICAgICAgIDE4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViYlwiLFxuICAgICAgICAzMSxcbiAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZVwiLFxuICAgICAgICBcIlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAzKSxcbiAgICAgICAgXCJleHBsb3JlL3dlYmJ0ZWxlc2NvcGUuaHRtbFwiLFxuICAgICAgICBcImltZy9KV1NUX3Bvc3Rlci53ZWJwXCIsXG4gICAgICAgIFwiSmFtZXMgV2ViYiBzcGFjZSB0ZWxlc2NvcGUgcG9zdGVyIGltYWdlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkhleGFnb24gTGl0aG8gKDIwMTgpXCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb24gcHJvdmlkZWQgYnkgbmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9qd3N0Lm5hc2EuZ292L2NvbnRlbnQvZmVhdHVyZXMvZWR1Y2F0aW9uYWwvcHJpbnQuaHRtbFwiLFxuICAgICAgICAgICAgXCJqd3N0Lm5hc2EuZ292XCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb25cIixcbiAgICAgICAgICAgIDMxXG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBNdWx0aWRpbWVuc2lvbmFsIGFycmF5LiBSb3dzIGFyZSB0aGUgZGlmZmVyZW50IHNlY3Rpb25zLiBDb2x1bW5zXG4gKiBjb250YWluIGVhY2ggYXJ0aWNsZSdzIGRhdGEgYmVsb25naW5nIGluIHRoYXQgc2VjdGlvbi5cbiAqL1xuY29uc3QgV0VCQklUREFUQSA9IFtBcmJpdHJhcnlBcnRpY2xlcywgR3VpZGVTaG9ydHMsIEV4cGxvcmVdXG5cbmV4cG9ydCBkZWZhdWx0IFdFQkJJVERBVEE7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IExpbmtEZXRhaWxzIGZyb20gJy4uL21vZGVscy9MaW5rRGV0YWlscyc7XG5cbi8qKlxuICogSGVhZGVyIG5hdmlnYXRpb24gbGluayBkYXRhXG4gKi9cbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IExpbmtEZXRhaWxzKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pO1xuXG5jb25zdCBnYW1lTmF2TGluayA9IG5ldyBMaW5rRGV0YWlscyhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG4vKiogTmF2aWdhdGlvbiBsaW5rcyAqL1xuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGluaywgZ2FtZU5hdkxpbmtdO1xuZXhwb3J0IGRlZmF1bHQgTkFWSVRFTVM7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuY29uc3QgcG9ydGRlZmluaXRpb25zID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgIFsyMiwgXCJTZWN1cmUgU1NIICAvVENQXCJdLFxuICAgIFsyMywgXCJUZWxuZXQgKHVuc2VjdXJlKVwiXSxcbiAgICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbNDksIFwiVEFDQUNTK1wiXSxcbiAgICBbNTMsIFwiRE5TICAvVURQL1RDUFwiXSxcbiAgICBbNjcsIFwiREhDUFwiXSxcbiAgICBbNjgsIFwiREhDUFwiXSxcbiAgICBbODAsIFwiSFRUUCAgL1RDUFwiXSxcbiAgICBbODgsIFwiS2VyYmVyb3Mtc2VjICAvVENQL1VEUFwiXSxcbiAgICBbMTEwLCBcIlBPUCAtIDk5NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbMTM1LCBcIlJQQ1wiXSxcbiAgICBbMTM3LCBcIk5FVEJJT1NcIl0sXG4gICAgWzEzOCwgXCJORVRCSU9TXCJdLFxuICAgIFsxMzksIFwiTkVUQklPU1wiXSxcbiAgICBbMTQzLCBcIklNQVAgLSA5OTMgZm9yIGVuY3J5cHRlZFwiXSxcbiAgICBbMTYxLCBcIlNOTVAgIE1hbmFnZXJcIl0sXG4gICAgWzE2MiwgXCJTTk1QICBBZ2VudFwiXSxcbiAgICBbMzg5LCBcIkxEQVAgLSA2MzYgZm9yIHNlY3VyZVwiXSxcbiAgICBbNDQzLCBcIkhUVFBTICAvVENQXCJdLFxuICAgIFs0NDUsIFwiU01CICAvVENQXCJdLFxuICAgIFs0NjUsIFwiU01UUCBieSBUTFNcIl0sXG4gICAgWzUxNCwgXCJTWVNMT0cgIC9VRFBcIl0sXG4gICAgWzU4NywgXCJTTVRQUyBTVEFSVFRMU1wiXSxcbiAgICBbNjM2LCBcIkxEQVAgU1NMXCJdLFxuICAgIFs5OTAsIFwiRlRQU1wiXSxcbiAgICBbOTkzLCBcIklNQVAgVExTXCJdLFxuICAgIFs5OTUsIFwiUE9QIFRMU1wiXSxcbiAgICBbMTgxMiwgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgIFsxODEzLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgWzMyNjksIFwiTWljcm9zb2Z0IEdsb2JhbCBDYXRhbG9nXCJdLFxuICAgIFszMzg5LCBcIlJEUFwiXSxcbl0pO1xuZXhwb3J0IGRlZmF1bHQgcG9ydGRlZmluaXRpb25zO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBIZWFkZXJGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlckZvb3Rlcic7XG5pbXBvcnQgUGFnZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzJztcbmltcG9ydCBDbGFzc0NvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL0NsYXNzQ29tcG9uZW50cyc7XG5pbXBvcnQgbW9iaWxlQWJick1hcmt1cCBmcm9tICcuL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwJ1xuaW1wb3J0IFNjcmlwdFBlcmYgZnJvbSAnLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuY29uc3QgbWFpbnBlcmYgPSBuZXcgU2NyaXB0UGVyZihcIm1haW5cIik7XG5cbi8vIGVudHJ5IHBvaW50XG4vKipcbiAqIFR5cGVTY3JpcHQgZW50cnkgcG9pbnQuIFRoaXMgc2NyaXB0IGluaXRpYWxpemVzIHBhZ2UgY29tcG9uZW50cyBhbmQgbW9kZWxzIGFzXG4gKiAgdGhleSdyZSBuZWVkZWQgbWFpbi5pbml0KCkgaXMgdGhlIGluaXRpYWxpemF0aW9uIG9mIFwidHlwZXNjcmlwdC5qc1wiLlxuICovXG5jb25zdCBtYWluID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgcGFnZSB3aWRnZXRzIGFuZCBhcHBsaWNhdGlvbiBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gRXZlbnQgZmlyZWQgYmVmb3JlIGFzc2V0cyBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2VcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBhbmQgZm9vdGVyIGNvbXBvbmVudHNcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgcGFnZSBjb21wb25lbnRzXG4gICAgICAgICAgICBQYWdlQ29tcG9uZW50cy5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZWxlbWVudCBjb21wb25lbnRzXG4gICAgICAgICAgICBDbGFzc0NvbXBvbmVudHMuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyA8YWJicj48L2FiYnI+IHN0eWxlczogaW1wbGVtZW50ZWQgZm9yIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICBtb2JpbGVBYmJyTWFya3VwLmluaXQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWFpbnBlcmYuZW5kKCk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcbn07XG5cbm1haW4uaW5pdCgpO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogYXBpR0VUIGlzIGZvciBmZXRjaCByZXF1ZXN0cy4gVXNlIGFuIGFwaUdFVCBvYmplY3QgdG8gbWFuaXB1bGF0ZSB0aGUgZmV0Y2hcbiAqICByZXF1ZXN0IGludG8gZWl0aGVyOlxuICpcbiAqIDEuIHJldHVybmluZyBkYXRhXG4gKlxuICogLS1vciAtLVxuICpcbiAqIDIuIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gdGhlIGJyb3dzZXIgY2FjaGUgdG8gcmV0cmlldmUgbGF0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gIHByaXZhdGUgR0VUVVJMOiBVUkw7XG4gIHByaXZhdGUgc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByZWNlaXZlZERhdGE6IGFueTsgLy9UT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnN0cnVjdG9yIGdhdGhlcnMgYWxsIHRoZSBuZWVkZWQgaW5mb3JtYXRpb24gZm9yIGZldGNoIGFuZC9vciBicm93c2VyXG4gICAqICBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gc2VuZFRvQnJvd3NlckNhY2hlICAtIEJvb2xlYW4gdmFsdWUgZGV0ZXJtaW5pbmcgZmV0Y2ggY2FjaGluZy5cbiAgICogQHBhcmFtIGJyb3dzZXJDYWNoZU5hbWUgLSBJZiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIGJyb3dzZXIgY2FjaGUsIHRoaXMgc3RyaW5nIHByb3ZpZGVzIHRoZSBuYW1lIGZvciBzdG9yYWdlLlxuICAgKiBAcGFyYW0gZXJyb3JFbGVtIC0gU2hvdWxkIHRoZSBmZXRjaCByZXF1ZXN0IGZhaWwsIHJldHVybiBlcnJvciBzdGF0dXMgdG8gdGhpcyBlbGVtZW50LlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgR0VUVVJMOiBVUkwsXG4gICAgc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuLFxuICAgIGVycm9yRWxlbTogSFRNTEVsZW1lbnQsXG4gICAgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IHNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICB0aGlzLmJyb3dzZXJDYWNoZU5hbWUgPSBicm93c2VyQ2FjaGVOYW1lO1xuICAgIHRoaXMuZXJyb3JFbGVtID0gZXJyb3JFbGVtO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAqL1xuICBwdWJsaWMgZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLkdFVFVSTFxuICAgKi9cbiAgcHVibGljIGdldEdFVFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy5HRVRVUkw7XG4gIH1cblxuICAvKipcbiAgICogRmxpcCB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSBib29sZWFuIHZhbHVlIGZyb20gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgc2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZldGNoIHJlcXVlc3QgY2FuIHRha2UgVVJMIG9yIHN0cmluZyBwYXJhbWV0ZXIuIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYXBpR0VUXG4gICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKi9cbiAgcHVibGljIHNldEdFVFVSTChHRVRVUkw6IFVSTCB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgR0VUVVJMID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLkdFVFVSTCA9IG5ldyBVUkwoR0VUVVJMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSByZXF1ZXN0ZWQgcmVzcG9uc2UgaXMgb2YgdmFsaWQgc3RhdHVzICdPSycgYW5kICcyMDAnXG4gICAqIEBwYXJhbSByZXMgLSB0aGUgZmV0Y2hlZCByZXNwb25zZS5cbiAgICogQHJldHVybnMgLSByZXR1cm5zIHJlcy5qc29uKCkgb24gc3VjY2VzcyBvciByZXR1cm5zIHJlc3BvbnNlIG9uIGZhaWx1cmUuXG4gICAqL1xuICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gNDA0KSB7XG4gICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICghcmVzLm9rIHx8IHJlcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLm9rICsgXCI6IFwiICsgcmVzLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZldGNoIHJlcXVlc3QsIHJldHVybmluZyBhIGZldGNoIHByb21pc2UuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGEudGV4dCgpIG9yIGRhdGEgYmFzZWQgb24gdGhlIGluc3RhbmNlIHJldHVybmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERhdGEoR0VUVVJMOiBVUkwpIHtcbiAgICByZXR1cm4gZmV0Y2goR0VUVVJMKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHB1YmxpYyBmdW5jdGlvbiBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAqICB0aGUgcmVxdWVzdCBuZWVkcyBhZGRlZCB0byBicm93c2VyIHN0b3JhZ2UsIHRoZSBmZXRjaCBpcyBtYWRlIGFuZCBzZW50IHRvXG4gICAqICBzdG9yYWdlLiBBIGNsb25lZCBjb3B5IG9mIHRoZSBmZXRjaGVkIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGlzXG4gICAqICBzZW50IHRvIHRoZSBjYWNoZS4gV2l0aG91dCBzZW5kaW5nIHRvIGJyb3dzZXIgY2FjaGUsIHRoZSBmZXRjaCBpcyByZXF1ZXN0ZWQgYW5kIFxuICAgKiByZXR1cm5lZC5cbiAgICogIFxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYXBpR0VUKEdFVFVSTDogVVJMKSB7XG4gICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgY2FjaGUgc3RvcmFnZVxuICAgIGlmICh0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSkge1xuICAgICAgLy9UaGUgcmV0dXJuZWQgZGF0YSBpcyBwYWNrYWdlcyBhcyBhIFByb21pc2Ugb2JqZWN0XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgLy9PcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvL05vIG1hdGNoZXMgZm9yIHRoaXMgcmVxdWVzdCBpbiBTdG9yYWdlIENhY2hlLCBzbyBmZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgIC8vVXBvbiBzdWNjZXNzLCBhIGNsb25lZCBjb3B5IHdpbGwgbmVlZCB0byBiZSByZXR1cm5lZC5cbiAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy9Db3B5IHRoZSByZXNwb25zZSBzaW5jZSBpdCBjYW4gb25seSBiZSByZWFkIG9uY2VcbiAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRyZXNwID0gcmVzdWx0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgIC8vQWRkIHRoZSByZXN1bHQgdG8gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICBjYWNoZS5wdXQoR0VUVVJMLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRyZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlID0+IHsvL0Nhbm5vdCBvcGVuIFN0b3JhZ2UgQ2FjaGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHsvL0F0dGVtcHQgcmF3IGZldGNoXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb21pc2UgZXJyb3Igb24gZGF0YSBmZXRjaC5cIikpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy9UaGUgcHJvbWlzZSBoYXMgcmVzb2x2ZWQgLS0+IHJldHVybiB0aGUgcHJvbWlzZSBkYXRhXG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSk7XG4gICAgICB9KTtcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBMaW5rRGV0YWlscyBmcm9tIFwiLi9MaW5rRGV0YWlsc1wiO1xuXG4vKiogXG4gKiBVc2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxuKi9cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIExpbmtEZXRhaWxzIHtcbiAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgIHB1YmxpYyBhdHRyaWJ1dGVkb3duZXI6IHN0cmluZztcbiAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgIHB1YmxpYyBhcnRpY2xlaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKkxpbmsgdGl0bGUgKi9cbiAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgLyoqTGluayBpbm5lciB0ZXh0ICovXG4gICAgICAgIGlubmVyVGV4dDogc3RyaW5nLFxuICAgICAgICAvKiogbGluayBocmVmICovXG4gICAgICAgIGhSZWZlcmVuY2U6IHN0cmluZyxcbiAgICAgICAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgICAgICAgYXR0cmlidXRlZG93bmVyOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgcGFnZSAqL1xuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVkb3duZXIgPSBhdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgIHRoaXMuYXJ0aWNsZWlkID0gYXJ0aWNsZWlkO1xuICAgICAgICBBdHRyaWJ1dGlvbkxpbmsuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluaztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvckNvZGUge1xuICAgIGVsZW1zOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PltdO1xuICAgIGNvbG9yOiBzdHJpbmdbXTtcbiAgICByZXNldGJ0bjogRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvciAoY29sb3JsZXNzZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W10sIGNvbG9yczogc3RyaW5nW10sIHJlc2V0YnRuOiBFbGVtZW50KXtcbiAgICAgICAgdGhpcy5lbGVtcyA9IGNvbG9ybGVzc2VsZW1lbnRzO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3JzO1xuICAgICAgICB0aGlzLnJlc2V0YnRuID0gcmVzZXRidG47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRpbmcodGhpcy5lbGVtc1tpXSwgdGhpcy5jb2xvcltpXSk7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRSZXNldCh0aGlzLmVsZW1zW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbG9yIHRoZSBleGFtcGxlIGFyZWEncyBlbGVtZW50cyB1c2luZyBjc3NcbiAgICAgKiBAcGFyYW0gZWxlbXNsaXN0IC0gTm9kZSBsaXN0IG9mIEhUTUxFbGVsZW1lbnRzLiBJLkUuIHVzaW5nIHF1ZXJ5LlNlbGVjdG9yQWxsKClcbiAgICAgKiBAcGFyYW0gY29sb3IgLSBTdHJpbmcgb2YgQ1NTIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodGluZyAoZWxlbXNsaXN0OiAgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sIGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL2Z1bmN0aW9uIHRvIHJlc2V0IHRoZSBjc3MgY29kZSBwcm9wZXJ0aWVzIGNvbG9yIHRvIG9yaWdpbmFsXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KCBlbGVtc2xpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KXtcbiAgICAgICAgdGhpcy5yZXNldGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuLi9tb2RlbHMvQVBJXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZHZhbHVlIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBmcm9tIFwiLi9EaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0XCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoIGlzIGEgc2V0IG9mIG1hcmt1cCBjcmVhdGlvbiBhbmQgZnVuY3Rpb25zIHdoaWNoIGFsbG93IGEgdXNlclxuICogIHRvIGxvb2sgdXAgYSB3b3JkIGxpa2UgYSBEaWN0aW9uYXJ5LiBXaGVuIGNhbGxlZCwgdGhlIHVzZXIncyBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAqICBhcyBhbiBhY2NlcHRhYmxlIHdvcmQgb3IgaXQgZGVjbGluZXMgdGhlIHJlcXVlc3QsIHRoZW4gc2hvd2luZyB0aGUgdXNlciBpZiB0aGUgd29yZFxuICogIGlzIGFjY2VwdGFibGUuXG4gKlxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICoga25vd24gcGxhY2VtZW50IGxvY2F0aW9uKSB0aGF0IGNvbnRhaW5zIHRoZSAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3MuXG4gKlxuICogICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAqXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaCBleHRlbmRzIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQge1xuICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3Q6IHN0cmluZyA9IFwiUldCX3dvcmRfZmV0Y2hcIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVxdWVzdFVybDogc3RyaW5nID1cbiAgICBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNOb3RGb3VuZE9uY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcbiAgcHJpdmF0ZSBkaWN0aW9uYXJ5U2VhcmNoTWFya3VwOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHM7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgY3JlYXRlcyBhbGwgdGhlIGZ1bmN0aW9uYWxpdHkgYW5kIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICAgKiAgRGljdGlvbmFyeSBTZWFyY2ggd2lkZ2V0IGludGVyZmFjZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW52b2tlIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcigpO1xuICAgIC8vQ2FsbCBjcmVhdGlvbiBmb3IgYWxsIHRoZSBtYXJrdXAgbmVlZGVkIHRvIGJlZ2luIHRoZSB3aWRnZXRcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAgPSB0aGlzLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbSk7XG4gICAgLy9Jbml0aWFsaXplIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuYWRkV2lkZ2V0RXZlbnRzKCk7XG4gICAgRGljdGlvbmFyeVNlYXJjaC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgTG9jYWwgU3RvcmFnZSB3b3JkcyBwcmV2aW91c2x5IHN0b3JlZCB3aXRoIHRoZSBEaWN0aW9uYXJ5IFNlYXJjaCBXaWRnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgLSB0aGVzZSBhcmUgdGhlIHdvcmRzIHN0b3JlZCBwcmV2aW91c2x5IGluIHRoZVxuICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAvL0xvY2FsIFN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtcyBkYXRhIGFzc2lnbm1lbnRcbiAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VTdHI6IHN0cmluZztcbiAgICB0cnl7XG4gICAgICBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpe1xuICAgICAgaWYoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlY0Nhbm5vdCBnZXQgTG9jYWwgU3RvcmFnZSBcIndvcmQtY2FjaGVzLlwiXG4gICAgICAgICVjJHtlLm5hbWV9IFxuICAgICAgICAke2UubWVzc2FnZX0gXG4gICAgICAgICVjJHtlLnN0YWNrfWAsIFwiY29sb3I6IGdyZXlcIiwgXCJjb2xvcjogb3JhbmdlcmVkXCIsIFwiY29sb3I6IHJlZFwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgUHJvYmxlbSBnZXR0aW5nIExvY2FsIFN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2ApXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdG9yYWdlU3RyICE9IG51bGwgJiYgc3RvcmFnZVN0ciAhPSBcIltdXCIpIHtcbiAgICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHIpO1xuICAgICAgcmV0dXJuIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvL1RoZSBMb2NhbCBTdG9yYWdlIGlzIG51bGwgLS0+IENvbmZpcm0gaGVyZSB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGFueSBDYWNoZSBTdG9yYWdlIGl0ZW1zIGluIGVycm9yXG4gICAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdyl7XG4gICAgICAgICAgICBpZiAod2luZG93LmNhY2hlcy5oYXMoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCkpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jYWNoZXMuZGVsZXRlKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZFVSTFxuICAgKi9cbiAgcHVibGljIGdldFdvcmRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgZmV0Y2hlZCB3b3JkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGFuZCBrZXlwcmVzcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHdpZGdldC4gSW5wdXQgZXZlbnQgbGlzdGVuZXJzICdjbGljaydcbiAgICogIGFuZCAna2V5cHJlc3MnIGF3YWl0IGZvciBhIHNlYXJjaCBjYWxsLiBBbHNvLCBzaG91bGQgYSB1c2VyIHdhbnQgdG8gc2VhcmNoIGFcbiAgICogIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZCwgdGhlIHdpZGdldCBhZGFwdHMgbWFya3VwIGZvciB0aGF0IHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGFkZFdpZGdldEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0FkZCBmb3JtIGlucHV0IGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICB0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLmRpY3Rpb25hcnlTZWFyY2hNYXJrdXAsIGZhbHNlLCBudWxsKTtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImtleXByZXNzXCIsXG4gICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIC8vXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAvL0NsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgIHRoaXMuZGljdGlvbmFyeVNlYXJjaE1hcmt1cC5wcmV2aW91c1dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgICAgIGxldCBuZXdCdXR0b25Db250YWluZXI6IEVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgbmV3QnV0dG9uQ29udGFpbmVyID0gcGxhY2VtZW50bG9jYXRpb25ob2xkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBuZXdCdXR0b25Db250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgICAgICAgICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0b3IgYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgICAgICAgICAgIC8vbmVlZGVkIHRvIGRpc3BsYXkgdGhvc2Ugd29yZHMuIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpZGdldCBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAgICAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lciA9IG5ld0J1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID1cbiAgICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSA9XG4gICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgICAgICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgIFwiZGljdGlvbmFyeS1idG5cIixcbiAgICAgICAgICAgICAgICAgIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy93aGVuIGNsaWNrZWQsIGZpcmUgYSB3b3JkIHNlYXJjaFxuICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLCB0cnVlLCB3b3JkQ2FjaGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vTU9CSUxFXG4gICAgICAgICAgICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICBcInRvdWNoc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgXCJtb3VzZWxlYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICAgICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgXCJtb3VzZW92ZXJcIixcbiAgICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgICBcIm1vdXNlbGVhdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKFxuICAgICAgICAgICAgICAgICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzTm90Rm91bmRPbmNlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9Xb3Jkc0hlYWRpbmdFbGVtID0gbmV3QnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgICAgICBcImRpY3Rpb25hcnktYnRuXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW5vdGZvdW5kXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICAgICAgICBcIlByZXZpb3VzIHdvcmRzIG5vdCBmb3VuZC4gVGhlIGNhY2hlIGlzIGVtcHR5LlwiO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc05vdEZvdW5kT25jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHdvcmQgdG8gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGNvbnRhaW5pbmcgd29yZCBkYXRhLCBVUkwsIGFuZCBjYWNoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdldmFsdWUgLSBUaGlzIGludGVyZmFjZSBzdG9yZXMgaW5mb3JtYXRpb24gd2hlcmUgc2VuZGluZyB0byBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXZhbHVlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWUpIHtcbiAgICBsZXQgd29yZFN0b3JlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXSA9IFtdO1xuICAgIHdvcmRTdG9yZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcblxuICAgIC8vQWRkIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2VcbiAgICB0cnkge1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIikgPT0gbnVsbCkge1xuICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KHdvcmRTdG9yZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0FkZCB3b3JkIHRvIGN1cnJlbnQgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCInd29yZC1jYWNoZXMnIHZhbHVlcyBhcmUgbnVsbC4gVHJ5IGNsZWFyaW5nIGJyb3dzZXIgY2FjaGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkdmFsdWVbXSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XG4gICAgICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gbG9jYWxzdG9yYWdldmFsdWUud29yZFVSTCkge1xuICAgICAgICAgICAgLy9Xb3JkIGlzIGFscmVhZHkgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIGFsbGNhY2hlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KGFsbGNhY2hlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICBpZihlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKXtcbiAgICAgICAgY29uc29sZS5sb2coYCVjQ2Fubm90IGdldCBMb2NhbCBTdG9yYWdlIFwid29yZC1jYWNoZXMuXCJcbiAgICAgICAgJWMke2UubmFtZX0gXG4gICAgICAgICR7ZS5tZXNzYWdlfSBcbiAgICAgICAgJWMke2Uuc3RhY2t9YCwgXCJjb2xvcjogZ3JleVwiLCBcImNvbG9yOiBvcmFuZ2VyZWRcIiwgXCJjb2xvcjogcmVkXCIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBQcm9ibGVtIGdldHRpbmcgTG9jYWwgU3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcHJldmlvdXMgd29yZCBkYXRhIGZyb20gYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgLS0+IEtleS9WYWx1ZVxuICAgKiBkYXRhIHJlZmVyZW5jaW5nIGlmIHdvcmRzIGFyZSBpbiBsb2NhbCBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXdvcmQgLSBzdHJpbmcgZnJvbSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIiBidXR0b25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXdvcmQ6IHN0cmluZykge1xuICAgIC8vUmVtb3ZlIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2UsIENhY2hlIFN0b3JhZ2VcbiAgICB0cnkge1xuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIikgPT0gbnVsbCkge1xuICAgICAgICAvL05vIHdvcmRzIGluIHN0b3JhZ2UsIHRoZXJlJ3MgYmVlbiBhbiBlcnJvciFcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzdG9yZWQgd29yZHMsIHJlZnJlc2ggdGhlIHBhZ2UhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0dldCB0aGUgd29yZHMgYXJyYXkgZnJvbSBMb2NhbCBTdG9yYWdlXG4gICAgICBsZXQgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBpZiAoc3RvcmFnZVN0ciA9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgXCInd29yZC1jYWNoZXMnIHZhbHVlcyBhcmUgbnVsbC4gVHJ5IGNsZWFyaW5nIGJyb3dzZXIgY2FjaGUuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlbW92ZVVSTDogVVJMO1xuICAgICAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSkge1xuICAgICAgICAgIGlmICh3b3JkQ2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgICAgICByZW1vdmVVUkwgPSB3b3JkQ2FjaGUud29yZFVSTDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkwpO1xuXG4gICAgICAgIC8vUmVtb3ZlIHRoZSB3b3JkIGZyb20gTG9jYWwgU3RvcmFnZSB3b3JkIGFycmF5LCByZXR1cm4gd29yZHMgdG8gc3RvcmFnZVxuICAgICAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmR2YWx1ZVtdID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyKTtcbiAgICAgICAgZm9yIChsZXQgY2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgICAgICBpZiAoY2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgICAgICBhbGxjYWNoZS5zcGxpY2UoYWxsY2FjaGUuaW5kZXhPZihjYWNoZSksIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIEpTT04uc3RyaW5naWZ5KGFsbGNhY2hlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gcmVtb3ZpbmcgdGhlIHdvcmQuIEVycm9yOiBcIiwgZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmV0Y2ggcmVxdWVzdCBmcm9tIENhY2hlIFN0b3JhZ2UuIFV0aWxpemVzIFxuICAgKiBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0IGZvciBjYWNoZSBuYW1lLlxuICAgKiBAcGFyYW0gcmVtb3ZlVVJMIFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkw6IFVSTCkge1xuICAgIHdpbmRvdy5jYWNoZXNcbiAgICAub3BlbihEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KVxuICAgIC50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgY2FjaGVzLm1hdGNoKHJlbW92ZVVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBtYXRjaGluZyB0aGUgcmVzdWx0LiBSZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgICBjYWNoZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5kZWxldGUocmVtb3ZlVVJMKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzdHJ1Y3R1cmVzIHdpdGggd29yZCBkZWZpbml0aW9uIHJlcXVlc3QgYW5kIGluc3RhbnRpYXRlcyBhcGlHRVQoKS4gVGhlIFxuICAgKiBwcm9taXNlIHJldHVybiBkYXRhIHN0cnVjdHVyZXMgdGhlIHdpZGdldCBtYXJrdXAuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgc2VhcmNoZWQgZnJvbSB3aWRnZXQgaW5wdXQuXG4gICAqIEBwYXJhbSB3b3JkVXJsIC0gVGhlIGZldGNoIHJlcXVlc3QgVVJMLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHNlbmRUb0NhY2hlIC0gPyBTZW5kIGZldGNoIHJlcXVlc3QgdG8gQ2FjaGUgU3RvcmFnZSA6IEZldGNoIHdpdGhvdXQgc3RvcmluZyB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIGNhY2hlTmFtZSAtIElmIHNlbmRpbmcgZmV0Y2ggcmVxdWVzdHMgdG8gY2FjaGUsIHByb3ZpZGUgYSBuYW1lIHRvIHN0b3JlIGl0IHVuZGVyLlxuICAgKiBAcmV0dXJucyAtIHdvcmREYXRhOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwcml2YXRlIGZldGNoRGljdGlvbmFyeVRlcm0oXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVcmw6IFVSTCxcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIHNlbmRUb0NhY2hlOiBib29sZWFuLFxuICAgIGNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICAvL0EgZnVuY3Rpb24gY2FsbCBwYXJhbWV0ZXIgb3B0aW9uIGlzIHRvIHN0b3JlIHRoZSB3b3JkIHJlcXVlc3QgaW4gYnJvd3NlcidzIENhY2hlIFN0b3JhZ2VcbiAgICAvL1N0cnVjdHVyZSB0aGUgd29yZCBkYXRhIHZpYSAnbG9jYWxzdG9yYWdld29yZHZhbHVlJyBpbnRlcmZhY2UgdXNlZCB0aHJvdWdob3V0IGZldGNoaW5nXG4gICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZHZhbHVlID0ge1xuICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICB3b3JkOiB3b3JkLFxuICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgIH07XG5cbiAgICAvL0FzeW5jaHJvbm91cyBmZXRjaCByZXFldXN0IGFuZCBkeW5hbWljIG1hcmt1cCBjcmVhdGlvbiBmcm9tIHRoZSBkYXRhJ3MgcmV0dXJuXG4gICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vQ2FsbCBhcGlHRVQoKSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgIGNvbnN0IHdvcmRGZXRjaCA9IG5ldyBhcGlHRVQoXG4gICAgICAgIHdvcmRjYWNoZS53b3JkVVJMLFxuICAgICAgICB3b3JkY2FjaGUuaW5DYWNoZSxcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLFxuICAgICAgICB3b3JkY2FjaGUuY2FjaGVOYW1lXG4gICAgICApO1xuICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9XG4gICAgICBsZXQgd29yZERhdGE6IGFueSA9IGRhdGE7XG4gICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGFuIG9iamVjdCwgY29uZmlybSBpdCBpcyAnbm8gZGVmaW5pdGlvbicgc2VydmVyIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICAgICAgLy9ObyBkZWZpbml0aW9ucyB3ZXJlIGZvdW5kXG4gICAgICAgICAgbm9EZWZpbml0aW9ucyA9IHRydWU7XG4gICAgICAgICAgaWYod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiICYmIHdvcmRjYWNoZS5pbkNhY2hlID09IHRydWUpe1xuICAgICAgICAgICAgLy9UaGUgZGF0YSBzdHJlYW0gaGVyZSBpcyB3aXRob3V0IHdvcmQgZGF0YS4gVGhpcyBmdW5jdGlvbiBhd2FpdHMgdGhlIGFwaSBmZXRjaCdzIGRhdGFcbiAgICAgICAgICAgIC8vdG8gY29tcGxldGUgc3RvcmFnZS9wcm9taXNlIHJldHVybnMuIEl0IHdhaXRzIDUgc2Vjb25kcyBmb3IgdGhlIGJyb3dzZXIgdG8gY29tcGxldGUgaXRzIHN0b3JlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy90aGVuIHJlbW92ZXMgdGhlIHVud2FudGVkIGNhY2hlIHJlcXVlc3QuXG4gICAgICAgICAgICAvL1RPRE86QlVHUkVTRUFSQ0g9PkR1cmluZyB0aGUgNSB0aW1lb3V0LCBpZiB0aGUgcGFnZSByZWZyZXNoZXMgYSAnYmFkIHdvcmQnIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgLy9UaGlzICdiYWQgd29yZCcgY2FuIGJlIHJlbW92ZWQgYnkgZGVsZXRpbmcgYWxsIHByZXZpb3VzIHdvcmRzIHZpYSBVSSBhbmQgcmVmcmVzaGluZyB0aGUgcGFnZS4gVGhpcyB3aWxsXG4gICAgICAgICAgICAvLyBmaXJlIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB0byBjbGVhciBhbnkgbWlzbWF0Y2hlZCB3b3JkZGF0YTwtLT5jYWNoZWRyZXF1ZXN0cy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0Z1bmN0aW9uIGF3YWl0aW5nIHJlcXVlc3QncyBDYWNoZSBTdG9yYWdlIGNhY2hpbmdcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2h7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IHJlbW92ZSBmcm9tIENhY2hlIFN0b3JhZ2UuIE5hbWU6IFwiLCB3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgIW5vRGVmaW5pdGlvbnMpIHsvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9IGVsc2Ugey8vJ0JhZCBkYXRhJyBkdWUgdG8gXCJObyBkZWZpbml0aW9ucyBmb3VuZFwiLCBpbnZhbGlkIHdvcmQsIGJhZCBuZXR3b3JrIGNvbm5lY3Rpb25cbiAgICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUgIT09IGZhbHNlKSB7Ly9PbmxpbmUsIHByb2JsZW0gd2l0aCBmZXRjaFxuICAgICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7Ly9TZXJ2ZXIgcmV0dXJuZWQgbm8gZGVmaW5pdGlvbnMgZGF0YVxuICAgICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiO1xuICAgICAgICAgIH0gZWxzZSB7Ly9JbnZhbGlkIHdvcmQgZGF0YVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Ugey8vT2ZmbGluZSByZXF1ZXN0XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBsZXQgd29yZERhdGEgPSB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHdvcmREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgaW5wdXQgdmFsaWRhdGlvbiBmdW5jdGlvbiB0ZXN0cyB0aGUgaW5wdXQgc3RyaW5nIGFnYWluc3QgYSB2YWxpZCBSZWd1bGFyIEV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgIFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIilcbiAgICpcbiAgICogQHBhcmFtIGludHh0IC0gU3RyaW5nIHZhbHVlIHJlY2VpdmVkIGZyb20gdXNlciBmaWVsZCBpbnB1dC5cbiAgICogQHJldHVybnMgQWNjZXB0YWJsZSB1c2VyIGlucHV0OiB0cnVlIG9yIGZhbHNlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkVmFsaWRhdGlvbihpbnR4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgbGV0IGxldHRlcnNSRSA9IG5ldyBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpO1xuICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybSBhd2FpdHMgYSBwcm9taXNlLCBmZXRjaGluZyBhIGRpY3Rpb25hcnkgdGVybS4gVGhlIGRhdGEgXG4gICAqIGluZ3Jlc3MgY2FsbHMgbWFya3VwIGNyZWF0aW9uIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCB0byBiZSBmZXRjaGVkLlxuICAgKiBAcGFyYW0gd29yZFVSTCAtIEEgVVJMIGNvbXBvc2luZyB0aGUgZnVsbCB1cmwgb2YgdGhlIGZldGNoIHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsXG4gICAgd29yZDogc3RyaW5nLFxuICAgIHdvcmRVUkw6IFVSTFxuICApIHtcbiAgICAvLyBXaGVuIHRoZSB3b3JkIGRhdGEgcmVzb2x2ZXMsIGNhbGwgbWFya3VwIGZ1bmN0aW9uc1xuICAgIGxldCB3b3JkRGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShcbiAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHdvcmQsXG4gICAgICAgICAgd29yZFVSTCxcbiAgICAgICAgICBzZWFyY2hFbGVtcyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3RcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB3b3JkRGF0YVByb21pc2UudGhlbigoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLndvcmREYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIHNlYXJjaEVsZW1zKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBjbGFzc2VzIGlmIGFwcGxpZWQgcHJldmlvdXNseVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiB3b3JkU2VhcmNoKCkgYmVnaW5zIGEgd29yZCBzZWFyY2ggcmVxdWVzdC4gVGhlIHVzZXIgaW5wdXQgbGlzdGVuZXIgY2hvb3Nlc1xuICAgKiB3aGV0aGVyIHRoZSBmZXRjaCBpcyBjYWxsZWQgZnJvbSBjYWNoZSBvciBpcyBuZXcuXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gaXNGcm9tUHJldmlvdXNXb3JkcyAtIFRydWUgaWYgdGhlIHVzZXIgcmVxdWVzdGVkIGEgc2VhcmNoIGZyb20gYSBwcmV2aW91cyB3b3JkLCB0byBjYWxsIGRhdGEgZnJvbSBCcm93c2VyIENhY2hlLlxuICAgKiBAcGFyYW0gY2FjaGVkV29yZCAtIElmIHRoZSB1c2VyIGNhbGxlZCBmb3IgYSBwcmV2aW91cyB3b3JkLCBjYWNoZWRXb3JkIGlzIHdpdGhpbiB0aGUgTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFNlYXJjaChcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLFxuICAgIGlzRnJvbVByZXZpb3VzV29yZHM6IGJvb2xlYW4sXG4gICAgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZHZhbHVlIHwgbnVsbFxuICApIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICAgICAgc2VhcmNoRWxlbXMsXG4gICAgICAgIGNhY2hlZFdvcmQud29yZCxcbiAgICAgICAgY2FjaGVkV29yZC53b3JkVVJMXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoXG4gICAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHNlYXJjaEVsZW1zLFxuICAgICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsXG4gICAgICAgICAgdGhpcy53b3JkVVJMXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9IFwiXCI7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IGlzIG1hZGUgdG8gY3JlYXRlIHRoZSBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAqICBEaWN0aW9uYXJ5IFNlYXJjaC4gRWxlbWVudHMgYXJlIGNyZWF0ZWQgYW5kIGFwcGVuZGVkIHRvIHRoZSBwYWdlIHRvIHRoZSBjbGFzc1xuICogICdkaWN0aW9uYXJ5V2lkZ2V0J1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IHtcbiAgLyoqXG4gICAqIFByaW1hcnkgd2lkZ2V0IG1hcmt1cCBzdHJ1Y3R1cmluZyB0aGUgd2lkZ2V0IGVsZW1lbnRzIGFuZCBzZWFyY2ggaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IGJlZm9yZSB0aGUgd2lkZ2V0LlxuICAgKiBAcmV0dXJucyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIC0tPiBpbnRlcmZhY2Ugb2ZcbiAgICogIGltcG9ydGFudCBIVE1MIGVsZW1lbnRzIHVzZWQgdGhyb3VnaCB3aWRnZXQgZnVuY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICAgICAgXCJhZnRlcmVuZFwiLFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkaWN0aW9uYXJ5ICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBDcmVhdGUgd2lkZ2V0IGVsZW1lbnRzXG4gICAgICAgICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICBjb25zdCBzZWFyY2hGb3JtID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c1dvcmRzID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gUmV0dXJuIHRoZSBlbGVtZW50cyB1c2VkIGluIGxhdGVyIGZ1bmN0aW9uc1xuICAgICAgICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxuICAgICAgICAgICAgd29yZFNlYXJjaDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGRpY3Rpb25hcnlFbGVtOiA8SFRNTEVsZW1lbnQ+ZGljdGlvbmFyeSxcbiAgICAgICAgICAgIGVycm9yRWxlbTogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICAgICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZWZyZXNoQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgICAgICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XG4gICAgICAgICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiU2VhcmNoLi4uXCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJTZWFyY2hcIik7XG4gICAgICAgICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgICAgICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcbiAgICAgICAgICBzZWFyY2hGb3JtLmlkID0gXCJkaWN0aW9uYXJ5LXNlYXJjaFwiO1xuICAgICAgICAgIHNlYXJjaEZvcm0uYWN0aW9uID0gXCJpbmRleC5odG1sXCI7XG4gICAgICAgICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmlkID0gXCJ3b3JkLXNlYXJjaFwiO1xuICAgICAgICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5pbm5lclRleHQgPSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuXG4gICAgICAgICAgcmV0dXJuIHNlYXJjaEVsZW1lbnRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYFRoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWFya3VwIHRvIGhvdXNlIHJldHVybmVkIHdvcmRzIGZyb20gRGljdGlvbmFyeVNlYXJjaC4gVGhlIG1hcmt1cFxuICAgKiAgaXMgY3JlYXRlZCBiYXNlZCBvbiBBUEkgZWdyZXNzLiBXb3JkcyBhbmQgdGhlaXIgZGVmaW5pdGlvbnMgdmFyeS4gVGhlIG1hcmt1cCBpc1xuICAgKiAgYWRhcHRpdmUgdG8gcmV0dXJuZWQgd29yZCBkYXRhIHN0cnVjdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkRGF0YSAtIFRoaXMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCBvZiB3b3JkIHR5cGVzLCBkZWZpbml0aW9ucywgYW5kIGV4YW1wbGVzLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoXG4gICAgd29yZERhdGE6IGFueSxcbiAgICBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzXG4gICkge1xuICAgIGlmICh3b3JkRGF0YSA9PSBudWxsIHx8ICEod29yZERhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBkZWZpbml0aW9uIGZvciB0aGlzIHdvcmQuXCIpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSB3b3JkJ3MgZGVmaW5pdGlvbiB0byB0aGUgZGljdGlvbmFyeSB3aWRnZXRcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPVxuICAgICAgc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICk7XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7IC8vIHdvcmQgZGVmaW5pdGlvbiBzZXBhcmF0b3JcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcblxuICAgIC8vIFRoZSB3b3JkIGRhdGEgcmVwcmVzZW50cyBjb21wbGV4IEpTT04gb2JqZWN0XG4gICAgLy8gUmVjdXJzZSB0aGUgd29yZCBkYXRhIG9iamVjdCwgYWRkaW5nIGVsZW1lbnRzIGZyb20gdGhlIHZhcmlvdXMgbGV2ZWxzXG4gICAgd29yZERhdGEubWFwKCh3b3JkOiBhbnkpID0+IHtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJ3b3JkXCIsIHdvcmQud29yZCk7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIHdvcmQgaXM6IFwiLHdvcmQpXG4gICAgICBjb25zdCB3b3JkVGl0bGUgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuICAgICAgKTtcbiAgICAgIHdvcmRUaXRsZS50ZXh0Q29udGVudCA9IHdvcmQud29yZDtcbiAgICAgIC8vQWRkIHRoZSB3b3JkIGFuZCBleGFtcGxlcyB0byBwYWdlXG4gICAgICB3b3JkLm1lYW5pbmdzLm1hcCgod29yZFR5cGU6IGFueSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiV29yZFR5cGUgYXJlOiBcIiwgd29yZFR5cGUpXG4gICAgICAgIGNvbnN0IHdvcmRUeXBlSCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgd29yZFR5cGVMaXN0ID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgICAgICApO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcbiAgICAgICAgICApO1xuICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpO1xuXG4gICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb25zIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0gPVxuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICApO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIndvcmQtY2xlYXJcIik7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcblxuICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCkgPT4ge1xuICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0ZSBidXR0b25cbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcbiAgfVxufVxuIiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuLy8gQ3JlYXRlIGEgY2xhc3MgZm9yIHRoZSBlbGVtZW50XG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nTGlzdEVsZW1lbnQgZXh0ZW5kcyBIVE1MVUxpc3RFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gc3VwZXIoKSBpcyBhIHJlZmVyZW5jZSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgICAgICAvLyBsaSBlbGVtZW50cyBjYW4gYmUgY29udGFpbmVycyBpZiB0aGV5IGhhdmUgdWxzIHdpdGhpbiB0aGVtXG4gICAgICAgIGNvbnN0IHVscyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcbiAgICAgICAgY29uc3QgbGlzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgICAgICAvLyBUaGVzZSBsaXN0cyB3aWxsIGJlIHNob3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgaGlnaGVyIGxldmVsIGNvbnRhaW5lclxuICAgICAgICB1bHMuZm9yRWFjaCh1bCA9PiB7XG4gICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb29rIHRocm91Z2ggZWFjaCBsaSBlbGVtZW50IGluIHRoZSB1bFxuICAgICAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLy8gdG8gc2hvdyBhbiBvcGVuIG9yIGNsb3NlZCBpY29uXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGhlIGxpIGVsZW1lbnQncyB0ZXh0IGluIGEgbmV3IHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhc3NpZ24gc3R5bGUgYW5kIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzcGFuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0ZXh0IGZyb20gbGkgdG8gc3Bhbiwgc2V0IGN1cnNvciBzdHlsZVxuICAgICAgICAgICAgICAgIG5ld1NwYW4udGV4dENvbnRlbnQgPSBjaGlsZFRleHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgICAgICAgICBuZXdTcGFuLm9uY2xpY2sgPSB0aGlzLnNob3d1bDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBldmVudC5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8vIFRoaXMgb2JqZWN0IGNyZWF0ZXMgYW4gYXJyYXkgb2YgZGl2cyBmcm9tIGlucHV0IHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAgIHB1YmxpYyBtX2ZsYXNoY2FyZHNBcnI6IEhUTUxMSUVsZW1lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgbV9wb3J0SW5mb01hcDogTWFwPGFueSwgc3RyaW5nPlxuXG4gICAgY29uc3RydWN0b3IocG9ydG51bWJlcnNNYXA6IE1hcDxhbnksIHN0cmluZz4pIHtcbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwID0gcG9ydG51bWJlcnNNYXA7XG4gICAgICAgIGNvbnN0IG1hcEl0ZXIgPSB0aGlzLm1fcG9ydEluZm9NYXAua2V5cygpO1xuXG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcC5mb3JFYWNoKCAocG9ydCkgPT4geyBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAgICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpXG4gICAgICAgICAgICBpbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGZsaXBmcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgZmxpcGJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBnYW1lQ2FyZFNwYW4uaW5uZXJUZXh0ID0gYFBvcnQjICR7bWFwSXRlci5uZXh0KCkudmFsdWV9YDtcbiAgICAgICAgICAgIGdhbWVDYXJkQmFja1NwYW4uaW5uZXJUZXh0ID0gYCR7cG9ydH1gO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGl2IHRvIGZsYXNoY2FyZCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5tX2ZsYXNoY2FyZHNBcnIucHVzaChmbGFzaGNhcmQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgR3Jvd2luZ0NhcmRFbGVtZW50IGV4dGVuZHMgSFRNTExJRWxlbWVudCB7XG4gICAgcHJpdmF0ZSBpc0dyb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgaGFzTGluaztcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBoYWREZXRhaWxzO1xuICAgIC8vIHByaXZhdGUgc3RhdGljIGhhc0Rlc2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmdyb3dDYXJkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNocmlua0NhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4geyAvL1RPRE86IGNoZWNrIGNsYXNzIHByb3BlcnR5XG4gICAgICAgIGlmIChsaS5zdHlsZS5zY2FsZSkge1xuICAgICAgICAgICAgbGkuc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc2V0SXNHcm93bihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNoYWRlSW5hY3RpdmVDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKEdyb3dpbmdDYXJkRWxlbWVudC5nZXRJc0F0TGVhc3RPbmVCaWcoKSkge1xuICAgICAgICAgICAgaWYgKCFsaS5nZXRJc0dyb3duKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuNVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldElzQXRMZWFzdE9uZUJpZyA9ICgpID0+IHtcbiAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjd2ViSURFQ2FyZHMgbGlgKSk7XG4gICAgICAgIGxldCBhdExlYXN0T25lSXNCaWcgPSBsaXN0TElzLnNvbWUoKGxpKSA9PiBsaS5nZXRJc0dyb3duKCkgPT0gdHJ1ZSk7XG4gICAgICAgIHJldHVybiBhdExlYXN0T25lSXNCaWc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElzR3Jvd24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc0dyb3duID0gKHRydWVmYWxzZTogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duID0gdHJ1ZWZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ3Jvd0NhcmQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3R5bGUuc2NhbGUgPSBcIjEuMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgdGhpcy5zZXRJc0dyb3duKHRydWUpO1xuXG4gICAgICAgIC8vIE5lZWQgYWxsIHRoZSBsaXN0IGVsZW1lbnRzIHRvIHJlZmVyZW5jZSB3aGljaCBvbmUgdG8gZ3Jvd1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgICAgIGxldCBsaXN0TElzID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3R5bGUuc2NhbGUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogSFRNTCBsaW5rIGVsZW1lbnQgZGF0YS4gVXNlZCB3aXRoIGFuY2hvciB0YWdzLlxuICovXG5jbGFzcyBMaW5rRGV0YWlscyB7XG4gICAgLyoqSFRNTCB0aXRsZSBhdHRyaWJ1dGUgKi9cbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIC8qKklubmVyIHRleHQgc3RyaW5nKi9cbiAgICBpbm5lclRleHQ6IHN0cmluZztcbiAgICAvKipUaGUgcGFnZSB0aGUgbGluayBpcyBhc3NvY2lhdGVkIHRvKi9cbiAgICBwYWdlTmFtZTogc3RyaW5nO1xuICAgIC8qKkhUTUwgaHJlZiBhdHRyaWJ1dGUqL1xuICAgIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIGlubmVyVGV4dDogc3RyaW5nLCBwYWdlTmFtZTogc3RyaW5nLCBoUmVmZXJlbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGlubmVyVGV4dCxcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lLFxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaW5rRGV0YWlscztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIjtcbmltcG9ydCBSV0JDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL1JXQkNhcmRcIjtcblxuZXhwb3J0IGNsYXNzIFJhbmRvbVdlYkJpdHMge1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oc2VjdGlvblRpdGxlOiBzdHJpbmcsIHNlY3Rpb25IZWFkaW5nSUQ6IHN0cmluZykge1xuICAgICAgICAvLyBDcmVhdGUgZGl2aXNvciBzZWN0aW9uYWwgZWxlbWVudHMgdG8gYXBwZW5kIHRvIG1haW5cbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgJiYgcGFnZU1haW4ubm9kZU5hbWUgPT09ICdNQUlOJykge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNhcmQgc2VjdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjYXJkc1wiPlxuICAgICAgICAgICAgLy8gICAgIDxoMj5BcmJpdHJhcnkgQXJ0aWNsZXM6PC9oMj5cbiAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9jb2x1bW5zXCI+XG5cbiAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgIC8vIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgbGV0IGFhQ2FyZHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFIZWFkaW5nKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gQWRkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBBQVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRzXCIpO1xuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7c2VjdGlvblRpdGxlfWA7XG4gICAgICAgICAgICBhYUhlYWRpbmcuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VjdGlvbkhlYWRpbmdJRCk7XG5cbiAgICAgICAgICAgIHJldHVybiBhYUNhcmRzU2VjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWFpbiBlbGVtZW50IGV4aXN0cyBvbiB0aGUgcGFnZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQXJ0aWNsZUNhcmRzKGNhcmRzRGF0YTogV2ViQml0W10pIHtcbiAgICAgICAgLy8gSXRlcmF0ZSBlYWNoIGNhcmQgaW4gdGhlIGFycmF5LiBCdWlsZCB0aGUgY2FyZCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlOiBXZWJCaXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJ3YmNhcmQgPSBuZXcgUldCQ2FyZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJ3YmNhcmQuYnVpbGRSV0JDYXJkTWFya3VwKGFydGljbGUpOztcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RhcnRNYXJrOiBQZXJmb3JtYW5jZU1hcmssXG4gICAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrLFxufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0UGVyZiB7XG4gICAgc2NyaXB0cnVudGltZW1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICBzdGFydE1hcms6IG51bGwsXG4gICAgICAgIGVuZE1hcms6IG51bGxcbiAgICB9O1xuXG4gICAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuIENhbGwgU3JpcHRQZXJmLmVuZCgpXG4gICAgICogdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC5cbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBzY3JpcHRuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lID0gc2NyaXB0bmFtZTtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1zdGFydGApO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmQoKXtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3MuZW5kTWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZX0tZW5kYCk7XG4gICAgICAgIHRoaXMubWVhc3VyZSgpO1xuICAgIH1cblxuICAgIC8qKiBBIGNvbnNvbGUgb3V0cHV0IG9mIHRoaXMgb2JqZWN0J3MgcGVyZm9ybWFuY2UgbWVhc3VyZW1lbnQuICovXG4gICAgcHJpdmF0ZSBtZWFzdXJlKCl7XG4gICAgICAgIGxldCBtZWFzdXJlID0gcGVyZm9ybWFuY2UubWVhc3VyZSggdGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZSwgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrLm5hbWUsIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLmVuZE1hcmsubmFtZSlcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9IGV4ZWN1dGlvbiB0aW1lIGlzOiAke21lYXN1cmUuZHVyYXRpb259YCk7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKiBcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqIFxuICogVGhlbiwgdGhlIHdpZGdldCBpcyBjcmVhdGVkIGFuZCBUby1Eb3MgYXJlIHJldHJpZXZlZCBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XG4gICAgcHVibGljIHN0YXRpYyB0b2Rvc0luTG9jYWxTdG9yYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBUby1EbyBsaXN0IHdpZGdldCdzIGVsZW1lbnRzLlxuICAgICAqIFxuICAgICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAgICogQHBhcmFtIFRvRG9FbGVtZW50cyBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICAgKiAgdGhlIGxpc3QgbWFya3VwLCBwYXNzaW5nIGluIGEgcmVmZXJlbmNlIGVsZW1lbnQgZm9yIHBsYWNlbWVudCBvZiB0aGUgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gd2lkZ2V0IGlzIHBsYWNlZCBhZnRlciB0aGlzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgICAgICAvL0RlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgICAgICAvL1N3aXRjaCBhZ2FpbnN0IHRoZSBjdXJyZW50IHBhZ2UgdG8gZGV0ZXJtaW5lIG1hcmt1cCBuZWVkZWRcbiAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiVG9Eb0xpc3RcIikpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy8nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnL2Rpc3QvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01hcmt1cCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cjMgPSB0Zm9vdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvbGlzdFNlY3Rpb24uaWQgPSBcIlRvRE9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIChpdCBpcyBub3Qgc3RvcmVkIGluIGNhY2hlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidUb0RvSXRlbXMnIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVsZW1lbnQgaXMgbm90IHZhbGlkLiBQbGVhc2UgZW5zdXJlIGEgdmFsaWQgZWxlbWVudCBmb3IgVG9EbyBsaXN0IHdpZGdldCB0byBmb2xsb3cuXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIC8vR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldFxuICAgICAgICAvL0VhY2ggd2lkZ2V0IGxvY2F0aW9uJ3MgZWxlbWVudHMgbWF5IHZhcnksIHNvIGEgY2FsbCBvZiBnZXRUb0RvTGlzdEVsZW1lbnRzKClcbiAgICAgICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICAgICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRhYmxlJyksXG4gICAgICAgICAgICB0b2RvVGFibGVCb2R5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyksXG4gICAgICAgICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0RWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIG9yIGZhbHNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUb0RvSW5TdG9yYWdlKCkge1xuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgaWYoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbil7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0Nhbm5vdCBnZXQgTG9jYWwgU3RvcmFnZSBcIlRvRG9zLlwiXG4gICAgICAgICAgICAgICVjJHtlLm5hbWV9IFxuICAgICAgICAgICAgICAke2UubWVzc2FnZX0gXG4gICAgICAgICAgICAgICVjJHtlLnN0YWNrfWAsIFwiY29sb3I6IGdyZXlcIiwgXCJjb2xvcjogb3JhbmdlcmVkXCIsIFwiY29sb3I6IHJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQcm9ibGVtIGdldHRpbmcgTG9jYWwgU3RvcmFnZSBrZXk6IFRvRG9zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS4gXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgLy9BZGQgdGhlIFRvRG9zIGFycmF5IHRvIGxvY2FsIGNhY2hlLlxuICAgICAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgICAgICBsZXQgVG9EbzogbG9jYWxzdG9yYWdldG9kb2NhY2hlID0ge1xuICAgICAgICAgICAgaW5DYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB0b2RvaXRlbTogZGVzY3JpcHRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IFRvRG9zOiBhbnkgPSBbXTsgLy9Ub0RvIGFycmF5XG4gICAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG5cbiAgICAgICAgLy9GaXJzdCwgcmVhZCBjdXJyZW50IExvY2FsIFN0b3JhZ2UgVG9Eb3NcbiAgICAgICAgbGV0IHRvZG9zOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHsvL05vdGhpbmcgaW4gc3RvcmFnZSwgcHVzaCBjdXJyZW50XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RvRG9zJywgSlNPTi5zdHJpbmdpZnkoVG9Eb3MpKTtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC50b2Rvc0luTG9jYWxTdG9yYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugey8vQWRkIHRoZSBuZXcgVG9EbyB0byB0aGUgY3VycmVudCBUb0RvcyBhbmQgcHVzaCB2aWEgc2V0SXRlbSgpXG4gICAgICAgICAgICAgICAgdG9kb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBzdG9yaW5nIFRvLWRvIGxpc3QgaXRlbTogXCIsIGVycik7XG4gICAgICAgICAgICBpZihlcnIgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghVG9Eb0xpc3QuaXNUb0RvSW5TdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWwgc3RvcmFnZSB2YWx1ZXMgbnVsbC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKSk7XG4gICAgICAgICAgICB0b2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgICAgICBpZiAodG9kb3MubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAgICogIEEgcm93IGNvbnNpc3RzIG9mIHRocmVlIGNvbHVtbnM6IGEgY29tcGxldGUgdGljay1ib3gsIGEgZGVzY3JpcHRpb24sIGFuZCBhIGRlbGV0ZSBidXR0b24uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVXNlciBmb3JtIGlucHV0IHRvIGFkZCBhcyBhIGRlc2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZFRvRG9Sb3coZGVzY3JpcHRpb246IHN0cmluZywgZmlyc3RQYWludDogYm9vbGVhbikge1xuICAgICAgICAvL0NyZWF0ZSBhIHRhYmxlIHJvdyB3aXRoIGNoZWNrYm94IGFuZCBkZWxldGUgb3B0aW9uc1xuICAgICAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBpZiAoVEFCTEVJVEVNICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHRhYmxlRnJhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTsgLy9BZGQgcm93XG4gICAgICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICAgICAgY29uc3QgbmV3SVRFTSA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0RlbGV0ZScpO1xuICAgICAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIFRvRG9MaXN0LlRvRE9zID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvTGlzdC5Ub0RPcykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0pKCkgOiAoMSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKzsgLy9OdW1iZXIgb2YgSXRlbXNcbiAgICAgICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgICAgIFRBQkxFSVRFTS5hcHBlbmRDaGlsZCh0YWJsZUZyYWcpO1xuXG4gICAgICAgICAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5EZWxldGVCdXR0b24oZGVsQk9YKTsgfSk7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5hZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgd2VyZSBubyAnVG9Eb0l0ZW1zJyBmb3VuZCBvciB0aGV5IGFyZSBudWxsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSB0aGUgVG8tRG8gaXRlbSByb3dzIGZyb20gVG8tRG9zIHN0b3JlZCBpbiB0aGUgYnJvd3NlciBMb2NhbCBTdG9yYWdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVUb0RvTGlzdCgpIHtcbiAgICAgICAgLy9SZXRyaWV2ZSB0b2RvIGl0ZW1zIGluIExvY2FsIFN0b3JhZ2UgYW5kIGFkZCBlYWNoIHRvIHRoZSBsaXN0XG4gICAgICAgIGxldCBwYXJzZWRUb0RvczogbG9jYWxzdG9yYWdldG9kb2NhY2hlW11cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcGFyc2VkVG9Eb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBpZihlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjQ2Fubm90IGdldCBMb2NhbCBTdG9yYWdlIFwiVG9Eb3MuXCJcbiAgICAgICAgICAgICAgJWMke2UubmFtZX0gXG4gICAgICAgICAgICAgICR7ZS5tZXNzYWdlfSBcbiAgICAgICAgICAgICAgJWMke2Uuc3RhY2t9YCwgXCJjb2xvcjogZ3JleVwiLCBcImNvbG9yOiBvcmFuZ2VyZWRcIiwgXCJjb2xvcjogcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByb2JsZW0gZ2V0dGluZyBMb2NhbCBTdG9yYWdlIGtleTogVG9Eb3NgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZWRUb0RvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZFRvRG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KHBhcnNlZFRvRG9zW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGJ1dHRvbiBmdW5jdGlvbmFsaXR5OiBEZWxldGUsIEFkZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgQUREQlVUVE9OID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEJ1dHRvbjtcbiAgICAgICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgICAgICBpZiAoQUREQlVUVE9OICE9IG51bGwgJiYgQURESVRFTUVOVEVSICE9IG51bGwpIHtcbiAgICAgICAgICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIEFERElURU1FTlRFUi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBlLmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAgICogIG5vdCByZW1vdmVkIGZyb20gc3RvcmFnZSB3aXRob3V0ICdDb21wbGV0ZT8nIGNoZWNrZWJveCBjaGVja2VkLlxuICAgICAqIEBwYXJhbSBib3ggY2hlY2tib3ggZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgRGVsZXRlQnV0dG9uKGJveDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgIT0gbnVsbCAmJiBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIGxldCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD5ib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgbGV0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgICAgIGlmICh0b2RvVGFibGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmJveC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSB0ci5yb3dJbmRleDtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZldG9Eb0Zyb21TdG9yYWdlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFibGUnIGVsZW1lbnQgbm90IGZvdW5kIG9yIGl0IGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5zdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBzZWVkIHRoZSBUby1EbyBMaXN0IHdoZW4gdGhlcmUgYXJlIG5vIExvY2FsIFN0b3JhZ2UgaXRlbXNcbiAgICAgKiAgd2hpY2ggd291bGQgcG9wdWxhdGUgdGhlIGxpc3QuIFRoZSBzYW1wbGUgcmVtYWlucyBvbiBwYWdlIGJ1dCBpcyBuZXZlciBzdG9yZWQgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU2FtcGxlVG9fRG8odGJvZHk6IEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFUb0RvTGlzdC5pc1RvRG9JblN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgZW50cnkgaW4gdGhlIFRvRG8gdGFibGUgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgY29uc3QgdHIyID0gdGJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICAgICAgICAgIFRvRG9MaXN0LlRvRE9zKys7XG5cbiAgICAgICAgICAgIC8vXCJEZWxldGVcIiBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuRGVsZXRlQnV0dG9uKHRkMkRFTCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG4vKipcbiAqIFRoaXMgY2xhc3MgaG9sZHMgdGhlIGRhdGEgZm9yICdXZWJCaXQnIGFydGljbGUgY2FyZHMuIEtleSBpbmZvcm1hdGlvblxuICogb2YgdGhlIGFydGljbGUncyBjb250ZW50cyBhcmUgY29udGFpbmVkOiBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0YSBjcmVhdGVkLFxuICogZXRjLlxuICovXG5jbGFzcyBXZWJCaXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGRhdGVDcmVhdGVkOiBEYXRlO1xuICAgIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlOiBzdHJpbmc7XG4gICAgY2FyZEltYWdlQUxUOiBzdHJpbmc7XG4gICAgbGlua0F0dHJpYnV0aW9uOiBBdHRyaWJ1dGlvbkxpbms7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlQUxUOiBzdHJpbmcsXG4gICAgICAgIGxpbmtBdHRyaWJ1dGlvbj86IEF0dHJpYnV0aW9uTGluayxcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFQ7XG4gICAgICAgIHRoaXMubGlua0F0dHJpYnV0aW9uID0gbGlua0F0dHJpYnV0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0O1xuIl19

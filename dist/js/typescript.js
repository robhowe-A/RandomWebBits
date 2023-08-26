(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ToDos_1 = require("./ToDos");
const DictionaryWidget_1 = require("./DictionaryWidget");
const ScriptPerf_1 = require("../models/ScriptPerf");
const RWBErrorBus_1 = require("../models/RWBErrorBus");
const ClassComponents = {
    initDictionary: () => {
        const classperf = new ScriptPerf_1.default("Classcomponents"); //begin performance measure
        if (RWBErrorBus_1.default.checkElementorNull("ClassComponent", "dictionaryWidget", true, true))
            return;
        DictionaryWidget_1.default.init();
        classperf.end(); //end performance measure
    },
    initToDo: () => {
        // Add ToDos widget if an element with that class is on a page
        if (RWBErrorBus_1.default.checkElementorNull("ClassComponent", "ToDoList", true, true))
            return;
        ToDos_1.default.init();
    }
};
exports.default = ClassComponents;

},{"../models/RWBErrorBus":30,"../models/ScriptPerf":34,"./DictionaryWidget":2,"./ToDos":10}],2:[function(require,module,exports){
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
    init: () => {
        let dictionaryWidgetStartingElement;
        try {
            dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");
        }
        catch (err) {
            console.log("%cCould not query dictionary widget element.", "color:orange;");
        }
        // DictionarySearch constructor
        Object.create(new DictionarySearch_1.DictionarySearchWidget(dictionaryWidgetStartingElement));
    }
};
exports.default = DictionaryWidget;

},{"../models/DictionarySearch":25}],3:[function(require,module,exports){
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

},{"../models/ExpandingList":27}],4:[function(require,module,exports){
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
        // Add the flashcards to widget
        for (let elem of mainFlashCardDivs.m_flashcardsArr) {
            mainFlashCardPageDiv.appendChild(elem);
        }
    }
};
exports.default = flashcardgameWidget;

},{"../data/portnums":20,"../models/FlashcardCardElems":28}],5:[function(require,module,exports){
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

},{"../models/GrowingCard":29}],6:[function(require,module,exports){
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

},{"../data/navitems":19,"../models/ScriptPerf":34}],7:[function(require,module,exports){
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
const domainlookup_1 = require("./domainlookup");
const sliderbar_1 = require("./sliderbar");
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
            // Initialize domain name lookup
            case '/pages/domainlookup.html':
                domainlookup_1.default.init();
                break;
            case '/pages/markup.html':
                sliderbar_1.default.init();
                break;
        }
    }
};
exports.default = PageComponents;

},{"../models/ScriptPerf":34,"./ExpandingListDOMWidget":3,"./FlashcardGameWidget":4,"./GrowingCard":5,"./SlideShowWidget":9,"./WebBits":11,"./colorcode":12,"./colorcodeurl":13,"./cssex":14,"./domainlookup":15,"./sliderbar":17}],8:[function(require,module,exports){
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
    init: () => {
        let toDosElement;
        try {
            toDosElement = document.querySelector(".ToDoList");
        }
        catch (err) {
            console.log("%cCould not query todo list widget element.", "color:orange;");
        }
        //ToDoList object
        const todoWidget = new ToDo_1.ToDoList();
        //Creates widget markup and populates To-Do tasks contained in Local Storage
        todoWidget.createToDoListWidget(toDosElement);
    }
};
exports.default = ToDosWidget;

},{"../models/ToDo":35}],11:[function(require,module,exports){
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
            RandomWebBits_1.RandomWebBits.buildRWBCards(data_1.default.shift()),
            RandomWebBits_1.RandomWebBits.buildRWBCards(data_1.default.shift()),
            RandomWebBits_1.RandomWebBits.buildRWBCards(data_1.default.shift()),
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

},{"../data/data":18,"../models/RandomWebBits":33}],12:[function(require,module,exports){
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

},{"../models/ColorCode":24}],13:[function(require,module,exports){
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

},{"../models/ColorCode":24}],14:[function(require,module,exports){
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

},{"../models/ColorCode":24}],15:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const domainlookup = {
    init: () => {
        // Get the form, assign to a variable
        const form = document.getElementById('searchWhoIS');
        if (form == null) { //If the form is not found, throw exception.
            throw new ReferenceError("Lookup form not found.");
        }
        form.addEventListener("submit", domainlookup.searchWHOIS);
    },
    searchWHOIS: () => {
        let inputelem = document.getElementById('txtSearch');
        let value = inputelem.value;
        var URL = 'https://www.whois.com/whois/' + value;
        window.open(URL, '_blank');
        return false;
    }
};
exports.default = domainlookup;

},{}],16:[function(require,module,exports){
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

},{"../models/ScriptPerf":34}],17:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const sliderbar = {
    init: () => {
        var divisor = document.getElementById("divisor"), slideBar = document.getElementById("slider");
        slideBar.setAttribute("aria-label", "slider");
        slideBar.addEventListener('input', () => sliderbar.moveDivisorBar(divisor, slideBar));
    },
    moveDivisorBar: (divisor, slideBar) => {
        divisor.style.width = slideBar.value + "%";
    }
};
exports.default = sliderbar;

},{}],18:[function(require,module,exports){
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

},{"../models/AttributionLink":23,"../models/WebBit":36}],19:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const RWBLink_1 = require("../models/RWBLink");
/**
 * Header navigation link data
 */
const homeNavLink = new RWBLink_1.default("Index", "Home", "Home", "index.html");
const pagesNavLink = new RWBLink_1.default("Pages", "Pages", "Pages", "pages.html");
const gameNavLink = new RWBLink_1.default("Game", "FlashCards", "Game", "flashcards.html");
/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
exports.default = NAVITEMS;

},{"../models/RWBLink":31}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
            ClassComponents_1.default.initDictionary();
            ClassComponents_1.default.initToDo();
            // <abbr></abbr> styles: implemented for mobile devices
            mobileMarkup_1.default.init();
            mainperf.end();
        });
    }
};
main.init();

},{"./components/ClassComponents":1,"./components/HeaderFooter":6,"./components/PageComponents":7,"./components/mobileMarkup":16,"./models/ScriptPerf":34}],22:[function(require,module,exports){
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
    GETURL;
    sendToBrowserCache = false;
    browserCacheName;
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
}
exports.apiGET = apiGET;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const RWBLink_1 = require("./RWBLink");
/**
 * Used for image Attribution
*/
class AttributionLink extends RWBLink_1.default {
    /**Counts the number of objects instantiated */
    static count = 0;
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
        AttributionLink.count++;
    }
}
exports.default = AttributionLink;

},{"./RWBLink":31}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionarySearchWidget = void 0;
//--Copyright (c) 2023 Robert A. Howell
const API_1 = require("../models/API");
const DictionarySearchMarkup_1 = require("./DictionarySearchMarkup");
const RWBErrorBus_1 = require("./RWBErrorBus");
const RWBParser_1 = require("./RWBParser");
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
class DictionarySearchWidget extends DictionarySearchMarkup_1.default {
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
        //Invoke DictionarySearchWidget superclass constructor.
        super(elem);
        if (this.searchElements == undefined)
            return;
        //Initialize the dictionary widget with click event listeners
        this.addWidgetEvents();
        DictionarySearchWidget.wordStorage = DictionarySearchWidget.getLocalStorageWordCaches();
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
        if (RWBErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", true, true)) {
            //The Local Storage is null or empty--> Confirm here the browser does not have any Cache Storage items in error
            if ("caches" in window) {
                if (window.caches.has(DictionarySearchWidget.CacheStorageNameofWordRequest)) {
                    window.caches.delete(DictionarySearchWidget.CacheStorageNameofWordRequest);
                }
                localStorage.removeItem('word-caches');
                return;
            }
        }
        storageStr = localStorage.getItem("word-caches");
        //check the word-cache value for correct json parsing
        let parsetest = Object.create(new RWBParser_1.default(storageStr));
        if (!parsetest.passed) {
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, 'color:orange;font-size:14px;font-weight:bold;', 'color:orange;font-size:16px;');
            this.getLocalStorageWordCaches();
            return;
        }
        return parsetest.returnstr;
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
        this.searchElements.wordSearch.addEventListener("click", (event) => {
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        this.searchElements.searchWord.addEventListener("keypress", (event) => {
            if (event.key !== "Enter")
                return;
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        //"Previous word searches" button fetches locally stored words
        //Clicking the button displays each word in a list within the widget
        this.searchElements.previousWordBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.checkcreatePreviousWordButtons();
        });
        //"Refresh" button reloads the page
        this.searchElements.refreshBtn.addEventListener("click", (event) => {
            event.preventDefault();
            location.reload();
        });
    }
    checkcreatePreviousWordButtons() {
        const placementlocationholder = document.querySelector(".previousWords");
        let buttonContainer = this.searchElements.previousWordsContainer;
        //Check the placement locator and word caches for undefined
        if (placementlocationholder == null ||
            DictionarySearchWidget.wordStorage == null) {
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
    createPreviousWordButtons(previousWordsBtnWasClicked, buttonContainer) {
        if (previousWordsBtnWasClicked) {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        let previouswordbuttons = this.createPreviousWordSearchesElements(DictionarySearchWidget.wordStorage, buttonContainer);
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
                    btn.deleteCacheWordHeadingElem.style.display = "none";
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
            //add event listener for delete button
            btn.deleteCacheWordHeadingElem.addEventListener("click", (event) => {
                event.preventDefault();
                btn.wordHeadingElemContainer.remove();
                this.removeDictionaryTermfromLocalStorage(btn.cacheWordHeadingElem.textContent);
            });
        }
    }
    /**
     * Adds the word to the browser's Local Storage containing word data, URL, and caching.
     *
     * @param localstoragevalue - This interface stores information where sending to Local Storage.
     */
    addDictionaryTermtoLocalStorage(localstoragevalue) {
        let wordStore = [];
        wordStore.push(localstoragevalue);
        const addedwordcache = () => {
            console.log(`%c<RWB>%cAdded word cache: ${localstoragevalue.word}`, 'color:cyan;font-weight:bold;', 'color:cyan;');
        };
        //Add the cache item to Local Storage 'word-caches'
        if (DictionarySearchWidget.wordStorage == null) {
            if (RWBErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", false, false)) {
                // Local storage is empty => add the word
                localStorage.setItem("word-caches", JSON.stringify(wordStore));
                console.log(`%c<RWB>%cCreated storage key: word-caches`, 'color:cyan;font-size:16px;font-weight:bold;', 'color:cyan;font-size:16px;');
                addedwordcache();
                return;
            }
            return;
        }
        //Local storage is not empty. Here, we need to add the word to the existing word cache.
        let allcache = DictionarySearchWidget.wordStorage;
        //Match the current URL for cache management
        for (let cache of allcache) {
            if (cache.wordURL == localstoragevalue.wordURL) {
                //Word is already in Local Storage
                //No need to add it to the array
                return;
            }
        }
        //Add word to existing 'word-caches' in Local Storage
        allcache.push(localstoragevalue);
        localStorage.setItem("word-caches", JSON.stringify(allcache));
        console.log(`%c<RWB>%cAdded word cache: ${localstoragevalue.word}`, 'color:cyan;font-weight:bold;', 'color:cyan;');
    }
    /**
     * Remove a previous word data from browser's Local Storage --> Key/Value
     * data referencing words stored in local cache.
     *
     * @param localstorageword - string from "Previous Word Searches" button
     */
    removeDictionaryTermfromLocalStorage(localstorageword) {
        //Remove the cache item to Local Storage, Cache Storage
        //Check local storage is not null or empty
        if (DictionarySearchWidget.wordStorage == null) {
            return;
        }
        //Get the words array from Local Storage
        //RWBError.checkLocalStorageNullorEmpty("DictionaryWidget", "word-caches"); //log whether fetched word cache is null or empty.
        let allcache = DictionarySearchWidget.wordStorage;
        //Remove the word from Cache Storage and Local Storage word array
        for (let wordCache of allcache) {
            if (wordCache.word == localstorageword) {
                this.removeRequestfromCacheStorage(wordCache.wordURL);
                allcache.splice(allcache.indexOf(wordCache), 1);
                console.log(`%c<RWB>%cDeleted word cache: ${localstorageword}`, 'color:darkcyan;font-weight:bold;', 'color:darkcyan;');
            }
        }
        if (allcache.length == 0) { //The removed word was the last word in the array, so remove the container
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, 'color:darkcyan;font-size:14px;font-weight:bold;', 'color:darkcyan;font-size:16px;');
            return;
        }
        //Return remaining words to Local Storage
        localStorage.setItem("word-caches", JSON.stringify(allcache));
    }
    /**
     * Remove a fetch request from Cache Storage. Utilizes
     * DictionarySearch.CacheStorageNameofWordRequest for cache name.
     * @param removeURL
     */
    removeRequestfromCacheStorage(removeURL) {
        window.caches
            .open(DictionarySearchWidget.CacheStorageNameofWordRequest)
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
            const wordFetch = new API_1.apiGET(wordcache.wordURL, wordcache.inCache, searchElems.errorElem, wordcache.cacheName);
            let noDefinitions;
            //Fetch request method call. Returned data may be the word definition
            let data = await wordFetch.apiGET(wordFetch.getGETURL());
            if (typeof data == "string") {
                //If the returned data is a string, it is the word definition data.
                noDefinitions = false;
                let parsetest = Object.create(new RWBParser_1.default(data));
                if (!parsetest.passed) {
                    return;
                }
                data = parsetest.returnstr;
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
                                this.removeRequestfromCacheStorage(wordFetch.getGETURL());
                            }
                            catch {
                                console.log("Could not remove from Cache Storage. Name: ", wordFetch.getGETURL());
                            }
                        }, 5000);
                    }
                }
            }
            if (data == undefined || noDefinitions) { //Good data--> return data for markup render
                //'Bad data' due to "No definitions found", invalid word, bad network connection
                if (navigator.onLine !== false) { //Online, problem with fetch
                    //Offline request
                    searchElems.errorElem.innerText += ", check network connection.";
                }
                if (noDefinitions) { //Server returned no definitions data
                    if (wordData.title == "No Definitions Found")
                        searchElems.errorElem.innerText = "No Definitions Found";
                }
                else { //Invalid word data
                    searchElems.errorElem.innerText = "Invalid word!";
                }
                searchElems.searchWord.classList.add("invalid-notfound");
                searchElems.errorElem.classList.add("error-notfound");
                return;
            }
            this.addDictionaryTermtoLocalStorage(wordcache);
            return data;
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
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, true, DictionarySearchWidget.CacheStorageNameofWordRequest));
        });
        wordDataPromise.then((data) => {
            this.wordData = data;
            this.createDictionaryTermWithMarkup(data, searchElems);
            if (data != undefined) {
                console.log(`%c<RWB>%cRetrieved word: ${word}`, 'color:gold;font-weight:bold;', 'color:gold;');
            }
            // Remove unneeded classes if applied previously
            searchElems.searchWord.classList.remove("invalid");
            searchElems.searchWord.classList.remove("invalid-notfound");
            searchElems.errorElem.classList.remove("error");
            searchElems.errorElem.classList.remove("error-notfound");
            searchElems.errorElem.textContent = "";
        });
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
                this.wordURL = new URL(searchElems.searchWord.value.toString(), DictionarySearchWidget.requestUrl);
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
exports.DictionarySearchWidget = DictionarySearchWidget;

},{"../models/API":22,"./DictionarySearchMarkup":26,"./RWBErrorBus":30,"./RWBParser":32}],26:[function(require,module,exports){
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
        searchElements.searchWord.setAttribute("type", "text");
        searchElements.searchWord.setAttribute("placeholder", "Search...");
        searchElements.searchWord.setAttribute("aria-label", "Input");
        searchElements.wordSearch.setAttribute("type", "button");
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
        //when clear button is hovered, display it
        definitionDescriptionContainer.addEventListener("mouseover", (event) => {
            deleteWordTermHeadingElem.style.display = "inline-block";
            //when clear button is not hovered, hide it
            definitionDescriptionContainer.addEventListener("mouseout", () => {
                deleteWordTermHeadingElem.style.display = "none";
            });
        });
        //when clear button is clicked, clear the elements
        deleteWordTermHeadingElem.addEventListener("click", (event) => {
            event.preventDefault();
            definitionDescriptionContainer.remove();
            console.log(`%c<RWB>%cRemoved word: ${definitionDescriptionContainer.getAttribute("word")}`, 'color:goldenrod;font-weight:bold;', 'color:goldenrod;');
        });
        //add clear button to widget
        definitionDescriptionContainer.appendChild(definitionDescription);
    }
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
}
exports.default = DictionarySearchMarkup;

},{}],27:[function(require,module,exports){
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
    /**Counts the number of objects instantiated */
    static count = 0;
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
        ExpandingListElement.count++;
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

},{}],28:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
// This object creates an array of divs from input port number information
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
            this.flashcardscount++;
            FlashcardCardElems.totalflashcards++;
            // Add div to flashcard instance
            this.m_flashcardsArr.push(flashcard);
        });
    }
}
exports.default = FlashcardCardElems;

},{}],29:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowingCardElement = void 0;
class GrowingCardElement extends HTMLLIElement {
    /**Counts the number of objects instantiated */
    static count = 0;
    isGrown = false;
    constructor() {
        super();
        this.addEventListener('click', this.growCard);
        GrowingCardElement.count++;
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
        // Get all the list elements to reference which one to grow
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

},{}],30:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.RWBDomException = exports.RWBSyntaxError = exports.RWBReferenceError = void 0;
/** Create this object to record reference errors. */
class RWBError {
    /**Counts the number of objects instantiated */
    static count = 0;
    constructor() {
        RWBError.count++;
    }
    ;
    static checkElementorNull(componentname, classname, logmessage, supressexception) {
        let elem;
        let logmssg = true;
        if (!logmessage)
            logmssg = logmessage;
        let supressexcpt = false;
        if (supressexception)
            supressexcpt = true;
        // Add dictionary widget if an element with that class is on a page
        try {
            elem = document.querySelector(`.${classname}`);
        }
        catch {
            throw new Error(`Could not get element: ${classname}`);
        }
        if (elem == null) {
            if (logmssg)
                console.log(`%cNo element found with class name: ${classname}.`, 'color: yellow;');
            if (!supressexcpt)
                Object.create(new RWBReferenceError(`${componentname}NullReference`, `Element not found`));
            return true;
        }
        return false;
    }
    ;
    static checkLocalStorageEqualNull(componentname, key, checkemptystring, logmessage) {
        let logmssg = true;
        if (!logmessage)
            logmssg = logmessage;
        if (localStorage.getItem(`${key}`) == null) {
            if (logmssg)
                console.log(`%cNo local storage for ${componentname}.`, 'color:purple;');
            return true;
        }
        if (checkemptystring)
            return RWBError.checkLocalStorageNullorEmpty(componentname, key, logmssg);
    }
    static checkLocalStorageNullorEmpty(componentname, key, logmessage) {
        let logmssg = true;
        if (!logmessage)
            logmssg = logmessage;
        let test;
        try {
            test = localStorage.getItem(`${key}`);
        }
        catch {
            throw new Error(`Could get local storage key: ${key}`);
        }
        if (test == null) {
            if (logmssg)
                console.log(`%cLocal storage key not found: ${key}.`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBReferenceError(`${componentname}ReferenceException`, `Key not found`));
            return true;
        }
        if (test == "" || test == "[]") {
            if (logmssg)
                console.log(`%cLocal storage value is empty for key: ${key}`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBReferenceError(`${componentname}ReferenceException`, `Value is empty`));
            return true;
        }
        return false;
    }
}
exports.default = RWBError;
/** Create this object to record reference errors. */
class RWBReferenceError extends ReferenceError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    referror;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.referror = new ReferenceError(this.message);
        RWBReferenceError.count++;
        console.log(this.referror);
    }
    ;
}
exports.RWBReferenceError = RWBReferenceError;
class RWBSyntaxError extends SyntaxError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    referror;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.referror = new SyntaxError(this.message);
        RWBSyntaxError.count++;
        console.log(this.referror);
    }
    ;
}
exports.RWBSyntaxError = RWBSyntaxError;
/** Create this object to record reference errors. */
class RWBDomException extends DOMException {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    domexception;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.domexception = new DOMException(this.message);
        RWBDomException.count++;
        console.log(this.domexception);
    }
    ;
}
exports.RWBDomException = RWBDomException;

},{}],31:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HTML link element data. Used with anchor tags.
 */
class RWBLink {
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
        this.title = title,
            this.innerText = innerText,
            this.pageName = pageName,
            this.hReference = hReference,
            RWBLink.count++;
    }
}
exports.default = RWBLink;

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const RWBErrorBus_1 = require("./RWBErrorBus");
/** An RWBParseJSON parses json and stores the parsed string.  */
class RWBParseJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    parsestr;
    returnstr;
    passed;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(parsestr) {
        RWBParseJSON.count++;
        this.parsestr = parsestr;
        this.passed = this.parseJSON();
    }
    ;
    parseJSON() {
        try {
            this.returnstr = JSON.parse(this.parsestr);
        }
        catch (e) {
            this.returnstr = this.parsestr;
            new RWBErrorBus_1.RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
}
exports.default = RWBParseJSON;

},{"./RWBErrorBus":30}],33:[function(require,module,exports){
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
    static buildRWBCards(cardsData) {
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

},{"../components/RWBCard":8}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Create this object to record performance start and end marks. */
class RWBPerf {
    /**Counts the number of objects instantiated */
    static count = 0;
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
        RWBPerf.count++;
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
exports.default = RWBPerf;

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
const RWBParser_1 = require("./RWBParser");
const RWBErrorBus_1 = require("./RWBErrorBus");
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
    static getToDoInStorage(checkemptyvaluestring, logmessage) {
        if (RWBErrorBus_1.default.checkLocalStorageEqualNull("ToDoList", "ToDos", checkemptyvaluestring, logmessage)) {
            return false;
        }
        let parsestr = localStorage.getItem('ToDos');
        let parsetest = Object.create(new RWBParser_1.default(parsestr));
        if (!parsetest.passed) {
            //parsed JSON is malformed
            localStorage.removeItem('ToDos');
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, 'color:orange;font-size:14px;font-weight:bold;', 'color:orange;font-size:16px;');
            return false;
        }
        this.ToDoInStorage = parsetest.returnstr;
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
        let todosstoragecache = ToDoList.getToDoInStorage(false, false);
        let todos = ToDoList.ToDoInStorage;
        if (todos == null) { //Nothing in storage, push current
            localStorage.setItem('ToDos', JSON.stringify(ToDos));
            console.log(`%c<RWB>%cCreated to-do cache key: ToDos`, 'color:cyan;font-size:16px;font-weight:bold;', 'color:cyan;font-size:16px;');
        }
        else { //Add the new ToDo to the current ToDos and push via setItem()
            todos.push(ToDo);
            localStorage.setItem('ToDos', JSON.stringify(todos));
        }
        console.log(`%c<RWB>%cAdded to-do cache: ${description}`, 'color:cyan;font-weight:bold;', 'color:cyan;');
    }
    /**
     * Removes a To-Do item from Local Storage. The requested To-Do to remove is
     *  pulled individually from the key-value pair object.
     * @param item - the To-Do item requested to remove
     */
    removetoDoFromStorage(item) {
        ToDoList.ToDoInStorage = ToDoList.ToDoInStorage.filter((todo) => todo.todoitem !== item);
        console.log(`%c<RWB>%cDeleted todo cache: ${item}`, 'color:darkcyan;font-weight:bold;', 'color:darkcyan;');
        let jsonstr = JSON.stringify(ToDoList.ToDoInStorage);
        if (jsonstr == "" || jsonstr == "[]") {
            localStorage.removeItem('ToDos');
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, 'color:darkcyan;font-size:14px;font-weight:bold;', 'color:darkcyan;font-size:16px;');
            return;
        }
        localStorage.setItem('ToDos', jsonstr);
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
        if (firstPaint) {
            //Add to list storage
            this.addtoDoToStorage(description);
        }
        //Add the row to the ToDos table
        TABLEITEM.appendChild(tableFrag);
        console.log(`%c<RWB>%cCreated to-do table row`, 'color:gold;font-weight:bold;', 'color:gold;');
        //Add an event listener for when 'delete' is clicked
        delBOX.addEventListener("click", () => {
            this.DeleteButton(delBOX);
        });
    }
    /**
     * Function called to create the To-Do item rows from To-Dos stored in the browser Local Storage.
     */
    populateToDoList() {
        if (ToDoList.ToDoInStorage != null) {
            for (let i = 0; i < ToDoList.ToDoInStorage.length; i++) {
                this.AddToDoRow(ToDoList.ToDoInStorage[i].todoitem, false);
            }
        }
    }
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
            ADDITEMENTER.value = '';
        });
        /**Add input text to the todo list when using key enter*/
        ADDITEMENTER.addEventListener("keydown", (e) => {
            if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                this.AddToDoRow(ADDITEMENTER.value, true);
                ADDITEMENTER.value = '';
            }
        });
    }
    /**
     * function determining the delete button. Items are deleted when pushed, but are
     *  not removed from storage without 'Complete?' checkebox checked.
     * @param box input element
     */
    DeleteButton(box) {
        if (box.parentNode == null || box.parentNode.previousSibling == null ||
            box.parentNode.previousSibling.previousSibling == null) {
            throw new Error("Missing a table element.");
        }
        const rowChkBx = box.parentNode.previousSibling.previousSibling;
        /** Input element */
        const rowChkBxIN = rowChkBx.childNodes[0];
        const todoTable = ToDoList.ToDoElements.todoTable;
        const tr = box.parentNode.parentNode;
        let i = tr.rowIndex;
        const value = box.parentNode.previousSibling.textContent;
        if (rowChkBxIN.checked) {
            //remove row since completed
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cDeleted todo row: ${box.parentElement.previousElementSibling.textContent}`, 'color:goldenrod;font-weight:bold;', 'color:goldenrod;');
            if (value != 'Add a ToDO Item.') {
                ToDoList.ToDOs--;
                //delete associated storage item
                this.removetoDoFromStorage(value);
            }
        }
        else {
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cRemoved todo row: ${box.parentElement.previousElementSibling.textContent}`, 'color:goldenrod;font-weight:bold;', 'color:goldenrod;');
            ToDoList.ToDOs--;
        }
    }
    /**
     * This function is called to seed the To-Do List when there are no Local Storage items
     *  which would populate the list. The sample remains on page but is never stored in the browser.
     * @param tbody table body element
     */
    createSampleTo_Do(tbody) {
        if (ToDoList.getToDoInStorage(false, true))
            return;
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
        td2DEL.addEventListener("click", () => {
            this.DeleteButton(td2DEL);
            console.log(`%c<RWB>%cRemoved todo: ${td2DEL.parentElement.previousElementSibling.textContent}`, 'color:purple;font-weight:bold;', 'color:purple;');
        });
    }
}
exports.ToDoList = ToDoList;

},{"./RWBErrorBus":30,"./RWBParser":32}],36:[function(require,module,exports){
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
}
exports.default = WebBit;

},{}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zLnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZXVybC50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2NvbXBvbmVudHMvZG9tYWlubG9va3VwLnRzIiwic3JjL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwLnRzIiwic3JjL2NvbXBvbmVudHMvc2xpZGVyYmFyLnRzIiwic3JjL2RhdGEvZGF0YS50cyIsInNyYy9kYXRhL25hdml0ZW1zLnRzIiwic3JjL2RhdGEvcG9ydG51bXMudHMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbHMvQVBJLnRzIiwic3JjL21vZGVscy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvbW9kZWxzL0NvbG9yQ29kZS50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaC50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaE1hcmt1cC50cyIsInNyYy9tb2RlbHMvRXhwYW5kaW5nTGlzdC50cyIsInNyYy9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zLnRzIiwic3JjL21vZGVscy9Hcm93aW5nQ2FyZC50cyIsInNyYy9tb2RlbHMvUldCRXJyb3JCdXMudHMiLCJzcmMvbW9kZWxzL1JXQkxpbmsudHMiLCJzcmMvbW9kZWxzL1JXQlBhcnNlci50cyIsInNyYy9tb2RlbHMvUmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvU2NyaXB0UGVyZi50cyIsInNyYy9tb2RlbHMvVG9Eby50cyIsInNyYy9tb2RlbHMvV2ViQml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSx1Q0FBdUM7QUFDdkMsbUNBQWtDO0FBQ2xDLHlEQUFrRDtBQUNsRCxxREFBMkM7QUFDM0MsdURBQTRDO0FBRTVDLE1BQU0sZUFBZSxHQUFHO0lBQ3BCLGNBQWMsRUFBRSxHQUFHLEVBQUU7UUFDakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFFN0UsSUFBSSxxQkFBUSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQzFGLDBCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtJQUM5QyxDQUFDO0lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUVYLDhEQUE4RDtRQUM5RCxJQUFJLHFCQUFRLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ2xGLGVBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2QixDQUFDO0NBQ0osQ0FBQTtBQUNELGtCQUFlLGVBQWUsQ0FBQzs7Ozs7QUN2Qi9CLHVDQUF1QztBQUN2QyxpRUFBbUU7QUFFbkU7O0dBRUc7QUFDSCxNQUFNLGdCQUFnQixHQUFHO0lBQ3JCOzs7O09BSUc7SUFDSCxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AsSUFBSSwrQkFBd0MsQ0FBQTtRQUM1QyxJQUFHO1lBQ0MsK0JBQStCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxHQUFHLEVBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFLGVBQWUsQ0FBQyxDQUFBO1NBQy9FO1FBRUQsK0JBQStCO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSx5Q0FBc0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQzs7Ozs7QUMxQmhDLHVDQUF1QztBQUN2QywyREFBK0Q7QUFFL0QsTUFBTSxzQkFBc0IsR0FBRztJQUMzQixJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AsNkRBQTZEO1FBQzdELGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsb0NBQW9CLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqRiwyQ0FBMkM7UUFDM0MsaUNBQWlDO1FBQ2pDLCtEQUErRDtRQUMvRCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQ3RHLE1BQU0scUJBQXFCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFFeEcsK0VBQStFO1FBQy9FLEtBQUssSUFBSSxJQUFJLElBQUksb0JBQW9CLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyx5REFBeUQ7WUFDekQsK0VBQStFO1lBQy9FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHFCQUFxQjtvQkFDL0MsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3dCQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7d0JBQ2pELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixJQUFJLElBQUk7NEJBQUUsT0FBTzt3QkFDL0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsc0NBQXNDLENBQUMsQ0FBQztvQkFDN0csQ0FBQyxDQUFDLEVBQUU7b0JBQ0osQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3dCQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7d0JBQ2xELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixJQUFJLElBQUk7NEJBQUUsT0FBTzt3QkFDL0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztvQkFDOUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCx3Q0FBd0M7UUFDeEMsS0FBSyxJQUFJLElBQUksSUFBSSxxQkFBcUIsRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFFRCxrQkFBZSxzQkFBc0IsQ0FBQzs7Ozs7QUMxQ3RDLHVDQUF1QztBQUN2QyxxRUFBNkQ7QUFDN0QsK0NBQThDO0FBRTlDLE1BQU0sbUJBQW1CLEdBQUc7SUFDeEIsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUVQLDBEQUEwRDtRQUMxRCw2QkFBNkI7UUFDN0IsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBaUI7WUFDOUMsQ0FBQyxVQUFVLEVBQUUseURBQXlELENBQUM7U0FDMUUsQ0FBQyxDQUFDO1FBR0gsNEJBQTRCO1FBQzVCLElBQUksaUJBQWlCLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxrQkFBZSxDQUFDLENBQUM7UUFFaEUsK0JBQStCO1FBQy9CLElBQUksb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckYsYUFBYSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQTtRQUVsRCwrQkFBK0I7UUFDL0IsS0FBSyxJQUFJLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxlQUFlLEVBQUM7WUFDL0Msb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQzs7Ozs7QUM3Qm5DLHVDQUF1QztBQUN2Qyx1REFBMEQ7QUFFMUQsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsZ0NBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU3RSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLGtCQUFrQixFQUFFO2dCQUNqRixPQUFPO2FBQ1Y7WUFDRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsOEJBQThCO1lBQzlCLElBQUksT0FBTyxHQUF5QixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFFN0YsZ0VBQWdFO1lBQ2hFLDJEQUEyRDtZQUMzRCxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxRQUFRLEdBQXVCLElBQUksQ0FBQztnQkFDeEMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQWMsQ0FBQyxFQUFFO29CQUMvRCxnQ0FBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzNDO2FBQ0o7WUFFRCxpREFBaUQ7WUFDakQsS0FBSyxJQUFJLEVBQUUsSUFBSSxPQUFPLEVBQUU7Z0JBQ3BCLGdDQUFrQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVDO1FBRUwsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQUVELGtCQUFlLGlCQUFpQixDQUFDOzs7OztBQ2xDakMsdUNBQXVDO0FBQ3ZDLCtDQUF1QztBQUN2QyxxREFBMkM7QUFFM0M7O0dBRUc7QUFDSCxNQUFNLFlBQVksR0FBRztJQUNqQixZQUFZLEVBQUU7UUFDVjs7V0FFRztRQUNILElBQUksRUFBRSxHQUFHLEVBQUU7WUFDUCxNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekM7O2VBRUc7WUFDSCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELCtCQUErQjtZQUMvQixJQUFJLFVBQTBCLENBQUM7WUFFL0IsaUNBQWlDO1lBQ2pDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxFQUFDLDhDQUE4QztnQkFDakUsSUFBSTtvQkFDQSxVQUFVLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7aUJBQ3ZHO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzVFO2FBQ0o7aUJBQ0ksRUFBRSw0REFBNEQ7Z0JBQy9ELElBQUk7b0JBQ0EsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztpQkFDM0c7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDM0U7YUFDSjtZQUVELG1DQUFtQztZQUNuQyxJQUFJO2dCQUNBLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUNyRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7WUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUNEOzs7O1dBSUc7UUFDSCxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQ2Q7O2VBRUc7WUFDSCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsV0FBVyxHQUFHLG1CQUFtQixDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixVQUFVLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFdkMsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUNELGVBQWUsRUFBRSxHQUFHLEVBQUU7WUFDbEIsdURBQXVEO1lBQ3ZELDZCQUE2QjtZQUM3QixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN4RCxNQUFNLFNBQVMsR0FBRyxhQUFhO2lCQUMxQixXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUvQyxrQ0FBa0M7WUFDbEMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFL0IsZ0RBQWdEO2dCQUNoRCxZQUFZLENBQUMsV0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMvQyx3RUFBd0U7Z0JBQ3hFLGlEQUFpRDtnQkFDakQsc0RBQXNEO2dCQUNsRCxvQ0FBb0M7Z0JBQ3BDLHlFQUF5RTtnQkFDN0UsVUFBVTtnQkFDTixpQ0FBaUM7Z0JBQ2pDLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzdELEdBQUc7Z0JBQ0gsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztLQUNKO0lBRUQsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNQLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6QyxxQ0FBcUM7WUFDckMsSUFBSSxNQUFNLEdBQWdCLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRTVGLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0QsV0FBVyxFQUFFLEdBQUcsRUFBRTtZQUNkLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsVUFBVSxDQUFDLFdBQVcsR0FBRyx3REFBd0QsQ0FBQztZQUVsRixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXZDLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFDRCx1QkFBdUIsRUFBRSxDQUFDLE1BQW1CLEVBQUUsRUFBRTtZQUM3QywrQ0FBK0M7WUFDL0MsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDNUQsY0FBYyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsY0FBYyxDQUFDLElBQUksR0FBRyw2R0FBNkcsQ0FBQTtZQUNuSSxjQUFjLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1lBQy9DLGNBQWMsQ0FBQyxXQUFXLEdBQUcsa0NBQWtDLENBQUM7WUFFaEUsb0NBQW9DO1lBQ3BDLGNBQWMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFakQsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztLQUNKO0NBQ0osQ0FBQTtBQUVELGtCQUFlLFlBQVksQ0FBQzs7Ozs7QUM3STVCLHVDQUF1QztBQUN2QyxxRUFBOEQ7QUFDOUQsK0NBQThDO0FBQzlDLCtEQUF3RDtBQUN4RCx1REFBZ0Q7QUFDaEQsbUNBQTRCO0FBQzVCLDJDQUEwQztBQUMxQyx1Q0FBdUM7QUFDdkMsaURBQTRDO0FBQzVDLHFEQUEyQztBQUMzQyxpREFBMEM7QUFDMUMsMkNBQW9DO0FBRXBDLE1BQU0sY0FBYyxHQUFHO0lBQ25CLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtRQUVyRSxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMseUJBQXlCO0lBQzdDLENBQUM7SUFDRCxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ1osUUFBUSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM5Qiw4Q0FBOEM7WUFDOUMsS0FBSywyQkFBMkIsQ0FBQztZQUNqQyxLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSywyQkFBMkIsQ0FBQztZQUNqQyxLQUFLLGFBQWE7Z0JBQ2QsaUJBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDhCQUE4QjtZQUV6RCw4Q0FBOEM7WUFDOUMsS0FBSyxpQkFBaUIsQ0FBQztZQUN2QixLQUFLLGlCQUFpQjtnQkFDbEIsZ0NBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLE1BQU07WUFDViwyQkFBMkI7WUFDM0IsS0FBSyxxQkFBcUI7Z0JBQ3RCLHFCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixNQUFNO1lBQ1Ysa0NBQWtDO1lBQ2xDLEtBQUssc0JBQXNCO2dCQUN2Qix5QkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsOEJBQThCO1lBQzlCLEtBQUssaUJBQWlCO2dCQUNsQixlQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU07WUFDVix3Q0FBd0M7WUFDeEMsS0FBSyxrQkFBa0I7Z0JBQ25CLG1CQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ2xDLE1BQU07WUFDVix1Q0FBdUM7WUFDdkMsS0FBSyxpQkFBaUI7Z0JBQ2xCLHNCQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU07WUFDVixrQ0FBa0M7WUFDbEMsS0FBSyxrQkFBa0I7Z0JBQ25CLDZCQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMzQixNQUFNO1lBQ1YsZ0NBQWdDO1lBQ2hDLEtBQUssMEJBQTBCO2dCQUMzQixzQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixNQUFNO1lBQ1YsS0FBSyxvQkFBb0I7Z0JBQ3JCLG1CQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsY0FBYyxDQUFDOzs7OztBQ2xFOUIsTUFBcUIsT0FBTztJQUN4Qjs7T0FFRztJQUNLLGVBQWUsQ0FBa0I7SUFDekM7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLGtCQUFrQixDQUFDLE9BQWU7UUFDckMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLE9BQU8sRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN0QyxVQUFVLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDekMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQzFDLENBQUE7UUFDRCxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RCwrQ0FBK0M7UUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN0RCxlQUFlLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekMsWUFBWSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQy9DLFlBQVksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBRXhDLHFEQUFxRDtRQUNyRCxrRUFBa0U7UUFDbEUsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFDO1lBQ3hCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNwRjtRQUVELHFCQUFxQjtRQUNyQiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsRCxPQUFPLE1BQU0sQ0FBQztJQUVsQixDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNLLDRCQUE0QixDQUFDLGVBQWdDLEVBQUUsSUFBcUI7UUFDeEYsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9FLG9EQUFvRDtZQUNwRCw0Q0FBNEM7WUFDNUMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUNBQXVDO1lBQ3ZGLElBQUksUUFBUSxHQUFxQixlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRSxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtZQUVoSCxxREFBcUQ7WUFDckQsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3JELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxXQUFXLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDL0MsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQ3JDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDakMsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztDQUNKO0FBM0dELDBCQTJHQzs7OztBQ2hIRCx1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDLDBGQUEwRjs7QUFHMUY7O0dBRUc7QUFDSCxNQUFNLGVBQWUsR0FBRztJQUNwQixVQUFVLEVBQUUsQ0FBQztJQUNiOztPQUVHO0lBQ0gsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNQLGVBQWUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELHlCQUF5QjtRQUN6QixTQUFTLFVBQVUsQ0FBQyxDQUFRO1lBQ3hCLGVBQWUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBRUQsMkJBQTJCO1FBQzNCLFNBQVMsWUFBWSxDQUFDLENBQVE7WUFDMUIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxxREFBcUQ7UUFDckQsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0UsS0FBSyxJQUFJLEdBQUcsSUFBSSxxQkFBcUIsRUFBQztZQUNsQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUUsRUFBRTtnQkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksaUJBQWlCLEVBQUM7WUFDOUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFFLEVBQUU7Z0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsK0NBQStDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsS0FBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUM7WUFDekIsaUJBQWlCO1lBQ2pCLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQTtZQUM3QywrQ0FBK0M7WUFDL0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFFLEVBQUU7Z0JBQzlCLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsQ0FBUyxFQUFDLEVBQUU7UUFDakIsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFBQyxlQUFlLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtTQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtTQUFDO1FBQ3ZELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLFNBQVMsR0FBbUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNwQztRQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksU0FBUyxHQUFtQixNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN0RSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUNwRSxDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLGVBQWUsQ0FBQzs7Ozs7QUN6RS9CLHVDQUF1QztBQUN2Qyx5Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBRztJQUNoQjs7O09BR0c7SUFDSCxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBRVAsSUFBSSxZQUFxQixDQUFDO1FBQzFCLElBQUc7WUFDQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sR0FBRyxFQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxlQUFlLENBQUMsQ0FBQTtTQUM5RTtRQUVELGlCQUFpQjtRQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQVEsRUFBRSxDQUFDO1FBRWxDLDRFQUE0RTtRQUM1RSxVQUFVLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUM7Ozs7O0FDN0IzQix1Q0FBdUM7QUFDdkMsdUNBQXFDO0FBQ3JDLDJEQUF1RDtBQUV2RDs7O0dBR0c7QUFDSCxNQUFNLGNBQWMsR0FBRztJQUNuQjs7OztTQUlLO0lBQ0wsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNQLHdEQUF3RDtRQUN4RDs7V0FFRztRQUNILElBQUksWUFBWSxHQUFxQjtZQUNqQyw2QkFBYSxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDO1lBQ3BGLDZCQUFhLENBQUMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQztZQUN4RSw2QkFBYSxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztTQUNoRixDQUFDO1FBRUYsdURBQXVEO1FBQ3ZELDRFQUE0RTtRQUM1RTsyQ0FDbUM7UUFDbkMsSUFBSSxhQUFhLEdBQVE7WUFDckIsNkJBQWEsQ0FBQyxhQUFhLENBQUMsY0FBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLDZCQUFhLENBQUMsYUFBYSxDQUFDLGNBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQyw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxjQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEQsQ0FBQztRQUdGLHdDQUF3QztRQUN4Qyw2REFBNkQ7UUFDN0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhO1lBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUc7WUFDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksMkJBQTJCO1lBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQjtZQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtZQUM1QyxvQ0FBb0M7WUFDeEMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRTtnQkFDaEQsc0JBQXNCO2dCQUN0QixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFMUQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztZQUM3RSxDQUFDLENBQUE7WUFDRCxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFELGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7UUFFRCwyREFBMkQ7UUFDM0Qsb0ZBQW9GO1FBQ3BGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDOUIsZ0RBQWdEO2dCQUNoRCwrQ0FBK0M7Z0JBQy9DLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDM0MsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7YUFDbkM7U0FDSjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsY0FBYyxDQUFBOzs7OztBQ3ZFN0IsdUNBQXVDO0FBQ3ZDLG1EQUEyQztBQUUzQyxNQUFNLGVBQWUsR0FBRztJQUNwQixlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLG1FQUFtRTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUE0QixDQUFDO1FBQ2pGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQTRCLENBQUM7UUFDbEYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBNEIsQ0FBQztRQUNoRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUE0QixDQUFDO1FBRXRGLGdGQUFnRjtRQUNoRixNQUFNLGlCQUFpQixHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFekgsMkRBQTJEO1FBQzNELElBQUksbUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsZUFBZSxDQUFDOzs7OztBQ3BCL0IsdUNBQXVDO0FBQ3ZDLG1EQUEyQztBQUUzQyxNQUFNLGNBQWMsR0FBRztJQUNuQixjQUFjLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQTRCLENBQUM7UUFDbkYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBNEIsQ0FBQztRQUMvRSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUE0QixDQUFDO1FBQzNFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQTRCLENBQUM7UUFDL0UsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBNEIsQ0FBQztRQUMzRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUE0QixDQUFDO1FBQzdFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQTRCLENBQUM7UUFDekUsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBNEIsQ0FBQztRQUU3RSxnRkFBZ0Y7UUFDaEYsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQzlELElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixFQUM1RSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFDM0Qsd0JBQXdCLEVBQUUsNEJBQTRCLEVBQ3RELHVCQUF1QixDQUFDLENBQUM7UUFFN0IsMkRBQTJEO1FBQzNELElBQUksbUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsY0FBYyxDQUFDOzs7OztBQzNCOUIsdUNBQXVDO0FBQ3ZDLG1EQUEyQztBQUUzQyxNQUFNLEtBQUssR0FBRztJQUNWOzs7T0FHRztJQUNILGNBQWMsRUFBRSxHQUFHLEVBQUU7UUFDakIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBNEIsQ0FBQztRQUNwRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUE0QixDQUFDO1FBQ3RGLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQTRCLENBQUM7UUFDOUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBNEIsQ0FBQztRQUV0RixnRkFBZ0Y7UUFDaEYsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RSxNQUFNLGNBQWMsR0FBRyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXhILDJEQUEyRDtRQUMzRCxJQUFJLG1CQUFTLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0NBQ0osQ0FBQTtBQUVELGtCQUFlLEtBQUssQ0FBQzs7OztBQ3ZCckIsdUNBQXVDOztBQUV2QyxNQUFNLFlBQVksR0FBRztJQUNqQixJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AscUNBQXFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUEyQixDQUFDO1FBQzlFLElBQUksSUFBSSxJQUFJLElBQUksRUFBQyxFQUFFLDRDQUE0QztZQUMzRCxNQUFNLElBQUksY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsV0FBVyxFQUFFLEdBQUcsRUFBRTtRQUNkLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixDQUFDO1FBQ3pFLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxHQUFHLEdBQUcsOEJBQThCLEdBQUcsS0FBSyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBO0FBRUQsa0JBQWUsWUFBWSxDQUFDOzs7OztBQ3BCNUIsdUNBQXVDO0FBQ3ZDLHFEQUEwQztBQUUxQyxNQUFNLGdCQUFnQixHQUFHO0lBQ3JCLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxxQkFBcUI7UUFDckIsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7OztXQUdPO0lBQ1AsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLE1BQU0sY0FBYyxHQUFHLElBQUksb0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBQ2pGOztXQUVHO1FBQ0gsTUFBTSxRQUFRO1lBQ1YsTUFBTSxHQUFZLEtBQUssQ0FBQztZQUN4QixXQUFXLENBQWM7WUFFekI7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztZQUFBLENBQUM7U0FDTDtRQUNELE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELElBQUcsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUMvQixLQUFLLElBQUksSUFBSSxJQUFJLG9CQUFvQixFQUFDO2dCQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFFMUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQixJQUFJLGdCQUFnQixHQUFXLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBVyxDQUFDO29CQUNsRixJQUFJLFdBQTRCLENBQUM7b0JBRWpDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7d0JBQ2pCLElBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxFQUFFLHlCQUF5Qjs0QkFDakUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDN0UsV0FBVyxDQUFDLFdBQVcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO3lCQUMzRzs2QkFDSSxFQUFFLHVCQUF1Qjs0QkFDMUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBb0IsQ0FBQzs0QkFDMUUsV0FBVyxDQUFDLFdBQVcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO3lCQUMzRztxQkFDSjtvQkFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7d0JBRS9DLFdBQVcsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFFRCxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUEsQ0FBQyx5QkFBeUI7SUFDbEQsQ0FBQztDQUNKLENBQUE7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQzs7OztBQ3pEaEMsdUNBQXVDOztBQUV2QyxNQUFNLFNBQVMsR0FBRztJQUNkLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNoRCxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQTRCLENBQUM7UUFDeEUsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFDRCxjQUFjLEVBQUUsQ0FBQyxPQUFvQixFQUFFLFFBQTBCLEVBQUUsRUFBRTtRQUNqRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUMvQyxDQUFDO0NBQ0osQ0FBQTtBQUVELGtCQUFlLFNBQVMsQ0FBQzs7O0FDZHpCLGFBQWEsQ0FBQTs7O0FBQ2IsdUNBQXVDO0FBQ3ZDLDZDQUFzQztBQUN0QywrREFBd0Q7QUFFeEQsb0NBQW9DO0FBRXBDOztHQUVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssQ0FDL0IsSUFBSSxnQkFBTSxDQUNOLGNBQWMsRUFDZCxDQUFDLEVBQ0QsZUFBZSxFQUNmLGtEQUFrRCxFQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUNyQix5QkFBeUIsRUFDekIsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxJQUFJLHlCQUFlLENBQ2YsY0FBYyxFQUNkLDRDQUE0QyxFQUM1Qyw0Q0FBNEMsRUFDNUMsVUFBVSxFQUNWLGVBQWUsRUFDZixDQUFDLENBQ0osQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixlQUFlLEVBQ2YsQ0FBQyxFQUNELGFBQWEsRUFDYiw0Q0FBNEMsRUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDdEIsMEJBQTBCLEVBQzFCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsSUFBSSx5QkFBZSxDQUNmLFlBQVksRUFDWiwwQ0FBMEMsRUFDMUMsMENBQTBDLEVBQzFDLFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsQ0FBQyxDQUNKLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sV0FBVyxFQUNYLENBQUMsRUFDRCxtQkFBbUIsRUFDbkIsOENBQThDLEVBQzlDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ3RCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsb0NBQW9DLEVBQ3BDLElBQUkseUJBQWUsQ0FDZix1QkFBdUIsRUFDdkIsMkRBQTJELEVBQzNELHFEQUFxRCxFQUNyRCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLENBQUMsQ0FDSixDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFNBQVMsRUFDVCxDQUFDLEVBQ0QsWUFBWSxFQUNaLDhCQUE4QixFQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHFEQUFxRCxDQUN4RCxFQUNELElBQUksZ0JBQU0sQ0FDTixZQUFZLEVBQ1osQ0FBQyxFQUNELFlBQVksRUFDWixzQkFBc0IsRUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDcEIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixpREFBaUQsQ0FDcEQsRUFDRCxJQUFJLGdCQUFNLENBQ04sT0FBTyxFQUNQLENBQUMsRUFDRCxlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsNENBQTRDLENBQy9DLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFNBQVMsRUFDVCxDQUFDLEVBQ0QsaUJBQWlCLEVBQ2pCLCtDQUErQyxFQUMvQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixJQUFJLHlCQUFlLENBQ2YsVUFBVSxFQUNWLHdDQUF3QyxFQUN4Qyx3Q0FBd0MsRUFDeEMsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixDQUFDLENBQ0osQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixTQUFTLEVBQ1QsQ0FBQyxFQUNELFVBQVUsRUFDVixpREFBaUQsRUFDakQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQiwyQkFBMkIsRUFDM0IsSUFBSSx5QkFBZSxDQUNmLGlCQUFpQixFQUNqQiwrQ0FBK0MsRUFDL0MsK0NBQStDLEVBQy9DLFVBQVUsRUFDVixVQUFVLEVBQ1YsQ0FBQyxDQUNKLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sWUFBWSxFQUNaLEVBQUUsRUFDRixrQkFBa0IsRUFDbEIsOENBQThDLEVBQzlDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsMkJBQTJCLEVBQzNCLElBQUkseUJBQWUsQ0FDZixrQkFBa0IsRUFDbEIsZ0RBQWdELEVBQ2hELGdEQUFnRCxFQUNoRCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLE9BQU8sRUFDUCxFQUFFLEVBQ0YsK0JBQStCLEVBQy9CLGtEQUFrRCxFQUNsRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixrQkFBa0IsRUFDbEIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixJQUFJLHlCQUFlLENBQ2YsYUFBYSxFQUNiLCtFQUErRSxFQUMvRSw0QkFBNEIsRUFDNUIsT0FBTyxFQUNQLCtCQUErQixFQUMvQixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixXQUFXLEVBQ1gsRUFBRSxFQUNGLG1CQUFtQixFQUNuQixzQ0FBc0MsRUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYiw4QkFBOEIsRUFDOUIsSUFBSSx5QkFBZSxDQUNmLFVBQVUsRUFDViwyQ0FBMkMsRUFDM0Msd0NBQXdDLEVBQ3hDLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sWUFBWSxFQUNaLEVBQUUsRUFDRixrQkFBa0IsRUFDbEIsd0NBQXdDLEVBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsa0JBQWtCLEVBQ2xCLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMENBQTBDLEVBQzFDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGNBQWMsRUFDZCxFQUFFLEVBQ0Ysb0JBQW9CLEVBQ3BCLG9EQUFvRCxFQUNwRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQix5QkFBeUIsRUFDekIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixJQUFJLHlCQUFlLENBQ2Ysa0JBQWtCLEVBQ2xCLDJEQUEyRCxFQUMzRCxnREFBZ0QsRUFDaEQsVUFBVSxFQUNWLGVBQWUsRUFDZixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixrQkFBa0IsRUFDbEIsRUFBRSxFQUNGLG1CQUFtQixFQUNuQixvREFBb0QsRUFDcEQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQix3QkFBd0IsRUFDeEIsSUFBSSx5QkFBZSxDQUNmLGdCQUFnQixFQUNoQixpREFBaUQsRUFDakQsOENBQThDLEVBQzlDLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sWUFBWSxFQUNaLEVBQUUsRUFDRixlQUFlLEVBQ2YsMENBQTBDLEVBQzFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3BCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsb0NBQW9DLEVBQ3BDLElBQUkseUJBQWUsQ0FDZixXQUFXLEVBQ1gsNENBQTRDLEVBQzVDLHlDQUF5QyxFQUN6QyxVQUFVLEVBQ1YsWUFBWSxFQUNaLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGVBQWUsRUFDZixFQUFFLEVBQ0Ysc0JBQXNCLEVBQ3RCLGtDQUFrQyxFQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQixtQkFBbUIsRUFDbkIsd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQixJQUFJLHlCQUFlLENBQ2YsWUFBWSxFQUNaLDhDQUE4QyxFQUM5QywwQ0FBMEMsRUFDMUMsVUFBVSxFQUNWLGVBQWUsRUFDZixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixLQUFLLEVBQ0wsRUFBRSxFQUNGLEtBQUssRUFDTCxnQ0FBZ0MsRUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEVBQ2IsSUFBSSx5QkFBZSxDQUNmLFlBQVksRUFDWiwyQ0FBMkMsRUFDM0MsMENBQTBDLEVBQzFDLFVBQVUsRUFDVixLQUFLLEVBQ0wsRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sUUFBUSxFQUNSLEVBQUUsRUFDRixRQUFRLEVBQ1IsMENBQTBDLEVBQzFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3BCLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsNkJBQTZCLEVBQzdCLElBQUkseUJBQWUsQ0FDZixjQUFjLEVBQ2QsNENBQTRDLEVBQzVDLDRDQUE0QyxFQUM1QyxVQUFVLEVBQ1YsU0FBUyxFQUNULEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLEtBQUssRUFDTCxFQUFFLEVBQ0YsS0FBSyxFQUNMLDhDQUE4QyxFQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLHNCQUFzQixFQUN0QixJQUFJLHlCQUFlLENBQ2YsMEJBQTBCLEVBQzFCLG1DQUFtQyxFQUNuQyxpQ0FBaUMsRUFDakMsS0FBSyxFQUNMLEtBQUssRUFDTCxFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixvQkFBb0IsRUFDcEIsRUFBRSxFQUNGLG9CQUFvQixFQUNwQixpREFBaUQsRUFDakQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsdUJBQXVCLEVBQ3ZCLCtCQUErQixFQUMvQiw2QkFBNkIsRUFDN0IsSUFBSSx5QkFBZSxDQUNmLGtCQUFrQixFQUNsQixzREFBc0QsRUFDdEQsZ0RBQWdELEVBQ2hELFVBQVUsRUFDVixZQUFZLEVBQ1osRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sYUFBYSxFQUNiLEVBQUUsRUFDRixNQUFNLEVBQ04sc0RBQXNELEVBQ3RELElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YscUNBQXFDLEVBQ3JDLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMENBQTBDLEVBQzFDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1YsYUFBYSxFQUNiLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLFFBQVEsRUFDUixFQUFFLEVBQ0YsS0FBSyxFQUNMLHdDQUF3QyxFQUN4QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixJQUFJLHlCQUFlLENBQ2YsV0FBVyxFQUNYLCtDQUErQyxFQUMvQyx5Q0FBeUMsRUFDekMsVUFBVSxFQUNWLEtBQUssRUFDTCxFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixTQUFTLEVBQ1QsRUFBRSxFQUNGLFNBQVMsRUFDVCx5Q0FBeUMsRUFDekMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsSUFBSSx5QkFBZSxDQUNmLGFBQWEsRUFDYiwyQ0FBMkMsRUFDM0MsMkNBQTJDLEVBQzNDLFVBQVUsRUFDVixTQUFTLEVBQ1QsRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sU0FBUyxFQUNULEVBQUUsRUFDRixzQkFBc0IsRUFDdEIsK0NBQStDLEVBQy9DLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsMEJBQTBCLEVBQzFCLElBQUkseUJBQWUsQ0FDZixZQUFZLEVBQ1osMENBQTBDLEVBQzFDLDBDQUEwQyxFQUMxQyxVQUFVLEVBQ1Ysc0JBQXNCLEVBQ3RCLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLEtBQUssRUFDTCxFQUFFLEVBQ0Ysc0JBQXNCLEVBQ3RCLHFDQUFxQyxFQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixJQUFJLHlCQUFlLENBQ2YsV0FBVyxFQUNYLHlDQUF5QyxFQUN6Qyx5Q0FBeUMsRUFDekMsVUFBVSxFQUNWLHNCQUFzQixFQUN0QixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixhQUFhLEVBQ2IsRUFBRSxFQUNGLGNBQWMsRUFDZCxtRUFBbUUsRUFDbkUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsSUFBSSx5QkFBZSxDQUNmLGNBQWMsRUFDZCw0Q0FBNEMsRUFDNUMsNENBQTRDLEVBQzVDLFVBQVUsRUFDVixjQUFjLEVBQ2QsRUFBRSxDQUNMLENBQ0osQ0FDSixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FDekIsSUFBSSxnQkFBTSxDQUNOLGlCQUFpQixFQUNqQixFQUFFLEVBQ0YseUJBQXlCLEVBQ3pCLDhDQUE4QyxFQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQiw2QkFBNkIsRUFDN0IsMEJBQTBCLEVBQzFCLHNCQUFzQixFQUN0QixJQUFJLHlCQUFlLENBQ2YsdUJBQXVCLEVBQ3ZCLDBEQUEwRCxFQUMxRCxxREFBcUQsRUFDckQsVUFBVSxFQUNWLGtCQUFrQixFQUNsQixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixNQUFNLEVBQ04sRUFBRSxFQUNGLHVCQUF1QixFQUN2Qix3Q0FBd0MsRUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIsa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QixtQ0FBbUMsRUFDbkMsSUFBSSx5QkFBZSxDQUNmLGNBQWMsRUFDZCw0Q0FBNEMsRUFDNUMsNENBQTRDLEVBQzVDLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sVUFBVSxFQUNWLEVBQUUsRUFDRix3QkFBd0IsRUFDeEIsbUNBQW1DLEVBQ25DLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLDRCQUE0QixFQUM1QixtQkFBbUIsRUFDbkIsMkJBQTJCLEVBQzNCLElBQUkseUJBQWUsQ0FDZixlQUFlLEVBQ2YsNkNBQTZDLEVBQzdDLDZDQUE2QyxFQUM3QyxVQUFVLEVBQ1Ysd0JBQXdCLEVBQ3hCLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLGFBQWEsRUFDYixFQUFFLEVBQ0Ysc0JBQXNCLEVBQ3RCLDBDQUEwQyxFQUMxQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNyQiwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBQ3BCLCtCQUErQixFQUMvQixJQUFJLHlCQUFlLENBQ2YsZUFBZSxFQUNmLDZDQUE2QyxFQUM3Qyw2Q0FBNkMsRUFDN0MsVUFBVSxFQUNWLHNCQUFzQixFQUN0QixFQUFFLENBQ0wsQ0FDSixFQUNELElBQUksZ0JBQU0sQ0FDTixTQUFTLEVBQ1QsRUFBRSxFQUNGLHFDQUFxQyxFQUNyQyxrREFBa0QsRUFDbEQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDckIscUJBQXFCLEVBQ3JCLDBCQUEwQixFQUMxQixzQkFBc0IsRUFDdEIsSUFBSSx5QkFBZSxDQUNmLG1CQUFtQixFQUNuQix1REFBdUQsRUFDdkQsaURBQWlELEVBQ2pELFVBQVUsRUFDVixZQUFZLEVBQ1osRUFBRSxDQUNMLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sY0FBYyxFQUNkLEVBQUUsRUFDRiw4QkFBOEIsRUFDOUIsMkNBQTJDLEVBQzNDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3BCLGlDQUFpQyxFQUNqQyxrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLElBQUkseUJBQWUsQ0FDZixjQUFjLEVBQ2QsNENBQTRDLEVBQzVDLDRDQUE0QyxFQUM1QyxVQUFVLEVBQ1YsOEJBQThCLEVBQzlCLEVBQUUsQ0FDTCxDQUNKLENBQ0osQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQ3JCLElBQUksZ0JBQU0sQ0FDTixNQUFNLEVBQ04sQ0FBQyxFQUNELHFCQUFxQixFQUNyQixrRUFBa0UsRUFDbEUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDdEIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsSUFBSSx5QkFBZSxDQUNmLE1BQU0sRUFDTixvRUFBb0UsRUFDcEUsNkVBQTZFLEVBQzdFLE1BQU0sRUFDTixZQUFZLEVBQ1osQ0FBQyxDQUNKLENBQ0osRUFDRCxJQUFJLGdCQUFNLENBQ04sYUFBYSxFQUNiLEVBQUUsRUFDRix3QkFBd0IsRUFDeEIseUNBQXlDLEVBQ3pDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3JCLDBCQUEwQixFQUMxQiw2QkFBNkIsRUFDN0IsdUNBQXVDLEVBQ3ZDLElBQUkseUJBQWUsQ0FDZiwwQkFBMEIsRUFDMUIsd0RBQXdELEVBQ3hELHdEQUF3RCxFQUN4RCxVQUFVLEVBQ1YsY0FBYyxFQUNkLEVBQUUsQ0FDTCxDQUNKLEVBQ0QsSUFBSSxnQkFBTSxDQUNOLE1BQU0sRUFDTixFQUFFLEVBQ0YsNEJBQTRCLEVBQzVCLEVBQUUsRUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNwQiw0QkFBNEIsRUFDNUIsc0JBQXNCLEVBQ3RCLHlDQUF5QyxFQUN6QyxJQUFJLHlCQUFlLENBQ2Ysc0JBQXNCLEVBQ3RCLHNEQUFzRCxFQUN0RCwrREFBK0QsRUFDL0QsZUFBZSxFQUNmLGlDQUFpQyxFQUNqQyxFQUFFLENBQ0wsQ0FDSixDQUNKLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUM1RCxrQkFBZSxVQUFVLENBQUM7OztBQzVuQjFCLGFBQWEsQ0FBQTs7O0FBQ2IsdUNBQXVDO0FBQ3ZDLCtDQUF3QztBQUV4Qzs7R0FFRztBQUNILE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU8sQ0FDM0IsT0FBTyxFQUNQLE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxDQUNmLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLGlCQUFPLENBQzVCLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFlBQVksQ0FDZixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBTyxDQUMzQixNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sRUFDTixpQkFBaUIsQ0FDcEIsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDMUQsa0JBQWUsUUFBUSxDQUFDOzs7QUM5QnhCLGFBQWEsQ0FBQTs7O0FBQ2IsdUNBQXVDO0FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFpQjtJQUM1QyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQztJQUN4QixDQUFDLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQztJQUN6QixDQUFDLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQztJQUNqQyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUM7SUFDZixDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDO0lBQ2xCLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDO0lBQzlCLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDO0lBQ2pDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztJQUNaLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQztJQUNoQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7SUFDaEIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO0lBQ2hCLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDO0lBQ2pDLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQztJQUN0QixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7SUFDcEIsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUM7SUFDOUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDO0lBQ3BCLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztJQUNsQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7SUFDcEIsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDO0lBQ3JCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDO0lBQ3ZCLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQztJQUNqQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7SUFDYixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7SUFDakIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO0lBQ2hCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDO0lBQzFCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDO0lBQzFCLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDO0lBQ2xDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztDQUNoQixDQUFDLENBQUM7QUFDSCxrQkFBZSxlQUFlLENBQUM7OztBQ25DL0IsYUFBYSxDQUFBOzs7QUFDYix1Q0FBdUM7QUFDdkMsNERBQXFEO0FBQ3JELGdFQUF5RDtBQUN6RCxrRUFBMkQ7QUFDM0QsNERBQXdEO0FBQ3hELG9EQUF5QztBQUd6QyxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFckMsY0FBYztBQUNkOzs7R0FHRztBQUNILE1BQU0sSUFBSSxHQUFHO0lBQ1Q7O09BRUc7SUFDSCxJQUFJO1FBQ0EscURBQXFEO1FBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7WUFFN0MsbUNBQW1DO1lBQ25DLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLHNCQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWpDLDZCQUE2QjtZQUM3Qix3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRCLGdDQUFnQztZQUNoQyx5QkFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2pDLHlCQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFM0IsdURBQXVEO1lBQ3ZELHNCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRXhCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFDO0FBRUYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7O0FDM0NaLHVDQUF1Qzs7O0FBRXZDOzs7Ozs7Ozs7R0FTRztBQUNILE1BQWEsTUFBTTtJQUNWLFNBQVMsQ0FBYztJQUN0QixNQUFNLENBQU07SUFDWixrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDcEMsZ0JBQWdCLENBQVM7SUFDekIsWUFBWSxDQUFNLENBQUMsK0JBQStCO0lBRTFEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxNQUFXLEVBQ1gsa0JBQTJCLEVBQzNCLFNBQXNCLEVBQ3RCLGdCQUErQjtRQUUvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQkFBcUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0kscUJBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxNQUFvQjtRQUNuQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0QjtJQUNILENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQVc7UUFDN0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLG1EQUFtRDtZQUNuRCxJQUFJLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyRCxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7b0JBQ3RCLDREQUE0RDtvQkFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQ25DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQ0FDeEIsNkVBQTZFO2dDQUM3RSx1REFBdUQ7Z0NBQ3ZELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQ0FDNUIsa0RBQWtEO29DQUNsRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7b0NBRWhDLDZCQUE2QjtvQ0FDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0NBQzFCLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQyxDQUFDLENBQUM7NkJBQ0o7aUNBQU07Z0NBQ0wsNkNBQTZDO2dDQUM3QyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NkJBQzNDO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQzlGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQTtvQkFDbkQsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILHNEQUFzRDtZQUN0RCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDdEMsT0FBTyxRQUFRLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxxQkFBcUIsQ0FBQyxHQUFhO1FBQ3pDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1lBQzlDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssU0FBUyxDQUFDLE1BQVc7UUFDM0IsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hELElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2IsSUFBSSxJQUFJLFlBQVksUUFBUSxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQjs7Z0JBQU0sT0FBTyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFRjtBQWxLRCx3QkFrS0M7Ozs7O0FDOUtELHVDQUF1QztBQUN2Qyx1Q0FBZ0M7QUFFaEM7O0VBRUU7QUFDRixNQUFNLGVBQWdCLFNBQVEsaUJBQU87SUFDakMsK0NBQStDO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDLHVCQUF1QjtJQUNoQixlQUFlLENBQVM7SUFDL0IsNkJBQTZCO0lBQ3RCLFNBQVMsQ0FBUztJQUV6QjtJQUNJLGdCQUFnQjtJQUNoQixLQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLFNBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixVQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsZUFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLFFBQWdCO0lBQ2hCLDZCQUE2QjtJQUM3QixTQUFpQjtRQUdqQixLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7O0FBR0wsa0JBQWUsZUFBZSxDQUFDOzs7O0FDcEMvQix1Q0FBdUM7O0FBRXZDLE1BQXFCLFNBQVM7SUFDMUIsS0FBSyxDQUE0QjtJQUNqQyxLQUFLLENBQVc7SUFDaEIsUUFBUSxDQUFVO0lBQ2xCLFlBQWEsaUJBQTRDLEVBQUUsTUFBZ0IsRUFBRSxRQUFpQjtRQUMxRixJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0JBQXNCLENBQUUsU0FBbUMsRUFBRSxLQUFhO1FBQ3RFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBQ3hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBQ3BDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw2REFBNkQ7SUFDN0Qsd0JBQXdCLENBQUUsU0FBa0M7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRSxFQUFFO1lBQ3hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUE1Q0QsNEJBNENDOzs7Ozs7QUM5Q0QsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUd2QyxxRUFBOEQ7QUFDOUQsK0NBQXFDO0FBQ3JDLDJDQUF1QztBQUl2Qzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxnQ0FBc0I7SUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBcUI7SUFDdEMsTUFBTSxDQUFDLDZCQUE2QixHQUFXLGdCQUFnQixDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxVQUFVLEdBQ3ZCLGtEQUFrRCxDQUFDO0lBQzdDLHlCQUF5QixHQUFZLEtBQUssQ0FBQztJQUMzQywwQkFBMEIsR0FBWSxLQUFLLENBQUM7SUFDNUMsT0FBTyxDQUFNO0lBQ2IsUUFBUSxDQUFTO0lBRXpCOzs7OztPQUtHO0lBQ0gsWUFBWSxJQUFhO1FBQ3ZCLHVEQUF1RDtRQUN2RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUztZQUFFLE9BQU87UUFDN0MsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixzQkFBc0IsQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUMxRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMseUJBQXlCO1FBQ3JDLG1EQUFtRDtRQUNuRCw0RUFBNEU7UUFDNUUsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUcscUJBQVEsQ0FBQywwQkFBMEIsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFDO1lBQ3BGLCtHQUErRztZQUMvRyxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUM7Z0JBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsRUFBQztvQkFDeEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztpQkFDOUU7Z0JBQ0gsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdkMsT0FBTzthQUNOO1NBQ0Y7UUFDRCxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxxREFBcUQ7UUFDckQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQztZQUNwQixZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQ3JELCtDQUErQyxFQUFFLDhCQUE4QixDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsT0FBTztTQUNSO1FBQ0QsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZUFBZTtRQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQztZQUMxRSxPQUFPO1NBQ1I7UUFDRCxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakUsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDM0IsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3ZDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBRUQsZ0NBQWdDO1FBQ2hDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLElBQUksQ0FBQywwQkFBMEI7Z0JBQUUsaUJBQWlCLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xFLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPO2dCQUFFLE9BQU87WUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEQsSUFBSSxJQUFJLENBQUMsMEJBQTBCO2dCQUFFLGlCQUFpQixFQUFFLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFFTCw4REFBOEQ7UUFDOUQsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVMLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDhCQUE4QjtRQUNwQyxNQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDO1FBRWpFLDJEQUEyRDtRQUMzRCxJQUFJLHVCQUF1QixJQUFJLElBQUk7WUFDakMsc0JBQXNCLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO2dCQUNqQyxNQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3JFLGtCQUFrQixDQUFDLFdBQVcsR0FBRywrQ0FBK0MsQ0FBQztnQkFDakYsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQztnQkFDdEMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQztnQkFDekMsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTtnQkFDcEMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO2dCQUN2QyxPQUFPO2FBQ1I7WUFDRCxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQztZQUN4QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNuQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQztZQUN4QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDeEMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQztZQUN2QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFTyx5QkFBeUIsQ0FBQywwQkFBK0IsRUFBRSxlQUErQjtRQUNoRyxJQUFHLDBCQUEwQixFQUFDO1lBQzFCLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN2QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLE9BQU87U0FDVjtRQUNDLElBQUksbUJBQW1CLEdBQThDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEssS0FBSyxJQUFJLEdBQUcsSUFBSSxtQkFBbUIsRUFBQztZQUNwQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7WUFFdEMsb0NBQW9DO1lBQ3BDLHVFQUF1RTtZQUN2RSxHQUFHLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ2hFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7WUFDSCxRQUFRO1lBQ1IsZ0RBQWdEO1lBQ2hELEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO2dCQUMvRCxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzlELGlEQUFpRDtnQkFDakQsR0FBRyxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUN2RSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLDBCQUEwQixFQUFFO3dCQUNsRCxPQUFPO3FCQUNSO29CQUNELEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILGdEQUFnRDtZQUNoRCxHQUFHLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ3hFLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztnQkFDOUQsaURBQWlEO2dCQUNqRCxHQUFHLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7b0JBQ3ZFLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsMEJBQTBCLEVBQUU7d0JBQ2xELE9BQU87cUJBQ1I7b0JBQ0QsR0FBRyxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsc0NBQXNDO1lBQ3RDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtnQkFDdEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixHQUFHLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEYsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssK0JBQStCLENBQUMsaUJBQW1DO1FBQ3pFLElBQUksU0FBUyxHQUF1QixFQUFFLENBQUM7UUFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFDaEUsOEJBQThCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFBO1FBRUQsbURBQW1EO1FBQ25ELElBQUksc0JBQXNCLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUM5QyxJQUFJLHFCQUFRLENBQUMsMEJBQTBCLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDeEYseUNBQXlDO2dCQUN6QyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQ3JELDZDQUE2QyxFQUFFLDRCQUE0QixDQUFDLENBQUM7Z0JBQy9FLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxPQUFPO1NBQ1I7UUFDRCx1RkFBdUY7UUFDdkYsSUFBSSxRQUFRLEdBQXVCLHNCQUFzQixDQUFDLFdBQVcsQ0FBQztRQUV0RSw0Q0FBNEM7UUFDNUMsS0FBSyxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtnQkFDOUMsa0NBQWtDO2dCQUNsQyxnQ0FBZ0M7Z0JBQ2hDLE9BQU87YUFDUjtTQUNGO1FBQ0QscURBQXFEO1FBQ3JELFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQ2hFLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLG9DQUFvQyxDQUFDLGdCQUF3QjtRQUNuRSx1REFBdUQ7UUFDdkQsMENBQTBDO1FBQzFDLElBQUksc0JBQXNCLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUM5QyxPQUFPO1NBQ1I7UUFDRCx3Q0FBd0M7UUFDeEMsOEhBQThIO1FBQzlILElBQUksUUFBUSxHQUF1QixzQkFBc0IsQ0FBQyxXQUFXLENBQUM7UUFFdEUsaUVBQWlFO1FBQ2pFLEtBQUssSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxnQkFBZ0IsRUFBRSxFQUM1RCxrQ0FBa0MsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7UUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDLEVBQUUsMEVBQTBFO1lBQ25HLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFDckQsaURBQWlELEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztZQUN2RixPQUFPO1NBQ1I7UUFDRCx5Q0FBeUM7UUFDekMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssNkJBQTZCLENBQUMsU0FBYztRQUNsRCxNQUFNLENBQUMsTUFBTTthQUNaLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQzthQUMxRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0wsSUFBSSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSyxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsT0FBWSxFQUFFLFdBQXFDLEVBQUUsV0FBb0IsRUFBRSxTQUF3QjtRQUMzSSwwRkFBMEY7UUFDMUYsd0ZBQXdGO1FBQ3hGLElBQUksU0FBUyxHQUFxQjtZQUNoQyxPQUFPLEVBQUUsV0FBVztZQUNwQixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUN4QyxDQUFDO1FBRUYsK0VBQStFO1FBQy9FLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDbEMsa0NBQWtDO1lBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBTSxDQUMxQixTQUFTLENBQUMsT0FBTyxFQUNqQixTQUFTLENBQUMsT0FBTyxFQUNqQixXQUFXLENBQUMsU0FBUyxFQUNyQixTQUFTLENBQUMsU0FBUyxDQUNwQixDQUFDO1lBQ0YsSUFBSSxhQUFzQixDQUFDO1lBRTNCLHFFQUFxRTtZQUNyRSxJQUFJLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7Z0JBQzNCLG1FQUFtRTtnQkFDbkUsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUM7b0JBQ25CLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7YUFDNUI7WUFDRCxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUM7WUFDekIsOEVBQThFO1lBQzlFLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO2dCQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFO29CQUNwQyx3RUFBd0U7b0JBQ3hFLDBDQUEwQztvQkFDMUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBRyxRQUFRLENBQUMsS0FBSyxJQUFJLHNCQUFzQixJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFDO3dCQUN2RSxzRkFBc0Y7d0JBQ3RGLHlHQUF5Rzt3QkFDekcsMENBQTBDO3dCQUMxQyx3R0FBd0c7d0JBQ3hHLHlHQUF5Rzt3QkFDekcsdUZBQXVGO3dCQUN2RixVQUFVLENBQUMsR0FBRyxFQUFFOzRCQUNkLG1EQUFtRDs0QkFDakQsSUFBRztnQ0FDQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7NkJBQzdEOzRCQUNELE1BQUs7Z0NBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs2QkFDckY7d0JBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO3FCQUNUO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksYUFBYSxFQUFFLEVBQUMsNENBQTRDO2dCQUNuRixnRkFBZ0Y7Z0JBQ2hGLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUUsRUFBQyw0QkFBNEI7b0JBQzNELGlCQUFpQjtvQkFDakIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksNkJBQTZCLENBQUM7aUJBQ2xFO2dCQUNELElBQUksYUFBYSxFQUFFLEVBQUMscUNBQXFDO29CQUN2RCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksc0JBQXNCO3dCQUMxQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztpQkFDMUQ7cUJBQ0ksRUFBQyxtQkFBbUI7b0JBQ3ZCLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztpQkFDckQ7Z0JBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3pELFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7UUFDRixJQUFJLFFBQVEsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssY0FBYyxDQUFDLEtBQWE7UUFDbEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLG9DQUFvQztZQUNwQyxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyx1QkFBdUIsQ0FBQyxXQUFxQyxFQUFFLElBQVksRUFBRSxPQUFZO1FBQy9GLHFEQUFxRDtRQUNyRCxJQUFJLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVDLE9BQU8sQ0FDTCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixDQUFDLDZCQUE2QixDQUFDLENBQ2pILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsSUFBSSxFQUFFLEVBQzlDLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsZ0RBQWdEO1lBQ2hELFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM1RCxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDekQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBR0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxVQUFVLENBQUMsV0FBcUMsRUFBRSxtQkFBNEIsRUFBRSxVQUFtQztRQUN6SCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEY7YUFBTTtZQUNMLG1EQUFtRDtZQUNuRCxJQUFJLGlCQUFpQixHQUFZLEtBQUssQ0FBQztZQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2dCQUMvQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3JCLDhEQUE4RDtnQkFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkY7aUJBQU07Z0JBQ0wsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzVELFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3pELFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO2FBQ3JEO1NBQ0Y7UUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7SUFDMUQsQ0FBQzs7QUFwZUgsd0RBcWVDOzs7OztBQ3hmRDs7OztHQUlHO0FBQ0gsTUFBcUIsc0JBQXNCO0lBQ2xDLGNBQWMsQ0FBMkI7SUFFaEQsWUFBWSxJQUFhO1FBQ3ZCLDhDQUE4QztRQUM5QyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RGLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLElBQUksQ0FBQyxRQUFRLFFBQVEsQ0FBQyxDQUFDO1lBQ3RFLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksNEJBQTRCLENBQUMsSUFBYTtRQUMvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQzFELE9BQU87U0FDUjtRQUNELHlCQUF5QjtRQUN6QixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUNqQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVqQywwQ0FBMEM7UUFDMUMsSUFBSSxjQUFjLEdBQTZCO1lBQzdDLFVBQVUsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLGNBQWMsRUFBZSxVQUFVO1lBQ3ZDLFNBQVMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUMvQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLGVBQWUsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUN4QyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RSxVQUFVLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FDbkMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQyxDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLE1BQU0scUJBQXFCLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQ2pFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsY0FBYyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFELGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBQzdDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUM3QyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztRQUNwRSxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDaEQsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUM3RCxVQUFVLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUM3QixVQUFVLENBQUMsRUFBRSxHQUFHLG1CQUFtQixDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFFdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSw4QkFBOEIsQ0FBQyxRQUFhLEVBQUUsV0FBcUM7UUFDeEYsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksTUFBTSxDQUFDLEVBQUU7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdFLE9BQU87U0FDUjtRQUVELCtDQUErQztRQUMvQyxNQUFNLDhCQUE4QixHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUMzRSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxxQkFBcUIsR0FBRyw4QkFBOEIsQ0FBQyxXQUFXLENBQ3RFLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqQyxxQkFBcUIsQ0FBQyxXQUFXLENBQy9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtRQUM3RCw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFdEUsK0NBQStDO1FBQy9DLHdFQUF3RTtRQUN4RSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDekIsOEJBQThCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsbUNBQW1DO1lBQ25DLE1BQU0sU0FBUyxHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FDakQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsQyxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtnQkFDbEMseUNBQXlDO2dCQUN6QyxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQ2pELFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsV0FBVyxDQUNwRCxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDOUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDcEMsc0NBQXNDO29CQUN0QyxJQUFJLGVBQWUsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUM1QyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQzNDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsV0FBVyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO29CQUN6QyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUU1QyxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7d0JBQzNCLHVDQUF1Qzt3QkFDdkMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFDeEQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksWUFBWSxXQUFXLEVBQUU7NEJBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQzVCLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO3lCQUNqQzt3QkFDRCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDO29CQUNGLDRFQUE0RTtvQkFDNUUsU0FBUyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixNQUFNLHlCQUF5QixHQUFHLDhCQUE4QixDQUFDLFdBQVcsQ0FDMUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDN0QseUJBQXlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXJFLDBDQUEwQztRQUMxQyw4QkFBOEIsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyRSx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUN6RCwyQ0FBMkM7WUFDM0MsOEJBQThCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtnQkFDL0QseUJBQXlCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILGtEQUFrRDtRQUNsRCx5QkFBeUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM1RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsOEJBQThCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsOEJBQThCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQ3pGLG1DQUFtQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFFSCw0QkFBNEI7UUFDNUIsOEJBQThCLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVNLGtDQUFrQyxDQUFFLFdBQStCLEVBQUUsZUFBK0I7UUFDekcsSUFBSSxVQUFVLEdBQThDLEVBQUUsQ0FBQztRQUUvRCxnRkFBZ0Y7UUFDaEYsOEVBQThFO1FBQzlFLEtBQUssSUFBSSxTQUFTLElBQUksV0FBVyxFQUFFO1lBQ2pDLE1BQU0sd0JBQXdCLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FDMUQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sb0JBQW9CLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUMvRCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSwwQkFBMEIsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQ3JFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQywwQkFBMEIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2hFLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN0RSxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUM1RSxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUVsRCxJQUFJLGVBQWUsR0FBNEM7Z0JBQzdELElBQUksRUFBRSxTQUFTO2dCQUNmLG9CQUFvQixFQUFFLG9CQUFvQjtnQkFDMUMsd0JBQXdCLEVBQUUsd0JBQXdCO2dCQUNsRCwwQkFBMEIsRUFBRSwwQkFBMEI7YUFDdkQsQ0FBQTtZQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUF2TUQseUNBdU1DOzs7O0FDak5ELHFDQUFxQztBQUNyQywrQ0FBK0M7QUFDL0MsaUZBQWlGO0FBQ2pGLDhFQUE4RTtBQUM5RSw0R0FBNEc7OztBQUU1RyxpQ0FBaUM7QUFDakMsTUFBYSxvQkFBcUIsU0FBUSxnQkFBZ0I7SUFDdEQsK0NBQStDO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDO1FBQ0kseUNBQXlDO1FBQ3pDLDJEQUEyRDtRQUMzRCxLQUFLLEVBQUUsQ0FBQztRQUVSLG9FQUFvRTtRQUNwRSw2REFBNkQ7UUFDN0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxxQkFBcUI7UUFDckIsMEVBQTBFO1FBQzFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDYixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCx5Q0FBeUM7UUFDekMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNiLHNFQUFzRTtZQUN0RSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxtREFBbUQ7Z0JBQ25ELGlDQUFpQztnQkFDakMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRW5DLG1EQUFtRDtnQkFDbkQsd0RBQXdEO2dCQUN4RCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUvQyw4Q0FBOEM7Z0JBQzlDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUVqQyxpQ0FBaUM7Z0JBQ2pDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMxQyxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksYUFBYSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFO3dCQUN0RCw0Q0FBNEM7d0JBQzVDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBc0MsQ0FBQzt3QkFFNUQsd0RBQXdEO3dCQUN4RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRTs0QkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzRCQUM5QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBNkIsQ0FBQzs0QkFDdEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTt5QkFDdkQ7NkJBQU07NEJBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMvQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBNkIsQ0FBQzs0QkFDdEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTt5QkFDckQ7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBRUYseURBQXlEO2dCQUN6RCxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsbUJBQW1CO0lBQ25CLE1BQU0sR0FBRyxVQUFVLENBQU07UUFDckIsNENBQTRDO1FBQzVDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7UUFFM0Msd0RBQXdEO1FBQ3hELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQyxDQUFDOztBQTdFTixvREE4RUM7Ozs7QUNyRkQsdUNBQXVDOztBQUV2QywwRUFBMEU7QUFDMUUsTUFBcUIsa0JBQWtCO0lBQ25DLHNEQUFzRDtJQUMvQyxNQUFNLENBQUMsV0FBVyxHQUFXLENBQUMsQ0FBQztJQUN0Qyw4RUFBOEU7SUFDdkUsTUFBTSxDQUFDLGVBQWUsR0FBVyxDQUFDLENBQUM7SUFDbkMsZUFBZSxHQUFvQixFQUFFLENBQUM7SUFDdEMsZUFBZSxHQUFXLENBQUMsQ0FBQztJQUMzQixhQUFhLENBQW1CO0lBRXhDLFlBQVksY0FBZ0M7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUM7UUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pDLHNCQUFzQjtZQUN0QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLGlEQUFpRDtZQUNqRCwwR0FBMEc7WUFFMUcsZ0NBQWdDO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ2hELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6QyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDL0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6RCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsa0JBQWtCLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFckMsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUF2Q0wscUNBd0NDOzs7O0FDM0NELHVDQUF1Qzs7O0FBRXZDLE1BQWEsa0JBQW1CLFNBQVEsYUFBYTtJQUNqRCwrQ0FBK0M7SUFDeEMsTUFBTSxDQUFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDeEIsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUVqQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFzQixFQUFFLEVBQUU7UUFDbEQsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDLENBQUE7SUFFTSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFzQixFQUFFLEVBQUU7UUFDekQsSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNqRixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQzNCO3FCQUNJO29CQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDM0I7YUFDSjtpQkFDSTtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDakYsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2lCQUMxQjtxQkFDSTtvQkFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7aUJBQzFCO2FBQ0o7U0FDSjthQUNJO1lBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pGLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzthQUMxQjtpQkFDSTtnQkFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUMsQ0FBQTtJQUVNLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7UUFDcEMsSUFBSSxPQUFPLEdBQXlCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUM7UUFDcEUsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQyxDQUFBO0lBRU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtRQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQyxDQUFBO0lBRU8sVUFBVSxHQUFHLENBQUMsU0FBa0IsRUFBRSxFQUFFO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDcEMsQ0FBQyxDQUFBO0lBRU8sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLDJEQUEyRDtRQUMzRCw4Q0FBOEM7UUFDOUMsSUFBSSxPQUFPLEdBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUE2QixDQUFDO1FBQ3hGLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDZixrQkFBa0IsQ0FBQyxVQUFVLENBQUUsSUFBMkIsQ0FBQyxDQUFDO2dCQUM1RCxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBRSxJQUEyQixDQUFDLENBQUM7Z0JBRW5FLHVDQUF1QztnQkFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2lCQUMzQjthQUNKO1NBQ0o7SUFDTCxDQUFDLENBQUE7O0FBbkZMLGdEQW9GQzs7OztBQ3RGRCx1Q0FBdUM7OztBQUV2QyxxREFBcUQ7QUFDckQsTUFBcUIsUUFBUTtJQUN6QiwrQ0FBK0M7SUFDeEMsTUFBTSxDQUFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDaEM7UUFDSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUFBLENBQUM7SUFDSyxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBb0IsRUFBRSxTQUFpQixFQUFFLFVBQW1CLEVBQUUsZ0JBQXlCO1FBQ3BILElBQUksSUFBd0IsQ0FBQztRQUM3QixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksWUFBWSxHQUFZLEtBQUssQ0FBQztRQUNsQyxJQUFJLGdCQUFnQjtZQUFFLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFMUMsbUVBQW1FO1FBQ25FLElBQUc7WUFDQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxNQUFNO1lBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBRSwwQkFBMEIsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksSUFBSSxJQUFJLElBQUksRUFBQztZQUNiLElBQUksT0FBTztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxTQUFTLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxZQUFZO2dCQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLGFBQWEsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMvRixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUFBLENBQUM7SUFFSyxNQUFNLENBQUMsMEJBQTBCLENBQUUsYUFBcUIsRUFBRSxHQUFXLEVBQUUsZ0JBQXlCLEVBQUUsVUFBbUI7UUFDeEgsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNsQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN4QyxJQUFJLE9BQU87Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsYUFBYSxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDN0UsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksZ0JBQWdCO1lBQ2hCLE9BQU8sUUFBUSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVFLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxhQUFvQixFQUFFLEdBQVUsRUFBRSxVQUFtQjtRQUM1RixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksSUFBbUIsQ0FBQTtRQUV2QixJQUFHO1lBQ0MsSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsTUFBTTtZQUNGLE1BQU0sSUFBSSxLQUFLLENBQUUsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUM7WUFDYixJQUFJLE9BQU87Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsR0FBRyxHQUFHLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztZQUM3RixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsR0FBRyxhQUFhLG9CQUFvQixFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDNUYsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUcsSUFBSSxFQUFDO1lBQzFCLElBQUksT0FBTztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLGFBQWEsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzdGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOztBQWxFTCwyQkFtRUM7QUFFRCxxREFBcUQ7QUFDckQsTUFBYSxpQkFBa0IsU0FBUSxjQUFjO0lBQ2pELCtDQUErQztJQUN4QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN6QixJQUFJLENBQVM7SUFDYixPQUFPLENBQVM7SUFDaEIsSUFBSSxDQUFTO0lBQ1osUUFBUSxDQUFpQjtJQUVqQyxZQUFZLElBQVksRUFBRSxPQUFlO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQUEsQ0FBQzs7QUFqQk4sOENBa0JDO0FBRUQsTUFBYSxjQUFlLFNBQVEsV0FBVztJQUMzQywrQ0FBK0M7SUFDeEMsTUFBTSxDQUFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDekIsSUFBSSxDQUFTO0lBQ2IsT0FBTyxDQUFTO0lBQ2hCLElBQUksQ0FBUztJQUNaLFFBQVEsQ0FBYztJQUU5QixZQUFZLElBQVksRUFBRSxPQUFlO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUFBLENBQUM7O0FBakJOLHdDQWtCQztBQUVELHFEQUFxRDtBQUNyRCxNQUFhLGVBQWdCLFNBQVEsWUFBWTtJQUM3QywrQ0FBK0M7SUFDeEMsTUFBTSxDQUFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDekIsSUFBSSxDQUFTO0lBQ2IsT0FBTyxDQUFTO0lBQ2hCLElBQUksQ0FBUztJQUNaLFlBQVksQ0FBZTtJQUVuQyxZQUFZLElBQVksRUFBRSxPQUFlO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUFBLENBQUM7O0FBakJOLDBDQWtCQzs7OztBQ3BJRCx1Q0FBdUM7O0FBRXZDOztHQUVHO0FBQ0gsTUFBTSxPQUFPO0lBQ1QsK0NBQStDO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDLDBCQUEwQjtJQUNuQixLQUFLLENBQVM7SUFDckIsdUJBQXVCO0lBQ2hCLFNBQVMsQ0FBUztJQUN6Qix3Q0FBd0M7SUFDakMsUUFBUSxDQUFTO0lBQ3hCLHlCQUF5QjtJQUNsQixVQUFVLENBQVM7SUFFMUIsWUFBWSxLQUFhLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCO1FBQzlFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVTtZQUM1QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7QUFHTCxrQkFBZSxPQUFPLENBQUM7Ozs7O0FDMUJ2Qix1Q0FBdUM7QUFDdkMsK0NBQThDO0FBRTlDLGlFQUFpRTtBQUNqRSxNQUFxQixZQUFZO0lBQzdCLCtDQUErQztJQUN4QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN4QixRQUFRLENBQVM7SUFDbEIsU0FBUyxDQUFTO0lBQ2xCLE1BQU0sQ0FBVTtJQUN2Qjs7T0FFRztJQUNILFlBQVksUUFBZTtRQUN2QixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFBLENBQUM7SUFFTSxTQUFTO1FBQ2IsSUFBRztZQUNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLDRCQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O0FBekJMLCtCQTJCQzs7Ozs7O0FDN0JELG1EQUE0QztBQUU1QyxNQUFhLGFBQWE7SUFDZixNQUFNLENBQUMsMEJBQTBCLENBQUMsWUFBb0IsRUFBRSxnQkFBd0I7UUFDbkYsc0RBQXNEO1FBQ3RELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQ2xELCtCQUErQjtZQUMvQiwwQkFBMEI7WUFDMUIsbUNBQW1DO1lBQ25DLGlDQUFpQztZQUVqQyxhQUFhO1lBQ2IsYUFBYTtZQUNiLEVBQUU7WUFDRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQiwwQ0FBMEM7WUFDMUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDN0MsU0FBUyxDQUFDLFNBQVMsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3hDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFFL0MsT0FBTyxjQUFjLENBQUM7U0FDekI7YUFDSTtZQUNELElBQUk7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsT0FBTyxLQUFLLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtTQUNKO0lBRUwsQ0FBQztJQUNNLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBbUI7UUFDM0MsMkVBQTJFO1FBQzNFLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM5QixPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUFBLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQTlDRCxzQ0E4Q0M7Ozs7O0FDM0NELG9FQUFvRTtBQUNwRSxNQUFxQixPQUFPO0lBQ3hCLCtDQUErQztJQUN4QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN4QixrQkFBa0IsR0FBa0I7UUFDeEMsSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRjs7TUFFRTtJQUNGLFlBQWEsVUFBa0I7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksUUFBUSxDQUFDLENBQUM7UUFDOUYsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxHQUFHO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxpRUFBaUU7SUFDekQsT0FBTztRQUNYLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlJLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLHVCQUF1QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNqRyxDQUFDOztBQTNCTCwwQkE0QkM7Ozs7OztBQ2pDRCwyQ0FBdUM7QUFDdkMsK0NBQXFDO0FBRXJDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQWEsUUFBUTtJQUNqQiwwQkFBMEI7SUFDbkIsTUFBTSxDQUFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDaEMsNENBQTRDO0lBQ3BDLE1BQU0sQ0FBQyxZQUFZLENBQW1CO0lBQ3RDLE1BQU0sQ0FBQyxhQUFhLENBQTBCO0lBQ3RELHdCQUF3QjtJQUNoQixZQUFZLENBQW1CO0lBRXZDOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQThCO1FBQzVELFFBQVEsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksb0JBQW9CLENBQUMsSUFBYTtRQUNyQyw4Q0FBOEM7UUFDOUMsMEVBQTBFO1FBQzFFLDREQUE0RDtRQUM1RCxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM3RSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsSUFBSSxDQUFDLFFBQVEsUUFBUSxDQUFDLENBQUM7WUFDOUQsT0FBTztTQUNWO1FBQ0QsUUFBUSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM5QixLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssMkJBQTJCLENBQUM7WUFDakMsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLGtCQUFrQjtnQkFDbkIsbUNBQW1DO2dCQUNuQyxnREFBZ0Q7Z0JBQ2hELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekUsTUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLG9DQUFvQztnQkFDcEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzlCLGVBQWUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDakMsUUFBUSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDO2dCQUN2QixLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBRXRCLHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU5Qix3REFBd0Q7Z0JBQ3hELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzQixRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVoRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRzdCLE1BQU07WUFDVixLQUFLLGlDQUFpQyxDQUFDO1lBQ3ZDLEtBQUssbUJBQW1CO2dCQUNwQixtQ0FBbUM7Z0JBQ25DLHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRWhELCtDQUErQztnQkFDL0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQ25ELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRTdCLE1BQU07WUFDVjtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFGQUFxRixDQUFDLENBQUE7U0FDekc7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssbUJBQW1CO1FBQ3ZCLG1EQUFtRDtRQUNuRCw4RUFBOEU7UUFDOUUscUVBQXFFO1FBQ3JFLElBQUksWUFBWSxHQUFxQjtZQUNqQyxTQUFTLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDaEQsYUFBYSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1lBQ25ELFNBQVMsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUMvQyxjQUFjLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztTQUNwRSxDQUFBO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBNkIsRUFBRSxVQUFrQjtRQUM3RSxJQUFJLHFCQUFRLENBQUMsMEJBQTBCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsRUFBQztZQUM1RixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQztZQUNsQiwwQkFBMEI7WUFDMUIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUM3QywrQ0FBK0MsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3JGLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO1FBQ3hDLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGdCQUFnQixDQUFDLFdBQW1CO1FBQ3hDLHFDQUFxQztRQUNyQyxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQTBCO1lBQzlCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsUUFBUSxFQUFFLFdBQVc7U0FDeEIsQ0FBQTtRQUNELElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQix5Q0FBeUM7UUFDekMsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQy9ELElBQUksS0FBSyxHQUE0QixRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzVELElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxFQUFDLGtDQUFrQztZQUNsRCxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFDakQsNkNBQTZDLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztTQUNwRjthQUNJLEVBQUMsOERBQThEO1lBQ2hFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsV0FBVyxFQUFFLEVBQUUsOEJBQThCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxxQkFBcUIsQ0FBQyxJQUFZO1FBQ3RDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDekYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsSUFBSSxFQUFFLEVBQUUsa0NBQWtDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMzRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNwRCxJQUFJLE9BQU8sSUFBSSxFQUFFLElBQUksT0FBTyxJQUFJLElBQUksRUFBQztZQUNqQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQzdDLGlEQUFpRCxFQUFFLGdDQUFnQyxDQUFDLENBQUM7WUFDekYsT0FBTztTQUNWO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssVUFBVSxDQUFDLFdBQW1CLEVBQUUsVUFBbUI7UUFDdkQscURBQXFEO1FBQ3JELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ2xELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3RSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUNyRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDdEYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDckYsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7UUFDdEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsQ0FBQyxlQUFlO1FBRXJGLG9DQUFvQztRQUNwQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUMvQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMscUJBQXFCO1FBQ3hELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQjtRQUNuQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV2QyxJQUFJLFVBQVUsRUFBRTtZQUNaLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdEM7UUFFRCxnQ0FBZ0M7UUFDaEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLDhCQUE4QixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRS9GLG9EQUFvRDtRQUNwRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVEOztPQUVHO0lBQ0ssZ0JBQWdCO1FBQ3BCLElBQUksUUFBUSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzlEO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxxQkFBcUI7UUFDekIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbEQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7UUFDMUQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsaUVBQWlFO1FBQ2pFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILHlEQUF5RDtRQUN6RCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLGFBQWEsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxZQUFZLENBQUMsR0FBcUI7UUFDdEMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSxJQUFJO1lBQ2hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsTUFBTSxRQUFRLEdBQWdCLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztRQUM3RSxvQkFBb0I7UUFDcEIsTUFBTSxVQUFVLEdBQXFCLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxTQUFTLEdBQXFCLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3BFLE1BQU0sRUFBRSxHQUE2QyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUMvRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsNEJBQTRCO1lBQzVCLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsRUFDNUYsbUNBQW1DLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUM3RCxJQUFJLEtBQUssSUFBSSxrQkFBa0IsRUFBRTtnQkFDN0IsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVqQixnQ0FBZ0M7Z0JBQ2hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQztTQUNKO2FBQ0k7WUFDRCxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQzVGLG1DQUFtQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDN0QsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxpQkFBaUIsQ0FBQyxLQUFjO1FBQ3BDLElBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDckMsT0FBTztRQUNYLDBEQUEwRDtRQUMxRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVyRSxvQ0FBb0M7UUFDcEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLFNBQVMsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWpCLHlCQUF5QjtRQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLE1BQU0sQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQzNGLGdDQUFnQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF4VkwsNEJBeVZDOzs7OztBQzFXRDs7OztHQUlHO0FBQ0gsTUFBTSxNQUFNO0lBQ1IsK0NBQStDO0lBQ3hDLE1BQU0sQ0FBQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBQ3pCLEVBQUUsQ0FBUztJQUNYLGFBQWEsQ0FBUztJQUN0QixJQUFJLENBQVM7SUFDYixXQUFXLENBQVM7SUFDcEIsV0FBVyxDQUFPO0lBQ2xCLFdBQVcsQ0FBUztJQUNwQixTQUFTLENBQVM7SUFDbEIsWUFBWSxDQUFTO0lBQ3JCLGVBQWUsQ0FBa0I7SUFFeEMsWUFDSSxFQUFVLEVBQ1YsYUFBcUIsRUFDckIsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLFdBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLFlBQW9CLEVBQ3BCLGVBQWlDO1FBRWpDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7O0FBR0wsa0JBQWUsTUFBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgVG9Eb3NXaWRnZXQgZnJvbSAnLi9Ub0Rvcyc7XG5pbXBvcnQgRGljdGlvbmFyeVdpZGdldCBmcm9tICcuL0RpY3Rpb25hcnlXaWRnZXQnO1xuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnO1xuaW1wb3J0IFJXQkVycm9yIGZyb20gJy4uL21vZGVscy9SV0JFcnJvckJ1cydcblxuY29uc3QgQ2xhc3NDb21wb25lbnRzID0ge1xuICAgIGluaXREaWN0aW9uYXJ5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzcGVyZiA9IG5ldyBSV0JQZXJmKFwiQ2xhc3Njb21wb25lbnRzXCIpOyAvL2JlZ2luIHBlcmZvcm1hbmNlIG1lYXN1cmVcblxuICAgICAgICBpZiAoUldCRXJyb3IuY2hlY2tFbGVtZW50b3JOdWxsKFwiQ2xhc3NDb21wb25lbnRcIiwgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICAgIERpY3Rpb25hcnlXaWRnZXQuaW5pdCgpO1xuXG4gICAgICAgIGNsYXNzcGVyZi5lbmQoKTsgLy9lbmQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgIH0sXG4gICAgaW5pdFRvRG86ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGlmIChSV0JFcnJvci5jaGVja0VsZW1lbnRvck51bGwoXCJDbGFzc0NvbXBvbmVudFwiLCBcIlRvRG9MaXN0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICAgIFRvRG9zV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2xhc3NDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoXCJcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgZGljdGlvbmFyeSB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgRGljdGlvbmFyeVdpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgYnkgY2FsbGluZyB0aGVcbiAgICAgKiAgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBsZXQgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudDogRWxlbWVudFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY0NvdWxkIG5vdCBxdWVyeSBkaWN0aW9uYXJ5IHdpZGdldCBlbGVtZW50LlwiLCBcImNvbG9yOm9yYW5nZTtcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpY3Rpb25hcnlTZWFyY2ggY29uc3RydWN0b3JcbiAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgRGljdGlvbmFyeVNlYXJjaFdpZGdldChkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50KSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRXhwYW5kaW5nTGlzdEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0V4cGFuZGluZ0xpc3RcIjtcblxuY29uc3QgRXhwYW5kaW5nTGlzdERPTVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIERlZmluZSB0aGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCwgZm9yIHVzZSB3aXRoaW4gdGhlIHBhZ2VcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdleHBhbmRpbmctbGlzdCcsIEV4cGFuZGluZ0xpc3RFbGVtZW50LCB7IGV4dGVuZHM6ICd1bCcgfSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQgcHJvcGVydGllc1xuICAgICAgICAvLyBcIkRPTVwiIHBhZ2Ugc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICAvLyBBZGQgYSB0aXRsZSBhdHRyaWJ1dGUgdG8gYWxsIGxpLXNwYW4gdGhhdCBjYW4gZXhwYW5kIGZ1cnRoZXJcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpT3Blbk9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46Zmlyc3QtY2hpbGRgKTtcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOm50aC1jaGlsZCgzKWApO1xuXG4gICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGV4cGFuZGluZy1lbGVtZW50IGV4cGFuZGFibGUgZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlPcGVuT3Blbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgICAgICAvLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgJ0RPTScgaXRlbXMgZWxlbWVudHNcbiAgICAgICAgICAgIC8vIC0tLT53aGVuIGNsaWNrZWQsIGNoYW5nZSB0aGUgdGl0bGUgcHJvcGVydHkgdG8gcmVmbGVjdCBvcGVuIG9yIGNsb3NlZCBzdGF0dXNcbiAgICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzcGFuLmdldEF0dHJpYnV0ZSgndGl0bGUnKSA9PSAnU2VsZWN0IHRvIGV4cGFuZC4uLidcbiAgICAgICAgICAgICAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBjbG9zZS4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBjbG9zZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgICA6ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIFNldCBwcm9wZXJ0eSBvZiBjbG9zaW5nIHNwYW4gZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlDbG9zZVNwYW4pIHtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBGbGFzaGNhcmRDYXJkRWxlbXMgZnJvbSAnLi4vbW9kZWxzL0ZsYXNoY2FyZENhcmRFbGVtcydcbmltcG9ydCBwb3J0ZGVmaW5pdGlvbnMgZnJvbSAnLi4vZGF0YS9wb3J0bnVtcydcblxuY29uc3QgZmxhc2hjYXJkZ2FtZVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBFc3RhYmxpc2ggd2hpY2ggcG9ydCBudW1iZXJzIHRvIHRlc3QgYW5kIHRoZSBkZWZpbml0aW9uXG4gICAgICAgIC8vIFRPRE86IGZ1bmN0aW9ucyBmbGFzaGNhcmRzXG4gICAgICAgIGNvbnN0IG1ldGhvZGRlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oW1xuICAgICAgICAgICAgW1wiY2hhckF0KClcIiwgXCJSZXR1cm5zIGEgbmV3IHN0cmluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGEgZ2l2ZW4gaW5kZXguXCJdXG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gQ3JlYXRlIGZsYXNoY2FyZCBlbGVtZW50c1xuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZERpdnMgPSBuZXcgRmxhc2hjYXJkQ2FyZEVsZW1zKHBvcnRkZWZpbml0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgdGhlIGdhbWUncyB0aXRsZSBlbGVtZW50XG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkUGFnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZsYXNoQ2FyZHNcIik7XG4gICAgICAgIGNvbnN0IGdhbWV0aXRsZUVsZW0gPSBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgICAgICBnYW1ldGl0bGVFbGVtLmlubmVyVGV4dCA9IFwiQ29tcHV0aW5nIFBvcnQgTnVtYmVyc1wiXG5cbiAgICAgICAgLy8gQWRkIHRoZSBmbGFzaGNhcmRzIHRvIHdpZGdldFxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIG1haW5GbGFzaENhcmREaXZzLm1fZmxhc2hjYXJkc0Fycil7XG4gICAgICAgICAgICBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXNoY2FyZGdhbWVXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEdyb3dpbmdDYXJkRWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvR3Jvd2luZ0NhcmRcIlxuXG5jb25zdCBBY3RpdmVDYXJkc1dpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ3Jvd2luZy1jYXJkJywgR3Jvd2luZ0NhcmRFbGVtZW50LCB7IGV4dGVuZHM6ICdsaScgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCB8fCBlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxEZXRhaWxzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQXJyYXkgb2YgbGlzdCBpdGVtcyAoY2FyZHMpXG4gICAgICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikpO1xuXG4gICAgICAgICAgICAvLyBDbGljayBldmVudCB0byByZXNpemUgdGhlIGNhcmRzIGlmIGNsaWNraW5nIG91dHNpZGUgb2YgYSBjYXJkXG4gICAgICAgICAgICAvLyBXaGVuIGNsaWNraW5nIG91dHNpZGUgYSBjYXJkLCByZXNpemUgYWxsIGNhcmRzIHRvIG5vcm1hbFxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBJdGVtOiBHcm93aW5nQ2FyZEVsZW1lbnQgPSBpdGVtO1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGVtcEl0ZW0gJiYgIXRlbXBJdGVtLmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaHJpbmtDYXJkKHRlbXBJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlc2hhZGUgYWxsIGNhcmRzIGJlY2F1c2Ugbm9uZSBvZiB0aGVtIGFyZSBiaWdcbiAgICAgICAgICAgIGZvciAobGV0IGxpIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQobGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVDYXJkc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IE5BVklURU1TIGZyb20gJy4uL2RhdGEvbmF2aXRlbXMnXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbi8qKlxuICogV2lkZ2V0IHRvIGFkZCBzaXRlIGhlYWRlciBhbmQgZm9vdGVyLiBJbnN0YW50aWF0ZWQgaW4gJ01haW4nIHNjcmlwdC5cbiAqL1xuY29uc3QgSGVhZGVyRm9vdGVyID0ge1xuICAgIGhlYWRlcldpZGdldDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2l0ZSBoZWFkZXIgY29udGFpbmluZyBuYXZpZ2F0aW9uIGxpbmtzIGFuZCBzaXRlIGxvZ28uXG4gICAgICAgICAqL1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJwZXJmID0gbmV3IFJXQlBlcmYoXCJIZWFkZXJcIik7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSFRNTCAnbWFpbicgZWxlbWVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgICAgIC8qKiBIZWFkZXIgZWxlbWVudCBjb250YWluZXIgKi9cbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBlbGVtZW50IHRvIHRoZSBwYWdlXG4gICAgICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCkgey8vICdNYWluJyBlbGVtZW50IGV4aXN0cywgYWRkIHRoZSBoZWFkZXIgdG8gaXRcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gcGFnZU1haW4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGJlZm9yZSAnbWFpbicgZWxlbWVudC5gblwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gJ01haW4nIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QsIGFkZCB0aGUgaGVhZGVyIHRvIHRoZSBib2R5XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcigpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYWZ0ZXIgJ2JvZHknIGVsZW1lbnQuYG5cIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0FwcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zIHRvIGhlYWRlclxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW5ub3QgcHJlcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zLlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaGVhZGVycGVyZi5lbmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBoZWFkZXIgd2l0aCBzaXRlIGxvZ28gYXBwZW5kZWQuXG4gICAgICAgICAqIEBwYXJhbSBtYWluIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybnMgUG9wdWxhdGVkIGhlYWRlciBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBidWlsZEhlYWRlcjogKCkgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNpYyBIVE1MIGhlYWRlciBlbGVtZW50IGNvbnRhaW5pbmcgbG9nbyAoSDEpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndpZHRoLW1heC1jZW50ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBIMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJIMVwiKTtcbiAgICAgICAgICAgIEgxLnRleHRDb250ZW50ID0gJzxSYW5kb20gV2ViIEJpdHM+JztcbiAgICAgICAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuYXBwZW5kKEgxKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXIuYXBwZW5kKHNpdGVIZWFkZXJDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGROYXZpZ2F0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBCdWlsZCB0aGUgaGVhZGVyIG5hdmlnYXRpb24gYmFzZWQgb24gbmF2aWdhdGlvbiBkYXRhXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmF2aWdhdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlck5hdkZyYWdcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJykpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgbmF2IGRhdGEgdG8gbmF2IGVsZW1lbnRzXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdExpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnByZXBlbmQobmF2TGlzdExpbmtzKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgbmF2aWdhdGlvbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3MudGV4dENvbnRlbnQgPSBgJHtpdGVtLmlubmVyVGV4dH1gO1xuICAgICAgICAgICAgICAgIC8vIEVudmlyb25tZW50IGxpbmtzIGVkaXQsIHJlcXVpcmluZyBkaWZmZXJlbnQgbGluayByZWxhdGl2ZXMgdG8gb3BlcmF0ZVxuICAgICAgICAgICAgICAgIC8vIEdpdGh1YiBwYWdlcyBvcGVyYXRlcyBmcm9tIHJlcG9zaXRvcnksIG5vdCAnLydcbiAgICAgICAgICAgICAgICAvL2lmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncm9iaG93ZS1hLmdpdGh1Yi5pbycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgZWRpdCBmb3IgZGV2IGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgICAgIC8vbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvUmFuZG9tV2ViQml0cy8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlcnBlcmYgPSBuZXcgUldCUGVyZihcIkZvb3RlclwiKTtcblxuICAgICAgICAgICAgLy8gQWRkIGZvb3RlciBlbGVtZW50IHRvIHRoZSBwYWdlIGVuZFxuICAgICAgICAgICAgbGV0IGZvb3RlcjogSFRNTEVsZW1lbnQgPSBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRm9vdGVyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChmb290ZXIpO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZhdmljb25BdHRyaWJ1dGlvbihmb290ZXIpKTtcblxuICAgICAgICAgICAgZm9vdGVycGVyZi5lbmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGb290ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUZvb3RlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBmb290ZXJQYXJhLnRleHRDb250ZW50ID0gYFxcdTAwQTkgMjAyMi0yMDIzIFJhbmRvbSBXZWIgQml0cy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5gO1xuXG4gICAgICAgICAgICBzaXRlRm9vdGVyQ29udGFpbmVyLmFwcGVuZChmb290ZXJQYXJhKTtcbiAgICAgICAgICAgIHNpdGVGb290ZXIuYXBwZW5kKHNpdGVGb290ZXJDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUZvb3RlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRGYXZpY29uQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBGYXZpY29uIGF0dHJpYnV0aW9uIHNlY3Rpb24gKyBsaW5rIHRvIHNvdXJjZVxuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvblBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25MaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJJY29uSG9tZTogIzQ1MDI2NzU1XCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBcIl9ibGFua1wiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLmhyZWYgPSAnaHR0cHM6Ly93d3cudmVjdG9yc3RvY2suY29tL3JveWFsdHktZnJlZS12ZWN0b3IvbWFpbnRlbmFuY2UtaWNvbi1mb3ItZ3JhcGhpYy1hbmQtd2ViLWRlc2lnbi12ZWN0b3ItNDUwMjY3NTUnXG4gICAgICAgICAgICBmb290ZXJJY29uTGluay50ZXh0Q29udGVudCA9ICdWZWN0b3JTdG9jay5jb20nO1xuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEudGV4dENvbnRlbnQgPSBgRmF2aWNvbiBkZXNpZ25lZCBieSBJY29uSG9tZSBhdCBgO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgYXR0cmlidXRpb24gdG8gZm9vdGVyIHBhcmFcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLmFwcGVuZENoaWxkKGZvb3Rlckljb25MaW5rKTtcbiAgICAgICAgICAgIGZvb3Rlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKGZvb3Rlckljb25QYXJhKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvb3Rlckljb25QYXJhO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJGb290ZXI7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0IGZyb20gJy4vRXhwYW5kaW5nTGlzdERPTVdpZGdldCc7XG5pbXBvcnQgQWN0aXZlQ2FyZHNXaWRnZXQgZnJvbSAnLi9Hcm93aW5nQ2FyZCc7XG5pbXBvcnQgZmxhc2hjYXJkZ2FtZVdpZGdldCBmcm9tICcuL0ZsYXNoY2FyZEdhbWVXaWRnZXQnO1xuaW1wb3J0IHNsaWRlc2hvd1dpZGdldCBmcm9tICcuL1NsaWRlU2hvd1dpZGdldCc7XG5pbXBvcnQgY3NzZXggZnJvbSAnLi9jc3NleCc7XG5pbXBvcnQgaHRtbGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RlJztcbmltcG9ydCBSV0JDYXJkc1dpZGdldCBmcm9tICcuL1dlYkJpdHMnO1xuaW1wb3J0IHVybGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RldXJsJztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBkb21haW5sb29rdXAgZnJvbSAnLi9kb21haW5sb29rdXAnO1xuaW1wb3J0IHNsaWRlcmJhciBmcm9tICcuL3NsaWRlcmJhcic7XG5cbmNvbnN0IFBhZ2VDb21wb25lbnRzID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFnZXBlcmYgPSBuZXcgUldCUGVyZihcIlBhZ2Vjb21wb25lbnRzXCIpOyAvL21lYXN1cmUgcGVyZm9ybWFuY2VcblxuICAgICAgICBQYWdlQ29tcG9uZW50cy5DaGVja1BhZ2UoKTtcbiAgICAgICAgcGFnZXBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9LFxuICAgIENoZWNrUGFnZTogKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgLy8nSW5kZXgnIGFuZCAnUGFnZXMnIHJvdXRlcywgYWRkIGNhcmRzIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBSV0JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBkb20uaHRtbCBwYWdlIHVzZXMgZXhwYW5kaW5nTGlzdHMgY29tcG9uZW50XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvZG9tLmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3N2Zy5odG1sJzpcbiAgICAgICAgICAgICAgICBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgd2ViSURFIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3dlYmlkZXMuaHRtbCc6XG4gICAgICAgICAgICAgICAgQWN0aXZlQ2FyZHNXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXNob3cgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2d1aWRlcy9wd2FpY29uLmh0bWwnOlxuICAgICAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIENTU0VYIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9jc3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgY3NzZXguQ1NTRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgaHRtbGV4Q29sb3JDb2RlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9odG1sLmh0bWwnOlxuICAgICAgICAgICAgICAgIGh0bWxleENvbG9yQ29kZS5IVE1MRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdXJsZXhDb2xvckNvZGUgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3VybC5odG1sJzpcbiAgICAgICAgICAgICAgICB1cmxleENvbG9yQ29kZS5VUkxFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBmbGFzaGNhcmQgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2ZsYXNoY2FyZHMuaHRtbCc6XG4gICAgICAgICAgICAgICAgZmxhc2hjYXJkZ2FtZVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGRvbWFpbiBuYW1lIGxvb2t1cFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2RvbWFpbmxvb2t1cC5odG1sJzpcbiAgICAgICAgICAgICAgICBkb21haW5sb29rdXAuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL21hcmt1cC5odG1sJzpcbiAgICAgICAgICAgICAgICBzbGlkZXJiYXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vbW9kZWxzL0F0dHJpYnV0aW9uTGlua1wiO1xuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi4vbW9kZWxzL1dlYkJpdFwiO1xuaW1wb3J0IHsgUldCQ2FyZEVsZW1lbnRzIH0gZnJvbSBcIi4uL21vZGVscy9XaWRnZXRNYXJrdXBFbGVtZW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQkNhcmQge1xuICAgIC8qKlxuICAgICAqIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSByd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cztcbiAgICAvKipcbiAgICAgKiAgTWFwIFdlYkJpdCBkYXRhIHRvIGEgY2FyZCBlYWNoXG4gICAgICogXG4gICAgICogIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICogICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJvZHlcIj5cbiAgICAgKiAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgKiAgICAgICAgICA8cD48L3A+XG4gICAgICogICAgICAgICAgPGEgaHJlZj1cIlwiPjwvYT5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICA8L2Rpdj5cbiAgICAgKi9cbiAgICBwdWJsaWMgYnVpbGRSV0JDYXJkTWFya3VwKGFydGljbGU6IFdlYkJpdCkge1xuICAgICAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzID0ge1xuICAgICAgICAgICAgY2FyZEltZzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBjYXJkSW1nVG9wOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIGNhcmRCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB9XG4gICAgICAgIGxldCBjYXJkQm9keUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsZXQgY2FyZEJvZHlMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUxpbmspO1xuXG4gICAgICAgIC8vIEFkZCBjYXJkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgIFdlYkJpdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHthcnRpY2xlLmlkfWApO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5jbGFzc0xpc3QuYWRkKFwiY2FyZEJvZHlcIiwpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYXJ0aWNsZS5jYXJkSW1hZ2UpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYXJ0aWNsZS5jYXJkSW1hZ2VBTFQpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnQXJ0aWNsZScsIGFydGljbGUuYXJ0aWNsZU51bWJlci50b1N0cmluZygpKTtcbiAgICAgICAgY2FyZEJvZHlMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFydGljbGUuYXJ0aWNsZUxpbmspXG4gICAgICAgIGNhcmRCb2R5SGVhZGluZy5pbm5lclRleHQgPSBhcnRpY2xlLm5hbWU7XG4gICAgICAgIGNhcmRCb2R5UGFyYS50ZXh0Q29udGVudCA9IGFydGljbGUuZGVzY3JpcHRpb247XG4gICAgICAgIGNhcmRCb2R5TGluay50ZXh0Q29udGVudCA9IFwiR28gdG8gUGFnZVwiO1xuXG4gICAgICAgIC8vIEltYWdlIGF0dHJpYnV0aW9uIG1heSBiZSBuZWVkZWQgZm9yIHRoZSBpbWFnZSB1c2VkXG4gICAgICAgIC8vIEF0dHJpYnV0aW9uIGRhdGEgaXMgaW1wb3J0ZWQgYXMgJ2F0dHJsaW5rcycgc2lnbmF0dXJlIHBhcmFtZXRlclxuICAgICAgICBpZiAoYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pe1xuICAgICAgICAgICAgdGhpcy5idWlsZFJXQkNhcmRBdHRyaWJ1dGlvblBhbmVsKHRoaXMucndiY2FyZGVsZW1lbnRzLCBhcnRpY2xlLmxpbmtBdHRyaWJ1dGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgY2FyZCBpcyBXZWJCaXRcbiAgICAgICAgLy8gQWRkIHRoZSBtYXJrdXAgdG8gdGhlIGNvbnRhaW5pbmcgZWxlbWVudFxuICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcCk7XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keSk7XG5cbiAgICAgICAgcmV0dXJuIFdlYkJpdDtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgaW1hZ2UgYXR0cmlidXRpb24sIHRoZSBpbWFnZSBpZCBhbmQgYXJ0aWNsZSBpZCB3aWxsIG1hdGNoLFxuICAgICAqIG90aGVyd2lzZSB0aGUgZGF0YSBpc24ndCBlbnRlcmVkLCBjYXVzaW5nIGEgbWlzc1xuICAgICAqIFxuICAgICAqICA8ZGl2IGNsYXNzPVwiZmxpcC1jYXJkXCI+PCEtLWNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgKiAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEZyb250XCI+XG4gICAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRCYWNrXCI+XG4gICAgICogICAgICAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgKiAgICAgICAgICAgICAgIDxwPjwvcD5cbiAgICAgKiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiIGNsYXNzPVwiaW1nU21hbGwgaW1nUFRSXCI+XG4gICAgICogICAgICAgICAgIDwvZGl2PlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogIDwvZGl2PjwhLS1lbmQgY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAqIEBwYXJhbSByd2JjYXJkZWxlbWVudHMgQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICAgKiBAcGFyYW0gbGluayBBdHRyaWJ1dGlvbiBsaW5rXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZFJXQkNhcmRBdHRyaWJ1dGlvblBhbmVsKHJ3YmNhcmRlbGVtZW50czogUldCQ2FyZEVsZW1lbnRzLCBsaW5rOiBBdHRyaWJ1dGlvbkxpbmspIHtcbiAgICAgICAgaWYgKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmdldEF0dHJpYnV0ZSgnQXJ0aWNsZScpID09PSBsaW5rLmFydGljbGVpZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgaW1hZ2UgYmFjayBwYW5lbCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgICAgICAvLyBSZWRlZmluZSBjYXJkIGltYWdlIHBhbmVsIGFzIGEgZmxpcCBwYW5lbFxuICAgICAgICAgICAgY29uc3QgY2FyZElubmVyID0gcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjYXJkRnJvbnQuYXBwZW5kQ2hpbGQocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcpOyAvLyBtb3ZlIGltYWdlIHdpdGhpbiBjYXJkIGZyb250IGRpdmlzb3JcbiAgICAgICAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQmFjayA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tIZWFkaW5nID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tQYXJhID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSk7IC8vYXBwZW5kIHRvIGZyb250IHBhbmVsXG5cbiAgICAgICAgICAgIC8vIEFkZCBmbGlwLXBhbmVsIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIpXG4gICAgICAgICAgICBjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIpO1xuICAgICAgICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICBzbWFsbEltZy5jbGFzc0xpc3QuYWRkKFwiaW1nU21hbGxcIiwgXCJpbWdQVFJcIik7XG4gICAgICAgICAgICBjYXJkQmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmNsYXNzTGlzdC5hZGQoXCJhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICBiYWNrSGVhZGluZy50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZG93bmVyO1xuICAgICAgICAgICAgYmFja1BhcmEudGV4dENvbnRlbnQgPSBsaW5rLmlubmVyVGV4dFxuICAgICAgICAgICAgYXR0cmlidXRlTGluay5ocmVmID0gbGluay5oUmVmZXJlbmNlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbi8vIEF0dHJpYnV0aW9uOiBSb2JlcnQgQSBIb3dlbGwsIE1heSAyMDIzXG4vLyBDb250ZW50IGRlcml2ZWQgZnJvbTogVzNTY2hvb2xzLCBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2hvd3RvL2hvd3RvX2pzX3NsaWRlc2hvdy5hc3BcblxuXG4vKipcbiAqIENvbXBvbmVudCBjcmVhdGluZyBzbGlkZXNob3cgd2lkZ2V0c1xuICovXG5jb25zdCBzbGlkZXNob3dXaWRnZXQgPSB7XG4gICAgc2xpZGVJbmRleDogMSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc2xpZGVzaG93IGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCk7XG4gICAgICAgIFxuICAgICAgICAvLyBOZXh0L3ByZXZpb3VzIGNvbnRyb2xzXG4gICAgICAgIGZ1bmN0aW9uIHBsdXNTbGlkZXMobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ICs9IG4pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBUaHVtYm5haWwgaW1hZ2UgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gY3VycmVudFNsaWRlKG46bnVtYmVyKSB7XG4gICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IG4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGFuZ2UgdG8gbmV4dCBzbGlkZSB3aGVuIGFycm93IGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93UHJldmlvdXNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd1ByZXZcIik7XG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd05leHRCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd05leHRcIik7XG4gICAgICAgIGZvciAobGV0IGJ0biBvZiBzbGlkZVNob3dQcmV2aW91c0J0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoLTEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd05leHRCdG5zKXtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBzZWxlY3RlZCBzbGlkZSB3aGVuIGRvdCBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dEb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcbiAgICAgICAgbGV0IGRvdENvdW50ZXIgPSAxO1xuICAgICAgICBmb3IobGV0IGRvdCBvZiBzbGlkZVNob3dEb3RzKXtcbiAgICAgICAgICAgIC8vYWRkIGRvdCBjb3VudGVyXG4gICAgICAgICAgICBkb3Quc2V0QXR0cmlidXRlKFwiZG90aW5kZXhcIiwgYCR7ZG90Q291bnRlcn1gKVxuICAgICAgICAgICAgLy93aGVuIGNsaWNrZWQsIG5hdmlnYXRlIHRvIHRoZSBzbGlkZSBpbmRpY2F0ZWRcbiAgICAgICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKGRvdENvdW50ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb3RDb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZG90Q291bnRlciA9IDE7XG4gICAgfSxcbiAgICBzaG93U2xpZGVzOiAobjogbnVtYmVyKT0+e1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBsZXQgc2xpZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm15U2xpZGVzXCIpO1xuICAgICAgICAgICAgbGV0IGRvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICAgICAgaWYgKG4gPiBzbGlkZXMubGVuZ3RoKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSAxfVxuICAgICAgICAgICAgaWYgKG4gPCAxKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSBzbGlkZXMubGVuZ3RofVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wU2xpZGUgPSA8SFRNTERpdkVsZW1lbnQ+c2xpZGVzW2ldO1xuICAgICAgICAgICAgICAgIHRlbXBTbGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9IGRvdHNbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXVxuICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb3RzW3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4IC0gMV0uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlc2hvd1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3QgfSBmcm9tIFwiLi4vbW9kZWxzL1RvRG9cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgVG8tRG8gTGlzdCB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgVG9Eb3NXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVG8tRG8gTGlzdCB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ1RvRG9MaXN0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb3NFbGVtZW50OiBFbGVtZW50O1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY0NvdWxkIG5vdCBxdWVyeSB0b2RvIGxpc3Qgd2lkZ2V0IGVsZW1lbnQuXCIsIFwiY29sb3I6b3JhbmdlO1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9Ub0RvTGlzdCBvYmplY3RcbiAgICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuXG4gICAgICAgIC8vQ3JlYXRlcyB3aWRnZXQgbWFya3VwIGFuZCBwb3B1bGF0ZXMgVG8tRG8gdGFza3MgY29udGFpbmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldCh0b0Rvc0VsZW1lbnQpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9zV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi4vZGF0YS9kYXRhXCJcbmltcG9ydCB7IFJhbmRvbVdlYkJpdHMgfSBmcm9tIFwiLi4vbW9kZWxzL1JhbmRvbVdlYkJpdHNcIlxuXG4vKipcbiAqIENhcmQgd2lkZ2V0IHRvIGluaXRpYWxpemUgYXJ0aWNsZSBkYXRhIGludG8gSFRNTCBjYXJkIGVsZW1lbnRzLiBUaGlzIHdpZGdldCBcbiAqIGNyZWF0ZXMgbXVsdGlwbGUgc2VjdGlvbnMgb2YgY2FyZHMgdG8gYWRkIHRvIGEgcGFnZS5cbiAqL1xuY29uc3QgUldCQ2FyZHNXaWRnZXQgPSB7XG4gICAgLyoqIENhcmRzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIGJyZWFrcyBkb3duIHRoZSBkYXRhIHN0cnVjdHVyZSBpbiBcbiAgICAgKiBvcmRlciB0byBmb3JtdWxhdGUgdGhlIGFydGljbGUgZGV0YWlscyBpbnRvIG9uZSBjYXJkIGZvciBlYWNoIGFydGljbGUgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBBcnRpY2xlcyBoYXZlIGRpZmZlcmVudCBjYXRlZ29yaWVzLCBzbyBlYWNoIGNhdGVnb3J5IG11c3QgYmUgcmVzcGVjdGVkLiBcbiAgICAgKiAqL1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gU3BsaXQgdGhlIGNhcmRzIGFycmF5cyBpbnRvIHRoZWlyIHJlc3BlY3RpdmUgY2F0ZWdvcnlcbiAgICAgICAgLyoqIE11bHRpcGxlIGNhdGVnb3JpZXMgb2YgY2FyZCBkYXRhIGV4aXN0LiBUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgbmVlZGVkIFxuICAgICAgICAgKiB0byBjcmVhdGUgY2F0ZWdvcnkgc2VjdGlvbnMgZGl2aXNpb25zIHdoZW4gcGxhY2VkIG9uIGEgcGFnZS5cbiAgICAgICAgICovXG4gICAgICAgIGxldCBjYXJkc1NlY3Rpb246IEhUTUxEaXZFbGVtZW50W10gPSBbXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiQXJiaXRyYXJ5IEFydGljbGVzOlwiLCBcIkFyYml0cmFyeUFydGljbGVzXCIpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkd1aWRlIFNob3J0czpcIiwgXCJHdWlkZVNob3J0c1wiKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJFeHBsb3JlIHRoZSBXZWI6XCIsIFwiRXhwbG9yZXRoZVdlYlwiKSxcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgY2FyZCBkYXRhICsgYXR0cmlidXRpb24gbGluayBkYXRhXG4gICAgICAgIC8vIFdFQkJJVERBVEEgYnJva2VuIGludG8gMyBhcnJheXM6IFBhZ2VzLCBvciBhcnRpY2xlcywgR3VpZGVzLCBhbmQgRXhwbG9yZXNcbiAgICAgICAgLyoqVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG9mIGNhcmQgZWxlbWVudHMuIEVhY2ggaW5kZXggc3RvcmVzIHRoZSBjYXJkcycgZGF0YVxuICAgICAgICAgKiBmb3Igb25lIGNhdGVnb3J5IG9mIGFydGljbGVzLiAqLyBcbiAgICAgICAgbGV0IGNhcmRzQXJ0aWNsZXM6IGFueSA9IFtcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKSxcbiAgICAgICAgXTtcblxuICAgICAgICBcbiAgICAgICAgLy8gUm91dGVzIC0+IEFkZCB3aWRnZXQgYW5kIGZvcm1hdCBwYWdlc1xuICAgICAgICAvLyBJbmRleCAoSG9tZSkgcGFnZSBzaG9ydGVucyBlYWNoIHNlY3Rpb24gdG8gMyBhcnRpY2xlcyBvbmx5XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9kaXN0L2luZGV4Lmh0bWwnKSB7XG4gICAgICAgICAgICAgICAgLyoqIFJhbmRvbWl6ZSB0aGUgb3JkZXIgb2YgY2FyZHMuICovXG4gICAgICAgICAgICBjb25zdCBnZXRNdWx0aXBsZVJhbmRvbSA9IChhcnI6IGFueSwgbnVtOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByYW5kb21pemUgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uYXJyXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKDAsIG51bSk7IC8vIHJldHVybiB0aGUgcmVxdWVzdGVkIG51bWJlciBvZiBlbGVtZW50c1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1swXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMF0sIDUpO1xuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1sxXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMV0sIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjYXJkcyB0byB0aGUgcGFnZSBieSBkZWNvbnN0cnVjdGlvbiBhbmQgYWRkaXRpb25cbiAgICAgICAgLy8gT3V0ZXIgbG9vcDogaXRlcmF0ZSB0aGUgZGF0YSB0byBlYWNoIHJlc3BlY3RpdmUgY2F0ZWdvcnk6IFBhZ2VzLCBHdWlkZXMsIEV4cGxvcmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNTZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2FyZHNTZWN0aW9uW2ldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIElubmVyIGxvb3A6IGl0ZXJhdGUgdGhyb3VnaCB0aGUgY2F0ZWdvcnkgZGF0YVxuICAgICAgICAgICAgICAgIC8vIEZyb20gdGhlIGNhcmRzIHN0YWNrLCBhcHBlbmQgZWFjaCB0byBzZWN0aW9uXG4gICAgICAgICAgICAgICAgY2FyZHNBcnRpY2xlcy5zaGlmdCgpLmZvckVhY2goKGFydGljbGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkc1NlY3Rpb25baV0uYXBwZW5kKGFydGljbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSdzIGFuIGVycm9yLlwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSV0JDYXJkc1dpZGdldFxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ29sb3JDb2RlIGZyb20gJy4uL21vZGVscy9Db2xvckNvZGUnXG5cbmNvbnN0IGh0bWxleENvbG9yQ29kZSA9IHtcbiAgICBIVE1MRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgLy8gR2V0IGNvbXBvbmVudCBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCBpbiB3aWRnZXQgaW50ZXJhY3Rpdml0eVxuICAgICAgICBjb25zdCBvcGVuZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5UYWdvcGVuXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBjbG9zZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5UYWdjbG9zZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5UZXh0VmFsXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BdHRyaWJ1dGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICAgICAgY29uc3QgY29sb3JsZXNzZWxlbWVudHMgPSBuZXcgQXJyYXkob3BlbmVycywgY2xvc2VycywgdmFsdWVzLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHNjb2xvcnMgPSBuZXcgQXJyYXkoXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1SZWQpXCIsIFwidmFyKC0tY2xyLURhcmtDeWFuKVwiLCBcInZhcigtLWNsci1HcmVlbilcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGh0bWxleENvbG9yQ29kZTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IENvbG9yQ29kZSBmcm9tICcuLi9tb2RlbHMvQ29sb3JDb2RlJ1xuXG5jb25zdCB1cmxleENvbG9yQ29kZSA9IHtcbiAgICBVUkxFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm90b2NvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvdG9jb2xcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGRvbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZG9tYWluXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3J0XCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvbGRlclwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1ZXJ5XCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBrZXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmtleVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZhbHVlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBhcnJheSBkYXRhIHN0cnVjdHVyZXMsIG5lZWRlZCBmb3IgdGhlIENvbG9yQ29kZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGNvbnN0IGNvbG9ybGVzc2VsZW1lbnRzID0gbmV3IEFycmF5KHByb3RvY29sLCBkb21haW4sIHBvcnQsIGZvbGRlciwgXG4gICAgICAgICAgICBmaWxlLCBxdWVyeSwga2V5LCB2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItU2t5Ymx1ZSlcIiwgXG4gICAgICAgICAgICBcInZhcigtLWNsci1EYXJrQ3lhbilcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIsIFwidmFyKC0tY2xyLVJlZClcIiwgXG4gICAgICAgICAgICBcInZhcigtLWNsci1wcmltYXJ5LTYwMClcIiwgXCJ2YXIoLS1jbHItYWxsLXByaW1hcnktNTAwKVwiLCBcbiAgICAgICAgICAgIFwidmFyKC0tY2xyLUxpZ2h0Y29yYWwpXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1cmxleENvbG9yQ29kZTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IENvbG9yQ29kZSBmcm9tICcuLi9tb2RlbHMvQ29sb3JDb2RlJ1xuXG5jb25zdCBjc3NleCA9IHtcbiAgICAvKipcbiAgICAgKiBDc3NleCBpcyBhIHdpZGdldCBpbiBDU1MgcGFnZSwgYXBwbHlpbmcgc3R5bGUgY29sb3JzIHRvIGVsZW1lbnRzIG9mIGRpZmZlcmVudFxuICAgICAqIHR5cGVzIChiYXNlZCBvbiB0aGUgQ1NTIHByb2dyYW1taW5nIGxhbmd1YWdlKVxuICAgICAqL1xuICAgIENTU0VYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuU2VsZWN0b3JcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkF0dHJpYnV0ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5WYWx1ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgcHN1ZWRvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuUHN1ZWRvLWNsYXNzXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBhcnJheSBkYXRhIHN0cnVjdHVyZXMsIG5lZWRlZCBmb3IgdGhlIENvbG9yQ29kZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGNvbnN0IGNvbG9ybGVzc2VsZW1lbnRzID0gbmV3IEFycmF5KHNlbGVjdG9ycywgYXR0cmlidXRlcywgdmFsdWVzLCBwc3VlZG9zKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHNjb2xvcnMgPSBuZXcgQXJyYXkoXCJ2YXIoLS1jbHItUmVkKVwiLCBcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3NzZXg7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuY29uc3QgZG9tYWlubG9va3VwID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gR2V0IHRoZSBmb3JtLCBhc3NpZ24gdG8gYSB2YXJpYWJsZVxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaFdob0lTJykgYXMgSFRNTEZvcm1FbGVtZW50IHwgbnVsbDtcbiAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCl7IC8vSWYgdGhlIGZvcm0gaXMgbm90IGZvdW5kLCB0aHJvdyBleGNlcHRpb24uXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJMb29rdXAgZm9ybSBub3QgZm91bmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBkb21haW5sb29rdXAuc2VhcmNoV0hPSVMpO1xuICAgIH0sXG4gICAgc2VhcmNoV0hPSVM6ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0eHRTZWFyY2gnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dGVsZW0udmFsdWU7XG4gICAgICAgIHZhciBVUkwgPSAnaHR0cHM6Ly93d3cud2hvaXMuY29tL3dob2lzLycgKyB2YWx1ZTtcbiAgICAgICAgd2luZG93Lm9wZW4oVVJMLCAnX2JsYW5rJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbWFpbmxvb2t1cDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJ1xuXG5jb25zdCBtb2JpbGVBYmJyTWFya3VwID0ge1xuICAgIGluaXQ6ICgpID0+e1xuICAgICAgICAvL2JlZ2luIG1vYmlsZSBtYXJrdXBcbiAgICAgICAgbW9iaWxlQWJick1hcmt1cC5tb2JpbGVBYmJyTWFya3VwcygpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICAgICAqIEF0dHJpYnV0ZSB0YWdzIG9uIG1vYmlsZSBkbyBub3QgaGF2ZSBob3ZlciBvcHRpb24uIFRoaXMgZnVuY3Rpb24gYWRkcyBhIGNsaWNrXG4gICAgICAgICAqICBhYmlsaXR5IHRvIGRlZmluZSBhbiBhYmJyIHRhZywgdGhhbiByZWx5IG9uIHRoZSB0aXRsZSBhdHRyaWJ1dGUuXG4gICAgICAgICAqL1xuICAgIG1vYmlsZUFiYnJNYXJrdXBzOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vYmlsZWFiYnJwZXJmID0gbmV3IFJXQlBlcmYoXCJNb2JpbGVhYmJycGVyZlwiKTsgLy9zdGFydCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzIEFiYnJPcGVue1xuICAgICAgICAgICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBhYmJyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxhYmJyZXZpYXRpb25lbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhYmJyXCIpO1xuICAgICAgICBpZihhbGxhYmJyZXZpYXRpb25lbGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvciAobGV0IGFiYnIgb2YgYWxsYWJicmV2aWF0aW9uZWxlbXMpe1xuICAgICAgICAgICAgICAgIGxldCBhYmJyZXYgPSBuZXcgQWJick9wZW4oKTtcbiAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQgPSBhYmJyO1xuXG4gICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhYmJydGl0bGVhdHRydmFsOiBzdHJpbmcgPSBhYmJyZXYuYWJickVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikgYXMgc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb246IEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT0gYWJicil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhYmJyZXYuYWJickVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIDwgMSl7IC8vY3JlYXRlIHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJicnRpdGxlYXR0cnZhbH0ke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL3Nob3cgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gYWJicmV2LmFiYnJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0oJHthYmJydGl0bGVhdHRydmFsfSR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbW9iaWxlYWJicnBlcmYuZW5kKCkgLy9lbmQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG1vYmlsZUFiYnJNYXJrdXA7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuY29uc3Qgc2xpZGVyYmFyID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgdmFyIGRpdmlzb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpdmlzb3JcIiksIFxuICAgICAgICBzbGlkZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xpZGVyXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuICAgICAgICBzbGlkZUJhci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwic2xpZGVyXCIpO1xuICAgICAgICBzbGlkZUJhci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHNsaWRlcmJhci5tb3ZlRGl2aXNvckJhcihkaXZpc29yLCBzbGlkZUJhcikpO1xuICAgIH0sXG4gICAgbW92ZURpdmlzb3JCYXI6IChkaXZpc29yOiBIVE1MRWxlbWVudCwgc2xpZGVCYXI6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgZGl2aXNvci5zdHlsZS53aWR0aCA9IHNsaWRlQmFyLnZhbHVlICsgXCIlXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJiYXI7IiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIjtcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9BdHRyaWJ1dGlvbkxpbmtcIjtcblxuLy8gQ3JlYXRlIG5ldyBBQSAoQXJiaXRyYXJ5IEFydGljbGUpXG5cbi8qKlxuICogXCJBcmJpdHJhcnkgQXJ0aWNsZXMnIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEFyYml0cmFyeUFydGljbGVzID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRG9tYWlubG9va3VwXCIsXG4gICAgICAgIDEsXG4gICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICBcIkNoZWNrIGFuIGF2YWlsYWJsZSBkb21haW4gdXNpbmcgV2hvSVMgQVBJIHNlYXJjaFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgNCksXG4gICAgICAgIFwicGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2hvaXMud2VicFwiLFxuICAgICAgICBcIldob0lzIExvb2t1cFwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkb21haW4gaWNvbnNcIixcbiAgICAgICAgICAgIFwiRG9tYWluIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RvbWFpblwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgICAgICAxXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICAyLFxuICAgICAgICBcIkhUTUwgRnJhbWVzXCIsXG4gICAgICAgIFwiVmlldyBIVE1MIHBhZ2UgcmVzcG9uc2Ugc3RhdHVzIGluZm9ybWF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxMSksXG4gICAgICAgIFwicGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfRnJhbWVzLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBleGFtcGxlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvZGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29kZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb2RlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIdHRwc2NlcnRcIixcbiAgICAgICAgNCxcbiAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBcIlNlbGVjdCB0byB2aWV3IGEgd2Vic2l0ZSdzIEhUVFBTIGNlcnRpZmljYXRlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAyNiksXG4gICAgICAgIFwicGFnZXMvaHR0cHMuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwc19jZXJ0LndlYnBcIixcbiAgICAgICAgXCJDdXJzb3Igc2VsZWN0aW5nIEhUVFBTIGNlcnRpZmljYXRlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJTc2wgY2VydGlmaWNhdGUgaWNvbnMgY3JlYXRlZCBieSBpbmlwYWdpc3R1ZGlvIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICA0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2VidGVjaFwiLFxuICAgICAgICA1LFxuICAgICAgICBcIldhcHBhbHl6ZXJcIixcbiAgICAgICAgXCJXYXBwYWx5emVyIGJyb3dzZXIgZXh0ZW5zaW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDIpLFxuICAgICAgICBcInBhZ2VzL3dlYnRlY2guaHRtbFwiLFxuICAgICAgICBcImltZy93YXBwYWx5emVyLWxvZ28ud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgZXh0ZW5zaW9uIGxvZ28uIEEgd2hpdGUgdyBvbiBhIHB1cnBsZSB0aWxlLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkpzb25vYmplY3RcIixcbiAgICAgICAgNixcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIFwiSlNPTiBvYmplY3Qgbm90YXRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgOSksXG4gICAgICAgIFwicGFnZXMvanNvbm9iamVjdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2pzb24ud2VicFwiLFxuICAgICAgICBcIkpTT04gbG9nbzogQSBncmV5IGNpcmNsZSB3aXRoIGFydGlzdGljIHNwaXJhbHMuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ktRmlcIixcbiAgICAgICAgNyxcbiAgICAgICAgXCJXaS1GaSBWZXJzaW9uXCIsXG4gICAgICAgIFwiRGV0ZXJtaW5lIFdpZmkgVmVyc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAxNiksXG4gICAgICAgIFwicGFnZXMvd2lmaS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dpZmkud2VicFwiLFxuICAgICAgICBcIldpLUZpIGxvZ28gd2l0aCBhIGJsYWNrIGNpcmNsZSBiYWNrZ3JvdW5kLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNoYXRncHRcIixcbiAgICAgICAgOCxcbiAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgXCJDaGF0IHdpdGggYW4gQUkgZm9yIHJlc2VhcmNoIGFuZCBkZXZlbG9wbWVudC5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgICAgICBcInBhZ2VzL2NoYXRncHQuaHRtbFwiLFxuICAgICAgICBcImltZy9haS53ZWJwXCIsXG4gICAgICAgIFwiRGVjb3JhdGl2ZSBBSSBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImFpIGljb25zXCIsXG4gICAgICAgICAgICBcIkFpIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2FpXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgICAgICAgICAgOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInByb3RvdHlwZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJQcm90b3R5cGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBhaW50IDNEXCIsXG4gICAgICAgICAgICA5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgICAgICAxMFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJvaW5jXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkJPSU5DIGljb25zXCIsXG4gICAgICAgICAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vYm9pbmMuYmVya2VsZXkuZWR1XCIsXG4gICAgICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgICAgICAxMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIklQQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSVAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgICAgIDEyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDEzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29ya3NwZWVkXCIsXG4gICAgICAgIDE1LFxuICAgICAgICBcIk5ldHdvcmsgU3BlZWQgVGVzdFwiLFxuICAgICAgICBcIlRlc3QgdGhlIG5ldHdvcmsgYWRhcHRlcnMgd2l0aCBhIFBvd2VyU2hlbGwgc2NyaXB0XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDcpLFxuICAgICAgICBcInBhZ2VzL25ldHdvcmtzcGVlZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3BhZ2Utc3BlZWQud2VicFwiLFxuICAgICAgICBcIlNwZWVkIHRlc3QgZGlhbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUGFnZSBzcGVlZCBpY29ucyBjcmVhdGVkIGJ5IFByb3N5bWJvbHMgUHJlbWl1bSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3BhZ2Utc3BlZWRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAgICAgMTVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQb3dlclNoZWxsZHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICAgICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgICAgICAxN1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19ETlNcIixcbiAgICAgICAgMjAsXG4gICAgICAgIFwiSG93IEROUyB3b3Jrc1wiLFxuICAgICAgICBcIkEgZ2VuZXJhbCBvdmVydmlldyBvZiBEb21haW4gTmFtZSBTeXN0ZW1cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgNCksXG4gICAgICAgIFwicGFnZXMvZG5zLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZG5zLndlYnBcIixcbiAgICAgICAgXCJETlMgZHJhd2luZyBhdHRhY2hlZCB0byBhIGtleWJvYXJkXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJEbnMgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBETlNcIixcbiAgICAgICAgICAgIDIwXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0dvb2dsZVwiLFxuICAgICAgICAyMixcbiAgICAgICAgXCJHb29nbGUgaXMgIzEgd2Vic2l0ZVwiLFxuICAgICAgICBcIkdvb2dsZSBpcyB0aGUgIzEgdHJhZmZpY2tlZCBzaXRlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDE3KSxcbiAgICAgICAgXCJwYWdlcy9nb29nbGUuaHRtbFwiLFxuICAgICAgICBcImltZy9zZWFyY2gtZW5naW5lLndlYnBcIixcbiAgICAgICAgXCJBIGJhciBncmFwaCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInJhbmsgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUmFuayBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsbWVldHVwIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcmFua1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgICAgICAyMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICAyMyxcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgXCJSZXZpZXcgdGhlIERPTSB3aXRoIGEgRE9NIHRyZWVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMjcpLFxuICAgICAgICBcInBhZ2VzL2RvbS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3RyZWUud2VicFwiLFxuICAgICAgICBcIkEgdHJlZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRyZWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVHJlZSBpY29ucyBjcmVhdGVkIGJ5IGp1c3RpY29uIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJET01cIixcbiAgICAgICAgICAgIDIzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViaWRlXCIsXG4gICAgICAgIDI0LFxuICAgICAgICBcIldlYklERVwiLFxuICAgICAgICBcIlRyeSBza2lwcGluZyB0aGUgZG93bmxvYWQgd2l0aCBhIHdlYiBJREVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMyksXG4gICAgICAgIFwicGFnZXMvd2ViaWRlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3V4LndlYnBcIixcbiAgICAgICAgXCJBIGNvbXB1dGVyIGFwcGxpY2F0aW9uIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGVzaWduIGljb25zXCIsXG4gICAgICAgICAgICBcIkRlc2lnbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXNpZ25cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwid2ViaWRlc1wiLFxuICAgICAgICAgICAgMjRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgMjUsXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIFwiRmluZCBhbiBTVkcgYW5kIGxlYXJuIGFib3V0IHRoZSBTVkcgbGFuZ3VhZ2VcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgOSksXG4gICAgICAgIFwicGFnZXMvc3ZnLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc3ZnLnN2Z1wiLFxuICAgICAgICBcIkFuIHN2ZyBpY29uIGV4YW1wbGUuXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNjYWxhYmxlIHZlY3RvciBncmFwaGljc1wiLFxuICAgICAgICAgICAgXCJTVkcgaWNvbiBjcmVhdGVkIGJ5IEhhcnZleSBSYXluZXJcIixcbiAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHL1wiLFxuICAgICAgICAgICAgXCJXM0NcIixcbiAgICAgICAgICAgIFwic3ZnXCIsXG4gICAgICAgICAgICAyNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpc2FibGVfSmF2YXNjcmlwdFwiLFxuICAgICAgICAyNixcbiAgICAgICAgXCJEaXNhYmxlIEphdmFTY3JpcHRcIixcbiAgICAgICAgXCJEaXNhYmxlIHRoZSBKYXZhU2NyaXB0IHRvIHRlc3Qgd2Vic2l0ZSBmdW5jdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyMiksXG4gICAgICAgIFwicGFnZXMvamF2YXNjcmlwdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NvZnR3YXJlLWFwcGxpY2F0aW9uLndlYnBcIixcbiAgICAgICAgXCJBIGphdmFzY3JpcHQgZnVuY3Rpb24gaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwid2ViIGNvZGluZyBpY29uc1wiLFxuICAgICAgICAgICAgXCJXZWIgY29kaW5nIGljb25zIGNyZWF0ZWQgYnkgTXVoYW1tYWQgQXRpZiAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3dlYi1jb2RpbmdcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fSFRUUFwiLFxuICAgICAgICAyOCxcbiAgICAgICAgXCJIVFRQXCIsXG4gICAgICAgIFwiSFRUUCBtYWtlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmcgd2ViIHBhZ2VzIHBvc3NpYmxlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxMiksXG4gICAgICAgIFwicGFnZXMvaHR0cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0dHAud2VicFwiLFxuICAgICAgICBcIkh0dHAgdmVyYiBpbiBmcm9udCBvZiBhIGdsb2JlIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0dHAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHR0cCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odHRwXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBIVFRQXCIsXG4gICAgICAgICAgICAyOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNTU2RlZlwiLFxuICAgICAgICAyOSxcbiAgICAgICAgXCJDU1NcIixcbiAgICAgICAgXCJDU1Mgc3R5bGVzIHRoZSBlbGVtZW50cyB3aXRoaW4gYSBwYWdlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxOSksXG4gICAgICAgIFwicGFnZXMvY3NzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY3NzLTMud2VicFwiLFxuICAgICAgICBcIkEgQ1NTIHRocmVlIGxvZ28uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNzcyBpY29uc1wiLFxuICAgICAgICAgICAgXCJDc3MgaWNvbnMgY3JlYXRlZCBieSBQaXhlbCBwZXJmZWN0IC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY3NzXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNTU1wiLFxuICAgICAgICAgICAgMjlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIDMyLFxuICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgXCJUcmF2ZWwgbGF0ZW5jeSBjYW4gc2xvdyBkb3duIGEgd2Vic2l0ZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMTgpLFxuICAgICAgICBcInBhZ2VzL2xhdGVuY3kuaHRtbFwiLFxuICAgICAgICBcImltZy9jaHJvbm9tZXRlci53ZWJwXCIsXG4gICAgICAgIFwiQSBzdG9wd2F0Y2ggaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGltZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGltZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGltZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAgICAgMzJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MZGVmXCIsXG4gICAgICAgIDMzLFxuICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYW4gSFRNTCBlbGVtZW50XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDI1KSxcbiAgICAgICAgXCJwYWdlcy9odG1sLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHRtbC53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBlbGVtZW50IHN5bnRheCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgICAgICAzM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlVSTFwiLFxuICAgICAgICAzNCxcbiAgICAgICAgXCJVUkwgQWRkcmVzcyBFeGFtcGxlc1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGEgVVJMXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDgsIDcpLFxuICAgICAgICBcInBhZ2VzL3VybC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3d3dy53ZWJwXCIsXG4gICAgICAgIFwiVVJMIGV4YW1wbGUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ1cmwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVXJsIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3VybFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEYXRhU3RvcmFnZVwiLFxuICAgICAgICAzNSxcbiAgICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgICAgXCJMb2NhbCBzdG9yYWdlIHNhdmVzIGRhdGEgd2hlbiBuZWVkZWQgZm9yIGNvbmN1cnJlbnQgcGFnZSBzdXJmaW5nLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA4LCAxNCksXG4gICAgICAgIFwicGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiLFxuICAgICAgICBcImltZy9zZXJ2ZXIud2VicFwiLFxuICAgICAgICBcIkRhdGEgc3RvcmFnZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRhdGEgU3RvcmFnZVwiLFxuICAgICAgICAgICAgMzVcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNlYXJjaHZlcnRpY2Fsc1wiLFxuICAgICAgICAxNCxcbiAgICAgICAgXCJHVUlERTogU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICBcIk9wdGltaXplIHlvdXIgc2VhcmNoIGVuZ2luZSBuZXdzIGFuZCByZXN1bHRzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJndWlkZXMvc2VhcmNodmVydGljYWxzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoX3NldHRpbmdzLndlYnBcIixcbiAgICAgICAgXCJTZWFyY2ggc2V0dGluZ3MgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb250ZW50IHdyaXRpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29udGVudCB3cml0aW5nIGljb25zIGNyZWF0ZWQgYnkgVmVjdG9ycyBUYW5rIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29udGVudC13cml0aW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgICAgIDE0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU01UUFwiLFxuICAgICAgICAxNixcbiAgICAgICAgXCJHVUlERTogU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgXCJMZWFybiBFbWFpbCBwcm90b2NvbHMgYW5kIHBvcnQgbnVtYmVyc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAxMyksXG4gICAgICAgIFwiZ3VpZGVzL3NtdHAuaHRtbFwiLFxuICAgICAgICBcImltZy9jb21tdW5pY2F0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiRW1haWwgc2VydmVyLXN0YWNrIHdpdGggbWFpbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgICAgICAxNlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldnRvb2xzXCIsXG4gICAgICAgIDE5LFxuICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgXCJSZXZpZXcgZGV2IHRvb2wncyBhcHBsaWNhdGlvbiB0YWJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjcpLFxuICAgICAgICBcImd1aWRlcy9hcHBsaWNhdGlvbnRhYi5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94LndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBEZXYgQXBwbGljYXRpb25cIixcbiAgICAgICAgICAgIDE5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGV2dG9vbHN0d29cIixcbiAgICAgICAgMjEsXG4gICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgXCJPcGVuIHRoZSBkZXZlbG9wZXIncyB0b29sYm94IGFub3RoZXIgd2F5XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDEwKSxcbiAgICAgICAgXCJndWlkZXMvaW5zcGVjdHBhZ2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gyLndlYnBcIixcbiAgICAgICAgXCJEZXZlbG9wZXIncyB0b29sIGtpdCBpY29uIHR3b1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgICAgICAgMjFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQV0FJY29uXCIsXG4gICAgICAgIDI3LFxuICAgICAgICBcIkdVSURFOiBJbnN0YWxsIHRoZSBQV0EgYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiUHJvZ3Jlc3NpdmUgd2Vic2l0ZXMgaGF2ZSBhbiBpbnN0YWxsYXRpb24gb3B0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvcHdhaWNvbi5odG1sXCIsXG4gICAgICAgIFwiaW1nL2FwcC1kZXZlbG9wbWVudC53ZWJwXCIsXG4gICAgICAgIFwiQXBwIGRldmVsb3BtZW50IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGV2ZWxvcG1lbnQgaWNvbnMgY3JlYXRlZCBieSBEZXNpZ24gQ2lyY2xlIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGV2ZWxvcG1lbnRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjdcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDbGVhcmNvb2tpZXNcIixcbiAgICAgICAgMzAsXG4gICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICBcIkRvbid0IHdhc3RlIHRpbWUgc2lmdGluZyB0aHJvdWdoIHNldHRpbmdzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDIpLFxuICAgICAgICBcImd1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29va2llcy53ZWJwXCIsXG4gICAgICAgIFwiQnJvd3NlciBjb29raWUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb29raWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ29va2llIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nvb2tpZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAgICAgICAzMFxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogXCJFeHBsb3JlIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEV4cGxvcmUgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJOYXNhXCIsXG4gICAgICAgIDMsXG4gICAgICAgIFwiRVhQTE9SRTogTkFTQSBQYWdlc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIE5BU0EgZG9tYWluLiBMZWFybiBhYm91dCB0aGUgdW5pdmVyc2UgdmlhIE5BU0EgbGlua3NcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDE4KSxcbiAgICAgICAgXCJleHBsb3JlL25hc2EuaHRtbFwiLFxuICAgICAgICBcImltZy9OQVNBLndlYnBcIixcbiAgICAgICAgXCJOQVNBIEFydGVtaXMgTG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJOQVNBXCIsXG4gICAgICAgICAgICBcIkltYWdlIHNvdXJjZSB2aWEgdGhlIE5hdGlvbmFsIEFlcm9uYXV0aWNzIGFuZCBTcGFjZSBBZG1pbmlzdHJhdGlvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5uYXNhLmdvdi9hdWRpZW5jZS9mb3JzdHVkZW50cy81LTgvZmVhdHVyZXMvc3ltYm9scy1vZi1uYXNhLmh0bWxcIixcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJOQVNBIFBhZ2VzXCIsXG4gICAgICAgICAgICAzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVmlydHVhbHRvdXJcIixcbiAgICAgICAgMTgsXG4gICAgICAgIFwiRVhQTE9SRTogVmlydHVhbCBUb3Vyc1wiLFxuICAgICAgICBcIkV4cGxvcmUgdGhlIHJlYWwgd29ybGQgaW4gYSB3ZWIgYnJvd3NlclwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMyksXG4gICAgICAgIFwiZXhwbG9yZS92aXJ0dWFsdG91ci5odG1sXCIsXG4gICAgICAgIFwiaW1nL2dvb2dsZS1leHBlZGl0aW9ucy53ZWJwXCIsXG4gICAgICAgIFwiR29vZ2xlIEV4cGVkaXRpb25zIGxvZ28gZnJvbSBGTEFUSUNPTlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJnb29nbGUgZXhwZWRpdGlvbnMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiR29vZ2xlIGV4cGVkaXRpb25zIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2dvb2dsZS1leHBlZGl0aW9uc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJWaXJ0dWFsIFRvdXJcIixcbiAgICAgICAgICAgIDE4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViYlwiLFxuICAgICAgICAzMSxcbiAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZVwiLFxuICAgICAgICBcIlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAzKSxcbiAgICAgICAgXCJleHBsb3JlL3dlYmJ0ZWxlc2NvcGUuaHRtbFwiLFxuICAgICAgICBcImltZy9KV1NUX3Bvc3Rlci53ZWJwXCIsXG4gICAgICAgIFwiSmFtZXMgV2ViYiBzcGFjZSB0ZWxlc2NvcGUgcG9zdGVyIGltYWdlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkhleGFnb24gTGl0aG8gKDIwMTgpXCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb24gcHJvdmlkZWQgYnkgbmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9qd3N0Lm5hc2EuZ292L2NvbnRlbnQvZmVhdHVyZXMvZWR1Y2F0aW9uYWwvcHJpbnQuaHRtbFwiLFxuICAgICAgICAgICAgXCJqd3N0Lm5hc2EuZ292XCIsXG4gICAgICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlIGljb25cIixcbiAgICAgICAgICAgIDMxXG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBNdWx0aWRpbWVuc2lvbmFsIGFycmF5LiBSb3dzIGFyZSB0aGUgZGlmZmVyZW50IHNlY3Rpb25zLiBDb2x1bW5zXG4gKiBjb250YWluIGVhY2ggYXJ0aWNsZSdzIGRhdGEgYmVsb25naW5nIGluIHRoYXQgc2VjdGlvbi5cbiAqL1xuY29uc3QgV0VCQklUREFUQSA9IFtBcmJpdHJhcnlBcnRpY2xlcywgR3VpZGVTaG9ydHMsIEV4cGxvcmVdXG5leHBvcnQgZGVmYXVsdCBXRUJCSVREQVRBO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSV0JMaW5rIGZyb20gJy4uL21vZGVscy9SV0JMaW5rJztcblxuLyoqXG4gKiBIZWFkZXIgbmF2aWdhdGlvbiBsaW5rIGRhdGFcbiAqL1xuY29uc3QgaG9tZU5hdkxpbmsgPSBuZXcgUldCTGluayhcbiAgICBcIkluZGV4XCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJIb21lXCIsXG4gICAgXCJpbmRleC5odG1sXCJcbik7XG5cbmNvbnN0IHBhZ2VzTmF2TGluayA9IG5ldyBSV0JMaW5rKFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwicGFnZXMuaHRtbFwiXG4pO1xuXG5jb25zdCBnYW1lTmF2TGluayA9IG5ldyBSV0JMaW5rKFxuICAgIFwiR2FtZVwiLFxuICAgIFwiRmxhc2hDYXJkc1wiLFxuICAgIFwiR2FtZVwiLFxuICAgIFwiZmxhc2hjYXJkcy5odG1sXCJcbik7XG5cbi8qKiBOYXZpZ2F0aW9uIGxpbmtzICovXG5jb25zdCBOQVZJVEVNUyA9IFtob21lTmF2TGluaywgcGFnZXNOYXZMaW5rLCBnYW1lTmF2TGlua107XG5leHBvcnQgZGVmYXVsdCBOQVZJVEVNUztcbiIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5jb25zdCBwb3J0ZGVmaW5pdGlvbnMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gICAgWzIyLCBcIlNlY3VyZSBTU0ggIC9UQ1BcIl0sXG4gICAgWzIzLCBcIlRlbG5ldCAodW5zZWN1cmUpXCJdLFxuICAgIFsyNSwgXCJTTVRQIC0gNDY1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICAgIFs0OSwgXCJUQUNBQ1MrXCJdLFxuICAgIFs1MywgXCJETlMgIC9VRFAvVENQXCJdLFxuICAgIFs2NywgXCJESENQXCJdLFxuICAgIFs2OCwgXCJESENQXCJdLFxuICAgIFs4MCwgXCJIVFRQICAvVENQXCJdLFxuICAgIFs4OCwgXCJLZXJiZXJvcy1zZWMgIC9UQ1AvVURQXCJdLFxuICAgIFsxMTAsIFwiUE9QIC0gOTk1IGZvciBlbmNyeXB0ZWQuXCJdLFxuICAgIFsxMzUsIFwiUlBDXCJdLFxuICAgIFsxMzcsIFwiTkVUQklPU1wiXSxcbiAgICBbMTM4LCBcIk5FVEJJT1NcIl0sXG4gICAgWzEzOSwgXCJORVRCSU9TXCJdLFxuICAgIFsxNDMsIFwiSU1BUCAtIDk5MyBmb3IgZW5jcnlwdGVkXCJdLFxuICAgIFsxNjEsIFwiU05NUCAgTWFuYWdlclwiXSxcbiAgICBbMTYyLCBcIlNOTVAgIEFnZW50XCJdLFxuICAgIFszODksIFwiTERBUCAtIDYzNiBmb3Igc2VjdXJlXCJdLFxuICAgIFs0NDMsIFwiSFRUUFMgIC9UQ1BcIl0sXG4gICAgWzQ0NSwgXCJTTUIgIC9UQ1BcIl0sXG4gICAgWzQ2NSwgXCJTTVRQIGJ5IFRMU1wiXSxcbiAgICBbNTE0LCBcIlNZU0xPRyAgL1VEUFwiXSxcbiAgICBbNTg3LCBcIlNNVFBTIFNUQVJUVExTXCJdLFxuICAgIFs2MzYsIFwiTERBUCBTU0xcIl0sXG4gICAgWzk5MCwgXCJGVFBTXCJdLFxuICAgIFs5OTMsIFwiSU1BUCBUTFNcIl0sXG4gICAgWzk5NSwgXCJQT1AgVExTXCJdLFxuICAgIFsxODEyLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgWzE4MTMsIFwiUkFESVVTICAvVENQL1VEUFwiXSxcbiAgICBbMzI2OSwgXCJNaWNyb3NvZnQgR2xvYmFsIENhdGFsb2dcIl0sXG4gICAgWzMzODksIFwiUkRQXCJdLFxuXSk7XG5leHBvcnQgZGVmYXVsdCBwb3J0ZGVmaW5pdGlvbnM7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEhlYWRlckZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyRm9vdGVyJztcbmltcG9ydCBQYWdlQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvUGFnZUNvbXBvbmVudHMnO1xuaW1wb3J0IENsYXNzQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvQ2xhc3NDb21wb25lbnRzJztcbmltcG9ydCBtb2JpbGVBYmJyTWFya3VwIGZyb20gJy4vY29tcG9uZW50cy9tb2JpbGVNYXJrdXAnXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuL21vZGVscy9TY3JpcHRQZXJmJ1xuXG5cbmNvbnN0IG1haW5wZXJmID0gbmV3IFJXQlBlcmYoXCJtYWluXCIpO1xuXG4vLyBlbnRyeSBwb2ludFxuLyoqXG4gKiBUeXBlU2NyaXB0IGVudHJ5IHBvaW50LiBUaGlzIHNjcmlwdCBpbml0aWFsaXplcyBwYWdlIGNvbXBvbmVudHMgYW5kIG1vZGVscyBhc1xuICogIHRoZXkncmUgbmVlZGVkIG1haW4uaW5pdCgpIGlzIHRoZSBpbml0aWFsaXphdGlvbiBvZiBcInR5cGVzY3JpcHQuanNcIi5cbiAqL1xuY29uc3QgbWFpbiA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHBhZ2Ugd2lkZ2V0cyBhbmQgYXBwbGljYXRpb24gZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIEV2ZW50IGZpcmVkIGJlZm9yZSBhc3NldHMgYXJlIHJlbmRlcmVkIHRvIHRoZSBwYWdlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgYW5kIGZvb3RlciBjb21wb25lbnRzXG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHBhZ2UgY29tcG9uZW50c1xuICAgICAgICAgICAgUGFnZUNvbXBvbmVudHMuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGVsZW1lbnQgY29tcG9uZW50c1xuICAgICAgICAgICAgQ2xhc3NDb21wb25lbnRzLmluaXREaWN0aW9uYXJ5KCk7XG4gICAgICAgICAgICBDbGFzc0NvbXBvbmVudHMuaW5pdFRvRG8oKTtcblxuICAgICAgICAgICAgLy8gPGFiYnI+PC9hYmJyPiBzdHlsZXM6IGltcGxlbWVudGVkIGZvciBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgbW9iaWxlQWJick1hcmt1cC5pbml0KCk7XG5cbiAgICAgICAgICAgIG1haW5wZXJmLmVuZCgpO1xuICAgICAgICB9KVxuICAgIH0gICAgXG59O1xuXG5tYWluLmluaXQoKTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVjZWl2ZWREYXRhOiBhbnk7IC8vVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBnYXRoZXJzIGFsbCB0aGUgbmVlZGVkIGluZm9ybWF0aW9uIGZvciBmZXRjaCBhbmQvb3IgYnJvd3NlclxuICAgKiAgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHBhcmFtIHNlbmRUb0Jyb3dzZXJDYWNoZSAgLSBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGZldGNoIGNhY2hpbmcuXG4gICAqIEBwYXJhbSBicm93c2VyQ2FjaGVOYW1lIC0gSWYgc3RvcmluZyB0aGUgcmVxdWVzdCBpbiBicm93c2VyIGNhY2hlLCB0aGlzIHN0cmluZyBwcm92aWRlcyB0aGUgbmFtZSBmb3Igc3RvcmFnZS5cbiAgICogQHBhcmFtIGVycm9yRWxlbSAtIFNob3VsZCB0aGUgZmV0Y2ggcmVxdWVzdCBmYWlsLCByZXR1cm4gZXJyb3Igc3RhdHVzIHRvIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEdFVFVSTDogVVJMLFxuICAgIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbixcbiAgICBlcnJvckVsZW06IEhUTUxFbGVtZW50LFxuICAgIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICB0aGlzLmVycm9yRWxlbSA9IGVycm9yRWxlbTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZVxuICAgKi9cbiAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHRVRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMuR0VUVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsaXAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgYm9vbGVhbiB2YWx1ZSBmcm9tIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmZXRjaCByZXF1ZXN0IGNhbiB0YWtlIFVSTCBvciBzdHJpbmcgcGFyYW1ldGVyLiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGFwaUdFVFxuICAgKiAgb2JqZWN0IGZvciBhIFVSTCBmZXRjaCBieSBjcmVhdGluZyBhIFVSTCBmcm9tIHRoZSBzdHJpbmcsIG9yIHBhc3NpbmcgdGhlIFVSTC5cbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICovXG4gIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIEdFVFVSTCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5HRVRVUkwgPSBuZXcgVVJMKEdFVFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQSBwdWJsaWMgZnVuY3Rpb24gY3JlYXRpbmcgYSBkYXRhIHByb21pc2Ugb2JqZWN0IGZvciB0aGUgY2FsbGVkIGZldGNoIGZ1bmN0aW9uLiBJZlxuICAgKiAgdGhlIHJlcXVlc3QgbmVlZHMgYWRkZWQgdG8gYnJvd3NlciBzdG9yYWdlLCB0aGUgZmV0Y2ggaXMgbWFkZSBhbmQgc2VudCB0b1xuICAgKiAgc3RvcmFnZS4gQSBjbG9uZWQgY29weSBvZiB0aGUgZmV0Y2hlZCBkYXRhIGlzIHJldHVybmVkIGFuZCB0aGUgb3JpZ2luYWwgcmVxdWVzdCBpc1xuICAgKiAgc2VudCB0byB0aGUgY2FjaGUuIFdpdGhvdXQgc2VuZGluZyB0byBicm93c2VyIGNhY2hlLCB0aGUgZmV0Y2ggaXMgcmVxdWVzdGVkIGFuZCBcbiAgICogcmV0dXJuZWQuXG4gICAqICBcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YUNhY2hlUHJvbWlzZTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgIC8vQ2hlY2sgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGNhY2hlIHN0b3JhZ2VcbiAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpIHtcbiAgICAgIC8vVGhlIHJldHVybmVkIGRhdGEgaXMgcGFja2FnZXMgYXMgYSBQcm9taXNlIG9iamVjdFxuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdykge1xuICAgICAgICAgIC8vT3BlbiBjYWNoZSBhbmQgY2hlY2sgZm9yIHJlcXVlc3QgZXhpc3RpbmcgaW4gQ2FjaGUgU3RvcmFnZVxuICAgICAgICAgIHdpbmRvdy5jYWNoZXMub3Blbih0aGlzLmJyb3dzZXJDYWNoZU5hbWUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICBjYWNoZXMubWF0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy9ObyBtYXRjaGVzIGZvciB0aGlzIHJlcXVlc3QgaW4gU3RvcmFnZSBDYWNoZSwgc28gZmV0Y2ggdGhlIHJlcXVlc3Qgbm9ybWFsbHlcbiAgICAgICAgICAgICAgICAvL1Vwb24gc3VjY2VzcywgYSBjbG9uZWQgY29weSB3aWxsIG5lZWQgdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICAgICAgICAgZmV0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICBsZXQgY2xvbmVkcmVzcCA9IHJlc3VsdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcmVzdWx0IHRvIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KEdFVFVSTCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVkcmVzcC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0NhY2hlIGhpdCBzdWNjZXNzLCByZXR1cm4gdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZSA9PiB7Ly9DYW5ub3Qgb3BlbiBTdG9yYWdlIENhY2hlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNQcm9ibGVtIG9wZW5pbmcgQ2FjaGUgU3RvcmFnZS4gTmFtZTogJHt0aGlzLmJyb3dzZXJDYWNoZU5hbWV9YCwgXCJjb2xvcjogZ3JleVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gZmFsc2U7XG4gICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7Ly9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9taXNlIGVycm9yIG9uIGRhdGEgZmV0Y2guXCIpKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vVGhlIHByb21pc2UgaGFzIHJlc29sdmVkIC0tPiByZXR1cm4gdGhlIHByb21pc2UgZGF0YVxuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgfSk7XG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmZXRjaCByZXF1ZXN0LCByZXR1cm5pbmcgYSBmZXRjaCBwcm9taXNlLlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhLnRleHQoKSBvciBkYXRhIGJhc2VkIG9uIHRoZSBpbnN0YW5jZSByZXR1cm5lZC5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgcmV0dXJuIGZldGNoKEdFVFVSTClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5hcGlSZXNwb25zZUVycm9yQ2hlY2socmVzcG9uc2UpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IGAke2UubWVzc2FnZX1gO1xuICAgICAgfSk7XG4gIH1cblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCTGluayBmcm9tIFwiLi9SV0JMaW5rXCI7XG5cbi8qKiBcbiAqIFVzZWQgZm9yIGltYWdlIEF0dHJpYnV0aW9uXG4qL1xuY2xhc3MgQXR0cmlidXRpb25MaW5rIGV4dGVuZHMgUldCTGluayB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgcHVibGljIGF0dHJpYnV0ZWRvd25lcjogc3RyaW5nO1xuICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgcHVibGljIGFydGljbGVpZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKkxpbmsgdGl0bGUgKi9cbiAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgLyoqTGluayBpbm5lciB0ZXh0ICovXG4gICAgICAgIGlubmVyVGV4dDogc3RyaW5nLFxuICAgICAgICAvKiogbGluayBocmVmICovXG4gICAgICAgIGhSZWZlcmVuY2U6IHN0cmluZyxcbiAgICAgICAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgICAgICAgYXR0cmlidXRlZG93bmVyOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgcGFnZSAqL1xuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVkb3duZXIgPSBhdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgIHRoaXMuYXJ0aWNsZWlkID0gYXJ0aWNsZWlkO1xuICAgICAgICBBdHRyaWJ1dGlvbkxpbmsuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluaztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvckNvZGUge1xuICAgIGVsZW1zOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PltdO1xuICAgIGNvbG9yOiBzdHJpbmdbXTtcbiAgICByZXNldGJ0bjogRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvciAoY29sb3JsZXNzZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W10sIGNvbG9yczogc3RyaW5nW10sIHJlc2V0YnRuOiBFbGVtZW50KXtcbiAgICAgICAgdGhpcy5lbGVtcyA9IGNvbG9ybGVzc2VsZW1lbnRzO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3JzO1xuICAgICAgICB0aGlzLnJlc2V0YnRuID0gcmVzZXRidG47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRpbmcodGhpcy5lbGVtc1tpXSwgdGhpcy5jb2xvcltpXSk7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRSZXNldCh0aGlzLmVsZW1zW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbG9yIHRoZSBleGFtcGxlIGFyZWEncyBlbGVtZW50cyB1c2luZyBjc3NcbiAgICAgKiBAcGFyYW0gZWxlbXNsaXN0IC0gTm9kZSBsaXN0IG9mIEhUTUxFbGVsZW1lbnRzLiBJLkUuIHVzaW5nIHF1ZXJ5LlNlbGVjdG9yQWxsKClcbiAgICAgKiBAcGFyYW0gY29sb3IgLSBTdHJpbmcgb2YgQ1NTIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodGluZyAoZWxlbXNsaXN0OiAgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sIGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL2Z1bmN0aW9uIHRvIHJlc2V0IHRoZSBjc3MgY29kZSBwcm9wZXJ0aWVzIGNvbG9yIHRvIG9yaWdpbmFsXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KCBlbGVtc2xpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KXtcbiAgICAgICAgdGhpcy5yZXNldGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuLi9tb2RlbHMvQVBJXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZCB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IERpY3Rpb25hcnlTZWFyY2hNYXJrdXAgZnJvbSBcIi4vRGljdGlvbmFyeVNlYXJjaE1hcmt1cFwiO1xuaW1wb3J0IFJXQkVycm9yIGZyb20gXCIuL1JXQkVycm9yQnVzXCI7XG5pbXBvcnQgUldCUGFyc2VKU09OIGZyb20gXCIuL1JXQlBhcnNlclwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaCBpcyBhIHNldCBvZiBtYXJrdXAgY3JlYXRpb24gYW5kIGZ1bmN0aW9ucyB3aGljaCBhbGxvdyBhIHVzZXJcbiAqICB0byBsb29rIHVwIGEgd29yZCBsaWtlIGEgRGljdGlvbmFyeS4gV2hlbiBjYWxsZWQsIHRoZSB1c2VyJ3MgaW5wdXQgaXMgdmFsaWRhdGVkXG4gKiAgYXMgYW4gYWNjZXB0YWJsZSB3b3JkIG9yIGl0IGRlY2xpbmVzIHRoZSByZXF1ZXN0LCB0aGVuIHNob3dpbmcgdGhlIHVzZXIgaWYgdGhlIHdvcmRcbiAqICBpcyBhY2NlcHRhYmxlLlxuICpcbiAqIENyZWF0aW5nIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IHJlcXVpcmVzIHBhc3NpbmcgYSByZWZlcmVuY2UgZWxlbWVudCAoZm9yIGFcbiAqIGtub3duIHBsYWNlbWVudCBsb2NhdGlvbikgdGhhdCBjb250YWlucyB0aGUgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzLlxuICpcbiAqICAgbmV3IERpY3Rpb25hcnlTZWFyY2goZWxlbSk7XG4gKlxuICogQWxsIHRoZSBuZWVkZWQgZWxlbWVudHMgYW5kIGZ1bmN0aW9uYWxpdHkgYXJlIGFkZGVkIHRvIHRoZSBwYWdlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgZXh0ZW5kcyBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIHtcbiAgcHVibGljIHN0YXRpYyB3b3JkU3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdO1xuICBwcml2YXRlIHN0YXRpYyBDYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdDogc3RyaW5nID0gXCJSV0Jfd29yZF9mZXRjaFwiO1xuICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPVxuICAgIFwiaHR0cHM6Ly9hcGkuZGljdGlvbmFyeWFwaS5kZXYvYXBpL3YyL2VudHJpZXMvZW4vXCI7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd29yZFVSTDogVVJMO1xuICBwcml2YXRlIHdvcmREYXRhOiBvYmplY3Q7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgY3JlYXRlcyBhbGwgdGhlIGZ1bmN0aW9uYWxpdHkgYW5kIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICAgKiAgRGljdGlvbmFyeSBTZWFyY2ggd2lkZ2V0IGludGVyZmFjZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW52b2tlIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcihlbGVtKTtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAvL0luaXRpYWxpemUgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRXaWRnZXRFdmVudHMoKTtcbiAgICBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LndvcmRTdG9yYWdlID0gRGljdGlvbmFyeVNlYXJjaFdpZGdldC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgTG9jYWwgU3RvcmFnZSB3b3JkcyBwcmV2aW91c2x5IHN0b3JlZCB3aXRoIHRoZSBEaWN0aW9uYXJ5IFNlYXJjaCBXaWRnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgLSB0aGVzZSBhcmUgdGhlIHdvcmRzIHN0b3JlZCBwcmV2aW91c2x5IGluIHRoZVxuICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAvL0xvY2FsIFN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtcyBkYXRhIGFzc2lnbm1lbnRcbiAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VTdHI6IHN0cmluZztcbiAgICBpZihSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCB0cnVlLCB0cnVlKSl7XG4gICAgICAvL1RoZSBMb2NhbCBTdG9yYWdlIGlzIG51bGwgb3IgZW1wdHktLT4gQ29uZmlybSBoZXJlIHRoZSBicm93c2VyIGRvZXMgbm90IGhhdmUgYW55IENhY2hlIFN0b3JhZ2UgaXRlbXMgaW4gZXJyb3JcbiAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdyl7XG4gICAgICAgIGlmICh3aW5kb3cuY2FjaGVzLmhhcyhEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FjaGVzLmRlbGV0ZShEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3dvcmQtY2FjaGVzJyk7XG4gICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgIC8vY2hlY2sgdGhlIHdvcmQtY2FjaGUgdmFsdWUgZm9yIGNvcnJlY3QganNvbiBwYXJzaW5nXG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihzdG9yYWdlU3RyKSk7XG4gICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKXtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLCBcbiAgICAgICAgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICB0aGlzLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNldGVzdC5yZXR1cm5zdHI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZC5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBmZXRjaGVkIHdvcmQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkRGF0YVxuICAgKi9cbiAgcHVibGljIGdldFdvcmREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLndvcmREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xpY2sgYW5kIGtleXByZXNzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgd2lkZ2V0LiBJbnB1dCBldmVudCBsaXN0ZW5lcnMgJ2NsaWNrJ1xuICAgKiAgYW5kICdrZXlwcmVzcycgYXdhaXQgZm9yIGEgc2VhcmNoIGNhbGwuIEFsc28sIHNob3VsZCBhIHVzZXIgd2FudCB0byBzZWFyY2ggYVxuICAgKiAgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLCB0aGUgd2lkZ2V0IGFkYXB0cyBtYXJrdXAgZm9yIHRoYXQgcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgYWRkV2lkZ2V0RXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgY29uc3QgaGlkZVByZXZpb3VzUGFuZWwgPSAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy9VcG9uIGlucHV0IGVudHJ5LCBmaXJlIEFQSSBmZXRjaFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgICAgfSk7XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiKSByZXR1cm47XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgZmFsc2UsIG51bGwpO1xuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAvL1wiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgLy9DbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKTtcbiAgICAgIH0pO1xuICAgIFxuICAgIC8vXCJSZWZyZXNoXCIgYnV0dG9uIHJlbG9hZHMgdGhlIHBhZ2VcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXZpb3VzV29yZHNcIik7XG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lcjtcblxuICAgIC8vQ2hlY2sgdGhlIHBsYWNlbWVudCBsb2NhdG9yIGFuZCB3b3JkIGNhY2hlcyBmb3IgdW5kZWZpbmVkXG4gICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID09IG51bGwgfHxcbiAgICAgIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucyh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkLCBidXR0b25Db250YWluZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBhbnksIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpe1xuICAgIGlmKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKXtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICAgbGV0IHByZXZpb3Vzd29yZGJ1dHRvbnM6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID0gdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRTZWFyY2hlc0VsZW1lbnRzKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2UsIGJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICBmb3IgKGxldCBidG4gb2YgcHJldmlvdXN3b3JkYnV0dG9ucyl7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uLlxuICAgICAgLy90aGlzIGlzIHRoZSBjYWNoZWQgd29yZCBidXR0ZW4uIHdoZW4gaXQncyBjbGlja2VkLCBmaXJlIGEgd29yZCBzZWFyY2hcbiAgICAgIGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIHRydWUsIGJ0bi53b3JkKTtcbiAgICAgIH0pO1xuICAgICAgLy9NT0JJTEVcbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgd29yZCB0byB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgY29udGFpbmluZyB3b3JkIGRhdGEsIFVSTCwgYW5kIGNhY2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V2YWx1ZSAtIFRoaXMgaW50ZXJmYWNlIHN0b3JlcyBpbmZvcm1hdGlvbiB3aGVyZSBzZW5kaW5nIHRvIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIGFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdldmFsdWU6IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICBsZXQgd29yZFN0b3JlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBbXTtcbiAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICBjb25zdCBhZGRlZHdvcmRjYWNoZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNBZGRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXZhbHVlLndvcmR9YCwgXG4gICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Jyk7XG4gICAgfVxuXG4gICAgLy9BZGQgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZSAnd29yZC1jYWNoZXMnXG4gICAgaWYgKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBpcyBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBKU09OLnN0cmluZ2lmeSh3b3JkU3RvcmUpKTtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0NyZWF0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCwgXG4gICAgICAgICAgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0xvY2FsIHN0b3JhZ2UgaXMgbm90IGVtcHR5LiBIZXJlLCB3ZSBuZWVkIHRvIGFkZCB0aGUgd29yZCB0byB0aGUgZXhpc3Rpbmcgd29yZCBjYWNoZS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2U7XG5cbiAgICAvL01hdGNoIHRoZSBjdXJyZW50IFVSTCBmb3IgY2FjaGUgbWFuYWdlbWVudFxuICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSBsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkVVJMKSB7XG4gICAgICAgIC8vV29yZCBpcyBhbHJlYWR5IGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgLy9ObyBuZWVkIHRvIGFkZCBpdCB0byB0aGUgYXJyYXlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICAvL0FkZCB3b3JkIHRvIGV4aXN0aW5nICd3b3JkLWNhY2hlcycgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGFsbGNhY2hlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgSlNPTi5zdHJpbmdpZnkoYWxsY2FjaGUpKTtcbiAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQWRkZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkfWAsIFxuICAgICAgJ2NvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjsnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBwcmV2aW91cyB3b3JkIGRhdGEgZnJvbSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSAtLT4gS2V5L1ZhbHVlXG4gICAqIGRhdGEgcmVmZXJlbmNpbmcgd29yZHMgc3RvcmVkIGluIGxvY2FsIGNhY2hlLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdld29yZCAtIHN0cmluZyBmcm9tIFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiIGJ1dHRvblxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdld29yZDogc3RyaW5nKSB7XG4gICAgLy9SZW1vdmUgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZSwgQ2FjaGUgU3RvcmFnZVxuICAgIC8vQ2hlY2sgbG9jYWwgc3RvcmFnZSBpcyBub3QgbnVsbCBvciBlbXB0eVxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9HZXQgdGhlIHdvcmRzIGFycmF5IGZyb20gTG9jYWwgU3RvcmFnZVxuICAgIC8vUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShcIkRpY3Rpb25hcnlXaWRnZXRcIiwgXCJ3b3JkLWNhY2hlc1wiKTsgLy9sb2cgd2hldGhlciBmZXRjaGVkIHdvcmQgY2FjaGUgaXMgbnVsbCBvciBlbXB0eS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2U7XG4gICAgXG4gICAgLy9SZW1vdmUgdGhlIHdvcmQgZnJvbSBDYWNoZSBTdG9yYWdlIGFuZCBMb2NhbCBTdG9yYWdlIHdvcmQgYXJyYXlcbiAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgIGlmICh3b3JkQ2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZENhY2hlLndvcmRVUkwpO1xuICAgICAgICBhbGxjYWNoZS5zcGxpY2UoYWxsY2FjaGUuaW5kZXhPZih3b3JkQ2FjaGUpLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V3b3JkfWAsIFxuICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjsnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbGNhY2hlLmxlbmd0aCA9PSAwKXsgLy9UaGUgcmVtb3ZlZCB3b3JkIHdhcyB0aGUgbGFzdCB3b3JkIGluIHRoZSBhcnJheSwgc28gcmVtb3ZlIHRoZSBjb250YWluZXJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLCBcbiAgICAgICAgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL1JldHVybiByZW1haW5pbmcgd29yZHMgdG8gTG9jYWwgU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgSlNPTi5zdHJpbmdpZnkoYWxsY2FjaGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmZXRjaCByZXF1ZXN0IGZyb20gQ2FjaGUgU3RvcmFnZS4gVXRpbGl6ZXMgXG4gICAqIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QgZm9yIGNhY2hlIG5hbWUuXG4gICAqIEBwYXJhbSByZW1vdmVVUkwgXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHJlbW92ZVVSTDogVVJMKSB7XG4gICAgd2luZG93LmNhY2hlc1xuICAgIC5vcGVuKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICBjYWNoZXMubWF0Y2gocmVtb3ZlVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIG1hdGNoaW5nIHRoZSByZXN1bHQuIFJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHJlc3VsdCkpO1xuICAgICAgICAgIGNhY2hlUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhY2hlLmRlbGV0ZShyZW1vdmVVUkwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGR5bmFtaWNhbGx5IHJlY2FsbHMgYSB3b3JkIGRlZmluaXRpb24gcmVxdWVzdCBhbmQgaW5zdGFudGlhdGVzIGFwaUdFVCgpLiBUaGUgXG4gICAqIHJldHVybmVkIHByb21pc2UgYWxzbyBkeW1hbmljYWxseSBhbnN3ZXJzIHRoZSB3aWRnZXQgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgKiBAcGFyYW0gd29yZFVybCAtIFRoZSBmZXRjaCByZXF1ZXN0IFVSTC5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBzZW5kVG9DYWNoZSAtID8gU2VuZCBmZXRjaCByZXF1ZXN0IHRvIENhY2hlIFN0b3JhZ2UgOiBGZXRjaCB3aXRob3V0IHN0b3JpbmcgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBjYWNoZU5hbWUgLSBJZiBzZW5kaW5nIGZldGNoIHJlcXVlc3RzIHRvIGNhY2hlLCBwcm92aWRlIGEgbmFtZSB0byBzdG9yZSBpdCB1bmRlci5cbiAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERpY3Rpb25hcnlUZXJtKHdvcmQ6IHN0cmluZywgd29yZFVybDogVVJMLCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgLy9BIGZ1bmN0aW9uIGNhbGwgcGFyYW1ldGVyIG9wdGlvbiBpcyB0byBzdG9yZSB0aGUgd29yZCByZXF1ZXN0IGluIGJyb3dzZXIncyBDYWNoZSBTdG9yYWdlXG4gICAgLy9TdHJ1Y3R1cmUgdGhlIHdvcmQgZGF0YSB2aWEgJ2xvY2Fsc3RvcmFnZXdvcmR2YWx1ZScgaW50ZXJmYWNlIHVzZWQgdGhyb3VnaG91dCBmZXRjaGluZ1xuICAgIGxldCB3b3JkY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmQgPSB7XG4gICAgICBpbkNhY2hlOiBzZW5kVG9DYWNoZSxcbiAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgY2FjaGVOYW1lOiBzZW5kVG9DYWNoZSA/IGNhY2hlTmFtZSA6IFwiXCIsXG4gICAgfTtcblxuICAgIC8vQXN5bmNocm9ub3VzIGZldGNoIHJlcWV1c3QgYW5kIGR5bmFtaWMgbWFya3VwIGNyZWF0aW9uIGZyb20gdGhlIGRhdGEncyByZXR1cm5cbiAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgLy9DYWxsIGFwaUdFVCgpIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVChcbiAgICAgICAgd29yZGNhY2hlLndvcmRVUkwsXG4gICAgICAgIHdvcmRjYWNoZS5pbkNhY2hlLFxuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0sXG4gICAgICAgIHdvcmRjYWNoZS5jYWNoZU5hbWVcbiAgICAgICk7XG4gICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbjtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgbm9EZWZpbml0aW9ucyA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKGRhdGEpKTtcbiAgICAgICAgaWYoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gcGFyc2V0ZXN0LnJldHVybnN0cjtcbiAgICAgIH1cbiAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYW4gb2JqZWN0LCBjb25maXJtIGl0IGlzICdubyBkZWZpbml0aW9uJyBzZXJ2ZXIgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgICAgICAvL05vIGRlZmluaXRpb25zIHdlcmUgZm91bmQgd2hlbiBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIGEgdGl0bGUgcHJvcGVydHlcbiAgICAgICAgICAvL3dvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIlxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIiAmJiB3b3JkY2FjaGUuaW5DYWNoZSA9PSB0cnVlKXtcbiAgICAgICAgICAgIC8vVGhlIGRhdGEgc3RyZWFtIGhlcmUgaXMgd2l0aG91dCB3b3JkIGRhdGEuIFRoaXMgZnVuY3Rpb24gYXdhaXRzIHRoZSBhcGkgZmV0Y2gncyBkYXRhXG4gICAgICAgICAgICAvL3RvIGNvbXBsZXRlIHN0b3JhZ2UvcHJvbWlzZSByZXR1cm5zLiBJdCB3YWl0cyA1IHNlY29uZHMgZm9yIHRoZSBicm93c2VyIHRvIGNvbXBsZXRlIGl0cyBzdG9yZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIC8vdGhlbiByZW1vdmVzIHRoZSB1bndhbnRlZCBjYWNoZSByZXF1ZXN0LlxuICAgICAgICAgICAgLy9UT0RPOkJVR1JFU0VBUkNIPT5EdXJpbmcgdGhlIDUgdGltZW91dCwgaWYgdGhlIHBhZ2UgcmVmcmVzaGVzIGEgJ2JhZCB3b3JkJyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgIC8vVGhpcyAnYmFkIHdvcmQnIGNhbiBiZSByZW1vdmVkIGJ5IGRlbGV0aW5nIGFsbCBwcmV2aW91cyB3b3JkcyB2aWEgVUkgYW5kIHJlZnJlc2hpbmcgdGhlIHBhZ2UuIFRoaXMgd2lsbFxuICAgICAgICAgICAgLy8gZmlyZSBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkgdG8gY2xlYXIgYW55IG1pc21hdGNoZWQgd29yZGRhdGE8LS0+Y2FjaGVkcmVxdWVzdHMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9GdW5jdGlvbiBhd2FpdGluZyByZXF1ZXN0J3MgQ2FjaGUgU3RvcmFnZSBjYWNoaW5nXG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZW1vdmUgZnJvbSBDYWNoZSBTdG9yYWdlLiBOYW1lOiBcIiwgd29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IG5vRGVmaW5pdGlvbnMpIHsvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICAvLydCYWQgZGF0YScgZHVlIHRvIFwiTm8gZGVmaW5pdGlvbnMgZm91bmRcIiwgaW52YWxpZCB3b3JkLCBiYWQgbmV0d29yayBjb25uZWN0aW9uXG4gICAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lICE9PSBmYWxzZSkgey8vT25saW5lLCBwcm9ibGVtIHdpdGggZmV0Y2hcbiAgICAgICAgICAvL09mZmxpbmUgcmVxdWVzdFxuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9EZWZpbml0aW9ucykgey8vU2VydmVyIHJldHVybmVkIG5vIGRlZmluaXRpb25zIGRhdGFcbiAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2Ugey8vSW52YWxpZCB3b3JkIGRhdGFcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgbGV0IHdvcmREYXRhID0gd29yZEZldGNoUmVxdWVzdCgpO1xuICAgIHJldHVybiB3b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gYXdhaXRzIGEgcHJvbWlzZSwgZmV0Y2hpbmcgYSBkaWN0aW9uYXJ5IHRlcm0uIFRoZSBkYXRhIFxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCB3b3JkOiBzdHJpbmcsIHdvcmRVUkw6IFVSTCkge1xuICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgbGV0IHdvcmREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFxuICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZCwgd29yZFVSTCwgc2VhcmNoRWxlbXMsIHRydWUsIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgICApO1xuICAgIH0pO1xuICAgIHdvcmREYXRhUHJvbWlzZS50aGVuKChkYXRhOiBvYmplY3QpID0+IHtcbiAgICAgIHRoaXMud29yZERhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgc2VhcmNoRWxlbXMpO1xuICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JldHJpZXZlZCB3b3JkOiAke3dvcmR9YCwgXG4gICAgICAgICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgdW5uZWVkZWQgY2xhc3NlcyBpZiBhcHBsaWVkIHByZXZpb3VzbHlcbiAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XG4gICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuXG4gICAgXG4gIH1cblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgaXNGcm9tUHJldmlvdXNXb3JkczogYm9vbGVhbiwgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZCB8IG51bGwpIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgY2FjaGVkV29yZC53b3JkLCBjYWNoZWRXb3JkLndvcmRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LnJlcXVlc3RVcmwpO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCB0aGlzLndvcmRVUkwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSBcIlwiOyAvLyByZXNldCBpbnB1dCBzdHJpbmdcbiAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KXtcbiAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcbiAgfVxuICAvKipcbiAgICogUHJpbWFyeSB3aWRnZXQgbWFya3VwIHN0cnVjdHVyaW5nIHRoZSB3aWRnZXQgZWxlbWVudHMgYW5kIHNlYXJjaCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgYmVmb3JlIHRoZSB3aWRnZXQuXG4gICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgKiAgaW1wb3J0YW50IEhUTUwgZWxlbWVudHMgdXNlZCB0aHJvdWdoIHdpZGdldCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgaWYgKGRpY3Rpb25hcnkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICBjb25zdCBhcnRIID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcblxuICAgIC8vIFJldHVybiBlbGVtZW50cyB1c2VkIGluIGxhdGVyIGZ1bmN0aW9uc1xuICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgcHJldmlvdXNXb3Jkc0NvbnRhaW5lcjogZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxcbiAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgIH07XG4gICAgXG4gICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlNlYXJjaC4uLlwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyLmlkID0gXCJkaWN0aW9uYXJ5LWJ0bnNcIjtcbiAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcblxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMgPSBzZWFyY2hFbGVtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtYXJrdXAgdG8gaG91c2UgcmV0dXJuZWQgd29yZHMgZnJvbSBEaWN0aW9uYXJ5U2VhcmNoLiBUaGUgbWFya3VwXG4gICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAqICBhZGFwdGl2ZSB0byByZXR1cm5lZCB3b3JkIGRhdGEgc3RydWN0dXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHdvcmREYXRhIC0gVGhpcyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IG9mIHdvcmQgdHlwZXMsIGRlZmluaXRpb25zLCBhbmQgZXhhbXBsZXMuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cCh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzKSB7XG4gICAgaWYgKHdvcmREYXRhID09IG51bGwgfHwgISh3b3JkRGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIlY1RoZXJlIGlzIG5vIGRlZmluaXRpb24gZm9yIHRoaXMgd29yZC5cIiwgXCJjb2xvcjpkYXJrZ3JlZW47XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCB3b3JkIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uRGVzY3JpcHRpb25cIik7XG5cbiAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwid29yZFwiLCB3b3JkLndvcmQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpO1xuXG4gICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb25zIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIixcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vY3JlYXRlIGNsZWFyIGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ3b3JkLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGhvdmVyZWQsIGRpc3BsYXkgaXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIG5vdCBob3ZlcmVkLCBoaWRlIGl0XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgY2xpY2tlZCwgY2xlYXIgdGhlIGVsZW1lbnRzXG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgd29yZDogJHtkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuZ2V0QXR0cmlidXRlKFwid29yZFwiKX1gLCBcbiAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjbGVhciBidXR0b24gdG8gd2lkZ2V0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyAod29yZHN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIGxldCBidXR0b25zYXJyOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9IFtdO1xuICAgIFxuICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgLy9uZWVkZWQgdG8gZGlzcGxheSB0aG9zZSB3b3Jkcy4gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2lkZ2V0IGZ1bmN0aW9uYWxpdHkuXG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIHdvcmRzdG9yYWdlKSB7XG4gICAgICBjb25zdCB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIgPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgY29uc3QgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImRpY3Rpb25hcnktd29yZC1idG5cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuXG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnRuOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgPSB7XG4gICAgICAgIHdvcmQ6IHdvcmRDYWNoZSxcbiAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW06IGNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXI6IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcixcbiAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW06IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgfVxuICAgICAgYnV0dG9uc2Fyci5wdXNoKHByZXZpb3Vzd29yZGJ0bik7XG4gICAgfVxuICAgIHJldHVybiBidXR0b25zYXJyO1xuICB9XG59XG4iLCIvL0F1dGhvcjogUm9iZXJ0IEEgSG93ZWxsLCBBcHJpbCAyMDIzXG4vL09yaWdpbmFsIEF1dGhvcihzKTogTW96aWxsYSBDb250cmlidXRvcnMsIE1ETlxuLy9MaWNlbnNlOiBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9lbi1VUy9hYm91dC9nb3Zlcm5hbmNlL3BvbGljaWVzL3BhcnRpY2lwYXRpb24vXG4vL01ETjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2NyZWF0ZUVsZW1lbnRcbi8vU291cmNlIGRpc3RyaWJ1dGlvbjogaHR0cHM6Ly9naXRodWIuY29tL21kbi93ZWItY29tcG9uZW50cy1leGFtcGxlcy90cmVlL21haW4vZXhwYW5kaW5nLWxpc3Qtd2ViLWNvbXBvbmVudFxuXG4vLyBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlIGVsZW1lbnRcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdMaXN0RWxlbWVudCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gc3VwZXIoKSBpcyBhIHJlZmVyZW5jZSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgICAgICAvLyBsaSBlbGVtZW50cyBjYW4gYmUgY29udGFpbmVycyBpZiB0aGV5IGhhdmUgdWxzIHdpdGhpbiB0aGVtXG4gICAgICAgIGNvbnN0IHVscyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcbiAgICAgICAgY29uc3QgbGlzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgICAgICAvLyBUaGVzZSBsaXN0cyB3aWxsIGJlIHNob3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgaGlnaGVyIGxldmVsIGNvbnRhaW5lclxuICAgICAgICB1bHMuZm9yRWFjaCh1bCA9PiB7XG4gICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb29rIHRocm91Z2ggZWFjaCBsaSBlbGVtZW50IGluIHRoZSB1bFxuICAgICAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLy8gdG8gc2hvdyBhbiBvcGVuIG9yIGNsb3NlZCBpY29uXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGhlIGxpIGVsZW1lbnQncyB0ZXh0IGluIGEgbmV3IHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhc3NpZ24gc3R5bGUgYW5kIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzcGFuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0ZXh0IGZyb20gbGkgdG8gc3Bhbiwgc2V0IGN1cnNvciBzdHlsZVxuICAgICAgICAgICAgICAgIG5ld1NwYW4udGV4dENvbnRlbnQgPSBjaGlsZFRleHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgICAgICAgICBuZXdTcGFuLm9uY2xpY2sgPSB0aGlzLnNob3d1bDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBldmVudC5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgRXhwYW5kaW5nTGlzdEVsZW1lbnQuY291bnQrKztcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8vIFRoaXMgb2JqZWN0IGNyZWF0ZXMgYW4gYXJyYXkgb2YgZGl2cyBmcm9tIGlucHV0IHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIHdpZGdldCBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd2lkZ2V0Y291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyB3aXRoaW4gdGhlIHdpZGdldCBpbnN0YW50aWF0ZWQgW2ZsYXNoY2FyZHNdICovXG4gICAgcHVibGljIHN0YXRpYyB0b3RhbGZsYXNoY2FyZHM6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gICAgcHVibGljIGZsYXNoY2FyZHNjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fcG9ydEluZm9NYXA6IE1hcDxhbnksIHN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPGFueSwgc3RyaW5nPikge1xuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAgPSBwb3J0bnVtYmVyc01hcDtcbiAgICAgICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG4gICAgICAgIEZsYXNoY2FyZENhcmRFbGVtcy53aWRnZXRjb3VudCsrO1xuXG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcC5mb3JFYWNoKCAocG9ydCkgPT4geyBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAgICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpXG4gICAgICAgICAgICBpbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGZsaXBmcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgZmxpcGJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBnYW1lQ2FyZFNwYW4uaW5uZXJUZXh0ID0gYFBvcnQjICR7bWFwSXRlci5uZXh0KCkudmFsdWV9YDtcbiAgICAgICAgICAgIGdhbWVDYXJkQmFja1NwYW4uaW5uZXJUZXh0ID0gYCR7cG9ydH1gO1xuXG4gICAgICAgICAgICB0aGlzLmZsYXNoY2FyZHNjb3VudCsrO1xuICAgICAgICAgICAgRmxhc2hjYXJkQ2FyZEVsZW1zLnRvdGFsZmxhc2hjYXJkcysrO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGl2IHRvIGZsYXNoY2FyZCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5tX2ZsYXNoY2FyZHNBcnIucHVzaChmbGFzaGNhcmQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgR3Jvd2luZ0NhcmRFbGVtZW50IGV4dGVuZHMgSFRNTExJRWxlbWVudCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaXNHcm93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmdyb3dDYXJkKTtcbiAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LmNvdW50Kys7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaHJpbmtDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHsgLy9UT0RPOiBjaGVjayBjbGFzcyBwcm9wZXJ0eVxuICAgICAgICBpZiAobGkuc3R5bGUuc2NhbGUpIHtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnNldElzR3Jvd24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFkZUluYWN0aXZlQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChHcm93aW5nQ2FyZEVsZW1lbnQuZ2V0SXNBdExlYXN0T25lQmlnKCkpIHtcbiAgICAgICAgICAgIGlmICghbGkuZ2V0SXNHcm93bigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi4zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJc0F0TGVhc3RPbmVCaWcgPSAoKSA9PiB7XG4gICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgI3dlYklERUNhcmRzIGxpYCkpO1xuICAgICAgICBsZXQgYXRMZWFzdE9uZUlzQmlnID0gbGlzdExJcy5zb21lKChsaSkgPT4gbGkuZ2V0SXNHcm93bigpID09IHRydWUpO1xuICAgICAgICByZXR1cm4gYXRMZWFzdE9uZUlzQmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJc0dyb3duID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXNHcm93biA9ICh0cnVlZmFsc2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93biA9IHRydWVmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdyb3dDYXJkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0eWxlLnNjYWxlID0gXCIxLjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS56SW5kZXggPSBcIjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIHRoaXMuc2V0SXNHcm93bih0cnVlKTtcblxuICAgICAgICAvLyBHZXQgYWxsIHRoZSBsaXN0IGVsZW1lbnRzIHRvIHJlZmVyZW5jZSB3aGljaCBvbmUgdG8gZ3Jvd1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgICAgIGxldCBsaXN0TElzID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3R5bGUuc2NhbGUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFJXQkVycm9yLmNvdW50Kys7XG4gICAgfTtcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrRWxlbWVudG9yTnVsbChjb21wb25lbnRuYW1lOnN0cmluZywgY2xhc3NuYW1lOiBzdHJpbmcsIGxvZ21lc3NhZ2U/OmJvb2xlYW4sIHN1cHJlc3NleGNlcHRpb24/OmJvb2xlYW4gKSB7XG4gICAgICAgIGxldCBlbGVtOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoc3VwcmVzc2V4Y2VwdGlvbikgc3VwcmVzc2V4Y3B0ID0gdHJ1ZTtcblxuICAgICAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChgQ291bGQgbm90IGdldCBlbGVtZW50OiAke2NsYXNzbmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbSA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGVsZW1lbnQgZm91bmQgd2l0aCBjbGFzcyBuYW1lOiAke2NsYXNzbmFtZX0uYCwgJ2NvbG9yOiB5ZWxsb3c7Jyk7XG4gICAgICAgICAgICBpZiAoIXN1cHJlc3NleGNwdClcbiAgICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfU51bGxSZWZlcmVuY2VgLCBgRWxlbWVudCBub3QgZm91bmRgKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwgKGNvbXBvbmVudG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGNoZWNrZW1wdHlzdHJpbmc/OmJvb2xlYW4sIGxvZ21lc3NhZ2U/OmJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBpZiAoIWxvZ21lc3NhZ2UpIGxvZ21zc2cgPSBsb2dtZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50bmFtZX0uYCwgJ2NvbG9yOnB1cnBsZTsnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja2VtcHR5c3RyaW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiBSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KGNvbXBvbmVudG5hbWUsIGtleSwgbG9nbXNzZyk7XG4gICAgICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnRuYW1lOnN0cmluZywga2V5OnN0cmluZywgbG9nbWVzc2FnZT86Ym9vbGVhbil7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHRlc3Q6IHN0cmluZyB8IG51bGxcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChgQ291bGQgZ2V0IGxvY2FsIHN0b3JhZ2Uga2V5OiAke2tleX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdCA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2Uga2V5IG5vdCBmb3VuZDogJHtrZXl9LmAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfVJlZmVyZW5jZUV4Y2VwdGlvbmAsIGBLZXkgbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QgPT0gXCJcIiB8fCB0ZXN0ID09XCJbXVwiKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudG5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYFZhbHVlIGlzIGVtcHR5YCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBjbGFzcyBSV0JSZWZlcmVuY2VFcnJvciBleHRlbmRzIFJlZmVyZW5jZUVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWZlcnJvcjogUmVmZXJlbmNlRXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IG5ldyBSZWZlcmVuY2VFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBSV0JSZWZlcmVuY2VFcnJvci5jb3VudCsrO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmZXJyb3IpO1xuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBSV0JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWZlcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBSV0JTeW50YXhFcnJvci5jb3VudCsrO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmZXJyb3IpO1xuICAgIH07XG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgY2xhc3MgUldCRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkb21leGNlcHRpb246IERPTUV4Y2VwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB0aGlzLmRvbWV4Y2VwdGlvbiA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICAgICAgUldCRG9tRXhjZXB0aW9uLmNvdW50Kys7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kb21leGNlcHRpb24pO1xuICAgIH07XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBIVE1MIGxpbmsgZWxlbWVudCBkYXRhLiBVc2VkIHdpdGggYW5jaG9yIHRhZ3MuXG4gKi9cbmNsYXNzIFJXQkxpbmsge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICAvKipIVE1MIHRpdGxlIGF0dHJpYnV0ZSAqL1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIC8qKklubmVyIHRleHQgc3RyaW5nICovXG4gICAgcHVibGljIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIC8qKlRoZSBwYWdlIHRoZSBsaW5rIGlzIGFzc29jaWF0ZWQgdG8gKi9cbiAgICBwdWJsaWMgcGFnZU5hbWU6IHN0cmluZztcbiAgICAvKipIVE1MIGhyZWYgYXR0cmlidXRlICovXG4gICAgcHVibGljIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIGlubmVyVGV4dDogc3RyaW5nLCBwYWdlTmFtZTogc3RyaW5nLCBoUmVmZXJlbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGlubmVyVGV4dCxcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lLFxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlLFxuICAgICAgICBSV0JMaW5rLmNvdW50Kys7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSV0JMaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBSV0JTeW50YXhFcnJvciB9IGZyb20gJy4vUldCRXJyb3JCdXMnXG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gcGFyc2VzIGpzb24gYW5kIHN0b3JlcyB0aGUgcGFyc2VkIHN0cmluZy4gICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JQYXJzZUpTT04ge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHBhcnNlc3RyOiBzdHJpbmc7XG4gICAgcHVibGljIHJldHVybnN0cjogc3RyaW5nO1xuICAgIHB1YmxpYyBwYXNzZWQ6IGJvb2xlYW47XG4gICAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgICAqIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcnNlc3RyOnN0cmluZyl7XG4gICAgICAgIFJXQlBhcnNlSlNPTi5jb3VudCsrO1xuICAgICAgICB0aGlzLnBhcnNlc3RyID0gcGFyc2VzdHI7XG4gICAgICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBwYXJzZUpTT04gKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnJldHVybnN0ciA9IEpTT04ucGFyc2UodGhpcy5wYXJzZXN0cik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuc3RyID0gdGhpcy5wYXJzZXN0cjtcbiAgICAgICAgICAgIG5ldyBSV0JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi9XZWJCaXRcIjtcbmltcG9ydCBSV0JDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL1JXQkNhcmRcIjtcblxuZXhwb3J0IGNsYXNzIFJhbmRvbVdlYkJpdHMge1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oc2VjdGlvblRpdGxlOiBzdHJpbmcsIHNlY3Rpb25IZWFkaW5nSUQ6IHN0cmluZykge1xuICAgICAgICAvLyBDcmVhdGUgZGl2aXNvciBzZWN0aW9uYWwgZWxlbWVudHMgdG8gYXBwZW5kIHRvIG1haW5cbiAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwgJiYgcGFnZU1haW4ubm9kZU5hbWUgPT09ICdNQUlOJykge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNhcmQgc2VjdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjYXJkc1wiPlxuICAgICAgICAgICAgLy8gICAgIDxoMj5BcmJpdHJhcnkgQXJ0aWNsZXM6PC9oMj5cbiAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9jb2x1bW5zXCI+XG5cbiAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgIC8vIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCBBQVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgICAgICAgIGxldCBhYUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgbGV0IGFhQ2FyZHNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFIZWFkaW5nKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUNhcmRzU2VjdGlvbik7XG4gICAgICAgICAgICBwYWdlTWFpbi5hcHBlbmQoQUFTZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gQWRkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICBBQVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImNhcmRzXCIpO1xuICAgICAgICAgICAgYWFDYXJkc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY2FyZF9jb2x1bW5zJyk7XG4gICAgICAgICAgICBhYUhlYWRpbmcuaW5uZXJUZXh0ID0gYCR7c2VjdGlvblRpdGxlfWA7XG4gICAgICAgICAgICBhYUhlYWRpbmcuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VjdGlvbkhlYWRpbmdJRCk7XG5cbiAgICAgICAgICAgIHJldHVybiBhYUNhcmRzU2VjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWFpbiBlbGVtZW50IGV4aXN0cyBvbiB0aGUgcGFnZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkUldCQ2FyZHMoY2FyZHNEYXRhOiBXZWJCaXRbXSkge1xuICAgICAgICAvLyBJdGVyYXRlIGVhY2ggY2FyZCBpbiB0aGUgYXJyYXkuIEJ1aWxkIHRoZSBjYXJkIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgbGV0IEFBcyA9IGNhcmRzRGF0YS5tYXAoKGFydGljbGU6IFdlYkJpdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcndiY2FyZCA9IG5ldyBSV0JDYXJkKCk7XG4gICAgICAgICAgICByZXR1cm4gcndiY2FyZC5idWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZSk7O1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gQUFzO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW50ZXJmYWNlIFNjcmlwdFJ1bnRpbWUge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzdGFydE1hcms6IFBlcmZvcm1hbmNlTWFyayxcbiAgICBlbmRNYXJrOiBQZXJmb3JtYW5jZU1hcmssXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHBlcmZvcm1hbmNlIHN0YXJ0IGFuZCBlbmQgbWFya3MuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JQZXJmIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzY3JpcHRydW50aW1lbWFya3M6IFNjcmlwdFJ1bnRpbWUgPSB7XG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIHN0YXJ0TWFyazogbnVsbCxcbiAgICAgICAgZW5kTWFyazogbnVsbFxuICAgIH07XG5cbiAgICAvKiogSW5zdGFudGlhdGluZyBhIFNjcmlwdFBlcmYgcmVjb3JkcyB0aGUgcGVyZm9ybWFuY2Ugc3RhcnQgbWFyay4gQ2FsbCBTcmlwdFBlcmYuZW5kKClcbiAgICAgKiB0byBzZXQgdGhlIGVuZCB0aW1lIHN0YW1wLlxuICAgICovXG4gICAgY29uc3RydWN0b3IoIHNjcmlwdG5hbWU6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUgPSBzY3JpcHRuYW1lO1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5zdGFydE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LXN0YXJ0YCk7XG4gICAgICAgIFJXQlBlcmYuY291bnQrKztcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5kKCl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLmVuZE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LWVuZGApO1xuICAgICAgICB0aGlzLm1lYXN1cmUoKTtcbiAgICB9XG5cbiAgICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICAgIHByaXZhdGUgbWVhc3VyZSgpe1xuICAgICAgICBsZXQgbWVhc3VyZSA9IHBlcmZvcm1hbmNlLm1lYXN1cmUoIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUsIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLnN0YXJ0TWFyay5uYW1lLCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5lbmRNYXJrLm5hbWUpXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCBSV0JQYXJzZUpTT04gZnJvbSBcIi4vUldCUGFyc2VyXCI7XG5pbXBvcnQgUldCRXJyb3IgZnJvbSBcIi4vUldCRXJyb3JCdXNcIjtcblxuLyoqXG4gKiBBIFRvRG9MaXN0IGlzIGFuIEhUTUwgd2lkZ2V0IHRvIHN0b3JlIFRvLURvcyBpbiB0aGUgYnJvd3Nlci4gSW5zdGFudGlhdGUgdGhlXG4gKiAgVG9Eb0xpc3QgY29uc3RydWN0b3IgdG8gY3JlYXRlIHdpZGdldCBtYXJrdXAgYW5kIGZ1bmN0aW9uYWxpdHkuIFRvLURvcyBhcmVcbiAqICBzdG9yZWQgaW4gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGFuZCByZWFkIGFuZCByZW5kZXJlZCB3aGVuIHRoZSBwYWdlIGxvYWRzLlxuICogXG4gKiBUbyBjcmVhdGUgYSBUb0RvTGlzdCwgYW4gZWxlbWVudCBvbiB0aGUgcGFnZSBtdXN0IGhhdmUgJy5Ub0RvTGlzdCcgY2xhc3MuIENhbGwgdGhlXG4gKiAgY2xhc3MgY29uc3RydWN0b3IsIHBhc3NpbmcgaW4gdGhhdCBlbGVtZW50IHRvIGNyZWF0ZSB0aGUgd2lkZ2V0LlxuICpcbiAqICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcbiAqICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gKiBcbiAqIFRoZW4sIHRoZSB3aWRnZXQgaXMgY3JlYXRlZCBhbmQgVG8tRG9zIGFyZSByZXRyaWV2ZWQgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgVG9Eb0xpc3Qge1xuICAgIC8qKlRvdGFsIG51bWJlciBvZiBUb0RPcyovXG4gICAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgICAvKipXaWRnZXQgZWxlbWVudHMgdXNlZCB0byBwb3B1bGF0ZSB0b2RvcyAqL1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvSW5TdG9yYWdlOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXTtcbiAgICAvKipUb2RvIEhUTUwgZWxlbWVudHMgKi9cbiAgICBwcml2YXRlIGxpc3RFbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAgICogXG4gICAgICogICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHNcbiAgICAgKiBAcGFyYW0gVG9Eb0VsZW1lbnRzIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9Eb0xpc3RFbGVtZW50cyhUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMpIHtcbiAgICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJhbmRvbSBXZWIgQml0cyB1c2VzIG11bHRpcGxlIGxvY2F0aW9ucyB0byBhcHBseSB0aGUgVG8tRG8gTGlzdCB3aWRnZXQuIENyZWF0ZVxuICAgICAqICB0aGUgbGlzdCBtYXJrdXAsIHBhc3NpbmcgaW4gYSByZWZlcmVuY2UgZWxlbWVudCBmb3IgcGxhY2VtZW50IG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgLy9JbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgICAgIC8vU3dpdGNoIGFnYWluc3QgdGhlIGN1cnJlbnQgcGFnZSB0byBkZXRlcm1pbmUgbWFya3VwIG5lZWRlZFxuICAgICAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiVG9Eb0xpc3RcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCwgXCJjb2xvcjpvcmFuZ2U7XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy8nOlxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJy9kaXN0L2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgIC8vTWFya3VwIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb2xpc3RTZWN0aW9uID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgICAgICAgICB0b2RvbGlzdFNlY3Rpb24uaWQgPSBcIlRvRE9cIjtcbiAgICAgICAgICAgICAgICB0aGxlZnQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlP1wiO1xuICAgICAgICAgICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICB0ZDNJTi5pZCA9IFwiQWRkQnV0dG9uXCI7XG4gICAgICAgICAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIChpdCBpcyBub3Qgc3RvcmVkIGluIGNhY2hlKVxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8odGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgLy9NYXJrdXAgZXhpc3RzIG9uIHRoZSBwYWdlIGFscmVhZHlcbiAgICAgICAgICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSBkdWUgdG8gY2FjaGUgZW1wdHlcbiAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlQm9keTtcbiAgICAgICAgICAgICAgICBpZiAoaHRib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19EbyhodGJvZHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIC8vR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldFxuICAgICAgICAvL0VhY2ggd2lkZ2V0IGxvY2F0aW9uJ3MgZWxlbWVudHMgbWF5IHZhcnksIHNvIGEgY2FsbCBvZiBnZXRUb0RvTGlzdEVsZW1lbnRzKClcbiAgICAgICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICAgICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRhYmxlJyksXG4gICAgICAgICAgICB0b2RvVGFibGVCb2R5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyksXG4gICAgICAgICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0RWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIG9yIGZhbHNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VG9Eb0luU3RvcmFnZShjaGVja2VtcHR5dmFsdWVzdHJpbmc6Ym9vbGVhbiwgbG9nbWVzc2FnZTpib29sZWFuKSB7XG4gICAgICAgIGlmIChSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIlRvRG9MaXN0XCIsIFwiVG9Eb3NcIiwgY2hlY2tlbXB0eXZhbHVlc3RyaW5nLCBsb2dtZXNzYWdlKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcnNlc3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04ocGFyc2VzdHIpKTtcbiAgICAgICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKXtcbiAgICAgICAgICAgIC8vcGFyc2VkIEpTT04gaXMgbWFsZm9ybWVkXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5Ub0RvSW5TdG9yYWdlID0gcGFyc2V0ZXN0LnJldHVybnN0clxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBUby1EbyB0byBMb2NhbCBTdG9yYWdlLiBcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBUaGUgVUkgZm9ybSBpbnB1dCBkZXNjcmlwdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgICAgICAvL0FkZCB0aGUgVG9Eb3MgYXJyYXkgdG8gbG9jYWwgY2FjaGUuXG4gICAgICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V0b2RvY2FjaGUnIGludGVyZmFjZSBzdHJ1Y3R1cmVzIHRoZSBkYXRhIGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgVG9Eb3M6IGFueSA9IFtdOyAvL1RvRG8gYXJyYXlcbiAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcbiAgICAgICAgXG4gICAgICAgIC8vRmlyc3QsIHJlYWQgY3VycmVudCBMb2NhbCBTdG9yYWdlIFRvRG9zXG4gICAgICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKVxuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHsvL05vdGhpbmcgaW4gc3RvcmFnZSwgcHVzaCBjdXJyZW50XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeShUb0RvcykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gY2FjaGUga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Ly9BZGQgdGhlIG5ldyBUb0RvIHRvIHRoZSBjdXJyZW50IFRvRG9zIGFuZCBwdXNoIHZpYSBzZXRJdGVtKClcbiAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNBZGRlZCB0by1kbyBjYWNoZTogJHtkZXNjcmlwdGlvbn1gLCAnY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuOycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHRvZG8gY2FjaGU6ICR7aXRlbX1gLCAnY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Jyk7XG4gICAgICAgIGxldCBqc29uc3RyID0gSlNPTi5zdHJpbmdpZnkoVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZSlcbiAgICAgICAgaWYgKGpzb25zdHIgPT0gXCJcIiB8fCBqc29uc3RyID09IFwiW11cIil7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBqc29uc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgdG8gYWRkIGEgcm93IHRvIHRoZSBUby1EbyB0YWJsZS5cbiAgICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIGZpcnN0UGFpbnQgLSBCb29sZWFuIHZhbHVlIHVzZWQgYnkgYWRkaW5nIGxpc3Qgc3RvcmFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IFRBQkxFSVRFTSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgZmlyc3QgZGF0YVxuICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSB0aGlyZCBkYXRhXG4gICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvTGlzdC5Ub0RPcyA/ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9MaXN0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG5cbiAgICAgICAgLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgdGhlIFRvLURvIGl0ZW0gcm93cyBmcm9tIFRvLURvcyBzdG9yZWQgaW4gdGhlIGJyb3dzZXIgTG9jYWwgU3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgICAgIGlmIChUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYnV0dG9uIGZ1bmN0aW9uYWxpdHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRCdXR0b247XG4gICAgICAgIGNvbnN0IEFERElURU1FTlRFUiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRJdGVtVG9FbnRlcjtcbiAgICAgICAgaWYgKEFEREJVVFRPTiA9PSBudWxsICYmIEFERElURU1FTlRFUiA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvKipBZGQgaW5wdXQgdGV4dCB0byB0aGUgdG9kbyBsaXN0IGZyb20gY2xpY2tpbmcgdGhlIGFkZCBidXR0b24qL1xuICAgICAgICBBRERCVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICAvKipBZGQgaW5wdXQgdGV4dCB0byB0aGUgdG9kbyBsaXN0IHdoZW4gdXNpbmcga2V5IGVudGVyKi9cbiAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZS5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAgICogIG5vdCByZW1vdmVkIGZyb20gc3RvcmFnZSB3aXRob3V0ICdDb21wbGV0ZT8nIGNoZWNrZWJveCBjaGVja2VkLlxuICAgICAqIEBwYXJhbSBib3ggaW5wdXQgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgRGVsZXRlQnV0dG9uKGJveDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgPT0gbnVsbCB8fCBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCB8fFxuICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhIHRhYmxlIGVsZW1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PmJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIC8qKiBJbnB1dCBlbGVtZW50ICovXG4gICAgICAgIGNvbnN0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdOyBcbiAgICAgICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgY29uc3QgdHI6IEhUTUxUYWJsZVJvd0VsZW1lbnQgPSA8SFRNTFRhYmxlUm93RWxlbWVudD5ib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgICAgICAgLy9yZW1vdmUgcm93IHNpbmNlIGNvbXBsZXRlZFxuICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gJ0FkZCBhIFRvRE8gSXRlbS4nKSB7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcblxuICAgICAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZW1vdmVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gc2VlZCB0aGUgVG8tRG8gTGlzdCB3aGVuIHRoZXJlIGFyZSBubyBMb2NhbCBTdG9yYWdlIGl0ZW1zXG4gICAgICogIHdoaWNoIHdvdWxkIHBvcHVsYXRlIHRoZSBsaXN0LiBUaGUgc2FtcGxlIHJlbWFpbnMgb24gcGFnZSBidXQgaXMgbmV2ZXIgc3RvcmVkIGluIHRoZSBicm93c2VyLlxuICAgICAqIEBwYXJhbSB0Ym9keSB0YWJsZSBib2R5IGVsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5OiBFbGVtZW50KSB7XG4gICAgICAgIGlmKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIHRydWUpKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgZW50cnkgaW4gdGhlIFRvRG8gdGFibGUgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgY29uc3QgdGQybGVmdCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgIGNvbnN0IHRkMnJpZ2h0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmVzZXRcIik7XG4gICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgdGQybWlkZGxlLnRleHRDb250ZW50ID0gXCJBZGQgYSBUb0RPIEl0ZW0uXCI7XG4gICAgICAgIFRvRG9MaXN0LlRvRE9zKys7XG5cbiAgICAgICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcbiAgICAgICAgICAgIHRoaXMuRGVsZXRlQnV0dG9uKHRkMkRFTCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmVtb3ZlZCB0b2RvOiAke3RkMkRFTC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOnB1cnBsZTtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpwdXJwbGU7Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi9BdHRyaWJ1dGlvbkxpbmtcIjtcbi8qKlxuICogVGhpcyBjbGFzcyBob2xkcyB0aGUgZGF0YSBmb3IgJ1dlYkJpdCcgYXJ0aWNsZSBjYXJkcy4gS2V5IGluZm9ybWF0aW9uXG4gKiBvZiB0aGUgYXJ0aWNsZSdzIGNvbnRlbnRzIGFyZSBjb250YWluZWQ6IG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRhIGNyZWF0ZWQsXG4gKiBldGMuXG4gKi9cbmNsYXNzIFdlYkJpdCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwdWJsaWMgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gICAgcHVibGljIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gICAgcHVibGljIGNhcmRJbWFnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGlua0F0dHJpYnV0aW9uOiBBdHRyaWJ1dGlvbkxpbms7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlQUxUOiBzdHJpbmcsXG4gICAgICAgIGxpbmtBdHRyaWJ1dGlvbj86IEF0dHJpYnV0aW9uTGluayxcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFQ7XG4gICAgICAgIHRoaXMubGlua0F0dHJpYnV0aW9uID0gbGlua0F0dHJpYnV0aW9uO1xuICAgICAgICBXZWJCaXQuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkJpdDtcbiJdfQ==

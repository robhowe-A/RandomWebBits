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

},{"../models/RWBLink":32}],20:[function(require,module,exports){
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
                                    if (clonedresp.status != 404) {
                                        cache.put(GETURL, result);
                                    }
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

},{"./RWBLink":32}],24:[function(require,module,exports){
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
const RWBJSONConverter_1 = require("./RWBJSONConverter");
const RWBJSONConverter_2 = require("./RWBJSONConverter");
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
        let parsetest = Object.create(new RWBJSONConverter_1.RWBParseJSON(storageStr));
        if (!parsetest.passed) {
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, 'color:orange;font-size:14px;font-weight:bold;', 'color:orange;font-size:16px;');
            this.getLocalStorageWordCaches();
            return;
        }
        return parsetest.returnobj;
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
        //Log the word cache creation
        const addedwordcache = () => {
            console.log(`%c<RWB>%cAdded word cache: ${localstoragevalue.word}`, 'color:cyan;font-weight:bold;', 'color:cyan;');
        };
        //The 'localstoragevalue' needs added to local storage cache
        //Local storage may be empty or already having the wanted searched word
        //Check storage is not null. If it is, add the word.
        if (DictionarySearchWidget.wordStorage == null) {
            if (RWBErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", false, false)) {
                //Add the storage word to an array
                let wordStore = [];
                wordStore.push(localstoragevalue);
                let jsonstr = "";
                //Call RWBStringifyJSON to stringify the object
                let stringifytestsingleword = Object.create(new RWBJSONConverter_2.RWBStringifyJSON(wordStore));
                if (!stringifytestsingleword.passed) {
                    //stringify object did not work, so return
                    //LOGLEAF
                    return;
                }
                jsonstr = stringifytestsingleword.returnstr;
                // Local storage is empty => add the word
                localStorage.setItem("word-caches", jsonstr);
                console.log(`%c<RWB>%cCreated storage key: word-caches`, 'color:cyan;font-size:16px;font-weight:bold;', 'color:cyan;font-size:16px;');
                addedwordcache();
                return;
            }
            //LOGLEAF
            return;
        }
        //Local storage is not empty. Here, we need to add the word to the existing word cache.
        let allcache = DictionarySearchWidget.wordStorage;
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
        let stringifytestdoubleword = Object.create(new RWBJSONConverter_2.RWBStringifyJSON(allcache));
        if (!stringifytestdoubleword.passed) {
            //stringify object did not work, so return
            //LOGLEAF
            return;
        }
        jsonstr = stringifytestdoubleword.returnstr;
        localStorage.setItem("word-caches", jsonstr);
        addedwordcache();
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
            //LOGLEAF
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
        //Call RWBStringifyJSON to stringify the object
        let wordcachesstrfytest = Object.create(new RWBJSONConverter_2.RWBStringifyJSON(allcache));
        if (!wordcachesstrfytest.passed) {
            //LOGLEAF
            return;
        }
        //Return remaining words to Local Storage
        localStorage.setItem("word-caches", JSON.stringify(wordcachesstrfytest.returnstr));
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
                let parsetest = Object.create(new RWBJSONConverter_1.RWBParseJSON(data));
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
                if (!navigator.onLine) { //Online, problem with fetch
                    //Offline request
                    searchElems.errorElem.innerText += ", check network connection.";
                    return;
                }
                if (noDefinitions) { //Server returned no definitions data
                    if (wordData.title == "No Definitions Found")
                        searchElems.errorElem.innerText = "No Definitions Found";
                    return data;
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
            if (data == undefined || Object.hasOwn(data, 'title'))
                return;
            console.log(`%c<RWB>%cRetrieved word: ${word}`, 'color:gold;font-weight:bold;', 'color:gold;');
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

},{"../models/API":22,"./DictionarySearchMarkup":26,"./RWBErrorBus":30,"./RWBJSONConverter":31}],26:[function(require,module,exports){
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
        if (wordData == null || !(wordData instanceof Object) || Object.hasOwn(wordData, 'title')) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RWBStringifyJSON = exports.RWBParseJSON = void 0;
//--Copyright (c) 2023 Robert A. Howell
const RWBErrorBus_1 = require("./RWBErrorBus");
/** An RWBParseJSON parses json and stores the parsed string.  */
class RWBParseJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    parsestr;
    returnobj;
    passed;
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
            new RWBErrorBus_1.RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
}
exports.RWBParseJSON = RWBParseJSON;
/** An RWBParseJSON parses json and stores the parsed string.  */
class RWBStringifyJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    json;
    returnstr;
    passed;
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
            new RWBErrorBus_1.RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
}
exports.RWBStringifyJSON = RWBStringifyJSON;

},{"./RWBErrorBus":30}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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
const RWBJSONConverter_1 = require("./RWBJSONConverter");
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
        let parsetest = Object.create(new RWBJSONConverter_1.RWBParseJSON(parsestr));
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

},{"./RWBErrorBus":30,"./RWBJSONConverter":31}],36:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zLnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZXVybC50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2NvbXBvbmVudHMvZG9tYWlubG9va3VwLnRzIiwic3JjL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwLnRzIiwic3JjL2NvbXBvbmVudHMvc2xpZGVyYmFyLnRzIiwic3JjL2RhdGEvZGF0YS50cyIsInNyYy9kYXRhL25hdml0ZW1zLnRzIiwic3JjL2RhdGEvcG9ydG51bXMudHMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2RlbHMvQVBJLnRzIiwic3JjL21vZGVscy9BdHRyaWJ1dGlvbkxpbmsudHMiLCJzcmMvbW9kZWxzL0NvbG9yQ29kZS50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaC50cyIsInNyYy9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaE1hcmt1cC50cyIsInNyYy9tb2RlbHMvRXhwYW5kaW5nTGlzdC50cyIsInNyYy9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zLnRzIiwic3JjL21vZGVscy9Hcm93aW5nQ2FyZC50cyIsInNyYy9tb2RlbHMvUldCRXJyb3JCdXMudHMiLCJzcmMvbW9kZWxzL1JXQkpTT05Db252ZXJ0ZXIudHMiLCJzcmMvbW9kZWxzL1JXQkxpbmsudHMiLCJzcmMvbW9kZWxzL1JhbmRvbVdlYkJpdHMudHMiLCJzcmMvbW9kZWxzL1NjcmlwdFBlcmYudHMiLCJzcmMvbW9kZWxzL1RvRG8udHMiLCJzcmMvbW9kZWxzL1dlYkJpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsdUNBQXVDO0FBQ3ZDLG1DQUFrQztBQUNsQyx5REFBa0Q7QUFDbEQscURBQTJDO0FBQzNDLHVEQUE0QztBQUU1QyxNQUFNLGVBQWUsR0FBRztJQUNwQixjQUFjLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksb0JBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBRTdFLElBQUkscUJBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUMxRiwwQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7SUFDOUMsQ0FBQztJQUNELFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFFWCw4REFBOEQ7UUFDOUQsSUFBSSxxQkFBUSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNsRixlQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkIsQ0FBQztDQUNKLENBQUE7QUFDRCxrQkFBZSxlQUFlLENBQUM7Ozs7O0FDdkIvQix1Q0FBdUM7QUFDdkMsaUVBQW1FO0FBRW5FOztHQUVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQjs7OztPQUlHO0lBQ0gsSUFBSSxF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QixDQUFDLFdBQVcsRUFBRSxFQUMzRixnQ0FBZ0MsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBeFZMLDRCQXlWQzs7Ozs7QUMxV0Q7Ozs7R0FJRztBQUNILE1BQU0sTUFBTTtJQUNSLCtDQUErQztJQUN4QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN6QixFQUFFLENBQVM7SUFDWCxhQUFhLENBQVM7SUFDdEIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBTztJQUNsQixXQUFXLENBQVM7SUFDcEIsU0FBUyxDQUFTO0lBQ2xCLFlBQVksQ0FBUztJQUNyQixlQUFlLENBQWtCO0lBRXhDLFlBQ0ksRUFBVSxFQUNWLGFBQXFCLEVBQ3JCLElBQVksRUFDWixXQUFtQixFQUNuQixXQUFpQixFQUNqQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixZQUFvQixFQUNwQixlQUFpQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDOztBQUdMLGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFRvRG9zV2lkZ2V0IGZyb20gJy4vVG9Eb3MnO1xuaW1wb3J0IERpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9EaWN0aW9uYXJ5V2lkZ2V0JztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBSV0JFcnJvciBmcm9tICcuLi9tb2RlbHMvUldCRXJyb3JCdXMnXG5cbmNvbnN0IENsYXNzQ29tcG9uZW50cyA9IHtcbiAgICBpbml0RGljdGlvbmFyeTogKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc3BlcmYgPSBuZXcgUldCUGVyZihcIkNsYXNzY29tcG9uZW50c1wiKTsgLy9iZWdpbiBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAgICAgaWYgKFJXQkVycm9yLmNoZWNrRWxlbWVudG9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiZGljdGlvbmFyeVdpZGdldFwiLCB0cnVlLCB0cnVlKSkgcmV0dXJuO1xuICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LmluaXQoKTtcblxuICAgICAgICBjbGFzc3BlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9LFxuICAgIGluaXRUb0RvOiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBpZiAoUldCRXJyb3IuY2hlY2tFbGVtZW50b3JOdWxsKFwiQ2xhc3NDb21wb25lbnRcIiwgXCJUb0RvTGlzdFwiLCB0cnVlLCB0cnVlKSkgcmV0dXJuO1xuICAgICAgICBUb0Rvc1dpZGdldC5pbml0KCk7XG4gICAgICAgIFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENsYXNzQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFdpZGdldCB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaFwiXG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IERpY3Rpb25hcnlXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBjcmVhdGVzIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IGJ5IGNhbGxpbmcgdGhlXG4gICAgICogIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgbGV0IGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQ6IEVsZW1lbnRcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNDb3VsZCBub3QgcXVlcnkgZGljdGlvbmFyeSB3aWRnZXQgZWxlbWVudC5cIiwgXCJjb2xvcjpvcmFuZ2U7XCIpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEaWN0aW9uYXJ5U2VhcmNoIGNvbnN0cnVjdG9yXG4gICAgICAgIE9iamVjdC5jcmVhdGUobmV3IERpY3Rpb25hcnlTZWFyY2hXaWRnZXQoZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCkpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEV4cGFuZGluZ0xpc3RFbGVtZW50IH0gZnJvbSBcIi4uL21vZGVscy9FeHBhbmRpbmdMaXN0XCI7XG5cbmNvbnN0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBEZWZpbmUgdGhlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQsIGZvciB1c2Ugd2l0aGluIHRoZSBwYWdlXG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZXhwYW5kaW5nLWxpc3QnLCBFeHBhbmRpbmdMaXN0RWxlbWVudCwgeyBleHRlbmRzOiAndWwnIH0pO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50IHByb3BlcnRpZXNcbiAgICAgICAgLy8gXCJET01cIiBwYWdlIHNwZWNpZmljIHByb3BlcnRpZXNcbiAgICAgICAgLy8gQWRkIGEgdGl0bGUgYXR0cmlidXRlIHRvIGFsbCBsaS1zcGFuIHRoYXQgY2FuIGV4cGFuZCBmdXJ0aGVyXG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaU9wZW5PcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOmZpcnN0LWNoaWxkYCk7XG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaUNsb3NlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpudGgtY2hpbGQoMylgKTtcblxuICAgICAgICAvLyBTZXQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzIGZvciBleHBhbmRpbmctZWxlbWVudCBleHBhbmRhYmxlIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpT3Blbk9wZW4pIHtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlICdET00nIGl0ZW1zIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyAtLS0+d2hlbiBjbGlja2VkLCBjaGFuZ2UgdGhlIHRpdGxlIHByb3BlcnR5IHRvIHJlZmxlY3Qgb3BlbiBvciBjbG9zZWQgc3RhdHVzXG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3Bhbi5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgPT0gJ1NlbGVjdCB0byBleHBhbmQuLi4nXG4gICAgICAgICAgICAgICAgICAgID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gY2xvc2UuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gY2xvc2UuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICAgICAgOiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgcHJvcGVydHkgb2YgY2xvc2luZyBzcGFuIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgRmxhc2hjYXJkQ2FyZEVsZW1zIGZyb20gJy4uL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMnXG5pbXBvcnQgcG9ydGRlZmluaXRpb25zIGZyb20gJy4uL2RhdGEvcG9ydG51bXMnXG5cbmNvbnN0IGZsYXNoY2FyZGdhbWVXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gRXN0YWJsaXNoIHdoaWNoIHBvcnQgbnVtYmVycyB0byB0ZXN0IGFuZCB0aGUgZGVmaW5pdGlvblxuICAgICAgICAvLyBUT0RPOiBmdW5jdGlvbnMgZmxhc2hjYXJkc1xuICAgICAgICBjb25zdCBtZXRob2RkZWZpbml0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KFtcbiAgICAgICAgICAgIFtcImNoYXJBdCgpXCIsIFwiUmV0dXJucyBhIG5ldyBzdHJpbmcgb2YgdGhlIGNoYXJhY3RlciBhdCBhIGdpdmVuIGluZGV4LlwiXVxuICAgICAgICBdKTtcblxuXG4gICAgICAgIC8vIENyZWF0ZSBmbGFzaGNhcmQgZWxlbWVudHNcbiAgICAgICAgbGV0IG1haW5GbGFzaENhcmREaXZzID0gbmV3IEZsYXNoY2FyZENhcmRFbGVtcyhwb3J0ZGVmaW5pdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHRoZSBnYW1lJ3MgdGl0bGUgZWxlbWVudFxuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5GbGFzaENhcmRzXCIpO1xuICAgICAgICBjb25zdCBnYW1ldGl0bGVFbGVtID0gbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpKTtcbiAgICAgICAgZ2FtZXRpdGxlRWxlbS5pbm5lclRleHQgPSBcIkNvbXB1dGluZyBQb3J0IE51bWJlcnNcIlxuXG4gICAgICAgIC8vIEFkZCB0aGUgZmxhc2hjYXJkcyB0byB3aWRnZXRcbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBtYWluRmxhc2hDYXJkRGl2cy5tX2ZsYXNoY2FyZHNBcnIpe1xuICAgICAgICAgICAgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmbGFzaGNhcmRnYW1lV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBHcm93aW5nQ2FyZEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3dpbmdDYXJkXCJcblxuY29uc3QgQWN0aXZlQ2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dyb3dpbmctY2FyZCcsIEdyb3dpbmdDYXJkRWxlbWVudCwgeyBleHRlbmRzOiAnbGknIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgfHwgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRGV0YWlsc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGxpc3QgaXRlbXMgKGNhcmRzKVxuICAgICAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpKTtcblxuICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnQgdG8gcmVzaXplIHRoZSBjYXJkcyBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGEgY2FyZFxuICAgICAgICAgICAgLy8gV2hlbiBjbGlja2luZyBvdXRzaWRlIGEgY2FyZCwgcmVzaXplIGFsbCBjYXJkcyB0byBub3JtYWxcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wSXRlbTogR3Jvd2luZ0NhcmRFbGVtZW50ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCh0ZW1wSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXNoYWRlIGFsbCBjYXJkcyBiZWNhdXNlIG5vbmUgb2YgdGhlbSBhcmUgYmlnXG4gICAgICAgICAgICBmb3IgKGxldCBsaSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKGxpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlQ2FyZHNXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBOQVZJVEVNUyBmcm9tICcuLi9kYXRhL25hdml0ZW1zJ1xuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnO1xuXG4vKipcbiAqIFdpZGdldCB0byBhZGQgc2l0ZSBoZWFkZXIgYW5kIGZvb3Rlci4gSW5zdGFudGlhdGVkIGluICdNYWluJyBzY3JpcHQuXG4gKi9cbmNvbnN0IEhlYWRlckZvb3RlciA9IHtcbiAgICBoZWFkZXJXaWRnZXQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpdGUgaGVhZGVyIGNvbnRhaW5pbmcgbmF2aWdhdGlvbiBsaW5rcyBhbmQgc2l0ZSBsb2dvLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVycGVyZiA9IG5ldyBSV0JQZXJmKFwiSGVhZGVyXCIpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgcGFnZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICAvKiogSGVhZGVyIGVsZW1lbnQgY29udGFpbmVyICovXG4gICAgICAgICAgICBsZXQgc2l0ZUhlYWRlcjogRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgZWxlbWVudCB0byB0aGUgcGFnZVxuICAgICAgICAgICAgaWYgKHBhZ2VNYWluICE9IG51bGwpIHsvLyAnTWFpbicgZWxlbWVudCBleGlzdHMsIGFkZCB0aGUgaGVhZGVyIHRvIGl0XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IHBhZ2VNYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBzaXRlIGhlYWRlciBpcyBub3QgbnVsbCBiZWZvcmUgJ21haW4nIGVsZW1lbnQuYG5cIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vICdNYWluJyBlbGVtZW50IGRvZXMgbm90IGV4aXN0LCBhZGQgdGhlIGhlYWRlciB0byB0aGUgYm9keVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGFmdGVyICdib2R5JyBlbGVtZW50LmBuXCIsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9BcHBlbmQgbmF2aWdhdGlvbiBpdGVtcyB0byBoZWFkZXJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2l0ZUhlYWRlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGROYXZpZ2F0aW9uKCkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2Fubm90IHByZXBlbmQgbmF2aWdhdGlvbiBpdGVtcy5cIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGhlYWRlcnBlcmYuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgaGVhZGVyIHdpdGggc2l0ZSBsb2dvIGFwcGVuZGVkLlxuICAgICAgICAgKiBAcGFyYW0gbWFpbiBIVE1MICdtYWluJyBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm5zIFBvcHVsYXRlZCBoZWFkZXIgZWxlbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgYnVpbGRIZWFkZXI6ICgpID0+IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQmFzaWMgSFRNTCBoZWFkZXIgZWxlbWVudCBjb250YWluaW5nIGxvZ28gKEgxKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBzaXRlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgICAgICBjb25zdCBzaXRlSGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzaXRlSGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aWR0aC1tYXgtY2VudGVyXCIpO1xuICAgICAgICAgICAgY29uc3QgSDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSDFcIik7XG4gICAgICAgICAgICBIMS50ZXh0Q29udGVudCA9ICc8UmFuZG9tIFdlYiBCaXRzPic7XG4gICAgICAgICAgICBIMS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIlJhbmRvbVdlYkJpdHNcIik7XG4gICAgICAgICAgICBzaXRlSGVhZGVyQ29udGFpbmVyLmFwcGVuZChIMSk7XG4gICAgICAgICAgICBzaXRlSGVhZGVyLmFwcGVuZChzaXRlSGVhZGVyQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVIZWFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkTmF2aWdhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIGhlYWRlciBuYXZpZ2F0aW9uIGJhc2VkIG9uIG5hdmlnYXRpb24gZGF0YVxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5hdmlnYXRpb24gZWxlbWVudHNcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdkZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXYgPSBoZWFkZXJOYXZGcmFnXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpKTtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIG5hdiBkYXRhIHRvIG5hdiBlbGVtZW50c1xuICAgICAgICAgICAgTkFWSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdEl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgIG5hdkxpc3RJdGVtcy5wcmVwZW5kKG5hdkxpc3RMaW5rcyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyTmF2LmFwcGVuZChuYXZMaXN0SXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIG5hdmlnYXRpb24gYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnRleHRDb250ZW50ID0gYCR7aXRlbS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgICAgICAvLyBFbnZpcm9ubWVudCBsaW5rcyBlZGl0LCByZXF1aXJpbmcgZGlmZmVyZW50IGxpbmsgcmVsYXRpdmVzIHRvIG9wZXJhdGVcbiAgICAgICAgICAgICAgICAvLyBHaXRodWIgcGFnZXMgb3BlcmF0ZXMgZnJvbSByZXBvc2l0b3J5LCBub3QgJy8nXG4gICAgICAgICAgICAgICAgLy9pZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT0gJ3JvYmhvd2UtYS5naXRodWIuaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGVkaXQgZm9yIGRldiBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgICAgICAvL25hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgL1JhbmRvbVdlYkJpdHMvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2xpbmsgZGF0YSBpbiBvdGhlciBlbnZpcm9ubWVudHNcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvJHtpdGVtLmhSZWZlcmVuY2V9YCk7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGl0ZW0udGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJOYXZGcmFnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvb3RlcldpZGdldDoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJwZXJmID0gbmV3IFJXQlBlcmYoXCJGb290ZXJcIik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBmb290ZXIgZWxlbWVudCB0byB0aGUgcGFnZSBlbmRcbiAgICAgICAgICAgIGxldCBmb290ZXI6IEhUTUxFbGVtZW50ID0gSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZvb3RlcigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZm9vdGVyKTtcbiAgICAgICAgICAgIGZvb3Rlci5jaGlsZE5vZGVzWzBdLmFwcGVuZENoaWxkKEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGYXZpY29uQXR0cmlidXRpb24oZm9vdGVyKSk7XG5cbiAgICAgICAgICAgIGZvb3RlcnBlcmYuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjItMjAyMyBSYW5kb20gV2ViIEJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcblxuICAgICAgICAgICAgc2l0ZUZvb3RlckNvbnRhaW5lci5hcHBlbmQoZm9vdGVyUGFyYSk7XG4gICAgICAgICAgICBzaXRlRm9vdGVyLmFwcGVuZChzaXRlRm9vdGVyQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiSWNvbkhvbWU6ICM0NTAyNjc1NVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChmb290ZXJJY29uUGFyYSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyRm9vdGVyO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgRXhwYW5kaW5nTGlzdERPTVdpZGdldCBmcm9tICcuL0V4cGFuZGluZ0xpc3RET01XaWRnZXQnO1xuaW1wb3J0IEFjdGl2ZUNhcmRzV2lkZ2V0IGZyb20gJy4vR3Jvd2luZ0NhcmQnO1xuaW1wb3J0IGZsYXNoY2FyZGdhbWVXaWRnZXQgZnJvbSAnLi9GbGFzaGNhcmRHYW1lV2lkZ2V0JztcbmltcG9ydCBzbGlkZXNob3dXaWRnZXQgZnJvbSAnLi9TbGlkZVNob3dXaWRnZXQnO1xuaW1wb3J0IGNzc2V4IGZyb20gJy4vY3NzZXgnO1xuaW1wb3J0IGh0bWxleENvbG9yQ29kZSBmcm9tICcuL2NvbG9yY29kZSc7XG5pbXBvcnQgUldCQ2FyZHNXaWRnZXQgZnJvbSAnLi9XZWJCaXRzJztcbmltcG9ydCB1cmxleENvbG9yQ29kZSBmcm9tICcuL2NvbG9yY29kZXVybCc7XG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5pbXBvcnQgZG9tYWlubG9va3VwIGZyb20gJy4vZG9tYWlubG9va3VwJztcbmltcG9ydCBzbGlkZXJiYXIgZnJvbSAnLi9zbGlkZXJiYXInO1xuXG5jb25zdCBQYWdlQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2VwZXJmID0gbmV3IFJXQlBlcmYoXCJQYWdlY29tcG9uZW50c1wiKTsgLy9tZWFzdXJlIHBlcmZvcm1hbmNlXG5cbiAgICAgICAgUGFnZUNvbXBvbmVudHMuQ2hlY2tQYWdlKCk7XG4gICAgICAgIHBhZ2VwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfSxcbiAgICBDaGVja1BhZ2U6ICgpID0+IHtcbiAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgIC8vJ0luZGV4JyBhbmQgJ1BhZ2VzJyByb3V0ZXMsIGFkZCBjYXJkcyB3aWRnZXRcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMuaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMuaHRtbCc6XG4gICAgICAgICAgICAgICAgUldCQ2FyZHNXaWRnZXQuaW5pdCgpOyAvLyBjYXJkcyB3aWRnZXQgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2RvbS5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9zdmcuaHRtbCc6XG4gICAgICAgICAgICAgICAgRXhwYW5kaW5nTGlzdERPTVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdlYklERSB3aWRnZXRcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy93ZWJpZGVzLmh0bWwnOlxuICAgICAgICAgICAgICAgIEFjdGl2ZUNhcmRzV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgc2xpZGVzaG93IGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9ndWlkZXMvcHdhaWNvbi5odG1sJzpcbiAgICAgICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBDU1NFWCBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvY3NzLmh0bWwnOlxuICAgICAgICAgICAgICAgIGNzc2V4LkNTU0VYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGh0bWxleENvbG9yQ29kZSBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvaHRtbC5odG1sJzpcbiAgICAgICAgICAgICAgICBodG1sZXhDb2xvckNvZGUuSFRNTEVYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHVybGV4Q29sb3JDb2RlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy91cmwuaHRtbCc6XG4gICAgICAgICAgICAgICAgdXJsZXhDb2xvckNvZGUuVVJMRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZmxhc2hjYXJkIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9mbGFzaGNhcmRzLmh0bWwnOlxuICAgICAgICAgICAgICAgIGZsYXNoY2FyZGdhbWVXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBkb21haW4gbmFtZSBsb29rdXBcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9kb21haW5sb29rdXAuaHRtbCc6XG4gICAgICAgICAgICAgICAgZG9tYWlubG9va3VwLmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9tYXJrdXAuaHRtbCc6XG4gICAgICAgICAgICAgICAgc2xpZGVyYmFyLmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZUNvbXBvbmVudHM7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9BdHRyaWJ1dGlvbkxpbmtcIjtcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIjtcbmltcG9ydCB7IFJXQkNhcmRFbGVtZW50cyB9IGZyb20gXCIuLi9tb2RlbHMvV2lkZ2V0TWFya3VwRWxlbWVudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JDYXJkIHtcbiAgICAvKipcbiAgICAgKiBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqL1xuICAgIHByaXZhdGUgcndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHM7XG4gICAgLyoqXG4gICAgICogIE1hcCBXZWJCaXQgZGF0YSB0byBhIGNhcmQgZWFjaFxuICAgICAqIFxuICAgICAqICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAqICAgICAgPGRpdj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRCb2R5XCI+XG4gICAgICogICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgIDxhIGhyZWY9XCJcIj48L2E+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+XG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlOiBXZWJCaXQpIHtcbiAgICAgICAgbGV0IFdlYkJpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cyA9IHtcbiAgICAgICAgICAgIGNhcmRJbWc6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgICAgICAgICAgY2FyZEltZ1RvcDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBjYXJkQm9keTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlIZWFkaW5nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcblxuICAgICAgICAvLyBBZGQgY2FyZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICBXZWJCaXQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBXZWJCaXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7YXJ0aWNsZS5pZH1gKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIsKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBhcnRpY2xlLmFydGljbGVMaW5rKVxuICAgICAgICBjYXJkQm9keUhlYWRpbmcuaW5uZXJUZXh0ID0gYXJ0aWNsZS5uYW1lO1xuICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgICAgICAvLyBJbWFnZSBhdHRyaWJ1dGlvbiBtYXkgYmUgbmVlZGVkIGZvciB0aGUgaW1hZ2UgdXNlZFxuICAgICAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICAgICAgaWYgKGFydGljbGUubGlua0F0dHJpYnV0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbCh0aGlzLnJ3YmNhcmRlbGVtZW50cywgYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGNhcmQgaXMgV2ViQml0XG4gICAgICAgIC8vIEFkZCB0aGUgbWFya3VwIHRvIHRoZSBjb250YWluaW5nIGVsZW1lbnRcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3ApO1xuICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkpO1xuXG4gICAgICAgIHJldHVybiBXZWJCaXQ7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGltYWdlIGF0dHJpYnV0aW9uLCB0aGUgaW1hZ2UgaWQgYW5kIGFydGljbGUgaWQgd2lsbCBtYXRjaCxcbiAgICAgKiBvdGhlcndpc2UgdGhlIGRhdGEgaXNuJ3QgZW50ZXJlZCwgY2F1c2luZyBhIG1pc3NcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImZsaXAtY2FyZFwiPjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRGcm9udFwiPlxuICAgICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQmFja1wiPlxuICAgICAqICAgICAgICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgICAgICA8cD48L3A+XG4gICAgICogICAgICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIiBjbGFzcz1cImltZ1NtYWxsIGltZ1BUUlwiPlxuICAgICAqICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgKiBAcGFyYW0gcndiY2FyZGVsZW1lbnRzIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAgICogQHBhcmFtIGxpbmsgQXR0cmlidXRpb24gbGlua1xuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChyd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cywgbGluazogQXR0cmlidXRpb25MaW5rKSB7XG4gICAgICAgIGlmIChyd2JjYXJkZWxlbWVudHMuY2FyZEltZy5nZXRBdHRyaWJ1dGUoJ0FydGljbGUnKSA9PT0gbGluay5hcnRpY2xlaWQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGltYWdlIGJhY2sgcGFuZWwgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICAgICAgLy8gUmVkZWZpbmUgY2FyZCBpbWFnZSBwYW5lbCBhcyBhIGZsaXAgcGFuZWxcbiAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250ID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY2FyZEZyb250LmFwcGVuZENoaWxkKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTsgLy8gbW92ZSBpbWFnZSB3aXRoaW4gY2FyZCBmcm9udCBkaXZpc29yXG4gICAgICAgICAgICBsZXQgc21hbGxJbWcgPSA8SFRNTEltYWdlRWxlbWVudD5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICBjYXJkQmFjay5hcHBlbmRDaGlsZChzbWFsbEltZyk7XG4gICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSByd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpOyAvL2FwcGVuZCB0byBmcm9udCBwYW5lbFxuXG4gICAgICAgICAgICAvLyBBZGQgZmxpcC1wYW5lbCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xuICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgICAgIGJhY2tQYXJhLnRleHRDb250ZW50ID0gbGluay5pbm5lclRleHRcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZG93bmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG4vLyBBdHRyaWJ1dGlvbjogUm9iZXJ0IEEgSG93ZWxsLCBNYXkgMjAyM1xuLy8gQ29udGVudCBkZXJpdmVkIGZyb206IFczU2Nob29scywgaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9ob3d0by9ob3d0b19qc19zbGlkZXNob3cuYXNwXG5cblxuLyoqXG4gKiBDb21wb25lbnQgY3JlYXRpbmcgc2xpZGVzaG93IHdpZGdldHNcbiAqL1xuY29uc3Qgc2xpZGVzaG93V2lkZ2V0ID0ge1xuICAgIHNsaWRlSW5kZXg6IDEsXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHNsaWRlc2hvdyBjb21wb25lbnRzLlxuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgLy8gTmV4dC9wcmV2aW91cyBjb250cm9sc1xuICAgICAgICBmdW5jdGlvbiBwbHVzU2xpZGVzKG46bnVtYmVyKSB7XG4gICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCArPSBuKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVGh1bWJuYWlsIGltYWdlIGNvbnRyb2xzXG4gICAgICAgIGZ1bmN0aW9uIGN1cnJlbnRTbGlkZShuOm51bWJlcikge1xuICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSBuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hhbmdlIHRvIG5leHQgc2xpZGUgd2hlbiBhcnJvdyBidXR0b25zIGFyZSBjbGlja2VkXG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd1ByZXZpb3VzQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZXNob3dQcmV2XCIpO1xuICAgICAgICBjb25zdCBzbGlkZVNob3dOZXh0QnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZXNob3dOZXh0XCIpO1xuICAgICAgICBmb3IgKGxldCBidG4gb2Ygc2xpZGVTaG93UHJldmlvdXNCdG5zKXtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKC0xKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGJ0biBvZiBzbGlkZVNob3dOZXh0QnRucyl7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcygxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGFuZ2UgdG8gc2VsZWN0ZWQgc2xpZGUgd2hlbiBkb3QgYXJlIGNsaWNrZWRcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93RG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XG4gICAgICAgIGxldCBkb3RDb3VudGVyID0gMTtcbiAgICAgICAgZm9yKGxldCBkb3Qgb2Ygc2xpZGVTaG93RG90cyl7XG4gICAgICAgICAgICAvL2FkZCBkb3QgY291bnRlclxuICAgICAgICAgICAgZG90LnNldEF0dHJpYnV0ZShcImRvdGluZGV4XCIsIGAke2RvdENvdW50ZXJ9YClcbiAgICAgICAgICAgIC8vd2hlbiBjbGlja2VkLCBuYXZpZ2F0ZSB0byB0aGUgc2xpZGUgaW5kaWNhdGVkXG4gICAgICAgICAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcyhkb3RDb3VudGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG90Q291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGRvdENvdW50ZXIgPSAxO1xuICAgIH0sXG4gICAgc2hvd1NsaWRlczogKG46IG51bWJlcik9PntcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJteVNsaWRlc1wiKTtcbiAgICAgICAgICAgIGxldCBkb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcbiAgICAgICAgICAgIGlmIChuID4gc2xpZGVzLmxlbmd0aCkge3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gMX1cbiAgICAgICAgICAgIGlmIChuIDwgMSkge3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gc2xpZGVzLmxlbmd0aH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcFNsaWRlID0gPEhUTUxEaXZFbGVtZW50PnNsaWRlc1tpXTtcbiAgICAgICAgICAgICAgICB0ZW1wU2xpZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSBkb3RzW2ldLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFjdGl2ZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0ZW1wU2xpZGUgPSA8SFRNTERpdkVsZW1lbnQ+c2xpZGVzW3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4IC0gMV1cbiAgICAgICAgICAgIHRlbXBTbGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgZG90c1tzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCAtIDFdLmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXNob3dXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0IH0gZnJvbSBcIi4uL21vZGVscy9Ub0RvXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIFRvLURvIExpc3Qgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IFRvRG9zV2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFRvLURvIExpc3Qgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdUb0RvTGlzdCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9zRWxlbWVudDogRWxlbWVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdG9Eb3NFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Ub0RvTGlzdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNDb3VsZCBub3QgcXVlcnkgdG9kbyBsaXN0IHdpZGdldCBlbGVtZW50LlwiLCBcImNvbG9yOm9yYW5nZTtcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVG9Eb0xpc3Qgb2JqZWN0XG4gICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgICAgICAvL0NyZWF0ZXMgd2lkZ2V0IG1hcmt1cCBhbmQgcG9wdWxhdGVzIFRvLURvIHRhc2tzIGNvbnRhaW5lZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQodG9Eb3NFbGVtZW50KTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb0Rvc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdFQkJJVERBVEEgZnJvbSBcIi4uL2RhdGEvZGF0YVwiXG5pbXBvcnQgeyBSYW5kb21XZWJCaXRzIH0gZnJvbSBcIi4uL21vZGVscy9SYW5kb21XZWJCaXRzXCJcblxuLyoqXG4gKiBDYXJkIHdpZGdldCB0byBpbml0aWFsaXplIGFydGljbGUgZGF0YSBpbnRvIEhUTUwgY2FyZCBlbGVtZW50cy4gVGhpcyB3aWRnZXQgXG4gKiBjcmVhdGVzIG11bHRpcGxlIHNlY3Rpb25zIG9mIGNhcmRzIHRvIGFkZCB0byBhIHBhZ2UuXG4gKi9cbmNvbnN0IFJXQkNhcmRzV2lkZ2V0ID0ge1xuICAgIC8qKiBDYXJkcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiBicmVha3MgZG93biB0aGUgZGF0YSBzdHJ1Y3R1cmUgaW4gXG4gICAgICogb3JkZXIgdG8gZm9ybXVsYXRlIHRoZSBhcnRpY2xlIGRldGFpbHMgaW50byBvbmUgY2FyZCBmb3IgZWFjaCBhcnRpY2xlIGRhdGEuXG4gICAgICogXG4gICAgICogQXJ0aWNsZXMgaGF2ZSBkaWZmZXJlbnQgY2F0ZWdvcmllcywgc28gZWFjaCBjYXRlZ29yeSBtdXN0IGJlIHJlc3BlY3RlZC4gXG4gICAgICogKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIFNwbGl0IHRoZSBjYXJkcyBhcnJheXMgaW50byB0aGVpciByZXNwZWN0aXZlIGNhdGVnb3J5XG4gICAgICAgIC8qKiBNdWx0aXBsZSBjYXRlZ29yaWVzIG9mIGNhcmQgZGF0YSBleGlzdC4gVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG5lZWRlZCBcbiAgICAgICAgICogdG8gY3JlYXRlIGNhdGVnb3J5IHNlY3Rpb25zIGRpdmlzaW9ucyB3aGVuIHBsYWNlZCBvbiBhIHBhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudFtdID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkFyYml0cmFyeSBBcnRpY2xlczpcIiwgXCJBcmJpdHJhcnlBcnRpY2xlc1wiKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJHdWlkZSBTaG9ydHM6XCIsIFwiR3VpZGVTaG9ydHNcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiRXhwbG9yZSB0aGUgV2ViOlwiLCBcIkV4cGxvcmV0aGVXZWJcIiksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGNhcmQgZGF0YSArIGF0dHJpYnV0aW9uIGxpbmsgZGF0YVxuICAgICAgICAvLyBXRUJCSVREQVRBIGJyb2tlbiBpbnRvIDMgYXJyYXlzOiBQYWdlcywgb3IgYXJ0aWNsZXMsIEd1aWRlcywgYW5kIEV4cGxvcmVzXG4gICAgICAgIC8qKlRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBvZiBjYXJkIGVsZW1lbnRzLiBFYWNoIGluZGV4IHN0b3JlcyB0aGUgY2FyZHMnIGRhdGFcbiAgICAgICAgICogZm9yIG9uZSBjYXRlZ29yeSBvZiBhcnRpY2xlcy4gKi8gXG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzOiBhbnkgPSBbXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgIF07XG5cbiAgICAgICAgXG4gICAgICAgIC8vIFJvdXRlcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgcGFnZXNcbiAgICAgICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9uIHRvIDMgYXJ0aWNsZXMgb25seVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgICAgIC8qKiBSYW5kb21pemUgdGhlIG9yZGVyIG9mIGNhcmRzLiAqL1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCA1KTtcbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMV0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzFdLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgZGVjb25zdHJ1Y3Rpb24gYW5kIGFkZGl0aW9uXG4gICAgICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgdGhlIGRhdGEgdG8gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJbm5lciBsb29wOiBpdGVyYXRlIHRocm91Z2ggdGhlIGNhdGVnb3J5IGRhdGFcbiAgICAgICAgICAgICAgICAvLyBGcm9tIHRoZSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXMuc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNTZWN0aW9uW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUldCQ2FyZHNXaWRnZXRcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IENvbG9yQ29kZSBmcm9tICcuLi9tb2RlbHMvQ29sb3JDb2RlJ1xuXG5jb25zdCBodG1sZXhDb2xvckNvZGUgPSB7XG4gICAgSFRNTEVYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIC8vIEdldCBjb21wb25lbnQgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gd2lkZ2V0IGludGVyYWN0aXZpdHlcbiAgICAgICAgY29uc3Qgb3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnb3BlblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgY2xvc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnY2xvc2VcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGV4dFZhbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBhcnJheSBkYXRhIHN0cnVjdHVyZXMsIG5lZWRlZCBmb3IgdGhlIENvbG9yQ29kZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGNvbnN0IGNvbG9ybGVzc2VsZW1lbnRzID0gbmV3IEFycmF5KG9wZW5lcnMsIGNsb3NlcnMsIHZhbHVlcywgYXR0cmlidXRlcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItUmVkKVwiLCBcInZhcigtLWNsci1EYXJrQ3lhbilcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBodG1sZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgdXJsZXhDb2xvckNvZGUgPSB7XG4gICAgVVJMRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb3RvY29sXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBkb21haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRvbWFpblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9ydFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVyeVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52YWx1ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShwcm90b2NvbCwgZG9tYWluLCBwb3J0LCBmb2xkZXIsIFxuICAgICAgICAgICAgZmlsZSwgcXVlcnksIGtleSwgdmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiLCBcInZhcigtLWNsci1SZWQpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItcHJpbWFyeS02MDApXCIsIFwidmFyKC0tY2xyLWFsbC1wcmltYXJ5LTUwMClcIiwgXG4gICAgICAgICAgICBcInZhcigtLWNsci1MaWdodGNvcmFsKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXJsZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgY3NzZXggPSB7XG4gICAgLyoqXG4gICAgICogQ3NzZXggaXMgYSB3aWRnZXQgaW4gQ1NTIHBhZ2UsIGFwcGx5aW5nIHN0eWxlIGNvbG9ycyB0byBlbGVtZW50cyBvZiBkaWZmZXJlbnRcbiAgICAgKiB0eXBlcyAoYmFzZWQgb24gdGhlIENTUyBwcm9ncmFtbWluZyBsYW5ndWFnZSlcbiAgICAgKi9cbiAgICBDU1NFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlNlbGVjdG9yXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BdHRyaWJ1dGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVmFsdWVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHBzdWVkb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlBzdWVkby1jbGFzc1wiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShzZWxlY3RvcnMsIGF0dHJpYnV0ZXMsIHZhbHVlcywgcHN1ZWRvcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVJlZClcIiwgXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1Ta3libHVlKVwiLCBcInZhcigtLWNsci1HcmVlbilcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNzc2V4O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IGRvbWFpbmxvb2t1cCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIEdldCB0aGUgZm9ybSwgYXNzaWduIHRvIGEgdmFyaWFibGVcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hXaG9JUycpIGFzIEhUTUxGb3JtRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGlmIChmb3JtID09IG51bGwpeyAvL0lmIHRoZSBmb3JtIGlzIG5vdCBmb3VuZCwgdGhyb3cgZXhjZXB0aW9uLlxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiTG9va3VwIGZvcm0gbm90IGZvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZG9tYWlubG9va3VwLnNlYXJjaFdIT0lTKTtcbiAgICB9LFxuICAgIHNlYXJjaFdIT0lTOiAoKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHh0U2VhcmNoJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbGV0IHZhbHVlID0gaW5wdXRlbGVtLnZhbHVlO1xuICAgICAgICB2YXIgVVJMID0gJ2h0dHBzOi8vd3d3Lndob2lzLmNvbS93aG9pcy8nICsgdmFsdWU7XG4gICAgICAgIHdpbmRvdy5vcGVuKFVSTCwgJ19ibGFuaycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21haW5sb29rdXA7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuY29uc3QgbW9iaWxlQWJick1hcmt1cCA9IHtcbiAgICBpbml0OiAoKSA9PntcbiAgICAgICAgLy9iZWdpbiBtb2JpbGUgbWFya3VwXG4gICAgICAgIG1vYmlsZUFiYnJNYXJrdXAubW9iaWxlQWJick1hcmt1cHMoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAgICAgKiBBdHRyaWJ1dGUgdGFncyBvbiBtb2JpbGUgZG8gbm90IGhhdmUgaG92ZXIgb3B0aW9uLiBUaGlzIGZ1bmN0aW9uIGFkZHMgYSBjbGlja1xuICAgICAgICAgKiAgYWJpbGl0eSB0byBkZWZpbmUgYW4gYWJiciB0YWcsIHRoYW4gcmVseSBvbiB0aGUgdGl0bGUgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICBtb2JpbGVBYmJyTWFya3VwczogKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2JpbGVhYmJycGVyZiA9IG5ldyBSV0JQZXJmKFwiTW9iaWxlYWJicnBlcmZcIik7IC8vc3RhcnQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgICAgICAvKipcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzcyBBYmJyT3BlbntcbiAgICAgICAgICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgYWJickVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsYWJicmV2aWF0aW9uZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYWJiclwiKTtcbiAgICAgICAgaWYoYWxsYWJicmV2aWF0aW9uZWxlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBhYmJyIG9mIGFsbGFiYnJldmlhdGlvbmVsZW1zKXtcbiAgICAgICAgICAgICAgICBsZXQgYWJicmV2ID0gbmV3IEFiYnJPcGVuKCk7XG4gICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50ID0gYWJicjtcblxuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJicnRpdGxlYXR0cnZhbDogc3RyaW5nID0gYWJicmV2LmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGFiYnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWJicmV2LmFiYnJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA8IDEpeyAvL2NyZWF0ZSB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9zaG93IHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJicnRpdGxlYXR0cnZhbH0ke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1vYmlsZWFiYnJwZXJmLmVuZCgpIC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBtb2JpbGVBYmJyTWFya3VwO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IHNsaWRlcmJhciA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHZhciBkaXZpc29yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXZpc29yXCIpLCBcbiAgICAgICAgc2xpZGVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgc2xpZGVCYXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcInNsaWRlclwiKTtcbiAgICAgICAgc2xpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiBzbGlkZXJiYXIubW92ZURpdmlzb3JCYXIoZGl2aXNvciwgc2xpZGVCYXIpKTtcbiAgICB9LFxuICAgIG1vdmVEaXZpc29yQmFyOiAoZGl2aXNvcjogSFRNTEVsZW1lbnQsIHNsaWRlQmFyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGRpdmlzb3Iuc3R5bGUud2lkdGggPSBzbGlkZUJhci52YWx1ZSArIFwiJVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyYmFyOyIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5cbi8vIENyZWF0ZSBuZXcgQUEgKEFyYml0cmFyeSBBcnRpY2xlKVxuXG4vKipcbiAqIFwiQXJiaXRyYXJ5IEFydGljbGVzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBBcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRvbWFpbmxvb2t1cFwiLFxuICAgICAgICAxLFxuICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgXCJDaGVjayBhbiBhdmFpbGFibGUgZG9tYWluIHVzaW5nIFdob0lTIEFQSSBzZWFyY2hcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDQpLFxuICAgICAgICBcInBhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dob2lzLndlYnBcIixcbiAgICAgICAgXCJXaG9JcyBMb29rdXBcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICAgICAgMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0bWxyZXNwb25zZXNcIixcbiAgICAgICAgMixcbiAgICAgICAgXCJIVE1MIEZyYW1lc1wiLFxuICAgICAgICBcIlZpZXcgSFRNTCBwYWdlIHJlc3BvbnNlIHN0YXR1cyBpbmZvcm1hdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxuICAgICAgICBcInBhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX0ZyYW1lcy53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb2RlIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29kZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzc2wgY2VydGlmaWNhdGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbC1jZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYnRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJKc29ub2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDaGF0Z3B0XCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJhaSBpY29uc1wiLFxuICAgICAgICAgICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgICAgIDhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQYWludDNkXCIsXG4gICAgICAgIDksXG4gICAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgICAgXCJFZGl0IHBpY3R1cmVzIG9yIHNjcmVlbiBjYXB0dXJlcyB1c2luZyBwYWludCAzRFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgICAgIFwicGFnZXMvcGFpbnQzZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Byb3RvdHlwZS53ZWJwXCIsXG4gICAgICAgIFwiQ29sb3JmdWwgcHJvdG90eXBpbmcgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwcm90b3R5cGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUHJvdG90eXBlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Byb3RvdHlwZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICAgICAgOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpY3Rpb25hcnlcIixcbiAgICAgICAgMTAsXG4gICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICBcIkxpc3QgZGljdGlvbmFyeSB0ZXJtcyB1c2luZyBhIGRpY3Rpb25hcnkgQVBJXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDMwKSxcbiAgICAgICAgXCJwYWdlcy9kaWN0aW9uYXJ5d29yZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2RpY3Rpb25hcnkud2VicFwiLFxuICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbiBkZXBpY3Rpb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGljdGlvbmFyeSBpY29uc1wiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RpY3Rpb25hcnlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICAgICAgMTBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJCb2luY1wiLFxuICAgICAgICAxMSxcbiAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICBcIlBpdm90IHRoZSB1bnVzZWQgY29tcHV0aW5nIHBvdGVudGlhbCBmb3Igc2NpZW5jZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCA2KSxcbiAgICAgICAgXCJwYWdlcy9ib2luYy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2JvaW5jX2dsb3NzeS53ZWJwXCIsXG4gICAgICAgIFwiQk9JTkMgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uc1wiLFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uIGRlc2lnbmVkIGJ5IE1pY2hhbCBLcmFrb3dpYWsuIENveXJpZ2h0KEMpIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgICAgICAgICAgXCJCT0lOQ1wiLFxuICAgICAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICAgICAgMTFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJJUEFkZHJlc3NcIixcbiAgICAgICAgMTIsXG4gICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgXCJMb29rdXAgcHVibGljIGFuZCBsb2NhbCBJUCBhZGRyZXNzZXNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMTMpLFxuICAgICAgICBcInBhZ2VzL2lwYWRkcmVzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2lwLndlYnBcIixcbiAgICAgICAgXCJJUCBsb2NhdGlvbiBhbmQgYnJvd3NlciBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIklQIGljb25zXCIsXG4gICAgICAgICAgICBcIklQIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2lwXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgICAgICAgICAxMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkhUTUxNYXJrdXBcIixcbiAgICAgICAgMTMsXG4gICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICBcIlJldmVhbCBIVE1MIHNvdXJjZSBjb2RlIGFuZCBKYXZhU2NyaXB0XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJwYWdlcy9tYXJrdXAuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX3NvdXJjZS53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAxM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIk5ldHdvcmtzcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXG4gICAgICAgICAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAgICAgICAgIDE1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUG93ZXJTaGVsbGRyaXZlc1wiLFxuICAgICAgICAxNyxcbiAgICAgICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgICAgICBcIlNpbWlsYXIgdG8gYW4gSERELCBleGNlcHQgaXQgaXMgb25seSBpbiBQb3dlclNoZWxsXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIwKSxcbiAgICAgICAgXCJwYWdlcy9kcml2ZXMuaHRtbFwiLFxuICAgICAgICBcImltZy90ZXJtaW5hbC53ZWJwXCIsXG4gICAgICAgIFwiQ29tcHV0ZXIgdGVybWluYWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0ZXJtaW5hbCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQgSWNvbnMgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90ZXJtaW5hbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgICAgICAgICAgMTdcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fRE5TXCIsXG4gICAgICAgIDIwLFxuICAgICAgICBcIkhvdyBETlMgd29ya3NcIixcbiAgICAgICAgXCJBIGdlbmVyYWwgb3ZlcnZpZXcgb2YgRG9tYWluIE5hbWUgU3lzdGVtXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDQpLFxuICAgICAgICBcInBhZ2VzL2Rucy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Rucy53ZWJwXCIsXG4gICAgICAgIFwiRE5TIGRyYXdpbmcgYXR0YWNoZWQgdG8gYSBrZXlib2FyZFwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkbnMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRG5zIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogRE5TXCIsXG4gICAgICAgICAgICAyMFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19Hb29nbGVcIixcbiAgICAgICAgMjIsXG4gICAgICAgIFwiR29vZ2xlIGlzICMxIHdlYnNpdGVcIixcbiAgICAgICAgXCJHb29nbGUgaXMgdGhlICMxIHRyYWZmaWNrZWQgc2l0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxNyksXG4gICAgICAgIFwicGFnZXMvZ29vZ2xlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoLWVuZ2luZS53ZWJwXCIsXG4gICAgICAgIFwiQSBiYXIgZ3JhcGggaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJyYW5rIGljb25zXCIsXG4gICAgICAgICAgICBcIlJhbmsgaWNvbnMgY3JlYXRlZCBieSBQaXhlbG1lZXR1cCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEdvb2dsZVwiLFxuICAgICAgICAgICAgMjJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0cmVlIGljb25zXCIsXG4gICAgICAgICAgICBcIlRyZWUgaWNvbnMgY3JlYXRlZCBieSBqdXN0aWNvbiAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RyZWVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRE9NXCIsXG4gICAgICAgICAgICAyM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYmlkZVwiLFxuICAgICAgICAyNCxcbiAgICAgICAgXCJXZWJJREVcIixcbiAgICAgICAgXCJUcnkgc2tpcHBpbmcgdGhlIGRvd25sb2FkIHdpdGggYSB3ZWIgSURFXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDMpLFxuICAgICAgICBcInBhZ2VzL3dlYmlkZXMuaHRtbFwiLFxuICAgICAgICBcImltZy91eC53ZWJwXCIsXG4gICAgICAgIFwiQSBjb21wdXRlciBhcHBsaWNhdGlvbiBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRlc2lnbiBpY29uc1wiLFxuICAgICAgICAgICAgXCJEZXNpZ24gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGVzaWduXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIndlYmlkZXNcIixcbiAgICAgICAgICAgIDI0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIDI1LFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICBcIkZpbmQgYW4gU1ZHIGFuZCBsZWFybiBhYm91dCB0aGUgU1ZHIGxhbmd1YWdlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDkpLFxuICAgICAgICBcInBhZ2VzL3N2Zy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3N2Zy5zdmdcIixcbiAgICAgICAgXCJBbiBzdmcgaWNvbiBleGFtcGxlLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzY2FsYWJsZSB2ZWN0b3IgZ3JhcGhpY3NcIixcbiAgICAgICAgICAgIFwiU1ZHIGljb24gY3JlYXRlZCBieSBIYXJ2ZXkgUmF5bmVyXCIsXG4gICAgICAgICAgICBcImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy9cIixcbiAgICAgICAgICAgIFwiVzNDXCIsXG4gICAgICAgICAgICBcInN2Z1wiLFxuICAgICAgICAgICAgMjVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEaXNhYmxlX0phdmFzY3JpcHRcIixcbiAgICAgICAgMjYsXG4gICAgICAgIFwiRGlzYWJsZSBKYXZhU2NyaXB0XCIsXG4gICAgICAgIFwiRGlzYWJsZSB0aGUgSmF2YVNjcmlwdCB0byB0ZXN0IHdlYnNpdGUgZnVuY3Rpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjIpLFxuICAgICAgICBcInBhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgICAgICBcImltZy9zb2Z0d2FyZS1hcHBsaWNhdGlvbi53ZWJwXCIsXG4gICAgICAgIFwiQSBqYXZhc2NyaXB0IGZ1bmN0aW9uIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiV2ViIGNvZGluZyBpY29ucyBjcmVhdGVkIGJ5IE11aGFtbWFkIEF0aWYgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy93ZWItY29kaW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0hUVFBcIixcbiAgICAgICAgMjgsXG4gICAgICAgIFwiSFRUUFwiLFxuICAgICAgICBcIkhUVFAgbWFrZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nIHdlYiBwYWdlcyBwb3NzaWJsZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTIpLFxuICAgICAgICBcInBhZ2VzL2h0dHAuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwLndlYnBcIixcbiAgICAgICAgXCJIdHRwIHZlcmIgaW4gZnJvbnQgb2YgYSBnbG9iZSBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodHRwIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0dHAgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHR0cFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogSFRUUFwiLFxuICAgICAgICAgICAgMjhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDU1NkZWZcIixcbiAgICAgICAgMjksXG4gICAgICAgIFwiQ1NTXCIsXG4gICAgICAgIFwiQ1NTIHN0eWxlcyB0aGUgZWxlbWVudHMgd2l0aGluIGEgcGFnZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTkpLFxuICAgICAgICBcInBhZ2VzL2Nzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nzcy0zLndlYnBcIixcbiAgICAgICAgXCJBIENTUyB0aHJlZSBsb2dvLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjc3MgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ3NzIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWwgcGVyZmVjdCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nzc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDU1NcIixcbiAgICAgICAgICAgIDI5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAzMixcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIFwiVHJhdmVsIGxhdGVuY3kgY2FuIHNsb3cgZG93biBhIHdlYnNpdGUuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDE4KSxcbiAgICAgICAgXCJwYWdlcy9sYXRlbmN5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY2hyb25vbWV0ZXIud2VicFwiLFxuICAgICAgICBcIkEgc3RvcHdhdGNoIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRpbWVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlRpbWVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RpbWVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgICAgIDMyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTGRlZlwiLFxuICAgICAgICAzMyxcbiAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGFuIEhUTUwgZWxlbWVudFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyNSksXG4gICAgICAgIFwicGFnZXMvaHRtbC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0bWwud2VicFwiLFxuICAgICAgICBcIkhUTUwgZWxlbWVudCBzeW50YXggaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJVUkxcIixcbiAgICAgICAgMzQsXG4gICAgICAgIFwiVVJMIEFkZHJlc3MgRXhhbXBsZXNcIixcbiAgICAgICAgXCJMZWFybiB0aGUgcGFydHMgYW5kIHN5bnRheCBvZiBhIFVSTFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA4LCA3KSxcbiAgICAgICAgXCJwYWdlcy91cmwuaHRtbFwiLFxuICAgICAgICBcImltZy93d3cud2VicFwiLFxuICAgICAgICBcIlVSTCBleGFtcGxlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidXJsIGljb25zXCIsXG4gICAgICAgICAgICBcIlVybCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy91cmxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICAgICAgICAgIDM0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGF0YVN0b3JhZ2VcIixcbiAgICAgICAgMzUsXG4gICAgICAgIFwiRGF0YSBTdG9yYWdlXCIsXG4gICAgICAgIFwiTG9jYWwgc3RvcmFnZSBzYXZlcyBkYXRhIHdoZW4gbmVlZGVkIGZvciBjb25jdXJyZW50IHBhZ2Ugc3VyZmluZy5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgOCwgMTQpLFxuICAgICAgICBcInBhZ2VzL2RhdGFzdG9yYWdlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VydmVyLndlYnBcIixcbiAgICAgICAgXCJEYXRhIHN0b3JhZ2UgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgICAgICAgIDM1XG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBcIkd1aWRlIFNob3J0cycgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgR3VpZGVTaG9ydHMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTZWFyY2h2ZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29udGVudCB3cml0aW5nIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvbnRlbnQtd3JpdGluZ1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgICAgICAxNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNNVFBcIixcbiAgICAgICAgMTYsXG4gICAgICAgIFwiR1VJREU6IFNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgIFwiTGVhcm4gRW1haWwgcHJvdG9jb2xzIGFuZCBwb3J0IG51bWJlcnNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMTMpLFxuICAgICAgICBcImd1aWRlcy9zbXRwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29tbXVuaWNhdGlvbnMud2VicFwiLFxuICAgICAgICBcIkVtYWlsIHNlcnZlci1zdGFjayB3aXRoIG1haWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICAgICAgMTZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZ0b29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgYXBwbGljYXRpb24gdGFiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvYXBwbGljYXRpb250YWIuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveC53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAxOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldnRvb2xzdHdvXCIsXG4gICAgICAgIDIxLFxuICAgICAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgICAgIDIxXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUFdBSWNvblwiLFxuICAgICAgICAyNyxcbiAgICAgICAgXCJHVUlERTogSW5zdGFsbCB0aGUgUFdBIGFwcGxpY2F0aW9uc1wiLFxuICAgICAgICBcIlByb2dyZXNzaXZlIHdlYnNpdGVzIGhhdmUgYW4gaW5zdGFsbGF0aW9uIG9wdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL3B3YWljb24uaHRtbFwiLFxuICAgICAgICBcImltZy9hcHAtZGV2ZWxvcG1lbnQud2VicFwiLFxuICAgICAgICBcIkFwcCBkZXZlbG9wbWVudCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRldmVsb3BtZW50IGljb25zXCIsXG4gICAgICAgICAgICBcIkRldmVsb3BtZW50IGljb25zIGNyZWF0ZWQgYnkgRGVzaWduIENpcmNsZSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RldmVsb3BtZW50XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ2xlYXJjb29raWVzXCIsXG4gICAgICAgIDMwLFxuICAgICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgICAgXCJEb24ndCB3YXN0ZSB0aW1lIHNpZnRpbmcgdGhyb3VnaCBzZXR0aW5nc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyKSxcbiAgICAgICAgXCJndWlkZXMvY2xlYXJjb29raWVzcXVpY2tseS5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nvb2tpZXMud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgY29va2llIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29va2llIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvb2tpZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb29raWVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICAgICAgMzBcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiRXhwbG9yZSBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBFeHBsb3JlID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmFzYVwiLFxuICAgICAgICAzLFxuICAgICAgICBcIkVYUExPUkU6IE5BU0EgUGFnZXNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSBOQVNBIGRvbWFpbi4gTGVhcm4gYWJvdXQgdGhlIHVuaXZlcnNlIHZpYSBOQVNBIGxpbmtzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxOCksXG4gICAgICAgIFwiZXhwbG9yZS9uYXNhLmh0bWxcIixcbiAgICAgICAgXCJpbWcvTkFTQS53ZWJwXCIsXG4gICAgICAgIFwiTkFTQSBBcnRlbWlzIExvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJJbWFnZSBzb3VyY2UgdmlhIHRoZSBOYXRpb25hbCBBZXJvbmF1dGljcyBhbmQgU3BhY2UgQWRtaW5pc3RyYXRpb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cubmFzYS5nb3YvYXVkaWVuY2UvZm9yc3R1ZGVudHMvNS04L2ZlYXR1cmVzL3N5bWJvbHMtb2YtbmFzYS5odG1sXCIsXG4gICAgICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgICAgIFwiTkFTQSBQYWdlc1wiLFxuICAgICAgICAgICAgM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlZpcnR1YWx0b3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZ29vZ2xlIGV4cGVkaXRpb25zIGljb25zXCIsXG4gICAgICAgICAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgICAgICAxOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYmJcIixcbiAgICAgICAgMzEsXG4gICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGVcIixcbiAgICAgICAgXCJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMyksXG4gICAgICAgIFwiZXhwbG9yZS93ZWJidGVsZXNjb3BlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSldTVF9wb3N0ZXIud2VicFwiLFxuICAgICAgICBcIkphbWVzIFdlYmIgc3BhY2UgdGVsZXNjb3BlIHBvc3RlciBpbWFnZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJIZXhhZ29uIExpdGhvICgyMDE4KVwiLFxuICAgICAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uIHByb3ZpZGVkIGJ5IG5hc2EuZ292XCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vandzdC5uYXNhLmdvdi9jb250ZW50L2ZlYXR1cmVzL2VkdWNhdGlvbmFsL3ByaW50Lmh0bWxcIixcbiAgICAgICAgICAgIFwiandzdC5uYXNhLmdvdlwiLFxuICAgICAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uXCIsXG4gICAgICAgICAgICAzMVxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogTXVsdGlkaW1lbnNpb25hbCBhcnJheS4gUm93cyBhcmUgdGhlIGRpZmZlcmVudCBzZWN0aW9ucy4gQ29sdW1uc1xuICogY29udGFpbiBlYWNoIGFydGljbGUncyBkYXRhIGJlbG9uZ2luZyBpbiB0aGF0IHNlY3Rpb24uXG4gKi9cbmNvbnN0IFdFQkJJVERBVEEgPSBbQXJiaXRyYXJ5QXJ0aWNsZXMsIEd1aWRlU2hvcnRzLCBFeHBsb3JlXVxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTtcbiIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCTGluayBmcm9tICcuLi9tb2RlbHMvUldCTGluayc7XG5cbi8qKlxuICogSGVhZGVyIG5hdmlnYXRpb24gbGluayBkYXRhXG4gKi9cbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJJbmRleFwiLFxuICAgIFwiSG9tZVwiLFxuICAgIFwiSG9tZVwiLFxuICAgIFwiaW5kZXguaHRtbFwiXG4pO1xuXG5jb25zdCBwYWdlc05hdkxpbmsgPSBuZXcgUldCTGluayhcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcInBhZ2VzLmh0bWxcIlxuKTtcblxuY29uc3QgZ2FtZU5hdkxpbmsgPSBuZXcgUldCTGluayhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG4vKiogTmF2aWdhdGlvbiBsaW5rcyAqL1xuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGluaywgZ2FtZU5hdkxpbmtdO1xuZXhwb3J0IGRlZmF1bHQgTkFWSVRFTVM7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuY29uc3QgcG9ydGRlZmluaXRpb25zID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgIFsyMiwgXCJTZWN1cmUgU1NIICAvVENQXCJdLFxuICAgIFsyMywgXCJUZWxuZXQgKHVuc2VjdXJlKVwiXSxcbiAgICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbNDksIFwiVEFDQUNTK1wiXSxcbiAgICBbNTMsIFwiRE5TICAvVURQL1RDUFwiXSxcbiAgICBbNjcsIFwiREhDUFwiXSxcbiAgICBbNjgsIFwiREhDUFwiXSxcbiAgICBbODAsIFwiSFRUUCAgL1RDUFwiXSxcbiAgICBbODgsIFwiS2VyYmVyb3Mtc2VjICAvVENQL1VEUFwiXSxcbiAgICBbMTEwLCBcIlBPUCAtIDk5NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbMTM1LCBcIlJQQ1wiXSxcbiAgICBbMTM3LCBcIk5FVEJJT1NcIl0sXG4gICAgWzEzOCwgXCJORVRCSU9TXCJdLFxuICAgIFsxMzksIFwiTkVUQklPU1wiXSxcbiAgICBbMTQzLCBcIklNQVAgLSA5OTMgZm9yIGVuY3J5cHRlZFwiXSxcbiAgICBbMTYxLCBcIlNOTVAgIE1hbmFnZXJcIl0sXG4gICAgWzE2MiwgXCJTTk1QICBBZ2VudFwiXSxcbiAgICBbMzg5LCBcIkxEQVAgLSA2MzYgZm9yIHNlY3VyZVwiXSxcbiAgICBbNDQzLCBcIkhUVFBTICAvVENQXCJdLFxuICAgIFs0NDUsIFwiU01CICAvVENQXCJdLFxuICAgIFs0NjUsIFwiU01UUCBieSBUTFNcIl0sXG4gICAgWzUxNCwgXCJTWVNMT0cgIC9VRFBcIl0sXG4gICAgWzU4NywgXCJTTVRQUyBTVEFSVFRMU1wiXSxcbiAgICBbNjM2LCBcIkxEQVAgU1NMXCJdLFxuICAgIFs5OTAsIFwiRlRQU1wiXSxcbiAgICBbOTkzLCBcIklNQVAgVExTXCJdLFxuICAgIFs5OTUsIFwiUE9QIFRMU1wiXSxcbiAgICBbMTgxMiwgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgIFsxODEzLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgWzMyNjksIFwiTWljcm9zb2Z0IEdsb2JhbCBDYXRhbG9nXCJdLFxuICAgIFszMzg5LCBcIlJEUFwiXSxcbl0pO1xuZXhwb3J0IGRlZmF1bHQgcG9ydGRlZmluaXRpb25zO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBIZWFkZXJGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlckZvb3Rlcic7XG5pbXBvcnQgUGFnZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzJztcbmltcG9ydCBDbGFzc0NvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL0NsYXNzQ29tcG9uZW50cyc7XG5pbXBvcnQgbW9iaWxlQWJick1hcmt1cCBmcm9tICcuL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwJ1xuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuXG5jb25zdCBtYWlucGVyZiA9IG5ldyBSV0JQZXJmKFwibWFpblwiKTtcblxuLy8gZW50cnkgcG9pbnRcbi8qKlxuICogVHlwZVNjcmlwdCBlbnRyeSBwb2ludC4gVGhpcyBzY3JpcHQgaW5pdGlhbGl6ZXMgcGFnZSBjb21wb25lbnRzIGFuZCBtb2RlbHMgYXNcbiAqICB0aGV5J3JlIG5lZWRlZCBtYWluLmluaXQoKSBpcyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgXCJ0eXBlc2NyaXB0LmpzXCIuXG4gKi9cbmNvbnN0IG1haW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwYWdlIHdpZGdldHMgYW5kIGFwcGxpY2F0aW9uIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBFdmVudCBmaXJlZCBiZWZvcmUgYXNzZXRzIGFyZSByZW5kZXJlZCB0byB0aGUgcGFnZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5pbml0KCk7XG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIFBhZ2VDb21wb25lbnRzLmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBlbGVtZW50IGNvbXBvbmVudHNcbiAgICAgICAgICAgIENsYXNzQ29tcG9uZW50cy5pbml0RGljdGlvbmFyeSgpO1xuICAgICAgICAgICAgQ2xhc3NDb21wb25lbnRzLmluaXRUb0RvKCk7XG5cbiAgICAgICAgICAgIC8vIDxhYmJyPjwvYWJicj4gc3R5bGVzOiBpbXBsZW1lbnRlZCBmb3IgbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIG1vYmlsZUFiYnJNYXJrdXAuaW5pdCgpO1xuXG4gICAgICAgICAgICBtYWlucGVyZi5lbmQoKTtcbiAgICAgICAgfSlcbiAgICB9ICAgIFxufTtcblxubWFpbi5pbml0KCk7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBhcGlHRVQgaXMgZm9yIGZldGNoIHJlcXVlc3RzLiBVc2UgYW4gYXBpR0VUIG9iamVjdCB0byBtYW5pcHVsYXRlIHRoZSBmZXRjaFxuICogIHJlcXVlc3QgaW50byBlaXRoZXI6XG4gKlxuICogMS4gcmV0dXJuaW5nIGRhdGFcbiAqXG4gKiAtLW9yIC0tXG4gKlxuICogMi4gc3RvcmluZyB0aGUgcmVxdWVzdCBpbiB0aGUgYnJvd3NlciBjYWNoZSB0byByZXRyaWV2ZSBsYXRlclxuICovXG5leHBvcnQgY2xhc3MgYXBpR0VUIHtcbiAgcHVibGljIGVycm9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgR0VUVVJMOiBVUkw7XG4gIHByaXZhdGUgc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBHRVRVUkw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGVcbiAgICovXG4gIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuR0VUVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0R0VUVVJMKCkge1xuICAgIHJldHVybiB0aGlzLkdFVFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2ggcmVxdWVzdCBjYW4gdGFrZSBVUkwgb3Igc3RyaW5nIHBhcmFtZXRlci4gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBhcGlHRVRcbiAgICogIG9iamVjdCBmb3IgYSBVUkwgZmV0Y2ggYnkgY3JlYXRpbmcgYSBVUkwgZnJvbSB0aGUgc3RyaW5nLCBvciBwYXNzaW5nIHRoZSBVUkwuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqL1xuICBwdWJsaWMgc2V0R0VUVVJMKEdFVFVSTDogVVJMIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgcHVibGljIGZ1bmN0aW9uIGNyZWF0aW5nIGEgZGF0YSBwcm9taXNlIG9iamVjdCBmb3IgdGhlIGNhbGxlZCBmZXRjaCBmdW5jdGlvbi4gSWZcbiAgICogIHRoZSByZXF1ZXN0IG5lZWRzIGFkZGVkIHRvIGJyb3dzZXIgc3RvcmFnZSwgdGhlIGZldGNoIGlzIG1hZGUgYW5kIHNlbnQgdG9cbiAgICogIHN0b3JhZ2UuIEEgY2xvbmVkIGNvcHkgb2YgdGhlIGZldGNoZWQgZGF0YSBpcyByZXR1cm5lZCBhbmQgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXNcbiAgICogIHNlbnQgdG8gdGhlIGNhY2hlLiBXaXRob3V0IHNlbmRpbmcgdG8gYnJvd3NlciBjYWNoZSwgdGhlIGZldGNoIGlzIHJlcXVlc3RlZCBhbmQgXG4gICAqIHJldHVybmVkLlxuICAgKiAgXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGFDYWNoZVByb21pc2U6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBhcGlHRVQoR0VUVVJMOiBVUkwpIHtcbiAgICAvL0NoZWNrIGlmIHRoZSByZXF1ZXN0IGlzIGZvciBjYWNoZSBzdG9yYWdlXG4gICAgaWYgKHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlKSB7XG4gICAgICAvL1RoZSByZXR1cm5lZCBkYXRhIGlzIHBhY2thZ2VzIGFzIGEgUHJvbWlzZSBvYmplY3RcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAvL09wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICB3aW5kb3cuY2FjaGVzLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKS50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgICAgICAgY2FjaGVzLm1hdGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vTm8gbWF0Y2hlcyBmb3IgdGhpcyByZXF1ZXN0IGluIFN0b3JhZ2UgQ2FjaGUsIHNvIGZldGNoIHRoZSByZXF1ZXN0IG5vcm1hbGx5XG4gICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgIGZldGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAvL0NvcHkgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgIGlmIChjbG9uZWRyZXNwLnN0YXR1cyAhPSA0MDQpe1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5wdXQoR0VUVVJMLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRyZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlID0+IHsvL0Nhbm5vdCBvcGVuIFN0b3JhZ2UgQ2FjaGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHsvL0F0dGVtcHQgcmF3IGZldGNoXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb21pc2UgZXJyb3Igb24gZGF0YSBmZXRjaC5cIikpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy9UaGUgcHJvbWlzZSBoYXMgcmVzb2x2ZWQgLS0+IHJldHVybiB0aGUgcHJvbWlzZSBkYXRhXG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSk7XG4gICAgICB9KTtcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSByZXF1ZXN0ZWQgcmVzcG9uc2UgaXMgb2YgdmFsaWQgc3RhdHVzICdPSycgYW5kICcyMDAnXG4gICAqIEBwYXJhbSByZXMgLSB0aGUgZmV0Y2hlZCByZXNwb25zZS5cbiAgICogQHJldHVybnMgLSByZXR1cm5zIHJlcy5qc29uKCkgb24gc3VjY2VzcyBvciByZXR1cm5zIHJlc3BvbnNlIG9uIGZhaWx1cmUuXG4gICAqL1xuICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gNDA0KSB7XG4gICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICghcmVzLm9rIHx8IHJlcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLm9rICsgXCI6IFwiICsgcmVzLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZldGNoIHJlcXVlc3QsIHJldHVybmluZyBhIGZldGNoIHByb21pc2UuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGEudGV4dCgpIG9yIGRhdGEgYmFzZWQgb24gdGhlIGluc3RhbmNlIHJldHVybmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERhdGEoR0VUVVJMOiBVUkwpIHtcbiAgICByZXR1cm4gZmV0Y2goR0VUVVJMKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfVxuXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSV0JMaW5rIGZyb20gXCIuL1JXQkxpbmtcIjtcblxuLyoqIFxuICogVXNlZCBmb3IgaW1hZ2UgQXR0cmlidXRpb25cbiovXG5jbGFzcyBBdHRyaWJ1dGlvbkxpbmsgZXh0ZW5kcyBSV0JMaW5rIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgICBwdWJsaWMgYXR0cmlidXRlZG93bmVyOiBzdHJpbmc7XG4gICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICBwdWJsaWMgYXJ0aWNsZWlkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqTGluayB0aXRsZSAqL1xuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAvKipMaW5rIGlubmVyIHRleHQgKi9cbiAgICAgICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgICAgIC8qKiBsaW5rIGhyZWYgKi9cbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgICAgICBhdHRyaWJ1dGVkb3duZXI6IHN0cmluZyxcbiAgICAgICAgLyoqV2ViQml0cyBwYWdlICovXG4gICAgICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgICAgIGFydGljbGVpZDogbnVtYmVyXG5cbiAgICApIHtcbiAgICAgICAgc3VwZXIodGl0bGUsIGlubmVyVGV4dCwgcGFnZU5hbWUsIGhSZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZWRvd25lciA9IGF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgdGhpcy5hcnRpY2xlaWQgPSBhcnRpY2xlaWQ7XG4gICAgICAgIEF0dHJpYnV0aW9uTGluay5jb3VudCsrO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRpb25MaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yQ29kZSB7XG4gICAgZWxlbXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W107XG4gICAgY29sb3I6IHN0cmluZ1tdO1xuICAgIHJlc2V0YnRuOiBFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yIChjb2xvcmxlc3NlbGVtZW50czogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5bXSwgY29sb3JzOiBzdHJpbmdbXSwgcmVzZXRidG46IEVsZW1lbnQpe1xuICAgICAgICB0aGlzLmVsZW1zID0gY29sb3JsZXNzZWxlbWVudHM7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcnM7XG4gICAgICAgIHRoaXMucmVzZXRidG4gPSByZXNldGJ0bjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuY3NzRXhhbXBsZUhpZ2hsaWdodGluZyh0aGlzLmVsZW1zW2ldLCB0aGlzLmNvbG9yW2ldKTtcbiAgICAgICAgICAgIHRoaXMuY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KHRoaXMuZWxlbXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29sb3IgdGhlIGV4YW1wbGUgYXJlYSdzIGVsZW1lbnRzIHVzaW5nIGNzc1xuICAgICAqIEBwYXJhbSBlbGVtc2xpc3QgLSBOb2RlIGxpc3Qgb2YgSFRNTEVsZWxlbWVudHMuIEkuRS4gdXNpbmcgcXVlcnkuU2VsZWN0b3JBbGwoKVxuICAgICAqIEBwYXJhbSBjb2xvciAtIFN0cmluZyBvZiBDU1MgY29sb3IgdmFsdWVcbiAgICAgKi9cbiAgICBjc3NFeGFtcGxlSGlnaGxpZ2h0aW5nIChlbGVtc2xpc3Q6ICBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiwgY29sb3I6IHN0cmluZykge1xuICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vZnVuY3Rpb24gdG8gcmVzZXQgdGhlIGNzcyBjb2RlIHByb3BlcnRpZXMgY29sb3IgdG8gb3JpZ2luYWxcbiAgICBjc3NFeGFtcGxlSGlnaGxpZ2h0UmVzZXQoIGVsZW1zbGlzdDogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pe1xuICAgICAgICB0aGlzLnJlc2V0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgYXBpR0VUIH0gZnJvbSBcIi4uL21vZGVscy9BUElcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCBmcm9tIFwiLi9EaWN0aW9uYXJ5U2VhcmNoTWFya3VwXCI7XG5pbXBvcnQgUldCRXJyb3IgZnJvbSBcIi4vUldCRXJyb3JCdXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiB9IGZyb20gXCIuL1JXQkpTT05Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IFJXQlN0cmluZ2lmeUpTT04gfSBmcm9tIFwiLi9SV0JKU09OQ29udmVydGVyXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuXG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoIGlzIGEgc2V0IG9mIG1hcmt1cCBjcmVhdGlvbiBhbmQgZnVuY3Rpb25zIHdoaWNoIGFsbG93IGEgdXNlclxuICogIHRvIGxvb2sgdXAgYSB3b3JkIGxpa2UgYSBEaWN0aW9uYXJ5LiBXaGVuIGNhbGxlZCwgdGhlIHVzZXIncyBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAqICBhcyBhbiBhY2NlcHRhYmxlIHdvcmQgb3IgaXQgZGVjbGluZXMgdGhlIHJlcXVlc3QsIHRoZW4gc2hvd2luZyB0aGUgdXNlciBpZiB0aGUgd29yZFxuICogIGlzIGFjY2VwdGFibGUuXG4gKlxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICoga25vd24gcGxhY2VtZW50IGxvY2F0aW9uKSB0aGF0IGNvbnRhaW5zIHRoZSAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3MuXG4gKlxuICogICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAqXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBleHRlbmRzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkW107XG4gIHByaXZhdGUgc3RhdGljIENhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0OiBzdHJpbmcgPSBcIlJXQl93b3JkX2ZldGNoXCI7XG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RVcmw6IHN0cmluZyA9XG4gICAgXCJodHRwczovL2FwaS5kaWN0aW9uYXJ5YXBpLmRldi9hcGkvdjIvZW50cmllcy9lbi9cIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBjcmVhdGVzIGFsbCB0aGUgZnVuY3Rpb25hbGl0eSBhbmQgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gICAqICBEaWN0aW9uYXJ5IFNlYXJjaCB3aWRnZXQgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBsYWNlIHdpZGdldCBtYXJrdXAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9JbnZva2UgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLlxuICAgIHN1cGVyKGVsZW0pO1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGljdGlvbmFyeSB3aWRnZXQgd2l0aCBjbGljayBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLmFkZFdpZGdldEV2ZW50cygpO1xuICAgIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2UgPSBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBMb2NhbCBTdG9yYWdlIHdvcmRzIHByZXZpb3VzbHkgc3RvcmVkIHdpdGggdGhlIERpY3Rpb25hcnkgU2VhcmNoIFdpZGdldC5cbiAgICpcbiAgICogQHJldHVybnMgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSAtIHRoZXNlIGFyZSB0aGUgd29yZHMgc3RvcmVkIHByZXZpb3VzbHkgaW4gdGhlXG4gICAqICBicm93c2VyIGNhY2hlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkge1xuICAgIC8vTG9jYWwgU3RvcmFnZSAnd29yZC1jYWNoZXMnIGl0ZW1zIGRhdGEgYXNzaWdubWVudFxuICAgIC8vY2FjaGUgcmVzcG9uc2UgbGlua3MgYW5kIGNhY2hlIG5hbWUgYXJlIHByZXZpb3VzbHkgc3RvcmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZVN0cjogc3RyaW5nO1xuICAgIGlmKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIHRydWUsIHRydWUpKXtcbiAgICAgIC8vVGhlIExvY2FsIFN0b3JhZ2UgaXMgbnVsbCBvciBlbXB0eS0tPiBDb25maXJtIGhlcmUgdGhlIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBhbnkgQ2FjaGUgU3RvcmFnZSBpdGVtcyBpbiBlcnJvclxuICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KXtcbiAgICAgICAgaWYgKHdpbmRvdy5jYWNoZXMuaGFzKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpKXtcbiAgICAgICAgICAgIHdpbmRvdy5jYWNoZXMuZGVsZXRlKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnd29yZC1jYWNoZXMnKTtcbiAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgLy9jaGVjayB0aGUgd29yZC1jYWNoZSB2YWx1ZSBmb3IgY29ycmVjdCBqc29uIHBhcnNpbmdcbiAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKHN0b3JhZ2VTdHIpKTtcbiAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTZweDsnKTtcbiAgICAgIHRoaXMuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkVVJMKCkge1xuICAgIHJldHVybiB0aGlzLndvcmRVUkw7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIGZldGNoZWQgd29yZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmREYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZERhdGE7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjbGljayBhbmQga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB3aWRnZXQuIElucHV0IGV2ZW50IGxpc3RlbmVycyAnY2xpY2snXG4gICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAqICBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQsIHRoZSB3aWRnZXQgYWRhcHRzIG1hcmt1cCBmb3IgdGhhdCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkEgc2VhcmNoIGVsZW1lbnQgaXMgdW5kZWZpbmVkIGZyb20gc2VhcmNoV29yZCB8IHdvcmRTZWFyY2hcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICBjb25zdCBoaWRlUHJldmlvdXNQYW5lbCA9ICgpID0+IHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgICB9KTtcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIpIHJldHVybjtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIC8vXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAvL0NsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpO1xuICAgICAgfSk7XG4gICAgXG4gICAgLy9cIlJlZnJlc2hcIiBidXR0b24gcmVsb2FkcyB0aGUgcGFnZVxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpIHtcbiAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyO1xuXG4gICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0b3IgYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICBpZiAocGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPT0gbnVsbCB8fFxuICAgICAgRGljdGlvbmFyeVNlYXJjaFdpZGdldC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQsIGJ1dHRvbkNvbnRhaW5lcik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGFueSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCl7XG4gICAgaWYocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpe1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnV0dG9uczogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzW10gPSB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMoRGljdGlvbmFyeVNlYXJjaFdpZGdldC53b3JkU3RvcmFnZSwgYnV0dG9uQ29udGFpbmVyKTtcbiAgICAgIGZvciAobGV0IGJ0biBvZiBwcmV2aW91c3dvcmRidXR0b25zKXtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBidXR0b24uXG4gICAgICAvL3RoaXMgaXMgdGhlIGNhY2hlZCB3b3JkIGJ1dHRlbi4gd2hlbiBpdCdzIGNsaWNrZWQsIGZpcmUgYSB3b3JkIHNlYXJjaFxuICAgICAgYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgdHJ1ZSwgYnRuLndvcmQpO1xuICAgICAgfSk7XG4gICAgICAvL01PQklMRVxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsICgpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0ZSBidXR0b25cbiAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UoYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSB3b3JkIHRvIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBjb250YWluaW5nIHdvcmQgZGF0YSwgVVJMLCBhbmQgY2FjaGluZy5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXZhbHVlIC0gVGhpcyBpbnRlcmZhY2Ugc3RvcmVzIGluZm9ybWF0aW9uIHdoZXJlIHNlbmRpbmcgdG8gTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V2YWx1ZTogbG9jYWxzdG9yYWdld29yZCkge1xuICAgIC8vTG9nIHRoZSB3b3JkIGNhY2hlIGNyZWF0aW9uXG4gICAgY29uc3QgYWRkZWR3b3JkY2FjaGUgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQWRkZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkfWAsIFxuICAgICAgICAnY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuOycpO1xuICAgIH1cbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldmFsdWUnIG5lZWRzIGFkZGVkIHRvIGxvY2FsIHN0b3JhZ2UgY2FjaGVcbiAgICAvL0xvY2FsIHN0b3JhZ2UgbWF5IGJlIGVtcHR5IG9yIGFscmVhZHkgaGF2aW5nIHRoZSB3YW50ZWQgc2VhcmNoZWQgd29yZFxuICAgIC8vQ2hlY2sgc3RvcmFnZSBpcyBub3QgbnVsbC4gSWYgaXQgaXMsIGFkZCB0aGUgd29yZC5cbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaFdpZGdldC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJEaWN0aW9uYXJ5U2VhcmNoXCIsIFwid29yZC1jYWNoZXNcIiwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgICAvL0FkZCB0aGUgc3RvcmFnZSB3b3JkIHRvIGFuIGFycmF5XG4gICAgICAgIGxldCB3b3JkU3RvcmU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IFtdO1xuICAgICAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG4gICAgICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgIGxldCBzdHJpbmdpZnl0ZXN0c2luZ2xld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04od29yZFN0b3JlKSk7XG4gICAgICAgIGlmKCFzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5wYXNzZWQpe1xuICAgICAgICAgIC8vc3RyaW5naWZ5IG9iamVjdCBkaWQgbm90IHdvcmssIHNvIHJldHVyblxuICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBqc29uc3RyID0gc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQucmV0dXJuc3RyO1xuXG4gICAgICAgIC8vIExvY2FsIHN0b3JhZ2UgaXMgZW1wdHkgPT4gYWRkIHRoZSB3b3JkXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgIGFkZGVkd29yZGNhY2hlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0xvY2FsIHN0b3JhZ2UgaXMgbm90IGVtcHR5LiBIZXJlLCB3ZSBuZWVkIHRvIGFkZCB0aGUgd29yZCB0byB0aGUgZXhpc3Rpbmcgd29yZCBjYWNoZS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2hXaWRnZXQud29yZFN0b3JhZ2U7XG4gICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL01hdGNoIHRoZSBjdXJyZW50IFVSTCBmb3IgY2FjaGUgbWFuYWdlbWVudFxuICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSBsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkVVJMKSB7XG4gICAgICAgIC8vV29yZCBpcyBhbHJlYWR5IGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgLy9ObyBuZWVkIHRvIGFkZCBpdCB0byB0aGUgYXJyYXlcbiAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9BZGQgd29yZCB0byBleGlzdGluZyAnd29yZC1jYWNoZXMnIGluIExvY2FsIFN0b3JhZ2VcbiAgICBhbGxjYWNoZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcblxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTihhbGxjYWNoZSkpO1xuICAgIGlmKCFzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZC5wYXNzZWQpe1xuICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnJldHVybnN0cjtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBwcmV2aW91cyB3b3JkIGRhdGEgZnJvbSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSAtLT4gS2V5L1ZhbHVlXG4gICAqIGRhdGEgcmVmZXJlbmNpbmcgd29yZHMgc3RvcmVkIGluIGxvY2FsIGNhY2hlLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdld29yZCAtIHN0cmluZyBmcm9tIFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiIGJ1dHRvblxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdld29yZDogc3RyaW5nKSB7XG4gICAgLy9SZW1vdmUgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZSwgQ2FjaGUgU3RvcmFnZVxuICAgIC8vQ2hlY2sgbG9jYWwgc3RvcmFnZSBpcyBub3QgbnVsbCBvciBlbXB0eVxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0dldCB0aGUgd29yZHMgYXJyYXkgZnJvbSBMb2NhbCBTdG9yYWdlXG4gICAgLy9SV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KFwiRGljdGlvbmFyeVdpZGdldFwiLCBcIndvcmQtY2FjaGVzXCIpOyAvL2xvZyB3aGV0aGVyIGZldGNoZWQgd29yZCBjYWNoZSBpcyBudWxsIG9yIGVtcHR5LlxuICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZFtdID0gRGljdGlvbmFyeVNlYXJjaFdpZGdldC53b3JkU3RvcmFnZTtcbiAgICBcbiAgICAvL1JlbW92ZSB0aGUgd29yZCBmcm9tIENhY2hlIFN0b3JhZ2UgYW5kIExvY2FsIFN0b3JhZ2Ugd29yZCBhcnJheVxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKHdvcmRDYWNoZS53b3JkID09IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkQ2FjaGUud29yZFVSTCk7XG4gICAgICAgIGFsbGNhY2hlLnNwbGljZShhbGxjYWNoZS5pbmRleE9mKHdvcmRDYWNoZSksIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXdvcmR9YCwgXG4gICAgICAgICAgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuOycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsY2FjaGUubGVuZ3RoID09IDApeyAvL1RoZSByZW1vdmVkIHdvcmQgd2FzIHRoZSBsYXN0IHdvcmQgaW4gdGhlIGFycmF5LCBzbyByZW1vdmUgdGhlIGNvbnRhaW5lclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAnY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHdvcmRjYWNoZXNzdHJmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKGFsbGNhY2hlKSk7XG4gICAgaWYgKCF3b3JkY2FjaGVzc3RyZnl0ZXN0LnBhc3NlZCl7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL1JldHVybiByZW1haW5pbmcgd29yZHMgdG8gTG9jYWwgU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgSlNPTi5zdHJpbmdpZnkod29yZGNhY2hlc3N0cmZ5dGVzdC5yZXR1cm5zdHIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmZXRjaCByZXF1ZXN0IGZyb20gQ2FjaGUgU3RvcmFnZS4gVXRpbGl6ZXMgXG4gICAqIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QgZm9yIGNhY2hlIG5hbWUuXG4gICAqIEBwYXJhbSByZW1vdmVVUkwgXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHJlbW92ZVVSTDogVVJMKSB7XG4gICAgd2luZG93LmNhY2hlc1xuICAgIC5vcGVuKERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICBjYWNoZXMubWF0Y2gocmVtb3ZlVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIG1hdGNoaW5nIHRoZSByZXN1bHQuIFJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHJlc3VsdCkpO1xuICAgICAgICAgIGNhY2hlUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhY2hlLmRlbGV0ZShyZW1vdmVVUkwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGR5bmFtaWNhbGx5IHJlY2FsbHMgYSB3b3JkIGRlZmluaXRpb24gcmVxdWVzdCBhbmQgaW5zdGFudGlhdGVzIGFwaUdFVCgpLiBUaGUgXG4gICAqIHJldHVybmVkIHByb21pc2UgYWxzbyBkeW1hbmljYWxseSBhbnN3ZXJzIHRoZSB3aWRnZXQgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgKiBAcGFyYW0gd29yZFVybCAtIFRoZSBmZXRjaCByZXF1ZXN0IFVSTC5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBzZW5kVG9DYWNoZSAtID8gU2VuZCBmZXRjaCByZXF1ZXN0IHRvIENhY2hlIFN0b3JhZ2UgOiBGZXRjaCB3aXRob3V0IHN0b3JpbmcgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBjYWNoZU5hbWUgLSBJZiBzZW5kaW5nIGZldGNoIHJlcXVlc3RzIHRvIGNhY2hlLCBwcm92aWRlIGEgbmFtZSB0byBzdG9yZSBpdCB1bmRlci5cbiAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERpY3Rpb25hcnlUZXJtKHdvcmQ6IHN0cmluZywgd29yZFVybDogVVJMLCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgLy9BIGZ1bmN0aW9uIGNhbGwgcGFyYW1ldGVyIG9wdGlvbiBpcyB0byBzdG9yZSB0aGUgd29yZCByZXF1ZXN0IGluIGJyb3dzZXIncyBDYWNoZSBTdG9yYWdlXG4gICAgLy9TdHJ1Y3R1cmUgdGhlIHdvcmQgZGF0YSB2aWEgJ2xvY2Fsc3RvcmFnZXdvcmR2YWx1ZScgaW50ZXJmYWNlIHVzZWQgdGhyb3VnaG91dCBmZXRjaGluZ1xuICAgIGxldCB3b3JkY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmQgPSB7XG4gICAgICBpbkNhY2hlOiBzZW5kVG9DYWNoZSxcbiAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgY2FjaGVOYW1lOiBzZW5kVG9DYWNoZSA/IGNhY2hlTmFtZSA6IFwiXCIsXG4gICAgfTtcblxuICAgIC8vQXN5bmNocm9ub3VzIGZldGNoIHJlcWV1c3QgYW5kIGR5bmFtaWMgbWFya3VwIGNyZWF0aW9uIGZyb20gdGhlIGRhdGEncyByZXR1cm5cbiAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgLy9DYWxsIGFwaUdFVCgpIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVChcbiAgICAgICAgd29yZGNhY2hlLndvcmRVUkwsXG4gICAgICAgIHdvcmRjYWNoZS5pbkNhY2hlLFxuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0sXG4gICAgICAgIHdvcmRjYWNoZS5jYWNoZU5hbWVcbiAgICAgICk7XG4gICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbjtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgbm9EZWZpbml0aW9ucyA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKGRhdGEpKTtcbiAgICAgICAgaWYoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICAgIH1cbiAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYW4gb2JqZWN0LCBjb25maXJtIGl0IGlzICdubyBkZWZpbml0aW9uJyBzZXJ2ZXIgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgICAgICAvL05vIGRlZmluaXRpb25zIHdlcmUgZm91bmQgd2hlbiBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIGEgdGl0bGUgcHJvcGVydHlcbiAgICAgICAgICAvL3dvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIlxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIiAmJiB3b3JkY2FjaGUuaW5DYWNoZSA9PSB0cnVlKXtcbiAgICAgICAgICAgIC8vVGhlIGRhdGEgc3RyZWFtIGhlcmUgaXMgd2l0aG91dCB3b3JkIGRhdGEuIFRoaXMgZnVuY3Rpb24gYXdhaXRzIHRoZSBhcGkgZmV0Y2gncyBkYXRhXG4gICAgICAgICAgICAvL3RvIGNvbXBsZXRlIHN0b3JhZ2UvcHJvbWlzZSByZXR1cm5zLiBJdCB3YWl0cyA1IHNlY29uZHMgZm9yIHRoZSBicm93c2VyIHRvIGNvbXBsZXRlIGl0cyBzdG9yZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIC8vdGhlbiByZW1vdmVzIHRoZSB1bndhbnRlZCBjYWNoZSByZXF1ZXN0LlxuICAgICAgICAgICAgLy9UT0RPOkJVR1JFU0VBUkNIPT5EdXJpbmcgdGhlIDUgdGltZW91dCwgaWYgdGhlIHBhZ2UgcmVmcmVzaGVzIGEgJ2JhZCB3b3JkJyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgIC8vVGhpcyAnYmFkIHdvcmQnIGNhbiBiZSByZW1vdmVkIGJ5IGRlbGV0aW5nIGFsbCBwcmV2aW91cyB3b3JkcyB2aWEgVUkgYW5kIHJlZnJlc2hpbmcgdGhlIHBhZ2UuIFRoaXMgd2lsbFxuICAgICAgICAgICAgLy8gZmlyZSBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkgdG8gY2xlYXIgYW55IG1pc21hdGNoZWQgd29yZGRhdGE8LS0+Y2FjaGVkcmVxdWVzdHMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9GdW5jdGlvbiBhd2FpdGluZyByZXF1ZXN0J3MgQ2FjaGUgU3RvcmFnZSBjYWNoaW5nXG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZW1vdmUgZnJvbSBDYWNoZSBTdG9yYWdlLiBOYW1lOiBcIiwgd29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IG5vRGVmaW5pdGlvbnMpIHsvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICAvLydCYWQgZGF0YScgZHVlIHRvIFwiTm8gZGVmaW5pdGlvbnMgZm91bmRcIiwgaW52YWxpZCB3b3JkLCBiYWQgbmV0d29yayBjb25uZWN0aW9uXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm9uTGluZSkgey8vT25saW5lLCBwcm9ibGVtIHdpdGggZmV0Y2hcbiAgICAgICAgICAvL09mZmxpbmUgcmVxdWVzdFxuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vRGVmaW5pdGlvbnMpIHsvL1NlcnZlciByZXR1cm5lZCBubyBkZWZpbml0aW9ucyBkYXRhXG4gICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCI7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2Ugey8vSW52YWxpZCB3b3JkIGRhdGFcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgbGV0IHdvcmREYXRhID0gd29yZEZldGNoUmVxdWVzdCgpO1xuICAgIHJldHVybiB3b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gYXdhaXRzIGEgcHJvbWlzZSwgZmV0Y2hpbmcgYSBkaWN0aW9uYXJ5IHRlcm0uIFRoZSBkYXRhIFxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCB3b3JkOiBzdHJpbmcsIHdvcmRVUkw6IFVSTCkge1xuICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgbGV0IHdvcmREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFxuICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZCwgd29yZFVSTCwgc2VhcmNoRWxlbXMsIHRydWUsIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQuQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgICApO1xuICAgIH0pO1xuICAgIHdvcmREYXRhUHJvbWlzZS50aGVuKChkYXRhOiBvYmplY3QpID0+IHtcbiAgICAgIHRoaXMud29yZERhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgc2VhcmNoRWxlbXMpO1xuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IE9iamVjdC5oYXNPd24oZGF0YSwgJ3RpdGxlJykpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JldHJpZXZlZCB3b3JkOiAke3dvcmR9YCwgXG4gICAgICAgICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG4gICAgICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBjbGFzc2VzIGlmIGFwcGxpZWQgcHJldmlvdXNseVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuXG4gICAgXG4gIH1cblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgaXNGcm9tUHJldmlvdXNXb3JkczogYm9vbGVhbiwgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZCB8IG51bGwpIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgY2FjaGVkV29yZC53b3JkLCBjYWNoZWRXb3JkLndvcmRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0LnJlcXVlc3RVcmwpO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCB0aGlzLndvcmRVUkwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSBcIlwiOyAvLyByZXNldCBpbnB1dCBzdHJpbmdcbiAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KXtcbiAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcbiAgfVxuICAvKipcbiAgICogUHJpbWFyeSB3aWRnZXQgbWFya3VwIHN0cnVjdHVyaW5nIHRoZSB3aWRnZXQgZWxlbWVudHMgYW5kIHNlYXJjaCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgYmVmb3JlIHRoZSB3aWRnZXQuXG4gICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgKiAgaW1wb3J0YW50IEhUTUwgZWxlbWVudHMgdXNlZCB0aHJvdWdoIHdpZGdldCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgaWYgKGRpY3Rpb25hcnkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICBjb25zdCBhcnRIID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcblxuICAgIC8vIFJldHVybiBlbGVtZW50cyB1c2VkIGluIGxhdGVyIGZ1bmN0aW9uc1xuICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgcHJldmlvdXNXb3Jkc0NvbnRhaW5lcjogZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxcbiAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgIH07XG4gICAgXG4gICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlNlYXJjaC4uLlwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyLmlkID0gXCJkaWN0aW9uYXJ5LWJ0bnNcIjtcbiAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcblxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMgPSBzZWFyY2hFbGVtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtYXJrdXAgdG8gaG91c2UgcmV0dXJuZWQgd29yZHMgZnJvbSBEaWN0aW9uYXJ5U2VhcmNoLiBUaGUgbWFya3VwXG4gICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAqICBhZGFwdGl2ZSB0byByZXR1cm5lZCB3b3JkIGRhdGEgc3RydWN0dXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHdvcmREYXRhIC0gVGhpcyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IG9mIHdvcmQgdHlwZXMsIGRlZmluaXRpb25zLCBhbmQgZXhhbXBsZXMuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cCh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzKSB7XG4gICAgaWYgKHdvcmREYXRhID09IG51bGwgfHwgISh3b3JkRGF0YSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgJ3RpdGxlJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIlY1RoZXJlIGlzIG5vIGRlZmluaXRpb24gZm9yIHRoaXMgd29yZC5cIiwgXCJjb2xvcjpkYXJrZ3JlZW47XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCB3b3JkIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uRGVzY3JpcHRpb25cIik7XG5cbiAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwid29yZFwiLCB3b3JkLndvcmQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpO1xuXG4gICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb25zIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIixcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vY3JlYXRlIGNsZWFyIGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ3b3JkLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGhvdmVyZWQsIGRpc3BsYXkgaXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIG5vdCBob3ZlcmVkLCBoaWRlIGl0XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgY2xpY2tlZCwgY2xlYXIgdGhlIGVsZW1lbnRzXG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgd29yZDogJHtkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuZ2V0QXR0cmlidXRlKFwid29yZFwiKX1gLCBcbiAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjbGVhciBidXR0b24gdG8gd2lkZ2V0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyAod29yZHN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIGxldCBidXR0b25zYXJyOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9IFtdO1xuICAgIFxuICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgLy9uZWVkZWQgdG8gZGlzcGxheSB0aG9zZSB3b3Jkcy4gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2lkZ2V0IGZ1bmN0aW9uYWxpdHkuXG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIHdvcmRzdG9yYWdlKSB7XG4gICAgICBjb25zdCB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIgPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgY29uc3QgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImRpY3Rpb25hcnktd29yZC1idG5cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuXG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnRuOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgPSB7XG4gICAgICAgIHdvcmQ6IHdvcmRDYWNoZSxcbiAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW06IGNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXI6IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcixcbiAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW06IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgfVxuICAgICAgYnV0dG9uc2Fyci5wdXNoKHByZXZpb3Vzd29yZGJ0bik7XG4gICAgfVxuICAgIHJldHVybiBidXR0b25zYXJyO1xuICB9XG59XG4iLCIvL0F1dGhvcjogUm9iZXJ0IEEgSG93ZWxsLCBBcHJpbCAyMDIzXG4vL09yaWdpbmFsIEF1dGhvcihzKTogTW96aWxsYSBDb250cmlidXRvcnMsIE1ETlxuLy9MaWNlbnNlOiBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9lbi1VUy9hYm91dC9nb3Zlcm5hbmNlL3BvbGljaWVzL3BhcnRpY2lwYXRpb24vXG4vL01ETjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2NyZWF0ZUVsZW1lbnRcbi8vU291cmNlIGRpc3RyaWJ1dGlvbjogaHR0cHM6Ly9naXRodWIuY29tL21kbi93ZWItY29tcG9uZW50cy1leGFtcGxlcy90cmVlL21haW4vZXhwYW5kaW5nLWxpc3Qtd2ViLWNvbXBvbmVudFxuXG4vLyBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlIGVsZW1lbnRcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdMaXN0RWxlbWVudCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gc3VwZXIoKSBpcyBhIHJlZmVyZW5jZSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgICAgICAvLyBsaSBlbGVtZW50cyBjYW4gYmUgY29udGFpbmVycyBpZiB0aGV5IGhhdmUgdWxzIHdpdGhpbiB0aGVtXG4gICAgICAgIGNvbnN0IHVscyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcbiAgICAgICAgY29uc3QgbGlzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgICAgICAvLyBUaGVzZSBsaXN0cyB3aWxsIGJlIHNob3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgaGlnaGVyIGxldmVsIGNvbnRhaW5lclxuICAgICAgICB1bHMuZm9yRWFjaCh1bCA9PiB7XG4gICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb29rIHRocm91Z2ggZWFjaCBsaSBlbGVtZW50IGluIHRoZSB1bFxuICAgICAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLy8gdG8gc2hvdyBhbiBvcGVuIG9yIGNsb3NlZCBpY29uXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGhlIGxpIGVsZW1lbnQncyB0ZXh0IGluIGEgbmV3IHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhc3NpZ24gc3R5bGUgYW5kIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzcGFuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0ZXh0IGZyb20gbGkgdG8gc3Bhbiwgc2V0IGN1cnNvciBzdHlsZVxuICAgICAgICAgICAgICAgIG5ld1NwYW4udGV4dENvbnRlbnQgPSBjaGlsZFRleHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgICAgICAgICBuZXdTcGFuLm9uY2xpY2sgPSB0aGlzLnNob3d1bDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBldmVudC5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgRXhwYW5kaW5nTGlzdEVsZW1lbnQuY291bnQrKztcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8vIFRoaXMgb2JqZWN0IGNyZWF0ZXMgYW4gYXJyYXkgb2YgZGl2cyBmcm9tIGlucHV0IHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIHdpZGdldCBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd2lkZ2V0Y291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyB3aXRoaW4gdGhlIHdpZGdldCBpbnN0YW50aWF0ZWQgW2ZsYXNoY2FyZHNdICovXG4gICAgcHVibGljIHN0YXRpYyB0b3RhbGZsYXNoY2FyZHM6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gICAgcHVibGljIGZsYXNoY2FyZHNjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fcG9ydEluZm9NYXA6IE1hcDxhbnksIHN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPGFueSwgc3RyaW5nPikge1xuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAgPSBwb3J0bnVtYmVyc01hcDtcbiAgICAgICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG4gICAgICAgIEZsYXNoY2FyZENhcmRFbGVtcy53aWRnZXRjb3VudCsrO1xuXG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcC5mb3JFYWNoKCAocG9ydCkgPT4geyBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAgICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpXG4gICAgICAgICAgICBpbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGZsaXBmcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgZmxpcGJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBnYW1lQ2FyZFNwYW4uaW5uZXJUZXh0ID0gYFBvcnQjICR7bWFwSXRlci5uZXh0KCkudmFsdWV9YDtcbiAgICAgICAgICAgIGdhbWVDYXJkQmFja1NwYW4uaW5uZXJUZXh0ID0gYCR7cG9ydH1gO1xuXG4gICAgICAgICAgICB0aGlzLmZsYXNoY2FyZHNjb3VudCsrO1xuICAgICAgICAgICAgRmxhc2hjYXJkQ2FyZEVsZW1zLnRvdGFsZmxhc2hjYXJkcysrO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGl2IHRvIGZsYXNoY2FyZCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5tX2ZsYXNoY2FyZHNBcnIucHVzaChmbGFzaGNhcmQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgR3Jvd2luZ0NhcmRFbGVtZW50IGV4dGVuZHMgSFRNTExJRWxlbWVudCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaXNHcm93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmdyb3dDYXJkKTtcbiAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LmNvdW50Kys7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaHJpbmtDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHsgLy9UT0RPOiBjaGVjayBjbGFzcyBwcm9wZXJ0eVxuICAgICAgICBpZiAobGkuc3R5bGUuc2NhbGUpIHtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnNldElzR3Jvd24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFkZUluYWN0aXZlQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChHcm93aW5nQ2FyZEVsZW1lbnQuZ2V0SXNBdExlYXN0T25lQmlnKCkpIHtcbiAgICAgICAgICAgIGlmICghbGkuZ2V0SXNHcm93bigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi4zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJc0F0TGVhc3RPbmVCaWcgPSAoKSA9PiB7XG4gICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgI3dlYklERUNhcmRzIGxpYCkpO1xuICAgICAgICBsZXQgYXRMZWFzdE9uZUlzQmlnID0gbGlzdExJcy5zb21lKChsaSkgPT4gbGkuZ2V0SXNHcm93bigpID09IHRydWUpO1xuICAgICAgICByZXR1cm4gYXRMZWFzdE9uZUlzQmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJc0dyb3duID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXNHcm93biA9ICh0cnVlZmFsc2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93biA9IHRydWVmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdyb3dDYXJkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0eWxlLnNjYWxlID0gXCIxLjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS56SW5kZXggPSBcIjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIHRoaXMuc2V0SXNHcm93bih0cnVlKTtcblxuICAgICAgICAvLyBHZXQgYWxsIHRoZSBsaXN0IGVsZW1lbnRzIHRvIHJlZmVyZW5jZSB3aGljaCBvbmUgdG8gZ3Jvd1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgICAgIGxldCBsaXN0TElzID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3R5bGUuc2NhbGUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFJXQkVycm9yLmNvdW50Kys7XG4gICAgfTtcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrRWxlbWVudG9yTnVsbChjb21wb25lbnRuYW1lOnN0cmluZywgY2xhc3NuYW1lOiBzdHJpbmcsIGxvZ21lc3NhZ2U/OmJvb2xlYW4sIHN1cHJlc3NleGNlcHRpb24/OmJvb2xlYW4gKSB7XG4gICAgICAgIGxldCBlbGVtOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoc3VwcmVzc2V4Y2VwdGlvbikgc3VwcmVzc2V4Y3B0ID0gdHJ1ZTtcblxuICAgICAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChgQ291bGQgbm90IGdldCBlbGVtZW50OiAke2NsYXNzbmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbSA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGVsZW1lbnQgZm91bmQgd2l0aCBjbGFzcyBuYW1lOiAke2NsYXNzbmFtZX0uYCwgJ2NvbG9yOiB5ZWxsb3c7Jyk7XG4gICAgICAgICAgICBpZiAoIXN1cHJlc3NleGNwdClcbiAgICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfU51bGxSZWZlcmVuY2VgLCBgRWxlbWVudCBub3QgZm91bmRgKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwgKGNvbXBvbmVudG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGNoZWNrZW1wdHlzdHJpbmc/OmJvb2xlYW4sIGxvZ21lc3NhZ2U/OmJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBpZiAoIWxvZ21lc3NhZ2UpIGxvZ21zc2cgPSBsb2dtZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50bmFtZX0uYCwgJ2NvbG9yOnB1cnBsZTsnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja2VtcHR5c3RyaW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiBSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KGNvbXBvbmVudG5hbWUsIGtleSwgbG9nbXNzZyk7XG4gICAgICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnRuYW1lOnN0cmluZywga2V5OnN0cmluZywgbG9nbWVzc2FnZT86Ym9vbGVhbil7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHRlc3Q6IHN0cmluZyB8IG51bGxcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChgQ291bGQgZ2V0IGxvY2FsIHN0b3JhZ2Uga2V5OiAke2tleX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdCA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2Uga2V5IG5vdCBmb3VuZDogJHtrZXl9LmAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfVJlZmVyZW5jZUV4Y2VwdGlvbmAsIGBLZXkgbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QgPT0gXCJcIiB8fCB0ZXN0ID09XCJbXVwiKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudG5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYFZhbHVlIGlzIGVtcHR5YCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBjbGFzcyBSV0JSZWZlcmVuY2VFcnJvciBleHRlbmRzIFJlZmVyZW5jZUVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWZlcnJvcjogUmVmZXJlbmNlRXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IG5ldyBSZWZlcmVuY2VFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBSV0JSZWZlcmVuY2VFcnJvci5jb3VudCsrO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmZXJyb3IpO1xuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBSV0JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWZlcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICBSV0JTeW50YXhFcnJvci5jb3VudCsrO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmZXJyb3IpO1xuICAgIH07XG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgY2xhc3MgUldCRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkb21leGNlcHRpb246IERPTUV4Y2VwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB0aGlzLmRvbWV4Y2VwdGlvbiA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICAgICAgUldCRG9tRXhjZXB0aW9uLmNvdW50Kys7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kb21leGNlcHRpb24pO1xuICAgIH07XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFJXQlN5bnRheEVycm9yIH0gZnJvbSAnLi9SV0JFcnJvckJ1cydcblxuLyoqIEFuIFJXQlBhcnNlSlNPTiBwYXJzZXMganNvbiBhbmQgc3RvcmVzIHRoZSBwYXJzZWQgc3RyaW5nLiAgKi9cbmV4cG9ydCBjbGFzcyBSV0JQYXJzZUpTT04ge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHBhcnNlc3RyOiBzdHJpbmc7XG4gICAgcHVibGljIHJldHVybm9iajogb2JqZWN0O1xuICAgIHB1YmxpYyBwYXNzZWQ6IGJvb2xlYW47XG4gICAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgICAqIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcnNlc3RyOnN0cmluZyl7XG4gICAgICAgIFJXQlBhcnNlSlNPTi5jb3VudCsrO1xuICAgICAgICB0aGlzLnBhcnNlc3RyID0gcGFyc2VzdHI7XG4gICAgICAgIHRoaXMucGFzc2VkID0gdGhpcy5SV0JwYXJzZUpTT04oKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBSV0JwYXJzZUpTT04gKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnJldHVybm9iaiA9IEpTT04ucGFyc2UodGhpcy5wYXJzZXN0cik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJub2JqID0gbnVsbDtcbiAgICAgICAgICAgIG5ldyBSV0JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gcGFyc2VzIGpzb24gYW5kIHN0b3JlcyB0aGUgcGFyc2VkIHN0cmluZy4gICovXG5leHBvcnQgY2xhc3MgUldCU3RyaW5naWZ5SlNPTiB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUganNvbjogYW55O1xuICAgIHB1YmxpYyByZXR1cm5zdHI6IHN0cmluZztcbiAgICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICAgIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICAgKiBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihqc29uOmFueSl7XG4gICAgICAgIFJXQlN0cmluZ2lmeUpTT04uY291bnQrKztcbiAgICAgICAgdGhpcy5qc29uID0ganNvbjtcbiAgICAgICAgdGhpcy5wYXNzZWQgPSB0aGlzLnBhcnNlSlNPTigpO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHBhcnNlSlNPTiAoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5qc29uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5zdHIgPSBudWxsO1xuICAgICAgICAgICAgbmV3IFJXQlN5bnRheEVycm9yKFwiUGFyc2VFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIEhUTUwgbGluayBlbGVtZW50IGRhdGEuIFVzZWQgd2l0aCBhbmNob3IgdGFncy5cbiAqL1xuY2xhc3MgUldCTGluayB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKkhUTUwgdGl0bGUgYXR0cmlidXRlICovXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgLyoqSW5uZXIgdGV4dCBzdHJpbmcgKi9cbiAgICBwdWJsaWMgaW5uZXJUZXh0OiBzdHJpbmc7XG4gICAgLyoqVGhlIHBhZ2UgdGhlIGxpbmsgaXMgYXNzb2NpYXRlZCB0byAqL1xuICAgIHB1YmxpYyBwYWdlTmFtZTogc3RyaW5nO1xuICAgIC8qKkhUTUwgaHJlZiBhdHRyaWJ1dGUgKi9cbiAgICBwdWJsaWMgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2UsXG4gICAgICAgIFJXQkxpbmsuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJXQkxpbms7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4vV2ViQml0XCI7XG5pbXBvcnQgUldCQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9SV0JDYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBSYW5kb21XZWJCaXRzIHtcbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKHNlY3Rpb25UaXRsZTogc3RyaW5nLCBzZWN0aW9uSGVhZGluZ0lEOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGRpdmlzb3Igc2VjdGlvbmFsIGVsZW1lbnRzIHRvIGFwcGVuZCB0byBtYWluXG4gICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsICYmIHBhZ2VNYWluLm5vZGVOYW1lID09PSAnTUFJTicpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjYXJkIHNlY3Rpb24gZWxlbWVudHNcbiAgICAgICAgICAgIC8vIDxzZWN0aW9uIGNsYXNzPVwiY2FyZHNcIj5cbiAgICAgICAgICAgIC8vICAgICA8aDI+QXJiaXRyYXJ5IEFydGljbGVzOjwvaDI+XG4gICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzcz1cImNhcmRfY29sdW1uc1wiPlxuXG4gICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAvLyA8L3NlY3Rpb24+XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICAgICAgICBsZXQgYWFIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhSGVhZGluZyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFDYXJkc1NlY3Rpb24pO1xuICAgICAgICAgICAgcGFnZU1haW4uYXBwZW5kKEFBU2VjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgQUFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc1wiKTtcbiAgICAgICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcmRfY29sdW1ucycpO1xuICAgICAgICAgICAgYWFIZWFkaW5nLmlubmVyVGV4dCA9IGAke3NlY3Rpb25UaXRsZX1gO1xuICAgICAgICAgICAgYWFIZWFkaW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIHNlY3Rpb25IZWFkaW5nSUQpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWFDYXJkc1NlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1haW4gZWxlbWVudCBleGlzdHMgb24gdGhlIHBhZ2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBidWlsZFJXQkNhcmRzKGNhcmRzRGF0YTogV2ViQml0W10pIHtcbiAgICAgICAgLy8gSXRlcmF0ZSBlYWNoIGNhcmQgaW4gdGhlIGFycmF5LiBCdWlsZCB0aGUgY2FyZCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgIGxldCBBQXMgPSBjYXJkc0RhdGEubWFwKChhcnRpY2xlOiBXZWJCaXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJ3YmNhcmQgPSBuZXcgUldCQ2FyZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJ3YmNhcmQuYnVpbGRSV0JDYXJkTWFya3VwKGFydGljbGUpOztcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RhcnRNYXJrOiBQZXJmb3JtYW5jZU1hcmssXG4gICAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrLFxufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCUGVyZiB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc2NyaXB0cnVudGltZW1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICBzdGFydE1hcms6IG51bGwsXG4gICAgICAgIGVuZE1hcms6IG51bGxcbiAgICB9O1xuXG4gICAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuIENhbGwgU3JpcHRQZXJmLmVuZCgpXG4gICAgICogdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC5cbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBzY3JpcHRuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lID0gc2NyaXB0bmFtZTtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1zdGFydGApO1xuICAgICAgICBSV0JQZXJmLmNvdW50Kys7XG4gICAgfVxuXG4gICAgcHVibGljIGVuZCgpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5lbmRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1lbmRgKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlKCk7XG4gICAgfVxuXG4gICAgLyoqIEEgY29uc29sZSBvdXRwdXQgb2YgdGhpcyBvYmplY3QncyBwZXJmb3JtYW5jZSBtZWFzdXJlbWVudC4gKi9cbiAgICBwcml2YXRlIG1lYXN1cmUoKXtcbiAgICAgICAgbGV0IG1lYXN1cmUgPSBwZXJmb3JtYW5jZS5tZWFzdXJlKCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lLCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5zdGFydE1hcmsubmFtZSwgdGhpcy5zY3JpcHRydW50aW1lbWFya3MuZW5kTWFyay5uYW1lKVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coYCR7dGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZX0gZXhlY3V0aW9uIHRpbWUgaXM6ICR7bWVhc3VyZS5kdXJhdGlvbn1gKTtcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0RWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdldG9kb2NhY2hlIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBSV0JQYXJzZUpTT04gfSBmcm9tIFwiLi9SV0JKU09OQ29udmVydGVyXCI7XG5pbXBvcnQgUldCRXJyb3IgZnJvbSBcIi4vUldCRXJyb3JCdXNcIjtcblxuLyoqXG4gKiBBIFRvRG9MaXN0IGlzIGFuIEhUTUwgd2lkZ2V0IHRvIHN0b3JlIFRvLURvcyBpbiB0aGUgYnJvd3Nlci4gSW5zdGFudGlhdGUgdGhlXG4gKiAgVG9Eb0xpc3QgY29uc3RydWN0b3IgdG8gY3JlYXRlIHdpZGdldCBtYXJrdXAgYW5kIGZ1bmN0aW9uYWxpdHkuIFRvLURvcyBhcmVcbiAqICBzdG9yZWQgaW4gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGFuZCByZWFkIGFuZCByZW5kZXJlZCB3aGVuIHRoZSBwYWdlIGxvYWRzLlxuICogXG4gKiBUbyBjcmVhdGUgYSBUb0RvTGlzdCwgYW4gZWxlbWVudCBvbiB0aGUgcGFnZSBtdXN0IGhhdmUgJy5Ub0RvTGlzdCcgY2xhc3MuIENhbGwgdGhlXG4gKiAgY2xhc3MgY29uc3RydWN0b3IsIHBhc3NpbmcgaW4gdGhhdCBlbGVtZW50IHRvIGNyZWF0ZSB0aGUgd2lkZ2V0LlxuICpcbiAqICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcbiAqICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbSk7XG4gKiBcbiAqIFRoZW4sIHRoZSB3aWRnZXQgaXMgY3JlYXRlZCBhbmQgVG8tRG9zIGFyZSByZXRyaWV2ZWQgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgVG9Eb0xpc3Qge1xuICAgIC8qKlRvdGFsIG51bWJlciBvZiBUb0RPcyovXG4gICAgcHVibGljIHN0YXRpYyBUb0RPczogbnVtYmVyID0gMDtcbiAgICAvKipXaWRnZXQgZWxlbWVudHMgdXNlZCB0byBwb3B1bGF0ZSB0b2RvcyAqL1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvSW5TdG9yYWdlOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGVbXTtcbiAgICAvKipUb2RvIEhUTUwgZWxlbWVudHMgKi9cbiAgICBwcml2YXRlIGxpc3RFbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAgICogXG4gICAgICogICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHNcbiAgICAgKiBAcGFyYW0gVG9Eb0VsZW1lbnRzIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9Eb0xpc3RFbGVtZW50cyhUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMpIHtcbiAgICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJhbmRvbSBXZWIgQml0cyB1c2VzIG11bHRpcGxlIGxvY2F0aW9ucyB0byBhcHBseSB0aGUgVG8tRG8gTGlzdCB3aWRnZXQuIENyZWF0ZVxuICAgICAqICB0aGUgbGlzdCBtYXJrdXAsIHBhc3NpbmcgaW4gYSByZWZlcmVuY2UgZWxlbWVudCBmb3IgcGxhY2VtZW50IG9mIHRoZSB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgLy9JbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgICAgIC8vU3dpdGNoIGFnYWluc3QgdGhlIGN1cnJlbnQgcGFnZSB0byBkZXRlcm1pbmUgbWFya3VwIG5lZWRlZFxuICAgICAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiVG9Eb0xpc3RcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCwgXCJjb2xvcjpvcmFuZ2U7XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJUb0RvTGlzdFwiKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEFkZCBcIlRvRG9MaXN0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy8nOlxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJy9kaXN0L2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgICAgIC8vTWFya3VwIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb2xpc3RTZWN0aW9uID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rmb290JykpO1xuICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiVmFsdWVcIiwgXCJBZGRcIik7XG4gICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgICAgICAgICB0b2RvbGlzdFNlY3Rpb24uaWQgPSBcIlRvRE9cIjtcbiAgICAgICAgICAgICAgICB0aGxlZnQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlP1wiO1xuICAgICAgICAgICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICAgICAgICAgIHRib2R5LmlkID0gXCJUb0RvSXRlbXNcIjtcbiAgICAgICAgICAgICAgICB0ZDNJTi5pZCA9IFwiQWRkQnV0dG9uXCI7XG4gICAgICAgICAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIChpdCBpcyBub3Qgc3RvcmVkIGluIGNhY2hlKVxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8odGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvdG9kb3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgLy9NYXJrdXAgZXhpc3RzIG9uIHRoZSBwYWdlIGFscmVhZHlcbiAgICAgICAgICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSBkdWUgdG8gY2FjaGUgZW1wdHlcbiAgICAgICAgICAgICAgICBjb25zdCBodGJvZHkgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlQm9keTtcbiAgICAgICAgICAgICAgICBpZiAoaHRib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19EbyhodGJvZHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgICAgIC8vR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldFxuICAgICAgICAvL0VhY2ggd2lkZ2V0IGxvY2F0aW9uJ3MgZWxlbWVudHMgbWF5IHZhcnksIHNvIGEgY2FsbCBvZiBnZXRUb0RvTGlzdEVsZW1lbnRzKClcbiAgICAgICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgICAgIGxldCBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHMgPSB7XG4gICAgICAgICAgICB0b2RvVGFibGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRhYmxlJyksXG4gICAgICAgICAgICB0b2RvVGFibGVCb2R5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVG9Eb0l0ZW1zJyksXG4gICAgICAgICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBZGRCdXR0b24nKSxcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0VudGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaXRlbUlOUFVUXCJdJyksXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0RWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIG9yIGZhbHNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VG9Eb0luU3RvcmFnZShjaGVja2VtcHR5dmFsdWVzdHJpbmc6Ym9vbGVhbiwgbG9nbWVzc2FnZTpib29sZWFuKSB7XG4gICAgICAgIGlmIChSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIlRvRG9MaXN0XCIsIFwiVG9Eb3NcIiwgY2hlY2tlbXB0eXZhbHVlc3RyaW5nLCBsb2dtZXNzYWdlKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcnNlc3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04ocGFyc2VzdHIpKTtcbiAgICAgICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKXtcbiAgICAgICAgICAgIC8vcGFyc2VkIEpTT04gaXMgbWFsZm9ybWVkXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5Ub0RvSW5TdG9yYWdlID0gcGFyc2V0ZXN0LnJldHVybnN0clxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBUby1EbyB0byBMb2NhbCBTdG9yYWdlLiBcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBUaGUgVUkgZm9ybSBpbnB1dCBkZXNjcmlwdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgICAgICAvL0FkZCB0aGUgVG9Eb3MgYXJyYXkgdG8gbG9jYWwgY2FjaGUuXG4gICAgICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V0b2RvY2FjaGUnIGludGVyZmFjZSBzdHJ1Y3R1cmVzIHRoZSBkYXRhIGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICAgICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICAgICAgfVxuICAgICAgICBsZXQgVG9Eb3M6IGFueSA9IFtdOyAvL1RvRG8gYXJyYXlcbiAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcbiAgICAgICAgXG4gICAgICAgIC8vRmlyc3QsIHJlYWQgY3VycmVudCBMb2NhbCBTdG9yYWdlIFRvRG9zXG4gICAgICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKVxuICAgICAgICBsZXQgdG9kb3M6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgICAgaWYgKHRvZG9zID09IG51bGwpIHsvL05vdGhpbmcgaW4gc3RvcmFnZSwgcHVzaCBjdXJyZW50XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeShUb0RvcykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gY2FjaGUga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7Ly9BZGQgdGhlIG5ldyBUb0RvIHRvIHRoZSBjdXJyZW50IFRvRG9zIGFuZCBwdXNoIHZpYSBzZXRJdGVtKClcbiAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNBZGRlZCB0by1kbyBjYWNoZTogJHtkZXNjcmlwdGlvbn1gLCAnY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuOycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHRvZG8gY2FjaGU6ICR7aXRlbX1gLCAnY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Jyk7XG4gICAgICAgIGxldCBqc29uc3RyID0gSlNPTi5zdHJpbmdpZnkoVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZSlcbiAgICAgICAgaWYgKGpzb25zdHIgPT0gXCJcIiB8fCBqc29uc3RyID09IFwiW11cIil7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBqc29uc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgdG8gYWRkIGEgcm93IHRvIHRoZSBUby1EbyB0YWJsZS5cbiAgICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIGZpcnN0UGFpbnQgLSBCb29sZWFuIHZhbHVlIHVzZWQgYnkgYWRkaW5nIGxpc3Qgc3RvcmFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IFRBQkxFSVRFTSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgZmlyc3QgZGF0YVxuICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSB0aGlyZCBkYXRhXG4gICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvTGlzdC5Ub0RPcyA/ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9MaXN0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG5cbiAgICAgICAgLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgdGhlIFRvLURvIGl0ZW0gcm93cyBmcm9tIFRvLURvcyBzdG9yZWQgaW4gdGhlIGJyb3dzZXIgTG9jYWwgU3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgICAgIGlmIChUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlW2ldLnRvZG9pdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYnV0dG9uIGZ1bmN0aW9uYWxpdHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRCdXR0b247XG4gICAgICAgIGNvbnN0IEFERElURU1FTlRFUiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRJdGVtVG9FbnRlcjtcbiAgICAgICAgaWYgKEFEREJVVFRPTiA9PSBudWxsICYmIEFERElURU1FTlRFUiA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGVtZW50IHdhcyBub3QgZm91bmQgb3IgaXMgbnVsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvKipBZGQgaW5wdXQgdGV4dCB0byB0aGUgdG9kbyBsaXN0IGZyb20gY2xpY2tpbmcgdGhlIGFkZCBidXR0b24qL1xuICAgICAgICBBRERCVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICAvKipBZGQgaW5wdXQgdGV4dCB0byB0aGUgdG9kbyBsaXN0IHdoZW4gdXNpbmcga2V5IGVudGVyKi9cbiAgICAgICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZS5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAgICogIG5vdCByZW1vdmVkIGZyb20gc3RvcmFnZSB3aXRob3V0ICdDb21wbGV0ZT8nIGNoZWNrZWJveCBjaGVja2VkLlxuICAgICAqIEBwYXJhbSBib3ggaW5wdXQgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgRGVsZXRlQnV0dG9uKGJveDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoYm94LnBhcmVudE5vZGUgPT0gbnVsbCB8fCBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCB8fFxuICAgICAgICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhIHRhYmxlIGVsZW1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PmJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIC8qKiBJbnB1dCBlbGVtZW50ICovXG4gICAgICAgIGNvbnN0IHJvd0Noa0J4SU4gPSA8SFRNTElucHV0RWxlbWVudD5yb3dDaGtCeC5jaGlsZE5vZGVzWzBdOyBcbiAgICAgICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgY29uc3QgdHI6IEhUTUxUYWJsZVJvd0VsZW1lbnQgPSA8SFRNTFRhYmxlUm93RWxlbWVudD5ib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgaSA9IHRyLnJvd0luZGV4O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgICAgICAgLy9yZW1vdmUgcm93IHNpbmNlIGNvbXBsZXRlZFxuICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gJ0FkZCBhIFRvRE8gSXRlbS4nKSB7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcblxuICAgICAgICAgICAgICAgIC8vZGVsZXRlIGFzc29jaWF0ZWQgc3RvcmFnZSBpdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZW1vdmVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gc2VlZCB0aGUgVG8tRG8gTGlzdCB3aGVuIHRoZXJlIGFyZSBubyBMb2NhbCBTdG9yYWdlIGl0ZW1zXG4gICAgICogIHdoaWNoIHdvdWxkIHBvcHVsYXRlIHRoZSBsaXN0LiBUaGUgc2FtcGxlIHJlbWFpbnMgb24gcGFnZSBidXQgaXMgbmV2ZXIgc3RvcmVkIGluIHRoZSBicm93c2VyLlxuICAgICAqIEBwYXJhbSB0Ym9keSB0YWJsZSBib2R5IGVsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5OiBFbGVtZW50KSB7XG4gICAgICAgIGlmKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIHRydWUpKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgZW50cnkgaW4gdGhlIFRvRG8gdGFibGUgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgY29uc3QgdGQybGVmdCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgY29uc3QgdGQySU4gPSB0ZDJsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuICAgICAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgIGNvbnN0IHRkMnJpZ2h0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICBjb25zdCB0ZDJERUwgPSB0ZDJyaWdodC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgICAgICB0ZDJtaWRkbGUuc2V0QXR0cmlidXRlKFwibnVtXCIsIGAkezF9YCk7XG4gICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmVzZXRcIik7XG4gICAgICAgIHRkMkRFTC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgdGQybWlkZGxlLnRleHRDb250ZW50ID0gXCJBZGQgYSBUb0RPIEl0ZW0uXCI7XG4gICAgICAgIFRvRG9MaXN0LlRvRE9zKys7XG5cbiAgICAgICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRkMkRFTC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcbiAgICAgICAgICAgIHRoaXMuRGVsZXRlQnV0dG9uKHRkMkRFTCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmVtb3ZlZCB0b2RvOiAke3RkMkRFTC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOnB1cnBsZTtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpwdXJwbGU7Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi9BdHRyaWJ1dGlvbkxpbmtcIjtcbi8qKlxuICogVGhpcyBjbGFzcyBob2xkcyB0aGUgZGF0YSBmb3IgJ1dlYkJpdCcgYXJ0aWNsZSBjYXJkcy4gS2V5IGluZm9ybWF0aW9uXG4gKiBvZiB0aGUgYXJ0aWNsZSdzIGNvbnRlbnRzIGFyZSBjb250YWluZWQ6IG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRhIGNyZWF0ZWQsXG4gKiBldGMuXG4gKi9cbmNsYXNzIFdlYkJpdCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBhcnRpY2xlTnVtYmVyOiBudW1iZXI7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwdWJsaWMgZGF0ZUNyZWF0ZWQ6IERhdGU7XG4gICAgcHVibGljIGFydGljbGVMaW5rOiBzdHJpbmc7XG4gICAgcHVibGljIGNhcmRJbWFnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBjYXJkSW1hZ2VBTFQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGlua0F0dHJpYnV0aW9uOiBBdHRyaWJ1dGlvbkxpbms7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXJ0aWNsZU51bWJlcjogbnVtYmVyLFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBEYXRlLFxuICAgICAgICBhcnRpY2xlTGluazogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2U6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlQUxUOiBzdHJpbmcsXG4gICAgICAgIGxpbmtBdHRyaWJ1dGlvbj86IEF0dHJpYnV0aW9uTGluayxcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFydGljbGVOdW1iZXIgPSBhcnRpY2xlTnVtYmVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBkYXRlQ3JlYXRlZDtcbiAgICAgICAgdGhpcy5hcnRpY2xlTGluayA9IGFydGljbGVMaW5rO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZSA9IGNhcmRJbWFnZTtcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2VBTFQgPSBjYXJkSW1hZ2VBTFQ7XG4gICAgICAgIHRoaXMubGlua0F0dHJpYnV0aW9uID0gbGlua0F0dHJpYnV0aW9uO1xuICAgICAgICBXZWJCaXQuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkJpdDtcbiJdfQ==

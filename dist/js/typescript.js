(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const ToDosWidget_1 = require("./ToDosWidget");
const DictionaryWidget_1 = require("./DictionaryWidget");
const ScriptPerf_1 = require("../models/ScriptPerf");
const RWBErrorBus_1 = require("../models/RWBErrorBus");
const ClassComponents = {
    init: () => {
        const classperf = new ScriptPerf_1.default("Classcomponents"); //begin performance measure
        // Add Dictionary Widget if an element with that class is on a page
        if (!RWBErrorBus_1.default.checkElementorNull("ClassComponent", "dictionaryWidget", true, true))
            DictionaryWidget_1.default.init();
        // Add ToDos widget if an element with that class is on a page
        if (!RWBErrorBus_1.default.checkElementorNull("ClassComponent", "ToDoList", true, true))
            ToDosWidget_1.default.init();
        classperf.end(); //end performance measure
    }
};
exports.default = ClassComponents;

},{"../models/RWBErrorBus":31,"../models/ScriptPerf":35,"./DictionaryWidget":2,"./ToDosWidget":10}],2:[function(require,module,exports){
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
        Object.create(new DictionarySearch_1.DictionarySearch(dictionaryWidgetStartingElement));
    }
};
exports.default = DictionaryWidget;

},{"../models/DictionarySearch":26}],3:[function(require,module,exports){
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

},{"../models/ExpandingList":28}],4:[function(require,module,exports){
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

},{"../data/portnums":21,"../models/FlashcardCardElems":29}],5:[function(require,module,exports){
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

},{"../models/GrowingCard":30}],6:[function(require,module,exports){
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
            HeaderFooter.footerWidget.buildDeveloperAttribution(footer);
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
        },
        buildDeveloperAttribution: (footer) => {
            const devattrib = document.createElement("div");
            const dev = document.createElement("p");
            dev.textContent = 'Developed by Robert Howell';
            devattrib.append(dev);
            footer.appendChild(devattrib);
            return;
        }
    }
};
exports.default = HeaderFooter;

},{"../data/navitems":20,"../models/ScriptPerf":35}],7:[function(require,module,exports){
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
const hslcolor_1 = require("./hslcolor");
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
                break;
            // dom.html, svg.html page uses expandingLists component
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
            // Initialize HSL color picker
            case '/pages/hsl.html':
                hslcolor_1.default.inithslcolorpicker();
        }
    }
};
exports.default = PageComponents;

},{"../models/ScriptPerf":35,"./ExpandingListDOMWidget":3,"./FlashcardGameWidget":4,"./GrowingCard":5,"./SlideShowWidget":9,"./WebBits":11,"./colorcode":12,"./colorcodeurl":13,"./cssex":14,"./domainlookup":15,"./hslcolor":16,"./sliderbar":18}],8:[function(require,module,exports){
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

},{"../models/ToDo":36}],11:[function(require,module,exports){
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

},{"../data/data":19,"../models/RandomWebBits":34}],12:[function(require,module,exports){
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

},{"../models/ColorCode":25}],13:[function(require,module,exports){
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

},{"../models/ColorCode":25}],14:[function(require,module,exports){
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

},{"../models/ColorCode":25}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const RWBErrorBus_1 = require("../models/RWBErrorBus");
const domainlookup = {
    init: () => {
        // Get the form, assign to a variable
        let formelemclassname = 'searchWhoIS';
        let form;
        form = document.getElementById(`${formelemclassname}`);
        if (form == null) {
            new RWBErrorBus_1.RWBReferenceError("ElementNotFound", `Element not found: '${formelemclassname}':`);
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

},{"../models/RWBErrorBus":31}],16:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const hslcolorwidget = {
    inithslcolorpicker: () => {
        let HSLONE = document.querySelector("#HSLColorONE");
        let HSLTWO = document.querySelector("#HSLColorTWO");
        let HSLTHREE = document.querySelector("#HSLColorTHREE");
        class boxcolor {
            hue = 0;
            saturation = 100;
            lightness = 50;
            constructor(hue = 0, saturation = 100, lightness = 50) {
                if (hue == 0) {
                    this.hue = 0;
                }
                else if (hue == 120) {
                    this.hue = 120;
                }
                else if (hue == 240) {
                    this.hue = 240;
                }
                if (hue < 0 || hue >= 360 || saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100) {
                    let err = new RangeError();
                    console.log(`%c<RWB>%cHSL color value out of acceptable range:\n%o\n%c</RWB>`, 'color:gray;font-weight:bold;', 'color:gray;', err, 'color:gray;font-weight:bold;');
                }
                this.saturation = saturation;
                this.lightness = lightness;
            }
        }
        let red = 0;
        let green = 120;
        let blue = 240;
        let HSLBoxColorRed = Object.create(new boxcolor(red, 100, 50));
        let HSLBoxColorGreen = Object.create(new boxcolor(green, 100, 50));
        let HSLBoxColorBlue = Object.create(new boxcolor(blue, 100, 50));
        let toprecthue = document.querySelector('#HSLColorONE span.val1');
        let toprectsat = document.querySelector('#HSLColorONE span.val2');
        let toprectlight = document.querySelector('#HSLColorONE span.val3');
        let midrecthue = document.querySelector('#HSLColorTWO span.val1');
        let midrectsat = document.querySelector('#HSLColorTWO span.val2');
        let midrectlight = document.querySelector('#HSLColorTWO span.val3');
        let botrecthue = document.querySelector('#HSLColorTHREE span.val1');
        let botrectsat = document.querySelector('#HSLColorTHREE span.val2');
        let botrectlight = document.querySelector('#HSLColorTHREE span.val3');
        toprecthue.textContent = HSLBoxColorRed.hue;
        toprectsat.textContent = HSLBoxColorRed.saturation;
        toprectlight.textContent = HSLBoxColorRed.lightness;
        midrecthue.textContent = HSLBoxColorGreen.hue;
        midrectsat.textContent = HSLBoxColorGreen.saturation;
        midrectlight.textContent = HSLBoxColorGreen.lightness;
        botrecthue.textContent = HSLBoxColorBlue.hue;
        botrectsat.textContent = HSLBoxColorBlue.saturation;
        botrectlight.textContent = HSLBoxColorBlue.lightness;
        HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${HSLBoxColorRed.saturation}%, ${HSLBoxColorRed.lightness}%)`;
        HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${HSLBoxColorGreen.saturation}%, ${HSLBoxColorGreen.lightness}%)`;
        HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${HSLBoxColorBlue.saturation}%, ${HSLBoxColorBlue.lightness}%)`;
        const HueSldr = document.querySelector(`#Hue`);
        const SaturationSldr = document.querySelector(`#Saturation`);
        const LightnessSldr = document.querySelector(`#Lightness`);
        HueSldr.addEventListener("input", () => {
            let hueinputvalue = HueSldr.value;
            HSLONE.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorRed.saturation}%, ${HSLBoxColorRed.lightness}%)`;
            HSLTWO.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorGreen.saturation}%, ${HSLBoxColorGreen.lightness}%)`;
            HSLTHREE.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorBlue.saturation}%, ${HSLBoxColorBlue.lightness}%)`;
            HSLBoxColorRed.hue = hueinputvalue;
            HSLBoxColorGreen.hue = hueinputvalue;
            HSLBoxColorBlue.hue = hueinputvalue;
            toprecthue.textContent = HSLBoxColorRed.hue;
            midrecthue.textContent = HSLBoxColorGreen.hue;
            botrecthue.textContent = HSLBoxColorBlue.hue;
        });
        SaturationSldr.addEventListener("input", () => {
            let saturationinputvalue = SaturationSldr.value;
            HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${saturationinputvalue}%, ${HSLBoxColorRed.lightness}%)`;
            HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${saturationinputvalue}%, ${HSLBoxColorGreen.lightness}%)`;
            HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${saturationinputvalue}%, ${HSLBoxColorBlue.lightness}%)`;
            HSLBoxColorRed.saturation = saturationinputvalue;
            HSLBoxColorGreen.saturation = saturationinputvalue;
            HSLBoxColorBlue.saturation = saturationinputvalue;
            toprectsat.textContent = HSLBoxColorRed.saturation;
            midrectsat.textContent = HSLBoxColorGreen.saturation;
            botrectsat.textContent = HSLBoxColorBlue.saturation;
        });
        LightnessSldr.addEventListener("input", () => {
            let lightinputvalue = LightnessSldr.value;
            HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${HSLBoxColorRed.saturation}%, ${lightinputvalue}%)`;
            HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${HSLBoxColorGreen.saturation}%, ${lightinputvalue}%)`;
            HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${HSLBoxColorBlue.saturation}%, ${lightinputvalue}%)`;
            HSLBoxColorRed.lightness = lightinputvalue;
            HSLBoxColorGreen.lightness = lightinputvalue;
            HSLBoxColorBlue.lightness = lightinputvalue;
            toprectlight.textContent = HSLBoxColorRed.lightness;
            midrectlight.textContent = HSLBoxColorGreen.lightness;
            botrectlight.textContent = HSLBoxColorBlue.lightness;
        });
    }
};
exports.default = hslcolorwidget;

},{}],17:[function(require,module,exports){
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

},{"../models/ScriptPerf":35}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
const ArbitraryArticles = new Array(new WebBit_1.default("Domainlookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new WebBit_1.default("Htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2)), new WebBit_1.default("Httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "pages/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new WebBit_1.default("Webtech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("Jsonobject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("Chatgpt", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new WebBit_1.default("Paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new WebBit_1.default("Boinc", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new WebBit_1.default("IPAddress", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new WebBit_1.default("HTMLMarkup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new WebBit_1.default("Networkspeed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new WebBit_1.default("PowerShelldrives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new WebBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new WebBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon", new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new WebBit_1.default("Webide", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new WebBit_1.default("Disable_Javascript", 26, "Disable JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new WebBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new AttributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new WebBit_1.default("CSSdef", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new AttributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new WebBit_1.default("Latency", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new AttributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)), new WebBit_1.default("HTMLdef", 33, "Create HTML elements", "Learn the parts and syntax of an HTML element", new Date(2023, 7, 25), "pages/html.html", "img/html.webp", "HTML element syntax icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "Create HTML elements", 33)), new WebBit_1.default("URL", 34, "URL Address Examples", "Learn the parts and syntax of a URL", new Date(2023, 8, 7), "pages/url.html", "img/www.webp", "URL example icon", new AttributionLink_1.default("url icons", "Url icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/url", "Flaticon", "Create HTML elements", 34)), new WebBit_1.default("DataStorage", 35, "Data Storage", "Local storage saves data when needed for concurrent page surfing.", new Date(2023, 8, 14), "pages/datastorage.html", "img/server.webp", "Data storage icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "Data Storage", 35)), new WebBit_1.default("HSL", 36, "Hue, Saturation, and Lightness", "HSL colors manipulate hues.", new Date(2023, 9, 6), "pages/hsl.html", "img/color-wheel.webp", "Color wheel icon", new AttributionLink_1.default("variety icons", "Variety icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/variety", "Flaticon", "Hue, Saturation, and Lightness", 36)));
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

},{"../models/AttributionLink":24,"../models/WebBit":37}],20:[function(require,module,exports){
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

},{"../models/RWBLink":33}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./components/ClassComponents":1,"./components/HeaderFooter":6,"./components/PageComponents":7,"./components/mobileMarkup":17,"./models/ScriptPerf":35}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./RWBLink":33}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionarySearch = void 0;
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
class DictionarySearch extends DictionarySearchMarkup_1.default {
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
                if (window.caches.has(DictionarySearch.CacheStorageNameofWordRequest)) {
                    window.caches.delete(DictionarySearch.CacheStorageNameofWordRequest);
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
            DictionarySearch.wordStorage == null) {
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
        if (DictionarySearch.wordStorage == null) {
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
                console.log(`%c<RWB>%cCreated storage key: word-caches`, 'color:cyan;font-size:14px;font-weight:bold;', 'color:cyan;font-size:16px;');
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
        localStorage.setItem("word-caches", wordcachesstrfytest.returnstr);
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
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, true, DictionarySearch.CacheStorageNameofWordRequest));
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

},{"../models/API":23,"./DictionarySearchMarkup":27,"./RWBErrorBus":31,"./RWBJSONConverter":32}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
// This object creates an array of divs from port number information
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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
        let logmssg = true; //Log message option default
        if (!logmessage)
            logmssg = logmessage;
        let supressexcpt = false; //Supress message option default
        if (supressexception)
            supressexcpt = true;
        let query = `.${classname}`;
        // Add dictionary widget if an element with that class is on a page
        try {
            elem = document.querySelector(query);
        }
        catch {
            Object.create(new RWBReferenceError("GetElement", `Could not get element: '${query}'`));
        }
        if (elem == null) {
            if (logmssg)
                console.log(`%cNo element found with class name: ${query}.`, 'color: yellow;');
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
/** Create this object to store reference error data. */
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
        let err = new ReferenceError(this.message);
        this.referror = err;
        console.log(`%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`, 'color:red;font-weight:bold;', 'color:red;', err, 'color:red;font-weight:bold;');
        RWBReferenceError.count++;
    }
    ;
}
exports.RWBReferenceError = RWBReferenceError;
/** Create this object to store syntax error data. */
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
        // let err = new RangeError();
        // console.log(`%c<RWB>%cHSL color value out of acceptable range:\n%o\n%c</RWB>`, 
        // 'color:gray;font-weight:bold;', 'color:gray;', err, 'color:gray;font-weight:bold;');
        let err = new SyntaxError(this.message);
        this.referror = err;
        console.log(`%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`, 'color:red;font-weight:bold;', 'color:red;', err, 'color:red;font-weight:bold;');
        RWBSyntaxError.count++;
    }
    ;
}
exports.RWBSyntaxError = RWBSyntaxError;
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

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RWBStringifyJSON = exports.RWBParseJSON = void 0;
//--Copyright (c) 2023 Robert A. Howell
const RWBErrorBus_1 = require("./RWBErrorBus");
/** An RWBParseJSON parses json and stores the parsed string with the result. */
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
/** An RWBParseJSON tests whether an object can be stringified into a valid
 * json string. */
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

},{"./RWBErrorBus":31}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"../components/RWBCard":8}],35:[function(require,module,exports){
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
    /** Instantiating a ScriptPerf records the performance start mark. */
    constructor(scriptname) {
        this.scriptruntimemarks.name = scriptname;
        this.scriptruntimemarks.startMark = performance.mark(`${this.scriptruntimemarks.name}-start`);
        RWBPerf.count++;
    }
    /** Call end() to set the end time stamp. */
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

},{}],36:[function(require,module,exports){
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
        this.ToDoInStorage = parsetest.returnobj;
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
        let strgfy;
        const stringifytodo = (todostr) => {
            //Call RWBStringifyJSON to stringify the object
            let todosstrgfytest = Object.create(new RWBJSONConverter_1.RWBStringifyJSON(todostr));
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
            localStorage.setItem('ToDos', strgfy);
        }
        else {
            ToDos.push(ToDo);
            //Call RWBStringifyJSON to stringify the object
            strgfy = stringifytodo(ToDos);
            localStorage.setItem('ToDos', strgfy);
            console.log(`%c<RWB>%cCreated to-do cache key: ToDos`, 'color:cyan;font-size:14px;font-weight:bold;', 'color:cyan;font-size:16px;');
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
        let todoinstoragestrgfytest = Object.create(new RWBJSONConverter_1.RWBStringifyJSON(ToDoList.ToDoInStorage));
        if (!todoinstoragestrgfytest.passed) {
            //LOGLEAF
            return;
        }
        let jsonstr = todoinstoragestrgfytest.returnstr;
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
        if (ToDoList.getToDoInStorage(true, false)) {
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

},{"./RWBErrorBus":31,"./RWBJSONConverter":32}],37:[function(require,module,exports){
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

},{}]},{},[22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZXVybC50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2NvbXBvbmVudHMvZG9tYWlubG9va3VwLnRzIiwic3JjL2NvbXBvbmVudHMvaHNsY29sb3IudHMiLCJzcmMvY29tcG9uZW50cy9tb2JpbGVNYXJrdXAudHMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXJiYXIudHMiLCJzcmMvZGF0YS9kYXRhLnRzIiwic3JjL2RhdGEvbmF2aXRlbXMudHMiLCJzcmMvZGF0YS9wb3J0bnVtcy50cyIsInNyYy9tYWluLnRzIiwic3JjL21vZGVscy9BUEkudHMiLCJzcmMvbW9kZWxzL0F0dHJpYnV0aW9uTGluay50cyIsInNyYy9tb2RlbHMvQ29sb3JDb2RlLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnRzIiwic3JjL21vZGVscy9FeHBhbmRpbmdMaXN0LnRzIiwic3JjL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMudHMiLCJzcmMvbW9kZWxzL0dyb3dpbmdDYXJkLnRzIiwic3JjL21vZGVscy9SV0JFcnJvckJ1cy50cyIsInNyYy9tb2RlbHMvUldCSlNPTkNvbnZlcnRlci50cyIsInNyYy9tb2RlbHMvUldCTGluay50cyIsInNyYy9tb2RlbHMvUmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvU2NyaXB0UGVyZi50cyIsInNyYy9tb2RlbHMvVG9Eby50cyIsInNyYy9tb2RlbHMvV2ViQml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSx1Q0FBdUM7QUFDdkMsK0NBQXdDO0FBQ3hDLHlEQUFrRDtBQUNsRCxxREFBMkM7QUFDM0MsdURBQTRDO0FBRTVDLE1BQU0sZUFBZSxHQUFHO0lBQ3BCLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDUCxNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtRQUU3RSxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLHFCQUFRLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUNsRiwwQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4Qiw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLHFCQUFRLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFDMUUscUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7SUFDOUMsQ0FBQztDQUNKLENBQUE7QUFDRCxrQkFBZSxlQUFlLENBQUM7Ozs7O0FDckIvQix1Q0FBdUM7QUFDdkMsaUVBQTZEO0FBRTdEOztHQUVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQjs7OztPQUlHO0lBQ0gsSUFB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LENBQUMsQ0FBQztJQUNQLENBQUM7O0FBM1dMLDRCQTRXQzs7Ozs7QUM3WEQ7Ozs7R0FJRztBQUNILE1BQU0sTUFBTTtJQUNSLCtDQUErQztJQUN4QyxNQUFNLENBQUMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUN6QixFQUFFLENBQVM7SUFDWCxhQUFhLENBQVM7SUFDdEIsSUFBSSxDQUFTO0lBQ2IsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBTztJQUNsQixXQUFXLENBQVM7SUFDcEIsU0FBUyxDQUFTO0lBQ2xCLFlBQVksQ0FBUztJQUNyQixlQUFlLENBQWtCO0lBRXhDLFlBQ0ksRUFBVSxFQUNWLGFBQXFCLEVBQ3JCLElBQVksRUFDWixXQUFtQixFQUNuQixXQUFpQixFQUNqQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixZQUFvQixFQUNwQixlQUFpQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDOztBQUdMLGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFRvRG9zV2lkZ2V0IGZyb20gJy4vVG9Eb3NXaWRnZXQnO1xuaW1wb3J0IERpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9EaWN0aW9uYXJ5V2lkZ2V0JztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBSV0JFcnJvciBmcm9tICcuLi9tb2RlbHMvUldCRXJyb3JCdXMnXG5cbmNvbnN0IENsYXNzQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzcGVyZiA9IG5ldyBSV0JQZXJmKFwiQ2xhc3Njb21wb25lbnRzXCIpOyAvL2JlZ2luIHBlcmZvcm1hbmNlIG1lYXN1cmVcblxuICAgICAgICAvLyBBZGQgRGljdGlvbmFyeSBXaWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGlmICghUldCRXJyb3IuY2hlY2tFbGVtZW50b3JOdWxsKFwiQ2xhc3NDb21wb25lbnRcIiwgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIsIHRydWUsIHRydWUpKVxuICAgICAgICBEaWN0aW9uYXJ5V2lkZ2V0LmluaXQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGlmICghUldCRXJyb3IuY2hlY2tFbGVtZW50b3JOdWxsKFwiQ2xhc3NDb21wb25lbnRcIiwgXCJUb0RvTGlzdFwiLCB0cnVlLCB0cnVlKSlcbiAgICAgICAgVG9Eb3NXaWRnZXQuaW5pdCgpO1xuICAgICAgICBcbiAgICAgICAgY2xhc3NwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2xhc3NDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoIH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoXCJcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgZGljdGlvbmFyeSB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgRGljdGlvbmFyeVdpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgYnkgY2FsbGluZyB0aGVcbiAgICAgKiAgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBsZXQgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudDogRWxlbWVudFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY0NvdWxkIG5vdCBxdWVyeSBkaWN0aW9uYXJ5IHdpZGdldCBlbGVtZW50LlwiLCBcImNvbG9yOm9yYW5nZTtcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpY3Rpb25hcnlTZWFyY2ggY29uc3RydWN0b3JcbiAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgRGljdGlvbmFyeVNlYXJjaChkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50KSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGljdGlvbmFyeVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRXhwYW5kaW5nTGlzdEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0V4cGFuZGluZ0xpc3RcIjtcblxuY29uc3QgRXhwYW5kaW5nTGlzdERPTVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIERlZmluZSB0aGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCwgZm9yIHVzZSB3aXRoaW4gdGhlIHBhZ2VcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdleHBhbmRpbmctbGlzdCcsIEV4cGFuZGluZ0xpc3RFbGVtZW50LCB7IGV4dGVuZHM6ICd1bCcgfSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQgcHJvcGVydGllc1xuICAgICAgICAvLyBcIkRPTVwiIHBhZ2Ugc3BlY2lmaWMgcHJvcGVydGllc1xuICAgICAgICAvLyBBZGQgYSB0aXRsZSBhdHRyaWJ1dGUgdG8gYWxsIGxpLXNwYW4gdGhhdCBjYW4gZXhwYW5kIGZ1cnRoZXJcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpT3Blbk9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46Zmlyc3QtY2hpbGRgKTtcbiAgICAgICAgY29uc3QgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOm50aC1jaGlsZCgzKWApO1xuXG4gICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXMgZm9yIGV4cGFuZGluZy1lbGVtZW50IGV4cGFuZGFibGUgZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlPcGVuT3Blbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgICAgICAvLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgJ0RPTScgaXRlbXMgZWxlbWVudHNcbiAgICAgICAgICAgIC8vIC0tLT53aGVuIGNsaWNrZWQsIGNoYW5nZSB0aGUgdGl0bGUgcHJvcGVydHkgdG8gcmVmbGVjdCBvcGVuIG9yIGNsb3NlZCBzdGF0dXNcbiAgICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzcGFuLmdldEF0dHJpYnV0ZSgndGl0bGUnKSA9PSAnU2VsZWN0IHRvIGV4cGFuZC4uLidcbiAgICAgICAgICAgICAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBjbG9zZS4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBjbG9zZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgICA6ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIFNldCBwcm9wZXJ0eSBvZiBjbG9zaW5nIHNwYW4gZWxlbWVudHNcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBleHBhbmRhYmxlTGlDbG9zZVNwYW4pIHtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3Qgb3BlbmluZyBlbGVtZW50IHRhZyB0byBleHBhbmQuJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBGbGFzaGNhcmRDYXJkRWxlbXMgZnJvbSAnLi4vbW9kZWxzL0ZsYXNoY2FyZENhcmRFbGVtcydcbmltcG9ydCBwb3J0ZGVmaW5pdGlvbnMgZnJvbSAnLi4vZGF0YS9wb3J0bnVtcydcblxuY29uc3QgZmxhc2hjYXJkZ2FtZVdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBFc3RhYmxpc2ggd2hpY2ggcG9ydCBudW1iZXJzIHRvIHRlc3QgYW5kIHRoZSBkZWZpbml0aW9uXG4gICAgICAgIC8vIFRPRE86IGZ1bmN0aW9ucyBmbGFzaGNhcmRzXG4gICAgICAgIGNvbnN0IG1ldGhvZGRlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oW1xuICAgICAgICAgICAgW1wiY2hhckF0KClcIiwgXCJSZXR1cm5zIGEgbmV3IHN0cmluZyBvZiB0aGUgY2hhcmFjdGVyIGF0IGEgZ2l2ZW4gaW5kZXguXCJdXG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gQ3JlYXRlIGZsYXNoY2FyZCBlbGVtZW50c1xuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZERpdnMgPSBuZXcgRmxhc2hjYXJkQ2FyZEVsZW1zKHBvcnRkZWZpbml0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgdGhlIGdhbWUncyB0aXRsZSBlbGVtZW50XG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkUGFnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZsYXNoQ2FyZHNcIik7XG4gICAgICAgIGNvbnN0IGdhbWV0aXRsZUVsZW0gPSBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIikpO1xuICAgICAgICBnYW1ldGl0bGVFbGVtLmlubmVyVGV4dCA9IFwiQ29tcHV0aW5nIFBvcnQgTnVtYmVyc1wiXG5cbiAgICAgICAgLy8gQWRkIHRoZSBmbGFzaGNhcmRzIHRvIHdpZGdldFxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIG1haW5GbGFzaENhcmREaXZzLm1fZmxhc2hjYXJkc0Fycil7XG4gICAgICAgICAgICBtYWluRmxhc2hDYXJkUGFnZURpdi5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZsYXNoY2FyZGdhbWVXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEdyb3dpbmdDYXJkRWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvR3Jvd2luZ0NhcmRcIlxuXG5jb25zdCBBY3RpdmVDYXJkc1dpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ3Jvd2luZy1jYXJkJywgR3Jvd2luZ0NhcmRFbGVtZW50LCB7IGV4dGVuZHM6ICdsaScgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCB8fCBlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxEZXRhaWxzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gQXJyYXkgb2YgbGlzdCBpdGVtcyAoY2FyZHMpXG4gICAgICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikpO1xuXG4gICAgICAgICAgICAvLyBDbGljayBldmVudCB0byByZXNpemUgdGhlIGNhcmRzIGlmIGNsaWNraW5nIG91dHNpZGUgb2YgYSBjYXJkXG4gICAgICAgICAgICAvLyBXaGVuIGNsaWNraW5nIG91dHNpZGUgYSBjYXJkLCByZXNpemUgYWxsIGNhcmRzIHRvIG5vcm1hbFxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBJdGVtOiBHcm93aW5nQ2FyZEVsZW1lbnQgPSBpdGVtO1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGVtcEl0ZW0gJiYgIXRlbXBJdGVtLmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaHJpbmtDYXJkKHRlbXBJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlc2hhZGUgYWxsIGNhcmRzIGJlY2F1c2Ugbm9uZSBvZiB0aGVtIGFyZSBiaWdcbiAgICAgICAgICAgIGZvciAobGV0IGxpIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQobGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVDYXJkc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IE5BVklURU1TIGZyb20gJy4uL2RhdGEvbmF2aXRlbXMnXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbi8qKlxuICogV2lkZ2V0IHRvIGFkZCBzaXRlIGhlYWRlciBhbmQgZm9vdGVyLiBJbnN0YW50aWF0ZWQgaW4gJ01haW4nIHNjcmlwdC5cbiAqL1xuY29uc3QgSGVhZGVyRm9vdGVyID0ge1xuICAgIGhlYWRlcldpZGdldDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2l0ZSBoZWFkZXIgY29udGFpbmluZyBuYXZpZ2F0aW9uIGxpbmtzIGFuZCBzaXRlIGxvZ28uXG4gICAgICAgICAqL1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJwZXJmID0gbmV3IFJXQlBlcmYoXCJIZWFkZXJcIik7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSFRNTCAnbWFpbicgZWxlbWVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgICAgIC8qKiBIZWFkZXIgZWxlbWVudCBjb250YWluZXIgKi9cbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBlbGVtZW50IHRvIHRoZSBwYWdlXG4gICAgICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCkgey8vICdNYWluJyBlbGVtZW50IGV4aXN0cywgYWRkIHRoZSBoZWFkZXIgdG8gaXRcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gcGFnZU1haW4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsIGJlZm9yZSAnbWFpbicgZWxlbWVudC5gblwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gJ01haW4nIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QsIGFkZCB0aGUgaGVhZGVyIHRvIHRoZSBib2R5XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcigpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwgYWZ0ZXIgJ2JvZHknIGVsZW1lbnQuYG5cIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0FwcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zIHRvIGhlYWRlclxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW5ub3QgcHJlcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zLlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaGVhZGVycGVyZi5lbmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBoZWFkZXIgd2l0aCBzaXRlIGxvZ28gYXBwZW5kZWQuXG4gICAgICAgICAqIEBwYXJhbSBtYWluIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybnMgUG9wdWxhdGVkIGhlYWRlciBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBidWlsZEhlYWRlcjogKCkgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNpYyBIVE1MIGhlYWRlciBlbGVtZW50IGNvbnRhaW5pbmcgbG9nbyAoSDEpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndpZHRoLW1heC1jZW50ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBIMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJIMVwiKTtcbiAgICAgICAgICAgIEgxLnRleHRDb250ZW50ID0gJzxSYW5kb20gV2ViIEJpdHM+JztcbiAgICAgICAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuYXBwZW5kKEgxKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXIuYXBwZW5kKHNpdGVIZWFkZXJDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGROYXZpZ2F0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBCdWlsZCB0aGUgaGVhZGVyIG5hdmlnYXRpb24gYmFzZWQgb24gbmF2aWdhdGlvbiBkYXRhXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmF2aWdhdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlck5hdkZyYWdcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJykpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgbmF2IGRhdGEgdG8gbmF2IGVsZW1lbnRzXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdExpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnByZXBlbmQobmF2TGlzdExpbmtzKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgbmF2aWdhdGlvbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3MudGV4dENvbnRlbnQgPSBgJHtpdGVtLmlubmVyVGV4dH1gO1xuICAgICAgICAgICAgICAgIC8vIEVudmlyb25tZW50IGxpbmtzIGVkaXQsIHJlcXVpcmluZyBkaWZmZXJlbnQgbGluayByZWxhdGl2ZXMgdG8gb3BlcmF0ZVxuICAgICAgICAgICAgICAgIC8vIEdpdGh1YiBwYWdlcyBvcGVyYXRlcyBmcm9tIHJlcG9zaXRvcnksIG5vdCAnLydcbiAgICAgICAgICAgICAgICAvL2lmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncm9iaG93ZS1hLmdpdGh1Yi5pbycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgZWRpdCBmb3IgZGV2IGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgICAgIC8vbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvUmFuZG9tV2ViQml0cy8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlcnBlcmYgPSBuZXcgUldCUGVyZihcIkZvb3RlclwiKTtcblxuICAgICAgICAgICAgLy8gQWRkIGZvb3RlciBlbGVtZW50IHRvIHRoZSBwYWdlIGVuZFxuICAgICAgICAgICAgbGV0IGZvb3RlcjogSFRNTEVsZW1lbnQgPSBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRm9vdGVyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChmb290ZXIpO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZhdmljb25BdHRyaWJ1dGlvbihmb290ZXIpKTtcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGREZXZlbG9wZXJBdHRyaWJ1dGlvbihmb290ZXIpO1xuXG4gICAgICAgICAgICBmb290ZXJwZXJmLmVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZvb3RlcjogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGZvb3RlclBhcmEudGV4dENvbnRlbnQgPSBgXFx1MDBBOSAyMDIyLTIwMjMgUmFuZG9tIFdlYiBCaXRzLiBBbGwgUmlnaHRzIFJlc2VydmVkLmA7XG5cbiAgICAgICAgICAgIHNpdGVGb290ZXJDb250YWluZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgc2l0ZUZvb3Rlci5hcHBlbmQoc2l0ZUZvb3RlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlRm9vdGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZhdmljb25BdHRyaWJ1dGlvbjogKGZvb3RlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEZhdmljb24gYXR0cmlidXRpb24gc2VjdGlvbiArIGxpbmsgdG8gc291cmNlXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkljb25Ib21lOiAjNDUwMjY3NTVcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9ICdodHRwczovL3d3dy52ZWN0b3JzdG9jay5jb20vcm95YWx0eS1mcmVlLXZlY3Rvci9tYWludGVuYW5jZS1pY29uLWZvci1ncmFwaGljLWFuZC13ZWItZGVzaWduLXZlY3Rvci00NTAyNjc1NSdcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gJ1ZlY3RvclN0b2NrLmNvbSc7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBhdHRyaWJ1dGlvbiB0byBmb290ZXIgcGFyYVxuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEuYXBwZW5kQ2hpbGQoZm9vdGVySWNvbkxpbmspO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRGV2ZWxvcGVyQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXZhdHRyaWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZGV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBkZXYudGV4dENvbnRlbnQgPSAnRGV2ZWxvcGVkIGJ5IFJvYmVydCBIb3dlbGwnO1xuXG4gICAgICAgICAgICBkZXZhdHRyaWIuYXBwZW5kKGRldik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZGV2YXR0cmliKTtcblxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJGb290ZXI7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0IGZyb20gJy4vRXhwYW5kaW5nTGlzdERPTVdpZGdldCc7XG5pbXBvcnQgQWN0aXZlQ2FyZHNXaWRnZXQgZnJvbSAnLi9Hcm93aW5nQ2FyZCc7XG5pbXBvcnQgZmxhc2hjYXJkZ2FtZVdpZGdldCBmcm9tICcuL0ZsYXNoY2FyZEdhbWVXaWRnZXQnO1xuaW1wb3J0IHNsaWRlc2hvd1dpZGdldCBmcm9tICcuL1NsaWRlU2hvd1dpZGdldCc7XG5pbXBvcnQgY3NzZXggZnJvbSAnLi9jc3NleCc7XG5pbXBvcnQgaHRtbGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RlJztcbmltcG9ydCBSV0JDYXJkc1dpZGdldCBmcm9tICcuL1dlYkJpdHMnO1xuaW1wb3J0IHVybGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RldXJsJztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBkb21haW5sb29rdXAgZnJvbSAnLi9kb21haW5sb29rdXAnO1xuaW1wb3J0IHNsaWRlcmJhciBmcm9tICcuL3NsaWRlcmJhcic7XG5pbXBvcnQgaHNsY29sb3J3aWRnZXQgZnJvbSAnLi9oc2xjb2xvcic7XG5cbmNvbnN0IFBhZ2VDb21wb25lbnRzID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFnZXBlcmYgPSBuZXcgUldCUGVyZihcIlBhZ2Vjb21wb25lbnRzXCIpOyAvL21lYXN1cmUgcGVyZm9ybWFuY2VcblxuICAgICAgICBQYWdlQ29tcG9uZW50cy5DaGVja1BhZ2UoKTtcbiAgICAgICAgcGFnZXBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9LFxuICAgIENoZWNrUGFnZTogKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgLy8nSW5kZXgnIGFuZCAnUGFnZXMnIHJvdXRlcywgYWRkIGNhcmRzIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBSV0JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gZG9tLmh0bWwsIHN2Zy5odG1sIHBhZ2UgdXNlcyBleHBhbmRpbmdMaXN0cyBjb21wb25lbnRcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9kb20uaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvc3ZnLmh0bWwnOlxuICAgICAgICAgICAgICAgIEV4cGFuZGluZ0xpc3RET01XaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB3ZWJJREUgd2lkZ2V0XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvd2ViaWRlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBBY3RpdmVDYXJkc1dpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHNsaWRlc2hvdyBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvZ3VpZGVzL3B3YWljb24uaHRtbCc6XG4gICAgICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgQ1NTRVggY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2Nzcy5odG1sJzpcbiAgICAgICAgICAgICAgICBjc3NleC5DU1NFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBodG1sZXhDb2xvckNvZGUgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2h0bWwuaHRtbCc6XG4gICAgICAgICAgICAgICAgaHRtbGV4Q29sb3JDb2RlLkhUTUxFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB1cmxleENvbG9yQ29kZSBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvdXJsLmh0bWwnOlxuICAgICAgICAgICAgICAgIHVybGV4Q29sb3JDb2RlLlVSTEVYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGZsYXNoY2FyZCBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvZmxhc2hjYXJkcy5odG1sJzpcbiAgICAgICAgICAgICAgICBmbGFzaGNhcmRnYW1lV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZG9tYWluIG5hbWUgbG9va3VwXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvZG9tYWlubG9va3VwLmh0bWwnOlxuICAgICAgICAgICAgICAgIGRvbWFpbmxvb2t1cC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvbWFya3VwLmh0bWwnOlxuICAgICAgICAgICAgICAgIHNsaWRlcmJhci5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEhTTCBjb2xvciBwaWNrZXJcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9oc2wuaHRtbCc6XG4gICAgICAgICAgICAgICAgaHNsY29sb3J3aWRnZXQuaW5pdGhzbGNvbG9ycGlja2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgeyBSV0JDYXJkRWxlbWVudHMgfSBmcm9tIFwiLi4vbW9kZWxzL1dpZGdldE1hcmt1cEVsZW1lbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCQ2FyZCB7XG4gICAgLyoqXG4gICAgICogQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJ3YmNhcmRlbGVtZW50czogUldCQ2FyZEVsZW1lbnRzO1xuICAgIC8qKlxuICAgICAqICBNYXAgV2ViQml0IGRhdGEgdG8gYSBjYXJkIGVhY2hcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgKiAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQm9keVwiPlxuICAgICAqICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgIDxwPjwvcD5cbiAgICAgKiAgICAgICAgICA8YSBocmVmPVwiXCI+PC9hPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogIDwvZGl2PlxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZFJXQkNhcmRNYXJrdXAoYXJ0aWNsZTogV2ViQml0KSB7XG4gICAgICAgIGxldCBXZWJCaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMgPSB7XG4gICAgICAgICAgICBjYXJkSW1nOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGNhcmRJbWdUb3A6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgY2FyZEJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhcmRCb2R5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGxldCBjYXJkQm9keVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGxldCBjYXJkQm9keUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5SGVhZGluZyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5UGFyYSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGNhcmRCb2R5TGluayk7XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgV2ViQml0LmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgV2ViQml0LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2FydGljbGUuaWR9YCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmNsYXNzTGlzdC5hZGQoXCJjYXJkQm9keVwiLCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBhcnRpY2xlLmNhcmRJbWFnZSk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhcnRpY2xlLmNhcmRJbWFnZUFMVCk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuc2V0QXR0cmlidXRlKCdBcnRpY2xlJywgYXJ0aWNsZS5hcnRpY2xlTnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgICAgICBjYXJkQm9keUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgYXJ0aWNsZS5hcnRpY2xlTGluaylcbiAgICAgICAgY2FyZEJvZHlIZWFkaW5nLmlubmVyVGV4dCA9IGFydGljbGUubmFtZTtcbiAgICAgICAgY2FyZEJvZHlQYXJhLnRleHRDb250ZW50ID0gYXJ0aWNsZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgY2FyZEJvZHlMaW5rLnRleHRDb250ZW50ID0gXCJHbyB0byBQYWdlXCI7XG5cbiAgICAgICAgLy8gSW1hZ2UgYXR0cmlidXRpb24gbWF5IGJlIG5lZWRlZCBmb3IgdGhlIGltYWdlIHVzZWRcbiAgICAgICAgLy8gQXR0cmlidXRpb24gZGF0YSBpcyBpbXBvcnRlZCBhcyAnYXR0cmxpbmtzJyBzaWduYXR1cmUgcGFyYW1ldGVyXG4gICAgICAgIGlmIChhcnRpY2xlLmxpbmtBdHRyaWJ1dGlvbil7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwodGhpcy5yd2JjYXJkZWxlbWVudHMsIGFydGljbGUubGlua0F0dHJpYnV0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBjYXJkIGlzIFdlYkJpdFxuICAgICAgICAvLyBBZGQgdGhlIG1hcmt1cCB0byB0aGUgY29udGFpbmluZyBlbGVtZW50XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wKTtcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5KTtcblxuICAgICAgICByZXR1cm4gV2ViQml0O1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSBpbWFnZSBhdHRyaWJ1dGlvbiwgdGhlIGltYWdlIGlkIGFuZCBhcnRpY2xlIGlkIHdpbGwgbWF0Y2gsXG4gICAgICogb3RoZXJ3aXNlIHRoZSBkYXRhIGlzbid0IGVudGVyZWQsIGNhdXNpbmcgYSBtaXNzXG4gICAgICogXG4gICAgICogIDxkaXYgY2xhc3M9XCJmbGlwLWNhcmRcIj48IS0tY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAqICA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICAgKiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkRnJvbnRcIj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJhY2tcIj5cbiAgICAgKiAgICAgICAgICAgICAgIDxoMz48L2gzPlxuICAgICAqICAgICAgICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCIgY2xhc3M9XCJpbWdTbWFsbCBpbWdQVFJcIj5cbiAgICAgKiAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+PCEtLWVuZCBjYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogQHBhcmFtIHJ3YmNhcmRlbGVtZW50cyBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqIEBwYXJhbSBsaW5rIEF0dHJpYnV0aW9uIGxpbmtcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkUldCQ2FyZEF0dHJpYnV0aW9uUGFuZWwocndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHMsIGxpbms6IEF0dHJpYnV0aW9uTGluaykge1xuICAgICAgICBpZiAocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuZ2V0QXR0cmlidXRlKCdBcnRpY2xlJykgPT09IGxpbmsuYXJ0aWNsZWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbWFnZSBiYWNrIHBhbmVsIGVsZW1lbnRzIGFuZCBhZGQgdGhlIGRhdGFcbiAgICAgICAgICAgIC8vIFJlZGVmaW5lIGNhcmQgaW1hZ2UgcGFuZWwgYXMgYSBmbGlwIHBhbmVsXG4gICAgICAgICAgICBjb25zdCBjYXJkSW5uZXIgPSByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRGcm9udCA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5hcHBlbmRDaGlsZChyd2JjYXJkZWxlbWVudHMuY2FyZEltZyk7IC8vIG1vdmUgaW1hZ2Ugd2l0aGluIGNhcmQgZnJvbnQgZGl2aXNvclxuICAgICAgICAgICAgbGV0IHNtYWxsSW1nID0gPEhUTUxJbWFnZUVsZW1lbnQ+cndiY2FyZGVsZW1lbnRzLmNhcmRJbWcuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRCYWNrID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgYmFja0hlYWRpbmcgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgICAgICAgY2FyZEJhY2suYXBwZW5kQ2hpbGQoc21hbGxJbWcpO1xuICAgICAgICAgICAgY29uc3QgYmFja1BhcmEgPSBjYXJkQmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVMaW5rID0gcndiY2FyZGVsZW1lbnRzLmNhcmRCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpKTsgLy9hcHBlbmQgdG8gZnJvbnQgcGFuZWxcblxuICAgICAgICAgICAgLy8gQWRkIGZsaXAtcGFuZWwgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIilcbiAgICAgICAgICAgIGNhcmRJbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIik7XG4gICAgICAgICAgICBjYXJkRnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgICAgICAgIHNtYWxsSW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdTbWFsbFwiLCBcImltZ1BUUlwiKTtcbiAgICAgICAgICAgIGNhcmRCYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuY2xhc3NMaXN0LmFkZChcImF0dHJpYnV0ZVwiKTtcbiAgICAgICAgICAgIGJhY2tIZWFkaW5nLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgICAgICBiYWNrUGFyYS50ZXh0Q29udGVudCA9IGxpbmsuaW5uZXJUZXh0XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmhyZWYgPSBsaW5rLmhSZWZlcmVuY2U7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRpdGxlID0gbGluay50aXRsZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuLy8gQXR0cmlidXRpb246IFJvYmVydCBBIEhvd2VsbCwgTWF5IDIwMjNcbi8vIENvbnRlbnQgZGVyaXZlZCBmcm9tOiBXM1NjaG9vbHMsIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vaG93dG8vaG93dG9fanNfc2xpZGVzaG93LmFzcFxuXG5cbi8qKlxuICogQ29tcG9uZW50IGNyZWF0aW5nIHNsaWRlc2hvdyB3aWRnZXRzXG4gKi9cbmNvbnN0IHNsaWRlc2hvd1dpZGdldCA9IHtcbiAgICBzbGlkZUluZGV4OiAxLFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzbGlkZXNob3cgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE5leHQvcHJldmlvdXMgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gcGx1c1NsaWRlcyhuOm51bWJlcikge1xuICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggKz0gbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFRodW1ibmFpbCBpbWFnZSBjb250cm9sc1xuICAgICAgICBmdW5jdGlvbiBjdXJyZW50U2xpZGUobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBuZXh0IHNsaWRlIHdoZW4gYXJyb3cgYnV0dG9ucyBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dQcmV2aW91c0J0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93UHJldlwiKTtcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93TmV4dEJ0bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVzaG93TmV4dFwiKTtcbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd1ByZXZpb3VzQnRucyl7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcygtMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBidG4gb2Ygc2xpZGVTaG93TmV4dEJ0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hhbmdlIHRvIHNlbGVjdGVkIHNsaWRlIHdoZW4gZG90IGFyZSBjbGlja2VkXG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd0RvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICBsZXQgZG90Q291bnRlciA9IDE7XG4gICAgICAgIGZvcihsZXQgZG90IG9mIHNsaWRlU2hvd0RvdHMpe1xuICAgICAgICAgICAgLy9hZGQgZG90IGNvdW50ZXJcbiAgICAgICAgICAgIGRvdC5zZXRBdHRyaWJ1dGUoXCJkb3RpbmRleFwiLCBgJHtkb3RDb3VudGVyfWApXG4gICAgICAgICAgICAvL3doZW4gY2xpY2tlZCwgbmF2aWdhdGUgdG8gdGhlIHNsaWRlIGluZGljYXRlZFxuICAgICAgICAgICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoZG90Q291bnRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvdENvdW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBkb3RDb3VudGVyID0gMTtcbiAgICB9LFxuICAgIHNob3dTbGlkZXM6IChuOiBudW1iZXIpPT57XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlTbGlkZXNcIik7XG4gICAgICAgICAgICBsZXQgZG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XG4gICAgICAgICAgICBpZiAobiA+IHNsaWRlcy5sZW5ndGgpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IDF9XG4gICAgICAgICAgICBpZiAobiA8IDEpIHtzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IHNsaWRlcy5sZW5ndGh9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbaV07XG4gICAgICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gZG90c1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGVtcFNsaWRlID0gPEhUTUxEaXZFbGVtZW50PnNsaWRlc1tzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCAtIDFdXG4gICAgICAgICAgICB0ZW1wU2xpZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGRvdHNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXS5jbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVzaG93V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdCB9IGZyb20gXCIuLi9tb2RlbHMvVG9Eb1wiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBUby1EbyBMaXN0IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBUb0Rvc1dpZGdldCA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBUby1EbyBMaXN0IHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnVG9Eb0xpc3QnIGNsYXNzXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgIGxldCB0b0Rvc0VsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRvRG9zRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVG9Eb0xpc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjQ291bGQgbm90IHF1ZXJ5IHRvZG8gbGlzdCB3aWRnZXQgZWxlbWVudC5cIiwgXCJjb2xvcjpvcmFuZ2U7XCIpXG4gICAgICAgIH1cblxuICAgICAgICAvL1RvRG9MaXN0IG9iamVjdFxuICAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG5cbiAgICAgICAgLy9DcmVhdGVzIHdpZGdldCBtYXJrdXAgYW5kIHBvcHVsYXRlcyBUby1EbyB0YXNrcyBjb250YWluZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KHRvRG9zRWxlbWVudCk7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9Eb3NXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXRUJCSVREQVRBIGZyb20gXCIuLi9kYXRhL2RhdGFcIlxuaW1wb3J0IHsgUmFuZG9tV2ViQml0cyB9IGZyb20gXCIuLi9tb2RlbHMvUmFuZG9tV2ViQml0c1wiXG5cbi8qKlxuICogQ2FyZCB3aWRnZXQgdG8gaW5pdGlhbGl6ZSBhcnRpY2xlIGRhdGEgaW50byBIVE1MIGNhcmQgZWxlbWVudHMuIFRoaXMgd2lkZ2V0IFxuICogY3JlYXRlcyBtdWx0aXBsZSBzZWN0aW9ucyBvZiBjYXJkcyB0byBhZGQgdG8gYSBwYWdlLlxuICovXG5jb25zdCBSV0JDYXJkc1dpZGdldCA9IHtcbiAgICAvKiogQ2FyZHMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gYnJlYWtzIGRvd24gdGhlIGRhdGEgc3RydWN0dXJlIGluIFxuICAgICAqIG9yZGVyIHRvIGZvcm11bGF0ZSB0aGUgYXJ0aWNsZSBkZXRhaWxzIGludG8gb25lIGNhcmQgZm9yIGVhY2ggYXJ0aWNsZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEFydGljbGVzIGhhdmUgZGlmZmVyZW50IGNhdGVnb3JpZXMsIHNvIGVhY2ggY2F0ZWdvcnkgbXVzdCBiZSByZXNwZWN0ZWQuIFxuICAgICAqICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICAvKiogTXVsdGlwbGUgY2F0ZWdvcmllcyBvZiBjYXJkIGRhdGEgZXhpc3QuIFRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBuZWVkZWQgXG4gICAgICAgICAqIHRvIGNyZWF0ZSBjYXRlZ29yeSBzZWN0aW9ucyBkaXZpc2lvbnMgd2hlbiBwbGFjZWQgb24gYSBwYWdlLlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIsIFwiQXJiaXRyYXJ5QXJ0aWNsZXNcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiLCBcIkd1aWRlU2hvcnRzXCIpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4cGxvcmUgdGhlIFdlYjpcIiwgXCJFeHBsb3JldGhlV2ViXCIpLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjYXJkIGRhdGEgKyBhdHRyaWJ1dGlvbiBsaW5rIGRhdGFcbiAgICAgICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMsIG9yIGFydGljbGVzLCBHdWlkZXMsIGFuZCBFeHBsb3Jlc1xuICAgICAgICAvKipUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgb2YgY2FyZCBlbGVtZW50cy4gRWFjaCBpbmRleCBzdG9yZXMgdGhlIGNhcmRzJyBkYXRhXG4gICAgICAgICAqIGZvciBvbmUgY2F0ZWdvcnkgb2YgYXJ0aWNsZXMuICovIFxuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICBdO1xuXG4gICAgICAgIFxuICAgICAgICAvLyBSb3V0ZXMgLT4gQWRkIHdpZGdldCBhbmQgZm9ybWF0IHBhZ2VzXG4gICAgICAgIC8vIEluZGV4IChIb21lKSBwYWdlIHNob3J0ZW5zIGVhY2ggc2VjdGlvbiB0byAzIGFydGljbGVzIG9ubHlcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9SYW5kb21XZWJCaXRzLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Rpc3QvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgICAgICAvKiogUmFuZG9taXplIHRoZSBvcmRlciBvZiBjYXJkcy4gKi9cbiAgICAgICAgICAgIGNvbnN0IGdldE11bHRpcGxlUmFuZG9tID0gKGFycjogYW55LCBudW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJhbmRvbWl6ZSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBzaHVmZmxlZCA9IFsuLi5hcnJdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2h1ZmZsZWQuc2xpY2UoMCwgbnVtKTsgLy8gcmV0dXJuIHRoZSByZXF1ZXN0ZWQgbnVtYmVyIG9mIGVsZW1lbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzBdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1swXSwgNSk7XG4gICAgICAgICAgICBjYXJkc0FydGljbGVzWzFdID0gZ2V0TXVsdGlwbGVSYW5kb20oY2FyZHNBcnRpY2xlc1sxXSwgMyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGNhcmRzIHRvIHRoZSBwYWdlIGJ5IGRlY29uc3RydWN0aW9uIGFuZCBhZGRpdGlvblxuICAgICAgICAvLyBPdXRlciBsb29wOiBpdGVyYXRlIHRoZSBkYXRhIHRvIGVhY2ggcmVzcGVjdGl2ZSBjYXRlZ29yeTogUGFnZXMsIEd1aWRlcywgRXhwbG9yZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYXJkc1NlY3Rpb25baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5uZXIgbG9vcDogaXRlcmF0ZSB0aHJvdWdoIHRoZSBjYXRlZ29yeSBkYXRhXG4gICAgICAgICAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJXQkNhcmRzV2lkZ2V0XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgaHRtbGV4Q29sb3JDb2RlID0ge1xuICAgIEhUTUxFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICAvLyBHZXQgY29tcG9uZW50IGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB1c2VkIGluIHdpZGdldCBpbnRlcmFjdGl2aXR5XG4gICAgICAgIGNvbnN0IG9wZW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRhZ29wZW5cIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGNsb3NlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRhZ2Nsb3NlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRleHRWYWxcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkF0dHJpYnV0ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShvcGVuZXJzLCBjbG9zZXJzLCB2YWx1ZXMsIGF0dHJpYnV0ZXMpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVJlZClcIiwgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHRtbGV4Q29sb3JDb2RlO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ29sb3JDb2RlIGZyb20gJy4uL21vZGVscy9Db2xvckNvZGUnXG5cbmNvbnN0IHVybGV4Q29sb3JDb2RlID0ge1xuICAgIFVSTEVYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm90b2NvbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZG9tYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kb21haW5cIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcnRcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZm9sZGVyXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWxlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlcnlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIua2V5XCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmFsdWVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICAgICAgY29uc3QgY29sb3JsZXNzZWxlbWVudHMgPSBuZXcgQXJyYXkocHJvdG9jb2wsIGRvbWFpbiwgcG9ydCwgZm9sZGVyLCBcbiAgICAgICAgICAgIGZpbGUsIHF1ZXJ5LCBrZXksIHZhbHVlKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHNjb2xvcnMgPSBuZXcgQXJyYXkoXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1Ta3libHVlKVwiLCBcbiAgICAgICAgICAgIFwidmFyKC0tY2xyLURhcmtDeWFuKVwiLCBcInZhcigtLWNsci1HcmVlbilcIiwgXCJ2YXIoLS1jbHItUmVkKVwiLCBcbiAgICAgICAgICAgIFwidmFyKC0tY2xyLXByaW1hcnktNjAwKVwiLCBcInZhcigtLWNsci1hbGwtcHJpbWFyeS01MDApXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItTGlnaHRjb3JhbClcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVybGV4Q29sb3JDb2RlO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ29sb3JDb2RlIGZyb20gJy4uL21vZGVscy9Db2xvckNvZGUnXG5cbmNvbnN0IGNzc2V4ID0ge1xuICAgIC8qKlxuICAgICAqIENzc2V4IGlzIGEgd2lkZ2V0IGluIENTUyBwYWdlLCBhcHBseWluZyBzdHlsZSBjb2xvcnMgdG8gZWxlbWVudHMgb2YgZGlmZmVyZW50XG4gICAgICogdHlwZXMgKGJhc2VkIG9uIHRoZSBDU1MgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UpXG4gICAgICovXG4gICAgQ1NTRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5TZWxlY3RvclwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlZhbHVlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBwc3VlZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5Qc3VlZG8tY2xhc3NcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICAgICAgY29uc3QgY29sb3JsZXNzZWxlbWVudHMgPSBuZXcgQXJyYXkoc2VsZWN0b3JzLCBhdHRyaWJ1dGVzLCB2YWx1ZXMsIHBzdWVkb3MpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1SZWQpXCIsIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItU2t5Ymx1ZSlcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjc3NleDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgUldCUmVmZXJlbmNlRXJyb3IgfSBmcm9tIFwiLi4vbW9kZWxzL1JXQkVycm9yQnVzXCI7XG5cbmNvbnN0IGRvbWFpbmxvb2t1cCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIEdldCB0aGUgZm9ybSwgYXNzaWduIHRvIGEgdmFyaWFibGVcbiAgICAgICAgbGV0IGZvcm1lbGVtY2xhc3NuYW1lID0gJ3NlYXJjaFdob0lTJztcbiAgICAgICAgbGV0IGZvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgICAgICAgICAgIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtmb3JtZWxlbWNsYXNzbmFtZX1gKSBhcyBIVE1MRm9ybUVsZW1lbnQgfCBudWxsO1xuICAgICAgICBpZiAoZm9ybSA9PSBudWxsKXtcbiAgICAgICAgICAgIG5ldyBSV0JSZWZlcmVuY2VFcnJvcihcIkVsZW1lbnROb3RGb3VuZFwiLCBgRWxlbWVudCBub3QgZm91bmQ6ICcke2Zvcm1lbGVtY2xhc3NuYW1lfSc6YCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGRvbWFpbmxvb2t1cC5zZWFyY2hXSE9JUyk7XG4gICAgfSxcbiAgICBzZWFyY2hXSE9JUzogKCkgPT4ge1xuICAgICAgICBsZXQgaW5wdXRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R4dFNlYXJjaCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0ZWxlbS52YWx1ZTtcbiAgICAgICAgdmFyIFVSTCA9ICdodHRwczovL3d3dy53aG9pcy5jb20vd2hvaXMvJyArIHZhbHVlO1xuICAgICAgICB3aW5kb3cub3BlbihVUkwsICdfYmxhbmsnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZG9tYWlubG9va3VwOyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5jb25zdCBoc2xjb2xvcndpZGdldCA9IHtcbiAgICBpbml0aHNsY29sb3JwaWNrZXI6ICgpID0+IHtcbiAgICAgICAgbGV0IEhTTE9ORSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JPTkVcIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGxldCBIU0xUV08gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yVFdPXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBsZXQgSFNMVEhSRUUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yVEhSRUVcIikgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICAgICAgY2xhc3MgYm94Y29sb3Ige1xuICAgICAgICAgICAgaHVlID0gMDtcbiAgICAgICAgICAgIHNhdHVyYXRpb24gPSAxMDA7XG4gICAgICAgICAgICBsaWdodG5lc3MgPSA1MDtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGh1ZSA9IDAsIHNhdHVyYXRpb24gPSAxMDAsIGxpZ2h0bmVzcyA9IDUwKXtcbiAgICAgICAgICAgICAgICBpZihodWUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihodWUgPT0gMTIwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWUgPSAxMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihodWUgPT0gMjQwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWUgPSAyNDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGh1ZSA8IDAgfHwgaHVlID49IDM2MCB8fCBzYXR1cmF0aW9uIDwgMCB8fCBzYXR1cmF0aW9uID4gMTAwIHx8IGxpZ2h0bmVzcyA8IDAgfHwgbGlnaHRuZXNzID4gMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IG5ldyBSYW5nZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNIU0wgY29sb3IgdmFsdWUgb3V0IG9mIGFjY2VwdGFibGUgcmFuZ2U6XFxuJW9cXG4lYzwvUldCPmAsIFxuICAgICAgICAgICAgICAgICAgICAnY29sb3I6Z3JheTtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpncmF5OycsIGVyciwgJ2NvbG9yOmdyYXk7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zYXR1cmF0aW9uID0gc2F0dXJhdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0bmVzcyA9IGxpZ2h0bmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVkID0gMDtcbiAgICAgICAgbGV0IGdyZWVuID0gMTIwO1xuICAgICAgICBsZXQgYmx1ZSA9IDI0MDtcblxuICAgICAgICBsZXQgSFNMQm94Q29sb3JSZWQgPSBPYmplY3QuY3JlYXRlKG5ldyBib3hjb2xvcihyZWQsIDEwMCwgNTApKTtcbiAgICAgICAgbGV0IEhTTEJveENvbG9yR3JlZW4gPSBPYmplY3QuY3JlYXRlKG5ldyBib3hjb2xvcihncmVlbiwgMTAwLCA1MCkpO1xuICAgICAgICBsZXQgSFNMQm94Q29sb3JCbHVlID0gT2JqZWN0LmNyZWF0ZShuZXcgYm94Y29sb3IoYmx1ZSwgMTAwLCA1MCkpO1xuICAgICAgICBsZXQgdG9wcmVjdGh1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvck9ORSBzcGFuLnZhbDEnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCB0b3ByZWN0c2F0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yT05FIHNwYW4udmFsMicpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IHRvcHJlY3RsaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvck9ORSBzcGFuLnZhbDMnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBtaWRyZWN0aHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yVFdPIHNwYW4udmFsMScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IG1pZHJlY3RzYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUV08gc3Bhbi52YWwyJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgbWlkcmVjdGxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yVFdPIHNwYW4udmFsMycpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IGJvdHJlY3RodWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDEnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBib3RyZWN0c2F0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yVEhSRUUgc3Bhbi52YWwyJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgYm90cmVjdGxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yVEhSRUUgc3Bhbi52YWwzJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICB0b3ByZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQuaHVlO1xuICAgICAgICB0b3ByZWN0c2F0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQuc2F0dXJhdGlvbjtcbiAgICAgICAgdG9wcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQubGlnaHRuZXNzO1xuICAgICAgICBtaWRyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5odWU7XG4gICAgICAgIG1pZHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb247XG4gICAgICAgIG1pZHJlY3RsaWdodC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4ubGlnaHRuZXNzO1xuICAgICAgICBib3RyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLmh1ZTtcbiAgICAgICAgYm90cmVjdHNhdC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yQmx1ZS5zYXR1cmF0aW9uO1xuICAgICAgICBib3RyZWN0bGlnaHQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzO1xuXG4gICAgICAgIEhTTE9ORS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JSZWQuaHVlfSwgJHtIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9ufSUsICR7SFNMQm94Q29sb3JSZWQubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgSFNMVFdPLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvckdyZWVuLmh1ZX0sICR7SFNMQm94Q29sb3JHcmVlbi5zYXR1cmF0aW9ufSUsICR7SFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3N9JSlgO1xuICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JCbHVlLmh1ZX0sICR7SFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcblxuICAgICAgICBjb25zdCBIdWVTbGRyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI0h1ZWApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IFNhdHVyYXRpb25TbGRyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI1NhdHVyYXRpb25gKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBjb25zdCBMaWdodG5lc3NTbGRyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI0xpZ2h0bmVzc2ApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgSHVlU2xkci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGh1ZWlucHV0dmFsdWUgPSBIdWVTbGRyLnZhbHVlO1xuICAgICAgICAgICAgSFNMT05FLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtodWVpbnB1dHZhbHVlfSwgJHtIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9ufSUsICR7SFNMQm94Q29sb3JSZWQubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTFRXTy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHVlaW5wdXR2YWx1ZX0sICR7SFNMQm94Q29sb3JHcmVlbi5zYXR1cmF0aW9ufSUsICR7SFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVEhSRUUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2h1ZWlucHV0dmFsdWV9LCAke0hTTEJveENvbG9yQmx1ZS5zYXR1cmF0aW9ufSUsICR7SFNMQm94Q29sb3JCbHVlLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xCb3hDb2xvclJlZC5odWUgPSBodWVpbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JHcmVlbi5odWUgPSBodWVpbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JCbHVlLmh1ZSA9IGh1ZWlucHV0dmFsdWU7XG4gICAgICAgICAgICB0b3ByZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQuaHVlO1xuICAgICAgICAgICAgbWlkcmVjdGh1ZS50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4uaHVlO1xuICAgICAgICAgICAgYm90cmVjdGh1ZS50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yQmx1ZS5odWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgU2F0dXJhdGlvblNsZHIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzYXR1cmF0aW9uaW5wdXR2YWx1ZSA9IFNhdHVyYXRpb25TbGRyLnZhbHVlO1xuICAgICAgICAgICAgSFNMT05FLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvclJlZC5odWV9LCAke3NhdHVyYXRpb25pbnB1dHZhbHVlfSUsICR7SFNMQm94Q29sb3JSZWQubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTFRXTy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JHcmVlbi5odWV9LCAke3NhdHVyYXRpb25pbnB1dHZhbHVlfSUsICR7SFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVEhSRUUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yQmx1ZS5odWV9LCAke3NhdHVyYXRpb25pbnB1dHZhbHVlfSUsICR7SFNMQm94Q29sb3JCbHVlLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9uID0gc2F0dXJhdGlvbmlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIEhTTEJveENvbG9yQmx1ZS5zYXR1cmF0aW9uID0gc2F0dXJhdGlvbmlucHV0dmFsdWU7XG4gICAgICAgICAgICB0b3ByZWN0c2F0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQuc2F0dXJhdGlvbjtcbiAgICAgICAgICAgIG1pZHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb247XG4gICAgICAgICAgICBib3RyZWN0c2F0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb247XG4gICAgICAgIH0pXG5cbiAgICAgICAgTGlnaHRuZXNzU2xkci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpZ2h0aW5wdXR2YWx1ZSA9IExpZ2h0bmVzc1NsZHIudmFsdWU7XG4gICAgICAgICAgICBIU0xPTkUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yUmVkLmh1ZX0sICR7SFNMQm94Q29sb3JSZWQuc2F0dXJhdGlvbn0lLCAke2xpZ2h0aW5wdXR2YWx1ZX0lKWA7XG4gICAgICAgICAgICBIU0xUV08uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yR3JlZW4uaHVlfSwgJHtIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtsaWdodGlucHV0dmFsdWV9JSlgO1xuICAgICAgICAgICAgSFNMVEhSRUUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yQmx1ZS5odWV9LCAke0hTTEJveENvbG9yQmx1ZS5zYXR1cmF0aW9ufSUsICR7bGlnaHRpbnB1dHZhbHVlfSUpYDtcbiAgICAgICAgICAgIEhTTEJveENvbG9yUmVkLmxpZ2h0bmVzcyA9IGxpZ2h0aW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIEhTTEJveENvbG9yR3JlZW4ubGlnaHRuZXNzID0gbGlnaHRpbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JCbHVlLmxpZ2h0bmVzcyA9IGxpZ2h0aW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIHRvcHJlY3RsaWdodC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yUmVkLmxpZ2h0bmVzcztcbiAgICAgICAgICAgIG1pZHJlY3RsaWdodC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4ubGlnaHRuZXNzO1xuICAgICAgICAgICAgYm90cmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLmxpZ2h0bmVzcztcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhzbGNvbG9yd2lkZ2V0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnXG5cbmNvbnN0IG1vYmlsZUFiYnJNYXJrdXAgPSB7XG4gICAgaW5pdDogKCkgPT57XG4gICAgICAgIC8vYmVnaW4gbW9iaWxlIG1hcmt1cFxuICAgICAgICBtb2JpbGVBYmJyTWFya3VwLm1vYmlsZUFiYnJNYXJrdXBzKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgICAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICAgICAgICogIGFiaWxpdHkgdG8gZGVmaW5lIGFuIGFiYnIgdGFnLCB0aGFuIHJlbHkgb24gdGhlIHRpdGxlIGF0dHJpYnV0ZS5cbiAgICAgICAgICovXG4gICAgbW9iaWxlQWJick1hcmt1cHM6ICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9iaWxlYWJicnBlcmYgPSBuZXcgUldCUGVyZihcIk1vYmlsZWFiYnJwZXJmXCIpOyAvL3N0YXJ0IHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3MgQWJick9wZW57XG4gICAgICAgICAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbGFiYnJldmlhdGlvbmVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFiYnJcIik7XG4gICAgICAgIGlmKGFsbGFiYnJldmlhdGlvbmVsZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgYWJiciBvZiBhbGxhYmJyZXZpYXRpb25lbGVtcyl7XG4gICAgICAgICAgICAgICAgbGV0IGFiYnJldiA9IG5ldyBBYmJyT3BlbigpO1xuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudCA9IGFiYnI7XG5cbiAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFiYnJ0aXRsZWF0dHJ2YWw6IHN0cmluZyA9IGFiYnJldi5hYmJyRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBhYmJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFiYnJldi5hYmJyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPCAxKXsgLy9jcmVhdGUgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gYWJicmV2LmFiYnJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0oJHthYmJydGl0bGVhdHRydmFsfSR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vc2hvdyB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQucXVlcnlTZWxlY3RvcihcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtb2JpbGVhYmJycGVyZi5lbmQoKSAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbW9iaWxlQWJick1hcmt1cDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5jb25zdCBzbGlkZXJiYXIgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICB2YXIgZGl2aXNvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGl2aXNvclwiKSwgXG4gICAgICAgIHNsaWRlQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzbGlkZXJcIikgYXMgSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG4gICAgICAgIHNsaWRlQmFyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJzbGlkZXJcIik7XG4gICAgICAgIHNsaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4gc2xpZGVyYmFyLm1vdmVEaXZpc29yQmFyKGRpdmlzb3IsIHNsaWRlQmFyKSk7XG4gICAgfSxcbiAgICBtb3ZlRGl2aXNvckJhcjogKGRpdmlzb3I6IEhUTUxFbGVtZW50LCBzbGlkZUJhcjogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICBkaXZpc29yLnN0eWxlLndpZHRoID0gc2xpZGVCYXIudmFsdWUgKyBcIiVcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcmJhcjsiLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi4vbW9kZWxzL1dlYkJpdFwiO1xuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vbW9kZWxzL0F0dHJpYnV0aW9uTGlua1wiO1xuXG4vLyBDcmVhdGUgbmV3IEFBIChBcmJpdHJhcnkgQXJ0aWNsZSlcblxuLyoqXG4gKiBcIkFyYml0cmFyeSBBcnRpY2xlcycgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgQXJiaXRyYXJ5QXJ0aWNsZXMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEb21haW5sb29rdXBcIixcbiAgICAgICAgMSxcbiAgICAgICAgXCJEb21haW4gTG9va3VwXCIsXG4gICAgICAgIFwiQ2hlY2sgYW4gYXZhaWxhYmxlIGRvbWFpbiB1c2luZyBXaG9JUyBBUEkgc2VhcmNoXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCA0KSxcbiAgICAgICAgXCJwYWdlcy9kb21haW5sb29rdXAuaHRtbFwiLFxuICAgICAgICBcImltZy93aG9pcy53ZWJwXCIsXG4gICAgICAgIFwiV2hvSXMgTG9va3VwXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRvbWFpbiBpY29uc1wiLFxuICAgICAgICAgICAgXCJEb21haW4gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG9tYWluXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIdG1scmVzcG9uc2VzXCIsXG4gICAgICAgIDIsXG4gICAgICAgIFwiSFRNTCBGcmFtZXNcIixcbiAgICAgICAgXCJWaWV3IEhUTUwgcGFnZSByZXNwb25zZSBzdGF0dXMgaW5mb3JtYXRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDExKSxcbiAgICAgICAgXCJwYWdlcy9odG1scmVzcG9uc2VzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSFRNTF9GcmFtZXMud2VicFwiLFxuICAgICAgICBcIkhUTUwgZnJhbWVzIGV4YW1wbGVcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29kZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb2RlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvZGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICAgICAgMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0dHBzY2VydFwiLFxuICAgICAgICA0LFxuICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgIFwiU2VsZWN0IHRvIHZpZXcgYSB3ZWJzaXRlJ3MgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDI2KSxcbiAgICAgICAgXCJwYWdlcy9odHRwcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0dHBzX2NlcnQud2VicFwiLFxuICAgICAgICBcIkN1cnNvciBzZWxlY3RpbmcgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic3NsIGNlcnRpZmljYXRlIGljb25zXCIsXG4gICAgICAgICAgICBcIlNzbCBjZXJ0aWZpY2F0ZSBpY29ucyBjcmVhdGVkIGJ5IGluaXBhZ2lzdHVkaW8gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zc2wtY2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgICAgIDRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJ0ZWNoXCIsXG4gICAgICAgIDUsXG4gICAgICAgIFwiV2FwcGFseXplclwiLFxuICAgICAgICBcIldhcHBhbHl6ZXIgYnJvd3NlciBleHRlbnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMiksXG4gICAgICAgIFwicGFnZXMvd2VidGVjaC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dhcHBhbHl6ZXItbG9nby53ZWJwXCIsXG4gICAgICAgIFwiQnJvd3NlciBleHRlbnNpb24gbG9nby4gQSB3aGl0ZSB3IG9uIGEgcHVycGxlIHRpbGUuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSnNvbm9iamVjdFwiLFxuICAgICAgICA2LFxuICAgICAgICBcImpzb25PYmplY3RcIixcbiAgICAgICAgXCJKU09OIG9iamVjdCBub3RhdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCA5KSxcbiAgICAgICAgXCJwYWdlcy9qc29ub2JqZWN0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvanNvbi53ZWJwXCIsXG4gICAgICAgIFwiSlNPTiBsb2dvOiBBIGdyZXkgY2lyY2xlIHdpdGggYXJ0aXN0aWMgc3BpcmFscy5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXaS1GaVwiLFxuICAgICAgICA3LFxuICAgICAgICBcIldpLUZpIFZlcnNpb25cIixcbiAgICAgICAgXCJEZXRlcm1pbmUgV2lmaSBWZXJzaW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDE2KSxcbiAgICAgICAgXCJwYWdlcy93aWZpLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2lmaS53ZWJwXCIsXG4gICAgICAgIFwiV2ktRmkgbG9nbyB3aXRoIGEgYmxhY2sgY2lyY2xlIGJhY2tncm91bmQuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ2hhdGdwdFwiLFxuICAgICAgICA4LFxuICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgICAgICBcIkNoYXQgd2l0aCBhbiBBSSBmb3IgcmVzZWFyY2ggYW5kIGRldmVsb3BtZW50LlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgICAgIFwicGFnZXMvY2hhdGdwdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2FpLndlYnBcIixcbiAgICAgICAgXCJEZWNvcmF0aXZlIEFJIGxvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiYWkgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQWkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvYWlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgICAgICA4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUGFpbnQzZFwiLFxuICAgICAgICA5LFxuICAgICAgICBcIlBhaW50IDNEXCIsXG4gICAgICAgIFwiRWRpdCBwaWN0dXJlcyBvciBzY3JlZW4gY2FwdHVyZXMgdXNpbmcgcGFpbnQgM0RcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgICAgICBcInBhZ2VzL3BhaW50M2QuaHRtbFwiLFxuICAgICAgICBcImltZy9wcm90b3R5cGUud2VicFwiLFxuICAgICAgICBcIkNvbG9yZnVsIHByb3RvdHlwaW5nIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicHJvdG90eXBlIGljb25zXCIsXG4gICAgICAgICAgICBcIlByb3RvdHlwZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wcm90b3R5cGVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgICAgICAgIDlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEaWN0aW9uYXJ5XCIsXG4gICAgICAgIDEwLFxuICAgICAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcbiAgICAgICAgXCJMaXN0IGRpY3Rpb25hcnkgdGVybXMgdXNpbmcgYSBkaWN0aW9uYXJ5IEFQSVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAzMCksXG4gICAgICAgIFwicGFnZXMvZGljdGlvbmFyeXdvcmQuaHRtbFwiLFxuICAgICAgICBcImltZy9kaWN0aW9uYXJ5LndlYnBcIixcbiAgICAgICAgXCJEaWN0aW9uYXJ5IGljb24gZGVwaWN0aW9uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRpY3Rpb25hcnkgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGljdGlvbmFyeSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kaWN0aW9uYXJ5XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRpY3Rpb25hcnkgVGVybXNcIixcbiAgICAgICAgICAgIDEwXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQm9pbmNcIixcbiAgICAgICAgMTEsXG4gICAgICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAgICAgXCJQaXZvdCB0aGUgdW51c2VkIGNvbXB1dGluZyBwb3RlbnRpYWwgZm9yIHNjaWVuY2VcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgNiksXG4gICAgICAgIFwicGFnZXMvYm9pbmMuaHRtbFwiLFxuICAgICAgICBcImltZy9ib2luY19nbG9zc3kud2VicFwiLFxuICAgICAgICBcIkJPSU5DIGxvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiQk9JTkMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQk9JTkMgaWNvbiBkZXNpZ25lZCBieSBNaWNoYWwgS3Jha293aWFrLiBDb3lyaWdodChDKSBVbml2ZXJzaXR5IG9mIENhbGlmb3JuaWFcIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9ib2luYy5iZXJrZWxleS5lZHVcIixcbiAgICAgICAgICAgIFwiQk9JTkNcIixcbiAgICAgICAgICAgIFwiQ29udHJpYnV0ZSBmb3IgU2NpZW5jZSBVbml0ZWRcIixcbiAgICAgICAgICAgIDExXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSVBBZGRyZXNzXCIsXG4gICAgICAgIDEyLFxuICAgICAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgICAgIFwiTG9va3VwIHB1YmxpYyBhbmQgbG9jYWwgSVAgYWRkcmVzc2VzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDEzKSxcbiAgICAgICAgXCJwYWdlcy9pcGFkZHJlc3MuaHRtbFwiLFxuICAgICAgICBcImltZy9pcC53ZWJwXCIsXG4gICAgICAgIFwiSVAgbG9jYXRpb24gYW5kIGJyb3dzZXIgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJJUCBpY29uc1wiLFxuICAgICAgICAgICAgXCJJUCBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9pcFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICAgICAgMTJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MTWFya3VwXCIsXG4gICAgICAgIDEzLFxuICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgXCJSZXZlYWwgSFRNTCBzb3VyY2UgY29kZSBhbmQgSmF2YVNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwicGFnZXMvbWFya3VwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSFRNTF9zb3VyY2Uud2VicFwiLFxuICAgICAgICBcIkhUTUwgZnJhbWVzIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiaHRtbCBpY29uc1wiLFxuICAgICAgICAgICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0bWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICAgICAgMTNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJOZXR3b3Jrc3BlZWRcIixcbiAgICAgICAgMTUsXG4gICAgICAgIFwiTmV0d29yayBTcGVlZCBUZXN0XCIsXG4gICAgICAgIFwiVGVzdCB0aGUgbmV0d29yayBhZGFwdGVycyB3aXRoIGEgUG93ZXJTaGVsbCBzY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgNyksXG4gICAgICAgIFwicGFnZXMvbmV0d29ya3NwZWVkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcGFnZS1zcGVlZC53ZWJwXCIsXG4gICAgICAgIFwiU3BlZWQgdGVzdCBkaWFsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicGFnZSBzcGVlZCBpY29uc1wiLFxuICAgICAgICAgICAgXCJQYWdlIHNwZWVkIGljb25zIGNyZWF0ZWQgYnkgUHJvc3ltYm9scyBQcmVtaXVtIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcGFnZS1zcGVlZFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJOZXR3b3JrIFNwZWVkXCIsXG4gICAgICAgICAgICAxNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBvd2VyU2hlbGxkcml2ZXNcIixcbiAgICAgICAgMTcsXG4gICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgXCJTaW1pbGFyIHRvIGFuIEhERCwgZXhjZXB0IGl0IGlzIG9ubHkgaW4gUG93ZXJTaGVsbFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyMCksXG4gICAgICAgIFwicGFnZXMvZHJpdmVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdGVybWluYWwud2VicFwiLFxuICAgICAgICBcIkNvbXB1dGVyIHRlcm1pbmFsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGVybWluYWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGVybWluYWwgaWNvbnMgY3JlYXRlZCBieSBGbGF0IEljb25zIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGVybWluYWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiUG93ZXJTaGVsbCBEcml2ZXNcIixcbiAgICAgICAgICAgIDE3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0ROU1wiLFxuICAgICAgICAyMCxcbiAgICAgICAgXCJIb3cgRE5TIHdvcmtzXCIsXG4gICAgICAgIFwiQSBnZW5lcmFsIG92ZXJ2aWV3IG9mIERvbWFpbiBOYW1lIFN5c3RlbVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCA0KSxcbiAgICAgICAgXCJwYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBcImltZy9kbnMud2VicFwiLFxuICAgICAgICBcIkROUyBkcmF3aW5nIGF0dGFjaGVkIHRvIGEga2V5Ym9hcmRcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG5zIGljb25zXCIsXG4gICAgICAgICAgICBcIkRucyBpY29ucyBjcmVhdGVkIGJ5IGtlcmlzbWFrZXIgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kbnNcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEROU1wiLFxuICAgICAgICAgICAgMjBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fR29vZ2xlXCIsXG4gICAgICAgIDIyLFxuICAgICAgICBcIkdvb2dsZSBpcyAjMSB3ZWJzaXRlXCIsXG4gICAgICAgIFwiR29vZ2xlIGlzIHRoZSAjMSB0cmFmZmlja2VkIHNpdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTcpLFxuICAgICAgICBcInBhZ2VzL2dvb2dsZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaC1lbmdpbmUud2VicFwiLFxuICAgICAgICBcIkEgYmFyIGdyYXBoIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwicmFuayBpY29uc1wiLFxuICAgICAgICAgICAgXCJSYW5rIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWxtZWV0dXAgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9yYW5rXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBHb29nbGVcIixcbiAgICAgICAgICAgIDIyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIDIzLFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICBcIlJldmlldyB0aGUgRE9NIHdpdGggYSBET00gdHJlZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAyNyksXG4gICAgICAgIFwicGFnZXMvZG9tLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdHJlZS53ZWJwXCIsXG4gICAgICAgIFwiQSB0cmVlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidHJlZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJUcmVlIGljb25zIGNyZWF0ZWQgYnkganVzdGljb24gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90cmVlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRPTVwiLFxuICAgICAgICAgICAgMjNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJpZGVcIixcbiAgICAgICAgMjQsXG4gICAgICAgIFwiV2ViSURFXCIsXG4gICAgICAgIFwiVHJ5IHNraXBwaW5nIHRoZSBkb3dubG9hZCB3aXRoIGEgd2ViIElERVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAzKSxcbiAgICAgICAgXCJwYWdlcy93ZWJpZGVzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdXgud2VicFwiLFxuICAgICAgICBcIkEgY29tcHV0ZXIgYXBwbGljYXRpb24gaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkZXNpZ24gaWNvbnNcIixcbiAgICAgICAgICAgIFwiRGVzaWduIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Rlc2lnblwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJ3ZWJpZGVzXCIsXG4gICAgICAgICAgICAyNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICAyNSxcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgXCJGaW5kIGFuIFNWRyBhbmQgbGVhcm4gYWJvdXQgdGhlIFNWRyBsYW5ndWFnZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCA5KSxcbiAgICAgICAgXCJwYWdlcy9zdmcuaHRtbFwiLFxuICAgICAgICBcImltZy9zdmcuc3ZnXCIsXG4gICAgICAgIFwiQW4gc3ZnIGljb24gZXhhbXBsZS5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2NhbGFibGUgdmVjdG9yIGdyYXBoaWNzXCIsXG4gICAgICAgICAgICBcIlNWRyBpY29uIGNyZWF0ZWQgYnkgSGFydmV5IFJheW5lclwiLFxuICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvXCIsXG4gICAgICAgICAgICBcIlczQ1wiLFxuICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgIDI1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGlzYWJsZV9KYXZhc2NyaXB0XCIsXG4gICAgICAgIDI2LFxuICAgICAgICBcIkRpc2FibGUgSmF2YVNjcmlwdFwiLFxuICAgICAgICBcIkRpc2FibGUgdGhlIEphdmFTY3JpcHQgdG8gdGVzdCB3ZWJzaXRlIGZ1bmN0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDIyKSxcbiAgICAgICAgXCJwYWdlcy9qYXZhc2NyaXB0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvc29mdHdhcmUtYXBwbGljYXRpb24ud2VicFwiLFxuICAgICAgICBcIkEgamF2YXNjcmlwdCBmdW5jdGlvbiBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ3ZWIgY29kaW5nIGljb25zXCIsXG4gICAgICAgICAgICBcIldlYiBjb2RpbmcgaWNvbnMgY3JlYXRlZCBieSBNdWhhbW1hZCBBdGlmIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvd2ViLWNvZGluZ1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAyNlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19IVFRQXCIsXG4gICAgICAgIDI4LFxuICAgICAgICBcIkhUVFBcIixcbiAgICAgICAgXCJIVFRQIG1ha2VzIHNlbmRpbmcgYW5kIHJlY2VpdmluZyB3ZWIgcGFnZXMgcG9zc2libGUuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDYsIDEyKSxcbiAgICAgICAgXCJwYWdlcy9odHRwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cC53ZWJwXCIsXG4gICAgICAgIFwiSHR0cCB2ZXJiIGluIGZyb250IG9mIGEgZ2xvYmUgaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiaHR0cCBpY29uc1wiLFxuICAgICAgICAgICAgXCJIdHRwIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0dHBcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEhUVFBcIixcbiAgICAgICAgICAgIDI4XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ1NTZGVmXCIsXG4gICAgICAgIDI5LFxuICAgICAgICBcIkNTU1wiLFxuICAgICAgICBcIkNTUyBzdHlsZXMgdGhlIGVsZW1lbnRzIHdpdGhpbiBhIHBhZ2UuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDYsIDE5KSxcbiAgICAgICAgXCJwYWdlcy9jc3MuaHRtbFwiLFxuICAgICAgICBcImltZy9jc3MtMy53ZWJwXCIsXG4gICAgICAgIFwiQSBDU1MgdGhyZWUgbG9nby5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY3NzIGljb25zXCIsXG4gICAgICAgICAgICBcIkNzcyBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsIHBlcmZlY3QgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jc3NcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiQ1NTXCIsXG4gICAgICAgICAgICAyOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgMzIsXG4gICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICBcIlRyYXZlbCBsYXRlbmN5IGNhbiBzbG93IGRvd24gYSB3ZWJzaXRlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAxOCksXG4gICAgICAgIFwicGFnZXMvbGF0ZW5jeS5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nocm9ub21ldGVyLndlYnBcIixcbiAgICAgICAgXCJBIHN0b3B3YXRjaCBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0aW1lciBpY29uc1wiLFxuICAgICAgICAgICAgXCJUaW1lciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90aW1lclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgICAgICAzMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkhUTUxkZWZcIixcbiAgICAgICAgMzMsXG4gICAgICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICAgICAgXCJMZWFybiB0aGUgcGFydHMgYW5kIHN5bnRheCBvZiBhbiBIVE1MIGVsZW1lbnRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMjUpLFxuICAgICAgICBcInBhZ2VzL2h0bWwuaHRtbFwiLFxuICAgICAgICBcImltZy9odG1sLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGVsZW1lbnQgc3ludGF4IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiaHRtbCBpY29uc1wiLFxuICAgICAgICAgICAgXCJIdG1sIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2h0bWxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICAgICAgICAgIDMzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiVVJMXCIsXG4gICAgICAgIDM0LFxuICAgICAgICBcIlVSTCBBZGRyZXNzIEV4YW1wbGVzXCIsXG4gICAgICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYSBVUkxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgOCwgNyksXG4gICAgICAgIFwicGFnZXMvdXJsLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd3d3LndlYnBcIixcbiAgICAgICAgXCJVUkwgZXhhbXBsZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInVybCBpY29uc1wiLFxuICAgICAgICAgICAgXCJVcmwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdXJsXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgICAgICAzNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRhdGFTdG9yYWdlXCIsXG4gICAgICAgIDM1LFxuICAgICAgICBcIkRhdGEgU3RvcmFnZVwiLFxuICAgICAgICBcIkxvY2FsIHN0b3JhZ2Ugc2F2ZXMgZGF0YSB3aGVuIG5lZWRlZCBmb3IgY29uY3VycmVudCBwYWdlIHN1cmZpbmcuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDgsIDE0KSxcbiAgICAgICAgXCJwYWdlcy9kYXRhc3RvcmFnZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlcnZlci53ZWJwXCIsXG4gICAgICAgIFwiRGF0YSBzdG9yYWdlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zZXJ2ZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRGF0YSBTdG9yYWdlXCIsXG4gICAgICAgICAgICAzNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkhTTFwiLFxuICAgICAgICAzNixcbiAgICAgICAgXCJIdWUsIFNhdHVyYXRpb24sIGFuZCBMaWdodG5lc3NcIixcbiAgICAgICAgXCJIU0wgY29sb3JzIG1hbmlwdWxhdGUgaHVlcy5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgOSwgNiksXG4gICAgICAgIFwicGFnZXMvaHNsLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29sb3Itd2hlZWwud2VicFwiLFxuICAgICAgICBcIkNvbG9yIHdoZWVsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidmFyaWV0eSBpY29uc1wiLFxuICAgICAgICAgICAgXCJWYXJpZXR5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3ZhcmlldHlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSHVlLCBTYXR1cmF0aW9uLCBhbmQgTGlnaHRuZXNzXCIsXG4gICAgICAgICAgICAzNlxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogXCJHdWlkZSBTaG9ydHMnIHNlY3Rpb24gY2FyZCBkYXRhLlwiXG4gKi9cbmNvbnN0IEd1aWRlU2hvcnRzID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU2VhcmNodmVydGljYWxzXCIsXG4gICAgICAgIDE0LFxuICAgICAgICBcIkdVSURFOiBTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgIFwiT3B0aW1pemUgeW91ciBzZWFyY2ggZW5naW5lIG5ld3MgYW5kIHJlc3VsdHNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcImd1aWRlcy9zZWFyY2h2ZXJ0aWNhbHMuaHRtbFwiLFxuICAgICAgICBcImltZy9zZWFyY2hfc2V0dGluZ3Mud2VicFwiLFxuICAgICAgICBcIlNlYXJjaCBzZXR0aW5ncyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvbnRlbnQgd3JpdGluZyBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb250ZW50IHdyaXRpbmcgaWNvbnMgY3JlYXRlZCBieSBWZWN0b3JzIFRhbmsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb250ZW50LXdyaXRpbmdcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICAgICAgMTRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zZXJ2ZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgICAgIDE2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGV2dG9vbHNcIixcbiAgICAgICAgMTksXG4gICAgICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgICAgICBcIlJldmlldyBkZXYgdG9vbCdzIGFwcGxpY2F0aW9uIHRhYlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgICAgICAgICAgMTlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZ0b29sc3R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgICBcIk9wZW4gdGhlIGRldmVsb3BlcidzIHRvb2xib3ggYW5vdGhlciB3YXlcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTApLFxuICAgICAgICBcImd1aWRlcy9pbnNwZWN0cGFnZXMuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveDIud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb24gdHdvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgICAgICAyMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBXQUljb25cIixcbiAgICAgICAgMjcsXG4gICAgICAgIFwiR1VJREU6IEluc3RhbGwgdGhlIFBXQSBhcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCJQcm9ncmVzc2l2ZSB3ZWJzaXRlcyBoYXZlIGFuIGluc3RhbGxhdGlvbiBvcHRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjcpLFxuICAgICAgICBcImd1aWRlcy9wd2FpY29uLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYXBwLWRldmVsb3BtZW50LndlYnBcIixcbiAgICAgICAgXCJBcHAgZGV2ZWxvcG1lbnQgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkZXZlbG9wbWVudCBpY29uc1wiLFxuICAgICAgICAgICAgXCJEZXZlbG9wbWVudCBpY29ucyBjcmVhdGVkIGJ5IERlc2lnbiBDaXJjbGUgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXZlbG9wbWVudFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAyN1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNsZWFyY29va2llc1wiLFxuICAgICAgICAzMCxcbiAgICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAgIFwiRG9uJ3Qgd2FzdGUgdGltZSBzaWZ0aW5nIHRocm91Z2ggc2V0dGluZ3NcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMiksXG4gICAgICAgIFwiZ3VpZGVzL2NsZWFyY29va2llc3F1aWNrbHkuaHRtbFwiLFxuICAgICAgICBcImltZy9jb29raWVzLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGNvb2tpZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvb2tpZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb29raWUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29va2llXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgICAgICAgIDMwXG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBcIkV4cGxvcmUgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIk5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgTkFTQSBkb21haW4uIExlYXJuIGFib3V0IHRoZSB1bml2ZXJzZSB2aWEgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgICAgIFwiSW1hZ2Ugc291cmNlIHZpYSB0aGUgTmF0aW9uYWwgQWVyb25hdXRpY3MgYW5kIFNwYWNlIEFkbWluaXN0cmF0aW9uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3Lm5hc2EuZ292L2F1ZGllbmNlL2ZvcnN0dWRlbnRzLzUtOC9mZWF0dXJlcy9zeW1ib2xzLW9mLW5hc2EuaHRtbFwiLFxuICAgICAgICAgICAgXCJOQVNBXCIsXG4gICAgICAgICAgICBcIk5BU0EgUGFnZXNcIixcbiAgICAgICAgICAgIDNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJWaXJ0dWFsdG91clwiLFxuICAgICAgICAxOCxcbiAgICAgICAgXCJFWFBMT1JFOiBWaXJ0dWFsIFRvdXJzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgcmVhbCB3b3JsZCBpbiBhIHdlYiBicm93c2VyXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIzKSxcbiAgICAgICAgXCJleHBsb3JlL3ZpcnR1YWx0b3VyLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZ29vZ2xlLWV4cGVkaXRpb25zLndlYnBcIixcbiAgICAgICAgXCJHb29nbGUgRXhwZWRpdGlvbnMgbG9nbyBmcm9tIEZMQVRJQ09OXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImdvb2dsZSBleHBlZGl0aW9ucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJHb29nbGUgZXhwZWRpdGlvbnMgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZ29vZ2xlLWV4cGVkaXRpb25zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlZpcnR1YWwgVG91clwiLFxuICAgICAgICAgICAgMThcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJiXCIsXG4gICAgICAgIDMxLFxuICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlXCIsXG4gICAgICAgIFwiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDMpLFxuICAgICAgICBcImV4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL0pXU1RfcG9zdGVyLndlYnBcIixcbiAgICAgICAgXCJKYW1lcyBXZWJiIHNwYWNlIHRlbGVzY29wZSBwb3N0ZXIgaW1hZ2VcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSGV4YWdvbiBMaXRobyAoMjAxOClcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvbiBwcm92aWRlZCBieSBuYXNhLmdvdlwiLFxuICAgICAgICAgICAgXCJodHRwczovL2p3c3QubmFzYS5nb3YvY29udGVudC9mZWF0dXJlcy9lZHVjYXRpb25hbC9wcmludC5odG1sXCIsXG4gICAgICAgICAgICBcImp3c3QubmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvblwiLFxuICAgICAgICAgICAgMzFcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIE11bHRpZGltZW5zaW9uYWwgYXJyYXkuIFJvd3MgYXJlIHRoZSBkaWZmZXJlbnQgc2VjdGlvbnMuIENvbHVtbnNcbiAqIGNvbnRhaW4gZWFjaCBhcnRpY2xlJ3MgZGF0YSBiZWxvbmdpbmcgaW4gdGhhdCBzZWN0aW9uLlxuICovXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cbmV4cG9ydCBkZWZhdWx0IFdFQkJJVERBVEE7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJXQkxpbmsgZnJvbSAnLi4vbW9kZWxzL1JXQkxpbmsnO1xuXG4vKipcbiAqIEhlYWRlciBuYXZpZ2F0aW9uIGxpbmsgZGF0YVxuICovXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBSV0JMaW5rKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJwYWdlcy5odG1sXCJcbik7XG5cbmNvbnN0IGdhbWVOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJHYW1lXCIsXG4gICAgXCJGbGFzaENhcmRzXCIsXG4gICAgXCJHYW1lXCIsXG4gICAgXCJmbGFzaGNhcmRzLmh0bWxcIlxuKTtcblxuLyoqIE5hdmlnYXRpb24gbGlua3MgKi9cbmNvbnN0IE5BVklURU1TID0gW2hvbWVOYXZMaW5rLCBwYWdlc05hdkxpbmssIGdhbWVOYXZMaW5rXTtcbmV4cG9ydCBkZWZhdWx0IE5BVklURU1TO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmNvbnN0IHBvcnRkZWZpbml0aW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMjIsIFwiU2VjdXJlIFNTSCAgL1RDUFwiXSxcbiAgICBbMjMsIFwiVGVsbmV0ICh1bnNlY3VyZSlcIl0sXG4gICAgWzI1LCBcIlNNVFAgLSA0NjUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gICAgWzQ5LCBcIlRBQ0FDUytcIl0sXG4gICAgWzUzLCBcIkROUyAgL1VEUC9UQ1BcIl0sXG4gICAgWzY3LCBcIkRIQ1BcIl0sXG4gICAgWzY4LCBcIkRIQ1BcIl0sXG4gICAgWzgwLCBcIkhUVFAgIC9UQ1BcIl0sXG4gICAgWzg4LCBcIktlcmJlcm9zLXNlYyAgL1RDUC9VRFBcIl0sXG4gICAgWzExMCwgXCJQT1AgLSA5OTUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gICAgWzEzNSwgXCJSUENcIl0sXG4gICAgWzEzNywgXCJORVRCSU9TXCJdLFxuICAgIFsxMzgsIFwiTkVUQklPU1wiXSxcbiAgICBbMTM5LCBcIk5FVEJJT1NcIl0sXG4gICAgWzE0MywgXCJJTUFQIC0gOTkzIGZvciBlbmNyeXB0ZWRcIl0sXG4gICAgWzE2MSwgXCJTTk1QICBNYW5hZ2VyXCJdLFxuICAgIFsxNjIsIFwiU05NUCAgQWdlbnRcIl0sXG4gICAgWzM4OSwgXCJMREFQIC0gNjM2IGZvciBzZWN1cmVcIl0sXG4gICAgWzQ0MywgXCJIVFRQUyAgL1RDUFwiXSxcbiAgICBbNDQ1LCBcIlNNQiAgL1RDUFwiXSxcbiAgICBbNDY1LCBcIlNNVFAgYnkgVExTXCJdLFxuICAgIFs1MTQsIFwiU1lTTE9HICAvVURQXCJdLFxuICAgIFs1ODcsIFwiU01UUFMgU1RBUlRUTFNcIl0sXG4gICAgWzYzNiwgXCJMREFQIFNTTFwiXSxcbiAgICBbOTkwLCBcIkZUUFNcIl0sXG4gICAgWzk5MywgXCJJTUFQIFRMU1wiXSxcbiAgICBbOTk1LCBcIlBPUCBUTFNcIl0sXG4gICAgWzE4MTIsIFwiUkFESVVTICAvVENQL1VEUFwiXSxcbiAgICBbMTgxMywgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgIFszMjY5LCBcIk1pY3Jvc29mdCBHbG9iYWwgQ2F0YWxvZ1wiXSxcbiAgICBbMzM4OSwgXCJSRFBcIl0sXG5dKTtcbmV4cG9ydCBkZWZhdWx0IHBvcnRkZWZpbml0aW9ucztcbiIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgSGVhZGVyRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9IZWFkZXJGb290ZXInO1xuaW1wb3J0IFBhZ2VDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9QYWdlQ29tcG9uZW50cyc7XG5pbXBvcnQgQ2xhc3NDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMnO1xuaW1wb3J0IG1vYmlsZUFiYnJNYXJrdXAgZnJvbSAnLi9jb21wb25lbnRzL21vYmlsZU1hcmt1cCdcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4vbW9kZWxzL1NjcmlwdFBlcmYnXG5cblxuY29uc3QgbWFpbnBlcmYgPSBuZXcgUldCUGVyZihcIm1haW5cIik7XG5cbi8vIGVudHJ5IHBvaW50XG4vKipcbiAqIFR5cGVTY3JpcHQgZW50cnkgcG9pbnQuIFRoaXMgc2NyaXB0IGluaXRpYWxpemVzIHBhZ2UgY29tcG9uZW50cyBhbmQgbW9kZWxzIGFzXG4gKiAgdGhleSdyZSBuZWVkZWQgbWFpbi5pbml0KCkgaXMgdGhlIGluaXRpYWxpemF0aW9uIG9mIFwidHlwZXNjcmlwdC5qc1wiLlxuICovXG5jb25zdCBtYWluID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgcGFnZSB3aWRnZXRzIGFuZCBhcHBsaWNhdGlvbiBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gRXZlbnQgZmlyZWQgYmVmb3JlIGFzc2V0cyBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2VcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBhbmQgZm9vdGVyIGNvbXBvbmVudHNcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgcGFnZSBjb21wb25lbnRzXG4gICAgICAgICAgICBQYWdlQ29tcG9uZW50cy5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZWxlbWVudCBjb21wb25lbnRzXG4gICAgICAgICAgICBDbGFzc0NvbXBvbmVudHMuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyA8YWJicj48L2FiYnI+IHN0eWxlczogaW1wbGVtZW50ZWQgZm9yIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICBtb2JpbGVBYmJyTWFya3VwLmluaXQoKTtcblxuICAgICAgICAgICAgbWFpbnBlcmYuZW5kKCk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcbn07XG5cbm1haW4uaW5pdCgpO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKlxuICogYXBpR0VUIGlzIGZvciBmZXRjaCByZXF1ZXN0cy4gVXNlIGFuIGFwaUdFVCBvYmplY3QgdG8gbWFuaXB1bGF0ZSB0aGUgZmV0Y2hcbiAqICByZXF1ZXN0IGludG8gZWl0aGVyOlxuICpcbiAqIDEuIHJldHVybmluZyBkYXRhXG4gKlxuICogLS1vciAtLVxuICpcbiAqIDIuIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gdGhlIGJyb3dzZXIgY2FjaGUgdG8gcmV0cmlldmUgbGF0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIGFwaUdFVCB7XG4gIHB1YmxpYyBlcnJvckVsZW06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIEdFVFVSTDogVVJMO1xuICBwcml2YXRlIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSByZWNlaXZlZERhdGE6IGFueTsgLy9UT0RPOiBjaGVjayBpZiB0aGlzIGlzIG5lZWRlZFxuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnN0cnVjdG9yIGdhdGhlcnMgYWxsIHRoZSBuZWVkZWQgaW5mb3JtYXRpb24gZm9yIGZldGNoIGFuZC9vciBicm93c2VyXG4gICAqICBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gc2VuZFRvQnJvd3NlckNhY2hlICAtIEJvb2xlYW4gdmFsdWUgZGV0ZXJtaW5pbmcgZmV0Y2ggY2FjaGluZy5cbiAgICogQHBhcmFtIGJyb3dzZXJDYWNoZU5hbWUgLSBJZiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIGJyb3dzZXIgY2FjaGUsIHRoaXMgc3RyaW5nIHByb3ZpZGVzIHRoZSBuYW1lIGZvciBzdG9yYWdlLlxuICAgKiBAcGFyYW0gZXJyb3JFbGVtIC0gU2hvdWxkIHRoZSBmZXRjaCByZXF1ZXN0IGZhaWwsIHJldHVybiBlcnJvciBzdGF0dXMgdG8gdGhpcyBlbGVtZW50LlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgR0VUVVJMOiBVUkwsXG4gICAgc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuLFxuICAgIGVycm9yRWxlbTogSFRNTEVsZW1lbnQsXG4gICAgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbFxuICApIHtcbiAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IHNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgICB0aGlzLmJyb3dzZXJDYWNoZU5hbWUgPSBicm93c2VyQ2FjaGVOYW1lO1xuICAgIHRoaXMuZXJyb3JFbGVtID0gZXJyb3JFbGVtO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAqL1xuICBwdWJsaWMgZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLkdFVFVSTFxuICAgKi9cbiAgcHVibGljIGdldEdFVFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy5HRVRVUkw7XG4gIH1cblxuICAvKipcbiAgICogRmxpcCB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSBib29sZWFuIHZhbHVlIGZyb20gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgc2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZldGNoIHJlcXVlc3QgY2FuIHRha2UgVVJMIG9yIHN0cmluZyBwYXJhbWV0ZXIuIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYXBpR0VUXG4gICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKi9cbiAgcHVibGljIHNldEdFVFVSTChHRVRVUkw6IFVSTCB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgR0VUVVJMID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLkdFVFVSTCA9IG5ldyBVUkwoR0VUVVJMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBBIHB1YmxpYyBmdW5jdGlvbiBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAqICB0aGUgcmVxdWVzdCBuZWVkcyBhZGRlZCB0byBicm93c2VyIHN0b3JhZ2UsIHRoZSBmZXRjaCBpcyBtYWRlIGFuZCBzZW50IHRvXG4gICAqICBzdG9yYWdlLiBBIGNsb25lZCBjb3B5IG9mIHRoZSBmZXRjaGVkIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGlzXG4gICAqICBzZW50IHRvIHRoZSBjYWNoZS4gV2l0aG91dCBzZW5kaW5nIHRvIGJyb3dzZXIgY2FjaGUsIHRoZSBmZXRjaCBpcyByZXF1ZXN0ZWQgYW5kIFxuICAgKiByZXR1cm5lZC5cbiAgICogIFxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYXBpR0VUKEdFVFVSTDogVVJMKSB7XG4gICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgY2FjaGUgc3RvcmFnZVxuICAgIGlmICh0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSkge1xuICAgICAgLy9UaGUgcmV0dXJuZWQgZGF0YSBpcyBwYWNrYWdlcyBhcyBhIFByb21pc2Ugb2JqZWN0XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgLy9PcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgd2luZG93LmNhY2hlcy5vcGVuKHRoaXMuYnJvd3NlckNhY2hlTmFtZSkudGhlbigoY2FjaGUpID0+IHtcbiAgICAgICAgICAgIGNhY2hlcy5tYXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvL05vIG1hdGNoZXMgZm9yIHRoaXMgcmVxdWVzdCBpbiBTdG9yYWdlIENhY2hlLCBzbyBmZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgIC8vVXBvbiBzdWNjZXNzLCBhIGNsb25lZCBjb3B5IHdpbGwgbmVlZCB0byBiZSByZXR1cm5lZC5cbiAgICAgICAgICAgICAgICBmZXRjaChHRVRVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy9Db3B5IHRoZSByZXNwb25zZSBzaW5jZSBpdCBjYW4gb25seSBiZSByZWFkIG9uY2VcbiAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRyZXNwID0gcmVzdWx0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgIC8vQWRkIHRoZSByZXN1bHQgdG8gdGhlIGNhY2hlXG4gICAgICAgICAgICAgICAgICBpZiAoY2xvbmVkcmVzcC5zdGF0dXMgIT0gNDA0KXtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KEdFVFVSTCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVkcmVzcC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0NhY2hlIGhpdCBzdWNjZXNzLCByZXR1cm4gdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5qc29uKCkudGhlbih0ZXh0ID0+IHRleHQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZSA9PiB7Ly9DYW5ub3Qgb3BlbiBTdG9yYWdlIENhY2hlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNQcm9ibGVtIG9wZW5pbmcgQ2FjaGUgU3RvcmFnZS4gTmFtZTogJHt0aGlzLmJyb3dzZXJDYWNoZU5hbWV9YCwgXCJjb2xvcjogZ3JleVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gZmFsc2U7XG4gICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7Ly9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJQcm9taXNlIGVycm9yIG9uIGRhdGEgZmV0Y2guXCIpKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vVGhlIHByb21pc2UgaGFzIHJlc29sdmVkIC0tPiByZXR1cm4gdGhlIHByb21pc2UgZGF0YVxuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgfSk7XG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmZXRjaCByZXF1ZXN0LCByZXR1cm5pbmcgYSBmZXRjaCBwcm9taXNlLlxuICAgKiBAcGFyYW0gR0VUVVJMIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhLnRleHQoKSBvciBkYXRhIGJhc2VkIG9uIHRoZSBpbnN0YW5jZSByZXR1cm5lZC5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEYXRhKEdFVFVSTDogVVJMKSB7XG4gICAgcmV0dXJuIGZldGNoKEdFVFVSTClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5hcGlSZXNwb25zZUVycm9yQ2hlY2socmVzcG9uc2UpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IGAke2UubWVzc2FnZX1gO1xuICAgICAgfSk7XG4gIH1cblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCTGluayBmcm9tIFwiLi9SV0JMaW5rXCI7XG5cbi8qKiBcbiAqIFVzZWQgZm9yIGltYWdlIEF0dHJpYnV0aW9uXG4qL1xuY2xhc3MgQXR0cmlidXRpb25MaW5rIGV4dGVuZHMgUldCTGluayB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgcHVibGljIGF0dHJpYnV0ZWRvd25lcjogc3RyaW5nO1xuICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgcHVibGljIGFydGljbGVpZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8qKkxpbmsgdGl0bGUgKi9cbiAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgLyoqTGluayBpbm5lciB0ZXh0ICovXG4gICAgICAgIGlubmVyVGV4dDogc3RyaW5nLFxuICAgICAgICAvKiogbGluayBocmVmICovXG4gICAgICAgIGhSZWZlcmVuY2U6IHN0cmluZyxcbiAgICAgICAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgICAgICAgYXR0cmlidXRlZG93bmVyOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgcGFnZSAqL1xuICAgICAgICBwYWdlTmFtZTogc3RyaW5nLFxuICAgICAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgICAgICBhcnRpY2xlaWQ6IG51bWJlclxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRpdGxlLCBpbm5lclRleHQsIHBhZ2VOYW1lLCBoUmVmZXJlbmNlKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVkb3duZXIgPSBhdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgIHRoaXMuYXJ0aWNsZWlkID0gYXJ0aWNsZWlkO1xuICAgICAgICBBdHRyaWJ1dGlvbkxpbmsuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0aW9uTGluaztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvckNvZGUge1xuICAgIGVsZW1zOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PltdO1xuICAgIGNvbG9yOiBzdHJpbmdbXTtcbiAgICByZXNldGJ0bjogRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvciAoY29sb3JsZXNzZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W10sIGNvbG9yczogc3RyaW5nW10sIHJlc2V0YnRuOiBFbGVtZW50KXtcbiAgICAgICAgdGhpcy5lbGVtcyA9IGNvbG9ybGVzc2VsZW1lbnRzO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3JzO1xuICAgICAgICB0aGlzLnJlc2V0YnRuID0gcmVzZXRidG47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRpbmcodGhpcy5lbGVtc1tpXSwgdGhpcy5jb2xvcltpXSk7XG4gICAgICAgICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRSZXNldCh0aGlzLmVsZW1zW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNvbG9yIHRoZSBleGFtcGxlIGFyZWEncyBlbGVtZW50cyB1c2luZyBjc3NcbiAgICAgKiBAcGFyYW0gZWxlbXNsaXN0IC0gTm9kZSBsaXN0IG9mIEhUTUxFbGVsZW1lbnRzLiBJLkUuIHVzaW5nIHF1ZXJ5LlNlbGVjdG9yQWxsKClcbiAgICAgKiBAcGFyYW0gY29sb3IgLSBTdHJpbmcgb2YgQ1NTIGNvbG9yIHZhbHVlXG4gICAgICovXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodGluZyAoZWxlbXNsaXN0OiAgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4sIGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL2Z1bmN0aW9uIHRvIHJlc2V0IHRoZSBjc3MgY29kZSBwcm9wZXJ0aWVzIGNvbG9yIHRvIG9yaWdpbmFsXG4gICAgY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KCBlbGVtc2xpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KXtcbiAgICAgICAgdGhpcy5yZXNldGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGFwaUdFVCB9IGZyb20gXCIuLi9tb2RlbHMvQVBJXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZCB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IERpY3Rpb25hcnlTZWFyY2hNYXJrdXAgZnJvbSBcIi4vRGljdGlvbmFyeVNlYXJjaE1hcmt1cFwiO1xuaW1wb3J0IFJXQkVycm9yIGZyb20gXCIuL1JXQkVycm9yQnVzXCI7XG5pbXBvcnQgeyBSV0JQYXJzZUpTT04gfSBmcm9tIFwiLi9SV0JKU09OQ29udmVydGVyXCI7XG5pbXBvcnQgeyBSV0JTdHJpbmdpZnlKU09OIH0gZnJvbSBcIi4vUldCSlNPTkNvbnZlcnRlclwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaCBpcyBhIHNldCBvZiBtYXJrdXAgY3JlYXRpb24gYW5kIGZ1bmN0aW9ucyB3aGljaCBhbGxvdyBhIHVzZXJcbiAqICB0byBsb29rIHVwIGEgd29yZCBsaWtlIGEgRGljdGlvbmFyeS4gV2hlbiBjYWxsZWQsIHRoZSB1c2VyJ3MgaW5wdXQgaXMgdmFsaWRhdGVkXG4gKiAgYXMgYW4gYWNjZXB0YWJsZSB3b3JkIG9yIGl0IGRlY2xpbmVzIHRoZSByZXF1ZXN0LCB0aGVuIHNob3dpbmcgdGhlIHVzZXIgaWYgdGhlIHdvcmRcbiAqICBpcyBhY2NlcHRhYmxlLlxuICpcbiAqIENyZWF0aW5nIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IHJlcXVpcmVzIHBhc3NpbmcgYSByZWZlcmVuY2UgZWxlbWVudCAoZm9yIGFcbiAqIGtub3duIHBsYWNlbWVudCBsb2NhdGlvbikgdGhhdCBjb250YWlucyB0aGUgJ2RpY3Rpb25hcnlXaWRnZXQnIGNsYXNzLlxuICpcbiAqICAgbmV3IERpY3Rpb25hcnlTZWFyY2goZWxlbSk7XG4gKlxuICogQWxsIHRoZSBuZWVkZWQgZWxlbWVudHMgYW5kIGZ1bmN0aW9uYWxpdHkgYXJlIGFkZGVkIHRvIHRoZSBwYWdlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2ggZXh0ZW5kcyBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIHtcbiAgcHVibGljIHN0YXRpYyB3b3JkU3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdO1xuICBwcml2YXRlIHN0YXRpYyBDYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdDogc3RyaW5nID0gXCJSV0Jfd29yZF9mZXRjaFwiO1xuICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0VXJsOiBzdHJpbmcgPVxuICAgIFwiaHR0cHM6Ly9hcGkuZGljdGlvbmFyeWFwaS5kZXYvYXBpL3YyL2VudHJpZXMvZW4vXCI7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd29yZFVSTDogVVJMO1xuICBwcml2YXRlIHdvcmREYXRhOiBvYmplY3Q7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgY3JlYXRlcyBhbGwgdGhlIGZ1bmN0aW9uYWxpdHkgYW5kIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICAgKiAgRGljdGlvbmFyeSBTZWFyY2ggd2lkZ2V0IGludGVyZmFjZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwbGFjZSB3aWRnZXQgbWFya3VwLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW52b2tlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuXG4gICAgc3VwZXIoZWxlbSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgLy9Jbml0aWFsaXplIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCB3aXRoIGNsaWNrIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuYWRkV2lkZ2V0RXZlbnRzKCk7XG4gICAgLy9TdG9yZSB3b3JkcyBjYWNoZSBkYXRhIHdpdGggaW5pdGlhbGl6YXRpb24uXG4gICAgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9IERpY3Rpb25hcnlTZWFyY2guZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIExvY2FsIFN0b3JhZ2Ugd29yZHMgcHJldmlvdXNseSBzdG9yZWQgd2l0aCB0aGUgRGljdGlvbmFyeSBTZWFyY2ggV2lkZ2V0LlxuICAgKlxuICAgKiBAcmV0dXJucyBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlIC0gdGhlc2UgYXJlIHRoZSB3b3JkcyBzdG9yZWQgcHJldmlvdXNseSBpbiB0aGVcbiAgICogIGJyb3dzZXIgY2FjaGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB7XG4gICAgLy9Mb2NhbCBTdG9yYWdlICd3b3JkLWNhY2hlcycgaXRlbXMgZGF0YSBhc3NpZ25tZW50XG4gICAgLy9jYWNoZSByZXNwb25zZSBsaW5rcyBhbmQgY2FjaGUgbmFtZSBhcmUgcHJldmlvdXNseSBzdG9yZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGxldCBzdG9yYWdlU3RyOiBzdHJpbmc7XG4gICAgaWYoUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJEaWN0aW9uYXJ5U2VhcmNoXCIsIFwid29yZC1jYWNoZXNcIiwgdHJ1ZSwgdHJ1ZSkpe1xuICAgICAgLy9UaGUgTG9jYWwgU3RvcmFnZSBpcyBudWxsIG9yIGVtcHR5LS0+IENvbmZpcm0gaGVyZSB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGFueSBDYWNoZSBTdG9yYWdlIGl0ZW1zIGluIGVycm9yXG4gICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpe1xuICAgICAgICBpZiAod2luZG93LmNhY2hlcy5oYXMoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCkpe1xuICAgICAgICAgICAgd2luZG93LmNhY2hlcy5kZWxldGUoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd3b3JkLWNhY2hlcycpO1xuICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAvL2NoZWNrIHRoZSB3b3JkLWNhY2hlIHZhbHVlIGZvciBjb3JyZWN0IGpzb24gcGFyc2luZ1xuICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04oc3RvcmFnZVN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCl7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCwgXG4gICAgICAgICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgdGhpcy5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBwYXJzZXRlc3QucmV0dXJub2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZFVSTFxuICAgKi9cbiAgcHVibGljIGdldFdvcmRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgZmV0Y2hlZCB3b3JkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGFuZCBrZXlwcmVzcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHdpZGdldC4gSW5wdXQgZXZlbnQgbGlzdGVuZXJzICdjbGljaydcbiAgICogIGFuZCAna2V5cHJlc3MnIGF3YWl0IGZvciBhIHNlYXJjaCBjYWxsLiBBbHNvLCBzaG91bGQgYSB1c2VyIHdhbnQgdG8gc2VhcmNoIGFcbiAgICogIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZCwgdGhlIHdpZGdldCBhZGFwdHMgbWFya3VwIGZvciB0aGF0IHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGFkZFdpZGdldEV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQSBzZWFyY2ggZWxlbWVudCBpcyB1bmRlZmluZWQgZnJvbSBzZWFyY2hXb3JkIHwgd29yZFNlYXJjaFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGljdGlvbmFyeS1idG5zXCIpO1xuICAgIGNvbnN0IGhpZGVQcmV2aW91c1BhbmVsID0gKCkgPT4ge1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL0FkZCBmb3JtIGlucHV0IGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vVXBvbiBpbnB1dCBlbnRyeSwgZmlyZSBBUEkgZmV0Y2hcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgZmFsc2UsIG51bGwpO1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkgaGlkZVByZXZpb3VzUGFuZWwoKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIikgcmV0dXJuO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkgaGlkZVByZXZpb3VzUGFuZWwoKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgLy9cIlByZXZpb3VzIHdvcmQgc2VhcmNoZXNcIiBidXR0b24gZmV0Y2hlcyBsb2NhbGx5IHN0b3JlZCB3b3Jkc1xuICAgIC8vQ2xpY2tpbmcgdGhlIGJ1dHRvbiBkaXNwbGF5cyBlYWNoIHdvcmQgaW4gYSBsaXN0IHdpdGhpbiB0aGUgd2lkZ2V0XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2hlY2tjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKCk7XG4gICAgICB9KTtcbiAgICBcbiAgICAvL1wiUmVmcmVzaFwiIGJ1dHRvbiByZWxvYWRzIHRoZSBwYWdlXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKCkge1xuICAgIGNvbnN0IHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgIGxldCBidXR0b25Db250YWluZXIgPSB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZHNDb250YWluZXI7XG5cbiAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRvciBhbmQgd29yZCBjYWNoZXMgZm9yIHVuZGVmaW5lZFxuICAgIGlmIChwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9PSBudWxsIHx8XG4gICAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIGlmICghdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkKSB7XG4gICAgICAgICAgY29uc3Qgbm9Xb3Jkc0hlYWRpbmdFbGVtID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSBcIlByZXZpb3VzIHdvcmRzIG5vdCBmb3VuZC4gVGhlIGNhY2hlIGlzIGVtcHR5LlwiO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkKSB7XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnModGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCwgYnV0dG9uQ29udGFpbmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucyhwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYW55LCBidXR0b25Db250YWluZXI6IEhUTUxEaXZFbGVtZW50KXtcbiAgICBpZihwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCl7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAgIGxldCBwcmV2aW91c3dvcmRidXR0b25zOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9IHRoaXMuY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyhEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlLCBidXR0b25Db250YWluZXIpO1xuICAgICAgZm9yIChsZXQgYnRuIG9mIHByZXZpb3Vzd29yZGJ1dHRvbnMpe1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgbmV3IGJ1dHRvbi5cbiAgICAgIC8vdGhpcyBpcyB0aGUgY2FjaGVkIHdvcmQgYnV0dGVuLiB3aGVuIGl0J3MgY2xpY2tlZCwgZmlyZSBhIHdvcmQgc2VhcmNoXG4gICAgICBidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCB0cnVlLCBidG4ud29yZCk7XG4gICAgICB9KTtcbiAgICAgIC8vTU9CSUxFXG4gICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKCkgPT4ge1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRlIGJ1dHRvblxuICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHdvcmQgdG8gdGhlIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIGNvbnRhaW5pbmcgd29yZCBkYXRhLCBVUkwsIGFuZCBjYWNoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdldmFsdWUgLSBUaGlzIGludGVyZmFjZSBzdG9yZXMgaW5mb3JtYXRpb24gd2hlcmUgc2VuZGluZyB0byBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXZhbHVlOiBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgLy9Mb2cgdGhlIHdvcmQgY2FjaGUgY3JlYXRpb25cbiAgICBjb25zdCBhZGRlZHdvcmRjYWNoZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNBZGRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXZhbHVlLndvcmR9YCwgXG4gICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Jyk7XG4gICAgfVxuICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V2YWx1ZScgbmVlZHMgYWRkZWQgdG8gbG9jYWwgc3RvcmFnZSBjYWNoZVxuICAgIC8vTG9jYWwgc3RvcmFnZSBtYXkgYmUgZW1wdHkgb3IgYWxyZWFkeSBoYXZpbmcgdGhlIHdhbnRlZCBzZWFyY2hlZCB3b3JkXG4gICAgLy9DaGVjayBzdG9yYWdlIGlzIG5vdCBudWxsLiBJZiBpdCBpcywgYWRkIHRoZSB3b3JkLlxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIGlmIChSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICAgIC8vQWRkIHRoZSBzdG9yYWdlIHdvcmQgdG8gYW4gYXJyYXlcbiAgICAgICAgbGV0IHdvcmRTdG9yZTogbG9jYWxzdG9yYWdld29yZFtdID0gW107XG4gICAgICAgIHdvcmRTdG9yZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcbiAgICAgICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgICAgbGV0IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih3b3JkU3RvcmUpKTtcbiAgICAgICAgaWYoIXN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkLnBhc3NlZCl7XG4gICAgICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGpzb25zdHIgPSBzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5yZXR1cm5zdHI7XG5cbiAgICAgICAgLy8gTG9jYWwgc3RvcmFnZSBpcyBlbXB0eSA9PiBhZGQgdGhlIHdvcmRcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBqc29uc3RyKTtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0NyZWF0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCwgXG4gICAgICAgICAgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vTG9jYWwgc3RvcmFnZSBpcyBub3QgZW1wdHkuIEhlcmUsIHdlIG5lZWQgdG8gYWRkIHRoZSB3b3JkIHRvIHRoZSBleGlzdGluZyB3b3JkIGNhY2hlLlxuICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZFtdID0gRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZTtcbiAgICBsZXQganNvbnN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vTWF0Y2ggdGhlIGN1cnJlbnQgVVJMIGZvciBjYWNoZSBtYW5hZ2VtZW50XG4gICAgZm9yIChsZXQgY2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgIGlmIChjYWNoZS53b3JkVVJMID09IGxvY2Fsc3RvcmFnZXZhbHVlLndvcmRVUkwpIHtcbiAgICAgICAgLy9Xb3JkIGlzIGFscmVhZHkgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAgICAvL05vIG5lZWQgdG8gYWRkIGl0IHRvIHRoZSBhcnJheVxuICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICAvL0FkZCB3b3JkIHRvIGV4aXN0aW5nICd3b3JkLWNhY2hlcycgaW4gTG9jYWwgU3RvcmFnZVxuICAgIGFsbGNhY2hlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuXG4gICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICBsZXQgc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKGFsbGNhY2hlKSk7XG4gICAgaWYoIXN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnBhc3NlZCl7XG4gICAgICAvL3N0cmluZ2lmeSBvYmplY3QgZGlkIG5vdCB3b3JrLCBzbyByZXR1cm5cbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBqc29uc3RyID0gc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQucmV0dXJuc3RyO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCBqc29uc3RyKTtcbiAgICBhZGRlZHdvcmRjYWNoZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHByZXZpb3VzIHdvcmQgZGF0YSBmcm9tIGJyb3dzZXIncyBMb2NhbCBTdG9yYWdlIC0tPiBLZXkvVmFsdWVcbiAgICogZGF0YSByZWZlcmVuY2luZyB3b3JkcyBzdG9yZWQgaW4gbG9jYWwgY2FjaGUuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V3b3JkIC0gc3RyaW5nIGZyb20gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCIgYnV0dG9uXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZURpY3Rpb25hcnlUZXJtZnJvbUxvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V3b3JkOiBzdHJpbmcpIHtcbiAgICAvL1JlbW92ZSB0aGUgY2FjaGUgaXRlbSB0byBMb2NhbCBTdG9yYWdlLCBDYWNoZSBTdG9yYWdlXG4gICAgLy9DaGVjayBsb2NhbCBzdG9yYWdlIGlzIG5vdCBudWxsIG9yIGVtcHR5XG4gICAgaWYgKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vR2V0IHRoZSB3b3JkcyBhcnJheSBmcm9tIExvY2FsIFN0b3JhZ2VcbiAgICAvL1JXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoXCJEaWN0aW9uYXJ5V2lkZ2V0XCIsIFwid29yZC1jYWNoZXNcIik7IC8vbG9nIHdoZXRoZXIgZmV0Y2hlZCB3b3JkIGNhY2hlIGlzIG51bGwgb3IgZW1wdHkuXG4gICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuICAgIFxuICAgIC8vUmVtb3ZlIHRoZSB3b3JkIGZyb20gQ2FjaGUgU3RvcmFnZSBhbmQgTG9jYWwgU3RvcmFnZSB3b3JkIGFycmF5XG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAod29yZENhY2hlLndvcmQgPT0gbG9jYWxzdG9yYWdld29yZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRDYWNoZS53b3JkVVJMKTtcbiAgICAgICAgYWxsY2FjaGUuc3BsaWNlKGFsbGNhY2hlLmluZGV4T2Yod29yZENhY2hlKSwgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHdvcmQgY2FjaGU6ICR7bG9jYWxzdG9yYWdld29yZH1gLCBcbiAgICAgICAgICAnY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxjYWNoZS5sZW5ndGggPT0gMCl7IC8vVGhlIHJlbW92ZWQgd29yZCB3YXMgdGhlIGxhc3Qgd29yZCBpbiB0aGUgYXJyYXksIHNvIHJlbW92ZSB0aGUgY29udGFpbmVyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IHdvcmQtY2FjaGVzYCwgXG4gICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICBsZXQgd29yZGNhY2hlc3N0cmZ5dGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZiAoIXdvcmRjYWNoZXNzdHJmeXRlc3QucGFzc2VkKXtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vUmV0dXJuIHJlbWFpbmluZyB3b3JkcyB0byBMb2NhbCBTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiLCB3b3JkY2FjaGVzc3RyZnl0ZXN0LnJldHVybnN0cik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmV0Y2ggcmVxdWVzdCBmcm9tIENhY2hlIFN0b3JhZ2UuIFV0aWxpemVzIFxuICAgKiBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0IGZvciBjYWNoZSBuYW1lLlxuICAgKiBAcGFyYW0gcmVtb3ZlVVJMIFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkw6IFVSTCkge1xuICAgIHdpbmRvdy5jYWNoZXNcbiAgICAub3BlbihEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KVxuICAgIC50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgY2FjaGVzLm1hdGNoKHJlbW92ZVVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBtYXRjaGluZyB0aGUgcmVzdWx0LiBSZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgICBjYWNoZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5kZWxldGUocmVtb3ZlVVJMKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBkeW5hbWljYWxseSByZWNhbGxzIGEgd29yZCBkZWZpbml0aW9uIHJlcXVlc3QgYW5kIGluc3RhbnRpYXRlcyBhcGlHRVQoKS4gVGhlIFxuICAgKiByZXR1cm5lZCBwcm9taXNlIGFsc28gZHltYW5pY2FsbHkgYW5zd2VycyB0aGUgd2lkZ2V0IG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCBzZWFyY2hlZCBmcm9tIHdpZGdldCBpbnB1dC5cbiAgICogQHBhcmFtIHdvcmRVcmwgLSBUaGUgZmV0Y2ggcmVxdWVzdCBVUkwuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gc2VuZFRvQ2FjaGUgLSA/IFNlbmQgZmV0Y2ggcmVxdWVzdCB0byBDYWNoZSBTdG9yYWdlIDogRmV0Y2ggd2l0aG91dCBzdG9yaW5nIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gY2FjaGVOYW1lIC0gSWYgc2VuZGluZyBmZXRjaCByZXF1ZXN0cyB0byBjYWNoZSwgcHJvdmlkZSBhIG5hbWUgdG8gc3RvcmUgaXQgdW5kZXIuXG4gICAqIEByZXR1cm5zIC0gd29yZERhdGE6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybSh3b3JkOiBzdHJpbmcsIHdvcmRVcmw6IFVSTCwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgc2VuZFRvQ2FjaGU6IGJvb2xlYW4sIGNhY2hlTmFtZTogc3RyaW5nIHwgbnVsbCkge1xuICAgIC8vQSBmdW5jdGlvbiBjYWxsIHBhcmFtZXRlciBvcHRpb24gaXMgdG8gc3RvcmUgdGhlIHdvcmQgcmVxdWVzdCBpbiBicm93c2VyJ3MgQ2FjaGUgU3RvcmFnZVxuICAgIC8vU3RydWN0dXJlIHRoZSB3b3JkIGRhdGEgdmlhICdsb2NhbHN0b3JhZ2V3b3JkdmFsdWUnIGludGVyZmFjZSB1c2VkIHRocm91Z2hvdXQgZmV0Y2hpbmdcbiAgICBsZXQgd29yZGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkID0ge1xuICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICB3b3JkOiB3b3JkLFxuICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgIH07XG5cbiAgICAvL0FzeW5jaHJvbm91cyBmZXRjaCByZXFldXN0IGFuZCBkeW5hbWljIG1hcmt1cCBjcmVhdGlvbiBmcm9tIHRoZSBkYXRhJ3MgcmV0dXJuXG4gICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vQ2FsbCBhcGlHRVQoKSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgIGNvbnN0IHdvcmRGZXRjaCA9IG5ldyBhcGlHRVQoXG4gICAgICAgIHdvcmRjYWNoZS53b3JkVVJMLFxuICAgICAgICB3b3JkY2FjaGUuaW5DYWNoZSxcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLFxuICAgICAgICB3b3JkY2FjaGUuY2FjaGVOYW1lXG4gICAgICApO1xuICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW47XG5cbiAgICAgIC8vRmV0Y2ggcmVxdWVzdCBtZXRob2QgY2FsbC4gUmV0dXJuZWQgZGF0YSBtYXkgYmUgdGhlIHdvcmQgZGVmaW5pdGlvblxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3b3JkRmV0Y2guYXBpR0VUKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGEgc3RyaW5nLCBpdCBpcyB0aGUgd29yZCBkZWZpbml0aW9uIGRhdGEuXG4gICAgICAgIG5vRGVmaW5pdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihkYXRhKSk7XG4gICAgICAgIGlmKCFwYXJzZXRlc3QucGFzc2VkKXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHBhcnNldGVzdC5yZXR1cm5vYmo7XG4gICAgICB9XG4gICAgICBsZXQgd29yZERhdGE6IGFueSA9IGRhdGE7XG4gICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGFuIG9iamVjdCwgY29uZmlybSBpdCBpcyAnbm8gZGVmaW5pdGlvbicgc2VydmVyIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGlmIChPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICAgICAgLy9ObyBkZWZpbml0aW9ucyB3ZXJlIGZvdW5kIHdoZW4gZGF0YSBpcyBhbiBvYmplY3Qgd2l0aCBhIHRpdGxlIHByb3BlcnR5XG4gICAgICAgICAgLy93b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCJcbiAgICAgICAgICBub0RlZmluaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICBpZih3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIgJiYgd29yZGNhY2hlLmluQ2FjaGUgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAvL1RoZSBkYXRhIHN0cmVhbSBoZXJlIGlzIHdpdGhvdXQgd29yZCBkYXRhLiBUaGlzIGZ1bmN0aW9uIGF3YWl0cyB0aGUgYXBpIGZldGNoJ3MgZGF0YVxuICAgICAgICAgICAgLy90byBjb21wbGV0ZSBzdG9yYWdlL3Byb21pc2UgcmV0dXJucy4gSXQgd2FpdHMgNSBzZWNvbmRzIGZvciB0aGUgYnJvd3NlciB0byBjb21wbGV0ZSBpdHMgc3RvcmUgZnVuY3Rpb25zXG4gICAgICAgICAgICAvL3RoZW4gcmVtb3ZlcyB0aGUgdW53YW50ZWQgY2FjaGUgcmVxdWVzdC5cbiAgICAgICAgICAgIC8vVE9ETzpCVUdSRVNFQVJDSD0+RHVyaW5nIHRoZSA1IHRpbWVvdXQsIGlmIHRoZSBwYWdlIHJlZnJlc2hlcyBhICdiYWQgd29yZCcgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGNhY2hlXG4gICAgICAgICAgICAvL1RoaXMgJ2JhZCB3b3JkJyBjYW4gYmUgcmVtb3ZlZCBieSBkZWxldGluZyBhbGwgcHJldmlvdXMgd29yZHMgdmlhIFVJIGFuZCByZWZyZXNoaW5nIHRoZSBwYWdlLiBUaGlzIHdpbGxcbiAgICAgICAgICAgIC8vIGZpcmUgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHRvIGNsZWFyIGFueSBtaXNtYXRjaGVkIHdvcmRkYXRhPC0tPmNhY2hlZHJlcXVlc3RzLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIC8vRnVuY3Rpb24gYXdhaXRpbmcgcmVxdWVzdCdzIENhY2hlIFN0b3JhZ2UgY2FjaGluZ1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3QgcmVtb3ZlIGZyb20gQ2FjaGUgU3RvcmFnZS4gTmFtZTogXCIsIHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwMClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBub0RlZmluaXRpb25zKSB7Ly9Hb29kIGRhdGEtLT4gcmV0dXJuIGRhdGEgZm9yIG1hcmt1cCByZW5kZXJcbiAgICAgICAgLy8nQmFkIGRhdGEnIGR1ZSB0byBcIk5vIGRlZmluaXRpb25zIGZvdW5kXCIsIGludmFsaWQgd29yZCwgYmFkIG5ldHdvcmsgY29ubmVjdGlvblxuICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHsvL09ubGluZSwgcHJvYmxlbSB3aXRoIGZldGNoXG4gICAgICAgICAgLy9PZmZsaW5lIHJlcXVlc3RcbiAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ICs9IFwiLCBjaGVjayBuZXR3b3JrIGNvbm5lY3Rpb24uXCI7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub0RlZmluaXRpb25zKSB7Ly9TZXJ2ZXIgcmV0dXJuZWQgbm8gZGVmaW5pdGlvbnMgZGF0YVxuICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIpXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSBcbiAgICAgICAgICBlbHNlIHsvL0ludmFsaWQgd29yZCBkYXRhXG4gICAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGREaWN0aW9uYXJ5VGVybXRvTG9jYWxTdG9yYWdlKHdvcmRjYWNoZSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIGxldCB3b3JkRGF0YSA9IHdvcmRGZXRjaFJlcXVlc3QoKTtcbiAgICByZXR1cm4gd29yZERhdGE7XG4gIH1cblxuICAvKipcbiAgICogVXNlciBpbnB1dCB2YWxpZGF0aW9uIGZ1bmN0aW9uIHRlc3RzIHRoZSBpbnB1dCBzdHJpbmcgYWdhaW5zdCBhIHZhbGlkIFJlZ3VsYXIgRXhwcmVzc2lvbi5cbiAgICpcbiAgICogICAgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKVxuICAgKlxuICAgKiBAcGFyYW0gaW50eHQgLSBTdHJpbmcgdmFsdWUgcmVjZWl2ZWQgZnJvbSB1c2VyIGZpZWxkIGlucHV0LlxuICAgKiBAcmV0dXJucyBBY2NlcHRhYmxlIHVzZXIgaW5wdXQ6IHRydWUgb3IgZmFsc2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRWYWxpZGF0aW9uKGludHh0OiBzdHJpbmcpIHtcbiAgICBsZXQgdHJpbW1lZCA9IGludHh0LnRyaW0oKTtcbiAgICBsZXQgbGV0dGVyc1JFID0gbmV3IFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIik7XG4gICAgaWYgKGxldHRlcnNSRS50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy93b3JkIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHdvcmQuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtIGF3YWl0cyBhIHByb21pc2UsIGZldGNoaW5nIGEgZGljdGlvbmFyeSB0ZXJtLiBUaGUgZGF0YSBcbiAgICogaW5ncmVzcyBjYWxscyBtYXJrdXAgY3JlYXRpb24gZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHRvIGJlIGZldGNoZWQuXG4gICAqIEBwYXJhbSB3b3JkVVJMIC0gQSBVUkwgY29tcG9zaW5nIHRoZSBmdWxsIHVybCBvZiB0aGUgZmV0Y2ggcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgd29yZDogc3RyaW5nLCB3b3JkVVJMOiBVUkwpIHtcbiAgICAvLyBXaGVuIHRoZSB3b3JkIGRhdGEgcmVzb2x2ZXMsIGNhbGwgbWFya3VwIGZ1bmN0aW9uc1xuICAgIGxldCB3b3JkRGF0YVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZShcbiAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKHdvcmQsIHdvcmRVUkwsIHNlYXJjaEVsZW1zLCB0cnVlLCBEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB3b3JkRGF0YVByb21pc2UudGhlbigoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLndvcmREYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIHNlYXJjaEVsZW1zKTtcbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBPYmplY3QuaGFzT3duKGRhdGEsICd0aXRsZScpKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZXRyaWV2ZWQgd29yZDogJHt3b3JkfWAsIFxuICAgICAgICAnY29sb3I6Z29sZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkOycpO1xuICAgICAgICAvLyBSZW1vdmUgdW5uZWVkZWQgY2xhc3NlcyBpZiBhcHBsaWVkIHByZXZpb3VzbHlcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB3b3JkU2VhcmNoKCkgYmVnaW5zIGEgd29yZCBzZWFyY2ggcmVxdWVzdC4gVGhlIHVzZXIgaW5wdXQgbGlzdGVuZXIgY2hvb3Nlc1xuICAgKiB3aGV0aGVyIHRoZSBmZXRjaCBpcyBjYWxsZWQgZnJvbSBjYWNoZSBvciBpcyBuZXcuXG4gICAqXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gaXNGcm9tUHJldmlvdXNXb3JkcyAtIFRydWUgaWYgdGhlIHVzZXIgcmVxdWVzdGVkIGEgc2VhcmNoIGZyb20gYSBwcmV2aW91cyB3b3JkLCB0byBjYWxsIGRhdGEgZnJvbSBCcm93c2VyIENhY2hlLlxuICAgKiBAcGFyYW0gY2FjaGVkV29yZCAtIElmIHRoZSB1c2VyIGNhbGxlZCBmb3IgYSBwcmV2aW91cyB3b3JkLCBjYWNoZWRXb3JkIGlzIHdpdGhpbiB0aGUgTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFNlYXJjaChzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBpc0Zyb21QcmV2aW91c1dvcmRzOiBib29sZWFuLCBjYWNoZWRXb3JkOiBsb2NhbHN0b3JhZ2V3b3JkIHwgbnVsbCkge1xuICAgIGlmIChpc0Zyb21QcmV2aW91c1dvcmRzKSB7XG4gICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBjYWNoZWRXb3JkLndvcmQsIGNhY2hlZFdvcmQud29yZFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRha2UgdXNlciBpbnB1dCBhbmQgZmlsdGVyIHRvIGFuIGFjY2VwdGVkIHN0cmluZ1xuICAgICAgbGV0IGFjY2VwdGVkSW5wdXRXb3JkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICB0aGlzLndvcmRWYWxpZGF0aW9uKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUpXG4gICAgICAgID8gKGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSlcbiAgICAgICAgOiAoYWNjZXB0ZWRJbnB1dFdvcmQgPSBmYWxzZSk7XG4gICAgICBpZiAoYWNjZXB0ZWRJbnB1dFdvcmQpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgVVJMIG9mIHRoZSBhY2NlcHRlZCB3b3JkIGZvciB1c2UgaW4gdGhlIGZldGNoIGNhbGxcbiAgICAgICAgdGhpcy53b3JkVVJMID0gbmV3IFVSTChzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLnRvU3RyaW5nKCksIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybCk7XG4gICAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMsIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsIHRoaXMud29yZFVSTCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9IFwiXCI7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuXG4vKipcbiAqIEEgRGljdGlvbmFyeVNlYXJjaFdpZGdldCBpcyBtYWRlIHRvIGNyZWF0ZSB0aGUgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gKiAgRGljdGlvbmFyeSBTZWFyY2guIEVsZW1lbnRzIGFyZSBjcmVhdGVkIGFuZCBhcHBlbmRlZCB0byB0aGUgcGFnZSB0byB0aGUgY2xhc3NcbiAqICAnZGljdGlvbmFyeVdpZGdldCdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCB7XG4gIHB1YmxpYyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpe1xuICAgIC8vaW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIGlmIChlbGVtID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coYCVjVGhlcmUgaXMgbm8gXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmAsIFwiY29sb3I6IG9yYW5nZTtcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJkaWN0aW9uYXJ5V2lkZ2V0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQWRkIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW0pO1xuICB9XG4gIC8qKlxuICAgKiBQcmltYXJ5IHdpZGdldCBtYXJrdXAgc3RydWN0dXJpbmcgdGhlIHdpZGdldCBlbGVtZW50cyBhbmQgc2VhcmNoIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCBiZWZvcmUgdGhlIHdpZGdldC5cbiAgICogQHJldHVybnMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyAtLT4gaW50ZXJmYWNlIG9mXG4gICAqICBpbXBvcnRhbnQgSFRNTCBlbGVtZW50cyB1c2VkIHRocm91Z2ggd2lkZ2V0IGZ1bmN0aW9uLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbTogRWxlbWVudCkge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICBpZiAoZGljdGlvbmFyeSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBkZXRlcm1pbmVkIGRpY3Rpb25hcnkgZWxlbWVudCBpcyBudWxsLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIHdpZGdldCBlbGVtZW50c1xuICAgIGNvbnN0IGFydEggPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpKTtcbiAgICBjb25zdCBwcmV2aW91c1dvcmRzID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuXG4gICAgLy8gUmV0dXJuIGVsZW1lbnRzIHVzZWQgaW4gbGF0ZXIgZnVuY3Rpb25zXG4gICAgbGV0IHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgPSB7XG4gICAgICBzZWFyY2hXb3JkOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpLFxuICAgICAgd29yZFNlYXJjaDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICBkaWN0aW9uYXJ5RWxlbTogPEhUTUxFbGVtZW50PmRpY3Rpb25hcnksXG4gICAgICBlcnJvckVsZW06IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKSxcbiAgICAgIHByZXZpb3VzV29yZEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRzQ29udGFpbmVyOiBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLFxuICAgICAgcmVmcmVzaEJ0bjogcHJldmlvdXNXb3Jkcy5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgfTtcbiAgICBcbiAgICAvLyBBZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgY29uc3QgZm9udEF3ZXNvbWVTZWFyY2hJY29uID0gc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc2VhcmNoXCIpO1xuICAgIHByZXZpb3VzV29yZHMuY2xhc3NMaXN0LmFkZChcInByZXZpb3VzV29yZHNcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiU2VhcmNoLi4uXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJTZWFyY2hcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5pZCA9IFwic2VhcmNoLXdvcmRcIjtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmlkID0gXCJ3b3JkLXNlYXJjaFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5pbm5lclRleHQgPSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmlubmVyVGV4dCA9IFwiUmVmcmVzaFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZHNDb250YWluZXIuaWQgPSBcImRpY3Rpb25hcnktYnRuc1wiO1xuICAgIGRpY3Rpb25hcnkuaWQgPSBcImRpY3Rpb25hcnlcIjtcbiAgICBzZWFyY2hGb3JtLmlkID0gXCJkaWN0aW9uYXJ5LXNlYXJjaFwiO1xuICAgIHNlYXJjaEZvcm0uYWN0aW9uID0gXCJpbmRleC5odG1sXCI7XG4gICAgYXJ0SC50ZXh0Q29udGVudCA9IFwiRGljdGlvbmFyeSBUZXJtOlwiO1xuXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cyA9IHNlYXJjaEVsZW1lbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1hcmt1cCB0byBob3VzZSByZXR1cm5lZCB3b3JkcyBmcm9tIERpY3Rpb25hcnlTZWFyY2guIFRoZSBtYXJrdXBcbiAgICogIGlzIGNyZWF0ZWQgYmFzZWQgb24gQVBJIGVncmVzcy4gV29yZHMgYW5kIHRoZWlyIGRlZmluaXRpb25zIHZhcnkuIFRoZSBtYXJrdXAgaXNcbiAgICogIGFkYXB0aXZlIHRvIHJldHVybmVkIHdvcmQgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZERhdGEgLSBUaGlzIHBhcmFtZXRlciBpcyBhbiBvYmplY3Qgb2Ygd29yZCB0eXBlcywgZGVmaW5pdGlvbnMsIGFuZCBleGFtcGxlcy5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKHdvcmREYXRhOiBhbnksIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMpIHtcbiAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCAhKHdvcmREYXRhIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBPYmplY3QuaGFzT3duKHdvcmREYXRhLCAndGl0bGUnKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiVjVGhlcmUgaXMgbm8gZGVmaW5pdGlvbiBmb3IgdGhpcyB3b3JkLlwiLCBcImNvbG9yOmRhcmtncmVlbjtcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWRkIHdvcmQgZGVmaW5pdGlvbiB0byB0aGUgZGljdGlvbmFyeSB3aWRnZXRcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPSBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbiA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7IC8vIHdvcmQgZGVmaW5pdGlvbiBzZXBhcmF0b3JcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImRlZmluaXRpb25EZXNjcmlwdGlvblwiKTtcblxuICAgIC8vIFRoZSB3b3JkIGRhdGEgcmVwcmVzZW50cyBjb21wbGV4IEpTT04gb2JqZWN0XG4gICAgLy8gUmVjdXJzZSB0aGUgd29yZCBkYXRhIG9iamVjdCwgYWRkaW5nIGVsZW1lbnRzIGZyb20gdGhlIHZhcmlvdXMgbGV2ZWxzXG4gICAgd29yZERhdGEubWFwKCh3b3JkOiBhbnkpID0+IHtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJ3b3JkXCIsIHdvcmQud29yZCk7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIHdvcmQgaXM6IFwiLHdvcmQpXG4gICAgICBjb25zdCB3b3JkVGl0bGUgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICB3b3JkVGl0bGUudGV4dENvbnRlbnQgPSB3b3JkLndvcmQ7XG4gICAgICAvL0FkZCB0aGUgd29yZCBhbmQgZXhhbXBsZXMgdG8gcGFnZVxuICAgICAgd29yZC5tZWFuaW5ncy5tYXAoKHdvcmRUeXBlOiBhbnkpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIldvcmRUeXBlIGFyZTogXCIsIHdvcmRUeXBlKVxuICAgICAgICBjb25zdCB3b3JkVHlwZUggPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpKTtcbiAgICAgICAgY29uc3Qgd29yZFR5cGVMaXN0ID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSk7XG4gICAgICAgIHdvcmRUeXBlSC50ZXh0Q29udGVudCA9IHdvcmRUeXBlLnBhcnRPZlNwZWVjaDtcbiAgICAgICAgd29yZFR5cGUuZGVmaW5pdGlvbnMubWFwKChkZWY6IGFueSkgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9uIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICBsZXQgd29yZFR5cGVEZWZJdGVtID0gd29yZFR5cGVMaXN0LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpKTtcbiAgICAgICAgICBsZXQgZGVmaW5pdGlvblAgPSB3b3JkVHlwZURlZkl0ZW0uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgZGVmaW5pdGlvblAudGV4dENvbnRlbnQgPSBkZWYuZGVmaW5pdGlvbjtcbiAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIik7XG5cbiAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLFxuICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBpZiAobmV3UCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgIG5ld1BpLnRleHRDb250ZW50ID0gZGVmLmV4YW1wbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwiZXhhbXBsZVwiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2hlY2sgaWYga2V5IFwiZXhhbXBsZVwiIGlzIGluIGRlZmluaXRpb24uIElmIGl0IGlzLCBhZGQgdGhlIGV4YW1wbGUgdG8gbGlzdFxuICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9jcmVhdGUgY2xlYXIgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIndvcmQtY2xlYXJcIik7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgaG92ZXJlZCwgZGlzcGxheSBpdFxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCkgPT4ge1xuICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgbm90IGhvdmVyZWQsIGhpZGUgaXRcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBjbGlja2VkLCBjbGVhciB0aGUgZWxlbWVudHNcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmVtb3ZlZCB3b3JkOiAke2RlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJ3b3JkXCIpfWAsIFxuICAgICAgICAnY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGRlbnJvZDsnKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGNsZWFyIGJ1dHRvbiB0byB3aWRnZXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVQcmV2aW91c1dvcmRTZWFyY2hlc0VsZW1lbnRzICh3b3Jkc3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdLCBidXR0b25Db250YWluZXI6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgbGV0IGJ1dHRvbnNhcnI6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID0gW107XG4gICAgXG4gICAgLy9CZWNhdXNlIHRoZSBsb2NhdG9yIGFuZCB0aGUgTG9jYWwgU3RvcmFnZSB2YWx1ZXMgYXJlIHZpYWJsZSwgY3JlYXRlIHRoZSBtYXJrdXBcbiAgICAvL25lZWRlZCB0byBkaXNwbGF5IHRob3NlIHdvcmRzLiBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aWRnZXQgZnVuY3Rpb25hbGl0eS5cbiAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2Ygd29yZHN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lciA9IGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICBjb25zdCBjYWNoZVdvcmRIZWFkaW5nRWxlbSA9IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICBjb25zdCBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSA9IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uLWNsZWFyXCIpO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZGljdGlvbmFyeS13b3JkLWJ0blwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gd29yZENhY2hlLndvcmQ7XG5cbiAgICAgIGxldCBwcmV2aW91c3dvcmRidG46IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyA9IHtcbiAgICAgICAgd29yZDogd29yZENhY2hlLFxuICAgICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbTogY2FjaGVXb3JkSGVhZGluZ0VsZW0sXG4gICAgICAgIHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcjogd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLFxuICAgICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbTogZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0sXG4gICAgICB9XG4gICAgICBidXR0b25zYXJyLnB1c2gocHJldmlvdXN3b3JkYnRuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbnNhcnI7XG4gIH1cbn1cbiIsIi8vQXV0aG9yOiBSb2JlcnQgQSBIb3dlbGwsIEFwcmlsIDIwMjNcbi8vT3JpZ2luYWwgQXV0aG9yKHMpOiBNb3ppbGxhIENvbnRyaWJ1dG9ycywgTUROXG4vL0xpY2Vuc2U6IGh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2VuLVVTL2Fib3V0L2dvdmVybmFuY2UvcG9saWNpZXMvcGFydGljaXBhdGlvbi9cbi8vTUROOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvY3JlYXRlRWxlbWVudFxuLy9Tb3VyY2UgZGlzdHJpYnV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vbWRuL3dlYi1jb21wb25lbnRzLWV4YW1wbGVzL3RyZWUvbWFpbi9leHBhbmRpbmctbGlzdC13ZWItY29tcG9uZW50XG5cbi8vIENyZWF0ZSBhIGNsYXNzIGZvciB0aGUgZWxlbWVudFxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ0xpc3RFbGVtZW50IGV4dGVuZHMgSFRNTFVMaXN0RWxlbWVudCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBBbHdheXMgY2FsbCBzdXBlciBmaXJzdCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEdldCB1bCBhbmQgbGkgZWxlbWVudHMgdGhhdCBhcmUgYSBjaGlsZCBvZiB0aGlzIGN1c3RvbSB1bCBlbGVtZW50XG4gICAgICAgIC8vIGxpIGVsZW1lbnRzIGNhbiBiZSBjb250YWluZXJzIGlmIHRoZXkgaGF2ZSB1bHMgd2l0aGluIHRoZW1cbiAgICAgICAgY29uc3QgdWxzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuICAgICAgICBjb25zdCBsaXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgLy8gSGlkZSBhbGwgY2hpbGQgdWxzXG4gICAgICAgIC8vIFRoZXNlIGxpc3RzIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgdXNlciBjbGlja3MgYSBoaWdoZXIgbGV2ZWwgY29udGFpbmVyXG4gICAgICAgIHVscy5mb3JFYWNoKHVsID0+IHtcbiAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvb2sgdGhyb3VnaCBlYWNoIGxpIGVsZW1lbnQgaW4gdGhlIHVsXG4gICAgICAgIGxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgbGkgaGFzIGEgdWwgYXMgYSBjaGlsZCwgZGVjb3JhdGUgaXQgYW5kIGFkZCBhIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW4gYXR0cmlidXRlIHdoaWNoIGNhbiBiZSB1c2VkICBieSB0aGUgc3R5bGVcbiAgICAgICAgICAgICAgICAvLyB0byBzaG93IGFuIG9wZW4gb3IgY2xvc2VkIGljb25cbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb3NlZCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgbGkgZWxlbWVudCdzIHRleHQgaW4gYSBuZXcgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGFzc2lnbiBzdHlsZSBhbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHNwYW5cbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFRleHQgPSBsaS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDb3B5IHRleHQgZnJvbSBsaSB0byBzcGFuLCBzZXQgY3Vyc29yIHN0eWxlXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IGNoaWxkVGV4dC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBjbGljayBoYW5kbGVyIHRvIHRoaXMgc3BhblxuICAgICAgICAgICAgICAgIG5ld1NwYW4ub25jbGljayA9IHRoaXMuc2hvd3VsO1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGV2ZW50LmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0dWwgPSBuZXdTcGFuLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuUGFyZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3BhbiBhbmQgcmVtb3ZlIHRoZSBiYXJlIHRleHQgbm9kZSBmcm9tIHRoZSBsaVxuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTcGFuLCBjaGlsZFRleHQpO1xuICAgICAgICAgICAgICAgIGNoaWxkVGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBFeHBhbmRpbmdMaXN0RWxlbWVudC5jb3VudCsrO1xuICAgIH1cblxuICAgIC8vIGxpIGNsaWNrIGhhbmRsZXJcbiAgICBzaG93dWwgPSBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgIGNvbnN0IG5leHR1bCA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLW9wZW4nKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLy8gVGhpcyBvYmplY3QgY3JlYXRlcyBhbiBhcnJheSBvZiBkaXZzIGZyb20gcG9ydCBudW1iZXIgaW5mb3JtYXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsYXNoY2FyZENhcmRFbGVtcyB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygd2lkZ2V0IG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyB3aWRnZXRjb3VudDogbnVtYmVyID0gMDtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIHdpdGhpbiB0aGUgd2lkZ2V0IGluc3RhbnRpYXRlZCBbZmxhc2hjYXJkc10gKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvdGFsZmxhc2hjYXJkczogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbV9mbGFzaGNhcmRzQXJyOiBIVE1MTElFbGVtZW50W10gPSBbXTtcbiAgICBwdWJsaWMgZmxhc2hjYXJkc2NvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbV9wb3J0SW5mb01hcDogTWFwPGFueSwgc3RyaW5nPjtcblxuICAgIGNvbnN0cnVjdG9yKHBvcnRudW1iZXJzTWFwOiBNYXA8YW55LCBzdHJpbmc+KSB7XG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcCA9IHBvcnRudW1iZXJzTWFwO1xuICAgICAgICBjb25zdCBtYXBJdGVyID0gdGhpcy5tX3BvcnRJbmZvTWFwLmtleXMoKTtcbiAgICAgICAgRmxhc2hjYXJkQ2FyZEVsZW1zLndpZGdldGNvdW50Kys7XG5cbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwLmZvckVhY2goIChwb3J0KSA9PiB7IFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxpc3QgZWxlbWVudFxuICAgICAgICAgICAgbGV0IGZsYXNoY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIC8vVE9ETzogbGV0IGZsYXNoY2FyZCA9IG5ldyBHcm93aW5nQ2FyZEVsZW1lbnQoKTtcbiAgICAgICAgICAgIC8vVW5hYmxlIHRvIGluc3RhbnRpYXRlIGxpIGVsZW1lbnQgYXMgZ3Jvd2luZyBjYXJkIGR1ZSB0byBET00gdW5hdmFsYWJsZSAtLT4gcmVxdWlyZXMgc2hhZG93RE9NIG1hbmlwdWxhdGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgZWxlbWVudCBmb3IgcGFnZSB1c2VcbiAgICAgICAgICAgIGNvbnN0IGlubmVyID0gZmxhc2hjYXJkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGZyb250ID0gaW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBmbGlwYmFjayA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkU3BhbiA9IGZsaXBmcm9udC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBsZXQgZ2FtZUNhcmRCYWNrU3BhbiA9IGZsaXBiYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgIGZsYXNoY2FyZC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIsIFwiZ2FtZUNhcmRcIilcbiAgICAgICAgICAgIGlubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgZmxpcGZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICBmbGlwYmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGdhbWVDYXJkU3Bhbi5pbm5lclRleHQgPSBgUG9ydCMgJHttYXBJdGVyLm5leHQoKS52YWx1ZX1gO1xuICAgICAgICAgICAgZ2FtZUNhcmRCYWNrU3Bhbi5pbm5lclRleHQgPSBgJHtwb3J0fWA7XG5cbiAgICAgICAgICAgIHRoaXMuZmxhc2hjYXJkc2NvdW50Kys7XG4gICAgICAgICAgICBGbGFzaGNhcmRDYXJkRWxlbXMudG90YWxmbGFzaGNhcmRzKys7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkaXYgdG8gZmxhc2hjYXJkIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLm1fZmxhc2hjYXJkc0Fyci5wdXNoKGZsYXNoY2FyZCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBHcm93aW5nQ2FyZEVsZW1lbnQgZXh0ZW5kcyBIVE1MTElFbGVtZW50IHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBpc0dyb3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ3Jvd0NhcmQpO1xuICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuY291bnQrKztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNocmlua0NhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4geyAvL1RPRE86IGNoZWNrIGNsYXNzIHByb3BlcnR5XG4gICAgICAgIGlmIChsaS5zdHlsZS5zY2FsZSkge1xuICAgICAgICAgICAgbGkuc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc2V0SXNHcm93bihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNoYWRlSW5hY3RpdmVDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKEdyb3dpbmdDYXJkRWxlbWVudC5nZXRJc0F0TGVhc3RPbmVCaWcoKSkge1xuICAgICAgICAgICAgaWYgKCFsaS5nZXRJc0dyb3duKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuNVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldElzQXRMZWFzdE9uZUJpZyA9ICgpID0+IHtcbiAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjd2ViSURFQ2FyZHMgbGlgKSk7XG4gICAgICAgIGxldCBhdExlYXN0T25lSXNCaWcgPSBsaXN0TElzLnNvbWUoKGxpKSA9PiBsaS5nZXRJc0dyb3duKCkgPT0gdHJ1ZSk7XG4gICAgICAgIHJldHVybiBhdExlYXN0T25lSXNCaWc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElzR3Jvd24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc0dyb3duID0gKHRydWVmYWxzZTogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duID0gdHJ1ZWZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ3Jvd0NhcmQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3R5bGUuc2NhbGUgPSBcIjEuMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLnpJbmRleCA9IFwiMlwiO1xuICAgICAgICB0aGlzLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgdGhpcy5zZXRJc0dyb3duKHRydWUpO1xuXG4gICAgICAgIC8vIEdldCBhbGwgdGhlIGxpc3QgZWxlbWVudHMgdG8gcmVmZXJlbmNlIHdoaWNoIG9uZSB0byBncm93XG4gICAgICAgIC8vIElmIGl0J3Mgbm90IHRoZSBjbGlja2VkIGVsZW1lbnQsIHNocmluayBpdC5cbiAgICAgICAgbGV0IGxpc3RMSXMgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pik7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCgoaXRlbSBhcyBHcm93aW5nQ2FyZEVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hhZGVJbmFjdGl2ZUNhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjYWxlIHByb3BlcnR5IGZvciBlYWNoIGNhcmRcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdHlsZS5zY2FsZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuc2NhbGUgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQkVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgUldCRXJyb3IuY291bnQrKztcbiAgICB9O1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tFbGVtZW50b3JOdWxsKGNvbXBvbmVudG5hbWU6c3RyaW5nLCBjbGFzc25hbWU6IHN0cmluZywgbG9nbWVzc2FnZT86Ym9vbGVhbiwgc3VwcmVzc2V4Y2VwdGlvbj86Ym9vbGVhbiApIHtcbiAgICAgICAgbGV0IGVsZW06IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlOyAvL0xvZyBtZXNzYWdlIG9wdGlvbiBkZWZhdWx0XG4gICAgICAgIGlmICghbG9nbWVzc2FnZSkgbG9nbXNzZyA9IGxvZ21lc3NhZ2U7XG4gICAgICAgIGxldCBzdXByZXNzZXhjcHQ6IGJvb2xlYW4gPSBmYWxzZTsvL1N1cHJlc3MgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgICAgICBpZiAoc3VwcmVzc2V4Y2VwdGlvbikgc3VwcmVzc2V4Y3B0ID0gdHJ1ZTtcbiAgICAgICAgbGV0IHF1ZXJ5OiBzdHJpbmcgPSBgLiR7Y2xhc3NuYW1lfWA7XG5cbiAgICAgICAgLy8gQWRkIGRpY3Rpb25hcnkgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUldCUmVmZXJlbmNlRXJyb3IoXCJHZXRFbGVtZW50XCIsIGBDb3VsZCBub3QgZ2V0IGVsZW1lbnQ6ICcke3F1ZXJ5fSdgKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW0gPT0gbnVsbCl7XG4gICAgICAgICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNObyBlbGVtZW50IGZvdW5kIHdpdGggY2xhc3MgbmFtZTogJHtxdWVyeX0uYCwgJ2NvbG9yOiB5ZWxsb3c7Jyk7XG4gICAgICAgICAgICBpZiAoIXN1cHJlc3NleGNwdClcbiAgICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfU51bGxSZWZlcmVuY2VgLCBgRWxlbWVudCBub3QgZm91bmRgKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwgKGNvbXBvbmVudG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGNoZWNrZW1wdHlzdHJpbmc/OmJvb2xlYW4sIGxvZ21lc3NhZ2U/OmJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBpZiAoIWxvZ21lc3NhZ2UpIGxvZ21zc2cgPSBsb2dtZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50bmFtZX0uYCwgJ2NvbG9yOnB1cnBsZTsnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja2VtcHR5c3RyaW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiBSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KGNvbXBvbmVudG5hbWUsIGtleSwgbG9nbXNzZyk7XG4gICAgICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnRuYW1lOnN0cmluZywga2V5OnN0cmluZywgbG9nbWVzc2FnZT86Ym9vbGVhbil7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHRlc3Q6IHN0cmluZyB8IG51bGxcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yIChgQ291bGQgZ2V0IGxvY2FsIHN0b3JhZ2Uga2V5OiAke2tleX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdCA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2Uga2V5IG5vdCBmb3VuZDogJHtrZXl9LmAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfVJlZmVyZW5jZUV4Y2VwdGlvbmAsIGBLZXkgbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QgPT0gXCJcIiB8fCB0ZXN0ID09XCJbXVwiKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudG5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYFZhbHVlIGlzIGVtcHR5YCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSByZWZlcmVuY2UgZXJyb3IgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBSV0JSZWZlcmVuY2VFcnJvciBleHRlbmRzIFJlZmVyZW5jZUVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWZlcnJvcjogUmVmZXJlbmNlRXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBSZWZlcmVuY2VFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnJlZmVycm9yID0gZXJyO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgcmVmZXJlbmNlIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLCBcbiAgICAgICAgICAgICdjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6cmVkOycsIGVyciwgJ2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICBSV0JSZWZlcmVuY2VFcnJvci5jb3VudCsrO1xuICAgIH07XG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgc3ludGF4IGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUldCU3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVmZXJyb3I6IFN5bnRheEVycm9yO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIC8vIGxldCBlcnIgPSBuZXcgUmFuZ2VFcnJvcigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJWM8UldCPiVjSFNMIGNvbG9yIHZhbHVlIG91dCBvZiBhY2NlcHRhYmxlIHJhbmdlOlxcbiVvXFxuJWM8L1JXQj5gLCBcbiAgICAgICAgLy8gJ2NvbG9yOmdyYXk7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z3JheTsnLCBlcnIsICdjb2xvcjpncmF5O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgU3ludGF4RXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IGVycjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIHN5bnRheCBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnJlZDsnLCBlcnIsICdjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgUldCU3ludGF4RXJyb3IuY291bnQrKztcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUldCRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkb21leGNlcHRpb246IERPTUV4Y2VwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB0aGlzLmRvbWV4Y2VwdGlvbiA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICAgICAgUldCRG9tRXhjZXB0aW9uLmNvdW50Kys7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZG9tZXhjZXB0aW9uKTtcbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBSV0JTeW50YXhFcnJvciB9IGZyb20gJy4vUldCRXJyb3JCdXMnXG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gcGFyc2VzIGpzb24gYW5kIHN0b3JlcyB0aGUgcGFyc2VkIHN0cmluZyB3aXRoIHRoZSByZXN1bHQuICovXG5leHBvcnQgY2xhc3MgUldCUGFyc2VKU09OIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwYXJzZXN0cjogc3RyaW5nO1xuICAgIHB1YmxpYyByZXR1cm5vYmo6IG9iamVjdDtcbiAgICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICAgIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICAgKiBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJzZXN0cjpzdHJpbmcpe1xuICAgICAgICBSV0JQYXJzZUpTT04uY291bnQrKztcbiAgICAgICAgdGhpcy5wYXJzZXN0ciA9IHBhcnNlc3RyO1xuICAgICAgICB0aGlzLnBhc3NlZCA9IHRoaXMuUldCcGFyc2VKU09OKCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgUldCcGFyc2VKU09OICgpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5vYmogPSBKU09OLnBhcnNlKHRoaXMucGFyc2VzdHIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLnJldHVybm9iaiA9IG51bGw7XG4gICAgICAgICAgICBuZXcgUldCU3ludGF4RXJyb3IoXCJQYXJzZUVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKiogQW4gUldCUGFyc2VKU09OIHRlc3RzIHdoZXRoZXIgYW4gb2JqZWN0IGNhbiBiZSBzdHJpbmdpZmllZCBpbnRvIGEgdmFsaWRcbiAqIGpzb24gc3RyaW5nLiAqL1xuZXhwb3J0IGNsYXNzIFJXQlN0cmluZ2lmeUpTT04ge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGpzb246IGFueTtcbiAgICBwdWJsaWMgcmV0dXJuc3RyOiBzdHJpbmc7XG4gICAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgICAvKipDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcGFyc2UgcmVzdWx0cyBhbmQgcGFyc2VkXG4gICAgICogSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoanNvbjphbnkpe1xuICAgICAgICBSV0JTdHJpbmdpZnlKU09OLmNvdW50Kys7XG4gICAgICAgIHRoaXMuanNvbiA9IGpzb247XG4gICAgICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBwYXJzZUpTT04gKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnJldHVybnN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuc3RyID0gbnVsbDtcbiAgICAgICAgICAgIG5ldyBSV0JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBIVE1MIGxpbmsgZWxlbWVudCBkYXRhLiBVc2VkIHdpdGggYW5jaG9yIHRhZ3MuXG4gKi9cbmNsYXNzIFJXQkxpbmsge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICAvKipIVE1MIHRpdGxlIGF0dHJpYnV0ZSAqL1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIC8qKklubmVyIHRleHQgc3RyaW5nICovXG4gICAgcHVibGljIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIC8qKlRoZSBwYWdlIHRoZSBsaW5rIGlzIGFzc29jaWF0ZWQgdG8gKi9cbiAgICBwdWJsaWMgcGFnZU5hbWU6IHN0cmluZztcbiAgICAvKipIVE1MIGhyZWYgYXR0cmlidXRlICovXG4gICAgcHVibGljIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIGlubmVyVGV4dDogc3RyaW5nLCBwYWdlTmFtZTogc3RyaW5nLCBoUmVmZXJlbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGlubmVyVGV4dCxcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lLFxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlLFxuICAgICAgICBSV0JMaW5rLmNvdW50Kys7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSV0JMaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL1dlYkJpdFwiO1xuaW1wb3J0IFJXQkNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvUldCQ2FyZFwiO1xuXG5leHBvcnQgY2xhc3MgUmFuZG9tV2ViQml0cyB7XG4gICAgcHVibGljIHN0YXRpYyBidWlsZENhcmRDb250YWluaW5nU2VjdGlvbihzZWN0aW9uVGl0bGU6IHN0cmluZywgc2VjdGlvbkhlYWRpbmdJRDogc3RyaW5nKSB7XG4gICAgICAgIC8vIENyZWF0ZSBkaXZpc29yIHNlY3Rpb25hbCBlbGVtZW50cyB0byBhcHBlbmQgdG8gbWFpblxuICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FyZCBzZWN0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyA8c2VjdGlvbiBjbGFzcz1cImNhcmRzXCI+XG4gICAgICAgICAgICAvLyAgICAgPGgyPkFyYml0cmFyeSBBcnRpY2xlczo8L2gyPlxuICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkX2NvbHVtbnNcIj5cblxuICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgLy8gPC9zZWN0aW9uPlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGNvbnN0IEFBU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgbGV0IGFhSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICBsZXQgYWFDYXJkc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhQ2FyZHNTZWN0aW9uKTtcbiAgICAgICAgICAgIHBhZ2VNYWluLmFwcGVuZChBQVNlY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XG4gICAgICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXJkX2NvbHVtbnMnKTtcbiAgICAgICAgICAgIGFhSGVhZGluZy5pbm5lclRleHQgPSBgJHtzZWN0aW9uVGl0bGV9YDtcbiAgICAgICAgICAgIGFhSGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzZWN0aW9uSGVhZGluZ0lEKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRSV0JDYXJkcyhjYXJkc0RhdGE6IFdlYkJpdFtdKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgZWFjaCBjYXJkIGluIHRoZSBhcnJheS4gQnVpbGQgdGhlIGNhcmQgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogV2ViQml0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByd2JjYXJkID0gbmV3IFJXQkNhcmQoKTtcbiAgICAgICAgICAgIHJldHVybiByd2JjYXJkLmJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlKTs7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBBQXM7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbnRlcmZhY2UgU2NyaXB0UnVudGltZSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0YXJ0TWFyazogUGVyZm9ybWFuY2VNYXJrLFxuICAgIGVuZE1hcms6IFBlcmZvcm1hbmNlTWFyayxcbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcGVyZm9ybWFuY2Ugc3RhcnQgYW5kIGVuZCBtYXJrcy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQlBlcmYge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHNjcmlwdHJ1bnRpbWVtYXJrczogU2NyaXB0UnVudGltZSA9IHtcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgc3RhcnRNYXJrOiBudWxsLFxuICAgICAgICBlbmRNYXJrOiBudWxsXG4gICAgfTtcblxuICAgIC8qKiBJbnN0YW50aWF0aW5nIGEgU2NyaXB0UGVyZiByZWNvcmRzIHRoZSBwZXJmb3JtYW5jZSBzdGFydCBtYXJrLiAqL1xuICAgIGNvbnN0cnVjdG9yKCBzY3JpcHRuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lID0gc2NyaXB0bmFtZTtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1zdGFydGApO1xuICAgICAgICBSV0JQZXJmLmNvdW50Kys7XG4gICAgfVxuXG4gICAgLyoqIENhbGwgZW5kKCkgdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC4gKi9cbiAgICBwdWJsaWMgZW5kKCl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLmVuZE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LWVuZGApO1xuICAgICAgICB0aGlzLm1lYXN1cmUoKTtcbiAgICB9XG5cbiAgICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICAgIHByaXZhdGUgbWVhc3VyZSgpe1xuICAgICAgICBsZXQgbWVhc3VyZSA9IHBlcmZvcm1hbmNlLm1lYXN1cmUoIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUsIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLnN0YXJ0TWFyay5uYW1lLCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5lbmRNYXJrLm5hbWUpXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiwgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL1JXQkpTT05Db252ZXJ0ZXJcIjtcbmltcG9ydCBSV0JFcnJvciBmcm9tIFwiLi9SV0JFcnJvckJ1c1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKiBcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqIFxuICogVGhlbiwgdGhlIHdpZGdldCBpcyBjcmVhdGVkIGFuZCBUby1Eb3MgYXJlIHJldHJpZXZlZCBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XG4gICAgLyoqVG90YWwgbnVtYmVyIG9mIFRvRE9zKi9cbiAgICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAgIC8qKldpZGdldCBlbGVtZW50cyB1c2VkIHRvIHBvcHVsYXRlIHRvZG9zICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9JblN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdO1xuICAgIC8qKlRvZG8gSFRNTCBlbGVtZW50cyAqL1xuICAgIHByaXZhdGUgbGlzdEVsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgVG8tRG8gbGlzdCB3aWRnZXQncyBlbGVtZW50cy5cbiAgICAgKiBcbiAgICAgKiAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50c1xuICAgICAqIEBwYXJhbSBUb0RvRWxlbWVudHMgV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXRUb0RvTGlzdEVsZW1lbnRzKFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cykge1xuICAgICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmFuZG9tIFdlYiBCaXRzIHVzZXMgbXVsdGlwbGUgbG9jYXRpb25zIHRvIGFwcGx5IHRoZSBUby1EbyBMaXN0IHdpZGdldC4gQ3JlYXRlXG4gICAgICogIHRoZSBsaXN0IG1hcmt1cCwgcGFzc2luZyBpbiBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciBwbGFjZW1lbnQgb2YgdGhlIHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIHdpZGdldCBpcyBwbGFjZWQgYWZ0ZXIgdGhpcyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgICAgICAvL0luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAgICAgLy9EZXBlbmRlbnQgb24gdGhlIHBhZ2UsIHRvZG8gd2lkZ2V0IG1heSBoYXZlIHByZS1leGlzdGluZyBtYXJrdXAgaW4gcGxhY2VcbiAgICAgICAgLy9Td2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgICAgIGlmIChlbGVtID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOm9yYW5nZTtcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgY2FzZSAnL2Rpc3QvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgLy9NYXJrdXAgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0YWJsZSBlbGVtZW50cyBuZWVkZWQgZm9yIHRoZSB0b2RvIGxpc3RcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVhZCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aG1pZGRsZSA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHIzID0gdGZvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzbGVmdCA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzbWlkZGxlID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IElOUFVUID0gdGQzbWlkZGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiaXRlbUlOUFVUXCIpO1xuICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvLURvOlwiO1xuICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICAgICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgICAgICAgICAgdGhtaWRkbGUudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICB0ZDNJTi50eXBlID0gXCJidXR0b25cIjtcblxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAgICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIGR1ZSB0byBjYWNoZSBlbXB0eVxuICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGVCb2R5O1xuICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKGh0Ym9keSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVsZW1lbnQgaXMgbm90IHZhbGlkLiBQbGVhc2UgZW5zdXJlIGEgdmFsaWQgZWxlbWVudCBmb3IgVG9EbyBsaXN0IHdpZGdldCB0byBmb2xsb3cuXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0LlxuICAgICAqIEByZXR1cm5zIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VG9Eb0xpc3RFbGVtZW50cygpIHtcbiAgICAgICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgICAgIC8vRWFjaCB3aWRnZXQgbG9jYXRpb24ncyBlbGVtZW50cyBtYXkgdmFyeSwgc28gYSBjYWxsIG9mIGdldFRvRG9MaXN0RWxlbWVudHMoKVxuICAgICAgICAvL2xvY2F0ZXMgdGhlIHBhZ2UncyBlbGVtZW50cyB0byBwb3B1bGF0ZSB0aGUgVG9Eb0VsZW1lbnRzIGludGVyZmFjZS5cbiAgICAgICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGFibGUnKSxcbiAgICAgICAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb0RvSXRlbXMnKSxcbiAgICAgICAgICAgIGFkZEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpLFxuICAgICAgICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RFbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIFRvLURvIGl0ZW1zIGZyb20gTG9jYWwgU3RvcmFnZS5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUb0RvSW5TdG9yYWdlKGNoZWNrZW1wdHl2YWx1ZXN0cmluZzpib29sZWFuLCBsb2dtZXNzYWdlOmJvb2xlYW4pIHtcbiAgICAgICAgaWYgKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiVG9Eb0xpc3RcIiwgXCJUb0Rvc1wiLCBjaGVja2VtcHR5dmFsdWVzdHJpbmcsIGxvZ21lc3NhZ2UpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyc2VzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihwYXJzZXN0cikpO1xuICAgICAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgICAgICAgLy9wYXJzZWQgSlNPTiBpcyBtYWxmb3JtZWRcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlRvRG9JblN0b3JhZ2UgPSBwYXJzZXRlc3QucmV0dXJub2JqXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIFRvLURvIHRvIExvY2FsIFN0b3JhZ2UuIFxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiAtIFRoZSBVSSBmb3JtIGlucHV0IGRlc2NyaXB0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIC8vQWRkIHRoZSBUb0RvcyBhcnJheSB0byBsb2NhbCBjYWNoZS5cbiAgICAgICAgLy9UaGUgJ2xvY2Fsc3RvcmFnZXRvZG9jYWNoZScgaW50ZXJmYWNlIHN0cnVjdHVyZXMgdGhlIGRhdGEgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICAgICAgbGV0IFRvRG86IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSA9IHtcbiAgICAgICAgICAgIGluQ2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9kb2l0ZW06IGRlc2NyaXB0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBUb0RvczogYW55ID0gW107IC8vVG9EbyBhcnJheVxuICAgICAgICBsZXQgc3RyZ2Z5O1xuXG4gICAgICAgIGNvbnN0IHN0cmluZ2lmeXRvZG8gPSAodG9kb3N0cjphbnkpID0+IHtcbiAgICAgICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdG9kb3NzdHJnZnl0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih0b2Rvc3RyKSk7XG4gICAgICAgICAgICBpZiAoIXRvZG9zc3RyZ2Z5dGVzdC5wYXNzZWQpe1xuICAgICAgICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2Rvc3N0cmdmeXRlc3QucmV0dXJuc3RyO1xuICAgICAgICB9XG4gICAgICAgIC8vRmlyc3QsIHJlYWQgY3VycmVudCBMb2NhbCBTdG9yYWdlIFRvRG9zXG4gICAgICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgaWYgKHRvZG9zc3RvcmFnZWNhY2hlKXtcbiAgICAgICAgICAgIFRvRG9zID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgICAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBzdHJnZnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgICAgICBzdHJnZnkgPSBzdHJpbmdpZnl0b2RvKFRvRG9zKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIHN0cmdmeSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQ3JlYXRlZCB0by1kbyBjYWNoZSBrZXk6IFRvRG9zYCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQWRkZWQgdG8tZG8gY2FjaGU6ICR7ZGVzY3JpcHRpb259YCwgJ2NvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjsnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgVG8tRG8gaXRlbSBmcm9tIExvY2FsIFN0b3JhZ2UuIFRoZSByZXF1ZXN0ZWQgVG8tRG8gdG8gcmVtb3ZlIGlzXG4gICAgICogIHB1bGxlZCBpbmRpdmlkdWFsbHkgZnJvbSB0aGUga2V5LXZhbHVlIHBhaXIgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBpdGVtIC0gdGhlIFRvLURvIGl0ZW0gcmVxdWVzdGVkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgICAgICBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZS5maWx0ZXIoKHRvZG8pID0+IHRvZG8udG9kb2l0ZW0gIT09IGl0ZW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCB0b2RvIGNhY2hlOiAke2l0ZW19YCwgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuOycpO1xuICAgICAgICBsZXQgdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UpKTtcbiAgICAgICAgaWYoIXRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnBhc3NlZCl7XG4gICAgICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQganNvbnN0ciA9IHRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnJldHVybnN0cjtcbiAgICAgICAgaWYgKGpzb25zdHIgPT0gXCJcIiB8fCBqc29uc3RyID09IFwiW11cIil7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBqc29uc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgdG8gYWRkIGEgcm93IHRvIHRoZSBUby1EbyB0YWJsZS5cbiAgICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIGZpcnN0UGFpbnQgLSBCb29sZWFuIHZhbHVlIHVzZWQgYnkgYWRkaW5nIGxpc3Qgc3RvcmFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IFRBQkxFSVRFTSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgZmlyc3QgZGF0YVxuICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSB0aGlyZCBkYXRhXG4gICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvTGlzdC5Ub0RPcyA/ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9MaXN0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG5cbiAgICAgICAgLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgdGhlIFRvLURvIGl0ZW0gcm93cyBmcm9tIFRvLURvcyBzdG9yZWQgaW4gdGhlIGJyb3dzZXIgTG9jYWwgU3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKHRydWUsIGZhbHNlKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KFRvRG9MaXN0LlRvRG9JblN0b3JhZ2VbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgQUREQlVUVE9OID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEJ1dHRvbjtcbiAgICAgICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgICAgICBpZiAoQUREQlVUVE9OID09IG51bGwgJiYgQURESVRFTUVOVEVSID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3QgZnJvbSBjbGlja2luZyB0aGUgYWRkIGJ1dHRvbiovXG4gICAgICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3Qgd2hlbiB1c2luZyBrZXkgZW50ZXIqL1xuICAgICAgICBBRERJVEVNRU5URVIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBlLmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmdW5jdGlvbiBkZXRlcm1pbmluZyB0aGUgZGVsZXRlIGJ1dHRvbi4gSXRlbXMgYXJlIGRlbGV0ZWQgd2hlbiBwdXNoZWQsIGJ1dCBhcmVcbiAgICAgKiAgbm90IHJlbW92ZWQgZnJvbSBzdG9yYWdlIHdpdGhvdXQgJ0NvbXBsZXRlPycgY2hlY2tlYm94IGNoZWNrZWQuXG4gICAgICogQHBhcmFtIGJveCBpbnB1dCBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBEZWxldGVCdXR0b24oYm94OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlmIChib3gucGFyZW50Tm9kZSA9PSBudWxsIHx8IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZyA9PSBudWxsIHx8XG4gICAgICAgICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGEgdGFibGUgZWxlbWVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93Q2hrQnggPSA8SFRNTEVsZW1lbnQ+Ym94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcbiAgICAgICAgLyoqIElucHV0IGVsZW1lbnQgKi9cbiAgICAgICAgY29uc3Qgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07IFxuICAgICAgICBjb25zdCB0b2RvVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBjb25zdCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmJveC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGxldCBpID0gdHIucm93SW5kZXg7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50O1xuICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgdG9kbyByb3c6ICR7Ym94LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGRlbnJvZDsnKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSAnQWRkIGEgVG9ETyBJdGVtLicpIHtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuXG4gICAgICAgICAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZXRvRG9Gcm9tU3RvcmFnZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgdG9kbyByb3c6ICR7Ym94LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGRlbnJvZDsnKTtcbiAgICAgICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBzZWVkIHRoZSBUby1EbyBMaXN0IHdoZW4gdGhlcmUgYXJlIG5vIExvY2FsIFN0b3JhZ2UgaXRlbXNcbiAgICAgKiAgd2hpY2ggd291bGQgcG9wdWxhdGUgdGhlIGxpc3QuIFRoZSBzYW1wbGUgcmVtYWlucyBvbiBwYWdlIGJ1dCBpcyBuZXZlciBzdG9yZWQgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU2FtcGxlVG9fRG8odGJvZHk6IEVsZW1lbnQpIHtcbiAgICAgICAgaWYoVG9Eb0xpc3QuZ2V0VG9Eb0luU3RvcmFnZShmYWxzZSwgdHJ1ZSkpIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSBlbnRyeSBpbiB0aGUgVG9EbyB0YWJsZSBhcyBhIHBsYWNlaG9sZGVyXG4gICAgICAgIGNvbnN0IHRyMiA9IHRib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgIGNvbnN0IHRkMm1pZGRsZSA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgICAgIHRkMm1pZGRsZS5zZXRBdHRyaWJ1dGUoXCJudW1cIiwgYCR7MX1gKTtcbiAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICB0ZDJJTi50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKztcblxuICAgICAgICAvL1wiRGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5EZWxldGVCdXR0b24odGQyREVMKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZW1vdmVkIHRvZG86ICR7dGQyREVMLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6cHVycGxlO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnB1cnBsZTsnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL0F0dHJpYnV0aW9uTGlua1wiO1xuLyoqXG4gKiBUaGlzIGNsYXNzIGhvbGRzIHRoZSBkYXRhIGZvciAnV2ViQml0JyBhcnRpY2xlIGNhcmRzLiBLZXkgaW5mb3JtYXRpb25cbiAqIG9mIHRoZSBhcnRpY2xlJ3MgY29udGVudHMgYXJlIGNvbnRhaW5lZDogbmFtZSwgZGVzY3JpcHRpb24sIGRhdGEgY3JlYXRlZCxcbiAqIGV0Yy5cbiAqL1xuY2xhc3MgV2ViQml0IHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGFydGljbGVOdW1iZXI6IG51bWJlcjtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXRlQ3JlYXRlZDogRGF0ZTtcbiAgICBwdWJsaWMgYXJ0aWNsZUxpbms6IHN0cmluZztcbiAgICBwdWJsaWMgY2FyZEltYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIGNhcmRJbWFnZUFMVDogc3RyaW5nO1xuICAgIHB1YmxpYyBsaW5rQXR0cmlidXRpb246IEF0dHJpYnV0aW9uTGluaztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZyxcbiAgICAgICAgbGlua0F0dHJpYnV0aW9uPzogQXR0cmlidXRpb25MaW5rLFxuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgICAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVDtcbiAgICAgICAgdGhpcy5saW5rQXR0cmlidXRpb24gPSBsaW5rQXR0cmlidXRpb247XG4gICAgICAgIFdlYkJpdC5jb3VudCsrO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0O1xuIl19

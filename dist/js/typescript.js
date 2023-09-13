(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const client_1 = require("../models/client");
const notfound404widget = {
    init: () => {
        let client404 = new client_1.client();
        let clientrefferinfo = document.querySelector('#clientreferrer');
        let clientrttinfo = document.querySelector('#clientrtt');
        let clientplatforminfo = document.querySelector('#clientplat');
        clientrefferinfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
        clientrttinfo.textContent = `${client404.connectiontype ? client404.connectiontype : "No connection type found."}`;
        clientrttinfo.textContent += `, rtt of ${client404.connectionrtt ? client404.connectionrtt : "No rtt found."}`;
        clientplatforminfo.textContent = client404.browserplatform ? client404.browserplatform : "No platform information found.";
        clientplatforminfo.textContent += `, ${client404.useragent ? client404.useragent : "No user agent info."}`;
        let gobacklink = document.querySelector('#oldURL');
        if (client404.oldURL.includes("404.html")) {
            client404.oldURL = window.location.origin;
        }
        let gobackhref = client404.oldURL ? client404.oldURL : window.location.origin;
        gobacklink.setAttribute("href", `${gobackhref}`);
        gobacklink.setAttribute("title", gobackhref);
        let imgpic = document.querySelector("#errorpic");
        imgpic.setAttribute("src", "/img/error.png");
    }
};
exports.default = notfound404widget;

},{"../models/client":39}],2:[function(require,module,exports){
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

},{"../models/RWBErrorBus":32,"../models/ScriptPerf":36,"./DictionaryWidget":3,"./ToDosWidget":11}],3:[function(require,module,exports){
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

},{"../models/DictionarySearch":27}],4:[function(require,module,exports){
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

},{"../models/ExpandingList":29}],5:[function(require,module,exports){
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

},{"../data/portnums":22,"../models/FlashcardCardElems":30}],6:[function(require,module,exports){
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

},{"../models/GrowingCard":31}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const navitems_1 = require("../data/navitems");
const RWBErrorBus_1 = require("../models/RWBErrorBus");
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
                    new RWBErrorBus_1.RWBDomException("DomException", "Check site header element. Encountered error:", e);
                }
            }
            else { // 'Main' element does not exist, add the header to the body
                try {
                    siteHeader = document.body.insertAdjacentElement('afterbegin', HeaderFooter.headerWidget.buildHeader());
                }
                catch (e) {
                    new RWBErrorBus_1.RWBDomException("DomException", "Check site header is not null. Encountered error:", e);
                }
            }
            //Append navigation items to header
            try {
                siteHeader.childNodes[0].appendChild(HeaderFooter.headerWidget.buildNavigation());
            }
            catch (e) {
                new RWBErrorBus_1.RWBDomException("DomException", "Cannot prepend navigation items. Encountered error:", e);
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

},{"../data/navitems":21,"../models/RWBErrorBus":32,"../models/ScriptPerf":36}],8:[function(require,module,exports){
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
const _404_1 = require("./404");
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
                break;
            case '/404.html':
                _404_1.default.init();
        }
    }
};
exports.default = PageComponents;

},{"../models/ScriptPerf":36,"./404":1,"./ExpandingListDOMWidget":4,"./FlashcardGameWidget":5,"./GrowingCard":6,"./SlideShowWidget":10,"./WebBits":12,"./colorcode":13,"./colorcodeurl":14,"./cssex":15,"./domainlookup":16,"./hslcolor":17,"./sliderbar":19}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../models/ToDo":37}],12:[function(require,module,exports){
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

},{"../data/data":20,"../models/RandomWebBits":35}],13:[function(require,module,exports){
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

},{"../models/ColorCode":26}],14:[function(require,module,exports){
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

},{"../models/ColorCode":26}],15:[function(require,module,exports){
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

},{"../models/ColorCode":26}],16:[function(require,module,exports){
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

},{"../models/RWBErrorBus":32}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"../models/ScriptPerf":36}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../models/AttributionLink":25,"../models/WebBit":38}],21:[function(require,module,exports){
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

},{"../models/RWBLink":34}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./components/ClassComponents":2,"./components/HeaderFooter":7,"./components/PageComponents":8,"./components/mobileMarkup":18,"./models/ScriptPerf":36}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./RWBLink":34}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"../models/API":24,"./DictionarySearchMarkup":28,"./RWBErrorBus":32,"./RWBJSONConverter":33}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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
        console.log(`%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`, 'color:red;font-weight:bold;', 'color:red;', this.referror, 'color:red;font-weight:bold;');
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
    synerror;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        // let err = new RangeError();
        // console.log(`%c<RWB>%cHSL color value out of acceptable range:\n%o\n%c</RWB>`, 
        // 'color:gray;font-weight:bold;', 'color:gray;', err, 'color:gray;font-weight:bold;');
        let err = new SyntaxError(this.message);
        this.synerror = err;
        console.log(`%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`, 'color:red;font-weight:bold;', 'color:red;', this.synerror, 'color:red;font-weight:bold;');
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
    stack;
    page;
    domerror;
    constructor(name, message, error) {
        super();
        this.name = name;
        this.message = message;
        this.stack = error;
        this.page = window.location.pathname;
        let err = new DOMException(this.message);
        this.domerror = err;
        console.log(`%c<RWB>%cExecution experienced a DOM error:\n%o\n%c</RWB>`, 'color:red;font-weight:bold;', 'color:red;', this.stack, 'color:red;font-weight:bold;');
        RWBDomException.count++;
    }
    ;
}
exports.RWBDomException = RWBDomException;

},{}],33:[function(require,module,exports){
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

},{"./RWBErrorBus":32}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"../components/RWBCard":9}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{"./RWBErrorBus":32,"./RWBJSONConverter":33}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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
    setconnectionrtt() {
        if ("connection" in window.navigator) {
            let connection = window.navigator.connection;
            let rtt = connection.rtt;
            return rtt;
        }
        else
            this.connectionrtt = "";
    }
}
exports.client = client;

},{}]},{},[23])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy80MDQudHMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZS50cyIsInNyYy9jb21wb25lbnRzL2NvbG9yY29kZXVybC50cyIsInNyYy9jb21wb25lbnRzL2Nzc2V4LnRzIiwic3JjL2NvbXBvbmVudHMvZG9tYWlubG9va3VwLnRzIiwic3JjL2NvbXBvbmVudHMvaHNsY29sb3IudHMiLCJzcmMvY29tcG9uZW50cy9tb2JpbGVNYXJrdXAudHMiLCJzcmMvY29tcG9uZW50cy9zbGlkZXJiYXIudHMiLCJzcmMvZGF0YS9kYXRhLnRzIiwic3JjL2RhdGEvbmF2aXRlbXMudHMiLCJzcmMvZGF0YS9wb3J0bnVtcy50cyIsInNyYy9tYWluLnRzIiwic3JjL21vZGVscy9BUEkudHMiLCJzcmMvbW9kZWxzL0F0dHJpYnV0aW9uTGluay50cyIsInNyYy9tb2RlbHMvQ29sb3JDb2RlLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnRzIiwic3JjL21vZGVscy9FeHBhbmRpbmdMaXN0LnRzIiwic3JjL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMudHMiLCJzcmMvbW9kZWxzL0dyb3dpbmdDYXJkLnRzIiwic3JjL21vZGVscy9SV0JFcnJvckJ1cy50cyIsInNyYy9tb2RlbHMvUldCSlNPTkNvbnZlcnRlci50cyIsInNyYy9tb2RlbHMvUldCTGluay50cyIsInNyYy9tb2RlbHMvUmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvU2NyaXB0UGVyZi50cyIsInNyYy9tb2RlbHMvVG9Eby50cyIsInNyYy9tb2RlbHMvV2ViQml0LnRzIiwic3JjL21vZGVscy9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHVDQUF1QztBQUN2Qyw2Q0FBeUM7QUFFekMsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUYsYUFBYSxDQUFDLFdBQVcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkgsYUFBYSxDQUFDLFdBQVcsSUFBSSxZQUFZLFNBQVMsQ0FBQyxh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Q0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksZUFBZSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUM7WUFDcEMsa0VBQWtFO1lBQ2xFLDhFQUE4RTtZQUM5RSxJQUFJLGFBQWEsR0FBUSxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQXVCLENBQUM7WUFDbEUsSUFBSSxZQUFZLEdBQW1CLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDMUQsT0FBTyxZQUFZLENBQUM7U0FDdkI7O1lBRUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUM7WUFDakMsaUVBQWlFO1lBQ2pFLDJFQUEyRTtZQUMzRSxJQUFJLFVBQVUsR0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQW9CLENBQUE7WUFDMUQsSUFBSSxhQUFhLEdBQWtCLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDNUQsT0FBTyxhQUFhLENBQUM7U0FDeEI7O1lBRUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUM7WUFDakMsSUFBSSxVQUFVLEdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFvQixDQUFBO1lBQzFELElBQUksR0FBRyxHQUFrQixVQUFVLENBQUMsR0FBRyxDQUFDO1lBQ3hDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7O1lBRUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBOUNELHdCQThDQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vbW9kZWxzL2NsaWVudCdcblxuY29uc3Qgbm90Zm91bmQ0MDR3aWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBsZXQgY2xpZW50NDA0ID0gbmV3IGNsaWVudCgpO1xuICAgICAgICBsZXQgY2xpZW50cmVmZmVyaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGllbnRyZWZlcnJlcicpO1xuICAgICAgICBsZXQgY2xpZW50cnR0aW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGllbnRydHQnKTtcbiAgICAgICAgbGV0IGNsaWVudHBsYXRmb3JtaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGllbnRwbGF0Jyk7XG4gICAgICAgIGNsaWVudHJlZmZlcmluZm8udGV4dENvbnRlbnQgPSBjbGllbnQ0MDQub2xkVVJMID8gY2xpZW50NDA0Lm9sZFVSTCA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjbGllbnRydHRpbmZvLnRleHRDb250ZW50ID0gYCR7Y2xpZW50NDA0LmNvbm5lY3Rpb250eXBlID8gY2xpZW50NDA0LmNvbm5lY3Rpb250eXBlIDogXCJObyBjb25uZWN0aW9uIHR5cGUgZm91bmQuXCJ9YDtcbiAgICAgICAgY2xpZW50cnR0aW5mby50ZXh0Q29udGVudCArPSBgLCBydHQgb2YgJHtjbGllbnQ0MDQuY29ubmVjdGlvbnJ0dCA/IGNsaWVudDQwNC5jb25uZWN0aW9ucnR0IDogXCJObyBydHQgZm91bmQuXCJ9YDtcbiAgICAgICAgY2xpZW50cGxhdGZvcm1pbmZvLnRleHRDb250ZW50ID0gY2xpZW50NDA0LmJyb3dzZXJwbGF0Zm9ybSA/IGNsaWVudDQwNC5icm93c2VycGxhdGZvcm0gOiBcIk5vIHBsYXRmb3JtIGluZm9ybWF0aW9uIGZvdW5kLlwiO1xuICAgICAgICBjbGllbnRwbGF0Zm9ybWluZm8udGV4dENvbnRlbnQgKz0gYCwgJHtjbGllbnQ0MDQudXNlcmFnZW50ID8gY2xpZW50NDA0LnVzZXJhZ2VudCA6IFwiTm8gdXNlciBhZ2VudCBpbmZvLlwifWA7XG5cbiAgICAgICAgbGV0IGdvYmFja2xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb2xkVVJMJyk7XG4gICAgICAgIGlmIChjbGllbnQ0MDQub2xkVVJMLmluY2x1ZGVzKFwiNDA0Lmh0bWxcIikpe1xuICAgICAgICAgICAgY2xpZW50NDA0Lm9sZFVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGdvYmFja2hyZWYgPSBjbGllbnQ0MDQub2xkVVJMID8gY2xpZW50NDA0Lm9sZFVSTCA6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgJHtnb2JhY2tocmVmfWApO1xuICAgICAgICBnb2JhY2tsaW5rLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGdvYmFja2hyZWYpO1xuXG4gICAgICAgIGxldCBpbWdwaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Vycm9ycGljXCIpO1xuICAgICAgICBpbWdwaWMuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiL2ltZy9lcnJvci5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3Rmb3VuZDQwNHdpZGdldDsiLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBUb0Rvc1dpZGdldCBmcm9tICcuL1RvRG9zV2lkZ2V0JztcbmltcG9ydCBEaWN0aW9uYXJ5V2lkZ2V0IGZyb20gJy4vRGljdGlvbmFyeVdpZGdldCc7XG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5pbXBvcnQgUldCRXJyb3IgZnJvbSAnLi4vbW9kZWxzL1JXQkVycm9yQnVzJ1xuXG5jb25zdCBDbGFzc0NvbXBvbmVudHMgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc3BlcmYgPSBuZXcgUldCUGVyZihcIkNsYXNzY29tcG9uZW50c1wiKTsgLy9iZWdpbiBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAgICAgLy8gQWRkIERpY3Rpb25hcnkgV2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBpZiAoIVJXQkVycm9yLmNoZWNrRWxlbWVudG9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiZGljdGlvbmFyeVdpZGdldFwiLCB0cnVlLCB0cnVlKSlcbiAgICAgICAgRGljdGlvbmFyeVdpZGdldC5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBpZiAoIVJXQkVycm9yLmNoZWNrRWxlbWVudG9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiVG9Eb0xpc3RcIiwgdHJ1ZSwgdHJ1ZSkpXG4gICAgICAgIFRvRG9zV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgXG4gICAgICAgIGNsYXNzcGVyZi5lbmQoKTsgLy9lbmQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENsYXNzQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaCB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVNlYXJjaFwiXG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IERpY3Rpb25hcnlXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBjcmVhdGVzIGEgZGljdGlvbmFyeSBzZWFyY2ggd2lkZ2V0IGJ5IGNhbGxpbmcgdGhlXG4gICAgICogIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgbGV0IGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQ6IEVsZW1lbnRcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGljdGlvbmFyeVdpZGdldFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNDb3VsZCBub3QgcXVlcnkgZGljdGlvbmFyeSB3aWRnZXQgZWxlbWVudC5cIiwgXCJjb2xvcjpvcmFuZ2U7XCIpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEaWN0aW9uYXJ5U2VhcmNoIGNvbnN0cnVjdG9yXG4gICAgICAgIE9iamVjdC5jcmVhdGUobmV3IERpY3Rpb25hcnlTZWFyY2goZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCkpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpY3Rpb25hcnlXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEV4cGFuZGluZ0xpc3RFbGVtZW50IH0gZnJvbSBcIi4uL21vZGVscy9FeHBhbmRpbmdMaXN0XCI7XG5cbmNvbnN0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBEZWZpbmUgdGhlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQsIGZvciB1c2Ugd2l0aGluIHRoZSBwYWdlXG4gICAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZXhwYW5kaW5nLWxpc3QnLCBFeHBhbmRpbmdMaXN0RWxlbWVudCwgeyBleHRlbmRzOiAndWwnIH0pO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50IHByb3BlcnRpZXNcbiAgICAgICAgLy8gXCJET01cIiBwYWdlIHNwZWNpZmljIHByb3BlcnRpZXNcbiAgICAgICAgLy8gQWRkIGEgdGl0bGUgYXR0cmlidXRlIHRvIGFsbCBsaS1zcGFuIHRoYXQgY2FuIGV4cGFuZCBmdXJ0aGVyXG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaU9wZW5PcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOmZpcnN0LWNoaWxkYCk7XG4gICAgICAgIGNvbnN0IGV4cGFuZGFibGVMaUNsb3NlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpudGgtY2hpbGQoMylgKTtcblxuICAgICAgICAvLyBTZXQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzIGZvciBleHBhbmRpbmctZWxlbWVudCBleHBhbmRhYmxlIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpT3Blbk9wZW4pIHtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlICdET00nIGl0ZW1zIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyAtLS0+d2hlbiBjbGlja2VkLCBjaGFuZ2UgdGhlIHRpdGxlIHByb3BlcnR5IHRvIHJlZmxlY3Qgb3BlbiBvciBjbG9zZWQgc3RhdHVzXG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc3Bhbi5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgPT0gJ1NlbGVjdCB0byBleHBhbmQuLi4nXG4gICAgICAgICAgICAgICAgICAgID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gY2xvc2UuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gY2xvc2UuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICAgICAgOiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCB0byBleHBhbmQuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgcHJvcGVydHkgb2YgY2xvc2luZyBzcGFuIGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgRmxhc2hjYXJkQ2FyZEVsZW1zIGZyb20gJy4uL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMnXG5pbXBvcnQgcG9ydGRlZmluaXRpb25zIGZyb20gJy4uL2RhdGEvcG9ydG51bXMnXG5cbmNvbnN0IGZsYXNoY2FyZGdhbWVXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgLy8gRXN0YWJsaXNoIHdoaWNoIHBvcnQgbnVtYmVycyB0byB0ZXN0IGFuZCB0aGUgZGVmaW5pdGlvblxuICAgICAgICAvLyBUT0RPOiBmdW5jdGlvbnMgZmxhc2hjYXJkc1xuICAgICAgICBjb25zdCBtZXRob2RkZWZpbml0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KFtcbiAgICAgICAgICAgIFtcImNoYXJBdCgpXCIsIFwiUmV0dXJucyBhIG5ldyBzdHJpbmcgb2YgdGhlIGNoYXJhY3RlciBhdCBhIGdpdmVuIGluZGV4LlwiXVxuICAgICAgICBdKTtcblxuXG4gICAgICAgIC8vIENyZWF0ZSBmbGFzaGNhcmQgZWxlbWVudHNcbiAgICAgICAgbGV0IG1haW5GbGFzaENhcmREaXZzID0gbmV3IEZsYXNoY2FyZENhcmRFbGVtcyhwb3J0ZGVmaW5pdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHRoZSBnYW1lJ3MgdGl0bGUgZWxlbWVudFxuICAgICAgICBsZXQgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5GbGFzaENhcmRzXCIpO1xuICAgICAgICBjb25zdCBnYW1ldGl0bGVFbGVtID0gbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpKTtcbiAgICAgICAgZ2FtZXRpdGxlRWxlbS5pbm5lclRleHQgPSBcIkNvbXB1dGluZyBQb3J0IE51bWJlcnNcIlxuXG4gICAgICAgIC8vIEFkZCB0aGUgZmxhc2hjYXJkcyB0byB3aWRnZXRcbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBtYWluRmxhc2hDYXJkRGl2cy5tX2ZsYXNoY2FyZHNBcnIpe1xuICAgICAgICAgICAgbWFpbkZsYXNoQ2FyZFBhZ2VEaXYuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmbGFzaGNhcmRnYW1lV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBHcm93aW5nQ2FyZEVsZW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3dpbmdDYXJkXCJcblxuY29uc3QgQWN0aXZlQ2FyZHNXaWRnZXQgPSB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dyb3dpbmctY2FyZCcsIEdyb3dpbmdDYXJkRWxlbWVudCwgeyBleHRlbmRzOiAnbGknIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgfHwgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRGV0YWlsc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGxpc3QgaXRlbXMgKGNhcmRzKVxuICAgICAgICAgICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpKTtcblxuICAgICAgICAgICAgLy8gQ2xpY2sgZXZlbnQgdG8gcmVzaXplIHRoZSBjYXJkcyBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGEgY2FyZFxuICAgICAgICAgICAgLy8gV2hlbiBjbGlja2luZyBvdXRzaWRlIGEgY2FyZCwgcmVzaXplIGFsbCBjYXJkcyB0byBub3JtYWxcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wSXRlbTogR3Jvd2luZ0NhcmRFbGVtZW50ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZCh0ZW1wSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXNoYWRlIGFsbCBjYXJkcyBiZWNhdXNlIG5vbmUgb2YgdGhlbSBhcmUgYmlnXG4gICAgICAgICAgICBmb3IgKGxldCBsaSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKGxpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlQ2FyZHNXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBOQVZJVEVNUyBmcm9tICcuLi9kYXRhL25hdml0ZW1zJ1xuaW1wb3J0IHsgUldCRG9tRXhjZXB0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL1JXQkVycm9yQnVzJztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcblxuLyoqXG4gKiBXaWRnZXQgdG8gYWRkIHNpdGUgaGVhZGVyIGFuZCBmb290ZXIuIEluc3RhbnRpYXRlZCBpbiAnTWFpbicgc2NyaXB0LlxuICovXG5jb25zdCBIZWFkZXJGb290ZXIgPSB7XG4gICAgaGVhZGVyV2lkZ2V0OiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaXRlIGhlYWRlciBjb250YWluaW5nIG5hdmlnYXRpb24gbGlua3MgYW5kIHNpdGUgbG9nby5cbiAgICAgICAgICovXG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnBlcmYgPSBuZXcgUldCUGVyZihcIkhlYWRlclwiKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIVE1MICdtYWluJyBlbGVtZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICAgICAgLyoqIEhlYWRlciBlbGVtZW50IGNvbnRhaW5lciAqL1xuICAgICAgICAgICAgbGV0IHNpdGVIZWFkZXI6IEVsZW1lbnQgfCBudWxsO1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2VcbiAgICAgICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsKSB7Ly8gJ01haW4nIGVsZW1lbnQgZXhpc3RzLCBhZGQgdGhlIGhlYWRlciB0byBpdFxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBwYWdlTWFpbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZEhlYWRlcigpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBSV0JEb21FeGNlcHRpb24oXCJEb21FeGNlcHRpb25cIiwgXCJDaGVjayBzaXRlIGhlYWRlciBlbGVtZW50LiBFbmNvdW50ZXJlZCBlcnJvcjpcIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vICdNYWluJyBlbGVtZW50IGRvZXMgbm90IGV4aXN0LCBhZGQgdGhlIGhlYWRlciB0byB0aGUgYm9keVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIgPSBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgUldCRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2hlY2sgc2l0ZSBoZWFkZXIgaXMgbm90IG51bGwuIEVuY291bnRlcmVkIGVycm9yOlwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQXBwZW5kIG5hdmlnYXRpb24gaXRlbXMgdG8gaGVhZGVyXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNpdGVIZWFkZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkTmF2aWdhdGlvbigpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBuZXcgUldCRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2Fubm90IHByZXBlbmQgbmF2aWdhdGlvbiBpdGVtcy4gRW5jb3VudGVyZWQgZXJyb3I6XCIsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBoZWFkZXJwZXJmLmVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGhlYWRlciB3aXRoIHNpdGUgbG9nbyBhcHBlbmRlZC5cbiAgICAgICAgICogQHBhcmFtIG1haW4gSFRNTCAnbWFpbicgZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJucyBQb3B1bGF0ZWQgaGVhZGVyIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIGJ1aWxkSGVhZGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEJhc2ljIEhUTUwgaGVhZGVyIGVsZW1lbnQgY29udGFpbmluZyBsb2dvIChIMSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2lkdGgtbWF4LWNlbnRlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IEgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkgxXCIpO1xuICAgICAgICAgICAgSDEudGV4dENvbnRlbnQgPSAnPFJhbmRvbSBXZWIgQml0cz4nO1xuICAgICAgICAgICAgSDEuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJSYW5kb21XZWJCaXRzXCIpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlckNvbnRhaW5lci5hcHBlbmQoSDEpO1xuICAgICAgICAgICAgc2l0ZUhlYWRlci5hcHBlbmQoc2l0ZUhlYWRlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlSGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZE5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBoZWFkZXIgbmF2aWdhdGlvbiBiYXNlZCBvbiBuYXZpZ2F0aW9uIGRhdGFcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuYXZpZ2F0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJOYXZGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2ID0gaGVhZGVyTmF2RnJhZ1xuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBuYXYgZGF0YSB0byBuYXYgZWxlbWVudHNcbiAgICAgICAgICAgIE5BVklURU1TLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0TGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucHJlcGVuZChuYXZMaXN0TGlua3MpO1xuICAgICAgICAgICAgICAgIGhlYWRlck5hdi5hcHBlbmQobmF2TGlzdEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBuYXZpZ2F0aW9uIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy50ZXh0Q29udGVudCA9IGAke2l0ZW0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICAgICAgLy8gRW52aXJvbm1lbnQgbGlua3MgZWRpdCwgcmVxdWlyaW5nIGRpZmZlcmVudCBsaW5rIHJlbGF0aXZlcyB0byBvcGVyYXRlXG4gICAgICAgICAgICAgICAgLy8gR2l0aHViIHBhZ2VzIG9wZXJhdGVzIGZyb20gcmVwb3NpdG9yeSwgbm90ICcvJ1xuICAgICAgICAgICAgICAgIC8vaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09ICdyb2Job3dlLWEuZ2l0aHViLmlvJykge1xuICAgICAgICAgICAgICAgICAgICAvL2xpbmsgZGF0YSBlZGl0IGZvciBkZXYgZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC9SYW5kb21XZWJCaXRzLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgaW4gb3RoZXIgZW52aXJvbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgLyR7aXRlbS5oUmVmZXJlbmNlfWApO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgIG5hdkxpc3RMaW5rcy5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBpdGVtLnRpdGxlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyTmF2RnJhZztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmb290ZXJXaWRnZXQ6IHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm9vdGVycGVyZiA9IG5ldyBSV0JQZXJmKFwiRm9vdGVyXCIpO1xuXG4gICAgICAgICAgICAvLyBBZGQgZm9vdGVyIGVsZW1lbnQgdG8gdGhlIHBhZ2UgZW5kXG4gICAgICAgICAgICBsZXQgZm9vdGVyOiBIVE1MRWxlbWVudCA9IEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGRGb290ZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGZvb3Rlcik7XG4gICAgICAgICAgICBmb290ZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uKGZvb3RlcikpO1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZERldmVsb3BlckF0dHJpYnV0aW9uKGZvb3Rlcik7XG5cbiAgICAgICAgICAgIGZvb3RlcnBlcmYuZW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRm9vdGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVGb290ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVyUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgZm9vdGVyUGFyYS50ZXh0Q29udGVudCA9IGBcXHUwMEE5IDIwMjItMjAyMyBSYW5kb20gV2ViIEJpdHMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuYDtcblxuICAgICAgICAgICAgc2l0ZUZvb3RlckNvbnRhaW5lci5hcHBlbmQoZm9vdGVyUGFyYSk7XG4gICAgICAgICAgICBzaXRlRm9vdGVyLmFwcGVuZChzaXRlRm9vdGVyQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpdGVGb290ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRmF2aWNvbkF0dHJpYnV0aW9uOiAoZm9vdGVyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmF2aWNvbiBhdHRyaWJ1dGlvbiBzZWN0aW9uICsgbGluayB0byBzb3VyY2VcbiAgICAgICAgICAgIGNvbnN0IGZvb3Rlckljb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiSWNvbkhvbWU6ICM0NTAyNjc1NVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5ocmVmID0gJ2h0dHBzOi8vd3d3LnZlY3RvcnN0b2NrLmNvbS9yb3lhbHR5LWZyZWUtdmVjdG9yL21haW50ZW5hbmNlLWljb24tZm9yLWdyYXBoaWMtYW5kLXdlYi1kZXNpZ24tdmVjdG9yLTQ1MDI2NzU1J1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsudGV4dENvbnRlbnQgPSAnVmVjdG9yU3RvY2suY29tJztcbiAgICAgICAgICAgIGZvb3Rlckljb25QYXJhLnRleHRDb250ZW50ID0gYEZhdmljb24gZGVzaWduZWQgYnkgSWNvbkhvbWUgYXQgYDtcblxuICAgICAgICAgICAgLy8gQXBwZW5kIGF0dHJpYnV0aW9uIHRvIGZvb3RlciBwYXJhXG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS5hcHBlbmRDaGlsZChmb290ZXJJY29uTGluayk7XG4gICAgICAgICAgICBmb290ZXIuY2hpbGROb2Rlc1swXS5hcHBlbmRDaGlsZChmb290ZXJJY29uUGFyYSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb290ZXJJY29uUGFyYTtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGREZXZlbG9wZXJBdHRyaWJ1dGlvbjogKGZvb3RlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldmF0dHJpYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBkZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGRldi50ZXh0Q29udGVudCA9ICdEZXZlbG9wZWQgYnkgUm9iZXJ0IEhvd2VsbCc7XG5cbiAgICAgICAgICAgIGRldmF0dHJpYi5hcHBlbmQoZGV2KTtcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChkZXZhdHRyaWIpO1xuXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckZvb3RlcjtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEV4cGFuZGluZ0xpc3RET01XaWRnZXQgZnJvbSAnLi9FeHBhbmRpbmdMaXN0RE9NV2lkZ2V0JztcbmltcG9ydCBBY3RpdmVDYXJkc1dpZGdldCBmcm9tICcuL0dyb3dpbmdDYXJkJztcbmltcG9ydCBmbGFzaGNhcmRnYW1lV2lkZ2V0IGZyb20gJy4vRmxhc2hjYXJkR2FtZVdpZGdldCc7XG5pbXBvcnQgc2xpZGVzaG93V2lkZ2V0IGZyb20gJy4vU2xpZGVTaG93V2lkZ2V0JztcbmltcG9ydCBjc3NleCBmcm9tICcuL2Nzc2V4JztcbmltcG9ydCBodG1sZXhDb2xvckNvZGUgZnJvbSAnLi9jb2xvcmNvZGUnO1xuaW1wb3J0IFJXQkNhcmRzV2lkZ2V0IGZyb20gJy4vV2ViQml0cyc7XG5pbXBvcnQgdXJsZXhDb2xvckNvZGUgZnJvbSAnLi9jb2xvcmNvZGV1cmwnO1xuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi4vbW9kZWxzL1NjcmlwdFBlcmYnO1xuaW1wb3J0IGRvbWFpbmxvb2t1cCBmcm9tICcuL2RvbWFpbmxvb2t1cCc7XG5pbXBvcnQgc2xpZGVyYmFyIGZyb20gJy4vc2xpZGVyYmFyJztcbmltcG9ydCBoc2xjb2xvcndpZGdldCBmcm9tICcuL2hzbGNvbG9yJztcbmltcG9ydCBub3Rmb3VuZDQwNHdpZGdldCBmcm9tICcuLzQwNCc7XG5cbmNvbnN0IFBhZ2VDb21wb25lbnRzID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFnZXBlcmYgPSBuZXcgUldCUGVyZihcIlBhZ2Vjb21wb25lbnRzXCIpOyAvL21lYXN1cmUgcGVyZm9ybWFuY2VcblxuICAgICAgICBQYWdlQ29tcG9uZW50cy5DaGVja1BhZ2UoKTtcbiAgICAgICAgcGFnZXBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9LFxuICAgIENoZWNrUGFnZTogKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgLy8nSW5kZXgnIGFuZCAnUGFnZXMnIHJvdXRlcywgYWRkIGNhcmRzIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgIGNhc2UgJyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBSV0JDYXJkc1dpZGdldC5pbml0KCk7IC8vIGNhcmRzIHdpZGdldCBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gZG9tLmh0bWwsIHN2Zy5odG1sIHBhZ2UgdXNlcyBleHBhbmRpbmdMaXN0cyBjb21wb25lbnRcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9kb20uaHRtbCc6XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvc3ZnLmh0bWwnOlxuICAgICAgICAgICAgICAgIEV4cGFuZGluZ0xpc3RET01XaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB3ZWJJREUgd2lkZ2V0XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvd2ViaWRlcy5odG1sJzpcbiAgICAgICAgICAgICAgICBBY3RpdmVDYXJkc1dpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHNsaWRlc2hvdyBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvZ3VpZGVzL3B3YWljb24uaHRtbCc6XG4gICAgICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgQ1NTRVggY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2Nzcy5odG1sJzpcbiAgICAgICAgICAgICAgICBjc3NleC5DU1NFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBodG1sZXhDb2xvckNvZGUgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2h0bWwuaHRtbCc6XG4gICAgICAgICAgICAgICAgaHRtbGV4Q29sb3JDb2RlLkhUTUxFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB1cmxleENvbG9yQ29kZSBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvdXJsLmh0bWwnOlxuICAgICAgICAgICAgICAgIHVybGV4Q29sb3JDb2RlLlVSTEVYQ29sb3JDb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGZsYXNoY2FyZCBjb21wb25lbnRzXG4gICAgICAgICAgICBjYXNlICcvZmxhc2hjYXJkcy5odG1sJzpcbiAgICAgICAgICAgICAgICBmbGFzaGNhcmRnYW1lV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZG9tYWluIG5hbWUgbG9va3VwXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvZG9tYWlubG9va3VwLmh0bWwnOlxuICAgICAgICAgICAgICAgIGRvbWFpbmxvb2t1cC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvbWFya3VwLmh0bWwnOlxuICAgICAgICAgICAgICAgIHNsaWRlcmJhci5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEhTTCBjb2xvciBwaWNrZXJcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9oc2wuaHRtbCc6XG4gICAgICAgICAgICAgICAgaHNsY29sb3J3aWRnZXQuaW5pdGhzbGNvbG9ycGlja2VyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvNDA0Lmh0bWwnOlxuICAgICAgICAgICAgICAgIG5vdGZvdW5kNDA0d2lkZ2V0LmluaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZUNvbXBvbmVudHM7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4uL21vZGVscy9BdHRyaWJ1dGlvbkxpbmtcIjtcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4uL21vZGVscy9XZWJCaXRcIjtcbmltcG9ydCB7IFJXQkNhcmRFbGVtZW50cyB9IGZyb20gXCIuLi9tb2RlbHMvV2lkZ2V0TWFya3VwRWxlbWVudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JDYXJkIHtcbiAgICAvKipcbiAgICAgKiBDYXJkIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW4gaWNvbiBwaWN0dXJlIGFuZCBjYXJkIGJvZHkuIEFuIGltYWdlLCB0aGUgaW1hZ2UgdG9wLCB0aGUgY2FyZCBib2R5LlxuICAgICAqL1xuICAgIHByaXZhdGUgcndiY2FyZGVsZW1lbnRzOiBSV0JDYXJkRWxlbWVudHM7XG4gICAgLyoqXG4gICAgICogIE1hcCBXZWJCaXQgZGF0YSB0byBhIGNhcmQgZWFjaFxuICAgICAqIFxuICAgICAqICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAqICAgICAgPGRpdj5cbiAgICAgKiAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRCb2R5XCI+XG4gICAgICogICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgPHA+PC9wPlxuICAgICAqICAgICAgICAgIDxhIGhyZWY9XCJcIj48L2E+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgPC9kaXY+XG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlOiBXZWJCaXQpIHtcbiAgICAgICAgbGV0IFdlYkJpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cyA9IHtcbiAgICAgICAgICAgIGNhcmRJbWc6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgICAgICAgICAgY2FyZEltZ1RvcDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBjYXJkQm9keTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FyZEJvZHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbGV0IGNhcmRCb2R5TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlIZWFkaW5nKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlQYXJhKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoY2FyZEJvZHlMaW5rKTtcblxuICAgICAgICAvLyBBZGQgY2FyZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICBXZWJCaXQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBXZWJCaXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7YXJ0aWNsZS5pZH1gKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuY2xhc3NMaXN0LmFkZChcImNhcmRCb2R5XCIsKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGUuY2FyZEltYWdlKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFydGljbGUuY2FyZEltYWdlQUxUKTtcbiAgICAgICAgdGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5zZXRBdHRyaWJ1dGUoJ0FydGljbGUnLCBhcnRpY2xlLmFydGljbGVOdW1iZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIGNhcmRCb2R5TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBhcnRpY2xlLmFydGljbGVMaW5rKVxuICAgICAgICBjYXJkQm9keUhlYWRpbmcuaW5uZXJUZXh0ID0gYXJ0aWNsZS5uYW1lO1xuICAgICAgICBjYXJkQm9keVBhcmEudGV4dENvbnRlbnQgPSBhcnRpY2xlLmRlc2NyaXB0aW9uO1xuICAgICAgICBjYXJkQm9keUxpbmsudGV4dENvbnRlbnQgPSBcIkdvIHRvIFBhZ2VcIjtcblxuICAgICAgICAvLyBJbWFnZSBhdHRyaWJ1dGlvbiBtYXkgYmUgbmVlZGVkIGZvciB0aGUgaW1hZ2UgdXNlZFxuICAgICAgICAvLyBBdHRyaWJ1dGlvbiBkYXRhIGlzIGltcG9ydGVkIGFzICdhdHRybGlua3MnIHNpZ25hdHVyZSBwYXJhbWV0ZXJcbiAgICAgICAgaWYgKGFydGljbGUubGlua0F0dHJpYnV0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbCh0aGlzLnJ3YmNhcmRlbGVtZW50cywgYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGNhcmQgaXMgV2ViQml0XG4gICAgICAgIC8vIEFkZCB0aGUgbWFya3VwIHRvIHRoZSBjb250YWluaW5nIGVsZW1lbnRcbiAgICAgICAgV2ViQml0LmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3ApO1xuICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkpO1xuXG4gICAgICAgIHJldHVybiBXZWJCaXQ7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGltYWdlIGF0dHJpYnV0aW9uLCB0aGUgaW1hZ2UgaWQgYW5kIGFydGljbGUgaWQgd2lsbCBtYXRjaCxcbiAgICAgKiBvdGhlcndpc2UgdGhlIGRhdGEgaXNuJ3QgZW50ZXJlZCwgY2F1c2luZyBhIG1pc3NcbiAgICAgKiBcbiAgICAgKiAgPGRpdiBjbGFzcz1cImZsaXAtY2FyZFwiPjwhLS1jYXJkIGltYWdlIHBhbmVsLS0+XG4gICAgICogIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAqICAgICAgPGRpdiBjbGFzcz1cImNhcmRGcm9udFwiPlxuICAgICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkQmFja1wiPlxuICAgICAqICAgICAgICAgICAgICAgPGgzPjwvaDM+XG4gICAgICogICAgICAgICAgICAgICA8cD48L3A+XG4gICAgICogICAgICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGFydGljbGU9XCJcIiBjbGFzcz1cImltZ1NtYWxsIGltZ1BUUlwiPlxuICAgICAqICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICA8L2Rpdj48IS0tZW5kIGNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgKiBAcGFyYW0gcndiY2FyZGVsZW1lbnRzIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAgICogQHBhcmFtIGxpbmsgQXR0cmlidXRpb24gbGlua1xuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRSV0JDYXJkQXR0cmlidXRpb25QYW5lbChyd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cywgbGluazogQXR0cmlidXRpb25MaW5rKSB7XG4gICAgICAgIGlmIChyd2JjYXJkZWxlbWVudHMuY2FyZEltZy5nZXRBdHRyaWJ1dGUoJ0FydGljbGUnKSA9PT0gbGluay5hcnRpY2xlaWQudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGltYWdlIGJhY2sgcGFuZWwgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICAgICAgLy8gUmVkZWZpbmUgY2FyZCBpbWFnZSBwYW5lbCBhcyBhIGZsaXAgcGFuZWxcbiAgICAgICAgICAgIGNvbnN0IGNhcmRJbm5lciA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEZyb250ID0gY2FyZElubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY2FyZEZyb250LmFwcGVuZENoaWxkKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nKTsgLy8gbW92ZSBpbWFnZSB3aXRoaW4gY2FyZCBmcm9udCBkaXZpc29yXG4gICAgICAgICAgICBsZXQgc21hbGxJbWcgPSA8SFRNTEltYWdlRWxlbWVudD5yd2JjYXJkZWxlbWVudHMuY2FyZEltZy5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEJhY2sgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBiYWNrSGVhZGluZyA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgICAgICAgICBjYXJkQmFjay5hcHBlbmRDaGlsZChzbWFsbEltZyk7XG4gICAgICAgICAgICBjb25zdCBiYWNrUGFyYSA9IGNhcmRCYWNrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpbmsgPSByd2JjYXJkZWxlbWVudHMuY2FyZEJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpOyAvL2FwcGVuZCB0byBmcm9udCBwYW5lbFxuXG4gICAgICAgICAgICAvLyBBZGQgZmxpcC1wYW5lbCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiKVxuICAgICAgICAgICAgY2FyZElubmVyLmNsYXNzTGlzdC5hZGQoXCJpbm5lclwiKTtcbiAgICAgICAgICAgIGNhcmRGcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgc21hbGxJbWcuY2xhc3NMaXN0LmFkZChcImltZ1NtYWxsXCIsIFwiaW1nUFRSXCIpO1xuICAgICAgICAgICAgY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIpO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay5jbGFzc0xpc3QuYWRkKFwiYXR0cmlidXRlXCIpO1xuICAgICAgICAgICAgYmFja0hlYWRpbmcudGV4dENvbnRlbnQgPSBsaW5rLmF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgICAgIGJhY2tQYXJhLnRleHRDb250ZW50ID0gbGluay5pbm5lclRleHRcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsuaHJlZiA9IGxpbmsuaFJlZmVyZW5jZTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZUxpbmsudGl0bGUgPSBsaW5rLnRpdGxlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZG93bmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG4vLyBBdHRyaWJ1dGlvbjogUm9iZXJ0IEEgSG93ZWxsLCBNYXkgMjAyM1xuLy8gQ29udGVudCBkZXJpdmVkIGZyb206IFczU2Nob29scywgaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9ob3d0by9ob3d0b19qc19zbGlkZXNob3cuYXNwXG5cblxuLyoqXG4gKiBDb21wb25lbnQgY3JlYXRpbmcgc2xpZGVzaG93IHdpZGdldHNcbiAqL1xuY29uc3Qgc2xpZGVzaG93V2lkZ2V0ID0ge1xuICAgIHNsaWRlSW5kZXg6IDEsXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHNsaWRlc2hvdyBjb21wb25lbnRzLlxuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgLy8gTmV4dC9wcmV2aW91cyBjb250cm9sc1xuICAgICAgICBmdW5jdGlvbiBwbHVzU2xpZGVzKG46bnVtYmVyKSB7XG4gICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCArPSBuKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVGh1bWJuYWlsIGltYWdlIGNvbnRyb2xzXG4gICAgICAgIGZ1bmN0aW9uIGN1cnJlbnRTbGlkZShuOm51bWJlcikge1xuICAgICAgICAgICAgc2xpZGVzaG93V2lkZ2V0LnNob3dTbGlkZXMoc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSBuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hhbmdlIHRvIG5leHQgc2xpZGUgd2hlbiBhcnJvdyBidXR0b25zIGFyZSBjbGlja2VkXG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd1ByZXZpb3VzQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZXNob3dQcmV2XCIpO1xuICAgICAgICBjb25zdCBzbGlkZVNob3dOZXh0QnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZXNob3dOZXh0XCIpO1xuICAgICAgICBmb3IgKGxldCBidG4gb2Ygc2xpZGVTaG93UHJldmlvdXNCdG5zKXtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKC0xKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGJ0biBvZiBzbGlkZVNob3dOZXh0QnRucyl7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcygxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGFuZ2UgdG8gc2VsZWN0ZWQgc2xpZGUgd2hlbiBkb3QgYXJlIGNsaWNrZWRcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93RG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XG4gICAgICAgIGxldCBkb3RDb3VudGVyID0gMTtcbiAgICAgICAgZm9yKGxldCBkb3Qgb2Ygc2xpZGVTaG93RG90cyl7XG4gICAgICAgICAgICAvL2FkZCBkb3QgY291bnRlclxuICAgICAgICAgICAgZG90LnNldEF0dHJpYnV0ZShcImRvdGluZGV4XCIsIGAke2RvdENvdW50ZXJ9YClcbiAgICAgICAgICAgIC8vd2hlbiBjbGlja2VkLCBuYXZpZ2F0ZSB0byB0aGUgc2xpZGUgaW5kaWNhdGVkXG4gICAgICAgICAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICAgICAgcGx1c1NsaWRlcyhkb3RDb3VudGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG90Q291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGRvdENvdW50ZXIgPSAxO1xuICAgIH0sXG4gICAgc2hvd1NsaWRlczogKG46IG51bWJlcik9PntcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJteVNsaWRlc1wiKTtcbiAgICAgICAgICAgIGxldCBkb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcbiAgICAgICAgICAgIGlmIChuID4gc2xpZGVzLmxlbmd0aCkge3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gMX1cbiAgICAgICAgICAgIGlmIChuIDwgMSkge3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ID0gc2xpZGVzLmxlbmd0aH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcFNsaWRlID0gPEhUTUxEaXZFbGVtZW50PnNsaWRlc1tpXTtcbiAgICAgICAgICAgICAgICB0ZW1wU2xpZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSBkb3RzW2ldLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFjdGl2ZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0ZW1wU2xpZGUgPSA8SFRNTERpdkVsZW1lbnQ+c2xpZGVzW3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4IC0gMV1cbiAgICAgICAgICAgIHRlbXBTbGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgZG90c1tzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCAtIDFdLmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXNob3dXaWRnZXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFRvRG9MaXN0IH0gZnJvbSBcIi4uL21vZGVscy9Ub0RvXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIFRvLURvIExpc3Qgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IFRvRG9zV2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFRvLURvIExpc3Qgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gRWxlbWVudCBjb250YWluaW5nICdUb0RvTGlzdCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRvRG9zRWxlbWVudDogRWxlbWVudDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdG9Eb3NFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Ub0RvTGlzdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNDb3VsZCBub3QgcXVlcnkgdG9kbyBsaXN0IHdpZGdldCBlbGVtZW50LlwiLCBcImNvbG9yOm9yYW5nZTtcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVG9Eb0xpc3Qgb2JqZWN0XG4gICAgICAgIGNvbnN0IHRvZG9XaWRnZXQgPSBuZXcgVG9Eb0xpc3QoKTtcblxuICAgICAgICAvL0NyZWF0ZXMgd2lkZ2V0IG1hcmt1cCBhbmQgcG9wdWxhdGVzIFRvLURvIHRhc2tzIGNvbnRhaW5lZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIHRvZG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQodG9Eb3NFbGVtZW50KTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb0Rvc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFdFQkJJVERBVEEgZnJvbSBcIi4uL2RhdGEvZGF0YVwiXG5pbXBvcnQgeyBSYW5kb21XZWJCaXRzIH0gZnJvbSBcIi4uL21vZGVscy9SYW5kb21XZWJCaXRzXCJcblxuLyoqXG4gKiBDYXJkIHdpZGdldCB0byBpbml0aWFsaXplIGFydGljbGUgZGF0YSBpbnRvIEhUTUwgY2FyZCBlbGVtZW50cy4gVGhpcyB3aWRnZXQgXG4gKiBjcmVhdGVzIG11bHRpcGxlIHNlY3Rpb25zIG9mIGNhcmRzIHRvIGFkZCB0byBhIHBhZ2UuXG4gKi9cbmNvbnN0IFJXQkNhcmRzV2lkZ2V0ID0ge1xuICAgIC8qKiBDYXJkcyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiBicmVha3MgZG93biB0aGUgZGF0YSBzdHJ1Y3R1cmUgaW4gXG4gICAgICogb3JkZXIgdG8gZm9ybXVsYXRlIHRoZSBhcnRpY2xlIGRldGFpbHMgaW50byBvbmUgY2FyZCBmb3IgZWFjaCBhcnRpY2xlIGRhdGEuXG4gICAgICogXG4gICAgICogQXJ0aWNsZXMgaGF2ZSBkaWZmZXJlbnQgY2F0ZWdvcmllcywgc28gZWFjaCBjYXRlZ29yeSBtdXN0IGJlIHJlc3BlY3RlZC4gXG4gICAgICogKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIC8vIFNwbGl0IHRoZSBjYXJkcyBhcnJheXMgaW50byB0aGVpciByZXNwZWN0aXZlIGNhdGVnb3J5XG4gICAgICAgIC8qKiBNdWx0aXBsZSBjYXRlZ29yaWVzIG9mIGNhcmQgZGF0YSBleGlzdC4gVGhpcyBhcnJheSBob2xkcyB0aGUgbWFya3VwIG5lZWRlZCBcbiAgICAgICAgICogdG8gY3JlYXRlIGNhdGVnb3J5IHNlY3Rpb25zIGRpdmlzaW9ucyB3aGVuIHBsYWNlZCBvbiBhIHBhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY2FyZHNTZWN0aW9uOiBIVE1MRGl2RWxlbWVudFtdID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkFyYml0cmFyeSBBcnRpY2xlczpcIiwgXCJBcmJpdHJhcnlBcnRpY2xlc1wiKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJHdWlkZSBTaG9ydHM6XCIsIFwiR3VpZGVTaG9ydHNcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiRXhwbG9yZSB0aGUgV2ViOlwiLCBcIkV4cGxvcmV0aGVXZWJcIiksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGNhcmQgZGF0YSArIGF0dHJpYnV0aW9uIGxpbmsgZGF0YVxuICAgICAgICAvLyBXRUJCSVREQVRBIGJyb2tlbiBpbnRvIDMgYXJyYXlzOiBQYWdlcywgb3IgYXJ0aWNsZXMsIEd1aWRlcywgYW5kIEV4cGxvcmVzXG4gICAgICAgIC8qKlRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBvZiBjYXJkIGVsZW1lbnRzLiBFYWNoIGluZGV4IHN0b3JlcyB0aGUgY2FyZHMnIGRhdGFcbiAgICAgICAgICogZm9yIG9uZSBjYXRlZ29yeSBvZiBhcnRpY2xlcy4gKi8gXG4gICAgICAgIGxldCBjYXJkc0FydGljbGVzOiBhbnkgPSBbXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgIF07XG5cbiAgICAgICAgXG4gICAgICAgIC8vIFJvdXRlcyAtPiBBZGQgd2lkZ2V0IGFuZCBmb3JtYXQgcGFnZXNcbiAgICAgICAgLy8gSW5kZXggKEhvbWUpIHBhZ2Ugc2hvcnRlbnMgZWFjaCBzZWN0aW9uIHRvIDMgYXJ0aWNsZXMgb25seVxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnLycgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbCcgfHxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL1JhbmRvbVdlYkJpdHMvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvZGlzdC9pbmRleC5odG1sJykge1xuICAgICAgICAgICAgICAgIC8qKiBSYW5kb21pemUgdGhlIG9yZGVyIG9mIGNhcmRzLiAqL1xuICAgICAgICAgICAgY29uc3QgZ2V0TXVsdGlwbGVSYW5kb20gPSAoYXJyOiBhbnksIG51bTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9taXplIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IHNodWZmbGVkID0gWy4uLmFycl0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaHVmZmxlZC5zbGljZSgwLCBudW0pOyAvLyByZXR1cm4gdGhlIHJlcXVlc3RlZCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMF0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzBdLCA1KTtcbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMV0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzFdLCAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgY2FyZHMgdG8gdGhlIHBhZ2UgYnkgZGVjb25zdHJ1Y3Rpb24gYW5kIGFkZGl0aW9uXG4gICAgICAgIC8vIE91dGVyIGxvb3A6IGl0ZXJhdGUgdGhlIGRhdGEgdG8gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5OiBQYWdlcywgR3VpZGVzLCBFeHBsb3Jlc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzU2VjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhcmRzU2VjdGlvbltpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJbm5lciBsb29wOiBpdGVyYXRlIHRocm91Z2ggdGhlIGNhdGVnb3J5IGRhdGFcbiAgICAgICAgICAgICAgICAvLyBGcm9tIHRoZSBjYXJkcyBzdGFjaywgYXBwZW5kIGVhY2ggdG8gc2VjdGlvblxuICAgICAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXMuc2hpZnQoKS5mb3JFYWNoKChhcnRpY2xlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNTZWN0aW9uW2ldLmFwcGVuZChhcnRpY2xlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhbiBlcnJvci5cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUldCQ2FyZHNXaWRnZXRcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IENvbG9yQ29kZSBmcm9tICcuLi9tb2RlbHMvQ29sb3JDb2RlJ1xuXG5jb25zdCBodG1sZXhDb2xvckNvZGUgPSB7XG4gICAgSFRNTEVYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIC8vIEdldCBjb21wb25lbnQgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gd2lkZ2V0IGludGVyYWN0aXZpdHlcbiAgICAgICAgY29uc3Qgb3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnb3BlblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgY2xvc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnY2xvc2VcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGV4dFZhbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBhcnJheSBkYXRhIHN0cnVjdHVyZXMsIG5lZWRlZCBmb3IgdGhlIENvbG9yQ29kZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGNvbnN0IGNvbG9ybGVzc2VsZW1lbnRzID0gbmV3IEFycmF5KG9wZW5lcnMsIGNsb3NlcnMsIHZhbHVlcywgYXR0cmlidXRlcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItUmVkKVwiLCBcInZhcigtLWNsci1EYXJrQ3lhbilcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBodG1sZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgdXJsZXhDb2xvckNvZGUgPSB7XG4gICAgVVJMRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb3RvY29sXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBkb21haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRvbWFpblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9ydFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVyeVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52YWx1ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShwcm90b2NvbCwgZG9tYWluLCBwb3J0LCBmb2xkZXIsIFxuICAgICAgICAgICAgZmlsZSwgcXVlcnksIGtleSwgdmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiLCBcInZhcigtLWNsci1SZWQpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItcHJpbWFyeS02MDApXCIsIFwidmFyKC0tY2xyLWFsbC1wcmltYXJ5LTUwMClcIiwgXG4gICAgICAgICAgICBcInZhcigtLWNsci1MaWdodGNvcmFsKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXJsZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgY3NzZXggPSB7XG4gICAgLyoqXG4gICAgICogQ3NzZXggaXMgYSB3aWRnZXQgaW4gQ1NTIHBhZ2UsIGFwcGx5aW5nIHN0eWxlIGNvbG9ycyB0byBlbGVtZW50cyBvZiBkaWZmZXJlbnRcbiAgICAgKiB0eXBlcyAoYmFzZWQgb24gdGhlIENTUyBwcm9ncmFtbWluZyBsYW5ndWFnZSlcbiAgICAgKi9cbiAgICBDU1NFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlNlbGVjdG9yXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BdHRyaWJ1dGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVmFsdWVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHBzdWVkb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlBzdWVkby1jbGFzc1wiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShzZWxlY3RvcnMsIGF0dHJpYnV0ZXMsIHZhbHVlcywgcHN1ZWRvcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVJlZClcIiwgXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1Ta3libHVlKVwiLCBcInZhcigtLWNsci1HcmVlbilcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNzc2V4O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBSV0JSZWZlcmVuY2VFcnJvciB9IGZyb20gXCIuLi9tb2RlbHMvUldCRXJyb3JCdXNcIjtcblxuY29uc3QgZG9tYWlubG9va3VwID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gR2V0IHRoZSBmb3JtLCBhc3NpZ24gdG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgZm9ybWVsZW1jbGFzc25hbWUgPSAnc2VhcmNoV2hvSVMnO1xuICAgICAgICBsZXQgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgICAgICAgICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2Zvcm1lbGVtY2xhc3NuYW1lfWApIGFzIEhUTUxGb3JtRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGlmIChmb3JtID09IG51bGwpe1xuICAgICAgICAgICAgbmV3IFJXQlJlZmVyZW5jZUVycm9yKFwiRWxlbWVudE5vdEZvdW5kXCIsIGBFbGVtZW50IG5vdCBmb3VuZDogJyR7Zm9ybWVsZW1jbGFzc25hbWV9JzpgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZG9tYWlubG9va3VwLnNlYXJjaFdIT0lTKTtcbiAgICB9LFxuICAgIHNlYXJjaFdIT0lTOiAoKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHh0U2VhcmNoJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbGV0IHZhbHVlID0gaW5wdXRlbGVtLnZhbHVlO1xuICAgICAgICB2YXIgVVJMID0gJ2h0dHBzOi8vd3d3Lndob2lzLmNvbS93aG9pcy8nICsgdmFsdWU7XG4gICAgICAgIHdpbmRvdy5vcGVuKFVSTCwgJ19ibGFuaycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21haW5sb29rdXA7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IGhzbGNvbG9yd2lkZ2V0ID0ge1xuICAgIGluaXRoc2xjb2xvcnBpY2tlcjogKCkgPT4ge1xuICAgICAgICBsZXQgSFNMT05FID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNIU0xDb2xvck9ORVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgbGV0IEhTTFRXTyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUV09cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGxldCBIU0xUSFJFRSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUSFJFRVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgICAgICBjbGFzcyBib3hjb2xvciB7XG4gICAgICAgICAgICBodWUgPSAwO1xuICAgICAgICAgICAgc2F0dXJhdGlvbiA9IDEwMDtcbiAgICAgICAgICAgIGxpZ2h0bmVzcyA9IDUwO1xuICAgICAgICAgICAgY29uc3RydWN0b3IoaHVlID0gMCwgc2F0dXJhdGlvbiA9IDEwMCwgbGlnaHRuZXNzID0gNTApe1xuICAgICAgICAgICAgICAgIGlmKGh1ZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGh1ZSA9PSAxMjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZSA9IDEyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGh1ZSA9PSAyNDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZSA9IDI0MFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaHVlIDwgMCB8fCBodWUgPj0gMzYwIHx8IHNhdHVyYXRpb24gPCAwIHx8IHNhdHVyYXRpb24gPiAxMDAgfHwgbGlnaHRuZXNzIDwgMCB8fCBsaWdodG5lc3MgPiAxMDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gbmV3IFJhbmdlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0hTTCBjb2xvciB2YWx1ZSBvdXQgb2YgYWNjZXB0YWJsZSByYW5nZTpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAgICAgICAgICdjb2xvcjpncmF5O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdyYXk7JywgZXJyLCAnY29sb3I6Z3JheTtmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMubGlnaHRuZXNzID0gbGlnaHRuZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCByZWQgPSAwO1xuICAgICAgICBsZXQgZ3JlZW4gPSAxMjA7XG4gICAgICAgIGxldCBibHVlID0gMjQwO1xuXG4gICAgICAgIGxldCBIU0xCb3hDb2xvclJlZCA9IE9iamVjdC5jcmVhdGUobmV3IGJveGNvbG9yKHJlZCwgMTAwLCA1MCkpO1xuICAgICAgICBsZXQgSFNMQm94Q29sb3JHcmVlbiA9IE9iamVjdC5jcmVhdGUobmV3IGJveGNvbG9yKGdyZWVuLCAxMDAsIDUwKSk7XG4gICAgICAgIGxldCBIU0xCb3hDb2xvckJsdWUgPSBPYmplY3QuY3JlYXRlKG5ldyBib3hjb2xvcihibHVlLCAxMDAsIDUwKSk7XG4gICAgICAgIGxldCB0b3ByZWN0aHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yT05FIHNwYW4udmFsMScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IHRvcHJlY3RzYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JPTkUgc3Bhbi52YWwyJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgdG9wcmVjdGxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yT05FIHNwYW4udmFsMycpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IG1pZHJlY3RodWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUV08gc3Bhbi52YWwxJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgbWlkcmVjdHNhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvclRXTyBzcGFuLnZhbDInKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBtaWRyZWN0bGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUV08gc3Bhbi52YWwzJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgYm90cmVjdGh1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvclRIUkVFIHNwYW4udmFsMScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IGJvdHJlY3RzYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDInKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBib3RyZWN0bGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDMnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRvcHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5odWU7XG4gICAgICAgIHRvcHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9uO1xuICAgICAgICB0b3ByZWN0bGlnaHQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5saWdodG5lc3M7XG4gICAgICAgIG1pZHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckdyZWVuLmh1ZTtcbiAgICAgICAgbWlkcmVjdHNhdC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbjtcbiAgICAgICAgbWlkcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3M7XG4gICAgICAgIGJvdHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUuaHVlO1xuICAgICAgICBib3RyZWN0c2F0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb247XG4gICAgICAgIGJvdHJlY3RsaWdodC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yQmx1ZS5saWdodG5lc3M7XG5cbiAgICAgICAgSFNMT05FLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvclJlZC5odWV9LCAke0hTTEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICBIU0xUV08uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yR3JlZW4uaHVlfSwgJHtIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgIEhTTFRIUkVFLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvckJsdWUuaHVlfSwgJHtIU0xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbn0lLCAke0hTTEJveENvbG9yQmx1ZS5saWdodG5lc3N9JSlgO1xuXG4gICAgICAgIGNvbnN0IEh1ZVNsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjSHVlYCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgY29uc3QgU2F0dXJhdGlvblNsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjU2F0dXJhdGlvbmApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IExpZ2h0bmVzc1NsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjTGlnaHRuZXNzYCkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICBIdWVTbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaHVlaW5wdXR2YWx1ZSA9IEh1ZVNsZHIudmFsdWU7XG4gICAgICAgICAgICBIU0xPTkUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2h1ZWlucHV0dmFsdWV9LCAke0hTTEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVFdPLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtodWVpbnB1dHZhbHVlfSwgJHtIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHVlaW5wdXR2YWx1ZX0sICR7SFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTEJveENvbG9yUmVkLmh1ZSA9IGh1ZWlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckdyZWVuLmh1ZSA9IGh1ZWlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckJsdWUuaHVlID0gaHVlaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIHRvcHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5odWU7XG4gICAgICAgICAgICBtaWRyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5odWU7XG4gICAgICAgICAgICBib3RyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLmh1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBTYXR1cmF0aW9uU2xkci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNhdHVyYXRpb25pbnB1dHZhbHVlID0gU2F0dXJhdGlvblNsZHIudmFsdWU7XG4gICAgICAgICAgICBIU0xPTkUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yUmVkLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVFdPLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvckdyZWVuLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JCbHVlLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTEJveENvbG9yUmVkLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbiA9IHNhdHVyYXRpb25pbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIHRvcHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9uO1xuICAgICAgICAgICAgbWlkcmVjdHNhdC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbjtcbiAgICAgICAgICAgIGJvdHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbjtcbiAgICAgICAgfSlcblxuICAgICAgICBMaWdodG5lc3NTbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGlnaHRpbnB1dHZhbHVlID0gTGlnaHRuZXNzU2xkci52YWx1ZTtcbiAgICAgICAgICAgIEhTTE9ORS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JSZWQuaHVlfSwgJHtIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9ufSUsICR7bGlnaHRpbnB1dHZhbHVlfSUpYDtcbiAgICAgICAgICAgIEhTTFRXTy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JHcmVlbi5odWV9LCAke0hTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbn0lLCAke2xpZ2h0aW5wdXR2YWx1ZX0lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JCbHVlLmh1ZX0sICR7SFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtsaWdodGlucHV0dmFsdWV9JSlgO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JSZWQubGlnaHRuZXNzID0gbGlnaHRpbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3MgPSBsaWdodGlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzID0gbGlnaHRpbnB1dHZhbHVlO1xuICAgICAgICAgICAgdG9wcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQubGlnaHRuZXNzO1xuICAgICAgICAgICAgbWlkcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3M7XG4gICAgICAgICAgICBib3RyZWN0bGlnaHQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHNsY29sb3J3aWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuY29uc3QgbW9iaWxlQWJick1hcmt1cCA9IHtcbiAgICBpbml0OiAoKSA9PntcbiAgICAgICAgLy9iZWdpbiBtb2JpbGUgbWFya3VwXG4gICAgICAgIG1vYmlsZUFiYnJNYXJrdXAubW9iaWxlQWJick1hcmt1cHMoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAgICAgKiBBdHRyaWJ1dGUgdGFncyBvbiBtb2JpbGUgZG8gbm90IGhhdmUgaG92ZXIgb3B0aW9uLiBUaGlzIGZ1bmN0aW9uIGFkZHMgYSBjbGlja1xuICAgICAgICAgKiAgYWJpbGl0eSB0byBkZWZpbmUgYW4gYWJiciB0YWcsIHRoYW4gcmVseSBvbiB0aGUgdGl0bGUgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICBtb2JpbGVBYmJyTWFya3VwczogKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2JpbGVhYmJycGVyZiA9IG5ldyBSV0JQZXJmKFwiTW9iaWxlYWJicnBlcmZcIik7IC8vc3RhcnQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgICAgICAvKipcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzcyBBYmJyT3BlbntcbiAgICAgICAgICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgYWJickVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsYWJicmV2aWF0aW9uZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYWJiclwiKTtcbiAgICAgICAgaWYoYWxsYWJicmV2aWF0aW9uZWxlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBhYmJyIG9mIGFsbGFiYnJldmlhdGlvbmVsZW1zKXtcbiAgICAgICAgICAgICAgICBsZXQgYWJicmV2ID0gbmV3IEFiYnJPcGVuKCk7XG4gICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50ID0gYWJicjtcblxuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJicnRpdGxlYXR0cnZhbDogc3RyaW5nID0gYWJicmV2LmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGFiYnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWJicmV2LmFiYnJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA8IDEpeyAvL2NyZWF0ZSB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9zaG93IHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJicnRpdGxlYXR0cnZhbH0ke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1vYmlsZWFiYnJwZXJmLmVuZCgpIC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBtb2JpbGVBYmJyTWFya3VwO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IHNsaWRlcmJhciA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHZhciBkaXZpc29yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXZpc29yXCIpLCBcbiAgICAgICAgc2xpZGVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgc2xpZGVCYXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcInNsaWRlclwiKTtcbiAgICAgICAgc2xpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiBzbGlkZXJiYXIubW92ZURpdmlzb3JCYXIoZGl2aXNvciwgc2xpZGVCYXIpKTtcbiAgICB9LFxuICAgIG1vdmVEaXZpc29yQmFyOiAoZGl2aXNvcjogSFRNTEVsZW1lbnQsIHNsaWRlQmFyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGRpdmlzb3Iuc3R5bGUud2lkdGggPSBzbGlkZUJhci52YWx1ZSArIFwiJVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyYmFyOyIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5cbi8vIENyZWF0ZSBuZXcgQUEgKEFyYml0cmFyeSBBcnRpY2xlKVxuXG4vKipcbiAqIFwiQXJiaXRyYXJ5IEFydGljbGVzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBBcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRvbWFpbmxvb2t1cFwiLFxuICAgICAgICAxLFxuICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgXCJDaGVjayBhbiBhdmFpbGFibGUgZG9tYWluIHVzaW5nIFdob0lTIEFQSSBzZWFyY2hcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDQpLFxuICAgICAgICBcInBhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dob2lzLndlYnBcIixcbiAgICAgICAgXCJXaG9JcyBMb29rdXBcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICAgICAgMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0bWxyZXNwb25zZXNcIixcbiAgICAgICAgMixcbiAgICAgICAgXCJIVE1MIEZyYW1lc1wiLFxuICAgICAgICBcIlZpZXcgSFRNTCBwYWdlIHJlc3BvbnNlIHN0YXR1cyBpbmZvcm1hdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxuICAgICAgICBcInBhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX0ZyYW1lcy53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb2RlIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29kZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSHR0cHNjZXJ0XCIsXG4gICAgICAgIDQsXG4gICAgICAgIFwiSFRUUFMgQ2VydGlmaWNhdGVcIixcbiAgICAgICAgXCJTZWxlY3QgdG8gdmlldyBhIHdlYnNpdGUncyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHR0cHNfY2VydC53ZWJwXCIsXG4gICAgICAgIFwiQ3Vyc29yIHNlbGVjdGluZyBIVFRQUyBjZXJ0aWZpY2F0ZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzc2wgY2VydGlmaWNhdGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU3NsIGNlcnRpZmljYXRlIGljb25zIGNyZWF0ZWQgYnkgaW5pcGFnaXN0dWRpbyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NzbC1jZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVFRQUyBDZXJ0aWZpY2F0ZVwiLFxuICAgICAgICAgICAgNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYnRlY2hcIixcbiAgICAgICAgNSxcbiAgICAgICAgXCJXYXBwYWx5emVyXCIsXG4gICAgICAgIFwiV2FwcGFseXplciBicm93c2VyIGV4dGVuc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyKSxcbiAgICAgICAgXCJwYWdlcy93ZWJ0ZWNoLmh0bWxcIixcbiAgICAgICAgXCJpbWcvd2FwcGFseXplci1sb2dvLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGV4dGVuc2lvbiBsb2dvLiBBIHdoaXRlIHcgb24gYSBwdXJwbGUgdGlsZS5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJKc29ub2JqZWN0XCIsXG4gICAgICAgIDYsXG4gICAgICAgIFwianNvbk9iamVjdFwiLFxuICAgICAgICBcIkpTT04gb2JqZWN0IG5vdGF0aW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDkpLFxuICAgICAgICBcInBhZ2VzL2pzb25vYmplY3QuaHRtbFwiLFxuICAgICAgICBcImltZy9qc29uLndlYnBcIixcbiAgICAgICAgXCJKU09OIGxvZ286IEEgZ3JleSBjaXJjbGUgd2l0aCBhcnRpc3RpYyBzcGlyYWxzLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldpLUZpXCIsXG4gICAgICAgIDcsXG4gICAgICAgIFwiV2ktRmkgVmVyc2lvblwiLFxuICAgICAgICBcIkRldGVybWluZSBXaWZpIFZlcnNpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMTYpLFxuICAgICAgICBcInBhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBcImltZy93aWZpLndlYnBcIixcbiAgICAgICAgXCJXaS1GaSBsb2dvIHdpdGggYSBibGFjayBjaXJjbGUgYmFja2dyb3VuZC5cIlxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDaGF0Z3B0XCIsXG4gICAgICAgIDgsXG4gICAgICAgIFwiUHJldmlldyBjaGF0R1BUXCIsXG4gICAgICAgIFwiQ2hhdCB3aXRoIGFuIEFJIGZvciByZXNlYXJjaCBhbmQgZGV2ZWxvcG1lbnQuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9jaGF0Z3B0Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvYWkud2VicFwiLFxuICAgICAgICBcIkRlY29yYXRpdmUgQUkgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJhaSBpY29uc1wiLFxuICAgICAgICAgICAgXCJBaSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9haVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgICAgIDhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQYWludDNkXCIsXG4gICAgICAgIDksXG4gICAgICAgIFwiUGFpbnQgM0RcIixcbiAgICAgICAgXCJFZGl0IHBpY3R1cmVzIG9yIHNjcmVlbiBjYXB0dXJlcyB1c2luZyBwYWludCAzRFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAyOCksXG4gICAgICAgIFwicGFnZXMvcGFpbnQzZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Byb3RvdHlwZS53ZWJwXCIsXG4gICAgICAgIFwiQ29sb3JmdWwgcHJvdG90eXBpbmcgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwcm90b3R5cGUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUHJvdG90eXBlIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Byb3RvdHlwZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICAgICAgOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpY3Rpb25hcnlcIixcbiAgICAgICAgMTAsXG4gICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICBcIkxpc3QgZGljdGlvbmFyeSB0ZXJtcyB1c2luZyBhIGRpY3Rpb25hcnkgQVBJXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDMwKSxcbiAgICAgICAgXCJwYWdlcy9kaWN0aW9uYXJ5d29yZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2RpY3Rpb25hcnkud2VicFwiLFxuICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbiBkZXBpY3Rpb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGljdGlvbmFyeSBpY29uc1wiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RpY3Rpb25hcnlcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRGljdGlvbmFyeSBUZXJtc1wiLFxuICAgICAgICAgICAgMTBcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJCb2luY1wiLFxuICAgICAgICAxMSxcbiAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICBcIlBpdm90IHRoZSB1bnVzZWQgY29tcHV0aW5nIHBvdGVudGlhbCBmb3Igc2NpZW5jZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCA2KSxcbiAgICAgICAgXCJwYWdlcy9ib2luYy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2JvaW5jX2dsb3NzeS53ZWJwXCIsXG4gICAgICAgIFwiQk9JTkMgbG9nb1wiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uc1wiLFxuICAgICAgICAgICAgXCJCT0lOQyBpY29uIGRlc2lnbmVkIGJ5IE1pY2hhbCBLcmFrb3dpYWsuIENveXJpZ2h0KEMpIFVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJodHRwczovL2JvaW5jLmJlcmtlbGV5LmVkdVwiLFxuICAgICAgICAgICAgXCJCT0lOQ1wiLFxuICAgICAgICAgICAgXCJDb250cmlidXRlIGZvciBTY2llbmNlIFVuaXRlZFwiLFxuICAgICAgICAgICAgMTFcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJJUEFkZHJlc3NcIixcbiAgICAgICAgMTIsXG4gICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgXCJMb29rdXAgcHVibGljIGFuZCBsb2NhbCBJUCBhZGRyZXNzZXNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMTMpLFxuICAgICAgICBcInBhZ2VzL2lwYWRkcmVzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2lwLndlYnBcIixcbiAgICAgICAgXCJJUCBsb2NhdGlvbiBhbmQgYnJvd3NlciBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIklQIGljb25zXCIsXG4gICAgICAgICAgICBcIklQIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2lwXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIklQIEFkZHJlc3MgTG9va3VwXCIsXG4gICAgICAgICAgICAxMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkhUTUxNYXJrdXBcIixcbiAgICAgICAgMTMsXG4gICAgICAgIFwiSFRNTCBTb3VyY2UgQ29kZVwiLFxuICAgICAgICBcIlJldmVhbCBIVE1MIHNvdXJjZSBjb2RlIGFuZCBKYXZhU2NyaXB0XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDI2KSxcbiAgICAgICAgXCJwYWdlcy9tYXJrdXAuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX3NvdXJjZS53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAxM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIk5ldHdvcmtzcGVlZFwiLFxuICAgICAgICAxNSxcbiAgICAgICAgXCJOZXR3b3JrIFNwZWVkIFRlc3RcIixcbiAgICAgICAgXCJUZXN0IHRoZSBuZXR3b3JrIGFkYXB0ZXJzIHdpdGggYSBQb3dlclNoZWxsIHNjcmlwdFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCA3KSxcbiAgICAgICAgXCJwYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBcImltZy9wYWdlLXNwZWVkLndlYnBcIixcbiAgICAgICAgXCJTcGVlZCB0ZXN0IGRpYWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJwYWdlIHNwZWVkIGljb25zXCIsXG4gICAgICAgICAgICBcIlBhZ2Ugc3BlZWQgaWNvbnMgY3JlYXRlZCBieSBQcm9zeW1ib2xzIFByZW1pdW0gLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9wYWdlLXNwZWVkXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIk5ldHdvcmsgU3BlZWRcIixcbiAgICAgICAgICAgIDE1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUG93ZXJTaGVsbGRyaXZlc1wiLFxuICAgICAgICAxNyxcbiAgICAgICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgICAgICBcIlNpbWlsYXIgdG8gYW4gSERELCBleGNlcHQgaXQgaXMgb25seSBpbiBQb3dlclNoZWxsXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIwKSxcbiAgICAgICAgXCJwYWdlcy9kcml2ZXMuaHRtbFwiLFxuICAgICAgICBcImltZy90ZXJtaW5hbC53ZWJwXCIsXG4gICAgICAgIFwiQ29tcHV0ZXIgdGVybWluYWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0ZXJtaW5hbCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUZXJtaW5hbCBpY29ucyBjcmVhdGVkIGJ5IEZsYXQgSWNvbnMgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90ZXJtaW5hbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJQb3dlclNoZWxsIERyaXZlc1wiLFxuICAgICAgICAgICAgMTdcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fRE5TXCIsXG4gICAgICAgIDIwLFxuICAgICAgICBcIkhvdyBETlMgd29ya3NcIixcbiAgICAgICAgXCJBIGdlbmVyYWwgb3ZlcnZpZXcgb2YgRG9tYWluIE5hbWUgU3lzdGVtXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDQpLFxuICAgICAgICBcInBhZ2VzL2Rucy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Rucy53ZWJwXCIsXG4gICAgICAgIFwiRE5TIGRyYXdpbmcgYXR0YWNoZWQgdG8gYSBrZXlib2FyZFwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkbnMgaWNvbnNcIixcbiAgICAgICAgICAgIFwiRG5zIGljb25zIGNyZWF0ZWQgYnkga2VyaXNtYWtlciAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Ruc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogRE5TXCIsXG4gICAgICAgICAgICAyMFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19Hb29nbGVcIixcbiAgICAgICAgMjIsXG4gICAgICAgIFwiR29vZ2xlIGlzICMxIHdlYnNpdGVcIixcbiAgICAgICAgXCJHb29nbGUgaXMgdGhlICMxIHRyYWZmaWNrZWQgc2l0ZVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxNyksXG4gICAgICAgIFwicGFnZXMvZ29vZ2xlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VhcmNoLWVuZ2luZS53ZWJwXCIsXG4gICAgICAgIFwiQSBiYXIgZ3JhcGggaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJyYW5rIGljb25zXCIsXG4gICAgICAgICAgICBcIlJhbmsgaWNvbnMgY3JlYXRlZCBieSBQaXhlbG1lZXR1cCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3JhbmtcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTEVBUk46IEdvb2dsZVwiLFxuICAgICAgICAgICAgMjJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgMjMsXG4gICAgICAgIFwiRE9NXCIsXG4gICAgICAgIFwiUmV2aWV3IHRoZSBET00gd2l0aCBhIERPTSB0cmVlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDI3KSxcbiAgICAgICAgXCJwYWdlcy9kb20uaHRtbFwiLFxuICAgICAgICBcImltZy90cmVlLndlYnBcIixcbiAgICAgICAgXCJBIHRyZWUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0cmVlIGljb25zXCIsXG4gICAgICAgICAgICBcIlRyZWUgaWNvbnMgY3JlYXRlZCBieSBqdXN0aWNvbiAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RyZWVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRE9NXCIsXG4gICAgICAgICAgICAyM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYmlkZVwiLFxuICAgICAgICAyNCxcbiAgICAgICAgXCJXZWJJREVcIixcbiAgICAgICAgXCJUcnkgc2tpcHBpbmcgdGhlIGRvd25sb2FkIHdpdGggYSB3ZWIgSURFXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDMpLFxuICAgICAgICBcInBhZ2VzL3dlYmlkZXMuaHRtbFwiLFxuICAgICAgICBcImltZy91eC53ZWJwXCIsXG4gICAgICAgIFwiQSBjb21wdXRlciBhcHBsaWNhdGlvbiBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRlc2lnbiBpY29uc1wiLFxuICAgICAgICAgICAgXCJEZXNpZ24gaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGVzaWduXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIndlYmlkZXNcIixcbiAgICAgICAgICAgIDI0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIDI1LFxuICAgICAgICBcIlNWR1wiLFxuICAgICAgICBcIkZpbmQgYW4gU1ZHIGFuZCBsZWFybiBhYm91dCB0aGUgU1ZHIGxhbmd1YWdlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDUsIDkpLFxuICAgICAgICBcInBhZ2VzL3N2Zy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3N2Zy5zdmdcIixcbiAgICAgICAgXCJBbiBzdmcgaWNvbiBleGFtcGxlLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzY2FsYWJsZSB2ZWN0b3IgZ3JhcGhpY3NcIixcbiAgICAgICAgICAgIFwiU1ZHIGljb24gY3JlYXRlZCBieSBIYXJ2ZXkgUmF5bmVyXCIsXG4gICAgICAgICAgICBcImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy9cIixcbiAgICAgICAgICAgIFwiVzNDXCIsXG4gICAgICAgICAgICBcInN2Z1wiLFxuICAgICAgICAgICAgMjVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEaXNhYmxlX0phdmFzY3JpcHRcIixcbiAgICAgICAgMjYsXG4gICAgICAgIFwiRGlzYWJsZSBKYXZhU2NyaXB0XCIsXG4gICAgICAgIFwiRGlzYWJsZSB0aGUgSmF2YVNjcmlwdCB0byB0ZXN0IHdlYnNpdGUgZnVuY3Rpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjIpLFxuICAgICAgICBcInBhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgICAgICBcImltZy9zb2Z0d2FyZS1hcHBsaWNhdGlvbi53ZWJwXCIsXG4gICAgICAgIFwiQSBqYXZhc2NyaXB0IGZ1bmN0aW9uIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIndlYiBjb2RpbmcgaWNvbnNcIixcbiAgICAgICAgICAgIFwiV2ViIGNvZGluZyBpY29ucyBjcmVhdGVkIGJ5IE11aGFtbWFkIEF0aWYgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy93ZWItY29kaW5nXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0hUVFBcIixcbiAgICAgICAgMjgsXG4gICAgICAgIFwiSFRUUFwiLFxuICAgICAgICBcIkhUVFAgbWFrZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nIHdlYiBwYWdlcyBwb3NzaWJsZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTIpLFxuICAgICAgICBcInBhZ2VzL2h0dHAuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwLndlYnBcIixcbiAgICAgICAgXCJIdHRwIHZlcmIgaW4gZnJvbnQgb2YgYSBnbG9iZSBpY29uLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodHRwIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0dHAgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHR0cFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogSFRUUFwiLFxuICAgICAgICAgICAgMjhcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJDU1NkZWZcIixcbiAgICAgICAgMjksXG4gICAgICAgIFwiQ1NTXCIsXG4gICAgICAgIFwiQ1NTIHN0eWxlcyB0aGUgZWxlbWVudHMgd2l0aGluIGEgcGFnZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNiwgMTkpLFxuICAgICAgICBcInBhZ2VzL2Nzcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nzcy0zLndlYnBcIixcbiAgICAgICAgXCJBIENTUyB0aHJlZSBsb2dvLlwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjc3MgaWNvbnNcIixcbiAgICAgICAgICAgIFwiQ3NzIGljb25zIGNyZWF0ZWQgYnkgUGl4ZWwgcGVyZmVjdCAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2Nzc1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDU1NcIixcbiAgICAgICAgICAgIDI5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAzMixcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIFwiVHJhdmVsIGxhdGVuY3kgY2FuIHNsb3cgZG93biBhIHdlYnNpdGUuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDE4KSxcbiAgICAgICAgXCJwYWdlcy9sYXRlbmN5Lmh0bWxcIixcbiAgICAgICAgXCJpbWcvY2hyb25vbWV0ZXIud2VicFwiLFxuICAgICAgICBcIkEgc3RvcHdhdGNoIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRpbWVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlRpbWVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3RpbWVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgICAgIDMyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTGRlZlwiLFxuICAgICAgICAzMyxcbiAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGFuIEhUTUwgZWxlbWVudFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyNSksXG4gICAgICAgIFwicGFnZXMvaHRtbC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0bWwud2VicFwiLFxuICAgICAgICBcIkhUTUwgZWxlbWVudCBzeW50YXggaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJodG1sIGljb25zXCIsXG4gICAgICAgICAgICBcIkh0bWwgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaHRtbFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJVUkxcIixcbiAgICAgICAgMzQsXG4gICAgICAgIFwiVVJMIEFkZHJlc3MgRXhhbXBsZXNcIixcbiAgICAgICAgXCJMZWFybiB0aGUgcGFydHMgYW5kIHN5bnRheCBvZiBhIFVSTFwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA4LCA3KSxcbiAgICAgICAgXCJwYWdlcy91cmwuaHRtbFwiLFxuICAgICAgICBcImltZy93d3cud2VicFwiLFxuICAgICAgICBcIlVSTCBleGFtcGxlIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidXJsIGljb25zXCIsXG4gICAgICAgICAgICBcIlVybCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy91cmxcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiQ3JlYXRlIEhUTUwgZWxlbWVudHNcIixcbiAgICAgICAgICAgIDM0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGF0YVN0b3JhZ2VcIixcbiAgICAgICAgMzUsXG4gICAgICAgIFwiRGF0YSBTdG9yYWdlXCIsXG4gICAgICAgIFwiTG9jYWwgc3RvcmFnZSBzYXZlcyBkYXRhIHdoZW4gbmVlZGVkIGZvciBjb25jdXJyZW50IHBhZ2Ugc3VyZmluZy5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgOCwgMTQpLFxuICAgICAgICBcInBhZ2VzL2RhdGFzdG9yYWdlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc2VydmVyLndlYnBcIixcbiAgICAgICAgXCJEYXRhIHN0b3JhZ2UgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgICAgICAgIDM1XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFNMXCIsXG4gICAgICAgIDM2LFxuICAgICAgICBcIkh1ZSwgU2F0dXJhdGlvbiwgYW5kIExpZ2h0bmVzc1wiLFxuICAgICAgICBcIkhTTCBjb2xvcnMgbWFuaXB1bGF0ZSBodWVzLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA5LCA2KSxcbiAgICAgICAgXCJwYWdlcy9oc2wuaHRtbFwiLFxuICAgICAgICBcImltZy9jb2xvci13aGVlbC53ZWJwXCIsXG4gICAgICAgIFwiQ29sb3Igd2hlZWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ2YXJpZXR5IGljb25zXCIsXG4gICAgICAgICAgICBcIlZhcmlldHkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdmFyaWV0eVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIdWUsIFNhdHVyYXRpb24sIGFuZCBMaWdodG5lc3NcIixcbiAgICAgICAgICAgIDM2XG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBcIkd1aWRlIFNob3J0cycgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgR3VpZGVTaG9ydHMgPSBuZXcgQXJyYXkoXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTZWFyY2h2ZXJ0aWNhbHNcIixcbiAgICAgICAgMTQsXG4gICAgICAgIFwiR1VJREU6IFNlYXJjaCBWZXJ0aWNhbHNcIixcbiAgICAgICAgXCJPcHRpbWl6ZSB5b3VyIHNlYXJjaCBlbmdpbmUgbmV3cyBhbmQgcmVzdWx0c1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAyNiksXG4gICAgICAgIFwiZ3VpZGVzL3NlYXJjaHZlcnRpY2Fscy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NlYXJjaF9zZXR0aW5ncy53ZWJwXCIsXG4gICAgICAgIFwiU2VhcmNoIHNldHRpbmdzIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29udGVudCB3cml0aW5nIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvbnRlbnQgd3JpdGluZyBpY29ucyBjcmVhdGVkIGJ5IFZlY3RvcnMgVGFuayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2NvbnRlbnQtd3JpdGluZ1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgICAgICAxNFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlNNVFBcIixcbiAgICAgICAgMTYsXG4gICAgICAgIFwiR1VJREU6IFNNVFAgYW5kIEVtYWlsXCIsXG4gICAgICAgIFwiTGVhcm4gRW1haWwgcHJvdG9jb2xzIGFuZCBwb3J0IG51bWJlcnNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMTMpLFxuICAgICAgICBcImd1aWRlcy9zbXRwLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY29tbXVuaWNhdGlvbnMud2VicFwiLFxuICAgICAgICBcIkVtYWlsIHNlcnZlci1zdGFjayB3aXRoIG1haWwgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJzZXJ2ZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiU2VydmVyIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3NlcnZlclwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICAgICAgMTZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZ0b29sc1wiLFxuICAgICAgICAxOSxcbiAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgIFwiUmV2aWV3IGRldiB0b29sJ3MgYXBwbGljYXRpb24gdGFiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDI3KSxcbiAgICAgICAgXCJndWlkZXMvYXBwbGljYXRpb250YWIuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveC53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ0b29sYm94IGljb25zXCIsXG4gICAgICAgICAgICBcIlRvb2xib3ggaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdG9vbGJveFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJHVUlERTogRGV2IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAxOVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRldnRvb2xzdHdvXCIsXG4gICAgICAgIDIxLFxuICAgICAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgIFwiT3BlbiB0aGUgZGV2ZWxvcGVyJ3MgdG9vbGJveCBhbm90aGVyIHdheVwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA0LCAxMCksXG4gICAgICAgIFwiZ3VpZGVzL2luc3BlY3RwYWdlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rvb2wtYm94Mi53ZWJwXCIsXG4gICAgICAgIFwiRGV2ZWxvcGVyJ3MgdG9vbCBraXQgaWNvbiB0d29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IEluc3BlY3QgUGFnZXNcIixcbiAgICAgICAgICAgIDIxXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiUFdBSWNvblwiLFxuICAgICAgICAyNyxcbiAgICAgICAgXCJHVUlERTogSW5zdGFsbCB0aGUgUFdBIGFwcGxpY2F0aW9uc1wiLFxuICAgICAgICBcIlByb2dyZXNzaXZlIHdlYnNpdGVzIGhhdmUgYW4gaW5zdGFsbGF0aW9uIG9wdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL3B3YWljb24uaHRtbFwiLFxuICAgICAgICBcImltZy9hcHAtZGV2ZWxvcG1lbnQud2VicFwiLFxuICAgICAgICBcIkFwcCBkZXZlbG9wbWVudCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRldmVsb3BtZW50IGljb25zXCIsXG4gICAgICAgICAgICBcIkRldmVsb3BtZW50IGljb25zIGNyZWF0ZWQgYnkgRGVzaWduIENpcmNsZSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2RldmVsb3BtZW50XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIDI3XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiQ2xlYXJjb29raWVzXCIsXG4gICAgICAgIDMwLFxuICAgICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgICAgXCJEb24ndCB3YXN0ZSB0aW1lIHNpZnRpbmcgdGhyb3VnaCBzZXR0aW5nc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA3LCAyKSxcbiAgICAgICAgXCJndWlkZXMvY2xlYXJjb29raWVzcXVpY2tseS5odG1sXCIsXG4gICAgICAgIFwiaW1nL2Nvb2tpZXMud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgY29va2llIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiY29va2llIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvb2tpZSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb29raWVcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IENsZWFyIGNvb2tpZXMgcXVpY2tseVwiLFxuICAgICAgICAgICAgMzBcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiRXhwbG9yZSBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBFeHBsb3JlID0gbmV3IEFycmF5KFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmFzYVwiLFxuICAgICAgICAzLFxuICAgICAgICBcIkVYUExPUkU6IE5BU0EgUGFnZXNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSBOQVNBIGRvbWFpbi4gTGVhcm4gYWJvdXQgdGhlIHVuaXZlcnNlIHZpYSBOQVNBIGxpbmtzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjIsIDEyLCAxOCksXG4gICAgICAgIFwiZXhwbG9yZS9uYXNhLmh0bWxcIixcbiAgICAgICAgXCJpbWcvTkFTQS53ZWJwXCIsXG4gICAgICAgIFwiTkFTQSBBcnRlbWlzIExvZ29cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiTkFTQVwiLFxuICAgICAgICAgICAgXCJJbWFnZSBzb3VyY2UgdmlhIHRoZSBOYXRpb25hbCBBZXJvbmF1dGljcyBhbmQgU3BhY2UgQWRtaW5pc3RyYXRpb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cubmFzYS5nb3YvYXVkaWVuY2UvZm9yc3R1ZGVudHMvNS04L2ZlYXR1cmVzL3N5bWJvbHMtb2YtbmFzYS5odG1sXCIsXG4gICAgICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgICAgIFwiTkFTQSBQYWdlc1wiLFxuICAgICAgICAgICAgM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlZpcnR1YWx0b3VyXCIsXG4gICAgICAgIDE4LFxuICAgICAgICBcIkVYUExPUkU6IFZpcnR1YWwgVG91cnNcIixcbiAgICAgICAgXCJFeHBsb3JlIHRoZSByZWFsIHdvcmxkIGluIGEgd2ViIGJyb3dzZXJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjMpLFxuICAgICAgICBcImV4cGxvcmUvdmlydHVhbHRvdXIuaHRtbFwiLFxuICAgICAgICBcImltZy9nb29nbGUtZXhwZWRpdGlvbnMud2VicFwiLFxuICAgICAgICBcIkdvb2dsZSBFeHBlZGl0aW9ucyBsb2dvIGZyb20gRkxBVElDT05cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZ29vZ2xlIGV4cGVkaXRpb25zIGljb25zXCIsXG4gICAgICAgICAgICBcIkdvb2dsZSBleHBlZGl0aW9ucyBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9nb29nbGUtZXhwZWRpdGlvbnNcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiVmlydHVhbCBUb3VyXCIsXG4gICAgICAgICAgICAxOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIldlYmJcIixcbiAgICAgICAgMzEsXG4gICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGVcIixcbiAgICAgICAgXCJcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMyksXG4gICAgICAgIFwiZXhwbG9yZS93ZWJidGVsZXNjb3BlLmh0bWxcIixcbiAgICAgICAgXCJpbWcvSldTVF9wb3N0ZXIud2VicFwiLFxuICAgICAgICBcIkphbWVzIFdlYmIgc3BhY2UgdGVsZXNjb3BlIHBvc3RlciBpbWFnZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJIZXhhZ29uIExpdGhvICgyMDE4KVwiLFxuICAgICAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uIHByb3ZpZGVkIGJ5IG5hc2EuZ292XCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vandzdC5uYXNhLmdvdi9jb250ZW50L2ZlYXR1cmVzL2VkdWNhdGlvbmFsL3ByaW50Lmh0bWxcIixcbiAgICAgICAgICAgIFwiandzdC5uYXNhLmdvdlwiLFxuICAgICAgICAgICAgXCJKYW1lcyBXZWJiIFNwYWNlIFRlbGVzY29wZSBpY29uXCIsXG4gICAgICAgICAgICAzMVxuICAgICAgICApXG4gICAgKSxcbik7XG5cbi8qKlxuICogTXVsdGlkaW1lbnNpb25hbCBhcnJheS4gUm93cyBhcmUgdGhlIGRpZmZlcmVudCBzZWN0aW9ucy4gQ29sdW1uc1xuICogY29udGFpbiBlYWNoIGFydGljbGUncyBkYXRhIGJlbG9uZ2luZyBpbiB0aGF0IHNlY3Rpb24uXG4gKi9cbmNvbnN0IFdFQkJJVERBVEEgPSBbQXJiaXRyYXJ5QXJ0aWNsZXMsIEd1aWRlU2hvcnRzLCBFeHBsb3JlXVxuZXhwb3J0IGRlZmF1bHQgV0VCQklUREFUQTtcbiIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCTGluayBmcm9tICcuLi9tb2RlbHMvUldCTGluayc7XG5cbi8qKlxuICogSGVhZGVyIG5hdmlnYXRpb24gbGluayBkYXRhXG4gKi9cbmNvbnN0IGhvbWVOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJJbmRleFwiLFxuICAgIFwiSG9tZVwiLFxuICAgIFwiSG9tZVwiLFxuICAgIFwiaW5kZXguaHRtbFwiXG4pO1xuXG5jb25zdCBwYWdlc05hdkxpbmsgPSBuZXcgUldCTGluayhcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcInBhZ2VzLmh0bWxcIlxuKTtcblxuY29uc3QgZ2FtZU5hdkxpbmsgPSBuZXcgUldCTGluayhcbiAgICBcIkdhbWVcIixcbiAgICBcIkZsYXNoQ2FyZHNcIixcbiAgICBcIkdhbWVcIixcbiAgICBcImZsYXNoY2FyZHMuaHRtbFwiXG4pO1xuXG4vKiogTmF2aWdhdGlvbiBsaW5rcyAqL1xuY29uc3QgTkFWSVRFTVMgPSBbaG9tZU5hdkxpbmssIHBhZ2VzTmF2TGluaywgZ2FtZU5hdkxpbmtdO1xuZXhwb3J0IGRlZmF1bHQgTkFWSVRFTVM7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuY29uc3QgcG9ydGRlZmluaXRpb25zID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgIFsyMiwgXCJTZWN1cmUgU1NIICAvVENQXCJdLFxuICAgIFsyMywgXCJUZWxuZXQgKHVuc2VjdXJlKVwiXSxcbiAgICBbMjUsIFwiU01UUCAtIDQ2NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbNDksIFwiVEFDQUNTK1wiXSxcbiAgICBbNTMsIFwiRE5TICAvVURQL1RDUFwiXSxcbiAgICBbNjcsIFwiREhDUFwiXSxcbiAgICBbNjgsIFwiREhDUFwiXSxcbiAgICBbODAsIFwiSFRUUCAgL1RDUFwiXSxcbiAgICBbODgsIFwiS2VyYmVyb3Mtc2VjICAvVENQL1VEUFwiXSxcbiAgICBbMTEwLCBcIlBPUCAtIDk5NSBmb3IgZW5jcnlwdGVkLlwiXSxcbiAgICBbMTM1LCBcIlJQQ1wiXSxcbiAgICBbMTM3LCBcIk5FVEJJT1NcIl0sXG4gICAgWzEzOCwgXCJORVRCSU9TXCJdLFxuICAgIFsxMzksIFwiTkVUQklPU1wiXSxcbiAgICBbMTQzLCBcIklNQVAgLSA5OTMgZm9yIGVuY3J5cHRlZFwiXSxcbiAgICBbMTYxLCBcIlNOTVAgIE1hbmFnZXJcIl0sXG4gICAgWzE2MiwgXCJTTk1QICBBZ2VudFwiXSxcbiAgICBbMzg5LCBcIkxEQVAgLSA2MzYgZm9yIHNlY3VyZVwiXSxcbiAgICBbNDQzLCBcIkhUVFBTICAvVENQXCJdLFxuICAgIFs0NDUsIFwiU01CICAvVENQXCJdLFxuICAgIFs0NjUsIFwiU01UUCBieSBUTFNcIl0sXG4gICAgWzUxNCwgXCJTWVNMT0cgIC9VRFBcIl0sXG4gICAgWzU4NywgXCJTTVRQUyBTVEFSVFRMU1wiXSxcbiAgICBbNjM2LCBcIkxEQVAgU1NMXCJdLFxuICAgIFs5OTAsIFwiRlRQU1wiXSxcbiAgICBbOTkzLCBcIklNQVAgVExTXCJdLFxuICAgIFs5OTUsIFwiUE9QIFRMU1wiXSxcbiAgICBbMTgxMiwgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgIFsxODEzLCBcIlJBRElVUyAgL1RDUC9VRFBcIl0sXG4gICAgWzMyNjksIFwiTWljcm9zb2Z0IEdsb2JhbCBDYXRhbG9nXCJdLFxuICAgIFszMzg5LCBcIlJEUFwiXSxcbl0pO1xuZXhwb3J0IGRlZmF1bHQgcG9ydGRlZmluaXRpb25zO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBIZWFkZXJGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlckZvb3Rlcic7XG5pbXBvcnQgUGFnZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzJztcbmltcG9ydCBDbGFzc0NvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL0NsYXNzQ29tcG9uZW50cyc7XG5pbXBvcnQgbW9iaWxlQWJick1hcmt1cCBmcm9tICcuL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwJ1xuaW1wb3J0IFJXQlBlcmYgZnJvbSAnLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuXG5jb25zdCBtYWlucGVyZiA9IG5ldyBSV0JQZXJmKFwibWFpblwiKTtcblxuLy8gZW50cnkgcG9pbnRcbi8qKlxuICogVHlwZVNjcmlwdCBlbnRyeSBwb2ludC4gVGhpcyBzY3JpcHQgaW5pdGlhbGl6ZXMgcGFnZSBjb21wb25lbnRzIGFuZCBtb2RlbHMgYXNcbiAqICB0aGV5J3JlIG5lZWRlZCBtYWluLmluaXQoKSBpcyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgXCJ0eXBlc2NyaXB0LmpzXCIuXG4gKi9cbmNvbnN0IG1haW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBwYWdlIHdpZGdldHMgYW5kIGFwcGxpY2F0aW9uIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBFdmVudCBmaXJlZCBiZWZvcmUgYXNzZXRzIGFyZSByZW5kZXJlZCB0byB0aGUgcGFnZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBBZGQgaGVhZGVyIGFuZCBmb290ZXIgY29tcG9uZW50c1xuICAgICAgICAgICAgSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5pbml0KCk7XG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIFBhZ2VDb21wb25lbnRzLmluaXQoKTtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBlbGVtZW50IGNvbXBvbmVudHNcbiAgICAgICAgICAgIENsYXNzQ29tcG9uZW50cy5pbml0KCk7XG5cbiAgICAgICAgICAgIC8vIDxhYmJyPjwvYWJicj4gc3R5bGVzOiBpbXBsZW1lbnRlZCBmb3IgbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIG1vYmlsZUFiYnJNYXJrdXAuaW5pdCgpO1xuXG4gICAgICAgICAgICBtYWlucGVyZi5lbmQoKTtcbiAgICAgICAgfSlcbiAgICB9ICAgIFxufTtcblxubWFpbi5pbml0KCk7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBhcGlHRVQgaXMgZm9yIGZldGNoIHJlcXVlc3RzLiBVc2UgYW4gYXBpR0VUIG9iamVjdCB0byBtYW5pcHVsYXRlIHRoZSBmZXRjaFxuICogIHJlcXVlc3QgaW50byBlaXRoZXI6XG4gKlxuICogMS4gcmV0dXJuaW5nIGRhdGFcbiAqXG4gKiAtLW9yIC0tXG4gKlxuICogMi4gc3RvcmluZyB0aGUgcmVxdWVzdCBpbiB0aGUgYnJvd3NlciBjYWNoZSB0byByZXRyaWV2ZSBsYXRlclxuICovXG5leHBvcnQgY2xhc3MgYXBpR0VUIHtcbiAgcHVibGljIGVycm9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgR0VUVVJMOiBVUkw7XG4gIHByaXZhdGUgc2VuZFRvQnJvd3NlckNhY2hlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYnJvd3NlckNhY2hlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJlY2VpdmVkRGF0YTogYW55OyAvL1RPRE86IGNoZWNrIGlmIHRoaXMgaXMgbmVlZGVkXG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBHRVRVUkw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGVcbiAgICovXG4gIHB1YmxpYyBnZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuR0VUVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0R0VUVVJMKCkge1xuICAgIHJldHVybiB0aGlzLkdFVFVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2ggcmVxdWVzdCBjYW4gdGFrZSBVUkwgb3Igc3RyaW5nIHBhcmFtZXRlci4gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBhcGlHRVRcbiAgICogIG9iamVjdCBmb3IgYSBVUkwgZmV0Y2ggYnkgY3JlYXRpbmcgYSBVUkwgZnJvbSB0aGUgc3RyaW5nLCBvciBwYXNzaW5nIHRoZSBVUkwuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqL1xuICBwdWJsaWMgc2V0R0VUVVJMKEdFVFVSTDogVVJMIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBHRVRVUkwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gbmV3IFVSTChHRVRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkdFVFVSTCA9IEdFVFVSTDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgcHVibGljIGZ1bmN0aW9uIGNyZWF0aW5nIGEgZGF0YSBwcm9taXNlIG9iamVjdCBmb3IgdGhlIGNhbGxlZCBmZXRjaCBmdW5jdGlvbi4gSWZcbiAgICogIHRoZSByZXF1ZXN0IG5lZWRzIGFkZGVkIHRvIGJyb3dzZXIgc3RvcmFnZSwgdGhlIGZldGNoIGlzIG1hZGUgYW5kIHNlbnQgdG9cbiAgICogIHN0b3JhZ2UuIEEgY2xvbmVkIGNvcHkgb2YgdGhlIGZldGNoZWQgZGF0YSBpcyByZXR1cm5lZCBhbmQgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXNcbiAgICogIHNlbnQgdG8gdGhlIGNhY2hlLiBXaXRob3V0IHNlbmRpbmcgdG8gYnJvd3NlciBjYWNoZSwgdGhlIGZldGNoIGlzIHJlcXVlc3RlZCBhbmQgXG4gICAqIHJldHVybmVkLlxuICAgKiAgXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGFDYWNoZVByb21pc2U6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBhcGlHRVQoR0VUVVJMOiBVUkwpIHtcbiAgICAvL0NoZWNrIGlmIHRoZSByZXF1ZXN0IGlzIGZvciBjYWNoZSBzdG9yYWdlXG4gICAgaWYgKHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlKSB7XG4gICAgICAvL1RoZSByZXR1cm5lZCBkYXRhIGlzIHBhY2thZ2VzIGFzIGEgUHJvbWlzZSBvYmplY3RcbiAgICAgIGxldCBkYXRhQ2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAvL09wZW4gY2FjaGUgYW5kIGNoZWNrIGZvciByZXF1ZXN0IGV4aXN0aW5nIGluIENhY2hlIFN0b3JhZ2VcbiAgICAgICAgICB3aW5kb3cuY2FjaGVzLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKS50aGVuKChjYWNoZSkgPT4ge1xuICAgICAgICAgICAgY2FjaGVzLm1hdGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vTm8gbWF0Y2hlcyBmb3IgdGhpcyByZXF1ZXN0IGluIFN0b3JhZ2UgQ2FjaGUsIHNvIGZldGNoIHRoZSByZXF1ZXN0IG5vcm1hbGx5XG4gICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgIGZldGNoKEdFVFVSTCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAvL0NvcHkgdGhlIHJlc3BvbnNlIHNpbmNlIGl0IGNhbiBvbmx5IGJlIHJlYWQgb25jZVxuICAgICAgICAgICAgICAgICAgbGV0IGNsb25lZHJlc3AgPSByZXN1bHQuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgIGlmIChjbG9uZWRyZXNwLnN0YXR1cyAhPSA0MDQpe1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5wdXQoR0VUVVJMLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRyZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0Lmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlID0+IHsvL0Nhbm5vdCBvcGVuIFN0b3JhZ2UgQ2FjaGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHsvL0F0dGVtcHQgcmF3IGZldGNoXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKEdFVFVSTCkpO1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlByb21pc2UgZXJyb3Igb24gZGF0YSBmZXRjaC5cIikpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy9UaGUgcHJvbWlzZSBoYXMgcmVzb2x2ZWQgLS0+IHJldHVybiB0aGUgcHJvbWlzZSBkYXRhXG4gICAgICBkYXRhQ2FjaGVQcm9taXNlLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSk7XG4gICAgICB9KTtcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSByZXF1ZXN0ZWQgcmVzcG9uc2UgaXMgb2YgdmFsaWQgc3RhdHVzICdPSycgYW5kICcyMDAnXG4gICAqIEBwYXJhbSByZXMgLSB0aGUgZmV0Y2hlZCByZXNwb25zZS5cbiAgICogQHJldHVybnMgLSByZXR1cm5zIHJlcy5qc29uKCkgb24gc3VjY2VzcyBvciByZXR1cm5zIHJlc3BvbnNlIG9uIGZhaWx1cmUuXG4gICAqL1xuICBwcml2YXRlIGFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT0gNDA0KSB7XG4gICAgICB0aGlzLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIjQwNCBmZXRjaCBlcnJvciFcIjtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICghcmVzLm9rIHx8IHJlcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLm9rICsgXCI6IFwiICsgcmVzLnN0YXR1cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZldGNoIHJlcXVlc3QsIHJldHVybmluZyBhIGZldGNoIHByb21pc2UuXG4gICAqIEBwYXJhbSBHRVRVUkwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIGRhdGEudGV4dCgpIG9yIGRhdGEgYmFzZWQgb24gdGhlIGluc3RhbmNlIHJldHVybmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERhdGEoR0VUVVJMOiBVUkwpIHtcbiAgICByZXR1cm4gZmV0Y2goR0VUVVJMKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEudGV4dCgpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfVxuXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBSV0JMaW5rIGZyb20gXCIuL1JXQkxpbmtcIjtcblxuLyoqIFxuICogVXNlZCBmb3IgaW1hZ2UgQXR0cmlidXRpb25cbiovXG5jbGFzcyBBdHRyaWJ1dGlvbkxpbmsgZXh0ZW5kcyBSV0JMaW5rIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqTmFtZSBvZiB0aGUgb3duZXIgKi9cbiAgICBwdWJsaWMgYXR0cmlidXRlZG93bmVyOiBzdHJpbmc7XG4gICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICBwdWJsaWMgYXJ0aWNsZWlkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLyoqTGluayB0aXRsZSAqL1xuICAgICAgICB0aXRsZTogc3RyaW5nLFxuICAgICAgICAvKipMaW5rIGlubmVyIHRleHQgKi9cbiAgICAgICAgaW5uZXJUZXh0OiBzdHJpbmcsXG4gICAgICAgIC8qKiBsaW5rIGhyZWYgKi9cbiAgICAgICAgaFJlZmVyZW5jZTogc3RyaW5nLFxuICAgICAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgICAgICBhdHRyaWJ1dGVkb3duZXI6IHN0cmluZyxcbiAgICAgICAgLyoqV2ViQml0cyBwYWdlICovXG4gICAgICAgIHBhZ2VOYW1lOiBzdHJpbmcsXG4gICAgICAgIC8qKldlYkJpdHMgYXJ0aWNsZSBkYXRhIElEICovXG4gICAgICAgIGFydGljbGVpZDogbnVtYmVyXG5cbiAgICApIHtcbiAgICAgICAgc3VwZXIodGl0bGUsIGlubmVyVGV4dCwgcGFnZU5hbWUsIGhSZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZWRvd25lciA9IGF0dHJpYnV0ZWRvd25lcjtcbiAgICAgICAgdGhpcy5hcnRpY2xlaWQgPSBhcnRpY2xlaWQ7XG4gICAgICAgIEF0dHJpYnV0aW9uTGluay5jb3VudCsrO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRpb25MaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yQ29kZSB7XG4gICAgZWxlbXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W107XG4gICAgY29sb3I6IHN0cmluZ1tdO1xuICAgIHJlc2V0YnRuOiBFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yIChjb2xvcmxlc3NlbGVtZW50czogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5bXSwgY29sb3JzOiBzdHJpbmdbXSwgcmVzZXRidG46IEVsZW1lbnQpe1xuICAgICAgICB0aGlzLmVsZW1zID0gY29sb3JsZXNzZWxlbWVudHM7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcnM7XG4gICAgICAgIHRoaXMucmVzZXRidG4gPSByZXNldGJ0bjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuY3NzRXhhbXBsZUhpZ2hsaWdodGluZyh0aGlzLmVsZW1zW2ldLCB0aGlzLmNvbG9yW2ldKTtcbiAgICAgICAgICAgIHRoaXMuY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KHRoaXMuZWxlbXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY29sb3IgdGhlIGV4YW1wbGUgYXJlYSdzIGVsZW1lbnRzIHVzaW5nIGNzc1xuICAgICAqIEBwYXJhbSBlbGVtc2xpc3QgLSBOb2RlIGxpc3Qgb2YgSFRNTEVsZWxlbWVudHMuIEkuRS4gdXNpbmcgcXVlcnkuU2VsZWN0b3JBbGwoKVxuICAgICAqIEBwYXJhbSBjb2xvciAtIFN0cmluZyBvZiBDU1MgY29sb3IgdmFsdWVcbiAgICAgKi9cbiAgICBjc3NFeGFtcGxlSGlnaGxpZ2h0aW5nIChlbGVtc2xpc3Q6ICBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiwgY29sb3I6IHN0cmluZykge1xuICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vZnVuY3Rpb24gdG8gcmVzZXQgdGhlIGNzcyBjb2RlIHByb3BlcnRpZXMgY29sb3IgdG8gb3JpZ2luYWxcbiAgICBjc3NFeGFtcGxlSGlnaGxpZ2h0UmVzZXQoIGVsZW1zbGlzdDogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pe1xuICAgICAgICB0aGlzLnJlc2V0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgYXBpR0VUIH0gZnJvbSBcIi4uL21vZGVscy9BUElcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCBmcm9tIFwiLi9EaWN0aW9uYXJ5U2VhcmNoTWFya3VwXCI7XG5pbXBvcnQgUldCRXJyb3IgZnJvbSBcIi4vUldCRXJyb3JCdXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiB9IGZyb20gXCIuL1JXQkpTT05Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IFJXQlN0cmluZ2lmeUpTT04gfSBmcm9tIFwiLi9SV0JKU09OQ29udmVydGVyXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuXG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoIGlzIGEgc2V0IG9mIG1hcmt1cCBjcmVhdGlvbiBhbmQgZnVuY3Rpb25zIHdoaWNoIGFsbG93IGEgdXNlclxuICogIHRvIGxvb2sgdXAgYSB3b3JkIGxpa2UgYSBEaWN0aW9uYXJ5LiBXaGVuIGNhbGxlZCwgdGhlIHVzZXIncyBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAqICBhcyBhbiBhY2NlcHRhYmxlIHdvcmQgb3IgaXQgZGVjbGluZXMgdGhlIHJlcXVlc3QsIHRoZW4gc2hvd2luZyB0aGUgdXNlciBpZiB0aGUgd29yZFxuICogIGlzIGFjY2VwdGFibGUuXG4gKlxuICogQ3JlYXRpbmcgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgcmVxdWlyZXMgcGFzc2luZyBhIHJlZmVyZW5jZSBlbGVtZW50IChmb3IgYVxuICoga25vd24gcGxhY2VtZW50IGxvY2F0aW9uKSB0aGF0IGNvbnRhaW5zIHRoZSAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3MuXG4gKlxuICogICBuZXcgRGljdGlvbmFyeVNlYXJjaChlbGVtKTtcbiAqXG4gKiBBbGwgdGhlIG5lZWRlZCBlbGVtZW50cyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgYWRkZWQgdG8gdGhlIHBhZ2UuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeVNlYXJjaCBleHRlbmRzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc3RhdGljIHdvcmRTdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkW107XG4gIHByaXZhdGUgc3RhdGljIENhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0OiBzdHJpbmcgPSBcIlJXQl93b3JkX2ZldGNoXCI7XG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RVcmw6IHN0cmluZyA9XG4gICAgXCJodHRwczovL2FwaS5kaWN0aW9uYXJ5YXBpLmRldi9hcGkvdjIvZW50cmllcy9lbi9cIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBjcmVhdGVzIGFsbCB0aGUgZnVuY3Rpb25hbGl0eSBhbmQgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gICAqICBEaWN0aW9uYXJ5IFNlYXJjaCB3aWRnZXQgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBsYWNlIHdpZGdldCBtYXJrdXAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9JbnZva2Ugc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcihlbGVtKTtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAvL0luaXRpYWxpemUgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRXaWRnZXRFdmVudHMoKTtcbiAgICAvL1N0b3JlIHdvcmRzIGNhY2hlIGRhdGEgd2l0aCBpbml0aWFsaXphdGlvbi5cbiAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID0gRGljdGlvbmFyeVNlYXJjaC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgTG9jYWwgU3RvcmFnZSB3b3JkcyBwcmV2aW91c2x5IHN0b3JlZCB3aXRoIHRoZSBEaWN0aW9uYXJ5IFNlYXJjaCBXaWRnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgLSB0aGVzZSBhcmUgdGhlIHdvcmRzIHN0b3JlZCBwcmV2aW91c2x5IGluIHRoZVxuICAgKiAgYnJvd3NlciBjYWNoZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpIHtcbiAgICAvL0xvY2FsIFN0b3JhZ2UgJ3dvcmQtY2FjaGVzJyBpdGVtcyBkYXRhIGFzc2lnbm1lbnRcbiAgICAvL2NhY2hlIHJlc3BvbnNlIGxpbmtzIGFuZCBjYWNoZSBuYW1lIGFyZSBwcmV2aW91c2x5IHN0b3JlZCBpbiBMb2NhbCBTdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VTdHI6IHN0cmluZztcbiAgICBpZihSV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCB0cnVlLCB0cnVlKSl7XG4gICAgICAvL1RoZSBMb2NhbCBTdG9yYWdlIGlzIG51bGwgb3IgZW1wdHktLT4gQ29uZmlybSBoZXJlIHRoZSBicm93c2VyIGRvZXMgbm90IGhhdmUgYW55IENhY2hlIFN0b3JhZ2UgaXRlbXMgaW4gZXJyb3JcbiAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdyl7XG4gICAgICAgIGlmICh3aW5kb3cuY2FjaGVzLmhhcyhEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FjaGVzLmRlbGV0ZShEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3dvcmQtY2FjaGVzJyk7XG4gICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHN0b3JhZ2VTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgIC8vY2hlY2sgdGhlIHdvcmQtY2FjaGUgdmFsdWUgZm9yIGNvcnJlY3QganNvbiBwYXJzaW5nXG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihzdG9yYWdlU3RyKSk7XG4gICAgaWYgKCFwYXJzZXRlc3QucGFzc2VkKXtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLCBcbiAgICAgICAgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICB0aGlzLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNldGVzdC5yZXR1cm5vYmo7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZC5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdG8gcmV0dXJuIHRoZSBmZXRjaGVkIHdvcmQgZGF0YS5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkRGF0YVxuICAgKi9cbiAgcHVibGljIGdldFdvcmREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLndvcmREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xpY2sgYW5kIGtleXByZXNzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgd2lkZ2V0LiBJbnB1dCBldmVudCBsaXN0ZW5lcnMgJ2NsaWNrJ1xuICAgKiAgYW5kICdrZXlwcmVzcycgYXdhaXQgZm9yIGEgc2VhcmNoIGNhbGwuIEFsc28sIHNob3VsZCBhIHVzZXIgd2FudCB0byBzZWFyY2ggYVxuICAgKiAgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLCB0aGUgd2lkZ2V0IGFkYXB0cyBtYXJrdXAgZm9yIHRoYXQgcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgYWRkV2lkZ2V0RXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJBIHNlYXJjaCBlbGVtZW50IGlzIHVuZGVmaW5lZCBmcm9tIHNlYXJjaFdvcmQgfCB3b3JkU2VhcmNoXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWN0aW9uYXJ5LWJ0bnNcIik7XG4gICAgY29uc3QgaGlkZVByZXZpb3VzUGFuZWwgPSAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vQWRkIGZvcm0gaW5wdXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy9VcG9uIGlucHV0IGVudHJ5LCBmaXJlIEFQSSBmZXRjaFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgICAgfSk7XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiKSByZXR1cm47XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgZmFsc2UsIG51bGwpO1xuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAvL1wiUHJldmlvdXMgd29yZCBzZWFyY2hlc1wiIGJ1dHRvbiBmZXRjaGVzIGxvY2FsbHkgc3RvcmVkIHdvcmRzXG4gICAgLy9DbGlja2luZyB0aGUgYnV0dG9uIGRpc3BsYXlzIGVhY2ggd29yZCBpbiBhIGxpc3Qgd2l0aGluIHRoZSB3aWRnZXRcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKTtcbiAgICAgIH0pO1xuICAgIFxuICAgIC8vXCJSZWZyZXNoXCIgYnV0dG9uIHJlbG9hZHMgdGhlIHBhZ2VcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja2NyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXZpb3VzV29yZHNcIik7XG4gICAgbGV0IGJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lcjtcblxuICAgIC8vQ2hlY2sgdGhlIHBsYWNlbWVudCBsb2NhdG9yIGFuZCB3b3JkIGNhY2hlcyBmb3IgdW5kZWZpbmVkXG4gICAgaWYgKHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID09IG51bGwgfHxcbiAgICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgICAgICBjb25zdCBub1dvcmRzSGVhZGluZ0VsZW0gPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSB7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucyh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkLCBidXR0b25Db250YWluZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBhbnksIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpe1xuICAgIGlmKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKXtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICAgbGV0IHByZXZpb3Vzd29yZGJ1dHRvbnM6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID0gdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRTZWFyY2hlc0VsZW1lbnRzKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UsIGJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICBmb3IgKGxldCBidG4gb2YgcHJldmlvdXN3b3JkYnV0dG9ucyl7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBuZXcgYnV0dG9uLlxuICAgICAgLy90aGlzIGlzIHRoZSBjYWNoZWQgd29yZCBidXR0ZW4uIHdoZW4gaXQncyBjbGlja2VkLCBmaXJlIGEgd29yZCBzZWFyY2hcbiAgICAgIGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIHRydWUsIGJ0bi53b3JkKTtcbiAgICAgIH0pO1xuICAgICAgLy9NT0JJTEVcbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGUgYnV0dG9uXG4gICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGJ0bi5jYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgd29yZCB0byB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgY29udGFpbmluZyB3b3JkIGRhdGEsIFVSTCwgYW5kIGNhY2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V2YWx1ZSAtIFRoaXMgaW50ZXJmYWNlIHN0b3JlcyBpbmZvcm1hdGlvbiB3aGVyZSBzZW5kaW5nIHRvIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIGFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdldmFsdWU6IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAvL0xvZyB0aGUgd29yZCBjYWNoZSBjcmVhdGlvblxuICAgIGNvbnN0IGFkZGVkd29yZGNhY2hlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0FkZGVkIHdvcmQgY2FjaGU6ICR7bG9jYWxzdG9yYWdldmFsdWUud29yZH1gLCBcbiAgICAgICAgJ2NvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjsnKTtcbiAgICB9XG4gICAgLy9UaGUgJ2xvY2Fsc3RvcmFnZXZhbHVlJyBuZWVkcyBhZGRlZCB0byBsb2NhbCBzdG9yYWdlIGNhY2hlXG4gICAgLy9Mb2NhbCBzdG9yYWdlIG1heSBiZSBlbXB0eSBvciBhbHJlYWR5IGhhdmluZyB0aGUgd2FudGVkIHNlYXJjaGVkIHdvcmRcbiAgICAvL0NoZWNrIHN0b3JhZ2UgaXMgbm90IG51bGwuIElmIGl0IGlzLCBhZGQgdGhlIHdvcmQuXG4gICAgaWYgKERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgICAgLy9BZGQgdGhlIHN0b3JhZ2Ugd29yZCB0byBhbiBhcnJheVxuICAgICAgICBsZXQgd29yZFN0b3JlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBbXTtcbiAgICAgICAgd29yZFN0b3JlLnB1c2gobG9jYWxzdG9yYWdldmFsdWUpO1xuICAgICAgICBsZXQganNvbnN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgICBsZXQgc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHdvcmRTdG9yZSkpO1xuICAgICAgICBpZighc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQucGFzc2VkKXtcbiAgICAgICAgICAvL3N0cmluZ2lmeSBvYmplY3QgZGlkIG5vdCB3b3JrLCBzbyByZXR1cm5cbiAgICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkLnJldHVybnN0cjtcblxuICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGlzIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIGpzb25zdHIpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQ3JlYXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLCBcbiAgICAgICAgICAnY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgICBhZGRlZHdvcmRjYWNoZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9Mb2NhbCBzdG9yYWdlIGlzIG5vdCBlbXB0eS4gSGVyZSwgd2UgbmVlZCB0byBhZGQgdGhlIHdvcmQgdG8gdGhlIGV4aXN0aW5nIHdvcmQgY2FjaGUuXG4gICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy9NYXRjaCB0aGUgY3VycmVudCBVUkwgZm9yIGNhY2hlIG1hbmFnZW1lbnRcbiAgICBmb3IgKGxldCBjYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gbG9jYWxzdG9yYWdldmFsdWUud29yZFVSTCkge1xuICAgICAgICAvL1dvcmQgaXMgYWxyZWFkeSBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIC8vTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgIC8vTE9HTEVBRlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIC8vQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgYWxsY2FjaGUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgIGxldCBzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZighc3RyaW5naWZ5dGVzdGRvdWJsZXdvcmQucGFzc2VkKXtcbiAgICAgIC8vc3RyaW5naWZ5IG9iamVjdCBkaWQgbm90IHdvcmssIHNvIHJldHVyblxuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGpzb25zdHIgPSBzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZC5yZXR1cm5zdHI7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIGpzb25zdHIpO1xuICAgIGFkZGVkd29yZGNhY2hlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcHJldmlvdXMgd29yZCBkYXRhIGZyb20gYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgLS0+IEtleS9WYWx1ZVxuICAgKiBkYXRhIHJlZmVyZW5jaW5nIHdvcmRzIHN0b3JlZCBpbiBsb2NhbCBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXdvcmQgLSBzdHJpbmcgZnJvbSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIiBidXR0b25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXdvcmQ6IHN0cmluZykge1xuICAgIC8vUmVtb3ZlIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2UsIENhY2hlIFN0b3JhZ2VcbiAgICAvL0NoZWNrIGxvY2FsIHN0b3JhZ2UgaXMgbm90IG51bGwgb3IgZW1wdHlcbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9HZXQgdGhlIHdvcmRzIGFycmF5IGZyb20gTG9jYWwgU3RvcmFnZVxuICAgIC8vUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShcIkRpY3Rpb25hcnlXaWRnZXRcIiwgXCJ3b3JkLWNhY2hlc1wiKTsgLy9sb2cgd2hldGhlciBmZXRjaGVkIHdvcmQgY2FjaGUgaXMgbnVsbCBvciBlbXB0eS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG4gICAgXG4gICAgLy9SZW1vdmUgdGhlIHdvcmQgZnJvbSBDYWNoZSBTdG9yYWdlIGFuZCBMb2NhbCBTdG9yYWdlIHdvcmQgYXJyYXlcbiAgICBmb3IgKGxldCB3b3JkQ2FjaGUgb2YgYWxsY2FjaGUpIHtcbiAgICAgIGlmICh3b3JkQ2FjaGUud29yZCA9PSBsb2NhbHN0b3JhZ2V3b3JkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZENhY2hlLndvcmRVUkwpO1xuICAgICAgICBhbGxjYWNoZS5zcGxpY2UoYWxsY2FjaGUuaW5kZXhPZih3b3JkQ2FjaGUpLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V3b3JkfWAsIFxuICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjsnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbGNhY2hlLmxlbmd0aCA9PSAwKXsgLy9UaGUgcmVtb3ZlZCB3b3JkIHdhcyB0aGUgbGFzdCB3b3JkIGluIHRoZSBhcnJheSwgc28gcmVtb3ZlIHRoZSBjb250YWluZXJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLCBcbiAgICAgICAgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgIGxldCB3b3JkY2FjaGVzc3RyZnl0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTihhbGxjYWNoZSkpO1xuICAgIGlmICghd29yZGNhY2hlc3N0cmZ5dGVzdC5wYXNzZWQpe1xuICAgICAgLy9MT0dMRUFGXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9SZXR1cm4gcmVtYWluaW5nIHdvcmRzIHRvIExvY2FsIFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIHdvcmRjYWNoZXNzdHJmeXRlc3QucmV0dXJuc3RyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmZXRjaCByZXF1ZXN0IGZyb20gQ2FjaGUgU3RvcmFnZS4gVXRpbGl6ZXMgXG4gICAqIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QgZm9yIGNhY2hlIG5hbWUuXG4gICAqIEBwYXJhbSByZW1vdmVVUkwgXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHJlbW92ZVVSTDogVVJMKSB7XG4gICAgd2luZG93LmNhY2hlc1xuICAgIC5vcGVuKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICBjYWNoZXMubWF0Y2gocmVtb3ZlVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIG1hdGNoaW5nIHRoZSByZXN1bHQuIFJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHJlc3VsdCkpO1xuICAgICAgICAgIGNhY2hlUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNhY2hlLmRlbGV0ZShyZW1vdmVVUkwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGR5bmFtaWNhbGx5IHJlY2FsbHMgYSB3b3JkIGRlZmluaXRpb24gcmVxdWVzdCBhbmQgaW5zdGFudGlhdGVzIGFwaUdFVCgpLiBUaGUgXG4gICAqIHJldHVybmVkIHByb21pc2UgYWxzbyBkeW1hbmljYWxseSBhbnN3ZXJzIHRoZSB3aWRnZXQgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZCAtIFRoZSB3b3JkIHNlYXJjaGVkIGZyb20gd2lkZ2V0IGlucHV0LlxuICAgKiBAcGFyYW0gd29yZFVybCAtIFRoZSBmZXRjaCByZXF1ZXN0IFVSTC5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBzZW5kVG9DYWNoZSAtID8gU2VuZCBmZXRjaCByZXF1ZXN0IHRvIENhY2hlIFN0b3JhZ2UgOiBGZXRjaCB3aXRob3V0IHN0b3JpbmcgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBjYWNoZU5hbWUgLSBJZiBzZW5kaW5nIGZldGNoIHJlcXVlc3RzIHRvIGNhY2hlLCBwcm92aWRlIGEgbmFtZSB0byBzdG9yZSBpdCB1bmRlci5cbiAgICogQHJldHVybnMgLSB3b3JkRGF0YTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHJpdmF0ZSBmZXRjaERpY3Rpb25hcnlUZXJtKHdvcmQ6IHN0cmluZywgd29yZFVybDogVVJMLCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCBzZW5kVG9DYWNoZTogYm9vbGVhbiwgY2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgLy9BIGZ1bmN0aW9uIGNhbGwgcGFyYW1ldGVyIG9wdGlvbiBpcyB0byBzdG9yZSB0aGUgd29yZCByZXF1ZXN0IGluIGJyb3dzZXIncyBDYWNoZSBTdG9yYWdlXG4gICAgLy9TdHJ1Y3R1cmUgdGhlIHdvcmQgZGF0YSB2aWEgJ2xvY2Fsc3RvcmFnZXdvcmR2YWx1ZScgaW50ZXJmYWNlIHVzZWQgdGhyb3VnaG91dCBmZXRjaGluZ1xuICAgIGxldCB3b3JkY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmQgPSB7XG4gICAgICBpbkNhY2hlOiBzZW5kVG9DYWNoZSxcbiAgICAgIHdvcmQ6IHdvcmQsXG4gICAgICB3b3JkVVJMOiB3b3JkVXJsLFxuICAgICAgY2FjaGVOYW1lOiBzZW5kVG9DYWNoZSA/IGNhY2hlTmFtZSA6IFwiXCIsXG4gICAgfTtcblxuICAgIC8vQXN5bmNocm9ub3VzIGZldGNoIHJlcWV1c3QgYW5kIGR5bmFtaWMgbWFya3VwIGNyZWF0aW9uIGZyb20gdGhlIGRhdGEncyByZXR1cm5cbiAgICBjb25zdCB3b3JkRmV0Y2hSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgLy9DYWxsIGFwaUdFVCgpIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAgY29uc3Qgd29yZEZldGNoID0gbmV3IGFwaUdFVChcbiAgICAgICAgd29yZGNhY2hlLndvcmRVUkwsXG4gICAgICAgIHdvcmRjYWNoZS5pbkNhY2hlLFxuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0sXG4gICAgICAgIHdvcmRjYWNoZS5jYWNoZU5hbWVcbiAgICAgICk7XG4gICAgICBsZXQgbm9EZWZpbml0aW9uczogYm9vbGVhbjtcblxuICAgICAgLy9GZXRjaCByZXF1ZXN0IG1ldGhvZCBjYWxsLiBSZXR1cm5lZCBkYXRhIG1heSBiZSB0aGUgd29yZCBkZWZpbml0aW9uXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdvcmRGZXRjaC5hcGlHRVQod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYSBzdHJpbmcsIGl0IGlzIHRoZSB3b3JkIGRlZmluaXRpb24gZGF0YS5cbiAgICAgICAgbm9EZWZpbml0aW9ucyA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKGRhdGEpKTtcbiAgICAgICAgaWYoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICAgIH1cbiAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYW4gb2JqZWN0LCBjb25maXJtIGl0IGlzICdubyBkZWZpbml0aW9uJyBzZXJ2ZXIgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgICAgICAvL05vIGRlZmluaXRpb25zIHdlcmUgZm91bmQgd2hlbiBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIGEgdGl0bGUgcHJvcGVydHlcbiAgICAgICAgICAvL3dvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIlxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIiAmJiB3b3JkY2FjaGUuaW5DYWNoZSA9PSB0cnVlKXtcbiAgICAgICAgICAgIC8vVGhlIGRhdGEgc3RyZWFtIGhlcmUgaXMgd2l0aG91dCB3b3JkIGRhdGEuIFRoaXMgZnVuY3Rpb24gYXdhaXRzIHRoZSBhcGkgZmV0Y2gncyBkYXRhXG4gICAgICAgICAgICAvL3RvIGNvbXBsZXRlIHN0b3JhZ2UvcHJvbWlzZSByZXR1cm5zLiBJdCB3YWl0cyA1IHNlY29uZHMgZm9yIHRoZSBicm93c2VyIHRvIGNvbXBsZXRlIGl0cyBzdG9yZSBmdW5jdGlvbnNcbiAgICAgICAgICAgIC8vdGhlbiByZW1vdmVzIHRoZSB1bndhbnRlZCBjYWNoZSByZXF1ZXN0LlxuICAgICAgICAgICAgLy9UT0RPOkJVR1JFU0VBUkNIPT5EdXJpbmcgdGhlIDUgdGltZW91dCwgaWYgdGhlIHBhZ2UgcmVmcmVzaGVzIGEgJ2JhZCB3b3JkJyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgIC8vVGhpcyAnYmFkIHdvcmQnIGNhbiBiZSByZW1vdmVkIGJ5IGRlbGV0aW5nIGFsbCBwcmV2aW91cyB3b3JkcyB2aWEgVUkgYW5kIHJlZnJlc2hpbmcgdGhlIHBhZ2UuIFRoaXMgd2lsbFxuICAgICAgICAgICAgLy8gZmlyZSBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkgdG8gY2xlYXIgYW55IG1pc21hdGNoZWQgd29yZGRhdGE8LS0+Y2FjaGVkcmVxdWVzdHMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9GdW5jdGlvbiBhd2FpdGluZyByZXF1ZXN0J3MgQ2FjaGUgU3RvcmFnZSBjYWNoaW5nXG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHRVRVUkwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCByZW1vdmUgZnJvbSBDYWNoZSBTdG9yYWdlLiBOYW1lOiBcIiwgd29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IG5vRGVmaW5pdGlvbnMpIHsvL0dvb2QgZGF0YS0tPiByZXR1cm4gZGF0YSBmb3IgbWFya3VwIHJlbmRlclxuICAgICAgICAvLydCYWQgZGF0YScgZHVlIHRvIFwiTm8gZGVmaW5pdGlvbnMgZm91bmRcIiwgaW52YWxpZCB3b3JkLCBiYWQgbmV0d29yayBjb25uZWN0aW9uXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm9uTGluZSkgey8vT25saW5lLCBwcm9ibGVtIHdpdGggZmV0Y2hcbiAgICAgICAgICAvL09mZmxpbmUgcmVxdWVzdFxuICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgKz0gXCIsIGNoZWNrIG5ldHdvcmsgY29ubmVjdGlvbi5cIjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vRGVmaW5pdGlvbnMpIHsvL1NlcnZlciByZXR1cm5lZCBubyBkZWZpbml0aW9ucyBkYXRhXG4gICAgICAgICAgaWYgKHdvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIilcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCI7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2Ugey8vSW52YWxpZCB3b3JkIGRhdGFcbiAgICAgICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5pbm5lclRleHQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2Uod29yZGNhY2hlKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgbGV0IHdvcmREYXRhID0gd29yZEZldGNoUmVxdWVzdCgpO1xuICAgIHJldHVybiB3b3JkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbEZldGNoRGljdGlvbmFyeVRlcm0gYXdhaXRzIGEgcHJvbWlzZSwgZmV0Y2hpbmcgYSBkaWN0aW9uYXJ5IHRlcm0uIFRoZSBkYXRhIFxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCB3b3JkOiBzdHJpbmcsIHdvcmRVUkw6IFVSTCkge1xuICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgbGV0IHdvcmREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFxuICAgICAgICB0aGlzLmZldGNoRGljdGlvbmFyeVRlcm0od29yZCwgd29yZFVSTCwgc2VhcmNoRWxlbXMsIHRydWUsIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpXG4gICAgICApO1xuICAgIH0pO1xuICAgIHdvcmREYXRhUHJvbWlzZS50aGVuKChkYXRhOiBvYmplY3QpID0+IHtcbiAgICAgIHRoaXMud29yZERhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5jcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAoZGF0YSwgc2VhcmNoRWxlbXMpO1xuICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IE9iamVjdC5oYXNPd24oZGF0YSwgJ3RpdGxlJykpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JldHJpZXZlZCB3b3JkOiAke3dvcmR9YCwgXG4gICAgICAgICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG4gICAgICAgIC8vIFJlbW92ZSB1bm5lZWRlZCBjbGFzc2VzIGlmIGFwcGxpZWQgcHJldmlvdXNseVxuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHdvcmRTZWFyY2goKSBiZWdpbnMgYSB3b3JkIHNlYXJjaCByZXF1ZXN0LiBUaGUgdXNlciBpbnB1dCBsaXN0ZW5lciBjaG9vc2VzXG4gICAqIHdoZXRoZXIgdGhlIGZldGNoIGlzIGNhbGxlZCBmcm9tIGNhY2hlIG9yIGlzIG5ldy5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSBpc0Zyb21QcmV2aW91c1dvcmRzIC0gVHJ1ZSBpZiB0aGUgdXNlciByZXF1ZXN0ZWQgYSBzZWFyY2ggZnJvbSBhIHByZXZpb3VzIHdvcmQsIHRvIGNhbGwgZGF0YSBmcm9tIEJyb3dzZXIgQ2FjaGUuXG4gICAqIEBwYXJhbSBjYWNoZWRXb3JkIC0gSWYgdGhlIHVzZXIgY2FsbGVkIGZvciBhIHByZXZpb3VzIHdvcmQsIGNhY2hlZFdvcmQgaXMgd2l0aGluIHRoZSBMb2NhbCBTdG9yYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkU2VhcmNoKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIGlzRnJvbVByZXZpb3VzV29yZHM6IGJvb2xlYW4sIGNhY2hlZFdvcmQ6IGxvY2Fsc3RvcmFnZXdvcmQgfCBudWxsKSB7XG4gICAgaWYgKGlzRnJvbVByZXZpb3VzV29yZHMpIHtcbiAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMsIGNhY2hlZFdvcmQud29yZCwgY2FjaGVkV29yZC53b3JkVVJMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGFrZSB1c2VyIGlucHV0IGFuZCBmaWx0ZXIgdG8gYW4gYWNjZXB0ZWQgc3RyaW5nXG4gICAgICBsZXQgYWNjZXB0ZWRJbnB1dFdvcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMud29yZFZhbGlkYXRpb24oc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSlcbiAgICAgICAgPyAoYWNjZXB0ZWRJbnB1dFdvcmQgPSB0cnVlKVxuICAgICAgICA6IChhY2NlcHRlZElucHV0V29yZCA9IGZhbHNlKTtcbiAgICAgIGlmIChhY2NlcHRlZElucHV0V29yZCkge1xuICAgICAgICAvLyBDcmVhdGUgYSBVUkwgb2YgdGhlIGFjY2VwdGVkIHdvcmQgZm9yIHVzZSBpbiB0aGUgZmV0Y2ggY2FsbFxuICAgICAgICB0aGlzLndvcmRVUkwgPSBuZXcgVVJMKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUudG9TdHJpbmcoKSwgRGljdGlvbmFyeVNlYXJjaC5yZXF1ZXN0VXJsKTtcbiAgICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSwgdGhpcy53b3JkVVJMKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlID0gXCJcIjsgLy8gcmVzZXQgaW5wdXQgc3RyaW5nXG4gIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgbG9jYWxzdG9yYWdld29yZCB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5cbi8qKlxuICogQSBEaWN0aW9uYXJ5U2VhcmNoV2lkZ2V0IGlzIG1hZGUgdG8gY3JlYXRlIHRoZSBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAqICBEaWN0aW9uYXJ5IFNlYXJjaC4gRWxlbWVudHMgYXJlIGNyZWF0ZWQgYW5kIGFwcGVuZGVkIHRvIHRoZSBwYWdlIHRvIHRoZSBjbGFzc1xuICogICdkaWN0aW9uYXJ5V2lkZ2V0J1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIHtcbiAgcHVibGljIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHM7XG5cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudCl7XG4gICAgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWNUaGVyZSBpcyBubyBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCwgXCJjb2xvcjogb3JhbmdlO1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbSk7XG4gIH1cbiAgLyoqXG4gICAqIFByaW1hcnkgd2lkZ2V0IG1hcmt1cCBzdHJ1Y3R1cmluZyB0aGUgd2lkZ2V0IGVsZW1lbnRzIGFuZCBzZWFyY2ggaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IGJlZm9yZSB0aGUgd2lkZ2V0LlxuICAgKiBAcmV0dXJucyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIC0tPiBpbnRlcmZhY2Ugb2ZcbiAgICogIGltcG9ydGFudCBIVE1MIGVsZW1lbnRzIHVzZWQgdGhyb3VnaCB3aWRnZXQgZnVuY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtOiBFbGVtZW50KSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgIGlmIChkaWN0aW9uYXJ5ID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgd2lkZ2V0IGVsZW1lbnRzXG4gICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikpO1xuICAgIGNvbnN0IHByZXZpb3VzV29yZHMgPSBkaWN0aW9uYXJ5LmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG5cbiAgICAvLyBSZXR1cm4gZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICBsZXQgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyA9IHtcbiAgICAgIHNlYXJjaFdvcmQ6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSksXG4gICAgICB3b3JkU2VhcmNoOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgIGRpY3Rpb25hcnlFbGVtOiA8SFRNTEVsZW1lbnQ+ZGljdGlvbmFyeSxcbiAgICAgIGVycm9yRWxlbTogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpLFxuICAgICAgcHJldmlvdXNXb3JkQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICAgIHByZXZpb3VzV29yZHNDb250YWluZXI6IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSksXG4gICAgICByZWZyZXNoQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKSxcbiAgICB9O1xuICAgIFxuICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zZWFyY2hcIik7XG4gICAgcHJldmlvdXNXb3Jkcy5jbGFzc0xpc3QuYWRkKFwicHJldmlvdXNXb3Jkc1wiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJtb25vc3BhY2VcIik7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5yZWZyZXNoQnRuLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJTZWFyY2guLi5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlNlYXJjaFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmlkID0gXCJzZWFyY2gtd29yZFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guaWQgPSBcIndvcmQtc2VhcmNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uaW5uZXJUZXh0ID0gXCJSZWZyZXNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lci5pZCA9IFwiZGljdGlvbmFyeS1idG5zXCI7XG4gICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG5cbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzID0gc2VhcmNoRWxlbWVudHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWFya3VwIHRvIGhvdXNlIHJldHVybmVkIHdvcmRzIGZyb20gRGljdGlvbmFyeVNlYXJjaC4gVGhlIG1hcmt1cFxuICAgKiAgaXMgY3JlYXRlZCBiYXNlZCBvbiBBUEkgZWdyZXNzLiBXb3JkcyBhbmQgdGhlaXIgZGVmaW5pdGlvbnMgdmFyeS4gVGhlIG1hcmt1cCBpc1xuICAgKiAgYWRhcHRpdmUgdG8gcmV0dXJuZWQgd29yZCBkYXRhIHN0cnVjdHVyZXMuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkRGF0YSAtIFRoaXMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCBvZiB3b3JkIHR5cGVzLCBkZWZpbml0aW9ucywgYW5kIGV4YW1wbGVzLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5VGVybVdpdGhNYXJrdXAod29yZERhdGE6IGFueSwgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cykge1xuICAgIGlmICh3b3JkRGF0YSA9PSBudWxsIHx8ICEod29yZERhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHx8IE9iamVjdC5oYXNPd24od29yZERhdGEsICd0aXRsZScpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWNUaGVyZSBpcyBubyBkZWZpbml0aW9uIGZvciB0aGlzIHdvcmQuXCIsIFwiY29sb3I6ZGFya2dyZWVuO1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBZGQgd29yZCBkZWZpbml0aW9uIHRvIHRoZSBkaWN0aW9uYXJ5IHdpZGdldFxuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lciA9IHNlYXJjaEVsZW1zLmRpY3Rpb25hcnlFbGVtLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuXG4gICAgLy8gVGhlIHdvcmQgZGF0YSByZXByZXNlbnRzIGNvbXBsZXggSlNPTiBvYmplY3RcbiAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIndvcmRcIiwgd29yZC53b3JkKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgIHdvcmRUaXRsZS50ZXh0Q29udGVudCA9IHdvcmQud29yZDtcbiAgICAgIC8vQWRkIHRoZSB3b3JkIGFuZCBleGFtcGxlcyB0byBwYWdlXG4gICAgICB3b3JkLm1lYW5pbmdzLm1hcCgod29yZFR5cGU6IGFueSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiV29yZFR5cGUgYXJlOiBcIiwgd29yZFR5cGUpXG4gICAgICAgIGNvbnN0IHdvcmRUeXBlSCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIikpO1xuICAgICAgICBjb25zdCB3b3JkVHlwZUxpc3QgPSBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpKTtcbiAgICAgICAgd29yZFR5cGVILnRleHRDb250ZW50ID0gd29yZFR5cGUucGFydE9mU3BlZWNoO1xuICAgICAgICB3b3JkVHlwZS5kZWZpbml0aW9ucy5tYXAoKGRlZjogYW55KSA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb24gaXM6IFwiLCBkZWYpO1xuICAgICAgICAgIGxldCB3b3JkVHlwZURlZkl0ZW0gPSB3b3JkVHlwZUxpc3QuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICBkZWZpbml0aW9uUC50ZXh0Q29udGVudCA9IGRlZi5kZWZpbml0aW9uO1xuICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJ3b3JkRGVmaW5pdGlvblwiKTtcblxuICAgICAgICAgIGNvbnN0IGFkZEFkamFjZW50RWxlbSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJEZWZpbml0aW9ucyBpczogXCIsIGRlZik7XG4gICAgICAgICAgICBjb25zdCBuZXdQID0gZGVmaW5pdGlvblAuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpKTtcbiAgICAgICAgICAgIGlmIChuZXdQIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3UGkgPSBuZXdQLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICAgICAgICAgICAgbmV3UGkudGV4dENvbnRlbnQgPSBkZWYuZXhhbXBsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluaXRpb25QLmNsYXNzTGlzdC5hZGQoXCJleGFtcGxlXCIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy9jaGVjayBpZiBrZXkgXCJleGFtcGxlXCIgaXMgaW4gZGVmaW5pdGlvbi4gSWYgaXQgaXMsIGFkZCB0aGUgZXhhbXBsZSB0byBsaXN0XG4gICAgICAgICAgXCJleGFtcGxlXCIgaW4gZGVmID8gYWRkQWRqYWNlbnRFbGVtKCkgOiB0cnVlID09IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL2NyZWF0ZSBjbGVhciBidXR0b25cbiAgICBjb25zdCBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwid29yZC1jbGVhclwiKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuXG4gICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBob3ZlcmVkLCBkaXNwbGF5IGl0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgLy93aGVuIGNsZWFyIGJ1dHRvbiBpcyBub3QgaG92ZXJlZCwgaGlkZSBpdFxuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGNsaWNrZWQsIGNsZWFyIHRoZSBlbGVtZW50c1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZW1vdmVkIHdvcmQ6ICR7ZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmdldEF0dHJpYnV0ZShcIndvcmRcIil9YCwgXG4gICAgICAgICdjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z29sZGVucm9kOycpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgY2xlYXIgYnV0dG9uIHRvIHdpZGdldFxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZpbml0aW9uRGVzY3JpcHRpb24pO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMgKHdvcmRzdG9yYWdlOiBsb2NhbHN0b3JhZ2V3b3JkW10sIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBsZXQgYnV0dG9uc2FycjogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzW10gPSBbXTtcbiAgICBcbiAgICAvL0JlY2F1c2UgdGhlIGxvY2F0b3IgYW5kIHRoZSBMb2NhbCBTdG9yYWdlIHZhbHVlcyBhcmUgdmlhYmxlLCBjcmVhdGUgdGhlIG1hcmt1cFxuICAgIC8vbmVlZGVkIHRvIGRpc3BsYXkgdGhvc2Ugd29yZHMuIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpZGdldCBmdW5jdGlvbmFsaXR5LlxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiB3b3Jkc3RvcmFnZSkge1xuICAgICAgY29uc3Qgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgIGNvbnN0IGNhY2hlV29yZEhlYWRpbmdFbGVtID0gd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICAgIGNvbnN0IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtID0gd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b24tY2xlYXJcIik7XG4gICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSB3b3JkQ2FjaGUud29yZDtcblxuICAgICAgbGV0IHByZXZpb3Vzd29yZGJ0bjogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzID0ge1xuICAgICAgICB3b3JkOiB3b3JkQ2FjaGUsXG4gICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtOiBjYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyOiB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIsXG4gICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtOiBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgIH1cbiAgICAgIGJ1dHRvbnNhcnIucHVzaChwcmV2aW91c3dvcmRidG4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uc2FycjtcbiAgfVxufVxuIiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuLy8gQ3JlYXRlIGEgY2xhc3MgZm9yIHRoZSBlbGVtZW50XG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nTGlzdEVsZW1lbnQgZXh0ZW5kcyBIVE1MVUxpc3RFbGVtZW50IHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFsd2F5cyBjYWxsIHN1cGVyIGZpcnN0IGluIGNvbnN0cnVjdG9yXG4gICAgICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIHN1cGVyKCkgaXMgYSByZWZlcmVuY2UgdG8gdGhpcyBlbGVtZW50XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gR2V0IHVsIGFuZCBsaSBlbGVtZW50cyB0aGF0IGFyZSBhIGNoaWxkIG9mIHRoaXMgY3VzdG9tIHVsIGVsZW1lbnRcbiAgICAgICAgLy8gbGkgZWxlbWVudHMgY2FuIGJlIGNvbnRhaW5lcnMgaWYgdGhleSBoYXZlIHVscyB3aXRoaW4gdGhlbVxuICAgICAgICBjb25zdCB1bHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJyk7XG4gICAgICAgIGNvbnN0IGxpcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICAvLyBIaWRlIGFsbCBjaGlsZCB1bHNcbiAgICAgICAgLy8gVGhlc2UgbGlzdHMgd2lsbCBiZSBzaG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIGhpZ2hlciBsZXZlbCBjb250YWluZXJcbiAgICAgICAgdWxzLmZvckVhY2godWwgPT4ge1xuICAgICAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGVhY2ggbGkgZWxlbWVudCBpbiB0aGUgdWxcbiAgICAgICAgbGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBsaSBoYXMgYSB1bCBhcyBhIGNoaWxkLCBkZWNvcmF0ZSBpdCBhbmQgYWRkIGEgY2xpY2sgaGFuZGxlclxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbiBhdHRyaWJ1dGUgd2hpY2ggY2FuIGJlIHVzZWQgIGJ5IHRoZSBzdHlsZVxuICAgICAgICAgICAgICAgIC8vIHRvIHNob3cgYW4gb3BlbiBvciBjbG9zZWQgaWNvblxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvc2VkJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXcmFwIHRoZSBsaSBlbGVtZW50J3MgdGV4dCBpbiBhIG5ldyBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXNzaWduIHN0eWxlIGFuZCBldmVudCBoYW5kbGVycyB0byB0aGUgc3BhblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkVGV4dCA9IGxpLmNoaWxkTm9kZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIC8vIENvcHkgdGV4dCBmcm9tIGxpIHRvIHNwYW4sIHNldCBjdXJzb3Igc3R5bGVcbiAgICAgICAgICAgICAgICBuZXdTcGFuLnRleHRDb250ZW50ID0gY2hpbGRUZXh0LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIG5ld1NwYW4uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXIgdG8gdGhpcyBzcGFuXG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5vbmNsaWNrID0gdGhpcy5zaG93dWw7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09ICdOdW1wYWRFbnRlcicgfHwgZXZlbnQuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHR1bCA9IG5ld1NwYW4ubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dHVsLnN0eWxlLmRpc3BsYXkgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGFuUGFyZW50ID0gbmV4dHVsLnBhcmVudE5vZGUgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzcGFuIGFuZCByZW1vdmUgdGhlIGJhcmUgdGV4dCBub2RlIGZyb20gdGhlIGxpXG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1NwYW4sIGNoaWxkVGV4dCk7XG4gICAgICAgICAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIEV4cGFuZGluZ0xpc3RFbGVtZW50LmNvdW50Kys7XG4gICAgfVxuXG4gICAgLy8gbGkgY2xpY2sgaGFuZGxlclxuICAgIHNob3d1bCA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgY29uc3QgbmV4dHVsID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIHN0YXRlIGFuZCB1cGRhdGUgY2xhc3MgYXR0cmlidXRlIG9uIHVsXG4gICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIG5leHR1bC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndWxpc3RlbGVtLWNsb3NlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tb3BlbicpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vLyBUaGlzIG9iamVjdCBjcmVhdGVzIGFuIGFycmF5IG9mIGRpdnMgZnJvbSBwb3J0IG51bWJlciBpbmZvcm1hdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxhc2hjYXJkQ2FyZEVsZW1zIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiB3aWRnZXQgb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIHdpZGdldGNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgd2l0aGluIHRoZSB3aWRnZXQgaW5zdGFudGlhdGVkIFtmbGFzaGNhcmRzXSAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG90YWxmbGFzaGNhcmRzOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBtX2ZsYXNoY2FyZHNBcnI6IEhUTUxMSUVsZW1lbnRbXSA9IFtdO1xuICAgIHB1YmxpYyBmbGFzaGNhcmRzY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBtX3BvcnRJbmZvTWFwOiBNYXA8YW55LCBzdHJpbmc+O1xuXG4gICAgY29uc3RydWN0b3IocG9ydG51bWJlcnNNYXA6IE1hcDxhbnksIHN0cmluZz4pIHtcbiAgICAgICAgdGhpcy5tX3BvcnRJbmZvTWFwID0gcG9ydG51bWJlcnNNYXA7XG4gICAgICAgIGNvbnN0IG1hcEl0ZXIgPSB0aGlzLm1fcG9ydEluZm9NYXAua2V5cygpO1xuICAgICAgICBGbGFzaGNhcmRDYXJkRWxlbXMud2lkZ2V0Y291bnQrKztcblxuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAuZm9yRWFjaCggKHBvcnQpID0+IHsgXG4gICAgICAgICAgICAvLyBDcmVhdGUgbGlzdCBlbGVtZW50XG4gICAgICAgICAgICBsZXQgZmxhc2hjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgLy9UT0RPOiBsZXQgZmxhc2hjYXJkID0gbmV3IEdyb3dpbmdDYXJkRWxlbWVudCgpO1xuICAgICAgICAgICAgLy9VbmFibGUgdG8gaW5zdGFudGlhdGUgbGkgZWxlbWVudCBhcyBncm93aW5nIGNhcmQgZHVlIHRvIERPTSB1bmF2YWxhYmxlIC0tPiByZXF1aXJlcyBzaGFkb3dET00gbWFuaXB1bGF0ZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBQb3B1bGF0ZSBlbGVtZW50IGZvciBwYWdlIHVzZVxuICAgICAgICAgICAgY29uc3QgaW5uZXIgPSBmbGFzaGNhcmQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBmbGlwZnJvbnQgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBiYWNrID0gaW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBsZXQgZ2FtZUNhcmRTcGFuID0gZmxpcGZyb250LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZEJhY2tTcGFuID0gZmxpcGJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgZmxhc2hjYXJkLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWNhcmRcIiwgXCJnYW1lQ2FyZFwiKVxuICAgICAgICAgICAgaW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBmbGlwZnJvbnQuY2xhc3NMaXN0LmFkZChcImNhcmRGcm9udFwiKTtcbiAgICAgICAgICAgIGZsaXBiYWNrLmNsYXNzTGlzdC5hZGQoXCJjYXJkQmFja1wiLCBcInZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgZ2FtZUNhcmRTcGFuLmlubmVyVGV4dCA9IGBQb3J0IyAke21hcEl0ZXIubmV4dCgpLnZhbHVlfWA7XG4gICAgICAgICAgICBnYW1lQ2FyZEJhY2tTcGFuLmlubmVyVGV4dCA9IGAke3BvcnR9YDtcblxuICAgICAgICAgICAgdGhpcy5mbGFzaGNhcmRzY291bnQrKztcbiAgICAgICAgICAgIEZsYXNoY2FyZENhcmRFbGVtcy50b3RhbGZsYXNoY2FyZHMrKztcblxuICAgICAgICAgICAgLy8gQWRkIGRpdiB0byBmbGFzaGNhcmQgaW5zdGFuY2VcbiAgICAgICAgICAgIHRoaXMubV9mbGFzaGNhcmRzQXJyLnB1c2goZmxhc2hjYXJkKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIEdyb3dpbmdDYXJkRWxlbWVudCBleHRlbmRzIEhUTUxMSUVsZW1lbnQge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGlzR3Jvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ncm93Q2FyZCk7XG4gICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5jb3VudCsrO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hyaW5rQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7IC8vVE9ETzogY2hlY2sgY2xhc3MgcHJvcGVydHlcbiAgICAgICAgaWYgKGxpLnN0eWxlLnNjYWxlKSB7XG4gICAgICAgICAgICBsaS5zdHlsZS5zY2FsZSA9IFwiMVwiO1xuICAgICAgICAgICAgbGkuc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zZXRJc0dyb3duKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hhZGVJbmFjdGl2ZUNhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoR3Jvd2luZ0NhcmRFbGVtZW50LmdldElzQXRMZWFzdE9uZUJpZygpKSB7XG4gICAgICAgICAgICBpZiAoIWxpLmdldElzR3Jvd24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi41XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuM1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXNBdExlYXN0T25lQmlnID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGlzdExJczogR3Jvd2luZ0NhcmRFbGVtZW50W10gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCN3ZWJJREVDYXJkcyBsaWApKTtcbiAgICAgICAgbGV0IGF0TGVhc3RPbmVJc0JpZyA9IGxpc3RMSXMuc29tZSgobGkpID0+IGxpLmdldElzR3Jvd24oKSA9PSB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGF0TGVhc3RPbmVJc0JpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXNHcm93biA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93bjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldElzR3Jvd24gPSAodHJ1ZWZhbHNlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzR3Jvd24gPSB0cnVlZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBncm93Q2FyZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdHlsZS5zY2FsZSA9IFwiMS4yXCI7XG4gICAgICAgIHRoaXMuc3R5bGUuekluZGV4ID0gXCIyXCI7XG4gICAgICAgIHRoaXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICB0aGlzLnNldElzR3Jvd24odHJ1ZSk7XG5cbiAgICAgICAgLy8gR2V0IGFsbCB0aGUgbGlzdCBlbGVtZW50cyB0byByZWZlcmVuY2Ugd2hpY2ggb25lIHRvIGdyb3dcbiAgICAgICAgLy8gSWYgaXQncyBub3QgdGhlIGNsaWNrZWQgZWxlbWVudCwgc2hyaW5rIGl0LlxuICAgICAgICBsZXQgbGlzdExJcyA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3dlYklERUNhcmRzIGxpXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KTtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaHJpbmtDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaGFkZUluYWN0aXZlQ2FyZCgoaXRlbSBhcyBHcm93aW5nQ2FyZEVsZW1lbnQpKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgc2NhbGUgcHJvcGVydHkgZm9yIGVhY2ggY2FyZFxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0eWxlLnNjYWxlID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5zY2FsZSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCByZWZlcmVuY2UgZXJyb3JzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCRXJyb3Ige1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBSV0JFcnJvci5jb3VudCsrO1xuICAgIH07XG4gICAgcHVibGljIHN0YXRpYyBjaGVja0VsZW1lbnRvck51bGwoY29tcG9uZW50bmFtZTpzdHJpbmcsIGNsYXNzbmFtZTogc3RyaW5nLCBsb2dtZXNzYWdlPzpib29sZWFuLCBzdXByZXNzZXhjZXB0aW9uPzpib29sZWFuICkge1xuICAgICAgICBsZXQgZWxlbTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICBsZXQgbG9nbXNzZzogYm9vbGVhbiA9IHRydWU7IC8vTG9nIG1lc3NhZ2Ugb3B0aW9uIGRlZmF1bHRcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlOy8vU3VwcmVzcyBtZXNzYWdlIG9wdGlvbiBkZWZhdWx0XG4gICAgICAgIGlmIChzdXByZXNzZXhjZXB0aW9uKSBzdXByZXNzZXhjcHQgPSB0cnVlO1xuICAgICAgICBsZXQgcXVlcnk6IHN0cmluZyA9IGAuJHtjbGFzc25hbWV9YDtcblxuICAgICAgICAvLyBBZGQgZGljdGlvbmFyeSB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihcIkdldEVsZW1lbnRcIiwgYENvdWxkIG5vdCBnZXQgZWxlbWVudDogJyR7cXVlcnl9J2ApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbSA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY05vIGVsZW1lbnQgZm91bmQgd2l0aCBjbGFzcyBuYW1lOiAke3F1ZXJ5fS5gLCAnY29sb3I6IHllbGxvdzsnKTtcbiAgICAgICAgICAgIGlmICghc3VwcmVzc2V4Y3B0KVxuICAgICAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudG5hbWV9TnVsbFJlZmVyZW5jZWAsIGBFbGVtZW50IG5vdCBmb3VuZGApKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbCAoY29tcG9uZW50bmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgY2hlY2tlbXB0eXN0cmluZz86Ym9vbGVhbiwgbG9nbWVzc2FnZT86Ym9vbGVhbikge1xuICAgICAgICBsZXQgbG9nbXNzZzogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGlmICghbG9nbWVzc2FnZSkgbG9nbXNzZyA9IGxvZ21lc3NhZ2U7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7a2V5fWApID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjTm8gbG9jYWwgc3RvcmFnZSBmb3IgJHtjb21wb25lbnRuYW1lfS5gLCAnY29sb3I6cHVycGxlOycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoZWNrZW1wdHlzdHJpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoY29tcG9uZW50bmFtZSwga2V5LCBsb2dtc3NnKTtcbiAgICAgICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KGNvbXBvbmVudG5hbWU6c3RyaW5nLCBrZXk6c3RyaW5nLCBsb2dtZXNzYWdlPzpib29sZWFuKXtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBpZiAoIWxvZ21lc3NhZ2UpIGxvZ21zc2cgPSBsb2dtZXNzYWdlO1xuICAgICAgICBsZXQgdGVzdDogc3RyaW5nIHwgbnVsbFxuICAgICAgICBcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdGVzdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKGBDb3VsZCBnZXQgbG9jYWwgc3RvcmFnZSBrZXk6ICR7a2V5fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXN0ID09IG51bGwpe1xuICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjTG9jYWwgc3RvcmFnZSBrZXkgbm90IGZvdW5kOiAke2tleX0uYCwgJ2NvbG9yOiB5ZWxsb3c7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudG5hbWV9UmVmZXJlbmNlRXhjZXB0aW9uYCwgYEtleSBub3QgZm91bmRgKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdCA9PSBcIlwiIHx8IHRlc3QgPT1cIltdXCIpe1xuICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjTG9jYWwgc3RvcmFnZSB2YWx1ZSBpcyBlbXB0eSBmb3Iga2V5OiAke2tleX1gLCAnY29sb3I6IHllbGxvdztmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUldCUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50bmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgVmFsdWUgaXMgZW1wdHlgKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHJlZmVyZW5jZSBlcnJvciBkYXRhLiAqL1xuZXhwb3J0IGNsYXNzIFJXQlJlZmVyZW5jZUVycm9yIGV4dGVuZHMgUmVmZXJlbmNlRXJyb3Ige1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIHBhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlIHJlZmVycm9yOiBSZWZlcmVuY2VFcnJvcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICBsZXQgZXJyID0gbmV3IFJlZmVyZW5jZUVycm9yKHRoaXMubWVzc2FnZSk7XG4gICAgICAgIHRoaXMucmVmZXJyb3IgPSBlcnI7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNFeGVjdXRpb24gZXhwZXJpZW5jZWQgYSByZWZlcmVuY2UgZXJyb3I6XFxuJW9cXG4lYzwvUldCPmAsIFxuICAgICAgICAgICAgJ2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpyZWQ7JywgdGhpcy5yZWZlcnJvciwgJ2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICBSV0JSZWZlcmVuY2VFcnJvci5jb3VudCsrO1xuICAgIH07XG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgc3ludGF4IGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUldCU3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgc3luZXJyb3I6IFN5bnRheEVycm9yO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIC8vIGxldCBlcnIgPSBuZXcgUmFuZ2VFcnJvcigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJWM8UldCPiVjSFNMIGNvbG9yIHZhbHVlIG91dCBvZiBhY2NlcHRhYmxlIHJhbmdlOlxcbiVvXFxuJWM8L1JXQj5gLCBcbiAgICAgICAgLy8gJ2NvbG9yOmdyYXk7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z3JheTsnLCBlcnIsICdjb2xvcjpncmF5O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgU3ludGF4RXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zeW5lcnJvciA9IGVycjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIHN5bnRheCBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnJlZDsnLCB0aGlzLnN5bmVycm9yLCAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgIFJXQlN5bnRheEVycm9yLmNvdW50Kys7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFJXQkRvbUV4Y2VwdGlvbiBleHRlbmRzIERPTUV4Y2VwdGlvbiB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgc3RhY2s6IGFueTtcbiAgICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgZG9tZXJyb3I6IERPTUV4Y2VwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBlcnJvcjogYW55KXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5zdGFjayA9IGVycm9yO1xuICAgICAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRE9NRXhjZXB0aW9uKHRoaXMubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZG9tZXJyb3IgPSBlcnI7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNFeGVjdXRpb24gZXhwZXJpZW5jZWQgYSBET00gZXJyb3I6XFxuJW9cXG4lYzwvUldCPmAsIFxuICAgICAgICAgICAgJ2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpyZWQ7JywgdGhpcy5zdGFjaywgJ2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICBSV0JEb21FeGNlcHRpb24uY291bnQrKztcbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBSV0JTeW50YXhFcnJvciB9IGZyb20gJy4vUldCRXJyb3JCdXMnXG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gcGFyc2VzIGpzb24gYW5kIHN0b3JlcyB0aGUgcGFyc2VkIHN0cmluZyB3aXRoIHRoZSByZXN1bHQuICovXG5leHBvcnQgY2xhc3MgUldCUGFyc2VKU09OIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwYXJzZXN0cjogc3RyaW5nO1xuICAgIHB1YmxpYyByZXR1cm5vYmo6IG9iamVjdDtcbiAgICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICAgIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICAgKiBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJzZXN0cjpzdHJpbmcpe1xuICAgICAgICBSV0JQYXJzZUpTT04uY291bnQrKztcbiAgICAgICAgdGhpcy5wYXJzZXN0ciA9IHBhcnNlc3RyO1xuICAgICAgICB0aGlzLnBhc3NlZCA9IHRoaXMuUldCcGFyc2VKU09OKCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgUldCcGFyc2VKU09OICgpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5vYmogPSBKU09OLnBhcnNlKHRoaXMucGFyc2VzdHIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLnJldHVybm9iaiA9IG51bGw7XG4gICAgICAgICAgICBuZXcgUldCU3ludGF4RXJyb3IoXCJQYXJzZUVycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKiogQW4gUldCUGFyc2VKU09OIHRlc3RzIHdoZXRoZXIgYW4gb2JqZWN0IGNhbiBiZSBzdHJpbmdpZmllZCBpbnRvIGEgdmFsaWRcbiAqIGpzb24gc3RyaW5nLiAqL1xuZXhwb3J0IGNsYXNzIFJXQlN0cmluZ2lmeUpTT04ge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGpzb246IGFueTtcbiAgICBwdWJsaWMgcmV0dXJuc3RyOiBzdHJpbmc7XG4gICAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgICAvKipDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcGFyc2UgcmVzdWx0cyBhbmQgcGFyc2VkXG4gICAgICogSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoanNvbjphbnkpe1xuICAgICAgICBSV0JTdHJpbmdpZnlKU09OLmNvdW50Kys7XG4gICAgICAgIHRoaXMuanNvbiA9IGpzb247XG4gICAgICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBwYXJzZUpTT04gKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnJldHVybnN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuc3RyID0gbnVsbDtcbiAgICAgICAgICAgIG5ldyBSV0JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqXG4gKiBIVE1MIGxpbmsgZWxlbWVudCBkYXRhLiBVc2VkIHdpdGggYW5jaG9yIHRhZ3MuXG4gKi9cbmNsYXNzIFJXQkxpbmsge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICAvKipIVE1MIHRpdGxlIGF0dHJpYnV0ZSAqL1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIC8qKklubmVyIHRleHQgc3RyaW5nICovXG4gICAgcHVibGljIGlubmVyVGV4dDogc3RyaW5nO1xuICAgIC8qKlRoZSBwYWdlIHRoZSBsaW5rIGlzIGFzc29jaWF0ZWQgdG8gKi9cbiAgICBwdWJsaWMgcGFnZU5hbWU6IHN0cmluZztcbiAgICAvKipIVE1MIGhyZWYgYXR0cmlidXRlICovXG4gICAgcHVibGljIGhSZWZlcmVuY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcsIGlubmVyVGV4dDogc3RyaW5nLCBwYWdlTmFtZTogc3RyaW5nLCBoUmVmZXJlbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGlubmVyVGV4dCxcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lLFxuICAgICAgICB0aGlzLmhSZWZlcmVuY2UgPSBoUmVmZXJlbmNlLFxuICAgICAgICBSV0JMaW5rLmNvdW50Kys7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSV0JMaW5rO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuL1dlYkJpdFwiO1xuaW1wb3J0IFJXQkNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvUldCQ2FyZFwiO1xuXG5leHBvcnQgY2xhc3MgUmFuZG9tV2ViQml0cyB7XG4gICAgcHVibGljIHN0YXRpYyBidWlsZENhcmRDb250YWluaW5nU2VjdGlvbihzZWN0aW9uVGl0bGU6IHN0cmluZywgc2VjdGlvbkhlYWRpbmdJRDogc3RyaW5nKSB7XG4gICAgICAgIC8vIENyZWF0ZSBkaXZpc29yIHNlY3Rpb25hbCBlbGVtZW50cyB0byBhcHBlbmQgdG8gbWFpblxuICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCAmJiBwYWdlTWFpbi5ub2RlTmFtZSA9PT0gJ01BSU4nKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FyZCBzZWN0aW9uIGVsZW1lbnRzXG4gICAgICAgICAgICAvLyA8c2VjdGlvbiBjbGFzcz1cImNhcmRzXCI+XG4gICAgICAgICAgICAvLyAgICAgPGgyPkFyYml0cmFyeSBBcnRpY2xlczo8L2gyPlxuICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3M9XCJjYXJkX2NvbHVtbnNcIj5cblxuICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgLy8gPC9zZWN0aW9uPlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGNvbnN0IEFBU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgbGV0IGFhSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICBsZXQgYWFDYXJkc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIEFBU2VjdGlvbi5hcHBlbmRDaGlsZChhYUhlYWRpbmcpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhQ2FyZHNTZWN0aW9uKTtcbiAgICAgICAgICAgIHBhZ2VNYWluLmFwcGVuZChBQVNlY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGF0YSBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgIEFBU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNcIik7XG4gICAgICAgICAgICBhYUNhcmRzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXJkX2NvbHVtbnMnKTtcbiAgICAgICAgICAgIGFhSGVhZGluZy5pbm5lclRleHQgPSBgJHtzZWN0aW9uVGl0bGV9YDtcbiAgICAgICAgICAgIGFhSGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzZWN0aW9uSGVhZGluZ0lEKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRSV0JDYXJkcyhjYXJkc0RhdGE6IFdlYkJpdFtdKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgZWFjaCBjYXJkIGluIHRoZSBhcnJheS4gQnVpbGQgdGhlIGNhcmQgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogV2ViQml0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByd2JjYXJkID0gbmV3IFJXQkNhcmQoKTtcbiAgICAgICAgICAgIHJldHVybiByd2JjYXJkLmJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlKTs7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBBQXM7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbnRlcmZhY2UgU2NyaXB0UnVudGltZSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0YXJ0TWFyazogUGVyZm9ybWFuY2VNYXJrLFxuICAgIGVuZE1hcms6IFBlcmZvcm1hbmNlTWFyayxcbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcGVyZm9ybWFuY2Ugc3RhcnQgYW5kIGVuZCBtYXJrcy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQlBlcmYge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHNjcmlwdHJ1bnRpbWVtYXJrczogU2NyaXB0UnVudGltZSA9IHtcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgc3RhcnRNYXJrOiBudWxsLFxuICAgICAgICBlbmRNYXJrOiBudWxsXG4gICAgfTtcblxuICAgIC8qKiBJbnN0YW50aWF0aW5nIGEgU2NyaXB0UGVyZiByZWNvcmRzIHRoZSBwZXJmb3JtYW5jZSBzdGFydCBtYXJrLiAqL1xuICAgIGNvbnN0cnVjdG9yKCBzY3JpcHRuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lID0gc2NyaXB0bmFtZTtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfS1zdGFydGApO1xuICAgICAgICBSV0JQZXJmLmNvdW50Kys7XG4gICAgfVxuXG4gICAgLyoqIENhbGwgZW5kKCkgdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC4gKi9cbiAgICBwdWJsaWMgZW5kKCl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLmVuZE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LWVuZGApO1xuICAgICAgICB0aGlzLm1lYXN1cmUoKTtcbiAgICB9XG5cbiAgICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICAgIHByaXZhdGUgbWVhc3VyZSgpe1xuICAgICAgICBsZXQgbWVhc3VyZSA9IHBlcmZvcm1hbmNlLm1lYXN1cmUoIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUsIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLnN0YXJ0TWFyay5uYW1lLCB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5lbmRNYXJrLm5hbWUpXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhgJHt0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiwgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL1JXQkpTT05Db252ZXJ0ZXJcIjtcbmltcG9ydCBSV0JFcnJvciBmcm9tIFwiLi9SV0JFcnJvckJ1c1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKiBcbiAqIFRvIGNyZWF0ZSBhIFRvRG9MaXN0LCBhbiBlbGVtZW50IG9uIHRoZSBwYWdlIG11c3QgaGF2ZSAnLlRvRG9MaXN0JyBjbGFzcy4gQ2FsbCB0aGVcbiAqICBjbGFzcyBjb25zdHJ1Y3RvciwgcGFzc2luZyBpbiB0aGF0IGVsZW1lbnQgdG8gY3JlYXRlIHRoZSB3aWRnZXQuXG4gKlxuICogICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuICogICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtKTtcbiAqIFxuICogVGhlbiwgdGhlIHdpZGdldCBpcyBjcmVhdGVkIGFuZCBUby1Eb3MgYXJlIHJldHJpZXZlZCBmcm9tIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XG4gICAgLyoqVG90YWwgbnVtYmVyIG9mIFRvRE9zKi9cbiAgICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAgIC8qKldpZGdldCBlbGVtZW50cyB1c2VkIHRvIHBvcHVsYXRlIHRvZG9zICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuICAgIHByaXZhdGUgc3RhdGljIFRvRG9JblN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdO1xuICAgIC8qKlRvZG8gSFRNTCBlbGVtZW50cyAqL1xuICAgIHByaXZhdGUgbGlzdEVsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgVG8tRG8gbGlzdCB3aWRnZXQncyBlbGVtZW50cy5cbiAgICAgKiBcbiAgICAgKiAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50c1xuICAgICAqIEBwYXJhbSBUb0RvRWxlbWVudHMgV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXRUb0RvTGlzdEVsZW1lbnRzKFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cykge1xuICAgICAgICBUb0RvTGlzdC5Ub0RvRWxlbWVudHMgPSBUb0RvRWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmFuZG9tIFdlYiBCaXRzIHVzZXMgbXVsdGlwbGUgbG9jYXRpb25zIHRvIGFwcGx5IHRoZSBUby1EbyBMaXN0IHdpZGdldC4gQ3JlYXRlXG4gICAgICogIHRoZSBsaXN0IG1hcmt1cCwgcGFzc2luZyBpbiBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciBwbGFjZW1lbnQgb2YgdGhlIHdpZGdldC5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIHdpZGdldCBpcyBwbGFjZWQgYWZ0ZXIgdGhpcyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgICAgICAvL0luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICAgICAgLy9EZXBlbmRlbnQgb24gdGhlIHBhZ2UsIHRvZG8gd2lkZ2V0IG1heSBoYXZlIHByZS1leGlzdGluZyBtYXJrdXAgaW4gcGxhY2VcbiAgICAgICAgLy9Td2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgICAgIGlmIChlbGVtID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOm9yYW5nZTtcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzLyc6XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgY2FzZSAnL2Rpc3QvaW5kZXguaHRtbCc6XG4gICAgICAgICAgICAgICAgLy9NYXJrdXAgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0YWJsZSBlbGVtZW50cyBuZWVkZWQgZm9yIHRoZSB0b2RvIGxpc3RcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvbGlzdFNlY3Rpb24gPSBlbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdG9kb2xpc3RTZWN0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVhZCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyMSA9IHRoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRobGVmdCA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aG1pZGRsZSA9IHRyMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRmb290ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHIzID0gdGZvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzbGVmdCA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDNJTiA9IHRkM2xlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGQzbWlkZGxlID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IElOUFVUID0gdGQzbWlkZGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKSk7XG4gICAgICAgICAgICAgICAgdGQzSU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgICAgICAgICBJTlBVVC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiaXRlbUlOUFVUXCIpO1xuICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvLURvOlwiO1xuICAgICAgICAgICAgICAgIHRvZG9saXN0U2VjdGlvbi5pZCA9IFwiVG9ET1wiO1xuICAgICAgICAgICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgICAgICAgICAgdGhtaWRkbGUudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICAgICAgdGJvZHkuaWQgPSBcIlRvRG9JdGVtc1wiO1xuICAgICAgICAgICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgICAgICAgICB0ZDNJTi50eXBlID0gXCJidXR0b25cIjtcblxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gKGl0IGlzIG5vdCBzdG9yZWQgaW4gY2FjaGUpXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9Eb0xpc3RFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy90b2Rvcy5odG1sJzpcbiAgICAgICAgICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAgICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSB0byBkbyBpdGVtIGR1ZSB0byBjYWNoZSBlbXB0eVxuICAgICAgICAgICAgICAgIGNvbnN0IGh0Ym9keSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGVCb2R5O1xuICAgICAgICAgICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKGh0Ym9keSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRvRG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0RvRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVsZW1lbnQgaXMgbm90IHZhbGlkLiBQbGVhc2UgZW5zdXJlIGEgdmFsaWQgZWxlbWVudCBmb3IgVG9EbyBsaXN0IHdpZGdldCB0byBmb2xsb3cuXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0LlxuICAgICAqIEByZXR1cm5zIFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VG9Eb0xpc3RFbGVtZW50cygpIHtcbiAgICAgICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgICAgIC8vRWFjaCB3aWRnZXQgbG9jYXRpb24ncyBlbGVtZW50cyBtYXkgdmFyeSwgc28gYSBjYWxsIG9mIGdldFRvRG9MaXN0RWxlbWVudHMoKVxuICAgICAgICAvL2xvY2F0ZXMgdGhlIHBhZ2UncyBlbGVtZW50cyB0byBwb3B1bGF0ZSB0aGUgVG9Eb0VsZW1lbnRzIGludGVyZmFjZS5cbiAgICAgICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGFibGUnKSxcbiAgICAgICAgICAgIHRvZG9UYWJsZUJvZHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb0RvSXRlbXMnKSxcbiAgICAgICAgICAgIGFkZEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FkZEJ1dHRvbicpLFxuICAgICAgICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RFbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIFRvLURvIGl0ZW1zIGZyb20gTG9jYWwgU3RvcmFnZS5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUb0RvSW5TdG9yYWdlKGNoZWNrZW1wdHl2YWx1ZXN0cmluZzpib29sZWFuLCBsb2dtZXNzYWdlOmJvb2xlYW4pIHtcbiAgICAgICAgaWYgKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiVG9Eb0xpc3RcIiwgXCJUb0Rvc1wiLCBjaGVja2VtcHR5dmFsdWVzdHJpbmcsIGxvZ21lc3NhZ2UpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyc2VzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihwYXJzZXN0cikpO1xuICAgICAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgICAgICAgLy9wYXJzZWQgSlNPTiBpcyBtYWxmb3JtZWRcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlRvRG9JblN0b3JhZ2UgPSBwYXJzZXRlc3QucmV0dXJub2JqXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIFRvLURvIHRvIExvY2FsIFN0b3JhZ2UuIFxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiAtIFRoZSBVSSBmb3JtIGlucHV0IGRlc2NyaXB0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIC8vQWRkIHRoZSBUb0RvcyBhcnJheSB0byBsb2NhbCBjYWNoZS5cbiAgICAgICAgLy9UaGUgJ2xvY2Fsc3RvcmFnZXRvZG9jYWNoZScgaW50ZXJmYWNlIHN0cnVjdHVyZXMgdGhlIGRhdGEgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICAgICAgbGV0IFRvRG86IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSA9IHtcbiAgICAgICAgICAgIGluQ2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9kb2l0ZW06IGRlc2NyaXB0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGxldCBUb0RvczogYW55ID0gW107IC8vVG9EbyBhcnJheVxuICAgICAgICBsZXQgc3RyZ2Z5O1xuXG4gICAgICAgIGNvbnN0IHN0cmluZ2lmeXRvZG8gPSAodG9kb3N0cjphbnkpID0+IHtcbiAgICAgICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgICAgICBsZXQgdG9kb3NzdHJnZnl0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih0b2Rvc3RyKSk7XG4gICAgICAgICAgICBpZiAoIXRvZG9zc3RyZ2Z5dGVzdC5wYXNzZWQpe1xuICAgICAgICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2Rvc3N0cmdmeXRlc3QucmV0dXJuc3RyO1xuICAgICAgICB9XG4gICAgICAgIC8vRmlyc3QsIHJlYWQgY3VycmVudCBMb2NhbCBTdG9yYWdlIFRvRG9zXG4gICAgICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgaWYgKHRvZG9zc3RvcmFnZWNhY2hlKXtcbiAgICAgICAgICAgIFRvRG9zID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgICAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAgICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBzdHJnZnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgICAgICBzdHJnZnkgPSBzdHJpbmdpZnl0b2RvKFRvRG9zKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIHN0cmdmeSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQ3JlYXRlZCB0by1kbyBjYWNoZSBrZXk6IFRvRG9zYCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQWRkZWQgdG8tZG8gY2FjaGU6ICR7ZGVzY3JpcHRpb259YCwgJ2NvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Y3lhbjsnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgVG8tRG8gaXRlbSBmcm9tIExvY2FsIFN0b3JhZ2UuIFRoZSByZXF1ZXN0ZWQgVG8tRG8gdG8gcmVtb3ZlIGlzXG4gICAgICogIHB1bGxlZCBpbmRpdmlkdWFsbHkgZnJvbSB0aGUga2V5LXZhbHVlIHBhaXIgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBpdGVtIC0gdGhlIFRvLURvIGl0ZW0gcmVxdWVzdGVkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgICAgICBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZS5maWx0ZXIoKHRvZG8pID0+IHRvZG8udG9kb2l0ZW0gIT09IGl0ZW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCB0b2RvIGNhY2hlOiAke2l0ZW19YCwgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuOycpO1xuICAgICAgICBsZXQgdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UpKTtcbiAgICAgICAgaWYoIXRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnBhc3NlZCl7XG4gICAgICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQganNvbnN0ciA9IHRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnJldHVybnN0cjtcbiAgICAgICAgaWYgKGpzb25zdHIgPT0gXCJcIiB8fCBqc29uc3RyID09IFwiW11cIil7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVG9Eb3MnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVG9Eb3MnLCBqc29uc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgdG8gYWRkIGEgcm93IHRvIHRoZSBUby1EbyB0YWJsZS5cbiAgICAgKiAgQSByb3cgY29uc2lzdHMgb2YgdGhyZWUgY29sdW1uczogYSBjb21wbGV0ZSB0aWNrLWJveCwgYSBkZXNjcmlwdGlvbiwgYW5kIGEgZGVsZXRlIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIGZpcnN0UGFpbnQgLSBCb29sZWFuIHZhbHVlIHVzZWQgYnkgYWRkaW5nIGxpc3Qgc3RvcmFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgICAgIC8vQ3JlYXRlIGEgdGFibGUgcm93IHdpdGggY2hlY2tib3ggYW5kIGRlbGV0ZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IFRBQkxFSVRFTSA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgbmV3Um93ID0gdGFibGVGcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpOyAvL0FkZCByb3dcbiAgICAgICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgZmlyc3QgZGF0YVxuICAgICAgICBjb25zdCBjaGVja0JPWCA9IGZpcnN0Q09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpOyAvL0FkZCBjaGVja2JveFxuICAgICAgICBjb25zdCBuZXdJVEVNID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHNlY29uZCBkYXRhXG4gICAgICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSB0aGlyZCBkYXRhXG4gICAgICAgIGNvbnN0IGRlbEJPWCA9IHNlY29uZENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKSAvL0FkZCBkZWxldGVib3hcblxuICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDaGVja2JveCcpO1xuICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnRGVsZXRlJyk7XG4gICAgICAgIG5ld0lURU0uc2V0QXR0cmlidXRlKCdudW0nLCBUb0RvTGlzdC5Ub0RPcyA/ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNUb0RPIHRkW251bV0nKTtcbiAgICAgICAgICAgIHJldHVybiAoKE51bWJlcihlbGVtPy5nZXRBdHRyaWJ1dGUoXCJudW1cIikpIHx8IC0xMDAwKSArIFRvRG9MaXN0LlRvRE9zKS50b1N0cmluZygpO1xuICAgICAgICB9KSgpIDogKDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICBuZXdJVEVNLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247IC8vUG9wdWxhdGUgc2Vjb25kIGNvbFxuICAgICAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBkZWxCT1guc2V0QXR0cmlidXRlKCd2YWx1ZScsICdEZWxldGUnKTtcblxuICAgICAgICBpZiAoZmlyc3RQYWludCkge1xuICAgICAgICAgICAgLy9BZGQgdG8gbGlzdCBzdG9yYWdlXG4gICAgICAgICAgICB0aGlzLmFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICAgICAgVEFCTEVJVEVNLmFwcGVuZENoaWxkKHRhYmxlRnJhZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsICdjb2xvcjpnb2xkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGQ7Jyk7XG5cbiAgICAgICAgLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gJ2RlbGV0ZScgaXMgY2xpY2tlZFxuICAgICAgICBkZWxCT1guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgdGhlIFRvLURvIGl0ZW0gcm93cyBmcm9tIFRvLURvcyBzdG9yZWQgaW4gdGhlIGJyb3dzZXIgTG9jYWwgU3RvcmFnZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKHRydWUsIGZhbHNlKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KFRvRG9MaXN0LlRvRG9JblN0b3JhZ2VbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFRvRG9FdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgQUREQlVUVE9OID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEJ1dHRvbjtcbiAgICAgICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgICAgICBpZiAoQUREQlVUVE9OID09IG51bGwgJiYgQURESVRFTUVOVEVSID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgd2FzIG5vdCBmb3VuZCBvciBpcyBudWxsXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3QgZnJvbSBjbGlja2luZyB0aGUgYWRkIGJ1dHRvbiovXG4gICAgICAgIEFEREJVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBBRERJVEVNRU5URVIudmFsdWUgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3Qgd2hlbiB1c2luZyBrZXkgZW50ZXIqL1xuICAgICAgICBBRERJVEVNRU5URVIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBlLmNvZGUgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuQWRkVG9Eb1JvdyhBRERJVEVNRU5URVIudmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmdW5jdGlvbiBkZXRlcm1pbmluZyB0aGUgZGVsZXRlIGJ1dHRvbi4gSXRlbXMgYXJlIGRlbGV0ZWQgd2hlbiBwdXNoZWQsIGJ1dCBhcmVcbiAgICAgKiAgbm90IHJlbW92ZWQgZnJvbSBzdG9yYWdlIHdpdGhvdXQgJ0NvbXBsZXRlPycgY2hlY2tlYm94IGNoZWNrZWQuXG4gICAgICogQHBhcmFtIGJveCBpbnB1dCBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBEZWxldGVCdXR0b24oYm94OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlmIChib3gucGFyZW50Tm9kZSA9PSBudWxsIHx8IGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZyA9PSBudWxsIHx8XG4gICAgICAgICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGEgdGFibGUgZWxlbWVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93Q2hrQnggPSA8SFRNTEVsZW1lbnQ+Ym94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcbiAgICAgICAgLyoqIElucHV0IGVsZW1lbnQgKi9cbiAgICAgICAgY29uc3Qgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07IFxuICAgICAgICBjb25zdCB0b2RvVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgICAgICBjb25zdCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmJveC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGxldCBpID0gdHIucm93SW5kZXg7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50O1xuICAgICAgICBpZiAocm93Q2hrQnhJTi5jaGVja2VkKSB7XG4gICAgICAgICAgICAvL3JlbW92ZSByb3cgc2luY2UgY29tcGxldGVkXG4gICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgdG9kbyByb3c6ICR7Ym94LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGRlbnJvZDsnKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSAnQWRkIGEgVG9ETyBJdGVtLicpIHtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuXG4gICAgICAgICAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZXRvRG9Gcm9tU3RvcmFnZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgdG9kbyByb3c6ICR7Ym94LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdvbGRlbnJvZDsnKTtcbiAgICAgICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBzZWVkIHRoZSBUby1EbyBMaXN0IHdoZW4gdGhlcmUgYXJlIG5vIExvY2FsIFN0b3JhZ2UgaXRlbXNcbiAgICAgKiAgd2hpY2ggd291bGQgcG9wdWxhdGUgdGhlIGxpc3QuIFRoZSBzYW1wbGUgcmVtYWlucyBvbiBwYWdlIGJ1dCBpcyBuZXZlciBzdG9yZWQgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU2FtcGxlVG9fRG8odGJvZHk6IEVsZW1lbnQpIHtcbiAgICAgICAgaWYoVG9Eb0xpc3QuZ2V0VG9Eb0luU3RvcmFnZShmYWxzZSwgdHJ1ZSkpIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL0NyZWF0ZSBhIHNhbXBsZSBlbnRyeSBpbiB0aGUgVG9EbyB0YWJsZSBhcyBhIHBsYWNlaG9sZGVyXG4gICAgICAgIGNvbnN0IHRyMiA9IHRib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICAgICAgICBjb25zdCB0ZDJsZWZ0ID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgIGNvbnN0IHRkMm1pZGRsZSA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgY29uc3QgdGQycmlnaHQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgICAgIHRkMm1pZGRsZS5zZXRBdHRyaWJ1dGUoXCJudW1cIiwgYCR7MX1gKTtcbiAgICAgICAgdGQySU4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkRlbGV0ZVwiKTtcbiAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICAgICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICB0ZDJJTi50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICAgICAgVG9Eb0xpc3QuVG9ET3MrKztcblxuICAgICAgICAvL1wiRGVsZXRlXCIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5EZWxldGVCdXR0b24odGQyREVMKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZW1vdmVkIHRvZG86ICR7dGQyREVMLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6cHVycGxlO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnB1cnBsZTsnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuL0F0dHJpYnV0aW9uTGlua1wiO1xuLyoqXG4gKiBUaGlzIGNsYXNzIGhvbGRzIHRoZSBkYXRhIGZvciAnV2ViQml0JyBhcnRpY2xlIGNhcmRzLiBLZXkgaW5mb3JtYXRpb25cbiAqIG9mIHRoZSBhcnRpY2xlJ3MgY29udGVudHMgYXJlIGNvbnRhaW5lZDogbmFtZSwgZGVzY3JpcHRpb24sIGRhdGEgY3JlYXRlZCxcbiAqIGV0Yy5cbiAqL1xuY2xhc3MgV2ViQml0IHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGFydGljbGVOdW1iZXI6IG51bWJlcjtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXRlQ3JlYXRlZDogRGF0ZTtcbiAgICBwdWJsaWMgYXJ0aWNsZUxpbms6IHN0cmluZztcbiAgICBwdWJsaWMgY2FyZEltYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIGNhcmRJbWFnZUFMVDogc3RyaW5nO1xuICAgIHB1YmxpYyBsaW5rQXR0cmlidXRpb246IEF0dHJpYnV0aW9uTGluaztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcnRpY2xlTnVtYmVyOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IERhdGUsXG4gICAgICAgIGFydGljbGVMaW5rOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZTogc3RyaW5nLFxuICAgICAgICBjYXJkSW1hZ2VBTFQ6IHN0cmluZyxcbiAgICAgICAgbGlua0F0dHJpYnV0aW9uPzogQXR0cmlidXRpb25MaW5rLFxuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJ0aWNsZU51bWJlciA9IGFydGljbGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kYXRlQ3JlYXRlZCA9IGRhdGVDcmVhdGVkO1xuICAgICAgICB0aGlzLmFydGljbGVMaW5rID0gYXJ0aWNsZUxpbms7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlID0gY2FyZEltYWdlO1xuICAgICAgICB0aGlzLmNhcmRJbWFnZUFMVCA9IGNhcmRJbWFnZUFMVDtcbiAgICAgICAgdGhpcy5saW5rQXR0cmlidXRpb24gPSBsaW5rQXR0cmlidXRpb247XG4gICAgICAgIFdlYkJpdC5jb3VudCsrO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViQml0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBjbGllbnR7XG4gICAgb2xkVVJMID0gZG9jdW1lbnQucmVmZXJyZXI7XG4gICAgYnJvd3NlcnBsYXRmb3JtOiBzdHJpbmc7XG4gICAgdXNlcmFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgY29ubmVjdGlvbnR5cGU7XG4gICAgY29ubmVjdGlvbnJ0dDtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuYnJvd3NlcnBsYXRmb3JtID0gdGhpcy5zZXRicm93c2VycGxhdGZvcm0oKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9udHlwZSA9IHRoaXMuc2V0Y29ubmVjdGlvbnR5cGUoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucnR0ID0gdGhpcy5zZXRjb25uZWN0aW9ucnR0KCk7XG4gICAgfVxuXG4gICAgc2V0YnJvd3NlcnBsYXRmb3JtKCkge1xuICAgICAgICBpZiAoXCJ1c2VyQWdlbnREYXRhXCIgaW4gd2luZG93Lm5hdmlnYXRvcil7XG4gICAgICAgICAgICAvL3VzZXJBZ2VudERhdGEgaXMgTmF2aWdhdG9yVUFEYXRhIHR5cGUsIG5vdCBmb3VuZCBpbiBUeXBlU2NyaXB0LiBcbiAgICAgICAgICAgIC8vS25vd24gdG8gRWRnZSBicm93c2VyOiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnREYXRhKVxuICAgICAgICAgICAgbGV0IHVzZXJBZ2VudERhdGE6IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50RGF0YSBhcyBvYmplY3Q7XG4gICAgICAgICAgICBsZXQgcGxhdGZvcm1kYXRhOiBzdHJpbmcgPSA8c3RyaW5nPnVzZXJBZ2VudERhdGEucGxhdGZvcm07XG4gICAgICAgICAgICByZXR1cm4gcGxhdGZvcm1kYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuYnJvd3NlcnBsYXRmb3JtID0gXCJcIjtcbiAgICB9XG5cbiAgICBzZXRjb25uZWN0aW9udHlwZSgpIHtcbiAgICAgICAgaWYgKFwiY29ubmVjdGlvblwiIGluIHdpbmRvdy5uYXZpZ2F0b3Ipe1xuICAgICAgICAgICAgLy9jb25uZWN0aW9uIGlzIE5ldHdvcmtJbmZvcm1hdGlvbiB0eXBlLCBub3QgZm91bmQgaW4gVHlwZVNjcmlwdC5cbiAgICAgICAgICAgIC8vS25vd24gdG8gRWRnZSBicm93c2VyOiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci5jb25uZWN0aW9uKVxuICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb246YW55ID0gd2luZG93Lm5hdmlnYXRvci5jb25uZWN0aW9uIGFzIG9iamVjdFxuICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZXR5cGU6c3RyaW5nID0gPHN0cmluZz5jb25uZWN0aW9uLmVmZmVjdGl2ZVR5cGU7XG4gICAgICAgICAgICByZXR1cm4gZWZmZWN0aXZldHlwZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb250eXBlID0gXCJcIjtcbiAgICB9XG5cbiAgICBzZXRjb25uZWN0aW9ucnR0KCkge1xuICAgICAgICBpZiAoXCJjb25uZWN0aW9uXCIgaW4gd2luZG93Lm5hdmlnYXRvcil7XG4gICAgICAgICAgICBsZXQgY29ubmVjdGlvbjphbnkgPSB3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24gYXMgb2JqZWN0XG4gICAgICAgICAgICBsZXQgcnR0OnN0cmluZyA9IDxzdHJpbmc+Y29ubmVjdGlvbi5ydHQ7XG4gICAgICAgICAgICByZXR1cm4gcnR0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnJ0dCA9IFwiXCI7XG4gICAgfVxufSJdfQ==

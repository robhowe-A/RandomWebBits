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
    }
};
exports.default = notfound404widget;

},{"../models/client":43}],2:[function(require,module,exports){
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
        if (!RWBErrorBus_1.default.checkElementorNull("ClassComponent", ".dictionaryWidget", true, true))
            DictionaryWidget_1.default.init();
        // Add ToDos widget if an element with that class is on a page
        if (!RWBErrorBus_1.default.checkElementorNull("ClassComponent", ".ToDoList", true, true))
            ToDosWidget_1.default.init();
        classperf.end(); //end performance measure
    }
};
exports.default = ClassComponents;

},{"../models/RWBErrorBus":36,"../models/ScriptPerf":40,"./DictionaryWidget":3,"./ToDosWidget":11}],3:[function(require,module,exports){
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

},{"../models/DictionarySearch":31}],4:[function(require,module,exports){
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

},{"../models/ExpandingList":33}],5:[function(require,module,exports){
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

},{"../data/portnums":24,"../models/FlashcardCardElems":34}],6:[function(require,module,exports){
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

},{"../models/GrowingCard":35}],7:[function(require,module,exports){
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

},{"../data/navitems":23,"../models/RWBErrorBus":36,"../models/ScriptPerf":40}],8:[function(require,module,exports){
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
const RWBErrorBus_1 = require("../models/RWBErrorBus");
const WebBitsSlideshow_1 = require("./WebBitsSlideshow");
const acronyms_element_1 = require("./acronyms-element");
const PageComponents = {
    init: () => {
        const pageperf = new ScriptPerf_1.default("Pagecomponents"); //measure performance
        customElements.define('acronyms-list', acronyms_element_1.SimpleGreeting);
        PageComponents.CheckPage();
        pageperf.end(); //end performance measure
    },
    CheckPage: () => {
        if (!RWBErrorBus_1.default.checkElementorNull('PageComponents', '#Four-Oh-Four', false, true)) {
            _404_1.default.init();
        }
        switch (window.location.pathname) {
            //'Index' and 'Pages' routes, add cards widget
            case '/RandomWebBits/index.html':
            case '/index.html':
            case '/':
            case '':
            case '/RandomWebBits/pages.html':
            case '/pages.html':
                WebBits_1.default.init(); // cards widget initialization
                WebBitsSlideshow_1.default.init();
                break;
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
            // Initialize HSL color picker
            case '/pages/hsl.html':
                hslcolor_1.default.inithslcolorpicker();
                break;
        }
    }
};
exports.default = PageComponents;

},{"../models/RWBErrorBus":36,"../models/ScriptPerf":40,"./404":1,"./ExpandingListDOMWidget":4,"./FlashcardGameWidget":5,"./GrowingCard":6,"./SlideShowWidget":10,"./WebBits":12,"./WebBitsSlideshow":13,"./acronyms-element":14,"./colorcode":15,"./colorcodeurl":16,"./cssex":17,"./domainlookup":18,"./hslcolor":19,"./sliderbar":21}],9:[function(require,module,exports){
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

},{"../models/ToDo":41}],12:[function(require,module,exports){
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
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], cardsArticles[0].length);
            cardsArticles[1] = getMultipleRandom(cardsArticles[1], 3);
        }
        // first section of cards slideshow class
        for (let card of cardsArticles[0]) {
            card.classList.add("slide");
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

},{"../data/data":22,"../models/RandomWebBits":39}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const CardsSlideShow_1 = require("../models/CardsSlideShow");
const WebBitsSlideShow = {
    init: () => {
        if (window.location.pathname == '/pages.html')
            return;
        //Implement slideshow for arbitrary articles
        let aacards = document.querySelectorAll(".cardslideshow .slide");
        let aaslideshow = new CardsSlideShow_1.default(aacards, 3);
        //Build the markup needed for the slideshow
        //Style the container
        let slideshowslides = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        for (let card of aaslideshow.cards) {
            let temp = card;
            slideshowslides.insertAdjacentElement("beforeend", temp);
        }
        slideshowslides.classList.add("slidescontainer");
        slideshowslides.style.width = "100%";
        slideshowslides.style.display = "flex";
        aaslideshow.slideshowcontainer.style.justifyContent = "center";
        let slideshowbtns = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        //Left slideshow btn
        let previousslideshowbtn = document.createElement("a");
        previousslideshowbtn.classList.add('slideshowPrev');
        previousslideshowbtn.innerText = "❮";
        slideshowbtns.insertAdjacentElement('beforeend', previousslideshowbtn);
        aaslideshow.prevbtn = previousslideshowbtn;
        //Right slideshow btn
        let nextslideshowbtn = document.createElement("a");
        nextslideshowbtn.classList.add('slideshowNext');
        nextslideshowbtn.innerText = "❯";
        slideshowbtns.insertAdjacentElement('beforeend', nextslideshowbtn);
        slideshowbtns.style.display = "flex";
        slideshowbtns.style.justifyContent = "center";
        aaslideshow.nextbtn = nextslideshowbtn;
        //Hide overflow elements
        if (aaslideshow.cardindxstart < aaslideshow.cardquantshow) {
            for (let i = aaslideshow.cards.length - 1; i > aaslideshow.cardsindxend; i--) {
                aaslideshow.cards[i].style.display = "none";
            }
        }
        //Previous/next button event listeners
        aaslideshow.prevbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.prev(aaslideshow);
        });
        aaslideshow.nextbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.next(aaslideshow);
        });
    },
    next: (slideshow) => {
        if (slideshow.turn == slideshow.maxturncount) {
            return;
        }
        //Hide the first element in slideshow
        slideshow.cards[slideshow.cardindxstart].style.display = "none";
        //Display the next element for slideshow
        slideshow.cards[slideshow.cardsindxend + 1].style.display = "block";
        //Increment index counter
        slideshow.cardindxstart++;
        slideshow.cardsindxend++;
        slideshow.turn++;
    },
    prev: (slideshow) => {
        if (slideshow.turn == 0) {
            return;
        }
        //Hide the first element in slideshow
        slideshow.cards[slideshow.cardsindxend].style.display = "none";
        //Display the next element for slideshow
        let temp = slideshow.cards[slideshow.cardindxstart - 1];
        temp.style.display = "block";
        //Increment index counter
        slideshow.cardindxstart--;
        slideshow.cardsindxend--;
        slideshow.turn--;
    }
};
exports.default = WebBitsSlideShow;

},{"../models/CardsSlideShow":29}],14:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleGreeting = void 0;
//--Copyright (c) 2023 Robert A. Howell
const lit_all_min_js_1 = require("../js/lit-all.min.js");
class SimpleGreeting extends lit_all_min_js_1.LitElement {
    title = {};
    id = {};
    acronyms = [];
    // Define scoped styles right with your component, in plain CSS
    static styles = (0, lit_all_min_js_1.css) `
    .acronymList { display: block; width: fit-content;
      border: .5mm solid var(--clr-blue);
      box-shadow:
      0.7px 0px 1.4px rgba(0, 0, 0, 0.303),
      1.7px 0px 4.7px rgba(0, 0, 0, 0.447),
      -7px 0px 11px rgba(0, 0, 0, 0.75);
      border-radius: 15px;
      padding: 0 1em 1em 1em;
      margin: 2em;
      background-color: var(--clr-primary-400);
      color: var(--clr-all-primary-900);
    }
    .acronymList:hover {
      background-color: var(--clr-primary-500);
    }
    .acronymList ul { 
      line-height: 1em;
      font-family: Ariel, sans-serif;
      padding: 0;
    }
    .acronymList li {
      list-style-type: none;
    }
    .acronymList h3 {
      color: var(--clr-primary-500);
      margin-bottom: .5em;
      font-size: 1.2em;
    }
    .acronymList ul {
      text-align: left;
      margin: 0;
    }
    @media only screen and (min-width: 320px){
      .acronymList ul { 
        padding: 0em 1em;
      }
    }
    @media only screen and (min-width: 501px){
      .acronymList ul {
        font-size: 20px;
      }
      .acronymList h3 {
        color: var(--clr-all-primary-900);
        font-size: 1.4em;
      }
    }
  `;
    constructor() {
        super();
        const PageAcronyms = [
            {
                page: "/pages/wifi.html",
                htmlTitle: "wifi",
                acronyms: ["SSID", "802.11a", "802.11b", "802.11g", "802.11n", "802.11ac", "802.11ax", "WLAN", "IPv4", "IPv6", "MAC", "AP"]
            },
            {
                page: "/pages/networkspeed.html",
                htmlTitle: "networkspeed",
                acronyms: ["Ping", "NIC", "BPS", "MBPS", "GBPS", "Bit", "Byte", "ISP"]
            },
            {
                page: "/pages/markup.html",
                htmlTitle: "markup",
                acronyms: ["body", "head", "div", "href", "lang", "ul", "ol"]
            },
            {
                page: "/pages/ipaddress.html",
                htmlTitle: "ipaddress",
                acronyms: ["IPV4", "IPV6", "TCP/IP", "OSI", "DHCP", "DNS", "Subnet Mask", "CIDR", "LAN", "NAT", "MAC"]
            },
            {
                page: "/guides/https.html",
                htmlTitle: "https",
                acronyms: ["KMS", "PKI", "RSA", "SSL", "TLS", "SHA", "AES", "EFS", "TPM", "BitLocker", "Encrypt", "Decrypt", "Signature", "Elliptic Curve"]
            },
            {
                page: "/pages/htmlresponses.html",
                htmlTitle: "htmlresponses",
                acronyms: ["HTTP", "HTTPS", "TCP", "UDP", "DOM", "Asset", "Frame", "Auth", "Transport", "Response", "Verb"]
            },
            {
                page: "/pages/domainlookup.html",
                htmlTitle: "domainlookup",
                acronyms: ["DNS", "DNSSEC", "DDNS", "FQDN", "NetBIOS", "Nameserver", "OU", "Top-level", "A record", "CNAME"]
            },
            {
                page: "/pages/drives.html",
                htmlTitle: "drives",
                acronyms: ["CSOM", "SSOM", "PS", "NS", "Tree", "Objects", "Registry", "Variables", "TCP/IP", "TLS", "Cyphertext", "CN", "EKU"]
            },
            {
                page: "/pages/dns.html",
                htmlTitle: "dns",
                acronyms: ["DDNS", "DNSSEC", "A (addresS)", "CAA", "NS (name server)", "MX", "QPS"]
            },
            {
                page: "/pages/dom.html",
                htmlTitle: "dom",
                acronyms: ["DOM", "CSS", "HTML", "asset", "property", "attribute", "variable", "reference", "function", "root"]
            },
            {
                page: "/pages/svg.html",
                htmlTitle: "svg",
                acronyms: ["XML", "XHTML", "RDF", "ISO", "DCMES", "CC License"]
            },
            {
                page: "/pages/javascript.html",
                htmlTitle: "javascript",
                acronyms: ["Defer", "Synchronous", "ES", "GUI", "JSON", "AJAX", "IIFE", "IDE", "DOM"]
            },
            {
                page: "/pages/http.html",
                htmlTitle: "javascript",
                acronyms: ["HTTP", "TCP", "UDP", "DNS", "TLS", "IP", "HTML", "CSS", "JS", "API"]
            },
            {
                page: "/pages/latency.html",
                htmlTitle: "javascript",
                acronyms: ["CMS", "TCP", "TLS", "IP", "PS (packet switching)", "DNS"]
            }
        ];
        const currentPage = PageAcronyms.filter(page => page.page === window.location.pathname);
        // Declare reactive properties
        this.title = 'Common Acronyms';
        this.id = currentPage[0].htmlTitle;
        this.acronyms = currentPage[0].acronyms;
    }
    buildList() { }
    // Render the UI as a function of component state
    render() {
        let listitems = [];
        for (const acronyms of this.acronyms) {
            listitems.push((0, lit_all_min_js_1.html) `<li>${acronyms}</li>`);
        }
        return (0, lit_all_min_js_1.html) `
    <aside class="acronymList">
    <h3>${this.title}:</h3>
    <ul id="acr-${this.id}">
      ${listitems}
    </ul>
    </aside>`;
    }
}
exports.SimpleGreeting = SimpleGreeting;

},{"../js/lit-all.min.js":25}],15:[function(require,module,exports){
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

},{"../models/ColorCode":30}],16:[function(require,module,exports){
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

},{"../models/ColorCode":30}],17:[function(require,module,exports){
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

},{"../models/ColorCode":30}],18:[function(require,module,exports){
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

},{"../models/RWBErrorBus":36}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../models/ScriptPerf":40}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
const ArbitraryArticles = new Array(new WebBit_1.default("Domainlookup", 1, "Domain Lookup", "Check an available domain using WhoIS API search", new Date(2022, 12, 4), "pages/domainlookup.html", "img/whois.webp", "WhoIs Lookup", new AttributionLink_1.default("domain icons", "Domain icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/domain", "Flaticon", "Domain Lookup", 1)), new WebBit_1.default("Htmlresponses", 2, "HTML Frames", "View HTML page response status information", new Date(2022, 12, 11), "pages/htmlresponses.html", "img/HTML_Frames.webp", "HTML frames example", new AttributionLink_1.default("code icons", "Code icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/code", "Flaticon", "HTML Source Code", 2)), new WebBit_1.default("Webtech", 5, "Wappalyzer", "Wappalyzer browser extension", new Date(2023, 1, 2), "pages/webtech.html", "img/wappalyzer-logo.webp", "Browser extension logo. A white w on a purple tile."), new WebBit_1.default("Jsonobject", 6, "jsonObject", "JSON object notation", new Date(2023, 1, 9), "pages/jsonobject.html", "img/json.webp", "JSON logo: A grey circle with artistic spirals."), new WebBit_1.default("Wi-Fi", 7, "Wi-Fi Version", "Determine Wifi Version", new Date(2023, 1, 16), "pages/wifi.html", "img/wifi.webp", "Wi-Fi logo with a black circle background."), new WebBit_1.default("Chatgpt", 8, "Preview chatGPT", "Chat with an AI for research and development.", new Date(2023, 1, 28), "pages/chatgpt.html", "img/ai.webp", "Decorative AI logo", new AttributionLink_1.default("ai icons", "Ai icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/ai", "Flaticon", "Preview chatGPT", 8)), new WebBit_1.default("Paint3d", 9, "Paint 3D", "Edit pictures or screen captures using paint 3D", new Date(2023, 1, 28), "pages/paint3d.html", "img/prototype.webp", "Colorful prototyping icon", new AttributionLink_1.default("prototype icons", "Prototype icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/prototype", "Flaticon", "Paint 3D", 9)), new WebBit_1.default("Dictionary", 10, "Dictionary Terms", "List dictionary terms using a dictionary API", new Date(2023, 1, 30), "pages/dictionaryword.html", "img/dictionary.webp", "Dictionary icon depiction", new AttributionLink_1.default("dictionary icons", "Dictionary icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/dictionary", "Flaticon", "Dictionary Terms", 10)), new WebBit_1.default("Boinc", 11, "Contribute for Science United", "Pivot the unused computing potential for science", new Date(2023, 2, 6), "pages/boinc.html", "img/boinc_glossy.webp", "BOINC logo", new AttributionLink_1.default("BOINC icons", "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California", "https://boinc.berkeley.edu", "BOINC", "Contribute for Science United", 11)), new WebBit_1.default("IPAddress", 12, "IP Address Lookup", "Lookup public and local IP addresses", new Date(2023, 2, 13), "pages/ipaddress.html", "img/ip.webp", "IP location and browser icon", new AttributionLink_1.default("IP icons", "IP icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/ip", "Flaticon", "IP Address Lookup", 12)), new WebBit_1.default("HTMLMarkup", 13, "HTML Source Code", "Reveal HTML source code and JavaScript", new Date(2023, 2, 26), "pages/markup.html", "img/HTML_source.webp", "HTML frames icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "HTML Source Code", 13)), new WebBit_1.default("Networkspeed", 15, "Network Speed Test", "Test the network adapters with a PowerShell script", new Date(2023, 3, 7), "pages/networkspeed.html", "img/page-speed.webp", "Speed test dial icon", new AttributionLink_1.default("page speed icons", "Page speed icons created by Prosymbols Premium - Flaticon", "https://www.flaticon.com/free-icons/page-speed", "Flaticon", "Network Speed", 15)), new WebBit_1.default("PowerShelldrives", 17, "PowerShell Drives", "Similar to an HDD, except it is only in PowerShell", new Date(2023, 3, 20), "pages/drives.html", "img/terminal.webp", "Computer terminal icon", new AttributionLink_1.default("terminal icons", "Terminal icons created by Flat Icons - Flaticon", "https://www.flaticon.com/free-icons/terminal", "Flaticon", "PowerShell Drives", 17)), new WebBit_1.default("LEARN__DNS", 20, "How DNS works", "A general overview of Domain Name System", new Date(2023, 4, 4), "pages/dns.html", "img/dns.webp", "DNS drawing attached to a keyboard", new AttributionLink_1.default("dns icons", "Dns icons created by kerismaker - Flaticon", "https://www.flaticon.com/free-icons/dns", "Flaticon", "LEARN: DNS", 20)), new WebBit_1.default("LEARN__Google", 22, "Google is #1 website", "Google is the #1 trafficked site", new Date(2023, 4, 17), "pages/google.html", "img/search-engine.webp", "A bar graph icon", new AttributionLink_1.default("rank icons", "Rank icons created by Pixelmeetup - Flaticon", "https://www.flaticon.com/free-icons/rank", "Flaticon", "LEARN: Google", 22)), new WebBit_1.default("DOM", 23, "DOM", "Review the DOM with a DOM tree", new Date(2023, 4, 27), "pages/dom.html", "img/tree.webp", "A tree icon", new AttributionLink_1.default("tree icons", "Tree icons created by justicon - Flaticon", "https://www.flaticon.com/free-icons/tree", "Flaticon", "DOM", 23)), new WebBit_1.default("Webide", 24, "WebIDE", "Try skipping the download with a web IDE", new Date(2023, 5, 3), "pages/webides.html", "img/ux.webp", "A computer application icon", new AttributionLink_1.default("design icons", "Design icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/design", "Flaticon", "webides", 24)), new WebBit_1.default("SVG", 25, "SVG", "Find an SVG and learn about the SVG language", new Date(2023, 5, 9), "pages/svg.html", "img/svg.svg", "An svg icon example.", new AttributionLink_1.default("scalable vector graphics", "SVG icon created by Harvey Rayner", "http://www.w3.org/Graphics/SVG/", "W3C", "svg", 25)), new WebBit_1.default("Disable_Javascript", 26, "Disable JavaScript", "Disable the JavaScript to test website function", new Date(2023, 5, 22), "pages/javascript.html", "img/software-application.webp", "A javascript function icon.", new AttributionLink_1.default("web coding icons", "Web coding icons created by Muhammad Atif - Flaticon", "https://www.flaticon.com/free-icons/web-coding", "Flaticon", "JavaScript", 26)), new WebBit_1.default("LEARN__HTTP", 28, "HTTP", "HTTP makes sending and receiving web pages possible.", new Date(2023, 6, 12), "pages/http.html", "img/http.webp", "Http verb in front of a globe icon.", new AttributionLink_1.default("http icons", "Http icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/http", "Flaticon", "LEARN: HTTP", 28)), new WebBit_1.default("CSSdef", 29, "CSS", "CSS styles the elements within a page.", new Date(2023, 6, 19), "pages/css.html", "img/css-3.webp", "A CSS three logo.", new AttributionLink_1.default("css icons", "Css icons created by Pixel perfect - Flaticon", "https://www.flaticon.com/free-icons/css", "Flaticon", "CSS", 29)), new WebBit_1.default("Latency", 32, "Latency", "Travel latency can slow down a website.", new Date(2023, 7, 18), "pages/latency.html", "img/chronometer.webp", "A stopwatch icon.", new AttributionLink_1.default("timer icons", "Timer icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/timer", "Flaticon", "Latency", 32)), new WebBit_1.default("HTMLdef", 33, "Create HTML elements", "Learn the parts and syntax of an HTML element", new Date(2023, 7, 25), "pages/html.html", "img/html.webp", "HTML element syntax icon", new AttributionLink_1.default("html icons", "Html icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/html", "Flaticon", "Create HTML elements", 33)), new WebBit_1.default("URL", 34, "URL Address Examples", "Learn the parts and syntax of a URL", new Date(2023, 8, 7), "pages/url.html", "img/www.webp", "URL example icon", new AttributionLink_1.default("url icons", "Url icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/url", "Flaticon", "Create HTML elements", 34)), new WebBit_1.default("DataStorage", 35, "Data Storage", "Local storage saves data when needed for concurrent page surfing.", new Date(2023, 8, 14), "pages/datastorage.html", "img/server.webp", "Data storage icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "Data Storage", 35)), new WebBit_1.default("HSL", 36, "Hue, Saturation, and Lightness", "HSL colors manipulate hues.", new Date(2023, 9, 6), "pages/hsl.html", "img/color-wheel.webp", "Color wheel icon", new AttributionLink_1.default("variety icons", "Variety icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/variety", "Flaticon", "Hue, Saturation, and Lightness", 36)));
/**
 * "Guide Shorts' section card data."
 */
const GuideShorts = new Array(new WebBit_1.default("Httpscert", 4, "HTTPS Certificate", "Select to view a website's HTTPS certificate", new Date(2022, 12, 26), "guides/https.html", "img/https_cert.webp", "Cursor selecting HTTPS certificate", new AttributionLink_1.default("ssl certificate icons", "Ssl certificate icons created by inipagistudio - Flaticon", "https://www.flaticon.com/free-icons/ssl-certificate", "Flaticon", "HTTPS Certificate", 4)), new WebBit_1.default("Searchverticals", 14, "GUIDE: Search Verticals", "Optimize your search engine news and results", new Date(2023, 2, 26), "guides/searchverticals.html", "img/search_settings.webp", "Search settings icon", new AttributionLink_1.default("content writing icons", "Content writing icons created by Vectors Tank - Flaticon", "https://www.flaticon.com/free-icons/content-writing", "Flaticon", "Search Verticals", 14)), new WebBit_1.default("SMTP", 16, "GUIDE: SMTP and Email", "Learn Email protocols and port numbers", new Date(2023, 3, 13), "guides/smtp.html", "img/communications.webp", "Email server-stack with mail icon", new AttributionLink_1.default("server icons", "Server icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/server", "Flaticon", "SMTP and Email", 16)), new WebBit_1.default("Devtools", 19, "GUIDE: Dev Application", "Review dev tool's application tab", new Date(2023, 3, 27), "guides/applicationtab.html", "img/tool-box.webp", "Developer's tool kit icon", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Dev Application", 19)), new WebBit_1.default("Devtoolstwo", 21, "GUIDE: Inspect Pages", "Open the developer's toolbox another way", new Date(2023, 4, 10), "guides/inspectpages.html", "img/tool-box2.webp", "Developer's tool kit icon two", new AttributionLink_1.default("toolbox icons", "Toolbox icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/toolbox", "Flaticon", "GUIDE: Inspect Pages", 21)), new WebBit_1.default("PWAIcon", 27, "GUIDE: Install the PWA applications", "Progressive websites have an installation option", new Date(2023, 5, 27), "guides/pwaicon.html", "img/app-development.webp", "App development icon", new AttributionLink_1.default("development icons", "Development icons created by Design Circle - Flaticon", "https://www.flaticon.com/free-icons/development", "Flaticon", "JavaScript", 27)), new WebBit_1.default("Clearcookies", 30, "GUIDE: Clear cookies quickly", "Don't waste time sifting through settings", new Date(2023, 7, 2), "guides/clearcookiesquickly.html", "img/cookies.webp", "Browser cookie icon", new AttributionLink_1.default("cookie icons", "Cookie icons created by Freepik - Flaticon", "https://www.flaticon.com/free-icons/cookie", "Flaticon", "GUIDE: Clear cookies quickly", 30)));
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

},{"../models/AttributionLink":28,"../models/WebBit":42}],23:[function(require,module,exports){
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

},{"../models/RWBLink":38}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = exports.render = exports.removePart = exports.ref = exports.range = exports.nothing = exports.notEqual = exports.noChange = exports.map = exports.live = exports.literal = exports.keyed = exports.join = exports.isTemplateResult = exports.isSingleExpression = exports.isServer = exports.isPrimitive = exports.isDirectiveResult = exports.isCompiledTemplateResult = exports.insertPart = exports.ifDefined = exports.html = exports.guard = exports.getDirectiveClass = exports.getCompatibleStyle = exports.getCommittedValue = exports.directive = exports.defaultConverter = exports.css = exports.createRef = exports.clearPart = exports.classMap = exports.choose = exports.cache = exports.asyncReplace = exports.asyncAppend = exports.adoptStyles = exports._$LH = exports._$LE = exports.UpdatingElement = exports.UntilDirective = exports.UnsafeHTMLDirective = exports.TemplateResultType = exports.ReactiveElement = exports.PartType = exports.LitElement = exports.Directive = exports.CSSResult = exports.AsyncReplaceDirective = exports.AsyncDirective = void 0;
exports.withStatic = exports.when = exports.until = exports.unsafeStatic = exports.unsafeSVG = exports.unsafeHTML = exports.unsafeCSS = exports.templateContent = exports.svg = exports.supportsAdoptingStyleSheets = exports.styleMap = exports.staticSvg = exports.staticHtml = exports.setCommittedValue = exports.setChildPartValue = void 0;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window, i = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), e = new WeakMap;
exports.supportsAdoptingStyleSheets = i;
class n {
    constructor(t, i, e) { if (this._$cssResult$ = !0, e !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead."); this.cssText = t, this.t = i; }
    get styleSheet() { let t = this.i; const s = this.t; if (i && void 0 === t) {
        const i = void 0 !== s && 1 === s.length;
        i && (t = e.get(s)), void 0 === t && ((this.i = t = new CSSStyleSheet).replaceSync(this.cssText), i && e.set(s, t));
    } return t; }
    toString() { return this.cssText; }
}
exports.CSSResult = n;
const o = t => new n("string" == typeof t ? t : t + "", void 0, s), r = (t, ...i) => { const e = 1 === t.length ? t[0] : i.reduce(((i, s, e) => i + (t => { if (!0 === t._$cssResult$)
    return t.cssText; if ("number" == typeof t)
    return t; throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."); })(s) + t[e + 1]), t[0]); return new n(e, t, s); }, l = (s, e) => { i ? s.adoptedStyleSheets = e.map((t => t instanceof CSSStyleSheet ? t : t.styleSheet)) : e.forEach((i => { const e = document.createElement("style"), n = t.litNonce; void 0 !== n && e.setAttribute("nonce", n), e.textContent = i.cssText, s.appendChild(e); })); }, h = i ? t => t : t => t instanceof CSSStyleSheet ? (t => { let i = ""; for (const s of t.cssRules)
    i += s.cssText; return o(i); })(t) : t;
exports.unsafeCSS = o;
exports.css = r;
exports.adoptStyles = l;
exports.getCompatibleStyle = h;
var u;
const c = window, d = c.trustedTypes, a = d ? d.emptyScript : "", v = c.reactiveElementPolyfillSupport, f = { toAttribute(t, i) { switch (i) {
        case Boolean:
            t = t ? a : null;
            break;
        case Object:
        case Array: t = null == t ? t : JSON.stringify(t);
    } return t; }, fromAttribute(t, i) { let s = t; switch (i) {
        case Boolean:
            s = null !== t;
            break;
        case Number:
            s = null === t ? null : Number(t);
            break;
        case Object:
        case Array: try {
            s = JSON.parse(t);
        }
        catch (t) {
            s = null;
        }
    } return s; } }, p = (t, i) => i !== t && (i == i || t == t), y = { attribute: !0, type: String, converter: f, reflect: !1, hasChanged: p }, b = "finalized";
exports.defaultConverter = f;
exports.notEqual = p;
class m extends HTMLElement {
    constructor() { super(), this.o = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this.l = null, this.u(); }
    static addInitializer(t) { var i; this.finalize(), (null !== (i = this.v) && void 0 !== i ? i : this.v = []).push(t); }
    static get observedAttributes() { this.finalize(); const t = []; return this.elementProperties.forEach(((i, s) => { const e = this.p(s, i); void 0 !== e && (this.m.set(e, s), t.push(e)); })), t; }
    static createProperty(t, i = y) { if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
        const s = "symbol" == typeof t ? Symbol() : "__" + t, e = this.getPropertyDescriptor(t, s, i);
        void 0 !== e && Object.defineProperty(this.prototype, t, e);
    } }
    static getPropertyDescriptor(t, i, s) { return { get() { return this[i]; }, set(e) { const n = this[t]; this[i] = e, this.requestUpdate(t, n, s); }, configurable: !0, enumerable: !0 }; }
    static getPropertyOptions(t) { return this.elementProperties.get(t) || y; }
    static finalize() { if (this.hasOwnProperty(b))
        return !1; this[b] = !0; const t = Object.getPrototypeOf(this); if (t.finalize(), void 0 !== t.v && (this.v = [...t.v]), this.elementProperties = new Map(t.elementProperties), this.m = new Map, this.hasOwnProperty("properties")) {
        const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
        for (const s of i)
            this.createProperty(s, t[s]);
    } return this.elementStyles = this.finalizeStyles(this.styles), !0; }
    static finalizeStyles(t) { const i = []; if (Array.isArray(t)) {
        const s = new Set(t.flat(1 / 0).reverse());
        for (const t of s)
            i.unshift(h(t));
    }
    else
        void 0 !== t && i.push(h(t)); return i; }
    static p(t, i) { const s = i.attribute; return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0; }
    u() { var t; this._ = new Promise((t => this.enableUpdating = t)), this._$AL = new Map, this.g(), this.requestUpdate(), null === (t = this.constructor.v) || void 0 === t || t.forEach((t => t(this))); }
    addController(t) { var i, s; (null !== (i = this.S) && void 0 !== i ? i : this.S = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t)); }
    removeController(t) { var i; null === (i = this.S) || void 0 === i || i.splice(this.S.indexOf(t) >>> 0, 1); }
    g() { this.constructor.elementProperties.forEach(((t, i) => { this.hasOwnProperty(i) && (this.o.set(i, this[i]), delete this[i]); })); }
    createRenderRoot() { var t; const i = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions); return l(i, this.constructor.elementStyles), i; }
    connectedCallback() { var t; void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this.S) || void 0 === t || t.forEach((t => { var i; return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t); })); }
    enableUpdating(t) { }
    disconnectedCallback() { var t; null === (t = this.S) || void 0 === t || t.forEach((t => { var i; return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t); })); }
    attributeChangedCallback(t, i, s) { this._$AK(t, s); }
    $(t, i, s = y) { var e; const n = this.constructor.p(t, s); if (void 0 !== n && !0 === s.reflect) {
        const o = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : f).toAttribute(i, s.type);
        this.l = t, null == o ? this.removeAttribute(n) : this.setAttribute(n, o), this.l = null;
    } }
    _$AK(t, i) { var s; const e = this.constructor, n = e.m.get(t); if (void 0 !== n && this.l !== n) {
        const t = e.getPropertyOptions(n), o = "function" == typeof t.converter ? { fromAttribute: t.converter } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : f;
        this.l = n, this[n] = o.fromAttribute(i, t.type), this.l = null;
    } }
    requestUpdate(t, i, s) { let e = !0; void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || p)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this.l !== t && (void 0 === this.C && (this.C = new Map), this.C.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._ = this.T()); }
    async T() { this.isUpdatePending = !0; try {
        await this._;
    }
    catch (t) {
        Promise.reject(t);
    } const t = this.scheduleUpdate(); return null != t && await t, !this.isUpdatePending; }
    scheduleUpdate() { return this.performUpdate(); }
    performUpdate() { var t; if (!this.isUpdatePending)
        return; this.hasUpdated, this.o && (this.o.forEach(((t, i) => this[i] = t)), this.o = void 0); let i = !1; const s = this._$AL; try {
        i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this.S) || void 0 === t || t.forEach((t => { var i; return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t); })), this.update(s)) : this.P();
    }
    catch (t) {
        throw i = !1, this.P(), t;
    } i && this._$AE(s); }
    willUpdate(t) { }
    _$AE(t) { var i; null === (i = this.S) || void 0 === i || i.forEach((t => { var i; return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t); })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t); }
    P() { this._$AL = new Map, this.isUpdatePending = !1; }
    get updateComplete() { return this.getUpdateComplete(); }
    getUpdateComplete() { return this._; }
    shouldUpdate(t) { return !0; }
    update(t) { void 0 !== this.C && (this.C.forEach(((t, i) => this.$(i, this[i], t))), this.C = void 0), this.P(); }
    updated(t) { }
    firstUpdated(t) { }
}
exports.ReactiveElement = m;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;
m[b] = !0, m.elementProperties = new Map, m.elementStyles = [], m.shadowRootOptions = { mode: "open" }, null == v || v({ ReactiveElement: m }), (null !== (u = c.reactiveElementVersions) && void 0 !== u ? u : c.reactiveElementVersions = []).push("1.6.3");
const w = window, _ = w.trustedTypes, $ = _ ? _.createPolicy("lit-html", { createHTML: t => t }) : void 0, S = "$lit$", T = `lit$${(Math.random() + "").slice(9)}$`, x = "?" + T, E = `<${x}>`, C = document, A = () => C.createComment(""), k = t => null === t || "object" != typeof t && "function" != typeof t, M = Array.isArray, P = t => M(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]), U = "[ \t\n\f\r]", V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, R = /-->/g, N = />/g, O = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), L = /'/g, j = /"/g, z = /^(?:script|style|textarea|title)$/i, H = t => (i, ...s) => ({ _$litType$: t, strings: i, values: s }), I = H(1), B = H(2), D = Symbol.for("lit-noChange"), W = Symbol.for("lit-nothing"), Z = new WeakMap, q = C.createTreeWalker(C, 129, null, !1);
exports.html = I;
exports.svg = B;
exports.noChange = D;
exports.nothing = W;
function F(t, i) { if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array"); return void 0 !== $ ? $.createHTML(i) : i; }
const G = (t, i) => { const s = t.length - 1, e = []; let n, o = 2 === i ? "<svg>" : "", r = V; for (let i = 0; i < s; i++) {
    const s = t[i];
    let l, h, u = -1, c = 0;
    for (; c < s.length && (r.lastIndex = c, h = r.exec(s), null !== h);)
        c = r.lastIndex, r === V ? "!--" === h[1] ? r = R : void 0 !== h[1] ? r = N : void 0 !== h[2] ? (z.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = O) : void 0 !== h[3] && (r = O) : r === O ? ">" === h[0] ? (r = null != n ? n : V, u = -1) : void 0 === h[1] ? u = -2 : (u = r.lastIndex - h[2].length, l = h[1], r = void 0 === h[3] ? O : '"' === h[3] ? j : L) : r === j || r === L ? r = O : r === R || r === N ? r = V : (r = O, n = void 0);
    const d = r === O && t[i + 1].startsWith("/>") ? " " : "";
    o += r === V ? s + E : u >= 0 ? (e.push(l), s.slice(0, u) + S + s.slice(u) + T + d) : s + T + (-2 === u ? (e.push(void 0), i) : d);
} return [F(t, o + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), e]; };
class J {
    constructor({ strings: t, _$litType$: i }, s) { let e; this.parts = []; let n = 0, o = 0; const r = t.length - 1, l = this.parts, [h, u] = G(t, i); if (this.el = J.createElement(h, s), q.currentNode = this.el.content, 2 === i) {
        const t = this.el.content, i = t.firstChild;
        i.remove(), t.append(...i.childNodes);
    } for (; null !== (e = q.nextNode()) && l.length < r;) {
        if (1 === e.nodeType) {
            if (e.hasAttributes()) {
                const t = [];
                for (const i of e.getAttributeNames())
                    if (i.endsWith(S) || i.startsWith(T)) {
                        const s = u[o++];
                        if (t.push(i), void 0 !== s) {
                            const t = e.getAttribute(s.toLowerCase() + S).split(T), i = /([.?@])?(.*)/.exec(s);
                            l.push({ type: 1, index: n, name: i[2], strings: t, ctor: "." === i[1] ? tt : "?" === i[1] ? st : "@" === i[1] ? et : X });
                        }
                        else
                            l.push({ type: 6, index: n });
                    }
                for (const i of t)
                    e.removeAttribute(i);
            }
            if (z.test(e.tagName)) {
                const t = e.textContent.split(T), i = t.length - 1;
                if (i > 0) {
                    e.textContent = _ ? _.emptyScript : "";
                    for (let s = 0; s < i; s++)
                        e.append(t[s], A()), q.nextNode(), l.push({ type: 2, index: ++n });
                    e.append(t[i], A());
                }
            }
        }
        else if (8 === e.nodeType)
            if (e.data === x)
                l.push({ type: 2, index: n });
            else {
                let t = -1;
                for (; -1 !== (t = e.data.indexOf(T, t + 1));)
                    l.push({ type: 7, index: n }), t += T.length - 1;
            }
        n++;
    } }
    static createElement(t, i) { const s = C.createElement("template"); return s.innerHTML = t, s; }
}
function K(t, i, s = t, e) { var n, o, r, l; if (i === D)
    return i; let h = void 0 !== e ? null === (n = s.A) || void 0 === n ? void 0 : n[e] : s.k; const u = k(i) ? void 0 : i._$litDirective$; return (null == h ? void 0 : h.constructor) !== u && (null === (o = null == h ? void 0 : h._$AO) || void 0 === o || o.call(h, !1), void 0 === u ? h = void 0 : (h = new u(t), h._$AT(t, s, e)), void 0 !== e ? (null !== (r = (l = s).A) && void 0 !== r ? r : l.A = [])[e] = h : s.k = h), void 0 !== h && (i = K(t, h._$AS(t, i.values), h, e)), i; }
class Y {
    constructor(t, i) { this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i; }
    get parentNode() { return this._$AM.parentNode; }
    get _$AU() { return this._$AM._$AU; }
    M(t) { var i; const { el: { content: s }, parts: e } = this._$AD, n = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : C).importNode(s, !0); q.currentNode = n; let o = q.nextNode(), r = 0, l = 0, h = e[0]; for (; void 0 !== h;) {
        if (r === h.index) {
            let i;
            2 === h.type ? i = new Q(o, o.nextSibling, this, t) : 1 === h.type ? i = new h.ctor(o, h.name, h.strings, this, t) : 6 === h.type && (i = new nt(o, this, t)), this._$AV.push(i), h = e[++l];
        }
        r !== (null == h ? void 0 : h.index) && (o = q.nextNode(), r++);
    } return q.currentNode = C, n; }
    U(t) { let i = 0; for (const s of this._$AV)
        void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++; }
}
class Q {
    constructor(t, i, s, e) { var n; this.type = 2, this._$AH = W, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this.N = null === (n = null == e ? void 0 : e.isConnected) || void 0 === n || n; }
    get _$AU() { var t, i; return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this.N; }
    get parentNode() { let t = this._$AA.parentNode; const i = this._$AM; return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t; }
    get startNode() { return this._$AA; }
    get endNode() { return this._$AB; }
    _$AI(t, i = this) { t = K(this, t, i), k(t) ? t === W || null == t || "" === t ? (this._$AH !== W && this._$AR(), this._$AH = W) : t !== this._$AH && t !== D && this.R(t) : void 0 !== t._$litType$ ? this.O(t) : void 0 !== t.nodeType ? this.V(t) : P(t) ? this.j(t) : this.R(t); }
    L(t) { return this._$AA.parentNode.insertBefore(t, this._$AB); }
    V(t) { this._$AH !== t && (this._$AR(), this._$AH = this.L(t)); }
    R(t) { this._$AH !== W && k(this._$AH) ? this._$AA.nextSibling.data = t : this.V(C.createTextNode(t)), this._$AH = t; }
    O(t) { var i; const { values: s, _$litType$: e } = t, n = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = J.createElement(F(e.h, e.h[0]), this.options)), e); if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === n)
        this._$AH.U(s);
    else {
        const t = new Y(n, this), i = t.M(this.options);
        t.U(s), this.V(i), this._$AH = t;
    } }
    _$AC(t) { let i = Z.get(t.strings); return void 0 === i && Z.set(t.strings, i = new J(t)), i; }
    j(t) { M(this._$AH) || (this._$AH = [], this._$AR()); const i = this._$AH; let s, e = 0; for (const n of t)
        e === i.length ? i.push(s = new Q(this.L(A()), this.L(A()), this, this.options)) : s = i[e], s._$AI(n), e++; e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e); }
    _$AR(t = this._$AA.nextSibling, i) { var s; for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
        const i = t.nextSibling;
        t.remove(), t = i;
    } }
    setConnected(t) { var i; void 0 === this._$AM && (this.N = t, null === (i = this._$AP) || void 0 === i || i.call(this, t)); }
}
class X {
    constructor(t, i, s, e, n) { this.type = 1, this._$AH = W, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = n, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = W; }
    get tagName() { return this.element.tagName; }
    get _$AU() { return this._$AM._$AU; }
    _$AI(t, i = this, s, e) { const n = this.strings; let o = !1; if (void 0 === n)
        t = K(this, t, i, 0), o = !k(t) || t !== this._$AH && t !== D, o && (this._$AH = t);
    else {
        const e = t;
        let r, l;
        for (t = n[0], r = 0; r < n.length - 1; r++)
            l = K(this, e[s + r], i, r), l === D && (l = this._$AH[r]), o || (o = !k(l) || l !== this._$AH[r]), l === W ? t = W : t !== W && (t += (null != l ? l : "") + n[r + 1]), this._$AH[r] = l;
    } o && !e && this.I(t); }
    I(t) { t === W ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : ""); }
}
class tt extends X {
    constructor() { super(...arguments), this.type = 3; }
    I(t) { this.element[this.name] = t === W ? void 0 : t; }
}
const it = _ ? _.emptyScript : "";
class st extends X {
    constructor() { super(...arguments), this.type = 4; }
    I(t) { t && t !== W ? this.element.setAttribute(this.name, it) : this.element.removeAttribute(this.name); }
}
class et extends X {
    constructor(t, i, s, e, n) { super(t, i, s, e, n), this.type = 5; }
    _$AI(t, i = this) { var s; if ((t = null !== (s = K(this, t, i, 0)) && void 0 !== s ? s : W) === D)
        return; const e = this._$AH, n = t === W && e !== W || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, o = t !== W && (e === W || n); n && this.element.removeEventListener(this.name, this, e), o && this.element.addEventListener(this.name, this, t), this._$AH = t; }
    handleEvent(t) { var i, s; "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t); }
}
class nt {
    constructor(t, i, s) { this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s; }
    get _$AU() { return this._$AM._$AU; }
    _$AI(t) { K(this, t); }
}
const ot = { H: S, B: T, D: x, q: 1, J: G, W: Y, Z: P, F: K, G: Q, K: X, X: st, Y: et, tt, it: nt }, rt = w.litHtmlPolyfillSupport;
exports._$LH = ot;
null == rt || rt(J, Q), (null !== (g = w.litHtmlVersions) && void 0 !== g ? g : w.litHtmlVersions = []).push("2.8.0");
const lt = (t, i, s) => { var e, n; const o = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i; let r = o._$litPart$; if (void 0 === r) {
    const t = null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n ? n : null;
    o._$litPart$ = r = new Q(i.insertBefore(A(), t), t, void 0, null != s ? s : {});
} return r._$AI(t), r; };
exports.render = lt;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var ht, ut;
const ct = m;
exports.UpdatingElement = ct;
class dt extends m {
    constructor() { super(...arguments), this.renderOptions = { host: this }, this.st = void 0; }
    createRenderRoot() { var t, i; const s = super.createRenderRoot(); return null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t || (i.renderBefore = s.firstChild), s; }
    update(t) { const i = this.render(); this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.st = lt(i, this.renderRoot, this.renderOptions); }
    connectedCallback() { var t; super.connectedCallback(), null === (t = this.st) || void 0 === t || t.setConnected(!0); }
    disconnectedCallback() { var t; super.disconnectedCallback(), null === (t = this.st) || void 0 === t || t.setConnected(!1); }
    render() { return D; }
}
exports.LitElement = dt;
dt.finalized = !0, dt._$litElement$ = !0, null === (ht = globalThis.litElementHydrateSupport) || void 0 === ht || ht.call(globalThis, { LitElement: dt });
const at = globalThis.litElementPolyfillSupport;
null == at || at({ LitElement: dt });
const vt = { _$AK: (t, i, s) => { t._$AK(i, s); }, _$AL: t => t._$AL };
exports._$LE = vt;
(null !== (ut = globalThis.litElementVersions) && void 0 !== ut ? ut : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = !1, { G: pt } = ot, yt = t => null === t || "object" != typeof t && "function" != typeof t, bt = { HTML: 1, SVG: 2 }, mt = (t, i) => void 0 === i ? void 0 !== (null == t ? void 0 : t._$litType$) : (null == t ? void 0 : t._$litType$) === i, gt = t => { var i; return null != (null === (i = null == t ? void 0 : t._$litType$) || void 0 === i ? void 0 : i.h); }, wt = t => void 0 !== (null == t ? void 0 : t._$litDirective$), _t = t => null == t ? void 0 : t._$litDirective$, $t = t => void 0 === t.strings, St = () => document.createComment(""), Tt = (t, i, s) => { var e; const n = t._$AA.parentNode, o = void 0 === i ? t._$AB : i._$AA; if (void 0 === s) {
    const i = n.insertBefore(St(), o), e = n.insertBefore(St(), o);
    s = new pt(i, e, t, t.options);
}
else {
    const i = s._$AB.nextSibling, r = s._$AM, l = r !== t;
    if (l) {
        let i;
        null === (e = s._$AQ) || void 0 === e || e.call(s, t), s._$AM = t, void 0 !== s._$AP && (i = t._$AU) !== r._$AU && s._$AP(i);
    }
    if (i !== o || l) {
        let t = s._$AA;
        for (; t !== i;) {
            const i = t.nextSibling;
            n.insertBefore(t, o), t = i;
        }
    }
} return s; }, xt = (t, i, s = t) => (t._$AI(i, s), t), Et = {}, Ct = (t, i = Et) => t._$AH = i, At = t => t._$AH, kt = t => { var i; null === (i = t._$AP) || void 0 === i || i.call(t, !1, !0); let s = t._$AA; const e = t._$AB.nextSibling; for (; s !== e;) {
    const t = s.nextSibling;
    s.remove(), s = t;
} }, Mt = t => { t._$AR(); }, Pt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ut = t => (...i) => ({ _$litDirective$: t, values: i });
exports.isServer = ft;
exports.isPrimitive = yt;
exports.TemplateResultType = bt;
exports.isTemplateResult = mt;
exports.isCompiledTemplateResult = gt;
exports.isDirectiveResult = wt;
exports.getDirectiveClass = _t;
exports.isSingleExpression = $t;
exports.insertPart = Tt;
exports.setChildPartValue = xt;
exports.setCommittedValue = Ct;
exports.getCommittedValue = At;
exports.removePart = kt;
exports.clearPart = Mt;
exports.PartType = Pt;
exports.directive = Ut;
class Vt {
    constructor(t) { }
    get _$AU() { return this._$AM._$AU; }
    _$AT(t, i, s) { this.et = t, this._$AM = i, this.nt = s; }
    _$AS(t, i) { return this.update(t, i); }
    update(t, i) { return this.render(...i); }
}
exports.Directive = Vt;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Rt = (t, i) => { var s, e; const n = t._$AN; if (void 0 === n)
    return !1; for (const t of n)
    null === (e = (s = t)._$AO) || void 0 === e || e.call(s, i, !1), Rt(t, i); return !0; }, Nt = t => { let i, s; do {
    if (void 0 === (i = t._$AM))
        break;
    s = i._$AN, s.delete(t), t = i;
} while (0 === (null == s ? void 0 : s.size)); }, Ot = t => { for (let i; i = t._$AM; t = i) {
    let s = i._$AN;
    if (void 0 === s)
        i._$AN = s = new Set;
    else if (s.has(t))
        break;
    s.add(t), zt(i);
} };
function Lt(t) { void 0 !== this._$AN ? (Nt(this), this._$AM = t, Ot(this)) : this._$AM = t; }
function jt(t, i = !1, s = 0) { const e = this._$AH, n = this._$AN; if (void 0 !== n && 0 !== n.size)
    if (i)
        if (Array.isArray(e))
            for (let t = s; t < e.length; t++)
                Rt(e[t], !1), Nt(e[t]);
        else
            null != e && (Rt(e, !1), Nt(e));
    else
        Rt(this, t); }
const zt = t => { var i, s, e, n; 2 == t.type && (null !== (i = (e = t)._$AP) && void 0 !== i || (e._$AP = jt), null !== (s = (n = t)._$AQ) && void 0 !== s || (n._$AQ = Lt)); };
class Ht extends Vt {
    constructor() { super(...arguments), this._$AN = void 0; }
    _$AT(t, i, s) { super._$AT(t, i, s), Ot(this), this.isConnected = t._$AU; }
    _$AO(t, i = !0) { var s, e; t !== this.isConnected && (this.isConnected = t, t ? null === (s = this.reconnected) || void 0 === s || s.call(this) : null === (e = this.disconnected) || void 0 === e || e.call(this)), i && (Rt(this, t), Nt(this)); }
    setValue(t) { if ($t(this.et))
        this.et._$AI(t, this);
    else {
        const i = [...this.et._$AH];
        i[this.nt] = t, this.et._$AI(i, this, 0);
    } }
    disconnected() { }
    reconnected() { }
}
exports.AsyncDirective = Ht;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class It {
    constructor(t) { this.ot = t; }
    disconnect() { this.ot = void 0; }
    reconnect(t) { this.ot = t; }
    deref() { return this.ot; }
}
class Bt {
    constructor() { this.rt = void 0, this.lt = void 0; }
    get() { return this.rt; }
    pause() { var t; null !== (t = this.rt) && void 0 !== t || (this.rt = new Promise((t => this.lt = t))); }
    resume() { var t; null === (t = this.lt) || void 0 === t || t.call(this), this.rt = this.lt = void 0; }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class Dt extends Ht {
    constructor() { super(...arguments), this.ht = new It(this), this.ut = new Bt; }
    render(t, i) { return D; }
    update(t, [i, s]) { if (this.isConnected || this.disconnected(), i === this.ct)
        return; this.ct = i; let e = 0; const { ht: n, ut: o } = this; return (async (t, i) => { for await (const s of t)
        if (!1 === await i(s))
            return; })(i, (async (t) => { for (; o.get();)
        await o.get(); const r = n.deref(); if (void 0 !== r) {
        if (r.ct !== i)
            return !1;
        void 0 !== s && (t = s(t, e)), r.commitValue(t, e), e++;
    } return !0; })), D; }
    commitValue(t, i) { this.setValue(t); }
    disconnected() { this.ht.disconnect(), this.ut.pause(); }
    reconnected() { this.ht.reconnect(this), this.ut.resume(); }
}
exports.AsyncReplaceDirective = Dt;
const Wt = Ut(Dt), Zt = Ut(
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Dt {
    constructor(t) { if (super(t), 2 !== t.type)
        throw Error("asyncAppend can only be used in child expressions"); }
    update(t, i) { return this.st = t, super.update(t, i); }
    commitValue(t, i) { 0 === i && Mt(this.st); const s = Tt(this.st); xt(s, t); }
}), qt = t => gt(t) ? t._$litType$.h : t.strings, Ft = Ut(class extends Vt {
    constructor(t) { super(t), this.dt = new WeakMap; }
    render(t) { return [t]; }
    update(t, [i]) { const s = mt(this.vt) ? qt(this.vt) : null, e = mt(i) ? qt(i) : null; if (null !== s && (null === e || s !== e)) {
        const i = At(t).pop();
        let e = this.dt.get(s);
        if (void 0 === e) {
            const t = document.createDocumentFragment();
            e = lt(W, t), e.setConnected(!1), this.dt.set(s, e);
        }
        Ct(e, [i]), Tt(e, void 0, i);
    } if (null !== e) {
        if (null === s || s !== e) {
            const i = this.dt.get(e);
            if (void 0 !== i) {
                const s = At(i).pop();
                Mt(t), Tt(t, void 0, s), Ct(t, [s]);
            }
        }
        this.vt = i;
    }
    else
        this.vt = void 0; return this.render(i); }
}), Gt = (t, i, s) => { for (const s of i)
    if (s[0] === t)
        return (0, s[1])(); return null == s ? void 0 : s(); }, Jt = Ut(
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) { var i; if (super(t), 1 !== t.type || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."); }
    render(t) { return " " + Object.keys(t).filter((i => t[i])).join(" ") + " "; }
    update(t, [i]) { var s, e; if (void 0 === this.ft) {
        this.ft = new Set, void 0 !== t.strings && (this.yt = new Set(t.strings.join(" ").split(/\s/).filter((t => "" !== t))));
        for (const t in i)
            i[t] && !(null === (s = this.yt) || void 0 === s ? void 0 : s.has(t)) && this.ft.add(t);
        return this.render(i);
    } const n = t.element.classList; this.ft.forEach((t => { t in i || (n.remove(t), this.ft.delete(t)); })); for (const t in i) {
        const s = !!i[t];
        s === this.ft.has(t) || (null === (e = this.yt) || void 0 === e ? void 0 : e.has(t)) || (s ? (n.add(t), this.ft.add(t)) : (n.remove(t), this.ft.delete(t)));
    } return D; }
}), Kt = {}, Yt = Ut(class extends Vt {
    constructor() { super(...arguments), this.bt = Kt; }
    render(t, i) { return i(); }
    update(t, [i, s]) { if (Array.isArray(i)) {
        if (Array.isArray(this.bt) && this.bt.length === i.length && i.every(((t, i) => t === this.bt[i])))
            return D;
    }
    else if (this.bt === i)
        return D; return this.bt = Array.isArray(i) ? Array.from(i) : i, this.render(i, s); }
}), Qt = t => null != t ? t : W;
exports.asyncReplace = Wt;
exports.asyncAppend = Zt;
exports.cache = Ft;
exports.choose = Gt;
exports.classMap = Jt;
exports.guard = Yt;
exports.ifDefined = Qt;
function* Xt(t, i) { const s = "function" == typeof i; if (void 0 !== t) {
    let e = -1;
    for (const n of t)
        e > -1 && (yield s ? i(e) : i), e++, yield n;
} }
exports.join = Xt;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ti = Ut(class extends Vt {
    constructor() { super(...arguments), this.key = W; }
    render(t, i) { return this.key = t, i; }
    update(t, [i, s]) { return i !== this.key && (Ct(t), this.key = i), s; }
}), ii = Ut(
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) { if (super(t), 3 !== t.type && 1 !== t.type && 4 !== t.type)
        throw Error("The `live` directive is not allowed on child or event bindings"); if (!$t(t))
        throw Error("`live` bindings can only contain a single expression"); }
    render(t) { return t; }
    update(t, [i]) { if (i === D || i === W)
        return i; const s = t.element, e = t.name; if (3 === t.type) {
        if (i === s[e])
            return D;
    }
    else if (4 === t.type) {
        if (!!i === s.hasAttribute(e))
            return D;
    }
    else if (1 === t.type && s.getAttribute(e) === i + "")
        return D; return Ct(t), i; }
});
exports.keyed = ti;
exports.live = ii;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* si(t, i) { if (void 0 !== t) {
    let s = 0;
    for (const e of t)
        yield i(e, s++);
} }
exports.map = si;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function* ei(t, i, s = 1) { const e = void 0 === i ? 0 : t; null != i || (i = t); for (let t = e; s > 0 ? t < i : i < t; t += s)
    yield t; }
exports.range = ei;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ni = () => new oi;
exports.createRef = ni;
class oi {
}
const ri = new WeakMap, li = Ut(class extends Ht {
    render(t) { return W; }
    update(t, [i]) { var s; const e = i !== this.ot; return e && void 0 !== this.ot && this.gt(void 0), (e || this.wt !== this._t) && (this.ot = i, this.$t = null === (s = t.options) || void 0 === s ? void 0 : s.host, this.gt(this._t = t.element)), W; }
    gt(t) { var i; if ("function" == typeof this.ot) {
        const s = null !== (i = this.$t) && void 0 !== i ? i : globalThis;
        let e = ri.get(s);
        void 0 === e && (e = new WeakMap, ri.set(s, e)), void 0 !== e.get(this.ot) && this.ot.call(this.$t, void 0), e.set(this.ot, t), void 0 !== t && this.ot.call(this.$t, t);
    }
    else
        this.ot.value = t; }
    get wt() { var t, i, s; return "function" == typeof this.ot ? null === (i = ri.get(null !== (t = this.$t) && void 0 !== t ? t : globalThis)) || void 0 === i ? void 0 : i.get(this.ot) : null === (s = this.ot) || void 0 === s ? void 0 : s.value; }
    disconnected() { this.wt === this._t && this.gt(void 0); }
    reconnected() { this.gt(this._t); }
}), hi = (t, i, s) => { const e = new Map; for (let n = i; n <= s; n++)
    e.set(t[n], n); return e; }, ui = Ut(class extends Vt {
    constructor(t) { if (super(t), 2 !== t.type)
        throw Error("repeat() can only be used in text expressions"); }
    St(t, i, s) { let e; void 0 === s ? s = i : void 0 !== i && (e = i); const n = [], o = []; let r = 0; for (const i of t)
        n[r] = e ? e(i, r) : r, o[r] = s(i, r), r++; return { values: o, keys: n }; }
    render(t, i, s) { return this.St(t, i, s).values; }
    update(t, [i, s, e]) { var n; const o = At(t), { values: r, keys: l } = this.St(i, s, e); if (!Array.isArray(o))
        return this.Tt = l, r; const h = null !== (n = this.Tt) && void 0 !== n ? n : this.Tt = [], u = []; let c, d, a = 0, v = o.length - 1, f = 0, p = r.length - 1; for (; a <= v && f <= p;)
        if (null === o[a])
            a++;
        else if (null === o[v])
            v--;
        else if (h[a] === l[f])
            u[f] = xt(o[a], r[f]), a++, f++;
        else if (h[v] === l[p])
            u[p] = xt(o[v], r[p]), v--, p--;
        else if (h[a] === l[p])
            u[p] = xt(o[a], r[p]), Tt(t, u[p + 1], o[a]), a++, p--;
        else if (h[v] === l[f])
            u[f] = xt(o[v], r[f]), Tt(t, o[a], o[v]), v--, f++;
        else if (void 0 === c && (c = hi(l, f, p), d = hi(h, a, v)), c.has(h[a]))
            if (c.has(h[v])) {
                const i = d.get(l[f]), s = void 0 !== i ? o[i] : null;
                if (null === s) {
                    const i = Tt(t, o[a]);
                    xt(i, r[f]), u[f] = i;
                }
                else
                    u[f] = xt(s, r[f]), Tt(t, o[a], s), o[i] = null;
                f++;
            }
            else
                kt(o[v]), v--;
        else
            kt(o[a]), a++; for (; f <= p;) {
        const i = Tt(t, u[p + 1]);
        xt(i, r[f]), u[f++] = i;
    } for (; a <= v;) {
        const t = o[a++];
        null !== t && kt(t);
    } return this.Tt = l, Ct(t, u), D; }
}), ci = "important", di = " !" + ci, ai = Ut(class extends Vt {
    constructor(t) { var i; if (super(t), 1 !== t.type || "style" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."); }
    render(t) { return Object.keys(t).reduce(((i, s) => { const e = t[s]; return null == e ? i : i + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${e};`; }), ""); }
    update(t, [i]) { const { style: s } = t.element; if (void 0 === this.xt) {
        this.xt = new Set;
        for (const t in i)
            this.xt.add(t);
        return this.render(i);
    } this.xt.forEach((t => { null == i[t] && (this.xt.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = ""); })); for (const t in i) {
        const e = i[t];
        if (null != e) {
            this.xt.add(t);
            const i = "string" == typeof e && e.endsWith(di);
            t.includes("-") || i ? s.setProperty(t, i ? e.slice(0, -11) : e, i ? ci : "") : s[t] = e;
        }
    } return D; }
}), vi = Ut(
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) { if (super(t), 2 !== t.type)
        throw Error("templateContent can only be used in child bindings"); }
    render(t) { return this.Et === t ? D : (this.Et = t, document.importNode(t.content, !0)); }
});
exports.ref = li;
exports.repeat = ui;
exports.styleMap = ai;
exports.templateContent = vi;
class fi extends Vt {
    constructor(t) { if (super(t), this.vt = W, 2 !== t.type)
        throw Error(this.constructor.directiveName + "() can only be used in child bindings"); }
    render(t) { if (t === W || null == t)
        return this.Ct = void 0, this.vt = t; if (t === D)
        return t; if ("string" != typeof t)
        throw Error(this.constructor.directiveName + "() called with a non-string value"); if (t === this.vt)
        return this.Ct; this.vt = t; const i = [t]; return i.raw = i, this.Ct = { _$litType$: this.constructor.resultType, strings: i, values: [] }; }
}
exports.UnsafeHTMLDirective = fi;
fi.directiveName = "unsafeHTML", fi.resultType = 1;
const pi = Ut(fi);
exports.unsafeHTML = pi;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class yi extends fi {
}
yi.directiveName = "unsafeSVG", yi.resultType = 2;
const bi = Ut(yi), mi = t => !yt(t) && "function" == typeof t.then, gi = 1073741823;
exports.unsafeSVG = bi;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class wi extends Ht {
    constructor() { super(...arguments), this.At = gi, this.kt = [], this.ht = new It(this), this.ut = new Bt; }
    render(...t) { var i; return null !== (i = t.find((t => !mi(t)))) && void 0 !== i ? i : D; }
    update(t, i) { const s = this.kt; let e = s.length; this.kt = i; const n = this.ht, o = this.ut; this.isConnected || this.disconnected(); for (let t = 0; t < i.length && !(t > this.At); t++) {
        const r = i[t];
        if (!mi(r))
            return this.At = t, r;
        t < e && r === s[t] || (this.At = gi, e = 0, Promise.resolve(r).then((async (t) => { for (; o.get();)
            await o.get(); const i = n.deref(); if (void 0 !== i) {
            const s = i.kt.indexOf(r);
            s > -1 && s < i.At && (i.At = s, i.setValue(t));
        } })));
    } return D; }
    disconnected() { this.ht.disconnect(), this.ut.pause(); }
    reconnected() { this.ht.reconnect(this), this.ut.resume(); }
}
exports.UntilDirective = wi;
const _i = Ut(wi);
exports.until = _i;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $i(t, i, s) { return t ? i() : null == s ? void 0 : s(); }
exports.when = $i;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Si = Symbol.for(""), Ti = t => { if ((null == t ? void 0 : t.r) === Si)
    return null == t ? void 0 : t._$litStatic$; }, xi = t => ({ _$litStatic$: t, r: Si }), Ei = (t, ...i) => ({ _$litStatic$: i.reduce(((i, s, e) => i + (t => { if (void 0 !== t._$litStatic$)
        return t._$litStatic$; throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`); })(s) + t[e + 1]), t[0]), r: Si }), Ci = new Map, Ai = t => (i, ...s) => { const e = s.length; let n, o; const r = [], l = []; let h, u = 0, c = !1; for (; u < e;) {
    for (h = i[u]; u < e && void 0 !== (o = s[u], n = Ti(o));)
        h += n + i[++u], c = !0;
    u !== e && l.push(o), r.push(h), u++;
} if (u === e && r.push(i[e]), c) {
    const t = r.join("$$lit$$");
    void 0 === (i = Ci.get(t)) && (r.raw = r, Ci.set(t, i = r)), s = l;
} return t(i, ...s); }, ki = Ai(I), Mi = Ai(B);
exports.unsafeStatic = xi;
exports.literal = Ei;
exports.withStatic = Ai;
exports.staticHtml = ki;
exports.staticSvg = Mi;


},{}],26:[function(require,module,exports){
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

},{"./components/ClassComponents":2,"./components/HeaderFooter":7,"./components/PageComponents":8,"./components/mobileMarkup":20,"./models/ScriptPerf":40}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./RWBLink":38}],29:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class CardsSlideShow {
    cards;
    cardquantshow;
    cardindxstart = 0;
    cardsindxend;
    turn = 0;
    maxturncount;
    slideshowcontainer = document.querySelector(".cardslideshow");
    prevbtn;
    nextbtn;
    constructor(cards, quantityshow) {
        this.cards = cards;
        this.cardquantshow = quantityshow;
        this.cardsindxend = this.cardquantshow - 1;
        this.maxturncount = this.cards.length - this.cardquantshow;
    }
}
exports.default = CardsSlideShow;

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"../models/API":27,"./DictionarySearchMarkup":32,"./RWBErrorBus":36,"./RWBJSONConverter":37}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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
    static checkElementorNull(componentname, cssquery, logmessage, supressexception) {
        let elem;
        let logmssg = true; //Log message option default
        if (!logmessage)
            logmssg = logmessage;
        let supressexcpt = false; //Supress message option default
        if (supressexception)
            supressexcpt = true;
        let query = `${cssquery}`;
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

},{}],37:[function(require,module,exports){
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

},{"./RWBErrorBus":36}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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
            aaCardsSection.classList.add('card_columns', 'cardslideshow', 'grid');
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
        });
        return AAs;
    }
}
exports.RandomWebBits = RandomWebBits;

},{"../components/RWBCard":9}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./RWBErrorBus":36,"./RWBJSONConverter":37}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}]},{},[26])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy80MDQudHMiLCJzcmMvY29tcG9uZW50cy9DbGFzc0NvbXBvbmVudHMudHMiLCJzcmMvY29tcG9uZW50cy9EaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvRXhwYW5kaW5nTGlzdERPTVdpZGdldC50cyIsInNyYy9jb21wb25lbnRzL0ZsYXNoY2FyZEdhbWVXaWRnZXQudHMiLCJzcmMvY29tcG9uZW50cy9Hcm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL0hlYWRlckZvb3Rlci50cyIsInNyYy9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvUldCQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL1NsaWRlU2hvd1dpZGdldC50cyIsInNyYy9jb21wb25lbnRzL1RvRG9zV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvV2ViQml0cy50cyIsInNyYy9jb21wb25lbnRzL1dlYkJpdHNTbGlkZXNob3cudHMiLCJzcmMvY29tcG9uZW50cy9hY3Jvbnltcy1lbGVtZW50LnRzIiwic3JjL2NvbXBvbmVudHMvY29sb3Jjb2RlLnRzIiwic3JjL2NvbXBvbmVudHMvY29sb3Jjb2RldXJsLnRzIiwic3JjL2NvbXBvbmVudHMvY3NzZXgudHMiLCJzcmMvY29tcG9uZW50cy9kb21haW5sb29rdXAudHMiLCJzcmMvY29tcG9uZW50cy9oc2xjb2xvci50cyIsInNyYy9jb21wb25lbnRzL21vYmlsZU1hcmt1cC50cyIsInNyYy9jb21wb25lbnRzL3NsaWRlcmJhci50cyIsInNyYy9kYXRhL2RhdGEudHMiLCJzcmMvZGF0YS9uYXZpdGVtcy50cyIsInNyYy9kYXRhL3BvcnRudW1zLnRzIiwic3JjL2pzL2xpdC1hbGwubWluLmpzIiwic3JjL21haW4udHMiLCJzcmMvbW9kZWxzL0FQSS50cyIsInNyYy9tb2RlbHMvQXR0cmlidXRpb25MaW5rLnRzIiwic3JjL21vZGVscy9DYXJkc1NsaWRlU2hvdy50cyIsInNyYy9tb2RlbHMvQ29sb3JDb2RlLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9EaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnRzIiwic3JjL21vZGVscy9FeHBhbmRpbmdMaXN0LnRzIiwic3JjL21vZGVscy9GbGFzaGNhcmRDYXJkRWxlbXMudHMiLCJzcmMvbW9kZWxzL0dyb3dpbmdDYXJkLnRzIiwic3JjL21vZGVscy9SV0JFcnJvckJ1cy50cyIsInNyYy9tb2RlbHMvUldCSlNPTkNvbnZlcnRlci50cyIsInNyYy9tb2RlbHMvUldCTGluay50cyIsInNyYy9tb2RlbHMvUmFuZG9tV2ViQml0cy50cyIsInNyYy9tb2RlbHMvU2NyaXB0UGVyZi50cyIsInNyYy9tb2RlbHMvVG9Eby50cyIsInNyYy9tb2RlbHMvV2ViQml0LnRzIiwic3JjL21vZGVscy9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHVDQUF1QztBQUN2Qyw2Q0FBeUM7QUFFekMsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1AsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUYsYUFBYSxDQUFDLFdBQVcs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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxrQkFBa0IsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLFlBQVksYUFBYSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsR0FBQyxNQUFNLENBQUMsR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUEsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLFlBQVksYUFBYSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUEsS0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUTtJQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUszeUM7QUE0RzR1QyxzQkFBUztBQUFub0IsZ0JBQUc7QUFBakksd0JBQVc7QUFBMEwsK0JBQWtCO0FBNUczc0IsSUFBSSxDQUFDLENBQUM7QUFBQSxNQUFNLENBQUMsR0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQSxDQUFDLENBQUEsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsOEJBQThCLEVBQUMsQ0FBQyxHQUFDLEVBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsUUFBTyxDQUFDLEVBQUM7UUFBQyxLQUFLLE9BQU87WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQztZQUFBLE1BQU07UUFBQSxLQUFLLE1BQU0sQ0FBQztRQUFBLEtBQUssS0FBSyxDQUFDLENBQUEsQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBTyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsUUFBTyxDQUFDLEVBQUM7UUFBQyxLQUFLLE9BQU87WUFBQyxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQztZQUFBLE1BQU07UUFBQSxLQUFLLE1BQU07WUFBQyxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFBLENBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQUEsS0FBSyxNQUFNLENBQUM7UUFBQSxLQUFLLEtBQUssQ0FBQyxDQUFBLElBQUc7WUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFDO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFBO1NBQUM7S0FBQyxDQUFBLE9BQU8sQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEdBQUMsV0FBVyxDQUFDO0FBNEdnSSw2QkFBZ0I7QUFBcVcscUJBQVE7QUE1RzdmLE1BQU0sQ0FBRSxTQUFRLFdBQVc7SUFBQyxnQkFBYyxLQUFLLEVBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRyxFQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLEtBQUssa0JBQWtCLEtBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLElBQUcsQ0FBQyxDQUFDLEtBQUssSUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUM7UUFBQyxNQUFNLENBQUMsR0FBQyxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLE1BQU0sRUFBRSxDQUFBLENBQUMsQ0FBQSxJQUFJLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE9BQU0sRUFBQyxHQUFHLEtBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsSUFBRSxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxRQUFRLEtBQUcsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUM7UUFBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBTyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQztRQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUM7O1FBQUssS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBLE9BQU0sQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxDQUFDLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLGFBQWEsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsS0FBRyxJQUFJLENBQUMsVUFBVSxJQUFFLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsZ0JBQWdCLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsQ0FBQyxLQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLGdCQUFnQixLQUFHLElBQUksQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsaUJBQWlCLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQSxLQUFLLENBQUMsS0FBRyxJQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLE9BQU8sSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxjQUFjLENBQUMsQ0FBQyxJQUFFLENBQUM7SUFBQSxvQkFBb0IsS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsd0JBQXdCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUM7UUFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUE7S0FBQyxDQUFBLENBQUM7SUFBQSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBRyxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsS0FBRyxDQUFDLEVBQUM7UUFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFVBQVUsSUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFBLEVBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQUEsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQTtLQUFDLENBQUEsQ0FBQztJQUFBLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsS0FBSyxDQUFDLEtBQUcsSUFBSSxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFHLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxLQUFLLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHO1FBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQUM7SUFBQSxPQUFNLENBQUMsRUFBQztRQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBLE9BQU8sSUFBSSxJQUFFLENBQUMsSUFBRSxNQUFNLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUEsQ0FBQSxDQUFDO0lBQUEsY0FBYyxLQUFHLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBLENBQUEsQ0FBQztJQUFBLGFBQWEsS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZTtRQUFDLE9BQU8sQ0FBQSxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsSUFBRztRQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENB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QUFNLENBQUMsR0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBQyxRQUFRLEVBQUMsQ0FBQyxHQUFDLEdBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsSUFBSSxLQUFHLENBQUMsSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLE9BQU8sQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxVQUFVLElBQUUsT0FBTSxDQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGFBQWEsRUFBQyxDQUFDLEdBQUMscURBQXFELEVBQUMsQ0FBQyxHQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLG9DQUFvQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxPQUFPLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBc0doTSxpQkFBSTtBQUFvZCxnQkFBRztBQUE5TyxxQkFBUTtBQUFvQixvQkFBTztBQXRHaEYsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQUMsTUFBTSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFBLE9BQU8sS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQSxDQUFDO0FBQUEsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQSxDQUFDLENBQUEsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0lBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUEsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBQUEsT0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUM7UUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQUcsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxHQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQUEsTUFBTSxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBRyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7SUFBQSxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0NBQUMsQ0FBQSxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxRQUFRLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7QUFBQSxNQUFNLENBQUM7SUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsQ0FBQSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDLEtBQUcsQ0FBQyxFQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBSyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUU7UUFBQyxJQUFHLENBQUMsS0FBRyxDQUFDLENBQUMsUUFBUSxFQUFDO1lBQUMsSUFBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUM7Z0JBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFO29CQUFDLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFDO3dCQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUM7NEJBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxHQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFBLEdBQUcsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUEsR0FBRyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFBO3lCQUFDOzs0QkFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtxQkFBQztnQkFBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUFDO1lBQUEsSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQztnQkFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7Z0JBQUEsSUFBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDO29CQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7b0JBQUEsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUU7d0JBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztvQkFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2lCQUFDO2FBQUM7U0FBQzthQUFLLElBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxRQUFRO1lBQUMsSUFBRyxDQUFDLENBQUMsSUFBSSxLQUFHLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQUk7Z0JBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsT0FBSyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQTthQUFDO1FBQUEsQ0FBQyxFQUFFLENBQUE7S0FBQyxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDO0FBQUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxLQUFHLENBQUM7SUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLElBQUksQ0FBQyxHQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUEsT0FBTSxDQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEdBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0FBQUEsTUFBTSxDQUFDO0lBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxVQUFVLEtBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFBLENBQUM7SUFBQSxJQUFJLElBQUksS0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUEsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxNQUFLLEVBQUMsRUFBRSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxDQUFBLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLE9BQUssS0FBSyxDQUFDLEtBQUcsQ0FBQyxHQUFFO1FBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEtBQUssRUFBQztZQUFDLElBQUksQ0FBQyxDQUFDO1lBQUEsQ0FBQyxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQUM7UUFBQSxDQUFDLEtBQUcsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7UUFBQyxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQSxDQUFBLENBQUM7Q0FBQztBQUFBLE1BQU0sQ0FBQztJQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxJQUFJLEtBQUcsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxVQUFVLEtBQUcsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsT0FBTyxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsRUFBRSxLQUFHLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLElBQUksU0FBUyxLQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQSxDQUFBLENBQUM7SUFBQSxJQUFJLE9BQU8sS0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsS0FBRyxDQUFDLElBQUUsSUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQyxJQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsSUFBSSxLQUFHLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxNQUFLLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQztRQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUk7UUFBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLE9BQU8sS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQztRQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsS0FBSSxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxJQUFJLEdBQUU7UUFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FBQyxDQUFBLENBQUM7SUFBQSxZQUFZLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsS0FBSyxDQUFDLEtBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0NBQUM7QUFBQSxNQUFNLENBQUM7SUFBQyxZQUFZLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRSxFQUFFLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxJQUFJLE9BQU8sS0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBLENBQUEsQ0FBQztJQUFBLElBQUksSUFBSSxLQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsTUFBTSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBRyxLQUFLLENBQUMsS0FBRyxDQUFDO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsQ0FBQyxLQUFHLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUk7UUFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUM7UUFBQSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7UUFBQSxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDO0FBQUEsTUFBTSxFQUFHLFNBQVEsQ0FBQztJQUFDLGdCQUFjLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFBLENBQUM7Q0FBQztBQUFBLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO0FBQUEsTUFBTSxFQUFHLFNBQVEsQ0FBQztJQUFDLGdCQUFjLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUM7Q0FBQztBQUFBLE1BQU0sRUFBRyxTQUFRLENBQUM7SUFBQyxZQUFZLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUcsQ0FBQztRQUFDLE9BQU8sQ0FBQSxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBRyxDQUFDLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsT0FBTyxLQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsV0FBVyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxVQUFVLElBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDO0FBQUEsTUFBTSxFQUFFO0lBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLElBQUksSUFBSSxLQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDO0FBQUEsTUFBTSxFQUFFLEdBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUM7QUFzRy9rTyxrQkFBSTtBQXRHMmtPLElBQUksSUFBRSxFQUFFLElBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxlQUFlLEdBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQUEsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsSUFBSSxD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T0FBTyxDQUFDLENBQUM7QUFDeGhDOzs7O0dBSUc7QUFDSCxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsSUFBSSxLQUFHLENBQUMsSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLE9BQU8sQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUcsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLElBQUUsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsZUFBZSxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUMsRUFBRSxHQUFDLEdBQUUsRUFBRSxDQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFDO0lBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7Q0FBQztLQUFJO0lBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLENBQUM7SUFBQSxJQUFHLENBQUMsRUFBQztRQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUM7SUFBQSxJQUFHLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxFQUFDO1FBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUFBLE9BQUssQ0FBQyxLQUFHLENBQUMsR0FBRTtZQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFBQSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1NBQUM7S0FBQztDQUFDLENBQUEsT0FBTyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsT0FBSyxDQUFDLEtBQUcsQ0FBQyxHQUFFO0lBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0NBQUMsQ0FBQSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLGlCQUFpQixFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEVBQUMsZUFBZSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQTJGbFYsc0JBQVE7QUFBMUIseUJBQVc7QUFBbGUsZ0NBQWtCO0FBQStmLDhCQUFnQjtBQUFqSSxzQ0FBd0I7QUFBTywrQkFBaUI7QUFBL0gsK0JBQWlCO0FBQXNKLGdDQUFrQjtBQUEzSCx3QkFBVTtBQUFtVCwrQkFBaUI7QUFBTywrQkFBaUI7QUFBcGQsK0JBQWlCO0FBQStXLHdCQUFVO0FBQXpkLHVCQUFTO0FBQS9QLHNCQUFRO0FBQTZTLHVCQUFTO0FBM0ZpaUIsTUFBTSxFQUFFO0lBQUMsWUFBWSxDQUFDLElBQUUsQ0FBQztJQUFBLElBQUksSUFBSSxLQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0NBQUM7QUEyRjlpQyx1QkFBUztBQTFGelU7Ozs7R0FJRyxDQUFBLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLEtBQUcsQ0FBQztJQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxPQUFNLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUU7SUFBQyxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFBQyxNQUFNO0lBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0NBQUMsUUFBTSxDQUFDLEtBQUcsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUEsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLEtBQUksSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztJQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFBQSxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUM7UUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBQyxJQUFJLEdBQUcsQ0FBQztTQUFLLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNO0lBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7Q0FBQyxDQUFBLENBQUMsQ0FBQztBQUFBLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0FBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUk7SUFBQyxJQUFHLENBQUM7UUFBQyxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFO2dCQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQUssSUFBSSxJQUFFLENBQUMsSUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFBSyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztBQUFBLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7QUFBQSxNQUFNLEVBQUcsU0FBUSxFQUFFO0lBQUMsZ0JBQWMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxLQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLFFBQVEsQ0FBQyxDQUFDLElBQUUsSUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUFJO1FBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxDQUFDO0lBQUEsWUFBWSxLQUFHLENBQUM7SUFBQSxXQUFXLEtBQUcsQ0FBQztDQUFDO0FBc0ZuL0IsNEJBQWM7QUFyRjlROzs7O0dBSUcsQ0FBQSxNQUFNLEVBQUU7SUFBQyxZQUFZLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxVQUFVLEtBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxTQUFTLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLEtBQUssS0FBRyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQSxDQUFDO0NBQUM7QUFBQSxNQUFNLEVBQUU7SUFBQyxnQkFBYyxJQUFJLENBQUMsRUFBRSxHQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsR0FBRyxLQUFHLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFBLENBQUM7SUFBQSxLQUFLLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEtBQUssQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDO0FBQ2xXOzs7O0dBSUcsQ0FBQSxNQUFNLEVBQUcsU0FBUSxFQUFFO0lBQUMsZ0JBQWMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLEVBQUU7UUFBQyxPQUFPLENBQUEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEdBQUMsSUFBSSxDQUFDLENBQUEsT0FBTSxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxJQUFJLEtBQUssRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsSUFBRyxDQUFDLENBQUMsS0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFNLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQSxFQUFFLEdBQUMsT0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQSxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBQztRQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBRyxDQUFDO1lBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQztRQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUE7S0FBQyxDQUFBLE9BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLFlBQVksS0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQSxDQUFDO0lBQUEsV0FBVyxLQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDO0NBQUM7QUE0RWpVLG1DQUFxQjtBQTVFNFMsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFFO0FBQzNtQjs7OztHQUlHO0FBQ0gsS0FBTSxTQUFRLEVBQUU7SUFBQyxZQUFZLENBQUMsSUFBRSxJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUk7UUFBQyxNQUFNLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0NBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxLQUFNLFNBQVEsRUFBRTtJQUFDLFlBQVksQ0FBQyxJQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksT0FBTyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUUsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxNQUFNLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQSxJQUFHLElBQUksS0FBRyxDQUFDLElBQUUsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsRUFBQztRQUFDLE1BQU0sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUFBLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsSUFBRyxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUM7WUFBQyxNQUFNLENBQUMsR0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUFBLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQztRQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxDQUFBLElBQUcsSUFBSSxLQUFHLENBQUMsRUFBQztRQUFDLElBQUcsSUFBSSxLQUFHLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxFQUFDO1lBQUMsTUFBTSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQSxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBQztnQkFBQyxNQUFNLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFBQztTQUFDO1FBQUEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7S0FBQzs7UUFBSyxJQUFJLENBQUMsRUFBRSxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsS0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQztRQUFDLE9BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLE9BQU8sSUFBSSxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFFO0FBQ2w0Qjs7OztHQUlHO0FBQ0gsS0FBTSxTQUFRLEVBQUU7SUFBQyxZQUFZLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsSUFBSSxJQUFFLE9BQU8sS0FBRyxDQUFDLENBQUMsSUFBSSxJQUFFLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQztRQUFDLE1BQU0sS0FBSyxDQUFDLG9HQUFvRyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsSUFBRSxPQUFNLEdBQUcsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLEtBQUssQ0FBQyxLQUFHLElBQUksQ0FBQyxFQUFFLEVBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksR0FBRyxFQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLElBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLEVBQUUsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsS0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7UUFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyxLQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBQSxDQUFBLENBQUM7Q0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLEVBQUUsRUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEtBQU0sU0FBUSxFQUFFO0lBQUMsZ0JBQWMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEtBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLENBQUE7S0FBQztTQUFLLElBQUcsSUFBSSxDQUFDLEVBQUUsS0FBRyxDQUFDO1FBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FLaHFDO0FBMkR3aEIsMEJBQVk7QUFBOUIseUJBQVc7QUFBMEIsbUJBQUs7QUFBTyxvQkFBTTtBQUFPLHNCQUFRO0FBQThKLG1CQUFLO0FBQWlCLHVCQUFTO0FBM0R6d0IsUUFBUSxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsTUFBTSxDQUFDLEdBQUMsVUFBVSxJQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUEsSUFBRyxLQUFLLENBQUMsS0FBRyxDQUFDLEVBQUM7SUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0NBQUMsQ0FBQSxDQUFDO0FBMkQ4eUIsa0JBQUk7QUExRGo3Qjs7OztHQUlHLENBQUEsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDLEtBQU0sU0FBUSxFQUFFO0lBQUMsZ0JBQWMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsS0FBRyxJQUFJLENBQUMsR0FBRyxJQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsRUFBRTtBQUMvSzs7OztHQUlHO0FBQ0gsS0FBTSxTQUFRLEVBQUU7SUFBQyxZQUFZLENBQUMsSUFBRSxJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUk7UUFBQyxNQUFNLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDLENBQUEsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUcsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQztRQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBLElBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7UUFBQyxJQUFHLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLENBQUE7S0FBQztTQUFLLElBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7UUFBQyxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsQ0FBQTtLQUFDO1NBQUssSUFBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFO1FBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0NBQUMsQ0FBQyxDQUFDO0FBZ0RvZCxtQkFBSztBQUFxQixrQkFBSTtBQS9DdDlCOzs7O0dBSUc7QUFDSCxRQUFRLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsRUFBQztJQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztJQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0NBQUMsQ0FBQSxDQUFDO0FBMENvNUIsaUJBQUc7QUF6Q2grQjs7OztHQUlHLENBQUEsUUFBUSxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxNQUFNLENBQUMsR0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUEsSUFBSSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUM7SUFBQyxNQUFNLENBQUMsQ0FBQSxDQUFBLENBQUM7QUFxQzY2QixtQkFBSztBQXBDcmhDOzs7O0dBSUcsQ0FBQSxNQUFNLEVBQUUsR0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLEVBQUUsQ0FBQztBQWdDZ2xCLHVCQUFTO0FBaEN6bEIsTUFBTSxFQUFFO0NBQUU7QUFBQSxNQUFNLEVBQUUsR0FBQyxJQUFJLE9BQU8sRUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEtBQU0sU0FBUSxFQUFFO0lBQUMsTUFBTSxDQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxNQUFNLENBQUMsR0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLE9BQU8sQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLElBQUksQ0FBQyxFQUFFLElBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEtBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxFQUFFLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBRyxVQUFVLElBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsVUFBVSxDQUFDO1FBQUEsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLE9BQU8sRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQzs7UUFBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsSUFBSSxFQUFFLEtBQUcsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLE9BQU0sVUFBVSxJQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsVUFBVSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUEsQ0FBQztJQUFBLFlBQVksS0FBRyxJQUFJLENBQUMsRUFBRSxLQUFHLElBQUksQ0FBQyxFQUFFLElBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLFdBQVcsS0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFBLENBQUM7Q0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksR0FBRyxDQUFDLENBQUEsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEVBQUU7SUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLE9BQU8sQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsS0FBTSxTQUFRLEVBQUU7SUFBQyxZQUFZLENBQUMsSUFBRSxJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUk7UUFBQyxNQUFNLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxPQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsTUFBTSxDQUFDLEdBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFBLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFBLE9BQUssQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQztRQUFFLElBQUcsSUFBSSxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLEVBQUUsQ0FBQzthQUFLLElBQUcsSUFBSSxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLEVBQUUsQ0FBQzthQUFLLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQzthQUFLLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQzthQUFLLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUM7YUFBSyxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUM7YUFBSyxJQUFHLEtBQUssQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO2dCQUFBLElBQUcsSUFBSSxLQUFHLENBQUMsRUFBQztvQkFBQyxNQUFNLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFBLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtpQkFBQzs7b0JBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQztnQkFBQSxDQUFDLEVBQUUsQ0FBQTthQUFDOztnQkFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUM7O1lBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsT0FBSyxDQUFDLElBQUUsQ0FBQyxHQUFFO1FBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBSyxDQUFDLElBQUUsQ0FBQyxHQUFFO1FBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFBQSxJQUFJLEtBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7Q0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLFdBQVcsRUFBQyxFQUFFLEdBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEtBQU0sU0FBUSxFQUFFO0lBQUMsWUFBWSxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxPQUFPLEtBQUcsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUUsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUM7UUFBQyxNQUFNLEtBQUssQ0FBQyw0R0FBNEcsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxDQUFDLElBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEdBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsT0FBTyxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLEVBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUEsQ0FBQSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQSxDQUFBLENBQUM7SUFBQSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsTUFBSyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsSUFBRyxLQUFLLENBQUMsS0FBRyxJQUFJLENBQUMsRUFBRSxFQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLEdBQUcsQ0FBQztRQUFBLEtBQUksTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQztRQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFBLElBQUcsSUFBSSxJQUFFLENBQUMsRUFBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTSxDQUFDLEdBQUMsUUFBUSxJQUFFLE9BQU8sQ0FBQyxJQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENB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QUFDLEdBQUcsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQztJQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLE9BQU8sSUFBSSxLQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsTUFBTSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFBLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUFBLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFBLEVBQUUsR0FBQyxPQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBLElBQUcsS0FBSyxDQUFDLEtBQUcsQ0FBQyxFQUFDO1lBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLElBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUEsT0FBTyxDQUFDLENBQUEsQ0FBQSxDQUFDO0lBQUEsWUFBWSxLQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFBLENBQUM7SUFBQSxXQUFXLEtBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUM7Q0FBQztBQWdCblEsNEJBQWM7QUFoQnFQLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQWdCeW1CLG1CQUFLO0FBZnp6Qzs7OztHQUlHLENBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQSxJQUFJLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUEsQ0FBQSxDQUFDO0FBVzB3QyxrQkFBSTtBQVZwMEM7Ozs7R0FJRyxDQUFBLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLEdBQUMsSUFBRyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFBLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsRUFBRTtJQUFDLE9BQU8sSUFBSSxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxZQUFZLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLElBQUcsS0FBSyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFlBQVk7UUFBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQSxNQUFNLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxzR0FBc0csQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBQyxJQUFJLEdBQUcsRUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxFQUFFLEdBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxPQUFLLENBQUMsR0FBQyxDQUFDLEdBQUU7SUFBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUE7Q0FBQyxDQUFBLElBQUcsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztJQUFDLE1BQU0s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QyxJQUFJLFVBQVUsR0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQW9CLENBQUE7WUFDMUQsSUFBSSxHQUFHLEdBQWtCLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDeEMsT0FBTyxHQUFHLENBQUM7U0FDZDs7WUFFRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUE5Q0Qsd0JBOENDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9tb2RlbHMvY2xpZW50J1xuXG5jb25zdCBub3Rmb3VuZDQwNHdpZGdldCA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGxldCBjbGllbnQ0MDQgPSBuZXcgY2xpZW50KCk7XG4gICAgICAgIGxldCBjbGllbnRyZWZmZXJpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsaWVudHJlZmVycmVyJyk7XG4gICAgICAgIGxldCBjbGllbnRydHRpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsaWVudHJ0dCcpO1xuICAgICAgICBsZXQgY2xpZW50cGxhdGZvcm1pbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsaWVudHBsYXQnKTtcbiAgICAgICAgY2xpZW50cmVmZmVyaW5mby50ZXh0Q29udGVudCA9IGNsaWVudDQwNC5vbGRVUkwgPyBjbGllbnQ0MDQub2xkVVJMIDogd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGNsaWVudHJ0dGluZm8udGV4dENvbnRlbnQgPSBgJHtjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgPyBjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgOiBcIk5vIGNvbm5lY3Rpb24gdHlwZSBmb3VuZC5cIn1gO1xuICAgICAgICBjbGllbnRydHRpbmZvLnRleHRDb250ZW50ICs9IGAsIHJ0dCBvZiAke2NsaWVudDQwNC5jb25uZWN0aW9ucnR0ID8gY2xpZW50NDA0LmNvbm5lY3Rpb25ydHQgOiBcIk5vIHJ0dCBmb3VuZC5cIn1gO1xuICAgICAgICBjbGllbnRwbGF0Zm9ybWluZm8udGV4dENvbnRlbnQgPSBjbGllbnQ0MDQuYnJvd3NlcnBsYXRmb3JtID8gY2xpZW50NDA0LmJyb3dzZXJwbGF0Zm9ybSA6IFwiTm8gcGxhdGZvcm0gaW5mb3JtYXRpb24gZm91bmQuXCI7XG4gICAgICAgIGNsaWVudHBsYXRmb3JtaW5mby50ZXh0Q29udGVudCArPSBgLCAke2NsaWVudDQwNC51c2VyYWdlbnQgPyBjbGllbnQ0MDQudXNlcmFnZW50IDogXCJObyB1c2VyIGFnZW50IGluZm8uXCJ9YDtcblxuICAgICAgICBsZXQgZ29iYWNrbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvbGRVUkwnKTtcbiAgICAgICAgaWYgKGNsaWVudDQwNC5vbGRVUkwuaW5jbHVkZXMoXCI0MDQuaHRtbFwiKSl7XG4gICAgICAgICAgICBjbGllbnQ0MDQub2xkVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZ29iYWNraHJlZiA9IGNsaWVudDQwNC5vbGRVUkwgPyBjbGllbnQ0MDQub2xkVVJMIDogd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgZ29iYWNrbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAke2dvYmFja2hyZWZ9YCk7XG4gICAgICAgIGdvYmFja2xpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgZ29iYWNraHJlZik7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdGZvdW5kNDA0d2lkZ2V0OyIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFRvRG9zV2lkZ2V0IGZyb20gJy4vVG9Eb3NXaWRnZXQnO1xuaW1wb3J0IERpY3Rpb25hcnlXaWRnZXQgZnJvbSAnLi9EaWN0aW9uYXJ5V2lkZ2V0JztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBSV0JFcnJvciBmcm9tICcuLi9tb2RlbHMvUldCRXJyb3JCdXMnXG5cbmNvbnN0IENsYXNzQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzcGVyZiA9IG5ldyBSV0JQZXJmKFwiQ2xhc3Njb21wb25lbnRzXCIpOyAvL2JlZ2luIHBlcmZvcm1hbmNlIG1lYXN1cmVcblxuICAgICAgICAvLyBBZGQgRGljdGlvbmFyeSBXaWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgICAgIGlmICghUldCRXJyb3IuY2hlY2tFbGVtZW50b3JOdWxsKFwiQ2xhc3NDb21wb25lbnRcIiwgXCIuZGljdGlvbmFyeVdpZGdldFwiLCB0cnVlLCB0cnVlKSlcbiAgICAgICAgRGljdGlvbmFyeVdpZGdldC5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgVG9Eb3Mgd2lkZ2V0IGlmIGFuIGVsZW1lbnQgd2l0aCB0aGF0IGNsYXNzIGlzIG9uIGEgcGFnZVxuICAgICAgICBpZiAoIVJXQkVycm9yLmNoZWNrRWxlbWVudG9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiLlRvRG9MaXN0XCIsIHRydWUsIHRydWUpKVxuICAgICAgICBUb0Rvc1dpZGdldC5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICBjbGFzc3BlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDbGFzc0NvbXBvbmVudHM7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2ggfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlTZWFyY2hcIlxuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIHRoZSBkaWN0aW9uYXJ5IHdpZGdldCdzIGNyZWF0aW9uLlxuICovXG5jb25zdCBEaWN0aW9uYXJ5V2lkZ2V0ID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gY3JlYXRlcyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCBieSBjYWxsaW5nIHRoZVxuICAgICAqICBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3NcbiAgICAgKi9cbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGxldCBkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50OiBFbGVtZW50XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpY3Rpb25hcnlXaWRnZXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjQ291bGQgbm90IHF1ZXJ5IGRpY3Rpb25hcnkgd2lkZ2V0IGVsZW1lbnQuXCIsIFwiY29sb3I6b3JhbmdlO1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGljdGlvbmFyeVNlYXJjaCBjb25zdHJ1Y3RvclxuICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGRpY3Rpb25hcnlXaWRnZXRTdGFydGluZ0VsZW1lbnQpKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWN0aW9uYXJ5V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBFeHBhbmRpbmdMaXN0RWxlbWVudCB9IGZyb20gXCIuLi9tb2RlbHMvRXhwYW5kaW5nTGlzdFwiO1xuXG5jb25zdCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50LCBmb3IgdXNlIHdpdGhpbiB0aGUgcGFnZVxuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cGFuZGluZy1saXN0JywgRXhwYW5kaW5nTGlzdEVsZW1lbnQsIHsgZXh0ZW5kczogJ3VsJyB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgZXhwYW5kaW5nIGxpc3QgZWxlbWVudCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIFwiRE9NXCIgcGFnZSBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIEFkZCBhIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGktc3BhbiB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlPcGVuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHVsW2lzPVwiZXhwYW5kaW5nLWxpc3RcIl0gbGkgc3BhbjpmaXJzdC1jaGlsZGApO1xuICAgICAgICBjb25zdCBleHBhbmRhYmxlTGlDbG9zZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB1bFtpcz1cImV4cGFuZGluZy1saXN0XCJdIGxpIHNwYW46bnRoLWNoaWxkKDMpYCk7XG5cbiAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlcyBmb3IgZXhwYW5kaW5nLWVsZW1lbnQgZXhwYW5kYWJsZSBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaU9wZW5PcGVuKSB7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGV4cGFuZC4uLicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSAnRE9NJyBpdGVtcyBlbGVtZW50c1xuICAgICAgICAgICAgLy8gLS0tPndoZW4gY2xpY2tlZCwgY2hhbmdlIHRoZSB0aXRsZSBwcm9wZXJ0eSB0byByZWZsZWN0IG9wZW4gb3IgY2xvc2VkIHN0YXR1c1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKCd0aXRsZScpID09ICdTZWxlY3QgdG8gZXhwYW5kLi4uJ1xuICAgICAgICAgICAgICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnU2VsZWN0IHRvIGNsb3NlLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLicpO1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICAgIDogKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdTZWxlY3QgdG8gZXhwYW5kLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG9mIGNsb3Npbmcgc3BhbiBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaUNsb3NlU3Bhbikge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ1NlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nTGlzdERPTVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEZsYXNoY2FyZENhcmRFbGVtcyBmcm9tICcuLi9tb2RlbHMvRmxhc2hjYXJkQ2FyZEVsZW1zJ1xuaW1wb3J0IHBvcnRkZWZpbml0aW9ucyBmcm9tICcuLi9kYXRhL3BvcnRudW1zJ1xuXG5jb25zdCBmbGFzaGNhcmRnYW1lV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vIEVzdGFibGlzaCB3aGljaCBwb3J0IG51bWJlcnMgdG8gdGVzdCBhbmQgdGhlIGRlZmluaXRpb25cbiAgICAgICAgLy8gVE9ETzogZnVuY3Rpb25zIGZsYXNoY2FyZHNcbiAgICAgICAgY29uc3QgbWV0aG9kZGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihbXG4gICAgICAgICAgICBbXCJjaGFyQXQoKVwiLCBcIlJldHVybnMgYSBuZXcgc3RyaW5nIG9mIHRoZSBjaGFyYWN0ZXIgYXQgYSBnaXZlbiBpbmRleC5cIl1cbiAgICAgICAgXSk7XG5cblxuICAgICAgICAvLyBDcmVhdGUgZmxhc2hjYXJkIGVsZW1lbnRzXG4gICAgICAgIGxldCBtYWluRmxhc2hDYXJkRGl2cyA9IG5ldyBGbGFzaGNhcmRDYXJkRWxlbXMocG9ydGRlZmluaXRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCB0aGUgZ2FtZSdzIHRpdGxlIGVsZW1lbnRcbiAgICAgICAgbGV0IG1haW5GbGFzaENhcmRQYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRmxhc2hDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgZ2FtZXRpdGxlRWxlbSA9IG1haW5GbGFzaENhcmRQYWdlRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKSk7XG4gICAgICAgIGdhbWV0aXRsZUVsZW0uaW5uZXJUZXh0ID0gXCJDb21wdXRpbmcgUG9ydCBOdW1iZXJzXCJcblxuICAgICAgICAvLyBBZGQgdGhlIGZsYXNoY2FyZHMgdG8gd2lkZ2V0XG4gICAgICAgIGZvciAobGV0IGVsZW0gb2YgbWFpbkZsYXNoQ2FyZERpdnMubV9mbGFzaGNhcmRzQXJyKXtcbiAgICAgICAgICAgIG1haW5GbGFzaENhcmRQYWdlRGl2LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmxhc2hjYXJkZ2FtZVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgR3Jvd2luZ0NhcmRFbGVtZW50IH0gZnJvbSBcIi4uL21vZGVscy9Hcm93aW5nQ2FyZFwiXG5cbmNvbnN0IEFjdGl2ZUNhcmRzV2lkZ2V0ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdncm93aW5nLWNhcmQnLCBHcm93aW5nQ2FyZEVsZW1lbnQsIHsgZXh0ZW5kczogJ2xpJyB9KTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50IHx8IGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTERldGFpbHNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBBcnJheSBvZiBsaXN0IGl0ZW1zIChjYXJkcylcbiAgICAgICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSk7XG5cbiAgICAgICAgICAgIC8vIENsaWNrIGV2ZW50IHRvIHJlc2l6ZSB0aGUgY2FyZHMgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBhIGNhcmRcbiAgICAgICAgICAgIC8vIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSBhIGNhcmQsIHJlc2l6ZSBhbGwgY2FyZHMgdG8gbm9ybWFsXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEl0ZW06IEdyb3dpbmdDYXJkRWxlbWVudCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0ZW1wSXRlbSAmJiAhdGVtcEl0ZW0uY29udGFpbnMoZS50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQodGVtcEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVzaGFkZSBhbGwgY2FyZHMgYmVjYXVzZSBub25lIG9mIHRoZW0gYXJlIGJpZ1xuICAgICAgICAgICAgZm9yIChsZXQgbGkgb2YgbGlzdExJcykge1xuICAgICAgICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaGFkZUluYWN0aXZlQ2FyZChsaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZUNhcmRzV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgTkFWSVRFTVMgZnJvbSAnLi4vZGF0YS9uYXZpdGVtcydcbmltcG9ydCB7IFJXQkRvbUV4Y2VwdGlvbiB9IGZyb20gJy4uL21vZGVscy9SV0JFcnJvckJ1cyc7XG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZic7XG5cbi8qKlxuICogV2lkZ2V0IHRvIGFkZCBzaXRlIGhlYWRlciBhbmQgZm9vdGVyLiBJbnN0YW50aWF0ZWQgaW4gJ01haW4nIHNjcmlwdC5cbiAqL1xuY29uc3QgSGVhZGVyRm9vdGVyID0ge1xuICAgIGhlYWRlcldpZGdldDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2l0ZSBoZWFkZXIgY29udGFpbmluZyBuYXZpZ2F0aW9uIGxpbmtzIGFuZCBzaXRlIGxvZ28uXG4gICAgICAgICAqL1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJwZXJmID0gbmV3IFJXQlBlcmYoXCJIZWFkZXJcIik7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSFRNTCAnbWFpbicgZWxlbWVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBwYWdlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgICAgIC8qKiBIZWFkZXIgZWxlbWVudCBjb250YWluZXIgKi9cbiAgICAgICAgICAgIGxldCBzaXRlSGVhZGVyOiBFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgLy8gQWRkIGhlYWRlciBlbGVtZW50IHRvIHRoZSBwYWdlXG4gICAgICAgICAgICBpZiAocGFnZU1haW4gIT0gbnVsbCkgey8vICdNYWluJyBlbGVtZW50IGV4aXN0cywgYWRkIHRoZSBoZWFkZXIgdG8gaXRcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gcGFnZU1haW4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIEhlYWRlckZvb3Rlci5oZWFkZXJXaWRnZXQuYnVpbGRIZWFkZXIoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgUldCRG9tRXhjZXB0aW9uKFwiRG9tRXhjZXB0aW9uXCIsIFwiQ2hlY2sgc2l0ZSBoZWFkZXIgZWxlbWVudC4gRW5jb3VudGVyZWQgZXJyb3I6XCIsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyAnTWFpbicgZWxlbWVudCBkb2VzIG5vdCBleGlzdCwgYWRkIHRoZSBoZWFkZXIgdG8gdGhlIGJvZHlcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlSGVhZGVyID0gZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmJ1aWxkSGVhZGVyKCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJXQkRvbUV4Y2VwdGlvbihcIkRvbUV4Y2VwdGlvblwiLCBcIkNoZWNrIHNpdGUgaGVhZGVyIGlzIG5vdCBudWxsLiBFbmNvdW50ZXJlZCBlcnJvcjpcIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0FwcGVuZCBuYXZpZ2F0aW9uIGl0ZW1zIHRvIGhlYWRlclxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzaXRlSGVhZGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmhlYWRlcldpZGdldC5idWlsZE5hdmlnYXRpb24oKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbmV3IFJXQkRvbUV4Y2VwdGlvbihcIkRvbUV4Y2VwdGlvblwiLCBcIkNhbm5vdCBwcmVwZW5kIG5hdmlnYXRpb24gaXRlbXMuIEVuY291bnRlcmVkIGVycm9yOlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaGVhZGVycGVyZi5lbmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBoZWFkZXIgd2l0aCBzaXRlIGxvZ28gYXBwZW5kZWQuXG4gICAgICAgICAqIEBwYXJhbSBtYWluIEhUTUwgJ21haW4nIGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybnMgUG9wdWxhdGVkIGhlYWRlciBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICBidWlsZEhlYWRlcjogKCkgPT4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBCYXNpYyBIVE1MIGhlYWRlciBlbGVtZW50IGNvbnRhaW5pbmcgbG9nbyAoSDEpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVIZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndpZHRoLW1heC1jZW50ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBIMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJIMVwiKTtcbiAgICAgICAgICAgIEgxLnRleHRDb250ZW50ID0gJzxSYW5kb20gV2ViIEJpdHM+JztcbiAgICAgICAgICAgIEgxLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiUmFuZG9tV2ViQml0c1wiKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXJDb250YWluZXIuYXBwZW5kKEgxKTtcbiAgICAgICAgICAgIHNpdGVIZWFkZXIuYXBwZW5kKHNpdGVIZWFkZXJDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2l0ZUhlYWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGROYXZpZ2F0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBCdWlsZCB0aGUgaGVhZGVyIG5hdmlnYXRpb24gYmFzZWQgb24gbmF2aWdhdGlvbiBkYXRhXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmF2aWdhdGlvbiBlbGVtZW50c1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTmF2RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlck5hdkZyYWdcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JykpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJykpO1xuXG4gICAgICAgICAgICAvLyBBcHBlbmQgbmF2IGRhdGEgdG8gbmF2IGVsZW1lbnRzXG4gICAgICAgICAgICBOQVZJVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaXN0SXRlbXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGlzdExpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnByZXBlbmQobmF2TGlzdExpbmtzKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJOYXYuYXBwZW5kKG5hdkxpc3RJdGVtcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgbmF2aWdhdGlvbiBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3MudGV4dENvbnRlbnQgPSBgJHtpdGVtLmlubmVyVGV4dH1gO1xuICAgICAgICAgICAgICAgIC8vIEVudmlyb25tZW50IGxpbmtzIGVkaXQsIHJlcXVpcmluZyBkaWZmZXJlbnQgbGluayByZWxhdGl2ZXMgdG8gb3BlcmF0ZVxuICAgICAgICAgICAgICAgIC8vIEdpdGh1YiBwYWdlcyBvcGVyYXRlcyBmcm9tIHJlcG9zaXRvcnksIG5vdCAnLydcbiAgICAgICAgICAgICAgICAvL2lmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PSAncm9iaG93ZS1hLmdpdGh1Yi5pbycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9saW5rIGRhdGEgZWRpdCBmb3IgZGV2IGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgICAgIC8vbmF2TGlzdExpbmtzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAvUmFuZG9tV2ViQml0cy8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGluayBkYXRhIGluIG90aGVyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKCdocmVmJywgYC8ke2l0ZW0uaFJlZmVyZW5jZX1gKTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICBuYXZMaXN0TGlua3Muc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaXRlbS50aXRsZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlck5hdkZyYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9vdGVyV2lkZ2V0OiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlcnBlcmYgPSBuZXcgUldCUGVyZihcIkZvb3RlclwiKTtcblxuICAgICAgICAgICAgLy8gQWRkIGZvb3RlciBlbGVtZW50IHRvIHRoZSBwYWdlIGVuZFxuICAgICAgICAgICAgbGV0IGZvb3RlcjogSFRNTEVsZW1lbnQgPSBIZWFkZXJGb290ZXIuZm9vdGVyV2lkZ2V0LmJ1aWxkRm9vdGVyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChmb290ZXIpO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoSGVhZGVyRm9vdGVyLmZvb3RlcldpZGdldC5idWlsZEZhdmljb25BdHRyaWJ1dGlvbihmb290ZXIpKTtcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuYnVpbGREZXZlbG9wZXJBdHRyaWJ1dGlvbihmb290ZXIpO1xuXG4gICAgICAgICAgICBmb290ZXJwZXJmLmVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZvb3RlcjogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l0ZUZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgICAgICAgICBjb25zdCBzaXRlRm9vdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlclBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIGZvb3RlclBhcmEudGV4dENvbnRlbnQgPSBgXFx1MDBBOSAyMDIyLTIwMjMgUmFuZG9tIFdlYiBCaXRzLiBBbGwgUmlnaHRzIFJlc2VydmVkLmA7XG5cbiAgICAgICAgICAgIHNpdGVGb290ZXJDb250YWluZXIuYXBwZW5kKGZvb3RlclBhcmEpO1xuICAgICAgICAgICAgc2l0ZUZvb3Rlci5hcHBlbmQoc2l0ZUZvb3RlckNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaXRlRm9vdGVyO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEZhdmljb25BdHRyaWJ1dGlvbjogKGZvb3RlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEZhdmljb24gYXR0cmlidXRpb24gc2VjdGlvbiArIGxpbmsgdG8gc291cmNlXG4gICAgICAgICAgICBjb25zdCBmb290ZXJJY29uUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgY29uc3QgZm9vdGVySWNvbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkljb25Ib21lOiAjNDUwMjY3NTVcIik7XG4gICAgICAgICAgICBmb290ZXJJY29uTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgZm9vdGVySWNvbkxpbmsuaHJlZiA9ICdodHRwczovL3d3dy52ZWN0b3JzdG9jay5jb20vcm95YWx0eS1mcmVlLXZlY3Rvci9tYWludGVuYW5jZS1pY29uLWZvci1ncmFwaGljLWFuZC13ZWItZGVzaWduLXZlY3Rvci00NTAyNjc1NSdcbiAgICAgICAgICAgIGZvb3Rlckljb25MaW5rLnRleHRDb250ZW50ID0gJ1ZlY3RvclN0b2NrLmNvbSc7XG4gICAgICAgICAgICBmb290ZXJJY29uUGFyYS50ZXh0Q29udGVudCA9IGBGYXZpY29uIGRlc2lnbmVkIGJ5IEljb25Ib21lIGF0IGA7XG5cbiAgICAgICAgICAgIC8vIEFwcGVuZCBhdHRyaWJ1dGlvbiB0byBmb290ZXIgcGFyYVxuICAgICAgICAgICAgZm9vdGVySWNvblBhcmEuYXBwZW5kQ2hpbGQoZm9vdGVySWNvbkxpbmspO1xuICAgICAgICAgICAgZm9vdGVyLmNoaWxkTm9kZXNbMF0uYXBwZW5kQ2hpbGQoZm9vdGVySWNvblBhcmEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vdGVySWNvblBhcmE7XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkRGV2ZWxvcGVyQXR0cmlidXRpb246IChmb290ZXI6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXZhdHRyaWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZGV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBkZXYudGV4dENvbnRlbnQgPSAnRGV2ZWxvcGVkIGJ5IFJvYmVydCBIb3dlbGwnO1xuXG4gICAgICAgICAgICBkZXZhdHRyaWIuYXBwZW5kKGRldik7XG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZGV2YXR0cmliKTtcblxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJGb290ZXI7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0IGZyb20gJy4vRXhwYW5kaW5nTGlzdERPTVdpZGdldCc7XG5pbXBvcnQgQWN0aXZlQ2FyZHNXaWRnZXQgZnJvbSAnLi9Hcm93aW5nQ2FyZCc7XG5pbXBvcnQgZmxhc2hjYXJkZ2FtZVdpZGdldCBmcm9tICcuL0ZsYXNoY2FyZEdhbWVXaWRnZXQnO1xuaW1wb3J0IHNsaWRlc2hvd1dpZGdldCBmcm9tICcuL1NsaWRlU2hvd1dpZGdldCc7XG5pbXBvcnQgY3NzZXggZnJvbSAnLi9jc3NleCc7XG5pbXBvcnQgaHRtbGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RlJztcbmltcG9ydCBSV0JDYXJkc1dpZGdldCBmcm9tICcuL1dlYkJpdHMnO1xuaW1wb3J0IHVybGV4Q29sb3JDb2RlIGZyb20gJy4vY29sb3Jjb2RldXJsJztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4uL21vZGVscy9TY3JpcHRQZXJmJztcbmltcG9ydCBkb21haW5sb29rdXAgZnJvbSAnLi9kb21haW5sb29rdXAnO1xuaW1wb3J0IHNsaWRlcmJhciBmcm9tICcuL3NsaWRlcmJhcic7XG5pbXBvcnQgaHNsY29sb3J3aWRnZXQgZnJvbSAnLi9oc2xjb2xvcic7XG5pbXBvcnQgbm90Zm91bmQ0MDR3aWRnZXQgZnJvbSAnLi80MDQnO1xuaW1wb3J0IFJXQkVycm9yIGZyb20gJy4uL21vZGVscy9SV0JFcnJvckJ1cyc7XG5pbXBvcnQgV2ViQml0c1NsaWRlU2hvdyBmcm9tICcuL1dlYkJpdHNTbGlkZXNob3cnO1xuaW1wb3J0IHtTaW1wbGVHcmVldGluZ30gZnJvbSAnLi9hY3Jvbnltcy1lbGVtZW50J1xuXG5jb25zdCBQYWdlQ29tcG9uZW50cyA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2VwZXJmID0gbmV3IFJXQlBlcmYoXCJQYWdlY29tcG9uZW50c1wiKTsgLy9tZWFzdXJlIHBlcmZvcm1hbmNlXG5cbiAgICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhY3Jvbnltcy1saXN0JywgU2ltcGxlR3JlZXRpbmcpO1xuICAgICAgICBQYWdlQ29tcG9uZW50cy5DaGVja1BhZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIHBhZ2VwZXJmLmVuZCgpOyAvL2VuZCBwZXJmb3JtYW5jZSBtZWFzdXJlXG4gICAgfSxcbiAgICBDaGVja1BhZ2U6ICgpID0+IHtcbiAgICAgICAgaWYgKCFSV0JFcnJvci5jaGVja0VsZW1lbnRvck51bGwoJ1BhZ2VDb21wb25lbnRzJywgJyNGb3VyLU9oLUZvdXInLCBmYWxzZSwgdHJ1ZSkpe1xuICAgICAgICAgICAgbm90Zm91bmQ0MDR3aWRnZXQuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAvLydJbmRleCcgYW5kICdQYWdlcycgcm91dGVzLCBhZGQgY2FyZHMgd2lkZ2V0XG4gICAgICAgICAgICBjYXNlICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy9pbmRleC5odG1sJzpcbiAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzLmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzLmh0bWwnOlxuICAgICAgICAgICAgICAgIFJXQkNhcmRzV2lkZ2V0LmluaXQoKTsgLy8gY2FyZHMgd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICAgICAgV2ViQml0c1NsaWRlU2hvdy5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBkb20uaHRtbCBwYWdlIHVzZXMgZXhwYW5kaW5nTGlzdHMgY29tcG9uZW50XG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvZG9tLmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3N2Zy5odG1sJzpcbiAgICAgICAgICAgICAgICBFeHBhbmRpbmdMaXN0RE9NV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgd2ViSURFIHdpZGdldFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3dlYmlkZXMuaHRtbCc6XG4gICAgICAgICAgICAgICAgQWN0aXZlQ2FyZHNXaWRnZXQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXNob3cgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2d1aWRlcy9wd2FpY29uLmh0bWwnOlxuICAgICAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIENTU0VYIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9jc3MuaHRtbCc6XG4gICAgICAgICAgICAgICAgY3NzZXguQ1NTRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgaHRtbGV4Q29sb3JDb2RlIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGNhc2UgJy9wYWdlcy9odG1sLmh0bWwnOlxuICAgICAgICAgICAgICAgIGh0bWxleENvbG9yQ29kZS5IVE1MRVhDb2xvckNvZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdXJsZXhDb2xvckNvZGUgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3VybC5odG1sJzpcbiAgICAgICAgICAgICAgICB1cmxleENvbG9yQ29kZS5VUkxFWENvbG9yQ29kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBmbGFzaGNhcmQgY29tcG9uZW50c1xuICAgICAgICAgICAgY2FzZSAnL2ZsYXNoY2FyZHMuaHRtbCc6XG4gICAgICAgICAgICAgICAgZmxhc2hjYXJkZ2FtZVdpZGdldC5pbml0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGRvbWFpbiBuYW1lIGxvb2t1cFxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL2RvbWFpbmxvb2t1cC5odG1sJzpcbiAgICAgICAgICAgICAgICBkb21haW5sb29rdXAuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL21hcmt1cC5odG1sJzpcbiAgICAgICAgICAgICAgICBzbGlkZXJiYXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBIU0wgY29sb3IgcGlja2VyXG4gICAgICAgICAgICBjYXNlICcvcGFnZXMvaHNsLmh0bWwnOlxuICAgICAgICAgICAgICAgIGhzbGNvbG9yd2lkZ2V0LmluaXRoc2xjb2xvcnBpY2tlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlQ29tcG9uZW50cztcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IEF0dHJpYnV0aW9uTGluayBmcm9tIFwiLi4vbW9kZWxzL0F0dHJpYnV0aW9uTGlua1wiO1xuaW1wb3J0IFdlYkJpdCBmcm9tIFwiLi4vbW9kZWxzL1dlYkJpdFwiO1xuaW1wb3J0IHsgUldCQ2FyZEVsZW1lbnRzIH0gZnJvbSBcIi4uL21vZGVscy9XaWRnZXRNYXJrdXBFbGVtZW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJXQkNhcmQge1xuICAgIC8qKlxuICAgICAqIENhcmQgZWxlbWVudHMgdG8gZGlzcGxheSBhbiBpY29uIHBpY3R1cmUgYW5kIGNhcmQgYm9keS4gQW4gaW1hZ2UsIHRoZSBpbWFnZSB0b3AsIHRoZSBjYXJkIGJvZHkuXG4gICAgICovXG4gICAgcHJpdmF0ZSByd2JjYXJkZWxlbWVudHM6IFJXQkNhcmRFbGVtZW50cztcbiAgICAvKipcbiAgICAgKiAgTWFwIFdlYkJpdCBkYXRhIHRvIGEgY2FyZCBlYWNoXG4gICAgICogXG4gICAgICogIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICogICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiPlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEJvZHlcIj5cbiAgICAgKiAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgKiAgICAgICAgICA8cD48L3A+XG4gICAgICogICAgICAgICAgPGEgaHJlZj1cIlwiPjwvYT5cbiAgICAgKiAgICAgIDwvZGl2PlxuICAgICAqICA8L2Rpdj5cbiAgICAgKi9cbiAgICBwdWJsaWMgYnVpbGRSV0JDYXJkTWFya3VwKGFydGljbGU6IFdlYkJpdCkge1xuICAgICAgICBsZXQgV2ViQml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucndiY2FyZGVsZW1lbnRzID0ge1xuICAgICAgICAgICAgY2FyZEltZzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBjYXJkSW1nVG9wOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIGNhcmRCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB9XG4gICAgICAgIGxldCBjYXJkQm9keUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBsZXQgY2FyZEJvZHlQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsZXQgY2FyZEJvZHlMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nVG9wLmFwcGVuZENoaWxkKHRoaXMucndiY2FyZGVsZW1lbnRzLmNhcmRJbWcpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUhlYWRpbmcpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keVBhcmEpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChjYXJkQm9keUxpbmspO1xuXG4gICAgICAgIC8vIEFkZCBjYXJkIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIFdlYkJpdC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgIFdlYkJpdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHthcnRpY2xlLmlkfWApO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5jbGFzc0xpc3QuYWRkKFwiY2FyZEJvZHlcIiwpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYXJ0aWNsZS5jYXJkSW1hZ2UpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYXJ0aWNsZS5jYXJkSW1hZ2VBTFQpO1xuICAgICAgICB0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLnNldEF0dHJpYnV0ZSgnQXJ0aWNsZScsIGFydGljbGUuYXJ0aWNsZU51bWJlci50b1N0cmluZygpKTtcbiAgICAgICAgY2FyZEJvZHlMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGFydGljbGUuYXJ0aWNsZUxpbmspXG4gICAgICAgIGNhcmRCb2R5SGVhZGluZy5pbm5lclRleHQgPSBhcnRpY2xlLm5hbWU7XG4gICAgICAgIGNhcmRCb2R5UGFyYS50ZXh0Q29udGVudCA9IGFydGljbGUuZGVzY3JpcHRpb247XG4gICAgICAgIGNhcmRCb2R5TGluay50ZXh0Q29udGVudCA9IFwiR28gdG8gUGFnZVwiO1xuXG4gICAgICAgIC8vIEltYWdlIGF0dHJpYnV0aW9uIG1heSBiZSBuZWVkZWQgZm9yIHRoZSBpbWFnZSB1c2VkXG4gICAgICAgIC8vIEF0dHJpYnV0aW9uIGRhdGEgaXMgaW1wb3J0ZWQgYXMgJ2F0dHJsaW5rcycgc2lnbmF0dXJlIHBhcmFtZXRlclxuICAgICAgICBpZiAoYXJ0aWNsZS5saW5rQXR0cmlidXRpb24pe1xuICAgICAgICAgICAgdGhpcy5idWlsZFJXQkNhcmRBdHRyaWJ1dGlvblBhbmVsKHRoaXMucndiY2FyZGVsZW1lbnRzLCBhcnRpY2xlLmxpbmtBdHRyaWJ1dGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgY2FyZCBpcyBXZWJCaXRcbiAgICAgICAgLy8gQWRkIHRoZSBtYXJrdXAgdG8gdGhlIGNvbnRhaW5pbmcgZWxlbWVudFxuICAgICAgICBXZWJCaXQuYXBwZW5kQ2hpbGQodGhpcy5yd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcCk7XG4gICAgICAgIFdlYkJpdC5hcHBlbmRDaGlsZCh0aGlzLnJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keSk7XG5cbiAgICAgICAgcmV0dXJuIFdlYkJpdDtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgaW1hZ2UgYXR0cmlidXRpb24sIHRoZSBpbWFnZSBpZCBhbmQgYXJ0aWNsZSBpZCB3aWxsIG1hdGNoLFxuICAgICAqIG90aGVyd2lzZSB0aGUgZGF0YSBpc24ndCBlbnRlcmVkLCBjYXVzaW5nIGEgbWlzc1xuICAgICAqIFxuICAgICAqICA8ZGl2IGNsYXNzPVwiZmxpcC1jYXJkXCI+PCEtLWNhcmQgaW1hZ2UgcGFuZWwtLT5cbiAgICAgKiAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICogICAgICA8ZGl2IGNsYXNzPVwiY2FyZEZyb250XCI+XG4gICAgICogICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBhcnRpY2xlPVwiXCI+XG4gICAgICogICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRCYWNrXCI+XG4gICAgICogICAgICAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgKiAgICAgICAgICAgICAgIDxwPjwvcD5cbiAgICAgKiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgYXJ0aWNsZT1cIlwiIGNsYXNzPVwiaW1nU21hbGwgaW1nUFRSXCI+XG4gICAgICogICAgICAgICAgIDwvZGl2PlxuICAgICAqICAgICAgPC9kaXY+XG4gICAgICogIDwvZGl2PjwhLS1lbmQgY2FyZCBpbWFnZSBwYW5lbC0tPlxuICAgICAqIEBwYXJhbSByd2JjYXJkZWxlbWVudHMgQ2FyZCBlbGVtZW50cyB0byBkaXNwbGF5IGFuIGljb24gcGljdHVyZSBhbmQgY2FyZCBib2R5LiBBbiBpbWFnZSwgdGhlIGltYWdlIHRvcCwgdGhlIGNhcmQgYm9keS5cbiAgICAgKiBAcGFyYW0gbGluayBBdHRyaWJ1dGlvbiBsaW5rXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZFJXQkNhcmRBdHRyaWJ1dGlvblBhbmVsKHJ3YmNhcmRlbGVtZW50czogUldCQ2FyZEVsZW1lbnRzLCBsaW5rOiBBdHRyaWJ1dGlvbkxpbmspIHtcbiAgICAgICAgaWYgKHJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmdldEF0dHJpYnV0ZSgnQXJ0aWNsZScpID09PSBsaW5rLmFydGljbGVpZC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgaW1hZ2UgYmFjayBwYW5lbCBlbGVtZW50cyBhbmQgYWRkIHRoZSBkYXRhXG4gICAgICAgICAgICAvLyBSZWRlZmluZSBjYXJkIGltYWdlIHBhbmVsIGFzIGEgZmxpcCBwYW5lbFxuICAgICAgICAgICAgY29uc3QgY2FyZElubmVyID0gcndiY2FyZGVsZW1lbnRzLmNhcmRJbWdUb3AuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjb25zdCBjYXJkRnJvbnQgPSBjYXJkSW5uZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgICAgICBjYXJkRnJvbnQuYXBwZW5kQ2hpbGQocndiY2FyZGVsZW1lbnRzLmNhcmRJbWcpOyAvLyBtb3ZlIGltYWdlIHdpdGhpbiBjYXJkIGZyb250IGRpdmlzb3JcbiAgICAgICAgICAgIGxldCBzbWFsbEltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PnJ3YmNhcmRlbGVtZW50cy5jYXJkSW1nLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQmFjayA9IGNhcmRJbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tIZWFkaW5nID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICAgICAgICAgIGNhcmRCYWNrLmFwcGVuZENoaWxkKHNtYWxsSW1nKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tQYXJhID0gY2FyZEJhY2suYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTGluayA9IHJ3YmNhcmRlbGVtZW50cy5jYXJkQm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSk7IC8vYXBwZW5kIHRvIGZyb250IHBhbmVsXG5cbiAgICAgICAgICAgIC8vIEFkZCBmbGlwLXBhbmVsIGRhdGEgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICByd2JjYXJkZWxlbWVudHMuY2FyZEltZ1RvcC5jbGFzc0xpc3QuYWRkKFwiZmxpcC1jYXJkXCIpXG4gICAgICAgICAgICBjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcImlubmVyXCIpO1xuICAgICAgICAgICAgY2FyZEZyb250LmNsYXNzTGlzdC5hZGQoXCJjYXJkRnJvbnRcIik7XG4gICAgICAgICAgICBzbWFsbEltZy5jbGFzc0xpc3QuYWRkKFwiaW1nU21hbGxcIiwgXCJpbWdQVFJcIik7XG4gICAgICAgICAgICBjYXJkQmFjay5jbGFzc0xpc3QuYWRkKFwiY2FyZEJhY2tcIik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLmNsYXNzTGlzdC5hZGQoXCJhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICBiYWNrSGVhZGluZy50ZXh0Q29udGVudCA9IGxpbmsuYXR0cmlidXRlZG93bmVyO1xuICAgICAgICAgICAgYmFja1BhcmEudGV4dENvbnRlbnQgPSBsaW5rLmlubmVyVGV4dFxuICAgICAgICAgICAgYXR0cmlidXRlTGluay5ocmVmID0gbGluay5oUmVmZXJlbmNlO1xuICAgICAgICAgICAgYXR0cmlidXRlTGluay50aXRsZSA9IGxpbmsudGl0bGU7XG4gICAgICAgICAgICBhdHRyaWJ1dGVMaW5rLnRleHRDb250ZW50ID0gbGluay5hdHRyaWJ1dGVkb3duZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbi8vIEF0dHJpYnV0aW9uOiBSb2JlcnQgQSBIb3dlbGwsIE1heSAyMDIzXG4vLyBDb250ZW50IGRlcml2ZWQgZnJvbTogVzNTY2hvb2xzLCBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2hvd3RvL2hvd3RvX2pzX3NsaWRlc2hvdy5hc3BcblxuXG4vKipcbiAqIENvbXBvbmVudCBjcmVhdGluZyBzbGlkZXNob3cgd2lkZ2V0c1xuICovXG5jb25zdCBzbGlkZXNob3dXaWRnZXQgPSB7XG4gICAgc2xpZGVJbmRleDogMSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc2xpZGVzaG93IGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCk7XG4gICAgICAgIFxuICAgICAgICAvLyBOZXh0L3ByZXZpb3VzIGNvbnRyb2xzXG4gICAgICAgIGZ1bmN0aW9uIHBsdXNTbGlkZXMobjpudW1iZXIpIHtcbiAgICAgICAgICAgIHNsaWRlc2hvd1dpZGdldC5zaG93U2xpZGVzKHNsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4ICs9IG4pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBUaHVtYm5haWwgaW1hZ2UgY29udHJvbHNcbiAgICAgICAgZnVuY3Rpb24gY3VycmVudFNsaWRlKG46bnVtYmVyKSB7XG4gICAgICAgICAgICBzbGlkZXNob3dXaWRnZXQuc2hvd1NsaWRlcyhzbGlkZXNob3dXaWRnZXQuc2xpZGVJbmRleCA9IG4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9DaGFuZ2UgdG8gbmV4dCBzbGlkZSB3aGVuIGFycm93IGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAgICAgICAgY29uc3Qgc2xpZGVTaG93UHJldmlvdXNCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd1ByZXZcIik7XG4gICAgICAgIGNvbnN0IHNsaWRlU2hvd05leHRCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlc2hvd05leHRcIik7XG4gICAgICAgIGZvciAobGV0IGJ0biBvZiBzbGlkZVNob3dQcmV2aW91c0J0bnMpe1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgICAgIHBsdXNTbGlkZXMoLTEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgYnRuIG9mIHNsaWRlU2hvd05leHRCdG5zKXtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NoYW5nZSB0byBzZWxlY3RlZCBzbGlkZSB3aGVuIGRvdCBhcmUgY2xpY2tlZFxuICAgICAgICBjb25zdCBzbGlkZVNob3dEb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcbiAgICAgICAgbGV0IGRvdENvdW50ZXIgPSAxO1xuICAgICAgICBmb3IobGV0IGRvdCBvZiBzbGlkZVNob3dEb3RzKXtcbiAgICAgICAgICAgIC8vYWRkIGRvdCBjb3VudGVyXG4gICAgICAgICAgICBkb3Quc2V0QXR0cmlidXRlKFwiZG90aW5kZXhcIiwgYCR7ZG90Q291bnRlcn1gKVxuICAgICAgICAgICAgLy93aGVuIGNsaWNrZWQsIG5hdmlnYXRlIHRvIHRoZSBzbGlkZSBpbmRpY2F0ZWRcbiAgICAgICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgICAgICBwbHVzU2xpZGVzKGRvdENvdW50ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb3RDb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZG90Q291bnRlciA9IDE7XG4gICAgfSxcbiAgICBzaG93U2xpZGVzOiAobjogbnVtYmVyKT0+e1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBsZXQgc2xpZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm15U2xpZGVzXCIpO1xuICAgICAgICAgICAgbGV0IGRvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xuICAgICAgICAgICAgaWYgKG4gPiBzbGlkZXMubGVuZ3RoKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSAxfVxuICAgICAgICAgICAgaWYgKG4gPCAxKSB7c2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggPSBzbGlkZXMubGVuZ3RofVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wU2xpZGUgPSA8SFRNTERpdkVsZW1lbnQ+c2xpZGVzW2ldO1xuICAgICAgICAgICAgICAgIHRlbXBTbGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9IGRvdHNbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRlbXBTbGlkZSA9IDxIVE1MRGl2RWxlbWVudD5zbGlkZXNbc2xpZGVzaG93V2lkZ2V0LnNsaWRlSW5kZXggLSAxXVxuICAgICAgICAgICAgdGVtcFNsaWRlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb3RzW3NsaWRlc2hvd1dpZGdldC5zbGlkZUluZGV4IC0gMV0uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlc2hvd1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3QgfSBmcm9tIFwiLi4vbW9kZWxzL1RvRG9cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgVG8tRG8gTGlzdCB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgVG9Eb3NXaWRnZXQgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgVG8tRG8gTGlzdCB3aWRnZXQuXG4gICAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ1RvRG9MaXN0JyBjbGFzc1xuICAgICAqL1xuICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICBsZXQgdG9Eb3NFbGVtZW50OiBFbGVtZW50O1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0b0Rvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlRvRG9MaXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY0NvdWxkIG5vdCBxdWVyeSB0b2RvIGxpc3Qgd2lkZ2V0IGVsZW1lbnQuXCIsIFwiY29sb3I6b3JhbmdlO1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9Ub0RvTGlzdCBvYmplY3RcbiAgICAgICAgY29uc3QgdG9kb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuXG4gICAgICAgIC8vQ3JlYXRlcyB3aWRnZXQgbWFya3VwIGFuZCBwb3B1bGF0ZXMgVG8tRG8gdGFza3MgY29udGFpbmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgdG9kb1dpZGdldC5jcmVhdGVUb0RvTGlzdFdpZGdldCh0b0Rvc0VsZW1lbnQpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9zV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV0VCQklUREFUQSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XG5pbXBvcnQgeyBSYW5kb21XZWJCaXRzIH0gZnJvbSBcIi4uL21vZGVscy9SYW5kb21XZWJCaXRzXCI7XG5cbi8qKlxuICogQ2FyZCB3aWRnZXQgdG8gaW5pdGlhbGl6ZSBhcnRpY2xlIGRhdGEgaW50byBIVE1MIGNhcmQgZWxlbWVudHMuIFRoaXMgd2lkZ2V0IFxuICogY3JlYXRlcyBtdWx0aXBsZSBzZWN0aW9ucyBvZiBjYXJkcyB0byBhZGQgdG8gYSBwYWdlLlxuICovXG5jb25zdCBSV0JDYXJkc1dpZGdldCA9IHtcbiAgICAvKiogQ2FyZHMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gYnJlYWtzIGRvd24gdGhlIGRhdGEgc3RydWN0dXJlIGluIFxuICAgICAqIG9yZGVyIHRvIGZvcm11bGF0ZSB0aGUgYXJ0aWNsZSBkZXRhaWxzIGludG8gb25lIGNhcmQgZm9yIGVhY2ggYXJ0aWNsZSBkYXRhLlxuICAgICAqIFxuICAgICAqIEFydGljbGVzIGhhdmUgZGlmZmVyZW50IGNhdGVnb3JpZXMsIHNvIGVhY2ggY2F0ZWdvcnkgbXVzdCBiZSByZXNwZWN0ZWQuIFxuICAgICAqICovXG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAvLyBTcGxpdCB0aGUgY2FyZHMgYXJyYXlzIGludG8gdGhlaXIgcmVzcGVjdGl2ZSBjYXRlZ29yeVxuICAgICAgICAvKiogTXVsdGlwbGUgY2F0ZWdvcmllcyBvZiBjYXJkIGRhdGEgZXhpc3QuIFRoaXMgYXJyYXkgaG9sZHMgdGhlIG1hcmt1cCBuZWVkZWQgXG4gICAgICAgICAqIHRvIGNyZWF0ZSBjYXRlZ29yeSBzZWN0aW9ucyBkaXZpc2lvbnMgd2hlbiBwbGFjZWQgb24gYSBwYWdlLlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGNhcmRzU2VjdGlvbjogSFRNTERpdkVsZW1lbnRbXSA9IFtcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRDYXJkQ29udGFpbmluZ1NlY3Rpb24oXCJBcmJpdHJhcnkgQXJ0aWNsZXM6XCIsIFwiQXJiaXRyYXJ5QXJ0aWNsZXNcIiksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKFwiR3VpZGUgU2hvcnRzOlwiLCBcIkd1aWRlU2hvcnRzXCIpLFxuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZENhcmRDb250YWluaW5nU2VjdGlvbihcIkV4cGxvcmUgdGhlIFdlYjpcIiwgXCJFeHBsb3JldGhlV2ViXCIpLFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBvZiBjYXJkIGRhdGEgKyBhdHRyaWJ1dGlvbiBsaW5rIGRhdGFcbiAgICAgICAgLy8gV0VCQklUREFUQSBicm9rZW4gaW50byAzIGFycmF5czogUGFnZXMsIG9yIGFydGljbGVzLCBHdWlkZXMsIGFuZCBFeHBsb3Jlc1xuICAgICAgICAvKipUaGlzIGFycmF5IGhvbGRzIHRoZSBtYXJrdXAgb2YgY2FyZCBlbGVtZW50cy4gRWFjaCBpbmRleCBzdG9yZXMgdGhlIGNhcmRzJyBkYXRhXG4gICAgICAgICAqIGZvciBvbmUgY2F0ZWdvcnkgb2YgYXJ0aWNsZXMuICovIFxuICAgICAgICBsZXQgY2FyZHNBcnRpY2xlczogYW55ID0gW1xuICAgICAgICAgICAgUmFuZG9tV2ViQml0cy5idWlsZFJXQkNhcmRzKFdFQkJJVERBVEEuc2hpZnQoKSksXG4gICAgICAgICAgICBSYW5kb21XZWJCaXRzLmJ1aWxkUldCQ2FyZHMoV0VCQklUREFUQS5zaGlmdCgpKSxcbiAgICAgICAgICAgIFJhbmRvbVdlYkJpdHMuYnVpbGRSV0JDYXJkcyhXRUJCSVREQVRBLnNoaWZ0KCkpLFxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgLy8gUm91dGVzIC0+IEFkZCB3aWRnZXQgYW5kIGZvcm1hdCBwYWdlc1xuICAgICAgICAvLyBJbmRleCAoSG9tZSkgcGFnZSBzaG9ydGVucyBlYWNoIHNlY3Rpb24gdG8gMyBhcnRpY2xlcyBvbmx5XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy9pbmRleC5odG1sJyB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvUmFuZG9tV2ViQml0cy8nIHx8XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9kaXN0L2luZGV4Lmh0bWwnKSB7XG4gICAgICAgICAgICAgICAgLyoqIFJhbmRvbWl6ZSB0aGUgb3JkZXIgb2YgY2FyZHMuICovXG4gICAgICAgICAgICBjb25zdCBnZXRNdWx0aXBsZVJhbmRvbSA9IChhcnI6IGFueSwgbnVtOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByYW5kb21pemUgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBbLi4uYXJyXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKDAsIG51bSk7IC8vIHJldHVybiB0aGUgcmVxdWVzdGVkIG51bWJlciBvZiBlbGVtZW50c1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FyZHNBcnRpY2xlc1swXSA9IGdldE11bHRpcGxlUmFuZG9tKGNhcmRzQXJ0aWNsZXNbMF0sIGNhcmRzQXJ0aWNsZXNbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIGNhcmRzQXJ0aWNsZXNbMV0gPSBnZXRNdWx0aXBsZVJhbmRvbShjYXJkc0FydGljbGVzWzFdLCAzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJzdCBzZWN0aW9uIG9mIGNhcmRzIHNsaWRlc2hvdyBjbGFzc1xuICAgICAgICBmb3IgKGxldCBjYXJkIG9mIGNhcmRzQXJ0aWNsZXNbMF0pe1xuICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwic2xpZGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGNhcmRzIHRvIHRoZSBwYWdlIGJ5IGRlY29uc3RydWN0aW9uIGFuZCBhZGRpdGlvblxuICAgICAgICAvLyBPdXRlciBsb29wOiBpdGVyYXRlIHRoZSBkYXRhIHRvIGVhY2ggcmVzcGVjdGl2ZSBjYXRlZ29yeTogUGFnZXMsIEd1aWRlcywgRXhwbG9yZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYXJkc1NlY3Rpb25baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5uZXIgbG9vcDogaXRlcmF0ZSB0aHJvdWdoIHRoZSBjYXRlZ29yeSBkYXRhXG4gICAgICAgICAgICAgICAgLy8gRnJvbSB0aGUgY2FyZHMgc3RhY2ssIGFwcGVuZCBlYWNoIHRvIHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjYXJkc0FydGljbGVzLnNoaWZ0KCkuZm9yRWFjaCgoYXJ0aWNsZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRzU2VjdGlvbltpXS5hcHBlbmQoYXJ0aWNsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYW4gZXJyb3IuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSV0JDYXJkc1dpZGdldFxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQ2FyZHNTbGlkZVNob3cgZnJvbSBcIi4uL21vZGVscy9DYXJkc1NsaWRlU2hvd1wiO1xuXG5jb25zdCBXZWJCaXRzU2xpZGVTaG93ID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3BhZ2VzLmh0bWwnKSByZXR1cm47XG4gICAgICAgIC8vSW1wbGVtZW50IHNsaWRlc2hvdyBmb3IgYXJiaXRyYXJ5IGFydGljbGVzXG4gICAgICAgIGxldCBhYWNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkc2xpZGVzaG93IC5zbGlkZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50PjtcbiAgICAgICAgbGV0IGFhc2xpZGVzaG93ID0gbmV3IENhcmRzU2xpZGVTaG93KGFhY2FyZHMsIDMpO1xuXG4gICAgICAgIC8vQnVpbGQgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZSBzbGlkZXNob3dcbiAgICAgICAgLy9TdHlsZSB0aGUgY29udGFpbmVyXG4gICAgICAgIGxldCBzbGlkZXNob3dzbGlkZXMgPSBhYXNsaWRlc2hvdy5zbGlkZXNob3djb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgICAgIGZvciAobGV0IGNhcmQgb2YgYWFzbGlkZXNob3cuY2FyZHMpe1xuICAgICAgICAgICAgbGV0IHRlbXAgPSBjYXJkO1xuICAgICAgICAgICAgc2xpZGVzaG93c2xpZGVzLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXNob3dzbGlkZXMuY2xhc3NMaXN0LmFkZChcInNsaWRlc2NvbnRhaW5lclwiKTtcbiAgICAgICAgc2xpZGVzaG93c2xpZGVzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHNsaWRlc2hvd3NsaWRlcy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGFhc2xpZGVzaG93LnNsaWRlc2hvd2NvbnRhaW5lci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XG4gICAgICAgIGxldCBzbGlkZXNob3didG5zID0gYWFzbGlkZXNob3cuc2xpZGVzaG93Y29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBcbiAgICAgICAgLy9MZWZ0IHNsaWRlc2hvdyBidG5cbiAgICAgICAgbGV0IHByZXZpb3Vzc2xpZGVzaG93YnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIHByZXZpb3Vzc2xpZGVzaG93YnRuLmNsYXNzTGlzdC5hZGQoJ3NsaWRlc2hvd1ByZXYnKTtcbiAgICAgICAgcHJldmlvdXNzbGlkZXNob3didG4uaW5uZXJUZXh0ID0gXCLina5cIjtcbiAgICAgICAgc2xpZGVzaG93YnRucy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHByZXZpb3Vzc2xpZGVzaG93YnRuKTtcbiAgICAgICAgYWFzbGlkZXNob3cucHJldmJ0biA9IHByZXZpb3Vzc2xpZGVzaG93YnRuO1xuICAgICAgICAvL1JpZ2h0IHNsaWRlc2hvdyBidG5cbiAgICAgICAgbGV0IG5leHRzbGlkZXNob3didG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgbmV4dHNsaWRlc2hvd2J0bi5jbGFzc0xpc3QuYWRkKCdzbGlkZXNob3dOZXh0Jyk7XG4gICAgICAgIG5leHRzbGlkZXNob3didG4uaW5uZXJUZXh0ID0gXCLina9cIjtcbiAgICAgICAgc2xpZGVzaG93YnRucy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIG5leHRzbGlkZXNob3didG4pO1xuICAgICAgICBzbGlkZXNob3didG5zLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgc2xpZGVzaG93YnRucy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XG4gICAgICAgIGFhc2xpZGVzaG93Lm5leHRidG4gPSBuZXh0c2xpZGVzaG93YnRuO1xuXG4gICAgICAgIC8vSGlkZSBvdmVyZmxvdyBlbGVtZW50c1xuICAgICAgICBpZiAoYWFzbGlkZXNob3cuY2FyZGluZHhzdGFydCA8IGFhc2xpZGVzaG93LmNhcmRxdWFudHNob3cpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gYWFzbGlkZXNob3cuY2FyZHMubGVuZ3RoIC0gMTsgaSA+IGFhc2xpZGVzaG93LmNhcmRzaW5keGVuZDsgaS0tKXtcbiAgICAgICAgICAgICAgICBhYXNsaWRlc2hvdy5jYXJkc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1ByZXZpb3VzL25leHQgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICBhYXNsaWRlc2hvdy5wcmV2YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgV2ViQml0c1NsaWRlU2hvdy5wcmV2KGFhc2xpZGVzaG93KTtcbiAgICAgICAgfSlcbiAgICAgICAgYWFzbGlkZXNob3cubmV4dGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFdlYkJpdHNTbGlkZVNob3cubmV4dChhYXNsaWRlc2hvdyk7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBuZXh0OiAoc2xpZGVzaG93OiBDYXJkc1NsaWRlU2hvdykgPT4ge1xuICAgICAgICBpZiAoc2xpZGVzaG93LnR1cm4gPT0gc2xpZGVzaG93Lm1heHR1cm5jb3VudCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9IaWRlIHRoZSBmaXJzdCBlbGVtZW50IGluIHNsaWRlc2hvd1xuICAgICAgICBzbGlkZXNob3cuY2FyZHNbc2xpZGVzaG93LmNhcmRpbmR4c3RhcnRdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgLy9EaXNwbGF5IHRoZSBuZXh0IGVsZW1lbnQgZm9yIHNsaWRlc2hvd1xuICAgICAgICBzbGlkZXNob3cuY2FyZHNbc2xpZGVzaG93LmNhcmRzaW5keGVuZCArIDFdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIC8vSW5jcmVtZW50IGluZGV4IGNvdW50ZXJcbiAgICAgICAgc2xpZGVzaG93LmNhcmRpbmR4c3RhcnQrKztcbiAgICAgICAgc2xpZGVzaG93LmNhcmRzaW5keGVuZCsrO1xuICAgICAgICBzbGlkZXNob3cudHVybisrO1xuXG4gICAgfSxcbiAgICBwcmV2OiAoc2xpZGVzaG93OiBDYXJkc1NsaWRlU2hvdykgPT4ge1xuICAgICAgICBpZihzbGlkZXNob3cudHVybiA9PSAwKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL0hpZGUgdGhlIGZpcnN0IGVsZW1lbnQgaW4gc2xpZGVzaG93XG4gICAgICAgIHNsaWRlc2hvdy5jYXJkc1tzbGlkZXNob3cuY2FyZHNpbmR4ZW5kXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIC8vRGlzcGxheSB0aGUgbmV4dCBlbGVtZW50IGZvciBzbGlkZXNob3dcbiAgICAgICAgbGV0IHRlbXAgPSBzbGlkZXNob3cuY2FyZHNbc2xpZGVzaG93LmNhcmRpbmR4c3RhcnQgLSAxXTtcbiAgICAgICAgdGVtcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAvL0luY3JlbWVudCBpbmRleCBjb3VudGVyXG4gICAgICAgIHNsaWRlc2hvdy5jYXJkaW5keHN0YXJ0LS07XG4gICAgICAgIHNsaWRlc2hvdy5jYXJkc2luZHhlbmQtLTtcbiAgICAgICAgc2xpZGVzaG93LnR1cm4tLTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkJpdHNTbGlkZVNob3c7IiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IExpdEVsZW1lbnQsIGNzcywgaHRtbCB9IGZyb20gJy4uL2pzL2xpdC1hbGwubWluLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpbXBsZUdyZWV0aW5nIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAgdGl0bGU6IGFueSA9IHt9O1xuICAgIGlkOiBhbnkgPSAge307XG4gICAgYWNyb255bXM6IGFueSA9ICBbXTtcbiAgLy8gRGVmaW5lIHNjb3BlZCBzdHlsZXMgcmlnaHQgd2l0aCB5b3VyIGNvbXBvbmVudCwgaW4gcGxhaW4gQ1NTXG4gIHN0YXRpYyBzdHlsZXMgPSBjc3NgXG4gICAgLmFjcm9ueW1MaXN0IHsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgIGJvcmRlcjogLjVtbSBzb2xpZCB2YXIoLS1jbHItYmx1ZSk7XG4gICAgICBib3gtc2hhZG93OlxuICAgICAgMC43cHggMHB4IDEuNHB4IHJnYmEoMCwgMCwgMCwgMC4zMDMpLFxuICAgICAgMS43cHggMHB4IDQuN3B4IHJnYmEoMCwgMCwgMCwgMC40NDcpLFxuICAgICAgLTdweCAwcHggMTFweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICAgIHBhZGRpbmc6IDAgMWVtIDFlbSAxZW07XG4gICAgICBtYXJnaW46IDJlbTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1wcmltYXJ5LTQwMCk7XG4gICAgICBjb2xvcjogdmFyKC0tY2xyLWFsbC1wcmltYXJ5LTkwMCk7XG4gICAgfVxuICAgIC5hY3JvbnltTGlzdDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcHJpbWFyeS01MDApO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3QgdWwgeyBcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBmb250LWZhbWlseTogQXJpZWwsIHNhbnMtc2VyaWY7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3QgbGkge1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3QgaDMge1xuICAgICAgY29sb3I6IHZhcigtLWNsci1wcmltYXJ5LTUwMCk7XG4gICAgICBtYXJnaW4tYm90dG9tOiAuNWVtO1xuICAgICAgZm9udC1zaXplOiAxLjJlbTtcbiAgICB9XG4gICAgLmFjcm9ueW1MaXN0IHVsIHtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzIwcHgpe1xuICAgICAgLmFjcm9ueW1MaXN0IHVsIHsgXG4gICAgICAgIHBhZGRpbmc6IDBlbSAxZW07XG4gICAgICB9XG4gICAgfVxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNTAxcHgpe1xuICAgICAgLmFjcm9ueW1MaXN0IHVsIHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgfVxuICAgICAgLmFjcm9ueW1MaXN0IGgzIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWNsci1hbGwtcHJpbWFyeS05MDApO1xuICAgICAgICBmb250LXNpemU6IDEuNGVtO1xuICAgICAgfVxuICAgIH1cbiAgYDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgUGFnZUFjcm9ueW1zID0gW1xuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy93aWZpLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcIndpZmlcIixcbiAgICAgICAgYWNyb255bXM6IFtcIlNTSURcIiwgXCI4MDIuMTFhXCIsIFwiODAyLjExYlwiLCBcIjgwMi4xMWdcIiwgXCI4MDIuMTFuXCIsIFwiODAyLjExYWNcIiwgXCI4MDIuMTFheFwiLCBcIldMQU5cIiwgXCJJUHY0XCIsIFwiSVB2NlwiLCBcIk1BQ1wiLCBcIkFQXCJdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwibmV0d29ya3NwZWVkXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJQaW5nXCIsIFwiTklDXCIsIFwiQlBTXCIsIFwiTUJQU1wiLCBcIkdCUFNcIiwgXCJCaXRcIiwgXCJCeXRlXCIsIFwiSVNQXCJdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9tYXJrdXAuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwibWFya3VwXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJib2R5XCIsIFwiaGVhZFwiLCBcImRpdlwiLCBcImhyZWZcIiwgXCJsYW5nXCIsIFwidWxcIiwgXCJvbFwiXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImlwYWRkcmVzc1wiLFxuICAgICAgICBhY3JvbnltczogW1wiSVBWNFwiLCBcIklQVjZcIiwgXCJUQ1AvSVBcIiwgXCJPU0lcIiwgXCJESENQXCIsIFwiRE5TXCIsIFwiU3VibmV0IE1hc2tcIiwgXCJDSURSXCIsIFwiTEFOXCIsIFwiTkFUXCIsIFwiTUFDXCJdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9ndWlkZXMvaHR0cHMuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiaHR0cHNcIixcbiAgICAgICAgYWNyb255bXM6IFtcIktNU1wiLCBcIlBLSVwiLCBcIlJTQVwiLCBcIlNTTFwiLCBcIlRMU1wiLCBcIlNIQVwiLCBcIkFFU1wiLCBcIkVGU1wiLCBcIlRQTVwiLCBcIkJpdExvY2tlclwiLCBcIkVuY3J5cHRcIiwgXCJEZWNyeXB0XCIsIFwiU2lnbmF0dXJlXCIsIFwiRWxsaXB0aWMgQ3VydmVcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICBhY3JvbnltczogW1wiSFRUUFwiLCBcIkhUVFBTXCIsIFwiVENQXCIsIFwiVURQXCIsIFwiRE9NXCIsIFwiQXNzZXRcIiwgXCJGcmFtZVwiLCBcIkF1dGhcIiwgXCJUcmFuc3BvcnRcIiwgXCJSZXNwb25zZVwiLCBcIlZlcmJcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJkb21haW5sb29rdXBcIixcbiAgICAgICAgYWNyb255bXM6IFtcIkROU1wiLCBcIkROU1NFQ1wiLCBcIkRETlNcIiwgXCJGUUROXCIsIFwiTmV0QklPU1wiLCBcIk5hbWVzZXJ2ZXJcIiwgXCJPVVwiLCBcIlRvcC1sZXZlbFwiLCBcIkEgcmVjb3JkXCIsIFwiQ05BTUVcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJkcml2ZXNcIixcbiAgICAgICAgYWNyb255bXM6IFtcIkNTT01cIiwgXCJTU09NXCIsIFwiUFNcIiwgXCJOU1wiLCBcIlRyZWVcIiwgXCJPYmplY3RzXCIsIFwiUmVnaXN0cnlcIiwgXCJWYXJpYWJsZXNcIiwgXCJUQ1AvSVBcIiwgXCJUTFNcIiwgXCJDeXBoZXJ0ZXh0XCIsIFwiQ05cIiwgXCJFS1VcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2Rucy5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJkbnNcIixcbiAgICAgICAgYWNyb255bXM6IFtcIkRETlNcIiwgXCJETlNTRUNcIiwgXCJBIChhZGRyZXNTKVwiLCBcIkNBQVwiLCBcIk5TIChuYW1lIHNlcnZlcilcIiwgXCJNWFwiLCBcIlFQU1wiXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvZG9tLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImRvbVwiLFxuICAgICAgICBhY3JvbnltczogW1wiRE9NXCIsIFwiQ1NTXCIsIFwiSFRNTFwiLCBcImFzc2V0XCIsIFwicHJvcGVydHlcIiwgXCJhdHRyaWJ1dGVcIiwgXCJ2YXJpYWJsZVwiLCBcInJlZmVyZW5jZVwiLCBcImZ1bmN0aW9uXCIsIFwicm9vdFwiXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvc3ZnLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcInN2Z1wiLFxuICAgICAgICBhY3JvbnltczogW1wiWE1MXCIsIFwiWEhUTUxcIiwgXCJSREZcIiwgXCJJU09cIiwgXCJEQ01FU1wiLCBcIkNDIExpY2Vuc2VcIl1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2phdmFzY3JpcHQuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiamF2YXNjcmlwdFwiLFxuICAgICAgICBhY3JvbnltczogW1wiRGVmZXJcIiwgXCJTeW5jaHJvbm91c1wiLCBcIkVTXCIsIFwiR1VJXCIsIFwiSlNPTlwiLCBcIkFKQVhcIiwgXCJJSUZFXCIsIFwiSURFXCIsIFwiRE9NXCJdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9odHRwLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImphdmFzY3JpcHRcIixcbiAgICAgICAgYWNyb255bXM6IFtcIkhUVFBcIiwgXCJUQ1BcIiwgXCJVRFBcIiwgXCJETlNcIiwgXCJUTFNcIiwgXCJJUFwiLCBcIkhUTUxcIiwgXCJDU1NcIiwgXCJKU1wiLCBcIkFQSVwiXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvbGF0ZW5jeS5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJqYXZhc2NyaXB0XCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJDTVNcIiwgXCJUQ1BcIiwgXCJUTFNcIiwgXCJJUFwiLCBcIlBTIChwYWNrZXQgc3dpdGNoaW5nKVwiLCBcIkROU1wiXVxuICAgICAgfVxuICAgIF1cbiAgICBcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9IFBhZ2VBY3Jvbnltcy5maWx0ZXIocGFnZSA9PiBwYWdlLnBhZ2UgPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgLy8gRGVjbGFyZSByZWFjdGl2ZSBwcm9wZXJ0aWVzXG4gICAgdGhpcy50aXRsZSA9ICdDb21tb24gQWNyb255bXMnO1xuICAgIHRoaXMuaWQgPSBjdXJyZW50UGFnZVswXS5odG1sVGl0bGU7XG4gICAgdGhpcy5hY3JvbnltcyA9IGN1cnJlbnRQYWdlWzBdLmFjcm9ueW1zO1xuXG4gIH1cbiAgYnVpbGRMaXN0KCkgeyB9XG5cbiAgLy8gUmVuZGVyIHRoZSBVSSBhcyBhIGZ1bmN0aW9uIG9mIGNvbXBvbmVudCBzdGF0ZVxuICByZW5kZXIoKSB7XG4gICAgbGV0IGxpc3RpdGVtcyA9IFtdO1xuICAgIGZvciAoY29uc3QgYWNyb255bXMgb2YgdGhpcy5hY3Jvbnltcykge1xuICAgICAgbGlzdGl0ZW1zLnB1c2goaHRtbGA8bGk+JHthY3Jvbnltc308L2xpPmApO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sYFxuICAgIDxhc2lkZSBjbGFzcz1cImFjcm9ueW1MaXN0XCI+XG4gICAgPGgzPiR7dGhpcy50aXRsZX06PC9oMz5cbiAgICA8dWwgaWQ9XCJhY3ItJHt0aGlzLmlkfVwiPlxuICAgICAgJHtsaXN0aXRlbXN9XG4gICAgPC91bD5cbiAgICA8L2FzaWRlPmA7XG4gIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IENvbG9yQ29kZSBmcm9tICcuLi9tb2RlbHMvQ29sb3JDb2RlJ1xuXG5jb25zdCBodG1sZXhDb2xvckNvZGUgPSB7XG4gICAgSFRNTEVYQ29sb3JDb2RlOiAoKSA9PiB7XG4gICAgICAgIC8vIEdldCBjb21wb25lbnQgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gd2lkZ2V0IGludGVyYWN0aXZpdHlcbiAgICAgICAgY29uc3Qgb3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnb3BlblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgY2xvc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnY2xvc2VcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGV4dFZhbFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBhcnJheSBkYXRhIHN0cnVjdHVyZXMsIG5lZWRlZCBmb3IgdGhlIENvbG9yQ29kZSBpbnN0YW50aWF0aW9uXG4gICAgICAgIGNvbnN0IGNvbG9ybGVzc2VsZW1lbnRzID0gbmV3IEFycmF5KG9wZW5lcnMsIGNsb3NlcnMsIHZhbHVlcywgYXR0cmlidXRlcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIiwgXCJ2YXIoLS1jbHItUmVkKVwiLCBcInZhcigtLWNsci1EYXJrQ3lhbilcIiwgXCJ2YXIoLS1jbHItR3JlZW4pXCIpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgICAgIG5ldyBDb2xvckNvZGUoY29sb3JsZXNzZWxlbWVudHMsIGVsZW1lbnRzY29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTsgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBodG1sZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgdXJsZXhDb2xvckNvZGUgPSB7XG4gICAgVVJMRVhDb2xvckNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb3RvY29sXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBkb21haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRvbWFpblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9ydFwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5xdWVyeVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52YWx1ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShwcm90b2NvbCwgZG9tYWluLCBwb3J0LCBmb2xkZXIsIFxuICAgICAgICAgICAgZmlsZSwgcXVlcnksIGtleSwgdmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50c2NvbG9ycyA9IG5ldyBBcnJheShcInZhcigtLWNsci1XaG9JU19PcmFuZ2UpXCIsIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsIFwidmFyKC0tY2xyLUdyZWVuKVwiLCBcInZhcigtLWNsci1SZWQpXCIsIFxuICAgICAgICAgICAgXCJ2YXIoLS1jbHItcHJpbWFyeS02MDApXCIsIFwidmFyKC0tY2xyLWFsbC1wcmltYXJ5LTUwMClcIiwgXG4gICAgICAgICAgICBcInZhcigtLWNsci1MaWdodGNvcmFsKVwiKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgICAgICBuZXcgQ29sb3JDb2RlKGNvbG9ybGVzc2VsZW1lbnRzLCBlbGVtZW50c2NvbG9ycywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKSk7ICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXJsZXhDb2xvckNvZGU7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBDb2xvckNvZGUgZnJvbSAnLi4vbW9kZWxzL0NvbG9yQ29kZSdcblxuY29uc3QgY3NzZXggPSB7XG4gICAgLyoqXG4gICAgICogQ3NzZXggaXMgYSB3aWRnZXQgaW4gQ1NTIHBhZ2UsIGFwcGx5aW5nIHN0eWxlIGNvbG9ycyB0byBlbGVtZW50cyBvZiBkaWZmZXJlbnRcbiAgICAgKiB0eXBlcyAoYmFzZWQgb24gdGhlIENTUyBwcm9ncmFtbWluZyBsYW5ndWFnZSlcbiAgICAgKi9cbiAgICBDU1NFWENvbG9yQ29kZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlNlbGVjdG9yXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BdHRyaWJ1dGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVmFsdWVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IHBzdWVkb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlBzdWVkby1jbGFzc1wiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcblxuICAgICAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgICAgICBjb25zdCBjb2xvcmxlc3NlbGVtZW50cyA9IG5ldyBBcnJheShzZWxlY3RvcnMsIGF0dHJpYnV0ZXMsIHZhbHVlcywgcHN1ZWRvcyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzY29sb3JzID0gbmV3IEFycmF5KFwidmFyKC0tY2xyLVJlZClcIiwgXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLCBcInZhcigtLWNsci1Ta3libHVlKVwiLCBcInZhcigtLWNsci1HcmVlbilcIik7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgYSBjb2xvciBjb2RlIG9iamVjdCB3aXRoIGFsbCBuZWVkZWQgZWxlbWVudHNcbiAgICAgICAgbmV3IENvbG9yQ29kZShjb2xvcmxlc3NlbGVtZW50cywgZWxlbWVudHNjb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpOyAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNzc2V4O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBSV0JSZWZlcmVuY2VFcnJvciB9IGZyb20gXCIuLi9tb2RlbHMvUldCRXJyb3JCdXNcIjtcblxuY29uc3QgZG9tYWlubG9va3VwID0ge1xuICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gR2V0IHRoZSBmb3JtLCBhc3NpZ24gdG8gYSB2YXJpYWJsZVxuICAgICAgICBsZXQgZm9ybWVsZW1jbGFzc25hbWUgPSAnc2VhcmNoV2hvSVMnO1xuICAgICAgICBsZXQgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgICAgICAgICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2Zvcm1lbGVtY2xhc3NuYW1lfWApIGFzIEhUTUxGb3JtRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGlmIChmb3JtID09IG51bGwpe1xuICAgICAgICAgICAgbmV3IFJXQlJlZmVyZW5jZUVycm9yKFwiRWxlbWVudE5vdEZvdW5kXCIsIGBFbGVtZW50IG5vdCBmb3VuZDogJyR7Zm9ybWVsZW1jbGFzc25hbWV9JzpgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZG9tYWlubG9va3VwLnNlYXJjaFdIT0lTKTtcbiAgICB9LFxuICAgIHNlYXJjaFdIT0lTOiAoKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHh0U2VhcmNoJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgbGV0IHZhbHVlID0gaW5wdXRlbGVtLnZhbHVlO1xuICAgICAgICB2YXIgVVJMID0gJ2h0dHBzOi8vd3d3Lndob2lzLmNvbS93aG9pcy8nICsgdmFsdWU7XG4gICAgICAgIHdpbmRvdy5vcGVuKFVSTCwgJ19ibGFuaycpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21haW5sb29rdXA7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IGhzbGNvbG9yd2lkZ2V0ID0ge1xuICAgIGluaXRoc2xjb2xvcnBpY2tlcjogKCkgPT4ge1xuICAgICAgICBsZXQgSFNMT05FID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNIU0xDb2xvck9ORVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgbGV0IEhTTFRXTyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUV09cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGxldCBIU0xUSFJFRSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUSFJFRVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgICAgICBjbGFzcyBib3hjb2xvciB7XG4gICAgICAgICAgICBodWUgPSAwO1xuICAgICAgICAgICAgc2F0dXJhdGlvbiA9IDEwMDtcbiAgICAgICAgICAgIGxpZ2h0bmVzcyA9IDUwO1xuICAgICAgICAgICAgY29uc3RydWN0b3IoaHVlID0gMCwgc2F0dXJhdGlvbiA9IDEwMCwgbGlnaHRuZXNzID0gNTApe1xuICAgICAgICAgICAgICAgIGlmKGh1ZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGh1ZSA9PSAxMjApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZSA9IDEyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGh1ZSA9PSAyNDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZSA9IDI0MFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaHVlIDwgMCB8fCBodWUgPj0gMzYwIHx8IHNhdHVyYXRpb24gPCAwIHx8IHNhdHVyYXRpb24gPiAxMDAgfHwgbGlnaHRuZXNzIDwgMCB8fCBsaWdodG5lc3MgPiAxMDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gbmV3IFJhbmdlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0hTTCBjb2xvciB2YWx1ZSBvdXQgb2YgYWNjZXB0YWJsZSByYW5nZTpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAgICAgICAgICdjb2xvcjpncmF5O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmdyYXk7JywgZXJyLCAnY29sb3I6Z3JheTtmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMubGlnaHRuZXNzID0gbGlnaHRuZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCByZWQgPSAwO1xuICAgICAgICBsZXQgZ3JlZW4gPSAxMjA7XG4gICAgICAgIGxldCBibHVlID0gMjQwO1xuXG4gICAgICAgIGxldCBIU0xCb3hDb2xvclJlZCA9IE9iamVjdC5jcmVhdGUobmV3IGJveGNvbG9yKHJlZCwgMTAwLCA1MCkpO1xuICAgICAgICBsZXQgSFNMQm94Q29sb3JHcmVlbiA9IE9iamVjdC5jcmVhdGUobmV3IGJveGNvbG9yKGdyZWVuLCAxMDAsIDUwKSk7XG4gICAgICAgIGxldCBIU0xCb3hDb2xvckJsdWUgPSBPYmplY3QuY3JlYXRlKG5ldyBib3hjb2xvcihibHVlLCAxMDAsIDUwKSk7XG4gICAgICAgIGxldCB0b3ByZWN0aHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yT05FIHNwYW4udmFsMScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IHRvcHJlY3RzYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JPTkUgc3Bhbi52YWwyJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgdG9wcmVjdGxpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0hTTENvbG9yT05FIHNwYW4udmFsMycpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IG1pZHJlY3RodWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUV08gc3Bhbi52YWwxJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgbWlkcmVjdHNhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvclRXTyBzcGFuLnZhbDInKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBtaWRyZWN0bGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUV08gc3Bhbi52YWwzJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICBsZXQgYm90cmVjdGh1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNIU0xDb2xvclRIUkVFIHNwYW4udmFsMScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgbGV0IGJvdHJlY3RzYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDInKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIGxldCBib3RyZWN0bGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDMnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRvcHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5odWU7XG4gICAgICAgIHRvcHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9uO1xuICAgICAgICB0b3ByZWN0bGlnaHQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5saWdodG5lc3M7XG4gICAgICAgIG1pZHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckdyZWVuLmh1ZTtcbiAgICAgICAgbWlkcmVjdHNhdC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbjtcbiAgICAgICAgbWlkcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3M7XG4gICAgICAgIGJvdHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUuaHVlO1xuICAgICAgICBib3RyZWN0c2F0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb247XG4gICAgICAgIGJvdHJlY3RsaWdodC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yQmx1ZS5saWdodG5lc3M7XG5cbiAgICAgICAgSFNMT05FLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvclJlZC5odWV9LCAke0hTTEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICBIU0xUV08uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yR3JlZW4uaHVlfSwgJHtIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgIEhTTFRIUkVFLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvckJsdWUuaHVlfSwgJHtIU0xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbn0lLCAke0hTTEJveENvbG9yQmx1ZS5saWdodG5lc3N9JSlgO1xuXG4gICAgICAgIGNvbnN0IEh1ZVNsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjSHVlYCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgY29uc3QgU2F0dXJhdGlvblNsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjU2F0dXJhdGlvbmApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IExpZ2h0bmVzc1NsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjTGlnaHRuZXNzYCkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICBIdWVTbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaHVlaW5wdXR2YWx1ZSA9IEh1ZVNsZHIudmFsdWU7XG4gICAgICAgICAgICBIU0xPTkUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2h1ZWlucHV0dmFsdWV9LCAke0hTTEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVFdPLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtodWVpbnB1dHZhbHVlfSwgJHtIU0xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHVlaW5wdXR2YWx1ZX0sICR7SFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTEJveENvbG9yUmVkLmh1ZSA9IGh1ZWlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckdyZWVuLmh1ZSA9IGh1ZWlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckJsdWUuaHVlID0gaHVlaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIHRvcHJlY3RodWUudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5odWU7XG4gICAgICAgICAgICBtaWRyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5odWU7XG4gICAgICAgICAgICBib3RyZWN0aHVlLnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JCbHVlLmh1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICBTYXR1cmF0aW9uU2xkci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNhdHVyYXRpb25pbnB1dHZhbHVlID0gU2F0dXJhdGlvblNsZHIudmFsdWU7XG4gICAgICAgICAgICBIU0xPTkUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke0hTTEJveENvbG9yUmVkLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgICAgICAgSFNMVFdPLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtIU0xCb3hDb2xvckdyZWVuLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JCbHVlLmh1ZX0sICR7c2F0dXJhdGlvbmlucHV0dmFsdWV9JSwgJHtIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcbiAgICAgICAgICAgIEhTTEJveENvbG9yUmVkLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbiA9IHNhdHVyYXRpb25pbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb24gPSBzYXR1cmF0aW9uaW5wdXR2YWx1ZTtcbiAgICAgICAgICAgIHRvcHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9uO1xuICAgICAgICAgICAgbWlkcmVjdHNhdC50ZXh0Q29udGVudCA9IEhTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbjtcbiAgICAgICAgICAgIGJvdHJlY3RzYXQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbjtcbiAgICAgICAgfSlcblxuICAgICAgICBMaWdodG5lc3NTbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGlnaHRpbnB1dHZhbHVlID0gTGlnaHRuZXNzU2xkci52YWx1ZTtcbiAgICAgICAgICAgIEhTTE9ORS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JSZWQuaHVlfSwgJHtIU0xCb3hDb2xvclJlZC5zYXR1cmF0aW9ufSUsICR7bGlnaHRpbnB1dHZhbHVlfSUpYDtcbiAgICAgICAgICAgIEhTTFRXTy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JHcmVlbi5odWV9LCAke0hTTEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbn0lLCAke2xpZ2h0aW5wdXR2YWx1ZX0lKWA7XG4gICAgICAgICAgICBIU0xUSFJFRS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7SFNMQm94Q29sb3JCbHVlLmh1ZX0sICR7SFNMQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtsaWdodGlucHV0dmFsdWV9JSlgO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JSZWQubGlnaHRuZXNzID0gbGlnaHRpbnB1dHZhbHVlO1xuICAgICAgICAgICAgSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3MgPSBsaWdodGlucHV0dmFsdWU7XG4gICAgICAgICAgICBIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzID0gbGlnaHRpbnB1dHZhbHVlO1xuICAgICAgICAgICAgdG9wcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JSZWQubGlnaHRuZXNzO1xuICAgICAgICAgICAgbWlkcmVjdGxpZ2h0LnRleHRDb250ZW50ID0gSFNMQm94Q29sb3JHcmVlbi5saWdodG5lc3M7XG4gICAgICAgICAgICBib3RyZWN0bGlnaHQudGV4dENvbnRlbnQgPSBIU0xCb3hDb2xvckJsdWUubGlnaHRuZXNzO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHNsY29sb3J3aWRnZXQ7IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUldCUGVyZiBmcm9tICcuLi9tb2RlbHMvU2NyaXB0UGVyZidcblxuY29uc3QgbW9iaWxlQWJick1hcmt1cCA9IHtcbiAgICBpbml0OiAoKSA9PntcbiAgICAgICAgLy9iZWdpbiBtb2JpbGUgbWFya3VwXG4gICAgICAgIG1vYmlsZUFiYnJNYXJrdXAubW9iaWxlQWJick1hcmt1cHMoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAgICAgKiBBdHRyaWJ1dGUgdGFncyBvbiBtb2JpbGUgZG8gbm90IGhhdmUgaG92ZXIgb3B0aW9uLiBUaGlzIGZ1bmN0aW9uIGFkZHMgYSBjbGlja1xuICAgICAgICAgKiAgYWJpbGl0eSB0byBkZWZpbmUgYW4gYWJiciB0YWcsIHRoYW4gcmVseSBvbiB0aGUgdGl0bGUgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICBtb2JpbGVBYmJyTWFya3VwczogKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2JpbGVhYmJycGVyZiA9IG5ldyBSV0JQZXJmKFwiTW9iaWxlYWJicnBlcmZcIik7IC8vc3RhcnQgcGVyZm9ybWFuY2UgbWVhc3VyZVxuICAgICAgICAvKipcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzcyBBYmJyT3BlbntcbiAgICAgICAgICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgYWJickVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsYWJicmV2aWF0aW9uZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYWJiclwiKTtcbiAgICAgICAgaWYoYWxsYWJicmV2aWF0aW9uZWxlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBhYmJyIG9mIGFsbGFiYnJldmlhdGlvbmVsZW1zKXtcbiAgICAgICAgICAgICAgICBsZXQgYWJicmV2ID0gbmV3IEFiYnJPcGVuKCk7XG4gICAgICAgICAgICAgICAgYWJicmV2LmFiYnJFbGVtZW50ID0gYWJicjtcblxuICAgICAgICAgICAgICAgIGFiYnJldi5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJicnRpdGxlYXR0cnZhbDogc3RyaW5nID0gYWJicmV2LmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGFiYnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWJicmV2LmFiYnJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA8IDEpeyAvL2NyZWF0ZSB0aGUgc3BhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBhYmJyZXYuYWJickVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSgxNjApfSgke2FiYnJ0aXRsZWF0dHJ2YWx9JHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9zaG93IHRoZSBzcGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGFiYnJldi5hYmJyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJicnRpdGxlYXR0cnZhbH0ke1N0cmluZy5mcm9tQ2hhckNvZGUoMTYwKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhYmJyZXYuYWJickVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1vYmlsZWFiYnJwZXJmLmVuZCgpIC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBtb2JpbGVBYmJyTWFya3VwO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IHNsaWRlcmJhciA9IHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgIHZhciBkaXZpc29yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXZpc29yXCIpLCBcbiAgICAgICAgc2xpZGVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgc2xpZGVCYXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcInNsaWRlclwiKTtcbiAgICAgICAgc2xpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiBzbGlkZXJiYXIubW92ZURpdmlzb3JCYXIoZGl2aXNvciwgc2xpZGVCYXIpKTtcbiAgICB9LFxuICAgIG1vdmVEaXZpc29yQmFyOiAoZGl2aXNvcjogSFRNTEVsZW1lbnQsIHNsaWRlQmFyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGRpdmlzb3Iuc3R5bGUud2lkdGggPSBzbGlkZUJhci52YWx1ZSArIFwiJVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVyYmFyOyIsIlwic3RyaWN0IG1vZGVcIlxuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgV2ViQml0IGZyb20gXCIuLi9tb2RlbHMvV2ViQml0XCI7XG5pbXBvcnQgQXR0cmlidXRpb25MaW5rIGZyb20gXCIuLi9tb2RlbHMvQXR0cmlidXRpb25MaW5rXCI7XG5cbi8vIENyZWF0ZSBuZXcgQUEgKEFyYml0cmFyeSBBcnRpY2xlKVxuXG4vKipcbiAqIFwiQXJiaXRyYXJ5IEFydGljbGVzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBBcmJpdHJhcnlBcnRpY2xlcyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRvbWFpbmxvb2t1cFwiLFxuICAgICAgICAxLFxuICAgICAgICBcIkRvbWFpbiBMb29rdXBcIixcbiAgICAgICAgXCJDaGVjayBhbiBhdmFpbGFibGUgZG9tYWluIHVzaW5nIFdob0lTIEFQSSBzZWFyY2hcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDQpLFxuICAgICAgICBcInBhZ2VzL2RvbWFpbmxvb2t1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dob2lzLndlYnBcIixcbiAgICAgICAgXCJXaG9JcyBMb29rdXBcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZG9tYWluIGljb25zXCIsXG4gICAgICAgICAgICBcIkRvbWFpbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kb21haW5cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiRG9tYWluIExvb2t1cFwiLFxuICAgICAgICAgICAgMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0bWxyZXNwb25zZXNcIixcbiAgICAgICAgMixcbiAgICAgICAgXCJIVE1MIEZyYW1lc1wiLFxuICAgICAgICBcIlZpZXcgSFRNTCBwYWdlIHJlc3BvbnNlIHN0YXR1cyBpbmZvcm1hdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTEpLFxuICAgICAgICBcInBhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBcImltZy9IVE1MX0ZyYW1lcy53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBmcmFtZXMgZXhhbXBsZVwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJjb2RlIGljb25zXCIsXG4gICAgICAgICAgICBcIkNvZGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29kZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgICAgICAyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2VidGVjaFwiLFxuICAgICAgICA1LFxuICAgICAgICBcIldhcHBhbHl6ZXJcIixcbiAgICAgICAgXCJXYXBwYWx5emVyIGJyb3dzZXIgZXh0ZW5zaW9uXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDIpLFxuICAgICAgICBcInBhZ2VzL3dlYnRlY2guaHRtbFwiLFxuICAgICAgICBcImltZy93YXBwYWx5emVyLWxvZ28ud2VicFwiLFxuICAgICAgICBcIkJyb3dzZXIgZXh0ZW5zaW9uIGxvZ28uIEEgd2hpdGUgdyBvbiBhIHB1cnBsZSB0aWxlLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkpzb25vYmplY3RcIixcbiAgICAgICAgNixcbiAgICAgICAgXCJqc29uT2JqZWN0XCIsXG4gICAgICAgIFwiSlNPTiBvYmplY3Qgbm90YXRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgOSksXG4gICAgICAgIFwicGFnZXMvanNvbm9iamVjdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2pzb24ud2VicFwiLFxuICAgICAgICBcIkpTT04gbG9nbzogQSBncmV5IGNpcmNsZSB3aXRoIGFydGlzdGljIHNwaXJhbHMuXCJcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ktRmlcIixcbiAgICAgICAgNyxcbiAgICAgICAgXCJXaS1GaSBWZXJzaW9uXCIsXG4gICAgICAgIFwiRGV0ZXJtaW5lIFdpZmkgVmVyc2lvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAxLCAxNiksXG4gICAgICAgIFwicGFnZXMvd2lmaS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3dpZmkud2VicFwiLFxuICAgICAgICBcIldpLUZpIGxvZ28gd2l0aCBhIGJsYWNrIGNpcmNsZSBiYWNrZ3JvdW5kLlwiXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNoYXRncHRcIixcbiAgICAgICAgOCxcbiAgICAgICAgXCJQcmV2aWV3IGNoYXRHUFRcIixcbiAgICAgICAgXCJDaGF0IHdpdGggYW4gQUkgZm9yIHJlc2VhcmNoIGFuZCBkZXZlbG9wbWVudC5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMjgpLFxuICAgICAgICBcInBhZ2VzL2NoYXRncHQuaHRtbFwiLFxuICAgICAgICBcImltZy9haS53ZWJwXCIsXG4gICAgICAgIFwiRGVjb3JhdGl2ZSBBSSBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImFpIGljb25zXCIsXG4gICAgICAgICAgICBcIkFpIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL2FpXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlByZXZpZXcgY2hhdEdQVFwiLFxuICAgICAgICAgICAgOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBhaW50M2RcIixcbiAgICAgICAgOSxcbiAgICAgICAgXCJQYWludCAzRFwiLFxuICAgICAgICBcIkVkaXQgcGljdHVyZXMgb3Igc2NyZWVuIGNhcHR1cmVzIHVzaW5nIHBhaW50IDNEXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDEsIDI4KSxcbiAgICAgICAgXCJwYWdlcy9wYWludDNkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvcHJvdG90eXBlLndlYnBcIixcbiAgICAgICAgXCJDb2xvcmZ1bCBwcm90b3R5cGluZyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInByb3RvdHlwZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJQcm90b3R5cGUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcHJvdG90eXBlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBhaW50IDNEXCIsXG4gICAgICAgICAgICA5XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGljdGlvbmFyeVwiLFxuICAgICAgICAxMCxcbiAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgIFwiTGlzdCBkaWN0aW9uYXJ5IHRlcm1zIHVzaW5nIGEgZGljdGlvbmFyeSBBUElcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMSwgMzApLFxuICAgICAgICBcInBhZ2VzL2RpY3Rpb25hcnl3b3JkLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZGljdGlvbmFyeS53ZWJwXCIsXG4gICAgICAgIFwiRGljdGlvbmFyeSBpY29uIGRlcGljdGlvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkaWN0aW9uYXJ5IGljb25zXCIsXG4gICAgICAgICAgICBcIkRpY3Rpb25hcnkgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJEaWN0aW9uYXJ5IFRlcm1zXCIsXG4gICAgICAgICAgICAxMFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkJvaW5jXCIsXG4gICAgICAgIDExLFxuICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgIFwiUGl2b3QgdGhlIHVudXNlZCBjb21wdXRpbmcgcG90ZW50aWFsIGZvciBzY2llbmNlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDIsIDYpLFxuICAgICAgICBcInBhZ2VzL2JvaW5jLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYm9pbmNfZ2xvc3N5LndlYnBcIixcbiAgICAgICAgXCJCT0lOQyBsb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIkJPSU5DIGljb25zXCIsXG4gICAgICAgICAgICBcIkJPSU5DIGljb24gZGVzaWduZWQgYnkgTWljaGFsIEtyYWtvd2lhay4gQ295cmlnaHQoQykgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vYm9pbmMuYmVya2VsZXkuZWR1XCIsXG4gICAgICAgICAgICBcIkJPSU5DXCIsXG4gICAgICAgICAgICBcIkNvbnRyaWJ1dGUgZm9yIFNjaWVuY2UgVW5pdGVkXCIsXG4gICAgICAgICAgICAxMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIklQQWRkcmVzc1wiLFxuICAgICAgICAxMixcbiAgICAgICAgXCJJUCBBZGRyZXNzIExvb2t1cFwiLFxuICAgICAgICBcIkxvb2t1cCBwdWJsaWMgYW5kIGxvY2FsIElQIGFkZHJlc3Nlc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAyLCAxMyksXG4gICAgICAgIFwicGFnZXMvaXBhZGRyZXNzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaXAud2VicFwiLFxuICAgICAgICBcIklQIGxvY2F0aW9uIGFuZCBicm93c2VyIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSVAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSVAgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvaXBcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSVAgQWRkcmVzcyBMb29rdXBcIixcbiAgICAgICAgICAgIDEyXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiSFRNTE1hcmt1cFwiLFxuICAgICAgICAxMyxcbiAgICAgICAgXCJIVE1MIFNvdXJjZSBDb2RlXCIsXG4gICAgICAgIFwiUmV2ZWFsIEhUTUwgc291cmNlIGNvZGUgYW5kIEphdmFTY3JpcHRcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcInBhZ2VzL21hcmt1cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL0hUTUxfc291cmNlLndlYnBcIixcbiAgICAgICAgXCJIVE1MIGZyYW1lcyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUTUwgU291cmNlIENvZGVcIixcbiAgICAgICAgICAgIDEzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTmV0d29ya3NwZWVkXCIsXG4gICAgICAgIDE1LFxuICAgICAgICBcIk5ldHdvcmsgU3BlZWQgVGVzdFwiLFxuICAgICAgICBcIlRlc3QgdGhlIG5ldHdvcmsgYWRhcHRlcnMgd2l0aCBhIFBvd2VyU2hlbGwgc2NyaXB0XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDcpLFxuICAgICAgICBcInBhZ2VzL25ldHdvcmtzcGVlZC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3BhZ2Utc3BlZWQud2VicFwiLFxuICAgICAgICBcIlNwZWVkIHRlc3QgZGlhbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInBhZ2Ugc3BlZWQgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUGFnZSBzcGVlZCBpY29ucyBjcmVhdGVkIGJ5IFByb3N5bWJvbHMgUHJlbWl1bSAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3BhZ2Utc3BlZWRcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTmV0d29yayBTcGVlZFwiLFxuICAgICAgICAgICAgMTVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJQb3dlclNoZWxsZHJpdmVzXCIsXG4gICAgICAgIDE3LFxuICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgIFwiU2ltaWxhciB0byBhbiBIREQsIGV4Y2VwdCBpdCBpcyBvbmx5IGluIFBvd2VyU2hlbGxcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMywgMjApLFxuICAgICAgICBcInBhZ2VzL2RyaXZlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3Rlcm1pbmFsLndlYnBcIixcbiAgICAgICAgXCJDb21wdXRlciB0ZXJtaW5hbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRlcm1pbmFsIGljb25zXCIsXG4gICAgICAgICAgICBcIlRlcm1pbmFsIGljb25zIGNyZWF0ZWQgYnkgRmxhdCBJY29ucyAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rlcm1pbmFsXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlBvd2VyU2hlbGwgRHJpdmVzXCIsXG4gICAgICAgICAgICAxN1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkxFQVJOX19ETlNcIixcbiAgICAgICAgMjAsXG4gICAgICAgIFwiSG93IEROUyB3b3Jrc1wiLFxuICAgICAgICBcIkEgZ2VuZXJhbCBvdmVydmlldyBvZiBEb21haW4gTmFtZSBTeXN0ZW1cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgNCksXG4gICAgICAgIFwicGFnZXMvZG5zLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZG5zLndlYnBcIixcbiAgICAgICAgXCJETlMgZHJhd2luZyBhdHRhY2hlZCB0byBhIGtleWJvYXJkXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImRucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJEbnMgaWNvbnMgY3JlYXRlZCBieSBrZXJpc21ha2VyIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZG5zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBETlNcIixcbiAgICAgICAgICAgIDIwXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiTEVBUk5fX0dvb2dsZVwiLFxuICAgICAgICAyMixcbiAgICAgICAgXCJHb29nbGUgaXMgIzEgd2Vic2l0ZVwiLFxuICAgICAgICBcIkdvb2dsZSBpcyB0aGUgIzEgdHJhZmZpY2tlZCBzaXRlXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDQsIDE3KSxcbiAgICAgICAgXCJwYWdlcy9nb29nbGUuaHRtbFwiLFxuICAgICAgICBcImltZy9zZWFyY2gtZW5naW5lLndlYnBcIixcbiAgICAgICAgXCJBIGJhciBncmFwaCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInJhbmsgaWNvbnNcIixcbiAgICAgICAgICAgIFwiUmFuayBpY29ucyBjcmVhdGVkIGJ5IFBpeGVsbWVldHVwIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvcmFua1wiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJMRUFSTjogR29vZ2xlXCIsXG4gICAgICAgICAgICAyMlxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRPTVwiLFxuICAgICAgICAyMyxcbiAgICAgICAgXCJET01cIixcbiAgICAgICAgXCJSZXZpZXcgdGhlIERPTSB3aXRoIGEgRE9NIHRyZWVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMjcpLFxuICAgICAgICBcInBhZ2VzL2RvbS5odG1sXCIsXG4gICAgICAgIFwiaW1nL3RyZWUud2VicFwiLFxuICAgICAgICBcIkEgdHJlZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRyZWUgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVHJlZSBpY29ucyBjcmVhdGVkIGJ5IGp1c3RpY29uIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdHJlZVwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJET01cIixcbiAgICAgICAgICAgIDIzXG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiV2ViaWRlXCIsXG4gICAgICAgIDI0LFxuICAgICAgICBcIldlYklERVwiLFxuICAgICAgICBcIlRyeSBza2lwcGluZyB0aGUgZG93bmxvYWQgd2l0aCBhIHdlYiBJREVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMyksXG4gICAgICAgIFwicGFnZXMvd2ViaWRlcy5odG1sXCIsXG4gICAgICAgIFwiaW1nL3V4LndlYnBcIixcbiAgICAgICAgXCJBIGNvbXB1dGVyIGFwcGxpY2F0aW9uIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiZGVzaWduIGljb25zXCIsXG4gICAgICAgICAgICBcIkRlc2lnbiBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXNpZ25cIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwid2ViaWRlc1wiLFxuICAgICAgICAgICAgMjRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgMjUsXG4gICAgICAgIFwiU1ZHXCIsXG4gICAgICAgIFwiRmluZCBhbiBTVkcgYW5kIGxlYXJuIGFib3V0IHRoZSBTVkcgbGFuZ3VhZ2VcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgOSksXG4gICAgICAgIFwicGFnZXMvc3ZnLmh0bWxcIixcbiAgICAgICAgXCJpbWcvc3ZnLnN2Z1wiLFxuICAgICAgICBcIkFuIHN2ZyBpY29uIGV4YW1wbGUuXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNjYWxhYmxlIHZlY3RvciBncmFwaGljc1wiLFxuICAgICAgICAgICAgXCJTVkcgaWNvbiBjcmVhdGVkIGJ5IEhhcnZleSBSYXluZXJcIixcbiAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHL1wiLFxuICAgICAgICAgICAgXCJXM0NcIixcbiAgICAgICAgICAgIFwic3ZnXCIsXG4gICAgICAgICAgICAyNVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkRpc2FibGVfSmF2YXNjcmlwdFwiLFxuICAgICAgICAyNixcbiAgICAgICAgXCJEaXNhYmxlIEphdmFTY3JpcHRcIixcbiAgICAgICAgXCJEaXNhYmxlIHRoZSBKYXZhU2NyaXB0IHRvIHRlc3Qgd2Vic2l0ZSBmdW5jdGlvblwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA1LCAyMiksXG4gICAgICAgIFwicGFnZXMvamF2YXNjcmlwdC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3NvZnR3YXJlLWFwcGxpY2F0aW9uLndlYnBcIixcbiAgICAgICAgXCJBIGphdmFzY3JpcHQgZnVuY3Rpb24gaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwid2ViIGNvZGluZyBpY29uc1wiLFxuICAgICAgICAgICAgXCJXZWIgY29kaW5nIGljb25zIGNyZWF0ZWQgYnkgTXVoYW1tYWQgQXRpZiAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3dlYi1jb2RpbmdcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgMjZcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMRUFSTl9fSFRUUFwiLFxuICAgICAgICAyOCxcbiAgICAgICAgXCJIVFRQXCIsXG4gICAgICAgIFwiSFRUUCBtYWtlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmcgd2ViIHBhZ2VzIHBvc3NpYmxlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxMiksXG4gICAgICAgIFwicGFnZXMvaHR0cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2h0dHAud2VicFwiLFxuICAgICAgICBcIkh0dHAgdmVyYiBpbiBmcm9udCBvZiBhIGdsb2JlIGljb24uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0dHAgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHR0cCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odHRwXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkxFQVJOOiBIVFRQXCIsXG4gICAgICAgICAgICAyOFxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNTU2RlZlwiLFxuICAgICAgICAyOSxcbiAgICAgICAgXCJDU1NcIixcbiAgICAgICAgXCJDU1Mgc3R5bGVzIHRoZSBlbGVtZW50cyB3aXRoaW4gYSBwYWdlLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA2LCAxOSksXG4gICAgICAgIFwicGFnZXMvY3NzLmh0bWxcIixcbiAgICAgICAgXCJpbWcvY3NzLTMud2VicFwiLFxuICAgICAgICBcIkEgQ1NTIHRocmVlIGxvZ28uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNzcyBpY29uc1wiLFxuICAgICAgICAgICAgXCJDc3MgaWNvbnMgY3JlYXRlZCBieSBQaXhlbCBwZXJmZWN0IC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY3NzXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNTU1wiLFxuICAgICAgICAgICAgMjlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJMYXRlbmN5XCIsXG4gICAgICAgIDMyLFxuICAgICAgICBcIkxhdGVuY3lcIixcbiAgICAgICAgXCJUcmF2ZWwgbGF0ZW5jeSBjYW4gc2xvdyBkb3duIGEgd2Vic2l0ZS5cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMTgpLFxuICAgICAgICBcInBhZ2VzL2xhdGVuY3kuaHRtbFwiLFxuICAgICAgICBcImltZy9jaHJvbm9tZXRlci53ZWJwXCIsXG4gICAgICAgIFwiQSBzdG9wd2F0Y2ggaWNvbi5cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidGltZXIgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVGltZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvdGltZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiTGF0ZW5jeVwiLFxuICAgICAgICAgICAgMzJcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIVE1MZGVmXCIsXG4gICAgICAgIDMzLFxuICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgIFwiTGVhcm4gdGhlIHBhcnRzIGFuZCBzeW50YXggb2YgYW4gSFRNTCBlbGVtZW50XCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDI1KSxcbiAgICAgICAgXCJwYWdlcy9odG1sLmh0bWxcIixcbiAgICAgICAgXCJpbWcvaHRtbC53ZWJwXCIsXG4gICAgICAgIFwiSFRNTCBlbGVtZW50IHN5bnRheCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImh0bWwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiSHRtbCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9odG1sXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkNyZWF0ZSBIVE1MIGVsZW1lbnRzXCIsXG4gICAgICAgICAgICAzM1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlVSTFwiLFxuICAgICAgICAzNCxcbiAgICAgICAgXCJVUkwgQWRkcmVzcyBFeGFtcGxlc1wiLFxuICAgICAgICBcIkxlYXJuIHRoZSBwYXJ0cyBhbmQgc3ludGF4IG9mIGEgVVJMXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDgsIDcpLFxuICAgICAgICBcInBhZ2VzL3VybC5odG1sXCIsXG4gICAgICAgIFwiaW1nL3d3dy53ZWJwXCIsXG4gICAgICAgIFwiVVJMIGV4YW1wbGUgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJ1cmwgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVXJsIGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3VybFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJDcmVhdGUgSFRNTCBlbGVtZW50c1wiLFxuICAgICAgICAgICAgMzRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEYXRhU3RvcmFnZVwiLFxuICAgICAgICAzNSxcbiAgICAgICAgXCJEYXRhIFN0b3JhZ2VcIixcbiAgICAgICAgXCJMb2NhbCBzdG9yYWdlIHNhdmVzIGRhdGEgd2hlbiBuZWVkZWQgZm9yIGNvbmN1cnJlbnQgcGFnZSBzdXJmaW5nLlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCA4LCAxNCksXG4gICAgICAgIFwicGFnZXMvZGF0YXN0b3JhZ2UuaHRtbFwiLFxuICAgICAgICBcImltZy9zZXJ2ZXIud2VicFwiLFxuICAgICAgICBcIkRhdGEgc3RvcmFnZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNlcnZlciBpY29uc1wiLFxuICAgICAgICAgICAgXCJTZXJ2ZXIgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc2VydmVyXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkRhdGEgU3RvcmFnZVwiLFxuICAgICAgICAgICAgMzVcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJIU0xcIixcbiAgICAgICAgMzYsXG4gICAgICAgIFwiSHVlLCBTYXR1cmF0aW9uLCBhbmQgTGlnaHRuZXNzXCIsXG4gICAgICAgIFwiSFNMIGNvbG9ycyBtYW5pcHVsYXRlIGh1ZXMuXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDksIDYpLFxuICAgICAgICBcInBhZ2VzL2hzbC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbG9yLXdoZWVsLndlYnBcIixcbiAgICAgICAgXCJDb2xvciB3aGVlbCBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInZhcmlldHkgaWNvbnNcIixcbiAgICAgICAgICAgIFwiVmFyaWV0eSBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy92YXJpZXR5XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkh1ZSwgU2F0dXJhdGlvbiwgYW5kIExpZ2h0bmVzc1wiLFxuICAgICAgICAgICAgMzZcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIFwiR3VpZGUgU2hvcnRzJyBzZWN0aW9uIGNhcmQgZGF0YS5cIlxuICovXG5jb25zdCBHdWlkZVNob3J0cyA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkh0dHBzY2VydFwiLFxuICAgICAgICA0LFxuICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgIFwiU2VsZWN0IHRvIHZpZXcgYSB3ZWJzaXRlJ3MgSFRUUFMgY2VydGlmaWNhdGVcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMiwgMTIsIDI2KSxcbiAgICAgICAgXCJndWlkZXMvaHR0cHMuaHRtbFwiLFxuICAgICAgICBcImltZy9odHRwc19jZXJ0LndlYnBcIixcbiAgICAgICAgXCJDdXJzb3Igc2VsZWN0aW5nIEhUVFBTIGNlcnRpZmljYXRlXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInNzbCBjZXJ0aWZpY2F0ZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJTc2wgY2VydGlmaWNhdGUgaWNvbnMgY3JlYXRlZCBieSBpbmlwYWdpc3R1ZGlvIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvc3NsLWNlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkhUVFBTIENlcnRpZmljYXRlXCIsXG4gICAgICAgICAgICA0XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiU2VhcmNodmVydGljYWxzXCIsXG4gICAgICAgIDE0LFxuICAgICAgICBcIkdVSURFOiBTZWFyY2ggVmVydGljYWxzXCIsXG4gICAgICAgIFwiT3B0aW1pemUgeW91ciBzZWFyY2ggZW5naW5lIG5ld3MgYW5kIHJlc3VsdHNcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgMiwgMjYpLFxuICAgICAgICBcImd1aWRlcy9zZWFyY2h2ZXJ0aWNhbHMuaHRtbFwiLFxuICAgICAgICBcImltZy9zZWFyY2hfc2V0dGluZ3Mud2VicFwiLFxuICAgICAgICBcIlNlYXJjaCBzZXR0aW5ncyBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvbnRlbnQgd3JpdGluZyBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb250ZW50IHdyaXRpbmcgaWNvbnMgY3JlYXRlZCBieSBWZWN0b3JzIFRhbmsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9jb250ZW50LXdyaXRpbmdcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiU2VhcmNoIFZlcnRpY2Fsc1wiLFxuICAgICAgICAgICAgMTRcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJTTVRQXCIsXG4gICAgICAgIDE2LFxuICAgICAgICBcIkdVSURFOiBTTVRQIGFuZCBFbWFpbFwiLFxuICAgICAgICBcIkxlYXJuIEVtYWlsIHByb3RvY29scyBhbmQgcG9ydCBudW1iZXJzXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDEzKSxcbiAgICAgICAgXCJndWlkZXMvc210cC5odG1sXCIsXG4gICAgICAgIFwiaW1nL2NvbW11bmljYXRpb25zLndlYnBcIixcbiAgICAgICAgXCJFbWFpbCBzZXJ2ZXItc3RhY2sgd2l0aCBtYWlsIGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwic2VydmVyIGljb25zXCIsXG4gICAgICAgICAgICBcIlNlcnZlciBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9zZXJ2ZXJcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiU01UUCBhbmQgRW1haWxcIixcbiAgICAgICAgICAgIDE2XG4gICAgICAgIClcbiAgICApLFxuICAgIG5ldyBXZWJCaXQoXG4gICAgICAgIFwiRGV2dG9vbHNcIixcbiAgICAgICAgMTksXG4gICAgICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgICAgICBcIlJldmlldyBkZXYgdG9vbCdzIGFwcGxpY2F0aW9uIHRhYlwiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIzLCAzLCAyNyksXG4gICAgICAgIFwiZ3VpZGVzL2FwcGxpY2F0aW9udGFiLmh0bWxcIixcbiAgICAgICAgXCJpbWcvdG9vbC1ib3gud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb25cIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwidG9vbGJveCBpY29uc1wiLFxuICAgICAgICAgICAgXCJUb29sYm94IGljb25zIGNyZWF0ZWQgYnkgRnJlZXBpayAtIEZsYXRpY29uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9mcmVlLWljb25zL3Rvb2xib3hcIixcbiAgICAgICAgICAgIFwiRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiR1VJREU6IERldiBBcHBsaWNhdGlvblwiLFxuICAgICAgICAgICAgMTlcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJEZXZ0b29sc3R3b1wiLFxuICAgICAgICAyMSxcbiAgICAgICAgXCJHVUlERTogSW5zcGVjdCBQYWdlc1wiLFxuICAgICAgICBcIk9wZW4gdGhlIGRldmVsb3BlcidzIHRvb2xib3ggYW5vdGhlciB3YXlcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNCwgMTApLFxuICAgICAgICBcImd1aWRlcy9pbnNwZWN0cGFnZXMuaHRtbFwiLFxuICAgICAgICBcImltZy90b29sLWJveDIud2VicFwiLFxuICAgICAgICBcIkRldmVsb3BlcidzIHRvb2wga2l0IGljb24gdHdvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcInRvb2xib3ggaWNvbnNcIixcbiAgICAgICAgICAgIFwiVG9vbGJveCBpY29ucyBjcmVhdGVkIGJ5IEZyZWVwaWsgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy90b29sYm94XCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBJbnNwZWN0IFBhZ2VzXCIsXG4gICAgICAgICAgICAyMVxuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIlBXQUljb25cIixcbiAgICAgICAgMjcsXG4gICAgICAgIFwiR1VJREU6IEluc3RhbGwgdGhlIFBXQSBhcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCJQcm9ncmVzc2l2ZSB3ZWJzaXRlcyBoYXZlIGFuIGluc3RhbGxhdGlvbiBvcHRpb25cIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNSwgMjcpLFxuICAgICAgICBcImd1aWRlcy9wd2FpY29uLmh0bWxcIixcbiAgICAgICAgXCJpbWcvYXBwLWRldmVsb3BtZW50LndlYnBcIixcbiAgICAgICAgXCJBcHAgZGV2ZWxvcG1lbnQgaWNvblwiLFxuICAgICAgICBuZXcgQXR0cmlidXRpb25MaW5rKFxuICAgICAgICAgICAgXCJkZXZlbG9wbWVudCBpY29uc1wiLFxuICAgICAgICAgICAgXCJEZXZlbG9wbWVudCBpY29ucyBjcmVhdGVkIGJ5IERlc2lnbiBDaXJjbGUgLSBGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vZnJlZS1pY29ucy9kZXZlbG9wbWVudFwiLFxuICAgICAgICAgICAgXCJGbGF0aWNvblwiLFxuICAgICAgICAgICAgXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAyN1xuICAgICAgICApXG4gICAgKSxcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIkNsZWFyY29va2llc1wiLFxuICAgICAgICAzMCxcbiAgICAgICAgXCJHVUlERTogQ2xlYXIgY29va2llcyBxdWlja2x5XCIsXG4gICAgICAgIFwiRG9uJ3Qgd2FzdGUgdGltZSBzaWZ0aW5nIHRocm91Z2ggc2V0dGluZ3NcIixcbiAgICAgICAgbmV3IERhdGUoMjAyMywgNywgMiksXG4gICAgICAgIFwiZ3VpZGVzL2NsZWFyY29va2llc3F1aWNrbHkuaHRtbFwiLFxuICAgICAgICBcImltZy9jb29raWVzLndlYnBcIixcbiAgICAgICAgXCJCcm93c2VyIGNvb2tpZSBpY29uXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImNvb2tpZSBpY29uc1wiLFxuICAgICAgICAgICAgXCJDb29raWUgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvY29va2llXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIkdVSURFOiBDbGVhciBjb29raWVzIHF1aWNrbHlcIixcbiAgICAgICAgICAgIDMwXG4gICAgICAgIClcbiAgICApLFxuKTtcblxuLyoqXG4gKiBcIkV4cGxvcmUgc2VjdGlvbiBjYXJkIGRhdGEuXCJcbiAqL1xuY29uc3QgRXhwbG9yZSA9IG5ldyBBcnJheShcbiAgICBuZXcgV2ViQml0KFxuICAgICAgICBcIk5hc2FcIixcbiAgICAgICAgMyxcbiAgICAgICAgXCJFWFBMT1JFOiBOQVNBIFBhZ2VzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgTkFTQSBkb21haW4uIExlYXJuIGFib3V0IHRoZSB1bml2ZXJzZSB2aWEgTkFTQSBsaW5rc1wiLFxuICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxMiwgMTgpLFxuICAgICAgICBcImV4cGxvcmUvbmFzYS5odG1sXCIsXG4gICAgICAgIFwiaW1nL05BU0Eud2VicFwiLFxuICAgICAgICBcIk5BU0EgQXJ0ZW1pcyBMb2dvXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcIk5BU0FcIixcbiAgICAgICAgICAgIFwiSW1hZ2Ugc291cmNlIHZpYSB0aGUgTmF0aW9uYWwgQWVyb25hdXRpY3MgYW5kIFNwYWNlIEFkbWluaXN0cmF0aW9uXCIsXG4gICAgICAgICAgICBcImh0dHBzOi8vd3d3Lm5hc2EuZ292L2F1ZGllbmNlL2ZvcnN0dWRlbnRzLzUtOC9mZWF0dXJlcy9zeW1ib2xzLW9mLW5hc2EuaHRtbFwiLFxuICAgICAgICAgICAgXCJOQVNBXCIsXG4gICAgICAgICAgICBcIk5BU0EgUGFnZXNcIixcbiAgICAgICAgICAgIDNcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJWaXJ0dWFsdG91clwiLFxuICAgICAgICAxOCxcbiAgICAgICAgXCJFWFBMT1JFOiBWaXJ0dWFsIFRvdXJzXCIsXG4gICAgICAgIFwiRXhwbG9yZSB0aGUgcmVhbCB3b3JsZCBpbiBhIHdlYiBicm93c2VyXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDMsIDIzKSxcbiAgICAgICAgXCJleHBsb3JlL3ZpcnR1YWx0b3VyLmh0bWxcIixcbiAgICAgICAgXCJpbWcvZ29vZ2xlLWV4cGVkaXRpb25zLndlYnBcIixcbiAgICAgICAgXCJHb29nbGUgRXhwZWRpdGlvbnMgbG9nbyBmcm9tIEZMQVRJQ09OXCIsXG4gICAgICAgIG5ldyBBdHRyaWJ1dGlvbkxpbmsoXG4gICAgICAgICAgICBcImdvb2dsZSBleHBlZGl0aW9ucyBpY29uc1wiLFxuICAgICAgICAgICAgXCJHb29nbGUgZXhwZWRpdGlvbnMgaWNvbnMgY3JlYXRlZCBieSBGcmVlcGlrIC0gRmxhdGljb25cIixcbiAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cuZmxhdGljb24uY29tL2ZyZWUtaWNvbnMvZ29vZ2xlLWV4cGVkaXRpb25zXCIsXG4gICAgICAgICAgICBcIkZsYXRpY29uXCIsXG4gICAgICAgICAgICBcIlZpcnR1YWwgVG91clwiLFxuICAgICAgICAgICAgMThcbiAgICAgICAgKVxuICAgICksXG4gICAgbmV3IFdlYkJpdChcbiAgICAgICAgXCJXZWJiXCIsXG4gICAgICAgIDMxLFxuICAgICAgICBcIkphbWVzIFdlYmIgU3BhY2UgVGVsZXNjb3BlXCIsXG4gICAgICAgIFwiXCIsXG4gICAgICAgIG5ldyBEYXRlKDIwMjMsIDcsIDMpLFxuICAgICAgICBcImV4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCIsXG4gICAgICAgIFwiaW1nL0pXU1RfcG9zdGVyLndlYnBcIixcbiAgICAgICAgXCJKYW1lcyBXZWJiIHNwYWNlIHRlbGVzY29wZSBwb3N0ZXIgaW1hZ2VcIixcbiAgICAgICAgbmV3IEF0dHJpYnV0aW9uTGluayhcbiAgICAgICAgICAgIFwiSGV4YWdvbiBMaXRobyAoMjAxOClcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvbiBwcm92aWRlZCBieSBuYXNhLmdvdlwiLFxuICAgICAgICAgICAgXCJodHRwczovL2p3c3QubmFzYS5nb3YvY29udGVudC9mZWF0dXJlcy9lZHVjYXRpb25hbC9wcmludC5odG1sXCIsXG4gICAgICAgICAgICBcImp3c3QubmFzYS5nb3ZcIixcbiAgICAgICAgICAgIFwiSmFtZXMgV2ViYiBTcGFjZSBUZWxlc2NvcGUgaWNvblwiLFxuICAgICAgICAgICAgMzFcbiAgICAgICAgKVxuICAgICksXG4pO1xuXG4vKipcbiAqIE11bHRpZGltZW5zaW9uYWwgYXJyYXkuIFJvd3MgYXJlIHRoZSBkaWZmZXJlbnQgc2VjdGlvbnMuIENvbHVtbnNcbiAqIGNvbnRhaW4gZWFjaCBhcnRpY2xlJ3MgZGF0YSBiZWxvbmdpbmcgaW4gdGhhdCBzZWN0aW9uLlxuICovXG5jb25zdCBXRUJCSVREQVRBID0gW0FyYml0cmFyeUFydGljbGVzLCBHdWlkZVNob3J0cywgRXhwbG9yZV1cbmV4cG9ydCBkZWZhdWx0IFdFQkJJVERBVEE7XG4iLCJcInN0cmljdCBtb2RlXCJcbi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJXQkxpbmsgZnJvbSAnLi4vbW9kZWxzL1JXQkxpbmsnO1xuXG4vKipcbiAqIEhlYWRlciBuYXZpZ2F0aW9uIGxpbmsgZGF0YVxuICovXG5jb25zdCBob21lTmF2TGluayA9IG5ldyBSV0JMaW5rKFxuICAgIFwiSW5kZXhcIixcbiAgICBcIkhvbWVcIixcbiAgICBcIkhvbWVcIixcbiAgICBcImluZGV4Lmh0bWxcIlxuKTtcblxuY29uc3QgcGFnZXNOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJQYWdlc1wiLFxuICAgIFwiUGFnZXNcIixcbiAgICBcIlBhZ2VzXCIsXG4gICAgXCJwYWdlcy5odG1sXCJcbik7XG5cbmNvbnN0IGdhbWVOYXZMaW5rID0gbmV3IFJXQkxpbmsoXG4gICAgXCJHYW1lXCIsXG4gICAgXCJGbGFzaENhcmRzXCIsXG4gICAgXCJHYW1lXCIsXG4gICAgXCJmbGFzaGNhcmRzLmh0bWxcIlxuKTtcblxuLyoqIE5hdmlnYXRpb24gbGlua3MgKi9cbmNvbnN0IE5BVklURU1TID0gW2hvbWVOYXZMaW5rLCBwYWdlc05hdkxpbmssIGdhbWVOYXZMaW5rXTtcbmV4cG9ydCBkZWZhdWx0IE5BVklURU1TO1xuIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmNvbnN0IHBvcnRkZWZpbml0aW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMjIsIFwiU2VjdXJlIFNTSCAgL1RDUFwiXSxcbiAgICBbMjMsIFwiVGVsbmV0ICh1bnNlY3VyZSlcIl0sXG4gICAgWzI1LCBcIlNNVFAgLSA0NjUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gICAgWzQ5LCBcIlRBQ0FDUytcIl0sXG4gICAgWzUzLCBcIkROUyAgL1VEUC9UQ1BcIl0sXG4gICAgWzY3LCBcIkRIQ1BcIl0sXG4gICAgWzY4LCBcIkRIQ1BcIl0sXG4gICAgWzgwLCBcIkhUVFAgIC9UQ1BcIl0sXG4gICAgWzg4LCBcIktlcmJlcm9zLXNlYyAgL1RDUC9VRFBcIl0sXG4gICAgWzExMCwgXCJQT1AgLSA5OTUgZm9yIGVuY3J5cHRlZC5cIl0sXG4gICAgWzEzNSwgXCJSUENcIl0sXG4gICAgWzEzNywgXCJORVRCSU9TXCJdLFxuICAgIFsxMzgsIFwiTkVUQklPU1wiXSxcbiAgICBbMTM5LCBcIk5FVEJJT1NcIl0sXG4gICAgWzE0MywgXCJJTUFQIC0gOTkzIGZvciBlbmNyeXB0ZWRcIl0sXG4gICAgWzE2MSwgXCJTTk1QICBNYW5hZ2VyXCJdLFxuICAgIFsxNjIsIFwiU05NUCAgQWdlbnRcIl0sXG4gICAgWzM4OSwgXCJMREFQIC0gNjM2IGZvciBzZWN1cmVcIl0sXG4gICAgWzQ0MywgXCJIVFRQUyAgL1RDUFwiXSxcbiAgICBbNDQ1LCBcIlNNQiAgL1RDUFwiXSxcbiAgICBbNDY1LCBcIlNNVFAgYnkgVExTXCJdLFxuICAgIFs1MTQsIFwiU1lTTE9HICAvVURQXCJdLFxuICAgIFs1ODcsIFwiU01UUFMgU1RBUlRUTFNcIl0sXG4gICAgWzYzNiwgXCJMREFQIFNTTFwiXSxcbiAgICBbOTkwLCBcIkZUUFNcIl0sXG4gICAgWzk5MywgXCJJTUFQIFRMU1wiXSxcbiAgICBbOTk1LCBcIlBPUCBUTFNcIl0sXG4gICAgWzE4MTIsIFwiUkFESVVTICAvVENQL1VEUFwiXSxcbiAgICBbMTgxMywgXCJSQURJVVMgIC9UQ1AvVURQXCJdLFxuICAgIFszMjY5LCBcIk1pY3Jvc29mdCBHbG9iYWwgQ2F0YWxvZ1wiXSxcbiAgICBbMzM4OSwgXCJSRFBcIl0sXG5dKTtcbmV4cG9ydCBkZWZhdWx0IHBvcnRkZWZpbml0aW9ucztcbiIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovXHJcbmNvbnN0IHQ9d2luZG93LGk9dC5TaGFkb3dSb290JiYodm9pZCAwPT09dC5TaGFkeUNTU3x8dC5TaGFkeUNTUy5uYXRpdmVTaGFkb3cpJiZcImFkb3B0ZWRTdHlsZVNoZWV0c1wiaW4gRG9jdW1lbnQucHJvdG90eXBlJiZcInJlcGxhY2VcImluIENTU1N0eWxlU2hlZXQucHJvdG90eXBlLHM9U3ltYm9sKCksZT1uZXcgV2Vha01hcDtjbGFzcyBue2NvbnN0cnVjdG9yKHQsaSxlKXtpZih0aGlzLl8kY3NzUmVzdWx0JD0hMCxlIT09cyl0aHJvdyBFcnJvcihcIkNTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuXCIpO3RoaXMuY3NzVGV4dD10LHRoaXMudD1pfWdldCBzdHlsZVNoZWV0KCl7bGV0IHQ9dGhpcy5pO2NvbnN0IHM9dGhpcy50O2lmKGkmJnZvaWQgMD09PXQpe2NvbnN0IGk9dm9pZCAwIT09cyYmMT09PXMubGVuZ3RoO2kmJih0PWUuZ2V0KHMpKSx2b2lkIDA9PT10JiYoKHRoaXMuaT10PW5ldyBDU1NTdHlsZVNoZWV0KS5yZXBsYWNlU3luYyh0aGlzLmNzc1RleHQpLGkmJmUuc2V0KHMsdCkpfXJldHVybiB0fXRvU3RyaW5nKCl7cmV0dXJuIHRoaXMuY3NzVGV4dH19Y29uc3Qgbz10PT5uZXcgbihcInN0cmluZ1wiPT10eXBlb2YgdD90OnQrXCJcIix2b2lkIDAscykscj0odCwuLi5pKT0+e2NvbnN0IGU9MT09PXQubGVuZ3RoP3RbMF06aS5yZWR1Y2UoKChpLHMsZSk9PmkrKHQ9PntpZighMD09PXQuXyRjc3NSZXN1bHQkKXJldHVybiB0LmNzc1RleHQ7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpcmV0dXJuIHQ7dGhyb3cgRXJyb3IoXCJWYWx1ZSBwYXNzZWQgdG8gJ2NzcycgZnVuY3Rpb24gbXVzdCBiZSBhICdjc3MnIGZ1bmN0aW9uIHJlc3VsdDogXCIrdCtcIi4gVXNlICd1bnNhZmVDU1MnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXQgdGFrZSBjYXJlIHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LlwiKX0pKHMpK3RbZSsxXSksdFswXSk7cmV0dXJuIG5ldyBuKGUsdCxzKX0sbD0ocyxlKT0+e2k/cy5hZG9wdGVkU3R5bGVTaGVldHM9ZS5tYXAoKHQ9PnQgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0P3Q6dC5zdHlsZVNoZWV0KSk6ZS5mb3JFYWNoKChpPT57Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiksbj10LmxpdE5vbmNlO3ZvaWQgMCE9PW4mJmUuc2V0QXR0cmlidXRlKFwibm9uY2VcIixuKSxlLnRleHRDb250ZW50PWkuY3NzVGV4dCxzLmFwcGVuZENoaWxkKGUpfSkpfSxoPWk/dD0+dDp0PT50IGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldD8odD0+e2xldCBpPVwiXCI7Zm9yKGNvbnN0IHMgb2YgdC5jc3NSdWxlcylpKz1zLmNzc1RleHQ7cmV0dXJuIG8oaSl9KSh0KTp0XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovO3ZhciB1O2NvbnN0IGM9d2luZG93LGQ9Yy50cnVzdGVkVHlwZXMsYT1kP2QuZW1wdHlTY3JpcHQ6XCJcIix2PWMucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0LGY9e3RvQXR0cmlidXRlKHQsaSl7c3dpdGNoKGkpe2Nhc2UgQm9vbGVhbjp0PXQ/YTpudWxsO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dD1udWxsPT10P3Q6SlNPTi5zdHJpbmdpZnkodCl9cmV0dXJuIHR9LGZyb21BdHRyaWJ1dGUodCxpKXtsZXQgcz10O3N3aXRjaChpKXtjYXNlIEJvb2xlYW46cz1udWxsIT09dDticmVhaztjYXNlIE51bWJlcjpzPW51bGw9PT10P251bGw6TnVtYmVyKHQpO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dHJ5e3M9SlNPTi5wYXJzZSh0KX1jYXRjaCh0KXtzPW51bGx9fXJldHVybiBzfX0scD0odCxpKT0+aSE9PXQmJihpPT1pfHx0PT10KSx5PXthdHRyaWJ1dGU6ITAsdHlwZTpTdHJpbmcsY29udmVydGVyOmYscmVmbGVjdDohMSxoYXNDaGFuZ2VkOnB9LGI9XCJmaW5hbGl6ZWRcIjtjbGFzcyBtIGV4dGVuZHMgSFRNTEVsZW1lbnR7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMubz1uZXcgTWFwLHRoaXMuaXNVcGRhdGVQZW5kaW5nPSExLHRoaXMuaGFzVXBkYXRlZD0hMSx0aGlzLmw9bnVsbCx0aGlzLnUoKX1zdGF0aWMgYWRkSW5pdGlhbGl6ZXIodCl7dmFyIGk7dGhpcy5maW5hbGl6ZSgpLChudWxsIT09KGk9dGhpcy52KSYmdm9pZCAwIT09aT9pOnRoaXMudj1bXSkucHVzaCh0KX1zdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpe3RoaXMuZmluYWxpemUoKTtjb25zdCB0PVtdO3JldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmZvckVhY2goKChpLHMpPT57Y29uc3QgZT10aGlzLnAocyxpKTt2b2lkIDAhPT1lJiYodGhpcy5tLnNldChlLHMpLHQucHVzaChlKSl9KSksdH1zdGF0aWMgY3JlYXRlUHJvcGVydHkodCxpPXkpe2lmKGkuc3RhdGUmJihpLmF0dHJpYnV0ZT0hMSksdGhpcy5maW5hbGl6ZSgpLHRoaXMuZWxlbWVudFByb3BlcnRpZXMuc2V0KHQsaSksIWkubm9BY2Nlc3NvciYmIXRoaXMucHJvdG90eXBlLmhhc093blByb3BlcnR5KHQpKXtjb25zdCBzPVwic3ltYm9sXCI9PXR5cGVvZiB0P1N5bWJvbCgpOlwiX19cIit0LGU9dGhpcy5nZXRQcm9wZXJ0eURlc2NyaXB0b3IodCxzLGkpO3ZvaWQgMCE9PWUmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSx0LGUpfX1zdGF0aWMgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHQsaSxzKXtyZXR1cm57Z2V0KCl7cmV0dXJuIHRoaXNbaV19LHNldChlKXtjb25zdCBuPXRoaXNbdF07dGhpc1tpXT1lLHRoaXMucmVxdWVzdFVwZGF0ZSh0LG4scyl9LGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwfX1zdGF0aWMgZ2V0UHJvcGVydHlPcHRpb25zKHQpe3JldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmdldCh0KXx8eX1zdGF0aWMgZmluYWxpemUoKXtpZih0aGlzLmhhc093blByb3BlcnR5KGIpKXJldHVybiExO3RoaXNbYl09ITA7Y29uc3QgdD1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7aWYodC5maW5hbGl6ZSgpLHZvaWQgMCE9PXQudiYmKHRoaXMudj1bLi4udC52XSksdGhpcy5lbGVtZW50UHJvcGVydGllcz1uZXcgTWFwKHQuZWxlbWVudFByb3BlcnRpZXMpLHRoaXMubT1uZXcgTWFwLHRoaXMuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKXtjb25zdCB0PXRoaXMucHJvcGVydGllcyxpPVsuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KSwuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHQpXTtmb3IoY29uc3QgcyBvZiBpKXRoaXMuY3JlYXRlUHJvcGVydHkocyx0W3NdKX1yZXR1cm4gdGhpcy5lbGVtZW50U3R5bGVzPXRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpLCEwfXN0YXRpYyBmaW5hbGl6ZVN0eWxlcyh0KXtjb25zdCBpPVtdO2lmKEFycmF5LmlzQXJyYXkodCkpe2NvbnN0IHM9bmV3IFNldCh0LmZsYXQoMS8wKS5yZXZlcnNlKCkpO2Zvcihjb25zdCB0IG9mIHMpaS51bnNoaWZ0KGgodCkpfWVsc2Ugdm9pZCAwIT09dCYmaS5wdXNoKGgodCkpO3JldHVybiBpfXN0YXRpYyBwKHQsaSl7Y29uc3Qgcz1pLmF0dHJpYnV0ZTtyZXR1cm4hMT09PXM/dm9pZCAwOlwic3RyaW5nXCI9PXR5cGVvZiBzP3M6XCJzdHJpbmdcIj09dHlwZW9mIHQ/dC50b0xvd2VyQ2FzZSgpOnZvaWQgMH11KCl7dmFyIHQ7dGhpcy5fPW5ldyBQcm9taXNlKCh0PT50aGlzLmVuYWJsZVVwZGF0aW5nPXQpKSx0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLmcoKSx0aGlzLnJlcXVlc3RVcGRhdGUoKSxudWxsPT09KHQ9dGhpcy5jb25zdHJ1Y3Rvci52KXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT50KHRoaXMpKSl9YWRkQ29udHJvbGxlcih0KXt2YXIgaSxzOyhudWxsIT09KGk9dGhpcy5TKSYmdm9pZCAwIT09aT9pOnRoaXMuUz1bXSkucHVzaCh0KSx2b2lkIDAhPT10aGlzLnJlbmRlclJvb3QmJnRoaXMuaXNDb25uZWN0ZWQmJihudWxsPT09KHM9dC5ob3N0Q29ubmVjdGVkKXx8dm9pZCAwPT09c3x8cy5jYWxsKHQpKX1yZW1vdmVDb250cm9sbGVyKHQpe3ZhciBpO251bGw9PT0oaT10aGlzLlMpfHx2b2lkIDA9PT1pfHxpLnNwbGljZSh0aGlzLlMuaW5kZXhPZih0KT4+PjAsMSl9Zygpe3RoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaCgoKHQsaSk9Pnt0aGlzLmhhc093blByb3BlcnR5KGkpJiYodGhpcy5vLnNldChpLHRoaXNbaV0pLGRlbGV0ZSB0aGlzW2ldKX0pKX1jcmVhdGVSZW5kZXJSb290KCl7dmFyIHQ7Y29uc3QgaT1udWxsIT09KHQ9dGhpcy5zaGFkb3dSb290KSYmdm9pZCAwIT09dD90OnRoaXMuYXR0YWNoU2hhZG93KHRoaXMuY29uc3RydWN0b3Iuc2hhZG93Um9vdE9wdGlvbnMpO3JldHVybiBsKGksdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50U3R5bGVzKSxpfWNvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7dm9pZCAwPT09dGhpcy5yZW5kZXJSb290JiYodGhpcy5yZW5kZXJSb290PXRoaXMuY3JlYXRlUmVuZGVyUm9vdCgpKSx0aGlzLmVuYWJsZVVwZGF0aW5nKCEwKSxudWxsPT09KHQ9dGhpcy5TKXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RDb25uZWN0ZWQpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmNhbGwodCl9KSl9ZW5hYmxlVXBkYXRpbmcodCl7fWRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7bnVsbD09PSh0PXRoaXMuUyl8fHZvaWQgMD09PXR8fHQuZm9yRWFjaCgodD0+e3ZhciBpO3JldHVybiBudWxsPT09KGk9dC5ob3N0RGlzY29ubmVjdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpfWF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0LGkscyl7dGhpcy5fJEFLKHQscyl9JCh0LGkscz15KXt2YXIgZTtjb25zdCBuPXRoaXMuY29uc3RydWN0b3IucCh0LHMpO2lmKHZvaWQgMCE9PW4mJiEwPT09cy5yZWZsZWN0KXtjb25zdCBvPSh2b2lkIDAhPT0obnVsbD09PShlPXMuY29udmVydGVyKXx8dm9pZCAwPT09ZT92b2lkIDA6ZS50b0F0dHJpYnV0ZSk/cy5jb252ZXJ0ZXI6ZikudG9BdHRyaWJ1dGUoaSxzLnR5cGUpO3RoaXMubD10LG51bGw9PW8/dGhpcy5yZW1vdmVBdHRyaWJ1dGUobik6dGhpcy5zZXRBdHRyaWJ1dGUobixvKSx0aGlzLmw9bnVsbH19XyRBSyh0LGkpe3ZhciBzO2NvbnN0IGU9dGhpcy5jb25zdHJ1Y3RvcixuPWUubS5nZXQodCk7aWYodm9pZCAwIT09biYmdGhpcy5sIT09bil7Y29uc3QgdD1lLmdldFByb3BlcnR5T3B0aW9ucyhuKSxvPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29udmVydGVyP3tmcm9tQXR0cmlidXRlOnQuY29udmVydGVyfTp2b2lkIDAhPT0obnVsbD09PShzPXQuY29udmVydGVyKXx8dm9pZCAwPT09cz92b2lkIDA6cy5mcm9tQXR0cmlidXRlKT90LmNvbnZlcnRlcjpmO3RoaXMubD1uLHRoaXNbbl09by5mcm9tQXR0cmlidXRlKGksdC50eXBlKSx0aGlzLmw9bnVsbH19cmVxdWVzdFVwZGF0ZSh0LGkscyl7bGV0IGU9ITA7dm9pZCAwIT09dCYmKCgocz1zfHx0aGlzLmNvbnN0cnVjdG9yLmdldFByb3BlcnR5T3B0aW9ucyh0KSkuaGFzQ2hhbmdlZHx8cCkodGhpc1t0XSxpKT8odGhpcy5fJEFMLmhhcyh0KXx8dGhpcy5fJEFMLnNldCh0LGkpLCEwPT09cy5yZWZsZWN0JiZ0aGlzLmwhPT10JiYodm9pZCAwPT09dGhpcy5DJiYodGhpcy5DPW5ldyBNYXApLHRoaXMuQy5zZXQodCxzKSkpOmU9ITEpLCF0aGlzLmlzVXBkYXRlUGVuZGluZyYmZSYmKHRoaXMuXz10aGlzLlQoKSl9YXN5bmMgVCgpe3RoaXMuaXNVcGRhdGVQZW5kaW5nPSEwO3RyeXthd2FpdCB0aGlzLl99Y2F0Y2godCl7UHJvbWlzZS5yZWplY3QodCl9Y29uc3QgdD10aGlzLnNjaGVkdWxlVXBkYXRlKCk7cmV0dXJuIG51bGwhPXQmJmF3YWl0IHQsIXRoaXMuaXNVcGRhdGVQZW5kaW5nfXNjaGVkdWxlVXBkYXRlKCl7cmV0dXJuIHRoaXMucGVyZm9ybVVwZGF0ZSgpfXBlcmZvcm1VcGRhdGUoKXt2YXIgdDtpZighdGhpcy5pc1VwZGF0ZVBlbmRpbmcpcmV0dXJuO3RoaXMuaGFzVXBkYXRlZCx0aGlzLm8mJih0aGlzLm8uZm9yRWFjaCgoKHQsaSk9PnRoaXNbaV09dCkpLHRoaXMubz12b2lkIDApO2xldCBpPSExO2NvbnN0IHM9dGhpcy5fJEFMO3RyeXtpPXRoaXMuc2hvdWxkVXBkYXRlKHMpLGk/KHRoaXMud2lsbFVwZGF0ZShzKSxudWxsPT09KHQ9dGhpcy5TKXx8dm9pZCAwPT09dHx8dC5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RVcGRhdGUpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmNhbGwodCl9KSksdGhpcy51cGRhdGUocykpOnRoaXMuUCgpfWNhdGNoKHQpe3Rocm93IGk9ITEsdGhpcy5QKCksdH1pJiZ0aGlzLl8kQUUocyl9d2lsbFVwZGF0ZSh0KXt9XyRBRSh0KXt2YXIgaTtudWxsPT09KGk9dGhpcy5TKXx8dm9pZCAwPT09aXx8aS5mb3JFYWNoKCh0PT57dmFyIGk7cmV0dXJuIG51bGw9PT0oaT10Lmhvc3RVcGRhdGVkKXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQpfSkpLHRoaXMuaGFzVXBkYXRlZHx8KHRoaXMuaGFzVXBkYXRlZD0hMCx0aGlzLmZpcnN0VXBkYXRlZCh0KSksdGhpcy51cGRhdGVkKHQpfVAoKXt0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLmlzVXBkYXRlUGVuZGluZz0hMX1nZXQgdXBkYXRlQ29tcGxldGUoKXtyZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpfWdldFVwZGF0ZUNvbXBsZXRlKCl7cmV0dXJuIHRoaXMuX31zaG91bGRVcGRhdGUodCl7cmV0dXJuITB9dXBkYXRlKHQpe3ZvaWQgMCE9PXRoaXMuQyYmKHRoaXMuQy5mb3JFYWNoKCgodCxpKT0+dGhpcy4kKGksdGhpc1tpXSx0KSkpLHRoaXMuQz12b2lkIDApLHRoaXMuUCgpfXVwZGF0ZWQodCl7fWZpcnN0VXBkYXRlZCh0KXt9fVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG52YXIgZzttW2JdPSEwLG0uZWxlbWVudFByb3BlcnRpZXM9bmV3IE1hcCxtLmVsZW1lbnRTdHlsZXM9W10sbS5zaGFkb3dSb290T3B0aW9ucz17bW9kZTpcIm9wZW5cIn0sbnVsbD09dnx8dih7UmVhY3RpdmVFbGVtZW50Om19KSwobnVsbCE9PSh1PWMucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMpJiZ2b2lkIDAhPT11P3U6Yy5yZWFjdGl2ZUVsZW1lbnRWZXJzaW9ucz1bXSkucHVzaChcIjEuNi4zXCIpO2NvbnN0IHc9d2luZG93LF89dy50cnVzdGVkVHlwZXMsJD1fP18uY3JlYXRlUG9saWN5KFwibGl0LWh0bWxcIix7Y3JlYXRlSFRNTDp0PT50fSk6dm9pZCAwLFM9XCIkbGl0JFwiLFQ9YGxpdCQkeyhNYXRoLnJhbmRvbSgpK1wiXCIpLnNsaWNlKDkpfSRgLHg9XCI/XCIrVCxFPWA8JHt4fT5gLEM9ZG9jdW1lbnQsQT0oKT0+Qy5jcmVhdGVDb21tZW50KFwiXCIpLGs9dD0+bnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LE09QXJyYXkuaXNBcnJheSxQPXQ9Pk0odCl8fFwiZnVuY3Rpb25cIj09dHlwZW9mKG51bGw9PXQ/dm9pZCAwOnRbU3ltYm9sLml0ZXJhdG9yXSksVT1cIlsgXFx0XFxuXFxmXFxyXVwiLFY9LzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nLFI9Ly0tPi9nLE49Lz4vZyxPPVJlZ0V4cChgPnwke1V9KD86KFteXFxcXHNcIic+PS9dKykoJHtVfSo9JHtVfSooPzpbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dfChcInwnKXwpKXwkKWAsXCJnXCIpLEw9LycvZyxqPS9cIi9nLHo9L14oPzpzY3JpcHR8c3R5bGV8dGV4dGFyZWF8dGl0bGUpJC9pLEg9dD0+KGksLi4ucyk9Pih7XyRsaXRUeXBlJDp0LHN0cmluZ3M6aSx2YWx1ZXM6c30pLEk9SCgxKSxCPUgoMiksRD1TeW1ib2wuZm9yKFwibGl0LW5vQ2hhbmdlXCIpLFc9U3ltYm9sLmZvcihcImxpdC1ub3RoaW5nXCIpLFo9bmV3IFdlYWtNYXAscT1DLmNyZWF0ZVRyZWVXYWxrZXIoQywxMjksbnVsbCwhMSk7ZnVuY3Rpb24gRih0LGkpe2lmKCFBcnJheS5pc0FycmF5KHQpfHwhdC5oYXNPd25Qcm9wZXJ0eShcInJhd1wiKSl0aHJvdyBFcnJvcihcImludmFsaWQgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVwiKTtyZXR1cm4gdm9pZCAwIT09JD8kLmNyZWF0ZUhUTUwoaSk6aX1jb25zdCBHPSh0LGkpPT57Y29uc3Qgcz10Lmxlbmd0aC0xLGU9W107bGV0IG4sbz0yPT09aT9cIjxzdmc+XCI6XCJcIixyPVY7Zm9yKGxldCBpPTA7aTxzO2krKyl7Y29uc3Qgcz10W2ldO2xldCBsLGgsdT0tMSxjPTA7Zm9yKDtjPHMubGVuZ3RoJiYoci5sYXN0SW5kZXg9YyxoPXIuZXhlYyhzKSxudWxsIT09aCk7KWM9ci5sYXN0SW5kZXgscj09PVY/XCIhLS1cIj09PWhbMV0/cj1SOnZvaWQgMCE9PWhbMV0/cj1OOnZvaWQgMCE9PWhbMl0/KHoudGVzdChoWzJdKSYmKG49UmVnRXhwKFwiPC9cIitoWzJdLFwiZ1wiKSkscj1PKTp2b2lkIDAhPT1oWzNdJiYocj1PKTpyPT09Tz9cIj5cIj09PWhbMF0/KHI9bnVsbCE9bj9uOlYsdT0tMSk6dm9pZCAwPT09aFsxXT91PS0yOih1PXIubGFzdEluZGV4LWhbMl0ubGVuZ3RoLGw9aFsxXSxyPXZvaWQgMD09PWhbM10/TzonXCInPT09aFszXT9qOkwpOnI9PT1qfHxyPT09TD9yPU86cj09PVJ8fHI9PT1OP3I9Vjoocj1PLG49dm9pZCAwKTtjb25zdCBkPXI9PT1PJiZ0W2krMV0uc3RhcnRzV2l0aChcIi8+XCIpP1wiIFwiOlwiXCI7bys9cj09PVY/cytFOnU+PTA/KGUucHVzaChsKSxzLnNsaWNlKDAsdSkrUytzLnNsaWNlKHUpK1QrZCk6cytUKygtMj09PXU/KGUucHVzaCh2b2lkIDApLGkpOmQpfXJldHVybltGKHQsbysodFtzXXx8XCI8Pz5cIikrKDI9PT1pP1wiPC9zdmc+XCI6XCJcIikpLGVdfTtjbGFzcyBKe2NvbnN0cnVjdG9yKHtzdHJpbmdzOnQsXyRsaXRUeXBlJDppfSxzKXtsZXQgZTt0aGlzLnBhcnRzPVtdO2xldCBuPTAsbz0wO2NvbnN0IHI9dC5sZW5ndGgtMSxsPXRoaXMucGFydHMsW2gsdV09Ryh0LGkpO2lmKHRoaXMuZWw9Si5jcmVhdGVFbGVtZW50KGgscykscS5jdXJyZW50Tm9kZT10aGlzLmVsLmNvbnRlbnQsMj09PWkpe2NvbnN0IHQ9dGhpcy5lbC5jb250ZW50LGk9dC5maXJzdENoaWxkO2kucmVtb3ZlKCksdC5hcHBlbmQoLi4uaS5jaGlsZE5vZGVzKX1mb3IoO251bGwhPT0oZT1xLm5leHROb2RlKCkpJiZsLmxlbmd0aDxyOyl7aWYoMT09PWUubm9kZVR5cGUpe2lmKGUuaGFzQXR0cmlidXRlcygpKXtjb25zdCB0PVtdO2Zvcihjb25zdCBpIG9mIGUuZ2V0QXR0cmlidXRlTmFtZXMoKSlpZihpLmVuZHNXaXRoKFMpfHxpLnN0YXJ0c1dpdGgoVCkpe2NvbnN0IHM9dVtvKytdO2lmKHQucHVzaChpKSx2b2lkIDAhPT1zKXtjb25zdCB0PWUuZ2V0QXR0cmlidXRlKHMudG9Mb3dlckNhc2UoKStTKS5zcGxpdChUKSxpPS8oWy4/QF0pPyguKikvLmV4ZWMocyk7bC5wdXNoKHt0eXBlOjEsaW5kZXg6bixuYW1lOmlbMl0sc3RyaW5nczp0LGN0b3I6XCIuXCI9PT1pWzFdP3R0OlwiP1wiPT09aVsxXT9zdDpcIkBcIj09PWlbMV0/ZXQ6WH0pfWVsc2UgbC5wdXNoKHt0eXBlOjYsaW5kZXg6bn0pfWZvcihjb25zdCBpIG9mIHQpZS5yZW1vdmVBdHRyaWJ1dGUoaSl9aWYoei50ZXN0KGUudGFnTmFtZSkpe2NvbnN0IHQ9ZS50ZXh0Q29udGVudC5zcGxpdChUKSxpPXQubGVuZ3RoLTE7aWYoaT4wKXtlLnRleHRDb250ZW50PV8/Xy5lbXB0eVNjcmlwdDpcIlwiO2ZvcihsZXQgcz0wO3M8aTtzKyspZS5hcHBlbmQodFtzXSxBKCkpLHEubmV4dE5vZGUoKSxsLnB1c2goe3R5cGU6MixpbmRleDorK259KTtlLmFwcGVuZCh0W2ldLEEoKSl9fX1lbHNlIGlmKDg9PT1lLm5vZGVUeXBlKWlmKGUuZGF0YT09PXgpbC5wdXNoKHt0eXBlOjIsaW5kZXg6bn0pO2Vsc2V7bGV0IHQ9LTE7Zm9yKDstMSE9PSh0PWUuZGF0YS5pbmRleE9mKFQsdCsxKSk7KWwucHVzaCh7dHlwZTo3LGluZGV4Om59KSx0Kz1ULmxlbmd0aC0xfW4rK319c3RhdGljIGNyZWF0ZUVsZW1lbnQodCxpKXtjb25zdCBzPUMuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO3JldHVybiBzLmlubmVySFRNTD10LHN9fWZ1bmN0aW9uIEsodCxpLHM9dCxlKXt2YXIgbixvLHIsbDtpZihpPT09RClyZXR1cm4gaTtsZXQgaD12b2lkIDAhPT1lP251bGw9PT0obj1zLkEpfHx2b2lkIDA9PT1uP3ZvaWQgMDpuW2VdOnMuaztjb25zdCB1PWsoaSk/dm9pZCAwOmkuXyRsaXREaXJlY3RpdmUkO3JldHVybihudWxsPT1oP3ZvaWQgMDpoLmNvbnN0cnVjdG9yKSE9PXUmJihudWxsPT09KG89bnVsbD09aD92b2lkIDA6aC5fJEFPKXx8dm9pZCAwPT09b3x8by5jYWxsKGgsITEpLHZvaWQgMD09PXU/aD12b2lkIDA6KGg9bmV3IHUodCksaC5fJEFUKHQscyxlKSksdm9pZCAwIT09ZT8obnVsbCE9PShyPShsPXMpLkEpJiZ2b2lkIDAhPT1yP3I6bC5BPVtdKVtlXT1oOnMuaz1oKSx2b2lkIDAhPT1oJiYoaT1LKHQsaC5fJEFTKHQsaS52YWx1ZXMpLGgsZSkpLGl9Y2xhc3MgWXtjb25zdHJ1Y3Rvcih0LGkpe3RoaXMuXyRBVj1bXSx0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBRD10LHRoaXMuXyRBTT1pfWdldCBwYXJlbnROb2RlKCl7cmV0dXJuIHRoaXMuXyRBTS5wYXJlbnROb2RlfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfU0odCl7dmFyIGk7Y29uc3R7ZWw6e2NvbnRlbnQ6c30scGFydHM6ZX09dGhpcy5fJEFELG49KG51bGwhPT0oaT1udWxsPT10P3ZvaWQgMDp0LmNyZWF0aW9uU2NvcGUpJiZ2b2lkIDAhPT1pP2k6QykuaW1wb3J0Tm9kZShzLCEwKTtxLmN1cnJlbnROb2RlPW47bGV0IG89cS5uZXh0Tm9kZSgpLHI9MCxsPTAsaD1lWzBdO2Zvcig7dm9pZCAwIT09aDspe2lmKHI9PT1oLmluZGV4KXtsZXQgaTsyPT09aC50eXBlP2k9bmV3IFEobyxvLm5leHRTaWJsaW5nLHRoaXMsdCk6MT09PWgudHlwZT9pPW5ldyBoLmN0b3IobyxoLm5hbWUsaC5zdHJpbmdzLHRoaXMsdCk6Nj09PWgudHlwZSYmKGk9bmV3IG50KG8sdGhpcyx0KSksdGhpcy5fJEFWLnB1c2goaSksaD1lWysrbF19ciE9PShudWxsPT1oP3ZvaWQgMDpoLmluZGV4KSYmKG89cS5uZXh0Tm9kZSgpLHIrKyl9cmV0dXJuIHEuY3VycmVudE5vZGU9QyxufVUodCl7bGV0IGk9MDtmb3IoY29uc3QgcyBvZiB0aGlzLl8kQVYpdm9pZCAwIT09cyYmKHZvaWQgMCE9PXMuc3RyaW5ncz8ocy5fJEFJKHQscyxpKSxpKz1zLnN0cmluZ3MubGVuZ3RoLTIpOnMuXyRBSSh0W2ldKSksaSsrfX1jbGFzcyBRe2NvbnN0cnVjdG9yKHQsaSxzLGUpe3ZhciBuO3RoaXMudHlwZT0yLHRoaXMuXyRBSD1XLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFBPXQsdGhpcy5fJEFCPWksdGhpcy5fJEFNPXMsdGhpcy5vcHRpb25zPWUsdGhpcy5OPW51bGw9PT0obj1udWxsPT1lP3ZvaWQgMDplLmlzQ29ubmVjdGVkKXx8dm9pZCAwPT09bnx8bn1nZXQgXyRBVSgpe3ZhciB0LGk7cmV0dXJuIG51bGwhPT0oaT1udWxsPT09KHQ9dGhpcy5fJEFNKXx8dm9pZCAwPT09dD92b2lkIDA6dC5fJEFVKSYmdm9pZCAwIT09aT9pOnRoaXMuTn1nZXQgcGFyZW50Tm9kZSgpe2xldCB0PXRoaXMuXyRBQS5wYXJlbnROb2RlO2NvbnN0IGk9dGhpcy5fJEFNO3JldHVybiB2b2lkIDAhPT1pJiYxMT09PShudWxsPT10P3ZvaWQgMDp0Lm5vZGVUeXBlKSYmKHQ9aS5wYXJlbnROb2RlKSx0fWdldCBzdGFydE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFBfWdldCBlbmROb2RlKCl7cmV0dXJuIHRoaXMuXyRBQn1fJEFJKHQsaT10aGlzKXt0PUsodGhpcyx0LGkpLGsodCk/dD09PVd8fG51bGw9PXR8fFwiXCI9PT10Pyh0aGlzLl8kQUghPT1XJiZ0aGlzLl8kQVIoKSx0aGlzLl8kQUg9Vyk6dCE9PXRoaXMuXyRBSCYmdCE9PUQmJnRoaXMuUih0KTp2b2lkIDAhPT10Ll8kbGl0VHlwZSQ/dGhpcy5PKHQpOnZvaWQgMCE9PXQubm9kZVR5cGU/dGhpcy5WKHQpOlAodCk/dGhpcy5qKHQpOnRoaXMuUih0KX1MKHQpe3JldHVybiB0aGlzLl8kQUEucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodCx0aGlzLl8kQUIpfVYodCl7dGhpcy5fJEFIIT09dCYmKHRoaXMuXyRBUigpLHRoaXMuXyRBSD10aGlzLkwodCkpfVIodCl7dGhpcy5fJEFIIT09VyYmayh0aGlzLl8kQUgpP3RoaXMuXyRBQS5uZXh0U2libGluZy5kYXRhPXQ6dGhpcy5WKEMuY3JlYXRlVGV4dE5vZGUodCkpLHRoaXMuXyRBSD10fU8odCl7dmFyIGk7Y29uc3R7dmFsdWVzOnMsXyRsaXRUeXBlJDplfT10LG49XCJudW1iZXJcIj09dHlwZW9mIGU/dGhpcy5fJEFDKHQpOih2b2lkIDA9PT1lLmVsJiYoZS5lbD1KLmNyZWF0ZUVsZW1lbnQoRihlLmgsZS5oWzBdKSx0aGlzLm9wdGlvbnMpKSxlKTtpZigobnVsbD09PShpPXRoaXMuXyRBSCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuXyRBRCk9PT1uKXRoaXMuXyRBSC5VKHMpO2Vsc2V7Y29uc3QgdD1uZXcgWShuLHRoaXMpLGk9dC5NKHRoaXMub3B0aW9ucyk7dC5VKHMpLHRoaXMuVihpKSx0aGlzLl8kQUg9dH19XyRBQyh0KXtsZXQgaT1aLmdldCh0LnN0cmluZ3MpO3JldHVybiB2b2lkIDA9PT1pJiZaLnNldCh0LnN0cmluZ3MsaT1uZXcgSih0KSksaX1qKHQpe00odGhpcy5fJEFIKXx8KHRoaXMuXyRBSD1bXSx0aGlzLl8kQVIoKSk7Y29uc3QgaT10aGlzLl8kQUg7bGV0IHMsZT0wO2Zvcihjb25zdCBuIG9mIHQpZT09PWkubGVuZ3RoP2kucHVzaChzPW5ldyBRKHRoaXMuTChBKCkpLHRoaXMuTChBKCkpLHRoaXMsdGhpcy5vcHRpb25zKSk6cz1pW2VdLHMuXyRBSShuKSxlKys7ZTxpLmxlbmd0aCYmKHRoaXMuXyRBUihzJiZzLl8kQUIubmV4dFNpYmxpbmcsZSksaS5sZW5ndGg9ZSl9XyRBUih0PXRoaXMuXyRBQS5uZXh0U2libGluZyxpKXt2YXIgcztmb3IobnVsbD09PShzPXRoaXMuXyRBUCl8fHZvaWQgMD09PXN8fHMuY2FsbCh0aGlzLCExLCEwLGkpO3QmJnQhPT10aGlzLl8kQUI7KXtjb25zdCBpPXQubmV4dFNpYmxpbmc7dC5yZW1vdmUoKSx0PWl9fXNldENvbm5lY3RlZCh0KXt2YXIgaTt2b2lkIDA9PT10aGlzLl8kQU0mJih0aGlzLk49dCxudWxsPT09KGk9dGhpcy5fJEFQKXx8dm9pZCAwPT09aXx8aS5jYWxsKHRoaXMsdCkpfX1jbGFzcyBYe2NvbnN0cnVjdG9yKHQsaSxzLGUsbil7dGhpcy50eXBlPTEsdGhpcy5fJEFIPVcsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLmVsZW1lbnQ9dCx0aGlzLm5hbWU9aSx0aGlzLl8kQU09ZSx0aGlzLm9wdGlvbnM9bixzLmxlbmd0aD4yfHxcIlwiIT09c1swXXx8XCJcIiE9PXNbMV0/KHRoaXMuXyRBSD1BcnJheShzLmxlbmd0aC0xKS5maWxsKG5ldyBTdHJpbmcpLHRoaXMuc3RyaW5ncz1zKTp0aGlzLl8kQUg9V31nZXQgdGFnTmFtZSgpe3JldHVybiB0aGlzLmVsZW1lbnQudGFnTmFtZX1nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFJKHQsaT10aGlzLHMsZSl7Y29uc3Qgbj10aGlzLnN0cmluZ3M7bGV0IG89ITE7aWYodm9pZCAwPT09bil0PUsodGhpcyx0LGksMCksbz0hayh0KXx8dCE9PXRoaXMuXyRBSCYmdCE9PUQsbyYmKHRoaXMuXyRBSD10KTtlbHNle2NvbnN0IGU9dDtsZXQgcixsO2Zvcih0PW5bMF0scj0wO3I8bi5sZW5ndGgtMTtyKyspbD1LKHRoaXMsZVtzK3JdLGksciksbD09PUQmJihsPXRoaXMuXyRBSFtyXSksb3x8KG89IWsobCl8fGwhPT10aGlzLl8kQUhbcl0pLGw9PT1XP3Q9Vzp0IT09VyYmKHQrPShudWxsIT1sP2w6XCJcIikrbltyKzFdKSx0aGlzLl8kQUhbcl09bH1vJiYhZSYmdGhpcy5JKHQpfUkodCl7dD09PVc/dGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpOnRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLG51bGwhPXQ/dDpcIlwiKX19Y2xhc3MgdHQgZXh0ZW5kcyBYe2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnR5cGU9M31JKHQpe3RoaXMuZWxlbWVudFt0aGlzLm5hbWVdPXQ9PT1XP3ZvaWQgMDp0fX1jb25zdCBpdD1fP18uZW1wdHlTY3JpcHQ6XCJcIjtjbGFzcyBzdCBleHRlbmRzIFh7Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMudHlwZT00fUkodCl7dCYmdCE9PVc/dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsaXQpOnRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKX19Y2xhc3MgZXQgZXh0ZW5kcyBYe2NvbnN0cnVjdG9yKHQsaSxzLGUsbil7c3VwZXIodCxpLHMsZSxuKSx0aGlzLnR5cGU9NX1fJEFJKHQsaT10aGlzKXt2YXIgcztpZigodD1udWxsIT09KHM9Syh0aGlzLHQsaSwwKSkmJnZvaWQgMCE9PXM/czpXKT09PUQpcmV0dXJuO2NvbnN0IGU9dGhpcy5fJEFILG49dD09PVcmJmUhPT1XfHx0LmNhcHR1cmUhPT1lLmNhcHR1cmV8fHQub25jZSE9PWUub25jZXx8dC5wYXNzaXZlIT09ZS5wYXNzaXZlLG89dCE9PVcmJihlPT09V3x8bik7biYmdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMsZSksbyYmdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMsdCksdGhpcy5fJEFIPXR9aGFuZGxlRXZlbnQodCl7dmFyIGkscztcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLl8kQUg/dGhpcy5fJEFILmNhbGwobnVsbCE9PShzPW51bGw9PT0oaT10aGlzLm9wdGlvbnMpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmhvc3QpJiZ2b2lkIDAhPT1zP3M6dGhpcy5lbGVtZW50LHQpOnRoaXMuXyRBSC5oYW5kbGVFdmVudCh0KX19Y2xhc3MgbnR7Y29uc3RydWN0b3IodCxpLHMpe3RoaXMuZWxlbWVudD10LHRoaXMudHlwZT02LHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFNPWksdGhpcy5vcHRpb25zPXN9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9XyRBSSh0KXtLKHRoaXMsdCl9fWNvbnN0IG90PXtIOlMsQjpULEQ6eCxxOjEsSjpHLFc6WSxaOlAsRjpLLEc6USxLOlgsWDpzdCxZOmV0LHR0LGl0Om50fSxydD13LmxpdEh0bWxQb2x5ZmlsbFN1cHBvcnQ7bnVsbD09cnR8fHJ0KEosUSksKG51bGwhPT0oZz13LmxpdEh0bWxWZXJzaW9ucykmJnZvaWQgMCE9PWc/Zzp3LmxpdEh0bWxWZXJzaW9ucz1bXSkucHVzaChcIjIuOC4wXCIpO2NvbnN0IGx0PSh0LGkscyk9Pnt2YXIgZSxuO2NvbnN0IG89bnVsbCE9PShlPW51bGw9PXM/dm9pZCAwOnMucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09ZT9lOmk7bGV0IHI9by5fJGxpdFBhcnQkO2lmKHZvaWQgMD09PXIpe2NvbnN0IHQ9bnVsbCE9PShuPW51bGw9PXM/dm9pZCAwOnMucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09bj9uOm51bGw7by5fJGxpdFBhcnQkPXI9bmV3IFEoaS5pbnNlcnRCZWZvcmUoQSgpLHQpLHQsdm9pZCAwLG51bGwhPXM/czp7fSl9cmV0dXJuIHIuXyRBSSh0KSxyfTtcclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi92YXIgaHQsdXQ7Y29uc3QgY3Q9bTtjbGFzcyBkdCBleHRlbmRzIG17Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMucmVuZGVyT3B0aW9ucz17aG9zdDp0aGlzfSx0aGlzLnN0PXZvaWQgMH1jcmVhdGVSZW5kZXJSb290KCl7dmFyIHQsaTtjb25zdCBzPXN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtyZXR1cm4gbnVsbCE9PSh0PShpPXRoaXMucmVuZGVyT3B0aW9ucykucmVuZGVyQmVmb3JlKSYmdm9pZCAwIT09dHx8KGkucmVuZGVyQmVmb3JlPXMuZmlyc3RDaGlsZCksc311cGRhdGUodCl7Y29uc3QgaT10aGlzLnJlbmRlcigpO3RoaXMuaGFzVXBkYXRlZHx8KHRoaXMucmVuZGVyT3B0aW9ucy5pc0Nvbm5lY3RlZD10aGlzLmlzQ29ubmVjdGVkKSxzdXBlci51cGRhdGUodCksdGhpcy5zdD1sdChpLHRoaXMucmVuZGVyUm9vdCx0aGlzLnJlbmRlck9wdGlvbnMpfWNvbm5lY3RlZENhbGxiYWNrKCl7dmFyIHQ7c3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKSxudWxsPT09KHQ9dGhpcy5zdCl8fHZvaWQgMD09PXR8fHQuc2V0Q29ubmVjdGVkKCEwKX1kaXNjb25uZWN0ZWRDYWxsYmFjaygpe3ZhciB0O3N1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCksbnVsbD09PSh0PXRoaXMuc3QpfHx2b2lkIDA9PT10fHx0LnNldENvbm5lY3RlZCghMSl9cmVuZGVyKCl7cmV0dXJuIER9fWR0LmZpbmFsaXplZD0hMCxkdC5fJGxpdEVsZW1lbnQkPSEwLG51bGw9PT0oaHQ9Z2xvYmFsVGhpcy5saXRFbGVtZW50SHlkcmF0ZVN1cHBvcnQpfHx2b2lkIDA9PT1odHx8aHQuY2FsbChnbG9iYWxUaGlzLHtMaXRFbGVtZW50OmR0fSk7Y29uc3QgYXQ9Z2xvYmFsVGhpcy5saXRFbGVtZW50UG9seWZpbGxTdXBwb3J0O251bGw9PWF0fHxhdCh7TGl0RWxlbWVudDpkdH0pO2NvbnN0IHZ0PXtfJEFLOih0LGkscyk9Pnt0Ll8kQUsoaSxzKX0sXyRBTDp0PT50Ll8kQUx9OyhudWxsIT09KHV0PWdsb2JhbFRoaXMubGl0RWxlbWVudFZlcnNpb25zKSYmdm9pZCAwIT09dXQ/dXQ6Z2xvYmFsVGhpcy5saXRFbGVtZW50VmVyc2lvbnM9W10pLnB1c2goXCIzLjMuM1wiKTtcclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIyIEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9cclxuY29uc3QgZnQ9ITEse0c6cHR9PW90LHl0PXQ9Pm51bGw9PT10fHxcIm9iamVjdFwiIT10eXBlb2YgdCYmXCJmdW5jdGlvblwiIT10eXBlb2YgdCxidD17SFRNTDoxLFNWRzoyfSxtdD0odCxpKT0+dm9pZCAwPT09aT92b2lkIDAhPT0obnVsbD09dD92b2lkIDA6dC5fJGxpdFR5cGUkKToobnVsbD09dD92b2lkIDA6dC5fJGxpdFR5cGUkKT09PWksZ3Q9dD0+e3ZhciBpO3JldHVybiBudWxsIT0obnVsbD09PShpPW51bGw9PXQ/dm9pZCAwOnQuXyRsaXRUeXBlJCl8fHZvaWQgMD09PWk/dm9pZCAwOmkuaCl9LHd0PXQ9PnZvaWQgMCE9PShudWxsPT10P3ZvaWQgMDp0Ll8kbGl0RGlyZWN0aXZlJCksX3Q9dD0+bnVsbD09dD92b2lkIDA6dC5fJGxpdERpcmVjdGl2ZSQsJHQ9dD0+dm9pZCAwPT09dC5zdHJpbmdzLFN0PSgpPT5kb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpLFR0PSh0LGkscyk9Pnt2YXIgZTtjb25zdCBuPXQuXyRBQS5wYXJlbnROb2RlLG89dm9pZCAwPT09aT90Ll8kQUI6aS5fJEFBO2lmKHZvaWQgMD09PXMpe2NvbnN0IGk9bi5pbnNlcnRCZWZvcmUoU3QoKSxvKSxlPW4uaW5zZXJ0QmVmb3JlKFN0KCksbyk7cz1uZXcgcHQoaSxlLHQsdC5vcHRpb25zKX1lbHNle2NvbnN0IGk9cy5fJEFCLm5leHRTaWJsaW5nLHI9cy5fJEFNLGw9ciE9PXQ7aWYobCl7bGV0IGk7bnVsbD09PShlPXMuXyRBUSl8fHZvaWQgMD09PWV8fGUuY2FsbChzLHQpLHMuXyRBTT10LHZvaWQgMCE9PXMuXyRBUCYmKGk9dC5fJEFVKSE9PXIuXyRBVSYmcy5fJEFQKGkpfWlmKGkhPT1vfHxsKXtsZXQgdD1zLl8kQUE7Zm9yKDt0IT09aTspe2NvbnN0IGk9dC5uZXh0U2libGluZztuLmluc2VydEJlZm9yZSh0LG8pLHQ9aX19fXJldHVybiBzfSx4dD0odCxpLHM9dCk9Pih0Ll8kQUkoaSxzKSx0KSxFdD17fSxDdD0odCxpPUV0KT0+dC5fJEFIPWksQXQ9dD0+dC5fJEFILGt0PXQ9Pnt2YXIgaTtudWxsPT09KGk9dC5fJEFQKXx8dm9pZCAwPT09aXx8aS5jYWxsKHQsITEsITApO2xldCBzPXQuXyRBQTtjb25zdCBlPXQuXyRBQi5uZXh0U2libGluZztmb3IoO3MhPT1lOyl7Y29uc3QgdD1zLm5leHRTaWJsaW5nO3MucmVtb3ZlKCkscz10fX0sTXQ9dD0+e3QuXyRBUigpfSxQdD17QVRUUklCVVRFOjEsQ0hJTEQ6MixQUk9QRVJUWTozLEJPT0xFQU5fQVRUUklCVVRFOjQsRVZFTlQ6NSxFTEVNRU5UOjZ9LFV0PXQ9PiguLi5pKT0+KHtfJGxpdERpcmVjdGl2ZSQ6dCx2YWx1ZXM6aX0pO2NsYXNzIFZ0e2NvbnN0cnVjdG9yKHQpe31nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFUKHQsaSxzKXt0aGlzLmV0PXQsdGhpcy5fJEFNPWksdGhpcy5udD1zfV8kQVModCxpKXtyZXR1cm4gdGhpcy51cGRhdGUodCxpKX11cGRhdGUodCxpKXtyZXR1cm4gdGhpcy5yZW5kZXIoLi4uaSl9fVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL2NvbnN0IFJ0PSh0LGkpPT57dmFyIHMsZTtjb25zdCBuPXQuXyRBTjtpZih2b2lkIDA9PT1uKXJldHVybiExO2Zvcihjb25zdCB0IG9mIG4pbnVsbD09PShlPShzPXQpLl8kQU8pfHx2b2lkIDA9PT1lfHxlLmNhbGwocyxpLCExKSxSdCh0LGkpO3JldHVybiEwfSxOdD10PT57bGV0IGkscztkb3tpZih2b2lkIDA9PT0oaT10Ll8kQU0pKWJyZWFrO3M9aS5fJEFOLHMuZGVsZXRlKHQpLHQ9aX13aGlsZSgwPT09KG51bGw9PXM/dm9pZCAwOnMuc2l6ZSkpfSxPdD10PT57Zm9yKGxldCBpO2k9dC5fJEFNO3Q9aSl7bGV0IHM9aS5fJEFOO2lmKHZvaWQgMD09PXMpaS5fJEFOPXM9bmV3IFNldDtlbHNlIGlmKHMuaGFzKHQpKWJyZWFrO3MuYWRkKHQpLHp0KGkpfX07ZnVuY3Rpb24gTHQodCl7dm9pZCAwIT09dGhpcy5fJEFOPyhOdCh0aGlzKSx0aGlzLl8kQU09dCxPdCh0aGlzKSk6dGhpcy5fJEFNPXR9ZnVuY3Rpb24ganQodCxpPSExLHM9MCl7Y29uc3QgZT10aGlzLl8kQUgsbj10aGlzLl8kQU47aWYodm9pZCAwIT09biYmMCE9PW4uc2l6ZSlpZihpKWlmKEFycmF5LmlzQXJyYXkoZSkpZm9yKGxldCB0PXM7dDxlLmxlbmd0aDt0KyspUnQoZVt0XSwhMSksTnQoZVt0XSk7ZWxzZSBudWxsIT1lJiYoUnQoZSwhMSksTnQoZSkpO2Vsc2UgUnQodGhpcyx0KX1jb25zdCB6dD10PT57dmFyIGkscyxlLG47Mj09dC50eXBlJiYobnVsbCE9PShpPShlPXQpLl8kQVApJiZ2b2lkIDAhPT1pfHwoZS5fJEFQPWp0KSxudWxsIT09KHM9KG49dCkuXyRBUSkmJnZvaWQgMCE9PXN8fChuLl8kQVE9THQpKX07Y2xhc3MgSHQgZXh0ZW5kcyBWdHtjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy5fJEFOPXZvaWQgMH1fJEFUKHQsaSxzKXtzdXBlci5fJEFUKHQsaSxzKSxPdCh0aGlzKSx0aGlzLmlzQ29ubmVjdGVkPXQuXyRBVX1fJEFPKHQsaT0hMCl7dmFyIHMsZTt0IT09dGhpcy5pc0Nvbm5lY3RlZCYmKHRoaXMuaXNDb25uZWN0ZWQ9dCx0P251bGw9PT0ocz10aGlzLnJlY29ubmVjdGVkKXx8dm9pZCAwPT09c3x8cy5jYWxsKHRoaXMpOm51bGw9PT0oZT10aGlzLmRpc2Nvbm5lY3RlZCl8fHZvaWQgMD09PWV8fGUuY2FsbCh0aGlzKSksaSYmKFJ0KHRoaXMsdCksTnQodGhpcykpfXNldFZhbHVlKHQpe2lmKCR0KHRoaXMuZXQpKXRoaXMuZXQuXyRBSSh0LHRoaXMpO2Vsc2V7Y29uc3QgaT1bLi4udGhpcy5ldC5fJEFIXTtpW3RoaXMubnRdPXQsdGhpcy5ldC5fJEFJKGksdGhpcywwKX19ZGlzY29ubmVjdGVkKCl7fXJlY29ubmVjdGVkKCl7fX1cclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9jbGFzcyBJdHtjb25zdHJ1Y3Rvcih0KXt0aGlzLm90PXR9ZGlzY29ubmVjdCgpe3RoaXMub3Q9dm9pZCAwfXJlY29ubmVjdCh0KXt0aGlzLm90PXR9ZGVyZWYoKXtyZXR1cm4gdGhpcy5vdH19Y2xhc3MgQnR7Y29uc3RydWN0b3IoKXt0aGlzLnJ0PXZvaWQgMCx0aGlzLmx0PXZvaWQgMH1nZXQoKXtyZXR1cm4gdGhpcy5ydH1wYXVzZSgpe3ZhciB0O251bGwhPT0odD10aGlzLnJ0KSYmdm9pZCAwIT09dHx8KHRoaXMucnQ9bmV3IFByb21pc2UoKHQ9PnRoaXMubHQ9dCkpKX1yZXN1bWUoKXt2YXIgdDtudWxsPT09KHQ9dGhpcy5sdCl8fHZvaWQgMD09PXR8fHQuY2FsbCh0aGlzKSx0aGlzLnJ0PXRoaXMubHQ9dm9pZCAwfX1cclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9jbGFzcyBEdCBleHRlbmRzIEh0e2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLmh0PW5ldyBJdCh0aGlzKSx0aGlzLnV0PW5ldyBCdH1yZW5kZXIodCxpKXtyZXR1cm4gRH11cGRhdGUodCxbaSxzXSl7aWYodGhpcy5pc0Nvbm5lY3RlZHx8dGhpcy5kaXNjb25uZWN0ZWQoKSxpPT09dGhpcy5jdClyZXR1cm47dGhpcy5jdD1pO2xldCBlPTA7Y29uc3R7aHQ6bix1dDpvfT10aGlzO3JldHVybihhc3luYyh0LGkpPT57Zm9yIGF3YWl0KGNvbnN0IHMgb2YgdClpZighMT09PWF3YWl0IGkocykpcmV0dXJufSkoaSwoYXN5bmMgdD0+e2Zvcig7by5nZXQoKTspYXdhaXQgby5nZXQoKTtjb25zdCByPW4uZGVyZWYoKTtpZih2b2lkIDAhPT1yKXtpZihyLmN0IT09aSlyZXR1cm4hMTt2b2lkIDAhPT1zJiYodD1zKHQsZSkpLHIuY29tbWl0VmFsdWUodCxlKSxlKyt9cmV0dXJuITB9KSksRH1jb21taXRWYWx1ZSh0LGkpe3RoaXMuc2V0VmFsdWUodCl9ZGlzY29ubmVjdGVkKCl7dGhpcy5odC5kaXNjb25uZWN0KCksdGhpcy51dC5wYXVzZSgpfXJlY29ubmVjdGVkKCl7dGhpcy5odC5yZWNvbm5lY3QodGhpcyksdGhpcy51dC5yZXN1bWUoKX19Y29uc3QgV3Q9VXQoRHQpLFp0PVV0KFxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5jbGFzcyBleHRlbmRzIER0e2NvbnN0cnVjdG9yKHQpe2lmKHN1cGVyKHQpLDIhPT10LnR5cGUpdGhyb3cgRXJyb3IoXCJhc3luY0FwcGVuZCBjYW4gb25seSBiZSB1c2VkIGluIGNoaWxkIGV4cHJlc3Npb25zXCIpfXVwZGF0ZSh0LGkpe3JldHVybiB0aGlzLnN0PXQsc3VwZXIudXBkYXRlKHQsaSl9Y29tbWl0VmFsdWUodCxpKXswPT09aSYmTXQodGhpcy5zdCk7Y29uc3Qgcz1UdCh0aGlzLnN0KTt4dChzLHQpfX0pLHF0PXQ9Pmd0KHQpP3QuXyRsaXRUeXBlJC5oOnQuc3RyaW5ncyxGdD1VdChjbGFzcyBleHRlbmRzIFZ0e2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpLHRoaXMuZHQ9bmV3IFdlYWtNYXB9cmVuZGVyKHQpe3JldHVyblt0XX11cGRhdGUodCxbaV0pe2NvbnN0IHM9bXQodGhpcy52dCk/cXQodGhpcy52dCk6bnVsbCxlPW10KGkpP3F0KGkpOm51bGw7aWYobnVsbCE9PXMmJihudWxsPT09ZXx8cyE9PWUpKXtjb25zdCBpPUF0KHQpLnBvcCgpO2xldCBlPXRoaXMuZHQuZ2V0KHMpO2lmKHZvaWQgMD09PWUpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2U9bHQoVyx0KSxlLnNldENvbm5lY3RlZCghMSksdGhpcy5kdC5zZXQocyxlKX1DdChlLFtpXSksVHQoZSx2b2lkIDAsaSl9aWYobnVsbCE9PWUpe2lmKG51bGw9PT1zfHxzIT09ZSl7Y29uc3QgaT10aGlzLmR0LmdldChlKTtpZih2b2lkIDAhPT1pKXtjb25zdCBzPUF0KGkpLnBvcCgpO010KHQpLFR0KHQsdm9pZCAwLHMpLEN0KHQsW3NdKX19dGhpcy52dD1pfWVsc2UgdGhpcy52dD12b2lkIDA7cmV0dXJuIHRoaXMucmVuZGVyKGkpfX0pLEd0PSh0LGkscyk9Pntmb3IoY29uc3QgcyBvZiBpKWlmKHNbMF09PT10KXJldHVybigwLHNbMV0pKCk7cmV0dXJuIG51bGw9PXM/dm9pZCAwOnMoKX0sSnQ9VXQoXHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovXHJcbmNsYXNzIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IodCl7dmFyIGk7aWYoc3VwZXIodCksMSE9PXQudHlwZXx8XCJjbGFzc1wiIT09dC5uYW1lfHwobnVsbD09PShpPXQuc3RyaW5ncyl8fHZvaWQgMD09PWk/dm9pZCAwOmkubGVuZ3RoKT4yKXRocm93IEVycm9yKFwiYGNsYXNzTWFwKClgIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIGFuZCBtdXN0IGJlIHRoZSBvbmx5IHBhcnQgaW4gdGhlIGF0dHJpYnV0ZS5cIil9cmVuZGVyKHQpe3JldHVyblwiIFwiK09iamVjdC5rZXlzKHQpLmZpbHRlcigoaT0+dFtpXSkpLmpvaW4oXCIgXCIpK1wiIFwifXVwZGF0ZSh0LFtpXSl7dmFyIHMsZTtpZih2b2lkIDA9PT10aGlzLmZ0KXt0aGlzLmZ0PW5ldyBTZXQsdm9pZCAwIT09dC5zdHJpbmdzJiYodGhpcy55dD1uZXcgU2V0KHQuc3RyaW5ncy5qb2luKFwiIFwiKS5zcGxpdCgvXFxzLykuZmlsdGVyKCh0PT5cIlwiIT09dCkpKSk7Zm9yKGNvbnN0IHQgaW4gaSlpW3RdJiYhKG51bGw9PT0ocz10aGlzLnl0KXx8dm9pZCAwPT09cz92b2lkIDA6cy5oYXModCkpJiZ0aGlzLmZ0LmFkZCh0KTtyZXR1cm4gdGhpcy5yZW5kZXIoaSl9Y29uc3Qgbj10LmVsZW1lbnQuY2xhc3NMaXN0O3RoaXMuZnQuZm9yRWFjaCgodD0+e3QgaW4gaXx8KG4ucmVtb3ZlKHQpLHRoaXMuZnQuZGVsZXRlKHQpKX0pKTtmb3IoY29uc3QgdCBpbiBpKXtjb25zdCBzPSEhaVt0XTtzPT09dGhpcy5mdC5oYXModCl8fChudWxsPT09KGU9dGhpcy55dCl8fHZvaWQgMD09PWU/dm9pZCAwOmUuaGFzKHQpKXx8KHM/KG4uYWRkKHQpLHRoaXMuZnQuYWRkKHQpKToobi5yZW1vdmUodCksdGhpcy5mdC5kZWxldGUodCkpKX1yZXR1cm4gRH19KSxLdD17fSxZdD1VdChjbGFzcyBleHRlbmRzIFZ0e2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLmJ0PUt0fXJlbmRlcih0LGkpe3JldHVybiBpKCl9dXBkYXRlKHQsW2ksc10pe2lmKEFycmF5LmlzQXJyYXkoaSkpe2lmKEFycmF5LmlzQXJyYXkodGhpcy5idCkmJnRoaXMuYnQubGVuZ3RoPT09aS5sZW5ndGgmJmkuZXZlcnkoKCh0LGkpPT50PT09dGhpcy5idFtpXSkpKXJldHVybiBEfWVsc2UgaWYodGhpcy5idD09PWkpcmV0dXJuIEQ7cmV0dXJuIHRoaXMuYnQ9QXJyYXkuaXNBcnJheShpKT9BcnJheS5mcm9tKGkpOmksdGhpcy5yZW5kZXIoaSxzKX19KSxRdD10PT5udWxsIT10P3Q6V1xyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLztmdW5jdGlvbipYdCh0LGkpe2NvbnN0IHM9XCJmdW5jdGlvblwiPT10eXBlb2YgaTtpZih2b2lkIDAhPT10KXtsZXQgZT0tMTtmb3IoY29uc3QgbiBvZiB0KWU+LTEmJih5aWVsZCBzP2koZSk6aSksZSsrLHlpZWxkIG59fVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL2NvbnN0IHRpPVV0KGNsYXNzIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMua2V5PVd9cmVuZGVyKHQsaSl7cmV0dXJuIHRoaXMua2V5PXQsaX11cGRhdGUodCxbaSxzXSl7cmV0dXJuIGkhPT10aGlzLmtleSYmKEN0KHQpLHRoaXMua2V5PWkpLHN9fSksaWk9VXQoXHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovXHJcbmNsYXNzIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IodCl7aWYoc3VwZXIodCksMyE9PXQudHlwZSYmMSE9PXQudHlwZSYmNCE9PXQudHlwZSl0aHJvdyBFcnJvcihcIlRoZSBgbGl2ZWAgZGlyZWN0aXZlIGlzIG5vdCBhbGxvd2VkIG9uIGNoaWxkIG9yIGV2ZW50IGJpbmRpbmdzXCIpO2lmKCEkdCh0KSl0aHJvdyBFcnJvcihcImBsaXZlYCBiaW5kaW5ncyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb25cIil9cmVuZGVyKHQpe3JldHVybiB0fXVwZGF0ZSh0LFtpXSl7aWYoaT09PUR8fGk9PT1XKXJldHVybiBpO2NvbnN0IHM9dC5lbGVtZW50LGU9dC5uYW1lO2lmKDM9PT10LnR5cGUpe2lmKGk9PT1zW2VdKXJldHVybiBEfWVsc2UgaWYoND09PXQudHlwZSl7aWYoISFpPT09cy5oYXNBdHRyaWJ1dGUoZSkpcmV0dXJuIER9ZWxzZSBpZigxPT09dC50eXBlJiZzLmdldEF0dHJpYnV0ZShlKT09PWkrXCJcIilyZXR1cm4gRDtyZXR1cm4gQ3QodCksaX19KTtcclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9cclxuZnVuY3Rpb24qc2kodCxpKXtpZih2b2lkIDAhPT10KXtsZXQgcz0wO2Zvcihjb25zdCBlIG9mIHQpeWllbGQgaShlLHMrKyl9fVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL2Z1bmN0aW9uKmVpKHQsaSxzPTEpe2NvbnN0IGU9dm9pZCAwPT09aT8wOnQ7bnVsbCE9aXx8KGk9dCk7Zm9yKGxldCB0PWU7cz4wP3Q8aTppPHQ7dCs9cyl5aWVsZCB0fVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL2NvbnN0IG5pPSgpPT5uZXcgb2k7Y2xhc3Mgb2l7fWNvbnN0IHJpPW5ldyBXZWFrTWFwLGxpPVV0KGNsYXNzIGV4dGVuZHMgSHR7cmVuZGVyKHQpe3JldHVybiBXfXVwZGF0ZSh0LFtpXSl7dmFyIHM7Y29uc3QgZT1pIT09dGhpcy5vdDtyZXR1cm4gZSYmdm9pZCAwIT09dGhpcy5vdCYmdGhpcy5ndCh2b2lkIDApLChlfHx0aGlzLnd0IT09dGhpcy5fdCkmJih0aGlzLm90PWksdGhpcy4kdD1udWxsPT09KHM9dC5vcHRpb25zKXx8dm9pZCAwPT09cz92b2lkIDA6cy5ob3N0LHRoaXMuZ3QodGhpcy5fdD10LmVsZW1lbnQpKSxXfWd0KHQpe3ZhciBpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3Qpe2NvbnN0IHM9bnVsbCE9PShpPXRoaXMuJHQpJiZ2b2lkIDAhPT1pP2k6Z2xvYmFsVGhpcztsZXQgZT1yaS5nZXQocyk7dm9pZCAwPT09ZSYmKGU9bmV3IFdlYWtNYXAscmkuc2V0KHMsZSkpLHZvaWQgMCE9PWUuZ2V0KHRoaXMub3QpJiZ0aGlzLm90LmNhbGwodGhpcy4kdCx2b2lkIDApLGUuc2V0KHRoaXMub3QsdCksdm9pZCAwIT09dCYmdGhpcy5vdC5jYWxsKHRoaXMuJHQsdCl9ZWxzZSB0aGlzLm90LnZhbHVlPXR9Z2V0IHd0KCl7dmFyIHQsaSxzO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3Q/bnVsbD09PShpPXJpLmdldChudWxsIT09KHQ9dGhpcy4kdCkmJnZvaWQgMCE9PXQ/dDpnbG9iYWxUaGlzKSl8fHZvaWQgMD09PWk/dm9pZCAwOmkuZ2V0KHRoaXMub3QpOm51bGw9PT0ocz10aGlzLm90KXx8dm9pZCAwPT09cz92b2lkIDA6cy52YWx1ZX1kaXNjb25uZWN0ZWQoKXt0aGlzLnd0PT09dGhpcy5fdCYmdGhpcy5ndCh2b2lkIDApfXJlY29ubmVjdGVkKCl7dGhpcy5ndCh0aGlzLl90KX19KSxoaT0odCxpLHMpPT57Y29uc3QgZT1uZXcgTWFwO2ZvcihsZXQgbj1pO248PXM7bisrKWUuc2V0KHRbbl0sbik7cmV0dXJuIGV9LHVpPVV0KGNsYXNzIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IodCl7aWYoc3VwZXIodCksMiE9PXQudHlwZSl0aHJvdyBFcnJvcihcInJlcGVhdCgpIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGV4dCBleHByZXNzaW9uc1wiKX1TdCh0LGkscyl7bGV0IGU7dm9pZCAwPT09cz9zPWk6dm9pZCAwIT09aSYmKGU9aSk7Y29uc3Qgbj1bXSxvPVtdO2xldCByPTA7Zm9yKGNvbnN0IGkgb2YgdCluW3JdPWU/ZShpLHIpOnIsb1tyXT1zKGkscikscisrO3JldHVybnt2YWx1ZXM6byxrZXlzOm59fXJlbmRlcih0LGkscyl7cmV0dXJuIHRoaXMuU3QodCxpLHMpLnZhbHVlc311cGRhdGUodCxbaSxzLGVdKXt2YXIgbjtjb25zdCBvPUF0KHQpLHt2YWx1ZXM6cixrZXlzOmx9PXRoaXMuU3QoaSxzLGUpO2lmKCFBcnJheS5pc0FycmF5KG8pKXJldHVybiB0aGlzLlR0PWwscjtjb25zdCBoPW51bGwhPT0obj10aGlzLlR0KSYmdm9pZCAwIT09bj9uOnRoaXMuVHQ9W10sdT1bXTtsZXQgYyxkLGE9MCx2PW8ubGVuZ3RoLTEsZj0wLHA9ci5sZW5ndGgtMTtmb3IoO2E8PXYmJmY8PXA7KWlmKG51bGw9PT1vW2FdKWErKztlbHNlIGlmKG51bGw9PT1vW3ZdKXYtLTtlbHNlIGlmKGhbYV09PT1sW2ZdKXVbZl09eHQob1thXSxyW2ZdKSxhKyssZisrO2Vsc2UgaWYoaFt2XT09PWxbcF0pdVtwXT14dChvW3ZdLHJbcF0pLHYtLSxwLS07ZWxzZSBpZihoW2FdPT09bFtwXSl1W3BdPXh0KG9bYV0scltwXSksVHQodCx1W3ArMV0sb1thXSksYSsrLHAtLTtlbHNlIGlmKGhbdl09PT1sW2ZdKXVbZl09eHQob1t2XSxyW2ZdKSxUdCh0LG9bYV0sb1t2XSksdi0tLGYrKztlbHNlIGlmKHZvaWQgMD09PWMmJihjPWhpKGwsZixwKSxkPWhpKGgsYSx2KSksYy5oYXMoaFthXSkpaWYoYy5oYXMoaFt2XSkpe2NvbnN0IGk9ZC5nZXQobFtmXSkscz12b2lkIDAhPT1pP29baV06bnVsbDtpZihudWxsPT09cyl7Y29uc3QgaT1UdCh0LG9bYV0pO3h0KGkscltmXSksdVtmXT1pfWVsc2UgdVtmXT14dChzLHJbZl0pLFR0KHQsb1thXSxzKSxvW2ldPW51bGw7ZisrfWVsc2Uga3Qob1t2XSksdi0tO2Vsc2Uga3Qob1thXSksYSsrO2Zvcig7Zjw9cDspe2NvbnN0IGk9VHQodCx1W3ArMV0pO3h0KGkscltmXSksdVtmKytdPWl9Zm9yKDthPD12Oyl7Y29uc3QgdD1vW2ErK107bnVsbCE9PXQmJmt0KHQpfXJldHVybiB0aGlzLlR0PWwsQ3QodCx1KSxEfX0pLGNpPVwiaW1wb3J0YW50XCIsZGk9XCIgIVwiK2NpLGFpPVV0KGNsYXNzIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IodCl7dmFyIGk7aWYoc3VwZXIodCksMSE9PXQudHlwZXx8XCJzdHlsZVwiIT09dC5uYW1lfHwobnVsbD09PShpPXQuc3RyaW5ncyl8fHZvaWQgMD09PWk/dm9pZCAwOmkubGVuZ3RoKT4yKXRocm93IEVycm9yKFwiVGhlIGBzdHlsZU1hcGAgZGlyZWN0aXZlIG11c3QgYmUgdXNlZCBpbiB0aGUgYHN0eWxlYCBhdHRyaWJ1dGUgYW5kIG11c3QgYmUgdGhlIG9ubHkgcGFydCBpbiB0aGUgYXR0cmlidXRlLlwiKX1yZW5kZXIodCl7cmV0dXJuIE9iamVjdC5rZXlzKHQpLnJlZHVjZSgoKGkscyk9Pntjb25zdCBlPXRbc107cmV0dXJuIG51bGw9PWU/aTppK2Ake3M9cy5pbmNsdWRlcyhcIi1cIik/czpzLnJlcGxhY2UoLyg/Ol4od2Via2l0fG1venxtc3xvKXwpKD89W0EtWl0pL2csXCItJCZcIikudG9Mb3dlckNhc2UoKX06JHtlfTtgfSksXCJcIil9dXBkYXRlKHQsW2ldKXtjb25zdHtzdHlsZTpzfT10LmVsZW1lbnQ7aWYodm9pZCAwPT09dGhpcy54dCl7dGhpcy54dD1uZXcgU2V0O2Zvcihjb25zdCB0IGluIGkpdGhpcy54dC5hZGQodCk7cmV0dXJuIHRoaXMucmVuZGVyKGkpfXRoaXMueHQuZm9yRWFjaCgodD0+e251bGw9PWlbdF0mJih0aGlzLnh0LmRlbGV0ZSh0KSx0LmluY2x1ZGVzKFwiLVwiKT9zLnJlbW92ZVByb3BlcnR5KHQpOnNbdF09XCJcIil9KSk7Zm9yKGNvbnN0IHQgaW4gaSl7Y29uc3QgZT1pW3RdO2lmKG51bGwhPWUpe3RoaXMueHQuYWRkKHQpO2NvbnN0IGk9XCJzdHJpbmdcIj09dHlwZW9mIGUmJmUuZW5kc1dpdGgoZGkpO3QuaW5jbHVkZXMoXCItXCIpfHxpP3Muc2V0UHJvcGVydHkodCxpP2Uuc2xpY2UoMCwtMTEpOmUsaT9jaTpcIlwiKTpzW3RdPWV9fXJldHVybiBEfX0pLHZpPVV0KFxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5jbGFzcyBleHRlbmRzIFZ0e2NvbnN0cnVjdG9yKHQpe2lmKHN1cGVyKHQpLDIhPT10LnR5cGUpdGhyb3cgRXJyb3IoXCJ0ZW1wbGF0ZUNvbnRlbnQgY2FuIG9ubHkgYmUgdXNlZCBpbiBjaGlsZCBiaW5kaW5nc1wiKX1yZW5kZXIodCl7cmV0dXJuIHRoaXMuRXQ9PT10P0Q6KHRoaXMuRXQ9dCxkb2N1bWVudC5pbXBvcnROb2RlKHQuY29udGVudCwhMCkpfX0pO2NsYXNzIGZpIGV4dGVuZHMgVnR7Y29uc3RydWN0b3IodCl7aWYoc3VwZXIodCksdGhpcy52dD1XLDIhPT10LnR5cGUpdGhyb3cgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5kaXJlY3RpdmVOYW1lK1wiKCkgY2FuIG9ubHkgYmUgdXNlZCBpbiBjaGlsZCBiaW5kaW5nc1wiKX1yZW5kZXIodCl7aWYodD09PVd8fG51bGw9PXQpcmV0dXJuIHRoaXMuQ3Q9dm9pZCAwLHRoaXMudnQ9dDtpZih0PT09RClyZXR1cm4gdDtpZihcInN0cmluZ1wiIT10eXBlb2YgdCl0aHJvdyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLmRpcmVjdGl2ZU5hbWUrXCIoKSBjYWxsZWQgd2l0aCBhIG5vbi1zdHJpbmcgdmFsdWVcIik7aWYodD09PXRoaXMudnQpcmV0dXJuIHRoaXMuQ3Q7dGhpcy52dD10O2NvbnN0IGk9W3RdO3JldHVybiBpLnJhdz1pLHRoaXMuQ3Q9e18kbGl0VHlwZSQ6dGhpcy5jb25zdHJ1Y3Rvci5yZXN1bHRUeXBlLHN0cmluZ3M6aSx2YWx1ZXM6W119fX1maS5kaXJlY3RpdmVOYW1lPVwidW5zYWZlSFRNTFwiLGZpLnJlc3VsdFR5cGU9MTtjb25zdCBwaT1VdChmaSk7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovY2xhc3MgeWkgZXh0ZW5kcyBmaXt9eWkuZGlyZWN0aXZlTmFtZT1cInVuc2FmZVNWR1wiLHlpLnJlc3VsdFR5cGU9Mjtjb25zdCBiaT1VdCh5aSksbWk9dD0+IXl0KHQpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnRoZW4sZ2k9MTA3Mzc0MTgyMztcclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9jbGFzcyB3aSBleHRlbmRzIEh0e2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLkF0PWdpLHRoaXMua3Q9W10sdGhpcy5odD1uZXcgSXQodGhpcyksdGhpcy51dD1uZXcgQnR9cmVuZGVyKC4uLnQpe3ZhciBpO3JldHVybiBudWxsIT09KGk9dC5maW5kKCh0PT4hbWkodCkpKSkmJnZvaWQgMCE9PWk/aTpEfXVwZGF0ZSh0LGkpe2NvbnN0IHM9dGhpcy5rdDtsZXQgZT1zLmxlbmd0aDt0aGlzLmt0PWk7Y29uc3Qgbj10aGlzLmh0LG89dGhpcy51dDt0aGlzLmlzQ29ubmVjdGVkfHx0aGlzLmRpc2Nvbm5lY3RlZCgpO2ZvcihsZXQgdD0wO3Q8aS5sZW5ndGgmJiEodD50aGlzLkF0KTt0Kyspe2NvbnN0IHI9aVt0XTtpZighbWkocikpcmV0dXJuIHRoaXMuQXQ9dCxyO3Q8ZSYmcj09PXNbdF18fCh0aGlzLkF0PWdpLGU9MCxQcm9taXNlLnJlc29sdmUocikudGhlbigoYXN5bmMgdD0+e2Zvcig7by5nZXQoKTspYXdhaXQgby5nZXQoKTtjb25zdCBpPW4uZGVyZWYoKTtpZih2b2lkIDAhPT1pKXtjb25zdCBzPWkua3QuaW5kZXhPZihyKTtzPi0xJiZzPGkuQXQmJihpLkF0PXMsaS5zZXRWYWx1ZSh0KSl9fSkpKX1yZXR1cm4gRH1kaXNjb25uZWN0ZWQoKXt0aGlzLmh0LmRpc2Nvbm5lY3QoKSx0aGlzLnV0LnBhdXNlKCl9cmVjb25uZWN0ZWQoKXt0aGlzLmh0LnJlY29ubmVjdCh0aGlzKSx0aGlzLnV0LnJlc3VtZSgpfX1jb25zdCBfaT1VdCh3aSk7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovZnVuY3Rpb24gJGkodCxpLHMpe3JldHVybiB0P2koKTpudWxsPT1zP3ZvaWQgMDpzKCl9XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovY29uc3QgU2k9U3ltYm9sLmZvcihcIlwiKSxUaT10PT57aWYoKG51bGw9PXQ/dm9pZCAwOnQucik9PT1TaSlyZXR1cm4gbnVsbD09dD92b2lkIDA6dC5fJGxpdFN0YXRpYyR9LHhpPXQ9Pih7XyRsaXRTdGF0aWMkOnQscjpTaX0pLEVpPSh0LC4uLmkpPT4oe18kbGl0U3RhdGljJDppLnJlZHVjZSgoKGkscyxlKT0+aSsodD0+e2lmKHZvaWQgMCE9PXQuXyRsaXRTdGF0aWMkKXJldHVybiB0Ll8kbGl0U3RhdGljJDt0aHJvdyBFcnJvcihgVmFsdWUgcGFzc2VkIHRvICdsaXRlcmFsJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2xpdGVyYWwnIHJlc3VsdDogJHt0fS4gVXNlICd1bnNhZmVTdGF0aWMnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXRcXG4gICAgICAgICAgICB0YWtlIGNhcmUgdG8gZW5zdXJlIHBhZ2Ugc2VjdXJpdHkuYCl9KShzKSt0W2UrMV0pLHRbMF0pLHI6U2l9KSxDaT1uZXcgTWFwLEFpPXQ9PihpLC4uLnMpPT57Y29uc3QgZT1zLmxlbmd0aDtsZXQgbixvO2NvbnN0IHI9W10sbD1bXTtsZXQgaCx1PTAsYz0hMTtmb3IoO3U8ZTspe2ZvcihoPWlbdV07dTxlJiZ2b2lkIDAhPT0obz1zW3VdLG49VGkobykpOyloKz1uK2lbKyt1XSxjPSEwO3UhPT1lJiZsLnB1c2gobyksci5wdXNoKGgpLHUrK31pZih1PT09ZSYmci5wdXNoKGlbZV0pLGMpe2NvbnN0IHQ9ci5qb2luKFwiJCRsaXQkJFwiKTt2b2lkIDA9PT0oaT1DaS5nZXQodCkpJiYoci5yYXc9cixDaS5zZXQodCxpPXIpKSxzPWx9cmV0dXJuIHQoaSwuLi5zKX0sa2k9QWkoSSksTWk9QWkoQik7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovXHJcbi8qd2luZG93LmxpdERpc2FibGVCdW5kbGVXYXJuaW5nfHxjb25zb2xlLndhcm4oXCJMaXQgaGFzIGJlZW4gbG9hZGVkIGZyb20gYSBidW5kbGUgdGhhdCBjb21iaW5lcyBhbGwgY29yZSBmZWF0dXJlcyBpbnRvIGEgc2luZ2xlIGZpbGUuIFRvIHJlZHVjZSB0cmFuc2ZlciBzaXplIGFuZCBwYXJzaW5nIGNvc3QsIGNvbnNpZGVyIHVzaW5nIHRoZSBgbGl0YCBucG0gcGFja2FnZSBkaXJlY3RseSBpbiB5b3VyIHByb2plY3QuXCIpOyovZXhwb3J0e0h0IGFzIEFzeW5jRGlyZWN0aXZlLER0IGFzIEFzeW5jUmVwbGFjZURpcmVjdGl2ZSxuIGFzIENTU1Jlc3VsdCxWdCBhcyBEaXJlY3RpdmUsZHQgYXMgTGl0RWxlbWVudCxQdCBhcyBQYXJ0VHlwZSxtIGFzIFJlYWN0aXZlRWxlbWVudCxidCBhcyBUZW1wbGF0ZVJlc3VsdFR5cGUsZmkgYXMgVW5zYWZlSFRNTERpcmVjdGl2ZSx3aSBhcyBVbnRpbERpcmVjdGl2ZSxjdCBhcyBVcGRhdGluZ0VsZW1lbnQsdnQgYXMgXyRMRSxvdCBhcyBfJExILGwgYXMgYWRvcHRTdHlsZXMsWnQgYXMgYXN5bmNBcHBlbmQsV3QgYXMgYXN5bmNSZXBsYWNlLEZ0IGFzIGNhY2hlLEd0IGFzIGNob29zZSxKdCBhcyBjbGFzc01hcCxNdCBhcyBjbGVhclBhcnQsbmkgYXMgY3JlYXRlUmVmLHIgYXMgY3NzLGYgYXMgZGVmYXVsdENvbnZlcnRlcixVdCBhcyBkaXJlY3RpdmUsQXQgYXMgZ2V0Q29tbWl0dGVkVmFsdWUsaCBhcyBnZXRDb21wYXRpYmxlU3R5bGUsX3QgYXMgZ2V0RGlyZWN0aXZlQ2xhc3MsWXQgYXMgZ3VhcmQsSSBhcyBodG1sLFF0IGFzIGlmRGVmaW5lZCxUdCBhcyBpbnNlcnRQYXJ0LGd0IGFzIGlzQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCx3dCBhcyBpc0RpcmVjdGl2ZVJlc3VsdCx5dCBhcyBpc1ByaW1pdGl2ZSxmdCBhcyBpc1NlcnZlciwkdCBhcyBpc1NpbmdsZUV4cHJlc3Npb24sbXQgYXMgaXNUZW1wbGF0ZVJlc3VsdCxYdCBhcyBqb2luLHRpIGFzIGtleWVkLEVpIGFzIGxpdGVyYWwsaWkgYXMgbGl2ZSxzaSBhcyBtYXAsRCBhcyBub0NoYW5nZSxwIGFzIG5vdEVxdWFsLFcgYXMgbm90aGluZyxlaSBhcyByYW5nZSxsaSBhcyByZWYsa3QgYXMgcmVtb3ZlUGFydCxsdCBhcyByZW5kZXIsdWkgYXMgcmVwZWF0LHh0IGFzIHNldENoaWxkUGFydFZhbHVlLEN0IGFzIHNldENvbW1pdHRlZFZhbHVlLGtpIGFzIHN0YXRpY0h0bWwsTWkgYXMgc3RhdGljU3ZnLGFpIGFzIHN0eWxlTWFwLGkgYXMgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzLEIgYXMgc3ZnLHZpIGFzIHRlbXBsYXRlQ29udGVudCxvIGFzIHVuc2FmZUNTUyxwaSBhcyB1bnNhZmVIVE1MLGJpIGFzIHVuc2FmZVNWRyx4aSBhcyB1bnNhZmVTdGF0aWMsX2kgYXMgdW50aWwsJGkgYXMgd2hlbixBaSBhcyB3aXRoU3RhdGljfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWFsbC5taW4uanMubWFwIiwiXCJzdHJpY3QgbW9kZVwiXG4vLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBIZWFkZXJGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlckZvb3Rlcic7XG5pbXBvcnQgUGFnZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL1BhZ2VDb21wb25lbnRzJztcbmltcG9ydCBDbGFzc0NvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL0NsYXNzQ29tcG9uZW50cyc7XG5pbXBvcnQgbW9iaWxlQWJick1hcmt1cCBmcm9tICcuL2NvbXBvbmVudHMvbW9iaWxlTWFya3VwJztcbmltcG9ydCBSV0JQZXJmIGZyb20gJy4vbW9kZWxzL1NjcmlwdFBlcmYnO1xuXG5cbmNvbnN0IG1haW5wZXJmID0gbmV3IFJXQlBlcmYoXCJtYWluXCIpO1xuXG4vLyBlbnRyeSBwb2ludFxuLyoqXG4gKiBUeXBlU2NyaXB0IGVudHJ5IHBvaW50LiBUaGlzIHNjcmlwdCBpbml0aWFsaXplcyBwYWdlIGNvbXBvbmVudHMgYW5kIG1vZGVscyBhc1xuICogIHRoZXkncmUgbmVlZGVkIG1haW4uaW5pdCgpIGlzIHRoZSBpbml0aWFsaXphdGlvbiBvZiBcInR5cGVzY3JpcHQuanNcIi5cbiAqL1xuY29uc3QgbWFpbiA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHBhZ2Ugd2lkZ2V0cyBhbmQgYXBwbGljYXRpb24gZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIEV2ZW50IGZpcmVkIGJlZm9yZSBhc3NldHMgYXJlIHJlbmRlcmVkIHRvIHRoZSBwYWdlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEFkZCBoZWFkZXIgYW5kIGZvb3RlciBjb21wb25lbnRzXG4gICAgICAgICAgICBIZWFkZXJGb290ZXIuaGVhZGVyV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgICAgIEhlYWRlckZvb3Rlci5mb290ZXJXaWRnZXQuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHBhZ2UgY29tcG9uZW50c1xuICAgICAgICAgICAgUGFnZUNvbXBvbmVudHMuaW5pdCgpO1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGVsZW1lbnQgY29tcG9uZW50c1xuICAgICAgICAgICAgQ2xhc3NDb21wb25lbnRzLmluaXQoKTtcblxuICAgICAgICAgICAgLy8gPGFiYnI+PC9hYmJyPiBzdHlsZXM6IGltcGxlbWVudGVkIGZvciBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgbW9iaWxlQWJick1hcmt1cC5pbml0KCk7XG5cbiAgICAgICAgICAgIG1haW5wZXJmLmVuZCgpO1xuICAgICAgICB9KVxuICAgIH0gICAgXG59O1xuXG5tYWluLmluaXQoKTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBHRVRVUkw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVjZWl2ZWREYXRhOiBhbnk7IC8vVE9ETzogY2hlY2sgaWYgdGhpcyBpcyBuZWVkZWRcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBnYXRoZXJzIGFsbCB0aGUgbmVlZGVkIGluZm9ybWF0aW9uIGZvciBmZXRjaCBhbmQvb3IgYnJvd3NlclxuICAgKiAgc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHBhcmFtIHNlbmRUb0Jyb3dzZXJDYWNoZSAgLSBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGZldGNoIGNhY2hpbmcuXG4gICAqIEBwYXJhbSBicm93c2VyQ2FjaGVOYW1lIC0gSWYgc3RvcmluZyB0aGUgcmVxdWVzdCBpbiBicm93c2VyIGNhY2hlLCB0aGlzIHN0cmluZyBwcm92aWRlcyB0aGUgbmFtZSBmb3Igc3RvcmFnZS5cbiAgICogQHBhcmFtIGVycm9yRWxlbSAtIFNob3VsZCB0aGUgZmV0Y2ggcmVxdWVzdCBmYWlsLCByZXR1cm4gZXJyb3Igc3RhdHVzIHRvIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEdFVFVSTDogVVJMLFxuICAgIHNlbmRUb0Jyb3dzZXJDYWNoZTogYm9vbGVhbixcbiAgICBlcnJvckVsZW06IEhUTUxFbGVtZW50LFxuICAgIGJyb3dzZXJDYWNoZU5hbWU6IHN0cmluZyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5HRVRVUkwgPSBHRVRVUkw7XG4gICAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPSBzZW5kVG9Ccm93c2VyQ2FjaGU7XG4gICAgdGhpcy5icm93c2VyQ2FjaGVOYW1lID0gYnJvd3NlckNhY2hlTmFtZTtcbiAgICB0aGlzLmVycm9yRWxlbSA9IGVycm9yRWxlbTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZVxuICAgKi9cbiAgcHVibGljIGdldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHRVRVUkwoKSB7XG4gICAgcmV0dXJuIHRoaXMuR0VUVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsaXAgdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgYm9vbGVhbiB2YWx1ZSBmcm9tIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHNldFNlbmRUb0Jyb3dzZXJDYWNoZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUgPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmZXRjaCByZXF1ZXN0IGNhbiB0YWtlIFVSTCBvciBzdHJpbmcgcGFyYW1ldGVyLiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGFwaUdFVFxuICAgKiAgb2JqZWN0IGZvciBhIFVSTCBmZXRjaCBieSBjcmVhdGluZyBhIFVSTCBmcm9tIHRoZSBzdHJpbmcsIG9yIHBhc3NpbmcgdGhlIFVSTC5cbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICovXG4gIHB1YmxpYyBzZXRHRVRVUkwoR0VUVVJMOiBVUkwgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIEdFVFVSTCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5HRVRVUkwgPSBuZXcgVVJMKEdFVFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuR0VUVVJMID0gR0VUVVJMO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQSBwdWJsaWMgZnVuY3Rpb24gY3JlYXRpbmcgYSBkYXRhIHByb21pc2Ugb2JqZWN0IGZvciB0aGUgY2FsbGVkIGZldGNoIGZ1bmN0aW9uLiBJZlxuICAgKiAgdGhlIHJlcXVlc3QgbmVlZHMgYWRkZWQgdG8gYnJvd3NlciBzdG9yYWdlLCB0aGUgZmV0Y2ggaXMgbWFkZSBhbmQgc2VudCB0b1xuICAgKiAgc3RvcmFnZS4gQSBjbG9uZWQgY29weSBvZiB0aGUgZmV0Y2hlZCBkYXRhIGlzIHJldHVybmVkIGFuZCB0aGUgb3JpZ2luYWwgcmVxdWVzdCBpc1xuICAgKiAgc2VudCB0byB0aGUgY2FjaGUuIFdpdGhvdXQgc2VuZGluZyB0byBicm93c2VyIGNhY2hlLCB0aGUgZmV0Y2ggaXMgcmVxdWVzdGVkIGFuZCBcbiAgICogcmV0dXJuZWQuXG4gICAqICBcbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YUNhY2hlUHJvbWlzZTogUHJvbWlzZTx1bmtub3duPlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGFwaUdFVChHRVRVUkw6IFVSTCkge1xuICAgIC8vQ2hlY2sgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGNhY2hlIHN0b3JhZ2VcbiAgICBpZiAodGhpcy5zZW5kVG9Ccm93c2VyQ2FjaGUpIHtcbiAgICAgIC8vVGhlIHJldHVybmVkIGRhdGEgaXMgcGFja2FnZXMgYXMgYSBQcm9taXNlIG9iamVjdFxuICAgICAgbGV0IGRhdGFDYWNoZVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChcImNhY2hlc1wiIGluIHdpbmRvdykge1xuICAgICAgICAgIC8vT3BlbiBjYWNoZSBhbmQgY2hlY2sgZm9yIHJlcXVlc3QgZXhpc3RpbmcgaW4gQ2FjaGUgU3RvcmFnZVxuICAgICAgICAgIHdpbmRvdy5jYWNoZXMub3Blbih0aGlzLmJyb3dzZXJDYWNoZU5hbWUpLnRoZW4oKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICBjYWNoZXMubWF0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy9ObyBtYXRjaGVzIGZvciB0aGlzIHJlcXVlc3QgaW4gU3RvcmFnZSBDYWNoZSwgc28gZmV0Y2ggdGhlIHJlcXVlc3Qgbm9ybWFsbHlcbiAgICAgICAgICAgICAgICAvL1Vwb24gc3VjY2VzcywgYSBjbG9uZWQgY29weSB3aWxsIG5lZWQgdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICAgICAgICAgZmV0Y2goR0VUVVJMKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICBsZXQgY2xvbmVkcmVzcCA9IHJlc3VsdC5jbG9uZSgpO1xuXG4gICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcmVzdWx0IHRvIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgICAgaWYgKGNsb25lZHJlc3Auc3RhdHVzICE9IDQwNCl7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChHRVRVUkwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lZHJlc3AuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9DYWNoZSBoaXQgc3VjY2VzcywgcmV0dXJuIHRoZSByZXNwb25zZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGUgPT4gey8vQ2Fubm90IG9wZW4gU3RvcmFnZSBDYWNoZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjUHJvYmxlbSBvcGVuaW5nIENhY2hlIFN0b3JhZ2UuIE5hbWU6ICR7dGhpcy5icm93c2VyQ2FjaGVOYW1lfWAsIFwiY29sb3I6IGdyZXlcIik7XG4gICAgICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICAgIH0pLmZpbmFsbHkoKCkgPT4gey8vQXR0ZW1wdCByYXcgZmV0Y2hcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5mZXRjaERhdGEoR0VUVVJMKSk7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvbWlzZSBlcnJvciBvbiBkYXRhIGZldGNoLlwiKSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvL1RoZSBwcm9taXNlIGhhcyByZXNvbHZlZCAtLT4gcmV0dXJuIHRoZSBwcm9taXNlIGRhdGFcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShHRVRVUkwpKTtcbiAgICAgIH0pO1xuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YUNhY2hlUHJvbWlzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHJlcXVlc3RlZCByZXNwb25zZSBpcyBvZiB2YWxpZCBzdGF0dXMgJ09LJyBhbmQgJzIwMCdcbiAgICogQHBhcmFtIHJlcyAtIHRoZSBmZXRjaGVkIHJlc3BvbnNlLlxuICAgKiBAcmV0dXJucyAtIHJldHVybnMgcmVzLmpzb24oKSBvbiBzdWNjZXNzIG9yIHJldHVybnMgcmVzcG9uc2Ugb24gZmFpbHVyZS5cbiAgICovXG4gIHByaXZhdGUgYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlczogUmVzcG9uc2UpIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PSA0MDQpIHtcbiAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgIHRoaXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiNDA0IGZldGNoIGVycm9yIVwiO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKCFyZXMub2sgfHwgcmVzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXMub2sgKyBcIjogXCIgKyByZXMuc3RhdHVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmV0Y2ggcmVxdWVzdCwgcmV0dXJuaW5nIGEgZmV0Y2ggcHJvbWlzZS5cbiAgICogQHBhcmFtIEdFVFVSTCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAqL1xuICBwcml2YXRlIGZldGNoRGF0YShHRVRVUkw6IFVSTCkge1xuICAgIHJldHVybiBmZXRjaChHRVRVUkwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHRoaXMuYXBpUmVzcG9uc2VFcnJvckNoZWNrKHJlc3BvbnNlKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YS50ZXh0KCk7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbS5pbm5lclRleHQgPSBgJHtlLm1lc3NhZ2V9YDtcbiAgICAgIH0pO1xuICB9XG5cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJXQkxpbmsgZnJvbSBcIi4vUldCTGlua1wiO1xuXG4vKiogXG4gKiBVc2VkIGZvciBpbWFnZSBBdHRyaWJ1dGlvblxuKi9cbmNsYXNzIEF0dHJpYnV0aW9uTGluayBleHRlbmRzIFJXQkxpbmsge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICAvKipOYW1lIG9mIHRoZSBvd25lciAqL1xuICAgIHB1YmxpYyBhdHRyaWJ1dGVkb3duZXI6IHN0cmluZztcbiAgICAvKipXZWJCaXRzIGFydGljbGUgZGF0YSBJRCAqL1xuICAgIHB1YmxpYyBhcnRpY2xlaWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvKipMaW5rIHRpdGxlICovXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgIC8qKkxpbmsgaW5uZXIgdGV4dCAqL1xuICAgICAgICBpbm5lclRleHQ6IHN0cmluZyxcbiAgICAgICAgLyoqIGxpbmsgaHJlZiAqL1xuICAgICAgICBoUmVmZXJlbmNlOiBzdHJpbmcsXG4gICAgICAgIC8qKk5hbWUgb2YgdGhlIG93bmVyICovXG4gICAgICAgIGF0dHJpYnV0ZWRvd25lcjogc3RyaW5nLFxuICAgICAgICAvKipXZWJCaXRzIHBhZ2UgKi9cbiAgICAgICAgcGFnZU5hbWU6IHN0cmluZyxcbiAgICAgICAgLyoqV2ViQml0cyBhcnRpY2xlIGRhdGEgSUQgKi9cbiAgICAgICAgYXJ0aWNsZWlkOiBudW1iZXJcblxuICAgICkge1xuICAgICAgICBzdXBlcih0aXRsZSwgaW5uZXJUZXh0LCBwYWdlTmFtZSwgaFJlZmVyZW5jZSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlZG93bmVyID0gYXR0cmlidXRlZG93bmVyO1xuICAgICAgICB0aGlzLmFydGljbGVpZCA9IGFydGljbGVpZDtcbiAgICAgICAgQXR0cmlidXRpb25MaW5rLmNvdW50Kys7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdHRyaWJ1dGlvbkxpbms7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZHNTbGlkZVNob3cge1xuICAgIGNhcmRzOk5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+O1xuICAgIGNhcmRxdWFudHNob3c6IG51bWJlcjtcbiAgICBjYXJkaW5keHN0YXJ0OiBudW1iZXIgPSAwO1xuICAgIGNhcmRzaW5keGVuZDogbnVtYmVyO1xuICAgIHR1cm46IG51bWJlciA9IDA7XG4gICAgbWF4dHVybmNvdW50OiBudW1iZXI7XG4gICAgc2xpZGVzaG93Y29udGFpbmVyOkhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc2xpZGVzaG93XCIpIGFzIEhUTUxFbGVtZW50O1xuICAgIHByZXZidG46IEhUTUxFbGVtZW50O1xuICAgIG5leHRidG46IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IgKGNhcmRzOiBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50PiwgcXVhbnRpdHlzaG93OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmNhcmRzID0gY2FyZHM7XG4gICAgICAgIHRoaXMuY2FyZHF1YW50c2hvdyA9IHF1YW50aXR5c2hvdztcbiAgICAgICAgdGhpcy5jYXJkc2luZHhlbmQgPSB0aGlzLmNhcmRxdWFudHNob3cgLSAxO1xuICAgICAgICB0aGlzLm1heHR1cm5jb3VudCA9IHRoaXMuY2FyZHMubGVuZ3RoIC0gdGhpcy5jYXJkcXVhbnRzaG93O1xuICAgIH1cbn0iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JDb2RlIHtcbiAgICBlbGVtczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5bXTtcbiAgICBjb2xvcjogc3RyaW5nW107XG4gICAgcmVzZXRidG46IEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IgKGNvbG9ybGVzc2VsZW1lbnRzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PltdLCBjb2xvcnM6IHN0cmluZ1tdLCByZXNldGJ0bjogRWxlbWVudCl7XG4gICAgICAgIHRoaXMuZWxlbXMgPSBjb2xvcmxlc3NlbGVtZW50cztcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9ycztcbiAgICAgICAgdGhpcy5yZXNldGJ0biA9IHJlc2V0YnRuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5jc3NFeGFtcGxlSGlnaGxpZ2h0aW5nKHRoaXMuZWxlbXNbaV0sIHRoaXMuY29sb3JbaV0pO1xuICAgICAgICAgICAgdGhpcy5jc3NFeGFtcGxlSGlnaGxpZ2h0UmVzZXQodGhpcy5lbGVtc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjb2xvciB0aGUgZXhhbXBsZSBhcmVhJ3MgZWxlbWVudHMgdXNpbmcgY3NzXG4gICAgICogQHBhcmFtIGVsZW1zbGlzdCAtIE5vZGUgbGlzdCBvZiBIVE1MRWxlbGVtZW50cy4gSS5FLiB1c2luZyBxdWVyeS5TZWxlY3RvckFsbCgpXG4gICAgICogQHBhcmFtIGNvbG9yIC0gU3RyaW5nIG9mIENTUyBjb2xvciB2YWx1ZVxuICAgICAqL1xuICAgIGNzc0V4YW1wbGVIaWdobGlnaHRpbmcgKGVsZW1zbGlzdDogIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+LCBjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKChlbGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZWxlbXNsaXN0LmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9mdW5jdGlvbiB0byByZXNldCB0aGUgY3NzIGNvZGUgcHJvcGVydGllcyBjb2xvciB0byBvcmlnaW5hbFxuICAgIGNzc0V4YW1wbGVIaWdobGlnaHRSZXNldCggZWxlbXNsaXN0OiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pil7XG4gICAgICAgIHRoaXMucmVzZXRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBhcGlHRVQgfSBmcm9tIFwiLi4vbW9kZWxzL0FQSVwiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9Mb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIGZyb20gXCIuL0RpY3Rpb25hcnlTZWFyY2hNYXJrdXBcIjtcbmltcG9ydCBSV0JFcnJvciBmcm9tIFwiLi9SV0JFcnJvckJ1c1wiO1xuaW1wb3J0IHsgUldCUGFyc2VKU09OIH0gZnJvbSBcIi4vUldCSlNPTkNvbnZlcnRlclwiO1xuaW1wb3J0IHsgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL1JXQkpTT05Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50cyB9IGZyb20gXCIuL1dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5cblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2ggaXMgYSBzZXQgb2YgbWFya3VwIGNyZWF0aW9uIGFuZCBmdW5jdGlvbnMgd2hpY2ggYWxsb3cgYSB1c2VyXG4gKiAgdG8gbG9vayB1cCBhIHdvcmQgbGlrZSBhIERpY3Rpb25hcnkuIFdoZW4gY2FsbGVkLCB0aGUgdXNlcidzIGlucHV0IGlzIHZhbGlkYXRlZFxuICogIGFzIGFuIGFjY2VwdGFibGUgd29yZCBvciBpdCBkZWNsaW5lcyB0aGUgcmVxdWVzdCwgdGhlbiBzaG93aW5nIHRoZSB1c2VyIGlmIHRoZSB3b3JkXG4gKiAgaXMgYWNjZXB0YWJsZS5cbiAqXG4gKiBDcmVhdGluZyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCByZXF1aXJlcyBwYXNzaW5nIGEgcmVmZXJlbmNlIGVsZW1lbnQgKGZvciBhXG4gKiBrbm93biBwbGFjZW1lbnQgbG9jYXRpb24pIHRoYXQgY29udGFpbnMgdGhlICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzcy5cbiAqXG4gKiAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICpcbiAqIEFsbCB0aGUgbmVlZGVkIGVsZW1lbnRzIGFuZCBmdW5jdGlvbmFsaXR5IGFyZSBhZGRlZCB0byB0aGUgcGFnZS5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoIGV4dGVuZHMgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCB7XG4gIHB1YmxpYyBzdGF0aWMgd29yZFN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3Q6IHN0cmluZyA9IFwiUldCX3dvcmRfZmV0Y2hcIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVxdWVzdFVybDogc3RyaW5nID1cbiAgICBcImh0dHBzOi8vYXBpLmRpY3Rpb25hcnlhcGkuZGV2L2FwaS92Mi9lbnRyaWVzL2VuL1wiO1xuICBwcml2YXRlIHByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHdvcmRVUkw6IFVSTDtcbiAgcHJpdmF0ZSB3b3JkRGF0YTogb2JqZWN0O1xuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYWxsIHRoZSBmdW5jdGlvbmFsaXR5IGFuZCBtYXJrdXAgbmVlZGVkIGZvciB0aGVcbiAgICogIERpY3Rpb25hcnkgU2VhcmNoIHdpZGdldCBpbnRlcmZhY2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcGxhY2Ugd2lkZ2V0IG1hcmt1cC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnQpIHtcbiAgICAvL0ludm9rZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLlxuICAgIHN1cGVyKGVsZW0pO1xuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnRzID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIC8vSW5pdGlhbGl6ZSB0aGUgZGljdGlvbmFyeSB3aWRnZXQgd2l0aCBjbGljayBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLmFkZFdpZGdldEV2ZW50cygpO1xuICAgIC8vU3RvcmUgd29yZHMgY2FjaGUgZGF0YSB3aXRoIGluaXRpYWxpemF0aW9uLlxuICAgIERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPSBEaWN0aW9uYXJ5U2VhcmNoLmdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBMb2NhbCBTdG9yYWdlIHdvcmRzIHByZXZpb3VzbHkgc3RvcmVkIHdpdGggdGhlIERpY3Rpb25hcnkgU2VhcmNoIFdpZGdldC5cbiAgICpcbiAgICogQHJldHVybnMgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSAtIHRoZXNlIGFyZSB0aGUgd29yZHMgc3RvcmVkIHByZXZpb3VzbHkgaW4gdGhlXG4gICAqICBicm93c2VyIGNhY2hlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkge1xuICAgIC8vTG9jYWwgU3RvcmFnZSAnd29yZC1jYWNoZXMnIGl0ZW1zIGRhdGEgYXNzaWdubWVudFxuICAgIC8vY2FjaGUgcmVzcG9uc2UgbGlua3MgYW5kIGNhY2hlIG5hbWUgYXJlIHByZXZpb3VzbHkgc3RvcmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZVN0cjogc3RyaW5nO1xuICAgIGlmKFJXQkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFwiRGljdGlvbmFyeVNlYXJjaFwiLCBcIndvcmQtY2FjaGVzXCIsIHRydWUsIHRydWUpKXtcbiAgICAgIC8vVGhlIExvY2FsIFN0b3JhZ2UgaXMgbnVsbCBvciBlbXB0eS0tPiBDb25maXJtIGhlcmUgdGhlIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBhbnkgQ2FjaGUgU3RvcmFnZSBpdGVtcyBpbiBlcnJvclxuICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KXtcbiAgICAgICAgaWYgKHdpbmRvdy5jYWNoZXMuaGFzKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpKXtcbiAgICAgICAgICAgIHdpbmRvdy5jYWNoZXMuZGVsZXRlKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnd29yZC1jYWNoZXMnKTtcbiAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RvcmFnZVN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid29yZC1jYWNoZXNcIik7XG4gICAgLy9jaGVjayB0aGUgd29yZC1jYWNoZSB2YWx1ZSBmb3IgY29ycmVjdCBqc29uIHBhcnNpbmdcbiAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKHN0b3JhZ2VTdHIpKTtcbiAgICBpZiAoIXBhcnNldGVzdC5wYXNzZWQpe1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTZweDsnKTtcbiAgICAgIHRoaXMuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgcHJldmlvdXNseSBzZWFyY2hlZCB3b3JkLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkVVJMKCkge1xuICAgIHJldHVybiB0aGlzLndvcmRVUkw7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIGZldGNoZWQgd29yZCBkYXRhLlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGlzLndvcmREYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZERhdGE7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjbGljayBhbmQga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB3aWRnZXQuIElucHV0IGV2ZW50IGxpc3RlbmVycyAnY2xpY2snXG4gICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAqICBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQsIHRoZSB3aWRnZXQgYWRhcHRzIG1hcmt1cCBmb3IgdGhhdCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkEgc2VhcmNoIGVsZW1lbnQgaXMgdW5kZWZpbmVkIGZyb20gc2VhcmNoV29yZCB8IHdvcmRTZWFyY2hcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICBjb25zdCBoaWRlUHJldmlvdXNQYW5lbCA9ICgpID0+IHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgICB9KTtcbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIpIHJldHVybjtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIGhpZGVQcmV2aW91c1BhbmVsKCk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIC8vXCJQcmV2aW91cyB3b3JkIHNlYXJjaGVzXCIgYnV0dG9uIGZldGNoZXMgbG9jYWxseSBzdG9yZWQgd29yZHNcbiAgICAvL0NsaWNraW5nIHRoZSBidXR0b24gZGlzcGxheXMgZWFjaCB3b3JkIGluIGEgbGlzdCB3aXRoaW4gdGhlIHdpZGdldFxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpO1xuICAgICAgfSk7XG4gICAgXG4gICAgLy9cIlJlZnJlc2hcIiBidXR0b24gcmVsb2FkcyB0aGUgcGFnZVxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpIHtcbiAgICBjb25zdCBwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJldmlvdXNXb3Jkc1wiKTtcbiAgICBsZXQgYnV0dG9uQ29udGFpbmVyID0gdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyO1xuXG4gICAgLy9DaGVjayB0aGUgcGxhY2VtZW50IGxvY2F0b3IgYW5kIHdvcmQgY2FjaGVzIGZvciB1bmRlZmluZWRcbiAgICBpZiAocGxhY2VtZW50bG9jYXRpb25ob2xkZXIgPT0gbnVsbCB8fFxuICAgICAgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgICAgIGNvbnN0IG5vV29yZHNIZWFkaW5nRWxlbSA9IGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgICAgbm9Xb3Jkc0hlYWRpbmdFbGVtLnRleHRDb250ZW50ID0gXCJQcmV2aW91cyB3b3JkcyBub3QgZm91bmQuIFRoZSBjYWNoZSBpcyBlbXB0eS5cIjtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQsIGJ1dHRvbkNvbnRhaW5lcik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByZXZpb3VzV29yZEJ1dHRvbnMocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGFueSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCl7XG4gICAgaWYocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpe1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnV0dG9uczogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzW10gPSB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSwgYnV0dG9uQ29udGFpbmVyKTtcbiAgICAgIGZvciAobGV0IGJ0biBvZiBwcmV2aW91c3dvcmRidXR0b25zKXtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBidXR0b24uXG4gICAgICAvL3RoaXMgaXMgdGhlIGNhY2hlZCB3b3JkIGJ1dHRlbi4gd2hlbiBpdCdzIGNsaWNrZWQsIGZpcmUgYSB3b3JkIHNlYXJjaFxuICAgICAgYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLndvcmRTZWFyY2godGhpcy5zZWFyY2hFbGVtZW50cywgdHJ1ZSwgYnRuLndvcmQpO1xuICAgICAgfSk7XG4gICAgICAvL01PQklMRVxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsICgpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy93aGVuIGhvdmVyZWQsIGRpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAvL3doZW4gbm90IGhvdmVyZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0ZSBidXR0b25cbiAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UoYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSB3b3JkIHRvIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBjb250YWluaW5nIHdvcmQgZGF0YSwgVVJMLCBhbmQgY2FjaGluZy5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXZhbHVlIC0gVGhpcyBpbnRlcmZhY2Ugc3RvcmVzIGluZm9ybWF0aW9uIHdoZXJlIHNlbmRpbmcgdG8gTG9jYWwgU3RvcmFnZS5cbiAgICovXG4gIHByaXZhdGUgYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZShsb2NhbHN0b3JhZ2V2YWx1ZTogbG9jYWxzdG9yYWdld29yZCkge1xuICAgIC8vTG9nIHRoZSB3b3JkIGNhY2hlIGNyZWF0aW9uXG4gICAgY29uc3QgYWRkZWR3b3JkY2FjaGUgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjQWRkZWQgd29yZCBjYWNoZTogJHtsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkfWAsIFxuICAgICAgICAnY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuOycpO1xuICAgIH1cbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldmFsdWUnIG5lZWRzIGFkZGVkIHRvIGxvY2FsIHN0b3JhZ2UgY2FjaGVcbiAgICAvL0xvY2FsIHN0b3JhZ2UgbWF5IGJlIGVtcHR5IG9yIGFscmVhZHkgaGF2aW5nIHRoZSB3YW50ZWQgc2VhcmNoZWQgd29yZFxuICAgIC8vQ2hlY2sgc3RvcmFnZSBpcyBub3QgbnVsbC4gSWYgaXQgaXMsIGFkZCB0aGUgd29yZC5cbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICBpZiAoUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJEaWN0aW9uYXJ5U2VhcmNoXCIsIFwid29yZC1jYWNoZXNcIiwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgICAvL0FkZCB0aGUgc3RvcmFnZSB3b3JkIHRvIGFuIGFycmF5XG4gICAgICAgIGxldCB3b3JkU3RvcmU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IFtdO1xuICAgICAgICB3b3JkU3RvcmUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG4gICAgICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgIGxldCBzdHJpbmdpZnl0ZXN0c2luZ2xld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04od29yZFN0b3JlKSk7XG4gICAgICAgIGlmKCFzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5wYXNzZWQpe1xuICAgICAgICAgIC8vc3RyaW5naWZ5IG9iamVjdCBkaWQgbm90IHdvcmssIHNvIHJldHVyblxuICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBqc29uc3RyID0gc3RyaW5naWZ5dGVzdHNpbmdsZXdvcmQucmV0dXJuc3RyO1xuXG4gICAgICAgIC8vIExvY2FsIHN0b3JhZ2UgaXMgZW1wdHkgPT4gYWRkIHRoZSB3b3JkXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAgICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICAgIGFkZGVkd29yZGNhY2hlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0xvY2FsIHN0b3JhZ2UgaXMgbm90IGVtcHR5LiBIZXJlLCB3ZSBuZWVkIHRvIGFkZCB0aGUgd29yZCB0byB0aGUgZXhpc3Rpbmcgd29yZCBjYWNoZS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG4gICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvL01hdGNoIHRoZSBjdXJyZW50IFVSTCBmb3IgY2FjaGUgbWFuYWdlbWVudFxuICAgIGZvciAobGV0IGNhY2hlIG9mIGFsbGNhY2hlKSB7XG4gICAgICBpZiAoY2FjaGUud29yZFVSTCA9PSBsb2NhbHN0b3JhZ2V2YWx1ZS53b3JkVVJMKSB7XG4gICAgICAgIC8vV29yZCBpcyBhbHJlYWR5IGluIExvY2FsIFN0b3JhZ2VcbiAgICAgICAgLy9ObyBuZWVkIHRvIGFkZCBpdCB0byB0aGUgYXJyYXlcbiAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9BZGQgd29yZCB0byBleGlzdGluZyAnd29yZC1jYWNoZXMnIGluIExvY2FsIFN0b3JhZ2VcbiAgICBhbGxjYWNoZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcblxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTihhbGxjYWNoZSkpO1xuICAgIGlmKCFzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZC5wYXNzZWQpe1xuICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnJldHVybnN0cjtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBwcmV2aW91cyB3b3JkIGRhdGEgZnJvbSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSAtLT4gS2V5L1ZhbHVlXG4gICAqIGRhdGEgcmVmZXJlbmNpbmcgd29yZHMgc3RvcmVkIGluIGxvY2FsIGNhY2hlLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxzdG9yYWdld29yZCAtIHN0cmluZyBmcm9tIFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiIGJ1dHRvblxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdld29yZDogc3RyaW5nKSB7XG4gICAgLy9SZW1vdmUgdGhlIGNhY2hlIGl0ZW0gdG8gTG9jYWwgU3RvcmFnZSwgQ2FjaGUgU3RvcmFnZVxuICAgIC8vQ2hlY2sgbG9jYWwgc3RvcmFnZSBpcyBub3QgbnVsbCBvciBlbXB0eVxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL0dldCB0aGUgd29yZHMgYXJyYXkgZnJvbSBMb2NhbCBTdG9yYWdlXG4gICAgLy9SV0JFcnJvci5jaGVja0xvY2FsU3RvcmFnZU51bGxvckVtcHR5KFwiRGljdGlvbmFyeVdpZGdldFwiLCBcIndvcmQtY2FjaGVzXCIpOyAvL2xvZyB3aGV0aGVyIGZldGNoZWQgd29yZCBjYWNoZSBpcyBudWxsIG9yIGVtcHR5LlxuICAgIGxldCBhbGxjYWNoZTogbG9jYWxzdG9yYWdld29yZFtdID0gRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZTtcbiAgICBcbiAgICAvL1JlbW92ZSB0aGUgd29yZCBmcm9tIENhY2hlIFN0b3JhZ2UgYW5kIExvY2FsIFN0b3JhZ2Ugd29yZCBhcnJheVxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKHdvcmRDYWNoZS53b3JkID09IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkQ2FjaGUud29yZFVSTCk7XG4gICAgICAgIGFsbGNhY2hlLnNwbGljZShhbGxjYWNoZS5pbmRleE9mKHdvcmRDYWNoZSksIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXdvcmR9YCwgXG4gICAgICAgICAgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuOycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsY2FjaGUubGVuZ3RoID09IDApeyAvL1RoZSByZW1vdmVkIHdvcmQgd2FzIHRoZSBsYXN0IHdvcmQgaW4gdGhlIGFycmF5LCBzbyByZW1vdmUgdGhlIGNvbnRhaW5lclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsIFxuICAgICAgICAnY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE2cHg7Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgbGV0IHdvcmRjYWNoZXNzdHJmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKGFsbGNhY2hlKSk7XG4gICAgaWYgKCF3b3JkY2FjaGVzc3RyZnl0ZXN0LnBhc3NlZCl7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL1JldHVybiByZW1haW5pbmcgd29yZHMgdG8gTG9jYWwgU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgd29yZGNhY2hlc3N0cmZ5dGVzdC5yZXR1cm5zdHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZldGNoIHJlcXVlc3QgZnJvbSBDYWNoZSBTdG9yYWdlLiBVdGlsaXplcyBcbiAgICogRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCBmb3IgY2FjaGUgbmFtZS5cbiAgICogQHBhcmFtIHJlbW92ZVVSTCBcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2UocmVtb3ZlVVJMOiBVUkwpIHtcbiAgICB3aW5kb3cuY2FjaGVzXG4gICAgLm9wZW4oRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdClcbiAgICAudGhlbigoY2FjaGUpID0+IHtcbiAgICAgIGNhY2hlcy5tYXRjaChyZW1vdmVVUkwpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gbWF0Y2hpbmcgdGhlIHJlc3VsdC4gUmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgY2FjaGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUocmVzdWx0KSk7XG4gICAgICAgICAgY2FjaGVQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FjaGUuZGVsZXRlKHJlbW92ZVVSTCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZHluYW1pY2FsbHkgcmVjYWxscyBhIHdvcmQgZGVmaW5pdGlvbiByZXF1ZXN0IGFuZCBpbnN0YW50aWF0ZXMgYXBpR0VUKCkuIFRoZSBcbiAgICogcmV0dXJuZWQgcHJvbWlzZSBhbHNvIGR5bWFuaWNhbGx5IGFuc3dlcnMgdGhlIHdpZGdldCBtYXJrdXAuXG4gICAqXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgc2VhcmNoZWQgZnJvbSB3aWRnZXQgaW5wdXQuXG4gICAqIEBwYXJhbSB3b3JkVXJsIC0gVGhlIGZldGNoIHJlcXVlc3QgVVJMLlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHNlbmRUb0NhY2hlIC0gPyBTZW5kIGZldGNoIHJlcXVlc3QgdG8gQ2FjaGUgU3RvcmFnZSA6IEZldGNoIHdpdGhvdXQgc3RvcmluZyB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIGNhY2hlTmFtZSAtIElmIHNlbmRpbmcgZmV0Y2ggcmVxdWVzdHMgdG8gY2FjaGUsIHByb3ZpZGUgYSBuYW1lIHRvIHN0b3JlIGl0IHVuZGVyLlxuICAgKiBAcmV0dXJucyAtIHdvcmREYXRhOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwcml2YXRlIGZldGNoRGljdGlvbmFyeVRlcm0od29yZDogc3RyaW5nLCB3b3JkVXJsOiBVUkwsIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIHNlbmRUb0NhY2hlOiBib29sZWFuLCBjYWNoZU5hbWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICAvL0EgZnVuY3Rpb24gY2FsbCBwYXJhbWV0ZXIgb3B0aW9uIGlzIHRvIHN0b3JlIHRoZSB3b3JkIHJlcXVlc3QgaW4gYnJvd3NlcidzIENhY2hlIFN0b3JhZ2VcbiAgICAvL1N0cnVjdHVyZSB0aGUgd29yZCBkYXRhIHZpYSAnbG9jYWxzdG9yYWdld29yZHZhbHVlJyBpbnRlcmZhY2UgdXNlZCB0aHJvdWdob3V0IGZldGNoaW5nXG4gICAgbGV0IHdvcmRjYWNoZTogbG9jYWxzdG9yYWdld29yZCA9IHtcbiAgICAgIGluQ2FjaGU6IHNlbmRUb0NhY2hlLFxuICAgICAgd29yZDogd29yZCxcbiAgICAgIHdvcmRVUkw6IHdvcmRVcmwsXG4gICAgICBjYWNoZU5hbWU6IHNlbmRUb0NhY2hlID8gY2FjaGVOYW1lIDogXCJcIixcbiAgICB9O1xuXG4gICAgLy9Bc3luY2hyb25vdXMgZmV0Y2ggcmVxZXVzdCBhbmQgZHluYW1pYyBtYXJrdXAgY3JlYXRpb24gZnJvbSB0aGUgZGF0YSdzIHJldHVyblxuICAgIGNvbnN0IHdvcmRGZXRjaFJlcXVlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgICAvL0NhbGwgYXBpR0VUKCkgb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICBjb25zdCB3b3JkRmV0Y2ggPSBuZXcgYXBpR0VUKFxuICAgICAgICB3b3JkY2FjaGUud29yZFVSTCxcbiAgICAgICAgd29yZGNhY2hlLmluQ2FjaGUsXG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbSxcbiAgICAgICAgd29yZGNhY2hlLmNhY2hlTmFtZVxuICAgICAgKTtcbiAgICAgIGxldCBub0RlZmluaXRpb25zOiBib29sZWFuO1xuXG4gICAgICAvL0ZldGNoIHJlcXVlc3QgbWV0aG9kIGNhbGwuIFJldHVybmVkIGRhdGEgbWF5IGJlIHRoZSB3b3JkIGRlZmluaXRpb25cbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd29yZEZldGNoLmFwaUdFVCh3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy9JZiB0aGUgcmV0dXJuZWQgZGF0YSBpcyBhIHN0cmluZywgaXQgaXMgdGhlIHdvcmQgZGVmaW5pdGlvbiBkYXRhLlxuICAgICAgICBub0RlZmluaXRpb25zID0gZmFsc2U7XG4gICAgICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04oZGF0YSkpO1xuICAgICAgICBpZighcGFyc2V0ZXN0LnBhc3NlZCl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSBwYXJzZXRlc3QucmV0dXJub2JqO1xuICAgICAgfVxuICAgICAgbGV0IHdvcmREYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgLy9JZiB0aGUgcmV0dXJuZWQgZGF0YSBpcyBhbiBvYmplY3QsIGNvbmZpcm0gaXQgaXMgJ25vIGRlZmluaXRpb24nIHNlcnZlciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgXCJ0aXRsZVwiKSkge1xuICAgICAgICAgIC8vTm8gZGVmaW5pdGlvbnMgd2VyZSBmb3VuZCB3aGVuIGRhdGEgaXMgYW4gb2JqZWN0IHdpdGggYSB0aXRsZSBwcm9wZXJ0eVxuICAgICAgICAgIC8vd29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiXG4gICAgICAgICAgbm9EZWZpbml0aW9ucyA9IHRydWU7XG4gICAgICAgICAgaWYod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiICYmIHdvcmRjYWNoZS5pbkNhY2hlID09IHRydWUpe1xuICAgICAgICAgICAgLy9UaGUgZGF0YSBzdHJlYW0gaGVyZSBpcyB3aXRob3V0IHdvcmQgZGF0YS4gVGhpcyBmdW5jdGlvbiBhd2FpdHMgdGhlIGFwaSBmZXRjaCdzIGRhdGFcbiAgICAgICAgICAgIC8vdG8gY29tcGxldGUgc3RvcmFnZS9wcm9taXNlIHJldHVybnMuIEl0IHdhaXRzIDUgc2Vjb25kcyBmb3IgdGhlIGJyb3dzZXIgdG8gY29tcGxldGUgaXRzIHN0b3JlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy90aGVuIHJlbW92ZXMgdGhlIHVud2FudGVkIGNhY2hlIHJlcXVlc3QuXG4gICAgICAgICAgICAvL1RPRE86QlVHUkVTRUFSQ0g9PkR1cmluZyB0aGUgNSB0aW1lb3V0LCBpZiB0aGUgcGFnZSByZWZyZXNoZXMgYSAnYmFkIHdvcmQnIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgLy9UaGlzICdiYWQgd29yZCcgY2FuIGJlIHJlbW92ZWQgYnkgZGVsZXRpbmcgYWxsIHByZXZpb3VzIHdvcmRzIHZpYSBVSSBhbmQgcmVmcmVzaGluZyB0aGUgcGFnZS4gVGhpcyB3aWxsXG4gICAgICAgICAgICAvLyBmaXJlIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB0byBjbGVhciBhbnkgbWlzbWF0Y2hlZCB3b3JkZGF0YTwtLT5jYWNoZWRyZXF1ZXN0cy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0Z1bmN0aW9uIGF3YWl0aW5nIHJlcXVlc3QncyBDYWNoZSBTdG9yYWdlIGNhY2hpbmdcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVxdWVzdGZyb21DYWNoZVN0b3JhZ2Uod29yZEZldGNoLmdldEdFVFVSTCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2h7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IHJlbW92ZSBmcm9tIENhY2hlIFN0b3JhZ2UuIE5hbWU6IFwiLCB3b3JkRmV0Y2guZ2V0R0VUVVJMKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQgfHwgbm9EZWZpbml0aW9ucykgey8vR29vZCBkYXRhLS0+IHJldHVybiBkYXRhIGZvciBtYXJrdXAgcmVuZGVyXG4gICAgICAgIC8vJ0JhZCBkYXRhJyBkdWUgdG8gXCJObyBkZWZpbml0aW9ucyBmb3VuZFwiLCBpbnZhbGlkIHdvcmQsIGJhZCBuZXR3b3JrIGNvbm5lY3Rpb25cbiAgICAgICAgaWYgKCFuYXZpZ2F0b3Iub25MaW5lKSB7Ly9PbmxpbmUsIHByb2JsZW0gd2l0aCBmZXRjaFxuICAgICAgICAgIC8vT2ZmbGluZSByZXF1ZXN0XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9EZWZpbml0aW9ucykgey8vU2VydmVyIHJldHVybmVkIG5vIGRlZmluaXRpb25zIGRhdGFcbiAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSB7Ly9JbnZhbGlkIHdvcmQgZGF0YVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiSW52YWxpZCB3b3JkIVwiO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QuYWRkKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkY2FjaGUpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBsZXQgd29yZERhdGEgPSB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHdvcmREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgaW5wdXQgdmFsaWRhdGlvbiBmdW5jdGlvbiB0ZXN0cyB0aGUgaW5wdXQgc3RyaW5nIGFnYWluc3QgYSB2YWxpZCBSZWd1bGFyIEV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgIFJlZ0V4cChcIl5bQS1aYS16XXsxLDQ1fSRcIilcbiAgICpcbiAgICogQHBhcmFtIGludHh0IC0gU3RyaW5nIHZhbHVlIHJlY2VpdmVkIGZyb20gdXNlciBmaWVsZCBpbnB1dC5cbiAgICogQHJldHVybnMgQWNjZXB0YWJsZSB1c2VyIGlucHV0OiB0cnVlIG9yIGZhbHNlLlxuICAgKi9cbiAgcHJpdmF0ZSB3b3JkVmFsaWRhdGlvbihpbnR4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRyaW1tZWQgPSBpbnR4dC50cmltKCk7XG4gICAgbGV0IGxldHRlcnNSRSA9IG5ldyBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpO1xuICAgIGlmIChsZXR0ZXJzUkUudGVzdCh0cmltbWVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vd29yZCBpcyBub3QgYW4gYWNjZXB0YWJsZSB3b3JkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybSBhd2FpdHMgYSBwcm9taXNlLCBmZXRjaGluZyBhIGRpY3Rpb25hcnkgdGVybS4gVGhlIGRhdGEgXG4gICAqIGluZ3Jlc3MgY2FsbHMgbWFya3VwIGNyZWF0aW9uIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCB0byBiZSBmZXRjaGVkLlxuICAgKiBAcGFyYW0gd29yZFVSTCAtIEEgVVJMIGNvbXBvc2luZyB0aGUgZnVsbCB1cmwgb2YgdGhlIGZldGNoIHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsIHdvcmQ6IHN0cmluZywgd29yZFVSTDogVVJMKSB7XG4gICAgLy8gV2hlbiB0aGUgd29yZCBkYXRhIHJlc29sdmVzLCBjYWxsIG1hcmt1cCBmdW5jdGlvbnNcbiAgICBsZXQgd29yZERhdGFQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUoXG4gICAgICAgIHRoaXMuZmV0Y2hEaWN0aW9uYXJ5VGVybSh3b3JkLCB3b3JkVVJMLCBzZWFyY2hFbGVtcywgdHJ1ZSwgRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdClcbiAgICAgICk7XG4gICAgfSk7XG4gICAgd29yZERhdGFQcm9taXNlLnRoZW4oKGRhdGE6IG9iamVjdCkgPT4ge1xuICAgICAgdGhpcy53b3JkRGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cChkYXRhLCBzZWFyY2hFbGVtcyk7XG4gICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQgfHwgT2JqZWN0Lmhhc093bihkYXRhLCAndGl0bGUnKSkgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmV0cmlldmVkIHdvcmQ6ICR7d29yZH1gLCBcbiAgICAgICAgJ2NvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z29sZDsnKTtcbiAgICAgICAgLy8gUmVtb3ZlIHVubmVlZGVkIGNsYXNzZXMgaWYgYXBwbGllZCBwcmV2aW91c2x5XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgaXNGcm9tUHJldmlvdXNXb3JkczogYm9vbGVhbiwgY2FjaGVkV29yZDogbG9jYWxzdG9yYWdld29yZCB8IG51bGwpIHtcbiAgICBpZiAoaXNGcm9tUHJldmlvdXNXb3Jkcykge1xuICAgICAgdGhpcy5jYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtcywgY2FjaGVkV29yZC53b3JkLCBjYWNoZWRXb3JkLndvcmRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgIGxldCBhY2NlcHRlZElucHV0V29yZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkVmFsaWRhdGlvbihzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlKVxuICAgICAgICA/IChhY2NlcHRlZElucHV0V29yZCA9IHRydWUpXG4gICAgICAgIDogKGFjY2VwdGVkSW5wdXRXb3JkID0gZmFsc2UpO1xuICAgICAgaWYgKGFjY2VwdGVkSW5wdXRXb3JkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIFVSTCBvZiB0aGUgYWNjZXB0ZWQgd29yZCBmb3IgdXNlIGluIHRoZSBmZXRjaCBjYWxsXG4gICAgICAgIHRoaXMud29yZFVSTCA9IG5ldyBVUkwoc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZS50b1N0cmluZygpLCBEaWN0aW9uYXJ5U2VhcmNoLnJlcXVlc3RVcmwpO1xuICAgICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLCB0aGlzLndvcmRVUkwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1ub3Rmb3VuZFwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJJbnZhbGlkIHdvcmQhXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUgPSBcIlwiOyAvLyByZXNldCBpbnB1dCBzdHJpbmdcbiAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V3b3JkIH0gZnJvbSBcIi4vTG9jYWxTdG9yYWdlQ2FjaGVzXCI7XG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgfSBmcm9tIFwiLi9XaWRnZXRNYXJrdXBFbGVtZW50c1wiO1xuaW1wb3J0IHsgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KXtcbiAgICAvL2luc2VydCB0aGUgd2lkZ2V0IGFmdGVyIHRoZSBwYXNzZWQgaW4gXCJlbGVtXCJcbiAgICBpZiAoZWxlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlY1RoZXJlIGlzIG5vIFwiZGljdGlvbmFyeVdpZGdldFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGljdGlvbmFyeVdpZGdldFwiKSkge1xuICAgICAgY29uc29sZS5sb2coYEFkZCBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtKTtcbiAgfVxuICAvKipcbiAgICogUHJpbWFyeSB3aWRnZXQgbWFya3VwIHN0cnVjdHVyaW5nIHRoZSB3aWRnZXQgZWxlbWVudHMgYW5kIHNlYXJjaCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW0gLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgYmVmb3JlIHRoZSB3aWRnZXQuXG4gICAqIEByZXR1cm5zIHNlYXJjaEVsZW1lbnRzOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMgLS0+IGludGVyZmFjZSBvZlxuICAgKiAgaW1wb3J0YW50IEhUTUwgZWxlbWVudHMgdXNlZCB0aHJvdWdoIHdpZGdldCBmdW5jdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVEaWN0aW9uYXJ5V2lkZ2V0TWFya3VwKGVsZW06IEVsZW1lbnQpIHtcbiAgICBjb25zdCBkaWN0aW9uYXJ5ID0gZWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSk7XG4gICAgaWYgKGRpY3Rpb25hcnkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgZGV0ZXJtaW5lZCBkaWN0aW9uYXJ5IGVsZW1lbnQgaXMgbnVsbC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSB3aWRnZXQgZWxlbWVudHNcbiAgICBjb25zdCBhcnRIID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKSk7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcblxuICAgIC8vIFJldHVybiBlbGVtZW50cyB1c2VkIGluIGxhdGVyIGZ1bmN0aW9uc1xuICAgIGxldCBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzID0ge1xuICAgICAgc2VhcmNoV29yZDogc2VhcmNoRm9ybS5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgZGljdGlvbmFyeUVsZW06IDxIVE1MRWxlbWVudD5kaWN0aW9uYXJ5LFxuICAgICAgZXJyb3JFbGVtOiBzZWFyY2hGb3JtLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSksXG4gICAgICBwcmV2aW91c1dvcmRCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgcHJldmlvdXNXb3Jkc0NvbnRhaW5lcjogZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxcbiAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgIH07XG4gICAgXG4gICAgLy8gQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgIGNvbnN0IGZvbnRBd2Vzb21lU2VhcmNoSWNvbiA9IHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgZm9udEF3ZXNvbWVTZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYVwiKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNlYXJjaFwiKTtcbiAgICBwcmV2aW91c1dvcmRzLmNsYXNzTGlzdC5hZGQoXCJwcmV2aW91c1dvcmRzXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuY2xhc3NMaXN0LmFkZChcIm1vbm9zcGFjZVwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlNlYXJjaC4uLlwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiU2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuaWQgPSBcInNlYXJjaC13b3JkXCI7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5pZCA9IFwid29yZC1zZWFyY2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uaW5uZXJUZXh0ID0gXCJQcmV2aW91cyBXb3JkIFNlYXJjaGVzXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5pbm5lclRleHQgPSBcIlJlZnJlc2hcIjtcbiAgICBzZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRzQ29udGFpbmVyLmlkID0gXCJkaWN0aW9uYXJ5LWJ0bnNcIjtcbiAgICBkaWN0aW9uYXJ5LmlkID0gXCJkaWN0aW9uYXJ5XCI7XG4gICAgc2VhcmNoRm9ybS5pZCA9IFwiZGljdGlvbmFyeS1zZWFyY2hcIjtcbiAgICBzZWFyY2hGb3JtLmFjdGlvbiA9IFwiaW5kZXguaHRtbFwiO1xuICAgIGFydEgudGV4dENvbnRlbnQgPSBcIkRpY3Rpb25hcnkgVGVybTpcIjtcblxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMgPSBzZWFyY2hFbGVtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtYXJrdXAgdG8gaG91c2UgcmV0dXJuZWQgd29yZHMgZnJvbSBEaWN0aW9uYXJ5U2VhcmNoLiBUaGUgbWFya3VwXG4gICAqICBpcyBjcmVhdGVkIGJhc2VkIG9uIEFQSSBlZ3Jlc3MuIFdvcmRzIGFuZCB0aGVpciBkZWZpbml0aW9ucyB2YXJ5LiBUaGUgbWFya3VwIGlzXG4gICAqICBhZGFwdGl2ZSB0byByZXR1cm5lZCB3b3JkIGRhdGEgc3RydWN0dXJlcy5cbiAgICpcbiAgICogQHBhcmFtIHdvcmREYXRhIC0gVGhpcyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IG9mIHdvcmQgdHlwZXMsIGRlZmluaXRpb25zLCBhbmQgZXhhbXBsZXMuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZURpY3Rpb25hcnlUZXJtV2l0aE1hcmt1cCh3b3JkRGF0YTogYW55LCBzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzKSB7XG4gICAgaWYgKHdvcmREYXRhID09IG51bGwgfHwgISh3b3JkRGF0YSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgT2JqZWN0Lmhhc093bih3b3JkRGF0YSwgJ3RpdGxlJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIlY1RoZXJlIGlzIG5vIGRlZmluaXRpb24gZm9yIHRoaXMgd29yZC5cIiwgXCJjb2xvcjpkYXJrZ3JlZW47XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFkZCB3b3JkIGRlZmluaXRpb24gdG8gdGhlIGRpY3Rpb25hcnkgd2lkZ2V0XG4gICAgY29uc3QgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyID0gc2VhcmNoRWxlbXMuZGljdGlvbmFyeUVsZW0uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb24gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpOyAvLyB3b3JkIGRlZmluaXRpb24gc2VwYXJhdG9yXG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uRGVzY3JpcHRpb25cIik7XG5cbiAgICAvLyBUaGUgd29yZCBkYXRhIHJlcHJlc2VudHMgY29tcGxleCBKU09OIG9iamVjdFxuICAgIC8vIFJlY3Vyc2UgdGhlIHdvcmQgZGF0YSBvYmplY3QsIGFkZGluZyBlbGVtZW50cyBmcm9tIHRoZSB2YXJpb3VzIGxldmVsc1xuICAgIHdvcmREYXRhLm1hcCgod29yZDogYW55KSA9PiB7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwid29yZFwiLCB3b3JkLndvcmQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSB3b3JkIGlzOiBcIix3b3JkKVxuICAgICAgY29uc3Qgd29yZFRpdGxlID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSk7XG4gICAgICAgICAgbGV0IGRlZmluaXRpb25QID0gd29yZFR5cGVEZWZJdGVtLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgIGRlZmluaXRpb25QLnRleHRDb250ZW50ID0gZGVmLmRlZmluaXRpb247XG4gICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcIndvcmREZWZpbml0aW9uXCIpO1xuXG4gICAgICAgICAgY29uc3QgYWRkQWRqYWNlbnRFbGVtID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRlZmluaXRpb25zIGlzOiBcIiwgZGVmKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBkZWZpbml0aW9uUC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIixcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikpO1xuICAgICAgICAgICAgaWYgKG5ld1AgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdQaSA9IG5ld1AuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikpO1xuICAgICAgICAgICAgICBuZXdQaS50ZXh0Q29udGVudCA9IGRlZi5leGFtcGxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5pdGlvblAuY2xhc3NMaXN0LmFkZChcImV4YW1wbGVcIik7XG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NoZWNrIGlmIGtleSBcImV4YW1wbGVcIiBpcyBpbiBkZWZpbml0aW9uLiBJZiBpdCBpcywgYWRkIHRoZSBleGFtcGxlIHRvIGxpc3RcbiAgICAgICAgICBcImV4YW1wbGVcIiBpbiBkZWYgPyBhZGRBZGphY2VudEVsZW0oKSA6IHRydWUgPT0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vY3JlYXRlIGNsZWFyIGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0gPSBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ3b3JkLWNsZWFyXCIpO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktd29yZC1idG4tY2xlYXJcIik7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGhvdmVyZWQsIGRpc3BsYXkgaXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIG5vdCBob3ZlcmVkLCBoaWRlIGl0XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgY2xpY2tlZCwgY2xlYXIgdGhlIGVsZW1lbnRzXG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgd29yZDogJHtkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuZ2V0QXR0cmlidXRlKFwid29yZFwiKX1gLCBcbiAgICAgICAgJ2NvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpnb2xkZW5yb2Q7Jyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjbGVhciBidXR0b24gdG8gd2lkZ2V0XG4gICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlZmluaXRpb25EZXNjcmlwdGlvbik7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyAod29yZHN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXSwgYnV0dG9uQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIGxldCBidXR0b25zYXJyOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9IFtdO1xuICAgIFxuICAgIC8vQmVjYXVzZSB0aGUgbG9jYXRvciBhbmQgdGhlIExvY2FsIFN0b3JhZ2UgdmFsdWVzIGFyZSB2aWFibGUsIGNyZWF0ZSB0aGUgbWFya3VwXG4gICAgLy9uZWVkZWQgdG8gZGlzcGxheSB0aG9zZSB3b3Jkcy4gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2lkZ2V0IGZ1bmN0aW9uYWxpdHkuXG4gICAgZm9yIChsZXQgd29yZENhY2hlIG9mIHdvcmRzdG9yYWdlKSB7XG4gICAgICBjb25zdCB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIgPSBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgY29uc3QgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpO1xuICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvbi1jbGVhclwiKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LXdvcmQtYnRuLWNsZWFyXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLmNsYXNzTGlzdC5hZGQoXCJkaWN0aW9uYXJ5LWJ0blwiLCBcImRpY3Rpb25hcnktd29yZC1idG5cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IHdvcmRDYWNoZS53b3JkO1xuXG4gICAgICBsZXQgcHJldmlvdXN3b3JkYnRuOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHMgPSB7XG4gICAgICAgIHdvcmQ6IHdvcmRDYWNoZSxcbiAgICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW06IGNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgICB3b3JkSGVhZGluZ0VsZW1Db250YWluZXI6IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lcixcbiAgICAgICAgZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW06IGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLFxuICAgICAgfVxuICAgICAgYnV0dG9uc2Fyci5wdXNoKHByZXZpb3Vzd29yZGJ0bik7XG4gICAgfVxuICAgIHJldHVybiBidXR0b25zYXJyO1xuICB9XG59XG4iLCIvL0F1dGhvcjogUm9iZXJ0IEEgSG93ZWxsLCBBcHJpbCAyMDIzXG4vL09yaWdpbmFsIEF1dGhvcihzKTogTW96aWxsYSBDb250cmlidXRvcnMsIE1ETlxuLy9MaWNlbnNlOiBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9lbi1VUy9hYm91dC9nb3Zlcm5hbmNlL3BvbGljaWVzL3BhcnRpY2lwYXRpb24vXG4vL01ETjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2NyZWF0ZUVsZW1lbnRcbi8vU291cmNlIGRpc3RyaWJ1dGlvbjogaHR0cHM6Ly9naXRodWIuY29tL21kbi93ZWItY29tcG9uZW50cy1leGFtcGxlcy90cmVlL21haW4vZXhwYW5kaW5nLWxpc3Qtd2ViLWNvbXBvbmVudFxuXG4vLyBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlIGVsZW1lbnRcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdMaXN0RWxlbWVudCBleHRlbmRzIEhUTUxVTGlzdEVsZW1lbnQge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcbiAgICAgICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gc3VwZXIoKSBpcyBhIHJlZmVyZW5jZSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgICAgICAvLyBsaSBlbGVtZW50cyBjYW4gYmUgY29udGFpbmVycyBpZiB0aGV5IGhhdmUgdWxzIHdpdGhpbiB0aGVtXG4gICAgICAgIGNvbnN0IHVscyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgndWwnKTtcbiAgICAgICAgY29uc3QgbGlzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgICAgICAvLyBUaGVzZSBsaXN0cyB3aWxsIGJlIHNob3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgaGlnaGVyIGxldmVsIGNvbnRhaW5lclxuICAgICAgICB1bHMuZm9yRWFjaCh1bCA9PiB7XG4gICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMb29rIHRocm91Z2ggZWFjaCBsaSBlbGVtZW50IGluIHRoZSB1bFxuICAgICAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLy8gdG8gc2hvdyBhbiBvcGVuIG9yIGNsb3NlZCBpY29uXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdyYXAgdGhlIGxpIGVsZW1lbnQncyB0ZXh0IGluIGEgbmV3IHNwYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhc3NpZ24gc3R5bGUgYW5kIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBzcGFuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ29weSB0ZXh0IGZyb20gbGkgdG8gc3Bhbiwgc2V0IGN1cnNvciBzdHlsZVxuICAgICAgICAgICAgICAgIG5ld1NwYW4udGV4dENvbnRlbnQgPSBjaGlsZFRleHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgICAgICAgICBuZXdTcGFuLm9uY2xpY2sgPSB0aGlzLnNob3d1bDtcbiAgICAgICAgICAgICAgICBuZXdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ051bXBhZEVudGVyJyB8fCBldmVudC5jb2RlID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2libGluZyB0byB0aGUgc3BhbiBzaG91bGQgYmUgdGhlIHVsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dHVsID0gbmV3U3Bhbi5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dHVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1jbG9zZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNwYW4gYW5kIHJlbW92ZSB0aGUgYmFyZSB0ZXh0IG5vZGUgZnJvbSB0aGUgbGlcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZFRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgRXhwYW5kaW5nTGlzdEVsZW1lbnQuY291bnQrKztcbiAgICB9XG5cbiAgICAvLyBsaSBjbGljayBoYW5kbGVyXG4gICAgc2hvd3VsID0gZnVuY3Rpb24gKGU6IGFueSkge1xuICAgICAgICAvLyBuZXh0IHNpYmxpbmcgdG8gdGhlIHNwYW4gc2hvdWxkIGJlIHRoZSB1bFxuICAgICAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgc3RhdGUgYW5kIHVwZGF0ZSBjbGFzcyBhdHRyaWJ1dGUgb24gdWxcbiAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09ICdibG9jaycpIHtcbiAgICAgICAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd1bGlzdGVsZW0tY2xvc2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VsaXN0ZWxlbS1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8vIFRoaXMgb2JqZWN0IGNyZWF0ZXMgYW4gYXJyYXkgb2YgZGl2cyBmcm9tIHBvcnQgbnVtYmVyIGluZm9ybWF0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaGNhcmRDYXJkRWxlbXMge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIHdpZGdldCBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd2lkZ2V0Y291bnQ6IG51bWJlciA9IDA7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyB3aXRoaW4gdGhlIHdpZGdldCBpbnN0YW50aWF0ZWQgW2ZsYXNoY2FyZHNdICovXG4gICAgcHVibGljIHN0YXRpYyB0b3RhbGZsYXNoY2FyZHM6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG1fZmxhc2hjYXJkc0FycjogSFRNTExJRWxlbWVudFtdID0gW107XG4gICAgcHVibGljIGZsYXNoY2FyZHNjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fcG9ydEluZm9NYXA6IE1hcDxhbnksIHN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3J0bnVtYmVyc01hcDogTWFwPGFueSwgc3RyaW5nPikge1xuICAgICAgICB0aGlzLm1fcG9ydEluZm9NYXAgPSBwb3J0bnVtYmVyc01hcDtcbiAgICAgICAgY29uc3QgbWFwSXRlciA9IHRoaXMubV9wb3J0SW5mb01hcC5rZXlzKCk7XG4gICAgICAgIEZsYXNoY2FyZENhcmRFbGVtcy53aWRnZXRjb3VudCsrO1xuXG4gICAgICAgIHRoaXMubV9wb3J0SW5mb01hcC5mb3JFYWNoKCAocG9ydCkgPT4geyBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBmbGFzaGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAvL1RPRE86IGxldCBmbGFzaGNhcmQgPSBuZXcgR3Jvd2luZ0NhcmRFbGVtZW50KCk7XG4gICAgICAgICAgICAvL1VuYWJsZSB0byBpbnN0YW50aWF0ZSBsaSBlbGVtZW50IGFzIGdyb3dpbmcgY2FyZCBkdWUgdG8gRE9NIHVuYXZhbGFibGUgLS0+IHJlcXVpcmVzIHNoYWRvd0RPTSBtYW5pcHVsYXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIGVsZW1lbnQgZm9yIHBhZ2UgdXNlXG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IGZsYXNoY2FyZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGNvbnN0IGZsaXBmcm9udCA9IGlubmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICAgICAgY29uc3QgZmxpcGJhY2sgPSBpbm5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgICAgIGxldCBnYW1lQ2FyZFNwYW4gPSBmbGlwZnJvbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpO1xuICAgICAgICAgICAgbGV0IGdhbWVDYXJkQmFja1NwYW4gPSBmbGlwYmFjay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgICAgICBmbGFzaGNhcmQuY2xhc3NMaXN0LmFkZChcImZsaXAtY2FyZFwiLCBcImdhbWVDYXJkXCIpXG4gICAgICAgICAgICBpbm5lci5jbGFzc0xpc3QuYWRkKFwiaW5uZXJcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICAgICAgICAgIGZsaXBmcm9udC5jbGFzc0xpc3QuYWRkKFwiY2FyZEZyb250XCIpO1xuICAgICAgICAgICAgZmxpcGJhY2suY2xhc3NMaXN0LmFkZChcImNhcmRCYWNrXCIsIFwidmVydGljYWxcIik7XG4gICAgICAgICAgICBnYW1lQ2FyZFNwYW4uaW5uZXJUZXh0ID0gYFBvcnQjICR7bWFwSXRlci5uZXh0KCkudmFsdWV9YDtcbiAgICAgICAgICAgIGdhbWVDYXJkQmFja1NwYW4uaW5uZXJUZXh0ID0gYCR7cG9ydH1gO1xuXG4gICAgICAgICAgICB0aGlzLmZsYXNoY2FyZHNjb3VudCsrO1xuICAgICAgICAgICAgRmxhc2hjYXJkQ2FyZEVsZW1zLnRvdGFsZmxhc2hjYXJkcysrO1xuXG4gICAgICAgICAgICAvLyBBZGQgZGl2IHRvIGZsYXNoY2FyZCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5tX2ZsYXNoY2FyZHNBcnIucHVzaChmbGFzaGNhcmQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5leHBvcnQgY2xhc3MgR3Jvd2luZ0NhcmRFbGVtZW50IGV4dGVuZHMgSFRNTExJRWxlbWVudCB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaXNHcm93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmdyb3dDYXJkKTtcbiAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LmNvdW50Kys7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaHJpbmtDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHsgLy9UT0RPOiBjaGVjayBjbGFzcyBwcm9wZXJ0eVxuICAgICAgICBpZiAobGkuc3R5bGUuc2NhbGUpIHtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICBsaS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgICAgIGxpLnNldElzR3Jvd24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFkZUluYWN0aXZlQ2FyZCA9IChsaTogR3Jvd2luZ0NhcmRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChHcm93aW5nQ2FyZEVsZW1lbnQuZ2V0SXNBdExlYXN0T25lQmlnKCkpIHtcbiAgICAgICAgICAgIGlmICghbGkuZ2V0SXNHcm93bigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIi4zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJc0F0TGVhc3RPbmVCaWcgPSAoKSA9PiB7XG4gICAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgI3dlYklERUNhcmRzIGxpYCkpO1xuICAgICAgICBsZXQgYXRMZWFzdE9uZUlzQmlnID0gbGlzdExJcy5zb21lKChsaSkgPT4gbGkuZ2V0SXNHcm93bigpID09IHRydWUpO1xuICAgICAgICByZXR1cm4gYXRMZWFzdE9uZUlzQmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJc0dyb3duID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dyb3duO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXNHcm93biA9ICh0cnVlZmFsc2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNHcm93biA9IHRydWVmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdyb3dDYXJkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0eWxlLnNjYWxlID0gXCIxLjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS56SW5kZXggPSBcIjJcIjtcbiAgICAgICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIHRoaXMuc2V0SXNHcm93bih0cnVlKTtcblxuICAgICAgICAvLyBHZXQgYWxsIHRoZSBsaXN0IGVsZW1lbnRzIHRvIHJlZmVyZW5jZSB3aGljaCBvbmUgdG8gZ3Jvd1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgICAgIGxldCBsaXN0TElzID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjd2ViSURFQ2FyZHMgbGlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNocmlua0NhcmQoKGl0ZW0gYXMgR3Jvd2luZ0NhcmRFbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgR3Jvd2luZ0NhcmRFbGVtZW50LnNoYWRlSW5hY3RpdmVDYXJkKChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3R5bGUuc2NhbGUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuekluZGV4ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gcmVjb3JkIHJlZmVyZW5jZSBlcnJvcnMuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSV0JFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFJXQkVycm9yLmNvdW50Kys7XG4gICAgfTtcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrRWxlbWVudG9yTnVsbChjb21wb25lbnRuYW1lOnN0cmluZywgY3NzcXVlcnk6IHN0cmluZywgbG9nbWVzc2FnZT86Ym9vbGVhbiwgc3VwcmVzc2V4Y2VwdGlvbj86Ym9vbGVhbiApIHtcbiAgICAgICAgbGV0IGVsZW06IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlOyAvL0xvZyBtZXNzYWdlIG9wdGlvbiBkZWZhdWx0XG4gICAgICAgIGlmICghbG9nbWVzc2FnZSkgbG9nbXNzZyA9IGxvZ21lc3NhZ2U7XG4gICAgICAgIGxldCBzdXByZXNzZXhjcHQ6IGJvb2xlYW4gPSBmYWxzZTsvL1N1cHJlc3MgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgICAgICBpZiAoc3VwcmVzc2V4Y2VwdGlvbikgc3VwcmVzc2V4Y3B0ID0gdHJ1ZTtcbiAgICAgICAgbGV0IHF1ZXJ5OiBzdHJpbmcgPSBgJHtjc3NxdWVyeX1gO1xuXG4gICAgICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJXQlJlZmVyZW5jZUVycm9yKFwiR2V0RWxlbWVudFwiLCBgQ291bGQgbm90IGdldCBlbGVtZW50OiAnJHtxdWVyeX0nYCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtID09IG51bGwpe1xuICAgICAgICAgICAgaWYgKGxvZ21zc2cpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjTm8gZWxlbWVudCBmb3VuZCB3aXRoIGNsYXNzIG5hbWU6ICR7cXVlcnl9LmAsICdjb2xvcjogeWVsbG93OycpO1xuICAgICAgICAgICAgaWYgKCFzdXByZXNzZXhjcHQpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUldCUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50bmFtZX1OdWxsUmVmZXJlbmNlYCwgYEVsZW1lbnQgbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsIChjb21wb25lbnRuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCBjaGVja2VtcHR5c3RyaW5nPzpib29sZWFuLCBsb2dtZXNzYWdlPzpib29sZWFuKSB7XG4gICAgICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFsb2dtZXNzYWdlKSBsb2dtc3NnID0gbG9nbWVzc2FnZTtcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsb2dtc3NnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNObyBsb2NhbCBzdG9yYWdlIGZvciAke2NvbXBvbmVudG5hbWV9LmAsICdjb2xvcjpwdXJwbGU7Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2tlbXB0eXN0cmluZylcbiAgICAgICAgICAgICAgICByZXR1cm4gUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnRuYW1lLCBrZXksIGxvZ21zc2cpO1xuICAgICAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTG9jYWxTdG9yYWdlTnVsbG9yRW1wdHkoY29tcG9uZW50bmFtZTpzdHJpbmcsIGtleTpzdHJpbmcsIGxvZ21lc3NhZ2U/OmJvb2xlYW4pe1xuICAgICAgICBsZXQgbG9nbXNzZzogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGlmICghbG9nbWVzc2FnZSkgbG9nbXNzZyA9IGxvZ21lc3NhZ2U7XG4gICAgICAgIGxldCB0ZXN0OiBzdHJpbmcgfCBudWxsXG4gICAgICAgIFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0ZXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7a2V5fWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciAoYENvdWxkIGdldCBsb2NhbCBzdG9yYWdlIGtleTogJHtrZXl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QgPT0gbnVsbCl7XG4gICAgICAgICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNMb2NhbCBzdG9yYWdlIGtleSBub3QgZm91bmQ6ICR7a2V5fS5gLCAnY29sb3I6IHllbGxvdztmb250LXdlaWdodDpib2xkOycpO1xuICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUldCUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50bmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgS2V5IG5vdCBmb3VuZGApKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXN0ID09IFwiXCIgfHwgdGVzdCA9PVwiW11cIil7XG4gICAgICAgICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNMb2NhbCBzdG9yYWdlIHZhbHVlIGlzIGVtcHR5IGZvciBrZXk6ICR7a2V5fWAsICdjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG5ldyBSV0JSZWZlcmVuY2VFcnJvcihgJHtjb21wb25lbnRuYW1lfVJlZmVyZW5jZUV4Y2VwdGlvbmAsIGBWYWx1ZSBpcyBlbXB0eWApKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcmVmZXJlbmNlIGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUldCUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBSZWZlcmVuY2VFcnJvciB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgcGFnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVmZXJyb3I6IFJlZmVyZW5jZUVycm9yO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5yZWZlcnJvciA9IGVycjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIHJlZmVyZW5jZSBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnJlZDsnLCB0aGlzLnJlZmVycm9yLCAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgIFJXQlJlZmVyZW5jZUVycm9yLmNvdW50Kys7XG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBzeW50YXggZXJyb3IgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBSV0JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzeW5lcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgLy8gbGV0IGVyciA9IG5ldyBSYW5nZUVycm9yKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNIU0wgY29sb3IgdmFsdWUgb3V0IG9mIGFjY2VwdGFibGUgcmFuZ2U6XFxuJW9cXG4lYzwvUldCPmAsIFxuICAgICAgICAvLyAnY29sb3I6Z3JheTtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpncmF5OycsIGVyciwgJ2NvbG9yOmdyYXk7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnN5bmVycm9yID0gZXJyO1xuICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgc3ludGF4IGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLCBcbiAgICAgICAgICAgICdjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6cmVkOycsIHRoaXMuc3luZXJyb3IsICdjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDsnKTtcbiAgICAgICAgUldCU3ludGF4RXJyb3IuY291bnQrKztcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUldCRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgICAvKipDb3VudHMgdGhlIG51bWJlciBvZiBvYmplY3RzIGluc3RhbnRpYXRlZCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdGFjazogYW55O1xuICAgIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkb21lcnJvcjogRE9NRXhjZXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGVycm9yOiBhbnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyb3I7XG4gICAgICAgIHRoaXMucGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5kb21lcnJvciA9IGVycjtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0V4ZWN1dGlvbiBleHBlcmllbmNlZCBhIERPTSBlcnJvcjpcXG4lb1xcbiVjPC9SV0I+YCwgXG4gICAgICAgICAgICAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOnJlZDsnLCB0aGlzLnN0YWNrLCAnY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jyk7XG4gICAgICAgIFJXQkRvbUV4Y2VwdGlvbi5jb3VudCsrO1xuICAgIH07XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IFJXQlN5bnRheEVycm9yIH0gZnJvbSAnLi9SV0JFcnJvckJ1cydcblxuLyoqIEFuIFJXQlBhcnNlSlNPTiBwYXJzZXMganNvbiBhbmQgc3RvcmVzIHRoZSBwYXJzZWQgc3RyaW5nIHdpdGggdGhlIHJlc3VsdC4gKi9cbmV4cG9ydCBjbGFzcyBSV0JQYXJzZUpTT04ge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHBhcnNlc3RyOiBzdHJpbmc7XG4gICAgcHVibGljIHJldHVybm9iajogb2JqZWN0O1xuICAgIHB1YmxpYyBwYXNzZWQ6IGJvb2xlYW47XG4gICAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgICAqIEpTT04gb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcnNlc3RyOnN0cmluZyl7XG4gICAgICAgIFJXQlBhcnNlSlNPTi5jb3VudCsrO1xuICAgICAgICB0aGlzLnBhcnNlc3RyID0gcGFyc2VzdHI7XG4gICAgICAgIHRoaXMucGFzc2VkID0gdGhpcy5SV0JwYXJzZUpTT04oKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBSV0JwYXJzZUpTT04gKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnJldHVybm9iaiA9IEpTT04ucGFyc2UodGhpcy5wYXJzZXN0cik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJub2JqID0gbnVsbDtcbiAgICAgICAgICAgIG5ldyBSV0JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKiBBbiBSV0JQYXJzZUpTT04gdGVzdHMgd2hldGhlciBhbiBvYmplY3QgY2FuIGJlIHN0cmluZ2lmaWVkIGludG8gYSB2YWxpZFxuICoganNvbiBzdHJpbmcuICovXG5leHBvcnQgY2xhc3MgUldCU3RyaW5naWZ5SlNPTiB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUganNvbjogYW55O1xuICAgIHB1YmxpYyByZXR1cm5zdHI6IHN0cmluZztcbiAgICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICAgIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICAgKiBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihqc29uOmFueSl7XG4gICAgICAgIFJXQlN0cmluZ2lmeUpTT04uY291bnQrKztcbiAgICAgICAgdGhpcy5qc29uID0ganNvbjtcbiAgICAgICAgdGhpcy5wYXNzZWQgPSB0aGlzLnBhcnNlSlNPTigpO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHBhcnNlSlNPTiAoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5qc29uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5zdHIgPSBudWxsO1xuICAgICAgICAgICAgbmV3IFJXQlN5bnRheEVycm9yKFwiUGFyc2VFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIEhUTUwgbGluayBlbGVtZW50IGRhdGEuIFVzZWQgd2l0aCBhbmNob3IgdGFncy5cbiAqL1xuY2xhc3MgUldCTGluayB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKkhUTUwgdGl0bGUgYXR0cmlidXRlICovXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgLyoqSW5uZXIgdGV4dCBzdHJpbmcgKi9cbiAgICBwdWJsaWMgaW5uZXJUZXh0OiBzdHJpbmc7XG4gICAgLyoqVGhlIHBhZ2UgdGhlIGxpbmsgaXMgYXNzb2NpYXRlZCB0byAqL1xuICAgIHB1YmxpYyBwYWdlTmFtZTogc3RyaW5nO1xuICAgIC8qKkhUTUwgaHJlZiBhdHRyaWJ1dGUgKi9cbiAgICBwdWJsaWMgaFJlZmVyZW5jZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgaW5uZXJUZXh0OiBzdHJpbmcsIHBhZ2VOYW1lOiBzdHJpbmcsIGhSZWZlcmVuY2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gaW5uZXJUZXh0LFxuICAgICAgICB0aGlzLnBhZ2VOYW1lID0gcGFnZU5hbWUsXG4gICAgICAgIHRoaXMuaFJlZmVyZW5jZSA9IGhSZWZlcmVuY2UsXG4gICAgICAgIFJXQkxpbmsuY291bnQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJXQkxpbms7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBXZWJCaXQgZnJvbSBcIi4vV2ViQml0XCI7XG5pbXBvcnQgUldCQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9SV0JDYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBSYW5kb21XZWJCaXRzIHtcbiAgICBwdWJsaWMgc3RhdGljIGJ1aWxkQ2FyZENvbnRhaW5pbmdTZWN0aW9uKHNlY3Rpb25UaXRsZTogc3RyaW5nLCBzZWN0aW9uSGVhZGluZ0lEOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGRpdmlzb3Igc2VjdGlvbmFsIGVsZW1lbnRzIHRvIGFwcGVuZCB0byBtYWluXG4gICAgICAgIGNvbnN0IHBhZ2VNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gICAgICAgIGlmIChwYWdlTWFpbiAhPSBudWxsICYmIHBhZ2VNYWluLm5vZGVOYW1lID09PSAnTUFJTicpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjYXJkIHNlY3Rpb24gZWxlbWVudHNcbiAgICAgICAgICAgIC8vIDxzZWN0aW9uIGNsYXNzPVwiY2FyZHNcIj5cbiAgICAgICAgICAgIC8vICAgICA8aDI+QXJiaXRyYXJ5IEFydGljbGVzOjwvaDI+XG4gICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzcz1cImNhcmRfY29sdW1uc1wiPlxuXG4gICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAvLyA8L3NlY3Rpb24+XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgY29uc3QgQUFTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICAgICAgICBsZXQgYWFIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIGxldCBhYUNhcmRzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgQUFTZWN0aW9uLmFwcGVuZENoaWxkKGFhSGVhZGluZyk7XG4gICAgICAgICAgICBBQVNlY3Rpb24uYXBwZW5kQ2hpbGQoYWFDYXJkc1NlY3Rpb24pO1xuICAgICAgICAgICAgcGFnZU1haW4uYXBwZW5kKEFBU2VjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgQUFTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc1wiKTtcbiAgICAgICAgICAgIGFhQ2FyZHNTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcmRfY29sdW1ucycsICdjYXJkc2xpZGVzaG93JywgJ2dyaWQnKTtcbiAgICAgICAgICAgIGFhSGVhZGluZy5pbm5lclRleHQgPSBgJHtzZWN0aW9uVGl0bGV9YDtcbiAgICAgICAgICAgIGFhSGVhZGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzZWN0aW9uSGVhZGluZ0lEKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFhQ2FyZHNTZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYWluIGVsZW1lbnQgZXhpc3RzIG9uIHRoZSBwYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGRSV0JDYXJkcyhjYXJkc0RhdGE6IFdlYkJpdFtdKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgZWFjaCBjYXJkIGluIHRoZSBhcnJheS4gQnVpbGQgdGhlIGNhcmQgZWxlbWVudHMgYW5kIGFkZCB0aGUgZGF0YVxuICAgICAgICBsZXQgQUFzID0gY2FyZHNEYXRhLm1hcCgoYXJ0aWNsZTogV2ViQml0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByd2JjYXJkID0gbmV3IFJXQkNhcmQoKTtcbiAgICAgICAgICAgIHJldHVybiByd2JjYXJkLmJ1aWxkUldCQ2FyZE1hcmt1cChhcnRpY2xlKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEFBcztcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RhcnRNYXJrOiBQZXJmb3JtYW5jZU1hcmssXG4gICAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrLFxufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUldCUGVyZiB7XG4gICAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc2NyaXB0cnVudGltZW1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICBzdGFydE1hcms6IG51bGwsXG4gICAgICAgIGVuZE1hcms6IG51bGxcbiAgICB9O1xuXG4gICAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuICovXG4gICAgY29uc3RydWN0b3IoIHNjcmlwdG5hbWU6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWUgPSBzY3JpcHRuYW1lO1xuICAgICAgICB0aGlzLnNjcmlwdHJ1bnRpbWVtYXJrcy5zdGFydE1hcmsgPSBwZXJmb3JtYW5jZS5tYXJrKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9LXN0YXJ0YCk7XG4gICAgICAgIFJXQlBlcmYuY291bnQrKztcbiAgICB9XG5cbiAgICAvKiogQ2FsbCBlbmQoKSB0byBzZXQgdGhlIGVuZCB0aW1lIHN0YW1wLiAqL1xuICAgIHB1YmxpYyBlbmQoKXtcbiAgICAgICAgdGhpcy5zY3JpcHRydW50aW1lbWFya3MuZW5kTWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZX0tZW5kYCk7XG4gICAgICAgIHRoaXMubWVhc3VyZSgpO1xuICAgIH1cblxuICAgIC8qKiBBIGNvbnNvbGUgb3V0cHV0IG9mIHRoaXMgb2JqZWN0J3MgcGVyZm9ybWFuY2UgbWVhc3VyZW1lbnQuICovXG4gICAgcHJpdmF0ZSBtZWFzdXJlKCl7XG4gICAgICAgIGxldCBtZWFzdXJlID0gcGVyZm9ybWFuY2UubWVhc3VyZSggdGhpcy5zY3JpcHRydW50aW1lbWFya3MubmFtZSwgdGhpcy5zY3JpcHRydW50aW1lbWFya3Muc3RhcnRNYXJrLm5hbWUsIHRoaXMuc2NyaXB0cnVudGltZW1hcmtzLmVuZE1hcmsubmFtZSlcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGAke3RoaXMuc2NyaXB0cnVudGltZW1hcmtzLm5hbWV9IGV4ZWN1dGlvbiB0aW1lIGlzOiAke21lYXN1cmUuZHVyYXRpb259YCk7XG4gICAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBUb0RvTGlzdEVsZW1lbnRzIH0gZnJvbSBcIi4vV2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZSB9IGZyb20gXCIuL0xvY2FsU3RvcmFnZUNhY2hlc1wiO1xuaW1wb3J0IHsgUldCUGFyc2VKU09OLCBSV0JTdHJpbmdpZnlKU09OIH0gZnJvbSBcIi4vUldCSlNPTkNvbnZlcnRlclwiO1xuaW1wb3J0IFJXQkVycm9yIGZyb20gXCIuL1JXQkVycm9yQnVzXCI7XG5cbi8qKlxuICogQSBUb0RvTGlzdCBpcyBhbiBIVE1MIHdpZGdldCB0byBzdG9yZSBUby1Eb3MgaW4gdGhlIGJyb3dzZXIuIEluc3RhbnRpYXRlIHRoZVxuICogIFRvRG9MaXN0IGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSB3aWRnZXQgbWFya3VwIGFuZCBmdW5jdGlvbmFsaXR5LiBUby1Eb3MgYXJlXG4gKiAgc3RvcmVkIGluIHRoZSBicm93c2VyJ3MgTG9jYWwgU3RvcmFnZSBhbmQgcmVhZCBhbmQgcmVuZGVyZWQgd2hlbiB0aGUgcGFnZSBsb2Fkcy5cbiAqIFxuICogVG8gY3JlYXRlIGEgVG9Eb0xpc3QsIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2UgbXVzdCBoYXZlICcuVG9Eb0xpc3QnIGNsYXNzLiBDYWxsIHRoZVxuICogIGNsYXNzIGNvbnN0cnVjdG9yLCBwYXNzaW5nIGluIHRoYXQgZWxlbWVudCB0byBjcmVhdGUgdGhlIHdpZGdldC5cbiAqXG4gKiAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG4gKiAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICogXG4gKiBUaGVuLCB0aGUgd2lkZ2V0IGlzIGNyZWF0ZWQgYW5kIFRvLURvcyBhcmUgcmV0cmlldmVkIGZyb20gc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvRG9MaXN0IHtcbiAgICAvKipUb3RhbCBudW1iZXIgb2YgVG9ET3MqL1xuICAgIHB1YmxpYyBzdGF0aWMgVG9ET3M6IG51bWJlciA9IDA7XG4gICAgLyoqV2lkZ2V0IGVsZW1lbnRzIHVzZWQgdG8gcG9wdWxhdGUgdG9kb3MgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gICAgcHJpdmF0ZSBzdGF0aWMgVG9Eb0luU3RvcmFnZTogbG9jYWxzdG9yYWdldG9kb2NhY2hlW107XG4gICAgLyoqVG9kbyBIVE1MIGVsZW1lbnRzICovXG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBUby1EbyBsaXN0IHdpZGdldCdzIGVsZW1lbnRzLlxuICAgICAqIFxuICAgICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAgICogQHBhcmFtIFRvRG9FbGVtZW50cyBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9FbGVtZW50cyA9IFRvRG9FbGVtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICAgKiAgdGhlIGxpc3QgbWFya3VwLCBwYXNzaW5nIGluIGEgcmVmZXJlbmNlIGVsZW1lbnQgZm9yIHBsYWNlbWVudCBvZiB0aGUgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSBlbGVtIC0gd2lkZ2V0IGlzIHBsYWNlZCBhZnRlciB0aGlzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVUb0RvTGlzdFdpZGdldChlbGVtOiBFbGVtZW50KSB7XG4gICAgICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgICAgICAvL0RlcGVuZGVudCBvbiB0aGUgcGFnZSwgdG9kbyB3aWRnZXQgbWF5IGhhdmUgcHJlLWV4aXN0aW5nIG1hcmt1cCBpbiBwbGFjZVxuICAgICAgICAvL1N3aXRjaCBhZ2FpbnN0IHRoZSBjdXJyZW50IHBhZ2UgdG8gZGV0ZXJtaW5lIG1hcmt1cCBuZWVkZWRcbiAgICAgICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWNUaGVyZSBpcyBubyBcIlRvRG9MaXN0XCIgY2xhc3Mgb24gdGhpcyBwYWdlLmAsIFwiY29sb3I6b3JhbmdlO1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiVG9Eb0xpc3RcIikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJUb0RvTGlzdFwiIGNsYXNzIHRvICR7ZWxlbS5ub2RlTmFtZX0gbm9kZS5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnL1JhbmRvbVdlYkJpdHMvJzpcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL2luZGV4Lmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICBjYXNlICcvZGlzdC9pbmRleC5odG1sJzpcbiAgICAgICAgICAgICAgICAvL01hcmt1cCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgcGFnZVxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIHRhYmxlIGVsZW1lbnRzIG5lZWRlZCBmb3IgdGhlIHRvZG8gbGlzdFxuICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHIxID0gdGhlYWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhsZWZ0ID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRobWlkZGxlID0gdHIxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRib2R5ID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGZvb3QgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cjMgPSB0Zm9vdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDNsZWZ0ID0gdHIzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRkM0lOID0gdGQzbGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZDNtaWRkbGUgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgSU5QVVQgPSB0ZDNtaWRkbGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG5cbiAgICAgICAgICAgICAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Zm9vdCcpKTtcbiAgICAgICAgICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgIHRkM0lOLnNldEF0dHJpYnV0ZShcIlZhbHVlXCIsIFwiQWRkXCIpO1xuICAgICAgICAgICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJpdGVtSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgICAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIklucHV0XCIpO1xuICAgICAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiVG8tRG86XCI7XG4gICAgICAgICAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgICAgICAgICAgdGhsZWZ0LnRleHRDb250ZW50ID0gXCJDb21wbGV0ZT9cIjtcbiAgICAgICAgICAgICAgICB0aG1pZGRsZS50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgICAgICB0Ym9keS5pZCA9IFwiVG9Eb0l0ZW1zXCI7XG4gICAgICAgICAgICAgICAgdGQzSU4uaWQgPSBcIkFkZEJ1dHRvblwiO1xuICAgICAgICAgICAgICAgIHRkM0lOLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNhbXBsZVRvX0RvKHRib2R5KTtcblxuICAgICAgICAgICAgICAgIC8vV2l0aCB0aGUgZWxlbWVudHMgY3JlYXRlZCwgc2V0IHRoZSBjbGFzcyBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgY2FzZSAnL3BhZ2VzL3RvZG9zLmh0bWwnOlxuICAgICAgICAgICAgICAgIC8vTWFya3VwIGV4aXN0cyBvbiB0aGUgcGFnZSBhbHJlYWR5XG4gICAgICAgICAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5zZXRUb0RvTGlzdEVsZW1lbnRzKHRoaXMubGlzdEVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIHRvIGRvIGl0ZW0gZHVlIHRvIGNhY2hlIGVtcHR5XG4gICAgICAgICAgICAgICAgY29uc3QgaHRib2R5ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZUJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGh0Ym9keSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVG9Eb0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBpcyBub3QgdmFsaWQuIFBsZWFzZSBlbnN1cmUgYSB2YWxpZCBlbGVtZW50IGZvciBUb0RvIGxpc3Qgd2lkZ2V0IHRvIGZvbGxvdy5cIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdhdGhlciBuZWNlc3NhcnkgZWxlbWVudHMgZnJvbSB0aGUgY3JlYXRlZCB3aWRnZXQuXG4gICAgICogQHJldHVybnMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUb0RvTGlzdEVsZW1lbnRzKCkge1xuICAgICAgICAvL0dhdGhlciBuZWNlc3NhcnkgZWxlbWVudHMgZnJvbSB0aGUgY3JlYXRlZCB3aWRnZXRcbiAgICAgICAgLy9FYWNoIHdpZGdldCBsb2NhdGlvbidzIGVsZW1lbnRzIG1heSB2YXJ5LCBzbyBhIGNhbGwgb2YgZ2V0VG9Eb0xpc3RFbGVtZW50cygpXG4gICAgICAgIC8vbG9jYXRlcyB0aGUgcGFnZSdzIGVsZW1lbnRzIHRvIHBvcHVsYXRlIHRoZSBUb0RvRWxlbWVudHMgaW50ZXJmYWNlLlxuICAgICAgICBsZXQgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzID0ge1xuICAgICAgICAgICAgdG9kb1RhYmxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjVG9ETyB0YWJsZScpLFxuICAgICAgICAgICAgdG9kb1RhYmxlQm9keTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RvRG9JdGVtcycpLFxuICAgICAgICAgICAgYWRkQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWRkQnV0dG9uJyksXG4gICAgICAgICAgICBhZGRJdGVtVG9FbnRlcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIml0ZW1JTlBVVFwiXScpLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdEVsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgVG8tRG8gaXRlbXMgZnJvbSBMb2NhbCBTdG9yYWdlLlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gdHJ1ZSBvciBmYWxzZVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGdldFRvRG9JblN0b3JhZ2UoY2hlY2tlbXB0eXZhbHVlc3RyaW5nOmJvb2xlYW4sIGxvZ21lc3NhZ2U6Ym9vbGVhbikge1xuICAgICAgICBpZiAoUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VFcXVhbE51bGwoXCJUb0RvTGlzdFwiLCBcIlRvRG9zXCIsIGNoZWNrZW1wdHl2YWx1ZXN0cmluZywgbG9nbWVzc2FnZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJzZXN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdUb0RvcycpO1xuICAgICAgICBsZXQgcGFyc2V0ZXN0ID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCUGFyc2VKU09OKHBhcnNlc3RyKSk7XG4gICAgICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCl7XG4gICAgICAgICAgICAvL3BhcnNlZCBKU09OIGlzIG1hbGZvcm1lZFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1RvRG9zJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogVG9Eb3NgLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6b3JhbmdlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOm9yYW5nZTtmb250LXNpemU6MTZweDsnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuVG9Eb0luU3RvcmFnZSA9IHBhcnNldGVzdC5yZXR1cm5vYmpcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS4gXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGR0b0RvVG9TdG9yYWdlKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgLy9BZGQgdGhlIFRvRG9zIGFycmF5IHRvIGxvY2FsIGNhY2hlLlxuICAgICAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgICAgICBsZXQgVG9EbzogbG9jYWxzdG9yYWdldG9kb2NhY2hlID0ge1xuICAgICAgICAgICAgaW5DYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB0b2RvaXRlbTogZGVzY3JpcHRpb24sXG4gICAgICAgIH1cbiAgICAgICAgbGV0IFRvRG9zOiBhbnkgPSBbXTsgLy9Ub0RvIGFycmF5XG4gICAgICAgIGxldCBzdHJnZnk7XG5cbiAgICAgICAgY29uc3Qgc3RyaW5naWZ5dG9kbyA9ICh0b2Rvc3RyOmFueSkgPT4ge1xuICAgICAgICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgICAgICAgIGxldCB0b2Rvc3N0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHRvZG9zdHIpKTtcbiAgICAgICAgICAgIGlmICghdG9kb3NzdHJnZnl0ZXN0LnBhc3NlZCl7XG4gICAgICAgICAgICAgICAgLy9MT0dMRUFGXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvZG9zc3RyZ2Z5dGVzdC5yZXR1cm5zdHI7XG4gICAgICAgIH1cbiAgICAgICAgLy9GaXJzdCwgcmVhZCBjdXJyZW50IExvY2FsIFN0b3JhZ2UgVG9Eb3NcbiAgICAgICAgbGV0IHRvZG9zc3RvcmFnZWNhY2hlID0gVG9Eb0xpc3QuZ2V0VG9Eb0luU3RvcmFnZShmYWxzZSwgZmFsc2UpO1xuICAgICAgICBpZiAodG9kb3NzdG9yYWdlY2FjaGUpe1xuICAgICAgICAgICAgVG9Eb3MgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlO1xuICAgICAgICAgICAgVG9Eb3MucHVzaChUb0RvKTtcbiAgICAgICAgICAgIC8vQ2FsbCBSV0JTdHJpbmdpZnlKU09OIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0XG4gICAgICAgICAgICBzdHJnZnkgPSBzdHJpbmdpZnl0b2RvKFRvRG9zKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIHN0cmdmeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBUb0Rvcy5wdXNoKFRvRG8pO1xuICAgICAgICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgICAgICAgIHN0cmdmeSA9IHN0cmluZ2lmeXRvZG8oVG9Eb3MpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RvRG9zJywgc3RyZ2Z5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIGNhY2hlIGtleTogVG9Eb3NgLCBcbiAgICAgICAgICAgICAgICAnY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNBZGRlZCB0by1kbyBjYWNoZTogJHtkZXNjcmlwdGlvbn1gLCAnY29sb3I6Y3lhbjtmb250LXdlaWdodDpib2xkOycsICdjb2xvcjpjeWFuOycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICAgKiAgcHVsbGVkIGluZGl2aWR1YWxseSBmcm9tIHRoZSBrZXktdmFsdWUgcGFpciBvYmplY3QuXG4gICAgICogQHBhcmFtIGl0ZW0gLSB0aGUgVG8tRG8gaXRlbSByZXF1ZXN0ZWQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmV0b0RvRnJvbVN0b3JhZ2UoaXRlbTogc3RyaW5nKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcigodG9kbykgPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNEZWxldGVkIHRvZG8gY2FjaGU6ICR7aXRlbX1gLCAnY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6ZGFya2N5YW47Jyk7XG4gICAgICAgIGxldCB0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZSkpO1xuICAgICAgICBpZighdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QucGFzc2VkKXtcbiAgICAgICAgICAgIC8vTE9HTEVBRlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBqc29uc3RyID0gdG9kb2luc3RvcmFnZXN0cmdmeXRlc3QucmV0dXJuc3RyO1xuICAgICAgICBpZiAoanNvbnN0ciA9PSBcIlwiIHx8IGpzb25zdHIgPT0gXCJbXVwiKXtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdUb0RvcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCwgXG4gICAgICAgICAgICAgICAgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OmJvbGQ7JywgJ2NvbG9yOmRhcmtjeWFuO2ZvbnQtc2l6ZToxNnB4OycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdUb0RvcycsIGpzb25zdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgbmVjZXNzYXJ5IG1hcmt1cCB0byBhZGQgYSByb3cgdG8gdGhlIFRvLURvIHRhYmxlLlxuICAgICAqICBBIHJvdyBjb25zaXN0cyBvZiB0aHJlZSBjb2x1bW5zOiBhIGNvbXBsZXRlIHRpY2stYm94LCBhIGRlc2NyaXB0aW9uLCBhbmQgYSBkZWxldGUgYnV0dG9uLlxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiAtIFVzZXIgZm9ybSBpbnB1dCB0byBhZGQgYXMgYSBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcGFyYW0gZmlyc3RQYWludCAtIEJvb2xlYW4gdmFsdWUgdXNlZCBieSBhZGRpbmcgbGlzdCBzdG9yYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBBZGRUb0RvUm93KGRlc2NyaXB0aW9uOiBzdHJpbmcsIGZpcnN0UGFpbnQ6IGJvb2xlYW4pIHtcbiAgICAgICAgLy9DcmVhdGUgYSB0YWJsZSByb3cgd2l0aCBjaGVja2JveCBhbmQgZGVsZXRlIG9wdGlvbnNcbiAgICAgICAgY29uc3QgVEFCTEVJVEVNID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICAgICAgY29uc3QgdGFibGVGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCBuZXdSb3cgPSB0YWJsZUZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7IC8vQWRkIHJvd1xuICAgICAgICBjb25zdCBmaXJzdENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgICAgIGNvbnN0IGNoZWNrQk9YID0gZmlyc3RDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7IC8vQWRkIGNoZWNrYm94XG4gICAgICAgIGNvbnN0IG5ld0lURU0gPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7IC8vVGFibGUgc2Vjb25kIGRhdGFcbiAgICAgICAgY29uc3Qgc2Vjb25kQ09MID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICAgICAgY29uc3QgZGVsQk9YID0gc2Vjb25kQ09MLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpIC8vQWRkIGRlbGV0ZWJveFxuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICAgICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0NoZWNrYm94Jyk7XG4gICAgICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdEZWxldGUnKTtcbiAgICAgICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoJ251bScsIFRvRG9MaXN0LlRvRE9zID8gKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI1RvRE8gdGRbbnVtXScpO1xuICAgICAgICAgICAgcmV0dXJuICgoTnVtYmVyKGVsZW0/LmdldEF0dHJpYnV0ZShcIm51bVwiKSkgfHwgLTEwMDApICsgVG9Eb0xpc3QuVG9ET3MpLnRvU3RyaW5nKCk7XG4gICAgICAgIH0pKCkgOiAoMSkudG9TdHJpbmcoKSk7XG4gICAgICAgIG5ld0lURU0udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjsgLy9Qb3B1bGF0ZSBzZWNvbmQgY29sXG4gICAgICAgIFRvRG9MaXN0LlRvRE9zKys7IC8vTnVtYmVyIG9mIEl0ZW1zXG4gICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ0RlbGV0ZScpO1xuXG4gICAgICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAgICAgICAvL0FkZCB0byBsaXN0IHN0b3JhZ2VcbiAgICAgICAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FkZCB0aGUgcm93IHRvIHRoZSBUb0RvcyB0YWJsZVxuICAgICAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcbiAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gdGFibGUgcm93YCwgJ2NvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z29sZDsnKTtcblxuICAgICAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgICAgIGRlbEJPWC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBcbiAgICAgICAgICAgIHRoaXMuRGVsZXRlQnV0dG9uKGRlbEJPWCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSB0aGUgVG8tRG8gaXRlbSByb3dzIGZyb20gVG8tRG9zIHN0b3JlZCBpbiB0aGUgYnJvd3NlciBMb2NhbCBTdG9yYWdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVUb0RvTGlzdCgpIHtcbiAgICAgICAgaWYgKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UodHJ1ZSwgZmFsc2UpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZVtpXS50b2RvaXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGJ1dHRvbiBmdW5jdGlvbmFsaXR5LlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBBRERCVVRUT04gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkQnV0dG9uO1xuICAgICAgICBjb25zdCBBRERJVEVNRU5URVIgPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMuYWRkSXRlbVRvRW50ZXI7XG4gICAgICAgIGlmIChBRERCVVRUT04gPT0gbnVsbCAmJiBBRERJVEVNRU5URVIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqQWRkIGlucHV0IHRleHQgdG8gdGhlIHRvZG8gbGlzdCBmcm9tIGNsaWNraW5nIHRoZSBhZGQgYnV0dG9uKi9cbiAgICAgICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgLyoqQWRkIGlucHV0IHRleHQgdG8gdGhlIHRvZG8gbGlzdCB3aGVuIHVzaW5nIGtleSBlbnRlciovXG4gICAgICAgIEFERElURU1FTlRFUi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5BZGRUb0RvUm93KEFERElURU1FTlRFUi52YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZ1bmN0aW9uIGRldGVybWluaW5nIHRoZSBkZWxldGUgYnV0dG9uLiBJdGVtcyBhcmUgZGVsZXRlZCB3aGVuIHB1c2hlZCwgYnV0IGFyZVxuICAgICAqICBub3QgcmVtb3ZlZCBmcm9tIHN0b3JhZ2Ugd2l0aG91dCAnQ29tcGxldGU/JyBjaGVja2Vib3ggY2hlY2tlZC5cbiAgICAgKiBAcGFyYW0gYm94IGlucHV0IGVsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIERlbGV0ZUJ1dHRvbihib3g6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGJveC5wYXJlbnROb2RlID09IG51bGwgfHwgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nID09IG51bGwgfHxcbiAgICAgICAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYSB0YWJsZSBlbGVtZW50LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3dDaGtCeCA9IDxIVE1MRWxlbWVudD5ib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAvKiogSW5wdXQgZWxlbWVudCAqL1xuICAgICAgICBjb25zdCByb3dDaGtCeElOID0gPEhUTUxJbnB1dEVsZW1lbnQ+cm93Q2hrQnguY2hpbGROb2Rlc1swXTsgXG4gICAgICAgIGNvbnN0IHRvZG9UYWJsZTogSFRNTFRhYmxlRWxlbWVudCA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy50b2RvVGFibGU7XG4gICAgICAgIGNvbnN0IHRyOiBIVE1MVGFibGVSb3dFbGVtZW50ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+Ym94LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbGV0IGkgPSB0ci5yb3dJbmRleDtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgIGlmIChyb3dDaGtCeElOLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIC8vcmVtb3ZlIHJvdyBzaW5jZSBjb21wbGV0ZWRcbiAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjRGVsZXRlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z29sZGVucm9kOycpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9ICdBZGQgYSBUb0RPIEl0ZW0uJykge1xuICAgICAgICAgICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG5cbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSBhc3NvY2lhdGVkIHN0b3JhZ2UgaXRlbVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZldG9Eb0Zyb21TdG9yYWdlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvZG9UYWJsZS5kZWxldGVSb3coaSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJWM8UldCPiVjUmVtb3ZlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6Z29sZGVucm9kOycpO1xuICAgICAgICAgICAgVG9Eb0xpc3QuVG9ET3MtLTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIHNlZWQgdGhlIFRvLURvIExpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gTG9jYWwgU3RvcmFnZSBpdGVtc1xuICAgICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gdGJvZHkgdGFibGUgYm9keSBlbGVtZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgICAgICBpZihUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKGZhbHNlLCB0cnVlKSkgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vQ3JlYXRlIGEgc2FtcGxlIGVudHJ5IGluIHRoZSBUb0RvIHRhYmxlIGFzIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgY29uc3QgdHIyID0gdGJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gICAgICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgIGNvbnN0IHRkMklOID0gdGQybGVmdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcbiAgICAgICAgY29uc3QgdGQybWlkZGxlID0gdHIyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgY29uc3QgdGQyREVMID0gdGQycmlnaHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG5cbiAgICAgICAgLy9BZGQgYXR0cmlidXRlcyBhbmQgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDaGVja2JveFwiKTtcbiAgICAgICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgICAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiRGVsZXRlXCIpO1xuICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInJlc2V0XCIpO1xuICAgICAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG4gICAgICAgIHRkMklOLnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIHRkMm1pZGRsZS50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG9ETyBJdGVtLlwiO1xuICAgICAgICBUb0RvTGlzdC5Ub0RPcysrO1xuXG4gICAgICAgIC8vXCJEZWxldGVcIiBldmVudCBsaXN0ZW5lclxuICAgICAgICB0ZDJERUwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjPFJXQj4lY1JlbW92ZWQgdG9kbzogJHt0ZDJERUwucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsIFxuICAgICAgICAgICAgICAgICdjb2xvcjpwdXJwbGU7Zm9udC13ZWlnaHQ6Ym9sZDsnLCAnY29sb3I6cHVycGxlOycpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCBBdHRyaWJ1dGlvbkxpbmsgZnJvbSBcIi4vQXR0cmlidXRpb25MaW5rXCI7XG4vKipcbiAqIFRoaXMgY2xhc3MgaG9sZHMgdGhlIGRhdGEgZm9yICdXZWJCaXQnIGFydGljbGUgY2FyZHMuIEtleSBpbmZvcm1hdGlvblxuICogb2YgdGhlIGFydGljbGUncyBjb250ZW50cyBhcmUgY29udGFpbmVkOiBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0YSBjcmVhdGVkLFxuICogZXRjLlxuICovXG5jbGFzcyBXZWJCaXQge1xuICAgIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gICAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgYXJ0aWNsZU51bWJlcjogbnVtYmVyO1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHVibGljIGRhdGVDcmVhdGVkOiBEYXRlO1xuICAgIHB1YmxpYyBhcnRpY2xlTGluazogc3RyaW5nO1xuICAgIHB1YmxpYyBjYXJkSW1hZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgY2FyZEltYWdlQUxUOiBzdHJpbmc7XG4gICAgcHVibGljIGxpbmtBdHRyaWJ1dGlvbjogQXR0cmlidXRpb25MaW5rO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFydGljbGVOdW1iZXI6IG51bWJlcixcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICAgICBkYXRlQ3JlYXRlZDogRGF0ZSxcbiAgICAgICAgYXJ0aWNsZUxpbms6IHN0cmluZyxcbiAgICAgICAgY2FyZEltYWdlOiBzdHJpbmcsXG4gICAgICAgIGNhcmRJbWFnZUFMVDogc3RyaW5nLFxuICAgICAgICBsaW5rQXR0cmlidXRpb24/OiBBdHRyaWJ1dGlvbkxpbmssXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcnRpY2xlTnVtYmVyID0gYXJ0aWNsZU51bWJlcjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmRhdGVDcmVhdGVkID0gZGF0ZUNyZWF0ZWQ7XG4gICAgICAgIHRoaXMuYXJ0aWNsZUxpbmsgPSBhcnRpY2xlTGluaztcbiAgICAgICAgdGhpcy5jYXJkSW1hZ2UgPSBjYXJkSW1hZ2U7XG4gICAgICAgIHRoaXMuY2FyZEltYWdlQUxUID0gY2FyZEltYWdlQUxUO1xuICAgICAgICB0aGlzLmxpbmtBdHRyaWJ1dGlvbiA9IGxpbmtBdHRyaWJ1dGlvbjtcbiAgICAgICAgV2ViQml0LmNvdW50Kys7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJCaXQ7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIGNsaWVudHtcbiAgICBvbGRVUkwgPSBkb2N1bWVudC5yZWZlcnJlcjtcbiAgICBicm93c2VycGxhdGZvcm06IHN0cmluZztcbiAgICB1c2VyYWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBjb25uZWN0aW9udHlwZTtcbiAgICBjb25uZWN0aW9ucnR0O1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5icm93c2VycGxhdGZvcm0gPSB0aGlzLnNldGJyb3dzZXJwbGF0Zm9ybSgpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb250eXBlID0gdGhpcy5zZXRjb25uZWN0aW9udHlwZSgpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25ydHQgPSB0aGlzLnNldGNvbm5lY3Rpb25ydHQoKTtcbiAgICB9XG5cbiAgICBzZXRicm93c2VycGxhdGZvcm0oKSB7XG4gICAgICAgIGlmIChcInVzZXJBZ2VudERhdGFcIiBpbiB3aW5kb3cubmF2aWdhdG9yKXtcbiAgICAgICAgICAgIC8vdXNlckFnZW50RGF0YSBpcyBOYXZpZ2F0b3JVQURhdGEgdHlwZSwgbm90IGZvdW5kIGluIFR5cGVTY3JpcHQuIFxuICAgICAgICAgICAgLy9Lbm93biB0byBFZGdlIGJyb3dzZXI6IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpXG4gICAgICAgICAgICBsZXQgdXNlckFnZW50RGF0YTogYW55ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnREYXRhIGFzIG9iamVjdDtcbiAgICAgICAgICAgIGxldCBwbGF0Zm9ybWRhdGE6IHN0cmluZyA9IDxzdHJpbmc+dXNlckFnZW50RGF0YS5wbGF0Zm9ybTtcbiAgICAgICAgICAgIHJldHVybiBwbGF0Zm9ybWRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5icm93c2VycGxhdGZvcm0gPSBcIlwiO1xuICAgIH1cblxuICAgIHNldGNvbm5lY3Rpb250eXBlKCkge1xuICAgICAgICBpZiAoXCJjb25uZWN0aW9uXCIgaW4gd2luZG93Lm5hdmlnYXRvcil7XG4gICAgICAgICAgICAvL2Nvbm5lY3Rpb24gaXMgTmV0d29ya0luZm9ybWF0aW9uIHR5cGUsIG5vdCBmb3VuZCBpbiBUeXBlU2NyaXB0LlxuICAgICAgICAgICAgLy9Lbm93biB0byBFZGdlIGJyb3dzZXI6IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24pXG4gICAgICAgICAgICBsZXQgY29ubmVjdGlvbjphbnkgPSB3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24gYXMgb2JqZWN0XG4gICAgICAgICAgICBsZXQgZWZmZWN0aXZldHlwZTpzdHJpbmcgPSA8c3RyaW5nPmNvbm5lY3Rpb24uZWZmZWN0aXZlVHlwZTtcbiAgICAgICAgICAgIHJldHVybiBlZmZlY3RpdmV0eXBlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbnR5cGUgPSBcIlwiO1xuICAgIH1cblxuICAgIHNldGNvbm5lY3Rpb25ydHQoKSB7XG4gICAgICAgIGlmIChcImNvbm5lY3Rpb25cIiBpbiB3aW5kb3cubmF2aWdhdG9yKXtcbiAgICAgICAgICAgIGxldCBjb25uZWN0aW9uOmFueSA9IHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbiBhcyBvYmplY3RcbiAgICAgICAgICAgIGxldCBydHQ6c3RyaW5nID0gPHN0cmluZz5jb25uZWN0aW9uLnJ0dDtcbiAgICAgICAgICAgIHJldHVybiBydHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9ucnR0ID0gXCJcIjtcbiAgICB9XG59Il19

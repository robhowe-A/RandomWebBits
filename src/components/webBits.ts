//--Copyright (c) 2023 Robert A. Howell
import WEBBITDATA from "../data/data";
import RandomWebBits from "../models/randomWebBits";
import CardsSlideShow from "../models/cardsSlideShow";

class Accordion {
  public accordionElements = new Map<HTMLDivElement, boolean>();
  constructor(accordionnodes: NodeListOf<HTMLDivElement>) {
    for (let card of accordionnodes) {
      this.accordionElements.set(card, false);
    }
  }
}

/**
 * Card widget to initialize article data into HTML card elements. This widget
 * creates multiple sections of cards to add to a page.
 */
const RWBCardsWidget = {
  addCardSectionClass: (cards: HTMLDivElement[] | HTMLDivElement, cls: string) => {
    if (Array.isArray(cards)) {
      // cards is an array of cards; append class to all cards
      for (let card of cards) {
        card.classList.add(`${cls}`);
      }
    }
    if (!Array.isArray(cards)) {
      // cards is an element; append class to the element
      cards.classList.add(`${cls}`);
    }
  },
  buildRandomWebBits: (page?: string) => {
    let ArbitraryArticles: RandomWebBits;
    let GuideShorts: RandomWebBits;
    let ExploretheWeb: RandomWebBits;

    switch (page) {
      case "Home":
        enum CardContainerType {
          Slideshow = "slideshow",
          Accordion = "accordion",
        }
        // Split the cards arrays into their respective category
        ArbitraryArticles = new RandomWebBits(
          RandomWebBits.buildCardContainingSection(
            "Arbitrary Articles:",
            "ArbitraryArticles",
            CardContainerType.Slideshow
          ),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );

        GuideShorts = new RandomWebBits(
          RandomWebBits.buildCardContainingSection(
            "Guide Shorts:",
            "GuideShorts",
            CardContainerType.Accordion
          ),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );

        ExploretheWeb = new RandomWebBits(
          RandomWebBits.buildCardContainingSection("Explore the Web:", "ExploretheWeb"),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );
        break;
      default:
        // Split the cards arrays into their respective category
        ArbitraryArticles = new RandomWebBits(
          RandomWebBits.buildCardContainingSection("Arbitrary Articles:", "ArbitraryArticles"),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );

        GuideShorts = new RandomWebBits(
          RandomWebBits.buildCardContainingSection("Guide Shorts:", "GuideShorts"),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );

        ExploretheWeb = new RandomWebBits(
          RandomWebBits.buildCardContainingSection("Explore the Web:", "ExploretheWeb"),
          RandomWebBits.buildRWBCards(WEBBITDATA.shift())
        );
        break;
    }

    /** Multiple categories of card data exist. This array holds the markup needed
     * to create category sections divisions when placed on a page.
     */
    const cardsSections: HTMLDivElement[] = [
      ArbitraryArticles.cardsSection,
      GuideShorts.cardsSection,
      ExploretheWeb.cardsSection,
    ];

    // Create an array of card data + attribution link data
    // WEBBITDATA broken into 3 arrays: Pages (or articles), Guides, and Explores
    /**This array holds the markup of card elements. Each index stores the cards' data
     * for one category of articles. */
    const cardsData: any = [ArbitraryArticles.cardsData, GuideShorts.cardsData, ExploretheWeb.cardsData];
    const RWB = [cardsSections, cardsData];

    return RWB;
  },
  /** Cards initialization function. This function breaks down the data structure in
   * order to formulate the article details into one card for each article data.
   *
   * Articles have different categories, so each category must be respected.
   * */
  init: () => {
    let RWBSectionCards: any;
    // Routes -> Add widget and format pages
    // Index (Home) page shortens each sections' card count and randomizes
    if (
      window.location.pathname == "/index.html" ||
      window.location.pathname == "/" ||
      window.location.pathname == "/RandomWebBits/index.html" ||
      window.location.pathname == "/RandomWebBits/" ||
      window.location.pathname == "/dist/index.html"
    ) {
      //Build RWB Sections + card slideshow, accordian
      RWBSectionCards = RWBCardsWidget.buildRandomWebBits("Home");

      // Apply classes to cards relevant of the container type
      RWBCardsWidget.addCardSectionClass(RWBSectionCards[1][0], "slide");
      RWBCardsWidget.addCardSectionClass(RWBSectionCards[1][1], "accordionslide");

      //Randomize the cards in the slideshow section
      RWBCardsWidget.randomizeWebBits(RWBSectionCards[1]);

      //Add introduction section and append to main
      RWBSectionCards[0].unshift(RandomWebBits.buildRWBIntroduction());
      const main = document.querySelector("main");
      main.prepend(RWBSectionCards[0].shift());
    } else {
      //Build RWB Sections + cards as default
      RWBSectionCards = RWBCardsWidget.buildRandomWebBits();
    }

    // Add the cards to the page by combining rwb[1] (the cards) to rwb[0] (the section elements)
    // Outer loop: iterate each category, respectively: Pages, Guides, Explores
    for (let i = 0; i < RWBSectionCards[0].length; i++) {
      if (RWBSectionCards[0][i] != undefined) {
        // Inner loop: iterate through the category data
        // From the cards stack, append each to section
        RWBSectionCards[1].shift().forEach((article: any) => {
          RWBSectionCards[0][i].append(article);
        });
      } else {
        console.debug("There's an error in the data.");
      }
    }
  },
  randomizeWebBits(cardsArticles: any) {
    /** Randomize the order of cards. */
    const getMultipleRandom = (arr: any, num: number) => {
      // randomize the array
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num); // return the requested number of elements
    };
    cardsArticles[0] = getMultipleRandom(cardsArticles[0], cardsArticles[0].length); //randomize all pages
    cardsArticles[1] = getMultipleRandom(cardsArticles[1], 8); //randomly select 3 guides
  },
};

const WebBitsAccordion = {
  addCardAccordionStyles: (cardaccordion: Accordion, screenSize: string) => {
    cardaccordion.accordionElements.forEach((isOpen, card) => {
      card.style.removeProperty("flexDirection");
      card.style.setProperty("max-width", "900px");
      card.style.setProperty("margin", "0");
      card.style.setProperty("height", "100px");
      card.style.setProperty("overflow", "hidden");
      //hide the 'Flaticon' links

      for (let inner of card.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.width = "50%";
      }
      //card body attr style
      let attrlink = card.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.top = "55px";
      attrlink.style.right = "100%";

      if (screenSize == "SMALL") {
        //card image style
        let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
        image.style.setProperty("max-height", "200px");
        image.style.setProperty("max-width", "200px");

        //card image small style
        let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
        imageSmall.style.setProperty("max-height", "100px");
        imageSmall.style.setProperty("max-width", "100px");

        //card back para style
        let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2] as HTMLImageElement;
        imagePara.style.setProperty("margin", "0");
        imagePara.style.setProperty("font-size", "16px");
      }
      if (screenSize == "MEDIUM") {
        //card image style
        let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
        image.style.setProperty("max-height", "275px");
        image.style.setProperty("max-width", "275px");

        //card image small style
        let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
        imageSmall.style.setProperty("max-height", "100px");
        imageSmall.style.setProperty("max-width", "100px");
      }
      let pagelink = card.childNodes[1].childNodes[2] as HTMLAnchorElement;

      //add click event
      card.addEventListener("click", e => {
        if (e.target == attrlink || e.target == pagelink)
        return
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };

        const open = () => {
          card.style.setProperty("height", "275px");
          isOpen = true;
        };
        isOpen ? close() : open();
      });
      //add focus event
      let sitelink = card.childNodes[1].childNodes[2] as HTMLAnchorElement;
      sitelink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          card.style.setProperty("height", "275px");
          isOpen = true;
        };
        open();
      });
      sitelink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          card.style.setProperty("height", "275px");
          isOpen = true;
        };
        open();
      });
    });
  },
  init: () => {
    const accordionContainer = document.querySelector(".cardaccordion") as HTMLDivElement;
    accordionContainer.style.maxWidth = "75em";
    //create accordion card map state
    const cardaccordion = document.querySelectorAll(
      ".cardaccordion .accordionslide"
    ) as NodeListOf<HTMLDivElement>;

    let accordion = Object.create(new Accordion(cardaccordion));

    if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
      WebBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
    } else if (window.matchMedia("(min-width: 769px)").matches) {
      WebBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
    }

    window.addEventListener("resize", e => {
      e.preventDefault();
      if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
        WebBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
      }
      if (window.matchMedia("(min-width: 769px)").matches) {
        WebBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
      }
      if (window.matchMedia("(max-width: 500px)").matches) {
        WebBitsAccordion.removeCardAccorionStyles(accordion);
      }
    });
  },
  removeCardAccorionStyles: (cardaccordion: Accordion) => {
    cardaccordion.accordionElements.forEach((isOpen, card) => {
      card.style.setProperty("flexDirection", "column");
      card.style.removeProperty("height");

      card.style.removeProperty("max-width");
      card.style.removeProperty("margin");
      card.style.removeProperty("overflow");
      card.removeAttribute("style");

      //card body attr style
      let attrlink = card.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.removeProperty("top");
      attrlink.style.removeProperty("right");
      attrlink.removeAttribute("style");

      //card image style
      let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
      image.style.removeProperty("max-height");
      image.style.removeProperty("max-width");

      //card image small style
      let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
      imageSmall.style.removeProperty("max-height");
      imageSmall.style.removeProperty("max-width");

      //card back para style
      let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2] as HTMLImageElement;
      imagePara.style.removeProperty("margin");
      imagePara.style.removeProperty("font-size");

      for (let inner of card.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.removeProperty("width");
        innerelem.removeAttribute("style");
      }
      card.replaceWith(card.cloneNode(true));
    });
  },
};

const WebBitsSlideShow = {
  init: () => {
    if (window.location.pathname == "/pages.html") return;
    let cards = document.querySelectorAll(".cardslideshow .slide") as NodeListOf<HTMLDivElement>;
    var small = window.matchMedia("(max-width: 819px)");
    var tablet = window.matchMedia("(min-width: 820px) and (max-width: 1090px)");

    //Implement slideshow for section articles
    let slideshow: CardsSlideShow;
    let slideshowmed: CardsSlideShow;
    let slideshowlarge: CardsSlideShow;
    let currentslideshow: CardsSlideShow;

    //Based on the matched media size, create a small, medium, or large slideshow
    if (small.matches) {
      slideshow = new CardsSlideShow(cards, 1, "SMALL");
      currentslideshow = slideshow;
    } else if (tablet.matches) {
      slideshowmed = new CardsSlideShow(cards, 2, "MEDIUM");
      currentslideshow = slideshowmed;
    } else {
      slideshowlarge = new CardsSlideShow(cards, 3, "LARGE");
      currentslideshow = slideshowlarge;
    }
    window.addEventListener("resize", e => {
      e.preventDefault();
      let slideshowsmall = document.querySelector(".slidescontainer.SMALL");
      let slideshowmedium = document.querySelector(".slidescontainer.MEDIUM");
      let slideshowlarge = document.querySelector(".slidescontainer.LARGE");

      if (window.matchMedia("(max-width: 819px)").matches) {
        if (slideshowmedium != null) {
          slideshowmedium.remove();
          console.debug(`Removed med slideshow ${slideshowmedium}`);
        }
        if (slideshowlarge != null) {
          slideshowlarge.remove();
          console.debug(`Removed large slideshow ${slideshowlarge}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(cards, 1, "SMALL");
        currentslideshow.onResizeShowStartingElems();
      }
      if (window.matchMedia("(min-width: 820px) and (max-width: 1090px)").matches) {
        if (slideshowsmall != null) {
          slideshowsmall.remove();
          console.debug(`Removed small slideshow ${slideshowsmall}`);
        }
        if (slideshowlarge != null) {
          slideshowlarge.remove();
          console.debug(`Removed large slideshow ${slideshowlarge}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(cards, 2, "MEDIUM");
        currentslideshow.onResizeShowStartingElems();
      }
      if (window.matchMedia("(min-width: 1091px)").matches) {
        if (slideshowsmall != null) {
          slideshowsmall.remove();
          console.debug(`Removed small element ${slideshowsmall}`);
        }
        if (slideshowmedium != null) {
          slideshowmedium.remove();
          console.debug(`Removed medium element ${slideshowmedium}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(cards, 3, "LARGE");
        currentslideshow.onResizeShowStartingElems();
      }
    });
  },
};

export {RWBCardsWidget, WebBitsAccordion, WebBitsSlideShow};

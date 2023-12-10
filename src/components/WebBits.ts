//--Copyright (c) 2023 Robert A. Howell
import WEBBITDATA from "../data/data";
import { RandomWebBits } from "../models/RandomWebBits";

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

export default RWBCardsWidget;

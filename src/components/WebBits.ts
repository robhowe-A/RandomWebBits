//--Copyright (c) 2023 Robert A. Howell
import WEBBITDATA from "../data/data"
import { RandomWebBits } from "../models/RandomWebBits"

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
        let cardsSection: HTMLDivElement[] = [
            RandomWebBits.buildCardContainingSection("Arbitrary Articles:", "ArbitraryArticles"),
            RandomWebBits.buildCardContainingSection("Guide Shorts:", "GuideShorts"),
            RandomWebBits.buildCardContainingSection("Explore the Web:", "ExploretheWeb"),
        ];

        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores
        /**This array holds the markup of card elements. Each index stores the cards' data
         * for one category of articles. */ 
        let cardsArticles: any = [
            RandomWebBits.buildRWBCards(WEBBITDATA.shift()),
            RandomWebBits.buildRWBCards(WEBBITDATA.shift()),
            RandomWebBits.buildRWBCards(WEBBITDATA.shift()),
        ];

        
        // Routes -> Add widget and format pages
        // Index (Home) page shortens each section to 3 articles only
        if (window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/RandomWebBits/' ||
            window.location.pathname == '/dist/index.html') {
                /** Randomize the order of cards. */
            const getMultipleRandom = (arr: any, num: number) => {
                // randomize the array
                const shuffled = [...arr].sort(() => 0.5 - Math.random());

                return shuffled.slice(0, num); // return the requested number of elements
            }
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 5);
            cardsArticles[1] = getMultipleRandom(cardsArticles[1], 3);
        }

        // Add the cards to the page by deconstruction and addition
        // Outer loop: iterate the data to each respective category: Pages, Guides, Explores
        for (let i = 0; i < cardsSection.length; i++) {
            if (cardsSection[i] != undefined) {
                // Inner loop: iterate through the category data
                // From the cards stack, append each to section
                cardsArticles.shift().forEach((article: any) => {
                    cardsSection[i].append(article);
                });
            }
            else {
                console.log("There's an error.")
            }
        }
    }
}

export default RWBCardsWidget

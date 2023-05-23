//--Copyright (c) 2023 Robert A. Howell
import WEBBITDATA from "../lib/data"
import { RandomWebBits } from "../models/RandomWebBits"

const RWBCardsWidget = {
    init: () => {
        // Split the cards arrays into their respective category
        let cardsSection: HTMLDivElement[] = [
            RandomWebBits.buildCardContainingSection("Arbitrary Articles:")!,
            RandomWebBits.buildCardContainingSection("Guide Shorts:")!,
            RandomWebBits.buildCardContainingSection("Exlore the Web:")!,
        ];

        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores 
        let cardsArticles: any = [
            RandomWebBits.buildArticleCards(WEBBITDATA.shift()),
            RandomWebBits.buildArticleCards(WEBBITDATA.shift()),
            RandomWebBits.buildArticleCards(WEBBITDATA.shift()),
        ];

        // Routes -> Add widget and format pages
        // Index (Home) page shortens each section to 3 articles only
        if (window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/RandomWebBits/' ||
            window.location.pathname == '/dist/index.html') {
            const getMultipleRandom = (arr: any, num: number) => {
                // randomize the array
                const shuffled = [...arr].sort(() => 0.5 - Math.random());

                return shuffled.slice(0, num); // return the requested number of elements
            }
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 3);
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
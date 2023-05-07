//--Copyright (c) Robert A. Howell
import AttributionLink from "./AttributionLink";
import WebBit from "./WebBit";
import WEBBITDATA from "../lib/data"
import RWBCard from "./RWBcards"

class RandomWebBits {
    public static buildCardContainingSection(name: string) {
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
            aaHeading.innerText = `${name}`;

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
    public static buildArticleCards(cardsData: WebBit[]) {
        // Iterate each card in the array. Build the card elements and add the data
        let AAs = cardsData.map((article: WebBit) => {
            const rwbcard = new RWBCard();
            return rwbcard.buildRWBCardMarkup(article);;
        })
        return AAs;
    }
}

const rwbCardsWidget = {
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

export default rwbCardsWidget

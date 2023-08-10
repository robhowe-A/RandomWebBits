//--Copyright (c) 2023 Robert A. Howell
import WebBit from "./WebBit";
import RWBCard from "../components/RWBCard";

export class RandomWebBits {
    public static buildCardContainingSection(sectionTitle: string, sectionHeadingID: string) {
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
    public static buildArticleCards(cardsData: WebBit[]) {
        // Iterate each card in the array. Build the card elements and add the data
        let AAs = cardsData.map((article: WebBit) => {
            const rwbcard = new RWBCard();
            return rwbcard.buildRWBCardMarkup(article);;
        })
        return AAs;
    }
}

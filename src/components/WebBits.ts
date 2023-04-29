//--Copyright (c) Robert A. Howell
import AttributionLink from "./AttributionLink";
import WEBBITDATA from "./data"
import ATTRIBUTIONLINKDATA from "./data_AttributionLinks";

const cardsWidget = {
    init: () => {
        // create an array of card data + attribution link data
        // WEBBITDATA broken into 3 arrays: Pages, or articles, Guides, and Explores 
        let cardsArticles: any = [
            cardsWidget.buildArticleCards(WEBBITDATA.shift(), ATTRIBUTIONLINKDATA),
            cardsWidget.buildArticleCards(WEBBITDATA.shift(), ATTRIBUTIONLINKDATA),
            cardsWidget.buildArticleCards(WEBBITDATA.shift(), ATTRIBUTIONLINKDATA),
        ];

        // Split the cards arrays on the page into their respective category
        let cardsSection: HTMLDivElement[] = [
            cardsWidget.buildCardContainingSection("Arbitrary Articles:")!,
            cardsWidget.buildCardContainingSection("Guide Shorts:")!,
            cardsWidget.buildCardContainingSection("Exlore the Web:")!,
        ];

        // Route Checks -> Add widget and format multiple pages
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
            if (cardsSection[i] != undefined){
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
    },
    buildCardContainingSection: (name: string) => {
        // Create divisor sectional elements to append to main
        const pageMain = document.querySelector("main");
        if (pageMain != null && pageMain.nodeName === 'MAIN'){
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
            catch (error){
                console.log(error);
            }
        }
        
    },
    buildArticleCards: (cardsData: any, attrlinks: AttributionLink[]) => {
        // Map WebBit data to a card, each
        //
        // <div class="card">
        // <div><!--card image panel-->
        //     <img src="" alt="" article="">
        // </div><!--end card image panel-->
        // <div class="cardBody">
        //     <h3></h3>
        //     <p></p><a href=""></a>
        //     </div>
        // </div>
        //
        // Iterate each card --> build the card elements and add the data
        let AAs = cardsData.map((article: any) => {
            let WebBit = document.createElement('div');
            let cardImgTop = document.createElement('div');
            let cardImg = document.createElement('img');
            let cardBody = document.createElement('div');
            let cardBodyHeading = document.createElement('h3');
            let cardBodyPara = document.createElement('p');
            let cardBodyLink = document.createElement('a');
            cardImgTop.appendChild(cardImg);
            cardBody.appendChild(cardBodyHeading);
            cardBody.appendChild(cardBodyPara);
            cardBody.appendChild(cardBodyLink);

            // Add card data attributes and property values
            WebBit.classList.add('card');
            cardBody.classList.add("cardBody");
            cardImg.setAttribute('src', article.cardImage);
            cardImg.setAttribute('alt', article.cardImageALT);
            cardImg.setAttribute('Article', article.articleNumber);
            cardBodyLink.setAttribute('href', article.articleLink)
            cardBodyHeading.innerText = article.name;
            cardBodyPara.textContent = article.description;
            cardBodyLink.textContent = "Go to Page";
            
            // Image attribution may be needed for the image used
            // Attribution data is imported as 'attrlinks' signature parameter
            attrlinks.map((link) => {
                // To determine image attribution, the image id and article id will match,
                // otherwise the data isn't entered, causing a miss
                if (cardImg.getAttribute('Article') === link.articleid.toString()) {
                    //
                    // <div class="flip-card"><!--card image panel-->
                    // <div class="inner">
                    //     <div class="cardFront">
                    //         <img src="" alt="" article="">
                    //     </div>
                    //          <div class="cardBack">
                    //              <h3></h3>
                    //              <p></p>
                    //              <img src="" alt="" article="" class="imgSmall imgPTR">
                    //          </div>
                    //     </div>
                    // </div><!--end card image panel-->
                    //
                    // Create image back panel elements and add the data
                    // Redefine card image panel as a flip panel
                    const cardInner = cardImgTop.appendChild(document.createElement("div"));
                    const cardFront = cardInner.appendChild(document.createElement("div"));
                    cardFront.appendChild(cardImg); // move image within card front divisor
                    let smallImg = <HTMLImageElement>cardImg.cloneNode(false);
                    const cardBack = cardInner.appendChild(document.createElement("div"));
                    const backHeading = cardBack.appendChild(document.createElement("h3"));
                    cardBack.appendChild(smallImg);
                    const backPara = cardBack.appendChild(document.createElement("p"));
                    const attributeLink = cardBody.appendChild(document.createElement("a")); //append to front panel
                    
                    // Add flip-panel data attributes and property values
                    cardImgTop.classList.add("flip-card")
                    cardInner.classList.add("inner");
                    cardFront.classList.add("cardFront");
                    smallImg.classList.add("imgSmall", "imgPTR");
                    cardBack.classList.add("cardBack");
                    attributeLink.classList.add("attribute");
                    backHeading.textContent = link.attributeowner;
                    backPara.textContent = link.innerText
                    attributeLink.href = link.hReference;
                    attributeLink.title = link.title;
                    attributeLink.textContent = link.attributeowner;
                    
                }
            });

            // The card is WebBit
            // Add the markup to the containing element
            WebBit.appendChild(cardImgTop);
            WebBit.appendChild(cardBody);

            return WebBit;
        })
        return AAs;
    }
}

export default cardsWidget

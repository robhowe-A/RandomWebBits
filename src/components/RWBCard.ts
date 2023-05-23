//--Copyright (c) 2023 Robert A. Howell
import ATTRIBUTIONLINKDATA from "../lib/data_AttributionLinks";
import AttributionLink from "../models/AttributionLink";
import WebBit from "../models/WebBit";
import { RWBCardElements } from "../models/WidgetMarkupElements"

export default class RWBCard {
    public buildRWBCardMarkup(article: WebBit) {
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

        let WebBit = document.createElement('div');
        let RWBElements: RWBCardElements = {
            cardImg: document.createElement('img'),
            cardImgTop: document.createElement('div'),
            cardBody: document.createElement('div')
        }
        let cardBodyHeading = document.createElement('h3');
        let cardBodyPara = document.createElement('p');
        let cardBodyLink = document.createElement('a');
        RWBElements.cardImgTop.appendChild(RWBElements.cardImg);
        RWBElements.cardBody.appendChild(cardBodyHeading);
        RWBElements.cardBody.appendChild(cardBodyPara);
        RWBElements.cardBody.appendChild(cardBodyLink);

        // Add card data attributes and property values
        WebBit.classList.add('card');
        RWBElements.cardBody.classList.add("cardBody");
        RWBElements.cardImg.setAttribute('src', article.cardImage);
        RWBElements.cardImg.setAttribute('alt', article.cardImageALT);
        RWBElements.cardImg.setAttribute('Article', article.articleNumber.toString());
        cardBodyLink.setAttribute('href', article.articleLink)
        cardBodyHeading.innerText = article.name;
        cardBodyPara.textContent = article.description;
        cardBodyLink.textContent = "Go to Page";

        // Image attribution may be needed for the image used
        // Attribution data is imported as 'attrlinks' signature parameter
        ATTRIBUTIONLINKDATA.map((link) => this.buildRWBCardAttributionPanel(RWBElements, link));

        // The card is WebBit
        // Add the markup to the containing element
        WebBit.appendChild(RWBElements.cardImgTop);
        WebBit.appendChild(RWBElements.cardBody);

        return WebBit;

    }
    private buildRWBCardAttributionPanel(cardAttrElement: RWBCardElements, link: AttributionLink) {
        // To determine image attribution, the image id and article id will match,
        // otherwise the data isn't entered, causing a miss
        if (cardAttrElement.cardImg.getAttribute('Article') === link.articleid.toString()) {
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
            const cardInner = cardAttrElement.cardImgTop.appendChild(document.createElement("div"));
            const cardFront = cardInner.appendChild(document.createElement("div"));
            cardFront.appendChild(cardAttrElement.cardImg); // move image within card front divisor
            let smallImg = <HTMLImageElement>cardAttrElement.cardImg.cloneNode(false);
            const cardBack = cardInner.appendChild(document.createElement("div"));
            const backHeading = cardBack.appendChild(document.createElement("h3"));
            cardBack.appendChild(smallImg);
            const backPara = cardBack.appendChild(document.createElement("p"));
            const attributeLink = cardAttrElement.cardBody.appendChild(document.createElement("a")); //append to front panel

            // Add flip-panel data attributes and property values
            cardAttrElement.cardImgTop.classList.add("flip-card")
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
    }
}
//--Copyright (c) Robert A. Howell
import WebBits from "./data.js";
import ATTRIBUTIONLINKS from "./data_AttributionLinks.js";

const cardsWidget = {
    dictionaryWidgetBeforeElem: null,
    init: () => {
        let cardsArticles = [];
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), ATTRIBUTIONLINKS));
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), ATTRIBUTIONLINKS));
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), ATTRIBUTIONLINKS));

        let cardsSection = [];
        cardsSection.push(cardsWidget.buildCardSection("Arbitrary Articles:"));
        cardsSection.push(cardsWidget.buildCardSection("Guide Shorts:"));
        cardsSection.push(cardsWidget.buildCardSection("Exlore the Web:"));

        //Route Checks -> Add widget and format multiple pages
        if (window.location.pathname == '/index.html' ||
            window.location.pathname == '/' ||
            window.location.pathname == '/RandomWebBits/index.html' ||
            window.location.pathname == '/RandomWebBits/') {
            const getMultipleRandom = (arr, num) => {
                const shuffled = [...arr].sort(() => 0.5 - Math.random());

                return shuffled.slice(0, num);
            }
            cardsArticles[0] = getMultipleRandom(cardsArticles[0], 3);
        }

        for (let i = 0; i < cardsSection.length; i++) {
            //from cards stack, append each to section
            cardsArticles.shift().forEach((article) => {
                cardsSection[i].append(article);
            });
        }

        cardsWidget.dictionaryWidgetBeforeElem = document.querySelector("Section:last-of-type")
        cardsWidget.dictionaryWidgetBeforeElem.classList.add("dictionaryWidget", "ToDoList");
        return cardsWidget.dictionaryWidgetBeforeElem;
    },
    buildCardSection: (name) => {
        //Create Artibrary Articles section element and append to Main
        const pageMain = document.querySelector("main");
        const AASection = document.createElement("section");
        AASection.classList.add("cards");

        //Create card section heading and div element. Append to section
        let aaHeading = document.createElement('h2');
        aaHeading.innerText = `${name}`;
        let aaCardsSection = document.createElement('div');
        aaCardsSection.classList.add('card_columns');
        AASection.appendChild(aaHeading);
        AASection.appendChild(aaCardsSection);
        pageMain.append(AASection);
        return aaCardsSection;
    },
    buildArticleCards: (cardsData, attrlinks) => {
        //Map WebBits to a card, each
        let AAs = cardsData.map((article) => {
            let WebBit = document.createElement('div');
            WebBit.classList.add('card');
            let cardImgTop = document.createElement('div');
            let cardImg = document.createElement('img');
            cardImg.setAttribute('src', article.cardImage);
            cardImg.setAttribute('alt', article.cardImageALT);
            cardImg.setAttribute('Article', article.articleNumber);
            cardImgTop.appendChild(cardImg);
            let cardBody = document.createElement('div');
            cardBody.classList.add("cardBody");
            let cardBodyHeading = document.createElement('h3');
            let cardBodyPara = document.createElement('p');
            let cardBodyLink = document.createElement('a');
            cardBody.appendChild(cardBodyHeading);
            cardBody.appendChild(cardBodyPara);
            cardBody.appendChild(cardBodyLink);
            cardBodyHeading.innerText = article.name;
            attrlinks.map((link) => {
                //Determine if card image needs attribution panel
                if (cardImg.getAttribute('Article') == link.articleid) { //match WebBit ID to Icon ID
                    cardImgTop.classList.add("flip-card")
                    const cardInner = cardImgTop.appendChild(document.createElement("div"));
                    cardInner.classList.add("inner");
                    const cardFront = cardInner.appendChild(document.createElement("div"));
                    cardFront.classList.add("cardFront");
                    cardFront.appendChild(cardImg);
                    let smallImg = cardImg.cloneNode(false);
                    smallImg.classList.add("imgSmall", "imgPTR");

                    const cardBack = cardInner.appendChild(document.createElement("div"));
                    cardBack.classList.add("cardBack");
                    const backHeading = cardBack.appendChild(document.createElement("h3"));
                    backHeading.textContent = link.attributeowner;
                    cardBack.appendChild(smallImg);
                    const backPara = cardBack.appendChild(document.createElement("p"));
                    backPara.textContent = link.innerText
                    const attributeLink = cardBody.appendChild(document.createElement("a"));
                    attributeLink.href = link.hReference;
                    attributeLink.title = link.title;
                    attributeLink.textContent = link.attributeowner;
                    attributeLink.classList.add("attribute");
                }
            });
            cardBodyPara.textContent = article.description;
            cardBodyLink.setAttribute('href', article.articleLink)
            cardBodyLink.textContent = "Go to Page";

            WebBit.appendChild(cardImgTop);
            WebBit.appendChild(cardBody);
            return WebBit;
        })
        return AAs;
    }
}

export default cardsWidget

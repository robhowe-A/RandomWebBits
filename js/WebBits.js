//-------------------Arbitrary Article Cards------------------------//
import ArbitraryArticles from "./components/data.js";
import LinkDetails from "./script.js";

class IconLink extends LinkDetails {
    constructor(pageName, hReference, title, innerText) {
        super(title, innerText);
        this.pageName = pageName,
        this.hReference = hReference
    }
}

//Icon links
const htmlFramesIconLink = new IconLink(
    "HTML Frames",
     "https://www.flaticon.com/free-icons/html",
     "html icons",
     "Html icons created by Freepik - Flaticon"
 );
 const httpsCertIconLink = new IconLink(
     "HTTPS Certificate",
     "https://www.flaticon.com/free-icons/ssl-certificate",
     "ssl certificate icons",
     "Ssl certificate icons created by inipagistudio - Flaticon"
 );
 const domainLookupIconLink = new IconLink(
     "Domain Lookup",
     "https://www.flaticon.com/free-icons/domain",
     "domain icons",
     "Domain icons created by Freepik - Flaticon"
 );
 const aiIconLink = new IconLink(
     "Preview chatGPT",
     "https://www.flaticon.com/free-icons/ai",
     "ai icons",
     "Ai icons created by Freepik - Flaticon"
 );
 const prototypeIconLink = new IconLink(
     "Paint 3D",
     "https://www.flaticon.com/free-icons/prototype",
     "prototype icons",
     "Prototype icons created by Freepik - Flaticon"
 );
 const dictionaryIconLink = new IconLink(
     "Dictionary Terms",
     "https://www.flaticon.com/free-icons/dictionary",
     "dictionary icons",
     "Dictionary icons created by Freepik - Flaticon"
 );
 const FLATICONS = [htmlFramesIconLink, httpsCertIconLink, domainLookupIconLink,
     aiIconLink, prototypeIconLink, dictionaryIconLink
 ];


const cardTiles = (function() {

    //Create Artibrary Articles section element and append to Main
    const pageMain = document.querySelector("main");
    const AASection = document.createElement("section");
    AASection.classList.add("cards");

        //create card section heading and div element. Append to section
    let aaHeading = document.createElement('h2');
    aaHeading.innerText = `Arbitrary Articles:`;
    let aaCardsSection = document.createElement('div');
    aaCardsSection.classList.add('card_columns');
    AASection.appendChild(aaHeading);
    AASection.appendChild(aaCardsSection);
    pageMain.append(AASection);

    //Map WebBits to a card, each
    //Map is fulcrum to create a WebBit card
    const AAs = ArbitraryArticles.map((article) => {
        let ArbitraryArticle = document.createElement('div');
        ArbitraryArticle.classList.add('card');
        let cardImgTop = document.createElement('div');
        let cardImg = document.createElement('img');
        cardImg.setAttribute('src', article.cardImage);
        cardImg.setAttribute('alt', article.cardImageALT);
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
            FLATICONS.map(function(link){
                if (cardBodyHeading.innerText === link.pageName){ 
                cardImgTop.classList.add("flip-card")
                const cardInner = cardImgTop.appendChild(document.createElement("div"));
                cardInner.classList.add("inner");
                const cardFront = cardInner.appendChild(document.createElement("div"));
                cardFront.classList.add("cardFront");
                cardFront.appendChild(cardImg);
                let smallImg = cardImg.cloneNode(false);
                smallImg.classList.add("imgSmall");
                const cardBack = cardInner.appendChild(document.createElement("div"));
                cardBack.classList.add("cardBack");
                const backHeading = cardBack.appendChild(document.createElement("h3"));
                backHeading.textContent = "FAVICON";
                cardBack.appendChild(smallImg);
                const backPara = cardBack.appendChild(document.createElement("p"));
                backPara.textContent = link.innerText
                const attributeLink = cardBody.appendChild(document.createElement("a"));
                attributeLink.href = link.hReference;
                attributeLink.target = link.title;
                attributeLink.textContent = "FAVICON";
                attributeLink.classList.add("attribute");
                }
            });
        
        
        cardBodyPara.textContent = article.description;
        cardBodyLink.setAttribute('href', article.articleLink)
        cardBodyLink.textContent = "Go to Page";

        ArbitraryArticle.appendChild(cardImgTop);
        ArbitraryArticle.appendChild(cardBody);

        return ArbitraryArticle;
    });

    //from AA map, append each to section
    AAs.forEach((article) => {
        aaCardsSection.append(article);
    })
})();

            
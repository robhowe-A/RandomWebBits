//-------------------Arbitrary Article Cards------------------------//
import ArbitraryArticles from "./components/data.js";
import LinkDetails from "./script.js";

const cardTiles = (function() {

    class IconLink extends LinkDetails {
        constructor(pageName, hReference, title, innerText, owner, id) {
            super(title, innerText);
            this.pageName = pageName,
            this.hReference = hReference,
            this.owner = owner,
            this.id = id
        }
    }
    
    //Icon links
    const htmlFramesIconLink = new IconLink(
        "HTML Frames",
         "https://www.flaticon.com/free-icons/html",
         "html icons",
         "Html icons created by Freepik - Flaticon",
         "Flaticon",
         2
     );
     const httpsCertIconLink = new IconLink(
         "HTTPS Certificate",
         "https://www.flaticon.com/free-icons/ssl-certificate",
         "ssl certificate icons",
         "Ssl certificate icons created by inipagistudio - Flaticon",
         "Flaticon",
         4
     );
     const domainLookupIconLink = new IconLink(
         "Domain Lookup",
         "https://www.flaticon.com/free-icons/domain",
         "domain icons",
         "Domain icons created by Freepik - Flaticon",
         "Flaticon",
         1
     );
     const aiIconLink = new IconLink(
         "Preview chatGPT",
         "https://www.flaticon.com/free-icons/ai",
         "ai icons",
         "Ai icons created by Freepik - Flaticon",
         "Flaticon",
         8
     );
     const prototypeIconLink = new IconLink(
         "Paint 3D",
         "https://www.flaticon.com/free-icons/prototype",
         "prototype icons",
         "Prototype icons created by Freepik - Flaticon",
         "Flaticon",
         9
     );
    const dictionaryIconLink = new IconLink(
        "Dictionary Terms",
        "https://www.flaticon.com/free-icons/dictionary",
        "dictionary icons",
        "Dictionary icons created by Freepik - Flaticon",
        "Flaticon",
        10
    );
    const boincIconLink = new IconLink(
        "Contribute for Science United",
        "https://boinc.berkeley.edu",
        "BOINC icons",
        "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California",
        "BOINC",
        11
    );
     const ipIconLink = new IconLink(
        "IP Address Lookup",
        "https://www.flaticon.com/free-icons/ip",
        "IP icons",
        "IP icons created by kerismaker - Flaticon",
        "Flaticon",
        12
    );
     const FLATICONS = [htmlFramesIconLink, httpsCertIconLink, domainLookupIconLink,
         aiIconLink, prototypeIconLink, dictionaryIconLink, boincIconLink, 
         ipIconLink
     ];

    //Create Artibrary Articles section element and append to Main
    const pageMain = document.querySelector("main");
    const AASection = document.createElement("section");
    AASection.classList.add("cards");
    AASection.classList.add("dictionaryWidget");

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
    
    const webBitsArticleCards = function buildWebBits(webBit){
        let AAs = ArbitraryArticles.map((article) => {
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
            cardBodyHeading.innerText = article.id;
            FLATICONS.map(function(link){
                if (cardImg.getAttribute('Article') == link.id){ //match WebBit ID to Icon ID
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
                backHeading.textContent = link.owner;
                cardBack.appendChild(smallImg);
                const backPara = cardBack.appendChild(document.createElement("p"));
                backPara.textContent = link.innerText
                const attributeLink = cardBody.appendChild(document.createElement("a"));
                attributeLink.href = link.hReference;
                attributeLink.target = link.title;
                attributeLink.textContent = link.owner;
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

    let WebBits = webBitsArticleCards();

    if(window.location.pathname == '/index.html' || 
       window.location.pathname == '/' || 
       window.location.pathname == '/RandomWebBits/index.html' || 
       window.location.pathname == '/RandomWebBits/'){
        function getMultipleRandom(arr, num) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
        
            return shuffled.slice(0, num);
            }
        
        WebBits = getMultipleRandom(WebBits, 3);
    }
    
    //from AA map, append each to section
    WebBits.forEach((article) => {
        aaCardsSection.append(article);
    })
})();

            

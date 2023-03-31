//--Copyright (c) Robert A. Howell
import WebBits from "./data.js";
import LinkDetails from "../script.js";

const cardsWidget = {
    dictionaryWidgetBeforeElem: null,
    init: () => {
        //Icon links used for image Attribution
        class IconLink extends LinkDetails {
            constructor(pageName, hReference, title, innerText, owner, id) {
                super(title, innerText);
                this.pageName = pageName,
                    this.hReference = hReference,
                    this.owner = owner,
                    this.id = id
            }
        }
        const domainLookupIconLink = new IconLink(
            "Domain Lookup",
            "https://www.flaticon.com/free-icons/domain",
            "domain icons",
            "Domain icons created by Freepik - Flaticon",
            "Flaticon",
            1
        );
        const htmlFramesIconLink = new IconLink(
            "HTML Source Code",
            "https://www.flaticon.com/free-icons/code",
            "code icons",
            "Code icons created by Freepik - Flaticon",
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
        const htmlSourceIconLink = new IconLink(
            "HTML Source Code",
            "https://www.flaticon.com/free-icons/html",
            "html icons",
            "Html icons created by Freepik - Flaticon",
            "Flaticon",
            13
        );
        const searchVerticalsIconLink = new IconLink(
            "Search Verticals",
            "https://www.flaticon.com/free-icons/content-writing",
            "content writing icons",
            "Content writing icons created by Vectors Tank - Flaticon",
            "Flaticon",
            14
        );
        const networkSpeedTestsIconLink = new IconLink(
            "Network Speed",
            "https://www.flaticon.com/free-icons/page-speed",
            "page speed icons",
            "Page speed icons created by Prosymbols Premium - Flaticon",
            "Flaticon",
            15
        );
        const emailServerIconLink = new IconLink(
            "SMTP and Email",
            "https://www.flaticon.com/free-icons/server",
            "server icons",
            "Server icons created by Freepik - Flaticon",
            "Flaticon",
            16
        );
        const compTerminalIconLink = new IconLink(
            "PowerShell Drives",
            "https://www.flaticon.com/free-icons/terminal",
            "terminal icons",
            "Terminal icons created by Flat Icons - Flaticon",
            "Flaticon",
            17
        );
        const expeditionIconLink = new IconLink(
            "Virtual Tour",
            "https://www.flaticon.com/free-icons/google-expeditions",
            "google expeditions icons",
            "Google expeditions icons created by Freepik - Flaticon",
            "Flaticon",
            18
        );
        const devtoolIconLink = new IconLink(
            "Virtual Tour",
            "https://www.flaticon.com/free-icons/toolbox",
            "toolbox icons",
            "Toolbox icons created by Freepik - Flaticon",
            "Flaticon",
            19
        );
        const FLATICONS = [htmlFramesIconLink, httpsCertIconLink, domainLookupIconLink,
            aiIconLink, prototypeIconLink, dictionaryIconLink, boincIconLink,
            ipIconLink, htmlSourceIconLink, searchVerticalsIconLink, networkSpeedTestsIconLink,
            emailServerIconLink, compTerminalIconLink, expeditionIconLink, devtoolIconLink
        ];

        let cardsArticles = [];
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), FLATICONS));
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), FLATICONS));
        cardsArticles.push(cardsWidget.buildArticleCards(WebBits.shift(), FLATICONS));

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
    buildArticleCards: (cardsData, FLATICONS) => {
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
            FLATICONS.map((link) => {
                //Determine if card image needs attribution panel
                if (cardImg.getAttribute('Article') == link.id) { //match WebBit ID to Icon ID
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
                    backHeading.textContent = link.owner;
                    cardBack.appendChild(smallImg);
                    const backPara = cardBack.appendChild(document.createElement("p"));
                    backPara.textContent = link.innerText
                    const attributeLink = cardBody.appendChild(document.createElement("a"));
                    attributeLink.href = link.hReference;
                    attributeLink.title = link.title;
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
}

export default cardsWidget

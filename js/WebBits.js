//-------------------Arbitrary Article Cards------------------------//
import ArbitraryArticles from "./components/data.js";

const cardTiles = (function() {
    //Create Artibrary Articles section element and append to Main
    const pageMain = document.querySelector("main");
    const AASection = document.createElement("section");
    AASection.classList.add("cards");

    const AASectionContent = `
        <h2>Arbitrary Articles:</h2>
        <div class="card_columns"></div>
    `;
    AASection.innerHTML = AASectionContent;
    pageMain.append(AASection);


    //Map WebBits to cards (divs)
    const cardcol = document.querySelector(".card_columns");

    const AAs = ArbitraryArticles.map((article) => {
        let ArbitraryArticle = document.createElement('div');
        ArbitraryArticle.classList.add('card');
        let cardImgTop = document.createElement('div');
        let cardImg = document.createElement('img');
        cardImg.setAttribute('src', article.cardImage);
        cardImg.setAttribute('alt', article.cardImageALT);
        cardImgTop.appendChild(cardImg);
        let cardBody = document.createElement('div');
        let cardBodyHeader = document.createElement('h3');
        let cardBodyPara = document.createElement('p');
        let cardBodyLink = document.createElement('a');
        cardBody.appendChild(cardBodyHeader);
        cardBody.appendChild(cardBodyPara);
        cardBody.appendChild(cardBodyLink);
        cardBodyHeader.innerText = article.name;
        cardBodyPara.textContent = article.description;
        cardBodyLink.setAttribute('href', article.articleLink)
        cardBodyLink.textContent = "Go to Page";

        ArbitraryArticle.appendChild(cardImgTop).appendChild(cardBody);

        return ArbitraryArticle;
    });

    //add each card within card_columns class
    AAs.forEach((article) => {
        cardcol.append(article);
    })
})();

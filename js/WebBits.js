//-------------------Arbitrary Article Cards------------------------//
import ArbitraryArticles from "./components/data.js";

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
    let ArbitraryArticle = document.createElement("div");
    ArbitraryArticle.classList.add("card");
    const cardContent = `
        <div>
            <img src="${article.cardImage}" alt="${article.cardImageALT}">
        </div>
        <div class="card_body">
            <h3>${article.name}</h3>
            <p>${article.description}</p>
            <a href="${article.articleLink}">Go to Page</a>
        </div>
        
    `;
    ArbitraryArticle.innerHTML = cardContent;

    return ArbitraryArticle;
});

//add each card within card_columns class
AAs.forEach((article) => {
    cardcol.append(article);
})


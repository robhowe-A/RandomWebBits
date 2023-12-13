//--Copyright (c) 2023 Robert A. Howell
import WebBit from "./webBit";
import RWBCard from "./rwbCard";
import RwbError from "./rwbErrorBus";

export default class RandomWebBits {
  public cardsSection: HTMLDivElement;
  public cardsData: any;

  constructor(cardsSection: HTMLDivElement, cardsData: any) {
    this.cardsSection = cardsSection;
    this.cardsData = cardsData;
  };

  public static buildCardContainingSection(
    sectionTitle: string,
    sectionHeadingID: string,
    containerType?: string
  ) {
    // Create sectional elements to append to main
    const pageMain = document.querySelector("main");
    if (pageMain == null || pageMain.nodeName !== "MAIN") {
      if (RwbError.checkElementforNull("MainRWB", "main", true, true)) {
        ReadableStreamDefaultController;
      }
    }
    // Create card section elements
    // <section class="cards">
    //     <h2>Arbitrary Articles:</h2>
    //     <div class="card_columns">

    //     </div>
    // </section>
    //
    const AASection = document.createElement("section");
    let aaHeading = document.createElement("h2");
    let aaCardsSection = document.createElement("div");
    AASection.appendChild(aaHeading);
    AASection.appendChild(aaCardsSection);
    pageMain.append(AASection);

    // Add data attributes and property values
    AASection.classList.add("cards");
    switch (containerType) {
      case "slideshow":
        aaCardsSection.classList.add("card_columns", "cardslideshow", "grid");
        break;
      case "accordion":
        aaCardsSection.classList.add("card_columns", "cardaccordion", "grid");
        break;
      default:
        aaCardsSection.classList.add("card_columns", "grid");
        break;
    }
    aaHeading.innerText = `${sectionTitle}`;
    aaHeading.setAttribute("id", sectionHeadingID);

    return aaCardsSection;
  };

  public static buildRWBCards(cardsData: WebBit[]) {
    // Iterate each card in the array. Build the card elements and add the data
    return cardsData.map((article: WebBit) => {
      const rwbcard = new RWBCard();
      return rwbcard.buildRWBCardMarkup(article);
    });
  };

  public static buildRWBIntroduction() {
    let introduction = document.createElement("section");
    let Title = introduction.appendChild(document.createElement("h1"));
    Title.classList.add("Title");
    Title.innerText = "Home | Arbitrary Web Bits";
    let h2 = introduction.appendChild(document.createElement("h2"));
    h2.innerText = "New to the Web?";
    let para1 = introduction.appendChild(document.createElement("p"));
    para1.innerText =
      "If you are new to web development, there are innumerous enumerations of stuff and things the World Wide Web offers that you don't know.";
    let para2 = introduction.appendChild(document.createElement("p"));
    para2.innerText = "You may want to start by claiming a stake to a domain name.";

    return introduction;
  };
  
}

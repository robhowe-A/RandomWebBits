//--Copyright (c) 2023 Robert A. Howell
class Accordion {
  public accordionElements = new Map<HTMLDivElement, boolean>();
  constructor(accordionnodes: NodeListOf<HTMLDivElement>) {
    for (let card of accordionnodes) {
      this.accordionElements.set(card, false);
    }
  }
}

const WebBitsAccordion = {
  init: () => {
    const accordionContainer = document.querySelector(".cardaccordion") as HTMLDivElement;
    accordionContainer.style.maxWidth = "75em";
    //create accordion card map state
    const cardaccordion = document.querySelectorAll(
      ".cardaccordion .accordionslide"
    ) as NodeListOf<HTMLDivElement>;

    let accordion = Object.create(new Accordion(cardaccordion));

    if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
      WebBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
    } else if (window.matchMedia("(min-width: 769px)").matches) {
      WebBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
    }

    window.addEventListener("resize", e => {
      e.preventDefault();
      if (window.matchMedia("(min-width: 501px) and (max-width: 768px)").matches) {
        WebBitsAccordion.addCardAccordionStyles(accordion, "SMALL");
      }
      if (window.matchMedia("(min-width: 769px)").matches) {
        WebBitsAccordion.addCardAccordionStyles(accordion, "MEDIUM");
      }
      if (window.matchMedia("(max-width: 500px)").matches) {
        WebBitsAccordion.removeCardAccorionStyles(accordion);
      }
    });

    //add styles for mobile screen
    //add styles for tablet screen
    //add styles for desktop screen
  },
  addCardAccordionStyles: (cardaccordion: Accordion, screenSize: string) => {
    cardaccordion.accordionElements.forEach((isOpen, card) => {
      card.style.removeProperty("flexDirection");
      card.style.setProperty("max-width", "900px");
      card.style.setProperty("margin", "0");
      card.style.setProperty("height", "100px");
      card.style.setProperty("overflow", "hidden");
      //hide the 'Flaticon' links

      for (let inner of card.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.width = "50%";

        // let flaticonelem = <HTMLAnchorElement>inner.childNodes[3];
        // flaticonelem.style.right = "50%";
        // flaticonelem.style.top = "50%";
      }
      //card body attr style
      let attrlink = card.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.top = "55px";
      attrlink.style.right = "100%";

      if (screenSize == "SMALL") {
        //card image style
        let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
        image.style.setProperty("max-height", "200px");
        image.style.setProperty("max-width", "200px");

        //card image small style
        let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
        imageSmall.style.setProperty("max-height", "100px");
        imageSmall.style.setProperty("max-width", "100px");

        //card back para style
        let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2] as HTMLImageElement;
        imagePara.style.setProperty("margin", "0");
        imagePara.style.setProperty("font-size", "16px");
      }
      if (screenSize == "MEDIUM") {
        //card image style
        let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
        image.style.setProperty("max-height", "275px");
        image.style.setProperty("max-width", "275px");

        //card image small style
        let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
        imageSmall.style.setProperty("max-height", "100px");
        imageSmall.style.setProperty("max-width", "100px");
      }

      //add click event
      card.addEventListener("click", e => {
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };

        const open = () => {
          card.style.setProperty("height", "275px");
          isOpen = true;
        };
        isOpen ? close() : open();
      });
      //add focus event
      let sitelink = card.childNodes[1].childNodes[2] as HTMLAnchorElement;
      sitelink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          card.style.setProperty("height", "350px");
          isOpen = true;
        };
        open();
      });
      sitelink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          card.style.setProperty("height", "100px");
          isOpen = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          card.style.setProperty("height", "350px");
          isOpen = true;
        };
        open();
      });
    });
  },

  removeCardAccorionStyles: (cardaccordion: Accordion) => {
    cardaccordion.accordionElements.forEach((isOpen, card) => {
      card.style.setProperty("flexDirection", "column");
      card.style.removeProperty("height");

      card.style.removeProperty("max-width");
      card.style.removeProperty("margin");
      card.style.removeProperty("overflow");
      card.removeAttribute("style");

      //card body attr style
      let attrlink = card.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.removeProperty("top");
      attrlink.style.removeProperty("right");
      attrlink.removeAttribute("style");

      //card image style
      let image = card.childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLImageElement;
      image.style.removeProperty("max-height");

      //card image small style
      let imageSmall = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1] as HTMLImageElement;
      imageSmall.style.removeProperty("max-height");

      //card back para style
      let imagePara = card.childNodes[0].childNodes[0].childNodes[1].childNodes[2] as HTMLImageElement;
      imagePara.style.removeProperty("margin");
      imagePara.style.removeProperty("font-size");

      for (let inner of card.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.removeProperty("width");
        innerelem.removeAttribute("style");
      }
    });
  },
};
export default WebBitsAccordion;

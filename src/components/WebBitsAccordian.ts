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

    if (window.matchMedia("(min-width: 769px)").matches) {
      WebBitsAccordion.addCardAccordionStyles(accordion);
    }

    window.addEventListener("resize", e => {
      e.preventDefault();
      if (window.matchMedia("(min-width: 769px)").matches) {
        WebBitsAccordion.addCardAccordionStyles(accordion);
      }
      if (window.matchMedia("(max-width: 768px)").matches) {
        WebBitsAccordion.removeCardAccorionStyles(accordion);
        console.log(`Smaller screensize: ${window.innerWidth}`);
      }
    });

    //add styles for mobile screen
    //add styles for tablet screen
    //add styles for desktop screen
  },
  addCardAccordionStyles: (cardaccordion: Accordion) => {
    cardaccordion.accordionElements.forEach((val, key) => {
      key.style.removeProperty("flexDirection");
      key.style.setProperty("max-width", "900px");
      key.style.setProperty("margin", "0");
      key.style.setProperty("height", "100px");
      key.style.setProperty("overflow", "hidden");
      //hide the 'Flaticon' links

      for (let inner of key.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.width = "50%";

        // let flaticonelem = <HTMLAnchorElement>inner.childNodes[3];
        // flaticonelem.style.right = "50%";
        // flaticonelem.style.top = "50%";
      }
      let attrlink = key.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.top = "55px";
      attrlink.style.right = "100%";

      //add click event
      key.addEventListener("click", e => {
        e.preventDefault();
        const close = () => {
          key.style.setProperty("height", "100px");
          val = false;
        };

        const open = () => {
          key.style.setProperty("height", "350px");
          val = true;
        };
        val ? close() : open();
      });
      //add focus event
      let sitelink = key.childNodes[1].childNodes[2] as HTMLAnchorElement;
      sitelink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          key.style.setProperty("height", "350px");
          val = true;
        };
        open();
      });
      sitelink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          key.style.setProperty("height", "100px");
          val = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focusout", e => {
        e.preventDefault();
        const close = () => {
          key.style.setProperty("height", "100px");
          val = false;
        };
        close();
      });
      //add unfocus event
      attrlink.addEventListener("focus", e => {
        e.preventDefault();
        const open = () => {
          key.style.setProperty("height", "350px");
          val = true;
        };
        open();
      });
    });
  },

  removeCardAccorionStyles: (cardaccordion: Accordion) => {
    cardaccordion.accordionElements.forEach((val, key) => {
      key.style.setProperty("flexDirection", "column");
      key.style.removeProperty("height");

      key.style.removeProperty("max-width");
      key.style.removeProperty("margin");
      key.style.removeProperty("overflow");
      key.removeAttribute("style");

      let attrlink = key.childNodes[1].childNodes[3] as HTMLAnchorElement;
      attrlink.style.removeProperty("top");
      attrlink.style.removeProperty("right");
      attrlink.removeAttribute("style");

      for (let inner of key.childNodes) {
        let innerelem = <HTMLElement>inner;
        innerelem.style.removeProperty("width");
        innerelem.removeAttribute("style");
      }
    });
  },
};
export default WebBitsAccordion;

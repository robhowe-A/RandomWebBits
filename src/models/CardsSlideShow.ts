//--Copyright (c) 2023 Robert A. Howell

export default class CardsSlideShow {
  private cards: NodeListOf<HTMLDivElement>;
  private cardquantshow: number;
  private cardindxstart: number = 0;
  private cardcounter: number = 1;
  private cardsindxend: number;
  private turn: number = 0;
  private maxturncount: number;
  private slideshowcontainer: HTMLElement = document.querySelector(".cardslideshow") as HTMLElement;
  public ssContainer: HTMLDivElement;
  public arrowsContainer: HTMLDivElement;
  public prevbtn: HTMLElement;
  public nextbtn: HTMLElement;
  private numberElement: HTMLElement;
  private windowSize: string;

  constructor(cards: NodeListOf<HTMLDivElement>, quantityshow: number, windowSize: string) {
    this.cards = cards;
    this.cardquantshow = quantityshow;
    this.cardsindxend = this.cardquantshow - 1;
    this.maxturncount = this.cards.length - this.cardquantshow;
    this.windowSize = windowSize;

    this.hideOverflowElements();
    switch (this.windowSize) {
      case "SMALL":
        //small window size logic
        this.cards[1].style.transform = "translateX(182.5px)";
        this.cards[1].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[1].children[1].children[3].setAttribute("tabindex", "-1");

        break;
      case "MEDIUM":
        //medium window size logic
        this.cards[0].style.transform = "translateX(-182.5px)";
        this.cards[1].style.position = "absolute";
        this.cards[1].style.transform = "translateX(182.5px)";
        this.cards[2].style.display = "block";
        this.cards[2].style.zIndex = "-1";
        this.cards[2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[2].children[1].children[3].setAttribute("tabindex", "-1");

        break;
      case "LARGE":
        //large window size logic
        this.cards[0].style.transform = "translateX(-365px)";
        this.cards[1].style.position = "absolute";
        this.cards[2].style.position = "absolute";
        this.cards[2].style.transform = "translateX(365px)";
        this.cards[3].style.display = "block";
        this.cards[3].style.zIndex = "-1";
        this.cards[3].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[3].children[1].children[3].setAttribute("tabindex", "-1");

        break;
      default:
        console.debug("Screen size property not set on slideshow.");
        break;
    }

    this.ssContainer = this.newContainerMarkup();
    this.arrowsContainer = this.newArrowsMarkup();
    this.addBtnEventListeners();
    this.newNumberElement();
    this.showHideSlideShowButtons();
  }
  public nextSlide() {
    if (this.turn == this.maxturncount) {
      return;
    }
    if (this.windowSize == "LARGE") {
      if (this.cards[this.cardindxstart - 1] != undefined) {
        this.cards[this.cardindxstart - 1].style.display = "none";
        this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardindxstart].style.opacity = "0%";
      this.cards[this.cardindxstart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardindxstart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move middle element to left
      this.cards[this.cardindxstart + 1].style.transform = "translateX(-365px)";

      //Move right to the middle
      this.cards[this.cardindxstart + 2].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].style.removeProperty("z-index");
      this.cards[this.cardsindxend + 1].style.removeProperty("opacity");
      this.cards[this.cardsindxend + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsindxend + 1].style.transform = "translateX(365px)";
      if (this.cards[this.cardsindxend + 2] != undefined) {
        this.cards[this.cardsindxend + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].style.display = "block";
        this.cards[this.cardsindxend + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "MEDIUM") {
      if (this.cards[this.cardindxstart - 1] != undefined) {
        this.cards[this.cardindxstart - 1].style.display = "none";
        this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardindxstart].style.opacity = "0%";
      this.cards[this.cardindxstart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardindxstart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move the right element to left
      this.cards[this.cardindxstart + 1].style.transform = "translateX(-182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].style.removeProperty("z-index");
      this.cards[this.cardsindxend + 1].style.removeProperty("opacity");
      this.cards[this.cardsindxend + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsindxend + 1].style.transform = "translateX(182.5px)";
      if (this.cards[this.cardsindxend + 2] != undefined) {
        this.cards[this.cardsindxend + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].style.display = "block";
        this.cards[this.cardsindxend + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "SMALL") {
      if (this.cards[this.cardindxstart - 1] != undefined) {
        this.cards[this.cardindxstart - 1].style.display = "none";
        this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardindxstart].style.opacity = "0%";
      this.cards[this.cardindxstart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardindxstart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move element to left
      this.cards[this.cardindxstart].style.transform = "translateX(-182.5px)";

      //Move element to center
      this.cards[this.cardindxstart + 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsindxend + 1].style.removeProperty("z-index");
      this.cards[this.cardsindxend + 1].style.removeProperty("opacity");
      this.cards[this.cardsindxend + 1].style.removeProperty("display");

      if (this.cards[this.cardsindxend + 2] != undefined) {
        this.cards[this.cardsindxend + 2].style.transform = "translateX(182.5px)";
        this.cards[this.cardsindxend + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsindxend + 2].style.display = "block";
        this.cards[this.cardsindxend + 2].style.zIndex = "-1";
      }
    }

    //Increment index counter
    this.cardindxstart++;
    this.cardsindxend++;
    this.turn++;
    this.cardcounter++;
  }
  public prevSlide() {
    if (this.turn == 0) {
      return;
    }
    if (this.windowSize == "LARGE") {
      //Hide the last element in slideshow
      this.cards[this.cardsindxend].style.opacity = "0%";
      this.cards[this.cardsindxend].style.zIndex = "-1";
      this.cards[this.cardsindxend].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsindxend].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsindxend + 1] != undefined) {
        this.cards[this.cardsindxend + 1].style.display = "none";
        this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move middle element to to the right
      this.cards[this.cardindxstart + 1].style.transform = "translateX(365px)";

      //Move left element to the right
      this.cards[this.cardindxstart].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].style.removeProperty("opacity");
      this.cards[this.cardindxstart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardindxstart - 1].style.transform = "translateX(-365px)";
      if (this.cards[this.cardindxstart - 2] != undefined) {
        this.cards[this.cardindxstart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardindxstart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardindxstart - 2].style.display = "block";
      }
    }
    if (this.windowSize == "MEDIUM") {
      //Hide the last element in slideshow
      this.cards[this.cardsindxend].style.opacity = "0%";
      this.cards[this.cardsindxend].style.zIndex = "-1";
      this.cards[this.cardsindxend].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsindxend].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsindxend + 1] != undefined) {
        this.cards[this.cardsindxend + 1].style.display = "none";
        this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move left element to the right
      this.cards[this.cardindxstart].style.transform = "translateX(182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].style.removeProperty("opacity");
      this.cards[this.cardindxstart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardindxstart - 1].style.transform = "translateX(-182.5px)";
      if (this.cards[this.cardindxstart - 2] != undefined) {
        this.cards[this.cardindxstart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardindxstart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardindxstart - 2].style.display = "block";
      }
    }
    if (this.windowSize == "SMALL") {
      //Hide the first element in slideshow
      this.cards[this.cardindxstart].style.opacity = "0%";
      this.cards[this.cardsindxend].style.zIndex = "-1";
      this.cards[this.cardsindxend].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsindxend].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsindxend + 1] != undefined) {
        this.cards[this.cardsindxend + 1].style.display = "none";
        this.cards[this.cardsindxend + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsindxend + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move element to right
      this.cards[this.cardindxstart].style.transform = "translateX(182.5px)";

      //Move element to center
      this.cards[this.cardindxstart - 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardindxstart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardindxstart - 1].style.removeProperty("opacity");
      this.cards[this.cardindxstart - 1].style.removeProperty("display");

      if (this.cards[this.cardindxstart - 2] != undefined) {
        this.cards[this.cardindxstart - 2].style.display = "block";
        this.cards[this.cardindxstart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardindxstart - 2].children[1].children[3].setAttribute("tabindex", "-1");
      }
    }

    //Increment index counter
    this.cardindxstart--;
    this.cardsindxend--;
    this.turn--;
    this.cardcounter--;
  }
  public showHideSlideShowButtons() {
    if (this.cardindxstart == 0) {
      this.prevbtn.style.opacity = "0%";
      this.prevbtn.setAttribute("tabindex", "-1");
      return;
    }
    if (this.cardsindxend == this.cards.length - 1) {
      this.nextbtn.style.opacity = "0%";
      this.nextbtn.setAttribute("tabindex", "-1");
      return;
    }
    this.prevbtn.style.removeProperty("opacity");
    this.nextbtn.style.removeProperty("opacity");
    this.prevbtn.removeAttribute("tabindex");
    this.nextbtn.removeAttribute("tabindex");
  }
  public numberelementtext = () => {
    if (this.windowSize == "SMALL") {
      this.numberElement.innerText = this.cardcounter.toString() + " of " + this.cards.length.toString();
    } else {
      this.numberElement.innerText =
        "[" +
        this.cardcounter.toString() +
        ".." +
        (this.cardcounter + this.cardquantshow - 1).toString() +
        "]" +
        " of " +
        this.cards.length.toString();
    }
  };
  public addBtnEventListeners = () => {
    //Event listeners for the next and previous buttons
    this.nextbtn.addEventListener("click", e => {
      e.preventDefault();
      this.nextSlide();
      this.showHideSlideShowButtons();
      this.numberelementtext();
    });
    this.prevbtn.addEventListener("click", e => {
      e.preventDefault();
      this.prevSlide();
      this.showHideSlideShowButtons();
      this.numberelementtext();
    });
  };
  private hideOverflowElements() {
    //Hide overflow elements
    if (this.cardindxstart < this.cardquantshow) {
      for (let i = this.cards.length - 1; i > this.cardsindxend; i--) {
        this.cards[i].style.position = "absolute";
        this.cards[i].style.opacity = "0%";
        this.cards[i].style.display = "none";
        if (this.windowSize == "SMALL") {
          this.cards[i].style.transform = "translateX(0px)";
          continue;
        }
        if (this.windowSize == "MEDIUM") {
          this.cards[i].style.transform = "translateX(182.5px)";
          continue;
        }
        this.cards[i].style.transform = "translateX(365px)";
      }
    }
    this.cards[0].style.position = "absolute";
  }
  public onResizeShowStartingElems() {
    //screen has refreshed. counter is reset to start. card elements may be
    //hidden from the display, depending on when the refresh occurred, so
    //reset the starting elements to visible
    //Show overflow elements
    if (this.cardindxstart < this.cardquantshow) {
      for (let i = 0; i <= this.cardsindxend; i++) {
        this.cards[i].style.setProperty("opacity", "1");
        this.cards[i].style.setProperty("display", "block");
        if (this.windowSize == "SMALL") {
          this.cards[i].style.transform = "translateX(0px)";
          continue;
        }
        if (this.windowSize == "LARGE") {
          if (i == 1) {
            this.cards[i].style.transform = "translateX(0px)";
          }
          continue;
        }
      }
    }
  }
  private newContainerMarkup() {
    const newContainerStyles = () => {
      //Container styles
      slideshowslides.classList.add("slidescontainer");
      slideshowslides.style.width = "100%";
      slideshowslides.style.height = "32em";
      slideshowslides.style.display = "flex";
      slideshowslides.style.position = "relative";
      this.slideshowcontainer.style.justifyContent = "center";
    };

    //Build the markup needed for the slideshow
    //Add cards to container
    let slideshowslides = this.slideshowcontainer.appendChild(document.createElement("div"));
    for (let card of this.cards) {
      let temp = card;
      slideshowslides.insertAdjacentElement("beforeend", temp);
      newContainerStyles();
    }
    slideshowslides.classList.add(`${this.windowSize}`);
    return slideshowslides;
  }
  private newArrowsMarkup() {
    //Add left and right buttons
    let slideshowbtns = this.slideshowcontainer.appendChild(document.createElement("div"));

    //Left slideshow btn
    let previousslideshowbtn = document.createElement("button");
    previousslideshowbtn.classList.add("slideshowPrev");
    previousslideshowbtn.innerText = "❮";
    slideshowbtns.insertAdjacentElement("beforeend", previousslideshowbtn);

    //Update slideshow object
    this.prevbtn = previousslideshowbtn;

    //Right slideshow btn
    let nextslideshowbtn = document.createElement("button");
    nextslideshowbtn.classList.add("slideshowNext");
    nextslideshowbtn.innerText = "❯";
    slideshowbtns.insertAdjacentElement("beforeend", nextslideshowbtn);
    slideshowbtns.style.display = "flex";
    slideshowbtns.style.justifyContent = "center";

    //Update slideshow object
    this.nextbtn = nextslideshowbtn;

    return slideshowbtns;
  }
  private newNumberElement() {
    //Number element
    this.numberElement = document.createElement("div");

    this.numberelementtext();
    this.nextbtn.insertAdjacentElement("beforebegin", this.numberElement);
    this.numberElement.style.whiteSpace = "nowrap";
    this.numberElement.style.display = "grid";
    this.numberElement.style.alignContent = "center";
    this.numberElement.style.marginInline = "1.5rem";
  }
}

//--Copyright (c) 2023 Robert A. Howell

export default class CardsSlideShow {
  public ssContainer: HTMLDivElement;
  public arrowsContainer: HTMLDivElement;
  public prevBtn: HTMLElement;
  public nextBtn: HTMLElement;
  private cards: NodeListOf<HTMLDivElement>;
  private cardShowQuant: number;
  private cardIndxStart: number = 0;
  private cardCounter: number = 1;
  private cardsIndxEnd: number;
  private turn: number = 0;
  private maxTurnCount: number;
  private slideShowContainer: HTMLElement = document.querySelector(".cardslideshow") as HTMLElement;
  private numberElement: HTMLElement;
  private windowSize: string;

  constructor(cards: NodeListOf<HTMLDivElement>, quantityShow: number, windowSize: string) {
    this.cards = cards;
    this.cardShowQuant = quantityShow;
    this.cardsIndxEnd = this.cardShowQuant - 1;
    this.maxTurnCount = this.cards.length - this.cardShowQuant;
    this.windowSize = windowSize;

    this.hideOverflowElements();
    this.onInitSetupCardPosition();
    this.ssContainer = this.newContainerMarkup();
    this.arrowsContainer = this.newArrowsMarkup();
    this.newNumberElement();
    this.addBtnEventListeners();
    this.showHideSlideShowButtons();
  };

  public nextSlide() {
    if (this.turn == this.maxTurnCount) {
      return;
    }
    if (this.windowSize == "LARGE") {
      if (this.cards[this.cardIndxStart - 1] != undefined) {
        this.cards[this.cardIndxStart - 1].style.display = "none";
        this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardIndxStart].style.opacity = "0%";
      this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move middle element to left
      this.cards[this.cardIndxStart + 1].style.transform = "translateX(-365px)";

      //Move right to the middle
      this.cards[this.cardIndxStart + 2].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(365px)";
      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "MEDIUM") {
      if (this.cards[this.cardIndxStart - 1] != undefined) {
        this.cards[this.cardIndxStart - 1].style.display = "none";
        this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardIndxStart].style.opacity = "0%";
      this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move the right element to left
      this.cards[this.cardIndxStart + 1].style.transform = "translateX(-182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(182.5px)";
      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "SMALL") {
      if (this.cards[this.cardIndxStart - 1] != undefined) {
        this.cards[this.cardIndxStart - 1].style.display = "none";
        this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardIndxStart].style.opacity = "0%";
      this.cards[this.cardIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move element to left
      this.cards[this.cardIndxStart].style.transform = "translateX(-182.5px)";

      //Move element to center
      this.cards[this.cardIndxStart + 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("opacity");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].style.transform = "translateX(182.5px)";
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }

    //Increment index counter
    this.cardIndxStart++;
    this.cardsIndxEnd++;
    this.turn++;
    this.cardCounter++;
  };

  public prevSlide() {
    if (this.turn == 0) {
      return;
    }
    if (this.windowSize == "LARGE") {
      //Hide the last element in slideshow
      this.cards[this.cardsIndxEnd].style.opacity = "0%";
      this.cards[this.cardsIndxEnd].style.zIndex = "-1";
      this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsIndxEnd + 1] != undefined) {
        this.cards[this.cardsIndxEnd + 1].style.display = "none";
        this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move middle element to to the right
      this.cards[this.cardIndxStart + 1].style.transform = "translateX(365px)";

      //Move left element to the right
      this.cards[this.cardIndxStart].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
      this.cards[this.cardIndxStart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardIndxStart - 1].style.transform = "translateX(-365px)";
      if (this.cards[this.cardIndxStart - 2] != undefined) {
        this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardIndxStart - 2].style.display = "block";
      }
    }
    if (this.windowSize == "MEDIUM") {
      //Hide the last element in slideshow
      this.cards[this.cardsIndxEnd].style.opacity = "0%";
      this.cards[this.cardsIndxEnd].style.zIndex = "-1";
      this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsIndxEnd + 1] != undefined) {
        this.cards[this.cardsIndxEnd + 1].style.display = "none";
        this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move left element to the right
      this.cards[this.cardIndxStart].style.transform = "translateX(182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
      this.cards[this.cardIndxStart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardIndxStart - 1].style.transform = "translateX(-182.5px)";
      if (this.cards[this.cardIndxStart - 2] != undefined) {
        this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardIndxStart - 2].style.display = "block";
      }
    }
    if (this.windowSize == "SMALL") {
      //Hide the first element in slideshow
      this.cards[this.cardIndxStart].style.opacity = "0%";
      this.cards[this.cardsIndxEnd].style.zIndex = "-1";
      this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsIndxEnd + 1] != undefined) {
        this.cards[this.cardsIndxEnd + 1].style.display = "none";
        this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move element to right
      this.cards[this.cardIndxStart].style.transform = "translateX(182.5px)";

      //Move element to center
      this.cards[this.cardIndxStart - 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardIndxStart - 1].style.removeProperty("opacity");
      this.cards[this.cardIndxStart - 1].style.removeProperty("display");

      if (this.cards[this.cardIndxStart - 2] != undefined) {
        this.cards[this.cardIndxStart - 2].style.display = "block";
        this.cards[this.cardIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
      }
    }

    //Increment index counter
    this.cardIndxStart--;
    this.cardsIndxEnd--;
    this.turn--;
    this.cardCounter--;
  };

  public addBtnEventListeners = () => {
    //Event listeners for the next and previous buttons
    this.nextBtn.addEventListener("click", e => {
      e.preventDefault();
      this.nextSlide();
      this.showHideSlideShowButtons();
      this.numberArrowText();
    });
    this.prevBtn.addEventListener("click", e => {
      e.preventDefault();
      this.prevSlide();
      this.showHideSlideShowButtons();
      this.numberArrowText();
    });
  };

  public showHideSlideShowButtons() {
    if (this.cardIndxStart == 0) {
      this.prevBtn.style.opacity = "0%";
      this.prevBtn.setAttribute("tabindex", "-1");
      return;
    }
    if (this.cardsIndxEnd == this.cards.length - 1) {
      this.nextBtn.style.opacity = "0%";
      this.nextBtn.setAttribute("tabindex", "-1");
      return;
    }
    this.prevBtn.style.removeProperty("opacity");
    this.nextBtn.style.removeProperty("opacity");
    this.prevBtn.removeAttribute("tabindex");
    this.nextBtn.removeAttribute("tabindex");
  };

  public numberArrowText = () => {
    if (this.windowSize == "SMALL") {
      this.numberElement.innerText = `${this.cardCounter.toString()} of ${this.cards.length.toString()}`;
    } else {
      this.numberElement.innerText = `[${this.cardCounter.toString()}..${(this.cardCounter + this.cardShowQuant - 1).toString()}] of ${this.cards.length.toString()}`;
    }
  };

  public onResizeShowStartingElems() {
    //screen has refreshed. counter is reset to start. card elements may be
    //hidden from the display, depending on when the refresh occurred, so
    //reset the starting elements to visible
    //Show overflow elements
    if (this.cardIndxStart < this.cardShowQuant) {
      for (let i = 0; i <= this.cardsIndxEnd; i++) {
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
  };

  private hideOverflowElements() {
    //Hide overflow elements
    if (this.cardIndxStart < this.cardShowQuant) {
      for (let i = this.cards.length - 1; i > this.cardsIndxEnd; i--) {
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
  };

  private newContainerMarkup() {
    const newContainerStyles = () => {
      //Container styles
      slideShowSlides.classList.add("slidescontainer");
      slideShowSlides.style.width = "100%";
      slideShowSlides.style.height = "32em";
      slideShowSlides.style.display = "flex";
      slideShowSlides.style.position = "relative";
      this.slideShowContainer.style.justifyContent = "center";
    };

    //Build the markup needed for the slideshow
    //Add cards to container
    let slideShowSlides = this.slideShowContainer.appendChild(document.createElement("div"));
    for (let card of this.cards) {
      let temp = card;
      slideShowSlides.insertAdjacentElement("beforeend", temp);
      newContainerStyles();
    }
    slideShowSlides.classList.add(`${this.windowSize}`);
    return slideShowSlides;
  };

  private newArrowsMarkup() {
    //Add left and right buttons
    let slideshowbtns = this.slideShowContainer.appendChild(document.createElement("div"));

    //Left slideshow btn
    let previousslideshowbtn = document.createElement("button");
    previousslideshowbtn.classList.add("slideshowPrev");
    previousslideshowbtn.innerText = "❮";
    slideshowbtns.insertAdjacentElement("beforeend", previousslideshowbtn);

    //Update slideshow object
    this.prevBtn = previousslideshowbtn;

    //Right slideshow btn
    let nextslideshowbtn = document.createElement("button");
    nextslideshowbtn.classList.add("slideshowNext");
    nextslideshowbtn.innerText = "❯";
    slideshowbtns.insertAdjacentElement("beforeend", nextslideshowbtn);
    slideshowbtns.style.display = "flex";
    slideshowbtns.style.justifyContent = "center";

    //Update slideshow object
    this.nextBtn = nextslideshowbtn;

    return slideshowbtns;
  };

  private newNumberElement() {
    //Number element
    this.numberElement = document.createElement("div");

    this.numberArrowText();
    this.nextBtn.insertAdjacentElement("beforebegin", this.numberElement);
    this.numberElement.style.whiteSpace = "nowrap";
    this.numberElement.style.display = "grid";
    this.numberElement.style.alignContent = "center";
    this.numberElement.style.marginInline = "1.5rem";
  };

  private onInitSetupCardPosition(){
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
  };
  
}

//--Copyright (c) 2023 Robert A. Howell
import CardsSlideShow from "../models/CardsSlideShow";

const WebBitsSlideShow = {
  init: () => {
    if (window.location.pathname == "/pages.html") return;
    let aacards = document.querySelectorAll(
      ".cardslideshow .slide"
    ) as NodeListOf<HTMLDivElement>;
    var small = window.matchMedia("(max-width: 819px)");
    var tablet = window.matchMedia(
      "(min-width: 820px) and (max-width: 1090px)"
    );
    var windowsize: string = "";

    //Implement slideshow for arbitrary articles
    let aaslideshow: CardsSlideShow;
    if (small.matches) {
      aaslideshow = new CardsSlideShow(aacards, 1);
      windowsize = "SMALL";
    } else if (tablet.matches) {
      aaslideshow = new CardsSlideShow(aacards, 2);
      windowsize = "MEDIUM";
    } else {
      aaslideshow = new CardsSlideShow(aacards, 3);
      windowsize = "LARGE";
    }

    //Build the markup needed for the slideshow
    //Add cards to container
    let slideshowslides = aaslideshow.slideshowcontainer.appendChild(
      document.createElement("div")
    );
    for (let card of aaslideshow.cards) {
      let temp = card;
      slideshowslides.insertAdjacentElement("beforeend", temp);
    }
    //Container styles
    slideshowslides.classList.add("slidescontainer");
    slideshowslides.style.width = "100%";
    slideshowslides.style.height = "32em";
    slideshowslides.style.display = "flex";
    slideshowslides.style.position = "relative";
    aaslideshow.slideshowcontainer.style.justifyContent = "center";
    //Add left and right buttons
    let slideshowbtns = aaslideshow.slideshowcontainer.appendChild(
      document.createElement("div")
    );

    const showhideslideshowbuttons = () => {
      if (aaslideshow.cardindxstart == 0) {
        previousslideshowbtn.style.display = "none";
        return;
      }
      if (aaslideshow.cardsindxend == aaslideshow.cards.length - 1) {
        nextslideshowbtn.style.display = "none";
        return;
      }
      previousslideshowbtn.style.display = "block";
      nextslideshowbtn.style.display = "block";
    };

    //Left slideshow btn
    let previousslideshowbtn = document.createElement("button");
    previousslideshowbtn.classList.add("slideshowPrev");
    previousslideshowbtn.innerText = "❮";
    slideshowbtns.insertAdjacentElement("beforeend", previousslideshowbtn);
    //Update slideshow object
    aaslideshow.prevbtn = previousslideshowbtn;

    //Right slideshow btn
    let nextslideshowbtn = document.createElement("button");
    nextslideshowbtn.classList.add("slideshowNext");
    nextslideshowbtn.innerText = "❯";
    slideshowbtns.insertAdjacentElement("beforeend", nextslideshowbtn);
    slideshowbtns.style.display = "flex";
    slideshowbtns.style.justifyContent = "center";
    //Update slideshow object
    aaslideshow.nextbtn = nextslideshowbtn;

    //Number element
    let numberelement = document.createElement("div");
    let numberelementtext = () => {
      if (windowsize == "SMALL") {
        numberelement.innerText =
          aaslideshow.cardcounter.toString() +
          " of " +
          aaslideshow.cards.length.toString();
      } else {
        numberelement.innerText =
          "[" +
          aaslideshow.cardcounter.toString() +
          ".." +
          (aaslideshow.cardcounter + aaslideshow.cardquantshow - 1).toString() +
          "]" +
          " of " +
          aaslideshow.cards.length.toString();
      }
    };
    numberelementtext();
    nextslideshowbtn.insertAdjacentElement("beforebegin", numberelement);
    numberelement.style.whiteSpace = "nowrap";
    numberelement.style.display = "grid";
    numberelement.style.alignContent = "center";
    numberelement.style.marginInline = "1.5rem";
    showhideslideshowbuttons();

    //Hide overflow elements
    if (aaslideshow.cardindxstart < aaslideshow.cardquantshow) {
      for (
        let i = aaslideshow.cards.length - 1;
        i > aaslideshow.cardsindxend;
        i--
      ) {
        aaslideshow.cards[i].style.position = "absolute";
        aaslideshow.cards[i].style.opacity = "0%";
        aaslideshow.cards[i].style.display = "none";
        if (windowsize == "SMALL") {
          aaslideshow.cards[i].style.transform = "translateX(0px)";
          continue;
        }
        if (windowsize == "MEDIUM") {
          aaslideshow.cards[i].style.transform = "translateX(182.5px)";
          continue;
        }
        aaslideshow.cards[i].style.transform = "translateX(365px)";
      }
    }
    aaslideshow.cards[0].style.position = "absolute";
    aaslideshow.cards[0].style.opacity = "100%";
    aaslideshow.cards[1].style.display = "block";

    if (windowsize == "LARGE") {
      aaslideshow.cards[0].style.transform = "translateX(-365px)";
      aaslideshow.cards[1].style.position = "absolute";
      aaslideshow.cards[1].style.opacity = "100%";
      aaslideshow.cards[2].style.position = "absolute";
      aaslideshow.cards[2].style.opacity = "100%";
      aaslideshow.cards[2].style.transform = "translateX(365px)";
      aaslideshow.cards[2].style.display = "block";
      aaslideshow.cards[3].style.display = "block";
      aaslideshow.cards[3].children[1].children[2].setAttribute(
        "tabindex",
        "-1"
      );
      aaslideshow.cards[3].children[1].children[3].setAttribute(
        "tabindex",
        "-1"
      );
    }
    if (windowsize == "MEDIUM") {
      aaslideshow.cards[0].style.transform = "translateX(-182.5px)";
      aaslideshow.cards[1].style.position = "absolute";
      aaslideshow.cards[1].style.opacity = "100%";
      aaslideshow.cards[1].style.transform = "translateX(182.5px)";
      aaslideshow.cards[2].style.display = "block";
      aaslideshow.cards[2].children[1].children[2].setAttribute(
        "tabindex",
        "-1"
      );
      aaslideshow.cards[2].children[1].children[3].setAttribute(
        "tabindex",
        "-1"
      );
    }
    if (windowsize == "SMALL") {
      aaslideshow.cards[1].style.transform = "translateX(182.5px)";
      aaslideshow.cards[1].children[1].children[2].setAttribute(
        "tabindex",
        "-1"
      );
      aaslideshow.cards[1].children[1].children[3].setAttribute(
        "tabindex",
        "-1"
      );
    }

    //Next/previous button event listeners
    aaslideshow.nextbtn.addEventListener("click", e => {
      e.preventDefault();
      WebBitsSlideShow.next(aaslideshow, windowsize);
      showhideslideshowbuttons();
      numberelementtext();
    });
    aaslideshow.prevbtn.addEventListener("click", e => {
      e.preventDefault();
      WebBitsSlideShow.prev(aaslideshow, windowsize);
      showhideslideshowbuttons();
      numberelementtext();
    });
  },
  next: (slideshow: CardsSlideShow, windowsize: string) => {
    if (slideshow.turn == slideshow.maxturncount) {
      return;
    }
    if (windowsize == "LARGE") {
      if (slideshow.cards[slideshow.cardindxstart - 1] != undefined) {
        slideshow.cards[slideshow.cardindxstart - 1].style.display = "none";
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      slideshow.cards[slideshow.cardindxstart].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[3].setAttribute("tabindex", "-1");

      //Move middle element to left
      slideshow.cards[slideshow.cardindxstart + 1].style.transform =
        "translateX(-365px)";
      //Move right to the middle
      slideshow.cards[slideshow.cardindxstart + 2].style.transform =
        "translateX(0px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardsindxend + 1].style.opacity = "100%";
      //Move in new element
      slideshow.cards[slideshow.cardsindxend + 1].style.transform =
        "translateX(365px)";
      if (slideshow.cards[slideshow.cardsindxend + 2] != undefined) {
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
        slideshow.cards[slideshow.cardsindxend + 2].style.display = "block";
      }
    }
    if (windowsize == "MEDIUM") {
      if (slideshow.cards[slideshow.cardindxstart - 1] != undefined) {
        slideshow.cards[slideshow.cardindxstart - 1].style.display = "none";
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      slideshow.cards[slideshow.cardindxstart].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[3].setAttribute("tabindex", "-1");
      //Move the right element to left
      slideshow.cards[slideshow.cardindxstart + 1].style.transform =
        "translateX(-182.5px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardsindxend + 1].style.opacity = "100%";
      //Move in new element
      slideshow.cards[slideshow.cardsindxend + 1].style.transform =
        "translateX(182.5px)";
      if (slideshow.cards[slideshow.cardsindxend + 2] != undefined) {
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
        slideshow.cards[slideshow.cardsindxend + 2].style.display = "block";
      }
    }
    if (windowsize == "SMALL") {
      if (slideshow.cards[slideshow.cardindxstart - 1] != undefined) {
        slideshow.cards[slideshow.cardindxstart - 1].style.display = "none";
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardindxstart - 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      slideshow.cards[slideshow.cardindxstart].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardindxstart
      ].children[1].children[3].setAttribute("tabindex", "-1");
      //Move element to left
      slideshow.cards[slideshow.cardindxstart].style.transform =
        "translateX(-182.5px)";
      //Move element to center
      slideshow.cards[slideshow.cardindxstart + 1].style.transform =
        "translateX(0px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardsindxend + 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardsindxend + 1].style.opacity = "100%";
      if (slideshow.cards[slideshow.cardsindxend + 2] != undefined) {
        slideshow.cards[slideshow.cardsindxend + 2].style.transform =
          "translateX(182.5px)";
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardsindxend + 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
        slideshow.cards[slideshow.cardsindxend + 2].style.display = "block";
      }
    }

    //Increment index counter
    slideshow.cardindxstart++;
    slideshow.cardsindxend++;
    slideshow.turn++;
    slideshow.cardcounter++;
  },
  prev: (slideshow: CardsSlideShow, windowsize: string) => {
    if (slideshow.turn == 0) {
      return;
    }
    if (windowsize == "LARGE") {
      //Hide the last element in slideshow
      slideshow.cards[slideshow.cardsindxend].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[3].setAttribute("tabindex", "-1");
      if (slideshow.cards[slideshow.cardsindxend + 1] != undefined) {
        slideshow.cards[slideshow.cardsindxend + 1].style.display = "none";
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Move middle element to to the right
      slideshow.cards[slideshow.cardindxstart + 1].style.transform =
        "translateX(365px)";
      //Move left element to the right
      slideshow.cards[slideshow.cardindxstart].style.transform =
        "translateX(0px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardindxstart - 1].style.opacity = "100%";
      //Move in new element
      slideshow.cards[slideshow.cardindxstart - 1].style.transform =
        "translateX(-365px)";
      if (slideshow.cards[slideshow.cardindxstart - 2] != undefined) {
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
        slideshow.cards[slideshow.cardindxstart - 2].style.display = "block";
      }
    }
    if (windowsize == "MEDIUM") {
      //Hide the last element in slideshow
      slideshow.cards[slideshow.cardsindxend].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[3].setAttribute("tabindex", "-1");
      if (slideshow.cards[slideshow.cardsindxend + 1] != undefined) {
        slideshow.cards[slideshow.cardsindxend + 1].style.display = "none";
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Move left element to the right
      slideshow.cards[slideshow.cardindxstart].style.transform =
        "translateX(182.5px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardindxstart - 1].style.opacity = "100%";
      //Move in new element
      slideshow.cards[slideshow.cardindxstart - 1].style.transform =
        "translateX(-182.5px)";
      if (slideshow.cards[slideshow.cardindxstart - 2] != undefined) {
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
        slideshow.cards[slideshow.cardindxstart - 2].style.display = "block";
      }
    }
    if (windowsize == "SMALL") {
      //Hide the first element in slideshow
      slideshow.cards[slideshow.cardindxstart].style.opacity = "0%";
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[2].setAttribute("tabindex", "-1");
      slideshow.cards[
        slideshow.cardsindxend
      ].children[1].children[3].setAttribute("tabindex", "-1");
      if (slideshow.cards[slideshow.cardsindxend + 1] != undefined) {
        slideshow.cards[slideshow.cardsindxend + 1].style.display = "none";
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[2].removeAttribute("tabindex");
        slideshow.cards[
          slideshow.cardsindxend + 1
        ].children[1].children[3].removeAttribute("tabindex");
      }
      //Move element to right
      slideshow.cards[slideshow.cardindxstart].style.transform =
        "translateX(182.5px)";
      //Move element to center
      slideshow.cards[slideshow.cardindxstart - 1].style.transform =
        "translateX(0px)";
      //Display the next element for slideshow
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[2].removeAttribute("tabindex");
      slideshow.cards[
        slideshow.cardindxstart - 1
      ].children[1].children[3].removeAttribute("tabindex");
      slideshow.cards[slideshow.cardindxstart - 1].style.opacity = "100%";
      if (slideshow.cards[slideshow.cardindxstart - 2] != undefined) {
        slideshow.cards[slideshow.cardindxstart - 2].style.display = "block";
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[2].setAttribute("tabindex", "-1");
        slideshow.cards[
          slideshow.cardindxstart - 2
        ].children[1].children[3].setAttribute("tabindex", "-1");
      }
    }

    //Increment index counter
    slideshow.cardindxstart--;
    slideshow.cardsindxend--;
    slideshow.turn--;
    slideshow.cardcounter--;
  },
};

export default WebBitsSlideShow;

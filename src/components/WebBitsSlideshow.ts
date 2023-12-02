//--Copyright (c) 2023 Robert A. Howell
import CardsSlideShow from "../models/CardsSlideShow";

const WebBitsSlideShow = {
  init: () => {
    if (window.location.pathname == "/pages.html") return;
    let aacards = document.querySelectorAll(".cardslideshow .slide") as NodeListOf<HTMLDivElement>;
    var small = window.matchMedia("(max-width: 819px)");
    var tablet = window.matchMedia("(min-width: 820px) and (max-width: 1090px)");

    //Implement slideshow for arbitrary articles
    let aaslideshow: CardsSlideShow;

    //Based on the matched media size, create a small, medium, or large slideshow
    if (small.matches) {
      aaslideshow = new CardsSlideShow(aacards, 1, "SMALL");
    } else if (tablet.matches) {
      aaslideshow = new CardsSlideShow(aacards, 2, "MEDIUM");
    } else {
      aaslideshow = new CardsSlideShow(aacards, 3, "LARGE");
    }

    //Event listeners for the next and previous buttons
    aaslideshow.nextbtn.addEventListener("click", e => {
      e.preventDefault();
      aaslideshow.nextSlide();
      aaslideshow.showHideSlideShowButtons();
      aaslideshow.numberelementtext();
    });
    aaslideshow.prevbtn.addEventListener("click", e => {
      e.preventDefault();
      aaslideshow.prevSlide();
      aaslideshow.showHideSlideShowButtons();
      aaslideshow.numberelementtext();
    });
  },
};

export default WebBitsSlideShow;

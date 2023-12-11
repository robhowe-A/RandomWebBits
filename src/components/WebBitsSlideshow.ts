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
    let aaslideshowmed: CardsSlideShow;
    let aaslideshowlarge: CardsSlideShow;

    //Based on the matched media size, create a small, medium, or large slideshow
    let currentslideshow: CardsSlideShow;
    //Based on the matched media size, create a small, medium, or large slideshow
    if (small.matches) {
      aaslideshow = new CardsSlideShow(aacards, 1, "SMALL");
      currentslideshow = aaslideshow;
    } else if (tablet.matches) {
      aaslideshowmed = new CardsSlideShow(aacards, 2, "MEDIUM");
      currentslideshow = aaslideshowmed;
    } else {
      aaslideshowlarge = new CardsSlideShow(aacards, 3, "LARGE");
      currentslideshow = aaslideshowlarge;
    }
    window.addEventListener("resize", e => {
      e.preventDefault();
      if (window.matchMedia("(max-width: 819px)").matches) {
        console.debug(`Small size: ${window.innerWidth}`);
      }
      if (window.matchMedia("(min-width: 820px) and (max-width: 1090px)").matches) {
        console.debug(`Medium size: ${window.innerWidth}`);
      }
      if (window.matchMedia("(min-width: 1091px)").matches) {
        console.debug(`Large size: ${window.innerWidth}`);
      }
    });

    //Event listeners for the next and previous buttons
    currentslideshow.nextbtn.addEventListener("click", e => {
      e.preventDefault();
      currentslideshow.nextSlide();
      currentslideshow.showHideSlideShowButtons();
      currentslideshow.numberelementtext();
    });
    currentslideshow.prevbtn.addEventListener("click", e => {
      e.preventDefault();
      currentslideshow.prevSlide();
      currentslideshow.showHideSlideShowButtons();
      currentslideshow.numberelementtext();
    });
  },
};

export default WebBitsSlideShow;

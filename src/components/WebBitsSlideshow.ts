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
      let slideshowsmall = document.querySelector(".slidescontainer.SMALL");
      let slideshowmedium = document.querySelector(".slidescontainer.MEDIUM");
      let slideshowlarge = document.querySelector(".slidescontainer.LARGE");

      if (window.matchMedia("(max-width: 819px)").matches) {
        if (slideshowmedium != null) {
          slideshowmedium.remove();
          console.debug(`Removed med slideshow ${slideshowmedium}`);
        }
        if (slideshowlarge != null) {
          slideshowlarge.remove();
          console.debug(`Removed large slideshow ${slideshowlarge}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(aacards, 1, "SMALL");
        currentslideshow.onResizeShowStartingElems();
      }
      if (window.matchMedia("(min-width: 820px) and (max-width: 1090px)").matches) {
        if (slideshowsmall != null) {
          slideshowsmall.remove();
          console.debug(`Removed small slideshow ${slideshowsmall}`);
        }
        if (slideshowlarge != null) {
          slideshowlarge.remove();
          console.debug(`Removed large slideshow ${slideshowlarge}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(aacards, 2, "MEDIUM");
        currentslideshow.onResizeShowStartingElems();
      }
      if (window.matchMedia("(min-width: 1091px)").matches) {
        if (slideshowsmall != null) {
          slideshowsmall.remove();
          console.debug(`Removed small element ${slideshowsmall}`);
        }
        if (slideshowmedium != null) {
          slideshowmedium.remove();
          console.debug(`Removed medium element ${slideshowmedium}`);
        }
        currentslideshow.ssContainer.remove();
        currentslideshow.arrowsContainer.remove();
        currentslideshow = new CardsSlideShow(aacards, 3, "LARGE");
        currentslideshow.onResizeShowStartingElems();
      }
    });
  },
};

export default WebBitsSlideShow;

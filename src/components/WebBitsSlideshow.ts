//--Copyright (c) 2023 Robert A. Howell
import CardsSlideShow from "../models/CardsSlideShow";

const WebBitsSlideShow = {
    init: () => {
        if (window.location.pathname == '/pages.html') return;
        //implement the slideshow for arbitrary articles
        let aacards = document.querySelectorAll(".cardslideshow .slide") as NodeListOf<HTMLDivElement>;
        let aaslideshow = new CardsSlideShow(aacards, 3);

        //Style the container
        let slideshowslides = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        for (let card of aaslideshow.cards){
            let temp = card;
            slideshowslides.insertAdjacentElement("beforeend", temp);
        }
        slideshowslides.classList.add("slidescontainer");
        slideshowslides.style.width = "100%";
        slideshowslides.style.display = "flex";
        aaslideshow.slideshowcontainer.style.justifyContent = "center";

        let slideshowbtns = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));

        //build the markup needed for the slideshow
        //left slideshow btn
        let previousslideshowbtn = document.createElement("a");
        previousslideshowbtn.classList.add('slideshowPrev');
        previousslideshowbtn.innerText = "❮";
        slideshowbtns.insertAdjacentElement('beforeend', previousslideshowbtn);
        aaslideshow.prevbtn = previousslideshowbtn;
        //right slideshow btn
        let nextslideshowbtn = document.createElement("a");
        nextslideshowbtn.classList.add('slideshowNext');
        nextslideshowbtn.innerText = "❯";
        slideshowbtns.insertAdjacentElement('beforeend', nextslideshowbtn);
        slideshowbtns.style.display = "flex";
        slideshowbtns.style.justifyContent = "center";

        aaslideshow.nextbtn = nextslideshowbtn;

        //hide unneeded elements
        if (aaslideshow.cardindxstart < aaslideshow.cardquantshow){
            for(let i = aaslideshow.cards.length - 1; i > aaslideshow.cardsindxend; i--){
                aaslideshow.cards[i].style.display = "none";
            }
        }

        //add previous/next btn event listeners
        aaslideshow.prevbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.prev(aaslideshow);
        })
        aaslideshow.nextbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.next(aaslideshow);
        })
    },
    next: (slideshow: CardsSlideShow) => {
        if (slideshow.turn == slideshow.maxturncount){
            return;
        }
        //hide the first element in slideshow
        slideshow.cards[slideshow.cardindxstart].style.display = "none";
        //display the next element for slideshow
        slideshow.cards[slideshow.cardsindxend + 1].style.display = "block";
        //increment index counter
        slideshow.cardindxstart++;
        slideshow.cardsindxend++;
        slideshow.turn++;

    },
    prev: (slideshow: CardsSlideShow) => {
        if(slideshow.turn == 0){
            return;
        }
        //swap in previous element
        //hide the first element in slideshow
        slideshow.cards[slideshow.cardsindxend].style.display = "none";
        //display the next element for slideshow
        let temp = slideshow.cards[slideshow.cardindxstart - 1];
        temp.style.display = "block";
        //increment index counter
        slideshow.cardindxstart--;
        slideshow.cardsindxend--;
        slideshow.turn--;
    }
}

export default WebBitsSlideShow;
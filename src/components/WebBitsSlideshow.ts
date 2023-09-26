//--Copyright (c) 2023 Robert A. Howell
import CardsSlideShow from "../models/CardsSlideShow";

const WebBitsSlideShow = {
    init: () => {
        if (window.location.pathname == '/pages.html') return;
        //Implement slideshow for arbitrary articles
        let aacards = document.querySelectorAll(".cardslideshow .slide") as NodeListOf<HTMLDivElement>;
        let aaslideshow = new CardsSlideShow(aacards, 3);

        //Build the markup needed for the slideshow
        //Style the container
        let slideshowslides = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        for (let card of aaslideshow.cards){
            let temp = card;
            slideshowslides.insertAdjacentElement("beforeend", temp);
        }
        slideshowslides.classList.add("slidescontainer");
        slideshowslides.style.width = "100%";
        slideshowslides.style.height = "32em";
        slideshowslides.style.display = "flex";
        slideshowslides.style.position = "relative";

        aaslideshow.slideshowcontainer.style.justifyContent = "center";
        let slideshowbtns = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        
        //Left slideshow btn
        let previousslideshowbtn = document.createElement("a");
        previousslideshowbtn.classList.add('slideshowPrev');
        previousslideshowbtn.innerText = "❮";
        slideshowbtns.insertAdjacentElement('beforeend', previousslideshowbtn);
        aaslideshow.prevbtn = previousslideshowbtn;
        //Right slideshow btn
        let nextslideshowbtn = document.createElement("a");
        nextslideshowbtn.classList.add('slideshowNext');
        nextslideshowbtn.innerText = "❯";
        slideshowbtns.insertAdjacentElement('beforeend', nextslideshowbtn);
        slideshowbtns.style.display = "flex";
        slideshowbtns.style.justifyContent = "center";
        aaslideshow.nextbtn = nextslideshowbtn;

        //Hide overflow elements
        if (aaslideshow.cardindxstart < aaslideshow.cardquantshow){
            for(let i = aaslideshow.cards.length - 1; i > aaslideshow.cardsindxend; i--){
                aaslideshow.cards[i].style.position = "absolute";
                aaslideshow.cards[i].style.opacity = "0";
            }
        }
        aaslideshow.cards[0].style.position = "absolute";
        aaslideshow.cards[0].style.opacity = "100";
        aaslideshow.cards[0].style.marginRight = "60%";
        aaslideshow.cards[1].style.position = "absolute";
        aaslideshow.cards[1].style.opacity = "100";
        aaslideshow.cards[2].style.position = "absolute";
        aaslideshow.cards[2].style.opacity = "100";
        aaslideshow.cards[2].style.marginLeft = "60%";

        //Previous/next button event listeners
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
        //Hide the first element in slideshow
        slideshow.cards[slideshow.cardindxstart].style.opacity = "0";
        //move middle element to left
        slideshow.cards[slideshow.cardindxstart+1].style.marginRight = "60%";
        //move right to the middle
        slideshow.cards[slideshow.cardindxstart+2].style.margin = "0";

        //Display the next element for slideshow
        slideshow.cards[slideshow.cardsindxend + 1].style.opacity = "100";
        //move in new to the right
        slideshow.cards[slideshow.cardsindxend + 1].style.marginLeft = "60%";
        //set up next to appear
        //slideshow.cards[slideshow.cardsindxend + 2].style.marginLeft = "160%";


        //Increment index counter
        slideshow.cardindxstart++;
        slideshow.cardsindxend++;
        slideshow.turn++;

    },
    prev: (slideshow: CardsSlideShow) => {
        if(slideshow.turn == 0){
            return;
        }
        //Hide the last element in slideshow
        slideshow.cards[slideshow.cardsindxend].style.opacity = "0";

        //Display the next element for slideshow
        let temp = slideshow.cards[slideshow.cardindxstart - 1];
        temp.style.opacity = "100";
        temp.style.marginRight = "60%";

        //move card elements
        //slideshow.cards[slideshow.cardindxstart-1].style.marginRight = "80%";
        slideshow.cards[slideshow.cardindxstart].style.margin = "0";
        //set up next to appear
        slideshow.cards[slideshow.cardindxstart+1].style.marginLeft = "60%";


        //Increment index counter
        slideshow.cardindxstart--;
        slideshow.cardsindxend--;
        slideshow.turn--;
    }
}

export default WebBitsSlideShow;
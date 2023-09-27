//--Copyright (c) 2023 Robert A. Howell
import CardsSlideShow from "../models/CardsSlideShow";

const WebBitsSlideShow = {
    init: () => {
        if (window.location.pathname == '/pages.html') return;
        let aacards = document.querySelectorAll(".cardslideshow .slide") as NodeListOf<HTMLDivElement>;
        var small = window.matchMedia("(max-width: 819px)");
        var tablet = window.matchMedia("(min-width: 820px) and (max-width: 1090px)");
        var windowsize:string = "";

        //Implement slideshow for arbitrary articles
        let aaslideshow: CardsSlideShow;
        if (small.matches){
            aaslideshow = new CardsSlideShow(aacards, 1);
            windowsize = "SMALL";
        }
        else if(tablet.matches){
            aaslideshow = new CardsSlideShow(aacards, 2);
            windowsize = "MEDIUM";
        }
        else {
            aaslideshow = new CardsSlideShow(aacards, 3);
            windowsize = "LARGE";
        }

        //Build the markup needed for the slideshow
        //Add cards to container
        let slideshowslides = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));
        for (let card of aaslideshow.cards){
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
        let slideshowbtns = aaslideshow.slideshowcontainer.appendChild(document.createElement("div"));

        //Left slideshow btn
        let previousslideshowbtn = document.createElement("a");
        previousslideshowbtn.classList.add('slideshowPrev');
        previousslideshowbtn.innerText = "❮";
        slideshowbtns.insertAdjacentElement('beforeend', previousslideshowbtn);
        //Update slideshow object
        aaslideshow.prevbtn = previousslideshowbtn;

        //Right slideshow btn
        let nextslideshowbtn = document.createElement("a");
        nextslideshowbtn.classList.add('slideshowNext');
        nextslideshowbtn.innerText = "❯";
        slideshowbtns.insertAdjacentElement('beforeend', nextslideshowbtn);
        slideshowbtns.style.display = "flex";
        slideshowbtns.style.justifyContent = "center";
        //Update slideshow object
        aaslideshow.nextbtn = nextslideshowbtn;

        //Hide overflow elements
        if (aaslideshow.cardindxstart < aaslideshow.cardquantshow){
            for(let i = aaslideshow.cards.length - 1; i > aaslideshow.cardsindxend; i--){
                aaslideshow.cards[i].style.position = "absolute";
                aaslideshow.cards[i].style.opacity = "0";
                if(windowsize == "SMALL"){
                    aaslideshow.cards[i].style.transform = "translateX(0px)";
                    continue;
                }
                if(windowsize == "MEDIUM"){
                    aaslideshow.cards[i].style.transform = "translateX(182.5px)";
                    continue;
                }
                aaslideshow.cards[i].style.transform = "translateX(365px)";
            }
        }
        if (windowsize == "LARGE"){
            aaslideshow.cards[0].style.position = "absolute";
            aaslideshow.cards[0].style.opacity = "100";
            aaslideshow.cards[0].style.transform = "translateX(-365px)";
            aaslideshow.cards[1].style.position = "absolute";
            aaslideshow.cards[1].style.opacity = "100";
            aaslideshow.cards[2].style.position = "absolute";
            aaslideshow.cards[2].style.opacity = "100";
            aaslideshow.cards[2].style.transform = "translateX(365px)";
        }
        if (windowsize == "MEDIUM"){
            aaslideshow.cards[0].style.position = "absolute";
            aaslideshow.cards[0].style.opacity = "100";
            aaslideshow.cards[0].style.transform = "translateX(-182.5px)";
            aaslideshow.cards[1].style.position = "absolute";
            aaslideshow.cards[1].style.opacity = "100";
            aaslideshow.cards[1].style.transform = "translateX(182.5px)";
        }

        //Previous/next button event listeners
        aaslideshow.prevbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.prev(aaslideshow, windowsize);
        })
        aaslideshow.nextbtn.addEventListener("click", (e) => {
            e.preventDefault();
            WebBitsSlideShow.next(aaslideshow, windowsize);
        })
    },
    next: (slideshow: CardsSlideShow, windowsize:string) => {
        if (slideshow.turn == slideshow.maxturncount){
            return;
        }
        if(windowsize == "LARGE"){
            //Hide the first element in slideshow
            slideshow.cards[slideshow.cardindxstart].style.opacity = "0";
            //move middle element to left
            slideshow.cards[slideshow.cardindxstart+1].style.transform = "translateX(-365px)";
            //move right to the middle
            slideshow.cards[slideshow.cardindxstart+2].style.transform = "translateX(0px)";
            //Display the next element for slideshow
            slideshow.cards[slideshow.cardsindxend+1].style.opacity = "100";
            //move in new to the right
            slideshow.cards[slideshow.cardsindxend+1].style.transform = "translateX(365px)";
        }
        if(windowsize == "MEDIUM"){
            //Hide the first element in slideshow
            slideshow.cards[slideshow.cardindxstart].style.opacity = "0";
            //Move the right element to left
            slideshow.cards[slideshow.cardindxstart+1].style.transform = "translateX(-182.5px)";
            //Display the next element for slideshow
            slideshow.cards[slideshow.cardsindxend+1].style.opacity = "100";
            //Move in new element
            slideshow.cards[slideshow.cardsindxend+1].style.transform = "translateX(182.5px)";
        }
        if(windowsize == "SMALL"){
            //Move element to left
            slideshow.cards[slideshow.cardindxstart].style.transform = "translateX(-182.5px)";
            //Hide the first element in slideshow
            slideshow.cards[slideshow.cardindxstart].style.opacity = "0";
            slideshow.cards[slideshow.cardindxstart].style.display = "none";
            //Display the next element for slideshow
            slideshow.cards[slideshow.cardsindxend+1].style.display = "block";
            slideshow.cards[slideshow.cardsindxend+1].style.opacity = "100";
            //Move element to center
            slideshow.cards[slideshow.cardindxstart+1].style.transform = "translateX(0px)";
        }

        //Increment index counter
        slideshow.cardindxstart++;
        slideshow.cardsindxend++;
        slideshow.turn++;

    },
    prev: (slideshow: CardsSlideShow, windowsize:string) => {
        if(slideshow.turn == 0){
            return;
        }
        if(windowsize == "LARGE"){
            //Hide the last element in slideshow
            slideshow.cards[slideshow.cardsindxend].style.opacity = "0";

            //Display the next element for slideshow
            let temp = slideshow.cards[slideshow.cardindxstart - 1];
            temp.style.opacity = "100";
            temp.style.transform = "translateX(-365px)";

            //move left element to the right
            slideshow.cards[slideshow.cardindxstart].style.transform = "translateX(0px)";
            //move middle element to to the right
            slideshow.cards[slideshow.cardindxstart+1].style.transform = "translateX(365px)";
        }
        if(windowsize == "MEDIUM"){
            //Hide the last element in slideshow
            slideshow.cards[slideshow.cardsindxend].style.opacity = "0";
            //move left element to the right
            slideshow.cards[slideshow.cardindxstart].style.transform = "translateX(182.5px)";
            //Display the next element for slideshow
            let temp = slideshow.cards[slideshow.cardindxstart - 1];
            temp.style.opacity = "100";
            temp.style.transform = "translateX(-182.5px)";
        }
        if(windowsize == "SMALL"){
            //Move element to left
            slideshow.cards[slideshow.cardindxstart].style.transform = "translateX(182.5px)";
            //Hide the first element in slideshow
            slideshow.cards[slideshow.cardindxstart].style.opacity = "0";
            slideshow.cards[slideshow.cardindxstart].style.display = "none";
            //Display the next element for slideshow
            let temp = slideshow.cards[slideshow.cardindxstart - 1];
            temp.style.display = "block";
            temp.style.opacity = "100";
            //Move element to center
            temp.style.transform = "translateX(0px)";
        }

        //Increment index counter
        slideshow.cardindxstart--;
        slideshow.cardsindxend--;
        slideshow.turn--;
    }
}

export default WebBitsSlideShow;
//--Copyright (c) 2023 Robert A. Howell

export default class CardsSlideShow {
    cards:NodeListOf<HTMLDivElement>;
    cardquantshow: number;
    cardindxstart: number = 0;
    cardsindxend: number;
    turn: number = 0;
    maxturncount: number;
    slideshowcontainer:HTMLElement = document.querySelector(".cardslideshow") as HTMLElement;
    prevbtn: HTMLElement;
    nextbtn: HTMLElement;

    constructor (cards: NodeListOf<HTMLDivElement>, quantityshow: number){
        this.cards = cards
        this.cardquantshow = quantityshow;
        this.cardsindxend = this.cardquantshow - 1;
        this.maxturncount = this.cards.length - this.cardquantshow;
    }
}
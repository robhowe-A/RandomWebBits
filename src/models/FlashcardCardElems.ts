//--Copyright (c) 2023 Robert A. Howell

// This object creates an array of divs from input port number information
export default class FlashcardCardElems {
    public m_flashcardsArr: HTMLLIElement[] = [];
    private m_portInfoMap: Map<any, string>

    constructor(portnumbersMap: Map<any, string>) {
        this.m_portInfoMap = portnumbersMap;
        const mapIter = this.m_portInfoMap.keys();

        this.m_portInfoMap.forEach( (port) => { 
            // Create list element
            let flashcard = document.createElement("li");
            //TODO: let flashcard = new GrowingCardElement();
            //Unable to instantiate li element as growing card due to DOM unavalable --> requires shadowDOM manipulate
            
            // Populate element for page use
            const inner = flashcard.appendChild(document.createElement("div"));
            const flipfront = inner.appendChild(document.createElement("div"));
            const flipback = inner.appendChild(document.createElement("div"));
            let gameCardSpan = flipfront.appendChild(document.createElement("span"));
            let gameCardBackSpan = flipback.appendChild(document.createElement("span"));
            flashcard.classList.add("flip-card", "gameCard")
            inner.classList.add("inner", "vertical");
            flipfront.classList.add("cardFront");
            flipback.classList.add("cardBack", "vertical");
            gameCardSpan.innerText = `Port# ${mapIter.next().value}`;
            gameCardBackSpan.innerText = `${port}`;

            // Add div to flashcard instance
            this.m_flashcardsArr.push(flashcard);
        })
    }
}

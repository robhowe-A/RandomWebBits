
class GrowingCard extends HTMLLIElement {
    private isGrown: boolean = false;
    // private static hasLink;
    // private static hadDetails;
    // private static hasDescription;
    
    constructor() {
        super();
        this.addEventListener('click', this.growCard);
    }
    
    public static shrinkCard = (li: GrowingCard) => { //TODO: check class property
        if (li.style.scale){
            li.style.scale = "1";
            li.style.zIndex = "1";
            li.setIsGrown(false);
        }
    }

    public static shadeInactiveCard = (li: GrowingCard) => {
        if(GrowingCard.getIsAtLeastOneBig()){
            if(!li.getIsGrown()){
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    li.style.opacity = ".5";
                }
                else {
                    li.style.opacity = ".3";
                }
            }
            else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    li.style.opacity = "1";
                }
                else {
                    li.style.opacity = "1";
                }
            }
        }
        else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                li.style.opacity = "1";
            }
            else {
                li.style.opacity = "1";
            }
        }
    }
    
    public static getIsAtLeastOneBig = () => {
        let listLIs: GrowingCard[]  = Array.from(document.querySelectorAll(`#webIDECards li`));
        let atLeastOneIsBig = listLIs.some((li) => li.getIsGrown() == true);
        return atLeastOneIsBig;
    }

    public getIsGrown = () => {
        return this.isGrown;
    }
    
    private setIsGrown = (truefalse: boolean) => {
        return this.isGrown = truefalse;
    }
    
    private growCard = () => {
        this.style.scale = "1.2";
        this.style.zIndex = "2";
        this.style.opacity = "1";
        this.setIsGrown(true);

        // Need all the list elements to reference which one to grow
        // If it's not the clicked element, shrink it.
        let listLIs = (document.querySelectorAll("#webIDECards li") as NodeListOf<HTMLElement>);
        for (let item of listLIs) {
            if (item !== this){
                GrowingCard.shrinkCard((item as GrowingCard));
                GrowingCard.shadeInactiveCard((item as GrowingCard));

                // set the scale property for each card
                if (item.style.scale == ""){
                    item.style.scale = "1";
                    item.style.zIndex = "1";
                }
            }
        }
    }

}

const activeCard = {
    init: () => {
        customElements.define('growing-card', GrowingCard, { extends: 'li' });

        document.body.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Array of list items (cards)
            let listLIs: GrowingCard[]  = Array.from(document.querySelectorAll("#webIDECards li"));

            // Click event to resize the cards if clicking outside of a card
            // When clicking outside a card, resize all cards to normal
            for (let item of listLIs) {
                let tempItem: GrowingCard = item;
                if (e.target !== tempItem && !tempItem.contains(e.target as Node)){
                    GrowingCard.shrinkCard(tempItem);
                }
            }

            // Reshade all cards because none of them are big
            for (let li of listLIs){
                GrowingCard.shadeInactiveCard(li);
            }

        })
    }
}

export default activeCard;
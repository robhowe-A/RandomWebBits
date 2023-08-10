//--Copyright (c) 2023 Robert A. Howell

const htmlexColorCode = {
    HTMLEXColorCode: () => {
        const openers = document.querySelectorAll(".Tagopen") as NodeListOf<HTMLElement>;
        const closers = document.querySelectorAll(".Tagclose") as NodeListOf<HTMLElement>;
        const values = document.querySelectorAll(".TextVal") as NodeListOf<HTMLElement>;
        const attributes = document.querySelectorAll(".Attribute") as NodeListOf<HTMLElement>;
        const resetBTN = document.querySelector(".reset");

        
        htmlexColorCode.CSSExampleHighlighting(openers, "var(--clr-WhoIS_Orange)");
        htmlexColorCode.CSSExampleHighlighting(closers, "var(--clr-Red)");
        htmlexColorCode.CSSExampleHighlighting(values, "var(--clr-DarkCyan)");
        htmlexColorCode.CSSExampleHighlighting(attributes, "var(--clr-Green)");

        //function to reset the css code properties color to original
        resetBTN.addEventListener("click", ()=>{
            openers.forEach((selector)=>{
                selector.style.color = "initial";
            });
            closers.forEach((attribute)=>{
                attribute.style.color = "initial";
            });
            values.forEach((value)=>{
                value.style.color = "initial";
            });
            attributes.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
        })
    },
    /**
     * Function to color the example area's elements using css
     */
    CSSExampleHighlighting: (items:  NodeListOf<HTMLElement>, color: string) =>{
        items.forEach((item)=>{
            item.addEventListener("mouseover", (event)=>{
                event.preventDefault();
                items.forEach((item)=>{
                    item.style.color = color;
                });
            })
            item.addEventListener("click", (event)=>{
                event.preventDefault();
                items.forEach((item)=>{
                    item.style.color = "initial";
                });
            })
        })
    }
}

export default htmlexColorCode;

//--Copyright (c) 2023 Robert A. Howell

const cssex = {
    /**
     * Cssex is a widget in CSS page, applying style colors to elements of different
     * types (based on the CSS programming language)
     */
    CSSEXColorCode: () => {
        const selectors = document.querySelectorAll(".Selector") as NodeListOf<HTMLElement>;
        const attributes = document.querySelectorAll(".Attribute") as NodeListOf<HTMLElement>;
        const values = document.querySelectorAll(".Value") as NodeListOf<HTMLElement>;
        const psuedos = document.querySelectorAll(".Psuedo-class") as NodeListOf<HTMLElement>;
        const resetBTN = document.querySelector(".reset");
        
        cssex.CSSExampleHighlighting(selectors, "var(--clr-Red)");
        cssex.CSSExampleHighlighting(attributes, "var(--clr-WhoIS_Orange)");
        cssex.CSSExampleHighlighting(values, "var(--clr-Skyblue)");
        cssex.CSSExampleHighlighting(psuedos, "var(--clr-Green)");
        
        //function to reset the css code properties color to original
        resetBTN.addEventListener("click", ()=>{
            selectors.forEach((selector)=>{
                selector.style.color = "initial";
            });
            attributes.forEach((attribute)=>{
                attribute.style.color = "initial";
            });
            values.forEach((value)=>{
                value.style.color = "initial";
            });
            psuedos.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
        })
    },
    // 
    /**
     * Function to color the example area's elements using css
     * @param elems - Node list of HTMLElelements from query.SelectorAll()
     * @param color - String of CSS color value
     */
    CSSExampleHighlighting: (elems: NodeListOf<HTMLElement>, color: string) => {

        elems.forEach((elem)=>{
            elem.addEventListener("mouseover", (event)=>{
                event.preventDefault();
                elems.forEach((elem)=>{
                    elem.style.color = color;
                });
            })
            elem.addEventListener("click", (event)=>{
                event.preventDefault();
                elems.forEach((elem)=>{
                    elem.style.color = "initial";
                });
            })
        })
    }
}

export default cssex;

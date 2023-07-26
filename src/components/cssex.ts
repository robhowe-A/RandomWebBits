//--Copyright (c) 2023 Robert A. Howell

const cssex = {
    CSSEXColorCode: () => {
        const selectors = document.querySelectorAll(".Selector") as NodeListOf<HTMLElement>;
        const attributes = document.querySelectorAll(".Attribute") as NodeListOf<HTMLElement>;
        const values = document.querySelectorAll(".Value") as NodeListOf<HTMLElement>;
        const psuedos = document.querySelectorAll(".Psuedo-class") as NodeListOf<HTMLElement>;
        const resetBTN = document.querySelector(".reset");

        // Function to color the example area's css code properties
        const CSSExampleHighlighting = (elems: NodeListOf<HTMLElement>, color: string) =>{

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
        CSSExampleHighlighting(selectors, "var(--clr-Red)");
        CSSExampleHighlighting(attributes, "var(--clr-WhoIS_Orange)");
        CSSExampleHighlighting(values, "var(--clr-Skyblue)");
        CSSExampleHighlighting(psuedos, "var(--clr-Green)");
        
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
    }
}

export default cssex;
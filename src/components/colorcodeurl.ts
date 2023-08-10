//--Copyright (c) 2023 Robert A. Howell

const urlexColorCode = {
    URLEXColorCode: () => {
        const protocol = document.querySelectorAll(".protocol") as NodeListOf<HTMLElement>;
        const domain = document.querySelectorAll(".domain") as NodeListOf<HTMLElement>;
        const port = document.querySelectorAll(".port") as NodeListOf<HTMLElement>;
        const folder = document.querySelectorAll(".folder") as NodeListOf<HTMLElement>;
        const file = document.querySelectorAll(".file") as NodeListOf<HTMLElement>;
        const query = document.querySelectorAll(".query") as NodeListOf<HTMLElement>;
        const key = document.querySelectorAll(".key") as NodeListOf<HTMLElement>;
        const value = document.querySelectorAll(".value") as NodeListOf<HTMLElement>;
        const resetBTN = document.querySelector(".reset");

        
        urlexColorCode.CSSExampleHighlighting(protocol, "var(--clr-WhoIS_Orange)");
        urlexColorCode.CSSExampleHighlighting(domain, "var(--clr-Skyblue)");
        urlexColorCode.CSSExampleHighlighting(port, "var(--clr-DarkCyan)");
        urlexColorCode.CSSExampleHighlighting(folder, "var(--clr-Green)");
        urlexColorCode.CSSExampleHighlighting(file, "var(--clr-Red)");
        urlexColorCode.CSSExampleHighlighting(query, "var(--clr-primary-600)");
        urlexColorCode.CSSExampleHighlighting(key, "var(--clr-all-primary-500)");
        urlexColorCode.CSSExampleHighlighting(value, "var(--clr-Lightcoral)");

        //function to reset the css code properties color to original
        resetBTN.addEventListener("click", ()=>{
            protocol.forEach((selector)=>{
                selector.style.color = "initial";
            });
            domain.forEach((attribute)=>{
                attribute.style.color = "initial";
            });
            port.forEach((value)=>{
                value.style.color = "initial";
            });
            folder.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
            file.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
            query.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
            key.forEach((psuedo)=>{
                psuedo.style.color = "initial";
            });
            value.forEach((psuedo)=>{
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

export default urlexColorCode;

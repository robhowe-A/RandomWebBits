//--Copyright (c) 2023 Robert A. Howell

export default class ColorCodeWidget {
  private elems: NodeListOf<HTMLElement>[];
  private color: string[];
  private resetbtn: Element;
  constructor(colorlesselements: NodeListOf<HTMLElement>[], colors: string[], resetbtn: Element) {
    this.elems = colorlesselements;
    this.color = colors;
    this.resetbtn = resetbtn;
    for (let i = 0; i < this.elems.length; i++) {
      this.cssExampleHighlighting(this.elems[i], this.color[i]);
      this.cssExampleHighlightReset(this.elems[i]);
    }
  };

  /**
   * Function to color the example area's elements using css
   * @param elemslist - Node list of HTMLElelements. I.E. using query.SelectorAll()
   * @param color - String of CSS color value
   */
  private cssExampleHighlighting(elemslist: NodeListOf<HTMLElement>, color: string) {
    elemslist.forEach(elem => {
      elem.addEventListener("mouseover", event => {
        event.preventDefault();
        elemslist.forEach(elem => {
          elem.style.color = color;
        });
      });
      elem.addEventListener("click", event => {
        event.preventDefault();
        elemslist.forEach(elem => {
          elem.style.color = "initial";
        });
      });
    });
  };

  //function to reset the css code properties color to original
  private cssExampleHighlightReset(elemslist: NodeListOf<HTMLElement>) {
    this.resetbtn.addEventListener("click", () => {
      elemslist.forEach(elem => {
        elem.style.color = "initial";
      });
    });
  };
  
}

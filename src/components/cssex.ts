//--Copyright (c) 2023 Robert A. Howell
import ColorCodeWidget from "../models/ColorCode";

const cssexColorCode = {
  /**
   * Cssex is a page widget, applying style colors to elements of different
   * types
   */
  init: () => {
    const selectors = document.querySelectorAll(".Selector") as NodeListOf<HTMLElement>;
    const attributes = document.querySelectorAll(".Attribute") as NodeListOf<HTMLElement>;
    const values = document.querySelectorAll(".Value") as NodeListOf<HTMLElement>;
    const psuedos = document.querySelectorAll(".Psuedo-class") as NodeListOf<HTMLElement>;

    // Add elements to array data structures, needed for the ColorCode instantiation
    const colorlesselements = new Array(selectors, attributes, values, psuedos);
    const elementscolors = new Array(
      "var(--clr-Red)",
      "var(--clr-WhoIS_Orange)",
      "var(--clr-Skyblue)",
      "var(--clr-Green)"
    );

    // Instantiate a color code object with all needed elements
    new ColorCodeWidget(colorlesselements, elementscolors, document.querySelector(".reset"));
  },
};

export default cssexColorCode;

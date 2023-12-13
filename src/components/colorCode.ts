//--Copyright (c) 2023 Robert A. Howell
import ColorCodeWidget from "../models/colorCode";

const htmlexColorCode = {
  init: () => {
    // Get component elements that will be used in widget interactivity
    const openers = document.querySelectorAll(".Tagopen") as NodeListOf<HTMLElement>;
    const closers = document.querySelectorAll(".Tagclose") as NodeListOf<HTMLElement>;
    const values = document.querySelectorAll(".TextVal") as NodeListOf<HTMLElement>;
    const attributes = document.querySelectorAll(".Attribute") as NodeListOf<HTMLElement>;

    // Add elements to array data structures, needed for the ColorCode instantiation
    const colorlesselements = new Array(openers, closers, values, attributes);
    const elementscolors = new Array(
      "var(--clr-WhoIS_Orange)",
      "var(--clr-Red)",
      "var(--clr-DarkCyan)",
      "var(--clr-Green)"
    );

    // Instantiate a color code object with all needed elements
    new ColorCodeWidget(colorlesselements, elementscolors, document.querySelector(".reset"));
  },
};

const urlexColorCode = {
  init: () => {
    const protocol = document.querySelectorAll(".protocol") as NodeListOf<HTMLElement>;
    const domain = document.querySelectorAll(".domain") as NodeListOf<HTMLElement>;
    const port = document.querySelectorAll(".port") as NodeListOf<HTMLElement>;
    const folder = document.querySelectorAll(".folder") as NodeListOf<HTMLElement>;
    const file = document.querySelectorAll(".file") as NodeListOf<HTMLElement>;
    const query = document.querySelectorAll(".query") as NodeListOf<HTMLElement>;
    const key = document.querySelectorAll(".key") as NodeListOf<HTMLElement>;
    const value = document.querySelectorAll(".value") as NodeListOf<HTMLElement>;

    // Add elements to array data structures, needed for the ColorCode instantiation
    const colorlesselements = new Array(protocol, domain, port, folder, file, query, key, value);
    const elementscolors = new Array(
      "var(--clr-WhoIS_Orange)",
      "var(--clr-Skyblue)",
      "var(--clr-DarkCyan)",
      "var(--clr-Green)",
      "var(--clr-Red)",
      "var(--clr-primary-600)",
      "var(--clr-all-primary-500)",
      "var(--clr-Lightcoral)"
    );

    // Instantiate a color code object with all needed elements
    new ColorCodeWidget(colorlesselements, elementscolors, document.querySelector(".reset"));
  },
};

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

export { htmlexColorCode, urlexColorCode, cssexColorCode};

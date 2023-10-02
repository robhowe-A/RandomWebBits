//--Copyright (c) 2023 Robert A. Howell
import ColorCode from "../models/ColorCode";

const htmlexColorCode = {
  HTMLEXColorCode: () => {
    // Get component elements that will be used in widget interactivity
    const openers = document.querySelectorAll(
      ".Tagopen"
    ) as NodeListOf<HTMLElement>;
    const closers = document.querySelectorAll(
      ".Tagclose"
    ) as NodeListOf<HTMLElement>;
    const values = document.querySelectorAll(
      ".TextVal"
    ) as NodeListOf<HTMLElement>;
    const attributes = document.querySelectorAll(
      ".Attribute"
    ) as NodeListOf<HTMLElement>;

    // Add elements to array data structures, needed for the ColorCode instantiation
    const colorlesselements = new Array(openers, closers, values, attributes);
    const elementscolors = new Array(
      "var(--clr-WhoIS_Orange)",
      "var(--clr-Red)",
      "var(--clr-DarkCyan)",
      "var(--clr-Green)"
    );

    // Instantiate a color code object with all needed elements
    new ColorCode(
      colorlesselements,
      elementscolors,
      document.querySelector(".reset")
    );
  },
};

export default htmlexColorCode;

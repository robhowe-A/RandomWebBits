//--Copyright (c) 2023 Robert A. Howell
import ColorCodeWidget from "../models/ColorCode";

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

export default urlexColorCode;

//--Copyright (c) 2023 Robert A. Howell
import FlashcardCardElems from "../models/flashcardCardElems";
import portDefinitions from "../data/portNums";

const flashcardgameWidget = {
  init: () => {
    // Establish which port numbers to test and the definition
    // TODO: functions flashcards
    const methoddefinitions = new Map<string, string>([
      ["charAt()", "Returns a new string of the character at a given index."],
    ]);

    // Create flashcard elements
    let mainFlashCardDivs = new FlashcardCardElems(portDefinitions);

    // Add the game's title element
    let mainFlashCardPage = document.getElementById("mainFlashCardGame");
    let mainFlashCardPageDiv = document.getElementById("mainFlashCards");

    const gametitleElem = document.createElement("h2");
    gametitleElem.innerText = "Computing Port Numbers";
    mainFlashCardPage.insertAdjacentElement("afterbegin", gametitleElem);

    // Add the flashcards to widget
    for (let elem of mainFlashCardDivs.m_flashcardsArr) {
      mainFlashCardPageDiv.appendChild(elem);
    }
  },
};

export default flashcardgameWidget;

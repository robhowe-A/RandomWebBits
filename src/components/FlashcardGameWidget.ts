//--Copyright (c) 2023 Robert A. Howell
import FlashcardCardElems from "../models/FlashcardCardElems";
import portdefinitions from "../data/portnums";

const flashcardgameWidget = {
  init: () => {
    // Establish which port numbers to test and the definition
    // TODO: functions flashcards
    const methoddefinitions = new Map<string, string>([
      ["charAt()", "Returns a new string of the character at a given index."],
    ]);

    // Create flashcard elements
    let mainFlashCardDivs = new FlashcardCardElems(portdefinitions);

    // Add the game's title element
    let mainFlashCardPageDiv = document.getElementById("mainFlashCards");
    const gametitleElem = mainFlashCardPageDiv.appendChild(
      document.createElement("h2")
    );
    gametitleElem.innerText = "Computing Port Numbers";

    // Add the flashcards to widget
    for (let elem of mainFlashCardDivs.m_flashcardsArr) {
      mainFlashCardPageDiv.appendChild(elem);
    }
  },
};

export default flashcardgameWidget;

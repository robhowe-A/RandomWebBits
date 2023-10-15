//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from "./components/ToDosWidget";
import DictionaryWidget from "./components/DictionaryWidget";
import notfound404widget from "./components/404";
import RWBPerf from "./models/ScriptPerf";
import RWBError from "./models/RWBErrorBus";

const ClassComponents = {
  init: (page: string) => {
    const classperf = new RWBPerf("Classcomponents"); //begin performance measure

    // Add Dictionary Widget if an element with that class is on a page
<<<<<<< HEAD
    if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
      if (RWBError.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true)) return;
      DictionaryWidget.init();
    }

    if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
      // Add ToDos widget if an element with that class is on a page
      if (RWBError.checkElementforNull("ClassComponent", ".ToDoList", true, true)) return;
=======
    if (
      page == "/pages/dictionaryword.html" ||
      page == "/index.html" ||
      page == "/" ||
      page == ""
    ) {
      if (
        RWBError.checkElementforNull(
          "ClassComponent",
          ".dictionaryWidget",
          true,
          true
        )
      )
        return;
      DictionaryWidget.init();
    }

    if (
      page == "/pages/todos.html" ||
      page == "/index.html" ||
      page == "/" ||
      page == ""
    ) {
      // Add ToDos widget if an element with that class is on a page
      if (
        RWBError.checkElementforNull("ClassComponent", ".ToDoList", true, true)
      )
        return;
>>>>>>> 1cc56c337858e9aee18e8a24841018bd8bf2ec3e
      ToDosWidget.init();
    }
    ClassComponents.mobileAbbrMarkups();

    classperf.end(); //end performance measure
  },
  fourohfour: () => {
<<<<<<< HEAD
    if (!RWBError.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
=======
    if (
      !RWBError.checkElementforNull(
        "PageComponents",
        "#Four-Oh-Four",
        false,
        true
      )
    ) {
>>>>>>> 1cc56c337858e9aee18e8a24841018bd8bf2ec3e
      notfound404widget.init();
    }
  },
  /**
   * Attribute tags on mobile do not have hover option. This function adds a click
   *  ability to define an abbr tag, than rely on the title attribute.
   */
  mobileAbbrMarkups: () => {
    const mobileabbrperf = new RWBPerf("Mobileabbrperf"); //start performance measure
    /**
     *
     */
    class AbbrOpen {
      isOpen: boolean = false;
      abbrElement: HTMLElement;

      constructor() {
        this.isOpen = true;
      }
    }
    const allabbreviationelems = document.querySelectorAll("abbr");
    if (allabbreviationelems.length > 0) {
      for (let abbr of allabbreviationelems) {
        let abbrev = new AbbrOpen();
        abbrev.abbrElement = abbr;

        abbrev.abbrElement.addEventListener("click", e => {
          e.preventDefault();
<<<<<<< HEAD
          let abbrtitleattrval: string = abbrev.abbrElement.getAttribute("title") as string;
=======
          let abbrtitleattrval: string = abbrev.abbrElement.getAttribute(
            "title"
          ) as string;
>>>>>>> 1cc56c337858e9aee18e8a24841018bd8bf2ec3e
          let description: HTMLSpanElement;

          if (e.target == abbr) {
            if (abbrev.abbrElement.children.length < 1) {
              //create the span element
<<<<<<< HEAD
              description = abbrev.abbrElement.appendChild(document.createElement("span"));
              description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(
                160
              )})`;
            } else {
              //show the span element
              description = abbrev.abbrElement.querySelector("span") as HTMLSpanElement;
              description.textContent = `${String.fromCharCode(160)}(${abbrtitleattrval}${String.fromCharCode(
                160
              )})`;
=======
              description = abbrev.abbrElement.appendChild(
                document.createElement("span")
              );
              description.textContent = `${String.fromCharCode(
                160
              )}(${abbrtitleattrval}${String.fromCharCode(160)})`;
            } else {
              //show the span element
              description = abbrev.abbrElement.querySelector(
                "span"
              ) as HTMLSpanElement;
              description.textContent = `${String.fromCharCode(
                160
              )}(${abbrtitleattrval}${String.fromCharCode(160)})`;
>>>>>>> 1cc56c337858e9aee18e8a24841018bd8bf2ec3e
            }
          }
          abbrev.abbrElement.addEventListener("mouseleave", () => {
            description.textContent = "";
          });
        });
      }
    }

    mobileabbrperf.end(); //end performance measure
  },
};
export default ClassComponents;

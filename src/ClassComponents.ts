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
    if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
      if (RWBError.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true)) return;
      DictionaryWidget.init();
    }

    if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
      // Add ToDos widget if an element with that class is on a page
      if (RWBError.checkElementforNull("ClassComponent", ".ToDoList", true, true)) return;
      ToDosWidget.init();
    }
    ClassComponents.mobileAbbrMarkups();
    ClassComponents.rwbDataTypeAnchor();

    classperf.end(); //end performance measure
  },
  fourohfour: () => {
    if (!RWBError.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
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
          let abbrtitleattrval: string = abbrev.abbrElement.getAttribute("title") as string;
          let description: HTMLSpanElement;

          if (e.target == abbr) {
            if (abbrev.abbrElement.children.length < 1) {
              //create the span element
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
  rwbDataTypeAnchor: () => {
    switch (location.pathname) {
      case "/guides/clearcookiesquickly.html":
        const rwblink0 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink0[0].href = "/guides/devtools/applicationtab.html";
        break;
      case "/guides/devtools/applicationtab.html":
        const rwblink1 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink1[0].href = "/guides/devtools/elementstab.html";
        rwblink1[1].href = "/guides/devtools/consoletab.html";
        rwblink1[2].href = "/guides/devtools/sourcestab.html";
        rwblink1[3].href = "/guides/devtools/networktab.html";
        rwblink1[4].href = "/guides/devtools/performancetab.html";
        rwblink1[5].href = "/guides/devtools/memorytab.html";
        rwblink1[6].href = "/guides/devtools/applicationtab.html";
        rwblink1[7].href = "/guides/devtools/securitytab.html";
        rwblink1[8].href = "/guides/clearcookiesquickly.html";
        break;
      case "/guides/devtools/consoletab.html":
        const rwblink2 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink2[0].href = "/guides/devtools/elementstab.html";
        rwblink2[1].href = "/guides/devtools/consoletab.html";
        rwblink2[2].href = "/guides/devtools/sourcestab.html";
        rwblink2[3].href = "/guides/devtools/networktab.html";
        rwblink2[4].href = "/guides/devtools/performancetab.html";
        rwblink2[5].href = "/guides/devtools/memorytab.html";
        rwblink2[6].href = "/guides/devtools/applicationtab.html";
        rwblink2[7].href = "/guides/devtools/securitytab.html";
        rwblink2[8].href = "/explore/webbtelescope.html";
        rwblink2[9].href = "/pages/dom.html";
        break;
      case "/guides/devtools/elementstab.html":
        const rwblink3 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink3[0].href = "/guides/devtools/elementstab.html";
        rwblink3[1].href = "/guides/devtools/consoletab.html";
        rwblink3[2].href = "/guides/devtools/sourcestab.html";
        rwblink3[3].href = "/guides/devtools/networktab.html";
        rwblink3[4].href = "/guides/devtools/performancetab.html";
        rwblink3[5].href = "/guides/devtools/memorytab.html";
        rwblink3[6].href = "/guides/devtools/applicationtab.html";
        rwblink3[7].href = "/guides/devtools/securitytab.html";
        rwblink3[8].href = "/pages/dom.html";
        break;
      case "/guides/devtools/memorytab.html":
        const rwblink4 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink4[0].href = "/guides/devtools/elementstab.html";
        rwblink4[1].href = "/guides/devtools/consoletab.html";
        rwblink4[2].href = "/guides/devtools/sourcestab.html";
        rwblink4[3].href = "/guides/devtools/networktab.html";
        rwblink4[4].href = "/guides/devtools/performancetab.html";
        rwblink4[5].href = "/guides/devtools/memorytab.html";
        rwblink4[6].href = "/guides/devtools/applicationtab.html";
        rwblink4[7].href = "/guides/devtools/securitytab.html";
        break;
      case "/guides/devtools/networktab.html":
        const rwblink5 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink5[0].href = "/guides/devtools/elementstab.html";
        rwblink5[1].href = "/guides/devtools/consoletab.html";
        rwblink5[2].href = "/guides/devtools/sourcestab.html";
        rwblink5[3].href = "/guides/devtools/networktab.html";
        rwblink5[4].href = "/guides/devtools/performancetab.html";
        rwblink5[5].href = "/guides/devtools/memorytab.html";
        rwblink5[6].href = "/guides/devtools/applicationtab.html";
        rwblink5[7].href = "/guides/devtools/securitytab.html";
        rwblink5[8].href = "/pages/htmlresponses.html";
        break;
      case "/guides/devtools/performancetab.html":
        const rwblink6 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink6[0].href = "/guides/devtools/elementstab.html";
        rwblink6[1].href = "/guides/devtools/consoletab.html";
        rwblink6[2].href = "/guides/devtools/sourcestab.html";
        rwblink6[3].href = "/guides/devtools/networktab.html";
        rwblink6[4].href = "/guides/devtools/performancetab.html";
        rwblink6[5].href = "/guides/devtools/memorytab.html";
        rwblink6[6].href = "/guides/devtools/applicationtab.html";
        rwblink6[7].href = "/guides/devtools/securitytab.html";
        break;
      case "/guides/devtools/sourcestab.html":
        const rwblink7 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink7[0].href = "/guides/devtools/elementstab.html";
        rwblink7[1].href = "/guides/devtools/consoletab.html";
        rwblink7[2].href = "/guides/devtools/sourcestab.html";
        rwblink7[3].href = "/guides/devtools/networktab.html";
        rwblink7[4].href = "/guides/devtools/performancetab.html";
        rwblink7[5].href = "/guides/devtools/memorytab.html";
        rwblink7[6].href = "/guides/devtools/applicationtab.html";
        rwblink7[7].href = "/guides/devtools/securitytab.html";
        break;
      case "/guides/devtools/securitytab.html":
        const rwblink11 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink11[0].href = "/guides/devtools/elementstab.html";
        rwblink11[1].href = "/guides/devtools/consoletab.html";
        rwblink11[2].href = "/guides/devtools/sourcestab.html";
        rwblink11[3].href = "/guides/devtools/networktab.html";
        rwblink11[4].href = "/guides/devtools/performancetab.html";
        rwblink11[5].href = "/guides/devtools/memorytab.html";
        rwblink11[6].href = "/guides/devtools/applicationtab.html";
        rwblink11[7].href = "/guides/devtools/securitytab.html";
        rwblink11[8].href = "/guides/https.html";

        break;
      case "/pages/datastorage.html":
        const rwblink8 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink8[0].href = "/pages/markup.html";
        rwblink8[1].href = "/guides/devtools/applicationtab.html";
        break;
      case "/pages/htmlresponses.html":
        const rwblink9 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink9[0].href = "/guides/devtools/networktab.html";
        rwblink9[1].href = "/pages/webides.html";
        break;
      case "/pages/url.html":
        const rwblink10 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink10[0].href = "/pages/domainlookup.html";
        break;
      default:
        console.info("No elements of type data-rwb-type=link found.");
    }
  },
};
export default ClassComponents;

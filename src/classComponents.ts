//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from "./components/toDosWidget";
import DictionaryWidget from "./components/dictionaryWidget";
import notFound404Widget from "./components/404";
import RWBPerf from "./models/scriptPerf";
import RWBError from "./models/rwbErrorBus";
import AbbrOpen from "./models/abbrDescription";

const ClassComponents = {
  /**
   * Attribute tags on mobile do not have hover option. This function adds a click
   *  ability to define an abbr tag, than rely on the title attribute.
   */
  abbrDefinitions: () => {
    const mobileabbrperf = new RWBPerf("Mobileabbrperf"); //start performance measure

    /**Give all abbr elements option to click to reveal the expanded description. */
    const allabbreviationelems = document.querySelectorAll("abbr");

    if (allabbreviationelems.length > 0) {
      for (let abbr of allabbreviationelems) {
        let abbrev = new AbbrOpen(abbr);
        abbrev.revealAbbrDescription();
      }
    }

    mobileabbrperf.end(); //end performance measure
  },
  fourohfour: () => {
    if (!RWBError.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
      notFound404Widget.init();
    }
  },
  init: (page: string) => {
    const classperf = new RWBPerf("Classcomponents"); //begin performance measure

    // Add Dictionary Widget if an element with that class is on a page
    if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
      if (RWBError.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true)) return;
      DictionaryWidget.init();
    }

    // Add ToDos widget if an element with that class is on a page
    if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
      if (RWBError.checkElementforNull("ClassComponent", ".ToDoList", true, true)) return;
      ToDosWidget.init();
    }

    // Add abbr definitions
    ClassComponents.abbrDefinitions();

    // Add RWB links definitions: appends ".html" to anchor href text (which is natively removed in Netlify)
    ClassComponents.rwbDataTypeAnchor();

    classperf.end(); //end performance measure
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
        rwblink1[8].href = "/guides/devtools/lighthousetab.html";
        rwblink1[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink1[10].href = "/guides/clearcookiesquickly.html";
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
        rwblink2[8].href = "/guides/devtools/lighthousetab.html";
        rwblink2[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink2[10].href = "/explore/webbtelescope.html";
        rwblink2[11].href = "/pages/dom.html";
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
        rwblink3[8].href = "/guides/devtools/lighthousetab.html";
        rwblink3[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink3[10].href = "/pages/dom.html";
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
        rwblink4[8].href = "/guides/devtools/lighthousetab.html";
        rwblink4[9].href = "/guides/devtools/cssoverviewtab.html";
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
        rwblink5[8].href = "/guides/devtools/lighthousetab.html";
        rwblink5[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink5[10].href = "/pages/htmlresponses.html";
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
        rwblink6[8].href = "/guides/devtools/lighthousetab.html";
        rwblink6[9].href = "/guides/devtools/cssoverviewtab.html";
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
        rwblink7[8].href = "/guides/devtools/lighthousetab.html";
        rwblink7[9].href = "/guides/devtools/cssoverviewtab.html";
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
        rwblink11[8].href = "/guides/devtools/lighthousetab.html";
        rwblink11[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink11[10].href = "/guides/https.html";
        break;
      case "/guides/devtools/lighthousetab.html":
        const rwblink12 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink12[0].href = "/guides/devtools/elementstab.html";
        rwblink12[1].href = "/guides/devtools/consoletab.html";
        rwblink12[2].href = "/guides/devtools/sourcestab.html";
        rwblink12[3].href = "/guides/devtools/networktab.html";
        rwblink12[4].href = "/guides/devtools/performancetab.html";
        rwblink12[5].href = "/guides/devtools/memorytab.html";
        rwblink12[6].href = "/guides/devtools/applicationtab.html";
        rwblink12[7].href = "/guides/devtools/securitytab.html";
        rwblink12[8].href = "/guides/devtools/lighthousetab.html";
        rwblink12[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink12[10].href = "/pages/hsl.html";
        break;
      case "/guides/devtools/cssoverviewtab.html":
        const rwblink13 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwblink13[0].href = "/guides/devtools/elementstab.html";
        rwblink13[1].href = "/guides/devtools/consoletab.html";
        rwblink13[2].href = "/guides/devtools/sourcestab.html";
        rwblink13[3].href = "/guides/devtools/networktab.html";
        rwblink13[4].href = "/guides/devtools/performancetab.html";
        rwblink13[5].href = "/guides/devtools/memorytab.html";
        rwblink13[6].href = "/guides/devtools/applicationtab.html";
        rwblink13[7].href = "/guides/devtools/securitytab.html";
        rwblink13[8].href = "/guides/devtools/lighthousetab.html";
        rwblink13[9].href = "/guides/devtools/cssoverviewtab.html";
        rwblink13[10].href = "/pages.html";
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
        console.debug("No elements of type data-rwb-type=link found."); //shown with verbose logging
    }
  },
};
export default ClassComponents;

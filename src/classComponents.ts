//--Copyright (c) 2023 Robert A. Howell
import toDosWidget from "./components/toDosWidget";
import dictionaryWidget from "./components/dictionaryWidget";
import notFound404Widget from "./components/404";
import RwbPerf from "./models/scriptPerf";
import RwbError from "./models/rwbErrorBus";
import AbbrOpen from "./models/abbrDescription";

const classComponents = {
  /**
   * Attribute tags on mobile do not have hover option. This function adds a click
   *  ability to define an abbr tag, than rely on the title attribute.
   */
  abbrDefinitions: () => {
    const mobileabbrperf = new RwbPerf("Mobileabbrperf"); //start performance measure

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
    if (!RwbError.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
      notFound404Widget.init();
    }
  },
  init: (page: string) => {
    const classperf = new RwbPerf("Classcomponents"); //begin performance measure

    // Add Dictionary Widget if an element with that class is on a page
    if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
      if (RwbError.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true)) return;
      dictionaryWidget.init();
    }

    // Add ToDos widget if an element with that class is on a page
    if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
      if (RwbError.checkElementforNull("ClassComponent", ".ToDoList", true, true)) return;
      toDosWidget.init();
    }

    // Add abbr definitions
    classComponents.abbrDefinitions();

    // Add RWB links definitions: appends ".html" to anchor href text (which is natively removed in Netlify)
    classComponents.rwbDataTypeAnchor();

    classperf.end(); //end performance measure
  },
  rwbDataTypeAnchor: () => {
    switch (location.pathname) {
      case "/guides/clearcookiesquickly.html":
        const rwbLink0 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink0[0].href = "/guides/devtools/applicationtab.html";
        break;
      case "/guides/devtools/applicationtab.html":
        const rwbLink1 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink1[0].href = "/guides/devtools/elementstab.html";
        rwbLink1[1].href = "/guides/devtools/consoletab.html";
        rwbLink1[2].href = "/guides/devtools/sourcestab.html";
        rwbLink1[3].href = "/guides/devtools/networktab.html";
        rwbLink1[4].href = "/guides/devtools/performancetab.html";
        rwbLink1[5].href = "/guides/devtools/memorytab.html";
        rwbLink1[6].href = "/guides/devtools/applicationtab.html";
        rwbLink1[7].href = "/guides/devtools/securitytab.html";
        rwbLink1[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink1[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink1[10].href = "/guides/clearcookiesquickly.html";
        break;
      case "/guides/devtools/consoletab.html":
        const rwbLink2 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink2[0].href = "/guides/devtools/elementstab.html";
        rwbLink2[1].href = "/guides/devtools/consoletab.html";
        rwbLink2[2].href = "/guides/devtools/sourcestab.html";
        rwbLink2[3].href = "/guides/devtools/networktab.html";
        rwbLink2[4].href = "/guides/devtools/performancetab.html";
        rwbLink2[5].href = "/guides/devtools/memorytab.html";
        rwbLink2[6].href = "/guides/devtools/applicationtab.html";
        rwbLink2[7].href = "/guides/devtools/securitytab.html";
        rwbLink2[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink2[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink2[10].href = "/explore/webbtelescope.html";
        rwbLink2[11].href = "/pages/dom.html";
        break;
      case "/guides/devtools/elementstab.html":
        const rwbLink3 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink3[0].href = "/guides/devtools/elementstab.html";
        rwbLink3[1].href = "/guides/devtools/consoletab.html";
        rwbLink3[2].href = "/guides/devtools/sourcestab.html";
        rwbLink3[3].href = "/guides/devtools/networktab.html";
        rwbLink3[4].href = "/guides/devtools/performancetab.html";
        rwbLink3[5].href = "/guides/devtools/memorytab.html";
        rwbLink3[6].href = "/guides/devtools/applicationtab.html";
        rwbLink3[7].href = "/guides/devtools/securitytab.html";
        rwbLink3[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink3[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink3[10].href = "/pages/dom.html";
        break;
      case "/guides/devtools/memorytab.html":
        const rwbLink4 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink4[0].href = "/guides/devtools/elementstab.html";
        rwbLink4[1].href = "/guides/devtools/consoletab.html";
        rwbLink4[2].href = "/guides/devtools/sourcestab.html";
        rwbLink4[3].href = "/guides/devtools/networktab.html";
        rwbLink4[4].href = "/guides/devtools/performancetab.html";
        rwbLink4[5].href = "/guides/devtools/memorytab.html";
        rwbLink4[6].href = "/guides/devtools/applicationtab.html";
        rwbLink4[7].href = "/guides/devtools/securitytab.html";
        rwbLink4[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink4[9].href = "/guides/devtools/cssoverviewtab.html";
        break;
      case "/guides/devtools/networktab.html":
        const rwbLink5 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink5[0].href = "/guides/devtools/elementstab.html";
        rwbLink5[1].href = "/guides/devtools/consoletab.html";
        rwbLink5[2].href = "/guides/devtools/sourcestab.html";
        rwbLink5[3].href = "/guides/devtools/networktab.html";
        rwbLink5[4].href = "/guides/devtools/performancetab.html";
        rwbLink5[5].href = "/guides/devtools/memorytab.html";
        rwbLink5[6].href = "/guides/devtools/applicationtab.html";
        rwbLink5[7].href = "/guides/devtools/securitytab.html";
        rwbLink5[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink5[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink5[10].href = "/pages/htmlresponses.html";
        break;
      case "/guides/devtools/performancetab.html":
        const rwbLink6 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink6[0].href = "/guides/devtools/elementstab.html";
        rwbLink6[1].href = "/guides/devtools/consoletab.html";
        rwbLink6[2].href = "/guides/devtools/sourcestab.html";
        rwbLink6[3].href = "/guides/devtools/networktab.html";
        rwbLink6[4].href = "/guides/devtools/performancetab.html";
        rwbLink6[5].href = "/guides/devtools/memorytab.html";
        rwbLink6[6].href = "/guides/devtools/applicationtab.html";
        rwbLink6[7].href = "/guides/devtools/securitytab.html";
        rwbLink6[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink6[9].href = "/guides/devtools/cssoverviewtab.html";
        break;
      case "/guides/devtools/sourcestab.html":
        const rwbLink7 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink7[0].href = "/guides/devtools/elementstab.html";
        rwbLink7[1].href = "/guides/devtools/consoletab.html";
        rwbLink7[2].href = "/guides/devtools/sourcestab.html";
        rwbLink7[3].href = "/guides/devtools/networktab.html";
        rwbLink7[4].href = "/guides/devtools/performancetab.html";
        rwbLink7[5].href = "/guides/devtools/memorytab.html";
        rwbLink7[6].href = "/guides/devtools/applicationtab.html";
        rwbLink7[7].href = "/guides/devtools/securitytab.html";
        rwbLink7[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink7[9].href = "/guides/devtools/cssoverviewtab.html";
        break;
      case "/guides/devtools/securitytab.html":
        const rwbLink11 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink11[0].href = "/guides/devtools/elementstab.html";
        rwbLink11[1].href = "/guides/devtools/consoletab.html";
        rwbLink11[2].href = "/guides/devtools/sourcestab.html";
        rwbLink11[3].href = "/guides/devtools/networktab.html";
        rwbLink11[4].href = "/guides/devtools/performancetab.html";
        rwbLink11[5].href = "/guides/devtools/memorytab.html";
        rwbLink11[6].href = "/guides/devtools/applicationtab.html";
        rwbLink11[7].href = "/guides/devtools/securitytab.html";
        rwbLink11[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink11[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink11[10].href = "/guides/https.html";
        break;
      case "/guides/devtools/lighthousetab.html":
        const rwbLink12 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink12[0].href = "/guides/devtools/elementstab.html";
        rwbLink12[1].href = "/guides/devtools/consoletab.html";
        rwbLink12[2].href = "/guides/devtools/sourcestab.html";
        rwbLink12[3].href = "/guides/devtools/networktab.html";
        rwbLink12[4].href = "/guides/devtools/performancetab.html";
        rwbLink12[5].href = "/guides/devtools/memorytab.html";
        rwbLink12[6].href = "/guides/devtools/applicationtab.html";
        rwbLink12[7].href = "/guides/devtools/securitytab.html";
        rwbLink12[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink12[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink12[10].href = "/pages/hsl.html";
        break;
      case "/guides/devtools/cssoverviewtab.html":
        const rwbLink13 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink13[0].href = "/guides/devtools/elementstab.html";
        rwbLink13[1].href = "/guides/devtools/consoletab.html";
        rwbLink13[2].href = "/guides/devtools/sourcestab.html";
        rwbLink13[3].href = "/guides/devtools/networktab.html";
        rwbLink13[4].href = "/guides/devtools/performancetab.html";
        rwbLink13[5].href = "/guides/devtools/memorytab.html";
        rwbLink13[6].href = "/guides/devtools/applicationtab.html";
        rwbLink13[7].href = "/guides/devtools/securitytab.html";
        rwbLink13[8].href = "/guides/devtools/lighthousetab.html";
        rwbLink13[9].href = "/guides/devtools/cssoverviewtab.html";
        rwbLink13[10].href = "/pages.html";
        break;
      case "/pages/datastorage.html":
        const rwbLink8 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink8[0].href = "/pages/markup.html";
        rwbLink8[1].href = "/guides/devtools/applicationtab.html";
        break;
      case "/pages/htmlresponses.html":
        const rwbLink9 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink9[0].href = "/guides/devtools/networktab.html";
        rwbLink9[1].href = "/pages/webides.html";
        break;
      case "/pages/url.html":
        const rwbLink10 = document.querySelectorAll(
          "span[data-rwb-type=link] a"
        ) as NodeListOf<HTMLAnchorElement>;
        rwbLink10[0].href = "/pages/domainlookup.html";
        break;
      default:
        console.debug("No elements of type data-rwb-type=link found."); //shown with verbose logging
    }
  },
};
export default classComponents;

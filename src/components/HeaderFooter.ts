//--Copyright (c) 2023 Robert A. Howell
import NAVITEMS from "../data/navitems";
import { RWBDomException } from "../models/RWBErrorBus";
import RWBPerf from "../models/ScriptPerf";

/**
 * Widget to add site header and footer. Instantiated in 'Main' script.
 */
const HeaderFooter = {
  headerWidget: {
    /**
     * Site header containing navigation links and site logo.
     */
    init: () => {
      const headerperf = new RWBPerf("Header");

      /**
       * HTML 'main' element
       */
      const pageMain = document.querySelector("main");
      /** Header element container */
      let siteHeader: Element | null;

      // Add header element to the page
      if (pageMain != null) {
        // 'Main' element exists, add the header to it
        try {
          siteHeader = pageMain.insertAdjacentElement(
            "beforebegin",
            HeaderFooter.headerWidget.buildHeader()
          );
        } catch (e) {
          new RWBDomException(
            "DomException",
            "Check site header element. Encountered error:",
            e
          );
        }
      } else {
        // 'Main' element does not exist, add the header to the body
        try {
          siteHeader = document.body.insertAdjacentElement(
            "afterbegin",
            HeaderFooter.headerWidget.buildHeader()
          );
        } catch (e) {
          new RWBDomException(
            "DomException",
            "Check site header is not null. Encountered error:",
            e
          );
        }
      }

      //Append navigation items to header
      try {
        siteHeader.childNodes[0].appendChild(
          HeaderFooter.headerWidget.buildNavigation()
        );
      } catch (e) {
        new RWBDomException(
          "DomException",
          "Cannot prepend navigation items. Encountered error:",
          e
        );
      }

      headerperf.end();
    },
    /**
     * Create header with site logo appended.
     * @param main HTML 'main' element
     * @returns Populated header element
     */
    buildHeader: () => {
      /**
       * Basic HTML header element containing logo (H1)
       */
      const siteHeader = document.createElement("header");
      const siteHeaderContainer = document.createElement("div");
      siteHeaderContainer.classList.add("width-max-center");
      const H1 = document.createElement("H1");
      H1.textContent = "<Random Web Bits>";
      H1.setAttribute("id", "RandomWebBits");
      siteHeaderContainer.append(H1);
      siteHeader.append(siteHeaderContainer);

      return siteHeader;
    },
    buildNavigation: () => {
      // Build the header navigation based on navigation data
      // Create navigation elements
      const headerNavFrag = document.createDocumentFragment();
      const headerNav = headerNavFrag
        .appendChild(document.createElement("nav"))
        .appendChild(document.createElement("ul"));

      // Append nav data to nav elements
      NAVITEMS.map(item => {
        const navListItems = document.createElement("li");
        const navListLinks = document.createElement("a");
        navListItems.prepend(navListLinks);
        headerNav.append(navListItems);

        // Add navigation attributes and property values
        navListLinks.textContent = `${item.innerText}`;
        // Environment links edit, requiring different link relatives to operate
        // Github pages operates from repository, not '/'
        //if (window.location.host == 'robhowe-a.github.io') {
        //link data edit for dev environment
        //navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
        //} else {
        //link data in other environments
        navListLinks.setAttribute("href", `/${item.hReference}`);
        //}
        navListLinks.setAttribute("title", item.title);
      });

      return headerNavFrag;
    },
  },

  footerWidget: {
    init: () => {
      const footerperf = new RWBPerf("Footer");

      // Add footer element to the page end
      let footer: HTMLElement = HeaderFooter.footerWidget.buildFooter();
      document.body.append(footer);
      footer.childNodes[0].appendChild(
        HeaderFooter.footerWidget.buildFaviconAttribution(footer)
      );
      HeaderFooter.footerWidget.buildDeveloperAttribution(footer);

      footerperf.end();
    },
    buildFooter: () => {
      const siteFooter = document.createElement("footer");
      const siteFooterContainer = document.createElement("div");
      const footerPara = document.createElement("p");
      footerPara.textContent = `\u00A9 2022-2023 Random Web Bits. All Rights Reserved.`;

      siteFooterContainer.append(footerPara);
      siteFooter.append(siteFooterContainer);

      return siteFooter;
    },
    buildFaviconAttribution: (footer: HTMLElement) => {
      // Favicon attribution section + link to source
      const footerIconPara = document.createElement("p");
      const footerIconLink = document.createElement("a");
      footerIconLink.setAttribute("title", "IconHome: #45026755");
      footerIconLink.setAttribute("target", "_blank");
      footerIconLink.href =
        "https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755";
      footerIconLink.textContent = "VectorStock.com";
      footerIconPara.textContent = `Favicon designed by IconHome at `;

      // Append attribution to footer para
      footerIconPara.appendChild(footerIconLink);
      footer.childNodes[0].appendChild(footerIconPara);

      return footerIconPara;
    },
    buildDeveloperAttribution: (footer: HTMLElement) => {
      const devattrib = document.createElement("div");
      const dev = document.createElement("p");
      dev.textContent = "Developed by Robert Howell";

      devattrib.append(dev);
      footer.appendChild(devattrib);

      return;
    },
  },
};

export default HeaderFooter;

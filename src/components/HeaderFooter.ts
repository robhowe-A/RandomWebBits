"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import LinkDetails from '../models/LinkDetails';

//Header navigation links
const homeNavLink = new LinkDetails(
    "Index",
    "Home",
    "Home",
    "index.html"
);

const pagesNavLink = new LinkDetails(
    "Pages",
    "Pages",
    "Pages",
    "pages.html"
);

const gameNavLink = new LinkDetails(
    "Game",
    "FlashCards",
    "Game",
    "flashcards.html"
);

const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];

const HeaderFooter = {
    headerWidget: {
        init: () => {
            const pageMain = document.querySelector('main');
            let siteHeader: Element | null;

            // Add header element to the page
            if (pageMain != null) {

                // if main element exists, add the header to it
                siteHeader = pageMain.insertAdjacentElement('beforebegin', HeaderFooter.headerWidget.buildHeader(pageMain));
                if (siteHeader != null)
                    siteHeader.prepend(HeaderFooter.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null before 'main' element.");
            }
            else {
                // if main element does not exist, add the header to the body
                siteHeader = document.body.insertAdjacentElement('afterbegin', HeaderFooter.headerWidget.buildHeader(null));
                if (siteHeader != null)
                    siteHeader.prepend(HeaderFooter.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null after 'body' element.");
            }
        },
        buildHeader: (main: HTMLElement | null) => {
            const siteHeader = document.createElement('header');
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>'; //H1 Logo
            H1.setAttribute("id", "RandomWebBits");
            siteHeader.append(H1);

            if (main != null) {
                main.prepend(siteHeader);
            }
            else
                document.body.prepend(siteHeader);
            return siteHeader;
        },
        buildNavigation: () => {
            // Build the header navigation based on navigation data
            // Create navigation elements
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));

            // Append nav data to nav elements
            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);

                // Add navigation attributes and property values
                navListLinks.textContent = `${item.innerText}`;
                // Environment links edit, requiring different link relatives to operate
                // Github pages operates from repository, not '/'
                if (window.location.host == 'rhowell476.github.io') {
                    //link data edit for dev environment
                    navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                } else {
                    //link data in other environments
                    navListLinks.setAttribute('href', `/${item.hReference}`);
                }
                navListLinks.setAttribute("title", item.title);
            });

            return headerNavFrag;
        }
    },

    footerWidget: {
        init: () => {
            // Add footer element to the page end
            let footer: HTMLElement = HeaderFooter.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HeaderFooter.footerWidget.buildFaviconAttribution(footer));
        },
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            siteFooter.append(footerPara);
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;

            return siteFooter;
        },
        buildFaviconAttribution: (footer: HTMLElement) => {
            // Favicon attribution section + link to source
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755'
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = `Favicon designed by IconHome at `;

            // Append attribution to footer para
            footerIconPara.appendChild(footerIconLink);
            footer.appendChild(footerIconPara);

            return footerIconPara;
        }
    }
}

export default HeaderFooter;
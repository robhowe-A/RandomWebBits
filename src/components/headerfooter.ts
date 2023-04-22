import LinkDetails from './LinkDetails';

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
)
const NAVITEMS = [homeNavLink, pagesNavLink];

const HEADERFOOTER = {
    headerWidget: {
        init: () => {
            const pageMain = document.querySelector('main');
            let siteHeader: Element | null;
            if (pageMain != null ){
                siteHeader = pageMain.insertAdjacentElement('beforebegin', HEADERFOOTER.headerWidget.buildHeader( pageMain ));
                if (siteHeader != null)
                    siteHeader.prepend(HEADERFOOTER.headerWidget.buildNavigation());
                else
                    console.log("Check site header is not null before 'main' element.");
            }
            else {
                siteHeader = document.body.insertAdjacentElement('afterbegin', HEADERFOOTER.headerWidget.buildHeader( null ));
                if (siteHeader != null)
                    siteHeader.prepend(HEADERFOOTER.headerWidget.buildNavigation());
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

            if (main != null){
                main.prepend(siteHeader);
            }
            else
                document.body.prepend(siteHeader);
            return siteHeader;
        },
        buildNavigation: () => {
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));

            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                if (window.location.host == 'rhowell476.github.io') {
                    navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                } else {
                    navListLinks.setAttribute('href', `/${item.hReference}`);
                }
                navListLinks.textContent = `${item.innerText}`;
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
            });
            return headerNavFrag;
        }
    },

    footerWidget: {
        init: () => {
            let footer: HTMLElement = HEADERFOOTER.footerWidget.buildFooter();
            document.body.append(footer);
            footer.append(HEADERFOOTER.footerWidget.buildFaviconAttribution(footer));
        },
        buildFooter: () => {
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
            siteFooter.append(footerPara);

            return siteFooter;
        },
        buildFaviconAttribution: (footer: HTMLElement) => {
            //Favicon designed by IconHome attribution
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755'
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = `Favicon designed by IconHome at `;
            footerIconPara.appendChild(footerIconLink);
            footer.appendChild(footerIconPara);

            return footerIconPara;
        }
    }
}

export default HEADERFOOTER;
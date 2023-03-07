class LinkDetails {
    constructor(title, innerText) {
        this.title = title,
            this.innerText = innerText
    }
}

class NavigationLink extends LinkDetails {
    constructor(pageName, hReference, title, innerText) {
        super(title, innerText);
        this.pageName = pageName;
        this.hReference = hReference;
    }
}

(() => {
    window.addEventListener("DOMContentLoaded", () => {
        headerWidget.init();
        footerWidget.init();
    })

    //Nav items
    const homeNavLink = new NavigationLink(
        "Index",
        "index.html",
        "Home",
        "Home"
    );

    const pagesNavLink = new NavigationLink(
        "Pages",
        "pages.html",
        "Pages",
        "Pages"
    )

    const NAVITEMS = [homeNavLink, pagesNavLink];

    var headerWidget = {
        init: () => {
            const pageMain = document.querySelector('main');
            pageMain.insertAdjacentElement('beforebegin', headerWidget.buildHeader());
            document.body.querySelector("header").prepend(headerWidget.buildNavigation());
        },
        buildHeader: () => {
            //-------SITE HEADER-------//
            const siteHeader = document.createElement('header');

            //Random Web Bits H1 Logo
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>';
            H1.setAttribute("id", "RandomWebBits");
            siteHeader.append(H1);

            const main = document.querySelector("main").prepend(siteHeader);
            return siteHeader;
        },
        buildNavigation: () => {
            //-------SITE NAVIGATION-------//
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));

            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                if (window.location.host == 'rhowell476.github.io') {
                    navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                } else if (window.location.host == 'www.randomwebbits.com' || window.location.host == 'resilient-tarsier-d3fba9.netlify.app') {
                    navListLinks.setAttribute('href', `/${item.hReference}`);
                }
                navListLinks.textContent = `${item.innerText}`;
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
            });
            return headerNavFrag;
        }

    };

    var footerWidget = {
        init: () => {
            let footer = footerWidget.buildFooter();
            document.body.append(footer);
            document.body.querySelector("footer").append(footerWidget.buildIconAttributionLinks(footer));
        },
        buildFooter: () => {
            //-------SITE FOOTER-------//
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
            siteFooter.append(footerPara);

            return siteFooter;
        },
        buildIconAttributionLinks: (footer) => {
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
    };

})();

export default LinkDetails;

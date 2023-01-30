class LinkDetails {
    constructor (title, innerText) {
        this.title = title,
        this.innerText = innerText
    }
}

class NavigationLink extends LinkDetails {
    constructor (pageName, hReference, title, innerText) {
        super(title, innerText);
        this.pageName = pageName;
        this.hReference = hReference;
    }
}

class IconLink extends LinkDetails {
    constructor(pageName, hReference, title, innerText) {
        super(title, innerText);
        this.pageName = pageName,
        this.hReference = hReference
    }
}

//Nav items
const homeNavLink = new NavigationLink (
    "Index",
    "index.html",
    "Home",
    "Home"
);

const pagesNavLink = new NavigationLink (
    "Pages",
    "pages.html",
    "Pages",
    "Pages"
)

const NAVITEMS = [homeNavLink, pagesNavLink];

//Icon links
const htmlFramesIconLink = new IconLink(
   "HTML Frames",
    "https://www.flaticon.com/free-icons/html",
    "html icons",
    "Html icons created by Freepik - Flaticon"
);
const httpsCertIconLink = new IconLink(
    "HTTPS Certificate",
    "https://www.flaticon.com/free-icons/ssl-certificate",
    "ssl certificate icons",
    "Ssl certificate icons created by inipagistudio - Flaticon"
);
const domainLookupIconLink = new IconLink(
    "Domain Lookup",
    "https://www.flaticon.com/free-icons/domain",
    "domain icons",
    "Domain icons created by Freepik - Flaticon"
);
const aiIconLink = new IconLink(
    "Preview chatGPT",
    "https://www.flaticon.com/free-icons/ai",
    "ai icons",
    "Ai icons created by Freepik - Flaticon"
);
const FLATICONS = [htmlFramesIconLink, httpsCertIconLink, domainLookupIconLink,
    aiIconLink
];


const headerWidget = (function(){
    var header = {
        createHeader: function() {
            //-------SITE HEADER-------//
            const siteHeader = document.createElement('header');

            //Create Random Web Bits H1
            const H1 = document.createElement("H1");
            H1.textContent = '<Random Web Bits>';
            H1.setAttribute("id", "RandomWebBits");
            siteHeader.append(H1);

            const main = document.querySelector("main").prepend(siteHeader);
            return siteHeader;
        },
        createNavigation: function() {
            const headerNavFrag = document.createDocumentFragment();
            const headerNav = headerNavFrag
                .appendChild(document.createElement('nav'))
                .appendChild(document.createElement('ul'));

            NAVITEMS.map((item) => {
                const navListItems = document.createElement("li");
                const navListLinks = document.createElement("a");
                navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
                //navListLinks.setAttribute('href', `/${item.hReference}`);
                navListLinks.textContent = `${item.innerText}`;
                navListItems.prepend(navListLinks);
                headerNav.append(navListItems);
            });
            return headerNavFrag;
        },
        init: function (){
            document.body.prepend(header.createHeader());
            document.body.querySelector("header").prepend(header.createNavigation());
        }
    };
    header.init();

})();
    
const footerWidget = (function(){
    var footer = {
        createFooter: function() {
            //-------SITE FOOTER-------//
            const siteFooter = document.createElement("footer");
            const footerPara = document.createElement("p");
            footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
            siteFooter.append(footerPara);

            //Designed by IconHome 
            const footerIconPara = document.createElement("p");
            const footerIconLink = document.createElement("a");
            footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755'
            footerIconLink.setAttribute('title', "IconHome: #45026755");
            footerIconLink.setAttribute('target', "_blank");
            footerIconLink.textContent = 'VectorStock.com';
            footerIconPara.textContent = `Favicon designed by IconHome at `;
            footerIconPara.appendChild(footerIconLink);
            siteFooter.append(footerIconPara);
            return siteFooter;
        },

        //Icon attribution
        createIconAttributionLinks: function() {
            const footerIconPara2 = document.createElement("p");
            const footerIconUL = document.createElement("ul");
            const iconUL = footerIconPara2.appendChild(footerIconUL);

            FLATICONS.map(function(link){
                const iconLI = iconUL.appendChild(document.createElement("li"));
                const lia = iconLI.appendChild(document.createElement("a"));
                lia.href = link.hReference;
                lia.textContent = link.innerText;
                lia.title = link.title;
                iconUL.appendChild(iconLI);
            });

            return footerIconPara2;
        },
        init: function(){
            document.body.append(footer.createFooter());
            document.body.querySelector("footer").append(footer.createIconAttributionLinks());
        }
    };
    
    footer.init();
})();

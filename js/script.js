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

            return footerIconPara2;
        },
        init: function(){
            document.body.append(footer.createFooter());
            document.body.querySelector("footer").append(footer.createIconAttributionLinks());
        }
    };
    
    footer.init();
})();

export default LinkDetails;

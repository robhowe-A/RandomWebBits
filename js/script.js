//-------------------SITE HEADER AND FOOTER------------------------//
//-------SITE HEADER-------//

const header = (function(){//Create site header and navigation elements
    const siteHeader = document.createElement("header");
    const headerNav = document.createElement("nav");
    const headerUL = document.createElement("ul");
    
    //map a navigation link list. key: name, value: page.html
    const navItems = new Map();
    navItems.set('Home', 'index.html');
    navItems.set('Pages', 'pages.html');

    navItems.forEach((key, value) => {
        const navListItems = document.createElement("li");
        const navListLinks = document.createElement("a");
        navListLinks.setAttribute('href', `/${key}`);
        navListLinks.textContent = `${value}`;
        navListItems.prepend(navListLinks);
        headerUL.append(navListItems);
    });
    headerNav.append(headerUL);
    siteHeader.append(headerNav);

    //Create site H1
    const H1 = document.createElement("H1");
    H1.textContent = '<Random Web Bits>';
    H1.setAttribute("id", "ArbitraryWebBits");

    siteHeader.append(H1);

    // Add site header and H1 to DOM
    document.querySelector("body").prepend(siteHeader);
})();
    
const footer = (function(){
    //-------------------SITE FOOTER------------------------//
    //-------SITE FOOTER-------//
    const siteFooter = document.createElement("footer")
    const footerPara = document.createElement("p")
    footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
    siteFooter.append(footerPara);
    
    //add site footer to DOM
    document.querySelector("body").append(siteFooter);
})();

//-------------------SITE HEADER AND FOOTER------------------------//
//-------SITE HEADER-------//

const header = (function(){
    
    //map a navigation link list. key: name, value: page.html
    const navItems = new Map();
    navItems.set('Home', 'index.html');
    navItems.set('Pages', 'pages.html');
    
    //TEST
    const siteHeaderFrag = document.createDocumentFragment();
    const siteHeader = siteHeaderFrag
      .appendChild(document.createElement('header'))
      .appendChild(document.createElement('nav'))
      .appendChild(document.createElement('ul'));

    document.body.prepend(siteHeaderFrag);

    navItems.forEach((key, value) => {
        const navListItems = document.createElement("li");
        const navListLinks = document.createElement("a");
        navListLinks.setAttribute('href', `/${key}`);
        navListLinks.textContent = `${value}`;
        navListItems.prepend(navListLinks);
        siteHeader.append(navListItems);
    });
    const main = document.querySelector("main");
    main.prepend(siteHeaderFrag);

    //Create Random Web Bits H1
    const H1 = document.createElement("H1");
    H1.textContent = '<Random Web Bits>';
    H1.setAttribute("id", "RandomWebBits");
    document.querySelector("header").append(H1);

})();
    
const footer = (function(){
    //-------------------SITE FOOTER------------------------//
    //-------SITE FOOTER-------//
    const siteFooter = document.createElement("footer");
    const footerPara = document.createElement("p");
    footerPara.textContent = `\u00A9 2022 Random WebBits. All Rights Reserved.`;
    siteFooter.append(footerPara);
    
    //Designed by IconHome 
    const footerIconPara = document.createElement("p");
    const footerIconLink = document.createElement("a");
    footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755'
    footerIconLink.setAttribute('title', "VectorStock");
    footerIconLink.setAttribute('target', "_blank");
    footerIconLink.textContent = '(Image #45026755 at VectorStock.com)';
    footerIconPara.textContent = `Favicon icon designed by IconHome `;
    footerIconPara.appendChild(footerIconLink);
    siteFooter.append(footerIconPara);

    //add site footer to DOM
    document.querySelector("body").append(siteFooter);
})();

//-------------------SITE HEADER AND FOOTER------------------------//
//-------SITE HEADER-------//

const header = (function(){//Create site header and navigation elements
    const siteHeader = document.createElement("header");
    const headerNav = document.createElement("nav");
    const navContent = `
        <ul>
            <li><a href="/RandomWebBits/index.html">Home</a>&nbsp;|&nbsp;</li>
            <li><a href="/RandomWebBits/pages.html">Pages</a>&nbsp;|</li>
        </ul>`;
    
    headerNav.innerHTML = navContent;
    siteHeader.append(headerNav);

    //Create site H1
    document.body.prepend(siteHeaderFrag);

    navItems.forEach((key, value) => {
        const navListItems = document.createElement("li");
        const navListLinks = document.createElement("a");
        //navListLinks.setAttribute('href', `/RandomWebBits/${key}`);
        navListLinks.setAttribute('href', `/${key}`);
        navListLinks.textContent = `${value}`;
        navListItems.prepend(navListLinks);
        siteHeader.append(navListItems);
    });
    const main = document.querySelector("main");
    main.prepend(siteHeaderFrag);

    //Create Random Web Bits H1
    const H1 = document.createElement("H1");
    H1.innerHTML = '&lt;Random Web Bits&gt;';
    H1.setAttribute("id", "ArbitraryWebBits");

    siteHeader.append(H1);

    // Add site header and H1 to DOM
    document.querySelector("body").prepend(siteHeader);
})();
    
const footer = (function(){
    //-------------------SITE FOOTER------------------------//
    //-------SITE FOOTER-------//
    const siteFooter = document.createElement("footer")
    siteFooter.innerHTML = `<p>&copy;2022 Random WebBits. All Rights Reserved.</p>`;
    
    //Designed by IconHome 
    const footerIconPara = document.createElement("p");
    const footerIconLink = document.createElement("a");
    footerIconLink.href = 'https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755'
    footerIconLink.setAttribute('title', "IconHome: #45026755");
    footerIconLink.setAttribute('target', "_blank");
    footerIconLink.textContent = 'VectorStock.com';
    footerIconPara.textContent = `Favicon icon designed by IconHome at `;
    footerIconPara.appendChild(footerIconLink);
    siteFooter.append(footerIconPara);

    //add site footer to DOM
    document.querySelector("body").append(siteFooter);
})();

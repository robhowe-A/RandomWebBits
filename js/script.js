//-------------------SITE HEADER AND FOOTER------------------------//
//-------SITE HEADER-------//

//Create site header and navigation elements
const siteHeader = document.createElement("header");
const navContent = `
    <li><a href="/RandomWebBits/index.html">Home</a>&nbsp;|&nbsp;</li>
    <li><a href="/RandomWebBits/pages.html">Pages</a>&nbsp;|</li>
`;
const headerNav = document.createElement("nav");
const headerUL = document.createElement("ul");
headerUL.innerHTML = navContent;
headerNav.append(headerUL);
siteHeader.append(headerNav);

//Create site H1
const H1 = document.createElement("H1");
H1.innerHTML = '&lt;Random Web Bits&gt;';
H1.setAttribute("id", "ArbitraryWebBits");

siteHeader.append(H1);

// Add site header and H1 to DOM
document.querySelector("body").prepend(siteHeader);




//-------------------SITE FOOTER------------------------//
//-------SITE FOOTER-------//
const siteFooter = document.createElement("footer");
const siteFooterP = document.createElement("p");
siteFooterP.innerHTML = "&copy;2022 Random WebBits. All Rights Reserved."
siteFooter.prepend(siteFooterP);

//add site footer to DOM
document.querySelector("body").append(siteFooter);

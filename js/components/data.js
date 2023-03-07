//-------------------Articles -----------------------//
import WebBit from "./WebBit.js"

// Create new AA (Arbitrary Article)
const Article01 = new WebBit (
    "domainLookup",
    1,
    "Domain Lookup",
    "Check an available domain using WhoIS API search",
    "December 4, 2022",
    "pages/domainlookup.html",
    "img/whois.webp",
    "WhoIs Lookup"
);
const Article02 = new WebBit (
    "htmlresponses",
    2,
    "HTML Frames",
    "View HTML page response status information",
    "December 11, 2022",
    "pages/htmlresponses.html",
    "img/HTML_Frames.webp",
    "HTML frames example"
);
const Article03 = new WebBit (
    "nasa",
    3,
    "NASA Pages",
    "Check out some NASA links",
    "December 18, 2022",
    "pages/nasa.html",
    "img/NASA.webp",
    "NASA Artemis Logo"
);
const Article04 = new WebBit (
    "httpscert",
    4,
    "HTTPS Certificate",
    "Select to view a website's HTTPS certificate",
    "December 26, 2022",
    "pages/https.html",
    "img/https_cert.webp",
    "Cursor selecting HTTPS certificate"
);
const Article05 = new WebBit (
    "webTech",
    5,
    "Wappalyzer",
    "Wappalyzer browser extension",
    "January 2, 2023",
    "pages/webtech.html",
    "img/wappalyzer-logo.webp",
    "Browser extension logo. A white w on a purple tile."
);
const Article06 = new WebBit (
    "jsonObject",
    6,
    "jsonObject",
    "JSON object notation",
    "January 9, 2023",
    "pages/jsonobject.html",
    "img/json.webp",
    "JSON logo: A grey circle with artistic spirals."
);
const Article07 = new WebBit (
    "Wi-Fi",
    7,
    "Wi-Fi Version",
    "Determine Wifi Version",
    "January 16, 2023",
    "pages/wifi.html",
    "img/wifi.webp",
    "Wi-Fi logo with a black circle background."
);
const Article08 = new WebBit (
    "chatGPT",
    8,
    "Preview chatGPT",
    "Chat with an AI for research and development.",
    "January 28, 2023",
    "pages/chatgpt.html",
    "img/ai.webp",
    "Decorative AI logo"
);
const Article09 = new WebBit (
    "paint3d",
    9,
    "Paint 3D",
    "Edit pictures or screen captures using paint 3D",
    "January 28, 2023",
    "pages/paint3d.html",
    "img/prototype.webp",
    "Colorful prototyping icon"
);
const Article10 = new WebBit (
    "Dictionary",
    10,
    "Dictionary Terms",
    "List dictionary terms using a dictionary API",
    "January 30, 2023",
    "pages/dictionaryword.html",
    "img/dictionary.webp",
    "Dictionary icon depiction"
);
const Article11 = new WebBit (
    "BOINC",
    11,
    "Contribute for Science United",
    "Pivot the unused computing potential for science",
    "February 6, 2023",
    "pages/boinc.html",
    "img/boinc_glossy.webp",
    "BOINC logo"
);
const Article12 = new WebBit (
    "IP Address",
    12,
    "IP Address Lookup",
    "Lookup public and local IP addresses",
    "February 13, 2023",
    "pages/ipaddress.html",
    "img/ip.webp",
    "IP location and browser icon"
);
const Article13 = new WebBit (
    "HTML Markup",
    13,
    "HTML Source Code",
    "Reveal HTML source code and JavaScript",
    "February 26, 2023",
    "pages/markup.html",
    "img/HTML_source.webp",
    "HTML frames icon"
);
const Article14 = new WebBit (
    "Search Verticals",
    14,
    "GUIDE: Search Verticals",
    "Optimize your search engine news and results",
    "February 26, 2023",
    "pages/searchverticals.html",
    "img/search_settings.webp",
    "Search settings icon"
);
const Article15 = new WebBit (
    "Network Speed",
    15,
    "Network Speed Test",
    "Test the network adapters with a PowerShell script",
    "March 7, 2023",
    "pages/networkspeed.html",
    "img/page-speed.webp",
    "Speed test dial icon"
);

const ArbitraryArticles = [Article01, Article02, Article03, 
    Article04, Article05, Article06, Article07, Article08, 
    Article09, Article10, Article11, Article12, Article13,
    Article14, Article15];


export default ArbitraryArticles;

//--Copyright (c) Robert A. Howell
import WebBit from "./WebBit.js"

// Create new AA (Arbitrary Article)

const ArbitraryArticles = new Array(
    new WebBit(
        "domainLookup",
        1,
        "Domain Lookup",
        "Check an available domain using WhoIS API search",
        "December 4, 2022",
        "pages/domainlookup.html",
        "img/whois.webp",
        "WhoIs Lookup"
    ),
    new WebBit(
        "htmlresponses",
        2,
        "HTML Frames",
        "View HTML page response status information",
        "December 11, 2022",
        "pages/htmlresponses.html",
        "img/HTML_Frames.webp",
        "HTML frames example"
    ),
    new WebBit(
        "httpscert",
        4,
        "HTTPS Certificate",
        "Select to view a website's HTTPS certificate",
        "December 26, 2022",
        "pages/https.html",
        "img/https_cert.webp",
        "Cursor selecting HTTPS certificate"
    ),
    new WebBit(
        "webTech",
        5,
        "Wappalyzer",
        "Wappalyzer browser extension",
        "January 2, 2023",
        "pages/webtech.html",
        "img/wappalyzer-logo.webp",
        "Browser extension logo. A white w on a purple tile."
    ),
    new WebBit(
        "jsonObject",
        6,
        "jsonObject",
        "JSON object notation",
        "January 9, 2023",
        "pages/jsonobject.html",
        "img/json.webp",
        "JSON logo: A grey circle with artistic spirals."
    ),
    new WebBit(
        "Wi-Fi",
        7,
        "Wi-Fi Version",
        "Determine Wifi Version",
        "January 16, 2023",
        "pages/wifi.html",
        "img/wifi.webp",
        "Wi-Fi logo with a black circle background."
    ),
    new WebBit(
        "chatGPT",
        8,
        "Preview chatGPT",
        "Chat with an AI for research and development.",
        "January 28, 2023",
        "pages/chatgpt.html",
        "img/ai.webp",
        "Decorative AI logo"
    ),
    new WebBit(
        "paint3d",
        9,
        "Paint 3D",
        "Edit pictures or screen captures using paint 3D",
        "January 28, 2023",
        "pages/paint3d.html",
        "img/prototype.webp",
        "Colorful prototyping icon"
    ),
    new WebBit(
        "Dictionary",
        10,
        "Dictionary Terms",
        "List dictionary terms using a dictionary API",
        "January 30, 2023",
        "pages/dictionaryword.html",
        "img/dictionary.webp",
        "Dictionary icon depiction"
    ),
    new WebBit(
        "BOINC",
        11,
        "Contribute for Science United",
        "Pivot the unused computing potential for science",
        "February 6, 2023",
        "pages/boinc.html",
        "img/boinc_glossy.webp",
        "BOINC logo"
    ),
    new WebBit(
        "IP Address",
        12,
        "IP Address Lookup",
        "Lookup public and local IP addresses",
        "February 13, 2023",
        "pages/ipaddress.html",
        "img/ip.webp",
        "IP location and browser icon"
    ),
    new WebBit(
        "HTML Markup",
        13,
        "HTML Source Code",
        "Reveal HTML source code and JavaScript",
        "February 26, 2023",
        "pages/markup.html",
        "img/HTML_source.webp",
        "HTML frames icon"
    ),
    new WebBit(
        "Network Speed",
        15,
        "Network Speed Test",
        "Test the network adapters with a PowerShell script",
        "March 7, 2023",
        "pages/networkspeed.html",
        "img/page-speed.webp",
        "Speed test dial icon"
    ),
    new WebBit(
        "PowerShell Drives",
        17,
        "PowerShell Drives",
        "Similar to an HDD, except it is only in PowerShell",
        "March 20, 2023",
        "pages/drives.html",
        "img/terminal.webp",
        "Computer terminal icon"
    ),
    new WebBit(
        "LEARN: DNS",
        20,
        "How DNS works",
        "A general overview of Domain Name System",
        "April 4, 2023",
        "pages/dns.html",
        "img/dns.webp",
        "DNS drawing attached to a keyboard"
    ),
    new WebBit(
        "LEARN: Google",
        22,
        "Google is #1 website",
        "Google is the #1 trafficked site",
        "April 17, 2023",
        "pages/google.html",
        "img/search-engine.webp",
        "A bar graph icon"
    ),
);
const GuideShorts = new Array(
    new WebBit(
        "Search Verticals",
        14,
        "GUIDE: Search Verticals",
        "Optimize your search engine news and results",
        "February 26, 2023",
        "guides/searchverticals.html",
        "img/search_settings.webp",
        "Search settings icon"
    ),
    new WebBit(
        "SMTP",
        16,
        "GUIDE: SMTP and Email",
        "Learn Email protocols and port numbers",
        "March 13, 2023",
        "guides/smtp.html",
        "img/communications.webp",
        "Email server-stack with mail icon"
    ),
    new WebBit(
        "DevTools",
        19,
        "GUIDE: Dev Tools: Application Tab",
        "Review site data when clearing the browser history",
        "March 27, 2023",
        "guides/applicationtab.html",
        "img/tool-box.webp",
        "Developer's tool kit icon"
    ),
    new WebBit(
        "DevToolsTwo",
        21,
        "GUIDE: Dev Tools: Inspect Pages",
        "Open the developer's toolbox another way",
        "April 10, 2023",
        "guides/inspectpages.html",
        "img/tool-box2.webp",
        "Developer's tool kit icon two"
    ),
);
const Explore = new Array(
    new WebBit(
        "nasa",
        3,
        "EXPLORE: NASA Pages",
        "Check out some NASA links",
        "December 18, 2022",
        "explore/nasa.html",
        "img/NASA.webp",
        "NASA Artemis Logo"
    ),
    new WebBit(
        "Virtual Tour",
        18,
        "EXPLORE: Virtual Tours",
        "Explore the real world in a web browser",
        "March 23, 2023",
        "explore/virtualtour.html",
        "img/google-expeditions.webp",
        "Google Expeditions logo from FLATICON"
    ),
);

const WebBits = [ArbitraryArticles, GuideShorts, Explore]

export default WebBits;
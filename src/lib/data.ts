"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import WebBit from "../models/WebBit"

// Create new AA (Arbitrary Article)

const ArbitraryArticles = new Array(
    new WebBit(
        "domainLookup",
        1,
        "Domain Lookup",
        "Check an available domain using WhoIS API search",
        new Date(2022, 12, 4),
        "pages/domainlookup.html",
        "img/whois.webp",
        "WhoIs Lookup"
    ),
    new WebBit(
        "htmlresponses",
        2,
        "HTML Frames",
        "View HTML page response status information",
        new Date(2022, 12, 11),
        "pages/htmlresponses.html",
        "img/HTML_Frames.webp",
        "HTML frames example"
    ),
    new WebBit(
        "httpscert",
        4,
        "HTTPS Certificate",
        "Select to view a website's HTTPS certificate",
        new Date(2022, 12, 26),
        "pages/https.html",
        "img/https_cert.webp",
        "Cursor selecting HTTPS certificate"
    ),
    new WebBit(
        "webTech",
        5,
        "Wappalyzer",
        "Wappalyzer browser extension",
        new Date(2023, 1, 2),
        "pages/webtech.html",
        "img/wappalyzer-logo.webp",
        "Browser extension logo. A white w on a purple tile."
    ),
    new WebBit(
        "jsonObject",
        6,
        "jsonObject",
        "JSON object notation",
        new Date(2023, 1, 9),
        "pages/jsonobject.html",
        "img/json.webp",
        "JSON logo: A grey circle with artistic spirals."
    ),
    new WebBit(
        "Wi-Fi",
        7,
        "Wi-Fi Version",
        "Determine Wifi Version",
        new Date(2023, 1, 16),
        "pages/wifi.html",
        "img/wifi.webp",
        "Wi-Fi logo with a black circle background."
    ),
    new WebBit(
        "chatGPT",
        8,
        "Preview chatGPT",
        "Chat with an AI for research and development.",
        new Date(2023, 1, 28),
        "pages/chatgpt.html",
        "img/ai.webp",
        "Decorative AI logo"
    ),
    new WebBit(
        "paint3d",
        9,
        "Paint 3D",
        "Edit pictures or screen captures using paint 3D",
        new Date(2023, 1, 28),
        "pages/paint3d.html",
        "img/prototype.webp",
        "Colorful prototyping icon"
    ),
    new WebBit(
        "Dictionary",
        10,
        "Dictionary Terms",
        "List dictionary terms using a dictionary API",
        new Date(2023, 1, 30),
        "pages/dictionaryword.html",
        "img/dictionary.webp",
        "Dictionary icon depiction"
    ),
    new WebBit(
        "BOINC",
        11,
        "Contribute for Science United",
        "Pivot the unused computing potential for science",
        new Date(2023, 2, 6),
        "pages/boinc.html",
        "img/boinc_glossy.webp",
        "BOINC logo"
    ),
    new WebBit(
        "IP Address",
        12,
        "IP Address Lookup",
        "Lookup public and local IP addresses",
        new Date(2023, 2, 13),
        "pages/ipaddress.html",
        "img/ip.webp",
        "IP location and browser icon"
    ),
    new WebBit(
        "HTML Markup",
        13,
        "HTML Source Code",
        "Reveal HTML source code and JavaScript",
        new Date(2023, 2, 26),
        "pages/markup.html",
        "img/HTML_source.webp",
        "HTML frames icon"
    ),
    new WebBit(
        "Network Speed",
        15,
        "Network Speed Test",
        "Test the network adapters with a PowerShell script",
        new Date(2023, 3, 7),
        "pages/networkspeed.html",
        "img/page-speed.webp",
        "Speed test dial icon"
    ),
    new WebBit(
        "PowerShell Drives",
        17,
        "PowerShell Drives",
        "Similar to an HDD, except it is only in PowerShell",
        new Date(2023, 3, 20),
        "pages/drives.html",
        "img/terminal.webp",
        "Computer terminal icon"
    ),
    new WebBit(
        "LEARN: DNS",
        20,
        "How DNS works",
        "A general overview of Domain Name System",
        new Date(2023, 4, 4),
        "pages/dns.html",
        "img/dns.webp",
        "DNS drawing attached to a keyboard"
    ),
    new WebBit(
        "LEARN: Google",
        22,
        "Google is #1 website",
        "Google is the #1 trafficked site",
        new Date(2023, 4, 17),
        "pages/google.html",
        "img/search-engine.webp",
        "A bar graph icon"
    ),
    new WebBit(
        "DOM",
        23,
        "DOM",
        "Review the DOM with a DOM tree",
        new Date(2023, 4, 27),
        "pages/dom.html",
        "img/tree.webp",
        "A tree icon"
    ),
    new WebBit(
        "WebIDE",
        24,
        "WebIDE",
        "Try skipping the download with a web IDE",
        new Date(2023, 5, 3),
        "pages/webides.html",
        "img/ux.webp",
        "A computer application icon"
    ),
    new WebBit(
        "SVG",
        25,
        "SVG",
        "Find an SVG and learn about the SVG language",
        new Date(2023, 5, 9),
        "pages/svg.html",
        "img/svg.svg",
        "An svg icon example."
    ),
    new WebBit(
        "JavaScript",
        26,
        "JavaScript",
        "Disable the JavaScript to test website function",
        new Date(2023, 5, 22),
        "pages/javascript.html",
        "img/software-application.webp",
        "A javascript function icon."
    ),
    new WebBit(
        "LEARN: HTTP",
        28,
        "HTTP",
        "HTTP makes sending and receiving web pages possible.",
        new Date(2023, 6, 12),
        "pages/http.html",
        "img/http.webp",
        "Http verb in front of a globe icon."
    ),
    new WebBit(
        "CSS",
        29,
        "CSS",
        "CSS styles the elements within a page.",
        new Date(2023, 6, 19),
        "pages/css.html",
        "img/css-3.webp",
        "A CSS three logo."
    ),
);
const GuideShorts = new Array(
    new WebBit(
        "Search Verticals",
        14,
        "GUIDE: Search Verticals",
        "Optimize your search engine news and results",
        new Date(2023, 2, 26),
        "guides/searchverticals.html",
        "img/search_settings.webp",
        "Search settings icon"
    ),
    new WebBit(
        "SMTP",
        16,
        "GUIDE: SMTP and Email",
        "Learn Email protocols and port numbers",
        new Date(2023, 3, 13),
        "guides/smtp.html",
        "img/communications.webp",
        "Email server-stack with mail icon"
    ),
    new WebBit(
        "DevTools",
        19,
        "GUIDE: Dev Application",
        "Review dev tool's application tab",
        new Date(2023, 3, 27),
        "guides/applicationtab.html",
        "img/tool-box.webp",
        "Developer's tool kit icon"
    ),
    new WebBit(
        "DevToolsTwo",
        21,
        "GUIDE: Inspect Pages",
        "Open the developer's toolbox another way",
        new Date(2023, 4, 10),
        "guides/inspectpages.html",
        "img/tool-box2.webp",
        "Developer's tool kit icon two"
    ),
    new WebBit(
        "PWAIcon",
        27,
        "GUIDE: Install the PWA applications",
        "Progressive websites have an installation option",
        new Date(2023, 5, 27),
        "guides/pwaicon.html",
        "img/app-development.webp",
        "App development icon"
    ),
    new WebBit(
        "ClearCookies",
        30,
        "GUIDE: Clear cookies quickly",
        "Don't waste time sifting through settings",
        new Date(2023, 7, 2),
        "guides/clearcookiesquickly.html",
        "img/cookies.webp",
        "Browser cookie icon"
    ),
);
const Explore = new Array(
    new WebBit(
        "nasa",
        3,
        "EXPLORE: NASA Pages",
        "Explore the NASA domain. Learn about the universe via NASA links",
        new Date(2022, 12, 18),
        "explore/nasa.html",
        "img/NASA.webp",
        "NASA Artemis Logo"
    ),
    new WebBit(
        "Virtual Tour",
        18,
        "EXPLORE: Virtual Tours",
        "Explore the real world in a web browser",
        new Date(2023, 3, 23),
        "explore/virtualtour.html",
        "img/google-expeditions.webp",
        "Google Expeditions logo from FLATICON"
    ),
    new WebBit(
        "Webb",
        31,
        "EXPLORE: Webb Telescope",
        "Explore Webb's web for high resolution deep-space science",
        new Date(2023, 7, 3),
        "explore/webbtelescope.html",
        "img/JWST_poster.webp",
        "James Webb space telescope poster image"
    ),
);

const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore]

export default WEBBITDATA;
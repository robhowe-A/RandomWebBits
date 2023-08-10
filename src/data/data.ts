"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import WebBit from "../models/WebBit"
import AttributionLink from "../models/AttributionLink";

// Create new AA (Arbitrary Article)

/**
 * "Arbitrary Articles' section card data."
 */
const ArbitraryArticles = new Array(
    new WebBit(
        "Domainlookup",
        1,
        "Domain Lookup",
        "Check an available domain using WhoIS API search",
        new Date(2022, 12, 4),
        "pages/domainlookup.html",
        "img/whois.webp",
        "WhoIs Lookup",
        new AttributionLink(
            "domain icons",
            "Domain icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/domain",
            "Flaticon",
            "Domain Lookup",
            1
        )
    ),
    new WebBit(
        "Htmlresponses",
        2,
        "HTML Frames",
        "View HTML page response status information",
        new Date(2022, 12, 11),
        "pages/htmlresponses.html",
        "img/HTML_Frames.webp",
        "HTML frames example",
        new AttributionLink(
            "code icons",
            "Code icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/code",
            "Flaticon",
            "HTML Source Code",
            2
        )
    ),
    new WebBit(
        "Httpscert",
        4,
        "HTTPS Certificate",
        "Select to view a website's HTTPS certificate",
        new Date(2022, 12, 26),
        "pages/https.html",
        "img/https_cert.webp",
        "Cursor selecting HTTPS certificate",
        new AttributionLink(
            "ssl certificate icons",
            "Ssl certificate icons created by inipagistudio - Flaticon",
            "https://www.flaticon.com/free-icons/ssl-certificate",
            "Flaticon",
            "HTTPS Certificate",
            4
        )
    ),
    new WebBit(
        "Webtech",
        5,
        "Wappalyzer",
        "Wappalyzer browser extension",
        new Date(2023, 1, 2),
        "pages/webtech.html",
        "img/wappalyzer-logo.webp",
        "Browser extension logo. A white w on a purple tile."
    ),
    new WebBit(
        "Jsonobject",
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
        "Chatgpt",
        8,
        "Preview chatGPT",
        "Chat with an AI for research and development.",
        new Date(2023, 1, 28),
        "pages/chatgpt.html",
        "img/ai.webp",
        "Decorative AI logo",
        new AttributionLink(
            "ai icons",
            "Ai icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/ai",
            "Flaticon",
            "Preview chatGPT",
            8
        )
    ),
    new WebBit(
        "Paint3d",
        9,
        "Paint 3D",
        "Edit pictures or screen captures using paint 3D",
        new Date(2023, 1, 28),
        "pages/paint3d.html",
        "img/prototype.webp",
        "Colorful prototyping icon",
        new AttributionLink(
            "prototype icons",
            "Prototype icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/prototype",
            "Flaticon",
            "Paint 3D",
            9
        )
    ),
    new WebBit(
        "Dictionary",
        10,
        "Dictionary Terms",
        "List dictionary terms using a dictionary API",
        new Date(2023, 1, 30),
        "pages/dictionaryword.html",
        "img/dictionary.webp",
        "Dictionary icon depiction",
        new AttributionLink(
            "dictionary icons",
            "Dictionary icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/dictionary",
            "Flaticon",
            "Dictionary Terms",
            10
        )
    ),
    new WebBit(
        "Boinc",
        11,
        "Contribute for Science United",
        "Pivot the unused computing potential for science",
        new Date(2023, 2, 6),
        "pages/boinc.html",
        "img/boinc_glossy.webp",
        "BOINC logo",
        new AttributionLink(
            "BOINC icons",
            "BOINC icon designed by Michal Krakowiak. Coyright(C) University of California",
            "https://boinc.berkeley.edu",
            "BOINC",
            "Contribute for Science United",
            11
        )
    ),
    new WebBit(
        "IPAddress",
        12,
        "IP Address Lookup",
        "Lookup public and local IP addresses",
        new Date(2023, 2, 13),
        "pages/ipaddress.html",
        "img/ip.webp",
        "IP location and browser icon",
        new AttributionLink(
            "IP icons",
            "IP icons created by kerismaker - Flaticon",
            "https://www.flaticon.com/free-icons/ip",
            "Flaticon",
            "IP Address Lookup",
            12
        )
    ),
    new WebBit(
        "HTMLMarkup",
        13,
        "HTML Source Code",
        "Reveal HTML source code and JavaScript",
        new Date(2023, 2, 26),
        "pages/markup.html",
        "img/HTML_source.webp",
        "HTML frames icon",
        new AttributionLink(
            "html icons",
            "Html icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/html",
            "Flaticon",
            "HTML Source Code",
            13
        )
    ),
    new WebBit(
        "Networkspeed",
        15,
        "Network Speed Test",
        "Test the network adapters with a PowerShell script",
        new Date(2023, 3, 7),
        "pages/networkspeed.html",
        "img/page-speed.webp",
        "Speed test dial icon",
        new AttributionLink(
            "page speed icons",
            "Page speed icons created by Prosymbols Premium - Flaticon",
            "https://www.flaticon.com/free-icons/page-speed",
            "Flaticon",
            "Network Speed",
            15
        )
    ),
    new WebBit(
        "PowerShelldrives",
        17,
        "PowerShell Drives",
        "Similar to an HDD, except it is only in PowerShell",
        new Date(2023, 3, 20),
        "pages/drives.html",
        "img/terminal.webp",
        "Computer terminal icon",
        new AttributionLink(
            "terminal icons",
            "Terminal icons created by Flat Icons - Flaticon",
            "https://www.flaticon.com/free-icons/terminal",
            "Flaticon",
            "PowerShell Drives",
            17
        )
    ),
    new WebBit(
        "LEARN__DNS",
        20,
        "How DNS works",
        "A general overview of Domain Name System",
        new Date(2023, 4, 4),
        "pages/dns.html",
        "img/dns.webp",
        "DNS drawing attached to a keyboard",
        new AttributionLink(
            "dns icons",
            "Dns icons created by kerismaker - Flaticon",
            "https://www.flaticon.com/free-icons/dns",
            "Flaticon",
            "LEARN: DNS",
            20
        )
    ),
    new WebBit(
        "LEARN__Google",
        22,
        "Google is #1 website",
        "Google is the #1 trafficked site",
        new Date(2023, 4, 17),
        "pages/google.html",
        "img/search-engine.webp",
        "A bar graph icon",
        new AttributionLink(
            "rank icons",
            "Rank icons created by Pixelmeetup - Flaticon",
            "https://www.flaticon.com/free-icons/rank",
            "Flaticon",
            "LEARN: Google",
            22
        )
    ),
    new WebBit(
        "DOM",
        23,
        "DOM",
        "Review the DOM with a DOM tree",
        new Date(2023, 4, 27),
        "pages/dom.html",
        "img/tree.webp",
        "A tree icon",
        new AttributionLink(
            "tree icons",
            "Tree icons created by justicon - Flaticon",
            "https://www.flaticon.com/free-icons/tree",
            "Flaticon",
            "DOM",
            23
        )
    ),
    new WebBit(
        "Webide",
        24,
        "WebIDE",
        "Try skipping the download with a web IDE",
        new Date(2023, 5, 3),
        "pages/webides.html",
        "img/ux.webp",
        "A computer application icon",
        new AttributionLink(
            "design icons",
            "Design icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/design",
            "Flaticon",
            "webides",
            24
        )
    ),
    new WebBit(
        "SVG",
        25,
        "SVG",
        "Find an SVG and learn about the SVG language",
        new Date(2023, 5, 9),
        "pages/svg.html",
        "img/svg.svg",
        "An svg icon example.",
        new AttributionLink(
            "scalable vector graphics",
            "SVG icon created by Harvey Rayner",
            "http://www.w3.org/Graphics/SVG/",
            "W3C",
            "svg",
            25
        )
    ),
    new WebBit(
        "Disable_Javascript",
        26,
        "Disable JavaScript",
        "Disable the JavaScript to test website function",
        new Date(2023, 5, 22),
        "pages/javascript.html",
        "img/software-application.webp",
        "A javascript function icon.",
        new AttributionLink(
            "web coding icons",
            "Web coding icons created by Muhammad Atif - Flaticon",
            "https://www.flaticon.com/free-icons/web-coding",
            "Flaticon",
            "JavaScript",
            26
        )
    ),
    new WebBit(
        "LEARN__HTTP",
        28,
        "HTTP",
        "HTTP makes sending and receiving web pages possible.",
        new Date(2023, 6, 12),
        "pages/http.html",
        "img/http.webp",
        "Http verb in front of a globe icon.",
        new AttributionLink(
            "http icons",
            "Http icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/http",
            "Flaticon",
            "LEARN: HTTP",
            28
        )
    ),
    new WebBit(
        "CSSdef",
        29,
        "CSS",
        "CSS styles the elements within a page.",
        new Date(2023, 6, 19),
        "pages/css.html",
        "img/css-3.webp",
        "A CSS three logo.",
        new AttributionLink(
            "css icons",
            "Css icons created by Pixel perfect - Flaticon",
            "https://www.flaticon.com/free-icons/css",
            "Flaticon",
            "CSS",
            29
        )
    ),
    new WebBit(
        "Latency",
        32,
        "Latency",
        "Travel latency can slow down a website.",
        new Date(2023, 7, 18),
        "pages/latency.html",
        "img/chronometer.webp",
        "A stopwatch icon.",
        new AttributionLink(
            "timer icons",
            "Timer icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/timer",
            "Flaticon",
            "Latency",
            32
        )
    ),
    new WebBit(
        "HTMLdef",
        33,
        "Create HTML elements",
        "Learn the parts and syntax of an HTML element",
        new Date(2023, 7, 25),
        "pages/html.html",
        "img/html.webp",
        "HTML element syntax icon",
        new AttributionLink(
            "html icons",
            "Html icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/html",
            "Flaticon",
            "Create HTML elements",
            33
        )
    ),
    new WebBit(
        "URL",
        34,
        "URL Address Examples",
        "Learn the parts and syntax of a URL",
        new Date(2023, 8, 7),
        "pages/url.html",
        "img/www.webp",
        "URL example icon",
        new AttributionLink(
            "url icons",
            "Url icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/url",
            "Flaticon",
            "Create HTML elements",
            34
        )
    ),
);

/**
 * "Guide Shorts' section card data."
 */
const GuideShorts = new Array(
    new WebBit(
        "Searchverticals",
        14,
        "GUIDE: Search Verticals",
        "Optimize your search engine news and results",
        new Date(2023, 2, 26),
        "guides/searchverticals.html",
        "img/search_settings.webp",
        "Search settings icon",
        new AttributionLink(
            "content writing icons",
            "Content writing icons created by Vectors Tank - Flaticon",
            "https://www.flaticon.com/free-icons/content-writing",
            "Flaticon",
            "Search Verticals",
            14
        )
    ),
    new WebBit(
        "SMTP",
        16,
        "GUIDE: SMTP and Email",
        "Learn Email protocols and port numbers",
        new Date(2023, 3, 13),
        "guides/smtp.html",
        "img/communications.webp",
        "Email server-stack with mail icon",
        new AttributionLink(
            "server icons",
            "Server icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/server",
            "Flaticon",
            "SMTP and Email",
            16
        )
    ),
    new WebBit(
        "Devtools",
        19,
        "GUIDE: Dev Application",
        "Review dev tool's application tab",
        new Date(2023, 3, 27),
        "guides/applicationtab.html",
        "img/tool-box.webp",
        "Developer's tool kit icon",
        new AttributionLink(
            "toolbox icons",
            "Toolbox icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/toolbox",
            "Flaticon",
            "GUIDE: Dev Application",
            19
        )
    ),
    new WebBit(
        "Devtoolstwo",
        21,
        "GUIDE: Inspect Pages",
        "Open the developer's toolbox another way",
        new Date(2023, 4, 10),
        "guides/inspectpages.html",
        "img/tool-box2.webp",
        "Developer's tool kit icon two",
        new AttributionLink(
            "toolbox icons",
            "Toolbox icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/toolbox",
            "Flaticon",
            "GUIDE: Inspect Pages",
            21
        )
    ),
    new WebBit(
        "PWAIcon",
        27,
        "GUIDE: Install the PWA applications",
        "Progressive websites have an installation option",
        new Date(2023, 5, 27),
        "guides/pwaicon.html",
        "img/app-development.webp",
        "App development icon",
        new AttributionLink(
            "development icons",
            "Development icons created by Design Circle - Flaticon",
            "https://www.flaticon.com/free-icons/development",
            "Flaticon",
            "JavaScript",
            27
        )
    ),
    new WebBit(
        "Clearcookies",
        30,
        "GUIDE: Clear cookies quickly",
        "Don't waste time sifting through settings",
        new Date(2023, 7, 2),
        "guides/clearcookiesquickly.html",
        "img/cookies.webp",
        "Browser cookie icon",
        new AttributionLink(
            "cookie icons",
            "Cookie icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/cookie",
            "Flaticon",
            "GUIDE: Clear cookies quickly",
            30
        )
    ),
);

/**
 * "Explore section card data."
 */
const Explore = new Array(
    new WebBit(
        "Nasa",
        3,
        "EXPLORE: NASA Pages",
        "Explore the NASA domain. Learn about the universe via NASA links",
        new Date(2022, 12, 18),
        "explore/nasa.html",
        "img/NASA.webp",
        "NASA Artemis Logo",
        new AttributionLink(
            "NASA",
            "Image source via the National Aeronautics and Space Administration",
            "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html",
            "NASA",
            "NASA Pages",
            3
        )
    ),
    new WebBit(
        "Virtualtour",
        18,
        "EXPLORE: Virtual Tours",
        "Explore the real world in a web browser",
        new Date(2023, 3, 23),
        "explore/virtualtour.html",
        "img/google-expeditions.webp",
        "Google Expeditions logo from FLATICON",
        new AttributionLink(
            "google expeditions icons",
            "Google expeditions icons created by Freepik - Flaticon",
            "https://www.flaticon.com/free-icons/google-expeditions",
            "Flaticon",
            "Virtual Tour",
            18
        )
    ),
    new WebBit(
        "Webb",
        31,
        "James Webb Space Telescope",
        "",
        new Date(2023, 7, 3),
        "explore/webbtelescope.html",
        "img/JWST_poster.webp",
        "James Webb space telescope poster image",
        new AttributionLink(
            "Hexagon Litho (2018)",
            "James Webb Space Telescope icon provided by nasa.gov",
            "https://jwst.nasa.gov/content/features/educational/print.html",
            "jwst.nasa.gov",
            "James Webb Space Telescope icon",
            31
        )
    ),
);

/**
 * Multidimensional array. Rows are the different sections. Columns
 * contain each article's data belonging in that section.
 */
const WEBBITDATA = [ArbitraryArticles, GuideShorts, Explore]

export default WEBBITDATA;

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const rwbErrorBus_1 = __importDefault(require("./models/rwbErrorBus"));
const dictionaryWidget_1 = __importDefault(require("./components/global/dictionaryWidget"));
const toDosWidget_1 = __importDefault(require("./components/global/toDosWidget"));
const _404_1 = __importDefault(require("./components/global/404"));
const abbrDescription_1 = __importDefault(require("./models/abbrDescription"));
const classComponents = {
    /**
     * Attribute tags on mobile do not have hover option. This function adds a click
     *  ability to define an abbr tag, than rely on the title attribute.
     */
    abbrDefinitions: () => {
        const mobileabbrperf = new scriptPerf_1.default("Mobileabbrperf"); //start performance measure
        /**Give all abbr elements option to click to reveal the expanded description. */
        const allabbreviationelems = document.querySelectorAll("abbr");
        if (allabbreviationelems.length > 0) {
            for (let abbr of allabbreviationelems) {
                let abbrev = new abbrDescription_1.default(abbr);
                abbrev.revealAbbrDescription();
            }
        }
        mobileabbrperf.end(); //end performance measure
    },
    fourohfour: () => {
        if (!rwbErrorBus_1.default.checkElementforNull("PageComponents", "#Four-Oh-Four", false, true)) {
            _404_1.default.init();
        }
    },
    init: (page) => {
        const classperf = new scriptPerf_1.default("Classcomponents"); //begin performance measure
        // Add Dictionary Widget if an element with that class is on a page
        if (page == "/pages/dictionaryword.html" || page == "/index.html" || page == "/" || page == "") {
            if (rwbErrorBus_1.default.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true))
                return;
            dictionaryWidget_1.default.init();
        }
        // Add ToDos widget if an element with that class is on a page
        if (page == "/pages/todos.html" || page == "/index.html" || page == "/" || page == "") {
            if (rwbErrorBus_1.default.checkElementforNull("ClassComponent", ".ToDoList", true, true))
                return;
            toDosWidget_1.default.init();
        }
        // Add abbr definitions
        classComponents.abbrDefinitions();
        // Add RWB links definitions: appends ".html" to anchor href text (which is natively removed in Netlify)
        classComponents.rwbDataTypeAnchor();
        classperf.end(); //end performance measure
    },
    rwbDataTypeAnchor: () => {
        switch (location.pathname) {
            case "/guides/clearcookiesquickly.html":
                const rwbLink0 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink0[0].href = "/guides/devtools/applicationtab.html";
                break;
            case "/guides/devtools/applicationtab.html":
                const rwbLink1 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink1[0].href = "/guides/devtools/elementstab.html";
                rwbLink1[1].href = "/guides/devtools/consoletab.html";
                rwbLink1[2].href = "/guides/devtools/sourcestab.html";
                rwbLink1[3].href = "/guides/devtools/networktab.html";
                rwbLink1[4].href = "/guides/devtools/performancetab.html";
                rwbLink1[5].href = "/guides/devtools/memorytab.html";
                rwbLink1[6].href = "/guides/devtools/applicationtab.html";
                rwbLink1[7].href = "/guides/devtools/securitytab.html";
                rwbLink1[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink1[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink1[10].href = "/guides/clearcookiesquickly.html";
                break;
            case "/guides/devtools/consoletab.html":
                const rwbLink2 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink2[0].href = "/guides/devtools/elementstab.html";
                rwbLink2[1].href = "/guides/devtools/consoletab.html";
                rwbLink2[2].href = "/guides/devtools/sourcestab.html";
                rwbLink2[3].href = "/guides/devtools/networktab.html";
                rwbLink2[4].href = "/guides/devtools/performancetab.html";
                rwbLink2[5].href = "/guides/devtools/memorytab.html";
                rwbLink2[6].href = "/guides/devtools/applicationtab.html";
                rwbLink2[7].href = "/guides/devtools/securitytab.html";
                rwbLink2[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink2[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink2[10].href = "/explore/webbtelescope.html";
                rwbLink2[11].href = "/pages/dom.html";
                break;
            case "/guides/devtools/elementstab.html":
                const rwbLink3 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink3[0].href = "/guides/devtools/elementstab.html";
                rwbLink3[1].href = "/guides/devtools/consoletab.html";
                rwbLink3[2].href = "/guides/devtools/sourcestab.html";
                rwbLink3[3].href = "/guides/devtools/networktab.html";
                rwbLink3[4].href = "/guides/devtools/performancetab.html";
                rwbLink3[5].href = "/guides/devtools/memorytab.html";
                rwbLink3[6].href = "/guides/devtools/applicationtab.html";
                rwbLink3[7].href = "/guides/devtools/securitytab.html";
                rwbLink3[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink3[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink3[10].href = "/pages/dom.html";
                break;
            case "/guides/devtools/memorytab.html":
                const rwbLink4 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink4[0].href = "/guides/devtools/elementstab.html";
                rwbLink4[1].href = "/guides/devtools/consoletab.html";
                rwbLink4[2].href = "/guides/devtools/sourcestab.html";
                rwbLink4[3].href = "/guides/devtools/networktab.html";
                rwbLink4[4].href = "/guides/devtools/performancetab.html";
                rwbLink4[5].href = "/guides/devtools/memorytab.html";
                rwbLink4[6].href = "/guides/devtools/applicationtab.html";
                rwbLink4[7].href = "/guides/devtools/securitytab.html";
                rwbLink4[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink4[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/networktab.html":
                const rwbLink5 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink5[0].href = "/guides/devtools/elementstab.html";
                rwbLink5[1].href = "/guides/devtools/consoletab.html";
                rwbLink5[2].href = "/guides/devtools/sourcestab.html";
                rwbLink5[3].href = "/guides/devtools/networktab.html";
                rwbLink5[4].href = "/guides/devtools/performancetab.html";
                rwbLink5[5].href = "/guides/devtools/memorytab.html";
                rwbLink5[6].href = "/guides/devtools/applicationtab.html";
                rwbLink5[7].href = "/guides/devtools/securitytab.html";
                rwbLink5[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink5[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink5[10].href = "/pages/htmlresponses.html";
                break;
            case "/guides/devtools/performancetab.html":
                const rwbLink6 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink6[0].href = "/guides/devtools/elementstab.html";
                rwbLink6[1].href = "/guides/devtools/consoletab.html";
                rwbLink6[2].href = "/guides/devtools/sourcestab.html";
                rwbLink6[3].href = "/guides/devtools/networktab.html";
                rwbLink6[4].href = "/guides/devtools/performancetab.html";
                rwbLink6[5].href = "/guides/devtools/memorytab.html";
                rwbLink6[6].href = "/guides/devtools/applicationtab.html";
                rwbLink6[7].href = "/guides/devtools/securitytab.html";
                rwbLink6[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink6[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/sourcestab.html":
                const rwbLink7 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink7[0].href = "/guides/devtools/elementstab.html";
                rwbLink7[1].href = "/guides/devtools/consoletab.html";
                rwbLink7[2].href = "/guides/devtools/sourcestab.html";
                rwbLink7[3].href = "/guides/devtools/networktab.html";
                rwbLink7[4].href = "/guides/devtools/performancetab.html";
                rwbLink7[5].href = "/guides/devtools/memorytab.html";
                rwbLink7[6].href = "/guides/devtools/applicationtab.html";
                rwbLink7[7].href = "/guides/devtools/securitytab.html";
                rwbLink7[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink7[9].href = "/guides/devtools/cssoverviewtab.html";
                break;
            case "/guides/devtools/securitytab.html":
                const rwbLink11 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink11[0].href = "/guides/devtools/elementstab.html";
                rwbLink11[1].href = "/guides/devtools/consoletab.html";
                rwbLink11[2].href = "/guides/devtools/sourcestab.html";
                rwbLink11[3].href = "/guides/devtools/networktab.html";
                rwbLink11[4].href = "/guides/devtools/performancetab.html";
                rwbLink11[5].href = "/guides/devtools/memorytab.html";
                rwbLink11[6].href = "/guides/devtools/applicationtab.html";
                rwbLink11[7].href = "/guides/devtools/securitytab.html";
                rwbLink11[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink11[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink11[10].href = "/guides/https.html";
                break;
            case "/guides/devtools/lighthousetab.html":
                const rwbLink12 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink12[0].href = "/guides/devtools/elementstab.html";
                rwbLink12[1].href = "/guides/devtools/consoletab.html";
                rwbLink12[2].href = "/guides/devtools/sourcestab.html";
                rwbLink12[3].href = "/guides/devtools/networktab.html";
                rwbLink12[4].href = "/guides/devtools/performancetab.html";
                rwbLink12[5].href = "/guides/devtools/memorytab.html";
                rwbLink12[6].href = "/guides/devtools/applicationtab.html";
                rwbLink12[7].href = "/guides/devtools/securitytab.html";
                rwbLink12[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink12[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink12[10].href = "/pages/hsl.html";
                break;
            case "/guides/devtools/cssoverviewtab.html":
                const rwbLink13 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink13[0].href = "/guides/devtools/elementstab.html";
                rwbLink13[1].href = "/guides/devtools/consoletab.html";
                rwbLink13[2].href = "/guides/devtools/sourcestab.html";
                rwbLink13[3].href = "/guides/devtools/networktab.html";
                rwbLink13[4].href = "/guides/devtools/performancetab.html";
                rwbLink13[5].href = "/guides/devtools/memorytab.html";
                rwbLink13[6].href = "/guides/devtools/applicationtab.html";
                rwbLink13[7].href = "/guides/devtools/securitytab.html";
                rwbLink13[8].href = "/guides/devtools/lighthousetab.html";
                rwbLink13[9].href = "/guides/devtools/cssoverviewtab.html";
                rwbLink13[10].href = "/pages.html";
                break;
            case "/pages/datastorage.html":
                const rwbLink8 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink8[0].href = "/pages/markup.html";
                rwbLink8[1].href = "/guides/devtools/applicationtab.html";
                break;
            case "/pages/htmlresponses.html":
                const rwbLink9 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink9[0].href = "/guides/devtools/networktab.html";
                rwbLink9[1].href = "/pages/webides.html";
                break;
            case "/pages/url.html":
                const rwbLink10 = document.querySelectorAll("span[data-rwb-type=link] a");
                rwbLink10[0].href = "/pages/domainlookup.html";
                break;
            default:
                console.debug("No elements of type data-rwb-type=link found."); //shown with verbose logging
        }
    },
};
exports.default = classComponents;

},{"./components/global/404":2,"./components/global/dictionaryWidget":3,"./components/global/toDosWidget":4,"./models/abbrDescription":14,"./models/rwbErrorBus":23,"./models/scriptPerf":25}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const client_1 = require("../../models/client");
const notFound404Widget = {
    init: () => {
        let client404 = new client_1.client();
        let clientRefferInfo = document.querySelector("#clientreferrer");
        let clientRttInfo = document.querySelector("#clientrtt");
        let clientPlatformInfo = document.querySelector("#clientplat");
        //Fill information secion
        clientRefferInfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
        clientRttInfo.textContent = `${client404.connectiontype ? client404.connectiontype : "No connection type found."}`;
        clientRttInfo.textContent += `, rtt of ${client404.connectionrtt ? client404.connectionrtt : "No rtt found."}`;
        clientPlatformInfo.textContent = client404.browserplatform
            ? client404.browserplatform
            : "No platform information found.";
        clientPlatformInfo.textContent += `, ${client404.useragent ? client404.useragent : "No user agent info."}`;
        //Provide a link to go back where you came from
        let gobacklink = document.querySelector("#oldURL");
        if (client404.oldURL.includes("404.html")) {
            client404.oldURL = window.location.origin;
        }
        let gobackhref = client404.oldURL ? client404.oldURL : window.location.origin;
        gobacklink.setAttribute("href", `${gobackhref}`);
        gobacklink.setAttribute("title", gobackhref);
    },
};
exports.default = notFound404Widget;

},{"../../models/client":16}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const dictionarySearch_1 = require("../../models/dictionarySearch");
/**
 * Component containing the dictionary widget's creation.
 */
const dictionaryWidget = {
    /**
     * This initialization function creates a dictionary search widget by calling the
     *  constructor.
     * @param elem - Element containing 'dictionaryWidget' class
     */
    init: () => {
        let dictionaryWidgetStartingElement;
        dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");
        // DictionarySearch constructor
        Object.create(new dictionarySearch_1.DictionarySearch(dictionaryWidgetStartingElement));
    },
};
exports.default = dictionaryWidget;

},{"../../models/dictionarySearch":18}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const toDo_1 = require("../../models/toDo");
/**
 * Component containing the To-Do List widget's creation.
 */
const toDosWidget = {
    /**
     * Create a To-Do List widget.
     * @param elem - Element containing 'ToDoList' class
     */
    init: () => {
        let toDosElement;
        toDosElement = document.querySelector(".ToDoList");
        //ToDoList object
        const toDoWidget = new toDo_1.ToDoList();
        //Creates widget markup and populates To-Do tasks contained in Local Storage
        toDoWidget.createToDoListWidget(toDosElement);
    },
};
exports.default = toDosWidget;

},{"../../models/toDo":26}],5:[function(require,module,exports){
"strict mode";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const lit_all_min_js_1 = require("../../js/lit-all.min.js");
class AcronymsElem extends lit_all_min_js_1.LitElement {
    title = {};
    id = {};
    acronyms = [];
    // Define scoped styles right with your component, in plain CSS
    static styles = (0, lit_all_min_js_1.css) `
    .acronymList {
      display: block;
      width: fit-content;
      border: 0.5mm solid var(--clr-blue);
      box-shadow: 0.7px 0px 1.4px rgba(0, 0, 0, 0.303), 1.7px 0px 4.7px rgba(0, 0, 0, 0.447),
        -7px 0px 11px rgba(0, 0, 0, 0.75);
      border-radius: 15px;
      padding: 0 1em 1em 1em;
      margin: 2em;
      background-color: var(--clr-primary-400);
      color: var(--clr-all-primary-900);
    }
    .acronymList:hover {
      background-color: var(--clr-primary-500);
    }
    .acronymList ul {
      line-height: 1em;
      font-family: Ariel, sans-serif;
      padding: 0;
    }
    .acronymList li {
      list-style-type: none;
    }
    .acronymList h3 {
      color: var(--clr-primary-500);
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }
    .acronymList ul {
      text-align: left;
      margin: 0;
    }
    @media only screen and (min-width: 320px) {
      .acronymList ul {
        padding: 0em 1em;
      }
    }
    @media only screen and (min-width: 501px) {
      .acronymList ul {
        font-size: 20px;
      }
      .acronymList h3 {
        color: var(--clr-all-primary-900);
        font-size: 1.4em;
      }
    }
  `;
    constructor() {
        super();
        const PageAcronyms = [
            {
                page: "/pages/wifi.html",
                htmlTitle: "wifi",
                acronyms: [
                    "SSID",
                    "802.11a",
                    "802.11b",
                    "802.11g",
                    "802.11n",
                    "802.11ac",
                    "802.11ax",
                    "WLAN",
                    "IPv4",
                    "IPv6",
                    "MAC",
                    "AP",
                ],
            },
            {
                page: "/pages/networkspeed.html",
                htmlTitle: "networkspeed",
                acronyms: ["Ping", "NIC", "BPS", "MBPS", "GBPS", "Bit", "Byte", "ISP"],
            },
            {
                page: "/pages/markup.html",
                htmlTitle: "markup",
                acronyms: ["body", "head", "div", "href", "lang", "ul", "ol"],
            },
            {
                page: "/pages/ipaddress.html",
                htmlTitle: "ipaddress",
                acronyms: [
                    "IPV4",
                    "IPV6",
                    "TCP/IP",
                    "OSI",
                    "DHCP",
                    "DNS",
                    "Subnet Mask",
                    "CIDR",
                    "LAN",
                    "NAT",
                    "MAC",
                ],
            },
            {
                page: "/guides/https.html",
                htmlTitle: "https",
                acronyms: [
                    "KMS",
                    "PKI",
                    "RSA",
                    "SSL",
                    "TLS",
                    "SHA",
                    "AES",
                    "EFS",
                    "TPM",
                    "BitLocker",
                    "Encrypt",
                    "Decrypt",
                    "Signature",
                    "Elliptic Curve",
                ],
            },
            {
                page: "/pages/htmlresponses.html",
                htmlTitle: "htmlresponses",
                acronyms: [
                    "HTTP",
                    "HTTPS",
                    "TCP",
                    "UDP",
                    "DOM",
                    "Asset",
                    "Frame",
                    "Auth",
                    "Transport",
                    "Response",
                    "Verb",
                ],
            },
            {
                page: "/pages/domainlookup.html",
                htmlTitle: "domainlookup",
                acronyms: [
                    "DNS",
                    "DNSSEC",
                    "DDNS",
                    "FQDN",
                    "NetBIOS",
                    "Nameserver",
                    "OU",
                    "Top-level",
                    '"A" record',
                    "CNAME",
                ],
            },
            {
                page: "/pages/drives.html",
                htmlTitle: "drives",
                acronyms: [
                    "CSOM",
                    "SSOM",
                    "PS",
                    "NS (namespace)",
                    "Tree",
                    "Objects",
                    "Registry",
                    "Variables",
                    "TCP/IP",
                    "TLS",
                    "Cyphertext",
                    "CN",
                    "EKU",
                ],
            },
            {
                page: "/pages/dns.html",
                htmlTitle: "dns",
                acronyms: ["DDNS", "DNSSEC", '"A" record', "CAA", "NS (name server)", '"MX" record', "QPS"],
            },
            {
                page: "/pages/dom.html",
                htmlTitle: "dom",
                acronyms: [
                    "DOM",
                    "CSS",
                    "HTML",
                    "asset",
                    "property",
                    "attribute",
                    "variable",
                    "reference",
                    "function",
                    "root",
                ],
            },
            {
                page: "/pages/svg.html",
                htmlTitle: "svg",
                acronyms: ["XML", "XHTML", "RDF", "ISO", "DCMES", "CC License"],
            },
            {
                page: "/pages/javascript.html",
                htmlTitle: "javascript",
                acronyms: ["Defer", "Synchronous", "ES", "GUI", "JSON", "AJAX", "IIFE", "IDE", "DOM"],
            },
            {
                page: "/pages/http.html",
                htmlTitle: "javascript",
                acronyms: ["HTTP", "TCP", "UDP", "DNS", "TLS", "IP", "HTML", "CSS", "JS", "API"],
            },
            {
                page: "/pages/latency.html",
                htmlTitle: "javascript",
                acronyms: ["CMS", "TCP", "TLS", "IP", "PS (packet switching)", "DNS"],
            },
        ];
        const currentPage = PageAcronyms.filter(page => page.page === window.location.pathname);
        // Declare reactive properties
        this.title = "Common Acronyms";
        this.id = currentPage[0].htmlTitle;
        this.acronyms = currentPage[0].acronyms;
    }
    buildList() { }
    // Render the UI as a function of component state
    render() {
        let listitems = [];
        for (const acronyms of this.acronyms) {
            listitems.push((0, lit_all_min_js_1.html) `<li>${acronyms}</li>`);
        }
        return (0, lit_all_min_js_1.html) ` <aside class="acronymList">
      <h3>${this.title}:</h3>
      <ul id="acr-${this.id}">
        ${listitems}
      </ul>
    </aside>`;
    }
}
exports.default = AcronymsElem;

},{"../../js/lit-all.min.js":13}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const rwbErrorBus_1 = __importDefault(require("../../models/rwbErrorBus"));
const propagationLatencyCalculation_1 = require("../../models/propagationLatencyCalculation");
/**
 * Propagation Latency component.
 */
const latencyCalculator = {
    init: () => {
        let distanceElem;
        let mediumSpeedElem;
        let packetSizeElem;
        let transmissionRateElem;
        let resetElem;
        let calculateElem;
        let exampleElem1;
        let exampleElem2;
        let exampleElem3;
        if (rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#distance", true, false) ||
            rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#mediumSpeed", true, false) ||
            rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#packetSize", true, false) ||
            rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#transmissionRate", true, false) ||
            rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#reset", true, false) ||
            rwbErrorBus_1.default.checkElementforNull("latencyCalculator", "#calculate", true, false))
            console.log(`%cCheck missing elements at /pages/latency.html`, "color:orange;font-weight:bold;");
        distanceElem = document.querySelector("#distance");
        mediumSpeedElem = document.querySelector("#mediumSpeed");
        packetSizeElem = document.querySelector("#packetSize");
        transmissionRateElem = document.querySelector("#transmissionRate");
        resetElem = document.querySelector("#reset");
        calculateElem = document.querySelector("#calculate");
        exampleElem1 = document.querySelector("#example1");
        exampleElem2 = document.querySelector("#example2");
        exampleElem3 = document.querySelector("#example3");
        calculateElem.addEventListener("click", event => {
            event.preventDefault();
            if (distanceElem.value == null || mediumSpeedElem.value == null)
                return; //TODO: handle null elements alerts
            if (document.querySelectorAll("#propcalcres p")) {
                let resultelem = document.getElementById("propcalcres");
                let alltodelete = document.querySelectorAll("#propcalcres p");
                for (let n of alltodelete) {
                    resultelem.removeChild(n);
                }
            }
            const validateNumberInput = (str) => {
                // Take user input and filter to an accepted string
                var regSTR;
                let numstr = str.split(",").join("");
                propagationLatencyCalculation_1.PropagationLatencyCalculation.numberValidation(numstr)
                    ? (regSTR = Number(numstr))
                    : (regSTR = "INVALID");
                return regSTR;
            };
            var distance = validateNumberInput(distanceElem.value);
            if (distance == "INVALID") {
                //TODO: for now, return.
                return;
            }
            var mediumSpeed = validateNumberInput(mediumSpeedElem.value);
            if (mediumSpeed == "INVALID") {
                //TODO: for now, return.
                return;
            }
            else if (mediumSpeed > 300000) {
                //TODO: for now, return.
                return;
            }
            var packetSize = validateNumberInput(packetSizeElem.value);
            if (packetSize == "INVALID") {
                //TODO: for now, return.
                return;
            }
            var transmissionRate = validateNumberInput(transmissionRateElem.value);
            if (transmissionRate == "INVALID") {
                //TODO: for now, return.
                return;
            }
            let calculation = Object.create(new propagationLatencyCalculation_1.PropagationLatencyCalculation(distance, mediumSpeed, packetSize, transmissionRate));
            console.log(`Answer found: ${calculation.propagationDelay}`);
            latencyCalculator.resultmarkup(calculation);
        });
        resetElem.addEventListener("click", event => {
            let resultelem = document.getElementById("propcalcres");
            if (resultelem != null) {
                let alltodelete = document.querySelectorAll("#propcalcres p");
                for (let n of alltodelete) {
                    resultelem.removeChild(n);
                }
            }
        });
        exampleElem1.addEventListener("click", event => {
            event.preventDefault();
            distanceElem.value = "300";
            mediumSpeedElem.value = "300,000";
            packetSizeElem.value = "1500";
            transmissionRateElem.value = "1,000,000";
        });
        exampleElem2.addEventListener("click", event => {
            event.preventDefault();
            distanceElem.value = "150,000,000";
            mediumSpeedElem.value = "300,000";
            packetSizeElem.value = "4500";
            transmissionRateElem.value = "100,000";
        });
        exampleElem3.addEventListener("click", event => {
            event.preventDefault();
            distanceElem.value = "40,000";
            mediumSpeedElem.value = "300,000";
            packetSizeElem.value = "1500";
            transmissionRateElem.value = "56,000";
        });
    },
    resultmarkup: (result) => {
        let resultelem = document.getElementById("propcalcres");
        let newResult = document.createElement("p");
        newResult.innerHTML = `
      Propagation Delay: <span>${result.getPropagationDelay().toFixed(4)} s</span><br />
      Serialization Delay: <span>${result.getSerializationDelay().toFixed(4)} s</span><br />
      Network Latency: <span>${result.getNetworkLatency().toFixed(4)} s</span><br>
    `;
        resultelem.appendChild(newResult);
    },
};
exports.default = latencyCalculator;

},{"../../models/propagationLatencyCalculation":22,"../../models/rwbErrorBus":23}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssexColorCode = exports.urlexColorCode = exports.htmlexColorCode = void 0;
//--Copyright (c) 2023 Robert A. Howell
const colorCode_1 = require("../../models/colorCode");
const htmlexColorCode = {
    init: () => {
        // Get component elements that will be used in widget interactivity
        const openers = document.querySelectorAll(".Tagopen");
        const closers = document.querySelectorAll(".Tagclose");
        const values = document.querySelectorAll(".TextVal");
        const attributes = document.querySelectorAll(".Attribute");
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlessElements = new Array(openers, closers, values, attributes);
        const elementsColors = new Array("var(--clr-WhoIS_Orange)", "var(--clr-Red)", "var(--clr-DarkCyan)", "var(--clr-Green)");
        // Instantiate a color code object with all needed elements
        new colorCode_1.ColorCodeWidget(colorlessElements, elementsColors, document.querySelector(".reset"));
    },
};
exports.htmlexColorCode = htmlexColorCode;
const urlexColorCode = {
    init: () => {
        const protocol = document.querySelectorAll(".protocol");
        const domain = document.querySelectorAll(".domain");
        const port = document.querySelectorAll(".port");
        const folder = document.querySelectorAll(".folder");
        const file = document.querySelectorAll(".file");
        const query = document.querySelectorAll(".query");
        const key = document.querySelectorAll(".key");
        const value = document.querySelectorAll(".value");
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlessElements = new Array(protocol, domain, port, folder, file, query, key, value);
        const elementsColors = new Array("var(--clr-WhoIS_Orange)", "var(--clr-Skyblue)", "var(--clr-DarkCyan)", "var(--clr-Green)", "var(--clr-Red)", "var(--clr-primary-600)", "var(--clr-all-primary-500)", "var(--clr-Lightcoral)");
        // Instantiate a color code object with all needed elements
        new colorCode_1.ColorCodeWidget(colorlessElements, elementsColors, document.querySelector(".reset"));
    },
};
exports.urlexColorCode = urlexColorCode;
const cssexColorCode = {
    /**
     * Cssex is a page widget, applying style colors to elements of different
     * types
     */
    init: () => {
        const selectors = document.querySelectorAll(".Selector");
        const attributes = document.querySelectorAll(".Attribute");
        const values = document.querySelectorAll(".Value");
        const psuedos = document.querySelectorAll(".Psuedo-class");
        // Add elements to array data structures, needed for the ColorCode instantiation
        const colorlessElements = new Array(selectors, attributes, values, psuedos);
        const elementsColors = new Array("var(--clr-Red)", "var(--clr-WhoIS_Orange)", "var(--clr-Skyblue)", "var(--clr-Green)");
        // Instantiate a color code object with all needed elements
        new colorCode_1.ColorCodeWidget(colorlessElements, elementsColors, document.querySelector(".reset"));
    },
};
exports.cssexColorCode = cssexColorCode;

},{"../../models/colorCode":17}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const rwbErrorBus_1 = require("../../models/rwbErrorBus");
const domainLookup = {
    init: () => {
        // Get the form, assign to a variable
        let formElemClassName = "searchWhoIS";
        let form;
        form = document.getElementById(`${formElemClassName}`);
        if (form == null) {
            new rwbErrorBus_1.RwbReferenceError("ElementNotFound", `Element not found: '${formElemClassName}':`);
        }
        form.addEventListener("submit", domainLookup.searchWHOIS);
    },
    searchWHOIS: () => {
        let inputElem = document.getElementById("txtSearch");
        let value = inputElem.value;
        var URL = "https://www.whois.com/whois/" + value;
        window.open(URL, "_blank");
        return false;
    },
};
exports.default = domainLookup;

},{"../../models/rwbErrorBus":23}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const expandingList_1 = require("../../models/expandingList");
const expandingListDOMWidget = {
    init: () => {
        // Define the expanding list element, for use within the page
        customElements.define("expanding-list", expandingList_1.ExpandingListElement, {
            extends: "ul",
        });
        // Update expanding list element properties
        // "DOM" page specific properties
        // Add a title attribute to all li-span that can expand further
        const expandableLiOpenOpen = document.querySelectorAll(`ul[is="expanding-list"] li span:first-child`);
        const expandableLiCloseSpan = document.querySelectorAll(`ul[is="expanding-list"] li span:nth-child(3)`);
        // Set attributes and property values for expanding-element expandable elements
        for (let span of expandableLiOpenOpen) {
            span.setAttribute("title", "Select to expand...");
            span.setAttribute("tabindex", "0");
            // Add a click event listener to the 'DOM' items elements
            // --->when clicked, change the title property to reflect open or closed status
            span.addEventListener("click", e => {
                e.preventDefault();
                span.getAttribute("title") == "Select to expand..."
                    ? (() => {
                        span.setAttribute("title", "Select to close...");
                        if (span.nextElementSibling.nextElementSibling == null)
                            return;
                        span.nextElementSibling.nextElementSibling.setAttribute("title", "Select opening element tag to close.");
                    })()
                    : (() => {
                        span.setAttribute("title", "Select to expand...");
                        if (span.nextElementSibling.nextElementSibling == null)
                            return;
                        span.nextElementSibling.nextElementSibling.setAttribute("title", "Select opening element tag to expand.");
                    })();
            });
        }
        // Set property of closing span elements
        for (let span of expandableLiCloseSpan) {
            span.setAttribute("title", "Select opening element tag to expand.");
        }
    },
};
exports.default = expandingListDOMWidget;

},{"../../models/expandingList":20}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const growingCard_1 = require("../../models/growingCard");
const activeCardsWidget = {
    init: () => {
        customElements.define("growing-card", growingCard_1.GrowingCardElement, {
            extends: "li",
        });
        document.body.addEventListener("click", e => {
            if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLDetailsElement) {
                return;
            }
            e.preventDefault();
            // Array of list items (cards)
            let listLIs = Array.from(document.querySelectorAll("#webIDECards li"));
            // Click event to resize the cards if clicking outside of a card
            // When clicking outside a card, resize all cards to normal
            for (let item of listLIs) {
                let tempItem = item;
                if (e.target !== tempItem && !tempItem.contains(e.target)) {
                    growingCard_1.GrowingCardElement.shrinkCard(tempItem);
                }
            }
            // Reshade all cards because none of them are big
            for (let li of listLIs) {
                growingCard_1.GrowingCardElement.shadeInactiveCard(li);
            }
        });
    },
};
exports.default = activeCardsWidget;

},{"../../models/growingCard":21}],11:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const hslColorWidget = {
    init: () => {
        let hslOne = document.querySelector("#HSLColorONE");
        let hslTwo = document.querySelector("#HSLColorTWO");
        let hslThree = document.querySelector("#HSLColorTHREE");
        class boxcolor {
            hue = 0;
            saturation = 100;
            lightness = 50;
            constructor(hue = 0, saturation = 100, lightness = 50) {
                if (hue == 0) {
                    this.hue = 0;
                }
                else if (hue == 120) {
                    this.hue = 120;
                }
                else if (hue == 240) {
                    this.hue = 240;
                }
                if (hue < 0 || hue >= 360 || saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100) {
                    let err = new RangeError();
                    console.log(`%c<RWB>%cHSL color value out of acceptable range:\n%o\n%c</RWB>`, "color:gray;font-weight:bold;", "color:gray;", err, "color:gray;font-weight:bold;");
                }
                this.saturation = saturation;
                this.lightness = lightness;
            }
            ;
        }
        let red = 0;
        let green = 120;
        let blue = 240;
        let hslBoxColorRed = Object.create(new boxcolor(red, 100, 50));
        let hslBoxColorGreen = Object.create(new boxcolor(green, 100, 50));
        let hslBoxColorBlue = Object.create(new boxcolor(blue, 100, 50));
        let topRectHue = document.querySelector("#HSLColorONE span.val1");
        let topRectSat = document.querySelector("#HSLColorONE span.val2");
        let topRectLight = document.querySelector("#HSLColorONE span.val3");
        let midRectHue = document.querySelector("#HSLColorTWO span.val1");
        let midRectSat = document.querySelector("#HSLColorTWO span.val2");
        let midRectLight = document.querySelector("#HSLColorTWO span.val3");
        let botRectHue = document.querySelector("#HSLColorTHREE span.val1");
        let botRectSat = document.querySelector("#HSLColorTHREE span.val2");
        let botRectLight = document.querySelector("#HSLColorTHREE span.val3");
        topRectHue.textContent = hslBoxColorRed.hue;
        topRectSat.textContent = hslBoxColorRed.saturation;
        topRectLight.textContent = hslBoxColorRed.lightness;
        midRectHue.textContent = hslBoxColorGreen.hue;
        midRectSat.textContent = hslBoxColorGreen.saturation;
        midRectLight.textContent = hslBoxColorGreen.lightness;
        botRectHue.textContent = hslBoxColorBlue.hue;
        botRectSat.textContent = hslBoxColorBlue.saturation;
        botRectLight.textContent = hslBoxColorBlue.lightness;
        hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${hslBoxColorRed.saturation}%, ${hslBoxColorRed.lightness}%)`;
        hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${hslBoxColorGreen.saturation}%, ${hslBoxColorGreen.lightness}%)`;
        hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${hslBoxColorBlue.saturation}%, ${hslBoxColorBlue.lightness}%)`;
        const hueSldr = document.querySelector(`#Hue`);
        const saturationSldr = document.querySelector(`#Saturation`);
        const lightnessSldr = document.querySelector(`#Lightness`);
        hueSldr.addEventListener("input", () => {
            let hueInputValue = hueSldr.value;
            hslOne.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorRed.saturation}%, ${hslBoxColorRed.lightness}%)`;
            hslTwo.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorGreen.saturation}%, ${hslBoxColorGreen.lightness}%)`;
            hslThree.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorBlue.saturation}%, ${hslBoxColorBlue.lightness}%)`;
            hslBoxColorRed.hue = hueInputValue;
            hslBoxColorGreen.hue = hueInputValue;
            hslBoxColorBlue.hue = hueInputValue;
            topRectHue.textContent = hslBoxColorRed.hue;
            midRectHue.textContent = hslBoxColorGreen.hue;
            botRectHue.textContent = hslBoxColorBlue.hue;
        });
        saturationSldr.addEventListener("input", () => {
            let saturationInputValue = saturationSldr.value;
            hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${saturationInputValue}%, ${hslBoxColorRed.lightness}%)`;
            hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${saturationInputValue}%, ${hslBoxColorGreen.lightness}%)`;
            hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${saturationInputValue}%, ${hslBoxColorBlue.lightness}%)`;
            hslBoxColorRed.saturation = saturationInputValue;
            hslBoxColorGreen.saturation = saturationInputValue;
            hslBoxColorBlue.saturation = saturationInputValue;
            topRectSat.textContent = hslBoxColorRed.saturation;
            midRectSat.textContent = hslBoxColorGreen.saturation;
            botRectSat.textContent = hslBoxColorBlue.saturation;
        });
        lightnessSldr.addEventListener("input", () => {
            let lightInputValue = lightnessSldr.value;
            hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${hslBoxColorRed.saturation}%, ${lightInputValue}%)`;
            hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${hslBoxColorGreen.saturation}%, ${lightInputValue}%)`;
            hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${hslBoxColorBlue.saturation}%, ${lightInputValue}%)`;
            hslBoxColorRed.lightness = lightInputValue;
            hslBoxColorGreen.lightness = lightInputValue;
            hslBoxColorBlue.lightness = lightInputValue;
            topRectLight.textContent = hslBoxColorRed.lightness;
            midRectLight.textContent = hslBoxColorGreen.lightness;
            botRectLight.textContent = hslBoxColorBlue.lightness;
        });
    },
};
exports.default = hslColorWidget;

},{}],12:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
const sliderBar = {
    init: () => {
        var divisor = document.getElementById("divisor"), slideBar = document.getElementById("slider");
        slideBar.setAttribute("aria-label", "slider");
        slideBar.addEventListener("input", () => sliderBar.moveDivisorBar(divisor, slideBar));
    },
    moveDivisorBar: (divisor, slideBar) => {
        divisor.style.width = slideBar.value + "%";
    },
};
exports.default = sliderBar;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = exports.render = exports.removePart = exports.ref = exports.range = exports.nothing = exports.notEqual = exports.noChange = exports.map = exports.live = exports.literal = exports.keyed = exports.join = exports.isTemplateResult = exports.isSingleExpression = exports.isServer = exports.isPrimitive = exports.isDirectiveResult = exports.isCompiledTemplateResult = exports.insertPart = exports.ifDefined = exports.html = exports.guard = exports.getDirectiveClass = exports.getCompatibleStyle = exports.getCommittedValue = exports.directive = exports.defaultConverter = exports.css = exports.createRef = exports.clearPart = exports.classMap = exports.choose = exports.cache = exports.asyncReplace = exports.asyncAppend = exports.adoptStyles = exports._$LH = exports._$LE = exports.UpdatingElement = exports.UntilDirective = exports.UnsafeHTMLDirective = exports.TemplateResultType = exports.ReactiveElement = exports.PartType = exports.LitElement = exports.Directive = exports.CSSResult = exports.AsyncReplaceDirective = exports.AsyncDirective = void 0;
exports.withStatic = exports.when = exports.until = exports.unsafeStatic = exports.unsafeSVG = exports.unsafeHTML = exports.unsafeCSS = exports.templateContent = exports.svg = exports.supportsAdoptingStyleSheets = exports.styleMap = exports.staticSvg = exports.staticHtml = exports.setCommittedValue = exports.setChildPartValue = void 0;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window, i = t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype, s = Symbol(), e = new WeakMap();
exports.supportsAdoptingStyleSheets = i;
class n {
    constructor(t, i, e) {
        if (((this._$cssResult$ = !0), e !== s))
            throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        (this.cssText = t), (this.t = i);
    }
    get styleSheet() {
        let t = this.i;
        const s = this.t;
        if (i && void 0 === t) {
            const i = void 0 !== s && 1 === s.length;
            i && (t = e.get(s)),
                void 0 === t && ((this.i = t = new CSSStyleSheet()).replaceSync(this.cssText), i && e.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
exports.CSSResult = n;
const o = t => new n("string" == typeof t ? t : t + "", void 0, s), r = (t, ...i) => {
    const e = 1 === t.length
        ? t[0]
        : i.reduce((i, s, e) => i +
            (t => {
                if (!0 === t._$cssResult$)
                    return t.cssText;
                if ("number" == typeof t)
                    return t;
                throw Error("Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
            })(s) +
            t[e + 1], t[0]);
    return new n(e, t, s);
}, l = (s, e) => {
    i
        ? (s.adoptedStyleSheets = e.map(t => (t instanceof CSSStyleSheet ? t : t.styleSheet)))
        : e.forEach(i => {
            const e = document.createElement("style"), n = t.litNonce;
            void 0 !== n && e.setAttribute("nonce", n), (e.textContent = i.cssText), s.appendChild(e);
        });
}, h = i
    ? t => t
    : t => t instanceof CSSStyleSheet
        ? (t => {
            let i = "";
            for (const s of t.cssRules)
                i += s.cssText;
            return o(i);
        })(t)
        : t;
exports.unsafeCSS = o;
exports.css = r;
exports.adoptStyles = l;
exports.getCompatibleStyle = h;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var u;
const c = window, d = c.trustedTypes, a = d ? d.emptyScript : "", v = c.reactiveElementPolyfillSupport, f = {
    toAttribute(t, i) {
        switch (i) {
            case Boolean:
                t = t ? a : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute(t, i) {
        let s = t;
        switch (i) {
            case Boolean:
                s = null !== t;
                break;
            case Number:
                s = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s = JSON.parse(t);
                }
                catch (t) {
                    s = null;
                }
        }
        return s;
    },
}, p = (t, i) => i !== t && (i == i || t == t), y = { attribute: !0, type: String, converter: f, reflect: !1, hasChanged: p }, b = "finalized";
exports.defaultConverter = f;
exports.notEqual = p;
class m extends HTMLElement {
    constructor() {
        super(),
            (this.o = new Map()),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this.l = null),
            this.u();
    }
    static addInitializer(t) {
        var i;
        this.finalize(), (null !== (i = this.v) && void 0 !== i ? i : (this.v = [])).push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return (this.elementProperties.forEach((i, s) => {
            const e = this.p(s, i);
            void 0 !== e && (this.m.set(e, s), t.push(e));
        }),
            t);
    }
    static createProperty(t, i = y) {
        if ((i.state && (i.attribute = !1),
            this.finalize(),
            this.elementProperties.set(t, i),
            !i.noAccessor && !this.prototype.hasOwnProperty(t))) {
            const s = "symbol" == typeof t ? Symbol() : "__" + t, e = this.getPropertyDescriptor(t, s, i);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, i, s) {
        return {
            get() {
                return this[i];
            },
            set(e) {
                const n = this[t];
                (this[i] = e), this.requestUpdate(t, n, s);
            },
            configurable: !0,
            enumerable: !0,
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || y;
    }
    static finalize() {
        if (this.hasOwnProperty(b))
            return !1;
        this[b] = !0;
        const t = Object.getPrototypeOf(this);
        if ((t.finalize(),
            void 0 !== t.v && (this.v = [...t.v]),
            (this.elementProperties = new Map(t.elementProperties)),
            (this.m = new Map()),
            this.hasOwnProperty("properties"))) {
            const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
            for (const s of i)
                this.createProperty(s, t[s]);
        }
        return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
    }
    static finalizeStyles(t) {
        const i = [];
        if (Array.isArray(t)) {
            const s = new Set(t.flat(1 / 0).reverse());
            for (const t of s)
                i.unshift(h(t));
        }
        else
            void 0 !== t && i.push(h(t));
        return i;
    }
    static p(t, i) {
        const s = i.attribute;
        return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    u() {
        var t;
        (this._ = new Promise(t => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this.g(),
            this.requestUpdate(),
            null === (t = this.constructor.v) || void 0 === t || t.forEach(t => t(this));
    }
    addController(t) {
        var i, s;
        (null !== (i = this.S) && void 0 !== i ? i : (this.S = [])).push(t),
            void 0 !== this.renderRoot &&
                this.isConnected &&
                (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this.S) || void 0 === i || i.splice(this.S.indexOf(t) >>> 0, 1);
    }
    g() {
        this.constructor.elementProperties.forEach((t, i) => {
            this.hasOwnProperty(i) && (this.o.set(i, this[i]), delete this[i]);
        });
    }
    createRenderRoot() {
        var t;
        const i = null !== (t = this.shadowRoot) && void 0 !== t
            ? t
            : this.attachShadow(this.constructor.shadowRootOptions);
        return l(i, this.constructor.elementStyles), i;
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
            this.enableUpdating(!0),
            null === (t = this.S) ||
                void 0 === t ||
                t.forEach(t => {
                    var i;
                    return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
                });
    }
    enableUpdating(t) { }
    disconnectedCallback() {
        var t;
        null === (t = this.S) ||
            void 0 === t ||
            t.forEach(t => {
                var i;
                return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
            });
    }
    attributeChangedCallback(t, i, s) {
        this._$AK(t, s);
    }
    $(t, i, s = y) {
        var e;
        const n = this.constructor.p(t, s);
        if (void 0 !== n && !0 === s.reflect) {
            const o = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : f).toAttribute(i, s.type);
            (this.l = t), null == o ? this.removeAttribute(n) : this.setAttribute(n, o), (this.l = null);
        }
    }
    _$AK(t, i) {
        var s;
        const e = this.constructor, n = e.m.get(t);
        if (void 0 !== n && this.l !== n) {
            const t = e.getPropertyOptions(n), o = "function" == typeof t.converter
                ? { fromAttribute: t.converter }
                : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute)
                    ? t.converter
                    : f;
            (this.l = n), (this[n] = o.fromAttribute(i, t.type)), (this.l = null);
        }
    }
    requestUpdate(t, i, s) {
        let e = !0;
        void 0 !== t &&
            (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || p)(this[t], i)
                ? (this._$AL.has(t) || this._$AL.set(t, i),
                    !0 === s.reflect && this.l !== t && (void 0 === this.C && (this.C = new Map()), this.C.set(t, s)))
                : (e = !1)),
            !this.isUpdatePending && e && (this._ = this.T());
    }
    async T() {
        this.isUpdatePending = !0;
        try {
            await this._;
        }
        catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && (await t), !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending)
            return;
        this.hasUpdated, this.o && (this.o.forEach((t, i) => (this[i] = t)), (this.o = void 0));
        let i = !1;
        const s = this._$AL;
        try {
            (i = this.shouldUpdate(s)),
                i
                    ? (this.willUpdate(s),
                        null === (t = this.S) ||
                            void 0 === t ||
                            t.forEach(t => {
                                var i;
                                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
                            }),
                        this.update(s))
                    : this.P();
        }
        catch (t) {
            throw ((i = !1), this.P(), t);
        }
        i && this._$AE(s);
    }
    willUpdate(t) { }
    _$AE(t) {
        var i;
        null === (i = this.S) ||
            void 0 === i ||
            i.forEach(t => {
                var i;
                return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
            }),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t);
    }
    P() {
        (this._$AL = new Map()), (this.isUpdatePending = !1);
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        void 0 !== this.C && (this.C.forEach((t, i) => this.$(i, this[i], t)), (this.C = void 0)), this.P();
    }
    updated(t) { }
    firstUpdated(t) { }
}
exports.ReactiveElement = m;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;
(m[b] = !0),
    (m.elementProperties = new Map()),
    (m.elementStyles = []),
    (m.shadowRootOptions = { mode: "open" }),
    null == v || v({ ReactiveElement: m }),
    (null !== (u = c.reactiveElementVersions) && void 0 !== u ? u : (c.reactiveElementVersions = [])).push("1.6.3");
const w = window, _ = w.trustedTypes, $ = _ ? _.createPolicy("lit-html", { createHTML: t => t }) : void 0, S = "$lit$", T = `lit$${(Math.random() + "").slice(9)}$`, x = "?" + T, E = `<${x}>`, C = document, A = () => C.createComment(""), k = t => null === t || ("object" != typeof t && "function" != typeof t), M = Array.isArray, P = t => M(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]), U = "[ \t\n\f\r]", V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, R = /-->/g, N = />/g, O = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), L = /'/g, j = /"/g, z = /^(?:script|style|textarea|title)$/i, H = t => (i, ...s) => ({ _$litType$: t, strings: i, values: s }), I = H(1), B = H(2), D = Symbol.for("lit-noChange"), W = Symbol.for("lit-nothing"), Z = new WeakMap(), q = C.createTreeWalker(C, 129, null, !1);
exports.html = I;
exports.svg = B;
exports.noChange = D;
exports.nothing = W;
function F(t, i) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
        throw Error("invalid template strings array");
    return void 0 !== $ ? $.createHTML(i) : i;
}
const G = (t, i) => {
    const s = t.length - 1, e = [];
    let n, o = 2 === i ? "<svg>" : "", r = V;
    for (let i = 0; i < s; i++) {
        const s = t[i];
        let l, h, u = -1, c = 0;
        for (; c < s.length && ((r.lastIndex = c), (h = r.exec(s)), null !== h);)
            (c = r.lastIndex),
                r === V
                    ? "!--" === h[1]
                        ? (r = R)
                        : void 0 !== h[1]
                            ? (r = N)
                            : void 0 !== h[2]
                                ? (z.test(h[2]) && (n = RegExp("</" + h[2], "g")), (r = O))
                                : void 0 !== h[3] && (r = O)
                    : r === O
                        ? ">" === h[0]
                            ? ((r = null != n ? n : V), (u = -1))
                            : void 0 === h[1]
                                ? (u = -2)
                                : ((u = r.lastIndex - h[2].length), (l = h[1]), (r = void 0 === h[3] ? O : '"' === h[3] ? j : L))
                        : r === j || r === L
                            ? (r = O)
                            : r === R || r === N
                                ? (r = V)
                                : ((r = O), (n = void 0));
        const d = r === O && t[i + 1].startsWith("/>") ? " " : "";
        o +=
            r === V
                ? s + E
                : u >= 0
                    ? (e.push(l), s.slice(0, u) + S + s.slice(u) + T + d)
                    : s + T + (-2 === u ? (e.push(void 0), i) : d);
    }
    return [F(t, o + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), e];
};
class J {
    constructor({ strings: t, _$litType$: i }, s) {
        let e;
        this.parts = [];
        let n = 0, o = 0;
        const r = t.length - 1, l = this.parts, [h, u] = G(t, i);
        if (((this.el = J.createElement(h, s)), (q.currentNode = this.el.content), 2 === i)) {
            const t = this.el.content, i = t.firstChild;
            i.remove(), t.append(...i.childNodes);
        }
        for (; null !== (e = q.nextNode()) && l.length < r;) {
            if (1 === e.nodeType) {
                if (e.hasAttributes()) {
                    const t = [];
                    for (const i of e.getAttributeNames())
                        if (i.endsWith(S) || i.startsWith(T)) {
                            const s = u[o++];
                            if ((t.push(i), void 0 !== s)) {
                                const t = e.getAttribute(s.toLowerCase() + S).split(T), i = /([.?@])?(.*)/.exec(s);
                                l.push({
                                    type: 1,
                                    index: n,
                                    name: i[2],
                                    strings: t,
                                    ctor: "." === i[1] ? tt : "?" === i[1] ? st : "@" === i[1] ? et : X,
                                });
                            }
                            else
                                l.push({ type: 6, index: n });
                        }
                    for (const i of t)
                        e.removeAttribute(i);
                }
                if (z.test(e.tagName)) {
                    const t = e.textContent.split(T), i = t.length - 1;
                    if (i > 0) {
                        e.textContent = _ ? _.emptyScript : "";
                        for (let s = 0; s < i; s++)
                            e.append(t[s], A()), q.nextNode(), l.push({ type: 2, index: ++n });
                        e.append(t[i], A());
                    }
                }
            }
            else if (8 === e.nodeType)
                if (e.data === x)
                    l.push({ type: 2, index: n });
                else {
                    let t = -1;
                    for (; -1 !== (t = e.data.indexOf(T, t + 1));)
                        l.push({ type: 7, index: n }), (t += T.length - 1);
                }
            n++;
        }
    }
    static createElement(t, i) {
        const s = C.createElement("template");
        return (s.innerHTML = t), s;
    }
}
function K(t, i, s = t, e) {
    var n, o, r, l;
    if (i === D)
        return i;
    let h = void 0 !== e ? (null === (n = s.A) || void 0 === n ? void 0 : n[e]) : s.k;
    const u = k(i) ? void 0 : i._$litDirective$;
    return ((null == h ? void 0 : h.constructor) !== u &&
        (null === (o = null == h ? void 0 : h._$AO) || void 0 === o || o.call(h, !1),
            void 0 === u ? (h = void 0) : ((h = new u(t)), h._$AT(t, s, e)),
            void 0 !== e ? ((null !== (r = (l = s).A) && void 0 !== r ? r : (l.A = []))[e] = h) : (s.k = h)),
        void 0 !== h && (i = K(t, h._$AS(t, i.values), h, e)),
        i);
}
class Y {
    constructor(t, i) {
        (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    M(t) {
        var i;
        const { el: { content: s }, parts: e, } = this._$AD, n = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : C).importNode(s, !0);
        q.currentNode = n;
        let o = q.nextNode(), r = 0, l = 0, h = e[0];
        for (; void 0 !== h;) {
            if (r === h.index) {
                let i;
                2 === h.type
                    ? (i = new Q(o, o.nextSibling, this, t))
                    : 1 === h.type
                        ? (i = new h.ctor(o, h.name, h.strings, this, t))
                        : 6 === h.type && (i = new nt(o, this, t)),
                    this._$AV.push(i),
                    (h = e[++l]);
            }
            r !== (null == h ? void 0 : h.index) && ((o = q.nextNode()), r++);
        }
        return (q.currentNode = C), n;
    }
    U(t) {
        let i = 0;
        for (const s of this._$AV)
            void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), (i += s.strings.length - 2)) : s._$AI(t[i])),
                i++;
    }
}
class Q {
    constructor(t, i, s, e) {
        var n;
        (this.type = 2),
            (this._$AH = W),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = i),
            (this._$AM = s),
            (this.options = e),
            (this.N = null === (n = null == e ? void 0 : e.isConnected) || void 0 === n || n);
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i
            ? i
            : this.N;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        (t = K(this, t, i)),
            k(t)
                ? t === W || null == t || "" === t
                    ? (this._$AH !== W && this._$AR(), (this._$AH = W))
                    : t !== this._$AH && t !== D && this.R(t)
                : void 0 !== t._$litType$
                    ? this.O(t)
                    : void 0 !== t.nodeType
                        ? this.V(t)
                        : P(t)
                            ? this.j(t)
                            : this.R(t);
    }
    L(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    V(t) {
        this._$AH !== t && (this._$AR(), (this._$AH = this.L(t)));
    }
    R(t) {
        this._$AH !== W && k(this._$AH) ? (this._$AA.nextSibling.data = t) : this.V(C.createTextNode(t)),
            (this._$AH = t);
    }
    O(t) {
        var i;
        const { values: s, _$litType$: e } = t, n = "number" == typeof e
            ? this._$AC(t)
            : (void 0 === e.el && (e.el = J.createElement(F(e.h, e.h[0]), this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === n)
            this._$AH.U(s);
        else {
            const t = new Y(n, this), i = t.M(this.options);
            t.U(s), this.V(i), (this._$AH = t);
        }
    }
    _$AC(t) {
        let i = Z.get(t.strings);
        return void 0 === i && Z.set(t.strings, (i = new J(t))), i;
    }
    j(t) {
        M(this._$AH) || ((this._$AH = []), this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const n of t)
            e === i.length ? i.push((s = new Q(this.L(A()), this.L(A()), this, this.options))) : (s = i[e]),
                s._$AI(n),
                e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
            const i = t.nextSibling;
            t.remove(), (t = i);
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && ((this.N = t), null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class X {
    constructor(t, i, s, e, n) {
        (this.type = 1),
            (this._$AH = W),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = i),
            (this._$AM = e),
            (this.options = n),
            s.length > 2 || "" !== s[0] || "" !== s[1]
                ? ((this._$AH = Array(s.length - 1).fill(new String())), (this.strings = s))
                : (this._$AH = W);
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t, i = this, s, e) {
        const n = this.strings;
        let o = !1;
        if (void 0 === n)
            (t = K(this, t, i, 0)), (o = !k(t) || (t !== this._$AH && t !== D)), o && (this._$AH = t);
        else {
            const e = t;
            let r, l;
            for (t = n[0], r = 0; r < n.length - 1; r++)
                (l = K(this, e[s + r], i, r)),
                    l === D && (l = this._$AH[r]),
                    o || (o = !k(l) || l !== this._$AH[r]),
                    l === W ? (t = W) : t !== W && (t += (null != l ? l : "") + n[r + 1]),
                    (this._$AH[r] = l);
        }
        o && !e && this.I(t);
    }
    I(t) {
        t === W
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class tt extends X {
    constructor() {
        super(...arguments), (this.type = 3);
    }
    I(t) {
        this.element[this.name] = t === W ? void 0 : t;
    }
}
const it = _ ? _.emptyScript : "";
class st extends X {
    constructor() {
        super(...arguments), (this.type = 4);
    }
    I(t) {
        t && t !== W ? this.element.setAttribute(this.name, it) : this.element.removeAttribute(this.name);
    }
}
class et extends X {
    constructor(t, i, s, e, n) {
        super(t, i, s, e, n), (this.type = 5);
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = K(this, t, i, 0)) && void 0 !== s ? s : W) === D)
            return;
        const e = this._$AH, n = (t === W && e !== W) || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, o = t !== W && (e === W || n);
        n && this.element.removeEventListener(this.name, this, e),
            o && this.element.addEventListener(this.name, this, t),
            (this._$AH = t);
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH
            ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s
                ? s
                : this.element, t)
            : this._$AH.handleEvent(t);
    }
}
class nt {
    constructor(t, i, s) {
        (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = i), (this.options = s);
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        K(this, t);
    }
}
const ot = { H: S, B: T, D: x, q: 1, J: G, W: Y, Z: P, F: K, G: Q, K: X, X: st, Y: et, tt, it: nt }, rt = w.litHtmlPolyfillSupport;
exports._$LH = ot;
null == rt || rt(J, Q),
    (null !== (g = w.litHtmlVersions) && void 0 !== g ? g : (w.litHtmlVersions = [])).push("2.8.0");
const lt = (t, i, s) => {
    var e, n;
    const o = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let r = o._$litPart$;
    if (void 0 === r) {
        const t = null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n ? n : null;
        o._$litPart$ = r = new Q(i.insertBefore(A(), t), t, void 0, null != s ? s : {});
    }
    return r._$AI(t), r;
};
exports.render = lt;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var ht, ut;
const ct = m;
exports.UpdatingElement = ct;
class dt extends m {
    constructor() {
        super(...arguments), (this.renderOptions = { host: this }), (this.st = void 0);
    }
    createRenderRoot() {
        var t, i;
        const s = super.createRenderRoot();
        return ((null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) ||
            (i.renderBefore = s.firstChild),
            s);
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this.st = lt(i, this.renderRoot, this.renderOptions));
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this.st) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this.st) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return D;
    }
}
exports.LitElement = dt;
(dt.finalized = !0),
    (dt._$litElement$ = !0),
    null === (ht = globalThis.litElementHydrateSupport) ||
        void 0 === ht ||
        ht.call(globalThis, { LitElement: dt });
const at = globalThis.litElementPolyfillSupport;
null == at || at({ LitElement: dt });
const vt = {
    _$AK: (t, i, s) => {
        t._$AK(i, s);
    },
    _$AL: t => t._$AL,
};
exports._$LE = vt;
(null !== (ut = globalThis.litElementVersions) && void 0 !== ut
    ? ut
    : (globalThis.litElementVersions = [])).push("3.3.3");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = !1, { G: pt } = ot, yt = t => null === t || ("object" != typeof t && "function" != typeof t), bt = { HTML: 1, SVG: 2 }, mt = (t, i) => void 0 === i ? void 0 !== (null == t ? void 0 : t._$litType$) : (null == t ? void 0 : t._$litType$) === i, gt = t => {
    var i;
    return null != (null === (i = null == t ? void 0 : t._$litType$) || void 0 === i ? void 0 : i.h);
}, wt = t => void 0 !== (null == t ? void 0 : t._$litDirective$), _t = t => (null == t ? void 0 : t._$litDirective$), $t = t => void 0 === t.strings, St = () => document.createComment(""), Tt = (t, i, s) => {
    var e;
    const n = t._$AA.parentNode, o = void 0 === i ? t._$AB : i._$AA;
    if (void 0 === s) {
        const i = n.insertBefore(St(), o), e = n.insertBefore(St(), o);
        s = new pt(i, e, t, t.options);
    }
    else {
        const i = s._$AB.nextSibling, r = s._$AM, l = r !== t;
        if (l) {
            let i;
            null === (e = s._$AQ) || void 0 === e || e.call(s, t),
                (s._$AM = t),
                void 0 !== s._$AP && (i = t._$AU) !== r._$AU && s._$AP(i);
        }
        if (i !== o || l) {
            let t = s._$AA;
            for (; t !== i;) {
                const i = t.nextSibling;
                n.insertBefore(t, o), (t = i);
            }
        }
    }
    return s;
}, xt = (t, i, s = t) => (t._$AI(i, s), t), Et = {}, Ct = (t, i = Et) => (t._$AH = i), At = t => t._$AH, kt = t => {
    var i;
    null === (i = t._$AP) || void 0 === i || i.call(t, !1, !0);
    let s = t._$AA;
    const e = t._$AB.nextSibling;
    for (; s !== e;) {
        const t = s.nextSibling;
        s.remove(), (s = t);
    }
}, Mt = t => {
    t._$AR();
}, Pt = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ut = t => (...i) => ({ _$litDirective$: t, values: i });
exports.isServer = ft;
exports.isPrimitive = yt;
exports.TemplateResultType = bt;
exports.isTemplateResult = mt;
exports.isCompiledTemplateResult = gt;
exports.isDirectiveResult = wt;
exports.getDirectiveClass = _t;
exports.isSingleExpression = $t;
exports.insertPart = Tt;
exports.setChildPartValue = xt;
exports.setCommittedValue = Ct;
exports.getCommittedValue = At;
exports.removePart = kt;
exports.clearPart = Mt;
exports.PartType = Pt;
exports.directive = Ut;
class Vt {
    constructor(t) { }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AT(t, i, s) {
        (this.et = t), (this._$AM = i), (this.nt = s);
    }
    _$AS(t, i) {
        return this.update(t, i);
    }
    update(t, i) {
        return this.render(...i);
    }
}
exports.Directive = Vt;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Rt = (t, i) => {
    var s, e;
    const n = t._$AN;
    if (void 0 === n)
        return !1;
    for (const t of n)
        null === (e = (s = t)._$AO) || void 0 === e || e.call(s, i, !1), Rt(t, i);
    return !0;
}, Nt = t => {
    let i, s;
    do {
        if (void 0 === (i = t._$AM))
            break;
        (s = i._$AN), s.delete(t), (t = i);
    } while (0 === (null == s ? void 0 : s.size));
}, Ot = t => {
    for (let i; (i = t._$AM); t = i) {
        let s = i._$AN;
        if (void 0 === s)
            i._$AN = s = new Set();
        else if (s.has(t))
            break;
        s.add(t), zt(i);
    }
};
function Lt(t) {
    void 0 !== this._$AN ? (Nt(this), (this._$AM = t), Ot(this)) : (this._$AM = t);
}
function jt(t, i = !1, s = 0) {
    const e = this._$AH, n = this._$AN;
    if (void 0 !== n && 0 !== n.size)
        if (i)
            if (Array.isArray(e))
                for (let t = s; t < e.length; t++)
                    Rt(e[t], !1), Nt(e[t]);
            else
                null != e && (Rt(e, !1), Nt(e));
        else
            Rt(this, t);
}
const zt = t => {
    var i, s, e, n;
    2 == t.type &&
        ((null !== (i = (e = t)._$AP) && void 0 !== i) || (e._$AP = jt),
            (null !== (s = (n = t)._$AQ) && void 0 !== s) || (n._$AQ = Lt));
};
class Ht extends Vt {
    constructor() {
        super(...arguments), (this._$AN = void 0);
    }
    _$AT(t, i, s) {
        super._$AT(t, i, s), Ot(this), (this.isConnected = t._$AU);
    }
    _$AO(t, i = !0) {
        var s, e;
        t !== this.isConnected &&
            ((this.isConnected = t),
                t
                    ? null === (s = this.reconnected) || void 0 === s || s.call(this)
                    : null === (e = this.disconnected) || void 0 === e || e.call(this)),
            i && (Rt(this, t), Nt(this));
    }
    setValue(t) {
        if ($t(this.et))
            this.et._$AI(t, this);
        else {
            const i = [...this.et._$AH];
            (i[this.nt] = t), this.et._$AI(i, this, 0);
        }
    }
    disconnected() { }
    reconnected() { }
}
exports.AsyncDirective = Ht;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class It {
    constructor(t) {
        this.ot = t;
    }
    disconnect() {
        this.ot = void 0;
    }
    reconnect(t) {
        this.ot = t;
    }
    deref() {
        return this.ot;
    }
}
class Bt {
    constructor() {
        (this.rt = void 0), (this.lt = void 0);
    }
    get() {
        return this.rt;
    }
    pause() {
        var t;
        (null !== (t = this.rt) && void 0 !== t) || (this.rt = new Promise(t => (this.lt = t)));
    }
    resume() {
        var t;
        null === (t = this.lt) || void 0 === t || t.call(this), (this.rt = this.lt = void 0);
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class Dt extends Ht {
    constructor() {
        super(...arguments), (this.ht = new It(this)), (this.ut = new Bt());
    }
    render(t, i) {
        return D;
    }
    update(t, [i, s]) {
        if ((this.isConnected || this.disconnected(), i === this.ct))
            return;
        this.ct = i;
        let e = 0;
        const { ht: n, ut: o } = this;
        return ((async (t, i) => {
            for await (const s of t)
                if (!1 === (await i(s)))
                    return;
        })(i, async (t) => {
            for (; o.get();)
                await o.get();
            const r = n.deref();
            if (void 0 !== r) {
                if (r.ct !== i)
                    return !1;
                void 0 !== s && (t = s(t, e)), r.commitValue(t, e), e++;
            }
            return !0;
        }),
            D);
    }
    commitValue(t, i) {
        this.setValue(t);
    }
    disconnected() {
        this.ht.disconnect(), this.ut.pause();
    }
    reconnected() {
        this.ht.reconnect(this), this.ut.resume();
    }
}
exports.AsyncReplaceDirective = Dt;
const Wt = Ut(Dt), Zt = Ut(
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Dt {
    constructor(t) {
        if ((super(t), 2 !== t.type))
            throw Error("asyncAppend can only be used in child expressions");
    }
    update(t, i) {
        return (this.st = t), super.update(t, i);
    }
    commitValue(t, i) {
        0 === i && Mt(this.st);
        const s = Tt(this.st);
        xt(s, t);
    }
}), qt = t => (gt(t) ? t._$litType$.h : t.strings), Ft = Ut(class extends Vt {
    constructor(t) {
        super(t), (this.dt = new WeakMap());
    }
    render(t) {
        return [t];
    }
    update(t, [i]) {
        const s = mt(this.vt) ? qt(this.vt) : null, e = mt(i) ? qt(i) : null;
        if (null !== s && (null === e || s !== e)) {
            const i = At(t).pop();
            let e = this.dt.get(s);
            if (void 0 === e) {
                const t = document.createDocumentFragment();
                (e = lt(W, t)), e.setConnected(!1), this.dt.set(s, e);
            }
            Ct(e, [i]), Tt(e, void 0, i);
        }
        if (null !== e) {
            if (null === s || s !== e) {
                const i = this.dt.get(e);
                if (void 0 !== i) {
                    const s = At(i).pop();
                    Mt(t), Tt(t, void 0, s), Ct(t, [s]);
                }
            }
            this.vt = i;
        }
        else
            this.vt = void 0;
        return this.render(i);
    }
}), Gt = (t, i, s) => {
    for (const s of i)
        if (s[0] === t)
            return (0, s[1])();
    return null == s ? void 0 : s();
}, Jt = Ut(
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) {
        var i;
        if ((super(t),
            1 !== t.type ||
                "class" !== t.name ||
                (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2))
            throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return (" " +
            Object.keys(t)
                .filter(i => t[i])
                .join(" ") +
            " ");
    }
    update(t, [i]) {
        var s, e;
        if (void 0 === this.ft) {
            (this.ft = new Set()),
                void 0 !== t.strings &&
                    (this.yt = new Set(t.strings
                        .join(" ")
                        .split(/\s/)
                        .filter(t => "" !== t)));
            for (const t in i)
                i[t] && !(null === (s = this.yt) || void 0 === s ? void 0 : s.has(t)) && this.ft.add(t);
            return this.render(i);
        }
        const n = t.element.classList;
        this.ft.forEach(t => {
            t in i || (n.remove(t), this.ft.delete(t));
        });
        for (const t in i) {
            const s = !!i[t];
            s === this.ft.has(t) ||
                (null === (e = this.yt) || void 0 === e ? void 0 : e.has(t)) ||
                (s ? (n.add(t), this.ft.add(t)) : (n.remove(t), this.ft.delete(t)));
        }
        return D;
    }
}), Kt = {}, Yt = Ut(class extends Vt {
    constructor() {
        super(...arguments), (this.bt = Kt);
    }
    render(t, i) {
        return i();
    }
    update(t, [i, s]) {
        if (Array.isArray(i)) {
            if (Array.isArray(this.bt) && this.bt.length === i.length && i.every((t, i) => t === this.bt[i]))
                return D;
        }
        else if (this.bt === i)
            return D;
        return (this.bt = Array.isArray(i) ? Array.from(i) : i), this.render(i, s);
    }
}), Qt = t => (null != t ? t : W);
exports.asyncReplace = Wt;
exports.asyncAppend = Zt;
exports.cache = Ft;
exports.choose = Gt;
exports.classMap = Jt;
exports.guard = Yt;
exports.ifDefined = Qt;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function* Xt(t, i) {
    const s = "function" == typeof i;
    if (void 0 !== t) {
        let e = -1;
        for (const n of t)
            e > -1 && (yield s ? i(e) : i), e++, yield n;
    }
}
exports.join = Xt;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ti = Ut(class extends Vt {
    constructor() {
        super(...arguments), (this.key = W);
    }
    render(t, i) {
        return (this.key = t), i;
    }
    update(t, [i, s]) {
        return i !== this.key && (Ct(t), (this.key = i)), s;
    }
}), ii = Ut(
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) {
        if ((super(t), 3 !== t.type && 1 !== t.type && 4 !== t.type))
            throw Error("The `live` directive is not allowed on child or event bindings");
        if (!$t(t))
            throw Error("`live` bindings can only contain a single expression");
    }
    render(t) {
        return t;
    }
    update(t, [i]) {
        if (i === D || i === W)
            return i;
        const s = t.element, e = t.name;
        if (3 === t.type) {
            if (i === s[e])
                return D;
        }
        else if (4 === t.type) {
            if (!!i === s.hasAttribute(e))
                return D;
        }
        else if (1 === t.type && s.getAttribute(e) === i + "")
            return D;
        return Ct(t), i;
    }
});
exports.keyed = ti;
exports.live = ii;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* si(t, i) {
    if (void 0 !== t) {
        let s = 0;
        for (const e of t)
            yield i(e, s++);
    }
}
exports.map = si;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function* ei(t, i, s = 1) {
    const e = void 0 === i ? 0 : t;
    null != i || (i = t);
    for (let t = e; s > 0 ? t < i : i < t; t += s)
        yield t;
}
exports.range = ei;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ni = () => new oi();
exports.createRef = ni;
class oi {
}
const ri = new WeakMap(), li = Ut(class extends Ht {
    render(t) {
        return W;
    }
    update(t, [i]) {
        var s;
        const e = i !== this.ot;
        return (e && void 0 !== this.ot && this.gt(void 0),
            (e || this.wt !== this._t) &&
                ((this.ot = i),
                    (this.$t = null === (s = t.options) || void 0 === s ? void 0 : s.host),
                    this.gt((this._t = t.element))),
            W);
    }
    gt(t) {
        var i;
        if ("function" == typeof this.ot) {
            const s = null !== (i = this.$t) && void 0 !== i ? i : globalThis;
            let e = ri.get(s);
            void 0 === e && ((e = new WeakMap()), ri.set(s, e)),
                void 0 !== e.get(this.ot) && this.ot.call(this.$t, void 0),
                e.set(this.ot, t),
                void 0 !== t && this.ot.call(this.$t, t);
        }
        else
            this.ot.value = t;
    }
    get wt() {
        var t, i, s;
        return "function" == typeof this.ot
            ? null === (i = ri.get(null !== (t = this.$t) && void 0 !== t ? t : globalThis)) || void 0 === i
                ? void 0
                : i.get(this.ot)
            : null === (s = this.ot) || void 0 === s
                ? void 0
                : s.value;
    }
    disconnected() {
        this.wt === this._t && this.gt(void 0);
    }
    reconnected() {
        this.gt(this._t);
    }
}), hi = (t, i, s) => {
    const e = new Map();
    for (let n = i; n <= s; n++)
        e.set(t[n], n);
    return e;
}, ui = Ut(class extends Vt {
    constructor(t) {
        if ((super(t), 2 !== t.type))
            throw Error("repeat() can only be used in text expressions");
    }
    St(t, i, s) {
        let e;
        void 0 === s ? (s = i) : void 0 !== i && (e = i);
        const n = [], o = [];
        let r = 0;
        for (const i of t)
            (n[r] = e ? e(i, r) : r), (o[r] = s(i, r)), r++;
        return { values: o, keys: n };
    }
    render(t, i, s) {
        return this.St(t, i, s).values;
    }
    update(t, [i, s, e]) {
        var n;
        const o = At(t), { values: r, keys: l } = this.St(i, s, e);
        if (!Array.isArray(o))
            return (this.Tt = l), r;
        const h = null !== (n = this.Tt) && void 0 !== n ? n : (this.Tt = []), u = [];
        let c, d, a = 0, v = o.length - 1, f = 0, p = r.length - 1;
        for (; a <= v && f <= p;)
            if (null === o[a])
                a++;
            else if (null === o[v])
                v--;
            else if (h[a] === l[f])
                (u[f] = xt(o[a], r[f])), a++, f++;
            else if (h[v] === l[p])
                (u[p] = xt(o[v], r[p])), v--, p--;
            else if (h[a] === l[p])
                (u[p] = xt(o[a], r[p])), Tt(t, u[p + 1], o[a]), a++, p--;
            else if (h[v] === l[f])
                (u[f] = xt(o[v], r[f])), Tt(t, o[a], o[v]), v--, f++;
            else if ((void 0 === c && ((c = hi(l, f, p)), (d = hi(h, a, v))), c.has(h[a])))
                if (c.has(h[v])) {
                    const i = d.get(l[f]), s = void 0 !== i ? o[i] : null;
                    if (null === s) {
                        const i = Tt(t, o[a]);
                        xt(i, r[f]), (u[f] = i);
                    }
                    else
                        (u[f] = xt(s, r[f])), Tt(t, o[a], s), (o[i] = null);
                    f++;
                }
                else
                    kt(o[v]), v--;
            else
                kt(o[a]), a++;
        for (; f <= p;) {
            const i = Tt(t, u[p + 1]);
            xt(i, r[f]), (u[f++] = i);
        }
        for (; a <= v;) {
            const t = o[a++];
            null !== t && kt(t);
        }
        return (this.Tt = l), Ct(t, u), D;
    }
}), ci = "important", di = " !" + ci, ai = Ut(class extends Vt {
    constructor(t) {
        var i;
        if ((super(t),
            1 !== t.type ||
                "style" !== t.name ||
                (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2))
            throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return Object.keys(t).reduce((i, s) => {
            const e = t[s];
            return null == e
                ? i
                : i +
                    `${(s = s.includes("-")
                        ? s
                        : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase())}:${e};`;
        }, "");
    }
    update(t, [i]) {
        const { style: s } = t.element;
        if (void 0 === this.xt) {
            this.xt = new Set();
            for (const t in i)
                this.xt.add(t);
            return this.render(i);
        }
        this.xt.forEach(t => {
            null == i[t] && (this.xt.delete(t), t.includes("-") ? s.removeProperty(t) : (s[t] = ""));
        });
        for (const t in i) {
            const e = i[t];
            if (null != e) {
                this.xt.add(t);
                const i = "string" == typeof e && e.endsWith(di);
                t.includes("-") || i ? s.setProperty(t, i ? e.slice(0, -11) : e, i ? ci : "") : (s[t] = e);
            }
        }
        return D;
    }
}), vi = Ut(
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class extends Vt {
    constructor(t) {
        if ((super(t), 2 !== t.type))
            throw Error("templateContent can only be used in child bindings");
    }
    render(t) {
        return this.Et === t ? D : ((this.Et = t), document.importNode(t.content, !0));
    }
});
exports.ref = li;
exports.repeat = ui;
exports.styleMap = ai;
exports.templateContent = vi;
class fi extends Vt {
    constructor(t) {
        if ((super(t), (this.vt = W), 2 !== t.type))
            throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(t) {
        if (t === W || null == t)
            return (this.Ct = void 0), (this.vt = t);
        if (t === D)
            return t;
        if ("string" != typeof t)
            throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (t === this.vt)
            return this.Ct;
        this.vt = t;
        const i = [t];
        return (i.raw = i), (this.Ct = { _$litType$: this.constructor.resultType, strings: i, values: [] });
    }
}
exports.UnsafeHTMLDirective = fi;
(fi.directiveName = "unsafeHTML"), (fi.resultType = 1);
const pi = Ut(fi);
exports.unsafeHTML = pi;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class yi extends fi {
}
(yi.directiveName = "unsafeSVG"), (yi.resultType = 2);
const bi = Ut(yi), mi = t => !yt(t) && "function" == typeof t.then, gi = 1073741823;
exports.unsafeSVG = bi;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class wi extends Ht {
    constructor() {
        super(...arguments), (this.At = gi), (this.kt = []), (this.ht = new It(this)), (this.ut = new Bt());
    }
    render(...t) {
        var i;
        return null !== (i = t.find(t => !mi(t))) && void 0 !== i ? i : D;
    }
    update(t, i) {
        const s = this.kt;
        let e = s.length;
        this.kt = i;
        const n = this.ht, o = this.ut;
        this.isConnected || this.disconnected();
        for (let t = 0; t < i.length && !(t > this.At); t++) {
            const r = i[t];
            if (!mi(r))
                return (this.At = t), r;
            (t < e && r === s[t]) ||
                ((this.At = gi),
                    (e = 0),
                    Promise.resolve(r).then(async (t) => {
                        for (; o.get();)
                            await o.get();
                        const i = n.deref();
                        if (void 0 !== i) {
                            const s = i.kt.indexOf(r);
                            s > -1 && s < i.At && ((i.At = s), i.setValue(t));
                        }
                    }));
        }
        return D;
    }
    disconnected() {
        this.ht.disconnect(), this.ut.pause();
    }
    reconnected() {
        this.ht.reconnect(this), this.ut.resume();
    }
}
exports.UntilDirective = wi;
const _i = Ut(wi);
exports.until = _i;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $i(t, i, s) {
    return t ? i() : null == s ? void 0 : s();
}
exports.when = $i;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Si = Symbol.for(""), Ti = t => {
    if ((null == t ? void 0 : t.r) === Si)
        return null == t ? void 0 : t._$litStatic$;
}, xi = t => ({ _$litStatic$: t, r: Si }), Ei = (t, ...i) => ({
    _$litStatic$: i.reduce((i, s, e) => i +
        (t => {
            if (void 0 !== t._$litStatic$)
                return t._$litStatic$;
            throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`);
        })(s) +
        t[e + 1], t[0]),
    r: Si,
}), Ci = new Map(), Ai = t => (i, ...s) => {
    const e = s.length;
    let n, o;
    const r = [], l = [];
    let h, u = 0, c = !1;
    for (; u < e;) {
        for (h = i[u]; u < e && void 0 !== ((o = s[u]), (n = Ti(o)));)
            (h += n + i[++u]), (c = !0);
        u !== e && l.push(o), r.push(h), u++;
    }
    if ((u === e && r.push(i[e]), c)) {
        const t = r.join("$$lit$$");
        void 0 === (i = Ci.get(t)) && ((r.raw = r), Ci.set(t, (i = r))), (s = l);
    }
    return t(i, ...s);
}, ki = Ai(I), Mi = Ai(B);
exports.unsafeStatic = xi;
exports.literal = Ei;
exports.withStatic = Ai;
exports.staticHtml = ki;
exports.staticSvg = Mi;


},{}],14:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
class AbbrOpen {
    isOpen = false;
    abbrElement;
    description;
    constructor(abbrElement) {
        this.isOpen = false;
        this.abbrElement = abbrElement;
    }
    ;
    revealAbbrDescription() {
        this.abbrElement.addEventListener("click", e => {
            e.preventDefault();
            if (this.isOpen) {
                this.description.remove();
            }
            let abbrTitleAttrVal = this.abbrElement.getAttribute("title");
            if (e.target == this.abbrElement) {
                //create the span element
                this.description = this.abbrElement.appendChild(document.createElement("span"));
                this.description.textContent = `${String.fromCharCode(160)}(${abbrTitleAttrVal})${String.fromCharCode(160)}`;
                this.isOpen = true;
            }
        });
    }
    ;
}
exports.default = AbbrOpen;

},{}],15:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGET = void 0;
/**
 * apiGET is for fetch requests. Use an apiGET object to manipulate the fetch
 *  request into either:
 *
 * 1. returning data
 *
 * --or --
 *
 * 2. storing the request in the browser cache to retrieve later
 */
class apiGET {
    errorElem;
    getUrl;
    sendToBrowserCache = false;
    browserCacheName;
    /**
     * This constructor gathers all the needed information for fetch and/or browser
     *  storage.
     *
     * @param getUrl - the (full) url of data request.
     * @param sendToBrowserCache  - Boolean value determining fetch caching.
     * @param browserCacheName - If storing the request in browser cache, this string provides the name for storage.
     * @param errorElem - Should the fetch request fail, return error status to this element.
     */
    constructor(getUrl, sendToBrowserCache, errorElem, browserCacheName) {
        this.getUrl = getUrl;
        this.sendToBrowserCache = sendToBrowserCache;
        this.browserCacheName = browserCacheName;
        this.errorElem = errorElem;
    }
    ;
    /**
     *
     * @returns this.sendToBrowserCache
     */
    getSendToBrowserCache() {
        return this.sendToBrowserCache;
    }
    ;
    /**
     *
     * @returns this.GETURL
     */
    getGetUrl() {
        return this.getUrl;
    }
    ;
    /**
     * Flip this.sendToBrowserCache boolean value from the current value.
     */
    setSendToBrowserCache() {
        return this.sendToBrowserCache ? false : true;
    }
    ;
    /**
     * A fetch request can take URL or string parameter. This function sets the apiGET
     *  object for a URL fetch by creating a URL from the string, or passing the URL.
     * @param getUrl - the (full) url of data request.
     */
    setGetUrl(getUrl) {
        if (typeof getUrl === "string") {
            this.getUrl = new URL(getUrl);
        }
        else {
            this.getUrl = getUrl;
        }
    }
    ;
    /**
     * A public function creating a data promise object for the called fetch function. If
     *  the request needs added to browser storage, the fetch is made and sent to
     *  storage. A cloned copy of the fetched data is returned and the original request is
     *  sent to the cache. Without sending to browser cache, the fetch is requested and
     * returned.
     *
     * @param getUrl - the (full) url of data request.
     * @returns dataCachePromise: Promise<unknown>
     */
    async apiGet(getUrl) {
        //Check if the request is for cache storage
        if (this.sendToBrowserCache) {
            //The returned data is packages as a Promise object
            let dataCachePromise = new Promise((resolve, reject) => {
                if ("caches" in window) {
                    //Open cache and check for request existing in Cache Storage
                    window.caches
                        .open(this.browserCacheName)
                        .then(cache => {
                        caches.match(getUrl).then(result => {
                            if (result === undefined) {
                                //No matches for this request in Storage Cache, so fetch the request normally
                                //Upon success, a cloned copy will need to be returned.
                                fetch(getUrl).then(result => {
                                    //Copy the response since it can only be read once
                                    let clonedResp = result.clone();
                                    //Add the result to the cache
                                    if (clonedResp.status != 404) {
                                        cache.put(getUrl, result);
                                    }
                                    resolve(clonedResp.json().then(text => text));
                                });
                            }
                            else {
                                //Cache hit success, return the response data
                                resolve(result.json().then(text => text));
                            }
                        });
                    })
                        .catch(e => {
                        //Cannot open Storage Cache
                        console.error(`%cProblem opening Cache Storage. Name: ${this.browserCacheName}`, "color: grey");
                        this.sendToBrowserCache = false;
                    })
                        .finally(() => {
                        //Attempt raw fetch
                        resolve(this.fetchData(getUrl));
                        reject(new Error("Promise error on data fetch."));
                    });
                }
            });
            //The promise has resolved --> return the promise data
            dataCachePromise.then((response) => {
                return response;
            });
            return dataCachePromise;
        }
        else {
            let dataCachePromise = new Promise((resolve, reject) => {
                resolve(this.fetchData(getUrl));
            });
            dataCachePromise.then(data => {
                return data;
            });
            return dataCachePromise;
        }
    }
    ;
    /**
     * Checks whether the requested response is of valid status 'OK' and '200'
     * @param res - the fetched response.
     * @returns - returns res.json() on success or returns response on failure.
     */
    apiResponseErrorCheck(res) {
        if (res.status == 404) {
            this.errorElem.classList.add("error");
            this.errorElem.innerText = "404 fetch error!";
            return res;
        }
        if (!res.ok || res.status != 200) {
            throw new Error(res.ok + ": " + res.status);
        }
        return res.json();
    }
    ;
    /**
     * The fetch request, returning a fetch promise.
     * @param getUrl - the (full) url of data request.
     * @returns data.text() or data based on the instance returned.
     */
    fetchData(getUrl) {
        return fetch(getUrl)
            .then(response => this.apiResponseErrorCheck(response))
            .then(data => {
            if (data instanceof Response) {
                return data.text();
            }
            else
                return data;
        })
            .catch((e) => {
            console.debug(e);
            this.errorElem.classList.add("error");
            this.errorElem.innerText = `${e.message}`;
        });
    }
    ;
}
exports.apiGET = apiGET;

},{}],16:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
class client {
    oldURL = document.referrer;
    browserplatform;
    useragent = window.navigator.userAgent;
    connectiontype;
    connectionrtt;
    constructor() {
        this.browserplatform = this.setbrowserplatform();
        this.connectiontype = this.setconnectiontype();
        this.connectionrtt = this.setconnectionrtt();
    }
    ;
    setbrowserplatform() {
        if ("userAgentData" in window.navigator) {
            //userAgentData is NavigatorUAData type, not found in TypeScript.
            //Known to Edge browser: Object.getPrototypeOf(window.navigator.userAgentData)
            let userAgentData = window.navigator.userAgentData;
            let platformdata = userAgentData.platform;
            return platformdata;
        }
        else
            this.browserplatform = "";
    }
    ;
    setconnectiontype() {
        if ("connection" in window.navigator) {
            //connection is NetworkInformation type, not found in TypeScript.
            //Known to Edge browser: Object.getPrototypeOf(window.navigator.connection)
            let connection = window.navigator.connection;
            let effectivetype = connection.effectiveType;
            return effectivetype;
        }
        else
            this.connectiontype = "";
    }
    ;
    setconnectionrtt() {
        if ("connection" in window.navigator) {
            let connection = window.navigator.connection;
            let rtt = connection.rtt;
            return rtt;
        }
        else
            this.connectionrtt = "";
    }
    ;
}
exports.client = client;

},{}],17:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorCodeWidget = void 0;
class ColorCodeWidget {
    elems;
    color;
    resetbtn;
    constructor(colorlesselements, colors, resetbtn) {
        this.elems = colorlesselements;
        this.color = colors;
        this.resetbtn = resetbtn;
        for (let i = 0; i < this.elems.length; i++) {
            this.cssExampleHighlighting(this.elems[i], this.color[i]);
            this.cssExampleHighlightReset(this.elems[i]);
        }
    }
    ;
    /**
     * Function to color the example area's elements using css
     * @param elemslist - Node list of HTMLElelements. I.E. using query.SelectorAll()
     * @param color - String of CSS color value
     */
    cssExampleHighlighting(elemslist, color) {
        elemslist.forEach(elem => {
            elem.addEventListener("mouseover", event => {
                event.preventDefault();
                elemslist.forEach(elem => {
                    elem.style.color = color;
                });
            });
            elem.addEventListener("click", event => {
                event.preventDefault();
                elemslist.forEach(elem => {
                    elem.style.color = "initial";
                });
            });
        });
    }
    ;
    //function to reset the css code properties color to original
    cssExampleHighlightReset(elemslist) {
        this.resetbtn.addEventListener("click", () => {
            elemslist.forEach(elem => {
                elem.style.color = "initial";
            });
        });
    }
    ;
}
exports.ColorCodeWidget = ColorCodeWidget;

},{}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionarySearch = void 0;
//--Copyright (c) 2023 Robert A. Howell
const api_1 = require("./api");
const dictionarySearchMarkup_1 = __importDefault(require("./dictionarySearchMarkup"));
const rwbErrorBus_1 = __importDefault(require("./rwbErrorBus"));
const rwbJsonConverter_1 = require("./rwbJsonConverter");
const rwbJsonConverter_2 = require("./rwbJsonConverter");
/**
 * A DictionarySearch is a set of markup creation and functions which allow a user
 *  to look up a word like a Dictionary. When called, the user's input is validated
 *  as an acceptable word or it declines the request, then showing the user if the word
 *  is acceptable.
 *
 * Creating a dictionary search widget requires passing a reference element (for a
 * known placement location) that contains the 'dictionaryWidget' class.
 *
 *   new DictionarySearch(elem);
 *
 * All the needed elements and functionality are added to the page.
 *
 */
class DictionarySearch extends dictionarySearchMarkup_1.default {
    static count = 0;
    static wordStorage;
    static CacheStorageNameofWordRequest = "RWB_word_fetch";
    static requestUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    previousWordsBtnIsCreated = false;
    previousWordsBtnWasClicked = false;
    wordURL;
    wordData;
    /**
     * This constructor creates all the functionality and markup needed for the
     *  Dictionary Search widget interface.
     *
     * @param elem - The reference element used to place widget markup.
     */
    constructor(elem) {
        //Invoke superclass constructor.
        super(elem);
        if (this.searchElements == undefined)
            return;
        //Initialize the dictionary widget with click event listeners
        this.addWidgetEvents();
        //Store words cache data with initialization.
        DictionarySearch.wordStorage = DictionarySearch.getLocalStorageWordCaches();
        DictionarySearch.count++;
    }
    ;
    /**
     * Retrieve Local Storage words previously stored with the Dictionary Search Widget.
     *
     * @returns DictionarySearch.wordStorage - these are the words stored previously in the
     *  browser cache.
     */
    static getLocalStorageWordCaches() {
        //Local Storage 'word-caches' items data assignment
        //cache response links and cache name are previously stored in Local Storage
        let storageStr;
        if (rwbErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", true, true)) {
            //The Local Storage is null or empty--> Confirm here the browser does not have any Cache Storage items in error
            if ("caches" in window) {
                if (window.caches.has(DictionarySearch.CacheStorageNameofWordRequest)) {
                    window.caches.delete(DictionarySearch.CacheStorageNameofWordRequest);
                }
                localStorage.removeItem("word-caches");
                return;
            }
        }
        storageStr = localStorage.getItem("word-caches");
        //check the word-cache value for correct json parsing
        let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(storageStr));
        if (!parsetest.passed) {
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, "color:orange;font-size:14px;font-weight:bold;", "color:orange;font-size:16px;");
            this.getLocalStorageWordCaches();
            return;
        }
        return parsetest.returnobj;
    }
    ;
    /**
     * Call to return the previously searched word.
     *
     * @returns this.wordURL
     */
    getWordURL() {
        return this.wordURL;
    }
    ;
    /**
     * Call to return the fetched word data.
     *
     * @returns this.wordData
     */
    getWordData() {
        return this.wordData;
    }
    ;
    /**
     * Adds click and keypress event listeners to the widget. Input event listeners 'click'
     *  and 'keypress' await for a search call. Also, should a user want to search a
     *  previously searched word, the widget adapts markup for that request.
     */
    addWidgetEvents() {
        if (this.searchElements == undefined) {
            console.log("A search element is undefined from searchWord | wordSearch");
            return;
        }
        let buttonContainer = document.getElementById("dictionary-btns");
        const hidePreviousPanel = () => {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = true;
        };
        //Add form input event listeners
        //Upon input entry, fire API fetch
        this.searchElements.wordSearch.addEventListener("click", event => {
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        this.searchElements.searchWord.addEventListener("keypress", event => {
            if (event.key !== "Enter")
                return;
            event.preventDefault();
            this.wordSearch(this.searchElements, false, null);
            if (this.previousWordsBtnWasClicked)
                hidePreviousPanel();
        });
        //"Previous word searches" button fetches locally stored words
        //Clicking the button displays each word in a list within the widget
        this.searchElements.previousWordBtn.addEventListener("click", event => {
            event.preventDefault();
            this.checkcreatePreviousWordButtons();
        });
        //"Refresh" button reloads the page
        this.searchElements.refreshBtn.addEventListener("click", event => {
            event.preventDefault();
            location.reload();
        });
    }
    ;
    checkcreatePreviousWordButtons() {
        const placementlocationholder = document.querySelector(".previousWords");
        let buttonContainer = this.searchElements.previousWordsContainer;
        //Check the placement locator and word caches for undefined
        if (placementlocationholder == null || DictionarySearch.wordStorage == null) {
            if (!this.previousWordsBtnIsCreated) {
                const noWordsHeadingElem = buttonContainer.appendChild(document.createElement("div"));
                noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
                noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
                this.previousWordsBtnIsCreated = true;
                this.previousWordsBtnWasClicked = true;
                return;
            }
            if (!this.previousWordsBtnWasClicked) {
                buttonContainer.style.display = "block";
                this.previousWordsBtnWasClicked = true;
                return;
            }
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        if (this.previousWordsBtnWasClicked) {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        if (this.previousWordsBtnIsCreated) {
            buttonContainer.style.display = "block";
            this.previousWordsBtnWasClicked = true;
            return;
        }
        this.createPreviousWordButtons(this.previousWordsBtnWasClicked, buttonContainer);
    }
    ;
    createPreviousWordButtons(previousWordsBtnWasClicked, buttonContainer) {
        if (previousWordsBtnWasClicked) {
            buttonContainer.style.display = "none";
            this.previousWordsBtnWasClicked = false;
            return;
        }
        let previouswordbuttons = this.createPreviousWordSearchesElements(DictionarySearch.wordStorage, buttonContainer);
        for (let btn of previouswordbuttons) {
            this.previousWordsBtnWasClicked = true;
            this.previousWordsBtnIsCreated = true;
            //add event listener for new button.
            //this is the cached word butten. when it's clicked, fire a word search
            btn.cacheWordHeadingElem.addEventListener("click", (event) => {
                event.preventDefault();
                this.wordSearch(this.searchElements, true, btn.word);
            });
            //MOBILE
            //when hovered, display the delete button option
            btn.wordHeadingElemContainer.addEventListener("touchstart", () => {
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
                //when not hovered, hide the delete button option
                btn.wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                    if (event.target == btn.deleteCacheWordHeadingElem) {
                        return;
                    }
                    btn.deleteCacheWordHeadingElem.style.opacity = "50%;";
                });
            });
            //when hovered, display the delete button option
            btn.wordHeadingElemContainer.addEventListener("mouseover", (event) => {
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
                //when not hovered, hide the delete button option
                btn.wordHeadingElemContainer.addEventListener("mouseleave", (event) => {
                    if (event.target == btn.deleteCacheWordHeadingElem) {
                        return;
                    }
                    btn.deleteCacheWordHeadingElem.style.display = "none";
                });
            });
            //when focus (such as using keyboard only), display the delete button
            btn.cacheWordHeadingElem.addEventListener("focus", (e) => {
                e.preventDefault();
                btn.deleteCacheWordHeadingElem.style.display = "inline-block";
            });
            //when not focused, hide the delete button option
            btn.deleteCacheWordHeadingElem.addEventListener("focusout", (event) => {
                if (event.target == btn.cacheWordHeadingElem) {
                    return;
                }
                btn.deleteCacheWordHeadingElem.style.display = "none";
            });
            //add event listener for delete button
            btn.deleteCacheWordHeadingElem.addEventListener("click", (event) => {
                event.preventDefault();
                btn.wordHeadingElemContainer.remove();
                this.removeDictionaryTermfromLocalStorage(btn.cacheWordHeadingElem.textContent);
            });
        }
    }
    ;
    /**
     * Adds the word to the browser's Local Storage containing word data, URL, and caching.
     *
     * @param localstoragevalue - This interface stores information where sending to Local Storage.
     */
    addDictionaryTermtoLocalStorage(localstoragevalue) {
        //Log the word cache creation
        const addedwordcache = () => {
            console.log(`%c<RWB>%cAdded word cache: ${localstoragevalue.word}`, "color:cyan;font-weight:bold;", "color:cyan;");
        };
        //The 'localstoragevalue' needs added to local storage cache
        //Local storage may be empty or already having the wanted searched word
        //Check storage is not null. If it is, add the word.
        if (DictionarySearch.wordStorage == null) {
            if (rwbErrorBus_1.default.checkLocalStorageEqualNull("DictionarySearch", "word-caches", false, false)) {
                //Add the storage word to an array
                let wordStore = [];
                wordStore.push(localstoragevalue);
                let jsonstr = "";
                //Call RWBStringifyJSON to stringify the object
                let stringifytestsingleword = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(wordStore));
                if (!stringifytestsingleword.passed) {
                    //stringify object did not work, so return
                    //LOGLEAF
                    return;
                }
                jsonstr = stringifytestsingleword.returnstr;
                // Local storage is empty => add the word
                localStorage.setItem("word-caches", jsonstr);
                console.log(`%c<RWB>%cCreated storage key: word-caches`, "color:cyan;font-size:14px;font-weight:bold;", "color:cyan;font-size:16px;");
                addedwordcache();
                return;
            }
            //LOGLEAF
            return;
        }
        //Local storage is not empty. Here, we need to add the word to the existing word cache.
        let allcache = DictionarySearch.wordStorage;
        let jsonstr = "";
        //Match the current URL for cache management
        for (let cache of allcache) {
            if (cache.wordURL == localstoragevalue.wordURL) {
                //Word is already in Local Storage
                //No need to add it to the array
                //LOGLEAF
                return;
            }
        }
        //Add word to existing 'word-caches' in Local Storage
        allcache.push(localstoragevalue);
        //Call RWBStringifyJSON to stringify the object
        let stringifytestdoubleword = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(allcache));
        if (!stringifytestdoubleword.passed) {
            //stringify object did not work, so return
            //LOGLEAF
            return;
        }
        jsonstr = stringifytestdoubleword.returnstr;
        localStorage.setItem("word-caches", jsonstr);
        addedwordcache();
    }
    ;
    /**
     * Remove a previous word data from browser's Local Storage --> Key/Value
     * data referencing words stored in local cache.
     *
     * @param localstorageword - string from "Previous Word Searches" button
     */
    removeDictionaryTermfromLocalStorage(localstorageword) {
        //Remove the cache item to Local Storage, Cache Storage
        //Check local storage is not null or empty
        if (DictionarySearch.wordStorage == null) {
            //LOGLEAF
            return;
        }
        //Get the words array from Local Storage
        //RWBError.checkLocalStorageNullorEmpty("DictionaryWidget", "word-caches"); //log whether fetched word cache is null or empty.
        let allcache = DictionarySearch.wordStorage;
        //Remove the word from Cache Storage and Local Storage word array
        for (let wordCache of allcache) {
            if (wordCache.word == localstorageword) {
                this.removeRequestfromCacheStorage(wordCache.wordURL);
                allcache.splice(allcache.indexOf(wordCache), 1);
                console.log(`%c<RWB>%cDeleted word cache: ${localstorageword}`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
            }
        }
        if (allcache.length == 0) {
            //The removed word was the last word in the array, so remove the container
            localStorage.removeItem("word-caches");
            console.log(`%c<RWB>%cDeleted storage key: word-caches`, "color:darkcyan;font-size:14px;font-weight:bold;", "color:darkcyan;font-size:16px;");
            return;
        }
        //Call RWBStringifyJSON to stringify the object
        let wordcachesstrfytest = Object.create(new rwbJsonConverter_2.RWBStringifyJSON(allcache));
        if (!wordcachesstrfytest.passed) {
            //LOGLEAF
            return;
        }
        //Return remaining words to Local Storage
        localStorage.setItem("word-caches", wordcachesstrfytest.returnstr);
    }
    ;
    /**
     * Remove a fetch request from Cache Storage. Utilizes
     * DictionarySearch.CacheStorageNameofWordRequest for cache name.
     * @param removeURL
     */
    removeRequestfromCacheStorage(removeURL) {
        window.caches.open(DictionarySearch.CacheStorageNameofWordRequest).then(cache => {
            caches.match(removeURL).then(result => {
                if (result === undefined) {
                    console.log("Problem matching the result. Result: ", result);
                }
                else {
                    let cachePromise = new Promise(resolve => resolve(result));
                    cachePromise.then(() => {
                        cache.delete(removeURL);
                    });
                }
            });
        });
    }
    ;
    /**
     * This function dynamically recalls a word definition request and instantiates apiGET(). The
     * returned promise also dymanically answers the widget markup.
     *
     * @param word - The word searched from widget input.
     * @param wordUrl - The fetch request URL.
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param sendToCache - ? Send fetch request to Cache Storage : Fetch without storing the request.
     * @param cacheName - If sending fetch requests to cache, provide a name to store it under.
     * @returns - wordData: Promise<unknown>
     */
    fetchDictionaryTerm(word, wordUrl, searchElems, sendToCache, cacheName) {
        //A function call parameter option is to store the word request in browser's Cache Storage
        //Structure the word data via 'localstoragewordvalue' interface used throughout fetching
        let wordcache = {
            inCache: sendToCache,
            word: word,
            wordURL: wordUrl,
            cacheName: sendToCache ? cacheName : "",
        };
        //Asynchronous fetch reqeust and dynamic markup creation from the data's return
        const wordFetchRequest = async () => {
            //Call apiGET() object constructor
            const wordFetch = new api_1.apiGET(wordcache.wordURL, wordcache.inCache, searchElems.errorElem, wordcache.cacheName);
            let noDefinitions;
            //Fetch request method call. Returned data may be the word definition
            let data = await wordFetch.apiGet(wordFetch.getGetUrl());
            if (typeof data == "string") {
                //If the returned data is a string, it is the word definition data.
                noDefinitions = false;
                let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(data));
                if (!parsetest.passed) {
                    return;
                }
                data = parsetest.returnobj;
            }
            let wordData = data;
            //If the returned data is an object, confirm it is 'no definition' server data
            if (typeof data == "object") {
                if (Object.hasOwn(wordData, "title")) {
                    //No definitions were found when data is an object with a title property
                    //wordData.title == "No Definitions Found"
                    noDefinitions = true;
                    if (wordData.title == "No Definitions Found" && wordcache.inCache == true) {
                        //The data stream here is without word data. This function awaits the api fetch's data
                        //to complete storage/promise returns. It waits 5 seconds for the browser to complete its store functions
                        //then removes the unwanted cache request.
                        //TODO:BUGRESEARCH=>During the 5 timeout, if the page refreshes a 'bad word' will be stored in the cache
                        //This 'bad word' can be removed by deleting all previous words via UI and refreshing the page. This will
                        // fire getLocalStorageWordCaches() to clear any mismatched worddata<-->cachedrequests.
                        setTimeout(() => {
                            //Function awaiting request's Cache Storage caching
                            try {
                                this.removeRequestfromCacheStorage(wordFetch.getGetUrl());
                            }
                            catch {
                                console.log("Could not remove from Cache Storage. Name: ", wordFetch.getGetUrl());
                            }
                        }, 5000);
                    }
                }
            }
            if (data == undefined || noDefinitions) {
                //Good data--> return data for markup render
                //'Bad data' due to "No definitions found", invalid word, bad network connection
                if (!navigator.onLine) {
                    //Online, problem with fetch
                    //Offline request
                    searchElems.errorElem.innerText += ", check network connection.";
                    return;
                }
                if (noDefinitions) {
                    //Server returned no definitions data
                    if (wordData.title == "No Definitions Found")
                        searchElems.errorElem.innerText = "No Definitions Found";
                    searchElems.errorElem.classList.add("error-notfound");
                    return data;
                }
                return;
            }
            this.addDictionaryTermtoLocalStorage(wordcache);
            return data;
        };
        let wordData = wordFetchRequest();
        return wordData;
    }
    ;
    /**
     * User input validation function tests the input string against a valid Regular Expression.
     *
     *    RegExp("^[A-Za-z]{1,45}$")
     *
     * @param intxt - String value received from user field input.
     * @returns Acceptable user input: true or false.
     */
    wordValidation(intxt) {
        let trimmed = intxt.trim();
        let lettersRE = new RegExp("^[A-Za-z]{1,45}$");
        if (lettersRE.test(trimmed)) {
            return true;
        }
        else {
            //word is not an acceptable word.`);
            return false;
        }
    }
    ;
    /**
     * callFetchDictionaryTerm awaits a promise, fetching a dictionary term. The data
     * ingress calls markup creation function.
     *
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param word - The word to be fetched.
     * @param wordURL - A URL composing the full url of the fetch request.
     */
    callFetchDictionaryTerm(searchElems, word, wordURL) {
        // When the word data resolves, call markup functions
        let wordDataPromise = new Promise(resolve => {
            resolve(this.fetchDictionaryTerm(word, wordURL, searchElems, true, DictionarySearch.CacheStorageNameofWordRequest));
        });
        wordDataPromise.then((data) => {
            this.wordData = data;
            this.createDictionaryTermWithMarkup(data, searchElems);
            if (data == undefined || Object.hasOwn(data, "title"))
                return;
            console.log(`%c<RWB>%cRetrieved word: ${word}`, "color:gold;font-weight:bold;", "color:gold;");
            // Remove unneeded classes if applied previously
            searchElems.searchWord.classList.remove("invalid");
            searchElems.searchWord.classList.remove("invalid-notfound");
            searchElems.errorElem.classList.remove("error");
            searchElems.errorElem.classList.remove("error-notfound");
            searchElems.errorElem.textContent = "";
        });
    }
    ;
    /**
     * wordSearch() begins a word search request. The user input listener chooses
     * whether the fetch is called from cache or is new.
     *
     * @param searchElems - Widget Elements -- key widget function elements.
     * @param isFromPreviousWords - True if the user requested a search from a previous word, to call data from Browser Cache.
     * @param cachedWord - If the user called for a previous word, cachedWord is within the Local Storage.
     */
    wordSearch(searchElems, isFromPreviousWords, cachedWord) {
        if (isFromPreviousWords) {
            this.callFetchDictionaryTerm(searchElems, cachedWord.word, cachedWord.wordURL);
        }
        else {
            // Take user input and filter to an accepted string
            let acceptedInputWord = false;
            this.wordValidation(searchElems.searchWord.value)
                ? (acceptedInputWord = true)
                : (acceptedInputWord = false);
            if (acceptedInputWord) {
                // Create a URL of the accepted word for use in the fetch call
                this.wordURL = new URL(searchElems.searchWord.value.toString(), DictionarySearch.requestUrl);
                this.callFetchDictionaryTerm(searchElems, searchElems.searchWord.value, this.wordURL);
            }
            else {
                searchElems.searchWord.classList.remove("invalid-notfound");
                searchElems.searchWord.classList.add("invalid");
                searchElems.errorElem.classList.remove("error-notfound");
                searchElems.errorElem.classList.add("error");
                searchElems.errorElem.textContent = "Invalid word!";
                searchElems.searchWord.classList.add("invalid-notfound");
            }
        }
        searchElems.searchWord.value = ""; // reset input string
    }
    ;
}
exports.DictionarySearch = DictionarySearch;

},{"./api":15,"./dictionarySearchMarkup":19,"./rwbErrorBus":23,"./rwbJsonConverter":24}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A DictionarySearchWidget is made to create the markup needed for the
 *  Dictionary Search. Elements are created and appended to the page to the class
 *  'dictionaryWidget'
 */
class DictionarySearchMarkup {
    searchElements;
    constructor(elem) {
        //insert the widget after the passed in "elem"
        if (elem == undefined) {
            console.log(`%cThere is no "dictionaryWidget" class on this page.`, "color: orange;");
            return;
        }
        if (!elem.classList.contains("dictionaryWidget")) {
            console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
            return;
        }
        this.createDictionaryWidgetMarkup(elem);
    }
    ;
    /**
     * Primary widget markup structuring the widget elements and search input.
     *
     * @param elem - The reference element before the widget.
     * @returns searchElements: DictionarySearchElements --> interface of
     *  important HTML elements used through widget function.
     */
    createDictionaryWidgetMarkup(elem) {
        const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
        if (dictionary == null) {
            console.log("The determined dictionary element is null.");
            return;
        }
        // Create widget elements
        const artH = dictionary.appendChild(document.createElement("h3"));
        const searchForm = dictionary.appendChild(document.createElement("form"));
        const previousWords = dictionary.appendChild(document.createElement("div"));
        // Return elements used in later functions
        let searchElements = {
            searchWord: searchForm.appendChild(document.createElement("input")),
            wordSearch: searchForm.appendChild(document.createElement("button")),
            dictionaryElem: dictionary,
            errorElem: searchForm.appendChild(document.createElement("span")),
            previousWordBtn: previousWords.appendChild(document.createElement("button")),
            previousWordsContainer: dictionary.appendChild(document.createElement("div")),
            refreshBtn: previousWords.appendChild(document.createElement("button")),
        };
        // Add attributes and property values
        const fontAwesomeSearchIcon = searchElements.wordSearch.appendChild(document.createElement("i"));
        fontAwesomeSearchIcon.classList.add("fa");
        fontAwesomeSearchIcon.classList.add("fa-search");
        previousWords.classList.add("previousWords");
        searchElements.searchWord.classList.add("monospace");
        searchElements.previousWordBtn.classList.add("dictionary-btn");
        searchElements.refreshBtn.classList.add("dictionary-btn");
        searchElements.searchWord.setAttribute("type", "search");
        searchElements.searchWord.setAttribute("placeholder", "Search...");
        searchElements.searchWord.setAttribute("aria-label", "Input");
        searchElements.wordSearch.setAttribute("type", "submit");
        searchElements.wordSearch.setAttribute("aria-label", "Search");
        searchElements.searchWord.id = "search-word";
        searchElements.wordSearch.id = "word-search";
        searchElements.previousWordBtn.innerText = "Previous Word Searches";
        searchElements.refreshBtn.innerText = "Refresh";
        searchElements.previousWordsContainer.id = "dictionary-btns";
        dictionary.id = "dictionary";
        searchForm.id = "dictionary-search";
        searchForm.action = "index.html";
        artH.textContent = "Dictionary Term:";
        this.searchElements = searchElements;
    }
    ;
    /**
     * Creates the markup to house returned words from DictionarySearch. The markup
     *  is created based on API egress. Words and their definitions vary. The markup is
     *  adaptive to returned word data structures.
     *
     * @param wordData - This parameter is an object of word types, definitions, and examples.
     * @param searchElems - Widget Elements -- key widget function elements.
     */
    createDictionaryTermWithMarkup(wordData, searchElems) {
        if (wordData == null || !(wordData instanceof Object) || Object.hasOwn(wordData, "title")) {
            console.log("%cThere is no definition for this word.", "color:darkgreen;");
            return;
        }
        // Add word definition to the dictionary widget
        const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(document.createElement("div"));
        const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
        definitionDescription.appendChild(document.createElement("hr")); // word definition separator
        definitionDescriptionContainer.classList.add("definitionDescription");
        // The word data represents complex JSON object
        // Recurse the word data object, adding elements from the various levels
        wordData.map((word) => {
            definitionDescriptionContainer.setAttribute("word", word.word);
            //console.log("The word is: ",word)
            const wordTitle = definitionDescription.appendChild(document.createElement("h3"));
            wordTitle.textContent = word.word;
            //Add the word and examples to page
            word.meanings.map((wordType) => {
                //console.log("WordType are: ", wordType)
                const wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
                const wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
                wordTypeH.textContent = wordType.partOfSpeech;
                wordType.definitions.map((def) => {
                    //console.log("Definition is: ", def);
                    let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
                    let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
                    definitionP.textContent = def.definition;
                    definitionP.classList.add("wordDefinition");
                    const addAdjacentElem = () => {
                        //console.log("Definitions is: ", def);
                        const newP = definitionP.insertAdjacentElement("beforeend", document.createElement("p"));
                        if (newP instanceof HTMLElement) {
                            const newPi = newP.appendChild(document.createElement("i"));
                            newPi.textContent = def.example;
                        }
                        definitionP.classList.add("example");
                    };
                    //check if key "example" is in definition. If it is, add the example to list
                    "example" in def ? addAdjacentElem() : true == true;
                });
            });
        });
        //create clear button
        const deleteWordTermHeadingElem = definitionDescriptionContainer.appendChild(document.createElement("button"));
        deleteWordTermHeadingElem.setAttribute("type", "word-clear");
        deleteWordTermHeadingElem.classList.add("dictionary-word-btn-clear");
        deleteWordTermHeadingElem.style.display = "block";
        //when clear button is hovered, display it
        definitionDescriptionContainer.addEventListener("mouseover", event => {
            deleteWordTermHeadingElem.style.opacity = "100%";
            //when clear button is not hovered, hide it
            definitionDescriptionContainer.addEventListener("mouseout", () => {
                deleteWordTermHeadingElem.style.opacity = "50%";
            });
        });
        //when clear button is clicked, clear the elements
        deleteWordTermHeadingElem.addEventListener("click", event => {
            event.preventDefault();
            definitionDescriptionContainer.remove();
            console.log(`%c<RWB>%cRemoved word: ${definitionDescriptionContainer.getAttribute("word")}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
        });
        //add clear button to widget
        definitionDescriptionContainer.appendChild(definitionDescription);
    }
    ;
    createPreviousWordSearchesElements(wordstorage, buttonContainer) {
        let buttonsarr = [];
        //Because the locator and the Local Storage values are viable, create the markup
        //needed to display those words. Add event listeners for widget functionality.
        for (let wordCache of wordstorage) {
            const wordHeadingElemContainer = buttonContainer.appendChild(document.createElement("div"));
            const cacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
            const deleteCacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
            deleteCacheWordHeadingElem.setAttribute("type", "button-clear");
            deleteCacheWordHeadingElem.classList.add("dictionary-word-btn-clear");
            cacheWordHeadingElem.setAttribute("type", "button");
            cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
            cacheWordHeadingElem.textContent = wordCache.word;
            let previouswordbtn = {
                word: wordCache,
                cacheWordHeadingElem: cacheWordHeadingElem,
                wordHeadingElemContainer: wordHeadingElemContainer,
                deleteCacheWordHeadingElem: deleteCacheWordHeadingElem,
            };
            buttonsarr.push(previouswordbtn);
        }
        return buttonsarr;
    }
    ;
}
exports.default = DictionarySearchMarkup;

},{}],20:[function(require,module,exports){
"use strict";
//Author: Robert A Howell, April 2023
//Original Author(s): Mozilla Contributors, MDN
//License: https://www.mozilla.org/en-US/about/governance/policies/participation/
//MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//Source distribution: https://github.com/mdn/web-components-examples/tree/main/expanding-list-web-component
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingListElement = void 0;
class ExpandingListElement extends HTMLUListElement {
    /**Counts the number of objects instantiated */
    static count = 0;
    constructor() {
        // Always call super first in constructor
        // Return value from super() is a reference to this element
        super();
        // Get ul and li elements that are a child of this custom ul element
        // li elements can be containers if they have uls within them
        const uls = this.querySelectorAll("ul");
        const lis = this.querySelectorAll("li");
        // Hide all child uls
        // These lists will be shown when the user clicks a higher level container
        uls.forEach(ul => {
            ul.style.display = "none";
        });
        // Look through each li element in the ul
        lis.forEach(li => {
            // If this li has a ul as a child, decorate it and add a click handler
            if (li.querySelectorAll("ul").length > 0) {
                // Add an attribute which can be used  by the style
                // to show an open or closed icon
                li.setAttribute("class", "closed");
                // Wrap the li element's text in a new span element
                // so we can assign style and event handlers to the span
                const childText = li.childNodes[0];
                const newSpan = document.createElement("span");
                // Copy text from li to span, set cursor style
                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = "pointer";
                // Add click handler to this span
                newSpan.onclick = this.showul;
                newSpan.addEventListener("keydown", event => {
                    if (event.code == "NumpadEnter" || event.code == "Enter") {
                        // next sibling to the span should be the ul
                        let nextul = newSpan.nextElementSibling;
                        // Toggle visible state and update class attribute on ul
                        if (nextul.style.display == "block") {
                            nextul.style.display = "none";
                            let spanParent = nextul.parentNode;
                            spanParent.setAttribute("class", "ulistelem-closed");
                        }
                        else {
                            nextul.style.display = "block";
                            let spanParent = nextul.parentNode;
                            spanParent.setAttribute("class", "ulistelem-open");
                        }
                    }
                });
                // Add the span and remove the bare text node from the li
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
        ExpandingListElement.count++;
    }
    ;
    // li click handler
    showul = function (e) {
        // next sibling to the span should be the ul
        const nextul = e.target.nextElementSibling;
        // Toggle visible state and update class attribute on ul
        if (nextul.style.display == "block") {
            nextul.style.display = "none";
            nextul.parentNode.setAttribute("class", "ulistelem-closed");
        }
        else {
            nextul.style.display = "block";
            nextul.parentNode.setAttribute("class", "ulistelem-open");
        }
    };
}
exports.ExpandingListElement = ExpandingListElement;

},{}],21:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowingCardElement = void 0;
class GrowingCardElement extends HTMLLIElement {
    /**Counts the number of objects instantiated */
    static count = 0;
    isGrown = false;
    constructor() {
        super();
        this.addEventListener("click", this.growCard);
        GrowingCardElement.count++;
    }
    ;
    static shrinkCard = (li) => {
        //TODO: check class property
        if (li.style.scale) {
            li.style.scale = "1";
            li.style.zIndex = "1";
            li.setIsGrown(false);
        }
    };
    static shadeInactiveCard = (li) => {
        if (GrowingCardElement.getIsAtLeastOneBig()) {
            if (!li.getIsGrown()) {
                if (window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: light)").matches) {
                    li.style.opacity = ".5";
                }
                else {
                    li.style.opacity = ".3";
                }
            }
            else {
                if (window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: light)").matches) {
                    li.style.opacity = "1";
                }
                else {
                    li.style.opacity = "1";
                }
            }
        }
        else {
            if (window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: light)").matches) {
                li.style.opacity = "1";
            }
            else {
                li.style.opacity = "1";
            }
        }
    };
    static getIsAtLeastOneBig = () => {
        let listLIs = Array.from(document.querySelectorAll(`#webIDECards li`));
        let atLeastOneIsBig = listLIs.some(li => li.getIsGrown() == true);
        return atLeastOneIsBig;
    };
    getIsGrown = () => {
        return this.isGrown;
    };
    setIsGrown = (truefalse) => {
        return (this.isGrown = truefalse);
    };
    growCard = () => {
        this.style.scale = "1.2";
        this.style.zIndex = "2";
        this.style.opacity = "1";
        this.setIsGrown(true);
        // Get all the list elements to reference which one to grow
        // If it's not the clicked element, shrink it.
        let listLIs = document.querySelectorAll("#webIDECards li");
        for (let item of listLIs) {
            if (item !== this) {
                GrowingCardElement.shrinkCard(item);
                GrowingCardElement.shadeInactiveCard(item);
                // set the scale property for each card
                if (item.style.scale == "") {
                    item.style.scale = "1";
                    item.style.zIndex = "1";
                }
            }
        }
    };
}
exports.GrowingCardElement = GrowingCardElement;

},{}],22:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropagationLatencyCalculation = void 0;
class PropagationLatencyCalculation {
    distance;
    speed;
    packetSize;
    transmissionRate;
    propagationDelay;
    serializationDelay;
    networkLatency;
    constructor(distance, speed, packetSize, transmissionRate) {
        this.distance = distance;
        this.speed = speed;
        this.packetSize = packetSize;
        this.transmissionRate = transmissionRate;
        this.propagationDelay = this.calculatePropagationDelay();
        this.serializationDelay = this.calculateSerializationDelay();
        this.networkLatency = this.calculateNetworkLatency();
    }
    ;
    static numberValidation(intxt) {
        let trimmed = intxt.trim();
        let numbersRE = new RegExp("^[0-9]{1,30}$");
        if (numbersRE.test(trimmed)) {
            return true;
        }
        else {
            //input is not an acceptable number string.`);
            return false;
        }
    }
    ;
    getDistance() {
        return this.distance;
    }
    ;
    getSpeed() {
        return this.speed;
    }
    ;
    getPropagationDelay() {
        return this.propagationDelay;
    }
    ;
    getPacketSize() {
        return this.packetSize;
    }
    ;
    getTransmissionRate() {
        return this.transmissionRate;
    }
    ;
    getSerializationDelay() {
        return this.serializationDelay;
    }
    ;
    getNetworkLatency() {
        return this.networkLatency;
    }
    ;
    calculatePropagationDelay() {
        let propdelay = this.distance / this.speed;
        return propdelay;
    }
    ;
    calculateSerializationDelay() {
        let serialdelay = this.packetSize / this.transmissionRate;
        return serialdelay;
    }
    ;
    calculateNetworkLatency() {
        return this.propagationDelay + this.serializationDelay;
    }
    ;
}
exports.PropagationLatencyCalculation = PropagationLatencyCalculation;

},{}],23:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
exports.RwbDomException = exports.RwbSyntaxError = exports.RwbReferenceError = void 0;
/** Create this object to record reference errors. */
class RwbError {
    /**Counts the number of objects instantiated */
    static count = 0;
    constructor() {
        RwbError.count++;
    }
    ;
    static checkElementforNull(componentName, cssQuery, logMessage, supressException) {
        let elem;
        let logmssg = true; //Log message option default
        if (!logMessage)
            logmssg = logMessage;
        let supressexcpt = false; //Supress message option default
        if (supressException)
            supressexcpt = true;
        let query = `${cssQuery}`;
        // Add dictionary widget if an element with that class is on a page
        try {
            elem = document.querySelector(query);
        }
        catch {
            Object.create(new RwbReferenceError("GetElement", `Could not get element: '${query}'`));
        }
        if (elem == null) {
            if (logmssg)
                console.info(`%cNo element found with query: ${query}.`, "color: orange;");
            if (!supressexcpt)
                Object.create(new RwbReferenceError(`${componentName}NullReference`, `Element not found`));
            return true;
        }
        return false;
    }
    ;
    static checkLocalStorageEqualNull(componentName, key, checkEmptyString, logMessage) {
        let logmssg = true;
        if (!logMessage)
            logmssg = logMessage;
        if (localStorage.getItem(`${key}`) == null) {
            if (logmssg)
                console.info(`%cNo local storage for ${componentName}.`, "color:purple;");
            return true;
        }
        if (checkEmptyString)
            return RwbError.checkLocalStorageNullorEmpty(componentName, key, logmssg);
    }
    ;
    static checkLocalStorageNullorEmpty(componentName, key, logMessage) {
        let logmssg = true;
        if (!logMessage)
            logmssg = logMessage;
        let test;
        try {
            test = localStorage.getItem(`${key}`);
        }
        catch {
            throw new Error(`Could get local storage key: ${key}`);
        }
        if (test == null) {
            if (logmssg)
                console.warn(`%cLocal storage key not found: ${key}.`, "color: yellow;font-weight:bold;");
            Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Key not found`));
            return true;
        }
        if (test == "" || test == "[]") {
            if (logmssg)
                console.warn(`%cLocal storage value is empty for key: ${key}`, "color: yellow;font-weight:bold;");
            Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Value is empty`));
            return true;
        }
        return false;
    }
    ;
}
exports.default = RwbError;
/** Create this object to store reference error data. */
class RwbReferenceError extends ReferenceError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    refError;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        let err = new ReferenceError(this.message);
        this.refError = err;
        console.error(`%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.refError, "color:red;font-weight:bold;");
        RwbReferenceError.count++;
    }
    ;
}
exports.RwbReferenceError = RwbReferenceError;
/** Create this object to store syntax error data. */
class RwbSyntaxError extends SyntaxError {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    page;
    syntaxError;
    constructor(name, message) {
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        let err = new SyntaxError(this.message);
        this.syntaxError = err;
        console.error(`%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.syntaxError, "color:red;font-weight:bold;");
        RwbSyntaxError.count++;
    }
    ;
}
exports.RwbSyntaxError = RwbSyntaxError;
class RwbDomException extends DOMException {
    /**Counts the number of objects instantiated */
    static count = 0;
    name;
    message;
    stack;
    page;
    domError;
    constructor(name, message, error) {
        super();
        this.name = name;
        this.message = message;
        this.stack = error;
        this.page = window.location.pathname;
        let err = new DOMException(this.message);
        this.domError = err;
        console.error(`%c<RWB>%cExecution experienced a DOM error:\n%o\n%c</RWB>`, "color:red;font-weight:bold;", "color:red;", this.stack, "color:red;font-weight:bold;");
        RwbDomException.count++;
    }
    ;
}
exports.RwbDomException = RwbDomException;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RWBStringifyJSON = exports.RWBParseJSON = void 0;
//--Copyright (c) 2023 Robert A. Howell
const rwbErrorBus_1 = require("./rwbErrorBus");
/** An RWBParseJSON parses json and stores the parsed string with the result. */
class RWBParseJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    returnobj;
    passed;
    parsestr;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(parsestr) {
        RWBParseJSON.count++;
        this.parsestr = parsestr;
        this.passed = this.RWBparseJSON();
    }
    ;
    RWBparseJSON() {
        try {
            this.returnobj = JSON.parse(this.parsestr);
        }
        catch (e) {
            this.returnobj = null;
            new rwbErrorBus_1.RwbSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
    ;
}
exports.RWBParseJSON = RWBParseJSON;
/** An RWBParseJSON tests whether an object can be stringified into a valid
 * json string. */
class RWBStringifyJSON {
    /**Counts the number of objects instantiated */
    static count = 0;
    returnstr;
    passed;
    json;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(json) {
        RWBStringifyJSON.count++;
        this.json = json;
        this.passed = this.parseJSON();
    }
    ;
    parseJSON() {
        try {
            this.returnstr = JSON.stringify(this.json);
        }
        catch (e) {
            this.returnstr = null;
            new rwbErrorBus_1.RwbSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
    ;
}
exports.RWBStringifyJSON = RWBStringifyJSON;

},{"./rwbErrorBus":23}],25:[function(require,module,exports){
"use strict";
//--Copyright (c) 2023 Robert A. Howell
Object.defineProperty(exports, "__esModule", { value: true });
/** Create this object to record performance start and end marks. */
class RwbPerf {
    /**Counts the number of objects instantiated */
    static count = 0;
    scriptRuntimeMarks = {
        name: null,
        startMark: null,
        endMark: null,
    };
    /** Instantiating a ScriptPerf records the performance start mark. */
    constructor(scriptName) {
        this.scriptRuntimeMarks.name = scriptName;
        this.scriptRuntimeMarks.startMark = performance.mark(`${this.scriptRuntimeMarks.name}-start`);
        RwbPerf.count++;
    }
    ;
    /** Call end() to set the end time stamp. */
    end() {
        this.scriptRuntimeMarks.endMark = performance.mark(`${this.scriptRuntimeMarks.name}-end`);
        this.measure();
    }
    ;
    /** A console output of this object's performance measurement. */
    measure() {
        let measure = performance.measure(this.scriptRuntimeMarks.name, this.scriptRuntimeMarks.startMark.name, this.scriptRuntimeMarks.endMark.name);
        return console.debug(`${this.scriptRuntimeMarks.name} execution time is: ${measure.duration}`);
    }
    ;
}
exports.default = RwbPerf;

},{}],26:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
const rwbJsonConverter_1 = require("./rwbJsonConverter");
const rwbErrorBus_1 = __importDefault(require("./rwbErrorBus"));
/**
 * A ToDoList is an HTML widget to store To-Dos in the browser. Instantiate the
 *  ToDoList constructor to create widget markup and functionality. To-Dos are
 *  stored in the browser's Local Storage and read and rendered when the page loads.
 *
 * To create a ToDoList, an element on the page must have '.ToDoList' class. Call the
 *  class constructor, passing in that element to create the widget.
 *
 *       const todoWidget = new ToDoList();
 *       todoWidget.createToDoListWidget(elem);
 *
 * Then, the widget is created and To-Dos are retrieved from storage.
 */
class ToDoList {
    /**Total number of ToDOs*/
    static ToDOs = 0;
    /**Widget elements used to populate todos */
    static ToDoElements;
    static ToDoInStorage;
    /**Todo HTML elements */
    listElements;
    /**
     * Sets the To-Do list widget's elements.
     *
     *      ToDoList.ToDoElements
     * @param ToDoElements Widget Elements -- key widget function elements.
     */
    static setToDoListElements(ToDoElements) {
        ToDoList.ToDoElements = ToDoElements;
    }
    ;
    /**
     * Random Web Bits uses multiple locations to apply the To-Do List widget. Create
     *  the list markup, passing in a reference element for placement of the widget.
     * @param elem - widget is placed after this reference element.
     */
    createToDoListWidget(elem) {
        //Insert the widget after the passed in "elem"
        //Dependent on the page, todo widget may have pre-existing markup in place
        //Switch against the current page to determine markup needed
        if (elem == undefined) {
            console.log(`%cThere is no "ToDoList" class on this page.`, "color:orange;");
            return;
        }
        if (!elem.classList.contains("ToDoList")) {
            console.log(`Add "ToDoList" class to ${elem.nodeName} node.`);
            return;
        }
        switch (window.location.pathname) {
            case "/RandomWebBits/":
            case "/RandomWebBits/index.html":
            case "/index.html":
            case "/":
            case "/dist/index.html":
                //Markup does not exist on the page
                //Create table elements needed for the todo list
                const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                const header = todolistSection.appendChild(document.createElement("h3"));
                const div = todolistSection.appendChild(document.createElement("div"));
                const table = div.appendChild(document.createElement("table"));
                const thead = table.appendChild(document.createElement("thead"));
                const tr1 = thead.appendChild(document.createElement("tr"));
                const thleft = tr1.appendChild(document.createElement("th"));
                const thmiddle = tr1.appendChild(document.createElement("th"));
                const tbody = table.appendChild(document.createElement("tbody"));
                const tfoot = table.appendChild(document.createElement("tfoot"));
                const tr3 = tfoot.appendChild(document.createElement("tr"));
                const td3left = tr3.appendChild(document.createElement("td"));
                const td3IN = td3left.appendChild(document.createElement("input"));
                const td3middle = tr3.appendChild(document.createElement("td"));
                const INPUT = td3middle.appendChild(document.createElement("input"));
                //Add attributes and property values
                table.appendChild(document.createElement("tfoot"));
                td3IN.setAttribute("aria-label", "Add");
                td3IN.setAttribute("Value", "Add");
                INPUT.setAttribute("name", "itemINPUT");
                INPUT.setAttribute("type", "text");
                INPUT.setAttribute("aria-label", "Input");
                header.textContent = "To-Do:";
                todolistSection.id = "ToDO";
                thleft.textContent = "Complete?";
                thmiddle.textContent = "Description";
                tbody.id = "ToDoItems";
                td3IN.id = "AddButton";
                td3IN.type = "button";
                //Create a sample to do item (it is not stored in cache)
                this.createSampleTo_Do(tbody);
                //With the elements created, set the class list elements
                this.getToDoListElements();
                ToDoList.setToDoListElements(this.listElements);
                this.populateToDoList();
                this.addToDoEventListeners();
                break;
            case "/RandomWebBits/pages/todos.html":
            case "/pages/todos.html":
                //Markup exists on the page already
                //With the elements created, set the class list elements
                this.getToDoListElements();
                ToDoList.setToDoListElements(this.listElements);
                //Create a sample to do item due to cache empty
                const htbody = ToDoList.ToDoElements.todoTableBody;
                if (htbody != null) {
                    this.createSampleTo_Do(htbody);
                }
                this.populateToDoList();
                this.addToDoEventListeners();
                break;
            default:
                console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.");
        }
    }
    ;
    /**
   * Checks for To-Do items from Local Storage.
   * @returns boolean true or false
   */
    static getToDoInStorage(checkemptyvaluestring, logmessage) {
        if (rwbErrorBus_1.default.checkLocalStorageEqualNull("ToDoList", "ToDos", checkemptyvaluestring, logmessage)) {
            return false;
        }
        let parsestr = localStorage.getItem("ToDos");
        let parsetest = Object.create(new rwbJsonConverter_1.RWBParseJSON(parsestr));
        if (!parsetest.passed) {
            //parsed JSON is malformed
            localStorage.removeItem("ToDos");
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, "color:orange;font-size:14px;font-weight:bold;", "color:orange;font-size:16px;");
            return false;
        }
        this.ToDoInStorage = parsetest.returnobj;
        return true;
    }
    ;
    /**
     * Gather necessary elements from the created widget.
     * @returns ToDoElements: ToDoListElements
     */
    getToDoListElements() {
        //Gather necessary elements from the created widget
        //Each widget location's elements may vary, so a call of getToDoListElements()
        //locates the page's elements to populate the ToDoElements interface.
        let ToDoElements = {
            todoTable: document.querySelector("#ToDO table"),
            todoTableBody: document.getElementById("ToDoItems"),
            addButton: document.getElementById("AddButton"),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        };
        this.listElements = ToDoElements;
    }
    ;
    /**
     * Adds a To-Do to Local Storage.
     * @param description - The UI form input description.
     */
    addtoDoToStorage(description) {
        //Add the ToDos array to local cache.
        //The 'localstoragetodocache' interface structures the data for later retrieval.
        let ToDo = {
            inCache: false,
            todoitem: description,
        };
        let ToDos = []; //ToDo array
        let strgfy;
        const stringifytodo = (todostr) => {
            //Call RWBStringifyJSON to stringify the object
            let todosstrgfytest = Object.create(new rwbJsonConverter_1.RWBStringifyJSON(todostr));
            if (!todosstrgfytest.passed) {
                //LOGLEAF
                return;
            }
            return todosstrgfytest.returnstr;
        };
        //First, read current Local Storage ToDos
        let todosstoragecache = ToDoList.getToDoInStorage(false, false);
        if (todosstoragecache) {
            ToDos = ToDoList.ToDoInStorage;
            ToDos.push(ToDo);
            //Call RWBStringifyJSON to stringify the object
            strgfy = stringifytodo(ToDos);
            localStorage.setItem("ToDos", strgfy);
        }
        else {
            ToDos.push(ToDo);
            //Call RWBStringifyJSON to stringify the object
            strgfy = stringifytodo(ToDos);
            localStorage.setItem("ToDos", strgfy);
            console.log(`%c<RWB>%cCreated to-do cache key: ToDos`, "color:cyan;font-size:14px;font-weight:bold;", "color:cyan;font-size:16px;");
        }
        console.log(`%c<RWB>%cAdded to-do cache: ${description}`, "color:cyan;font-weight:bold;", "color:cyan;");
    }
    ;
    /**
     * Removes a To-Do item from Local Storage. The requested To-Do to remove is
     *  pulled individually from the key-value pair object.
     * @param item - the To-Do item requested to remove
     */
    removetoDoFromStorage(item) {
        ToDoList.ToDoInStorage = ToDoList.ToDoInStorage.filter(todo => todo.todoitem !== item);
        console.log(`%c<RWB>%cDeleted todo cache: ${item}`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
        let todoinstoragestrgfytest = Object.create(new rwbJsonConverter_1.RWBStringifyJSON(ToDoList.ToDoInStorage));
        if (!todoinstoragestrgfytest.passed) {
            //LOGLEAF
            return;
        }
        let jsonstr = todoinstoragestrgfytest.returnstr;
        if (jsonstr == "" || jsonstr == "[]") {
            localStorage.removeItem("ToDos");
            console.log(`%c<RWB>%cDeleted storage key: ToDos`, "color:darkcyan;font-size:14px;font-weight:bold;", "color:darkcyan;font-size:16px;");
            return;
        }
        localStorage.setItem("ToDos", jsonstr);
    }
    ;
    /**
     * This function creates the necessary markup to add a row to the To-Do table.
     *  A row consists of three columns: a complete tick-box, a description, and a delete button.
     * @param description - User form input to add as a description.
     * @param firstPaint - Boolean value used by adding list storage
     */
    AddToDoRow(description, firstPaint) {
        //Create a table row with checkbox and delete options
        const TABLEITEM = ToDoList.ToDoElements.todoTable;
        const tableFrag = document.createDocumentFragment();
        const newRow = tableFrag.appendChild(document.createElement("tr")); //Add row
        const firstCOL = newRow.appendChild(document.createElement("td")); //Table first data
        const checkBOX = firstCOL.appendChild(document.createElement("input")); //Add checkbox
        const newITEM = newRow.appendChild(document.createElement("td")); //Table second data
        const secondCOL = newRow.appendChild(document.createElement("td")); //Table third data
        const delBOX = secondCOL.appendChild(document.createElement("input")); //Add deletebox
        //Add attributes and property values
        checkBOX.setAttribute("type", "checkbox");
        checkBOX.setAttribute("aria-label", "Checkbox");
        checkBOX.setAttribute("aria-label", "Delete");
        newITEM.setAttribute("num", ToDoList.ToDOs
            ? (() => {
                let elem = document.querySelector("#ToDO td[num]");
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoList.ToDOs).toString();
            })()
            : (1).toString());
        newITEM.textContent = description; //Populate second col
        ToDoList.ToDOs++; //Number of Items
        delBOX.setAttribute("type", "submit");
        delBOX.setAttribute("value", "Delete");
        if (firstPaint) {
            //Add to list storage
            this.addtoDoToStorage(description);
        }
        //Add the row to the ToDos table
        TABLEITEM.appendChild(tableFrag);
        console.log(`%c<RWB>%cCreated to-do table row`, "color:gold;font-weight:bold;", "color:gold;");
        //Add an event listener for when 'delete' is clicked
        delBOX.addEventListener("click", () => {
            this.DeleteButton(delBOX);
        });
    }
    ;
    /**
     * Function called to create the To-Do item rows from To-Dos stored in the browser Local Storage.
     */
    populateToDoList() {
        if (ToDoList.getToDoInStorage(true, false)) {
            for (let i = 0; i < ToDoList.ToDoInStorage.length; i++) {
                this.AddToDoRow(ToDoList.ToDoInStorage[i].todoitem, false);
            }
        }
    }
    ;
    /**
     * Add button functionality.
     */
    addToDoEventListeners() {
        const ADDBUTTON = ToDoList.ToDoElements.addButton;
        const ADDITEMENTER = ToDoList.ToDoElements.addItemToEnter;
        if (ADDBUTTON == null && ADDITEMENTER == null) {
            throw new Error("Element was not found or is null");
        }
        /**Add input text to the todo list from clicking the add button*/
        ADDBUTTON.addEventListener("click", () => {
            this.AddToDoRow(ADDITEMENTER.value, true);
            ADDITEMENTER.value = "";
        });
        /**Add input text to the todo list when using key enter*/
        ADDITEMENTER.addEventListener("keydown", e => {
            if (e.code == "NumpadEnter" || e.code == "Enter") {
                this.AddToDoRow(ADDITEMENTER.value, true);
                ADDITEMENTER.value = "";
            }
        });
    }
    ;
    /**
     * function determining the delete button. Items are deleted when pushed, but are
     *  not removed from storage without 'Complete?' checkebox checked.
     * @param box input element
     */
    DeleteButton(box) {
        if (box.parentNode == null ||
            box.parentNode.previousSibling == null ||
            box.parentNode.previousSibling.previousSibling == null) {
            throw new Error("Missing a table element.");
        }
        const rowChkBx = (box.parentNode.previousSibling.previousSibling);
        /** Input element */
        const rowChkBxIN = rowChkBx.childNodes[0];
        const todoTable = ToDoList.ToDoElements.todoTable;
        const tr = (box.parentNode.parentNode);
        let i = tr.rowIndex;
        const value = box.parentNode.previousSibling.textContent;
        if (rowChkBxIN.checked) {
            //remove row since completed
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cDeleted todo row: ${box.parentElement.previousElementSibling.textContent}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
            if (value != "Add a ToDO Item.") {
                ToDoList.ToDOs--;
                //delete associated storage item
                this.removetoDoFromStorage(value);
            }
        }
        else {
            todoTable.deleteRow(i);
            console.log(`%c<RWB>%cRemoved todo row: ${box.parentElement.previousElementSibling.textContent}`, "color:goldenrod;font-weight:bold;", "color:goldenrod;");
            ToDoList.ToDOs--;
        }
    }
    ;
    /**
     * This function is called to seed the To-Do List when there are no Local Storage items
     *  which would populate the list. The sample remains on page but is never stored in the browser.
     * @param tbody table body element
     */
    createSampleTo_Do(tbody) {
        if (ToDoList.getToDoInStorage(false, true))
            return;
        //Create a sample entry in the ToDo table as a placeholder
        const tr2 = tbody.appendChild(document.createElement("tr"));
        const td2left = tr2.appendChild(document.createElement("td"));
        const td2IN = td2left.appendChild(document.createElement("input"));
        const td2middle = tr2.appendChild(document.createElement("td"));
        const td2right = tr2.appendChild(document.createElement("td"));
        const td2DEL = td2right.appendChild(document.createElement("input"));
        //Add attributes and property values
        td2IN.setAttribute("aria-label", "Checkbox");
        td2middle.setAttribute("num", `${1}`);
        td2IN.setAttribute("aria-label", "Delete");
        td2DEL.setAttribute("type", "reset");
        td2DEL.setAttribute("value", "Delete");
        td2IN.type = "checkbox";
        td2middle.textContent = "Add a ToDO Item.";
        ToDoList.ToDOs++;
        //"Delete" event listener
        td2DEL.addEventListener("click", () => {
            this.DeleteButton(td2DEL);
            console.log(`%c<RWB>%cRemoved todo: ${td2DEL.parentElement.previousElementSibling.textContent}`, "color:purple;font-weight:bold;", "color:purple;");
        });
    }
    ;
}
exports.ToDoList = ToDoList;

},{"./rwbErrorBus":23,"./rwbJsonConverter":24}],27:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//--Copyright (c) 2023 Robert A. Howell
const acronyms_element_1 = __importDefault(require("./components/page/acronyms-element"));
const classComponents_1 = __importDefault(require("./classComponents"));
const expandingListDomWidget_1 = __importDefault(require("./components/page/expandingListDomWidget"));
const growingCard_1 = __importDefault(require("./components/page/growingCard"));
const colorCode_1 = require("./components/page/colorCode");
const scriptPerf_1 = __importDefault(require("./models/scriptPerf"));
const domainLookup_1 = __importDefault(require("./components/page/domainLookup"));
const sliderBar_1 = __importDefault(require("./components/page/sliderBar"));
const hslColor_1 = __importDefault(require("./components/page/hslColor"));
const calculate_1 = __importDefault(require("./components/page/calculate"));
const pageComponents = {
    checkPage: (page) => {
        classComponents_1.default.fourohfour();
        switch (page) {
            // dom.html page uses expandingLists component
            case "/pages/dom.html":
            case "/pages/svg.html":
                expandingListDomWidget_1.default.init();
                break;
            // Initialize webIDE widget
            case "/pages/webides.html":
                growingCard_1.default.init();
                break;
            // Initialize CSSEX components
            case "/pages/css.html":
                colorCode_1.cssexColorCode.init();
                break;
            // Initialize htmlexColorCode components
            case "/pages/html.html":
                colorCode_1.htmlexColorCode.init();
                break;
            // Initialize urlexColorCode components
            case "/pages/url.html":
                colorCode_1.urlexColorCode.init();
                break;
            // Initialize domain name lookup
            case "/pages/domainlookup.html":
                domainLookup_1.default.init();
                break;
            case "/pages/markup.html":
                sliderBar_1.default.init();
                break;
            // Initialize HSL color picker
            case "/pages/hsl.html":
                hslColor_1.default.init();
                break;
            // Initialize Propagation Latency calculator
            case "/pages/latency.html":
                calculate_1.default.init();
                break;
        }
    },
    init: () => {
        let page = window.location.pathname;
        const pagePerf = new scriptPerf_1.default("Pagecomponents"); //measure performance
        customElements.define("acronyms-list", acronyms_element_1.default);
        pageComponents.checkPage(page);
        pagePerf.end(); //end performance measure
    },
    load: () => { },
};
window.addEventListener("DOMContentLoaded", pageComponents.init);

},{"./classComponents":1,"./components/page/acronyms-element":5,"./components/page/calculate":6,"./components/page/colorCode":7,"./components/page/domainLookup":8,"./components/page/expandingListDomWidget":9,"./components/page/growingCard":10,"./components/page/hslColor":11,"./components/page/sliderBar":12,"./models/scriptPerf":25}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xhc3NDb21wb25lbnRzLnRzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFsLzQwNC50cyIsInNyYy9jb21wb25lbnRzL2dsb2JhbC9kaWN0aW9uYXJ5V2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFsL3RvRG9zV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvcGFnZS9hY3Jvbnltcy1lbGVtZW50LnRzIiwic3JjL2NvbXBvbmVudHMvcGFnZS9jYWxjdWxhdGUudHMiLCJzcmMvY29tcG9uZW50cy9wYWdlL2NvbG9yQ29kZS50cyIsInNyYy9jb21wb25lbnRzL3BhZ2UvZG9tYWluTG9va3VwLnRzIiwic3JjL2NvbXBvbmVudHMvcGFnZS9leHBhbmRpbmdMaXN0RG9tV2lkZ2V0LnRzIiwic3JjL2NvbXBvbmVudHMvcGFnZS9ncm93aW5nQ2FyZC50cyIsInNyYy9jb21wb25lbnRzL3BhZ2UvaHNsQ29sb3IudHMiLCJzcmMvY29tcG9uZW50cy9wYWdlL3NsaWRlckJhci50cyIsInNyYy9qcy9saXQtYWxsLm1pbi5qcyIsInNyYy9tb2RlbHMvYWJickRlc2NyaXB0aW9uLnRzIiwic3JjL21vZGVscy9hcGkudHMiLCJzcmMvbW9kZWxzL2NsaWVudC50cyIsInNyYy9tb2RlbHMvY29sb3JDb2RlLnRzIiwic3JjL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoLnRzIiwic3JjL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoTWFya3VwLnRzIiwic3JjL21vZGVscy9leHBhbmRpbmdMaXN0LnRzIiwic3JjL21vZGVscy9ncm93aW5nQ2FyZC50cyIsInNyYy9tb2RlbHMvcHJvcGFnYXRpb25MYXRlbmN5Q2FsY3VsYXRpb24udHMiLCJzcmMvbW9kZWxzL3J3YkVycm9yQnVzLnRzIiwic3JjL21vZGVscy9yd2JKc29uQ29udmVydGVyLnRzIiwic3JjL21vZGVscy9zY3JpcHRQZXJmLnRzIiwic3Jj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SSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFDRCxNQUFNLENBQUM7SUFDTCxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFF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Q0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELENBQUMsQ0FBQyxDQUFDO1FBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUNILENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULENBQUMsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxDQUFDO1FBQ04sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUk7WUFDaEcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN4QixDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBQ0QsWUFBWSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQztRQUNOLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RyxDQUFDO0NBQ0Y7QUFDRCxNQUFNLENBQUM7SUFDTCxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxF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QUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRixDQUNGLEVBQ0QsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQzlDLEVBQUUsR0FBRyxFQUFFLENBQ0wsS0FBTSxTQUFRLEVBQUU7SUFDZCxZQUFZLENBQUM7UUFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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SUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRixDQUNGLEVBQ0QsRUFBRSxHQUFHLEVBQUUsRUFDUCxFQUFFLEdBQUcsRUFBRSxDQUNMLEtBQU0sU0FBUSxFQUFFO0lBQ2Q7UUFDRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULE9BQU8sQ0FBQyxF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LENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDNUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTt3QkFDZCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dC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R0FJRyxDQUFDLE1BQU0sRUFBRyxTQUFRLEVBQUU7Q0FBRztBQUMxQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDZixFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxFQUMvQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0FBcUtWLHVCQUFTO0FBcEtqQjs7OztHQUlHLENBQUMsTUFBTSxFQUFHLFNBQVEsRUFBRTtJQUNyQjtRQUNFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNULElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDVCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxH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R0FBSTtRQUNkLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ3RDO0lBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDMUU7SUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDLEVBQ0gsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDVixFQUFFLEdBQUcsRUFBRSxDQUFD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O2dCQUNyQiwyQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1IsdUNBQXVDO1lBQ3ZDLEtBQUssaUJBQWlCO2dCQUNwQiwwQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixNQUFNO1lBQ1IsZ0NBQWdDO1lBQ2hDLEtBQUssMEJBQTBCO2dCQUM3QixzQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixNQUFNO1lBQ1IsS0FBSyxvQkFBb0I7Z0JBQ3ZCLG1CQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07WUFDUiw4QkFBOEI7WUFDOUIsS0FBSyxpQkFBaUI7Z0JBQ3BCLGtCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU07WUFDUiw0Q0FBNEM7WUFDNUMsS0FBSyxxQkFBcUI7Z0JBQ3hCLG1CQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNULElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBRXJFLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLDBCQUFZLENBQUMsQ0FBQztRQUNyRCxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtJQUMzQyxDQUFDO0lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7Q0FDZixDQUFDO0FBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4vbW9kZWxzL3NjcmlwdFBlcmZcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9tb2RlbHMvcndiRXJyb3JCdXNcIjtcbmltcG9ydCBkaWN0aW9uYXJ5V2lkZ2V0IGZyb20gXCIuL2NvbXBvbmVudHMvZ2xvYmFsL2RpY3Rpb25hcnlXaWRnZXRcIjtcbmltcG9ydCB0b0Rvc1dpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL2dsb2JhbC90b0Rvc1dpZGdldFwiO1xuaW1wb3J0IG5vdEZvdW5kNDA0V2lkZ2V0IGZyb20gXCIuL2NvbXBvbmVudHMvZ2xvYmFsLzQwNFwiO1xuaW1wb3J0IEFiYnJPcGVuIGZyb20gXCIuL21vZGVscy9hYmJyRGVzY3JpcHRpb25cIjtcblxuY29uc3QgY2xhc3NDb21wb25lbnRzID0ge1xuICAvKipcbiAgICogQXR0cmlidXRlIHRhZ3Mgb24gbW9iaWxlIGRvIG5vdCBoYXZlIGhvdmVyIG9wdGlvbi4gVGhpcyBmdW5jdGlvbiBhZGRzIGEgY2xpY2tcbiAgICogIGFiaWxpdHkgdG8gZGVmaW5lIGFuIGFiYnIgdGFnLCB0aGFuIHJlbHkgb24gdGhlIHRpdGxlIGF0dHJpYnV0ZS5cbiAgICovXG4gIGFiYnJEZWZpbml0aW9uczogKCkgPT4ge1xuICAgIGNvbnN0IG1vYmlsZWFiYnJwZXJmID0gbmV3IFJ3YlBlcmYoXCJNb2JpbGVhYmJycGVyZlwiKTsgLy9zdGFydCBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAvKipHaXZlIGFsbCBhYmJyIGVsZW1lbnRzIG9wdGlvbiB0byBjbGljayB0byByZXZlYWwgdGhlIGV4cGFuZGVkIGRlc2NyaXB0aW9uLiAqL1xuICAgIGNvbnN0IGFsbGFiYnJldmlhdGlvbmVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFiYnJcIik7XG5cbiAgICBpZiAoYWxsYWJicmV2aWF0aW9uZWxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgYWJiciBvZiBhbGxhYmJyZXZpYXRpb25lbGVtcykge1xuICAgICAgICBsZXQgYWJicmV2ID0gbmV3IEFiYnJPcGVuKGFiYnIpO1xuICAgICAgICBhYmJyZXYucmV2ZWFsQWJickRlc2NyaXB0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbW9iaWxlYWJicnBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgZm91cm9oZm91cjogKCkgPT4ge1xuICAgIGlmICghUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIlBhZ2VDb21wb25lbnRzXCIsIFwiI0ZvdXItT2gtRm91clwiLCBmYWxzZSwgdHJ1ZSkpIHtcbiAgICAgIG5vdEZvdW5kNDA0V2lkZ2V0LmluaXQoKTtcbiAgICB9XG4gIH0sXG4gIGluaXQ6IChwYWdlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjbGFzc3BlcmYgPSBuZXcgUndiUGVyZihcIkNsYXNzY29tcG9uZW50c1wiKTsgLy9iZWdpbiBwZXJmb3JtYW5jZSBtZWFzdXJlXG5cbiAgICAvLyBBZGQgRGljdGlvbmFyeSBXaWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgaWYgKHBhZ2UgPT0gXCIvcGFnZXMvZGljdGlvbmFyeXdvcmQuaHRtbFwiIHx8IHBhZ2UgPT0gXCIvaW5kZXguaHRtbFwiIHx8IHBhZ2UgPT0gXCIvXCIgfHwgcGFnZSA9PSBcIlwiKSB7XG4gICAgICBpZiAoUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiLmRpY3Rpb25hcnlXaWRnZXRcIiwgdHJ1ZSwgdHJ1ZSkpIHJldHVybjtcbiAgICAgIGRpY3Rpb25hcnlXaWRnZXQuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBUb0RvcyB3aWRnZXQgaWYgYW4gZWxlbWVudCB3aXRoIHRoYXQgY2xhc3MgaXMgb24gYSBwYWdlXG4gICAgaWYgKHBhZ2UgPT0gXCIvcGFnZXMvdG9kb3MuaHRtbFwiIHx8IHBhZ2UgPT0gXCIvaW5kZXguaHRtbFwiIHx8IHBhZ2UgPT0gXCIvXCIgfHwgcGFnZSA9PSBcIlwiKSB7XG4gICAgICBpZiAoUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcIkNsYXNzQ29tcG9uZW50XCIsIFwiLlRvRG9MaXN0XCIsIHRydWUsIHRydWUpKSByZXR1cm47XG4gICAgICB0b0Rvc1dpZGdldC5pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFiYnIgZGVmaW5pdGlvbnNcbiAgICBjbGFzc0NvbXBvbmVudHMuYWJickRlZmluaXRpb25zKCk7XG5cbiAgICAvLyBBZGQgUldCIGxpbmtzIGRlZmluaXRpb25zOiBhcHBlbmRzIFwiLmh0bWxcIiB0byBhbmNob3IgaHJlZiB0ZXh0ICh3aGljaCBpcyBuYXRpdmVseSByZW1vdmVkIGluIE5ldGxpZnkpXG4gICAgY2xhc3NDb21wb25lbnRzLnJ3YkRhdGFUeXBlQW5jaG9yKCk7XG5cbiAgICBjbGFzc3BlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgcndiRGF0YVR5cGVBbmNob3I6ICgpID0+IHtcbiAgICBzd2l0Y2ggKGxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9jbGVhcmNvb2tpZXNxdWlja2x5Lmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rMFswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazFbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMVs3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazFbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxWzEwXS5ocmVmID0gXCIvZ3VpZGVzL2NsZWFyY29va2llc3F1aWNrbHkuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsyWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMls2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazJbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMlsxMF0uaHJlZiA9IFwiL2V4cGxvcmUvd2ViYnRlbGVzY29wZS5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsyWzExXS5ocmVmID0gXCIvcGFnZXMvZG9tLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmszID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazNbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9lbGVtZW50c3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzNdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbmV0d29ya3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzZdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rM1s3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazNbOV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jc3NvdmVydmlld3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmszWzEwXS5ocmVmID0gXCIvcGFnZXMvZG9tLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rNCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms0WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNFs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazRbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms0WzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiOlxuICAgICAgICBjb25zdCByd2JMaW5rNSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3Ykxpbms1WzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsxXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2NvbnNvbGV0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs0XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVs2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazVbN10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms1WzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNVsxMF0uaHJlZiA9IFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL3BlcmZvcm1hbmNldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rNlswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazZbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms2WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rNls5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwic3BhbltkYXRhLXJ3Yi10eXBlPWxpbmtdIGFcIlxuICAgICAgICApIGFzIE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICAgICAgICByd2JMaW5rN1swXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbMl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9zb3VyY2VzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzVdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbWVtb3J5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazdbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms3WzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s4XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2xpZ2h0aG91c2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rN1s5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9zZWN1cml0eXRhYi5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3YkxpbmsxMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJzcGFuW2RhdGEtcndiLXR5cGU9bGlua10gYVwiXG4gICAgICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MQW5jaG9yRWxlbWVudD47XG4gICAgICAgIHJ3YkxpbmsxMVswXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2VsZW1lbnRzdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY29uc29sZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVsyXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NvdXJjZXN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbM10uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzRdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvcGVyZm9ybWFuY2V0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbNV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9tZW1vcnl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTFbNl0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9hcHBsaWNhdGlvbnRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs3XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL3NlY3VyaXR5dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzhdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvbGlnaHRob3VzZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMVs5XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazExWzEwXS5ocmVmID0gXCIvZ3VpZGVzL2h0dHBzLmh0bWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEyWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMlszXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxMls2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEyWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTJbMTBdLmhyZWYgPSBcIi9wYWdlcy9oc2wuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvZ3VpZGVzL2RldnRvb2xzL2Nzc292ZXJ2aWV3dGFiLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEzWzBdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvZWxlbWVudHN0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbMV0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9jb25zb2xldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzJdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc291cmNlc3RhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1szXS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL25ldHdvcmt0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbNF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9wZXJmb3JtYW5jZXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s1XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL21lbW9yeXRhYi5odG1sXCI7XG4gICAgICAgIHJ3YkxpbmsxM1s2XS5ocmVmID0gXCIvZ3VpZGVzL2RldnRvb2xzL2FwcGxpY2F0aW9udGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzddLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvc2VjdXJpdHl0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbOF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9saWdodGhvdXNldGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazEzWzldLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvY3Nzb3ZlcnZpZXd0YWIuaHRtbFwiO1xuICAgICAgICByd2JMaW5rMTNbMTBdLmhyZWYgPSBcIi9wYWdlcy5odG1sXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9wYWdlcy9kYXRhc3RvcmFnZS5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazhbMF0uaHJlZiA9IFwiL3BhZ2VzL21hcmt1cC5odG1sXCI7XG4gICAgICAgIHJ3Ykxpbms4WzFdLmhyZWYgPSBcIi9ndWlkZXMvZGV2dG9vbHMvYXBwbGljYXRpb250YWIuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvaHRtbHJlc3BvbnNlcy5odG1sXCI6XG4gICAgICAgIGNvbnN0IHJ3Ykxpbms5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazlbMF0uaHJlZiA9IFwiL2d1aWRlcy9kZXZ0b29scy9uZXR3b3JrdGFiLmh0bWxcIjtcbiAgICAgICAgcndiTGluazlbMV0uaHJlZiA9IFwiL3BhZ2VzL3dlYmlkZXMuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvdXJsLmh0bWxcIjpcbiAgICAgICAgY29uc3QgcndiTGluazEwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcInNwYW5bZGF0YS1yd2ItdHlwZT1saW5rXSBhXCJcbiAgICAgICAgKSBhcyBOb2RlTGlzdE9mPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgICAgICAgcndiTGluazEwWzBdLmhyZWYgPSBcIi9wYWdlcy9kb21haW5sb29rdXAuaHRtbFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJObyBlbGVtZW50cyBvZiB0eXBlIGRhdGEtcndiLXR5cGU9bGluayBmb3VuZC5cIik7IC8vc2hvd24gd2l0aCB2ZXJib3NlIGxvZ2dpbmdcbiAgICB9XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3NDb21wb25lbnRzO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xuXG5jb25zdCBub3RGb3VuZDQwNFdpZGdldCA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBjbGllbnQ0MDQgPSBuZXcgY2xpZW50KCk7XG4gICAgbGV0IGNsaWVudFJlZmZlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsaWVudHJlZmVycmVyXCIpO1xuICAgIGxldCBjbGllbnRSdHRJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGllbnRydHRcIik7XG4gICAgbGV0IGNsaWVudFBsYXRmb3JtSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xpZW50cGxhdFwiKTtcblxuICAgIC8vRmlsbCBpbmZvcm1hdGlvbiBzZWNpb25cbiAgICBjbGllbnRSZWZmZXJJbmZvLnRleHRDb250ZW50ID0gY2xpZW50NDA0Lm9sZFVSTCA/IGNsaWVudDQwNC5vbGRVUkwgOiB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjbGllbnRSdHRJbmZvLnRleHRDb250ZW50ID0gYCR7XG4gICAgICBjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgPyBjbGllbnQ0MDQuY29ubmVjdGlvbnR5cGUgOiBcIk5vIGNvbm5lY3Rpb24gdHlwZSBmb3VuZC5cIlxuICAgIH1gO1xuICAgIGNsaWVudFJ0dEluZm8udGV4dENvbnRlbnQgKz0gYCwgcnR0IG9mICR7XG4gICAgICBjbGllbnQ0MDQuY29ubmVjdGlvbnJ0dCA/IGNsaWVudDQwNC5jb25uZWN0aW9ucnR0IDogXCJObyBydHQgZm91bmQuXCJcbiAgICB9YDtcbiAgICBjbGllbnRQbGF0Zm9ybUluZm8udGV4dENvbnRlbnQgPSBjbGllbnQ0MDQuYnJvd3NlcnBsYXRmb3JtXG4gICAgICA/IGNsaWVudDQwNC5icm93c2VycGxhdGZvcm1cbiAgICAgIDogXCJObyBwbGF0Zm9ybSBpbmZvcm1hdGlvbiBmb3VuZC5cIjtcbiAgICBjbGllbnRQbGF0Zm9ybUluZm8udGV4dENvbnRlbnQgKz0gYCwgJHtcbiAgICAgIGNsaWVudDQwNC51c2VyYWdlbnQgPyBjbGllbnQ0MDQudXNlcmFnZW50IDogXCJObyB1c2VyIGFnZW50IGluZm8uXCJcbiAgICB9YDtcblxuICAgIC8vUHJvdmlkZSBhIGxpbmsgdG8gZ28gYmFjayB3aGVyZSB5b3UgY2FtZSBmcm9tXG4gICAgbGV0IGdvYmFja2xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sZFVSTFwiKTtcbiAgICBpZiAoY2xpZW50NDA0Lm9sZFVSTC5pbmNsdWRlcyhcIjQwNC5odG1sXCIpKSB7XG4gICAgICBjbGllbnQ0MDQub2xkVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICB9XG4gICAgbGV0IGdvYmFja2hyZWYgPSBjbGllbnQ0MDQub2xkVVJMID8gY2xpZW50NDA0Lm9sZFVSTCA6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgZ29iYWNrbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAke2dvYmFja2hyZWZ9YCk7XG4gICAgZ29iYWNrbGluay5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBnb2JhY2tocmVmKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvdW5kNDA0V2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBEaWN0aW9uYXJ5U2VhcmNoIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWN0aW9uYXJ5U2VhcmNoXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0J3MgY3JlYXRpb24uXG4gKi9cbmNvbnN0IGRpY3Rpb25hcnlXaWRnZXQgPSB7XG4gIC8qKlxuICAgKiBUaGlzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGNyZWF0ZXMgYSBkaWN0aW9uYXJ5IHNlYXJjaCB3aWRnZXQgYnkgY2FsbGluZyB0aGVcbiAgICogIGNvbnN0cnVjdG9yLlxuICAgKiBAcGFyYW0gZWxlbSAtIEVsZW1lbnQgY29udGFpbmluZyAnZGljdGlvbmFyeVdpZGdldCcgY2xhc3NcbiAgICovXG4gIGluaXQ6ICgpID0+IHtcbiAgICBsZXQgZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudDogRWxlbWVudDtcbiAgICBkaWN0aW9uYXJ5V2lkZ2V0U3RhcnRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWN0aW9uYXJ5V2lkZ2V0XCIpO1xuXG4gICAgLy8gRGljdGlvbmFyeVNlYXJjaCBjb25zdHJ1Y3RvclxuICAgIE9iamVjdC5jcmVhdGUobmV3IERpY3Rpb25hcnlTZWFyY2goZGljdGlvbmFyeVdpZGdldFN0YXJ0aW5nRWxlbWVudCkpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGljdGlvbmFyeVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3RvRG9cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgY29udGFpbmluZyB0aGUgVG8tRG8gTGlzdCB3aWRnZXQncyBjcmVhdGlvbi5cbiAqL1xuY29uc3QgdG9Eb3NXaWRnZXQgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBUby1EbyBMaXN0IHdpZGdldC5cbiAgICogQHBhcmFtIGVsZW0gLSBFbGVtZW50IGNvbnRhaW5pbmcgJ1RvRG9MaXN0JyBjbGFzc1xuICAgKi9cbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCB0b0Rvc0VsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgdG9Eb3NFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Ub0RvTGlzdFwiKTtcblxuICAgIC8vVG9Eb0xpc3Qgb2JqZWN0XG4gICAgY29uc3QgdG9Eb1dpZGdldCA9IG5ldyBUb0RvTGlzdCgpO1xuXG4gICAgLy9DcmVhdGVzIHdpZGdldCBtYXJrdXAgYW5kIHBvcHVsYXRlcyBUby1EbyB0YXNrcyBjb250YWluZWQgaW4gTG9jYWwgU3RvcmFnZVxuICAgIHRvRG9XaWRnZXQuY3JlYXRlVG9Eb0xpc3RXaWRnZXQodG9Eb3NFbGVtZW50KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvRG9zV2lkZ2V0O1xuIiwiXCJzdHJpY3QgbW9kZVwiO1xuLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBMaXRFbGVtZW50LCBjc3MsIGh0bWwgfSBmcm9tIFwiLi4vLi4vanMvbGl0LWFsbC5taW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNyb255bXNFbGVtIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHRpdGxlOiBhbnkgPSB7fTtcbiAgaWQ6IGFueSA9IHt9O1xuICBhY3JvbnltczogYW55ID0gW107XG4gIC8vIERlZmluZSBzY29wZWQgc3R5bGVzIHJpZ2h0IHdpdGggeW91ciBjb21wb25lbnQsIGluIHBsYWluIENTU1xuICBzdGF0aWMgc3R5bGVzID0gY3NzYFxuICAgIC5hY3JvbnltTGlzdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgIGJvcmRlcjogMC41bW0gc29saWQgdmFyKC0tY2xyLWJsdWUpO1xuICAgICAgYm94LXNoYWRvdzogMC43cHggMHB4IDEuNHB4IHJnYmEoMCwgMCwgMCwgMC4zMDMpLCAxLjdweCAwcHggNC43cHggcmdiYSgwLCAwLCAwLCAwLjQ0NyksXG4gICAgICAgIC03cHggMHB4IDExcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICBwYWRkaW5nOiAwIDFlbSAxZW0gMWVtO1xuICAgICAgbWFyZ2luOiAyZW07XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcHJpbWFyeS00MDApO1xuICAgICAgY29sb3I6IHZhcigtLWNsci1hbGwtcHJpbWFyeS05MDApO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3Q6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXByaW1hcnktNTAwKTtcbiAgICB9XG4gICAgLmFjcm9ueW1MaXN0IHVsIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBmb250LWZhbWlseTogQXJpZWwsIHNhbnMtc2VyaWY7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3QgbGkge1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIH1cbiAgICAuYWNyb255bUxpc3QgaDMge1xuICAgICAgY29sb3I6IHZhcigtLWNsci1wcmltYXJ5LTUwMCk7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgICAgIGZvbnQtc2l6ZTogMS4yZW07XG4gICAgfVxuICAgIC5hY3JvbnltTGlzdCB1bCB7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDMyMHB4KSB7XG4gICAgICAuYWNyb255bUxpc3QgdWwge1xuICAgICAgICBwYWRkaW5nOiAwZW0gMWVtO1xuICAgICAgfVxuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDUwMXB4KSB7XG4gICAgICAuYWNyb255bUxpc3QgdWwge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICB9XG4gICAgICAuYWNyb255bUxpc3QgaDMge1xuICAgICAgICBjb2xvcjogdmFyKC0tY2xyLWFsbC1wcmltYXJ5LTkwMCk7XG4gICAgICAgIGZvbnQtc2l6ZTogMS40ZW07XG4gICAgICB9XG4gICAgfVxuICBgO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBQYWdlQWNyb255bXMgPSBbXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL3dpZmkuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwid2lmaVwiLFxuICAgICAgICBhY3JvbnltczogW1xuICAgICAgICAgIFwiU1NJRFwiLFxuICAgICAgICAgIFwiODAyLjExYVwiLFxuICAgICAgICAgIFwiODAyLjExYlwiLFxuICAgICAgICAgIFwiODAyLjExZ1wiLFxuICAgICAgICAgIFwiODAyLjExblwiLFxuICAgICAgICAgIFwiODAyLjExYWNcIixcbiAgICAgICAgICBcIjgwMi4xMWF4XCIsXG4gICAgICAgICAgXCJXTEFOXCIsXG4gICAgICAgICAgXCJJUHY0XCIsXG4gICAgICAgICAgXCJJUHY2XCIsXG4gICAgICAgICAgXCJNQUNcIixcbiAgICAgICAgICBcIkFQXCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9uZXR3b3Jrc3BlZWQuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwibmV0d29ya3NwZWVkXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJQaW5nXCIsIFwiTklDXCIsIFwiQlBTXCIsIFwiTUJQU1wiLCBcIkdCUFNcIiwgXCJCaXRcIiwgXCJCeXRlXCIsIFwiSVNQXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvbWFya3VwLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcIm1hcmt1cFwiLFxuICAgICAgICBhY3JvbnltczogW1wiYm9keVwiLCBcImhlYWRcIiwgXCJkaXZcIiwgXCJocmVmXCIsIFwibGFuZ1wiLCBcInVsXCIsIFwib2xcIl0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9pcGFkZHJlc3MuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiaXBhZGRyZXNzXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXG4gICAgICAgICAgXCJJUFY0XCIsXG4gICAgICAgICAgXCJJUFY2XCIsXG4gICAgICAgICAgXCJUQ1AvSVBcIixcbiAgICAgICAgICBcIk9TSVwiLFxuICAgICAgICAgIFwiREhDUFwiLFxuICAgICAgICAgIFwiRE5TXCIsXG4gICAgICAgICAgXCJTdWJuZXQgTWFza1wiLFxuICAgICAgICAgIFwiQ0lEUlwiLFxuICAgICAgICAgIFwiTEFOXCIsXG4gICAgICAgICAgXCJOQVRcIixcbiAgICAgICAgICBcIk1BQ1wiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvZ3VpZGVzL2h0dHBzLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImh0dHBzXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXG4gICAgICAgICAgXCJLTVNcIixcbiAgICAgICAgICBcIlBLSVwiLFxuICAgICAgICAgIFwiUlNBXCIsXG4gICAgICAgICAgXCJTU0xcIixcbiAgICAgICAgICBcIlRMU1wiLFxuICAgICAgICAgIFwiU0hBXCIsXG4gICAgICAgICAgXCJBRVNcIixcbiAgICAgICAgICBcIkVGU1wiLFxuICAgICAgICAgIFwiVFBNXCIsXG4gICAgICAgICAgXCJCaXRMb2NrZXJcIixcbiAgICAgICAgICBcIkVuY3J5cHRcIixcbiAgICAgICAgICBcIkRlY3J5cHRcIixcbiAgICAgICAgICBcIlNpZ25hdHVyZVwiLFxuICAgICAgICAgIFwiRWxsaXB0aWMgQ3VydmVcIixcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2h0bWxyZXNwb25zZXMuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiaHRtbHJlc3BvbnNlc1wiLFxuICAgICAgICBhY3JvbnltczogW1xuICAgICAgICAgIFwiSFRUUFwiLFxuICAgICAgICAgIFwiSFRUUFNcIixcbiAgICAgICAgICBcIlRDUFwiLFxuICAgICAgICAgIFwiVURQXCIsXG4gICAgICAgICAgXCJET01cIixcbiAgICAgICAgICBcIkFzc2V0XCIsXG4gICAgICAgICAgXCJGcmFtZVwiLFxuICAgICAgICAgIFwiQXV0aFwiLFxuICAgICAgICAgIFwiVHJhbnNwb3J0XCIsXG4gICAgICAgICAgXCJSZXNwb25zZVwiLFxuICAgICAgICAgIFwiVmVyYlwiLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvZG9tYWlubG9va3VwLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImRvbWFpbmxvb2t1cFwiLFxuICAgICAgICBhY3JvbnltczogW1xuICAgICAgICAgIFwiRE5TXCIsXG4gICAgICAgICAgXCJETlNTRUNcIixcbiAgICAgICAgICBcIkRETlNcIixcbiAgICAgICAgICBcIkZRRE5cIixcbiAgICAgICAgICBcIk5ldEJJT1NcIixcbiAgICAgICAgICBcIk5hbWVzZXJ2ZXJcIixcbiAgICAgICAgICBcIk9VXCIsXG4gICAgICAgICAgXCJUb3AtbGV2ZWxcIixcbiAgICAgICAgICAnXCJBXCIgcmVjb3JkJyxcbiAgICAgICAgICBcIkNOQU1FXCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9kcml2ZXMuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiZHJpdmVzXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXG4gICAgICAgICAgXCJDU09NXCIsXG4gICAgICAgICAgXCJTU09NXCIsXG4gICAgICAgICAgXCJQU1wiLFxuICAgICAgICAgIFwiTlMgKG5hbWVzcGFjZSlcIixcbiAgICAgICAgICBcIlRyZWVcIixcbiAgICAgICAgICBcIk9iamVjdHNcIixcbiAgICAgICAgICBcIlJlZ2lzdHJ5XCIsXG4gICAgICAgICAgXCJWYXJpYWJsZXNcIixcbiAgICAgICAgICBcIlRDUC9JUFwiLFxuICAgICAgICAgIFwiVExTXCIsXG4gICAgICAgICAgXCJDeXBoZXJ0ZXh0XCIsXG4gICAgICAgICAgXCJDTlwiLFxuICAgICAgICAgIFwiRUtVXCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9kbnMuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiZG5zXCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJERE5TXCIsIFwiRE5TU0VDXCIsICdcIkFcIiByZWNvcmQnLCBcIkNBQVwiLCBcIk5TIChuYW1lIHNlcnZlcilcIiwgJ1wiTVhcIiByZWNvcmQnLCBcIlFQU1wiXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2RvbS5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJkb21cIixcbiAgICAgICAgYWNyb255bXM6IFtcbiAgICAgICAgICBcIkRPTVwiLFxuICAgICAgICAgIFwiQ1NTXCIsXG4gICAgICAgICAgXCJIVE1MXCIsXG4gICAgICAgICAgXCJhc3NldFwiLFxuICAgICAgICAgIFwicHJvcGVydHlcIixcbiAgICAgICAgICBcImF0dHJpYnV0ZVwiLFxuICAgICAgICAgIFwidmFyaWFibGVcIixcbiAgICAgICAgICBcInJlZmVyZW5jZVwiLFxuICAgICAgICAgIFwiZnVuY3Rpb25cIixcbiAgICAgICAgICBcInJvb3RcIixcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL3N2Zy5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJzdmdcIixcbiAgICAgICAgYWNyb255bXM6IFtcIlhNTFwiLCBcIlhIVE1MXCIsIFwiUkRGXCIsIFwiSVNPXCIsIFwiRENNRVNcIiwgXCJDQyBMaWNlbnNlXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZTogXCIvcGFnZXMvamF2YXNjcmlwdC5odG1sXCIsXG4gICAgICAgIGh0bWxUaXRsZTogXCJqYXZhc2NyaXB0XCIsXG4gICAgICAgIGFjcm9ueW1zOiBbXCJEZWZlclwiLCBcIlN5bmNocm9ub3VzXCIsIFwiRVNcIiwgXCJHVUlcIiwgXCJKU09OXCIsIFwiQUpBWFwiLCBcIklJRkVcIiwgXCJJREVcIiwgXCJET01cIl0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlOiBcIi9wYWdlcy9odHRwLmh0bWxcIixcbiAgICAgICAgaHRtbFRpdGxlOiBcImphdmFzY3JpcHRcIixcbiAgICAgICAgYWNyb255bXM6IFtcIkhUVFBcIiwgXCJUQ1BcIiwgXCJVRFBcIiwgXCJETlNcIiwgXCJUTFNcIiwgXCJJUFwiLCBcIkhUTUxcIiwgXCJDU1NcIiwgXCJKU1wiLCBcIkFQSVwiXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2U6IFwiL3BhZ2VzL2xhdGVuY3kuaHRtbFwiLFxuICAgICAgICBodG1sVGl0bGU6IFwiamF2YXNjcmlwdFwiLFxuICAgICAgICBhY3JvbnltczogW1wiQ01TXCIsIFwiVENQXCIsIFwiVExTXCIsIFwiSVBcIiwgXCJQUyAocGFja2V0IHN3aXRjaGluZylcIiwgXCJETlNcIl0sXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBjb25zdCBjdXJyZW50UGFnZSA9IFBhZ2VBY3Jvbnltcy5maWx0ZXIocGFnZSA9PiBwYWdlLnBhZ2UgPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgLy8gRGVjbGFyZSByZWFjdGl2ZSBwcm9wZXJ0aWVzXG4gICAgdGhpcy50aXRsZSA9IFwiQ29tbW9uIEFjcm9ueW1zXCI7XG4gICAgdGhpcy5pZCA9IGN1cnJlbnRQYWdlWzBdLmh0bWxUaXRsZTtcbiAgICB0aGlzLmFjcm9ueW1zID0gY3VycmVudFBhZ2VbMF0uYWNyb255bXM7XG4gIH1cbiAgYnVpbGRMaXN0KCkge31cblxuICAvLyBSZW5kZXIgdGhlIFVJIGFzIGEgZnVuY3Rpb24gb2YgY29tcG9uZW50IHN0YXRlXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbGlzdGl0ZW1zID0gW107XG4gICAgZm9yIChjb25zdCBhY3JvbnltcyBvZiB0aGlzLmFjcm9ueW1zKSB7XG4gICAgICBsaXN0aXRlbXMucHVzaChodG1sYDxsaT4ke2Fjcm9ueW1zfTwvbGk+YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxgIDxhc2lkZSBjbGFzcz1cImFjcm9ueW1MaXN0XCI+XG4gICAgICA8aDM+JHt0aGlzLnRpdGxlfTo8L2gzPlxuICAgICAgPHVsIGlkPVwiYWNyLSR7dGhpcy5pZH1cIj5cbiAgICAgICAgJHtsaXN0aXRlbXN9XG4gICAgICA8L3VsPlxuICAgIDwvYXNpZGU+YDtcbiAgfVxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgUndiRXJyb3IgZnJvbSBcIi4uLy4uL21vZGVscy9yd2JFcnJvckJ1c1wiO1xuaW1wb3J0IHsgUHJvcGFnYXRpb25MYXRlbmN5Q2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3Byb3BhZ2F0aW9uTGF0ZW5jeUNhbGN1bGF0aW9uXCI7XG5cbi8qKlxuICogUHJvcGFnYXRpb24gTGF0ZW5jeSBjb21wb25lbnQuXG4gKi9cbmNvbnN0IGxhdGVuY3lDYWxjdWxhdG9yID0ge1xuICBpbml0OiAoKSA9PiB7XG4gICAgbGV0IGRpc3RhbmNlRWxlbTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgbWVkaXVtU3BlZWRFbGVtOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxldCBwYWNrZXRTaXplRWxlbTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgdHJhbnNtaXNzaW9uUmF0ZUVsZW06IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgbGV0IHJlc2V0RWxlbTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgY2FsY3VsYXRlRWxlbTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgZXhhbXBsZUVsZW0xOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBsZXQgZXhhbXBsZUVsZW0yOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBsZXQgZXhhbXBsZUVsZW0zOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIGlmIChcbiAgICAgIFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJsYXRlbmN5Q2FsY3VsYXRvclwiLCBcIiNkaXN0YW5jZVwiLCB0cnVlLCBmYWxzZSkgfHxcbiAgICAgIFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJsYXRlbmN5Q2FsY3VsYXRvclwiLCBcIiNtZWRpdW1TcGVlZFwiLCB0cnVlLCBmYWxzZSkgfHxcbiAgICAgIFJ3YkVycm9yLmNoZWNrRWxlbWVudGZvck51bGwoXCJsYXRlbmN5Q2FsY3VsYXRvclwiLCBcIiNwYWNrZXRTaXplXCIsIHRydWUsIGZhbHNlKSB8fFxuICAgICAgUndiRXJyb3IuY2hlY2tFbGVtZW50Zm9yTnVsbChcImxhdGVuY3lDYWxjdWxhdG9yXCIsIFwiI3RyYW5zbWlzc2lvblJhdGVcIiwgdHJ1ZSwgZmFsc2UpIHx8XG4gICAgICBSd2JFcnJvci5jaGVja0VsZW1lbnRmb3JOdWxsKFwibGF0ZW5jeUNhbGN1bGF0b3JcIiwgXCIjcmVzZXRcIiwgdHJ1ZSwgZmFsc2UpIHx8XG4gICAgICBSd2JFcnJvci5jaGVja0VsZW1lbnRmb3JOdWxsKFwibGF0ZW5jeUNhbGN1bGF0b3JcIiwgXCIjY2FsY3VsYXRlXCIsIHRydWUsIGZhbHNlKVxuICAgIClcbiAgICAgIGNvbnNvbGUubG9nKGAlY0NoZWNrIG1pc3NpbmcgZWxlbWVudHMgYXQgL3BhZ2VzL2xhdGVuY3kuaHRtbGAsIFwiY29sb3I6b3JhbmdlO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuXG4gICAgZGlzdGFuY2VFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaXN0YW5jZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIG1lZGl1bVNwZWVkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVkaXVtU3BlZWRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBwYWNrZXRTaXplRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFja2V0U2l6ZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRyYW5zbWlzc2lvblJhdGVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc21pc3Npb25SYXRlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcmVzZXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNldFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNhbGN1bGF0ZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbGN1bGF0ZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGV4YW1wbGVFbGVtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhhbXBsZTFcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZXhhbXBsZUVsZW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGFtcGxlMlwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBleGFtcGxlRWxlbTMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4YW1wbGUzXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgY2FsY3VsYXRlRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChkaXN0YW5jZUVsZW0udmFsdWUgPT0gbnVsbCB8fCBtZWRpdW1TcGVlZEVsZW0udmFsdWUgPT0gbnVsbCkgcmV0dXJuOyAvL1RPRE86IGhhbmRsZSBudWxsIGVsZW1lbnRzIGFsZXJ0c1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcHJvcGNhbGNyZXMgcFwiKSkge1xuICAgICAgICBsZXQgcmVzdWx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvcGNhbGNyZXNcIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGxldCBhbGx0b2RlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcHJvcGNhbGNyZXMgcFwiKTtcbiAgICAgICAgZm9yIChsZXQgbiBvZiBhbGx0b2RlbGV0ZSkge1xuICAgICAgICAgIHJlc3VsdGVsZW0ucmVtb3ZlQ2hpbGQobik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRhdGVOdW1iZXJJbnB1dCA9IChzdHI6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBUYWtlIHVzZXIgaW5wdXQgYW5kIGZpbHRlciB0byBhbiBhY2NlcHRlZCBzdHJpbmdcbiAgICAgICAgdmFyIHJlZ1NUUjogYW55O1xuICAgICAgICBsZXQgbnVtc3RyID0gc3RyLnNwbGl0KFwiLFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBQcm9wYWdhdGlvbkxhdGVuY3lDYWxjdWxhdGlvbi5udW1iZXJWYWxpZGF0aW9uKG51bXN0cilcbiAgICAgICAgICA/IChyZWdTVFIgPSBOdW1iZXIobnVtc3RyKSlcbiAgICAgICAgICA6IChyZWdTVFIgPSBcIklOVkFMSURcIik7XG4gICAgICAgIHJldHVybiByZWdTVFI7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZGlzdGFuY2UgPSB2YWxpZGF0ZU51bWJlcklucHV0KGRpc3RhbmNlRWxlbS52YWx1ZSk7XG4gICAgICBpZiAoZGlzdGFuY2UgPT0gXCJJTlZBTElEXCIpIHtcbiAgICAgICAgLy9UT0RPOiBmb3Igbm93LCByZXR1cm4uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtZWRpdW1TcGVlZCA9IHZhbGlkYXRlTnVtYmVySW5wdXQobWVkaXVtU3BlZWRFbGVtLnZhbHVlKTtcbiAgICAgIGlmIChtZWRpdW1TcGVlZCA9PSBcIklOVkFMSURcIikge1xuICAgICAgICAvL1RPRE86IGZvciBub3csIHJldHVybi5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChtZWRpdW1TcGVlZCA+IDMwMDAwMCkge1xuICAgICAgICAvL1RPRE86IGZvciBub3csIHJldHVybi5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHBhY2tldFNpemUgPSB2YWxpZGF0ZU51bWJlcklucHV0KHBhY2tldFNpemVFbGVtLnZhbHVlKTtcbiAgICAgIGlmIChwYWNrZXRTaXplID09IFwiSU5WQUxJRFwiKSB7XG4gICAgICAgIC8vVE9ETzogZm9yIG5vdywgcmV0dXJuLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdHJhbnNtaXNzaW9uUmF0ZSA9IHZhbGlkYXRlTnVtYmVySW5wdXQodHJhbnNtaXNzaW9uUmF0ZUVsZW0udmFsdWUpO1xuICAgICAgaWYgKHRyYW5zbWlzc2lvblJhdGUgPT0gXCJJTlZBTElEXCIpIHtcbiAgICAgICAgLy9UT0RPOiBmb3Igbm93LCByZXR1cm4uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGNhbGN1bGF0aW9uID0gT2JqZWN0LmNyZWF0ZShcbiAgICAgICAgbmV3IFByb3BhZ2F0aW9uTGF0ZW5jeUNhbGN1bGF0aW9uKGRpc3RhbmNlLCBtZWRpdW1TcGVlZCwgcGFja2V0U2l6ZSwgdHJhbnNtaXNzaW9uUmF0ZSlcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhgQW5zd2VyIGZvdW5kOiAke2NhbGN1bGF0aW9uLnByb3BhZ2F0aW9uRGVsYXl9YCk7XG5cbiAgICAgIGxhdGVuY3lDYWxjdWxhdG9yLnJlc3VsdG1hcmt1cChjYWxjdWxhdGlvbik7XG4gICAgfSk7XG4gICAgcmVzZXRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBsZXQgcmVzdWx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvcGNhbGNyZXNcIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICBpZiAocmVzdWx0ZWxlbSAhPSBudWxsKSB7XG4gICAgICAgIGxldCBhbGx0b2RlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcHJvcGNhbGNyZXMgcFwiKTtcbiAgICAgICAgZm9yIChsZXQgbiBvZiBhbGx0b2RlbGV0ZSkge1xuICAgICAgICAgIHJlc3VsdGVsZW0ucmVtb3ZlQ2hpbGQobik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBleGFtcGxlRWxlbTEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkaXN0YW5jZUVsZW0udmFsdWUgPSBcIjMwMFwiO1xuICAgICAgbWVkaXVtU3BlZWRFbGVtLnZhbHVlID0gXCIzMDAsMDAwXCI7XG4gICAgICBwYWNrZXRTaXplRWxlbS52YWx1ZSA9IFwiMTUwMFwiO1xuICAgICAgdHJhbnNtaXNzaW9uUmF0ZUVsZW0udmFsdWUgPSBcIjEsMDAwLDAwMFwiO1xuICAgIH0pO1xuICAgIGV4YW1wbGVFbGVtMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRpc3RhbmNlRWxlbS52YWx1ZSA9IFwiMTUwLDAwMCwwMDBcIjtcbiAgICAgIG1lZGl1bVNwZWVkRWxlbS52YWx1ZSA9IFwiMzAwLDAwMFwiO1xuICAgICAgcGFja2V0U2l6ZUVsZW0udmFsdWUgPSBcIjQ1MDBcIjtcbiAgICAgIHRyYW5zbWlzc2lvblJhdGVFbGVtLnZhbHVlID0gXCIxMDAsMDAwXCI7XG4gICAgfSk7XG4gICAgZXhhbXBsZUVsZW0zLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZGlzdGFuY2VFbGVtLnZhbHVlID0gXCI0MCwwMDBcIjtcbiAgICAgIG1lZGl1bVNwZWVkRWxlbS52YWx1ZSA9IFwiMzAwLDAwMFwiO1xuICAgICAgcGFja2V0U2l6ZUVsZW0udmFsdWUgPSBcIjE1MDBcIjtcbiAgICAgIHRyYW5zbWlzc2lvblJhdGVFbGVtLnZhbHVlID0gXCI1NiwwMDBcIjtcbiAgICB9KTtcbiAgfSxcbiAgcmVzdWx0bWFya3VwOiAocmVzdWx0OiBQcm9wYWdhdGlvbkxhdGVuY3lDYWxjdWxhdGlvbikgPT4ge1xuICAgIGxldCByZXN1bHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9wY2FsY3Jlc1wiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBsZXQgbmV3UmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbmV3UmVzdWx0LmlubmVySFRNTCA9IGBcbiAgICAgIFByb3BhZ2F0aW9uIERlbGF5OiA8c3Bhbj4ke3Jlc3VsdC5nZXRQcm9wYWdhdGlvbkRlbGF5KCkudG9GaXhlZCg0KX0gczwvc3Bhbj48YnIgLz5cbiAgICAgIFNlcmlhbGl6YXRpb24gRGVsYXk6IDxzcGFuPiR7cmVzdWx0LmdldFNlcmlhbGl6YXRpb25EZWxheSgpLnRvRml4ZWQoNCl9IHM8L3NwYW4+PGJyIC8+XG4gICAgICBOZXR3b3JrIExhdGVuY3k6IDxzcGFuPiR7cmVzdWx0LmdldE5ldHdvcmtMYXRlbmN5KCkudG9GaXhlZCg0KX0gczwvc3Bhbj48YnI+XG4gICAgYDtcblxuICAgIHJlc3VsdGVsZW0uYXBwZW5kQ2hpbGQobmV3UmVzdWx0KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhdGVuY3lDYWxjdWxhdG9yO1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBDb2xvckNvZGVXaWRnZXQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbG9yQ29kZVwiO1xuXG5jb25zdCBodG1sZXhDb2xvckNvZGUgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICAvLyBHZXQgY29tcG9uZW50IGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB1c2VkIGluIHdpZGdldCBpbnRlcmFjdGl2aXR5XG4gICAgY29uc3Qgb3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuVGFnb3BlblwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdCBjbG9zZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5UYWdjbG9zZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdCB2YWx1ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlRleHRWYWxcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQXR0cmlidXRlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICBjb25zdCBjb2xvcmxlc3NFbGVtZW50cyA9IG5ldyBBcnJheShvcGVuZXJzLCBjbG9zZXJzLCB2YWx1ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGNvbnN0IGVsZW1lbnRzQ29sb3JzID0gbmV3IEFycmF5KFxuICAgICAgXCJ2YXIoLS1jbHItV2hvSVNfT3JhbmdlKVwiLFxuICAgICAgXCJ2YXIoLS1jbHItUmVkKVwiLFxuICAgICAgXCJ2YXIoLS1jbHItRGFya0N5YW4pXCIsXG4gICAgICBcInZhcigtLWNsci1HcmVlbilcIlxuICAgICk7XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgIG5ldyBDb2xvckNvZGVXaWRnZXQoY29sb3JsZXNzRWxlbWVudHMsIGVsZW1lbnRzQ29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTtcbiAgfSxcbn07XG5cbmNvbnN0IHVybGV4Q29sb3JDb2RlID0ge1xuICBpbml0OiAoKSA9PiB7XG4gICAgY29uc3QgcHJvdG9jb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb3RvY29sXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgIGNvbnN0IGRvbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZG9tYWluXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcnRcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3QgZm9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb2xkZXJcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3QgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVlcnlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5rZXlcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZhbHVlXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuXG4gICAgLy8gQWRkIGVsZW1lbnRzIHRvIGFycmF5IGRhdGEgc3RydWN0dXJlcywgbmVlZGVkIGZvciB0aGUgQ29sb3JDb2RlIGluc3RhbnRpYXRpb25cbiAgICBjb25zdCBjb2xvcmxlc3NFbGVtZW50cyA9IG5ldyBBcnJheShwcm90b2NvbCwgZG9tYWluLCBwb3J0LCBmb2xkZXIsIGZpbGUsIHF1ZXJ5LCBrZXksIHZhbHVlKTtcbiAgICBjb25zdCBlbGVtZW50c0NvbG9ycyA9IG5ldyBBcnJheShcbiAgICAgIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIixcbiAgICAgIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsXG4gICAgICBcInZhcigtLWNsci1EYXJrQ3lhbilcIixcbiAgICAgIFwidmFyKC0tY2xyLUdyZWVuKVwiLFxuICAgICAgXCJ2YXIoLS1jbHItUmVkKVwiLFxuICAgICAgXCJ2YXIoLS1jbHItcHJpbWFyeS02MDApXCIsXG4gICAgICBcInZhcigtLWNsci1hbGwtcHJpbWFyeS01MDApXCIsXG4gICAgICBcInZhcigtLWNsci1MaWdodGNvcmFsKVwiXG4gICAgKTtcblxuICAgIC8vIEluc3RhbnRpYXRlIGEgY29sb3IgY29kZSBvYmplY3Qgd2l0aCBhbGwgbmVlZGVkIGVsZW1lbnRzXG4gICAgbmV3IENvbG9yQ29kZVdpZGdldChjb2xvcmxlc3NFbGVtZW50cywgZWxlbWVudHNDb2xvcnMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikpO1xuICB9LFxufTtcblxuY29uc3QgY3NzZXhDb2xvckNvZGUgPSB7XG4gIC8qKlxuICAgKiBDc3NleCBpcyBhIHBhZ2Ugd2lkZ2V0LCBhcHBseWluZyBzdHlsZSBjb2xvcnMgdG8gZWxlbWVudHMgb2YgZGlmZmVyZW50XG4gICAqIHR5cGVzXG4gICAqL1xuICBpbml0OiAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5TZWxlY3RvclwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BdHRyaWJ1dGVcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgY29uc3QgdmFsdWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5WYWx1ZVwiKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcbiAgICBjb25zdCBwc3VlZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5Qc3VlZG8tY2xhc3NcIikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG5cbiAgICAvLyBBZGQgZWxlbWVudHMgdG8gYXJyYXkgZGF0YSBzdHJ1Y3R1cmVzLCBuZWVkZWQgZm9yIHRoZSBDb2xvckNvZGUgaW5zdGFudGlhdGlvblxuICAgIGNvbnN0IGNvbG9ybGVzc0VsZW1lbnRzID0gbmV3IEFycmF5KHNlbGVjdG9ycywgYXR0cmlidXRlcywgdmFsdWVzLCBwc3VlZG9zKTtcbiAgICBjb25zdCBlbGVtZW50c0NvbG9ycyA9IG5ldyBBcnJheShcbiAgICAgIFwidmFyKC0tY2xyLVJlZClcIixcbiAgICAgIFwidmFyKC0tY2xyLVdob0lTX09yYW5nZSlcIixcbiAgICAgIFwidmFyKC0tY2xyLVNreWJsdWUpXCIsXG4gICAgICBcInZhcigtLWNsci1HcmVlbilcIlxuICAgICk7XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBhIGNvbG9yIGNvZGUgb2JqZWN0IHdpdGggYWxsIG5lZWRlZCBlbGVtZW50c1xuICAgIG5ldyBDb2xvckNvZGVXaWRnZXQoY29sb3JsZXNzRWxlbWVudHMsIGVsZW1lbnRzQ29sb3JzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpKTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7IGh0bWxleENvbG9yQ29kZSwgdXJsZXhDb2xvckNvZGUsIGNzc2V4Q29sb3JDb2RlfTtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgUndiUmVmZXJlbmNlRXJyb3IgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3J3YkVycm9yQnVzXCI7XG5cbmNvbnN0IGRvbWFpbkxvb2t1cCA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIC8vIEdldCB0aGUgZm9ybSwgYXNzaWduIHRvIGEgdmFyaWFibGVcbiAgICBsZXQgZm9ybUVsZW1DbGFzc05hbWUgPSBcInNlYXJjaFdob0lTXCI7XG4gICAgbGV0IGZvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgICBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Zm9ybUVsZW1DbGFzc05hbWV9YCkgYXMgSFRNTEZvcm1FbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICBuZXcgUndiUmVmZXJlbmNlRXJyb3IoXCJFbGVtZW50Tm90Rm91bmRcIiwgYEVsZW1lbnQgbm90IGZvdW5kOiAnJHtmb3JtRWxlbUNsYXNzTmFtZX0nOmApO1xuICAgIH1cbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZG9tYWluTG9va3VwLnNlYXJjaFdIT0lTKTtcbiAgfSxcbiAgc2VhcmNoV0hPSVM6ICgpID0+IHtcbiAgICBsZXQgaW5wdXRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRTZWFyY2hcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgdmFsdWUgPSBpbnB1dEVsZW0udmFsdWU7XG4gICAgdmFyIFVSTCA9IFwiaHR0cHM6Ly93d3cud2hvaXMuY29tL3dob2lzL1wiICsgdmFsdWU7XG4gICAgd2luZG93Lm9wZW4oVVJMLCBcIl9ibGFua1wiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb21haW5Mb29rdXA7XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IEV4cGFuZGluZ0xpc3RFbGVtZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9leHBhbmRpbmdMaXN0XCI7XG5cbmNvbnN0IGV4cGFuZGluZ0xpc3RET01XaWRnZXQgPSB7XG4gIGluaXQ6ICgpID0+IHtcbiAgICAvLyBEZWZpbmUgdGhlIGV4cGFuZGluZyBsaXN0IGVsZW1lbnQsIGZvciB1c2Ugd2l0aGluIHRoZSBwYWdlXG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZXhwYW5kaW5nLWxpc3RcIiwgRXhwYW5kaW5nTGlzdEVsZW1lbnQsIHtcbiAgICAgIGV4dGVuZHM6IFwidWxcIixcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBleHBhbmRpbmcgbGlzdCBlbGVtZW50IHByb3BlcnRpZXNcbiAgICAvLyBcIkRPTVwiIHBhZ2Ugc3BlY2lmaWMgcHJvcGVydGllc1xuICAgIC8vIEFkZCBhIHRpdGxlIGF0dHJpYnV0ZSB0byBhbGwgbGktc3BhbiB0aGF0IGNhbiBleHBhbmQgZnVydGhlclxuICAgIGNvbnN0IGV4cGFuZGFibGVMaU9wZW5PcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOmZpcnN0LWNoaWxkYCk7XG4gICAgY29uc3QgZXhwYW5kYWJsZUxpQ2xvc2VTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgdWxbaXM9XCJleHBhbmRpbmctbGlzdFwiXSBsaSBzcGFuOm50aC1jaGlsZCgzKWApO1xuXG4gICAgLy8gU2V0IGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlcyBmb3IgZXhwYW5kaW5nLWVsZW1lbnQgZXhwYW5kYWJsZSBlbGVtZW50c1xuICAgIGZvciAobGV0IHNwYW4gb2YgZXhwYW5kYWJsZUxpT3Blbk9wZW4pIHtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJTZWxlY3QgdG8gZXhwYW5kLi4uXCIpO1xuICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgICAvLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgJ0RPTScgaXRlbXMgZWxlbWVudHNcbiAgICAgIC8vIC0tLT53aGVuIGNsaWNrZWQsIGNoYW5nZSB0aGUgdGl0bGUgcHJvcGVydHkgdG8gcmVmbGVjdCBvcGVuIG9yIGNsb3NlZCBzdGF0dXNcbiAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNwYW4uZ2V0QXR0cmlidXRlKFwidGl0bGVcIikgPT0gXCJTZWxlY3QgdG8gZXhwYW5kLi4uXCJcbiAgICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJTZWxlY3QgdG8gY2xvc2UuLi5cIik7XG4gICAgICAgICAgICAgIGlmIChzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICBzcGFuLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwidGl0bGVcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGNsb3NlLlwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpXG4gICAgICAgICAgOiAoKCkgPT4ge1xuICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiU2VsZWN0IHRvIGV4cGFuZC4uLlwiKTtcbiAgICAgICAgICAgICAgaWYgKHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZyA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgIHNwYW4ubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiLFxuICAgICAgICAgICAgICAgIFwiU2VsZWN0IG9wZW5pbmcgZWxlbWVudCB0YWcgdG8gZXhwYW5kLlwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFNldCBwcm9wZXJ0eSBvZiBjbG9zaW5nIHNwYW4gZWxlbWVudHNcbiAgICBmb3IgKGxldCBzcGFuIG9mIGV4cGFuZGFibGVMaUNsb3NlU3Bhbikge1xuICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIlNlbGVjdCBvcGVuaW5nIGVsZW1lbnQgdGFnIHRvIGV4cGFuZC5cIik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwYW5kaW5nTGlzdERPTVdpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgR3Jvd2luZ0NhcmRFbGVtZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9ncm93aW5nQ2FyZFwiO1xuXG5jb25zdCBhY3RpdmVDYXJkc1dpZGdldCA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcImdyb3dpbmctY2FyZFwiLCBHcm93aW5nQ2FyZEVsZW1lbnQsIHtcbiAgICAgIGV4dGVuZHM6IFwibGlcIixcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgfHwgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRGV0YWlsc0VsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBBcnJheSBvZiBsaXN0IGl0ZW1zIChjYXJkcylcbiAgICAgIGxldCBsaXN0TElzOiBHcm93aW5nQ2FyZEVsZW1lbnRbXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiN3ZWJJREVDYXJkcyBsaVwiKSk7XG5cbiAgICAgIC8vIENsaWNrIGV2ZW50IHRvIHJlc2l6ZSB0aGUgY2FyZHMgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBhIGNhcmRcbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgb3V0c2lkZSBhIGNhcmQsIHJlc2l6ZSBhbGwgY2FyZHMgdG8gbm9ybWFsXG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RMSXMpIHtcbiAgICAgICAgbGV0IHRlbXBJdGVtOiBHcm93aW5nQ2FyZEVsZW1lbnQgPSBpdGVtO1xuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRlbXBJdGVtICYmICF0ZW1wSXRlbS5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaHJpbmtDYXJkKHRlbXBJdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXNoYWRlIGFsbCBjYXJkcyBiZWNhdXNlIG5vbmUgb2YgdGhlbSBhcmUgYmlnXG4gICAgICBmb3IgKGxldCBsaSBvZiBsaXN0TElzKSB7XG4gICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaGFkZUluYWN0aXZlQ2FyZChsaSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY3RpdmVDYXJkc1dpZGdldDtcbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG5jb25zdCBoc2xDb2xvcldpZGdldCA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBoc2xPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yT05FXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIGxldCBoc2xUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yVFdPXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIGxldCBoc2xUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUSFJFRVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNsYXNzIGJveGNvbG9yIHtcbiAgICAgIGh1ZSA9IDA7XG4gICAgICBzYXR1cmF0aW9uID0gMTAwO1xuICAgICAgbGlnaHRuZXNzID0gNTA7XG5cbiAgICAgIGNvbnN0cnVjdG9yKGh1ZSA9IDAsIHNhdHVyYXRpb24gPSAxMDAsIGxpZ2h0bmVzcyA9IDUwKSB7XG4gICAgICAgIGlmIChodWUgPT0gMCkge1xuICAgICAgICAgIHRoaXMuaHVlID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChodWUgPT0gMTIwKSB7XG4gICAgICAgICAgdGhpcy5odWUgPSAxMjA7XG4gICAgICAgIH0gZWxzZSBpZiAoaHVlID09IDI0MCkge1xuICAgICAgICAgIHRoaXMuaHVlID0gMjQwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChodWUgPCAwIHx8IGh1ZSA+PSAzNjAgfHwgc2F0dXJhdGlvbiA8IDAgfHwgc2F0dXJhdGlvbiA+IDEwMCB8fCBsaWdodG5lc3MgPCAwIHx8IGxpZ2h0bmVzcyA+IDEwMCkge1xuICAgICAgICAgIGxldCBlcnIgPSBuZXcgUmFuZ2VFcnJvcigpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYCVjPFJXQj4lY0hTTCBjb2xvciB2YWx1ZSBvdXQgb2YgYWNjZXB0YWJsZSByYW5nZTpcXG4lb1xcbiVjPC9SV0I+YCxcbiAgICAgICAgICAgIFwiY29sb3I6Z3JheTtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICAgICAgXCJjb2xvcjpncmF5O1wiLFxuICAgICAgICAgICAgZXJyLFxuICAgICAgICAgICAgXCJjb2xvcjpncmF5O2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2F0dXJhdGlvbiA9IHNhdHVyYXRpb247XG4gICAgICAgIHRoaXMubGlnaHRuZXNzID0gbGlnaHRuZXNzO1xuICAgICAgfTtcblxuICAgIH1cblxuICAgIGxldCByZWQgPSAwO1xuICAgIGxldCBncmVlbiA9IDEyMDtcbiAgICBsZXQgYmx1ZSA9IDI0MDtcblxuICAgIGxldCBoc2xCb3hDb2xvclJlZCA9IE9iamVjdC5jcmVhdGUobmV3IGJveGNvbG9yKHJlZCwgMTAwLCA1MCkpO1xuICAgIGxldCBoc2xCb3hDb2xvckdyZWVuID0gT2JqZWN0LmNyZWF0ZShuZXcgYm94Y29sb3IoZ3JlZW4sIDEwMCwgNTApKTtcbiAgICBsZXQgaHNsQm94Q29sb3JCbHVlID0gT2JqZWN0LmNyZWF0ZShuZXcgYm94Y29sb3IoYmx1ZSwgMTAwLCA1MCkpO1xuICAgIGxldCB0b3BSZWN0SHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNIU0xDb2xvck9ORSBzcGFuLnZhbDFcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIGxldCB0b3BSZWN0U2F0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNIU0xDb2xvck9ORSBzcGFuLnZhbDJcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIGxldCB0b3BSZWN0TGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yT05FIHNwYW4udmFsM1wiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgbGV0IG1pZFJlY3RIdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yVFdPIHNwYW4udmFsMVwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgbGV0IG1pZFJlY3RTYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI0hTTENvbG9yVFdPIHNwYW4udmFsMlwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgbGV0IG1pZFJlY3RMaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUV08gc3Bhbi52YWwzXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBsZXQgYm90UmVjdEh1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDFcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIGxldCBib3RSZWN0U2F0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNIU0xDb2xvclRIUkVFIHNwYW4udmFsMlwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgbGV0IGJvdFJlY3RMaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjSFNMQ29sb3JUSFJFRSBzcGFuLnZhbDNcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHRvcFJlY3RIdWUudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvclJlZC5odWU7XG4gICAgdG9wUmVjdFNhdC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yUmVkLnNhdHVyYXRpb247XG4gICAgdG9wUmVjdExpZ2h0LnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JSZWQubGlnaHRuZXNzO1xuICAgIG1pZFJlY3RIdWUudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvckdyZWVuLmh1ZTtcbiAgICBtaWRSZWN0U2F0LnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JHcmVlbi5zYXR1cmF0aW9uO1xuICAgIG1pZFJlY3RMaWdodC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yR3JlZW4ubGlnaHRuZXNzO1xuICAgIGJvdFJlY3RIdWUudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvckJsdWUuaHVlO1xuICAgIGJvdFJlY3RTYXQudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbjtcbiAgICBib3RSZWN0TGlnaHQudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvckJsdWUubGlnaHRuZXNzO1xuXG4gICAgaHNsT25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtoc2xCb3hDb2xvclJlZC5odWV9LCAke2hzbEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtoc2xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgIGhzbFR3by5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHNsQm94Q29sb3JHcmVlbi5odWV9LCAke2hzbEJveENvbG9yR3JlZW4uc2F0dXJhdGlvbn0lLCAke2hzbEJveENvbG9yR3JlZW4ubGlnaHRuZXNzfSUpYDtcbiAgICBoc2xUaHJlZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHNsQm94Q29sb3JCbHVlLmh1ZX0sICR7aHNsQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtoc2xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcblxuICAgIGNvbnN0IGh1ZVNsZHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjSHVlYCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBzYXR1cmF0aW9uU2xkciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNTYXR1cmF0aW9uYCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBsaWdodG5lc3NTbGRyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI0xpZ2h0bmVzc2ApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBodWVTbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICBsZXQgaHVlSW5wdXRWYWx1ZSA9IGh1ZVNsZHIudmFsdWU7XG4gICAgICBoc2xPbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2h1ZUlucHV0VmFsdWV9LCAke2hzbEJveENvbG9yUmVkLnNhdHVyYXRpb259JSwgJHtoc2xCb3hDb2xvclJlZC5saWdodG5lc3N9JSlgO1xuICAgICAgaHNsVHdvLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtodWVJbnB1dFZhbHVlfSwgJHtoc2xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtoc2xCb3hDb2xvckdyZWVuLmxpZ2h0bmVzc30lKWA7XG4gICAgICBoc2xUaHJlZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHVlSW5wdXRWYWx1ZX0sICR7aHNsQm94Q29sb3JCbHVlLnNhdHVyYXRpb259JSwgJHtoc2xCb3hDb2xvckJsdWUubGlnaHRuZXNzfSUpYDtcbiAgICAgIGhzbEJveENvbG9yUmVkLmh1ZSA9IGh1ZUlucHV0VmFsdWU7XG4gICAgICBoc2xCb3hDb2xvckdyZWVuLmh1ZSA9IGh1ZUlucHV0VmFsdWU7XG4gICAgICBoc2xCb3hDb2xvckJsdWUuaHVlID0gaHVlSW5wdXRWYWx1ZTtcbiAgICAgIHRvcFJlY3RIdWUudGV4dENvbnRlbnQgPSBoc2xCb3hDb2xvclJlZC5odWU7XG4gICAgICBtaWRSZWN0SHVlLnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JHcmVlbi5odWU7XG4gICAgICBib3RSZWN0SHVlLnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JCbHVlLmh1ZTtcbiAgICB9KTtcblxuICAgIHNhdHVyYXRpb25TbGRyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICBsZXQgc2F0dXJhdGlvbklucHV0VmFsdWUgPSBzYXR1cmF0aW9uU2xkci52YWx1ZTtcbiAgICAgIGhzbE9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgaHNsKCR7aHNsQm94Q29sb3JSZWQuaHVlfSwgJHtzYXR1cmF0aW9uSW5wdXRWYWx1ZX0lLCAke2hzbEJveENvbG9yUmVkLmxpZ2h0bmVzc30lKWA7XG4gICAgICBoc2xUd28uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2hzbEJveENvbG9yR3JlZW4uaHVlfSwgJHtzYXR1cmF0aW9uSW5wdXRWYWx1ZX0lLCAke2hzbEJveENvbG9yR3JlZW4ubGlnaHRuZXNzfSUpYDtcbiAgICAgIGhzbFRocmVlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGBoc2woJHtoc2xCb3hDb2xvckJsdWUuaHVlfSwgJHtzYXR1cmF0aW9uSW5wdXRWYWx1ZX0lLCAke2hzbEJveENvbG9yQmx1ZS5saWdodG5lc3N9JSlgO1xuICAgICAgaHNsQm94Q29sb3JSZWQuc2F0dXJhdGlvbiA9IHNhdHVyYXRpb25JbnB1dFZhbHVlO1xuICAgICAgaHNsQm94Q29sb3JHcmVlbi5zYXR1cmF0aW9uID0gc2F0dXJhdGlvbklucHV0VmFsdWU7XG4gICAgICBoc2xCb3hDb2xvckJsdWUuc2F0dXJhdGlvbiA9IHNhdHVyYXRpb25JbnB1dFZhbHVlO1xuICAgICAgdG9wUmVjdFNhdC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yUmVkLnNhdHVyYXRpb247XG4gICAgICBtaWRSZWN0U2F0LnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JHcmVlbi5zYXR1cmF0aW9uO1xuICAgICAgYm90UmVjdFNhdC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yQmx1ZS5zYXR1cmF0aW9uO1xuICAgIH0pO1xuXG4gICAgbGlnaHRuZXNzU2xkci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgbGV0IGxpZ2h0SW5wdXRWYWx1ZSA9IGxpZ2h0bmVzc1NsZHIudmFsdWU7XG4gICAgICBoc2xPbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2hzbEJveENvbG9yUmVkLmh1ZX0sICR7aHNsQm94Q29sb3JSZWQuc2F0dXJhdGlvbn0lLCAke2xpZ2h0SW5wdXRWYWx1ZX0lKWA7XG4gICAgICBoc2xUd28uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2hzbEJveENvbG9yR3JlZW4uaHVlfSwgJHtoc2xCb3hDb2xvckdyZWVuLnNhdHVyYXRpb259JSwgJHtsaWdodElucHV0VmFsdWV9JSlgO1xuICAgICAgaHNsVGhyZWUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYGhzbCgke2hzbEJveENvbG9yQmx1ZS5odWV9LCAke2hzbEJveENvbG9yQmx1ZS5zYXR1cmF0aW9ufSUsICR7bGlnaHRJbnB1dFZhbHVlfSUpYDtcbiAgICAgIGhzbEJveENvbG9yUmVkLmxpZ2h0bmVzcyA9IGxpZ2h0SW5wdXRWYWx1ZTtcbiAgICAgIGhzbEJveENvbG9yR3JlZW4ubGlnaHRuZXNzID0gbGlnaHRJbnB1dFZhbHVlO1xuICAgICAgaHNsQm94Q29sb3JCbHVlLmxpZ2h0bmVzcyA9IGxpZ2h0SW5wdXRWYWx1ZTtcbiAgICAgIHRvcFJlY3RMaWdodC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yUmVkLmxpZ2h0bmVzcztcbiAgICAgIG1pZFJlY3RMaWdodC50ZXh0Q29udGVudCA9IGhzbEJveENvbG9yR3JlZW4ubGlnaHRuZXNzO1xuICAgICAgYm90UmVjdExpZ2h0LnRleHRDb250ZW50ID0gaHNsQm94Q29sb3JCbHVlLmxpZ2h0bmVzcztcbiAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhzbENvbG9yV2lkZ2V0O1xuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmNvbnN0IHNsaWRlckJhciA9IHtcbiAgaW5pdDogKCkgPT4ge1xuICAgIHZhciBkaXZpc29yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXZpc29yXCIpLFxuICAgICAgc2xpZGVCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbiAgICBzbGlkZUJhci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwic2xpZGVyXCIpO1xuICAgIHNsaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBzbGlkZXJCYXIubW92ZURpdmlzb3JCYXIoZGl2aXNvciwgc2xpZGVCYXIpKTtcbiAgfSxcbiAgbW92ZURpdmlzb3JCYXI6IChkaXZpc29yOiBIVE1MRWxlbWVudCwgc2xpZGVCYXI6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICBkaXZpc29yLnN0eWxlLndpZHRoID0gc2xpZGVCYXIudmFsdWUgKyBcIiVcIjtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlckJhcjtcbiIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovXHJcbmNvbnN0IHQgPSB3aW5kb3csXHJcbiAgaSA9XHJcbiAgICB0LlNoYWRvd1Jvb3QgJiZcclxuICAgICh2b2lkIDAgPT09IHQuU2hhZHlDU1MgfHwgdC5TaGFkeUNTUy5uYXRpdmVTaGFkb3cpICYmXHJcbiAgICBcImFkb3B0ZWRTdHlsZVNoZWV0c1wiIGluIERvY3VtZW50LnByb3RvdHlwZSAmJlxyXG4gICAgXCJyZXBsYWNlXCIgaW4gQ1NTU3R5bGVTaGVldC5wcm90b3R5cGUsXHJcbiAgcyA9IFN5bWJvbCgpLFxyXG4gIGUgPSBuZXcgV2Vha01hcCgpO1xyXG5jbGFzcyBuIHtcclxuICBjb25zdHJ1Y3Rvcih0LCBpLCBlKSB7XHJcbiAgICBpZiAoKCh0aGlzLl8kY3NzUmVzdWx0JCA9ICEwKSwgZSAhPT0gcykpXHJcbiAgICAgIHRocm93IEVycm9yKFwiQ1NTUmVzdWx0IGlzIG5vdCBjb25zdHJ1Y3RhYmxlLiBVc2UgYHVuc2FmZUNTU2Agb3IgYGNzc2AgaW5zdGVhZC5cIik7XHJcbiAgICAodGhpcy5jc3NUZXh0ID0gdCksICh0aGlzLnQgPSBpKTtcclxuICB9XHJcbiAgZ2V0IHN0eWxlU2hlZXQoKSB7XHJcbiAgICBsZXQgdCA9IHRoaXMuaTtcclxuICAgIGNvbnN0IHMgPSB0aGlzLnQ7XHJcbiAgICBpZiAoaSAmJiB2b2lkIDAgPT09IHQpIHtcclxuICAgICAgY29uc3QgaSA9IHZvaWQgMCAhPT0gcyAmJiAxID09PSBzLmxlbmd0aDtcclxuICAgICAgaSAmJiAodCA9IGUuZ2V0KHMpKSxcclxuICAgICAgICB2b2lkIDAgPT09IHQgJiYgKCh0aGlzLmkgPSB0ID0gbmV3IENTU1N0eWxlU2hlZXQoKSkucmVwbGFjZVN5bmModGhpcy5jc3NUZXh0KSwgaSAmJiBlLnNldChzLCB0KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxuICB9XHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jc3NUZXh0O1xyXG4gIH1cclxufVxyXG5jb25zdCBvID0gdCA9PiBuZXcgbihcInN0cmluZ1wiID09IHR5cGVvZiB0ID8gdCA6IHQgKyBcIlwiLCB2b2lkIDAsIHMpLFxyXG4gIHIgPSAodCwgLi4uaSkgPT4ge1xyXG4gICAgY29uc3QgZSA9XHJcbiAgICAgIDEgPT09IHQubGVuZ3RoXHJcbiAgICAgICAgPyB0WzBdXHJcbiAgICAgICAgOiBpLnJlZHVjZShcclxuICAgICAgICAgICAgKGksIHMsIGUpID0+XHJcbiAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgKHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEwID09PSB0Ll8kY3NzUmVzdWx0JCkgcmV0dXJuIHQuY3NzVGV4dDtcclxuICAgICAgICAgICAgICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiB0KSByZXR1cm4gdDtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICBcIlZhbHVlIHBhc3NlZCB0byAnY3NzJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2NzcycgZnVuY3Rpb24gcmVzdWx0OiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgdCArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIuIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5cIlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KShzKSArXHJcbiAgICAgICAgICAgICAgdFtlICsgMV0sXHJcbiAgICAgICAgICAgIHRbMF1cclxuICAgICAgICAgICk7XHJcbiAgICByZXR1cm4gbmV3IG4oZSwgdCwgcyk7XHJcbiAgfSxcclxuICBsID0gKHMsIGUpID0+IHtcclxuICAgIGlcclxuICAgICAgPyAocy5hZG9wdGVkU3R5bGVTaGVldHMgPSBlLm1hcCh0ID0+ICh0IGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IHQgOiB0LnN0eWxlU2hlZXQpKSlcclxuICAgICAgOiBlLmZvckVhY2goaSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLFxyXG4gICAgICAgICAgICBuID0gdC5saXROb25jZTtcclxuICAgICAgICAgIHZvaWQgMCAhPT0gbiAmJiBlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG4pLCAoZS50ZXh0Q29udGVudCA9IGkuY3NzVGV4dCksIHMuYXBwZW5kQ2hpbGQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSxcclxuICBoID0gaVxyXG4gICAgPyB0ID0+IHRcclxuICAgIDogdCA9PlxyXG4gICAgICAgIHQgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0XHJcbiAgICAgICAgICA/ICh0ID0+IHtcclxuICAgICAgICAgICAgICBsZXQgaSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHQuY3NzUnVsZXMpIGkgKz0gcy5jc3NUZXh0O1xyXG4gICAgICAgICAgICAgIHJldHVybiBvKGkpO1xyXG4gICAgICAgICAgICB9KSh0KVxyXG4gICAgICAgICAgOiB0O1xyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLyB2YXIgdTtcclxuY29uc3QgYyA9IHdpbmRvdyxcclxuICBkID0gYy50cnVzdGVkVHlwZXMsXHJcbiAgYSA9IGQgPyBkLmVtcHR5U2NyaXB0IDogXCJcIixcclxuICB2ID0gYy5yZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQsXHJcbiAgZiA9IHtcclxuICAgIHRvQXR0cmlidXRlKHQsIGkpIHtcclxuICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgY2FzZSBCb29sZWFuOlxyXG4gICAgICAgICAgdCA9IHQgPyBhIDogbnVsbDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT2JqZWN0OlxyXG4gICAgICAgIGNhc2UgQXJyYXk6XHJcbiAgICAgICAgICB0ID0gbnVsbCA9PSB0ID8gdCA6IEpTT04uc3RyaW5naWZ5KHQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0O1xyXG4gICAgfSxcclxuICAgIGZyb21BdHRyaWJ1dGUodCwgaSkge1xyXG4gICAgICBsZXQgcyA9IHQ7XHJcbiAgICAgIHN3aXRjaCAoaSkge1xyXG4gICAgICAgIGNhc2UgQm9vbGVhbjpcclxuICAgICAgICAgIHMgPSBudWxsICE9PSB0O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBOdW1iZXI6XHJcbiAgICAgICAgICBzID0gbnVsbCA9PT0gdCA/IG51bGwgOiBOdW1iZXIodCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9iamVjdDpcclxuICAgICAgICBjYXNlIEFycmF5OlxyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcyA9IEpTT04ucGFyc2UodCk7XHJcbiAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgIHMgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHAgPSAodCwgaSkgPT4gaSAhPT0gdCAmJiAoaSA9PSBpIHx8IHQgPT0gdCksXHJcbiAgeSA9IHsgYXR0cmlidXRlOiAhMCwgdHlwZTogU3RyaW5nLCBjb252ZXJ0ZXI6IGYsIHJlZmxlY3Q6ICExLCBoYXNDaGFuZ2VkOiBwIH0sXHJcbiAgYiA9IFwiZmluYWxpemVkXCI7XHJcbmNsYXNzIG0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpLFxyXG4gICAgICAodGhpcy5vID0gbmV3IE1hcCgpKSxcclxuICAgICAgKHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gITEpLFxyXG4gICAgICAodGhpcy5oYXNVcGRhdGVkID0gITEpLFxyXG4gICAgICAodGhpcy5sID0gbnVsbCksXHJcbiAgICAgIHRoaXMudSgpO1xyXG4gIH1cclxuICBzdGF0aWMgYWRkSW5pdGlhbGl6ZXIodCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB0aGlzLmZpbmFsaXplKCksIChudWxsICE9PSAoaSA9IHRoaXMudikgJiYgdm9pZCAwICE9PSBpID8gaSA6ICh0aGlzLnYgPSBbXSkpLnB1c2godCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xyXG4gICAgdGhpcy5maW5hbGl6ZSgpO1xyXG4gICAgY29uc3QgdCA9IFtdO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5lbGVtZW50UHJvcGVydGllcy5mb3JFYWNoKChpLCBzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZSA9IHRoaXMucChzLCBpKTtcclxuICAgICAgICB2b2lkIDAgIT09IGUgJiYgKHRoaXMubS5zZXQoZSwgcyksIHQucHVzaChlKSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0XHJcbiAgICApO1xyXG4gIH1cclxuICBzdGF0aWMgY3JlYXRlUHJvcGVydHkodCwgaSA9IHkpIHtcclxuICAgIGlmIChcclxuICAgICAgKGkuc3RhdGUgJiYgKGkuYXR0cmlidXRlID0gITEpLFxyXG4gICAgICB0aGlzLmZpbmFsaXplKCksXHJcbiAgICAgIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuc2V0KHQsIGkpLFxyXG4gICAgICAhaS5ub0FjY2Vzc29yICYmICF0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0KSlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBzID0gXCJzeW1ib2xcIiA9PSB0eXBlb2YgdCA/IFN5bWJvbCgpIDogXCJfX1wiICsgdCxcclxuICAgICAgICBlID0gdGhpcy5nZXRQcm9wZXJ0eURlc2NyaXB0b3IodCwgcywgaSk7XHJcbiAgICAgIHZvaWQgMCAhPT0gZSAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIHQsIGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0aWMgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHQsIGksIHMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tpXTtcclxuICAgICAgfSxcclxuICAgICAgc2V0KGUpIHtcclxuICAgICAgICBjb25zdCBuID0gdGhpc1t0XTtcclxuICAgICAgICAodGhpc1tpXSA9IGUpLCB0aGlzLnJlcXVlc3RVcGRhdGUodCwgbiwgcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXHJcbiAgICAgIGVudW1lcmFibGU6ICEwLFxyXG4gICAgfTtcclxuICB9XHJcbiAgc3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UHJvcGVydGllcy5nZXQodCkgfHwgeTtcclxuICB9XHJcbiAgc3RhdGljIGZpbmFsaXplKCkge1xyXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoYikpIHJldHVybiAhMTtcclxuICAgIHRoaXNbYl0gPSAhMDtcclxuICAgIGNvbnN0IHQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0LmZpbmFsaXplKCksXHJcbiAgICAgIHZvaWQgMCAhPT0gdC52ICYmICh0aGlzLnYgPSBbLi4udC52XSksXHJcbiAgICAgICh0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcCh0LmVsZW1lbnRQcm9wZXJ0aWVzKSksXHJcbiAgICAgICh0aGlzLm0gPSBuZXcgTWFwKCkpLFxyXG4gICAgICB0aGlzLmhhc093blByb3BlcnR5KFwicHJvcGVydGllc1wiKSlcclxuICAgICkge1xyXG4gICAgICBjb25zdCB0ID0gdGhpcy5wcm9wZXJ0aWVzLFxyXG4gICAgICAgIGkgPSBbLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModCksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModCldO1xyXG4gICAgICBmb3IgKGNvbnN0IHMgb2YgaSkgdGhpcy5jcmVhdGVQcm9wZXJ0eShzLCB0W3NdKTtcclxuICAgIH1cclxuICAgIHJldHVybiAodGhpcy5lbGVtZW50U3R5bGVzID0gdGhpcy5maW5hbGl6ZVN0eWxlcyh0aGlzLnN0eWxlcykpLCAhMDtcclxuICB9XHJcbiAgc3RhdGljIGZpbmFsaXplU3R5bGVzKHQpIHtcclxuICAgIGNvbnN0IGkgPSBbXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHQpKSB7XHJcbiAgICAgIGNvbnN0IHMgPSBuZXcgU2V0KHQuZmxhdCgxIC8gMCkucmV2ZXJzZSgpKTtcclxuICAgICAgZm9yIChjb25zdCB0IG9mIHMpIGkudW5zaGlmdChoKHQpKTtcclxuICAgIH0gZWxzZSB2b2lkIDAgIT09IHQgJiYgaS5wdXNoKGgodCkpO1xyXG4gICAgcmV0dXJuIGk7XHJcbiAgfVxyXG4gIHN0YXRpYyBwKHQsIGkpIHtcclxuICAgIGNvbnN0IHMgPSBpLmF0dHJpYnV0ZTtcclxuICAgIHJldHVybiAhMSA9PT0gcyA/IHZvaWQgMCA6IFwic3RyaW5nXCIgPT0gdHlwZW9mIHMgPyBzIDogXCJzdHJpbmdcIiA9PSB0eXBlb2YgdCA/IHQudG9Mb3dlckNhc2UoKSA6IHZvaWQgMDtcclxuICB9XHJcbiAgdSgpIHtcclxuICAgIHZhciB0O1xyXG4gICAgKHRoaXMuXyA9IG5ldyBQcm9taXNlKHQgPT4gKHRoaXMuZW5hYmxlVXBkYXRpbmcgPSB0KSkpLFxyXG4gICAgICAodGhpcy5fJEFMID0gbmV3IE1hcCgpKSxcclxuICAgICAgdGhpcy5nKCksXHJcbiAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpLFxyXG4gICAgICBudWxsID09PSAodCA9IHRoaXMuY29uc3RydWN0b3IudikgfHwgdm9pZCAwID09PSB0IHx8IHQuZm9yRWFjaCh0ID0+IHQodGhpcykpO1xyXG4gIH1cclxuICBhZGRDb250cm9sbGVyKHQpIHtcclxuICAgIHZhciBpLCBzO1xyXG4gICAgKG51bGwgIT09IChpID0gdGhpcy5TKSAmJiB2b2lkIDAgIT09IGkgPyBpIDogKHRoaXMuUyA9IFtdKSkucHVzaCh0KSxcclxuICAgICAgdm9pZCAwICE9PSB0aGlzLnJlbmRlclJvb3QgJiZcclxuICAgICAgICB0aGlzLmlzQ29ubmVjdGVkICYmXHJcbiAgICAgICAgKG51bGwgPT09IChzID0gdC5ob3N0Q29ubmVjdGVkKSB8fCB2b2lkIDAgPT09IHMgfHwgcy5jYWxsKHQpKTtcclxuICB9XHJcbiAgcmVtb3ZlQ29udHJvbGxlcih0KSB7XHJcbiAgICB2YXIgaTtcclxuICAgIG51bGwgPT09IChpID0gdGhpcy5TKSB8fCB2b2lkIDAgPT09IGkgfHwgaS5zcGxpY2UodGhpcy5TLmluZGV4T2YodCkgPj4+IDAsIDEpO1xyXG4gIH1cclxuICBnKCkge1xyXG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50UHJvcGVydGllcy5mb3JFYWNoKCh0LCBpKSA9PiB7XHJcbiAgICAgIHRoaXMuaGFzT3duUHJvcGVydHkoaSkgJiYgKHRoaXMuby5zZXQoaSwgdGhpc1tpXSksIGRlbGV0ZSB0aGlzW2ldKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBjcmVhdGVSZW5kZXJSb290KCkge1xyXG4gICAgdmFyIHQ7XHJcbiAgICBjb25zdCBpID1cclxuICAgICAgbnVsbCAhPT0gKHQgPSB0aGlzLnNoYWRvd1Jvb3QpICYmIHZvaWQgMCAhPT0gdFxyXG4gICAgICAgID8gdFxyXG4gICAgICAgIDogdGhpcy5hdHRhY2hTaGFkb3codGhpcy5jb25zdHJ1Y3Rvci5zaGFkb3dSb290T3B0aW9ucyk7XHJcbiAgICByZXR1cm4gbChpLCB0aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRTdHlsZXMpLCBpO1xyXG4gIH1cclxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgIHZhciB0O1xyXG4gICAgdm9pZCAwID09PSB0aGlzLnJlbmRlclJvb3QgJiYgKHRoaXMucmVuZGVyUm9vdCA9IHRoaXMuY3JlYXRlUmVuZGVyUm9vdCgpKSxcclxuICAgICAgdGhpcy5lbmFibGVVcGRhdGluZyghMCksXHJcbiAgICAgIG51bGwgPT09ICh0ID0gdGhpcy5TKSB8fFxyXG4gICAgICAgIHZvaWQgMCA9PT0gdCB8fFxyXG4gICAgICAgIHQuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgcmV0dXJuIG51bGwgPT09IChpID0gdC5ob3N0Q29ubmVjdGVkKSB8fCB2b2lkIDAgPT09IGkgPyB2b2lkIDAgOiBpLmNhbGwodCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG4gIGVuYWJsZVVwZGF0aW5nKHQpIHt9XHJcbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB2YXIgdDtcclxuICAgIG51bGwgPT09ICh0ID0gdGhpcy5TKSB8fFxyXG4gICAgICB2b2lkIDAgPT09IHQgfHxcclxuICAgICAgdC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHJldHVybiBudWxsID09PSAoaSA9IHQuaG9zdERpc2Nvbm5lY3RlZCkgfHwgdm9pZCAwID09PSBpID8gdm9pZCAwIDogaS5jYWxsKHQpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHQsIGksIHMpIHtcclxuICAgIHRoaXMuXyRBSyh0LCBzKTtcclxuICB9XHJcbiAgJCh0LCBpLCBzID0geSkge1xyXG4gICAgdmFyIGU7XHJcbiAgICBjb25zdCBuID0gdGhpcy5jb25zdHJ1Y3Rvci5wKHQsIHMpO1xyXG4gICAgaWYgKHZvaWQgMCAhPT0gbiAmJiAhMCA9PT0gcy5yZWZsZWN0KSB7XHJcbiAgICAgIGNvbnN0IG8gPSAoXHJcbiAgICAgICAgdm9pZCAwICE9PSAobnVsbCA9PT0gKGUgPSBzLmNvbnZlcnRlcikgfHwgdm9pZCAwID09PSBlID8gdm9pZCAwIDogZS50b0F0dHJpYnV0ZSkgPyBzLmNvbnZlcnRlciA6IGZcclxuICAgICAgKS50b0F0dHJpYnV0ZShpLCBzLnR5cGUpO1xyXG4gICAgICAodGhpcy5sID0gdCksIG51bGwgPT0gbyA/IHRoaXMucmVtb3ZlQXR0cmlidXRlKG4pIDogdGhpcy5zZXRBdHRyaWJ1dGUobiwgbyksICh0aGlzLmwgPSBudWxsKTtcclxuICAgIH1cclxuICB9XHJcbiAgXyRBSyh0LCBpKSB7XHJcbiAgICB2YXIgcztcclxuICAgIGNvbnN0IGUgPSB0aGlzLmNvbnN0cnVjdG9yLFxyXG4gICAgICBuID0gZS5tLmdldCh0KTtcclxuICAgIGlmICh2b2lkIDAgIT09IG4gJiYgdGhpcy5sICE9PSBuKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBlLmdldFByb3BlcnR5T3B0aW9ucyhuKSxcclxuICAgICAgICBvID1cclxuICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdC5jb252ZXJ0ZXJcclxuICAgICAgICAgICAgPyB7IGZyb21BdHRyaWJ1dGU6IHQuY29udmVydGVyIH1cclxuICAgICAgICAgICAgOiB2b2lkIDAgIT09IChudWxsID09PSAocyA9IHQuY29udmVydGVyKSB8fCB2b2lkIDAgPT09IHMgPyB2b2lkIDAgOiBzLmZyb21BdHRyaWJ1dGUpXHJcbiAgICAgICAgICAgID8gdC5jb252ZXJ0ZXJcclxuICAgICAgICAgICAgOiBmO1xyXG4gICAgICAodGhpcy5sID0gbiksICh0aGlzW25dID0gby5mcm9tQXR0cmlidXRlKGksIHQudHlwZSkpLCAodGhpcy5sID0gbnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlcXVlc3RVcGRhdGUodCwgaSwgcykge1xyXG4gICAgbGV0IGUgPSAhMDtcclxuICAgIHZvaWQgMCAhPT0gdCAmJlxyXG4gICAgICAoKChzID0gcyB8fCB0aGlzLmNvbnN0cnVjdG9yLmdldFByb3BlcnR5T3B0aW9ucyh0KSkuaGFzQ2hhbmdlZCB8fCBwKSh0aGlzW3RdLCBpKVxyXG4gICAgICAgID8gKHRoaXMuXyRBTC5oYXModCkgfHwgdGhpcy5fJEFMLnNldCh0LCBpKSxcclxuICAgICAgICAgICEwID09PSBzLnJlZmxlY3QgJiYgdGhpcy5sICE9PSB0ICYmICh2b2lkIDAgPT09IHRoaXMuQyAmJiAodGhpcy5DID0gbmV3IE1hcCgpKSwgdGhpcy5DLnNldCh0LCBzKSkpXHJcbiAgICAgICAgOiAoZSA9ICExKSksXHJcbiAgICAgICF0aGlzLmlzVXBkYXRlUGVuZGluZyAmJiBlICYmICh0aGlzLl8gPSB0aGlzLlQoKSk7XHJcbiAgfVxyXG4gIGFzeW5jIFQoKSB7XHJcbiAgICB0aGlzLmlzVXBkYXRlUGVuZGluZyA9ICEwO1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgdGhpcy5fO1xyXG4gICAgfSBjYXRjaCAodCkge1xyXG4gICAgICBQcm9taXNlLnJlamVjdCh0KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHQgPSB0aGlzLnNjaGVkdWxlVXBkYXRlKCk7XHJcbiAgICByZXR1cm4gbnVsbCAhPSB0ICYmIChhd2FpdCB0KSwgIXRoaXMuaXNVcGRhdGVQZW5kaW5nO1xyXG4gIH1cclxuICBzY2hlZHVsZVVwZGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnBlcmZvcm1VcGRhdGUoKTtcclxuICB9XHJcbiAgcGVyZm9ybVVwZGF0ZSgpIHtcclxuICAgIHZhciB0O1xyXG4gICAgaWYgKCF0aGlzLmlzVXBkYXRlUGVuZGluZykgcmV0dXJuO1xyXG4gICAgdGhpcy5oYXNVcGRhdGVkLCB0aGlzLm8gJiYgKHRoaXMuby5mb3JFYWNoKCh0LCBpKSA9PiAodGhpc1tpXSA9IHQpKSwgKHRoaXMubyA9IHZvaWQgMCkpO1xyXG4gICAgbGV0IGkgPSAhMTtcclxuICAgIGNvbnN0IHMgPSB0aGlzLl8kQUw7XHJcbiAgICB0cnkge1xyXG4gICAgICAoaSA9IHRoaXMuc2hvdWxkVXBkYXRlKHMpKSxcclxuICAgICAgICBpXHJcbiAgICAgICAgICA/ICh0aGlzLndpbGxVcGRhdGUocyksXHJcbiAgICAgICAgICAgIG51bGwgPT09ICh0ID0gdGhpcy5TKSB8fFxyXG4gICAgICAgICAgICAgIHZvaWQgMCA9PT0gdCB8fFxyXG4gICAgICAgICAgICAgIHQuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT09IChpID0gdC5ob3N0VXBkYXRlKSB8fCB2b2lkIDAgPT09IGkgPyB2b2lkIDAgOiBpLmNhbGwodCk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHMpKVxyXG4gICAgICAgICAgOiB0aGlzLlAoKTtcclxuICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgdGhyb3cgKChpID0gITEpLCB0aGlzLlAoKSwgdCk7XHJcbiAgICB9XHJcbiAgICBpICYmIHRoaXMuXyRBRShzKTtcclxuICB9XHJcbiAgd2lsbFVwZGF0ZSh0KSB7fVxyXG4gIF8kQUUodCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICBudWxsID09PSAoaSA9IHRoaXMuUykgfHxcclxuICAgICAgdm9pZCAwID09PSBpIHx8XHJcbiAgICAgIGkuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICByZXR1cm4gbnVsbCA9PT0gKGkgPSB0Lmhvc3RVcGRhdGVkKSB8fCB2b2lkIDAgPT09IGkgPyB2b2lkIDAgOiBpLmNhbGwodCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0aGlzLmhhc1VwZGF0ZWQgfHwgKCh0aGlzLmhhc1VwZGF0ZWQgPSAhMCksIHRoaXMuZmlyc3RVcGRhdGVkKHQpKSxcclxuICAgICAgdGhpcy51cGRhdGVkKHQpO1xyXG4gIH1cclxuICBQKCkge1xyXG4gICAgKHRoaXMuXyRBTCA9IG5ldyBNYXAoKSksICh0aGlzLmlzVXBkYXRlUGVuZGluZyA9ICExKTtcclxuICB9XHJcbiAgZ2V0IHVwZGF0ZUNvbXBsZXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VXBkYXRlQ29tcGxldGUoKTtcclxuICB9XHJcbiAgZ2V0VXBkYXRlQ29tcGxldGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fO1xyXG4gIH1cclxuICBzaG91bGRVcGRhdGUodCkge1xyXG4gICAgcmV0dXJuICEwO1xyXG4gIH1cclxuICB1cGRhdGUodCkge1xyXG4gICAgdm9pZCAwICE9PSB0aGlzLkMgJiYgKHRoaXMuQy5mb3JFYWNoKCh0LCBpKSA9PiB0aGlzLiQoaSwgdGhpc1tpXSwgdCkpLCAodGhpcy5DID0gdm9pZCAwKSksIHRoaXMuUCgpO1xyXG4gIH1cclxuICB1cGRhdGVkKHQpIHt9XHJcbiAgZmlyc3RVcGRhdGVkKHQpIHt9XHJcbn1cclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9cclxudmFyIGc7XHJcbihtW2JdID0gITApLFxyXG4gIChtLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpKSxcclxuICAobS5lbGVtZW50U3R5bGVzID0gW10pLFxyXG4gIChtLnNoYWRvd1Jvb3RPcHRpb25zID0geyBtb2RlOiBcIm9wZW5cIiB9KSxcclxuICBudWxsID09IHYgfHwgdih7IFJlYWN0aXZlRWxlbWVudDogbSB9KSxcclxuICAobnVsbCAhPT0gKHUgPSBjLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zKSAmJiB2b2lkIDAgIT09IHUgPyB1IDogKGMucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMgPSBbXSkpLnB1c2goXHJcbiAgICBcIjEuNi4zXCJcclxuICApO1xyXG5jb25zdCB3ID0gd2luZG93LFxyXG4gIF8gPSB3LnRydXN0ZWRUeXBlcyxcclxuICAkID0gXyA/IF8uY3JlYXRlUG9saWN5KFwibGl0LWh0bWxcIiwgeyBjcmVhdGVIVE1MOiB0ID0+IHQgfSkgOiB2b2lkIDAsXHJcbiAgUyA9IFwiJGxpdCRcIixcclxuICBUID0gYGxpdCQkeyhNYXRoLnJhbmRvbSgpICsgXCJcIikuc2xpY2UoOSl9JGAsXHJcbiAgeCA9IFwiP1wiICsgVCxcclxuICBFID0gYDwke3h9PmAsXHJcbiAgQyA9IGRvY3VtZW50LFxyXG4gIEEgPSAoKSA9PiBDLmNyZWF0ZUNvbW1lbnQoXCJcIiksXHJcbiAgayA9IHQgPT4gbnVsbCA9PT0gdCB8fCAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIHQpLFxyXG4gIE0gPSBBcnJheS5pc0FycmF5LFxyXG4gIFAgPSB0ID0+IE0odCkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiAobnVsbCA9PSB0ID8gdm9pZCAwIDogdFtTeW1ib2wuaXRlcmF0b3JdKSxcclxuICBVID0gXCJbIFxcdFxcblxcZlxccl1cIixcclxuICBWID0gLzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nLFxyXG4gIFIgPSAvLS0+L2csXHJcbiAgTiA9IC8+L2csXHJcbiAgTyA9IFJlZ0V4cChgPnwke1V9KD86KFteXFxcXHNcIic+PS9dKykoJHtVfSo9JHtVfSooPzpbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dfChcInwnKXwpKXwkKWAsIFwiZ1wiKSxcclxuICBMID0gLycvZyxcclxuICBqID0gL1wiL2csXHJcbiAgeiA9IC9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaSxcclxuICBIID1cclxuICAgIHQgPT5cclxuICAgIChpLCAuLi5zKSA9PiAoeyBfJGxpdFR5cGUkOiB0LCBzdHJpbmdzOiBpLCB2YWx1ZXM6IHMgfSksXHJcbiAgSSA9IEgoMSksXHJcbiAgQiA9IEgoMiksXHJcbiAgRCA9IFN5bWJvbC5mb3IoXCJsaXQtbm9DaGFuZ2VcIiksXHJcbiAgVyA9IFN5bWJvbC5mb3IoXCJsaXQtbm90aGluZ1wiKSxcclxuICBaID0gbmV3IFdlYWtNYXAoKSxcclxuICBxID0gQy5jcmVhdGVUcmVlV2Fsa2VyKEMsIDEyOSwgbnVsbCwgITEpO1xyXG5mdW5jdGlvbiBGKHQsIGkpIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodCkgfHwgIXQuaGFzT3duUHJvcGVydHkoXCJyYXdcIikpIHRocm93IEVycm9yKFwiaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5XCIpO1xyXG4gIHJldHVybiB2b2lkIDAgIT09ICQgPyAkLmNyZWF0ZUhUTUwoaSkgOiBpO1xyXG59XHJcbmNvbnN0IEcgPSAodCwgaSkgPT4ge1xyXG4gIGNvbnN0IHMgPSB0Lmxlbmd0aCAtIDEsXHJcbiAgICBlID0gW107XHJcbiAgbGV0IG4sXHJcbiAgICBvID0gMiA9PT0gaSA/IFwiPHN2Zz5cIiA6IFwiXCIsXHJcbiAgICByID0gVjtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHM7IGkrKykge1xyXG4gICAgY29uc3QgcyA9IHRbaV07XHJcbiAgICBsZXQgbCxcclxuICAgICAgaCxcclxuICAgICAgdSA9IC0xLFxyXG4gICAgICBjID0gMDtcclxuICAgIGZvciAoOyBjIDwgcy5sZW5ndGggJiYgKChyLmxhc3RJbmRleCA9IGMpLCAoaCA9IHIuZXhlYyhzKSksIG51bGwgIT09IGgpOyApXHJcbiAgICAgIChjID0gci5sYXN0SW5kZXgpLFxyXG4gICAgICAgIHIgPT09IFZcclxuICAgICAgICAgID8gXCIhLS1cIiA9PT0gaFsxXVxyXG4gICAgICAgICAgICA/IChyID0gUilcclxuICAgICAgICAgICAgOiB2b2lkIDAgIT09IGhbMV1cclxuICAgICAgICAgICAgPyAociA9IE4pXHJcbiAgICAgICAgICAgIDogdm9pZCAwICE9PSBoWzJdXHJcbiAgICAgICAgICAgID8gKHoudGVzdChoWzJdKSAmJiAobiA9IFJlZ0V4cChcIjwvXCIgKyBoWzJdLCBcImdcIikpLCAociA9IE8pKVxyXG4gICAgICAgICAgICA6IHZvaWQgMCAhPT0gaFszXSAmJiAociA9IE8pXHJcbiAgICAgICAgICA6IHIgPT09IE9cclxuICAgICAgICAgID8gXCI+XCIgPT09IGhbMF1cclxuICAgICAgICAgICAgPyAoKHIgPSBudWxsICE9IG4gPyBuIDogViksICh1ID0gLTEpKVxyXG4gICAgICAgICAgICA6IHZvaWQgMCA9PT0gaFsxXVxyXG4gICAgICAgICAgICA/ICh1ID0gLTIpXHJcbiAgICAgICAgICAgIDogKCh1ID0gci5sYXN0SW5kZXggLSBoWzJdLmxlbmd0aCksIChsID0gaFsxXSksIChyID0gdm9pZCAwID09PSBoWzNdID8gTyA6ICdcIicgPT09IGhbM10gPyBqIDogTCkpXHJcbiAgICAgICAgICA6IHIgPT09IGogfHwgciA9PT0gTFxyXG4gICAgICAgICAgPyAociA9IE8pXHJcbiAgICAgICAgICA6IHIgPT09IFIgfHwgciA9PT0gTlxyXG4gICAgICAgICAgPyAociA9IFYpXHJcbiAgICAgICAgICA6ICgociA9IE8pLCAobiA9IHZvaWQgMCkpO1xyXG4gICAgY29uc3QgZCA9IHIgPT09IE8gJiYgdFtpICsgMV0uc3RhcnRzV2l0aChcIi8+XCIpID8gXCIgXCIgOiBcIlwiO1xyXG4gICAgbyArPVxyXG4gICAgICByID09PSBWXHJcbiAgICAgICAgPyBzICsgRVxyXG4gICAgICAgIDogdSA+PSAwXHJcbiAgICAgICAgPyAoZS5wdXNoKGwpLCBzLnNsaWNlKDAsIHUpICsgUyArIHMuc2xpY2UodSkgKyBUICsgZClcclxuICAgICAgICA6IHMgKyBUICsgKC0yID09PSB1ID8gKGUucHVzaCh2b2lkIDApLCBpKSA6IGQpO1xyXG4gIH1cclxuICByZXR1cm4gW0YodCwgbyArICh0W3NdIHx8IFwiPD8+XCIpICsgKDIgPT09IGkgPyBcIjwvc3ZnPlwiIDogXCJcIikpLCBlXTtcclxufTtcclxuY2xhc3MgSiB7XHJcbiAgY29uc3RydWN0b3IoeyBzdHJpbmdzOiB0LCBfJGxpdFR5cGUkOiBpIH0sIHMpIHtcclxuICAgIGxldCBlO1xyXG4gICAgdGhpcy5wYXJ0cyA9IFtdO1xyXG4gICAgbGV0IG4gPSAwLFxyXG4gICAgICBvID0gMDtcclxuICAgIGNvbnN0IHIgPSB0Lmxlbmd0aCAtIDEsXHJcbiAgICAgIGwgPSB0aGlzLnBhcnRzLFxyXG4gICAgICBbaCwgdV0gPSBHKHQsIGkpO1xyXG4gICAgaWYgKCgodGhpcy5lbCA9IEouY3JlYXRlRWxlbWVudChoLCBzKSksIChxLmN1cnJlbnROb2RlID0gdGhpcy5lbC5jb250ZW50KSwgMiA9PT0gaSkpIHtcclxuICAgICAgY29uc3QgdCA9IHRoaXMuZWwuY29udGVudCxcclxuICAgICAgICBpID0gdC5maXJzdENoaWxkO1xyXG4gICAgICBpLnJlbW92ZSgpLCB0LmFwcGVuZCguLi5pLmNoaWxkTm9kZXMpO1xyXG4gICAgfVxyXG4gICAgZm9yICg7IG51bGwgIT09IChlID0gcS5uZXh0Tm9kZSgpKSAmJiBsLmxlbmd0aCA8IHI7ICkge1xyXG4gICAgICBpZiAoMSA9PT0gZS5ub2RlVHlwZSkge1xyXG4gICAgICAgIGlmIChlLmhhc0F0dHJpYnV0ZXMoKSkge1xyXG4gICAgICAgICAgY29uc3QgdCA9IFtdO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBpIG9mIGUuZ2V0QXR0cmlidXRlTmFtZXMoKSlcclxuICAgICAgICAgICAgaWYgKGkuZW5kc1dpdGgoUykgfHwgaS5zdGFydHNXaXRoKFQpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcyA9IHVbbysrXTtcclxuICAgICAgICAgICAgICBpZiAoKHQucHVzaChpKSwgdm9pZCAwICE9PSBzKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdCA9IGUuZ2V0QXR0cmlidXRlKHMudG9Mb3dlckNhc2UoKSArIFMpLnNwbGl0KFQpLFxyXG4gICAgICAgICAgICAgICAgICBpID0gLyhbLj9AXSk/KC4qKS8uZXhlYyhzKTtcclxuICAgICAgICAgICAgICAgIGwucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgIGluZGV4OiBuLFxyXG4gICAgICAgICAgICAgICAgICBuYW1lOiBpWzJdLFxyXG4gICAgICAgICAgICAgICAgICBzdHJpbmdzOiB0LFxyXG4gICAgICAgICAgICAgICAgICBjdG9yOiBcIi5cIiA9PT0gaVsxXSA/IHR0IDogXCI/XCIgPT09IGlbMV0gPyBzdCA6IFwiQFwiID09PSBpWzFdID8gZXQgOiBYLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGwucHVzaCh7IHR5cGU6IDYsIGluZGV4OiBuIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdCkgZS5yZW1vdmVBdHRyaWJ1dGUoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh6LnRlc3QoZS50YWdOYW1lKSkge1xyXG4gICAgICAgICAgY29uc3QgdCA9IGUudGV4dENvbnRlbnQuc3BsaXQoVCksXHJcbiAgICAgICAgICAgIGkgPSB0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgZS50ZXh0Q29udGVudCA9IF8gPyBfLmVtcHR5U2NyaXB0IDogXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBpOyBzKyspIGUuYXBwZW5kKHRbc10sIEEoKSksIHEubmV4dE5vZGUoKSwgbC5wdXNoKHsgdHlwZTogMiwgaW5kZXg6ICsrbiB9KTtcclxuICAgICAgICAgICAgZS5hcHBlbmQodFtpXSwgQSgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoOCA9PT0gZS5ub2RlVHlwZSlcclxuICAgICAgICBpZiAoZS5kYXRhID09PSB4KSBsLnB1c2goeyB0eXBlOiAyLCBpbmRleDogbiB9KTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxldCB0ID0gLTE7XHJcbiAgICAgICAgICBmb3IgKDsgLTEgIT09ICh0ID0gZS5kYXRhLmluZGV4T2YoVCwgdCArIDEpKTsgKSBsLnB1c2goeyB0eXBlOiA3LCBpbmRleDogbiB9KSwgKHQgKz0gVC5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIG4rKztcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGNyZWF0ZUVsZW1lbnQodCwgaSkge1xyXG4gICAgY29uc3QgcyA9IEMuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xyXG4gICAgcmV0dXJuIChzLmlubmVySFRNTCA9IHQpLCBzO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBLKHQsIGksIHMgPSB0LCBlKSB7XHJcbiAgdmFyIG4sIG8sIHIsIGw7XHJcbiAgaWYgKGkgPT09IEQpIHJldHVybiBpO1xyXG4gIGxldCBoID0gdm9pZCAwICE9PSBlID8gKG51bGwgPT09IChuID0gcy5BKSB8fCB2b2lkIDAgPT09IG4gPyB2b2lkIDAgOiBuW2VdKSA6IHMuaztcclxuICBjb25zdCB1ID0gayhpKSA/IHZvaWQgMCA6IGkuXyRsaXREaXJlY3RpdmUkO1xyXG4gIHJldHVybiAoXHJcbiAgICAobnVsbCA9PSBoID8gdm9pZCAwIDogaC5jb25zdHJ1Y3RvcikgIT09IHUgJiZcclxuICAgICAgKG51bGwgPT09IChvID0gbnVsbCA9PSBoID8gdm9pZCAwIDogaC5fJEFPKSB8fCB2b2lkIDAgPT09IG8gfHwgby5jYWxsKGgsICExKSxcclxuICAgICAgdm9pZCAwID09PSB1ID8gKGggPSB2b2lkIDApIDogKChoID0gbmV3IHUodCkpLCBoLl8kQVQodCwgcywgZSkpLFxyXG4gICAgICB2b2lkIDAgIT09IGUgPyAoKG51bGwgIT09IChyID0gKGwgPSBzKS5BKSAmJiB2b2lkIDAgIT09IHIgPyByIDogKGwuQSA9IFtdKSlbZV0gPSBoKSA6IChzLmsgPSBoKSksXHJcbiAgICB2b2lkIDAgIT09IGggJiYgKGkgPSBLKHQsIGguXyRBUyh0LCBpLnZhbHVlcyksIGgsIGUpKSxcclxuICAgIGlcclxuICApO1xyXG59XHJcbmNsYXNzIFkge1xyXG4gIGNvbnN0cnVjdG9yKHQsIGkpIHtcclxuICAgICh0aGlzLl8kQVYgPSBbXSksICh0aGlzLl8kQU4gPSB2b2lkIDApLCAodGhpcy5fJEFEID0gdCksICh0aGlzLl8kQU0gPSBpKTtcclxuICB9XHJcbiAgZ2V0IHBhcmVudE5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fJEFNLnBhcmVudE5vZGU7XHJcbiAgfVxyXG4gIGdldCBfJEFVKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuXyRBTS5fJEFVO1xyXG4gIH1cclxuICBNKHQpIHtcclxuICAgIHZhciBpO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICAgIGVsOiB7IGNvbnRlbnQ6IHMgfSxcclxuICAgICAgICBwYXJ0czogZSxcclxuICAgICAgfSA9IHRoaXMuXyRBRCxcclxuICAgICAgbiA9IChudWxsICE9PSAoaSA9IG51bGwgPT0gdCA/IHZvaWQgMCA6IHQuY3JlYXRpb25TY29wZSkgJiYgdm9pZCAwICE9PSBpID8gaSA6IEMpLmltcG9ydE5vZGUocywgITApO1xyXG4gICAgcS5jdXJyZW50Tm9kZSA9IG47XHJcbiAgICBsZXQgbyA9IHEubmV4dE5vZGUoKSxcclxuICAgICAgciA9IDAsXHJcbiAgICAgIGwgPSAwLFxyXG4gICAgICBoID0gZVswXTtcclxuICAgIGZvciAoOyB2b2lkIDAgIT09IGg7ICkge1xyXG4gICAgICBpZiAociA9PT0gaC5pbmRleCkge1xyXG4gICAgICAgIGxldCBpO1xyXG4gICAgICAgIDIgPT09IGgudHlwZVxyXG4gICAgICAgICAgPyAoaSA9IG5ldyBRKG8sIG8ubmV4dFNpYmxpbmcsIHRoaXMsIHQpKVxyXG4gICAgICAgICAgOiAxID09PSBoLnR5cGVcclxuICAgICAgICAgID8gKGkgPSBuZXcgaC5jdG9yKG8sIGgubmFtZSwgaC5zdHJpbmdzLCB0aGlzLCB0KSlcclxuICAgICAgICAgIDogNiA9PT0gaC50eXBlICYmIChpID0gbmV3IG50KG8sIHRoaXMsIHQpKSxcclxuICAgICAgICAgIHRoaXMuXyRBVi5wdXNoKGkpLFxyXG4gICAgICAgICAgKGggPSBlWysrbF0pO1xyXG4gICAgICB9XHJcbiAgICAgIHIgIT09IChudWxsID09IGggPyB2b2lkIDAgOiBoLmluZGV4KSAmJiAoKG8gPSBxLm5leHROb2RlKCkpLCByKyspO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChxLmN1cnJlbnROb2RlID0gQyksIG47XHJcbiAgfVxyXG4gIFUodCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuXyRBVilcclxuICAgICAgdm9pZCAwICE9PSBzICYmICh2b2lkIDAgIT09IHMuc3RyaW5ncyA/IChzLl8kQUkodCwgcywgaSksIChpICs9IHMuc3RyaW5ncy5sZW5ndGggLSAyKSkgOiBzLl8kQUkodFtpXSkpLFxyXG4gICAgICAgIGkrKztcclxuICB9XHJcbn1cclxuY2xhc3MgUSB7XHJcbiAgY29uc3RydWN0b3IodCwgaSwgcywgZSkge1xyXG4gICAgdmFyIG47XHJcbiAgICAodGhpcy50eXBlID0gMiksXHJcbiAgICAgICh0aGlzLl8kQUggPSBXKSxcclxuICAgICAgKHRoaXMuXyRBTiA9IHZvaWQgMCksXHJcbiAgICAgICh0aGlzLl8kQUEgPSB0KSxcclxuICAgICAgKHRoaXMuXyRBQiA9IGkpLFxyXG4gICAgICAodGhpcy5fJEFNID0gcyksXHJcbiAgICAgICh0aGlzLm9wdGlvbnMgPSBlKSxcclxuICAgICAgKHRoaXMuTiA9IG51bGwgPT09IChuID0gbnVsbCA9PSBlID8gdm9pZCAwIDogZS5pc0Nvbm5lY3RlZCkgfHwgdm9pZCAwID09PSBuIHx8IG4pO1xyXG4gIH1cclxuICBnZXQgXyRBVSgpIHtcclxuICAgIHZhciB0LCBpO1xyXG4gICAgcmV0dXJuIG51bGwgIT09IChpID0gbnVsbCA9PT0gKHQgPSB0aGlzLl8kQU0pIHx8IHZvaWQgMCA9PT0gdCA/IHZvaWQgMCA6IHQuXyRBVSkgJiYgdm9pZCAwICE9PSBpXHJcbiAgICAgID8gaVxyXG4gICAgICA6IHRoaXMuTjtcclxuICB9XHJcbiAgZ2V0IHBhcmVudE5vZGUoKSB7XHJcbiAgICBsZXQgdCA9IHRoaXMuXyRBQS5wYXJlbnROb2RlO1xyXG4gICAgY29uc3QgaSA9IHRoaXMuXyRBTTtcclxuICAgIHJldHVybiB2b2lkIDAgIT09IGkgJiYgMTEgPT09IChudWxsID09IHQgPyB2b2lkIDAgOiB0Lm5vZGVUeXBlKSAmJiAodCA9IGkucGFyZW50Tm9kZSksIHQ7XHJcbiAgfVxyXG4gIGdldCBzdGFydE5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fJEFBO1xyXG4gIH1cclxuICBnZXQgZW5kTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl8kQUI7XHJcbiAgfVxyXG4gIF8kQUkodCwgaSA9IHRoaXMpIHtcclxuICAgICh0ID0gSyh0aGlzLCB0LCBpKSksXHJcbiAgICAgIGsodClcclxuICAgICAgICA/IHQgPT09IFcgfHwgbnVsbCA9PSB0IHx8IFwiXCIgPT09IHRcclxuICAgICAgICAgID8gKHRoaXMuXyRBSCAhPT0gVyAmJiB0aGlzLl8kQVIoKSwgKHRoaXMuXyRBSCA9IFcpKVxyXG4gICAgICAgICAgOiB0ICE9PSB0aGlzLl8kQUggJiYgdCAhPT0gRCAmJiB0aGlzLlIodClcclxuICAgICAgICA6IHZvaWQgMCAhPT0gdC5fJGxpdFR5cGUkXHJcbiAgICAgICAgPyB0aGlzLk8odClcclxuICAgICAgICA6IHZvaWQgMCAhPT0gdC5ub2RlVHlwZVxyXG4gICAgICAgID8gdGhpcy5WKHQpXHJcbiAgICAgICAgOiBQKHQpXHJcbiAgICAgICAgPyB0aGlzLmoodClcclxuICAgICAgICA6IHRoaXMuUih0KTtcclxuICB9XHJcbiAgTCh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fJEFBLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsIHRoaXMuXyRBQik7XHJcbiAgfVxyXG4gIFYodCkge1xyXG4gICAgdGhpcy5fJEFIICE9PSB0ICYmICh0aGlzLl8kQVIoKSwgKHRoaXMuXyRBSCA9IHRoaXMuTCh0KSkpO1xyXG4gIH1cclxuICBSKHQpIHtcclxuICAgIHRoaXMuXyRBSCAhPT0gVyAmJiBrKHRoaXMuXyRBSCkgPyAodGhpcy5fJEFBLm5leHRTaWJsaW5nLmRhdGEgPSB0KSA6IHRoaXMuVihDLmNyZWF0ZVRleHROb2RlKHQpKSxcclxuICAgICAgKHRoaXMuXyRBSCA9IHQpO1xyXG4gIH1cclxuICBPKHQpIHtcclxuICAgIHZhciBpO1xyXG4gICAgY29uc3QgeyB2YWx1ZXM6IHMsIF8kbGl0VHlwZSQ6IGUgfSA9IHQsXHJcbiAgICAgIG4gPVxyXG4gICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGVcclxuICAgICAgICAgID8gdGhpcy5fJEFDKHQpXHJcbiAgICAgICAgICA6ICh2b2lkIDAgPT09IGUuZWwgJiYgKGUuZWwgPSBKLmNyZWF0ZUVsZW1lbnQoRihlLmgsIGUuaFswXSksIHRoaXMub3B0aW9ucykpLCBlKTtcclxuICAgIGlmICgobnVsbCA9PT0gKGkgPSB0aGlzLl8kQUgpIHx8IHZvaWQgMCA9PT0gaSA/IHZvaWQgMCA6IGkuXyRBRCkgPT09IG4pIHRoaXMuXyRBSC5VKHMpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IHQgPSBuZXcgWShuLCB0aGlzKSxcclxuICAgICAgICBpID0gdC5NKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHQuVShzKSwgdGhpcy5WKGkpLCAodGhpcy5fJEFIID0gdCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIF8kQUModCkge1xyXG4gICAgbGV0IGkgPSBaLmdldCh0LnN0cmluZ3MpO1xyXG4gICAgcmV0dXJuIHZvaWQgMCA9PT0gaSAmJiBaLnNldCh0LnN0cmluZ3MsIChpID0gbmV3IEoodCkpKSwgaTtcclxuICB9XHJcbiAgaih0KSB7XHJcbiAgICBNKHRoaXMuXyRBSCkgfHwgKCh0aGlzLl8kQUggPSBbXSksIHRoaXMuXyRBUigpKTtcclxuICAgIGNvbnN0IGkgPSB0aGlzLl8kQUg7XHJcbiAgICBsZXQgcyxcclxuICAgICAgZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IG4gb2YgdClcclxuICAgICAgZSA9PT0gaS5sZW5ndGggPyBpLnB1c2goKHMgPSBuZXcgUSh0aGlzLkwoQSgpKSwgdGhpcy5MKEEoKSksIHRoaXMsIHRoaXMub3B0aW9ucykpKSA6IChzID0gaVtlXSksXHJcbiAgICAgICAgcy5fJEFJKG4pLFxyXG4gICAgICAgIGUrKztcclxuICAgIGUgPCBpLmxlbmd0aCAmJiAodGhpcy5fJEFSKHMgJiYgcy5fJEFCLm5leHRTaWJsaW5nLCBlKSwgKGkubGVuZ3RoID0gZSkpO1xyXG4gIH1cclxuICBfJEFSKHQgPSB0aGlzLl8kQUEubmV4dFNpYmxpbmcsIGkpIHtcclxuICAgIHZhciBzO1xyXG4gICAgZm9yIChudWxsID09PSAocyA9IHRoaXMuXyRBUCkgfHwgdm9pZCAwID09PSBzIHx8IHMuY2FsbCh0aGlzLCAhMSwgITAsIGkpOyB0ICYmIHQgIT09IHRoaXMuXyRBQjsgKSB7XHJcbiAgICAgIGNvbnN0IGkgPSB0Lm5leHRTaWJsaW5nO1xyXG4gICAgICB0LnJlbW92ZSgpLCAodCA9IGkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRDb25uZWN0ZWQodCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB2b2lkIDAgPT09IHRoaXMuXyRBTSAmJiAoKHRoaXMuTiA9IHQpLCBudWxsID09PSAoaSA9IHRoaXMuXyRBUCkgfHwgdm9pZCAwID09PSBpIHx8IGkuY2FsbCh0aGlzLCB0KSk7XHJcbiAgfVxyXG59XHJcbmNsYXNzIFgge1xyXG4gIGNvbnN0cnVjdG9yKHQsIGksIHMsIGUsIG4pIHtcclxuICAgICh0aGlzLnR5cGUgPSAxKSxcclxuICAgICAgKHRoaXMuXyRBSCA9IFcpLFxyXG4gICAgICAodGhpcy5fJEFOID0gdm9pZCAwKSxcclxuICAgICAgKHRoaXMuZWxlbWVudCA9IHQpLFxyXG4gICAgICAodGhpcy5uYW1lID0gaSksXHJcbiAgICAgICh0aGlzLl8kQU0gPSBlKSxcclxuICAgICAgKHRoaXMub3B0aW9ucyA9IG4pLFxyXG4gICAgICBzLmxlbmd0aCA+IDIgfHwgXCJcIiAhPT0gc1swXSB8fCBcIlwiICE9PSBzWzFdXHJcbiAgICAgICAgPyAoKHRoaXMuXyRBSCA9IEFycmF5KHMubGVuZ3RoIC0gMSkuZmlsbChuZXcgU3RyaW5nKCkpKSwgKHRoaXMuc3RyaW5ncyA9IHMpKVxyXG4gICAgICAgIDogKHRoaXMuXyRBSCA9IFcpO1xyXG4gIH1cclxuICBnZXQgdGFnTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQudGFnTmFtZTtcclxuICB9XHJcbiAgZ2V0IF8kQVUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fJEFNLl8kQVU7XHJcbiAgfVxyXG4gIF8kQUkodCwgaSA9IHRoaXMsIHMsIGUpIHtcclxuICAgIGNvbnN0IG4gPSB0aGlzLnN0cmluZ3M7XHJcbiAgICBsZXQgbyA9ICExO1xyXG4gICAgaWYgKHZvaWQgMCA9PT0gbilcclxuICAgICAgKHQgPSBLKHRoaXMsIHQsIGksIDApKSwgKG8gPSAhayh0KSB8fCAodCAhPT0gdGhpcy5fJEFIICYmIHQgIT09IEQpKSwgbyAmJiAodGhpcy5fJEFIID0gdCk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgY29uc3QgZSA9IHQ7XHJcbiAgICAgIGxldCByLCBsO1xyXG4gICAgICBmb3IgKHQgPSBuWzBdLCByID0gMDsgciA8IG4ubGVuZ3RoIC0gMTsgcisrKVxyXG4gICAgICAgIChsID0gSyh0aGlzLCBlW3MgKyByXSwgaSwgcikpLFxyXG4gICAgICAgICAgbCA9PT0gRCAmJiAobCA9IHRoaXMuXyRBSFtyXSksXHJcbiAgICAgICAgICBvIHx8IChvID0gIWsobCkgfHwgbCAhPT0gdGhpcy5fJEFIW3JdKSxcclxuICAgICAgICAgIGwgPT09IFcgPyAodCA9IFcpIDogdCAhPT0gVyAmJiAodCArPSAobnVsbCAhPSBsID8gbCA6IFwiXCIpICsgbltyICsgMV0pLFxyXG4gICAgICAgICAgKHRoaXMuXyRBSFtyXSA9IGwpO1xyXG4gICAgfVxyXG4gICAgbyAmJiAhZSAmJiB0aGlzLkkodCk7XHJcbiAgfVxyXG4gIEkodCkge1xyXG4gICAgdCA9PT0gV1xyXG4gICAgICA/IHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKVxyXG4gICAgICA6IHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCBudWxsICE9IHQgPyB0IDogXCJcIik7XHJcbiAgfVxyXG59XHJcbmNsYXNzIHR0IGV4dGVuZHMgWCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlciguLi5hcmd1bWVudHMpLCAodGhpcy50eXBlID0gMyk7XHJcbiAgfVxyXG4gIEkodCkge1xyXG4gICAgdGhpcy5lbGVtZW50W3RoaXMubmFtZV0gPSB0ID09PSBXID8gdm9pZCAwIDogdDtcclxuICB9XHJcbn1cclxuY29uc3QgaXQgPSBfID8gXy5lbXB0eVNjcmlwdCA6IFwiXCI7XHJcbmNsYXNzIHN0IGV4dGVuZHMgWCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlciguLi5hcmd1bWVudHMpLCAodGhpcy50eXBlID0gNCk7XHJcbiAgfVxyXG4gIEkodCkge1xyXG4gICAgdCAmJiB0ICE9PSBXID8gdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsIGl0KSA6IHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKTtcclxuICB9XHJcbn1cclxuY2xhc3MgZXQgZXh0ZW5kcyBYIHtcclxuICBjb25zdHJ1Y3Rvcih0LCBpLCBzLCBlLCBuKSB7XHJcbiAgICBzdXBlcih0LCBpLCBzLCBlLCBuKSwgKHRoaXMudHlwZSA9IDUpO1xyXG4gIH1cclxuICBfJEFJKHQsIGkgPSB0aGlzKSB7XHJcbiAgICB2YXIgcztcclxuICAgIGlmICgodCA9IG51bGwgIT09IChzID0gSyh0aGlzLCB0LCBpLCAwKSkgJiYgdm9pZCAwICE9PSBzID8gcyA6IFcpID09PSBEKSByZXR1cm47XHJcbiAgICBjb25zdCBlID0gdGhpcy5fJEFILFxyXG4gICAgICBuID0gKHQgPT09IFcgJiYgZSAhPT0gVykgfHwgdC5jYXB0dXJlICE9PSBlLmNhcHR1cmUgfHwgdC5vbmNlICE9PSBlLm9uY2UgfHwgdC5wYXNzaXZlICE9PSBlLnBhc3NpdmUsXHJcbiAgICAgIG8gPSB0ICE9PSBXICYmIChlID09PSBXIHx8IG4pO1xyXG4gICAgbiAmJiB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWUsIHRoaXMsIGUpLFxyXG4gICAgICBvICYmIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMubmFtZSwgdGhpcywgdCksXHJcbiAgICAgICh0aGlzLl8kQUggPSB0KTtcclxuICB9XHJcbiAgaGFuZGxlRXZlbnQodCkge1xyXG4gICAgdmFyIGksIHM7XHJcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMuXyRBSFxyXG4gICAgICA/IHRoaXMuXyRBSC5jYWxsKFxyXG4gICAgICAgICAgbnVsbCAhPT0gKHMgPSBudWxsID09PSAoaSA9IHRoaXMub3B0aW9ucykgfHwgdm9pZCAwID09PSBpID8gdm9pZCAwIDogaS5ob3N0KSAmJiB2b2lkIDAgIT09IHNcclxuICAgICAgICAgICAgPyBzXHJcbiAgICAgICAgICAgIDogdGhpcy5lbGVtZW50LFxyXG4gICAgICAgICAgdFxyXG4gICAgICAgIClcclxuICAgICAgOiB0aGlzLl8kQUguaGFuZGxlRXZlbnQodCk7XHJcbiAgfVxyXG59XHJcbmNsYXNzIG50IHtcclxuICBjb25zdHJ1Y3Rvcih0LCBpLCBzKSB7XHJcbiAgICAodGhpcy5lbGVtZW50ID0gdCksICh0aGlzLnR5cGUgPSA2KSwgKHRoaXMuXyRBTiA9IHZvaWQgMCksICh0aGlzLl8kQU0gPSBpKSwgKHRoaXMub3B0aW9ucyA9IHMpO1xyXG4gIH1cclxuICBnZXQgXyRBVSgpIHtcclxuICAgIHJldHVybiB0aGlzLl8kQU0uXyRBVTtcclxuICB9XHJcbiAgXyRBSSh0KSB7XHJcbiAgICBLKHRoaXMsIHQpO1xyXG4gIH1cclxufVxyXG5jb25zdCBvdCA9IHsgSDogUywgQjogVCwgRDogeCwgcTogMSwgSjogRywgVzogWSwgWjogUCwgRjogSywgRzogUSwgSzogWCwgWDogc3QsIFk6IGV0LCB0dCwgaXQ6IG50IH0sXHJcbiAgcnQgPSB3LmxpdEh0bWxQb2x5ZmlsbFN1cHBvcnQ7XHJcbm51bGwgPT0gcnQgfHwgcnQoSiwgUSksXHJcbiAgKG51bGwgIT09IChnID0gdy5saXRIdG1sVmVyc2lvbnMpICYmIHZvaWQgMCAhPT0gZyA/IGcgOiAody5saXRIdG1sVmVyc2lvbnMgPSBbXSkpLnB1c2goXCIyLjguMFwiKTtcclxuY29uc3QgbHQgPSAodCwgaSwgcykgPT4ge1xyXG4gIHZhciBlLCBuO1xyXG4gIGNvbnN0IG8gPSBudWxsICE9PSAoZSA9IG51bGwgPT0gcyA/IHZvaWQgMCA6IHMucmVuZGVyQmVmb3JlKSAmJiB2b2lkIDAgIT09IGUgPyBlIDogaTtcclxuICBsZXQgciA9IG8uXyRsaXRQYXJ0JDtcclxuICBpZiAodm9pZCAwID09PSByKSB7XHJcbiAgICBjb25zdCB0ID0gbnVsbCAhPT0gKG4gPSBudWxsID09IHMgPyB2b2lkIDAgOiBzLnJlbmRlckJlZm9yZSkgJiYgdm9pZCAwICE9PSBuID8gbiA6IG51bGw7XHJcbiAgICBvLl8kbGl0UGFydCQgPSByID0gbmV3IFEoaS5pbnNlcnRCZWZvcmUoQSgpLCB0KSwgdCwgdm9pZCAwLCBudWxsICE9IHMgPyBzIDoge30pO1xyXG4gIH1cclxuICByZXR1cm4gci5fJEFJKHQpLCByO1xyXG59O1xyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLyB2YXIgaHQsIHV0O1xyXG5jb25zdCBjdCA9IG07XHJcbmNsYXNzIGR0IGV4dGVuZHMgbSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlciguLi5hcmd1bWVudHMpLCAodGhpcy5yZW5kZXJPcHRpb25zID0geyBob3N0OiB0aGlzIH0pLCAodGhpcy5zdCA9IHZvaWQgMCk7XHJcbiAgfVxyXG4gIGNyZWF0ZVJlbmRlclJvb3QoKSB7XHJcbiAgICB2YXIgdCwgaTtcclxuICAgIGNvbnN0IHMgPSBzdXBlci5jcmVhdGVSZW5kZXJSb290KCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAobnVsbCAhPT0gKHQgPSAoaSA9IHRoaXMucmVuZGVyT3B0aW9ucykucmVuZGVyQmVmb3JlKSAmJiB2b2lkIDAgIT09IHQpIHx8XHJcbiAgICAgICAgKGkucmVuZGVyQmVmb3JlID0gcy5maXJzdENoaWxkKSxcclxuICAgICAgc1xyXG4gICAgKTtcclxuICB9XHJcbiAgdXBkYXRlKHQpIHtcclxuICAgIGNvbnN0IGkgPSB0aGlzLnJlbmRlcigpO1xyXG4gICAgdGhpcy5oYXNVcGRhdGVkIHx8ICh0aGlzLnJlbmRlck9wdGlvbnMuaXNDb25uZWN0ZWQgPSB0aGlzLmlzQ29ubmVjdGVkKSxcclxuICAgICAgc3VwZXIudXBkYXRlKHQpLFxyXG4gICAgICAodGhpcy5zdCA9IGx0KGksIHRoaXMucmVuZGVyUm9vdCwgdGhpcy5yZW5kZXJPcHRpb25zKSk7XHJcbiAgfVxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdmFyIHQ7XHJcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpLCBudWxsID09PSAodCA9IHRoaXMuc3QpIHx8IHZvaWQgMCA9PT0gdCB8fCB0LnNldENvbm5lY3RlZCghMCk7XHJcbiAgfVxyXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdmFyIHQ7XHJcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpLCBudWxsID09PSAodCA9IHRoaXMuc3QpIHx8IHZvaWQgMCA9PT0gdCB8fCB0LnNldENvbm5lY3RlZCghMSk7XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiBEO1xyXG4gIH1cclxufVxyXG4oZHQuZmluYWxpemVkID0gITApLFxyXG4gIChkdC5fJGxpdEVsZW1lbnQkID0gITApLFxyXG4gIG51bGwgPT09IChodCA9IGdsb2JhbFRoaXMubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0KSB8fFxyXG4gICAgdm9pZCAwID09PSBodCB8fFxyXG4gICAgaHQuY2FsbChnbG9iYWxUaGlzLCB7IExpdEVsZW1lbnQ6IGR0IH0pO1xyXG5jb25zdCBhdCA9IGdsb2JhbFRoaXMubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcclxubnVsbCA9PSBhdCB8fCBhdCh7IExpdEVsZW1lbnQ6IGR0IH0pO1xyXG5jb25zdCB2dCA9IHtcclxuICBfJEFLOiAodCwgaSwgcykgPT4ge1xyXG4gICAgdC5fJEFLKGksIHMpO1xyXG4gIH0sXHJcbiAgXyRBTDogdCA9PiB0Ll8kQUwsXHJcbn07XHJcbihudWxsICE9PSAodXQgPSBnbG9iYWxUaGlzLmxpdEVsZW1lbnRWZXJzaW9ucykgJiYgdm9pZCAwICE9PSB1dFxyXG4gID8gdXRcclxuICA6IChnbG9iYWxUaGlzLmxpdEVsZW1lbnRWZXJzaW9ucyA9IFtdKVxyXG4pLnB1c2goXCIzLjMuM1wiKTtcclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIyIEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi9cclxuY29uc3QgZnQgPSAhMSxcclxuICB7IEc6IHB0IH0gPSBvdCxcclxuICB5dCA9IHQgPT4gbnVsbCA9PT0gdCB8fCAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIHQpLFxyXG4gIGJ0ID0geyBIVE1MOiAxLCBTVkc6IDIgfSxcclxuICBtdCA9ICh0LCBpKSA9PlxyXG4gICAgdm9pZCAwID09PSBpID8gdm9pZCAwICE9PSAobnVsbCA9PSB0ID8gdm9pZCAwIDogdC5fJGxpdFR5cGUkKSA6IChudWxsID09IHQgPyB2b2lkIDAgOiB0Ll8kbGl0VHlwZSQpID09PSBpLFxyXG4gIGd0ID0gdCA9PiB7XHJcbiAgICB2YXIgaTtcclxuICAgIHJldHVybiBudWxsICE9IChudWxsID09PSAoaSA9IG51bGwgPT0gdCA/IHZvaWQgMCA6IHQuXyRsaXRUeXBlJCkgfHwgdm9pZCAwID09PSBpID8gdm9pZCAwIDogaS5oKTtcclxuICB9LFxyXG4gIHd0ID0gdCA9PiB2b2lkIDAgIT09IChudWxsID09IHQgPyB2b2lkIDAgOiB0Ll8kbGl0RGlyZWN0aXZlJCksXHJcbiAgX3QgPSB0ID0+IChudWxsID09IHQgPyB2b2lkIDAgOiB0Ll8kbGl0RGlyZWN0aXZlJCksXHJcbiAgJHQgPSB0ID0+IHZvaWQgMCA9PT0gdC5zdHJpbmdzLFxyXG4gIFN0ID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSxcclxuICBUdCA9ICh0LCBpLCBzKSA9PiB7XHJcbiAgICB2YXIgZTtcclxuICAgIGNvbnN0IG4gPSB0Ll8kQUEucGFyZW50Tm9kZSxcclxuICAgICAgbyA9IHZvaWQgMCA9PT0gaSA/IHQuXyRBQiA6IGkuXyRBQTtcclxuICAgIGlmICh2b2lkIDAgPT09IHMpIHtcclxuICAgICAgY29uc3QgaSA9IG4uaW5zZXJ0QmVmb3JlKFN0KCksIG8pLFxyXG4gICAgICAgIGUgPSBuLmluc2VydEJlZm9yZShTdCgpLCBvKTtcclxuICAgICAgcyA9IG5ldyBwdChpLCBlLCB0LCB0Lm9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaSA9IHMuXyRBQi5uZXh0U2libGluZyxcclxuICAgICAgICByID0gcy5fJEFNLFxyXG4gICAgICAgIGwgPSByICE9PSB0O1xyXG4gICAgICBpZiAobCkge1xyXG4gICAgICAgIGxldCBpO1xyXG4gICAgICAgIG51bGwgPT09IChlID0gcy5fJEFRKSB8fCB2b2lkIDAgPT09IGUgfHwgZS5jYWxsKHMsIHQpLFxyXG4gICAgICAgICAgKHMuXyRBTSA9IHQpLFxyXG4gICAgICAgICAgdm9pZCAwICE9PSBzLl8kQVAgJiYgKGkgPSB0Ll8kQVUpICE9PSByLl8kQVUgJiYgcy5fJEFQKGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpICE9PSBvIHx8IGwpIHtcclxuICAgICAgICBsZXQgdCA9IHMuXyRBQTtcclxuICAgICAgICBmb3IgKDsgdCAhPT0gaTsgKSB7XHJcbiAgICAgICAgICBjb25zdCBpID0gdC5uZXh0U2libGluZztcclxuICAgICAgICAgIG4uaW5zZXJ0QmVmb3JlKHQsIG8pLCAodCA9IGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM7XHJcbiAgfSxcclxuICB4dCA9ICh0LCBpLCBzID0gdCkgPT4gKHQuXyRBSShpLCBzKSwgdCksXHJcbiAgRXQgPSB7fSxcclxuICBDdCA9ICh0LCBpID0gRXQpID0+ICh0Ll8kQUggPSBpKSxcclxuICBBdCA9IHQgPT4gdC5fJEFILFxyXG4gIGt0ID0gdCA9PiB7XHJcbiAgICB2YXIgaTtcclxuICAgIG51bGwgPT09IChpID0gdC5fJEFQKSB8fCB2b2lkIDAgPT09IGkgfHwgaS5jYWxsKHQsICExLCAhMCk7XHJcbiAgICBsZXQgcyA9IHQuXyRBQTtcclxuICAgIGNvbnN0IGUgPSB0Ll8kQUIubmV4dFNpYmxpbmc7XHJcbiAgICBmb3IgKDsgcyAhPT0gZTsgKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBzLm5leHRTaWJsaW5nO1xyXG4gICAgICBzLnJlbW92ZSgpLCAocyA9IHQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgTXQgPSB0ID0+IHtcclxuICAgIHQuXyRBUigpO1xyXG4gIH0sXHJcbiAgUHQgPSB7IEFUVFJJQlVURTogMSwgQ0hJTEQ6IDIsIFBST1BFUlRZOiAzLCBCT09MRUFOX0FUVFJJQlVURTogNCwgRVZFTlQ6IDUsIEVMRU1FTlQ6IDYgfSxcclxuICBVdCA9XHJcbiAgICB0ID0+XHJcbiAgICAoLi4uaSkgPT4gKHsgXyRsaXREaXJlY3RpdmUkOiB0LCB2YWx1ZXM6IGkgfSk7XHJcbmNsYXNzIFZ0IHtcclxuICBjb25zdHJ1Y3Rvcih0KSB7fVxyXG4gIGdldCBfJEFVKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuXyRBTS5fJEFVO1xyXG4gIH1cclxuICBfJEFUKHQsIGksIHMpIHtcclxuICAgICh0aGlzLmV0ID0gdCksICh0aGlzLl8kQU0gPSBpKSwgKHRoaXMubnQgPSBzKTtcclxuICB9XHJcbiAgXyRBUyh0LCBpKSB7XHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGUodCwgaSk7XHJcbiAgfVxyXG4gIHVwZGF0ZSh0LCBpKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoLi4uaSk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGNvbnN0IFJ0ID0gKHQsIGkpID0+IHtcclxuICAgIHZhciBzLCBlO1xyXG4gICAgY29uc3QgbiA9IHQuXyRBTjtcclxuICAgIGlmICh2b2lkIDAgPT09IG4pIHJldHVybiAhMTtcclxuICAgIGZvciAoY29uc3QgdCBvZiBuKSBudWxsID09PSAoZSA9IChzID0gdCkuXyRBTykgfHwgdm9pZCAwID09PSBlIHx8IGUuY2FsbChzLCBpLCAhMSksIFJ0KHQsIGkpO1xyXG4gICAgcmV0dXJuICEwO1xyXG4gIH0sXHJcbiAgTnQgPSB0ID0+IHtcclxuICAgIGxldCBpLCBzO1xyXG4gICAgZG8ge1xyXG4gICAgICBpZiAodm9pZCAwID09PSAoaSA9IHQuXyRBTSkpIGJyZWFrO1xyXG4gICAgICAocyA9IGkuXyRBTiksIHMuZGVsZXRlKHQpLCAodCA9IGkpO1xyXG4gICAgfSB3aGlsZSAoMCA9PT0gKG51bGwgPT0gcyA/IHZvaWQgMCA6IHMuc2l6ZSkpO1xyXG4gIH0sXHJcbiAgT3QgPSB0ID0+IHtcclxuICAgIGZvciAobGV0IGk7IChpID0gdC5fJEFNKTsgdCA9IGkpIHtcclxuICAgICAgbGV0IHMgPSBpLl8kQU47XHJcbiAgICAgIGlmICh2b2lkIDAgPT09IHMpIGkuXyRBTiA9IHMgPSBuZXcgU2V0KCk7XHJcbiAgICAgIGVsc2UgaWYgKHMuaGFzKHQpKSBicmVhaztcclxuICAgICAgcy5hZGQodCksIHp0KGkpO1xyXG4gICAgfVxyXG4gIH07XHJcbmZ1bmN0aW9uIEx0KHQpIHtcclxuICB2b2lkIDAgIT09IHRoaXMuXyRBTiA/IChOdCh0aGlzKSwgKHRoaXMuXyRBTSA9IHQpLCBPdCh0aGlzKSkgOiAodGhpcy5fJEFNID0gdCk7XHJcbn1cclxuZnVuY3Rpb24ganQodCwgaSA9ICExLCBzID0gMCkge1xyXG4gIGNvbnN0IGUgPSB0aGlzLl8kQUgsXHJcbiAgICBuID0gdGhpcy5fJEFOO1xyXG4gIGlmICh2b2lkIDAgIT09IG4gJiYgMCAhPT0gbi5zaXplKVxyXG4gICAgaWYgKGkpXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGUpKSBmb3IgKGxldCB0ID0gczsgdCA8IGUubGVuZ3RoOyB0KyspIFJ0KGVbdF0sICExKSwgTnQoZVt0XSk7XHJcbiAgICAgIGVsc2UgbnVsbCAhPSBlICYmIChSdChlLCAhMSksIE50KGUpKTtcclxuICAgIGVsc2UgUnQodGhpcywgdCk7XHJcbn1cclxuY29uc3QgenQgPSB0ID0+IHtcclxuICB2YXIgaSwgcywgZSwgbjtcclxuICAyID09IHQudHlwZSAmJlxyXG4gICAgKChudWxsICE9PSAoaSA9IChlID0gdCkuXyRBUCkgJiYgdm9pZCAwICE9PSBpKSB8fCAoZS5fJEFQID0ganQpLFxyXG4gICAgKG51bGwgIT09IChzID0gKG4gPSB0KS5fJEFRKSAmJiB2b2lkIDAgIT09IHMpIHx8IChuLl8kQVEgPSBMdCkpO1xyXG59O1xyXG5jbGFzcyBIdCBleHRlbmRzIFZ0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyksICh0aGlzLl8kQU4gPSB2b2lkIDApO1xyXG4gIH1cclxuICBfJEFUKHQsIGksIHMpIHtcclxuICAgIHN1cGVyLl8kQVQodCwgaSwgcyksIE90KHRoaXMpLCAodGhpcy5pc0Nvbm5lY3RlZCA9IHQuXyRBVSk7XHJcbiAgfVxyXG4gIF8kQU8odCwgaSA9ICEwKSB7XHJcbiAgICB2YXIgcywgZTtcclxuICAgIHQgIT09IHRoaXMuaXNDb25uZWN0ZWQgJiZcclxuICAgICAgKCh0aGlzLmlzQ29ubmVjdGVkID0gdCksXHJcbiAgICAgIHRcclxuICAgICAgICA/IG51bGwgPT09IChzID0gdGhpcy5yZWNvbm5lY3RlZCkgfHwgdm9pZCAwID09PSBzIHx8IHMuY2FsbCh0aGlzKVxyXG4gICAgICAgIDogbnVsbCA9PT0gKGUgPSB0aGlzLmRpc2Nvbm5lY3RlZCkgfHwgdm9pZCAwID09PSBlIHx8IGUuY2FsbCh0aGlzKSksXHJcbiAgICAgIGkgJiYgKFJ0KHRoaXMsIHQpLCBOdCh0aGlzKSk7XHJcbiAgfVxyXG4gIHNldFZhbHVlKHQpIHtcclxuICAgIGlmICgkdCh0aGlzLmV0KSkgdGhpcy5ldC5fJEFJKHQsIHRoaXMpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IGkgPSBbLi4udGhpcy5ldC5fJEFIXTtcclxuICAgICAgKGlbdGhpcy5udF0gPSB0KSwgdGhpcy5ldC5fJEFJKGksIHRoaXMsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBkaXNjb25uZWN0ZWQoKSB7fVxyXG4gIHJlY29ubmVjdGVkKCkge31cclxufVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLyBjbGFzcyBJdCB7XHJcbiAgY29uc3RydWN0b3IodCkge1xyXG4gICAgdGhpcy5vdCA9IHQ7XHJcbiAgfVxyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICB0aGlzLm90ID0gdm9pZCAwO1xyXG4gIH1cclxuICByZWNvbm5lY3QodCkge1xyXG4gICAgdGhpcy5vdCA9IHQ7XHJcbiAgfVxyXG4gIGRlcmVmKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3Q7XHJcbiAgfVxyXG59XHJcbmNsYXNzIEJ0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICh0aGlzLnJ0ID0gdm9pZCAwKSwgKHRoaXMubHQgPSB2b2lkIDApO1xyXG4gIH1cclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ydDtcclxuICB9XHJcbiAgcGF1c2UoKSB7XHJcbiAgICB2YXIgdDtcclxuICAgIChudWxsICE9PSAodCA9IHRoaXMucnQpICYmIHZvaWQgMCAhPT0gdCkgfHwgKHRoaXMucnQgPSBuZXcgUHJvbWlzZSh0ID0+ICh0aGlzLmx0ID0gdCkpKTtcclxuICB9XHJcbiAgcmVzdW1lKCkge1xyXG4gICAgdmFyIHQ7XHJcbiAgICBudWxsID09PSAodCA9IHRoaXMubHQpIHx8IHZvaWQgMCA9PT0gdCB8fCB0LmNhbGwodGhpcyksICh0aGlzLnJ0ID0gdGhpcy5sdCA9IHZvaWQgMCk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGNsYXNzIER0IGV4dGVuZHMgSHQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKSwgKHRoaXMuaHQgPSBuZXcgSXQodGhpcykpLCAodGhpcy51dCA9IG5ldyBCdCgpKTtcclxuICB9XHJcbiAgcmVuZGVyKHQsIGkpIHtcclxuICAgIHJldHVybiBEO1xyXG4gIH1cclxuICB1cGRhdGUodCwgW2ksIHNdKSB7XHJcbiAgICBpZiAoKHRoaXMuaXNDb25uZWN0ZWQgfHwgdGhpcy5kaXNjb25uZWN0ZWQoKSwgaSA9PT0gdGhpcy5jdCkpIHJldHVybjtcclxuICAgIHRoaXMuY3QgPSBpO1xyXG4gICAgbGV0IGUgPSAwO1xyXG4gICAgY29uc3QgeyBodDogbiwgdXQ6IG8gfSA9IHRoaXM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAoYXN5bmMgKHQsIGkpID0+IHtcclxuICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IHMgb2YgdCkgaWYgKCExID09PSAoYXdhaXQgaShzKSkpIHJldHVybjtcclxuICAgICAgfSkoaSwgYXN5bmMgdCA9PiB7XHJcbiAgICAgICAgZm9yICg7IG8uZ2V0KCk7ICkgYXdhaXQgby5nZXQoKTtcclxuICAgICAgICBjb25zdCByID0gbi5kZXJlZigpO1xyXG4gICAgICAgIGlmICh2b2lkIDAgIT09IHIpIHtcclxuICAgICAgICAgIGlmIChyLmN0ICE9PSBpKSByZXR1cm4gITE7XHJcbiAgICAgICAgICB2b2lkIDAgIT09IHMgJiYgKHQgPSBzKHQsIGUpKSwgci5jb21taXRWYWx1ZSh0LCBlKSwgZSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gITA7XHJcbiAgICAgIH0pLFxyXG4gICAgICBEXHJcbiAgICApO1xyXG4gIH1cclxuICBjb21taXRWYWx1ZSh0LCBpKSB7XHJcbiAgICB0aGlzLnNldFZhbHVlKHQpO1xyXG4gIH1cclxuICBkaXNjb25uZWN0ZWQoKSB7XHJcbiAgICB0aGlzLmh0LmRpc2Nvbm5lY3QoKSwgdGhpcy51dC5wYXVzZSgpO1xyXG4gIH1cclxuICByZWNvbm5lY3RlZCgpIHtcclxuICAgIHRoaXMuaHQucmVjb25uZWN0KHRoaXMpLCB0aGlzLnV0LnJlc3VtZSgpO1xyXG4gIH1cclxufVxyXG5jb25zdCBXdCA9IFV0KER0KSxcclxuICBadCA9IFV0KFxyXG4gICAgLyoqXHJcbiAgICAgKiBAbGljZW5zZVxyXG4gICAgICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gICAgICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gICAgICovXHJcbiAgICBjbGFzcyBleHRlbmRzIER0IHtcclxuICAgICAgY29uc3RydWN0b3IodCkge1xyXG4gICAgICAgIGlmICgoc3VwZXIodCksIDIgIT09IHQudHlwZSkpIHRocm93IEVycm9yKFwiYXN5bmNBcHBlbmQgY2FuIG9ubHkgYmUgdXNlZCBpbiBjaGlsZCBleHByZXNzaW9uc1wiKTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgaSkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5zdCA9IHQpLCBzdXBlci51cGRhdGUodCwgaSk7XHJcbiAgICAgIH1cclxuICAgICAgY29tbWl0VmFsdWUodCwgaSkge1xyXG4gICAgICAgIDAgPT09IGkgJiYgTXQodGhpcy5zdCk7XHJcbiAgICAgICAgY29uc3QgcyA9IFR0KHRoaXMuc3QpO1xyXG4gICAgICAgIHh0KHMsIHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKSxcclxuICBxdCA9IHQgPT4gKGd0KHQpID8gdC5fJGxpdFR5cGUkLmggOiB0LnN0cmluZ3MpLFxyXG4gIEZ0ID0gVXQoXHJcbiAgICBjbGFzcyBleHRlbmRzIFZ0IHtcclxuICAgICAgY29uc3RydWN0b3IodCkge1xyXG4gICAgICAgIHN1cGVyKHQpLCAodGhpcy5kdCA9IG5ldyBXZWFrTWFwKCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIFt0XTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ldKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IG10KHRoaXMudnQpID8gcXQodGhpcy52dCkgOiBudWxsLFxyXG4gICAgICAgICAgZSA9IG10KGkpID8gcXQoaSkgOiBudWxsO1xyXG4gICAgICAgIGlmIChudWxsICE9PSBzICYmIChudWxsID09PSBlIHx8IHMgIT09IGUpKSB7XHJcbiAgICAgICAgICBjb25zdCBpID0gQXQodCkucG9wKCk7XHJcbiAgICAgICAgICBsZXQgZSA9IHRoaXMuZHQuZ2V0KHMpO1xyXG4gICAgICAgICAgaWYgKHZvaWQgMCA9PT0gZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICAoZSA9IGx0KFcsIHQpKSwgZS5zZXRDb25uZWN0ZWQoITEpLCB0aGlzLmR0LnNldChzLCBlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIEN0KGUsIFtpXSksIFR0KGUsIHZvaWQgMCwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudWxsICE9PSBlKSB7XHJcbiAgICAgICAgICBpZiAobnVsbCA9PT0gcyB8fCBzICE9PSBlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLmR0LmdldChlKTtcclxuICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gaSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHMgPSBBdChpKS5wb3AoKTtcclxuICAgICAgICAgICAgICBNdCh0KSwgVHQodCwgdm9pZCAwLCBzKSwgQ3QodCwgW3NdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy52dCA9IGk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMudnQgPSB2b2lkIDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKGkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKSxcclxuICBHdCA9ICh0LCBpLCBzKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IHMgb2YgaSkgaWYgKHNbMF0gPT09IHQpIHJldHVybiAoMCwgc1sxXSkoKTtcclxuICAgIHJldHVybiBudWxsID09IHMgPyB2b2lkIDAgOiBzKCk7XHJcbiAgfSxcclxuICBKdCA9IFV0KFxyXG4gICAgLyoqXHJcbiAgICAgKiBAbGljZW5zZVxyXG4gICAgICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xyXG4gICAgICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gICAgICovXHJcbiAgICBjbGFzcyBleHRlbmRzIFZ0IHtcclxuICAgICAgY29uc3RydWN0b3IodCkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIChzdXBlcih0KSxcclxuICAgICAgICAgIDEgIT09IHQudHlwZSB8fFxyXG4gICAgICAgICAgICBcImNsYXNzXCIgIT09IHQubmFtZSB8fFxyXG4gICAgICAgICAgICAobnVsbCA9PT0gKGkgPSB0LnN0cmluZ3MpIHx8IHZvaWQgMCA9PT0gaSA/IHZvaWQgMCA6IGkubGVuZ3RoKSA+IDIpXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgIFwiYGNsYXNzTWFwKClgIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIGFuZCBtdXN0IGJlIHRoZSBvbmx5IHBhcnQgaW4gdGhlIGF0dHJpYnV0ZS5cIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZW5kZXIodCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICBPYmplY3Qua2V5cyh0KVxyXG4gICAgICAgICAgICAuZmlsdGVyKGkgPT4gdFtpXSlcclxuICAgICAgICAgICAgLmpvaW4oXCIgXCIpICtcclxuICAgICAgICAgIFwiIFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ldKSB7XHJcbiAgICAgICAgdmFyIHMsIGU7XHJcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0gdGhpcy5mdCkge1xyXG4gICAgICAgICAgKHRoaXMuZnQgPSBuZXcgU2V0KCkpLFxyXG4gICAgICAgICAgICB2b2lkIDAgIT09IHQuc3RyaW5ncyAmJlxyXG4gICAgICAgICAgICAgICh0aGlzLnl0ID0gbmV3IFNldChcclxuICAgICAgICAgICAgICAgIHQuc3RyaW5nc1xyXG4gICAgICAgICAgICAgICAgICAuam9pbihcIiBcIilcclxuICAgICAgICAgICAgICAgICAgLnNwbGl0KC9cXHMvKVxyXG4gICAgICAgICAgICAgICAgICAuZmlsdGVyKHQgPT4gXCJcIiAhPT0gdClcclxuICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgIGZvciAoY29uc3QgdCBpbiBpKVxyXG4gICAgICAgICAgICBpW3RdICYmICEobnVsbCA9PT0gKHMgPSB0aGlzLnl0KSB8fCB2b2lkIDAgPT09IHMgPyB2b2lkIDAgOiBzLmhhcyh0KSkgJiYgdGhpcy5mdC5hZGQodCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG4gPSB0LmVsZW1lbnQuY2xhc3NMaXN0O1xyXG4gICAgICAgIHRoaXMuZnQuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgICAgIHQgaW4gaSB8fCAobi5yZW1vdmUodCksIHRoaXMuZnQuZGVsZXRlKHQpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IHQgaW4gaSkge1xyXG4gICAgICAgICAgY29uc3QgcyA9ICEhaVt0XTtcclxuICAgICAgICAgIHMgPT09IHRoaXMuZnQuaGFzKHQpIHx8XHJcbiAgICAgICAgICAgIChudWxsID09PSAoZSA9IHRoaXMueXQpIHx8IHZvaWQgMCA9PT0gZSA/IHZvaWQgMCA6IGUuaGFzKHQpKSB8fFxyXG4gICAgICAgICAgICAocyA/IChuLmFkZCh0KSwgdGhpcy5mdC5hZGQodCkpIDogKG4ucmVtb3ZlKHQpLCB0aGlzLmZ0LmRlbGV0ZSh0KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICksXHJcbiAgS3QgPSB7fSxcclxuICBZdCA9IFV0KFxyXG4gICAgY2xhc3MgZXh0ZW5kcyBWdCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyksICh0aGlzLmJ0ID0gS3QpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcih0LCBpKSB7XHJcbiAgICAgICAgcmV0dXJuIGkoKTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ksIHNdKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYnQpICYmIHRoaXMuYnQubGVuZ3RoID09PSBpLmxlbmd0aCAmJiBpLmV2ZXJ5KCh0LCBpKSA9PiB0ID09PSB0aGlzLmJ0W2ldKSlcclxuICAgICAgICAgICAgcmV0dXJuIEQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJ0ID09PSBpKSByZXR1cm4gRDtcclxuICAgICAgICByZXR1cm4gKHRoaXMuYnQgPSBBcnJheS5pc0FycmF5KGkpID8gQXJyYXkuZnJvbShpKSA6IGkpLCB0aGlzLnJlbmRlcihpLCBzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICksXHJcbiAgUXQgPSB0ID0+IChudWxsICE9IHQgPyB0IDogVyk7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGZ1bmN0aW9uKiBYdCh0LCBpKSB7XHJcbiAgY29uc3QgcyA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaTtcclxuICBpZiAodm9pZCAwICE9PSB0KSB7XHJcbiAgICBsZXQgZSA9IC0xO1xyXG4gICAgZm9yIChjb25zdCBuIG9mIHQpIGUgPiAtMSAmJiAoeWllbGQgcyA/IGkoZSkgOiBpKSwgZSsrLCB5aWVsZCBuO1xyXG4gIH1cclxufVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLyBjb25zdCB0aSA9IFV0KFxyXG4gICAgY2xhc3MgZXh0ZW5kcyBWdCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyksICh0aGlzLmtleSA9IFcpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcih0LCBpKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmtleSA9IHQpLCBpO1xyXG4gICAgICB9XHJcbiAgICAgIHVwZGF0ZSh0LCBbaSwgc10pIHtcclxuICAgICAgICByZXR1cm4gaSAhPT0gdGhpcy5rZXkgJiYgKEN0KHQpLCAodGhpcy5rZXkgPSBpKSksIHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApLFxyXG4gIGlpID0gVXQoXHJcbiAgICAvKipcclxuICAgICAqIEBsaWNlbnNlXHJcbiAgICAgKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAgICAgKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAgICAgKi9cclxuICAgIGNsYXNzIGV4dGVuZHMgVnQge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0KSB7XHJcbiAgICAgICAgaWYgKChzdXBlcih0KSwgMyAhPT0gdC50eXBlICYmIDEgIT09IHQudHlwZSAmJiA0ICE9PSB0LnR5cGUpKVxyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgYGxpdmVgIGRpcmVjdGl2ZSBpcyBub3QgYWxsb3dlZCBvbiBjaGlsZCBvciBldmVudCBiaW5kaW5nc1wiKTtcclxuICAgICAgICBpZiAoISR0KHQpKSB0aHJvdyBFcnJvcihcImBsaXZlYCBiaW5kaW5ncyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb25cIik7XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyKHQpIHtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ldKSB7XHJcbiAgICAgICAgaWYgKGkgPT09IEQgfHwgaSA9PT0gVykgcmV0dXJuIGk7XHJcbiAgICAgICAgY29uc3QgcyA9IHQuZWxlbWVudCxcclxuICAgICAgICAgIGUgPSB0Lm5hbWU7XHJcbiAgICAgICAgaWYgKDMgPT09IHQudHlwZSkge1xyXG4gICAgICAgICAgaWYgKGkgPT09IHNbZV0pIHJldHVybiBEO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoNCA9PT0gdC50eXBlKSB7XHJcbiAgICAgICAgICBpZiAoISFpID09PSBzLmhhc0F0dHJpYnV0ZShlKSkgcmV0dXJuIEQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICgxID09PSB0LnR5cGUgJiYgcy5nZXRBdHRyaWJ1dGUoZSkgPT09IGkgKyBcIlwiKSByZXR1cm4gRDtcclxuICAgICAgICByZXR1cm4gQ3QodCksIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApO1xyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG5mdW5jdGlvbiogc2kodCwgaSkge1xyXG4gIGlmICh2b2lkIDAgIT09IHQpIHtcclxuICAgIGxldCBzID0gMDtcclxuICAgIGZvciAoY29uc3QgZSBvZiB0KSB5aWVsZCBpKGUsIHMrKyk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGZ1bmN0aW9uKiBlaSh0LCBpLCBzID0gMSkge1xyXG4gIGNvbnN0IGUgPSB2b2lkIDAgPT09IGkgPyAwIDogdDtcclxuICBudWxsICE9IGkgfHwgKGkgPSB0KTtcclxuICBmb3IgKGxldCB0ID0gZTsgcyA+IDAgPyB0IDwgaSA6IGkgPCB0OyB0ICs9IHMpIHlpZWxkIHQ7XHJcbn1cclxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxyXG4gKi8gY29uc3QgbmkgPSAoKSA9PiBuZXcgb2koKTtcclxuY2xhc3Mgb2kge31cclxuY29uc3QgcmkgPSBuZXcgV2Vha01hcCgpLFxyXG4gIGxpID0gVXQoXHJcbiAgICBjbGFzcyBleHRlbmRzIEh0IHtcclxuICAgICAgcmVuZGVyKHQpIHtcclxuICAgICAgICByZXR1cm4gVztcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ldKSB7XHJcbiAgICAgICAgdmFyIHM7XHJcbiAgICAgICAgY29uc3QgZSA9IGkgIT09IHRoaXMub3Q7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIGUgJiYgdm9pZCAwICE9PSB0aGlzLm90ICYmIHRoaXMuZ3Qodm9pZCAwKSxcclxuICAgICAgICAgIChlIHx8IHRoaXMud3QgIT09IHRoaXMuX3QpICYmXHJcbiAgICAgICAgICAgICgodGhpcy5vdCA9IGkpLFxyXG4gICAgICAgICAgICAodGhpcy4kdCA9IG51bGwgPT09IChzID0gdC5vcHRpb25zKSB8fCB2b2lkIDAgPT09IHMgPyB2b2lkIDAgOiBzLmhvc3QpLFxyXG4gICAgICAgICAgICB0aGlzLmd0KCh0aGlzLl90ID0gdC5lbGVtZW50KSkpLFxyXG4gICAgICAgICAgV1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgZ3QodCkge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3QpIHtcclxuICAgICAgICAgIGNvbnN0IHMgPSBudWxsICE9PSAoaSA9IHRoaXMuJHQpICYmIHZvaWQgMCAhPT0gaSA/IGkgOiBnbG9iYWxUaGlzO1xyXG4gICAgICAgICAgbGV0IGUgPSByaS5nZXQocyk7XHJcbiAgICAgICAgICB2b2lkIDAgPT09IGUgJiYgKChlID0gbmV3IFdlYWtNYXAoKSksIHJpLnNldChzLCBlKSksXHJcbiAgICAgICAgICAgIHZvaWQgMCAhPT0gZS5nZXQodGhpcy5vdCkgJiYgdGhpcy5vdC5jYWxsKHRoaXMuJHQsIHZvaWQgMCksXHJcbiAgICAgICAgICAgIGUuc2V0KHRoaXMub3QsIHQpLFxyXG4gICAgICAgICAgICB2b2lkIDAgIT09IHQgJiYgdGhpcy5vdC5jYWxsKHRoaXMuJHQsIHQpO1xyXG4gICAgICAgIH0gZWxzZSB0aGlzLm90LnZhbHVlID0gdDtcclxuICAgICAgfVxyXG4gICAgICBnZXQgd3QoKSB7XHJcbiAgICAgICAgdmFyIHQsIGksIHM7XHJcbiAgICAgICAgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vdFxyXG4gICAgICAgICAgPyBudWxsID09PSAoaSA9IHJpLmdldChudWxsICE9PSAodCA9IHRoaXMuJHQpICYmIHZvaWQgMCAhPT0gdCA/IHQgOiBnbG9iYWxUaGlzKSkgfHwgdm9pZCAwID09PSBpXHJcbiAgICAgICAgICAgID8gdm9pZCAwXHJcbiAgICAgICAgICAgIDogaS5nZXQodGhpcy5vdClcclxuICAgICAgICAgIDogbnVsbCA9PT0gKHMgPSB0aGlzLm90KSB8fCB2b2lkIDAgPT09IHNcclxuICAgICAgICAgID8gdm9pZCAwXHJcbiAgICAgICAgICA6IHMudmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMud3QgPT09IHRoaXMuX3QgJiYgdGhpcy5ndCh2b2lkIDApO1xyXG4gICAgICB9XHJcbiAgICAgIHJlY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuZ3QodGhpcy5fdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApLFxyXG4gIGhpID0gKHQsIGksIHMpID0+IHtcclxuICAgIGNvbnN0IGUgPSBuZXcgTWFwKCk7XHJcbiAgICBmb3IgKGxldCBuID0gaTsgbiA8PSBzOyBuKyspIGUuc2V0KHRbbl0sIG4pO1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfSxcclxuICB1aSA9IFV0KFxyXG4gICAgY2xhc3MgZXh0ZW5kcyBWdCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKHQpIHtcclxuICAgICAgICBpZiAoKHN1cGVyKHQpLCAyICE9PSB0LnR5cGUpKSB0aHJvdyBFcnJvcihcInJlcGVhdCgpIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGV4dCBleHByZXNzaW9uc1wiKTtcclxuICAgICAgfVxyXG4gICAgICBTdCh0LCBpLCBzKSB7XHJcbiAgICAgICAgbGV0IGU7XHJcbiAgICAgICAgdm9pZCAwID09PSBzID8gKHMgPSBpKSA6IHZvaWQgMCAhPT0gaSAmJiAoZSA9IGkpO1xyXG4gICAgICAgIGNvbnN0IG4gPSBbXSxcclxuICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICBsZXQgciA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIHQpIChuW3JdID0gZSA/IGUoaSwgcikgOiByKSwgKG9bcl0gPSBzKGksIHIpKSwgcisrO1xyXG4gICAgICAgIHJldHVybiB7IHZhbHVlczogbywga2V5czogbiB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcih0LCBpLCBzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3QodCwgaSwgcykudmFsdWVzO1xyXG4gICAgICB9XHJcbiAgICAgIHVwZGF0ZSh0LCBbaSwgcywgZV0pIHtcclxuICAgICAgICB2YXIgbjtcclxuICAgICAgICBjb25zdCBvID0gQXQodCksXHJcbiAgICAgICAgICB7IHZhbHVlczogciwga2V5czogbCB9ID0gdGhpcy5TdChpLCBzLCBlKTtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobykpIHJldHVybiAodGhpcy5UdCA9IGwpLCByO1xyXG4gICAgICAgIGNvbnN0IGggPSBudWxsICE9PSAobiA9IHRoaXMuVHQpICYmIHZvaWQgMCAhPT0gbiA/IG4gOiAodGhpcy5UdCA9IFtdKSxcclxuICAgICAgICAgIHUgPSBbXTtcclxuICAgICAgICBsZXQgYyxcclxuICAgICAgICAgIGQsXHJcbiAgICAgICAgICBhID0gMCxcclxuICAgICAgICAgIHYgPSBvLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICBmID0gMCxcclxuICAgICAgICAgIHAgPSByLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgZm9yICg7IGEgPD0gdiAmJiBmIDw9IHA7IClcclxuICAgICAgICAgIGlmIChudWxsID09PSBvW2FdKSBhKys7XHJcbiAgICAgICAgICBlbHNlIGlmIChudWxsID09PSBvW3ZdKSB2LS07XHJcbiAgICAgICAgICBlbHNlIGlmIChoW2FdID09PSBsW2ZdKSAodVtmXSA9IHh0KG9bYV0sIHJbZl0pKSwgYSsrLCBmKys7XHJcbiAgICAgICAgICBlbHNlIGlmIChoW3ZdID09PSBsW3BdKSAodVtwXSA9IHh0KG9bdl0sIHJbcF0pKSwgdi0tLCBwLS07XHJcbiAgICAgICAgICBlbHNlIGlmIChoW2FdID09PSBsW3BdKSAodVtwXSA9IHh0KG9bYV0sIHJbcF0pKSwgVHQodCwgdVtwICsgMV0sIG9bYV0pLCBhKyssIHAtLTtcclxuICAgICAgICAgIGVsc2UgaWYgKGhbdl0gPT09IGxbZl0pICh1W2ZdID0geHQob1t2XSwgcltmXSkpLCBUdCh0LCBvW2FdLCBvW3ZdKSwgdi0tLCBmKys7XHJcbiAgICAgICAgICBlbHNlIGlmICgodm9pZCAwID09PSBjICYmICgoYyA9IGhpKGwsIGYsIHApKSwgKGQgPSBoaShoLCBhLCB2KSkpLCBjLmhhcyhoW2FdKSkpXHJcbiAgICAgICAgICAgIGlmIChjLmhhcyhoW3ZdKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGkgPSBkLmdldChsW2ZdKSxcclxuICAgICAgICAgICAgICAgIHMgPSB2b2lkIDAgIT09IGkgPyBvW2ldIDogbnVsbDtcclxuICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IFR0KHQsIG9bYV0pO1xyXG4gICAgICAgICAgICAgICAgeHQoaSwgcltmXSksICh1W2ZdID0gaSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlICh1W2ZdID0geHQocywgcltmXSkpLCBUdCh0LCBvW2FdLCBzKSwgKG9baV0gPSBudWxsKTtcclxuICAgICAgICAgICAgICBmKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSBrdChvW3ZdKSwgdi0tO1xyXG4gICAgICAgICAgZWxzZSBrdChvW2FdKSwgYSsrO1xyXG4gICAgICAgIGZvciAoOyBmIDw9IHA7ICkge1xyXG4gICAgICAgICAgY29uc3QgaSA9IFR0KHQsIHVbcCArIDFdKTtcclxuICAgICAgICAgIHh0KGksIHJbZl0pLCAodVtmKytdID0gaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoOyBhIDw9IHY7ICkge1xyXG4gICAgICAgICAgY29uc3QgdCA9IG9bYSsrXTtcclxuICAgICAgICAgIG51bGwgIT09IHQgJiYga3QodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAodGhpcy5UdCA9IGwpLCBDdCh0LCB1KSwgRDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICksXHJcbiAgY2kgPSBcImltcG9ydGFudFwiLFxyXG4gIGRpID0gXCIgIVwiICsgY2ksXHJcbiAgYWkgPSBVdChcclxuICAgIGNsYXNzIGV4dGVuZHMgVnQge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0KSB7XHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHN1cGVyKHQpLFxyXG4gICAgICAgICAgMSAhPT0gdC50eXBlIHx8XHJcbiAgICAgICAgICAgIFwic3R5bGVcIiAhPT0gdC5uYW1lIHx8XHJcbiAgICAgICAgICAgIChudWxsID09PSAoaSA9IHQuc3RyaW5ncykgfHwgdm9pZCAwID09PSBpID8gdm9pZCAwIDogaS5sZW5ndGgpID4gMilcclxuICAgICAgICApXHJcbiAgICAgICAgICB0aHJvdyBFcnJvcihcclxuICAgICAgICAgICAgXCJUaGUgYHN0eWxlTWFwYCBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIGluIHRoZSBgc3R5bGVgIGF0dHJpYnV0ZSBhbmQgbXVzdCBiZSB0aGUgb25seSBwYXJ0IGluIHRoZSBhdHRyaWJ1dGUuXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyKHQpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModCkucmVkdWNlKChpLCBzKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlID0gdFtzXTtcclxuICAgICAgICAgIHJldHVybiBudWxsID09IGVcclxuICAgICAgICAgICAgPyBpXHJcbiAgICAgICAgICAgIDogaSArXHJcbiAgICAgICAgICAgICAgICBgJHsocyA9IHMuaW5jbHVkZXMoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgID8gc1xyXG4gICAgICAgICAgICAgICAgICA6IHMucmVwbGFjZSgvKD86Xih3ZWJraXR8bW96fG1zfG8pfCkoPz1bQS1aXSkvZywgXCItJCZcIikudG9Mb3dlckNhc2UoKSl9OiR7ZX07YDtcclxuICAgICAgICB9LCBcIlwiKTtcclxuICAgICAgfVxyXG4gICAgICB1cGRhdGUodCwgW2ldKSB7XHJcbiAgICAgICAgY29uc3QgeyBzdHlsZTogcyB9ID0gdC5lbGVtZW50O1xyXG4gICAgICAgIGlmICh2b2lkIDAgPT09IHRoaXMueHQpIHtcclxuICAgICAgICAgIHRoaXMueHQgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHQgaW4gaSkgdGhpcy54dC5hZGQodCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueHQuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgICAgIG51bGwgPT0gaVt0XSAmJiAodGhpcy54dC5kZWxldGUodCksIHQuaW5jbHVkZXMoXCItXCIpID8gcy5yZW1vdmVQcm9wZXJ0eSh0KSA6IChzW3RdID0gXCJcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAoY29uc3QgdCBpbiBpKSB7XHJcbiAgICAgICAgICBjb25zdCBlID0gaVt0XTtcclxuICAgICAgICAgIGlmIChudWxsICE9IGUpIHtcclxuICAgICAgICAgICAgdGhpcy54dC5hZGQodCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGkgPSBcInN0cmluZ1wiID09IHR5cGVvZiBlICYmIGUuZW5kc1dpdGgoZGkpO1xyXG4gICAgICAgICAgICB0LmluY2x1ZGVzKFwiLVwiKSB8fCBpID8gcy5zZXRQcm9wZXJ0eSh0LCBpID8gZS5zbGljZSgwLCAtMTEpIDogZSwgaSA/IGNpIDogXCJcIikgOiAoc1t0XSA9IGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICksXHJcbiAgdmkgPSBVdChcclxuICAgIC8qKlxyXG4gICAgICogQGxpY2Vuc2VcclxuICAgICAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICAgICAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICAgICAqL1xyXG4gICAgY2xhc3MgZXh0ZW5kcyBWdCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKHQpIHtcclxuICAgICAgICBpZiAoKHN1cGVyKHQpLCAyICE9PSB0LnR5cGUpKSB0aHJvdyBFcnJvcihcInRlbXBsYXRlQ29udGVudCBjYW4gb25seSBiZSB1c2VkIGluIGNoaWxkIGJpbmRpbmdzXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRXQgPT09IHQgPyBEIDogKCh0aGlzLkV0ID0gdCksIGRvY3VtZW50LmltcG9ydE5vZGUodC5jb250ZW50LCAhMCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxuY2xhc3MgZmkgZXh0ZW5kcyBWdCB7XHJcbiAgY29uc3RydWN0b3IodCkge1xyXG4gICAgaWYgKChzdXBlcih0KSwgKHRoaXMudnQgPSBXKSwgMiAhPT0gdC50eXBlKSlcclxuICAgICAgdGhyb3cgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5kaXJlY3RpdmVOYW1lICsgXCIoKSBjYW4gb25seSBiZSB1c2VkIGluIGNoaWxkIGJpbmRpbmdzXCIpO1xyXG4gIH1cclxuICByZW5kZXIodCkge1xyXG4gICAgaWYgKHQgPT09IFcgfHwgbnVsbCA9PSB0KSByZXR1cm4gKHRoaXMuQ3QgPSB2b2lkIDApLCAodGhpcy52dCA9IHQpO1xyXG4gICAgaWYgKHQgPT09IEQpIHJldHVybiB0O1xyXG4gICAgaWYgKFwic3RyaW5nXCIgIT0gdHlwZW9mIHQpXHJcbiAgICAgIHRocm93IEVycm9yKHRoaXMuY29uc3RydWN0b3IuZGlyZWN0aXZlTmFtZSArIFwiKCkgY2FsbGVkIHdpdGggYSBub24tc3RyaW5nIHZhbHVlXCIpO1xyXG4gICAgaWYgKHQgPT09IHRoaXMudnQpIHJldHVybiB0aGlzLkN0O1xyXG4gICAgdGhpcy52dCA9IHQ7XHJcbiAgICBjb25zdCBpID0gW3RdO1xyXG4gICAgcmV0dXJuIChpLnJhdyA9IGkpLCAodGhpcy5DdCA9IHsgXyRsaXRUeXBlJDogdGhpcy5jb25zdHJ1Y3Rvci5yZXN1bHRUeXBlLCBzdHJpbmdzOiBpLCB2YWx1ZXM6IFtdIH0pO1xyXG4gIH1cclxufVxyXG4oZmkuZGlyZWN0aXZlTmFtZSA9IFwidW5zYWZlSFRNTFwiKSwgKGZpLnJlc3VsdFR5cGUgPSAxKTtcclxuY29uc3QgcGkgPSBVdChmaSk7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGNsYXNzIHlpIGV4dGVuZHMgZmkge31cclxuKHlpLmRpcmVjdGl2ZU5hbWUgPSBcInVuc2FmZVNWR1wiKSwgKHlpLnJlc3VsdFR5cGUgPSAyKTtcclxuY29uc3QgYmkgPSBVdCh5aSksXHJcbiAgbWkgPSB0ID0+ICF5dCh0KSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQudGhlbixcclxuICBnaSA9IDEwNzM3NDE4MjM7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGNsYXNzIHdpIGV4dGVuZHMgSHQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKSwgKHRoaXMuQXQgPSBnaSksICh0aGlzLmt0ID0gW10pLCAodGhpcy5odCA9IG5ldyBJdCh0aGlzKSksICh0aGlzLnV0ID0gbmV3IEJ0KCkpO1xyXG4gIH1cclxuICByZW5kZXIoLi4udCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICByZXR1cm4gbnVsbCAhPT0gKGkgPSB0LmZpbmQodCA9PiAhbWkodCkpKSAmJiB2b2lkIDAgIT09IGkgPyBpIDogRDtcclxuICB9XHJcbiAgdXBkYXRlKHQsIGkpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLmt0O1xyXG4gICAgbGV0IGUgPSBzLmxlbmd0aDtcclxuICAgIHRoaXMua3QgPSBpO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuaHQsXHJcbiAgICAgIG8gPSB0aGlzLnV0O1xyXG4gICAgdGhpcy5pc0Nvbm5lY3RlZCB8fCB0aGlzLmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCBpLmxlbmd0aCAmJiAhKHQgPiB0aGlzLkF0KTsgdCsrKSB7XHJcbiAgICAgIGNvbnN0IHIgPSBpW3RdO1xyXG4gICAgICBpZiAoIW1pKHIpKSByZXR1cm4gKHRoaXMuQXQgPSB0KSwgcjtcclxuICAgICAgKHQgPCBlICYmIHIgPT09IHNbdF0pIHx8XHJcbiAgICAgICAgKCh0aGlzLkF0ID0gZ2kpLFxyXG4gICAgICAgIChlID0gMCksXHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHIpLnRoZW4oYXN5bmMgdCA9PiB7XHJcbiAgICAgICAgICBmb3IgKDsgby5nZXQoKTsgKSBhd2FpdCBvLmdldCgpO1xyXG4gICAgICAgICAgY29uc3QgaSA9IG4uZGVyZWYoKTtcclxuICAgICAgICAgIGlmICh2b2lkIDAgIT09IGkpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IGkua3QuaW5kZXhPZihyKTtcclxuICAgICAgICAgICAgcyA+IC0xICYmIHMgPCBpLkF0ICYmICgoaS5BdCA9IHMpLCBpLnNldFZhbHVlKHQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRDtcclxuICB9XHJcbiAgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgdGhpcy5odC5kaXNjb25uZWN0KCksIHRoaXMudXQucGF1c2UoKTtcclxuICB9XHJcbiAgcmVjb25uZWN0ZWQoKSB7XHJcbiAgICB0aGlzLmh0LnJlY29ubmVjdCh0aGlzKSwgdGhpcy51dC5yZXN1bWUoKTtcclxuICB9XHJcbn1cclxuY29uc3QgX2kgPSBVdCh3aSk7XHJcbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcclxuICovIGZ1bmN0aW9uICRpKHQsIGksIHMpIHtcclxuICByZXR1cm4gdCA/IGkoKSA6IG51bGwgPT0gcyA/IHZvaWQgMCA6IHMoKTtcclxufVxyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqLyBjb25zdCBTaSA9IFN5bWJvbC5mb3IoXCJcIiksXHJcbiAgVGkgPSB0ID0+IHtcclxuICAgIGlmICgobnVsbCA9PSB0ID8gdm9pZCAwIDogdC5yKSA9PT0gU2kpIHJldHVybiBudWxsID09IHQgPyB2b2lkIDAgOiB0Ll8kbGl0U3RhdGljJDtcclxuICB9LFxyXG4gIHhpID0gdCA9PiAoeyBfJGxpdFN0YXRpYyQ6IHQsIHI6IFNpIH0pLFxyXG4gIEVpID0gKHQsIC4uLmkpID0+ICh7XHJcbiAgICBfJGxpdFN0YXRpYyQ6IGkucmVkdWNlKFxyXG4gICAgICAoaSwgcywgZSkgPT5cclxuICAgICAgICBpICtcclxuICAgICAgICAodCA9PiB7XHJcbiAgICAgICAgICBpZiAodm9pZCAwICE9PSB0Ll8kbGl0U3RhdGljJCkgcmV0dXJuIHQuXyRsaXRTdGF0aWMkO1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgIGBWYWx1ZSBwYXNzZWQgdG8gJ2xpdGVyYWwnIGZ1bmN0aW9uIG11c3QgYmUgYSAnbGl0ZXJhbCcgcmVzdWx0OiAke3R9LiBVc2UgJ3Vuc2FmZVN0YXRpYycgdG8gcGFzcyBub24tbGl0ZXJhbCB2YWx1ZXMsIGJ1dFxcbiAgICAgICAgICAgIHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pKHMpICtcclxuICAgICAgICB0W2UgKyAxXSxcclxuICAgICAgdFswXVxyXG4gICAgKSxcclxuICAgIHI6IFNpLFxyXG4gIH0pLFxyXG4gIENpID0gbmV3IE1hcCgpLFxyXG4gIEFpID1cclxuICAgIHQgPT5cclxuICAgIChpLCAuLi5zKSA9PiB7XHJcbiAgICAgIGNvbnN0IGUgPSBzLmxlbmd0aDtcclxuICAgICAgbGV0IG4sIG87XHJcbiAgICAgIGNvbnN0IHIgPSBbXSxcclxuICAgICAgICBsID0gW107XHJcbiAgICAgIGxldCBoLFxyXG4gICAgICAgIHUgPSAwLFxyXG4gICAgICAgIGMgPSAhMTtcclxuICAgICAgZm9yICg7IHUgPCBlOyApIHtcclxuICAgICAgICBmb3IgKGggPSBpW3VdOyB1IDwgZSAmJiB2b2lkIDAgIT09ICgobyA9IHNbdV0pLCAobiA9IFRpKG8pKSk7ICkgKGggKz0gbiArIGlbKyt1XSksIChjID0gITApO1xyXG4gICAgICAgIHUgIT09IGUgJiYgbC5wdXNoKG8pLCByLnB1c2goaCksIHUrKztcclxuICAgICAgfVxyXG4gICAgICBpZiAoKHUgPT09IGUgJiYgci5wdXNoKGlbZV0pLCBjKSkge1xyXG4gICAgICAgIGNvbnN0IHQgPSByLmpvaW4oXCIkJGxpdCQkXCIpO1xyXG4gICAgICAgIHZvaWQgMCA9PT0gKGkgPSBDaS5nZXQodCkpICYmICgoci5yYXcgPSByKSwgQ2kuc2V0KHQsIChpID0gcikpKSwgKHMgPSBsKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdChpLCAuLi5zKTtcclxuICAgIH0sXHJcbiAga2kgPSBBaShJKSxcclxuICBNaSA9IEFpKEIpO1xyXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXHJcbiAqL1xyXG4vKndpbmRvdy5saXREaXNhYmxlQnVuZGxlV2FybmluZ3x8Y29uc29sZS53YXJuKFwiTGl0IGhhcyBiZWVuIGxvYWRlZCBmcm9tIGEgYnVuZGxlIHRoYXQgY29tYmluZXMgYWxsIGNvcmUgZmVhdHVyZXMgaW50byBhIHNpbmdsZSBmaWxlLiBUbyByZWR1Y2UgdHJhbnNmZXIgc2l6ZSBhbmQgcGFyc2luZyBjb3N0LCBjb25zaWRlciB1c2luZyB0aGUgYGxpdGAgbnBtIHBhY2thZ2UgZGlyZWN0bHkgaW4geW91ciBwcm9qZWN0LlwiKTsqLyBleHBvcnQge1xyXG4gIEh0IGFzIEFzeW5jRGlyZWN0aXZlLFxyXG4gIER0IGFzIEFzeW5jUmVwbGFjZURpcmVjdGl2ZSxcclxuICBuIGFzIENTU1Jlc3VsdCxcclxuICBWdCBhcyBEaXJlY3RpdmUsXHJcbiAgZHQgYXMgTGl0RWxlbWVudCxcclxuICBQdCBhcyBQYXJ0VHlwZSxcclxuICBtIGFzIFJlYWN0aXZlRWxlbWVudCxcclxuICBidCBhcyBUZW1wbGF0ZVJlc3VsdFR5cGUsXHJcbiAgZmkgYXMgVW5zYWZlSFRNTERpcmVjdGl2ZSxcclxuICB3aSBhcyBVbnRpbERpcmVjdGl2ZSxcclxuICBjdCBhcyBVcGRhdGluZ0VsZW1lbnQsXHJcbiAgdnQgYXMgXyRMRSxcclxuICBvdCBhcyBfJExILFxyXG4gIGwgYXMgYWRvcHRTdHlsZXMsXHJcbiAgWnQgYXMgYXN5bmNBcHBlbmQsXHJcbiAgV3QgYXMgYXN5bmNSZXBsYWNlLFxyXG4gIEZ0IGFzIGNhY2hlLFxyXG4gIEd0IGFzIGNob29zZSxcclxuICBKdCBhcyBjbGFzc01hcCxcclxuICBNdCBhcyBjbGVhclBhcnQsXHJcbiAgbmkgYXMgY3JlYXRlUmVmLFxyXG4gIHIgYXMgY3NzLFxyXG4gIGYgYXMgZGVmYXVsdENvbnZlcnRlcixcclxuICBVdCBhcyBkaXJlY3RpdmUsXHJcbiAgQXQgYXMgZ2V0Q29tbWl0dGVkVmFsdWUsXHJcbiAgaCBhcyBnZXRDb21wYXRpYmxlU3R5bGUsXHJcbiAgX3QgYXMgZ2V0RGlyZWN0aXZlQ2xhc3MsXHJcbiAgWXQgYXMgZ3VhcmQsXHJcbiAgSSBhcyBodG1sLFxyXG4gIFF0IGFzIGlmRGVmaW5lZCxcclxuICBUdCBhcyBpbnNlcnRQYXJ0LFxyXG4gIGd0IGFzIGlzQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcclxuICB3dCBhcyBpc0RpcmVjdGl2ZVJlc3VsdCxcclxuICB5dCBhcyBpc1ByaW1pdGl2ZSxcclxuICBmdCBhcyBpc1NlcnZlcixcclxuICAkdCBhcyBpc1NpbmdsZUV4cHJlc3Npb24sXHJcbiAgbXQgYXMgaXNUZW1wbGF0ZVJlc3VsdCxcclxuICBYdCBhcyBqb2luLFxyXG4gIHRpIGFzIGtleWVkLFxyXG4gIEVpIGFzIGxpdGVyYWwsXHJcbiAgaWkgYXMgbGl2ZSxcclxuICBzaSBhcyBtYXAsXHJcbiAgRCBhcyBub0NoYW5nZSxcclxuICBwIGFzIG5vdEVxdWFsLFxyXG4gIFcgYXMgbm90aGluZyxcclxuICBlaSBhcyByYW5nZSxcclxuICBsaSBhcyByZWYsXHJcbiAga3QgYXMgcmVtb3ZlUGFydCxcclxuICBsdCBhcyByZW5kZXIsXHJcbiAgdWkgYXMgcmVwZWF0LFxyXG4gIHh0IGFzIHNldENoaWxkUGFydFZhbHVlLFxyXG4gIEN0IGFzIHNldENvbW1pdHRlZFZhbHVlLFxyXG4gIGtpIGFzIHN0YXRpY0h0bWwsXHJcbiAgTWkgYXMgc3RhdGljU3ZnLFxyXG4gIGFpIGFzIHN0eWxlTWFwLFxyXG4gIGkgYXMgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzLFxyXG4gIEIgYXMgc3ZnLFxyXG4gIHZpIGFzIHRlbXBsYXRlQ29udGVudCxcclxuICBvIGFzIHVuc2FmZUNTUyxcclxuICBwaSBhcyB1bnNhZmVIVE1MLFxyXG4gIGJpIGFzIHVuc2FmZVNWRyxcclxuICB4aSBhcyB1bnNhZmVTdGF0aWMsXHJcbiAgX2kgYXMgdW50aWwsXHJcbiAgJGkgYXMgd2hlbixcclxuICBBaSBhcyB3aXRoU3RhdGljLFxyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtYWxsLm1pbi5qcy5tYXBcclxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFiYnJPcGVuIHtcbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGFiYnJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5hYmJyRWxlbWVudCA9IGFiYnJFbGVtZW50O1xuICB9O1xuXG4gIHB1YmxpYyByZXZlYWxBYmJyRGVzY3JpcHRpb24oKSB7XG4gICAgdGhpcy5hYmJyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGxldCBhYmJyVGl0bGVBdHRyVmFsOiBzdHJpbmcgPSB0aGlzLmFiYnJFbGVtZW50LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpIGFzIHN0cmluZztcblxuICAgICAgaWYgKGUudGFyZ2V0ID09IHRoaXMuYWJickVsZW1lbnQpIHtcbiAgICAgICAgLy9jcmVhdGUgdGhlIHNwYW4gZWxlbWVudFxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5hYmJyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCl9KCR7YWJiclRpdGxlQXR0clZhbH0pJHtTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgIDE2MFxuICAgICAgICApfWA7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuXG4vKipcbiAqIGFwaUdFVCBpcyBmb3IgZmV0Y2ggcmVxdWVzdHMuIFVzZSBhbiBhcGlHRVQgb2JqZWN0IHRvIG1hbmlwdWxhdGUgdGhlIGZldGNoXG4gKiAgcmVxdWVzdCBpbnRvIGVpdGhlcjpcbiAqXG4gKiAxLiByZXR1cm5pbmcgZGF0YVxuICpcbiAqIC0tb3IgLS1cbiAqXG4gKiAyLiBzdG9yaW5nIHRoZSByZXF1ZXN0IGluIHRoZSBicm93c2VyIGNhY2hlIHRvIHJldHJpZXZlIGxhdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBhcGlHRVQge1xuICBwdWJsaWMgZXJyb3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBnZXRVcmw6IFVSTDtcbiAgcHJpdmF0ZSBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgY29uc3RydWN0b3IgZ2F0aGVycyBhbGwgdGhlIG5lZWRlZCBpbmZvcm1hdGlvbiBmb3IgZmV0Y2ggYW5kL29yIGJyb3dzZXJcbiAgICogIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBnZXRVcmwgLSB0aGUgKGZ1bGwpIHVybCBvZiBkYXRhIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBzZW5kVG9Ccm93c2VyQ2FjaGUgIC0gQm9vbGVhbiB2YWx1ZSBkZXRlcm1pbmluZyBmZXRjaCBjYWNoaW5nLlxuICAgKiBAcGFyYW0gYnJvd3NlckNhY2hlTmFtZSAtIElmIHN0b3JpbmcgdGhlIHJlcXVlc3QgaW4gYnJvd3NlciBjYWNoZSwgdGhpcyBzdHJpbmcgcHJvdmlkZXMgdGhlIG5hbWUgZm9yIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBlcnJvckVsZW0gLSBTaG91bGQgdGhlIGZldGNoIHJlcXVlc3QgZmFpbCwgcmV0dXJuIGVycm9yIHN0YXR1cyB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBnZXRVcmw6IFVSTCxcbiAgICBzZW5kVG9Ccm93c2VyQ2FjaGU6IGJvb2xlYW4sXG4gICAgZXJyb3JFbGVtOiBIVE1MRWxlbWVudCxcbiAgICBicm93c2VyQ2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuZ2V0VXJsID0gZ2V0VXJsO1xuICAgIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID0gc2VuZFRvQnJvd3NlckNhY2hlO1xuICAgIHRoaXMuYnJvd3NlckNhY2hlTmFtZSA9IGJyb3dzZXJDYWNoZU5hbWU7XG4gICAgdGhpcy5lcnJvckVsZW0gPSBlcnJvckVsZW07XG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlXG4gICAqL1xuICBwdWJsaWMgZ2V0U2VuZFRvQnJvd3NlckNhY2hlKCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgdGhpcy5HRVRVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRHZXRVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGbGlwIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlIGJvb2xlYW4gdmFsdWUgZnJvbSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBzZXRTZW5kVG9Ccm93c2VyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFRvQnJvd3NlckNhY2hlID8gZmFsc2UgOiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIGZldGNoIHJlcXVlc3QgY2FuIHRha2UgVVJMIG9yIHN0cmluZyBwYXJhbWV0ZXIuIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYXBpR0VUXG4gICAqICBvYmplY3QgZm9yIGEgVVJMIGZldGNoIGJ5IGNyZWF0aW5nIGEgVVJMIGZyb20gdGhlIHN0cmluZywgb3IgcGFzc2luZyB0aGUgVVJMLlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKi9cbiAgcHVibGljIHNldEdldFVybChnZXRVcmw6IFVSTCB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZ2V0VXJsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmdldFVybCA9IG5ldyBVUkwoZ2V0VXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRVcmwgPSBnZXRVcmw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBIHB1YmxpYyBmdW5jdGlvbiBjcmVhdGluZyBhIGRhdGEgcHJvbWlzZSBvYmplY3QgZm9yIHRoZSBjYWxsZWQgZmV0Y2ggZnVuY3Rpb24uIElmXG4gICAqICB0aGUgcmVxdWVzdCBuZWVkcyBhZGRlZCB0byBicm93c2VyIHN0b3JhZ2UsIHRoZSBmZXRjaCBpcyBtYWRlIGFuZCBzZW50IHRvXG4gICAqICBzdG9yYWdlLiBBIGNsb25lZCBjb3B5IG9mIHRoZSBmZXRjaGVkIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBvcmlnaW5hbCByZXF1ZXN0IGlzXG4gICAqICBzZW50IHRvIHRoZSBjYWNoZS4gV2l0aG91dCBzZW5kaW5nIHRvIGJyb3dzZXIgY2FjaGUsIHRoZSBmZXRjaCBpcyByZXF1ZXN0ZWQgYW5kXG4gICAqIHJldHVybmVkLlxuICAgKlxuICAgKiBAcGFyYW0gZ2V0VXJsIC0gdGhlIChmdWxsKSB1cmwgb2YgZGF0YSByZXF1ZXN0LlxuICAgKiBAcmV0dXJucyBkYXRhQ2FjaGVQcm9taXNlOiBQcm9taXNlPHVua25vd24+XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYXBpR2V0KGdldFVybDogVVJMKSB7XG4gICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgY2FjaGUgc3RvcmFnZVxuICAgIGlmICh0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSkge1xuICAgICAgLy9UaGUgcmV0dXJuZWQgZGF0YSBpcyBwYWNrYWdlcyBhcyBhIFByb21pc2Ugb2JqZWN0XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFwiY2FjaGVzXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgLy9PcGVuIGNhY2hlIGFuZCBjaGVjayBmb3IgcmVxdWVzdCBleGlzdGluZyBpbiBDYWNoZSBTdG9yYWdlXG4gICAgICAgICAgd2luZG93LmNhY2hlc1xuICAgICAgICAgICAgLm9wZW4odGhpcy5icm93c2VyQ2FjaGVOYW1lKVxuICAgICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgICBjYWNoZXMubWF0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAvL05vIG1hdGNoZXMgZm9yIHRoaXMgcmVxdWVzdCBpbiBTdG9yYWdlIENhY2hlLCBzbyBmZXRjaCB0aGUgcmVxdWVzdCBub3JtYWxseVxuICAgICAgICAgICAgICAgICAgLy9VcG9uIHN1Y2Nlc3MsIGEgY2xvbmVkIGNvcHkgd2lsbCBuZWVkIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAgICAgICAgICAgZmV0Y2goZ2V0VXJsKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29weSB0aGUgcmVzcG9uc2Ugc2luY2UgaXQgY2FuIG9ubHkgYmUgcmVhZCBvbmNlXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRSZXNwID0gcmVzdWx0LmNsb25lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHJlc3VsdCB0byB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lZFJlc3Auc3RhdHVzICE9IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChnZXRVcmwsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZWRSZXNwLmpzb24oKS50aGVuKHRleHQgPT4gdGV4dCkpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vQ2FjaGUgaGl0IHN1Y2Nlc3MsIHJldHVybiB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuanNvbigpLnRoZW4odGV4dCA9PiB0ZXh0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgIC8vQ2Fubm90IG9wZW4gU3RvcmFnZSBDYWNoZVxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAlY1Byb2JsZW0gb3BlbmluZyBDYWNoZSBTdG9yYWdlLiBOYW1lOiAke3RoaXMuYnJvd3NlckNhY2hlTmFtZX1gLCBcImNvbG9yOiBncmV5XCIpO1xuICAgICAgICAgICAgICB0aGlzLnNlbmRUb0Jyb3dzZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgLy9BdHRlbXB0IHJhdyBmZXRjaFxuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZmV0Y2hEYXRhKGdldFVybCkpO1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiUHJvbWlzZSBlcnJvciBvbiBkYXRhIGZldGNoLlwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvL1RoZSBwcm9taXNlIGhhcyByZXNvbHZlZCAtLT4gcmV0dXJuIHRoZSBwcm9taXNlIGRhdGFcbiAgICAgIGRhdGFDYWNoZVByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhQ2FjaGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YUNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmZldGNoRGF0YShnZXRVcmwpKTtcbiAgICAgIH0pO1xuICAgICAgZGF0YUNhY2hlUHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRhdGFDYWNoZVByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgcmVxdWVzdGVkIHJlc3BvbnNlIGlzIG9mIHZhbGlkIHN0YXR1cyAnT0snIGFuZCAnMjAwJ1xuICAgKiBAcGFyYW0gcmVzIC0gdGhlIGZldGNoZWQgcmVzcG9uc2UuXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyByZXMuanNvbigpIG9uIHN1Y2Nlc3Mgb3IgcmV0dXJucyByZXNwb25zZSBvbiBmYWlsdXJlLlxuICAgKi9cbiAgcHJpdmF0ZSBhcGlSZXNwb25zZUVycm9yQ2hlY2socmVzOiBSZXNwb25zZSkge1xuICAgIGlmIChyZXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgdGhpcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gXCI0MDQgZmV0Y2ggZXJyb3IhXCI7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIXJlcy5vayB8fCByZXMuc3RhdHVzICE9IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5vayArIFwiOiBcIiArIHJlcy5zdGF0dXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgZmV0Y2ggcmVxdWVzdCwgcmV0dXJuaW5nIGEgZmV0Y2ggcHJvbWlzZS5cbiAgICogQHBhcmFtIGdldFVybCAtIHRoZSAoZnVsbCkgdXJsIG9mIGRhdGEgcmVxdWVzdC5cbiAgICogQHJldHVybnMgZGF0YS50ZXh0KCkgb3IgZGF0YSBiYXNlZCBvbiB0aGUgaW5zdGFuY2UgcmV0dXJuZWQuXG4gICAqL1xuICBwcml2YXRlIGZldGNoRGF0YShnZXRVcmw6IFVSTCkge1xuICAgIHJldHVybiBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB0aGlzLmFwaVJlc3BvbnNlRXJyb3JDaGVjayhyZXNwb25zZSkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBkYXRhLnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoZSk7XG4gICAgICAgIHRoaXMuZXJyb3JFbGVtLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW0uaW5uZXJUZXh0ID0gYCR7ZS5tZXNzYWdlfWA7XG4gICAgICB9KTtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIGNsaWVudCB7XG4gIHB1YmxpYyBvbGRVUkwgPSBkb2N1bWVudC5yZWZlcnJlcjtcbiAgcHVibGljIGJyb3dzZXJwbGF0Zm9ybTogc3RyaW5nO1xuICBwdWJsaWMgdXNlcmFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIHB1YmxpYyBjb25uZWN0aW9udHlwZTtcbiAgcHVibGljIGNvbm5lY3Rpb25ydHQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm93c2VycGxhdGZvcm0gPSB0aGlzLnNldGJyb3dzZXJwbGF0Zm9ybSgpO1xuICAgIHRoaXMuY29ubmVjdGlvbnR5cGUgPSB0aGlzLnNldGNvbm5lY3Rpb250eXBlKCk7XG4gICAgdGhpcy5jb25uZWN0aW9ucnR0ID0gdGhpcy5zZXRjb25uZWN0aW9ucnR0KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBzZXRicm93c2VycGxhdGZvcm0oKSB7XG4gICAgaWYgKFwidXNlckFnZW50RGF0YVwiIGluIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIC8vdXNlckFnZW50RGF0YSBpcyBOYXZpZ2F0b3JVQURhdGEgdHlwZSwgbm90IGZvdW5kIGluIFR5cGVTY3JpcHQuXG4gICAgICAvL0tub3duIHRvIEVkZ2UgYnJvd3NlcjogT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50RGF0YSlcbiAgICAgIGxldCB1c2VyQWdlbnREYXRhOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgYXMgb2JqZWN0O1xuICAgICAgbGV0IHBsYXRmb3JtZGF0YTogc3RyaW5nID0gPHN0cmluZz51c2VyQWdlbnREYXRhLnBsYXRmb3JtO1xuICAgICAgcmV0dXJuIHBsYXRmb3JtZGF0YTtcbiAgICB9IGVsc2UgdGhpcy5icm93c2VycGxhdGZvcm0gPSBcIlwiO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0Y29ubmVjdGlvbnR5cGUoKSB7XG4gICAgaWYgKFwiY29ubmVjdGlvblwiIGluIHdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIC8vY29ubmVjdGlvbiBpcyBOZXR3b3JrSW5mb3JtYXRpb24gdHlwZSwgbm90IGZvdW5kIGluIFR5cGVTY3JpcHQuXG4gICAgICAvL0tub3duIHRvIEVkZ2UgYnJvd3NlcjogT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbilcbiAgICAgIGxldCBjb25uZWN0aW9uOiBhbnkgPSB3aW5kb3cubmF2aWdhdG9yLmNvbm5lY3Rpb24gYXMgb2JqZWN0O1xuICAgICAgbGV0IGVmZmVjdGl2ZXR5cGU6IHN0cmluZyA9IDxzdHJpbmc+Y29ubmVjdGlvbi5lZmZlY3RpdmVUeXBlO1xuICAgICAgcmV0dXJuIGVmZmVjdGl2ZXR5cGU7XG4gICAgfSBlbHNlIHRoaXMuY29ubmVjdGlvbnR5cGUgPSBcIlwiO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0Y29ubmVjdGlvbnJ0dCgpIHtcbiAgICBpZiAoXCJjb25uZWN0aW9uXCIgaW4gd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgbGV0IGNvbm5lY3Rpb246IGFueSA9IHdpbmRvdy5uYXZpZ2F0b3IuY29ubmVjdGlvbiBhcyBvYmplY3Q7XG4gICAgICBsZXQgcnR0OiBzdHJpbmcgPSA8c3RyaW5nPmNvbm5lY3Rpb24ucnR0O1xuICAgICAgcmV0dXJuIHJ0dDtcbiAgICB9IGVsc2UgdGhpcy5jb25uZWN0aW9ucnR0ID0gXCJcIjtcbiAgfTtcbiAgXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuZXhwb3J0IGNsYXNzIENvbG9yQ29kZVdpZGdldCB7XG4gIHByaXZhdGUgZWxlbXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+W107XG4gIHByaXZhdGUgY29sb3I6IHN0cmluZ1tdO1xuICBwcml2YXRlIHJlc2V0YnRuOiBFbGVtZW50O1xuICBjb25zdHJ1Y3Rvcihjb2xvcmxlc3NlbGVtZW50czogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5bXSwgY29sb3JzOiBzdHJpbmdbXSwgcmVzZXRidG46IEVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1zID0gY29sb3JsZXNzZWxlbWVudHM7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9ycztcbiAgICB0aGlzLnJlc2V0YnRuID0gcmVzZXRidG47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRpbmcodGhpcy5lbGVtc1tpXSwgdGhpcy5jb2xvcltpXSk7XG4gICAgICB0aGlzLmNzc0V4YW1wbGVIaWdobGlnaHRSZXNldCh0aGlzLmVsZW1zW2ldKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNvbG9yIHRoZSBleGFtcGxlIGFyZWEncyBlbGVtZW50cyB1c2luZyBjc3NcbiAgICogQHBhcmFtIGVsZW1zbGlzdCAtIE5vZGUgbGlzdCBvZiBIVE1MRWxlbGVtZW50cy4gSS5FLiB1c2luZyBxdWVyeS5TZWxlY3RvckFsbCgpXG4gICAqIEBwYXJhbSBjb2xvciAtIFN0cmluZyBvZiBDU1MgY29sb3IgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgY3NzRXhhbXBsZUhpZ2hsaWdodGluZyhlbGVtc2xpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+LCBjb2xvcjogc3RyaW5nKSB7XG4gICAgZWxlbXNsaXN0LmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbGVtc2xpc3QuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVsZW1zbGlzdC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgIGVsZW0uc3R5bGUuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvL2Z1bmN0aW9uIHRvIHJlc2V0IHRoZSBjc3MgY29kZSBwcm9wZXJ0aWVzIGNvbG9yIHRvIG9yaWdpbmFsXG4gIHByaXZhdGUgY3NzRXhhbXBsZUhpZ2hsaWdodFJlc2V0KGVsZW1zbGlzdDogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLnJlc2V0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBlbGVtc2xpc3QuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgeyBhcGlHRVQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCBEaWN0aW9uYXJ5U2VhcmNoTWFya3VwIGZyb20gXCIuL2RpY3Rpb25hcnlTZWFyY2hNYXJrdXBcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuaW1wb3J0IHsgUldCUGFyc2VKU09OIH0gZnJvbSBcIi4vcndiSnNvbkNvbnZlcnRlclwiO1xuaW1wb3J0IHsgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2ggaXMgYSBzZXQgb2YgbWFya3VwIGNyZWF0aW9uIGFuZCBmdW5jdGlvbnMgd2hpY2ggYWxsb3cgYSB1c2VyXG4gKiAgdG8gbG9vayB1cCBhIHdvcmQgbGlrZSBhIERpY3Rpb25hcnkuIFdoZW4gY2FsbGVkLCB0aGUgdXNlcidzIGlucHV0IGlzIHZhbGlkYXRlZFxuICogIGFzIGFuIGFjY2VwdGFibGUgd29yZCBvciBpdCBkZWNsaW5lcyB0aGUgcmVxdWVzdCwgdGhlbiBzaG93aW5nIHRoZSB1c2VyIGlmIHRoZSB3b3JkXG4gKiAgaXMgYWNjZXB0YWJsZS5cbiAqXG4gKiBDcmVhdGluZyBhIGRpY3Rpb25hcnkgc2VhcmNoIHdpZGdldCByZXF1aXJlcyBwYXNzaW5nIGEgcmVmZXJlbmNlIGVsZW1lbnQgKGZvciBhXG4gKiBrbm93biBwbGFjZW1lbnQgbG9jYXRpb24pIHRoYXQgY29udGFpbnMgdGhlICdkaWN0aW9uYXJ5V2lkZ2V0JyBjbGFzcy5cbiAqXG4gKiAgIG5ldyBEaWN0aW9uYXJ5U2VhcmNoKGVsZW0pO1xuICpcbiAqIEFsbCB0aGUgbmVlZGVkIGVsZW1lbnRzIGFuZCBmdW5jdGlvbmFsaXR5IGFyZSBhZGRlZCB0byB0aGUgcGFnZS5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5U2VhcmNoIGV4dGVuZHMgRGljdGlvbmFyeVNlYXJjaE1hcmt1cCB7XG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzdGF0aWMgd29yZFN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXdvcmRbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3Q6IHN0cmluZyA9IFwiUldCX3dvcmRfZmV0Y2hcIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVxdWVzdFVybDogc3RyaW5nID0gXCJodHRwczovL2FwaS5kaWN0aW9uYXJ5YXBpLmRldi9hcGkvdjIvZW50cmllcy9lbi9cIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1dvcmRzQnRuSXNDcmVhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3b3JkVVJMOiBVUkw7XG4gIHByaXZhdGUgd29yZERhdGE6IG9iamVjdDtcblxuICAvKipcbiAgICogVGhpcyBjb25zdHJ1Y3RvciBjcmVhdGVzIGFsbCB0aGUgZnVuY3Rpb25hbGl0eSBhbmQgbWFya3VwIG5lZWRlZCBmb3IgdGhlXG4gICAqICBEaWN0aW9uYXJ5IFNlYXJjaCB3aWRnZXQgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBsYWNlIHdpZGdldCBtYXJrdXAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9JbnZva2Ugc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci5cbiAgICBzdXBlcihlbGVtKTtcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50cyA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAvL0luaXRpYWxpemUgdGhlIGRpY3Rpb25hcnkgd2lkZ2V0IHdpdGggY2xpY2sgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5hZGRXaWRnZXRFdmVudHMoKTtcbiAgICAvL1N0b3JlIHdvcmRzIGNhY2hlIGRhdGEgd2l0aCBpbml0aWFsaXphdGlvbi5cbiAgICBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID0gRGljdGlvbmFyeVNlYXJjaC5nZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCk7XG4gICAgRGljdGlvbmFyeVNlYXJjaC5jb3VudCsrO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBMb2NhbCBTdG9yYWdlIHdvcmRzIHByZXZpb3VzbHkgc3RvcmVkIHdpdGggdGhlIERpY3Rpb25hcnkgU2VhcmNoIFdpZGdldC5cbiAgICpcbiAgICogQHJldHVybnMgRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSAtIHRoZXNlIGFyZSB0aGUgd29yZHMgc3RvcmVkIHByZXZpb3VzbHkgaW4gdGhlXG4gICAqICBicm93c2VyIGNhY2hlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRMb2NhbFN0b3JhZ2VXb3JkQ2FjaGVzKCkge1xuICAgIC8vTG9jYWwgU3RvcmFnZSAnd29yZC1jYWNoZXMnIGl0ZW1zIGRhdGEgYXNzaWdubWVudFxuICAgIC8vY2FjaGUgcmVzcG9uc2UgbGlua3MgYW5kIGNhY2hlIG5hbWUgYXJlIHByZXZpb3VzbHkgc3RvcmVkIGluIExvY2FsIFN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZVN0cjogc3RyaW5nO1xuICAgIGlmIChSd2JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCB0cnVlLCB0cnVlKSkge1xuICAgICAgLy9UaGUgTG9jYWwgU3RvcmFnZSBpcyBudWxsIG9yIGVtcHR5LS0+IENvbmZpcm0gaGVyZSB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIGFueSBDYWNoZSBTdG9yYWdlIGl0ZW1zIGluIGVycm9yXG4gICAgICBpZiAoXCJjYWNoZXNcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jYWNoZXMuaGFzKERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3QpKSB7XG4gICAgICAgICAgd2luZG93LmNhY2hlcy5kZWxldGUoRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAvL2NoZWNrIHRoZSB3b3JkLWNhY2hlIHZhbHVlIGZvciBjb3JyZWN0IGpzb24gcGFyc2luZ1xuICAgIGxldCBwYXJzZXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JQYXJzZUpTT04oc3RvcmFnZVN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ3b3JkLWNhY2hlc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHRoaXMuZ2V0TG9jYWxTdG9yYWdlV29yZENhY2hlcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0byByZXR1cm4gdGhlIHByZXZpb3VzbHkgc2VhcmNoZWQgd29yZC5cbiAgICpcbiAgICogQHJldHVybnMgdGhpcy53b3JkVVJMXG4gICAqL1xuICBwdWJsaWMgZ2V0V29yZFVSTCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkVVJMO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIHRvIHJldHVybiB0aGUgZmV0Y2hlZCB3b3JkIGRhdGEuXG4gICAqXG4gICAqIEByZXR1cm5zIHRoaXMud29yZERhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRXb3JkRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkRGF0YTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBjbGljayBhbmQga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB3aWRnZXQuIElucHV0IGV2ZW50IGxpc3RlbmVycyAnY2xpY2snXG4gICAqICBhbmQgJ2tleXByZXNzJyBhd2FpdCBmb3IgYSBzZWFyY2ggY2FsbC4gQWxzbywgc2hvdWxkIGEgdXNlciB3YW50IHRvIHNlYXJjaCBhXG4gICAqICBwcmV2aW91c2x5IHNlYXJjaGVkIHdvcmQsIHRoZSB3aWRnZXQgYWRhcHRzIG1hcmt1cCBmb3IgdGhhdCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBhZGRXaWRnZXRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkEgc2VhcmNoIGVsZW1lbnQgaXMgdW5kZWZpbmVkIGZyb20gc2VhcmNoV29yZCB8IHdvcmRTZWFyY2hcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpY3Rpb25hcnktYnRuc1wiKTtcbiAgICBjb25zdCBoaWRlUHJldmlvdXNQYW5lbCA9ICgpID0+IHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLy9BZGQgZm9ybSBpbnB1dCBldmVudCBsaXN0ZW5lcnNcbiAgICAvL1Vwb24gaW5wdXQgZW50cnksIGZpcmUgQVBJIGZldGNoXG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy53b3JkU2VhcmNoKHRoaXMuc2VhcmNoRWxlbWVudHMsIGZhbHNlLCBudWxsKTtcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkKSBoaWRlUHJldmlvdXNQYW5lbCgpO1xuICAgIH0pO1xuXG4gICAgLy9cIlByZXZpb3VzIHdvcmQgc2VhcmNoZXNcIiBidXR0b24gZmV0Y2hlcyBsb2NhbGx5IHN0b3JlZCB3b3Jkc1xuICAgIC8vQ2xpY2tpbmcgdGhlIGJ1dHRvbiBkaXNwbGF5cyBlYWNoIHdvcmQgaW4gYSBsaXN0IHdpdGhpbiB0aGUgd2lkZ2V0XG4gICAgdGhpcy5zZWFyY2hFbGVtZW50cy5wcmV2aW91c1dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNoZWNrY3JlYXRlUHJldmlvdXNXb3JkQnV0dG9ucygpO1xuICAgIH0pO1xuXG4gICAgLy9cIlJlZnJlc2hcIiBidXR0b24gcmVsb2FkcyB0aGUgcGFnZVxuICAgIHRoaXMuc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgY2hlY2tjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKCkge1xuICAgIGNvbnN0IHBsYWNlbWVudGxvY2F0aW9uaG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1dvcmRzXCIpO1xuICAgIGxldCBidXR0b25Db250YWluZXIgPSB0aGlzLnNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZHNDb250YWluZXI7XG5cbiAgICAvL0NoZWNrIHRoZSBwbGFjZW1lbnQgbG9jYXRvciBhbmQgd29yZCBjYWNoZXMgZm9yIHVuZGVmaW5lZFxuICAgIGlmIChwbGFjZW1lbnRsb2NhdGlvbmhvbGRlciA9PSBudWxsIHx8IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2UgPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQpIHtcbiAgICAgICAgY29uc3Qgbm9Xb3Jkc0hlYWRpbmdFbGVtID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgICBub1dvcmRzSGVhZGluZ0VsZW0uY2xhc3NMaXN0LmFkZChcImRpY3Rpb25hcnktYnRuXCIsIFwiZXJyb3Itbm90Zm91bmRcIik7XG4gICAgICAgIG5vV29yZHNIZWFkaW5nRWxlbS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXMgd29yZHMgbm90IGZvdW5kLiBUaGUgY2FjaGUgaXMgZW1wdHkuXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXNXb3Jkc0J0bklzQ3JlYXRlZCkge1xuICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHRoaXMucHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQsIGJ1dHRvbkNvbnRhaW5lcik7XG4gIH07XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcmV2aW91c1dvcmRCdXR0b25zKHByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkOiBhbnksIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBpZiAocHJldmlvdXNXb3Jkc0J0bldhc0NsaWNrZWQpIHtcbiAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5XYXNDbGlja2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwcmV2aW91c3dvcmRidXR0b25zOiBEaWN0aW9uYXJ5U2VhcmNoUHJldmlvdXNXb3JkS2V5RWxlbWVudHNbXSA9XG4gICAgICB0aGlzLmNyZWF0ZVByZXZpb3VzV29yZFNlYXJjaGVzRWxlbWVudHMoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSwgYnV0dG9uQ29udGFpbmVyKTtcbiAgICBmb3IgKGxldCBidG4gb2YgcHJldmlvdXN3b3JkYnV0dG9ucykge1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmRzQnRuV2FzQ2xpY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZHNCdG5Jc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgbmV3IGJ1dHRvbi5cbiAgICAgIC8vdGhpcyBpcyB0aGUgY2FjaGVkIHdvcmQgYnV0dGVuLiB3aGVuIGl0J3MgY2xpY2tlZCwgZmlyZSBhIHdvcmQgc2VhcmNoXG4gICAgICBidG4uY2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMud29yZFNlYXJjaCh0aGlzLnNlYXJjaEVsZW1lbnRzLCB0cnVlLCBidG4ud29yZCk7XG4gICAgICB9KTtcbiAgICAgIC8vTU9CSUxFXG4gICAgICAvL3doZW4gaG92ZXJlZCwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgIGJ0bi53b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKCkgPT4ge1xuICAgICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgIC8vd2hlbiBub3QgaG92ZXJlZCwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBvcHRpb25cbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCI1MCU7XCI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2hlbiBob3ZlcmVkLCBkaXNwbGF5IHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgLy93aGVuIG5vdCBob3ZlcmVkLCBoaWRlIHRoZSBkZWxldGUgYnV0dG9uIG9wdGlvblxuICAgICAgICBidG4ud29yZEhlYWRpbmdFbGVtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vd2hlbiBmb2N1cyAoc3VjaCBhcyB1c2luZyBrZXlib2FyZCBvbmx5KSwgZGlzcGxheSB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoZTogYW55KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLmRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgfSk7XG4gICAgICAvL3doZW4gbm90IGZvY3VzZWQsIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gb3B0aW9uXG4gICAgICBidG4uZGVsZXRlQ2FjaGVXb3JkSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9KTtcblxuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0ZSBidXR0b25cbiAgICAgIGJ0bi5kZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnRuLndvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVEaWN0aW9uYXJ5VGVybWZyb21Mb2NhbFN0b3JhZ2UoYnRuLmNhY2hlV29yZEhlYWRpbmdFbGVtLnRleHRDb250ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkcyB0aGUgd29yZCB0byB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgY29udGFpbmluZyB3b3JkIGRhdGEsIFVSTCwgYW5kIGNhY2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbHN0b3JhZ2V2YWx1ZSAtIFRoaXMgaW50ZXJmYWNlIHN0b3JlcyBpbmZvcm1hdGlvbiB3aGVyZSBzZW5kaW5nIHRvIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIGFkZERpY3Rpb25hcnlUZXJtdG9Mb2NhbFN0b3JhZ2UobG9jYWxzdG9yYWdldmFsdWU6IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAvL0xvZyB0aGUgd29yZCBjYWNoZSBjcmVhdGlvblxuICAgIGNvbnN0IGFkZGVkd29yZGNhY2hlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNBZGRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXZhbHVlLndvcmR9YCxcbiAgICAgICAgXCJjb2xvcjpjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtcIlxuICAgICAgKTtcbiAgICB9O1xuICAgIC8vVGhlICdsb2NhbHN0b3JhZ2V2YWx1ZScgbmVlZHMgYWRkZWQgdG8gbG9jYWwgc3RvcmFnZSBjYWNoZVxuICAgIC8vTG9jYWwgc3RvcmFnZSBtYXkgYmUgZW1wdHkgb3IgYWxyZWFkeSBoYXZpbmcgdGhlIHdhbnRlZCBzZWFyY2hlZCB3b3JkXG4gICAgLy9DaGVjayBzdG9yYWdlIGlzIG5vdCBudWxsLiBJZiBpdCBpcywgYWRkIHRoZSB3b3JkLlxuICAgIGlmIChEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlID09IG51bGwpIHtcbiAgICAgIGlmIChSd2JFcnJvci5jaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcIkRpY3Rpb25hcnlTZWFyY2hcIiwgXCJ3b3JkLWNhY2hlc1wiLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICAgIC8vQWRkIHRoZSBzdG9yYWdlIHdvcmQgdG8gYW4gYXJyYXlcbiAgICAgICAgbGV0IHdvcmRTdG9yZTogbG9jYWxzdG9yYWdld29yZFtdID0gW107XG4gICAgICAgIHdvcmRTdG9yZS5wdXNoKGxvY2Fsc3RvcmFnZXZhbHVlKTtcbiAgICAgICAgbGV0IGpzb25zdHI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgICAgbGV0IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkID0gT2JqZWN0LmNyZWF0ZShuZXcgUldCU3RyaW5naWZ5SlNPTih3b3JkU3RvcmUpKTtcbiAgICAgICAgaWYgKCFzdHJpbmdpZnl0ZXN0c2luZ2xld29yZC5wYXNzZWQpIHtcbiAgICAgICAgICAvL3N0cmluZ2lmeSBvYmplY3QgZGlkIG5vdCB3b3JrLCBzbyByZXR1cm5cbiAgICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3RzaW5nbGV3b3JkLnJldHVybnN0cjtcblxuICAgICAgICAvLyBMb2NhbCBzdG9yYWdlIGlzIGVtcHR5ID0+IGFkZCB0aGUgd29yZFxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndvcmQtY2FjaGVzXCIsIGpzb25zdHIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJWM8UldCPiVjQ3JlYXRlZCBzdG9yYWdlIGtleTogd29yZC1jYWNoZXNgLFxuICAgICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgICApO1xuICAgICAgICBhZGRlZHdvcmRjYWNoZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9Mb2NhbCBzdG9yYWdlIGlzIG5vdCBlbXB0eS4gSGVyZSwgd2UgbmVlZCB0byBhZGQgdGhlIHdvcmQgdG8gdGhlIGV4aXN0aW5nIHdvcmQgY2FjaGUuXG4gICAgbGV0IGFsbGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkW10gPSBEaWN0aW9uYXJ5U2VhcmNoLndvcmRTdG9yYWdlO1xuICAgIGxldCBqc29uc3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy9NYXRjaCB0aGUgY3VycmVudCBVUkwgZm9yIGNhY2hlIG1hbmFnZW1lbnRcbiAgICBmb3IgKGxldCBjYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKGNhY2hlLndvcmRVUkwgPT0gbG9jYWxzdG9yYWdldmFsdWUud29yZFVSTCkge1xuICAgICAgICAvL1dvcmQgaXMgYWxyZWFkeSBpbiBMb2NhbCBTdG9yYWdlXG4gICAgICAgIC8vTm8gbmVlZCB0byBhZGQgaXQgdG8gdGhlIGFycmF5XG4gICAgICAgIC8vTE9HTEVBRlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIC8vQWRkIHdvcmQgdG8gZXhpc3RpbmcgJ3dvcmQtY2FjaGVzJyBpbiBMb2NhbCBTdG9yYWdlXG4gICAgYWxsY2FjaGUucHVzaChsb2NhbHN0b3JhZ2V2YWx1ZSk7XG5cbiAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgIGxldCBzdHJpbmdpZnl0ZXN0ZG91Ymxld29yZCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZiAoIXN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnBhc3NlZCkge1xuICAgICAgLy9zdHJpbmdpZnkgb2JqZWN0IGRpZCBub3Qgd29yaywgc28gcmV0dXJuXG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAganNvbnN0ciA9IHN0cmluZ2lmeXRlc3Rkb3VibGV3b3JkLnJldHVybnN0cjtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwganNvbnN0cik7XG4gICAgYWRkZWR3b3JkY2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgcHJldmlvdXMgd29yZCBkYXRhIGZyb20gYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgLS0+IEtleS9WYWx1ZVxuICAgKiBkYXRhIHJlZmVyZW5jaW5nIHdvcmRzIHN0b3JlZCBpbiBsb2NhbCBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGxvY2Fsc3RvcmFnZXdvcmQgLSBzdHJpbmcgZnJvbSBcIlByZXZpb3VzIFdvcmQgU2VhcmNoZXNcIiBidXR0b25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlRGljdGlvbmFyeVRlcm1mcm9tTG9jYWxTdG9yYWdlKGxvY2Fsc3RvcmFnZXdvcmQ6IHN0cmluZykge1xuICAgIC8vUmVtb3ZlIHRoZSBjYWNoZSBpdGVtIHRvIExvY2FsIFN0b3JhZ2UsIENhY2hlIFN0b3JhZ2VcbiAgICAvL0NoZWNrIGxvY2FsIHN0b3JhZ2UgaXMgbm90IG51bGwgb3IgZW1wdHlcbiAgICBpZiAoRGljdGlvbmFyeVNlYXJjaC53b3JkU3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9HZXQgdGhlIHdvcmRzIGFycmF5IGZyb20gTG9jYWwgU3RvcmFnZVxuICAgIC8vUldCRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShcIkRpY3Rpb25hcnlXaWRnZXRcIiwgXCJ3b3JkLWNhY2hlc1wiKTsgLy9sb2cgd2hldGhlciBmZXRjaGVkIHdvcmQgY2FjaGUgaXMgbnVsbCBvciBlbXB0eS5cbiAgICBsZXQgYWxsY2FjaGU6IGxvY2Fsc3RvcmFnZXdvcmRbXSA9IERpY3Rpb25hcnlTZWFyY2gud29yZFN0b3JhZ2U7XG5cbiAgICAvL1JlbW92ZSB0aGUgd29yZCBmcm9tIENhY2hlIFN0b3JhZ2UgYW5kIExvY2FsIFN0b3JhZ2Ugd29yZCBhcnJheVxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiBhbGxjYWNoZSkge1xuICAgICAgaWYgKHdvcmRDYWNoZS53b3JkID09IGxvY2Fsc3RvcmFnZXdvcmQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZSh3b3JkQ2FjaGUud29yZFVSTCk7XG4gICAgICAgIGFsbGNhY2hlLnNwbGljZShhbGxjYWNoZS5pbmRleE9mKHdvcmRDYWNoZSksIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCB3b3JkIGNhY2hlOiAke2xvY2Fsc3RvcmFnZXdvcmR9YCxcbiAgICAgICAgICBcImNvbG9yOmRhcmtjeWFuO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsY2FjaGUubGVuZ3RoID09IDApIHtcbiAgICAgIC8vVGhlIHJlbW92ZWQgd29yZCB3YXMgdGhlIGxhc3Qgd29yZCBpbiB0aGUgYXJyYXksIHNvIHJlbW92ZSB0aGUgY29udGFpbmVyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIndvcmQtY2FjaGVzXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiB3b3JkLWNhY2hlc2AsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICBsZXQgd29yZGNhY2hlc3N0cmZ5dGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlN0cmluZ2lmeUpTT04oYWxsY2FjaGUpKTtcbiAgICBpZiAoIXdvcmRjYWNoZXNzdHJmeXRlc3QucGFzc2VkKSB7XG4gICAgICAvL0xPR0xFQUZcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL1JldHVybiByZW1haW5pbmcgd29yZHMgdG8gTG9jYWwgU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid29yZC1jYWNoZXNcIiwgd29yZGNhY2hlc3N0cmZ5dGVzdC5yZXR1cm5zdHIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBmZXRjaCByZXF1ZXN0IGZyb20gQ2FjaGUgU3RvcmFnZS4gVXRpbGl6ZXNcbiAgICogRGljdGlvbmFyeVNlYXJjaC5DYWNoZVN0b3JhZ2VOYW1lb2ZXb3JkUmVxdWVzdCBmb3IgY2FjaGUgbmFtZS5cbiAgICogQHBhcmFtIHJlbW92ZVVSTFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVSZXF1ZXN0ZnJvbUNhY2hlU3RvcmFnZShyZW1vdmVVUkw6IFVSTCkge1xuICAgIHdpbmRvdy5jYWNoZXMub3BlbihEaWN0aW9uYXJ5U2VhcmNoLkNhY2hlU3RvcmFnZU5hbWVvZldvcmRSZXF1ZXN0KS50aGVuKGNhY2hlID0+IHtcbiAgICAgIGNhY2hlcy5tYXRjaChyZW1vdmVVUkwpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ibGVtIG1hdGNoaW5nIHRoZSByZXN1bHQuIFJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNhY2hlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgICBjYWNoZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5kZWxldGUocmVtb3ZlVVJMKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZHluYW1pY2FsbHkgcmVjYWxscyBhIHdvcmQgZGVmaW5pdGlvbiByZXF1ZXN0IGFuZCBpbnN0YW50aWF0ZXMgYXBpR0VUKCkuIFRoZVxuICAgKiByZXR1cm5lZCBwcm9taXNlIGFsc28gZHltYW5pY2FsbHkgYW5zd2VycyB0aGUgd2lkZ2V0IG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHdvcmQgLSBUaGUgd29yZCBzZWFyY2hlZCBmcm9tIHdpZGdldCBpbnB1dC5cbiAgICogQHBhcmFtIHdvcmRVcmwgLSBUaGUgZmV0Y2ggcmVxdWVzdCBVUkwuXG4gICAqIEBwYXJhbSBzZWFyY2hFbGVtcyAtIFdpZGdldCBFbGVtZW50cyAtLSBrZXkgd2lkZ2V0IGZ1bmN0aW9uIGVsZW1lbnRzLlxuICAgKiBAcGFyYW0gc2VuZFRvQ2FjaGUgLSA/IFNlbmQgZmV0Y2ggcmVxdWVzdCB0byBDYWNoZSBTdG9yYWdlIDogRmV0Y2ggd2l0aG91dCBzdG9yaW5nIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0gY2FjaGVOYW1lIC0gSWYgc2VuZGluZyBmZXRjaCByZXF1ZXN0cyB0byBjYWNoZSwgcHJvdmlkZSBhIG5hbWUgdG8gc3RvcmUgaXQgdW5kZXIuXG4gICAqIEByZXR1cm5zIC0gd29yZERhdGE6IFByb21pc2U8dW5rbm93bj5cbiAgICovXG4gIHByaXZhdGUgZmV0Y2hEaWN0aW9uYXJ5VGVybShcbiAgICB3b3JkOiBzdHJpbmcsXG4gICAgd29yZFVybDogVVJMLFxuICAgIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMsXG4gICAgc2VuZFRvQ2FjaGU6IGJvb2xlYW4sXG4gICAgY2FjaGVOYW1lOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIC8vQSBmdW5jdGlvbiBjYWxsIHBhcmFtZXRlciBvcHRpb24gaXMgdG8gc3RvcmUgdGhlIHdvcmQgcmVxdWVzdCBpbiBicm93c2VyJ3MgQ2FjaGUgU3RvcmFnZVxuICAgIC8vU3RydWN0dXJlIHRoZSB3b3JkIGRhdGEgdmlhICdsb2NhbHN0b3JhZ2V3b3JkdmFsdWUnIGludGVyZmFjZSB1c2VkIHRocm91Z2hvdXQgZmV0Y2hpbmdcbiAgICBsZXQgd29yZGNhY2hlOiBsb2NhbHN0b3JhZ2V3b3JkID0ge1xuICAgICAgaW5DYWNoZTogc2VuZFRvQ2FjaGUsXG4gICAgICB3b3JkOiB3b3JkLFxuICAgICAgd29yZFVSTDogd29yZFVybCxcbiAgICAgIGNhY2hlTmFtZTogc2VuZFRvQ2FjaGUgPyBjYWNoZU5hbWUgOiBcIlwiLFxuICAgIH07XG5cbiAgICAvL0FzeW5jaHJvbm91cyBmZXRjaCByZXFldXN0IGFuZCBkeW5hbWljIG1hcmt1cCBjcmVhdGlvbiBmcm9tIHRoZSBkYXRhJ3MgcmV0dXJuXG4gICAgY29uc3Qgd29yZEZldGNoUmVxdWVzdCA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vQ2FsbCBhcGlHRVQoKSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgIGNvbnN0IHdvcmRGZXRjaCA9IG5ldyBhcGlHRVQoXG4gICAgICAgIHdvcmRjYWNoZS53b3JkVVJMLFxuICAgICAgICB3b3JkY2FjaGUuaW5DYWNoZSxcbiAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLFxuICAgICAgICB3b3JkY2FjaGUuY2FjaGVOYW1lXG4gICAgICApO1xuICAgICAgbGV0IG5vRGVmaW5pdGlvbnM6IGJvb2xlYW47XG5cbiAgICAgIC8vRmV0Y2ggcmVxdWVzdCBtZXRob2QgY2FsbC4gUmV0dXJuZWQgZGF0YSBtYXkgYmUgdGhlIHdvcmQgZGVmaW5pdGlvblxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3b3JkRmV0Y2guYXBpR2V0KHdvcmRGZXRjaC5nZXRHZXRVcmwoKSk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvL0lmIHRoZSByZXR1cm5lZCBkYXRhIGlzIGEgc3RyaW5nLCBpdCBpcyB0aGUgd29yZCBkZWZpbml0aW9uIGRhdGEuXG4gICAgICAgIG5vRGVmaW5pdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihkYXRhKSk7XG4gICAgICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICAgIH1cbiAgICAgIGxldCB3b3JkRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIC8vSWYgdGhlIHJldHVybmVkIGRhdGEgaXMgYW4gb2JqZWN0LCBjb25maXJtIGl0IGlzICdubyBkZWZpbml0aW9uJyBzZXJ2ZXIgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5oYXNPd24od29yZERhdGEsIFwidGl0bGVcIikpIHtcbiAgICAgICAgICAvL05vIGRlZmluaXRpb25zIHdlcmUgZm91bmQgd2hlbiBkYXRhIGlzIGFuIG9iamVjdCB3aXRoIGEgdGl0bGUgcHJvcGVydHlcbiAgICAgICAgICAvL3dvcmREYXRhLnRpdGxlID09IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIlxuICAgICAgICAgIG5vRGVmaW5pdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGlmICh3b3JkRGF0YS50aXRsZSA9PSBcIk5vIERlZmluaXRpb25zIEZvdW5kXCIgJiYgd29yZGNhY2hlLmluQ2FjaGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy9UaGUgZGF0YSBzdHJlYW0gaGVyZSBpcyB3aXRob3V0IHdvcmQgZGF0YS4gVGhpcyBmdW5jdGlvbiBhd2FpdHMgdGhlIGFwaSBmZXRjaCdzIGRhdGFcbiAgICAgICAgICAgIC8vdG8gY29tcGxldGUgc3RvcmFnZS9wcm9taXNlIHJldHVybnMuIEl0IHdhaXRzIDUgc2Vjb25kcyBmb3IgdGhlIGJyb3dzZXIgdG8gY29tcGxldGUgaXRzIHN0b3JlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy90aGVuIHJlbW92ZXMgdGhlIHVud2FudGVkIGNhY2hlIHJlcXVlc3QuXG4gICAgICAgICAgICAvL1RPRE86QlVHUkVTRUFSQ0g9PkR1cmluZyB0aGUgNSB0aW1lb3V0LCBpZiB0aGUgcGFnZSByZWZyZXNoZXMgYSAnYmFkIHdvcmQnIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgLy9UaGlzICdiYWQgd29yZCcgY2FuIGJlIHJlbW92ZWQgYnkgZGVsZXRpbmcgYWxsIHByZXZpb3VzIHdvcmRzIHZpYSBVSSBhbmQgcmVmcmVzaGluZyB0aGUgcGFnZS4gVGhpcyB3aWxsXG4gICAgICAgICAgICAvLyBmaXJlIGdldExvY2FsU3RvcmFnZVdvcmRDYWNoZXMoKSB0byBjbGVhciBhbnkgbWlzbWF0Y2hlZCB3b3JkZGF0YTwtLT5jYWNoZWRyZXF1ZXN0cy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAvL0Z1bmN0aW9uIGF3YWl0aW5nIHJlcXVlc3QncyBDYWNoZSBTdG9yYWdlIGNhY2hpbmdcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlcXVlc3Rmcm9tQ2FjaGVTdG9yYWdlKHdvcmRGZXRjaC5nZXRHZXRVcmwoKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IHJlbW92ZSBmcm9tIENhY2hlIFN0b3JhZ2UuIE5hbWU6IFwiLCB3b3JkRmV0Y2guZ2V0R2V0VXJsKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBub0RlZmluaXRpb25zKSB7XG4gICAgICAgIC8vR29vZCBkYXRhLS0+IHJldHVybiBkYXRhIGZvciBtYXJrdXAgcmVuZGVyXG4gICAgICAgIC8vJ0JhZCBkYXRhJyBkdWUgdG8gXCJObyBkZWZpbml0aW9ucyBmb3VuZFwiLCBpbnZhbGlkIHdvcmQsIGJhZCBuZXR3b3JrIGNvbm5lY3Rpb25cbiAgICAgICAgaWYgKCFuYXZpZ2F0b3Iub25MaW5lKSB7XG4gICAgICAgICAgLy9PbmxpbmUsIHByb2JsZW0gd2l0aCBmZXRjaFxuICAgICAgICAgIC8vT2ZmbGluZSByZXF1ZXN0XG4gICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCArPSBcIiwgY2hlY2sgbmV0d29yayBjb25uZWN0aW9uLlwiO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9EZWZpbml0aW9ucykge1xuICAgICAgICAgIC8vU2VydmVyIHJldHVybmVkIG5vIGRlZmluaXRpb25zIGRhdGFcbiAgICAgICAgICBpZiAod29yZERhdGEudGl0bGUgPT0gXCJObyBEZWZpbml0aW9ucyBGb3VuZFwiKVxuICAgICAgICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLmlubmVyVGV4dCA9IFwiTm8gRGVmaW5pdGlvbnMgRm91bmRcIjtcbiAgICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkRGljdGlvbmFyeVRlcm10b0xvY2FsU3RvcmFnZSh3b3JkY2FjaGUpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBsZXQgd29yZERhdGEgPSB3b3JkRmV0Y2hSZXF1ZXN0KCk7XG4gICAgcmV0dXJuIHdvcmREYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2VyIGlucHV0IHZhbGlkYXRpb24gZnVuY3Rpb24gdGVzdHMgdGhlIGlucHV0IHN0cmluZyBhZ2FpbnN0IGEgdmFsaWQgUmVndWxhciBFeHByZXNzaW9uLlxuICAgKlxuICAgKiAgICBSZWdFeHAoXCJeW0EtWmEtel17MSw0NX0kXCIpXG4gICAqXG4gICAqIEBwYXJhbSBpbnR4dCAtIFN0cmluZyB2YWx1ZSByZWNlaXZlZCBmcm9tIHVzZXIgZmllbGQgaW5wdXQuXG4gICAqIEByZXR1cm5zIEFjY2VwdGFibGUgdXNlciBpbnB1dDogdHJ1ZSBvciBmYWxzZS5cbiAgICovXG4gIHByaXZhdGUgd29yZFZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBsZXR0ZXJzUkUgPSBuZXcgUmVnRXhwKFwiXltBLVphLXpdezEsNDV9JFwiKTtcbiAgICBpZiAobGV0dGVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3dvcmQgaXMgbm90IGFuIGFjY2VwdGFibGUgd29yZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIGNhbGxGZXRjaERpY3Rpb25hcnlUZXJtIGF3YWl0cyBhIHByb21pc2UsIGZldGNoaW5nIGEgZGljdGlvbmFyeSB0ZXJtLiBUaGUgZGF0YVxuICAgKiBpbmdyZXNzIGNhbGxzIG1hcmt1cCBjcmVhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB3b3JkIC0gVGhlIHdvcmQgdG8gYmUgZmV0Y2hlZC5cbiAgICogQHBhcmFtIHdvcmRVUkwgLSBBIFVSTCBjb21wb3NpbmcgdGhlIGZ1bGwgdXJsIG9mIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxsRmV0Y2hEaWN0aW9uYXJ5VGVybShzZWFyY2hFbGVtczogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzLCB3b3JkOiBzdHJpbmcsIHdvcmRVUkw6IFVSTCkge1xuICAgIC8vIFdoZW4gdGhlIHdvcmQgZGF0YSByZXNvbHZlcywgY2FsbCBtYXJrdXAgZnVuY3Rpb25zXG4gICAgbGV0IHdvcmREYXRhUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgcmVzb2x2ZShcbiAgICAgICAgdGhpcy5mZXRjaERpY3Rpb25hcnlUZXJtKFxuICAgICAgICAgIHdvcmQsXG4gICAgICAgICAgd29yZFVSTCxcbiAgICAgICAgICBzZWFyY2hFbGVtcyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIERpY3Rpb25hcnlTZWFyY2guQ2FjaGVTdG9yYWdlTmFtZW9mV29yZFJlcXVlc3RcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB3b3JkRGF0YVByb21pc2UudGhlbigoZGF0YTogb2JqZWN0KSA9PiB7XG4gICAgICB0aGlzLndvcmREYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKGRhdGEsIHNlYXJjaEVsZW1zKTtcbiAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCB8fCBPYmplY3QuaGFzT3duKGRhdGEsIFwidGl0bGVcIikpIHJldHVybjtcbiAgICAgIGNvbnNvbGUubG9nKGAlYzxSV0I+JWNSZXRyaWV2ZWQgd29yZDogJHt3b3JkfWAsIFwiY29sb3I6Z29sZDtmb250LXdlaWdodDpib2xkO1wiLCBcImNvbG9yOmdvbGQ7XCIpO1xuICAgICAgLy8gUmVtb3ZlIHVubmVlZGVkIGNsYXNzZXMgaWYgYXBwbGllZCBwcmV2aW91c2x5XG4gICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgIHNlYXJjaEVsZW1zLmVycm9yRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgc2VhcmNoRWxlbXMuZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogd29yZFNlYXJjaCgpIGJlZ2lucyBhIHdvcmQgc2VhcmNoIHJlcXVlc3QuIFRoZSB1c2VyIGlucHV0IGxpc3RlbmVyIGNob29zZXNcbiAgICogd2hldGhlciB0aGUgZmV0Y2ggaXMgY2FsbGVkIGZyb20gY2FjaGUgb3IgaXMgbmV3LlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoRWxlbXMgLSBXaWRnZXQgRWxlbWVudHMgLS0ga2V5IHdpZGdldCBmdW5jdGlvbiBlbGVtZW50cy5cbiAgICogQHBhcmFtIGlzRnJvbVByZXZpb3VzV29yZHMgLSBUcnVlIGlmIHRoZSB1c2VyIHJlcXVlc3RlZCBhIHNlYXJjaCBmcm9tIGEgcHJldmlvdXMgd29yZCwgdG8gY2FsbCBkYXRhIGZyb20gQnJvd3NlciBDYWNoZS5cbiAgICogQHBhcmFtIGNhY2hlZFdvcmQgLSBJZiB0aGUgdXNlciBjYWxsZWQgZm9yIGEgcHJldmlvdXMgd29yZCwgY2FjaGVkV29yZCBpcyB3aXRoaW4gdGhlIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHdvcmRTZWFyY2goXG4gICAgc2VhcmNoRWxlbXM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyxcbiAgICBpc0Zyb21QcmV2aW91c1dvcmRzOiBib29sZWFuLFxuICAgIGNhY2hlZFdvcmQ6IGxvY2Fsc3RvcmFnZXdvcmQgfCBudWxsXG4gICkge1xuICAgIGlmIChpc0Zyb21QcmV2aW91c1dvcmRzKSB7XG4gICAgICB0aGlzLmNhbGxGZXRjaERpY3Rpb25hcnlUZXJtKHNlYXJjaEVsZW1zLCBjYWNoZWRXb3JkLndvcmQsIGNhY2hlZFdvcmQud29yZFVSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRha2UgdXNlciBpbnB1dCBhbmQgZmlsdGVyIHRvIGFuIGFjY2VwdGVkIHN0cmluZ1xuICAgICAgbGV0IGFjY2VwdGVkSW5wdXRXb3JkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICB0aGlzLndvcmRWYWxpZGF0aW9uKHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUpXG4gICAgICAgID8gKGFjY2VwdGVkSW5wdXRXb3JkID0gdHJ1ZSlcbiAgICAgICAgOiAoYWNjZXB0ZWRJbnB1dFdvcmQgPSBmYWxzZSk7XG4gICAgICBpZiAoYWNjZXB0ZWRJbnB1dFdvcmQpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgVVJMIG9mIHRoZSBhY2NlcHRlZCB3b3JkIGZvciB1c2UgaW4gdGhlIGZldGNoIGNhbGxcbiAgICAgICAgdGhpcy53b3JkVVJMID0gbmV3IFVSTChzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLnZhbHVlLnRvU3RyaW5nKCksIERpY3Rpb25hcnlTZWFyY2gucmVxdWVzdFVybCk7XG4gICAgICAgIHRoaXMuY2FsbEZldGNoRGljdGlvbmFyeVRlcm0oc2VhcmNoRWxlbXMsIHNlYXJjaEVsZW1zLnNlYXJjaFdvcmQudmFsdWUsIHRoaXMud29yZFVSTCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5zZWFyY2hXb3JkLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLW5vdGZvdW5kXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0uY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgICAgICBzZWFyY2hFbGVtcy5lcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIkludmFsaWQgd29yZCFcIjtcbiAgICAgICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZC1ub3Rmb3VuZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbXMuc2VhcmNoV29yZC52YWx1ZSA9IFwiXCI7IC8vIHJlc2V0IGlucHV0IHN0cmluZ1xuICB9O1xuXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcbmltcG9ydCB7IGxvY2Fsc3RvcmFnZXdvcmQgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cywgRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzIH0gZnJvbSBcIi4vd2lkZ2V0TWFya3VwRWxlbWVudHNcIjtcblxuLyoqXG4gKiBBIERpY3Rpb25hcnlTZWFyY2hXaWRnZXQgaXMgbWFkZSB0byBjcmVhdGUgdGhlIG1hcmt1cCBuZWVkZWQgZm9yIHRoZVxuICogIERpY3Rpb25hcnkgU2VhcmNoLiBFbGVtZW50cyBhcmUgY3JlYXRlZCBhbmQgYXBwZW5kZWQgdG8gdGhlIHBhZ2UgdG8gdGhlIGNsYXNzXG4gKiAgJ2RpY3Rpb25hcnlXaWRnZXQnXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlTZWFyY2hNYXJrdXAge1xuICBwdWJsaWMgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50KSB7XG4gICAgLy9pbnNlcnQgdGhlIHdpZGdldCBhZnRlciB0aGUgcGFzc2VkIGluIFwiZWxlbVwiXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWNUaGVyZSBpcyBubyBcImRpY3Rpb25hcnlXaWRnZXRcIiBjbGFzcyBvbiB0aGlzIHBhZ2UuYCwgXCJjb2xvcjogb3JhbmdlO1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImRpY3Rpb25hcnlXaWRnZXRcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBBZGQgXCJkaWN0aW9uYXJ5V2lkZ2V0XCIgY2xhc3MgdG8gJHtlbGVtLm5vZGVOYW1lfSBub2RlLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZURpY3Rpb25hcnlXaWRnZXRNYXJrdXAoZWxlbSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByaW1hcnkgd2lkZ2V0IG1hcmt1cCBzdHJ1Y3R1cmluZyB0aGUgd2lkZ2V0IGVsZW1lbnRzIGFuZCBzZWFyY2ggaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IGJlZm9yZSB0aGUgd2lkZ2V0LlxuICAgKiBAcmV0dXJucyBzZWFyY2hFbGVtZW50czogRGljdGlvbmFyeVNlYXJjaEVsZW1lbnRzIC0tPiBpbnRlcmZhY2Ugb2ZcbiAgICogIGltcG9ydGFudCBIVE1MIGVsZW1lbnRzIHVzZWQgdGhyb3VnaCB3aWRnZXQgZnVuY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVdpZGdldE1hcmt1cChlbGVtOiBFbGVtZW50KSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIikpO1xuICAgIGlmIChkaWN0aW9uYXJ5ID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRldGVybWluZWQgZGljdGlvbmFyeSBlbGVtZW50IGlzIG51bGwuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgd2lkZ2V0IGVsZW1lbnRzXG4gICAgY29uc3QgYXJ0SCA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpKTtcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSk7XG4gICAgY29uc3QgcHJldmlvdXNXb3JkcyA9IGRpY3Rpb25hcnkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG5cbiAgICAvLyBSZXR1cm4gZWxlbWVudHMgdXNlZCBpbiBsYXRlciBmdW5jdGlvbnNcbiAgICBsZXQgc2VhcmNoRWxlbWVudHM6IERpY3Rpb25hcnlTZWFyY2hFbGVtZW50cyA9IHtcbiAgICAgIHNlYXJjaFdvcmQ6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKSxcbiAgICAgIHdvcmRTZWFyY2g6IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgICBkaWN0aW9uYXJ5RWxlbTogPEhUTUxFbGVtZW50PmRpY3Rpb25hcnksXG4gICAgICBlcnJvckVsZW06IHNlYXJjaEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpLFxuICAgICAgcHJldmlvdXNXb3JkQnRuOiBwcmV2aW91c1dvcmRzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIikpLFxuICAgICAgcHJldmlvdXNXb3Jkc0NvbnRhaW5lcjogZGljdGlvbmFyeS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSxcbiAgICAgIHJlZnJlc2hCdG46IHByZXZpb3VzV29yZHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSksXG4gICAgfTtcblxuICAgIC8vIEFkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjb25zdCBmb250QXdlc29tZVNlYXJjaEljb24gPSBzZWFyY2hFbGVtZW50cy53b3JkU2VhcmNoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpKTtcbiAgICBmb250QXdlc29tZVNlYXJjaEljb24uY2xhc3NMaXN0LmFkZChcImZhXCIpO1xuICAgIGZvbnRBd2Vzb21lU2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc2VhcmNoXCIpO1xuICAgIHByZXZpb3VzV29yZHMuY2xhc3NMaXN0LmFkZChcInByZXZpb3VzV29yZHNcIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5jbGFzc0xpc3QuYWRkKFwibW9ub3NwYWNlXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnByZXZpb3VzV29yZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMucmVmcmVzaEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic2VhcmNoXCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLnNlYXJjaFdvcmQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJTZWFyY2guLi5cIik7XG4gICAgc2VhcmNoRWxlbWVudHMuc2VhcmNoV29yZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiSW5wdXRcIik7XG4gICAgc2VhcmNoRWxlbWVudHMud29yZFNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlNlYXJjaFwiKTtcbiAgICBzZWFyY2hFbGVtZW50cy5zZWFyY2hXb3JkLmlkID0gXCJzZWFyY2gtd29yZFwiO1xuICAgIHNlYXJjaEVsZW1lbnRzLndvcmRTZWFyY2guaWQgPSBcIndvcmQtc2VhcmNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3JkQnRuLmlubmVyVGV4dCA9IFwiUHJldmlvdXMgV29yZCBTZWFyY2hlc1wiO1xuICAgIHNlYXJjaEVsZW1lbnRzLnJlZnJlc2hCdG4uaW5uZXJUZXh0ID0gXCJSZWZyZXNoXCI7XG4gICAgc2VhcmNoRWxlbWVudHMucHJldmlvdXNXb3Jkc0NvbnRhaW5lci5pZCA9IFwiZGljdGlvbmFyeS1idG5zXCI7XG4gICAgZGljdGlvbmFyeS5pZCA9IFwiZGljdGlvbmFyeVwiO1xuICAgIHNlYXJjaEZvcm0uaWQgPSBcImRpY3Rpb25hcnktc2VhcmNoXCI7XG4gICAgc2VhcmNoRm9ybS5hY3Rpb24gPSBcImluZGV4Lmh0bWxcIjtcbiAgICBhcnRILnRleHRDb250ZW50ID0gXCJEaWN0aW9uYXJ5IFRlcm06XCI7XG5cbiAgICB0aGlzLnNlYXJjaEVsZW1lbnRzID0gc2VhcmNoRWxlbWVudHM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1hcmt1cCB0byBob3VzZSByZXR1cm5lZCB3b3JkcyBmcm9tIERpY3Rpb25hcnlTZWFyY2guIFRoZSBtYXJrdXBcbiAgICogIGlzIGNyZWF0ZWQgYmFzZWQgb24gQVBJIGVncmVzcy4gV29yZHMgYW5kIHRoZWlyIGRlZmluaXRpb25zIHZhcnkuIFRoZSBtYXJrdXAgaXNcbiAgICogIGFkYXB0aXZlIHRvIHJldHVybmVkIHdvcmQgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgKlxuICAgKiBAcGFyYW0gd29yZERhdGEgLSBUaGlzIHBhcmFtZXRlciBpcyBhbiBvYmplY3Qgb2Ygd29yZCB0eXBlcywgZGVmaW5pdGlvbnMsIGFuZCBleGFtcGxlcy5cbiAgICogQHBhcmFtIHNlYXJjaEVsZW1zIC0gV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRGljdGlvbmFyeVRlcm1XaXRoTWFya3VwKHdvcmREYXRhOiBhbnksIHNlYXJjaEVsZW1zOiBEaWN0aW9uYXJ5U2VhcmNoRWxlbWVudHMpIHtcbiAgICBpZiAod29yZERhdGEgPT0gbnVsbCB8fCAhKHdvcmREYXRhIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBPYmplY3QuaGFzT3duKHdvcmREYXRhLCBcInRpdGxlXCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIiVjVGhlcmUgaXMgbm8gZGVmaW5pdGlvbiBmb3IgdGhpcyB3b3JkLlwiLCBcImNvbG9yOmRhcmtncmVlbjtcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWRkIHdvcmQgZGVmaW5pdGlvbiB0byB0aGUgZGljdGlvbmFyeSB3aWRnZXRcbiAgICBjb25zdCBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIgPSBzZWFyY2hFbGVtcy5kaWN0aW9uYXJ5RWxlbS5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICApO1xuICAgIGNvbnN0IGRlZmluaXRpb25EZXNjcmlwdGlvbiA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTsgLy8gd29yZCBkZWZpbml0aW9uIHNlcGFyYXRvclxuICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbkRlc2NyaXB0aW9uXCIpO1xuXG4gICAgLy8gVGhlIHdvcmQgZGF0YSByZXByZXNlbnRzIGNvbXBsZXggSlNPTiBvYmplY3RcbiAgICAvLyBSZWN1cnNlIHRoZSB3b3JkIGRhdGEgb2JqZWN0LCBhZGRpbmcgZWxlbWVudHMgZnJvbSB0aGUgdmFyaW91cyBsZXZlbHNcbiAgICB3b3JkRGF0YS5tYXAoKHdvcmQ6IGFueSkgPT4ge1xuICAgICAgZGVmaW5pdGlvbkRlc2NyaXB0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIndvcmRcIiwgd29yZC53b3JkKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgd29yZCBpczogXCIsd29yZClcbiAgICAgIGNvbnN0IHdvcmRUaXRsZSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIikpO1xuICAgICAgd29yZFRpdGxlLnRleHRDb250ZW50ID0gd29yZC53b3JkO1xuICAgICAgLy9BZGQgdGhlIHdvcmQgYW5kIGV4YW1wbGVzIHRvIHBhZ2VcbiAgICAgIHdvcmQubWVhbmluZ3MubWFwKCh3b3JkVHlwZTogYW55KSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJXb3JkVHlwZSBhcmU6IFwiLCB3b3JkVHlwZSlcbiAgICAgICAgY29uc3Qgd29yZFR5cGVIID0gZGVmaW5pdGlvbkRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKSk7XG4gICAgICAgIGNvbnN0IHdvcmRUeXBlTGlzdCA9IGRlZmluaXRpb25EZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikpO1xuICAgICAgICB3b3JkVHlwZUgudGV4dENvbnRlbnQgPSB3b3JkVHlwZS5wYXJ0T2ZTcGVlY2g7XG4gICAgICAgIHdvcmRUeXBlLmRlZmluaXRpb25zLm1hcCgoZGVmOiBhbnkpID0+IHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbiBpczogXCIsIGRlZik7XG4gICAgICAgICAgbGV0IHdvcmRUeXBlRGVmSXRlbSA9IHdvcmRUeXBlTGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgICAgIGxldCBkZWZpbml0aW9uUCA9IHdvcmRUeXBlRGVmSXRlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgZGVmaW5pdGlvblAudGV4dENvbnRlbnQgPSBkZWYuZGVmaW5pdGlvbjtcbiAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwid29yZERlZmluaXRpb25cIik7XG5cbiAgICAgICAgICBjb25zdCBhZGRBZGphY2VudEVsZW0gPSAoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRGVmaW5pdGlvbnMgaXM6IFwiLCBkZWYpO1xuICAgICAgICAgICAgY29uc3QgbmV3UCA9IGRlZmluaXRpb25QLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSk7XG4gICAgICAgICAgICBpZiAobmV3UCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1BpID0gbmV3UC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSk7XG4gICAgICAgICAgICAgIG5ld1BpLnRleHRDb250ZW50ID0gZGVmLmV4YW1wbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbml0aW9uUC5jbGFzc0xpc3QuYWRkKFwiZXhhbXBsZVwiKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2hlY2sgaWYga2V5IFwiZXhhbXBsZVwiIGlzIGluIGRlZmluaXRpb24uIElmIGl0IGlzLCBhZGQgdGhlIGV4YW1wbGUgdG8gbGlzdFxuICAgICAgICAgIFwiZXhhbXBsZVwiIGluIGRlZiA/IGFkZEFkamFjZW50RWxlbSgpIDogdHJ1ZSA9PSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy9jcmVhdGUgY2xlYXIgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbSA9IGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgICApO1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIndvcmQtY2xlYXJcIik7XG4gICAgZGVsZXRlV29yZFRlcm1IZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcbiAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGhvdmVyZWQsIGRpc3BsYXkgaXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBldmVudCA9PiB7XG4gICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjEwMCVcIjtcbiAgICAgIC8vd2hlbiBjbGVhciBidXR0b24gaXMgbm90IGhvdmVyZWQsIGhpZGUgaXRcbiAgICAgIGRlZmluaXRpb25EZXNjcmlwdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBkZWxldGVXb3JkVGVybUhlYWRpbmdFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjUwJVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL3doZW4gY2xlYXIgYnV0dG9uIGlzIGNsaWNrZWQsIGNsZWFyIHRoZSBlbGVtZW50c1xuICAgIGRlbGV0ZVdvcmRUZXJtSGVhZGluZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY1JlbW92ZWQgd29yZDogJHtkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuZ2V0QXR0cmlidXRlKFwid29yZFwiKX1gLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmdvbGRlbnJvZDtcIlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGNsZWFyIGJ1dHRvbiB0byB3aWRnZXRcbiAgICBkZWZpbml0aW9uRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICBwdWJsaWMgY3JlYXRlUHJldmlvdXNXb3JkU2VhcmNoZXNFbGVtZW50cyhcbiAgICB3b3Jkc3RvcmFnZTogbG9jYWxzdG9yYWdld29yZFtdLFxuICAgIGJ1dHRvbkNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnRcbiAgKSB7XG4gICAgbGV0IGJ1dHRvbnNhcnI6IERpY3Rpb25hcnlTZWFyY2hQcmV2aW91c1dvcmRLZXlFbGVtZW50c1tdID0gW107XG5cbiAgICAvL0JlY2F1c2UgdGhlIGxvY2F0b3IgYW5kIHRoZSBMb2NhbCBTdG9yYWdlIHZhbHVlcyBhcmUgdmlhYmxlLCBjcmVhdGUgdGhlIG1hcmt1cFxuICAgIC8vbmVlZGVkIHRvIGRpc3BsYXkgdGhvc2Ugd29yZHMuIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpZGdldCBmdW5jdGlvbmFsaXR5LlxuICAgIGZvciAobGV0IHdvcmRDYWNoZSBvZiB3b3Jkc3RvcmFnZSkge1xuICAgICAgY29uc3Qgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyID0gYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgICAgY29uc3QgY2FjaGVXb3JkSGVhZGluZ0VsZW0gPSB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSk7XG4gICAgICBjb25zdCBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSA9IHdvcmRIZWFkaW5nRWxlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgKTtcbiAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b24tY2xlYXJcIik7XG4gICAgICBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS13b3JkLWJ0bi1jbGVhclwiKTtcbiAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICBjYWNoZVdvcmRIZWFkaW5nRWxlbS5jbGFzc0xpc3QuYWRkKFwiZGljdGlvbmFyeS1idG5cIiwgXCJkaWN0aW9uYXJ5LXdvcmQtYnRuXCIpO1xuICAgICAgY2FjaGVXb3JkSGVhZGluZ0VsZW0udGV4dENvbnRlbnQgPSB3b3JkQ2FjaGUud29yZDtcblxuICAgICAgbGV0IHByZXZpb3Vzd29yZGJ0bjogRGljdGlvbmFyeVNlYXJjaFByZXZpb3VzV29yZEtleUVsZW1lbnRzID0ge1xuICAgICAgICB3b3JkOiB3b3JkQ2FjaGUsXG4gICAgICAgIGNhY2hlV29yZEhlYWRpbmdFbGVtOiBjYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgICAgd29yZEhlYWRpbmdFbGVtQ29udGFpbmVyOiB3b3JkSGVhZGluZ0VsZW1Db250YWluZXIsXG4gICAgICAgIGRlbGV0ZUNhY2hlV29yZEhlYWRpbmdFbGVtOiBkZWxldGVDYWNoZVdvcmRIZWFkaW5nRWxlbSxcbiAgICAgIH07XG4gICAgICBidXR0b25zYXJyLnB1c2gocHJldmlvdXN3b3JkYnRuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbnNhcnI7XG4gIH07XG4gIFxufVxuIiwiLy9BdXRob3I6IFJvYmVydCBBIEhvd2VsbCwgQXByaWwgMjAyM1xuLy9PcmlnaW5hbCBBdXRob3Iocyk6IE1vemlsbGEgQ29udHJpYnV0b3JzLCBNRE5cbi8vTGljZW5zZTogaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvYWJvdXQvZ292ZXJuYW5jZS9wb2xpY2llcy9wYXJ0aWNpcGF0aW9uL1xuLy9NRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jcmVhdGVFbGVtZW50XG4vL1NvdXJjZSBkaXN0cmlidXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9tZG4vd2ViLWNvbXBvbmVudHMtZXhhbXBsZXMvdHJlZS9tYWluL2V4cGFuZGluZy1saXN0LXdlYi1jb21wb25lbnRcblxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ0xpc3RFbGVtZW50IGV4dGVuZHMgSFRNTFVMaXN0RWxlbWVudCB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gQWx3YXlzIGNhbGwgc3VwZXIgZmlyc3QgaW4gY29uc3RydWN0b3JcbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBzdXBlcigpIGlzIGEgcmVmZXJlbmNlIHRvIHRoaXMgZWxlbWVudFxuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBHZXQgdWwgYW5kIGxpIGVsZW1lbnRzIHRoYXQgYXJlIGEgY2hpbGQgb2YgdGhpcyBjdXN0b20gdWwgZWxlbWVudFxuICAgIC8vIGxpIGVsZW1lbnRzIGNhbiBiZSBjb250YWluZXJzIGlmIHRoZXkgaGF2ZSB1bHMgd2l0aGluIHRoZW1cbiAgICBjb25zdCB1bHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bFwiKTtcbiAgICBjb25zdCBsaXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcblxuICAgIC8vIEhpZGUgYWxsIGNoaWxkIHVsc1xuICAgIC8vIFRoZXNlIGxpc3RzIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgdXNlciBjbGlja3MgYSBoaWdoZXIgbGV2ZWwgY29udGFpbmVyXG4gICAgdWxzLmZvckVhY2godWwgPT4ge1xuICAgICAgdWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuXG4gICAgLy8gTG9vayB0aHJvdWdoIGVhY2ggbGkgZWxlbWVudCBpbiB0aGUgdWxcbiAgICBsaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICAvLyBJZiB0aGlzIGxpIGhhcyBhIHVsIGFzIGEgY2hpbGQsIGRlY29yYXRlIGl0IGFuZCBhZGQgYSBjbGljayBoYW5kbGVyXG4gICAgICBpZiAobGkucXVlcnlTZWxlY3RvckFsbChcInVsXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gQWRkIGFuIGF0dHJpYnV0ZSB3aGljaCBjYW4gYmUgdXNlZCAgYnkgdGhlIHN0eWxlXG4gICAgICAgIC8vIHRvIHNob3cgYW4gb3BlbiBvciBjbG9zZWQgaWNvblxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImNsb3NlZFwiKTtcblxuICAgICAgICAvLyBXcmFwIHRoZSBsaSBlbGVtZW50J3MgdGV4dCBpbiBhIG5ldyBzcGFuIGVsZW1lbnRcbiAgICAgICAgLy8gc28gd2UgY2FuIGFzc2lnbiBzdHlsZSBhbmQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIHNwYW5cbiAgICAgICAgY29uc3QgY2hpbGRUZXh0ID0gbGkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgY29uc3QgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICAgIC8vIENvcHkgdGV4dCBmcm9tIGxpIHRvIHNwYW4sIHNldCBjdXJzb3Igc3R5bGVcbiAgICAgICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IGNoaWxkVGV4dC50ZXh0Q29udGVudDtcbiAgICAgICAgbmV3U3Bhbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcblxuICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlciB0byB0aGlzIHNwYW5cbiAgICAgICAgbmV3U3Bhbi5vbmNsaWNrID0gdGhpcy5zaG93dWw7XG4gICAgICAgIG5ld1NwYW4uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5jb2RlID09IFwiTnVtcGFkRW50ZXJcIiB8fCBldmVudC5jb2RlID09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICAgICAgICAgIGxldCBuZXh0dWwgPSBuZXdTcGFuLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgICAgICAgICAgaWYgKG5leHR1bC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICBsZXQgc3BhblBhcmVudCA9IG5leHR1bC5wYXJlbnROb2RlIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgc3BhblBhcmVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInVsaXN0ZWxlbS1jbG9zZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0dWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgbGV0IHNwYW5QYXJlbnQgPSBuZXh0dWwucGFyZW50Tm9kZSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgIHNwYW5QYXJlbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ1bGlzdGVsZW0tb3BlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgc3BhbiBhbmQgcmVtb3ZlIHRoZSBiYXJlIHRleHQgbm9kZSBmcm9tIHRoZSBsaVxuICAgICAgICBjaGlsZFRleHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3BhbiwgY2hpbGRUZXh0KTtcbiAgICAgICAgY2hpbGRUZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRUZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBFeHBhbmRpbmdMaXN0RWxlbWVudC5jb3VudCsrO1xuICB9O1xuXG4gIC8vIGxpIGNsaWNrIGhhbmRsZXJcbiAgcHJpdmF0ZSBzaG93dWwgPSBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgLy8gbmV4dCBzaWJsaW5nIHRvIHRoZSBzcGFuIHNob3VsZCBiZSB0aGUgdWxcbiAgICBjb25zdCBuZXh0dWwgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAvLyBUb2dnbGUgdmlzaWJsZSBzdGF0ZSBhbmQgdXBkYXRlIGNsYXNzIGF0dHJpYnV0ZSBvbiB1bFxuICAgIGlmIChuZXh0dWwuc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCIpIHtcbiAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBuZXh0dWwucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInVsaXN0ZWxlbS1jbG9zZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHR1bC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgbmV4dHVsLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ1bGlzdGVsZW0tb3BlblwiKTtcbiAgICB9XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBHcm93aW5nQ2FyZEVsZW1lbnQgZXh0ZW5kcyBIVE1MTElFbGVtZW50IHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBpc0dyb3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdyb3dDYXJkKTtcbiAgICBHcm93aW5nQ2FyZEVsZW1lbnQuY291bnQrKztcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHNocmlua0NhcmQgPSAobGk6IEdyb3dpbmdDYXJkRWxlbWVudCkgPT4ge1xuICAgIC8vVE9ETzogY2hlY2sgY2xhc3MgcHJvcGVydHlcbiAgICBpZiAobGkuc3R5bGUuc2NhbGUpIHtcbiAgICAgIGxpLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICBsaS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgIGxpLnNldElzR3Jvd24oZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHNoYWRlSW5hY3RpdmVDYXJkID0gKGxpOiBHcm93aW5nQ2FyZEVsZW1lbnQpID0+IHtcbiAgICBpZiAoR3Jvd2luZ0NhcmRFbGVtZW50LmdldElzQXRMZWFzdE9uZUJpZygpKSB7XG4gICAgICBpZiAoIWxpLmdldElzR3Jvd24oKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpXCIpLm1hdGNoZXNcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiLjVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaS5zdHlsZS5vcGFjaXR5ID0gXCIuM1wiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpXCIpLm1hdGNoZXNcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGkuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodClcIikubWF0Y2hlc1xuICAgICAgKSB7XG4gICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJc0F0TGVhc3RPbmVCaWcgPSAoKSA9PiB7XG4gICAgbGV0IGxpc3RMSXM6IEdyb3dpbmdDYXJkRWxlbWVudFtdID0gQXJyYXkuZnJvbShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCN3ZWJJREVDYXJkcyBsaWApXG4gICAgKTtcbiAgICBsZXQgYXRMZWFzdE9uZUlzQmlnID0gbGlzdExJcy5zb21lKGxpID0+IGxpLmdldElzR3Jvd24oKSA9PSB0cnVlKTtcbiAgICByZXR1cm4gYXRMZWFzdE9uZUlzQmlnO1xuICB9O1xuXG4gIHB1YmxpYyBnZXRJc0dyb3duID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLmlzR3Jvd247XG4gIH07XG5cbiAgcHJpdmF0ZSBzZXRJc0dyb3duID0gKHRydWVmYWxzZTogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiAodGhpcy5pc0dyb3duID0gdHJ1ZWZhbHNlKTtcbiAgfTtcblxuICBwcml2YXRlIGdyb3dDYXJkID0gKCkgPT4ge1xuICAgIHRoaXMuc3R5bGUuc2NhbGUgPSBcIjEuMlwiO1xuICAgIHRoaXMuc3R5bGUuekluZGV4ID0gXCIyXCI7XG4gICAgdGhpcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgdGhpcy5zZXRJc0dyb3duKHRydWUpO1xuXG4gICAgLy8gR2V0IGFsbCB0aGUgbGlzdCBlbGVtZW50cyB0byByZWZlcmVuY2Ugd2hpY2ggb25lIHRvIGdyb3dcbiAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY2xpY2tlZCBlbGVtZW50LCBzaHJpbmsgaXQuXG4gICAgbGV0IGxpc3RMSXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCIjd2ViSURFQ2FyZHMgbGlcIlxuICAgICkgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0TElzKSB7XG4gICAgICBpZiAoaXRlbSAhPT0gdGhpcykge1xuICAgICAgICBHcm93aW5nQ2FyZEVsZW1lbnQuc2hyaW5rQ2FyZChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCk7XG4gICAgICAgIEdyb3dpbmdDYXJkRWxlbWVudC5zaGFkZUluYWN0aXZlQ2FyZChpdGVtIGFzIEdyb3dpbmdDYXJkRWxlbWVudCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBzY2FsZSBwcm9wZXJ0eSBmb3IgZWFjaCBjYXJkXG4gICAgICAgIGlmIChpdGVtLnN0eWxlLnNjYWxlID09IFwiXCIpIHtcbiAgICAgICAgICBpdGVtLnN0eWxlLnNjYWxlID0gXCIxXCI7XG4gICAgICAgICAgaXRlbS5zdHlsZS56SW5kZXggPSBcIjFcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmV4cG9ydCBjbGFzcyBQcm9wYWdhdGlvbkxhdGVuY3lDYWxjdWxhdGlvbiB7XG4gIHByaXZhdGUgZGlzdGFuY2U6IG51bWJlcjtcbiAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xuICBwcml2YXRlIHBhY2tldFNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB0cmFuc21pc3Npb25SYXRlOiBudW1iZXI7XG4gIHByaXZhdGUgcHJvcGFnYXRpb25EZWxheTogbnVtYmVyO1xuICBwcml2YXRlIHNlcmlhbGl6YXRpb25EZWxheTogbnVtYmVyO1xuICBwcml2YXRlIG5ldHdvcmtMYXRlbmN5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZGlzdGFuY2U6IG51bWJlciwgc3BlZWQ6IG51bWJlciwgcGFja2V0U2l6ZTogbnVtYmVyLCB0cmFuc21pc3Npb25SYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMucGFja2V0U2l6ZSA9IHBhY2tldFNpemU7XG4gICAgdGhpcy50cmFuc21pc3Npb25SYXRlID0gdHJhbnNtaXNzaW9uUmF0ZTtcbiAgICB0aGlzLnByb3BhZ2F0aW9uRGVsYXkgPSB0aGlzLmNhbGN1bGF0ZVByb3BhZ2F0aW9uRGVsYXkoKTtcbiAgICB0aGlzLnNlcmlhbGl6YXRpb25EZWxheSA9IHRoaXMuY2FsY3VsYXRlU2VyaWFsaXphdGlvbkRlbGF5KCk7XG4gICAgdGhpcy5uZXR3b3JrTGF0ZW5jeSA9IHRoaXMuY2FsY3VsYXRlTmV0d29ya0xhdGVuY3koKTtcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIG51bWJlclZhbGlkYXRpb24oaW50eHQ6IHN0cmluZykge1xuICAgIGxldCB0cmltbWVkID0gaW50eHQudHJpbSgpO1xuICAgIGxldCBudW1iZXJzUkUgPSBuZXcgUmVnRXhwKFwiXlswLTldezEsMzB9JFwiKTtcbiAgICBpZiAobnVtYmVyc1JFLnRlc3QodHJpbW1lZCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2lucHV0IGlzIG5vdCBhbiBhY2NlcHRhYmxlIG51bWJlciBzdHJpbmcuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBnZXREaXN0YW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0U3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BlZWQ7XG4gIH07XG5cbiAgcHVibGljIGdldFByb3BhZ2F0aW9uRGVsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGFnYXRpb25EZWxheTtcbiAgfTtcblxuICBwdWJsaWMgZ2V0UGFja2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWNrZXRTaXplO1xuICB9O1xuXG4gIHB1YmxpYyBnZXRUcmFuc21pc3Npb25SYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbWlzc2lvblJhdGU7XG4gIH07XG5cbiAgcHVibGljIGdldFNlcmlhbGl6YXRpb25EZWxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJpYWxpemF0aW9uRGVsYXk7XG4gIH07XG5cbiAgcHVibGljIGdldE5ldHdvcmtMYXRlbmN5KCkge1xuICAgIHJldHVybiB0aGlzLm5ldHdvcmtMYXRlbmN5O1xuICB9O1xuXG4gIHByaXZhdGUgY2FsY3VsYXRlUHJvcGFnYXRpb25EZWxheSgpIHtcbiAgICBsZXQgcHJvcGRlbGF5ID0gdGhpcy5kaXN0YW5jZSAvIHRoaXMuc3BlZWQ7XG4gICAgcmV0dXJuIHByb3BkZWxheTtcbiAgfTtcblxuICBwcml2YXRlIGNhbGN1bGF0ZVNlcmlhbGl6YXRpb25EZWxheSgpIHtcbiAgICBsZXQgc2VyaWFsZGVsYXkgPSB0aGlzLnBhY2tldFNpemUgLyB0aGlzLnRyYW5zbWlzc2lvblJhdGU7XG4gICAgcmV0dXJuIHNlcmlhbGRlbGF5O1xuICB9O1xuXG4gIHByaXZhdGUgY2FsY3VsYXRlTmV0d29ya0xhdGVuY3koKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGFnYXRpb25EZWxheSArIHRoaXMuc2VyaWFsaXphdGlvbkRlbGF5O1xuICB9O1xuXG59XG4iLCIvLy0tQ29weXJpZ2h0IChjKSAyMDIzIFJvYmVydCBBLiBIb3dlbGxcblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byByZWNvcmQgcmVmZXJlbmNlIGVycm9ycy4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ3YkVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBSd2JFcnJvci5jb3VudCsrO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tFbGVtZW50Zm9yTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAgY3NzUXVlcnk6IHN0cmluZyxcbiAgICBsb2dNZXNzYWdlPzogYm9vbGVhbixcbiAgICBzdXByZXNzRXhjZXB0aW9uPzogYm9vbGVhblxuICApIHtcbiAgICBsZXQgZWxlbTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTsgLy9Mb2cgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgbGV0IHN1cHJlc3NleGNwdDogYm9vbGVhbiA9IGZhbHNlOyAvL1N1cHJlc3MgbWVzc2FnZSBvcHRpb24gZGVmYXVsdFxuICAgIGlmIChzdXByZXNzRXhjZXB0aW9uKSBzdXByZXNzZXhjcHQgPSB0cnVlO1xuICAgIGxldCBxdWVyeTogc3RyaW5nID0gYCR7Y3NzUXVlcnl9YDtcblxuICAgIC8vIEFkZCBkaWN0aW9uYXJ5IHdpZGdldCBpZiBhbiBlbGVtZW50IHdpdGggdGhhdCBjbGFzcyBpcyBvbiBhIHBhZ2VcbiAgICB0cnkge1xuICAgICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoXCJHZXRFbGVtZW50XCIsIGBDb3VsZCBub3QgZ2V0IGVsZW1lbnQ6ICcke3F1ZXJ5fSdgKSk7XG4gICAgfVxuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLmluZm8oYCVjTm8gZWxlbWVudCBmb3VuZCB3aXRoIHF1ZXJ5OiAke3F1ZXJ5fS5gLCBcImNvbG9yOiBvcmFuZ2U7XCIpO1xuICAgICAgaWYgKCFzdXByZXNzZXhjcHQpXG4gICAgICAgIE9iamVjdC5jcmVhdGUobmV3IFJ3YlJlZmVyZW5jZUVycm9yKGAke2NvbXBvbmVudE5hbWV9TnVsbFJlZmVyZW5jZWAsIGBFbGVtZW50IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBjaGVja0xvY2FsU3RvcmFnZUVxdWFsTnVsbChcbiAgICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgY2hlY2tFbXB0eVN0cmluZz86IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZT86IGJvb2xlYW5cbiAgKSB7XG4gICAgbGV0IGxvZ21zc2c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlmICghbG9nTWVzc2FnZSkgbG9nbXNzZyA9IGxvZ01lc3NhZ2U7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2tleX1gKSA9PSBudWxsKSB7XG4gICAgICBpZiAobG9nbXNzZykgY29uc29sZS5pbmZvKGAlY05vIGxvY2FsIHN0b3JhZ2UgZm9yICR7Y29tcG9uZW50TmFtZX0uYCwgXCJjb2xvcjpwdXJwbGU7XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjaGVja0VtcHR5U3RyaW5nKSByZXR1cm4gUndiRXJyb3IuY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lLCBrZXksIGxvZ21zc2cpO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tMb2NhbFN0b3JhZ2VOdWxsb3JFbXB0eShjb21wb25lbnROYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCBsb2dNZXNzYWdlPzogYm9vbGVhbikge1xuICAgIGxldCBsb2dtc3NnOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoIWxvZ01lc3NhZ2UpIGxvZ21zc2cgPSBsb2dNZXNzYWdlO1xuICAgIGxldCB0ZXN0OiBzdHJpbmcgfCBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRlc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtrZXl9YCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIGdldCBsb2NhbCBzdG9yYWdlIGtleTogJHtrZXl9YCk7XG4gICAgfVxuICAgIGlmICh0ZXN0ID09IG51bGwpIHtcbiAgICAgIGlmIChsb2dtc3NnKSBjb25zb2xlLndhcm4oYCVjTG9jYWwgc3RvcmFnZSBrZXkgbm90IGZvdW5kOiAke2tleX0uYCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgS2V5IG5vdCBmb3VuZGApKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGVzdCA9PSBcIlwiIHx8IHRlc3QgPT0gXCJbXVwiKSB7XG4gICAgICBpZiAobG9nbXNzZylcbiAgICAgICAgY29uc29sZS53YXJuKGAlY0xvY2FsIHN0b3JhZ2UgdmFsdWUgaXMgZW1wdHkgZm9yIGtleTogJHtrZXl9YCwgXCJjb2xvcjogeWVsbG93O2ZvbnQtd2VpZ2h0OmJvbGQ7XCIpO1xuICAgICAgT2JqZWN0LmNyZWF0ZShuZXcgUndiUmVmZXJlbmNlRXJyb3IoYCR7Y29tcG9uZW50TmFtZX1SZWZlcmVuY2VFeGNlcHRpb25gLCBgVmFsdWUgaXMgZW1wdHlgKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG59XG5cbi8qKiBDcmVhdGUgdGhpcyBvYmplY3QgdG8gc3RvcmUgcmVmZXJlbmNlIGVycm9yIGRhdGEuICovXG5leHBvcnQgY2xhc3MgUndiUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBSZWZlcmVuY2VFcnJvciB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVmRXJyb3I6IFJlZmVyZW5jZUVycm9yO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGxldCBlcnIgPSBuZXcgUmVmZXJlbmNlRXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLnJlZkVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgcmVmZXJlbmNlIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5yZWZFcnJvcixcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YlJlZmVyZW5jZUVycm9yLmNvdW50Kys7XG4gIH07XG5cbn1cblxuLyoqIENyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBzeW50YXggZXJyb3IgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBSd2JTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHBhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBzeW50YXhFcnJvcjogU3ludGF4RXJyb3I7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBTeW50YXhFcnJvcih0aGlzLm1lc3NhZ2UpO1xuICAgIHRoaXMuc3ludGF4RXJyb3IgPSBlcnI7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGAlYzxSV0I+JWNFeGVjdXRpb24gZXhwZXJpZW5jZWQgYSBzeW50YXggZXJyb3I6XFxuJW9cXG4lYzwvUldCPmAsXG4gICAgICBcImNvbG9yOnJlZDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgXCJjb2xvcjpyZWQ7XCIsXG4gICAgICB0aGlzLnN5bnRheEVycm9yLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIlxuICAgICk7XG4gICAgUndiU3ludGF4RXJyb3IuY291bnQrKztcbiAgfTtcblxufVxuXG5leHBvcnQgY2xhc3MgUndiRG9tRXhjZXB0aW9uIGV4dGVuZHMgRE9NRXhjZXB0aW9uIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHN0YWNrOiBhbnk7XG4gIHB1YmxpYyBwYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgZG9tRXJyb3I6IERPTUV4Y2VwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgZXJyb3I6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSBlcnJvcjtcbiAgICB0aGlzLnBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgbGV0IGVyciA9IG5ldyBET01FeGNlcHRpb24odGhpcy5tZXNzYWdlKTtcbiAgICB0aGlzLmRvbUVycm9yID0gZXJyO1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgJWM8UldCPiVjRXhlY3V0aW9uIGV4cGVyaWVuY2VkIGEgRE9NIGVycm9yOlxcbiVvXFxuJWM8L1JXQj5gLFxuICAgICAgXCJjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6cmVkO1wiLFxuICAgICAgdGhpcy5zdGFjayxcbiAgICAgIFwiY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7XCJcbiAgICApO1xuICAgIFJ3YkRvbUV4Y2VwdGlvbi5jb3VudCsrO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgUndiU3ludGF4RXJyb3IgfSBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKiogQW4gUldCUGFyc2VKU09OIHBhcnNlcyBqc29uIGFuZCBzdG9yZXMgdGhlIHBhcnNlZCBzdHJpbmcgd2l0aCB0aGUgcmVzdWx0LiAqL1xuZXhwb3J0IGNsYXNzIFJXQlBhcnNlSlNPTiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyByZXR1cm5vYmo6IG9iamVjdDtcbiAgcHVibGljIHBhc3NlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwYXJzZXN0cjogc3RyaW5nO1xuXG4gIC8qKkNyZWF0ZSB0aGlzIG9iamVjdCB0byBzdG9yZSBwYXJzZSByZXN1bHRzIGFuZCBwYXJzZWRcbiAgICogSlNPTiBvYmplY3QuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJzZXN0cjogc3RyaW5nKSB7XG4gICAgUldCUGFyc2VKU09OLmNvdW50Kys7XG4gICAgdGhpcy5wYXJzZXN0ciA9IHBhcnNlc3RyO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5SV0JwYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIFJXQnBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5vYmogPSBKU09OLnBhcnNlKHRoaXMucGFyc2VzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJub2JqID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbn1cblxuLyoqIEFuIFJXQlBhcnNlSlNPTiB0ZXN0cyB3aGV0aGVyIGFuIG9iamVjdCBjYW4gYmUgc3RyaW5naWZpZWQgaW50byBhIHZhbGlkXG4gKiBqc29uIHN0cmluZy4gKi9cbmV4cG9ydCBjbGFzcyBSV0JTdHJpbmdpZnlKU09OIHtcbiAgLyoqQ291bnRzIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBpbnN0YW50aWF0ZWQgKi9cbiAgcHVibGljIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIHJldHVybnN0cjogc3RyaW5nO1xuICBwdWJsaWMgcGFzc2VkOiBib29sZWFuO1xuICBwcml2YXRlIGpzb246IGFueTtcbiAgLyoqQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHN0b3JlIHBhcnNlIHJlc3VsdHMgYW5kIHBhcnNlZFxuICAgKiBKU09OIG9iamVjdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGpzb246IGFueSkge1xuICAgIFJXQlN0cmluZ2lmeUpTT04uY291bnQrKztcbiAgICB0aGlzLmpzb24gPSBqc29uO1xuICAgIHRoaXMucGFzc2VkID0gdGhpcy5wYXJzZUpTT04oKTtcbiAgfTtcblxuICBwcml2YXRlIHBhcnNlSlNPTigpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXR1cm5zdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmpzb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMucmV0dXJuc3RyID0gbnVsbDtcbiAgICAgIG5ldyBSd2JTeW50YXhFcnJvcihcIlBhcnNlRXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5cbmludGVyZmFjZSBTY3JpcHRSdW50aW1lIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzdGFydE1hcms6IFBlcmZvcm1hbmNlTWFyaztcbiAgZW5kTWFyazogUGVyZm9ybWFuY2VNYXJrO1xufVxuXG4vKiogQ3JlYXRlIHRoaXMgb2JqZWN0IHRvIHJlY29yZCBwZXJmb3JtYW5jZSBzdGFydCBhbmQgZW5kIG1hcmtzLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUndiUGVyZiB7XG4gIC8qKkNvdW50cyB0aGUgbnVtYmVyIG9mIG9iamVjdHMgaW5zdGFudGlhdGVkICovXG4gIHB1YmxpYyBzdGF0aWMgY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc2NyaXB0UnVudGltZU1hcmtzOiBTY3JpcHRSdW50aW1lID0ge1xuICAgIG5hbWU6IG51bGwsXG4gICAgc3RhcnRNYXJrOiBudWxsLFxuICAgIGVuZE1hcms6IG51bGwsXG4gIH07XG5cbiAgLyoqIEluc3RhbnRpYXRpbmcgYSBTY3JpcHRQZXJmIHJlY29yZHMgdGhlIHBlcmZvcm1hbmNlIHN0YXJ0IG1hcmsuICovXG4gIGNvbnN0cnVjdG9yKHNjcmlwdE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLm5hbWUgPSBzY3JpcHROYW1lO1xuICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyayA9IHBlcmZvcm1hbmNlLm1hcmsoYCR7dGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZX0tc3RhcnRgKTtcbiAgICBSd2JQZXJmLmNvdW50Kys7XG4gIH07XG5cbiAgLyoqIENhbGwgZW5kKCkgdG8gc2V0IHRoZSBlbmQgdGltZSBzdGFtcC4gKi9cbiAgcHVibGljIGVuZCgpIHtcbiAgICB0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5lbmRNYXJrID0gcGVyZm9ybWFuY2UubWFyayhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfS1lbmRgKTtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgfTtcblxuICAvKiogQSBjb25zb2xlIG91dHB1dCBvZiB0aGlzIG9iamVjdCdzIHBlcmZvcm1hbmNlIG1lYXN1cmVtZW50LiAqL1xuICBwcml2YXRlIG1lYXN1cmUoKSB7XG4gICAgbGV0IG1lYXN1cmUgPSBwZXJmb3JtYW5jZS5tZWFzdXJlKFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MubmFtZSxcbiAgICAgIHRoaXMuc2NyaXB0UnVudGltZU1hcmtzLnN0YXJ0TWFyay5uYW1lLFxuICAgICAgdGhpcy5zY3JpcHRSdW50aW1lTWFya3MuZW5kTWFyay5uYW1lXG4gICAgKTtcbiAgICByZXR1cm4gY29uc29sZS5kZWJ1ZyhgJHt0aGlzLnNjcmlwdFJ1bnRpbWVNYXJrcy5uYW1lfSBleGVjdXRpb24gdGltZSBpczogJHttZWFzdXJlLmR1cmF0aW9ufWApO1xuICB9O1xuICBcbn1cbiIsIi8vLS1Db3B5cmlnaHQgKGMpIDIwMjMgUm9iZXJ0IEEuIEhvd2VsbFxuaW1wb3J0IHsgVG9Eb0xpc3RFbGVtZW50cyB9IGZyb20gXCIuL3dpZGdldE1hcmt1cEVsZW1lbnRzXCI7XG5pbXBvcnQgeyBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VDYWNoZXNcIjtcbmltcG9ydCB7IFJXQlBhcnNlSlNPTiwgUldCU3RyaW5naWZ5SlNPTiB9IGZyb20gXCIuL3J3Ykpzb25Db252ZXJ0ZXJcIjtcbmltcG9ydCBSd2JFcnJvciBmcm9tIFwiLi9yd2JFcnJvckJ1c1wiO1xuXG4vKipcbiAqIEEgVG9Eb0xpc3QgaXMgYW4gSFRNTCB3aWRnZXQgdG8gc3RvcmUgVG8tRG9zIGluIHRoZSBicm93c2VyLiBJbnN0YW50aWF0ZSB0aGVcbiAqICBUb0RvTGlzdCBjb25zdHJ1Y3RvciB0byBjcmVhdGUgd2lkZ2V0IG1hcmt1cCBhbmQgZnVuY3Rpb25hbGl0eS4gVG8tRG9zIGFyZVxuICogIHN0b3JlZCBpbiB0aGUgYnJvd3NlcidzIExvY2FsIFN0b3JhZ2UgYW5kIHJlYWQgYW5kIHJlbmRlcmVkIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG4gKlxuICogVG8gY3JlYXRlIGEgVG9Eb0xpc3QsIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2UgbXVzdCBoYXZlICcuVG9Eb0xpc3QnIGNsYXNzLiBDYWxsIHRoZVxuICogIGNsYXNzIGNvbnN0cnVjdG9yLCBwYXNzaW5nIGluIHRoYXQgZWxlbWVudCB0byBjcmVhdGUgdGhlIHdpZGdldC5cbiAqXG4gKiAgICAgICBjb25zdCB0b2RvV2lkZ2V0ID0gbmV3IFRvRG9MaXN0KCk7XG4gKiAgICAgICB0b2RvV2lkZ2V0LmNyZWF0ZVRvRG9MaXN0V2lkZ2V0KGVsZW0pO1xuICpcbiAqIFRoZW4sIHRoZSB3aWRnZXQgaXMgY3JlYXRlZCBhbmQgVG8tRG9zIGFyZSByZXRyaWV2ZWQgZnJvbSBzdG9yYWdlLlxuICovXG5leHBvcnQgY2xhc3MgVG9Eb0xpc3Qge1xuICAvKipUb3RhbCBudW1iZXIgb2YgVG9ET3MqL1xuICBwdWJsaWMgc3RhdGljIFRvRE9zOiBudW1iZXIgPSAwO1xuICAvKipXaWRnZXQgZWxlbWVudHMgdXNlZCB0byBwb3B1bGF0ZSB0b2RvcyAqL1xuICBwcml2YXRlIHN0YXRpYyBUb0RvRWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG4gIHByaXZhdGUgc3RhdGljIFRvRG9JblN0b3JhZ2U6IGxvY2Fsc3RvcmFnZXRvZG9jYWNoZVtdO1xuICAvKipUb2RvIEhUTUwgZWxlbWVudHMgKi9cbiAgcHJpdmF0ZSBsaXN0RWxlbWVudHM6IFRvRG9MaXN0RWxlbWVudHM7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFRvLURvIGxpc3Qgd2lkZ2V0J3MgZWxlbWVudHMuXG4gICAqXG4gICAqICAgICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzXG4gICAqIEBwYXJhbSBUb0RvRWxlbWVudHMgV2lkZ2V0IEVsZW1lbnRzIC0tIGtleSB3aWRnZXQgZnVuY3Rpb24gZWxlbWVudHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNldFRvRG9MaXN0RWxlbWVudHMoVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzKSB7XG4gICAgVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSYW5kb20gV2ViIEJpdHMgdXNlcyBtdWx0aXBsZSBsb2NhdGlvbnMgdG8gYXBwbHkgdGhlIFRvLURvIExpc3Qgd2lkZ2V0LiBDcmVhdGVcbiAgICogIHRoZSBsaXN0IG1hcmt1cCwgcGFzc2luZyBpbiBhIHJlZmVyZW5jZSBlbGVtZW50IGZvciBwbGFjZW1lbnQgb2YgdGhlIHdpZGdldC5cbiAgICogQHBhcmFtIGVsZW0gLSB3aWRnZXQgaXMgcGxhY2VkIGFmdGVyIHRoaXMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVG9Eb0xpc3RXaWRnZXQoZWxlbTogRWxlbWVudCkge1xuICAgIC8vSW5zZXJ0IHRoZSB3aWRnZXQgYWZ0ZXIgdGhlIHBhc3NlZCBpbiBcImVsZW1cIlxuICAgIC8vRGVwZW5kZW50IG9uIHRoZSBwYWdlLCB0b2RvIHdpZGdldCBtYXkgaGF2ZSBwcmUtZXhpc3RpbmcgbWFya3VwIGluIHBsYWNlXG4gICAgLy9Td2l0Y2ggYWdhaW5zdCB0aGUgY3VycmVudCBwYWdlIHRvIGRldGVybWluZSBtYXJrdXAgbmVlZGVkXG4gICAgaWYgKGVsZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjVGhlcmUgaXMgbm8gXCJUb0RvTGlzdFwiIGNsYXNzIG9uIHRoaXMgcGFnZS5gLFxuICAgICAgICBcImNvbG9yOm9yYW5nZTtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIlRvRG9MaXN0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQWRkIFwiVG9Eb0xpc3RcIiBjbGFzcyB0byAke2VsZW0ubm9kZU5hbWV9IG5vZGUuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvXCI6XG4gICAgICBjYXNlIFwiL1JhbmRvbVdlYkJpdHMvaW5kZXguaHRtbFwiOlxuICAgICAgY2FzZSBcIi9pbmRleC5odG1sXCI6XG4gICAgICBjYXNlIFwiL1wiOlxuICAgICAgY2FzZSBcIi9kaXN0L2luZGV4Lmh0bWxcIjpcbiAgICAgICAgLy9NYXJrdXAgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAgICAgLy9DcmVhdGUgdGFibGUgZWxlbWVudHMgbmVlZGVkIGZvciB0aGUgdG9kbyBsaXN0XG4gICAgICAgIGNvbnN0IHRvZG9saXN0U2VjdGlvbiA9IGVsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0b2RvbGlzdFNlY3Rpb24uYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpdiA9IHRvZG9saXN0U2VjdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgY29uc3QgdGFibGUgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpKTtcbiAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIikpO1xuICAgICAgICBjb25zdCB0cjEgPSB0aGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgICAgICBjb25zdCB0aGxlZnQgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGhtaWRkbGUgPSB0cjEuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpKTtcbiAgICAgICAgY29uc3QgdGJvZHkgPSB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikpO1xuICAgICAgICBjb25zdCB0Zm9vdCA9IHRhYmxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Zm9vdFwiKSk7XG4gICAgICAgIGNvbnN0IHRyMyA9IHRmb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSk7XG4gICAgICAgIGNvbnN0IHRkM2xlZnQgPSB0cjMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICAgICAgY29uc3QgdGQzSU4gPSB0ZDNsZWZ0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG4gICAgICAgIGNvbnN0IHRkM21pZGRsZSA9IHRyMy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgICAgICBjb25zdCBJTlBVVCA9IHRkM21pZGRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpO1xuXG4gICAgICAgIC8vQWRkIGF0dHJpYnV0ZXMgYW5kIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGZvb3RcIikpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkXCIpO1xuICAgICAgICB0ZDNJTi5zZXRBdHRyaWJ1dGUoXCJWYWx1ZVwiLCBcIkFkZFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIml0ZW1JTlBVVFwiKTtcbiAgICAgICAgSU5QVVQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIElOUFVULnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJJbnB1dFwiKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJUby1EbzpcIjtcbiAgICAgICAgdG9kb2xpc3RTZWN0aW9uLmlkID0gXCJUb0RPXCI7XG4gICAgICAgIHRobGVmdC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGU/XCI7XG4gICAgICAgIHRobWlkZGxlLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvblwiO1xuICAgICAgICB0Ym9keS5pZCA9IFwiVG9Eb0l0ZW1zXCI7XG4gICAgICAgIHRkM0lOLmlkID0gXCJBZGRCdXR0b25cIjtcbiAgICAgICAgdGQzSU4udHlwZSA9IFwiYnV0dG9uXCI7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSAoaXQgaXMgbm90IHN0b3JlZCBpbiBjYWNoZSlcbiAgICAgICAgdGhpcy5jcmVhdGVTYW1wbGVUb19Ebyh0Ym9keSk7XG5cbiAgICAgICAgLy9XaXRoIHRoZSBlbGVtZW50cyBjcmVhdGVkLCBzZXQgdGhlIGNsYXNzIGxpc3QgZWxlbWVudHNcbiAgICAgICAgdGhpcy5nZXRUb0RvTGlzdEVsZW1lbnRzKCk7XG4gICAgICAgIFRvRG9MaXN0LnNldFRvRG9MaXN0RWxlbWVudHModGhpcy5saXN0RWxlbWVudHMpO1xuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIi9SYW5kb21XZWJCaXRzL3BhZ2VzL3RvZG9zLmh0bWxcIjpcbiAgICAgIGNhc2UgXCIvcGFnZXMvdG9kb3MuaHRtbFwiOlxuICAgICAgICAvL01hcmt1cCBleGlzdHMgb24gdGhlIHBhZ2UgYWxyZWFkeVxuICAgICAgICAvL1dpdGggdGhlIGVsZW1lbnRzIGNyZWF0ZWQsIHNldCB0aGUgY2xhc3MgbGlzdCBlbGVtZW50c1xuICAgICAgICB0aGlzLmdldFRvRG9MaXN0RWxlbWVudHMoKTtcbiAgICAgICAgVG9Eb0xpc3Quc2V0VG9Eb0xpc3RFbGVtZW50cyh0aGlzLmxpc3RFbGVtZW50cyk7XG5cbiAgICAgICAgLy9DcmVhdGUgYSBzYW1wbGUgdG8gZG8gaXRlbSBkdWUgdG8gY2FjaGUgZW1wdHlcbiAgICAgICAgY29uc3QgaHRib2R5ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZUJvZHk7XG4gICAgICAgIGlmIChodGJvZHkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlU2FtcGxlVG9fRG8oaHRib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wdWxhdGVUb0RvTGlzdCgpO1xuICAgICAgICB0aGlzLmFkZFRvRG9FdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJFbGVtZW50IGlzIG5vdCB2YWxpZC4gUGxlYXNlIGVuc3VyZSBhIHZhbGlkIGVsZW1lbnQgZm9yIFRvRG8gbGlzdCB3aWRnZXQgdG8gZm9sbG93LlwiXG4gICAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICogQ2hlY2tzIGZvciBUby1EbyBpdGVtcyBmcm9tIExvY2FsIFN0b3JhZ2UuXG4gKiBAcmV0dXJucyBib29sZWFuIHRydWUgb3IgZmFsc2VcbiAqL1xuICBwcml2YXRlIHN0YXRpYyBnZXRUb0RvSW5TdG9yYWdlKFxuICAgIGNoZWNrZW1wdHl2YWx1ZXN0cmluZzogYm9vbGVhbixcbiAgICBsb2dtZXNzYWdlOiBib29sZWFuXG4gICkge1xuICAgIGlmIChcbiAgICAgIFJ3YkVycm9yLmNoZWNrTG9jYWxTdG9yYWdlRXF1YWxOdWxsKFxuICAgICAgICBcIlRvRG9MaXN0XCIsXG4gICAgICAgIFwiVG9Eb3NcIixcbiAgICAgICAgY2hlY2tlbXB0eXZhbHVlc3RyaW5nLFxuICAgICAgICBsb2dtZXNzYWdlXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBwYXJzZXN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVG9Eb3NcIik7XG4gICAgbGV0IHBhcnNldGVzdCA9IE9iamVjdC5jcmVhdGUobmV3IFJXQlBhcnNlSlNPTihwYXJzZXN0cikpO1xuICAgIGlmICghcGFyc2V0ZXN0LnBhc3NlZCkge1xuICAgICAgLy9wYXJzZWQgSlNPTiBpcyBtYWxmb3JtZWRcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiVG9Eb3NcIik7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0RlbGV0ZWQgc3RvcmFnZSBrZXk6IFRvRG9zYCxcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpvcmFuZ2U7Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5Ub0RvSW5TdG9yYWdlID0gcGFyc2V0ZXN0LnJldHVybm9iajtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogR2F0aGVyIG5lY2Vzc2FyeSBlbGVtZW50cyBmcm9tIHRoZSBjcmVhdGVkIHdpZGdldC5cbiAgICogQHJldHVybnMgVG9Eb0VsZW1lbnRzOiBUb0RvTGlzdEVsZW1lbnRzXG4gICAqL1xuICBwcml2YXRlIGdldFRvRG9MaXN0RWxlbWVudHMoKSB7XG4gICAgLy9HYXRoZXIgbmVjZXNzYXJ5IGVsZW1lbnRzIGZyb20gdGhlIGNyZWF0ZWQgd2lkZ2V0XG4gICAgLy9FYWNoIHdpZGdldCBsb2NhdGlvbidzIGVsZW1lbnRzIG1heSB2YXJ5LCBzbyBhIGNhbGwgb2YgZ2V0VG9Eb0xpc3RFbGVtZW50cygpXG4gICAgLy9sb2NhdGVzIHRoZSBwYWdlJ3MgZWxlbWVudHMgdG8gcG9wdWxhdGUgdGhlIFRvRG9FbGVtZW50cyBpbnRlcmZhY2UuXG4gICAgbGV0IFRvRG9FbGVtZW50czogVG9Eb0xpc3RFbGVtZW50cyA9IHtcbiAgICAgIHRvZG9UYWJsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNUb0RPIHRhYmxlXCIpLFxuICAgICAgdG9kb1RhYmxlQm9keTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUb0RvSXRlbXNcIiksXG4gICAgICBhZGRCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQWRkQnV0dG9uXCIpLFxuICAgICAgYWRkSXRlbVRvRW50ZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpdGVtSU5QVVRcIl0nKSxcbiAgICB9O1xuICAgIHRoaXMubGlzdEVsZW1lbnRzID0gVG9Eb0VsZW1lbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgVG8tRG8gdG8gTG9jYWwgU3RvcmFnZS5cbiAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gVGhlIFVJIGZvcm0gaW5wdXQgZGVzY3JpcHRpb24uXG4gICAqL1xuICBwcml2YXRlIGFkZHRvRG9Ub1N0b3JhZ2UoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIC8vQWRkIHRoZSBUb0RvcyBhcnJheSB0byBsb2NhbCBjYWNoZS5cbiAgICAvL1RoZSAnbG9jYWxzdG9yYWdldG9kb2NhY2hlJyBpbnRlcmZhY2Ugc3RydWN0dXJlcyB0aGUgZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFsLlxuICAgIGxldCBUb0RvOiBsb2NhbHN0b3JhZ2V0b2RvY2FjaGUgPSB7XG4gICAgICBpbkNhY2hlOiBmYWxzZSxcbiAgICAgIHRvZG9pdGVtOiBkZXNjcmlwdGlvbixcbiAgICB9O1xuICAgIGxldCBUb0RvczogYW55ID0gW107IC8vVG9EbyBhcnJheVxuICAgIGxldCBzdHJnZnk7XG5cbiAgICBjb25zdCBzdHJpbmdpZnl0b2RvID0gKHRvZG9zdHI6IGFueSkgPT4ge1xuICAgICAgLy9DYWxsIFJXQlN0cmluZ2lmeUpTT04gdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RcbiAgICAgIGxldCB0b2Rvc3N0cmdmeXRlc3QgPSBPYmplY3QuY3JlYXRlKG5ldyBSV0JTdHJpbmdpZnlKU09OKHRvZG9zdHIpKTtcbiAgICAgIGlmICghdG9kb3NzdHJnZnl0ZXN0LnBhc3NlZCkge1xuICAgICAgICAvL0xPR0xFQUZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvZG9zc3RyZ2Z5dGVzdC5yZXR1cm5zdHI7XG4gICAgfTtcbiAgICAvL0ZpcnN0LCByZWFkIGN1cnJlbnQgTG9jYWwgU3RvcmFnZSBUb0Rvc1xuICAgIGxldCB0b2Rvc3N0b3JhZ2VjYWNoZSA9IFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICBpZiAodG9kb3NzdG9yYWdlY2FjaGUpIHtcbiAgICAgIFRvRG9zID0gVG9Eb0xpc3QuVG9Eb0luU3RvcmFnZTtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFRvRG9zLnB1c2goVG9Ebyk7XG4gICAgICAvL0NhbGwgUldCU3RyaW5naWZ5SlNPTiB0byBzdHJpbmdpZnkgdGhlIG9iamVjdFxuICAgICAgc3RyZ2Z5ID0gc3RyaW5naWZ5dG9kbyhUb0Rvcyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRvRG9zXCIsIHN0cmdmeSk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjPFJXQj4lY0NyZWF0ZWQgdG8tZG8gY2FjaGUga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6Y3lhbjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOmN5YW47Zm9udC1zaXplOjE2cHg7XCJcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCVjPFJXQj4lY0FkZGVkIHRvLWRvIGNhY2hlOiAke2Rlc2NyaXB0aW9ufWAsXG4gICAgICBcImNvbG9yOmN5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Y3lhbjtcIlxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBUby1EbyBpdGVtIGZyb20gTG9jYWwgU3RvcmFnZS4gVGhlIHJlcXVlc3RlZCBUby1EbyB0byByZW1vdmUgaXNcbiAgICogIHB1bGxlZCBpbmRpdmlkdWFsbHkgZnJvbSB0aGUga2V5LXZhbHVlIHBhaXIgb2JqZWN0LlxuICAgKiBAcGFyYW0gaXRlbSAtIHRoZSBUby1EbyBpdGVtIHJlcXVlc3RlZCB0byByZW1vdmVcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZldG9Eb0Zyb21TdG9yYWdlKGl0ZW06IHN0cmluZykge1xuICAgIFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UgPSBUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlLmZpbHRlcihcbiAgICAgIHRvZG8gPT4gdG9kby50b2RvaXRlbSAhPT0gaXRlbVxuICAgICk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIGNhY2hlOiAke2l0ZW19YCxcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6ZGFya2N5YW47XCJcbiAgICApO1xuICAgIGxldCB0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdCA9IE9iamVjdC5jcmVhdGUoXG4gICAgICBuZXcgUldCU3RyaW5naWZ5SlNPTihUb0RvTGlzdC5Ub0RvSW5TdG9yYWdlKVxuICAgICk7XG4gICAgaWYgKCF0b2RvaW5zdG9yYWdlc3RyZ2Z5dGVzdC5wYXNzZWQpIHtcbiAgICAgIC8vTE9HTEVBRlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQganNvbnN0ciA9IHRvZG9pbnN0b3JhZ2VzdHJnZnl0ZXN0LnJldHVybnN0cjtcbiAgICBpZiAoanNvbnN0ciA9PSBcIlwiIHx8IGpzb25zdHIgPT0gXCJbXVwiKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlRvRG9zXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNEZWxldGVkIHN0b3JhZ2Uga2V5OiBUb0Rvc2AsXG4gICAgICAgIFwiY29sb3I6ZGFya2N5YW47Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpkYXJrY3lhbjtmb250LXNpemU6MTZweDtcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJUb0Rvc1wiLCBqc29uc3RyKTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgbWFya3VwIHRvIGFkZCBhIHJvdyB0byB0aGUgVG8tRG8gdGFibGUuXG4gICAqICBBIHJvdyBjb25zaXN0cyBvZiB0aHJlZSBjb2x1bW5zOiBhIGNvbXBsZXRlIHRpY2stYm94LCBhIGRlc2NyaXB0aW9uLCBhbmQgYSBkZWxldGUgYnV0dG9uLlxuICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gLSBVc2VyIGZvcm0gaW5wdXQgdG8gYWRkIGFzIGEgZGVzY3JpcHRpb24uXG4gICAqIEBwYXJhbSBmaXJzdFBhaW50IC0gQm9vbGVhbiB2YWx1ZSB1c2VkIGJ5IGFkZGluZyBsaXN0IHN0b3JhZ2VcbiAgICovXG4gIHByaXZhdGUgQWRkVG9Eb1JvdyhkZXNjcmlwdGlvbjogc3RyaW5nLCBmaXJzdFBhaW50OiBib29sZWFuKSB7XG4gICAgLy9DcmVhdGUgYSB0YWJsZSByb3cgd2l0aCBjaGVja2JveCBhbmQgZGVsZXRlIG9wdGlvbnNcbiAgICBjb25zdCBUQUJMRUlURU0gPSBUb0RvTGlzdC5Ub0RvRWxlbWVudHMudG9kb1RhYmxlO1xuICAgIGNvbnN0IHRhYmxlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBuZXdSb3cgPSB0YWJsZUZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTsgLy9BZGQgcm93XG4gICAgY29uc3QgZmlyc3RDT0wgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBmaXJzdCBkYXRhXG4gICAgY29uc3QgY2hlY2tCT1ggPSBmaXJzdENPTC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikpOyAvL0FkZCBjaGVja2JveFxuICAgIGNvbnN0IG5ld0lURU0gPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTsgLy9UYWJsZSBzZWNvbmQgZGF0YVxuICAgIGNvbnN0IHNlY29uZENPTCA9IG5ld1Jvdy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpOyAvL1RhYmxlIHRoaXJkIGRhdGFcbiAgICBjb25zdCBkZWxCT1ggPSBzZWNvbmRDT0wuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTsgLy9BZGQgZGVsZXRlYm94XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjaGVja0JPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgY2hlY2tCT1guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNoZWNrYm94XCIpO1xuICAgIGNoZWNrQk9YLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgbmV3SVRFTS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcIm51bVwiLFxuICAgICAgVG9Eb0xpc3QuVG9ET3NcbiAgICAgICAgPyAoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1RvRE8gdGRbbnVtXVwiKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChOdW1iZXIoZWxlbT8uZ2V0QXR0cmlidXRlKFwibnVtXCIpKSB8fCAtMTAwMCkgKyBUb0RvTGlzdC5Ub0RPc1xuICAgICAgICAgICAgKS50b1N0cmluZygpO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgOiAoMSkudG9TdHJpbmcoKVxuICAgICk7XG4gICAgbmV3SVRFTS50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uOyAvL1BvcHVsYXRlIHNlY29uZCBjb2xcbiAgICBUb0RvTGlzdC5Ub0RPcysrOyAvL051bWJlciBvZiBJdGVtc1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIGRlbEJPWC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRlbGV0ZVwiKTtcblxuICAgIGlmIChmaXJzdFBhaW50KSB7XG4gICAgICAvL0FkZCB0byBsaXN0IHN0b3JhZ2VcbiAgICAgIHRoaXMuYWRkdG9Eb1RvU3RvcmFnZShkZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgLy9BZGQgdGhlIHJvdyB0byB0aGUgVG9Eb3MgdGFibGVcbiAgICBUQUJMRUlURU0uYXBwZW5kQ2hpbGQodGFibGVGcmFnKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAlYzxSV0I+JWNDcmVhdGVkIHRvLWRvIHRhYmxlIHJvd2AsXG4gICAgICBcImNvbG9yOmdvbGQ7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgIFwiY29sb3I6Z29sZDtcIlxuICAgICk7XG5cbiAgICAvL0FkZCBhbiBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiAnZGVsZXRlJyBpcyBjbGlja2VkXG4gICAgZGVsQk9YLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbihkZWxCT1gpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIHRoZSBUby1EbyBpdGVtIHJvd3MgZnJvbSBUby1Eb3Mgc3RvcmVkIGluIHRoZSBicm93c2VyIExvY2FsIFN0b3JhZ2UuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlVG9Eb0xpc3QoKSB7XG4gICAgaWYgKFRvRG9MaXN0LmdldFRvRG9JblN0b3JhZ2UodHJ1ZSwgZmFsc2UpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvRG9MaXN0LlRvRG9JblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5BZGRUb0RvUm93KFRvRG9MaXN0LlRvRG9JblN0b3JhZ2VbaV0udG9kb2l0ZW0sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICovXG4gIHByaXZhdGUgYWRkVG9Eb0V2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IEFEREJVVFRPTiA9IFRvRG9MaXN0LlRvRG9FbGVtZW50cy5hZGRCdXR0b247XG4gICAgY29uc3QgQURESVRFTUVOVEVSID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLmFkZEl0ZW1Ub0VudGVyO1xuICAgIGlmIChBRERCVVRUT04gPT0gbnVsbCAmJiBBRERJVEVNRU5URVIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWxlbWVudCB3YXMgbm90IGZvdW5kIG9yIGlzIG51bGxcIik7XG4gICAgfVxuICAgIC8qKkFkZCBpbnB1dCB0ZXh0IHRvIHRoZSB0b2RvIGxpc3QgZnJvbSBjbGlja2luZyB0aGUgYWRkIGJ1dHRvbiovXG4gICAgQUREQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgIEFERElURU1FTlRFUi52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG4gICAgLyoqQWRkIGlucHV0IHRleHQgdG8gdGhlIHRvZG8gbGlzdCB3aGVuIHVzaW5nIGtleSBlbnRlciovXG4gICAgQURESVRFTUVOVEVSLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgICAgaWYgKGUuY29kZSA9PSBcIk51bXBhZEVudGVyXCIgfHwgZS5jb2RlID09IFwiRW50ZXJcIikge1xuICAgICAgICB0aGlzLkFkZFRvRG9Sb3coQURESVRFTUVOVEVSLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgQURESVRFTUVOVEVSLnZhbHVlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogZnVuY3Rpb24gZGV0ZXJtaW5pbmcgdGhlIGRlbGV0ZSBidXR0b24uIEl0ZW1zIGFyZSBkZWxldGVkIHdoZW4gcHVzaGVkLCBidXQgYXJlXG4gICAqICBub3QgcmVtb3ZlZCBmcm9tIHN0b3JhZ2Ugd2l0aG91dCAnQ29tcGxldGU/JyBjaGVja2Vib3ggY2hlY2tlZC5cbiAgICogQHBhcmFtIGJveCBpbnB1dCBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIERlbGV0ZUJ1dHRvbihib3g6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICBib3gucGFyZW50Tm9kZSA9PSBudWxsIHx8XG4gICAgICBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcgPT0gbnVsbCB8fFxuICAgICAgYm94LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZyA9PSBudWxsXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGEgdGFibGUgZWxlbWVudC5cIik7XG4gICAgfVxuICAgIGNvbnN0IHJvd0Noa0J4ID0gPEhUTUxFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmdcbiAgICApO1xuICAgIC8qKiBJbnB1dCBlbGVtZW50ICovXG4gICAgY29uc3Qgcm93Q2hrQnhJTiA9IDxIVE1MSW5wdXRFbGVtZW50PnJvd0Noa0J4LmNoaWxkTm9kZXNbMF07XG4gICAgY29uc3QgdG9kb1RhYmxlOiBIVE1MVGFibGVFbGVtZW50ID0gVG9Eb0xpc3QuVG9Eb0VsZW1lbnRzLnRvZG9UYWJsZTtcbiAgICBjb25zdCB0cjogSFRNTFRhYmxlUm93RWxlbWVudCA9IDxIVE1MVGFibGVSb3dFbGVtZW50PihcbiAgICAgIGJveC5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICApO1xuICAgIGxldCBpID0gdHIucm93SW5kZXg7XG4gICAgY29uc3QgdmFsdWUgPSBib3gucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgaWYgKHJvd0Noa0J4SU4uY2hlY2tlZCkge1xuICAgICAgLy9yZW1vdmUgcm93IHNpbmNlIGNvbXBsZXRlZFxuICAgICAgdG9kb1RhYmxlLmRlbGV0ZVJvdyhpKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWM8UldCPiVjRGVsZXRlZCB0b2RvIHJvdzogJHtib3gucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50fWAsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO2ZvbnQtd2VpZ2h0OmJvbGQ7XCIsXG4gICAgICAgIFwiY29sb3I6Z29sZGVucm9kO1wiXG4gICAgICApO1xuICAgICAgaWYgKHZhbHVlICE9IFwiQWRkIGEgVG9ETyBJdGVtLlwiKSB7XG4gICAgICAgIFRvRG9MaXN0LlRvRE9zLS07XG5cbiAgICAgICAgLy9kZWxldGUgYXNzb2NpYXRlZCBzdG9yYWdlIGl0ZW1cbiAgICAgICAgdGhpcy5yZW1vdmV0b0RvRnJvbVN0b3JhZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvVGFibGUuZGVsZXRlUm93KGkpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG8gcm93OiAke2JveC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnR9YCxcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7Zm9udC13ZWlnaHQ6Ym9sZDtcIixcbiAgICAgICAgXCJjb2xvcjpnb2xkZW5yb2Q7XCJcbiAgICAgICk7XG4gICAgICBUb0RvTGlzdC5Ub0RPcy0tO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gc2VlZCB0aGUgVG8tRG8gTGlzdCB3aGVuIHRoZXJlIGFyZSBubyBMb2NhbCBTdG9yYWdlIGl0ZW1zXG4gICAqICB3aGljaCB3b3VsZCBwb3B1bGF0ZSB0aGUgbGlzdC4gVGhlIHNhbXBsZSByZW1haW5zIG9uIHBhZ2UgYnV0IGlzIG5ldmVyIHN0b3JlZCBpbiB0aGUgYnJvd3Nlci5cbiAgICogQHBhcmFtIHRib2R5IHRhYmxlIGJvZHkgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTYW1wbGVUb19Ebyh0Ym9keTogRWxlbWVudCkge1xuICAgIGlmIChUb0RvTGlzdC5nZXRUb0RvSW5TdG9yYWdlKGZhbHNlLCB0cnVlKSkgcmV0dXJuO1xuICAgIC8vQ3JlYXRlIGEgc2FtcGxlIGVudHJ5IGluIHRoZSBUb0RvIHRhYmxlIGFzIGEgcGxhY2Vob2xkZXJcbiAgICBjb25zdCB0cjIgPSB0Ym9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIikpO1xuICAgIGNvbnN0IHRkMmxlZnQgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJJTiA9IHRkMmxlZnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpKTtcbiAgICBjb25zdCB0ZDJtaWRkbGUgPSB0cjIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpKTtcbiAgICBjb25zdCB0ZDJyaWdodCA9IHRyMi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIikpO1xuICAgIGNvbnN0IHRkMkRFTCA9IHRkMnJpZ2h0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSk7XG5cbiAgICAvL0FkZCBhdHRyaWJ1dGVzIGFuZCBwcm9wZXJ0eSB2YWx1ZXNcbiAgICB0ZDJJTi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2hlY2tib3hcIik7XG4gICAgdGQybWlkZGxlLnNldEF0dHJpYnV0ZShcIm51bVwiLCBgJHsxfWApO1xuICAgIHRkMklOLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJEZWxldGVcIik7XG4gICAgdGQyREVMLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyZXNldFwiKTtcbiAgICB0ZDJERUwuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJEZWxldGVcIik7XG4gICAgdGQySU4udHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICB0ZDJtaWRkbGUudGV4dENvbnRlbnQgPSBcIkFkZCBhIFRvRE8gSXRlbS5cIjtcbiAgICBUb0RvTGlzdC5Ub0RPcysrO1xuXG4gICAgLy9cIkRlbGV0ZVwiIGV2ZW50IGxpc3RlbmVyXG4gICAgdGQyREVMLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLkRlbGV0ZUJ1dHRvbih0ZDJERUwpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAlYzxSV0I+JWNSZW1vdmVkIHRvZG86ICR7dGQyREVMLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudH1gLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtmb250LXdlaWdodDpib2xkO1wiLFxuICAgICAgICBcImNvbG9yOnB1cnBsZTtcIlxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxufVxuIiwiLy8tLUNvcHlyaWdodCAoYykgMjAyMyBSb2JlcnQgQS4gSG93ZWxsXG5pbXBvcnQgQWNyb255bXNFbGVtIGZyb20gXCIuL2NvbXBvbmVudHMvcGFnZS9hY3Jvbnltcy1lbGVtZW50XCI7XG5pbXBvcnQgY2xhc3NDb21wb25lbnRzIGZyb20gXCIuL2NsYXNzQ29tcG9uZW50c1wiO1xuaW1wb3J0IGV4cGFuZGluZ0xpc3RET01XaWRnZXQgZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlL2V4cGFuZGluZ0xpc3REb21XaWRnZXRcIjtcbmltcG9ydCBhY3RpdmVDYXJkc1dpZGdldCBmcm9tIFwiLi9jb21wb25lbnRzL3BhZ2UvZ3Jvd2luZ0NhcmRcIjtcbmltcG9ydCB7IGNzc2V4Q29sb3JDb2RlLCBodG1sZXhDb2xvckNvZGUsIHVybGV4Q29sb3JDb2RlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlL2NvbG9yQ29kZVwiO1xuaW1wb3J0IFJ3YlBlcmYgZnJvbSBcIi4vbW9kZWxzL3NjcmlwdFBlcmZcIjtcbmltcG9ydCBkb21haW5Mb29rdXAgZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlL2RvbWFpbkxvb2t1cFwiO1xuaW1wb3J0IHNsaWRlckJhciBmcm9tIFwiLi9jb21wb25lbnRzL3BhZ2Uvc2xpZGVyQmFyXCI7XG5pbXBvcnQgaHNsQ29sb3JXaWRnZXQgZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlL2hzbENvbG9yXCI7XG5pbXBvcnQgbGF0ZW5jeUNhbGN1bGF0b3IgZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlL2NhbGN1bGF0ZVwiO1xuXG5jb25zdCBwYWdlQ29tcG9uZW50cyA9IHtcbiAgY2hlY2tQYWdlOiAocGFnZTogc3RyaW5nKSA9PiB7XG4gICAgY2xhc3NDb21wb25lbnRzLmZvdXJvaGZvdXIoKTtcblxuICAgIHN3aXRjaCAocGFnZSkge1xuICAgICAgLy8gZG9tLmh0bWwgcGFnZSB1c2VzIGV4cGFuZGluZ0xpc3RzIGNvbXBvbmVudFxuICAgICAgY2FzZSBcIi9wYWdlcy9kb20uaHRtbFwiOlxuICAgICAgY2FzZSBcIi9wYWdlcy9zdmcuaHRtbFwiOlxuICAgICAgICBleHBhbmRpbmdMaXN0RE9NV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBJbml0aWFsaXplIHdlYklERSB3aWRnZXRcbiAgICAgIGNhc2UgXCIvcGFnZXMvd2ViaWRlcy5odG1sXCI6XG4gICAgICAgIGFjdGl2ZUNhcmRzV2lkZ2V0LmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBJbml0aWFsaXplIENTU0VYIGNvbXBvbmVudHNcbiAgICAgIGNhc2UgXCIvcGFnZXMvY3NzLmh0bWxcIjpcbiAgICAgICAgY3NzZXhDb2xvckNvZGUuaW5pdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEluaXRpYWxpemUgaHRtbGV4Q29sb3JDb2RlIGNvbXBvbmVudHNcbiAgICAgIGNhc2UgXCIvcGFnZXMvaHRtbC5odG1sXCI6XG4gICAgICAgIGh0bWxleENvbG9yQ29kZS5pbml0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSW5pdGlhbGl6ZSB1cmxleENvbG9yQ29kZSBjb21wb25lbnRzXG4gICAgICBjYXNlIFwiL3BhZ2VzL3VybC5odG1sXCI6XG4gICAgICAgIHVybGV4Q29sb3JDb2RlLmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBJbml0aWFsaXplIGRvbWFpbiBuYW1lIGxvb2t1cFxuICAgICAgY2FzZSBcIi9wYWdlcy9kb21haW5sb29rdXAuaHRtbFwiOlxuICAgICAgICBkb21haW5Mb29rdXAuaW5pdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIvcGFnZXMvbWFya3VwLmh0bWxcIjpcbiAgICAgICAgc2xpZGVyQmFyLmluaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBJbml0aWFsaXplIEhTTCBjb2xvciBwaWNrZXJcbiAgICAgIGNhc2UgXCIvcGFnZXMvaHNsLmh0bWxcIjpcbiAgICAgICAgaHNsQ29sb3JXaWRnZXQuaW5pdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEluaXRpYWxpemUgUHJvcGFnYXRpb24gTGF0ZW5jeSBjYWxjdWxhdG9yXG4gICAgICBjYXNlIFwiL3BhZ2VzL2xhdGVuY3kuaHRtbFwiOlxuICAgICAgICBsYXRlbmN5Q2FsY3VsYXRvci5pbml0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcbiAgaW5pdDogKCkgPT4ge1xuICAgIGxldCBwYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGNvbnN0IHBhZ2VQZXJmID0gbmV3IFJ3YlBlcmYoXCJQYWdlY29tcG9uZW50c1wiKTsgLy9tZWFzdXJlIHBlcmZvcm1hbmNlXG5cbiAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhY3Jvbnltcy1saXN0XCIsIEFjcm9ueW1zRWxlbSk7XG4gICAgcGFnZUNvbXBvbmVudHMuY2hlY2tQYWdlKHBhZ2UpO1xuXG4gICAgcGFnZVBlcmYuZW5kKCk7IC8vZW5kIHBlcmZvcm1hbmNlIG1lYXN1cmVcbiAgfSxcbiAgbG9hZDogKCkgPT4ge30sXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcGFnZUNvbXBvbmVudHMuaW5pdClcbiJdfQ==

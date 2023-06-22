"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const PageAcronyms = [
  {
    page: "/pages/wifi.html",
    htmlTitle: "wifi",
    acronyms: ["SSID", "802.11a", "802.11b", "802.11g", "802.11n", "802.11ac", "802.11ax", "WLAN", "IPv4", "IPv6", "MAC", "AP"]
  },
  {
    page: "/pages/networkspeed.html",
    htmlTitle: "networkspeed",
    acronyms: ["Ping", "NIC", "BPS", "MBPS", "GBPS", "Bit", "Byte", "ISP"]
  },
  {
    page: "/pages/markup.html",
    htmlTitle: "markup",
    acronyms: ["body", "head", "div", "href", "lang", "ul", "ol"]
  },
  {
    page: "/pages/ipaddress.html",
    htmlTitle: "ipaddress",
    acronyms: ["IPV4", "IPV6", "TCP/IP", "OSI", "DHCP", "DNS", "Subnet Mask", "CIDR", "LAN", "NAT", "MAC"]
  },
  {
    page: "/pages/https.html",
    htmlTitle: "https",
    acronyms: ["KMS", "PKI", "RSA", "SSL", "TLS", "SHA", "AES", "EFS", "TPM", "BitLocker", "Encrypt", "Decrypt", "Signature", "Elliptic Curve"]
  },
  {
    page: "/pages/htmlresponses.html",
    htmlTitle: "htmlresponses",
    acronyms: ["HTTP", "HTTPS", "TCP", "UDP", "DOM", "Asset", "Frame", "Auth", "Transport", "Response", "Verb"]
  },
  {
    page: "/pages/domainlookup.html",
    htmlTitle: "domainlookup",
    acronyms: ["DNS", "DNSSEC", "DDNS", "FQDN", "NetBIOS", "Nameserver", "OU", "Top-level", "A record", "CNAME"]
  },
  {
    page: "/pages/drives.html",
    htmlTitle: "drives",
    acronyms: ["CSOM", "SSOM", "PS", "NS", "Tree", "Objects", "Registry", "Variables", "TCP/IP", "TLS", "Cyphertext", "CN", "EKU"]
  },
  {
    page: "/pages/dns.html",
    htmlTitle: "dns",
    acronyms: ["DDNS", "DNSSEC", "A (addresS)", "CAA", "NS (name server)", "MX", "QPS"]
  },
  {
    page: "/pages/dom.html",
    htmlTitle: "dom",
    acronyms: ["DOM", "CSS", "HTML", "asset", "property", "attribute", "variable", "reference", "function", "root"]
  },
  {
    page: "/pages/svg.html",
    htmlTitle: "svg",
    acronyms: ["XML", "XHTML", "RDF", "ISO", "DCMES", "CC License"]
  },
  {
    page: "/pages/javascript.html",
    htmlTitle: "javascript",
    acronyms: ["Defer", "Synchronous", "ES", "GUI", "JSON", "AJAX", "IIFE", "IDE", "DOM"]
  },
  {
    page: "/pages/http.html",
    htmlTitle: "javascript",
    acronyms: ["HTTP", "TCP", "UDP", "DNS", "TLS", "IP", "HTML", "CSS", "JS", "API"]
  }
]

const currentPage = PageAcronyms.filter(page => page.page === window.location.pathname);

export class SimpleGreeting extends LitElement {
  static properties = {
    title: {},
    id: {},
    acronyms: [],
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .acronymList { display: block; width: fit-content;
      border: .5mm solid var(--clr-blue);
      box-shadow:
      0.7px 0px 1.4px rgba(0, 0, 0, 0.303),
      1.7px 0px 4.7px rgba(0, 0, 0, 0.447),
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
      margin-bottom: .5em;
      font-size: 1.2em;
    }
    .acronymList ul {
      text-align: left;
      margin: 0;
    }
    @media only screen and (min-width: 320px){
      .acronymList ul { 
        padding: 0em 1em;
      }
    }
    @media only screen and (min-width: 501px){
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
    // Declare reactive properties
    this.title = 'Common Acronyms';
    this.id = currentPage[0].htmlTitle;
    this.acronyms = currentPage[0].acronyms;
  }
  buildList() { }

  // Render the UI as a function of component state
  render() {
    let listitems = [];
    for (const acronyms of this.acronyms) {
      listitems.push(html`<li>${acronyms}</li>`);
    }

    return html`
    <aside class="acronymList">
    <h3>${this.title}:</h3>
    <ul id="acr-${this.id}">
      ${listitems}
    </ul>
    </aside>`;
  }
}
customElements.define('acronyms-list', SimpleGreeting);

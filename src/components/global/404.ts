//--Copyright (c) 2023 Robert A. Howell
import { client } from "../../models/client";

const notFound404Widget = {
  init: () => {
    let client404 = new client();
    let clientRefferInfo = document.querySelector("#clientreferrer");
    let clientRttInfo = document.querySelector("#clientrtt");
    let clientPlatformInfo = document.querySelector("#clientplat");

    //Fill information secion
    clientRefferInfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
    clientRttInfo.textContent = `${
      client404.connectiontype ? client404.connectiontype : "No connection type found."
    }`;
    clientRttInfo.textContent += `, rtt of ${
      client404.connectionrtt ? client404.connectionrtt : "No rtt found."
    }`;
    clientPlatformInfo.textContent = client404.browserplatform
      ? client404.browserplatform
      : "No platform information found.";
    clientPlatformInfo.textContent += `, ${
      client404.useragent ? client404.useragent : "No user agent info."
    }`;

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

export default notFound404Widget;

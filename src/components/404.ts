//--Copyright (c) 2023 Robert A. Howell
import { client } from '../models/client'

const notfound404widget = {
    init: () => {
        let client404 = new client();
        let clientrefferinfo = document.querySelector('#clientreferrer');
        let clientrttinfo = document.querySelector('#clientrtt');
        let clientplatforminfo = document.querySelector('#clientplat');
        clientrefferinfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
        clientrttinfo.textContent = `${client404.connectiontype ? client404.connectiontype : "No connection type found."}`;
        clientrttinfo.textContent += `, rtt of ${client404.connectionrtt ? client404.connectionrtt : "No rtt found."}`;
        clientplatforminfo.textContent = client404.browserplatform ? client404.browserplatform : "No platform information found.";
        clientplatforminfo.textContent += `, ${client404.product ? client404.product : "No product info."}`;
        clientplatforminfo.textContent += `, ${client404.useragent ? client404.useragent : "No user agent info."}`;

        let gobacklink = document.querySelector('#oldURL');
        if (client404.oldURL.includes("404.html")){
            client404.oldURL = window.location.origin;
        }
        let gobackhref = client404.oldURL ? client404.oldURL : window.location.origin;
        gobacklink.setAttribute("href", `${gobackhref}`);
        gobacklink.setAttribute("title", gobackhref);

        let imgpic = document.querySelector("#errorpic");
        imgpic.setAttribute("src", "/img/error.png");
    }
}

export default notfound404widget;
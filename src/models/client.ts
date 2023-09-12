//--Copyright (c) 2023 Robert A. Howell

export class client{
    oldURL = document.referrer;
    browserplatform = this.setbrowserplatform();
    product = window.clientInformation.product;
    useragent = window.clientInformation.userAgent;
    connectiontype = this.setconnectiontype();
    connectionrtt = this.setconnectionrtt();

    setbrowserplatform() {
        if ("userAgentData" in window.clientInformation)
            return window.clientInformation.userAgentData.platform;
        else
            this.browserplatform = "";
    }

    setconnectiontype() {
        if ("connection" in window.clientInformation)
            return window.clientInformation.connection.effectiveType;
        else
            this.connectiontype = "";
    }

    setconnectionrtt() {
        if ("connection" in window.clientInformation)
            return window.clientInformation.connection.rtt;
        else
            this.connectionrtt = "";
    }
}
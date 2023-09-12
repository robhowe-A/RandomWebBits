//--Copyright (c) 2023 Robert A. Howell

export class client{
    oldURL = document.referrer;
    browserplatform = this.setbrowserplatform();
    useragent = window.navigator.userAgent;
    connectiontype = this.setconnectiontype();
    connectionrtt = this.setconnectionrtt();

    setbrowserplatform() {
        if ("userAgentData" in window.navigator)
            return window.navigator.userAgentData.platform;
        else
            this.browserplatform = "";
    }

    setconnectiontype() {
        if ("connection" in window.navigator)
            return window.navigator.connection.effectiveType;
        else
            this.connectiontype = "";
    }

    setconnectionrtt() {
        if ("connection" in window.navigator)
            return window.navigator.connection.rtt;
        else
            this.connectionrtt = "";
    }
}
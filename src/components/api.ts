//--Copyright (c) Robert A. Howell

export class apiGET {
    private GETURL: URL;
    private sendToBrowserCache: boolean = false;
    private browserCacheName: string;
    public errorElem: HTMLElement;
    private dataIsInCache: boolean = false; //TODO: dataincache overall
    private receivedData: any; //TODO: check if this is needed
    
    constructor(GETURL: URL, sendToBrowserCache: boolean, browserCacheName: string, errorElem: HTMLElement) {
        this.GETURL = GETURL;
        this.sendToBrowserCache = sendToBrowserCache;
        this.browserCacheName = browserCacheName;
        this.errorElem = errorElem;
    }

    public getGETURL() {
        return this.GETURL;
    };

    public setGETURL(GETURL: URL | string) {
        if (typeof GETURL === 'string'){
            this.GETURL = new URL(GETURL);
        }
        else {
            this.GETURL = GETURL;
        }
    }

    private apiResponseErrorCheck(res: Response) {
        if (res.status == 404){
            this.errorElem.innerText = "404 fetch error!";
            this.errorElem.classList.add("error");
        }
        if (!res.ok || res.status != 200) {
            throw new Error(res.ok + ": " + res.status);
        }

        return res.json();
    }

    private fetchData(GETURL: URL) {
        return fetch(GETURL)
                .then((response) => this.apiResponseErrorCheck(response))
                .then((data) => data)
                .catch(e => {
                        console.error(e)}
                    );
    }
    public async apiGET(GETURL: URL) {
        if (this.sendToBrowserCache){
            let dataCachePromise = new Promise((resolve, reject)=> {
                if ('caches' in window) {
                    // Open cache and check for request existing in Cache Storage
                    window.caches.open(this.browserCacheName).then((cache) => {
                        caches.match(GETURL).then((result)=>{
                            if (result === undefined){
                                // Fetch the request normally
                                fetch(GETURL).then((result) => {
                                    // Make a copy of the response since it can only be read once
                                    let clonedresp = result.clone();
        
                                    // Add the result to the cache
                                    cache.put(GETURL, result);
                                    resolve(clonedresp.json().then((text) => text));
                                })
                            }
                            else {
                                resolve(result.json().then((text) => text));
                            }
                        })
                    })
                }
            })
            dataCachePromise.then( (response:any)  => {
                return response;
            });
            return dataCachePromise;
        }
        else {
            let dataPromise = new Promise((resolve, reject)=> {
                resolve(this.fetchData(GETURL))
            })
            dataPromise.then((data) => {
                return data;
            })
            return dataPromise;
        }
        
    }
}
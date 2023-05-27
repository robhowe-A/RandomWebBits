//--Copyright (c) 2023 Robert A. Howell

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
export class apiGET {
  private GETURL: URL;
  private sendToBrowserCache: boolean = false;
  private browserCacheName: string;
  public errorElem: HTMLElement;
  private receivedData: any; //TODO: check if this is needed

  /**
   * This constructor gathers all the needed information for fetch and/or browser
   *  storage.
   *
   * @param GETURL - the (full) url of data request.
   * @param sendToBrowserCache  - Boolean value determining fetch caching.
   * @param browserCacheName - If storing the request in browser cache, this string provides the name for storage.
   * @param errorElem - Should the fetch request fail, return error status to this element.
   */
  constructor(
    GETURL: URL,
    sendToBrowserCache: boolean,
    errorElem: HTMLElement,
    browserCacheName: string | null
  ) {
    this.GETURL = GETURL;
    this.sendToBrowserCache = sendToBrowserCache;
    this.browserCacheName = browserCacheName;
    this.errorElem = errorElem;
  }

  /**
   *
   * @returns this.sendToBrowserCache
   */
  public getSendToBrowserCache() {
    return this.sendToBrowserCache;
  }

  /**
   *
   * @returns this.GETURL
   */
  public getGETURL() {
    return this.GETURL;
  }

  /**
   * Flip this.sendToBrowserCache boolean value from the current value.
   */
  public setSendToBrowserCache() {
    return this.sendToBrowserCache ? false : true;
  }

  /**
   * A fetch request can take URL or string parameter. This function sets the apiGET
   *  object for a URL fetch by creating a URL from the string, or passing the URL.
   * @param GETURL - the (full) url of data request.
   */
  public setGETURL(GETURL: URL | string) {
    if (typeof GETURL === "string") {
      this.GETURL = new URL(GETURL);
    } else {
      this.GETURL = GETURL;
    }
  }

  /**
   * Checks whether the requested response is of valid status 'OK' and '200'
   * @param res - the fetched response.
   * @returns - returns res.json() on success or returns response on failure.
   */
  private apiResponseErrorCheck(res: Response) {
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

  /**
   * The fetch request, returning a fetch promise.
   * @param GETURL - the (full) url of data request.
   * @returns data.text() or data based on the instance returned.
   */
  private fetchData(GETURL: URL) {
    return fetch(GETURL)
      .then((response) => this.apiResponseErrorCheck(response))
      .then((data) => {
        if (data instanceof Response) {
          return data.text();
        } else return data;
      })
      .catch((e: any) => {
        console.log(e);
        this.errorElem.classList.add("error");
        this.errorElem.innerText = `${e.message}`;
      });
  }

  /**
   * A public function creating a data promise object for the called fetch function. If
   *  the request needs added to browser storage, the fetch is made and sent to
   *  storage. A cloned copy of the fetched data is returned and the original request is
   *  sent to the cache. Without sending to browser cache, the fetch is requested and 
   * returned.
   *  
   * @param GETURL - the (full) url of data request.
   * @returns dataCachePromise: Promise<unknown>
   */
  public async apiGET(GETURL: URL) {
    //Check if the request is for cache storage
    if (this.sendToBrowserCache) {
      //The returned data is packages as a Promise object
      let dataCachePromise = new Promise((resolve, reject) => {
        if ("caches" in window) {
          //Open cache and check for request existing in Cache Storage
          window.caches.open(this.browserCacheName).then((cache) => {
            caches.match(GETURL).then((result) => {
              if (result === undefined) {
                //No matches for this request in Storage Cache, so fetch the request normally
                //Upon success, a cloned copy will need to be returned.
                fetch(GETURL).then((result) => {
                  //Copy the response since it can only be read once
                  let clonedresp = result.clone();

                  //Add the result to the cache
                  cache.put(GETURL, result);
                  resolve(clonedresp.json().then(text => text));
                });
              } else {
                //Cache hit success, return the response data
                resolve(result.json().then(text => text));
              }
            });
          })
          .catch(e => {//Cannot open Storage Cache
            console.log(`%cProblem opening Cache Storage. Name: ${this.browserCacheName}`, "color: grey");
            this.sendToBrowserCache = false;
          }).finally(() => {//Attempt raw fetch
            resolve(this.fetchData(GETURL));
            reject(new Error("Promise error on data fetch."))
          });
        }
      });
      //The promise has resolved --> return the promise data
      dataCachePromise.then((response: any) => {
        return response;
      });
      return dataCachePromise;
    } else {
      let dataCachePromise = new Promise((resolve, reject) => {
        resolve(this.fetchData(GETURL));
      });
      dataCachePromise.then((data) => {
        return data;
      });
      return dataCachePromise;
    }
  }
}
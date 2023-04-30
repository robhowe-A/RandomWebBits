//--Copyright (c) Robert A. Howell
export interface localstoragewordcache {
    inCache: boolean,
    word: string,
    wordURL: URL,
    cacheName: string,
}

export interface localstoragetodocache {
    inCache: boolean,
    todoitem: string,
}
//--Copyright (c) 2023 Robert A. Howell

/**
 * Interface used for Local Storage key-value dictionary words
 */
export interface localstoragewordvalue {
    inCache: boolean,
    word: string,
    wordURL: URL,
    cacheName: string,
}

/**
 * Interface used for Local Storage key-values
 */
export interface localstoragetodocache {
    inCache: boolean,
    todoitem: string,
}
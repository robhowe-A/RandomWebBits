//--Copyright (c) Robert A. Howell

export interface localstoragewordvalue {
    inCache: boolean,
    word: string,
    wordURL: URL,
    cacheName: string,
}

export interface localstoragetodocache {
    inCache: boolean,
    todoitem: string,
}
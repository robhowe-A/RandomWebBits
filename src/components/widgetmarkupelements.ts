//--Copyright (c) Robert A. Howell
export interface DictionarySearchElements {
    searchWord: HTMLInputElement;
    wordSearch: HTMLButtonElement;
    dictionaryElem: HTMLElement;
    errorElem: HTMLSpanElement;
    previousWordBtn: HTMLButtonElement;
    refreshBtn: HTMLButtonElement;
}

export interface ToDoListElements {
    todoTable: HTMLTableElement,
    todoTableBody: HTMLElement;
    addButton: HTMLElement;
    addItemToEnter: HTMLInputElement;
}

export interface RWBCardElements {
    cardImg: HTMLImageElement;
    cardImgTop: HTMLDivElement;
    cardBody: HTMLDivElement;
}
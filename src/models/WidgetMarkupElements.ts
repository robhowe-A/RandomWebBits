//--Copyright (c) 2023 Robert A. Howell

/**
 * Interface used for DictionarySearch Elements functionality.
 */
export interface DictionarySearchElements {
    searchWord: HTMLInputElement;
    wordSearch: HTMLButtonElement;
    dictionaryElem: HTMLElement;
    errorElem: HTMLSpanElement;
    previousWordBtn: HTMLButtonElement;
    previousWordsContainer: HTMLDivElement;
    refreshBtn: HTMLButtonElement;
}

/**
 * Interface used for To-Do List elements functionality.
 */
export interface ToDoListElements {
    todoTable: HTMLTableElement,
    todoTableBody: HTMLElement;
    addButton: HTMLElement;
    addItemToEnter: HTMLInputElement;
}

/**
 * Interface used for RWB Card elements functionality.
 */
export interface RWBCardElements {
    cardImg: HTMLImageElement;
    cardImgTop: HTMLDivElement;
    cardBody: HTMLDivElement;
}

//--Copyright (c) 2023 Robert A. Howell

/** Create this object to record reference errors. */
export default class RwbError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;

  constructor() {
    RwbError.count++;
  };

  public static checkElementforNull(
    componentName: string,
    cssQuery: string,
    logMessage?: boolean,
    supressException?: boolean
  ) {
    let elem: HTMLElement | null;
    let logmssg: boolean = true; //Log message option default
    if (!logMessage) logmssg = logMessage;
    let supressexcpt: boolean = false; //Supress message option default
    if (supressException) supressexcpt = true;
    let query: string = `${cssQuery}`;

    // Add dictionary widget if an element with that class is on a page
    try {
      elem = document.querySelector(query);
    } catch {
      Object.create(new RwbReferenceError("GetElement", `Could not get element: '${query}'`));
    }
    if (elem == null) {
      if (logmssg) console.info(`%cNo element found with query: ${query}.`, "color: orange;");
      if (!supressexcpt)
        Object.create(new RwbReferenceError(`${componentName}NullReference`, `Element not found`));
      return true;
    }
    return false;
  };

  public static checkLocalStorageEqualNull(
    componentName: string,
    key: string,
    checkEmptyString?: boolean,
    logMessage?: boolean
  ) {
    let logmssg: boolean = true;
    if (!logMessage) logmssg = logMessage;
    if (localStorage.getItem(`${key}`) == null) {
      if (logmssg) console.info(`%cNo local storage for ${componentName}.`, "color:purple;");
      return true;
    }
    if (checkEmptyString) return RwbError.checkLocalStorageNullorEmpty(componentName, key, logmssg);
  };

  public static checkLocalStorageNullorEmpty(componentName: string, key: string, logMessage?: boolean) {
    let logmssg: boolean = true;
    if (!logMessage) logmssg = logMessage;
    let test: string | null;

    try {
      test = localStorage.getItem(`${key}`);
    } catch {
      throw new Error(`Could get local storage key: ${key}`);
    }
    if (test == null) {
      if (logmssg) console.warn(`%cLocal storage key not found: ${key}.`, "color: yellow;font-weight:bold;");
      Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Key not found`));
      return true;
    }
    if (test == "" || test == "[]") {
      if (logmssg)
        console.warn(`%cLocal storage value is empty for key: ${key}`, "color: yellow;font-weight:bold;");
      Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Value is empty`));
      return true;
    }
    return false;
  };

}

/** Create this object to store reference error data. */
export class RwbReferenceError extends ReferenceError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public page: string;
  private refError: ReferenceError;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.page = window.location.pathname;
    let err = new ReferenceError(this.message);
    this.refError = err;
    console.error(
      `%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.refError,
      "color:red;font-weight:bold;"
    );
    RwbReferenceError.count++;
  };

}

/** Create this object to store syntax error data. */
export class RwbSyntaxError extends SyntaxError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public page: string;
  private syntaxError: SyntaxError;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.page = window.location.pathname;
    let err = new SyntaxError(this.message);
    this.syntaxError = err;
    console.error(
      `%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.syntaxError,
      "color:red;font-weight:bold;"
    );
    RwbSyntaxError.count++;
  };

}

export class RwbDomException extends DOMException {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public stack: any;
  public page: string;
  private domError: DOMException;

  constructor(name: string, message: string, error: any) {
    super();
    this.name = name;
    this.message = message;
    this.stack = error;
    this.page = window.location.pathname;
    let err = new DOMException(this.message);
    this.domError = err;
    console.error(
      `%c<RWB>%cExecution experienced a DOM error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.stack,
      "color:red;font-weight:bold;"
    );
    RwbDomException.count++;
  };
  
}

//--Copyright (c) 2023 Robert A. Howell

/** Create this object to record reference errors. */
export default class RWBErrDomException extends DOMException {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    public name: string;
    public message: string;
    public page: string;
    private domexception: DOMException;

    constructor(name: string, message: string){
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.domexception = new DOMException(this.message);
        RWBErrDomException.count++;

        console.log(this.domexception);
    };
}

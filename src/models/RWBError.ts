//--Copyright (c) 2023 Robert A. Howell

/** Create this object to record reference errors. */
export default class RWBReferenceError extends ReferenceError {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    public name: string;
    public message: string;
    public page: string;
    private referror: ReferenceError;

    constructor(name: string, message: string){
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.referror = new ReferenceError(this.message);
        RWBReferenceError.count++;

        console.log(this.referror);
    };
}

export class RWBSyntaxError extends SyntaxError {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    public name: string;
    public message: string;
    public page: string;
    private referror: SyntaxError;

    constructor(name: string, message: string){
        super();
        this.name = name;
        this.message = message;
        this.page = window.location.pathname;
        this.referror = new SyntaxError(this.message);
        RWBSyntaxError.count++;

        console.log(this.referror);
    };
}
//--Copyright (c) 2023 Robert A. Howell

/** Create this object to record reference errors. */
export default class RWBError {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    constructor(){
        RWBError.count++;
    };
    public static checkElementorNull(componentname:string, classname: string, logmessage?:boolean, supressexception?:boolean ) {
        let elem: HTMLElement | null;
        let logmssg: boolean = true; //Log message option default
        if (!logmessage) logmssg = logmessage;
        let supressexcpt: boolean = false;//Supress message option default
        if (supressexception) supressexcpt = true;
        let query: string = `.${classname}`;

        // Add dictionary widget if an element with that class is on a page
        try{
            elem = document.querySelector(query);
        }
        catch {
            Object.create(new RWBReferenceError("GetElement", `Could not get element: '${query}'`));
        }
        if (elem == null){
            if (logmssg)
                console.log(`%cNo element found with class name: ${query}.`, 'color: yellow;');
            if (!supressexcpt)
                Object.create(new RWBReferenceError(`${componentname}NullReference`, `Element not found`));
            return true;
        }
        return false;
    };

    public static checkLocalStorageEqualNull (componentname: string, key: string, checkemptystring?:boolean, logmessage?:boolean) {
        let logmssg: boolean = true;
        if (!logmessage) logmssg = logmessage;
            if (localStorage.getItem(`${key}`) == null) {
                if (logmssg)
                    console.log(`%cNo local storage for ${componentname}.`, 'color:purple;');
                return true;
            }
            if (checkemptystring)
                return RWBError.checkLocalStorageNullorEmpty(componentname, key, logmssg);
        }

    public static checkLocalStorageNullorEmpty(componentname:string, key:string, logmessage?:boolean){
        let logmssg: boolean = true;
        if (!logmessage) logmssg = logmessage;
        let test: string | null
        
        try{
            test = localStorage.getItem(`${key}`);
        }
        catch {
            throw new Error (`Could get local storage key: ${key}`);
        }
        if (test == null){
            if (logmssg)
                console.log(`%cLocal storage key not found: ${key}.`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBReferenceError(`${componentname}ReferenceException`, `Key not found`));
            return true;
        }
        if (test == "" || test =="[]"){
            if (logmssg)
                console.log(`%cLocal storage value is empty for key: ${key}`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBReferenceError(`${componentname}ReferenceException`, `Value is empty`));
            return true;
        }
        return false;
    }
}

/** Create this object to store reference error data. */
export class RWBReferenceError extends ReferenceError {
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
        try{
            throw new ReferenceError(this.message);
        }
        catch (err){
            this.referror = err;
            console.log(`%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`, 
                'color:red;font-weight:bold;', 'color:red;', err, 'color:red;font-weight:bold;');
        }
        RWBReferenceError.count++;
    };
}

/** Create this object to store syntax error data. */
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
        try{
            throw new SyntaxError(this.message);
        }
        catch (err){
            this.referror = err;
            console.log(`%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`, 
                'color:red;font-weight:bold;', 'color:red;', err, 'color:red;font-weight:bold;');
        }
        RWBSyntaxError.count++;
    };
}

export class RWBDomException extends DOMException {
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
        RWBDomException.count++;

        console.log(this.domexception);
    };
}

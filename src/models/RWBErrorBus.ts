//--Copyright (c) 2023 Robert A. Howell
import RWBErrReferenceError from './RWBErrReferenceError';
import RWBErrDomException from './RWBErrDomException';

/** Create this object to record reference errors. */
export default class RWBErrorBus {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    constructor(){
        RWBErrorBus.count++;
    };
    public static checkElementorNull(componentname:string, classname: string) {
        let elem: HTMLElement | null;
        // Add dictionary widget if an element with that class is on a page
        try{
            elem = document.querySelector(`.${classname}`);
        }
        catch {
            throw new Error (`Could not get element: ${classname}`);
        }
        if (elem == null){
            console.log(`%cNo element found with class name: ${classname}.`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBErrReferenceError(`${componentname}NullReference`, `Element not found`));
            return true;
        }
        return false;
    };

    public static checkLocalStorageEqualNull (componentname: string, key: string, checkemptystring?:boolean, logmessage?:boolean) {
        let test: string | null
            if (localStorage.getItem(`${key}`) == null) {
                if (logmessage)
                    console.log(`%cNo local storage for ${componentname}, continuing.`, 'color:purple;');
                return true;
            }
            if (checkemptystring)
                return RWBErrorBus.checkLocalStorageNullorEmpty(componentname, key, logmessage);
        }

    public static checkLocalStorageNullorEmpty(componentname:string, key:string, logmessage?:boolean){
        let test: string | null
        try{
            test = localStorage.getItem(`${key}`);
        }
        catch {
            throw new Error (`Could get local storage key: ${key}`);
        }
        if (test == null){
            if (logmessage)
                console.log(`%cLocal storage key not found: ${key}.`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBErrReferenceError(`${componentname}ReferenceException`, `Key not found`));
            return true;
        }
        if (test == "" || test =="[]"){
            if (logmessage)
                console.log(`%cLocal storage value is empty for key: ${key}`, 'color: yellow;font-weight:bold;');
            Object.create(new RWBErrReferenceError(`${componentname}ReferenceException`, `Value is empty`));
            return true;
        }
        return false;
    }
}

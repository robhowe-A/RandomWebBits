//--Copyright (c) 2023 Robert A. Howell
import RWBReferenceError from './RWBError';
import { RWBDomException } from './RWBError';

/** Create this object to record reference errors. */
export default class RWBErrorBus {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    constructor(){
        RWBErrorBus.count++;
    };
    public static checkElementorNull(componentname:string, classname: string, logmessage?:boolean, supressexception?:boolean ) {
        let elem: HTMLElement | null;
        let logmssg: boolean = true;
        if (!logmessage) logmssg = logmessage;
        let supressexcpt: boolean = false;
        if (supressexception) supressexcpt = true;

        // Add dictionary widget if an element with that class is on a page
        try{
            elem = document.querySelector(`.${classname}`);
        }
        catch {
            throw new Error (`Could not get element: ${classname}`);
        }
        if (elem == null){
            if (logmssg)
                console.log(`%cNo element found with class name: ${classname}.`, 'color: yellow;');
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
                return RWBErrorBus.checkLocalStorageNullorEmpty(componentname, key, logmssg);
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

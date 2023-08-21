//--Copyright (c) 2023 Robert A. Howell
import RWBReferenceError from '../models/RWBReferenceError'

/** Create this object to record reference errors. */
export default class RWBErrorBus {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    constructor(){
        RWBErrorBus.count++;
    };
    public static checkElementorNull(elemClassName: string) {
        // Add dictionary widget if an element with that class is on a page
        try{
            const elem = document.querySelector(`.${elemClassName}`) as HTMLElement | null;
            if (elem == null){
                console.log(`%cNo element with class name: ${elemClassName}.`, 'color: yellow;font-weight:bold;');
                Object.create(new RWBReferenceError(`ClassComponentNullReference`, `Element not found`));
                return false;
            }
            return true
        }
        catch {
            throw new Error (`Could not get element: ${elemClassName}`);
        }
    };
}

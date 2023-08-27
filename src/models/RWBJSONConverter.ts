//--Copyright (c) 2023 Robert A. Howell
import { RWBSyntaxError } from './RWBErrorBus'

/** An RWBParseJSON parses json and stores the parsed string with the result. */
export class RWBParseJSON {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    private parsestr: string;
    public returnobj: object;
    public passed: boolean;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(parsestr:string){
        RWBParseJSON.count++;
        this.parsestr = parsestr;
        this.passed = this.RWBparseJSON();
    };

    private RWBparseJSON () {
        try{
            this.returnobj = JSON.parse(this.parsestr);
        }
        catch (e) {
            this.returnobj = null;
            new RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
}

/** An RWBParseJSON tests whether an object can be stringified into a valid
 * json string. */
export class RWBStringifyJSON {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    private json: any;
    public returnstr: string;
    public passed: boolean;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(json:any){
        RWBStringifyJSON.count++;
        this.json = json;
        this.passed = this.parseJSON();
    };

    private parseJSON () {
        try{
            this.returnstr = JSON.stringify(this.json);
        }
        catch (e) {
            this.returnstr = null;
            new RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }
}

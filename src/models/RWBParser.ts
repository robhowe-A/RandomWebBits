//--Copyright (c) 2023 Robert A. Howell
import { RWBSyntaxError } from "./RWBError";

/** An RWBParseJSON parses json and stores the parsed string.  */
export default class RWBParseJSON {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    private parsestr: string;
    public returnstr: string;
    public passed: boolean;
    /**Create this object to store parse results and parsed
     * JSON object.
     */
    constructor(parsestr:string){
        RWBParseJSON.count++;
        this.parsestr = parsestr;
        this.passed = this.parseJSON();
    };

    private parseJSON () {
        try{
            this.returnstr = JSON.parse(this.parsestr);
        }
        catch (e) {
            this.returnstr = this.parsestr;
            new RWBSyntaxError("ParseError", e.message);
            return false;
        }
        return true;
    }

}

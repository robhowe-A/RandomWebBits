//--Copyright (c) 2023 Robert A. Howell

/** Create this object to record reference errors. */
export default class RWBParseJSON {
    /**Counts the number of objects instantiated */
    public static count: number = 0;
    private parsestr: string;
    public returnstr: string;
    public passed: boolean;
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
            console.log("Error parsing string: ", e);
            return false;
        }
        return true;
    }

}

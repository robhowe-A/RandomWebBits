//--Copyright (c) 2023 Robert A. Howell
interface ScriptRuntime {
    name: string,
    startMark: PerformanceMark,
    endMark: PerformanceMark,
}

/** Create this object to record performance start and end marks. */
export default class ScriptPerf {
    scriptruntimemarks: ScriptRuntime = {
        name: null,
        startMark: null,
        endMark: null
    };
    public static count: number = 0;

    /** Instantiating a ScriptPerf records the performance start mark. Call SriptPerf.end()
     * to set the end time stamp.
    */
    constructor( scriptname: string){
        this.scriptruntimemarks.name = scriptname;
        this.scriptruntimemarks.startMark = performance.mark(`${this.scriptruntimemarks.name}-start`);
        ScriptPerf.count++;
    }

    public end(){
        this.scriptruntimemarks.endMark = performance.mark(`${this.scriptruntimemarks.name}-end`);
        this.measure();
    }

    /** A console output of this object's performance measurement. */
    private measure(){
        let measure = performance.measure( this.scriptruntimemarks.name, this.scriptruntimemarks.startMark.name, this.scriptruntimemarks.endMark.name)
        return console.log(`${this.scriptruntimemarks.name} execution time is: ${measure.duration}`);
    }
}

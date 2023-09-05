//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from './ToDosWidget';
import DictionaryWidget from './DictionaryWidget';
import RWBPerf from '../models/ScriptPerf';
import RWBError from '../models/RWBErrorBus'

const ClassComponents = {
    init: () => {
        const classperf = new RWBPerf("Classcomponents"); //begin performance measure

        // Add Dictionary Widget if an element with that class is on a page
        if (!RWBError.checkElementorNull("ClassComponent", ".dictionaryWidget", true, true))
        DictionaryWidget.init();
        
        // Add ToDos widget if an element with that class is on a page
        if (!RWBError.checkElementorNull("ClassComponent", ".ToDoList", true, true))
        ToDosWidget.init();
        
        classperf.end(); //end performance measure
    }
}
export default ClassComponents;

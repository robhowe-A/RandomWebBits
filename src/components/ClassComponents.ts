//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from './ToDos';
import DictionaryWidget from './DictionaryWidget';
import RWBPerf from '../models/ScriptPerf';
import RWBError from '../models/RWBErrorBus'

const ClassComponents = {
    initDictionary: () => {
        const classperf = new RWBPerf("Classcomponents"); //begin performance measure

        if (RWBError.checkElementorNull("ClassComponent", "dictionaryWidget", true, true)) return;
        DictionaryWidget.init();

        classperf.end(); //end performance measure
    },
    initToDo: () => {
        
        // Add ToDos widget if an element with that class is on a page
        if (RWBError.checkElementorNull("ClassComponent", "ToDoList", true, true)) return;
        ToDosWidget.init();
        
    }
}
export default ClassComponents;

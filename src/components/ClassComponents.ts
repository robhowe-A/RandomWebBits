//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from './ToDosWidget';
import DictionaryWidget from './DictionaryWidget';
import notfound404widget from './404';
import RWBPerf from '../models/ScriptPerf';
import RWBError from '../models/RWBErrorBus'

const ClassComponents = {
    init: (page: string) => {
        const classperf = new RWBPerf("Classcomponents"); //begin performance measure

        // Add Dictionary Widget if an element with that class is on a page
        if (page == "/pages/dictionaryword.html" || 
            page == "/index.html" || page == "/" || page == ""){
            if (RWBError.checkElementforNull("ClassComponent", ".dictionaryWidget", true, true)) return;
            DictionaryWidget.init();
        }
        
        if (page == "/pages/todos.html" || 
            page == "/index.html" || page == "/" || page == ""){
            // Add ToDos widget if an element with that class is on a page
            if (RWBError.checkElementforNull("ClassComponent", ".ToDoList", true, true)) return;
            ToDosWidget.init();
        }
        
        classperf.end(); //end performance measure
    },
    fourohfour: () => {
        if (!RWBError.checkElementforNull('PageComponents', '#Four-Oh-Four', false, true)){
            notfound404widget.init();
        }
    }
}
export default ClassComponents;

//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from './ToDos';
import DictionaryWidget from './DictionaryWidget';
import RWBPerf from '../models/ScriptPerf';

const ClassComponents = {
    init: () => {
        const classperf = new RWBPerf("Classcomponents"); //begin performance measure

        // Add dictionary widget if an element with that class is on a page
        const dictionaryElement = document.querySelector(".dictionaryWidget");
        if (dictionaryElement != null) {
            DictionaryWidget.init(dictionaryElement);
        }

        // Add ToDos widget if an element with that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        if (toDosElement != null)
            ToDosWidget.init(toDosElement);
        
        classperf.end(); //end performance measure
    }
}
export default ClassComponents;

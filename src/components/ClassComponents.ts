//--Copyright (c) 2023 Robert A. Howell
import ToDosWidget from './ToDos';
import DictionaryWidget from './DictionaryWidget';
import RWBPerf from '../models/ScriptPerf';

const ClassComponents = {
    initDictionary: () => {
        const classperf = new RWBPerf("Classcomponents"); //begin performance measure

        const dictionaryWidgetStartingElement = document.querySelector(".dictionaryWidget");
        DictionaryWidget.init(dictionaryWidgetStartingElement);

        classperf.end(); //end performance measure
    },
    initToDo: () => {
        
        // Add ToDos widget if an element with that class is on a page
        const toDosElement = document.querySelector(".ToDoList");
        ToDosWidget.init(toDosElement);
        
    }
}
export default ClassComponents;

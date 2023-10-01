//--Copyright (c) 2023 Robert A. Howell
import { ToDoList } from "../models/ToDo";
import RWBError from "../models/RWBErrorBus";

/**
 * Component containing the To-Do List widget's creation.
 */
const ToDosWidget = {
    /**
     * Create a To-Do List widget.
     * @param elem - Element containing 'ToDoList' class
     */
    init: () => {

        let toDosElement: Element;
        toDosElement = document.querySelector(".ToDoList");

        //ToDoList object
        const todoWidget = new ToDoList();

        //Creates widget markup and populates To-Do tasks contained in Local Storage
        todoWidget.createToDoListWidget(toDosElement);
    }
};

export default ToDosWidget;

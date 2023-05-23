//--Copyright (c) 2023 Robert A. Howell
import { ToDoList } from "../models/ToDo";

/**
 * Component containing the To-Do List widget's creation.
 */
const ToDosWidget = {
    /**
     * Create a To-Do List widget.
     * @param elem - Element containing 'ToDoList' class
     */
    init: (elem: Element) => {

        // ToDoList constructor
        const todoWidget = new ToDoList();

        // Creates the markup needed and imports data from local storage, containing the todo items
        todoWidget.createToDoListWidget(elem);
    }
};

export default ToDosWidget;

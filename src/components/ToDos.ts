//--Copyright (c) Robert A. Howell
import { ToDoList } from "../models/ToDo"

const ToDosWidget = {
    init: (elem: Element) => {

        // Create the to-do widget, call create
        const todoWidget = new ToDoList();

        // Creates the markup needed and imports data from local storage, containing the todo items
        todoWidget.createToDoListWidget(elem);
    }
};

export default ToDosWidget;

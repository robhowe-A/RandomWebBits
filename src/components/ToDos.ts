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
    init: () => {

        let toDosElement: Element;
        try{
            toDosElement = document.querySelector(".ToDoList");
        }
        catch (err){
            console.log("%cCould not query todo list widget element.", "color:orange;")
        }

        //ToDoList object
        const todoWidget = new ToDoList();

        //Creates widget markup and populates To-Do tasks contained in Local Storage
        todoWidget.createToDoListWidget(toDosElement);
    }
};

export default ToDosWidget;

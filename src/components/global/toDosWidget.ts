//--Copyright (c) 2023 Robert A. Howell
import { ToDoList } from "../../models/toDo";

/**
 * Component containing the To-Do List widget's creation.
 */
const toDosWidget = {
  /**
   * Create a To-Do List widget.
   * @param elem - Element containing 'ToDoList' class
   */
  init: () => {
    let toDosElement: Element;
    toDosElement = document.querySelector(".ToDoList");

    //ToDoList object
    const toDoWidget = new ToDoList();

    //Creates widget markup and populates To-Do tasks contained in Local Storage
    toDoWidget.createToDoListWidget(toDosElement);
  },
};

export default toDosWidget;

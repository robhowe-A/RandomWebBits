//--Copyright (c) Robert A. Howell

class ToDoWidget {
    public static todosInLocalStorage: string = localStorage.getItem('ToDos');
    public static isTodosInLocalStorage: boolean = this.todosInLocalStorage != null ? true : false;
}

interface ToDo {
    ToDoItem: string;
}

const todosWidget = {
    init: (elem: Element) => {
        // Creates the markup needed and imports data from local storage, containing the todo items
        todosWidget.toDosListSection.createToDoListWidget(elem);
    },
    toDosListSection: {
        ToDOs: 0,

        createSampleTo_Do: (tbody: Element) => {
            if (!ToDoWidget.isTodosInLocalStorage) {
                // Create a sample entry in the ToDo table as a placeholder
                const tr2 = tbody.appendChild(document.createElement('tr'));
                const td2left = tr2.appendChild(document.createElement('td'));
                const td2IN = td2left.appendChild(document.createElement('input'));
                const td2middle = tr2.appendChild(document.createElement('td'));
                const td2right = tr2.appendChild(document.createElement('td'));
                const td2DEL = td2right.appendChild(document.createElement('input'));

                // Add attributes and property values
                td2IN.setAttribute("aria-label", "Checkbox");
                td2middle.setAttribute("num", `${1}`);
                td2IN.setAttribute("aria-label", "Delete");
                td2DEL.setAttribute("type", "reset");
                td2DEL.setAttribute("value", "Delete");
                td2IN.type = "checkbox";
                td2middle.textContent = "Add a ToDO Item.";
                todosWidget.toDosListSection.ToDOs++;

                //"delete" event listener
                td2DEL.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(td2DEL) });
            }
        },
        AddToDoRow: (description: string, firstPaint: boolean) => {
            //Create a table row with checkbox and delete options
            const TABLEITEM = document.getElementById('ToDoItems'); //TODO: class element
            if (TABLEITEM != null) {
                const tableFrag = document.createDocumentFragment();
                const newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
                const firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
                const checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
                const newITEM = newRow.appendChild(document.createElement('td')); //Table second data
                const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
                const delBOX = secondCOL.appendChild(document.createElement('input')) //Add deletebox

                // Add attributes and property values
                checkBOX.setAttribute('type', 'checkbox');
                checkBOX.setAttribute('aria-label', 'Checkbox');
                checkBOX.setAttribute('aria-label', 'Delete');
                newITEM.setAttribute('num', todosWidget.toDosListSection.ToDOs ? (() => {
                    let elem = document.querySelector('#ToDO td[num]');
                    return ((Number(elem?.getAttribute("num")) || -1000) + todosWidget.toDosListSection.ToDOs).toString();
                })() : (1).toString());
                newITEM.textContent = description.toString(); //Populate second col
                todosWidget.toDosListSection.ToDOs++; //Number of Items
                delBOX.setAttribute('type', 'submit');
                delBOX.setAttribute('value', 'Delete');

                // Add the row to the ToDos table
                TABLEITEM.appendChild(tableFrag);

                //add an event listener for when 'delete' is clicked
                delBOX.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(delBOX); }); //TODO: event listener here?

                if (firstPaint) {
                    //add to list storage
                    todosWidget.toDoListStorage.addtoDoToStorage(description);
                }
            }
            else {
                try {
                    throw new Error("There were no 'ToDoItems' found or they are null.");
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }

        },
        DeleteButton: (box: HTMLInputElement) => {
            if (box.parentNode != null && box.parentNode.previousSibling != null &&
                box.parentNode.previousSibling.previousSibling != null) {

                let rowChkBx = <HTMLElement>box.parentNode.previousSibling.previousSibling;
                let rowChkBxIN = <HTMLInputElement>rowChkBx.childNodes[0];
                const table = document.querySelector('table'); //TODO: class element
                if (table != null) {
                    let tr: HTMLTableRowElement = <HTMLTableRowElement>box.parentNode.parentNode;
                    let i = tr.rowIndex;
                    let value = box.parentNode.previousSibling.textContent;
                    if (rowChkBxIN.checked) {
                        //remove row since completed
                        table.deleteRow(i);

                        if (value != 'Add a ToDO Item.') {
                            todosWidget.toDosListSection.ToDOs--;

                            //delete associated storage item
                            todosWidget.toDoListStorage.removetoDoFromStorage(value);
                        }
                        console.log("Done.");
                    }
                    else {
                        table.deleteRow(i);
                        todosWidget.toDosListSection.ToDOs--;
                    }
                }
                else {
                    try {
                        throw new Error("'table' element not found or it is null.");
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.log(error.name);
                            console.log(error.message);
                            console.log(error.stack);
                        }
                    }
                }
            }
        },
        addToDoEventListeners: () => {
            const ADDBUTTON = document.getElementById('AddButton');
            const ADDITEMENTER: HTMLInputElement = document.querySelector('input[name="itemINPUT"]')!;
            if (ADDBUTTON != null && ADDITEMENTER != null) {
                ADDBUTTON.addEventListener("click", () => {
                    todosWidget.toDosListSection.AddToDoRow(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                });

                ADDITEMENTER.addEventListener("keydown", (e) => {
                    if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                        todosWidget.toDosListSection.AddToDoRow(ADDITEMENTER.value, true);
                        ADDITEMENTER.value = '';
                    }
                });
            }
            else {
                try {
                    throw new Error("Element was not found or is null");
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }
        },
        populateToDoList: () => {
            //retrieve todo items in local storage and add each to the list
            let parsedToDos: any;
            if (ToDoWidget.isTodosInLocalStorage) {
                parsedToDos = JSON.parse(ToDoWidget.todosInLocalStorage);
                for (let i = 0; i < parsedToDos.length; i++) {
                    todosWidget.toDosListSection.AddToDoRow(parsedToDos[i].ToDoItem, false);
                }
            }
        },
        createToDoListWidget: (elem: Element) => {
            // Insert the widget after the passed in "elem"
            // Dependent on the page, todo widget may have pre-existing markup in place
            // Switch against the current page to determine markup needed
            if (elem !== undefined) {
                if (elem.classList.contains("ToDoList")) {
                    switch (window.location.pathname) {
                        case '/RandomWebBits/':
                        case '/RandomWebBits/index.html':
                        case '/index.html':
                        case '/':
                        case '/dist/index.html':
                            // Create table elements needed for the todo list
                            const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                            const header = todolistSection.appendChild(document.createElement('h3'));
                            const div = todolistSection.appendChild(document.createElement('div'));
                            const table = div.appendChild(document.createElement('table'));
                            const thead = table.appendChild(document.createElement('thead'));
                            const tr1 = thead.appendChild(document.createElement('tr'));
                            const thleft = tr1.appendChild(document.createElement('th'));
                            const thmiddle = tr1.appendChild(document.createElement('th'));
                            const tbody = table.appendChild(document.createElement('tbody'));
                            const tfoot = table.appendChild(document.createElement('tfoot'));
                            const tr3 = tfoot.appendChild(document.createElement('tr'));
                            const td3left = tr3.appendChild(document.createElement('td'));
                            const td3IN = td3left.appendChild(document.createElement('input'));
                            const td3middle = tr3.appendChild(document.createElement('td'));
                            const INPUT = td3middle.appendChild(document.createElement('input'));

                            // Add attributes and property values
                            table.appendChild(document.createElement('tfoot'));
                            td3IN.setAttribute("aria-label", "Add");
                            td3IN.setAttribute("Value", "Add");
                            INPUT.setAttribute("name", "itemINPUT");
                            INPUT.setAttribute("type", "text");
                            INPUT.setAttribute("aria-label", "Input");
                            header.textContent = "To-Do:";
                            todolistSection.id = "ToDO";
                            thleft.textContent = "Complete?";
                            thmiddle.textContent = "Description";
                            tbody.id = "ToDoItems";
                            td3IN.id = "AddButton";
                            td3IN.type = "button";

                            // Create a sample to do item (it is not stored in cache)
                            todosWidget.toDosListSection.createSampleTo_Do(tbody);

                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();

                            break;
                        case '/RandomWebBits/pages/todos.html':
                        case '/pages/todos.html':
                            // Markup exists on the page already
                            // Create a sample to do item (it is not stored in cache)
                            const htbody = document.querySelector("#ToDoItems");
                            if (htbody != null) {
                                todosWidget.toDosListSection.createSampleTo_Do(htbody);
                            }
                            else {
                                try {
                                    throw new Error("'ToDoItems' element was not found or is null");
                                }
                                catch (error) {
                                    if (error instanceof Error) {
                                        console.log(error.name);
                                        console.log(error.message);
                                        console.log(error.stack);
                                    }
                                }
                            }

                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();

                            break;
                        default:
                            console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.")
                    }
                }
                else {
                    console.log(`Add "ToDoList" class to ${elem.nodeName} node.`)
                }
            }
            else {
                console.log(`There is no "ToDoList" class on this page.`)
            }
        }
    },
    toDoListStorage: {

        addtoDoToStorage: (description: string) => {

            let ToDo: ToDo = {
                ToDoItem: description,
            }
            //add the ToDos to local cache
            try {
                if (!ToDoWidget.isTodosInLocalStorage) {
                    let todos: ToDo[] = [];
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
                else {
                    if (!ToDoWidget.isTodosInLocalStorage) {
                        try {
                            throw new Error("Local storage values null.");
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.log(error.name);
                                console.log(error.message);
                                console.log(error.stack);
                            }
                        }
                    }
                    else {
                        let todos: ToDo[] = JSON.parse(localStorage.getItem('ToDos'));
                        todos.push(ToDo);
                        localStorage.setItem('ToDos', JSON.stringify(todos));
                    }
                }
            }
            catch (err) {
                console.log("Problem storing To-do list item: ", err);
            }
        },
        removetoDoFromStorage: (item: string) => {
            if (!ToDoWidget.isTodosInLocalStorage) {
                try {
                    throw new Error("Local storage values null.");
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }
            else {
                let todos: ToDo[] = JSON.parse(localStorage.getItem('ToDos'));
                todos = todos.filter((todo) => todo.ToDoItem !== item);
                if (todos.length > 0)
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                else
                    localStorage.removeItem('ToDos');
            }
        }
    }

};

export default todosWidget;

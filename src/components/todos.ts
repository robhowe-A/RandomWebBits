//--Copyright (c) Robert A. Howell
import { ToDoListElements } from "./widgetmarkupelements";
import { localstoragetodocache } from "./localstoragecaches";

class ToDoWidget {
    public static todosInLocalStorage: boolean = false;
    public static ToDOs: number = 0;
    private static ToDoElements: ToDoListElements;

    public static setToDoListElements(ToDoListElements: ToDoListElements) {
        ToDoWidget.ToDoElements = ToDoListElements;
    }

    private getToDoListElements() {
        let ToDoElements: ToDoListElements = {
            todoTable: document.querySelector('#ToDO table'),
            todoTableBody: document.getElementById('ToDoItems'),
            addButton: document.getElementById('AddButton'),
            addItemToEnter: document.querySelector('input[name="itemINPUT"]'),
        }
        return ToDoElements;
    }

    public createToDoListWidget(elem: Element) {
        
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
                        this.createSampleTo_Do(tbody);

                        // With the elements created, set the class list elements
                        let listElements:ToDoListElements = this.getToDoListElements();
                        ToDoWidget.setToDoListElements(listElements);

                        this.populateToDoList();
                        this.addToDoEventListeners();


                        break;
                    case '/RandomWebBits/pages/todos.html':
                    case '/pages/todos.html':
                        // Markup exists on the page already
                        // With the elements created, set the class list elements
                        let listElementsPages:ToDoListElements = this.getToDoListElements();
                        ToDoWidget.setToDoListElements(listElementsPages);

                        // Create a sample to do item (it is not stored in cache)
                        const htbody = ToDoWidget.ToDoElements.todoTableBody;
                        if (htbody != null) {
                            this.createSampleTo_Do(htbody);
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

                        this.populateToDoList();
                        this.addToDoEventListeners();

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

    private static isToDoInStorage() {
        let todos: localstoragetodocache[] = JSON.parse(localStorage.getItem('ToDos'));
        if (todos == null) {
            return false
        }
        else return true
    }

    private addtoDoToStorage(description: string) {

        let ToDo: localstoragetodocache = {
            inCache: false,
            todoitem: description,
        }
        let ToDos: any = [];
        ToDos.push(ToDo);
        //add the ToDos to local cache
        let todos: localstoragetodocache[] = JSON.parse(localStorage.getItem('ToDos'));
        try {
            if (todos == null) {
                localStorage.setItem('ToDos', JSON.stringify(ToDos));
                ToDoWidget.todosInLocalStorage = true;
            }
            else {
                todos.push(ToDo);
                localStorage.setItem('ToDos', JSON.stringify(todos));
            }
        }
        catch (err) {
            console.log("Problem storing To-do list item: ", err);
        }
    }

    private removetoDoFromStorage(item: string) {
        if (!ToDoWidget.isToDoInStorage()) {
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
            let todos: localstoragetodocache[] = JSON.parse(localStorage.getItem('ToDos'));
            todos = todos.filter((todo) => todo.todoitem !== item);
            if (todos.length > 0)
                localStorage.setItem('ToDos', JSON.stringify(todos));
            else
                localStorage.removeItem('ToDos');
        }
    }

    private AddToDoRow(description: string, firstPaint: boolean) {
        //Create a table row with checkbox and delete options
        const TABLEITEM = ToDoWidget.ToDoElements.todoTable;
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
            newITEM.setAttribute('num', ToDoWidget.ToDOs ? (() => {
                let elem = document.querySelector('#ToDO td[num]');
                return ((Number(elem?.getAttribute("num")) || -1000) + ToDoWidget.ToDOs).toString();
            })() : (1).toString());
            newITEM.textContent = description.toString(); //Populate second col
            ToDoWidget.ToDOs++; //Number of Items
            delBOX.setAttribute('type', 'submit');
            delBOX.setAttribute('value', 'Delete');

            // Add the row to the ToDos table
            TABLEITEM.appendChild(tableFrag);

            //add an event listener for when 'delete' is clicked
            delBOX.addEventListener("click", () => { this.DeleteButton(delBOX); });

            if (firstPaint) {
                //add to list storage
                this.addtoDoToStorage(description);
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

    }

    private populateToDoList() {
        //retrieve todo items in local storage and add each to the list
        let parsedToDos: localstoragetodocache[] = JSON.parse(localStorage.getItem('ToDos'));

        if (parsedToDos != null) {
            for (let i = 0; i < parsedToDos.length; i++) {
                this.AddToDoRow(parsedToDos[i].todoitem, false);
            }
        }
    }

    private addToDoEventListeners() {
        const ADDBUTTON = ToDoWidget.ToDoElements.addButton;
        const ADDITEMENTER = ToDoWidget.ToDoElements.addItemToEnter;
        if (ADDBUTTON != null && ADDITEMENTER != null) {
            ADDBUTTON.addEventListener("click", () => {
                this.AddToDoRow(ADDITEMENTER.value, true);
                ADDITEMENTER.value = '';
            });

            ADDITEMENTER.addEventListener("keydown", (e) => {
                if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                    this.AddToDoRow(ADDITEMENTER.value, true);
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
    }

    private DeleteButton(box: HTMLInputElement) {
        if (box.parentNode != null && box.parentNode.previousSibling != null &&
            box.parentNode.previousSibling.previousSibling != null) {

            let rowChkBx = <HTMLElement>box.parentNode.previousSibling.previousSibling;
            let rowChkBxIN = <HTMLInputElement>rowChkBx.childNodes[0];
            const todoTable: HTMLTableElement = ToDoWidget.ToDoElements.todoTable;
            if (todoTable != null) {
                let tr: HTMLTableRowElement = <HTMLTableRowElement>box.parentNode.parentNode;
                let i = tr.rowIndex;
                let value = box.parentNode.previousSibling.textContent;
                if (rowChkBxIN.checked) {
                    //remove row since completed
                    todoTable.deleteRow(i);

                    if (value != 'Add a ToDO Item.') {
                        ToDoWidget.ToDOs--;

                        //delete associated storage item
                        this.removetoDoFromStorage(value);
                    }
                }
                else {
                    todoTable.deleteRow(i);
                    ToDoWidget.ToDOs--;
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
    }

    private createSampleTo_Do(tbody: Element) {
        if (!ToDoWidget.isToDoInStorage()) {
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
            ToDoWidget.ToDOs++;

            //"delete" event listener
            td2DEL.addEventListener("click", () => { this.DeleteButton(td2DEL) });
        }
    }
}

const todosWidget = {
    init: (elem: Element) => {

        // Create the to-do widget, call create
        const todoWidget = new ToDoWidget();

        // Creates the markup needed and imports data from local storage, containing the todo items
        todoWidget.createToDoListWidget(elem);
    }
};

export default todosWidget;

//--Copyright (c) Robert A. Howell

interface ToDo  {
    ToDoItem: string;
}

const todosWidget = {
    init: (elem) => {
        todosWidget.toDosListSection.createToDoListWidget(elem);
    },
    toDosListSection: {
        ToDOs: 0,

        createSampleTo_Do: (tbody: Element) => {
            if (localStorage.getItem('ToDos') == null) {
                const tr2 = tbody.appendChild(document.createElement('tr'));
                const td2left = tr2.appendChild(document.createElement('td'));
                const td2IN = td2left.appendChild(document.createElement('input'));
                td2IN.type = "checkbox";
                td2IN.setAttribute("aria-label", "Checkbox");
                const td2middle = tr2.appendChild(document.createElement('td'));
                td2middle.setAttribute("num", `${1}`);
                todosWidget.toDosListSection.ToDOs++;
                td2middle.textContent = "Add a ToDO Item."
                const td2right = tr2.appendChild(document.createElement('td'));
                const td2DEL = td2right.appendChild(document.createElement('input'));
                td2IN.setAttribute("aria-label", "Delete");
                td2DEL.setAttribute("type", "reset");
                td2DEL.setAttribute("value", "Delete");

                //"delete" event listener
                td2DEL.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(td2DEL) });
            }
        },
        AddToDo: (description: string, firstPaint: boolean) => {
            //after "Add" is clicked, insert new table row
            const TABLEITEM = document.getElementById('ToDoItems');
            if (TABLEITEM != null){
                const tableFrag = document.createDocumentFragment();
                const newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
                const firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
                const checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
                checkBOX.setAttribute('type', 'checkbox');
                checkBOX.setAttribute('aria-label', 'Checkbox');
                const newITEM = newRow.appendChild(document.createElement('td')); //Table second data
                newITEM.textContent = description.toString(); //Populate second col
                newITEM.setAttribute('num', todosWidget.toDosListSection.ToDOs ? (() => {
                    let elem = document.querySelector('#ToDO td[num]');
                    return ((Number(elem?.getAttribute("num")) || -1000) + todosWidget.toDosListSection.ToDOs).toString();
                })() : (1).toString());
                todosWidget.toDosListSection.ToDOs++; //Number of Items
                const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
                const delBOX = secondCOL.appendChild(document.createElement('input')) //Add deletebox
                delBOX.setAttribute('type', 'submit');
                delBOX.setAttribute('value', 'Delete');
                checkBOX.setAttribute('aria-label', 'Delete');
                TABLEITEM.appendChild(tableFrag);
                //"delete" event listener
                delBOX.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(delBOX); });
    
                if (firstPaint) {
                    //add to list storage
                    todosWidget.toDoListStorage.addtoDoToStorage(description);
                }
            }
            else {
                try {
                    throw new Error("There were no 'ToDoItems' found or they are null.");
                }
                catch (error){
                    if (error instanceof Error){
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }

        },
        DeleteButton: (box: HTMLInputElement) => {
            if (box.parentNode != null && box.parentNode.previousSibling != null &&
                    box.parentNode.previousSibling.previousSibling != null){

                let rowChkBx = <HTMLElement>box.parentNode.previousSibling.previousSibling;
                let rowChkBxIN = <HTMLInputElement> rowChkBx.childNodes[0];
                const table = document.querySelector('table');
                if(table != null){
                    let tr: HTMLTableRowElement = <HTMLTableRowElement>box.parentNode.parentNode;
                    let i = tr.rowIndex;
                    let value = box.parentNode.previousSibling.textContent;
                    if (rowChkBxIN.checked) {
                        //remove row since completed
                        table.deleteRow(i);

                        if (value != 'Add a ToDO Item.'){
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
                    catch (error){
                        if (error instanceof Error){
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
            if(ADDBUTTON != null && ADDITEMENTER != null){
                ADDBUTTON.addEventListener("click", () => {
                    todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                });

                ADDITEMENTER.addEventListener("keydown", (e) => { 
                    if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                        todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                        ADDITEMENTER.value = '';
                    }
                });
            }
            else {
                try {
                    throw new Error("Element was not found or is null");
                }
                catch (error){
                    if (error instanceof Error){
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }
        },
        populateToDoList: () => {
            //retrieve Storage, add if missing
            let storageToDos = todosWidget.toDoListStorage.getAlltoDoFromStorage();
            if (storageToDos.length > 0) {
                for (let i = 0; i < storageToDos.length; i++) {
                    todosWidget.toDosListSection.AddToDo(storageToDos[i].ToDoItem, false);
                }
            }
        },
        createToDoListWidget: (elem) => {
            if (elem !== undefined) { //insert the widget after the passed in "elem"
                if (elem.classList.contains("ToDoList")) {
                    switch (window.location.pathname) {
                        case '/RandomWebBits/':
                        case '/RandomWebBits/index.html':
                        case '/index.html':
                        case '/':
                        case '/dist/index.html':
                            const todolistSection = elem.insertAdjacentElement("afterend", document.createElement("section"));
                            const header = todolistSection.appendChild(document.createElement('h3'));
                            header.textContent = "To-Do:";
                            todolistSection.id = "ToDO";
                            const div = todolistSection.appendChild(document.createElement('div'));
                            const table = div.appendChild(document.createElement('table'));
                            const thead = table.appendChild(document.createElement('thead'));
                            const tr1 = thead.appendChild(document.createElement('tr'));
                            const thleft = tr1.appendChild(document.createElement('th'));
                            thleft.textContent = "Complete?";
                            const thmiddle = tr1.appendChild(document.createElement('th'));
                            thmiddle.textContent = "Description";
                            const tbody = table.appendChild(document.createElement('tbody'));
                            tbody.id = "ToDoItems";
                            todosWidget.toDosListSection.createSampleTo_Do(tbody);
                            const tfoot = table.appendChild(document.createElement('tfoot'));
                            const tr3 = tfoot.appendChild(document.createElement('tr'));
                            const td3left = tr3.appendChild(document.createElement('td'));
                            const td3IN = td3left.appendChild(document.createElement('input'));
                            td3IN.id = "AddButton";
                            td3IN.type = "button";
                            td3IN.setAttribute("aria-label", "Add");
                            td3IN.setAttribute("Value", "Add");
                            const td3middle = tr3.appendChild(document.createElement('td'));
                            const INPUT = td3middle.appendChild(document.createElement('input'));
                            INPUT.setAttribute("name", "itemINPUT");
                            INPUT.setAttribute("type", "text");
                            INPUT.setAttribute("aria-label", "Input");
                            table.appendChild(document.createElement('tfoot'));

                            todosWidget.toDosListSection.populateToDoList();
                            todosWidget.toDosListSection.addToDoEventListeners();

                            break;
                        case '/RandomWebBits/pages/todos.html':
                        case '/pages/todos.html':
                            const htbody = document.querySelector("#ToDoItems");
                            if (htbody != null){
                                todosWidget.toDosListSection.createSampleTo_Do(htbody);
                            }
                            else {
                                try {
                                    throw new Error("'ToDoItems' element was not found or is null");
                                }
                                catch (error){
                                    if (error instanceof Error){
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
        getAlltoDoFromStorage: () => {
            let values = localStorage.getItem('ToDos');
            return values ? JSON.parse(values) : [];
        },
        addtoDoToStorage: (description: string) => {
            
            let ToDo: ToDo =  {
                ToDoItem: description,
            }
            //add the ToDos to local cache
            try {
                if (localStorage.getItem('ToDos') == null) {
                    let todos: ToDo[] = [];
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
                else {
                    let storageStr = localStorage.getItem('ToDos');
                    if (storageStr == null)
                    {
                        try {
                            throw new Error("Local storage values null.");
                        }
                        catch (error){
                            if (error instanceof Error){
                                console.log(error.name);
                                console.log(error.message);
                                console.log(error.stack);
                            }
                        }
                    }
                    else{
                        let todos: ToDo[] = JSON.parse(storageStr);
                        todos.push(ToDo);
                        localStorage.setItem('ToDos', JSON.stringify(todos));
                    }
                }
            }
            catch (err) {
                console.log("Problem storing To-do list item: ", err);
            }
        },
        removetoDoFromStorage: (item) => {
            let storageStr = localStorage.getItem('ToDos');
            if (storageStr == null)
            {
                try {
                    throw new Error("Local storage values null.");
                }
                catch (error){
                    if (error instanceof Error){
                        console.log(error.name);
                        console.log(error.message);
                        console.log(error.stack);
                    }
                }
            }
            else {
                let todos: ToDo[] = JSON.parse(storageStr);
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

//--Copyright (c) Robert A. Howell

const todosWidget = {
    init: (elem) => {
        todosWidget.toDosListSection.createToDoListWidget(elem);
    },
    toDosListSection: {
        ToDOs: 0,
        createSampleTo_Do: (tbody) => {
            if (localStorage.getItem('ToDos') == null) {
                const tr2 = tbody.appendChild(document.createElement('tr'));
                const td2left = tr2.appendChild(document.createElement('td'));
                const td2IN = td2left.appendChild(document.createElement('input'));
                td2IN.type = "checkbox";
                td2IN.setAttribute("aria-label", "Checkbox");
                const td2middle = tr2.appendChild(document.createElement('td'));
                td2middle.setAttribute("num", 1);
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
                            todosWidget.toDosListSection.createSampleTo_Do(htbody);

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
        },
        AddToDo: (description, firstPaint) => {
            //after "Add" is clicked, insert new table row
            const TABLEITEMS = document.getElementById('ToDoItems');
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
                return Number(elem.getAttribute("num")) + todosWidget.toDosListSection.ToDOs;
            })() : 1);
            todosWidget.toDosListSection.ToDOs++; //Number of Items
            const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
            const delBOX = secondCOL.appendChild(document.createElement('input')) //Add deletebox
            delBOX.setAttribute('type', 'submit');
            delBOX.setAttribute('value', 'Delete');
            checkBOX.setAttribute('aria-label', 'Delete');

            TABLEITEMS.appendChild(tableFrag);

            //"delete" event listener
            delBOX.addEventListener("click", () => { todosWidget.toDosListSection.DeleteButton(delBOX); });

            if (firstPaint) {
                //add to list storage
                todosWidget.toDoListStorage.addtoDoToStorage(description);
            }
        },
        DeleteButton: (box) => {
            let rowChkBx = box.parentNode.previousElementSibling.previousElementSibling;
            let rowChkBxIN = rowChkBx.childNodes[0];

            if (rowChkBxIN.checked) {
                //remove row
                let i = box.parentNode.parentNode.rowIndex;
                let value = box.parentNode.previousSibling.textContent;
                document.querySelector('table').deleteRow(i);
                todosWidget.toDosListSection.ToDOs--;

                //remove storage item
                todosWidget.toDoListStorage.removetoDoFromStorage(value);
            }
            else {
                var i = box.parentNode.parentNode.rowIndex;
                document.querySelector('table').deleteRow(i);
                todosWidget.toDosListSection.ToDOs--;
            }
        },
        addToDoEventListeners: () => {
            const ADDBUTTON = document.getElementById('AddButton');
            const ADDITEMENTER = document.querySelector('input[name="itemINPUT"]');

            ADDBUTTON.addEventListener("click", () => {
                todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                ADDITEMENTER.value = '';
            });

            ADDITEMENTER.addEventListener("keypress", (event) => {
                if (event.key === 'Enter') {
                    todosWidget.toDosListSection.AddToDo(ADDITEMENTER.value, true);
                    ADDITEMENTER.value = '';
                }
            });
        },
        populateToDoList: () => {
            //retrieve Storage, add if missing
            let storageToDos = todosWidget.toDoListStorage.getAlltoDoFromStorage();
            if (storageToDos) {
                for (let i = 0; i < storageToDos.length; i++) {
                    todosWidget.toDosListSection.AddToDo(storageToDos[i].ToDoItem, false);
                }
            }
        }
    },
    toDoListStorage: {
        getAlltoDoFromStorage: () => {
            let values = JSON.parse(localStorage.getItem('ToDos'));
            return values;
        },
        addtoDoToStorage: (description) => {
            let ToDo = {
                ToDoItem: description
            }
            //add the ToDos to local cache
            try {
                if (localStorage.getItem('ToDos') == null) {
                    let todos = [];
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
                else {
                    let todos = JSON.parse(localStorage.getItem('ToDos'));
                    todos.push(ToDo);
                    localStorage.setItem('ToDos', JSON.stringify(todos));
                }
            }
            catch (err) {
                console.log("Problem storing To-do list item: ", err);
            }
        },
        removetoDoFromStorage: (item) => {
            let todos = JSON.parse(localStorage.getItem('ToDos'));
            todos = todos.filter((todo) => todo.ToDoItem !== item);
            if (todos.length > 0)
                localStorage.setItem('ToDos', JSON.stringify(todos));
            else
                localStorage.removeItem('ToDos');
        }
    }

};

export default todosWidget;

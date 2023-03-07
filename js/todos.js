// Create page elements showcasing a definition card.
const todosWidget = (element) => ((elem) => {
    
    let toDosListSection = {
        ToDOs: 0,
        afterElement: elem,
        createSampleTo_Do: (tbody) => {
            if (localStorage.length == 0){
            
                const tr2 = tbody.appendChild(document.createElement('tr'));
                const td2left = tr2.appendChild(document.createElement('td'));
                const td2IN = td2left.appendChild(document.createElement('input'));
                td2IN.type = "checkbox";
                td2IN.setAttribute("aria-label", "Checkbox");
                const td2middle = tr2.appendChild(document.createElement('td'));
                td2middle.setAttribute("num", 1);
                toDosListSection.ToDOs++;
                if(localStorage.length > 0){
                    if (!localStorage.getItem(localStorage.key(0)) === "Add a ToDO Item."){//toDo list seed is already there
                        //add the first value from cache
                        td2middle.textContent = "";
                    }
                }
                else { 
                    td2middle.textContent = "Add a ToDO Item."
                }
                const td2right = tr2.appendChild(document.createElement('td'));
                const td2DEL = td2right.appendChild(document.createElement('input'));
                td2IN.setAttribute("aria-label", "Delete");
                td2DEL.setAttribute("type", "reset");
                td2DEL.setAttribute("value", "Delete");

                //"delete" event listener
                td2DEL.addEventListener("click", () =>{toDosListSection.DeleteButton(td2DEL)});
            }
        },
        createToDoListWidget: () => {
            if(elem.classList.contains("ToDoList")){
                switch (window.location.pathname){
                    case '/index.html':
                    case '/':
                            const todolistSection = toDosListSection.afterElement.insertAdjacentElement("afterend", document.createElement("section"));
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
                            toDosListSection.createSampleTo_Do(tbody);
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

                            //retrieve Storage, add if missing
                            let storageToDos =  toDoListStorage.getAlltoDoFromStorage();
                            
                            for (let i=0; i < storageToDos.length; i++){
                                if (storageToDos[i] === "Add a ToDO Item."){
                                    continue;
                                }
                                else{
                                    toDosListSection.AddToDo(storageToDos[i]);
                                }
                            }

                            toDosListSection.addToDoEventListeners();

                        break;
                    case '/pages/dictionaryword.html':
                        const htbody = document.querySelector("#ToDoItems");
                        toDosListSection.createSampleTo_Do(htbody);

                        //retrieve Storage, add if missing
                        let storageToDosPage =  toDoListStorage.getAlltoDoFromStorage();
                            
                        for (let i=0; i < storageToDosPage.length; i++){
                            if (storageToDosPage[i] === "ITEM1"){
                                toDosListSection.ToDOs = 1;//account for item in markup
                                continue;
                            }
                            else{
                                toDosListSection.AddToDo(storageToDosPage[i]);
                            }
                        }
                        toDosListSection.addToDoEventListeners();
                        
                        break;
                    default:
                        console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.")
                }
            }
            else {
                console.log(`Add "ToDoList" class to ${elem.nodeName} node.`)
            }
        },
        AddToDo: (description) => {
            //after "Add" is clicked, insert new table row
            const TABLEITEMS = document.getElementById('ToDoItems');
            const tableFrag = document.createDocumentFragment();
            const newRow = tableFrag.appendChild(document.createElement('tr')); //Add row
            const firstCOL = newRow.appendChild(document.createElement('td')); //Table first data
            const checkBOX = firstCOL.appendChild(document.createElement('input')); //Add checkbox
            checkBOX.setAttribute('type', 'checkbox');
            checkBOX.setAttribute('aria-label', 'Checkbox');
            const newITEM = newRow.appendChild(document.createElement('td')); //Table second data
            newITEM.innerHTML = description; //Populate second col
            newITEM.setAttribute('num', toDosListSection.ToDOs ? (() => {
                let elem = document.querySelector('#ToDO td[num]');
                return Number(elem.getAttribute("num")) + toDosListSection.ToDOs;
            })() : 1);
            toDosListSection.ToDOs++; //Number of Items
            const secondCOL = newRow.appendChild(document.createElement('td')); //Table third data
            const delBOX = secondCOL.appendChild(document.createElement('input')) //Add deletebox
            delBOX.setAttribute('type', 'submit');
            delBOX.setAttribute('value', 'Delete');
            checkBOX.setAttribute('aria-label', 'Delete');

            TABLEITEMS.appendChild(tableFrag);

            //"delete" event listener
            delBOX.addEventListener("click", () =>{ toDosListSection.DeleteButton( delBOX);});

            //add to list storage
            toDoListStorage.addtoDoToStorage();
        },
        DeleteButton: (box) => {
            let rowChkBx = box.parentNode.previousElementSibling.previousElementSibling;
            let rowChkBxIN = rowChkBx.childNodes[0];
            checked = rowChkBxIN.checked;

            if (checked){
                //remove row
                let i = box.parentNode.parentNode.rowIndex;
                let value = box.parentNode.previousSibling.textContent;
                document.querySelector('table').deleteRow(i);
                toDosListSection.ToDOs--;

                //remove storage item
                toDoListStorage.removetoDoFromStorage(value);
            }
            else {
                var i = box.parentNode.parentNode.rowIndex;
                document.querySelector('table').deleteRow(i);
                toDosListSection.ToDOs--;
            }
        },
        addToDoEventListeners: () => {
            const ADDBUTTON = document.getElementById('AddButton');
            const ADDITEMENTER = document.querySelector('input[name="itemINPUT"]');
            
            ADDBUTTON.addEventListener("click", () =>{
                toDosListSection.AddToDo(ADDITEMENTER.value);
                ADDITEMENTER.value = '';
            });
            
            ADDITEMENTER.addEventListener("keypress", (event) => {
                if (event.key === 'Enter'){
                    toDosListSection.AddToDo(ADDITEMENTER.value);
                    ADDITEMENTER.value = '';
                }
            });
        }
    }

    let toDoListStorage = {
        getAlltoDoFromStorage: () => {
            let values = [],
                keys = Object.keys(localStorage),
                i = keys.length;

                while (i--) {
                    values.push (localStorage.getItem(keys[i]));
                }
            return values;
        },
        addtoDoToStorage: () => {
            let todoElems = document.querySelectorAll('td[num]');
            let todos = [];
            //TODOS List additions
            for( let i=0; i < todoElems.length; i++){
                if (todoElems[i].textContent === "ITEM1" || todoElems[i].textContent == "Add a ToDO Item."){
                    continue;
                }
                else {
                    todos.push(todoElems[i].textContent);
                }
            }

            for ( let i=0; i < todos.length; i++){
                try{
                    let storageToDos = toDoListStorage.getAlltoDoFromStorage(); 
                    if (storageToDos.includes(todos[i])){
                        continue;
                    }
                    else {
                        localStorage.setItem(`ToDO${i+1}`, todos[i]);
                    }
                }
                catch (err){
                    console.log("Problem storing To-do list item: ", err);
                }
            }
        },
        removetoDoFromStorage: (item) => {
            for (var i=0, len = localStorage.length; i < len; i++){
                let cacheItem = localStorage.getItem(localStorage.key(i));
                if (cacheItem == item){
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    }
    toDosListSection.createToDoListWidget();
})(element);

if(window.location.pathname == '/pages/todos.html' || 
   window.location.pathname == '/pages/todos' ||
   window.location.pathname == '/RandomWebBits/pages/todos.html'){
    //implement a search component to search your own words
    const blueWebBit = document.querySelector(".exampleBlue.ToDoList");
    todosWidget(blueWebBit);
} else if (window.location.pathname == '/index.html' || 
           window.location.pathname == '/RandomWebBits/index.html' ||
          window.location.pathname == '/') {
    const mainDiv = document.querySelector("main .cards");
    todosWidget(mainDiv);
}

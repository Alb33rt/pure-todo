function createTodo(title, desc, id) {
    // Ref: 
                // <div class="todoitem">
                //     <div class="checkbox-wrapper">
                //         <input type="checkbox" id="cb" value="0"/>
                //         <label for="cb" class="check-box">
                //     </div>
                //     <div class="todocontent">
                //         <div class="todotitle">Lorem Ipsum dolor sit amet</div>
                //         <div class="tododesc">Secondary text here to describe more about it.</div>
                //     </div>
                // </div>
    const todoTitle = document.createElement("div");
    todoTitle.setAttribute("class", "todotitle");
    todoTitle.innerText = title;

    const todoDesc = document.createElement("div");
    todoDesc.setAttribute("class", "tododesc");
    todoDesc.innerText = desc;

    const todoContent = document.createElement("div");
    todoContent.setAttribute("class", "todocontent");
    todoContent.appendChild(todoTitle);
    todoContent.appendChild(todoDesc);

    const inputCheckbox = document.createElement("input");
    inputCheckbox.id = "cb" + id;
    inputCheckbox.type = "checkbox";
    inputCheckbox.value = id;
    inputCheckbox.onclick = removeTodo;
    const labelCheckbox = document.createElement("label");
    labelCheckbox.setAttribute("for", ("cb" + id));
    labelCheckbox.setAttribute("class", "check-box");

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.setAttribute("class", "checkbox-wrapper");
    checkboxWrapper.appendChild(inputCheckbox);
    checkboxWrapper.appendChild(labelCheckbox);

    const todoItem = document.createElement("div");
    todoItem.setAttribute("class", "todoitem");
    todoItem.setAttribute("id", id);
    todoItem.appendChild(checkboxWrapper);
    todoItem.appendChild(todoContent);

    return todoItem;
}

function removeTodo(event) {
    const id = event.target.value;
    setTimeout(() => {
        let todos = localStorage.getItem("todos");
        let todoItems = JSON.parse(todos);

    
        if (id > -1) {
            todoItems.forEach((todoItem, index) => {
                if (todoItem.id == id) {
                    todoItems.splice(index, 1);
                }
            })
            document.getElementById(id.toString()).remove();
        }
    
        localStorage.setItem("todos", JSON.stringify(todoItems));
        return 0;
    }, 500)

    return 1;
}


function createTaskForm(event) {
    event.preventDefault();
    const taskForm = document.querySelector(".newtaskform");
    taskForm.style.display = "flex";

    const createTaskButton = document.querySelector(".openform");
    createTaskButton.style.display = "none";
}

function addTask(event) {
    event.preventDefault();
    let todos = localStorage.getItem("todos");
    let todoItems = [];
    if (todos) {
        todoItems = JSON.parse(todos);
    } 

    const newTitle = document.querySelector(".newtaskname").value;

    const newDesc = document.querySelector(".newtaskdesc").value;

    let newId = Math.floor(Math.random() * 10000);
    let isIdUsed = false;
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == newId) { isIdUsed = true; }
    }
    while (isIdUsed) {
        isIdUsed = false;
        newId = Math.floor(Math.random() * 10000);
        for (let i = 0; i < todoItems.length; i++) {
            if (todoItems[i].id == newId) { isIdUsed = true; }
        }
    }

    let newItem = {
        title: newTitle,
        desc: newDesc,
        id: Math.floor(Math.random() * 10000)
    };

    todoItems.push(newItem);
    localStorage.setItem("todos", JSON.stringify(todoItems));
    const newTodo = createTodo(newTitle, newDesc, newItem.id);
    const container = document.querySelector(".container");
    container.appendChild(newTodo);

    abortTask(event)
}

function abortTask(event) {
    event.preventDefault();
    const taskForm = document.querySelector(".newtaskform");
    document.querySelector(".newtaskname").value = "";
    document.querySelector(".newtaskdesc").value = "";
    taskForm.style.display = "none";

    const createTaskButton = document.querySelector(".openform");
    createTaskButton.style.display = "block";
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");

    let todos = localStorage.getItem("todos");
    if (todos) {
        const todoItems = JSON.parse(todos);
        todoItems.map((todoItem) => {
            const newTodo = createTodo(todoItem.title, todoItem.desc, todoItem.id);
            container.appendChild(newTodo);
        })
    } else {
        const todoItems = [];
    }
    
    
    // TODO: Condition to discard following map function if localstorage has no items

    const createTaskButton = document.querySelector(".openform");
    createTaskButton.onclick = createTaskForm;

    const addTaskButton = document.querySelector(".addbtn");
    addTaskButton.onclick = addTask;

    const abortTaskButton = document.querySelector(".abtbtn");
    abortTaskButton.onclick = abortTask;

    const taskForm = document.querySelector(".newtaskform");
    taskForm.style.display = "none";
})
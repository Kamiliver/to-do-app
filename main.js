window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoform = document.querySelector("#new-todo-form");

    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    newTodoform.addEventListener("submit", e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })    

    DisplayTodos();
})

function DisplayTodos () {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item")
        
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const actions = document.createElement("div");
        const edit = document.createElement("button");
        const deleteButton = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        span.classList.add("bubble");

        if (todo.category == "personal") {
            span.classList.add("personal");
        } else {
            span.classList.add("work");
        }

        content.classList.add("todo-content");
        actions.classList.add("actions");
        edit.classList.add("edit", "bx bxs-edit");
        deleteButton.classList.add("delete");

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
        edit.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);
    })
}
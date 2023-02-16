const form = document.querySelector("form");
const inputTodo = document.querySelector("#todo-item");
const todoList = document.querySelector("#todo-list");

form.addEventListener("submit", addTodo)

// function should be async to using "await"
async function addTodo(event) {
    event.preventDefault();
    // id, title, status
    // Ajax, Fetch Api
    const todoTitle = inputTodo.value;
    inputTodo.value = "";

    const bodyObj = {
        id: "",
        title: todoTitle,
        status: "In-progress"
    };

    // async and awit (wait, get answer and continue)
    const response = await fetch(
        "http://localhost:8080/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyObj)
        }
    );

    if (response.ok) {
        let json = await response.json();

        // Create li element and get your title
        const li = document.createElement("li");
        li.innerHTML = todoTitle;
        li.setAttribute("todo-id", json.todoId)

        // Create delete button to li elements
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", deleteTodo);

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    } else {
        alert("Error");
    }
}

async function deleteTodo(event) {
    event.preventDefault();
    const button = event.target;
    const li = button.parentNode;
    const todoId = li.getAttribute("todo-id");

    const response = await fetch(
        "http://localhost:8080/api/todo/" + todoId, {
            method: "DELETE"
        }
    );

    if (response.ok) {
        todoList.removeChild(li);
    }
}
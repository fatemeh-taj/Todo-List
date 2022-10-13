window.addEventListener("load", () => {
    // show date
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.querySelector("#date").innerHTML = m + "/" + d + "/" + y;

    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // handle name
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!e.target.elements.content.value) {
            alert("enter a todo❤️");
            return;
        }

        const todo = {
            content: e.target.elements.content.value,
            done: false
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();
        DisplayTodos();
    });
    DisplayTodos();
});

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add('todo-item');

        const input = document.createElement("input");
        input.type = 'checkbox';
        input.checked = todo.done;

        const span = document.createElement("span");
        span.classList.add('bubble');

        const content = document.createElement("div");
        content.classList.add('todo-content');
        content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;

        const edit = document.createElement("button");
        edit.classList.add('edit');
        edit.innerHTML = 'Edit';

        const delet = document.createElement("button");
        delet.classList.add('delete');
        delet.innerHTML = 'Delete';

        const actions = document.createElement("div");
        actions.classList.add('actions');

        const label = document.createElement("label");

        todoList.appendChild(todoItem);
        todoItem.appendChild(label);
        label.appendChild(input);
        label.appendChild(span);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        actions.appendChild(edit);
        actions.appendChild(delet);

        if (todo.done) todoItem.classList.add('done');

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            if (todo.done) todoItem.classList.add('done');
            else todoItem.classList.remove('done');

            DisplayTodos();
        });

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly')
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
        });

        delet.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        });
    });
}
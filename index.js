// =================== DOM CONTROL CODE  =================== //

const todoFormElement = document.querySelector('#todoForm');
const todoViewElement = document.querySelector('#todoView');

todoFormElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const content = formData.get('content').trim();

    if (!content) {
        window.alert('내용을 입력해 주세요.');
        return;
    }

    addTodo(content);

    renderTodoView();

    event.target.reset();
});


todoViewElement.addEventListener('RENDER_TODO_VIEW', () => {
    renderTodoView();
});

const renderTodoView = () => {
    todoViewElement.innerHTML = '';
    todoList.forEach(todo => {
        const todoItemElement = createTodoItem(todo);
        todoViewElement.appendChild(todoItemElement);
    });
}

const createTodoItem = (todo) => {

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.checked = todo.completed;
    checkBoxElement.addEventListener('click', () => {
        checkTodo(todo.id);
        const event = new CustomEvent('RENDER_TODO_VIEW');
        todoViewElement.dispatchEvent(event);
    });

    const contentElement = document.createElement(todo.completed ? 'del' : 'span');
    contentElement.innerText = todo.content;

    const removeButtonElement = document.createElement('button');
    removeButtonElement.innerText = '삭제';
    removeButtonElement.addEventListener('click', () => {
        removeTodo(todo.id);
        const event = new CustomEvent('RENDER_TODO_VIEW');
        todoViewElement.dispatchEvent(event);
    });

    const todoItemElement = document.createElement('li');
    todoItemElement.appendChild(checkBoxElement);
    todoItemElement.appendChild(contentElement);
    todoItemElement.appendChild(removeButtonElement);

    return todoItemElement;
}

// =================== TODO DOMAIN CODE  =================== //

let todoList = [];

const addTodo = (content) => {
    todoList.push({
        id: new Date().getTime().toString(),
        content,
        completed: false
    });
}

const checkTodo = (id) => {
    todoList = todoList.map(todo => {
        if (todo.id !== id) {
            return todo;
        }
        return {
            ...todo,
            completed: !todo.completed
        };
    });
}

const removeTodo = (id) => {
    todoList = todoList.filter(todo => todo.id !== id);
}
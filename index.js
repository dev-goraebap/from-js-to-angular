// =================== TODO DOMAIN CODE  =================== //

class TodoService {
    #generateId = 1;
    #todoList = [];

    get todoList() {
        return [...this.#todoList];
    }

    addTodo(content) {
        this.#todoList.push({
            id: this.#generateId++,
            content,
            completed: false
        });
    }
    
    checkTodo(id) {
        this.#todoList = this.#todoList.map(todo => {
            if (todo.id !== id) {
                return todo;
            }
            return {
                ...todo,
                completed: !todo.completed
            };
        });
    }
    
    removeTodo(id) {
        this.#todoList = this.#todoList.filter(todo => todo.id !== id);
    }
}

const todoService = new TodoService();

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

    const addEvent = new CustomEvent('ADD_TODO', {
        detail: { content }
    });
    document.dispatchEvent(addEvent);

    event.target.reset();
});

const renderTodoView = () => {
    todoViewElement.innerHTML = '';

    todoService.todoList.forEach(todo => {
        const todoItemElement = createTodoItem(todo);
        todoViewElement.appendChild(todoItemElement);
    });
}

const createTodoItem = (todo) => {

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.checked = todo.completed;
    checkBoxElement.addEventListener('click', () => {
        const checkEvent = new CustomEvent('CHECK_TODO', {
            detail: { id: todo.id }
        });
        document.dispatchEvent(checkEvent);
    });

    const contentElement = document.createElement(todo.completed ? 'del' : 'span');
    contentElement.innerText = todo.content;

    const removeButtonElement = document.createElement('button');
    removeButtonElement.innerText = '삭제';
    removeButtonElement.addEventListener('click', () => {
        const removeEvent = new CustomEvent('REMOVE_TODO', {
            detail: { id: todo.id }
        });
        document.dispatchEvent(removeEvent);
    });

    const todoItemElement = document.createElement('li');
    todoItemElement.appendChild(checkBoxElement);
    todoItemElement.appendChild(contentElement);
    todoItemElement.appendChild(removeButtonElement);

    return todoItemElement;
}

document.addEventListener('ADD_TODO', event => {
    const content = event.detail.content;
    todoService.addTodo(content);
    renderTodoView();
});

document.addEventListener('CHECK_TODO', event => {
    const todoId = event.detail.id;
    todoService.checkTodo(todoId);
    renderTodoView();
});

document.addEventListener('REMOVE_TODO', event => {
    const todoId = event.detail.id;
    todoService.removeTodo(todoId);
    renderTodoView();
});

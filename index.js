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

class AddTodoComponent {
    constructor() {
        this.todoFormElement = document.createElement('form');

        const inputElement = document.createElement('input');
        inputElement.name = 'content';
        inputElement.placeholder = '내용을 입력해 주세요.';

        const buttonElement = document.createElement('button');
        buttonElement.textContent = '추가';

        this.todoFormElement.appendChild(inputElement);
        this.todoFormElement.appendChild(buttonElement);

        this.todoFormElement.addEventListener('submit', (event) => this.onSubmit(event));

        return this.todoFormElement;
    }

    onSubmit(event) {
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
    }
}

class TodoViewComponent {

    constructor(todoService) {
        this.todoViewElement = document.createElement('ul');
        this.todoService = todoService;

        document.addEventListener('ADD_TODO', event => {
            const content = event.detail.content;
            this.todoService.addTodo(content);
            this.renderTodoView();
        });

        document.addEventListener('CHECK_TODO', event => {
            const todoId = event.detail.id;
            this.todoService.checkTodo(todoId);
            this.renderTodoView();
        });

        document.addEventListener('REMOVE_TODO', event => {
            const todoId = event.detail.id;
            this.todoService.removeTodo(todoId);
            this.renderTodoView();
        });

        return this.todoViewElement;
    }

    renderTodoView() {
        this.todoViewElement.innerHTML = '';

        this.todoService.todoList.forEach(todo => {
            const todoItemElement = new TodoItemComponent(todo);
            this.todoViewElement.appendChild(todoItemElement);
        });
    }
}

class TodoItemComponent {

    constructor(todo) {
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
}

const todoService = new TodoService();
const addTodoComponent = new AddTodoComponent();
const todoViewComponent = new TodoViewComponent(todoService);
document.body.appendChild(addTodoComponent);
document.body.appendChild(todoViewComponent);


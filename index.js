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

class AddTodoComponent extends HTMLElement {

    constructor() {
        super();

        const form = document.createElement('form');
        form.onsubmit = (event) => this.#onSubmit(event);

        const input = document.createElement('input');
        input.name = 'content';
        input.placeholder = '할일을 입력해 주세요';

        const button = document.createElement('button');
        button.textContent = '생성';

        form.appendChild(input);
        form.appendChild(button);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(form);
    }

    #onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('content').trim();

        const addEvent = new CustomEvent('ADD_TODO', {
            detail: content
        });
        document.dispatchEvent(addEvent);

        event.target.reset();
    }
}

customElements.define('add-todo', AddTodoComponent);

class TodoViewComponent extends HTMLElement {

    #todoService;

    constructor() {
        super();

        // 외부에 생성된 todoService 인스턴스에 접근
        this.#todoService = todoService;

        const ul = document.createElement('ul');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(ul);

        document.addEventListener('ADD_TODO', (event) => {
            const content = event.detail;
            this.#todoService.addTodo(content);
            this.#render();
        });

        document.addEventListener('CHECK_TODO', (event) => {
            const todoId = event.detail;
            this.#todoService.checkTodo(todoId);
            this.#render();
        });
        
        document.addEventListener('REMOVE_TODO', (event) => {
            const todoId = event.detail;
            this.#todoService.removeTodo(todoId);
            this.#render();
        });
    }

    #render() {
        this.shadowRoot.innerHTML = '';

        this.#todoService.todoList.forEach(todo => {
            const TodoItemConstructor = customElements.get('todo-item');
            const todoItemComponent = new TodoItemConstructor(todo);
            this.shadowRoot.appendChild(todoItemComponent);
        });
    }
}

customElements.define('todo-view', TodoViewComponent);

class TodoItemComponent extends HTMLElement {
    constructor(todo) {
        super();

        const li = document.createElement('li');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = todo.completed;
        input.onclick = () => this.#onCheck(todo.id);

        const content = document.createElement(todo.completed ? 'del' : 'span');
        content.textContent = todo.content;

        const button = document.createElement('button');
        button.textContent = '삭제';
        button.onclick = () => this.#onRemove(todo.id);

        li.appendChild(input);
        li.appendChild(content);
        li.appendChild(button);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(li);
    }

    #onCheck(id) {
        const event = new CustomEvent('CHECK_TODO', {
            detail: id
        });
        document.dispatchEvent(event);
    }

    #onRemove(id) {
        const event = new CustomEvent('REMOVE_TODO', {
            detail: id
        });
        document.dispatchEvent(event);
    }
}

customElements.define('todo-item', TodoItemComponent);

const addTodoComponent = document.createElement('add-todo');
const todoViewComponent = document.createElement('todo-view');

document.body.appendChild(addTodoComponent);
document.body.appendChild(todoViewComponent);

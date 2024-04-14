import { todoService } from '../services/todo-service.js';

export class TodoViewComponent extends HTMLElement {

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
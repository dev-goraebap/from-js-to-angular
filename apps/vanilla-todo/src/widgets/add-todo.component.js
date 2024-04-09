import todoService from '../services/todo.service.js';

class TodoAdd extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <input type="text" placeholder="Add a new task" id="newTodo">
            <button id="addBtn">Add</button>
        `;

        this.shadowRoot.querySelector('#addBtn').addEventListener('click', () => {
            const input = this.shadowRoot.querySelector('#newTodo');
            const todo = input.value.trim();
            todoService.addTodo(todo);
            input.value = ''; // Clear the input
        });
    }
}

customElements.define('todo-add', TodoAdd);
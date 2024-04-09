import todoService from '../services/todo.service.js';

class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <ul id="todoContainer"></ul>
        `;

        document.addEventListener('todo-updated', (e) => {
            this.updateTodo(e.detail);
        });

        this.updateTodo(todoService.getTodoList());
    }

    updateTodo(todoList) {
        const ul = this.shadowRoot.querySelector('#todoContainer');
        ul.innerHTML = ''; // Clear current todos
        todoList.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            ul.appendChild(li);
        });
    }
}

customElements.define('todo-list', TodoList);
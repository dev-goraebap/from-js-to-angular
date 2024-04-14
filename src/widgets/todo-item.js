export class TodoItemComponent extends HTMLElement {
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
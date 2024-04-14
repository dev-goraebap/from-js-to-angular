export class AddTodoComponent extends HTMLElement {

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
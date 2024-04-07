export class TodoViewComponent {

    #todoService;
    #template;

    constructor(todoService) {
        this.#todoService = todoService;

        this.#template = document.createElement('ul');
        this.#template.addEventListener('click', (event) => {
            const action = event.target.dataset.action;
            const id = event.target.dataset.id;
            if (!action) return;
            if (action === 'checkTodo') this.#onToggleTodo(id);
            if (action === 'removeTodo') this.#onRemoveTodo(id);
        });
        
        this.#todoService.subscribe(() => this.#render());
        
        return this.#template;
    }

    #onToggleTodo(id) {
        this.#todoService.checkTodo(id);
    }

    #onRemoveTodo(id) {
        this.#todoService.removeTodo(id);
    }

    #render() {
        this.#template.innerHTML = `
        ${this.#todoService.getTodoList().map((todo) => {
            const tag = todo.finished ? 'del' : 'span';
            const checked = todo.finished ? 'checked' : '';
            return `
                <li>
                    <input data-action="checkTodo" data-id="${todo.id}" type="checkbox" ${checked}>
                    <${tag}>${todo.content}</${tag}>
                    <button data-action="removeTodo" data-id="${todo.id}">삭제</button>
                </li>`
            }).join('')
        }`;
    }
}
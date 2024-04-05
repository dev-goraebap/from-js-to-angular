export class TodoViewComponent {
    #todoService;
    #containerElement;

    constructor(todoService) {
        this.#containerElement = document.querySelector('#todoContainer');
        this.#todoService = todoService;

        this.#onEvent();
    }

    render() {
        const todoList = this.#todoService.getTodoList();
        this.#containerElement.innerHTML = todoList.map((todo) => {
            const contentTag = todo.finished ? 'del' : 'span';
            return `
            <li>
                <input id="checkTodo" type="checkbox" ${todo.finished ? 'checked' : ''} data-id="${todo.id}" />
                <${contentTag}>${todo.content}</${contentTag}>
                <button id="removeTodo" data-id="${todo.id}">삭제</button>
            </li>
            `;
        }).join('');
    }

    #onEvent() {
        this.#containerElement.addEventListener('click', (event) => {
            switch (event.target.id) {
                case 'checkTodo':
                    const todoId2 = event.target.getAttribute('data-id');
                    this.#todoService.checkTodo(todoId2);
                    break;
                case 'removeTodo':
                    const todoId1 = event.target.getAttribute('data-id');
                    this.#todoService.removeTodo(todoId1);
                    break;
                default:
            }

            this.render();
        });
    }
}
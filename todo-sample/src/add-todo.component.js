export class AddTodoComponent {
    #formElement;
    #inputElement;
    #todoService;
    #todoViewComponent;

    constructor(todoService, todoViewComponent) {
        this.#formElement = document.querySelector('#todoForm');
        this.#inputElement = document.querySelector('#contentInput');
        this.#todoService = todoService;
        this.#todoViewComponent = todoViewComponent;

        this.#onSubmit();
    }

    #onSubmit () {
        this.#formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const result = this.#inputElement.value;
            console.log(result);

            this.#todoService.addTodo(result);
            this.#inputElement.value = '';

            this.#todoViewComponent.render();
        });
    }
}
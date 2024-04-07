export class AddTodoComponent {

    #todoService;
    #template;

    constructor(todoService) {
        this.#todoService = todoService;

        this.#template = document.createElement('form');
        this.#template.addEventListener('submit', this.#onSubmit.bind(this));
        this.#render();
        return this.#template;
    }

    #onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const addText = formData.get('addText');

        this.#todoService.addTodo(addText);

        event.target.reset();
    }

    #render() {        
        this.#template.innerHTML = `
            <input name="addText" placeholder="할 일을 입력해 주세요." type="text">
            <button type="submit">추가</button>
        `;
    }
}
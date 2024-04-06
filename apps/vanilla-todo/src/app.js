class TodoService {

    #todoList = [
        {
            id: 'asldkfj',
            content: '할일 작성',
            finished: false
        }
    ];

    #subscribers = []; // 상태 변경을 구독하는 함수들을 저장할 배열

    subscribe(callback) {
        this.#subscribers.push(callback);
    }

    #notify() {
        this.#subscribers.forEach(callback => callback());
    }

    getTodoList() {
        return [...this.#todoList];
    }

    addTodo(content) {
        if (!content) {
            window.alert('내용을 입력해 주세요.');
            return;
        }

        const generateId = new Date().getTime().toString();

        this.#todoList.push({
            id: generateId,
            content,
            finished: false,
        });

        this.#notify();
    }

    checkTodo(id) {
        this.#todoList = this.#todoList.map((todo) => {
            if (todo.id !== id) {
                return todo;
            }
            return { ...todo, finished: !todo.finished };
        });

        this.#notify();
    }

    removeTodo(id) {
        this.#todoList = this.#todoList.filter((todo) => todo.id !== id);

        this.#notify();
    }
}

class AddTodoComponent {

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

class TodoViewComponent {

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
        
        this.#render();
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
        ${todoService.getTodoList().map((todo) => {
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


const todoService = new TodoService();
const addTodoComponent = new AddTodoComponent(todoService);
const todoViewComponent = new TodoViewComponent(todoService);

const rootElement = document.querySelector('#root');
rootElement.appendChild(addTodoComponent);
rootElement.appendChild(todoViewComponent);
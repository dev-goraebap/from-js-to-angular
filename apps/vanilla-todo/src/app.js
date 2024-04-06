// todolist logic

class TodoService {

    #todoList = [];

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
    }

    checkTodo(id) {
        this.#todoList = this.#todoList.map((todo) => {
            if (todo.id !== id) {
                return todo;
            }
            return { ...todo, finished: !todo.finished };
        });
    }

    removeTodo(id) {
        this.#todoList = this.#todoList.filter((todo) => todo.id !== id);
    }
}

const todoService = new TodoService();

// UI Event logic

const formElement = document.querySelector('#todoForm');
const inputElement = document.querySelector('#contentInput');
const containerElement = document.querySelector('#todoContainer');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    todoService.addTodo(inputElement.value);

    inputElement.value = '';

    updateUI();
});

containerElement.addEventListener('click', (event) => {
    const targetAction = event.target.getAttribute('data-action');
    const targetTodoId = event.target.getAttribute('data-id');

    switch (targetAction) {
        case 'checkTodo':
            todoService.checkTodo(targetTodoId);
            break;
        case 'removeTodo':
            todoService.removeTodo(targetTodoId);
            break;
        default:
    }

    updateUI();
});

const updateUI = () => {
    const todoList = todoService.getTodoList();
    containerElement.innerHTML = todoList.map((todo) => {
        const contentTag = todo.finished ? 'del' : 'span';
        return `
        <li>
            <input data-action="checkTodo" data-id="${todo.id}" type="checkbox" ${todo.finished ? 'checked' : ''}  />
            <${contentTag}>${todo.content}</${contentTag}>
            <button data-action="removeTodo" data-id="${todo.id}">삭제</button>
        </li>
        `;
    }).join('');
}
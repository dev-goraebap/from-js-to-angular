// todolist logic

let todoList = [];

const addTodo = (content) => {
    if (!content) {
        window.alert('내용을 입력해 주세요.');
        return;
    }

    const generateId = new Date().getTime().toString();

    todoList.push({
        id: generateId,
        content,
        finished: false,
    });
};

const checkTodo = (id) => {
    todoList = todoList.map((todo) => {
        if (todo.id !== id) {
            return todo;
        }
        return { ...todo, finished: !todo.finished };
    });
}

const removeTodo = (id) => {
    todoList = todoList.filter((todo) => todo.id !== id);
} 

// UI Event logic

const formElement = document.querySelector('#todoForm');
const inputElement = document.querySelector('#contentInput');
const containerElement = document.querySelector('#todoContainer');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    addTodo(inputElement.value);

    inputElement.value = '';

    updateUI();
});

containerElement.addEventListener('click', (event) => {
    const targetAction = event.target.getAttribute('data-action');
    const targetTodoId = event.target.getAttribute('data-id');

    switch (targetAction) {
        case 'checkTodo':
            checkTodo(targetTodoId);
            break;
        case 'removeTodo':
            removeTodo(targetTodoId);
            break;
        default:
    }

    updateUI();
});

const updateUI = () => {
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
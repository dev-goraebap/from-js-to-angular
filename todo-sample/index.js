let todoList = [];

const addTodo = (content) => {
    if (!content) {
        window.alert('내용을 입력해 주세요.');
        return;
    }

    const randomId = new Date().getTime().toString();

    todoList.push({
        id: randomId,
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

    return todoList;
}

const removeTodo = (id) => {
    todoList = todoList.filter((todo) => todo.id !== id);

    return todoList;
} 

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
    let todoId;

    switch (event.target.id) {
        case 'checkTodo':
            todoId = event.target.getAttribute('data-id');
            checkTodo(todoId);
            break;
        case 'removeTodo':
            todoId = event.target.getAttribute('data-id');
            removeTodo(todoId);
            break;
        default:
    }

    updateUI(); // 모든 처리 후 UI 업데이트
});

const updateUI = () => {
    containerElement.innerHTML = todoList.map((todo) => {
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
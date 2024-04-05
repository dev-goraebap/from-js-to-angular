import * as todoService from './todo.js';

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
    let todoId;

    switch (event.target.id) {
        case 'checkTodo':
            todoId = event.target.getAttribute('data-id');
            todoService.checkTodo(todoId);
            break;
        case 'removeTodo':
            todoId = event.target.getAttribute('data-id');
            todoService.removeTodo(todoId);
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
            <input id="checkTodo" type="checkbox" ${todo.finished ? 'checked' : ''} data-id="${todo.id}" />
            <${contentTag}>${todo.content}</${contentTag}>
            <button id="removeTodo" data-id="${todo.id}">삭제</button>
        </li>
        `;
    }).join('');
}
import './widgets/add-todo.js';
import './widgets/todo-item.js';
import './widgets/todo-view.js';

const addTodoComponent = document.createElement('add-todo');
const todoViewComponent = document.createElement('todo-view');

document.body.appendChild(addTodoComponent);
document.body.appendChild(todoViewComponent);

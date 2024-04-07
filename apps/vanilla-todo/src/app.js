import { AddTodoComponent } from './components/add-todo.component.js';
import { TodoViewComponent } from './components/todo-view.component.js';
import { TodoService } from './services/todo.service.js';

const todoService = new TodoService();
const addTodoComponent = new AddTodoComponent(todoService);
const todoViewComponent = new TodoViewComponent(todoService);

const rootElement = document.querySelector('#root');
rootElement.appendChild(addTodoComponent);
rootElement.appendChild(todoViewComponent);
import { AddTodoComponent } from './add-todo.component.js';
import { TodoViewComponent } from './todo-view.component.js';
import { TodoService } from './todo.service.js';

const todoService = new TodoService();
const todoViewComponent = new TodoViewComponent(todoService);
new AddTodoComponent(todoService, todoViewComponent);
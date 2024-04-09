class TodoService {
    constructor() {
        if (!TodoService.instance) {
            this.todoList = [];
            TodoService.instance = this;
        }
        return TodoService.instance;
    }

    addTodo(todo) {
        this.todoList.push(todo);
        document.dispatchEvent(new CustomEvent('todo-updated', { detail: this.todoList }));
    }

    getTodoList() {
        return this.todoList;
    }
}

const todoService = new TodoService();
Object.freeze(todoService);
export default todoService;
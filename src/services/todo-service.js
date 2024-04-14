class TodoService {
    #generateId = 1;
    #todoList = [];

    get todoList() {
        return [...this.#todoList];
    }

    addTodo(content) {
        this.#todoList.push({
            id: this.#generateId++,
            content,
            completed: false
        });
    }

    checkTodo(id) {
        this.#todoList = this.#todoList.map(todo => {
            if (todo.id !== id) {
                return todo;
            }
            return {
                ...todo,
                completed: !todo.completed
            };
        });
    }

    removeTodo(id) {
        this.#todoList = this.#todoList.filter(todo => todo.id !== id);
    }
}

export const todoService = new TodoService();
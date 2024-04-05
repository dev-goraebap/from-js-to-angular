export class TodoService {
    
    #todoList = [];

    getTodoList() {
        return [...this.#todoList];
    }

    addTodo(content) {
        if (!content) {
            window.alert('내용을 입력해 주세요.');
            return;
        }

        const randomId = new Date().getTime().toString();

        this.#todoList.push({
            id: randomId,
            content,
            finished: false,
        });
    };

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
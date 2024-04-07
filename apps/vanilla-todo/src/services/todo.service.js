export class TodoService {

    #todoList = [];

    #subscribers = []; // 상태 변경을 구독하는 함수들을 저장할 배열

    subscribe(callback) {
        this.#subscribers.push(callback);
    }

    #notify() {
        this.#subscribers.forEach(callback => callback());
    }

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

        this.#notify();
    }

    checkTodo(id) {
        this.#todoList = this.#todoList.map((todo) => {
            if (todo.id !== id) {
                return todo;
            }
            return { ...todo, finished: !todo.finished };
        });

        this.#notify();
    }

    removeTodo(id) {
        this.#todoList = this.#todoList.filter((todo) => todo.id !== id);

        this.#notify();
    }
}
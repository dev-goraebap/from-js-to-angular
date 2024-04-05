let todoList = [];

export const getTodoList = () => [...todoList];

export const addTodo = (content) => {
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

export const checkTodo = (id) => {
    todoList = todoList.map((todo) => {
        if (todo.id !== id) {
            return todo;
        }
        return { ...todo, finished: !todo.finished };
    });
}

export const removeTodo = (id) => {
    todoList = todoList.filter((todo) => todo.id !== id);
} 
const todoFormElement = document.querySelector('#todoForm');
const todoViewElement = document.querySelector('#todoView');

todoFormElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const content = formData.get('content').trim();

    if (!content) {
        window.alert('내용을 입력해 주세요.');
        return;
    }

    const todoItemElement = createTodoItem(content);
    todoViewElement.appendChild(todoItemElement);

    event.target.reset();
});

const createTodoItem = (content) => {

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.addEventListener('click', event => {
        const todoItemElement = event.target.parentNode;
        const contentElement = todoItemElement.querySelector('span');
        contentElement.classList.toggle('checked');
    });

    const contentElement = document.createElement('span');
    contentElement.innerText = content;

    const removeButtonElement = document.createElement('button');
    removeButtonElement.innerText = '삭제';
    removeButtonElement.addEventListener('click', event => {
        const todoItemElement = event.target.parentNode;
        todoItemElement.remove();
    });

    const todoItemElement = document.createElement('li');
    todoItemElement.appendChild(checkBoxElement);
    todoItemElement.appendChild(contentElement);
    todoItemElement.appendChild(removeButtonElement);

    return todoItemElement;
}
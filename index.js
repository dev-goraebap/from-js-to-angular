// todoForm 요소 접근
const todoFormElement = document.querySelector('#todoForm');

// todoView 요소 접근
const todoViewElement = document.querySelector('#todoView');

/**
 * todoForm 요소의 submit 이벤트 리스너 등록
 * 1. 이벤트가 발생했을 경우 리렌더링 이벤트 전파를 막고
 * 2. 내부의 content를 작성하는 input 값에 접근
 * 3. [create element] content의 값을 통해 todoView 영역에 todoItem 요소를 추가
 * 4. todoForm 요소의 작성된 값들을 초기화
 */
todoFormElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const content = formData.get('content');

    const todoItemElement = createTodoItem(content);
    todoViewElement.appendChild(todoItemElement);

    event.target.reset();
});

/**
 * todoView 요소의 click 이벤트 리스너 등록
 * 1. 이벤트가 발생했을 경우 이벤트를 발생시킨 요소에 접근
 * 2. 요소의 dataset 속성을 통해 actionType을 확인
 * 3. action 타입에 따라 해당하는 작업을 수행
 */
todoViewElement.addEventListener('click', event => {
    // li 요소 하위에 checkbox, button이 있도록 설계 했기 때문에
    // 이벤트를 발생시킨 요소의 부모는 무조건 todoItem이라고 가정
    const todoItemElement = event.target.parentNode;

    // checkbox, button 클릭시 actionType에 접근 가능
    // 나머지는 undefined
    const actionType = event.target.dataset.action;
    
    switch (actionType) {
        case 'checkTodo':
            // todoItem 요소 하위의 content 요소에 접근하고
            // style.css 에 만들어준 checked 클래스를 추가 또는 제거
            const contentElement = todoItemElement.querySelector('span');
            contentElement.classList.toggle('checked');
            break;
        case 'removeTodo':
            // todoItem 요소를 제거
            todoItemElement.remove();
            break;
        default:
    }
});

/**
 * todoView 요소 하위에 추가될 todoItem 요소 생성
 */
const createTodoItem = (content) => {

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.dataset.action = 'checkTodo';

    const contentElement = document.createElement('span');
    contentElement.innerText = content;

    const removeButtonElement = document.createElement('button');
    removeButtonElement.innerText = '삭제';
    removeButtonElement.dataset.action = 'removeTodo';

    const todoItemElement = document.createElement('li');
    todoItemElement.appendChild(checkBoxElement);
    todoItemElement.appendChild(contentElement);
    todoItemElement.appendChild(removeButtonElement);

    return todoItemElement;
}
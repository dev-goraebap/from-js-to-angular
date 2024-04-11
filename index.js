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
    const content = formData.get('content').trim();

    if (!content) {
        window.alert('내용을 입력해 주세요.');
        return;
    }

    const todoItemElement = createTodoItem(content);
    todoViewElement.appendChild(todoItemElement);

    event.target.reset();
});

/**
 * todoView 요소 하위에 추가될 todoItem 요소 생성
 */
const createTodoItem = (content) => {

    // 채크박스 요소 생성 및 data-action 속성 추가 
    // 이벤트 리스너 등록
    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.addEventListener('click', event => {
        const todoItemElement = event.target.parentNode;
        const contentElement = todoItemElement.querySelector('span');
        contentElement.classList.toggle('checked');
    });

    // 컨텐츠 요소 생성 및 내용 추가
    const contentElement = document.createElement('span');
    contentElement.innerText = content;

    // 삭제 버튼 요소 생성 및 data-action 속성 추가
    // 이벤트 리스너 등록
    const removeButtonElement = document.createElement('button');
    removeButtonElement.innerText = '삭제';
    removeButtonElement.addEventListener('click', event => {
        const todoItemElement = event.target.parentNode;
        todoItemElement.remove();
    });

    // todoItem 요소 생성 및 자식 요소를 채크박스, 컨텐츠, 삭제버튼 순서대로 추가
    const todoItemElement = document.createElement('li');
    todoItemElement.appendChild(checkBoxElement);
    todoItemElement.appendChild(contentElement);
    todoItemElement.appendChild(removeButtonElement);

    // todoItem 요소 반환
    return todoItemElement;
}
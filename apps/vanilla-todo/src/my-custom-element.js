class MyCustomElement extends HTMLElement {

    // ! 가장 먼저 실행 됨
    constructor() {
        super();
        console.log('인스턴트 생성됨!');
        // constructor는 커스텀 엘리먼트의 인스턴스가 생성될 때 호출됩니다. 
        // 이는 요소의 기본 상태를 설정하고, 이벤트 리스너를 추가하는 등의 초기화 작업을 수행하는 데 사용됩니다.
    }

    static get observedAttributes() { 
        // observedAttributes getter 에 명시된 속성들이 변경되었을 때 
        // attributeChangedCallback 함수에서 
        // 이를 감지하고 실행됩니다.
        return ['attr1', 'attr2']; 
    }

    // ! 태그 작성 시 속성을 명시한다면 
    // ! connectedCallback 메서드보다 먼저 실행됨
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
        // attributeChangedCallback은 커스텀 엘리먼트의 속성 중 일부가 추가되거나 제거되거나 변경될 때 호출됩니다. 
        // 이 콜백 함수는 커스텀 엘리먼트의 속성 변화를 감지하고, 이에 따른 특정 동작을 수행하도록 설정할 수 있습니다. 
        // 이 함수가 호출되기 위해서는 먼저 observedAttributes getter를 사용하여 관찰하고자 하는 속성 이름을 지정해야 합니다.
    }

    // 태그 작성 시 속성을 명시한다면 
    // attributeChangedCallback 보다 늦게 실행됨
    connectedCallback() {
        console.log('DOM이 생성됨!');
        // connectedCallback은 커스텀 엘리먼트가 문서의 DOM에 추가될 때 호출됩니다. 
        // 이는 DOM에 요소가 실제로 추가된 후 필요한 설정을 적용하거나, 외부 리소스를 로드하는 작업 등을 수행하는 데 사용됩니다.
    }

    // DOM 트리에서 삭제되었을 때 실행됨
    disconnectedCallback() {
        console.log('DOM이 삭제됨!');
        // disconnectedCallback은 커스텀 엘리먼트가 DOM에서 제거될 때 호출됩니다. 
        // 이 콜백을 사용하여 이벤트 리스너를 정리하거나, 커스텀 엘리먼트에 의해 실행되고 있는 타이머를 중단하는 등의 작업을 수행할 수 있습니다.
    }

    // ? 이놈 쓸일이 있나..
    adoptedCallback() {
        // adoptedCallback은 커스텀 엘리먼트가 새로운 문서로 이동될 때 호출됩니다. 
        // 이는 드문 경우지만, 요소가 하나의 문서에서 다른 문서로 이동될 때 필요한 작업을 정의하는 데 사용됩니다.
    }
}

customElements.define('my-custom-element', MyCustomElement);
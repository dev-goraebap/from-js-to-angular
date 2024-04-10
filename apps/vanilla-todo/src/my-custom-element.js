class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        console.log('커스텀 엘리먼트 생성');
    }
}

customElements.define('my-custom-element', MyCustomElement);
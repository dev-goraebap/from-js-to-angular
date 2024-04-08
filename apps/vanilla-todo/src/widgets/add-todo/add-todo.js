export class AddTodoWidget extends HTMLElement {

    static get observedAttributes() { 
        return ['hint', 'dd']; 
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.hint = '';
        this.dd = '';
    }

    // * 생성될 때 실행
    connectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            @import 'src/widgets/add-todo/add-todo.css';
        </style>
        <form>
            <input type="text" name="content" placeholder="${this.hint}" />
            ${this.dd}
            <button>
                <slot name="button"></slot>
            </button>
        </form>
        `;
        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const content = formData.get('content');

            console.log(content);

            event.target.reset();
        });
    }
}
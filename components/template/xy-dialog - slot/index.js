class XyDialog extends HTMLElement {

    static get observedAttributes() {
        // 监听name属性
        return ['name'];
    }

    constructor() {
        super();
        // 添加Shadow Dom
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._close = this._close.bind(this);
    }

    get open() {
        if (this.$wrapper && this.$wrapper.hasAttribute('open')) {
            return JSON.parse(this.$wrapper.getAttribute('open'));
        }
        return false;
    }

    set open(status) {
        this.$wrapper.setAttribute('open', status);
    }

    get name() {
        return this.getAttribute('name') || '';
    }

    set name(val) {
        return this.setAttribute('name', val);
    }

    attributeChangedCallback(name, oldVal, newVal, namespace) {
        console.log(`${name} changed`);
    }

    connectedCallback() {
        console.log('connectedCallback');
        this._tpl = document.querySelector('#xy-dialog-template');
        // 将模版结构注入shadowRoot
        this._shadowRoot.appendChild(document.importNode(this._tpl.content, true));

        const title = this.getAttribute('title');
        const content = this.getAttribute('content');

        if (title) {
            const titleNode = document.createTextNode(title);
            this._shadowRoot.querySelector('.xy-dialog__title').appendChild(titleNode);
        }

        if (content) {
            const contentNode = document.createTextNode(content);
            this._shadowRoot.querySelector('.xy-dialog__content').appendChild(contentNode);
        }
        this.$wrapper = this._shadowRoot.querySelector('.xy-dialog__wrapper');
        this.$wrapper.setAttribute('open', true);

        this.$closeBtn = this._shadowRoot.querySelector('.xy-dialog__close');
        // 关闭按钮添加click监听
        this.$closeBtn.addEventListener('click', this._close, false);
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
        // 清除click事件监听
        this.$closeBtn.addEventListener('click', this._close, false);
    }

    adoptedCallback(oldDocument, newDocument) {
        console.log('adoptedCallback');
    }

    _close(ev) {
        console.log(ev);
        ev.stopPropagation();
        if (this.open) {
            this.open = false;
        }
    }
}

customElements.define('xy-dialog', XyDialog);
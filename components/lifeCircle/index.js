class XyDialog extends HTMLElement {

    static get observedAttributes() {
        // 监听name属性
        return ['name'];
    }

    constructor() {
        super();
        this._close = this._close.bind(this);
    }

    get open() {
        if (this.hasAttribute('open')) {
            return JSON.parse(this.getAttribute('open'));
        }
        return false;
    }

    set open(status) {
        this.setAttribute('open', status);
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

        const title = this.getAttribute('title');
        const content = this.getAttribute('content');

        this.innerHTML = `
        <div class="xy-dialog__wrapper">
            <div class="xy-dialog__head">
                <button class="xy-button xy-dialog__close">&times;</button>
                <h3 class="xy-dialog__title">${title}</h3>
            </div>
            <div class="xy-dialog__body">
                <div class="xy-dialog__content">${content}</div>
            </div>
            <div class="xy-dialog__footer">
                <button class="xy-button xy-button-infos">取消</button>
                <button class="xy-button xy-button-success">确定</button>
            </div>
        </div>
        `;

        this.$closeBtn = this.querySelector('.xy-dialog__close');
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
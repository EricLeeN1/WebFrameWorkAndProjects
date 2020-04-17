class XyDialog extends HTMLElement {

    static get observedAttributes() {
        // 监听name属性
        return ['name'];
    }

    constructor() {
        super();
        this._style = `
        * {
            padding: 0;
            margin: 0;
            outline: none;
        }
        
        .xy-dialog__wrapper[open="true"] {
            display: block;
        }
        
        .xy-dialog__wrapper {
            border-radius: 10px;
            overflow: hidden;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 60vw;
            display: none;
            height: 60vh;
            border: 1px solid #e1e1e1;
            background-color: #fff;
        }

        .xy-button {
            background-color: #fff;
            border: 1px solid #e1e1e1;
            padding: 0 5px;
            font-size: 12px;
        }
        
        .xy-dialog__wrapper .xy-dialog__head {
            background-color: red;
            position: relative;
            height: 50px;
            padding: 0 20px;
            box-sizing: border-box;
        }
        
        .xy-dialog__head .xy-dialog__close {
            position: absolute;
            right: 20px;
            top: 20px;
        }
        
        .xy-dialog__head .xy-dialog__title {
            line-height: 50px;
            color: #fff;
        }
        
        .xy-dialog__body {
            margin-top: 0;
            padding: 0 20px;
            height: calc(100% - 100px);
            margin-bottom: auto;
            box-sizing: border-box;
        }
        
        .xy-dialog__body .xy-dialog__content {
            min-height: 100%;
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #e1e1e1;
            background: #fff;
        }
        
        .xy-dialog__footer {
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            box-sizing: border-box;
            text-align: right;
        }
        
        .xy-dialog__footer .xy-button {
            padding: 5px 10px;
            border-radius: 5px;
        }`;
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

        const title = this.getAttribute('title');
        const content = this.getAttribute('content');

        this._shadowRoot.innerHTML = `
        <style>${this._style}</style>
        <div class="xy-dialog__wrapper" open="${this.open}">
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

        this.$wrapper = this._shadowRoot.querySelector('.xy-dialog__wrapper');
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
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const IrTextArea = /*@__PURE__*/ proxyCustomElement(class IrTextArea extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.rows = 3;
        this.cols = 5;
        this.text = '';
        this.label = '<label>';
        this.placeholder = '<placeholder>';
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (h("div", { key: '60a44777a8627b7d17a0bcd6395a14b88b008beb', class: "form-group" }, h("label", { key: 'b8b57be3a464f22c4b2a5069a013c5bd2920c662' }, this.label), h("textarea", { key: '2b07384c3dc90a0243a02f8aad2ac8d947cb1985', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
}, [0, "ir-textarea", {
        "rows": [2],
        "cols": [2],
        "text": [1],
        "label": [1],
        "placeholder": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["ir-textarea"];
    components.forEach(tagName => { switch (tagName) {
        case "ir-textarea":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, IrTextArea);
            }
            break;
    } });
}

const IrTextarea = IrTextArea;
const defineCustomElement = defineCustomElement$1;

export { IrTextarea, defineCustomElement };

//# sourceMappingURL=ir-textarea.js.map
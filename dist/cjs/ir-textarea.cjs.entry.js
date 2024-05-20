'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c9759972.js');

const IrTextArea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.rows = 3;
        this.cols = 5;
        this.text = '';
        this.label = '<label>';
        this.placeholder = '<placeholder>';
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (index.h("div", { key: '60a44777a8627b7d17a0bcd6395a14b88b008beb', class: "form-group" }, index.h("label", { key: 'b8b57be3a464f22c4b2a5069a013c5bd2920c662' }, this.label), index.h("textarea", { key: '2b07384c3dc90a0243a02f8aad2ac8d947cb1985', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
};

exports.ir_textarea = IrTextArea;

//# sourceMappingURL=ir-textarea.cjs.entry.js.map
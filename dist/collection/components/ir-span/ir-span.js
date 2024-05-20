import { h } from "@stencil/core";
export class IrSpan {
    constructor() {
        this.text = undefined;
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (h("span", { key: '7d53cc53d23e2b8d42a17f157613c684ecceab29' }, this.text));
    }
    static get is() { return "ir-span"; }
    static get properties() {
        return {
            "text": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "text",
                "reflect": false
            }
        };
    }
}
//# sourceMappingURL=ir-span.js.map

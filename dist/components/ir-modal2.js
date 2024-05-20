import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$1 } from './ir-button2.js';

const irModalCss = ".backdropModal.sc-ir-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-modal{z-index:1001 !important}.modal-dialog.sc-ir-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-modal{gap:10px}.ir-modal.sc-ir-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";
const IrModalStyle0 = irModalCss;

const IrModal = /*@__PURE__*/ proxyCustomElement(class IrModal extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.confirmModal = createEvent(this, "confirmModal", 7);
        this.cancelModal = createEvent(this, "cancelModal", 7);
        this.modalTitle = 'Modal Title';
        this.modalBody = 'Modal Body';
        this.rightBtnActive = true;
        this.leftBtnActive = true;
        this.rightBtnText = 'Confirm';
        this.leftBtnText = 'Close';
        this.rightBtnColor = 'primary';
        this.leftBtnColor = 'secondary';
        this.btnPosition = 'right';
        this.iconAvailable = false;
        this.icon = '';
        this.isOpen = false;
        this.item = {};
    }
    async closeModal() {
        this.isOpen = false;
    }
    async openModal() {
        this.isOpen = true;
    }
    btnClickHandler(event) {
        let target = event.target;
        let name = target.name;
        if (name === this.leftBtnText) {
            this.cancelModal.emit();
            this.item = {};
            this.closeModal();
        }
        else if (name === this.rightBtnText) {
            this.confirmModal.emit(this.item);
            this.item = {};
            this.closeModal();
        }
    }
    render() {
        return [
            h("div", { key: '175e689d9d6516e04992e1e54346567545d24b4c', class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
                    this.cancelModal.emit();
                    this.closeModal();
                } }),
            h("div", { key: '668e1a70677104e667af379c05361d223b5a2436', "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, h("div", { key: 'ec5046674b198d0a6fab0f6a4de3e5239eaa4556', class: `ir-alert-content p-2` }, h("div", { key: 'c5a95932bfd740387b18e86a071c2625fa50934b', class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }), h("div", { key: '56f6a1d0ef91697741a843d75d90c49856ffa9b3', class: "modal-body text-left p-0 mb-2" }, h("div", { key: 'ec5eb461f380a8c56d88bc227d18c4c069e461e3' }, this.modalBody)), h("div", { key: '0a6074c420eee9ff810f397ebebce5e1f3bc04aa', class: `ir-alert-footer border-0  d-flex justify-content-${this.btnPosition === 'center' ? 'center' : this.btnPosition === 'left' ? 'start' : 'end'}` }, this.leftBtnActive && h("ir-button", { key: '28ac786d594397700cc2daf000f4d6fda3c91702', icon: '', btn_color: this.leftBtnColor, btn_block: true, text: this.leftBtnText, name: this.leftBtnText }), this.rightBtnActive && h("ir-button", { key: '23528cafa311de92a0ca42e4104699158d41b4ad', icon: '', btn_color: this.rightBtnColor, btn_block: true, text: this.rightBtnText, name: this.rightBtnText })))),
        ];
    }
    static get style() { return IrModalStyle0; }
}, [2, "ir-modal", {
        "modalTitle": [1, "modal-title"],
        "modalBody": [1, "modal-body"],
        "rightBtnActive": [4, "right-btn-active"],
        "leftBtnActive": [4, "left-btn-active"],
        "rightBtnText": [1, "right-btn-text"],
        "leftBtnText": [1, "left-btn-text"],
        "rightBtnColor": [1, "right-btn-color"],
        "leftBtnColor": [1, "left-btn-color"],
        "btnPosition": [1, "btn-position"],
        "iconAvailable": [4, "icon-available"],
        "icon": [1],
        "item": [1032],
        "isOpen": [32],
        "closeModal": [64],
        "openModal": [64]
    }, [[0, "clickHanlder", "btnClickHandler"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["ir-modal", "ir-button"];
    components.forEach(tagName => { switch (tagName) {
        case "ir-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, IrModal);
            }
            break;
        case "ir-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { IrModal as I, defineCustomElement as d };

//# sourceMappingURL=ir-modal2.js.map
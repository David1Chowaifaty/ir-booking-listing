import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { l as locales } from './locales.store.js';
import { i as isRequestPending } from './ir-interceptor.store.js';

const iglBookPropertyFooterCss = ".sc-igl-book-property-footer-h{display:block;margin:0;padding:0}.sc-igl-book-property-footer-h>*.sc-igl-book-property-footer{margin:auto;padding:auto}.gap-30.sc-igl-book-property-footer{gap:30px}";
const IglBookPropertyFooterStyle0 = iglBookPropertyFooterCss;

const IglBookPropertyFooter = /*@__PURE__*/ proxyCustomElement(class IglBookPropertyFooter extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.buttonClicked = createEvent(this, "buttonClicked", 7);
        this.eventType = undefined;
        this.disabled = true;
    }
    isEventType(event) {
        return event === this.eventType;
    }
    editNext(label) {
        if (this.isEventType('EDIT_BOOKING')) {
            if (label === 'Cancel') {
                return 'flex-fill';
            }
            else {
                return 'd-none d-md-block  flex-fill';
            }
        }
        return 'flex-fill';
    }
    renderButton(type, label, disabled = false) {
        return (h("div", { class: this.shouldRenderTwoButtons() ? ` ${this.editNext(label)}` : 'flex-fill' }, h("button", { class: `btn btn-${type === 'cancel' ? 'secondary' : 'primary'} full-width`, onClick: () => this.buttonClicked.emit({ key: type }), disabled: disabled }, label)));
    }
    shouldRenderTwoButtons() {
        return this.isEventType('PLUS_BOOKING') || this.isEventType('ADD_ROOM') || this.isEventType('EDIT_BOOKING');
    }
    render() {
        return (h(Host, { key: '688a077357ca5d256701ac6e6590f57de2267a3c' }, h("div", { key: '0b837f3a74700ee6c377b959a99cb617b27232d6', class: "d-flex justify-content-between gap-30 align-items-center" }, this.isEventType('EDIT_BOOKING') ? (h(Fragment, null, this.renderButton('cancel', locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales.entries.Lcz_Next} >>`, isRequestPending('/Get_Exposed_Booking_Availability')))) : (h(Fragment, null, this.renderButton('cancel', locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales.entries.Lcz_Next} >>`))))));
    }
    static get style() { return IglBookPropertyFooterStyle0; }
}, [2, "igl-book-property-footer", {
        "eventType": [1, "event-type"],
        "disabled": [4]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["igl-book-property-footer"];
    components.forEach(tagName => { switch (tagName) {
        case "igl-book-property-footer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, IglBookPropertyFooter);
            }
            break;
    } });
}

export { IglBookPropertyFooter as I, defineCustomElement as d };

//# sourceMappingURL=igl-book-property-footer2.js.map
import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { B as BookingService } from './booking.service.js';
import { l as locales } from './locales.store.js';
import { c as calendar_data } from './calendar-data.js';
import { d as defineCustomElement$2 } from './ir-autocomplete2.js';
import { d as defineCustomElement$1 } from './ir-tooltip2.js';
import { v as v4 } from './v4.js';

const iglPropertyBookedByCss = ".sc-igl-property-booked-by-h{display:block}.row.sc-igl-property-booked-by{padding:0 0 0 15px;margin:0}.bookedByEmailContainer.sc-igl-property-booked-by{flex:auto;max-width:350px}.bookedDetailsForm.sc-igl-property-booked-by label.sc-igl-property-booked-by{min-width:125px;max-width:125px}.bookedDetailsForm.sc-igl-property-booked-by .form-group.sc-igl-property-booked-by{margin-bottom:10px !important}.bookedDetailsForm.sc-igl-property-booked-by .checkBoxContainer.sc-igl-property-booked-by input.sc-igl-property-booked-by{height:1.2rem !important;width:30px}.controlContainer.sc-igl-property-booked-by textarea.sc-igl-property-booked-by{height:60px !important}.margin3.sc-igl-property-booked-by{margin-bottom:5px !important}@media (min-width: 768px){.bookedByEmailContainer.sc-igl-property-booked-by{margin-left:37px}}";
const IglPropertyBookedByStyle0 = iglPropertyBookedByCss;

const IglPropertyBookedBy = /*@__PURE__*/ proxyCustomElement(class IglPropertyBookedBy extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.bookingService = new BookingService();
        this.arrivalTimeList = [];
        this.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.expiryYears = [];
        this.currentMonth = '01';
        this.language = undefined;
        this.showPaymentDetails = false;
        this.defaultData = undefined;
        this.countryNodeList = [];
        this.propertyId = undefined;
        this.isButtonPressed = false;
        this.bookedByData = {
            id: undefined,
            email: '',
            firstName: '',
            lastName: '',
            countryId: '',
            isdCode: '',
            contactNumber: '',
            selectedArrivalTime: '',
            emailGuest: false,
            message: '',
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
        };
    }
    async componentWillLoad() {
        this.bookingService.setToken(calendar_data.token);
        this.assignCountryCode();
        this.initializeExpiryYears();
        this.initializeDateData();
        this.populateBookedByData();
    }
    initializeExpiryYears() {
        const currentYear = new Date().getFullYear();
        this.expiryYears = Array.from({ length: 4 }, (_, index) => (currentYear + index).toString());
    }
    async assignCountryCode() {
        const country = await this.bookingService.getUserDefaultCountry();
        const countryId = country['COUNTRY_ID'];
        this.country = countryId;
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: countryId.toString(), countryId });
    }
    initializeDateData() {
        const dt = new Date();
        const month = dt.getMonth() + 1;
        this.currentMonth = month < 10 ? `0${month}` : month.toString();
    }
    populateBookedByData() {
        var _a;
        this.bookedByData = this.defaultData ? Object.assign(Object.assign({}, this.bookedByData), this.defaultData) : {};
        this.arrivalTimeList = ((_a = this.defaultData) === null || _a === void 0 ? void 0 : _a.arrivalTime) || [];
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { selectedArrivalTime: this.arrivalTimeList[0].CODE_NAME });
        if (!this.bookedByData.expiryMonth) {
            this.bookedByData.expiryMonth = this.currentMonth;
        }
        if (!this.bookedByData.expiryYear) {
            this.bookedByData.expiryYear = new Date().getFullYear();
        }
        console.log('initial bookedby data', this.bookedByData);
    }
    handleDataChange(key, event) {
        this.bookedByData[key] = key === 'emailGuest' ? event.target.checked : event.target.value;
        this.dataUpdateEvent.emit({
            key: 'bookedByInfoUpdated',
            data: Object.assign({}, this.bookedByData),
        });
        if (key === 'countryId') {
            this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: event.target.value });
        }
        console.log(this.bookedByData);
    }
    handleNumberInput(key, event) {
        const inputElement = event.target;
        const inputValue = inputElement.value;
        // Regular expression to match only numeric characters (0-9)
        const numericRegex = /^[0-9]+$/;
        if (!numericRegex.test(inputValue)) {
            // If the input is not numeric, prevent it from being entered
            inputElement.value = inputValue.replace(/[^0-9]/g, '');
        }
        if (inputValue === inputElement.value) {
            this.handleDataChange(key, event);
        }
    }
    async handleEmailInput(key, event) {
        const inputElement = event.target;
        const inputValue = inputElement.value;
        if (this.isValidEmail(inputValue)) {
            this.handleDataChange(key, event);
        }
    }
    async checkUser() {
        try {
            const email = this.bookedByData.email;
            if (this.isValidEmail(email)) {
                const res = await this.bookingService.getUserInfo(email);
                if (res !== null) {
                    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: res.id, firstName: res.first_name, lastName: res.last_name, contactNumber: res.mobile, countryId: res.country_id, isdCode: res.country_id.toString() });
                }
                else {
                    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: undefined, firstName: '', lastName: '', contactNumber: '', countryId: '', isdCode: '' });
                }
                this.dataUpdateEvent.emit({
                    key: 'bookedByInfoUpdated',
                    data: Object.assign({}, this.bookedByData),
                });
            }
        }
        catch (error) {
            //   toastr.error(error);
        }
    }
    isValidEmail(emailId) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(emailId);
    }
    handleComboboxChange(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        const { key, data } = e.detail;
        switch (key) {
            case 'blur':
                if (data !== '') {
                    this.bookedByData.email = data;
                    this.checkUser();
                }
                break;
            case 'select':
                this.bookedByData.email = data.email;
                this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: data.id, firstName: data.first_name, lastName: data.last_name, contactNumber: data.mobile, countryId: data.country_id, isdCode: data.country_id.toString() });
                this.dataUpdateEvent.emit({
                    key: 'bookedByInfoUpdated',
                    data: this.bookedByData,
                });
                break;
        }
    }
    clearEvent() {
        this.bookedByData.email = '';
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: '', firstName: '', lastName: '', contactNumber: '', isdCode: this.country.toString(), countryId: this.country });
        this.dataUpdateEvent.emit({
            key: 'bookedByInfoUpdated',
            data: Object.assign({}, this.bookedByData),
        });
    }
    handleButtonClicked(event) {
        switch (event.detail.key) {
            case 'book':
            case 'bookAndCheckIn':
                this.isButtonPressed = true;
                break;
        }
    }
    render() {
        return (h(Host, { key: 'df82f69a08499ab435071e0e6afb200fdd8a8018' }, h("div", { key: '920e8351b8b090f0cbb3afd7a8de085787eafca8', class: "text-left mt-3" }, h("div", { key: '7d975d406034223f6eb704ff424d0c87637b5786', class: "form-group d-flex flex-column flex-md-row align-items-md-center text-left " }, h("label", { key: '9211f5efee9f3525ea9e38e5fbd6160152e3018f', class: "p-0 m-0 label-control mr-1 font-weight-bold" }, locales.entries.Lcz_BookedBy), h("div", { key: 'b7fe6e4faf4abc0f76a6d1c13ace14bfe6b702e3', class: "bookedByEmailContainer mt-1 mt-md-0 d-flex align-items-center" }, h("ir-autocomplete", { key: '5081b5fb3512d8a370003c97cfb5c4b83c6d3a09', onComboboxValue: this.handleComboboxChange.bind(this), propertyId: this.propertyId, type: "email", value: this.bookedByData.email, required: true, class: 'flex-fill', placeholder: locales.entries.Lcz_FindEmailAddress, onInputCleared: () => this.clearEvent() }), h("ir-tooltip", { key: 'da931727d9bebf0c47a855ef0ef3428de483c0ff', class: 'ml-1', message: "Leave empty if email is unavailable" })))), h("div", { key: 'c9399fe80750406d2d70821133dadb22a6789853', class: "bookedDetailsForm text-left mt-2 font-small-3 " }, h("div", { key: '383333435f640cdee844cd4bd55f9d5dd4673f6a', class: "d-flex flex-column flex-md-row  justify-content-md-between " }, h("div", { key: 'f3ac4029497bf1603080f1412ad8fa5b8158e69e', class: "p-0 flex-fill " }, h("div", { key: '2a6b3d45744d7e7cc7bbfb92c9c55a74b549fb48', class: "form-group d-flex flex-column flex-md-row align-items-md-center p-0 flex-fill " }, h("label", { key: 'dd26f8331e3b78c6f219138e24f3be45ab2efec7', class: "p-0 m-0 margin3" }, locales.entries.Lcz_FirstName), h("div", { key: 'a36a9d2ff4d96ec2d1d7f3db1d110e29ce3337d8', class: "p-0 m-0  controlContainer flex-fill  " }, h("input", { key: 'afdf2c85adc34118de3ef4d45a46042b69a6fde0', class: `form-control flex-fill ${this.isButtonPressed && this.bookedByData.firstName === '' && 'border-danger'}`, type: "text", placeholder: locales.entries.Lcz_FirstName, id: v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), h("div", { key: '1ed4795d09071983bc559fd2dbcffd0ef2b08a3c', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '043cf06edaea70146f9353d2450478c26174c5b7', class: "p-0 m-0 margin3" }, locales.entries.Lcz_LastName), h("div", { key: '3196166b10e9a79475068856cc433dd8b6e4c043', class: "p-0 m-0  controlContainer flex-fill" }, h("input", { key: 'bbea4f2b14d39a80d82c704744e30cc1d5e5efc5', class: `form-control ${this.isButtonPressed && this.bookedByData.lastName === '' && 'border-danger'}`, type: "text", placeholder: locales.entries.Lcz_LastName, id: v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), h("div", { key: '780f1e9b664db12c2703ee8a2bdce4db078bd3e3', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '4fdb72812e19104a8cad2c8e2182062dbb390887', class: "p-0 m-0 margin3" }, locales.entries.Lcz_Country), h("div", { key: '940281185e3c84d5c28f4881d5d7944be1967a87', class: "p-0 m-0  controlContainer flex-fill" }, h("select", { key: 'cdacfc2cdeb961d3ba8fd4ac5f02f04df88a17f5', class: `form-control input-sm pr-0`, id: v4(), onChange: event => this.handleDataChange('countryId', event) }, h("option", { key: '9796fbbac36f91aad2be82d11619461b1a460425', value: "", selected: this.bookedByData.countryId === '' }, locales.entries.Lcz_Select), this.countryNodeList.map(countryNode => (h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), h("div", { key: '731513c469de2af794415613bc68ffba66cdc257', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: 'f1f091cb78069369ee28e00b643701a43c47d888', class: "p-0 m-0 margin3" }, locales.entries.Lcz_MobilePhone), h("div", { key: 'ba89459fc86c9f61f4fb370477ae07b8933cf72a', class: "p-0 m-0  d-flex  controlContainer flex-fill" }, h("div", { key: '0a713b5048cc673a8ca4c2540632a3c122b50cc3', class: " p-0 m-0" }, h("select", { key: '22eb14c2d681ab845536fabf104dbce48ba1e511', class: `form-control input-sm pr-0`, id: v4(), onChange: event => this.handleDataChange('isdCode', event) }, h("option", { key: 'df768a6fc4069907ae4828ca0c929a3779438ccb', value: "", selected: this.bookedByData.isdCode === '' }, locales.entries.Lcz_Isd), this.countryNodeList.map(country => (h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), h("div", { key: '92d884892abaeec843b7a31115f82319fc461e52', class: "flex-fill p-0 m-0" }, h("input", { key: 'f2a4bf9dc0fee6c7628d3b63e18c60b0f4d55e67', class: `form-control
                     
                      `, type: "tel", placeholder: locales.entries.Lcz_ContactNumber, id: v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), h("div", { key: '5d8f6a0c5d39d9dc70960a4cc6de0a5de083e397', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: 'd344fcac29ea5479ff06dc12465f1b67bcf83fbe', class: "p-0 m-0 margin3" }, locales.entries.Lcz_YourArrivalTime), h("div", { key: 'fb494b4691098e1f2abae49b0221d34f68f31605', class: "p-0 m-0  controlContainer flex-fill" }, h("select", { key: 'dafab34ebe45ab21335952b9871af42a2534527d', class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.selectedArrivalTime.code === '' && 'border-danger'}`, id: v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, this.arrivalTimeList.map(time => (h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime.code === time.CODE_NAME }, time.CODE_VALUE_EN))))))), h("div", { key: 'fcdc7bad68663fc2c87ca99252083a1978b3bb31', class: "p-0 flex-fill  ml-md-3" }, h("div", { key: 'c184c22f1e1505d9d21f783c0b3716f9a08ea833', class: "  p-0 d-flex flex-column flex-md-row align-items-md-center " }, h("label", { key: 'c6f0869dcc746cc6ab391d6ac8c5384a911e9b25', class: "p-0 m-0 margin3" }, locales.entries.Lcz_AnyMessageForUs), h("div", { key: '577e97edc1b582bf4e9fffb265e691f19b853bed', class: "p-0 m-0  controlContainer flex-fill " }, h("textarea", { key: '1cc770ef36ae4f9c0e55dbe61f0029ef1e66234f', id: v4(), rows: 4, class: "form-control ", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (h(Fragment, { key: 'd6b63c10fe53aaed10b80dc3b64c001ed460122e' }, h("div", { key: 'ada104c5e17994aba69125444829b2df10b24844', class: "form-group mt-md-1  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '300b47af530fbd862764794380f230a1c7ba9fed', class: "p-0 m-0 margin3" }, locales.entries.Lcz_CardNumber), h("div", { key: '355ad5005fbb055a1b4113b027b829237b164560', class: "p-0 m-0  controlContainer flex-fill" }, h("input", { key: '989d9d6b6767457d6184edde082904d67888088c', class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), h("div", { key: '011bdfa529ad6d40ef40f38e5115e1cc05ee08d2', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '09f07370ccb0db68b52e344ad8338cccb3352b46', class: "p-0 m-0 margin3" }, locales.entries.Lcz_CardHolderName), h("div", { key: '308c9c8cf847509d734b028bfa0962108c3155aa', class: "p-0 m-0  controlContainer flex-fill" }, h("input", { key: 'c0dc0ed4e38c0ff1a9daff77f367e6c0eab31fee', class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), h("div", { key: 'fe2b6f7f47a31ff3466229e22ebd1a39854c77c7', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: 'bbe221dc6084112d9813f07a2acf5036abd28804', class: "p-0 m-0 margin3" }, locales.entries.Lcz_ExpiryDate), h("div", { key: '7215d429ab77bdfc668a61eb590e42422d21fbe9', class: "p-0 m-0 row  controlContainer flex-fill" }, h("div", { key: 'e70ef48713d2d2cb7614675cf2d66db770a18b69', class: "p-0 m-0" }, h("select", { key: 'eaf2774d21b81247c2f2ed35a9b2137e93974f44', class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), h("div", { key: 'd6048b5ff6092c7b88c2a6bb797ea8d4c214234e', class: "p-0 m-0 ml-1" }, h("select", { key: 'e69ee57b5d11d8225e7db1d299b8e561547b377f', class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index) => (h("option", { value: year, selected: index === this.bookedByData.expiryYear }, year))))))))), h("div", { key: 'e78d2d253e95313fcf4b640bce5279711c10fb34', class: "form-group mt-1 p-0 d-flex flex-row align-items-center" }, h("label", { key: 'e4596e31d8b05a0a1b58f943ab0d232a25f12c51', class: "p-0 m-0", htmlFor: 'emailTheGuestId' }, locales.entries.Lcz_EmailTheGuest), h("div", { key: 'b1496d55966f7eba64ba649aab5991e697409628', class: "p-0 m-0  controlContainer flex-fill checkBoxContainer" }, h("input", { key: '01053d314b912fa2596f905299c4022050aeef28', class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: 'emailTheGuestId', onChange: event => this.handleDataChange('emailGuest', event) }))))))));
    }
    static get style() { return IglPropertyBookedByStyle0; }
}, [2, "igl-property-booked-by", {
        "language": [1],
        "showPaymentDetails": [4, "show-payment-details"],
        "defaultData": [16],
        "countryNodeList": [16],
        "propertyId": [2, "property-id"],
        "isButtonPressed": [32],
        "bookedByData": [32]
    }, [[16, "buttonClicked", "handleButtonClicked"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["igl-property-booked-by", "ir-autocomplete", "ir-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "igl-property-booked-by":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, IglPropertyBookedBy);
            }
            break;
        case "ir-autocomplete":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "ir-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { IglPropertyBookedBy as I, defineCustomElement as d };

//# sourceMappingURL=igl-property-booked-by2.js.map
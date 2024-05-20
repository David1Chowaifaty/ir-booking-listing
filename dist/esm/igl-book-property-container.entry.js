import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host } from './index-5a46d2dc.js';
import { B as BookingService } from './booking.service-dd04f0fc.js';
import { R as RoomService } from './room.service-10bfe8d3.js';
import { c as calendar_data } from './calendar-data-aa92d4e0.js';
import { l as locales } from './locales.store-bc02340b.js';
import { a as axios } from './axios-dbdb94c4.js';
import './utils-607295bf.js';
import './moment-a9f4173c.js';
import './booking-0d861a2a.js';
import './Token-692eae02.js';

const iglBookPropertyContainerCss = ".sc-igl-book-property-container-h{display:block;margin:0;padding:0;letter-spacing:0px !important;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;font-size:1rem !important;font-weight:400 !important;line-height:1.45 !important;color:#6b6f82 !important;text-align:left !important}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}h3.sc-igl-book-property-container{font-size:1rem}";
const IglBookPropertyContainerStyle0 = iglBookPropertyContainerCss;

const IglBookPropertyContainer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.resetBookingData = createEvent(this, "resetBookingData", 7);
        this.bookingService = new BookingService();
        this.roomService = new RoomService();
        this.language = '';
        this.ticket = '';
        this.baseurl = '';
        this.propertyid = undefined;
        this.from_date = undefined;
        this.to_date = undefined;
        this.withIrToastAndInterceptor = true;
        this.bookingItem = undefined;
        this.showPaymentDetails = undefined;
        this.countryNodeList = undefined;
        this.calendarData = {};
    }
    setRoomsData(roomServiceResp) {
        var _a, _b;
        let roomsData = new Array();
        if ((_b = (_a = roomServiceResp.My_Result) === null || _a === void 0 ? void 0 : _a.roomtypes) === null || _b === void 0 ? void 0 : _b.length) {
            roomsData = roomServiceResp.My_Result.roomtypes;
            roomServiceResp.My_Result.roomtypes.forEach(roomCategory => {
                roomCategory.expanded = true;
            });
        }
        this.calendarData.roomsInfo = roomsData;
    }
    async initializeApp() {
        try {
            const [roomResponse, languageTexts, countriesList] = await Promise.all([
                this.roomService.fetchData(this.propertyid, this.language),
                this.roomService.fetchLanguage(this.language),
                this.bookingService.getCountries(this.language),
            ]);
            if (!locales.entries) {
                locales.entries = languageTexts.entries;
                locales.direction = languageTexts.direction;
            }
            this.countryNodeList = countriesList;
            const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
            this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
            this.setRoomsData(roomResponse);
            const paymentCodesToShow = ['001', '004'];
            this.showPaymentDetails = paymentMethods.some(method => paymentCodesToShow.includes(method.code));
        }
        catch (error) {
            console.error('Error initializing app:', error);
        }
    }
    componentWillLoad() {
        if (this.baseurl) {
            axios.defaults.baseURL = this.baseurl;
        }
        if (this.ticket !== '') {
            calendar_data.token = this.ticket;
            this.bookingService.setToken(this.ticket);
            this.roomService.setToken(this.ticket);
            this.initializeApp();
        }
    }
    async ticketChanged() {
        calendar_data.token = this.ticket;
        this.bookingService.setToken(this.ticket);
        this.roomService.setToken(this.ticket);
        this.initializeApp();
    }
    handleCloseBookingWindow() {
        this.bookingItem = null;
    }
    handleTriggerClicked() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.bookingItem = {
            FROM_DATE: this.from_date,
            defaultDateRange: {
                fromDate: new Date(),
                fromDateStr: '',
                toDate: tomorrow,
                toDateStr: '',
                dateDifference: 0,
                message: '',
            },
            TO_DATE: this.to_date,
            EMAIL: '',
            event_type: 'PLUS_BOOKING',
            ID: '',
            NAME: '',
            PHONE: '',
            REFERENCE_TYPE: '',
            TITLE: locales.entries.Lcz_NewBooking,
        };
    }
    render() {
        return (h(Host, { key: '31859a191a13184c986d2c70876e300c1baf8c1d' }, this.withIrToastAndInterceptor && (h(Fragment, { key: '117a413b4210746cd0893628770296adbf6d761a' }, h("ir-toast", { key: '73736e5ffd9102c4e1517a30779e669d2614c40f' }), h("ir-interceptor", { key: '960a56a40bdd0398f0a4641bbc889a16bbf4d887' }))), h("div", { key: 'e66dfb43e27e8f24bd6d8d0e215c6ffb9ac8e6e6', class: "book-container", onClick: this.handleTriggerClicked.bind(this) }, h("slot", { key: 'fd9ecb37347b8269709fd22db89c0a40066d24ae', name: "trigger" })), this.bookingItem && (h("igl-book-property", { key: 'c3444a44bba129488cd8d32c4de46d76ceb93582', allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onResetBookingData: (e) => {
                e.stopImmediatePropagation();
                e.stopPropagation();
                this.resetBookingData.emit(null);
            }, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))));
    }
    static get watchers() { return {
        "ticket": ["ticketChanged"]
    }; }
};
IglBookPropertyContainer.style = IglBookPropertyContainerStyle0;

export { IglBookPropertyContainer as igl_book_property_container };

//# sourceMappingURL=igl-book-property-container.entry.js.map
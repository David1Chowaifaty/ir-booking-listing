import locales from "../../../stores/locales.store";
import { Host, h } from "@stencil/core";
export class IglLegends {
    constructor() {
        this.legendData = undefined;
    }
    handleOptionEvent(key, data = '') {
        this.optionEvent.emit({ key, data });
    }
    render() {
        return (h(Host, { key: '7a14ce382ef234195e9162734e4cbaafee1aaa4f', class: "legendContainer pr-1 text-left" }, h("div", { key: '6ce0982e9c33895812a215ff95eac965c2a041b4', class: 'w-full' }, h("div", { key: 'b3aab7b0125025ba19bdb36493f63069e8149ada', class: 'w-full' }, h("div", { key: '48a224341599aac7ae6b51934d59cf2ce638746a', class: "stickyHeader pt-1 " }, h("p", { key: 'a0e4a9d715358d4a8e094028fec2c03dfad7ec14', class: "legendHeader" }, locales.entries.Lcz_Legend), h("div", { key: 'd52899bde76d9647c0720bb887ba684600978b38', class: "legendCloseBtn", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("svg", { key: 'dfd5d1e8020f97ff80fba5429e72b3d40e25c0e1', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("path", { key: 'b32ece25be91d10ddf90481a19e6b0752f8190ff', fill: "#6b6f82", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("hr", { key: 'a78e5cc53d8926a67d76b611812e4713baa80127' })), h("div", { key: 'c78fd7b81f44fa96d911128bf81251b2f95717eb', class: "mt-2 pl-1" }, this.legendData.map(legendInfo => (h("div", { class: "legendRow " }, h("div", { class: `legend_${legendInfo.design} mr-1`, style: { backgroundColor: legendInfo.color } }), h("span", { class: "font-small-3" }, legendInfo.name))))), h("hr", { key: '0b3f6f4fa9bbb08bf15a5e89bf01b4d4913215f1' }), h("div", { key: '87313f995ee0e454bbf9474e2fe1d165df43cc12', class: "mt-2" }, h("div", { key: '466c82eec94f168d2658e8c628f796c6dd6dbcda', class: "legendCalendar" }, h("div", { key: '0c9232939f153e03b197f90cb2655e92afaf3941', class: "legendRow align-items-center" }, h("div", { key: '5197bcef4a1bff6600c19dd720f4d14359d365c0', class: "legendCal br-t br-s br-bt" }, h("strong", { key: '4b2222d581b4d81ee0c6149c82e91a62eecab7a8' }, "MAR 2022")), h("div", { key: '7439a1e47e5ed90ff291156be1e21e9baf44a62a', class: "highphenLegend" }, locales.entries.Lcz_MonthAndYear)), h("div", { key: 'a11424a91459270549c65a1fb61aed60ebe42a12', class: "legendRow" }, h("div", { key: '7ff5bb28178fd5ce10815cfaaa8d935698bb3e3c', class: "legendCal headerCell align-items-center br-s" }, h("span", { key: 'cb009fdf6ed75345e51699bf504e7d539a2978c9', class: "badge badge-info  badge-pill" }, "3")), h("div", { key: 'b4fc0f6be6c6c4937a3449b25ecca868281fb1e5', class: "highphenLegend" }, h("div", { key: 'd92080a80b6f4ce8a4941d350ec4a57b19aa6e13' }, locales.entries.Lcz_UnassignedUnits))), h("div", { key: 'ba8fc8e30a15765e35d585f3b8113282d0ceb9a1', class: "legendRow" }, h("div", { key: 'f02d033b02139054fbcc762bfcdfe50f3262b1fd', class: "legendCal dayTitle br-s" }, "Fri 18"), h("div", { key: '03831d99f0f8e5a65d86c19eda490dd127ee6189', class: "highphenLegend" }, locales.entries.Lcz_Date)), h("div", { key: '8d8421d043bcf80d373b2137576006a81c92e64d', class: "legendRow" }, h("div", { key: 'fc180fa3c4950cdc196bd41461ff93a83548cd5f', class: "legendCal br-s br-bt dayCapacityPercent" }, "15%"), h("div", { key: 'c7d95e59ba9fb630bc671e54885846b680586791', class: "highphenLegend" }, locales.entries.Lcz_Occupancy)), h("div", { key: 'c7b2a7e9c4fbf391719c403a4e37a2beed075c97', class: "legendRow" }, h("div", { key: '36ac29a90e40615571696b26de308980f792cd70', class: "legendCal br-s br-bt  font-weight-bold total-availability" }, "20"), h("div", { key: '2442f572ae7160075b731cb02bdf3d9f7bb7877b', class: "highphenLegend" }, locales.entries.Lcz_TotalAvailability))))))));
    }
    static get is() { return "igl-legends"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["igl-legends.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["igl-legends.css"]
        };
    }
    static get properties() {
        return {
            "legendData": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "{ [key: string]: any; }",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            }
        };
    }
    static get events() {
        return [{
                "method": "optionEvent",
                "name": "optionEvent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "{ [key: string]: any; }",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=igl-legends.js.map

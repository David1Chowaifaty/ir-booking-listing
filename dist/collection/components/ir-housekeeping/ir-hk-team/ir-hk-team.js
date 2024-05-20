var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import housekeeping_store from "../../../stores/housekeeping.store";
import locales from "../../../stores/locales.store";
import { Host, h } from "@stencil/core";
export class IrHkTeam {
    constructor() {
        this.currentTrigger = null;
    }
    renderAssignedUnits(hk) {
        if (hk.assigned_units.length === 0) {
            return (h("span", null, "0 -", ' ', h("button", { class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }) }, locales.entries.Lcz_Assign)));
        }
        return (h("span", null, hk.assigned_units.length, " -", ' ', h("button", { onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }), class: "outline-btn" }, locales.entries.Lcz_Edit)));
    }
    renderCurrentTrigger() {
        var _a;
        switch ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) {
            case 'unassigned_units':
                return h("ir-hk-unassigned-units", { slot: "sidebar-body", user: this.currentTrigger.user });
            case 'user':
                return h("ir-hk-user", { slot: "sidebar-body", user: this.currentTrigger.user, isEdit: this.currentTrigger.isEdit });
            default:
                return null;
        }
    }
    handleCloseSideBar(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.currentTrigger = null;
    }
    handleDeletion(user) {
        this.currentTrigger = { type: 'delete', user };
        this.deletionTimout = setTimeout(() => {
            const modal = this.el.querySelector('ir-delete-modal');
            if (!modal)
                return;
            modal.openModal();
        }, 100);
    }
    disconnectedCallback() {
        clearTimeout(this.deletionTimout);
    }
    render() {
        var _a;
        const { assigned, total, un_assigned } = housekeeping_store.hk_criteria.units_assignments;
        return (h(Host, { key: '0d68f2355997606554770bbc2c0687b7058d8903', class: "card p-1" }, h("section", { key: '9be5720b9e98d5f184ff6b37118819a24d919d45' }, h("ir-title", { key: '0ca789e63f80d7e88456ff9da38372075249315d', label: locales.entries.Lcz_HousekeepingTeam, justifyContent: "space-between" }, h("div", { key: 'f2e81e24b7b7a7265adf161edd79e6fd5a949167', slot: "title-body", class: "assignments-container gap-16 m-0" }, h("p", { key: '0081cd36f6e758d09aa4155ced3c75b65bb11a10', class: "font-weight-bold m-0 p-0" }, total, " ", locales.entries.Lcz_TotalUnits), h("p", { key: 'd9d453f58e1ce968333d34514627ed519fed7656', class: 'm-0 p-0' }, assigned, " ", h("span", { key: '2e8e1e01a1bcd6c0da54f6b03db3a0a368e9d773' }, locales.entries.Lcz_Assigned)), un_assigned > 0 && (h("button", { key: '1afb2d8882665b3aa0a2e89346b0f69f2ffd5338', class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: null }) }, un_assigned, " ", locales.entries.Lcz_Unassigned)))), h("p", { key: 'b6d987d69461138d2417139affd5cc61ac3b5396', class: 'm-0 p-0' }, locales.entries.Lcz_AsAnOption)), h("section", { key: '0c849c952cfb59e44f9ab0a8cc8a591eb2a0b979', class: "table-container" }, h("table", { key: 'b06dc28393fb77e2ba8a36eb4d91a0274eac69ff', class: "table" }, h("thead", { key: '23931b9617de6f02572656b03580a6e51b41a1b2' }, h("tr", { key: '1e51b47c63474e97c994abaf141448f6dff78044' }, h("th", { key: '94783b5ff3ac48f7e53fc89bba471379ccbf4a77', class: "text-left" }, locales.entries.Lcz_Name), h("th", { key: 'd020f0a3482829830d2cbfb058f7103342b85ce0' }, locales.entries.Lcz_Mobile), h("th", { key: 'e64a0cc33e13c4c100879be48ecd9d452d305d37' }, locales.entries.Lcz_Username), h("th", { key: 'f7dd6e22b9923a1a8fce693add52ea12572037ac' }, locales.entries.Lcz_Note), h("th", { key: '76ae378860a2fdbf4d0bad8722974514dcde299b' }, locales.entries.Lcz_UnitsAssigned), h("th", { key: '8136c9cbb09ca811f9b1a674080c298ae2138f3a', class: "text-center" }, h("ir-icon", { key: 'c7d675e588a0e0edea977cadcc8d1444adab9af5', title: locales.entries.Lcz_CreateHousekeeper, onIconClickHandler: () => {
                this.currentTrigger = {
                    type: 'user',
                    isEdit: false,
                    user: null,
                };
            } }, h("svg", { key: '45e307a5c3fafd72aaffbe93c12bd8574b948cb0', slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, h("path", { key: '3cd499acd10802a42079c82ac759ce32ea339864', fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), h("tbody", { key: '659a0129f627e8d84f4f747de2851e787c1c9b0a' }, housekeeping_store.hk_criteria.housekeepers.map(hk => (h("tr", { key: hk.id }, h("td", { class: "text-left" }, hk.name), h("td", null, hk.phone_prefix, " ", hk.mobile), h("td", null, hk.username), h("td", null, hk.note), h("td", null, this.renderAssignedUnits(hk)), h("td", { class: "text-center" }, h("div", { class: "icons-container" }, h("ir-icon", { title: locales.entries.Lcz_EditHousekeeper, onIconClickHandler: () => {
                const { assigned_units, is_soft_deleted, is_active } = hk, user = __rest(hk, ["assigned_units", "is_soft_deleted", "is_active"]);
                this.currentTrigger = {
                    type: 'user',
                    isEdit: true,
                    user,
                };
            }, icon: "ft-save color-ir-light-blue-hover h5 pointer sm-margin-right" }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), h("span", null, " \u00A0"), h("ir-icon", { title: locales.entries.Lcz_DeleteHousekeeper, icon: "ft-trash-2 danger h5 pointer", onIconClickHandler: () => this.handleDeletion(hk) }, h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))))))))), h("ir-sidebar", { key: 'cf757e5b3a4aa7a85e03757c7a77ed424355a3f1', showCloseButton: false, open: this.currentTrigger !== null && this.currentTrigger.type !== 'delete', onIrSidebarToggle: () => (this.currentTrigger = null), style: {
                '--sidebar-width': this.currentTrigger ? (this.currentTrigger.type === 'unassigned_units' ? 'max-content' : '40rem') : 'max-content',
            } }, this.renderCurrentTrigger()), ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) === 'delete' && h("ir-delete-modal", { key: '68b0e4ce90431efbb8108d285aef5bb706fe4ef4', user: this.currentTrigger.user })));
    }
    static get is() { return "ir-hk-team"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["ir-hk-team.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ir-hk-team.css"]
        };
    }
    static get states() {
        return {
            "currentTrigger": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "closeSideBar",
                "method": "handleCloseSideBar",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=ir-hk-team.js.map

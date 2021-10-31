"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DManager = void 0;
var util_1 = require("@quenk/wml-widgets/lib/util");
var _1 = require("./");
/**
 * DManager is a scene used to provide a management interface for a single
 * data collection in an application.
 *
 * This scene is designed around a view that usually consists of a single
 * search bar and a data table that displays the results of successful searches.
 * Searches are expected to take place via http requests (via remote actors) and
 * children of this actor can react to them via the CompleteHandler apis.
 */
var DManager = /** @class */ (function (_super) {
    __extends(DManager, _super);
    function DManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * setTableData and show the view to the user.
     */
    DManager.prototype.setTableData = function (data, pagination) {
        if (data === void 0) { data = []; }
        this.values.table.data = data;
        if (pagination)
            this.values.table.pagination = pagination;
        this.show();
    };
    /**
     * updateTableData but do not cause the view to be shown.
     */
    DManager.prototype.updateTableData = function (data, pagination) {
        if (data === void 0) { data = []; }
        var mtable = (0, util_1.getById)(this.view, this.values.table.id);
        if (pagination)
            this.values.table.pagination = pagination;
        if (mtable.isJust())
            mtable.get().update(data);
    };
    return DManager;
}(_1.DScene));
exports.DManager = DManager;
//# sourceMappingURL=manager.js.map
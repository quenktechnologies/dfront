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
exports.DManager = exports.UpdateTableAfterNoContent = exports.UpdateTableAfterOk = exports.ShowTableAfterNoContent = exports.ShowTableAfterOk = void 0;
var status = require("@quenk/jhr/lib/status");
var util_1 = require("@quenk/wml-widgets/lib/util");
var handlers_1 = require("./remote/handlers");
var _1 = require("./");
/**
 * ShowTableAfterOk populates and displays the table after receiving a response
 * with data.
 */
var ShowTableAfterOk = /** @class */ (function (_super) {
    __extends(ShowTableAfterOk, _super);
    function ShowTableAfterOk(manager) {
        var _this = _super.call(this, status.OK, function (r) {
            var _a;
            _this.manager.values.table.data = r.body.data;
            _this.manager.values.table.pagination = (_a = r.body.meta) === null || _a === void 0 ? void 0 : _a.pagination;
            _this.manager.show();
        }) || this;
        _this.manager = manager;
        return _this;
    }
    return ShowTableAfterOk;
}(handlers_1.ExecOnComplete));
exports.ShowTableAfterOk = ShowTableAfterOk;
/**
 * ShowTableAfterNoContent displays the table without data after receiving a
 * response with no data.
 */
var ShowTableAfterNoContent = /** @class */ (function (_super) {
    __extends(ShowTableAfterNoContent, _super);
    function ShowTableAfterNoContent(manager) {
        var _this = _super.call(this, status.NO_CONTENT, function () {
            _this.manager.values.table.data = [];
            _this.manager.show();
        }) || this;
        _this.manager = manager;
        return _this;
    }
    return ShowTableAfterNoContent;
}(handlers_1.ExecOnComplete));
exports.ShowTableAfterNoContent = ShowTableAfterNoContent;
/**
 * UpdateTableAfterOk updates the table with data received from a response.
 */
var UpdateTableAfterOk = /** @class */ (function (_super) {
    __extends(UpdateTableAfterOk, _super);
    function UpdateTableAfterOk(manager) {
        var _this = _super.call(this, status.OK, function (r) {
            var mtable = (0, util_1.getById)(_this.manager.view, _this.manager.values.table.id);
            if (mtable.isJust())
                mtable.get().update(r.body.data);
        }) || this;
        _this.manager = manager;
        return _this;
    }
    return UpdateTableAfterOk;
}(handlers_1.ExecOnComplete));
exports.UpdateTableAfterOk = UpdateTableAfterOk;
/**
 * UpdateTableAfterNoContent updates the table after a response with no data
 * is received.
 */
var UpdateTableAfterNoContent = /** @class */ (function (_super) {
    __extends(UpdateTableAfterNoContent, _super);
    function UpdateTableAfterNoContent(manager) {
        var _this = _super.call(this, status.NO_CONTENT, function () {
            var mtable = (0, util_1.getById)(_this.manager.view, _this.manager.values.table.id);
            if (mtable.isJust())
                mtable.get().update([]);
        }) || this;
        _this.manager = manager;
        return _this;
    }
    return UpdateTableAfterNoContent;
}(handlers_1.ExecOnComplete));
exports.UpdateTableAfterNoContent = UpdateTableAfterNoContent;
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
    return DManager;
}(_1.DScene));
exports.DManager = DManager;
//# sourceMappingURL=manager.js.map
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
exports.DApp = exports.Show = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var app_1 = require("@quenk/jouvert/lib/app");
var defaultConf = { log: { level: 6, logger: console } };
/**
 * Show can be sent to the app to change the currently displayed view.
 */
var Show = /** @class */ (function () {
    function Show(view, owner) {
        this.view = view;
        this.owner = owner;
    }
    return Show;
}());
exports.Show = Show;
/**
 * DApp is the interface applications using this module are expected to use.
 *
 * It provides a helper method for looking up services within in the system.
 * In the future, this may be replaced with potoo variables.
 */
var DApp = /** @class */ (function (_super) {
    __extends(DApp, _super);
    function DApp(node, conf) {
        if (conf === void 0) { conf = {}; }
        var _this = _super.call(this, (0, record_1.merge3)(defaultConf, conf, { accept: function (m) { return _this.accept(m); } })) || this;
        _this.node = node;
        _this.conf = conf;
        _this.services = {};
        return _this;
    }
    /**
     * getAddressFor provides the address for a service given a key.
     */
    DApp.prototype.getAddressFor = function (key) {
        return this.services[key] || '?';
    };
    /**
     * accept receives messages from the vm intended for the root actor
     * (the app).
     *
     * This is used by the app to listen for requests to change the view. To
     * intercept other messages, override the onMessage() method.
     */
    DApp.prototype.accept = function (msg) {
        if (msg instanceof Show)
            this.show(msg.view);
        else
            this.onMessage(msg);
    };
    /**
     * show should be overridden to implement how the view is actually
     * displayed.
     */
    DApp.prototype.show = function (_) { };
    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    DApp.prototype.onMessage = function (_) { };
    return DApp;
}(app_1.JApp));
exports.DApp = DApp;
//# sourceMappingURL=index.js.map
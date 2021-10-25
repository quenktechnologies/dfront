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
exports.DApplication = exports.BACKGROUND_REMOTE = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var app_1 = require("@quenk/jouvert/lib/app");
var factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
exports.BACKGROUND_REMOTE = 'remote.background';
var defaultConf = { log: { level: 6, logger: console } };
/**
 * DApplication is the main class of dfront application.s
 */
var DApplication = /** @class */ (function (_super) {
    __extends(DApplication, _super);
    function DApplication(node, conf) {
        if (conf === void 0) { conf = {}; }
        var _this = _super.call(this, (0, record_1.merge3)(defaultConf, conf, { accept: function (m) { return _this.onMessage(m); } })) || this;
        _this.node = node;
        _this.conf = conf;
        _this.services = {};
        _this.models = factory_1.RemoteModelFactory.getInstance(_this, _this.services[exports.BACKGROUND_REMOTE]);
        return _this;
    }
    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    DApplication.prototype.getModel = function (path, handler) {
        return this.models.create(path, handler);
    };
    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    DApplication.prototype.onMessage = function (_) { };
    return DApplication;
}(app_1.JApp));
exports.DApplication = DApplication;
//# sourceMappingURL=index.js.map
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
exports.Profile = exports.ShowDataAfterOk = void 0;
var status = require("@quenk/jhr/lib/status");
var handlers_1 = require("./remote/handlers");
var _1 = require("./");
/**
 * ShowDataAfterOk displays the populated profile after receiving a response
 * with data.
 */
var ShowDataAfterOk = /** @class */ (function (_super) {
    __extends(ShowDataAfterOk, _super);
    function ShowDataAfterOk(profile) {
        var _this = _super.call(this, status.OK, function (r) {
            _this.profile.values.data = r.body.data;
            _this.profile.show();
        }) || this;
        _this.profile = profile;
        return _this;
    }
    return ShowDataAfterOk;
}(handlers_1.ExecOnComplete));
exports.ShowDataAfterOk = ShowDataAfterOk;
/**
 * Profile is a scene used to provide a view of a single record of data from
 * a collection.
 */
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Profile;
}(_1.DScene));
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map
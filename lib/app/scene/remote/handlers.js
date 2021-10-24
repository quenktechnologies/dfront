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
exports.SlidingOnClientError = exports.SlidingOnComplete = exports.OrOnClientError = exports.OrOnComplete = exports.ExecOnClientError = exports.ExecOnComplete = void 0;
var callback_1 = require("@quenk/jouvert/lib/app/remote/callback");
/**
 * ExecOnComplete invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for successful responses.
 */
var ExecOnComplete = /** @class */ (function (_super) {
    __extends(ExecOnComplete, _super);
    function ExecOnComplete(code, callback) {
        var _this = _super.call(this) || this;
        _this.code = code;
        _this.callback = callback;
        return _this;
    }
    ExecOnComplete.prototype.onComplete = function (r) {
        if (r.code === this.code)
            this.callback(r);
    };
    return ExecOnComplete;
}(callback_1.AbstractCompleteHandler));
exports.ExecOnComplete = ExecOnComplete;
/**
 * ExecOnClientError invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for responses that return a client error.
 */
var ExecOnClientError = /** @class */ (function (_super) {
    __extends(ExecOnClientError, _super);
    function ExecOnClientError(code, callback) {
        var _this = _super.call(this) || this;
        _this.code = code;
        _this.callback = callback;
        return _this;
    }
    ExecOnClientError.prototype.onClientError = function (r) {
        if (r.code === this.code)
            this.callback(r);
    };
    return ExecOnClientError;
}(callback_1.AbstractCompleteHandler));
exports.ExecOnClientError = ExecOnClientError;
/**
 * OrOnComplete uses a condition to determine which of two handlers
 * to invoke on a successful response.
 */
var OrOnComplete = /** @class */ (function (_super) {
    __extends(OrOnComplete, _super);
    function OrOnComplete(condition, onTrue, onFalse) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.onTrue = onTrue;
        _this.onFalse = onFalse;
        return _this;
    }
    OrOnComplete.prototype.onComplete = function (r) {
        var target = this.condition(r) ? this.onTrue : this.onFalse;
        target.onComplete(r);
    };
    return OrOnComplete;
}(callback_1.AbstractCompleteHandler));
exports.OrOnComplete = OrOnComplete;
/**
 * OrOnClientError uses a condition to determine which of two handlers
 * to invoke on a client error response.
 */
var OrOnClientError = /** @class */ (function (_super) {
    __extends(OrOnClientError, _super);
    function OrOnClientError(condition, onTrue, onFalse) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.onTrue = onTrue;
        _this.onFalse = onFalse;
        return _this;
    }
    OrOnClientError.prototype.onClientError = function (r) {
        var target = this.condition(r) ? this.onTrue : this.onFalse;
        target.onClientError(r);
    };
    return OrOnClientError;
}(callback_1.AbstractCompleteHandler));
exports.OrOnClientError = OrOnClientError;
/**
 * SlidingOnComplete uses a different CompleteHandler from the list provided
 * for each successful response until the last one is reached.
 */
var SlidingOnComplete = /** @class */ (function (_super) {
    __extends(SlidingOnComplete, _super);
    function SlidingOnComplete(handlers) {
        var _this = _super.call(this) || this;
        _this.handlers = handlers;
        _this.ptr = 0;
        return _this;
    }
    SlidingOnComplete.prototype.onComplete = function (r) {
        var _a = this, handlers = _a.handlers, ptr = _a.ptr;
        if (handlers[ptr]) {
            handlers[ptr].onComplete(r);
            ptr++;
        }
    };
    return SlidingOnComplete;
}(callback_1.AbstractCompleteHandler));
exports.SlidingOnComplete = SlidingOnComplete;
/**
 * SlidingOnClientError uses a different CompleteHandler from the list provided
 * for each client error response until the last one is reached.
 */
var SlidingOnClientError = /** @class */ (function (_super) {
    __extends(SlidingOnClientError, _super);
    function SlidingOnClientError(handlers) {
        var _this = _super.call(this) || this;
        _this.handlers = handlers;
        _this.ptr = 0;
        return _this;
    }
    SlidingOnClientError.prototype.onClientError = function (r) {
        var _a = this, handlers = _a.handlers, ptr = _a.ptr;
        if (handlers[ptr]) {
            handlers[ptr].onClientError(r);
            ptr++;
        }
    };
    return SlidingOnClientError;
}(callback_1.AbstractCompleteHandler));
exports.SlidingOnClientError = SlidingOnClientError;
//# sourceMappingURL=handlers.js.map
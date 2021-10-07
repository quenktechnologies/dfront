"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrOnClientError = exports.OrOnComplete = exports.ExecOnClientError = exports.ExecOnComplete = void 0;
const callback_1 = require("@quenk/jouvert/lib/app/remote/callback");
/**
 * ExecOnComplete invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for successful responses.
 */
class ExecOnComplete extends callback_1.AbstractCompleteHandler {
    constructor(code, callback) {
        super();
        this.code = code;
        this.callback = callback;
    }
    onComplete(r) {
        if (r.code === this.code)
            this.callback(r);
    }
}
exports.ExecOnComplete = ExecOnComplete;
/**
 * ExecOnClientError invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for responses that return a client error.
 */
class ExecOnClientError extends callback_1.AbstractCompleteHandler {
    constructor(code, callback) {
        super();
        this.code = code;
        this.callback = callback;
    }
    onClientError(r) {
        if (r.code === this.code)
            this.callback(r);
    }
}
exports.ExecOnClientError = ExecOnClientError;
/**
 * OrOnComplete uses a condition to determine which of two handlers
 * to invoke on a successful response.
 */
class OrOnComplete extends callback_1.AbstractCompleteHandler {
    constructor(condition, onTrue, onFalse) {
        super();
        this.condition = condition;
        this.onTrue = onTrue;
        this.onFalse = onFalse;
    }
    onComplete(r) {
        let target = this.condition(r) ? this.onTrue : this.onFalse;
        target.onComplete(r);
    }
}
exports.OrOnComplete = OrOnComplete;
/**
 * OrOnClientError uses a condition to determine which of two handlers
 * to invoke on a client error response.
 */
class OrOnClientError extends callback_1.AbstractCompleteHandler {
    constructor(condition, onTrue, onFalse) {
        super();
        this.condition = condition;
        this.onTrue = onTrue;
        this.onFalse = onFalse;
    }
    onClientError(r) {
        let target = this.condition(r) ? this.onTrue : this.onFalse;
        target.onClientError(r);
    }
}
exports.OrOnClientError = OrOnClientError;
//# sourceMappingURL=handlers.js.map
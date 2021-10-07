"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DApp = exports.Show = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const app_1 = require("@quenk/jouvert/lib/app");
const defaultConf = { log: { level: 6, logger: console } };
/**
 * Show can be sent to the app to change the currently displayed view.
 */
class Show {
    constructor(view, owner) {
        this.view = view;
        this.owner = owner;
    }
}
exports.Show = Show;
/**
 * DApp is the interface applications using this module are expected to use.
 *
 * It provides a helper method for looking up services within in the system.
 * In the future, this may be replaced with potoo variables.
 */
class DApp extends app_1.JApp {
    constructor(node, conf = {}) {
        super((0, record_1.merge3)(defaultConf, conf, { accept: (m) => this.accept(m) }));
        this.node = node;
        this.conf = conf;
        this.services = {};
    }
    /**
     * getAddressFor provides the address for a service given a key.
     */
    getAddressFor(key) {
        return this.services[key] || '?';
    }
    /**
     * accept receives messages from the vm intended for the root actor
     * (the app).
     *
     * This is used by the app to listen for requests to change the view. To
     * intercept other messages, override the onMessage() method.
     */
    accept(msg) {
        if (msg instanceof Show)
            this.show(msg.view);
        else
            this.onMessage(msg);
    }
    /**
     * show should be overridden to implement how the view is actually
     * displayed.
     */
    show(_) { }
    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    onMessage(_) { }
}
exports.DApp = DApp;
//# sourceMappingURL=index.js.map
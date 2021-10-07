"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DManager = exports.UpdateTableAfterNoContent = exports.UpdateTableAfterOk = exports.ShowTableAfterNoContent = exports.ShowTableAfterOk = void 0;
const status = require("@quenk/jhr/lib/status");
const util_1 = require("@quenk/wml-widgets/lib/util");
const handlers_1 = require("./remote/handlers");
const _1 = require("./");
/**
 * ShowTableAfterOk populates and displays the table after receiving a response
 * with data.
 */
class ShowTableAfterOk extends handlers_1.ExecOnComplete {
    constructor(manager) {
        super(status.OK, r => {
            this.manager.values.table.data = r.body.data;
            this.manager.values.table.pagination = r.body.meta.pagination;
            this.manager.show();
        });
        this.manager = manager;
    }
}
exports.ShowTableAfterOk = ShowTableAfterOk;
/**
 * ShowTableAfterNoContent displays the table without data after receiving a
 * response with no data.
 */
class ShowTableAfterNoContent extends handlers_1.ExecOnComplete {
    constructor(manager) {
        super(status.NO_CONTENT, () => {
            this.manager.values.table.data = [];
            this.manager.show();
        });
        this.manager = manager;
    }
}
exports.ShowTableAfterNoContent = ShowTableAfterNoContent;
/**
 * UpdateTableAfterOk updates the table with data received from a response.
 */
class UpdateTableAfterOk extends handlers_1.ExecOnComplete {
    constructor(manager) {
        super(status.OK, r => {
            let mtable = (0, util_1.getById)(this.manager.view, this.manager.values.table.id);
            if (mtable.isJust())
                mtable.get().update(r.body.data);
        });
        this.manager = manager;
    }
}
exports.UpdateTableAfterOk = UpdateTableAfterOk;
/**
 * UpdateTableAfterNoContent updates the table after a response with no data
 * is received.
 */
class UpdateTableAfterNoContent extends handlers_1.ExecOnComplete {
    constructor(manager) {
        super(status.NO_CONTENT, () => {
            let mtable = (0, util_1.getById)(this.manager.view, this.manager.values.table.id);
            if (mtable.isJust())
                mtable.get().update([]);
        });
        this.manager = manager;
    }
}
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
class DManager extends _1.DScene {
}
exports.DManager = DManager;
//# sourceMappingURL=manager.js.map
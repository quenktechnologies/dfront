"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ShowDataAfterOk = void 0;
const status = require("@quenk/jhr/lib/status");
const handlers_1 = require("./remote/handlers");
const _1 = require("./");
/**
 * ShowDataAfterOk displays the populated profile after receiving a response
 * with data.
 */
class ShowDataAfterOk extends handlers_1.ExecOnComplete {
    constructor(profile) {
        super(status.OK, r => {
            this.profile.values.data = r.body.data;
            this.profile.show();
        });
        this.profile = profile;
    }
}
exports.ShowDataAfterOk = ShowDataAfterOk;
/**
 * Profile is a scene used to provide a view of a single record of data from
 * a collection.
 */
class Profile extends _1.DScene {
}
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map
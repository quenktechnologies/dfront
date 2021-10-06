"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DManager = void 0;
const _1 = require("./");
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
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
exports.DScene = void 0;
var scene_1 = require("@quenk/jouvert/lib/app/scene");
var listener_1 = require("@quenk/jouvert/lib/app/scene/form/listener");
var director_1 = require("@quenk/jouvert/lib/app/director");
var scene_2 = require("@quenk/jouvert/lib/app/scene");
var view_1 = require("@quenk/jouvert/lib/app/service/view");
/**
 * DScene is the parent class of actors that serve as the controllers of one
 * or more units of interactivity within an application.
 *
 * This base class is designed to:
 * 1. Provide a view to the director when spawned.
 * 2. Intercept form messages via the FormListener interface.
 * 3. Construct remote data models via a RemoteModelFactory.
 * 4. Show a view without a route dispatch.
 * 5. Provide a hook for doing actions after the view has been shown.
 * 6. Provide a method for reloading the interaction.
 *
 * This class was originally part of the cis project which was influenced by
 * designs of projects before that.
 */
var DScene = /** @class */ (function (_super) {
    __extends(DScene, _super);
    function DScene(resume, app) {
        var _this = _super.call(this, resume, app) || this;
        _this.resume = resume;
        _this.app = app;
        _this.name = _this.self();
        return _this;
    }
    DScene.prototype.receive = function () {
        return [
            new scene_1.SuspendCase(this),
            new listener_1.FormAbortedCase(this),
            new listener_1.FormSavedCase(this)
        ];
    };
    /**
     * afterShow can be overridden to preform actions after the view has been
     * shown.
     */
    DScene.prototype.afterShow = function () {
        return this;
    };
    /**
     * afterFormAborted by default redraws the view of this DScene.
     */
    DScene.prototype.afterFormAborted = function (_) {
        this.show();
        return this;
    };
    /**
     * afterFormSaved by default triggers a reload of this DScene.
     */
    DScene.prototype.afterFormSaved = function (_) {
        this.reload();
        return this;
    };
    /**
     * show the view of this DScene.
     *
     * This will also invoke the afterShow() hook.
     */
    DScene.prototype.show = function () {
        this.tell(this.resume.director, new view_1.Show(this.name, this.view, this.self()));
        this.afterShow();
        return this;
    };
    /**
     * reload the current DScene triggering its network requests.
     */
    DScene.prototype.reload = function () {
        this.tell(this.resume.director, new director_1.Reload(this.self()));
    };
    /**
     * run shows the view.
     *
     * @override
     */
    DScene.prototype.run = function () {
        this.show();
    };
    return DScene;
}(scene_2.AppScene));
exports.DScene = DScene;
//# sourceMappingURL=index.js.map
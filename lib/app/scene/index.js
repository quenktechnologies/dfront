"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DScene = exports.REMOTE_BACKGROUND_SERVICE = void 0;
const scene_1 = require("@quenk/jouvert/lib/app/scene");
const listener_1 = require("@quenk/jouvert/lib/app/scene/form/listener");
const factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
const director_1 = require("@quenk/jouvert/lib/app/director");
const scene_2 = require("@quenk/jouvert/lib/app/scene");
const __1 = require("../");
exports.REMOTE_BACKGROUND_SERVICE = 'services.remote.background';
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
class DScene extends scene_2.AppScene {
    constructor(resume, app) {
        super(resume, app);
        this.resume = resume;
        this.app = app;
        this.receive = [
            new scene_1.SuspendCase(this),
            new listener_1.FormAbortedCase(this),
            new listener_1.FormSavedCase(this)
        ];
        this.models = factory_1.RemoteModelFactory.getInstance(t => this.spawn(t), this.app.getAddressFor(exports.REMOTE_BACKGROUND_SERVICE));
    }
    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    getModel(path, handler) {
        return this
            .models
            .create(path, handler);
    }
    /**
     * afterShow can be overridden to preform actions after the view has been
     * shown.
     */
    afterShow() {
        return this;
    }
    /**
     * afterFormAborted by default redraws the view of this DScene.
     */
    afterFormAborted(_) {
        this.show();
        return this;
    }
    /**
     * afterFormSaved by default triggers a reload of this DScene.
     */
    afterFormSaved(_) {
        this.reload();
        return this;
    }
    /**
     * show the view of this DScene.
     *
     * This will also invoke the afterShow() hook.
     */
    show() {
        this.tell(this.resume.director, new __1.Show(this.view, this.self()));
        this.afterShow();
        return this;
    }
    /**
     * reload the current DScene triggering its network requests.
     */
    reload() {
        this.tell(this.resume.director, new director_1.Reload(this.self()));
    }
    /**
     * run shows the view.
     *
     * @override
     */
    run() {
        this.show();
    }
}
exports.DScene = DScene;
//# sourceMappingURL=index.js.map
import { Object } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { AppSceneMessage } from '@quenk/jouvert/lib/app/scene';
import { FormListener, FormAborted, FormSaved } from '@quenk/jouvert/lib/app/scene/form/listener';
import { RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Result } from '@quenk/jouvert/lib/app/remote/model';
import { CompleteHandler } from '@quenk/jouvert/lib/app/remote/callback';
import { Resume } from '@quenk/jouvert/lib/app/director';
import { AppScene } from '@quenk/jouvert/lib/app/scene';
import { Request } from '@quenk/frontend-routers/lib/hash';
import { DApp } from '../';
export declare const REMOTE_BACKGROUND_SERVICE = "services.remote.background";
/**
 * DSceneMessage type.
 */
export declare type DSceneMessage<M> = FormAborted | FormSaved | M | AppSceneMessage<M>;
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
export declare abstract class DScene<M> extends AppScene<Request, DSceneMessage<M>> implements FormListener {
    resume: Resume<Request>;
    app: DApp;
    constructor(resume: Resume<Request>, app: DApp);
    abstract view: View;
    receive: Case<DSceneMessage<M>>[];
    models: RemoteModelFactory<Object>;
    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandler<Result<T>>): import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * afterShow can be overridden to preform actions after the view has been
     * shown.
     */
    afterShow(): DScene<M>;
    /**
     * afterFormAborted by default redraws the view of this DScene.
     */
    afterFormAborted(_: FormAborted): DScene<M>;
    /**
     * afterFormSaved by default triggers a reload of this DScene.
     */
    afterFormSaved(_: FormSaved): DScene<M>;
    /**
     * show the view of this DScene.
     *
     * This will also invoke the afterShow() hook.
     */
    show(): DScene<M>;
    /**
     * reload the current DScene triggering its network requests.
     */
    reload(): void;
    /**
     * run shows the view.
     *
     * @override
     */
    run(): void;
}

import { View } from '@quenk/wml';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { AppSceneMessage } from '@quenk/jouvert/lib/app/scene';
import { FormListener, FormAborted, FormSaved } from '@quenk/jouvert/lib/app/scene/form/listener';
import { Resume } from '@quenk/jouvert/lib/app/director';
import { AppScene } from '@quenk/jouvert/lib/app/scene';
import { Request } from '@quenk/frontend-routers/lib/hash';
import { DApplication } from '../';
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
    app: DApplication;
    constructor(resume: Resume<Request>, app: DApplication);
    abstract view: View;
    name: string;
    receive: Case<DSceneMessage<M>>[];
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

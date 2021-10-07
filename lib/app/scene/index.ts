import { Object } from '@quenk/noni/lib/data/jsonx';

import { View } from '@quenk/wml';

import { Case } from '@quenk/potoo/lib/actor/resident/case';

import { AppSceneMessage, SuspendCase } from '@quenk/jouvert/lib/app/scene';
import {
    FormListener,
    FormAborted,
    FormSaved,
    FormAbortedCase,
    FormSavedCase
} from '@quenk/jouvert/lib/app/scene/form/listener';
import { 
  CompleteHandlerSpec, 
  RemoteModelFactory 
} from '@quenk/jouvert/lib/app/remote/model/factory';
import { Resume, Reload } from '@quenk/jouvert/lib/app/director';
import { AppScene } from '@quenk/jouvert/lib/app/scene';

import { Request } from '@quenk/frontend-routers/lib/hash';
import { Show, DApp } from '../';

export const REMOTE_BACKGROUND_SERVICE = 'services.remote.background';

/**
 * DSceneMessage type.
 */
export type DSceneMessage<M>
    = FormAborted
    | FormSaved
    | M
    | AppSceneMessage<M>
    ;

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
export abstract class DScene<M>
    extends
    AppScene<Request, DSceneMessage<M>>
    implements
    FormListener {

    constructor(
        public resume: Resume<Request>,
        public app: DApp) { super(resume, app); }

    abstract view: View;

    receive = <Case<DSceneMessage<M>>[]>[

        new SuspendCase(this),

        new FormAbortedCase(this),

        new FormSavedCase(this)

    ];

    models = RemoteModelFactory.getInstance(
        t => this.spawn(t),
        this.app.getAddressFor(REMOTE_BACKGROUND_SERVICE)
    );

    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>) {

        return this
            .models
            .create(path, handler);

    }

    /**
     * afterShow can be overridden to preform actions after the view has been
     * shown.
     */
    afterShow(): DScene<M> {

        return this;

    }

    /**
     * afterFormAborted by default redraws the view of this DScene.
     */
    afterFormAborted(_: FormAborted): DScene<M> {

        this.show();
        return this;

    }

    /**
     * afterFormSaved by default triggers a reload of this DScene.
     */
    afterFormSaved(_: FormSaved): DScene<M> {

        this.reload();
        return this;

    }

    /**
     * show the view of this DScene.
     *
     * This will also invoke the afterShow() hook.
     */
    show(): DScene<M> {

        this.tell(this.resume.director, new Show(this.view, this.self()));
        this.afterShow();
        return this;

    }

    /**
     * reload the current DScene triggering its network requests.
     */
    reload() {

        this.tell(this.resume.director, new Reload(this.self()));

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

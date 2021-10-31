import { Object } from '@quenk/noni/lib/data/jsonx';
import { Record, merge3 } from '@quenk/noni/lib/data/record';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import { JApp } from '@quenk/jouvert/lib/app';
import {
    CompleteHandlerSpec,
    RemoteModelFactory
} from '@quenk/jouvert/lib/app/remote/model/factory';

export const BACKGROUND_REMOTE = 'remote.background';

const defaultConf = { log: { level: 6, logger: console } };

/**
 * DApplication is the main class of dfront application.s
 */
export abstract class DApplication extends JApp {

    constructor(public node: HTMLElement, public conf: object = {}) {

        super(merge3(defaultConf, conf,
            { accept: (m: Message) => this.onMessage(m) }));

    }

    services: Record<Address> = {};

    get models() {
        return RemoteModelFactory
        .getInstance(this, this.services[BACKGROUND_REMOTE]);
    }

    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>) {

        return this.models.create(path, handler);

    }

    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    onMessage(_: Message) { }

}

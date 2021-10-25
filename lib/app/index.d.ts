import { Object } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { JApp } from '@quenk/jouvert/lib/app';
import { CompleteHandlerSpec, RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
export declare const BACKGROUND_REMOTE = "remote.background";
/**
 * DApplication is the main class of dfront application.s
 */
export declare abstract class DApplication extends JApp {
    node: HTMLElement;
    conf: object;
    constructor(node: HTMLElement, conf?: object);
    services: Record<Address>;
    models: RemoteModelFactory<Object>;
    /**
     * getModel provides a RemoteModel instance for the specified path.
     *
     * TODO: Cache the result.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>): import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    onMessage(_: Message): void;
}
